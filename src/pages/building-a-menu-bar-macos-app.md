---
title: 'Building a macOS menu bar app'
slug: 'building-a-macos-menu-bar-app'
excerpt: 'This is the beginning of a journey to developing and (potentially) releasing my first ever macOS application.'
pubDate: '2022-10-26'
readtime: '7'
tags: [{ name: 'AppKit', slug: 'appkit' }, { name: 'Swift', slug: 'swift' }]
author:
  name: 'Pol Piella'
layout: ../layouts/BlogPostLayout.astro
---

This week I started a journey to develop and release my first ever macOS application. It is going to be a menu-bar only application and its only job is going to be muting all the computer's input devices using [CoreAudio](https://developer.apple.com/documentation/coreaudio). I want to mention too that the project is completely open source and I am going to try and share as much as possible through twitter posts and articles, so make sure you follow me on [Twitter](https://pol.link/twitter) to stay up to date! 👀

In this article I am going to go through what it took to create the app and show the bare minimum amount of UI.

## Before we start

I am aware that there are alternatives already available but I am not entirely happy with any of them, so I decided to build my own. I am also not sure whether I will ever release this or just keep the app for personal use, but the code will be available on Github for everyone to build and change as much as they want!

## Creating the app

To make this app, I decided to use [AppKit]() for the shell, so that I did not need to provide a SwiftUI view as an entry point. This would still allow me to write SwiftUI code further down the line if needed but it would give me full control over the startup sequence and architecture.

I started by removing the boilerplate SwiftUI code that comes when you create a new macOS app in Xcode and replaced it with a `main.swift` file. This will become the entrypoint for the application:

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
2. An `AppDelegate` class is created and set on the `NSApplication` object.
3. Since I want this app to be menu bar only, I set its `activationPolicy` to `accessory` to prevent the app icon from showing in the Dock.
4. Last but not least, the app needs to be started.

Running the application at this point does nothing, the menu bar item has not yet been set up and no window has been shown, let's sort that out.

## Creating a menu bar icon

In the `AppDelegate`, I the good old `applicationDidFinishLaunching` method and proceeded to create a menu bar item:

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

1. First, two variables are declared to keep both the status bar and status bar item in scope.
2. These two variables are then initialised with their corresponding types and assigned.
3. The icon for the status bar item is then set to a microphone.

Running the app again will now show a menu bar icon which will prove our app has been set up correctly. I am planning on adding menu items in the future with actions and customisations but for now it will just show whether the input is muted or not (only in UI, the business logic has not yet been implemented).

## Adding a keyboard shortcut

The way for users to interact with the app is with a keyboard shortcut, in this case it will be set to CTRL + ALT + S.

Once permissions have been granted in System Preferences, a shortcut can be set up. The logic for this is encapsulated in a `ShortcutsManager` class with a single method. The plan for this class is to eventually allow custom keyboard shortcuts and keep track of the observers but, for now, a single hardcoded shortcut is registered by calling the static method from the app delegate if permissions are granted:

```swift:ShortcutsManager.swift
enum ShortcutManager {
  static func registerObserver(with handler: @escaping () -> Void) {
    // 1
    NSEvent.addGlobalMonitorForEvents(matching: .keyDown) { event in
      // 2
      guard event.modifierFlags.intersection(.deviceIndependentFlagsMask)  == [.control, .option] else { return }
        // 3
        if event.charactersIgnoringModifiers == "s" { handler() }
    }
  }
}
```

Permission status can be checked with the []() method by passing it the `kAXTrustedCheckOptionPrompt` prompt. At the moment, the app will just show the prompt and quit (needs to be restarted when permissions are granted) but in a future iteration I would like to show a `NSWindow` which polls for

```swift:AppDelegate.swift
func applicationDidFinishLaunching(_ notification: Notification) {
  let options: NSDictionary = [kAXTrustedCheckOptionPrompt.takeUnretainedValue() as String : true]
  guard AXIsProcessTrustedWithOptions(options) else { NSApplication.shared.terminate(self); return }

  ShortcutManager.registerObserver { print("Shortcut tapped!") }
}
```

## The muted state

As I mentioned before, the app's purpose is to allow the user to mute all its input audio devices. To show whether the device has been muted, a floating 'muted' window will be shown and the icon in the menu bar will change to reflect the muted state.

### Creating the Muted view

The muted view is written entirely in SwiftUI and is very simple. I wanted to replicate what the muted state for the Logitech MX keys mute button looks like:

```swift:MutedView.swift
import SwiftUI

struct MutedView: View {
  var body: some View {
    Image(systemName: "mic.slash")
      .font(.largeTitle.bold())
      .foregroundColor(.white)
      .padding()
      .background(.red)
  }
}
```

### Creating a floating window

It is a very simple view with a white SF Symbol on a red background. Let's now create a window to present this view:

```swift:FloatingWindowFactory.swift
import AppKit

enum FloatingWindowFactory {
  static func make(withContent content: NSView) -> NSWindow {
    // 1
    let panel = NSPanel(
        contentRect: .init(origin: .zero, size: .zero),
        // 2
        styleMask: [.nonactivatingPanel, .borderless],
        backing: .buffered,
        defer: false
    )
    // 3
    panel.contentView = content
    // 4
    panel.level = .floating
    // 5
    panel.backgroundColor = .clear

    return panel
  }
}
```

Let's step through the code above:

1. First a `NSPanel` is created. The reason for using a `NSPanel` over a `NSWindow` is so that the `.nonactivatingPanel` style mask can be used. The app should not become active when pressed and should not be interacted with. It just represents a state.
2. On top of `nonactivatingPanel`, `borderless` is also provided as a style mask. This hides the title bar and buttons from the window.
3. A `NSView` is set as the panel's content view. This will be `MutedView` wrapped in a `NSHostingView`.
4. The level of the panel is set to floating so that it appears on top of all other windows.
5. Sets the background color to clear to avoid UI issues.

### Hiding and showing the window

To hide and show the window, I decided to go with a `NSWindowManager`. This took the the panel created above and would hide and show it based on the user's input.

```swift:AppDelegate.swift
class AppDelegate: NSObject, NSApplicationDelegate {
  var windowController: NSWindowController?

  func applicationDidFinishLaunching(_ notification: Notification) {
    // ...
    // 1
    let floatingWindow = FloatingWindowFactory.make(withContent: NSHostingView(rootView: MuteView()))
    // 2
    windowController = NSWindowController(window: floatingWindow)

    // 3
    ShortcutManager.registerObserver { [weak self] in
      guard let self else { return }

      if windowController.window?.isVisible == true {
        windowController.close()
      } else {
        // 4
        guard let visibleFrame = NSScreen.main?.visibleFrame,
          let windowController,
          let window = windowController.window else {
          return
        }

        let x = visibleFrame.origin.x + visibleFrame.width - window.frame.width
        let y = visibleFrame.origin.y + visibleFrame.height
        window.setFrameTopLeftPoint(.init(x: x, y: y))
        windowController.showWindow(nil)
      }
    }
}
```

Let's break down the code above and explain what's going on:

1. Create the floating window using the factory from earlier and with `MutedView` as its content.
2. Create a `NSWindowController` with the new floating window.
3. An observer is added to the `ShortcutManager` created earlier to hide and show the window whenever the user uses the keyboard shortcut.
4. Using the main `NSScreen`'s bounds, the frame for the window is set so that it is shown at the top right corner of the screen.

### Changing the status bar icon

Last but not least, let's write some code to update the status bar icon when the state changes. This can be done in the same handler for the `ShortcutManager` defined above:

```swift:AppDelegate.swift
class AppDelegate: NSObject, NSApplicationDelegate {
  // ...

  func applicationDidFinishLaunching(_ notification: Notification) {
    // ...
    ShortcutManager.registerObserver { [weak self] in
      guard let self else { return }

      if let button = statusBarItem.button {
        button.image = NSImage(systemSymbolName: isMuted ? "mic.slash" : "mic", accessibilityDescription: "")
      }
    }
}
```

And that's all, let's see it in action...

## More to follow... 👀
