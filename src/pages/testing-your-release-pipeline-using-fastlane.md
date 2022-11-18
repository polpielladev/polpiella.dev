---
title: 'Testing your release pipeline using Fastlane'
slug: 'testing-your-release-pipeline-using-fastlane'
excerpt: 'A quick look at how very simple dependency injection 💉 can help testing date differences using cache invalidation as an example.'
pubDate: '2022-11-19'
readtime: '6'
tags:
  [
    { name: 'CI/CD', slug: 'ci-cd' }
  ]
author:
  name: 'Pol Piella'
layout: ../layouts/BlogPostLayout.astro
---

A couple of weeks ago I gave a talk about this topic at the [Mobile Devops Summit](), a remote event organised by [Bitrise](). Off the back of it, I thought it would be a good idea to write an article going into the specifics of the talk and why it might be a good idea to test your release pipeline often.

> If you would like to watch the talk, I have made [the recording available on my youtube channel]() and [the slides are also available for download]().

## Motivation

As an iOS developer, there are certain CI/CD pipelines which are crucial to the delivery of your app but they are not run very often. A great example of this is the release pipeline, which automates archiving an application, signing it and submitting it to [App Store Connect](). 

Things can certainly go wrong with these very important pipelines and the problem is that they will only be flagged once you're running them during a release. While some issues are trivial, you want this process to go as smoothly as possible and gain confidence that your app will be able to go out to your users quickly, rather than having to spend time fixing issues with the pipeline.

Let's take a look over the following sections at two different errors that can happen on release day and can be tricky to debug. 

### Archiving errors

Build errors are easy to spot as an app is usually run numerous times every day. On the other hand, there are some errors which are specific to archiving the app, a process that usually only happens when we need to generate an artifact which then needs to be distributed. An example of this is a release process, an App Store variant of the app must be archived to output an IPA which is then uploaded to App Store Connect.

Let's look at an example of an archive-only error we had at work a while back.

> Note that this error seems to be specific to Xcode 13 and does not seem to be a problem on Xcode 14. Unfortunately for us we were using Xcode 13 at the time and we found out about this while integrating the first SwiftUI views into our app.

Let's consider a modular iOS application which defines iOS 14 as the minimum deployment version. We want to introduce a new feature which is built entirely with SwiftUI, so we create a new module (as a Swift package):

```swift:Package.swift

```

The new module is then imported by the application target and displayed. We can build the app, the tests run fine, so it's all great, we're now using SwiftUI! 🎉 A bit of time goes by and then we get to release day and the release pipeline fails, so we scramble together to find a solution and it takes a long time to do so, it's not the most obvious of issues:

![]()

Looking at the build log above, it looks like the app is being archived for `armv7`. The problem here is that SwiftUI is not available on the `armv7` SDKs, which is causing the archive issue. After looking at some related Apple Developer Forum threads, it looks like if your app has a minimum deployment version of iOS 11 or higher, it should not be built for that architecture. 

So what's happening? Well, after trying multiple things it turns out that, even though the new package is being imported by a target with a minimum deployment version of iOS 15, a minimum iOS version needs to be set under `platforms` in the `Package.swift`, which fixes the issue:

```swift:Package.swift

```

### Upload errors

Now that we've seen an archive error, let's take a look at a common upload error in modularised applications. Let's consider that the new SwiftUI module is a framework (in an Xcode project) and is used by different targets. Each of these embeds and signs the framework. 

This can be hard to miss as the app can be built, run and archived without any failure but if you try to upload it to App Store Connect, you will see the following failure:

![]()

By embedding and signing multiple times, we're creating copies of the same bundle and it causes an upload error, as there can't be more than one bundle with the same identifier. The fix is straightforward but can sometimes be hard to spot if you're new to modular codebases. We just need to embed the framework once at the app target's level and then choose the do not embed option for every other target.

##  Catching these errors early

Even though the issues above did not require major code changes, they could certainly take a while to diagnose and investigate. And that is time that you are delaying your relase. This might be okay if your relase only includes new feature but think of a situation where you're doing a patch release which fixes a major crash, you certainly do not want to spend time fixing CI issues.

While this issues certainly will still occur, the time at which you spot them is crucial. These processes can be quite cumbersome and lengthy and, to take up a lot of CI resources and time during the team's working hours, which would cause disruption, scheduled CI runs can come in very handy.

The idea behind them is that you can schedule your pipeline to be run at a specific date and time recurringly using [cron expressions](). In the following sections, I will build a recurring Github Action which will archive the app, sign it for the App Store and then verifies the binary with [App Store Connect]() using [fastlane]().

## Implementing a nightly Github action

### Creating a fastlane lane

Let's get started by reviewing what the release lane looks like in the [Fastfile]():

```ruby:Fastfile

```

By looking at the errors encountered above, the new `nightly` lane needs to verify that the app can be archived correctly and that the binary produced can be uploaded to App Store Connect. The problem is that if we duplicate the release's lane code, it will submit a build to Testflight, which is not what we want. Instead, we should use deliver's `verify_only` flag so that the build is never submitted, only verified.

```ruby:Fastfile
```

> I worked on implementing this flag and the best thing is that fastlane is open source. If you want to find out more about how this works under the hood, you can take a look at the [original pull request]().

### Writing a workflow

Now that the nightly lane is implemented, we need somewhere to run it from at a given time every day. For this, we can create a Github Actions workflow file called `nightly.yml` which runs on a macOS-12 machine and calls the nightly lane. On top of this, the action below uses a `schedule` tag with a chron expression to tell Github this action needs to run every night at midnight:

```yml:nightly.yml
name: Nightly

on:
  schedule:
    - cron: '0 0 * * *'
 
jobs:
  nightly:
    runs-on: macos-latest
    steps:
    - uses: actions/checkout@v2
    - name: Run nightly lane
      run: bundle exec fastlane nightly
```

> Note that there is some extra setup such as authentication with App Store Connect that has been neglected in this article for the sake of simplicity. If you are interested in learning a bit more about how to handle authentication with App Store Connect and fastlane, I will write an article on the topic shortly.

## Conclusion

