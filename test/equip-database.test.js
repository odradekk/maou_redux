/**
 * 装备数据表的形状锁与逐分支等价（issue #174 验收清单第 2、3、4 条）。
 *
 *  - 形状锁：ere/data/equip-database.js 无逻辑、无 require、无条件分支、
 *    只含原始值（裁定 6 的交付形态，用源码扫描守住）；
 *  - 逐分支等价锁已随只读源删除；装备表的数据面由消费侧行为测试守住。
 *  - 存储编码拆装往返：(前缀 * 100000) + (强度 * 1000) + 识别号。
 *
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
