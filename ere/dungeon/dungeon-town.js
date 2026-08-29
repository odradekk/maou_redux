/**
 * @file 城镇事件（issue #178，阶段 3 H9）：DUNGEON_TOWN.ERB 全量 15 函数。
 *
 * 源: target/ERB/迷宮/DUNGEON_TOWN.ERB  @DUNGEON_TOWN（:5-75，主流程）、
 *       @TOWN_PT_REST（:80-94，宿屋——再起点消耗与全恢复）、
 *       @TOWN_PT_FUNDING（:101-135，资金调达）、@FI_PT_FUNDING（:140-151，
 *       援助金合算）、@FI_FUNDING（:156-189，个人援助金）、@TOWN_SELL
 *       （:193-208，战利品换金）、@TOWN_HOSHOUNIN（:212-227，担保人借债）、
 *       @TOWN_HENSAI（:231-300，还债）、@TOWN_LOAN（:304-324，借款）、
 *       @TOWN_PT_SHOPPING（:331-343，采购段）、@TOWN_SHOPPING（:346-357，
 *       个人采购）、@TOWN_PT_PLANNING（:368-567，冒险计划）、@TOWN_PT_PARTY
 *       （:575-679，宴会）、@TOWN_PT_DAYEVENT（:686-700，日常段）、
 *       @RAND_AUTOTRAIN（:705-710，自动调教随机表——β 空壳，域内存根）
 *
 * 勇者资产闭环（简报第 5 条）：CFLAG:580 所持金（dungeon 门面「所持金」）、
 * CFLAG:582 借款（patch 门面「借款」，#176 建）、CFLAG:581 战利品换金
 * 槽（dungeon 属主域内裸寻址）。担保人债务与借款利息同走 582。
 *
 * 移植说明（有意偏离，均注明依据）：
 *   - **角色变量省略角色号 = TARGET**（Emuera 语义，旁证
 *     CHARA_INFO_SHOW ver1.1.2.ERB:24-26/1055-1058——TARGET 换手后
 *     CFLAG:16 与 CFLAG:TARGET:9 同指）。本文件三处依赖它，且原作不设
 *     TARGET 就读（残留值）：FI_FUNDING 的素质/善恶/等级补正、TOWN_HENSAI
 *     的还款比例分档（SELECTCASE CFLAG:151）、TOWN_PT_PARTY 的预算收集
 *     （CFLAG:580）——全部读 era_flag.target 的当前值（flag:10005，可
 *     预置可断言）。1:1 保留原作的怪异：援助金按 TARGET 的出身算而不是
 *     每个成员自己的、预算收集对每人都读同一个人的钱袋；
 *   - TOWN_PT_DAYEVENT / TOWN_PT_PARTY 演出段显式 `TARGET = PM:LCOUNT`
 *     （:619/:696）——镜像为 era_flag.target 写（#5 决议第六条）；
 *   - %SAVESTR:PM% = SAVESTR:(PM:0)（数组名省略下标即取第 0 元）——队长名，
 *     name_of(pm[0])；名字承载一律 callname（#5 决议）；
 *   - Emuera 整数除法向零截断：`CFLAG:582 / 10`（负数）、`LOCAL /= 100`
 *     均 Math.trunc（-1234/10 = -123，不是 floor 的 -124）；
 *   - LIMIT(X, min, max) = MIN(MAX(X, min), max)——TOWN_HENSAI 的
 *     LIMIT(LOCAL, 100, 580/2) 在所持金 < 200 时 min > max，结果取 max
 *     （580/2，可 < 100）：先 MAX 后 MIN 的求值序 1:1；
 *   - ere 无全局 RAND 序列（#117），掷点经注入 rand（缺省 Math.random）；
 *   - PRINT/PRINTFORM 不换行与 PRINTL/PRINTFORML 换行的行拼接归并（引擎
 *     print 每调用一行，dungeon.js 文件头先例）——本文件 SETCOLORBYNAME
 *     的彩色数值段按「行文本 + 数值 + 行尾」拼为一次 print，配色不做；
 *   - 原作注释（;）照抄为 JS 注释，行号锚点保留。
 */

'use strict';

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { chara } = require('#/facade/chara');
const { stub_line, stub_line_wait } = require('#/utils/stub-line');
// H10（#179）真身：@LVUP（DUNGEON_TOWN.ERB:34 的 CALL LVUP, PM:LOCAL）
const { lvup } = require('#/dungeon/dungeon-lvup');
// H15（#184）真身：@HEROINE_BITCH（:134 城镇侧卖春入口；log_try_bitch 的
// 'TOWN' 档随 H16 #185 齐备）。经模块对象引用，测试可替换导出。
const bitch_mod = require('#/kojo/kojo-dungeon-bitch');
// 本票（#178）真身：@SET_QUEST（:56 受注，必须在 PLANNING 之后——读
// CFLAG:520 目标阶层）
const quest_mod = require('#/dungeon/dungeon-quest');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。三个域内新存根（DUNGEON_TOWN_LOVER /
 * SELL_EX_ITEM / COM63_AUTO）与 RAND_AUTOTRAIN 在文件下方定义；KARMA /
 * ADD_EX_ITEM / BEFORE_AUTOTRAIN / COM0_AUTO / SOURCE_CHECK_AUTO 复用既有
 * 域内存根（#176「复用 + 调用点列补新处」先例）——对 dungeon.js /
 * dungeon-battle.js / dungeon-trap.js 的引用一律函数内延迟 require 防环
 * （dungeon.js → 本文件是顶层引用，反向只许延迟）。
 */
const STUBBED_CALLS = [
  'DUNGEON_TOWN_LOVER',
  'SELL_EX_ITEM',
  'COM63_AUTO',
  'RAND_AUTOTRAIN',
  'KARMA',
  'ADD_EX_ITEM',
  'BEFORE_AUTOTRAIN',
  'COM0_AUTO',
  'SOURCE_CHECK_AUTO',
];

/** 名字承载（#5 决议；savestr 通道不存在，dungeon.js 先例） */
function name_of(cid) {
  return era.get(`callname:${cid}:-1`) ?? '';
}

/** 原作 RAND:N（0..N-1）的缺省实现 */
function default_rand(n) {
  return Math.floor(Math.random() * n);
}

/** 队伍编成（PM:0 队长 / PM:1 仲間A CFLAG:531 / PM:2 仲間B CFLAG:532） */
function party_of(arg) {
  return [
    arg,
    era.get(`cflag:${arg}:531`) || 0,
    era.get(`cflag:${arg}:532`) || 0,
  ];
}

// —— 域内存根层（本票新增，登记 docs/stub-registry.md）——

/**
 * @DUNGEON_TOWN_LOVER 存根（其他/LOVERS.ERB:144；恋人系统票）：城镇日常
 * 的恋人事件。原作无 RESULT 消费。
 * @param {number} cid 角色（原作 TARGET——DAYEVENT 段已换手）
 * @returns {Promise<void>}
 */
async function dungeon_town_lover(cid) {
  await stub_line_wait(
    'DUNGEON_TOWN_LOVER',
    `恋人事件（${name_of(cid)}）`,
    '随恋人系统票',
  );
}

/**
 * @SELL_EX_ITEM 存根（其他/USE_EX_ITEM.ERB:74；EX 道具票，阶段 5——与
 * ADD_EX_ITEM / USE_EX_ITEM 同族）：战利品（EX 道具）换钱。
 * @param {number} cid 角色
 * @returns {Promise<void>} 原作无 RESULT 消费（换金直接写 CFLAG:580/581）
 */
async function sell_ex_item(cid) {
  await stub_line_wait(
    'SELL_EX_ITEM',
    `道具出售（${name_of(cid)}）`,
    '随 EX 道具票（阶段 5）',
  );
}

/**
 * @COM63_AUTO 存根（調教相關/COMF63_貝あわせ.ERB:157；自动调教票，阶段
 * 4——与 RAND_AUTOTRAIN 同批，ADR-0007）：宴会嫖妓的磨镜自动调教。
 * @returns {Promise<void>} 原作无 RESULT 消费
 */
async function com63_auto() {
  await stub_line_wait('COM63_AUTO', '磨镜自动调教', '随调教自动票（阶段 4）');
}

/**
 * @RAND_AUTOTRAIN 存根（迷宮/DUNGEON_TOWN.ERB:705；自动调教票，阶段 4，
 * ADR-0007）：自动调教的随机表。原作是 β 空壳——TURNS = RAND:5 之后
 * FOR 循环整体注释态（:709-710），无任何可移植行为；域内存根仅承载
 * 「函数已登记」与掷点占位（掷 RAND:5 保持 PRNG 序列对齐——原作死赋
 * 值照掷，#175 文件头同款）。
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {number} 原作无 RETURN（隐式 0）
 */
function rand_autotrain(rand = default_rand) {
  void rand(5); // :708 TURNS = RAND:5（死赋值，无读者——照掷）
  stub_line('RAND_AUTOTRAIN', '自动调教随机表（β）', '随调教自动票（阶段 4）');
  return 0;
}

/**
 * @DUNGEON_TOWN（:5-75）：勇者撤到迷宫外时的城镇事件主流程。
 *
 * 顺序（原作 :27-67）：再起点恢复 → 全员升级 → 资金调达 → 日常 → 采购
 * → 冒险计划 → 任务受注 → 分隔线 → 9/10 概率散会（RAND:10 > 0 即返），
 * 否则宴会。三处 `A = ARG:0` 的全局 A 换手在 ere 侧由 dungeon.js 的局部
 * 变量承载（调用点 a 已是队长，无副作用——注释留痕）。
 *
 * @param {number} arg0 队长（原作 ARG:0）
 * @param {(n: number) => number} [rand] RAND:N 随机源（缺省均匀随机）
 * @returns {Promise<number>} 原作 RETURN 0
 */
async function dungeon_town(arg0, rand = default_rand) {
  const rand_n = rand;
  const pm = party_of(arg0); // :16-18 PM:0 队长 / PM:1 / PM:2

  // :20-25 リーダー以外の帰還フラグが初期化されてなかったので全員分初期化
  for (let lcount = 0; lcount < 3; lcount += 1) {
    if (pm[lcount] <= 0) {
      continue;
    }
    chara(pm[lcount]).invasion.回城标志 = 0; // CFLAG:507 = 0
  }

  // :27-29 再起ポイントを消費して回復（队长位的 CFLAG:508 > 0 时）
  if (chara(pm[0]).dungeon.再起点 > 0) {
    await town_pt_rest(pm[0], pm[1], pm[2], rand_n);
  }

  // :31-35 レベルアップ（全员 CALL LVUP——#179 真身）
  for (let local = 0; local < 3; local += 1) {
    if (pm[local] > 0) {
      await lvup(pm[local], rand_n);
    }
  }

  // :37-40 資金調達フェイズ
  await town_pt_funding(pm[0], pm[1], pm[2], rand_n);
  // :41-44 日常フェイズ
  await town_pt_dayevent(pm[0], pm[1], pm[2]);
  // :45-48 アイテムの購入
  await town_pt_shopping(pm[0], pm[1], pm[2]);
  // :49-52 冒険の計画
  await town_pt_planning(pm[0], pm[1], pm[2], rand_n);
  // :53-56 クエスト受注（SET_QUEST 必须在 PLANNING 之后，读 CFLAG:520）
  await quest_mod.set_quest(pm[0], rand_n);

  era.print(
    '------------------------------------------------------------------------------------',
  ); // :58 PRINTFORML 分隔线

  // :60-63 IF RAND:10 > 0 → A = ARG:0; RETURN 0（9/10 直接散会）
  if (rand_n(10) > 0) {
    return 0; // A = ARG:0（换手无副作用，文件头）
  }

  // :64-67 宴会
  await town_pt_party(pm[0], pm[1], pm[2], rand_n);
  // :68-72 今後宴会以降の処理が実装される可能性があるのでいちおう中断判定
  // （RESULT == 0 = 宴会流局——原作读取 CALL 的 RESULT；ere 侧经返回值。
  //   流局时 A = ARG:0; RETURN 0，与走到尾等价，仅注释留痕）
  return 0; // :74-75 A = ARG:0; RETURN 0
}

/**
 * @TOWN_PT_REST（:80-94）：宿屋。消耗队长的再起点（CFLAG:508--），全队
 * HP/气力恢复到上限。
 * @param {number} pm0 队长 @param {number} pm1 仲間A @param {number} pm2 仲間B
 * @param {(n: number) => number} rand_n 随机源（未用，签名对齐）
 * @returns {Promise<void>} 原作无 RETURN
 */
async function town_pt_rest(pm0, pm1, pm2, rand_n) {
  void rand_n;
  const pm = [pm0, pm1, pm2];
  if ((era.get('flag:5') || 0) & 32) {
    era.print(
      `${name_of(pm[0])}的队伍在旅馆里进行了修整，恢复着冒险的疲惫……（HP、气力全恢复）`,
    ); // :85-86（%SAVESTR:PM% = 队长名）
  }
  chara(pm[0]).dungeon.再起点 -= 1; // :87 CFLAG:PM:508--（PM 省略下标 = PM:0）
  // :88-94 全回復。仲間も回復（BASE:0 体力 / BASE:1 气力 → MAXBASE）
  for (let lcount = 0; lcount < 3; lcount += 1) {
    if (pm[lcount] <= 0) {
      continue;
    }
    era.set(`base:${pm[lcount]}:0`, era.get(`maxbase:${pm[lcount]}:0`) || 0);
    era.set(`base:${pm[lcount]}:1`, era.get(`maxbase:${pm[lcount]}:1`) || 0);
  }
}

/**
 * @TOWN_PT_FUNDING（:101-135）：资金调达段。援助金（队伍合算）发给每个
 * 成员，随后各自：EX 道具出售 → 战利品换金 → 担保人借债 → 还债 →
 * （所持金 < 10000 时）借款 → 城镇侧卖春（HEROINE_BITCH）。
 * @param {number} pm0 队长 @param {number} pm1 仲間A @param {number} pm2 仲間B
 * @param {(n: number) => number} rand_n 随机源
 * @returns {Promise<void>} 原作无 RETURN
 */
async function town_pt_funding(pm0, pm1, pm2, rand_n) {
  const pm = [pm0, pm1, pm2];
  // :106-114 仕送り（援助金合算）
  const local = fi_pt_funding(pm[0], pm[1], pm[2]);
  if ((era.get('flag:5') || 0) & 32) {
    // PRINTFORM…PRINTV…PRINTFORML 三段拼一行（文件头：彩色数值段归并）
    era.print(
      `${name_of(pm[0])}的队伍接受了故乡的支持者的援助，每人获得了${local}点资金。`,
    );
  }

  // :116-135 各自資金繰りを行う（足りない場合は借金等をする）
  for (let lcount = 0; lcount < 3; lcount += 1) {
    if (pm[lcount] <= 0) {
      continue;
    }
    const cid = pm[lcount];
    chara(cid).dungeon.所持金 += local; // :121 CFLAG:580 += LOCAL
    await sell_ex_item(cid); // :123 CALL SELL_EX_ITEM（域内存根）
    town_sell(cid); // :125 CALL TOWN_SELL
    await town_hoshounin(cid); // :127 CALL TOWN_HOSHOUNIN
    await town_hensai(cid); // :129 CALL TOWN_HENSAI
    // :130-132 手持ちが少ないと借金する
    if (chara(cid).dungeon.所持金 < 10000) {
      await town_loan(cid, rand_n);
    }
    // :133-134 ダンジョン外売春（#184 真身；log_try_bitch 的 'TOWN' 档
    // 随 #185 已齐备）
    await bitch_mod.heroine_bitch(cid, rand_n);
  }
}

/**
 * @FI_PT_FUNDING（:140-151）：援助金计算（合算，#FUNCTION）。三人合计，
 * 下限 1（MAX(LOCAL, 1)——全空队伍也发 1）。
 * @param {number} pm0 队长 @param {number} pm1 仲間A @param {number} pm2 仲間B
 * @returns {number} 援助金
 */
function fi_pt_funding(pm0, pm1, pm2) {
  const pm = [pm0, pm1, pm2];
  let local = 0; // :146 VARSET LOCAL
  for (let lcount = 0; lcount < 3; lcount += 1) {
    local += fi_funding(pm[lcount]); // :148
  }
  return Math.max(local, 1); // :150 LOCAL = MAX(LOCAL, 1)
}

/**
 * @FI_FUNDING（:156-189）：援助金计算（个人，#FUNCTION）。
 *
 * **ARG 只用于空位检查**（ARG <= 0 返 0）；全部补正读的是省略角色号的
 * TALENT/CFLAG → TARGET 残留（文件头裁定）——原作如此：队伍每人的援助
 * 额实际都按 TARGET 一人的出身/善恶/等级计算（enter-enemy.js 的初期
 * 金钱七条修正与之同构、彼处读生成者本人）。
 * @param {number} arg 成员位（原作 ARG）
 * @returns {number} 援助金
 */
function fi_funding(arg) {
  if (arg <= 0) {
    return 0; // :160-161
  }
  let local = 0; // :162 VARSET LOCAL
  // 故郷や家族からの補助金（以下全读 TARGET，文件头）
  const t = era_flag.target;
  const tv = (n) => era.get(`talent:${t}:${n}`) || 0;

  // :165-168 素質補正——高人气ボーナス（原作 TALENT:高人气 名字寻址 →
  // id 126，yml/Talent.yml；ere 侧数字下标 + 注释，门面生成物同惯例）
  if (tv(126) !== 0) {
    local += 1000;
  }
  // :169-171 物乞い・貧民は援助が少ない（出身 TALENT:315 的值 7/9）
  if (tv(315) === 7 || tv(315) === 9) {
    local -= 500;
  }
  // :172-174 貴族・聖女・軍人は多い（8/12/19）
  if (tv(315) === 8 || tv(315) === 12 || tv(315) === 19) {
    local += 1500;
  }
  // :175-177 金のため・自暴自棄は援助が少ない（契机 TALENT:316 的 2/11）
  if (tv(316) === 2 || tv(316) === 11) {
    local -= 1000;
  }
  // :178-180 国に命じられて・命令されては多い（9/13）
  if (tv(316) === 9 || tv(316) === 13) {
    local += 500;
  }

  // :182-184 カルマ補正（善恶值 > 0 时每点 +10）
  if ((era.get(`cflag:${t}:151`) || 0) > 0) {
    local += (era.get(`cflag:${t}:151`) || 0) * 10;
  }

  // :186-187 レベル補正
  local += (era.get(`cflag:${t}:9`) || 0) * 8;

  return local; // :189
}

/**
 * @TOWN_SELL（:193-208）：战利品换金。CFLAG:581（换金槽）> 0 时并入所持金
 * 并清零（581 由 GET_JUNK_ITEM / 陷阱等累积，dungeon 属主域内裸寻址）。
 * @param {number} arg 角色
 * @returns {void} 原作无 RETURN
 */
function town_sell(arg) {
  if (arg <= 0) {
    return; // :196-197
  }
  const loot = era.get(`cflag:${arg}:581`) || 0;
  if (!loot) {
    return; // :198-199
  }
  if ((era.get('flag:5') || 0) & 32) {
    era.print(`${name_of(arg)}把战利品换成了钱，获得了${loot}点资金。`);
  }
  chara(arg).dungeon.所持金 += loot; // :207 CFLAG:580 += CFLAG:581
  era.set(`cflag:${arg}:581`, 0); // :208
}

/**
 * @TOWN_HOSHOUNIN（:212-227）：担保人事件。有「担保人」素质（TALENT:209）
 * 的角色每次回城，债务按**魔王等级**（CFLAG:0:9 × 8 + 500）增加——担保
 * 人替魔王背债的原作设定。
 * @param {number} arg 角色
 * @returns {Promise<void>} 原作无 RETURN
 */
async function town_hoshounin(arg) {
  // :215-218 SIF ARG <= 0 / SIF !TALENT:ARG:担保人 RETURN——TALENT:209
  // 担保人（yml 列名寻址，era 侧数字下标 + 注释）
  if (arg <= 0 || !(era.get(`talent:${arg}:209`) || 0)) {
    return;
  }
  const local = (era.get('cflag:0:9') || 0) * 8 + 500; // :219（CFLAG:0:9 = 魔王等级）
  if ((era.get('flag:5') || 0) & 32) {
    era.print(`作为担保人的${name_of(arg)}又去借钱了，债务增加了${local}点……`);
  }
  chara(arg).patch.借款 -= local; // :227 CFLAG:582 -= LOCAL（patch 门面）
}

/**
 * @TOWN_HENSAI（:231-300）：还债。
 *
 * 三段：① 有债务（582 ≠ 0）先加高利贷利息（债务 / 10 向零截断）；② 债务
 * < -500 时还款额按 **TARGET 的善恶值**分档（负债 1/2 ～ 1/9，省略角色号
 * 写法——文件头裁定），-500 ～ -1 之间固定还 500，无债直接返回；③ 还款
 * 额取整到百（下限 100、上限所持金半额——所持金 < 200 时上限 < 下限，
 * LIMIT 先 MAX 后 MIN，结果取上限），且不超过债务与所持金半额。
 *
 * 边界（验收「还不起时的分支」）：所持金 < 200 时还款额 = 580/2 取整百
 * （可能为 0），MIN 再钳——最多把一半现金还进去；债务 < 500 时还款额
 * ≤ |582|，债务清零。
 *
 * @param {number} arg 角色
 * @returns {Promise<void>} 原作无 RETURN
 */
async function town_hensai(arg) {
  if (arg <= 0) {
    return; // :235-236
  }
  const loan = chara(arg).patch.借款; // CFLAG:582（负数为债务）

  // :237-246 借金加上高利貸利率（利息段打印无 FLAG:5&32 守卫——总可见）
  if (loan !== 0) {
    const interest = Math.trunc(loan / 10); // 利率 = CFLAG:582 / 10（截断）
    chara(arg).patch.借款 += interest;
    era.print(
      `${name_of(arg)}回城后，查看了自己的债务，加了利息之后，债务变成了${chara(arg).patch.借款}点……`,
    );
  }

  // :247-276 返済額決定
  let local;
  if (chara(arg).patch.借款 < -500) {
    // :249-269 返済額をカルマ依存で変動（負債的 1/2～1/9；1/4 相当于
    // カルマ 130～81——**SELECTCASE CFLAG:151 省略角色号 → TARGET**）
    const karma_v = era.get(`cflag:${era_flag.target}:151`) || 0;
    let div;
    if (karma_v > 180) {
      div = 2;
    } else if (karma_v > 130) {
      div = 3;
    } else if (karma_v > 80) {
      div = 4;
    } else if (karma_v > 30) {
      div = 5;
    } else if (karma_v > -20) {
      div = 6;
    } else if (karma_v > -70) {
      div = 7;
    } else if (karma_v > -120) {
      div = 8;
    } else {
      div = 9;
    }
    local = Math.trunc(Math.abs(chara(arg).patch.借款) / div); // :270
  } else if (chara(arg).patch.借款 < 0) {
    local = 500; // :271-272 小额债务固定还 500
  } else {
    return; // :273-275 借金なし
  }

  // :278-283 上限下限処理（上限 = 手持ち的 1/2；返却意志ありなら最低 100
  // 保証；小銭は変なので 100 単位に切り詰め）
  const cash = chara(arg).dungeon.所持金; // CFLAG:580
  local = Math.min(Math.max(local, 100), Math.trunc(cash / 2)); // :281 LIMIT
  local = Math.trunc(local / 100) * 100; // :282-283 /= 100; *= 100

  // :285-286 借金の金額は越えないように
  local = Math.min(
    local,
    Math.abs(chara(arg).patch.借款),
    Math.trunc(cash / 2),
  );

  if ((era.get('flag:5') || 0) & 32) {
    era.print(
      `${name_of(arg)}将总计${chara(arg).patch.借款}的债务归还了${local}点。`,
    );
  }
  chara(arg).patch.借款 += local; // :299 CFLAG:582 += LOCAL（向 0 收敛）
  chara(arg).dungeon.所持金 -= local; // :300 CFLAG:580 -= LOCAL
}

/**
 * @TOWN_LOAN（:304-324）：借款。债务超过 -50000 再也没人肯借；否则
 * （260 + 善恶值）面骰 < 50 时借入 1000（善恶越低越难借——下限 160 面）。
 * @param {number} arg 角色
 * @param {(n: number) => number} rand_n 随机源
 * @returns {Promise<void>} 原作无 RETURN
 */
async function town_loan(arg, rand_n) {
  if (arg <= 0) {
    return; // :307-308
  }
  if (chara(arg).patch.借款 < -50000) {
    // :309-311 负债累累（打印有 FLAG:5&32 守卫，数值分支无守卫）
    if ((era.get('flag:5') || 0) & 32) {
      era.print(`${name_of(arg)}负债累累，再也没人愿意借钱给她了……`);
    }
    return;
  }
  // :313 借款判定（RAND:(260 + CFLAG:151) < 50——此处善恶值显式带 ARG）
  if (rand_n(260 + (era.get(`cflag:${arg}:151`) || 0)) < 50) {
    if ((era.get('flag:5') || 0) & 32) {
      era.print(`${name_of(arg)}借了1000点资金。`);
    }
    chara(arg).patch.借款 -= 1000; // :321 CFLAG:582 -= 1000
    chara(arg).dungeon.所持金 += 1000; // :322 CFLAG:580 += 1000
  }
}

/**
 * @TOWN_PT_SHOPPING（:331-343）：采购段。每人 @TOWN_SHOPPING，末尾 WAIT。
 * @param {number} pm0 队长 @param {number} pm1 仲間A @param {number} pm2 仲間B
 * @returns {Promise<void>} 原作无 RETURN
 */
async function town_pt_shopping(pm0, pm1, pm2) {
  const pm = [pm0, pm1, pm2];
  if ((era.get('flag:5') || 0) & 32) {
    era.print(`${name_of(pm[0])}的队伍在道具店进行了攻略的准备工作…`);
  }
  for (let lcount = 0; lcount < 3; lcount += 1) {
    if (pm[lcount] <= 0) {
      continue;
    }
    await town_shopping(pm[lcount]);
  }
  await era.waitAnyKey(); // :343 WAIT
}

/**
 * @TOWN_SHOPPING（:346-357）：个人采购。所持金 ≥ 3000 才买（ADD_EX_ITEM
 * -3 补给购买），RESULT 非 0（买到）时扣 500。
 * @param {number} arg 角色
 * @returns {Promise<number>} 原作 RETURN 0
 */
async function town_shopping(arg) {
  if (arg <= 0) {
    return 0; // :349-350
  }
  // :351-353 お金に余裕が無いと買えない
  if (chara(arg).dungeon.所持金 < 3000) {
    return 0;
  }
  const { add_ex_item } = require('#/dungeon/dungeon');
  const bought = await add_ex_item(-3, arg, 1); // :354 CALL ADD_EX_ITEM, -3, ARG, 1
  // :355-357 代金を支払う（存根恒 0 = 没买到，不扣款——存根语义自洽）
  if (bought) {
    chara(arg).dungeon.所持金 -= 500;
  }
  return 0;
}

/**
 * @TOWN_PT_PLANNING（:368-567）：冒险计划。定目标阶层（GOAL）与出发阶层
 * （START_FLOOR），按目标阶层向每人借入必要资金（COST）。
 *
 * 分支（按队伍最深到达/平均善恶/负债加权）：英雄类素质（自信家 161 /
 * 高贵 163 / 冷静 164 / 恶女 166）直奔 8 层；重度借债（LOAN_MIN ≤ 档 0
 * 或人均收支 ≤ 档 1）时 **GOAL/START 赋值嵌在 FLAG:5&32 调试守卫内**——
 * 正常游玩（守卫关）两值保持 0，LIMIT 后 GOAL = 0、START = 1（第一层
 * 闲逛）：原作缺陷 1:1 保留（登记 #14），ELSEIF 的同守卫条件恒不达；
 * 中度借债走浅层（FLOOR_PT/2 与 FLOOR_MIN 取小、至少 1）；无债或各档
 * 掷中（1/4、1/3、1/2）时 INTO_DEEPER（FLOOR_MAX + 1）；其余慎重层
 * （FLOOR_MAX/2 与 FLOOR_PT 取大、至少 1）。
 *
 * @param {number} pm0 队长 @param {number} pm1 仲間A @param {number} pm2 仲間B
 * @param {(n: number) => number} rand_n 随机源
 * @returns {Promise<number>} 原作 RETURN 0（英雄类早退同 0）
 */
async function town_pt_planning(pm0, pm1, pm2, rand_n) {
  const pm = [pm0, pm1, pm2];
  // :391-403 新探索模式——TALENT:161 自信家/163 高贵/164 冷静/166 恶女
  // 直奔最深处（CFLAG:520 = 8）。原作首行的 GETBIT(FLAG:5,33) 守卫被注释。
  const hero_or_die =
    era.get(`talent:${pm[0]}:161`) ||
    era.get(`talent:${pm[0]}:163`) ||
    era.get(`talent:${pm[0]}:164`) ||
    era.get(`talent:${pm[0]}:166`);
  if (hero_or_die) {
    if ((era.get('flag:5') || 0) & 32) {
      era.print(`满腔热血的${name_of(pm[0])}的队伍决定向地下城的最深处进发。`);
    }
    for (const cid of pm) {
      if (cid > 0) {
        era.set(`cflag:${cid}:520`, 8);
      }
    }
    return 0; // :401-402 A = PM:0; RETURN 0
  }

  if ((era.get('flag:5') || 0) & 32) {
    era.print(`${name_of(pm[0])}的队伍制定了新的冒险计划。`); // :405-406
  }

  // —— 情報取得（:410-436）——
  let num_pm = 0;
  const karma = [0, 0, 0];
  const floor_arr = [0, 0, 0];
  const loan_arr = [0, 0, 0];
  const balance = [0, 0, 0];
  let floor_min = 0; // FLOOR_MIN
  let floor_max = 0; // FLOOR_MAX
  let loan_min = 0; // LOAN_MIN（负数——MIN 是最大借金）
  let loan_max = 0; // LOAN_MAX
  for (let lcount = 0; lcount < 3; lcount += 1) {
    if (pm[lcount] <= 0) {
      continue;
    }
    const cid = pm[lcount];
    num_pm += 1; // :422 NUM_PM++
    karma[lcount] = era.get(`cflag:${cid}:151`) || 0; // :423 KARMA:LCOUNT
    floor_arr[lcount] = era.get(`cflag:${cid}:520`) || 0; // :427 FLOOR:LCOUNT
    floor_min = Math.min(floor_min, floor_arr[lcount]); // :428
    floor_max = Math.max(floor_max, floor_arr[lcount]); // :429
    loan_arr[lcount] = chara(cid).patch.借款; // :431 LOAN:LCOUNT（CFLAG:582）
    loan_min = Math.min(loan_min, loan_arr[lcount]); // :432
    loan_max = Math.max(loan_max, loan_arr[lcount]); // :433
    balance[lcount] = chara(cid).dungeon.所持金 + chara(cid).patch.借款; // :435 個人予算収支
  }

  const sum = (arr) => arr.reduce((a, b) => a + b, 0);
  const karma_pt = Math.trunc(sum(karma) / num_pm); // :438 KARMA_PT
  const floor_pt = Math.trunc(sum(floor_arr) / num_pm); // :439 FLOOR_PT
  const loan_pt = Math.trunc(sum(loan_arr) / num_pm); // :440 LOAN_PT
  // :441-443 ふつー黒字収支を心がける…どうも借金＞収入になるので頭割り
  const balance_pt = Math.trunc(sum(balance) / num_pm); // :443 BALANCE_PT

  // —— LOAN_LIMIT 三档（:445-480 SELECTCASE KARMA_PT 八档）——
  // ここらへんは適当に決めた判定（カルマ高いと慎重派）
  let loan_limit;
  if (karma_pt > 180) {
    loan_limit = [-7000, -5500, -3000];
  } else if (karma_pt > 130) {
    loan_limit = [-8000, -6500, -4000];
  } else if (karma_pt > 80) {
    loan_limit = [-9000, -7500, -5000];
  } else if (karma_pt > 30) {
    loan_limit = [-10000, -8500, -6000];
  } else if (karma_pt > -20) {
    loan_limit = [-11000, -9500, -7000];
  } else if (karma_pt > -70) {
    loan_limit = [-12000, -10500, -8000];
  } else if (karma_pt > -120) {
    loan_limit = [-13000, -11500, -9000];
  } else {
    loan_limit = [-14000, -12500, -10000];
  }

  // —— 進行処理（:484-534；GOTO INTO_DEEPER 经闭包落地）——
  const show = ((era.get('flag:5') || 0) & 32) !== 0;
  let goal = 0; // GOAL（#DIM 初值 0）
  let start_floor = 0; // START_FLOOR
  const into_deeper = () => {
    // $INTO_DEEPER（:518-525）——以比上次更深层为目标
    if (show) {
      era.print('以比上次更深层为目标。');
    }
    goal = floor_max + 1; // 前回到達した階層+1階層を目指す
    start_floor = floor_max + 1; // 前回到達した階層からスタート
  };

  if (loan_min <= loan_limit[0] || balance_pt <= loan_limit[1]) {
    // :490-505 借金がすごいパーティ
    if (rand_n(4) === 0) {
      into_deeper();
    } else {
      // :496-505 **GOAL/START 赋值嵌在 FLAG:5 & 32 守卫内**（原作缺陷，
      // 登记 #14）：守卫关（正常游玩）时 GOAL/START 保持 0，经下方 LIMIT
      // 得 GOAL = 0 / START = 1——重度借债实际走「第一层闲逛」而非注释
      // 宣称的深潜。1:1 保留（#175 M486「不要修好原作缺陷」同款）。
      if (show) {
        era.print(
          '因为欠债实在太多了，抱着一获千金的目的向着比之前更深的阶层前进。',
        );
        goal = floor_max + 1;
        start_floor = floor_max + 1;
      }
      // ELSEIF FLAG:5 & 32 && (TALENT:172 智慧 || TALENT:164 冷静 ||
      // CFLAG:151 >= 100)——恒不达（IF 已含同一守卫；三处均为省略角色号
      // 的 TARGET 残留读），「第一层闲逛」打印与 GOAL = 0 不落地
    }
  } else if (loan_min <= loan_limit[1] || balance_pt <= loan_limit[2]) {
    // :506-515 借金そこそこ
    if (rand_n(3) === 0) {
      into_deeper();
    } else {
      if (show) {
        era.print('好像决定在浅层探索一下。');
      }
      goal = Math.min(Math.trunc(floor_pt / 2), floor_min); // :512
      if (!goal) {
        goal = 1; // :513-514
      }
      start_floor = 1; // :515
    }
  } else if (loan_pt > loan_limit[2]) {
    // :516-525 借金がぜんぜん無い（INTO_DEEPER 标签本体所在分支）
    into_deeper();
  } else {
    // :526-534 その他
    if (rand_n(2) === 0) {
      into_deeper();
    } else {
      if (show) {
        era.print('慎重地继续探索。');
      }
      goal = Math.max(Math.trunc(floor_max / 2), floor_pt, 1); // :532
      start_floor = goal; // :533
    }
  }

  // :536-538 9階層までしかないので、最大値は8、最小値は0
  goal = Math.min(Math.max(goal, 0), 8);
  start_floor = Math.min(Math.max(start_floor, 1), 7);

  // :540-542 階層踏破のための必要資金（ダンジョンレベル = 魔王等级）
  const cost = goal * Math.min(500 + (era.get('cflag:0:9') || 0) * 4, 900);

  // :544-556 计划打印
  if (goal && show) {
    era.print(`每人借了${cost}点资金，计划到达第${goal + 1}阶层！`);
  } else if (show) {
    era.print('决定不花钱就在第一层闲逛一下。');
  }

  // :558-566 支払い（借入必要资金、写目标阶层与出发阶层）
  for (let lcount = 0; lcount < 3; lcount += 1) {
    if (pm[lcount] <= 0) {
      continue;
    }
    const cid = pm[lcount];
    chara(cid).patch.借款 -= cost; // :563 CFLAG:582 -= COST
    era.set(`cflag:${cid}:520`, goal); // :564 CFLAG:520 = GOAL（目标阶层）
    chara(cid).dungeon.侵攻阶层 = start_floor; // :565 CFLAG:501 = START_FLOOR
  }
  await era.waitAnyKey(); // :567 WAIT

  return 0;
}

/**
 * @TOWN_PT_PARTY（:575-679）：宴会。
 *
 * 预算收集段读的是 **TARGET 残留的 CFLAG:580**（省略角色号——文件头
 * 裁定）：每人份的飲み代全按同一个人的钱袋算（原作「支払いの判定が
 * おかしいっぽかったのを修正」修过的是支付段，收集段仍是 TARGET 读），
 * 支付段则显式扣本人的 580——收集与支付不对称是原作行为，1:1。
 * 无预算（SUMARRAY(COST) == 0）流局：A = PM:0; RETURN 0（TARGET 未动）。
 *
 * お楽しみタイム按 TARGET（此处已显式换手为各成员）的善恶/素质走臂：
 * karma > 50 早睡；karma ≤ 50 恒进第二臂（`CFLAG:151 <= 50` 在该世界
 * 恒真）——其内层按素质走嫖妓（百合气质/扶她/男 → 自动调教三连）或
 * 少年风俗（正太控）或无输出。**祈祷臂（圣女·神官·巫女 + KARMA +1）
 * 与醉睡臂恒不达**（登记 #14，见函数体内注释）。末尾 TARGET 恢复暂存值。
 *
 * @param {number} pm0 队长 @param {number} pm1 仲間A @param {number} pm2 仲間B
 * @param {(n: number) => number} rand_n 随机源
 * @returns {Promise<number>} 原作 RETURN：0 = 流局 / 1 = 开宴
 */
async function town_pt_party(pm0, pm1, pm2, rand_n) {
  const pm = [pm0, pm1, pm2];
  const target_pool = era_flag.target; // :583 TARGET_POOL = TARGET

  // :585-596 予算を集める（財布から2割の飲み代——读 TARGET 残留，函数头）
  const budget_target = era_flag.target;
  const cost = [0, 0, 0]; // #DIM DYNAMIC COST, 3
  for (let lcount = 0; lcount < 3; lcount += 1) {
    if (pm[lcount] <= 0) {
      continue;
    }
    const cash = era.get(`cflag:${budget_target}:580`) || 0; // CFLAG:580（TARGET）
    if (cash < 1000) {
      continue; // お金が無いとダメ
    }
    cost[lcount] = Math.trunc(cash / 5); // COST:LCOUNT = CFLAG:580 / 5
  }

  // :597-612 おかねがある / お流れ
  const total = cost[0] + cost[1] + cost[2];
  if (total !== 0) {
    if ((era.get('flag:5') || 0) & 32) {
      era.print(`${name_of(pm[0])}的队伍进行了丰盛的晚宴，预祝冒险的成功……`);
    }
    for (let lcount = 0; lcount < 3; lcount += 1) {
      if (pm[lcount] <= 0) {
        continue;
      }
      chara(pm[lcount]).dungeon.所持金 -= cost[lcount]; // :605 显式本人
    }
    await era.waitAnyKey(); // :607 WAIT
  } else {
    return 0; // :609-611 お流れ（A = PM:0; RETURN 0——TARGET 未动）
  }

  // :614-675 お楽しみタイム（TARGET 显式换手为各成员，:619）
  for (let lcount = 0; lcount < 3; lcount += 1) {
    if (pm[lcount] <= 0) {
      continue;
    }
    const cid = pm[lcount];
    era_flag.target = cid; // :619 TARGET = PM:LCOUNT
    const t = cid; // 以下省略角色号读写的对象
    const karma_v = era.get(`cflag:${t}:151`) || 0;
    const man = (era.get(`talent:${t}:122`) || 0) !== 0; // TALENT:122 男人
    const futanari = (era.get(`talent:${t}:121`) || 0) !== 0; // TALENT:121 扶她

    era.print(name_of(t)); // :621 PRINTFORM %SAVESTR:TARGET%（行首，待续）

    if (karma_v > 50) {
      // :623-625 カルマが高い場合
      era.print('为了备战冒险早早就寝了……');
      // :626-628 ELSEIF CFLAG:151 > 80 && TALENT:122——恒不达（> 80 蕴含
      // > 50，上一臂已抓走；原文同为「早早就寝」），1:1 不镜像（page-ablup
      // 的 COUNT==12 先例），注释留痕
    } else if (karma_v <= 50 || (karma_v <= 80 && man)) {
      // :629-666
      const abl22 = era.get(`abl:${t}:22`) || 0; // 百合气质
      if (abl22 > 1 || futanari || man) {
        // :630-646 レズっ気・ふたなり・オトコの場合娼婦購入
        // 行首名 + 到花街上花天酒地…同一显示行拼接（PRINT 不换行 ×2）
        let line = '到花街上花天酒地，向';
        if (era.get(`talent:${t}:142`) || 0) {
          line += '向幼齿的'; // :634-635 ロリコン
        }
        if (rand_n(5) === 0) {
          line += '扶她'; // :636-637
        }
        era.print(name_of(t) + line + '妓女买了春……'); // PRINTL 收行
        const {
          before_autotrain,
          source_check_auto,
        } = require('#/dungeon/dungeon-battle');
        await before_autotrain(); // :639
        // :640-642 貝合わせ自動調教（扶她或非男）
        if (futanari || !man) {
          await com63_auto();
        }
        // :643-645 愛撫自動調教（扶她或男——扶她两连）
        if (futanari || man) {
          const { com0_auto } = require('#/dungeon/dungeon-trap');
          await com0_auto();
        }
        await source_check_auto(); // :646
      } else if (era.get(`talent:${t}:143`) || 0) {
        // :647-653 ショタコンの場合少年風俗へ
        era.print(name_of(t) + '到以和少年做嘿嘿嘿的事为卖点的店里玩乐去了……');
        const {
          before_autotrain,
          source_check_auto,
        } = require('#/dungeon/dungeon-battle');
        await before_autotrain();
        const { com0_auto } = require('#/dungeon/dungeon-trap');
        await com0_auto();
        await source_check_auto();
      }
      // :654-665 ELSEIF TALENT:122 && ABL:23 > 1——**恒不达**（蕴含
      // TALENT:122，第一臂的 `|| TALENT:122` 已把所有男人抓走；原作者
      // 的吐槽注释「いっちよ、ただの、この男性勇者やばいじゃないが。。。」
      // 正说明这条从没跑通过）。内层 IF TALENT:143（少年风俗）/ ELSEIF
      // ABL:20 > 2（:664 的空 PRINT）随之不可达，1:1 不镜像，注释留痕
      //
      // :667-672 ELSEIF 聖女・神官・巫女（祈祷 + CALL KARMA, TARGET, 1）
      // 与 ELSE 醉睡——**两臂同样恒不达**：臂 1 不中即 karma ≤ 50，而臂 3
      // 的左半 `CFLAG:151 <= 50` 在该世界恒真、臂 3 恒中，臂 4/5 无世界
      // 可达（原作死代码，登记 #14；`TALENT:315 == 12 || (202 神官 &&
      // 122 男 && CFLAG:5 > 100) || (202 && (121 || !122)) || 206 巫女`
      // 的祈祷条件与「醉醺醺地睡着了」从未执行）。1:1 不镜像（page-ablup
      // 先例），注释留痕——KARMA +1 的调用点随之不可达，stub-registry
      // 已注明
    }
  }

  era_flag.target = target_pool; // :677 TARGET = TARGET_POOL

  return 1; // :679
}

/**
 * @TOWN_PT_DAYEVENT（:686-700）：日常段。每人换手 TARGET 后走恋人事件
 * （DUNGEON_TOWN_LOVER——域内存根，随恋人系统票）。
 * @param {number} pm0 队长 @param {number} pm1 仲間A @param {number} pm2 仲間B
 * @returns {Promise<number>} 原作 RETURN 0
 */
async function town_pt_dayevent(pm0, pm1, pm2) {
  const pm = [pm0, pm1, pm2];
  // :692-698 各自日常を送る
  for (let lcount = 0; lcount < 3; lcount += 1) {
    if (pm[lcount] <= 0) {
      continue;
    }
    era_flag.target = pm[lcount]; // :696 TARGET = PM:LCOUNT
    await dungeon_town_lover(pm[lcount]); // :697 CALL DUNGEON_TOWN_LOVER
  }
  return 0;
}

module.exports = {
  dungeon_town,
  town_pt_rest,
  town_pt_funding,
  fi_pt_funding,
  fi_funding,
  town_sell,
  town_hoshounin,
  town_hensai,
  town_loan,
  town_pt_shopping,
  town_shopping,
  town_pt_planning,
  town_pt_party,
  town_pt_dayevent,
  dungeon_town_lover,
  sell_ex_item,
  com63_auto,
  rand_autotrain,
  STUBBED_CALLS,
};
