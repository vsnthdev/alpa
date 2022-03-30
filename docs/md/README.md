<br>
<h1 align="center">
    <a href="https://alpa.vercel.app#gh-light-mode-only" target="_blank" rel="noopener">
        <img src="https://raw.githubusercontent.com/vsnthdev/alpa/dev/docs/media/logo_light.svg" alt="alpa" height="60">
    </a>
    <a href="https://alpa.vercel.app#gh-dark-mode-only" target="_blank" rel="noopener">
        <img src="https://raw.githubusercontent.com/vsnthdev/alpa/dev/docs/media/logo_dark.svg" alt="alpa" height="60">
    </a>
</h1>

<p align="center"><strong>{{desc}}</strong></p>

<p align="center">
    <a href="https://github.com/vsnthdev/alpa/issues">
        <img src="https://img.shields.io/github/issues/vsnthdev/alpa.svg?style=flat-square" alt="issues">
    </a>
    <a href="https://github.com/vsnthdev/alpa/commits/main">
        <img src="https://img.shields.io/github/last-commit/vsnthdev/alpa.svg?style=flat-square"
            alt="commits">
    </a>
    <a href="https://hub.docker.com/r/vsnthdev/alpa-api" target="_blank" rel="noopener">
        <img src="https://img.shields.io/docker/pulls/vsnthdev/alpa-api?color=1E90FF&style=flat-square" alt="docker">
    </a>
    <a href="https://alpa.vercel.app" target="_blank" rel="noopener">
        <img src="https://img.shields.io/website?label=dashboard&logo=vercel&style=flat-square&url=https%3A%2F%2Falpa.vercel.app" alt="dashboard status">
    </a>
</p>
<br>

<!-- block:header -->

**alpa** is a self-hosted _(you run it on your servers)_ URL shortener which is fast and provides full control of the short links you create.

It takes this 👇

```plaintext
https://vasanthdeveloper.com/migrating-from-vps-to-kubernetes
```

and converts it into something like this 👇

```plaintext
https://vas.cx/fjby
```

Which is easier to remember and share across the internet.

## ✨ Features

🚀 **Super fast**  
👌 **Your branding**  
✅ **Full control**  
🎮 **Simple & intuitive dashboard**  

## 💡 Why I built it?

I was using <a href="https://en.wikipedia.org/wiki/Google_URL_Shortener" target="_blank" rel="noopener">goo.gl</a> back in 2016 and I was very impressed by it. It's simple dashboard & fast redirection were two things that were really attractive to me. **alpa** is inspired by goo.gl URL shortener.

Along with that, most popular URL shorteners are not _self-hosted_, which means that you'll share your data with others that use the service. To me, it was a concern about **reliability**, **privacy** and **performance**.

## 🚀 Quick start

The quickest way to run **alpa** is through <a href="https://docs.docker.com/compose" target="_blank" rel="noopener">Docker Compose</a> using only **3 steps**:

**1️⃣ STEP:** Getting **alpa**

Once you have Docker Compose installed, clone this repository by running the following command 👇

```
git clone https://github.com/vsnthdev/alpa.git
```

**2️⃣ STEP:** Creating a configuration file

Enter into the **alpa** directory and create an API config by running 👇

```
cd ./alpa
cp ./api/config.example.yml ./api/config.yml
```

**⚠️ Warning:** The example config file is only meant for development and testing purposes, a proper config file is required to securely run **alpa** in production.

**3️⃣ STEP:** Starting **alpa**

Now all you need to do is, run the following command to start both **alpa**'s [app](https://github.com/vsnthdev/alpa/tree/main/app) & the [API](https://github.com/vsnthdev/alpa/tree/main/api).

```
docker-compose up -d
```

## ⚡ Support & funding

Financial funding would really help this project go forward as I will be able to spend more hours working on the project to maintain & add more features into it.

Please get in touch with me on [Discord](https://discord.com/users/492205153198407682) or [Twitter](https://vas.cx/twitter) to get fund the project even if it is a small amount 🙏

## 💻 Code & contribution

**Pull requests are always welcome** 👍

But it will be better if you can get in touch with me before contributing or [raise an issue](https://github.com/vsnthdev/alpa/issues/new/choose) to see if the contribution aligns with the vision of the project.

> **ℹ️ Note:** This project follows [Vasanth's Commit Style](https://vas.cx/commits) for commit messages. We highly encourage you to use this commit style for contributions to this project.

## 🛠️ Building

This is a [monorepo](https://monorepo.tools/#what-is-a-monorepo) containing multiple projects.

Below is a list of all the projects in this repository, what they do, and docs to building them:

| Name | Description |
| --- | --- |
{{#each projects}}
| [{{this.name}}](./{{this.projectName}}) | {{this.description}} |
{{/each}}

<!-- block:footer -->

## 📰 License
> The **alpa** project is released under the [{{license}}](https://github.com/vsnthdev/alpa/blob/main/LICENSE.md). <br> Developed &amp; maintained By Vasanth Srivatsa. Copyright {{year}} © Vasanth Developer.
<hr>

> <a href="https://vsnth.dev" target="_blank" rel="noopener">vsnth.dev</a> &nbsp;&middot;&nbsp;
> YouTube <a href="https://vas.cx/videos" target="_blank" rel="noopener">@vasanthdeveloper</a> &nbsp;&middot;&nbsp;
> Twitter <a href="https://vas.cx/twitter" target="_blank" rel="noopener">@vsnthdev</a> &nbsp;&middot;&nbsp;
> Discord <a href="https://vas.cx/discord" target="_blank" rel="noopener">Vasanth Developer</a>
