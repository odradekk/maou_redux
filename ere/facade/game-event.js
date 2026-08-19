/**
 * @file 一维变量的event域门面（tools/gen-facade.js）。
 *
 * 形状：game.event.<字段>。与 era_flag / era_global 并存。一维重切不强制迁移；口上域样本本票已迁。
 */

const era = require('#/era-electron');

// GENERATED START —— tools/gen-facade.js 自 ownership + tools/facade-names.js 生成，勿手改
class EventGame {
  // —— flag ——
  /**
   * 休息（flag:0 ↔ FLAG:0）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:0 休憩
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
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:1
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
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:2
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
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:30
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
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:31
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
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:60
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
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:80
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
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:82
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
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:84
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
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:87
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
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:89
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
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:91
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
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:200～ 勇者入场旗标
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
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:600
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
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:601
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
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:602
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
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:603
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
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:604
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
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:605
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
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:606
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
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:607 文档重名
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
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:608
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
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:609
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
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:611
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
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:612
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
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt FLAG:613
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

  /**
   * flag_2815（flag:2815 ↔ FLAG:2815）
   * 源: ownership/flag-ownership.yml 属主 event
   * @returns {number}
   */
  get flag_2815() {
    return era.get('flag:2815') || 0;
  }
  /**
   * @param {number} v
   */
  set flag_2815(v) {
    era.set('flag:2815', v);
  }

  /**
   * flag_2816（flag:2816 ↔ FLAG:2816）
   * 源: ownership/flag-ownership.yml 属主 event
   * @returns {number}
   */
  get flag_2816() {
    return era.get('flag:2816') || 0;
  }
  /**
   * @param {number} v
   */
  set flag_2816(v) {
    era.set('flag:2816', v);
  }

  // —— tflag ——
  /**
   * 犬射精或处刑口上（tflag:16 ↔ TFLAG:16）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:16
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
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:31
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
   * tflag_33（tflag:33 ↔ TFLAG:33）
   * 源: ownership/tflag-ownership.yml 属主 event
   * @returns {number}
   */
  get tflag_33() {
    return era.get('tflag:33') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_33(v) {
    era.set('tflag:33', v);
  }

  /**
   * tflag_36（tflag:36 ↔ TFLAG:36）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_36() {
    return era.get('tflag:36') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_36(v) {
    era.set('tflag:36', v);
  }

  /**
   * tflag_37（tflag:37 ↔ TFLAG:37）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_37() {
    return era.get('tflag:37') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_37(v) {
    era.set('tflag:37', v);
  }

  /**
   * tflag_39（tflag:39 ↔ TFLAG:39）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_39() {
    return era.get('tflag:39') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_39(v) {
    era.set('tflag:39', v);
  }

  /**
   * tflag_43（tflag:43 ↔ TFLAG:43）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_43() {
    return era.get('tflag:43') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_43(v) {
    era.set('tflag:43', v);
  }

  /**
   * tflag_44（tflag:44 ↔ TFLAG:44）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_44() {
    return era.get('tflag:44') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_44(v) {
    era.set('tflag:44', v);
  }

  /**
   * tflag_46（tflag:46 ↔ TFLAG:46）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_46() {
    return era.get('tflag:46') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_46(v) {
    era.set('tflag:46', v);
  }

  /**
   * tflag_47（tflag:47 ↔ TFLAG:47）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_47() {
    return era.get('tflag:47') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_47(v) {
    era.set('tflag:47', v);
  }

  /**
   * tflag_48（tflag:48 ↔ TFLAG:48）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_48() {
    return era.get('tflag:48') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_48(v) {
    era.set('tflag:48', v);
  }

  /**
   * tflag_49（tflag:49 ↔ TFLAG:49）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_49() {
    return era.get('tflag:49') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_49(v) {
    era.set('tflag:49', v);
  }

  /**
   * 珠结算_0（tflag:51 ↔ TFLAG:51）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:51～58 @JUEL_CHECK
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
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:51～58 @JUEL_CHECK
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
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:51～58 @JUEL_CHECK
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
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:51～58 @JUEL_CHECK
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
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:51～58 @JUEL_CHECK
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
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:51～58 @JUEL_CHECK
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
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:51～58 @JUEL_CHECK
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
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:59
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
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:60
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
   * tflag_61（tflag:61 ↔ TFLAG:61）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_61() {
    return era.get('tflag:61') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_61(v) {
    era.set('tflag:61', v);
  }

  /**
   * tflag_62（tflag:62 ↔ TFLAG:62）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_62() {
    return era.get('tflag:62') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_62(v) {
    era.set('tflag:62', v);
  }

  /**
   * tflag_63（tflag:63 ↔ TFLAG:63）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_63() {
    return era.get('tflag:63') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_63(v) {
    era.set('tflag:63', v);
  }

  /**
   * tflag_64（tflag:64 ↔ TFLAG:64）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_64() {
    return era.get('tflag:64') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_64(v) {
    era.set('tflag:64', v);
  }

  /**
   * tflag_65（tflag:65 ↔ TFLAG:65）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_65() {
    return era.get('tflag:65') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_65(v) {
    era.set('tflag:65', v);
  }

  /**
   * tflag_66（tflag:66 ↔ TFLAG:66）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_66() {
    return era.get('tflag:66') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_66(v) {
    era.set('tflag:66', v);
  }

  /**
   * tflag_67（tflag:67 ↔ TFLAG:67）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_67() {
    return era.get('tflag:67') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_67(v) {
    era.set('tflag:67', v);
  }

  /**
   * tflag_68（tflag:68 ↔ TFLAG:68）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_68() {
    return era.get('tflag:68') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_68(v) {
    era.set('tflag:68', v);
  }

  /**
   * tflag_69（tflag:69 ↔ TFLAG:69）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_69() {
    return era.get('tflag:69') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_69(v) {
    era.set('tflag:69', v);
  }

  /**
   * 录像次数（tflag:70 ↔ TFLAG:70）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:70
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
   * tflag_71（tflag:71 ↔ TFLAG:71）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_71() {
    return era.get('tflag:71') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_71(v) {
    era.set('tflag:71', v);
  }

  /**
   * tflag_72（tflag:72 ↔ TFLAG:72）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_72() {
    return era.get('tflag:72') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_72(v) {
    era.set('tflag:72', v);
  }

  /**
   * tflag_73（tflag:73 ↔ TFLAG:73）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_73() {
    return era.get('tflag:73') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_73(v) {
    era.set('tflag:73', v);
  }

  /**
   * tflag_74（tflag:74 ↔ TFLAG:74）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_74() {
    return era.get('tflag:74') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_74(v) {
    era.set('tflag:74', v);
  }

  /**
   * tflag_75（tflag:75 ↔ TFLAG:75）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_75() {
    return era.get('tflag:75') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_75(v) {
    era.set('tflag:75', v);
  }

  /**
   * tflag_76（tflag:76 ↔ TFLAG:76）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_76() {
    return era.get('tflag:76') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_76(v) {
    era.set('tflag:76', v);
  }

  /**
   * tflag_77（tflag:77 ↔ TFLAG:77）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_77() {
    return era.get('tflag:77') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_77(v) {
    era.set('tflag:77', v);
  }

  /**
   * tflag_78（tflag:78 ↔ TFLAG:78）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_78() {
    return era.get('tflag:78') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_78(v) {
    era.set('tflag:78', v);
  }

  /**
   * tflag_79（tflag:79 ↔ TFLAG:79）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_79() {
    return era.get('tflag:79') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_79(v) {
    era.set('tflag:79', v);
  }

  /**
   * tflag_80（tflag:80 ↔ TFLAG:80）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_80() {
    return era.get('tflag:80') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_80(v) {
    era.set('tflag:80', v);
  }

  /**
   * tflag_81（tflag:81 ↔ TFLAG:81）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_81() {
    return era.get('tflag:81') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_81(v) {
    era.set('tflag:81', v);
  }

  /**
   * tflag_82（tflag:82 ↔ TFLAG:82）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_82() {
    return era.get('tflag:82') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_82(v) {
    era.set('tflag:82', v);
  }

  /**
   * tflag_83（tflag:83 ↔ TFLAG:83）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_83() {
    return era.get('tflag:83') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_83(v) {
    era.set('tflag:83', v);
  }

  /**
   * tflag_84（tflag:84 ↔ TFLAG:84）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_84() {
    return era.get('tflag:84') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_84(v) {
    era.set('tflag:84', v);
  }

  /**
   * tflag_85（tflag:85 ↔ TFLAG:85）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_85() {
    return era.get('tflag:85') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_85(v) {
    era.set('tflag:85', v);
  }

  /**
   * tflag_86（tflag:86 ↔ TFLAG:86）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_86() {
    return era.get('tflag:86') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_86(v) {
    era.set('tflag:86', v);
  }

  /**
   * tflag_87（tflag:87 ↔ TFLAG:87）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_87() {
    return era.get('tflag:87') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_87(v) {
    era.set('tflag:87', v);
  }

  /**
   * tflag_88（tflag:88 ↔ TFLAG:88）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_88() {
    return era.get('tflag:88') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_88(v) {
    era.set('tflag:88', v);
  }

  /**
   * tflag_89（tflag:89 ↔ TFLAG:89）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_89() {
    return era.get('tflag:89') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_89(v) {
    era.set('tflag:89', v);
  }

  /**
   * tflag_90（tflag:90 ↔ TFLAG:90）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_90() {
    return era.get('tflag:90') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_90(v) {
    era.set('tflag:90', v);
  }

  /**
   * tflag_91（tflag:91 ↔ TFLAG:91）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_91() {
    return era.get('tflag:91') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_91(v) {
    era.set('tflag:91', v);
  }

  /**
   * tflag_92（tflag:92 ↔ TFLAG:92）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_92() {
    return era.get('tflag:92') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_92(v) {
    era.set('tflag:92', v);
  }

  /**
   * tflag_93（tflag:93 ↔ TFLAG:93）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_93() {
    return era.get('tflag:93') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_93(v) {
    era.set('tflag:93', v);
  }

  /**
   * tflag_94（tflag:94 ↔ TFLAG:94）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_94() {
    return era.get('tflag:94') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_94(v) {
    era.set('tflag:94', v);
  }

  /**
   * tflag_95（tflag:95 ↔ TFLAG:95）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_95() {
    return era.get('tflag:95') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_95(v) {
    era.set('tflag:95', v);
  }

  /**
   * tflag_96（tflag:96 ↔ TFLAG:96）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_96() {
    return era.get('tflag:96') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_96(v) {
    era.set('tflag:96', v);
  }

  /**
   * tflag_97（tflag:97 ↔ TFLAG:97）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_97() {
    return era.get('tflag:97') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_97(v) {
    era.set('tflag:97', v);
  }

  /**
   * tflag_98（tflag:98 ↔ TFLAG:98）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_98() {
    return era.get('tflag:98') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_98(v) {
    era.set('tflag:98', v);
  }

  /**
   * tflag_99（tflag:99 ↔ TFLAG:99）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_99() {
    return era.get('tflag:99') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_99(v) {
    era.set('tflag:99', v);
  }

  /**
   * tflag_103（tflag:103 ↔ TFLAG:103）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_103() {
    return era.get('tflag:103') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_103(v) {
    era.set('tflag:103', v);
  }

  /**
   * tflag_104（tflag:104 ↔ TFLAG:104）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_104() {
    return era.get('tflag:104') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_104(v) {
    era.set('tflag:104', v);
  }

  /**
   * tflag_105（tflag:105 ↔ TFLAG:105）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_105() {
    return era.get('tflag:105') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_105(v) {
    era.set('tflag:105', v);
  }

  /**
   * tflag_106（tflag:106 ↔ TFLAG:106）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_106() {
    return era.get('tflag:106') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_106(v) {
    era.set('tflag:106', v);
  }

  /**
   * tflag_107（tflag:107 ↔ TFLAG:107）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_107() {
    return era.get('tflag:107') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_107(v) {
    era.set('tflag:107', v);
  }

  /**
   * tflag_108（tflag:108 ↔ TFLAG:108）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_108() {
    return era.get('tflag:108') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_108(v) {
    era.set('tflag:108', v);
  }

  /**
   * tflag_109（tflag:109 ↔ TFLAG:109）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_109() {
    return era.get('tflag:109') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_109(v) {
    era.set('tflag:109', v);
  }

  /**
   * 精爱味觉（tflag:110 ↔ TFLAG:110）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:110
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
   * tflag_111（tflag:111 ↔ TFLAG:111）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_111() {
    return era.get('tflag:111') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_111(v) {
    era.set('tflag:111', v);
  }

  /**
   * tflag_112（tflag:112 ↔ TFLAG:112）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_112() {
    return era.get('tflag:112') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_112(v) {
    era.set('tflag:112', v);
  }

  /**
   * tflag_113（tflag:113 ↔ TFLAG:113）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_113() {
    return era.get('tflag:113') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_113(v) {
    era.set('tflag:113', v);
  }

  /**
   * tflag_114（tflag:114 ↔ TFLAG:114）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_114() {
    return era.get('tflag:114') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_114(v) {
    era.set('tflag:114', v);
  }

  /**
   * tflag_115（tflag:115 ↔ TFLAG:115）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_115() {
    return era.get('tflag:115') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_115(v) {
    era.set('tflag:115', v);
  }

  /**
   * tflag_116（tflag:116 ↔ TFLAG:116）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_116() {
    return era.get('tflag:116') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_116(v) {
    era.set('tflag:116', v);
  }

  /**
   * tflag_117（tflag:117 ↔ TFLAG:117）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_117() {
    return era.get('tflag:117') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_117(v) {
    era.set('tflag:117', v);
  }

  /**
   * tflag_118（tflag:118 ↔ TFLAG:118）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_118() {
    return era.get('tflag:118') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_118(v) {
    era.set('tflag:118', v);
  }

  /**
   * tflag_119（tflag:119 ↔ TFLAG:119）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_119() {
    return era.get('tflag:119') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_119(v) {
    era.set('tflag:119', v);
  }

  /**
   * tflag_122（tflag:122 ↔ TFLAG:122）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_122() {
    return era.get('tflag:122') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_122(v) {
    era.set('tflag:122', v);
  }

  /**
   * tflag_123（tflag:123 ↔ TFLAG:123）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_123() {
    return era.get('tflag:123') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_123(v) {
    era.set('tflag:123', v);
  }

  /**
   * tflag_124（tflag:124 ↔ TFLAG:124）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_124() {
    return era.get('tflag:124') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_124(v) {
    era.set('tflag:124', v);
  }

  /**
   * tflag_125（tflag:125 ↔ TFLAG:125）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_125() {
    return era.get('tflag:125') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_125(v) {
    era.set('tflag:125', v);
  }

  /**
   * tflag_126（tflag:126 ↔ TFLAG:126）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_126() {
    return era.get('tflag:126') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_126(v) {
    era.set('tflag:126', v);
  }

  /**
   * tflag_127（tflag:127 ↔ TFLAG:127）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_127() {
    return era.get('tflag:127') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_127(v) {
    era.set('tflag:127', v);
  }

  /**
   * tflag_128（tflag:128 ↔ TFLAG:128）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_128() {
    return era.get('tflag:128') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_128(v) {
    era.set('tflag:128', v);
  }

  /**
   * tflag_129（tflag:129 ↔ TFLAG:129）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_129() {
    return era.get('tflag:129') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_129(v) {
    era.set('tflag:129', v);
  }

  /**
   * tflag_130（tflag:130 ↔ TFLAG:130）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_130() {
    return era.get('tflag:130') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_130(v) {
    era.set('tflag:130', v);
  }

  /**
   * tflag_131（tflag:131 ↔ TFLAG:131）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_131() {
    return era.get('tflag:131') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_131(v) {
    era.set('tflag:131', v);
  }

  /**
   * tflag_132（tflag:132 ↔ TFLAG:132）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_132() {
    return era.get('tflag:132') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_132(v) {
    era.set('tflag:132', v);
  }

  /**
   * tflag_133（tflag:133 ↔ TFLAG:133）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_133() {
    return era.get('tflag:133') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_133(v) {
    era.set('tflag:133', v);
  }

  /**
   * tflag_134（tflag:134 ↔ TFLAG:134）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_134() {
    return era.get('tflag:134') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_134(v) {
    era.set('tflag:134', v);
  }

  /**
   * tflag_135（tflag:135 ↔ TFLAG:135）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_135() {
    return era.get('tflag:135') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_135(v) {
    era.set('tflag:135', v);
  }

  /**
   * tflag_136（tflag:136 ↔ TFLAG:136）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_136() {
    return era.get('tflag:136') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_136(v) {
    era.set('tflag:136', v);
  }

  /**
   * tflag_137（tflag:137 ↔ TFLAG:137）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_137() {
    return era.get('tflag:137') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_137(v) {
    era.set('tflag:137', v);
  }

  /**
   * tflag_138（tflag:138 ↔ TFLAG:138）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_138() {
    return era.get('tflag:138') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_138(v) {
    era.set('tflag:138', v);
  }

  /**
   * tflag_139（tflag:139 ↔ TFLAG:139）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_139() {
    return era.get('tflag:139') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_139(v) {
    era.set('tflag:139', v);
  }

  /**
   * tflag_140（tflag:140 ↔ TFLAG:140）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_140() {
    return era.get('tflag:140') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_140(v) {
    era.set('tflag:140', v);
  }

  /**
   * tflag_141（tflag:141 ↔ TFLAG:141）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_141() {
    return era.get('tflag:141') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_141(v) {
    era.set('tflag:141', v);
  }

  /**
   * tflag_142（tflag:142 ↔ TFLAG:142）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_142() {
    return era.get('tflag:142') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_142(v) {
    era.set('tflag:142', v);
  }

  /**
   * tflag_143（tflag:143 ↔ TFLAG:143）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_143() {
    return era.get('tflag:143') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_143(v) {
    era.set('tflag:143', v);
  }

  /**
   * tflag_144（tflag:144 ↔ TFLAG:144）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_144() {
    return era.get('tflag:144') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_144(v) {
    era.set('tflag:144', v);
  }

  /**
   * tflag_145（tflag:145 ↔ TFLAG:145）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_145() {
    return era.get('tflag:145') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_145(v) {
    era.set('tflag:145', v);
  }

  /**
   * tflag_146（tflag:146 ↔ TFLAG:146）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_146() {
    return era.get('tflag:146') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_146(v) {
    era.set('tflag:146', v);
  }

  /**
   * tflag_147（tflag:147 ↔ TFLAG:147）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_147() {
    return era.get('tflag:147') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_147(v) {
    era.set('tflag:147', v);
  }

  /**
   * tflag_148（tflag:148 ↔ TFLAG:148）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_148() {
    return era.get('tflag:148') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_148(v) {
    era.set('tflag:148', v);
  }

  /**
   * tflag_149（tflag:149 ↔ TFLAG:149）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_149() {
    return era.get('tflag:149') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_149(v) {
    era.set('tflag:149', v);
  }

  /**
   * tflag_151（tflag:151 ↔ TFLAG:151）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_151() {
    return era.get('tflag:151') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_151(v) {
    era.set('tflag:151', v);
  }

  /**
   * tflag_152（tflag:152 ↔ TFLAG:152）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_152() {
    return era.get('tflag:152') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_152(v) {
    era.set('tflag:152', v);
  }

  /**
   * tflag_153（tflag:153 ↔ TFLAG:153）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_153() {
    return era.get('tflag:153') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_153(v) {
    era.set('tflag:153', v);
  }

  /**
   * tflag_154（tflag:154 ↔ TFLAG:154）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_154() {
    return era.get('tflag:154') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_154(v) {
    era.set('tflag:154', v);
  }

  /**
   * tflag_155（tflag:155 ↔ TFLAG:155）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_155() {
    return era.get('tflag:155') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_155(v) {
    era.set('tflag:155', v);
  }

  /**
   * tflag_156（tflag:156 ↔ TFLAG:156）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_156() {
    return era.get('tflag:156') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_156(v) {
    era.set('tflag:156', v);
  }

  /**
   * tflag_157（tflag:157 ↔ TFLAG:157）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_157() {
    return era.get('tflag:157') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_157(v) {
    era.set('tflag:157', v);
  }

  /**
   * tflag_158（tflag:158 ↔ TFLAG:158）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_158() {
    return era.get('tflag:158') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_158(v) {
    era.set('tflag:158', v);
  }

  /**
   * tflag_159（tflag:159 ↔ TFLAG:159）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_159() {
    return era.get('tflag:159') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_159(v) {
    era.set('tflag:159', v);
  }

  /**
   * tflag_160（tflag:160 ↔ TFLAG:160）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_160() {
    return era.get('tflag:160') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_160(v) {
    era.set('tflag:160', v);
  }

  /**
   * tflag_161（tflag:161 ↔ TFLAG:161）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_161() {
    return era.get('tflag:161') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_161(v) {
    era.set('tflag:161', v);
  }

  /**
   * tflag_162（tflag:162 ↔ TFLAG:162）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_162() {
    return era.get('tflag:162') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_162(v) {
    era.set('tflag:162', v);
  }

  /**
   * tflag_163（tflag:163 ↔ TFLAG:163）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_163() {
    return era.get('tflag:163') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_163(v) {
    era.set('tflag:163', v);
  }

  /**
   * tflag_164（tflag:164 ↔ TFLAG:164）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_164() {
    return era.get('tflag:164') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_164(v) {
    era.set('tflag:164', v);
  }

  /**
   * tflag_165（tflag:165 ↔ TFLAG:165）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_165() {
    return era.get('tflag:165') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_165(v) {
    era.set('tflag:165', v);
  }

  /**
   * tflag_166（tflag:166 ↔ TFLAG:166）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_166() {
    return era.get('tflag:166') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_166(v) {
    era.set('tflag:166', v);
  }

  /**
   * tflag_167（tflag:167 ↔ TFLAG:167）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_167() {
    return era.get('tflag:167') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_167(v) {
    era.set('tflag:167', v);
  }

  /**
   * tflag_168（tflag:168 ↔ TFLAG:168）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_168() {
    return era.get('tflag:168') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_168(v) {
    era.set('tflag:168', v);
  }

  /**
   * tflag_169（tflag:169 ↔ TFLAG:169）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_169() {
    return era.get('tflag:169') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_169(v) {
    era.set('tflag:169', v);
  }

  /**
   * tflag_170（tflag:170 ↔ TFLAG:170）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_170() {
    return era.get('tflag:170') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_170(v) {
    era.set('tflag:170', v);
  }

  /**
   * tflag_171（tflag:171 ↔ TFLAG:171）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_171() {
    return era.get('tflag:171') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_171(v) {
    era.set('tflag:171', v);
  }

  /**
   * tflag_172（tflag:172 ↔ TFLAG:172）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_172() {
    return era.get('tflag:172') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_172(v) {
    era.set('tflag:172', v);
  }

  /**
   * tflag_173（tflag:173 ↔ TFLAG:173）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_173() {
    return era.get('tflag:173') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_173(v) {
    era.set('tflag:173', v);
  }

  /**
   * tflag_174（tflag:174 ↔ TFLAG:174）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_174() {
    return era.get('tflag:174') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_174(v) {
    era.set('tflag:174', v);
  }

  /**
   * tflag_175（tflag:175 ↔ TFLAG:175）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_175() {
    return era.get('tflag:175') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_175(v) {
    era.set('tflag:175', v);
  }

  /**
   * tflag_176（tflag:176 ↔ TFLAG:176）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_176() {
    return era.get('tflag:176') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_176(v) {
    era.set('tflag:176', v);
  }

  /**
   * tflag_177（tflag:177 ↔ TFLAG:177）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_177() {
    return era.get('tflag:177') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_177(v) {
    era.set('tflag:177', v);
  }

  /**
   * tflag_178（tflag:178 ↔ TFLAG:178）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_178() {
    return era.get('tflag:178') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_178(v) {
    era.set('tflag:178', v);
  }

  /**
   * tflag_179（tflag:179 ↔ TFLAG:179）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_179() {
    return era.get('tflag:179') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_179(v) {
    era.set('tflag:179', v);
  }

  /**
   * tflag_180（tflag:180 ↔ TFLAG:180）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_180() {
    return era.get('tflag:180') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_180(v) {
    era.set('tflag:180', v);
  }

  /**
   * tflag_181（tflag:181 ↔ TFLAG:181）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_181() {
    return era.get('tflag:181') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_181(v) {
    era.set('tflag:181', v);
  }

  /**
   * tflag_182（tflag:182 ↔ TFLAG:182）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_182() {
    return era.get('tflag:182') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_182(v) {
    era.set('tflag:182', v);
  }

  /**
   * tflag_183（tflag:183 ↔ TFLAG:183）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_183() {
    return era.get('tflag:183') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_183(v) {
    era.set('tflag:183', v);
  }

  /**
   * tflag_184（tflag:184 ↔ TFLAG:184）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_184() {
    return era.get('tflag:184') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_184(v) {
    era.set('tflag:184', v);
  }

  /**
   * tflag_185（tflag:185 ↔ TFLAG:185）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_185() {
    return era.get('tflag:185') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_185(v) {
    era.set('tflag:185', v);
  }

  /**
   * tflag_186（tflag:186 ↔ TFLAG:186）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_186() {
    return era.get('tflag:186') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_186(v) {
    era.set('tflag:186', v);
  }

  /**
   * tflag_187（tflag:187 ↔ TFLAG:187）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_187() {
    return era.get('tflag:187') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_187(v) {
    era.set('tflag:187', v);
  }

  /**
   * tflag_188（tflag:188 ↔ TFLAG:188）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_188() {
    return era.get('tflag:188') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_188(v) {
    era.set('tflag:188', v);
  }

  /**
   * tflag_189（tflag:189 ↔ TFLAG:189）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_189() {
    return era.get('tflag:189') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_189(v) {
    era.set('tflag:189', v);
  }

  /**
   * tflag_190（tflag:190 ↔ TFLAG:190）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_190() {
    return era.get('tflag:190') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_190(v) {
    era.set('tflag:190', v);
  }

  /**
   * tflag_191（tflag:191 ↔ TFLAG:191）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_191() {
    return era.get('tflag:191') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_191(v) {
    era.set('tflag:191', v);
  }

  /**
   * tflag_192（tflag:192 ↔ TFLAG:192）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_192() {
    return era.get('tflag:192') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_192(v) {
    era.set('tflag:192', v);
  }

  /**
   * tflag_193（tflag:193 ↔ TFLAG:193）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_193() {
    return era.get('tflag:193') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_193(v) {
    era.set('tflag:193', v);
  }

  /**
   * tflag_194（tflag:194 ↔ TFLAG:194）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_194() {
    return era.get('tflag:194') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_194(v) {
    era.set('tflag:194', v);
  }

  /**
   * tflag_195（tflag:195 ↔ TFLAG:195）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_195() {
    return era.get('tflag:195') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_195(v) {
    era.set('tflag:195', v);
  }

  /**
   * tflag_196（tflag:196 ↔ TFLAG:196）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_196() {
    return era.get('tflag:196') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_196(v) {
    era.set('tflag:196', v);
  }

  /**
   * tflag_197（tflag:197 ↔ TFLAG:197）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_197() {
    return era.get('tflag:197') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_197(v) {
    era.set('tflag:197', v);
  }

  /**
   * tflag_198（tflag:198 ↔ TFLAG:198）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_198() {
    return era.get('tflag:198') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_198(v) {
    era.set('tflag:198', v);
  }

  /**
   * tflag_199（tflag:199 ↔ TFLAG:199）
   * 源: ownership/tflag-ownership.yml；语义随属主票补
   * @returns {number}
   */
  get tflag_199() {
    return era.get('tflag:199') || 0;
  }
  /**
   * @param {number} v
   */
  set tflag_199(v) {
    era.set('tflag:199', v);
  }

  /**
   * 博物馆口上（tflag:500 ↔ TFLAG:500）
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:500
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
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:510
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
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:520
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
   * 源: 资料_非必要無須解壓/eramaouフラグまとめ.txt TFLAG:530
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
