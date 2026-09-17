/**
 * @file 素质达成条件的明细画面（@SHOW_TALENT_CONDITION 与 19 个 STC_* 辅助）。
 *
 * 源: target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB 全 20 函数——
 *     @SHOW_TALENT_CONDITION（:2-409）＋ @STC_PRINTC（:414）/ @STC_LAB_TAL（:425）
 *     / @STC_SAY_ABL（:445）/ @STC_SAY_EXP（:471）/ @STC_SAY_MARK（:483）
 *     / @STC_SAY_TAL（:492）/ @STC_SAYNO_MARK（:507）/ @STC_SAYNO_TAL（:516）
 *     / @STC_SAYSUM_EXP（:526）/ @STC_SAY_ABCV（:549）/ @STC_SAYSUM_ABL（:562）
 *     / 七个 @STC_COLOR_*（:585-606）/ @STC_SEIIN_CHECK（:612-662）。
 *
 * **这个文件的唯一调用方是 CHARA_INFO_SHOW**（:252 与 :300 两处），所以它与
 * 那个文件同票——拆开会让一张票交付一个没人调的文件（#390 的立项理由）。
 *
 * 版面由黄金样本钉死（daycycle-max-log:203-222，勇者考狄利亚的整屏）：
 *   `爱慕条件： [好感度 100%]  [顺从   Lv3]   [侍奉精神 Lv3] …`
 * 用例逐字复现那 19 行。
 *
 * **`@STC_PRINTC` 的补位长度按 Shift-JIS 字节算**（`:415 STRLENS`）：全角 2、
 * 半角 1（含方括号本身）——`[好感度 100%]` 是 13 字节，补到 15 得 2 个空格，
 * 与黄金样本一致；按字符数算会得到 5 个空格。等价物就是 display-width 的
 * `display_width`（同一把尺子）。
 *
 * 有意偏离：
 *   - `SETCOLOR`/`RESETCOLOR` 的有状态配色按「每个片段自带色」承载
 *     （look.js 的 Spans、equip-print.js 的两种出口同款）；补位空格与被补的
 *     文本同色（源里 RESETCOLOR 在 STC_PRINTC 之后），`STC_COLOR_DEFAULT` 与
 *     `RESETCOLOR` 都是「不染」，落成不写 color；
 *   - `PRINT_IMG "COVER_WHITE"`（:176/:212/:238/:256）改用引擎的
 *     `era.printImage`（res/img.csv:15 已登记该资源）；源在四处后面各跟一个
 *     `PRINTL`（:178/:214/:240/:258），图片出口自带换行，故不再补。
 */

const era = require('#/era-electron');
const { EXPLV } = require('#/era-utils/exp-level');
const {
  display_width,
  pad_display,
  pad_left,
  slice_display,
} = require('#/utils/display-width');

/** `@STC_PRINTC` 的缺省列宽（源 :414 `ARG = 15`） */
const STC_PRINT_WIDTH = 15;

/** 七个 @STC_COLOR_*（源 :585-606）的色串；DEFAULT 是 RESETCOLOR = 不染 */
const COLOR = {
  true: 'White', // :586 SETCOLORBYNAME White
  false: 'Gray', // :589 SETCOLORBYNAME Gray
  alert: 'LightSalmon', // :594 SETCOLORBYNAME LightSalmon
  right: 'DarkSeaGreen', // :597 SETCOLORBYNAME DarkSeaGreen
  invalid: 'DarkRed', // :600 SETCOLORBYNAME DarkRed
  achieve: '#66b3ff', // :603 SETCOLOR 102,179,255
  default: undefined, // :606 RESETCOLOR
};

/** 素质编号（yml/Talent.yml） */
const TALENT_BREAK = 9; // 崩坏
const TALENT_INRAN = 76; // 淫乱
const TALENT_AIBA = 85; // 爱慕
const TALENT_MAN = 122; // 男人
const TALENT_LABEL_LIMIT = 4; // 名字 4 字节以下才补「条件」/「素质」二字
const TALENT_FAMILY_GUARD = 184; // 挡掉爱慕条件行的第二判据（:40）

/** STC_* 实参用到的素质编号（名字表见 yml/Talent.yml） */
const T_LEARN_SLOW = 51; // 学习缓慢
const T_LICK = 52; // 擅用舌头
const T_MASTURBATE = 74; // 自慰狂
const T_SEX_ADDICT = 75; // 性爱狂
const T_ANAL_ADDICT = 77; // 尻穴狂
const T_BREAST_PLAY = 78; // 弄乳狂
const T_SADIST = 83; // 施虐狂
const T_OBEDIENT = 86; // 盲从
const T_MASOCHIST = 88; // 受虐狂
const T_EXHIBITIONIST = 89; // 露出狂
const T_DOG = 136; // 牝犬
const T_PROSTITUTE = 180; // 妓女
const T_COURTESAN = 181; // 倾城
const T_SUPER_CLIT = 230; // 淫核
const T_SUPER_BREAST = 231; // 淫乳
const T_SUPER_VAGINA = 232; // 淫壶
const T_SUPER_ANAL = 233; // 淫肛
const T_AROUSED_ALWAYS = 271; // 时常发情
const T_SEX_MASTER = 272; // 性豪
const T_LIKE_SPERM = 47; // 喜欢精液
const T_EXPERIENCE = 315; // 成为勇者前的生活（== 5 是元妓女档）

/**
 * `@STC_SEIIN_CHECK` 的素质修正表（源 :620-660 的十四条 SIF）。
 * 每项：`[素质编号, 增量]`，基础值 50（:616）。
 * 13 刚强 +4 / 24 保守的 +4 / 25 乐观的 −2 / 26 悲观的 +2 / 27 戒备森严 +5 /
 * 32 压抑 +4 / 33 开放 −2 / 61 不怕污臭 −2 / 62 反感污臭 +2 / 70 接受快感 −2 /
 * 71 否定快感 +4 / 72 容易上瘾 −5 / 80 倒错的 −2 / 76 淫乱 −20。
 */
const SEIIN_BASE = 50;
const SEIIN_ADJUST = [
  [13, 4],
  [24, 4],
  [25, -2],
  [26, 2],
  [27, 5],
  [32, 4],
  [33, -2],
  [61, -2],
  [62, 2],
  [70, -2],
  [71, 4],
  [72, -5],
  [80, -2],
  [TALENT_INRAN, -20],
];

/** 四枚「特殊性感素质」的已得数决定三档需求的上浮（源 :149-161） */
const SEXSKILL_IDS = [T_MASTURBATE, T_SEX_ADDICT, T_ANAL_ADDICT, T_BREAST_PLAY];

/**
 * 行缓冲。源里的 `PRINT`/`PRINTFORM` 一路追加、`PRINTL` 收行，`SETCOLOR` 与
 * `RESETCOLOR` 之间换色——片段数组天然承载这两件事。
 * @returns {{fragments: Array}}
 */
function new_row() {
  return { fragments: [] };
}

/**
 * @param {{fragments: Array}} row 行缓冲
 * @param {string} content 文本
 * @param {string} [color] 渲染层色串（省略 = 默认色）
 */
function put(row, content, color) {
  row.fragments.push(color === undefined ? { content } : { content, color });
}

/** 收行（源里每一处 `PRINTL`） */
function end_row(row) {
  era.print(row.fragments);
  row.fragments = [];
}

function talent_of(cid, index) {
  return era.get(`talent:${cid}:${index}`) || 0;
}

function abl_of(cid, index) {
  return era.get(`abl:${cid}:${index}`) || 0;
}

function exp_of(cid, index) {
  return era.get(`exp:${cid}:${index}`) || 0;
}

/** 名字 8 字节截断（`%SUBSTRING(EXPNAME:N,0,8)%`，:479/:540/:543） */
function exp_label(index) {
  return slice_display(era.get(`expname:${index}`) ?? '', 8);
}

/**
 * @STC_PRINTC（:414-420）：打一段文本并补空格到 `width` 的整数倍。
 * 长度按 Shift-JIS 字节算（`STRLENS`，见文件头）；补位空格同色。
 * @param {{fragments: Array}} row 行缓冲
 * @param {string} text
 * @param {string} [color] 颜色（与文本同色）
 * @param {number} [width] 列宽（缺省 15）
 */
function stc_printc(row, text, color, width = STC_PRINT_WIDTH) {
  const pad = width - (display_width(text) % width); // :415
  // :416-417 SIF LOCAL == ARG → LOCAL = 0（长度整好整除时不补）
  put(row, text + ' '.repeat(pad === width ? 0 : pad), color);
}

/**
 * @STC_LAB_TAL（:425-440）：条件行行首的素质名 + 「：」。
 * @param {{fragments: Array}} row 行缓冲
 * @param {number} cid 角色 ID
 * @param {number} id 素质编号
 */
function stc_lab_tal(row, cid, id) {
  // :426-433 三档配色（崩坏 → 不可用；已获得 → 达成色；否则默认）
  let color = COLOR.default;
  if (talent_of(cid, TALENT_BREAK) !== 0) color = COLOR.invalid;
  else if (talent_of(cid, id) !== 0) color = COLOR.achieve;
  let label = era.get(`talentname:${id}`) ?? '';
  // :435-436 男体的「淫核」改称绝伦
  if (id === T_SUPER_CLIT && talent_of(cid, TALENT_MAN) !== 0) label = '绝伦';
  // :438-439 名字 4 字节以下补「条件」二字
  if (display_width(label) <= TALENT_LABEL_LIMIT) {
    label = `${pad_display(label, 4)}条件`;
  }
  // :440 PRINTFORM %LOCALS,8,LEFT%：（源里的全角冒号后跟一个半角空格）
  put(row, `${pad_display(label, 8)}： `, color);
}

/**
 * @STC_SAY_ABL（:445-455）：`[能力名 LvN]`。
 * @param {{fragments: Array}} row 行缓冲
 * @param {number} cid 角色 ID
 * @param {number} id 能力编号
 * @param {number} level 要求等级
 */
function stc_say_abl(row, cid, id, level) {
  const color = abl_of(cid, id) >= level ? COLOR.true : COLOR.false; // :446-450
  // :451-455 男体的 0 号能力（阴蒂感觉）改称阴茎感觉
  const label =
    id === 0 && talent_of(cid, TALENT_MAN) !== 0
      ? '阴茎感觉'
      : pad_display(era.get(`ablname:${id}`) ?? '', 6);
  stc_printc(row, `[${label} Lv${level}]`, color);
}

/**
 * @STC_SAY_EXP（:471-480）：`[经验名 需求值]`。
 * @param {{fragments: Array}} row 行缓冲
 * @param {number} cid 角色 ID
 * @param {number} id 经验编号
 * @param {number} need 要求值
 */
function stc_say_exp(row, cid, id, need) {
  const color = exp_of(cid, id) >= need ? COLOR.true : COLOR.false; // :472-476
  stc_printc(
    row,
    `[${pad_display(exp_label(id), 8)}${pad_left(String(need), 4)}]`,
    color,
  );
}

/**
 * @STC_SAY_MARK（:483-489）：`[刻印名 LvN]`。
 * @param {{fragments: Array}} row 行缓冲
 * @param {number} cid 角色 ID
 * @param {number} id 刻印编号
 * @param {number} [need] 要求等级
 */
function stc_say_mark(row, cid, id, need = 0) {
  const value = era.get(`mark:${cid}:${id}`) || 0;
  const color = value >= need ? COLOR.true : COLOR.false;
  const name = pad_display(era.get(`markname:${id}`) ?? '', 6);
  stc_printc(row, `[${name} Lv${need}]`, color);
}

/**
 * @STC_SAY_TAL（:492-503）：`[素质名]`（名字 4 字节以下补「素质」）。
 * @param {{fragments: Array}} row 行缓冲
 * @param {number} cid 角色 ID
 * @param {number} id 素质编号
 */
function stc_say_tal(row, cid, id) {
  const color = talent_of(cid, id) !== 0 ? COLOR.true : COLOR.false;
  let label = era.get(`talentname:${id}`) ?? '';
  if (id === T_SUPER_CLIT && talent_of(cid, TALENT_MAN) !== 0) label = '绝伦';
  if (display_width(label) <= TALENT_LABEL_LIMIT) label += '素质';
  stc_printc(row, `[${label}]`, color, 12);
}

/**
 * @STC_SAYNO_MARK（:507-513）：`[刻印名]`（值 ≤ 上限才是「达标」色）。
 * @param {{fragments: Array}} row 行缓冲
 * @param {number} cid 角色 ID
 * @param {number} id 刻印编号
 * @param {number} [limit] 上限
 */
function stc_sayno_mark(row, cid, id, limit = 0) {
  const value = era.get(`mark:${cid}:${id}`) || 0;
  const color = value <= limit ? COLOR.right : COLOR.alert;
  stc_printc(row, `[${era.get(`markname:${id}`) ?? ''}]`, color, 12);
}

/**
 * @STC_SAYNO_TAL（:516-522）：`[素质名]`（值 ≤ 上限才是「达标」色）。
 * @param {{fragments: Array}} row 行缓冲
 * @param {number} cid 角色 ID
 * @param {number} id 素质编号
 * @param {number} [limit] 上限
 */
function stc_sayno_tal(row, cid, id, limit = 0) {
  const color = talent_of(cid, id) <= limit ? COLOR.right : COLOR.alert;
  stc_printc(row, `[${era.get(`talentname:${id}`) ?? ''}]`, color, 12);
}

/**
 * @STC_SAYSUM_EXP（:526-545）：`[经验名|经验名|经验名 合计需求]`。
 * `ARG:1` 必有，`ARG:2`/`ARG:3` 为 0 时既不入和也不入标签。
 * @param {{fragments: Array}} row 行缓冲
 * @param {number} cid 角色 ID
 * @param {number} need 合计要求
 * @param {number} first 第一个经验编号
 * @param {number} [second]
 * @param {number} [third]
 */
function stc_saysum_exp(row, cid, need, first, second = 0, third = 0) {
  const ids = [first, second, third];
  let sum = 0;
  for (const id of ids) {
    if (id > 0) sum += exp_of(cid, id); // :530-531
  }
  const color = sum >= need ? COLOR.true : COLOR.false; // :534-538
  let label = `[${exp_label(first)}`; // :539-540
  for (const id of [second, third]) {
    if (id > 0) label += `|${exp_label(id)}`; // :541-544
  }
  // :545 PRINTFORM %LOCALS%{ARG,4}]（不补位，没有 STC_PRINTC）
  put(row, `${label}${pad_left(String(need), 4)}]`, color);
}

/**
 * @STC_SAY_ABCV（:549-559）：`[四点感觉LvN]`（0-3 号能力之和）。
 * @param {{fragments: Array}} row 行缓冲
 * @param {number} cid 角色 ID
 * @param {number} need 合计要求
 */
function stc_say_abcv(row, cid, need) {
  let sum = 0;
  for (let count = 0; count < 4; count += 1) sum += abl_of(cid, count);
  const color = sum >= need ? COLOR.true : COLOR.false;
  stc_printc(row, `[四点感觉Lv${need}]`, color);
}

/**
 * @STC_SAYSUM_ABL（:562-580）：`[能力名|能力名 LvN]`（四项之和）。
 * 本文件没有调用点（:65-68/:75 的调用都被注释掉了），按签名完整实现。
 * @param {{fragments: Array}} row 行缓冲
 * @param {number} cid 角色 ID
 * @param {number} need 合计要求
 * @param {number} first 第一个能力编号
 * @param {number} [second]
 * @param {number} [third]
 * @param {number} [fourth]
 */
function stc_saysum_abl(
  row,
  cid,
  need,
  first,
  second = 0,
  third = 0,
  fourth = 0,
) {
  const ids = [first, second, third, fourth];
  let sum = 0;
  for (const id of ids) {
    if (id > 0) sum += abl_of(cid, id);
  }
  const color = sum >= need ? COLOR.true : COLOR.false;
  let label = `[${era.get(`ablname:${first}`) ?? ''}`;
  for (const id of [second, third, fourth]) {
    if (id > 0) label += `|${era.get(`ablname:${id}`) ?? ''}`;
  }
  put(row, `${label} Lv${need}]`, color);
}

/**
 * @STC_SEIIN_CHECK（:612-662）：强制精饮绝顶的基准次数 + 素质修正。
 * @param {number} cid 角色 ID
 * @returns {number}
 */
function stc_seiin_check(cid) {
  let local = SEIIN_BASE; // :616
  for (const [id, delta] of SEIIN_ADJUST) {
    if (talent_of(cid, id) === 1) local += delta;
  }
  return local;
}

/**
 * 四枚「特殊性感素质」已得的行（源 :173-177/:209-213/:235-239/:253-257）：
 * 这一臂不写条件，改为封面图 `PRINT_IMG "COVER_WHITE"`。
 *
 * 行首标签先收成一行、图片另起一行——原作 `PRINT_IMG` 是与标签同一行的行内
 * 元素，引擎的图片出口自带换行，接不回标签那一行（equip-print.js 的两种出口
 * 同一类取舍）。
 * @param {{fragments: Array}} row 行缓冲
 */
function cover_white(row) {
  end_row(row);
  era.printImage('COVER_WHITE');
}

/**
 * @SHOW_TALENT_CONDITION（:2-409）：各素质的达成条件明细。
 * @param {number} cid 角色 ID
 */
function show_talent_condition(cid) {
  const t = (index) => talent_of(cid, index);
  const row = new_row();
  const affection = era.get(`cflag:${cid}:2`) || 0; // CFLAG:2 好感度
  const man = t(TALENT_MAN) !== 0;

  // —— :13-37 助手条件（有 爱慕 或 淫乱 时才有这一行）——
  if (t(TALENT_INRAN) !== 0 || t(TALENT_AIBA) !== 0) {
    let lab_color = COLOR.default;
    if (t(TALENT_BREAK) !== 0) lab_color = COLOR.invalid;
    else if (affection === 2) lab_color = COLOR.achieve;
    put(row, '助手条件： ', lab_color);
    stc_printc(
      row,
      '[好感度 200%]',
      affection >= 2000 ? COLOR.true : COLOR.false,
    );
    stc_sayno_mark(row, cid, 3); // :29
    if (t(TALENT_INRAN) !== 0) {
      put(row, `[${era.get(`talentname:${TALENT_INRAN}`) ?? ''}]`, COLOR.true);
    }
    if (t(TALENT_AIBA) !== 0) {
      put(row, `[${era.get(`talentname:${TALENT_AIBA}`) ?? ''}]`, COLOR.true);
    }
    end_row(row); // :36 PRINTL
  }

  // —— :39-60 爱慕条件（未获得 爱慕 与 求爱 时）——
  if (t(TALENT_AIBA) === 0 && t(TALENT_FAMILY_GUARD) === 0) {
    stc_lab_tal(row, cid, TALENT_AIBA);
    stc_printc(
      row,
      '[好感度 100%]',
      affection >= 1000 ? COLOR.true : COLOR.false,
    );
    stc_say_abl(row, cid, 10, 3); // :52
    stc_say_abl(row, cid, 16, 3); // :53
    stc_say_mark(row, cid, 2, 3); // :54
    stc_say_exp(row, cid, 21, EXPLV[5]); // :55
    stc_sayno_mark(row, cid, 3); // :58
    end_row(row); // :59
  }

  // —— :62-83 淫乱条件（未获得 爱慕 时）——
  if (t(TALENT_AIBA) === 0) {
    stc_lab_tal(row, cid, TALENT_INRAN);
    stc_printc(
      row,
      '[好感度 100%]',
      affection >= 1000 ? COLOR.true : COLOR.false,
    );
    stc_say_abl(row, cid, 11, 3); // :74
    stc_say_abcv(row, cid, 10); // :76
    stc_say_mark(row, cid, 1, 3); // :77
    stc_say_mark(row, cid, 2, 3); // :78
    stc_say_exp(row, cid, 50, 3); // :79
    stc_sayno_mark(row, cid, 3); // :81
    end_row(row); // :82
  }

  // —— :90-105 擅用舌头（学习缓慢 51 走严一档）——
  stc_lab_tal(row, cid, T_LICK);
  if (t(T_LEARN_SLOW) !== 0) {
    stc_say_abl(row, cid, 12, 7);
    stc_say_abl(row, cid, 13, 7);
    stc_say_exp(row, cid, 22, 1500);
  } else {
    stc_say_abl(row, cid, 12, 5);
    stc_say_abl(row, cid, 13, 5);
    stc_say_exp(row, cid, 22, 1000);
  }
  end_row(row); // :105

  // —— :108-143 四个特殊性癖 ——
  stc_lab_tal(row, cid, T_SADIST);
  stc_say_abl(row, cid, 20, 4);
  stc_say_abl(row, cid, 12, 4);
  stc_say_exp(row, cid, 33, 300);
  end_row(row);

  stc_lab_tal(row, cid, T_MASOCHIST);
  stc_say_abl(row, cid, 21, 4);
  stc_say_abl(row, cid, 17, 2);
  stc_say_exp(row, cid, 30, 300);
  end_row(row);

  stc_lab_tal(row, cid, T_EXHIBITIONIST);
  stc_say_abl(row, cid, 17, 4);
  stc_say_abl(row, cid, 21, 2);
  stc_saysum_exp(row, cid, 200, 11, 31, 54);
  end_row(row);

  stc_lab_tal(row, cid, T_DOG);
  stc_say_abl(row, cid, 11, 5);
  stc_say_abl(row, cid, 39, 3);
  stc_say_exp(row, cid, 56, 300);
  end_row(row);

  // —— :145-258 四个特殊性感素质 ——
  // :149-161 SEXSKILL_COUNT = 74/75/77/78 的已得数，三档需求随它上浮
  let sexskill_count = 0;
  for (const id of SEXSKILL_IDS) {
    if (t(id) !== 0) sexskill_count += 1;
  }
  const sexskill_1 = 100 + 50 * sexskill_count; // :159
  const sexskill_2 = 100 + 10 * sexskill_count; // :160
  const sexskill_3 = 300 + 50 * sexskill_count; // :161

  stc_lab_tal(row, cid, T_MASTURBATE);
  if (sexskill_count === 0) {
    stc_say_abl(row, cid, 0, 4); // :166
    stc_say_exp(row, cid, 11, 100); // :167
    stc_say_exp(row, cid, 2, 100); // :168
    end_row(row);
  } else if (t(T_MASTURBATE) === 0) {
    stc_say_abl(row, cid, 0, 5); // :170
    stc_say_exp(row, cid, 11, sexskill_1); // :171
    stc_say_exp(row, cid, 2, sexskill_2); // :172
    end_row(row);
  } else {
    cover_white(row); // :173-177
  }

  stc_lab_tal(row, cid, T_BREAST_PLAY);
  if (sexskill_count === 0 && !man) {
    stc_say_abl(row, cid, 1, 4); // :184
    stc_say_exp(row, cid, 54, 100); // :185
    stc_say_exp(row, cid, 2, 100); // :186
    end_row(row);
  } else if (t(T_BREAST_PLAY) === 0 && sexskill_count > 0 && !man) {
    stc_say_abl(row, cid, 1, 5); // :188
    stc_say_exp(row, cid, 54, sexskill_1); // :189
    stc_say_exp(row, cid, 2, sexskill_2); // :190
    end_row(row);
  } else if (man && sexskill_count === 0) {
    // :191-199 男体：乳房点数（JUEL:14）替代喷奶经验
    stc_say_abl(row, cid, 1, 4);
    const juels = era.get(`juel:${cid}:14`) || 0;
    stc_printc(
      row,
      `[胸部点数${pad_left('100', 4)}]`,
      juels >= sexskill_1 ? COLOR.true : COLOR.false,
    );
    stc_say_exp(row, cid, 2, 100);
    end_row(row);
  } else if (t(T_BREAST_PLAY) === 0 && sexskill_count > 0 && man) {
    // :200-208 男体且四枚已有得
    stc_say_abl(row, cid, 1, 5);
    const juels = era.get(`juel:${cid}:14`) || 0;
    stc_printc(
      row,
      `[胸部点数${pad_left(String(sexskill_1), 4)}]`,
      juels >= sexskill_1 ? COLOR.true : COLOR.false,
    );
    stc_say_exp(row, cid, 2, sexskill_2);
    end_row(row);
  } else {
    cover_white(row); // :209-213
  }

  stc_lab_tal(row, cid, T_SEX_ADDICT);
  if (sexskill_count === 0 && !man) {
    stc_say_abl(row, cid, 2, 4); // :220
    stc_say_exp(row, cid, 0, 300); // :221
    stc_say_exp(row, cid, 2, 100); // :222
    end_row(row);
  } else if (t(T_SEX_ADDICT) === 0 && sexskill_count > 0 && !man) {
    stc_say_abl(row, cid, 2, 5); // :224
    stc_say_exp(row, cid, 0, sexskill_3); // :225
    stc_say_exp(row, cid, 2, sexskill_2); // :226
    end_row(row);
  } else if (man && sexskill_count === 0) {
    // :227-230 男体走阴茎侧（0 号能力、5 号经验）
    stc_say_abl(row, cid, 0, 4);
    stc_say_exp(row, cid, 5, 300);
    stc_say_exp(row, cid, 2, 100);
    end_row(row);
  } else if (man && t(T_SEX_ADDICT) === 0 && sexskill_count > 0) {
    stc_say_abl(row, cid, 0, 4);
    stc_say_exp(row, cid, 5, sexskill_3);
    stc_say_exp(row, cid, 2, sexskill_1);
    end_row(row);
  } else {
    cover_white(row); // :235-239
  }

  stc_lab_tal(row, cid, T_ANAL_ADDICT);
  if (sexskill_count === 0) {
    stc_say_abl(row, cid, 3, 4); // :246
    stc_say_exp(row, cid, 32, 300); // :247
    stc_say_exp(row, cid, 2, 100); // :248
    end_row(row);
  } else if (t(T_ANAL_ADDICT) === 0) {
    stc_say_abl(row, cid, 3, 5); // :250
    stc_say_exp(row, cid, 32, sexskill_3); // :251
    stc_say_exp(row, cid, 2, sexskill_2); // :252
    end_row(row);
  } else {
    cover_white(row); // :253-257
  }

  // —— :262-309 四枚强化素质（FLAG:73 关闭时才有这一组）——
  if ((era.get('flag:73') || 0) <= 0) {
    stc_lab_tal(row, cid, T_SUPER_CLIT);
    stc_say_abl(row, cid, 0, 5);
    stc_say_exp(row, cid, 11, 100);
    stc_say_exp(row, cid, 2, 300);
    end_row(row);

    stc_lab_tal(row, cid, T_SUPER_BREAST);
    stc_say_abl(row, cid, 1, 5);
    stc_say_exp(row, cid, 54, 100);
    stc_say_exp(row, cid, 2, 300);
    end_row(row);

    stc_lab_tal(row, cid, T_SUPER_VAGINA);
    stc_say_abl(row, cid, 2, 5);
    stc_say_exp(row, cid, 0, 300);
    stc_say_exp(row, cid, 2, 300);
    end_row(row);

    stc_lab_tal(row, cid, T_SUPER_ANAL);
    stc_say_abl(row, cid, 3, 5);
    stc_say_exp(row, cid, 32, 300);
    stc_say_exp(row, cid, 2, 300);
    end_row(row);

    stc_lab_tal(row, cid, T_SEX_MASTER);
    stc_say_tal(row, cid, T_SUPER_CLIT);
    stc_say_tal(row, cid, T_SUPER_BREAST);
    stc_say_tal(row, cid, T_SUPER_VAGINA);
    stc_say_tal(row, cid, T_SUPER_ANAL);
    end_row(row);
  }

  // —— :312-333 时常发情（FLAG:75 关闭时才有）——
  if ((era.get('flag:75') || 0) <= 0) {
    stc_lab_tal(row, cid, T_AROUSED_ALWAYS);
    stc_printc(
      row,
      '[润滑积蓄 700]',
      (era.get(`cflag:${cid}:81`) || 0) >= 700 ? COLOR.true : COLOR.false,
    );
    stc_printc(
      row,
      '[欲情积蓄2250]',
      (era.get(`cflag:${cid}:82`) || 0) >= 2250 ? COLOR.true : COLOR.false,
    );
    end_row(row);
  }

  // —— :335-347 喜欢精液（强制精饮绝顶的基准次数）——
  stc_lab_tal(row, cid, T_LIKE_SPERM);
  put(
    row,
    `[饮精绝顶${pad_left(String(stc_seiin_check(cid)), 4)}]`,
    t(T_LIKE_SPERM) !== 0 ? COLOR.true : COLOR.false,
  );
  end_row(row); // :347 PRINTFORML

  // —— :350-382 妓女 / 倾城 ——
  if (t(T_PROSTITUTE) === 0) {
    stc_lab_tal(row, cid, T_PROSTITUTE);
    if (t(T_EXPERIENCE) === 5) {
      // :356-360 元妓女
      stc_say_abl(row, cid, 11, 1);
      stc_say_exp(row, cid, 74, 80);
      stc_sayno_mark(row, cid, 3);
    } else {
      stc_say_abl(row, cid, 12, 1);
      stc_say_abl(row, cid, 11, 2);
      stc_say_exp(row, cid, 74, 100);
      stc_sayno_mark(row, cid, 3);
    }
  } else {
    stc_lab_tal(row, cid, T_COURTESAN);
    stc_say_tal(row, cid, T_PROSTITUTE); // :373/:378
    stc_say_exp(row, cid, 74, t(T_EXPERIENCE) === 5 ? 160 : 200);
    stc_sayno_mark(row, cid, 3);
  }
  end_row(row); // :383 PRINTL

  // —— :384-407 盲从（两段素质条件各用【】包起来）——
  stc_lab_tal(row, cid, T_OBEDIENT);
  put(row, '', t(T_OBEDIENT) !== 0 ? COLOR.true : COLOR.false);
  put(row, '【'); // :394
  stc_say_tal(row, cid, TALENT_AIBA);
  stc_say_exp(row, cid, 81, 5);
  stc_say_abl(row, cid, 10, 4);
  put(row, '】【'); // :399
  stc_say_tal(row, cid, TALENT_INRAN);
  stc_say_exp(row, cid, 81, 10);
  stc_say_abl(row, cid, 10, 5);
  put(row, '】'); // :401-404
  stc_sayno_mark(row, cid, 3);
  end_row(row); // :406 PRINTL
}

module.exports = {
  COLOR,
  SEIIN_ADJUST,
  SEIIN_BASE,
  show_talent_condition,
  stc_lab_tal,
  stc_printc,
  stc_say_abl,
  stc_say_abcv,
  stc_say_exp,
  stc_say_mark,
  stc_say_tal,
  stc_sayno_mark,
  stc_sayno_tal,
  stc_seiin_check,
  stc_saysum_abl,
  stc_saysum_exp,
};
