/**
 * 共享工具模块的守护（#792）。
 *
 * 两条性质：
 *
 *   1. MASTER 的取值——收敛前十几个文件各写一份 `const MASTER = 0`，取值本身
 *      没有出处，这里钉住它；
 *   2. 「同一取整语义全库只有一份定义」——这是本工单的验收判据，原先只能靠
 *      grep 人工核对，这里做成结构扫描：收敛过的每个名字都只允许在共享模块里
 *      定义一次，后来者再抄一份当场红。
 *
 * 口上目录按工单范围外保留局部定义（4 份 default_rand、3 份 MASTER），扫描
 * 从豁免目录里跳过；豁免清单只列这一个目录，不为别处开口子。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const numeric = require('../ere/utils/numeric');
const { MASTER } = require('../ere/utils/master');

const ERE_DIR = path.resolve(__dirname, '..', 'ere');

// 口上目录不在本工单的收敛范围（工单「范围外」）
const EXEMPT_DIRS = [path.join(ERE_DIR, 'kojo')];

/** 收敛过的取整一行式 */
const NUMERIC_NAMES = [
  'default_rand',
  'idiv',
  'idiv_trunc',
  'percent_floor',
  'percent_trunc',
  'times',
  'times_exact',
  'times_trunc',
];

/** 名字 → 唯一允许持有它的定义的文件（相对 ere/） */
const SINGLE_DEFINITION = {
  ...Object.fromEntries(
    NUMERIC_NAMES.map((name) => [name, 'utils/numeric.js']),
  ),
  MASTER: 'utils/master.js',
};

function list_js(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (EXEMPT_DIRS.includes(full)) continue;
      out.push(...list_js(full));
    } else if (entry.name.endsWith('.js')) {
      out.push(full);
    }
  }
  return out;
}

/**
 * name 的定义形态。只认函数形态（`function name(`、`const name = (…) =>`）与
 * MASTER 的常量形态；同名的局部变量（`const times = era.get(…)`）不算——它们
 * 与共享工具无关。正则预先生成一次，扫描是每行 × 每名字的比较，重建成千上万次
 * 会白花几秒。
 */
function definition_patterns(name) {
  if (name === 'MASTER') {
    return [new RegExp(`^\\s*(?:const|let|var)\\s+${name}\\s*=`)];
  }
  return [
    new RegExp(`^\\s*(?:async\\s+)?function\\s+${name}\\s*\\(`),
    new RegExp(
      `^\\s*(?:const|let|var)\\s+${name}\\s*=\\s*(?:\\(|\\w+\\s*=>|async\\b|function\\b)`,
    ),
  ];
}

const DEFINITION_PATTERNS = Object.fromEntries(
  Object.keys(SINGLE_DEFINITION).map((name) => [
    name,
    definition_patterns(name),
  ]),
);

test('MASTER 是魔王的角色 ID 0', () => {
  assert.equal(MASTER, 0);
});

test('取整一行式与 MASTER 在 ere/ 下各只剩一份定义（口上目录按工单范围外保留）', () => {
  const found = new Map(
    Object.keys(SINGLE_DEFINITION).map((name) => [name, []]),
  );
  for (const file of list_js(ERE_DIR)) {
    const relative = path.relative(ERE_DIR, file).split(path.sep).join('/');
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
    for (const name of Object.keys(SINGLE_DEFINITION)) {
      const patterns = DEFINITION_PATTERNS[name];
      if (patterns.some((re) => lines.some((line) => re.test(line)))) {
        found.get(name).push(relative);
      }
    }
  }
  for (const [name, owner] of Object.entries(SINGLE_DEFINITION)) {
    assert.deepEqual(
      found.get(name),
      [owner],
      `${name} 的定义应为唯一一份（${owner}）`,
    );
  }
});

test('numeric.js 导出的名字都在唯一性表里（表不许悄悄缩水）', () => {
  assert.deepEqual(Object.keys(numeric).sort(), [...NUMERIC_NAMES].sort());
});
