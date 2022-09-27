---
title: 'Handling multiple git SSH keys'
slug: 'handling-multiple-git-ssh-keys'
excerpt: 'A whistle stop tour through my git configuration, showing how to effectively deal with two different git users and SSH keys.'
pubDate: '2022-27-09'
readtime: '4'
tags: [{ name: 'Git', slug: 'git' }]
author:
  name: 'Pol Piella'
layout: ../layouts/BlogPostLayout.astro
---

I have for a long time fought a silent battle with my SSH configuration when trying to handle two different accounts with different SSH keys: one for work and one for my open source and personal contributions.

I have finally decided to stop and learn more about ssh config in order to find a good way to work effectively with both accounts. In this post, if you choose to keep reading after this enticing introduction 😅, I'll go through the configuration that I have ended up with 👇.

## Creating SSH keys

Firs thing I did was to start from scratch and remove all SSH keys I had. I then created two new ones: one for my work Github account and one for my personal one.

> Note that, while I use Github, this example will work for any code hosting service as the SSH config is for git rather than the specific services themselves.

To create the new keys I used the `ssh-keygen` command from the terminal:

```bash:Terminal
# Personal
ssh-keygen -t ed25519 -C "<my_personal_email>"
# Personal
ssh-keygen -t ed25519 -C "<my_work_email>"
```

> When creating the keys, you need to choose a location where to store them. I would recommend using the default path suggested by `ssh-keygen` and append github username for the account the key is associated with to the file's name (i.e. `~/.ssh/id_ed25519_<git_username>`).

With both keys created, I then added them to the `ssh-agent` like so:

```bash:Terminal
# Add the private key (the one without the `.pub` suffix)
ssh-add <path_to_personal_key>
ssh-add <path_to_work_key>
```

## Adding the key to the code hosting provider

Next step was to add the key to my account in my code hosting service (Github):

![A screenshot showing the create SSH page in Github.](/assets/posts/new-ssh-key.png)

> The SSH key settings can be found in the account's settings.

To populate the key in Github I needed to retrieve its raw contents. I did this using `pbcopy` on the public keys:

```bash:Terminal
# This needs to be the public key (suffixed with `.pub`)
pbcopy < id_ed25519_<git_username>.pub
```

> Note that this has to be done for each of the two accounts, and the right SSH key must be associated with its respective account.

## Creating an SSH config

Now that the keys were ready to be used, I then went on to create a SSH config from scratch (I wanted to fully understand how this process works, so removed everything I had) which would choose a key based on a set of rules. I did this by creating a file called `config` under the `~/.ssh` directory.

I then populated it with two different configurations, one for work and one for personal use:

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

Let's break the configuration above down to understand what it's doing:

1. Specifies a host with a given name, in this case it can be either `work` or `personal`.
2. Host name will always be `github.com`, this means that whenever we use the `work` or `personal` hosts, they will always resolve to `github.com`.
3. Uses the correct SSH key based on the host provided.

That's it! Last thing I needed to do at this point was to actually use this config.

## Using the new configurations

In order to determine which key a given repository would use, I needed to make some changes to my local repositories' remote URLs (and going forward the new ones I clone). Since two new hosts have been defined, to use the right key, a repository must be cloned with one of those names in the remote URL. For example, my new package `ReadingTime` should now be cloned to use a personal key as follows:

```bash:Terminal
git clone git@personal:pol-piella/reading-time.git
```

Or to use a work key, it can be cloned like so:

```bash:Terminal
git clone git@work:pol-piella/reading-time.git
```

As I mentioned above, both these hosts will resolve to `github.com` but the cool thing is that they will use differnet SSH keys. 🎉

## Notes

Bear in mind that this is the way I like to work and it might not be the best way. My approach forces me to be very explicit whenever I set a remote and I am used to it by now. I can quickly see which key is being used by just inspecting the remote with the following command: `git remote get-url origin --all`, which doesn't require me to go digging into the config file when errors occur.

There are other approaches, such as setting specific repos or organisations as the hostnames so that you don't have to remember to change the git clone command, so make sure you do some research and find the way that suits your workflow the most 😃.
