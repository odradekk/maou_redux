/**
 * @file 宝箱装备选择：@EQUIP_SELECT。
 *
 * 源: target/ERB/其他/EQUIP.ERB  @EQUIP_SELECT（:206-271；调用点在
 *     迷宮/DUNGEON.ERB 行 723/726/730 与迷宮/LABO_DUNGEON_MAP.ERB 行 34——
 *     迷宫侧随 H3 落地后接线本模块）
 *
 * 勇者开宝箱换装：宝箱道具号按阶层存 FLAG:(阶层+339)；战役中
 * （CFLAG:1 == 12）改由 @CAMPAIGN_EQUIP_SELECT 决定（#469 起真身，
 * DispatchFamily 声明空间 {1}，战役 1 实现在 page-campaign-1.js）。
 * 两枚装饰槽（CFLAG:551/552）里，空槽（-1）或强度低于阶层且未诅咒的，
 * 经 @REMOVE_CURSE 换新；产物是装饰（W:7 == 1）才装上。
 */

'use strict';

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { chara } = require('#/facade/chara');
const { DispatchFamily } = require('#/system/dispatch/dispatch-family');
const { equip_database } = require('#/system/equip/equip-lookup');
const { equip_ring_spans } = require('#/system/equip/equip-print');
const { remove_curse } = require('#/system/equip/equip-curse');

const STUBBED_CALLS = [];

/**
 * @CAMPAIGN_EQUIP_SELECT_{FLAG:400} 族：战役迷宫的指轮宝箱（#469，
 * 决议 #7）。键是 FLAG:400，声明空间 {1}（page-campaign.js 文件头同款
 * 依据）；实现在 ere/page/page-campaign-1.js 注册。
 */
const campaign_equip_select_family = new DispatchFamily(
  'CAMPAIGN_EQUIP_SELECT',
  [1],
);

/**
 * @CAMPAIGN_EQUIP_SELECT（CAMPAIGN_EVENT.ERB:215-223）：战役迷宫的指轮
 * 宝箱道具号。
 * @param {number} floor 阶层（原作 ARG:0，EQUIP.ERB:218 传 CFLAG:A:501）
 * @returns {Promise<number>} 道具号（FLAG:400 < 1 时恒 0）
 */
async function campaign_equip_select(floor) {
  const active = era_flag.hero_campaign_active;
  if (active < 1) {
    return 0;
  }
  return campaign_equip_select_family.call(active, {
    whenMissing: 0,
    args: [floor],
  });
}

/** RAND:N 的默认实现（0..N-1 均匀整数） */
function default_rand(n) {
  return Math.floor(Math.random() * n);
}

/**
 * @EQUIP_SELECT（:206-271）。
 * @param {number} cid 角色（原作 A；阶层取 CFLAG:A:501）
 * @param {(n: number) => number} [rng] RAND:N 注入点（传给 @REMOVE_CURSE）
 * @returns {Promise<number>} RESULT：恒 0（原作三处出口都是 RETURN 0）
 */
async function equip_select(cid, rng = default_rand) {
  // :211-212 SIF A < 0 RETURN 0
  if (cid < 0) {
    return 0;
  }

  // :214-233 宝箱チェック：战役中走 CAMPAIGN_EQUIP_SELECT，否则按阶层读
  // FLAG:(阶层+339) 的道具号并消费一件
  let x;
  if (chara(cid).invasion.状态 === 12) {
    // :218 战役中（CFLAG:A:1 == 12）——#469 起真身
    x = await campaign_equip_select(chara(cid).dungeon.侵攻阶层);
  } else {
    // :223-224 Y = CFLAG:A:501 + 339；X = FLAG:Y
    const y = (era.get(`cflag:${cid}:501`) || 0) + 339;
    x = era.get(`flag:${y}`) || 0;
  }
  // :220-221 / :225-226 SIF X < 300 RETURN 0（非装备道具号）
  if (x < 300) {
    return 0;
  }
  if (chara(cid).invasion.状态 !== 12) {
    // :228-232 アイテム消費（IF ITEM:X <= 0 RETURN 0 ELSE ITEM:X -= 1）
    if ((era.get(`item:${x}`) || 0) <= 0) {
      return 0;
    }
    era.set(`item:${x}`, (era.get(`item:${x}`) || 0) - 1);
  }

  era.print('勇者发现了宝箱！'); // :235 PRINTW
  await era.waitAnyKey();

  const w = { 备注: x }; // :237 W:8 = X
  const floor = era.get(`cflag:${cid}:501`) || 0; // CFLAG:A:501（阶层）

  // :239-267 两枚装饰槽同构（551 → 552；装饰 = CFLAG:551、装饰2 = CFLAG:552，
  // 门面字段按属主域 event 切片——ere/facade/chara-event.js）
  for (const field of ['装饰', '装饰2']) {
    w.存储编号 = chara(cid).event[field]; // W:0 = CFLAG:A:55x
    const found = equip_database(w);

    // :243 / :258 空槽（-1），或有效且强度低于阶层、未诅咒 → 可换装
    if (w.存储编号 === -1 || (found && w.强度 < floor && w.诅咒 === 0)) {
      const equipped = await remove_curse(w, cid, rng);
      // :245-250 / :260-265 RESULT && W:7 == 1（装饰）才装上
      if (equipped && w.部位 === 1) {
        chara(cid).event[field] = w.存储编号;
        // PRINT 勇者把 + PRINT_EQUIPTYPE_RING + PRINTW 装备上了。
        era.print(['勇者把', ...equip_ring_spans(w), '装备上了。']);
        await era.waitAnyKey();
        return 0;
      }
    }
  }

  era.print('似乎没什么好东西。'); // :269 PRINTW
  await era.waitAnyKey();

  return 0;
}

module.exports = {
  equip_select,
  STUBBED_CALLS,
  campaign_equip_select,
  // page-campaign-1.js 向这个族 register(1, ...)，本文件只声明、不参与注册
  campaign_equip_select_family,
};
