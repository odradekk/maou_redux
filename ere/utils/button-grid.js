/**
 * @file 按钮网格排版（#710 自 chara-and-hair.js 的 print_button_grid 集中，
 * 供列表页复用；#717 扩展单格按钮配置与不可点的文本占位格）。
 *
 * 正文一律不写 [编号] 前缀——引擎按 showAcc 自动拼 `[编号] 正文`，手写前缀
 * 会显示成 `[0] [0] …`（AGENTS.md 硬约束，PR #30 实机撞见）。
 */

'use strict';

const era = require('#/era-electron');

/** 栅格满行宽度（引擎 24 列） */
const GRID_COLUMNS = 24;

/**
 * 把网格项列表排成按钮网格，每行 per_line 格。每格宽度按 per_line
 * 算而不按本行实际格数算，末行不满时各列仍与上面对齐。
 * @param {Array<[number, string] | [number, string, object] | {content: string, config?: object}>} items
 *   [编号, 正文] 或 [编号, 正文, config]：按钮格，config 合并进该格的
 *   按钮配置（如过滤钮的 color）；
 *   { content, config }：不可点的文本占位格（仍占一格，如主菜单的
 *   [---]），config 可带 color
 * @param {number} per_line 每行格数
 */
function print_button_grid(items, per_line) {
  const width = Math.floor(GRID_COLUMNS / per_line);
  for (let i = 0; i < items.length; i += per_line) {
    era.printMultiColumns(
      items.slice(i, i + per_line).map((item) =>
        Array.isArray(item)
          ? {
              type: 'button',
              accelerator: item[0],
              content: item[1],
              config: { align: 'left', width, ...item[2] },
            }
          : {
              type: 'text',
              content: item.content,
              config: { align: 'left', width, ...item.config },
            },
      ),
    );
  }
}

module.exports = { GRID_COLUMNS, print_button_grid };
