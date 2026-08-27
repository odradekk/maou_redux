/**
 * 装备数据表的形状锁与逐分支等价（issue #174 验收清单第 2、3、4 条）。
 *
 *  - 形状锁：ere/data/equip-database.js 无逻辑、无 require、无条件分支、
 *    只含原始值（裁定 6 的交付形态，用源码扫描守住）；
 *  - 逐分支等价：**从 ERB 源解析 ELSEIF 链建映射，与产物逐条比对**——
 *    SOP §5 判据 7：机械等价重排的验收证据是逐分支等价，不靠行为覆盖
 *    （#90 的教训：迁移是全量的、覆盖是局部的，两者不能互相担保）；
 *  - 存储编码拆装往返：(前缀 * 100000) + (强度 * 1000) + 识别号。
 *
 * 勘误背景：#168/#174 原文写「87 分支」，与源码不符——实为识别号分支 34
 * 条（装饰 0-20、武装 40-52）+ ELSE 默认臂 + 附魔 9 条。本文件的等价用例
 * 按源码实数核对，数目本身也在断言内。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const DATA_FILE = path.resolve(
  __dirname,
  '..',
  'ere',
  'data',
  'equip-database.js',
);
const ERB_FILE = path.resolve(
  __dirname,
  '..',
  'target',
  'ERB',
  '其他',
  'EQUIP.ERB',
);

// —— ERB 侧解析（@EQUIP_DATABASE :274-702）——

/** W 列号 → 产物键名（EQUIP.ERB :7-33 的列定义） */
const COLUMN_KEYS = {
  3: '效果',
  4: '价格',
  5: '诅咒',
  6: '特殊',
  7: '部位',
  9: '伤害强化',
  10: '弹药消耗',
  11: '失手率',
  12: '气力回复',
  13: '连击率',
  14: '防御伤害',
  15: '弹尽行为',
  16: '气力伤害',
};

/**
 * 解析 @EQUIP_DATABASE 的三条链：识别号 ELSEIF 链（含 ELSE 臂）、前缀附魔链。
 * 每个分支臂收敛为 { 赋值列 → 值 }（附魔臂为增量）。
 */
function parse_equip_database_erb() {
  const src = fs.readFileSync(ERB_FILE, 'utf8').replace(/^\uFEFF/, '');
  const lines = src.split(/\r?\n/);
  // 函数体：@EQUIP_DATABASE（:274，索引 273）到 @PRINT_EQUIPTYPE_WEAPON 前
  const start = lines.findIndex((l) => /^@EQUIP_DATABASE\s*$/.test(l));
  const end = lines.findIndex((l) => /^@PRINT_EQUIPTYPE_WEAPON\s*$/.test(l));
  assert.ok(start === 273, `@EQUIP_DATABASE 应在第 274 行，实得 ${start + 1}`);
  const body = lines.slice(start, end);

  const arms = []; // { kind: 'id'|'else'|'enchant', id?, assigns: {列: 值} }
  let current = null;
  for (const raw of body) {
    const line = raw.replace(/^\t+/, '');
    const idMatch = line.match(/^(?:IF|ELSEIF)\s+W:1\s*==\s*(\d+)\s*$/);
    const encMatch = line.match(/^(?:IF|ELSEIF)\s+W:17\s*==\s*(\d+)\s*$/);
    if (idMatch) {
      current = { kind: 'id', id: Number(idMatch[1]), assigns: {} };
      arms.push(current);
      continue;
    }
    if (encMatch) {
      current = { kind: 'enchant', id: Number(encMatch[1]), assigns: {} };
      arms.push(current);
      continue;
    }
    if (/^ELSE\s*$/.test(line)) {
      current = { kind: 'else', assigns: {} };
      arms.push(current);
      continue;
    }
    const assign = line.match(/^W:(\d+)\s*=\s*(-?\d+)\s*$/);
    if (assign && current) {
      current.assigns[Number(assign[1])] = Number(assign[2]);
    }
    // `W:13 = 00` 一类前导零也按整数收
    const assignZero = line.match(/^W:(\d+)\s*=\s*(0\d+)\s*$/);
    if (assignZero && current) {
      current.assigns[Number(assignZero[1])] = Number(assignZero[2]);
    }
  }
  return arms;
}

/** 把分支臂的 W 列号赋值翻译成产物键（W:0/1/2 是 ELSE 臂的重置副作用，跳过） */
function to_product_columns(assigns) {
  const out = {};
  for (const [col, value] of Object.entries(assigns)) {
    const no = Number(col);
    if (no <= 2) {
      continue; // ELSE 臂的存储编号/识别号/强度重置（行为侧 equip_database 处理）
    }
    const key = COLUMN_KEYS[no];
    if (key === undefined) {
      throw new Error(`未知 W 列：W:${col}`);
    }
    out[key] = value;
  }
  return out;
}

test('形状锁：equip-database.js 无逻辑、无 require、无条件分支，只含原始值', () => {
  const text = fs.readFileSync(DATA_FILE, 'utf8');
  // 剥注释再扫（注释里的「无逻辑」等说明文字不算逻辑）。顺序必须先块后行：
  // 先按行滤 `*` 会打散块注释边界，块注释正则会连数据表一起吞掉。本文件
  // 的字符串字面量（装备名）不含 `//`，按首个 `//` 截断是安全的
  const code = text
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .map((l) => l.replace(/\/\/.*$/, ''))
    .join('\n');
  for (const banned of [
    'require',
    'function',
    '=>',
    'if (',
    'for (',
    'while (',
    'switch',
    '?',
    '&&',
    '||',
    'try',
    'catch',
    'class',
  ]) {
    assert(
      !code.includes(banned),
      `数据表必须是纯数据（裁定 6）：代码区不得出现「${banned}」`,
    );
  }
  assert(code.includes('module.exports'), '只许一处 module.exports 导出常量表');

  // 递归校验：叶子值只能是 number/string（不许函数、不许深层嵌套）
  const data = require('../ere/data/equip-database');
  const check_primitive = (node, where, depth) => {
    for (const [key, value] of Object.entries(node)) {
      const t = typeof value;
      if (t === 'object' && value !== null) {
        assert.ok(depth > 0, `${where}.${key} 嵌套超两层（表 → 行 → 原始值）`);
        check_primitive(value, `${where}.${key}`, depth - 1);
        continue;
      }
      assert.ok(
        t === 'number' || t === 'string',
        `${where}.${key} 必须是原始值，实得 ${t}`,
      );
    }
  };
  for (const [table, rows] of Object.entries(data)) {
    if (typeof rows === 'string') {
      continue; // FALLBACK 常量
    }
    check_primitive(rows, table, 1);
  }
});

test('逐分支等价：识别号链 34 条 + ELSE 默认臂，五列（与武装八列）逐条与 ERB 源一致', () => {
  const { EQUIP_DATABASE } = require('../ere/data/equip-database');
  const arms = parse_equip_database_erb();
  const idArms = arms.filter((a) => a.kind === 'id');
  const elseArms = arms.filter((a) => a.kind === 'else');

  // 分支实数（工单「87 分支」的勘误锚点：源码就是 34 + 1）
  assert.equal(idArms.length, 34, '识别号分支应恰为 34 条（0-20、40-52）');
  assert.equal(elseArms.length, 1, 'ELSE 默认臂恰一条');

  for (const arm of idArms) {
    const row = EQUIP_DATABASE[arm.id];
    assert.notEqual(
      row,
      undefined,
      `识别号 ${arm.id} 的分支在产物表里缺失（分支被丢）`,
    );
    assert.deepEqual(
      row,
      to_product_columns(arm.assigns),
      `识别号 ${arm.id} 的各列与 ERB 源逐列不等`,
    );
  }
  // ELSE 臂 ↔ default 行
  assert.deepEqual(
    EQUIP_DATABASE.default,
    to_product_columns(elseArms[0].assigns),
    'ELSE 默认臂（黑戒指）各列与 ERB 源不等',
  );
  // ELSE 臂另有的 W:0/W:1/W:2 = 0 重置是行为侧职责，在此钉住（equip_database）
  assert.equal(elseArms[0].assigns[0], 0, 'ELSE 臂应把存储编号（W:0）重置 0');
  assert.equal(elseArms[0].assigns[1], 0, 'ELSE 臂应把识别号（W:1）重置 0');
  assert.equal(elseArms[0].assigns[2], 0, 'ELSE 臂应把强度（W:2）重置 0');
  // 产物不得多出 ERB 没有的识别号
  const erbIds = new Set(idArms.map((a) => a.id));
  for (const key of Object.keys(EQUIP_DATABASE)) {
    if (key !== 'default') {
      assert.ok(
        erbIds.has(Number(key)),
        `产物表多出 ERB 链上没有的识别号 ${key}`,
      );
    }
  }
});

test('附魔等价：前缀 1-9 的增量逐条与 ERB 源一致', () => {
  const { EQUIP_ENCHANT } = require('../ere/data/equip-database');
  const arms = parse_equip_database_erb().filter((a) => a.kind === 'enchant');
  assert.equal(arms.length, 9, '附魔分支应恰为 9 条（前缀 1-9）');
  // 附魔臂在源里是 `W:k += v`，上面的解析只收 `=`——单独收增量
  const src = fs
    .readFileSync(ERB_FILE, 'utf8')
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/);
  const deltas = {}; // 前缀 → {列: 增量}
  let current = null;
  for (const raw of src.slice(273, 702)) {
    const line = raw.replace(/^\t+/, '');
    const m = line.match(/^(?:IF|ELSEIF)\s+W:17\s*==\s*(\d+)\s*$/);
    if (m) {
      current = Number(m[1]);
      deltas[current] = {};
      continue;
    }
    const d = line.match(/^W:(\d+)\s*\+=\s*(\d+)\s*$/);
    if (d && current !== null) {
      const key = COLUMN_KEYS[Number(d[1])];
      assert.ok(key, `附魔未知列 W:${d[1]}`);
      deltas[current][key] = Number(d[2]);
    }
    // 削减写成 `W:k -= v`（如 ポイズンの W:9 -= 10），收成负增量
    const s = line.match(/^W:(\d+)\s*-=\s*(\d+)\s*$/);
    if (s && current !== null) {
      const key = COLUMN_KEYS[Number(s[1])];
      assert.ok(key, `附魔未知列 W:${s[1]}`);
      deltas[current][key] = -Number(s[2]);
    }
  }
  assert.deepEqual(
    EQUIP_ENCHANT,
    deltas,
    '附魔增量表与 ERB 源 :650-697 逐条不等',
  );
});

test('存储编码：(前缀 * 100000) + (强度 * 1000) + 识别号 的拆装往返', () => {
  const { create_era_fixture } = require('./helpers/era-fixture');
  const fixture = create_era_fixture();
  const { decode_equip_no, encode_equip_no } = fixture.load_module(
    'system/equip/equip-lookup',
  );

  // 全前缀 × 若干强度 × 若干识别号的网格往返
  for (let prefix = 0; prefix <= 9; prefix += 1) {
    for (const strength of [0, 1, 5, 10]) {
      for (const id of [0, 4, 13, 40, 52]) {
        const no = encode_equip_no(id, strength, prefix);
        assert.equal(no, prefix * 100000 + strength * 1000 + id);
        assert.deepEqual(decode_equip_no(no), {
          识别号: id,
          强度: strength,
          前缀: prefix,
        });
      }
    }
  }
  // 源 :39 的三个例位（前缀 9 强度 10 识别号 52 → 910052）
  assert.equal(encode_equip_no(52, 10, 9), 910052);
  assert.deepEqual(decode_equip_no(910052), { 识别号: 52, 强度: 10, 前缀: 9 });
});

test('名称表等价：前缀名/武器名/戒指名与 PRINT_EQUIPTYPE 两链逐条一致', () => {
  const {
    EQUIP_PREFIX_NAMES,
    EQUIP_WEAPON_NAMES,
    EQUIP_RING_NAMES,
  } = require('../ere/data/equip-database');
  const src = fs
    .readFileSync(ERB_FILE, 'utf8')
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/);
  // 提取 `ELSEIF W:k == N` 后的 `PRINT xxx`（ELSE 臂收进 __else）
  const collect = (varIdx, from, to) => {
    const out = {};
    let cur = null;
    for (const raw of src.slice(from - 1, to)) {
      const line = raw.replace(/^\t+/, '').trimEnd();
      const m = line.match(/^(?:IF|ELSEIF)\s+W:(\d+)\s*==\s*(\d+)\s*$/);
      if (m) {
        cur = Number(m[1]) === varIdx ? Number(m[2]) : null;
        continue;
      }
      if (/^ELSE\s*$/.test(line)) {
        cur = '__else';
        continue;
      }
      const p = line.match(/^PRINT[WL]?\s*(.*)$/);
      if (p && cur !== null) {
        out[cur] = p[1];
      }
    }
    return out;
  };
  const prefix = collect(17, 720, 738);
  const weapon = collect(1, 742, 789);
  const ring = collect(1, 810, 857);
  assert.deepEqual(EQUIP_PREFIX_NAMES, prefix, '前缀名与源 :720-738 不一致');
  const {
    EQUIP_WEAPON_FALLBACK,
    EQUIP_RING_FALLBACK,
  } = require('../ere/data/equip-database');
  assert.equal(
    weapon.__else,
    EQUIP_WEAPON_FALLBACK,
    '武器名 ELSE 臂应为「剑」（:784-785）',
  );
  assert.equal(
    ring.__else,
    EQUIP_RING_FALLBACK,
    '戒指名 ELSE 臂应为「暗黑戒指」（:852-853）',
  );
  delete weapon.__else;
  delete ring.__else;
  assert.deepEqual(EQUIP_WEAPON_NAMES, weapon, '武器名与源 :742-789 不一致');
  assert.deepEqual(EQUIP_RING_NAMES, ring, '戒指名与源 :810-857 不一致');
});
