---
title: 'Making a serverless Swift function with Fastly and Upstash'
slug: 'making-a-serverless-swift-function-with-fastly-and-upstash'
excerpt: ''
pubDate: '2023-01-17'
readtime: '4'
tags:
  [{ name: 'Serverless', slug: 'serverless' }, { name: 'Swift', slug: 'swift' }]
author:
  name: 'Pol Piella'
layout: ../layouts/BlogPostLayout.astro
setup: |
  import Video from '../components/Video.jsx'
---

[Fastly's Compute@Edge]() is a service which allows you to build and deploy serverless applications at the _edge_. These so called **edge functions** are deployed to a number of regions across the world so that they are as close to as many users as possible, without having to manage any servers or infrastructure.

I have been wanting to try this service out for a while as I believe edge functions are the future of server side applications. I recently came across the awesome work from [Andrew Barba](), who has made [a runtime to allow developers to write Fastly Compute@Edge functions in Swift](). In this article we'll go through how to use the runtime to make a URL shortener service.

## Creating a Swift package

The first step is to create an executable Swift package:

```bash:Terminal
swift package init --type executable --name URLShortener
```

The command above will create an empty Swift package with no dependencies.

Next, we need to define the [Compute] package as a dependency to the `URLShortener` target:

```swift:Package.swift
// swift-tools-version: 5.7

import PackageDescription

let package = Package(
    name: "URLShortener",
    platforms: [.macOS(.v11)],
    products: [
        .executable(name: "URLShortener", targets: ["URLShortener"])
    ],
    dependencies: [
        .package(url: "https://github.com/swift-cloud/Compute", from: "2.8.0")
    ],
    targets: [
        .executableTarget(
            name: "URLShortener",
            dependencies: ["Compute"]
        )
    ]
)
```

Now that `Compute` is available to the `URLShortener` target, its entry point (`main.swift`) can be modified to listen for events. The simplest compute handler consists of a awaited call to `onIncomingRequest`, which takes in a closure with two parameters (a request and a response). This closure is an `async` context, so modern structured concurrency can be used within it. The response parameter can be used to return `Encodable` data and a specific status code.

```swift:main.swift
import Compute

try await onIncomingRequest { request, response in
    try await response.status(200).send("Hello World!")
}
```

## Local development

To run our Swift code in [Fastly]() we must first compile it into a `wasm` file. To do this, we can use [SwiftWasm]()'s [fork of the Swift toolchain](), which can be installed using [swiftenv]():

```bash:Terminal
swiftenv install "https://github.com/swiftwasm/swift/releases/download/swift-wasm-5.7.1-RELEASE/swift-wasm-5.7.1-RELEASE-macos_$(uname -m).pkg"
```

After the download completes, we can tell [swiftenv]() to use `wasm-5.7.1` for the current directory:

```bash:Terminal
swiftenv local wasm-5.7.1
```

> If you would like to learn more about installing and managing multiple Swift toolchains, I have [an article on the topic in my blog](https://www.polpiella.dev/managing-multiple-swift-versions-locally).

We can now build the Swift package and generate a wasm file with the name of the product under `.build/debug/` like so:

```bash:Terminal
swift build -c debug --triple wasm32-unknown-wasi
```

To run the edge function locally we can now use the [Fastly CLI]() and give it the `.wasm` file we have just generated:

```bash:Terminal
# Install the Fastly CLI if needed
brew install fastly/tap/fastly

# Run a development server
fastly compute serve --skip-build --file ./.build/debug/URLShortener.wasm
```

If the command above succeeds, the [Fastly CLI]() should give you the URL for the local server it has spun up (e.g. `http://127.0.0.1:7676`). If you make a `GET` request to that URL, you should get a response of `"Hello World!"` with status code of `200`.

> Note that whenever you make any changes to your application you will have to kill the server, re-build and start the server again to see the new changes.

## Creating an Upstash redis database

The way URL shorteners usually work is that they store a set of entries in a database as key/value pairs. Whenever a request is received with a path which matches one of these keys (the short name of the URL), then the service immediately redirects to the URL stored in the value for the matched entry. For example, for a database with an entry of key `newsletter` and value `https://polpiella.dev/newsletter`, any calls to `https://servicedomain/newsletter` should redirect to `https://polpiella.dev/newsletter`.

A good option for a URL shortener edge function's database is [Upstash](). [Upstash]() is a serverless [redis]() database which, similarly to Fastly's Compute@Edge service, can be deployed globally so that data is always as close to the user as possible.

After signing up, creating a redis database in Upstash is straightforward:

1. Navigate to the console.
2. Click on the 'Create Database' button.
   ![A screenshot showing where the Create Database button in the Upstash console is located](/assets/posts/making-a-serverless-swift-function-with-fastly-and-upstash/create.webp)
3. Give the database a name and select 'Global' as the deployment region.
   ![A screenshot showing the database creation page with a name of url-shortener and the deployment region set to global](/assets/posts/making-a-serverless-swift-function-with-fastly-and-upstash/global.webp)

Now that the database is ready, we can add an entry of key `newsletter` and value `https://polpiella.dev/newsletter` that can then be retrieved from the serverless function through Upstash's CLI and a redis `SET` command:
![A screenshot showing how to add a new entry with a key-value pair through Upstash's CLI view](/assets/posts/making-a-serverless-swift-function-with-fastly-and-upstash/set.webp)

## Environment variables

To query the new [Upstash]() database we've just created, we'll use [Swift Cloud's Upstash library](). To interact with the database through this library we'll need to copy the rest API token and the database's endpoint from [Upstash]()'s console. We don't want to hardcode these values as strings in our code and we should make them available to our edge function as environment variables.

To do so, let's create a file called `secrets.json` and add the following content to it:

```json:Secrets.json
{
    "REDIS_HOST_NAME": "your_database_host_name_here",
    "REDIS_REST_TOKEN": "your_redis_rest_token_here"
}
```

> You should not commit the file with your secrets on it as this will be used only for local development. Once you deploy the function, you will need to create a dictionary called `secrets` with the same key-value pairs as before. I would highly recommend you to add `secrets.json` to your `.gitignore` to prevent it from ever being committed.

We need to map this file to a [dictionary which Fastly can understand]() through the edge function's configuration. Create a `fastly.toml` file and add the following contents to it:

```toml:fastly.toml
language = "swift"
manifest_version = 2

[local_server]
  [local_server.dictionaries]
    [local_server.dictionaries.secrets]
      file = "secrets.json"
      format = "json"
```

The configuration file above creates a dictionary called `secrets` for the local server with the contents of the `secrets.json` file.

The [ConfigStore]() object from [Compute]() is responsible for retrieving data for any specific dictionaries it can find. In this case, it should retrieve the values for the `secrets` dictionary and return an internal error if it can't.

```swift:main.swift
import Compute

try await onIncomingRequest { request, response in
    let secrets = try ConfigStore(name: "secrets")
    guard let upstashHostName = secrets.get("REDIS_HOST_NAME"),
          let upstashToken = secrets.get("REDIS_REST_TOKEN") else {
        try await res.status(500).write("Missing secrets...")
        return
    }

    try await response.status(200).send("Hello World!")
}
```

Building the package and running the server again should still work.

## Retrieving path parameters

Before retrieving a URL for a given key, we need to find out which URL the user wants to retrieve. As I said earlier, we need to get the first path parameter from the request URL and use it to query [Upstash]() for a destination to redirect to.

[Compute]() provides a routing mechanism very similar to [Vapor's routing-kit](https://github.com/vapor/routing-kit). It allows us to define routes and provide specific handlers for each of them. If you come from a web development background, this is also very similar to frameworks such as [hono]() or [express]().

Our API will have a single route and will only listen for `'GET'` request on routes with a single path component:

```swift:main.swift
import Compute

// 1
let router = Router()

// 2
router.get("/:key") { request, response in
    // 3
    let secrets = try ConfigStore(name: "secrets")
    guard let upstashHostName = secrets.get("REDIS_HOST_NAME"),
          let upstashToken = secrets.get("REDIS_REST_TOKEN"),
          let key = request.pathParams.get("key") else {
        try await response.status(500).write("Missing secrets...")
        return
    }

    // 4
    do {
        // Hardcoded for now...
        let redirectPath = "https://polpiella.dev/newsletter"
        try await response.redirect(redirectPath, permanent: true)
    } catch {
        try await response.status(404).write("Could not find link for a key with name: \(key)")
    }
}

// 5
try await router.listen()
```

The new routing mechanism requires a bit of a rewrite as we're not using the `onIncomingRequest` function and using a `Router` instead:

1. Define a `Router` where the available routes will be defined.
2. Define a route with `GET` method with a single parameter called key. This key can be retrieved through the `request.pathParams` property.
3. Retrieve all secrets and the `key` path parameter and return with a server error if any of them are missing.
4. If possible, redirect to a URL (which is hardcoded for now) or fail with a not found error if not. For SEO reasons, we do a permanent redirect, which will make the status code `308`.
5. Finally, make the router listen to incoming requests.

## Retrieving a value from Upstash

Now that all secrets are available and routing is set up, the retrieved key from the request's path can be used to retrieve values from [Upstash](). To do this, we'll use [Swift Cloud's Upstash]() library, so let's add it as a dependency to `URLShortener`:

```swift:Package.swift
// swift-tools-version: 5.7

import PackageDescription

let package = Package(
    name: "URLShortener",
    platforms: [.macOS(.v11)],
    products: [
        .executable(name: "URLShortener", targets: ["URLShortener"])
    ],
    dependencies: [
        .package(url: "https://github.com/swift-cloud/Compute", from: "2.8.0"),
        .package(url: "https://github.com/swift-cloud/Upstash", branch: "main")
    ],
    targets: [
        .executableTarget(
            name: "URLShortener",
            dependencies: ["Compute", "Upstash"]
        )
    ]
)
```

In the executable target's code we can then use the library to retrieve the correct URL for a given key:

```swift:main.swift
import Compute

let router = Router()

router.get("/:key") { request, response in
    // 3
    let secrets = try ConfigStore(name: "secrets")
    guard let upstashHostName = secrets.get("REDIS_HOST_NAME"),
          let upstashToken = secrets.get("REDIS_REST_TOKEN"),
          let key = request.pathParams.get("key") else {
        try await response.status(500).write("Missing secrets...")
        return
    }

    let client = RedisClient(hostname: upstashHostName, token: upstashToken)
    do {
        let redirectPath: String = try await client.get(key)
        try await res.redirect(redirectPath, permanent: true)
    } catch {
        try await response.status(404).write("Could not find link for a key with name: \(key)")
    }
}

try await router.listen()
```

Let's add a couple more values to the Upstash database (`blog: https://polpiella.dev`, `gh: https://github.com/pol-piella`) and test the implementation works:

<Video src='/assets/posts/making-a-serverless-swift-function-with-fastly-and-upstash/url-shortener.mp4' controls={false} />

## Deploying

I won't go into too much detail on how to deploy the edge function as [Andrew Barba]() has created a [delightful blog post explaining thoroughly how to do so](https://swift.cloud/blog/deploy-server-side-swift-to-fastly). In a nutshell, there are two ways to deploy a Swift Fastly Compute@Edge function:

1. Using [Swift Cloud](). This is by far the easiest way of deploying the edge function. It allows you to connect a Github repo and handles all the building and deploying for you on every push to a specific branch. You must proceed with caution as it is still on beta and some functionalities, such as setting custom domains, are not yet available.
2. Using [Fastly](). You can deploy directly to [Fastly](), but it requires some extra work. [Andrew Barba's blog post shows you an example of a Github action which deploys the function on every push to main]().

## I made a template!

I decided to put together a [template repository](https://github.com/pol-piella/swift-fastly-edge-function) to make it easier to start developing a new Fastly edge function with Swift.

This was completely inspired by the [demo project Andrew Barba put together]() for the [Serverside Swift Conference](https://github.com/swift-cloud/sss-conf), so all credit to him, I just collated a lot of the information and put together a template. If you'd like a template with more examples, the [Swift Cloud starter-kit template is also available](https://github.com/swift-cloud/starter-kit).
