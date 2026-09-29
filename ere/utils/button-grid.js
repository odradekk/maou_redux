/**
 * @file 按钮网格排版（#710 自 chara-and-hair.js 的 print_button_grid 集中，
 * 供列表页复用）。
 *
 * 正文一律不写 [编号] 前缀——引擎按 showAcc 自动拼 `[编号] 正文`，手写前缀
 * 会显示成 `[0] [0] …`（AGENTS.md 硬约束，PR #30 实机撞见）。
 */

'use strict';

const era = require('#/era-electron');

/** 栅格满行宽度（引擎 24 列） */
const GRID_COLUMNS = 24;

/**
 * 把 [编号, 正文] 列表排成按钮网格，每行 per_line 格。每格宽度按 per_line
 * 算而不按本行实际格数算，末行不满时各列仍与上面对齐。
 * @param {Array<[number, string]>} items 按钮编号与正文
 * @param {number} per_line 每行格数
 */
function print_button_grid(items, per_line) {
  const width = Math.floor(GRID_COLUMNS / per_line);
  for (let i = 0; i < items.length; i += per_line) {
    era.printMultiColumns(
      items.slice(i, i + per_line).map(([accelerator, content]) => ({
        type: 'button',
        accelerator,
        content,
        config: { align: 'left', width },
      })),
    );
  }
}

module.exports = { GRID_COLUMNS, print_button_grid };
