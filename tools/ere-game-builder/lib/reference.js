/**
 * The bundled EraElectron knowledge base.
 *
 * Three kinds of material live under `assets/reference/`:
 *  - `api-index.json`, machine-extracted from the engine SDK, is the authority
 *    for the game-facing API surface;
 *  - the Markdown digests are the engine's own documentation, reorganised;
 *  - `api-console.json` records the handful of console-only members so a checker
 *    can tell "not an API" apart from "not available to game code".
 *
 * @module dsh-ere-game-builder/lib/reference
 */

import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { assetPath } from './paths.js';

/** Markdown documents shipped with the bundle, with the label used in results. */
export const REFERENCE_DOCUMENTS = [
  { id: 'wiki', file: 'wiki-digest.md', title: 'EraElectron 引擎与开发指南摘要' },
  { id: 'api', file: 'api-digest.md', title: '引擎运行时 API 摘要' },
  { id: 'example', file: 'example-game.md', title: '官方例程（ere-example）结论与坑点' },
  { id: 'pitfalls', file: 'pitfalls.md', title: '常见错误与陷阱速查' },
  { id: 'i18n', file: 'i18n.md', title: '多语言（i18n）参考实现' },
];

/**
 * Read the API index once per asset root.
 *
 * @param {string} assetRoot - bundle asset root.
 * @returns {{
 *   sdkVersion: string | null,
 *   api: Record<string, any>,
 *   typedefs: Record<string, any>,
 *   runtime: Record<string, any>,
 *   console: Record<string, any>,
 * }} loaded index.
 */
export function loadApiIndex(assetRoot) {
  const index = JSON.parse(readFileSync(assetPath(assetRoot, 'reference', 'api-index.json'), 'utf8'));
  const extraFile = assetPath(assetRoot, 'reference', 'api-extra.json');
  const extra = existsSync(extraFile) ? JSON.parse(readFileSync(extraFile, 'utf8')) : {};
  return { ...index, runtime: extra.runtime ?? {}, console: extra.console ?? {} };
}

/**
 * Return the documentation entry for one `era.<member>`, wherever it is declared.
 *
 * @param {string} member - a member name such as `print` or `logger.debug`.
 * @param {ReturnType<typeof loadApiIndex>} index - loaded API index.
 * @returns {{ entry: Record<string, any>, origin: 'sdk' | 'runtime' } | undefined} the entry and where it lives.
 */
export function apiEntry(member, index) {
  const direct = index.api[member];
  if (direct !== undefined) return { entry: direct, origin: 'sdk' };
  const runtimeEntry = index.runtime[member];
  if (runtimeEntry !== undefined) return { entry: runtimeEntry, origin: 'runtime' };
  return undefined;
}

/**
 * Render one API member as a compact Markdown block.
 *
 * @param {string} name - member name, possibly dotted (`logger.debug`).
 * @param {ReturnType<typeof loadApiIndex>} index - loaded API index.
 * @returns {string} Markdown documentation, or an empty string when unknown.
 */
export function renderApiMember(name, index) {
  const found = apiEntry(name, index);
  if (found === undefined) return '';
  const member = found.entry;
  const lines = [`### \`era.${name}\``, ''];
  if (found.origin === 'runtime') lines.push('> 运行时注入：引擎在启动时挂到 SDK 对象上，SDK 文件里没有声明。', '');
  lines.push(`签名：\`${member.signature}\``);
  if (member.documented === false) lines.push('（SDK 未提供 JSDoc）');
  if (member.danger === true) lines.push('**DANGER：SDK 标注为危险 API，使用前确认目标变量类型。**');
  if (member.deprecated !== undefined) lines.push(`**已废弃：${member.deprecated}**`);
  if (member.description !== undefined && member.description !== '') lines.push('', member.description);
  const params = member.params ?? [];
  if (params.length > 0) {
    lines.push('', '| 参数 | 类型 | 必填 | 说明 |', '| --- | --- | --- | --- |');
    for (const param of params) {
      lines.push(
        `| \`${param.name}\` | \`${param.type || '—'}\` | ${param.required ? '是' : '否'} | ${String(param.description ?? '').replace(/\|/g, '\\|')} |`,
      );
    }
  }
  if (member.returns !== undefined) {
    lines.push('', `返回：\`${member.returns.type || '—'}\`${member.returns.description === '' ? '' : ` — ${member.returns.description}`}`);
  }
  const referenced = new Set();
  for (const param of params) {
    const base = String(param.type).replace(/[^A-Za-z0-9_$|]/g, ' ').trim();
    for (const token of base.split(/[\s|]+/)) if (index.typedefs[token] !== undefined) referenced.add(token);
  }
  for (const typeName of referenced) {
    const typedef = index.typedefs[typeName];
    lines.push('', `#### 类型 \`${typeName}\`${typedef.description === '' ? '' : ` — ${typedef.description}`}`);
    if (typedef.properties.length > 0) {
      lines.push('', '| 字段 | 类型 | 说明 |', '| --- | --- | --- |');
      for (const property of typedef.properties) {
        lines.push(`| \`${property.name}\` | \`${property.type || '—'}\` | ${String(property.description ?? '').replace(/\|/g, '\\|')} |`);
      }
    }
  }
  return lines.join('\n');
}

/**
 * Tokenise a query the way both the API index and the prose corpus are indexed.
 *
 * @param {string} value - raw query or text.
 * @returns {string[]} lower-cased word tokens.
 */
function tokenize(value) {
  return String(value)
    .toLowerCase()
    .split(/[^a-z0-9\u4e00-\u9fff_$.]+/)
    .filter((token) => token.length > 0);
}

/**
 * Score one candidate text against the query tokens.
 *
 * @param {string} haystack - lower-cased text.
 * @param {string[]} tokens - query tokens.
 * @returns {number} match score; zero means no match.
 */
function scoreText(haystack, tokens) {
  let score = 0;
  for (const token of tokens) if (haystack.includes(token)) score += 1;
  return score;
}

/** Lines of context kept around a match, and the ceiling for one snippet. */
const CONTEXT_BEFORE = 2;
const CONTEXT_AFTER = 3;
const MAX_SNIPPET_LINES = 10;
/** Two matches no further apart than this are reported as one snippet. */
const MERGE_DISTANCE = 3;
/** How many snippets one section may contribute, so a broad query stays varied. */
const MAX_HITS_PER_SECTION = 2;

/** @param {string} line - one source line. @returns {boolean} whether it is a table row. */
const isTableRow = (line) => /^\s*\|/.test(line ?? '');

/** @param {string} line - one source line. @returns {boolean} whether it is a table separator row. */
const isTableSeparator = (line) => /^\s*\|[\s:|-]+\|\s*$/.test(line ?? '');

/**
 * Find the header row of the table the given row belongs to.
 *
 * A table row quoted without its header is unreadable, so a hit inside a table
 * carries the header along.
 *
 * @param {string[]} lines - document lines.
 * @param {number} row - index of a table row.
 * @returns {number} index of the header row, or -1 when there is none above it.
 */
function tableHeaderIndex(lines, row) {
  let index = row;
  while (index >= 0 && isTableRow(lines[index])) {
    if (isTableSeparator(lines[index + 1])) return index;
    index -= 1;
  }
  return -1;
}

/**
 * Build the snippet shown for one hit.
 *
 * @param {string[]} lines - document lines.
 * @param {number} first - first matched line index.
 * @param {number} last - last matched line index.
 * @returns {string[]} the snippet, header included when the match is a table row.
 */
function buildSnippet(lines, first, last) {
  const lo = Math.max(0, first - CONTEXT_BEFORE);
  let hi = Math.min(lines.length - 1, last + CONTEXT_AFTER, lo + MAX_SNIPPET_LINES - 1);
  // A snippet that stops on a table header is as unhelpful as one that starts on a
  // bare row, so keep at least one row next to the header.
  if (isTableRow(lines[hi]) && (isTableSeparator(lines[hi]) || isTableSeparator(lines[hi + 1]))) {
    let next = hi + 1;
    while (next < lines.length && isTableRow(lines[next])) next += 1;
    hi = Math.min(next - 1, hi + 2);
  }
  const snippet = [];
  const header = isTableRow(lines[first]) ? tableHeaderIndex(lines, first) : -1;
  if (header !== -1 && header < lo) {
    snippet.push(lines[header]);
    if (isTableSeparator(lines[header + 1])) snippet.push(lines[header + 1]);
    if (lo > header + 2) snippet.push('…');
  }
  snippet.push(...lines.slice(lo, hi + 1));
  while (snippet.length > 0 && snippet[0].trim() === '') snippet.shift();
  while (snippet.length > 0 && snippet.at(-1).trim() === '') snippet.pop();
  return snippet;
}

/**
 * Search the API index, the typedefs, and the Markdown corpus.
 *
 * @param {string} assetRoot - bundle asset root.
 * @param {string} query - natural-language or identifier query.
 * @param {{ limit?: number, docs?: string[] }} [options] - result cap and document filter.
 * @returns {Array<Record<string, unknown>>} ranked hits.
 */
export function searchReference(assetRoot, query, options = {}) {
  const limit = options.limit ?? 20;
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];
  const lower = String(query).toLowerCase();
  const index = loadApiIndex(assetRoot);
  const hits = [];

  for (const [name, member] of Object.entries({ ...index.api, ...index.runtime })) {
    const haystack = `${name} ${member.signature} ${member.description} ${(member.params ?? [])
      .map((param) => `${param.name} ${param.description}`)
      .join(' ')}`.toLowerCase();
    let score = scoreText(haystack, tokens);
    if (score === 0) continue;
    if (name.toLowerCase() === lower) score += 100;
    else if (name.toLowerCase().includes(lower)) score += 30;
    hits.push({
      kind: 'api',
      id: `era.${name}`,
      score,
      title: `era.${name} — ${String(member.description ?? member.signature).split('\n')[0]}`,
      detail: renderApiMember(name, index),
    });
  }

  for (const [name, typedef] of Object.entries(index.typedefs)) {
    const haystack = `${name} ${typedef.description} ${typedef.properties
      .map((property) => `${property.name} ${property.description}`)
      .join(' ')}`.toLowerCase();
    const score = scoreText(haystack, tokens);
    if (score === 0) continue;
    hits.push({
      kind: 'type',
      id: name,
      score: score + (name.toLowerCase() === lower ? 60 : 0),
      title: `类型 ${name}${typedef.description === '' ? '' : ` — ${typedef.description}`}`,
      detail: [
        `### 类型 \`${name}\``,
        '',
        typedef.description,
        '',
        '| 字段 | 类型 | 说明 |',
        '| --- | --- | --- |',
        ...typedef.properties.map(
          (property) => `| \`${property.name}\` | \`${property.type || '—'}\` | ${property.description.replace(/\|/g, '\\|')} |`,
        ),
      ].join('\n'),
    });
  }

  // A signature-table row for an API that already has its own (fuller) hit adds nothing.
  const claimedApis = new Set(
    hits.filter((hit) => hit.kind === 'api').map((hit) => String(hit.id).slice('era.'.length)),
  );

  for (const document of REFERENCE_DOCUMENTS) {
    if (options.docs !== undefined && !options.docs.includes(document.id)) continue;
    const path = assetPath(assetRoot, 'reference', document.file);
    if (!existsSync(path)) continue;
    const lines = readFileSync(path, 'utf8').split('\n');
    const matches = [];
    let heading = document.title;
    for (let lineNumber = 0; lineNumber < lines.length; lineNumber += 1) {
      const line = lines[lineNumber];
      if (/^#{1,6}\s/.test(line)) heading = line.replace(/^#+\s*/, '').trim();
      const score = scoreText(line.toLowerCase(), tokens);
      if (score === 0) continue;
      const signature = /^\s*\|\s*`era\.([A-Za-z]+)\([^`]*`\s*\|/.exec(line);
      if (signature !== null && claimedApis.has(signature[1])) continue;
      matches.push({ line: lineNumber, heading, score: score + (/^#{1,6}\s/.test(line) ? 3 : 0) });
    }

    // Merge matches whose snippets would overlap: one region must not be reported
    // once per matching line.
    matches.sort((left, right) => left.line - right.line);
    const groups = [];
    for (const match of matches) {
      const previous = groups.at(-1);
      if (previous !== undefined && match.line - previous.last <= MERGE_DISTANCE) {
        previous.last = match.line;
        if (match.score > previous.score) {
          previous.score = match.score;
          previous.heading = match.heading;
        }
        continue;
      }
      groups.push({ first: match.line, last: match.line, score: match.score, heading: match.heading });
    }

    // One section contributes at most MAX_HITS_PER_SECTION snippets, so a query that
    // is broad or repeated inside one chapter still returns something from the rest.
    const perHeading = new Map();
    for (const group of groups.sort((left, right) => right.score - left.score)) {
      const used = perHeading.get(group.heading) ?? 0;
      if (used >= MAX_HITS_PER_SECTION) continue;
      perHeading.set(group.heading, used + 1);
      hits.push({
        kind: 'doc',
        id: `${document.id}:${group.first + 1}`,
        score: group.score,
        title: `${document.title} › ${group.heading}`,
        detail: [
          `\`${document.file}:${group.first + 1}${group.last > group.first ? `-${group.last + 1}` : ''}\``,
          '',
          ...buildSnippet(lines, group.first, group.last),
        ].join('\n'),
      });
    }
  }

  hits.sort((left, right) => right.score - left.score || String(left.id).localeCompare(String(right.id)));
  return hits.slice(0, limit);
}
