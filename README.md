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

- npx backcraft@latest init
- npx backcraft@latest init --name=registry-name
- npx backcraft@latest add registry-name
- npx backcraft@latest list
- npx backcraft@latest list app
- npx backcraft@latest list components

---

## 📦 Installation

```bash
npm install -g backcraft-cli
```
