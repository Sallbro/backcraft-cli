import { promises as promisfs } from "fs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { handleAllDependencies } from "../utils/handle-dependencies.js";
import { projectConfig } from "../utils/project-config.js";
import { checkModuleExist } from "../utils/check-module.js";
import prompts from "prompts";
import { printModule } from "../utils/print-module.js";
import { listTemplates, getTemplate } from "backcraft-registry";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
    fs.writeFileSync("backcraft.json", JSON.stringify(response, null, 2));

    // get file extension
    const fileExtension = response.programmingLanguage === "typescript" ? "ts" : "js";

    //check remote templates
    const templates = await listTemplates();
    console.log("templates", templates);
    const template = await getTemplate("app", name + "." + fileExtension + ".json");
    console.log("template:", template);

    // // check module exist
    // const projectDir = path.resolve(process.cwd(), "registry/app");
    // const check_module_exist = await checkModuleExist(name, projectDir, response.programmingLanguage === "typescript" ? "ts" : "js");
    // if (!check_module_exist) {
    //     printModule(projectDir, response.programmingLanguage === "typescript" ? "ts" : "js");
    //     process.exit(1);
    // }

    // console.log("check_module_exist:", check_module_exist);

    try {
        //check remote templates
        const [templatesList, templatesListError] = await listTemplates();
        if (templatesListError) {
            console.log("list ka err");
            console.log(templatesListError);
            return;
        }
        // console.log("templates", templates);
        const [fetchRegistry, errorFetchRegistry] = await getTemplate("app", name + "." + fileExtension + ".json");
        if (errorFetchRegistry) {
            console.log("template ka err");
            console.log(errorFetchRegistry);
            return;
        }
        console.log("sahi chal araha hai");
        // console.log("template:", template);

        // const registryPath = path.resolve(__dirname, "../../registry/app", `${name}.${fileExtension}.json`);

        // const registryData = JSON.parse(await promisfs.readFile(registryPath, "utf-8"));

        // const registryData = JSON.parse(await promisfs.readFile(template, "utf-8"));
        const registryData = JSON.parse(fetchRegistry);
console.log("registryData2:", registryData);

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
