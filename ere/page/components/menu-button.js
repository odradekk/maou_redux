/**
 * @file 菜单按钮排版助手（#73 自 page-main-menu 收敛，全项目唯一落点）。
 *
 * 源: target/ERB/其他/DRAW_EXT_COMM.ERB  @MENU_BUTTON（:2，按钮明暗的近似）
 *
 * ▌ 前缀不在原函数里——原作调用方把 ▌ 写进正文串（UNICODE(0x258c)），ere
 * 侧统一由本助手拼接，净效果等价。
 *
 * 两条既有 UI 结论（不得破坏，#73 验收点名）：
 *   1. 按钮正文一律不写 [编号] 前缀——引擎 showAcc 默认为真，渲染时自动拼
 *      `[快捷键] 正文` 并把正文里的连续空白折叠成一个空格，手写前缀会得到
 *      「[0] [0] 旧的奴隶」（PR #30 实机撞见）；
 *   2. 未选中（原作 ARG:2 == 1）的调暗 = SETCOLOR(GETDEFCOLOR() - 0x444444)
 *      ＝ #bbbbbb。color 直通 el-button 的 --el-button-text-color（app.asar
 *      实证），须为十六进制串——命名色在 hover 态会拼出非法值。
 */

const era = require('#/era-electron');

const MENU_BUTTON_DIM_COLOR = '#bbbbbb';

/**
 * 打印一枚菜单按钮（@MENU_BUTTON 的近似）：未选中时调暗。
 * @param {string} label 按钮正文（不含 ▌，本函数统一加）
 * @param {number} accelerator 按钮编号（原作 ARG:3，输入分发用）
 * @param {boolean} dim 未选中标志（原作 ARG:2：真 = 调暗）
 */
function menu_button(label, accelerator, dim) {
  era.printButton(
    `▌${label}`,
    accelerator,
    dim ? { color: MENU_BUTTON_DIM_COLOR } : undefined,
  );
}

module.exports = { menu_button, MENU_BUTTON_DIM_COLOR };
