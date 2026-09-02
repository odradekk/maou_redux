/**
 * @file 主循环与转场状态机（决议 #6，落地于 issue #20）。
 *
 * 源: 无单一对应源——本模块是 Emuera 主循环/BEGIN 机制的等价物（引擎行为，
 * 非某个 ERB 函数）；机制出处与语义证据见决议 #6 的评论。
 *
 * Emuera 的游戏阶段由 BEGIN 切换；ere 侧的两条路径在本模块统一成状态机的边：
 *
 *   - 事件链内的 BEGIN（如原作 EVENT_TURNEND.ERB:140）：由 emit() 在处理器
 *     边界捕获并暂存，链跑完后作为返回值交给本模块（system/event/registry.js）；
 *   - 非事件函数内的 BEGIN（如原作 SHOP ver1.0.2.ERB:99 的 BEGIN TRAIN）：
 *     BeginSignal 一路上抛，由本模块的 enter_state 接住。
 *
 * 初始状态固定 TITLE（原作由引擎启动直接进 @SYSTEM_TITLE；ere 侧把入口也
 * 收进状态机，STATE.TITLE 是本地扩展，见 begin-signal.js）。
 *
 * 已接入的状态：TITLE / FIRST / SHOP（贯通验证）与 TRAIN / AFTERTRAIN /
 * TURNEND（#44——调教闭环「主菜单 → 调教 → 回合结算 → 回主菜单」）。其余
 * 目标（无）不存在：原作全库只有这六种 BEGIN 目标（begin-signal.js）。
 *
 * 【硬约束 #6】本模块的 catch 已按约定首行放行 BeginSignal；业务代码新写
 * 任何 try/catch 都必须同样处理（见 begin-signal.js 文件头）。
 */

const { BeginSignal, STATE } = require('#/system/flow/begin-signal');
const { emit } = require('#/system/event/registry');
const run_title_page = require('#/page/page-title');
const { run_shop } = require('#/page/page-shop');
const { run_train, run_aftertrain } = require('#/system/train/train-loop');
// 顶层副作用：注册 @EVENTFIRST 处理器（issue #22 真身）。后续事件的
// 处理器模块随各自所属票在此追加 require——调教域（#44）：EVENTTRAIN /
// EVENTCOM / EVENTCOMEND / EVENTEND / EVENTTURNEND 与画面 SHOW_STATUS /
// SHOW_USERCOM / USERCOM。
require('#/event/event-first');
require('#/event/event-train');
require('#/event/event-com');
require('#/event/event-comend');
require('#/event/event-end');
require('#/event/event-turnend');
require('#/event/event-turnend-later');
require('#/event/source-check');
require('#/page/page-train');
require('#/page/page-usercom');
// @COM0 与 @COM_ABLE0 的实现（#45——首条真实指令；注册进 COM 分发族）
// @COM0-9「爱抚系」族（#219 J9）：@COM/@COM_ABLE 真身 + TRAIN_MESSAGE 分支
// + GET_ADV_COM 的 CASE 1/3/4/5/6/8 升格规则（COM0 自 com0-caress.js 搬入）
require('#/system/train/com-caress');
// @COM20-29「性交系」族（#221 J11）：阴道性交、逆侵犯与肛交的 @COM /
// @COM_ABLE、TRAIN_MESSAGE 与 GET_ADV_COM 注册必须在主启动图实际加载。
require('#/system/train/com-sex');
// @COM30-38「奉仕系」族（#222 J12）：@COM/@COM_ABLE 真身 + TRAIN_MESSAGE 分支
// + GET_ADV_COM 的 CASE 30-34 升格规则
require('#/system/train/com-service');
// @COM40-49「SM 系」族（#223 J13）：@COM/@COM_ABLE 真身 + EQUIP_COM43-49
// 装备持续效果 + TRAIN_MESSAGE 分支 + GET_ADV_COM 的 CASE 40 升格规则
require('#/system/train/com-sm');
// @COM80-90「重度调教」族（#226 J16）：拳交系、G 点刺激、放尿、穿环、使役
// 魔兽 PLAY、兽奸 PLAY、乳内插入的 @COM/@COM_ABLE 真身 + EQUIP_COM89
// 装备持续效果 + TRAIN_MESSAGE 分支 + GET_ADV_COM 的 CASE 80 升格规则
require('#/system/train/com-hardcore');
// @COM50-59「特殊」族（#224 J14）：药剂、录像与场景切换真身、可用性、
// TRAIN_MESSAGE 分支及 EQUIP_COM53/54/57/58/59 持续效果
require('#/system/train/com-special');
// @COM110/111「着装脱衣」族（#228 J18）：穿衣 / 脱衣。漏 require 时游戏里
// 这两条指令根本没注册（#274 通用锁的起因之一）。
require('#/system/train/com-cloth');
// @COM60-73「助手与蕾丝」族（#225 J15）：助手指令、3P、六九式、发型
require('#/system/train/com-assistant');
// 死斗场与怪物族 @COM200-207（#230 J20）：TEQUIP:55 的写入方与
// @COM_AFTER_ARENA/@ARENA_*_POINT 的宿主（J17 触手接线时复用后两者）
require('#/system/train/com-colosseum');
// @COM10-19「道具使用」族（#220 J10）：真身、可用性、装备持续效果与训练消息分支
require('#/system/train/com-toy');
// @COM120-135「追加与高级」族（#229 J19）：高级 COM 真身 + COM_ABLE +
// TRAIN_MESSAGE 分支 + GET_ADV_COM 的 CASE 135 升格规则
require('#/system/train/com-advanced');
// @COM100-109 / 150 / 208「触手与自由调教」族（#227 J17）：触手召唤、
// 触手插入/口辱/自由调教、死斗场触手的 @COM/@COM_ABLE 真身 + EQUIP_COM100/108
// 持续效果 + TRAIN_MESSAGE 分支；JUMP 目标 11/13-17/31 未落地 → COM_MISSING
require('#/system/train/com-tentacle');
// 回合结算本体（#114）：@EVENTTURNEND 的普通档定义（SYSTEM ver1.0.3.ERB）。
// 与上面 event-turnend.js 的 #PRI 档、event-turnend-later.js 的空 #LATER 档
// 同链，按 #PRI → 普通 → #LATER 依次执行（#6 语义）
require('#/system/turnend-settle');
// 口上（#46）：公共底座（@EVENTSHOP 总开关 / @GET_KOJO_NUM / 指令口上
// 分发族）与口上模块（K1 自信家、K2 気弱、K3 高貴、K4 冷徹、K5 マオ、K6 悪女、
// K7 金红桃、K11 莉莉——各带 @EVENTTRAIN 存在标志，K11 的 @KOJO_MESSAGE_COM_11
// 尚未落地（#242 WIP，见文件头）。口上是独立顶层目录（docs/skeleton.md）
require('#/kojo/kojo-system');
require('#/kojo/kojo-k2-timid');
require('#/kojo/kojo-k3-noble');
require('#/kojo/kojo-k5-mao');
require('#/kojo/kojo-k1-confident');
require('#/kojo/kojo-k4-stoic');
require('#/kojo/kojo-k6-wicked');
require('#/kojo/kojo-k7-heart');
require('#/kojo/kojo-k9-diamond');
require('#/kojo/kojo-k11-lily');

/**
 * 各状态的处理器：返回值 = 下一状态（通常是事件链 emit 的待跳转值）。
 * 直接 begin() 抛信号（非事件路径）同样有效，见 enter_state。
 *
 * 已接入：TITLE（#19）/ FIRST（#20/#22）/ SHOP（#23）/ TRAIN、AFTERTRAIN
 * （#44，处理器在 system/train/train-loop.js）/ TURNEND（#44 薄转发：仅
 * emit @EVENTTURNEND 链——真身只有 #PRI 壳，回合结算本体待办，
 * event/event-turnend.js）。
 */
const STATE_HANDLERS = {
  [STATE.TITLE]: run_title_page,
  // 原作 BEGIN FIRST → @EVENTFIRST 事件链（SYSTEM ver1.0.3.ERB:1）。
  // 链无人 BEGIN 时默认进 SHOP：Emuera 在 @EVENTFIRST 跑完而无转场时自动
  // 进入商店轮，不是报错（#20 验收移交的语义，这张票落地）。防御性兜底——
  // 真身出口显式 begin(STATE.SHOP)（:231），此行只在未来的处理器们都不发
  // 信号时兜住引擎行为。
  [STATE.FIRST]: async () => (await emit('EVENTFIRST')) ?? STATE.SHOP,
  // 原作 BEGIN SHOP → 引擎调 @EVENTSHOP 一次，随后 @SHOW_SHOP 绘制 →
  // 输入 → @USERSHOP 分发循环（SHOP ver1.0.2.ERB；ere 侧整体收进
  // page/page-shop.js，主菜单骨架归 issue #23，输入分发归 #24——已落地）。
  [STATE.SHOP]: run_shop,
  // 原作 LOADDATA 后的隐式进入（#137）：同 SHOP 主循环，但**不执行
  // @EVENTSHOP**（技能 system-flow.md:51-53「读档后不执行 @EVENTSHOP」；
  // 状态语义见 begin-signal.js 的 SHOP_AFTER_LOAD 注释）
  [STATE.SHOP_AFTER_LOAD]: () => run_shop({ skip_eventshop: true }),
  // 原作 BEGIN TRAIN → 引擎初始化调教数据 → @EVENTTRAIN 链 → 回合循环
  //（引擎行为，ere 侧手写——system/train/train-loop.js，issue #44）。
  [STATE.TRAIN]: run_train,
  // 原作 BEGIN AFTERTRAIN → @EVENTEND 链（TRAIN_MAIN.ERB:314-429，尾部
  // BEGIN TURNEND）→ 引擎收尾调教数据（ere 侧 era.endTrain）。
  [STATE.AFTERTRAIN]: run_aftertrain,
  // 原作 BEGIN TURNEND → @EVENTTURNEND 链。#114 起三档真身：#PRI（时段/
  // 日期推进，event/event-turnend.js）→ 普通（回合结算本体，
  // system/turnend-settle.js）→ #LATER（空，event/event-turnend-later.js）。
  // 出口必发 BEGIN SHOP，链无人 BEGIN 时保持 undefined 报错（兜底只会掩盖
  // 处理器被误删的回归）。
  [STATE.TURNEND]: async () => await emit('EVENTTURNEND'),
};

/**
 * 进入一个状态：跑其处理器，产出下一状态。
 * @param {string} state STATE 枚举取值
 * @returns {Promise<string>} 下一状态
 */
async function enter_state(state) {
  const handler = STATE_HANDLERS[state];
  if (handler === undefined) {
    throw new Error(
      `游戏状态 ${state} 的处理器尚未移植（贯通验证后续票，见 issue #15）`,
    );
  }
  try {
    const next = await handler();
    if (next === undefined) {
      // 镜像原作：BEGIN 目标跑完却没发起新 BEGIN，Emuera 报错终止（#6 参考实现）
      throw new Error(`游戏状态 ${state} 结束时没有待跳转状态（缺少 BEGIN）`);
    }
    return next;
  } catch (e) {
    // 【硬约束 #6】凡捕获异常必先放行转场信号——此处即非事件路径的接站点
    if (e instanceof BeginSignal) {
      return e.state;
    }
    throw e;
  }
}

/**
 * 游戏主循环：从标题画面起，沿 BEGIN 转场在状态间推进，永不正常退出
 * （玩家关窗口离开游戏，与原作一致）。
 */
async function run_main_loop() {
  let state = STATE.TITLE;
  for (;;) {
    state = await enter_state(state);
  }
}

// enter_state 一并导出（#137）：状态映射（如 SHOP_AFTER_LOAD 跳过
// @EVENTSHOP）的行为测试直接驱动它，不必整跑 run_main_loop
module.exports = run_main_loop;
module.exports.enter_state = enter_state;
