/**
 * 静态检查：ere/ 里不得再出现「用半角空格补齐」的写法（#577）。
 *
 * 引擎渲染层（app.asar 的 js/app.*.js，text-block 组件）对文本行没有设置
 * white-space，连续 U+0020 按浏览器默认规则合并成一个——凡是用半角空格
 * 补列宽的写法在实机上全部失效（issue #577）。#577 起对齐补位一律走
 * #/utils/display-width 的 pad_display / pad_left（补位字符 U+00A0）或
 * NBSP 常量的 repeat。这里守五类回退写法：
 *   1. `' '.repeat(n)` 与 `'  '.repeat(n)`——纯空格的字符串重复；
 *   2. `padStart(n)` / `padEnd(n)` 缺省填充（缺省就是半角空格）；
 *   3. `padStart(n, ' ')` / `padEnd(n, ' ')` 显式用半角空格填充
 *      （显式 '0'、'\u3000' 等非空格填充不拦）；2、3 的参数表按括号配平
 *      跨行取，`x.padEnd(get_width(i))` 这类参数里带括号的形态照样命中；
 *   4. `Array(n).fill(' ')` 一族；
 *   5. `join('  ')`——两格及以上的空格连接（单格 join 多半是分词，不拦）。
 *
 * 字符串字面量里手写的连续半角空格不在本检查范围（原作文本自带的双空格、
 * 按钮正文等按 #577 的普查表逐处裁定，见完成评论），这里只拦「程序化补齐」。
 * 检查的边界由决定评论第 4 条钉住（`' '.repeat(`、`padStart(n)` / `padEnd(n)`
 * 缺省或用 `' '` 作填充）。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const ERE_ROOT = path.resolve(__dirname, '..', 'ere');

/** 白名单：'相对路径:行号' → 理由。#577 清零后只许缩短、不许新增。 */
const ALLOWED = {};

function walk_js(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk_js(full, out);
    } else if (entry.name.endsWith('.js')) {
      out.push(full);
    }
  }
  return out;
}

/** 从 open 处的 '(' 取到配对的 ')'（跳过字符串与行注释），跨行有效 */
function match_paren(text, open) {
  let depth = 0;
  for (let i = open; i < text.length; i += 1) {
    const ch = text[i];
    if (ch === '(') depth += 1;
    else if (ch === ')') {
      depth -= 1;
      if (depth === 0) return i;
    } else if (ch === "'" || ch === '"' || ch === '`') {
      const quote = ch;
      i += 1;
      while (i < text.length && text[i] !== quote) {
        if (text[i] === '\\') i += 1;
        i += 1;
      }
    } else if (ch === '/' && text[i + 1] === '/') {
      while (i < text.length && text[i] !== '\n') i += 1;
    }
  }
  return -1;
}

/** 取实参表里第 n 个（0 起）顶层实参的原文；不足时返回 undefined */
function nth_arg(args, n) {
  const parts = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < args.length; i += 1) {
    const ch = args[i];
    if ('([{'.includes(ch)) depth += 1;
    else if (')]}'.includes(ch)) depth -= 1;
    else if (ch === ',' && depth === 0) {
      parts.push(args.slice(start, i));
      start = i + 1;
    } else if (ch === "'" || ch === '"' || ch === '`') {
      const quote = ch;
      i += 1;
      while (i < args.length && args[i] !== quote) {
        if (args[i] === '\\') i += 1;
        i += 1;
      }
    }
  }
  parts.push(args.slice(start));
  return parts[n];
}

const SPACE_LITERAL = /^(?:' '|" "|` `)$/;

/**
 * 扫一段源码，返回 `{line, why}` 列表（line 为 1 起的行号）。
 * @param {string} text 源码全文
 * @returns {{line: number, why: string}[]}
 */
function scan(text) {
  const offenders = [];
  const report = (line, why) => {
    if (!ALLOWED[line]) {
      offenders.push({ line, why });
    }
  };
  const line_of = (index) => text.slice(0, index).split('\n').length;

  // ==、3：padStart / padEnd（参数表跨行取）
  const pad_re = /\.pad(Start|End)\s*\(/g;
  let m;
  while ((m = pad_re.exec(text))) {
    // 注释行（//、*、/* 开头）里的调用不算源码：注释也是新老写法的说明面
    if (/^\s*(\/\/|\*|\/\*)/.test(text.slice(0, m.index).split('\n').pop())) {
      continue;
    }
    const open = text.indexOf('(', m.index);
    const close = match_paren(text, open);
    if (close < 0) continue;
    const args = text.slice(open + 1, close);
    const second = nth_arg(args, 1);
    if (second === undefined) {
      report(line_of(m.index), `pad${m[1]} 缺省填充（半角空格）`);
    } else if (SPACE_LITERAL.test(second.trim())) {
      report(line_of(m.index), `pad${m[1]} 用半角空格填充`);
    }
  }

  // ==1、4、5：逐行看纯空格 repeat、fill 一族、两格以上的 join
  const lines = text.split(/\r?\n/);
  lines.forEach((line, idx) => {
    // 注释行（//、*、/*）不算源码
    if (/^\s*(\/\/|\*|\/\*)/.test(line)) {
      return;
    }
    if (/(['"`])( +)\1\.repeat\s*\(/.test(line)) {
      report(idx + 1, `纯空格串的 repeat → ${line.trim()}`);
      return;
    }
    if (/\.fill\s*\(\s*(?:' '|" "|` `)\s*\)/.test(line)) {
      report(idx + 1, `fill 用半角空格 → ${line.trim()}`);
      return;
    }
    if (/\.join\s*\(\s*(?:' {2,}'|" {2,}"|` {2,}`)\s*\)/.test(line)) {
      report(idx + 1, `join 用两格以上空格 → ${line.trim()}`);
    }
  });

  return offenders;
}

function scan_repo() {
  const out = [];
  for (const abs of walk_js(ERE_ROOT)) {
    const rel = path.relative(ERE_ROOT, abs).replaceAll(path.sep, '/');
    for (const { line, why } of scan(fs.readFileSync(abs, 'utf8'))) {
      out.push(`${rel}:${line}（${why}）`);
    }
  }
  return out;
}

test('ere/ 不得出现半角空格补齐写法（#577：补位走 display-width 的 U+00A0）', () => {
  const offenders = scan_repo();
  assert.deepEqual(
    offenders,
    [],
    `以下位置用半角空格补齐，实机列对齐会失效；改用 #/utils/display-width 的 pad_display/pad_left 或 NBSP.repeat：\n${offenders.join('\n')}`,
  );
});

test('扫描器自身有效：五类违规写法都要被抓到，非空格填充不误伤', () => {
  const probe = [
    "const a = ' '.repeat(4);",
    "const a2 = '  '.repeat(4);",
    'const b = x.padStart(3);',
    "const c = x.padEnd(3, ' ');",
    'const d = x.padEnd(get_width(i)); // 实参里带括号',
    'const e = x.padStart(',
    '  width,',
    "  ' ', // 跨行实参",
    ');',
    'const f = Array(n).fill(" ").join("");',
    "const g = parts.join('  ');",
  ].join('\n');
  const hits = scan(probe).sort((a, b) => a.line - b.line);
  assert.deepEqual(
    hits.map((h) => [h.line, h.why.split(' ')[0]]),
    [
      [1, '纯空格串的'],
      [2, '纯空格串的'],
      [3, 'padStart'],
      [4, 'padEnd'],
      [5, 'padEnd'],
      [6, 'padStart'],
      [10, 'fill'],
      [11, 'join'],
    ],
    `八条探针的行号与类别（实得：${JSON.stringify(hits)}）`,
  );

  // 非空格填充、单格 join、注释与插值里的空格都不拦
  const keep = [
    "const a = String(n).padStart(2, '0');",
    "const b = name.padEnd(14, '\\u3000');",
    'const c = words.join(" ");',
    "// const d = ' '.repeat(3);",
    '  * const e = x.padStart(2);',
    'const f = `${pad_display(name, 8)} - LV3`;',
  ].join('\n');
  assert.deepEqual(
    scan(keep),
    [],
    `不该拦的写法被拦：${JSON.stringify(scan(keep))}`,
  );
});
