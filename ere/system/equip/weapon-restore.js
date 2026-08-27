/**
 * @file 装备复原（攻击/防御力的再计算）：@WEAPON_RESTORE。
 *
 * 源: target/ERB/キャラ関数/CHAR_ST.ERB  @WEAPON_RESTORE（:7-66；日循环
 *     每日对全角色调用——SYSTEM ver1.0.3.ERB:267，ere 侧在
 *     ere/system/turnend-settle.js 的装备复原段）。
 *
 * 攻击/防御的「装备效果（7/8）加成」已被原作从回合结算移进本函数
 * （turnend-settle.js 的注释段、SYSTEM ver1.0.3.ERB 行 415-431 同此）。cflag:11/12 属主 dungeon、
 * base:0 同（跨域写走门面）；cflag:9/13/14、talent、exp、maxbase 只读。
 */

'use strict';

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { chara } = require('#/facade/chara');
const { equip_check } = require('#/system/equip/equip-check');

/**
 * @WEAPON_RESTORE（:7-66）：按装备效果与素质重算角色的攻击力/防御力
 * （CFLAG:11/12），铁壁（TALENT:249）低气力时另回体力。
 *
 * 写序与原作一致（逐步赋值，中间写不合并）——回合结算的全量写入断言按
 * 此序核对。
 *
 * @param {number} cid 角色（原作 ARG:0；内部 A = ARG:0）
 */
function weapon_restore(cid) {
  // :12-19 装备効果（W:8 = 2 装備強化）：攻/防 = 基础值 × (RESULT + 10) / 10
  const power = equip_check(cid, 2) + 10;
  chara(cid).dungeon.攻击力 = (era.get(`cflag:${cid}:13`) || 0) * power; // CFLAG:A:13 基础攻击
  chara(cid).dungeon.攻击力 = Math.floor(chara(cid).dungeon.攻击力 / 10);
  chara(cid).dungeon.防御力 = (era.get(`cflag:${cid}:14`) || 0) * power; // CFLAG:A:14 基础防御
  chara(cid).dungeon.防御力 = Math.floor(chara(cid).dungeon.防御力 / 10);

  // :21-28 鉄壁（TALENT:249）：气力 < 40% 时按等级（CFLAG:9）加成并回体力
  if (
    Math.floor(
      ((era.get(`base:${cid}:1`) || 0) * 100) /
        (era.get(`maxbase:${cid}:1`) || 0),
    ) < 40 &&
    era.get(`talent:${cid}:249`)
  ) {
    const level = era.get(`cflag:${cid}:9`) || 0; // CFLAG:A:9 等级
    chara(cid).dungeon.攻击力 += level;
    chara(cid).dungeon.防御力 += level;
    chara(cid).dungeon.体力 += level * 10; // BASE:A:0 += CFLAG:A:9 * 10
    if (chara(cid).dungeon.体力 > (era.get(`maxbase:${cid}:0`) || 0)) {
      chara(cid).dungeon.体力 = era.get(`maxbase:${cid}:0`) || 0;
    }
  }

  // :30-35 装备効果（W:8 = 11 装備劣化）：攻/防 ÷ (RESULT + 1)
  const decay = equip_check(cid, 11) + 1;
  chara(cid).dungeon.攻击力 = Math.floor(chara(cid).dungeon.攻击力 / decay);
  chara(cid).dungeon.防御力 = Math.floor(chara(cid).dungeon.防御力 / decay);

  // :37-41 装备効果（W:8 = 7 攻撃変動）：攻 += RESULT * 10
  const atk_up = equip_check(cid, 7);
  if (atk_up > 0) {
    chara(cid).dungeon.攻击力 += atk_up * 10;
  }

  // :43-47 装备効果（W:8 = 8 防御変動）：防 += RESULT * 10
  const def_up = equip_check(cid, 8);
  if (def_up > 0) {
    chara(cid).dungeon.防御力 += def_up * 10;
  }

  // :49-60 勲章による上位職（EXP:81 勲章数）
  if (era.get(`talent:${cid}:210`)) {
    // 魔界将军：攻击偏重
    chara(cid).dungeon.攻击力 += (era.get(`exp:${cid}:81`) || 0) * 2;
    chara(cid).dungeon.防御力 += era.get(`exp:${cid}:81`) || 0;
  } else if (era.get(`talent:${cid}:211`)) {
    // 魔导神官：防御偏重
    chara(cid).dungeon.攻击力 += era.get(`exp:${cid}:81`) || 0;
    chara(cid).dungeon.防御力 += (era.get(`exp:${cid}:81`) || 0) * 2;
  }

  // :62-66 人狼（TALENT:314 == 2）满月（DAY:2 = 14-16）：攻/防 ×10
  if (
    (era.get(`talent:${cid}:314`) || 0) === 2 &&
    era_flag.date >= 14 &&
    era_flag.date <= 16
  ) {
    chara(cid).dungeon.攻击力 *= 10;
    chara(cid).dungeon.防御力 *= 10;
  }
}

module.exports = { weapon_restore };
