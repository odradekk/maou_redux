/**
 * @file END 族分发：65 个 @END<n> 结局文本段的执行器（issue #404 / N20）。
 *
 * 源: target/ERB/EVENT/ENDING ver 1.0.1.ERB :344-349 的分派循环
 *     （`TRYCALLFORM END{LOCAL}_{EX_FLAG:(2800+LOCAL)/10}`）——
 *     数据在 ere/data/ending-scripts.js（65 段，从 ENDINGDATA.ERB 与
 *     ENDINGDATA_ADDON1.ERB 抽出）。
 *
 * 分发模型沿用 #7 决议的 DispatchFamily：**族号 = LOCAL（2..15），小节 =
 * 线值 / 10**。族 7/10/11/14 在本文件装载期注册；其余 10 族全库无定义
 * （#14 登记），空间内缺失 = TRYCALLFORM 落空静默跳过。
 *
 * 步词表与文本语义见数据文件的头注。本文件的四件事：
 *   1. 装载期把 END_SCRIPTS 注册进 END_FAMILY；
 *   2. 解释器 run_steps（文本步 / 效果步 / if / ask）；
 *   3. 三个需要循环或跨模块的具名步（leave / rampage / finish）与
 *      ENDINCONSQSELECT 的转发；
 *   4. %SAVESTR:MASTER% 的插值（本数据表里唯一的取值形态）。
 *
 * 两处照抄的原作缺陷（详见数据文件头注）：
 *   - `SIF FLAG:2 == GETCHARA(x)` 之后的 `G:2 = -1` 写未声明的表 G（FLAG:2
 *     的笔误）——不落表；同段的「前回の助手・調教対象より前だった場合は
 *     フラグを減算」是 DELCHARA 重排残留，按 dungeon-party.js /
 *     event-chara-leave.js 的先例不移植（#404 与本文件头注各一处）。
 *   - END10_15 的 `FOR MONSTER, 100, 200` / `FOR CHARA, 1, CHARANUM` 在
 *     ere 侧按引擎的已加入列表迭代（#150 数值升序），`MONSTER < 190` 的
 *     保护照抄。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { DispatchFamily } = require('#/system/dispatch/dispatch-family');
const { event_chara_leave } = require('#/event/event-chara-leave');
const { inconseq_select } = require('#/event/event-ending');
const { name_reset } = require('#/chara/char-make');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { party_char_del } = require('#/dungeon/dungeon-party');
const { END_SCRIPTS } = require('#/data/ending-scripts');

/** 二维表 / flag 读点：未声明下标读得 undefined（#13），一律 || 0 兜底 */
function get(name) {
  return era.get(name) || 0;
}

/**
 * END 族分发注册表：TRYCALLFORM END{2..15}_{小节} 的等价物（#7 分发族）。
 * 声明空间 = 原作 FOR LOCAL,2,16 的循环域（族号 2..15，@ENDCHECK 头注释
 * 「2-15为分剧情」）；族 7/10/11/14 有定义，其余 10 族全库无定义（#14）。
 */
const END_FAMILY = new DispatchFamily(
  'END',
  [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
);

/** 姓名读数（SAVESTR:x / NAME:x 在 ere 侧的共同源，#5 决议） */
function name_of(cid) {
  return era.get(`callname:${cid}:-1`) ?? '';
}

/**
 * %SAVESTR:MASTER% 的插值。本数据表里唯一出现的取值形态是 MASTER
 * （65 段全量扫描的结论），故不做通用 %…% 求值器——遇到未知形态会原样
 * 输出，比静默吞掉更容易在测试里发现。
 * @param {string} text
 * @returns {string}
 */
function interpolate(text) {
  return text.split('%SAVESTR:MASTER%').join(name_of(0));
}

/**
 * `['finish']`：真结局段的收尾（ENDINGDATA.ERB:648-652 等五处同型）。
 *    IF EX_FLAG:2801 < 99
 *        SIF EX_FLAG:2801 <= 90 → EX_FLAG:2801 = 90
 *        EX_FLAG:2801++
 *    ENDIF
 */
function op_finish() {
  if (era_exflag.first_run_deadline < 99) {
    if (era_exflag.first_run_deadline <= 90) {
      era_exflag.first_run_deadline = 90;
    }
    era_exflag.first_run_deadline = era_exflag.first_run_deadline + 1;
  }
}

/**
 * `['leave', cid]`：角色线 [1] 支的离队三连（ENDINGDATA.ERB:929-945 与
 * :1185-1201 同型，ENDCHECKSPADE 的 [SKIPSTART] 段是同一段死代码）。
 *
 * @param {number} cid 离队角色（22 黑方片 / 21 银黑桃）
 */
async function op_leave(cid) {
  // :929-930 SIF FLAG:1 == GETCHARA(cid) → FLAG:1 = -1（调教对象指针）
  if (get('flag:1') === cid) {
    game.event.上次调教对象 = -1;
  }
  // :931-932 `SIF FLAG:2 == GETCHARA(cid) → G:2 = -1`：G 是未声明的表，
  // 原作笔误（意图是 FLAG:2）——不落表，见文件头
  // :934-938 「前回の助手・調教対象より前だった場合はフラグを減算」是
  // DELCHARA 重排残留，ere 扁平化（#21）下角色号不重排，按先例不移植
  era_flag.target = get('flag:1'); // :940 TARGET = FLAG:1
  era_flag.assi = get('flag:2'); // :941 ASSI = FLAG:2
  // :943 CALL PARTY_CHAR_DEL, EX_FLAG:2803——实参是「失控奴隶号」而非 cid，
  // 原作即如此（疑为笔误），1:1 照抄
  party_char_del(era_exflag.runaway_slave_id);
  era.removeCharacter(cid); // :944 DELCHARA GETCHARA(cid)
  await name_reset(); // :945 CALL NAME_RESET
}

/**
 * `['rampage']`：END10_15 的嘉德暴走结算（ENDINGDATA_ADDON1.ERB:419-434）。
 * 实体损失：EX_FLAG:2810 = 540、威望 −50、怪物库存减半（下限 30、190 号
 * 以下才兜底）、全角色 BASE 扣减、金库损失 20%、嘉德除名归档。
 */
async function op_rampage() {
  era_exflag.route_33 = 540; // :419
  era_exflag.prestige = era_exflag.prestige - 50; // :420 EX_FLAG:99 -= 50
  // :421-425 FOR MONSTER, 100, 200（含头不含尾）/ ITEM:MONSTER /= 2（向零
  // 截断），命中 <= 30 且 MONSTER < 190 时兜底 30
  for (let monster = 100; monster < 200; monster += 1) {
    let stock = Math.trunc(get(`item:${monster}`) / 2);
    if (stock <= 30 && monster < 190) {
      stock = 30;
    }
    era.set(`item:${monster}`, stock);
  }
  // :426-429 FOR CHARA, 1, CHARANUM（0 号魔王除外）：BASE:0 -= 800 / BASE:1 -= 1000
  // （跨域写经 chara 域门面，ADR-0002）
  for (const cid of era.getAddedCharacters()) {
    if (cid === 0) {
      continue;
    }
    chara(cid).dungeon.体力 -= 800;
    chara(cid).dungeon.气力 -= 1000;
  }
  // :430-433 金库损失：TIMES MONEY, 0.80（整数变量按向零截断落值），
  // 损失额同时从「非作弊资金」追踪器扣掉
  const before = era_flag.money;
  const after = Math.trunc(before * 0.8);
  era_flag.money = after;
  era_exflag.legit_money = era_exflag.legit_money - (before - after);
  // :434 CALL EVENT_CHARA_LEAVE(85, GETCHARA(33))——描述串的归档点
  event_chara_leave(85, 33);
}

/**
 * 条件求值（数据表的 `['if', 条件, …]`）。
 * @param {Array} cond 条件元组，见数据文件头注
 * @param {{result?: number}} ctx 当前 INPUT 结果（`result_is` 用）
 * @returns {boolean}
 */
function test_cond(cond, ctx) {
  const [kind, a, b, c, d] = cond;
  if (kind === 'talent_eq') {
    return get(`talent:${a}:${b}`) === c;
  }
  if (kind === 'result_is') {
    return ctx.result === a;
  }
  if (kind === 'cflag_between') {
    // 左闭右开：`X >= 下界 && X < 上界`
    const value = get(`cflag:${a}:${b}`);
    return value >= c && value < d;
  }
  throw new Error(`未知的结局段条件：${kind}`);
}

/**
 * 执行一段步列表（递归：if / ask）。
 * @param {Array<Array>} steps
 * @param {{family: number, result?: number}} ctx 族号（`sub` 用）与当前输入结果
 * @returns {Promise<void>}
 */
async function run_steps(steps, ctx) {
  for (const step of steps) {
    const [op, a, b, c] = step;
    if (op === 'd') {
      era.drawLine();
    } else if (op === 'l') {
      era.print(interpolate(a));
    } else if (op === 'w') {
      era.print(interpolate(a));
      await era.waitAnyKey();
    } else if (op === 'f') {
      await era.waitAnyKey();
    } else if (op === 'align') {
      era.setAlign(a); // ALIGNMENT CENTER / LEFT
    } else if (op === 'exflag') {
      era_exflag.set(a, era_exflag.get(a) + b);
    } else if (op === 'exflag_set') {
      era_exflag.set(a, b);
    } else if (op === 'cflag') {
      era.set(`cflag:${a}:${b}`, get(`cflag:${a}:${b}`) + c);
    } else if (op === 'talent') {
      era.set(`talent:${a}:${b}`, c);
    } else if (op === 'base') {
      era.set(`base:${a}:${b}`, get(`base:${a}:${b}`) + c);
    } else if (op === 'exp') {
      era.set(`exp:${a}:${b}`, get(`exp:${a}:${b}`) + c);
    } else if (op === 'inconseq') {
      await inconseq_select(a); // CALL ENDINCONSQSELECT,arg
    } else if (op === 'sub') {
      await run_end_script(ctx.family, String(a)); // CALL 同族另一段
    } else if (op === 'finish') {
      op_finish();
    } else if (op === 'leave') {
      await op_leave(a);
    } else if (op === 'rampage') {
      await op_rampage();
    } else if (op === 'if') {
      const [, cond, then_steps, else_steps] = step;
      await run_steps(
        test_cond(cond, ctx) ? then_steps : (else_steps ?? []),
        ctx,
      );
    } else if (op === 'ask') {
      await run_ask(a, ctx);
    } else {
      throw new Error(`未知的结局段步骤：${op}`);
    }
  }
}

/**
 * `['ask', {prompt, branches, else?, again?, after?}]`：INPUT 分岔。
 * `again` 为真时未命中重问（原作 `GOTO $…LOOP`）。
 * @param {object} ask 见数据文件头注
 * @param {{family: number, result?: number}} ctx
 */
async function run_ask(ask, ctx) {
  for (;;) {
    await run_steps(ask.prompt ?? [], ctx);
    const result = await era.input();
    ctx.result = result;
    const branch = ask.branches[result];
    if (branch !== undefined) {
      await run_steps(branch, ctx);
      break;
    }
    if (ask.again) {
      continue; // 原作 GOTO INPUT_LOOP
    }
    await run_steps(ask.else ?? [], ctx);
    break;
  }
  await run_steps(ask.after ?? [], ctx);
}

/**
 * 跑一族一小节的数据段（END_FAMILY 的实现体）。
 * @param {number} family 族号（LOCAL）
 * @param {string} section 小节键（线值 / 10 的字符串形）
 * @returns {Promise<void>}
 */
async function run_end_script(family, section) {
  const entry = END_SCRIPTS[family]?.[section];
  if (entry === undefined) {
    // 声明空间内缺失：原作 TRYCALLFORM 落空（含 END7_13 这类原作笔误）
    return;
  }
  await run_steps(entry.steps, { family });
}

// 装载期注册：族 7/10/11/14 各有实现（其余族全库无定义，缺失合法）
for (const family of Object.keys(END_SCRIPTS)) {
  END_FAMILY.register(Number(family), (section) =>
    run_end_script(Number(family), String(section)),
  );
}

module.exports = {
  END_FAMILY,
  interpolate,
  run_end_script,
  run_steps,
  test_cond,
};
