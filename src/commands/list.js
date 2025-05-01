import path from "path";
import { fileURLToPath } from "url";
import { printModule } from "../utils/print-module.js";

export function listModules(type) {
    // constant
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const APP_REGISTRY_PATH = path.resolve(__dirname, "../../registry/app");
    const COMPONENTS_REGISTRY_PATH = path.resolve(__dirname, "../../registry/components");
    
    switch (type) {
        case "app":
            console.log("App Available Modules:");
            printModule(APP_REGISTRY_PATH);
            break;
        case "components":
            console.log("components Available Modules:");
            printModule(COMPONENTS_REGISTRY_PATH);
            break;
        case "all":
            console.log("App Available Modules:");
            printModule(APP_REGISTRY_PATH);
            console.log("components Available Modules:");
            printModule(COMPONENTS_REGISTRY_PATH);
            break;
    }
}
