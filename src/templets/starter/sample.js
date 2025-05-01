const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function createFile(filePath, content) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content);
}

function sampleTemplets({ name, language }) {
    const rootDir = path.join(process.cwd(), name);
    const srcDir = path.join(rootDir, "src");
    const isTS = language === "typescript";

    fs.mkdirSync(srcDir, { recursive: true });

    // Create .env
    createFile(path.join(rootDir, ".env"), "PORT=5000");

    // Create .gitignore
    createFile(
        path.join(rootDir, ".gitignore"),
        `node_modules
.env
`
    );

    // Controller
    const controllerContent = isTS
        ? `import { Request, Response } from "express";

export const getSample = (req: Request, res: Response) => {
  res.json({ message: "Hello from Sample Controller (TS)" });
};`
        : `exports.getSample = (req, res) => {
  res.json({ message: "Hello from Sample Controller (JS)" });
};`;

    createFile(path.join(srcDir, "controllers", `sample.controller.${isTS ? "ts" : "js"}`), controllerContent);

    // Router
    const routerContent = isTS
        ? `import { Router } from "express";
import { getSample } from "../controllers/sample.controller";

const router = Router();

router.get("/", getSample);

export default router;`
        : `const express = require("express");
const { getSample } = require("../controllers/sample.controller");

const router = express.Router();

router.get("/", getSample);

module.exports = router;`;

    createFile(path.join(srcDir, "routes", `sample.routes.${isTS ? "ts" : "js"}`), routerContent);

    // App
    const appContent = isTS
        ? `import express from "express";
import dotenv from "dotenv";
import sampleRouter from "./routes/sample.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/sample", sampleRouter);

app.listen(PORT, () => {
  console.log(Server is running on port ${PORT});
});`
        : `const express = require("express");
const dotenv = require("dotenv");
const sampleRouter = require("./routes/sample.routes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/sample", sampleRouter);

app.listen(PORT, () => {
  console.log(Server is running on port ${PORT});
});`;

    createFile(path.join(srcDir, `app.${isTS ? "ts" : "js"}`), appContent);

    // package.json
    const packageJson = {
        name,
        version: "1.0.0",
        main: `src/app.${isTS ? "ts" : "js"}`,
        scripts: {
            dev: isTS ? "nodemon src/app.ts" : "nodemon src/app.js",
        },
        dependencies: {
            express: "^4.18.2",
            dotenv: "^16.0.3",
        },
        devDependencies: {
            nodemon: "^2.0.22",
            ...(isTS && { typescript: "^5.3.3", "@types/node": "^20.6.1", "@types/express": "^4.17.21" }),
        },
    };

    fs.writeFileSync(path.join(rootDir, "package.json"), JSON.stringify(packageJson, null, 2));

    // Run npm install
    execSync("npm install", { cwd: rootDir, stdio: "inherit" });
}

module.exports = { sampleTemplets };
