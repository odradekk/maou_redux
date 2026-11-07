// GENERATED START
const era = require('#/era-electron');

/**
 * @param {number|string} param
 * @returns {number}
 */
function get(param) {
  return era.get(`flag:${param}`) || 0;
}

const era_flag = {
  /**
   * 休息
   * @returns {number}
   */
  get "rest"() {
    return era['raw']().data['flag'][0];
  },
  /**
   * 休息
   * @param {number} v
   */
  set "rest"(v) {
    era['raw']().data['flag'][0] = v;
  },
  /**
   * 上次调教对象
   * @returns {number}
   */
  get "last_train_target"() {
    return era['raw']().data['flag'][1];
  },
  /**
   * 上次调教对象
   * @param {number} v
   */
  set "last_train_target"(v) {
    era['raw']().data['flag'][1] = v;
  },
  /**
   * 上次助手
   * @returns {number}
   */
  get "last_assistant"() {
    return era['raw']().data['flag'][2];
  },
  /**
   * 上次助手
   * @param {number} v
   */
  set "last_assistant"(v) {
    era['raw']().data['flag'][2] = v;
  },
  /**
   * 游戏设定
   * @returns {number}
   */
  get "game_settings"() {
    return era['raw']().data['flag'][5];
  },
  /**
   * 游戏设定
   * @param {number} v
   */
  set "game_settings"(v) {
    era['raw']().data['flag'][5] = v;
  },
  /**
   * 调教文本省略
   * @returns {number}
   */
  get "train_text_omitted"() {
    return era['raw']().data['flag'][6];
  },
  /**
   * 调教文本省略
   * @param {number} v
   */
  set "train_text_omitted"(v) {
    era['raw']().data['flag'][6] = v;
  },
  /**
   * 口上开关
   * @returns {number}
   */
  get "kojo_switch"() {
    return era['raw']().data['flag'][7];
  },
  /**
   * 口上开关
   * @param {number} v
   */
  set "kojo_switch"(v) {
    era['raw']().data['flag'][7] = v;
  },
  /**
   * 勇者相关杂项开关
   * @returns {number}
   */
  get "adventurer_flags"() {
    return era['raw']().data['flag'][8];
  },
  /**
   * 勇者相关杂项开关
   * @param {number} v
   */
  set "adventurer_flags"(v) {
    era['raw']().data['flag'][8] = v;
  },
  /**
   * 特别税加成
   * @returns {number}
   */
  get "tax_surcharge"() {
    return era['raw']().data['flag'][9];
  },
  /**
   * 特别税加成
   * @param {number} v
   */
  set "tax_surcharge"(v) {
    era['raw']().data['flag'][9] = v;
  },
  /**
   * 录像开始状况
   * @returns {number}
   */
  get "video_start_state"() {
    return era['raw']().data['flag'][22];
  },
  /**
   * 录像开始状况
   * @param {number} v
   */
  set "video_start_state"(v) {
    era['raw']().data['flag'][22] = v;
  },
  /**
   * 指令过滤
   * @returns {number}
   */
  get "order_filter"() {
    return era['raw']().data['flag'][25];
  },
  /**
   * 指令过滤
   * @param {number} v
   */
  set "order_filter"(v) {
    era['raw']().data['flag'][25] = v;
  },
  /**
   * 种族年龄设定_0
   * @returns {number}
   */
  get "race_age_setting_0"() {
    return era['raw']().data['flag'][26];
  },
  /**
   * 种族年龄设定_0
   * @param {number} v
   */
  set "race_age_setting_0"(v) {
    era['raw']().data['flag'][26] = v;
  },
  /**
   * 种族年龄设定_1
   * @returns {number}
   */
  get "race_age_setting_1"() {
    return era['raw']().data['flag'][27];
  },
  /**
   * 种族年龄设定_1
   * @param {number} v
   */
  set "race_age_setting_1"(v) {
    era['raw']().data['flag'][27] = v;
  },
  /**
   * 爱或淫乱人数
   * @returns {number}
   */
  get "love_or_lewd_count"() {
    return era['raw']().data['flag'][30];
  },
  /**
   * 爱或淫乱人数
   * @param {number} v
   */
  set "love_or_lewd_count"(v) {
    era['raw']().data['flag'][30] = v;
  },
  /**
   * 杀死人数
   * @returns {number}
   */
  get "kill_count"() {
    return era['raw']().data['flag'][31];
  },
  /**
   * 杀死人数
   * @param {number} v
   */
  set "kill_count"(v) {
    era['raw']().data['flag'][31] = v;
  },
  /**
   * 爱之奴隶所生
   * @returns {number}
   */
  get "born_of_love_slave"() {
    return era['raw']().data['flag'][32];
  },
  /**
   * 爱之奴隶所生
   * @param {number} v
   */
  set "born_of_love_slave"(v) {
    era['raw']().data['flag'][32] = v;
  },
  /**
   * 技巧素质道具数
   * @returns {number}
   */
  get "skill_talent_item_count"() {
    return era['raw']().data['flag'][33];
  },
  /**
   * 技巧素质道具数
   * @param {number} v
   */
  set "skill_talent_item_count"(v) {
    era['raw']().data['flag'][33] = v;
  },
  /**
   * 自动购买设定
   * @returns {number}
   */
  get "auto_buying_settings"() {
    return era['raw']().data['flag'][34];
  },
  /**
   * 自动购买设定
   * @param {number} v
   */
  set "auto_buying_settings"(v) {
    era['raw']().data['flag'][34] = v;
  },
  /**
   * 濒死自动结束调教
   * @returns {number}
   */
  get "auto_end_train_when_dying"() {
    return era['raw']().data['flag'][35];
  },
  /**
   * 濒死自动结束调教
   * @param {number} v
   */
  set "auto_end_train_when_dying"(v) {
    era['raw']().data['flag'][35] = v;
  },
  /**
   * 显示模式
   * @returns {number}
   */
  get "display_mode"() {
    return era['raw']().data['flag'][36];
  },
  /**
   * 显示模式
   * @param {number} v
   */
  set "display_mode"(v) {
    era['raw']().data['flag'][36] = v;
  },
  /**
   * 着衣系统
   * @returns {number}
   */
  get "clothing_system"() {
    return era['raw']().data['flag'][37];
  },
  /**
   * 着衣系统
   * @param {number} v
   */
  set "clothing_system"(v) {
    era['raw']().data['flag'][37] = v;
  },
  /**
   * 处女献上后续发生方式
   * @returns {number}
   */
  get "virgin_conceded_mode"() {
    return era['raw']().data['flag'][38];
  },
  /**
   * 处女献上后续发生方式
   * @param {number} v
   */
  set "virgin_conceded_mode"(v) {
    era['raw']().data['flag'][38] = v;
  },
  /**
   * 设施追加人数
   * @returns {number}
   */
  get "facility_headcount"() {
    return era['raw']().data['flag'][40];
  },
  /**
   * 设施追加人数
   * @param {number} v
   */
  set "facility_headcount"(v) {
    era['raw']().data['flag'][40] = v;
  },
  /**
   * 设施建造位
   * @returns {number}
   */
  get "facility_bitmap"() {
    return era['raw']().data['flag'][48];
  },
  /**
   * 设施建造位
   * @param {number} v
   */
  set "facility_bitmap"(v) {
    era['raw']().data['flag'][48] = v;
  },
  /**
   * 勇者基础等级修正
   * @returns {number}
   */
  get "hero_base_level_bonus"() {
    return era['raw']().data['flag'][60];
  },
  /**
   * 勇者基础等级修正
   * @param {number} v
   */
  set "hero_base_level_bonus"(v) {
    era['raw']().data['flag'][60] = v;
  },
  /**
   * 每日香料购买数
   * @returns {number}
   */
  get "daily_spice_purchase"() {
    return era['raw']().data['flag'][61];
  },
  /**
   * 每日香料购买数
   * @param {number} v
   */
  set "daily_spice_purchase"(v) {
    era['raw']().data['flag'][61] = v;
  },
  /**
   * 肉便器行动
   * @returns {number}
   */
  get "benki_behavior"() {
    return era['raw']().data['flag'][62];
  },
  /**
   * 肉便器行动
   * @param {number} v
   */
  set "benki_behavior"(v) {
    era['raw']().data['flag'][62] = v;
  },
  /**
   * 肉便器常识改写
   * @returns {number}
   */
  get "benki_common_sense"() {
    return era['raw']().data['flag'][63];
  },
  /**
   * 肉便器常识改写
   * @param {number} v
   */
  set "benki_common_sense"(v) {
    era['raw']().data['flag'][63] = v;
  },
  /**
   * 肉便器侍奉对象
   * @returns {number}
   */
  get "benki_service_target"() {
    return era['raw']().data['flag'][64];
  },
  /**
   * 肉便器侍奉对象
   * @param {number} v
   */
  set "benki_service_target"(v) {
    era['raw']().data['flag'][64] = v;
  },
  /**
   * 失神机能关闭
   * @returns {number}
   */
  get "passout_disabled"() {
    return era['raw']().data['flag'][70];
  },
  /**
   * 失神机能关闭
   * @param {number} v
   */
  set "passout_disabled"(v) {
    era['raw']().data['flag'][70] = v;
  },
  /**
   * 自由调教跳转
   * @returns {number}
   */
  get "free_train_jump"() {
    return era['raw']().data['flag'][71];
  },
  /**
   * 自由调教跳转
   * @param {number} v
   */
  set "free_train_jump"(v) {
    era['raw']().data['flag'][71] = v;
  },
  /**
   * 精饮机能关闭
   * @returns {number}
   */
  get "semen_drink_disabled"() {
    return era['raw']().data['flag'][72];
  },
  /**
   * 精饮机能关闭
   * @param {number} v
   */
  set "semen_drink_disabled"(v) {
    era['raw']().data['flag'][72] = v;
  },
  /**
   * 强化素质关闭
   * @returns {number}
   */
  get "super_talent_disabled"() {
    return era['raw']().data['flag'][73];
  },
  /**
   * 强化素质关闭
   * @param {number} v
   */
  set "super_talent_disabled"(v) {
    era['raw']().data['flag'][73] = v;
  },
  /**
   * 时常发情关闭
   * @returns {number}
   */
  get "always_aroused_disabled"() {
    return era['raw']().data['flag'][75];
  },
  /**
   * 时常发情关闭
   * @param {number} v
   */
  set "always_aroused_disabled"(v) {
    era['raw']().data['flag'][75] = v;
  },
  /**
   * 外来勇者等级上限
   * @returns {number}
   */
  get "foreign_hero_level_cap"() {
    return era['raw']().data['flag'][76];
  },
  /**
   * 外来勇者等级上限
   * @param {number} v
   */
  set "foreign_hero_level_cap"(v) {
    era['raw']().data['flag'][76] = v;
  },
  /**
   * 通信勇者登场压级
   * @returns {number}
   */
  get "communication_hero_level_one"() {
    return era['raw']().data['flag'][77];
  },
  /**
   * 通信勇者登场压级
   * @param {number} v
   */
  set "communication_hero_level_one"(v) {
    era['raw']().data['flag'][77] = v;
  },
  /**
   * 处刑勇者数
   * @returns {number}
   */
  get "executed_hero_count"() {
    return era['raw']().data['flag'][80];
  },
  /**
   * 处刑勇者数
   * @param {number} v
   */
  set "executed_hero_count"(v) {
    era['raw']().data['flag'][80] = v;
  },
  /**
   * 人间界侵攻度
   * @returns {number}
   */
  get "human_realm_invasion"() {
    return era['raw']().data['flag'][81];
  },
  /**
   * 人间界侵攻度
   * @param {number} v
   */
  set "human_realm_invasion"(v) {
    era['raw']().data['flag'][81] = v;
  },
  /**
   * 人间界陷落
   * @returns {number}
   */
  get "human_realm_fallen"() {
    return era['raw']().data['flag'][82];
  },
  /**
   * 人间界陷落
   * @param {number} v
   */
  set "human_realm_fallen"(v) {
    era['raw']().data['flag'][82] = v;
  },
  /**
   * 肉便器数
   * @returns {number}
   */
  get "meat_toilet_count"() {
    return era['raw']().data['flag'][83];
  },
  /**
   * 肉便器数
   * @param {number} v
   */
  set "meat_toilet_count"(v) {
    era['raw']().data['flag'][83] = v;
  },
  /**
   * 展品数
   * @returns {number}
   */
  get "exhibit_count"() {
    return era['raw']().data['flag'][84];
  },
  /**
   * 展品数
   * @param {number} v
   */
  set "exhibit_count"(v) {
    era['raw']().data['flag'][84] = v;
  },
  /**
   * 陷阱等级
   * @returns {number}
   */
  get "trap_level"() {
    return era['raw']().data['flag'][85];
  },
  /**
   * 陷阱等级
   * @param {number} v
   */
  set "trap_level"(v) {
    era['raw']().data['flag'][85] = v;
  },
  /**
   * 精灵领域侵攻度
   * @returns {number}
   */
  get "elf_realm_invasion"() {
    return era['raw']().data['flag'][86];
  },
  /**
   * 精灵领域侵攻度
   * @param {number} v
   */
  set "elf_realm_invasion"(v) {
    era['raw']().data['flag'][86] = v;
  },
  /**
   * 精灵领域征服
   * @returns {number}
   */
  get "elf_realm_conquered"() {
    return era['raw']().data['flag'][87];
  },
  /**
   * 精灵领域征服
   * @param {number} v
   */
  set "elf_realm_conquered"(v) {
    era['raw']().data['flag'][87] = v;
  },
  /**
   * 龙之山脉侵攻度
   * @returns {number}
   */
  get "dragon_realm_invasion"() {
    return era['raw']().data['flag'][88];
  },
  /**
   * 龙之山脉侵攻度
   * @param {number} v
   */
  set "dragon_realm_invasion"(v) {
    era['raw']().data['flag'][88] = v;
  },
  /**
   * 龙之山脉征服
   * @returns {number}
   */
  get "dragon_realm_conquered"() {
    return era['raw']().data['flag'][89];
  },
  /**
   * 龙之山脉征服
   * @param {number} v
   */
  set "dragon_realm_conquered"(v) {
    era['raw']().data['flag'][89] = v;
  },
  /**
   * 天界侵攻度
   * @returns {number}
   */
  get "heaven_invasion"() {
    return era['raw']().data['flag'][90];
  },
  /**
   * 天界侵攻度
   * @param {number} v
   */
  set "heaven_invasion"(v) {
    era['raw']().data['flag'][90] = v;
  },
  /**
   * 天界征服
   * @returns {number}
   */
  get "heaven_conquered"() {
    return era['raw']().data['flag'][91];
  },
  /**
   * 天界征服
   * @param {number} v
   */
  set "heaven_conquered"(v) {
    era['raw']().data['flag'][91] = v;
  },
  /**
   * 圣灵骑士堡垒攻略进度
   * @returns {number}
   */
  get "arcana_fort_stage"() {
    return era['raw']().data['flag'][92];
  },
  /**
   * 圣灵骑士堡垒攻略进度
   * @param {number} v
   */
  set "arcana_fort_stage"(v) {
    era['raw']().data['flag'][92] = v;
  },
  /**
   * 人间界侵略事件进度
   * @returns {number}
   */
  get "human_realm_event_stage"() {
    return era['raw']().data['flag'][93];
  },
  /**
   * 人间界侵略事件进度
   * @param {number} v
   */
  set "human_realm_event_stage"(v) {
    era['raw']().data['flag'][93] = v;
  },
  /**
   * 口上存在_0
   * @returns {number}
   */
  get "kojo_exists_0"() {
    return era['raw']().data['flag'][100];
  },
  /**
   * 口上存在_0
   * @param {number} v
   */
  set "kojo_exists_0"(v) {
    era['raw']().data['flag'][100] = v;
  },
  /**
   * 口上存在_1
   * @returns {number}
   */
  get "kojo_exists_1"() {
    return era['raw']().data['flag'][101];
  },
  /**
   * 口上存在_1
   * @param {number} v
   */
  set "kojo_exists_1"(v) {
    era['raw']().data['flag'][101] = v;
  },
  /**
   * 口上存在_2
   * @returns {number}
   */
  get "kojo_exists_2"() {
    return era['raw']().data['flag'][102];
  },
  /**
   * 口上存在_2
   * @param {number} v
   */
  set "kojo_exists_2"(v) {
    era['raw']().data['flag'][102] = v;
  },
  /**
   * 口上存在_3
   * @returns {number}
   */
  get "kojo_exists_3"() {
    return era['raw']().data['flag'][103];
  },
  /**
   * 口上存在_3
   * @param {number} v
   */
  set "kojo_exists_3"(v) {
    era['raw']().data['flag'][103] = v;
  },
  /**
   * 口上存在_4
   * @returns {number}
   */
  get "kojo_exists_4"() {
    return era['raw']().data['flag'][104];
  },
  /**
   * 口上存在_4
   * @param {number} v
   */
  set "kojo_exists_4"(v) {
    era['raw']().data['flag'][104] = v;
  },
  /**
   * 口上存在_5
   * @returns {number}
   */
  get "kojo_exists_5"() {
    return era['raw']().data['flag'][105];
  },
  /**
   * 口上存在_5
   * @param {number} v
   */
  set "kojo_exists_5"(v) {
    era['raw']().data['flag'][105] = v;
  },
  /**
   * 口上存在_6
   * @returns {number}
   */
  get "kojo_exists_6"() {
    return era['raw']().data['flag'][106];
  },
  /**
   * 口上存在_6
   * @param {number} v
   */
  set "kojo_exists_6"(v) {
    era['raw']().data['flag'][106] = v;
  },
  /**
   * 口上存在_7
   * @returns {number}
   */
  get "kojo_exists_7"() {
    return era['raw']().data['flag'][107];
  },
  /**
   * 口上存在_7
   * @param {number} v
   */
  set "kojo_exists_7"(v) {
    era['raw']().data['flag'][107] = v;
  },
  /**
   * 口上存在_8
   * @returns {number}
   */
  get "kojo_exists_8"() {
    return era['raw']().data['flag'][108];
  },
  /**
   * 口上存在_8
   * @param {number} v
   */
  set "kojo_exists_8"(v) {
    era['raw']().data['flag'][108] = v;
  },
  /**
   * 口上存在_9
   * @returns {number}
   */
  get "kojo_exists_9"() {
    return era['raw']().data['flag'][109];
  },
  /**
   * 口上存在_9
   * @param {number} v
   */
  set "kojo_exists_9"(v) {
    era['raw']().data['flag'][109] = v;
  },
  /**
   * 口上存在_10
   * @returns {number}
   */
  get "kojo_exists_10"() {
    return era['raw']().data['flag'][110];
  },
  /**
   * 口上存在_10
   * @param {number} v
   */
  set "kojo_exists_10"(v) {
    era['raw']().data['flag'][110] = v;
  },
  /**
   * 口上存在_11
   * @returns {number}
   */
  get "kojo_exists_11"() {
    return era['raw']().data['flag'][111];
  },
  /**
   * 口上存在_11
   * @param {number} v
   */
  set "kojo_exists_11"(v) {
    era['raw']().data['flag'][111] = v;
  },
  /**
   * 口上存在_12
   * @returns {number}
   */
  get "kojo_exists_12"() {
    return era['raw']().data['flag'][112];
  },
  /**
   * 口上存在_12
   * @param {number} v
   */
  set "kojo_exists_12"(v) {
    era['raw']().data['flag'][112] = v;
  },
  /**
   * 口上存在_13
   * @returns {number}
   */
  get "kojo_exists_13"() {
    return era['raw']().data['flag'][113];
  },
  /**
   * 口上存在_13
   * @param {number} v
   */
  set "kojo_exists_13"(v) {
    era['raw']().data['flag'][113] = v;
  },
  /**
   * 口上存在_14
   * @returns {number}
   */
  get "kojo_exists_14"() {
    return era['raw']().data['flag'][114];
  },
  /**
   * 口上存在_14
   * @param {number} v
   */
  set "kojo_exists_14"(v) {
    era['raw']().data['flag'][114] = v;
  },
  /**
   * 口上存在_15
   * @returns {number}
   */
  get "kojo_exists_15"() {
    return era['raw']().data['flag'][115];
  },
  /**
   * 口上存在_15
   * @param {number} v
   */
  set "kojo_exists_15"(v) {
    era['raw']().data['flag'][115] = v;
  },
  /**
   * 口上存在_19
   * @returns {number}
   */
  get "kojo_exists_19"() {
    return era['raw']().data['flag'][119];
  },
  /**
   * 口上存在_19
   * @param {number} v
   */
  set "kojo_exists_19"(v) {
    era['raw']().data['flag'][119] = v;
  },
  /**
   * 勇者入场_23
   * @returns {number}
   */
  get "hero_entry_23"() {
    return era['raw']().data['flag'][223];
  },
  /**
   * 勇者入场_23
   * @param {number} v
   */
  set "hero_entry_23"(v) {
    era['raw']().data['flag'][223] = v;
  },
  /**
   * 狂王替身登场
   * @returns {number}
   */
  get "crazylord_entered"() {
    return era['raw']().data['flag'][224];
  },
  /**
   * 狂王替身登场
   * @param {number} v
   */
  set "crazylord_entered"(v) {
    era['raw']().data['flag'][224] = v;
  },
  /**
   * 第1层陷阱a
   * @returns {number}
   */
  get "floor_1_trap_a"() {
    return era['raw']().data['flag'][300];
  },
  /**
   * 第1层陷阱a
   * @param {number} v
   */
  set "floor_1_trap_a"(v) {
    era['raw']().data['flag'][300] = v;
  },
  /**
   * 第2层陷阱a
   * @returns {number}
   */
  get "floor_2_trap_a"() {
    return era['raw']().data['flag'][301];
  },
  /**
   * 第2层陷阱a
   * @param {number} v
   */
  set "floor_2_trap_a"(v) {
    era['raw']().data['flag'][301] = v;
  },
  /**
   * 第3层陷阱a
   * @returns {number}
   */
  get "floor_3_trap_a"() {
    return era['raw']().data['flag'][302];
  },
  /**
   * 第3层陷阱a
   * @param {number} v
   */
  set "floor_3_trap_a"(v) {
    era['raw']().data['flag'][302] = v;
  },
  /**
   * 第4层陷阱a
   * @returns {number}
   */
  get "floor_4_trap_a"() {
    return era['raw']().data['flag'][303];
  },
  /**
   * 第4层陷阱a
   * @param {number} v
   */
  set "floor_4_trap_a"(v) {
    era['raw']().data['flag'][303] = v;
  },
  /**
   * 第5层陷阱a
   * @returns {number}
   */
  get "floor_5_trap_a"() {
    return era['raw']().data['flag'][304];
  },
  /**
   * 第5层陷阱a
   * @param {number} v
   */
  set "floor_5_trap_a"(v) {
    era['raw']().data['flag'][304] = v;
  },
  /**
   * 第6层陷阱a
   * @returns {number}
   */
  get "floor_6_trap_a"() {
    return era['raw']().data['flag'][305];
  },
  /**
   * 第6层陷阱a
   * @param {number} v
   */
  set "floor_6_trap_a"(v) {
    era['raw']().data['flag'][305] = v;
  },
  /**
   * 第7层陷阱a
   * @returns {number}
   */
  get "floor_7_trap_a"() {
    return era['raw']().data['flag'][306];
  },
  /**
   * 第7层陷阱a
   * @param {number} v
   */
  set "floor_7_trap_a"(v) {
    era['raw']().data['flag'][306] = v;
  },
  /**
   * 第8层陷阱a
   * @returns {number}
   */
  get "floor_8_trap_a"() {
    return era['raw']().data['flag'][307];
  },
  /**
   * 第8层陷阱a
   * @param {number} v
   */
  set "floor_8_trap_a"(v) {
    era['raw']().data['flag'][307] = v;
  },
  /**
   * 第9层陷阱a
   * @returns {number}
   */
  get "floor_9_trap_a"() {
    return era['raw']().data['flag'][308];
  },
  /**
   * 第9层陷阱a
   * @param {number} v
   */
  set "floor_9_trap_a"(v) {
    era['raw']().data['flag'][308] = v;
  },
  /**
   * 第1层陷阱b
   * @returns {number}
   */
  get "floor_1_trap_b"() {
    return era['raw']().data['flag'][310];
  },
  /**
   * 第1层陷阱b
   * @param {number} v
   */
  set "floor_1_trap_b"(v) {
    era['raw']().data['flag'][310] = v;
  },
  /**
   * 第2层陷阱b
   * @returns {number}
   */
  get "floor_2_trap_b"() {
    return era['raw']().data['flag'][311];
  },
  /**
   * 第2层陷阱b
   * @param {number} v
   */
  set "floor_2_trap_b"(v) {
    era['raw']().data['flag'][311] = v;
  },
  /**
   * 第3层陷阱b
   * @returns {number}
   */
  get "floor_3_trap_b"() {
    return era['raw']().data['flag'][312];
  },
  /**
   * 第3层陷阱b
   * @param {number} v
   */
  set "floor_3_trap_b"(v) {
    era['raw']().data['flag'][312] = v;
  },
  /**
   * 第4层陷阱b
   * @returns {number}
   */
  get "floor_4_trap_b"() {
    return era['raw']().data['flag'][313];
  },
  /**
   * 第4层陷阱b
   * @param {number} v
   */
  set "floor_4_trap_b"(v) {
    era['raw']().data['flag'][313] = v;
  },
  /**
   * 第5层陷阱b
   * @returns {number}
   */
  get "floor_5_trap_b"() {
    return era['raw']().data['flag'][314];
  },
  /**
   * 第5层陷阱b
   * @param {number} v
   */
  set "floor_5_trap_b"(v) {
    era['raw']().data['flag'][314] = v;
  },
  /**
   * 第6层陷阱b
   * @returns {number}
   */
  get "floor_6_trap_b"() {
    return era['raw']().data['flag'][315];
  },
  /**
   * 第6层陷阱b
   * @param {number} v
   */
  set "floor_6_trap_b"(v) {
    era['raw']().data['flag'][315] = v;
  },
  /**
   * 第7层陷阱b
   * @returns {number}
   */
  get "floor_7_trap_b"() {
    return era['raw']().data['flag'][316];
  },
  /**
   * 第7层陷阱b
   * @param {number} v
   */
  set "floor_7_trap_b"(v) {
    era['raw']().data['flag'][316] = v;
  },
  /**
   * 第8层陷阱b
   * @returns {number}
   */
  get "floor_8_trap_b"() {
    return era['raw']().data['flag'][317];
  },
  /**
   * 第8层陷阱b
   * @param {number} v
   */
  set "floor_8_trap_b"(v) {
    era['raw']().data['flag'][317] = v;
  },
  /**
   * 第9层陷阱b
   * @returns {number}
   */
  get "floor_9_trap_b"() {
    return era['raw']().data['flag'][318];
  },
  /**
   * 第9层陷阱b
   * @param {number} v
   */
  set "floor_9_trap_b"(v) {
    era['raw']().data['flag'][318] = v;
  },
  /**
   * 第1层陷阱c
   * @returns {number}
   */
  get "floor_1_trap_c"() {
    return era['raw']().data['flag'][320];
  },
  /**
   * 第1层陷阱c
   * @param {number} v
   */
  set "floor_1_trap_c"(v) {
    era['raw']().data['flag'][320] = v;
  },
  /**
   * 第2层陷阱c
   * @returns {number}
   */
  get "floor_2_trap_c"() {
    return era['raw']().data['flag'][321];
  },
  /**
   * 第2层陷阱c
   * @param {number} v
   */
  set "floor_2_trap_c"(v) {
    era['raw']().data['flag'][321] = v;
  },
  /**
   * 第3层陷阱c
   * @returns {number}
   */
  get "floor_3_trap_c"() {
    return era['raw']().data['flag'][322];
  },
  /**
   * 第3层陷阱c
   * @param {number} v
   */
  set "floor_3_trap_c"(v) {
    era['raw']().data['flag'][322] = v;
  },
  /**
   * 第4层陷阱c
   * @returns {number}
   */
  get "floor_4_trap_c"() {
    return era['raw']().data['flag'][323];
  },
  /**
   * 第4层陷阱c
   * @param {number} v
   */
  set "floor_4_trap_c"(v) {
    era['raw']().data['flag'][323] = v;
  },
  /**
   * 第5层陷阱c
   * @returns {number}
   */
  get "floor_5_trap_c"() {
    return era['raw']().data['flag'][324];
  },
  /**
   * 第5层陷阱c
   * @param {number} v
   */
  set "floor_5_trap_c"(v) {
    era['raw']().data['flag'][324] = v;
  },
  /**
   * 第6层陷阱c
   * @returns {number}
   */
  get "floor_6_trap_c"() {
    return era['raw']().data['flag'][325];
  },
  /**
   * 第6层陷阱c
   * @param {number} v
   */
  set "floor_6_trap_c"(v) {
    era['raw']().data['flag'][325] = v;
  },
  /**
   * 第7层陷阱c
   * @returns {number}
   */
  get "floor_7_trap_c"() {
    return era['raw']().data['flag'][326];
  },
  /**
   * 第7层陷阱c
   * @param {number} v
   */
  set "floor_7_trap_c"(v) {
    era['raw']().data['flag'][326] = v;
  },
  /**
   * 第8层陷阱c
   * @returns {number}
   */
  get "floor_8_trap_c"() {
    return era['raw']().data['flag'][327];
  },
  /**
   * 第8层陷阱c
   * @param {number} v
   */
  set "floor_8_trap_c"(v) {
    era['raw']().data['flag'][327] = v;
  },
  /**
   * 第9层陷阱c
   * @returns {number}
   */
  get "floor_9_trap_c"() {
    return era['raw']().data['flag'][328];
  },
  /**
   * 第9层陷阱c
   * @param {number} v
   */
  set "floor_9_trap_c"(v) {
    era['raw']().data['flag'][328] = v;
  },
  /**
   * 第1层宝箱
   * @returns {number}
   */
  get "floor_1_treasure"() {
    return era['raw']().data['flag'][340];
  },
  /**
   * 第1层宝箱
   * @param {number} v
   */
  set "floor_1_treasure"(v) {
    era['raw']().data['flag'][340] = v;
  },
  /**
   * 第2层宝箱
   * @returns {number}
   */
  get "floor_2_treasure"() {
    return era['raw']().data['flag'][341];
  },
  /**
   * 第2层宝箱
   * @param {number} v
   */
  set "floor_2_treasure"(v) {
    era['raw']().data['flag'][341] = v;
  },
  /**
   * 第3层宝箱
   * @returns {number}
   */
  get "floor_3_treasure"() {
    return era['raw']().data['flag'][342];
  },
  /**
   * 第3层宝箱
   * @param {number} v
   */
  set "floor_3_treasure"(v) {
    era['raw']().data['flag'][342] = v;
  },
  /**
   * 第4层宝箱
   * @returns {number}
   */
  get "floor_4_treasure"() {
    return era['raw']().data['flag'][343];
  },
  /**
   * 第4层宝箱
   * @param {number} v
   */
  set "floor_4_treasure"(v) {
    era['raw']().data['flag'][343] = v;
  },
  /**
   * 第5层宝箱
   * @returns {number}
   */
  get "floor_5_treasure"() {
    return era['raw']().data['flag'][344];
  },
  /**
   * 第5层宝箱
   * @param {number} v
   */
  set "floor_5_treasure"(v) {
    era['raw']().data['flag'][344] = v;
  },
  /**
   * 第6层宝箱
   * @returns {number}
   */
  get "floor_6_treasure"() {
    return era['raw']().data['flag'][345];
  },
  /**
   * 第6层宝箱
   * @param {number} v
   */
  set "floor_6_treasure"(v) {
    era['raw']().data['flag'][345] = v;
  },
  /**
   * 第7层宝箱
   * @returns {number}
   */
  get "floor_7_treasure"() {
    return era['raw']().data['flag'][346];
  },
  /**
   * 第7层宝箱
   * @param {number} v
   */
  set "floor_7_treasure"(v) {
    era['raw']().data['flag'][346] = v;
  },
  /**
   * 第8层宝箱
   * @returns {number}
   */
  get "floor_8_treasure"() {
    return era['raw']().data['flag'][347];
  },
  /**
   * 第8层宝箱
   * @param {number} v
   */
  set "floor_8_treasure"(v) {
    era['raw']().data['flag'][347] = v;
  },
  /**
   * 第9层宝箱
   * @returns {number}
   */
  get "floor_9_treasure"() {
    return era['raw']().data['flag'][348];
  },
  /**
   * 第9层宝箱
   * @param {number} v
   */
  set "floor_9_treasure"(v) {
    era['raw']().data['flag'][348] = v;
  },
  /**
   * 第1层设施
   * @returns {number}
   */
  get "floor_1_facility"() {
    return era['raw']().data['flag'][350];
  },
  /**
   * 第1层设施
   * @param {number} v
   */
  set "floor_1_facility"(v) {
    era['raw']().data['flag'][350] = v;
  },
  /**
   * 第2层设施
   * @returns {number}
   */
  get "floor_2_facility"() {
    return era['raw']().data['flag'][351];
  },
  /**
   * 第2层设施
   * @param {number} v
   */
  set "floor_2_facility"(v) {
    era['raw']().data['flag'][351] = v;
  },
  /**
   * 第3层设施
   * @returns {number}
   */
  get "floor_3_facility"() {
    return era['raw']().data['flag'][352];
  },
  /**
   * 第3层设施
   * @param {number} v
   */
  set "floor_3_facility"(v) {
    era['raw']().data['flag'][352] = v;
  },
  /**
   * 第4层设施
   * @returns {number}
   */
  get "floor_4_facility"() {
    return era['raw']().data['flag'][353];
  },
  /**
   * 第4层设施
   * @param {number} v
   */
  set "floor_4_facility"(v) {
    era['raw']().data['flag'][353] = v;
  },
  /**
   * 第5层设施
   * @returns {number}
   */
  get "floor_5_facility"() {
    return era['raw']().data['flag'][354];
  },
  /**
   * 第5层设施
   * @param {number} v
   */
  set "floor_5_facility"(v) {
    era['raw']().data['flag'][354] = v;
  },
  /**
   * 第6层设施
   * @returns {number}
   */
  get "floor_6_facility"() {
    return era['raw']().data['flag'][355];
  },
  /**
   * 第6层设施
   * @param {number} v
   */
  set "floor_6_facility"(v) {
    era['raw']().data['flag'][355] = v;
  },
  /**
   * 第7层设施
   * @returns {number}
   */
  get "floor_7_facility"() {
    return era['raw']().data['flag'][356];
  },
  /**
   * 第7层设施
   * @param {number} v
   */
  set "floor_7_facility"(v) {
    era['raw']().data['flag'][356] = v;
  },
  /**
   * 第8层设施
   * @returns {number}
   */
  get "floor_8_facility"() {
    return era['raw']().data['flag'][357];
  },
  /**
   * 第8层设施
   * @param {number} v
   */
  set "floor_8_facility"(v) {
    era['raw']().data['flag'][357] = v;
  },
  /**
   * 第9层设施
   * @returns {number}
   */
  get "floor_9_facility"() {
    return era['raw']().data['flag'][358];
  },
  /**
   * 第9层设施
   * @param {number} v
   */
  set "floor_9_facility"(v) {
    era['raw']().data['flag'][358] = v;
  },
  /**
   * 勇者战役中
   * @returns {number}
   */
  get "hero_campaign_active"() {
    return era['raw']().data['flag'][400];
  },
  /**
   * 勇者战役中
   * @param {number} v
   */
  set "hero_campaign_active"(v) {
    era['raw']().data['flag'][400] = v;
  },
  /**
   * 战役剧情进度
   * @returns {number}
   */
  get "campaign_story_progress"() {
    return era['raw']().data['flag'][401];
  },
  /**
   * 战役剧情进度
   * @param {number} v
   */
  set "campaign_story_progress"(v) {
    era['raw']().data['flag'][401] = v;
  },
  /**
   * 派遣奴隶标志
   * @returns {number}
   */
  get "dispatched_slave"() {
    return era['raw']().data['flag'][402];
  },
  /**
   * 派遣奴隶标志
   * @param {number} v
   */
  set "dispatched_slave"(v) {
    era['raw']().data['flag'][402] = v;
  },
  /**
   * 狂王性别
   * @returns {number}
   */
  get "crazylord_gender"() {
    return era['raw']().data['flag'][500];
  },
  /**
   * 狂王性别
   * @param {number} v
   */
  set "crazylord_gender"(v) {
    era['raw']().data['flag'][500] = v;
  },
  /**
   * 初期奴隶类型
   * @returns {number}
   */
  get "initial_slave_type"() {
    return era['raw']().data['flag'][501];
  },
  /**
   * 初期奴隶类型
   * @param {number} v
   */
  set "initial_slave_type"(v) {
    era['raw']().data['flag'][501] = v;
  },
  /**
   * 二维地图模式
   * @returns {number}
   */
  get "map_2d_mode"() {
    return era['raw']().data['flag'][502];
  },
  /**
   * 二维地图模式
   * @param {number} v
   */
  set "map_2d_mode"(v) {
    era['raw']().data['flag'][502] = v;
  },
  /**
   * 指令菜单长度
   * @returns {number}
   */
  get "order_menu_length"() {
    return era['raw']().data['flag'][550];
  },
  /**
   * 指令菜单长度
   * @param {number} v
   */
  set "order_menu_length"(v) {
    era['raw']().data['flag'][550] = v;
  },
  /**
   * 石像数
   * @returns {number}
   */
  get "stone_statue_count"() {
    return era['raw']().data['flag'][600];
  },
  /**
   * 石像数
   * @param {number} v
   */
  set "stone_statue_count"(v) {
    era['raw']().data['flag'][600] = v;
  },
  /**
   * 剥制数
   * @returns {number}
   */
  get "taxidermy_count"() {
    return era['raw']().data['flag'][601];
  },
  /**
   * 剥制数
   * @param {number} v
   */
  set "taxidermy_count"(v) {
    era['raw']().data['flag'][601] = v;
  },
  /**
   * 蜡像数
   * @returns {number}
   */
  get "wax_statue_count"() {
    return era['raw']().data['flag'][602];
  },
  /**
   * 蜡像数
   * @param {number} v
   */
  set "wax_statue_count"(v) {
    era['raw']().data['flag'][602] = v;
  },
  /**
   * 人偶数_服装
   * @returns {number}
   */
  get "doll_clothed_count"() {
    return era['raw']().data['flag'][603];
  },
  /**
   * 人偶数_服装
   * @param {number} v
   */
  set "doll_clothed_count"(v) {
    era['raw']().data['flag'][603] = v;
  },
  /**
   * 人偶数_球形关节
   * @returns {number}
   */
  get "doll_ball_joint_count"() {
    return era['raw']().data['flag'][604];
  },
  /**
   * 人偶数_球形关节
   * @param {number} v
   */
  set "doll_ball_joint_count"(v) {
    era['raw']().data['flag'][604] = v;
  },
  /**
   * 金属像数
   * @returns {number}
   */
  get "metal_statue_count"() {
    return era['raw']().data['flag'][605];
  },
  /**
   * 金属像数
   * @param {number} v
   */
  set "metal_statue_count"(v) {
    era['raw']().data['flag'][605] = v;
  },
  /**
   * 冰像数
   * @returns {number}
   */
  get "ice_statue_count"() {
    return era['raw']().data['flag'][606];
  },
  /**
   * 冰像数
   * @param {number} v
   */
  set "ice_statue_count"(v) {
    era['raw']().data['flag'][606] = v;
  },
  /**
   * 金属像数_2
   * @returns {number}
   */
  get "metal_statue_count_2"() {
    return era['raw']().data['flag'][607];
  },
  /**
   * 金属像数_2
   * @param {number} v
   */
  set "metal_statue_count_2"(v) {
    era['raw']().data['flag'][607] = v;
  },
  /**
   * 家具数
   * @returns {number}
   */
  get "furniture_count"() {
    return era['raw']().data['flag'][608];
  },
  /**
   * 家具数
   * @param {number} v
   */
  set "furniture_count"(v) {
    era['raw']().data['flag'][608] = v;
  },
  /**
   * 绘画数
   * @returns {number}
   */
  get "painting_count"() {
    return era['raw']().data['flag'][609];
  },
  /**
   * 绘画数
   * @param {number} v
   */
  set "painting_count"(v) {
    era['raw']().data['flag'][609] = v;
  },
  /**
   * 喷水像_石
   * @returns {number}
   */
  get "fountain_stone_count"() {
    return era['raw']().data['flag'][611];
  },
  /**
   * 喷水像_石
   * @param {number} v
   */
  set "fountain_stone_count"(v) {
    era['raw']().data['flag'][611] = v;
  },
  /**
   * 喷水像_金属
   * @returns {number}
   */
  get "fountain_metal_count"() {
    return era['raw']().data['flag'][612];
  },
  /**
   * 喷水像_金属
   * @param {number} v
   */
  set "fountain_metal_count"(v) {
    era['raw']().data['flag'][612] = v;
  },
  /**
   * 人间牧场竿役
   * @returns {number}
   */
  get "ranch_stud"() {
    return era['raw']().data['flag'][613];
  },
  /**
   * 人间牧场竿役
   * @param {number} v
   */
  set "ranch_stud"(v) {
    era['raw']().data['flag'][613] = v;
  },
  /**
   * 人类牧场设定
   * @returns {number}
   */
  get "ranch_display_settings"() {
    return era['raw']().data['flag'][614];
  },
  /**
   * 人类牧场设定
   * @param {number} v
   */
  set "ranch_display_settings"(v) {
    era['raw']().data['flag'][614] = v;
  },
  /**
   * 葵希罗线
   * @returns {number}
   */
  get "route_34"() {
    return era['raw']().data['flag'][2815];
  },
  /**
   * 葵希罗线
   * @param {number} v
   */
  set "route_34"(v) {
    era['raw']().data['flag'][2815] = v;
  },
  /**
   * 反叛结局
   * @returns {number}
   */
  get "rebellion_ending"() {
    return era['raw']().data['flag'][2816];
  },
  /**
   * 反叛结局
   * @param {number} v
   */
  set "rebellion_ending"(v) {
    era['raw']().data['flag'][2816] = v;
  },
  /**
   * 天数
   * @returns {number}
   */
  get "day_count"() {
    return era['raw']().data['flag'][10000];
  },
  /**
   * 天数
   * @param {number} v
   */
  set "day_count"(v) {
    era['raw']().data['flag'][10000] = v;
  },
  /**
   * 月
   * @returns {number}
   */
  get "month"() {
    return era['raw']().data['flag'][10001];
  },
  /**
   * 月
   * @param {number} v
   */
  set "month"(v) {
    era['raw']().data['flag'][10001] = v;
  },
  /**
   * 日
   * @returns {number}
   */
  get "date"() {
    return era['raw']().data['flag'][10002];
  },
  /**
   * 日
   * @param {number} v
   */
  set "date"(v) {
    era['raw']().data['flag'][10002] = v;
  },
  /**
   * 时段
   * @returns {number}
   */
  get "time"() {
    return era['raw']().data['flag'][10003];
  },
  /**
   * 时段
   * @param {number} v
   */
  set "time"(v) {
    era['raw']().data['flag'][10003] = v;
  },
  /**
   * 所持金
   * @returns {number}
   */
  get "money"() {
    return era['raw']().data['flag'][10004];
  },
  /**
   * 所持金
   * @param {number} v
   */
  set "money"(v) {
    era['raw']().data['flag'][10004] = v;
  },
  /**
   * 目标
   * @returns {number}
   */
  get "target"() {
    return era['raw']().data['flag'][10005];
  },
  /**
   * 目标
   * @param {number} v
   */
  set "target"(v) {
    era['raw']().data['flag'][10005] = v;
  },
  /**
   * 助手
   * @returns {number}
   */
  get "assi"() {
    return era['raw']().data['flag'][10006];
  },
  /**
   * 助手
   * @param {number} v
   */
  set "assi"(v) {
    era['raw']().data['flag'][10006] = v;
  },
  /**
   * 助手参与调教
   * @returns {number}
   */
  get "assiplay"() {
    return era['raw']().data['flag'][10007];
  },
  /**
   * 助手参与调教
   * @param {number} v
   */
  set "assiplay"(v) {
    era['raw']().data['flag'][10007] = v;
  },
  /**
   * 调教者
   * @returns {number}
   */
  get "player"() {
    return era['raw']().data['flag'][10008];
  },
  /**
   * 调教者
   * @param {number} v
   */
  set "player"(v) {
    era['raw']().data['flag'][10008] = v;
  },
  /**
   * 上次指令
   * @returns {number}
   */
  get "prevcom"() {
    return era['raw']().data['flag'][10009];
  },
  /**
   * 上次指令
   * @param {number} v
   */
  set "prevcom"(v) {
    era['raw']().data['flag'][10009] = v;
  },
  /**
   * 下次指令
   * @returns {number}
   */
  get "nextcom"() {
    return era['raw']().data['flag'][10010];
  },
  /**
   * 下次指令
   * @param {number} v
   */
  set "nextcom"(v) {
    era['raw']().data['flag'][10010] = v;
  },
  /**
   * 当前指令
   * @returns {number}
   */
  get "selectcom"() {
    return era['raw']().data['flag'][10011];
  },
  /**
   * 当前指令
   * @param {number} v
   */
  set "selectcom"(v) {
    era['raw']().data['flag'][10011] = v;
  },
  /**
   * 记录调教对象
   * @returns {number}
   */
  get "target_record"() {
    return era['raw']().data['flag'][10012];
  },
  /**
   * 记录调教对象
   * @param {number} v
   */
  set "target_record"(v) {
    era['raw']().data['flag'][10012] = v;
  },
  /**
   * 记录助手
   * @returns {number}
   */
  get "assi_record"() {
    return era['raw']().data['flag'][10013];
  },
  /**
   * 记录助手
   * @param {number} v
   */
  set "assi_record"(v) {
    era['raw']().data['flag'][10013] = v;
  },
  /**
   * 暂存主人
   * @returns {number}
   */
  get "master_backup"() {
    return era['raw']().data['flag'][10014];
  },
  /**
   * 暂存主人
   * @param {number} v
   */
  set "master_backup"(v) {
    era['raw']().data['flag'][10014] = v;
  },
  /**
   * 暂存目标
   * @returns {number}
   */
  get "target_backup"() {
    return era['raw']().data['flag'][10015];
  },
  /**
   * 暂存目标
   * @param {number} v
   */
  set "target_backup"(v) {
    era['raw']().data['flag'][10015] = v;
  },
  /**
   * 暂存助手
   * @returns {number}
   */
  get "assi_backup"() {
    return era['raw']().data['flag'][10016];
  },
  /**
   * 暂存助手
   * @param {number} v
   */
  set "assi_backup"(v) {
    era['raw']().data['flag'][10016] = v;
  },
  /**
   * 星期
   * @returns {number}
   */
  get "weekday"() {
    return era['raw']().data['flag'][10017];
  },
  /**
   * 星期
   * @param {number} v
   */
  set "weekday"(v) {
    era['raw']().data['flag'][10017] = v;
  },
  /**
   * 上次读取存档
   * @returns {number}
   */
  get "last_load_no"() {
    return era['raw']().data['flag'][10018];
  },
  /**
   * 上次读取存档
   * @param {number} v
   */
  set "last_load_no"(v) {
    era['raw']().data['flag'][10018] = v;
  },
  /**
   * 上次保存存档
   * @returns {number}
   */
  get "last_save_no"() {
    return era['raw']().data['flag'][10019];
  },
  /**
   * 上次保存存档
   * @param {number} v
   */
  set "last_save_no"(v) {
    era['raw']().data['flag'][10019] = v;
  },
  /**
   * 上次保存存档_1
   * @returns {number}
   */
  get "last_save_no_1"() {
    return era['raw']().data['flag'][10020];
  },
  /**
   * 上次保存存档_1
   * @param {number} v
   */
  set "last_save_no_1"(v) {
    era['raw']().data['flag'][10020] = v;
  },
  /**
   * 上次保存存档_2
   * @returns {number}
   */
  get "last_save_no_2"() {
    return era['raw']().data['flag'][10021];
  },
  /**
   * 上次保存存档_2
   * @param {number} v
   */
  set "last_save_no_2"(v) {
    era['raw']().data['flag'][10021] = v;
  },
  /**
   * 上次保存存档_3
   * @returns {number}
   */
  get "last_save_no_3"() {
    return era['raw']().data['flag'][10022];
  },
  /**
   * 上次保存存档_3
   * @param {number} v
   */
  set "last_save_no_3"(v) {
    era['raw']().data['flag'][10022] = v;
  },
  /**
   * 上次保存存档_4
   * @returns {number}
   */
  get "last_save_no_4"() {
    return era['raw']().data['flag'][10023];
  },
  /**
   * 上次保存存档_4
   * @param {number} v
   */
  set "last_save_no_4"(v) {
    era['raw']().data['flag'][10023] = v;
  },
  /**
   * 上次保存存档_5
   * @returns {number}
   */
  get "last_save_no_5"() {
    return era['raw']().data['flag'][10024];
  },
  /**
   * 上次保存存档_5
   * @param {number} v
   */
  set "last_save_no_5"(v) {
    era['raw']().data['flag'][10024] = v;
  },
  /**
   * 上次保存存档_6
   * @returns {number}
   */
  get "last_save_no_6"() {
    return era['raw']().data['flag'][10025];
  },
  /**
   * 上次保存存档_6
   * @param {number} v
   */
  set "last_save_no_6"(v) {
    era['raw']().data['flag'][10025] = v;
  },
  /**
   * 上次保存存档_7
   * @returns {number}
   */
  get "last_save_no_7"() {
    return era['raw']().data['flag'][10026];
  },
  /**
   * 上次保存存档_7
   * @param {number} v
   */
  set "last_save_no_7"(v) {
    era['raw']().data['flag'][10026] = v;
  },
  /**
   * 上次保存存档_8
   * @returns {number}
   */
  get "last_save_no_8"() {
    return era['raw']().data['flag'][10027];
  },
  /**
   * 上次保存存档_8
   * @param {number} v
   */
  set "last_save_no_8"(v) {
    era['raw']().data['flag'][10027] = v;
  },
  /**
   * 上次保存存档_9
   * @returns {number}
   */
  get "last_save_no_9"() {
    return era['raw']().data['flag'][10028];
  },
  /**
   * 上次保存存档_9
   * @param {number} v
   */
  set "last_save_no_9"(v) {
    era['raw']().data['flag'][10028] = v;
  },
  /**
   * 触手回合计数
   * @returns {number}
   */
  get "tentacle_round"() {
    return era['raw']().data['flag'][10030];
  },
  /**
   * 触手回合计数
   * @param {number} v
   */
  set "tentacle_round"(v) {
    era['raw']().data['flag'][10030] = v;
  },
  get,
  /**
   * @param {number|string} param
   * @param {number} val
   * @returns {number}
   */
  set(param, val) {
    return era.set(`flag:${param}`, val);
  },
  /**
   * @param {number|string} param
   * @param {number} val
   * @returns {number}
   */
  add(param, val) {
    return era.set(`flag:${param}`, get(param) + val);
  },
};

module.exports = era_flag;
// GENERATED END

// —— 手写区（重新生成不会触碰）——

/** 登记普通勇者已除名；后代由调用方传入来源模板编号。 */
era_flag.mark_hero_removed = function (template_no) {
  // FLAG:200–299 = 预设 1–100 的除名标记；范围外属于其他玩法。
  if (template_no >= 1 && template_no <= 100) {
    era.set(`flag:${template_no + 199}`, 1);
  }
};

//
// 存读档域指针（#136 并入；随 #136 返工登记进 yml/Flag.yml 保留区
// 10018-10028，两组变量**来源不同**）：
//   last_load_no  LASTLOAD_NO  内建只读变量（LOADDATA 后更新，
//       RESETDATA 或返回标题后恢复初值 **-1**——data-save-load.md
//       「LASTLOAD 变量」：初始值「-1 或空」，int 型为 -1）。ere 无内建
//       等价物，由 page-save-load 在读档成功后写入。
//   last_save_no  LASTSAVE_NO:0  `#DIM LASTSAVE_NO,10 = -1`
//       ——**声明即带初值 -1**；[1..9]（flag:10020..10028，生成的
//       last_save_no_1..9 无人消费）是 ARRAYSHIFT 压栈的历史元素，存档
//       列表的高亮比较只读 [0]（ere/page/page-save-load.js）。
//
// **为什么必须显式初始化（ere/event/event-first.js 的 EVENTFIRST 开头
// 写 -1），不能靠 undefined 表示「没读过」**：槽位登记进 Flag.yml 后，
// 引擎 resetData/fillData 会为**已声明**序号赋 0（#13 的 fillData 语义；
// 未登记时才是 undefined）。而 0 是有效槽号——0 号存档槽会被高亮成
// 「上次存/读」，哨兵语义被破坏。`?? -1` 只救未初始化的 undefined
// 读（如测试直调；fillData 补出的 0 非 nullish，救不到），**初值的
// 真正保证是初始化写入**。ere 没有「装载期按 #DIM 声明赋初值」与
// 「RESETDATA/返回标题恢复 -1」两个钩子，等价落点＝新档初始化。
// 下面的 defineProperty 覆盖生成区的 `|| 0` 同名访问器——`|| 0` 会把
// 未初始化读伪装成「0 号槽」（0 falsy 时返回 0），同样破坏哨兵。
// 同版本旧档不存在（移植期 saves 为空对象，ADR-0006），fillData 对
// 「新增已声明序号」补 0 的窗口仅理论存在。

Object.defineProperty(era_flag, 'last_load_no', {
  configurable: true,
  /** 最近读档槽号（flag:10018 ↔ LASTLOAD_NO，初值 -1）@type {number} */
  get() {
    return era.get('flag:10018') ?? -1;
  },
  /** @param {number} v */
  set(v) {
    era.set('flag:10018', v);
  },
});

Object.defineProperty(era_flag, 'last_save_no', {
  configurable: true,
  /** 最近保存槽号（flag:10019 ↔ LASTSAVE_NO:0，初值 -1）@type {number} */
  get() {
    return era.get('flag:10019') ?? -1;
  },
  /** @param {number} v */
  set(v) {
    era.set('flag:10019', v);
  },
});

//
// 变量语义补注（语义 + 来源，AGENTS.md「变量语义必须注释」）：
//
// 生成区的「↔ FLAG:1000x」注释对 10000 保留区失真——这七个条目不是
// FLAG 的下标，而是 #5 决议并入 flag 的内置变量（各条对照的变量名见下），
// 生成器只按表名大写拼注释，改不了，以此处为准：
//
//   day_count  DAY:0  天数计数（经年累月的日数，主菜单「第{DAY/365}年」与
//       「第{DAY+1}日」的读数源）。开局不初始化、留 0——「第{DAY+1}日」
//       随之显示「第1日」，自洽；勿自作主张补成第 1 天。
//   month      DAY:1  月份。开局置 1（ere/event/event-first.js 的 EVENTFIRST）。
//   date       DAY:2  日。开局不写、留 0——主菜单如实显示「1月0日」，
//       这是有意保留的行为，不是漏移植。
//   time       TIME   时段：0=上午、1=下午（存档信息行与主菜单的上午/下午
//       判断）。开局不写、留 0。
//   weekday    DAY:3  星期（0=月曜…6=日曜，「日曜の次は月曜にする」）。
//       EVENTTURNEND 的日推进 +1、超过 6 回 0（ere/event/event-turnend.js）；
//       开局不写、留 0（#114 并入保留区）。
//   money      MONEY  持有金钱（单位 pts.，#10 决议：金钱单位归游戏代码）。
//       开局 10000（ere/event/event-first.js 的 EVENTFIRST）。
//   target     TARGET 角色指针（#5 决议第六条：指针占 flag 槽位，函数间一律
//       显式传参、不隐式读全局）：-1=未选中。开局置 -1（ere/event/
//       event-first.js 的 EVENTFIRST）。
//   assi       ASSI   助手指针：0=无。开局不显式初始化、留 0。
//
// 调教域内置变量（#44 T14 并入；生成区注释只写寻址，逐条语义以此处为准）：
//   assiplay     ASSIPLAY:0  助手是否参与调教：0=主人亲自调教、1=助手调教。
//       调教初始化清 0（train-loop.js 初始化段，#44 并入）。
//   player       PLAYER      当前调教者（视角角色）：EVENTTRAIN 依 ASSIPLAY
//       置 MASTER 或 ASSI（ere/event/event-train.js）；「交代助手[102]」
//       「对换调教[112]」分支会切换（随指令票）。
//   prevcom      PREVCOM:0   上次调教指令编号：调教初始化置 -1（train-loop.js），
//       指令执行后由脚本更新为 SELECTCOM（train-loop.js）；「上次的调教指令」行读它
//       （> -1 才显示，ere/page/page-usercom.js）。
//   nextcom      NEXTCOM:0   下次指令编号：调教初始化置 -1（train-loop.js），
//       ere 侧只镜像初始化，暂无消费者。
//   selectcom    SELECTCOM   当前回合玩家选定的指令编号：回合循环的输入
//       检查设定（train-loop.js），口上与指令实现读它。
//   target_record  TARGET:1  EVENTTRAIN 记录的调教对象，以备人物切换
//       （ere/event/event-train.js）；EVENTEND 写回 FLAG:1 并在尾部还原
//       指针（ere/event/event-end.js）。
//   assi_record    ASSI:1    同上，记录的助手。
//   master_backup  T:10      调教开场暂存的 MASTER（「避免角色错乱的暂存
//       纪录」，ere/event/event-beforetrain.js）；EVENTEND 复位角色时读回
//       （ere/event/event-end.js）。T 是单字母内置数组，这里只落调教
//       路径用到的三个元素。
//   target_backup  T:11      同上，暂存的 TARGET（复位时用）。
//   assi_backup    T:12      同上，暂存的 ASSI（仅 ASSI 有效时才写）。
//
// FLAG:N 条目（0-9999）随各子系统票按下标增补进 yml/Flag.yml 后重生成；
// 底层直写未声明下标也能落（flag 是引擎内嵌表，app.asar 实证），
// 但读侧必须走本包装层或有注释的直读（#13：未声明读值得 undefined）。

module.exports = era_flag;
