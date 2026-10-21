/**
 * Detection of the engine's generated development kit.
 *
 * The kit lives in `ere/era-utils/` and is produced by the engine menu item
 * 【帮助】-【生成开发套件】, which needs a loaded game and a human to click it — an
 * agent cannot produce it. What this module does instead is *act on the kit when
 * it is there*:
 *
 *   - which tables it covers, so the checker can report that the project has one
 *   - which generated files no longer carry the `// GENERATED START` /
 *     `// GENERATED END` marker pair (`writeBeanFile` in
 *     `src/era/tools/generate-data-beans.js` replaces only what is between the
 *     markers, and overwrites the whole file when they are missing)
 *   - the exact file list, so findings that land inside generated code can be
 *     reported as "the kit is stale" instead of "this variable does not exist",
 *     which would invite hand-editing a file the engine owns
 *
 * @module dsh-ere-game-builder/lib/devkit
 */

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

/** Directory the engine writes the kit into, relative to `ere/`. */
export const DEVKIT_DIRECTORY = 'era-utils';

/** Markers the engine wraps generated content in. */
export const GENERATED_START = '// GENERATED START';
export const GENERATED_END = '// GENERATED END';

/** Root modules that are not table modules. */
const SPECIAL_MODULES = new Set(['chara', 'info']);

/**
 * Read the development kit, if the project has one.
 *
 * @param {string} ereDirectory - absolute path of the game's `ere/` directory.
 * @param {string} [ereEntry] - the on-disk name of that directory, for reporting.
 * @returns {{
 *   present: boolean,
 *   files: string[],
 *   tables: string[],
 *   missingMarkers: string[],
 * }} kit facts; `files` and `missingMarkers` are game-root-relative.
 */
export function readDevkit(ereDirectory, ereEntry = 'ere') {
  const directory = join(ereDirectory, DEVKIT_DIRECTORY);
  const result = { present: false, files: [], tables: [], missingMarkers: [] };
  if (!existsSync(directory) || !statSync(directory).isDirectory()) return result;
  result.present = true;

  const prefix = `${ereEntry}/${DEVKIT_DIRECTORY}`;
  const tables = new Set();
  const walk = (current, nested) => {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const absolute = join(current, entry.name);
      if (entry.isDirectory()) {
        walk(absolute, `${nested}/${entry.name}`);
        continue;
      }
      if (!entry.name.toLowerCase().endsWith('.js')) continue;
      const portable = `${prefix}/${relative(directory, absolute).split(sep).join('/')}`;
      result.files.push(portable);
      const table = tableFromModule(nested, entry.name);
      if (table !== undefined) tables.add(table);
      const text = readFileSync(absolute, 'utf8');
      if (!text.includes(GENERATED_START) || !text.includes(GENERATED_END)) {
        result.missingMarkers.push(portable);
      }
    }
  };
  walk(directory, '');
  result.files.sort();
  result.tables = [...tables].sort();
  result.missingMarkers.sort();
  return result;
}

/**
 * Best-effort table name for one generated module.
 *
 * Root modules are `era-<table>.js` (with `era-chara.js` / `era-info.js` being
 * the special ones), per-character tables are `chara/era-<table>.js`, and the
 * name maps are `names/era-<table>-names.js`.
 *
 * @param {string} nested - the subdirectory, with a leading slash or empty.
 * @param {string} fileName - the module's file name.
 * @returns {string | undefined} the table name, or undefined for a special module.
 */
function tableFromModule(nested, fileName) {
  const base = fileName.replace(/\.js$/i, '').toLowerCase();
  if (nested === '/names') {
    const match = /^era-(.+)-names$/.exec(base);
    return match === null ? undefined : match[1];
  }
  const match = /^era-(.+)$/.exec(base);
  if (match === null) return undefined;
  if (nested === '' && SPECIAL_MODULES.has(match[1])) return undefined;
  return match[1];
}
