---
title: 'Code generation using Swift Package Plugins'
slug: 'code-generation-using-swift-package-plugins'
excerpt: 'Building a Swift Package Plugin to automatically generate unit tests for a specific protocol.'
pubDate: '2022-07-05'
readtime: '7'
tags:
  [
    { name: 'Swift Package Manager', slug: 'spm' },
    { name: 'Swift', slug: 'swift' },
  ]
author:
  name: 'Pol Piella'
layout: ../layouts/BlogPostLayout.astro
draft: true
---

A while ago I was working on a new service at work which consisted of a Swift Package exposing a protocol similar to `Decodable` for the rest of our app to use. In fact, the protocol inherited from `Decodable` itself and looked like this:

```swift:Fetchable.swift
protocol Fetchable: Decodable, Equatable {}
```

The new package would take types which conformed to the new protocol and attempt to decode them from a block of JSON data, either from a remote source or cached.

As part of this work, and since this service was crucial to the correct functioning of the app, we wanted to make sure there was always a fail-safe, so we made the app ship with a fallback JSON file which would be used if both the data from the server and the cache was invalid. 

We needed the new types conforming to `Fetchable` to decode correctly from the fallback data no matter what. There was a slight problem though, it would sometimes be hard to spot if there were any errors either in the fallback JSON file or in the models themselves, as decoding errors would happen at runtime and when certain screens/features were accessed.

To give us more **confidence**, we added a number of **unit tests**, which attempted to decode each of these models conforming to the `Fetchable` protocol against the fallback JSON we shipped with. These would give us an early indication on our CI that something was wrong and we would know for certain that the new service would always have a **functioning fail-safe** once we released it.

 We wrote these tests manually but we soon realised that this solution wasn't scalable because, as more and more types conforming to the `Fetchable` protocol were added, we were introducing a lot of code duplication and potential for someone to eventually forget to write these tests for a specific feature.

We thought of automating the process, but we faced a few issues because of the nature of the codebase — highly modular with a mixture of Xcode projects and Swift Packages, and some architectural decisions that meant that we had to gather quite a lot of symbol information to be able to get the correct types to test. 

## What made me look at it again?

After forgetting about it for a while, the announcement of Xcode 14 allowing Swift Package Plugins to be used within Xcode projects along with a couple of architecture changes which made extracting type information a lot easier, gave me the motivation to start investigating this again.

> Build tool plugins are not yet available in Xcode 14 Beta 2 as the release notes specify, but will be made available in a future version of Xcode 14.

Over the past couple of weeks I have been looking at how to generate unit tests using a package plugin and, in this article, I will explain where I got up to and what it involved.

## Implementation Details

I set out on a mission to create a [Build Tool Plugin]() which, unlike [Command Plugins] - introduced with Xcode 14 - which run arbitrarily and rely on user input, run as part of the build process of a Swift Package.

I knew I needed to create an executable, as Build Tool Plugins rely on these to be able to perform actions, which needed to perform the following actions:

1. Scan a target directory and extract all `.swift` files.
2. Use [sourcekit](), or more specifically [SourceKitten](), to scan through those swift files and gather type information. This would allow extracting all the types that conformed to the `Fetchable` protocol so that tests could be written against them.
3. After getting those types, generate a `.swift` file with a `XCTestCase` containing unit tests for each of these types.

## Let's write some code

As with all Swift Packages, we get started by running `swift package init`. This creates two targets, one where we'll write the code containing the `Fetchable` protocol definition and the types conforming to it, and a test target where we'll apply the plugin to generate unit tests.

```swift:Package.swift
// swift-tools-version: 5.6
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "CodeGenSample",
    platforms: [.macOS(.v10_11)],
    products: [
        .library(
            name: "CodeGenSample",
            targets: ["CodeGenSample"]),
    ],
    dependencies: [
    ],
    targets: [
        .target(
            name: "CodeGenSample",
            dependencies: []
        ),
        .testTarget(
            name: "CodeGenSampleTests",
            dependencies: ["CodeGenSample"]
        )
     ]
)
```

### Writing an executable

All build tool plugins need an executable to perform all necessary operations. As I tend to do, since it is the language that I am most comfortable with, I decide to write my executable in `Swift`.

I decided to use a couple of dependencies to make my life easier when writing the executable. The first one was [SourceKitten]() - specifically its SourceKittenFramework library, a Swift wrapper to help me write sourcekit requests using Swift code and [swift-argument-parser](), a package provided by Apple to make it easy to create command line tools and pass in arguments on execution. 

After creating the `executableTarget` and giving it both dependencies, this is what the `Package.swift` looked like:

```swift:Package.swift
// swift-tools-version: 5.6
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "CodeGenSample",
    platforms: [.macOS(.v10_11)],
    products: [
        .library(
            name: "CodeGenSample",
            targets: ["CodeGenSample"]),
    ],
    dependencies: [
        .package(url: "https://github.com/jpsim/SourceKitten.git", exact: "0.32.0"),
        .package(url: "https://github.com/apple/swift-argument-parser", from: "1.0.0")
    ],
    targets: [
        .target(
            name: "CodeGenSample",
            dependencies: []
        ),
        .testTarget(
            name: "CodeGenSampleTests",
            dependencies: ["CodeGenSample"]
        ),
        .executableTarget(
            name: "PluginExecutable",
            dependencies: [
                .product(name: "SourceKittenFramework", package: "SourceKitten"),
                .product(name: "ArgumentParser", package: "swift-argument-parser")
            ]
        )
     ]
)
```

Executable targets need an entry point so, under the source directory for the `PluginExecutable` target, I created a file called `PluginExecutable.swift` where all the executable logic would live.

I started by importing the necessary dependencies and creating the executable's entry point and declaring the 4 inputs it would take. I then added all the logic and method calls to the `run` function, which is the method that gets run when the executable is called.

```swift:PluginExecutable.swift
import SourceKittenFramework
import ArgumentParser
import Foundation

@main
struct PluginExecutable: ParsableCommand {
    @Argument(help: "The protocol name to match")
    var protocolName: String

    @Argument(help: "The module's name")
    var moduleName: String

    @Option(help: "Directory containing the swift files")
    var input: String

    @Option(help: "The path where the generated files will be created")
    var output: String

    func run() throws {
		    // 1
        let files = try deepSearch(URL(fileURLWithPath: input, isDirectory: true))
        // 2
        setenv("IN_PROCESS_SOURCEKIT", "YES", 1)
        let structures = try files.map { try Structure(file: File(path: $0.path)!) }
        // 3
        var matchedTypes = [String]()
        structures.forEach { walkTree(dictionary: $0.dictionary, acc: &matchedTypes) }
        // 4
        try createOutputFile(withContent: matchedTypes)
    }

    // ...
}
```

Let's now focus on the `run` method above and the calls inside it:
1. First, the target directory is scanned to find all `.swift` files in it. This is done recursively so that subdirectories are also considered.
2. For each of the files found in the previous call, a `Structure` request is made through [SourceKitten]() to find out the type information for the swift code in the file. Note that an environment variable (`IN_PROCESS_SOURCEKIT`) is also being set to true. This is needed to ensure that the in-process version of sourcekit is selected so that it can comply with the plugin's sandboxing rules. 
3. Walk all of the responses from the previous call and scan the type information to extract any types which conform to the `Fetchable` protocol.
4. Create an output file with unit tests for each of these types.

> Note that there is no focus on the specifics of each of the calls above, but if you are interested in the implementation, [the repo containing all the code]() is public on Github! 🎉

### Creating the plugin

Now that the executable is done, it was time for me to build the plugin itself. As I did when I created the executable, I adde a `.plugin` target to the `Package.swift` and created the relevant file for the plugin implementation (`Plugins/SourceKitPlugin/SourceKitPlugin.swift`).

```swift:Package.swift
// swift-tools-version: 5.6
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "CodeGenSample",
    platforms: [.macOS(.v10_11)],
    products: [
        .library(
            name: "CodeGenSample",
            targets: ["CodeGenSample"]),
    ],
    dependencies: [
        .package(url: "https://github.com/jpsim/SourceKitten.git", exact: "0.32.0"),
        .package(url: "https://github.com/apple/swift-argument-parser", from: "1.0.0")
    ],
    targets: [
        .target(
            name: "CodeGenSample",
            dependencies: []
        ),
        .testTarget(
            name: "CodeGenSampleTests",
            dependencies: [“CodeGenSample"],
plugins: [“SourceKitPlugin”],
        ),
        .executableTarget(
            name: "PluginExecutable",
            dependencies: [
                .product(name: "SourceKittenFramework", package: "SourceKitten"),
                .product(name: "ArgumentParser", package: "swift-argument-parser")
            ]
        ),
        .plugin(
            name: "SourceKitPlugin",
            capability: .buildTool(),
            dependencies: [.target(name: "PluginExecutable")]
        )
     ]
)
```

Moving on to the plugin's implementation, the first thing I did was to create a `struct` which conformed to the `BuildToolPlugin`'s protocol and, within the `createBuildCommands` method, I returned an array with a single build command.

It needs to be given a name and a path for the executable to be run, which can be found in the plugin's context:

> This plugin uses a `buildCommand` instead of a `preBuildCommand` as it needs to be run as part of the build process and not before it, so it can get a chance to build and use the executable it is depending on. Another point in favour of `buildCommand` in this case is that it will only get run when its input files change, rather than every time the target is built.

```swift:SourceKitPlugin.swift
import PackagePlugin

@main
struct SourceKitPlugin: BuildToolPlugin {
    func createBuildCommands(context: PluginContext, target: Target) async throws -> [Command] {
        return [
            .buildCommand(
                displayName: "Protocol Extraction!",
                executable: try context.tool(named: "PluginExecutable").path,
                arguments: [
                    "FindThis",
                    🤷‍♂️,
                    "--input",
                    🤷‍♂️,
                    "--output",
                    🤷‍♂️
                ],
                environment: ["IN_PROCESS_SOURCEKIT": "YES"],
                outputFiles: [🤷‍♂️]
            )
        ]
    }
}
```

As you can see in the snippet above, there are a few gaps that need to be filled (🤷‍♂️), which can be tackled by:

1. Providing an `outputPath` where the unit tests file will be generated. This will be in the `pluginWorkDirectory`, which again can be found in the context. This directory provides read-write access and any files that are created there will be part of the package's build process.
2. Providing an input path and a module name. This is the trickiest part, we need these to be the target being tested rather than the target that the plugin is being applied to. Thankfully for us the plugin's target's dependencies are accessible and we can grab the dependency we are interested in from that array.

```swift:SourceKitPlugin.swift
import PackagePlugin

@main
struct SourceKitPlugin: BuildToolPlugin {
    func createBuildCommands(context: PluginContext, target: Target) async throws -> [Command] {
        let outputPath = context.pluginWorkDirectory.appending(“GeneratedTests.swift”)

        guard let dependencyTarget = target
            .dependencies
            .compactMap { dependency -> Target? in
                switch dependency {
                case .target(let target): return target
                default: return nil
                }
            }
            .filter { "\($0.name)Tests" == target.name  }
            .first else {
                Diagnostics.error("Could not get a dependency to scan!”)

                return []
        }

        return [
            .buildCommand(
                displayName: "Protocol Extraction!",
                executable: try context.tool(named: "PluginExecutable").path,
                arguments: [
                    "FindThis",
                 dependencyTarget.name,
                    "--input",
                    dependencyTarget.directory,
                    "--output",
                    outputPath
                ],
                environment: ["IN_PROCESS_SOURCEKIT": "YES"],
                outputFiles: [outputPath]
            )
        ]
    }
}
```

> Note the way that optionality is handled. If a *suitable* target can't be found within the test target's dependencies, then the [Diagnostics API]() is used to relay an error back to Xcode and tell it to fail the build process.

## Let's see the result

We're done! Let's run it in Xcode now. To test this approach, a test file with the following content was provided to be scanned:

```swift:CodeGenSample.swift
import Foundation

protocol Fetchable: Decodable, Equatable {}

struct FeatureABlock: Fetchable {
    let featureA: FeatureA
    
    struct FeatureA: Fetchable {
        let url: URL
    }
}

enum Root {
    struct RootBlock: Fetchable {
        let url: URL
        let areAllFeaturesEnabled: Bool
    }
}
```

Given this input and running the tests on the main target, a `XCTestCase` is generated and run, containing tests for the two types conforming to the `Fetchable`.

```swift:GeneratedTests.swift
import XCTest
@testable import CodeGenSample

class GeneratedTests: XCTestCase {
	func testFeatureABlock() {
		assertCanParseFromDefaults(FeatureABlock.self)
	}
	func testRoot_RootBlock() {
		assertCanParseFromDefaults(Root.RootBlock.self)
	}

    private func assertCanParseFromDefaults<T: Fetchable>(_ type: T.Type) {
        // Logic goes here...
    }
}
```

And all the tests pass - although they don't really do a whole lot at the moment  😅✅.