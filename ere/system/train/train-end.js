/**
 * @file 调教收尾协调（STATE.AFTERTRAIN 处理器，自 train-loop.js 迁入）。
 *
 * 本模块拥有「调教会话何时结束、哪些数据必须保留到何时」的完整责任：
 *
 *   STATE.AFTERTRAIN 处理器：EVENTEND 事件链（函数体在 event/event-end.js，
 *   尾部转 TURNEND 状态）→ era.endTrain()（gotjewel 结算进 jewel、删调教域
 *   表；游戏侧 JUEL_CHECK 结算与引擎侧 endTrain 的 gotjuel→juel 不得双重
 *   累加——职责划分见 juel-check.js，#47 定案）。
 *
 * endTrain 放在链后：EVENTEND 体内的 JUEL_CHECK 要读 palam/gotjuel，表先
 * 于结算删除会静默丢失（引擎三段寻址检查：角色子表不在即丢弃）。
 * 死亡目标仍在引擎调教列表中，必须在 endTrain 完成珠结算后才能除名。
 */

const era = require('#/era-electron');
const { name_reset } = require('#/chara/char-make');
const { emit } = require('#/system/event/registry');
const era_flag = require('#/era-utils/era-flag');

/**
 * STATE.AFTERTRAIN 处理器：EVENTEND 事件链（尾部转 TURNEND 状态，函数体
 * 在 event/event-end.js）→ era.endTrain()（gotjuel 结算 + 删调教域表）。
 *
 * endTrain 放在链后：EVENTEND 体内的 JUEL_CHECK 要读 palam/gotjuel，表先
 * 于结算删除会静默丢失（引擎三段寻址检查：角色子表不在即丢弃）。
 * 死亡目标仍在引擎调教列表中，必须在 endTrain 完成珠结算后才能除名。
 *
 * @returns {Promise<string>} 下一游戏状态（EVENTEND 链的暂存转场目标）
 */
async function run_aftertrain() {
  // EVENTEND 会恢复暂存的目标；死亡时清空目标指针，但保留其数据直到收尾。
  const target = era_flag.target_backup;
  const pending = await emit('EVENTEND');
  era.endTrain();
  if (target !== 0 && era_flag.target === -1) {
    era.removeCharacter(target);
    await name_reset();
  }
  return pending;
}

module.exports = {
  run_aftertrain,
};
