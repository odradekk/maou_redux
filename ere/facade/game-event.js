/**
 * @file 一维变量的event域门面（tools/gen-facade.js）。
 *
 * 形状：game.event.<字段>。与 era_flag / era_global 并存。一维重切不强制迁移；口上域样本本票已迁。
 */

const era = require('#/era-electron');

// GENERATED START —— tools/gen-facade.js 自 ownership + yml 列名 + tools/facade-names.js 生成，勿手改
class EventGame {
  // —— flag ——
  /**
   * 休息（flag:0 ↔ FLAG:0）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:0 休憩
   * @returns {number}
   */
  get 休息() {
    return era.get('flag:0') || 0;
  }
  /**
   * @param {number} v
   */
  set 休息(v) {
    era.set('flag:0', v);
  }

  /**
   * 上次调教对象（flag:1 ↔ FLAG:1）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:1
   * @returns {number}
   */
  get 上次调教对象() {
    return era.get('flag:1') || 0;
  }
  /**
   * @param {number} v
   */
  set 上次调教对象(v) {
    era.set('flag:1', v);
  }

  /**
   * 上次助手（flag:2 ↔ FLAG:2）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:2
   * @returns {number}
   */
  get 上次助手() {
    return era.get('flag:2') || 0;
  }
  /**
   * @param {number} v
   */
  set 上次助手(v) {
    era.set('flag:2', v);
  }

  /**
   * 爱或淫乱人数（flag:30 ↔ FLAG:30）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:30
   * @returns {number}
   */
  get 爱或淫乱人数() {
    return era.get('flag:30') || 0;
  }
  /**
   * @param {number} v
   */
  set 爱或淫乱人数(v) {
    era.set('flag:30', v);
  }

  /**
   * 杀死人数（flag:31 ↔ FLAG:31）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:31
   * @returns {number}
   */
  get 杀死人数() {
    return era.get('flag:31') || 0;
  }
  /**
   * @param {number} v
   */
  set 杀死人数(v) {
    era.set('flag:31', v);
  }

  /**
   * 勇者基础等级修正（flag:60 ↔ FLAG:60）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:60
   * @returns {number}
   */
  get 勇者基础等级修正() {
    return era.get('flag:60') || 0;
  }
  /**
   * @param {number} v
   */
  set 勇者基础等级修正(v) {
    era.set('flag:60', v);
  }

  /**
   * 处刑勇者数（flag:80 ↔ FLAG:80）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:80
   * @returns {number}
   */
  get 处刑勇者数() {
    return era.get('flag:80') || 0;
  }
  /**
   * @param {number} v
   */
  set 处刑勇者数(v) {
    era.set('flag:80', v);
  }

  /**
   * 人间界征服完了（flag:82 ↔ FLAG:82）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:82
   * @returns {number}
   */
  get 人间界征服完了() {
    return era.get('flag:82') || 0;
  }
  /**
   * @param {number} v
   */
  set 人间界征服完了(v) {
    era.set('flag:82', v);
  }

  /**
   * 装饰品数（flag:84 ↔ FLAG:84）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:84
   * @returns {number}
   */
  get 装饰品数() {
    return era.get('flag:84') || 0;
  }
  /**
   * @param {number} v
   */
  set 装饰品数(v) {
    era.set('flag:84', v);
  }

  /**
   * 精灵领域征服完了（flag:87 ↔ FLAG:87）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:87
   * @returns {number}
   */
  get 精灵领域征服完了() {
    return era.get('flag:87') || 0;
  }
  /**
   * @param {number} v
   */
  set 精灵领域征服完了(v) {
    era.set('flag:87', v);
  }

  /**
   * 龙山征服完了（flag:89 ↔ FLAG:89）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:89
   * @returns {number}
   */
  get 龙山征服完了() {
    return era.get('flag:89') || 0;
  }
  /**
   * @param {number} v
   */
  set 龙山征服完了(v) {
    era.set('flag:89', v);
  }

  /**
   * 天界征服完了（flag:91 ↔ FLAG:91）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:91
   * @returns {number}
   */
  get 天界征服完了() {
    return era.get('flag:91') || 0;
  }
  /**
   * @param {number} v
   */
  set 天界征服完了(v) {
    era.set('flag:91', v);
  }

  /**
   * 勇者入场_23（flag:223 ↔ FLAG:223）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:200～ 勇者入场旗标
   * @returns {number}
   */
  get 勇者入场_23() {
    return era.get('flag:223') || 0;
  }
  /**
   * @param {number} v
   */
  set 勇者入场_23(v) {
    era.set('flag:223', v);
  }

  /**
   * 石像数（flag:600 ↔ FLAG:600）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:600
   * @returns {number}
   */
  get 石像数() {
    return era.get('flag:600') || 0;
  }
  /**
   * @param {number} v
   */
  set 石像数(v) {
    era.set('flag:600', v);
  }

  /**
   * 剥制数（flag:601 ↔ FLAG:601）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:601
   * @returns {number}
   */
  get 剥制数() {
    return era.get('flag:601') || 0;
  }
  /**
   * @param {number} v
   */
  set 剥制数(v) {
    era.set('flag:601', v);
  }

  /**
   * 蜡像数（flag:602 ↔ FLAG:602）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:602
   * @returns {number}
   */
  get 蜡像数() {
    return era.get('flag:602') || 0;
  }
  /**
   * @param {number} v
   */
  set 蜡像数(v) {
    era.set('flag:602', v);
  }

  /**
   * 人偶数_服装（flag:603 ↔ FLAG:603）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:603
   * @returns {number}
   */
  get 人偶数_服装() {
    return era.get('flag:603') || 0;
  }
  /**
   * @param {number} v
   */
  set 人偶数_服装(v) {
    era.set('flag:603', v);
  }

  /**
   * 人偶数_球形关节（flag:604 ↔ FLAG:604）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:604
   * @returns {number}
   */
  get 人偶数_球形关节() {
    return era.get('flag:604') || 0;
  }
  /**
   * @param {number} v
   */
  set 人偶数_球形关节(v) {
    era.set('flag:604', v);
  }

  /**
   * 金属像数（flag:605 ↔ FLAG:605）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:605
   * @returns {number}
   */
  get 金属像数() {
    return era.get('flag:605') || 0;
  }
  /**
   * @param {number} v
   */
  set 金属像数(v) {
    era.set('flag:605', v);
  }

  /**
   * 冰像数（flag:606 ↔ FLAG:606）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:606
   * @returns {number}
   */
  get 冰像数() {
    return era.get('flag:606') || 0;
  }
  /**
   * @param {number} v
   */
  set 冰像数(v) {
    era.set('flag:606', v);
  }

  /**
   * 金属像数_2（flag:607 ↔ FLAG:607）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:607 文档重名
   * @returns {number}
   */
  get 金属像数_2() {
    return era.get('flag:607') || 0;
  }
  /**
   * @param {number} v
   */
  set 金属像数_2(v) {
    era.set('flag:607', v);
  }

  /**
   * 家具数（flag:608 ↔ FLAG:608）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:608
   * @returns {number}
   */
  get 家具数() {
    return era.get('flag:608') || 0;
  }
  /**
   * @param {number} v
   */
  set 家具数(v) {
    era.set('flag:608', v);
  }

  /**
   * 绘画数（flag:609 ↔ FLAG:609）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:609
   * @returns {number}
   */
  get 绘画数() {
    return era.get('flag:609') || 0;
  }
  /**
   * @param {number} v
   */
  set 绘画数(v) {
    era.set('flag:609', v);
  }

  /**
   * 喷水像_石（flag:611 ↔ FLAG:611）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:611
   * @returns {number}
   */
  get 喷水像_石() {
    return era.get('flag:611') || 0;
  }
  /**
   * @param {number} v
   */
  set 喷水像_石(v) {
    era.set('flag:611', v);
  }

  /**
   * 喷水像_金属（flag:612 ↔ FLAG:612）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:612
   * @returns {number}
   */
  get 喷水像_金属() {
    return era.get('flag:612') || 0;
  }
  /**
   * @param {number} v
   */
  set 喷水像_金属(v) {
    era.set('flag:612', v);
  }

  /**
   * 人间牧场竿役（flag:613 ↔ FLAG:613）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:613
   * @returns {number}
   */
  get 人间牧场竿役() {
    return era.get('flag:613') || 0;
  }
  /**
   * @param {number} v
   */
  set 人间牧场竿役(v) {
    era.set('flag:613', v);
  }

  // —— tflag ——
  /**
   * 犬射精或处刑口上（tflag:16 ↔ TFLAG:16）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:16
   * @returns {number}
   */
  get 犬射精或处刑口上() {
    return era.get('tflag:16') || 0;
  }
  /**
   * @param {number} v
   */
  set 犬射精或处刑口上(v) {
    era.set('tflag:16', v);
  }

  /**
   * 本次调教处女丧失（tflag:31 ↔ TFLAG:31）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:31
   * @returns {number}
   */
  get 本次调教处女丧失() {
    return era.get('tflag:31') || 0;
  }
  /**
   * @param {number} v
   */
  set 本次调教处女丧失(v) {
    era.set('tflag:31', v);
  }

  /**
   * 珠结算_0（tflag:51 ↔ TFLAG:51）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:51～58 @JUEL_CHECK
   * @returns {number}
   */
  get 珠结算_0() {
    return era.get('tflag:51') || 0;
  }
  /**
   * @param {number} v
   */
  set 珠结算_0(v) {
    era.set('tflag:51', v);
  }

  /**
   * 珠结算_1（tflag:52 ↔ TFLAG:52）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:51～58 @JUEL_CHECK
   * @returns {number}
   */
  get 珠结算_1() {
    return era.get('tflag:52') || 0;
  }
  /**
   * @param {number} v
   */
  set 珠结算_1(v) {
    era.set('tflag:52', v);
  }

  /**
   * 珠结算_2（tflag:53 ↔ TFLAG:53）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:51～58 @JUEL_CHECK
   * @returns {number}
   */
  get 珠结算_2() {
    return era.get('tflag:53') || 0;
  }
  /**
   * @param {number} v
   */
  set 珠结算_2(v) {
    era.set('tflag:53', v);
  }

  /**
   * 珠结算_3（tflag:54 ↔ TFLAG:54）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:51～58 @JUEL_CHECK
   * @returns {number}
   */
  get 珠结算_3() {
    return era.get('tflag:54') || 0;
  }
  /**
   * @param {number} v
   */
  set 珠结算_3(v) {
    era.set('tflag:54', v);
  }

  /**
   * 珠结算_4（tflag:55 ↔ TFLAG:55）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:51～58 @JUEL_CHECK
   * @returns {number}
   */
  get 珠结算_4() {
    return era.get('tflag:55') || 0;
  }
  /**
   * @param {number} v
   */
  set 珠结算_4(v) {
    era.set('tflag:55', v);
  }

  /**
   * 珠结算_5（tflag:56 ↔ TFLAG:56）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:51～58 @JUEL_CHECK
   * @returns {number}
   */
  get 珠结算_5() {
    return era.get('tflag:56') || 0;
  }
  /**
   * @param {number} v
   */
  set 珠结算_5(v) {
    era.set('tflag:56', v);
  }

  /**
   * 珠结算_6（tflag:57 ↔ TFLAG:57）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:51～58 @JUEL_CHECK
   * @returns {number}
   */
  get 珠结算_6() {
    return era.get('tflag:57') || 0;
  }
  /**
   * @param {number} v
   */
  set 珠结算_6(v) {
    era.set('tflag:57', v);
  }

  /**
   * 前前回指令（tflag:59 ↔ TFLAG:59）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:59
   * @returns {number}
   */
  get 前前回指令() {
    return era.get('tflag:59') || 0;
  }
  /**
   * @param {number} v
   */
  set 前前回指令(v) {
    era.set('tflag:59', v);
  }

  /**
   * 插着不拔（tflag:60 ↔ TFLAG:60）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:60
   * @returns {number}
   */
  get 插着不拔() {
    return era.get('tflag:60') || 0;
  }
  /**
   * @param {number} v
   */
  set 插着不拔(v) {
    era.set('tflag:60', v);
  }

  /**
   * 录像次数（tflag:70 ↔ TFLAG:70）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:70
   * @returns {number}
   */
  get 录像次数() {
    return era.get('tflag:70') || 0;
  }
  /**
   * @param {number} v
   */
  set 录像次数(v) {
    era.set('tflag:70', v);
  }

  /**
   * 精爱味觉（tflag:110 ↔ TFLAG:110）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:110
   * @returns {number}
   */
  get 精爱味觉() {
    return era.get('tflag:110') || 0;
  }
  /**
   * @param {number} v
   */
  set 精爱味觉(v) {
    era.set('tflag:110', v);
  }

  /**
   * 博物馆口上（tflag:500 ↔ TFLAG:500）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:500
   * @returns {number}
   */
  get 博物馆口上() {
    return era.get('tflag:500') || 0;
  }
  /**
   * @param {number} v
   */
  set 博物馆口上(v) {
    era.set('tflag:500', v);
  }

  /**
   * 流放口上（tflag:510 ↔ TFLAG:510）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:510
   * @returns {number}
   */
  get 流放口上() {
    return era.get('tflag:510') || 0;
  }
  /**
   * @param {number} v
   */
  set 流放口上(v) {
    era.set('tflag:510', v);
  }

  /**
   * 公开处刑口上（tflag:520 ↔ TFLAG:520）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:520
   * @returns {number}
   */
  get 公开处刑口上() {
    return era.get('tflag:520') || 0;
  }
  /**
   * @param {number} v
   */
  set 公开处刑口上(v) {
    era.set('tflag:520', v);
  }

  /**
   * 猎奇处刑口上（tflag:530 ↔ TFLAG:530）
   * 源: target/資料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:530
   * @returns {number}
   */
  get 猎奇处刑口上() {
    return era.get('tflag:530') || 0;
  }
  /**
   * @param {number} v
   */
  set 猎奇处刑口上(v) {
    era.set('tflag:530', v);
  }
}
const facade = new EventGame();
// GENERATED END

// —— 手写区（重新生成不会触碰）——
module.exports = facade;
