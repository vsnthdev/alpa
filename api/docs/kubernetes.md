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

# 🏅 Deploying with Kubernetes

There are mainly 3 ways to deploy `@alpa/api` onto production. For personal usage deploying through [🐳 Docker Compose](./docker.md) is the most easiest & recommended way. For advanced use cases read about [manual deployment](./manual.md).

Deploying **alpa**'s API into a Kubernetes Cluster is easy and straightforward by following the below steps:

## 🔍 Prerequisites

1. [Docker v20.10.13](https://docs.docker.com/engine/install) or higher
2. [Kubernetes 1.22.5](https://kubernetes.io/docs/setup) or higher

## 🚀 Deployment process

Once you've satisfied the prerequisites, follow the below steps to configure `@alpa/api` to run in production.

### 📂 Creating folder structure

Create a new folder named `alpa` with two sub-folders named `alpa`, `redis`, this is where we'll store the Kubernetes files.

```
mkdir alpa && mkdir alpa/redis && mkdir alpa/alpa && cd alpa
```

### 🏝️ Creating a namespace

Using your favorite text editor, create a new file named `0-namespace.yml` file and paste the below contents 👇

```yml
apiVersion: v1
kind: Namespace
metadata:
    name: alpa
```

Save the `0-namespace.yml` file in the `alpa` folder we created above.

### 🪛 Setting up Redis database

To setup Redis database in a Kubernetes cluster, we need to create a few files. Lets create them one by one while going through each one.

#### 🧳 Redis database volume

Create a file named `1-volumes.yml` and save the below contents 👇 in the `alpa/redis` folder we created.

```yml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
    name: redis-claim
    namespace: alpa
spec:
    resources:
        requests:
            storage: 1G
    volumeMode: Filesystem
    accessModes:
        - ReadWriteOnce
```

This file creates a [claim for a persistent volume](https://kubernetes.io/docs/concepts/storage/persistent-volumes) which can later be used to create an actual volume to store data from our Redis database.

#### 📌 Redis database deployment

Create a file named `2-deploys.yml` and save the below contents 👇 in the `alpa/redis` folder we created.

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
    name: redis
    namespace: alpa
spec:
    selector:
        matchLabels:
            app: redis
    template:
        metadata:
            labels:
                app: redis
        spec:
            hostname: redis
            volumes:
                - name: redis
                  persistentVolumeClaim:
                      claimName: redis-claim
            containers:
                - name: redis
                  image: redislabs/redisearch:2.4.0
                  imagePullPolicy: IfNotPresent
                  args:
                      - "redis-server"
                      - "--loadmodule"
                      - "/usr/lib/redis/modules/redisearch.so"
                      - "--loadmodule"
                      - "/usr/lib/redis/modules/rejson.so"
                      - "--appendonly"
                      - "yes"
                  volumeMounts:
                      - mountPath: /data
                        name: redis
                  resources:
                      limits:
                          memory: 128Mi
                          cpu: 100m
                  ports:
                      - containerPort: 6379
```

This is the actual deployment file that tells Kubernetes which Docker container to run and how to link it with our Persistent Volume Claim and mount the data directory.

This file also specifies how much CPU & memory is allocated to the Redis database.

#### 🔦 Redis database service

Create a file named `3-services.yml` and save the below contents 👇 in the `alpa/redis` folder we created.

```yml
apiVersion: v1
kind: Service
metadata:
    name: redis
    namespace: alpa
spec:
    type: NodePort
    selector:
        app: redis
    ports:
        - port: 6379
          targetPort: 6379
```

Redis service exposes the Redis database on port 6379 to be accessed by `@alpa/api` and other deployments in this namespace.

> ℹ️ **Note:** For security purposes, it is recommended that you change this port number `6379` to a random 5 digit number below 60,000.

### ⚙️ Creating configuration file

Create a file named `1-configs.yml` and save the below contents 👇 in the `alpa/alpa` folder we created.

```yml
apiVersion: v1
kind: ConfigMap
metadata:
    name: alpa-api-config
    namespace: alpa
data:
    config: |
        auth:
          username: alpa
          password: short_lived
          email: alpa@example.com
        database:
          connection: redis://redis:6379
          channels:
            codes: 0
            tokens: 1
            config: 2
        
```

This creates a [ConfigMap](https://kubernetes.io/docs/concepts/configuration/configmap) in Kubernetes which stores the config file for `@alpa/api` which will be mounted as a volume later.

### ⚡ Configuring for production

Provided example config file is best suitable for development & testing purposes only. We need to make some changes to the config file to make `@alpa/api` suitable for production environments.

These exact changes have been specified in the manual deployment docs **[click here to view them](./manual.md#-production-configuration).**

> ⚠️ **Warning:** Do not use `@alpa/api` in production without following the production configuration steps. It will lead to serious security risks and instabilities.

#### 📌 Deploying `@alpa/api`

Create a file named `2-deploys.yml` and save the below contents 👇 in the `alpa/alpa` folder we created.

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
    name: alpa
    namespace: alpa
spec:
    selector:
        matchLabels:
            app: alpa
    template:
        metadata:
            labels:
                app: alpa
        spec:
            hostname: alpa
            volumes:
                - name: alpa-api-config
                  configMap:
                      name: alpa-api-config
            containers:
                - name: alpa
                  image: vsnthdev/alpa-api:v1.1.0
                  imagePullPolicy: Always
                  volumeMounts:
                      - mountPath: /opt/alpa/api/config.yml
                        name: alpa-api-config
                        subPath: config
                        readOnly: true
                  resources:
                      limits:
                          memory: 256Mi
                          cpu: 100m
                  ports:
                      - containerPort: 1727
```

> ℹ️ **Info:** We're intensionally using a versioned images, to mitigate the risk of accidentally updating the image and breaking everything.

This file tells Kubernetes to pull and run `@alpa/api` on Kubernetes along with how much memory and CPU should be allocated.

### 🌏 Creating `@alpa/api` service

Create a file named `3-services.yml` and save the below contents 👇 in the `alpa/alpa` folder we created.

```yml
apiVersion: v1
kind: Service
metadata:
    name: alpa
    namespace: alpa
spec:
    type: NodePort
    selector:
        app: alpa
    ports:
        - port: 48878
          targetPort: 1727
```

A [service](https://kubernetes.io/docs/concepts/services-networking/service) will allow you to access `@alpa/api` outside the Kubernetes cluster network on port `48878`.

> ℹ️ **Note:** For security purposes, it is recommended that you change this port number `48878` to a random 5 digit number below 60,000.

### 🔨 Creating `kustomization.yml` file

Create a file named `kustomization.yml` and save the below contents 👇 in the `alpa` folder we created.

```yml
apiVersion: kustomize.config.k8s.io/v1beta1
resources:
    # deleting the name will delete everything
    - 0-namespace.yml

    # redis database for primarily for alpa
    - redis/1-volumes.yml
    - redis/2-deploys.yml
    - redis/3-services.yml

    # @alpa/api service
    - alpa/1-configs.yml
    - alpa/2-deploys.yml
    - alpa/3-services.yml
```

Once all the required files are created, the completed directory structure should look something like 👇

```js
alpa
    /alpa
        1-configs.yml
        2-deploys.yml
        3-services.yml
    /redis
        1-volumes.yml
        2-deploys.yml
        3-services.yml
    0-namespace.yml
    kustomization.yml
```

### ✨ Starting `@alpa/api`

With the above mentioned changes being done to the configuration file, `@alpa/api` is now ready to be started in a production environment safely.

To start all the services defined in our `kustomization.yml` run 👇 the below command:

```bash
kubectl apply -k .
```

**If you're still facing issues, refer the [troubleshooting & help section](https://github.com/vsnthdev/alpa#-troubleshooting--help) for further information.**

## 📰 License
> The **alpa** project is released under the [AGPL-3.0-only](https://github.com/vsnthdev/alpa/blob/main/LICENSE.md). <br> Developed &amp; maintained By Vasanth Srivatsa. Copyright 2022 © Vasanth Developer.
<hr>

> <a href="https://vsnth.dev" target="_blank" rel="noopener">vsnth.dev</a> &nbsp;&middot;&nbsp;
> YouTube <a href="https://vas.cx/videos" target="_blank" rel="noopener">@vasanthdeveloper</a> &nbsp;&middot;&nbsp;
> Twitter <a href="https://vas.cx/twitter" target="_blank" rel="noopener">@vsnthdev</a> &nbsp;&middot;&nbsp;
> Discord <a href="https://vas.cx/discord" target="_blank" rel="noopener">Vasanth Developer</a>
