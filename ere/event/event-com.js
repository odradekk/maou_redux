/**
 * @file 指令执行前事件 @EVENTCOM 的处理器（issue #44，#PRI 档真身）。
 *
 * 源: target/ERB/調教相關/TRAIN_MAIN.ERB  @EVENTCOM（:261-268，#PRI）
 *
 * 原作全文三行：回合旗标清理 + REDRAW。VARSET TFLAG, 0, 0, 30 清的是
 * [0, 30) 半开区间（0..29）；REDRAW 1（抑制逐行重绘）无 ere 对应语义，
 * 不镜像（page-shop/page-title 同款先例）。
 */

const era = require('#/era-electron');
const { on, TIER } = require('#/system/event/registry');

on(
  'EVENTCOM',
  async () => {
    // :264 TFLAG:0～30 はコマンドを選択する度に空にする（VARSET 半开区间，
    // 0..29）
    for (let i = 0; i < 30; i += 1) {
      era.set(`tflag:${i}`, 0);
    }
    // :265 TFLAG:100 = 0
    era.set('tflag:100', 0);
    // :267 REDRAW 1 —— 不镜像（无 ere 对应语义）
  },
  TIER.PRI,
);

module.exports = {};
