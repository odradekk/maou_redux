/**
 * @file exflag 表的具名访问器初稿（tools/gen-wrapper.js 自 yml/ExFlag.yml 生成）。
 *
 * 生成区（GENERATED 标记之间）由脚本维护，重生成加 --force；
 * 标记之外是手写区：变量语义补注、业务方法，重新生成不会触碰（#11 决议）。
 * 变量的原作语义与来源写进手写区补注（AGENTS.md「变量语义必须注释」）。
 */

const era = require('#/era-electron');

// GENERATED START —— tools/gen-wrapper.js 自 yml/ExFlag.yml 生成，勿手改；重新生成（--force）只替换本标记之间
const era_exflag = {
  /**
   * 上届魔王（exflag:0 ↔ EXFLAG:0）
   * @returns {number}
   */
  get prev_maou() {
    return era.get('exflag:0') || 0;
  },
  /**
   * @param {number} v
   */
  set prev_maou(v) {
    era.set('exflag:0', v);
  },
  /**
   * 继任魔王（exflag:3 ↔ EXFLAG:3）
   * @returns {number}
   */
  get next_maou() {
    return era.get('exflag:3') || 0;
  },
  /**
   * @param {number} v
   */
  set next_maou(v) {
    era.set('exflag:3', v);
  },
  /**
   * 勇者击破位域（exflag:95 ↔ EXFLAG:95）
   * @returns {number}
   */
  get defeated_heroes_bits() {
    return era.get('exflag:95') || 0;
  },
  /**
   * @param {number} v
   */
  set defeated_heroes_bits(v) {
    era.set('exflag:95', v);
  },
  /**
   * 威望（exflag:99 ↔ EXFLAG:99）
   * @returns {number}
   */
  get prestige() {
    return era.get('exflag:99') || 0;
  },
  /**
   * @param {number} v
   */
  set prestige(v) {
    era.set('exflag:99', v);
  },
  /**
   * 天神宫侵攻度（exflag:101 ↔ EXFLAG:101）
   * @returns {number}
   */
  get shrine_invasion() {
    return era.get('exflag:101') || 0;
  },
  /**
   * @param {number} v
   */
  set shrine_invasion(v) {
    era.set('exflag:101', v);
  },
  /**
   * 天神宫阶段（exflag:102 ↔ EXFLAG:102）
   * @returns {number}
   */
  get shrine_stage() {
    return era.get('exflag:102') || 0;
  },
  /**
   * @param {number} v
   */
  set shrine_stage(v) {
    era.set('exflag:102', v);
  },
  /**
   * 嘉德口上会话（exflag:103 ↔ EXFLAG:103）
   * @returns {number}
   */
  get kojo_gade_session() {
    return era.get('exflag:103') || 0;
  },
  /**
   * @param {number} v
   */
  set kojo_gade_session(v) {
    era.set('exflag:103', v);
  },
  /**
   * 菲娅口上会话（exflag:104 ↔ EXFLAG:104）
   * @returns {number}
   */
  get kojo_fia_session() {
    return era.get('exflag:104') || 0;
  },
  /**
   * @param {number} v
   */
  set kojo_fia_session(v) {
    era.set('exflag:104', v);
  },
  /**
   * 丽塔口上会话（exflag:223 ↔ EXFLAG:223）
   * @returns {number}
   */
  get kojo_rita_session() {
    return era.get('exflag:223') || 0;
  },
  /**
   * @param {number} v
   */
  set kojo_rita_session(v) {
    era.set('exflag:223', v);
  },
  /**
   * 非作弊资金（exflag:4444 ↔ EXFLAG:4444）
   * @returns {number}
   */
  get legit_money() {
    return era.get('exflag:4444') || 0;
  },
  /**
   * @param {number} v
   */
  set legit_money(v) {
    era.set('exflag:4444', v);
  },
  /**
   * 一周目主线（exflag:2801 ↔ EXFLAG:2801）
   * @returns {number}
   */
  get first_run_deadline() {
    return era.get('exflag:2801') || 0;
  },
  /**
   * @param {number} v
   */
  set first_run_deadline(v) {
    era.set('exflag:2801', v);
  },
  /**
   * 资金作弊结局（exflag:2802 ↔ EXFLAG:2802）
   * @returns {number}
   */
  get money_cheat_ending() {
    return era.get('exflag:2802') || 0;
  },
  /**
   * @param {number} v
   */
  set money_cheat_ending(v) {
    era.set('exflag:2802', v);
  },
  /**
   * 失控奴隶号（exflag:2803 ↔ EXFLAG:2803）
   * @returns {number}
   */
  get runaway_slave_id() {
    return era.get('exflag:2803') || 0;
  },
  /**
   * @param {number} v
   */
  set runaway_slave_id(v) {
    era.set('exflag:2803', v);
  },
  /**
   * 魔王失控结局（exflag:2804 ↔ EXFLAG:2804）
   * @returns {number}
   */
  get maou_runaway_ending() {
    return era.get('exflag:2804') || 0;
  },
  /**
   * @param {number} v
   */
  set maou_runaway_ending(v) {
    era.set('exflag:2804', v);
  },
  /**
   * 玛奥线（exflag:2805 ↔ EXFLAG:2805）
   * @returns {number}
   */
  get route_17() {
    return era.get('exflag:2805') || 0;
  },
  /**
   * @param {number} v
   */
  set route_17(v) {
    era.set('exflag:2805', v);
  },
  /**
   * 莉莉线（exflag:2806 ↔ EXFLAG:2806）
   * @returns {number}
   */
  get route_24() {
    return era.get('exflag:2806') || 0;
  },
  /**
   * @param {number} v
   */
  set route_24(v) {
    era.set('exflag:2806', v);
  },
  /**
   * 菲娅线（exflag:2807 ↔ EXFLAG:2807）
   * @returns {number}
   */
  get route_35() {
    return era.get('exflag:2807') || 0;
  },
  /**
   * @param {number} v
   */
  set route_35(v) {
    era.set('exflag:2807', v);
  },
  /**
   * 琼线（exflag:2808 ↔ EXFLAG:2808）
   * @returns {number}
   */
  get route_31() {
    return era.get('exflag:2808') || 0;
  },
  /**
   * @param {number} v
   */
  set route_31(v) {
    era.set('exflag:2808', v);
  },
  /**
   * 普林希斯线（exflag:2809 ↔ EXFLAG:2809）
   * @returns {number}
   */
  get route_32() {
    return era.get('exflag:2809') || 0;
  },
  /**
   * @param {number} v
   */
  set route_32(v) {
    era.set('exflag:2809', v);
  },
  /**
   * 嘉德线（exflag:2810 ↔ EXFLAG:2810）
   * @returns {number}
   */
  get route_33() {
    return era.get('exflag:2810') || 0;
  },
  /**
   * @param {number} v
   */
  set route_33(v) {
    era.set('exflag:2810', v);
  },
  /**
   * 黑方片线（exflag:2811 ↔ EXFLAG:2811）
   * @returns {number}
   */
  get route_22() {
    return era.get('exflag:2811') || 0;
  },
  /**
   * @param {number} v
   */
  set route_22(v) {
    era.set('exflag:2811', v);
  },
  /**
   * 白梅花线（exflag:2812 ↔ EXFLAG:2812）
   * @returns {number}
   */
  get route_23() {
    return era.get('exflag:2812') || 0;
  },
  /**
   * @param {number} v
   */
  set route_23(v) {
    era.set('exflag:2812', v);
  },
  /**
   * 金红桃线（exflag:2813 ↔ EXFLAG:2813）
   * @returns {number}
   */
  get route_20() {
    return era.get('exflag:2813') || 0;
  },
  /**
   * @param {number} v
   */
  set route_20(v) {
    era.set('exflag:2813', v);
  },
  /**
   * 银黑桃线（exflag:2814 ↔ EXFLAG:2814）
   * @returns {number}
   */
  get route_21() {
    return era.get('exflag:2814') || 0;
  },
  /**
   * @param {number} v
   */
  set route_21(v) {
    era.set('exflag:2814', v);
  },
  /**
   * 葵希罗线（exflag:2815 ↔ EXFLAG:2815）
   * @returns {number}
   */
  get route_34() {
    return era.get('exflag:2815') || 0;
  },
  /**
   * @param {number} v
   */
  set route_34(v) {
    era.set('exflag:2815', v);
  },
  /**
   * 反叛结局（exflag:2816 ↔ EXFLAG:2816）
   * @returns {number}
   */
  get rebellion_ending() {
    return era.get('exflag:2816') || 0;
  },
  /**
   * @param {number} v
   */
  set rebellion_ending(v) {
    era.set('exflag:2816', v);
  },
  /**
   * 魔改开关位图（exflag:9000 ↔ EXFLAG:9000）
   * @returns {number}
   */
  get mod_switch_bits() {
    return era.get('exflag:9000') || 0;
  },
  /**
   * @param {number} v
   */
  set mod_switch_bits(v) {
    era.set('exflag:9000', v);
  },
  /**
   * 银行存款（exflag:9001 ↔ EXFLAG:9001）
   * @returns {number}
   */
  get bank_deposit() {
    return era.get('exflag:9001') || 0;
  },
  /**
   * @param {number} v
   */
  set bank_deposit(v) {
    era.set('exflag:9001', v);
  },
  /**
   * 银行计息日（exflag:9002 ↔ EXFLAG:9002）
   * @returns {number}
   */
  get bank_interest_day() {
    return era.get('exflag:9002') || 0;
  },
  /**
   * @param {number} v
   */
  set bank_interest_day(v) {
    era.set('exflag:9002', v);
  },
  /**
   * 银行欠款（exflag:9003 ↔ EXFLAG:9003）
   * @returns {number}
   */
  get bank_debt() {
    return era.get('exflag:9003') || 0;
  },
  /**
   * @param {number} v
   */
  set bank_debt(v) {
    era.set('exflag:9003', v);
  },
  /**
   * 银行欠款标记（exflag:9004 ↔ EXFLAG:9004）
   * @returns {number}
   */
  get bank_debt_flag() {
    return era.get('exflag:9004') || 0;
  },
  /**
   * @param {number} v
   */
  set bank_debt_flag(v) {
    era.set('exflag:9004', v);
  },
  /**
   * 银行还款倒计时（exflag:9005 ↔ EXFLAG:9005）
   * @returns {number}
   */
  get bank_deadline() {
    return era.get('exflag:9005') || 0;
  },
  /**
   * @param {number} v
   */
  set bank_deadline(v) {
    era.set('exflag:9005', v);
  },
  /**
   * 水晶球库存（exflag:9010 ↔ EXFLAG:9010）
   * @returns {number}
   */
  get crystal_ball_stock() {
    return era.get('exflag:9010') || 0;
  },
  /**
   * @param {number} v
   */
  set crystal_ball_stock(v) {
    era.set('exflag:9010', v);
  },
  /**
   * 水晶球投放数（exflag:9011 ↔ EXFLAG:9011）
   * @returns {number}
   */
  get crystal_ball_deployed() {
    return era.get('exflag:9011') || 0;
  },
  /**
   * @param {number} v
   */
  set crystal_ball_deployed(v) {
    era.set('exflag:9011', v);
  },
  /**
   * 水晶球流行度（exflag:9012 ↔ EXFLAG:9012）
   * @returns {number}
   */
  get crystal_ball_popularity() {
    return era.get('exflag:9012') || 0;
  },
  /**
   * @param {number} v
   */
  set crystal_ball_popularity(v) {
    era.set('exflag:9012', v);
  },
  /**
   * 水晶球过时倒计时（exflag:9013 ↔ EXFLAG:9013）
   * @returns {number}
   */
  get crystal_ball_expire() {
    return era.get('exflag:9013') || 0;
  },
  /**
   * @param {number} v
   */
  set crystal_ball_expire(v) {
    era.set('exflag:9013', v);
  },
};
// GENERATED END

// —— 手写区（重新生成不会触碰）——
//
// 生成区注释的「↔ EXFLAG:N」失真——原作侧数组名是 EX_FLAG（两词下划线，
// target/ERB/其他/EXCOM.ERH:1 的 #DIM SAVEDATA EX_FLAG,10000），生成器按
// 表名大写拼注释改不了，以此处为准。逐条语义与证据见 yml/ExFlag.yml 内
// 注释（人工产物，#113），本包装层不再复述。
//
// 威望（prestige ↔ EX_FLAG:99）的两个关键量点：
//   - 开局播种 70（SYSTEM ver1.0.3.ERB:62，@EVENTFIRST，event-first.js）；
//   - 每次侵略结算 +2（INVASION.ERB:978，page/page-invasion.js）；出兵效率
//     按区间打折（INVASION.ERB:269-293）。
//
// @KOJO_MESSAGE_COM 的 EX 口上存在判定以动态下标读取 EX_FLAG:(LOCAL-900)，
// 不能落到某个固定语义访问器。这个方法只供该分发入口使用。
era_exflag.get = (index) => era.get(`exflag:${index}`) || 0;
era_exflag.set = (index, value) => era.set(`exflag:${index}`, value);

module.exports = era_exflag;
