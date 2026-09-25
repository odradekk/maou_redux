/**
 * @file 异界勇者召唤：@CHARA_SIM_SHOP 族（issue #399 / N15 段 3）。
 *
 * 源: target/ERB/SHOP/SHOP_CHARA.ERB
 *     @CHARA_SIM_SHOP（:11-128，异界勇者的召唤流程）
 *     @SHOW_SHOP_CHARA（:133-151，头行）
 *     @SELECT_CHARA（:155-234）/@BUY_CHARA（:237-359）——**原作零调用点**
 *     @CHAR_IKAI_CREATE（:361-432，调试档的强行召唤）/ @CHAR_IKAI_APPEND
 *     （:435-449）/ @CHARA_IKAI_COST（:451-458）
 *
 * == 发布构建里的可达性（本文件最要紧的一条） ==
 *
 * 进本屏的唯一入口是 SHOP_MONSTER.ERB:32-35 的 `[IF DEBUG]` 档
 * `[2]召唤异界勇者`（JUMP CHARA_SIM_SHOP），而调试编译块按 page-ablup.js:113
 * 的先例不移植——**发布构建里没有入口**（与原作一致：玩家玩不到这个屏）。
 * 同理由，@CHARA_SIM_SHOP 里 `[IF_DEBUG]` 的 `[99] 强行召唤`（:31-34）也不
 * 移植，于是 `SEXCOIN == 99` 与 @CHAR_IKAI_CREATE 那条链同样不可达。
 *
 * 本文件仍把这些函数按 1:1 落地：**文件是本次交付的单元**（移植状态表按
 * 文件判「已移植」，docs/stub-registry.md 按文件归因），函数体留着、用例
 * 直接驱动。与「调试编译块不移植」并不矛盾：不移植的是那两行 UI 入口，
 * 不是函数。
 *
 * == 与 SHOP_MONSTER.ERB 的同形复用 ==
 *
 * @SELECT_CHARA / @BUY_CHARA 与 @SELECT_MONSTER / @BUY_MONSTER 逐字相同，
 * 只差两道守卫（SHOP_CHARA 那份没有「编号在 201-280 段内」与「ITEMSALES
 * 已点亮」，见 SHOP_MONSTER.ERB:260-265 的注释在 SHOP_CHARA 里不存在）。
 * 两个文件的 TFLAG:100/101/102 也本就是同一组槽位（两个屏不会同时在用），
 * 故本文件直接复用 page/page-monster-shop.js 的 `select_follower` /
 * `buy_follower` 与那份 `shop_state`，不自造第二份状态。
 *
 * 其余移植说明：
 *   - **TFLAG:100/101/102 与 TFLAG:15 同前**（page-shop-trap.js:24-31 的
 *     据点期无 tflag 表实测）：改落模块内状态，见 page-monster-shop.js 的
 *     文件头第 1 条；
 *   - **`INPUT 1`**（:391 的默认值形式）：ere 侧 `era.input()` 的空回传
 *     按默认值 1 处理（`|| 1`）；该分支只在调试路径上，实现保持最直白；
 *   - **`#DIM L_I` 跨函数可见**（@CHARA_IKAI_COST 读的是调用方的 L_I）：
 *     原作靠 Emuera 的单字母全局量传参，ere 侧改形参 ＋ 返回值
 *     （trap_price 的同款处置，#5 决议第六条）。同理 `CALL CHARA_IKAI_COST`
 *     之后调用方直接读 `C`/`D`（:413/:417/:422-424）也改成读返回值。
 *   - **选项升格为按钮**（#572）：性别三选一与返回（:30/:36）、确认召唤的
 *     `[0]/[1]`（:90-96）改 `era.printButton`（PR #53 通则，正文不写
 *     [编号]）；异界勇者列表轮（:389 的 `[999] 返回`）**保持纯文本**——
 *     本轮的有效编号是格行的 `[编号]`，打按钮会把它们锁死（理由见该处注释）。
 */

'use strict';

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { chara } = require('#/facade/chara');
const { char_make, name_reset } = require('#/chara/char-make');
const { add_chara_ex, DECLARED_CHARA_IDS } = require('#/chara/chara-ex');
const { char_init } = require('#/chara/chara-init');
const { party_char_del } = require('#/dungeon/dungeon-party');
const { show_chara_info } = require('#/page/page-chara-info-show');
const { clear_shop } = require('#/page/page-item-shop');
const {
  select_follower,
  buy_follower,
  shop_state,
} = require('#/page/page-monster-shop');
const { chara_callname } = require('#/utils/callname-utils');
const { pad_display, pad_left } = require('#/utils/display-width'); // #577：补位 NBSP 化

/** 本文件存根化的原作调用名（docs/stub-registry.md 必须收录每一个） */
const STUBBED_CALLS = [];

/** 异界勇者的预设编号（:63 `CHARA = 211`） */
const IKA_SIM_ID = 211;
/** 召唤费（:101/:107/:120/:121/:166 的 1500） */
const SUMMON_FEE = 1500;
/** 男性档的素质（:69 `TALENT:A:122`）/ 扶她档（:71 `TALENT:A:121`） */
const MALE_TALENT = 122;
const FUTA_TALENT = 121;
/** 强行召唤的勋章槽（:116/:417/:424 `EXP:MASTER:81`） */
const MEDAL_EXP = 81;
/** 异界人的编号段（:372 `FOR L_I, 10000, 100000`，上界开区间） */
const IKAI_IDS = { start: 10000, end: 100000 };
/** 强行召唤的每枚勋章费用（:457 `D = C * 2000`） */
const IKAI_COIN_RATE = 2000;
/** 强行召唤的最低勋章数（:455-456 `SIF C < 3 → C = 3`） */
const IKAI_MIN_COINS = 3;
/** 强行召唤的编号取模（:453 `C = L_I % 10000`） */
const IKAI_MOD = 10000;
/** 强行召唤的编号除数（:454 `C = C / 5`） */
const IKAI_DIVISOR = 5;
/** 性别选择的选项上限（:44 `RESULT > 3`；调试档的 99 未移植） */
const SEX_MAX = 3;
/** 名字字段宽（:378 `%CSVNAME(L_I),14,LEFT%`） */
const NAME_WIDTH = 14;
/** 编号字段宽（:378 `[{L_I,2}]`） */
const NUM_WIDTH = 2;
/** 一览每行几个（:382 `SIF LOCAL % 5 == 0`） */
const COLUMNS = 5;

/** TALENT 读数兜底（#13） */
function talent(cid, idx) {
  return era.get(`talent:${cid}:${idx}`) || 0;
}

/** CSVCALLNAME/CSVNAME 的等价物：预设里的「名前」（chara-name.js 先例） */
function csv_name(no) {
  const preset = era.get(`chara:${no}`);
  return String(preset?.name ?? '');
}

/** EXISTCSV(no)：该编号的角色预设是否已定义（引擎的 staticData.chara） */
function exist_csv(no) {
  return era.getAllCharacters().includes(no);
}

/**
 * FINDCHARA(NO, no) 的等价物：找一个「预设编号 = no」的在场角色。
 * ere 侧角色号 = 预设号（#21 的扁平化），故命中即返回该编号本身，
 * 未命中返回 -1（原作的返回值语义）。
 * @param {number} no 预设编号
 * @returns {number}
 */
function findchara_no(no) {
  return era.getAddedCharacters().includes(no) ? no : -1;
}

/**
 * @SHOW_SHOP_CHARA（:133-151）：异界召唤系列两个画面的公共头行。
 */
function show_shop_chara() {
  // :138 CUSTOMDRAWLINE = → 本屏的分隔线走实线
  era.print('异界召唤');
  era.print('《需要勋章经验来激活次元大门，并支付一定金钱来召唤异次元的勇者》');
  era.drawLine({ isSolid: true }); // :141
  era.print(
    `${era_flag.day_count + 1}日${era_flag.time === 0 ? ' 午前' : ' 午后'}`,
  );
  era.print(
    `所持金：${era_flag.money}点\t\t勋章：${era.get(`exp:0:${MEDAL_EXP}`) || 0}点`,
  ); // :150
  era.drawLine({ isSolid: true }); // :151
}

/**
 * @CHARA_IKAI_COST（:451-458）：强行召唤的价钱。`L_I % 10000 / 5`（截断）
 * 即所需勋章数、下限 3；金钱 = 勋章 × 2000。
 *
 * @param {number} l_i 目标编号（原作调用方的 L_I）
 * @returns {[number, number]} [C, D] = [勋章数, 金钱]
 */
function chara_ikai_cost(l_i) {
  let c = Math.trunc(Math.trunc(l_i % IKAI_MOD) / IKAI_DIVISOR); // :453-454
  if (c < IKAI_MIN_COINS) {
    c = IKAI_MIN_COINS; // :455-456
  }
  return [c, c * IKAI_COIN_RATE]; // :457 RETURN C,D
}

/**
 * @CHAR_IKAI_APPEND（:435-449）：把编号 arg 的角色加入并做异界人初始化。
 *
 * `TARGET` 的存还（:437 LOCAL = TARGET → :448 TARGET = LOCAL）1:1 保留：
 * ere 侧 target 是可读写的具名状态（era_flag.target）。
 *
 * @param {number} arg 角色预设编号（原作 ARG）
 * @param {(n: number) => number} [rand] RAND:N 随机源（透传给 CHAR_INIT）
 * @returns {Promise<number>} 新角色号（原作 RETURN A）
 */
async function char_ikai_append(arg, rand) {
  era.addCharacter(arg); // :436 ADDCHARA ARG
  const saved_target = era_flag.target; // :437 LOCAL = TARGET
  // :438 CALL ADDCHARA_EX, CHARANUM-1（扁平化直传）：原作的 TRYCALLFORM 对
  // 「没有 CHARA_EX_<N> 这个函数」的编号是**静默无操作**——异界人的 10000+
  // 编号全库没有专属实现（EXCOM.ERB 的 45 个声明编号里没有它们）；
  // ere 的注册表对声明空间外直接抛错（拼写错误防线），故这里先查空间再调
  if (DECLARED_CHARA_IDS.includes(arg)) {
    await add_chara_ex(arg);
  }
  era_flag.target = arg; // :439 TARGET = CHARANUM - 1
  const a = arg; // :440 A = CHARANUM - 1
  await char_init(a, rand); // :443 CALL CHAR_INIT（rand 显式传参）
  chara(a).invasion.状态 = 0; // :446 CFLAG:A:1 = 0
  era_flag.target = saved_target; // :448 TARGET = LOCAL
  return a; // :449 RETURN A
}

/**
 * @CHAR_IKAI_CREATE（:361-432）：调试档的「强行从异世界召唤」。
 *
 * 发布构建里没有入口（文件头），函数体 1:1 落地：选编号 → 校验在场/价位
 * → 扣勋章与金钱 → @CHAR_IKAI_APPEND。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（透传给 CHAR_INIT）
 * @returns {Promise<number>} 原作 RETURN 0（:393-395 的 999 分支）
 */
async function char_ikai_create(rand) {
  era.drawLine({ isSolid: true }); // :361-363
  era.print('强行从异世界召唤魔王想要召唤的人'); // :364
  era.print('这将耗费不少的金钱以及更多的勋章'); // :365
  era.drawLine({ isSolid: true }); // :364-366
  era.print(''); // :367
  await era.waitAnyKey(); // :368 WAIT

  for (;;) {
    show_shop_chara(); // :370
    let columns = 0; // :371 LOCAL = 0
    // :372-384 一览：有预设、且不在场（FINDCHARA 未命中）的编号
    let row = '';
    for (let l_i = IKAI_IDS.start; l_i < IKAI_IDS.end; l_i += 1) {
      if (!exist_csv(l_i)) {
        continue; // :373-374 SIF !EXISTCSV(L_I) → CONTINUE
      }
      if (findchara_no(l_i) > 0) {
        continue; // :375-377 SIF A > 0 → CONTINUE
      }
      const [coins, money] = chara_ikai_cost(l_i);
      // :378 `PRINTFORM  [{L_I,2}] …` 命令名后是两个空格：Emuera 只吃掉一个
      // 作命令分隔，第二个是实参的首字符（黄金样本里主菜单 `PRINT  上午`
      // 的行首空格、`PRINTL  ` 的单空格行都是同一条规则的旁证），故格首有一个
      // 半角空格
      row +=
        ` [${pad_left(String(l_i), NUM_WIDTH)}] ` +
        `${pad_display(csv_name(l_i), NAME_WIDTH)}` +
        `(${coins}勋章&${money}金)`;
      columns += 1;
      if (columns % COLUMNS === 0) {
        era.print(row); // :382-383 SIF LOCAL % 5 == 0 → PRINTL
        row = '';
      }
    }
    if (row !== '') {
      era.print(row); // :385-386 SIF !LINEISEMPTY() → PRINTL
    }

    era.drawLine({ isSolid: true }); // :386-388
    // :389 的 [999] 返回保持纯文本（#572）：本轮的有效编号是上面那些
    // 勇者行的 `[编号]`（格行拼行，编号即输入值），单给这行打按钮会把
    // 白名单收成 999、异界勇者的编号当场被拒收。整轮按钮化要先重排格行。
    era.print('[999] 返回'); // :389

    // :391 INPUT 1（默认值 1）：只有「空回传」按默认值 1 处理——显式键入的
    // 0 是合法值，不能被 `|| 1` 吞掉（文件头）
    const raw = await era.input();
    const result =
      raw === undefined || raw === null || raw === '' || Number.isNaN(raw)
        ? 1
        : raw;
    if (result === 999) {
      return 0; // :393-395 CASE 999
    }
    const l_i = result; // :396-397 CASEELSE：L_I = RESULT

    if (!exist_csv(l_i)) {
      continue; // :400-403
    }

    let a = -1; // :405 A = -1
    // :407-409 已登录的角色（编号段内才查）
    // :408 INRANGE(L_I,10000,100000) 两端闭——上界与 FOR 的开区间不同源，
    // 别顺手抄成 `< IKAI_IDS.end`（L_I == 100000 且在库时会重复收费入队）
    if (l_i >= IKAI_IDS.start && l_i <= IKAI_IDS.end) {
      a = findchara_no(l_i);
    }
    if (a < 0) {
      // :411-432 登录新角色：价钱与勋章两道闸
      const [coins, money] = chara_ikai_cost(l_i);
      if (era_flag.money < money) {
        era.print('金钱不够！');
        await era.waitAnyKey();
        continue;
      }
      if ((era.get(`exp:0:${MEDAL_EXP}`) || 0) < coins) {
        era.print('勋章不够！');
        await era.waitAnyKey();
        continue;
      }
      era_flag.money -= money; // :422
      era_exflag.legit_money -= money; // :423
      era.set(
        `exp:0:${MEDAL_EXP}`,
        (era.get(`exp:0:${MEDAL_EXP}`) || 0) - coins,
      ); // :424
      a = await char_ikai_append(l_i, rand); // :426-427
      era.print('*****************************************');
      era.print(`${era.get(`callname:${a}:-1`) ?? ''}被你强行召唤了………`); // :429
      era.print('*****************************************');
      await era.waitAnyKey(); // :431 PRINTW
    }
    return 0; // :428-432 之后落回 $INPUT_LOOP 之外，函数尾
  }
}

/**
 * @CHARA_SIM_SHOP（:11-128）：异界勇者的召唤流程。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（透传给 CHAR_MAKE）
 * @returns {Promise<number>} 原作 RETURN 0（:128）
 */
async function chara_sim_shop(rand) {
  // :21-23 TFLAG:100/101/102 = 0（与怪物商店同一组槽位，见文件头）
  shop_state.race = 0;
  shop_state.race2 = 0;
  shop_state.chosen = 0;

  // :25-51 性别选择
  let sex_coin = 0;
  for (;;) {
    show_shop_chara(); // :27
    era.print('请选择要召唤的勇者的性别'); // :29
    // :30 的 `[1]男性…` 是列排版纯文本选项 → 与 :36 的返回一并升格为按钮
    // （PR #53 通则，正文不写 [编号]；#572）
    era.printButton('男性', 1);
    era.printButton('女性', 2);
    era.printButton('扶她', 3);
    // :31-34 [IF_DEBUG] 的 [99] 强行召唤不移植（文件头）
    era.drawLine({ isSolid: true }); // :35
    era.printButton('返回', 999); // :36
    const result = await era.input();
    if (result === 999) {
      clear_shop(); // :41
      return 0;
    }
    // :44 `RESULT > 3 && RESULT != 99`——99 是未移植的调试档，判据退化为 > 3
    if (result > SEX_MAX) {
      continue;
    }
    sex_coin = result;
    if (result === 0) {
      continue; // :49-50
    }
    break;
  }

  // :53-127 $ADD_CHARA
  for (;;) {
    show_shop_chara(); // :54
    // :60-62 SEXCOIN == 99 → JUMP CHAR_IKAI_CREATE（调试档，文件头）

    const chara_id = IKA_SIM_ID; // :63 CHARA = 211
    era.addCharacter(chara_id); // :64 ADDCHARA CHARA
    await add_chara_ex(chara_id); // :65 CALL ADDCHARA_EX, CHARANUM-1
    const a = chara_id; // :66 A = CHARANUM - 1（扁平化）
    if (sex_coin === 1) {
      era.set(`talent:${a}:${MALE_TALENT}`, 1); // :68-69
    }
    if (sex_coin === 3) {
      era.set(`talent:${a}:${FUTA_TALENT}`, 1); // :70-71
    }
    await char_make(a, 0, 0, rand); // :73-74 CALL CHAR_MAKE; A = RESULT
    chara(a).invasion.状态 = 0; // :75
    if ((era.get(`cflag:${a}:151`) || 0) < -100) {
      chara(a).chara.善恶值 = -100; // :77-79 善良値調整
    }

    era.print('*****************************************'); // :81
    era.print(`${chara_callname(a)}回应了你的召唤………`); // :82
    era.print('*****************************************'); // :83
    await era.waitAnyKey(); // :84 PRINTW
    // :85 CALL SHOW_CHARA_INFO, A, -2（#390 起真身，见 docs/stub-registry.md；
    // -2 = 贡品信息页。rand 一路透传：标题的身体数据生成吃随机）
    await show_chara_info(a, -2, rand);
    era.print(`确定要召唤${chara_callname(a)}么？`); // :87
    era.print(''); // :88
    era.print(''); // :89
    const gender_word = talent(a, MALE_TALENT) !== 0 ? '他' : '她';
    // :90-96 的两项 → 按钮（PR #53 通则，正文不写 [编号]；#572）
    era.printButton(`就是${gender_word}了`, 0);
    era.printButton('再换一个（花费1500）', 1);

    const result = await era.input();
    if (result === 1) {
      // :99-111 再换一个
      if (era_flag.money <= SUMMON_FEE) {
        era.print('金钱不够！'); // :102-103
        await era.waitAnyKey();
        return 0;
      }
      await party_char_del(a); // :105
      era.removeCharacter(a); // :106
      era_flag.money -= SUMMON_FEE; // :107
      era_exflag.legit_money -= SUMMON_FEE; // :108
      name_reset(); // :109 CALL NAME_RESET
      continue; // :110 GOTO ADD_CHARA
    }
    if (result === 0) {
      // :112-125 就是（成交）：金钱与勋章两道闸，随后扣款
      if (era_flag.money <= SUMMON_FEE) {
        era.print('金钱不够！'); // :114-115
        await era.waitAnyKey();
      } else if ((era.get(`exp:0:${MEDAL_EXP}`) || 0) < 1) {
        era.print('勋章不够！'); // :116-118
        await era.waitAnyKey();
      } else {
        era_flag.money -= SUMMON_FEE; // :120
        era_exflag.legit_money -= SUMMON_FEE; // :121
        era.set(`exp:0:${MEDAL_EXP}`, (era.get(`exp:0:${MEDAL_EXP}`) || 0) - 1); // :122
        if ((era.get(`cflag:${a}:999`) || 0) === 0) {
          chara(a).stronghold.异界召唤标记 = 1; // :123-124
        }
      }
    }
    return 0; // :126-128
  }
}

/**
 * @SELECT_CHARA（:155-234）：种族 → 商品陈列 → @BUY_CHARA。
 * 与 @SELECT_MONSTER 逐字相同，只差两道守卫（文件头）。
 *
 * @param {number} arg0 种族选择的输入（原作 ARG:0）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 1 = 买定、0 = 退回种族选择
 */
async function select_chara(arg0, rand) {
  return select_follower({ arg0, show: show_shop_chara, guard: false, rand });
}

/**
 * @BUY_CHARA（:237-359）：挑祭品、付钱、召唤（与 @BUY_MONSTER 逐字相同）。
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 1 = 成交、0 = 取消或祭品不足
 */
async function buy_chara(rand) {
  return buy_follower({ show: show_shop_chara, rand });
}

module.exports = {
  STUBBED_CALLS,
  chara_sim_shop,
  show_shop_chara,
  select_chara,
  buy_chara,
  char_ikai_create,
  char_ikai_append,
  chara_ikai_cost,
};
