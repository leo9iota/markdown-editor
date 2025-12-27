import fs from 'node:fs';
import path from 'node:path';

export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

export function getPackageManager(cwd: string = process.cwd()): PackageManager {
    if (fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
    if (fs.existsSync(path.join(cwd, 'bun.lockb'))) return 'bun';
    if (fs.existsSync(path.join(cwd, 'yarn.lock'))) return 'yarn';
    return 'npm';
}

export function getInstallCommand(
    pm: PackageManager,
    packages: string[],
    dev: boolean = false
): string[] {
    if (pm === 'npm') return ['install', dev ? '-D' : '', ...packages].filter(Boolean);
    if (pm === 'yarn') return ['add', dev ? '-D' : '', ...packages].filter(Boolean);
    if (pm === 'pnpm') return ['add', dev ? '-D' : '', ...packages].filter(Boolean);
    if (pm === 'bun') return ['add', dev ? '-d' : '', ...packages].filter(Boolean);

    return ['install', ...packages];
}
