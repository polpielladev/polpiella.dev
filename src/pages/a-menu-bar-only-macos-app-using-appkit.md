---
title: 'A menu bar only macOS app using AppKit'
slug: 'a-menu-bar-only-macos-app-using-appkit'
excerpt: 'How to setup a menu bar only macOS app using AppKit.'
pubDate: '2022-10-26'
readtime: '4'
tags: [{ name: 'AppKit', slug: 'appkit' }, { name: 'Swift', slug: 'swift' }]
author:
  name: 'Pol Piella'
setup: |
  import Video from '../components/Video.jsx'
layout: ../layouts/BlogPostLayout.astro
---

This week I have started a journey to develop and release my first ever macOS application. It is going to be menu bar only and its job is going to be muting all the computer's input devices using [CoreAudio](https://developer.apple.com/documentation/coreaudio). 

I want to mention that the project is open source and I am going to try and share as much as possible through tweets and articles like this one. Make sure you follow me on [Twitter](https://pol.link/twitter) if you want to stay up to date! 👀

In the following sections, I will through what it takes to **create a menu bar app with no dock icon**.

> This article will only cover setup/bootstrapping code and the app will not have any functionality yet.

## Creating the app

To make this app, I decided to use [AppKit](https://developer.apple.com/documentation/appkit), so that I did not need to provide a SwiftUI view as an entry point. This would still allow me to write SwiftUI code further down the line if needed but it would give me full control over the startup sequence and architecture.

Hence, I went ahead and removed all boilerplate SwiftUI code that comes when you create a new macOS app in Xcode. I then created a single `main.swift` file which became the new entry point for the app:

```swift:main.swift
import AppKit

// 1
let app = NSApplication.shared
// 2
app.delegate = AppDelegate()
// 3
app.setActivationPolicy(.accessory)
// 4
_ = NSApplicationMain(CommandLine.argc, CommandLine.unsafeArgv)
```

Let's go through the app startup code step by step:

1. A reference to the application is obtained through the `NSApplication` object.
2. An empty `AppDelegate` class is created and set as the `delegate` for the `NSApplication` object.
3. Since I want this app to be menu bar only, I set its `activationPolicy` to `accessory`. This prevents the app icon from showing up in the Dock.
4. The app is then started with any command line arguments provided.

Running the application at this point does nothing as the menu bar item has not yet been set up but we can already see that the app does not appear in the dock! 🎉

## Setting up a menu bar icon

In the `AppDelegate`, I implemented the good old `applicationDidFinishLaunching` method and proceeded to create a menu bar item in it:

```swift:AppDelegate.swift
class AppDelegate: NSObject, NSApplicationDelegate {
  // 1
  var statusBar: NSStatusBar!
  var statusBarItem: NSStatusItem!

  func applicationDidFinishLaunching(_ notification: Notification) {
    // 2
    statusBar = NSStatusBar()
    statusBarItem = statusBar.statusItem(withLength: NSStatusItem.variableLength)

    // 3
    if let button = statusBarItem.button {
      button.image = NSImage(systemSymbolName: "mic", accessibilityDescription: nil)
    }
  }
}
```

Again, let's go back and step through the code above:

1. First, two variables are declared to keep both the status bar and status bar item in memory throughout the lifetime of the app.
2. These two variables are then initialised and assigned.
3. The icon for the status bar item is then set to a microphone using a [SF Symbol](https://developer.apple.com/sf-symbols/).

Running the app again will now show a menu bar icon which will prove our app has been set up correctly. 

### Adding a menu item

Let's now add a menu to our app icon. This will have one item for now to toggle the mute all inputs but eventually more preferences will be added.

Let's go back to the `AppDelegate.swift` and add a menu:
```swift:AppDelegate.swift
// ...
func applicationDidFinishLaunching(_ notification: Notification) {
	// ...
	if let button = statusBarItem.button {
			// 1
			let groupMenuItem = NSMenuItem()
			groupMenuItem.title = "Toggle mute!"
			groupMenuItem.target = self
			// 2
			groupMenuItem.action = #selector(mutePressed)
			
			// 3
			let mainMenu = NSMenu()
			mainMenu.addItem(groupMenuItem)
			
			// 4
			statusBarItem.menu = mainMenu
	}
}

@objc func mutePressed() {
	if let button = statusBarItem.button {
		// 5
		isMuted.toggle()
		button.image = NSImage(systemSymbolName: isMuted ? "mic.slash" : "mic", accessibilityDescription: nil)
	}
}
```

Let's break down the code and understand what's happening:
1. Create a `NSMenuItem` to allow users to toggle the mute state.
2. Add an action to trigger whenever the menu item is pressed.
3. Create a `NSMenu` which will hold the toggle mute menu item and any other functionality that is added in the future.
4. Set the newly created `NSMenu` as the status bar item's menu.
5. 

And finally, running the app again now shows the menu when the menu bar item is pressed and the icon dynamically changes when the menu item is pressed.

<Video src='/assets/posts/a-menu-bar-only-macos-app-using-appkit/toggle-mute.mp4' />

## More to come...
In future articles, I will share how I set up a floating window to convey some extra information, dynamically update and show content based on keyboard shortcuts and many others...
