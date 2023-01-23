---
title: 'My new Swift Package: ReadingTime'
slug: 'my-new-swift-package-reading-time'
excerpt: 'In this article I briefly introduce my new open source Swift Package called ReadingTime. It allows clients to get an estimate reading time from markdown text.'
pubDate: '2022-08-17'
tags:
  [
    { name: 'Swift Package Manager', slug: 'spm' },
    { name: 'Open Source', slug: 'open-source' },
    { name: 'Swift', slug: 'swift' },
  ]
author:
  name: 'Pol Piella'
layout: ../layouts/BlogPostLayout.astro
---

As you will know if you follow me on Twitter, I have been on holiday for a week. While it’s given me time to relax and read, I have not had a lot of time to write articles, so this week’s one is a bit shorter!

I have been writing blogs for over a year now, and in that time I have changed the tools I use to write content a few times. While I seem to have found a setup that works well for me, there is a fair amount of manual tasks that I could streamline.

I write my blogs in [Markdown](https://daringfireball.net/projects/markdown/) and, to be able to provide extra metadata such as read time or tags, I use [frontmatter](https://jekyllrb.com/docs/front-matter/) to make the fields I need available to my site’s code from the `.md` file itself.

The problem is that my current Markdown editor ([Ulysses](https://ulysses.app/)) does not support frontmatter. This means that, before I publish a new post, I need to open my files in VS Code and add the metadata manually and make sure it's formatted correctly.

There has also been occasions where I have copied over the frontmatter from another post and forgotten to change its publish date, which causes a lot of issues with RSS feeds and harms my content's visibility.

To help me with these issues, I have started a journey to automate creating and adding metadata whenever I am ready to publish a post. In this article, I am going to discuss a new Swift Package I am currently building for a part of this processt called `ReadingTime`, which will help me calculate the estimated reading time for a given article, so this information can be added to its metadata.

If you're not familiar with how sites such as [Medium](https://medium.com) do this, they use something called average reading time. This is a measure of how many words, on average, a person will read in a minute. With some simple maths, the estimated reading time can be calculated by dividing the number of words in the article by the average reading time value. This value varies across different sites but [Medium uses the average reading speed of an adult](https://help.medium.com/hc/en-us/articles/214991667-Read-time), which is roughly 265 words-per-minute, to derive average reading times for its articles.

## The API

To get the reading time for an article I am about to publish, I currently use a [VSCode extension called Read Time](https://github.com/johnpapa/vscode-read-time) made by [John Papa](https://twitter.com/John_Papa). This provides an estimate of reading time in minutes for the current file.

To maintain consistency across all my articles, I wanted my new package to behave in a similar way. In a way, this extension has influenced some of the decisions I have made but, at the same time, I have kept it open for users of the API to be able to alter any default values that I provide.

The package is very simple to its consumer: there is a single public enum with two variations of a method called `calculate`. This method allows clients to pass either a markdown string or the path to a markdown file (in URL form) and returns a `TimeInterval` value with an estimate of the content's reading time in milliseconds.

It also provides a word-per-minute default of 200 (following [John Papa](https://twitter.com/john_papa)’s extension default value). To allow for further flexibility, this value can be modified through a parameter in the method. For example, you could use a wpm value of [265 like Medium does for its articles](https://help.medium.com/hc/en-us/articles/214991667-Read-time).

Let’s have a look at an example of what the `ReadingTime` API looks like:

```swift:ReadingTime.swift
import ReadingTime

// From String
let contents = "👋 Hello World! 🌍 This is my article! 🗞"
let calculatedTime = ReadingTime.calculate(for: contents)

// From file
let fileURL = Bundle.module.url(forResource: "my-article", withExtension: "md")!
let calculatedTime = try ReadingTime.calculate(for: fileURL)
```

## Installation

For the time being, `ReadingTime` can only be installed with Swift Package Manager (SPM). To install it as a dependency for a Swift Package, declare it as a dependency in the `Package.swift` file:

```swift:Package.swift
let package = Package(
    ...
    dependencies: [
        .package(url: "https://github.com/pol-piella/reading-time.git", from: "1.0.0")
    ],
    ...
)
```

## Implementation deep dive

There are two main parts to the logic of the `ReadTime` API:

1. The markdown content is read and parsed using [swift-markdown](https://github.com/apple/swift-markdown). All link elements are then replaced by text elements with just the link’s title so that their URLs do not count towards the word count. A similar thing happens to image elements, which are completely removed.
2. The number of words is retrieved from the text processed in step 1, removing any emoji characters, which should not be processed. Then this word count is divided by the word-per-minute value and converted to milliseconds to provide the estimated reading time.

> Note that this is early stages in the development process of the API, so the treatment of images might change, as I feel like some images provide a big cognitive load which cannot simply be ignored. If you have an idea for a solution or have seen an editor that deals with this in a good way, please feel free to file an issue or open a PR in the repo, which is Open Source.

### Formatting links and images

The code snippet below shows what valid markdown with links and images looks like:

```markdown:Article.md
![An awesome image caption](/public/assets/image.png)
[pol link](https://pol.link)
```

And this is the same text after the processing step, where the image element is removed and the only the link title as a plain text element is kept:

```markdown:Article.md
pol link
```

This is achieved by making use of [Apple's swift-markdown](https://github.com/apple/swift-markdown) library to parse and modify the input markdown string. A struct conforming to the library's `MarkupRewriter` protocol is implemented to either remove any `Image` node encountered or to replace `Link` nodes with `Text` ones showing only the link’s title.

```swift:Rewriter.swift
struct Rewriter: MarkupRewriter {
    mutating func visitImage(_ image: Image) -> Markup? {
        nil
    }

    func visitLink(_ link: Link) -> Markup? {
        guard let linkTitle = link.children.first(where: { $0 is Text }) else { return link }

        return linkTitle
    }
}

```

To use this rewriter type, a `Document` needs to be instantiated, which will parse the input string and then the updated document can be retrieved by `visit`ing the created `Document` through the `Rewriter` type:

```swift:ReadingTime.swift
let document = Document(parsing: text)
var rewriter = Rewriter()
let updatedDocument = rewriter.visitDocument(document)
```

### Counting words

Before the output of the previous step can be used to retrieve a word count, there is an extra step that needs to happen. From doing some testing across a couple of editors, I could see that emojis are not counted as words, so I made the decision to remove them entirely form the count.

The code below achieves this result through a series of simple steps, and with a lot of help from a [Stack Overflow answer which saved me a lot of time](https://stackoverflow.com/a/68853348):

```swift:ReadingTime.swift
let contentWithoutEmojis = rewrittenMarkdown.filter {
    $0.unicodeScalars.first?.properties.isEmoji == true &&
    !("0"..."9" ~= $0)
}
```

Once emojis are discarded, the words can be extracted by getting a set of substrings from the given text separated by whitespaces, new lines and punctuation characters. Note that there is an extra check to make sure that no empty strings are counted:

```swift:ReadingTime.swift
let contentWithoutEmojis = rewrittenMarkdown.filter {
	$0.unicodeScalars.first?.properties.isEmoji == true &&
	!("0"..."9" ~= $0)
}
let characterSet = CharacterSet
	.whitespacesAndNewlines
	.union(.punctuationCharacters)
let subStrings = contentWithoutEmojis
	.components(separatedBy: characterSet)
let words = subStrings.filter { !$0.isEmpty }
```

### Calculating reading time

The last thing to do now is to calculate the reading time for the number of words extracted from the markdown string. To do this, an average word-per-minute value of 200 is used, but can be modified by the API's consumer using the `calculate` method:

```swift:ReadingTime.swift
let timeIntervalInMinutes = Double(words.count) / Double(wpm)
let timeIntervalInMilliseconds = timeIntervalInMinutes * 60 * 1000

// Only 2 decimal places
return round(timeIntervalInMilliseconds * 100) / 100.0
```

That's it! The `calculate` method now returns an estimate of the reading time in milliseconds 🎉🤓.

## Get involved! 📢

Just wanted to call out again that the package is in early stages of its development process and more features will be added along the way.

If you want to be part of the process, feel free to create a PR or raise an issue for a feature you'd like to see ✨ or a bug you'd like to fix 🐛 in [ReadingTime's repo](https://github.com/pol-piella/reading-time)!

The package has also been added to [the Swift Package Directory](https://pol.link/reading-time) if you want to check it out there!
