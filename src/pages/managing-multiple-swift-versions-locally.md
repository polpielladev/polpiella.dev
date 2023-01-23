---
title: 'Managing multiple versions of Swift locally'
slug: 'managing-multiple-swift-versions-locally'
excerpt: 'A guide on how to download, install and manage different versions of Swift.'
pubDate: '2022-12-21'
tags: [{ name: 'Swift', slug: 'swift' }]
author:
  name: 'Pol Piella'
layout: ../layouts/BlogPostLayout.astro
setup: |
  import Video from '../components/Video.jsx'
---

The most common way of installing a version of Swift is by downloading [Xcode](https://developer.apple.com/xcode-cloud/).

Some cases might require you to download a toolchain not associated with an Xcode release, such as a development snapshot for an upcoming release of Swift or a Swift toolchain for a different architecture such as [WebAssembly](https://github.com/swiftwasm/swift/releases/tag/swift-wasm-5.7.1-RELEASE).

This article explains how to install and use a Swift toolchain both manually and using a command line tool called [swiftenv](https://github.com/kylef/swiftenv).

## Installing a toolchain

On macOS, toolchains come in the form of `.pkg` files. Users can install these toolchains manually by downloading them from the vendor website directly and following the instructions in the package's install wizard.

The next sections show how to download, install, and setup a Swift toolchain, more specifically the [trunk development snapshot for macOS provided by Apple](https://www.swift.org/download/#trunk-development-main).

### Manually

Installing a toolchain manually requires just three steps:

1. Download the toolchain from the vendor website. In this case, download the trunk development snapshot toolchain from [Apple directly](https://www.swift.org/download/#trunk-development-main).

![Swift's trunk development snapshot download page](/assets/posts/managing-multiple-swift-versions-locally/download-manually.png)

2. Click on the downloaded `.pkg` file.

![Result of double-clicking on the toolchain's pkg file](/assets/posts/managing-multiple-swift-versions-locally/click-manually.png)

3. Follow the steps on the install wizard.

![Result of finishing going through all steps on the install wizard](/assets/posts/managing-multiple-swift-versions-locally/follow-manually.png)

Once the wizard completes all install actions, you can find the new toolchain under `~/Library/Developer/Toolchains`.

### Swiftenv

[Swiftenv](https://github.com/kylef/swiftenv) allows you to install and manage different Swift versions from the terminal.

> This article doesn't go into how to install [swiftenv](https://github.com/kylef/swiftenv), but if you want to find out more about getting [swiftenv](https://github.com/kylef/swiftenv) setup, please refer to the official documentation.

[Swiftenv](https://github.com/kylef/swiftenv) can install the same trunk development snapshot toolchain from the previous section with a single command:

```bash:Terminal
swiftenv install DEVELOPMENT-SNAPSHOT-2022-11-19-a
```

> You can find a list of available versions by running `swiftenv install --list` and a list of development snapshots available by running `swiftenv install --list-snapshots`.

You can then verify the previous command worked by checking the installed Swift versions in the system:

```bash:Terminal
swiftenv versions
```

## Xcode

Xcode has out of the box support for switching between different Swift toolchains. The `Xcode > Toolchains` menu lists all installed toolchains:

![](/assets/posts/managing-multiple-swift-versions-locally/select-toolchain.png)

Pick a toolchain from the list to start using it. Xcode shows an indicator next to the build status menu to denote the usage of a toolchain. To go back to Xcode's default Swift toolchain, tap on the icon and select the `Xcode`-named option from the list.

<Video src='/assets/posts/managing-multiple-swift-versions-locally/deselect.mp4' />

## Command line

[Swiftenv](https://github.com/kylef/swiftenv) provides an easy way to switch between Swift versions directly from the command line. It can select a Swift toolchain either **locally**, which selects it just for the current directory, or **globally**, which selects it system-wide:

```bash:Terminal
# Just in the current directory
# Creates a .swift-version file
swiftenv local DEVELOPMENT-SNAPSHOT-2022-11-19-a

# Sets the version of Swift system-wide
# Creates a ~/.swiftenv/version file
swiftenv global DEVELOPMENT-SNAPSHOT-2022-11-19-a
```

Any `swift` commands which run after selecting a Swift version with `swiftenv` use the correct toolchain.
