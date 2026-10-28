/**
 * @file 「是的 / 不要」二选一提示（原 page-life-list 的同名函数）。
 *
 * 两个按钮一行、无效输入只重问不重画；返回值 0 = 是的、1 = 不要。
 *
 * 放在 utils 而不是页面里：它是和 `era.printButton` + `era.input` 同级的
 * 输入原语，系统层的若干流程（怪物数据内的确认、诱惑、迷宫恋人）也要用，
 * 而系统层不该为了一个二选一去 require 页面层。
 */

const era = require('#/era-electron');
const { print_button_grid } = require('#/utils/button-grid');

/**
 * 是 / 否二选一。
 * @returns {Promise<number>} 0 = 是的 / 1 = 不要
 */
async function select_yes_no() {
  for (;;) {
    print_button_grid(
      [
        [0, '是的'],
        [1, '不要'],
      ],
      2,
    );
    const result = await era.input();
    if (result === 0 || result === 1) return result;
  }
}

module.exports = { select_yes_no };
