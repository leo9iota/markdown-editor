import fs from 'node:fs';
import path from 'node:path';

export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun' | 'deno';

export function getPackageManager(cwd: string = process.cwd()): PackageManager {
    const userAgent = process.env.npm_config_user_agent;
    if (userAgent) {
        if (userAgent.startsWith('pnpm')) return 'pnpm';
        if (userAgent.startsWith('yarn')) return 'yarn';
        if (userAgent.startsWith('bun')) return 'bun';
        if (userAgent.startsWith('npm')) return 'npm';
    }

    // Deno detection
    if (
        fs.existsSync(path.join(cwd, 'deno.json')) ||
        fs.existsSync(path.join(cwd, 'deno.jsonc')) ||
        fs.existsSync(path.join(cwd, 'deno.lock'))
    ) {
        return 'deno';
    }

    if (fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
    // Bun v1.2+ uses bun.lock, older uses bun.lockb
    if (fs.existsSync(path.join(cwd, 'bun.lockb')) || fs.existsSync(path.join(cwd, 'bun.lock')))
        return 'bun';
    if (fs.existsSync(path.join(cwd, 'yarn.lock'))) return 'yarn';
    if (fs.existsSync(path.join(cwd, 'package-lock.json'))) return 'npm';

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

    if (pm === 'deno') {
        // Deno uses `deno add npm:package`
        return ['add', dev ? '--dev' : '', ...packages.map(pkg => `npm:${pkg}`)].filter(Boolean);
    }

    return ['install', ...packages];
}
