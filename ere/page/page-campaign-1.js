/**
 * @file 战役1「赤蛮咒森」：CAMPAIGN_1.ERB 的 13 个编号函数（#469）。
 *
 * 源: target/ERB/侵略/CAMPAIGN/CAMPAIGN_1.ERB
 *
 * 本文件向 page-campaign.js（CAMPAIGN_NAME/EXIST/SET）与各域文件
 * （dungeon.js 等）声明的 DispatchFamily 注册战役 1 的实现，只 register(1,
 * fn)，不参与 family 的声明——与 kojo/kojo-kN-*.js 向 kojo-dungeon-after.js
 * 声明的族注册同构（该文件头有先例说明）。注册是顶层副作用，必须由
 * system/flow/main-loop.js 显式 require 才会触发。
 *
 * `CAMPAIGN_DUNGEON_LV_1`（:278-281，RETURN 45）已在
 * ere/dungeon/monster-data.js 真身实现（按 FLAG:400 手写 if/else，非
 * DispatchFamily），不在本文件重复。`CAMPAIGN_MONSTER_EXTRA_1`（:261-275）
 * 登记不实现：唯一潜在调用方 `@CAMPAIGN_MONSTER_EXTRA` 全库零调用点，
 * 原作本身不可达（issue #469 实测范围评论）。
 */

'use strict';

const {
  campaign_name_family,
  campaign_exist_family,
  campaign_set_family,
} = require('#/page/page-campaign');
const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { chara_callname } = require('#/utils/callname-utils');

/** 战役名两段展示文本（:76/:78/:80 FONTBOLD 段 + FONTREGULAR 段） */
const NAME_BOLD = '赤森谜路 ';
const NAME_REGULAR = '-ROAD・to・CRIMSON・FOREST-';

/**
 * @CAMPAIGN_NAME_1（:73-81）：战役名展示（菜单头部，随 CAMPAIGN_MENU 调用）。
 * @returns {number} RETURN 0
 */
function campaign_name_1() {
  era.print([
    { content: NAME_BOLD, fontWeight: 'bold' },
    { content: NAME_REGULAR },
  ]);
  return 0;
}
campaign_name_family.register(1, campaign_name_1);

/**
 * @CAMPAIGN_EXIST_1（:51-57）：战役选择菜单的列表项。
 *
 * 移植说明：原作 `PRINT [1] ` + `CALL CAMPAIGN_NAME_1` 拼在同一行；本移植
 * 按钮化（PR #53 通则，见 page-campaign.js 文件头），FONTBOLD 加粗在按钮
 * 场景丢失（printButton 的 content 只接受纯字符串）。
 * @param {number} slot 战役槽位号（来自 SELECT_CAMPAIGN 的 FOR 循环，本
 *   函数固定注册在槽位 1，形参只用于 printButton 的第二实参）
 * @returns {number} RETURN 1
 */
function campaign_exist_1(slot) {
  era.printButton(`${NAME_BOLD}${NAME_REGULAR}`, slot);
  return 1;
}
campaign_exist_family.register(1, campaign_exist_1);

/**
 * @CAMPAIGN_SET_1（:59-71）：选中战役后的初始设置。
 * @returns {number} RETURN 1
 */
async function campaign_set_1() {
  era_flag.hero_campaign_active = 1; // :62 FLAG:400 = 1
  const master = chara_callname(0); // %SAVESTR:MASTER%
  const lines = [
    '极东之地、赤蛮咒森。魔王的支配无法触及的诅咒之地',
    `${master}听到了一条有趣的传言`,
    '咒森的深处、有一尊能令任何女人都淫乱至狂的神奇雕像',
    '强大的邪教集团支配着那片土地、并设置了抵御魔王的铁壁结界',
    `${master}拥有迷惑女人的力量`,
    '迷惑能够出入咒森的巫女、纳为侵略咒森的棋子',
    '用不了多久咒森也会开始向魔王领地派兵吧。然后、将她们也化为棋子吧――',
  ];
  for (const line of lines) {
    era.print(line);
    await era.waitAnyKey();
  }
  return 1;
}
campaign_set_family.register(1, campaign_set_1);

module.exports = {
  campaign_name_1,
  campaign_exist_1,
  campaign_set_1,
};
