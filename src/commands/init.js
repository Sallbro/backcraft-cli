import { promises as promisfs } from "fs";
import fs from "fs";
import path from "path";
import { handleAllDependencies } from "../utils/handle-dependencies.js";
import prompts from "prompts";
import { listTemplates, getTemplate } from "backcraft-registry";

export async function initProject(name) {
    if (!name) {
        console.error("❌ Please provide a project name using --name flag.");
        process.exit(1);
    }

    // project config
    const response = await prompts([
        {
            type: "select",
            name: "programmingLanguage",
            message: "Choose your programming language",
            choices: [
                { title: "JavaScript", value: "javascript" },
                { title: "TypeScript", value: "typescript" },
            ],
        },
        {
            type: "text",
            name: "projectName",
            message: "Project name?",
            initial: "my-backend-app",
        },
    ]);
    response["framework"] = "express";
    response["createdAt"] = new Date().toISOString();

    // Save config
    fs.mkdirSync(`${response.projectName}`, { recursive: true });
    fs.writeFileSync(`${response.projectName}/backcraft.json`, JSON.stringify(response, null, 2));

    // get file extension
    const fileExtension = response.programmingLanguage === "typescript" ? "ts" : "js";

    try {
        //check registry exists
        const [fetchRegistry, errorFetchRegistry] = await getTemplate("app", name + "." + fileExtension + ".json");
        if (errorFetchRegistry) {
            console.log(errorFetchRegistry);
            return;
        }

        const registryData = JSON.parse(fetchRegistry);

        console.log(`📁 Initializing ${response.programmingLanguage} project: ${name}...`);

        // handle dependencies
        const targetDir = path.resolve(process.cwd(), response.projectName);
        console.log("targetDir:", targetDir);
        for (const file of registryData.files) {
            const destPath = path.resolve(targetDir, file.path);
            const dir = path.dirname(destPath);
            await promisfs.mkdir(dir, { recursive: true });
            await promisfs.writeFile(destPath, file.content);
            console.log(`✅ Created: ${file.path}`);
        }

        await handleAllDependencies(registryData, fileExtension, targetDir);

        console.log("🎉 Project initialized successfully!");
    } catch (err) {
        console.error("❌ Error initializing project:", err);
    }
}
