/**
 * @file 简体文本检查的判定器与扫描器（issue #60；#188 收紧；#640 起只留检查）。
 *
 * 数据在 tools/lang-table.js（唯一真相源），本文件只做三件事：
 *   1. load_table()：载入并**校验**归一表——坏表在载入期就报，不等人撞上；
 *   2. find_offenders(str)：判定一段文本是否含**表内登记的**非简体字符（字级
 *      命中 / 假名 / 词级命中），供简体锁逐条报出——判定是查表命中，表外
 *      繁/日字种不在此判定器的视野内（#188 勘误）；
 *   3. find_outside_trad(str)：判定一段文本是否含**归一表外的繁侧字**（#188
 *      收紧）——数据源 tools/lang-simp-ref.js（OpenCC 派生，独立于归一表），
 *      补上查表命中对表外繁体的失明；简体锁两路判定并用。
 * 另有整串豁免判定 is_exempted 与 JS 源码字符串字面量扫描器
 * scan_string_literals（注释感知，简体锁的取词工具）。
 *
 * 消费方：test/lang-check.test.js（表测试）、test/output-lang-lock.test.js
 * （ere/ + yml/ 简体锁）。
 */

'use strict';

const table = require('./lang-table');
const { TRAD_SIDE } = require('./lang-simp-ref');

/** 繁侧字集（require 期建一次）。数据与溯源见 tools/lang-simp-ref.js。 */
const TRAD_SIDE_SET = new Set(TRAD_SIDE);

/** 假名（含长音符・半角片假名；・ 在假名区，用作分隔样式时会有意红一次） */
const KANA_RE = /[ぁ-ヿｦ-ﾞ]/;

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
 * 找出文本里**归一表外**的繁侧字（#188 收紧：锁不再对表外繁体失明）。
 *
 * 「繁侧」以 OpenCC 派生的参考集（tools/lang-simp-ref.js）为准，独立于
 * 归一表——表外繁体（如 贖）与表内繁体在这里分道：后者由 find_offenders
 * 以 char:… 报出，前者由本函数以 outside:… 报出，表内字不在此重复报。
 * 假名与词级命中不在此（KANA_RE 按区间、WORD_MAP 按表，均无失明）。
 *
 * @returns {Array<{kind: 'outside', value: string}>} 去重保序。空数组 = 干净。
 *   豁免仍按整串、由调用方先查 is_exempted（与 find_offenders 同约定）。
 */
function find_outside_trad(text, tbl = load_table()) {
  const hits = [];
  const seen = new Set();
  for (const ch of text) {
    if (seen.has(ch)) {
      continue;
    }
    if (tbl.char_map.has(ch) || !TRAD_SIDE_SET.has(ch)) {
      continue;
    }
    seen.add(ch);
    hits.push({ kind: 'outside', value: ch });
  }
  return hits;
}

/**
 * 扫描 JS 源码里的字符串字面量（注释感知）。
 *
 * 字符串内容按不透明处理（模板字面量的 ${…} 原样进内容——里面的非简体会
 * 被报出，这是有意的过近似，宁可红一次）；**不识别正则字面量**，正则字符
 * 类里出现引号会误开一个字符串——ere/ 现状没有这种写法，出现了会以「文本
 * 离奇」的样子红出来，届时有意识地扩。
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

module.exports = {
  find_offenders,
  find_outside_trad,
  is_exempted,
  load_table,
  scan_string_literals,
  validate,
};
