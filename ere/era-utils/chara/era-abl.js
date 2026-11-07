// GENERATED START
const era = require('#/era-electron');

/**
 * @param {number|string} param
 * @returns {number}
 */
function get(param) {
  return era.get(`abl:${this.id}:${param}`) || 0;
}

class EraAbl {
  /**
   * 阴蒂感觉
   * @returns {number}
   */
  get "clitoris_feeling"() {
    return era['raw']().data['abl'][this.id][0];
  }
  /**
   * 阴蒂感觉
   * @param {number} v
   */
  set "clitoris_feeling"(v) {
    era['raw']().data['abl'][this.id][0] = v;
  }
  /**
   * 乳房感觉
   * @returns {number}
   */
  get "breast_feeling"() {
    return era['raw']().data['abl'][this.id][1];
  }
  /**
   * 乳房感觉
   * @param {number} v
   */
  set "breast_feeling"(v) {
    era['raw']().data['abl'][this.id][1] = v;
  }
  /**
   * 私处感觉
   * @returns {number}
   */
  get "vagina_feeling"() {
    return era['raw']().data['abl'][this.id][2];
  }
  /**
   * 私处感觉
   * @param {number} v
   */
  set "vagina_feeling"(v) {
    era['raw']().data['abl'][this.id][2] = v;
  }
  /**
   * 肛门感觉
   * @returns {number}
   */
  get "anal_feeling"() {
    return era['raw']().data['abl'][this.id][3];
  }
  /**
   * 肛门感觉
   * @param {number} v
   */
  set "anal_feeling"(v) {
    era['raw']().data['abl'][this.id][3] = v;
  }
  /**
   * 局部感觉
   * @returns {number}
   */
  get "penis_feeling"() {
    return era['raw']().data['abl'][this.id][4];
  }
  /**
   * 局部感觉
   * @param {number} v
   */
  set "penis_feeling"(v) {
    era['raw']().data['abl'][this.id][4] = v;
  }
  /**
   * 顺从
   * @returns {number}
   */
  get "obedience"() {
    return era['raw']().data['abl'][this.id][10];
  }
  /**
   * 顺从
   * @param {number} v
   */
  set "obedience"(v) {
    era['raw']().data['abl'][this.id][10] = v;
  }
  /**
   * 欲望
   * @returns {number}
   */
  get "lust"() {
    return era['raw']().data['abl'][this.id][11];
  }
  /**
   * 欲望
   * @param {number} v
   */
  set "lust"(v) {
    era['raw']().data['abl'][this.id][11] = v;
  }
  /**
   * 技巧
   * @returns {number}
   */
  get "technique"() {
    return era['raw']().data['abl'][this.id][12];
  }
  /**
   * 技巧
   * @param {number} v
   */
  set "technique"(v) {
    era['raw']().data['abl'][this.id][12] = v;
  }
  /**
   * 侍奉技术
   * @returns {number}
   */
  get "service_skill"() {
    return era['raw']().data['abl'][this.id][13];
  }
  /**
   * 侍奉技术
   * @param {number} v
   */
  set "service_skill"(v) {
    era['raw']().data['abl'][this.id][13] = v;
  }
  /**
   * 性交技术
   * @returns {number}
   */
  get "intercourse_skill"() {
    return era['raw']().data['abl'][this.id][14];
  }
  /**
   * 性交技术
   * @param {number} v
   */
  set "intercourse_skill"(v) {
    era['raw']().data['abl'][this.id][14] = v;
  }
  /**
   * 话术
   * @returns {number}
   */
  get "talk_skill"() {
    return era['raw']().data['abl'][this.id][15];
  }
  /**
   * 话术
   * @param {number} v
   */
  set "talk_skill"(v) {
    era['raw']().data['abl'][this.id][15] = v;
  }
  /**
   * 侍奉精神
   * @returns {number}
   */
  get "service_spirit"() {
    return era['raw']().data['abl'][this.id][16];
  }
  /**
   * 侍奉精神
   * @param {number} v
   */
  set "service_spirit"(v) {
    era['raw']().data['abl'][this.id][16] = v;
  }
  /**
   * 露出癖
   * @returns {number}
   */
  get "exhibitionism"() {
    return era['raw']().data['abl'][this.id][17];
  }
  /**
   * 露出癖
   * @param {number} v
   */
  set "exhibitionism"(v) {
    era['raw']().data['abl'][this.id][17] = v;
  }
  /**
   * 抖ｓ气质
   * @returns {number}
   */
  get "sadist_temper"() {
    return era['raw']().data['abl'][this.id][20];
  }
  /**
   * 抖ｓ气质
   * @param {number} v
   */
  set "sadist_temper"(v) {
    era['raw']().data['abl'][this.id][20] = v;
  }
  /**
   * 抖ｍ气质
   * @returns {number}
   */
  get "masochist_temper"() {
    return era['raw']().data['abl'][this.id][21];
  }
  /**
   * 抖ｍ气质
   * @param {number} v
   */
  set "masochist_temper"(v) {
    era['raw']().data['abl'][this.id][21] = v;
  }
  /**
   * 百合气质
   * @returns {number}
   */
  get "lesbian_temper"() {
    return era['raw']().data['abl'][this.id][22];
  }
  /**
   * 百合气质
   * @param {number} v
   */
  set "lesbian_temper"(v) {
    era['raw']().data['abl'][this.id][22] = v;
  }
  /**
   * 断背气质
   * @returns {number}
   */
  get "gay_temper"() {
    return era['raw']().data['abl'][this.id][23];
  }
  /**
   * 断背气质
   * @param {number} v
   */
  set "gay_temper"(v) {
    era['raw']().data['abl'][this.id][23] = v;
  }
  /**
   * 性交中毒
   * @returns {number}
   */
  get "intercourse_addiction"() {
    return era['raw']().data['abl'][this.id][30];
  }
  /**
   * 性交中毒
   * @param {number} v
   */
  set "intercourse_addiction"(v) {
    era['raw']().data['abl'][this.id][30] = v;
  }
  /**
   * 自慰中毒
   * @returns {number}
   */
  get "masturbation_addiction"() {
    return era['raw']().data['abl'][this.id][31];
  }
  /**
   * 自慰中毒
   * @param {number} v
   */
  set "masturbation_addiction"(v) {
    era['raw']().data['abl'][this.id][31] = v;
  }
  /**
   * 精液中毒
   * @returns {number}
   */
  get "semen_addiction"() {
    return era['raw']().data['abl'][this.id][32];
  }
  /**
   * 精液中毒
   * @param {number} v
   */
  set "semen_addiction"(v) {
    era['raw']().data['abl'][this.id][32] = v;
  }
  /**
   * 百合中毒
   * @returns {number}
   */
  get "lesbian_addiction"() {
    return era['raw']().data['abl'][this.id][33];
  }
  /**
   * 百合中毒
   * @param {number} v
   */
  set "lesbian_addiction"(v) {
    era['raw']().data['abl'][this.id][33] = v;
  }
  /**
   * 卖淫中毒
   * @returns {number}
   */
  get "prostitution_addiction"() {
    return era['raw']().data['abl'][this.id][37];
  }
  /**
   * 卖淫中毒
   * @param {number} v
   */
  set "prostitution_addiction"(v) {
    era['raw']().data['abl'][this.id][37] = v;
  }
  /**
   * 兽奸中毒
   * @returns {number}
   */
  get "bestiality_addiction"() {
    return era['raw']().data['abl'][this.id][39];
  }
  /**
   * 兽奸中毒
   * @param {number} v
   */
  set "bestiality_addiction"(v) {
    era['raw']().data['abl'][this.id][39] = v;
  }
  /**
   * 局部中毒
   * @returns {number}
   */
  get "penis_addiction"() {
    return era['raw']().data['abl'][this.id][40];
  }
  /**
   * 局部中毒
   * @param {number} v
   */
  set "penis_addiction"(v) {
    era['raw']().data['abl'][this.id][40] = v;
  }
  /**
   * 学习能力
   * @returns {number}
   */
  get "study_ability"() {
    return era['raw']().data['abl'][this.id][100];
  }
  /**
   * 学习能力
   * @param {number} v
   */
  set "study_ability"(v) {
    era['raw']().data['abl'][this.id][100] = v;
  }
  /**
   * 运动能力
   * @returns {number}
   */
  get "athletic_ability"() {
    return era['raw']().data['abl'][this.id][101];
  }
  /**
   * 运动能力
   * @param {number} v
   */
  set "athletic_ability"(v) {
    era['raw']().data['abl'][this.id][101] = v;
  }
  /**
   * 战斗能力
   * @returns {number}
   */
  get "combat_ability"() {
    return era['raw']().data['abl'][this.id][102];
  }
  /**
   * 战斗能力
   * @param {number} v
   */
  set "combat_ability"(v) {
    era['raw']().data['abl'][this.id][102] = v;
  }
  /**
   * 感性
   * @returns {number}
   */
  get "sensibility"() {
    return era['raw']().data['abl'][this.id][103];
  }
  /**
   * 感性
   * @param {number} v
   */
  set "sensibility"(v) {
    era['raw']().data['abl'][this.id][103] = v;
  }
  get = get;
  /**
   * @param {number|string} param
   * @param {number} val
   * @returns {number}
   */
  set(param, val) {
    return era.set(`abl:${this.id}:${param}`, val);
  }
  /**
   * @param {number|string} param
   * @param {number} val
   * @returns {number}
   */
  add(param, val) {
    return era.add(`abl:${this.id}:${param}`, get(param) + val);
  }

  /** @type {number} chara_id */
  constructor(chara_id) {
    this.id = chara_id;
  }
}

module.exports = EraAbl;
// GENERATED END