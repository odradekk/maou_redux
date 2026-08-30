/**
 * @file 调教指令 200–207「死斗场与怪物」族：@COM200–207 真身 + @COM_ABLE200–207
 * 可用性判定 + TRAIN_MESSAGE 分支（issue #230 / 阶段 4 轴 A J20）。
 *
 * 源: target/ERB/調教相關/COMF200_コロシアム.ERB  @COM200（:8-37）/
 *     @COM_AFTER_ARENA（:73-95）/ @ARENA_SLAVE_POINT（:98-119）/
 *     @ARENA_ASSI_POINT（:126-148）
 *     target/ERB/調教相關/COMF201_助手.ERB  @COM201（:8-118）
 *     target/ERB/調教相關/COMF202_最下層民.ERB … COMF206_トロル.ERB
 *     @COM202–206（五体同构：战斗 + 凌辱菜单 + 射精检查 + 汚れ）
 *     target/ERB/調教相關/COMF207_媚薬スライム.ERB  @COM207（:9-63）
 *     target/ERB/調教相關/COMABLE.ERB  @COM_ABLE200–207（:4650-4755）
 *     target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB  SELECTCOM == 200 分支
 *     （:3010-3027）；201–207 无分支（见下「消息分支」）
 *
 * == 本族的三个结构事实（源侧查实） ==
 *
 * 1. **@COM_AFTER_ARENA / @ARENA_SLAVE_POINT / @ARENA_ASSI_POINT 是别族的
 *    前置**：COMF208_触手.ERB（J17 #227）调用前两者。三者随本文件导出
 *    （com_after_arena / arena_slave_point / arena_assi_point），J17 接线时
 *    复用、勿重写。
 * 2. **@EQUIP_COM200（:40-68）是死代码不移植**：全库唯一潜在调用方
 *    SYSTEM_SOURCE.ERB 的装备 SIF 链（:59-120）枚举 11/13-19/43-47/49/53-
 *    59/89/90/98，不含 55——定义了但永不执行。#14 第七批登记。
 * 3. **@COM 返回 0 = 回合作废**（引擎 Process.SystemProc.cs 的 endCallComXX：
 *    RESULT == 0 → 不进 SOURCE_CHECK/EVENTCOMEND、PREVCOM 不推进、回合画面
 *    重开）。本族是全库首批真实 RETURN 0 路径的族（COM201 的「暂时放过」
 *    与子指令失败支、COM202-205 的同款、COM207 的男人私处支）——该语义
 *    随本票落进 train-loop.js 的 execute_command_round。
 *
 * == 变量承载（ere 等价物，先例 com0-caress.js 文件头） ==
 *
 *   - LOSEBASE:0/1 → `deltabase:${cid}:0/1` 的负值累加（读数 = 负值取反）；
 *   - UP:10 → `delta:${cid}:10`（恐怖，nextTurnInTrain 结算）；
 *   - SOURCE:xx → `source:${cid}:xx`；EXP/STAIN/TFLAG/TEQUIP/ITEM 同名直写
 *     （域内属主）；
 *   - 跨域写走门面：BASE:ASSI:0/1（属主 dungeon，COM201 反击支）与
 *     EXP:20/50/52/53（同属 dungeon，怪物射精/扩张）经 chara(cid).dungeon；
 *   - CFLAG:0:9 是**字面角色 0**（魔王等级，源侧与 CFLAG:PLAYER:9 的不对称
 *     1:1 保留：难度按魔王等级缩放、可用性门槛按调教者等级判）。
 *
 * == 凌辱菜单的记名差异（PR #53 通则，dungeon-setup/com-register 先例） ==
 *
 * 原作 PRINTL `[0] - 嘴巴` 文本方格 + 自由数字 INPUT；ere 引擎在画面有按钮
 * 时拒收非按钮输入，菜单改 printButton（快捷键 = 原编号，正文自动拼
 * `[n] 前缀`、原作的 ` - ` 分隔不再出现）。原作 GOTO INPUT_LOOP 的无效
 * 输入重试路径由引擎层拒收代位。COM207 的三支 JUMP COM51 = 尾调用
 * （return com_family.call(51, …)），JUMP 之后的收入行是死码不移植。
 *
 * == 消息分支（TRAIN_MESSAGE_A/B 的族段） ==
 *
 *   - B 的 SELECTCOM == 200 分支（:3010-3027）随本票注册；201–207 在 B/A
 *     的 IF 链里**没有分支**（原文即无——凌辱的情景文本在子指令自己的 B
 *     分支里、由 SELECTCOM=31/21/… 命中），故对它们注册无操作分支：否则
 *     分发骨架会打「族票未落地」占位行，那是原作没有的输出。
 *   - A 公共头的 TFLAG:15（怪物射精旗标）两臂（:127-146，TEQUIP:55 时的
 *     灌精文本）随本票落进 train-message.js；非死斗场的触手两臂（:113-125
 *     与 :143-145）随 J17。
 *
 * 这张票存根/登记（docs/stub-registry.md）：本文件零存根——口上侧
 * （@KOJO_MESSAGE_COM 的 TEQUIP:55 守卫 → COLOSSEUM_KOJO_<n>）随轴 B；
 * 子指令 COM5/21/27/31/51 经 com_family 分发，族票未落地时按调用点声明的
 * whenMissing: 0（执行失败）走。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { chara } = require('#/facade/chara');
const { com_able_family, com_family } = require('#/system/train/com-family');
const {
  train_message_a_family,
  train_message_b,
  train_message_b_family,
} = require('#/system/train/train-message');
const { weapon_restore } = require('#/system/equip/weapon-restore');
const { chara_callname } = require('#/utils/callname-utils');
const { PALAMLV } = require('#/era-utils/palam-level');
const {
  clothtype_main2_text,
  clothtype_special_text,
} = require('#/page/page-clothtype');

/** 主人（角色 0；Emuera 的 MASTER 常量） */
const MASTER = 0;

/** PBAND:0（EVENTFIRST 置 4）——ITEM:PBAND 即 ITEM:4 假阳具（持有判定） */
const PBAND = 4;

// 凌辱标题的主体・动作分隔（COMF201:78 等的 ＜助手・口交＞ 一族）：・ 是
// 原作样式，逐字照抄——lang-table.js 的 EXEMPT_STRINGS 有本字面量的整串
// 豁免（#212/#213 的 COMPOUND_SEP 同款处置，动态拼名走本常量）
const MONSTER_SEP = '・';

/** @TIMES X, m：整数乘小数后截断（math-etc.md；source-check.js 同款） */
const times = (v, m) => Math.floor(v * m);
/** Emuera 整数除法（正数域 = 向下取整） */
const idiv = (a, b) => Math.floor(a / b);

/** RAND:N 的缺省随机源（[0, n) 整数；测试注入定值序，benki/com-adv 先例） */
function default_rand(n) {
  return Math.floor(Math.random() * n);
}

// 目标的 LOSEBASE 读数（deltabase 存负值；source-check 同款取反）
const lose = (cid, k) => -1 * (era.get(`deltabase:${cid}:${k}`) || 0);
const add_lose = (cid, k, v) => era.add(`deltabase:${cid}:${k}`, -v);

/**
 * @COM200（COMF200_コロシアム.ERB:8-37）：死斗场的进入/退出开关。
 * @returns {Promise<number>} 原作 RETURN 1
 */
async function com200() {
  const target = era_flag.target;
  era.print('死斗场决斗'); // :10
  await train_message_b(); // :11

  if (era.get(`tequip:${target}:55`)) {
    // :13-16 退出：清死斗场位、扣一张观战券（ITEM:35）
    era.set(`tequip:${target}:55`, 0);
    era.add('item:35', -1); // item 表 34-35 属主 train，直写
  } else {
    // :17-34 进入：置位、清陷落旗标、按胆怯/感情淡薄缩放的体力气力损耗
    era.set(`tequip:${target}:55`, 1);
    era.set('tflag:401', 0);
    let a = 100; // :21 A = 100
    if (era.get(`talent:${target}:10`)) {
      a = times(a, 2.0); // :24-25 胆怯
    }
    if (era.get(`talent:${target}:22`)) {
      a = times(a, 0.6); // :27-28 感情淡薄
    }
    add_lose(target, 0, a); // :30-31
    add_lose(target, 1, a * 2);
    era.add(`delta:${target}:10`, a * 20); // :33 UP:10（恐怖）
    era.add(`source:${target}:14`, a * 5); // :34 SOURCE:14（逃离）
  }
  // :36 T = 0 —— 死写（全库无读者，#14 第七批），不移植
  return 1; // :37
}

/**
 * @COM_AFTER_ARENA（COMF200:73-95）：死斗场战斗后的陷落检查。
 * 气力有余 = 胜利（斗技胜利经验 +1，RETURN 0）；气力耗尽 = 奴隶陷落
 * （TFLAG:401 置位，助手出战且气力 < 1/5 时助手退却，RETURN 1）。
 *
 * **J17（COMF208_触手）的接线前置，导出复用。**
 *
 * @returns {Promise<number>} 0 = 胜利 / 1 = 陷落
 */
async function com_after_arena() {
  const target = era_flag.target;
  if ((era.get(`base:${target}:1`) || 0) > 0) {
    // :74-78 胜利
    era.print('斗技胜利经验+1');
    era.add(`exp:${target}:76`, 1); // EXP:76 斗技胜利经验（属主 train，直写）
    return 0;
  }

  era.print('＜奴隶陷落＞'); // :81
  era.set('tflag:401', 1); // :83（全库无读者，1:1 死写保留）

  if (era_flag.assi === era_flag.player) {
    // :85-90 助手亲自出战且气力 < 上限 1/5 → 助手退却（调教者归还主人）
    if (
      (era.get(`base:${era_flag.assi}:1`) || 0) <
      idiv(era.get(`maxbase:${era_flag.assi}:1`) || 0, 5)
    ) {
      era.print('＜助手退却＞');
      era_flag.assiplay = 0; // :87
      era_flag.player = MASTER; // :88
    }
  }
  return 1; // :93
}

/**
 * @ARENA_SLAVE_POINT（COMF200:98-119）：奴隶战斗点（结果存 B → RESULT）。
 * 攻防值（CFLAG:11/12，经 WEAPON_RESTORE 重算）+ 魔术/咒术的等级×2，
 * 按气力比例折减、下限 1。**J17 的接线前置，导出复用。**
 *
 * @returns {number} 战斗点（B）
 */
function arena_slave_point() {
  const a = era_flag.target; // :99 A = TARGET
  weapon_restore(a); // :101 战闘値セット
  let b = 0; // :102
  b += era.get(`cflag:${a}:11`) || 0; // :104-105 攻击值
  b += era.get(`cflag:${a}:12`) || 0; // :106-107 防御值
  if ((era.get(`talent:${a}:241`) || 0) === 1) {
    b += (era.get(`cflag:${a}:9`) || 0) * 2; // :109-110 魔术
  }
  if ((era.get(`talent:${a}:250`) || 0) === 1) {
    b += (era.get(`cflag:${a}:9`) || 0) * 2; // :111-112 咒术
  }
  // :114-116 気力によって戦闘値が減少（整数除法）
  b *= era.get(`base:${a}:1`) || 0;
  b = idiv(b, era.get(`maxbase:${a}:1`) || 0);
  if (b <= 0) {
    b = 1; // :118-119
  }
  return b;
}

/**
 * @ARENA_ASSI_POINT（COMF200:126-148）：助手战斗点。与奴隶版同构，
 * 気力折减一段先各自 /100（比例不变，中间量的整数截断有差）。
 *
 * @returns {number} 战斗点（B）
 */
function arena_assi_point() {
  const a = era_flag.assi; // :127 A = ASSI
  weapon_restore(a); // :129
  let b = 0; // :130
  b += era.get(`cflag:${a}:11`) || 0; // :132-133
  b += era.get(`cflag:${a}:12`) || 0; // :134-135
  if ((era.get(`talent:${a}:241`) || 0) === 1) {
    b += (era.get(`cflag:${a}:9`) || 0) * 2; // :137-138
  }
  if ((era.get(`talent:${a}:250`) || 0) === 1) {
    b += (era.get(`cflag:${a}:9`) || 0) * 2; // :139-140
  }
  // :142-143 気力比例（先各自 /100 再除）
  b *= idiv(era.get(`base:${a}:1`) || 0, 100);
  b = idiv(b, idiv(era.get(`maxbase:${a}:1`) || 0, 100));
  if (b <= 0) {
    b = 1; // :145-146
  }
  return b;
}

/**
 * 助手调教判定（COM201 的三处同款条件：调教者须有男性器官或假阳具）。
 * TALENT:121 扶她 / TALENT:122 男人 / ITEM:PBAND == 1 假阳具持有。
 * @param {number} assi 助手 ID
 * @returns {boolean}
 */
function assi_can_penetrate(assi) {
  return (
    (era.get(`talent:${assi}:121`) || 0) === 1 ||
    (era.get(`talent:${assi}:122`) || 0) === 1 ||
    (era.get(`item:${PBAND}`) || 0) === 1
  );
}

/**
 * 凌辱指令分发（原作 `SELECTCOM = n` + `CALL COMn`）。
 * 别族指令（#219/#221/#222/#224）经分发族调用——**设计好的接触面，不建
 * 存根**：族票未落地时按缺失语义 whenMissing: 0（执行失败）走，调用方的
 * `SIF RESULT == 0 RETURN 0` 随之生效（#7 决议：缺失值由调用点声明）。
 *
 * @param {number} com 指令号（L_I）
 * @returns {Promise<number>} 子指令的 RETURN 值
 */
function call_insult_com(com) {
  era_flag.selectcom = com;
  return com_family.call(com, { whenMissing: 0 });
}

/**
 * @COM201（COMF201_助手.ERB:8-118）：死斗场·助手战。
 * @param {(n: number) => number} [rand] RAND:N 随机源（收入加算的 RAND:RESULT）
 * @returns {Promise<number>} 0/1（0 = 回合作废，引擎重新要求输入）
 */
async function com201(rand = default_rand) {
  const target = era_flag.target;
  const assi = era_flag.assi; // SAVESTR:ASSI 的显示名来源
  // :10-11 非助手亲自出战不可执行（与 COM_ABLE201 双保险，1:1 保留）
  if (assi !== era_flag.player) {
    return 0;
  }

  era.print('助手'); // :13
  await train_message_b(); // :15

  // :20-23 助手战斗点 → 双方的体力气力损耗
  const assi_point = arena_assi_point(); // :20
  add_lose(target, 0, assi_point); // :22-23
  add_lose(target, 1, assi_point * 10);

  const slave_point = arena_slave_point(); // :27

  if (slave_point < assi_point) {
    // :30-45 奴隶战斗点更低 → 被压制
    if ((era.get(`base:${target}:1`) || 0) <= 0) {
      // :32-34 気力 0：追加伤害无し
      era.print(`${chara_callname(assi)}将${chara_callname(target)}踩在脚下。`);
      await era.waitAnyKey();
    } else {
      era.print(
        `${chara_callname(target)}完全无法抵挡${chara_callname(assi)}的攻击！`,
      );
      await era.waitAnyKey();
      add_lose(target, 0, assi_point); // :37-38 追加ダメージ
      add_lose(target, 1, assi_point * 5);
      if ((era.get(`base:${target}:1`) || 0) < lose(target, 1)) {
        // :39-42 気力 < 累计损耗 → 武器被打掉（陷落由 COM_AFTER_ARENA 报出）
        era.print(
          `然后，${chara_callname(assi)}发出痛恨的一击，将${chara_callname(target)}的武器打掉了。`,
        );
        await era.waitAnyKey();
        era.print('＜奴隶陷落＞');
        await era.waitAnyKey();
      }
    }
  } else {
    // :44-47 奴隶反击：直接扣助手体力气力（BASE:0/1 属主 dungeon，走门面）
    era.print(`${chara_callname(target)}对${chara_callname(assi)}进行了反击。`);
    await era.waitAnyKey();
    chara(assi).dungeon.体力 -= slave_point;
    chara(assi).dungeon.气力 -= slave_point * 10;
  }

  // :52 TFLAG:400 = 201（死斗场敌种，B 分支与 source-check 读）
  era.set('tflag:400', 201);
  const after = await com_after_arena(); // :54
  if (after === 0) {
    return 1; // :55-56 胜利即收场
  }
  if (era_flag.assi !== era_flag.player) {
    return 1; // :58-59 战斗中助手退却 → 暂时放过
  }

  // :64-115 凌辱菜单（$INPUT_LOOP_0；按钮化记名差异见文件头）
  const penetrator = assi_can_penetrate(era_flag.assi);
  // [2] 私处的显示/执行条件（:69-70 显示与 :92 执行同款）：须能插入、非男人、
  // 无私处封印、非贞操带（CFLAG:42 != 79）、（未熟时须施虐狂助手）
  const can_vagina =
    penetrator &&
    !era.get(`talent:${target}:122`) &&
    !era.get(`talent:${target}:273`) &&
    (era.get(`cflag:${target}:42`) || 0) !== 79 &&
    (!era.get(`talent:${target}:135`) ||
      (era.get(`talent:${era_flag.assi}:83`) || 0) === 1);
  for (;;) {
    era.print('对哪里进行凌辱？'); // :65
    if (penetrator) {
      era.printButton('嘴巴', 0); // :66-67 [0]
      era.println();
    }
    era.printButton('胸部', 1); // :68 [1]（无条件）
    era.println();
    if (can_vagina) {
      era.printButton('私处', 2); // :69-70 [2]
      era.println();
    }
    if (penetrator) {
      era.printButton('肛门', 3); // :71-72 [3]
      era.println();
    }
    era.printButton('暂时放过', 999); // :73 [999]
    era.println();
    const result = await era.input(); // :75

    if (result === 0 && penetrator) {
      // :77-85 助手・口交
      era.print('＜助手・口交＞');
      const com_result = await call_insult_com(31);
      if (com_result === 0) {
        return 0; // :82-83 口交実行不可
      }
      // :85 死斗场収入（LOSEBASE:0 × 5 + RAND:RESULT；过滤后 RESULT 恒 1，
      // RAND:1 恒 0——原作算式如此，1:1）
      era.add('tflag:402', lose(target, 0) * 5 + rand(com_result));
    } else if (result === 1) {
      // :86-91 助手・胸爱抚（无実行不可检查——COM5 支无結果検査行）
      era.print('＜助手・胸爱抚＞');
      const com_result = await call_insult_com(5);
      era.add('tflag:402', lose(target, 0) * 5 + rand(com_result)); // :91
    } else if (result === 2 && can_vagina) {
      // :92-103 助手・背后位
      if (era.get(`talent:${target}:122`)) {
        return 0; // :94-95 対象是男人（菜单已滤，双保险 1:1）
      }
      era.print('＜助手・背后位＞');
      const com_result = await call_insult_com(21);
      if (com_result === 0) {
        return 0; // :100-101 处女を奪わせなかった
      }
      era.add('tflag:402', lose(target, 0) * 5 + rand(com_result)); // :103
    } else if (result === 3 && penetrator) {
      // :104-109 助手・背后位肛交
      era.print('＜助手・背后位肛交＞');
      const com_result = await call_insult_com(27);
      era.add('tflag:402', lose(target, 0) * 5 + rand(com_result)); // :109
    } else if (result === 999) {
      // :110-112 暂时放过
      era.print(
        `${chara_callname(MASTER)}叫${chara_callname(era_flag.assi)}退下了……`,
      );
      await era.waitAnyKey();
      return 0;
    } else {
      continue; // :113-114 GOTO INPUT_LOOP_0（引擎层拒收代位，防御性保留）
    }
    return 1; // :117
  }
}

/**
 * 怪物战斗配置（@COM202–206 五体同构，差异全部在此表；数值与文本逐条
 * 对源，错一格用例即红）。level = CFLAG:0:9（魔王等级，字面角色 0）。
 *
 * @typedef {object} MonsterConfig
 * @property {string} label PRINTL 的怪物名
 * @property {(level: number, weak: boolean) => number} open_lose0 开战
 *   LOSEBASE:0（203-206 的体力枯竭 /=4 折减经 monster_lose0，weak =
 *   BASE:0 <= 0）
 * @property {(level: number) => number} open_lose1 开战 LOSEBASE:1
 * @property {(level: number) => number} threshold 败北线（slave_point < 之即败北）
 * @property {[number|string, number|string]} extra_lose 败北追加
 *   [LOSEBASE:0, LOSEBASE:1]（数字原值；'level'/'level*2' 按魔王等级展开）
 * @property {(lose0: number) => number} income 死斗场收入的 LOSEBASE:0 项
 * @property {string} lose_no_stamina 気力 0（或失神）时的文本
 * @property {string} lose_hit 败北追加伤害的文本
 * @property {string} lose_down 気力 < 累计损耗时的倒地文本
 * @property {boolean} [fall_waits=true] 倒地后的＜奴隶陷落＞用 PRINTW（仅
 *   COM204 源是 PRINTL 无等待，false）
 * @property {string} win 奴隶战斗点不低时的文本
 * @property {string} retire 999 的退下文本（前接主人名）
 */

/** 203-206 的开战 LOSEBASE:0：体力枯竭（BASE:0 <= 0）时 /=4（源各行同款） */
function monster_lose0(base_value, weak) {
  return weak ? idiv(base_value, 4) : base_value;
}

// @COM202–206 的配置表（:17-43 各文件的战斗段逐条对齐）
const MONSTER_CONFIGS = {
  202: {
    label: '最下层居民',
    open_lose0: () => 5,
    open_lose1: () => 100,
    threshold: (level) => 1 * level,
    extra_lose: [10, 200],
    income: (lose0) => lose0,
    lose_no_stamina: '{t}无法抵抗，被嘲笑了。',
    lose_hit:
      '连地下城中最低等最卑微的种族都打不过，手足无措的{t}被无情地嘲笑着。',
    lose_down: '终于，{t}倒下了。',
    win: '{t}蹂躏着最下层居民，打得他们满地打滚，这个已经不能被称为战斗了。',
    retire: '让最下层居民退下了……',
  },
  203: {
    label: '霉菌犬',
    open_lose0: (level, weak) => monster_lose0(level, weak),
    open_lose1: (level) => level * 20,
    threshold: (level) => 2 * level,
    extra_lose: ['level', 'level'], // [L9, L9]
    income: (lose0) => lose0 * 2,
    lose_no_stamina: '霉菌犬压着筋疲力尽的{t}扭动着腰。',
    lose_hit: '{t}吸入了霉菌犬的有毒吐息。',
    lose_down: '随后筋疲力尽地倒下了。',
    win: '{t}闭气躲过霉菌犬的有毒气息，拼命逃跑着。',
    retire: '让霉菌犬退下了……',
  },
  204: {
    label: '兽人',
    open_lose0: (level, weak) => monster_lose0(level * 2, weak),
    open_lose1: (level) => level * 15,
    threshold: (level) => 3 * level,
    extra_lose: ['level*2', 'level*2'],
    income: (lose0) => lose0 * 3,
    lose_no_stamina: '兽人掰开{t}的双腿，贪婪地嗅着股间的气味。',
    lose_hit: '{t}苦战着兽人的精锐。',
    lose_down: '兽人给予了{t}痛恨一击，击落了她的武器。',
    fall_waits: false, // :35 PRINTL ＜奴隶陷落＞（其余四体 PRINTW）
    win: '{t}一边躲闪，一边思考如何反击兽人。',
    retire: '让兽人退下了……',
  },
  205: {
    label: '腐烂猪',
    open_lose0: (level, weak) => monster_lose0(idiv(level * 25, 10), weak),
    open_lose1: (level) => level * 20,
    threshold: (level) => 4 * level,
    extra_lose: ['level*2', 'level*2'],
    income: (lose0) => lose0 * 4,
    lose_no_stamina:
      '腐烂猪跑到{t}的身边蹲下，做标记似得在她身上蹭着腐败的液体。',
    lose_hit: '腐烂猪用腐败液体淋透了{t}全身！',
    lose_down: '{t}无法忍耐猛烈的臭气，跪倒在地。',
    win: '{t}向腐烂猪发动突击，才终于勉强打平。',
    retire: '让腐烂猪退下了……',
  },
  206: {
    label: '巨魔',
    open_lose0: (level, weak) => monster_lose0(level * 3, weak),
    open_lose1: (level) => level * 20,
    threshold: (level) => 5 * level,
    extra_lose: ['level*2', 'level*2'],
    income: (lose0) => lose0 * 5,
    lose_no_stamina: '巨魔在倒下了的{t}的股间摩擦着自己的武器，下流地笑着。',
    lose_hit: '{t}受到了巨魔猛烈的一击，直接被撞飞好远。',
    lose_down: '{t}筋疲力尽，完全无法再起身战斗了。',
    win: '{t}倾尽全力避开巨魔的一击。',
    retire: '让巨魔退下了……',
  },
};

/**
 * 怪物的败北追加伤害值（extra_lose 的 'level' 形展开）。
 * @param {MonsterConfig} cfg
 * @param {number} level 魔王等级（CFLAG:0:9）
 * @returns {[number, number]} [LOSEBASE:0, LOSEBASE:1]
 */
function monster_extra(cfg, level) {
  const pick = (v) => (v === 'level' ? level : v === 'level*2' ? level * 2 : v);
  return [pick(cfg.extra_lose[0]), pick(cfg.extra_lose[1])];
}

// 999「暂时放过」的哨兵（与子指令失败 0 / 凌辱成立 1 区分——COM206 的
// 999 不作废回合，出口与子指令失败不同，见 monster_com）
const RETIRE = Symbol('MONSTER_RETIRE');

/**
 * 五体怪物的凌辱菜单 + 收入（COM202-206 的 $INPUT_LOOP_0 段同构）。
 * 原文每支收入式 `TFLAG:402 += (LOSEBASE:0 × <mult>) + RAND:RESULT`。
 *
 * @param {MonsterConfig} cfg
 * @param {(n: number) => number} rand
 * @returns {Promise<number|symbol>} 1 = 凌辱成立 / 0 = 子指令失败
 *   （回合作废）/ RETIRE = 999 暂时放过
 */
async function monster_insult_menu(cfg, rand) {
  const target = era_flag.target;
  // [2] 私处的显示条件（:56-57）：非男人、无私处封印、非贞操带
  const show_vagina =
    !era.get(`talent:${target}:122`) &&
    !era.get(`talent:${target}:273`) &&
    (era.get(`cflag:${target}:42`) || 0) !== 79;
  for (;;) {
    era.print('对哪里进行凌辱？'); // :53
    era.printButton('嘴巴', 0); // :54 [0]（无条件）
    era.println();
    era.printButton('胸部', 1); // :55 [1]（无条件）
    era.println();
    if (show_vagina) {
      era.printButton('私处', 2); // :56-57 [2]
      era.println();
    }
    era.printButton('肛门', 3); // :58 [3]（无条件）
    era.println();
    era.printButton('暂时放过', 999); // :59 [999]
    era.println();
    const result = await era.input(); // :61

    if (result === 0) {
      // :63-71 口交
      era.print(`＜${cfg.label}${MONSTER_SEP}口交＞`);
      const com_result = await call_insult_com(31);
      if (com_result === 0) {
        return 0; // :67-69
      }
      era.add('tflag:402', cfg.income(lose(target, 0)) + rand(com_result)); // :71
    } else if (result === 1) {
      // :72-77 胸爱抚
      era.print(`＜${cfg.label}${MONSTER_SEP}胸爱抚＞`);
      const com_result = await call_insult_com(5);
      era.add('tflag:402', cfg.income(lose(target, 0)) + rand(com_result)); // :77
    } else if (result === 2) {
      // :78-89 背后位（执行条件比显示条件多一条贞操带复合判定）
      if (
        era.get(`talent:${target}:122`) ||
        era.get(`talent:${target}:273`) ||
        ((era.get(`cflag:${target}:42`) || 0) === 79 &&
          ((era.get(`cflag:${target}:40`) || 0) & 64) !== 0 &&
          era.get('flag:37'))
      ) {
        return 0; // :80-81（按钮已滤显示条件，执行侧双保险 1:1）
      }
      era.print(`＜${cfg.label}${MONSTER_SEP}背后位＞`);
      const com_result = await call_insult_com(21);
      if (com_result === 0) {
        return 0; // :85-87 处女を奪わせなかった
      }
      era.add('tflag:402', cfg.income(lose(target, 0)) + rand(com_result)); // :89
    } else if (result === 3) {
      // :90-95 背后位肛交
      era.print(`＜${cfg.label}${MONSTER_SEP}背后位肛交＞`);
      const com_result = await call_insult_com(27);
      era.add('tflag:402', cfg.income(lose(target, 0)) + rand(com_result)); // :95
    } else if (result === 999) {
      // :96-98 暂时放过——出口因文件而异：202-205 源有 RETURN 0（整条
      // 指令作废）；COM206 缺 RETURN 0（#14 第七批）——照走射精检查并
      // RETURN 1。两型由 monster_com 按 RETIRE 区分处理
      era.print(`${chara_callname(MASTER)}${cfg.retire}`);
      await era.waitAnyKey();
      return RETIRE;
    } else {
      continue; // :99-100
    }
    return 1;
  }
}

/** 文本模板 {t} = 目标名的展开 */
function monster_text(template, target_name) {
  return template.replaceAll('{t}', target_name);
}

/**
 * @COM202–206 的共用主体（五文件同构段；COM206 的三处独有差异——拡張
 * 経験块、999 缺 RETURN 0、陷落行的等待——以 cfg 标记接入）。
 *
 * @param {number} com 指令号
 * @param {MonsterConfig} cfg
 * @param {(n: number) => number} [rand] RAND:N 随机源（收入加算）
 * @returns {Promise<number>} 0/1（0 = 回合作废，引擎重新要求输入）
 */
async function monster_com(com, cfg, rand = default_rand) {
  const target = era_flag.target;
  const target_name = chara_callname(target);
  era.print(cfg.label); // :9

  await train_message_b(); // :11

  // —— 戦闘値の計算（:17-20）——
  // 魔王等级（字面角色 0，见文件头「变量承载」）
  const level = era.get('cflag:0:9') || 0;
  const weak = (era.get(`base:${target}:0`) || 0) <= 0; // BASE:0 <= 0
  add_lose(target, 0, cfg.open_lose0(level, weak));
  add_lose(target, 1, cfg.open_lose1(level));

  const slave_point = arena_slave_point(); // :20

  // —— 戦闘点が低ければ追加ダメージ（:21-38）——
  const fainted = (era.get('tflag:899') || 0) > 0; // 失神中
  if (slave_point < cfg.threshold(level) || fainted) {
    if ((era.get(`base:${target}:1`) || 0) <= 0 || fainted) {
      // :23-25 気力 0（或失神）：追加伤害无し
      era.print(monster_text(cfg.lose_no_stamina, target_name));
      await era.waitAnyKey();
    } else {
      era.print(monster_text(cfg.lose_hit, target_name));
      await era.waitAnyKey();
      const [extra0, extra1] = monster_extra(cfg, level);
      add_lose(target, 0, extra0); // :29-30
      add_lose(target, 1, extra1);
      if ((era.get(`base:${target}:1`) || 0) < lose(target, 1)) {
        // :31-34 気力 < 累计损耗
        era.print(monster_text(cfg.lose_down, target_name));
        await era.waitAnyKey();
        era.print('＜奴隶陷落＞');
        if (cfg.fall_waits !== false) {
          await era.waitAnyKey(); // PRINTW（COM204 源是 PRINTL，无等待）
        }
      }
    }
  } else {
    era.print(monster_text(cfg.win, target_name)); // :36-38
    await era.waitAnyKey();
  }

  era.set('tflag:400', com); // :43
  const after = await com_after_arena(); // :42
  if (after === 0) {
    return 1; // :43-44 胜利即收场
  }

  // —— 各種コマンドへ（:52-101）——
  const outcome = await monster_insult_menu(cfg, rand);
  if (outcome === 0) {
    return 0; // 子指令失败（:69-70 等的 SIF RESULT == 0 RETURN 0）
  }
  if (outcome === RETIRE && !cfg.no_999_return) {
    return 0; // 999 暂时放过（COM206 缺此 RETURN——见 cfg.no_999_return）
  }

  // —— COM206 独有：拡張経験（:108-126）——
  if (cfg.expansion_exp) {
    if ((era.get(`exp:${target}:52`) || 0) === 0 && era_flag.selectcom === 21) {
      chara(target).dungeon.异常经验 += 1; // EXP:50（属主 dungeon，门面）
      era.print('异常经验＋１');
    }
    if (era_flag.selectcom === 21) {
      chara(target).dungeon.私处扩张经验 += 1; // EXP:52
      era.print('私处扩张经验＋1');
    }
    if ((era.get(`exp:${target}:53`) || 0) === 0 && era_flag.selectcom === 27) {
      chara(target).dungeon.异常经验 += 1; // EXP:50
      era.print('异常经验＋１');
    }
    if (era_flag.selectcom === 27) {
      chara(target).dungeon.肛门扩张经验 += 1; // EXP:53
      era.print('肛门扩张经验＋1');
    }
  }

  await monster_ejaculation();
  return 1; // :289
}

/**
 * 射精チェック + 汚れ（COM202-206 的 :103-289 段逐字同构，兽奸コマンド
 * 的改編）。读 MASTER 的触手射精槽（BASE:4）、目标的 ABL/PALAM/SOURCE，
 * 写 TFLAG:0/2/38/15 与 STAIN。SELECTCOM = 凌辱子指令的号。
 *
 * @returns {Promise<void>}
 */
async function monster_ejaculation() {
  const target = era_flag.target;
  const master = MASTER;
  const selectcom = era_flag.selectcom;

  // :107-108 MAXBASE:MASTER:4 == 0（无射精槽）→ 跳过整段
  if ((era.get(`maxbase:${master}:4`) || 0) === 0) {
    return;
  }

  // —— 射精量 B（:110-177）——
  let b = 0; // :110
  // :112-125 ABL:12（技巧）分档（≥5 落 ELSE）
  const abl12 = Math.min(Math.floor(era.get(`abl:${target}:12`) || 0), 5);
  b = [450, 1000, 1600, 2200, 2700, 3200][abl12];
  // :127-141 ABL:10（顺从）倍率
  const abl10 = Math.min(Math.floor(era.get(`abl:${target}:10`) || 0), 5);
  b = times(b, [0.3, 0.5, 0.7, 1.0, 1.2, 1.3][abl10]);
  // :143-157 PALAM:5（欲情）倍率（对 PALAMLV 阈值）
  const palam5 = era.get(`palam:${target}:5`) || 0;
  const lust_level = [1, 2, 3, 4, 5].findIndex((lv) => palam5 < PALAMLV[lv]);
  b = times(
    b,
    [1.0, 1.1, 1.2, 1.3, 1.4, 1.5][lust_level === -1 ? 5 : lust_level],
  );
  // :159-177 SELECTCOM 倍率（キス=6 归零 / 背后位=21 / 肛交=27 / 手淫=30 /
  // 口交=31 / 骑乘位=34 / 其余归零）
  if (selectcom === 6) {
    b = 0;
  } else if (selectcom === 21) {
    // ×1.00（省略）
  } else if (selectcom === 27) {
    b = times(b, 1.5);
  } else if (selectcom === 30) {
    b = times(b, 0.8);
  } else if (selectcom === 31) {
    b = times(b, 1.2);
  } else if (selectcom === 34) {
    b = times(b, 1.5);
  } else {
    b = 0;
  }

  era.add(`base:${master}:4`, b); // :179（BASE:2-4 属主 train，直写）

  // —— 射精判定 E（:181-190）——
  const s = era.get(`base:${master}:4`) || 0; // :181 S = BASE:MASTER:4
  const ejac = era.get(`maxbase:${master}:4`) || 0; // :182 EJAC = MAXBASE:4
  let e = 0; // :184-190
  if (s > ejac * 2) {
    e = 2;
  } else if (s > ejac) {
    e = 1;
  }

  // :192-224 射精している → SOURCE 修正（精液中毒 ABL:32 分档）
  const src = (idx) => era.get(`source:${target}:${idx}`) || 0;
  const set_src = (idx, v) => era.set(`source:${target}:${idx}`, v);
  if (e) {
    set_src(4, times(src(4), 3.0)); // :194 SOURCE:4（性行为）×3
    const abl32 = Math.min(Math.floor(era.get(`abl:${target}:32`) || 0), 5);
    // :196-224 SOURCE:7（成瘾追加）定值 + SOURCE:5（达成感）/SOURCE:13（屈从）倍率
    set_src(7, [0, 200, 500, 1200, 2500, 5000][abl32]);
    set_src(5, times(src(5), [2.0, 2.5, 3.0, 4.5, 6.0, 8.0][abl32]));
    set_src(13, times(src(13), [2.0, 1.6, 1.0, 0.7, 0.4, 0.1][abl32]));
  }

  // —— 大量/通常射精（:225-260）——
  if (e === 2) {
    chara(target).dungeon.精液经验 += 3; // :226 EXP:20（属主 dungeon，门面）
    era.print('怪物大量射精'); // :227
    era.print('精液经验＋３'); // :228
    era.add(`base:${master}:4`, -ejac * 2); // :230
    if ((era.get(`base:${master}:4`) || 0) >= ejac) {
      era.set(`base:${master}:4`, ejac - 1); // :231-232
    }
    if (selectcom === 21 || selectcom === 34) {
      era.set('tflag:38', 2); // :233-235 私处内射精（怪物）
    }
    if (selectcom === 31) {
      era.set('tflag:0', 2); // :236-238 口交射精
    }
    if (selectcom === 21 || selectcom === 27) {
      era.set('tflag:2', 2); // :239-241 性行为射精
    }
  } else if (e === 1) {
    chara(target).dungeon.精液经验 += 1; // :244
    era.print('怪物射精'); // :245
    era.print('精液经验＋1'); // :246
    era.add(`base:${master}:4`, -ejac); // :248
    if ((era.get(`base:${master}:4`) || 0) >= ejac) {
      era.set(`base:${master}:4`, ejac - 1); // :249-250
    }
    if (selectcom === 21 || selectcom === 34) {
      era.set('tflag:38', 1); // :251-253
    }
    if (selectcom === 31) {
      era.set('tflag:0', 1); // :254-256
    }
    if (selectcom === 21 || selectcom === 27) {
      era.set('tflag:2', 1); // :257-259
    }
  }

  // —— 汚れ（:267-284；STAIN 属主 train，直写；位 2=精液 4=大量 8=??）——
  const stain_or = (idx, bit) =>
    era.set(
      `stain:${target}:${idx}`,
      (era.get(`stain:${target}:${idx}`) || 0) | bit,
    );
  if (selectcom === 21) {
    stain_or(3, 2); // :267-268 私处
  }
  if (selectcom === 27) {
    stain_or(4, 2); // :269-270 肛门
  }
  if (selectcom === 30) {
    stain_or(1, 2); // :271-272 手
  }
  if (selectcom === 31) {
    stain_or(0, 2); // :273-274 口
  }
  if (selectcom === 37) {
    stain_or(0, 8); // :275-276 足交（SELECTCOM 37，本族菜单不可达，1:1 保留）
  }
  if (selectcom === 21 && e > 0) {
    stain_or(3, 4); // :277-278
  }
  if (selectcom === 27 && e > 0) {
    stain_or(4, 4); // :279-280
  }
  if (selectcom === 30 && e > 0) {
    stain_or(1, 4); // :281-282
  }
  if (selectcom === 31 && e > 0) {
    stain_or(0, 4); // :283-284
  }

  era.set('tflag:15', e); // :287 死斗场怪物が射精フラグ（source-check/A 头消费）
}

/**
 * @COM207（COMF207_媚薬スライム.ERB:9-63）：媚药史莱姆——只削气力的要员，
 * 三支凌辱全部 JUMP COM51（媚药灌入）。
 *
 * 不消费随机源（三支 JUMP 之后的收入行是死码，见文件头）。
 *
 * @returns {Promise<number>} 子指令（COM51）的 RETURN 值或 0/1
 */
async function com207() {
  const target = era_flag.target;
  const target_name = chara_callname(target);
  era.print('媚药史莱姆'); // :9

  await train_message_b(); // :11

  // —— 戦闘値の計算（:16-18）——
  const level = era.get('cflag:0:9') || 0;
  add_lose(target, 1, level * 10); // :18（LOSEBASE:0 无し——气力要员）

  const slave_point = arena_slave_point(); // :18

  // :21-38（无失神判定——207 的条件式不带 TFLAG:899，源即如此）
  if (slave_point < 5 * level) {
    if ((era.get(`base:${target}:1`) || 0) <= 0) {
      era.print(`${target_name}被媚药史莱姆包裹着，完全无法抵抗了。`);
      await era.waitAnyKey();
    } else {
      era.print(`${target_name}被媚药史莱姆包裹着，动弹不得。`);
      await era.waitAnyKey();
      add_lose(target, 1, level * 10); // :31
      if ((era.get(`base:${target}:1`) || 0) < lose(target, 1)) {
        // :28-30（源缩进多一层，无语义）
        era.print(`然后，${target_name}被淹没在媚药史莱姆的体内了。`);
        await era.waitAnyKey();
        era.print('＜奴隶陷落＞');
        await era.waitAnyKey();
      }
    }
  } else {
    era.print(`${target_name}躲过媚药史莱姆的包围，拼命地逃跑着。`);
    await era.waitAnyKey();
  }

  era.set('tflag:400', 207); // :40
  const after = await com_after_arena(); // :45
  if (after === 0) {
    return 1; // :46-47
  }

  // —— 凌辱菜单（:46-79；全部 JUMP COM51 = 尾调用）——
  for (;;) {
    era.print('把粘液灌到哪里？？'); // :47
    era.printButton('嘴巴', 0); // :48
    era.println();
    if (!(era.get(`talent:${target}:122`) || 0)) {
      era.printButton('私处', 1); // :49-50（男人不显示）
      era.println();
    }
    era.printButton('肛门', 2); // :51
    era.println();
    era.printButton('暂时放过', 999); // :52
    era.println();
    const result = await era.input(); // :54

    if (result === 0) {
      // :56-59 嘴巴：JUMP COM51（之后的收入行是死码，不移植）
      era.print(`在倒下的${target_name}嘴里，灌入了大量的粘液。`);
      await era.waitAnyKey();
      return await call_insult_com(51);
    }
    if (result === 1) {
      // :63-68 私处（执行侧的男人判定 :64-65 是双保险）
      if (era.get(`talent:${target}:122`)) {
        return 0; // :63-65 対象が男人なら戻る
      }
      era.print(
        `在倒下的${target_name}私处里，灌入了大量的粘液，从阴唇到子宫都灌满了。`,
      );
      await era.waitAnyKey();
      return await call_insult_com(51);
    }
    if (result === 2) {
      // :68-74 肛门
      era.print(`在倒下的${target_name}肛门里，灌入了大量的粘液。`);
      await era.waitAnyKey();
      return await call_insult_com(51);
    }
    if (result === 999) {
      // :77 空支（:82 RETURN 1）
      return 1;
    }
    // :78-79 GOTO INPUT_LOOP_0（引擎层拒收代位）
  }
}

// —— @COM_ABLE200–207（COMABLE.ERB:4650-4755） ——

com_able_family.register(200, async () => {
  // :4654-4655 自动不可（调教菜单实行中的 TFLAG:224 = 555）
  if ((era.get('tflag:224') || 0) === 555) {
    return 0;
  }
  const target = era_flag.target;
  const tequip = (idx) => era.get(`tequip:${target}:${idx}`) || 0;
  // :4657-4659 未在死斗场时，任何持续装备中使用中则不可开启（道具使用中はダメ）
  if (
    tequip(55) === 0 &&
    (tequip(11) ||
      tequip(13) ||
      tequip(14) ||
      tequip(15) ||
      tequip(16) ||
      tequip(17) ||
      tequip(19) ||
      tequip(43) ||
      tequip(44) ||
      tequip(45) ||
      tequip(46) ||
      tequip(49) ||
      tequip(54) ||
      tequip(89))
  ) {
    return 0;
  }
  // :4661-4684 其余互斥装备（野外/兽奸/使役/触手/淋浴/新妻/浴室/羞耻——
  // 54/89 与上表重复，源侧冗余 1:1 保留）
  if (tequip(54)) {
    return 0;
  }
  if (tequip(89)) {
    return 0;
  }
  if (tequip(88)) {
    return 0;
  }
  if (tequip(90)) {
    return 0;
  }
  if (tequip(18)) {
    return 0;
  }
  if (tequip(59)) {
    return 0;
  }
  if (tequip(58)) {
    return 0;
  }
  if (tequip(57)) {
    return 0;
  }
  // :4686-4687 无观战券（ITEM:35）不可
  if ((era.get('item:35') || 0) === 0) {
    return 0;
  }
  return 1; // :4688
});

com_able_family.register(201, async () => {
  // :4693-4694 死斗场中才有
  if ((era.get(`tequip:${era_flag.target}:55`) || 0) === 0) {
    return 0;
  }
  // :4695-4696 助手亲自出战才有
  if (era_flag.player !== era_flag.assi) {
    return 0;
  }
  return 1; // :4697
});

// 202-207 共用形状：死斗场中 + 助手调教不可 + （203 起）调教者等级门槛。
// 等级门槛读 CFLAG:PLAYER:9（与战斗段的 CFLAG:0:9 不对称，1:1 保留）
for (const [com, min_level] of [
  [202, 0],
  [203, 20],
  [204, 40],
  [205, 60],
  [206, 80],
  [207, 100],
]) {
  com_able_family.register(com, async () => {
    if ((era.get(`tequip:${era_flag.target}:55`) || 0) === 0) {
      return 0; // 死斗场判定（:4699 等）
    }
    if ((era.get(`cflag:${era_flag.player}:9`) || 0) < min_level) {
      return 0; // 等级门槛（:4705 等；202 无此段 = 0 恒过）
    }
    if (era_flag.assiplay) {
      return 0; // 助手じゃ駄目（:4712 等）
    }
    return 1;
  });
}

// —— @COM202–206 注册（配置差异见 MONSTER_CONFIGS；206 的两处独有差异
// （拡張経験块、999 缺 RETURN 0）以标记接入）——
for (const [com, cfg] of Object.entries(MONSTER_CONFIGS)) {
  com_family.register(Number(com), (rand) =>
    monster_com(Number(com), cfg, rand),
  );
}
MONSTER_CONFIGS[206].expansion_exp = true; // :108-126 拡張経験块（COM206 独有）
MONSTER_CONFIGS[206].no_999_return = true; // :98-99 缺 RETURN 0（#14 第七批）

com_family.register(200, com200);
com_family.register(201, com201);
com_family.register(207, com207);

// —— TRAIN_MESSAGE 分支（#209 裁定 6：族段跟族票） ——

/**
 * @TRAIN_MESSAGE_B 的 SELECTCOM == 200 分支（EVENT_TRAIN_MESSAGE_B.ERB
 * :3010-3027）。读的 TEQUIP:55 是 COM200 翻转**前**的态：进入支（未在
 * 死斗场）与退出支（在死斗场）都由它区分——CALL 在翻转之前，1:1。
 *
 * @returns {Promise<void>}
 */
async function train_message_b_200() {
  const target = era_flag.target;
  const target_name = chara_callname(target);

  if (era.get(`tequip:${target}:55`)) {
    // :3011-3012 退出支
    era.print(`${chara_callname(era_flag.player)}把${target_name}带回了房间…`);
    return;
  }

  // :3014-3026 进入支。服装前缀（CFLAG:40/42 的位 64/28——#215 起真身，
  // ere/page/page-clothtype.js 的取值函数返回名字串，行内 PRINT 习语的
  // ere 等价物）与 com0 分支的 :29-39 同款判据
  const cloth_bits = era.get(`cflag:${target}:40`) || 0;
  const special_type = era.get(`cflag:${target}:42`) || 0;
  let prefix;
  if ((cloth_bits & 64) !== 0 && special_type <= 50) {
    prefix = `${clothtype_special_text(target)}的模样、`; // :3016-3018
  } else if ((cloth_bits & 28) !== 0) {
    prefix = `${clothtype_main2_text(target)}的模样、`; // :3019-3021
  } else if (cloth_bits !== 0) {
    prefix = '下着的模样、'; // :3022-3023
  } else {
    prefix = '全裸的'; // :3024-3025
  }
  if ((era.get(`base:${target}:1`) || 0) <= 0) {
    // :3026-3027 気力已尽的长句（PRINTFORMW）
    era.print(
      `${prefix}${target_name}被带到了死斗场。${target_name}已经完全没有战斗的力气了…`,
    );
  } else {
    era.print(`${prefix}${target_name}被带到了死斗场…`); // :3028-3029
  }
  await era.waitAnyKey();
  // :3030-3032 三个省略行（PRINTW，逐行等键）
  for (const dots of ['……………', '…………', '………']) {
    era.print(dots);
    await era.waitAnyKey();
  }
  // :3033-3037 全裸判定（CFLAG:40 == 0）：示众两行（PRINTFORMW）
  if (cloth_bits === 0) {
    era.print(`${target_name}全裸地在死斗场中示众。`);
    await era.waitAnyKey();
    era.print(
      `被下流的笑容和好奇的视线所包围、${target_name}在异样的气氛中沉默不语。`,
    );
    await era.waitAnyKey();
  }
}

// B 的 201–207 / A 的 200–207：源侧 IF 链**没有这些号的分支**（凌辱情景
// 文本在子指令自己的 B 分支里）——注册显式无操作，压掉分发骨架对缺失
// 分支打的「族票未落地」占位行（那会是原作没有的输出）
const noop_branch = async () => {};

train_message_b_family.register(200, train_message_b_200);
for (let com = 201; com <= 207; com += 1) {
  train_message_b_family.register(com, noop_branch);
}
for (let com = 200; com <= 207; com += 1) {
  train_message_a_family.register(com, noop_branch);
}

module.exports = {
  MONSTER_CONFIGS,
  arena_assi_point,
  arena_slave_point,
  com_after_arena,
};
