// GENERATED START
const era = require('#/era-electron');

/**
 * @param {number|string} param
 * @returns {number}
 */
function get(param) {
  return era.get(`tflag:${param}`) || 0;
}

const era_tflag = {
  /**
   * 口中射精
   * @returns {number}
   */
  get "mouth_ejaculation"() {
    return era['raw']().data['tflag'][0];
  },
  /**
   * 口中射精
   * @param {number} v
   */
  set "mouth_ejaculation"(v) {
    era['raw']().data['tflag'][0] = v;
  },
  /**
   * 手中射精
   * @returns {number}
   */
  get "hand_ejaculation"() {
    return era['raw']().data['tflag'][1];
  },
  /**
   * 手中射精
   * @param {number} v
   */
  set "hand_ejaculation"(v) {
    era['raw']().data['tflag'][1] = v;
  },
  /**
   * 性交射精
   * @returns {number}
   */
  get "vaginal_ejaculation"() {
    return era['raw']().data['tflag'][2];
  },
  /**
   * 性交射精
   * @param {number} v
   */
  set "vaginal_ejaculation"(v) {
    era['raw']().data['tflag'][2] = v;
  },
  /**
   * 处女丧失
   * @returns {number}
   */
  get "virginity_lost"() {
    return era['raw']().data['tflag'][3];
  },
  /**
   * 处女丧失
   * @param {number} v
   */
  set "virginity_lost"(v) {
    era['raw']().data['tflag'][3] = v;
  },
  /**
   * 接吻射精
   * @returns {number}
   */
  get "kiss_ejaculation"() {
    return era['raw']().data['tflag'][4];
  },
  /**
   * 接吻射精
   * @param {number} v
   */
  set "kiss_ejaculation"(v) {
    era['raw']().data['tflag'][4] = v;
  },
  /**
   * 舔阴射精
   * @returns {number}
   */
  get "cunnilingus_ejaculation"() {
    return era['raw']().data['tflag'][5];
  },
  /**
   * 舔阴射精
   * @param {number} v
   */
  set "cunnilingus_ejaculation"(v) {
    era['raw']().data['tflag'][5] = v;
  },
  /**
   * 助手射精
   * @returns {number}
   */
  get "assistant_ejaculation"() {
    return era['raw']().data['tflag'][6];
  },
  /**
   * 助手射精
   * @param {number} v
   */
  set "assistant_ejaculation"(v) {
    era['raw']().data['tflag'][6] = v;
  },
  /**
   * 主人犯助手射精
   * @returns {number}
   */
  get "master_assistant_ejaculation"() {
    return era['raw']().data['tflag'][7];
  },
  /**
   * 主人犯助手射精
   * @param {number} v
   */
  set "master_assistant_ejaculation"(v) {
    era['raw']().data['tflag'][7] = v;
  },
  /**
   * 口交射精后
   * @returns {number}
   */
  get "after_oral_ejaculation"() {
    return era['raw']().data['tflag'][8];
  },
  /**
   * 口交射精后
   * @param {number} v
   */
  set "after_oral_ejaculation"(v) {
    era['raw']().data['tflag'][8] = v;
  },
  /**
   * 股间射精
   * @returns {number}
   */
  get "intercrural_ejaculation"() {
    return era['raw']().data['tflag'][9];
  },
  /**
   * 股间射精
   * @param {number} v
   */
  set "intercrural_ejaculation"(v) {
    era['raw']().data['tflag'][9] = v;
  },
  /**
   * 对象射精
   * @returns {number}
   */
  get "target_ejaculation"() {
    return era['raw']().data['tflag'][10];
  },
  /**
   * 对象射精
   * @param {number} v
   */
  set "target_ejaculation"(v) {
    era['raw']().data['tflag'][10] = v;
  },
  /**
   * 对象喷乳
   * @returns {number}
   */
  get "target_lactation"() {
    return era['raw']().data['tflag'][11];
  },
  /**
   * 对象喷乳
   * @param {number} v
   */
  set "target_lactation"(v) {
    era['raw']().data['tflag'][11] = v;
  },
  /**
   * 逆强奸射精
   * @returns {number}
   */
  get "reverse_rape_ejaculation"() {
    return era['raw']().data['tflag'][12];
  },
  /**
   * 逆强奸射精
   * @param {number} v
   */
  set "reverse_rape_ejaculation"(v) {
    era['raw']().data['tflag'][12] = v;
  },
  /**
   * 初吻与自我口上
   * @returns {number}
   */
  get "first_kiss_event"() {
    return era['raw']().data['tflag'][13];
  },
  /**
   * 初吻与自我口上
   * @param {number} v
   */
  set "first_kiss_event"(v) {
    era['raw']().data['tflag'][13] = v;
  },
  /**
   * 近亲与自我口上
   * @returns {number}
   */
  get "incest_event"() {
    return era['raw']().data['tflag'][14];
  },
  /**
   * 近亲与自我口上
   * @param {number} v
   */
  set "incest_event"(v) {
    era['raw']().data['tflag'][14] = v;
  },
  /**
   * 怪物射精或购入金
   * @returns {number}
   */
  get "monster_ejaculation"() {
    return era['raw']().data['tflag'][15];
  },
  /**
   * 怪物射精或购入金
   * @param {number} v
   */
  set "monster_ejaculation"(v) {
    era['raw']().data['tflag'][15] = v;
  },
  /**
   * 犬射精或处刑口上
   * @returns {number}
   */
  get "dog_ejaculation"() {
    return era['raw']().data['tflag'][16];
  },
  /**
   * 犬射精或处刑口上
   * @param {number} v
   */
  set "dog_ejaculation"(v) {
    era['raw']().data['tflag'][16] = v;
  },
  /**
   * 童贞丧失_未使用
   * @returns {number}
   */
  get "male_virginity_lost"() {
    return era['raw']().data['tflag'][17];
  },
  /**
   * 童贞丧失_未使用
   * @param {number} v
   */
  set "male_virginity_lost"(v) {
    era['raw']().data['tflag'][17] = v;
  },
  /**
   * 足交射精或处遇口上
   * @returns {number}
   */
  get "footjob_ejaculation"() {
    return era['raw']().data['tflag'][18];
  },
  /**
   * 足交射精或处遇口上
   * @param {number} v
   */
  set "footjob_ejaculation"(v) {
    era['raw']().data['tflag'][18] = v;
  },
  /**
   * 伴v经验指令
   * @returns {number}
   */
  get "virgin_experience_order"() {
    return era['raw']().data['tflag'][19];
  },
  /**
   * 伴v经验指令
   * @param {number} v
   */
  set "virgin_experience_order"(v) {
    era['raw']().data['tflag'][19] = v;
  },
  /**
   * 主人导致处女丧失
   * @returns {number}
   */
  get "master_virginity_lost"() {
    return era['raw']().data['tflag'][20];
  },
  /**
   * 主人导致处女丧失
   * @param {number} v
   */
  set "master_virginity_lost"(v) {
    era['raw']().data['tflag'][20] = v;
  },
  /**
   * 反抗刻印变动
   * @returns {number}
   */
  get "resistance_mark_change"() {
    return era['raw']().data['tflag'][21];
  },
  /**
   * 反抗刻印变动
   * @param {number} v
   */
  set "resistance_mark_change"(v) {
    era['raw']().data['tflag'][21] = v;
  },
  /**
   * 苦痛刻印变动
   * @returns {number}
   */
  get "pain_mark_change"() {
    return era['raw']().data['tflag'][22];
  },
  /**
   * 苦痛刻印变动
   * @param {number} v
   */
  set "pain_mark_change"(v) {
    era['raw']().data['tflag'][22] = v;
  },
  /**
   * 快乐刻印变动
   * @returns {number}
   */
  get "pleasure_mark_change"() {
    return era['raw']().data['tflag'][23];
  },
  /**
   * 快乐刻印变动
   * @param {number} v
   */
  set "pleasure_mark_change"(v) {
    era['raw']().data['tflag'][23] = v;
  },
  /**
   * 屈服刻印变动
   * @returns {number}
   */
  get "submission_mark_change"() {
    return era['raw']().data['tflag'][24];
  },
  /**
   * 屈服刻印变动
   * @param {number} v
   */
  set "submission_mark_change"(v) {
    era['raw']().data['tflag'][24] = v;
  },
  /**
   * 压抑抵抗消灭
   * @returns {number}
   */
  get "resistance_erased"() {
    return era['raw']().data['tflag'][25];
  },
  /**
   * 压抑抵抗消灭
   * @param {number} v
   */
  set "resistance_erased"(v) {
    era['raw']().data['tflag'][25] = v;
  },
  /**
   * 侍奉快乐经验
   * @returns {number}
   */
  get "service_pleasure_gain"() {
    return era['raw']().data['tflag'][26];
  },
  /**
   * 侍奉快乐经验
   * @param {number} v
   */
  set "service_pleasure_gain"(v) {
    era['raw']().data['tflag'][26] = v;
  },
  /**
   * 被虐快乐经验
   * @returns {number}
   */
  get "masochism_pleasure_gain"() {
    return era['raw']().data['tflag'][27];
  },
  /**
   * 被虐快乐经验
   * @param {number} v
   */
  set "masochism_pleasure_gain"(v) {
    era['raw']().data['tflag'][27] = v;
  },
  /**
   * a快乐经验
   * @returns {number}
   */
  get "anal_pleasure_gain"() {
    return era['raw']().data['tflag'][28];
  },
  /**
   * a快乐经验
   * @param {number} v
   */
  set "anal_pleasure_gain"(v) {
    era['raw']().data['tflag'][28] = v;
  },
  /**
   * 绝顶强度
   * @returns {number}
   */
  get "orgasm_level"() {
    return era['raw']().data['tflag'][29];
  },
  /**
   * 绝顶强度
   * @param {number} v
   */
  set "orgasm_level"(v) {
    era['raw']().data['tflag'][29] = v;
  },
  /**
   * 主人经验
   * @returns {number}
   */
  get "master_experience"() {
    return era['raw']().data['tflag'][30];
  },
  /**
   * 主人经验
   * @param {number} v
   */
  set "master_experience"(v) {
    era['raw']().data['tflag'][30] = v;
  },
  /**
   * 本次调教处女丧失
   * @returns {number}
   */
  get "current_train_virginity_lost"() {
    return era['raw']().data['tflag'][31];
  },
  /**
   * 本次调教处女丧失
   * @param {number} v
   */
  set "current_train_virginity_lost"(v) {
    era['raw']().data['tflag'][31] = v;
  },
  /**
   * 录像内容
   * @returns {number}
   */
  get "video_content"() {
    return era['raw']().data['tflag'][32];
  },
  /**
   * 录像内容
   * @param {number} v
   */
  set "video_content"(v) {
    era['raw']().data['tflag'][32] = v;
  },
  /**
   * 死亡时在录像
   * @returns {number}
   */
  get "died_on_video"() {
    return era['raw']().data['tflag'][34];
  },
  /**
   * 死亡时在录像
   * @param {number} v
   */
  set "died_on_video"(v) {
    era['raw']().data['tflag'][34] = v;
  },
  /**
   * 榨乳中
   * @returns {number}
   */
  get "milking"() {
    return era['raw']().data['tflag'][35];
  },
  /**
   * 榨乳中
   * @param {number} v
   */
  set "milking"(v) {
    era['raw']().data['tflag'][35] = v;
  },
  /**
   * 对象膣内射精
   * @returns {number}
   */
  get "target_vaginal_ejaculation"() {
    return era['raw']().data['tflag'][38];
  },
  /**
   * 对象膣内射精
   * @param {number} v
   */
  set "target_vaginal_ejaculation"(v) {
    era['raw']().data['tflag'][38] = v;
  },
  /**
   * 三人play主人部位
   * @returns {number}
   */
  get "threesome_master_part"() {
    return era['raw']().data['tflag'][40];
  },
  /**
   * 三人play主人部位
   * @param {number} v
   */
  set "threesome_master_part"(v) {
    era['raw']().data['tflag'][40] = v;
  },
  /**
   * 三人play助手部位
   * @returns {number}
   */
  get "threesome_assistant_part"() {
    return era['raw']().data['tflag'][41];
  },
  /**
   * 三人play助手部位
   * @param {number} v
   */
  set "threesome_assistant_part"(v) {
    era['raw']().data['tflag'][41] = v;
  },
  /**
   * 三人play持续
   * @returns {number}
   */
  get "threesome_continues"() {
    return era['raw']().data['tflag'][42];
  },
  /**
   * 三人play持续
   * @param {number} v
   */
  set "threesome_continues"(v) {
    era['raw']().data['tflag'][42] = v;
  },
  /**
   * 下装穿不上
   * @returns {number}
   */
  get "bottoms_do_not_fit"() {
    return era['raw']().data['tflag'][45];
  },
  /**
   * 下装穿不上
   * @param {number} v
   */
  set "bottoms_do_not_fit"(v) {
    era['raw']().data['tflag'][45] = v;
  },
  /**
   * 上次调教者是助手
   * @returns {number}
   */
  get "last_target_was_assistant"() {
    return era['raw']().data['tflag'][50];
  },
  /**
   * 上次调教者是助手
   * @param {number} v
   */
  set "last_target_was_assistant"(v) {
    era['raw']().data['tflag'][50] = v;
  },
  /**
   * 珠结算_0
   * @returns {number}
   */
  get "juel_settle_0"() {
    return era['raw']().data['tflag'][51];
  },
  /**
   * 珠结算_0
   * @param {number} v
   */
  set "juel_settle_0"(v) {
    era['raw']().data['tflag'][51] = v;
  },
  /**
   * 珠结算_1
   * @returns {number}
   */
  get "juel_settle_1"() {
    return era['raw']().data['tflag'][52];
  },
  /**
   * 珠结算_1
   * @param {number} v
   */
  set "juel_settle_1"(v) {
    era['raw']().data['tflag'][52] = v;
  },
  /**
   * 珠结算_2
   * @returns {number}
   */
  get "juel_settle_2"() {
    return era['raw']().data['tflag'][53];
  },
  /**
   * 珠结算_2
   * @param {number} v
   */
  set "juel_settle_2"(v) {
    era['raw']().data['tflag'][53] = v;
  },
  /**
   * 珠结算_3
   * @returns {number}
   */
  get "juel_settle_3"() {
    return era['raw']().data['tflag'][54];
  },
  /**
   * 珠结算_3
   * @param {number} v
   */
  set "juel_settle_3"(v) {
    era['raw']().data['tflag'][54] = v;
  },
  /**
   * 珠结算_4
   * @returns {number}
   */
  get "juel_settle_4"() {
    return era['raw']().data['tflag'][55];
  },
  /**
   * 珠结算_4
   * @param {number} v
   */
  set "juel_settle_4"(v) {
    era['raw']().data['tflag'][55] = v;
  },
  /**
   * 珠结算_5
   * @returns {number}
   */
  get "juel_settle_5"() {
    return era['raw']().data['tflag'][56];
  },
  /**
   * 珠结算_5
   * @param {number} v
   */
  set "juel_settle_5"(v) {
    era['raw']().data['tflag'][56] = v;
  },
  /**
   * 珠结算_6
   * @returns {number}
   */
  get "juel_settle_6"() {
    return era['raw']().data['tflag'][57];
  },
  /**
   * 珠结算_6
   * @param {number} v
   */
  set "juel_settle_6"(v) {
    era['raw']().data['tflag'][57] = v;
  },
  /**
   * 珠结算_7
   * @returns {number}
   */
  get "juel_settle_7"() {
    return era['raw']().data['tflag'][58];
  },
  /**
   * 珠结算_7
   * @param {number} v
   */
  set "juel_settle_7"(v) {
    era['raw']().data['tflag'][58] = v;
  },
  /**
   * 前前回指令
   * @returns {number}
   */
  get "prev_prev_order"() {
    return era['raw']().data['tflag'][59];
  },
  /**
   * 前前回指令
   * @param {number} v
   */
  set "prev_prev_order"(v) {
    era['raw']().data['tflag'][59] = v;
  },
  /**
   * 插着不拔
   * @returns {number}
   */
  get "inserted_stays"() {
    return era['raw']().data['tflag'][60];
  },
  /**
   * 插着不拔
   * @param {number} v
   */
  set "inserted_stays"(v) {
    era['raw']().data['tflag'][60] = v;
  },
  /**
   * 录像次数
   * @returns {number}
   */
  get "video_count"() {
    return era['raw']().data['tflag'][70];
  },
  /**
   * 录像次数
   * @param {number} v
   */
  set "video_count"(v) {
    era['raw']().data['tflag'][70] = v;
  },
  /**
   * 快乐经验
   * @returns {number}
   */
  get "pleasure_experience"() {
    return era['raw']().data['tflag'][100];
  },
  /**
   * 快乐经验
   * @param {number} v
   */
  set "pleasure_experience"(v) {
    era['raw']().data['tflag'][100] = v;
  },
  /**
   * 召唤暂存_1
   * @returns {number}
   */
  get "summon_buffer_1"() {
    return era['raw']().data['tflag'][101];
  },
  /**
   * 召唤暂存_1
   * @param {number} v
   */
  set "summon_buffer_1"(v) {
    era['raw']().data['tflag'][101] = v;
  },
  /**
   * 召唤暂存_2
   * @returns {number}
   */
  get "summon_buffer_2"() {
    return era['raw']().data['tflag'][102];
  },
  /**
   * 召唤暂存_2
   * @param {number} v
   */
  set "summon_buffer_2"(v) {
    era['raw']().data['tflag'][102] = v;
  },
  /**
   * 精爱味觉
   * @returns {number}
   */
  get "semen_taste"() {
    return era['raw']().data['tflag'][110];
  },
  /**
   * 精爱味觉
   * @param {number} v
   */
  set "semen_taste"(v) {
    era['raw']().data['tflag'][110] = v;
  },
  /**
   * v虫产卵
   * @returns {number}
   */
  get "vaginal_worm_spawn"() {
    return era['raw']().data['tflag'][120];
  },
  /**
   * v虫产卵
   * @param {number} v
   */
  set "vaginal_worm_spawn"(v) {
    era['raw']().data['tflag'][120] = v;
  },
  /**
   * a虫产卵
   * @returns {number}
   */
  get "anal_worm_spawn"() {
    return era['raw']().data['tflag'][121];
  },
  /**
   * a虫产卵
   * @param {number} v
   */
  set "anal_worm_spawn"(v) {
    era['raw']().data['tflag'][121] = v;
  },
  /**
   * 反抗刻印回避
   * @returns {number}
   */
  get "resistance_mark_avoid"() {
    return era['raw']().data['tflag'][150];
  },
  /**
   * 反抗刻印回避
   * @param {number} v
   */
  set "resistance_mark_avoid"(v) {
    era['raw']().data['tflag'][150] = v;
  },
  /**
   * 屈服刻印结算
   * @returns {number}
   */
  get "submission_mark_settle"() {
    return era['raw']().data['tflag'][200];
  },
  /**
   * 屈服刻印结算
   * @param {number} v
   */
  set "submission_mark_settle"(v) {
    era['raw']().data['tflag'][200] = v;
  },
  /**
   * 当前选择的调教指令编号
   * @returns {number}
   */
  get "selected_order_no"() {
    return era['raw']().data['tflag'][204];
  },
  /**
   * 当前选择的调教指令编号
   * @param {number} v
   */
  set "selected_order_no"(v) {
    era['raw']().data['tflag'][204] = v;
  },
  /**
   * 索求口上抑制
   * @returns {number}
   */
  get "begging_kojo_suppressed"() {
    return era['raw']().data['tflag'][224];
  },
  /**
   * 索求口上抑制
   * @param {number} v
   */
  set "begging_kojo_suppressed"(v) {
    era['raw']().data['tflag'][224] = v;
  },
  /**
   * 死斗场敌种
   * @returns {number}
   */
  get "colosseum_enemy_type"() {
    return era['raw']().data['tflag'][400];
  },
  /**
   * 死斗场敌种
   * @param {number} v
   */
  set "colosseum_enemy_type"(v) {
    era['raw']().data['tflag'][400] = v;
  },
  /**
   * 死斗场陷落
   * @returns {number}
   */
  get "colosseum_lost"() {
    return era['raw']().data['tflag'][401];
  },
  /**
   * 死斗场陷落
   * @param {number} v
   */
  set "colosseum_lost"(v) {
    era['raw']().data['tflag'][401] = v;
  },
  /**
   * 死斗场收入
   * @returns {number}
   */
  get "colosseum_income"() {
    return era['raw']().data['tflag'][402];
  },
  /**
   * 死斗场收入
   * @param {number} v
   */
  set "colosseum_income"(v) {
    era['raw']().data['tflag'][402] = v;
  },
  /**
   * 博物馆口上
   * @returns {number}
   */
  get "museum_kojo"() {
    return era['raw']().data['tflag'][500];
  },
  /**
   * 博物馆口上
   * @param {number} v
   */
  set "museum_kojo"(v) {
    era['raw']().data['tflag'][500] = v;
  },
  /**
   * 流放口上
   * @returns {number}
   */
  get "exile_kojo"() {
    return era['raw']().data['tflag'][510];
  },
  /**
   * 流放口上
   * @param {number} v
   */
  set "exile_kojo"(v) {
    era['raw']().data['tflag'][510] = v;
  },
  /**
   * 公开处刑口上
   * @returns {number}
   */
  get "public_execution_kojo"() {
    return era['raw']().data['tflag'][520];
  },
  /**
   * 公开处刑口上
   * @param {number} v
   */
  set "public_execution_kojo"(v) {
    era['raw']().data['tflag'][520] = v;
  },
  /**
   * 猎奇处刑口上
   * @returns {number}
   */
  get "grotesque_execution_kojo"() {
    return era['raw']().data['tflag'][530];
  },
  /**
   * 猎奇处刑口上
   * @param {number} v
   */
  set "grotesque_execution_kojo"(v) {
    era['raw']().data['tflag'][530] = v;
  },
  /**
   * 失神口上开关
   * @returns {number}
   */
  get "passout_kojo_switch"() {
    return era['raw']().data['tflag'][860];
  },
  /**
   * 失神口上开关
   * @param {number} v
   */
  set "passout_kojo_switch"(v) {
    era['raw']().data['tflag'][860] = v;
  },
  /**
   * 失神_864
   * @returns {number}
   */
  get "passout_snapshot_864"() {
    return era['raw']().data['tflag'][864];
  },
  /**
   * 失神_864
   * @param {number} v
   */
  set "passout_snapshot_864"(v) {
    era['raw']().data['tflag'][864] = v;
  },
  /**
   * 失神_865
   * @returns {number}
   */
  get "passout_snapshot_865"() {
    return era['raw']().data['tflag'][865];
  },
  /**
   * 失神_865
   * @param {number} v
   */
  set "passout_snapshot_865"(v) {
    era['raw']().data['tflag'][865] = v;
  },
  /**
   * 失神_866
   * @returns {number}
   */
  get "passout_snapshot_866"() {
    return era['raw']().data['tflag'][866];
  },
  /**
   * 失神_866
   * @param {number} v
   */
  set "passout_snapshot_866"(v) {
    era['raw']().data['tflag'][866] = v;
  },
  /**
   * 失神_867
   * @returns {number}
   */
  get "passout_snapshot_867"() {
    return era['raw']().data['tflag'][867];
  },
  /**
   * 失神_867
   * @param {number} v
   */
  set "passout_snapshot_867"(v) {
    era['raw']().data['tflag'][867] = v;
  },
  /**
   * 失神_868
   * @returns {number}
   */
  get "passout_snapshot_868"() {
    return era['raw']().data['tflag'][868];
  },
  /**
   * 失神_868
   * @param {number} v
   */
  set "passout_snapshot_868"(v) {
    era['raw']().data['tflag'][868] = v;
  },
  /**
   * 失神_869
   * @returns {number}
   */
  get "passout_snapshot_869"() {
    return era['raw']().data['tflag'][869];
  },
  /**
   * 失神_869
   * @param {number} v
   */
  set "passout_snapshot_869"(v) {
    era['raw']().data['tflag'][869] = v;
  },
  /**
   * 失神_870
   * @returns {number}
   */
  get "passout_snapshot_870"() {
    return era['raw']().data['tflag'][870];
  },
  /**
   * 失神_870
   * @param {number} v
   */
  set "passout_snapshot_870"(v) {
    era['raw']().data['tflag'][870] = v;
  },
  /**
   * 失神_871
   * @returns {number}
   */
  get "passout_snapshot_871"() {
    return era['raw']().data['tflag'][871];
  },
  /**
   * 失神_871
   * @param {number} v
   */
  set "passout_snapshot_871"(v) {
    era['raw']().data['tflag'][871] = v;
  },
  /**
   * 失神_872
   * @returns {number}
   */
  get "passout_snapshot_872"() {
    return era['raw']().data['tflag'][872];
  },
  /**
   * 失神_872
   * @param {number} v
   */
  set "passout_snapshot_872"(v) {
    era['raw']().data['tflag'][872] = v;
  },
  /**
   * 失神_873
   * @returns {number}
   */
  get "passout_snapshot_873"() {
    return era['raw']().data['tflag'][873];
  },
  /**
   * 失神_873
   * @param {number} v
   */
  set "passout_snapshot_873"(v) {
    era['raw']().data['tflag'][873] = v;
  },
  /**
   * 失神_874
   * @returns {number}
   */
  get "passout_snapshot_874"() {
    return era['raw']().data['tflag'][874];
  },
  /**
   * 失神_874
   * @param {number} v
   */
  set "passout_snapshot_874"(v) {
    era['raw']().data['tflag'][874] = v;
  },
  /**
   * 失神_875
   * @returns {number}
   */
  get "passout_snapshot_875"() {
    return era['raw']().data['tflag'][875];
  },
  /**
   * 失神_875
   * @param {number} v
   */
  set "passout_snapshot_875"(v) {
    era['raw']().data['tflag'][875] = v;
  },
  /**
   * 失神_876
   * @returns {number}
   */
  get "passout_snapshot_876"() {
    return era['raw']().data['tflag'][876];
  },
  /**
   * 失神_876
   * @param {number} v
   */
  set "passout_snapshot_876"(v) {
    era['raw']().data['tflag'][876] = v;
  },
  /**
   * 失神_877
   * @returns {number}
   */
  get "passout_snapshot_877"() {
    return era['raw']().data['tflag'][877];
  },
  /**
   * 失神_877
   * @param {number} v
   */
  set "passout_snapshot_877"(v) {
    era['raw']().data['tflag'][877] = v;
  },
  /**
   * 失神_878
   * @returns {number}
   */
  get "passout_snapshot_878"() {
    return era['raw']().data['tflag'][878];
  },
  /**
   * 失神_878
   * @param {number} v
   */
  set "passout_snapshot_878"(v) {
    era['raw']().data['tflag'][878] = v;
  },
  /**
   * 失神_879
   * @returns {number}
   */
  get "passout_snapshot_879"() {
    return era['raw']().data['tflag'][879];
  },
  /**
   * 失神_879
   * @param {number} v
   */
  set "passout_snapshot_879"(v) {
    era['raw']().data['tflag'][879] = v;
  },
  /**
   * 失神_880
   * @returns {number}
   */
  get "passout_snapshot_880"() {
    return era['raw']().data['tflag'][880];
  },
  /**
   * 失神_880
   * @param {number} v
   */
  set "passout_snapshot_880"(v) {
    era['raw']().data['tflag'][880] = v;
  },
  /**
   * 失神_881
   * @returns {number}
   */
  get "passout_snapshot_881"() {
    return era['raw']().data['tflag'][881];
  },
  /**
   * 失神_881
   * @param {number} v
   */
  set "passout_snapshot_881"(v) {
    era['raw']().data['tflag'][881] = v;
  },
  /**
   * 失神_882
   * @returns {number}
   */
  get "passout_snapshot_882"() {
    return era['raw']().data['tflag'][882];
  },
  /**
   * 失神_882
   * @param {number} v
   */
  set "passout_snapshot_882"(v) {
    era['raw']().data['tflag'][882] = v;
  },
  /**
   * 失神_883
   * @returns {number}
   */
  get "passout_snapshot_883"() {
    return era['raw']().data['tflag'][883];
  },
  /**
   * 失神_883
   * @param {number} v
   */
  set "passout_snapshot_883"(v) {
    era['raw']().data['tflag'][883] = v;
  },
  /**
   * 失神_884
   * @returns {number}
   */
  get "passout_snapshot_884"() {
    return era['raw']().data['tflag'][884];
  },
  /**
   * 失神_884
   * @param {number} v
   */
  set "passout_snapshot_884"(v) {
    era['raw']().data['tflag'][884] = v;
  },
  /**
   * 失神_885
   * @returns {number}
   */
  get "passout_snapshot_885"() {
    return era['raw']().data['tflag'][885];
  },
  /**
   * 失神_885
   * @param {number} v
   */
  set "passout_snapshot_885"(v) {
    era['raw']().data['tflag'][885] = v;
  },
  /**
   * 失神_886
   * @returns {number}
   */
  get "passout_snapshot_886"() {
    return era['raw']().data['tflag'][886];
  },
  /**
   * 失神_886
   * @param {number} v
   */
  set "passout_snapshot_886"(v) {
    era['raw']().data['tflag'][886] = v;
  },
  /**
   * 失神_887
   * @returns {number}
   */
  get "passout_snapshot_887"() {
    return era['raw']().data['tflag'][887];
  },
  /**
   * 失神_887
   * @param {number} v
   */
  set "passout_snapshot_887"(v) {
    era['raw']().data['tflag'][887] = v;
  },
  /**
   * 失神_888
   * @returns {number}
   */
  get "passout_snapshot_888"() {
    return era['raw']().data['tflag'][888];
  },
  /**
   * 失神_888
   * @param {number} v
   */
  set "passout_snapshot_888"(v) {
    era['raw']().data['tflag'][888] = v;
  },
  /**
   * 失神_889
   * @returns {number}
   */
  get "passout_snapshot_889"() {
    return era['raw']().data['tflag'][889];
  },
  /**
   * 失神_889
   * @param {number} v
   */
  set "passout_snapshot_889"(v) {
    era['raw']().data['tflag'][889] = v;
  },
  /**
   * 失神_890
   * @returns {number}
   */
  get "passout_snapshot_890"() {
    return era['raw']().data['tflag'][890];
  },
  /**
   * 失神_890
   * @param {number} v
   */
  set "passout_snapshot_890"(v) {
    era['raw']().data['tflag'][890] = v;
  },
  /**
   * 失神_891
   * @returns {number}
   */
  get "passout_snapshot_891"() {
    return era['raw']().data['tflag'][891];
  },
  /**
   * 失神_891
   * @param {number} v
   */
  set "passout_snapshot_891"(v) {
    era['raw']().data['tflag'][891] = v;
  },
  /**
   * 失神_892
   * @returns {number}
   */
  get "passout_snapshot_892"() {
    return era['raw']().data['tflag'][892];
  },
  /**
   * 失神_892
   * @param {number} v
   */
  set "passout_snapshot_892"(v) {
    era['raw']().data['tflag'][892] = v;
  },
  /**
   * 失神_893
   * @returns {number}
   */
  get "passout_snapshot_893"() {
    return era['raw']().data['tflag'][893];
  },
  /**
   * 失神_893
   * @param {number} v
   */
  set "passout_snapshot_893"(v) {
    era['raw']().data['tflag'][893] = v;
  },
  /**
   * 失神_894
   * @returns {number}
   */
  get "passout_snapshot_894"() {
    return era['raw']().data['tflag'][894];
  },
  /**
   * 失神_894
   * @param {number} v
   */
  set "passout_snapshot_894"(v) {
    era['raw']().data['tflag'][894] = v;
  },
  /**
   * 失神_895
   * @returns {number}
   */
  get "passout_snapshot_895"() {
    return era['raw']().data['tflag'][895];
  },
  /**
   * 失神_895
   * @param {number} v
   */
  set "passout_snapshot_895"(v) {
    era['raw']().data['tflag'][895] = v;
  },
  /**
   * 失神_896
   * @returns {number}
   */
  get "passout_snapshot_896"() {
    return era['raw']().data['tflag'][896];
  },
  /**
   * 失神_896
   * @param {number} v
   */
  set "passout_snapshot_896"(v) {
    era['raw']().data['tflag'][896] = v;
  },
  /**
   * 失神_897
   * @returns {number}
   */
  get "passout_snapshot_897"() {
    return era['raw']().data['tflag'][897];
  },
  /**
   * 失神_897
   * @param {number} v
   */
  set "passout_snapshot_897"(v) {
    era['raw']().data['tflag'][897] = v;
  },
  /**
   * 失神_898
   * @returns {number}
   */
  get "passout_snapshot_898"() {
    return era['raw']().data['tflag'][898];
  },
  /**
   * 失神_898
   * @param {number} v
   */
  set "passout_snapshot_898"(v) {
    era['raw']().data['tflag'][898] = v;
  },
  /**
   * 失神
   * @returns {number}
   */
  get "passout"() {
    return era['raw']().data['tflag'][899];
  },
  /**
   * 失神
   * @param {number} v
   */
  set "passout"(v) {
    era['raw']().data['tflag'][899] = v;
  },
  get,
  /**
   * @param {number|string} param
   * @param {number} val
   * @returns {number}
   */
  set(param, val) {
    return era.set(`tflag:${param}`, val);
  },
  /**
   * @param {number|string} param
   * @param {number} val
   * @returns {number}
   */
  add(param, val) {
    return era.set(`tflag:${param}`, get(param) + val);
  },
};

module.exports = era_tflag;
// GENERATED END