/**
 * @file 一维变量的invasion域门面（tools/gen-facade.js）。
 *
 * 形状：game.invasion.<字段>。与 era_flag / era_global 并存。一维重切不强制迁移；口上域样本这张票已迁。
 */

const era = require('#/era-electron');

// GENERATED START —— tools/gen-facade.js 自 ownership + yml 列名 + tools/facade-names.js 生成，勿手改
class InvasionGame {
  /**
   * 肉便器数（flag:83 ↔ FLAG:83）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:83
   * @returns {number}
   */
  get 肉便器数() {
    return era.get('flag:83') || 0;
  }
  /**
   * @param {number} v
   */
  set 肉便器数(v) {
    era.set('flag:83', v);
  }

  /**
   * 亲卫队砦侵攻度（flag:92 ↔ FLAG:92）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:92
   * @returns {number}
   */
  get 亲卫队砦侵攻度() {
    return era.get('flag:92') || 0;
  }
  /**
   * @param {number} v
   */
  set 亲卫队砦侵攻度(v) {
    era.set('flag:92', v);
  }

  /**
   * 人间界侵攻事件（flag:93 ↔ FLAG:93）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:93
   * @returns {number}
   */
  get 人间界侵攻事件() {
    return era.get('flag:93') || 0;
  }
  /**
   * @param {number} v
   */
  set 人间界侵攻事件(v) {
    era.set('flag:93', v);
  }

  /**
   * 活动迷宫（flag:400 ↔ FLAG:400）
   * 源: target/ERB/迷宮/DUNGEON.ERB 行125 FLAG:400 イベントダンジョン
   * @returns {number}
   */
  get 活动迷宫() {
    return era.get('flag:400') || 0;
  }
  /**
   * @param {number} v
   */
  set 活动迷宫(v) {
    era.set('flag:400', v);
  }
}
const facade = new InvasionGame();
// GENERATED END

// —— 手写区（重新生成不会触碰）——
module.exports = facade;
