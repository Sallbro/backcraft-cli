import fs from "fs";

export async function checkModuleExist(name, projectDir,extension="js") {
    const files = fs
        .readdirSync(projectDir)
        .filter((file) => file.endsWith(`.${extension}.json`));

    // check templets exists
    if (files && !files.includes(name + `.${extension}.json`)) {
        return false;
    }
    return true;
}