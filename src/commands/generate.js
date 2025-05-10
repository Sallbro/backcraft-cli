import fs from "fs";
import path from "path";

export async function generateJson(type, name) {
    // Function to read .backcraftignore and create a filtered .json
    const currentDir = process.cwd(); // Get current directory
    const gitignorePath = path.join(currentDir, '.backcraftignore');

    // Read the .gitignore file
    let ignoredPaths = [];
    if (fs.existsSync(gitignorePath)) {
        ignoredPaths = fs.readFileSync(gitignorePath, 'utf8')
            .split('\n')
            .map(line => line.trim())
            .filter(line => line && !line.startsWith('#')); // Remove comments and empty lines
    }

    // Add node_modules explicitly to ignored paths
    ignoredPaths.push('node_modules');
    ignoredPaths.push('.git');
    ignoredPaths.push(`${name}.json`);

    // Function to scan directory recursively
    function scanDirectory(dir) {
        let result = [];
        const items = fs.readdirSync(dir);

        items.forEach(item => {
            const fullPath = path.join(dir, item);
            const relativePath = path.relative(currentDir, fullPath);

            // Check if path is ignored
            if (ignoredPaths.some(ignoredPath => relativePath.includes(ignoredPath))) {
                return;
            }

            const stats = fs.statSync(fullPath);

            if (stats.isDirectory()) {
                result.push({
                    path: relativePath.replace(/\\/g, '/'),
                    type: 'directory',
                    content: scanDirectory(fullPath)
                });
            } else {
                result.push({
                    path: relativePath.replace(/\\/g, '/'),
                    type: 'file',
                    content: fs.readFileSync(fullPath, 'utf8')
                });
            }
        });

        return result;
    }

    // Get the directory structure
    const structure = scanDirectory(currentDir);

    // Create the final .json file path
    const jsonFilePath = path.join(currentDir, `${name}.json`);

    // Write the structure to a JSON file
    fs.writeFileSync(jsonFilePath, JSON.stringify(structure, null, 2));
    console.log(`Generated Json File has been saved to ${jsonFilePath}`);

}
