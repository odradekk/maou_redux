/**
 * @file 回合结束事件 @EVENTTURNEND 的 #LATER 档定义（issue #114——按 1:1
 * 保留为空）。
 *
 * 源: target/ERB/EVENT/ENDING ver 1.0.1.ERB  @EVENTTURNEND（:1-3，#LATER）
 *
 * 原作此处只有函数头、#LATER 标记与一行注释「;エンディングチェック」——
 * 函数体为空，1:1 保留为空（工单 #114 的明确要求）。结局检查的实际链路是
 * @ENDCHECK（#116）；若该票或 #118（ENDING_1 分派）需要在此挂处理器，本
 * 文件就是接入点。链序：#PRI（ere/event/event-turnend.js）→ 普通档
 * （ere/system/turnend-settle.js）→ 本档，三档全部跑完后才提交跳转（#6）。
 */

const { on, TIER } = require('#/system/event/registry');

// 空处理器：原作即为空定义（:1-3），注册它以保留三档链结构与本文件的
// 接入点；体内无任何动作
on('EVENTTURNEND', async () => {}, TIER.LATER);

module.exports = {};
