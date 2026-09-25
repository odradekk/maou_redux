/**
 * ere/utils/display-width.js 的行为测试（#577）。
 *
 * #577 起补位字符从半角空格（U+0020）改为不换行空格（U+00A0）：引擎渲染层
 * 没有 white-space 设置，连续 U+0020 按浏览器默认规则合并成一个，按空格
 * 补齐的列对齐在实机全部失效；U+00A0 不被合并、且在引擎等宽字体
 * （EraMono SC）里占 1 个半角宽，与 display_width 的量尺一致（实测依据见
 * issue #577 的决定评论）。这里把补位字符与宽度算法一并锁住。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const {
  NBSP,
  display_width,
  pad_display,
  pad_left,
  slice_display,
} = require('../ere/utils/display-width');

test('NBSP 常量是 U+00A0（源码一律以转义序列书写，不写裸字符）', () => {
  assert.equal(NBSP, '\u00A0');
  assert.equal(NBSP.codePointAt(0), 0xa0);
});

test('display_width：全角 2 / 半角 1 / NBSP 按 1 计（补位串宽度自洽的前提）', () => {
  assert.equal(display_width('ABC'), 3);
  assert.equal(display_width('汉字'), 4);
  assert.equal(display_width('A汉字1'), 6);
  // NBSP 码点 0xA0 ≤ 0xFF → 半角 1：补完后整串宽度恰等于目标宽
  assert.equal(display_width(NBSP), 1);
  assert.equal(display_width(`${NBSP}${NBSP}A`), 3);
});

test('pad_display：左对齐，右侧补 NBSP 到目标显示宽度', () => {
  assert.equal(pad_display('A', 3), `A${NBSP}${NBSP}`);
  // 全角按 2 计：4 宽 + 2 格补位
  assert.equal(pad_display('汉字', 6), `汉字${NBSP}${NBSP}`);
  assert.equal(pad_display('汉字', 4), '汉字');
});

test('pad_display：已达/超过目标宽时不补、不截断（Emuera %,N,LEFT% 同款）', () => {
  assert.equal(pad_display('ABC', 3), 'ABC');
  assert.equal(pad_display('ABCD', 3), 'ABCD');
});

test('pad_left：右对齐，左侧补 NBSP 到目标显示宽度', () => {
  assert.equal(pad_left('5', 3), `${NBSP}${NBSP}5`);
  assert.equal(pad_left('555', 3), '555');
  assert.equal(pad_left('5555', 3), '5555');
});

test('两个补位函数的补位串不含 U+0020（含一个即实机列对齐失效）', () => {
  for (const text of ['A', '汉字', 'XY', '全角混half', '1234567890']) {
    for (const width of [1, 4, 12]) {
      assert.ok(
        !pad_display(text, width).includes(' '),
        `pad_display(${text}, ${width}) 混入半角空格`,
      );
      assert.ok(
        !pad_left(text, width).includes(' '),
        `pad_left(${text}, ${width}) 混入半角空格`,
      );
    }
  }
});

test('补位后的整串显示宽度恰等于目标宽（量尺与补位字符自洽）', () => {
  assert.equal(display_width(pad_display('A', 7)), 7);
  assert.equal(display_width(pad_display('汉字', 7)), 7);
  assert.equal(display_width(pad_left('5', 7)), 7);
});

test('slice_display 回归：按显示宽度截断（本票不改它的行为）', () => {
  assert.equal(slice_display('调教自慰经验', 8), '调教自慰');
  assert.equal(slice_display('ABC', 8), 'ABC');
});
