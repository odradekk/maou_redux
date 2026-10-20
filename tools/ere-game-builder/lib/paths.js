/**
 * Shared asset/path helpers for the ERE Game Builder bundle.
 *
 * The bundle ships its knowledge base and templates under `assets/`; every tool
 * resolves them from this module so a packaged deployment can relocate the whole
 * directory with one `assetRoot` config value.
 *
 * @module dsh-ere-game-builder/lib/paths
 */

import { existsSync, statSync } from 'node:fs';
import { isAbsolute, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Absolute path of the bundled `assets/` directory. */
export const BUNDLED_ASSET_ROOT = fileURLToPath(new URL('../assets/', import.meta.url));

/**
 * Resolve the asset root, honouring an explicit absolute override.
 *
 * @param {string | undefined} configured - `assetRoot` config value, if any.
 * @returns {string} an existing absolute directory.
 */
export function resolveAssetRoot(configured) {
  const root = configured === undefined || configured === null || configured === ''
    ? BUNDLED_ASSET_ROOT
    : configured;
  if (!isAbsolute(root)) {
    throw new Error(`dsh-ere-game-builder: assetRoot must be an absolute directory, got ${root}`);
  }
  if (!existsSync(root) || !statSync(root).isDirectory()) {
    throw new Error(`dsh-ere-game-builder: assetRoot is not a directory: ${root}`);
  }
  return root;
}

/**
 * Resolve a path inside the asset root.
 *
 * @param {string} root - asset root from {@link resolveAssetRoot}.
 * @param {...string} segments - path segments below the root.
 * @returns {string} the joined absolute path.
 */
export function assetPath(root, ...segments) {
  return join(root, ...segments);
}

/**
 * Resolve a caller-supplied path against the session working directory.
 *
 * @param {string} path - absolute or relative path.
 * @param {string} cwd - session working directory.
 * @returns {string} an absolute path.
 */
export function resolveUserPath(path, cwd) {
  return isAbsolute(path) ? resolve(path) : resolve(cwd, path);
}
