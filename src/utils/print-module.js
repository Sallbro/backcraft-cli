import fs from "fs";
import path from "path";
export function printModule(REGISTRY_PATH,extension="js") {
    const files = fs
        .readdirSync(REGISTRY_PATH)
        .filter((file) => file.endsWith(`.${extension}.json`));
    files.forEach((file) => {
        const moduleData = JSON.parse(fs.readFileSync(path.join(REGISTRY_PATH, file), "utf-8"));
        console.log(`📦 ${moduleData.name} - ${moduleData.title}`);
    });
}