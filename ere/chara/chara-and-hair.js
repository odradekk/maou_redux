/**
 * @file 性格与发色的读写面板（issue #392，N8 段 2）。
 *
 * 源: target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB 的 9 个函数：
 *     @SHOW_CHARASTERISTIC（:7-23）、@SET_RANDOM_CHARASTERISTIC（:28-46）、
 *     @SET_CHARASTERISTIC（:52-63）、@CLEAR_CHARASTERISTIC（:68-78）、
 *     @CHOOSE_CHARASTERISTIC（:84-122）、@SHOW_HAIRCOLOR（:127-138）、
 *     @SET_RANDOM_HAIRCOLOR（:143-189）、@SET_HAIRCOLOR（:194-202）、
 *     @CHOOSE_HAIRCOLOR（:207-236）
 *
 * 调用面（全库唯一调用方）：ere/chara/chara-make.js 的 `rand_chara_make`
 * （源 CHARA_MAKE.ERB:67/:71/:42-194/:85/:42-194/:42-194/:97/:42-194/:112/:118，@RAND_CHARA_MAKE
 * 的形象确认段）。#392 把该处八条存根换成本模块的真身。
 *
 * 移植说明（有意偏离，均注明依据）：
 *
 *   - **TARGET 隐式读改写显式 cid**（#5 决议第六条：指针不隐式读全局）：
 *     源里 `CHARA_ID =( ARG:0 < 0 )?( TARGET )#( ARG:0 )` 的「省略实参 =
 *     操作 TARGET」保留（`cid < 0` 时读 `era_flag.target`），其余一律形参。
 *   - **两个 `@DIM` 局部量的跨调用状态**：`@PRINT_SINGLE_TALENT` 式的
 *     「LOCAL 跨调用累加」在本文件里**不存在**——这 9 个函数的 LOCAL/LOCALS
 *     都在函数体内先赋值后使用（:84-126 `LOCAL:1 = 0` 起、:143-193 起、:207-236 起），
 *     故一律落 JS 局部。
 *   - **两处列表是纯文本行 + INPUT，不升级为按钮**：源 :103 / :219 用的是
 *     `PRINTFORM`（不是 `PRINTBUTTON`），点击不是入口、按键才是——按 page
 *     的 PR #53 通则只把「按钮化过的项」升级为 `era.printButton`，这里保持
 *     文本行。`[N]` 编号写在正文里（原作如此），不经引擎的 showAcc 补位。
 *   - **补位按显示宽度**（全角 2 / 半角 1，左对齐补半角空格）：源 :103 的
 *     `[{LOCAL:0,2}] %TALENTNAME:TALENT_ID, 10, LEFT%` 与 :219 的
 *     `[{COLOR_ID,2}] %ARR_HAIRCOLOR:COLOR_ID, 7, LEFT%` 是 Emuera 的
 *     FORM 位数语法（expressions.md「FORM 语法中的位数和对齐」）。
 *   - **随机源提成 `rand` 形参**（chara-init.js 先例）：源 :41 的
 *     `RAND( VARSIZE("ID_OF_GENERAL_CHARASTERISTICS") )` 与 :161 的
 *     `RAND:100` 缺省均匀随机，测试注入定值序。
 *   - **`TALENT:CHARA_ID:0`（输入越界一项）**：源 :117 的判据是
 *     `RESULT < 0 || RESULT > SIZE`，`RESULT == SIZE` 放行；此时
 *     `ID_OF_GENERAL_CHARASTERISTICS:(RESULT)` 读到表外，Emuera 给 0，
 *     于是写的是素质 0（処女）。1:1 保留这个端（`?? 0`）。
 */

'use strict';

const era = require('#/era-electron');
const { chara } = require('#/facade/chara');
const era_flag = require('#/era-utils/era-flag');

/**
 * 本文件存根化的原作调用名：无——9 个函数全部落地，调用的只有引擎 API。
 * docs/stub-registry.md 的核对测试读这个导出（loOK.js 同款）。
 */
const STUBBED_CALLS = [];

const default_rand = (n) => Math.floor(Math.random() * n);

/** ID_OF_GENERAL_CHARASTERISTICS（VARIABLES.ERH:6）：非唯一性格的素质编号表 */
const GENERAL_CHARASTERISTICS = [
  160, 161, 162, 163, 164, 166, 172, 173, 174, 175,
];

/** ARR_HAIRCOLOR（VARIABLES.ERH:9）：发色名表；0 号是空串（未设定） */
const ARR_HAIRCOLOR = [
  '',
  '金发',
  '栗发',
  '黑发',
  '红发',
  '银发',
  '蓝发',
  '绿发',
  '紫发',
  '白发',
  '暗金发',
  '粉发',
];

/** 未指定角色时用的 TARGET 指针（原作省略实参形态） */
function target_cid() {
  return era_flag.target;
}

/** `%TALENTNAME:n%`：素质名（引擎静态表 talent 的列名） */
function talentname(index) {
  return era.get(`talentname:${index}`) ?? '';
}

/** 读取素质（#13：未声明下标读回 undefined，兜底 0） */
function talent(cid, index) {
  return era.get(`talent:${cid}:${index}`) || 0;
}

/**
 * 写素质。
 *
 * 174/175（貴公子 / 伶俐）属 system 域（ownership/talent-cross-domain-writes.yml
 * 的 `talent` 174/175 条在案），走 `chara(cid).system` 的具名访问器；其余是
 * chara 属主下标，域内裸寻址即合法（#70）。
 *
 * @param {number} cid 角色 ID
 * @param {number} index 素质下标
 * @param {number} value 值
 */
function set_talent(cid, index, value) {
  if (index === 174) {
    chara(cid).system.贵公子 = value;
  } else if (index === 175) {
    chara(cid).system.伶俐 = value;
  } else {
    era.set(`talent:${cid}:${index}`, value);
  }
}

/** 显示宽度（全角 2 / 半角 1） */
function disp_width(text) {
  let width = 0;
  for (const ch of text) {
    width += ch.codePointAt(0) > 0xff ? 2 : 1;
  }
  return width;
}

/** `{A,N}`：右对齐补位（默认对齐） */
function pad_left(text, width) {
  return ' '.repeat(Math.max(0, width - disp_width(text))) + text;
}

/** `%S,N,LEFT%`：左对齐补位 */
function pad_right(text, width) {
  return text + ' '.repeat(Math.max(0, width - disp_width(text)));
}

/**
 * @SHOW_CHARASTERISTIC（:7-23）：打印当前已设的性格名，返回它在表内的序号；
 * 一个都没设时返回 -1（调用方据此触发随机补设）。
 *
 * @param {number} [cid=-1] 角色 ID（源 ARG:0；< 0 时取 TARGET）
 * @returns {number} 表内序号（0-9）或 -1
 */
function show_charasteristic(cid = -1) {
  const chara_id = cid < 0 ? target_cid() : cid; // :7-27
  for (let i = 0; i < GENERAL_CHARASTERISTICS.length; i += 1) {
    const talent_id = GENERAL_CHARASTERISTICS[i]; // :7-27
    if (talent(chara_id, talent_id)) {
      era.print(talentname(talent_id)); // :19 PRINTFORM（不换行，见文件头）
      return i; // :20-21
    }
  }
  return -1; // :23
}

/**
 * @SET_RANDOM_CHARASTERISTIC（:28-46）：清空后随机设一条性格（174 貴公子不参与）。
 *
 * 源 :44 的 `GOTO CHARA_GENERAL_CHARASTERISTICS_FIRST` 回到 :33 的标号，
 * 即**重掷且重清**（标号在 CLEAR 之前）——1:1 保留在循环里。
 *
 * @param {number} [cid=-1] 角色 ID（源 ARG:0）
 * @param {(n: number) => number} [rand] RAND 的随机源，缺省均匀随机
 * @returns {number} 掷中的表内序号（源 :46 RETURN TEMP）
 */
function set_random_charasteristic(cid = -1, rand = default_rand) {
  const chara_id = cid < 0 ? target_cid() : cid;
  for (;;) {
    clear_charasteristic(chara_id); // :28-51
    const temp = rand(GENERAL_CHARASTERISTICS.length); // :41
    const talent_id = GENERAL_CHARASTERISTICS[temp];
    if (talent_id === 174) {
      continue; // :43-44
    }
    set_talent(chara_id, talent_id, 1); // :28-51
    return temp; // :46
  }
}

/**
 * @SET_CHARASTERISTIC（:52-63）：清空后按表内序号设一条性格（不做范围检查）。
 * @param {number} [cid=-1] 角色 ID（源 ARG:0）
 * @param {number} index 表内序号（源 ARG:1）
 */
function set_charasteristic(cid = -1, index) {
  const chara_id = cid < 0 ? target_cid() : cid;
  clear_charasteristic(chara_id); // :52-67
  const talent_id = GENERAL_CHARASTERISTICS[index]; // :62
  set_talent(chara_id, talent_id, 1); // :52-67
}

/**
 * @CLEAR_CHARASTERISTIC（:68-78）：把表内 10 条性格全部清零。
 * @param {number} [cid=-1] 角色 ID（源 ARG:0）
 */
function clear_charasteristic(cid = -1) {
  const chara_id = cid < 0 ? target_cid() : cid; // :68-83
  for (const talent_id of GENERAL_CHARASTERISTICS) {
    set_talent(chara_id, talent_id, 0); // :77
  }
}

/**
 * @CHOOSE_CHARASTERISTIC（:84-122）：列出性格供选择，每 N 项换行。
 *
 * 174 貴公子在列表里**整项跳过**（:100-102 的 GOTO 落在 :110 标号，
 * 即跳过打印与计数）——编号仍按表内序号摆，故列表里会缺一个号。
 *
 * @param {number} [cid=-1] 角色 ID（源 ARG:0）
 * @param {number} [per_line=3] 每行项数（源 ARG:1）
 * @returns {Promise<void>}
 */
async function choose_charasteristic(cid = -1, per_line = 3) {
  clear_charasteristic(cid); // :90 事前初期化
  const chara_id = cid < 0 ? target_cid() : cid; // :84-126

  let count = 0; // :84-126 LOCAL:1
  let row = '';
  const size = GENERAL_CHARASTERISTICS.length; // :97
  for (let i = 0; i < size; i += 1) {
    const talent_id = GENERAL_CHARASTERISTICS[i]; // :84-126
    if (talent_id === 174) {
      continue; // :100-102
    }
    // :103 每格是 `[{i,2}] %名,10,LEFT%`；源一行放 N 格（`SIF (LOCAL:1) %
    // (ARG:1) == 0 PRINTL` 才断行），故拼成整行再输出——引擎的「一次 print
    // 即一行」口径见 look.js 文件头的「PRINT 合流」条
    row += `[${pad_left(String(i), 2)}] ${pad_right(talentname(talent_id), 10)}`;
    count += 1; // :84-126
    if (count % per_line === 0) {
      era.print(row); // :84-126 PRINTL（本行满 N 格）
      row = '';
    }
  }
  if (row.length > 0) {
    era.print(row); // :112 之前先收残行（源里残行由 :112 的 PRINTL 收尾）
  }
  era.println(); // :112

  for (;;) {
    const result = await era.input(); // :84-126
    if (result < 0 || result > size) {
      continue; // :117-118
    }
    const chosen = GENERAL_CHARASTERISTICS[result] ?? 0; // :120（表外读 0，见文件头）
    set_talent(chara_id, chosen, 1); // :84-126
    return;
  }
}

/**
 * @SHOW_HAIRCOLOR（:127-138）：打印发色名，返回编号（未设定为 0）。
 * @param {number} [cid=-1] 角色 ID（源 ARG:0）
 * @returns {number} TALENT:300（发色编号）
 */
function show_haircolor(cid = -1) {
  const chara_id = cid < 0 ? target_cid() : cid; // :127-142
  const color_id = talent(chara_id, 300); // :135
  era.print(ARR_HAIRCOLOR[color_id] ?? ''); // :136
  return color_id; // :127-142
}

/**
 * @SET_RANDOM_HAIRCOLOR（:143-189）：按 RAND:100 的分档随机决定发色。
 *
 * 分档表逐条对照源 :161-186（注释里的百分比就是分档宽度；0 号粉髪 1%、
 * 98-99 銀髪 2%）。**没有 CASEELSE**——RAND:100 的值域恰好被 8 档盖满
 * （0-99），故本函数不会落空。
 *
 * @param {number} [cid=-1] 角色 ID（源 ARG:0）
 * @param {(n: number) => number} [rand] RAND:100 的随机源
 * @returns {number} 决定的发色编号（源 :143-193 RETURN COLOR_ID）
 */
function set_random_haircolor(cid = -1, rand = default_rand) {
  const chara_id = cid < 0 ? target_cid() : cid; // :143-193
  const roll = rand(100); // :161 SELECTCASE RAND:100
  let color_id = 0;
  if (roll === 0) {
    color_id = 11; // :162-164 粉髪
  } else if (roll <= 20) {
    color_id = 1; // :165-167 金髪
  } else if (roll <= 30) {
    color_id = 6; // :168-170 青髪
  } else if (roll <= 40) {
    color_id = 7; // :171-173 緑髪
  } else if (roll <= 60) {
    color_id = 2; // :174-176 栗毛
  } else if (roll <= 80) {
    color_id = 3; // :177-179 黒髪
  } else if (roll <= 97) {
    color_id = 4; // :180-182 赤毛
  } else {
    color_id = 5; // :183-185 銀髪（98-99）
  }
  set_talent(chara_id, 300, color_id); // :188
  return color_id; // :143-193
}

/**
 * @SET_HAIRCOLOR（:194-202）：直接设定发色（不做范围检查）。
 * @param {number} [cid=-1] 角色 ID（源 ARG:0）
 * @param {number} value 发色编号（源 ARG:1）
 * @returns {number} 回传 value（源 :202）
 */
function set_haircolor(cid = -1, value) {
  const chara_id = cid < 0 ? target_cid() : cid; // :194-206
  set_talent(chara_id, 300, value); // :201
  return value; // :202
}

/**
 * @CHOOSE_HAIRCOLOR（:207-236）：列出 1-11 号发色供选择，每 N 项换行。
 *
 * 源 :217 的 `SIZE = 12` 与 :232 的判据 `RESULT < 1 || RESULT > SIZE`
 * 允许输入 12——而 12 号没有名字（ARR_HAIRCOLOR 到 11 止）。1:1 保留。
 *
 * @param {number} [cid=-1] 角色 ID（源 ARG:0）
 * @param {number} [per_line=6] 每行项数（源 ARG:1）
 * @returns {Promise<void>}
 */
async function choose_haircolor(cid = -1, per_line = 6) {
  const chara_id = cid < 0 ? target_cid() : cid; // :207-236

  let count = 0; // :207-236 LOCAL:1
  let row = '';
  const size = 12; // :217
  for (let color_id = 1; color_id < size; color_id += 1) {
    // :219 每格是 `[{COLOR_ID,2}] %名,7,LEFT%`，一行 N 格（同 :103 的收行法）
    row += `[${pad_left(String(color_id), 2)}] ${pad_right(ARR_HAIRCOLOR[color_id] ?? '', 7)}`;
    count += 1; // :207-236
    if (count % per_line === 0) {
      era.print(row); // :207-236 PRINTL
      row = '';
    }
  }
  if (row.length > 0) {
    era.print(row);
  }
  era.println(); // :207-236

  for (;;) {
    const result = await era.input(); // :207-236
    if (result < 1 || result > size) {
      continue; // :232-233
    }
    set_talent(chara_id, 300, result); // :235
    return;
  }
}

module.exports = {
  STUBBED_CALLS,
  /** 写「口上」两素质的属主域写法（174/175 走 system 门面）——本文件是
   * 那份写法的唯一落点，chara-custom2.js 从这里取 */
  set_personality: set_talent,
  GENERAL_CHARASTERISTICS,
  ARR_HAIRCOLOR,
  show_charasteristic,
  set_random_charasteristic,
  set_charasteristic,
  clear_charasteristic,
  choose_charasteristic,
  show_haircolor,
  set_random_haircolor,
  set_haircolor,
  choose_haircolor,
};
