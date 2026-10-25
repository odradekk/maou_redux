/**
 * Static data model for one EraElectron game.
 *
 * Reads a game's static data directory (`csv/`, `json/` or `yml/`) into an
 * in-memory model of its variable tables and character presets. Nothing here
 * writes to the game.
 *
 * The table inventory, file→table mapping, protected-name rules and per-format
 * parsing all come from the engine itself (`src/era/model/era-start.js` and
 * `src/era/static-file-utils.js`) and its wiki, `#9 静态数据文件`.
 *
 * @module dsh-ere-game-builder/lib/tables
 */

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';
import { decodeText, foldName, parseCsv, readCharaTable, readKeyValueTable, readVariableTable } from './csv.js';
import { canonicalCharaKey, canonicalGameBaseKey } from './name-mapping.js';
import { parseStructuredText } from './static-rows.js';

/**
 * Every table the engine knows, including its file and dimensionality.
 *
 * `file` is the `csv/` file base name that defines the table; `dimension` is 1
 * for `表名:变量` and 2 for `表名:角色ID:变量`; `trainOnly` marks tables that do
 * not exist until `era.beginTrain()` is called.
 *
 * `alternateFiles` lists further file names the engine parses into the same
 * table: `parseObject` handles `param` and `palam` in one branch and fills
 * `staticData.juel` for either, so a project that names the file `Palam.yml`
 * still defines `juel` — and `palam` / `delta` / `gotjuel` stay two-dimensional.
 */
export const TABLE_DEFS = {
  flag: { file: 'flag', dimension: 1 },
  tflag: { file: 'tflag', dimension: 1, trainOnly: true },
  global: { file: 'global', dimension: 1, builtinFile: true },
  love: { dimension: 1, builtin: true },
  item: { file: 'item', dimension: 1, columns: 3 },
  base: { file: 'base', dimension: 2 },
  maxbase: { file: 'base', dimension: 2, virtual: true },
  deltabase: { file: 'base', dimension: 2, virtual: true, trainOnly: true },
  abl: { file: 'abl', dimension: 2 },
  talent: { file: 'talent', dimension: 2 },
  cflag: { file: 'cflag', dimension: 2 },
  cstr: { file: 'cstr', dimension: 2 },
  equip: { file: 'equip', dimension: 2 },
  mark: { file: 'mark', dimension: 2 },
  exp: { file: 'exp', dimension: 2 },
  juel: { file: 'param', alternateFiles: ['palam'], dimension: 2 },
  palam: { file: 'param', dimension: 2, trainOnly: true },
  delta: { file: 'param', dimension: 2, virtual: true, trainOnly: true },
  gotjuel: { file: 'param', dimension: 2, virtual: true, trainOnly: true },
  source: { file: 'source', dimension: 2, trainOnly: true },
  stain: { file: 'stain', dimension: 2, trainOnly: true },
  ex: { file: 'ex', dimension: 2, trainOnly: true },
  nowex: { file: 'ex', dimension: 2, virtual: true, trainOnly: true },
  tequip: { file: 'tequip', dimension: 2, trainOnly: true },
  tcvar: { file: 'tcvar', dimension: 2, trainOnly: true },
  callname: { dimension: 2, builtin: true },
  relation: { dimension: 2, builtin: true },
};

/** File base names that belong to an existing table and must not declare a new one. */
export const PROTECTED_FILE_NAMES = new Set([
  'maxbase',
  'deltabase',
  'juel',
  'jewel',
  'delta',
  'gotjuel',
  'gotjewel',
  'nowex',
  'no',
  'static',
  'callname',
  'love',
  'relation',
  'code',
  'version',
  'res',
]);

/** File base names the engine still accepts but warns about. */
export const DEPRECATED_FILE_NAMES = new Set(['variablesize', 'str', 'strname', 'globals', 'train']);

/** Every canonical table name. */
export const KNOWN_TABLES = new Set(Object.keys(TABLE_DEFS));

/**
 * Canonicalise a table name the way the engine does.
 *
 * `param*` is an alias of `palam*`, and any name ending in `jewel` aliases the
 * matching `juel` name.
 *
 * @param {string} name - a table name from a data path.
 * @returns {string} the canonical table name.
 */
export function canonicalTable(name) {
  const folded = foldName(name);
  if (folded === 'param') return 'palam';
  if (folded.endsWith('jewel')) return `${folded.slice(0, -'jewel'.length)}juel`;
  return folded;
}

/**
 * Resolve a file base name to the variable table it defines.
 *
 * @param {string} baseName - file name without its extension.
 * @returns {{ table?: string, custom: boolean, skipped?: 'protected' | 'deprecated' | 'metadata' }} resolution.
 */
export function classifyFile(baseName) {
  const folded = foldName(baseName);
  if (folded === 'gamebase' || folded === '_replace' || folded === '_config' || folded === '_fixed') {
    return { custom: false, skipped: 'metadata' };
  }
  if (folded.startsWith('chara')) return { custom: false, skipped: 'metadata' };
  if (PROTECTED_FILE_NAMES.has(folded)) return { custom: false, skipped: 'protected' };
  if (DEPRECATED_FILE_NAMES.has(folded)) return { custom: false, skipped: 'deprecated' };
  for (const [table, definition] of Object.entries(TABLE_DEFS)) {
    if (definition.virtual === true) continue;
    if (definition.file === folded || definition.alternateFiles?.includes(folded) === true) {
      return { table, custom: false };
    }
  }
  if (/^(.*?)(names|keys|values|entries)$/.test(folded)) return { custom: false, skipped: 'protected' };
  return { table: folded, custom: true };
}

/**
 * The table name the engine passes to `parseObject`.
 *
 * Character files are parsed as `chara` (not `chara0000`) and the two
 * metadata files by their canonical names; everything else keeps its own base
 * name, which is what tells a one-dimensional table from a character preset.
 *
 * Accepts either a file name (`Flag.yml`) or a bare base name (`Flag`).
 *
 * @param {string} name - the file name or base name.
 * @returns {string} the engine table name.
 */
export function engineTableName(name) {
  const extension = extname(name);
  const base = extension === '' ? name : name.slice(0, -extension.length);
  const folded = foldName(base);
  if (folded === 'gamebase') return 'gamebase';
  if (folded === '_replace') return '_replace';
  if (folded === '_rename') return '_rename';
  if (folded.startsWith('chara')) return 'chara';
  return folded;
}

/**
 * List a directory's entries, tolerating a missing directory.
 *
 * @param {string} directory - absolute directory path.
 * @returns {Array<{ name: string, path: string, isDirectory: boolean }>} entries.
 */
function listDirectory(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).map((entry) => ({
    name: entry.name,
    path: join(directory, entry.name),
    isDirectory: entry.isDirectory(),
  }));
}

/**
 * Read one static data file into decoded text plus byte-level diagnostics.
 *
 * @param {string} path - absolute file path.
 * @param {string} relative - path relative to the game root, for messages.
 * @returns {{ relative: string, encoding: string, hasBom: boolean, lineEnding: string, text: string, issues: Array<{ line: number, message: string }> }} decoded file.
 */
export function readStaticFile(path, relative) {
  const bytes = new Uint8Array(readFileSync(path));
  const decoded = decodeText(bytes);
  const issues = [];
  if (decoded.error !== undefined) issues.push({ line: 0, message: decoded.error });
  if (decoded.lineEnding === 'crlf') {
    issues.push({ line: 0, message: 'CRLF 换行：引擎可以读取，但官方例程统一使用 LF' });
  }
  if (decoded.lineEnding === 'mixed') {
    issues.push({ line: 0, message: '同一个文件里混用了 LF 与 CRLF 换行' });
  }
  return {
    relative,
    encoding: decoded.encoding,
    hasBom: decoded.hasBom,
    lineEnding: decoded.lineEnding,
    text: decoded.text,
    issues,
  };
}

/**
 * Read the game's `system.extendedCharaTables` setting.
 *
 * Preference order matches the engine's config resolution:
 * `_fixed.json` > `ere.config.json` > `_config.json` > engine default.
 *
 * @param {string} gameRoot - absolute game folder.
 * @param {string} staticDirectory - absolute static data directory.
 * @returns {string[]} folded table names treated as character tables.
 */
export function readExtendedCharaTables(gameRoot, staticDirectory) {
  const candidates = [
    join(staticDirectory, '_fixed.json'),
    join(gameRoot, 'ere.config.json'),
    join(staticDirectory, '_config.json'),
  ];
  const tables = new Set();
  for (const candidate of candidates) {
    if (!existsSync(candidate) || !statSync(candidate).isFile()) continue;
    try {
      const parsed = JSON.parse(readFileSync(candidate, 'utf8'));
      const list = parsed?.system?.extendedCharaTables;
      if (Array.isArray(list)) for (const name of list) if (typeof name === 'string') tables.add(foldName(name));
    } catch {
      // A malformed config file is reported by the checker, not here.
    }
  }
  return [...tables];
}

/**
 * Build the static data model of a game's `csv/` directory.
 *
 * @param {string} staticDirectory - absolute path of the game's `csv/`, `json/` or `yml/` directory.
 * @param {{ gameRoot?: string, extendedCharaTables?: string[], format?: 'csv' | 'json' | 'yml' }} [options] - extra context.
 * @returns {ReturnType<typeof emptyModel>} the model.
 */
export function readStaticData(staticDirectory, options = {}) {
  const format = options.format ?? 'csv';
  const extension = `.${format}`;
  const model = emptyModel();
  if (!existsSync(staticDirectory) || !statSync(staticDirectory).isDirectory()) return model;
  model.exists = true;

  const extended = new Set(options.extendedCharaTables ?? []);
  if (options.gameRoot !== undefined) {
    for (const name of readExtendedCharaTables(options.gameRoot, staticDirectory)) extended.add(name);
  }

  /** @type {Array<{ name: string, path: string }>} */
  const queue = [];
  const top = listDirectory(staticDirectory);
  for (const entry of top) {
    if (entry.isDirectory) {
      for (const nested of listDirectory(entry.path)) {
        if (!nested.isDirectory) queue.push({ name: nested.name, path: nested.path });
      }
    } else {
      // The engine only reads variable tables from the static data root itself.
      queue.push({ name: entry.name, path: entry.path });
    }
  }

  const declaredByFile = new Map();
  for (const entry of queue) {
    // The engine walks every subdirectory but only reads files whose extension
    // matches the active format, skipping `_config*` / `_fixed*` (era-start.js).
    if (extname(entry.name).toLowerCase() !== extension) continue;
    if (entry.name.startsWith('_config') || entry.name.startsWith('_fixed')) continue;
    const relative = entry.path.slice(staticDirectory.length + 1);
    const baseName = entry.name.slice(0, -extname(entry.name).length);
    const classification = classifyFile(baseName);
    const file = readStaticFile(entry.path, relative);
    for (const issue of file.issues) model.issues.push({ file: relative, line: issue.line, message: issue.message });
    const parsed =
      format === 'csv' ? parseCsv(file.text) : parseStructuredText(file.text, format, engineTableName(baseName));
    const parseFailed = parsed.failed === true;
    const readable = file.encoding === 'utf-8' || file.encoding === 'utf-8-bom';

    model.files.push({
      relative,
      encoding: file.encoding,
      hasBom: file.hasBom,
      lineEnding: file.lineEnding,
      rows: parsed.rows.length,
      comments: parsed.comments,
      table: classification.table,
      custom: classification.custom,
    });

    if (classification.skipped === 'protected') {
      model.issues.push({
        file: relative,
        line: 0,
        message: `表名 "${baseName}" 是引擎保留的表名，该文件会被跳过（引擎会输出警告）`,
      });
      continue;
    }
    if (classification.skipped === 'deprecated') {
      model.issues.push({ file: relative, line: 0, message: `表名 "${baseName}" 已被引擎弃用，该文件会被跳过` });
      continue;
    }
    if (classification.skipped === 'metadata') {
      if (foldName(baseName) === 'gamebase') {
        const { pairs, issues } = readKeyValueTable(parsed);
        for (const issue of issues) model.issues.push({ file: relative, line: issue.line, message: issue.message });
        const byName = {};
        for (const pair of pairs) {
          const key = canonicalGameBaseKey(pair.key, foldName);
          if (key === undefined) {
            model.issues.push({
              file: relative,
              line: pair.line,
              message: `GameBase 里的「${pair.key}」不是引擎认识的字段`,
            });
            continue;
          }
          byName[key] = pair.value;
        }
        model.gameBase = { file: relative, pairs, byName };
      }
      if (foldName(baseName).startsWith('chara')) {
        const { records, issues } = readCharaTable(parsed);
        for (const issue of issues) model.issues.push({ file: relative, line: issue.line, message: issue.message });
        // `默认称呼,她` is a scalar callname, while `称呼,1,同学` is a per-character
        // pair; the engine reaches both through the same canonical key, so the
        // column count is what tells them apart.
        const scalars = new Map();
        const pairs = new Map();
        for (const record of records) {
          const key = canonicalCharaKey(record.key, foldName);
          if (key === undefined) {
            model.issues.push({
              file: relative,
              line: record.line,
              message: `角色数据表里的第一列 ${JSON.stringify(record.key)} 不是引擎认识的字段`,
            });
            continue;
          }
          if (record.values.length >= 2) {
            const list = pairs.get(key) ?? [];
            list.push({ line: record.line, target: record.values[0], value: record.values[1] });
            pairs.set(key, list);
            continue;
          }
          scalars.set(key, record.values[0] ?? '');
        }
        const idText = scalars.get('id');
        const id = typeof idText === 'string' && /^-?\d+$/.test(idText) ? Number(idText) : undefined;
        model.chara.push({
          file: relative,
          // `null` rather than `undefined`: the checker's result is serialised
          // as JSON, and a missing field must not break the whole report.
          id: id ?? null,
          name: scalars.get('name') ?? null,
          callname: scalars.get('callname') ?? null,
          ...(parseFailed ? { parseFailed: true } : {}),
          records,
          scalars,
          pairs,
        });
      }
      continue;
    }
    if (!readable) continue;

    const table = classification.table;
    const dimension = classification.custom ? (extended.has(table) ? 2 : 1) : TABLE_DEFS[table].dimension;
    if (declaredByFile.has(table)) {
      model.issues.push({
        file: relative,
        line: 0,
        message: `表 "${table}" 已经由 ${declaredByFile.get(table)} 定义，本文件不会被读取`,
      });
      continue;
    }
    declaredByFile.set(table, relative);

    const { entries, issues } = readVariableTable(parsed);
    for (const issue of issues) model.issues.push({ file: relative, line: issue.line, message: issue.message });
    const byName = {};
    const byId = {};
    const seenName = new Map();
    const seenId = new Map();
    for (const item of entries) {
      if (item.id !== undefined) {
        if (seenId.has(item.id)) {
          model.issues.push({
            file: relative,
            line: item.line,
            message: `变量序号 ${item.id} 重复（第 ${seenId.get(item.id)} 行已经用过）`,
          });
        } else {
          seenId.set(item.id, item.line);
        }
        byId[String(item.id)] = item.name;
      }
      if (item.name !== '') {
        if (seenName.has(item.name)) {
          model.issues.push({
            file: relative,
            line: item.line,
            message: `变量名 ${JSON.stringify(item.name)} 重复（第 ${seenName.get(item.name)} 行已经用过）`,
          });
        } else {
          seenName.set(item.name, item.line);
        }
        byName[item.name] = item.id;
      }
    }
    model.variables[table] = {
      table,
      file: relative,
      dimension,
      custom: classification.custom,
      columns: classification.custom ? undefined : TABLE_DEFS[table].columns,
      ...(parseFailed ? { parseFailed: true } : {}),
      entries,
      byName,
      byId,
    };
  }

  // Tables the engine synthesises from a file another table already declared:
  // Base.csv backs base, maxbase, and deltabase; Param.csv backs juel, palam,
  // delta, and gotjuel; Ex.csv backs ex and nowex.
  const primaryByFile = new Map();
  for (const [table, definition] of Object.entries(TABLE_DEFS)) {
    if (definition.file === undefined || definition.virtual === true) continue;
    // First non-virtual table wins, so Param.csv maps to juel (not palam) and
    // Ex.csv maps to ex (not nowex).
    if (!primaryByFile.has(definition.file)) primaryByFile.set(definition.file, table);
  }
  for (const [table, definition] of Object.entries(TABLE_DEFS)) {
    if (model.variables[table] !== undefined || definition.file === undefined) continue;
    const source = model.variables[primaryByFile.get(definition.file)];
    if (source === undefined) continue;
    model.variables[table] = {
      ...source,
      table,
      dimension: definition.dimension,
      virtual: true,
      ...(definition.trainOnly === true ? { trainOnly: true } : {}),
    };
  }
  for (const declared of Object.values(model.variables)) {
    const definition = TABLE_DEFS[declared.table];
    if (definition !== undefined && definition.trainOnly === true) declared.trainOnly = true;
  }

  return model;
}

/** An empty model, so callers never have to null-check. */
function emptyModel() {
  return {
    exists: false,
    files: [],
    variables: {},
    chara: [],
    issues: [],
    gameBase: undefined,
  };
}
