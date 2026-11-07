// GENERATED START
const era = require('#/era-electron');

/**
 * @param {number|string} param
 * @returns {number}
 */
function get(param) {
  return era.get(`portcflag:${this.id}:${param}`) || 0;
}

class EraPortcflag {
  /**
   * 数据版本
   * @returns {number}
   */
  get "data_version"() {
    return era['raw']().data['portcflag'][this.id][0];
  }
  /**
   * 数据版本
   * @param {number} v
   */
  set "data_version"(v) {
    era['raw']().data['portcflag'][this.id][0] = v;
  }
  /**
   * 排序编号
   * @returns {number}
   */
  get "sort_number"() {
    return era['raw']().data['portcflag'][this.id][1];
  }
  /**
   * 排序编号
   * @param {number} v
   */
  set "sort_number"(v) {
    era['raw']().data['portcflag'][this.id][1] = v;
  }
  /**
   * 预设模板
   * @returns {number}
   */
  get "template_no"() {
    return era['raw']().data['portcflag'][this.id][2];
  }
  /**
   * 预设模板
   * @param {number} v
   */
  set "template_no"(v) {
    era['raw']().data['portcflag'][this.id][2] = v;
  }
  get = get;
  /**
   * @param {number|string} param
   * @param {number} val
   * @returns {number}
   */
  set(param, val) {
    return era.set(`portcflag:${this.id}:${param}`, val);
  }
  /**
   * @param {number|string} param
   * @param {number} val
   * @returns {number}
   */
  add(param, val) {
    return era.add(`portcflag:${this.id}:${param}`, get(param) + val);
  }

  /** @type {number} chara_id */
  constructor(chara_id) {
    this.id = chara_id;
  }
}

module.exports = EraPortcflag;
// GENERATED END