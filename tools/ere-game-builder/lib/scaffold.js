/**
 * Project scaffolding for EraElectron games.
 *
 * Writes the bundled `assets/templates/minimal-game/` tree into a target
 * directory, substituting the game's identity into `{{TOKEN}}` placeholders and
 * copying the engine SDK into `ere/era-electron.js` (without it the game cannot
 * talk to the engine at all).
 *
 * @module dsh-ere-game-builder/lib/scaffold
 */

import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { assetPath } from './paths.js';

/** Files whose template name is prefixed with `dot-` but which are written with a leading dot. */
const DOT_PREFIX = 'dot-';

/**
 * Turn an arbitrary game title into a package-name-safe slug.
 *
 * @param {string} title - the game title.
 * @returns {string} a lower-case slug, or `ere-game` when nothing usable remains.
 */
export function slugify(title) {
  const slug = String(title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
  return slug.length === 0 ? 'ere-game' : slug;
}

/**
 * List files under a directory, sorted, relative to that directory.
 *
 * @param {string} root - absolute directory.
 * @returns {string[]} relative file paths using `/` separators.
 */
function listFiles(root) {
  const out = [];
  const walk = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) walk(path);
      else out.push(relative(root, path).split(sep).join('/'));
    }
  };
  walk(root);
  return out;
}

/**
 * Substitute `{{TOKEN}}` placeholders.
 *
 * @param {string} text - template text.
 * @param {Record<string, string>} tokens - token values.
 * @returns {string} the substituted text.
 */
export function substitute(text, tokens) {
  return text.replace(/\{\{([A-Z_]+)\}\}/g, (match, name) =>
    Object.prototype.hasOwnProperty.call(tokens, name) ? tokens[name] : match,
  );
}

/**
 * Fill in the identity tokens a template needs, deriving safe defaults.
 *
 * @param {Record<string, unknown>} input - raw scaffold options.
 * @returns {Record<string, string>} the complete token map.
 */
export function buildTokens(input) {
  const version = String(input.version ?? '0001');
  return {
    TITLE: String(input.title ?? '未命名 ere 游戏'),
    AUTHOR: String(input.author ?? '你'),
    INFO: String(input.info ?? '基于 EraElectron 的 ere 游戏'),
    YEAR: String(input.year ?? new Date().getFullYear()),
    GAME_CODE: String(input.gameCode ?? '100000'),
    VERSION: version,
    MIN_VERSION: String(input.minVersion ?? version),
    PACKAGE_NAME: String(input.packageName ?? slugify(String(input.title ?? 'ere-game'))),
  };
}

/**
 * Write a brand-new ere game project.
 *
 * @param {{
 *   assetRoot: string,
 *   targetDir: string,
 *   tokens: Record<string, string>,
 *   overwrite?: boolean,
 *   sdkPath?: string,
 *   maxFiles?: number,
 * }} request - scaffold request.
 * @returns {{ target: string, written: string[], skipped: string[], sdkSource: string, sdkVersion: string | undefined }} a report.
 */
export function scaffoldGame(request) {
  const target = resolve(request.targetDir);
  const templateRoot = assetPath(request.assetRoot, 'templates', 'minimal-game');
  if (!existsSync(templateRoot)) {
    throw new Error(`dsh-ere-game-builder: bundled template is missing at ${templateRoot}`);
  }
  if (existsSync(target)) {
    if (!statSync(target).isDirectory()) throw new Error(`cannot scaffold into ${target}: not a directory`);
    const existing = readdirSync(target);
    if (existing.length > 0 && request.overwrite !== true) {
      throw new Error(
        `cannot scaffold into ${target}: the directory is not empty (contains ${existing.slice(0, 5).join(', ')}${
          existing.length > 5 ? ', …' : ''
        }). Pass overwrite: true to write the template over it.`,
      );
    }
  }

  const files = listFiles(templateRoot);
  const maxFiles = request.maxFiles ?? 200;
  if (files.length > maxFiles) {
    throw new Error(`dsh-ere-game-builder: template has ${files.length} files, above the configured maxScaffoldFiles ${maxFiles}`);
  }

  const written = [];
  const skipped = [];
  for (const relativePath of files) {
    const source = join(templateRoot, relativePath);
    const segments = relativePath.split('/');
    const fileName = segments.pop();
    const outputName = fileName.startsWith(DOT_PREFIX) ? `.${fileName.slice(DOT_PREFIX.length)}` : fileName;
    const destination = resolve(target, ...segments, outputName);
    if (!destination.startsWith(`${target}${sep}`)) {
      throw new Error(`refusing to write outside the target directory: ${destination}`);
    }
    if (existsSync(destination) && request.overwrite !== true) {
      skipped.push(relative(target, destination).split(sep).join('/'));
      continue;
    }
    mkdirSync(dirname(destination), { recursive: true });
    const text = readFileSync(source, 'utf8');
    writeFileSync(destination, substitute(text, request.tokens));
    written.push(relative(target, destination).split(sep).join('/'));
  }

  const sdkDestination = resolve(target, 'ere', 'era-electron.js');
  if (!sdkDestination.startsWith(`${target}${sep}`)) throw new Error('refusing to write outside the target directory');
  const sdkSource = request.sdkPath === undefined ? assetPath(request.assetRoot, 'sdk', 'era-electron.js') : resolve(request.sdkPath);
  if (!existsSync(sdkSource) || !statSync(sdkSource).isFile()) {
    throw new Error(`cannot find an era-electron.js SDK to copy at ${sdkSource}`);
  }
  mkdirSync(dirname(sdkDestination), { recursive: true });
  const sdkText = readFileSync(sdkSource, 'utf8');
  if (!/const era = \{/.test(sdkText) || !/module\.exports = era;/.test(sdkText)) {
    throw new Error(`${sdkSource} does not look like the EraElectron SDK (missing "const era = {" or "module.exports = era;")`);
  }
  if (!(existsSync(sdkDestination) && request.overwrite !== true)) {
    copyFileSync(sdkSource, sdkDestination);
    written.push('ere/era-electron.js');
  } else {
    skipped.push('ere/era-electron.js');
  }

  return {
    target,
    written: written.sort(),
    skipped: skipped.sort(),
    sdkSource,
    sdkVersion: /version:\s*\{\s*sdk:\s*'([^']+)'/.exec(sdkText)?.[1],
  };
}
