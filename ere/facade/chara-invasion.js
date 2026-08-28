/**
 * @file 角色变量的invasion域门面（tools/gen-facade.js）。
 *
 * 形状：chara(cid).invasion.<字段>。生成区勿手改；手写区重生成不碰。
 */

const era = require('#/era-electron');

// GENERATED START —— tools/gen-facade.js 自 ownership + yml 列名 + tools/facade-names.js 生成，勿手改
class InvasionFacade {
  constructor(cid) {
    this.cid = cid;
  }

  /**
   * 状态（cflag:cid:1 ↔ CFLAG:1）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt CFLAG:1 キャラの状態 0=調教中 1=待機 2=侵攻中 3=迎撃中 4=死亡 12=戦役（SYSTEM ver1.0.3.ERB の CFLAG:A:1 == 12）
   * @returns {number}
   */
  get 状态() {
    return era.get(`cflag:${this.cid}:1`) || 0;
  }
  /**
   * @param {number} v
   */
  set 状态(v) {
    era.set(`cflag:${this.cid}:1`, v);
  }

  /**
   * 新人（cflag:cid:506 ↔ CFLAG:506）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt CFLAG:506 新人フラグ
   * @returns {number}
   */
  get 新人() {
    return era.get(`cflag:${this.cid}:506`) || 0;
  }
  /**
   * @param {number} v
   */
  set 新人(v) {
    era.set(`cflag:${this.cid}:506`, v);
  }

  /**
   * 回城标志（cflag:cid:507 ↔ CFLAG:507）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt CFLAG:507 街まで帰還フラグ
   * @returns {number}
   */
  get 回城标志() {
    return era.get(`cflag:${this.cid}:507`) || 0;
  }
  /**
   * @param {number} v
   */
  set 回城标志(v) {
    era.set(`cflag:${this.cid}:507`, v);
  }

  /**
   * 存档点（cflag:cid:521 ↔ CFLAG:521）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt 行419 CFLAG:521 = セーブポイント（2015 补丁起兼作挫折阶层记忆，#103）
   * @returns {number}
   */
  get 存档点() {
    return era.get(`cflag:${this.cid}:521`) || 0;
  }
  /**
   * @param {number} v
   */
  set 存档点(v) {
    era.set(`cflag:${this.cid}:521`, v);
  }
}
// GENERATED END

// —— 手写区（重新生成不会触碰）——
module.exports = InvasionFacade;
