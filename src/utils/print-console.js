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

              npx backcraft-cli@latest init
              npx backcraft-cli@latest init --name=registry-name
              npx backcraft-cli@latest add registry-name
              npx backcraft-cli@latest list
              npx backcraft-cli@latest list app
              npx backcraft-cli@latest list components
              npx backcraft-cli@latest custom "path/to/file.json"
                  `);

}


export function printDefaultMessage() {

    console.log(`
           Commands, 🛠️

              npx backcraft-cli@latest init
              npx backcraft-cli@latest init --name=registry-name
              npx backcraft-cli@latest add registry-name
              npx backcraft-cli@latest list
              npx backcraft-cli@latest list app
              npx backcraft-cli@latest list components
              npx backcraft-cli@latest custom "path/to/file.json"
                  `);

}