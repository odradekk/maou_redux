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
};
// GENERATED END

// —— 手写区（重新生成不会触碰）——
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
