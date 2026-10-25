/**
 * @file 秘密实验室的分层契约（#888）：页面只做显示与输入，数值与写档在
 * system/labo 下。
 *
 * 这张工单的验收标准是「页面文件只负责显示和输入」，靠眼里看代码守不住——
 * 后来加一个条目时顺手把写入写回页面，测试全绿也没人发现。所以这里把两侧的
 * 边界写成断言：
 *
 *   1. `ere/page/page-shop-labo.js` 里没有存档写入（`era.set`、门面属性赋值、
 *      `era.addCharacter`、`era_flag.* = …`）；
 *   2. `ere/system/labo/*` 里没有输出与输入调用（不打印、不等键、不读输入）——
 *      提示文案一律经返回值交回页面，页面才知道「哪一句在什么时候说」。
 *
 * 注释行不参与判定：文件头与本文件的说明里会引用这些写法（「写档在
 * system/labo」「apply 返回文案」），它们是文档而不是代码。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const ROOT = path.join(__dirname, '..');

/**
 * 去掉注释行（`//`、块注释正文），只留代码行。
 * @param {string} source 源码
 * @returns {{line: number, text: string}[]} 代码行
 */
function code_lines(source) {
  const out = [];
  let in_block = false;
  source.split('\n').forEach((text, index) => {
    const trimmed = text.trim();
    if (in_block) {
      if (trimmed.includes('*/')) {
        in_block = false;
      }
      return;
    }
    if (trimmed.startsWith('/*')) {
      if (!trimmed.includes('*/')) {
        in_block = true;
      }
      return;
    }
    if (trimmed.startsWith('//') || trimmed === '') {
      return;
    }
    out.push({ line: index + 1, text });
  });
  return out;
}

/** 存档写入的写法（页面里一处都不该有） */
const WRITE_PATTERNS = [
  [/\bera\.set\(/, 'era.set 直接写变量'],
  [/\bera\.addCharacter\(/, 'era.addCharacter 加角色'],
  [/\bera_exflag\.\w+\s*(?:[-+*/]?=)[^=]/, 'era_exflag 写'],
  [/\bera_flag\.\w+\s*(?:[-+*/]?=)[^=]/, 'era_flag 写'],
  [/\bchara\([^)]*\)\.\w+\.\w+\s*(?:[-+*/]?=)[^=]/, '角色门面写'],
  [/\bgame\.\w+\.\w+\s*(?:[-+*/]?=)[^=]/, '游戏门面写'],
];

/** 输出与输入的写法（system/labo 里一处都不该有） */
const IO_PATTERNS = [
  [/\bera\.print\(/, 'era.print'],
  [/\bera\.printButton\(/, 'era.printButton'],
  [/\bera\.printAndWait\(/, 'era.printAndWait'],
  [/\bera\.input\(/, 'era.input'],
  [/\bera\.waitAnyKey\(/, 'era.waitAnyKey'],
  [/\bera\.drawLine\(/, 'era.drawLine'],
];

/** 读一份源码并找出命中给定模式的行 */
function offenders(rel_path, patterns) {
  const source = fs.readFileSync(path.join(ROOT, rel_path), 'utf8');
  const hits = [];
  for (const { line, text } of code_lines(source)) {
    for (const [pattern, label] of patterns) {
      if (pattern.test(text)) {
        hits.push(`${rel_path}:${line} ${label} —— ${text.trim()}`);
      }
    }
  }
  return hits;
}

test('页面不写存档：写档全部在 system/labo 下（#888）', () => {
  assert.deepEqual(
    offenders('ere/page/page-shop-labo.js', WRITE_PATTERNS),
    [],
    '页面里出现了存档写入——搬回 system/labo 的条目或 apply 里',
  );
});

test('system/labo 不打字不收输入：文案经返回值交回页面（#888）', () => {
  for (const rel_path of [
    'ere/system/labo/labo-calc.js',
    'ere/system/labo/labo-entries.js',
  ]) {
    assert.deepEqual(
      offenders(rel_path, IO_PATTERNS),
      [],
      `${rel_path} 里出现了输出/输入调用——改成返回要打印的行`,
    );
  }
});

test('条目表与数值层各自导出页面要用的面（#888）', () => {
  const fixture = require('./helpers/era-fixture').create_era_fixture();
  const calc = fixture.load_module('system/labo/labo-calc');
  const entries = fixture.load_module('system/labo/labo-entries');
  const page = fixture.load_module('page/page-shop-labo');

  // 条目表的每一项都要能被页面的 run_modify 驱动
  for (const [name, item] of Object.entries(entries.LABO_ITEMS)) {
    assert.equal(typeof item.price, 'number', `${name} 缺 price`);
    assert.equal(typeof item.poor, 'string', `${name} 缺 poor`);
    assert.ok(Array.isArray(item.intro), `${name} 缺 intro`);
    assert.equal(typeof item.guard, 'function', `${name} 缺 guard`);
    assert.equal(typeof item.confirm, 'function', `${name} 缺 confirm`);
    assert.equal(typeof item.apply, 'function', `${name} 缺 apply`);
  }

  // 页面仍然导出全部条目入口（page-shop.js 与测试从这里取）
  for (const name of [
    'secret_labo',
    'pick_slave',
    'run_modify',
    'modify_bonyu',
    'summon_slave',
    'resulection',
    'demon_rebirth',
    'st_up_labo',
  ]) {
    assert.equal(typeof page[name], 'function', `页面缺导出 ${name}`);
  }

  // 数值层的三个「谁在拦」判据由页面与条目表共用
  for (const name of [
    'can_revive',
    'revive_candidates',
    'summon_candidates',
    'block_feeling_rows',
    'demon_options',
    'specialtalent_swap',
  ]) {
    assert.equal(typeof calc[name], 'function', `数值层缺导出 ${name}`);
  }
});
