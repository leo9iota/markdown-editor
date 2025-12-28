import fs from 'node:fs';
import path from 'node:path';

interface ProjectInfo {
    isSrcDir: boolean;
    componentsPath: string;
}

export function getProjectInfo(cwd: string = process.cwd()): ProjectInfo {
    // 1. Check for components.json (Shadcn/ui)
    const componentsJsonPath = path.join(cwd, 'components.json');
    if (fs.existsSync(componentsJsonPath)) {
        try {
            const config = JSON.parse(fs.readFileSync(componentsJsonPath, 'utf-8'));
            // Standard shadcn config has "aliases" -> "components" or "components" directly in older versions
            // But we specifically care about the resolved path.
            // Often it's easier to assume if components.json exists, we follow its structure if we could parse it fully.
            // For now, let's keep it simple: if components.json exists, assume they follow a standard structure.
            // But checking 'src' is generally reliable.
        } catch {
            // ignore
        }
    }

    // 2. Check for src directory
    const isSrcDir = fs.existsSync(path.join(cwd, 'src'));

    // 3. Determine default path
    // If src exists, standard is src/components
    // If no src, standard is components
    const componentsDir = isSrcDir ? 'src/components' : 'components';

    return {
        isSrcDir,
        componentsPath: componentsDir
    };
}
