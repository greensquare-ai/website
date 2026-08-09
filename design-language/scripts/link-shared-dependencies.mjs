import { existsSync, symlinkSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repositoryRoot = resolve(appRoot, '..');
const appNodeModules = resolve(appRoot, 'node_modules');
const repositoryNodeModules = resolve(repositoryRoot, 'node_modules');

// Vercel installs this sub-app in isolation, but the shared v3 source files
// inherit the repository-root tsconfig. Expose this app's dependencies at the
// repository root so that TypeScript can resolve the Astro preset there.
if (!existsSync(repositoryNodeModules)) {
  symlinkSync(appNodeModules, repositoryNodeModules, 'junction');
}
