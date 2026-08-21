/**
 * @file 回合结束事件 @EVENTTURNEND 的 #PRI 壳（issue #44——只为调教闭环
 * 提供出口，本体待办）。
 *
 * 源: target/ERB/EVENT/EVENT_TURNEND.ERB  @EVENTTURNEND（:8-140，#PRI）
 *
 * 原作 @EVENTTURNEND 有三处定义（#6 的论证样本）：#PRI（本壳）、普通
 * （SYSTEM ver1.0.3.ERB:234-760，回合结算本体：HP/装备回复、队伍设定、
 * 迷宫处理，尾部 :758 BEGIN SHOP）、#LATER（ENDING ver 1.0.1.ERB:1，空）。
 * #PRI 定义 :140 无条件 BEGIN SHOP——那是「调教 → 回合结算 → 回主菜单」
 * 闭环上真实的出口，本壳保留出口、本体（:8-139 的遇敌/日程等）整段待办，
 * 登记见 docs/stub-registry.md（回合结算票）。
 *
 * 普通档的回合结算本体与 #LATER 空定义尚未接入：接入后本壳与它们在同一条
 * 链上先后执行（#6 语义），出口以最后一个 BEGIN 为准（同为 SHOP，不受
 * 影响）。
 */

const era = require('#/era-electron');
const { on, TIER } = require('#/system/event/registry');
const { begin, STATE } = require('#/system/flow/begin-signal');

/**
 * 本文件存根化的原作调用名（#PRI 本体的代表调用；完整待办见
 * docs/stub-registry.md 的回合结算两行）。
 */
const STUBBED_CALLS = ['EVENT_NEXTDAY'];

on(
  'EVENTTURNEND',
  async () => {
    // :8-139 本体待办：日程推进（EVENT_NEXTDAY）、随机遇敌（ENTER_ENEMY）、
    // 迷宫处理等——整段随回合结算票移植（占位行带出处可检索）
    era.print(
      '（回合结算尚未移植，此处为占位——原作 @EVENTTURNEND（#PRI 本体 EVENT_NEXTDAY 等）与 SYSTEM ver1.0.3.ERB 的普通档定义，见 docs/stub-registry.md。）',
    );

    // :140 BEGIN SHOP —— 无条件出口，1:1 保留（#6 用 emuera.log 证明的
    // 原作行为：链继续、最后 BEGIN 胜出）
    begin(STATE.SHOP);
  },
  TIER.PRI,
);

module.exports = { STUBBED_CALLS };
