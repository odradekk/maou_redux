/**
 * @file 调教指令 200–207「死斗场与怪物」族：com_family 的 200–207 号指令 +
 * 可用性判定 + train_message_a/b 分支（issue #230 / 阶段 4 轴 A J20）。
 *
 * == 本族的三个结构事实 ==
 *
 * 1. **跨族战斗接口**：com_after_arena、arena_slave_point、arena_assi_point
 *    均由本模块导出，其他指令族可直接复用。
 *    触手族（J17 #227）调用前两者，
 *    不需要另外实现陷落检查与奴隶战斗点计算。
 * 2. **死斗场无装备持续效果注册**：source-check.js 按装备链顺序遍历
 *    11/13-19/43-47/49/53-59/89/90/98，
 *    其中不含死斗场位 55，因此为它注册持续效果也不会执行。
 * 3. **指令返回 0 = 取消本回合**：不进行 source-check 结算，
 *    不推进 PREVCOM，重新显示调教界面。
 *    com201 的「暂时放过」与子指令失败分支、202–205 号指令的同类分支、
 *    com207 的男人私处分支都会返回 0；
 *    取消语义由 train-loop.js 的 execute_command_round 处理。
 *
 * == 变量承载 ==
 *
 *   - LOSEBASE:0/1 → `deltabase:${cid}:0/1` 的负值累加（读数 = 负值取反）；
 *   - UP:10 → `delta:${cid}:10`（恐怖，nextTurnInTrain 结算）；
 *   - SOURCE:xx → `source:${cid}:xx`；EXP/STAIN/TFLAG/TEQUIP/ITEM 同名直写
 *     （域内属主）；
 *   - 跨域写走门面：BASE:ASSI:0/1（属主 dungeon，COM201 反击支）与
 *     EXP:20/50/52/53（同属 dungeon，怪物射精/扩张）经 chara(cid).dungeon；
 *   - CFLAG:0:9 是**字面角色 0**（魔王等级）。战斗段按魔王等级缩放、可用性
 *     门槛（CFLAG:PLAYER:9）按调教者等级判——两处等级有意不对称。
 *
 * == 凌辱菜单的按钮输入（PR #53） ==
 *
 * ere 引擎在画面有按钮时拒收非按钮输入，因此菜单使用 printButton。
 * 快捷键沿用指令编号，引擎自动为正文拼上 `[n] ` 前缀，
 * 正文不重复编号，也不添加 ` - ` 分隔。
 * 无效输入由引擎拒收。com207 的三个凌辱分支均为尾调用，
 * 直接返回 com_family.call(51, …)，不再计算收入。
 *
 * == 消息分支（train_message_a/b 的族段） ==
 *
 *   - B 的 SELECTCOM == 200 分支由本模块注册；201–207 不另设 A/B
 *     情景文本。凌辱情景由子指令自己的 B 分支输出，
 *     根据 SELECTCOM=31/21/… 分发；这些号注册无操作分支，
 *     避免分发骨架把无需输出的情况当成缺失分支并显示占位提示。
 *   - A 公共头的 TFLAG:15（怪物射精旗标）两个分支在 TEQUIP:55 时
 *     输出灌精文本，实现在 train-message.js；非死斗场的触手分支
 *     由触手族（J17）负责。
 *
 * 本文件口上由轴 B 的模块负责，
 * kojo_message_com 按 TEQUIP:55 分发死斗场口上；
 * 子指令 5/21/27/31/51 经 com_family 分发，缺失时按调用点声明的
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

/** 主人：角色 0 */
const MASTER = 0;

/** PBAND:0（EVENTFIRST 置 4）——ITEM:PBAND 即 ITEM:4 假阳具（持有判定） */
const PBAND = 4;

// 凌辱标题的主体・动作分隔（＜助手・口交＞ 一族的间隔号）：全角「・」是
// 标题排版的组成部分——lang-table.js 的 EXEMPT_STRINGS 有本字面量的整串
// 豁免（#212/#213 的 COMPOUND_SEP 同款处置，动态拼名走本常量）
const MONSTER_SEP = '・';

/** times：整数乘小数后截断 */
const times = (v, m) => Math.floor(v * m);
/** 整数除法：正数域向下取整 */
const idiv = (a, b) => Math.floor(a / b);

/** RAND:N 的缺省随机源（[0, n) 整数；测试注入定值序，benki/com-adv 先例） */
function default_rand(n) {
  return Math.floor(Math.random() * n);
}

// 目标的 LOSEBASE 读数（deltabase 存负值；source-check 同款取反）
const lose = (cid, k) => -1 * (era.get(`deltabase:${cid}:${k}`) || 0);
const add_lose = (cid, k, v) => era.add(`deltabase:${cid}:${k}`, -v);

/**
 * com200：死斗场的进入/退出开关。
 * @returns {Promise<number>} 返回 1
 */
async function com200() {
  const target = era_flag.target;
  era.print('死斗场决斗');
  await train_message_b();

  if (era.get(`tequip:${target}:55`)) {
    // 退出：清死斗场位、扣一张观战券（ITEM:35）
    era.set(`tequip:${target}:55`, 0);
    era.add('item:35', -1); // item 表 34-35 属主 train，直写
  } else {
    // 进入：置位、清陷落旗标、按胆怯/感情淡薄缩放的体力气力损耗
    era.set(`tequip:${target}:55`, 1);
    era.set('tflag:401', 0);
    let a = 100; // A = 100
    if (era.get(`talent:${target}:10`)) {
      a = times(a, 2.0); // 胆怯
    }
    if (era.get(`talent:${target}:22`)) {
      a = times(a, 0.6); // 感情淡薄
    }
    add_lose(target, 0, a);
    add_lose(target, 1, a * 2);
    era.add(`delta:${target}:10`, a * 20); // UP:10（恐怖）
    era.add(`source:${target}:14`, a * 5); // SOURCE:14（逃离）
  }
  // T = 0 —— 死写（全库无读者），不移植
  return 1;
}

/**
 * com_after_arena：死斗场战斗后的陷落检查。
 * 气力有余 = 胜利（斗技胜利经验 +1，RETURN 0）；气力耗尽 = 奴隶陷落
 * （TFLAG:401 置位，助手出战且气力 < 1/5 时助手退却，RETURN 1）。
 *
 * 触手族（J17）复用此检查，因此导出。
 *
 * @returns {Promise<number>} 0 = 胜利 / 1 = 陷落
 */
async function com_after_arena() {
  const target = era_flag.target;
  if ((era.get(`base:${target}:1`) || 0) > 0) {
    // 胜利
    era.print('斗技胜利经验+1');
    era.add(`exp:${target}:76`, 1); // EXP:76 斗技胜利经验（属主 train，直写）
    return 0;
  }

  era.print('＜奴隶陷落＞');
  era.set('tflag:401', 1); // （全库无读者，陷落旗标照写）

  if (era_flag.assi === era_flag.player) {
    // 助手亲自出战且气力 < 上限 1/5 → 助手退却（调教者归还主人）
    if (
      (era.get(`base:${era_flag.assi}:1`) || 0) <
      idiv(era.get(`maxbase:${era_flag.assi}:1`) || 0, 5)
    ) {
      era.print('＜助手退却＞');
      era_flag.assiplay = 0;
      era_flag.player = MASTER;
    }
  }
  return 1;
}

/**
 * arena_slave_point：奴隶战斗点。
 * 攻防值（CFLAG:11/12，经 weapon_restore 重算）+ 魔术/咒术等级×2，
 * 按气力比例折减、下限 1。触手族（J17）也使用此值，因此导出。
 *
 * @returns {number} 战斗点（B）
 */
function arena_slave_point() {
  const a = era_flag.target; // A = TARGET
  weapon_restore(a); // 战闘値セット
  let b = 0;
  b += era.get(`cflag:${a}:11`) || 0; // 攻击值
  b += era.get(`cflag:${a}:12`) || 0; // 防御值
  if ((era.get(`talent:${a}:241`) || 0) === 1) {
    b += (era.get(`cflag:${a}:9`) || 0) * 2; // 魔术
  }
  if ((era.get(`talent:${a}:250`) || 0) === 1) {
    b += (era.get(`cflag:${a}:9`) || 0) * 2; // 咒术
  }
  // 気力によって戦闘値が減少（整数除法）
  b *= era.get(`base:${a}:1`) || 0;
  b = idiv(b, era.get(`maxbase:${a}:1`) || 0);
  if (b <= 0) {
    b = 1;
  }
  return b;
}

/**
 * arena_assi_point：助手战斗点。与奴隶版使用相同计算结构，
 * 気力折减一段先各自 /100（比例不变，中间量的整数截断有差）。
 *
 * @returns {number} 战斗点（B）
 */
function arena_assi_point() {
  const a = era_flag.assi; // A = ASSI
  weapon_restore(a);
  let b = 0;
  b += era.get(`cflag:${a}:11`) || 0;
  b += era.get(`cflag:${a}:12`) || 0;
  if ((era.get(`talent:${a}:241`) || 0) === 1) {
    b += (era.get(`cflag:${a}:9`) || 0) * 2;
  }
  if ((era.get(`talent:${a}:250`) || 0) === 1) {
    b += (era.get(`cflag:${a}:9`) || 0) * 2;
  }
  // 気力比例（先各自 /100 再除）
  b *= idiv(era.get(`base:${a}:1`) || 0, 100);
  b = idiv(b, idiv(era.get(`maxbase:${a}:1`) || 0, 100));
  if (b <= 0) {
    b = 1;
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
 * 凌辱指令分发：先回填 selectcom，再调用对应指令。
 * 别族指令（#219/#221/#222/#224）经 com_family 调用，不另注册；
 * 缺失时返回 whenMissing: 0（执行失败），
 * 调用方随即取消本回合（#7 决议：缺失值由调用点声明）。
 *
 * @param {number} com 指令号（L_I）
 * @returns {Promise<number>} 子指令的 RETURN 值
 */
function call_insult_com(com) {
  era_flag.selectcom = com;
  return com_family.call(com, { whenMissing: 0 });
}

/**
 * com201：死斗场·助手战。
 * @param {(n: number) => number} [rand] RAND:N 随机源（收入加算的 RAND:RESULT）
 * @returns {Promise<number>} 0/1（0 = 回合作废，引擎重新要求输入）
 */
async function com201(rand = default_rand) {
  const target = era_flag.target;
  const assi = era_flag.assi; // SAVESTR:ASSI 的显示名来源
  // 非助手亲自出战不可执行，与 201 号可用性检查共同限制
  if (assi !== era_flag.player) {
    return 0;
  }

  era.print('助手');
  await train_message_b();

  // 助手战斗点 → 双方的体力气力损耗
  const assi_point = arena_assi_point();
  add_lose(target, 0, assi_point);
  add_lose(target, 1, assi_point * 10);

  const slave_point = arena_slave_point();

  if (slave_point < assi_point) {
    // 奴隶战斗点更低 → 被压制
    if ((era.get(`base:${target}:1`) || 0) <= 0) {
      // 気力 0：追加伤害无し
      era.print(`${chara_callname(assi)}将${chara_callname(target)}踩在脚下。`);
      await era.waitAnyKey();
    } else {
      era.print(
        `${chara_callname(target)}完全无法抵挡${chara_callname(assi)}的攻击！`,
      );
      await era.waitAnyKey();
      add_lose(target, 0, assi_point); // 追加ダメージ
      add_lose(target, 1, assi_point * 5);
      if ((era.get(`base:${target}:1`) || 0) < lose(target, 1)) {
        // 气力 < 累计损耗 → 武器被打掉（陷落由 com_after_arena 报出）
        era.print(
          `然后，${chara_callname(assi)}发出痛恨的一击，将${chara_callname(target)}的武器打掉了。`,
        );
        await era.waitAnyKey();
        era.print('＜奴隶陷落＞');
        await era.waitAnyKey();
      }
    }
  } else {
    // 奴隶反击：直接扣助手体力气力（BASE:0/1 属主 dungeon，走门面）
    era.print(`${chara_callname(target)}对${chara_callname(assi)}进行了反击。`);
    await era.waitAnyKey();
    chara(assi).dungeon.体力 -= slave_point;
    chara(assi).dungeon.气力 -= slave_point * 10;
  }

  // TFLAG:400 = 201（死斗场敌种，B 分支与 source-check 读）
  era.set('tflag:400', 201);
  const after = await com_after_arena();
  if (after === 0) {
    return 1; // 胜利即收场
  }
  if (era_flag.assi !== era_flag.player) {
    return 1; // 战斗中助手退却 → 暂时放过
  }

  // 凌辱菜单（按钮输入规则见文件头）
  const penetrator = assi_can_penetrate(era_flag.assi);
  // [2] 私处的显示与执行使用相同条件：须能插入、非男人、
  // 无私处封印、非贞操带（CFLAG:42 != 79）、（未熟时须施虐狂助手）
  const can_vagina =
    penetrator &&
    !era.get(`talent:${target}:122`) &&
    !era.get(`talent:${target}:273`) &&
    (era.get(`cflag:${target}:42`) || 0) !== 79 &&
    (!era.get(`talent:${target}:135`) ||
      (era.get(`talent:${era_flag.assi}:83`) || 0) === 1);
  for (;;) {
    // 每个按钮自成一行，
    // 相互之间不补空行（#595）。
    era.print('对哪里进行凌辱？');
    if (penetrator) {
      era.printButton('- 嘴巴', 0); // [0]
    }
    era.printButton('- 胸部', 1); // [1]（无条件）
    if (can_vagina) {
      era.printButton('- 私处', 2); // [2]
    }
    if (penetrator) {
      era.printButton('- 肛门', 3); // [3]
    }
    era.printButton('暂时放过', 999); // [999]
    const result = await era.input();

    if (result === 0 && penetrator) {
      // 助手・口交
      era.print('＜助手・口交＞');
      const com_result = await call_insult_com(31);
      if (com_result === 0) {
        return 0; // 口交実行不可
      }
      // 死斗场収入（LOSEBASE:0 × 5 + RAND:RESULT；过滤后 RESULT 恒 1，
      // RAND:1 恒 0——按算式照写）
      era.add('tflag:402', lose(target, 0) * 5 + rand(com_result));
    } else if (result === 1) {
      // 助手・胸爱抚（无実行不可检查——COM5 支无結果検査行）
      era.print('＜助手・胸爱抚＞');
      const com_result = await call_insult_com(5);
      era.add('tflag:402', lose(target, 0) * 5 + rand(com_result));
    } else if (result === 2 && can_vagina) {
      // 助手・背后位
      if (era.get(`talent:${target}:122`)) {
        return 0; // 対象是男人（菜单已滤，执行侧双保险）
      }
      era.print('＜助手・背后位＞');
      const com_result = await call_insult_com(21);
      if (com_result === 0) {
        return 0; // 处女を奪わせなかった
      }
      era.add('tflag:402', lose(target, 0) * 5 + rand(com_result));
    } else if (result === 3 && penetrator) {
      // 助手・背后位肛交
      era.print('＜助手・背后位肛交＞');
      const com_result = await call_insult_com(27);
      era.add('tflag:402', lose(target, 0) * 5 + rand(com_result));
    } else if (result === 999) {
      // 暂时放过
      era.print(
        `${chara_callname(MASTER)}叫${chara_callname(era_flag.assi)}退下了……`,
      );
      await era.waitAnyKey();
      return 0;
    } else {
      continue; // GOTO INPUT_LOOP_0（引擎层拒收代位，防御性保留）
    }
    return 1;
  }
}

/**
 * 怪物战斗配置：202–206 号指令共用 monster_com，差异集中在此表。
 * level = CFLAG:0:9（魔王等级，字面角色 0）。
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
 * @property {string} win 奴隶战斗点不低时的文本
 * @property {string} retire 999 的退下文本（前接主人名）
 */

/** 203–206 号指令的开战 LOSEBASE:0：体力枯竭（BASE:0 <= 0）时 /=4 */
function monster_lose0(base_value, weak) {
  return weak ? idiv(base_value, 4) : base_value;
}

// 202–206 号指令的战斗配置表
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
    threshold: (level) => 2 * level, // IF RESULT < (2 * CFLAG:0:9)
    extra_lose: ['level', 'level'], // [L9, L9]
    income: (lose0) => lose0 * 2,
    lose_no_stamina: '霉菌犬压着筋疲力尽的{t}扭动着腰。',
    lose_hit: '{t}吸入了霉菌犬的有毒吐息。',
    lose_down: '随后筋疲力尽地倒下了。',
    win: '{t}闭气躲过霉菌犬的有毒气息，拼命逃跑着。',
    retire: '让霉菌犬退下了……', // PRINTFORMW %SAVESTR:MASTER%让霉菌犬退下了……
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
    win: '{t}一边躲闪，一边思考如何反击兽人。',
    retire: '让兽人退下了……',
  },
  205: {
    label: '腐烂猪',
    open_lose0: (level, weak) => monster_lose0(idiv(level * 25, 10), weak),
    open_lose1: (level) => level * 20,
    threshold: (level) => 4 * level, // IF RESULT < (4 * CFLAG:0:9)
    extra_lose: ['level*2', 'level*2'],
    income: (lose0) => lose0 * 4,
    lose_no_stamina:
      '腐烂猪跑到{t}的身边蹲下，做标记似得在她身上蹭着腐败的液体。',
    lose_hit: '腐烂猪用腐败液体淋透了{t}全身！',
    lose_down: '{t}无法忍耐猛烈的臭气，跪倒在地。',
    win: '{t}向腐烂猪发动突击，才终于勉强打平。',
    retire: '让腐烂猪退下了……', // PRINTFORMW %SAVESTR:MASTER%让腐烂猪退下了……
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

// 999「暂时放过」的哨兵（与子指令失败 0 / 凌辱成立 1 区分——monster_com
// 按它返回 0 作废整条指令，与 COM201 的放过出口一致）
const RETIRE = Symbol('MONSTER_RETIRE');

/**
 * 五种怪物共用的凌辱菜单与收入计算（202–206 号指令）。
 * 各分支收入为 LOSEBASE:0 × 对应倍率 + RAND:RESULT，累加到 TFLAG:402。
 *
 * @param {MonsterConfig} cfg
 * @param {(n: number) => number} rand
 * @returns {Promise<number|symbol>} 1 = 凌辱成立 / 0 = 子指令失败
 *   （回合作废）/ RETIRE = 999 暂时放过
 */
async function monster_insult_menu(cfg, rand) {
  const target = era_flag.target;
  // [2] 私处的显示条件：非男人、无私处封印、非贞操带
  const show_vagina =
    !era.get(`talent:${target}:122`) &&
    !era.get(`talent:${target}:273`) &&
    (era.get(`cflag:${target}:42`) || 0) !== 79;
  for (;;) {
    // 202–206 号指令共用此菜单，每个按钮自成一行，
    // 按钮之间不补空行（#595）。
    era.print('对哪里进行凌辱？');
    era.printButton('- 嘴巴', 0); // [0]（无条件）
    era.printButton('- 胸部', 1); // [1]（无条件）
    if (show_vagina) {
      era.printButton('- 私处', 2); // [2]
    }
    era.printButton('- 肛门', 3); // [3]（无条件）
    era.printButton('暂时放过', 999); // [999]
    const result = await era.input();

    if (result === 0) {
      // 口交
      era.print(`＜${cfg.label}${MONSTER_SEP}口交＞`);
      const com_result = await call_insult_com(31);
      if (com_result === 0) {
        return 0;
      }
      era.add('tflag:402', cfg.income(lose(target, 0)) + rand(com_result));
    } else if (result === 1) {
      // 胸爱抚
      era.print(`＜${cfg.label}${MONSTER_SEP}胸爱抚＞`);
      const com_result = await call_insult_com(5);
      era.add('tflag:402', cfg.income(lose(target, 0)) + rand(com_result));
    } else if (result === 2) {
      // 背后位（执行条件比显示条件多一条贞操带复合判定）
      if (
        era.get(`talent:${target}:122`) ||
        era.get(`talent:${target}:273`) ||
        ((era.get(`cflag:${target}:42`) || 0) === 79 &&
          ((era.get(`cflag:${target}:40`) || 0) & 64) !== 0 &&
          era.get('flag:37'))
      ) {
        return 0; // （按钮已滤显示条件，执行侧双保险）
      }
      era.print(`＜${cfg.label}${MONSTER_SEP}背后位＞`);
      const com_result = await call_insult_com(21);
      if (com_result === 0) {
        return 0; // 处女を奪わせなかった
      }
      era.add('tflag:402', cfg.income(lose(target, 0)) + rand(com_result));
    } else if (result === 3) {
      // 背后位肛交
      era.print(`＜${cfg.label}${MONSTER_SEP}背后位肛交＞`);
      const com_result = await call_insult_com(27);
      era.add('tflag:402', cfg.income(lose(target, 0)) + rand(com_result));
    } else if (result === 999) {
      // 暂时放过：整条指令作废（monster_com 按 RETIRE 返回 0，
      // 与 COM201 的放过出口一致）
      era.print(`${chara_callname(MASTER)}${cfg.retire}`);
      await era.waitAnyKey();
      return RETIRE;
    } else {
      continue;
    }
    return 1;
  }
}

/** 文本模板 {t} = 目标名的展开 */
function monster_text(template, target_name) {
  return template.replaceAll('{t}', target_name);
}

/**
 * 202–206 号指令的共用主体，206 独有的扩张经验块
 * 通过 cfg 标记接入。
 *
 * @param {number} com 指令号
 * @param {MonsterConfig} cfg
 * @param {(n: number) => number} [rand] RAND:N 随机源（收入加算）
 * @returns {Promise<number>} 0/1（0 = 回合作废，引擎重新要求输入）
 */
async function monster_com(com, cfg, rand = default_rand) {
  const target = era_flag.target;
  const target_name = chara_callname(target);
  era.print(cfg.label);

  await train_message_b();

  // —— 战斗值计算 ——
  // 魔王等级（字面角色 0，见文件头「变量承载」）
  const level = era.get('cflag:0:9') || 0;
  const weak = (era.get(`base:${target}:0`) || 0) <= 0; // BASE:0 <= 0
  add_lose(target, 0, cfg.open_lose0(level, weak));
  add_lose(target, 1, cfg.open_lose1(level));

  const slave_point = arena_slave_point();

  // —— 战斗点较低时追加伤害 ——
  const fainted = (era.get('tflag:899') || 0) > 0; // 失神中
  if (slave_point < cfg.threshold(level) || fainted) {
    if ((era.get(`base:${target}:1`) || 0) <= 0 || fainted) {
      // 気力 0（或失神）：追加伤害无し
      era.print(monster_text(cfg.lose_no_stamina, target_name));
      await era.waitAnyKey();
    } else {
      era.print(monster_text(cfg.lose_hit, target_name));
      await era.waitAnyKey();
      const [extra0, extra1] = monster_extra(cfg, level);
      add_lose(target, 0, extra0);
      add_lose(target, 1, extra1);
      if ((era.get(`base:${target}:1`) || 0) < lose(target, 1)) {
        // 気力 < 累计损耗
        era.print(monster_text(cfg.lose_down, target_name));
        await era.waitAnyKey();
        era.print('＜奴隶陷落＞');
        await era.waitAnyKey(); // PRINTW（五体统一等键）
      }
    }
  } else {
    era.print(monster_text(cfg.win, target_name));
    await era.waitAnyKey();
  }

  era.set('tflag:400', com);
  const after = await com_after_arena();
  if (after === 0) {
    return 1; // 胜利即收场
  }

  // —— 凌辱子指令分发 ——
  const outcome = await monster_insult_menu(cfg, rand);
  if (outcome === 0) {
    return 0; // 子指令失败，取消本回合
  }
  if (outcome === RETIRE) {
    return 0; // 999 暂时放过：整条指令作废，不结算怪物射精
  }

  // —— 206 号指令独有：扩张经验 ——
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
  return 1;
}

/**
 * 202–206 号指令共用的射精检查与污渍处理。
 * 读取主人的触手射精槽（BASE:4）及目标的 ABL/PALAM/SOURCE，
 * 写 TFLAG:0/2/38/15 与 STAIN。SELECTCOM = 凌辱子指令的号。
 *
 * @returns {Promise<void>}
 */
async function monster_ejaculation() {
  const target = era_flag.target;
  const master = MASTER;
  const selectcom = era_flag.selectcom;

  // MAXBASE:MASTER:4 == 0（无射精槽）→ 跳过整段
  if ((era.get(`maxbase:${master}:4`) || 0) === 0) {
    return;
  }

  // —— 射精量 B ——
  let b = 0;
  // ABL:12（技巧）分档（≥5 落 ELSE）
  const abl12 = Math.min(Math.floor(era.get(`abl:${target}:12`) || 0), 5);
  b = [450, 1000, 1600, 2200, 2700, 3200][abl12];
  // ABL:10（顺从）倍率
  const abl10 = Math.min(Math.floor(era.get(`abl:${target}:10`) || 0), 5);
  b = times(b, [0.3, 0.5, 0.7, 1.0, 1.2, 1.3][abl10]);
  // PALAM:5（欲情）倍率（对 PALAMLV 阈值）
  const palam5 = era.get(`palam:${target}:5`) || 0;
  const lust_level = [1, 2, 3, 4, 5].findIndex((lv) => palam5 < PALAMLV[lv]);
  b = times(
    b,
    [1.0, 1.1, 1.2, 1.3, 1.4, 1.5][lust_level === -1 ? 5 : lust_level],
  );
  // SELECTCOM 倍率（キス=6 归零 / 背后位=21 / 肛交=27 / 手淫=30 /
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

  era.add(`base:${master}:4`, b); // （BASE:2-4 属主 train，直写）

  // —— 射精判定 E ——
  const s = era.get(`base:${master}:4`) || 0; // S = BASE:MASTER:4
  const ejac = era.get(`maxbase:${master}:4`) || 0; // EJAC = MAXBASE:4
  let e = 0;
  if (s > ejac * 2) {
    e = 2;
  } else if (s > ejac) {
    e = 1;
  }

  // 射精している → SOURCE 修正（精液中毒 ABL:32 分档）
  const src = (idx) => era.get(`source:${target}:${idx}`) || 0;
  const set_src = (idx, v) => era.set(`source:${target}:${idx}`, v);
  if (e) {
    set_src(4, times(src(4), 3.0)); // SOURCE:4（性行为）×3
    const abl32 = Math.min(Math.floor(era.get(`abl:${target}:32`) || 0), 5);
    // SOURCE:7（成瘾追加）定值 + SOURCE:5（达成感）/SOURCE:13（屈从）倍率
    set_src(7, [0, 200, 500, 1200, 2500, 5000][abl32]);
    set_src(5, times(src(5), [2.0, 2.5, 3.0, 4.5, 6.0, 8.0][abl32]));
    set_src(13, times(src(13), [2.0, 1.6, 1.0, 0.7, 0.4, 0.1][abl32]));
  }

  // —— 大量/通常射精 ——
  if (e === 2) {
    chara(target).dungeon.精液经验 += 3; // EXP:20（属主 dungeon，门面）
    era.print('怪物大量射精');
    era.print('精液经验＋３');
    era.add(`base:${master}:4`, -ejac * 2);
    if ((era.get(`base:${master}:4`) || 0) >= ejac) {
      era.set(`base:${master}:4`, ejac - 1);
    }
    if (selectcom === 21 || selectcom === 34) {
      era.set('tflag:38', 2); // 私处内射精（怪物）
    }
    if (selectcom === 31) {
      era.set('tflag:0', 2); // 口交射精
    }
    if (selectcom === 21 || selectcom === 27) {
      era.set('tflag:2', 2); // 性行为射精
    }
  } else if (e === 1) {
    chara(target).dungeon.精液经验 += 1;
    era.print('怪物射精');
    era.print('精液经验＋1');
    era.add(`base:${master}:4`, -ejac);
    if ((era.get(`base:${master}:4`) || 0) >= ejac) {
      era.set(`base:${master}:4`, ejac - 1);
    }
    if (selectcom === 21 || selectcom === 34) {
      era.set('tflag:38', 1);
    }
    if (selectcom === 31) {
      era.set('tflag:0', 1);
    }
    if (selectcom === 21 || selectcom === 27) {
      era.set('tflag:2', 1);
    }
  }

  // —— 污渍（STAIN 属主 train，直写；位 2=精液 4=大量 8=??）——
  const stain_or = (idx, bit) =>
    era.set(
      `stain:${target}:${idx}`,
      (era.get(`stain:${target}:${idx}`) || 0) | bit,
    );
  if (selectcom === 21) {
    stain_or(3, 2); // 私处
  }
  if (selectcom === 27) {
    stain_or(4, 2); // 肛门
  }
  if (selectcom === 30) {
    stain_or(1, 2); // 手
  }
  if (selectcom === 31) {
    stain_or(0, 2); // 口
  }
  if (selectcom === 37) {
    stain_or(0, 8); // 足交（SELECTCOM 37 的污渍位——本族菜单不设 37，防御性保留）
  }
  if (selectcom === 21 && e > 0) {
    stain_or(3, 4);
  }
  if (selectcom === 27 && e > 0) {
    stain_or(4, 4);
  }
  if (selectcom === 30 && e > 0) {
    stain_or(1, 4);
  }
  if (selectcom === 31 && e > 0) {
    stain_or(0, 4);
  }

  era.set('tflag:15', e); // 死斗场怪物が射精フラグ（source-check/A 头消费）
}

/**
 * com207：媚药史莱姆——只削气力，
 * 三个凌辱分支均尾调用 51 号指令（媚药灌入）。
 *
 * 尾调用直接返回，不再计算收入，因此不消费随机源。
 *
 * @returns {Promise<number>} 子指令（COM51）的 RETURN 值或 0/1
 */
async function com207() {
  const target = era_flag.target;
  const target_name = chara_callname(target);
  era.print('媚药史莱姆');

  await train_message_b();

  // —— 战斗值计算 ——
  const level = era.get('cflag:0:9') || 0;
  add_lose(target, 1, level * 10); // （LOSEBASE:0 无し——气力要员）

  const slave_point = arena_slave_point();

  // 207 号指令不检查失神状态 TFLAG:899
  if (slave_point < 5 * level) {
    if ((era.get(`base:${target}:1`) || 0) <= 0) {
      era.print(`${target_name}被媚药史莱姆包裹着，完全无法抵抗了。`);
      await era.waitAnyKey();
    } else {
      era.print(`${target_name}被媚药史莱姆包裹着，动弹不得。`);
      await era.waitAnyKey();
      add_lose(target, 1, level * 10);
      if ((era.get(`base:${target}:1`) || 0) < lose(target, 1)) {
        // 气力低于累计损耗时显示陷落文本
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

  era.set('tflag:400', 207);
  const after = await com_after_arena();
  if (after === 0) {
    return 1;
  }

  // —— 凌辱菜单（三个分支均尾调用 51 号指令）——
  for (;;) {
    // 每个按钮自成一行，按钮之间不补空行（#595）
    era.print('把粘液灌到哪里？？');
    era.printButton('- 嘴巴', 0);
    if (!(era.get(`talent:${target}:122`) || 0)) {
      era.printButton('- 私处', 1); // （男人不显示）
    }
    era.printButton('- 肛门', 2);
    era.printButton('暂时放过', 999);
    const result = await era.input();

    if (result === 0) {
      // 嘴巴：尾调用 51 号指令，直接返回、不计算收入
      era.print(`在倒下的${target_name}嘴里，灌入了大量的粘液。`);
      await era.waitAnyKey();
      return await call_insult_com(51);
    }
    if (result === 1) {
      // 私处（执行侧再次检查男人条件）
      if (era.get(`talent:${target}:122`)) {
        return 0; // 対象が男人なら戻る
      }
      era.print(
        `在倒下的${target_name}私处里，灌入了大量的粘液，从阴唇到子宫都灌满了。`,
      );
      await era.waitAnyKey();
      return await call_insult_com(51);
    }
    if (result === 2) {
      // 肛门
      era.print(`在倒下的${target_name}肛门里，灌入了大量的粘液。`);
      await era.waitAnyKey();
      return await call_insult_com(51);
    }
    if (result === 999) {
      // 暂时放过：返回 1
      return 1;
    }
    // GOTO INPUT_LOOP_0（引擎层拒收代位）
  }
}

// —— com_able_family 的 200–207 号可用性检查 ——

com_able_family.register(200, async () => {
  // 自动不可（调教菜单实行中的 TFLAG:224 = 555）
  if ((era.get('tflag:224') || 0) === 555) {
    return 0;
  }
  const target = era_flag.target;
  const tequip = (idx) => era.get(`tequip:${target}:${idx}`) || 0;
  // 未在死斗场时，任何持续装备中使用中则不可开启（道具使用中はダメ）
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
  // 其余互斥装备（野外/兽奸/使役/触手/淋浴/新妻/浴室/羞耻——
  // 54/89 与上表重复；重复检查无害）
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
  // 无观战券（ITEM:35）不可
  if ((era.get('item:35') || 0) === 0) {
    return 0;
  }
  return 1;
});

com_able_family.register(201, async () => {
  // 死斗场中才有
  if ((era.get(`tequip:${era_flag.target}:55`) || 0) === 0) {
    return 0;
  }
  // 助手亲自出战才有
  if (era_flag.player !== era_flag.assi) {
    return 0;
  }
  return 1;
});

// 202–207 共用条件：死斗场中 + 助手调教不可 + （203 起）调教者等级要求。
// 等级要求读 CFLAG:PLAYER:9——与战斗段的 CFLAG:0:9 有意不对称：要求随
// 调教者等级走，战斗伤害跟魔王等级走。
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
      return 0; // 死斗场判定
    }
    if ((era.get(`cflag:${era_flag.player}:9`) || 0) < min_level) {
      return 0; // 等级要求（202 的下限为 0）
    }
    if (era_flag.assiplay) {
      return 0; // 助手调教不可
    }
    return 1;
  });
}

// —— 202–206 号指令注册（配置差异见 MONSTER_CONFIGS；206 独有的扩张经验块
// 通过标记接入）——
for (const [com, cfg] of Object.entries(MONSTER_CONFIGS)) {
  com_family.register(Number(com), (rand) =>
    monster_com(Number(com), cfg, rand),
  );
}
MONSTER_CONFIGS[206].expansion_exp = true; // 扩张经验块（206 号指令独有）

com_family.register(200, com200);
com_family.register(201, com201);
com_family.register(207, com207);

// —— train_message_a/b 分支（#209 决定 6：族内消息由本族注册）——

/**
 * train_message_b_200：SELECTCOM == 200 的 B 文分支。
 * 读取 com200 翻转**前**的 TEQUIP:55：未在死斗场时输出进入文本，
 * 已在死斗场时输出退出文本，因此必须在翻转装备位之前调用。
 *
 * @returns {Promise<void>}
 */
async function train_message_b_200() {
  const target = era_flag.target;
  const target_name = chara_callname(target);

  if (era.get(`tequip:${target}:55`)) {
    // 退出支
    era.print(`${chara_callname(era_flag.player)}把${target_name}带回了房间…`);
    return;
  }

  // 进入分支的服装前缀检查 CFLAG:40 的位 64/28，以及 CFLAG:42 是否 ≤ 50；
  // ere/page/page-clothtype.js 的取值函数（#215）返回服装名字，
  // 在此拼成整行，与 com0 的服装条件一致。
  const cloth_bits = era.get(`cflag:${target}:40`) || 0;
  const special_type = era.get(`cflag:${target}:42`) || 0;
  let prefix;
  if ((cloth_bits & 64) !== 0 && special_type <= 50) {
    prefix = `${clothtype_special_text(target)}的模样、`;
  } else if ((cloth_bits & 28) !== 0) {
    prefix = `${clothtype_main2_text(target)}的模样、`;
  } else if (cloth_bits !== 0) {
    prefix = '下着的模样、';
  } else {
    prefix = '全裸的';
  }
  if ((era.get(`base:${target}:1`) || 0) <= 0) {
    // 気力已尽的长句（PRINTFORMW）
    era.print(
      `${prefix}${target_name}被带到了死斗场。${target_name}已经完全没有战斗的力气了…`,
    );
  } else {
    era.print(`${prefix}${target_name}被带到了死斗场…`);
  }
  await era.waitAnyKey();
  // 三个省略行（PRINTW，逐行等键）
  for (const dots of ['……………', '…………', '………']) {
    era.print(dots);
    await era.waitAnyKey();
  }
  // 全裸判定（CFLAG:40 == 0）：示众两行（PRINTFORMW）
  if (cloth_bits === 0) {
    era.print(`${target_name}全裸地在死斗场中示众。`);
    await era.waitAnyKey();
    era.print(
      `被下流的笑容和好奇的视线所包围、${target_name}在异样的气氛中沉默不语。`,
    );
    await era.waitAnyKey();
  }
}

// B 的 201–207 / A 的 200–207 不单独输出消息；凌辱情景
// 由子指令自己的 B 分支输出。此处显式注册无操作，
// 避免分发骨架对这些无需输出的号显示缺失提示。
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
