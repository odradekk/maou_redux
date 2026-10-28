/**
 * @file 指令执行前的旗标清理（旧引擎 EVENTCOM 的原处理器，#44）。
 * 处理内容只有回合旗标清理与逐行重绘抑制两步：TFLAG 的 [0, 30) 半开
 * 区间（0..29）一并清零；逐行重绘抑制没有对应语义，不镜像
 * （page-shop/page-title 同款先例）。
 *
 * 只有一个调用者，不再走事件总线：调教回合循环在指令分发前直接调用
 * （#853）。原来挂在链上的 #PRI 档随之消失——那时 #PRI 只用来保证本函数
 * 排在其它处理器之前。
 */

const era = require('#/era-electron');

async function handle_com() {
  // TFLAG:0～30 はコマンドを選択する度に空にする（半开区间 0..29）
  for (let i = 0; i < 30; i += 1) {
    era.set(`tflag:${i}`, 0);
  }
  // TFLAG:100 = 0
  era.set('tflag:100', 0);
  // 逐行重绘抑制 —— 不镜像（没有对应语义）
}

module.exports = { handle_com };
