/**
 * @file flag 表的具名访问器初稿（tools/gen-wrapper.js 自 yml/Flag.yml 生成）。
 *
 * 生成区（GENERATED 标记之间）由脚本维护，重生成加 --force；
 * 标记之外是手写区：变量语义补注、业务方法，重新生成不会触碰（#11 决议）。
 * 变量的原作语义与来源写进手写区补注（AGENTS.md「变量语义必须注释」）。
 */

const era = require('#/era-electron');

// GENERATED START —— tools/gen-wrapper.js 自 yml/Flag.yml 生成，勿手改；重新生成（--force）只替换本标记之间
const era_flag = {
  /**
   * 特别税加成（flag:9 ↔ FLAG:9）
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
   * 人间界侵攻度（flag:81 ↔ FLAG:81）
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
   * 人间界陷落（flag:82 ↔ FLAG:82）
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
   * 人间界侵略事件进度（flag:93 ↔ FLAG:93）
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
   * 精灵领域侵攻度（flag:86 ↔ FLAG:86）
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
   * 精灵领域征服（flag:87 ↔ FLAG:87）
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
   * 龙之山脉侵攻度（flag:88 ↔ FLAG:88）
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
   * 龙之山脉征服（flag:89 ↔ FLAG:89）
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
   * 天界侵攻度（flag:90 ↔ FLAG:90）
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
   * 天界征服（flag:91 ↔ FLAG:91）
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
   * 勇者战役中（flag:400 ↔ FLAG:400）
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
   * 二维地图模式（flag:502 ↔ FLAG:502）
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
   * 葵希罗线（flag:2815 ↔ FLAG:2815）
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
   * 反叛结局（flag:2816 ↔ FLAG:2816）
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
   * 天数（flag:10000 ↔ FLAG:10000）
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
   * 月（flag:10001 ↔ FLAG:10001）
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
   * 日（flag:10002 ↔ FLAG:10002）
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
   * 时段（flag:10003 ↔ FLAG:10003）
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
   * 所持金（flag:10004 ↔ FLAG:10004）
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
   * 目标（flag:10005 ↔ FLAG:10005）
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
   * 助手（flag:10006 ↔ FLAG:10006）
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
   * 助手参与调教（flag:10007 ↔ FLAG:10007）
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
   * 调教者（flag:10008 ↔ FLAG:10008）
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
   * 上次指令（flag:10009 ↔ FLAG:10009）
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
   * 下次指令（flag:10010 ↔ FLAG:10010）
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
   * 当前指令（flag:10011 ↔ FLAG:10011）
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
   * 记录调教对象（flag:10012 ↔ FLAG:10012）
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
   * 记录助手（flag:10013 ↔ FLAG:10013）
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
   * 暂存主人（flag:10014 ↔ FLAG:10014）
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
   * 暂存目标（flag:10015 ↔ FLAG:10015）
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
   * 暂存助手（flag:10016 ↔ FLAG:10016）
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
   * 星期（flag:10017 ↔ FLAG:10017）
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
};
// GENERATED END

// —— 手写区（重新生成不会触碰）——
//
// 存读档域指针（#136 并入；生成区的「↔ FLAG:100xx」注释同样失真，以此处
// 为准）：
//   last_load_no  LASTLOAD_NO  Emuera 内建只读变量（LOADDATA 时引擎设置）。
//       ere 无内建等价物，由 page-save-load 在读档成功后写入，随存档保存
//       （原作语义同）。**兜底必须用 ?? 而非 ||**：0 是有效槽号，|| 0 会把
//       「未读过」（undefined）伪装成「读过 0 号」，高亮随之打错槽。
//   last_save_no  LASTSAVE_NO:0  最近一次保存的槽号（其他/VARIABLES.ERH:16
//       `#DIM LASTSAVE_NO,10 = -1` 的首元素——@SYSTEM_LIST_DATA 的裸名比较
//       只读 [0]，[1..9] 的历史记录由 page-save-load 直写 flag:10020..10028）。
//       兜底同样用 ?? -1（初值 -1 = 没存过）。

Object.defineProperty(era_flag, 'last_load_no', {
  configurable: true,
  /** 最近读档槽号（flag:10018 ↔ LASTLOAD_NO）@type {number} */
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
  /** 最近保存槽号（flag:10019 ↔ LASTSAVE_NO:0）@type {number} */
  get() {
    return era.get('flag:10019') ?? -1;
  },
  /** @param {number} v */
  set(v) {
    era.set('flag:10019', v);
  },
});

//
// 变量语义补注（原作语义 + 来源，AGENTS.md「变量语义必须注释」）：
//
// 生成区的「↔ FLAG:1000x」注释对 10000 保留区失真——这七个条目不是原作
// FLAG 的下标，而是 #5 决议并入 flag 的 Emuera 内置变量（原作侧名字见下），
// 生成器只按表名大写拼注释，改不了，以此处为准：
//
//   day_count  DAY:0  天数计数（经年累月的日数，主菜单「第{DAY/365}年」与
//       「第{DAY+1}日」的读数源）。原作 @EVENTFIRST 不初始化它、留 0，
//       1:1 照搬——勿自作主张补成第 1 天（DRAW_MAINMENU.ERB:56-58）。
//   month      DAY:1  月份。开局置 1（SYSTEM ver1.0.3.ERB:33，@EVENTFIRST）。
//   date       DAY:2  日。原作开局不写、留 0——主菜单如实显示「1月0日」，
//       这是原作行为，不是漏移植（DRAW_MAINMENU.ERB:57）。
//   time       TIME   时段：0=上午、1=下午（@SAVEINFO 与主菜单的上午/下午
//       判据）。开局不写、留 0。
//   weekday    DAY:3  星期（0=月曜…6=日曜，原作注释「日曜の次は月曜にする」）。
//       @EVENTTURNEND 的日推进 +1、超过 6 回 0（EVENT_TURNEND.ERB:86-89）；
//       开局不写、留 0（#114 并入保留区）。
//   money      MONEY  持有金钱（单位 pts.，_replace.csv 的 お金の単位 归
//       游戏代码，#10 决议）。开局 10000（SYSTEM ver1.0.3.ERB:55）。
//   target     TARGET 角色指针（#5 决议第六条：指针占 flag 槽位，函数间一律
//       显式传参、不隐式读全局）：-1=未选中。开局置 -1（同文件 :26）。
//   assi       ASSI   助手指针：0=无。原作开局不显式初始化（Emuera 零值），
//       照搬留 0。
//
// 调教域内置变量（#44 T14 并入；生成区的「↔ FLAG:100xx」注释同样失真，
// 以此处为准）：
//   assiplay     ASSIPLAY:0  助手是否参与调教：0=主人亲自调教、1=助手调教。
//       BEGIN TRAIN 时引擎清 0（train-loop.js 的引擎初始化段镜像）。
//   player       PLAYER      当前调教者（视角角色）：@EVENTTRAIN 依 ASSIPLAY
//       置 MASTER 或 ASSI（TRAIN_MAIN.ERB:45-49）；@USERCOM 的 102/112
//       分支会切换（随指令票）。
//   prevcom      PREVCOM:0   上次调教指令编号：BEGIN TRAIN 时引擎置 -1，
//       指令执行后由引擎更新为 SELECTCOM；@SHOW_USERCOM 的「上次的调教
//       指令」读它（> -1 才显示）。
//   nextcom      NEXTCOM:0   下次指令编号：BEGIN TRAIN 时引擎置 -1。Emuera
//       官方标注有已知缺陷、不推荐使用（system-flow.md 注意事项 3），ere
//       侧只镜像初始化，暂无消费者。
//   selectcom    SELECTCOM   当前回合玩家选定的指令编号：回合循环的输入
//       检查设定（train-loop.js），口上与指令实现读它。
//   target_record  TARGET:1  @EVENTTRAIN 记录的调教对象（TRAIN_MAIN.ERB:52，
//       「以备人物切换」）；@EVENTEND 写回 FLAG:1 并在尾部还原指针。
//   assi_record    ASSI:1    同上，记录的助手（:51）。
//   master_backup  T:10      @PRITRAIN_MESSAGE 开头暂存的 MASTER
//       （EVENT_BEFORETRAIN.ERB:11-13，注释「避免角色错乱的暂存纪录」）；
//       @EVENTEND 复位角色时读回（TRAIN_MAIN.ERB:320）。T 是 Emuera 单字母
//       内置数组，这里只落调教路径用到的三个元素。
//   target_backup  T:11      同上，暂存的 TARGET（:321 复位）。
//   assi_backup    T:12      同上，暂存的 ASSI（:323 复位；SIF ASSI 才写）。
//
// 原作 FLAG:N 条目（0-9999）随各子系统票按原下标 1:1 增补进 yml/Flag.yml
// 后重生成；底层直写未声明下标也能落（flag 是引擎内嵌表，app.asar 实证），
// 但读侧必须走本包装层或有注释的直读（#13：未声明读值得 undefined）。

module.exports = era_flag;
