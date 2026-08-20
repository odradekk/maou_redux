/**
 * @file 一维变量的stronghold域门面（tools/gen-facade.js）。
 *
 * 形状：game.stronghold.<字段>。与 era_flag / era_global 并存。一维重切不强制迁移；口上域样本本票已迁。
 */

const era = require('#/era-electron');

// GENERATED START —— tools/gen-facade.js 自 ownership + tools/facade-names.js 生成，勿手改
class StrongholdGame {
  // —— flag ——
  /**
   * 税金修正（flag:9 ↔ FLAG:9）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:9
   * @returns {number}
   */
  get 税金修正() {
    return era.get('flag:9') || 0;
  }
  /**
   * @param {number} v
   */
  set 税金修正(v) {
    era.set('flag:9', v);
  }

  /**
   * 技巧素质道具数（flag:33 ↔ FLAG:33）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:33
   * @returns {number}
   */
  get 技巧素质道具数() {
    return era.get('flag:33') || 0;
  }
  /**
   * @param {number} v
   */
  set 技巧素质道具数(v) {
    era.set('flag:33', v);
  }

  /**
   * 显示模式（flag:36 ↔ FLAG:36）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:36
   * @returns {number}
   */
  get 显示模式() {
    return era.get('flag:36') || 0;
  }
  /**
   * @param {number} v
   */
  set 显示模式(v) {
    era.set('flag:36', v);
  }

  /**
   * 每日香料购买数（flag:61 ↔ FLAG:61）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:61
   * @returns {number}
   */
  get 每日香料购买数() {
    return era.get('flag:61') || 0;
  }
  /**
   * @param {number} v
   */
  set 每日香料购买数(v) {
    era.set('flag:61', v);
  }

  /**
   * 陷阱等级（flag:85 ↔ FLAG:85）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:85
   * @returns {number}
   */
  get 陷阱等级() {
    return era.get('flag:85') || 0;
  }
  /**
   * @param {number} v
   */
  set 陷阱等级(v) {
    era.set('flag:85', v);
  }

  // —— tflag ——
  /**
   * 召唤暂存_1（tflag:101 ↔ TFLAG:101）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:100～103 召唤暂存
   * @returns {number}
   */
  get 召唤暂存_1() {
    return era.get('tflag:101') || 0;
  }
  /**
   * @param {number} v
   */
  set 召唤暂存_1(v) {
    era.set('tflag:101', v);
  }

  /**
   * 召唤暂存_2（tflag:102 ↔ TFLAG:102）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:100～103
   * @returns {number}
   */
  get 召唤暂存_2() {
    return era.get('tflag:102') || 0;
  }
  /**
   * @param {number} v
   */
  set 召唤暂存_2(v) {
    era.set('tflag:102', v);
  }

  // —— item ——
  /**
   * 触手生物（item:90 ↔ ITEM:90）
   * 源: yml/Item.yml id 90
   * @returns {number}
   */
  get 触手生物() {
    return era.get('item:90') || 0;
  }
  /**
   * @param {number} v
   */
  set 触手生物(v) {
    era.set('item:90', v);
  }

  /**
   * 装饰戒指（item:300 ↔ ITEM:300）
   * 源: yml/Item.yml id 300
   * @returns {number}
   */
  get 装饰戒指() {
    return era.get('item:300') || 0;
  }
  /**
   * @param {number} v
   */
  set 装饰戒指(v) {
    era.set('item:300', v);
  }
}
const facade = new StrongholdGame();
// GENERATED END

// —— 手写区（重新生成不会触碰）——
module.exports = facade;
