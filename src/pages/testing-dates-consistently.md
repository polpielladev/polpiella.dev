---
title: "Testing dates consistently"
slug: "testing-dates-consistently"
excerpt: "A quick look at how very simple dependency injection 💉 can help testing date differences using cache invalidation as an example."
pubDate: "2021-07-02"
readtime: "6"
tags:
    [
        { name: "Unit Tests", slug: "unit-tests" },
        { name: "Dependency Injection", slug: "dependency-injection" },
        { name: "Swift", slug: "swift" },
    ]
author:
    name: "Pol Piella"
layout: ../layouts/BlogPostLayout.astro
---

When writing code, it is a common scenario to have to deal with dates and perform arithmetic operations with them. Some common use cases include cache invalidation, session tracking, showing live data and formatting dates for display among many others.

While these operations can be very straight-forward to implement and work as expected in production code, they can sometimes be a bit tricky to test and have to be designed with testability in mind.

### The Problem

Let's picture a scenario where we want to verify that the post data we are retrieving from the cache is still valid before we return it to the client:

```swift:LocalPostsLoadService.swift
struct LocalPostsLoadService {
    let cache: CacheStore
    let decoder: JSONDecoder
    let calendar: Calendar

    init(cache: CacheStore,
            decoder: JSONDecoder = .init(),
            calendar: Calendar = .init(identifier: .gregorian)) {
        self.cache = cache
        self.decoder = decoder
        self.calendar = calendar
    }

    func retrieveCache() -> [Post] {
        let (timestamp, data) = cache.retrievePosts()
        guard let posts = try? decoder.decode([Post].self, from: data) else { return [] }
        return isCacheValid(timestamp, Date()) ? posts : []
    }

    private func isCacheValid(_ timestamp: Date, _ currentDate: Date) -> Bool {
        guard let oldestValidDate = calendar.date(byAdding: .day, value: 2, to: timestamp) else { return false }
        return currentDate <= oldestValidDate
    }
}
```

In the snippet above, we create a data structure that will hold a cache and will retrieve values from it for the clients to use. Our acceptance criteria say that we need to make sure that the cache can only be displayed to the user if it is less than 2 days old and that it should return empty if the cache is stale. While the approach in the snippet above is correct and works great for production code, it can be quite hard to test as the date is initialised on the `retrieveCache` method and will give us no way of testing the cases described in the acceptance criteria.

How can we possibly solve this? The answer, as it commonly is when it comes to testing these kind of issues, is `Dependency Injection` 💉.

### Dependency Injection

To solve the issue we described above without having to set waits or thread sleeps, we can pass in a closure that generates a Date to the cache and then, every time we want to retrieve the cache we can execute the closure and generate a fresh Date object we can use.

The great thing about this is that this closure is the exact same as the `Date` initialiser which we were using before so, by providing `Date.init` as a default we will get the current date every time we want to retrieve values from the cache without having to change any of our production code! 🎉

```swift:LocalPostsLoadService.swift
struct LocalPostsLoadService {
    let cache: CacheStore
    let currentDate: () -> Date
    let decoder: JSONDecoder
    let calendar: Calendar

    init(cache: CacheStore,
            currentDate: @escaping () -> Date = Date.init,
            decoder: JSONDecoder = .init(),
            calendar: Calendar = .init(identifier: .gregorian)) {
        self.cache = cache
        self.currentDate = currentDate
        self.decoder = decoder
        self.calendar = calendar
    }

    func retrieveCache() -> [Post] {
        let (timestamp, data) = cache.retrievePosts()
        guard let posts = try? decoder.decode([Post].self, from: data) else { return [] }
        return isCacheValid(timestamp, currentDate()) ? posts : []
    }

    private func isCacheValid(_ timestamp: Date, _ currentDate: Date) -> Bool {
        guard let oldestValidDate = calendar.date(byAdding: .day, value: 2, to: timestamp) else { return false }
        return currentDate <= oldestValidDate
    }
}
```

You might notice in the example above that this concept is also applied to other properties in our data structure, such as `cache`. What this also will allow us to do, as you will see in the following section, is to inject a mocked instance of our cache store into the service and return any data we would like to.

### How would we use this in our tests?

In order to validate that our cache invalidation code works as expected, we need to make sure that we can return cache data. Since the purpose of this is to test the local post loader implementation and not the cache, we can inject a mocked instance of our `CacheStore` to the `LocalPostsLoadService` class. I will not go into the implementation detail or what mocking is in detail in this article, but here is what the mocked class looks like:

```swift:MockCacheStore.swift
class MockCacheStore: CacheStore {
    var postsDataToReturn: (Date, Data)?

    func retrievePosts() -> (Date, Data) {
        guard let data = postsDataToReturn else {
            fatalError("This must be implemented!")
        }
        return data
    }
}
```

Now that we have a way of returning data from the cache store, we can proceed to create our test class and make sure that the cache invalidation mechanism works as expected and, since now we are able to inject any date to the loader, we can test a date that is within 2 days from the timestamp, one that is exactly two days from the timestamp and one that is over two days to make sure that our invalidation is working fine.

```swift:DateBlogPostsTests.swift
class DateBlogPostsTests: XCTestCase {
    func test_retrieveCache_returnsContentWhenDataIsNotStale() {
        let sut = makeSUT(addingNumberOfDays: .zero)

        let posts = sut.retrieveCache()

        XCTAssertFalse(posts.isEmpty)
    }

    func test_retrieveCache_returnsPostsArrayDataIs2DaysOld() {
        let sut = makeSUT(addingNumberOfDays: 2)

        let posts = sut.retrieveCache()

        XCTAssertFalse(posts.isEmpty)
    }

    func test_retrieveCache_retturnsEmptyPostsArrayWhenDataIsOver2DaysOld() {
        let sut = makeSUT(addingNumberOfDays: 3)

        let posts = sut.retrieveCache()

        XCTAssertTrue(posts.isEmpty)
    }

    // MARK: - Helper Methods

    private func makeSUT(timestamp: Date = Date(), addingNumberOfDays days: Int, posts: [Post] = [Post()]) -> LocalPostsLoadService {
        let currentTime = futureDate(addingNumberOfDays: days, toDate: timestamp)!
        let cache = MockCacheStore()
        cache.postsDataToReturn = (timestamp, try! JSONEncoder().encode(posts))
        return LocalPostsLoadService(cache: cache) { currentTime }
    }

    private func futureDate(addingNumberOfDays days: Int, toDate date: Date) -> Date? {
        let calendar = Calendar(identifier: .gregorian)
        return calendar.date(byAdding: .day, value: days, to: date)
    }
}
```

As we can see in the code block above, we can use the `calendar` API to essentially _travel in time_ to any time in the future and test that scenario, something that was not possible in our previous iteration of the production code. It is also worth notice that this is highly recommendable when testing small time differences as, while one might be inclined to put an expectation or sleep in the test, this increases flakiness and unreliability in a simple assertion that can more consistently be achieved by very simple dependency injection.

It is also worth mentioning that we have guarded the tests from potential implementation changes by creating a small factory method called `makeSUT` which returns the system under test.
