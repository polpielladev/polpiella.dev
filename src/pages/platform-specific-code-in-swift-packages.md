---
title: 'Platform specific code in Swift Packages'
slug: 'platform-specific-code-in-swift-packages'
excerpt: ''
pubDate: '2022-08-17'
readtime: '5'
tags:
  [
    { name: 'Swift Package Manager', slug: 'spm' },
    { name: 'Open Source', slug: 'open-source' },
    { name: 'Swift', slug: 'swift' },
  ]
author:
  name: 'Pol Piella'
layout: ../layouts/BlogPostLayout.astro
---

I have recently been trying to get my Swift package [Reading Time]() to run in different environments and platforms in the form of a command line tool which takes in a markdown file and outputs the estimated average time it would take to read it.

While compiling for multiple platforms and architectures I have faced challenges and errors of all kinds. In this article, I will explain how I leveraged the power of [compiler directives]() to get past these errors.

## What are compiler directives?

Compiler directives, also known as [Compiler Control Statements](https://docs.swift.org/swift-book/ReferenceManual/Statements.html#ID538), allow your code to change the behaviour of the compiler. In this article I am going to focus on conditional statements (`#if/#endif` blocks) which can be used to provide multiple compilation routes based on a given value.

A common example of this is, for example, performing certain logic only when in debug configuration:

```swift:Networking.swift
#if DEBUG
networking.logLevel = .info
#else
networking.logLevel = .error
#endif
```

In the few sections I will show how useful conditional compiler directives can be when developing multi-platform software.

## APIs not available

One of the most common use cases of compiler directives are to provide alternative implementations (or even entirely bypass) unavailable APIs given a set of conditions, such as operating system or architecture. This becomes incredibly important when cross-compiling code, as toolchains will usually differ across different environments.

### ByWords option

I faced two big issues when compiling the reading time library for platforms other than macOS and iOS. The library uses the following code to get the number of words from a given String:

```swift:ReadingTime.swift
private static func count(wordsIn string: String) -> Int {
    var count = 0
    let range = string.startIndex..<string.endIndex
    string.enumerateSubstrings(in: range, options: [.byWords, .substringNotRequired, .localized], { _, _, _, _ -> () in
        count += 1
    })
    return count
}
```

This code, in comparison to other approaches such as using `CharacterSet`s works great as it uses a smarter mechanism than just splitting by certain characters (usually punctuation, new lines and white spaces). This code compiled great on macOS and iOS but, as soon as I tried to compile for Linux or Windows I faced the following error:

![]()

### DateComponentsFormatter

Another of those APIs which does not work outside the Apple platforms is `DateComponentsFormatter`. The ReadingTime command line tool uses it to print a formatted string of the estimated reading time:

```swift:ReadingTime.swift
func formattedString(from timeInterval: TimeInterval) -> String? {
    let dateFormatter: DateComponentsFormatter = {
        let formatter = DateComponentsFormatter()
        formatter.unitsStyle = .full
        formatter.allowedUnits = [.minute, .second]
        return formatter
    }()

    return dateFormatter.string(from: timeInterval)
}
```

Again, the solution is to apply a compiler directive and, in this case return `nil` if the API cannot be used. The optionality will be handled outside of the method and a fallback implementation will be provided:

```swift:ReadingTime.swift
func formattedString(from timeInterval: TimeInterval) -> String? {
    #if !os(Linux) && !os(Windows)
    let dateFormatter: DateComponentsFormatter = {
        let formatter = DateComponentsFormatter()
        formatter.unitsStyle = .full
        formatter.allowedUnits = [.minute, .second]
        return formatter
    }()

    return dateFormatter.string(from: timeInterval)
    #else
    return nil
    #endif
}
```

### PThreads and Wasm

Some other issues might not be as apparent as compiler errors. I spent a while trying to get Apple's [swift-markdown]() package to compile for Web Assembly (`wasm32` architecture) so I could run my library on the browser. The main problem I faced was with the library's use of `FileManager`, which is not available on the [SwiftWasm]() toolchain.

I decided to go ahead and fork the package and proceed to remove any mentions of `FileManager` until it compiled. I did not need the library to read from file, so I was happy to remove all that code. I then imported my fork and successfully got a `.wasm` file that I could put on a browser. I was so happy! But... as soon as the code executed, I was greeted with an error saying that, since `pthreads` (which [swift-markdow]() uses under the hood) are not supported by the [SwiftWasm]() toolchain, a `FakePthread` implementation had shimmied in.

I had to find an alternative, I went back to importing Apple's own swift-markdown package (instead of my fork) and proceeded to use a combination of compiler directives and dependency conditions in the project's `Package.swift`.

```swift:Package.swift
.target(
  name: "ReadingTime",
  dependencies: [
    .product(
      name: "Markdown",
      package: "swift-markdown",
      condition: .when(platforms: [
        .linux,
        .macOS,
        .windows,
        .iOS,
        .watchOS
      ])
    )
  ]
),
```

And then, removed all the usages of [swift-markdown]() when the architecture matched `wasm32`, providing a fallback regex-based implementation:

```swift:MarkdownRewriter.swift
#if !arch(wasm32)
import Markdown

struct Rewriter: MarkupRewriter {
    mutating func visitImage(_ image: Image) -> Markup? {
        nil
    }

    func visitLink(_ link: Link) -> Markup? {
        guard let linkTitle = link.children.first(where: { $0 is Text }) else { return link }

        return linkTitle
    }
}
#endif

public struct MarkdownRewriter {
    public let text: String

    public init(text: String) {
        self.text = text
    }

    public func rewrite() -> String {
        #if !arch(wasm32)

        let document = Document(parsing: text)
        var rewriter = Rewriter()
        let updatedDocument = rewriter.visitDocument(document)
        return updatedDocument!.format()

        #else
        return RegexParser.rewrite()
        #endif
    }
}
```

The reason I could just not exclude the package dependency entirely from the `Package.swift` file is that compiler directives will only be useful for the host machine and not the target. In this case, the host is macOS and the target is Web Assembly.

## Windows: Preventing packages from being fetched

A stranger issue I faced was, not surprisingly, when I tried to build for Windows. I have a single Swift Package with a number of targets that acts as a monorepo. This means that, in order to build or test any target, all dependencies must be fetched and checked out by the swift build system. They then might or might not be built depending on whether the target that is being built uses them or not.

This is usually fine, unless Windows decides to throw a spanner in the works 😅. On my first build I was greeted with the following error:

![]()

It turns out that in Windows, git can not check out files which path contains a colon and Danger, one of the dependencies I use for my CI has a couple of markdown files with colons in their paths.

After trying a number of potential solutions with no luck, such as setting some values in git's global config to allow colons, I decided to take a different approach to solve the build problem. I added some compiler directives to remove the `Danger` related dependencies, products and targets from the build tree when the host machine is running Windows:

```swift:Package.swift
// ...
#if !os(Windows)
dependencies.append(.package(url: "https://github.com/danger/swift.git", from: "3.12.1"))
targets.append(.target(name: "DangerDeps", dependencies: [.product(name: "Danger", package: "swift")]))
products.append(.library(name: "DangerDeps", type: .dynamic, targets: ["DangerDeps"]))
#endif

let package = Package(
    name: "ReadingTime",
    platforms: [.iOS(.v8), .macOS(.v12)],
    products: products,
    dependencies: dependencies,
    targets: targets
)
```

This solution, albeit not ideal, got me past the problem and I now have [a successful Windows build](https://github.com/pol-piella/reading-time/actions/runs/3170321189)! 🎉
