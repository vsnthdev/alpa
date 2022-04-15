<br>
<h1 align="center">
    <a href="https://alpa.vercel.app#gh-light-mode-only" target="_blank" rel="noopener">
        <img src="https://raw.githubusercontent.com/vsnthdev/alpa/main/docs/media/logo_light.svg" alt="alpa" height="60">
    </a>
    <a href="https://alpa.vercel.app#gh-dark-mode-only" target="_blank" rel="noopener">
        <img src="https://raw.githubusercontent.com/vsnthdev/alpa/main/docs/media/logo_dark.svg" alt="alpa" heig
        ht="60">
    </a>
</h1>



<p align="center"><strong>( अल्प ) — A fast ⚡ self-hosted link 🔗 shortener.</strong></p>

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

Reads the TypeScript code in this repository and programmatically generates documentation markdown files.

## 🔮 Tech stack

| Name | Description |
| --- | --- |
| <img height="15" src="https://www.svgrepo.com/show/88884/mustache.svg"> **Handlebars** | Templating engine to inject values into template markdown files. |
| <img height="15" src="https://www.svgrepo.com/show/19691/search.svg"> **Chokidar** | Watches for file changes and rebuilds docs. |

## 💻 Building & Dev Setup

You need to be at least on **Node.js v17.4.0 or above** and follow the below instructions to build this project 👇

- **STEP 1️⃣**  Clone this repository & enter into it (`cd ./alpa`)
- **STEP 2️⃣**  Run **`npm install`** to get all dependencies & link projects together
- **STEP 3️⃣**  Enter in the project directory (`cd docs`)
- **STEP 4️⃣**  To build this project run **`npm run build`**

Upon building `@alpa/docs` will rerender all markdown files within all the projects in this repository.

> **ℹ️ Info:** You can also run `npm run clean` to delete existing documentation from the project to avoid overwriting & purge dangling documents. While running the `build` script, old docs are first deleted before getting overwritten.

## 📰 License
> The **alpa** project is released under the [Zlib](https://github.com/vsnthdev/alpa/blob/main/LICENSE.md). <br> Developed &amp; maintained By Vasanth Srivatsa. Copyright 2022 © Vasanth Developer.
<hr>

> <a href="https://vsnth.dev" target="_blank" rel="noopener">vsnth.dev</a> &nbsp;&middot;&nbsp;
> YouTube <a href="https://vas.cx/videos" target="_blank" rel="noopener">@vasanthdeveloper</a> &nbsp;&middot;&nbsp;
> Twitter <a href="https://vas.cx/twitter" target="_blank" rel="noopener">@vsnthdev</a> &nbsp;&middot;&nbsp;
> Discord <a href="https://vas.cx/discord" target="_blank" rel="noopener">Vasanth Developer</a>
