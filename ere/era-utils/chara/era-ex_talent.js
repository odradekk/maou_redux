// GENERATED START
const era = require('#/era-electron');

/**
 * @param {number|string} param
 * @returns {number}
 */
function get(param) {
  return era.get(`ex_talent:${this.id}:${param}`) || 0;
}

class EraEx_talent {
  /**
   * 灵魂错位
   * @returns {number}
   */
  get "soul_misplaced"() {
    return era['raw']().data['ex_talent'][this.id][0];
  }
  /**
   * 灵魂错位
   * @param {number} v
   */
  set "soul_misplaced"(v) {
    era['raw']().data['ex_talent'][this.id][0] = v;
  }
  /**
   * 近卫
   * @returns {number}
   */
  get "royal_guard"() {
    return era['raw']().data['ex_talent'][this.id][1];
  }
  /**
   * 近卫
   * @param {number} v
   */
  set "royal_guard"(v) {
    era['raw']().data['ex_talent'][this.id][1] = v;
  }
  /**
   * 后代
   * @returns {number}
   */
  get "offspring"() {
    return era['raw']().data['ex_talent'][this.id][2];
  }
  /**
   * 后代
   * @param {number} v
   */
  set "offspring"(v) {
    era['raw']().data['ex_talent'][this.id][2] = v;
  }
  /**
   * 魔王替身
   * @returns {number}
   */
  get "demon_king_double"() {
    return era['raw']().data['ex_talent'][this.id][3];
  }
  /**
   * 魔王替身
   * @param {number} v
   */
  set "demon_king_double"(v) {
    era['raw']().data['ex_talent'][this.id][3] = v;
  }
  /**
   * 狂王替身
   * @returns {number}
   */
  get "mad_king_double"() {
    return era['raw']().data['ex_talent'][this.id][4];
  }
  /**
   * 狂王替身
   * @param {number} v
   */
  set "mad_king_double"(v) {
    era['raw']().data['ex_talent'][this.id][4] = v;
  }
  /**
   * 琼
   * @returns {number}
   */
  get "qiong"() {
    return era['raw']().data['ex_talent'][this.id][101];
  }
  /**
   * 琼
   * @param {number} v
   */
  set "qiong"(v) {
    era['raw']().data['ex_talent'][this.id][101] = v;
  }
  /**
   * 普林希斯
   * @returns {number}
   */
  get "priscilla"() {
    return era['raw']().data['ex_talent'][this.id][102];
  }
  /**
   * 普林希斯
   * @param {number} v
   */
  set "priscilla"(v) {
    era['raw']().data['ex_talent'][this.id][102] = v;
  }
  /**
   * 嘉德
   * @returns {number}
   */
  get "garde"() {
    return era['raw']().data['ex_talent'][this.id][103];
  }
  /**
   * 嘉德
   * @param {number} v
   */
  set "garde"(v) {
    era['raw']().data['ex_talent'][this.id][103] = v;
  }
  /**
   * 菲娅
   * @returns {number}
   */
  get "fia"() {
    return era['raw']().data['ex_talent'][this.id][104];
  }
  /**
   * 菲娅
   * @param {number} v
   */
  set "fia"(v) {
    era['raw']().data['ex_talent'][this.id][104] = v;
  }
  /**
   * 魔王
   * @returns {number}
   */
  get "demon_king"() {
    return era['raw']().data['ex_talent'][this.id][200];
  }
  /**
   * 魔王
   * @param {number} v
   */
  set "demon_king"(v) {
    era['raw']().data['ex_talent'][this.id][200] = v;
  }
  /**
   * 丽塔
   * @returns {number}
   */
  get "rita"() {
    return era['raw']().data['ex_talent'][this.id][223];
  }
  /**
   * 丽塔
   * @param {number} v
   */
  set "rita"(v) {
    era['raw']().data['ex_talent'][this.id][223] = v;
  }
  /**
   * 卡拉
   * @returns {number}
   */
  get "kara"() {
    return era['raw']().data['ex_talent'][this.id][777];
  }
  /**
   * 卡拉
   * @param {number} v
   */
  set "kara"(v) {
    era['raw']().data['ex_talent'][this.id][777] = v;
  }
  /**
   * 无双
   * @returns {number}
   */
  get "peerless"() {
    return era['raw']().data['ex_talent'][this.id][801];
  }
  /**
   * 无双
   * @param {number} v
   */
  set "peerless"(v) {
    era['raw']().data['ex_talent'][this.id][801] = v;
  }
  /**
   * 一人军团
   * @returns {number}
   */
  get "one_man_army"() {
    return era['raw']().data['ex_talent'][this.id][901];
  }
  /**
   * 一人军团
   * @param {number} v
   */
  set "one_man_army"(v) {
    era['raw']().data['ex_talent'][this.id][901] = v;
  }
  /**
   * 魔女
   * @returns {number}
   */
  get "witch"() {
    return era['raw']().data['ex_talent'][this.id][902];
  }
  /**
   * 魔女
   * @param {number} v
   */
  set "witch"(v) {
    era['raw']().data['ex_talent'][this.id][902] = v;
  }
  /**
   * 魔界公主
   * @returns {number}
   */
  get "demon_princess"() {
    return era['raw']().data['ex_talent'][this.id][903];
  }
  /**
   * 魔界公主
   * @param {number} v
   */
  set "demon_princess"(v) {
    era['raw']().data['ex_talent'][this.id][903] = v;
  }
  /**
   * 天神
   * @returns {number}
   */
  get "deity"() {
    return era['raw']().data['ex_talent'][this.id][904];
  }
  /**
   * 天神
   * @param {number} v
   */
  set "deity"(v) {
    era['raw']().data['ex_talent'][this.id][904] = v;
  }
  get = get;
  /**
   * @param {number|string} param
   * @param {number} val
   * @returns {number}
   */
  set(param, val) {
    return era.set(`ex_talent:${this.id}:${param}`, val);
  }
  /**
   * @param {number|string} param
   * @param {number} val
   * @returns {number}
   */
  add(param, val) {
    return era.add(`ex_talent:${this.id}:${param}`, get(param) + val);
  }

  /** @type {number} chara_id */
  constructor(chara_id) {
    this.id = chara_id;
  }
}

module.exports = EraEx_talent;
// GENERATED END