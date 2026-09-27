/**
 * @file 穿环指令（COM87）部位位域 p 的跨模块存活态。
 *
 * 口上（kojo_message_com 的 SELECTCOM == 87 分支）与指令本体 com87 共用同一份。
 */
const piercing_state = { p: 0 };

module.exports = { piercing_state };
