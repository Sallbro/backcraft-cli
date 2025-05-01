import { promises as fs } from "fs";
import path from "path";
import { handleAllDependencies } from "../utils/handle-dependencies.js";
import { projectConfig } from "../utils/project-config.js";
import { getTemplate } from "backcraft-registry";

export async function addModule(name) {
    if (!name) {
        console.error("❌ Please specify a module to add.");
        process.exit(1);
    }
    try {
        const getProjectConfig = await projectConfig();
        const fileExtension = getProjectConfig.programmingLanguage === "typescript" ? "ts" : "js";
       
        //check registry exists
        const [fetchRegistry, errorFetchRegistry] = getTemplate("components", name + "." + fileExtension + ".json");
        if (errorFetchRegistry) {
            console.log(errorFetchRegistry);
            return;
        }
        const registryData = JSON.parse(fetchRegistry);

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
