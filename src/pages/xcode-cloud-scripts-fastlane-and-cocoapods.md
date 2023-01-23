---
title: 'Xcode Cloud scripts: Fastlane and Cocoapods'
excerpt: 'Learning how to install and use third-party tools in Xcode Cloud through ci scripts.'
pubDate: '2023-01-04'
tags: [{ name: 'CI/CD', slug: 'ci-cd' }, { name: 'Xcode', slug: 'xcode' }]
layout: ../layouts/BlogPostLayout.astro
setup: |
  import Video from '../components/Video.jsx'
---

[Xcode Cloud](https://developer.apple.com/xcode-cloud/) is a CI/CD service made by Apple which is deeply integrated into Xcode. Since its introduction, there has been a lot of discussion amongst iOS developers on whether it is a good alternative to existing CI/CD providers and what migration to [Xcode Cloud](https://developer.apple.com/xcode-cloud/) would look like.

Setting up this new service is rather straigh-forward for small or new apps but it can be daunting for big codebases which have been around for a long time. These big codebases tend to still rely to some extent on third-party dependency managers such as [CocoaPods](https://cocoapods.org) and on third-party CI/CD tools such as [Fastlane](http://fastlane.tools).

The use of such third-party frameworks tends to put people off switching over to [Xcode Cloud](https://developer.apple.com/xcode-cloud/) but, in this article, I will go through how [the use of custom CI scripts](https://developer.apple.com/documentation/xcode/writing-custom-build-scripts) can help you and your team progressively migrate to [Xcode Cloud](https://developer.apple.com/xcode-cloud/) without having to abandon the tools you have used for a long time. More specifically, this article explains how to build an app using [CocoaPods](https://cocoapods.org) and upload the resulting app archive to [AppCenter](https://appcenter.ms) using [Fastlane](http://fastlane.tools) from an [Xcode Cloud](https://developer.apple.com/xcode-cloud/) workflow.

## CI scripts

[Xcode Cloud](https://developer.apple.com/xcode-cloud/) provides a way to run shell scripts at different stages of a workflow. These scripts can install third party dependencies and perform tasks on top of the workflow's pre-defined steps. I won't go into too much detail about how these scripts work as [Xcode Cloud's documentation](https://developer.apple.com/documentation/xcode/writing-custom-build-scripts) provides a great explanation on the topic, but I will give you a TLDR on the most important things you need to know about them:

1. [Xcode Cloud](https://developer.apple.com/xcode-cloud/) looks for a directory called `ci_scripts` in the Xcode project to find scripts to run. These scripts are similar to [git hooks](https://git-scm.com/docs/githooks) in the way they work.
2. [Xcode Cloud](https://developer.apple.com/xcode-cloud/) looks for `.sh` scripts with specific names inside the `ci_scripts` directory. It then runs any matched scripts at different stages of the workflow based their names:

- `ci_post_clone.sh`: Runs after the remote repository is cloned.
- `ci_pre_xcodebuild.sh`: Runs before the build process commences.
- `ci_post_xcodebuild.sh`: Runs after the build process finishes.

3. The scripts need to have executable permissions: `chmod +x <executable_name>.sh`.

Now that we know how CI scripts work, let's see what we can do with them.

### Installing `CocoaPods` dependencies

[Apple recommends](https://developer.apple.com/documentation/xcode/making-dependencies-available-to-xcode-cloud#Use-a-custom-build-script-to-install-a-third-party-dependency-or-tool) installing third-party tools and dependencies in the `ci_post_clone.sh` script and they specifically talk about making [CocoaPods dependencies available to the build step](https://developer.apple.com/documentation/xcode/making-dependencies-available-to-xcode-cloud#Make-CocoaPods-dependencies-available-to-Xcode-Cloud) in that same script too.

To do so, and assuming that you have the pod project setup, create a `ci_post_clone.sh` script under the `ci_scripts` directory mentioned earlier and add the following contents to it:

```bash:ci_post_clone.sh
#!/bin/sh

brew install cocoapods

pod install
```

If you push these changes and trigger a new build, [Xcode Cloud](https://developer.apple.com/xcode-cloud/) will run a post clone step to install the [CocoaPods](https://cocoapods.org) dependencies.

![The Xcode Cloud build page showing a successful run with a post clone script.](/assets/posts/xcode-cloud-scripts-fastlane-and-cocoapods/post-clone.png)

> [CocoaPods](https://cocoapods.org) installs and links all its dependencies by creating a `.xcworkspace`. You need to update your workflow to use this `.xcworkspace` instead of the default `.xcodeproj` file. <Video src="/assets/posts/xcode-cloud-scripts-fastlane-and-cocoapods/xcworkspace.mp4" />

### Running a `Fastlane` lane

On top of using [CocoaPods](https://cocoapods.org), our project requires us to upload the resulting app archive to [AppCenter](https://appcenter.ms). Our team currently uses a [Fastlane](http://fastlane.tools) lane to do this, which in turn uses [Microsoft's appcenter fastlane plugin](https://github.com/microsoft/fastlane-plugin-appcenter).

To run this lane from [Xcode Cloud](https://developer.apple.com/xcode-cloud/), we must first install [Fastlane](http://fastlane.tools) in the hosted runner using the same `ci_post_clone.sh` script from earlier:

```bash:ci_post_clone.sh
#!/bin/sh

brew install cocoapods
brew install fastlane

pod install
```

After installing [Fastlane](http://fastlane.tools), we need to create a separate script to upload the app's archive to [AppCenter](https://appcenter.ms) after the build has completed. We can do this by creating a script called `ci_post_xcodebuild.sh` in the `ci_scripts` directory, making it executable and adding the following contents to it:

```bash:ci_post_xcodebuild.sh
#!/bin/sh

# Call the custom lane
fastlane run upload_to_appcenter ipa:$CI_AD_HOC_SIGNED_APP_PATH/$CI_PRODUCT.ipa
```

The `ci_post_xcodebuild.sh` script retrieves the path to the app's archive, which is generated by the [Xcode Cloud](https://developer.apple.com/xcode-cloud/) workflow, using environment variables, which are also provided by the workflow itself.
