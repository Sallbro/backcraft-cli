import fs from 'fs';
import path from 'path';
export function customModule(jsonPath) {
    if (!fs.existsSync(jsonPath)) {
        console.error(`❌ File not found: ${jsonPath}`);
        process.exit(1);
    }
    const moduleData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    if (!moduleData.files || !Array.isArray(moduleData.files)) {
        console.error(`❌ Invalid module structure.`);
        process.exit(1);
    }
    for (const file of moduleData.files) {
        const destPath = path.resolve(process.cwd(), file.path);
        const destDir = path.dirname(destPath);
        fs.mkdirSync(destDir, { recursive: true });
        fs.writeFileSync(destPath, file.content, 'utf-8');
        console.log(`✅ Created ${file.path}`);
    }
}
