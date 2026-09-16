/**
 * @file 调教中装备状态两段（@SHOW_EQUIP_1 / @SHOW_EQUIP_2）。
 *
 * 源: target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB
 *       @SHOW_EQUIP_1（:1598-1676）/ @SHOW_EQUIP_2（:1564-1590）
 *
 * 两段都读 TEQUIP/TFLAG（调教域的装备位），整行着 `SETCOLOR 0xff1493`
 * （粉色）——ere 侧以片段 color 承载（chara-bars.js 与 page-train.js 同款）。
 *
 * #174 的归属勘误（docs/stub-registry.md 的 38 / 42 两行）在这里兑现：这两段显示的
 * 是**调教装备**（TEQUIP）而不是 EQUIP.ERB 的武器/戒指（CONTEXT.md 的两套
 * 「装备」不同物，ADR-0007），所以它们归调教域、不归装备票。两个运行时占位
 * （page-train.js:241/:406）随本票换真身。
 *
 * 排版依据同 chara-info-abl-mark.js 文件头：命令名后的第一个空格是分隔符，
 * `PRINT  [野外PLAY中]` 输出一个前导空格。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { monster_name } = require('#/dungeon/monster-data');
const { chara_callname } = require('#/utils/callname-utils');

/** `SETCOLOR 0xff1493`（:1565/:1603）→ 渲染层 CSS 色串 */
const EQUIP_COLOR = '#ff1493';

/** E:300 的读取兜底（MONSTER_DATA 写入的怪物番号，monster-data.js:469） */
function e300() {
  return era.get('e:300') || 0;
}

/**
 * @SHOW_EQUIP_2（:1564-1590）：特殊 PLAY 状态的粉色一行。
 *
 * 九个位按源序：53 摄影 / 54 野外 / 57 大镜子 / 58 浴室 / 59 新妻 /
 * 88 使役魔兽 / 89 兽奸 / 90 触手召唤 / 55 死斗场。
 *
 * @param {number} cid 角色 ID（源隐式 TARGET）
 */
function show_equip_2(cid) {
  const t = (index) => era.get(`tequip:${cid}:${index}`) || 0;
  const line = [];
  const push = (text) => line.push({ content: text, color: EQUIP_COLOR });

  if (t(53)) {
    // :1567 剩余次数 = 10 + 4 * CFLAG:499 - CFLAG:491 + 1
    const remaining =
      10 +
      4 * (era.get(`cflag:${cid}:499`) || 0) -
      (era.get(`cflag:${cid}:491`) || 0) +
      1;
    push(`[摄影中(剩${remaining}次)]`);
  }
  if (t(54)) push(' [野外PLAY中]');
  if (t(57)) push(' [羞耻（大镜子）PLAY中]');
  if (t(58)) push(' [浴室PLAY中]');
  if (t(59)) push(' [新妻PLAY中]');
  if (t(88)) {
    // :1579-1581 使役魔兽（名字经 MONSTER_DATA 落进 E:300）
    push(' [使役魔兽PLAY中（');
    line.push({ content: monster_name(e300()), color: EQUIP_COLOR });
    push('）]');
  }
  if (t(89)) push(' [兽奸PLAY中]');
  if (t(90)) push(' [触手召唤中]');
  if (t(55)) push(' [死斗场决斗中]');
  push(' '); // :1586-1589 PRINTL（两个空格减分隔符）
  era.print(line);
}

/** @SHOW_EQUIP_1 的「使用中」头行守卫位（源 :1600 的全部 OR 项） */
const EQUIP_1_HEAD_BITS = [
  11, 13, 14, 15, 16, 17, 18, 19, 21, 22, 43, 44, 45, 46, 47, 48, 49, 98,
];

/**
 * 触手替换名（源 :1608-1654 的六组 `IF TEQUIP:n && TEQUIP:90 … ELSEIF TEQUIP:n`）
 * ——位号 → [触手形态, 常态形态]。
 */
const EQUIP_1_PAIRS = [
  { bit: 11, tentacle: '[触手插入]', normal: '[蠕虫]' },
  { bit: 13, tentacle: '[触手肛门插入]', normal: '[肛门虫]' },
  { bit: 14, tentacle: '[触手蹂躏阴蒂]', normal: '[阴蒂夹]' },
  { bit: 15, tentacle: '[触手蹂躏乳头]', normal: '[乳头夹]' },
  { bit: 16, tentacle: '[触手榨乳]', normal: '[榨乳器]' },
  { bit: 17, tentacle: '[触手蹂躏阴茎]', normal: '[飞机杯]' },
  { bit: 44, tentacle: '[触手束缚]', normal: '[绳子束缚]' },
  { bit: 46, tentacle: '[触手灌肠]', normal: '[灌肠＋肛门塞]' },
];

/** 单形态的位（源 :1604-1607/:1655-1671 的 SIF 组，顺序即输出顺序） */
const EQUIP_1_SINGLES = [
  { bit: 21, text: '[媚药效果发挥中]' }, // :1604-1605
  { bit: 22, text: '[利尿剂效果发挥中]' }, // :1606-1607
];
const EQUIP_1_TAIL_SINGLES = [
  { bit: 98, text: '[触手口辱]' }, // :1655-1656
  { bit: 43, text: '[眼罩]' }, // :1658-1659
  { bit: 45, text: '[口塞]' }, // :1660-1661
  { bit: 18, text: '[淋浴]' }, // :1662-1663
  { bit: 19, text: '[肛珠]' }, // :1664-1665
  { bit: 49, text: '[肛门电极]' }, // :1666-1667
];

/**
 * @SHOW_EQUIP_1（:1598-1676）：调教中使用中道具的粉色一行。
 *
 * 头行「使用中(名字)」只在十八个装备位或 TFLAG:60 / TFLAG:899 任一命中时
 * 出现（:1600 的那条长 OR），整段也在同一个 IF 里——全不命中时什么都不打。
 *
 * @param {number} cid 角色 ID（源隐式 TARGET）
 */
function show_equip_1(cid) {
  const t = (index) => era.get(`tequip:${cid}:${index}`) || 0;
  const tflag = (index) => era.get(`tflag:${index}`) || 0;
  const active =
    EQUIP_1_HEAD_BITS.some((bit) => t(bit) !== 0) ||
    tflag(60) !== 0 ||
    tflag(899) >= 1;
  if (!active) {
    return; // :1600 的 IF 不成立：整段（含头行）都不出
  }

  const line = [];
  const push = (text) => line.push({ content: text, color: EQUIP_COLOR });
  // :1601 头行在 SETCOLOR（:1603）之前，是默认色；其后整段才是粉色
  line.push({ content: `使用中(${chara_callname(cid)}) ` });
  for (const { bit, text } of EQUIP_1_SINGLES) {
    if (t(bit)) push(` ${text}`);
  }
  for (const { bit, tentacle, normal } of EQUIP_1_PAIRS) {
    // :1608-1654 触手形态优先（TEQUIP:90 与位同时成立）
    if (t(bit) && t(90)) push(` ${tentacle}`);
    else if (t(bit)) push(` ${normal}`);
  }
  for (const { bit, text } of EQUIP_1_TAIL_SINGLES) {
    if (t(bit)) push(` ${text}`);
  }
  // :1668-1669 插入中（TFLAG:60 == 1 且上次指令不是 56）
  if (tflag(60) === 1 && era_flag.prevcom !== 56) push(' [插入中]');
  // :1670-1671 失神中
  if (tflag(899) >= 1) push(' [失神中]');
  push(' '); // :1672-1675 PRINTL（两个空格减分隔符）
  era.print(line);
}

module.exports = { EQUIP_COLOR, show_equip_1, show_equip_2 };
