/**
 * @file 指令结算事件 @SOURCE_CHECK 的处理器（issue #45：爱抚可达路径）。
 *
 * 源: target/ERB/SYSTEM/SYSTEM_SOURCE.ERB  @SOURCE_CHECK（:7-576 主体）
 *     @SOURCE_CHECK_UP_C（:579）/ _V（:675）/ _A（:773）/ _B（:872）/
 *     _LOVE（:987）/_IMPULSIVE（:1052）/_ACHIEVE（:1122）/_PAIN（:1186）/
 *     _POISON（:1294）/_DIRTY（:1338）/_MOIST（:1373）/_DESIRE（:1383）/
 *     _FLASHER（:1393）/_SUBMIT（:1471）/_DEVIATE（:1529）/_LIKE（:1587）/
 *     _FREE（:1598）、@LOVE_MOIST_CHECK_UP（:1609）、@PAIN_DAMAGE_CHECK_UP
 *     （:1628）、@EX_CHECK_UP（:1662-2131）、@SHOW_SOURCE（:2137-2175）/
 *     @PALAM_UP_CHECK（:2182-2242）/@PALAM_MESSAGE（:2278-2394）/
 *     @FIGURE_INDENT_2（:2513-2520）/@LOSELIFE_BAR（:2529）/@LOSEVITAL_BAR
 *     （:2561）
 *     target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB  @SOURCE_SEX_CHECK（:31）/
 *     @PLAYER_SKILL_CHECK（:45）/@MASTER_SKILL_CHECK（:172）/
 *     @INCEST_SEX_CHECK（:222）/@LOST_VIRGIN_CHECK（:265，守卫段）/
 *     @UP_TALENT_CVA_CHECK（:691）/@UP_TALENT_CHECK（:740）/
 *     @MARK_GOT_CHECK（:952-1080）/@YOKUBO_UP_CHECK（:1092）/
 *     @JUJUN_UP_CHECK（:1113）/@EXP_GOT_CHECK（:1124）/@SOKUOCHI_CHECK
 *     （:1315）/@ECST_CHECK（:1555）/@PISSING_ECST_CHECK（:1561）/
 *     @MASTER_FLAG_CHECK（:1615-1711）/@TARGET_WORMBABY_CHECK（:1727）
 *     target/ERB/SYSTEM/SYSTEM_SOURCE_SUB2.ERB  @SOURCE_LESBIAN_SEX_CHECK
 *     （:9）/@SOURCE_GAY_SEX_CHECK（:242）/@INCEST（:324）/
 *     @SOUL_DISLOCATION_DEBUFF（:350）
 *
 * 与引擎的职责划分（app.asar 的 nextTurnInTrain 实证，#44）：
 *   - UP/DOWN 的 ere 等价物是 delta 表（清零归引擎回合结算）。本模块把 UP
 *     累加进 delta；PALAM_UP_CHECK 展示后**当场把 delta 结算进 palam 并清零
 *     （:2230-2231 的 PALAM += UP / PALAM -= DOWN 由本模块承载）**，引擎的
 *     nextTurnInTrain 随后加 0、成为无操作——避免双重累加；
 *   - LOSEBASE 的 ere 等价物是 deltabase 的负值（com0 写 -5/-50）。本模块
 *     在 :411-412 的 BASE 扣减处当场结算 deltabase → base（钳 0..maxbase，
 *     引擎语义）并清零，同理避免双重扣减；
 *   - NOWEX 的 ex 合并留给引擎（EX_CHECK 只写 nowex，不手动加 ex——引擎
 *     nextTurnInTrain 的 nowex→ex 成为唯一一次合并，数值等价于原作 :2122
 *     -2126 的 EX += …）。
 *
 * 可达性判断（哪些分支整支存根，依据写在 issue #45）：
 *   - 避孕套判定（:19-51，TEQUIP:35/36）、装备持续效果组（:58-123 的
 *     EQUIP_COMxx）：各装备位是否已有真身由 equip_com_family 按位判定；
 *   - SOURCE_LESBIAN/GAY_SEX_CHECK（SUB2）：预设角色清一色女性 + 主人是
 *     男人（Chara0），两分支当前不可达，登记；
 *   - INCEST 的 CFLAG:21–25 解码、普通无亲族早退与 SUB1 的源乘算已实现；
 *   - TARGET_EJAC/MILK/WORMBABY_CHECK（素质 121/130/190/191 无预设）；
 *   - SEIIN_START 与失神组（PASSOUT_CHECK/TEXT/OUTDOOR）已随 #216（J6）
 *     落真身（system/train/seiin.js 与 passout.js）；PISSING_ECST_CHECK
 *     （TEQUIP:22/TALENT:57 门槛）与 SOUL_DISLOCATION_DEBUFF 仍在册；
 *   - EXP_GOT_CHECK / SOKUOCHI_CHECK：生效分支的门槛（TFLAG:100、UP:2/
 *     UP:9 ≥ 阈值、TALENT:73）在当前写入面下全为 0/无预设，整支登记；
 *   - 膣内射精チェック（:426-473）已随 #221 J11 落地：目标侧避孕套、
 *     主人/助手/兽奸/死斗场/触手与逆侵犯的计数链按原 if/else-if 顺序结算；
 *   - KOJO_MESSAGE_PALAMCNG / MARKCNG（:504/:512，FLAG:7 > 0 才达）：分发层
 *     已随 #232 落地；K1 真身注册，其余性格 = TRYCALL 落空（静默）；
 *     指令口上 KOJO_MESSAGE_COM（:11-12）已随 #46 接真身。
 * 其余无条件代码（含全部 SOURCE_CHECK_UP_*、UP_TALENT 两函数、PLAYER/
 * MASTER_SKILL、EX_CHECK、MARK_GOT、MASTER_FLAG 的好感度累积）都在爱抚
 * 的执行路径上，1:1 移植。
 */

const era = require('#/era-electron');
const { on } = require('#/system/event/registry');
const era_flag = require('#/era-utils/era-flag');
const { stub_line } = require('#/utils/stub-line');
const { PALAMLV } = require('#/era-utils/palam-level');
const { train_message_a } = require('#/system/train/train-message');
const {
  passout_check,
  passout_text,
  passout_palam_check,
  passout_palam_up,
  passout_outdoor,
} = require('#/system/train/passout');
const { seiin_start } = require('#/system/train/seiin');
const {
  EQUIP_COM_CHAIN,
  equip_com_family,
} = require('#/system/train/com-family');
const {
  kojo_message_com,
  kojo_message_palamcng,
  kojo_message_markcng,
} = require('#/kojo/kojo-system');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { incest } = require('#/system/train/incest');
/** MASTER（Emuera 内置变量）：魔王主角，恒为角色 0（CONTEXT.md） */
const MASTER = 0;

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个；名单
 * 变动必须同步清单。
 */
const STUBBED_CALLS = [
  'KOJO_MESSAGE_PALAMCNG',
  'KOJO_MESSAGE_MARKCNG',
  'EQUIP_COM',
  'SOURCE_LESBIAN_SEX_CHECK',
  'SOURCE_GAY_SEX_CHECK',
  'TARGET_EJAC_CHECK',
  'TARGET_MILK_CHECK',
  'TARGET_WORMBABY_CHECK',
  'PISSING_ECST_CHECK',
  'SOUL_DISLOCATION_DEBUFF',
  'EXP_GOT_CHECK',
  'SOKUOCHI_CHECK',
];

// —— 结算上下文：目标 / 调教者的变量读写助手 ——

let cid; // TARGET
let player; // PLAYER

const src = (i) => era.get(`source:${cid}:${i}`) || 0;
const set_src = (i, v) => era.set(`source:${cid}:${i}`, v);
const abl = (i) => Math.floor(era.get(`abl:${cid}:${i}`) || 0);
const pabl = (i) => Math.floor(era.get(`abl:${player}:${i}`) || 0);
const tal = (i) => era.get(`talent:${cid}:${i}`);
const ptal = (i) => era.get(`talent:${player}:${i}`);
const palam = (i) => era.get(`palam:${cid}:${i}`) || 0;
const up = (i) => era.get(`delta:${cid}:${i}`) || 0;
const add_up = (i, v) => era.add(`delta:${cid}:${i}`, v);
const set_up = (i, v) => era.set(`delta:${cid}:${i}`, v);
const tflag = (i) => era.get(`tflag:${i}`) || 0;

// —— 上面这组本地闭包（mini-facade）的留存说明（#90），别当漏网 ——

// 这张票（#90）只把**跨域写**改走门面（chara(cid).<域>.<字段> / game.<域>.
// <字段>）；这组闭包承载其余约 900 次调用，活着的理由：
//   1. 读侧全部留此——跨域读放行是 #70/#72 的实测决议（跨域读 42,741 次、
//      高度分散，强制具名 = 约 4.3 万处样板被口上转译器再复制一万次）；
//   2. 写侧闭包（set_src/add_up/set_up/add_lose/set_lose）吃**变量下标**
//      （`src(0)` 到 `set_up(k, …)` 的 k 是循环变量），具名属性形态在结构
//      上无法承载；它们对 domain-check 是「动态下标」盲区，不是漏判。
// 何时该死：source-check 拆域票（把 @SOURCE_CHECK 从 event 域拆进 train
// 域）或读侧全量迁移票。届时 97.7% 的字面量调用改具名访问器；残留的 4 个
// 循环点（[91,92] 素质组、[4,5,6,8,10,11,12,13] 感情减半、ORDER 结算序、
// count 0-4 射精系）是字面量列表与真计数器，展开与否届时裁——这张票不碰
// （工单的统计：小尾巴，不是主命题）。

/** TIMES X, m：整数乘小数后截断（math-etc.md） */
const times = (v, m) => Math.floor(v * m);
/** Emuera 整数除法（正数域 = 向下取整） */
const idiv = (a, b) => Math.floor(a / b);

/** LOSEBASE 的正数域读写（deltabase 存负值，见文件头） */
const lose = (k) => -1 * (era.get(`deltabase:${cid}:${k}`) || 0);
const add_lose = (k, v) => era.add(`deltabase:${cid}:${k}`, -v);
const set_lose = (k, v) => era.set(`deltabase:${cid}:${k}`, -v);

// @阴核(ARG)（魔改新增/文本校正.ERB:9，#FUNCTIONS）：男人叫阴茎
const clitoris_name = () => (tal(122) ? '阴茎' : '阴核');

// —— :128-130 调教者侧的源修正（SUB1） ——

// @SOURCE_SEX_CHECK（SUB1:31-43）：同性分支（SUB2 未移植，登记）
function source_sex_check() {
  if (!tal(122) && !ptal(122)) {
    stub_line('SOURCE_LESBIAN_SEX_CHECK', '女性同士的检查', '随同性经验票');
  } else if (tal(122) && ptal(122)) {
    stub_line('SOURCE_GAY_SEX_CHECK', '男性同士的检查', '随同性经验票');
  }
}

// @PLAYER_SKILL_CHECK（SUB1:45-171）：调教者素质与技巧对源的乘算
function player_skill_check() {
  // :47-51 调教者开放（TALENT:33）
  if (ptal(33)) {
    set_src(0, times(src(0), 1.2));
    set_src(1, times(src(1), 1.2));
    set_src(2, times(src(2), 1.2));
    set_src(3, times(src(3), 1.2));
    set_src(17, times(src(17), 1.2));
  }
  // :53-55 小恶魔（TALENT:87）
  if (ptal(87)) {
    set_src(12, times(src(12), 1.6));
  }
  // :57-68 魅惑（91）/ 谜之魅力（92）：同倍率
  for (const t of [91, 92]) {
    if (ptal(t)) {
      set_src(8, times(src(8), 0.5));
      set_src(14, times(src(14), 0.5));
      set_src(0, times(src(0), 1.2));
      set_src(1, times(src(1), 1.2));
      set_src(2, times(src(2), 1.2));
      set_src(5, times(src(5), 1.2));
      set_src(17, times(src(17), 1.2));
    }
  }
  // :70-77 母性/人妻（155/157）× 恋母情结（140）
  if ((ptal(155) || ptal(157)) && tal(140)) {
    set_src(8, times(src(8), 0.5));
    set_src(14, times(src(14), 0.5));
    set_src(3, times(src(3), 1.2));
    set_src(5, times(src(5), 1.2));
  }
  // :79-86 父性（156）× 恋父情结（141）
  if (ptal(156) && tal(141)) {
    set_src(8, times(src(8), 0.5));
    set_src(14, times(src(14), 0.5));
    set_src(3, times(src(3), 1.2));
    set_src(5, times(src(5), 1.2));
  }
  // :88-95 调教者非男人且未熟/娇小 × 目标萝莉控（142）
  if (!ptal(122) && (ptal(100) || ptal(135)) && tal(142)) {
    set_src(8, times(src(8), 0.5));
    set_src(14, times(src(14), 0.5));
    set_src(3, times(src(3), 1.2));
    set_src(5, times(src(5), 1.2));
  }
  // :97-104 调教者是男人且未熟/娇小 × 目标正太控（143）
  if (ptal(122) && (ptal(100) || ptal(135)) && tal(143)) {
    set_src(8, times(src(8), 0.5));
    set_src(14, times(src(14), 0.5));
    set_src(3, times(src(3), 1.2));
    set_src(5, times(src(5), 1.2));
  }
  // :106-113 调教者萝莉控（142）× 目标未熟/娇小非男人
  if (ptal(142) && (tal(100) || tal(135)) && !tal(122)) {
    set_src(0, times(src(0), 1.2));
    set_src(1, times(src(1), 1.2));
    set_src(2, times(src(2), 1.2));
    set_src(17, times(src(17), 1.2));
    set_src(14, times(src(14), 0.8));
  }
  // :115-122 调教者正太控（143）× 目标未熟/娇小男人
  if (ptal(143) && (tal(100) || tal(135)) && tal(122)) {
    set_src(0, times(src(0), 1.2));
    set_src(2, times(src(2), 1.2));
    set_src(17, times(src(17), 1.2));
    set_src(14, times(src(14), 0.8));
  }
  // :124-169 调教者的 ABL:技巧（12）阶梯——无条件执行（爱抚路径实测：
  // 黄金样本的 阴核 300 = 1200 ×0.50，即技巧 0 档）
  const rates = [0.5, 0.8, 1.0, 1.2, 1.5, 2.0];
  const rate = pabl(12) >= 5 ? rates[5] : rates[pabl(12)];
  set_src(0, times(src(0), rate));
  set_src(1, times(src(1), rate));
  set_src(2, times(src(2), rate));
  set_src(17, times(src(17), rate));
}

// @MASTER_SKILL_CHECK（SUB1:172-220）：主人亲自调教的 CFLAG:2 好感加成
function master_skill_check() {
  if (era_flag.assiplay !== 0) {
    return;
  }
  const affection = era.get(`cflag:${cid}:2`) || 0;
  if (affection >= 500) {
    set_src(8, times(src(8), 0.7));
    set_src(14, times(src(14), 0.7));
    set_src(0, times(src(0), 1.2));
    set_src(1, times(src(1), 1.2));
    set_src(2, times(src(2), 1.2));
    set_src(3, times(src(3), 1.3));
    set_src(17, times(src(17), 1.2));
  } else if (affection >= 300) {
    set_src(8, times(src(8), 0.8));
    set_src(14, times(src(14), 0.8));
    set_src(0, times(src(0), 1.1));
    set_src(1, times(src(1), 1.1));
    set_src(2, times(src(2), 1.1));
    set_src(3, times(src(3), 1.2));
    set_src(17, times(src(17), 1.1));
  } else if (affection >= 100) {
    set_src(8, times(src(8), 0.9));
    set_src(14, times(src(14), 0.9));
    set_src(3, times(src(3), 1.1));
  }
  // :205-220 淫乱（76）/ 爱慕（85）：主人亲自调教时的追加乘算
  if (tal(76)) {
    set_src(0, times(src(0), 1.8));
    set_src(1, times(src(1), 1.8));
    set_src(2, times(src(2), 1.8));
    set_src(17, times(src(17), 1.8));
  }
  if (tal(85)) {
    set_src(0, times(src(0), 1.3));
    set_src(1, times(src(1), 1.3));
    set_src(2, times(src(2), 1.3));
    set_src(3, times(src(3), 1.8));
    set_src(17, times(src(17), 1.3));
  }
}

// @INCEST_SEX_CHECK（SUB1:222-263）：亲族文本与源乘算。
function incest_sex_check() {
  const relation = incest(cid, player);
  if (relation === 0 || tflag(19) === 0) {
    return;
  }
  const label = {
    1: ptal(122) ? '父女相奸' : '母女相奸',
    2: ptal(122) ? '母子相奸' : '母女相奸',
    3: ptal(122) ? '兄妹相奸' : '姐妹相奸',
    4: ptal(122) ? '姐弟相奸' : '姐妹相奸',
    5: ptal(122) ? undefined : '表弟相奸',
    6: ptal(122) ? '表姐相奸' : undefined,
  }[relation];
  if (label !== undefined) {
    era.print(label);
  }
  if (relation === 1 || relation === 2) {
    for (const index of [3, 14, 16]) {
      set_src(index, times(src(index), 2));
    }
  } else if (relation === 3 || relation === 4) {
    for (const index of [3, 14, 16]) {
      set_src(index, times(src(index), 1.5));
    }
  }
}

// @LOST_VIRGIN_CHECK（SUB1:265-340，#216 J6 真身）：守卫 1:1（TALENT:0 ==
// 0 || TFLAG:19 == 0 早退）；正文 = 处女丧失记录（初体验相手 CFLAG:15 与
// 近亲代码）、摄影/刻印旗、爱情源的乘算。触发位 TFLAG:19 由插入系指令
// （COMF8/11/20-23/34/64/81/83/120/121/128-134）置位——族票落地前游玩
// 不可达，测试可驱动（与 SEIIN 的 TFLAG:0 随 J12 同型）。
// INCEST 使用 system/train/incest.js 的共用真身；TFLAG:14 由该函数写回。
function lost_virgin_check() {
  if (!tal(0) || tflag(19) === 0) {
    return; // :267-268
  }
  era.print('【处女丧失】'); // :270
  chara(cid).chara.处女 = 0; // :271（talent:0 属主 chara 走门面）

  // :274-277 本次指令/调教/摄影的三面旗（31 属 event、32 属 kojo 走门面）
  game.train.处女丧失 = 1;
  game.event.本次调教处女丧失 = 1;
  if (era.get(`tequip:${cid}:53`)) {
    game.kojo.录像内容 |= 1;
  }

  const r = era_flag.player; // :282 R = NO:PLAYER
  incest(cid, player); // :284-285 CALL INCEST

  // :287-313 初体验相手记录（CFLAG:15 属主 train 直写；+1 存 character no，
  // 300+ 近亲代码——与 COM_AFTER_*_SEX 的表不同组，原作两处各表 1:1）
  if ((era.get(`cflag:${cid}:15`) || 0) === 0) {
    chara(cid).train.初体验对象 = era_flag.player + 1; // :289
    chara(cid).train.初体验对象名 =
      era.get(`callname:${era_flag.player}:-1`) ?? ''; // :290
    const rel = era.get('tflag:14') || 0;
    const male = ptal(122) ? 1 : 0;
    if (rel === 1 && male) {
      chara(cid).train.初体验对象 = 300;
    } else if (rel === 1 && !male) {
      chara(cid).train.初体验对象 = 301;
    } else if (rel === 3 && male) {
      chara(cid).train.初体验对象 = 304;
    } else if (rel === 3 && !male) {
      chara(cid).train.初体验对象 = 305;
    } else if (rel === 4 && male) {
      chara(cid).train.初体验对象 = 306;
    } else if (rel === 4 && !male) {
      chara(cid).train.初体验对象 = 307;
    } else if (rel === 5 && !male) {
      chara(cid).train.初体验对象 = 308;
    } else if (rel === 6 && male) {
      chara(cid).train.初体验对象 = 309;
    }
    // :314-325 特殊初体验的覆盖代码
    if (era_flag.selectcom === 11) {
      chara(cid).train.初体验对象 = 101; // 振动棒
    }
    if (era.get(`tequip:${cid}:90`) && era_flag.selectcom === 101) {
      chara(cid).train.初体验对象 = 102; // 触手生物
    }
    if (era.get(`tequip:${cid}:89`)) {
      chara(cid).train.初体验对象 = 103; // 犬
    }
    if (era.get(`tequip:${cid}:55`) && !era_flag.assiplay) {
      chara(cid).train.初体验对象 = 104; // 死斗场怪物
    }
  }

  // :327-340 反抗刻印回避与爱情源乘算（TALENT:85 爱慕 / 76 淫乱 /
  // 助手相性 200+；150 属 system 走门面）
  if (era_flag.player === MASTER && tal(85)) {
    game.system.反抗刻印回避 = 1;
    set_src(3, times(src(3), 2.0));
    set_src(15, times(src(15), 0.3));
  } else if (tal(76)) {
    game.system.反抗刻印回避 = 1;
    set_src(3, times(src(3), 2.0));
    set_src(6, times(src(6), 0.5));
    set_src(15, times(src(15), 0.3));
  } else if (
    era_flag.assiplay &&
    (era.get(`relation:${cid}:${r}`) || 0) >= 200 &&
    tflag(14) === 0
  ) {
    game.system.反抗刻印回避 = 1;
  }
}

// —— SOURCE_CHECK_UP_*：SOURCE → UP（delta）的换算（SYSTEM_SOURCE） ——

// 欲情对快乐系数的共用阶梯：[[档, 率], ...] 按序判 <，末项兜底（≥ 末档）；
// TFLAG:201 = 1 是自动调教的特例档（恒 1.0）
function desire_rate(table) {
  if (tflag(201) === 1) {
    return 1.0;
  }
  const p5 = palam(5);
  for (let i = 0; i < table.length - 1; i += 1) {
    if (p5 < PALAMLV[table[i][0]]) {
      return table[i][1];
    }
  }
  return table[table.length - 1][1];
}

// 各部位的欲情系数表（末项 = 欲情 ≥ LV4 的档）
const RATE_C = [
  [1, 0.5],
  [2, 0.7],
  [3, 1.0],
  [4, 1.3],
  [9, 1.8],
];
const RATE_V = [
  [1, 0.3],
  [2, 0.5],
  [3, 1.0],
  [4, 1.5],
  [9, 2.0],
];
const RATE_A = [
  [1, 0.6],
  [2, 0.8],
  [3, 1.0],
  [4, 1.2],
  [9, 1.4],
];
const RATE_B = [
  [1, 0.5],
  [2, 0.7],
  [3, 1.0],
  [4, 1.3],
  [9, 1.8],
];

// 欲望（ABL:11）对 LOCAL:1 的共用阶梯
const DESIRE_LADDER = [
  [0, 0.1],
  [1, 0.15],
  [2, 0.2],
  [3, 0.25],
  [4, 0.3],
  [5, 0.4],
];
// 快感否定（32/34/71）的抑鬱阶梯
const DENY_LADDER = [
  [0, 1.0],
  [1, 0.85],
  [2, 0.7],
  [3, 0.4],
  [4, 0.3],
  [5, 0.1],
];

// @SOURCE_CHECK_UP_C（:578-655）
function source_check_up_c() {
  // :583-588 Ｃ敏感（101 & 1 / & 2）与 Ｃ钝感外侧的敏感（102）
  if ((tal(101) || 0) & 1) {
    set_src(0, times(src(0), 0.5));
  }
  if ((tal(101) || 0) & 2) {
    set_src(0, times(src(0), 0.1));
  }
  if (tal(102)) {
    set_src(0, times(src(0), 2.0));
  }

  // :590-605 LOCAL:0 过欲情系数
  let local0 = times(src(0), desire_rate(RATE_C));
  // :607-624 LOCAL:1 过欲望阶梯
  let local1 = src(0);
  local1 =
    abl(11) >= 6
      ? times(local1, 0.5)
      : times(local1, DESIRE_LADDER[abl(11)][1]);
  // :626-648 快感的否定（32）/ 抑压（34）/ 抵抗（71）→ 抑鬱
  let local2 = 0;
  if (tal(32) || tal(34) || tal(71)) {
    local2 = idiv(src(0), 3);
    local2 = abl(11) >= 6 ? 0 : times(local2, DENY_LADDER[abl(11)][1]);
  }
  // :650-655 自慰狂（74）/ 淫核（230）/ ABL:0 > 5 的放大
  if (tal(74)) {
    local0 = times(local0, 1.5);
    local1 = times(local1, 1.2);
    local2 = times(local2, 0.5);
  }
  if (tal(230)) {
    local0 = times(local0, 2.0);
  }
  if (abl(0) > 5) {
    local0 = idiv(local0 * (abl(0) + 5), 10);
  }
  add_up(0, local0); // PALAM:快Ｃ
  add_up(5, local1); // PALAM:欲情
  add_up(13, local2); // PALAM:抑鬱
}

// @SOURCE_CHECK_UP_V（:657-735）：爱抚不写 SOURCE:1，路径上照跑（乘算 0）
function source_check_up_v() {
  if ((tal(103) || 0) & 1) {
    set_src(1, times(src(1), 0.5));
  }
  if ((tal(103) || 0) & 2) {
    set_src(1, times(src(1), 0.1));
  }
  if (tal(104)) {
    set_src(1, times(src(1), 2.0));
  }
  let local0 = times(src(1), desire_rate(RATE_V));
  let local1 = src(1);
  local1 =
    abl(11) >= 6
      ? times(local1, 0.5)
      : times(local1, DESIRE_LADDER[abl(11)][1]);
  let local2 = 0;
  if (tal(32) || tal(34) || tal(71)) {
    local2 = idiv(src(1), 3);
    local2 = abl(11) >= 6 ? 0 : times(local2, DENY_LADDER[abl(11)][1]);
  }
  if (tal(75)) {
    local0 = times(local0, 1.5);
    local1 = times(local1, 1.2);
    local2 = times(local2, 0.5);
  }
  if (tal(232)) {
    local0 = times(local0, 1.5);
  }
  if (abl(2) > 5) {
    local0 = idiv(local0 * (abl(2) + 5), 10);
  }
  add_up(1, local0);
  add_up(4, local1);
  add_up(5, local1);
  add_up(13, local2);
}

// @SOURCE_CHECK_UP_A（:737-856）
function source_check_up_a() {
  if ((tal(105) || 0) & 1) {
    set_src(2, times(src(2), 0.5));
  }
  if ((tal(105) || 0) & 2) {
    set_src(2, times(src(2), 0.1));
  }
  if (tal(106)) {
    set_src(2, times(src(2), 2.0));
  }
  let local0 = times(src(2), desire_rate(RATE_A));
  let local1 = src(2);
  // 快Ａ的欲望阶梯独立（0.05 起步）
  const A_LADDER = [
    [0, 0.05],
    [1, 0.1],
    [2, 0.4],
    [3, 0.8],
    [4, 1.2],
    [5, 1.8],
  ];
  local1 =
    abl(11) >= 6 ? times(local1, 2.0) : times(local1, A_LADDER[abl(11)][1]);
  let local2 = 0;
  if (tal(32) || tal(34) || tal(71)) {
    local2 = idiv(src(2), 3);
    local2 = abl(11) >= 6 ? 0 : times(local2, DENY_LADDER[abl(11)][1]);
  }
  if (tal(77)) {
    local0 = times(local0, 1.5);
    local1 = times(local1, 1.2);
    local2 = times(local2, 0.5);
  }
  if (tal(233)) {
    local0 = times(local0, 2.0);
  }
  if (abl(3) > 5) {
    local0 = idiv(local0 * (abl(3) + 5), 10);
  }
  add_up(2, local0);
  add_up(5, local1);
  add_up(6, local1);
  add_up(13, local2);
}

// @SOURCE_CHECK_UP_B（:858-939）
function source_check_up_b() {
  if ((tal(107) || 0) & 1) {
    set_src(17, times(src(17), 0.5));
  }
  if ((tal(107) || 0) & 2) {
    set_src(17, times(src(17), 0.1));
  }
  if (tal(108)) {
    set_src(17, times(src(17), 2.0));
  }
  // :879-897 胸围对 SOURCE:1 的乘算——原作写的就是 V 源（可疑但 1:1）
  const BUST_RATES = [
    [253, 2.5],
    [252, 2.15],
    [251, 1.8],
    [116, 1.5],
    [109, 1.2],
    [110, 0.9],
    [114, 0.8],
    [119, 0.7],
  ];
  for (const [t, rate] of BUST_RATES) {
    if (tal(t)) {
      set_src(1, times(src(1), rate));
      break;
    }
  }
  let local0 = times(src(17), desire_rate(RATE_B));
  let local1 = src(17);
  local1 =
    abl(11) >= 6
      ? times(local1, 0.5)
      : times(local1, DESIRE_LADDER[abl(11)][1]);
  let local2 = 0;
  if (tal(32) || tal(34) || tal(71)) {
    local2 = idiv(src(17), 3);
    local2 = abl(11) >= 6 ? 0 : times(local2, DENY_LADDER[abl(11)][1]);
  }
  if (tal(78)) {
    local0 = times(local0, 1.5);
    local1 = times(local1, 1.2);
    local2 = times(local2, 0.5);
  }
  if (tal(231)) {
    local0 = times(local0, 2.0);
  }
  if (abl(1) > 5) {
    local0 = idiv(local0 * (abl(1) + 5), 10);
  }
  add_up(14, local0); // PALAM:快Ｂ
  add_up(5, local1);
  add_up(13, local2);
}

// @SOURCE_CHECK_UP_FREE（:1598）：局部（18）→ UP:15
function source_check_up_free() {
  add_up(15, src(18));
}

// @LOVE_MOIST_CHECK_UP（:1609）：爱液处理——快乐合计 > 100 的 20% 液体
function love_moist_check_up() {
  const total = up(0) + up(1) + up(2) + up(14);
  if (total > 100 && !tal(122)) {
    let moist = total;
    if (tal(42)) {
      moist = times(moist, 3.0);
    }
    if (tal(43)) {
      moist = times(moist, 0.4);
    }
    if (tal(170)) {
      moist = times(moist, 0.1);
    }
    set_src(10, src(10) + idiv(moist, 5));
  }
}

// @SOURCE_CHECK_UP_LOVE（:987）：情爱 → 恭顺 + 欲情
function source_check_up_love() {
  // 顺从（ABL:10）阶梯
  const OB_LADDER = [
    [0, 0.1],
    [1, 0.25],
    [2, 0.4],
    [3, 0.6],
    [4, 0.8],
    [5, 1.0],
  ];
  let local0 = src(3);
  local0 =
    abl(10) >= 6 ? times(local0, 1.2) : times(local0, OB_LADDER[abl(10)][1]);
  // 侍奉精神（ABL:16）阶梯
  const SV_LADDER = [
    [0, 0.95],
    [1, 1.0],
    [2, 1.05],
    [3, 1.1],
    [4, 1.15],
    [5, 1.2],
  ];
  local0 =
    abl(16) >= 6 ? times(local0, 1.3) : times(local0, SV_LADDER[abl(16)][1]);
  // 欲望（ABL:11）阶梯（LOVE 侧独立：0.00 起步）
  const LOVE_DESIRE = [
    [0, 0.0],
    [1, 0.05],
    [2, 0.1],
    [3, 0.2],
    [4, 0.3],
    [5, 0.4],
  ];
  let local1 = src(3);
  local1 =
    abl(11) >= 6 ? times(local1, 0.5) : times(local1, LOVE_DESIRE[abl(11)][1]);
  add_up(4, local0); // PALAM:恭顺
  add_up(5, local1); // PALAM:欲情
}

// @SOURCE_CHECK_UP_IMPULSIVE（:1052）：性行动 → 习得 + 抑鬱
function source_check_up_impulsive() {
  const SV_LADDER = [
    [0, 0.6],
    [1, 0.8],
    [2, 1.0],
    [3, 1.2],
    [4, 1.4],
    [5, 1.7],
  ];
  let local0 = src(4);
  local0 =
    abl(16) >= 6 ? times(local0, 2.0) : times(local0, SV_LADDER[abl(16)][1]);
  const ST_LADDER = [
    [0, 0.95],
    [1, 1.0],
    [2, 1.05],
    [3, 1.1],
    [4, 1.15],
    [5, 1.2],
  ];
  local0 =
    abl(13) >= 6 ? times(local0, 1.3) : times(local0, ST_LADDER[abl(13)][1]);
  let local1 = 0;
  if (tal(32) || tal(34)) {
    const REP_LADDER = [
      [0, 1.8],
      [1, 1.3],
      [2, 0.9],
      [3, 0.7],
      [4, 0.5],
      [5, 0.3],
    ];
    local1 = idiv(src(4), 5);
    local1 =
      abl(16) >= 6 ? times(local1, 0.1) : times(local1, REP_LADDER[abl(16)][1]);
  }
  add_up(7, local0); // PALAM:习得
  add_up(13, local1); // PALAM:抑鬱
}

// @SOURCE_CHECK_UP_ACHIEVE（:1122）：达成感 → 恭顺
function source_check_up_achieve() {
  const OB_LADDER = [
    [0, 0.5],
    [1, 0.8],
    [2, 1.0],
    [3, 1.2],
    [4, 1.4],
    [5, 1.6],
    [6, 1.8],
  ];
  let local0 = src(5);
  local0 =
    abl(10) >= 7 ? times(local0, 2.0) : times(local0, OB_LADDER[abl(10)][1]);
  const SV_LADDER = [
    [0, 0.0],
    [1, 0.4],
    [2, 0.8],
    [3, 1.2],
    [4, 1.6],
    [5, 2.0],
  ];
  local0 =
    abl(16) >= 6 ? times(local0, 2.4) : times(local0, SV_LADDER[abl(16)][1]);
  const ST_LADDER = [
    [0, 0.95],
    [1, 1.0],
    [2, 1.05],
    [3, 1.1],
    [4, 1.15],
    [5, 1.2],
  ];
  local0 =
    abl(13) >= 6 ? times(local0, 1.3) : times(local0, ST_LADDER[abl(13)][1]);
  add_up(4, local0);
}

// @SOURCE_CHECK_UP_PAIN（:1186）：疼痛 → 苦痛/恐怖/反感/欲情
function source_check_up_pain() {
  let local0 = src(6);
  let local1 = src(6);
  let local2 = src(6);
  let local3 = src(6);
  // 顺从阶梯（恐怖/反感两路）
  const P1 = [
    [0, [0.8, 0.8]],
    [1, [0.7, 0.6]],
    [2, [0.55, 0.5]],
    [3, [0.45, 0.4]],
    [4, [0.35, 0.2]],
    [5, [0.25, 0.05]],
  ];
  const [r1, r2] = abl(10) >= 6 ? [0.15, 0.0] : P1[abl(10)][1];
  local1 = times(local1, r1);
  local2 = times(local2, r2);
  // 抖M（21）阶梯（反感/欲情）
  const M_LADDER = [
    [0, [1.0, 0.0]],
    [1, [0.8, 0.1]],
    [2, [0.5, 0.2]],
    [3, [0.3, 0.3]],
    [4, [0.1, 0.45]],
    [5, [0.05, 0.6]],
  ];
  const [m2, m3] = abl(21) >= 6 ? [0.0, 0.75] : M_LADDER[abl(21)][1];
  local2 = times(local2, m2);
  local3 = times(local3, m3);
  // 调教者抖S（20）
  const S_LADDER = [1.0, 1.1, 1.2, 1.3, 1.4, 1.5];
  local3 = times(local3, pabl(20) >= 6 ? 1.6 : S_LADDER[pabl(20)]);
  if (tal(88)) {
    local3 = times(local3, 2.0); // 受虐狂
  }
  if (ptal(83)) {
    local3 = times(local3, 2.0); // 调教者施虐狂
  }
  if (tal(40)) {
    local0 = times(local0, 1.5); // 害怕疼痛
    local3 = times(local3, 4.0);
  } else if (tal(41)) {
    local0 = times(local0, 0.8); // 不惧疼痛
    local3 = times(local3, 0.8);
  }
  if (era_flag.assiplay) {
    local2 = times(local2, 0.4); // 助手调教
  }
  add_up(9, local0); // PALAM:苦痛
  add_up(10, local1); // PALAM:恐怖
  add_up(11, local2); // PALAM:反感
  add_up(5, local3); // PALAM:欲情（抖M）
}

// @SOURCE_CHECK_UP_POISON（:1294）：中毒充足 → 恭顺 + 欲情
function source_check_up_poison() {
  let local0 = src(7);
  let local1 = src(7);
  for (let level = 0; level <= 7; level += 1) {
    if (abl(11) === level) {
      local0 = times(local0, 0.1 + 0.05 * level);
      local1 = times(local1, 0.2 + 0.1 * level);
    }
  }
  if (abl(11) >= 8) {
    local0 = times(local0, 0.5);
    local1 = times(local1, 1.0);
  }
  add_up(4, local0);
  add_up(5, local1);
}

// @SOURCE_CHECK_UP_DIRTY（:1338）：不洁 → 反感 + 不快
function source_check_up_dirty() {
  let local0 = src(8);
  let local1 = src(8);
  const level = abl(10);
  if (level === 0) {
    local0 = times(local0, 0.6);
    local1 = times(local1, 1.0);
  } else if (level === 1) {
    local0 = times(local0, 0.4);
    local1 = times(local1, 0.8);
  } else if (level === 2) {
    local0 = times(local0, 0.25);
    local1 = times(local1, 0.6);
  } else if (level === 3) {
    local0 = times(local0, 0.1);
    local1 = times(local1, 0.3);
  } else if (level === 4) {
    local0 = times(local0, 0.0);
    local1 = times(local1, 0.1);
  } else {
    local0 = times(local0, 0.0);
    local1 = times(local1, 0.0);
  }
  add_up(11, local0); // PALAM:反感
  add_up(12, local1); // PALAM:不快
}

// @SOURCE_CHECK_UP_MOIST / DESIRE / LIKE / ANTI（:1373/:1383/:1587，各自单行）
function source_check_up_moist() {
  add_up(3, src(10)); // 液体追加 → 润滑
}
function source_check_up_desire() {
  add_up(5, src(11)); // 欲情追加 → 欲情
}
function source_check_up_like() {
  add_up(4, src(16)); // 恭顺追加 → 恭顺
}

// @SOURCE_CHECK_UP_FLASHER（:1393）：露出 → 欲情 + 耻情 + 反感
function source_check_up_flasher() {
  if (tal(35)) {
    set_src(12, times(src(12), 2.0)); // 害羞
  }
  if (tal(36)) {
    set_src(12, times(src(12), 0.5)); // 不知羞耻
  }
  // 润滑增量的 50% 并进露出源（扣除液体追加的部分）
  set_src(12, src(12) + idiv(up(3) - src(10), 2));

  let local0 = src(12);
  let local1 = src(12);
  let local2 = src(12);
  // 露出癖（17）阶梯（欲情 / 反感）
  const EX_LADDER = [
    [0, [0.0, 1.0]],
    [1, [0.1, 0.9]],
    [2, [0.2, 0.7]],
    [3, [0.4, 0.5]],
    [4, [0.6, 0.3]],
    [5, [0.8, 0.1]],
  ];
  const [e0, e2] = abl(17) >= 6 ? [1.0, 0.0] : EX_LADDER[abl(17)][1];
  local0 = times(local0, e0);
  local2 = times(local2, e2);
  // 耻情衰减（一度に恥を掻けば掻くほど）
  const p8 = palam(8);
  if (p8 < PALAMLV[1]) {
    local1 = times(local1, 1.0);
  } else if (p8 < PALAMLV[2]) {
    local1 = times(local1, 0.9);
  } else if (p8 < PALAMLV[3]) {
    local1 = times(local1, 0.7);
  } else if (p8 < PALAMLV[4]) {
    local1 = times(local1, 0.5);
  } else {
    local1 = times(local1, 0.3);
  }
  // 顺从阶梯削反感
  const level = abl(10);
  if (level === 0) {
    local2 = times(local2, 0.5);
  } else if (level === 1) {
    local2 = times(local2, 0.3);
  } else if (level === 2) {
    local2 = times(local2, 0.15);
  } else if (level === 3) {
    local2 = times(local2, 0.05);
  } else {
    local2 = times(local2, 0.0);
  }
  add_up(5, local0);
  add_up(8, local1); // PALAM:耻情
  add_up(11, local2);
}

// @SOURCE_CHECK_UP_SUBMIT（:1471）：屈从 → 抑鬱 + 屈服
function source_check_up_submit() {
  let local0 = src(13);
  let local1 = src(13);
  const level = abl(10);
  const SUBMIT_L0 = [
    [0, 0.12],
    [1, 0.1],
    [2, 0.05],
    [3, 0.02],
    [4, 0.0],
    [5, 0.0],
    [6, 0.0],
  ];
  const SUBMIT_L1 = [
    [0, 0.5],
    [1, 0.8],
    [2, 1.0],
    [3, 1.1],
    [4, 1.2],
    [5, 1.3],
    [6, 1.4],
  ];
  if (level <= 6) {
    local0 = times(local0, SUBMIT_L0[level][1]);
    local1 = times(local1, SUBMIT_L1[level][1]);
  } else {
    local0 = times(local0, 0.0);
    local1 = times(local1, 1.5);
  }
  // 兽奸中毒（39）阶梯
  const BEST_LADDER = [1.0, 1.1, 1.2, 1.5, 2.0, 3.0];
  local1 = times(local1, abl(39) >= 6 ? 4.0 : BEST_LADDER[abl(39)]);
  add_up(13, local0);
  add_up(6, local1); // PALAM:屈服
}

// @SOURCE_CHECK_UP_DEVIATE（:1529）：逸脱 → 反感
function source_check_up_deviate() {
  if (tal(23)) {
    set_src(14, times(src(14), 0.3)); // 好奇心
  }
  if (tal(24)) {
    set_src(14, times(src(14), 3.0)); // 保守的
  }
  let local0 = src(14);
  const level = abl(10);
  if (level === 0) {
    local0 = times(local0, 1.0);
  } else if (level === 1) {
    local0 = times(local0, 0.8);
  } else if (level === 2) {
    local0 = times(local0, 0.7);
  } else if (level === 3) {
    local0 = times(local0, 0.4);
  } else if (level === 4) {
    local0 = times(local0, 0.2);
  } else {
    local0 = times(local0, 0.0);
  }
  const D_LADDER = [0.9, 0.7, 0.5, 0.3, 0.1];
  local0 = abl(11) >= 5 ? times(local0, 0.0) : times(local0, D_LADDER[abl(11)]);
  add_up(11, local0);
}

// —— UP_TALENT 两函数（SUB1:691-1086）：素质对 UP 的乘算 ——

// @UP_TALENT_CVA_CHECK（:691-738）：快乐系（UP 0/1/2/14）
function up_talent_cva_check() {
  if (era.get(`tequip:${cid}:21`)) {
    // 媚药
    set_up(0, times(up(0), 2.0));
    set_up(1, times(up(1), 2.0));
    set_up(2, times(up(2), 2.0));
    set_up(14, times(up(14), 2.0));
  }
  if (era.get(`tequip:${cid}:22`)) {
    // 利尿剂
    set_up(0, times(up(0), 0.7));
    set_up(1, times(up(1), 0.7));
    set_up(2, times(up(2), 0.7));
    set_up(14, times(up(14), 0.7));
  }
  if (tflag(899) > 0) {
    // 失神中
    set_up(0, times(up(0), 0.2));
    set_up(1, times(up(1), 0.2));
    set_up(2, times(up(2), 0.2));
    set_up(14, times(up(14), 0.2));
  }
  if (tal(20)) {
    // 克制
    set_up(0, times(up(0), 0.3));
    set_up(1, times(up(1), 0.5));
    set_up(2, times(up(2), 0.7));
    set_up(14, times(up(14), 0.3));
  }
  if (tal(122)) {
    // 男人
    set_up(2, times(up(2), 1.3));
  }
  if (tal(272)) {
    // 性豪
    set_up(0, times(up(0), 1.2));
    set_up(1, times(up(1), 1.2));
    set_up(2, times(up(2), 1.2));
    set_up(14, times(up(14), 1.2));
  }
}

// @UP_TALENT_CHECK（:740-935，尾接 :936-951 的妊娠恐怖与反抗刻印段）：全量 1:1（target/TEQUIP/TFLAG 读取，
// 未落表的键读 0 自然跳过）
function up_talent_check() {
  if (era.get(`tequip:${cid}:21`)) {
    set_up(4, times(up(4), 1.2));
    set_up(5, times(up(5), 2.0));
    set_up(6, times(up(6), 1.2));
    set_up(11, times(up(11), 0.75));
    set_up(12, times(up(12), 0.5));
  }
  if (era.get(`tequip:${cid}:22`)) {
    set_up(4, times(up(4), 0.8));
    set_up(5, times(up(5), 1.5));
    set_up(6, times(up(6), 0.8));
    set_up(11, times(up(11), 0.5));
    set_up(12, times(up(12), 1.2));
    set_up(13, times(up(13), 1.5));
    set_up(15, times(up(15), 1.2));
  }
  if (tflag(899) > 0) {
    set_up(4, times(up(4), 0.5));
    set_up(5, times(up(5), 0.75));
    set_up(6, times(up(6), 0.1));
    set_up(8, times(up(8), 0.1));
    set_up(10, times(up(10), 0.0));
    set_up(11, times(up(11), 0.0));
    set_up(12, times(up(12), 0.1));
    set_up(13, times(up(13), 0.0));
  }
  if (tal(10)) {
    set_up(10, times(up(10), 2.0));
    set_up(11, times(up(11), 0.5));
    set_up(13, times(up(13), 0.25));
  }
  if (tal(11)) {
    set_up(4, times(up(4), 0.25));
    set_up(5, times(up(5), 0.5));
    set_up(11, times(up(11), 1.5));
  }
  if (tal(12)) {
    set_up(4, times(up(4), 0.3));
    set_up(5, times(up(5), 0.75));
    set_up(10, times(up(10), 0.8));
    set_up(11, times(up(11), 2.0));
    set_up(13, times(up(13), 2.0));
  }
  if (tal(13)) {
    set_up(4, times(up(4), 2.0));
    set_up(11, times(up(11), 0.6));
  }
  if (tal(14)) {
    set_up(11, times(up(11), 0.3));
  }
  if (tal(15)) {
    set_up(6, times(up(6), 0.5));
    set_up(10, times(up(10), 0.6));
    set_up(11, times(up(11), 1.2));
  }
  if (tal(17)) {
    set_up(6, times(up(6), 2.0));
    set_up(10, times(up(10), 1.5));
    set_up(11, times(up(11), 0.8));
  }
  if (tal(21)) {
    set_up(4, times(up(4), 0.5));
    set_up(5, times(up(5), 0.5));
    set_up(6, times(up(6), 0.5));
    set_up(10, times(up(10), 0.8));
    set_up(11, times(up(11), 0.8));
  }
  if (tal(22)) {
    for (const k of [4, 5, 6, 8, 10, 11, 12, 13]) {
      set_up(k, times(up(k), 0.6));
    }
  }
  if (tal(23)) {
    set_up(7, times(up(7), 1.2));
  }
  if (tal(24)) {
    set_up(7, times(up(7), 0.8));
  }
  if (tal(25)) {
    set_up(13, times(up(13), 0.3));
  }
  if (tal(26)) {
    set_up(13, times(up(13), 2.5));
  }
  if (tal(32)) {
    set_up(5, times(up(5), 0.5));
    set_up(11, times(up(11), 2.0));
    set_up(13, times(up(13), 1.5));
  }
  if (tal(33)) {
    set_up(5, times(up(5), 2.0));
    set_up(6, times(up(6), 2.0));
  }
  if (tal(34)) {
    set_up(5, times(up(5), 0.5));
    set_up(11, times(up(11), 2.0));
  }
  if (tal(40)) {
    set_up(10, times(up(10), 2.0));
    set_up(11, times(up(11), 1.5));
  }
  if (tal(41)) {
    set_up(10, times(up(10), 0.5));
    set_up(11, times(up(11), 0.75));
  }
  if (tal(50)) {
    set_up(7, times(up(7), 2.0));
  }
  if (tal(51)) {
    set_up(7, times(up(7), 0.5));
  }
  if (tal(63)) {
    set_up(6, times(up(6), 2.0));
  }
  if (tal(70)) {
    set_up(5, times(up(5), 2.0));
  }
  if (tal(71)) {
    set_up(5, times(up(5), 0.5));
  }
  if (tal(85) && era_flag.assiplay === 0) {
    set_up(4, times(up(4), 1.2));
    set_up(6, times(up(6), 2.0));
    set_up(11, times(up(11), 0.5));
    set_up(12, times(up(12), 0.5));
  }
  if (tal(86)) {
    set_up(6, times(up(6), 4.0));
    set_up(11, times(up(11), 0.5));
  }
  if (ptal(93)) {
    set_up(10, times(up(10), 2.0));
    set_up(11, times(up(11), 0.5));
  }
  if (tal(272)) {
    set_up(5, times(up(5), 1.2));
  }
  if (tal(271)) {
    set_up(5, times(up(5), 1.2));
    set_up(3, times(up(3), 1.2));
  }
  // 膣内射精による妊娠への恐怖：TFLAG:2 && SELECTCOM ∈ 体位组——爱抚
  //（SELECTCOM 0）不达，体位票落地时随指令实现（此处 1:1 保留判据）
  if (tflag(2) && [20, 21, 22, 23, 34].includes(era_flag.selectcom || 0)) {
    if (
      era_flag.assiplay === 0 &&
      !era.get(`tequip:${cid}:35`) &&
      tflag(2) &&
      !tal(85)
    ) {
      set_up(10, times(up(10), 2.0));
    } else if (
      era_flag.assi > 0 &&
      era_flag.assiplay &&
      !era.get(`tequip:${era_flag.assi}:36`)
    ) {
      const relation = era.get(`relation:${cid}:${era_flag.assi}`) || 0;
      if (relation < 200) {
        set_up(10, times(up(10), 2.0));
      }
    }
  }
  // 反抗刻印（MARK:3）
  const mark3 = era.get(`mark:${cid}:3`) || 0;
  if (mark3 === 3) {
    set_up(4, times(up(4), 0.1));
  } else if (mark3 === 2) {
    set_up(4, times(up(4), 0.4));
  } else if (mark3 === 1) {
    set_up(4, times(up(4), 0.7));
  }
}

// —— 绝顶（@EX_CHECK_UP，:1662-2131） ——

// DOWN 只在本回合 PALAM_UP_CHECK 里消费，用局部对象承载（ere 无 down 表）
const down_map = new Map();
const down = (k) => down_map.get(k) || 0;
const set_down = (k, v) => down_map.set(k, v);

// @ECST_CHECK（SUB1:1555）：绝顶强度的快照
function ecst_check(arg) {
  game.system.绝顶强度 = arg;
}

// @YOKUBO_UP_CHECK（SUB1:1088）：欲望 ≥ 3 时压抑/抵抗消失
function yokubo_up_check() {
  if (abl(11) >= 3 && (tal(32) || tal(34))) {
    era.print(`${era.get(`callname:${cid}:-1`) ?? ''}的`);
    if (tal(32)) {
      era.print('【压抑】');
      era.set(`talent:${cid}:32`, 0);
    }
    if (tal(34)) {
      era.print('【抵抗】');
      era.set(`talent:${cid}:34`, 0);
    }
    era.print('失去了');
    era.print('否定点数减半');
    era.set(`juel:${cid}:100`, idiv(era.get(`juel:${cid}:100`) || 0, 2));
    game.train.压抑抵抗消灭 = 1;
  }
}

// @JUJUN_UP_CHECK（SUB1:1106）：顺从 ≥ 4 时反抗心 → 坦率
function jujun_up_check() {
  if (abl(10) >= 4 && tal(11) && tal(18)) {
    era.print(`${era.get(`callname:${cid}:-1`) ?? ''}的【反抗心】失去了，`);
    era.print('【坦率】获得。');
    era.set(`talent:${cid}:11`, 0);
    chara(cid).chara.坦率 = 1;
  }
}

async function ex_check_up() {
  let ex_c = 0;
  let ex_v = 0;
  let ex_a = 0;
  let ex_b = 0;
  let ex_f = 0;
  const LV4 = PALAMLV[4]; // 10000

  // 四档阈值：[倍率, 阈值倍数]，名称按部位
  const check_part = (up_id, palam_id, names) => {
    const total = up(up_id) + palam(palam_id);
    let grade = 0;
    if (total >= LV4 * 32) {
      grade = 9;
      set_down(up_id, LV4 * 32 - 1000);
    } else if (total >= LV4 * 8) {
      grade = 4;
      set_down(up_id, LV4 * 8 - 1000);
    } else if (total >= LV4 * 2) {
      grade = 2;
      set_down(up_id, LV4 * 2 - 1000);
    } else if (total >= LV4) {
      grade = 1;
      set_down(up_id, LV4 - 1000);
    }
    if (grade > 0) {
      era.print(names[grade]);
    }
    // DOWN 下调后仍 ≥ 阈值 → 收到阈值 -1（10000 → 9999）
    if (up(up_id) + palam(palam_id) - down(up_id) >= LV4) {
      set_down(up_id, up(up_id) + palam(palam_id) - LV4 + 1);
    }
    return grade;
  };

  ex_c = check_part(0, 0, {
    1: tal(122) ? '阴茎绝顶' : '阴蒂绝顶',
    2: tal(122) ? '强阴茎绝顶' : '强阴蒂绝顶',
    4: tal(122) ? '超阴茎绝顶' : '超阴蒂绝顶',
    9: tal(122) ? '最强阴茎绝顶' : '最强阴蒂绝顶',
  });
  ex_v = check_part(1, 1, {
    1: '私处绝顶',
    2: '强私处绝顶',
    4: '超私处绝顶',
    9: '最强私处绝顶',
  });
  ex_a = check_part(2, 2, {
    1: '肛门绝顶',
    2: '强肛门绝顶',
    4: '超肛门绝顶',
    9: '最强肛门绝顶',
  });
  ex_b = check_part(14, 14, {
    1: '乳房绝顶',
    2: '强乳房绝顶',
    4: '超乳房绝顶',
    9: '最强乳房绝顶',
  });
  // 绝顶Ｆ（局部）：名称是 CSTR:7 的癖好名
  const fetish = era.get(`cstr:${cid}:7`) ?? '';
  ex_f = check_part(15, 15, {
    1: `${fetish}绝顶`,
    2: `强${fetish}绝顶`,
    4: `超${fetish}绝顶`,
    9: `最强${fetish}绝顶`,
  });

  ecst_check(ex_c + ex_v + ex_a + ex_b + ex_f);
  // :1812 精饮绝顶（J6 真身，system/train/seiin.js；TFLAG:0 口内射精由
  // 奉仕系指令置位——J12 前游玩不可达，守卫自守）
  await seiin_start();

  // 多重绝顶的倍率与宣告（组数分档：五重 12 倍 / 四重 8 倍 / 三重 4 倍 / 双 2 倍）
  const parts = [
    ['C', ex_c],
    ['V', ex_v],
    ['A', ex_a],
    ['B', ex_b],
    ['F', ex_f],
  ];
  const active = parts.filter(([, v]) => v > 0);
  if (active.length === 5) {
    era.print('五 重 绝 顶');
    era.print('(各自获得12倍点数)');
    [ex_c, ex_v, ex_a, ex_b, ex_f] = [ex_c, ex_v, ex_a, ex_b, ex_f].map(
      (v) => v * 12,
    );
  } else if (active.length === 4) {
    era.print('四 重 绝 顶');
    era.print('(各自获得8倍点数)');
    [ex_c, ex_v, ex_a, ex_b, ex_f] = [ex_c, ex_v, ex_a, ex_b, ex_f].map(
      (v) => v * 8,
    );
  } else if (active.length === 3) {
    const names = {
      C: clitoris_name(),
      V: '私处',
      A: '肛门',
      B: '乳房',
      F: fetish,
    };
    const label = active.map(([k]) => names[k]).join('、');
    era.print(`${label}绝顶`);
    era.print('(各自获得4倍点数)');
    [ex_c, ex_v, ex_a, ex_b, ex_f] = [ex_c, ex_v, ex_a, ex_b, ex_f].map(
      (v) => v * 4,
    );
  } else if (active.length === 2) {
    const names = {
      C: clitoris_name(),
      V: '私处',
      A: '肛门',
      B: '乳房',
      F: fetish,
    };
    const label = active.map(([k]) => names[k]).join('、');
    era.print(`${label}绝顶`);
    era.print('(各自获得2倍点数)');
    [ex_c, ex_v, ex_a, ex_b, ex_f] = [ex_c, ex_v, ex_a, ex_b, ex_f].map(
      (v) => v * 2,
    );
  }

  // 绝顶的源与体力追加
  if (ex_c) {
    set_src(12, src(12) + 500 * ex_c);
    set_src(13, src(13) + 200 * ex_c);
    if (tal(230)) {
      add_lose(0, 10);
      add_lose(1, 5);
    } else {
      add_lose(0, 20);
      add_lose(1, 10);
    }
    if (ex_c === 2 && tflag(200) < 1) {
      game.train.屈服刻印结算 = 1; // 屈服刻印１相当
    }
  }
  if (ex_v) {
    set_src(12, src(12) + 700 * ex_v);
    set_src(13, src(13) + 400 * ex_v);
    set_src(11, src(11) + 800 * ex_v);
    set_src(16, src(16) + 500 * ex_v);
    if (tal(232)) {
      add_lose(0, 20);
      add_lose(1, 10);
    } else {
      add_lose(0, 40);
      add_lose(1, 20);
    }
    if (ex_v === 1 && tflag(200) < 1) {
      game.train.屈服刻印结算 = 1;
    } else if (ex_v === 2 && tflag(200) < 2) {
      game.train.屈服刻印结算 = 2;
    }
  }
  if (ex_a) {
    set_src(12, src(12) + 1200 * ex_a);
    set_src(13, src(13) + 4500 * ex_a);
    set_src(11, src(11) + 3500 * ex_a);
    set_src(16, src(16) + 1500 * ex_a);
    if (tal(233)) {
      add_lose(0, 30);
      add_lose(1, 15);
    } else {
      add_lose(0, 60);
      add_lose(1, 30);
    }
    if (tflag(200) < 3) {
      game.train.屈服刻印结算 = 3;
    }
  }
  if (ex_b) {
    set_src(12, src(12) + 500 * ex_b);
    set_src(13, src(13) + 200 * ex_b);
    if (tal(231)) {
      add_lose(0, 10);
      add_lose(1, 5);
    } else {
      add_lose(0, 20);
      add_lose(1, 10);
    }
    if (ex_b === 2 && tflag(200) < 1) {
      game.train.屈服刻印结算 = 1;
    }
  }
  if (ex_f) {
    set_src(12, src(12) + 1200 * ex_f);
    set_src(13, src(13) + 4500 * ex_f);
    set_src(11, src(11) + 3500 * ex_f);
    set_src(16, src(16) + 1500 * ex_f);
    add_lose(0, 60);
    add_lose(1, 30);
    if (tflag(200) < 3) {
      game.train.屈服刻印结算 = 3;
    }
  }

  // 绝顶による欲望ＬＶアップ（EX_L 阶梯）
  let ex_l = 0;
  if (ex_c || ex_b) {
    ex_l = 1;
  }
  if (ex_v) {
    ex_l = 2;
  }
  if (ex_a || (ex_c && ex_b && ex_v) || ex_c + ex_b + ex_v + ex_a >= 20) {
    ex_l = 3;
  }
  if ((ex_c && ex_b && ex_v && ex_a) || ex_c + ex_b + ex_v + ex_a >= 36) {
    ex_l = 4;
  }
  if (ex_c + ex_b + ex_v + ex_a >= 72) {
    ex_l = 5;
  }
  if (ex_c + ex_b + ex_v + ex_a >= 288) {
    ex_l = 10;
  }
  if (tal(20) || tal(27)) {
    ex_l -= 1; // 自制心 / 一線越えない
  }
  if (abl(11) < ex_l) {
    chara(cid).system.欲望 = ex_l;
    era.print(`获得${era.get(`ablname:11`) ?? ''}LV${ex_l}`);
    if (ex_l >= 3) {
      yokubo_up_check();
    }
  }

  // NOWEX 只写不并（ex 合并留给引擎的 nextTurnInTrain，见文件头）
  era.set(`nowex:${cid}:0`, ex_c);
  era.set(`nowex:${cid}:1`, ex_v);
  era.set(`nowex:${cid}:2`, ex_a);
  era.set(`nowex:${cid}:3`, ex_b);
  era.set(`nowex:${cid}:4`, ex_f);
  // 绝顶经验（EXP:2）
  chara(cid).dungeon.绝顶经验 += ex_c + ex_v + ex_a + ex_b + ex_f;
}

// —— @MASTER_FLAG_CHECK（SUB1:1615-1711）：好感度累积 ——

function master_flag_check() {
  // 绝顶强度的累计（TFLAG:29/30）
  game.system.绝顶强度 = tflag(29) + tflag(10) + tflag(11);
  let q = 0;
  for (let i = 0; i <= 3; i += 1) {
    if ((era.get(`nowex:${cid}:${i}`) || 0) > 0) {
      q += 1;
    }
  }
  if (tflag(10) > 0) {
    q += 1;
  }
  if (tflag(11) > 0) {
    q += 1;
  }
  game.train.主人经验 = tflag(30) + tflag(29) * q;

  // :1633-1640 射精系 TFLAG 的经验加算（TFLAG:0-4/9 恒 0，循环 1:1 保留）
  for (let count = 0; count < 5; count += 1) {
    if (tflag(count) > 0 && (era.get(`exp:${cid}:20`) || 0) >= PALAMLV[2]) {
      game.train.主人经验 = tflag(30) + tflag(count);
    }
  }
  if (tflag(9) > 0 && (era.get(`exp:${cid}:20`) || 0) >= PALAMLV[2]) {
    game.train.主人经验 = tflag(30) + tflag(9);
  }

  // :1642-1707 主人亲自调教时的好感度（CFLAG:2）累积
  if (era_flag.assiplay === 0 && !era.get(`tequip:${cid}:90`)) {
    let r = abl(10);
    // 素质增减（1:1 清单）
    if (tal(11)) {
      r -= 1;
    }
    if (tal(13)) {
      r += 1;
    }
    if (tal(20)) {
      r -= 1;
    }
    if (tal(21)) {
      r -= 1;
    }
    if (tal(22)) {
      r -= 1;
    }
    if (tal(34)) {
      r -= 1;
    }
    if (tal(63)) {
      r += 1;
    }
    if (tal(70)) {
      r += 1;
    }
    if (tal(71)) {
      r -= 1;
    }
    if (tal(79) && !era.get('talent:0:122')) {
      r -= 1;
    }
    if (tal(82) && era.get('talent:0:122')) {
      r -= 1;
    }
    if (tal(85)) {
      r += 2;
    }
    if (tal(86)) {
      r += 2;
    }
    if (era.get('talent:0:91')) {
      r += 1;
    }
    if (era.get('talent:0:92')) {
      r += 1;
    }
    if (era.get('talent:0:113')) {
      r += 1;
    }
    if (era.get('talent:0:126')) {
      r += 1;
    }
    if (r <= 0) {
      r = 1;
    }
    r += tflag(30);
    // 相性修正（relation 表无数据 → 0 → 跳过）
    const relation = era.get(`relation:${cid}:0`) || 0;
    if (relation !== 0) {
      r = idiv(r * relation, 100);
    }
    chara(cid).chara.好感度 += r;
    // 好感测定仪（ITEM:37）持有时的显示
    if (era.get('item:37')) {
      era.print(`好感度上升:${idiv(r, 10)}.${r % 10}％`);
      era.print(`好感度合计:${idiv(era.get(`cflag:${cid}:2`) || 0, 10)}％`);
    }
  }
  game.train.主人经验 = 0;
}

// —— @MARK_GOT_CHECK（SUB1:941-1080）：刻印取得 ——

function mark_got_check() {
  // 反抗刻印（CFLAG:1 != 0 或调教者非主人时不取得）
  if ((era.get(`cflag:${cid}:1`) || 0) === 0 && era_flag.player === 0) {
    const local = up(11) + up(12);
    const mark4 = era.get(`mark:${cid}:4`) || 0;
    if (local >= 500 && local < 1200 && mark4 <= 0 && tflag(150) === 0) {
      chara(cid).system.反抗刻印 = 1;
      chara(cid).system.反抗刻印履历 = 1;
      game.system.反抗刻印变动 = 1;
      era.print('获得反抗刻印LV1');
    } else if (
      local >= 1200 &&
      local < 3000 &&
      mark4 <= 1 &&
      tflag(150) === 0
    ) {
      chara(cid).system.反抗刻印 = 2;
      chara(cid).system.反抗刻印履历 = 2;
      game.system.反抗刻印变动 = 2;
      era.print('获得反抗刻印LV2');
      if (abl(10) === 1 && !tal(22)) {
        era.print('顺从下降到LV0');
        chara(cid).system.顺从 = 0;
      } else if (abl(10) === 2 && !tal(22)) {
        era.print('顺从下降到LV1');
        chara(cid).system.顺从 = 1;
      }
    } else if (local >= 3000 && mark4 <= 2 && tflag(150) === 0) {
      chara(cid).system.反抗刻印 = 3;
      chara(cid).system.反抗刻印履历 = 3;
      game.system.反抗刻印变动 = 3;
      era.print('获得反抗刻印LV3');
      if (abl(10) > 0 && abl(10) <= 2 && !tal(22)) {
        era.print('顺从下降到LV0');
        chara(cid).system.顺从 = 0;
      } else if (abl(10) === 3 && !tal(22)) {
        era.print('顺从下降到LV1');
        chara(cid).system.顺从 = 2;
      }
    }
  }
  game.system.反抗刻印回避 = 0;

  // 苦痛刻印（UP:9 阈值）
  const mark0 = era.get(`mark:${cid}:0`) || 0;
  if (up(9) >= 500 && up(9) < 1500 && mark0 <= 0) {
    chara(cid).system.苦痛刻印 = 1;
    game.system.苦痛刻印变动 = 1;
    era.print('获得苦痛刻印LV1');
  } else if (up(9) >= 1500 && up(9) < 3000 && mark0 <= 1) {
    chara(cid).system.苦痛刻印 = 2;
    game.system.苦痛刻印变动 = 2;
    era.print('获得苦痛刻印LV2');
    if (abl(10) === 0 && !tal(12) && !tal(22)) {
      era.print('然后，顺从提升到LV1');
      chara(cid).system.顺从 = 1;
      jujun_up_check();
    }
  } else if (up(9) >= 3000 && mark0 <= 2) {
    chara(cid).system.苦痛刻印 = 3;
    game.system.苦痛刻印变动 = 3;
    era.print('获得苦痛刻印LV3');
    if (abl(10) === 0 && !tal(12) && !tal(22)) {
      era.print('然后，顺从提升到LV1');
      chara(cid).system.顺从 = 1;
      jujun_up_check();
    }
    if (ptal(83)) {
      era.print('施虐快乐经验＋1');
      chara(cid).dungeon.施虐快乐经验 += 1;
    }
  }

  // 快乐刻印（UP:0+1+2+14 阈值）
  const pleasure = up(0) + up(1) + up(2) + up(14);
  const mark1 = era.get(`mark:${cid}:1`) || 0;
  if (pleasure >= 500 && pleasure < 1500 && mark1 <= 0) {
    chara(cid).system.快乐刻印 = 1;
    game.system.快乐刻印变动 = 1;
    era.print('获得快乐刻印LV1');
  } else if (pleasure >= 1500 && pleasure < 3000 && mark1 <= 1) {
    chara(cid).system.快乐刻印 = 2;
    game.system.快乐刻印变动 = 2;
    era.print('获得快乐刻印LV2');
  } else if (pleasure >= 3000 && mark1 <= 2) {
    chara(cid).system.快乐刻印 = 3;
    game.system.快乐刻印变动 = 3;
    era.print('获得快乐刻印LV3');
    if (abl(10) === 0 && !tal(20) && !tal(22)) {
      era.print('顺从提升到LV1');
      chara(cid).system.顺从 = 1;
      jujun_up_check();
    }
  }

  // 屈服刻印（TFLAG:200 快照）
  const tflag200 = tflag(200);
  const mark2 = era.get(`mark:${cid}:2`) || 0;
  if (tflag200 === 1 && mark2 <= 0) {
    chara(cid).system.屈服刻印 = 1;
    game.system.屈服刻印变动 = 1;
    era.print('获得屈服刻印LV1');
  } else if (tflag200 === 2 && mark2 <= 1) {
    chara(cid).system.屈服刻印 = 2;
    game.system.屈服刻印变动 = 2;
    era.print('获得屈服刻印LV2');
    if (abl(10) === 0 && !tal(22)) {
      era.print('然后，顺从提升到LV1');
      chara(cid).system.顺从 = 1;
      jujun_up_check();
    }
  } else if (tflag200 === 3 && mark2 <= 2) {
    chara(cid).system.屈服刻印 = 3;
    game.system.屈服刻印变动 = 3;
    era.print('获得屈服刻印LV3');
    if (abl(10) <= 1 && !tal(22)) {
      era.print('然后，顺从提升到LV2');
      chara(cid).system.顺从 = 2;
      jujun_up_check();
    }
  }
}

// —— @PAIN_DAMAGE_CHECK_UP（SUB1:1620-1656）：苦痛的体力气力追加损耗 ——

function pain_damage_check_up() {
  let dmg = idiv(up(9), 16);
  const M_LADDER = [1.0, 0.95, 0.9, 0.8, 0.65, 0.5];
  dmg = times(dmg, abl(21) >= 6 ? 0.5 : M_LADDER[abl(21)]);
  if (tal(40)) {
    dmg = times(dmg, 1.2);
  }
  if (tal(41)) {
    dmg = times(dmg, 0.8);
  }
  add_lose(0, dmg);
  add_lose(1, dmg);
}

// —— 显示（@SHOW_SOURCE / @PALAM_UP_CHECK / 条 / @PALAM_MESSAGE） ——

// @FIGURE_INDENT_2（:2513-2520）：N 逐档补空格（每小一档一个空格）
function figure_indent_2(n) {
  let s = '';
  if (n < 100000) {
    s += ' ';
  }
  if (n < 10000) {
    s += ' ';
  }
  if (n < 1000) {
    s += ' ';
  }
  if (n < 100) {
    s += ' ';
  }
  if (n < 10) {
    s += ' ';
  }
  return s;
}

// @SHOW_SOURCE（:2137-2175）：源一览行（各段 PRINTFORM 拼行 + 行尾全角空格）
function show_source() {
  const parts = [];
  if (src(0) > 0) {
    parts.push(`${clitoris_name()}(${src(0)})`);
  }
  if (src(1) > 0) {
    parts.push(`私处(${src(1)})`);
  }
  if (src(2) > 0) {
    parts.push(`肛门(${src(2)})`);
  }
  if (src(17) > 0) {
    parts.push(`乳房(${src(17)})`);
  }
  if (src(18) > 0) {
    parts.push(`${era.get(`cstr:${cid}:7`) ?? ''}(${src(18)})`);
  }
  if (src(3) > 0) {
    parts.push(`情爱(${src(3)})`);
  }
  if (src(4) > 0) {
    parts.push(`性行动(${src(4)})`);
  }
  if (src(5) > 0) {
    parts.push(`达成感(${src(5)})`);
  }
  if (src(6) > 0) {
    parts.push(`疼痛(${src(6)})`);
  }
  if (src(7) > 0) {
    parts.push(`中毒充足(${src(7)})`);
  }
  if (src(8) > 0) {
    parts.push(`不洁(${src(8)})`);
  }
  if (src(10) > 0) {
    parts.push(`液体追加(${src(10)})`);
  }
  if (src(11) > 0) {
    parts.push(`欲情追加(${src(11)})`);
  }
  if (src(16) > 0) {
    parts.push(`恭顺追加(${src(16)})`);
  }
  if (src(12) > 0) {
    parts.push(`露出(${src(12)})`);
  }
  if (src(13) > 0) {
    parts.push(`屈从(${src(13)})`);
  }
  if (src(14) > 0) {
    parts.push(`逸脱(${src(14)})`);
  }
  if (src(15) > 0) {
    parts.push(`反感追加(${src(15)})`);
  }
  era.print(parts.join('') + '　'); // :2175 PRINTL（行尾以全角空格收行）
}

// @PALAM_MESSAGE（:2278-2394）：参数状态短语（返回串，拼在行尾——原作
// CALL PALAM_MESSAGE 后紧跟 PRINTL，同一行）
function palam_message(id) {
  const p = palam(id);
  switch (id) {
    case 3:
      if (p < PALAMLV[2]) {
        return '（干如沙漠）';
      } else if (p < PALAMLV[4]) {
        return '（晨露般稍湿）';
      }
      return '（洪水泛滥）';
    case 4:
      if (p < PALAMLV[1]) {
        return '（没有好感）';
      } else if (p < PALAMLV[4]) {
        return '（抱有好感）';
      }
      return '（寄予信赖）';
    case 5:
      if (p < PALAMLV[1]) {
        return '（没欲望）';
      } else if (p < PALAMLV[4]) {
        return '（正在发情）';
      }
      return '（成为快乐的俘虏）';
    case 6:
      if (p < PALAMLV[2]) {
        return '（还未屈服）';
      } else if (p < PALAMLV[4]) {
        return '（稍显弱势）';
      }
      return '（顶礼膜拜）';
    case 7:
      if (p < PALAMLV[1]) {
        return '（不是很懂）';
      } else if (p < PALAMLV[4]) {
        return '（开心地学）';
      }
      return '（充分掌握）';
    case 8:
      if (p < PALAMLV[1]) {
        return '（没有感到羞耻）';
      } else if (p < PALAMLV[3]) {
        return '（感到害羞）';
      } else if (p < PALAMLV[4]) {
        return '（强烈的羞耻）';
      }
      return '（羞愧欲死）';
    case 9:
      if (p < PALAMLV[1]) {
        return '（没有感到疼痛）';
      } else if (p < PALAMLV[3]) {
        return '（有点痛楚）';
      } else if (p < PALAMLV[4]) {
        return '（疼得不得了）';
      }
      return '（几乎痛得晕过去）';
    case 10:
      if (p < PALAMLV[1]) {
        return '（相当坦然）';
      } else if (p < PALAMLV[3]) {
        return '（稍稍害怕）';
      } else if (p < PALAMLV[4]) {
        return '（怕得不行）';
      }
      return '（抓狂的恐怖）';
    case 11:
      if (p < PALAMLV[1]) {
        return '（并不讨厌）';
      } else if (p < PALAMLV[2]) {
        return '（有点反感）';
      } else if (p < PALAMLV[3]) {
        return '（讨厌）';
      } else if (p < PALAMLV[4]) {
        return '（强烈的憎恨）';
      }
      return '（抱有杀意）';
    case 12:
      if (p < PALAMLV[1]) {
        return '（没有感到不快）';
      } else if (p < PALAMLV[2]) {
        return '（心情不好）';
      } else if (p < PALAMLV[4]) {
        return '（相当不快）';
      }
      return '（抓狂的不快）';
    case 13:
      if (p < PALAMLV[1]) {
        return '（没有郁闷）';
      } else if (p < PALAMLV[2]) {
        return '（稍欠精神）';
      } else if (p < PALAMLV[4]) {
        return '（消沉）';
      }
      return '（完全绝望）';
    default:
      return '';
  }
}

// @PALAM_UP_CHECK（:2182-2242）：参数变动的展示与结算（含 DOWN）。
// PALAM 的当场更新（:2230-2231）在行内做；delta 的清零在**整轮之后**——
// 原作的 UP 数组活到函数结束（三处 SIF 分隔线在循环内还要读它）
function palam_up_check() {
  // FOR UPCOUNT,0,16 的 UPID 序（0,1,2,14,3,4,...,13,15）
  const ORDER = [0, 1, 2, 14, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15];
  const touched = [];
  for (const upid of ORDER) {
    if (up(upid) > 0 || down(upid) > 0) {
      // 名列（UPID 15 是 CSTR:7 的癖好名；UPID 0 且男人叫陰莖——原作用字）
      const name =
        upid === 15
          ? `${era.get(`cstr:${cid}:7`) ?? ''}`
          : upid === 0 && tal(122)
            ? '阴茎'
            : `${era.get(`palamname:${upid}`) ?? ''}`;
      const old = palam(upid);
      const u = up(upid);
      const d = down(upid);
      const post = old + u - d;
      // :2230-2231 PALAM += UP / PALAM -= DOWN —— ere 侧当场结算
      era.set(`palam:${cid}:${upid}`, post);
      era.print(
        name +
          figure_indent_2(old) +
          old +
          (u > 0 ? `+${figure_indent_2(u)}${u}` : ' '.repeat(7)) +
          (d > 0 ? `-${figure_indent_2(d)}${d}` : ' '.repeat(7)) +
          `=${figure_indent_2(post)}${post}` +
          palam_message(upid),
      );
      touched.push(upid);
    }
    // 三处分隔线（SIF UPID == 14/3/10——读的仍是本轮 UP，原作语义）
    if (upid === 14 && (up(0) > 0 || up(1) > 0 || up(2) > 0 || up(14) > 0)) {
      era.print('-------------------------------');
    }
    if (upid === 3 && up(3) > 0) {
      era.print('-------------------------------');
    }
    if (upid === 10) {
      era.print('-------------------------------');
    }
  }
  // 循环外统一清零（引擎 nextTurnInTrain 的 delta→palam 由此成为无操作，
  // 不与行内结算双重累加——文件头的职责划分说明）
  for (const upid of touched) {
    era.set(`delta:${cid}:${upid}`, 0);
  }
}

// @LOSELIFE_BAR / @LOSEVITAL_BAR（:2508-2572）：损耗条（32 格）。返回串，
// 与其后的「 -N 」由调用方拼成一行（原作 PRINT/PRINTFORM 同行累积）
function loss_bar(label, base, maxbase, loss, vital_variant) {
  if (maxbase <= 0) {
    return '';
  }
  let a = vital_variant
    ? idiv(base * 32 + 16, maxbase)
    : idiv(base * 32, maxbase);
  if (base < 0) {
    a = 0;
  }
  let b = vital_variant
    ? idiv(loss * 32 + 16, maxbase) + 1
    : idiv(loss * 32, maxbase) + 1;
  if (base < 0) {
    b = 0;
  }
  return ` ${label}[${'='.repeat(Math.max(a, 0))}${'-'.repeat(Math.max(b, 0))}${'.'.repeat(
    Math.max(32 - a - b, 0),
  )}]`;
}

// —— @SOURCE_CHECK 主体（:7-576，按原作顺序编排） ——

on('SOURCE_CHECK', async () => {
  cid = era_flag.target;
  player = era_flag.player;
  down_map.clear();

  // :11-12 指令口上（SIF FLAG:7 > 0 / CALL KOJO_MESSAGE_COM——真身在
  // kojo/kojo-system.js，#46：总开关 + 存在判定 + 性格分发，K3/K5 已实现）
  if ((era.get('flag:7') || 0) > 0) {
    await kojo_message_com();
  }

  // :19-51 避孕套判定（TEQUIP:35/36——避孕套使用判定未移植，随 J6
  // COMF_CONDOM；装备持续效果组已随 #223 拆出，见下方链循环）
  // :53-55 助手避孕套（TEQUIP:36，同上）
  stub_line('EQUIP_COM', '避孕套判定', '随共用子程序票');

  // :56 CUSTOMDRAWLINE ‥ —— ere 的 drawLine 是实线（排版近似，记名差异
  // 见 issue #45；TRAIN_MESSAGE_B/A 的同类分隔线同此）
  era.drawLine();

  // :58-123 装备持续效果组（SIF TEQUIP:n / CALL EQUIP_COM<n> 链，#223
  // 接通）：按原作链序遍历装备位，真身随各自指令族票注册进
  // equip_com_family（com-family.js 的 EQUIP_COM_CHAIN——J13 交 43-49，
  // 道具/特殊/重度/触手族位随各自票）。缺失位且装备着 → 占位行
  //（当前各写点未落地，装备位点不亮，实际不触发；族票落地即自愈）
  for (const [bit, com] of EQUIP_COM_CHAIN) {
    if (!era.get(`tequip:${cid}:${bit}`)) {
      continue;
    }
    if (equip_com_family.has(com)) {
      await equip_com_family.call(com);
    } else {
      stub_line(
        `EQUIP_COM${com}`,
        `装备位 ${bit} 的持续效果`,
        '随对应指令族票',
      );
    }
  }

  // :128-130 调教者侧检查三连
  source_sex_check();
  player_skill_check();
  master_skill_check();

  // :132-144 服装（CFLAG:42 == 11 && CFLAG:40 & 64 的茲古着ぐるみ减益）：
  // 着衣位无写入路径，1:1 保留判据
  if (
    (era.get(`cflag:${cid}:42`) || 0) === 11 &&
    (era.get(`cflag:${cid}:40`) || 0) & 64
  ) {
    set_src(6, times(src(6), 0.1));
    if (!era.get(`tequip:${cid}:90`)) {
      set_src(0, times(src(0), 0.1));
      set_src(1, times(src(1), 0.1));
      set_src(2, times(src(2), 0.1));
      set_src(17, times(src(17), 0.1));
    }
  }

  // :148 / :152 / :157-158 近亲与处女丧失（守卫 1:1，正文登记）
  incest_sex_check();
  lost_virgin_check();
  // :160-161 初吻（TFLAG:13 由接吻指令置位）
  if (tflag(13)) {
    era.print('初吻');
  }

  // :162-186 快乐源的换算（C/V/A/B/FREE）
  source_check_up_c();
  source_check_up_v();
  source_check_up_a();
  source_check_up_b();
  source_check_up_free();

  // :188-206 同一指令连续 / 气力 0 的快乐减半
  if (era_flag.selectcom === era_flag.prevcom && tflag(201) !== 1) {
    set_up(0, idiv(up(0), 2));
    set_up(1, idiv(up(1), 2));
    set_up(2, idiv(up(2), 2));
    set_up(14, idiv(up(14), 2));
  }
  if ((era.get(`base:${cid}:1`) || 0) <= 0 && tflag(201) !== 1) {
    set_up(0, idiv(up(0), 2));
    set_up(1, idiv(up(1), 2));
    set_up(2, idiv(up(2), 2));
    set_up(14, idiv(up(14), 2));
  }

  // :210-218 相性（快乐系，RELATION:PLAYER）
  const relation_p = era.get(`relation:${cid}:${player}`) || 0;
  if (relation_p !== 0 && tflag(201) !== 1) {
    set_up(0, idiv(up(0) * relation_p, 100));
    set_up(1, idiv(up(1) * relation_p, 100));
    set_up(2, idiv(up(2) * relation_p, 100));
    set_up(14, idiv(up(14) * relation_p, 100));
  }

  // :225 / :230 素质乘算（快乐系）与爱液处理
  up_talent_cva_check();
  love_moist_check_up();

  // :235 绝顶
  await ex_check_up();

  // :238-252 调教对象的射精/喷乳/蠕虫出産（素质门槛不可达，登记）
  stub_line('TARGET_EJAC_CHECK', '调教对象射精检查', '随扶她/男人票');
  stub_line('TARGET_MILK_CHECK', '喷乳检查', '随母乳票');
  stub_line('TARGET_WORMBABY_CHECK', '蠕虫出产检查', '随蠕虫票');
  // :254-255 主人调教的好感度累积
  master_flag_check();

  // :260-315 情爱以下全部源换算
  source_check_up_love();
  source_check_up_impulsive();
  source_check_up_achieve();
  source_check_up_pain();
  source_check_up_poison();
  source_check_up_dirty();
  source_check_up_moist();
  source_check_up_desire();
  source_check_up_flasher();
  source_check_up_submit();
  source_check_up_deviate();
  source_check_up_like();

  // :326 素质乘算（全参数）
  up_talent_check();

  // :331-345 相性（感情系：恭顺/欲情/习得/反感/不快/抑郁）
  if (relation_p !== 0) {
    set_up(4, idiv(up(4) * relation_p, 100));
    set_up(5, idiv(up(5) * relation_p, 100));
    set_up(7, idiv(up(7) * relation_p, 100));
    set_up(11, idiv(up(11) * 100, relation_p));
    set_up(12, idiv(up(12) * 100, relation_p));
    set_up(13, idiv(up(13) * 100, relation_p));
  }

  // :352-357 同一指令连续（感情系减半）
  if (era_flag.selectcom === era_flag.prevcom) {
    for (const k of [4, 5, 6, 7, 8]) {
      set_up(k, idiv(up(k), 2));
    }
  }

  // :363 TFLAG:59 = PREVCOM（读的是**旧值**——PREVCOM 的更新在其后 :545，
  // ere 侧由回合循环承载，见 train-loop.js 步骤 13）
  era.set('tflag:59', era_flag.prevcom);

  // :377-387 气力 0 的感情减半与损耗加倍
  if ((era.get(`base:${cid}:1`) || 0) <= 0) {
    for (const k of [3, 4, 5, 7, 9, 13]) {
      set_up(k, idiv(up(k), 2));
    }
    set_lose(0, lose(0) * 2 + 80);
  }

  // :393 灵魂错位（登记）
  stub_line('SOUL_DISLOCATION_DEBUFF', '灵魂错位减益', '随魂缚票');
  // :398 失神检查（J6 真身，system/train/passout.js——TFLAG:899 的写入
  // 路径，#213 七道守卫第四道的置位者）
  await passout_check();
  // :400-401 野外 PLAY 中失神 → 解除并带回
  if (
    (era.get(`tequip:${cid}:54`) || 0) > 0 &&
    (era.get('tflag:899') || 0) > 0
  ) {
    await passout_outdoor();
  }

  // :406 苦痛的追加损耗
  pain_damage_check_up();

  // :411-412 体力气力扣减（deltabase → base 当场结算并清零，钳 0..maxbase
  // ——引擎 nextTurnInTrain 的同款语义，见文件头）。损耗值先快照——:552 的
  // 损耗条在扣减之后还要读 LOSEBASE，原作的 LOSEBASE 独立存活于扣减后
  const lose0 = Math.max(lose(0), 0);
  const lose1 = Math.max(lose(1), 0);
  for (const k of [0, 1]) {
    const loss = lose(k);
    if (loss !== 0) {
      const base = era.get(`base:${cid}:${k}`) || 0;
      const max = era.get(`maxbase:${cid}:${k}`) || 0;
      let next = base - loss;
      if (max > 0) {
        next = Math.max(Math.min(next, max), 0);
      }
      era.set(`base:${cid}:${k}`, next);
      era.set(`deltabase:${cid}:${k}`, 0);
    }
  }

  // :415-424 挿しっぱ无判定（TFLAG:60：体位组指令才置 1，爱抚恒 0——判据
  // 1:1 保留）
  era.set('tflag:60', 0);
  if (
    [
      20, 21, 22, 23, 26, 27, 28, 29, 34, 36, 56, 120, 121, 128, 129, 130, 131,
      132, 133, 134,
    ].includes(era_flag.selectcom || 0)
  ) {
    if (tflag(2) === 0 || palam(5) >= PALAMLV[4]) {
      era.set('tflag:60', 1);
    }
  }

  // :426-473 对象侧避孕套：目标射精先消耗避孕套，并清掉 TFLAG:10；后续
  // 内射链看的是清零后的值（原作顺序不可调整）。TEQUIP:37 属 train，
  // source-check 是 system 域，故跨域写走生成门面。
  if (chara(cid).train.对象避孕套 && tflag(10)) {
    era.print(`射在避孕套里（${era.get(`callname:${cid}:-2`) ?? ''}）`);
    chara(cid).train.对象避孕套 = 0;
    game.system.对象射精 = 0;
  }

  // 该段后续为膣内射精计数。首段是一个严格的 if / else-if 优先级链；其后
  // 的 COM24/62/65 三条是同一顶层链的后续独立臂。不能按「对称」重排。
  if (tflag(19)) {
    if (tflag(6) && tflag(41) === 1) {
      chara(cid).system.助手膣内射精 += tflag(38);
    } else if (tflag(2) && tflag(40) === 1) {
      chara(cid).system.主人膣内射精 += tflag(38);
    } else if (era.get(`tequip:${cid}:89`) && tflag(16)) {
      chara(cid).dungeon.犬膣内射精 += tflag(16);
    } else if (era_flag.assiplay && tflag(2)) {
      chara(cid).system.助手膣内射精 += tflag(38);
    } else if (tflag(15) && era.get(`tequip:${cid}:55`)) {
      chara(cid).dungeon.怪物膣内射精 += tflag(15);
    } else if (tflag(2)) {
      chara(cid).system.主人膣内射精 += tflag(38);
    } else if (
      era.get(`tequip:${cid}:90`) &&
      era.get(`tequip:${cid}:11`) &&
      tflag(15)
    ) {
      chara(cid).dungeon.怪物膣内射精 += tflag(15);
    }
  } else if (era_flag.selectcom === 24 && tflag(10) && era_flag.assiplay) {
    chara(era_flag.assi).system.对象膣内射精 += tflag(10);
  } else if (era_flag.selectcom === 24 && tflag(10)) {
    chara(MASTER).system.对象膣内射精 += tflag(10);
  } else if (era_flag.selectcom === 62 && tflag(7)) {
    chara(era_flag.assi).system.主人膣内射精 += tflag(7);
  } else if (era_flag.selectcom === 65 && era_flag.assi >= 1 && tflag(10)) {
    chara(era_flag.assi).system.对象膣内射精 += tflag(10);
  }

  // :476 调教文本的后半
  await train_message_a();

  // :482-497 失神文本（J6 真身）。两臂（TFLAG:899 < 1 与 ≥ 1）都调
  // PASSOUT_TEXT——未失神回合跑快照 else 段（装备变化的 -1 标记），失神
  // 中另按相位调参数暂存（== 2）/ 回流（== 3，含刻印复查与口上）
  await passout_text();
  if (
    (era.get('tflag:896') || 0) === 2 ||
    (era.get('tflag:897') || 0) === 2 ||
    (era.get('tflag:898') || 0) === 2
  ) {
    passout_palam_check();
  }
  if (
    (era.get('tflag:896') || 0) === 3 ||
    (era.get('tflag:897') || 0) === 3 ||
    (era.get('tflag:898') || 0) === 3
  ) {
    passout_palam_up();
    mark_got_check();
    await kojo_message_markcng();
  }
  // :499 绝顶漏尿（TEQUIP:22/TALENT:57 门槛，登记）
  stub_line('PISSING_ECST_CHECK', '绝顶漏尿', '随漏尿票');

  // :504-513 参数变动口上 / 刻印取得口上（FLAG:7，#46/#232）
  if ((era.get('flag:7') || 0) > 0) {
    await kojo_message_palamcng();
  }

  // :510 刻印取得
  mark_got_check();
  if ((era.get('flag:7') || 0) > 0) {
    await kojo_message_markcng();
  }

  // :518 / :523 经验检查与容易陷落（生效门槛不可达，登记）
  stub_line('EXP_GOT_CHECK', '侍奉/被虐快乐经验检查', '随经验票');
  stub_line('SOKUOCHI_CHECK', '容易陷落检查', '随陷落票');

  // :525 PRINTW ‥×39（读键；点线逐字）
  era.print('‥'.repeat(39));
  await era.waitAnyKey();

  // :530 源一览
  show_source();

  // :536-543 相性与连续执行的提示行
  if (relation_p !== 0) {
    era.print(`＜相性${idiv(relation_p, 100)}.${relation_p % 100}倍＞`);
  }
  if (era_flag.selectcom === era_flag.prevcom) {
    era.print('＜连续执行同一指令＞');
  }

  // :545 PREVCOM = SELECTCOM —— 由回合循环承载（train-loop 步骤 13），
  // 此处不重复写；:547-549 TFLAG:50（上次调教者是主人还是助手）
  game.system.上次调教者是助手 = era_flag.assiplay ? 1 : 0;

  // :552-567 体力气力损耗条（含濒死/死亡星标；死亡档显示 BAR 0）——条与
  // 「 -N 」拼为一行（原作 PRINT/PRINTFORM 同行累积 + PRINTL 收行）。
  // 损耗值用 :411 扣减前的快照（见上）
  const base0 = era.get(`base:${cid}:0`) || 0;
  const base1 = era.get(`base:${cid}:1`) || 0;
  const max0 = era.get(`maxbase:${cid}:0`) || 0;
  const max1 = era.get(`maxbase:${cid}:1`) || 0;
  if (base0 > 0 && lose0 > 0) {
    era.print(
      `${loss_bar('体力', base0, max0, lose0, false)} -${lose0} ${base0 < 500 ? '★濒死★' : ''}`,
    );
  } else if (base0 < 1) {
    era.print(` 体力[${'.'.repeat(32)}] -${lose0} ★死亡★`);
  }
  if (base1 > 0 && lose1 > 0) {
    era.print(`${loss_bar('气力', base1, max1, lose1, true)} -${lose1} `);
  } else if (base1 < 1) {
    era.print(' 气力[................................] ★气力０★ ');
  }

  // :576 参数变动的展示与结算
  palam_up_check();
});

module.exports = { STUBBED_CALLS };
