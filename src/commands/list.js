import { printRegistry } from "../utils/print-console.js";

export function listModules(type) {
    switch (type) {
        case "app":
            printRegistry("app");
            break;
        case "components":
            printRegistry("components");
            break;
        case "all":
            printRegistry();
            break;
        default:
            printRegistry();
            break;
    }
}
