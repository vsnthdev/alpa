---
layout: ../README.md
---

Reads the TypeScript code in this repository and programmatically generates documentation markdown files.

## 🔮 Tech stack

| Name | Description |
| --- | --- |
| <img height="15" src="https://www.svgrepo.com/show/88884/mustache.svg"> **Handlebars** | Templating engine to inject values into template markdown files. |
| <img height="15" src="https://www.svgrepo.com/show/19691/search.svg"> **Chokidar** | Watches for file changes and rebuilds docs. |

## 💻 Building & Dev Setup

You need to be at least on **Node.js v{{nodeVersion}} or above** and follow the below instructions to build this project 👇

- **STEP 1️⃣**  Clone this repository & enter into it (`cd ./alpa`)
- **STEP 2️⃣**  Run **`npm install`** to get all dependencies & link projects together
- **STEP 3️⃣**  Enter in the project directory (`cd docs`)
- **STEP 4️⃣**  To build this project run **`npm run build`**

Upon building `@alpa/docs` will rerender all markdown files within all the projects in this repository.

> **ℹ️ Info:** You can also run `npm run clean` to delete existing documentation from the project to avoid overwriting & purge dangling documents. While running the `build` script, old docs are first deleted before getting overwritten.
