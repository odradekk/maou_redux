/**
 * @file COM87 穿环部位位域 P 的跨模块存活态。
 *
 * 口上（KOJO_MESSAGE_COM 的 SELECTCOM == 87）与 @COM87 本体读同一份。
 */
const piercing_state = { p: 0 };

module.exports = { piercing_state };
