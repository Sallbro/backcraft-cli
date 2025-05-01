import fs from 'fs-extra';
import ejs from 'ejs';
import path from 'path';
export async function renderTemplate(templateDir, outputDir) {
    const files = await fs.readdir(templateDir);
    for (const file of files) {
        const templatePath = path.join(templateDir, file);
        const content = await fs.readFile(templatePath, 'utf-8');
        const rendered = ejs.render(content, {});
        const outputPath = path.join(outputDir, file.replace('.ejs', '.ts'));
        await fs.outputFile(outputPath, rendered);
    }
}
