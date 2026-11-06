/**
 * @file flag 表的具名访问器初稿（tools/gen-wrapper.js 自 yml/Flag.yml 生成）。
 *
 * 生成区（GENERATED 标记之间）由脚本维护，重生成加 --force；
 * 标记之外是手写区：变量语义补注、业务方法，重新生成不会触碰（#11 决议）。
 * 变量语义与来源写进手写区补注（AGENTS.md「变量语义必须注释」）。
 */

const era = require('#/era-electron');

// GENERATED START —— tools/gen-wrapper.js 自 yml/Flag.yml 生成，勿手改；重新生成（--force）只替换本标记之间
const era_flag = {
  /**
   * 特别税加成（flag:9）
   * @returns {number}
   */
  get tax_surcharge() {
    return era.get('flag:9') || 0;
  },
  /**
   * @param {number} v
   */
  set tax_surcharge(v) {
    era.set('flag:9', v);
  },
  /**
   * 人间界侵攻度（flag:81）
   * @returns {number}
   */
  get human_realm_invasion() {
    return era.get('flag:81') || 0;
  },
  /**
   * @param {number} v
   */
  set human_realm_invasion(v) {
    era.set('flag:81', v);
  },
  /**
   * 人间界陷落（flag:82）
   * @returns {number}
   */
  get human_realm_fallen() {
    return era.get('flag:82') || 0;
  },
  /**
   * @param {number} v
   */
  set human_realm_fallen(v) {
    era.set('flag:82', v);
  },
  /**
   * 人间界侵略事件进度（flag:93）
   * @returns {number}
   */
  get human_realm_event_stage() {
    return era.get('flag:93') || 0;
  },
  /**
   * @param {number} v
   */
  set human_realm_event_stage(v) {
    era.set('flag:93', v);
  },
  /**
   * 精灵领域侵攻度（flag:86）
   * @returns {number}
   */
  get elf_realm_invasion() {
    return era.get('flag:86') || 0;
  },
  /**
   * @param {number} v
   */
  set elf_realm_invasion(v) {
    era.set('flag:86', v);
  },
  /**
   * 精灵领域征服（flag:87）
   * @returns {number}
   */
  get elf_realm_conquered() {
    return era.get('flag:87') || 0;
  },
  /**
   * @param {number} v
   */
  set elf_realm_conquered(v) {
    era.set('flag:87', v);
  },
  /**
   * 龙之山脉侵攻度（flag:88）
   * @returns {number}
   */
  get dragon_realm_invasion() {
    return era.get('flag:88') || 0;
  },
  /**
   * @param {number} v
   */
  set dragon_realm_invasion(v) {
    era.set('flag:88', v);
  },
  /**
   * 龙之山脉征服（flag:89）
   * @returns {number}
   */
  get dragon_realm_conquered() {
    return era.get('flag:89') || 0;
  },
  /**
   * @param {number} v
   */
  set dragon_realm_conquered(v) {
    era.set('flag:89', v);
  },
  /**
   * 天界侵攻度（flag:90）
   * @returns {number}
   */
  get heaven_invasion() {
    return era.get('flag:90') || 0;
  },
  /**
   * @param {number} v
   */
  set heaven_invasion(v) {
    era.set('flag:90', v);
  },
  /**
   * 天界征服（flag:91）
   * @returns {number}
   */
  get heaven_conquered() {
    return era.get('flag:91') || 0;
  },
  /**
   * @param {number} v
   */
  set heaven_conquered(v) {
    era.set('flag:91', v);
  },
  /**
   * 圣灵骑士堡垒攻略进度（flag:92）
   * @returns {number}
   */
  get arcana_fort_stage() {
    return era.get('flag:92') || 0;
  },
  /**
   * @param {number} v
   */
  set arcana_fort_stage(v) {
    era.set('flag:92', v);
  },
  /**
   * 勇者战役中（flag:400）
   * @returns {number}
   */
  get hero_campaign_active() {
    return era.get('flag:400') || 0;
  },
  /**
   * @param {number} v
   */
  set hero_campaign_active(v) {
    era.set('flag:400', v);
  },
  /**
   * 战役剧情进度（flag:401）
   * @returns {number}
   */
  get campaign_story_progress() {
    return era.get('flag:401') || 0;
  },
  /**
   * @param {number} v
   */
  set campaign_story_progress(v) {
    era.set('flag:401', v);
  },
  /**
   * 二维地图模式（flag:502）
   * @returns {number}
   */
  get map_2d_mode() {
    return era.get('flag:502') || 0;
  },
  /**
   * @param {number} v
   */
  set map_2d_mode(v) {
    era.set('flag:502', v);
  },
  /**
   * 狂王替身登场（flag:224）
   * @returns {number}
   */
  get crazylord_entered() {
    return era.get('flag:224') || 0;
  },
  /**
   * @param {number} v
   */
  set crazylord_entered(v) {
    era.set('flag:224', v);
  },
  /**
   * 葵希罗线（flag:2815）
   * @returns {number}
   */
  get route_34() {
    return era.get('flag:2815') || 0;
  },
  /**
   * @param {number} v
   */
  set route_34(v) {
    era.set('flag:2815', v);
  },
  /**
   * 反叛结局（flag:2816）
   * @returns {number}
   */
  get rebellion_ending() {
    return era.get('flag:2816') || 0;
  },
  /**
   * @param {number} v
   */
  set rebellion_ending(v) {
    era.set('flag:2816', v);
  },
  /**
   * 天数（flag:10000）
   * @returns {number}
   */
  get day_count() {
    return era.get('flag:10000') || 0;
  },
  /**
   * @param {number} v
   */
  set day_count(v) {
    era.set('flag:10000', v);
  },
  /**
   * 月（flag:10001）
   * @returns {number}
   */
  get month() {
    return era.get('flag:10001') || 0;
  },
  /**
   * @param {number} v
   */
  set month(v) {
    era.set('flag:10001', v);
  },
  /**
   * 日（flag:10002）
   * @returns {number}
   */
  get date() {
    return era.get('flag:10002') || 0;
  },
  /**
   * @param {number} v
   */
  set date(v) {
    era.set('flag:10002', v);
  },
  /**
   * 时段（flag:10003）
   * @returns {number}
   */
  get time() {
    return era.get('flag:10003') || 0;
  },
  /**
   * @param {number} v
   */
  set time(v) {
    era.set('flag:10003', v);
  },
  /**
   * 所持金（flag:10004）
   * @returns {number}
   */
  get money() {
    return era.get('flag:10004') || 0;
  },
  /**
   * @param {number} v
   */
  set money(v) {
    era.set('flag:10004', v);
  },
  /**
   * 目标（flag:10005）
   * @returns {number}
   */
  get target() {
    return era.get('flag:10005') || 0;
  },
  /**
   * @param {number} v
   */
  set target(v) {
    era.set('flag:10005', v);
  },
  /**
   * 助手（flag:10006）
   * @returns {number}
   */
  get assi() {
    return era.get('flag:10006') || 0;
  },
  /**
   * @param {number} v
   */
  set assi(v) {
    era.set('flag:10006', v);
  },
  /**
   * 助手参与调教（flag:10007）
   * @returns {number}
   */
  get assiplay() {
    return era.get('flag:10007') || 0;
  },
  /**
   * @param {number} v
   */
  set assiplay(v) {
    era.set('flag:10007', v);
  },
  /**
   * 调教者（flag:10008）
   * @returns {number}
   */
  get player() {
    return era.get('flag:10008') || 0;
  },
  /**
   * @param {number} v
   */
  set player(v) {
    era.set('flag:10008', v);
  },
  /**
   * 上次指令（flag:10009）
   * @returns {number}
   */
  get prevcom() {
    return era.get('flag:10009') || 0;
  },
  /**
   * @param {number} v
   */
  set prevcom(v) {
    era.set('flag:10009', v);
  },
  /**
   * 下次指令（flag:10010）
   * @returns {number}
   */
  get nextcom() {
    return era.get('flag:10010') || 0;
  },
  /**
   * @param {number} v
   */
  set nextcom(v) {
    era.set('flag:10010', v);
  },
  /**
   * 当前指令（flag:10011）
   * @returns {number}
   */
  get selectcom() {
    return era.get('flag:10011') || 0;
  },
  /**
   * @param {number} v
   */
  set selectcom(v) {
    era.set('flag:10011', v);
  },
  /**
   * 记录调教对象（flag:10012）
   * @returns {number}
   */
  get target_record() {
    return era.get('flag:10012') || 0;
  },
  /**
   * @param {number} v
   */
  set target_record(v) {
    era.set('flag:10012', v);
  },
  /**
   * 记录助手（flag:10013）
   * @returns {number}
   */
  get assi_record() {
    return era.get('flag:10013') || 0;
  },
  /**
   * @param {number} v
   */
  set assi_record(v) {
    era.set('flag:10013', v);
  },
  /**
   * 暂存主人（flag:10014）
   * @returns {number}
   */
  get master_backup() {
    return era.get('flag:10014') || 0;
  },
  /**
   * @param {number} v
   */
  set master_backup(v) {
    era.set('flag:10014', v);
  },
  /**
   * 暂存目标（flag:10015）
   * @returns {number}
   */
  get target_backup() {
    return era.get('flag:10015') || 0;
  },
  /**
   * @param {number} v
   */
  set target_backup(v) {
    era.set('flag:10015', v);
  },
  /**
   * 暂存助手（flag:10016）
   * @returns {number}
   */
  get assi_backup() {
    return era.get('flag:10016') || 0;
  },
  /**
   * @param {number} v
   */
  set assi_backup(v) {
    era.set('flag:10016', v);
  },
  /**
   * 星期（flag:10017）
   * @returns {number}
   */
  get weekday() {
    return era.get('flag:10017') || 0;
  },
  /**
   * @param {number} v
   */
  set weekday(v) {
    era.set('flag:10017', v);
  },
  /**
   * 上次读取存档（flag:10018）
   * @returns {number}
   */
  get last_load_no() {
    return era.get('flag:10018') || 0;
  },
  /**
   * @param {number} v
   */
  set last_load_no(v) {
    era.set('flag:10018', v);
  },
  /**
   * 上次保存存档（flag:10019）
   * @returns {number}
   */
  get last_save_no() {
    return era.get('flag:10019') || 0;
  },
  /**
   * @param {number} v
   */
  set last_save_no(v) {
    era.set('flag:10019', v);
  },
  /**
   * 上次保存存档_1（flag:10020）
   * @returns {number}
   */
  get last_save_no_1() {
    return era.get('flag:10020') || 0;
  },
  /**
   * @param {number} v
   */
  set last_save_no_1(v) {
    era.set('flag:10020', v);
  },
  /**
   * 上次保存存档_2（flag:10021）
   * @returns {number}
   */
  get last_save_no_2() {
    return era.get('flag:10021') || 0;
  },
  /**
   * @param {number} v
   */
  set last_save_no_2(v) {
    era.set('flag:10021', v);
  },
  /**
   * 上次保存存档_3（flag:10022）
   * @returns {number}
   */
  get last_save_no_3() {
    return era.get('flag:10022') || 0;
  },
  /**
   * @param {number} v
   */
  set last_save_no_3(v) {
    era.set('flag:10022', v);
  },
  /**
   * 上次保存存档_4（flag:10023）
   * @returns {number}
   */
  get last_save_no_4() {
    return era.get('flag:10023') || 0;
  },
  /**
   * @param {number} v
   */
  set last_save_no_4(v) {
    era.set('flag:10023', v);
  },
  /**
   * 上次保存存档_5（flag:10024）
   * @returns {number}
   */
  get last_save_no_5() {
    return era.get('flag:10024') || 0;
  },
  /**
   * @param {number} v
   */
  set last_save_no_5(v) {
    era.set('flag:10024', v);
  },
  /**
   * 上次保存存档_6（flag:10025）
   * @returns {number}
   */
  get last_save_no_6() {
    return era.get('flag:10025') || 0;
  },
  /**
   * @param {number} v
   */
  set last_save_no_6(v) {
    era.set('flag:10025', v);
  },
  /**
   * 上次保存存档_7（flag:10026）
   * @returns {number}
   */
  get last_save_no_7() {
    return era.get('flag:10026') || 0;
  },
  /**
   * @param {number} v
   */
  set last_save_no_7(v) {
    era.set('flag:10026', v);
  },
  /**
   * 上次保存存档_8（flag:10027）
   * @returns {number}
   */
  get last_save_no_8() {
    return era.get('flag:10027') || 0;
  },
  /**
   * @param {number} v
   */
  set last_save_no_8(v) {
    era.set('flag:10027', v);
  },
  /**
   * 上次保存存档_9（flag:10028）
   * @returns {number}
   */
  get last_save_no_9() {
    return era.get('flag:10028') || 0;
  },
  /**
   * @param {number} v
   */
  set last_save_no_9(v) {
    era.set('flag:10028', v);
  },
  /**
   * 第1层陷阱A（flag:300）
   * @returns {number}
   */
  get floor_1_trap_a() {
    return era.get('flag:300') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_1_trap_a(v) {
    era.set('flag:300', v);
  },
  /**
   * 第2层陷阱A（flag:301）
   * @returns {number}
   */
  get floor_2_trap_a() {
    return era.get('flag:301') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_2_trap_a(v) {
    era.set('flag:301', v);
  },
  /**
   * 第3层陷阱A（flag:302）
   * @returns {number}
   */
  get floor_3_trap_a() {
    return era.get('flag:302') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_3_trap_a(v) {
    era.set('flag:302', v);
  },
  /**
   * 第4层陷阱A（flag:303）
   * @returns {number}
   */
  get floor_4_trap_a() {
    return era.get('flag:303') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_4_trap_a(v) {
    era.set('flag:303', v);
  },
  /**
   * 第5层陷阱A（flag:304）
   * @returns {number}
   */
  get floor_5_trap_a() {
    return era.get('flag:304') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_5_trap_a(v) {
    era.set('flag:304', v);
  },
  /**
   * 第6层陷阱A（flag:305）
   * @returns {number}
   */
  get floor_6_trap_a() {
    return era.get('flag:305') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_6_trap_a(v) {
    era.set('flag:305', v);
  },
  /**
   * 第7层陷阱A（flag:306）
   * @returns {number}
   */
  get floor_7_trap_a() {
    return era.get('flag:306') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_7_trap_a(v) {
    era.set('flag:306', v);
  },
  /**
   * 第8层陷阱A（flag:307）
   * @returns {number}
   */
  get floor_8_trap_a() {
    return era.get('flag:307') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_8_trap_a(v) {
    era.set('flag:307', v);
  },
  /**
   * 第9层陷阱A（flag:308）
   * @returns {number}
   */
  get floor_9_trap_a() {
    return era.get('flag:308') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_9_trap_a(v) {
    era.set('flag:308', v);
  },
  /**
   * 第1层陷阱B（flag:310）
   * @returns {number}
   */
  get floor_1_trap_b() {
    return era.get('flag:310') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_1_trap_b(v) {
    era.set('flag:310', v);
  },
  /**
   * 第2层陷阱B（flag:311）
   * @returns {number}
   */
  get floor_2_trap_b() {
    return era.get('flag:311') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_2_trap_b(v) {
    era.set('flag:311', v);
  },
  /**
   * 第3层陷阱B（flag:312）
   * @returns {number}
   */
  get floor_3_trap_b() {
    return era.get('flag:312') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_3_trap_b(v) {
    era.set('flag:312', v);
  },
  /**
   * 第4层陷阱B（flag:313）
   * @returns {number}
   */
  get floor_4_trap_b() {
    return era.get('flag:313') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_4_trap_b(v) {
    era.set('flag:313', v);
  },
  /**
   * 第5层陷阱B（flag:314）
   * @returns {number}
   */
  get floor_5_trap_b() {
    return era.get('flag:314') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_5_trap_b(v) {
    era.set('flag:314', v);
  },
  /**
   * 第6层陷阱B（flag:315）
   * @returns {number}
   */
  get floor_6_trap_b() {
    return era.get('flag:315') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_6_trap_b(v) {
    era.set('flag:315', v);
  },
  /**
   * 第7层陷阱B（flag:316）
   * @returns {number}
   */
  get floor_7_trap_b() {
    return era.get('flag:316') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_7_trap_b(v) {
    era.set('flag:316', v);
  },
  /**
   * 第8层陷阱B（flag:317）
   * @returns {number}
   */
  get floor_8_trap_b() {
    return era.get('flag:317') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_8_trap_b(v) {
    era.set('flag:317', v);
  },
  /**
   * 第9层陷阱B（flag:318）
   * @returns {number}
   */
  get floor_9_trap_b() {
    return era.get('flag:318') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_9_trap_b(v) {
    era.set('flag:318', v);
  },
  /**
   * 第1层陷阱C（flag:320）
   * @returns {number}
   */
  get floor_1_trap_c() {
    return era.get('flag:320') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_1_trap_c(v) {
    era.set('flag:320', v);
  },
  /**
   * 第2层陷阱C（flag:321）
   * @returns {number}
   */
  get floor_2_trap_c() {
    return era.get('flag:321') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_2_trap_c(v) {
    era.set('flag:321', v);
  },
  /**
   * 第3层陷阱C（flag:322）
   * @returns {number}
   */
  get floor_3_trap_c() {
    return era.get('flag:322') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_3_trap_c(v) {
    era.set('flag:322', v);
  },
  /**
   * 第4层陷阱C（flag:323）
   * @returns {number}
   */
  get floor_4_trap_c() {
    return era.get('flag:323') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_4_trap_c(v) {
    era.set('flag:323', v);
  },
  /**
   * 第5层陷阱C（flag:324）
   * @returns {number}
   */
  get floor_5_trap_c() {
    return era.get('flag:324') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_5_trap_c(v) {
    era.set('flag:324', v);
  },
  /**
   * 第6层陷阱C（flag:325）
   * @returns {number}
   */
  get floor_6_trap_c() {
    return era.get('flag:325') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_6_trap_c(v) {
    era.set('flag:325', v);
  },
  /**
   * 第7层陷阱C（flag:326）
   * @returns {number}
   */
  get floor_7_trap_c() {
    return era.get('flag:326') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_7_trap_c(v) {
    era.set('flag:326', v);
  },
  /**
   * 第8层陷阱C（flag:327）
   * @returns {number}
   */
  get floor_8_trap_c() {
    return era.get('flag:327') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_8_trap_c(v) {
    era.set('flag:327', v);
  },
  /**
   * 第9层陷阱C（flag:328）
   * @returns {number}
   */
  get floor_9_trap_c() {
    return era.get('flag:328') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_9_trap_c(v) {
    era.set('flag:328', v);
  },
  /**
   * 第1层宝箱（flag:340）
   * @returns {number}
   */
  get floor_1_treasure() {
    return era.get('flag:340') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_1_treasure(v) {
    era.set('flag:340', v);
  },
  /**
   * 第2层宝箱（flag:341）
   * @returns {number}
   */
  get floor_2_treasure() {
    return era.get('flag:341') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_2_treasure(v) {
    era.set('flag:341', v);
  },
  /**
   * 第3层宝箱（flag:342）
   * @returns {number}
   */
  get floor_3_treasure() {
    return era.get('flag:342') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_3_treasure(v) {
    era.set('flag:342', v);
  },
  /**
   * 第4层宝箱（flag:343）
   * @returns {number}
   */
  get floor_4_treasure() {
    return era.get('flag:343') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_4_treasure(v) {
    era.set('flag:343', v);
  },
  /**
   * 第5层宝箱（flag:344）
   * @returns {number}
   */
  get floor_5_treasure() {
    return era.get('flag:344') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_5_treasure(v) {
    era.set('flag:344', v);
  },
  /**
   * 第6层宝箱（flag:345）
   * @returns {number}
   */
  get floor_6_treasure() {
    return era.get('flag:345') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_6_treasure(v) {
    era.set('flag:345', v);
  },
  /**
   * 第7层宝箱（flag:346）
   * @returns {number}
   */
  get floor_7_treasure() {
    return era.get('flag:346') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_7_treasure(v) {
    era.set('flag:346', v);
  },
  /**
   * 第8层宝箱（flag:347）
   * @returns {number}
   */
  get floor_8_treasure() {
    return era.get('flag:347') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_8_treasure(v) {
    era.set('flag:347', v);
  },
  /**
   * 第9层宝箱（flag:348）
   * @returns {number}
   */
  get floor_9_treasure() {
    return era.get('flag:348') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_9_treasure(v) {
    era.set('flag:348', v);
  },
  /**
   * 第1层设施（flag:350）
   * @returns {number}
   */
  get floor_1_facility() {
    return era.get('flag:350') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_1_facility(v) {
    era.set('flag:350', v);
  },
  /**
   * 第2层设施（flag:351）
   * @returns {number}
   */
  get floor_2_facility() {
    return era.get('flag:351') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_2_facility(v) {
    era.set('flag:351', v);
  },
  /**
   * 第3层设施（flag:352）
   * @returns {number}
   */
  get floor_3_facility() {
    return era.get('flag:352') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_3_facility(v) {
    era.set('flag:352', v);
  },
  /**
   * 第4层设施（flag:353）
   * @returns {number}
   */
  get floor_4_facility() {
    return era.get('flag:353') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_4_facility(v) {
    era.set('flag:353', v);
  },
  /**
   * 第5层设施（flag:354）
   * @returns {number}
   */
  get floor_5_facility() {
    return era.get('flag:354') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_5_facility(v) {
    era.set('flag:354', v);
  },
  /**
   * 第6层设施（flag:355）
   * @returns {number}
   */
  get floor_6_facility() {
    return era.get('flag:355') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_6_facility(v) {
    era.set('flag:355', v);
  },
  /**
   * 第7层设施（flag:356）
   * @returns {number}
   */
  get floor_7_facility() {
    return era.get('flag:356') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_7_facility(v) {
    era.set('flag:356', v);
  },
  /**
   * 第8层设施（flag:357）
   * @returns {number}
   */
  get floor_8_facility() {
    return era.get('flag:357') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_8_facility(v) {
    era.set('flag:357', v);
  },
  /**
   * 第9层设施（flag:358）
   * @returns {number}
   */
  get floor_9_facility() {
    return era.get('flag:358') || 0;
  },
  /**
   * @param {number} v
   */
  set floor_9_facility(v) {
    era.set('flag:358', v);
  },
  /**
   * 肉便器数（flag:83）
   * @returns {number}
   */
  get meat_toilet_count() {
    return era.get('flag:83') || 0;
  },
  /**
   * @param {number} v
   */
  set meat_toilet_count(v) {
    era.set('flag:83', v);
  },
  /**
   * 展品数（flag:84）
   * @returns {number}
   */
  get exhibit_count() {
    return era.get('flag:84') || 0;
  },
  /**
   * @param {number} v
   */
  set exhibit_count(v) {
    era.set('flag:84', v);
  },
  /**
   * 处女献上后续发生方式（flag:38）
   * @returns {number}
   */
  get virgin_conceded_mode() {
    return era.get('flag:38') || 0;
  },
  /**
   * @param {number} v
   */
  set virgin_conceded_mode(v) {
    era.set('flag:38', v);
  },
  /**
   * 勇者相关杂项开关（flag:8）
   * @returns {number}
   */
  get adventurer_flags() {
    return era.get('flag:8') || 0;
  },
  /**
   * @param {number} v
   */
  set adventurer_flags(v) {
    era.set('flag:8', v);
  },
  /**
   * 休息（flag:0）
   * @returns {number}
   */
  get rest() {
    return era.get('flag:0') || 0;
  },
  /**
   * @param {number} v
   */
  set rest(v) {
    era.set('flag:0', v);
  },
  /**
   * 上次调教对象（flag:1）
   * @returns {number}
   */
  get last_train_target() {
    return era.get('flag:1') || 0;
  },
  /**
   * @param {number} v
   */
  set last_train_target(v) {
    era.set('flag:1', v);
  },
  /**
   * 上次助手（flag:2）
   * @returns {number}
   */
  get last_assistant() {
    return era.get('flag:2') || 0;
  },
  /**
   * @param {number} v
   */
  set last_assistant(v) {
    era.set('flag:2', v);
  },
  /**
   * 游戏设定（flag:5）
   * @returns {number}
   */
  get game_settings() {
    return era.get('flag:5') || 0;
  },
  /**
   * @param {number} v
   */
  set game_settings(v) {
    era.set('flag:5', v);
  },
  /**
   * 调教文本省略（flag:6）
   * @returns {number}
   */
  get train_text_omitted() {
    return era.get('flag:6') || 0;
  },
  /**
   * @param {number} v
   */
  set train_text_omitted(v) {
    era.set('flag:6', v);
  },
  /**
   * 口上开关（flag:7）
   * @returns {number}
   */
  get kojo_switch() {
    return era.get('flag:7') || 0;
  },
  /**
   * @param {number} v
   */
  set kojo_switch(v) {
    era.set('flag:7', v);
  },
  /**
   * 录像开始状况（flag:22）
   * @returns {number}
   */
  get video_start_state() {
    return era.get('flag:22') || 0;
  },
  /**
   * @param {number} v
   */
  set video_start_state(v) {
    era.set('flag:22', v);
  },
  /**
   * 指令过滤（flag:25）
   * @returns {number}
   */
  get order_filter() {
    return era.get('flag:25') || 0;
  },
  /**
   * @param {number} v
   */
  set order_filter(v) {
    era.set('flag:25', v);
  },
  /**
   * 种族年龄设定_0（flag:26）
   * @returns {number}
   */
  get race_age_setting_0() {
    return era.get('flag:26') || 0;
  },
  /**
   * @param {number} v
   */
  set race_age_setting_0(v) {
    era.set('flag:26', v);
  },
  /**
   * 种族年龄设定_1（flag:27）
   * @returns {number}
   */
  get race_age_setting_1() {
    return era.get('flag:27') || 0;
  },
  /**
   * @param {number} v
   */
  set race_age_setting_1(v) {
    era.set('flag:27', v);
  },
  /**
   * 爱或淫乱人数（flag:30）
   * @returns {number}
   */
  get love_or_lewd_count() {
    return era.get('flag:30') || 0;
  },
  /**
   * @param {number} v
   */
  set love_or_lewd_count(v) {
    era.set('flag:30', v);
  },
  /**
   * 杀死人数（flag:31）
   * @returns {number}
   */
  get kill_count() {
    return era.get('flag:31') || 0;
  },
  /**
   * @param {number} v
   */
  set kill_count(v) {
    era.set('flag:31', v);
  },
  /**
   * 爱之奴隶所生（flag:32）
   * @returns {number}
   */
  get born_of_love_slave() {
    return era.get('flag:32') || 0;
  },
  /**
   * @param {number} v
   */
  set born_of_love_slave(v) {
    era.set('flag:32', v);
  },
  /**
   * 技巧素质道具数（flag:33）
   * @returns {number}
   */
  get skill_talent_item_count() {
    return era.get('flag:33') || 0;
  },
  /**
   * @param {number} v
   */
  set skill_talent_item_count(v) {
    era.set('flag:33', v);
  },
  /**
   * 自动购买设定（flag:34）
   * @returns {number}
   */
  get auto_buying_settings() {
    return era.get('flag:34') || 0;
  },
  /**
   * @param {number} v
   */
  set auto_buying_settings(v) {
    era.set('flag:34', v);
  },
  /**
   * 濒死自动结束调教（flag:35）
   * @returns {number}
   */
  get auto_end_train_when_dying() {
    return era.get('flag:35') || 0;
  },
  /**
   * @param {number} v
   */
  set auto_end_train_when_dying(v) {
    era.set('flag:35', v);
  },
  /**
   * 显示模式（flag:36）
   * @returns {number}
   */
  get display_mode() {
    return era.get('flag:36') || 0;
  },
  /**
   * @param {number} v
   */
  set display_mode(v) {
    era.set('flag:36', v);
  },
  /**
   * 着衣系统（flag:37）
   * @returns {number}
   */
  get clothing_system() {
    return era.get('flag:37') || 0;
  },
  /**
   * @param {number} v
   */
  set clothing_system(v) {
    era.set('flag:37', v);
  },
  /**
   * 设施追加人数（flag:40）
   * @returns {number}
   */
  get facility_headcount() {
    return era.get('flag:40') || 0;
  },
  /**
   * @param {number} v
   */
  set facility_headcount(v) {
    era.set('flag:40', v);
  },
  /**
   * 设施建造位（flag:48）
   * @returns {number}
   */
  get facility_bitmap() {
    return era.get('flag:48') || 0;
  },
  /**
   * @param {number} v
   */
  set facility_bitmap(v) {
    era.set('flag:48', v);
  },
  /**
   * 勇者基础等级修正（flag:60）
   * @returns {number}
   */
  get hero_base_level_bonus() {
    return era.get('flag:60') || 0;
  },
  /**
   * @param {number} v
   */
  set hero_base_level_bonus(v) {
    era.set('flag:60', v);
  },
  /**
   * 每日香料购买数（flag:61）
   * @returns {number}
   */
  get daily_spice_purchase() {
    return era.get('flag:61') || 0;
  },
  /**
   * @param {number} v
   */
  set daily_spice_purchase(v) {
    era.set('flag:61', v);
  },
  /**
   * 肉便器行动（flag:62）
   * @returns {number}
   */
  get benki_behavior() {
    return era.get('flag:62') || 0;
  },
  /**
   * @param {number} v
   */
  set benki_behavior(v) {
    era.set('flag:62', v);
  },
  /**
   * 肉便器常识改写（flag:63）
   * @returns {number}
   */
  get benki_common_sense() {
    return era.get('flag:63') || 0;
  },
  /**
   * @param {number} v
   */
  set benki_common_sense(v) {
    era.set('flag:63', v);
  },
  /**
   * 肉便器侍奉对象（flag:64）
   * @returns {number}
   */
  get benki_service_target() {
    return era.get('flag:64') || 0;
  },
  /**
   * @param {number} v
   */
  set benki_service_target(v) {
    era.set('flag:64', v);
  },
  /**
   * 失神机能关闭（flag:70）
   * @returns {number}
   */
  get passout_disabled() {
    return era.get('flag:70') || 0;
  },
  /**
   * @param {number} v
   */
  set passout_disabled(v) {
    era.set('flag:70', v);
  },
  /**
   * 自由调教跳转（flag:71）
   * @returns {number}
   */
  get free_train_jump() {
    return era.get('flag:71') || 0;
  },
  /**
   * @param {number} v
   */
  set free_train_jump(v) {
    era.set('flag:71', v);
  },
  /**
   * 精饮机能关闭（flag:72）
   * @returns {number}
   */
  get semen_drink_disabled() {
    return era.get('flag:72') || 0;
  },
  /**
   * @param {number} v
   */
  set semen_drink_disabled(v) {
    era.set('flag:72', v);
  },
  /**
   * 强化素质关闭（flag:73）
   * @returns {number}
   */
  get super_talent_disabled() {
    return era.get('flag:73') || 0;
  },
  /**
   * @param {number} v
   */
  set super_talent_disabled(v) {
    era.set('flag:73', v);
  },
  /**
   * 时常发情关闭（flag:75）
   * @returns {number}
   */
  get always_aroused_disabled() {
    return era.get('flag:75') || 0;
  },
  /**
   * @param {number} v
   */
  set always_aroused_disabled(v) {
    era.set('flag:75', v);
  },
  /**
   * 外来勇者等级上限（flag:76）
   * @returns {number}
   */
  get foreign_hero_level_cap() {
    return era.get('flag:76') || 0;
  },
  /**
   * @param {number} v
   */
  set foreign_hero_level_cap(v) {
    era.set('flag:76', v);
  },
  /**
   * 通信勇者登场压级（flag:77）
   * @returns {number}
   */
  get communication_hero_level_one() {
    return era.get('flag:77') || 0;
  },
  /**
   * @param {number} v
   */
  set communication_hero_level_one(v) {
    era.set('flag:77', v);
  },
  /**
   * 处刑勇者数（flag:80）
   * @returns {number}
   */
  get executed_hero_count() {
    return era.get('flag:80') || 0;
  },
  /**
   * @param {number} v
   */
  set executed_hero_count(v) {
    era.set('flag:80', v);
  },
  /**
   * 陷阱等级（flag:85）
   * @returns {number}
   */
  get trap_level() {
    return era.get('flag:85') || 0;
  },
  /**
   * @param {number} v
   */
  set trap_level(v) {
    era.set('flag:85', v);
  },
  /**
   * 口上存在_0（flag:100）
   * @returns {number}
   */
  get kojo_exists_0() {
    return era.get('flag:100') || 0;
  },
  /**
   * @param {number} v
   */
  set kojo_exists_0(v) {
    era.set('flag:100', v);
  },
  /**
   * 口上存在_1（flag:101）
   * @returns {number}
   */
  get kojo_exists_1() {
    return era.get('flag:101') || 0;
  },
  /**
   * @param {number} v
   */
  set kojo_exists_1(v) {
    era.set('flag:101', v);
  },
  /**
   * 口上存在_2（flag:102）
   * @returns {number}
   */
  get kojo_exists_2() {
    return era.get('flag:102') || 0;
  },
  /**
   * @param {number} v
   */
  set kojo_exists_2(v) {
    era.set('flag:102', v);
  },
  /**
   * 口上存在_3（flag:103）
   * @returns {number}
   */
  get kojo_exists_3() {
    return era.get('flag:103') || 0;
  },
  /**
   * @param {number} v
   */
  set kojo_exists_3(v) {
    era.set('flag:103', v);
  },
  /**
   * 口上存在_4（flag:104）
   * @returns {number}
   */
  get kojo_exists_4() {
    return era.get('flag:104') || 0;
  },
  /**
   * @param {number} v
   */
  set kojo_exists_4(v) {
    era.set('flag:104', v);
  },
  /**
   * 口上存在_5（flag:105）
   * @returns {number}
   */
  get kojo_exists_5() {
    return era.get('flag:105') || 0;
  },
  /**
   * @param {number} v
   */
  set kojo_exists_5(v) {
    era.set('flag:105', v);
  },
  /**
   * 口上存在_6（flag:106）
   * @returns {number}
   */
  get kojo_exists_6() {
    return era.get('flag:106') || 0;
  },
  /**
   * @param {number} v
   */
  set kojo_exists_6(v) {
    era.set('flag:106', v);
  },
  /**
   * 口上存在_7（flag:107）
   * @returns {number}
   */
  get kojo_exists_7() {
    return era.get('flag:107') || 0;
  },
  /**
   * @param {number} v
   */
  set kojo_exists_7(v) {
    era.set('flag:107', v);
  },
  /**
   * 口上存在_8（flag:108）
   * @returns {number}
   */
  get kojo_exists_8() {
    return era.get('flag:108') || 0;
  },
  /**
   * @param {number} v
   */
  set kojo_exists_8(v) {
    era.set('flag:108', v);
  },
  /**
   * 口上存在_9（flag:109）
   * @returns {number}
   */
  get kojo_exists_9() {
    return era.get('flag:109') || 0;
  },
  /**
   * @param {number} v
   */
  set kojo_exists_9(v) {
    era.set('flag:109', v);
  },
  /**
   * 口上存在_10（flag:110）
   * @returns {number}
   */
  get kojo_exists_10() {
    return era.get('flag:110') || 0;
  },
  /**
   * @param {number} v
   */
  set kojo_exists_10(v) {
    era.set('flag:110', v);
  },
  /**
   * 口上存在_11（flag:111）
   * @returns {number}
   */
  get kojo_exists_11() {
    return era.get('flag:111') || 0;
  },
  /**
   * @param {number} v
   */
  set kojo_exists_11(v) {
    era.set('flag:111', v);
  },
  /**
   * 口上存在_12（flag:112）
   * @returns {number}
   */
  get kojo_exists_12() {
    return era.get('flag:112') || 0;
  },
  /**
   * @param {number} v
   */
  set kojo_exists_12(v) {
    era.set('flag:112', v);
  },
  /**
   * 口上存在_13（flag:113）
   * @returns {number}
   */
  get kojo_exists_13() {
    return era.get('flag:113') || 0;
  },
  /**
   * @param {number} v
   */
  set kojo_exists_13(v) {
    era.set('flag:113', v);
  },
  /**
   * 口上存在_14（flag:114）
   * @returns {number}
   */
  get kojo_exists_14() {
    return era.get('flag:114') || 0;
  },
  /**
   * @param {number} v
   */
  set kojo_exists_14(v) {
    era.set('flag:114', v);
  },
  /**
   * 口上存在_15（flag:115）
   * @returns {number}
   */
  get kojo_exists_15() {
    return era.get('flag:115') || 0;
  },
  /**
   * @param {number} v
   */
  set kojo_exists_15(v) {
    era.set('flag:115', v);
  },
  /**
   * 口上存在_19（flag:119）
   * @returns {number}
   */
  get kojo_exists_19() {
    return era.get('flag:119') || 0;
  },
  /**
   * @param {number} v
   */
  set kojo_exists_19(v) {
    era.set('flag:119', v);
  },
  /**
   * 勇者入场_23（flag:223）
   * @returns {number}
   */
  get hero_entry_23() {
    return era.get('flag:223') || 0;
  },
  /**
   * @param {number} v
   */
  set hero_entry_23(v) {
    era.set('flag:223', v);
  },
  /**
   * 派遣奴隶标志（flag:402）
   * @returns {number}
   */
  get dispatched_slave() {
    return era.get('flag:402') || 0;
  },
  /**
   * @param {number} v
   */
  set dispatched_slave(v) {
    era.set('flag:402', v);
  },
  /**
   * 狂王性别（flag:500）
   * @returns {number}
   */
  get crazylord_gender() {
    return era.get('flag:500') || 0;
  },
  /**
   * @param {number} v
   */
  set crazylord_gender(v) {
    era.set('flag:500', v);
  },
  /**
   * 初期奴隶类型（flag:501）
   * @returns {number}
   */
  get initial_slave_type() {
    return era.get('flag:501') || 0;
  },
  /**
   * @param {number} v
   */
  set initial_slave_type(v) {
    era.set('flag:501', v);
  },
  /**
   * 指令菜单长度（flag:550）
   * @returns {number}
   */
  get order_menu_length() {
    return era.get('flag:550') || 0;
  },
  /**
   * @param {number} v
   */
  set order_menu_length(v) {
    era.set('flag:550', v);
  },
  /**
   * 石像数（flag:600）
   * @returns {number}
   */
  get stone_statue_count() {
    return era.get('flag:600') || 0;
  },
  /**
   * @param {number} v
   */
  set stone_statue_count(v) {
    era.set('flag:600', v);
  },
  /**
   * 剥制数（flag:601）
   * @returns {number}
   */
  get taxidermy_count() {
    return era.get('flag:601') || 0;
  },
  /**
   * @param {number} v
   */
  set taxidermy_count(v) {
    era.set('flag:601', v);
  },
  /**
   * 蜡像数（flag:602）
   * @returns {number}
   */
  get wax_statue_count() {
    return era.get('flag:602') || 0;
  },
  /**
   * @param {number} v
   */
  set wax_statue_count(v) {
    era.set('flag:602', v);
  },
  /**
   * 人偶数_服装（flag:603）
   * @returns {number}
   */
  get doll_clothed_count() {
    return era.get('flag:603') || 0;
  },
  /**
   * @param {number} v
   */
  set doll_clothed_count(v) {
    era.set('flag:603', v);
  },
  /**
   * 人偶数_球形关节（flag:604）
   * @returns {number}
   */
  get doll_ball_joint_count() {
    return era.get('flag:604') || 0;
  },
  /**
   * @param {number} v
   */
  set doll_ball_joint_count(v) {
    era.set('flag:604', v);
  },
  /**
   * 金属像数（flag:605）
   * @returns {number}
   */
  get metal_statue_count() {
    return era.get('flag:605') || 0;
  },
  /**
   * @param {number} v
   */
  set metal_statue_count(v) {
    era.set('flag:605', v);
  },
  /**
   * 冰像数（flag:606）
   * @returns {number}
   */
  get ice_statue_count() {
    return era.get('flag:606') || 0;
  },
  /**
   * @param {number} v
   */
  set ice_statue_count(v) {
    era.set('flag:606', v);
  },
  /**
   * 金属像数_2（flag:607）
   * @returns {number}
   */
  get metal_statue_count_2() {
    return era.get('flag:607') || 0;
  },
  /**
   * @param {number} v
   */
  set metal_statue_count_2(v) {
    era.set('flag:607', v);
  },
  /**
   * 家具数（flag:608）
   * @returns {number}
   */
  get furniture_count() {
    return era.get('flag:608') || 0;
  },
  /**
   * @param {number} v
   */
  set furniture_count(v) {
    era.set('flag:608', v);
  },
  /**
   * 绘画数（flag:609）
   * @returns {number}
   */
  get painting_count() {
    return era.get('flag:609') || 0;
  },
  /**
   * @param {number} v
   */
  set painting_count(v) {
    era.set('flag:609', v);
  },
  /**
   * 喷水像_石（flag:611）
   * @returns {number}
   */
  get fountain_stone_count() {
    return era.get('flag:611') || 0;
  },
  /**
   * @param {number} v
   */
  set fountain_stone_count(v) {
    era.set('flag:611', v);
  },
  /**
   * 喷水像_金属（flag:612）
   * @returns {number}
   */
  get fountain_metal_count() {
    return era.get('flag:612') || 0;
  },
  /**
   * @param {number} v
   */
  set fountain_metal_count(v) {
    era.set('flag:612', v);
  },
  /**
   * 人间牧场竿役（flag:613）
   * @returns {number}
   */
  get ranch_stud() {
    return era.get('flag:613') || 0;
  },
  /**
   * @param {number} v
   */
  set ranch_stud(v) {
    era.set('flag:613', v);
  },
  /**
   * 人类牧场设定（flag:614）
   * @returns {number}
   */
  get ranch_display_settings() {
    return era.get('flag:614') || 0;
  },
  /**
   * @param {number} v
   */
  set ranch_display_settings(v) {
    era.set('flag:614', v);
  },
  /**
   * 触手回合计数（flag:10030）
   * @returns {number}
   */
  get tentacle_round() {
    return era.get('flag:10030') || 0;
  },
  /**
   * @param {number} v
   */
  set tentacle_round(v) {
    era.set('flag:10030', v);
  },
};
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
