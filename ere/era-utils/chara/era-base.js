// GENERATED START
const era = require('#/era-electron');

/**
 * @param {number|string} param
 * @returns {number}
 */
function get(param) {
  return era.get(`base:${this.id}:${param}`) || 0;
}
/**
 * @param {number|string} id
 * @param {number} v
 */
function setBase(id, v) {
  const maxbase = era['raw']().data['maxbase'][this.id][id];
  if (maxbase > 0) {
    if (v < 0) {
      v = 0;
    } else if (v > maxbase) {
      v = maxbase;
    }
  }
  era['raw']().data['base'][this.id][id] = v;
}

class EraBase {
  /**
   * 体力
   * @returns {number}
   */
  get "stamina"() {
    return era['raw']().data['base'][this.id][0];
  }
  /**
   * 体力
   * @param {number} v
   */
  set "stamina"(v) {
    setBase.call(this, 0, v);
  }
  /**
   * 气力
   * @returns {number}
   */
  get "willpower"() {
    return era['raw']().data['base'][this.id][1];
  }
  /**
   * 气力
   * @param {number} v
   */
  set "willpower"(v) {
    setBase.call(this, 1, v);
  }
  /**
   * 射精槽
   * @returns {number}
   */
  get "ejaculation_gauge"() {
    return era['raw']().data['base'][this.id][2];
  }
  /**
   * 射精槽
   * @param {number} v
   */
  set "ejaculation_gauge"(v) {
    setBase.call(this, 2, v);
  }
  /**
   * 母乳槽
   * @returns {number}
   */
  get "milk_gauge"() {
    return era['raw']().data['base'][this.id][3];
  }
  /**
   * 母乳槽
   * @param {number} v
   */
  set "milk_gauge"(v) {
    setBase.call(this, 3, v);
  }
  /**
   * 触手射精槽
   * @returns {number}
   */
  get "tentacle_ejaculation_gauge"() {
    return era['raw']().data['base'][this.id][4];
  }
  /**
   * 触手射精槽
   * @param {number} v
   */
  set "tentacle_ejaculation_gauge"(v) {
    setBase.call(this, 4, v);
  }
  /**
   * 寿命
   * @returns {number}
   */
  get "lifespan"() {
    return era['raw']().data['base'][this.id][10];
  }
  /**
   * 寿命
   * @param {number} v
   */
  set "lifespan"(v) {
    setBase.call(this, 10, v);
  }
  get = get;
  /**
   * @param {number|string} param
   * @param {number} val
   * @returns {number}
   */
  set(param, val) {
    return era.set(`base:${this.id}:${param}`, val);
  }
  /**
   * @param {number|string} param
   * @param {number} val
   * @returns {number}
   */
  add(param, val) {
    return era.add(`base:${this.id}:${param}`, get(param) + val);
  }

  /** @type {number} chara_id */
  constructor(chara_id) {
    this.id = chara_id;
  }
}

module.exports = EraBase;
// GENERATED END