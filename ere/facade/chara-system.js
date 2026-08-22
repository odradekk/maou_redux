/**
 * @file 角色变量的system域门面（tools/gen-facade.js）。
 *
 * 形状：chara(cid).system.<字段>。生成区勿手改；手写区重生成不碰。
 */

const era = require('#/era-electron');

// GENERATED START —— tools/gen-facade.js 自 ownership + yml 列名 + tools/facade-names.js 生成，勿手改
class SystemFacade {
  constructor(cid) {
    this.cid = cid;
  }

  // —— cflag ——
  /**
   * 从属怪物（cflag:cid:570 ↔ CFLAG:570）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt CFLAG:570 従属モンスター（使役パートナーの NO）
   * @returns {number}
   */
  get 从属怪物() {
    return era.get(`cflag:${this.cid}:570`) || 0;
  }
  /**
   * @param {number} v
   */
  set 从属怪物(v) {
    era.set(`cflag:${this.cid}:570`, v);
  }

  // —— talent ——
  /**
   * 母乳体质（talent:cid:130 ↔ TALENT:130）
   * 源: yml/Talent.yml id 130
   * @returns {number}
   */
  get 母乳体质() {
    return era.get(`talent:${this.cid}:130`) || 0;
  }
  /**
   * @param {number} v
   */
  set 母乳体质(v) {
    era.set(`talent:${this.cid}:130`, v);
  }

  /**
   * 妊娠（talent:cid:153 ↔ TALENT:153）
   * 源: yml/Talent.yml id 153
   * @returns {number}
   */
  get 妊娠() {
    return era.get(`talent:${this.cid}:153`) || 0;
  }
  /**
   * @param {number} v
   */
  set 妊娠(v) {
    era.set(`talent:${this.cid}:153`, v);
  }

  /**
   * 育儿中（talent:cid:154 ↔ TALENT:154）
   * 源: yml/Talent.yml id 154
   * @returns {number}
   */
  get 育儿中() {
    return era.get(`talent:${this.cid}:154`) || 0;
  }
  /**
   * @param {number} v
   */
  set 育儿中(v) {
    era.set(`talent:${this.cid}:154`, v);
  }

  /**
   * 父性（talent:cid:156 ↔ TALENT:156）
   * 源: yml/Talent.yml id 156
   * @returns {number}
   */
  get 父性() {
    return era.get(`talent:${this.cid}:156`) || 0;
  }
  /**
   * @param {number} v
   */
  set 父性(v) {
    era.set(`talent:${this.cid}:156`, v);
  }

  /**
   * 金红桃（talent:cid:167 ↔ TALENT:167）
   * 源: yml/Talent.yml id 167
   * @returns {number}
   */
  get 金红桃() {
    return era.get(`talent:${this.cid}:167`) || 0;
  }
  /**
   * @param {number} v
   */
  set 金红桃(v) {
    era.set(`talent:${this.cid}:167`, v);
  }

  /**
   * 银黑桃（talent:cid:168 ↔ TALENT:168）
   * 源: yml/Talent.yml id 168
   * @returns {number}
   */
  get 银黑桃() {
    return era.get(`talent:${this.cid}:168`) || 0;
  }
  /**
   * @param {number} v
   */
  set 银黑桃(v) {
    era.set(`talent:${this.cid}:168`, v);
  }

  /**
   * 黑方片（talent:cid:169 ↔ TALENT:169）
   * 源: yml/Talent.yml id 169
   * @returns {number}
   */
  get 黑方片() {
    return era.get(`talent:${this.cid}:169`) || 0;
  }
  /**
   * @param {number} v
   */
  set 黑方片(v) {
    era.set(`talent:${this.cid}:169`, v);
  }

  /**
   * 白梅花（talent:cid:170 ↔ TALENT:170）
   * 源: yml/Talent.yml id 170
   * @returns {number}
   */
  get 白梅花() {
    return era.get(`talent:${this.cid}:170`) || 0;
  }
  /**
   * @param {number} v
   */
  set 白梅花(v) {
    era.set(`talent:${this.cid}:170`, v);
  }

  /**
   * 贵公子（talent:cid:174 ↔ TALENT:174）
   * 源: yml/Talent.yml id 174
   * @returns {number}
   */
  get 贵公子() {
    return era.get(`talent:${this.cid}:174`) || 0;
  }
  /**
   * @param {number} v
   */
  set 贵公子(v) {
    era.set(`talent:${this.cid}:174`, v);
  }

  /**
   * 伶俐（talent:cid:175 ↔ TALENT:175）
   * 源: yml/Talent.yml id 175
   * @returns {number}
   */
  get 伶俐() {
    return era.get(`talent:${this.cid}:175`) || 0;
  }
  /**
   * @param {number} v
   */
  set 伶俐(v) {
    era.set(`talent:${this.cid}:175`, v);
  }

  /**
   * 种族2（talent:cid:319 ↔ TALENT:319）
   * 源: yml/Talent.yml id 319
   * @returns {number}
   */
  get 种族2() {
    return era.get(`talent:${this.cid}:319`) || 0;
  }
  /**
   * @param {number} v
   */
  set 种族2(v) {
    era.set(`talent:${this.cid}:319`, v);
  }

  /**
   * 原种族（talent:cid:321 ↔ TALENT:321）
   * 源: yml/Talent.yml id 321
   * @returns {number}
   */
  get 原种族() {
    return era.get(`talent:${this.cid}:321`) || 0;
  }
  /**
   * @param {number} v
   */
  set 原种族(v) {
    era.set(`talent:${this.cid}:321`, v);
  }

  /**
   * 现种族（talent:cid:322 ↔ TALENT:322）
   * 源: yml/Talent.yml id 322
   * @returns {number}
   */
  get 现种族() {
    return era.get(`talent:${this.cid}:322`) || 0;
  }
  /**
   * @param {number} v
   */
  set 现种族(v) {
    era.set(`talent:${this.cid}:322`, v);
  }

  /**
   * 乳内妊娠（talent:cid:341 ↔ TALENT:341）
   * 源: yml/Talent.yml id 341
   * @returns {number}
   */
  get 乳内妊娠() {
    return era.get(`talent:${this.cid}:341`) || 0;
  }
  /**
   * @param {number} v
   */
  set 乳内妊娠(v) {
    era.set(`talent:${this.cid}:341`, v);
  }

  /**
   * 精巢妊娠（talent:cid:342 ↔ TALENT:342）
   * 源: yml/Talent.yml id 342
   * @returns {number}
   */
  get 精巢妊娠() {
    return era.get(`talent:${this.cid}:342`) || 0;
  }
  /**
   * @param {number} v
   */
  set 精巢妊娠(v) {
    era.set(`talent:${this.cid}:342`, v);
  }

  /**
   * 肛内妊娠（talent:cid:343 ↔ TALENT:343）
   * 源: yml/Talent.yml id 343
   * @returns {number}
   */
  get 肛内妊娠() {
    return era.get(`talent:${this.cid}:343`) || 0;
  }
  /**
   * @param {number} v
   */
  set 肛内妊娠(v) {
    era.set(`talent:${this.cid}:343`, v);
  }

  /**
   * 口内妊娠（talent:cid:344 ↔ TALENT:344）
   * 源: yml/Talent.yml id 344
   * @returns {number}
   */
  get 口内妊娠() {
    return era.get(`talent:${this.cid}:344`) || 0;
  }
  /**
   * @param {number} v
   */
  set 口内妊娠(v) {
    era.set(`talent:${this.cid}:344`, v);
  }

  // —— abl ——
  /**
   * 阴蒂感觉（abl:cid:0 ↔ ABL:0）
   * 源: yml/Abl.yml id 0
   * @returns {number}
   */
  get 阴蒂感觉() {
    return era.get(`abl:${this.cid}:0`) || 0;
  }
  /**
   * @param {number} v
   */
  set 阴蒂感觉(v) {
    era.set(`abl:${this.cid}:0`, v);
  }

  /**
   * 乳房感觉（abl:cid:1 ↔ ABL:1）
   * 源: yml/Abl.yml id 1
   * @returns {number}
   */
  get 乳房感觉() {
    return era.get(`abl:${this.cid}:1`) || 0;
  }
  /**
   * @param {number} v
   */
  set 乳房感觉(v) {
    era.set(`abl:${this.cid}:1`, v);
  }

  /**
   * 私处感觉（abl:cid:2 ↔ ABL:2）
   * 源: yml/Abl.yml id 2
   * @returns {number}
   */
  get 私处感觉() {
    return era.get(`abl:${this.cid}:2`) || 0;
  }
  /**
   * @param {number} v
   */
  set 私处感觉(v) {
    era.set(`abl:${this.cid}:2`, v);
  }

  /**
   * 肛门感觉（abl:cid:3 ↔ ABL:3）
   * 源: yml/Abl.yml id 3
   * @returns {number}
   */
  get 肛门感觉() {
    return era.get(`abl:${this.cid}:3`) || 0;
  }
  /**
   * @param {number} v
   */
  set 肛门感觉(v) {
    era.set(`abl:${this.cid}:3`, v);
  }

  /**
   * 顺从（abl:cid:10 ↔ ABL:10）
   * 源: yml/Abl.yml id 10
   * @returns {number}
   */
  get 顺从() {
    return era.get(`abl:${this.cid}:10`) || 0;
  }
  /**
   * @param {number} v
   */
  set 顺从(v) {
    era.set(`abl:${this.cid}:10`, v);
  }

  /**
   * 欲望（abl:cid:11 ↔ ABL:11）
   * 源: yml/Abl.yml id 11
   * @returns {number}
   */
  get 欲望() {
    return era.get(`abl:${this.cid}:11`) || 0;
  }
  /**
   * @param {number} v
   */
  set 欲望(v) {
    era.set(`abl:${this.cid}:11`, v);
  }

  /**
   * 技巧（abl:cid:12 ↔ ABL:12）
   * 源: yml/Abl.yml id 12
   * @returns {number}
   */
  get 技巧() {
    return era.get(`abl:${this.cid}:12`) || 0;
  }
  /**
   * @param {number} v
   */
  set 技巧(v) {
    era.set(`abl:${this.cid}:12`, v);
  }

  /**
   * 侍奉精神（abl:cid:16 ↔ ABL:16）
   * 源: yml/Abl.yml id 16
   * @returns {number}
   */
  get 侍奉精神() {
    return era.get(`abl:${this.cid}:16`) || 0;
  }
  /**
   * @param {number} v
   */
  set 侍奉精神(v) {
    era.set(`abl:${this.cid}:16`, v);
  }

  /**
   * 露出癖（abl:cid:17 ↔ ABL:17）
   * 源: yml/Abl.yml id 17
   * @returns {number}
   */
  get 露出癖() {
    return era.get(`abl:${this.cid}:17`) || 0;
  }
  /**
   * @param {number} v
   */
  set 露出癖(v) {
    era.set(`abl:${this.cid}:17`, v);
  }

  /**
   * 抖M气质（abl:cid:21 ↔ ABL:21）
   * 源: yml/Abl.yml id 21
   * @returns {number}
   */
  get 抖M气质() {
    return era.get(`abl:${this.cid}:21`) || 0;
  }
  /**
   * @param {number} v
   */
  set 抖M气质(v) {
    era.set(`abl:${this.cid}:21`, v);
  }

  /**
   * 断背气质（abl:cid:23 ↔ ABL:23）
   * 源: yml/Abl.yml id 23
   * @returns {number}
   */
  get 断背气质() {
    return era.get(`abl:${this.cid}:23`) || 0;
  }
  /**
   * @param {number} v
   */
  set 断背气质(v) {
    era.set(`abl:${this.cid}:23`, v);
  }

  // —— mark ——
  /**
   * 苦痛刻印（mark:cid:0 ↔ MARK:0）
   * 源: yml/Mark.yml id 0
   * @returns {number}
   */
  get 苦痛刻印() {
    return era.get(`mark:${this.cid}:0`) || 0;
  }
  /**
   * @param {number} v
   */
  set 苦痛刻印(v) {
    era.set(`mark:${this.cid}:0`, v);
  }

  /**
   * 快乐刻印（mark:cid:1 ↔ MARK:1）
   * 源: yml/Mark.yml id 1
   * @returns {number}
   */
  get 快乐刻印() {
    return era.get(`mark:${this.cid}:1`) || 0;
  }
  /**
   * @param {number} v
   */
  set 快乐刻印(v) {
    era.set(`mark:${this.cid}:1`, v);
  }

  /**
   * 屈服刻印（mark:cid:2 ↔ MARK:2）
   * 源: yml/Mark.yml id 2
   * @returns {number}
   */
  get 屈服刻印() {
    return era.get(`mark:${this.cid}:2`) || 0;
  }
  /**
   * @param {number} v
   */
  set 屈服刻印(v) {
    era.set(`mark:${this.cid}:2`, v);
  }

  /**
   * 反抗刻印（mark:cid:3 ↔ MARK:3）
   * 源: yml/Mark.yml id 3
   * @returns {number}
   */
  get 反抗刻印() {
    return era.get(`mark:${this.cid}:3`) || 0;
  }
  /**
   * @param {number} v
   */
  set 反抗刻印(v) {
    era.set(`mark:${this.cid}:3`, v);
  }

  /**
   * 反抗刻印履历（mark:cid:4 ↔ MARK:4）
   * 源: target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB 行961-981 MARK:4 取得门限，与 MARK:3 同值连写（Mark.yml 无此列，人工命名）
   * @returns {number}
   */
  get 反抗刻印履历() {
    return era.get(`mark:${this.cid}:4`) || 0;
  }
  /**
   * @param {number} v
   */
  set 反抗刻印履历(v) {
    era.set(`mark:${this.cid}:4`, v);
  }

  // —— exp ——
  /**
   * 放尿经验（exp:cid:31 ↔ EXP:31）
   * 源: yml/Exp.yml id 31
   * @returns {number}
   */
  get 放尿经验() {
    return era.get(`exp:${this.cid}:31`) || 0;
  }
  /**
   * @param {number} v
   */
  set 放尿经验(v) {
    era.set(`exp:${this.cid}:31`, v);
  }

  /**
   * 生育经验（exp:cid:60 ↔ EXP:60）
   * 源: yml/Exp.yml id 60
   * @returns {number}
   */
  get 生育经验() {
    return era.get(`exp:${this.cid}:60`) || 0;
  }
  /**
   * @param {number} v
   */
  set 生育经验(v) {
    era.set(`exp:${this.cid}:60`, v);
  }

  /**
   * 异种妊娠经验（exp:cid:62 ↔ EXP:62）
   * 源: yml/Exp.yml id 62
   * @returns {number}
   */
  get 异种妊娠经验() {
    return era.get(`exp:${this.cid}:62`) || 0;
  }
  /**
   * @param {number} v
   */
  set 异种妊娠经验(v) {
    era.set(`exp:${this.cid}:62`, v);
  }
}
// GENERATED END

// —— 手写区（重新生成不会触碰）——
module.exports = SystemFacade;
