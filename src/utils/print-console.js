import fs from "fs";
import path from "path";
import { listTemplates } from "backcraft-registry";

export function printRegistry(type = "") {

    let [registryList, registryListError] = listTemplates();
    if (registryListError) {
        console.log(registryListError);
        return;
    }

    if (!type) {
        for (const category in registryList) {
            console.log(`🟢 ${category} Module`);
            for (const folder in registryList[category]) {
                console.log(`  📦 ${folder}`);
                for (const file of registryList[category][folder]) {
                    console.log(`   - ${file}`);
                }
            }
        }
    }

    for (const folder in registryList[type]) {
        console.log(` 📦 ${folder}`);
        for (const file of registryList[type][folder]) {
            console.log(`  - ${file}`);
        }
    }

}

export function printHelpCommands() {

    console.log(`
           Commands, 🛠️

              npx backcraft@latest init
              npx backcraft@latest init --name=registry-name
              npx backcraft@latest add registry-name
              npx backcraft@latest list
              npx backcraft@latest list app
              npx backcraft@latest list components
              npx backcraft@latest custom "path/to/file.json"
                  `);

}