#!/usr/bin/env node
import { addModule } from "./commands/add.js";
import { initProject } from './commands/init.js';
import { listModules } from './commands/list.js';
import { customModule } from './commands/custom.js';
import { printHelpCommands } from "./utils/print-console.js";
import { generateJson } from "./commands/generate.js";

const command = process.argv[2];
const arg = process.argv[3];
export async function main() {
  switch (command) {
    case 'init':
      if (arg) {
        if (arg.startsWith("--name=")) {
          const [key, value] = arg.substring(2).split("=");
          if (value) {
            await initProject(value);
            break;
          }
          await initProject("sample");
          break;
        } else {
          console.log("Invalid argument, it must be --name");
          break;
        }
      }
      await initProject("sample");
      break;
    case 'add':
      await addModule(arg);
      break;
    case 'list':
      if (arg) {
        if (arg == "app") {
          await listModules("app");
          break;
        }
        else if (arg == "components") {
          await listModules("components");
          break;
        } else {
          console.log(`
           Invalid argument, 🛠️
            
            Valid argument are:
              npx backcraft@latest list
              npx backcraft@latest list app
              npx backcraft@latest list components

                  `);
          break;
        }
      }
      await listModules("all");
      break;
    case 'custom':
      await customModule(arg);
      break;
    case 'generate':
    case 'g':
      if (arg) {
        if (arg == "json") {
          let type = "app";
          let name = "backcraft-generate";
          if (process.argv[4]) {
            const [key, value] = process.argv[4].substring(2).split("=");
            if(key == "type"){
              if(value == "app" || value == "component"){
                type = value;
              }
              else{
                console.log("Invalid argument, it must be --type=app or --type=component");
                break;
              }
            }
            if(key == "name"){
                name = value;
            }
          }
          if (process.argv[5]) {
            const [key, value] = process.argv[5].substring(2).split("=");
            if(key == "type"){
              if(value == "app" || value == "component"){
                type = value;
              }
              else{
                console.log("Invalid argument, it must be --type=app or --type=component");
                break;
              }
            }
            if(key == "name"){
                name = value;
            }
          }
          await generateJson(type, name);
          break;
        }
        else {
          console.log("Invalid argument, it must be json");
          break;
        }
      }
      else {
        console.log("Please provide an argument");
        break;
      }
    case '--help':
    case '-h':
    case 'help':
    case '-help':
      printHelpCommands();
      break;
    default:
      printHelpCommands();
  }
}
