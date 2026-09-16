/**
 * @file 角色信息的素质一览（@SHOW_TALENT / @SHOW_TALENT_GROUP）。
 *
 * 源: target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB
 *       @SHOW_TALENT（:428-834）/ @SHOW_TALENT_GROUP（:835-921）
 *
 * 两个显示臂由 FLAG:5 位 8「素质分类显示」（SYSTEM/CONFIG.ERB:165）切换：
 *   - 开：七个带标签的分组（性別/性格/体质/技术/性癖/后天/战斗），组内逐项
 *     过素质表，每 8 项换行、续行补 4 个全角空格对齐到标签之后；
 *   - 关：0-399 全扫一遍（跳过 300-324）再补一趟 470-489 的精英技能，无标签，
 *     起始计数 U = 6（原作如此，首行只放得下 2 项）。
 *
 * 分组扫描用表驱动（SECTIONS）：源里是 60 余段几乎同形的
 * `FOR LCOUNT, A, B / SIF TALENT:TARGET:(LCOUNT) / CALL SHOW_TALENT_GROUP`，
 * 逐段抄写既无从复核也易漏项。边界与跳过集逐条对着源行抄，注释给出行号。
 *
 * 有意偏离（各条注明依据）：
 *   - `PRINTFORML %TSTR%`（:518-521/:587-590/:718-721/:758-761）里的 TSTR 在活代码里从不被
 *     写入（写它的那一版已被注释掉，:663-677），运行期恒为空串——它的作用
 *     只是「把当前行收掉」，此处按「收行」承载，不读那个变量；
 *   - 命名色按项目先例直接落名字串（loader 认 CSS 色名，look.js:932-934 的
 *     LIGHT_SALMON / page-intercept.js:84 的 DarkSeaGreen 同款），不转十六
 *     进制——命名色与十六进制在渲染层的 hover 态判定不同；
 *   - `SETCOLOR`/`RESETCOLOR` 的有状态配色按「逐项独立定色」承载：
 *     SHOW_TALENT_GROUP 末尾无条件 RESETCOLOR（:916），故未命中 SELECTCASE
 *     的项总是从默认色开始，与「每项独立定色」等价；
 *   - `SIF TALENT:TARGET:327 → CALL SHOW_TALENT_GROUP(328)`（:606-607）是
 *     原作笔误（用 327 的值守 328 的行），1:1 保留并以 entry.guard 标注；
 *   - 模式 1（感觉封锁名）在 `target/` 全库零调用者（本文件九个调用点的实参
 *     只有 0 与 TALENT&2），但它是函数签名的一部分，照原样实现，
 *     `show_talent_group` 导出以便用例与将来的调用方直驱。
 */

const era = require('#/era-electron');
const { ex_talentname } = require('#/chara/chara-ex');

/** FLAG:5 位 8 = 素质分类显示（SYSTEM/CONFIG.ERB:165 的配置页标签） */
const BIT_TALENT_GROUP = 8;

/** 每行素质数（源 `U % 8 == 0`，:835-838/:837-840） */
const PER_ROW = 8;

/** 换行后的行首缩进（源 `PRINTV "\u3000\u3000\u3000\u3000"`，:838-841，对齐到「\u3000性格：」之后） */
const ROW_INDENT = '　　　　';

/** 素质编号（yml/Talent.yml 的名字表；原件以名字寻址，此处用编号 + 注释） */
const TALENT_MAIDEN = 0; // 处女
const TALENT_VIRGIN = 1; // 童贞
const TALENT_FUTA = 121; // 扶她
const TALENT_MAN = 122; // 男人
const TALENT_SEALED = 273; // 私处封印
const TALENT_PENIS = 318; // 阴茎的状态
const TALENT_WITCH = 206; // 巫者（该编号恒以固定名显示，源 :911-912）

/**
 * 素质分组色（源 :842-868 的 SELECTCASE）。未命中即默认色（返回 undefined）。
 * 七条与源逐条对应；职业那档（200-212）与育儿档同为 100,255,100。
 */
const GROUP_COLORS = [
  { ids: [101, 102, 230, 74], color: 'DarkSeaGreen' },
  { ids: [103, 104, 232, 75], color: '#ffa500' },
  { ids: [105, 106, 233, 77], color: '#db7093' },
  { ids: [107, 108, 231, 78, 109, 110, 114, 116, 119], color: '#66b3ff' },
  { ids: [154, 130, 153, 341, 342], color: '#64ff64' },
  { ids: [85, 76], color: 'Salmon' },
  { from: 200, to: 212, color: '#64ff64' },
];

/** SETCOLOR 255,215,0（EX 性格，源 :900） */
const EX_COLOR_SELF = '#ffd700';
/** SETCOLOR 100,255,100（EX 职业，源 :906） */
const EX_COLOR_SKILL = '#64ff64';
// 源 :902-903 的 CASE 801 TO 900 与 :907-908 的 CASEELSE 都是 RESETCOLOR，
// 即「不染」，与默认色同形，不需要单独的常量。

/** `SETCOLOR 161,216,230`（阴茎状态标，源 :450）→ 渲染层 CSS 色串 */
const PENIS_COLOR = '#a1d8e6';

/** 阴茎状态标（源 :451-460：TALENT:318 的五个档，越界不标） */
const PENIS_LABELS = [
  '[普通阴茎]',
  '[巨根]',
  '[短小包茎]',
  '[包茎]',
  '[马阴茎]',
];

/**
 * `FOR LCOUNT, A, B` 展开成编号表。上界是不含的——Emuera 的 FOR 在步长为正
 * 时循环到 `>= 结束值`（emuera-basic-agent-guide 的 control-flow.md）。
 * @param {number} from 起始（含）
 * @param {number} to 结束（不含）
 * @param {{skip?: number[], ex?: boolean, value?: boolean}} [extra] 附加属性；
 *   skip = 源里 `CONTINUE` 掉的编号，其余字段原样并进每条 entry
 * @returns {Array<object>}
 */
function span(from, to, extra = {}) {
  const skip = new Set(extra.skip ?? []);
  const out = [];
  for (let id = from; id < to; id += 1) {
    if (!skip.has(id)) out.push({ ...extra, id });
  }
  return out;
}

/** 素质编号表（source 行的跳集见各条注释） */
const SKIP_BODY_FEATURES = [
  101, 102, 103, 104, 105, 106, 107, 108, 113, 117, 118, 121, 122, 123, 126,
  127, 132, 133, 134, 136,
]; // :537 的 CASE 101 TO 108, 113, 117, 118, 121, 122, 123, 126, 127, 132, 133, 134, 136
const SKIP_BATTLE_EXCLUSIVE = [244, 245, 246, 247, 248, 253, 254, 255, 256]; // :771 INRANGE(244,248) || INRANGE(253,256)

/**
 * 分类显示的分组表。每条 entry：`{ id, ex?, value?, guard? }`——
 *   - `ex`：读 EX_TALENT 并按模式 2 渲染（源 `SIF EX_TALENT:TARGET:(LCOUNT)` +
 *     `CALL SHOW_TALENT_GROUP(LCOUNT, 2)`）；
 *   - `value`：渲染模式取自该素质自身的第 2 位（源 :661
 *     `TALENT:TARGET:(LCOUNT) & 2`）；
 *   - `guard(t)`：用别的判据当守卫（缺省 = 自身非 0）。
 *
 * `flush` 是段收尾方式：
 *   - `'items'`：本段出过至少一项才收行（源 `SIF U != 0 → PRINTFORML %TSTR%`），
 *     否则标签留在行上、由下一段的标签接着拼——黄金样本
 *     daycycle-max-log:188 的 `\u3000体质：\u3000技术：[魅力]` 就是这个形态；
 *   - `'always'`：无条件收行（源 `SIF !LINEISEMPTY() → PRINTL`，标签已在行上）。
 */
const SECTIONS = [
  {
    // :471-518 性格：口上用性格 160-179 → EX 性格 500-599 → EX 素质 100-800
    //   → 性への関心/乙女心 10-39 → 潔癖度 60-69 → 三个单点 → 150-156
    label: '　性格：',
    flush: 'items',
    entries: [
      ...span(160, 180),
      ...span(500, 600),
      ...span(100, 801, { ex: true }),
      ...span(10, 40),
      ...span(60, 70),
      { id: 127 },
      { id: 132 },
      { id: 134 },
      ...span(150, 157, { skip: [153, 154] }),
    ],
  },
  {
    // :520-587 体质：体質 40-49 → 抗药性/漏尿癖 → 身体特徴 99-139（跳集见
    //   SKIP_BODY_FEATURES）→ 妊娠系单点 → 244-248 → 四个单点
    label: '　体质：',
    flush: 'items',
    entries: [
      ...span(40, 50),
      { id: 56 },
      { id: 57 },
      ...span(99, 140, { skip: SKIP_BODY_FEATURES }),
      {
        id: 133,
        guard: (t) =>
          t(133) !== 0 && (t(TALENT_FUTA) !== 0 || t(TALENT_MAN) !== 0),
      }, // :544
      { id: 153 },
      { id: 341 },
      { id: 342 },
      { id: 158 },
      { id: 159 },
      { id: 340 },
      { id: 154 },
      ...span(244, 249),
      { id: 253 },
      { id: 255 },
      { id: 256 },
      { id: 326 },
    ],
  },
  {
    // :589-636 技术：技術 50-59（跳 56/57）→ 四个单点 → 魅了 90-98 →
    //   三个单点 → 売春関係 180-189
    label: '　技术：',
    flush: 'always',
    entries: [
      ...span(50, 60, { skip: [56, 57] }),
      { id: 325 },
      { id: 327 },
      { id: 328, guard: (t) => t(327) !== 0 }, // :606-607 原作笔误，1:1 保留
      { id: 329 },
      ...span(90, 99),
      { id: 113 },
      { id: 117 },
      { id: 118 },
      { id: 126 },
      ...span(180, 190),
    ],
  },
  {
    // :638-721 性癖：性癖 70-89 → 101-108（带封锁位）→ 140-143 → 牝犬 →
    //   强化 230-239 → 特殊 270-272 → 五个单点
    label: '　性癖：',
    flush: 'items',
    entries: [
      ...span(70, 90),
      ...span(101, 109, { value: true }),
      ...span(140, 144),
      { id: 136 },
      ...span(230, 240),
      ...span(270, 273),
      { id: 274 },
      { id: 280 },
      { id: 281 },
      { id: 283 },
      { id: 282 },
    ],
  },
  {
    // :724-758 后天：四个单点 → 体調不良系 190-199 → 境遇や肩書 290-299 →
    //   キャンペーン 360-368
    label: '　后天：',
    flush: 'items',
    entries: [
      { id: 9 },
      { id: 123 },
      { id: 157 },
      { id: 254 },
      ...span(190, 200),
      ...span(290, 300),
      ...span(360, 369),
    ],
  },
  {
    // :761-790 战斗：职业 200-212 → 240-269（跳 244-248 与 253-256）→
    //   精英魔物技能 470-489 → EX 技能 801-899
    label: '　战斗：',
    flush: 'always',
    entries: [
      ...span(200, 213),
      ...span(240, 270, { skip: SKIP_BATTLE_EXCLUSIVE }),
      ...span(470, 490),
      ...span(801, 900, { ex: true }),
    ],
  },
];

/** 简单显示臂的扫描上界（源 `REPEAT 400`，:796） */
const PLAIN_LIMIT = 400;
/** 简单显示臂跳过的区间（源 :799-800 `COUNT >= 300 && COUNT < 325`） */
const PLAIN_SKIP_FROM = 300;
const PLAIN_SKIP_TO = 325;
/** 简单显示臂的起始计数（源 :795 `U = 6`，首行只放得下 2 项） */
const PLAIN_START_U = 6;
/** 简单显示臂的两趟扫描之间的额外一趟（源 :823-827，精英魔物技能） */
const PLAIN_EXTRA_FROM = 470;
const PLAIN_EXTRA_TO = 490;

/**
 * 素质编号对应的名字（源 TALENTNAME）。
 * @param {number} id
 * @returns {string}
 */
function talent_name(id) {
  return era.get(`talentname:${id}`) ?? '';
}

/**
 * 一项素质的显示名（源 :873-915 的三段改名规则）。
 *
 * @param {number} cid 角色 ID（源 TARGET）
 * @param {number} id 素质编号
 * @param {number} mode 渲染模式（0 = 普通 / 1 = 感觉封锁 / 2 = EX 素质）
 * @returns {string}
 */
function talent_label(cid, id, mode) {
  if (mode === 2) {
    return ex_talentname(id); // :896 %EX_TALENTNAME:(ARG)%
  }
  let label = talent_name(id); // :873
  // :874-882 男体：三个素质换用阴茎侧的名字
  if ((era.get(`talent:${cid}:${TALENT_MAN}`) || 0) !== 0) {
    if (id === 101) label = '阴茎钝感';
    else if (id === 102) label = '阴茎敏感';
    else if (id === 230) label = '绝伦';
  }
  // :883-894 模式 1（感觉封锁名）
  if (mode === 1) {
    if (id === 101) {
      label =
        (era.get(`talent:${cid}:${TALENT_MAN}`) || 0) !== 0
          ? '阴茎感觉封锁'
          : '阴核感觉封锁';
    } else if (id === 103) label = '私处感觉封锁';
    else if (id === 105) label = '肛门感觉封锁';
    else if (id === 107) label = '乳房感觉封锁';
  }
  return label;
}

/**
 * 一项素质的颜色（源 :842-909 的 SELECTCASE）。
 * @param {number} id 素质编号
 * @param {number} mode 渲染模式
 * @returns {string|undefined} 渲染层色串；默认色返回 undefined
 */
function talent_color(id, mode) {
  if (mode === 2) {
    // :897-909 第二个 SELECTCASE，覆盖第一个的结论
    if (id >= 101 && id <= 800) return EX_COLOR_SELF;
    if (id >= 901 && id <= 999) return EX_COLOR_SKILL;
    return undefined;
  }
  for (const rule of GROUP_COLORS) {
    if (rule.ids !== undefined && rule.ids.includes(id)) return rule.color;
    if (rule.from !== undefined && id >= rule.from && id <= rule.to) {
      return rule.color;
    }
  }
  return undefined;
}

/**
 * 行缓冲：`count` 是已上行的素质项数（源的 U），`fragments` 是待收的片段。
 * @param {string} [label] 行首标签
 * @param {number} [count] 初始计数
 * @returns {{fragments: Array<{content: string, color?: string}>, count: number}}
 */
function new_line(label, count = 0) {
  return { fragments: label === undefined ? [] : [{ content: label }], count };
}

/**
 * @SHOW_TALENT_GROUP（:835-921）的单步：换行判定 + 定名定色 + 计数。
 *
 * @param {{fragments: Array, count: number}} line 行缓冲
 * @param {number} cid 角色 ID（源 TARGET）
 * @param {number} id 素质编号（源 ARG）
 * @param {number} mode 渲染模式（源 ARG:1）
 */
function show_talent_group(line, cid, id, mode = 0) {
  // :838-841 每 8 项先换行、续行补 4 个全角空格
  if (line.count !== 0 && line.count % PER_ROW === 0) {
    era.print(line.fragments);
    line.fragments = [{ content: ROW_INDENT }];
  }
  // :911-914 巫者恒以固定名显示（写在函数最后，优先于前两段的改名结论）
  const label = id === TALENT_WITCH ? '巫者' : talent_label(cid, id, mode);
  line.fragments.push({ content: `[${label}]`, color: talent_color(id, mode) });
  line.count += 1; // :917
}

/**
 * 分类显示臂（源 :439-793）。
 * @param {number} cid 角色 ID
 */
function show_talent_grouped(cid) {
  const t = (index) => era.get(`talent:${cid}:${index}`) || 0;

  // :441-469 性別行：性别标 +（男/扶她时）阴茎状态标 + 三个素质标
  const gender = [{ content: '　性别：' }];
  if (t(TALENT_MAN) !== 0) gender.push({ content: '[男]' });
  else if (t(TALENT_FUTA) !== 0) gender.push({ content: '[扶她]' });
  else gender.push({ content: '[女]' });
  if (t(TALENT_MAN) !== 0 || t(TALENT_FUTA) !== 0) {
    const state = t(TALENT_PENIS); // :451-460 TALENT:318 五档
    if (state >= 0 && state < PENIS_LABELS.length) {
      gender.push({ content: PENIS_LABELS[state], color: PENIS_COLOR });
    }
  }
  for (const id of [TALENT_MAIDEN, TALENT_VIRGIN, TALENT_SEALED]) {
    if (t(id) !== 0) gender.push({ content: `[${talent_name(id)}]` });
  }
  era.print(gender); // :466-469 PRINTL

  // 缓冲跨段落携带未收行的标签（flush: 'items' 且本段无输出时，见文件头）
  let line = new_line();
  for (const section of SECTIONS) {
    line.fragments.push({ content: section.label });
    line.count = 0; // :473 等处的 U = 0
    for (const entry of section.entries) {
      const read = entry.ex
        ? (index) => era.get(`ex_talent:${cid}:${index}`) || 0
        : t;
      const value = read(entry.id);
      const ok = entry.guard !== undefined ? entry.guard(t) : value !== 0;
      if (!ok) continue;
      const mode = entry.ex ? 2 : entry.value ? value & 2 : 0;
      show_talent_group(line, cid, entry.id, mode);
    }
    if (section.flush === 'always' || line.count !== 0) {
      era.print(line.fragments); // :518-521/:587-590/:633-636/:718-721/:758-761/:787-790 的收行
      line = new_line();
    }
  }
}

/**
 * 简单显示臂（源 :794-829）：0-399 全扫（跳过 300-324）再补一趟精英技能。
 * @param {number} cid 角色 ID
 */
function show_talent_plain(cid) {
  const t = (index) => era.get(`talent:${cid}:${index}`) || 0;
  const line = new_line(undefined, PLAIN_START_U); // :795 U = 6
  for (let count = 0; count < PLAIN_LIMIT; count += 1) {
    if (count >= PLAIN_SKIP_FROM && count < PLAIN_SKIP_TO) continue; // :799-800
    if (t(count) === 0) continue;
    // :802-804 早泄只在扶她/男人时显示
    if (count === 133 && t(TALENT_FUTA) === 0 && t(TALENT_MAN) === 0) continue;
    show_talent_group(line, cid, count, 0);
  }
  for (let id = PLAIN_EXTRA_FROM; id < PLAIN_EXTRA_TO; id += 1) {
    if (t(id) !== 0) show_talent_group(line, cid, id, 0); // :823-827
  }
  // :828-829 SIF !LINEISEMPTY() → PRINTL
  if (line.fragments.length !== 0) era.print(line.fragments);
}

/**
 * @SHOW_TALENT（:428-834）：当前角色的素质一览。
 *
 * `ARG:0`（指定角色）→ 显式参数 cid——原作的 TARGET 换出换入习语不移植
 * （项目通例：ere 一律显式传参，chara-bars.js 同款）。
 *
 * @param {number} cid 角色 ID
 * @returns {string} 本臂用的分组标签形态（'grouped' / 'plain'，便于用例定位）
 */
function show_talent(cid) {
  const grouped = (((era.get('flag:5') || 0) >> BIT_TALENT_GROUP) & 1) !== 0; // :439
  if (grouped) {
    show_talent_grouped(cid);
    return 'grouped';
  }
  show_talent_plain(cid);
  return 'plain';
}

module.exports = {
  SECTIONS,
  show_talent,
  show_talent_group,
  talent_color,
  talent_label,
};
