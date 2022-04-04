---
layout: ../README.md
---

This is the core of the project, it the RESTful API that performs redirection, communicates with the database and provides **alpa** it's functionality.

## ⚙️ Configuration

Refer to the [config example file](https://github.com/vsnthdev/alpa/blob/main/api/config.example.yml) for all possible configuration keys, and their detailed explanation. If you still have any doubts, feel free to shoot a tweet at me [@vsnthdev](https://vas.cx/@me).

## 🔭 API Routes

| Method | Path | Description | Protected |
|---|---|---|---|
{{#each api.routes}}
| `{{this.method}}` | `{{this.path}}` | {{this.description}} | {{#if this.authRequired}}✅{{else}}❌{{/if}} |
{{/each}}

## 🔮 Tech stack

| Name | Description |
| --- | --- |
| <img height="15" src="https://www.svgrepo.com/show/306030/fastify.svg"> **Fastify** | HTTP server focussed on speed designed to build RESTful APIs. |
| <img height="15" src="https://www.svgrepo.com/show/353943/json.svg"> **JSON Web Tokens** | For user authentication. |
| <img height="15" src="https://www.svgrepo.com/show/303460/redis-logo.svg"> **Redis** | Key-value pair database known for it's speed. |
| <img height="15" src="https://www.svgrepo.com/show/361050/bracket-dot.svg"> **RedisJSON** | Redis database plugin to store JSON documents. |
| <img height="15" src="https://redis.com/wp-content/uploads/2020/06/redisearch.png"> **RediSearch** | Redis database plugin that facilitates full text search. |
