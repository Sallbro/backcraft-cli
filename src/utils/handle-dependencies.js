import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REGISTRY_PATH = path.join(__dirname, "../../", "registry/components");

export async function installDependencies(dependencies = [], isDev = false, targetDir = process.cwd()) {
    if (dependencies.length === 0) return;

    const installCommand = isDev
        ? `npm install -D ${dependencies.join(" ")}`
        : `npm install ${dependencies.join(" ")}`;

    console.log(`📦 Installing ${isDev ? "devDependencies" : "dependencies"}: ${dependencies.join(", ")}`);
    execSync(installCommand, { cwd: targetDir, stdio: "inherit" });
}

export async function installRegistryDependencies(registryDependencies = [], fileExtension, targetDir) {
    if (registryDependencies.length === 0) return;

    for (const dep of registryDependencies) {
        const depJsonPath = path.join(REGISTRY_PATH, `${dep}.${fileExtension}.json`);
        if (!fs.existsSync(depJsonPath)) {
            console.error(`❌ Registry dependency "${dep}" not found.`);
            continue;
        }

        console.log(`📚 Installing registry dependency: ${dep}`);
        const content = fs.readFileSync(depJsonPath, "utf-8");
        const json = JSON.parse(content);

        await installRegistryDependencies(json.registryDependencies || [], fileExtension, targetDir);
        await installDependencies(json.dependencies || [], false, targetDir);
        await installDependencies(json.devDependencies || [], true, targetDir);
    }
}

export async function handleAllDependencies(json, fileExtension = "js", targetDir = process.cwd()) {
    execSync("npm init -y", { cwd: targetDir })
    await installRegistryDependencies(json.registryDependencies || [], fileExtension, targetDir);
    await installDependencies(json.dependencies || [], false, targetDir);
    await installDependencies(json.devDependencies || [], true, targetDir);
}
