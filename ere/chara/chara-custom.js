/**
 * @file 角色创建入口与追加（issue #392，N8 段 2）。
 *
 * 源: target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB
 *     @CHAR_CREATE（:17-98）、@CHAR_APPEND（:103-269）
 *
 * **@CHAR_DEBUG（同文件 :1-15）不移植**：它是 [IF_DEBUG] 的世界观调试面板，
 * docs/stub-registry.md 已判「不移植（调试功能）」，运行时占位留在
 * ere/page/page-chara-info.js:806（CHARA_INFO 的 CASE 99）。本文件因此不导出
 * 它——那一行不改（#393 正在改同一个文件）。
 *
 * 调用面（两条外部边，本票只做前者）：
 *   - `char_create(arg)` 是**跨域入口**：SHOP/SHOP_LABO ver1.0.2.ERB:164 的
 *     `CALL CHAR_CREATE(0)` 属于 #398（N14），届时经
 *     `require('#/chara/chara-custom').char_create` 接上；
 *   - `char_append(arg, mode)` 是本文件内部件（@CHAR_CREATE 的 :93）。
 *
 * @CHAR_CREATE 的 ARG 语义（源 :22/:46/:103-272/:103-272/:237 五处判据一致）：
 *   0 = 付费定制（SHOP_LABO 的购买路径：列「勇者」与「精英」两段、定价、
 *       可取消），1 = 调试/免费（CHAR_DEBUG 的登录路径：多列一段「特殊」、
 *       勇者走 `CALL CHAR_MAKE` 随机成型、不问性别与名字）。
 *
 * 移植说明（有意偏离，均注明依据）：
 *
 *   - **列表是「一次 print 一行」**：源 :30-33 的 `PRINTFORM` 逐格打印、靠
 *     `SIF L_I % 4 == 0 PRINTL` 断行；EraElectron 一次 `era.print` 就是一行
 *     （look.js 文件头的「PRINT 合流」条），故按 4/5 格拼成整行输出。随之
 *     `SIF !LINEISEMPTY() PRINTL`（:17-102/:17-102/:17-102）失去对应物——残行本来就是
 *     一整行，不再需要补断行。
 *   - **`ELSE L_I = RESULT`（:17-102）保留**：`SELECTCASE` 的兜底臂把任意
 *     输入直接当素质编号，随后由 `!EXISTCSV` 拦下（:80-83）——这条兜底是
 *     可测的（输入 35 → 预设 35 在库 → 走「特殊」段的非调试路径）。
 *   - **`FINDCHARA(NO, L_I)` 落成「已在场」判定**：ere 的角色 ID 即原作 NO
 *     （chara-ex.js / chara-name.js 的既定判定标准），故 A = L_I 若它在
 *     `getAddedCharacters()`，否则 -1（chara-make-inport.js:136 同款）。
 *   - **`CSVNAME(n)` / `EXISTCSV(n)`**：前者读静态预设的「名前」
 *     （`era.get('chara:n')`，chara-name.js:105 同款），后者问
 *     `getAllCharacters()`（引擎 `getAllCharacters = Object.keys(staticData.chara)`）。
 *   - **跨域写走门面**（#71）：CFLAG:1（invasion）、CFLAG:9（chara 域内）、
 *     CFLAG:11-14（dungeon）、CFLAG:15/16（train）、ABL:31（train）、
 *     EXP:0/5/10（dungeon）、BASE:0/1（dungeon）、FLAG:224（chara 域的
 *     flag 段，`game.chara.勇者入场_24`）一律经具名访问器；CFLAG:420/6/550
 *     与 TALENT/CSTR 的 chara 属主下标域内裸寻址（#70 读全部放行）。
 *   - **随机源提成 `rand` 形参**（chara-init.js 先例）：源 :103-272/:103-272/:103-272/:103-272
 *     四处 `RAND:80`。
 */

'use strict';

const era = require('#/era-electron');
const { add_chara_ex } = require('#/chara/chara-ex');
const { char_init } = require('#/chara/chara-init');
const { char_make } = require('#/chara/char-make');
const { char_custom } = require('#/chara/chara-custom2');
const { char_body_generate_wapped } = require('#/chara/chara-body');
const { chara_name_random_define } = require('#/chara/chara-name');
const { wearing_cloth_able } = require('#/system/train/cloth');
const { st_up } = require('#/dungeon/dungeon-lvup');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const era_flag = require('#/era-utils/era-flag');
const { chara_callname } = require('#/utils/callname-utils');

/**
 * 本文件存根化的原作调用名：无——@CHAR_CREATE 与 @CHAR_APPEND 全部落地，
 * 内部依赖（CHAR_MAKE / CHAR_INIT / WEARING_CLOTH_ABLE / CHAR_BODY_GENERATE_WAPPED /
 * ST_UP / ADDCHARA_EX / CHARA_NAME_RANDOM_DEFINE）都是真身。
 */
const STUBBED_CALLS = [];

const default_rand = (n) => Math.floor(Math.random() * n);

/** 「勇者」段的每行格数（源 :31 `SIF L_I % 4 == 0`） */
const HERO_COLUMNS = 4;
/** 「精英」与「特殊」段的每行格数（源 :40/:54 `% 5 == 0`） */
const ELITE_COLUMNS = 5;
/** 名字长度上限（源 :253 `CASE IS > 16`） */
const NAME_MAX_LENGTH = 16;

/** 显示宽度（全角 2 / 半角 1） */
function disp_width(text) {
  let width = 0;
  for (const ch of text) {
    width += ch.codePointAt(0) > 0xff ? 2 : 1;
  }
  return width;
}

/** `{A,N}`：右对齐补位 */
function pad_left(text, width) {
  return ' '.repeat(Math.max(0, width - disp_width(text))) + text;
}

/** `%S,N,LEFT%`：左对齐补位 */
function pad_right(text, width) {
  return text + ' '.repeat(Math.max(0, width - disp_width(text)));
}

/** `EXISTCSV(n)`：预设编号在库（= 引擎 staticData.chara 的键集） */
function exist_csv(index) {
  return era.getAllCharacters().includes(index);
}

/** `CSVNAME(n)`：预设的「名前」（chara-name.js:105 同款读法） */
function csv_name(index) {
  const preset = era.get(`chara:${index}`);
  return String(preset?.name ?? '');
}

/** `FINDCHARA(NO, n)`：编号 n 的角色已在场则回它，否则 -1（文件头） */
function find_chara(index) {
  return era.getAddedCharacters().includes(index) ? index : -1;
}

/** STRLENS 的等价物（码点计数；全角一字算 1） */
function strlens(text) {
  return Array.from(String(text ?? '')).length;
}

/**
 * 拼一段编号列表（源 :29-35 一类）：每 `columns` 格一行。
 *
 * @param {number[]} entries [显示编号, 预设编号]
 * @param {number} columns 每行格数
 * @returns {string[]} 每行一个字符串
 */
function build_rows(entries, columns) {
  const rows = [];
  let current = '';
  entries.forEach(([label, preset], i) => {
    current += `[${pad_left(String(label), 2)}] ${pad_right(csv_name(preset), 14)}`;
    if ((i + 1) % columns === 0) {
      rows.push(current);
      current = '';
    }
  });
  if (current.length > 0) {
    rows.push(current);
  }
  return rows;
}

/**
 * @CHAR_CREATE（:17-98）：生命摇篮——列出可登录的预设并交出定制权。
 *
 * @param {number} arg 0 = 付费定制 / 1 = 调试登录（文件头）
 * @param {(n: number) => number} [rand] RAND 的随机源（本函数内不用，传给下游）
 * @returns {Promise<number>} 0（:69 `RETURN 0` 的返回支）；其余出口落到
 *   @CHAR_CUSTOM 或返回角色号
 */
async function char_create(arg, rand = default_rand) {
  era.drawLine(); // :17-102
  era.print('使用神奇的生命摇篮，凭空创造出一体生物'); // :20
  era.print('这生物的一切，完全由魔王大人您自己凭喜好定制'); // :21
  if (arg === 0) {
    era.print('这将耗费大量的金钱，幸好只看不买是免费的'); // :22-23
  }
  era.drawLine(); // :17-102
  era.println(); // :17-102
  await era.waitAnyKey(); // :26 WAIT

  era.print('■=== 勇者 ===■'); // :28
  for (const row of build_rows(
    Array.from({ length: 8 }, (_, i) => [i + 1, i + 1]), // :29 FOR L_I, 1, 9
    HERO_COLUMNS,
  )) {
    era.print(row); // :30-33
  }

  era.print('■=== 精英 ===■'); // :37
  for (const row of build_rows(
    Array.from({ length: 10 }, (_, i) => [i + 21, i + 201]), // :38 FOR L_I, 1, 11
    ELITE_COLUMNS,
  )) {
    era.print(row); // :39-42
  }

  if (arg === 1) {
    // :46-59 特殊段（仅调试登录）：17-39 里在库且在用的预设，18/19 排除
    era.print('■=== 特殊 ===■'); // :47
    const special = [];
    for (let i = 17; i < 40; i += 1) {
      if (!exist_csv(i) || i === 19 || i === 18) {
        continue; // :50-51
      }
      special.push([i + 20, i]); // :52
    }
    for (const row of build_rows(special, ELITE_COLUMNS)) {
      era.print(row); // :52-55
    }
  }

  era.drawLine(); // :17-102
  era.print(' [999] 返回'); // :62 PRINT（同一行的收尾由下一行的 INPUT 承接）

  // :17-102 $INPUT_LOOP
  for (;;) {
    const result = await era.input(); // :65 INPUT 1
    let index;
    if (result === 999) {
      return 0; // :68-69
    } else if (result >= 1 && result <= 16) {
      index = result; // :17-102
    } else if (result >= 21 && result <= 30) {
      index = result - 20 + 200; // :72-73
    } else if (result >= 37 && result <= 60) {
      index = result - 20; // :74-75
    } else {
      index = result; // :17-102（兜底臂，文件头）
    }

    if (!exist_csv(index)) {
      await era.clear(1); // :81 CLEARLINE 1（抹掉刚回显的输入行）
      continue; // :17-102 GOTO INPUT_LOOP
    }

    let target = -1; // :85
    if (index >= 17 && index <= 40) {
      target = find_chara(index); // :88-89
    }
    if (target < 0) {
      target = await char_append(index, arg); // :93-94
      era.print(`你召唤出了${chara_callname(target)}……`); // :95 PRINTFORMW
      await era.waitAnyKey();
    }
    await char_custom(target, arg, rand); // :98
    return target;
  }
}

/**
 * @CHAR_APPEND（:103-269）：把预设加进来，并按编号走各自的初始化。
 *
 * @param {number} arg 预设编号（源 ARG，需保证可用）
 * @param {number} mode 源 ARG:1（0 = 付费定制 / 1 = 调试登录）
 * @param {(n: number) => number} [rand] RAND:80 的随机源（:103-272/:103-272/:103-272/:103-272）
 * @returns {Promise<number>} 新角色号（源 :269 `RETURN A`）
 */
async function char_append(arg, mode, rand = default_rand) {
  era.addCharacter(arg); // :104 ADDCHARA ARG
  await add_chara_ex(arg); // :105 CALL ADDCHARA_EX, CHARANUM-1
  const previous_target = era_flag.target; // :106 LOCAL = TARGET
  const cid = arg; // :103-272 A = CHARANUM-1（扁平化下角色号 = 预设号）
  era_flag.target = cid; // :107 TARGET = CHARANUM-1

  // :110 SELECTCASE ARG
  if (arg >= 1 && arg <= 16) {
    // :111-114 勇者
    if (mode === 1) {
      await char_make(cid, 0, 0, rand); // :103-272-114 CALL CHAR_MAKE
    }
  } else if (arg >= 201 && arg <= 210) {
    // :116-121 精英部下
    if (mode === 1) {
      await char_make(cid, 0, 0, rand); // :103-272-119 CALL CHAR_MAKE
    }
  } else if (arg === 17) {
    // :123-137 玛奥（REF ENTER_ENEMY.ERB）
    era.set(`cflag:${cid}:420`, 1); // :127 CFLAG:420（chara 域内，无门面；全库只写不读）
    chara(cid).chara.等级 = 1; // :129 CFLAG:9
    chara(cid).invasion.状态 = 0; // :130 CFLAG:1
    chara(cid).dungeon.攻击力 = 15; // :131 CFLAG:11
    chara(cid).dungeon.防御力 = 15; // :132 CFLAG:12
    chara(cid).chara.基础攻击 = 15; // :133 CFLAG:13（chara 域内）
    chara(cid).chara.基础防御 = 15; // :134 CFLAG:14
    chara(cid).train.初吻对象 = -1; // :135 CFLAG:16
    char_body_generate_wapped(17, rand); // :137 CALL CHAR_BODY_GENERATE_WAPPED, 1
  } else if (arg === 24) {
    // :139-148 莉莉（REF ENTER_ENEMY.ERB）
    chara(cid).chara.武装 = 40; // :103-272 CFLAG:A:550（初期装備：剑）
    era_flag.target = cid; // :103-272 TARGET = A
    wearing_cloth_able(cid); // :103-272 CALL WEARING_CLOTH_ABLE
    char_body_generate_wapped(cid, rand); // :103-272
  } else if (arg >= 20 && arg <= 23) {
    // :150-218 扑克牌（REF ARCANA_FORT）
    await append_card(cid, arg, rand); // :153-208
    wearing_cloth_able(cid); // :103-272 衣装全装備
    char_body_generate_wapped(cid, rand); // :103-272

    // :210-215 等级调整：FLAG:60 的勇者基础等级修正逐级 ST_UP
    const base_level = era.get('flag:60') || 0;
    for (let i = 0; i < base_level; i += 1) {
      st_up(cid, rand); // :213 CALL ST_UP, A
    }
    // :217-218 四张牌的数值直接取上限（BASE = MAXBASE）
    chara(cid).dungeon.体力 = chara(cid).dungeon.体力上限; // :217 BASE:A:0
    chara(cid).dungeon.气力 = chara(cid).dungeon.气力上限; // :218 BASE:A:1（上限访问器见 facade/chara-dungeon.js 手写区）
  } else if ((arg >= 31 && arg <= 33) || arg === 35) {
    // :220-222 贡品（REF ENDING.ERB）
    await char_init(cid, rand); // :222 CALL CHAR_INIT
  } else if (arg === 34) {
    // :223-234 狂王替身 葵希罗
    game.chara.勇者入场_24 = 1; // :225 FLAG:224
    era_flag.target = cid; // :103-272 TARGET = A
    wearing_cloth_able(cid); // :103-272
    char_body_generate_wapped(cid, rand); // :103-272
  }

  if (mode === 0) {
    // :237-265 付费路径才问性别与名字
    era.print('请问登陆的角色是什么性别呢？'); // :238 PRINTFORMW
    await era.waitAnyKey();
    era.drawLine(); // :103-272
    era.print('[1] 男性      [2] 女性      [3] 扶她'); // :240
    await era.waitAnyKey();
    const gender = await era.input(); // :103-272
    if (gender === 1) {
      era.set(`talent:${cid}:122`, 1); // :242-243 男人
    }
    if (gender === 3) {
      era.set(`talent:${cid}:121`, 1); // :244-245 扶她
    }
    era.drawLine(); // :103-272

    // :103-272 $INPUT_LOOP
    for (;;) {
      era.print('新建人物的名字是？（不输入将随机生成名字）'); // :248
      const raw = await era.input(); // :249 INPUTS
      chara_name_random_define(cid, -1, rand); // :103-272（先掷一个随机名打底）
      const name = raw === undefined || raw === null ? '' : String(raw); // :251
      const length = strlens(name);
      if (length > NAME_MAX_LENGTH) {
        era.print('名字太长，请使用全角八字以下的名字。'); // :254 PRINTFORMW
        await era.waitAnyKey();
        continue; // :103-272 GOTO INPUT_LOOP
      }
      if (length > 0) {
        era.print(`新建人物今后被称呼为${name}。`); // :257
        await era.waitAnyKey();
        era.set(`callname:${cid}:-2`, name); // :258 CALLNAME:A
        era.set(`callname:${cid}:-1`, name); // :259 SAVESTR:A / :260 NAME:A
      } else {
        chara_name_random_define(cid, -1, rand); // :103-272
        era.print(`新建人物今后被称呼为${chara_callname(cid)}。`); // :263
        await era.waitAnyKey();
      }
      break;
    }
  }
  chara(cid).invasion.状态 = 0; // :266 CFLAG:A:1 = 0
  era_flag.target = previous_target; // :268 TARGET = LOCAL（还原）
  return cid; // :269 RETURN A
}

/**
 * @CHAR_APPEND 的 :150-208 段：四张扑克牌各自的初始装备与经验。
 *
 * @param {number} cid 角色号
 * @param {number} arg 预设编号（20-23）
 * @param {(n: number) => number} rand RAND:80 的随机源
 */
async function append_card(cid, arg, rand) {
  if (arg === 22) {
    // :153-161 東の砦 黑方片 &1：剑 +9000 + 暗黒接頭語
    chara(cid).chara.武装 = 40; // :103-272
    chara(cid).chara.武装 += 9000; // :103-272
    chara(cid).chara.武装 += 900000; // :159
    chara(cid).chara.随机名编号 = rand(80); // :103-272 CFLAG:A:6
  } else if (arg === 23) {
    // :162-173 西の砦 白梅花 &4：法杖 + アイス
    chara(cid).train.自慰中毒 = 1; // :164 ABL:A:31
    chara(cid).dungeon.自慰经验 = 30; // :165 EXP:A:10
    chara(cid).chara.武装 = 41; // :167
    chara(cid).chara.武装 += 9000; // :103-272
    chara(cid).chara.武装 += 600000; // :171
    chara(cid).chara.随机名编号 = rand(80); // :103-272
  } else if (arg === 21) {
    // :174-184 南の砦 银黑桃 &2：手里剑 + デス
    chara(cid).dungeon.自慰经验 = 10; // :176
    chara(cid).chara.武装 = 44; // :178
    chara(cid).chara.武装 += 9000; // :103-272
    chara(cid).chara.武装 += 300000; // :182
    chara(cid).chara.随机名编号 = rand(80); // :103-272
  } else if (arg === 20) {
    // :185-200 北の砦 金红桃 &8：细剑 + スラッシュ
    chara(cid).dungeon.私处经验 = 20; // :187 EXP:A:0
    const king_flag = era.get('flag:500') || 0;
    if (king_flag === 0 || king_flag === 2) {
      chara(cid).dungeon.性交经验 = chara(cid).dungeon.私处经验; // :189-190
    }
    chara(cid).train.初体验对象 = 105; // :192 CFLAG:A:15（初体験の相手は狂王）
    chara(cid).chara.武装 = 50; // :194
    chara(cid).chara.武装 += 10000; // :196
    chara(cid).chara.武装 += 400000; // :198
    chara(cid).chara.随机名编号 = rand(80); // :103-272
  }
}

module.exports = {
  STUBBED_CALLS,
  HERO_COLUMNS,
  ELITE_COLUMNS,
  char_create,
  char_append,
};
