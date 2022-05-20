<br>
<h1 align="center">
    <a href="https://alpa.vercel.app#gh-light-mode-only" target="_blank" rel="noopener">
        <img src="https://raw.githubusercontent.com/vsnthdev/alpa/main/docs/media/logo_light.svg" alt="alpa" height="60">
    </a>
    <a href="https://alpa.vercel.app#gh-dark-mode-only" target="_blank" rel="noopener">
        <img src="https://raw.githubusercontent.com/vsnthdev/alpa/main/docs/media/logo_dark.svg" alt="alpa" height="60">
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

This is the core of the project, it the RESTful API that performs redirection, communicates with the database and provides **alpa** it's functionality.

## ⚙️ Configuration

Refer to the [config example file](https://github.com/vsnthdev/alpa/blob/main/api/config.example.yml) for all possible configuration keys, and their detailed explanation. If you still have any doubts, feel free to shoot a tweet at me [@vsnthdev](https://vas.cx/@me).

## 🔭 API Routes

| Method | Path | Description | Protected |
|---|---|---|---|
| `POST` | `/api/auth/login` | Takes username, password and responds with a JWT token. | ❌ |
| `DELETE` | `/api/auth/logout` | Blacklists the token until expired to prevent usage. | ✅ |
| `GET` | `/:code & /` | Redirects if short code is found or returns 404. | ❌ |
| `DELETE` | `/api/codes/:code` | Deletes a short code from the database. | ✅ |
| `GET` | `/api/codes` | List out all short codes with pagination. | ✅ |
| `POST` | `/api/codes` | Creates a new short code. | ✅ |
| `POST` | `/api/config` | Creates, updates an existing, or deletes configuration. | ✅ |

## 🔮 Tech stack

| Name | Description |
| --- | --- |
| <img height="15" src="https://www.svgrepo.com/show/306030/fastify.svg"> **Fastify** | HTTP server focussed on speed designed to build RESTful APIs. |
| <img height="15" src="https://www.svgrepo.com/show/353943/json.svg"> **JSON Web Tokens** | For user authentication. |
| <img height="15" src="https://www.svgrepo.com/show/303460/redis-logo.svg"> **Redis** | Key-value pair database known for it's speed. |
| <img height="15" src="https://www.svgrepo.com/show/361050/bracket-dot.svg"> **RedisJSON** | Redis database plugin to store JSON documents. |
| <img height="15" src="https://redis.com/wp-content/uploads/2020/06/redisearch.png"> **RediSearch** | Redis database plugin that facilitates full text search. |
| <img height="15" src="https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png"> **Docker** | For easy installation & seamless updates. |
| <img height="15" src="https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg"> **Kubernetes** | For scalable deployments to production. |

## 💻 Building & Dev Setup

You need to be at least on **Node.js v17.4.0 or above** and follow the below instructions to build this project 👇

- **STEP 1️⃣**  Clone this repository & enter into it (`cd ./alpa`)
- **STEP 2️⃣**  Run **`npm install`** to get all dependencies & link projects together
- **STEP 3️⃣**  Enter in the project directory (`cd api`)
- **STEP 4️⃣**  To build this project run **`npm run build`**

Upon building `@alpa/api` a `dist` folder is created with the transpiled JavaScript files.

## 📰 License
> The **alpa** project is released under the [AGPL-3.0-only](https://github.com/vsnthdev/alpa/blob/main/LICENSE.md). <br> Developed &amp; maintained By Vasanth Srivatsa. Copyright 2022 © Vasanth Developer.
<hr>

> <a href="https://vsnth.dev" target="_blank" rel="noopener">vsnth.dev</a> &nbsp;&middot;&nbsp;
> YouTube <a href="https://vas.cx/videos" target="_blank" rel="noopener">@vasanthdeveloper</a> &nbsp;&middot;&nbsp;
> Twitter <a href="https://vas.cx/twitter" target="_blank" rel="noopener">@vsnthdev</a> &nbsp;&middot;&nbsp;
> Discord <a href="https://vas.cx/discord" target="_blank" rel="noopener">Vasanth Developer</a>
