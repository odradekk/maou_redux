/**
 * @file 角色除名的共同机械步骤（issue #785）。
 *
 * 「除名一个角色」的完整机械规则，出售、处刑与博物馆家具化共用；原因
 * 特定的装备归还、奖励、播报、剧情留在各自流程，不进本模块的参数——
 * 流程钩子一旦入参会把它养成所有生命事件的总入口。未接入的除名路径
 * （调教死亡的两段式收尾、回合结束的 erase_chara、献祭、离队）登记在
 * chara-removal-scan 测试的白名单里，各带不接入的理由。
 */

'use strict';

const era = require('#/era-electron');
const { name_reset } = require('#/chara/char-make');
const { template_no_of } = require('#/chara/chara-pregnancy');
const { party_char_del } = require('#/dungeon/dungeon-party');
const { game } = require('#/facade/game');
const era_flag = require('#/era-utils/era-flag');

/**
 * 执行一次完整的角色除名（必须处于允许删除的时机——调教会话内要等
 * 引擎收尾后才能删角色）：
 *
 *   除名登记 → 引用清空 → 队伍移除 → 实际删除 → 称呼重建
 *
 * 引用清空针对两组指针：FLAG:1/2（上次调教对象/助手，持久）按 ID 判等
 * 置 -1，TARGET/ASSI（会话）同步为清过的持久指针。ere 的角色 ID 稳定
 * 不重排（#21），不移植旧引擎删除后的编号前移。引擎的 removeCharacter
 * 会删除被删者的整行数据表——调用方在除名后还要用的角色字段要先读。
 * 全程同步（name_reset 与 removeCharacter 均无异步工作），「要等引擎
 * 收尾」是调用时机的约束，不是本函数内部的等待。
 *
 * @param {number} cid 被除名角色的正数角色号
 * @param {object} [options]
 * @param {boolean} [options.reset_names] 是否在删除后重建称呼字串（默认
 *   真；处刑的一处分支在删除后另有安排，显式关闭）
 * @returns {void}
 * @throws {TypeError} cid 非正数（0 是魔王、负数是「未选中」，都不是
 *   删除对象——收到不可能的编号即契约破裂，当场炸出而不是静默半执行，
 *   与 defer_train_death 的死亡登记同一策略）
 */
function remove_character(cid, { reset_names = true } = {}) {
  if (cid <= 0) {
    throw new TypeError(`除名收到非正角色号: ${cid}`);
  }
  // FLAG:200–299 = 预设 1–100 的除名标记；后代与范围外模板不落标记
  era_flag.mark_hero_removed(template_no_of(cid));
  // 指针按 ID 判等：只清真正指向被除名者的引用。flag:1/2 属 event 域，
  // 跨域写经其具名门面（#71）
  if (game.event.上次调教对象 === cid) game.event.上次调教对象 = -1;
  if (game.event.上次助手 === cid) game.event.上次助手 = -1;
  era_flag.target = game.event.上次调教对象;
  era_flag.assi = game.event.上次助手;
  party_char_del(cid);
  era.removeCharacter(cid);
  // 称呼重建按现存角色进行，被除名者不在重建范围；reset_names 关闭时
  // 由调用方自行安排重建时机
  if (reset_names) name_reset();
}

module.exports = { remove_character };
