// GENERATED START
const era = require('#/era-electron');

/**
 * @param {number|string} param
 * @returns {number}
 */
function get(param) {
  return era.get(`da:${param}`) || 0;
}

const era_da = {

  get,
  /**
   * @param {number|string} param
   * @param {number} val
   * @returns {number}
   */
  set(param, val) {
    return era.set(`da:${param}`, val);
  },
  /**
   * @param {number|string} param
   * @param {number} val
   * @returns {number}
   */
  add(param, val) {
    return era.set(`da:${param}`, get(param) + val);
  },
};

module.exports = era_da;
// GENERATED END