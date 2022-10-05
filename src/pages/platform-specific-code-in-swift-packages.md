---
title: 'Platform specific code in Swift Packages'
slug: 'platform-specific-code-in-swift-packages'
excerpt: 'A set of examples showing how useful compiler directives can become when building cross-platform Swift programs.'
pubDate: '2022-08-17'
readtime: '7'
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

I have recently been trying to get a command line tool written entirely in Swift which uses my pacakge [Reading Time](https://swiftpackageindex.com/pol-piella/reading-time) to run in different environments and platforms. The tool takes in the path to a markdown file as an input and outputs the estimated average time it would take to read it.

While compiling for multiple platforms and architectures, I have faced challenges and errors of all kinds. In this article, I will explain how I leveraged the power of [compiler directives](https://docs.swift.org/swift-book/ReferenceManual/Statements.html#ID538) to get past some of these.

## What are compiler directives?

Compiler directives, also referred to as [Compiler Control Statements](https://docs.swift.org/swift-book/ReferenceManual/Statements.html#ID538) in Apple's documentation, allow developers to make changes to the compiler's behaviour directly from Swift code. In this article I am going to focus on conditional statements (`#if/#endif` blocks) which can be used to provide multiple compilation routes based on a given value.

For example, conditional compiler statements can be used to perform different logic based on a scheme's configuration (commonly `DEBUG` vs `RELEASE`):

```swift:Networking.swift
#if DEBUG
networking.logLevel = .info
#else
networking.logLevel = .error
#endif
```

## APIs not available

A common use case of compiler directives is to provide alternative implementations (or even entirely bypass) of APIs which are unavailable under certain conditions, such as on specific operating systems or architectures.

This becomes incredibly important when cross-compiling code, as toolchains will usually differ across different environments.

### ByWords option

I faced two major issues when compiling the `ReadingTime` library for platforms outside the Apple echosystem. The library uses the following code to get the number of words from a string:

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

This code, in comparison to other approaches such as using `CharacterSet`s works great as it uses a smarter mechanism than just splitting by certain characters (usually punctuation, new lines and white spaces) and makes the approach compatible with a wider range of languages. This code compiled great on macOS and iOS but, as soon as I tried to compile for any other platforms or architectures, I faced the following error:

![]()

This is where compiler statements came to the rescue. I was able to provide an alternative implementation (albeit not the best but still functional in most cases) for platforms I wanted to compile to but didn't support the `.byWords` option:

```swift:ReadingTime.swift
#if !os(Linux) && !os(Windows) && !arch(wasm32)
private static func count(wordsIn string: String) -> Int {
    var count = 0
    let range = string.startIndex..<string.endIndex
    string.enumerateSubstrings(in: range, options: [.byWords, .substringNotRequired, .localized], { _, _, _, _ -> () in
        count += 1
    })
    return count
}
#else
private static func count(wordsIn string: String) -> Int {
    let chararacterSet = CharacterSet.whitespacesAndNewlines.union(.punctuationCharacters)
    let components = string.components(separatedBy: chararacterSet)
    let words = components.filter { !$0.isEmpty }

    return words.count
}
#endif
```

> In the code snippet above I am preventing the compiler from reaching the code with the `.byWords` option whenever the operating system is either Linux or Macos or when the architecture is wasm32, which will allow `ReadingTime` to be made available to Web Assembly.

### DateComponentsFormatter

Another API which does not work outside the Apple platforms is `DateComponentsFormatter`. The ReadingTime command line tool uses it to print a formatted string of the estimated reading time:

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

I spent a while trying to get Apple's [swift-markdown]() package to compile for Web Assembly (`wasm32` architecture) so I could run my library on the browser. The main problem I faced was with the library's use of `FileManager`, which is not available on the [SwiftWasm]() toolchain.

I decided to go ahead and fork the package and proceed to remove any mentions of `FileManager` until I compiled. I did not need the library to read from file, so I was happy to remove all that code. I then replaced swift-markdown's dependency with my forked version and successfully got a `.wasm` file that I could put on a browser.

I was so happy! But... as soon as the code executed, I was greeted with an error saying that, since `pthreads` (which [swift-markdow]() uses under the hood) are not supported by the [SwiftWasm]() toolchain, a `FakePthread` shim implementation been provided instead. This meant that the library would not work for Web Assembly as long as it had `swift-markdown` as a dependency.

I had to find an alternative, I went back to importing Apple's own swift-markdown package (instead of my fork) and proceeded to use a combination of compiler directives and dependency conditions in the project's `Package.swift` to get around the problem.

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

Through the modification to my `Package.swift` above, I prevented the `swift-markdown` package form being imported in any platform outside of the ones passed to the `.when` condition above. Since I made the dependency not available for `wasm32`, I then had to remove all of its usages from `ReadingTime`'s code usign compiler directives again:

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

> Note that in this case I was able to provide a regex-based implementation for any platforms for which `swift-markdown` is not available.

## Windows: Preventing packages from being fetched

A stranger issue I faced was, not surprisingly, when I tried to build for Windows 😅. I have a single Swift Package with a number of targets that acts as a monorepo. This means that, in order to build or test any target, all dependencies must be fetched and checked out by the swift build system. They then might or might not be built depending on whether the target or product being built uses them.

This is usually fine, unless Windows decides to throw a spanner in the works 😅. On my first build I was greeted with the following error:

![Git error where paths with colons on them can not be resolved.](/assets/posts/platform-specific-code-in-swift-packages/win-git-error)

It turns out that in Windows, git can not check out files where their paths contain a colon. Danger, one of the dependencies I use for my CI has a couple of markdown files with colons in their paths.

After trying a number of potential solutions with no luck, such as setting some values in git's global config to allow colons, I decided to take a different approach to solve the build problem. Since Danger was not going to be used at all on the Windows builds, I decided to remove it entirely for that operating system.

I used compiler directives again but in the `Package.swift` this time:

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

> Note that compiler directives in the `Package.swift` will only work for checks on the 'host' machine. This is the machine building the code rather than the system running it - known as the 'target'.

This solution, albeit not ideal, got me past the problem and I now have [a successful Windows build](https://github.com/pol-piella/reading-time/actions/runs/3170321189)! 🎉
