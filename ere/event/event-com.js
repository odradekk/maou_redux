/**
 * @file 指令执行前事件 EVENTCOM 的处理器（issue #44，#PRI 档真身）。
 * 处理内容只有回合旗标清理与逐行重绘抑制两步：TFLAG 的 [0, 30) 半开
 * 区间（0..29）一并清零；逐行重绘抑制没有对应语义，不镜像
 * （page-shop/page-title 同款先例）。
 */

const era = require('#/era-electron');
const { on, TIER } = require('#/system/event/registry');
const { EVENT } = require('#/data/event-name-const');

async function handle_com_pri() {
  // TFLAG:0～30 はコマンドを選択する度に空にする（半开区间 0..29）
  for (let i = 0; i < 30; i += 1) {
    era.set(`tflag:${i}`, 0);
  }
  // TFLAG:100 = 0
  era.set('tflag:100', 0);
  // 逐行重绘抑制 —— 不镜像（没有对应语义）
}

/**
 * 本模块的事件处理器：由 system/flow/startup.js 的装配表按顺序调用 register()
 * 注册（模块装载本身不注册，装配顺序见该文件）。
 */
function register() {
  on(EVENT.COM, handle_com_pri, TIER.PRI);
}

module.exports = { register };
