/**
 * @file 存根占位行助手（全项目统一形状）。
 *
 * 源: 无对应源——存根是本项目的移植工程机制（docs/skeleton.md「存根是有
 *     记录的欠账」；CONTEXT.md「存根」条目），先例在 page-main-menu.js
 *     （#23）与 event-first.js（#22），#44 起收敛为本模块。
 *
 * 运行时占位：一行可见反馈，正文含原作函数名（可检索、可断言——各文件的
 * STUBBED_CALLS 对账测试以「@函数名」出现在占位行为准）。owner 给出时
 * 追加归属说明（如「随装备票」）。
 */

const era = require('#/era-electron');

/**
 * 打一行存根占位。
 * @param {string} erb_name 原作函数名（不含 @）
 * @param {string} note 未移植内容的中文说明
 * @param {string} [owner] 归属说明（可省；省略时文案少一截，与 event 侧
 *   两参先例逐字一致）
 */
function stub_line(erb_name, note, owner) {
  era.print(
    `（${note}尚未移植，此处为占位——原作 @${erb_name}${owner ? `，${owner}` : ''}，见 docs/stub-registry.md。）`,
  );
}

module.exports = { stub_line };
