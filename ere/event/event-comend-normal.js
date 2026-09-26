/**
 * @file 指令结束事件 @EVENTCOMEND 的**无属性档**定义（issue #401）。
 *
 * 源: target/ERB/EVENT/EVENT1.ERB  @EVENTCOMEND（:1-9）
 *
 * == 引擎保留事件名的多定义（结论来自 emuera-basic-agent-guide） ==
 *
 * `@EVENTCOMEND` 全库零 `CALL` 调用点——它是**引擎保留事件名**，由引擎在
 * 一条调教指令执行完之后自动派发（system-flow.md「5. 命令结束处理：调用
 * @EVENTCOMEND」）。同名定义有两处，**不是重名冲突**：事件函数按
 * `#PRI` 组 → 无属性组 → `#LATER` 组依次全部执行
 * （core-concepts/user-defined-functions.md「事件函数属性」）。
 *
 *   | 定义处 | 属性 | ere 侧落点 |
 *   | --- | --- | --- |
 *   | 調教相關/TRAIN_MAIN.ERB:272 | `#PRI` | ere/event/event-comend.js |
 *   | **EVENT/EVENT1.ERB:1（本文件）** | 无属性 | 本模块 |
 *
 * 无属性组内的次序 = 定义次序；ere 侧由 main-loop.js 的 require 序决定，
 * 本模块紧随 event-comend（#PRI 那份）之后装载。
 *
 * == 行为 ==
 *
 * 一次性让步位：目标**没有**膣经验、**有**肛经验、且看重贞操时，认为她
 * 「守住贞操的话，后面被进攻一下也不是不能接受」（CFLAG:TARGET:100 = 1，
 * 全库唯一写点），此后本函数不再重复播报。这位旗标的读者在指令侧
 * （肛门系指令用它放宽自发的抵抗），本次只落写点。
 *
 * CFLAG:100 的属主就是 event（ownership/cflag-ownership.yml），本文件在
 * ere/event/，属域内写——裸寻址合规（该下标没有门面字段，正因为没有跨域
 * 写者需要具名通道）。
 */

const era = require('#/era-electron');
const { on } = require('#/system/event/registry');
const { chara } = require('#/facade/chara');
const era_flag = require('#/era-utils/era-flag');

// @EVENTCOMEND（EVENT1.ERB:1-9，无属性档——on 的缺省档即 TIER.NORMAL）
on('EVENTCOMEND', async () => {
  const target = era_flag.target;
  // :3-4 SIF CFLAG:TARGET:100 —— 已经认定过就不再认定（一次性位）。
  // 这里的 RETURN 0 只结束**本定义**的执行，链上其它 @EVENTCOMEND 照跑
  // （退回语义见 emuera-basic-agent-guide；#SINGLE 才有中断语义，本函数没有）
  if (era.get(`cflag:${target}:100`)) {
    return 0;
  }

  // :6 IF EXP:0 == 0 && EXP:1 > 0 && TALENT:30
  //    EXP:0 私处经验（没有膣经验）/ EXP:1 肛门经验（有肛经验）/ TALENT:30 看重贞操
  const view = chara(target);
  if (
    view.dungeon.私处经验 === 0 &&
    view.dungeon.肛门经验 > 0 &&
    view.event.看重贞操
  ) {
    era.set(`cflag:${target}:100`, 1); // :7
    await era.printAndWait(
      '（能守住贞操的话，稍微被进攻一下后面，也不是不能接受）',
    ); // :8 PRINTW
  }
});
