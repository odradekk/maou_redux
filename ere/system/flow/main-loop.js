/**
 * @file 主循环与转场状态机（决议 #6，实现于 issue #20）。
 *
 * 本模块是主循环与 BEGIN 转场机制的等价物（决议 #6）；
 * 机制出处与语义证据见决议 #6 的评论。
 *
 * 游戏阶段由 BEGIN 切换；ere 侧的两条路径在本模块统一成状态机的边：
 *
 *   - 事件链内的 BEGIN：由 emit() 在处理器
 *     边界暂存，链跑完后作为返回值交给本模块（system/event/registry.js）；
 *   - 非事件函数内的 BEGIN（如商店页发起的 BEGIN TRAIN）：返回值沿
 *     调用链逐层 return 上来，由本模块的 enter_state 收下。
 *
 * 初始状态固定 TITLE（启动即进标题页）；游戏结束也回到这里（#852 的标题
 * 循环）：各结局与两处 GAMEOVER 用 `return begin(STATE.TITLE)` 交回主循环，
 * 标题画面重新可交互，玩家可以重开、读档或从标题画面退出进程。
 *
 * 状态清单的权威是 game-state.js 的 STATE 枚举，本模块不另抄一份：处理器表
 * 必须为枚举的每个取值备一项，逐项说明写在各自条目上。自列一份清单的写法在
 * 读档后新增 SHOP_AFTER_LOAD 时漏跟过，这张表与枚举的同步改由
 * test/main-loop.test.js 的用例当场盯住。
 */

const { is_state, STATE } = require('#/system/flow/game-state');
const { emit } = require('#/system/event/registry');
const { EVENT } = require('#/data/event-name-const');
const run_title_page = require('#/page/page-title');
const { run_shop } = require('#/page/page-shop');
const { run_train } = require('#/system/train/train-loop');
const { run_aftertrain } = require('#/system/train/train-end');
// 顶层副作用：注册 EVENTFIRST 处理器（issue #22 真身）。后续事件的
// 处理器模块随各自所属票在此追加 require——调教域（#44）：EVENTTRAIN /
// EVENTCOM / EVENTCOMEND / EVENTEND / EVENTTURNEND 与画面 SHOW_STATUS /
// SHOW_USERCOM / USERCOM。
require('#/event/event-first');
require('#/event/event-train');
// EVENTTRAIN 的**无属性档**（#401）：与上一个（#PRI 档）
// 是同一事件的另一份定义，事件链按 #PRI → 无属性 → #LATER 全部执行，
// 故两份都要注册；同档内次序 = 这里的装载序
require('#/event/event-train-normal');
require('#/event/event-com');
require('#/event/event-comend');
// EVENTCOMEND 的无属性档（#401），同上
require('#/event/event-comend-normal');
require('#/event/event-end');
require('#/event/event-turnend');
require('#/event/event-turnend-later');
require('#/system/train/source-check');
require('#/page/page-train');
require('#/page/page-usercom');
// COM0 与 COM_ABLE0 的实现（#45——首条真实指令；注册进 COM 分发族）
// COM0-9「爱抚系」族（#219 J9）：COM/COM_ABLE 分发族真身 + TRAIN_MESSAGE 分支
// + GET_ADV_COM 的 CASE 1/3/4/5/6/8 升格规则
require('#/system/train/com-caress');
// COM20-29「性交系」族（#221 J11）：阴道性交、逆侵犯与肛交的 COM /
// COM_ABLE 真身、TRAIN_MESSAGE 与 GET_ADV_COM 注册必须在主启动图实际加载。
require('#/system/train/com-sex');
// COM30-38「奉仕系」族（#222 J12）：COM/COM_ABLE 真身 + TRAIN_MESSAGE 分支
// + GET_ADV_COM 的 CASE 30-34 升格规则
require('#/system/train/com-service');
// COM40-49「SM 系」族（#223 J13）：COM/COM_ABLE 真身 + EQUIP_COM43-49
// 装备持续效果 + TRAIN_MESSAGE 分支 + GET_ADV_COM 的 CASE 40 升格规则
require('#/system/train/com-sm');
// COM80-90「重度调教」族（#226 J16）：拳交系、G 点刺激、放尿、穿环、使役
// 魔兽 PLAY、兽奸 PLAY、乳房插入的 COM/COM_ABLE 真身 + EQUIP_COM89
// 装备持续效果 + TRAIN_MESSAGE 分支 + GET_ADV_COM 的 CASE 80 升格规则
require('#/system/train/com-hardcore');
// COM50-59「特殊」族（#224 J14）：药剂、录像与场景切换真身、可用性、
// TRAIN_MESSAGE 分支及 EQUIP_COM53/54/57/58/59 持续效果
require('#/system/train/com-special');
// COM110/111「着装脱衣」族（#228 J18）：穿衣 / 脱衣。漏 require 时游戏里
// 这两条指令根本没注册（#274 通用锁的起因之一）。
require('#/system/train/com-cloth');
// COM60-73「助手与蕾丝」族（#225 J15）：助手指令、3P、六九式、发型
require('#/system/train/com-assistant');
// 死斗场与怪物族 COM200-207（#230 J20）：TEQUIP:55 的写入方与
// com_after_arena / arena_slave_point / arena_assi_point 的宿主（J17 触手接入时复用后三者）
require('#/system/train/com-colosseum');
// COM10-19「道具使用」族（#220 J10）：真身、可用性、装备持续效果与训练消息分支
require('#/system/train/com-toy');
// COM120-135「追加与高级」族（#229 J19）：高级 COM 真身 + COM_ABLE +
// TRAIN_MESSAGE 分支 + GET_ADV_COM 的 CASE 135 升格规则
require('#/system/train/com-advanced');
// COM100-109 / 150 / 208「触手与自由调教」族（#227 J17）：触手召唤、
// 触手插入/口辱/自由调教、死斗场触手的 COM/COM_ABLE 真身 + EQUIP_COM100/108
// 持续效果 + TRAIN_MESSAGE 分支；JUMP 目标 11/13-17/31 未实现 → COM_MISSING
require('#/system/train/com-tentacle');
// 回合结算本体（#114）：EVENTTURNEND 的普通档定义。
// 与上面 event-turnend.js 的 #PRI 档、event-turnend-later.js 的空 #LATER 档
// 同链，按 #PRI → 普通 → #LATER 依次执行（#6 语义）
require('#/system/turnend-settle');
// 战役1「赤蛮呪森」（#469）：13 个编号函数向
// page-campaign.js / dungeon.js 等文件声明的 CAMPAIGN_* DispatchFamily
// 注册实现，注册是顶层副作用，必须在此显式 require 才会触发
require('#/page/page-campaign-1');
// 口上（#46）：公共底座（EVENTSHOP 总开关 / get_kojo_num / 指令口上
// 分发族）与口上模块（K0 慈爱、K1 自信家、K2 気弱、K3 高貴、K4 冷徹、
// K5 マオ、K6 悪女、K7 金红桃、K8 银黑桃、K9 方片、K10 俱乐部、K11
// 莉莉、K12 知的、K13 庇护者、K14 贵公子、K15 伶俐、K903 嘉德——各带
// EVENTTRAIN 存在标志与 kojo_message_com_family 注册）。口上是独立顶层
// 目录（docs/skeleton.md）
require('#/kojo/kojo-system');
require('#/kojo/kojo-k0-tender');
require('#/kojo/kojo-k2-timid');
require('#/kojo/kojo-k3-noble');
require('#/kojo/kojo-k5-mao');
require('#/kojo/kojo-k1-confident');
require('#/kojo/kojo-k4-stoic');
require('#/kojo/kojo-k6-wicked');
require('#/kojo/kojo-k7-heart');
require('#/kojo/kojo-k8-spade');
require('#/kojo/kojo-k9-diamond');
require('#/kojo/kojo-k10-club');
require('#/kojo/kojo-k11-lily');
require('#/kojo/kojo-k13-protector');
require('#/kojo/kojo-k14-nobleman');
require('#/kojo/kojo-k15-clever');
require('#/kojo/kojo-k12-intellectual');
require('#/kojo/kojo-k903-garde');
require('#/kojo/kojo-k19-fia');
require('#/kojo/kojo-k904-fia');

/**
 * 各状态的处理器：返回值 = 下一状态（通常是事件链 emit 的待跳转值）。
 *
 * 键必须是 game-state.js 的 STATE 枚举的取值，不多不少（同步用例在
 * test/main-loop.test.js），逐项说明写在各自条目上。
 */
const STATE_HANDLERS = {
  // 标题页（#19）：启动的初始状态，不经 BEGIN 进入
  [STATE.TITLE]: run_title_page,
  // BEGIN FIRST → EVENTFIRST 事件链。
  // 链无人 BEGIN 时回落进 SHOP：EVENTFIRST 跑完而无转场时默认进商店轮，
  // 不是报错（#20 验收移交的语义）。EVENTFIRST 处理器出口本来就显式
  // begin(STATE.SHOP)，这里的默认值只在以后的处理器都不发起转场时起作用。
  [STATE.FIRST]: async () => (await emit(EVENT.FIRST)) ?? STATE.SHOP,
  // BEGIN SHOP → 先调 EVENTSHOP 链一次，随后绘制商店页 →
  // 输入 → 分发循环（ere 侧整体收进
  // page/page-shop.js，主菜单骨架归 issue #23，输入分发归 #24——已实现）。
  [STATE.SHOP]: run_shop,
  // 读档后的商店轮（#137，由 page-save-load.js 的 load_game 发起）：同 SHOP
  // 主循环，但**不执行 EVENTSHOP 链**（状态语义见 game-state.js 的
  // SHOP_AFTER_LOAD 注释）
  [STATE.SHOP_AFTER_LOAD]: () => run_shop({ skip_eventshop: true }),
  // BEGIN TRAIN → 初始化调教数据（ere 侧手写——system/train/train-loop.js，
  // issue #44）→ EVENTTRAIN 链 → 回合循环。
  [STATE.TRAIN]: run_train,
  // BEGIN AFTERTRAIN → EVENTEND 链（尾部
  // BEGIN TURNEND）→ 引擎收尾调教数据（ere 侧 era.endTrain）。
  [STATE.AFTERTRAIN]: run_aftertrain,
  // BEGIN TURNEND → EVENTTURNEND 链。#114 起三档真身：#PRI（时段/
  // 日期推进，event/event-turnend.js）→ 普通（回合结算本体，
  // system/turnend-settle.js）→ #LATER（空，event/event-turnend-later.js）。
  // 出口必发 BEGIN SHOP，链无人 BEGIN 时保持 undefined 报错（补默认值只会掩盖
  // 处理器被误删的回归）。
  [STATE.TURNEND]: async () => await emit(EVENT.TURNEND),
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
  const next = await handler();
  if (!is_state(next)) {
    // BEGIN 目标跑完却没返回新目标即报错终止（决议 #6 的约定）
    throw new Error(`游戏状态 ${state} 结束时没有待跳转状态（缺少 BEGIN）`);
  }
  return next;
}

/**
 * 游戏主循环：标题循环（#852）。
 *
 * 从标题画面起，沿转场目标在状态间推进。游戏结束的各结局与 GAMEOVER 以
 * STATE.TITLE 转场回到标题画面，标题重新可交互——重新开始、读档或退出；
 * 只有标题画面的退出按钮会结束进程（era.quit()），循环本身不设出口
 * （玩家关窗口离开游戏）。
 */
async function run_main_loop() {
  let state = STATE.TITLE;
  for (;;) {
    state = await enter_state(state);
  }
}

// enter_state 一并导出（#137）：状态映射（如 SHOP_AFTER_LOAD 跳过
// EVENTSHOP 链）的行为测试直接驱动它，不必整跑 run_main_loop
module.exports = run_main_loop;
module.exports.enter_state = enter_state;
// STATE_HANDLERS 一并导出（#790）：同步用例对照 STATE 枚举核对键集，
// 不再靠文件头手抄的清单
module.exports.STATE_HANDLERS = STATE_HANDLERS;
