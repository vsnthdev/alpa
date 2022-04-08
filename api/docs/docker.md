<br>
<h1 align="center">
    <a href="https://alpa.vercel.app#gh-light-mode-only" target="_blank" rel="noopener">
        <img src="https://raw.githubusercontent.com/vsnthdev/alpa/dev/docs/media/logo_light.svg" alt="alpa" height="60">
    </a>
    <a href="https://alpa.vercel.app#gh-dark-mode-only" target="_blank" rel="noopener">
        <img src="https://raw.githubusercontent.com/vsnthdev/alpa/dev/docs/media/logo_dark.svg" alt="alpa" height="60">
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

# 🐳 Deploying with Docker Compose

There are mainly 3 ways to deploy `@alpa/api` onto production. For personal usage deploying through 🐳 **Docker Compose** is the easiest & recommended way.

> ℹ️ **Info:** For advanced use cases or high intensity workload read about [manual deployment](./manual.md) & [Kubernetes deployment](./kubernetes.md).

Deploying **alpa**'s API using Docker is easy and straightforward by following the below steps:

## 🔍 Prerequisites

1. [Docker v20.10.13](https://docs.docker.com/engine/install) or higher
2. [Docker Compose v2.3.2](https://docs.docker.com/compose/cli-command) or [`docker-compose` v1.29.2](https://docs.docker.com/compose/install)

## 🚀 Deployment process

Once you've satisfied the prerequisites, follow the below steps to configure `@alpa/api` to run in production.

### 📂 Create a new folder

Create a new folder named `alpa` and enter into it, this is where we'll store the `docker-compose.yml` and other artifacts generated for running all the services we need, by running 👇 the following command:

```
mkdir ./alpa && cd ./alpa
```

### 📃 Creating `docker-compose.yml` file

The first thing we'll do in the newly created folder is create a `docker-compose.yml` file which defines all the services that are required for `@alpa/api`.

Open your favourite text editor (preferably [VSCode](https://code.visualstudio.com)), copy the below code block 👇 and save it as `docker-compose.yml` in the `alpa` directory.

```yaml
version: "3.8"
services:
    # the redis Docker image with RedisJSON and RediSearch
    # modules pre-configured & enabled along with persistance
    redis:
        image: redislabs/redisearch:2.4.0
        container_name: redis
        command: redis-server --loadmodule /usr/lib/redis/modules/redisearch.so --loadmodule /usr/lib/redis/modules/rejson.so --appendonly yes
        volumes:
            - .redis:/data
    
    # @alpa/api Docker image
    alpa-api:
        image: vsnthdev/alpa-api:v0.0.0
        container_name: alpa-api
        ports:
            - 1727:1727
        volumes:
            - ./config.yml:/opt/alpa/api/config.yml
```

> ℹ️ **Info:** We're intensionally using a versioned images, to mitigate the risk of accidentally updating the image and breaking everything.

### ⚙️ Mounting configuration file

An example config file will all possible values already exists in this repository. Simply right click on [this link](https://raw.githubusercontent.com/vsnthdev/alpa/main/api/config.example.yml) and select "_Save as_".

Now save it with the name `config.yml` in the `alpa` folder where `docker-compose.yml` is. Once done your `alpa` folder should contain two files

```
docker-compose.yml
config.yml
```

### ⚡ Production configuration

Provided example config file is best suitable for development & testing purposes only. We need to make some changes to the config file to make `@alpa/api` suitable for production environments.

These exact changes have been specified in the manual deployment docs **[click here to view them](./manual.md#-production-configuration).**

> ⚠️ **Warning:** Do not use `@alpa/api` in production without following the production configuration steps. It will lead to serious security risks and instabilities.

### ✨ Starting `@alpa/api`

With the above mentioned changes being done to the configuration file, `@alpa/api` is now ready to be started in a production environment safely.

To start all the services defined in our `docker-compose.yml` run 👇 one of the below commands depending on your Docker Compose version:

```bash
# if you're on Docker Compose v2
docker compose up

# if you're on docker-compose v1
docker-compose up
```

After following the above steps you should be able to login from the configured client and start enjoying **alpa**.

**If you're still facing issues, refer the [troubleshooting & help section]() for further information.**

<!-- ### Applying updates -->

## 📰 License
> The **alpa** project is released under the [Zlib](https://github.com/vsnthdev/alpa/blob/main/LICENSE.md). <br> Developed &amp; maintained By Vasanth Srivatsa. Copyright 2022 © Vasanth Developer.
<hr>

> <a href="https://vsnth.dev" target="_blank" rel="noopener">vsnth.dev</a> &nbsp;&middot;&nbsp;
> YouTube <a href="https://vas.cx/videos" target="_blank" rel="noopener">@vasanthdeveloper</a> &nbsp;&middot;&nbsp;
> Twitter <a href="https://vas.cx/twitter" target="_blank" rel="noopener">@vsnthdev</a> &nbsp;&middot;&nbsp;
> Discord <a href="https://vas.cx/discord" target="_blank" rel="noopener">Vasanth Developer</a>
