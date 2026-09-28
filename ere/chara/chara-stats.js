/**
 * @file 角色数值的通用变动与识别函数（issue #332）。
 *
 */

const era = require('#/era-electron');
const { chara } = require('#/facade/chara');
const { chara_callname } = require('#/utils/callname-utils');

/**
 * karma：增减善恶值；魂缚角色不变，结果钳在 [-200, 200]。
 * @param {number} cid 角色 ID
 * @param {number} delta 增减量
 * @returns {number} 恒 0
 */
function karma(cid, delta) {
  if (chara(cid).stronghold.魂缚) {
    return 0;
  }
  const value = chara(cid).chara.善恶值 + delta; // CFLAG:151 善恶值
  chara(cid).chara.善恶值 = Math.max(-200, Math.min(200, value));
  return 0;
}

/**
 * faith：增减信仰值；魂缚角色不变，结果钳在 [0, 100]。
 * @param {number} cid 角色 ID
 * @param {number} delta 增减量
 * @returns {number} 恒 0
 */
function faith(cid, delta) {
  if (chara(cid).stronghold.魂缚) {
    return 0;
  }
  const value = (era.get(`cflag:${cid}:152`) || 0) + delta; // CFLAG:152 信仰
  era.set(`cflag:${cid}:152`, Math.max(0, Math.min(100, value)));
  return 0;
}

/**
 * chara_lv_check：战斗经验跌到零以下时降一级并同步战斗四维。
 * @param {number} cid 角色 ID
 * @returns {Promise<number>} 恒 0
 */
async function chara_lv_check(cid) {
  if (chara(cid).dungeon.战斗经验 >= 0) {
    return 0;
  }

  const view = chara(cid);
  const level = (era.get(`cflag:${cid}:9`) || 0) - 1; // CFLAG:9 等级
  era.set(`cflag:${cid}:9`, level);
  view.dungeon.战斗经验 = level * 10; // EXP:80 = 等级 * 10
  view.dungeon.攻击力 -= 1; // CFLAG:11 攻击力
  view.dungeon.防御力 -= 1; // CFLAG:12 防御力
  view.chara.基础攻击 -= 1; // CFLAG:13 基础攻击
  view.chara.基础防御 -= 1; // CFLAG:14 基础防御

  if (((era.get('flag:5') || 0) & 32) !== 0) {
    await era.printAndWait(`${chara_callname(cid)}下降了一级`);
  }
  return 0;
}

/**
 * chara_id_output：按经历、首个性格与家族构成生成角色识别号。
 * @param {number} cid 角色 ID
 * @returns {number} 生成的识别号
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
  personality -= 1; // 性格槽取命中序 - 1：160 号性格落在 -1 槽。识别号只做恋人/结婚匹配的相等比较，不展示、不排序，负槽不影响结果
  result += (personality - 160) * 1000;
  result += (era.get(`talent:${cid}:320`) || 0) * 100000; // 家族构成
  return result;
}

module.exports = { karma, faith, chara_lv_check, chara_id_output };
