---
title: "Why I wrote my personal blog site"
slug: "why-I-wrote-my-personal-blog-site"
excerpt: "A little note on why I decided to write and host all my blogs in my own personal blog website."
date: "2021-12-18T05:35:07.322Z"
readtime: "3"
tags: [{ name: "Web", slug: "web" }, { name: "Career", slug: "career" }]
author:
  name: "Pol Piella"
---

In this article, I will take you through why I decided to create my personal blog from scratch and what technologies I used to do it and what influenced my decisions. Before I start though, I would like to mention that I am not a web developer (I only have a bit of experience in React) so most of what I am about to write about are things that worked for me, but might not be the best solutions.

## Why bother making your own personal site?

I know a lot of people might be thinking that it is overkill and that there are a lot of more established tools like [Medium](https://medium.com) or [Dev.to](https://dev.to), but in this section, I will try and run through a few reasons why you might want to create your own site to dump your thoughts on in the form of a blog.

### It is fun!

For me, as well as my full-time job, coding is something that I like to do as a hobby, so exploring new technologies in a purposeful way (not doing the good old todo list or pokemon index tutorials 😅) is a great way to learn and it is loads of fun.

It also does give you your own app to maintain and loads of room for creativity and cool features to implement. I know from personal experience that sometimes we want to learn new things and get very quickly put off by the all the tutorials we see, so having the feeling that you're making something worthwhile and learning at the same time is fantastic!

### The content is yours and no one else's

I read [an article](https://yanngirard.typepad.com/yanns_blog/2015/10/why-you-shouldnt-blog-on-medium-.html) from [Yann Girard](https://twitter.com/girard_yann?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor) a while back on _Why you shouldn't write on Medium_ and something stood up to me:

> But what it does [_Medium_] is that it completely kills the person behind the content. It kills the author. It turns the author into another useless side effect. A commodity. It turns the author into a machine. And no one really cares about the machine. Everybody cares about the product. About the output.

Don't get me wrong though, I am a big fan of Medium and I read a lot of tech articles there, but that article made me realise some things that I had never thought of before, such as that I never check out people's profiles when I read an article on Medium or click through to any of their other articles. I realised that it was heavily **content-based** and not enough **author-based**, which doesn't make the tool any less useful but might give you hints that having your own site could have more benefits for you in the long run.

It got me thinking that, as a developer, with the means of getting a site online, I could get a blog up and running that gave me complete freedom on how I want to show my content online and how I can style and organise my website.

### It can be your online business card

What better way to introduce yourself to other people or recruiters than with your own site? What if your future employer was a casual (or even regular) - this is not my case by the way, I don't get a lot of readers at the moment 😅 - reader of your blog?

The awesome thing about having it in your own domain is that you have the opportunity to host your CV, a few demo apps you have made on different routes on top of your blog. And if you have built all of that yourself, even better! 🔨

## How did I build my blog?

Well, that's a very good question. The truth is I have had to go through **a number of iterations and technologies** to find what truly works for me. Heck, even the domain I thought I had decided on changed halfway through the process too.

### The first iteration: React + headless CMS

The first iteration of my personal site consisted of a very simple application built with React and with all my blog posts stored in a headless CMS that its sole purpose was to serve all the markdown data to my site. This worked fine but it made an overwhelming amount of requests, as it was fetching all blog posts when the home page loaded and then the specific posts on the detail pages too. It was **pretty slow**.

I decided to stick with it for a while, even changing CMS providers from `Contentful` to `Ghost`, but I knew this was not future proof as, even with a small number of posts not being updated very often, the site was not very fast.

### The second iteration: Next.js

With the launch of [Next.js](https://nextjs.org) on 2020 and after watching a significant amount of tutorials to make sense of it 😅, I decided to migrate my site to it. This was a no-brainer for me, I could get a bunch of benefits like server-side rendering, moving all of the posts to my Github in a very easy manner and even **generate an RSS feed** at build-time, which was fantastic.

This was a major improvement, SSR and static files made my site a lot faster and Next.js as a framework worked very well. There was still a problem, it is only a blog site, so it still seemed like a bit overkill the amount of javascript that I was loading and started to look at other solutions.

### The final (for now) iteration: Astro

Since the site is very simple and all of the previous iterations required a significant amount of Javascript, which deteriorated the site's performance unnecessarily (there is little to no interaction and it all could be done with static html and css). The problem with a vanilla application is that it makes things a lot more complex than writing an application with a library like React (with the downside of the latter needing Javascript). I started then looking into static site generators and found [Astro](https://astro.build), which allows you to use modern web technologies such as React, but compiles them to **static html and css** files with **no javascript** 🎉, which is exactly what I needed.

It does also have a **remarkably** fast build time, which makes it ideal for scalability as the post count continues to increase.

## Conclusion

I have to say that building my own site has been an **awesome experience**, I have learnt a lot along the way and I feel very proud of having my own space online where I can post **whenever I want** and **style it** and give it my **personal** touch whenever I get bored of my own design, which is quite often by the way.

It also gives me an **application to maintain**, which is as **expandable** as I want it to be. Say in the future I want to have an about section, or links to any other social media or apps that I build, I can add it to my personal site too! 🎉
