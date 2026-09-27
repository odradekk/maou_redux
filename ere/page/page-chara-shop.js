/**
 * @file 异界勇者召唤：chara_sim_shop 族（issue #399 / N15 段 3）。
 *
 * == 发布构建里的可达性（本文件最要紧的一条） ==
 *
 * 进本屏的唯一入口是怪物商店屏的调试编译档 `[IF DEBUG]` 里的
 * `[2]召唤异界勇者`（跳转到本屏），而调试编译块按 page-ablup.js
 * 的先例不移植——**发布构建里没有入口**（玩家玩不到这个屏）。
 * 同理由，chara_sim_shop 里 `[IF_DEBUG]` 的 `[99] 强行召唤` 也不
 * 移植，于是 `SEXCOIN == 99` 与 char_ikai_create 那条链同样不可达。
 *
 * 本文件仍把这些函数完整实现：**文件是本次交付的单元**，函数体留着、
 * 用例直接驱动。与「调试编译块不移植」并不矛盾：不移植的是那两行
 * UI 入口，不是函数。
 *
 * == 与怪物商店（page-monster-shop.js）的同形复用 ==
 *
 * select_chara / buy_chara 与怪物商店的 select_follower / buy_follower
 * 同形，只差两道检查（本文件这份没有「编号在 201-280 段内」与
 * 「ITEMSALES 已点亮」）。
 * 两屏的 TFLAG:100/101/102 也本就是同一组槽位（两屏不会同时在用），
 * 故本文件直接复用 page/page-monster-shop.js 的 `select_follower` /
 * `buy_follower` 与那份 `shop_state`，不自造第二份状态。
 *
 * 其余移植说明：
 *   - **TFLAG:100/101/102 与 TFLAG:15 同前**（page-shop-trap.js 文件头的
 *     据点期无 tflag 表实测）：改落模块内状态，见 page-monster-shop.js 的
 *     文件头第 1 条；
 *   - **空输入按默认值 1 处理**：`era.input()` 的空回传按 1 处理
 *     （`|| 1`）；该分支只在调试路径上，实现保持最直白；
 *   - **跨函数共享的 L_I**（chara_ikai_cost 读的是调用方的 L_I）：
 *     改形参 ＋ 返回值（trap_price 的同款处置，#5 决议第六条）。同理
 *     调用方在 chara_ikai_cost 之后读的结果 `C`/`D` 也改成读返回值。
 *   - **选项升格为按钮**（#572）：性别三选一与返回、确认召唤的
 *     `[0]/[1]` 改 `era.printButton`（PR #53 通则，正文不写
 *     [编号]）；异界勇者列表轮的 `[999] 返回`**保持纯文本**——
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

/** 异界勇者的预设编号 */
const IKA_SIM_ID = 211;
/** 召唤费 */
const SUMMON_FEE = 1500;
/** 男性档/扶她档的素质编号 */
const MALE_TALENT = 122;
const FUTA_TALENT = 121;
/** 强行召唤的勋章槽（exp:0:81，勋章经验） */
const MEDAL_EXP = 81;
/** 异界人的编号段（[10000, 100000)，上界开区间） */
const IKAI_IDS = { start: 10000, end: 100000 };
/** 强行召唤的每枚勋章费用 */
const IKAI_COIN_RATE = 2000;
/** 强行召唤的最低勋章数 */
const IKAI_MIN_COINS = 3;
/** 强行召唤的编号取模 */
const IKAI_MOD = 10000;
/** 强行召唤的编号除数 */
const IKAI_DIVISOR = 5;
/** 性别选择的选项上限（调试档的 99 未移植） */
const SEX_MAX = 3;
/** 名字字段宽 */
const NAME_WIDTH = 14;
/** 编号字段宽 */
const NUM_WIDTH = 2;
/** 一览每行几个 */
const COLUMNS = 5;

/** TALENT 读数缺省处理（#13） */
function talent(cid, idx) {
  return era.get(`talent:${cid}:${idx}`) || 0;
}

/** 读预设角色的「名前」（chara-name.js 先例） */
function csv_name(no) {
  const preset = era.get(`chara:${no}`);
  return String(preset?.name ?? '');
}

/** 该编号的角色预设是否已定义（引擎的 staticData.chara） */
function exist_csv(no) {
  return era.getAllCharacters().includes(no);
}

/**
 * 找一个「预设编号 = no」的在场角色。
 * ere 侧角色号 = 预设号（#21 的扁平化），故命中即返回该编号本身，
 * 未命中返回 -1。
 * @param {number} no 预设编号
 * @returns {number}
 */
function findchara_no(no) {
  return era.getAddedCharacters().includes(no) ? no : -1;
}

/**
 * show_shop_chara：异界召唤系列两个画面的公共头行。
 */
function show_shop_chara() {
  // 本屏的分隔线走实线
  era.print('异界召唤');
  era.print('《需要勋章经验来激活次元大门，并支付一定金钱来召唤异次元的勇者》');
  era.drawLine({ isSolid: true });
  era.print(
    `${era_flag.day_count + 1}日${era_flag.time === 0 ? ' 午前' : ' 午后'}`,
  );
  era.print(
    `所持金：${era_flag.money}点\t\t勋章：${era.get(`exp:0:${MEDAL_EXP}`) || 0}点`,
  );
  era.drawLine({ isSolid: true });
}

/**
 * chara_ikai_cost：强行召唤的价钱。`l_i % 10000 / 5`（截断）
 * 即所需勋章数、下限 3；金钱 = 勋章 × 2000。
 *
 * @param {number} l_i 目标编号
 * @returns {[number, number]} [勋章数, 金钱]
 */
function chara_ikai_cost(l_i) {
  let c = Math.trunc(Math.trunc(l_i % IKAI_MOD) / IKAI_DIVISOR);
  if (c < IKAI_MIN_COINS) {
    c = IKAI_MIN_COINS;
  }
  return [c, c * IKAI_COIN_RATE]; // RETURN C,D
}

/**
 * char_ikai_append：把编号 arg 的角色加入并做异界人初始化。
 *
 * 暂存 target、初始化后还原（era_flag.target 是可读写的具名状态）。
 *
 * @param {number} arg 角色预设编号
 * @param {(n: number) => number} [rand] 随机源（透传给 char_init）
 * @returns {Promise<number>} 新角色号
 */
async function char_ikai_append(arg, rand) {
  era.addCharacter(arg); // ADDCHARA ARG
  const saved_target = era_flag.target; // LOCAL = TARGET
  // CALL ADDCHARA_EX, CHARANUM-1（扁平化直传）：拼名调用对「没有
  // CHARA_EX_<N> 这个函数」的编号是**静默无操作**——异界人的 10000+
  // 编号不在 DECLARED_CHARA_IDS 里；ere 的注册表对声明空间外直接抛错
  //（拼写错误防线），故这里先查空间再调
  if (DECLARED_CHARA_IDS.includes(arg)) {
    await add_chara_ex(arg);
  }
  era_flag.target = arg; // TARGET = CHARANUM - 1
  const a = arg; // A = CHARANUM - 1
  await char_init(a, rand); // CALL CHAR_INIT（rand 显式传参）
  chara(a).invasion.状态 = 0; // CFLAG:A:1 = 0
  era_flag.target = saved_target; // TARGET = LOCAL
  return a; // RETURN A
}

/**
 * char_ikai_create：调试档的「强行从异世界召唤」。
 *
 * 发布构建里没有入口（文件头），函数体完整实现：选编号 → 校验在场/价位
 * → 扣勋章与金钱 → char_ikai_append。
 *
 * @param {(n: number) => number} [rand] 随机源（透传给 char_init）
 * @returns {Promise<number>} 恒 0
 */
async function char_ikai_create(rand) {
  era.drawLine({ isSolid: true });
  era.print('强行从异世界召唤魔王想要召唤的人');
  era.print('这将耗费不少的金钱以及更多的勋章');
  era.drawLine({ isSolid: true });
  era.print('');
  await era.waitAnyKey(); // WAIT

  for (;;) {
    show_shop_chara();
    let columns = 0; // LOCAL = 0
    // 一览：有预设、且不在场的编号
    let row = '';
    for (let l_i = IKAI_IDS.start; l_i < IKAI_IDS.end; l_i += 1) {
      if (!exist_csv(l_i)) {
        continue; // SIF !EXISTCSV(L_I) → CONTINUE
      }
      if (findchara_no(l_i) > 0) {
        continue; // SIF A > 0 → CONTINUE
      }
      const [coins, money] = chara_ikai_cost(l_i);
      // 格首有一个半角空格，是有意的字面文本（逐字比对钉住）：命令名后
      // 的两个空格只有一个充当分隔，第二个属于正文（黄金样本里主菜单的
      // 行首空格、单空格行都是这条规则的旁证）
      row +=
        ` [${pad_left(String(l_i), NUM_WIDTH)}] ` +
        `${pad_display(csv_name(l_i), NAME_WIDTH)}` +
        `(${coins}勋章&${money}金)`;
      columns += 1;
      if (columns % COLUMNS === 0) {
        era.print(row); // SIF LOCAL % 5 == 0 → PRINTL
        row = '';
      }
    }
    if (row !== '') {
      era.print(row); // SIF !LINEISEMPTY() → PRINTL
    }

    era.drawLine({ isSolid: true });
    // 列表轮的 [999] 返回保持纯文本（#572）：本轮的有效编号是上面那些
    // 勇者行的 `[编号]`（格行拼行，编号即输入值），单给这行打按钮会把
    // 白名单收成 999、异界勇者的编号当场被拒收。整轮按钮化要先重排格行。
    era.print('[999] 返回');

    // 输入默认值 1：只有「空回传」按默认值 1 处理——显式键入的
    // 0 是合法值，不能被 `|| 1` 吞掉（文件头）
    const raw = await era.input();
    const result =
      raw === undefined || raw === null || raw === '' || Number.isNaN(raw)
        ? 1
        : raw;
    if (result === 999) {
      return 0; // CASE 999
    }
    const l_i = result; // CASEELSE：L_I = RESULT

    if (!exist_csv(l_i)) {
      continue;
    }

    let a = -1; // A = -1
    // 已登录的角色（编号段内才查）
    // 这里的在库检查是闭区间（含 100000）——与上面一览循环的开区间
    // 上界不同，别顺手抄成 `< IKAI_IDS.end`（100000 且在库时会重复收费入队）
    if (l_i >= IKAI_IDS.start && l_i <= IKAI_IDS.end) {
      a = findchara_no(l_i);
    }
    if (a < 0) {
      // 登录新角色：价钱与勋章两道闸
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
      era_flag.money -= money;
      era_exflag.legit_money -= money;
      era.set(
        `exp:0:${MEDAL_EXP}`,
        (era.get(`exp:0:${MEDAL_EXP}`) || 0) - coins,
      );
      a = await char_ikai_append(l_i, rand);
      era.print('*****************************************');
      era.print(`${era.get(`callname:${a}:-1`) ?? ''}被你强行召唤了………`);
      era.print('*****************************************');
      await era.waitAnyKey(); // PRINTW
    }
    return 0; // 成交或在库分支结束后直接到函数尾
  }
}

/**
 * chara_sim_shop：异界勇者的召唤流程。
 *
 * @param {(n: number) => number} [rand] 随机源（透传给 char_make）
 * @returns {Promise<number>} 恒 0
 */
async function chara_sim_shop(rand) {
  // TFLAG:100/101/102 = 0（与怪物商店同一组槽位，见文件头）
  shop_state.race = 0;
  shop_state.race2 = 0;
  shop_state.chosen = 0;

  // 性别选择
  let sex_coin = 0;
  for (;;) {
    show_shop_chara();
    era.print('请选择要召唤的勇者的性别');
    // 性别三选一与返回是列排版纯文本选项 → 一并升格为按钮
    // （PR #53 通则，正文不写 [编号]；#572）
    era.printButton('男性', 1);
    era.printButton('女性', 2);
    era.printButton('扶她', 3);
    // [IF_DEBUG] 的 [99] 强行召唤不移植（文件头）
    era.drawLine({ isSolid: true });
    era.printButton('返回', 999);
    const result = await era.input();
    if (result === 999) {
      clear_shop();
      return 0;
    }
    // `RESULT > 3 && RESULT != 99`——99 是未移植的调试档，条件退化为 > 3
    if (result > SEX_MAX) {
      continue;
    }
    sex_coin = result;
    if (result === 0) {
      continue;
    }
    break;
  }

  // —— 加人循环 ——
  for (;;) {
    show_shop_chara();
    // SEXCOIN == 99 → 进 char_ikai_create（调试档，文件头）

    const chara_id = IKA_SIM_ID; // CHARA = 211
    era.addCharacter(chara_id); // ADDCHARA CHARA
    await add_chara_ex(chara_id); // CALL ADDCHARA_EX, CHARANUM-1
    const a = chara_id; // A = CHARANUM - 1（扁平化）
    if (sex_coin === 1) {
      era.set(`talent:${a}:${MALE_TALENT}`, 1);
    }
    if (sex_coin === 3) {
      era.set(`talent:${a}:${FUTA_TALENT}`, 1);
    }
    await char_make(a, 0, 0, rand); // CALL CHAR_MAKE; A = RESULT
    chara(a).invasion.状态 = 0;
    if ((era.get(`cflag:${a}:151`) || 0) < -100) {
      chara(a).chara.善恶值 = -100; // 善良値調整
    }

    era.print('*****************************************');
    era.print(`${chara_callname(a)}回应了你的召唤………`);
    era.print('*****************************************');
    await era.waitAnyKey(); // PRINTW
    // -2 = 贡品信息页（#390 起真身）。rand 一路透传：标题的身体数据生成吃随机
    await show_chara_info(a, -2, rand);
    era.print(`确定要召唤${chara_callname(a)}么？`);
    era.print('');
    era.print('');
    const gender_word = talent(a, MALE_TALENT) !== 0 ? '他' : '她';
    // 确认召唤的两项 → 按钮（PR #53 通则，正文不写 [编号]；#572）
    era.printButton(`就是${gender_word}了`, 0);
    era.printButton('再换一个（花费1500）', 1);

    const result = await era.input();
    if (result === 1) {
      // 再换一个
      if (era_flag.money <= SUMMON_FEE) {
        era.print('金钱不够！');
        await era.waitAnyKey();
        return 0;
      }
      await party_char_del(a);
      era.removeCharacter(a);
      era_flag.money -= SUMMON_FEE;
      era_exflag.legit_money -= SUMMON_FEE;
      name_reset(); // CALL NAME_RESET
      continue; // 回加人循环头
    }
    if (result === 0) {
      // 就是（成交）：金钱与勋章两道闸，随后扣款
      if (era_flag.money <= SUMMON_FEE) {
        era.print('金钱不够！');
        await era.waitAnyKey();
      } else if ((era.get(`exp:0:${MEDAL_EXP}`) || 0) < 1) {
        era.print('勋章不够！');
        await era.waitAnyKey();
      } else {
        era_flag.money -= SUMMON_FEE;
        era_exflag.legit_money -= SUMMON_FEE;
        era.set(`exp:0:${MEDAL_EXP}`, (era.get(`exp:0:${MEDAL_EXP}`) || 0) - 1);
        if ((era.get(`cflag:${a}:999`) || 0) === 0) {
          chara(a).stronghold.异界召唤标记 = 1;
        }
      }
    }
    return 0;
  }
}

/**
 * select_chara：种族 → 商品陈列 → buy_chara。
 * 与 page-monster-shop.js 的 select_follower 同形，只差两道检查（文件头）。
 *
 * @param {number} arg0 种族选择的输入
 * @param {(n: number) => number} [rand] 随机源
 * @returns {Promise<number>} 1 = 买定、0 = 退回种族选择
 */
async function select_chara(arg0, rand) {
  return select_follower({ arg0, show: show_shop_chara, guard: false, rand });
}

/**
 * buy_chara：挑祭品、付钱、召唤（与 buy_follower 同形）。
 * @param {(n: number) => number} [rand] 随机源
 * @returns {Promise<number>} 1 = 成交、0 = 取消或祭品不足
 */
async function buy_chara(rand) {
  return buy_follower({ show: show_shop_chara, rand });
}

module.exports = {
  chara_sim_shop,
  show_shop_chara,
  select_chara,
  buy_chara,
  char_ikai_create,
  char_ikai_append,
  chara_ikai_cost,
};
