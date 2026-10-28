/**
 * @file 按钮编号常量的值域（#873）。
 *
 * #873 把各屏的固定按钮编号收进模块级常量（`const NAME_KEY = 999;`）。
 * child-id-collision 的两条静态不变量只认**纯数字字面量**，常量化之后那些
 * 编号从它的扫描面上消失——这里补上同一道防线：常量的值仍必须落在
 * FIRST_CHILD_ID 之下（后代 ID 从 100000 起，同屏撞号后点角色会触发功能
 * 按钮），且必须是非负整数。
 *
 * 扫描面是 `ere/` 下的全部模块：每屏的编号常量画在对应模块顶部（文件头
 * 约定）。与逐字面量扫描互补，不替代它——未常量化的字面量仍由
 * child-id-collision 负责。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const REPO_DIR = path.resolve(__dirname, '..');
const ERE_DIR = path.join(REPO_DIR, 'ere');
const MODULE_DIR = ERE_DIR;
const PREGNANCY_FILE = path.join(
  ERE_DIR,
  'system',
  'chara',
  'chara-pregnancy.js',
);

/** ere/ 下全部 .js（含各域子目录） */
function ere_sources(dir = MODULE_DIR, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      ere_sources(full, out);
    } else if (entry.name.endsWith('.js')) {
      out.push(full);
    }
  }
  return out;
}

/** chara-pregnancy.js 声明的 FIRST_CHILD_ID（值与它同源，不复制字面量） */
function first_child_id() {
  const text = fs.readFileSync(PREGNANCY_FILE, 'utf8');
  const m = /^const FIRST_CHILD_ID = (\d+);$/m.exec(text);
  assert.ok(m, 'chara-pregnancy.js 必须声明 FIRST_CHILD_ID 常量');
  return Number(m[1]);
}

/**
 * 模块级编号常量：`const NAME_KEY = 123;` 一行一条。
 * 只认 `_KEY` 后缀——数据编号（角色 ID、道具序号）不设常量，也不该被这条
 * 规则约束。
 * @returns {Array<{file: string, line: number, name: string, value: number}>}
 */
function key_constants() {
  const found = [];
  for (const file of ere_sources()) {
    const relative = path.relative(REPO_DIR, file);
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
    lines.forEach((line, i) => {
      const m = /^const ([A-Z0-9_]+_KEY) = (\d+);/.exec(line);
      if (m) {
        found.push({
          file: relative,
          line: i + 1,
          name: m[1],
          value: Number(m[2]),
        });
      }
    });
  }
  return found;
}

test('按钮编号常量的值都小于 FIRST_CHILD_ID（常量化后的撞号防线）', () => {
  const limit = first_child_id();
  const constants = key_constants();
  assert.ok(
    constants.length >= 40,
    `扫描面异常：只找到 ${constants.length} 个 *_KEY 常量（编号常量应画在各屏模块顶部）`,
  );
  // 扫描面从 `ere/page/` 扩到 `ere/` 之后，三处都必须仍在里面：page/ 的旧常量
  // 与本批新增的 system/、event/ 常量。少了任何一处就说明递归被改窄了——
  // 那条「覆盖面不许靠改名悄悄换掉」的检查靠这一段。
  const dirs = new Set(
    constants.map((c) => c.file.split(/[\\/]/).slice(0, 2).join('/')),
  );
  for (const dir of ['ere/page', 'ere/system', 'ere/event']) {
    assert.ok(
      dirs.has(dir),
      `扫描面必须包含 ${dir}（扫描根是 ere/，逐层递归）`,
    );
  }

  const offenders = constants
    .filter(
      (c) => !Number.isInteger(c.value) || c.value < 0 || c.value >= limit,
    )
    .map((c) => `${c.file}:${c.line} 的 ${c.name} = ${c.value}`);
  assert.deepEqual(
    offenders,
    [],
    `按钮编号常量必须是非负整数且小于 FIRST_CHILD_ID = ${limit}：\n` +
      offenders.join('\n'),
  );
});
