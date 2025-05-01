import fs from "fs";
import path from "path";
import prompts from "prompts";
export async function projectConfig() {
    const configPath = path.join(process.cwd(), "backcraft.json");
    if (fs.existsSync(configPath)) {
        const raw = fs.readFileSync("backcraft.json", "utf-8");
        return JSON.parse(raw);
    }
    const response = await prompts([
        {
            type: "select",
            name: "programmingLanguage",
            message: "Choose your programming language",
            choices: [
                { title: "JavaScript", value: "javascript" },
                { title: "TypeScript", value: "typescript" },
            ],
        }
    ]);
    response["framework"]="express";
    response["createdAt"]=new Date().toISOString();
    // Save config
    fs.writeFileSync("backcraft.json", JSON.stringify(response, null, 2));
    return response;
}