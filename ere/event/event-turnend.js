/**
 * @file 回合结束事件 @EVENTTURNEND 的 #PRI 档定义（issue #114 真身；#44 曾以
 * 壳承载调教闭环的出口）。
 *
 * 源: target/ERB/EVENT/EVENT_TURNEND.ERB  @EVENTTURNEND（:8-139 本体 + :140
 * BEGIN SHOP，#PRI 档）
 *
 * 原作 @EVENTTURNEND 有三处定义（#6 的论证样本），本文件是第一处：
 *   - #PRI（本文件）：时段推进 TIME 0→1→0、TIME==1 时的日推进与日程事件；
 *   - 普通档（SYSTEM ver1.0.3.ERB:234-760，回合结算本体：HP/装备回复、队伍
 *     设定、迷宫处理，尾部 :758 BEGIN SHOP）——ere/system/turnend-settle.js；
 *   - #LATER（EVENT/ENDING ver 1.0.1.ERB:1-3，空）——ere/event/event-turnend-later.js。
 * 三者在同一条链上先后执行（#6 语义：BEGIN 只暂存跳转、链继续，最后的
 * BEGIN 胜出；两个出口同为 SHOP，覆盖不产生差异）。
 *
 * 移植说明：
 *   - 原作两处 FOR TARGET 循环以 TARGET 为循环变量、被调函数隐式读它；ere
 *     侧指针不隐式传（#5 决议第六条），循环按角色 ID 显式进行（era.
 *     getAddedCharacters()，对应原作 0..CHARANUM-1 的已加入序号全体），被调
 *     实现落地时以参数承接。
 *   - 体外函数全部存根（运行时打占位行，名单见 STUBBED_CALLS，登记
 *     docs/stub-registry.md）：判定与妊娠六件、ENTER_ENEMY、EVENT_NEXTDAY/
 *     EVENT_NEXTMONTH（#115）、AUTO_BUYING、DEBUG_CHECK。
 *   - :31-51 原作注释掉的死亡删除段，1:1 不移植（照原样保持注释状态）。
 */

const era = require('#/era-electron');
const { on, TIER } = require('#/system/event/registry');
const { begin, STATE } = require('#/system/flow/begin-signal');
const era_flag = require('#/era-utils/era-flag');
const { stub_line } = require('#/utils/stub-line');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。
 */
const STUBBED_CALLS = [
  'CHECK_SELLASSIABLE',
  'CHECK_SPECIALSKIL',
  'IN_VAGINA_ALL',
  'CONCEPTION_CHECK_ALL',
  'IN_VAGINA_EXTRA',
  'CONCEPTION_CHECK_EXTRA',
  'IN_VAGINA_KYOUOU_TO_T',
  'CONCEPTION_CHECK_KYOUOU_TO_T',
  'IN_VAGINA_NTRD_TO_T',
  'CONCEPTION_CHECK_NTRD_TO_T',
  'EVENT_NEXTDAY',
  'EVENT_NEXTMONTH',
  'ENTER_ENEMY',
  'AUTO_BUYING',
  'DEBUG_CHECK',
];

on(
  'EVENTTURNEND',
  async () => {
    // :13-27 全角色判定循环（LOCAL = TARGET 暂存 → FOR TARGET,0,CHARANUM →
    // 原样还原）。CHECK_SPECIALSKIL 只对非当前目标执行（原行 19 的 SIF TARGET != LOCAL）。
    const saved_target = era_flag.target;
    for (const cid of era.getAddedCharacters()) {
      stub_line('CHECK_SELLASSIABLE', '可售/可助手判定');
      if (cid !== saved_target) {
        stub_line('CHECK_SPECIALSKIL', '特殊素质获得判定');
      }
      stub_line('IN_VAGINA_ALL', '妊娠判定');
      stub_line('CONCEPTION_CHECK_ALL', '妊娠确定处理');
    }

    // :31-51 完全死亡角色的删除段：原作整段注释掉，1:1 保持不移植。

    // :54 休憩标志外す（flag:0 = 休息，@EVENTSHOP 的 199 休息置位、此处复位）
    era.set('flag:0', 0);

    // :57 午后（TIME==1）则进次日、午前（TIME==0）则进午后
    if (era_flag.time === 1) {
      // :61-74 妊判第二组（卖春/狂王兽奸/NTR 各两件，全角色；占位行不依
      // 赖角色身份，逐角色重复一次即可）
      era.getAddedCharacters().forEach(() => {
        stub_line('IN_VAGINA_EXTRA', '卖春妊娠判定');
        stub_line('CONCEPTION_CHECK_EXTRA', '卖春妊娠确定');
        stub_line('IN_VAGINA_KYOUOU_TO_T', '狂王兽奸妊娠判定');
        stub_line('CONCEPTION_CHECK_KYOUOU_TO_T', '狂王兽奸妊娠确定');
        stub_line('IN_VAGINA_NTRD_TO_T', 'NTR 妊娠判定');
        stub_line('CONCEPTION_CHECK_NTRD_TO_T', 'NTR 妊娠确定');
      });

      // :77 日期更换时的事件（日程推进，#115 落真身；全库唯此一处调用）
      stub_line('EVENT_NEXTDAY', '日程推进');

      // :79-91 日推进：DAY:0 天数 +1；DAY:2 日 +1，超过 28 触发月替（
      // EVENT_NEXTMONTH，#115）；DAY:3 星期 +1，日曜（6）的次日回月曜（0）
      era_flag.day_count += 1;
      era_flag.date += 1;
      if (era_flag.date > 28) {
        // 毎月 29 日以上になってたら月替わり処理（行 81-84）
        stub_line('EVENT_NEXTMONTH', '月替处理');
      }
      era_flag.weekday += 1;
      if (era_flag.weekday > 6) {
        // 日曜の次は月曜にする（行 86-89）
        era_flag.weekday = 0;
      }

      // TIME = 0（次日午前，行 91）
      era_flag.time = 0;

      // :93 随机遇敌的第一件（参数 0）
      stub_line('ENTER_ENEMY', '随机遇敌');

      // :95-107 宣言数 SENGEN/SENGENMAX（EX_FLAG:9012 = 宣言回数）。EX_FLAG
      // 表未落地（#113），读无可读，此处按 0 承接——落表后换真读。DAY 分档
      // 依原作（>=100/>=300/>=500 各减一档，注意原作 IF 顺序：DAY >= 500 的
      // 分支因 >= 100 先命中而不可达，1:1 照搬）
      const ex_flag_9012 = 0; // TODO(#113): EX_FLAG:9012 落表后改真读
      const day = era_flag.day_count;
      let sengen;
      let sengenmax;
      if (day >= 100) {
        sengen = ex_flag_9012 - 2;
        sengenmax = 12 - 2;
      } else if (day >= 300) {
        sengen = ex_flag_9012 - 3;
        sengenmax = 12 - 3;
      } else if (day >= 500) {
        sengen = ex_flag_9012 - 4;
        sengenmax = 12 - 4;
      } else {
        sengen = ex_flag_9012 - 2;
        sengenmax = 12 - 1;
      }
      // :108-120 上限钳制、按 DAY 追加遇敌、下限修正（EX_FLAG:9012 == 0 时
      // SENGEN 归 0，追加循环不发生）
      if (sengen >= sengenmax) {
        sengen = sengenmax;
      }
      if (day >= 100) {
        stub_line('ENTER_ENEMY', '随机遇敌');
      }
      if (day >= 300) {
        stub_line('ENTER_ENEMY', '随机遇敌');
      }
      if (day >= 500) {
        stub_line('ENTER_ENEMY', '随机遇敌');
      }
      if (sengen <= 0 && ex_flag_9012 > 0) {
        sengen = 1;
      }
      if (ex_flag_9012 === 0) {
        sengen = 0;
      }
      // :121-125 IF SENGEN > 0：FOR EFFECT, 0, SENGEN 追加遇敌
      for (let effect = 0; effect < sengen; effect += 1) {
        stub_line('ENTER_ENEMY', '随机遇敌');
      }
    } else {
      // :126-128 午前 → 午后
      era_flag.time = 1;
    }

    // :131 道具自动购入（AUTO_BUYING，触发位 FLAG:34 由开局设置产生、当前
    // 恒 0，正文 :145-167 随开局设置票）
    stub_line('AUTO_BUYING', '道具自动购入');

    // :134-135 调教对象与助手清空
    era_flag.target = -1;
    era_flag.assi = -1;

    // :137-138 反作弊检查（!反作弊 时执行）。反作弊是 SAVEDATA 自定义变量
    // （魔改新增/魔改使用.ERH:15），无 ere 落点、恒 0 → 每回合执行；其函数体
    // :170-334（反作弊爆炸三事件）读写 EX_FLAG:2801-2804/4444，随 #113 落表
    stub_line('DEBUG_CHECK', '反作弊检查');

    // :140 BEGIN SHOP —— 无条件出口（链继续，普通档与 #LATER 随后执行，
    // #6 用 emuera.log 证明的原作行为）
    begin(STATE.SHOP);
  },
  TIER.PRI,
);

module.exports = { STUBBED_CALLS };
