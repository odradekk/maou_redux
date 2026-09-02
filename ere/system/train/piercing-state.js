/**
 * @file COM87 穿环部位位域 P 的跨模块存活态。
 *
 * 源: target/ERB/調教相關/COMF87_ピアシング.ERB 的全局 P（跨 CALL
 *     TRAIN_MESSAGE_B / 口上读取）。ere 侧用模块级对象承载（com-caress.js
 *     的 order_state 同款先例，单线程回合制下安全）。
 *
 * 口上（KOJO_MESSAGE_COM 的 SELECTCOM == 87）与 @COM87 本体读同一份。
 */
const piercing_state = { p: 0 };

module.exports = { piercing_state };
