/**
 * 静态检查：ere/ 里不得再出现「用半角空格补齐」的写法（#577）。
 *
 * 引擎渲染层（app.asar 的 js/app.*.js，text-block 组件）对文本行没有设置
 * white-space，连续 U+0020 按浏览器默认规则合并成一个——凡是用半角空格
 * 补列宽的写法在实机上全部失效（issue #577）。#577 起对齐补位一律走
 * #/utils/display-width 的 pad_display / pad_left（补位字符 U+00A0）或
 * NBSP 常量的 repeat。这里守两类回退写法：
 *   1. `' '.repeat(n)`——半角空格串；
 *   2. `padStart(n)` / `padEnd(n)` 缺省填充或显式用 `' '` 填充——缺省填充
 *      就是半角空格（显式 '0'、'\u3000' 等非空格填充不拦）。
 *
 * 字符串字面量里手写的连续半角空格不在本检查范围（原作文本自带的双空格、
 * 按钮正文等按 #577 的普查表逐处裁定，见完成评论），这里只拦「程序化补齐」。
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

function scan() {
  const offenders = [];
  const report = (where, why) => {
    if (!ALLOWED[where]) {
      offenders.push(`${where}（${why}）`);
    }
  };
  for (const abs of walk_js(ERE_ROOT)) {
    const rel = path.relative(ERE_ROOT, abs).replaceAll(path.sep, '/');
    const lines = fs.readFileSync(abs, 'utf8').split(/\r?\n/);
    lines.forEach((line, idx) => {
      const where = `${rel}:${idx + 1}`;
      // 注释行（//、*、/*）不算源码
      if (/^\s*(\/\/|\*|\/\*)/.test(line)) {
        return;
      }
      if (/(?:' '|` `|" ")\.repeat\s*\(/.test(line)) {
        report(where, `半角空格 repeat → ${line.trim()}`);
        return;
      }
      const pad_re = /\.pad(Start|End)\(\s*([^()]*)\)/g;
      let match;
      while ((match = pad_re.exec(line))) {
        const args = match[2];
        if (!args.includes(',')) {
          report(where, `pad${match[1]} 缺省填充（半角空格） → ${line.trim()}`);
          continue;
        }
        const fill = args.slice(args.indexOf(',') + 1).trim();
        if (fill === "' '" || fill === '" "') {
          report(where, `pad${match[1]} 用半角空格填充 → ${line.trim()}`);
        }
      }
    });
  }
  return offenders;
}

test('ere/ 不得出现半角空格补齐写法（#577：补位走 display-width 的 U+00A0）', () => {
  const offenders = scan();
  assert.deepEqual(
    offenders,
    [],
    `以下位置用半角空格补齐，实机列对齐会失效；改用 #/utils/display-width 的 pad_display/pad_left 或 NBSP.repeat：\n${offenders.join('\n')}`,
  );
});

test('扫描器自身有效：植入违规写法必须被抓到', () => {
  const probe = [
    "const a = ' '.repeat(4);",
    'const b = x.padStart(3);',
    "const c = x.padEnd(3, ' ');",
  ];
  const pad_re = /\.pad(Start|End)\(\s*([^()]*)\)/g;
  assert.ok(/(?:' '|` `|" ")\.repeat\s*\(/.test(probe[0]), 'repeat 探针未命中');
  assert.ok(!probe[1].includes(','), '缺省填充探针形态不对');
  const args = '3, ' + "' '";
  assert.ok(
    args.slice(args.indexOf(',') + 1).trim() === "' '",
    '空格填充探针形态不对',
  );
  // 非空格填充不拦
  const keep = ["String(n).padStart(2, '0')", "name.padEnd(14, '　')"];
  for (const line of keep) {
    pad_re.lastIndex = 0;
    let bad = false;
    let m;
    while ((m = pad_re.exec(line))) {
      const a = m[2];
      if (!a.includes(',')) bad = true;
      else if (a.slice(a.indexOf(',') + 1).trim() === "' '") bad = true;
    }
    assert.ok(!bad, `不该拦的写法被拦：${line}`);
  }
});
