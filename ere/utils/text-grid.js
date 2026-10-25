/**
 * @file 文本表格的按行切格（printMultiColumns 的行循环）与「名字 + 数值」
 * 一格的列结构。
 *
 * ere 的 24 列网格里，一行表格 = 一次 `printMultiColumns`，每格是一个 text
 * 网格对象（24 列由格宽之和决定）。信息类表格（经验一览、保有珠一览）都是
 * 「每行固定项数、每项名字 + 右对齐数值」，切行逻辑只差每行格数——收在这里，
 * 别处再写一份 for 循环就分叉了。
 *
 * 列对齐交给网格：格宽（`config.width`）定列位置，数值格用
 * `config.align: 'right'` 右对齐（引擎渲染层的 text-align），不再用补位
 * 函数把字符串凑成定宽——那条路依赖字体宽度估算，实机会错位。
 */

'use strict';

const era = require('#/era-electron');

/** 名字格的列宽（四项一行：名字 3 + 数值 2 + 间距 1 = 6 列/项） */
const NAME_WIDTH = 3;
/** 数值格的列宽（右对齐，够 5 位数字） */
const VALUE_WIDTH = 2;
/**
 * 项间间距格的列宽。
 *
 * 数值格右对齐时，数字的右缘正好落在格边界上，下一项的名字会贴上来——
 * 引擎实机截图里是 `0私处点数：`。留一格出来当间隔（空文本格，什么都不写）。
 */
const GAP_WIDTH = 1;
/** 每项占的格数（名字 + 数值 + 间距） */
const CELLS_PER_ITEM = 3;

/**
 * 把一串格子按每行 `per_row` 格切开，逐行交给 `printMultiColumns`。
 *
 * 末行不满时按实际格数输出（余下的列留空，不补占位格）。
 *
 * @param {Array<object>} cells 网格对象（text / button 等），按显示顺序排列
 * @param {number} per_row 每行格数（格宽之和应为 24）
 */
function print_cell_grid(cells, per_row) {
  for (let start = 0; start < cells.length; start += per_row) {
    era.printMultiColumns(cells.slice(start, start + per_row));
  }
}

/**
 * 表格一项的三格：名字格（左对齐）+ 数值格（右对齐）+ 间距格。
 *
 * @param {string} name 名字（调用方已按显示宽度截断）
 * @param {number|string} value 数值
 * @returns {Array<object>} 三个 text 网格对象
 */
function name_value_cells(name, value) {
  return [
    {
      type: 'text',
      content: name,
      config: { align: 'left', width: NAME_WIDTH },
    },
    {
      type: 'text',
      content: String(value),
      config: { align: 'right', width: VALUE_WIDTH },
    },
    { type: 'text', content: '', config: { align: 'left', width: GAP_WIDTH } },
  ];
}

module.exports = {
  CELLS_PER_ITEM,
  print_cell_grid,
  name_value_cells,
};
