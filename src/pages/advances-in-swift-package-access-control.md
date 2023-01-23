---
title: "Advances in Swift Package Manager's dependency access control"
excerpt: 'Taking a look at the latest Swift 5.7 development snapshot to try the new explicit-target-dependency-import-check flag, which provides improvements to the dependency system within SPM.'
pubDate: '2022-08-03'
tags:
  [
    { name: 'Swift Package Manager', slug: 'spm' },
    { name: 'Swift', slug: 'swift' },
  ]
layout: ../layouts/BlogPostLayout.astro
---

One of the issues I have been facing with Swift Packages for a while is its lack of private (or internal) targets and dependencies. I was under the impression that only targets declared explicitly in another target's dependency list would be available to be imported from the latter's code, even if they are all declared in the same `Package.swift` file.

In reality, the access control for all targets defined in the same package is pretty much the same. Any target can import any other target without declaring it explicitly in its dependencies list and the compiler won't throw any errors.

Let's consider the following example. This is a simple library with a product ('MyAwesomeLib') and two targets which contain some internal code to ease the library's tasks:

```swift:Package.swift
// swift-tools-version: 5.6
import PackageDescription

let package = Package(
    name: "MyAwesomeLib",
    platforms: [.macOS(.v10_13)],
    products: [
        .library(
            name: "MyAwesomeLib",
            targets: ["MyAwesomeLib"]),
    ],
    dependencies: [],
    targets: [
        .target(name: "MyAwesomeLib", dependencies: ["Networking"]),
        .target(name: "Networking"),
        .target(name: "Utils")
    ]
)
```

Contrary to what you might think, if we were to import the `Utils` target from `Networking` (or the other way around) without explicitly defining it as a dependency, we wouldn't get any compiler errors from running `swift build`.

```swift:Networking.swift
import Utils
```

This seems to be a limitation with the way Swift Package Manager resolves its dependencies, as both direct and transitive dependencies, as well as the declared products/targets themselves, end up being part of the search paths the linker uses, [according to an answer in one of the Swift Forums on this issue](https://forums.swift.org/t/how-to-privatize-dependencies-in-swift-package-manager/33523/4).

This can lead to unexpected failures down the line and, while it might all work right now, if we were to extract `Networking` into its own package, we wouldn't necessarily be aware of the fact that `Networking` implicitly depends on `Utils` by looking at the `Package.swift`.

It looks like Apple themselves have been caught out by this issue in a couple of occasions, [such as an implicit cross-target import on the swift-distributed-actors package](https://github.com/apple/swift-distributed-actors/pull/981/files). These situations have helped drive some work to make these cases easier to catch at compile time.

## Improvements to the swift-package binary

After recently looking into the access control of Swift Package dependencies again as a result of a discussion around the topic at work, I found in [that same Swift Forums discussion](https://forums.swift.org/t/how-to-privatize-dependencies-in-swift-package-manager/33523/7) that Apple had done some work to improve the visibility on this, so I decided to try it out!

The [PR in Apple's swift-package-manager repo](https://github.com/apple/swift-package-manager/pull/3562), raised by [Artem Chikin](https://github.com/artemcm) and merged about a month ago, introduces a flag called `--explicit-target-dependency-import-check` to the `swift` executable.

This allows developers to enable or disable a new build verification step to detect `import` statements of targets which are not explicitly defined in the target's dependency list and trigger warnings or errors as desired.

> At the time of this article, this flag is available to developers using the latest development snapshots. More precisely, the toolchain used for testing in this case is: `swift-DEVELOPMENT-SNAPSHOT-2022-07-25-a.xctoolchain`.

## Testing the new flag

Now that we know the flag exists, let's put it to the test! We'll be using the same `MyAwesomeLib` package introduced earlier in this article.

After downloading and installing the latest development snapshot toolchain for Swift 5.7, the package can be built with the new flag enabled like so:

```bash:Terminal
cd <path_to_the_dev_dir>/MyAwesomeLib/

/Library/Developer/Toolchains/swift-DEVELOPMENT-SNAPSHOT-2022-07-25-a.xctoolchain/usr/bin/swift build --explicit-target-dependency-import-check error
```

> Note that the error flavour of the flag will be used throughout the rest of the article to make the build fail if a non-explicit import is used. The flag has two other variations: `warn`, which will show a warning but will not fail the build and `none`, which disables the functionality entirely. This is an [opt-in flag](https://github.com/apple/swift-package-manager/pull/3562/commits/a4114eb92d2d77fd85495ac5a0fb3617f0e5267e), so the default value is `none`.

### Accessing dependencies not explicitly declared in a target

The first test involves seeing what `swift build` tells us when the new flag is enabled and our `Networking` package imports `Utils` in code but does not declare it in the target's dependency list:

```swift:Networking.swift
import Utils
```

Running `swift build --explicit-target-dependency-import-check error` throws an error! 🛑 It tells us, as expected, that the Utils import **is not declared as an explicit dependency** for the target it's being used in:

![Image showing the compiler output after running swift build with the new flag enabled.](/assets/posts/advances-in-swift-package-access-control/build-with-flag.png)

As opposed to running `swift build` without the flag enabled, which throws no errors:

![Image showing the compiler output after running swift build without the new flag enabled.](/assets/posts/advances-in-swift-package-access-control/build-without-flag.png)

### Transitive dependencies are still allowed

Let's now fix the issue raised by the command above by defining `Utils` as an explicit dependency on `Networking`:

```swift:Package.swift
targets: [
    .target(name: "MyAwesomeLib", dependencies: ["Networking"]),
    .target(name: "Networking", dependencies: ["Utils"]),
    .target(name: "Utils"),
]
```

Something I was expecting this flag to warn me about was transitive dependencies. As we can see, the `MyAwesomeLib` target has an indirect dependency on `Utils` through `Networking`. Let's add some code to the `MyAwesomeLib.swift` and import `Utils` from there:

```swift:MyAwesomeLib.swift
import Utils
```

Building the library again with the new flag turned on **throws no errors**. While I understand this, as it is a transitive dependency and is part of the dependency list of `MyAwesomeLib` implicitly, I hoped that it would somehow prevent you from importing these as they are not explicitly defined.

## Conclusion

In my opinion, this **is a great step in the right direction**, more considering the fact that Xcode does automatic imports now, which can lead to **unexpected** libraries being used by targets which don't require them.

I can see this being very helpful to packages with a lot of sub-targets and dependencies. This flag will make unintended imports a lot easier to spot, be it with warnings or errors, depending on the developer's needs.

Despite this, and understanding that the limitations and difficulty must be pretty big, I would like to see the same behaviour for transitive dependencies. In my opinion, a dependant should only be able to import its dependency's explicitly declared products, leaving internal dependencies and targets of such product inaccessible by the dependant. **This would then enforce the 'semantic' distinction between targets and products**.
