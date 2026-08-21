/**
 * @file 存根占位行助手（全项目统一形状）。
 *
 * 源: 无对应源——存根是本项目的移植工程机制（docs/skeleton.md「存根是有
 *     记录的待办」；CONTEXT.md「存根」条目），先例在 page-main-menu.js
 *     （#23）与 event-first.js（#22），#44 起收敛为本模块。
 *
 * 两个变体，按调用时机分（#73 发回整改后确定）：
 *   - stub_line（绘制期）：一行可见反馈，纯输出。用于屏幕组屏途中（主菜单
 *     的面板/指令面板存根、page-train 的 SHOW_STATUS 存根）——组屏中途等键
 *     会卡住画面拼装，与原作相悖；
 *   - stub_line_wait（分发期）：同一行文案 + 等待读键。用于输入分发分支
 *     （page-shop 的 usershop 等）——主菜单自 #73 起就地重绘，分发期输出
 *     若不等键，会在玩家读到之前被下一轮重绘的锚点跨度清掉（实机外观
 *     劣于追加式现状，工单验收「不劣于现状」发回点）。等键 = 原作 PRINTW
 *     习语（print + 读键，如 SHOP_2.ERB:124-126 的「PRINTW 数值已超出
 *     允许范围外 + CLEARLINE 2 + GOTO」）；ere 侧以 print + waitAnyKey
 *     显式组合（引擎 printAndWait 内部即这两步，app.asar 逐字；夹具对
 *     等待的观测统一走 waitAnyKey 记录，故不走 printAndWait）。
 *
 * 运行时占位：一行可见反馈，正文含原作函数名（可检索、可断言——各文件的
 * STUBBED_CALLS 核对测试以「@函数名」出现在占位行为准）。owner 给出时
 * 追加归属说明（如「随装备票」）。
 */

const era = require('#/era-electron');

/**
 * 占位行文案（两个变体共用，保证核对断言只见一种形状）。
 * @param {string} erb_name 原作函数名（不含 @）
 * @param {string} note 未移植内容的中文说明
 * @param {string} [owner] 归属说明
 * @returns {string}
 */
function stub_text(erb_name, note, owner) {
  return `（${note}尚未移植，此处为占位——原作 @${erb_name}${owner ? `，${owner}` : ''}，见 docs/stub-registry.md。）`;
}

/**
 * 打一行存根占位（绘制期：纯输出，不等键）。
 * @param {string} erb_name 原作函数名（不含 @）
 * @param {string} note 未移植内容的中文说明
 * @param {string} [owner] 归属说明（可省；省略时文案少一截，与 event 侧
 *   两参先例逐字一致）
 */
function stub_line(erb_name, note, owner) {
  era.print(stub_text(erb_name, note, owner));
}

/**
 * 打一行存根占位并等待读键（分发期：玩家看到后才被重绘清掉）。
 * 参数与返回值语义同 stub_line；等键的引擎语义见文件头。
 * @param {string} erb_name 原作函数名（不含 @）
 * @param {string} note 未移植内容的中文说明
 * @param {string} [owner] 归属说明
 */
async function stub_line_wait(erb_name, note, owner) {
  era.print(stub_text(erb_name, note, owner));
  await era.waitAnyKey();
}

module.exports = { stub_line, stub_line_wait, stub_text };
