/**
 * @file 妊娠判定与妊娠确定（issue #401：EVENT_PREGNANCY.ERB 31 个函数全量；
 * issue #333 先落其中三个）。
 *
 * 源: target/ERB/EVENT/EVENT_PREGNANCY.ERB
 *      @IN_VAGINA_ALL（:42-60）、@CONCEPTION_CHECK_ALL（:61-79）
 *      @IN_VAGINA_<源>_TO_<目标>（:85-194，12 个）
 *      @NAKADASHI_CHECK（:196-274，issue #333 先落，本票并入共同形状）
 *      @CONCEPTION_CHECK_<源>_TO_<目标>（:305-444，12 个）
 *      @SHOW_BUTTON_CHILD_CARE（:452-470）、@CHECK_ABLE_TO_CHILD_CARE（:473-489）
 *      @CHILD_CARE_CHARA（:492-514）
 *
 * **12 组是维度型分支，不是 12 段逻辑。** 每组的 `IN_VAGINA_<源>_TO_<目标>`
 * 与同名 `CONCEPTION_CHECK_` 只差四个维度：受检主体（TARGET / ASSI /
 * MASTER / 全角色）、妊娠相手码（CFLAG:102，亦即 NAKADASHI_CHECK 的
 * ARG:1）、IN_VAGINA 侧是否另查 TALENT:158（同族不育）、确定时写的
 * CFLAG:111（孩子父亲）。四个维度全在下方 `PAIRS` 表里，函数体共用
 * `run_in_vagina` / `run_conception` 两条形状。
 *
 * 三处一眼看不出的原作细节，逐条 1:1 保留：
 *
 *   - **T_TO_A 两侧的存在性守卫不对称**：`@IN_VAGINA_T_TO_A`（:127）只查
 *     `ASSI >= 1`，而 `@CONCEPTION_CHECK_T_TO_A`（:357）另查 `TARGET >= 1`
 *     （因为确定时要写 `CSTR:ASSI:2 = %SAVESTR:TARGET%`）。故表里
 *     `iv`/`cc` 两列分开写，不共用一个「主体在场」判据。
 *   - **`MASTER == 0` 是三处恒真式**（:108/:154/:163 与 :331/:404/:415），
 *     保留为表里的空守卫（`iv: []`），不折叠掉——折叠会让「改坏它无差异」
 *     看起来像覆盖到了。
 *   - **NTR 兽奸秀（NTRD_TO_T）的妊娠相手码是 5（野狗）不是 6**（:184）：
 *     它成立的条件是 SHOW 里放了狗，故走 `CFLAG:106` 犬精液池。
 *
 * 不移植的一处：`@GET_CHILD`（:280-303）**全库零调用者**（`grep -rn
 * GET_CHILD target/` 只命中它自己的定义行，TRYCALLFORM 面也已查），且
 * 函数体是五道「不满足则 RETURN 0」的守卫、末尾同样 RETURN 0——没有任何
 * 可观察效果，落地只会得到一批改了也不红的死代码。按 #14 同款判死不实现，
 * 登记在 docs/stub-registry.md。
 *
 * 随机源一律经末位形参注入（缺省 Math.random）；`@EVENTTURNEND` 链上没有
 * 参数通道，由夹具的 override_math_random 兜（#120）。
 */

const era = require('#/era-electron');
const { nid } = require('#/chara/chara-family');
const { self_kojo } = require('#/kojo/kojo-system');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const era_flag = require('#/era-utils/era-flag');
const { chara_callname } = require('#/utils/callname-utils');

/**
 * 主人角色号。原作 MASTER 是引擎内建量（当前主人所指的角色号），本作恒 0
 * （chara-pregnancy.js 文件头同款；ere 侧没有 MASTER 表）。
 */
const MASTER = 0;

function default_rand(n) {
  return Math.floor(Math.random() * n);
}

/**
 * 12 组的维度表。**只剩数据**：字段含义与 ERB 的对应见下方每条的注释。
 *
 *   name    函数名后缀（IN_VAGINA_<name> / CONCEPTION_CHECK_<name>）
 *   kind    NAKADASHI_CHECK 的 ARG:1，亦即妊娠相手码 CFLAG:102 的目标值
 *   subject 受检主体：'target' / 'assi' / 'master' / 'each'（原作 REPEAT
 *           CHARANUM，含角色 0）
 *   iv      IN_VAGINA 侧的最外层存在性守卫（:85-194）
 *   cc      CONCEPTION_CHECK 侧的存在性守卫（:305-444）
 *   kin     IN_VAGINA 侧是否另查 TALENT:158（同族不育）
 *   father  CONCEPTION 落定时的 CFLAG:111：数字直写；角色号表示
 *           NID(该角色)+1，并同步写 CSTR:2 = SAVESTR:该角色
 */
const PAIRS = [
  // :85-93 / :305-314 主人 → 奴隶
  {
    name: 'm_to_t',
    kind: 1,
    subject: 'target',
    iv: ['target'],
    cc: ['target'],
    kin: true,
    father: 0,
  },
  // :95-103 / :317-326 主人 → 助手
  {
    name: 'm_to_a',
    kind: 1,
    subject: 'assi',
    iv: ['assi'],
    cc: ['assi'],
    kin: true,
    father: 0,
  },
  // :105-112 / :329-338 奴隶 → 主人（:108 的 MASTER == 0 恒真）
  {
    name: 't_to_m',
    kind: 3,
    subject: 'master',
    iv: [],
    cc: [],
    kin: true,
    father: 'target',
  },
  // :114-122 / :341-351 助手 → 奴隶
  {
    name: 'a_to_t',
    kind: 2,
    subject: 'target',
    iv: ['assi', 'target'],
    cc: ['assi', 'target'],
    kin: true,
    father: 'assi',
  },
  // :124-132 / :354-364 奴隶 → 助手（两侧守卫不对称，见文件头）
  {
    name: 't_to_a',
    kind: 3,
    subject: 'assi',
    iv: ['assi'],
    cc: ['assi', 'target'],
    kin: true,
    father: 'target',
  },
  // :134-141 / :366-376 野狗 → 奴隶
  {
    name: 'd_to_t',
    kind: 5,
    subject: 'target',
    iv: ['target'],
    cc: ['target'],
    kin: false,
    father: -2,
  },
  // :143-150 / :389-399 怪物・触手 → 奴隶
  {
    name: 'syoku_to_t',
    kind: 6,
    subject: 'target',
    iv: ['target'],
    cc: ['target'],
    kin: false,
    father: -3,
  },
  // :152-159 / :402-411 怪物・触手 → 主人
  {
    name: 'syoku_to_m',
    kind: 6,
    subject: 'master',
    iv: [],
    cc: [],
    kin: false,
    father: -3,
  },
  // :161-168 / :413-422 狂王 → 主人
  {
    name: 'kyouou_to_m',
    kind: 7,
    subject: 'master',
    iv: [],
    cc: [],
    kin: true,
    father: -4,
  },
  // :170-177 / :424-433 狂王 → 奴隶（REPEAT CHARANUM）
  {
    name: 'kyouou_to_t',
    kind: 7,
    subject: 'each',
    iv: [],
    cc: [],
    kin: true,
    father: -4,
  },
  // :179-186 / :435-444 兽奸秀 → 奴隶（相手码 5 = 野狗，见文件头）
  {
    name: 'ntrd_to_t',
    kind: 5,
    subject: 'each',
    iv: [],
    cc: [],
    kin: false,
    father: -2,
  },
  // :188-194 / :379-387 卖春 → 奴隶（REPEAT CHARANUM）
  {
    name: 'extra',
    kind: 4,
    subject: 'each',
    iv: [],
    cc: [],
    kin: true,
    father: -1,
  },
];

/** 12 组的两侧宿主：`in_vagina_<name>` / `conception_check_<name>` */
const IN_VAGINA = {};
const CONCEPTION_CHECK = {};

/**
 * 角色是否在场。原作的存在性守卫是 `TARGET >= 1` / `ASSI >= 1` / 指针
 * 越界（`TARGET >= CHARANUM` 一类）三种写法；后一种在 ere 侧不可照搬——
 * #21 扁平化下角色号 = 预设号且**稀疏**（0 主人 / 1-16 勇者位 / 17-40 特殊
 * 位 / 1000+ 生产的子代），「个数」判据不成立。等价判据是出场名单包含
 * （chara-make.js 的 `GETCHARA(CHARA, 0) == -1` 同款处置）。
 */
function is_present(cid) {
  return era.getAddedCharacters().includes(cid);
}

/** 原作 `SIF TARGET < 0 || TARGET >= CHARANUM`（:44/:62）：TARGET 不是活角色 */
function target_out_of_range() {
  return !is_present(era_flag.target);
}

/**
 * 原作 `SIF ASSI >= CHARANUM`（:46/:64）：**`ASSI = -1` 不在拦截范围内**
 * ——-1 不是「越界」是「没有助手」，放行之后由各组的 `ASSI >= 1` 守卫
 * 逐组拦下。区别是可观察的：ASSI 越界时连 TARGET 那几组也不跑。
 */
function assi_out_of_range() {
  const assi = era_flag.assi;
  return assi !== -1 && !is_present(assi);
}

/**
 * 守卫求值：`['target']` = TARGET >= 1，`['assi']` = ASSI >= 1，空表恒真
 * （原作的 `MASTER == 0` 恒真式与 REPEAT 组都落在这里）。
 */
function gate_ok(gate) {
  for (const who of gate) {
    if (who === 'target' && era_flag.target < 1) return false;
    if (who === 'assi' && era_flag.assi < 1) return false;
  }
  return true;
}

/**
 * 受检角色列表。'each' = 原作 `REPEAT CHARANUM`（:172/:181/:190/:381/:426/
 * :437），自 COUNT = 0 起——**角色 0（主人）也在受检之列**，不是笔误。
 */
function subjects_of(subject) {
  if (subject === 'target') return [era_flag.target];
  if (subject === 'assi') return [era_flag.assi];
  if (subject === 'master') return [MASTER];
  return era.getAddedCharacters();
}

/**
 * 受胎概率检查（原作 @NAKADASHI_CHECK，:196-274）。
 *
 * 中出量分六档、排卵诱发剂与体型（TALENT:100 娇小）共同决定掷骰上界；
 * 命中把来源写进 CFLAG:102（妊娠相手），随后**无论命中与否都清池**——
 * 但三处提前返回（男性/未熟、兽奸非兽耳、池为空）**不清池**，那是原作的
 * 写法（池留给下一回合）。
 *
 * @param {number} cid 受检角色号
 * @param {number} kind 妊娠相手码（CFLAG:102 的目标值，亦即精液池的下标来源）
 * @param {(n: number) => number} [rand] RAND:N 的等价物
 * @returns {number} 原作的 RETURN 0
 */
function nakadashi_check(cid, kind, rand = default_rand) {
  const view = chara(cid);
  // :204 FLAG:5 bit 2 = 启用妊娠系统：关闭时只清池（:209 的「妊娠不可でも
  // 膣射のリセット」）
  if (((era.get('flag:5') || 0) & 4) === 0) {
    clear_pool(cid, kind);
    return 0;
  }
  // :220 男か未熟なら関数終了（**不清池**）
  if (view.chara.男人 || view.train.未熟) return 0;
  // :224 兽奸で対象が动物耳朵じゃないなら関数終了（**不清池**）
  if (kind === 5 && !view.chara.动物耳朵) return 0;

  const pool = pool_of(cid, kind);
  // :228 中だしされてないなら関数終了（**不清池**）
  if (pool === 0) return 0;
  // :232/:238 妊娠確定済み・妊娠中・育儿中は清池して終了
  if (view.event.预产日 > 0 || view.chara.妊娠 || view.chara.育儿中) {
    clear_pool(cid, kind);
    return 0;
  }

  // :244 排卵剤の有無による定数設定：HAIRANZAI = 3 - CFLAG:109 * 2
  let ovulation = 3 - view.stronghold.排卵诱发剂 * 2;
  // :247-251 人狼（TALENT:314 == 2）は満月（DAY:2 14-16 日）に妊娠しやすく
  if (view.chara.种族 === 2 && era_flag.date >= 14 && era_flag.date <= 16) {
    ovulation = view.stronghold.排卵诱发剂 === 1 ? 1 : 2;
  }
  // :253-271 中出し量の六档：基底系数与阈值
  let base;
  let success;
  if (pool >= 25) [base, success] = [1, 3];
  else if (pool >= 20) [base, success] = [2, 2];
  else if (pool >= 15) [base, success] = [3, 2];
  else if (pool >= 10) [base, success] = [4, 2];
  else if (pool >= 5) [base, success] = [5, 2];
  else [base, success] = [6, 2];

  // :254 上界 = (系数 + TALENT:100 娇小 * 2) * HAIRANZAI
  const upper = (base + view.chara.娇小 * 2) * ovulation;
  if (rand(upper) <= success) view.event.妊娠相手 = kind;
  // :274 判定を行った膣射のリセット
  clear_pool(cid, kind);
  return 0;
}

/** 中出し量の読み出し：CFLAG:101（主人）/103-108（助手→客→犬→怪物→狂王） */
function pool_of(cid, kind) {
  const view = chara(cid);
  if (kind === 1) return view.system.主人膣内射精;
  if (kind === 2) return view.system.助手膣内射精;
  if (kind === 3) return view.system.对象膣内射精;
  if (kind === 4) return view.dungeon.客膣内射精;
  if (kind === 5) return view.dungeon.犬膣内射精;
  if (kind === 6) return view.dungeon.怪物膣内射精;
  return view.system.狂王膣内射精;
}

/** 中出し量の清零（与 pool_of 同表，见 :205-209 的下标换算） */
function clear_pool(cid, kind) {
  const view = chara(cid);
  if (kind === 1) view.system.主人膣内射精 = 0;
  else if (kind === 2) view.system.助手膣内射精 = 0;
  else if (kind === 3) view.system.对象膣内射精 = 0;
  else if (kind === 4) view.dungeon.客膣内射精 = 0;
  else if (kind === 5) view.dungeon.犬膣内射精 = 0;
  else if (kind === 6) view.dungeon.怪物膣内射精 = 0;
  else view.system.狂王膣内射精 = 0;
}

/**
 * IN_VAGINA_<…> 的共同形状：受检者未妊娠（kin 组另查非同族不育）时按
 * 中出量掷受胎判定。存在性守卫在最外层——**不成立时连池都不碰**。
 */
function run_in_vagina(pair, rand = default_rand) {
  if (!gate_ok(pair.iv)) return 0;
  for (const cid of subjects_of(pair.subject)) {
    const view = chara(cid);
    // TALENT:153（妊娠）；kin 组另查 TALENT:158（同族不育）
    if (view.chara.妊娠) continue;
    if (pair.kin && view.event.同族不育) continue;
    nakadashi_check(cid, pair.kind, rand);
  }
  return 0;
}

/**
 * CONCEPTION_CHECK_<…> 的共同形状：妊娠相手（CFLAG:102）为本组来源、且
 * 尚无预产日、且未妊娠时落定出产日与孩子父亲。
 *
 * 预产日一律 `DAY + 10 + RAND:6`（原作六处「妊娠期間短い」的注释是设计
 * 意图，代码里 **12 组全是同一个 10 + RAND:6**——1:1 不分辨）。差异只在
 * CFLAG:111：数字码（-1 客 / -2 犬 / -3 怪物 / -4 狂王 / 0 主人）或
 * NID(父)+1（奴隶与助手来源，同时写 CSTR:2 的父亲名字）。
 */
function run_conception(pair, rand = default_rand) {
  if (!gate_ok(pair.cc)) return 0;
  for (const cid of subjects_of(pair.subject)) {
    const view = chara(cid);
    if (view.chara.妊娠) continue;
    if (view.event.妊娠相手 !== pair.kind) continue;
    if (view.event.预产日 !== 0) continue;

    view.event.预产日 = era_flag.day_count + 10 + rand(6);
    if (typeof pair.father === 'number') {
      view.event.孩子父亲 = pair.father;
    } else {
      const parent = pair.father === 'target' ? era_flag.target : era_flag.assi;
      view.event.孩子父亲 = nid(parent) + 1;
      view.event.孩子父亲名字 = chara_callname(parent);
    }
  }
  return 0;
}

for (const pair of PAIRS) {
  IN_VAGINA[pair.name] = (rand) => run_in_vagina(pair, rand);
  CONCEPTION_CHECK[pair.name] = (rand) => run_conception(pair, rand);
}

/** @IN_VAGINA_ALL（:42-60）：九连调，先过两道指针守卫 */
function in_vagina_all(rand = default_rand) {
  if (target_out_of_range()) return 0; // :44
  if (assi_out_of_range()) return 0; // :46
  for (const name of [
    'm_to_t',
    'm_to_a',
    't_to_m',
    'a_to_t',
    't_to_a',
    'd_to_t',
    'syoku_to_t',
    'syoku_to_m',
    'kyouou_to_m',
  ]) {
    IN_VAGINA[name](rand);
  }
  return 0;
}

/** @CONCEPTION_CHECK_ALL（:61-79）：九连调，守卫同 ALL */
function conception_check_all(rand = default_rand) {
  if (target_out_of_range()) return 0; // :62
  if (assi_out_of_range()) return 0; // :64
  for (const name of [
    'm_to_t',
    'm_to_a',
    't_to_m',
    'a_to_t',
    't_to_a',
    'd_to_t',
    'syoku_to_t',
    'syoku_to_m',
    'kyouou_to_m',
  ]) {
    CONCEPTION_CHECK[name](rand);
  }
  return 0;
}

/**
 * @CHECK_ABLE_TO_CHILD_CARE(ARG)（:473-489）：角色能否被访问育儿室。
 * 原作是 `#FUNCTION`（返回数值的式中函数，`RETURNF` 收尾）。
 *
 * @param {number} arg 角色号
 * @returns {number} 0 = 可访问；1 = 你（角色 0）不在育儿室；2 = 侵攻中的
 *   勇者；3 = 该角色不在育儿室（CFLAG:1 != 10）
 */
function check_able_to_child_care(arg) {
  if (arg === 0) return 1; // :479-481 你は育児室にいない
  if (chara(arg).invasion.状态 === 2) return 2; // :482-484 侵攻中の勇者だ
  if (chara(arg).invasion.状态 !== 10) return 3; // :485-487 育児室にいない
  return 0; // :489
}

/**
 * @SHOW_BUTTON_CHILD_CARE(NUM, ARG)（:452-470）：个别信息页的「前往育儿室」
 * 按钮渲染。
 *
 * 原作 :459-467 的结构是 `IF LOCAL == 2 → RETURN 0` / `ELSEIF LOCAL != 0
 * → RETURN 0 → SETCOLOR 0x646464`——**那条 SETCOLOR 在 RETURN 0 之后，
 * 永远不会执行**（原作的注释「奴隷で実行不可なら灰色にする」是未完成的
 * 意图）。1:1 保留：灰色分支不落地，只留注释，函数化简为「可访问才渲染」。
 *
 * @param {number} num 按钮编号（原作实参 5）
 * @param {number} arg 角色号
 * @returns {number} 原作的 RETURN 0
 */
function show_button_child_care(num, arg) {
  if (check_able_to_child_care(arg) !== 0) return 0; // :459-467
  // :468 PRINTFORM [{NUM}] 前往育儿室 —— 正文不写 [编号] 前缀，按钮的
  // 快捷键前缀由引擎按 accelerator 拼（AGENTS.md「输出类 API 会二次加工
  // 参数」：手写前缀会渲染成 `[0] [0] …`，#170 的 PR #30 实录）
  era.printButton('前往育儿室', num);
  return 0;
}

/**
 * @CHILD_CARE_CHARA(ARG)（:492-514）：访问某角色的育儿室。
 *
 * 返回 2 是原作的防御支（:502）——侵攻中的勇者按钮根本不渲染，但直接输入
 * 编号仍会走到这里，此时把 2 上浮给调用方（页面据此忽略这次输入）。
 *
 * 两处 ere 侧的必要处置（均沿用既有裁定，非本票新发明）：
 *
 *   - `TFLAG:13 = 13`（:512）是调教外语义：EraElectron 的 tflag 桶只存在于
 *     调教期（引擎 endTrain 删除），据点侧写它会直接崩。改走
 *     `game.train.with_self_kojo_event`（#179 裁定，sale.js / chara-pregnancy.js
 *     同款），并由 `self_kojo(rand, q, true)` 的第三参声明「不在调教中」
 *     ——否则 FLAG:7 <= 0 时它会写同样只在调教期存在的 TFLAG:15。
 *   - `:514` 的 `PRINT`（无实参）不落地：它既不带换行也不带内容，是空操作
 *     （`PRINTL` 才换行，见 emuera-basic-agent-guide 的 print-system.md）。
 *
 * @param {number} arg 角色号
 * @returns {Promise<number>} 0 = 已处理；2 = 侵攻中的勇者（不可访问）
 */
async function child_care_chara(arg) {
  const able = check_able_to_child_care(arg);
  if (able !== 0) {
    if (able === 1) {
      await era.printAndWait('你不在育儿室。'); // :499
    } else if (able === 2) {
      return 2; // :500-502
    } else if (able === 3) {
      await era.printAndWait('该角色不在育儿室。'); // :504
    }
    return 0;
  }

  // :509 PRINTFORMW 你去了%SAVESTR:ARG%的育儿室。
  await era.printAndWait(`你去了${chara_callname(arg)}的育儿室。`);
  era.print(''); // :510 PRINTL（空行）
  era_flag.target = arg; // :511 TARGET = ARG
  await game.train.with_self_kojo_event(13, () =>
    self_kojo(undefined, undefined, true),
  ); // :512-513 TFLAG:13 = 13 / CALL SELF_KOJO
  return 0;
}

module.exports = {
  check_able_to_child_care,
  child_care_chara,
  conception_check_all,
  in_vagina_all,
  nakadashi_check,
  show_button_child_care,
  ...Object.fromEntries(
    Object.entries(IN_VAGINA).map(([name, fn]) => [`in_vagina_${name}`, fn]),
  ),
  ...Object.fromEntries(
    Object.entries(CONCEPTION_CHECK).map(([name, fn]) => [
      `conception_check_${name}`,
      fn,
    ]),
  ),
};
