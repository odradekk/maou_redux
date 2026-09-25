// 变异条目表切片：角色信息显示链（#390，CHARA_INFO_SHOW ＋ CHARA_INFO_SHOW_TALENT）。
// 字段与运行方式见 tools/mutation-check.mjs 头注释。desc 里的 M 编号不人工
// 分配，只作引用锚点，但全表必须唯一——重号由 gate_shape 随 --verify 秒级核对。
/** 本分片条数（门 1）：增删条目必须同步改它，理由见 tools/mutation-check.mjs 头注 */
export const COUNT = 76; // #593 +3（M11983/M11984：同屏固定编号核对——条件键基数进预设段、名单轮插 [7] 探针；M11988：尾段并错轮的漏报，靶文件是核对自己）；#586 +9（M11900-M11902：献祭名单轮的返回编号——撞号复现、打印与判定各自的错位；M11903-M11906、M11907-M11908：十个探针暴露的覆盖缺口——条件键两端、编号基数、勇者档、自身排除、RESTART）；#565 返工 +1（M11633：TARGET 换手删除——语尾回退按调用方取）；#390 建表 60 条；#546 +3（M11544-M11546：SHOW_BLOCK 的 [8] 一人称重设真按钮——快捷键、正文前缀、一人称行补宽）
// M11900 的 must_mention 在 #593 随核对文案更新（旧核对只认特定写法，已被替换）

const SHOW = 'ere/page/components/chara-info-title.js';
const TALENTS = 'ere/page/components/chara-talents.js';
const ABLMARK = 'ere/page/components/chara-info-abl-mark.js';
const APPEAR = 'ere/page/components/chara-appearance.js';
const STAIN = 'ere/page/components/stain-info.js';
const EQUIP = 'ere/page/components/chara-equip-status.js';
const DATA = 'ere/page/components/chara-data.js';
const COND = 'ere/page/page-chara-talent-condition.js';
const MAIN = 'ere/page/page-chara-info-show.js';
const BODY = 'ere/chara/chara-body.js';
const WIDTH = 'ere/utils/display-width.js';
const TRAIN = 'ere/page/page-train.js';
const USERCOM = 'ere/page/page-usercom.js';

/**
 * 每条 = 一次「改坏一处、本票测试必须红」。
 * @param {number} id 编号
 * @param {string} desc 说明
 * @param {string} file 靶文件
 * @param {string} find 命中串（靶文件里恰一次）
 * @param {string} replace 变异后的串
 * @param {string} must_mention 失败输出里必须出现的片段
 * @param {string[]} [tests] 守它的测试文件（缺省本票的 chara-info-show；
 *   cup_size 的一组住在 test/chara-body.test.js）
 */
const make = (id, desc, file, find, replace, must_mention, tests) => ({
  desc: `M${id} ${desc}`,
  file,
  find,
  replace,
  tests: tests ?? ['chara-info-show'],
  must_mention,
});

export default [
  // —— #565 返工：SHOW_CHARA_INFO 的 TARGET 换手 ——
  make(
    11633,
    'show_chara_info 的 TARGET 换手删除（语尾按调用方而非被显示角色取）',
    MAIN,
    `  const target_pool = era_flag.target;
  era_flag.target = cid;
  try {
    return await show_chara_info_body(cid, page, rand, background);
  } finally {
    era_flag.target = target_pool;
  }`,
    `  return await show_chara_info_body(cid, page, rand, background); // 变异：TARGET 不换手`,
    '语尾按被显示角色',
    ['kojo-family-coverage'],
  ),
  make(
    8701,
    'CUP_SIZE：CAL_VAR ≤ 1 的档位由 1 放宽到 2',
    BODY,
    `  if (cal_var <= 1) return '-'; // :791-792`,
    `  if (cal_var <= 2) return '-'; // :791-792`,
    'CUP_SIZE',
    ['chara-body'],
  ),
  make(
    8702,
    'CUP_SIZE：除数 25 改成 20',
    BODY,
    `  const cal_var = int((bust10 - under_bust(cid, height10)) / 25); // :790`,
    `  const cal_var = int((bust10 - under_bust(cid, height10)) / 20); // :790`,
    'CUP_SIZE',
    ['chara-body'],
  ),
  make(
    8703,
    'CUP_SIZE：字母表少一格（AAA 被吃掉）',
    BODY,
    `const CUP_LETTERS = [
  'AAA',
  'AA',`,
    `const CUP_LETTERS = [
  'AA',
  'A',`,
    'CUP_SIZE',
    ['chara-body'],
  ),
  make(
    8704,
    'SHOW_INFO_TITLE：编号列宽 3 改成 4',
    SHOW,
    'const title = [{ content: `NO.${pad_display(String(cid), 3)} ` }]; // :333',
    'const title = [{ content: `NO.${pad_display(String(cid), 4)} ` }]; // :333',
    'SHOW_INFO_TITLE',
  ),
  make(
    8705,
    'SHOW_INFO_TITLE：名字列宽 12 改成 10',
    SHOW,
    '  title.push({ content: pad_display(name, 12) }); // :336',
    '  title.push({ content: pad_display(name, 10) }); // :336',
    'SHOW_INFO_TITLE',
  ),
  make(
    8706,
    'SHOW_INFO_TITLE：爱慕与淫乱的优先级对调',
    SHOW,
    `  if (talent(cid, TALENT_AIBA) !== 0) {
    title.push({ content: '　<爱慕>　', color: ENAMORED_COLOR });
  } else if (talent(cid, TALENT_INRAN) !== 0) {`,
    `  if (talent(cid, TALENT_INRAN) !== 0) {
    title.push({ content: '　<淫乱>　', color: ENAMORED_COLOR });
  } else if (talent(cid, TALENT_AIBA) !== 0) {`,
    'SHOW_INFO_TITLE',
  ),
  make(
    8707,
    'SHOW_INFO_TITLE：年龄的右对齐宽度 48 改成 36',
    SHOW,
    '  title.push({ content: pad_left(age_str, 48) });',
    '  title.push({ content: pad_left(age_str, 36) });',
    'SHOW_INFO_TITLE',
  ),
  make(
    8708,
    'SHOW_INFO_TITLE：年龄的开启位由 12 改成 13',
    SHOW,
    'const BIT_AGE = 12; // 显示角色的年龄',
    'const BIT_AGE = 13; // 显示角色的年龄',
    'SHOW_INFO_TITLE',
  ),
  make(
    8709,
    'SHOW_INFO_TITLE：魔王之影的寿命倒计时整段删掉',
    SHOW,
    `    if (talent(cid, TALENT_MAOU_SHADOW) !== 0) {
      // :364 寿命倒计时（{CFLAG:820, 3} 同样右对齐宽 3）
      age_str += \` [寿命还有\${pad_left(String(era.get(\`cflag:\${cid}:820\`) || 0), 3)} 天]\`;
    }`,
    `    if (talent(cid, TALENT_MAOU_SHADOW) !== 0) {
      // :364 寿命倒计时（变异：整段删掉）
    }`,
    'SHOW_INFO_TITLE',
  ),
  make(
    8710,
    'SHOW_BLOCK：三围行的守卫位由 15 改成 12',
    SHOW,
    '  const show_size = getbit(BIT_SIZE) && is_not_master;',
    '  const show_size = getbit(BIT_AGE) && is_not_master;',
    'SHOW_BLOCK',
  ),
  make(
    8711,
    'SHOW_BLOCK：罩杯括号的补位宽度 7 改成 8',
    SHOW,
    '      bust.push({ content: pad_display(`(${cup_size(cid)})`, 7) }); // :379/:382',
    '      bust.push({ content: pad_display(`(${cup_size(cid)})`, 8) }); // :379/:382',
    'SHOW_BLOCK',
  ),
  make(
    8712,
    'SHOW_BLOCK：受注任务守卫的 CFLAG:534 判据由 1 改成 0',
    SHOW,
    '    (era.get(`cflag:${cid}:534`) || 0) === 1 &&',
    '    (era.get(`cflag:${cid}:534`) || 0) === 0 &&',
    'SHOW_BLOCK',
  ),
  make(
    8713,
    'SHOW_TALENT：每行的素质数由 8 改成 6',
    TALENTS,
    'const PER_ROW = 8;',
    'const PER_ROW = 6;',
    'SHOW_TALENT',
  ),
  make(
    8714,
    'SHOW_TALENT：续行缩进由 4 个全角空格改成 2 个',
    TALENTS,
    "const ROW_INDENT = '　　　　';",
    "const ROW_INDENT = '　　';",
    'SHOW_TALENT',
  ),
  make(
    8715,
    'SHOW_TALENT：简单臂的起始计数 U 由 6 改成 0',
    TALENTS,
    'const PLAIN_START_U = 6;',
    'const PLAIN_START_U = 0;',
    '简单臂',
  ),
  make(
    8716,
    'SHOW_TALENT：简单臂的跳过区间上界由 325 改成 324（325 被误跳）',
    TALENTS,
    'const PLAIN_SKIP_TO = 325;',
    'const PLAIN_SKIP_TO = 324;',
    '简单臂跳过',
  ),
  make(
    8717,
    'SHOW_TALENT：自慰狂那一档的分组色改错',
    TALENTS,
    "  { ids: [101, 102, 230, 74], color: 'DarkSeaGreen' },",
    "  { ids: [101, 102, 230, 74], color: 'LightSalmon' },",
    '分组色',
  ),
  make(
    8718,
    'SHOW_TALENT：EX 性格档的色串改错',
    TALENTS,
    "const EX_COLOR_SELF = '#ffd700';",
    "const EX_COLOR_SELF = '#ffcc00';",
    'EX 素质的第二组配色',
  ),
  make(
    8719,
    'SHOW_TALENT：328 的守卫由原作笔误的 327 改成 328（「修正」了原作缺陷）',
    TALENTS,
    '      { id: 328, guard: (t) => t(327) !== 0 }, // :606-607 原作笔误，1:1 保留',
    '      { id: 328, guard: (t) => t(328) !== 0 }, // :606-607 原作笔误，1:1 保留',
    '原作笔误',
  ),
  make(
    8720,
    'SHOW_TALENT：男体的淫核改名判据由 230 改成 231',
    TALENTS,
    "    else if (id === 230) label = '绝伦';",
    "    else if (id === 231) label = '绝伦';",
    '男体',
  ),
  make(
    8721,
    'SHOW_INFO_ABL：扫描上界由 41 改成 40（40 号能力被漏掉）',
    ABLMARK,
    '  for (let abl = 0; abl < 41; abl += 1) {',
    '  for (let abl = 0; abl < 40; abl += 1) {',
    'SHOW_INFO_ABL',
  ),
  make(
    8722,
    'SHOW_INFO_ABL：空洞跳过的第一段由 5-9 改成 6-9',
    ABLMARK,
    '      (abl >= 5 && abl <= 9) ||',
    '      (abl >= 6 && abl <= 9) ||',
    '空洞',
  ),
  make(
    8723,
    'SHOW_INFO_ABL：能力名列宽由 8 改成 6',
    ABLMARK,
    '    row += `${NBSP.repeat(2)}${pad_display(name, 8)} - LV${pad_display(String(level), 2)}`;',
    '    row += `${NBSP.repeat(2)}${pad_display(name, 6)} - LV${pad_display(String(level), 2)}`;',
    'SHOW_INFO_ABL',
  ),
  make(
    8724,
    'SHOW_INFO_ABL：可提升标记位由 2 空格改成不加',
    ABLMARK,
    '    row += NBSP.repeat(2);',
    "    row += '';",
    'SHOW_INFO_ABL',
  ),
  make(
    8725,
    'BAR_TEXT：填充字符由 * 改成 #',
    ABLMARK,
    "  return `[${'*'.repeat(filled)}${'.'.repeat(len - filled)}]`;",
    "  return `[${'#'.repeat(filled)}${'.'.repeat(len - filled)}]`;",
    'BAR_TEXT',
  ),
  make(
    8726,
    'SHOW_INFO_MARK：刻印条的满级由 3 改成 4',
    ABLMARK,
    'const MARK_BAR_MAX = 3;',
    'const MARK_BAR_MAX = 4;',
    'SHOW_INFO_MARK',
  ),
  make(
    8727,
    'SHOW_APPEARACE：阴毛档的上沿 20 改成 30',
    APPEAR,
    "  { max: 20, text: '的阴部覆盖着刚刚长出的阴毛。' },",
    "  { max: 30, text: '的阴部覆盖着刚刚长出的阴毛。' },",
    '阴毛七档',
  ),
  make(
    8728,
    'SHOW_APPEARACE：上身的位由 6 改成 4（胸部刺青的守卫判错）',
    APPEAR,
    'const BIT_TOPS_OFF = 6; // 上半身赤裸（位 1 + 位 2）',
    'const BIT_TOPS_OFF = 4; // 上半身赤裸（位 1 + 位 2）',
    'SHOW_APPEARACE',
  ),
  make(
    8729,
    'SHOW_APPEARACE：穿环的位序对调（鼻子与嘴唇）',
    APPEAR,
    `  { bit: 64, name: '鼻子' }, // :1310-1318
  { bit: 32, name: '嘴唇' }, // :1319-1327`,
    `  { bit: 32, name: '鼻子' }, // :1310-1318
  { bit: 64, name: '嘴唇' }, // :1319-1327`,
    '位序',
  ),
  make(
    8730,
    'STAIN_INFO：污渍两个标记对调（乳汁与尿液）',
    STAIN,
    `  { bit: 16, text: '<乳汁>' },
  { bit: 32, text: '<尿液>' },`,
    `  { bit: 16, text: '<尿液>' },
  { bit: 32, text: '<乳汁>' },`,
    '污渍位逐条',
  ),
  make(
    8731,
    'STAIN_INFO：男人跳过乳房位的判据被删',
    STAIN,
    '    if (count === PART_BREAST && t(TALENT_MAN) !== 0) continue;',
    '    if (false && count === PART_BREAST && t(TALENT_MAN) !== 0) continue;',
    '部位名六档',
  ),
  make(
    8732,
    'SHOW_EQUIP_2：摄影剩余次数的公式常数改错（10 改成 20）',
    EQUIP,
    `    const remaining =
      10 +`,
    `    const remaining =
      20 +`,
    'SHOW_EQUIP_2',
  ),
  make(
    8733,
    'SHOW_EQUIP_1：触手形态的优先判据由 90 改成 89',
    EQUIP,
    '    if (t(bit) && t(90)) push(` ${tentacle}`);',
    '    if (t(bit) && t(89)) push(` ${tentacle}`);',
    '触手形态',
  ),
  make(
    8734,
    'SHOW_DATA：善恶值第一档阈值 150 改成 100',
    DATA,
    "  { over: 150, text: '纯洁' },",
    "  { over: 100, text: '纯洁' },",
    '善恶值七档',
  ),
  make(
    8735,
    'STC_PRINTC：缺省列宽 15 改成 16',
    COND,
    'const STC_PRINT_WIDTH = 15;',
    'const STC_PRINT_WIDTH = 16;',
    'STC_PRINTC',
  ),
  make(
    8736,
    'STC_SEIIN_CHECK：基准值 50 改成 60',
    COND,
    'const SEIIN_BASE = 50;',
    'const SEIIN_BASE = 60;',
    'STC_SEIIN_CHECK',
  ),
  make(
    8737,
    'HEXtoDEC：三段合成由原作的 ×15 改成 ×16（「修正」了源里的进制笔误）',
    MAIN,
    '  dec[0] = digits[0] * 15 + digits[1];',
    '  dec[0] = digits[0] * 16 + digits[1];',
    'HEXtoDEC',
  ),
  make(
    8738,
    'ColorJudgmentWorB：白/黑字的判据由 <= 128 改成 <= 100',
    MAIN,
    '  const value = average <= 128 ? 255 : 0; // :1827-1831',
    '  const value = average <= 100 ? 255 : 0; // :1827-1831',
    'ColorJudgmentWorB',
  ),
  make(
    8739,
    'SHOW_CHARA_INFO：献祭满足的判据由 30 改成 20',
    MAIN,
    'const SACRIFICE_FULL = 30;',
    'const SACRIFICE_FULL = 20;',
    '献祭',
  ),
  make(
    8740,
    'SHOW_CHARA_INFO：页码 3 的第三个素质名由 75 换成 76（编号错位）',
    MAIN,
    "era.get('talentname:75')",
    "era.get('talentname:76')",
    '页码 3 的四个素质名',
  ),
  make(
    8741,
    'SHOW_TALENT：职业档的分组色上界由 212 改成 211',
    TALENTS,
    "  { from: 200, to: 212, color: '#64ff64' },",
    "  { from: 200, to: 211, color: '#64ff64' },",
    '分组色',
  ),
  make(
    8742,
    'SHOW_TALENT_CONDITION：sexskill_2 的系数由 10 改成 20',
    COND,
    '  const sexskill_2 = 100 + 10 * sexskill_count; // :160',
    '  const sexskill_2 = 100 + 20 * sexskill_count; // :160',
    '四档需求',
  ),
  make(
    8743,
    'SHOW_TALENT_CONDITION：「条件」补字的阈值由 4 改成 5',
    COND,
    'const TALENT_LABEL_LIMIT = 4;',
    'const TALENT_LABEL_LIMIT = 5;',
    '补字',
  ),
  make(
    8744,
    'SHOW_TALENT_CONDITION：崩坏的素质编号由 9 改成 10（行首不再染不可用色）',
    COND,
    'const TALENT_BREAK = 9;',
    'const TALENT_BREAK = 10;',
    '三档配色',
  ),
  make(
    8745,
    'STC_COLOR_TRUE：达标色由 White 改成 Gray',
    COND,
    "  true: 'White', // :586 SETCOLORBYNAME White",
    "  true: 'Gray', // :586 SETCOLORBYNAME White",
    '两档配色',
  ),
  make(
    8746,
    'STC_COLOR_FALSE：未达标色由 Gray 改成 White',
    COND,
    "  false: 'Gray', // :589 SETCOLORBYNAME Gray",
    "  false: 'White', // :589 SETCOLORBYNAME Gray",
    '两档配色',
  ),
  make(
    8747,
    'STC_COLOR_INVALID：崩坏色由 DarkRed 改成 DarkSeaGreen',
    COND,
    "  invalid: 'DarkRed', // :600 SETCOLORBYNAME DarkRed",
    "  invalid: 'DarkSeaGreen', // :600 SETCOLORBYNAME DarkRed",
    '三档配色',
  ),
  make(
    8748,
    'STC_COLOR_ACHIEVE：达成色由 102,179,255 改成 255,215,0',
    COND,
    "  achieve: '#66b3ff', // :603 SETCOLOR 102,179,255",
    "  achieve: '#ffd700', // :603 SETCOLOR 102,179,255",
    '三档配色',
  ),
  make(
    8749,
    'STC_COLOR_RIGHT：达标色与 STC_COLOR_ALERT 的警示色对调',
    COND,
    "  right: 'DarkSeaGreen', // :597 SETCOLORBYNAME DarkSeaGreen",
    "  right: 'LightSalmon', // :597 SETCOLORBYNAME DarkSeaGreen",
    'STC_SAYNO',
  ),
  make(
    8750,
    'SHOW_TALENT_CONDITION：sexskill_3 的系数由 50 改成 60',
    COND,
    '  const sexskill_3 = 300 + 50 * sexskill_count; // :161',
    '  const sexskill_3 = 300 + 60 * sexskill_count; // :161',
    'sexskill_3',
  ),
  make(
    8751,
    'SHOW_TALENT_CONDITION：时常发情·润滑积蓄的阈值由 700 改成 800',
    COND,
    '(era.get(`cflag:${cid}:81`) || 0) >= 700 ? COLOR.true : COLOR.false,',
    '(era.get(`cflag:${cid}:81`) || 0) >= 800 ? COLOR.true : COLOR.false,',
    '时常发情',
  ),
  make(
    8752,
    'SHOW_TALENT_CONDITION：时常发情·欲情积蓄的阈值由 2250 改成 2251',
    COND,
    '(era.get(`cflag:${cid}:82`) || 0) >= 2250 ? COLOR.true : COLOR.false,',
    '(era.get(`cflag:${cid}:82`) || 0) >= 2251 ? COLOR.true : COLOR.false,',
    '时常发情',
  ),
  make(
    8753,
    'DISPLAY_WIDTH：全角判据由 > 0xff 改成 > 0x7f',
    WIDTH,
    '    width += ch.charCodeAt(0) > 0xff ? 2 : 1;',
    '    width += ch.charCodeAt(0) > 0x7f ? 2 : 1;',
    'DISPLAY_WIDTH',
  ),
  make(
    8754,
    'SLICE_DISPLAY：超宽判据由 > 改成 >=（恰好装满时多截一个全角字）',
    WIDTH,
    '    if (used + w > width) break;',
    '    if (used + w >= width) break;',
    'SLICE_DISPLAY',
  ),
  make(
    8755,
    'STAIN_INFO：私处位的跳位判据错挂到乳房位',
    STAIN,
    '    if (count === PART_VAGINA && t(TALENT_MAN) !== 0) continue;',
    '    if (count === PART_BREAST && t(TALENT_MAN) !== 0) continue;',
    '部位名六档',
  ),
  make(
    8756,
    'STAIN_INFO：助手段的整段守卫由 ASSI >= 0 改成 ASSI > 0',
    STAIN,
    '  if (era_flag.assi >= 0) {',
    '  if (era_flag.assi > 0) {',
    'ASSI',
  ),
  make(
    8757,
    'SHOW_EQUIP_2：摄影位的位号由 53 改成 52',
    EQUIP,
    '  if (t(53)) {',
    '  if (t(52)) {',
    'SHOW_EQUIP_2',
  ),
  make(
    8758,
    'SHOW_DATA：善恶值「秩序」档的下沿由 50 改成 51',
    DATA,
    "  { over: 50, text: '秩序' },",
    "  { over: 51, text: '秩序' },",
    '善恶值七档',
  ),
  make(
    8759,
    'SHOW_APPEARACE：阴毛第一档的上沿由 1 改成 2',
    APPEAR,
    "  { max: 1, text: '的性器完全没有长毛。' },",
    "  { max: 2, text: '的性器完全没有长毛。' },",
    '阴毛七档',
  ),
  make(
    8760,
    'SHOW_CHARA_INFO：可献祭状态集去掉 8（拘束台那一档）',
    MAIN,
    'const SACRIFICABLE_STATES = [0, 7, 8];',
    'const SACRIFICABLE_STATES = [0, 7];',
    '可献祭',
  ),
  // —— #546：SHOW_BLOCK 的 [8] 一人称重设真按钮 ——
  make(
    11544,
    'SHOW_BLOCK：[8] 一人称重设按钮的快捷键改坏（8 改 9——CASE 8 分发落在白名单外）',
    SHOW,
    "    era.printButton('一人称重设 ', 8);",
    "    era.printButton('一人称重设 ', 9);",
    '[8] 一人称重设真按钮',
  ),
  make(
    11545,
    'SHOW_BLOCK：[8] 按钮正文手写快捷键前缀（实显 [8] [8] 一人称重设，PR #30 同款事故）',
    SHOW,
    "    era.printButton('一人称重设 ', 8);",
    "    era.printButton('[8] 一人称重设 ', 8);",
    '[8] 一人称重设真按钮',
  ),
  make(
    11546,
    'SHOW_BLOCK：一人称行的补宽 26 改 24（自称列对齐契约）',
    SHOW,
    '    era.print(`一人称：${pad_display(self_call(cid), 26)}`);',
    '    era.print(`一人称：${pad_display(self_call(cid), 24)}`);',
    '[8] 一人称重设真按钮',
  ),
  // —— #586：献祭名单轮的返回编号（预设 100 × 原作的 [100] 撞号） ——
  make(
    11900,
    'SHOW_CHARA_INFO：名单轮的返回编号退回原作的 100（与预设 100 的角色行撞号复现）',
    MAIN,
    'const LIST_RETURN = 999;',
    'const LIST_RETURN = 100;',
    '同一轮里与角色行同屏的固定编号不得等于预设 ID',
    ['chara-info-show', 'child-id-collision'],
  ),
  make(
    11901,
    'SHOW_CHARA_INFO：名单轮的返回按钮打回原作的 100（判定仍按 LIST_RETURN，敲 999 被拒收）',
    MAIN,
    "    era.printButton('返回', LIST_RETURN);",
    "    era.printButton('返回', 100);",
    '输入不合法',
  ),
  make(
    11902,
    'SHOW_CHARA_INFO：名单轮的返回判定退回 100（打印是 999，敲 999 落进名单循环）',
    MAIN,
    `    if (result === LIST_RETURN) {
      return true; // :131-133 ARG = shadow; RESTART
    }`,
    `    if (result === 100) {
      return true; // :131-133 ARG = shadow; RESTART
    }`,
    '输入不合法！请输入以下值之一',
  ),
  // —— #586 的十个探针暴露的覆盖缺口（条件键两端与编号基数、勇者档、自身排除、
  // RESTART），补齐用例后一并入表 ——
  make(
    11903,
    'SHOW_CHARA_INFO：条件键上界挪一格（1005 → 1004——最后一档瞳色切不过去）',
    MAIN,
    'if (result >= 1000 && result <= 1005) {',
    'if (result >= 1000 && result <= 1004) {',
    '切页后 9 号不再符合条件',
  ),
  make(
    11907,
    'SHOW_CHARA_INFO：条件键下界挪一格（1000 → 1001——第一档种族切不回去）',
    MAIN,
    'if (result >= 1000 && result <= 1005) {',
    'if (result >= 1001 && result <= 1005) {',
    '切页后 9 号不再符合条件',
  ),
  make(
    11908,
    'SHOW_CHARA_INFO：条件键的编号基数挪一格（1000 + index → 1001 + index）',
    MAIN,
    '      era.printButton(kind, 1000 + index);',
    '      era.printButton(kind, 1001 + index);',
    '输入不合法！请输入以下值之一',
  ),
  make(
    11904,
    'SHOW_CHARA_INFO：勇者档编号改错（STATE_HERO 2 → 3——勇者行不再打开贡品信息页）',
    MAIN,
    'if (picked_state === STATE_HERO) {',
    'if (picked_state === 3) {',
    '打开的是 9 号的贡品信息页',
  ),
  make(
    11905,
    'SHOW_CHARA_INFO：名单不再排除献祭对象自身（源 :98 的 temp != shadow 去掉）',
    MAIN,
    `      if (
        id === shadow ||`,
    `      if (
        false || // 变异：不排除献祭对象自身`,
    '献祭对象自身的行不出',
  ),
  make(
    11906,
    'SHOW_CHARA_INFO：名单轮的返回从 RESTART 改成直接退到首页（出口轮不再重画）',
    MAIN,
    `      const restart = await sacrifice_flow(cid, background); // :33-214
      if (restart) continue; // RESTART`,
    `      const restart = await sacrifice_flow(cid, background); // :33-214
      if (restart) return 1; // 变异：RESTART 改成直接退到首页`,
    'RESTART 后出口轮重画',
  ),
  // —— #593：同屏固定编号核对的鉴别力（不认特定写法、`A + index` 展开、登记项失效） ——
  make(
    11983,
    'SHOW_CHARA_INFO：条件键编号基数挪进预设 ID 段（1000 + index → 100 + index，只被静态核对盯住）',
    MAIN,
    '      era.printButton(kind, 1000 + index);',
    '      era.printButton(kind, 100 + index);',
    '同一轮里与角色行同屏的固定编号不得等于预设 ID',
    ['child-id-collision'],
  ),
  make(
    11984,
    'SHOW_CHARA_INFO：名单轮新插一枚编号 7（预设 ID）的固定按钮（#593 的验收抽样）',
    MAIN,
    "    era.printButton('返回', LIST_RETURN);",
    "    era.printButton('返回', LIST_RETURN);\n    era.printButton('探针', 7);",
    '同一轮里与角色行同屏的固定编号不得等于预设 ID',
    ['child-id-collision'],
  ),
  // 靶文件是核对自己（test/child-id-collision.test.js）：回边并错轮 = 漏报
  {
    desc: 'M11988 同屏核对：尾段无条件并进第 0 轮（sacrifice_flow 形状的尾段漏报）',
    file: 'test/child-id-collision.test.js',
    find: `      rounds[head] = {
        fixed: [...rounds[head].fixed, ...tail.fixed],
        rows: rounds[head].rows || tail.rows,
      };`,
    replace: `      rounds[0] = {
        fixed: [...rounds[0].fixed, ...tail.fixed],
        rows: rounds[0].rows || tail.rows,
      };`,
    tests: ['child-id-collision'],
    must_mention: '尾段的 [7] 必须并进循环头那一轮',
  },
];
