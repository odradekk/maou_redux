/**
 * @file 显示宽度量尺，以及按宽度补位/截断——Emuera 的 `%v,N,LEFT/RIGHT%`
 * 与 `%SUBSTRING(s,0,N)%` 的等价物。
 *
 * 源: 无对应源（引擎语法层的等价物，不是某个 ERB 函数）。语义出自 Emuera
 *     的 FORM 语法（emuera-basic-agent-guide 的 core-concepts/expressions.md
 *     「FORM 语法中的位数和对齐」）：**全角算 2 列、半角 1 列，`%,N%` 默认
 *     右对齐、`%,N,LEFT%` 左对齐**。Emuera 位数不足补半角空格；#577 起
 *     补位字符改为 NBSP（U+00A0）——引擎渲染层合并连续半角空格，空格补位
 *     的列对齐在实机失效（见下方 NBSP 的注释）。
 *
 * 三个函数的先例在 ere/page/page-info-exp.js（#47 的经验一览），#390 的角色
 * 信息显示链有五个消费方（标题行 / 状态块 / 素质 / 能力 / 交友），照项目
 * 「单一真相源」的做法提成本模块，page-info-exp.js 改从本模块取——同一个
 * 宽度量尺在两个文件里各写一份，改了其中一份不会有任何测试变红。
 *
 * 量尺本身是近似：Emuera 按 CP932 的字节数判定（>= 0x81 的字节算 2 列），
 * 这里取「码点 > 0xFF 即 2 列」。两者在本作语料（简体汉字 + 半角数字/拉丁）
 * 上一致，差异只出现在 Latin-1 补充区与半角片假名一类本作不产出的字符上。
 */

/**
 * 显示宽度（Emuera 的 `%,N,LEFT/RIGHT%` 补位基准）：全角 = 2、半角 = 1。
 * @param {string} text
 * @returns {number}
 */
function display_width(text) {
  let width = 0;
  for (const ch of text) {
    width += ch.charCodeAt(0) > 0xff ? 2 : 1;
  }
  return width;
}

/**
 * 不换行空格（U+00A0）：对齐补位专用字符。引擎渲染层对文本行没有
 * white-space 设置，连续的半角空格（U+0020）按浏览器默认规则合并成一个，
 * 按空格补齐的列对齐在实机全部失效；U+00A0 不被合并，且在引擎等宽字体
 * （EraMono SC）里占 1 个半角宽，与本量尺一致（#577，实测依据见 issue
 * 的决定评论）。源码里（含测试与注释）一律引用本常量或写 '\u00A0' 转义，
 * 不写裸字符：裸 U+00A0 在模板字面量与注释里会被 ESLint 的
 * no-irregular-whitespace 拦下（普通字符串字面量按该规则缺省放行，所以这条
 * 约定靠人守），prettier 也可能把它折叠掉。
 * 注意：按钮正文另有一层 `/\s+/g → ' '` 合并（引擎渲染层的按钮行构造器
 * P(e)，`printMultiColumns` 的按钮格同走它），JS 的 \s 连 U+00A0/U+3000
 * 一起合并——按钮正文里的对齐不能用 NBSP，那类位置按 #577 的普查表登记为
 * 已知差异（见 CONTEXT.md 的「输出 API 与原作的对应」）。
 * @type {string}
 */
const NBSP = '\u00A0';

/**
 * `%,N,LEFT%`：按显示宽度**右补** NBSP（左对齐）。
 * @param {string} text
 * @param {number} width 目标显示宽度
 * @returns {string}
 */
function pad_display(text, width) {
  return text + NBSP.repeat(Math.max(0, width - display_width(text)));
}

/**
 * `%,N%`（默认对齐）：按显示宽度**左补** NBSP（右对齐）。
 * @param {string} text
 * @param {number} width 目标显示宽度
 * @returns {string}
 */
function pad_left(text, width) {
  return NBSP.repeat(Math.max(0, width - display_width(text))) + text;
}

/**
 * 按显示宽度截断（`%SUBSTRING(name,0,N)%` 的等价物）。Emuera 的 SUBSTRING
 * 按 **Shift-JIS 字节数**截，全角 2 字节、半角 1 字节——与 display_width
 * 同一把尺子。证据：sale-natural-log:124 的 `调教自慰:     3` 出自
 * EXPNAME=「调教自慰经验」（6 字、12 字节），截 8 字节得 4 字「调教自慰」；
 * 按字符截会得到 6 字全名（#397 返工的 sale-natural 对拍实测）。
 * @param {string} text
 * @param {number} width 字节数上限
 * @returns {string}
 */
function slice_display(text, width) {
  let out = '';
  let used = 0;
  for (const ch of text) {
    const w = display_width(ch);
    if (used + w > width) break;
    out += ch;
    used += w;
  }
  return out;
}

module.exports = {
  NBSP,
  display_width,
  pad_display,
  pad_left,
  slice_display,
};
