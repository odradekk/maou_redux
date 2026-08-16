/**
 * @file 新游戏初始化事件 @EVENTFIRST 的处理器（存根）。
 *
 * 源: target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB  @EVENTFIRST
 *
 * 真身归 issue #22：标题与主菜单之间的新游戏初始化段约 986 行（#15 实测，
 * 角色生成、地形、村庄、队伍编组、迷宫等约二十处调用），全部留给下游票。
 * 本存根只接住 T5 的转场——标题画面 `BEGIN FIRST`（TITLE ver1.0.8.ERB:103）
 * 经主循环进入本事件——并给出可见反馈；出口暂设为转回标题画面，保持游戏
 * 可玩、可实机验收。#22 落地时按原作语义改为进 SHOP 主循环（Emuera 在
 * @EVENTFIRST 链结束后自动进入商店轮）。
 */

const era = require('#/era-electron');
const { on } = require('#/system/event/registry');
const { begin, STATE } = require('#/system/flow/begin-signal');

// 注册在模块顶层（往注册表塞函数，不碰 era.*——引擎允许；era.* 只在处理器
// 函数体内调用，#6 的两条硬规则之二）。普通档：原作 @EVENTFIRST 的其他
// 定义随各自所属票接入。
on('EVENTFIRST', async () => {
  era.print('（新游戏初始化尚未移植，此处为占位反馈——见 issue #22。）');
  await era.waitAnyKey();
  // 存根出口：回标题。真身按原作进 SHOP（issue #22）。
  begin(STATE.TITLE);
});
