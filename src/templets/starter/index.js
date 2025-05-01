import fs from "fs";
import path from "path";
import javascriptSampleTemplets from "./javascript/sample.js";
import typescriptSampleTemplets from "./typescript/sample.js";
import typescriptBlogTemplets from "./typescript/blog.js";
import javascriptBlogTemplets from "./javascript/blog.js";

export async function starter(response, name) {
    console.log("name is ", name);
    // constant 
    const projectDir = path.resolve(process.cwd(), "src/templets/starter"); // user current dir
    switch (response.programmingLanguage) {
        case "typescript":
            const typescriptFiles = fs
                .readdirSync(path.join(projectDir, "typescript"))
                .filter((file) => file.endsWith(".js"));

            // check templets exists
            if (typescriptFiles && !typescriptFiles.includes(name + ".js")) {
                console.log("Available Modules:\n");
                typescriptFiles.forEach((file) => {
                    console.log(`📦 :${file}`);
                });
            }

            switch (name) {
                case "sample":
                    await typescriptSampleTemplets();
                    break;
                case "blog":
                    await typescriptBlogTemplets();
                    break;
                default:
                    console.log("something went wrong...");
            }
            break;
        case "javascript":
            const javascriptFiles = fs
                .readdirSync(path.join(projectDir, "javascript"))
                .filter((file) => file.endsWith(".js"));

            // check templets exists
            if (javascriptFiles && !javascriptFiles.includes(name + ".js")) {
                console.log("Available Modules:\n");
                javascriptFiles.forEach((file) => {
                    console.log(`📦 :${file}`);
                });
            }

            switch (name) {
                case "sample":
                    await javascriptSampleTemplets();
                    break;
                case "blog":
                    await javascriptBlogTemplets();
                    break;
                default:
                    console.log("something went wrong...");
            }
            break;
        default:
            console.log("something went wrong...");
    }

}