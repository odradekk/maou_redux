/**
 * Static analysis of an ere game's JavaScript.
 *
 * Everything here is read-only. Three kinds of finding come out of it:
 *  - syntax errors, produced by compiling each file as a CommonJS script (which
 *    is exactly how the engine loads game code);
 *  - module resolution problems: `#/` paths that do not exist, and Node.js
 *    built-ins or third-party packages, which the engine refuses to load
 *    (`crypto` is the single allowed built-in);
 *  - API and data-path problems: `era.<name>` members the SDK does not declare,
 *    and `era.get/set/add` paths whose table or variable does not exist.
 *
 * @module dsh-ere-game-builder/lib/js-scan
 */

import { builtinModules } from 'node:module';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import vm from 'node:vm';

/**
 * List every file under a directory, sorted, relative to it.
 *
 * @param {string} root - absolute directory.
 * @param {(name: string) => boolean} [filter] - predicate on the relative path.
 * @returns {string[]} relative paths with `/` separators.
 */
export function listFilesUnder(root, filter) {
  const out = [];
  const walk = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const path = join(directory, entry.name);
      const rel = relative(root, path).split(sep).join('/');
      if (entry.isDirectory()) {
        if (entry.name === 'node_modules') continue;
        walk(path);
      } else if (filter === undefined || filter(rel)) {
        out.push(rel);
      }
    }
  };
  walk(root);
  return out;
}

/**
 * Replace comment text with spaces so offsets and line numbers stay valid while
 * string literals remain intact for later extraction.
 *
 * @param {string} source - JavaScript source.
 * @returns {string} source with comments blanked out.
 */
export function blankComments(source) {
  let out = '';
  let index = 0;
  while (index < source.length) {
    const char = source[index];
    const next = source[index + 1];
    if (char === '/' && next === '/') {
      const end = source.indexOf('\n', index);
      const stop = end === -1 ? source.length : end;
      out += ' '.repeat(stop - index);
      index = stop;
      continue;
    }
    if (char === '/' && next === '*') {
      const end = source.indexOf('*/', index + 2);
      const stop = end === -1 ? source.length : end + 2;
      out += source.slice(index, stop).replace(/[^\n]/g, ' ');
      index = stop;
      continue;
    }
    if (char === "'" || char === '"' || char === '`') {
      const quote = char;
      let stop = index + 1;
      while (stop < source.length) {
        if (source[stop] === '\\') {
          stop += 2;
          continue;
        }
        if (source[stop] === quote) {
          stop += 1;
          break;
        }
        stop += 1;
      }
      out += source.slice(index, stop);
      index = stop;
      continue;
    }
    out += char;
    index += 1;
  }
  return out;
}

/**
 * Compute the 1-based line number of an offset.
 *
 * @param {string} source - source text.
 * @param {number} offset - character offset.
 * @returns {number} the line number.
 */
export function lineAt(source, offset) {
  let line = 1;
  for (let index = 0; index < offset && index < source.length; index += 1) if (source[index] === '\n') line += 1;
  return line;
}

/**
 * Read the first argument of a call as a literal, when it is one.
 *
 * @param {string} source - comment-blanked source.
 * @param {number} openParen - offset of the `(` of the call.
 * @returns {{ kind: 'string' | 'template', text: string, offset: number } | undefined} the literal argument.
 */
function readFirstArgument(source, openParen) {
  let index = openParen + 1;
  while (index < source.length && /\s/.test(source[index])) index += 1;
  const quote = source[index];
  if (quote !== "'" && quote !== '"' && quote !== '`') return undefined;
  const start = index + 1;
  let text = '';
  index = start;
  while (index < source.length) {
    const char = source[index];
    if (char === '\\') {
      text += source.slice(index, index + 2);
      index += 2;
      continue;
    }
    if (char === quote) break;
    text += char;
    index += 1;
  }
  return { kind: quote === '`' ? 'template' : 'string', text, offset: start };
}

/**
 * Extract `require(...)` specifiers.
 *
 * @param {string} source - comment-blanked source.
 * @returns {Array<{ specifier: string, offset: number }>} requires in source order.
 */
export function extractRequires(source) {
  const out = [];
  const pattern = /\brequire\s*\(/g;
  let match;
  while ((match = pattern.exec(source)) !== null) {
    const literal = readFirstArgument(source, match.index + match[0].length - 1);
    if (literal === undefined) continue;
    out.push({ specifier: literal.text, offset: literal.offset });
  }
  return out;
}

/**
 * Extract `era.<member>` accesses.
 *
 * @param {string} source - comment-blanked source.
 * @returns {Array<{ member: string, offset: number, assigned: boolean }>} accesses in source order.
 */
export function extractEraMembers(source) {
  const out = [];
  const pattern = /\bera\s*\.\s*([A-Za-z_$][\w$]*)/g;
  let match;
  while ((match = pattern.exec(source)) !== null) {
    const after = source.slice(match.index + match[0].length);
    out.push({ member: match[1], offset: match.index, assigned: /^\s*=[^=]/.test(after) });
  }
  return out;
}

/**
 * Extract literal data paths passed to `era.get` / `era.set` / `era.add`.
 *
 * @param {string} source - comment-blanked source.
 * @returns {Array<{ api: string, kind: 'string' | 'template', text: string, offset: number }>} accesses in source order.
 */
export function extractDataPaths(source) {
  const out = [];
  const pattern = /\bera\s*\.\s*(get|set|add)\s*\(/g;
  let match;
  while ((match = pattern.exec(source)) !== null) {
    const literal = readFirstArgument(source, match.index + match[0].length - 1);
    if (literal === undefined) continue;
    out.push({ api: match[1], kind: literal.kind, text: literal.text, offset: literal.offset });
  }
  return out;
}

/**
 * Resolve one CommonJS specifier the way the engine's loader does.
 *
 * `#/` is the engine's alias for the game's `ere/` directory; the engine
 * appends `.js` and `/index.js` itself, and so does webpack through the
 * `resolve.alias` entry the scaffold writes.
 *
 * @param {string} specifier - the required string.
 * @param {string} ereDirectory - absolute path of the game's `ere/` directory.
 * @param {string} fromFile - absolute path of the requiring file.
 * @returns {string | undefined} the resolved file, or undefined.
 */
export function resolveSpecifier(specifier, ereDirectory, fromFile) {
  let base;
  if (specifier.startsWith('#/')) base = resolve(ereDirectory, specifier.slice(2));
  else if (specifier.startsWith('./') || specifier.startsWith('../')) base = resolve(dirname(fromFile), specifier);
  else return undefined;
  const candidates = [base, `${base}.js`, `${base}.json`, join(base, 'index.js')];
  return candidates.find((candidate) => existsSync(candidate) && statSync(candidate).isFile());
}

/**
 * Compile one file as a CommonJS script to find syntax errors.
 *
 * @param {string} source - file contents.
 * @param {string} filename - absolute path, used in the error message.
 * @returns {{ line: number, message: string } | undefined} the syntax error, if any.
 */
export function checkSyntax(source, filename) {
  const cleaned = source.charCodeAt(0) === 0xfeff ? source.slice(1) : source;
  try {
    // eslint-disable-next-line no-new
    new vm.Script(cleaned, { filename });
    return undefined;
  } catch (error) {
    const stack = String(error.stack ?? '');
    const line = Number(/<anonymous>:(\d+)/.exec(stack)?.[1] ?? error.lineNumber ?? 1);
    return {
      line: Number.isFinite(line) && line > 0 ? line : 1,
      message: String(error.message ?? error).replace(/\n[\s\S]*$/, ''),
    };
  }
}

/**
 * APIs whose grid objects are silently dropped when they lack `type`.
 *
 * `era-api-base.js` `inColRows` filters the elements of a `ColumnObject`'s
 * `columns`, and `era-api.js` `printMultiColumns` filters its top-level
 * argument. The filter is `type !== undefined` and nothing is logged, so the
 * element simply never appears.
 */
const GRID_OBJECT_APIS = new Map([
  ['printInColRows', 'columns'],
  ['replaceInColRows', 'columns'],
  ['printMultiColumns', 'top'],
]);

/**
 * Report grid objects that the engine would silently drop.
 *
 * Deliberately conservative: only object literals written directly in the call
 * are judged, and an object containing a spread is skipped, because its keys
 * cannot be known statically. Anything passed through a variable is ignored.
 *
 * @param {string} source - comment-blanked script source.
 * @returns {Array<{ line: number, message: string }>} one entry per untyped object.
 */
export function findUntypedGridObjects(source) {
  const findings = [];
  for (const [api, shape] of GRID_OBJECT_APIS) {
    const pattern = new RegExp(`\\.\\s*${api}\\s*\\(`, 'g');
    let match;
    while ((match = pattern.exec(source)) !== null) {
      const open = source.indexOf('(', match.index);
      const close = matchingBracket(source, open);
      if (close === -1) continue;
      const args = splitTopLevel(source.slice(open + 1, close), open + 1);
      const candidates = [];
      if (shape === 'top') {
        // printMultiColumns(objects, config): only the objects argument matters.
        if (args.length > 0) candidates.push(...elementsOf(args[0].text, args[0].offset));
      } else {
        for (const argument of args) {
          const trimmed = argument.text.trim();
          if (trimmed.startsWith('[')) candidates.push(...elementsOf(argument.text, argument.offset));
          else if (trimmed.startsWith('{')) candidates.push(...columnElements(argument.text, argument.offset));
        }
      }
      for (const candidate of candidates) {
        const text = candidate.text.trim();
        if (!text.startsWith('{')) continue;
        const inner = text.slice(1, text.lastIndexOf('}'));
        const parts = splitTopLevel(inner, candidate.offset + candidate.text.indexOf('{') + 1);
        if (parts.some((part) => part.text.trim().startsWith('...'))) continue;
        const typed = parts.some((part) => {
          const key = /^\s*(?:['"]([A-Za-z_$][\w$]*)['"]|([A-Za-z_$][\w$]*))\s*:/.exec(part.text);
          return key !== null && (key[1] ?? key[2]) === 'type';
        });
        if (!typed) {
          findings.push({
            line: lineAt(source, candidate.offset),
            message: `era.${api}(...) 里有一个网格对象没有 type，引擎会按 \`type !== undefined\` 静默丢弃它（不报错也不显示）。补上 type（'text' / 'button' / 'image' / 'image.whole' / 'progress' / 'divider'）`,
          });
        }
      }
    }
  }
  return findings;
}

/** @param {string} text - a `{ ... }` or `[ ... ]` literal. @param {number} offset - its offset in the source. @returns {Array<{ text: string, offset: number }>} top-level elements. */
function elementsOf(text, offset) {
  const open = text.indexOf('[');
  const close = text.lastIndexOf(']');
  if (open === -1 || close === -1 || close < open) return [];
  return splitTopLevel(text.slice(open + 1, close), offset + open + 1);
}

/** @param {string} text - a `ColumnObject` literal. @param {number} offset - its offset in the source. @returns {Array<{ text: string, offset: number }>} elements of its `columns` array. */
function columnElements(text, offset) {
  const inner = text.slice(1, text.lastIndexOf('}'));
  for (const part of splitTopLevel(inner, offset + 1)) {
    const key = /^\s*(?:['"]?columns['"]?)\s*:/.exec(part.text);
    if (key !== null) return elementsOf(part.text.slice(key[0].length), offset + part.offset + key[0].length);
  }
  return [];
}

/**
 * Index of the bracket that closes the one at `start`.
 *
 * @param {string} text - the source.
 * @param {number} start - offset of an opening bracket.
 * @returns {number} the matching closing offset, or -1.
 */
function matchingBracket(text, start) {
  const OPEN = '([{';
  const CLOSE = ')]}';
  const stack = [];
  for (let index = start; index < text.length; index += 1) {
    const character = text[index];
    if (character === '"' || character === "'" || character === '`') {
      index = skipString(text, index);
      continue;
    }
    if (OPEN.includes(character)) stack.push(CLOSE[OPEN.indexOf(character)]);
    else if (CLOSE.includes(character)) {
      if (stack.pop() !== character) return -1;
      if (stack.length === 0) return index;
    }
  }
  return -1;
}

/** @param {string} text - the source. @param {number} start - offset of a quote. @returns {number} offset of the closing quote. */
function skipString(text, start) {
  const quote = text[start];
  for (let index = start + 1; index < text.length; index += 1) {
    if (text[index] === '\\') {
      index += 1;
      continue;
    }
    if (text[index] === quote) return index;
  }
  return text.length - 1;
}

/**
 * Split on commas that sit at the top level of `text`.
 *
 * @param {string} text - the text to split.
 * @param {number} offset - offset of `text` within the source, for reporting.
 * @returns {Array<{ text: string, offset: number }>} the parts.
 */
function splitTopLevel(text, offset) {
  const parts = [];
  let depth = 0;
  let start = 0;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (character === '"' || character === "'" || character === '`') {
      index = skipString(text, index);
      continue;
    }
    if ('([{'.includes(character)) depth += 1;
    else if (')]}'.includes(character)) depth -= 1;
    else if (character === ',' && depth === 0) {
      parts.push({ text: text.slice(start, index), offset: offset + start });
      start = index + 1;
    }
  }
  parts.push({ text: text.slice(start), offset: offset + start });
  return parts;
}
