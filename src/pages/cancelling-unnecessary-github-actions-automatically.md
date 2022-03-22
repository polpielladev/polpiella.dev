---
title: "Cancelling unnecessary Github actions automatically"
excerpt: "How to make use of the github actions concurrency feature to cancel unnecessary runs automatically. Talking about a real-world example and a tale of two approaches, and why I decided to implement it the way I did."
slug: "cancelling-unnecessary-github-actions-automatically"
date: "2021-11-26T19:00:00.000Z"
readtime: "4"
tags: [{ name: "CI/CD", slug: "ci-cd" }]
author:
    name: "Pol Piella"
layout: ../layouts/BlogPostLayout.astro
---

If you use Github actions as your continuos integration solution and you work in a large enough project maintained by a **team of developers**, chances are that you will have dedicated workflows for pull requests, main/master pushes, uploading to the stores, etc. Most of these tend to be **expensive performance wise** and require dedicated CI runners for them to run on, so you want to trigger them only when it is **absolutely necessary** in order not to build a backlog and slow down development for the rest of your team.

One of these cases, which comes up quite often in our team, has to do with the workflows we run on Pull Requests. These ensure that **our tests are run and our code is linted**, and trigger whenever a pull request is open or a new commit is pushed to the source branch of said PR. While this is fine in most cases, people are likely to asynchronously review PRs or address review comments in **separate pushes** in a short space of time. These leads to an action per push being triggered and added to the queue ready to be picked up when the CI is next free, which is not ideal, as it means that the CI is not free for the rest of the team as it is busy running actions that **don't give us any benefit** (we really only care about the latest push in a PR).

## Custom Party Actions

When I was doing some research into this I stumbled upon a potential solution which I believe is the most commonly used when tackling this problem. So much that even the [github team suggested](https://github.community/t/github-actions-cancel-redundant-builds-not-solved/16025/31) a while ago that there was nothing **built in** at the time and that the right approach was to use a **custom action** that talked to the github api. This would read the list of in-progress runs for a given repository and then make a decision on what to **cancel/keep** based on the source branch and the commit sha. In other words, you would get the list of actions being run from the API, compare with the current action and then query the cancel endpoint for the action to be cancelled if needed.

These custom actions can be used at the start of the workflow by adding it on the `uses` property of your `.yml` file as you would do for any other action in the github marketplace.

### Why might this not work for you?

Using a custom action inside your workflow **requires the job to run before it can actually be executed**. This means that you will need to **wait** for the action to start before it can actually make a decision on whether it needs to cancel any previous actions or not. This is outlined in the documentation of the [cancel-workflow-action](https://github.com/marketplace/actions/cancel-workflow-action), which is one of the most popular third-party implementations that I have seen:

> Because this action can only cancel workflows if it is actually being run, it only helps if the pipeline isn't saturated and there are still runners available to schedule the workflow.

**What if you want to reduce the burden on the CI because you only have one dedicated runner available?** This will mean that your cancel workflow action will always get run too late, as it will need to wait for any previous action to finish, hence having nothing to cancel when it is being run. This solution **unfortunately won't work for you**, and this is the reason why I wrote this blog, as I faced the same problem and had to dig through the actions documentation to find a solution for this. But fear not, there is a **very simple solution** that requires **no dependencies** and very little work on your part.

## Github's concurrency run/job system

Github actions have a feature called **[concurrency](https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#concurrency)**, which allows you to create a concurrency group, in which **only one job or workflow** will run simultaneously at a single time. On top of this, you can also decide to **cancel any previous jobs in the group** by adding a single flag to it. This is how it would look on your `.yml` file:

```yaml:CI.yml
concurrency:
    group: ${{ github.head_ref }}
    cancel-in-progress: true
```

The beauty about this solution, apart from the fact that it is very simple and requires no dependencies, is that just a new run being scheduled in the same concurrency group will cause the ongoing ones to be cancelled. It will also give you a nice message explaining that the job was cancelled because a new one with a higher priority was scheduled, as you can see in the image below.

![Concurrency cancelled run](/assets/posts/cancelling-unnecessary-github-actions-automatically/action-cancelled.png)
