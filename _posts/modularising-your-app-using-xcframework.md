---
title: "Modularising an iOS app using XCFramework"
excerpt: "Understanding how to modularise your iOS apps using XCFrameworks to combine multiple XCode projects and encapsulate and separate concerns."
date: "2021-07-10T15:54:39.000Z"
readtime: "7"
tags:
    [
        { name: "Architecture", slug: "architecture" },
        { name: "Swift", slug: "swift" },
    ]
author:
    name: "Pol Piella"
---

Modularisation is a hot topic that has been very discussed within the iOS community but can be very confusing and hard to understand. In very simple terms, you can think of the modularisation process in the same way as any agile development tasks. If the task is too big it might be very hard to tackle it all at once and the concept of a very broad big task can be sometimes overwhelming, hence it is best to break it down into smaller, more achievable tasks.

In its most primitive state, that's what modularisation means, breaking down your codebase into smaller isolated pieces that you can then compose and put together. This is particularily useful for large codebases where build times keep increasing and running tests or even running the app can be a very tedious and long process. It also helps keeping concerns separated and

### The Case Study

Recently I have been working on refactoring the codebase for a coding challenge I did recently. The challenge consisted in building an app that would display information about launches provided by the public [SpaceX API](https://documenter.getpostman.com/view/2025350/RWaEzAiG?version=latest).

While the scope of this module was relatively small, I built it originally with `UIKit` and I started thinking about potentially creating a `SwiftUI` client and an `AppKit` client. While I could have done this using different targets, I liked the idea of having multiple projects and keeping the sources as separate as possible.

### Extracting common logic

In order to be able to start working on the other client versions of the app, I needed to extract all the common logic in order to not repeat anything. I broke down the commont logic units into the following modules:

-   Network
-   SpaceXAPI
-   Adapters
-   UI clients

### Creating the workspace

`File -> Save as Workspace` and then save in the same folder as the `.xcodeproj`

### Creating the Network Module

Open the `.xcworkspace` file and create a new project. Since this is not a UI App and because `macOS` tests targets run significantly faster than in the simulator, I would recommend creating a `macOS` framework. Remember to add it to the workspace before saving!

### Handling communications between Modules

**Happy Coding!**
