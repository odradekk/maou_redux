// GENERATED START
const era = require('#/era-electron');

/**
 * @param {number|string} param
 * @returns {number}
 */
function get(param) {
  return era.get(`mark:${this.id}:${param}`) || 0;
}

class EraMark {
  /**
   * 苦痛刻印
   * @returns {number}
   */
  get "pain_mark"() {
    return era['raw']().data['mark'][this.id][0];
  }
  /**
   * 苦痛刻印
   * @param {number} v
   */
  set "pain_mark"(v) {
    era['raw']().data['mark'][this.id][0] = v;
  }
  /**
   * 快乐刻印
   * @returns {number}
   */
  get "pleasure_mark"() {
    return era['raw']().data['mark'][this.id][1];
  }
  /**
   * 快乐刻印
   * @param {number} v
   */
  set "pleasure_mark"(v) {
    era['raw']().data['mark'][this.id][1] = v;
  }
  /**
   * 屈服刻印
   * @returns {number}
   */
  get "submission_mark"() {
    return era['raw']().data['mark'][this.id][2];
  }
  /**
   * 屈服刻印
   * @param {number} v
   */
  set "submission_mark"(v) {
    era['raw']().data['mark'][this.id][2] = v;
  }
  /**
   * 反抗刻印
   * @returns {number}
   */
  get "resistance_mark"() {
    return era['raw']().data['mark'][this.id][3];
  }
  /**
   * 反抗刻印
   * @param {number} v
   */
  set "resistance_mark"(v) {
    era['raw']().data['mark'][this.id][3] = v;
  }
  /**
   * 反抗刻印履历
   * @returns {number}
   */
  get "resistance_mark_history"() {
    return era['raw']().data['mark'][this.id][4];
  }
  /**
   * 反抗刻印履历
   * @param {number} v
   */
  set "resistance_mark_history"(v) {
    era['raw']().data['mark'][this.id][4] = v;
  }
  /**
   * 异界综合征
   * @returns {number}
   */
  get "otherworld_syndrome"() {
    return era['raw']().data['mark'][this.id][10];
  }
  /**
   * 异界综合征
   * @param {number} v
   */
  set "otherworld_syndrome"(v) {
    era['raw']().data['mark'][this.id][10] = v;
  }
  get = get;
  /**
   * @param {number|string} param
   * @param {number} val
   * @returns {number}
   */
  set(param, val) {
    return era.set(`mark:${this.id}:${param}`, val);
  }
  /**
   * @param {number|string} param
   * @param {number} val
   * @returns {number}
   */
  add(param, val) {
    return era.add(`mark:${this.id}:${param}`, get(param) + val);
  }

  /** @type {number} chara_id */
  constructor(chara_id) {
    this.id = chara_id;
  }
}

module.exports = EraMark;
// GENERATED END