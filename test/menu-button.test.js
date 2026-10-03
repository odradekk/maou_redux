'use strict';

/**
 * ere/page/components/menu-button.js 的行为测试（#724 起随画面组件删除，
 * 本文件只剩排版助手的直接断言；换屏入口的测试在 test/screen-change.test.js，
 * 各页面接入换屏的测试在 test/subpage-clear-screen.test.js）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点，issue #16）。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

test('menu_button：▌ 前缀、正文不写编号前缀（引擎自动拼）、未选中调暗', () => {
  const fixture = create_era_fixture();
  const { menu_button, MENU_BUTTON_DIM_COLOR } = fixture.load_module(
    'page/components/menu-button',
  );

  menu_button('调教目标', 496, true);
  menu_button('助手', 497, false);
  const [dim, lit] = fixture.lines;

  // 正文只带 ▌、不写 [496]（引擎 showAcc 默认为真、自动拼快捷键前缀，
  // 手写会得到 [496] [496] ▌调教目标——PR #30 实机撞见）
  assert.equal(dim.text, '▌调教目标');
  assert.equal(dim.rendered, '[496] ▌调教目标');
  // 未选中调暗：GETDEFCOLOR() - 0x444444 ＝ #bbbbbb（十六进制串直通
  // el-button，命名色在 hover 态拼出非法值——app.asar 实证）
  assert.equal(dim.color, MENU_BUTTON_DIM_COLOR);
  assert.equal(dim.color, '#bbbbbb');

  assert.equal(lit.text, '▌助手');
  assert.equal(lit.rendered, '[497] ▌助手');
  assert.equal(lit.color, undefined); // 选中态不传 color
});
