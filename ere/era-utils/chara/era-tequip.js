// GENERATED START
const era = require('#/era-electron');

/**
 * @param {number|string} param
 * @returns {number}
 */
function get(param) {
  return era.get(`tequip:${this.id}:${param}`) || 0;
}

class EraTequip {
  /**
   * 淋浴中
   * @returns {number}
   */
  get "showering"() {
    return era['raw']().data['tequip'][this.id][18];
  }
  /**
   * 淋浴中
   * @param {number} v
   */
  set "showering"(v) {
    era['raw']().data['tequip'][this.id][18] = v;
  }
  /**
   * 媚药效果
   * @returns {number}
   */
  get "aphrodisiac"() {
    return era['raw']().data['tequip'][this.id][21];
  }
  /**
   * 媚药效果
   * @param {number} v
   */
  set "aphrodisiac"(v) {
    era['raw']().data['tequip'][this.id][21] = v;
  }
  /**
   * 利尿剂
   * @returns {number}
   */
  get "diuretic"() {
    return era['raw']().data['tequip'][this.id][22];
  }
  /**
   * 利尿剂
   * @param {number} v
   */
  set "diuretic"(v) {
    era['raw']().data['tequip'][this.id][22] = v;
  }
  /**
   * 主人避孕套
   * @returns {number}
   */
  get "master_condom"() {
    return era['raw']().data['tequip'][this.id][35];
  }
  /**
   * 主人避孕套
   * @param {number} v
   */
  set "master_condom"(v) {
    era['raw']().data['tequip'][this.id][35] = v;
  }
  /**
   * 助手避孕套
   * @returns {number}
   */
  get "assistant_condom"() {
    return era['raw']().data['tequip'][this.id][36];
  }
  /**
   * 助手避孕套
   * @param {number} v
   */
  set "assistant_condom"(v) {
    era['raw']().data['tequip'][this.id][36] = v;
  }
  /**
   * 对象避孕套
   * @returns {number}
   */
  get "target_condom"() {
    return era['raw']().data['tequip'][this.id][37];
  }
  /**
   * 对象避孕套
   * @param {number} v
   */
  set "target_condom"(v) {
    era['raw']().data['tequip'][this.id][37] = v;
  }
  /**
   * 口塞
   * @returns {number}
   */
  get "ball_gag"() {
    return era['raw']().data['tequip'][this.id][45];
  }
  /**
   * 口塞
   * @param {number} v
   */
  set "ball_gag"(v) {
    era['raw']().data['tequip'][this.id][45] = v;
  }
  /**
   * 录像摄影
   * @returns {number}
   */
  get "video_recording"() {
    return era['raw']().data['tequip'][this.id][53];
  }
  /**
   * 录像摄影
   * @param {number} v
   */
  set "video_recording"(v) {
    era['raw']().data['tequip'][this.id][53] = v;
  }
  /**
   * 野外play
   * @returns {number}
   */
  get "outdoor_play"() {
    return era['raw']().data['tequip'][this.id][54];
  }
  /**
   * 野外play
   * @param {number} v
   */
  set "outdoor_play"(v) {
    era['raw']().data['tequip'][this.id][54] = v;
  }
  /**
   * 死斗场
   * @returns {number}
   */
  get "colosseum"() {
    return era['raw']().data['tequip'][this.id][55];
  }
  /**
   * 死斗场
   * @param {number} v
   */
  set "colosseum"(v) {
    era['raw']().data['tequip'][this.id][55] = v;
  }
  /**
   * 羞耻play
   * @returns {number}
   */
  get "shame_play"() {
    return era['raw']().data['tequip'][this.id][57];
  }
  /**
   * 羞耻play
   * @param {number} v
   */
  set "shame_play"(v) {
    era['raw']().data['tequip'][this.id][57] = v;
  }
  /**
   * 浴室play
   * @returns {number}
   */
  get "bathroom_play"() {
    return era['raw']().data['tequip'][this.id][58];
  }
  /**
   * 浴室play
   * @param {number} v
   */
  set "bathroom_play"(v) {
    era['raw']().data['tequip'][this.id][58] = v;
  }
  /**
   * 新妻play
   * @returns {number}
   */
  get "newlywed_play"() {
    return era['raw']().data['tequip'][this.id][59];
  }
  /**
   * 新妻play
   * @param {number} v
   */
  set "newlywed_play"(v) {
    era['raw']().data['tequip'][this.id][59] = v;
  }
  /**
   * 兽奸
   * @returns {number}
   */
  get "bestiality"() {
    return era['raw']().data['tequip'][this.id][89];
  }
  /**
   * 兽奸
   * @param {number} v
   */
  set "bestiality"(v) {
    era['raw']().data['tequip'][this.id][89] = v;
  }
  /**
   * 触手
   * @returns {number}
   */
  get "tentacle"() {
    return era['raw']().data['tequip'][this.id][90];
  }
  /**
   * 触手
   * @param {number} v
   */
  set "tentacle"(v) {
    era['raw']().data['tequip'][this.id][90] = v;
  }
  get = get;
  /**
   * @param {number|string} param
   * @param {number} val
   * @returns {number}
   */
  set(param, val) {
    return era.set(`tequip:${this.id}:${param}`, val);
  }
  /**
   * @param {number|string} param
   * @param {number} val
   * @returns {number}
   */
  add(param, val) {
    return era.add(`tequip:${this.id}:${param}`, get(param) + val);
  }

  /** @type {number} chara_id */
  constructor(chara_id) {
    this.id = chara_id;
  }
}

module.exports = EraTequip;
// GENERATED END