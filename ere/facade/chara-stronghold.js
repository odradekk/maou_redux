/**
 * @file 角色变量的stronghold域门面（tools/gen-facade.js）。
 *
 * 形状：chara(cid).stronghold.<字段>。生成区勿手改；手写区重生成不碰。
 */

const era = require('#/era-electron');

// GENERATED START —— tools/gen-facade.js 自 ownership + yml 列名 + tools/facade-names.js 生成，勿手改
class StrongholdFacade {
  constructor(cid) {
    this.cid = cid;
  }

  // —— talent ——
  /**
   * 崩坏（talent:cid:9 ↔ TALENT:9）
   * 源: yml/Talent.yml id 9
   * @returns {number}
   */
  get 崩坏() {
    return era.get(`talent:${this.cid}:9`) || 0;
  }
  /**
   * @param {number} v
   */
  set 崩坏(v) {
    era.set(`talent:${this.cid}:9`, v);
  }

  /**
   * 调合知识（talent:cid:55 ↔ TALENT:55）
   * 源: yml/Talent.yml id 55
   * @returns {number}
   */
  get 调合知识() {
    return era.get(`talent:${this.cid}:55`) || 0;
  }
  /**
   * @param {number} v
   */
  set 调合知识(v) {
    era.set(`talent:${this.cid}:55`, v);
  }

  /**
   * 自慰狂（talent:cid:74 ↔ TALENT:74）
   * 源: yml/Talent.yml id 74
   * @returns {number}
   */
  get 自慰狂() {
    return era.get(`talent:${this.cid}:74`) || 0;
  }
  /**
   * @param {number} v
   */
  set 自慰狂(v) {
    era.set(`talent:${this.cid}:74`, v);
  }

  /**
   * 淫乱（talent:cid:76 ↔ TALENT:76）
   * 源: yml/Talent.yml id 76
   * @returns {number}
   */
  get 淫乱() {
    return era.get(`talent:${this.cid}:76`) || 0;
  }
  /**
   * @param {number} v
   */
  set 淫乱(v) {
    era.set(`talent:${this.cid}:76`, v);
  }

  /**
   * 尻穴狂（talent:cid:77 ↔ TALENT:77）
   * 源: yml/Talent.yml id 77
   * @returns {number}
   */
  get 尻穴狂() {
    return era.get(`talent:${this.cid}:77`) || 0;
  }
  /**
   * @param {number} v
   */
  set 尻穴狂(v) {
    era.set(`talent:${this.cid}:77`, v);
  }

  /**
   * 爱慕（talent:cid:85 ↔ TALENT:85）
   * 源: yml/Talent.yml id 85
   * @returns {number}
   */
  get 爱慕() {
    return era.get(`talent:${this.cid}:85`) || 0;
  }
  /**
   * @param {number} v
   */
  set 爱慕(v) {
    era.set(`talent:${this.cid}:85`, v);
  }

  /**
   * 白虎（talent:cid:125 ↔ TALENT:125）
   * 源: yml/Talent.yml id 125
   * @returns {number}
   */
  get 白虎() {
    return era.get(`talent:${this.cid}:125`) || 0;
  }
  /**
   * @param {number} v
   */
  set 白虎(v) {
    era.set(`talent:${this.cid}:125`, v);
  }

  /**
   * 蠕虫（talent:cid:192 ↔ TALENT:192）
   * 源: yml/Talent.yml id 192
   * @returns {number}
   */
  get 蠕虫() {
    return era.get(`talent:${this.cid}:192`) || 0;
  }
  /**
   * @param {number} v
   */
  set 蠕虫(v) {
    era.set(`talent:${this.cid}:192`, v);
  }

  /**
   * 淫核（talent:cid:230 ↔ TALENT:230）
   * 源: yml/Talent.yml id 230
   * @returns {number}
   */
  get 淫核() {
    return era.get(`talent:${this.cid}:230`) || 0;
  }
  /**
   * @param {number} v
   */
  set 淫核(v) {
    era.set(`talent:${this.cid}:230`, v);
  }

  /**
   * 淫乳（talent:cid:231 ↔ TALENT:231）
   * 源: yml/Talent.yml id 231
   * @returns {number}
   */
  get 淫乳() {
    return era.get(`talent:${this.cid}:231`) || 0;
  }
  /**
   * @param {number} v
   */
  set 淫乳(v) {
    era.set(`talent:${this.cid}:231`, v);
  }

  /**
   * 淫壶（talent:cid:232 ↔ TALENT:232）
   * 源: yml/Talent.yml id 232
   * @returns {number}
   */
  get 淫壶() {
    return era.get(`talent:${this.cid}:232`) || 0;
  }
  /**
   * @param {number} v
   */
  set 淫壶(v) {
    era.set(`talent:${this.cid}:232`, v);
  }

  /**
   * 淫肛（talent:cid:233 ↔ TALENT:233）
   * 源: yml/Talent.yml id 233
   * @returns {number}
   */
  get 淫肛() {
    return era.get(`talent:${this.cid}:233`) || 0;
  }
  /**
   * @param {number} v
   */
  set 淫肛(v) {
    era.set(`talent:${this.cid}:233`, v);
  }

  /**
   * 时常发情（talent:cid:271 ↔ TALENT:271）
   * 源: yml/Talent.yml id 271
   * @returns {number}
   */
  get 时常发情() {
    return era.get(`talent:${this.cid}:271`) || 0;
  }
  /**
   * @param {number} v
   */
  set 时常发情(v) {
    era.set(`talent:${this.cid}:271`, v);
  }

  /**
   * 性豪（talent:cid:272 ↔ TALENT:272）
   * 源: yml/Talent.yml id 272
   * @returns {number}
   */
  get 性豪() {
    return era.get(`talent:${this.cid}:272`) || 0;
  }
  /**
   * @param {number} v
   */
  set 性豪(v) {
    era.set(`talent:${this.cid}:272`, v);
  }

  /**
   * 魂缚（talent:cid:274 ↔ TALENT:274）
   * 源: yml/Talent.yml id 274
   * @returns {number}
   */
  get 魂缚() {
    return era.get(`talent:${this.cid}:274`) || 0;
  }
  /**
   * @param {number} v
   */
  set 魂缚(v) {
    era.set(`talent:${this.cid}:274`, v);
  }

  /**
   * 狂王俘虏（talent:cid:280 ↔ TALENT:280）
   * 源: yml/Talent.yml id 280
   * @returns {number}
   */
  get 狂王俘虏() {
    return era.get(`talent:${this.cid}:280`) || 0;
  }
  /**
   * @param {number} v
   */
  set 狂王俘虏(v) {
    era.set(`talent:${this.cid}:280`, v);
  }

  /**
   * 魔王之影（talent:cid:292 ↔ TALENT:292）
   * 源: yml/Talent.yml id 292
   * @returns {number}
   */
  get 魔王之影() {
    return era.get(`talent:${this.cid}:292`) || 0;
  }
  /**
   * @param {number} v
   */
  set 魔王之影(v) {
    era.set(`talent:${this.cid}:292`, v);
  }

  /**
   * 魔界知识（talent:cid:325 ↔ TALENT:325）
   * 源: yml/Talent.yml id 325
   * @returns {number}
   */
  get 魔界知识() {
    return era.get(`talent:${this.cid}:325`) || 0;
  }
  /**
   * @param {number} v
   */
  set 魔界知识(v) {
    era.set(`talent:${this.cid}:325`, v);
  }

  /**
   * 肉芽诅咒（talent:cid:326 ↔ TALENT:326）
   * 源: yml/Talent.yml id 326
   * @returns {number}
   */
  get 肉芽诅咒() {
    return era.get(`talent:${this.cid}:326`) || 0;
  }
  /**
   * @param {number} v
   */
  set 肉芽诅咒(v) {
    era.set(`talent:${this.cid}:326`, v);
  }

  /**
   * 淫魔知识（talent:cid:327 ↔ TALENT:327）
   * 源: yml/Talent.yml id 327
   * @returns {number}
   */
  get 淫魔知识() {
    return era.get(`talent:${this.cid}:327`) || 0;
  }
  /**
   * @param {number} v
   */
  set 淫魔知识(v) {
    era.set(`talent:${this.cid}:327`, v);
  }

  /**
   * 魔虫知识（talent:cid:328 ↔ TALENT:328）
   * 源: yml/Talent.yml id 328
   * @returns {number}
   */
  get 魔虫知识() {
    return era.get(`talent:${this.cid}:328`) || 0;
  }
  /**
   * @param {number} v
   */
  set 魔虫知识(v) {
    era.set(`talent:${this.cid}:328`, v);
  }

  /**
   * 异常妊娠体质（talent:cid:340 ↔ TALENT:340）
   * 源: yml/Talent.yml id 340
   * @returns {number}
   */
  get 异常妊娠体质() {
    return era.get(`talent:${this.cid}:340`) || 0;
  }
  /**
   * @param {number} v
   */
  set 异常妊娠体质(v) {
    era.set(`talent:${this.cid}:340`, v);
  }

  // —— exp ——
  /**
   * 肛门快乐经验（exp:cid:32 ↔ EXP:32）
   * 源: yml/Exp.yml id 32
   * @returns {number}
   */
  get 肛门快乐经验() {
    return era.get(`exp:${this.cid}:32`) || 0;
  }
  /**
   * @param {number} v
   */
  set 肛门快乐经验(v) {
    era.set(`exp:${this.cid}:32`, v);
  }

  /**
   * 阴蒂经验（exp:cid:34 ↔ EXP:34）
   * 源: yml/Exp.yml id 34
   * @returns {number}
   */
  get 阴蒂经验() {
    return era.get(`exp:${this.cid}:34`) || 0;
  }
  /**
   * @param {number} v
   */
  set 阴蒂经验(v) {
    era.set(`exp:${this.cid}:34`, v);
  }

  /**
   * 异种奸经验（exp:cid:58 ↔ EXP:58）
   * 源: yml/Exp.yml id 58
   * @returns {number}
   */
  get 异种奸经验() {
    return era.get(`exp:${this.cid}:58`) || 0;
  }
  /**
   * @param {number} v
   */
  set 异种奸经验(v) {
    era.set(`exp:${this.cid}:58`, v);
  }

  /**
   * 料理经验（exp:cid:61 ↔ EXP:61）
   * 源: yml/Exp.yml id 61
   * @returns {number}
   */
  get 料理经验() {
    return era.get(`exp:${this.cid}:61`) || 0;
  }
  /**
   * @param {number} v
   */
  set 料理经验(v) {
    era.set(`exp:${this.cid}:61`, v);
  }

  /**
   * 从属快乐经验（exp:cid:63 ↔ EXP:63）
   * 源: yml/Exp.yml id 63
   * @returns {number}
   */
  get 从属快乐经验() {
    return era.get(`exp:${this.cid}:63`) || 0;
  }
  /**
   * @param {number} v
   */
  set 从属快乐经验(v) {
    era.set(`exp:${this.cid}:63`, v);
  }

  /**
   * 主从爱情经验（exp:cid:64 ↔ EXP:64）
   * 源: yml/Exp.yml id 64
   * @returns {number}
   */
  get 主从爱情经验() {
    return era.get(`exp:${this.cid}:64`) || 0;
  }
  /**
   * @param {number} v
   */
  set 主从爱情经验(v) {
    era.set(`exp:${this.cid}:64`, v);
  }

  /**
   * 狂王调教经验（exp:cid:66 ↔ EXP:66）
   * 源: yml/Exp.yml id 66
   * @returns {number}
   */
  get 狂王调教经验() {
    return era.get(`exp:${this.cid}:66`) || 0;
  }
  /**
   * @param {number} v
   */
  set 狂王调教经验(v) {
    era.set(`exp:${this.cid}:66`, v);
  }

  /**
   * 营业爱情经验（exp:cid:75 ↔ EXP:75）
   * 源: yml/Exp.yml id 75
   * @returns {number}
   */
  get 营业爱情经验() {
    return era.get(`exp:${this.cid}:75`) || 0;
  }
  /**
   * @param {number} v
   */
  set 营业爱情经验(v) {
    era.set(`exp:${this.cid}:75`, v);
  }
}
// GENERATED END

// —— 手写区（重新生成不会触碰）——
module.exports = StrongholdFacade;
