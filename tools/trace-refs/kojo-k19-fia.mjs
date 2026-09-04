// 源: target/ERB/口上/EVENT_K19_菲娅.ERB  @全部内联引用
// issue #247；#298 锚鉴别力锁。
//
// K19 有数千条逐句内联引用。此分片把已审定的引用集合与源文件内容分别以
// SHA-256 冻结：任一侧变动都会在装载锚表时失败，必须显式复核并更新摘要。
// 锚则由冻结源文本的声明切片逐行构造，避免人工复制数千个正则时漏转义或
// 漏登记。纯结构行在 K19 正文中已原地扩窗到邻近有语义的源行；空
// PRINTFORMW 保留 #298 指定的整行锚。

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..',
);
const JS = 'ere/kojo/kojo-k19-fia.js';
const SRC = 'target/ERB/口上/EVENT_K19_菲娅.ERB';
const EXPECTED_REFS_SHA256 =
  'e65ba39cf74d753e37acf5d34705a61414d2ad1c070aba07cf25d15befb14555';
const EXPECTED_SOURCE_SHA256 =
  '3767116e0e384f26932641a9e4f610b86c0998ffd7badc62db4fa8a1032ad850';
const ERB_REF_RE = /(?<![A-Za-z0-9_.{}]):(\d+)(?:-(\d+))?/g;

function sha256(text) {
  return crypto.createHash('sha256').update(text).digest('hex');
}

function compare_refs(left, right) {
  const [left_a, left_b = left_a] = left.split('-').map(Number);
  const [right_a, right_b = right_a] = right.split('-').map(Number);
  return left_a - right_a || left_b - right_b;
}

function collect_refs(js_text) {
  const found = new Set();
  for (const line of js_text.split(/\r?\n/)) {
    const parts = [];
    if (/^\s*\*/.test(line) || /^\s*\/\*/.test(line)) parts.push(line);
    const line_comment = line.indexOf('//');
    if (line_comment >= 0) parts.push(line.slice(line_comment));
    for (const match of parts.flatMap((part) => [
      ...part.matchAll(ERB_REF_RE),
    ])) {
      found.add(match[2] ? `${match[1]}-${match[2]}` : match[1]);
    }
  }
  return [...found].sort(compare_refs);
}

function escape_re(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replaceAll(' ', '[ \\t]+');
}

function source_anchor(lines, ref) {
  const [from, to = from] = ref.split('-').map(Number);
  if (from < 1 || to < from || to > lines.length) {
    throw new Error(`${JS} 的 :${ref} 超出 ${SRC} 行数`);
  }
  if (from === to && /^PRINTFORMW\s*$/i.test(lines[from - 1].trim())) {
    return /^\s*PRINTFORMW\s*$/m;
  }
  // 超长概述引用照 K10 先例，只锚定开头八行；其余引用整段锚定。
  return new RegExp(
    lines
      .slice(from - 1, Math.min(to, from + 7))
      .map((line) => `^(?:\\uFEFF)?[ \\t]*${escape_re(line.trim())}[ \\t]*$`)
      .join('\\r?\\n'),
    'm',
  );
}

const js_text = fs.readFileSync(path.join(REPO, JS), 'utf8');
const source_text = fs.readFileSync(path.join(REPO, SRC), 'utf8');
const refs = collect_refs(js_text);
if (sha256(refs.join('\n')) !== EXPECTED_REFS_SHA256) {
  throw new Error(`${JS} 的内联引用集合已变更；复核锚后更新本分片摘要`);
}
if (sha256(source_text) !== EXPECTED_SOURCE_SHA256) {
  throw new Error(`${SRC} 已变更；复核锚后更新本分片摘要`);
}

export const FILES = [
  {
    js: JS,
    refs: refs.map((ref) => ({
      src: SRC,
      ref,
      any: [source_anchor(source_text.split(/\r?\n/), ref)],
    })),
  },
];

export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {};
