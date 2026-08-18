/**
 * @file T20 归一表的载入器与离线转换器（issue #60）。
 *
 * 数据在 tools/lang-table.js（唯一真相源），本文件只做四件事：
 *   1. load_table()：载入并**校验**归一表——坏表在载入期就报，不等人撞上；
 *   2. to_simplified(text)：词级（长词优先）→ 字级两趟转换，输出即简体；
 *   3. find_offenders(str)：判定一段文本是否含表外非简体字符（字级命中 /
 *      假名 / 词级命中），供简体锁逐条点名；
 *   4. convert_source(text) 与 CLI：只改 JS 源码里的字符串字面量（注释与
 *      标识符不碰），豁免串原样放行——ere/ 现有文本的离线转换入口，也是
 *      后续各子系统票转换约 2,300 行欠账的机制。
 *
 * 消费方：test/lang-normalize.test.js（表测试）、test/output-lang-lock.test.js
 * （ere/ + yml/ 简体锁）、test/kojo-text-fidelity.test.js（锁 D 的 ERB 侧
 * 归一）、转译器（#10，将来）与输出对拍（#48，对黄金样本侧应用同一张表）。
 * 运行时（ere/）不 require 本文件——归一只在离线发生。
 *
 * 用法：node tools/lang-normalize.js [--write] <js 文件...>
 *   默认干跑：逐条列出会发生的改动（file:line 原文 → 归一后），不写盘；
 *   --write 才落盘。yml/ 产物不在此转（产物边界：重转走 csv-to-yml，人名
 *   等人工定译后人工维护）。
 */

'use strict';

const table = require('./lang-table');

/** 假名（含长音符・半角片假名；・ 在假名区，用作分隔样式时会有意红一次） */
const KANA_RE = /[\u3041-\u30FF\uFF66-\uFF9F]/;

/**
 * 校验归一表的形状不变量，返回归并后的表。坏表 throw（file:行号可追）。
 *
 * 不变量：
 *   - 字级键、值都必须是单个字符；键≠值（无变化条目是手误）；
 *   - 任何值不得再是键（链式映射会破坏幂等性）；
 *   - 词级 source ≥ 2 字、source ≠ target、target 里不得再含任何键或词源
 *     （转换一趟到位）；
 *   - 豁免串必须非空、互不相同。
 */
function validate(raw) {
  const problems = [];
  const char_map = new Map();
  for (const [group, name] of [
    [raw.TRAD_CHAR_MAP, 'TRAD_CHAR_MAP'],
    [raw.JP_CHAR_MAP, 'JP_CHAR_MAP'],
  ]) {
    for (const [k, v] of Object.entries(group)) {
      if ([...k].length !== 1 || [...v].length !== 1) {
        problems.push(`${name} 非单字条目：${k} → ${v}`);
        continue;
      }
      if (k === v) {
        problems.push(`${name} 无变化条目：${k}`);
      }
      if (char_map.has(k) && char_map.get(k) !== v) {
        problems.push(`字级冲突：${k} → ${char_map.get(k)} 与 ${v}`);
      }
      char_map.set(k, v);
    }
  }
  for (const [k, v] of char_map) {
    if (char_map.has(v)) {
      problems.push(`链式映射：${k} → ${v} → ${char_map.get(v)}`);
    }
  }
  const word_sources = [];
  for (const { source, target } of raw.WORD_MAP) {
    if ([...source].length < 2) {
      problems.push(`词级条目过短：${source}`);
    }
    if (source === target) {
      problems.push(`词级无变化条目：${source}`);
    }
    for (const ch of target) {
      if (char_map.has(ch)) {
        problems.push(
          `词级 target 含字级键（会二次转换）：${source} → ${target} 的 ${ch}`,
        );
      }
    }
    word_sources.push(source);
  }
  const exempt_values = new Set();
  for (const { value } of raw.EXEMPT_STRINGS) {
    if (!value) {
      problems.push('豁免条目 value 为空');
    }
    if (exempt_values.has(value)) {
      problems.push(`豁免条目重复：${value}`);
    }
    exempt_values.add(value);
  }
  if (problems.length > 0) {
    throw new Error(`归一表形状不合法：\n  ${problems.join('\n  ')}`);
  }
  return {
    char_map,
    trad_map: new Map(Object.entries(raw.TRAD_CHAR_MAP)),
    jp_map: new Map(Object.entries(raw.JP_CHAR_MAP)),
    word_map: [...raw.WORD_MAP].sort(
      (a, b) => b.source.length - a.source.length,
    ),
    exempt_values,
    engine_column_keys: new Set(raw.ENGINE_COLUMN_KEYS),
  };
}

/** 载入（含校验）归一表。require 期算一次，调用方缓存即可。 */
function load_table() {
  return validate(table);
}

/** 词级（长词优先）→ 字级。幂等：对已归一文本是无操作。 */
function to_simplified(text, tbl = load_table()) {
  let out = text;
  for (const { source, target } of tbl.word_map) {
    out = out.split(source).join(target);
  }
  return [...out].map((ch) => tbl.char_map.get(ch) ?? ch).join('');
}

/**
 * 归一一段 yml 产物文本，**保护引擎列名键**（素質/名前/呼び名…——引擎按名
 * 读取的接口，不是文案，见 lang-table.js 的 ENGINE_COLUMN_KEYS）。
 * 用占位符把键罩住再归一。csv-to-yml 在生成期对产物文本自应用（唯一出口
 * emit_product_lines，#60），#10 的转译器生成 yml 时同用这个。
 */
function to_simplified_yaml(text, tbl = load_table()) {
  const guards = [];
  let out = text;
  for (const key of tbl.engine_column_keys) {
    const placeholder = `\u0000${guards.length}\u0000`;
    if (out.includes(key)) {
      out = out.split(key).join(placeholder);
      guards.push(key);
    }
  }
  out = to_simplified(out, tbl);
  guards.forEach((key, i) => {
    out = out.split(`\u0000${i}\u0000`).join(key);
  });
  return out;
}

/**
 * 找出文本里的非简体内容（简体锁的判定器）。
 *
 * @returns {Array<{kind: 'char'|'kana'|'word', value: string}>} 命中项
 *   （去重保序）。空数组 = 干净。**不做豁免判断**——豁免按整串，由调用方
 *   先查 is_exempted 再调这里。
 */
function find_offenders(text, tbl = load_table()) {
  const hits = [];
  const seen = new Set();
  const push = (kind, value) => {
    const key = `${kind}:${value}`;
    if (!seen.has(key)) {
      seen.add(key);
      hits.push({ kind, value });
    }
  };
  for (const { source } of tbl.word_map) {
    if (text.includes(source)) {
      push('word', source);
    }
  }
  for (const ch of text) {
    if (tbl.char_map.has(ch)) {
      push('char', ch);
    } else if (KANA_RE.test(ch)) {
      push('kana', ch);
    }
  }
  return hits;
}

/** 整串豁免判定：与豁免名单完全相等才命中。 */
function is_exempted(text, tbl = load_table()) {
  return tbl.exempt_values.has(text);
}

/**
 * 扫描 JS 源码里的字符串字面量（注释感知）。
 *
 * 与 test/kojo-text-fidelity.test.js 的扫描器同一套边界：字符串内容按不
 * 透明处理（模板字面量的 ${…} 原样进内容——里面的非简体会被点名，这是
 * 有意的过近似，宁可红一次）；**不识别正则字面量**，正则字符类里出现
 * 引号会误开一个字符串——ere/ 现状没有这种写法，出现了会以「文本离奇」
 * 的样子红出来，届时有意识地扩。
 *
 * @param {string} text 源码全文
 * @returns {Array<{start: number, end: number, line: number, quote: string,
 *   content: string}>} 按 start 升序；end 是闭合引号后一位
 */
function scan_string_literals(text) {
  const lits = [];
  let i = 0;
  const n = text.length;
  let line = 1;
  while (i < n) {
    const ch = text[i];
    if (ch === '\n') {
      line += 1;
      i += 1;
      continue;
    }
    if (ch === '/' && text[i + 1] === '/') {
      while (i < n && text[i] !== '\n') {
        i += 1;
      }
      continue;
    }
    if (ch === '/' && text[i + 1] === '*') {
      const close = text.indexOf('*/', i + 2);
      const end = close < 0 ? n : close + 2;
      while (i < end) {
        if (text[i] === '\n') {
          line += 1;
        }
        i += 1;
      }
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') {
      const quote = ch;
      const start_line = line;
      const start = i;
      let buf = '';
      i += 1;
      while (i < n && text[i] !== quote) {
        if (text[i] === '\\') {
          buf += text[i + 1];
          if (text[i + 1] === '\n') {
            line += 1;
          }
          i += 2;
          continue;
        }
        if (text[i] === '\n') {
          line += 1;
        }
        buf += text[i];
        i += 1;
      }
      i += 1; // 闭合引号（文件尾未闭合时吃到底，扫描结果交上层判断）
      lits.push({ start, end: i, line: start_line, quote, content: buf });
      continue;
    }
    i += 1;
  }
  return lits;
}

/**
 * 转换 JS 源码：只动字符串字面量内容，注释/标识器不碰；豁免串原样保留。
 *
 * 含转义序列的字面量**跳过**并计入 changes（标记 skipped）：内容按字面值
 * 重建会把 \n 之类的转义写成真实控制符、破坏源码——这种串留给人工。
 *
 * @returns {{text: string, changes: Array<{line: number, before: string,
 *   after: string, skipped?: boolean}>}} changes 为空即无改动（幂等：对
 * 已归一源码无操作）
 */
function convert_source(text, tbl = load_table()) {
  const changes = [];
  // 从后往前替换，保住前面字面量的偏移
  const lits = [...scan_string_literals(text)].reverse();
  let out = text;
  for (const lit of lits) {
    if (is_exempted(lit.content, tbl)) {
      continue;
    }
    if (find_offenders(lit.content, tbl).length === 0) {
      continue; // 干净串不动（等价于幂等，也省一次重建）
    }
    if (text.slice(lit.start, lit.end).includes('\\')) {
      changes.unshift({
        line: lit.line,
        before: lit.content,
        after: to_simplified(lit.content, tbl),
        skipped: true,
      });
      continue;
    }
    const after = to_simplified(lit.content, tbl);
    if (after !== lit.content) {
      changes.unshift({ line: lit.line, before: lit.content, after });
      out =
        out.slice(0, lit.start) +
        lit.quote +
        after +
        lit.quote +
        out.slice(lit.end);
    }
  }
  return { text: out, changes };
}

// —— CLI（离线一次性转换的入口；测试走上面的模块函数） ——
if (require.main === module) {
  const args = process.argv.slice(2);
  const write = args[0] === '--write';
  const files = write ? args.slice(1) : args;
  if (files.length === 0) {
    console.error('用法：node tools/lang-normalize.js [--write] <js 文件...>');
    process.exit(2);
  }
  const fs = require('node:fs');
  const tbl = load_table();
  let total = 0;
  for (const file of files) {
    const text = fs.readFileSync(file, 'utf8');
    const { text: converted, changes } = convert_source(text, tbl);
    for (const c of changes) {
      console.log(
        `${file}:${c.line}${c.skipped ? '【跳过：字面量含转义序列，须人工】' : ''}`,
      );
      console.log(`  - ${c.before}`);
      console.log(`  + ${c.after}`);
    }
    total += changes.length;
    if (write && converted !== text) {
      fs.writeFileSync(file, converted, 'utf8');
    }
  }
  console.log(
    `${write ? '已转换' : '待转换（干跑，加 --write 落盘）'}：${total} 处`,
  );
}

module.exports = {
  convert_source,
  find_offenders,
  is_exempted,
  load_table,
  scan_string_literals,
  to_simplified,
  to_simplified_yaml,
  validate,
};
