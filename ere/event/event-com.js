/**
 * @file 指令执行前事件 EVENTCOM 的处理器（issue #44，#PRI 档真身）。
 * 处理内容只有回合旗标清理与逐行重绘抑制两步：TFLAG 的 [0, 30) 半开
 * 区间（0..29）一并清零；逐行重绘抑制没有对应语义，不镜像
 * （page-shop/page-title 同款先例）。
 */

const era = require('#/era-electron');
const { on, TIER } = require('#/system/event/registry');

on(
  'EVENTCOM',
  async () => {
    // TFLAG:0～30 はコマンドを選択する度に空にする（半开区间 0..29）
    for (let i = 0; i < 30; i += 1) {
      era.set(`tflag:${i}`, 0);
    }
    // TFLAG:100 = 0
    era.set('tflag:100', 0);
    // 逐行重绘抑制 —— 不镜像（没有对应语义）
  },
  TIER.PRI,
);

module.exports = {};
