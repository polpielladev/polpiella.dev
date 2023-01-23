---
title: 'Hiding implementation details using the adapter pattern in Swift'
slug: 'hide-implementation-details-using-the-adapter-pattern'
excerpt: 'How to hide implementation details using the adapter pattern and decoupling multiple layers of an application, making it easy to test and adapt.'
pubDate: '2021-08-01'
tags:
  [
    { name: 'Architecture', slug: 'architecture' },
    { name: 'Swift', slug: 'swift' },
  ]
layout: ../layouts/BlogPostLayout.astro
---

Recently, I have been working on a project where I have had to implement a mechanism to load data from an API ([SpaceX](https://documenter.getpostman.com/view/2025350/RWaEzAiG?version=latest)) while also providing a caching mechanism to allow users to have a good offline experience and to save the BE from unnecessary requests when data is available. This was an interesting project as there were a few challenges that needed to be tackled, such as cache invalidation, where to store the cache data, etc.

To do this as modularily as possible, I wanted to provide a clear separation between frameworks, use cases and the presentation layer. I also wanted the implementation to be as flexible as it possibly could, making it very easy to replace any frameworks or 3rd party libraries I used (e.g. Realm, Core Data, Alamofire, etc.). This way any change in requirements would be guarded by SOLID principles and would be easy to implement, as we will see later on.

## The adapter pattern

To achieve this goal, I decided to go with the **Adapter** design pattern. As described in the famous [Design Patterns](https://www.amazon.co.uk/Design-patterns-elements-reusable-object-oriented/dp/0201633612) book, adapters allow you to compatibilize two incompatible interfaces. In other words, **we can use an adapter layer to sit between our adaptee and our target layers and handles the conversion between incompatible interfaces.**

Let's start by looking at what needs to be converted in our example:

- The API returns a `Launch` type which needs to conform to `Decodable` and can be decoded from the body of the server's response. While the easy approach would be to use this in our presentation layer, **this would tightly couple our local and remote implementations**, which is not ideal. This is why we will only use our `Launch` decodable type in the `API` module and we will convert it into a `LaunchViewModel` within the API adapter.
- The cache implementation stores encoded versions of our `LaunchViewModel` type as `Data` and we also need a way to convert this into a `LaunchViewModel` type that our presentation layer can understand. This will be the cache adapter's responsibility.

In Swift, the nicest way of bridging this interface mismatch is by creating a protocol that our concrete implementations can conform to and then make our target class depend solely on any number of types conforming to this abstraction, which satisfies the presentation layer's requirements.

```swift:FetchService.swift
protocol FetchService {
    func fetchLaunches(_ completion: @escaping (Result<[LaunchViewModel], Error>) -> Void)
}
```

### API Adapter

Let's now look at what the API adapter would look like. Let's assume we have a class that takes care of fetching the data (launches in this example) for us and returns the `Launch` remote model. We can then create an adapter class that conforms to the `FetchService` protocol we created above and implement the method `fetchLaunches`, where we will call the API we inject and then map the response from `Result<[Launch], Error>` over to `Result<[LaunchViewModel], Error>` like so:

```swift:SpaceXAPIAdapter.swift
public struct SpaceXAPIAdapter: FetchService {
    let api: SpaceXAPI

    init(api: SpaceXAPI) {
        self.api = api
    }

    func fetchLaunches(_ completion: @escaping (Result<[LaunchViewModel], Error>) -> Void) {
        api.fetchLaunches { result in
            switch result {
            case let .success(launches):
                let launchViewModels = launches
                    .map { LaunchViewModel(from: $0) }
                completion(.success(launchViewModels))
            case let .failure(error): completion(.failure(error))
            }
        }
    }
}
```

We could even go one step further and create a `Mapper` class with a single static method that performs this transform but, for the purpose of this article, the functionality will stay within the adapter.

### Cache Adapter

Once the API adapter was implemented, the next logical step was to try and do the same for the caching mechanism. This is very similar to the API adapter with the difference that our cache store (which could be implemented in any flavour we like and have any policies we want without our adapter being aware) returns `Data` instead of `Launch` remote models.

The adapters responsibility on the method conformance will be to decode this data into an array of `LaunchViewModel`s using a `JSONDecoder`.

```swift:SpaceXCacheAdapter.swift
struct SpaceXCacheAdapter: FetchService {
    let store: SpaceXStore
    let decoder: JSONDecoder

    init(store: SpaceXStore, decoder: JSONDecoder = .init()) {
        self.store = store
        self.decoder = decoder
    }

    func fetchLaunches(_ completion: @escaping (Result<[LaunchViewModel], Error>) -> Void) {
        store.fetchLaunches { result in
            switch result {
            case let .success(data):
                do {
                    completion(.success(decoder.decoded([LaunchViewModel].self, data)))
                } catch let error {
                    completion(.failure(error))
                }
            case let .failure(error): completion(.failure(error))
            }
        }
    }
}
```

This now allow us to change our `SpaceXStore` implementation to anything we like and use any 1st of 3rd party libraries without having to change our adapters.

### The Service

The last piece of our puzzle is the actual service class that will get called by the presentation layer. Let's create it providing a primary source of data and a backup incase the the primary source fails. One might ask now, which one is which? How do we know if the primary source is the cache or the API? The truth is, **it doesn't matter, that is something for the composition root to deal with! To the service, both primary and backup sources look exactly the same**:

```swift:SpaceXService.swift
public struct SpaceXService {
    private let source: FetchService
    private let backup: FetchService

    init(source: FetchService, backup: FetchService) {
        self.source = source
        self.backup = backup
    }

    func fetchData(_ completion: @escaping (Result<([LaunchViewModel]), Error>) -> Void) {
        source.fetchLaunches { result in
            switch result {
                case let .success(launches):
                    completion(.success(launches))
                case .failure:
                    fetchFromBackup(completion)
            }
        }
    }

    private func fetchFromBackup(_ completion: @escaping (Result<([LaunchViewModel]), Error>) -> Void) {
        backup.fetchLaunches { result in
            case let .success(launches):
                completion(.success(launches))
            case let .failure(error): .failure(error)
        }
    }
}
```

You might have realised now that, by depending on the adapter abstraction (`FetchService`), we have completely decoupled the service from our concrete cache and api implementations. Now the service **does not know where it's getting its data from, it only knows that it's getting either an array of `LaunchViewModel` types or a failure**, without any knowledge of where that data is coming from: it could be an in-memory cache, a Core Data or Realm store or even a graphQL or REST api!

The adapter implementation of the service now **allows us to change which source is primary and which source is the backup without changing the service**, as we will see in the next section!

## Conclusion

Now that we have all of our adapters in places, we can build our objects at the composition root and pass them through to our presentation layer. For the sake of this example, let's consider a factory method for a `HomeViewController` where the `SpaceXService` can be injected:

```swift:Coordinator.swift
static func makeHomeViewController() -> HomeViewController {
    let cache = CacheAdapter(store: SpaceXStore())
    let api = SpaceXAPIAdapter(api: SpaceXAPI())
    return HomeViewController(service: SpaceXService(source: cache, backup: api))
}
```

In the code snippet above, we are using the cache as our primary source and the api as the backup source, which means that **a request to the API will only be made if there is no cache present or it is not valid**. Now, as we stated in the introduction, the requirements might change in the future and retrieving from cache migth not be what we want. Well, our approach is ready for these kind of changes and it makes it very easy to swap our sources priorities only changing a line in the composition root and leaving the service as it is:

```swift:Coordinator.swift
static func makeHomeViewController() -> HomeViewController {
    // ...
    return HomeViewController(service: SpaceXService(source: api, backup: cache))
}
```

As can be seen in this example, the adapter pattern is a very useful structural pattern that can help bridge incompatible APIs and provide good separation between layers.
