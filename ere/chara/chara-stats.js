/**
 * @file 角色数值的通用变动与识别函数（issue #332）。
 *
 * 源: target/ERB/キャラ関数/CHAR_ST.ERB  @KARMA（:71-89）、
 *       @FAITH（:90-108）、@CHARA_LV_CHECK（:109-128）、
 *       @CHARA_ID_OUTPUT（:129-150）
 */

const era = require('#/era-electron');
const { chara } = require('#/facade/chara');
const { chara_callname } = require('#/utils/callname-utils');

/**
 * @KARMA：增减善恶值；魂缚角色不变，结果钳在 [-200, 200]。
 * @param {number} cid 角色 ID
 * @param {number} delta 增减量
 * @returns {number} 原作 RETURN 0
 */
function karma(cid, delta) {
  if (chara(cid).stronghold.魂缚) {
    return 0; // CHAR_ST.ERB 77-78 行
  }
  const value = chara(cid).chara.善恶值 + delta; // CFLAG:151 善恶值
  chara(cid).chara.善恶值 = Math.max(-200, Math.min(200, value)); // :82-86
  return 0;
}

/**
 * @FAITH：增减信仰值；魂缚角色不变，结果钳在 [0, 100]。
 * @param {number} cid 角色 ID
 * @param {number} delta 增减量
 * @returns {number} 原作 RETURN 0
 */
function faith(cid, delta) {
  if (chara(cid).stronghold.魂缚) {
    return 0; // CHAR_ST.ERB 96-97 行
  }
  const value = (era.get(`cflag:${cid}:152`) || 0) + delta; // CFLAG:152 信仰
  era.set(`cflag:${cid}:152`, Math.max(0, Math.min(100, value))); // :101-105
  return 0;
}

/**
 * @CHARA_LV_CHECK：战斗经验跌到零以下时降一级并同步战斗四维。
 * @param {number} cid 角色 ID
 * @returns {Promise<number>} 原作 RETURN 0
 */
async function chara_lv_check(cid) {
  if (chara(cid).dungeon.战斗经验 >= 0) {
    return 0; // :114 IF EXP:CHARA:80 < 0
  }

  const view = chara(cid);
  const level = (era.get(`cflag:${cid}:9`) || 0) - 1; // CFLAG:9 等级
  era.set(`cflag:${cid}:9`, level);
  view.dungeon.战斗经验 = level * 10; // :116 EXP:80 = 等级 * 10
  view.dungeon.攻击力 -= 1; // CFLAG:11 攻击力
  view.dungeon.防御力 -= 1; // CFLAG:12 防御力
  view.chara.基础攻击 -= 1; // CFLAG:13 基础攻击
  view.chara.基础防御 -= 1; // CFLAG:14 基础防御

  if (((era.get('flag:5') || 0) & 32) !== 0) {
    await era.printAndWait(`${chara_callname(cid)}下降了一级`); // :123-124
  }
  return 0;
}

/**
 * @CHARA_ID_OUTPUT：按经历、首个性格与家族构成生成角色识别号。
 * @param {number} cid 角色 ID
 * @returns {number} 原作 RETURN LOCAL
 */
function chara_id_output(cid) {
  let result = (era.get(`talent:${cid}:315`) || 0) * 10; // 成为勇者前的生活
  let personality = 179;
  for (let index = 160; index < 179; index += 1) {
    if (era.get(`talent:${cid}:${index}`)) {
      personality = index;
      break;
    }
  }
  personality -= 1; // :141 LOCAL:1 -= 1（原作有意保留的偏移）
  result += (personality - 160) * 1000;
  result += (era.get(`talent:${cid}:320`) || 0) * 100000; // 家族构成
  return result;
}

module.exports = { karma, faith, chara_lv_check, chara_id_output };
