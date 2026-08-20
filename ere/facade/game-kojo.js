/**
 * @file 一维变量的kojo域门面（tools/gen-facade.js）。
 *
 * 形状：game.kojo.<字段>。与 era_flag / era_global 并存。一维重切不强制迁移；口上域样本本票已迁。
 */

const era = require('#/era-electron');

// GENERATED START —— tools/gen-facade.js 自 ownership + yml 列名 + tools/facade-names.js 生成，勿手改
class KojoGame {
  // —— flag ——
  /**
   * 口上开关（flag:7 ↔ FLAG:7）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:7 口上显示/频率
   * @returns {number}
   */
  get 口上开关() {
    return era.get('flag:7') || 0;
  }
  /**
   * @param {number} v
   */
  set 口上开关(v) {
    era.set('flag:7', v);
  }

  /**
   * 口上存在_0（flag:100 ↔ FLAG:100）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:1xx 口上文件存在判定
   * @returns {number}
   */
  get 口上存在_0() {
    return era.get('flag:100') || 0;
  }
  /**
   * @param {number} v
   */
  set 口上存在_0(v) {
    era.set('flag:100', v);
  }

  /**
   * 口上存在_1（flag:101 ↔ FLAG:101）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:1xx 口上文件存在判定
   * @returns {number}
   */
  get 口上存在_1() {
    return era.get('flag:101') || 0;
  }
  /**
   * @param {number} v
   */
  set 口上存在_1(v) {
    era.set('flag:101', v);
  }

  /**
   * 口上存在_2（flag:102 ↔ FLAG:102）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:1xx 口上文件存在判定
   * @returns {number}
   */
  get 口上存在_2() {
    return era.get('flag:102') || 0;
  }
  /**
   * @param {number} v
   */
  set 口上存在_2(v) {
    era.set('flag:102', v);
  }

  /**
   * 口上存在_3（flag:103 ↔ FLAG:103）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:1xx 口上文件存在判定
   * @returns {number}
   */
  get 口上存在_3() {
    return era.get('flag:103') || 0;
  }
  /**
   * @param {number} v
   */
  set 口上存在_3(v) {
    era.set('flag:103', v);
  }

  /**
   * 口上存在_4（flag:104 ↔ FLAG:104）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:1xx 口上文件存在判定
   * @returns {number}
   */
  get 口上存在_4() {
    return era.get('flag:104') || 0;
  }
  /**
   * @param {number} v
   */
  set 口上存在_4(v) {
    era.set('flag:104', v);
  }

  /**
   * 口上存在_5（flag:105 ↔ FLAG:105）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:1xx 口上文件存在判定
   * @returns {number}
   */
  get 口上存在_5() {
    return era.get('flag:105') || 0;
  }
  /**
   * @param {number} v
   */
  set 口上存在_5(v) {
    era.set('flag:105', v);
  }

  /**
   * 口上存在_6（flag:106 ↔ FLAG:106）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:1xx 口上文件存在判定
   * @returns {number}
   */
  get 口上存在_6() {
    return era.get('flag:106') || 0;
  }
  /**
   * @param {number} v
   */
  set 口上存在_6(v) {
    era.set('flag:106', v);
  }

  /**
   * 口上存在_7（flag:107 ↔ FLAG:107）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:1xx 口上文件存在判定
   * @returns {number}
   */
  get 口上存在_7() {
    return era.get('flag:107') || 0;
  }
  /**
   * @param {number} v
   */
  set 口上存在_7(v) {
    era.set('flag:107', v);
  }

  /**
   * 口上存在_8（flag:108 ↔ FLAG:108）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:1xx 口上文件存在判定
   * @returns {number}
   */
  get 口上存在_8() {
    return era.get('flag:108') || 0;
  }
  /**
   * @param {number} v
   */
  set 口上存在_8(v) {
    era.set('flag:108', v);
  }

  /**
   * 口上存在_9（flag:109 ↔ FLAG:109）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:1xx 口上文件存在判定
   * @returns {number}
   */
  get 口上存在_9() {
    return era.get('flag:109') || 0;
  }
  /**
   * @param {number} v
   */
  set 口上存在_9(v) {
    era.set('flag:109', v);
  }

  /**
   * 口上存在_10（flag:110 ↔ FLAG:110）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:1xx 口上文件存在判定
   * @returns {number}
   */
  get 口上存在_10() {
    return era.get('flag:110') || 0;
  }
  /**
   * @param {number} v
   */
  set 口上存在_10(v) {
    era.set('flag:110', v);
  }

  /**
   * 口上存在_11（flag:111 ↔ FLAG:111）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:1xx 口上文件存在判定
   * @returns {number}
   */
  get 口上存在_11() {
    return era.get('flag:111') || 0;
  }
  /**
   * @param {number} v
   */
  set 口上存在_11(v) {
    era.set('flag:111', v);
  }

  /**
   * 口上存在_12（flag:112 ↔ FLAG:112）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:1xx 口上文件存在判定
   * @returns {number}
   */
  get 口上存在_12() {
    return era.get('flag:112') || 0;
  }
  /**
   * @param {number} v
   */
  set 口上存在_12(v) {
    era.set('flag:112', v);
  }

  /**
   * 口上存在_13（flag:113 ↔ FLAG:113）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:1xx 口上文件存在判定
   * @returns {number}
   */
  get 口上存在_13() {
    return era.get('flag:113') || 0;
  }
  /**
   * @param {number} v
   */
  set 口上存在_13(v) {
    era.set('flag:113', v);
  }

  /**
   * 口上存在_14（flag:114 ↔ FLAG:114）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:1xx 口上文件存在判定
   * @returns {number}
   */
  get 口上存在_14() {
    return era.get('flag:114') || 0;
  }
  /**
   * @param {number} v
   */
  set 口上存在_14(v) {
    era.set('flag:114', v);
  }

  /**
   * 口上存在_15（flag:115 ↔ FLAG:115）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:1xx 口上文件存在判定
   * @returns {number}
   */
  get 口上存在_15() {
    return era.get('flag:115') || 0;
  }
  /**
   * @param {number} v
   */
  set 口上存在_15(v) {
    era.set('flag:115', v);
  }

  /**
   * 口上存在_19（flag:119 ↔ FLAG:119）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:1xx
   * @returns {number}
   */
  get 口上存在_19() {
    return era.get('flag:119') || 0;
  }
  /**
   * @param {number} v
   */
  set 口上存在_19(v) {
    era.set('flag:119', v);
  }

  // —— tflag ——
  /**
   * 录像内容（tflag:32 ↔ TFLAG:32）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:32 亦为自我口上旗标
   * @returns {number}
   */
  get 录像内容() {
    return era.get('tflag:32') || 0;
  }
  /**
   * @param {number} v
   */
  set 录像内容(v) {
    era.set('tflag:32', v);
  }
}
const facade = new KojoGame();
// GENERATED END

// —— 手写区（重新生成不会触碰）——
module.exports = facade;
