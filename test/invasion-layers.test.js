'use strict';

/**
 * @file 侵略页的引用方向扫描（issue #887）。
 *
 * 侵略主流程（出兵、中途事件、据点横幅、结局判定）在 system/invasion/ 下，
 * 页面只留画面（入侵入口分派、地上征服后菜单、水晶球投放）。页面是被系统层
 * 与事件层驱动的画面，只有 page/ 下的模块可以组合它：system/ 再 require
 * 回去就是「回合结算反过来引用画面」的老问题，玩家侧的表现是回合结算的
 * 数值走向被界面代码决定，改界面会改存档。
 *
 * 扫描对全库生效，不看调用点是否已列名——新写一处反向引用会在这里红。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const ERE_DIR = path.resolve(__dirname, '..', 'ere');

/** 页面模块的 require 形态（`#/` 别名，单引号或双引号都算） */
const REQUIRES_PAGE_INVASION =
  /require\(\s*['"]#\/page\/page-invasion['"]\s*\)/;

/**
 * 递归列出 ere/ 下的 .js 文件（相对 ere/ 的 POSIX 路径）。
 * @param {string} dir 目录
 * @returns {string[]} 相对路径
 */
function list_js_files(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...list_js_files(full));
    } else if (entry.name.endsWith('.js')) {
      out.push(path.relative(ERE_DIR, full).split(path.sep).join('/'));
    }
  }
  return out;
}

test('只有 page/ 下的模块可以引用 page-invasion', () => {
  const offenders = list_js_files(ERE_DIR)
    .filter((name) => !name.startsWith('page/'))
    .filter((name) =>
      REQUIRES_PAGE_INVASION.test(
        fs.readFileSync(path.join(ERE_DIR, name), 'utf8'),
      ),
    )
    .sort();
  assert.deepEqual(
    offenders,
    [],
    `系统层与事件层不得引用 page-invasion：${offenders.join(', ')}`,
  );
});

test('page-invasion 只剩画面：不再导出出兵与事件的逻辑入口', () => {
  const source = fs.readFileSync(
    path.join(ERE_DIR, 'page', 'page-invasion.js'),
    'utf8',
  );
  // 逻辑入口的导出名：留在页面上就是「逻辑又长回页面里」的信号
  for (const name of [
    'invasion_check',
    'invasion_event',
    'invasion_event_challenge',
    'invasion_event_fort',
    'invasion_event_seiei',
    'kyoten_event',
    'medal_bonus',
    'start_campaign',
  ]) {
    assert.equal(
      new RegExp(`\\b${name},?\\n`).test(
        source.slice(source.indexOf('module.exports')),
      ),
      false,
      `page-invasion 不应导出 ${name}`,
    );
  }
});
