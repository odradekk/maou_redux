/**
 * Readers for the non-CSV static data formats.
 *
 * The engine picks the format from the directory name (`yml/`, `json/` or
 * `csv/`), then parses every `<name>.<format>` file and converts the result to
 * row arrays through `parseObject` in `src/era/static-file-utils.js`:
 *
 *   - `gamebase` / `_replace` / `_rename`  → `[key, value]`
 *   - `chara`                              → `[key, subKey, subValue]` per
 *                                            nested entry, `[key, value]` for a
 *                                            scalar
 *   - every other table                    → `[id, key, price, name, type]`
 *
 * Mirroring that shape here means the CSV row readers (`readKeyValueTable`,
 * `readVariableTable`, `readCharaTable`) can be reused unchanged, so the model
 * a caller gets is identical whatever the on-disk format was.
 *
 * `yamljs` is the engine's own YAML parser, loaded lazily: if the dependency is
 * missing the reader reports it as a finding instead of failing to import.
 */
import { createRequire } from 'node:module';

import { foldName } from './csv.js';

const nodeRequire = createRequire(import.meta.url);

/** @type {{ parse: (text: string) => unknown } | undefined} */
let yamljs;
/** @type {string | undefined} */
let yamlUnavailable;

/** @returns {{ parse: (text: string) => unknown } | undefined} the parser, or undefined when missing. */
function loadYaml() {
  if (yamljs !== undefined || yamlUnavailable !== undefined) return yamljs;
  try {
    yamljs = nodeRequire('yamljs');
  } catch (error) {
    yamlUnavailable = `YAML 解析器 (yamljs) 不可用，yml 数据表未校验：${error.message}`;
  }
  return yamljs;
}

/**
 * Parse a structured static data file into the same record shape `parseCsv`
 * returns, so downstream readers do not care which format was on disk.
 *
 * @param {string} text - decoded file contents.
 * @param {'json' | 'yml'} format - the static data format.
 * @param {string} table - engine table name (`gamebase`, `chara`, `_replace`, or the file base name).
 * @returns {{ rows: Array<{ line: number, cells: string[], raw: string }>, comments: number, blankLines: number, issues: Array<{ line: number, message: string }>, failed?: boolean }} parsed records; `failed` marks a file whose contents could not be modelled at all, so callers must not draw conclusions from the missing entries.
 */
export function parseStructuredText(text, format, table) {
  if (format === 'json') {
    let root;
    try {
      root = JSON.parse(text);
    } catch (error) {
      return emptyRows([{ line: jsonErrorLine(error, text), message: `JSON 解析失败：${error.message}` }], true);
    }
    return rowsFromObject(root, table);
  }
  const document = parseYamlDocument(text);
  if (document.unavailable !== undefined) return emptyRows([{ line: 0, message: document.unavailable }], true);
  if (document.error !== undefined) {
    // yamljs reports `parsedLine`; the engine prints it verbatim, so do the same
    // rather than guessing at an offset.
    const line = typeof document.error.parsedLine === 'number' ? document.error.parsedLine : 0;
    return emptyRows([{ line, message: `YAML 解析失败：${document.error.message}` }], true);
  }
  return rowsFromObject(document.value, table);
}

/**
 * Parse a YAML document with the engine's own parser.
 *
 * Shared with the `.kojo` validator so both report what yamljs would report.
 *
 * @param {string} text - the document.
 * @returns {{ value?: unknown, error?: Error, unavailable?: string }} the outcome.
 */
export function parseYamlDocument(text) {
  const yaml = loadYaml();
  if (yaml === undefined) return { unavailable: yamlUnavailable ?? 'YAML 解析器不可用' };
  try {
    return { value: yaml.parse(text) };
  } catch (error) {
    return { error };
  }
}

/**
 * Convert a parsed JSON/YAML document into row records.
 *
 * @param {unknown} root - the parsed document.
 * @param {string} table - engine table name.
 * @returns {ReturnType<typeof emptyRows>} row records.
 */
export function rowsFromObject(root, table) {
  const rows = [];
  const issues = [];
  let failed = false;
  if (root === null || root === undefined) {
    // An empty file parses to null; the engine treats that as no data.
    return emptyRows([]);
  }
  if (typeof root !== 'object' || Array.isArray(root)) {
    return emptyRows([{ line: 0, message: '顶层必须是「键: 值」的映射，当前是标量或数组；引擎会当作没有数据' }], true);
  }
  const folded = foldName(table);
  for (const [key, value] of Object.entries(root)) {
    if (folded === 'gamebase' || folded === '_replace' || folded === '_rename') {
      rows.push(row([key, value]));
      continue;
    }
    if (folded.startsWith('chara')) {
      if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        for (const [subKey, subValue] of Object.entries(value)) rows.push(row([key, subKey, subValue]));
      } else {
        rows.push(row([key, value]));
      }
      continue;
    }
    if (value === null || typeof value !== 'object' || Array.isArray(value)) {
      issues.push({ line: 0, message: `「${key}」的值必须是对象（至少要有 id），引擎读取时会报错` });
      failed = true;
      continue;
    }
    if (value.id === undefined) {
      issues.push({ line: 0, message: `「${key}」缺少 id，引擎读取时会报错` });
      failed = true;
      continue;
    }
    rows.push(row([value.id, key, value.price, value.name, value.type]));
  }
  return { rows, comments: 0, blankLines: 0, issues, ...(failed ? { failed: true } : {}) };
}

/** @param {unknown[]} cells - raw cell values. @returns {{ line: number, cells: string[], raw: string }} a row record. */
function row(cells) {
  return { line: 0, cells: cells.map(cellText), raw: '' };
}

/** @param {unknown} value - a cell value. @returns {string} its textual form, matching CSV semantics. */
function cellText(value) {
  if (value === undefined || value === null) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return JSON.stringify(value);
}

/** @param {Array<{ line: number, message: string }>} issues - parse problems. @returns {ReturnType<typeof rowsFromObject>} an empty result. */
function emptyRows(issues, failed = false) {
  return { rows: [], comments: 0, blankLines: 0, issues, ...(failed ? { failed: true } : {}) };
}

/**
 * Best-effort line number for a `JSON.parse` failure.
 *
 * V8 includes `at position N` (and, on newer versions, `line L column C`) in the
 * message; fall back to line 0 so the finding simply omits the line.
 *
 * @param {Error} error - the thrown error.
 * @param {string} text - the source that failed to parse.
 * @returns {number} a 1-based line number, or 0 when unknown.
 */
function jsonErrorLine(error, text) {
  const explicit = /line (\d+)/.exec(error.message);
  if (explicit !== null) return Number(explicit[1]);
  const position = /position (\d+)/.exec(error.message);
  if (position === null) return 0;
  const offset = Number(position[1]);
  return text.slice(0, offset).split(/\r\n|\n|\r/).length;
}
