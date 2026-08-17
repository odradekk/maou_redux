/**
 * @file 调教结束事件 @EVENTEND 的处理器（issue #44，#LATER 档真身）。
 *
 * 源: target/ERB/調教相關/TRAIN_MAIN.ERB  @EVENTEND（:314-429，#LATER）
 *
 * STATE.AFTERTRAIN 的主体（train-loop.js 的 run_aftertrain 发起链、收尾
 * era.endTrain）。直线赋值与判定 1:1 照搬；死亡删除分支（:356-373）内的
 * BEGIN TURNEND 会当场结束本函数（#6 语义：BEGIN 结束当前函数、链继续），
 * 其后的善恶值/时常发情/气力回复/JUEL_CHECK/指针还原按原作一并跳过。
 *
 * 存根（docs/stub-registry.md 函数表）：CHARADEAD_CHECK / SELF_CHECK /
 * SELL_MILK / SELL_VIDEO / SELL_FIGHTMONEY / AFTERTRAIN_CLOTH /
 * RE_CLOTHED / PARTY_CHAR_DEL / NAME_RESET / MAOU_TENSHIN / KARMA /
 * JUEL_CHECK（一次性珠结算，实现归 #47——它不是引擎回调，是普通 CALL）。
 */

const era = require('#/era-electron');
const { on, TIER } = require('#/system/event/registry');
const { begin, STATE } = require('#/system/flow/begin-signal');
const era_flag = require('#/era-utils/era-flag');
const { stub_line } = require('#/utils/stub-line');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 对账钉死）；名单变动必须同步清单。
 */
const STUBBED_CALLS = [
  'CHARADEAD_CHECK',
  'SELF_CHECK',
  'SELL_MILK',
  'SELL_VIDEO',
  'SELL_FIGHTMONEY',
  'AFTERTRAIN_CLOTH',
  'RE_CLOTHED',
  'PARTY_CHAR_DEL',
  'NAME_RESET',
  'MAOU_TENSHIN',
  'KARMA',
  'JUEL_CHECK',
];

on(
  'EVENTEND',
  async () => {
    // :315-316
    era.print('调教结束了。');
    await era.waitAnyKey();

    // :318-323 角色復位（读 @PRITRAIN_MESSAGE 暂存的 T:10/11/12）。
    // :320 MASTER = T:10 —— ere 侧 MASTER 不是变量而是常量约定（恒角色 0，
    // CONTEXT.md），暂存值亦恒 0，此行为空操作、不落槽位
    era_flag.target = era_flag.target_backup; // :321 TARGET = T:11
    if (era_flag.assi) {
      era_flag.assi = era_flag.assi_backup; // :322-323 SIF ASSI → ASSI = T:12
    }

    // :325-331 失神時の口上非表示の回復（TFLAG:860 → FLAG:7）
    const faint_flag = era.get('tflag:860') || 0;
    if (faint_flag === 1) {
      era.set('flag:7', 1);
      era.set('tflag:860', 0);
    } else if (faint_flag === 2) {
      era.set('flag:7', 2);
      era.set('tflag:860', 0);
    }

    // :333-334 今回の調教対象と助手を記録（FLAG:1 = 前回调教目标、
    // FLAG:2 = 前回助手——TARGET:1/ASSI:1 是 @EVENTTRAIN 的记录值）
    era.set('flag:1', era_flag.target_record);
    era.set('flag:2', era_flag.assi_record);

    // :336-337 調教後に死んでいる可能性をチェック（存根：RESULT 0 = 存活）
    stub_line('CHARADEAD_CHECK', '死亡检查');
    const charadead_result = 0; // 存根的 RESULT：0 = 存活（真身落地前恒存活）

    // :339-342 生きていれば調教後行為のチェック（IF RESULT == 0）
    if (charadead_result === 0) {
      stub_line('SELF_CHECK', '调教后行为检查');
      era.drawLine(); // :341
    }

    // :344-348 三笔卖出结算（存根）
    stub_line('SELL_MILK', '母乳出售');
    stub_line('SELL_VIDEO', '录像出售');
    stub_line('SELL_FIGHTMONEY', '死斗场观战费');

    // :350-354 生きていて着衣モードなら調教後の衣類の処理（FLAG:37 =
    // 着衣系统，@EVENTFIRST 开局置 1）
    if (
      (era.get('flag:37') || 0) !== 0 &&
      (era.get(`base:${era_flag.target}:0`) || 0) > 0
    ) {
      stub_line('AFTERTRAIN_CLOTH', '调教后衣物处理');
      stub_line('RE_CLOTHED', '重新着衣');
    }

    // :356-373 調教後に死ぬか臨死状態なら珠を獲得せずに、ターゲットを
    // 空にしてターン終了
    const target = era_flag.target;
    const target_stamina = era.get(`base:${target}:0`) || 0;
    const target_willpower = era.get(`base:${target}:1`) || 0;
    if (target_stamina < 1 && target !== 0) {
      // 角色削除処理：FLAG:NO+199 = 1（死亡标记；原作 X = NO:A + 199 的
      // NO 是 CSV 番号，ere 角色 ID 即 NO，故 target 直加）、指针清空、除名
      era.set(`flag:${target + 199}`, 1);
      era_flag.target = -1;
      era.set('flag:1', -1);
      era_flag.assi = -1;
      stub_line('PARTY_CHAR_DEL', '队伍移除');
      // DELCHARA：引擎等价物 removeCharacter（从已加入列表除名）
      era.removeCharacter(target);
      stub_line('NAME_RESET', '名字重置');
      begin(STATE.TURNEND); // :375 —— 结束本函数，其后结算整段跳过
    } else if ((target_stamina < 1 || target_willpower < 1) && target === 0) {
      // :366-368 魔王换人的处理（调教目标 == 魔王且倒下：濒死/气力尽）
      stub_line('MAOU_TENSHIN', '魔王换人');
    }

    // :375-383 善恶值増減（EX:1 私处绝顶 / EX:2 肛门绝顶，零指令下恒 0）
    if (era.get(`ex:${era_flag.target}:1`)) {
      era.print('(私处绝顶使善恶值:-1)');
      await era.waitAnyKey(); // PRINTW 的读键
      stub_line('KARMA', '善恶值增减');
    }
    if (era.get(`ex:${era_flag.target}:2`)) {
      era.print('(肛门绝顶使善恶值:-2)');
      await era.waitAnyKey();
      stub_line('KARMA', '善恶值增减');
    }

    // :385-399 时常发情（非「时常发情」体质时，润滑/欲情各按万分比蓄积
    // 进 CFLAG:81/82；不足 10000 则清零）
    if (
      (era.get('flag:75') || 0) === 0 &&
      !era.get(`talent:${era_flag.target}:271`)
    ) {
      // 润滑（PALAM:3）
      const lubrication = era.get(`palam:${era_flag.target}:3`) || 0;
      if (lubrication >= 10000) {
        era.add(`cflag:${era_flag.target}:81`, Math.floor(lubrication / 10000));
      } else {
        era.set(`cflag:${era_flag.target}:81`, 0);
      }
      // 欲情（PALAM:5）
      const desire = era.get(`palam:${era_flag.target}:5`) || 0;
      if (desire >= 10000) {
        era.add(`cflag:${era_flag.target}:82`, Math.floor(desire / 10000));
      } else {
        era.set(`cflag:${era_flag.target}:82`, 0);
      }
    }

    // :401-411 调教奴隶的气力回复（FLAG:400 开、TALENT:85 爱慕加成）
    let recover = 0;
    if (
      (era.get('flag:400') || 0) !== 0 &&
      era.get(`talent:${era_flag.target}:85`)
    ) {
      era.print('*因奴隷的愛而回復了気力*');
      recover = 700;
    } else if ((era.get('flag:400') || 0) !== 0) {
      era.print('*因調教奴隷而回復了気力*');
      recover = 500;
    }
    // BASE:0:1 = 魔王（角色 0）的气力，回复后钳到上限
    era.add('base:0:1', recover);
    const max_willpower = era.get('maxbase:0:1') || 0;
    if ((era.get('base:0:1') || 0) > max_willpower) {
      era.set('base:0:1', max_willpower);
    }

    // :413-421 何点数を得られたか（一次性珠结算，存根化；实现归 #47，
    // 非引擎回调，是普通 CALL——注意其游戏侧结算与 run_aftertrain 的
    // era.endTrain 都碰 gotjuel，#47 落地时防双重累加）
    stub_line('JUEL_CHECK', '珠结算');

    // :423-425 切换回原来的目标与助手（@EVENTTRAIN 记录的 TARGET:1/ASSI:1）
    era_flag.assi = era_flag.assi_record;
    era_flag.target = era_flag.target_record;

    // :427-429 能力値の上昇はメイン画面で行わせる → 回合结算
    begin(STATE.TURNEND);
  },
  TIER.LATER,
);

module.exports = { STUBBED_CALLS };
