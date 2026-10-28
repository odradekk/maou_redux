/**
 * @file 调教收尾协调（STATE.AFTERTRAIN 处理器，自 train-loop.js 迁入）。
 *
 * 本模块拥有「调教会话何时结束、哪些数据必须保留到何时」的完整责任。
 * 收尾协议（本文件头是唯一权威叙述，调用点只指路）：
 *
 *   EVENTEND 事件链（函数体在 event/event-end.js，尾部转 TURNEND）→
 *   欲情快照（PALAM:5 落 CFLAG:668，见 save_train_desire）→
 *   era.endTrain()（gotjuel 结算进 juel、删调教域表；与游戏侧 JUEL_CHECK
 *   的职责划分见 juel-check.js，#47 定案、#875 改为交还结算）→ 冲账死亡登记。
 *
 * 三个反直觉的顺序约束（动协议前先核这里）：
 *   1. endTrain 在链后：EVENTEND 体内的 JUEL_CHECK 要读 palam/gotjuel，
 *      表先于结算删除会静默丢失（引擎三段寻址检查：角色子表不在即丢弃）。
 *      欲情快照同理——它读的就是即将被删的那张表。
 *   2. 除名在 endTrain 后：死亡目标仍在引擎调教列表中，引擎收尾要遍历
 *      调教列结算珠，先删角色会访问已删除的珠表（#782 的崩溃）。
 *   3. 死亡指针当场清：TARGET/ASSI/FLAG:1 是死亡的结果状态，进存档、
 *      被 TURNEND 及后续读取；begin(TURNEND) 结束的只是死亡分支所在的
 *      处理器，链上后续档照跑，不能再按已死目标寻址。
 */

const era = require('#/era-electron');
const { emit } = require('#/system/event/registry');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const era_flag = require('#/era-utils/era-flag');
const { name_reset } = require('#/system/chara/char-make');
const { template_no_of } = require('#/system/chara/chara-pregnancy');
const { party_char_del } = require('#/system/dungeon/dungeon-party');
const { EVENT } = require('#/data/event-name-const');
const { palam_settled } = require('#/data/palam-level-const');

// EVENTEND 链内登记、引擎收尾后冲账的待除名目标。-1 = 无登记（「未选中」
// 的同款约定，era_flag.js 的 target 语义注）；0 是魔王（真实角色号），
// 不作哨兵。生命周期不超出单次 run_aftertrain 调用（defer 写、settle
// 读并清），不进存档——与 event-aftertrain.js 的 leftover_* 同性质，
// 不构成第二套持久状态（ADR-0001）。
let pending_removal = -1;

/**
 * 登记一个死于本场调教的目标（EVENTEND 死亡分支调用）：立即完成除名
 * 标记、指针清空、队伍移除与待结算珠清零；实际除名延迟到引擎收尾后，
 * 由 settle_train_death 冲账（顺序约束见文件头）。
 *
 * @param {number} cid 死亡的调教目标（正数角色号）。0 是魔王、负数是
 *   「未选中」，都不是死亡删除对象——谁死了由 event-end.js 的死亡分支
 *   判定，本函数只做除名簿记，收到不可能的编号即契约破裂，当场炸出
 *   而不是静默半执行
 */
function defer_train_death(cid) {
  if (cid <= 0) {
    throw new TypeError(`死亡登记收到非正角色号: ${cid}`);
  }
  pending_removal = cid;
  // FLAG:200–299 的除名标记（普通勇者）；后代与范围外模板不落标记
  era_flag.mark_hero_removed(template_no_of(cid));
  // 指针清空是死亡的结果状态（进存档）；不再是跨文件的除名信号——
  // 除名对象由本模块的登记直接承载。flag:1 属主是 event 域，train 域
  // 写它经门面（#71）
  era_flag.target = -1;
  game.event.上次调教对象 = -1;
  era_flag.assi = -1;
  party_char_del(cid);
  // 死亡目标不获珠：清零令引擎 endTrain 的调教列加算成为无操作
  for (const key of era.get('palamkeys')) {
    era.set(`gotjuel:${cid}:${key}`, 0);
  }
}

/**
 * 冲账死亡登记（引擎收尾后调用，一次性消费）：除名 + 称呼重建。
 * name_reset 必须在除名之后——它按现存角色重建称呼字串，被删角色的
 * 行随重建消失。无登记时是空操作。
 *
 * @returns {Promise<void>}
 */
async function settle_train_death() {
  if (pending_removal === -1) {
    return;
  }
  const cid = pending_removal;
  pending_removal = -1;
  era.removeCharacter(cid);
  await name_reset();
}

/**
 * 调教结束前的欲情快照：把参与调教的角色的欲情（PALAM:5）存进「调教后欲情」
 * 槽（CFLAG:668）。
 *
 * PALAM 是引擎的调教期专表，endTrain 整表删除；而次日「献出初次」的评分
 * （event/event-nextday.js 的 virgin_offer_score）跑在日循环里，那时读 PALAM
 * 只能读回 0，两档欲情加分从不生效。欲情要跨过窗口，只能先落进不被删除的
 * cflag。名单以引擎的调教名单为准（getCharactersInTrain）：助手与回合结算
 * 借窗口时中途补进名单的自动调教对象同样算参与者，不只看当前目标。
 *
 * 读的是「结算后的值」（palam + delta，见 palam_settled）：回合内的变动只落
 * 在 delta，palam 由引擎 nextTurnInTrain 在回合末加算——本函数在 endTrain
 * 之前跑，正常流程里那一轮已经结算，但最后一轮若没走到结算（未结算的增量仍
 * 在 delta 里），只读 palam 就会少掉本轮的欲情（#874）。
 */
function save_train_desire() {
  for (const cid of era.getCharactersInTrain()) {
    chara(cid).train.调教后欲情 = palam_settled(cid, 5);
  }
}

/**
 * STATE.AFTERTRAIN 处理器（纯编排，协议与时序约束见文件头）。
 *
 * @returns {Promise<string>} 下一游戏状态（EVENTEND 链的暂存转场目标）
 */
async function run_aftertrain() {
  const pending = await emit(EVENT.END);
  save_train_desire();
  era.endTrain();
  await settle_train_death();
  return pending;
}

module.exports = {
  defer_train_death,
  run_aftertrain,
  save_train_desire,
};
