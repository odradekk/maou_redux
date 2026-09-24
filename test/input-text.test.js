/**
 * @file ere/utils/input-text.js 的单元用例（issue #567）：自由文本输入
 * （`INPUTS`）的空输入判据。
 *
 * 引擎事实两条（依据与被测模块的文件头同源，此处只记结论）：
 *
 *   1. `era.input()` 的回传值先过 `getNumber`（`Number(e); isNaN(t) ? e : t`，
 *      app.asar 模块 65）——**空串与 "0" 到手都是数值 0**、非数字串原样；
 *      test/helpers/era-fixture.js 的 `get_number` 逐字镜像（#151）。
 *   2. 渲染层不受理空提交（app.vue 的 returnFromInput 空守卫，
 *      dev-guides/05-interaction.md:124「不会是 undefined 或空字符串''」）。
 *
 * 两条合起来：#567 裁定的「0 即空输入」是 ere 侧走到原作空输入分支的唯一
 * 可达形态；本模块把它还原成空串。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function load(fixture) {
  return fixture.load_module('utils/input-text');
}

test('input_text：空输入（引擎归一后的数值 0）还原成空串', () => {
  const { input_text } = load(create_era_fixture());
  assert.equal(input_text(0), '', '0 = 空串与 "0" 的共同归一形态');
});

test('input_text：undefined / null 的缺值形态也归空串', () => {
  const { input_text } = load(create_era_fixture());
  assert.equal(input_text(undefined), '');
  assert.equal(input_text(null), '');
});

test('input_text：非数字串原样、数字字符串化（游戏读到的形态）', () => {
  const { input_text } = load(create_era_fixture());
  assert.equal(input_text('吾辈'), '吾辈', '非数字串原样返回');
  assert.equal(input_text(8), '8', '可数值化的输入到手是数字');
  assert.equal(input_text(-5), '-5');
});
