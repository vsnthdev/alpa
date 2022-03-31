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

- **Fastify** _(API server focussed on speed)_
- **Redis** _(key-value pair database known for it's speed)_
- **JSON Web Tokens** _(for authentication)_
