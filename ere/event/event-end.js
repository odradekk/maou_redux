/**
 * @file 调教结束事件 @EVENTEND 的处理器（issue #44，#LATER 档真身）。
 *
 * 源: target/ERB/調教相關/TRAIN_MAIN.ERB  @EVENTEND（:314-429，#LATER）
 *
 * STATE.AFTERTRAIN 的主体（train-loop.js 的 run_aftertrain 发起链、收尾
 * era.endTrain）。直线赋值与判定 1:1 照搬；死亡删除分支（:363-375）内的
 * BEGIN TURNEND 会当场结束本函数（#6 语义：BEGIN 结束当前函数、链继续），
 * 其后的善恶值/时常发情/气力回复/JUEL_CHECK/指针还原按原作一并跳过。
 *
 * 原存根已全部换真身：SELF_CHECK / AFTERTRAIN_CLOTH / RE_CLOTHED /
 * NAME_RESET / KARMA（各自票）；CHARADEAD_CHECK 与 PARTY_CHAR_DEL 自
 * #548（S7）起为真身（ere/event/event-aftertrain.js 的 charadead_check
 * 与 ere/dungeon/dungeon-party.js 的 party_char_del）。
 * MAOU_TENSHIN 自 #400（N16）起为真身（ere/event/event-nextday.js 的
 * event_maou_tenshin，本体源 EVENT_NEXTDAY.ERB:2455-2479）。
 * @JUEL_CHECK（:421 的一次性珠结算）已随 #47 实现
 * （system/train/juel-check.js，含与 era.endTrain 的职责划分定案）。
 */

const era = require('#/era-electron');
const { karma } = require('#/chara/chara-stats');
const { name_reset } = require('#/chara/char-make');
const { template_no_of } = require('#/chara/chara-pregnancy');
const { on, TIER } = require('#/system/event/registry');
const { begin, STATE } = require('#/system/flow/begin-signal');
const { event_maou_tenshin } = require('#/event/event-nextday');
const { run_juel_check } = require('#/system/train/juel-check');
const { sell_video } = require('#/system/stronghold/sell-video');
const era_flag = require('#/era-utils/era-flag');
// AFTERTRAIN_CLOTH / RE_CLOTHED 自 #215（J5）起为真身（train 域的
// ere/system/train/cloth.js——@EVENTEND 在 endTrain 之前发（run_aftertrain
// 的既有次序），TFLAG:45 的读写落在火车表内，原生成立）
const { aftertrain_cloth, re_clothed } = require('#/system/train/cloth');
const { sell_fightmoney, sell_milk } = require('#/system/stronghold/sale');
// CHARADEAD_CHECK 自 #548（S7）起为真身（同文件的 @EVENTEND :339 调用）
const { charadead_check, self_check } = require('#/event/event-aftertrain');
// PARTY_CHAR_DEL 真身（#172）——@EVENTEND :372 死亡删除分支的调用
const { party_char_del } = require('#/dungeon/dungeon-party');

/**
 * 本文件存根化的原作调用名。#548（S7）起名单清空：CHARADEAD_CHECK 与
 * PARTY_CHAR_DEL 均已换真身。清单核对测试仍读它。
 */
const STUBBED_CALLS = [];

on(
  'EVENTEND',
  async () => {
    // :316-317
    era.print('调教结束了。');
    await era.waitAnyKey();

    // :319-323 角色復位（读 @PRITRAIN_MESSAGE 暂存的 T:10/11/12）。
    // :320 MASTER = T:10 —— ere 侧 MASTER 不是变量而是常量约定（恒角色 0，
    // CONTEXT.md），暂存值亦恒 0，此行为空操作、不落槽位
    era_flag.target = era_flag.target_backup; // :321 TARGET = T:11
    if (era_flag.assi) {
      era_flag.assi = era_flag.assi_backup; // :322-323 SIF ASSI → ASSI = T:12
    }

    // :325-332 失神時の口上非表示の回復（TFLAG:860 → FLAG:7）
    const faint_flag = era.get('tflag:860') || 0;
    if (faint_flag === 1) {
      era.set('flag:7', 1);
      era.set('tflag:860', 0);
    } else if (faint_flag === 2) {
      era.set('flag:7', 2);
      era.set('tflag:860', 0);
    }

    // :334-336 今回の調教対象と助手を記録（FLAG:1 = 前回调教目标、
    // FLAG:2 = 前回助手——TARGET:1/ASSI:1 是 @EVENTTRAIN 的记录值）
    era.set('flag:1', era_flag.target_record);
    era.set('flag:2', era_flag.assi_record);

    // :338-339 調教後に死んでいる可能性をチェック（#548 起真身：
    // ere/event/event-aftertrain.js。RESULT 0 = 存活 / 1 = 已死；魔王自己
    // 死亡且无候补时在真身内 QUIT，throw 直接炸穿本链）
    const charadead_result = await charadead_check();

    // :341-345 生きていれば調教後行為のチェック（IF RESULT == 0）
    if (charadead_result === 0) {
      await self_check();
      era.drawLine(); // :344
    }

    // :347-354 三笔卖出结算（母乳与死斗场 #335、录像 #336 起全为真身）
    await sell_milk();
    await sell_video(era_flag.target, era_flag.assi);
    await sell_fightmoney();

    // :356-361 生きていて着衣モードなら調教後の衣類の処理（FLAG:37 =
    // 着衣系统，@EVENTFIRST 开局置 1；#215 真身——调教内调用，TFLAG:45
    // 直读直清）
    if (
      (era.get('flag:37') || 0) !== 0 &&
      (era.get(`base:${era_flag.target}:0`) || 0) > 0
    ) {
      await aftertrain_cloth(era_flag.target);
      // :360 衣類の再着衣
      await re_clothed(era_flag.target);
    }

    // :363-375 調教後に死ぬか臨死状態なら珠を獲得せずに、ターゲットを
    // 空にしてターン終了
    const target = era_flag.target;
    const target_stamina = era.get(`base:${target}:0`) || 0;
    const target_willpower = era.get(`base:${target}:1`) || 0;
    if (target_stamina < 1 && target !== 0) {
      // :365-373 角色削除処理：FLAG:(NO:A + 199) = 1（死亡标记）。普通角色的
      // NO 就是角色 ID；后代的原作 NO 是来源模板号（chara-pregnancy.js 的
      // template_no_of），故经它换算。随后清指针、除名（:373 DELCHARA）
      era.set(`flag:${template_no_of(target) + 199}`, 1);
      era_flag.target = -1;
      era.set('flag:1', -1);
      era_flag.assi = -1;
      party_char_del(target); // :372 CALL PARTY_CHAR_DEL, A（#548 起真身）
      // DELCHARA：引擎等价物 removeCharacter（从已加入列表除名）
      era.removeCharacter(target);
      await name_reset();
      begin(STATE.TURNEND); // :375 —— 结束本函数，其后结算整段跳过
    } else if ((target_stamina < 1 || target_willpower < 1) && target === 0) {
      // :376-378 魔王换人的处理（调教目标 == 魔王且倒下：濒死/气力尽）——
      // 本体在 ere/event/event-nextday.js（@MAOU_TENSHIN 的源文件即
      // EVENT_NEXTDAY.ERB），#400（N16）接线
      await event_maou_tenshin();
    }

    // :381-390 善恶值増減（EX:1 私处绝顶 / EX:2 肛门绝顶，零指令下恒 0）
    if (era.get(`ex:${era_flag.target}:1`)) {
      era.print('(私处绝顶使善恶值:-1)'); // :383 PRINTW
      await era.waitAnyKey(); // PRINTW 的读键
      karma(era_flag.target, -1); // :384 CALL KARMA, TARGET, -1
    }
    if (era.get(`ex:${era_flag.target}:2`)) {
      era.print('(肛门绝顶使善恶值:-2)'); // :388
      await era.waitAnyKey();
      karma(era_flag.target, -2); // :389
    }

    // :392-406 时常发情（非「时常发情」体质时，润滑/欲情各按万分比蓄积
    // 进 CFLAG:81/82；不足 10000 则清零）
    if (
      (era.get('flag:75') || 0) === 0 &&
      !era.get(`talent:${era_flag.target}:271`)
    ) {
      // :394-399 润滑（PALAM:3）
      const lubrication = era.get(`palam:${era_flag.target}:3`) || 0;
      if (lubrication >= 10000) {
        era.add(`cflag:${era_flag.target}:81`, Math.floor(lubrication / 10000));
      } else {
        era.set(`cflag:${era_flag.target}:81`, 0);
      }
      // :400-405 欲情（PALAM:5）
      const desire = era.get(`palam:${era_flag.target}:5`) || 0;
      if (desire >= 10000) {
        era.add(`cflag:${era_flag.target}:82`, Math.floor(desire / 10000));
      } else {
        era.set(`cflag:${era_flag.target}:82`, 0);
      }
    }

    // :408-418 调教奴隶的气力回复（FLAG:400 开、TALENT:85 爱慕加成）
    let recover = 0;
    if (
      (era.get('flag:400') || 0) !== 0 &&
      era.get(`talent:${era_flag.target}:85`)
    ) {
      era.print('*因奴隶的爱而恢复了气力*'); // :410
      recover = 700; // :411
    } else if ((era.get('flag:400') || 0) !== 0) {
      era.print('*因调教奴隶而恢复了气力*'); // :413
      recover = 500; // :414
    }
    // BASE:0:1 = 魔王（角色 0）的气力，回复后钳到上限（:416-418）
    era.add('base:0:1', recover);
    const max_willpower = era.get('maxbase:0:1') || 0;
    if ((era.get('base:0:1') || 0) > max_willpower) {
      era.set('base:0:1', max_willpower);
    }

    // :420-421 何点数を得られたか（一次性珠结算，#47 实现——普通 CALL
    // 非引擎回调；结算本体与 era.endTrain 的职责划分见 juel-check.js
    // 文件头：gotjuel 已在结算尾部清零，链后的 endTrain 只删表、不加算）
    await run_juel_check();

    // :424-426 切换回原来的目标与助手（@EVENTTRAIN 记录的 TARGET:1/ASSI:1）
    era_flag.assi = era_flag.assi_record;
    era_flag.target = era_flag.target_record;

    // :428-429 能力値の上昇はメイン画面で行わせる → 回合结算
    begin(STATE.TURNEND);
  },
  TIER.LATER,
);

module.exports = { STUBBED_CALLS };
