// GENERATED START
const era = require('#/era-electron');

/**
 * @param {number|string} param
 * @returns {number}
 */
function get(param) {
  return era.get(`maxbase:${this.id}:${param}`) || 0;
}

class EraMaxbase {
  /**
   * 体力
   * @returns {number}
   */
  get "stamina"() {
    return era['raw']().data['maxbase'][this.id][0];
  }
  /**
   * 体力
   * @param {number} v
   */
  set "stamina"(v) {
    era['raw']().data['maxbase'][this.id][0] = v;
  }
  /**
   * 气力
   * @returns {number}
   */
  get "willpower"() {
    return era['raw']().data['maxbase'][this.id][1];
  }
  /**
   * 气力
   * @param {number} v
   */
  set "willpower"(v) {
    era['raw']().data['maxbase'][this.id][1] = v;
  }
  /**
   * 射精槽
   * @returns {number}
   */
  get "ejaculation_gauge"() {
    return era['raw']().data['maxbase'][this.id][2];
  }
  /**
   * 射精槽
   * @param {number} v
   */
  set "ejaculation_gauge"(v) {
    era['raw']().data['maxbase'][this.id][2] = v;
  }
  /**
   * 母乳槽
   * @returns {number}
   */
  get "milk_gauge"() {
    return era['raw']().data['maxbase'][this.id][3];
  }
  /**
   * 母乳槽
   * @param {number} v
   */
  set "milk_gauge"(v) {
    era['raw']().data['maxbase'][this.id][3] = v;
  }
  /**
   * 触手射精槽
   * @returns {number}
   */
  get "tentacle_ejaculation_gauge"() {
    return era['raw']().data['maxbase'][this.id][4];
  }
  /**
   * 触手射精槽
   * @param {number} v
   */
  set "tentacle_ejaculation_gauge"(v) {
    era['raw']().data['maxbase'][this.id][4] = v;
  }
  /**
   * 寿命
   * @returns {number}
   */
  get "lifespan"() {
    return era['raw']().data['maxbase'][this.id][10];
  }
  /**
   * 寿命
   * @param {number} v
   */
  set "lifespan"(v) {
    era['raw']().data['maxbase'][this.id][10] = v;
  }
  get = get;
  /**
   * @param {number|string} param
   * @param {number} val
   * @returns {number}
   */
  set(param, val) {
    return era.set(`maxbase:${this.id}:${param}`, val);
  }
  /**
   * @param {number|string} param
   * @param {number} val
   * @returns {number}
   */
  add(param, val) {
    return era.add(`maxbase:${this.id}:${param}`, get(param) + val);
  }

  /** @type {number} chara_id */
  constructor(chara_id) {
    this.id = chara_id;
  }
}

module.exports = EraMaxbase;
// GENERATED END