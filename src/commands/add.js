import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { handleAllDependencies } from "../utils/handle-dependencies.js";
import { projectConfig } from "../utils/project-config.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export async function addModule(name) {
    if (!name) {
        console.error("❌ Please specify a module to add.");
        process.exit(1);
    }
    try {
        const getProjectConfig = await projectConfig();
        console.log("getProjectConfig:", getProjectConfig);
        const fileExtension = getProjectConfig.programmingLanguage === "typescript" ? "ts" : "js";
        const registryPath = path.resolve(__dirname, "../../registry/components", `${name}.${fileExtension}.json`);
        console.log("registryPath:", registryPath);
        const registryData = JSON.parse(await fs.readFile(registryPath, "utf-8"));
        
        console.log(`📦 Adding module: ${registryData.name}...`);
        for (const file of registryData.files) {
            const destPath = path.resolve(process.cwd(), file.path);
            const dir = path.dirname(destPath);
            await fs.mkdir(dir, { recursive: true });
            await fs.writeFile(destPath, file.content);
            console.log(`✅ Created: ${file.path}`);
        }

        // handle dependencies
        await handleAllDependencies(registryData);
        console.log("🎉 Module added successfully!");
    }
    catch (err) {
        console.error("❌ Error adding module:", err);
    }
}
