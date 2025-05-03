# 🛠️ backcraft-cli

**backcraft-cli** is a command-line tool that helps you quickly scaffold backend projects (`apps`) and integrate modular features (`components`) using predefined JSON templates stored in a separate registry (`backcraft-registry`).

---

## 🚀 Features

- Initialize full backend app templates (Express, Mongoose, Prisma, etc.)
- Add reusable components like auth, payment integration, WebSockets, and more
- Fully modular registry system (supports `app` and `component` types)
- File generation powered by `.json` templates
- Works with custom registries

---


## 🚀 Commands

- npx backcraft-cli@latest init
- npx backcraft-cli@latest init --name=registry-name
- npx backcraft-cli@latest add registry-name
- npx backcraft-cli@latest list
- npx backcraft-cli@latest list app
- npx backcraft-cli@latest list components

---

## 📦 Installation

```bash
npm install -g backcraft-cli
```
