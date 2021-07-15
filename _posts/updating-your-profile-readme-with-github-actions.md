---
title: "How I use Github Actions to update my Github profile"
excerpt: "In this post, I will talk through how you can add dynamic data to your profile README.md by scheduling jobs using a Github Action."
date: "2021-07-15T05:35:07.322Z"
readtime: "5"
tags: [{ name: "CI/CD", slug: "ci-cd" }, { name: "Node", slug: "node" }]
author:
    name: "Pol Piella"
---

Github have recently introduced a way of personalising your Github profile to include relevant information and styles to be able to show off your skills and stats when people visit your profile.

While for most cases showing static data might be enough, you might want to fetch data dynamically from an API and update your README accordingly. In my case, I wanted to be able to show the latest articles from my blog, but I was clueless on how I could do so. I started researching and came across [a list of examples](https://github.com/abhisheknaiidu/awesome-github-profile-readme#github-actions-) which inspired to write my own github action to dynamically update content in my profile.

### Creating a profile repo

The first thing we need to do before we get started and write any code is to create the repo where your profile will live. In order to do this, you will need to create a repo which has your username as its name, just like I do in the image below:

![Github README create repo](assets/posts/updating-your-profile-readme-with-github-actions/profile-readme.png)

You will then be greeted with a nice little message telling that you have found a secret and by naming the repo in the same way as your username, this will then become your profile. Before clicking create, make sure that you select the `Add a README file` checkbox. Feel free at this point to stop reading and start writing your README and populating with the content you would like to showcase to others.

### Creating the library

The first thing I did when I cloned the project locally was to run `npm init --y` at the root and, once that finished, I create a `src/` folder where all my code will live and a `index.js` file where the logic for updating my README file will happen. I also added a very basic `.gitignore` to not commit any of the `node_modules`. Inside the `src/` folder, I created another directory called `templates` with a single file inside `README.md.tpl`. The contents of this file will the exact same as the README.md I have at the root of the repo but with one exception, I added a new section for the content I will be fetching dynamically with a single placeholder that I can then find and replace in my `index.js` file.

```md
[...]

### Latest articles in my [blog](https://www.polpiella.codes)

{latest_blogs}

[...]
```

It is important to note that, from this point onwards, any changes that I want to make to my profile, I will have to make to my template file as the contents of this will override any changes that the `README.md` has at the root of the repository.

#### Getting the latest blog posts

Once we have our template sorted, it is time to finally write some code! 🧑‍💻 Let's start by writing a function that fetches the latest articles from my website's RSS feed and parses into markdown that we can then insert into our README file. For the sake of simplicity and as it is a package I find very easy to use, I decided to go with [rss-parser](https://www.npmjs.com/package/rss-parser) as my way of decoding my RSS feed. The function will use `async/await` and will parse the title and link of my feed items into a markdown list:

```js
const Parser = require("rss-parser");

async function getLatestArticles() {
    const feed = await new Parser().parseURL(
        "https://www.polpiella.codes/rss.xml"
    );

    return feed.items
        .slice(0, 3)
        .map(({ title, link }) => `- [${title}](${link})`)
        .join("\n");
}
```

#### Reading the template file

Now that we have the functionality to fetch and decode our RSS feed, we need a way of reading the content of our files. To do this, we can use the [file system](https://www.w3schools.com/nodejs/nodejs_filesystem.asp) module that comes built-in in `Node.js` and call the `readFile` method, passing it the relative path to our template file as way as the correct encoding, which in our case is `utf-8`. What this method will return is a string containing the contents of the template file, which we can then inspect and perform transformations to.

```js
async function readTemplateFile() {
    const template = await fs.readFile("./src/templates/README.md.tpl", {
        encoding: "utf-8",
    });
    return template;
}
```

#### Updating the README.md file

Now that we can read the content of our template file and we have our latest blog posts as a markdown string, we can start writing a function that injects the markdown string into the parsed contents of our template and then writes this to the `README.md` file which will serve as your profile page. Again, I use the [file system](https://www.w3schools.com/nodejs/nodejs_filesystem.asp) module and a simple `replace` method to find the placeholder and replace with our fetched markdown content like so:

```js
function replaceFileContents(template, oldContent, newContent, outputPath) {
    const newFileContent = template.replace(oldContent, newContent);
    fs.writeFile("outputPath", newFileContent);
}
```

### Putting everything together

Now that all of our pieces are finished, we need a function that composes all of our codes and executes our commands. This needs to be an IIFE asynchronous functions so that it gets executed as soon as the file is run. You can see the contents of what this looks like below:

```js
(async () => {
    const latestArticlesMarkdown = await getLatestArticles();
    const template = await readTemplateFile();
    replaceFileContents(
        template,
        "{latest_articles}",
        latestArticlesMarkdown,
        "./README.md"
    );
})();
```

The last to do now is to create a new entry in the `scripts` section of your `package.json` that executes the contents of the file you have just created:

```js
"scripts": {
    "readme": "node ./src/index.js"
},
```

### Creating a Github workflow

I was very surprised to see how easy it is to set up Github Actions for any repo you have as the only thing you need to do is create a `.github/workflows` directory at the root of your repository and then add any workflows as `.yml` files in such location. You can learn more about these actions in the [docs](https://docs.github.com/en/actions/learn-github-actions/introduction-to-github-actions) but they are essentially a form of CI/CD, where you provide a bunch of configuration to determine which agent to run your code in as well as specifying any commands you would like to run.

#### Specifying our requirements

For my project, as I am using `Node`, I needed to use an agent capable of running node and be able to perform the following requirements:

-   The job should run on a nightly basis (I don't update my blog more than once a day, so running it at mighnight every day would be okay).
-   Check out the repository before any other script is run.
-   Setup node.
-   Run `npm install` and run `npm run readme`
-   If there are any changes to `README.md`, commit and push. If not, do nothing.

#### Translating our requirements into .yml

In order to translate our requirements to something that `Github` can understand, we need to first create a `.yml` file in the directory mentioned above. Once we have this, let's start by naming our action and giving it a few triggers:

```yml
name: Fetch latest blog posts and update README.md

on:
  push:
    - main
  schedule:
    - cron: "0 0 * * *"
```

In the code snippet above, we are telling our action what it should be triggered by. In our example, it will run every time we push a new commit to the `main` branch and whenever the cron specs are met (at minute 0 of hour 0 of every single day). If you are not familiar with cron schedule expressions, I would really recommend this [site](https://crontab.guru), which translates your expressions into human-readable times.

Now that we have set the triggers, we need to tell the action what to run and where to run it on. We can do this by adding a `build` to the `jobs` property as follows:

```yml
jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v1
      with:
        node-version: '14'
    - run: npm install
    - run: npm run readme
    - run: |
        git config user.name pol-piella
        git config user.email info@polpiellamusic.com
        git add README.md
        git diff --quiet && git diff --staged --quiet || git commit -m "[generated]: Update latest blog posts in `README.md` file"
        git push origin main
```

As you can see above, we are telling github to run this action in an `ubuntu` machine with `node v14` installed and then we are telling it to perform the action we created earlier as well as the configuring our credentials and pushing to `main`. And just like that, we have an action that runs every midnight and adds latest posts from an RSS feed to a given section! 

![Updated Section](assets/posts/updating-your-profile-readme-with-github-actions/updated-section.png)