/**
 * @file 装备佩戴检查与角色强化：@EQUIP_CHECK、@EQUIP_POWERUP。
 *
 * 源: target/ERB/其他/EQUIP.ERB  @EQUIP_CHECK（:65-86）
 *     @EQUIP_POWERUP（:904-1027）
 */

'use strict';

const era = require('#/era-electron');
const { equip_database } = require('#/system/equip/equip-lookup');

/**
 * @EQUIP_CHECK（:65-86）：算出角色两枚装饰（CFLAG:551/552）里、效果列等于
 * 效果号 的装备强度合计。原作以全局 W:8 传效果号、W:3 比对、W:2 累计，
 * 此处改为显式参数（调用点的效果号见各处注释：回合结算 4/13/5/13/6/10/14/
 * 9/15，@WEAPON_RESTORE 2/11/7/8）。
 *
 * 空槽 -1 与未装备（引擎缺省 0 = 装饰戒指、效果 0）都不贡献强度；武装
 * （CFLAG:550）不参与——原作只查两枚装饰。
 *
 * @param {number} cid 角色（原作 A；< 0 时恒 0，:69-70）
 * @param {number} effect_no 效果号（原作 W:8）
 * @returns {number} RESULT：强度合计（无匹配为 0）
 */
function equip_check(cid, effect_no) {
  // :69-70 SIF A < 0 RETURN 0
  if (cid < 0) {
    return 0;
  }

  let total = 0; // :71 LOCAL = 0
  // :72-84 两枚装饰槽同构（CFLAG:A:551 → CFLAG:A:552）
  for (const slot of [551, 552]) {
    const w = { 存储编号: era.get(`cflag:${cid}:${slot}`) || 0 };
    if (equip_database(w) && w.效果 === effect_no) {
      // :75-76 / :82-83 SIF W:3 == W:8 → LOCAL += W:2
      total += w.强度;
    }
  }
  return total;
}

/**
 * @EQUIP_POWERUP（:904-1027）：用角色素质强化 w 里的装备能力。
 * **必须在 equip_database 之后调用**（原作文件头说明 :907）；只改 w，不写
 * 任何引擎变量。素质号 → 名称见 yml/Talent.yml。
 *
 * @param {object} w 装备记录（equip_database 已填充）
 * @param {number} cid 角色（原作 ARG:0）
 */
function equip_powerup(w, cid) {
  // :911-914 初心者（TALENT:291）：伤害减少·失手增加
  if ((era.get(`talent:${cid}:291`) || 0) === 1) {
    w.伤害强化 -= 10;
    w.失手率 += 10;
  }

  // :917-918 恶魔尾巴（246）：伤害强化
  if ((era.get(`talent:${cid}:246`) || 0) === 1) {
    w.伤害强化 += 10;
  }

  // :921-922 恶魔眼睛（247）：气力伤害强化
  if ((era.get(`talent:${cid}:247`) || 0) === 1) {
    w.气力伤害 += 10;
  }

  // :925-928 独眼（259）：伤害强化·失手增加
  if ((era.get(`talent:${cid}:259`) || 0) === 1) {
    w.伤害强化 += 10;
    w.失手率 += 10;
  }

  // :931-934 额头天眼（260）：气力伤害强化·气力消耗
  if ((era.get(`talent:${cid}:260`) || 0) === 1) {
    w.气力伤害 += 10;
    w.气力回复 -= 10;
  }

  // :937-940 角（264）：伤害强化·气力消耗
  if ((era.get(`talent:${cid}:264`) || 0) === 1) {
    w.伤害强化 += 10;
    w.气力回复 -= 10;
  }

  // :943-944 精灵（TALENT:314 == 1）持弓箭（识别号 45）：连续加成
  if (w.识别号 === 45 && (era.get(`talent:${cid}:314`) || 0) === 1) {
    w.连击率 += 10;
  }

  // :947-948 天使（314 == 6）：气力回复
  if ((era.get(`talent:${cid}:314`) || 0) === 6) {
    w.气力回复 += 10;
  }

  // :951-952 黑暗精灵（314 == 7）：气力伤害强化
  if ((era.get(`talent:${cid}:314`) || 0) === 7) {
    w.气力伤害 += 10;
  }

  // :955-956 堕天使（314 == 8）：连续攻击
  if ((era.get(`talent:${cid}:314`) || 0) === 8) {
    w.连击率 += 10;
  }

  // :959-960 魔族（314 == 9）：防御伤害
  if ((era.get(`talent:${cid}:314`) || 0) === 9) {
    w.防御伤害 += 10;
  }

  // :964-999 火/冰/雷之能力者（275/276/277）：GETBIT W:6, 1/2/3 = & 2/4/8。
  // 已具对应属性 → 强化；无属性 → 无风险获得该属性
  if (era.get(`talent:${cid}:275`)) {
    // :966-973 火之能力者
    if (w.特殊 & 2) {
      w.伤害强化 += 10;
    } else {
      w.特殊 += 2;
    }
  }

  if (era.get(`talent:${cid}:276`)) {
    // :976-986 冰之能力者
    if (w.特殊 & 4) {
      w.连击率 += 10;
    } else {
      w.特殊 += 4;
    }
  }

  if (era.get(`talent:${cid}:277`)) {
    // :988-999 雷之能力者
    if (w.特殊 & 8) {
      w.连击率 += 5;
      w.伤害强化 += 5;
    } else {
      w.特殊 += 8;
    }
  }

  // :1001-1012 光之能力者（278）：按气力回复正负分流
  if (era.get(`talent:${cid}:278`)) {
    if (w.气力回复 > 0) {
      w.连击率 += 5;
      w.伤害强化 += 5;
      w.气力回复 += 5;
    } else {
      w.气力回复 += 10;
    }
  }

  // :1014-1025 暗之能力者（279）：按气力伤害正负分流
  if (era.get(`talent:${cid}:279`)) {
    if (w.气力伤害 > 0) {
      w.连击率 += 5;
      w.伤害强化 += 5;
      w.气力伤害 += 5;
    } else {
      w.气力伤害 += 10;
    }
  }
}

module.exports = { equip_check, equip_powerup };
