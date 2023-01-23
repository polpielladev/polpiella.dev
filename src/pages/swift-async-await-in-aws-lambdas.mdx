---
title: 'Swift async/await in AWS lambdas'
slug: 'swift-async-await-in-aws-lambdas'
excerpt: 'Exploring the new Swift AWS lambda runtime API and how it enables the use of async/await.'
pubDate: '2022-12-07'
readtime: '5'
tags:
  [
    { name: 'Server Side Swift', slug: 'server-side-swift' },
    { name: 'Async/Await', slug: 'async-await' },
    { name: 'Swift', slug: 'swift' },
  ]
author:
  name: 'Pol Piella'
layout: ../layouts/BlogPostLayout.astro
---

The [swift-server](https://github.com/swift-server) team have been hard at work getting the first stable release of the [swift-aws-lambda-runtime project](https://github.com/swift-server/swift-aws-lambda-runtime) ready.

The changes for this unreleased 1.0 version include, among others, the adoption of `async/await`. In this article we'll rewrite an existing lambda to use the latest `main` revision of the [swift-aws-lambda-runtime package](https://github.com/swift-server/swift-aws-lambda-runtime) and take an early look at what the new APIs look like and how they enable us to use `async/await` in AWS lambdas.

## Callback based handlers

Up until recently, the way to implement a Swift AWS was to create an executable target with a `main.swift` file as its entry-point. In this file, we would import [AWSLambdaRuntimeCore](https://github.com/swift-server/swift-aws-lambda-runtime/tree/0.5.2/Sources/AWSLambdaRuntimeCore) and call the static `run` method on the package's `Lambda` type.

In its simplest form, the `run` method would take in a closure as an argument. In turn, the closure would also take in three parameters:

1. A `context` providing information about the conditions the lambda is running under.
2. An `input` parameter, usually conforming to `Codable`, providing any input data the lambda needs. This `input` parameter could also be an event from another AWS service in charge of triggering the lambda. To find out more about these types of events, refer to the [swift-aws-lambda-events](https://github.com/swift-server/swift-aws-lambda-events) repository.
3. A callback, in the form of a closure with a [Result](https://developer.apple.com/documentation/swift/result) as a parameter, which the lambda can call to notify the client about the work's completion.

```swift:Lambda+Codable.swift
// source: https://github.com/swift-server/swift-aws-lambda-runtime/blob/0.5.2/Sources/AWSLambdaRuntime/Lambda%2BCodable.swift#L25

extension Lambda {
   public typealias CodableClosure<In: Decodable, Out: Encodable> = (Lambda.Context, In, @escaping (Result<Out, Error>) -> Void) -> Void
}
```

If you have worked with asynchronous code before the introduction of `async/await`, you will recognise the pattern described in point 3 above. The caller gives the asynchronous code a completion block which is to be executed by the callee when its asynchronous work is completed. Lambdas are no different, you can think of the callee performing the asynchronous work as the lambda itself and **the caller as the service or user invoking such lambda**.

By executing the closure provided in the `callback` parameter we're informing the client that the work performed by the lambda is done, much like you would do when working with [pre async/await URLSession APIs](https://developer.apple.com/documentation/foundation/urlsession/1407613-datatask).

### An example

Let's consider the following scenario. We need to create an AWS lambda which:

- Accepts a `Codable` type with a single parameter `site` of type `URL` as an input.
- Makes a network request to the `site` URL from the input object to retrieve its HTML as a string.
- Uses a [Regular Expression](https://useyourloaf.com/blog/getting-started-with-swift-regex/) to extract all Twitter user handles from the HTML string.
- Returns a `Codable` object with a single property `handles` of type `[String]`.

Using the current callback-based API, an AWS lambda which satisfies such requirements would look like this:

```swift:main.swift
import AWSLambdaRuntime
import Foundation

struct Request: Codable {
    let site: URL
}

struct Response: Codable {
    let handles: [String]
}

Lambda.run { (context, request: Request, callback: @escaping (Result<Response, Error>) -> Void) in
    let request = URLRequest(url: request.site)
    URLSession.shared.dataTask(with: request) { data, _, error in
        if let error { callback(.failure(error)); return  }

        guard let data else { callback(.failure("Could not load request data..")); return }

        let htmlString = String(data: data, encoding: .utf8)
        let re = #/(http(?:s):?\/\/(?:www\.)?twitter.com\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))/#
        let handles = htmlString?
            .matches(of: re)
            .map { "@" + $0.output.2 } ?? []

        callback(.success(Response(handles: handles)))
    }
}
```

The code above works great but, as it is the case with any callback-based asynchronous code, we must make sure completion is called every single time the asynchronous method is invoked, regardless of its result.

Failing to call the completion block will cause the asynchronous function to never complete and to continue executing (in this case the lambda will eventually time out). This is an issue which modern concurrency helps solving, as we'll see in the next section.

## Async/Await

Let's take a look at what the lambda above would look like if we use the new [swift-aws-lambda-runtime](https://github.com/swift-server/swift-aws-lambda-runtime) APIs:

```swift:Lambda.swift
import AWSLambdaRuntime
import Foundation

// 1
@main
struct Lambda: LambdaHandler {
    let urlSession: URLSession

    // 2
    init(context: LambdaInitializationContext) async throws {
        urlSession = URLSession.shared
    }

    // 3
    func handle(_ input: Request, context: LambdaContext) async throws -> Response {
        let (data, _) = try await urlSession.data(from: input.site)
        let htmlString = String(data: data, encoding: .utf8)
        let re = #/(http(?:s):?\/\/(?:www\.)?twitter.com\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))/#

        let handles = htmlString?
            .matches(of: re)
            .map { "@" + $0.output.2 } ?? []

        return Response(handles: handles)
    }
}
```

Let's break the code above down:

1. A `struct` decorated with `@main` and conforming to a protocol called [LambdaHandler](https://github.com/swift-server/swift-aws-lambda-runtime/blob/main/Sources/AWSLambdaRuntimeCore/LambdaHandler.swift) from the [AWSLambdaRuntimeCore](https://github.com/swift-server/swift-aws-lambda-runtime/tree/main/Sources/AWSLambdaRuntimeCore) package is created.
2. [LambdaHandler](https://github.com/swift-server/swift-aws-lambda-runtime/blob/main/Sources/AWSLambdaRuntimeCore/LambdaHandler.swift) requires that an `init` method is implemented by the conforming type (`Lambda`). The `init` method can be used to instantiate any resources shared across multiple lambda runs.
3. [LambdaHandler](https://github.com/swift-server/swift-aws-lambda-runtime/blob/main/Sources/AWSLambdaRuntimeCore/LambdaHandler.swift) requires that a `handle` method is implemented by the conforming type. The `handle` method is similar to the `Lambda.run` method we saw earlier in the article. It takes in the same `input` and `context` parameters but, in this case, instead of providing a closure parameter to signal completion and return a [Result](https://developer.apple.com/documentation/swift/result), the `handle` method is marked as `async throws` and has a return type.

The use of `async/await` has made the code a lot easier to reason with and has eliminated the risk of forgetting to call completion.

It is also clearer to see what the response from the lambda is expected to be, as it has a return type, and it allows us to run asynchronous code in a very _'synchronous like'_ manner.

## There's more!

In this article I have only made use of the `LambdaHandler` protocol but there are more options available:

1. [SimpleLambdaHandler](https://github.com/swift-server/swift-aws-lambda-runtime/blob/main/Sources/AWSLambdaRuntimeCore/LambdaHandler.swift#L26): Provides a simplified version of the [LambdaHandler](https://github.com/swift-server/swift-aws-lambda-runtime/blob/main/Sources/AWSLambdaRuntimeCore/LambdaHandler.swift#L119) protocol. Both [LambdaHandler](https://github.com/swift-server/swift-aws-lambda-runtime/blob/main/Sources/AWSLambdaRuntimeCore/LambdaHandler.swift#L119) and [SimpleLambdaHandler](https://github.com/swift-server/swift-aws-lambda-runtime/blob/main/Sources/AWSLambdaRuntimeCore/LambdaHandler.swift#L26) protocols define a `handle` method but [SimpleLambdaHandler](https://github.com/swift-server/swift-aws-lambda-runtime/blob/main/Sources/AWSLambdaRuntimeCore/LambdaHandler.swift#L26) does not require an `init` method, which can be used to create resources shared across lambda runs.
2. [EventLoopLambdaHandler](https://github.com/swift-server/swift-aws-lambda-runtime/blob/main/Sources/AWSLambdaRuntimeCore/LambdaHandler.swift#L286): An [EventLoopFuture](https://apple.github.io/swift-nio/docs/current/NIOCore/Classes/EventLoopFuture.html) based implementation of the lambda handlers, which is designed for performance sensitive operations. Contrary to the way in which other implementations work, [EventLoopLambdaHandler](https://github.com/swift-server/swift-aws-lambda-runtime/blob/main/Sources/AWSLambdaRuntimeCore/LambdaHandler.swift#L286) conformant types [execute all code on the same EventLoop as the runtime engine](https://github.com/swift-server/swift-aws-lambda-runtime/blob/main/Sources/AWSLambdaRuntimeCore/LambdaHandler.swift#L282). This allows for a faster execution but requires paying a lot more attention to the implementation so that the EventLoop is never blocked.
3. [ByteBufferLambdaHandler](https://github.com/swift-server/swift-aws-lambda-runtime/blob/main/Sources/AWSLambdaRuntimeCore/LambdaHandler.swift#L401): A lower-level implementation of the [EventLoopLambdaHandler](https://github.com/swift-server/swift-aws-lambda-runtime/blob/main/Sources/AWSLambdaRuntimeCore/LambdaHandler.swift#L286) protocol. It is used by the higher-level [EventLoopLambdaHandler](https://github.com/swift-server/swift-aws-lambda-runtime/blob/main/Sources/AWSLambdaRuntimeCore/LambdaHandler.swift#L286) and, [as the source code states, EventLoopLambdaHandler should be chosen over ByteBufferLambdaHandler by the majority of users](https://github.com/swift-server/swift-aws-lambda-runtime/blob/main/Sources/AWSLambdaRuntimeCore/LambdaHandler.swift#L139).

## Proceed with caution

The `async/await` adoption has not yet been formally released and if you would like to be an early adopter and start using it, you need to set the revision of [swift-aws-lambda-runtime project](https://github.com/swift-server/swift-aws-lambda-runtime) to the `main` branch in your `Package.swift`.

> If you are planning on making use of these APIs in a production environment, I would recommend you wait until version 1.0 is formally released.

If you want to take a closer look at the code, [PR #273](https://github.com/swift-server/swift-aws-lambda-runtime/pull/273) provides an insight into what the API for the 1.0 release of [swift-aws-lambda-runtime](https://github.com/swift-server/swift-aws-lambda-runtime) will look like. I have to say I am a big fan of it and the awesome work the [swift-server](https://github.com/swift-server) team have been doing! ❤️
