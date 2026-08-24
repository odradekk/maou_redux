/**
 * @file 一维变量的chara域门面（tools/gen-facade.js）。
 *
 * 形状：game.chara.<字段>。与 era_flag / era_global 并存。一维重切不强制迁移；口上域样本这张票已迁。
 */

const era = require('#/era-electron');

// GENERATED START —— tools/gen-facade.js 自 ownership + yml 列名 + tools/facade-names.js 生成，勿手改
class CharaGame {
  /**
   * 种族年龄设定_0（flag:26 ↔ FLAG:26）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:26～27
   * @returns {number}
   */
  get 种族年龄设定_0() {
    return era.get('flag:26') || 0;
  }
  /**
   * @param {number} v
   */
  set 种族年龄设定_0(v) {
    era.set('flag:26', v);
  }

  /**
   * 种族年龄设定_1（flag:27 ↔ FLAG:27）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:26～27
   * @returns {number}
   */
  get 种族年龄设定_1() {
    return era.get('flag:27') || 0;
  }
  /**
   * @param {number} v
   */
  set 种族年龄设定_1(v) {
    era.set('flag:27', v);
  }

  /**
   * 爱之奴隶所生（flag:32 ↔ FLAG:32）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:32
   * @returns {number}
   */
  get 爱之奴隶所生() {
    return era.get('flag:32') || 0;
  }
  /**
   * @param {number} v
   */
  set 爱之奴隶所生(v) {
    era.set('flag:32', v);
  }

  /**
   * 勇者入场_24（flag:224 ↔ FLAG:224）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:200～
   * @returns {number}
   */
  get 勇者入场_24() {
    return era.get('flag:224') || 0;
  }
  /**
   * @param {number} v
   */
  set 勇者入场_24(v) {
    era.set('flag:224', v);
  }
}
const facade = new CharaGame();
// GENERATED END

// —— 手写区（重新生成不会触碰）——
module.exports = facade;
