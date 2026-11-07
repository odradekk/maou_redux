// GENERATED START
const era = require('#/era-electron');

/**
 * @param {number|string} param
 * @returns {number}
 */
function get(param) {
  return era.get(`exflag:${param}`) || 0;
}

const era_exflag = {
  /**
   * 上届魔王
   * @returns {number}
   */
  get "prev_maou"() {
    return era['raw']().data['exflag'][0];
  },
  /**
   * 上届魔王
   * @param {number} v
   */
  set "prev_maou"(v) {
    era['raw']().data['exflag'][0] = v;
  },
  /**
   * 继任魔王
   * @returns {number}
   */
  get "next_maou"() {
    return era['raw']().data['exflag'][3];
  },
  /**
   * 继任魔王
   * @param {number} v
   */
  set "next_maou"(v) {
    era['raw']().data['exflag'][3] = v;
  },
  /**
   * 勇者击破位域
   * @returns {number}
   */
  get "defeated_heroes_bits"() {
    return era['raw']().data['exflag'][95];
  },
  /**
   * 勇者击破位域
   * @param {number} v
   */
  set "defeated_heroes_bits"(v) {
    era['raw']().data['exflag'][95] = v;
  },
  /**
   * 威望
   * @returns {number}
   */
  get "prestige"() {
    return era['raw']().data['exflag'][99];
  },
  /**
   * 威望
   * @param {number} v
   */
  set "prestige"(v) {
    era['raw']().data['exflag'][99] = v;
  },
  /**
   * 天神宫侵攻度
   * @returns {number}
   */
  get "shrine_invasion"() {
    return era['raw']().data['exflag'][101];
  },
  /**
   * 天神宫侵攻度
   * @param {number} v
   */
  set "shrine_invasion"(v) {
    era['raw']().data['exflag'][101] = v;
  },
  /**
   * 天神宫阶段
   * @returns {number}
   */
  get "shrine_stage"() {
    return era['raw']().data['exflag'][102];
  },
  /**
   * 天神宫阶段
   * @param {number} v
   */
  set "shrine_stage"(v) {
    era['raw']().data['exflag'][102] = v;
  },
  /**
   * 嘉德口上会话
   * @returns {number}
   */
  get "kojo_gade_session"() {
    return era['raw']().data['exflag'][103];
  },
  /**
   * 嘉德口上会话
   * @param {number} v
   */
  set "kojo_gade_session"(v) {
    era['raw']().data['exflag'][103] = v;
  },
  /**
   * 菲娅口上会话
   * @returns {number}
   */
  get "kojo_fia_session"() {
    return era['raw']().data['exflag'][104];
  },
  /**
   * 菲娅口上会话
   * @param {number} v
   */
  set "kojo_fia_session"(v) {
    era['raw']().data['exflag'][104] = v;
  },
  /**
   * 丽塔口上会话
   * @returns {number}
   */
  get "kojo_rita_session"() {
    return era['raw']().data['exflag'][223];
  },
  /**
   * 丽塔口上会话
   * @param {number} v
   */
  set "kojo_rita_session"(v) {
    era['raw']().data['exflag'][223] = v;
  },
  /**
   * 一周目主线
   * @returns {number}
   */
  get "first_run_deadline"() {
    return era['raw']().data['exflag'][2801];
  },
  /**
   * 一周目主线
   * @param {number} v
   */
  set "first_run_deadline"(v) {
    era['raw']().data['exflag'][2801] = v;
  },
  /**
   * 资金作弊结局
   * @returns {number}
   */
  get "money_cheat_ending"() {
    return era['raw']().data['exflag'][2802];
  },
  /**
   * 资金作弊结局
   * @param {number} v
   */
  set "money_cheat_ending"(v) {
    era['raw']().data['exflag'][2802] = v;
  },
  /**
   * 失控奴隶号
   * @returns {number}
   */
  get "runaway_slave_id"() {
    return era['raw']().data['exflag'][2803];
  },
  /**
   * 失控奴隶号
   * @param {number} v
   */
  set "runaway_slave_id"(v) {
    era['raw']().data['exflag'][2803] = v;
  },
  /**
   * 魔王失控结局
   * @returns {number}
   */
  get "maou_runaway_ending"() {
    return era['raw']().data['exflag'][2804];
  },
  /**
   * 魔王失控结局
   * @param {number} v
   */
  set "maou_runaway_ending"(v) {
    era['raw']().data['exflag'][2804] = v;
  },
  /**
   * 玛奥线
   * @returns {number}
   */
  get "route_17"() {
    return era['raw']().data['exflag'][2805];
  },
  /**
   * 玛奥线
   * @param {number} v
   */
  set "route_17"(v) {
    era['raw']().data['exflag'][2805] = v;
  },
  /**
   * 莉莉线
   * @returns {number}
   */
  get "route_24"() {
    return era['raw']().data['exflag'][2806];
  },
  /**
   * 莉莉线
   * @param {number} v
   */
  set "route_24"(v) {
    era['raw']().data['exflag'][2806] = v;
  },
  /**
   * 菲娅线
   * @returns {number}
   */
  get "route_35"() {
    return era['raw']().data['exflag'][2807];
  },
  /**
   * 菲娅线
   * @param {number} v
   */
  set "route_35"(v) {
    era['raw']().data['exflag'][2807] = v;
  },
  /**
   * 琼线
   * @returns {number}
   */
  get "route_31"() {
    return era['raw']().data['exflag'][2808];
  },
  /**
   * 琼线
   * @param {number} v
   */
  set "route_31"(v) {
    era['raw']().data['exflag'][2808] = v;
  },
  /**
   * 普林希斯线
   * @returns {number}
   */
  get "route_32"() {
    return era['raw']().data['exflag'][2809];
  },
  /**
   * 普林希斯线
   * @param {number} v
   */
  set "route_32"(v) {
    era['raw']().data['exflag'][2809] = v;
  },
  /**
   * 嘉德线
   * @returns {number}
   */
  get "route_33"() {
    return era['raw']().data['exflag'][2810];
  },
  /**
   * 嘉德线
   * @param {number} v
   */
  set "route_33"(v) {
    era['raw']().data['exflag'][2810] = v;
  },
  /**
   * 黑方片线
   * @returns {number}
   */
  get "route_22"() {
    return era['raw']().data['exflag'][2811];
  },
  /**
   * 黑方片线
   * @param {number} v
   */
  set "route_22"(v) {
    era['raw']().data['exflag'][2811] = v;
  },
  /**
   * 白梅花线
   * @returns {number}
   */
  get "route_23"() {
    return era['raw']().data['exflag'][2812];
  },
  /**
   * 白梅花线
   * @param {number} v
   */
  set "route_23"(v) {
    era['raw']().data['exflag'][2812] = v;
  },
  /**
   * 金红桃线
   * @returns {number}
   */
  get "route_20"() {
    return era['raw']().data['exflag'][2813];
  },
  /**
   * 金红桃线
   * @param {number} v
   */
  set "route_20"(v) {
    era['raw']().data['exflag'][2813] = v;
  },
  /**
   * 银黑桃线
   * @returns {number}
   */
  get "route_21"() {
    return era['raw']().data['exflag'][2814];
  },
  /**
   * 银黑桃线
   * @param {number} v
   */
  set "route_21"(v) {
    era['raw']().data['exflag'][2814] = v;
  },
  /**
   * 葵希罗线
   * @returns {number}
   */
  get "route_34"() {
    return era['raw']().data['exflag'][2815];
  },
  /**
   * 葵希罗线
   * @param {number} v
   */
  set "route_34"(v) {
    era['raw']().data['exflag'][2815] = v;
  },
  /**
   * 反叛结局
   * @returns {number}
   */
  get "rebellion_ending"() {
    return era['raw']().data['exflag'][2816];
  },
  /**
   * 反叛结局
   * @param {number} v
   */
  set "rebellion_ending"(v) {
    era['raw']().data['exflag'][2816] = v;
  },
  /**
   * 非作弊资金
   * @returns {number}
   */
  get "legit_money"() {
    return era['raw']().data['exflag'][4444];
  },
  /**
   * 非作弊资金
   * @param {number} v
   */
  set "legit_money"(v) {
    era['raw']().data['exflag'][4444] = v;
  },
  /**
   * 魔改开关位图
   * @returns {number}
   */
  get "mod_switch_bits"() {
    return era['raw']().data['exflag'][9000];
  },
  /**
   * 魔改开关位图
   * @param {number} v
   */
  set "mod_switch_bits"(v) {
    era['raw']().data['exflag'][9000] = v;
  },
  /**
   * 银行存款
   * @returns {number}
   */
  get "bank_deposit"() {
    return era['raw']().data['exflag'][9001];
  },
  /**
   * 银行存款
   * @param {number} v
   */
  set "bank_deposit"(v) {
    era['raw']().data['exflag'][9001] = v;
  },
  /**
   * 银行计息日
   * @returns {number}
   */
  get "bank_interest_day"() {
    return era['raw']().data['exflag'][9002];
  },
  /**
   * 银行计息日
   * @param {number} v
   */
  set "bank_interest_day"(v) {
    era['raw']().data['exflag'][9002] = v;
  },
  /**
   * 银行欠款
   * @returns {number}
   */
  get "bank_debt"() {
    return era['raw']().data['exflag'][9003];
  },
  /**
   * 银行欠款
   * @param {number} v
   */
  set "bank_debt"(v) {
    era['raw']().data['exflag'][9003] = v;
  },
  /**
   * 银行欠款标记
   * @returns {number}
   */
  get "bank_debt_flag"() {
    return era['raw']().data['exflag'][9004];
  },
  /**
   * 银行欠款标记
   * @param {number} v
   */
  set "bank_debt_flag"(v) {
    era['raw']().data['exflag'][9004] = v;
  },
  /**
   * 银行还款倒计时
   * @returns {number}
   */
  get "bank_deadline"() {
    return era['raw']().data['exflag'][9005];
  },
  /**
   * 银行还款倒计时
   * @param {number} v
   */
  set "bank_deadline"(v) {
    era['raw']().data['exflag'][9005] = v;
  },
  /**
   * 水晶球库存
   * @returns {number}
   */
  get "crystal_ball_stock"() {
    return era['raw']().data['exflag'][9010];
  },
  /**
   * 水晶球库存
   * @param {number} v
   */
  set "crystal_ball_stock"(v) {
    era['raw']().data['exflag'][9010] = v;
  },
  /**
   * 水晶球投放数
   * @returns {number}
   */
  get "crystal_ball_deployed"() {
    return era['raw']().data['exflag'][9011];
  },
  /**
   * 水晶球投放数
   * @param {number} v
   */
  set "crystal_ball_deployed"(v) {
    era['raw']().data['exflag'][9011] = v;
  },
  /**
   * 水晶球流行度
   * @returns {number}
   */
  get "crystal_ball_popularity"() {
    return era['raw']().data['exflag'][9012];
  },
  /**
   * 水晶球流行度
   * @param {number} v
   */
  set "crystal_ball_popularity"(v) {
    era['raw']().data['exflag'][9012] = v;
  },
  /**
   * 水晶球过时倒计时
   * @returns {number}
   */
  get "crystal_ball_expire"() {
    return era['raw']().data['exflag'][9013];
  },
  /**
   * 水晶球过时倒计时
   * @param {number} v
   */
  set "crystal_ball_expire"(v) {
    era['raw']().data['exflag'][9013] = v;
  },
  get,
  /**
   * @param {number|string} param
   * @param {number} val
   * @returns {number}
   */
  set(param, val) {
    return era.set(`exflag:${param}`, val);
  },
  /**
   * @param {number|string} param
   * @param {number} val
   * @returns {number}
   */
  add(param, val) {
    return era.set(`exflag:${param}`, get(param) + val);
  },
};

module.exports = era_exflag;
// GENERATED END

// —— 手写区（重新生成不会触碰）——
//
// 本表寻址是 `exflag:N`（也接受 `exflag:中文名`，见 yml/ExFlag.yml 表头），
// 以此处为准。逐条语义与证据见 yml/ExFlag.yml 内注释（人工产物，#113），
// 本包装层不再复述。
//
// 威望（prestige，寻址 exflag:99）的两个关键量点：
//   - 开局播种 70（ere/event/event-first.js 的 EVENTFIRST）；
//   - 每次侵略结算 +2（system/invasion/invasion-campaign.js）；出兵效率按区间打折。
//
// 口上分发（ere/kojo/kojo-system.js）的 EX 口上存在判定以动态下标读取
// EX_FLAG:(LOCAL-900)，不能落到某个固定语义访问器。这个方法只供该分发入口使用。
era_exflag.get = (index) => era.get(`exflag:${index}`) || 0;
era_exflag.set = (index, value) => era.set(`exflag:${index}`, value);

module.exports = era_exflag;
