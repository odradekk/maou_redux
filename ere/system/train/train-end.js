/**
 * @file 调教收尾协调（STATE.AFTERTRAIN 处理器，自 train-loop.js 迁入）。
 *
 * 本模块拥有「调教会话何时结束、哪些数据必须保留到何时」的完整责任：
 *
 *   STATE.AFTERTRAIN 处理器：EVENTEND 事件链（函数体在 event/event-end.js，
 *   尾部转 TURNEND 状态）→ era.endTrain()（gotjewel 结算进 jewel、删调教域
 *   表；游戏侧 JUEL_CHECK 结算与引擎侧 endTrain 的 gotjuel→juel 不得双重
 *   累加——职责划分见 juel-check.js，#47 定案）→ 冲账死亡登记。
 *
 * endTrain 放在链后：EVENTEND 体内的 JUEL_CHECK 要读 palam/gotjuel，表先
 * 于结算删除会静默丢失（引擎三段寻址检查：角色子表不在即丢弃）。
 * 死亡目标仍在引擎调教列表中，必须在 endTrain 完成珠结算后才能除名
 * （#782：先删角色会让引擎收尾遍历调教列时访问已删除的珠表）——因此
 * EVENTEND 死亡分支只经 defer_train_death 登记并清理指针，实际除名由
 * run_aftertrain 在 endTrain 之后冲账。
 */

const era = require('#/era-electron');
const { name_reset } = require('#/chara/char-make');
const { template_no_of } = require('#/chara/chara-pregnancy');
const { emit } = require('#/system/event/registry');
const { party_char_del } = require('#/dungeon/dungeon-party');
const { game } = require('#/facade/game');
const era_flag = require('#/era-utils/era-flag');

// EVENTEND 链内登记、引擎收尾后冲账的待除名目标。生命周期不超出单次
// run_aftertrain 调用（入口清残留），不进存档——与 event-aftertrain.js 的
// leftover_* 同性质，不构成第二套持久状态（ADR-0001）。
let pending_removal = 0;

/**
 * 登记一个死于本场调教的目标（EVENTEND 死亡分支调用）：立即完成除名
 * 登记、指针清空、队伍移除与待结算珠清零；实际除名延迟到 era.endTrain()
 * 之后由 run_aftertrain 冲账。
 *
 * @param {number} cid 死亡的调教目标（非 0——魔王死亡不走死亡删除分支，
 *   分支条件在 event-end.js）
 */
function defer_train_death(cid) {
  pending_removal = cid;
  // FLAG:200–299 的除名标记（普通勇者）；后代与范围外模板不落标记
  era_flag.mark_hero_removed(template_no_of(cid));
  // 指针清空是死亡的结果状态（进存档，TURNEND 及后续读它）；不再是
  // 跨文件的除名信号——除名对象由本模块的登记直接承载。flag:1 属主是
  // event 域，train 域写它必须走门面（ADR-0002）
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
 * STATE.AFTERTRAIN 处理器：EVENTEND 事件链（尾部转 TURNEND 状态，函数体
 * 在 event/event-end.js）→ era.endTrain()（gotjuel 结算 + 删调教域表）→
 * 冲账死亡登记（引擎除名 + 称呼重建）。
 *
 * @returns {Promise<string>} 下一游戏状态（EVENTEND 链的暂存转场目标）
 */
async function run_aftertrain() {
  pending_removal = 0; // 防御上一场异常残留（正常路径此处恒为 0）
  const pending = await emit('EVENTEND');
  era.endTrain();
  if (pending_removal !== 0) {
    const cid = pending_removal;
    pending_removal = 0;
    era.removeCharacter(cid);
    await name_reset();
  }
  return pending;
}

module.exports = {
  defer_train_death,
  run_aftertrain,
};
