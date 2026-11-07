// GENERATED START
const era = require('#/era-electron');

/**
 * @param {number|string} param
 * @returns {number}
 */
function get(param) {
  return era.get(`ex:${this.id}:${param}`) || 0;
}

class EraEx {
  /**
   * 阴蒂绝顶
   * @returns {number}
   */
  get "clitoris_orgasm"() {
    return era['raw']().data['ex'][this.id][0];
  }
  /**
   * 阴蒂绝顶
   * @param {number} v
   */
  set "clitoris_orgasm"(v) {
    era['raw']().data['ex'][this.id][0] = v;
  }
  /**
   * 私处绝顶
   * @returns {number}
   */
  get "vagina_orgasm"() {
    return era['raw']().data['ex'][this.id][1];
  }
  /**
   * 私处绝顶
   * @param {number} v
   */
  set "vagina_orgasm"(v) {
    era['raw']().data['ex'][this.id][1] = v;
  }
  /**
   * 肛门绝顶
   * @returns {number}
   */
  get "anal_orgasm"() {
    return era['raw']().data['ex'][this.id][2];
  }
  /**
   * 肛门绝顶
   * @param {number} v
   */
  set "anal_orgasm"(v) {
    era['raw']().data['ex'][this.id][2] = v;
  }
  /**
   * 乳房绝顶
   * @returns {number}
   */
  get "breast_orgasm"() {
    return era['raw']().data['ex'][this.id][3];
  }
  /**
   * 乳房绝顶
   * @param {number} v
   */
  set "breast_orgasm"(v) {
    era['raw']().data['ex'][this.id][3] = v;
  }
  /**
   * 癖好绝顶
   * @returns {number}
   */
  get "fetish_orgasm"() {
    return era['raw']().data['ex'][this.id][4];
  }
  /**
   * 癖好绝顶
   * @param {number} v
   */
  set "fetish_orgasm"(v) {
    era['raw']().data['ex'][this.id][4] = v;
  }
  /**
   * 射精绝顶
   * @returns {number}
   */
  get "ejaculation_orgasm"() {
    return era['raw']().data['ex'][this.id][5];
  }
  /**
   * 射精绝顶
   * @param {number} v
   */
  set "ejaculation_orgasm"(v) {
    era['raw']().data['ex'][this.id][5] = v;
  }
  get = get;
  /**
   * @param {number|string} param
   * @param {number} val
   * @returns {number}
   */
  set(param, val) {
    return era.set(`ex:${this.id}:${param}`, val);
  }
  /**
   * @param {number|string} param
   * @param {number} val
   * @returns {number}
   */
  add(param, val) {
    return era.add(`ex:${this.id}:${param}`, get(param) + val);
  }

  /** @type {number} chara_id */
  constructor(chara_id) {
    this.id = chara_id;
  }
}

module.exports = EraEx;
// GENERATED END