/**
 * Validation of `era.get` / `era.set` / `era.add` variable paths.
 *
 * A path is `表名`, `表名:变量`, or `表名:角色ID:变量`. The engine lower-cases
 * every segment, aliases `param*` to `palam*` and `*jewel` to `*juel`, and
 * silently returns `undefined` for anything it cannot resolve — which is why a
 * misspelled variable is the most common way an LLM-authored ere game breaks
 * without an error message.
 *
 * Grammar reference: `src/era/model/apis/era-set.js` and the engine wiki,
 * `#9 静态数据文件` §"era.get 和 era.set".
 *
 * @module dsh-ere-game-builder/lib/data-path
 */

import { KNOWN_TABLES, TABLE_DEFS, canonicalTable } from './tables.js';

/** One-part keys that resolve to a metadata object rather than a variable. */
const METADATA_ONE_PART = new Set(['no', 'gameconfig', 'gamebase', 'version', 'chara']);

/** Two-part heads that take a character or slot id. */
const TWO_PART_HEADS = new Set(['callname', 'relation', 'chara', 'love']);

/** `item` sub-keys: `item:<name>`, `itemname:<name>`, `itemprice:<name>`, `itemsales:<name>`. */
const ITEM_HEADS = new Set(['item', 'itemname', 'itemprice', 'itemsales']);

/**
 * Compute the edit distance between two short strings, for suggestions.
 *
 * @param {string} left - first string.
 * @param {string} right - second string.
 * @returns {number} the Levenshtein distance.
 */
export function editDistance(left, right) {
  const rows = left.length + 1;
  const columns = right.length + 1;
  const table = Array.from({ length: rows }, (_, index) => [index, ...Array(columns - 1).fill(0)]);
  for (let column = 0; column < columns; column += 1) table[0][column] = column;
  for (let row = 1; row < rows; row += 1) {
    for (let column = 1; column < columns; column += 1) {
      const cost = left[row - 1] === right[column - 1] ? 0 : 1;
      table[row][column] = Math.min(
        table[row - 1][column] + 1,
        table[row][column - 1] + 1,
        table[row - 1][column - 1] + cost,
      );
    }
  }
  return table[rows - 1][columns - 1];
}

/**
 * Find the closest candidate for a mistyped name.
 *
 * @param {string} name - the unknown name.
 * @param {Iterable<string>} candidates - valid names.
 * @returns {string | undefined} the closest candidate, when close enough.
 */
export function closestName(name, candidates) {
  let best;
  let bestDistance = Number.POSITIVE_INFINITY;
  for (const candidate of candidates) {
    const distance = editDistance(String(name).toLowerCase(), String(candidate).toLowerCase());
    if (distance < bestDistance) {
      bestDistance = distance;
      best = candidate;
    }
  }
  // Allow at least two edits so a transposition in a short name still gets a
  // suggestion; the hint is advisory and never auto-applied.
  const limit = Math.max(2, Math.floor(String(name).length / 3));
  return best !== undefined && bestDistance <= limit ? best : undefined;
}

/**
 * Split a literal path into segments, marking interpolated ones as dynamic.
 *
 * @param {string} raw - the literal path text; a template body keeps its `${…}`.
 * @returns {{ segments: string[], dynamic: boolean[] }} segments and which are runtime values.
 */
export function splitPath(raw) {
  const trimmed = raw.trim();
  const segments = [];
  const dynamic = [];
  let current = '';
  let isDynamic = false;
  for (let index = 0; index < trimmed.length; index += 1) {
    const char = trimmed[index];
    if (char === '$' && trimmed[index + 1] === '{') {
      isDynamic = true;
      let depth = 0;
      while (index < trimmed.length) {
        if (trimmed[index] === '{') depth += 1;
        else if (trimmed[index] === '}') {
          depth -= 1;
          if (depth === 0) {
            index += 1;
            break;
          }
        }
        index += 1;
      }
      index -= 1;
      continue;
    }
    if (char === ':') {
      segments.push(current.trim());
      dynamic.push(isDynamic);
      current = '';
      isDynamic = false;
      continue;
    }
    current += char;
  }
  segments.push(current.trim());
  dynamic.push(isDynamic);
  return { segments, dynamic };
}

/**
 * Describe a table's shape in one short phrase, for diagnostics.
 *
 * @param {string} table - canonical table name.
 * @param {ReturnType<import('./tables.js').readStaticData>} model - the game model.
 * @returns {string} the phrase.
 */
function describeTable(table, model) {
  const declared = model.variables[table];
  const dimension = declared?.dimension ?? TABLE_DEFS[table]?.dimension ?? 1;
  const file = declared?.file;
  return `${table} 是${dimension === 2 ? '二维' : '一维'}表（${file ?? '引擎内置'}），格式为 ${
    dimension === 2 ? `${table}:角色ID:变量名` : `${table}:变量名`
  }`;
}

/**
 * Validate a variable name or index against a declared table.
 *
 * @param {Record<string, any>} declared - the model's entry for the table.
 * @param {string} segment - the variable name or numeric index.
 * @param {string} raw - the whole path, used in messages.
 * @returns {{ severity: string, message: string } | undefined} a finding, if any.
 */
function validateVariable(declared, segment, raw) {
  const byName = Object.fromEntries(Object.keys(declared.byName).map((name) => [name.toLowerCase(), declared.byName[name]]));
  if (/^-?\d+$/.test(segment)) {
    if (declared.byId[String(Number(segment))] === undefined) {
      return {
        severity: 'error',
        message: `${declared.file} 里没有序号为 ${segment} 的变量（可用序号：${Object.keys(declared.byId).join('、') || '无'}）`,
      };
    }
    return undefined;
  }
  if (byName[segment.toLowerCase()] === undefined) {
    const suggestion = closestName(segment, Object.keys(byName));
    return {
      severity: 'error',
      message: `${declared.file} 里没有变量 ${JSON.stringify(segment)}${suggestion === undefined ? '' : `，是否想写 ${JSON.stringify(suggestion)}`}（已声明：${Object.keys(byName).join('、') || '无'}）`,
    };
  }
  return undefined;
}

/**
 * Validate one data path against the game's declared tables.
 *
 * @param {string} raw - the literal path text.
 * @param {ReturnType<import('./tables.js').readStaticData>} model - the game's static data model.
 * @param {'string' | 'template'} kind - literal kind; templates may contain `${…}`.
 * @returns {{ severity: 'error' | 'warning' | 'info', message: string }[]} findings.
 */
export function validateDataPath(raw, model, kind) {
  const findings = [];
  const { segments, dynamic } = splitPath(raw);
  const head = segments[0];
  const dynamicFlags = segments.map((_, index) => (kind === 'template' ? dynamic[index] === true : false));
  const push = (severity, message) => findings.push({ severity, message });

  if (head === '') {
    push('error', `数据路径 ${JSON.stringify(raw)} 的表名为空`);
    return findings;
  }
  if (dynamicFlags[0]) return findings;

  const foldedHead = head.toLowerCase();
  const canonical = canonicalTable(foldedHead);
  const known = KNOWN_TABLES.has(canonical) || model.variables[canonical] !== undefined;
  const definition = TABLE_DEFS[canonical];
  const dimension = model.variables[canonical]?.dimension ?? definition?.dimension;

  // `static:<id>:<attr>` reads a preset scalar; `static<Table>:<id>:<var>` reads a
  // preset value inside one table. Both are three parts and read-only.
  const staticSuffix = /^static(.+)$/.exec(foldedHead);
  const staticTable = staticSuffix === null ? undefined : canonicalTable(staticSuffix[1]);
  const isStaticPath =
    foldedHead === 'static' ||
    (staticTable !== undefined && (KNOWN_TABLES.has(staticTable) || model.variables[staticTable] !== undefined));
  if (isStaticPath) {
    if (segments.length !== 3) {
      push(
        'error',
        `数据路径 ${JSON.stringify(raw)} 段数不对：static 的格式是 static:角色ID:name|callname|title，或 static表名:角色ID:变量`,
      );
    }
    return findings;
  }

  /** Report a train-only table once per path. */
  const noteTrainOnly = () => {
    const declared = model.variables[canonical];
    if (declared?.trainOnly === true || definition?.trainOnly === true) {
      push(
        'info',
        `${canonical} 是调教（调教系统）专用表：在 era.beginTrain() 之前读取会得到 undefined`,
      );
    }
  };

  switch (segments.length) {
    case 1: {
      if (METADATA_ONE_PART.has(foldedHead) || foldedHead === 'global') return findings;
      const plural = /^(.+?)(names|keys|values|entries)$/.exec(foldedHead);
      if (plural !== null && (KNOWN_TABLES.has(canonicalTable(plural[1])) || model.variables[canonicalTable(plural[1])] !== undefined)) {
        return findings;
      }
      if (known && dimension === 1) {
        noteTrainOnly();
        return findings;
      }
      if (known && dimension === 2) {
        push('error', `数据路径 ${JSON.stringify(raw)} 段数不对：${describeTable(canonical, model)}`);
        return findings;
      }
      const suggestion = closestName(foldedHead, [
        ...KNOWN_TABLES,
        ...METADATA_ONE_PART,
        ...Object.keys(model.variables),
      ]);
      push(
        'error',
        `未知的数据表 ${JSON.stringify(head)}${suggestion === undefined ? '' : `，是否想写 ${JSON.stringify(suggestion)}`}`,
      );
      return findings;
    }
    case 2: {
      if (TWO_PART_HEADS.has(foldedHead)) return findings;
      if (ITEM_HEADS.has(foldedHead)) {
        if (foldedHead === 'item' && dynamicFlags[1] === false && segments[1] === 'bought') return findings;
        const declared = model.variables.item;
        if (declared !== undefined && foldedHead !== 'itemsales' && dynamicFlags[1] === false) {
          const itemNames = declared.entries.map((entry) => entry.name).filter((name) => name !== '');
          if (!/^-?\d+$/.test(segments[1]) && !itemNames.some((name) => name.toLowerCase() === segments[1].toLowerCase()) && segments[1] !== 'bought') {
            const suggestion = closestName(segments[1], itemNames);
            push(
              'error',
              `${declared.file} 里没有道具 ${JSON.stringify(segments[1])}${suggestion === undefined ? '' : `，是否想写 ${JSON.stringify(suggestion)}`}（已声明：${itemNames.join('、') || '无'}）`,
            );
          }
        }
        return findings;
      }
      const nameForm = /^(.+?)name$/.exec(foldedHead);
      if (nameForm !== null && (KNOWN_TABLES.has(canonicalTable(nameForm[1])) || model.variables[canonicalTable(nameForm[1])] !== undefined)) {
        return findings;
      }
      if (foldedHead === 'global') {
        const declared = model.variables.global;
        if (declared !== undefined && dynamicFlags[1] === false && !/^-?\d+$/.test(segments[1])) {
          const finding = validateVariable(declared, segments[1], raw);
          if (finding !== undefined) push(finding.severity, finding.message);
        }
        return findings;
      }
      if (!known) {
        const suggestion = closestName(foldedHead, [...KNOWN_TABLES, ...Object.keys(model.variables)]);
        push(
          'error',
          `未知的数据表 ${JSON.stringify(head)}${suggestion === undefined ? '' : `，是否想写 ${JSON.stringify(suggestion)}`}`,
        );
        return findings;
      }
      if (dimension === 2) {
        push('error', `数据路径 ${JSON.stringify(raw)} 段数不对：${describeTable(canonical, model)}`);
        return findings;
      }
      noteTrainOnly();
      const declared = model.variables[canonical];
      if (declared !== undefined && dynamicFlags[1] === false) {
        const finding = validateVariable(declared, segments[1], raw);
        if (finding !== undefined) push(finding.severity, finding.message);
      }
      return findings;
    }
    case 3: {
      if (TWO_PART_HEADS.has(foldedHead)) return findings;
      if (foldedHead === 'global') return findings;
      if (!known) {
        const suggestion = closestName(foldedHead, [...KNOWN_TABLES, ...Object.keys(model.variables)]);
        push(
          'error',
          `未知的数据表 ${JSON.stringify(head)}${suggestion === undefined ? '' : `，是否想写 ${JSON.stringify(suggestion)}`}`,
        );
        return findings;
      }
      if (dimension === 1) {
        push('error', `数据路径 ${JSON.stringify(raw)} 段数不对：${describeTable(canonical, model)}`);
        return findings;
      }
      noteTrainOnly();
      const declared = model.variables[canonical];
      if (declared !== undefined && dynamicFlags[2] === false) {
        const finding = validateVariable(declared, segments[2], raw);
        if (finding !== undefined) push(finding.severity, finding.message);
      }
      return findings;
    }
    default: {
      push('error', `数据路径 ${JSON.stringify(raw)} 的段数不对：最长只有 表名:角色ID:变量名 三段`);
      return findings;
    }
  }
}
