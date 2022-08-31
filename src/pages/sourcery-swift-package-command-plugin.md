---
title: 'Sourcery Swift Package command plugin'
slug: 'sourcery-swift-package-command-plugin'
excerpt: 'Building a command plugin to execute Sourcery from scratch and explaining the challenges faced while doing so.'
pubDate: '2022-08-30'
readtime: '8'
tags:
  [
    { name: 'Swift Package Manager', slug: 'spm' },
    { name: 'Tools', slug: 'tools' },
    { name: 'Swift', slug: 'swift' },
  ]
author:
  name: 'Pol Piella'
layout: ../layouts/BlogPostLayout.astro
setup: |
  import Video from '../components/Video.jsx'
---

## What is Sourcery?

[Sourcery](https://github.com/krzysztofzablocki/Sourcery) is one of the most popular code generation tools for Swift. It uses [SwiftSyntax](https://github.com/apple/swift-syntax) under the hood and its purpose is to save developers time by automatically generating boilerplate code. Sourcery works by scanning a set of input files and then, with the help of some [templates](https://github.com/krzysztofzablocki/Sourcery/blob/master/guides/Writing%20templates.md), it generates Swift code as an ouput based on the definitions in such templates.

## An Example

Consider a protocol which provides a public API for a camera session service:

```swift:Camera.swift
protocol Camera {
  func start()
  func stop()
  func capture(_ completion: @escaping (UIImage?) -> Void)
  func rotate()
}
```

When we come to unit test features that use this new `Camera` service, we want to make sure that an actual `AVCaptureSession` is not created. We just want to make sure that the right calls to the camera service are made from our system under test (SUT), rather than testing the `Camera` service implementation itself.

For this reason, it makes sense to create a mock implementation of the protocol with empty methods and a set of variables to help us unit test and assert that the correct calls are being made. This is a very common scenario in Software Development and, if you have ever maintained a big codebase with a lot of unit tests, this can be a bit tedious to do too.

Well, worry not! Sourcery can help! ⭐️ There is a template called [AutoMockable](https://github.com/krzysztofzablocki/Sourcery/blob/master/Templates/Templates/AutoMockable.stencil) which generates mocks for any protocols conforming to `AutoMockable` in its input sources.

> Little sidebar: In this article I use the term `Mock` extensibly as it lines up with the terminology that Sourcery's template uses. `Mock` is a rather overloaded term though and normally, if I was to create a test double, I would further specify the type's name depending on the purpose it serves (could be a `Spy`, a `Fake`, a `Stub`, etc.). There is a [very good article](https://martinfowler.com/articles/mocksArentStubs.html) by [Martin Fowler](https://twitter.com/martinfowler) explaining the differences if you are interested in learning a bit more about test doubles.

Let's now update the `Camera` protocol to conform to the newly defined and empty `AutoMockable` protocol. This interface's sole purpose is to act as a target for Sourcery to find and generate code from it.

```swift:Camera.swift
import UIKit

// Protocol to be matched
protocol AutoMockable {}

public protocol Camera: AutoMockable {
  func start()
  func stop()
  func capture(_ completion: @escaping (UIImage?) -> Void)
  func rotate()
}
```

At this point the Sourcery command can be run on the input file above, specifying the path to the `AutoMockable` template file:

```bash:Terminal
sourcery --sources Camera.swift --templates AutoMockable.stencil --output .
```

> Alternatively, and this is the way that the plugin in this article will be configured, a `.sourcery.yml` configuration file can be provided. If a configuration file is provided or can be found by Sourcery, then all command line arguments that conflict with its values will be ignored. If you want to learn more about configuration files, [there is a section in Sourcery's repo covering the topic](https://github.com/krzysztofzablocki/Sourcery/blob/master/guides/Usage.md#configuration-file).

Once the command has finished executing, a new file will appear with the template's name followed by `.generated.swift` and under the specified output directory. In this case, this would be `./AutoMockable.generated.swift`:

```swift:AutoMockable.generated.swift
// Generated using Sourcery 1.8.2 — https://github.com/krzysztofzablocki/Sourcery
// DO NOT EDIT
// swiftlint:disable line_length
// swiftlint:disable variable_name

import Foundation
#if os(iOS) || os(tvOS) || os(watchOS)
import UIKit
#elseif os(OSX)
import AppKit
#endif

class CameraMock: Camera {

    //MARK: - start

    var startCallsCount = 0
    var startCalled: Bool {
        return startCallsCount > 0
    }
    var startClosure: (() -> Void)?

    func start() {
        startCallsCount += 1
        startClosure?()
    }

    //MARK: - stop

    var stopCallsCount = 0
    var stopCalled: Bool {
        return stopCallsCount > 0
    }
    var stopClosure: (() -> Void)?

    func stop() {
        stopCallsCount += 1
        stopClosure?()
    }

    //MARK: - capture

    var captureCallsCount = 0
    var captureCalled: Bool {
        return captureCallsCount > 0
    }
    var captureReceivedCompletion: ((UIImage?) -> Void)?
    var captureReceivedInvocations: [((UIImage?) -> Void)] = []
    var captureClosure: ((@escaping (UIImage?) -> Void) -> Void)?

    func capture(_ completion: @escaping (UIImage?) -> Void) {
        captureCallsCount += 1
        captureReceivedCompletion = completion
        captureReceivedInvocations.append(completion)
        captureClosure?(completion)
    }

    //MARK: - rotate

    var rotateCallsCount = 0
    var rotateCalled: Bool {
        return rotateCallsCount > 0
    }
    var rotateClosure: (() -> Void)?

    func rotate() {
        rotateCallsCount += 1
        rotateClosure?()
    }

}
```

The file above contains what you would expect from a mock: conformance to the target protocol with empty method implementations and a set of variables to check whether these protocol methods have been called. And the best part... Sourcery writes it all for you! 🎉

## How to run Sourcery from a Swift Package?

By now you might be wondering how or when to run Sourcery in a Swift package. You could do it manually and drag the files in to the package or run the script from the command line in the package's directory but, for Swift Packages, there are two built-in ways of running executables:

1. Via a **command plugin**, which is run arbitrarily based on user input
2. Via a **build tool plugin**, which is run as part of the package's build process.

In this article I will be covering what a Sourcery command plugin looks like, but I am already working on a part two where I will be creating a build tool plugin, which presents numerous interesting challenges.

## Creating the plugin package

Let's first start by creating an empty package and getting rid of tests and other folders we will not need for now. Then we can create a new `plugin` target and add Sourcery's binary as its dependency.

For this plugin to be used by consumers it also needs to be defined as a product:

```swift:Package.swift
// swift-tools-version: 5.6
import PackageDescription

let package = Package(
    name: "SourceryPlugins",
    products: [
        .plugin(name: "SourceryCommand", targets: ["SourceryCommand"])
    ],
    targets: [
        // 1
        .plugin(
            name: "SourceryCommand",
            // 2
            capability: .command(
                intent: .custom(verb: "sourcery-code-generation", description: "Generates Swift files from a given set of inputs"),
                // 3
                permissions: [.writeToPackageDirectory(reason: "Need access to the package directory to generate files")]
            ),
            dependencies: ["Sourcery"]
        ),
        // 4
        .binaryTarget(
            name: "Sourcery",
            path: "Sourcery.artifactbundle"
        )
    ]
)
```

Let's take a closer look at the code above, step by step:

1. The plugin target is defined.
2. A `.command` capability is defined with a `custom` intent, as none of the default capabilities (`documentationGeneration` and `sourceCodeFormatting`) match this command's use case. It is important to give `verb` a sensible name as this is the way the plugin will be called from the command line.
3. The plugin needs to ask for the user's permissions to write to the package's directory, as that is where the generated files will be dumped.
4. A binary target is defined for the plugin to use. This will give the plugin access to the executable through its context.

> I know that I have not gone into a lot of detail about a few of the concepts above but if you would like to learn more about command plugins, [here is an awesome article](https://theswiftdev.com/beginners-guide-to-swift-package-manager-command-plugins/) by [Tibor Bödecs](https://twitter.com/tiborbodecs) ⭐. I have [an article about binary targets in Swift Packages](https://www.polpiella.dev/binary-targets-in-modern-swift-packages) if you'd like to learn a bit more about that too 📦.

## Writing the plugin

Now that the package is created, it is time to write some code! Let's start by creating a file named `SourceryCommand.swift` under `Plugins/SourceryCommand` and add a struct conforming to `CommandPlugin`, which will act as the plugin's entrypoint:

```swift:SourceryCommand.swift
import PackagePlugin
import Foundation

@main
struct SourceryCommand: CommandPlugin {
    func performCommand(context: PluginContext, arguments: [String]) async throws {

    }
}
```

Let's then write the implementation code for the command:

```swift:SourceryCommand
func performCommand(context: PluginContext, arguments: [String]) async throws {
    // 1
    let configFilePath = context.package.directory.appending(subpath: ".sourcery.yml").string
    guard FileManager.default.fileExists(atPath: configFilePath) else {
        Diagnostics.error("Could not find config at: \(configFilePath)")
        return
    }

    //2
    let sourceryExecutable = try context.tool(named: "sourcery")
    let sourceryURL = URL(fileURLWithPath: sourceryExecutable.path.string)

    // 3
    let process = Process()
    process.executableURL = sourceryURL

    // 4
    process.arguments = [
        "--disableCache"
    ]

    // 5
    try process.run()
    process.waitUntilExit()

    // 6
    let gracefulExit = process.terminationReason == .exit && process.terminationStatus == 0
    if !gracefulExit {
        Diagnostics.error("🛑 The plugin execution failed")
    }
}
```

Let's take a closer look at the code above:

1. First, the `.sourcery.yml` file must be provided by the target package at its root directory, otherwise an error is thrown. This will allow Sourcery to do its magic and make the package configurable 🪄.
2. The URL with the executable's path is retrieved from the command's context.
3. A `Process` is created and Sourcery's executable's URL is set as its executable path.
4. This step is a bit of a work-around. Sourcery uses caching to reduce code generation times between subsequent runs, but the problem is that these caches are files which get read and written to outside of the package's folder. This is not allowed by the plugin's sandboxing rules, so the `--disableCache` flag is used to disable this behaviour and allow the command to run.
5. The process is run and awaited synchronously.
6. Last but not least, the process termination status and code are checked to make sure the process has exited gracefully. In any other case, the consumer is notified of an error through the `Diagnostics` API.

That's it! Let's now use it 🚀

## Using the package

Consider a client consuming the plugin that has brought the dependency into their `Package.swift` file:

```swift:Package.swift
// swift-tools-version: 5.6
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "SourceryPluginSample",
    products: [
        // Products define the executables and libraries a package produces, and make them visible to other packages.
        .library(
            name: "SourceryPluginSample",
            targets: ["SourceryPluginSample"]),
    ],
    dependencies: [
        .package(url: "https://github.com/pol-piella/sourcery-plugins.git", branch: "main")
    ],
    targets: [
        .target(
            name: "SourceryPluginSample",
            dependencies: [],
            exclude: ["SourceryTemplates"]
        ),
    ]
)
```

> Note that, unlike build tool plugins, command plugins do not need to be applied to any targets, as they need to be run manually.

The client has a single usage of the `AutoMockable` template above (which can be found under `Sources/SourceryPluginSample/SourceryTemplates`) matching the example shown earlier in the article:

```swift:Camera.swift
protocol AutoMockable {}

protocol Camera: AutoMockable {
    func start()
    func stop()
    func capture(_ completion: @escaping (UIImage?) -> Void)
    func rotate()
}
```

As required by the plugin, the client also provides a `.sourcery.yml` config file at the root directory of the `SourceryPluginSample` package:

```yaml:.sourcery.yml
sources:
  - Sources/SourceryPluginSample
templates:
  - Sources/SourceryPluginSample/SourceryTemplates
output: Sources/SourceryPluginSample
```

## Running the command

The client's all set up, but how do they run the package now? 🤔 Well there are two ways to do it:

### Command Line

One way to run the plugin is from the command line. A list of plugins available for a specific package can be retrieved by running `swift package plugin --list` from the package's directory. A package can then be picked from the list and executed by running `swift package <command's verb>`, in this particular case `swift package sourcery-code-generation`.

Note that since this package requires special permissions, the `--allow-writing-to-package-directory` flag must be passed along with the command:

<Video src='/assets/posts/sourcery-swift-package-command-plugin/sourcery-command-cli.mp4' />

At this point you might be thinking, why would I bother writing a plugin that I have to still run from the command line when I can have a simple script do the same job in a couple of lines of bash? Well, let's take a look at what's coming in Xcode 14 and you'll see why I would definitely advocate for writing a plugin 📦.

### Xcode

This is the most exciting way to run command plugins but, unfortunately it is only available in Xcode 14. Hence, if you need to run the command and are not yet using Xcode 14, please refer to the Command Line section.

If you are lucky enough to be using Xcode 14, you can execute any of a package's commands by right clicking on the package in the file explorer, finding the plugin to execute from the list and just clicking it. As you see in the video below, the command generates an `AutoMockable.generated.swift` file with the content from Sourcery:

<Video src='/assets/posts/sourcery-swift-package-command-plugin/sourcery-command-xcode.mp4' />

## Next Steps

This is an initial implementation of the plugin. I will be looking into improving it and making it a bit more robust. As always, I am very committed to building in public and make all the content I can from my posts Open Source so anyone can file issues or create any PRs with improvements or fixes. This is no different 😀, [here is the link to the public repo](https://github.com/pol-piella/sourcery-plugins).

Also, if you liked this article, keep your eyes peeled for the second part coming soon, where I will be making a Sourcery build tool plugin. I know it doesn't sound like a lot, but it's not an easy task! 🔨
