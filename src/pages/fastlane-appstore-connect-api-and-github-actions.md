---
title: 'Fastlane, App Store Connect API and Github Actions: All you need to know'
slug: 'fastlane-appstore-connect-api-and-github-actions'
excerpt: 'An up to date guide on how to safely use an App Store Connect API key with fastlane and Github Actions.'
pubDate: '2023-01-11'
readtime: '4'
tags: [{ name: 'CI/CD', slug: 'ci-cd' }, { name: 'Fastlane', slug: 'fastlane' }]
author:
  name: 'Pol Piella'
layout: ../layouts/BlogPostLayout.astro
---

I have recently had to set up a CI pipeline for one of my side projects to upload an app to Testflight. I decided use [Fastlane]() and [Github Actions]() as it is the CI stack that I am most familiar with.

For a robust authentication and interaction with App Store Connect (which will be reffered to as ASC for the rest of the article), fastlane recommends that you use an App Store API Key rather than the more traditional email/password combination. The latter is more prone to CI failures, such as the dreaded 2FA failure that I got asked a lot about when I gave my talk at the Mobile Devops Summit, and flakiness.

I have done this process before, but found myself googling and looking at the documentation a lot, so I decided to put together an _all you need to need to know_ guide to create, store and use App Store Connect API keys in fastlane lanes referenced from Github Action Workflows.

## Creating an ASC key

## Storing the ASC API key

## Referencing an ASC API key from Fastlane

### Environment

###
