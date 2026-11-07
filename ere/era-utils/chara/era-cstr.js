// GENERATED START
const era = require('#/era-electron');



class EraCstr {
  /**
   * 加入时名字
   * @returns {string}
   */
  get "joined_name"() {
    return era['raw']().data['cstr'][this.id][1];
  }
  /**
   * 加入时名字
   * @param {string} v
   */
  set "joined_name"(v) {
    era['raw']().data['cstr'][this.id][1] = v;
  }
  /**
   * 孩子父亲名字
   * @returns {string}
   */
  get "child_father_name"() {
    return era['raw']().data['cstr'][this.id][2];
  }
  /**
   * 孩子父亲名字
   * @param {string} v
   */
  set "child_father_name"(v) {
    era['raw']().data['cstr'][this.id][2] = v;
  }
  /**
   * 初体验对象名
   * @returns {string}
   */
  get "first_sex_partner_name"() {
    return era['raw']().data['cstr'][this.id][3];
  }
  /**
   * 初体验对象名
   * @param {string} v
   */
  set "first_sex_partner_name"(v) {
    era['raw']().data['cstr'][this.id][3] = v;
  }
  /**
   * 初吻对象名
   * @returns {string}
   */
  get "first_kiss_partner_name"() {
    return era['raw']().data['cstr'][this.id][4];
  }
  /**
   * 初吻对象名
   * @param {string} v
   */
  set "first_kiss_partner_name"(v) {
    era['raw']().data['cstr'][this.id][4] = v;
  }
  /**
   * 家人末路
   * @returns {string}
   */
  get "family_fate"() {
    return era['raw']().data['cstr'][this.id][5];
  }
  /**
   * 家人末路
   * @param {string} v
   */
  set "family_fate"(v) {
    era['raw']().data['cstr'][this.id][5] = v;
  }
  /**
   * 录像标题
   * @returns {string}
   */
  get "video_title"() {
    return era['raw']().data['cstr'][this.id][6];
  }
  /**
   * 录像标题
   * @param {string} v
   */
  set "video_title"(v) {
    era['raw']().data['cstr'][this.id][6] = v;
  }
  /**
   * 自由调教内容
   * @returns {string}
   */
  get "free_train_content"() {
    return era['raw']().data['cstr'][this.id][7];
  }
  /**
   * 自由调教内容
   * @param {string} v
   */
  set "free_train_content"(v) {
    era['raw']().data['cstr'][this.id][7] = v;
  }
  /**
   * 自称（旧位）
   * @returns {string}
   */
  get "self_call_legacy"() {
    return era['raw']().data['cstr'][this.id][31];
  }
  /**
   * 自称（旧位）
   * @param {string} v
   */
  set "self_call_legacy"(v) {
    era['raw']().data['cstr'][this.id][31] = v;
  }
  /**
   * 自称
   * @returns {string}
   */
  get "self_call"() {
    return era['raw']().data['cstr'][this.id][60];
  }
  /**
   * 自称
   * @param {string} v
   */
  set "self_call"(v) {
    era['raw']().data['cstr'][this.id][60] = v;
  }
  /**
   * 故事名
   * @returns {string}
   */
  get "story_name"() {
    return era['raw']().data['cstr'][this.id][99];
  }
  /**
   * 故事名
   * @param {string} v
   */
  set "story_name"(v) {
    era['raw']().data['cstr'][this.id][99] = v;
  }
  /**
   * @param {number|string} param
   * @returns {string}
   */
  get(param) {
    return era.get(`cstr:${this.id}:${param}`) || '';
  }
  /**
   * @param {number|string} param
   * @param {string} val
   * @returns {string}
   */
  set(param, val) {
    return era.set(`cstr:${this.id}:${param}`, val);
  }

  /** @type {number} chara_id */
  constructor(chara_id) {
    this.id = chara_id;
  }
}

module.exports = EraCstr;
// GENERATED END