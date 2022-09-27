---
title: 'Handling multiple git SSH keys'
slug: 'handling-multiple-git-ssh-keys'
excerpt: 'A whistle stop tour through my git configuration, showing how to effectively deal with two different github accounts.'
pubDate: '2022-27-09'
readtime: '4'
tags:
  [
    { name: 'Git', slug: 'git' }
  ]
author:
  name: 'Pol Piella'
layout: ../layouts/BlogPostLayout.astro
---

I have for a long time fought a silent battle with my SSH configuration and trying to handle two different accounts with different keys: one for work and one for my open source and personal contributions. Recently, I decided to stop and learn a bit more about ssh config and sort out my configuration to work effectively with both accounts, and I want to explain what I learned!

## Creating SSH keys

I started the config from scratch. This means that I had to create two new SSH keys, one for my work Github account and one for my personal one. 

> Note that, while I use Github, this example will work for any code hosting provider as it has to do with the underlying git mechanism rather than the specific providers themselves.

To do this I used the `ssh-keygen` command from the terminal:

```bash:Terminal
# Personal
ssh-keygen -t ed25519 -C "<my_personal_email>"
# Personal
ssh-keygen -t ed25519 -C "<my_work_email>"
```

> When creating the keys, you need to choose a location where to store them. I would recommend using the default location and append the username with the github username for the account the key is associated with (i.e. `~/.ssh/id_ed25519_<git_username>`).

Now that both keys have been created, they can be added to the `ssh-agent` like so:

``` bash:Terminal
# Add the private key (the one without the `.pub` suffix)
ssh-add <path_to_personal_key>
ssh-add <path_to_work_key>
```

## Adding the key to the code hosting provider

Next step is to add the key to your account on your code hosting provider. For example, in Github this can be found on your account's settings and it expects a name and a key string:

![](/assets/posts/new-ssh-key.png)

The String contents for a given public ssh key can be copied with the `pbcopy` command from the terminal:

```bash:Terminal
# This needs to be the public key (suffixed with `.pub`)
pbcopy < id_ed25519_<git_username>.pub
```

> Note that this has to be for each of the two accounts, and the right SSH key must be associated with its respective account.

## Creating an SSH config

The SSH keys are now ready to be used, a SSH config can be created to pick which one to use based on a git repository's remote URL. To get started, a file called `config` under `~/.ssh` must be created.

This file can then be populated with two different configurations, one for work and one for personal use in this case:

```yml:config
# Personal Configuration
Host personal
	HostName github.com
	User git
	IdentityFile ~/.ssh/id_ed25519_<personal_git_username>

# Work Configuration
Host work
	HostName github.com
	User git
	IdentityFile ~/.ssh/id_ed25519_<work_git_username>
```

Let's break the configuration down to understand how it can be used:
1. Specify a host with a given name, in this case it can be either `work` or `personal`.
2. Host name will always be `github.com`, this means that whenever we use the `work` or `personal` hosts, they will always resolve to `github.com`.
3. Use the correct SSH key based on the host provided.

That's it! Let's now see how to use this configuration.

## Using the new configurations

In order to determine which key a given repository should use, some attention must be given to the way a repository is cloned. Since two new hosts have been defined, to use the right key, a repository must be cloned with one of those names. For example, my new package `ReadingTime` should now be cloned to use a personal key as follows:

```bash:Terminal
git clone git@personal:pol-piella/reading-time.git
```

Or to use a work key, it can be cloned like so:

```bash:Terminal
git clone git@work:pol-piella/reading-time.git
```

## Notes

Bear in mind that this is the way I like to work and it might not be the best way. My approach requires me being very explicit whenever I set a remote and I am used to it. I can quickly see which key is being used by just inspecting the remote with the following command: `git remote get-url origin --all`, which doesn't require me to go digging into the config file.

There are other approaches, such as setting specific repos or organisations as the hostnames so that you don't have to remember to change the git clone command, so make sure you do some research before going away and implementing this configuration 😄.
