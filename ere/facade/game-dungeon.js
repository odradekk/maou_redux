/**
 * @file 一维变量的dungeon域门面（tools/gen-facade.js）。
 *
 * 形状：game.dungeon.<字段>。与 era_flag / era_global 并存。一维重切不强制迁移；口上域样本本票已迁。
 */

const era = require('#/era-electron');

// GENERATED START —— tools/gen-facade.js 自 ownership + tools/facade-names.js 生成，勿手改
class DungeonGame {
  // —— flag ——
  /**
   * 游戏设定（flag:5 ↔ FLAG:5）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:5 ビット演算
   * @returns {number}
   */
  get 游戏设定() {
    return era.get('flag:5') || 0;
  }
  /**
   * @param {number} v
   */
  set 游戏设定(v) {
    era.set('flag:5', v);
  }

  /**
   * 肉便器常识改写（flag:63 ↔ FLAG:63）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:63
   * @returns {number}
   */
  get 肉便器常识改写() {
    return era.get('flag:63') || 0;
  }
  /**
   * @param {number} v
   */
  set 肉便器常识改写(v) {
    era.set('flag:63', v);
  }

  /**
   * 迷宫模式（flag:502 ↔ FLAG:502）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:502
   * @returns {number}
   */
  get 迷宫模式() {
    return era.get('flag:502') || 0;
  }
  /**
   * @param {number} v
   */
  set 迷宫模式(v) {
    era.set('flag:502', v);
  }

  // —— tflag ——
  /**
   * 足交射精或处遇口上（tflag:18 ↔ TFLAG:18）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:18
   * @returns {number}
   */
  get 足交射精或处遇口上() {
    return era.get('tflag:18') || 0;
  }
  /**
   * @param {number} v
   */
  set 足交射精或处遇口上(v) {
    era.set('tflag:18', v);
  }

  // —— item ——
  /**
   * 无头骑士（item:171 ↔ ITEM:171）
   * 源: yml/Item.yml id 171
   * @returns {number}
   */
  get 无头骑士() {
    return era.get('item:171') || 0;
  }
  /**
   * @param {number} v
   */
  set 无头骑士(v) {
    era.set('item:171', v);
  }

  /**
   * 吸血鬼（item:172 ↔ ITEM:172）
   * 源: yml/Item.yml id 172
   * @returns {number}
   */
  get 吸血鬼() {
    return era.get('item:172') || 0;
  }
  /**
   * @param {number} v
   */
  set 吸血鬼(v) {
    era.set('item:172', v);
  }
}
const facade = new DungeonGame();
// GENERATED END

// —— 手写区（重新生成不会触碰）——
module.exports = facade;
