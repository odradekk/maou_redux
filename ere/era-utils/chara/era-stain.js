// GENERATED START
const era = require('#/era-electron');

/**
 * @param {number|string} param
 * @returns {number}
 */
function get(param) {
  return era.get(`stain:${this.id}:${param}`) || 0;
}

class EraStain {
  /**
   * 阴茎污渍
   * @returns {number}
   */
  get "penis_stain"() {
    return era['raw']().data['stain'][this.id][2];
  }
  /**
   * 阴茎污渍
   * @param {number} v
   */
  set "penis_stain"(v) {
    era['raw']().data['stain'][this.id][2] = v;
  }
  /**
   * 阴道污渍
   * @returns {number}
   */
  get "vagina_stain"() {
    return era['raw']().data['stain'][this.id][3];
  }
  /**
   * 阴道污渍
   * @param {number} v
   */
  set "vagina_stain"(v) {
    era['raw']().data['stain'][this.id][3] = v;
  }
  /**
   * 胸部污渍
   * @returns {number}
   */
  get "breast_stain"() {
    return era['raw']().data['stain'][this.id][5];
  }
  /**
   * 胸部污渍
   * @param {number} v
   */
  set "breast_stain"(v) {
    era['raw']().data['stain'][this.id][5] = v;
  }
  get = get;
  /**
   * @param {number|string} param
   * @param {number} val
   * @returns {number}
   */
  set(param, val) {
    return era.set(`stain:${this.id}:${param}`, val);
  }
  /**
   * @param {number|string} param
   * @param {number} val
   * @returns {number}
   */
  add(param, val) {
    return era.add(`stain:${this.id}:${param}`, get(param) + val);
  }

  /** @type {number} chara_id */
  constructor(chara_id) {
    this.id = chara_id;
  }
}

module.exports = EraStain;
// GENERATED END