---
title: "Using Property Wrappers to avoid code repetition"
excerpt: "Exploring how Property Wrappers can come in handy to avoid code repetition"
date: "2021-08-25T15:54:39.000Z"
readtime: "4"
tags: [{ name: "Swift", slug: "swift" }]
author:
    name: "Pol Piella"
---

The `DRY` principle is one of the fundamentals of software development and it is aimed at **reducing the amount of duplication in our codebases**. The accronym stands for _don't repeat yourself_ and it encourages programmers to divide their code into smaller more reusable elements that can be shared across different parts of their applications.

While there are many approaches to reducing code duplication in Swift, in this article we're going to have a look at how `PropertyWrappers` can help us do this in a very simple manner.

`PropertyWrapppers` provide us with a way of separating the property definition from the way we actually chose to store/retrieve the property. The way we achieve this in `Swift` is by making use of `getters` and `setters`, to override the way the OS will automatically store the variable in question. We can also use them to reuse property observers such as `didSet` and provide funcitonality that needs to be used across multiple variables.

To better illustrate this, let's picture an example where we have a feature flag that is being fetched from a local representation of a remote store. This store will be kept in sync periodically with its remote counterpart on a background thread so that all our calls to it will be synchronous.

Let's now consider a protocol, `FeatureFlagStore`, and a concrete implementation, `FirebaseRemoteConfig`, for the sake of simplicity. This protocol will consist of a single method and its only responsibility will be to grab the values from the store given a key and a default value to be returned should the lookup fail for whatever reason.

```swift
protocol FeatureFlagStore {
    func retrieveFlag<T: Codable>(key: String, defaultValue: T) -> T
}
```

In order to make sure we are retrieving the most up-to-date values from our local store, the variable should go and fetch the correct value for the given key from the store every single time it is accessed. Let's have a look at how we would go about implementing by using a computed property first.

## Computed Property

Using a computed property, as shown below, we can make sure that the flag to enable/disable the new flow that is currently on a phased rollout is always fetched from the store. We give it a key, a default value and we instantiate our store and there we have it, now our user will either navigate to the `NewVC` or `OldVC` based on the state of the feature flag.

```swift
class ViewController: UIViewController {
    let store: FlagStore = FirebaseRemoteConfig()

    var isNewFlowEnabled: Bool {
        store.retrieve(key: "is-new-flow-enabled", defaultValue: false)
    }

    func userDidNavigate() {
        navigationController?.push(isNewFlowEnabled ? NewVC() : OldVC())
    }
}
```

While this approach is very valid, it will not scale very well. Every time we need to access a feature flag from any other part of the app we will need to repeat a lot of the functionality, leading to an increasing amount of code duplication. Worry not though! Swift has a lot of ways to prevent this from happening and this looks like a great example for a property wrapper!

## Property Wrappper

Our property wrapper will be in charge of abstracting all the logic we had on our `ViewController` above into its own `struct`. It will need to define a `store`, a `key` and a `defaultValue`. Then, the only thing we need to do is define a `struct` decorated by `@propertyWrapper` and that implements a `wrappedValue` property that contains the logic we need for our `FeatureFlag` variables.

> Note that `PropertyWrappers` don't necessarily have to be `struct`s, they can also be `enum`s or `class`es. They must be decorated with `@propertyWrapper` and must implement a `wrappedValue` variable.

```swift
@propertyWrapper
struct FeatureFlag<T: Decodable> {
    let store: FlagStore
    let key: String
    let defaultValue: T

    init(
        key: String,
        defaultValue: T,
        store: FlagStore = FirebaseRemoteConfig()
    ) {
        self.key = key
        self.defaultValue = defaultValue
        self.store = store
    }

    var wrappedValue: T {
        store.retrieve(defaultValue: defaultValue)
    }
}
```

In the example above, we have made the `struct` generic (constraint to the `Decodable` protocol as most feature flag providers are only able to provide JSON values) and then we have made the `wrappedValue` get-only so that we ensure the most up-to-date value from the store is always returned.

Finally, let's have a look at how much code we have removed from our `ViewController` with our new Property Wrapper 🤩

```swift
class ViewController: UIViewController {
    @FeatureFlag(key: "is-new-flow-enabled", defaultValue: false)
    var isNewFlowEnabled: Bool

    func userDidNavigate() {
        navigationController?.push(isNewFlowEnabled ? NewVC() : OldVC())
    }
}
```
