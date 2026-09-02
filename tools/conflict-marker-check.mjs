// 冲突标记检查器（issue #299）：已提交的未解冲突标记必须被直接点名。
//
// 守什么：git 跟踪的文本里残留的合并冲突标记。JS 侧未解标记一跑就是
// SyntaxError（SOP 记着 #221），但报错不点名根因；markdown 侧更糟——
// 七个连续大于号是合法嵌套引用块，prettier --write 会把它洗成七个用空格
// 隔开的大于号，此后 --check 永远绿。#234/#236 合并时留下的残留因此在
// master 上躺了两个月，底下还压着本应在表里的登记。
//
// 怎么守（照 tools/skip-count-check.mjs 的形状：规则在工具里、退出码是
// 判据，测试只验行为）：
//   1. 原始标记：行首七个小于号 / 七个等号 / 七个大于号（可带后随文本）；
//   2. prettier 洗净的 markdown 形态：七个用空格隔开的大于号（含后面再
//      嵌一行开始标记的复合形态）；
//   3. 七个等号在 markdown 里、上一行有正文时按 setext 标题下划线排除，
//      上一行空白仍报——排除按上下文不是按扩展名一刀切。
// 扫描面：git ls-files 的跟踪文本，排除 target/（只读输入）与
// node_modules/。二进制按扩展名与 NUL 字节跳过。
//
// 用法：node tools/conflict-marker-check.mjs [--root <dir>]
//   全绿退出码 0；任一命中退出码 1。--root 给探针副本（默认本工具上级）。

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);

const START_MARK = '<'.repeat(7);
const END_MARK = '>'.repeat(7);
const SEP_MARK = '='.repeat(7);
const WASHED_PREFIX = Array(7).fill('>').join(' ');

const BINARY_EXT = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
  '.bmp',
  '.mp3',
  '.wav',
  '.ogg',
  '.exe',
  '.bin',
  '.woff',
  '.ttf',
  '.ico',
  '.pdf',
  '.zip',
  '.asar',
]);

function parse_args(argv) {
  const out = { root: DEFAULT_ROOT };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === '--root') {
      i += 1;
      if (!argv[i]) throw new Error('--root 后面要跟目录');
      out.root = path.resolve(argv[i]);
    } else if (a.startsWith('--root=')) {
      out.root = path.resolve(a.slice('--root='.length));
    } else {
      throw new Error(`未知参数：${a}`);
    }
  }
  return out;
}

function should_skip(rel) {
  const posix = rel.replaceAll('\\', '/');
  return (
    posix === 'target' ||
    posix.startsWith('target/') ||
    posix === 'node_modules' ||
    posix.startsWith('node_modules/')
  );
}

function list_tracked(root) {
  const r = spawnSync('git', ['ls-files', '-z'], {
    cwd: root,
    encoding: 'buffer',
    maxBuffer: 32 * 1024 * 1024,
  });
  if (r.status !== 0) {
    throw new Error(
      `git ls-files 失败（退出码 ${r.status}）：${(r.stderr || '').toString()}`,
    );
  }
  return r.stdout
    .toString('utf8')
    .split('\0')
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((rel) => !should_skip(rel));
}

function is_markdown(rel) {
  return /\.md$/i.test(rel.replaceAll('\\', '/'));
}

function is_binary_path(rel) {
  return BINARY_EXT.has(path.extname(rel).toLowerCase());
}

function is_washed_marker(line) {
  const t = line.replace(/^[ \t]+/, '');
  return t === WASHED_PREFIX || t.startsWith(`${WASHED_PREFIX} `);
}

function is_raw_start(line) {
  const t = line.replace(/^[ \t]+/, '');
  return t === START_MARK || t.startsWith(`${START_MARK} `);
}

function is_raw_end(line) {
  const t = line.replace(/^[ \t]+/, '');
  return t === END_MARK || t.startsWith(`${END_MARK} `);
}

function is_raw_sep(line) {
  return line.replace(/^[ \t]+/, '').replace(/[ \t]+$/, '') === SEP_MARK;
}

function is_raw_marker(line) {
  return is_raw_start(line) || is_raw_end(line) || is_raw_sep(line);
}

/** markdown 上一行有正文时，七个等号按 setext 标题下划线放行 */
function is_setext_underline(line, prev, markdown) {
  return markdown && is_raw_sep(line) && prev.trim() !== '';
}

function scan_text(rel, text) {
  const markdown = is_markdown(rel);
  const lines = text.split(/\r?\n/);
  const hits = [];
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const prev = i > 0 ? lines[i - 1] : '';
    if (is_washed_marker(line)) {
      hits.push({ kind: 'prettier 洗净', line: i + 1, text: line.trim() });
      continue;
    }
    if (is_raw_marker(line)) {
      if (is_setext_underline(line, prev, markdown)) {
        continue;
      }
      hits.push({ kind: '原始标记', line: i + 1, text: line.trim() });
    }
  }
  return hits;
}

function scan_file(root, rel) {
  if (is_binary_path(rel)) return [];
  const buf = fs.readFileSync(path.join(root, rel));
  if (buf.includes(0)) return [];
  return scan_text(rel, buf.toString('utf8'));
}

function run(root) {
  const files = list_tracked(root);
  const hits = [];
  for (const rel of files) {
    for (const hit of scan_file(root, rel)) {
      hits.push({ rel, ...hit });
    }
  }
  if (hits.length === 0) {
    console.log(`✓ 冲突标记：${files.length} 个跟踪文本文件无未解标记`);
    return 0;
  }
  const lines = [`✗ 未解冲突标记 ${hits.length} 处：`];
  for (const h of hits) {
    lines.push(`  ${h.rel}:${h.line}  ${h.kind}  ${h.text}`);
  }
  console.log(lines.join('\n'));
  return 1;
}

try {
  const { root } = parse_args(process.argv.slice(2));
  process.exit(run(root));
} catch (err) {
  console.error(err instanceof Error ? err.message : err);
  process.exit(2);
}
