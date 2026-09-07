/**
 * @file 菜单按钮排版助手（#73 自 page-main-menu 收敛，全项目唯一落点）。
 *
 * 源: target/ERB/其他/DRAW_EXT_COMM.ERB  @MENU_BUTTON（:2，按钮明暗的近似）、
 *     @PRINT_COLORBAR（:22）、@PRINT_COLORBAR2（:54）、@BARCOLORSET（:76）
 *
 * ▌ 前缀不在原函数里——原作调用方把 ▌ 写进正文串（UNICODE(0x258c)），ere
 * 侧统一由本助手拼接，净效果等价。
 *
 * 两条既有 UI 结论（不得破坏，#73 验收报出）：
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

/** @param {number} value Emuera 的 0xRRGGBB 数值 */
function color_hex(value) {
  return `#${(value & 0xffffff).toString(16).padStart(6, '0')}`;
}

/**
 * @PRINT_COLORBAR（DRAW_EXT_COMM.ERB:22-42）：打印定宽双色条。
 */
function print_colorbar(
  value,
  maximum,
  width,
  fill = '*',
  empty = '.',
  fill_color,
  empty_color,
) {
  const filled = Math.trunc((value * width) / maximum);
  const content = [];
  const in_text = fill.repeat(Math.max(0, Math.min(width, filled)));
  const out_text = empty.repeat(Math.max(0, width - Math.max(0, filled)));
  if (in_text) content.push({ content: in_text, color: color_hex(fill_color) });
  if (out_text)
    content.push({ content: out_text, color: color_hex(empty_color) });
  return era.print(content);
}

/**
 * @PRINT_COLORBAR2（DRAW_EXT_COMM.ERB:54-69）：逐格渐变的彩条。
 */
function print_colorbar2(
  value,
  maximum,
  width,
  fill = '*',
  empty = '.',
  fill_color,
  empty_color,
  gradient = 0,
) {
  const step = maximum / (width + width / 32);
  const content = [];
  let remaining = value;
  for (let count = 0; count < width; count += 1) {
    remaining -= step;
    content.push({
      content: remaining >= 0 ? fill : empty,
      color: color_hex(
        remaining >= 0 ? fill_color - gradient * count : empty_color,
      ),
    });
  }
  return era.print(content);
}

/** @BARCOLORSET（DRAW_EXT_COMM.ERB:76-111）的前景/背景配色。 */
function bar_color_set(name) {
  const colors = {
    深红: [0xf06050, 0x701000],
    红: [0xc07070, 0x502020],
    蓝: [0x7070c0, 0x202050],
    藏青: [0x6666ff, 0x000000],
    绿: [0x66dd66, 0x205020],
    紫: [0xc070c0, 0x502050],
    黄: [0xc0b050, 0x505020],
    粉: [0xffccff, 0x300020],
    青绿: [0x70c0c0, 0x205050],
    灰: [0x666666, 0x333333],
  };
  const [foreground, background] = colors[name] ?? [0xc0c0c0, 0x202020];
  return { foreground, background };
}

module.exports = {
  menu_button,
  MENU_BUTTON_DIM_COLOR,
  print_colorbar,
  print_colorbar2,
  bar_color_set,
};
