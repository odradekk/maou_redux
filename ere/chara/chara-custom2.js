/**
 * @file 角色定制主循环与素质页（issue #392，N8 段 2）。
 *
 * 调用面：本文件内部的 char_custom 由同一工单的 ere/chara/chara-custom.js
 * （char_create 尾段 `await char_custom(target, arg, rand)`）调用；外观页与外观分发在
 * ere/chara/chara-custom3.js；char_custom_talent_deal 尾段的
 * 胸围重掷调用 chara-body.js 的
 * `char_bust_regenerate_wapped`（#406 落真身）。
 *
 * 移植说明（有意偏离既有行为，均注明依据）：
 *
 *   - **TARGET 换手显式化**：被定制的角色全部以 cid 形参承载（#5 决议
 *     第六条），无指针换手；唯一按角色寻址的地方是 `chara(cid).*` 门面，
 *     本身就带 cid。
 *   - **页脚四个 `PRINTLC` 升级为按钮**：`[997] 前一页` 一类列排版文本
 *     （左对齐补位、**不换行**），
 *     配 `INPUT` 收编号——列排版文本 + INPUT 的通则（PR #53）
 *     升级为 `era.printButton`，正文不写 `[编号]`（引擎 showAcc 自动补）。
 *   - **素质格用 `printMultiColumns`，每行 6 格**：
 *     `SIF LOCAL % 6 == 0 PRINT` / `PRINTBUTTON` / `SIF LOCAL % 6 == 0 PRINTL`
 *     是「6 枚一行」的字符流排版；EraElectron 的等价物是每行一次
 *     `printMultiColumns`（page-save-load.js 的 PRINTFORMLC 先例），
 *     每格宽度按 24 列均分（24/6 = 4）。**LOCAL 的跨调用累加**（LOCAL
 *     函数调用时不初始化）
 *     落成模块级缓冲：`print_single_talent(-1)` 冲掉未满的一行并把计数归零
 *     ——`char_custom_talent_page` 入页时先调一次。
 *   - **素质名空串即不渲染**（`SIF STRLENS(TALENTNAME:ARG) < 1
 *     RETURN`）：该分支同时挡住计数（LOCAL 不 ++）。
 *   - **素质格的颜色**：`RESETCOLOR` / `SETCOLORBYNAME GRAY` 落按钮的
 *     `config.color`（page-ablup.js 的 GRAY 同值 #808080；命名色在 hover 态
 *     会拼出非法值，见 menu-button.js 文件头第 2 条）。
 *   - **跨域写走门面**（#71）：本文件属 chara 域，四张表的下标各有属主——
 *     口上两素质（system 域，跨域写下标登记在案）、
 *     train 域的童贞与初体验对象/初吻对象/两个名字（`talent` 的 1 号、`cflag` 的 15/16、
 *     `cstr` 的 3/4、`abl` 的 31 号）、invasion 域的状态（`cflag` 的 1 号）、
 *     dungeon 域的攻防与战斗经验（`cflag` 的 11/12、`exp` 的 80 号、`base`）、
 *     event 域的预产日/孩子父亲（`cflag` 的 110/111）——一律经
 *     `chara(cid).<域>` 的具名访问器；域内下标（`talent` 的 chara 属主下标、
 *     `cflag` 的 9 号）裸寻址即合法，读全部放行（#70）。
 *   - **随机源提成 `rand` 形参**（chara-init.js 先例）：
 *     `RAND:3`、`RAND:6`、`RAND:2` 三处。
 *   - **`EX_FLAG:4444` 与 `MONEY`**：`era_exflag.legit_money`（非作弊资金）
 *     与 `era_flag.money`；两者同步扣款是既有写法。
 *   - **`char_bust_regenerate_wapped` 落真身（#406）**：真身在
 *     `ere/chara/chara-body.js`，随
 *     `rand` 形参一并从 `char_custom_talent_deal` 传入。
 *   - **空输入（`INPUTS`）按 #567 的决定处理**：0 视为
 *     空输入、走同一问卷的「随机生成。」支；两处提示行后各
 *     补一句「（输入 0 随机生成）」——有意偏离既有文案，判断条件与依据见
 *     ere/utils/input-text.js。
 *   - **选项升格为按钮**（#572）：chara_first_xp 的六处选项行
 *     与 char_custom 的最终确认
 *     改 `era.printButton`（PR #53 通则，正文不写 [编号] 前缀）。
 *     选项全部按钮化：input() 只回传本轮已打印按钮的快捷键，「输入错误，
 *     请重新开始」等越界支在实机不可达，保留为防御分支，不为它们造用例
 *     ——逐处说明见 chara_first_xp 的 JSDoc 与各处注释。
 *     **一处例外**：初吻部位一问保留 `useRule: false`——那四个编号的
 *     显示是有条件的（SIF）、受理是无条件的，
 *     收紧白名单会锁死「未显示但照收」的 201/301（见该处注释）。
 */

'use strict';

const era = require('#/era-electron');
const { cm_base, cm_kind, cm_cloth, cm_ns_exp } = require('#/chara/chara-make');
const { random_self_call } = require('#/chara/chara-self-call');
const {
  char_body_generate_wapped,
  char_bust_regenerate_wapped,
} = require('#/chara/chara-body');
const {
  char_custom_look_page,
  char_custom_look_deal,
} = require('#/chara/chara-custom3');
const {
  set_personality: set_personality_talent,
} = require('#/chara/chara-and-hair');
const { chara } = require('#/facade/chara');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { chara_callname } = require('#/utils/callname-utils');
const { input_text } = require('#/utils/input-text');

const default_rand = (n) => Math.floor(Math.random() * n);

/** `SETCOLORBYNAME GRAY`（page-ablup.js 同值） */
const GRAY = '#808080';

/** 素质格每行的格数（`LOCAL % 6`） */
const TALENT_COLUMNS = 6;

/** 栅格满行宽度（引擎 24 列） */
const GRID_COLUMNS = 24;

/** 页面总数（`<{L_PAGE+1}/5>` 的 5） */
const PAGE_COUNT = 5;

/** 素质页的行高（`LINECOUNT - L_LCOUNT < 27` 的 27） */
const TALENT_PAGE_ROWS = 27;

/** 职业唯一的区间（`INRANGE(L_TAL,200,220)`） */
const JOB_FIRST = 200;
const JOB_LAST = 220;

/** 口上唯一组（GROUPMATCH 列表） */
const PERSONALITY_TALENTS = [160, 161, 162, 163, 164, 166, 172, 173, 174, 175];

/** 胸围互斥组（GROUPMATCH(109,110,114,116,119)） */
const BUST_TALENTS = [109, 110, 114, 116, 119];

/**
 * custom_conflict_check 的 PAIRS 表。
 * 互斥对：两侧同时为真时清空两侧、并把本次点选的 ARG 设为真。
 */
const CONFLICT_PAIRS = [
  [0, 75],
  [30, 75],
  [10, 12],
  [11, 13],
  [13, 18],
  [14, 16],
  [15, 17],
  [17, 18],
  [20, 23],
  [21, 23],
  [22, 23],
  [20, 63],
  [21, 63],
  [22, 63],
  [23, 24],
  [25, 26],
  [27, 28],
  [30, 31],
  [32, 33],
  [35, 36],
  [40, 41],
  [42, 43],
  [44, 45],
  [50, 51],
  [61, 62],
  [62, 64],
  [70, 71],
  [74, 150],
  [76, 85],
  [74, 75],
  [74, 77],
  [74, 78],
  [75, 77],
  [75, 78],
  [77, 78],
  [122, 78],
  [79, 80],
  [79, 81],
  [79, 82],
  [79, 122],
  [80, 81],
  [80, 82],
  [81, 82],
  [99, 100],
  [101, 102],
  [103, 104],
  [105, 106],
  [103, 122],
  [104, 122],
  [107, 108],
  [111, 112],
  [109, 110],
  [109, 114],
  [109, 116],
  [119, 109],
  [119, 116],
  [119, 114],
  [119, 110],
  [122, 109],
  [122, 110],
  [122, 114],
  [122, 116],
  [122, 119],
  [110, 114],
  [110, 116],
  [114, 116],
  [121, 122],
  [153, 154],
  [99, 263],
  [153, 122],
  [154, 122],
  [130, 122],
  [155, 122],
  [157, 122],
  [155, 156],
  [10, 161],
  [26, 161],
  [60, 150],
  [0, 122],
  [248, 256],
  [244, 253],
  [244, 255],
  [253, 255],
  [259, 260],
];

/** 素质下标（yml/Talent.yml） */
const T_扶她 = 121;
const T_男人 = 122;
const T_精英 = 220;
const T_鬼角 = 264;
const T_头发颜色 = 300;
const T_体型 = 308;
const T_种族 = 314;
const T_种族2 = 319;

/** talent_empty_check 逐项提示的必填素质表 */
const EMPTY_CHECK_TALENTS = [
  [300, '需要设定发色'],
  [301, '需要设定头发状态'],
  [303, '需要设定头发修剪方式'],
  [304, '需要设定发型'],
  [305, '需要设定眼型'],
  [306, '需要设定瞳色'],
  [307, '需要设定唇型'],
  [309, '需要设定乳头'],
  [310, '需要设定阴毛状态'],
  [312, '需要设定魅力点'],
  [313, '需要设定癖好'],
  [317, '需要设定喜欢的东西'],
];

/** 读取素质（#13：未声明下标读回 undefined，默认 0） */
function talent(cid, index) {
  return era.get(`talent:${cid}:${index}`) || 0;
}

/** 写素质（chara 属主下标；跨域下标一律走门面） */
function set_talent(cid, index, value) {
  era.set(`talent:${cid}:${index}`, value);
}

/** `%TALENTNAME:n%`：素质名（引擎静态表 talent 的列名） */
function talentname(index) {
  return era.get(`talentname:${index}`) ?? '';
}

/** STRLENS 的等价物（码点计数；全角一字算 1） */
function strlens(text) {
  return Array.from(String(text ?? '')).length;
}

/** `GROUPMATCH(v, ...list)`：v 落在列表里 */
function groupmatch(value, list) {
  return list.includes(value);
}

/**
 * 写「口上」两素质：174/175 的属主是 system 域，写法只在
 * ere/chara/chara-and-hair.js 留一份（本文件从那里取）。
 * @param {number} cid 角色 ID
 * @param {number} index 素质下标
 * @param {number} value 值
 */
function set_personality(cid, index, value) {
  set_personality_talent(cid, index, value);
}

// —— chara_cost ——

/**
 * 单价表（SELECTCASE 逐分支的数值）。
 * 键 = 素质下标（或区间），值 = 加减额；`{ from, to }` 表达 `a TO b`。
 */
const COST_ARMS = [
  {
    list: [10, 13, 14, 17, 37, 41, 99, 125, 131, 132, 134, 140, 141, 142, 143],
    delta: 150000,
  },
  { list: [11, 12, 15, 16, 84, 100, 133], delta: -50000 },
  { list: [20, 21, 22, 24, 27, 32, 34, 43, 51, 79, 82], delta: -100000 },
  { list: [23, 25, 28, 33, 42, 50, 57], delta: 150000 },
  { list: [30, 46, 56, 62, 109, 112, 115, 116, 135, 256], delta: -100000 },
  {
    list: [
      31, 52, 55, 60, 61, 63, 64, 80, 81, 88, 89, 110, 111, 114, 118, 136, 155,
      157, 180, 181, 182, 183, 184, 185, 186, 187,
    ],
    ranges: [
      [275, 279],
      [471, 485],
    ],
    delta: 150000,
  },
  {
    list: [
      0, 1, 70, 72, 91, 92, 93, 102, 104, 106, 108, 113, 117, 124, 126, 153,
      154, 254, 271,
    ],
    delta: 150000,
  },
  { list: [221, 222], ranges: [[200, 220]], delta: 10000 },
  { list: [69, 71, 101, 103, 105, 107, 273, 280], delta: -100000 },
  { list: [9, 122, 123, 150, 151, 152], delta: -100000 },
  {
    list: [73, 74, 75, 76, 77, 78, 130, 230, 231, 232, 233, 272],
    delta: 150000,
  },
  {
    list: [119],
    ranges: [
      [240, 252],
      [257, 263],
    ],
    delta: 200000,
  },
  { list: [85, 86], delta: 600000 },
];

/**
 * chara_cost：按已设素质累加价格。
 *
 * 三处字面量是价格档本身：基础价 500000、粉毛加算 100000、
 * 负值钳到 0。扫描区间是 0-499（`FOR L_I ,0 ,500`）。
 *
 * @param {number} cid 角色 ID
 * @returns {number} 价格
 */
function chara_cost(cid) {
  let cost = 0;
  for (let index = 0; index < 500; index += 1) {
    if (talent(cid, index) !== 1) {
      continue; // （只认「恰好等于 1」）
    }
    for (const arm of COST_ARMS) {
      const hit =
        arm.list.includes(index) ||
        (arm.ranges ?? []).some(([from, to]) => index >= from && index <= to);
      if (hit) {
        cost += arm.delta;
        break; // SELECTCASE 先匹配先取
      }
    }
  }
  if (talent(cid, T_头发颜色) === 11) {
    cost += 100000; // 粉毛加十万
  }
  if (cost < 0) {
    cost = 0; // 素质加算价格不为负数
  }
  return cost + 500000;
}

// —— custom_conflict_check 与 char_custom_talent_deal ——

/**
 * custom_conflict_check：按 PAIRS 表清掉互斥素质。
 *
 * `FINDELEMENT(PAIRS, ARG, LOCAL)` 从 LOCAL 起找 ARG 的下一次
 * 出现（命中给出元素下标，未命中 -1）；命中后取下标的 `(LOCAL/2*2)` 与
 * `(LOCAL/2*2+1)` 两个元素作为一对。这里展开成「逐对扫描」——同一对里
 * 出现两次 ARG 的情形（如 119,109 与 109,110 分属不同对）不受影响，
 * 因为每对的判定是独立的，且命中后总会清掉 ARG 侧以外的那个。
 *
 * @param {number} arg 素质下标
 * @param {number} cid 角色 ID
 */
function custom_conflict_check(arg, cid) {
  for (const [left, right] of CONFLICT_PAIRS) {
    if (left !== arg && right !== arg) {
      continue;
    }
    if (talent(cid, left) && talent(cid, right)) {
      set_talent(cid, left, 0);
      set_talent(cid, right, 0);
      set_talent(cid, arg, 1);
    }
  }
}

/**
 * char_custom_talent_deal：点选一条素质后的全部连带处理。
 *
 * @param {number} l_tal 素质下标
 * @param {number} cid 角色 ID
 * @param {(n: number) => number} [rand] `char_bust_regenerate_wapped`
 *   内部 `char_bust_generate`/`char_body_generate_wapped` 用到的随机源
 * @returns {number} 0 = 已处理；-1 = 下标越界
 */
function char_custom_talent_deal(l_tal, cid, rand = default_rand) {
  if (!(l_tal >= 0 && l_tal <= 500)) {
    return -1;
  }

  set_talent(cid, l_tal, talent(cid, l_tal) ? 0 : 1); // 取反
  custom_conflict_check(l_tal, cid);

  // 胸围互斥：五档只留选中那一个，并重掷胸围
  const bust = talent(cid, l_tal);
  if (groupmatch(l_tal, BUST_TALENTS)) {
    for (const index of BUST_TALENTS) {
      set_talent(cid, index, 0); // （清空顺序即 BUST_TALENTS 声明序）
    }
    set_talent(cid, l_tal, bust);
    char_bust_regenerate_wapped(cid, rand); // TRYCALL，#406 落真身
  }

  // 口上唯一：性格组内只留一个
  if (groupmatch(l_tal, PERSONALITY_TALENTS)) {
    for (const index of PERSONALITY_TALENTS) {
      set_personality(cid, index, 0);
    }
    set_personality(cid, l_tal, 1);
  }
  if (talent(cid, 174) === 1) {
    set_talent(cid, T_男人, 1); // 貴公子是男人
  }
  if (talent(cid, 166) === 1) {
    set_talent(cid, T_男人, 0);
  }

  // 职业唯一：200-220 只留一个
  if (l_tal >= JOB_FIRST && l_tal <= JOB_LAST) {
    for (let index = JOB_FIRST; index <= JOB_LAST; index += 1) {
      set_talent(cid, index, 0);
    }
    set_talent(cid, l_tal, 1);
  }

  // 精英固定魔族
  if (l_tal === T_精英) {
    // `SIF L_TAL == 220 → TALENT:314 = 9`
    set_talent(cid, T_种族, 9);
  }
  if (talent(cid, T_种族) !== 9) {
    set_talent(cid, T_精英, 0);
  }

  // 龍族有角
  if (talent(cid, T_种族) === 5) {
    set_talent(cid, T_鬼角, 1);
  }

  // 扶她及男人才有童贞（talent:1 属 train 域）
  if (!talent(cid, T_扶她) && !talent(cid, T_男人)) {
    chara(cid).train.童贞 = 0;
  }

  // 纤细体型不肥胖
  if (talent(cid, T_体型) <= 100) {
    set_talent(cid, 115, 0);
  }

  return 0;
}

// —— print_single_talent 与 char_custom_talent_page ——

/**
 * 素质格的行缓冲：LOCAL 的跨调用累加。
 * 每次 `char_custom(…)` 进入前由 `char_custom_talent_page` 的入口 flush 归零。
 */
let pending_talents = [];
let talent_cursor = 0;

/** 冲掉未满一行的素质格（两次 `LOCAL % 6 == 0` 之间） */
function flush_talent_row() {
  if (pending_talents.length > 0) {
    // 每格宽度按本行格数均分（栅格 24 列）。下限 3 是排版保底，实际用不到
    // ——缓冲满 6 格即冲行，故本行至多 6 格，floor(24/6) = 4 恒 ≥ 3
    // （把 3 改大是等价变异，不是缺口）
    const width = Math.max(
      3,
      Math.floor(GRID_COLUMNS / pending_talents.length),
    );
    era.printMultiColumns(
      pending_talents.map((cell) => ({
        type: 'button',
        accelerator: cell.accelerator,
        content: cell.content,
        config: {
          width,
          ...(cell.color ? { color: cell.color } : {}),
        },
      })),
    );
    pending_talents = [];
  }
  era.setColor(''); // RESETCOLOR
}

/**
 * print_single_talent：打印一枚素质按钮。
 *
 * @param {number} [arg=-1] 素质下标；-1 是「冲行并归零」的哨兵
 * @param {number} cid 角色 ID
 * @returns {number} 已打印的累计格数（`RETURN LOCAL`；哨兵分支返回 0）
 */
function print_single_talent(arg = -1, cid = era_flag.target) {
  if (arg < 0) {
    flush_talent_row();
    talent_cursor = 0;
    return 0;
  }
  const name = talentname(arg);
  if (strlens(name) < 1) {
    return talent_cursor; // 无名素质不占格
  }
  pending_talents.push({
    accelerator: arg,
    content: name,
    color: talent(cid, arg) ? undefined : GRAY,
  });
  talent_cursor += 1;
  if (talent_cursor % TALENT_COLUMNS === 0) {
    flush_talent_row();
  }
  return talent_cursor;
}

/**
 * 素质页的分组表（`PRINTL ■=== 名 ===■` + `FOR` 区间）。
 *
 * `list` 是逐项列出的小组（连续调用 `print_single_talent(n)`），
 * `ranges` 是 `FOR` 区间（`to` 开区间），`skip` 是 `CONTINUE` 的项。
 * `when_mode1` 标注只在 ARG:1 == 1 时打印的组。
 */
const TALENT_PAGE_GROUPS = [
  [
    { title: '■=== 基本素质 ===■', ranges: [[0, 10]] },
    { title: '■=== 性格 ===■', ranges: [[10, 20]] },
    { title: '■=== 性态度 ===■', ranges: [[20, 30]] },
    { title: '■=== 性表现 ===■', ranges: [[30, 40]] },
    { title: '■=== 体质 ===■', ranges: [[40, 50]] },
    { title: '■=== 技术 ===■', ranges: [[50, 60]] },
    { title: '■=== 洁癖度 ===■', ranges: [[60, 65]] },
    { title: '■=== 正直度 ===■', ranges: [[69, 74]] },
    { title: '■=== 特殊性癖 ===■', ranges: [[74, 79]] },
  ],
  [
    { title: '■=== 性癖 ===■', ranges: [[79, 90]] },
    { title: '■=== 魅力 ===■', ranges: [[91, 99]] },
    {
      title: '■=== 身体特征 ===■',
      ranges: [[99, 117]],
      then: [119],
    },
    {
      title: '■=== 混杂 ===■',
      ranges: [[122, 160]],
      before: [117, 118, 121],
    },
    {
      title: '■=== 性格（口上） ===■',
      extra: [
        { ranges: [[160, 165]], then: [166, 172, 173, 174, 175] },
        {
          ranges: [[165, 180]],
          skip: [166, 172, 173, 174, 175],
          when_mode1: true,
        },
      ],
    },
    { title: '■=== 卖春相关 ===■', ranges: [[180, 190]] },
  ],
  [
    { title: '■=== 体调不良 ===■', ranges: [[190, 200]] },
    { title: '■=== 职业 ===■', ranges: [[200, 230]] },
    { title: '■=== 强化素质 ===■', ranges: [[230, 240]] },
    { title: '■=== 战斗技能 ===■', ranges: [[240, 270]] },
    {
      title: '■=== 特殊素质 ===■',
      ranges: [[270, 289]],
      skip: [280, 281, 283],
    },
    { title: '■=== 境遇 ===■', ranges: [[290, 300]], skip: [292] },
    { title: '■=== 精英 ===■', ranges: [[471, 490]] },
  ],
];

/**
 * 展开一个分组表的项序（分组表声明的打印顺序）。
 * @param {object} group 分组定义
 * @param {number} mode（0 = 新建，1 = 修改）
 * @returns {number[]} 素质下标序列（含 title 之外的顺序，skip 已剔除）
 */
function expand_group(group, mode) {
  const items = [];
  // 顺序 = 打印顺序：`before`（FOR 之前的三句单点）→ `ranges`（FOR）→
  // `then`（FOR 之后的单点）。三段的语义名对应打印位置，不是任意分组。
  const apply_part = (part) => {
    for (const index of part.before ?? []) {
      items.push(index);
    }
    for (const [from, to] of part.ranges ?? []) {
      for (let index = from; index < to; index += 1) {
        if ((part.skip ?? []).includes(index)) {
          continue;
        }
        items.push(index);
      }
    }
    for (const index of part.then ?? []) {
      items.push(index);
    }
  };
  if (group.extra) {
    for (const part of group.extra) {
      if (part.when_mode1 && mode !== 1) {
        continue;
      }
      apply_part(part);
    }
  } else {
    apply_part(group);
  }
  return items;
}

/**
 * char_custom_talent_page：三页素质看板。
 *
 * 结构上「一组 = 一个标题 + 一批素质格 + 一次冲行」（每组末尾一次冲行），
 * 入页时先冲一次。
 *
 * @param {number} [page=0] 页号（0-2）
 * @param {number} [mode=0]（0 = 新建，1 = 修改——只影响口上组的第二段）
 * @param {number} cid 角色 ID
 */
function char_custom_talent_page(page = 0, mode = 0, cid = era_flag.target) {
  print_single_talent(-1, cid); // 入页冲行（LOCAL = 0）

  const groups = TALENT_PAGE_GROUPS[page] ?? [];
  for (const group of groups) {
    era.print(group.title);
    for (const index of expand_group(group, mode)) {
      print_single_talent(index, cid);
    }
    print_single_talent(-1, cid);
  }
}

// —— talent_empty_check ——

/**
 * talent_empty_check：设定完备性检查。
 *
 * 三段判断条件（扫描、提示、结论）：
 * 性格组（160-175）与职业组（200-220）各要有一个；12 项外观素质各自非零；
 * 精英另需精英种族（319）。**逐项提示是并列的 `SIF`**（不是 else-if），
 * 缺几项就打几行。
 *
 * @param {number} cid 角色 ID
 * @returns {Promise<number>} 0 = 完备（并触发 chara_first_xp）；1 = 还需设定
 */
async function talent_empty_check(cid) {
  let has_personality = false; // CHECK:1
  let has_job = false; // CHECK:2
  for (let index = 0; index < 300; index += 1) {
    if (talent(cid, index) !== 1) {
      continue;
    }
    if (index >= 160 && index <= 175) {
      has_personality = true;
    } else if (index >= 200 && index <= 220) {
      has_job = true;
    }
  }
  if (!has_personality) {
    era.print('需要设定性格（口上）');
  }
  if (!has_job) {
    era.print('需要有【近卫】及【后代】之外的职业设定');
  }
  for (const [index, message] of EMPTY_CHECK_TALENTS) {
    if (talent(cid, index) === 0) {
      era.print(message);
    }
  }
  const elite_needs_race =
    talent(cid, T_精英) !== 0 && talent(cid, T_种族2) === 0;
  if (elite_needs_race) {
    era.print('精英需要设定精英种族');
  }

  const complete =
    has_personality &&
    has_job &&
    EMPTY_CHECK_TALENTS.every(([index]) => talent(cid, index) !== 0) &&
    !elite_needs_race;
  if (complete) {
    await chara_first_xp(cid);
    era.print('人物设定完成'); // PRINTW
    await era.waitAnyKey();
    return 0;
  }
  era.print('请返回继续设定'); // PRINTW
  await era.waitAnyKey();
  return 1;
}

// —— chara_first_xp ——

/** 初吻位置的四个可选项（GROUPMATCH 列表） */
const KISS_POSITIONS = [1, 201, 301, 401];
/** 野狗（995）的三个部位码：LOCAL += 1/2/3 → 996/997/998 */
const DOG_POSITIONS = [1, 2, 3];

/**
 * chara_first_xp：初吻与初体验的对象、部位、名称的问卷。
 *
 * 选择项旧写法是**列排版文本 + `INPUT`**，不是
 * `PRINTBUTTON`——#572 起按 PR #53 通则升格为按钮（正文不写 [编号] 前缀，
 * 引擎按 showAcc 自动拼）。此前的处置是「保持文本行，免得
 * 「输入错误，请重新开始」这些校验支变成不可达」（page-life-list.js 的
 * select_yes_no 先例）：改为按钮后白名单就是显示出来的编号，越界输入由
 * 引擎当场拒收（弹「输入不合法」）——那些缺省处理支因此结构性不可达，
 * 保留结构不补用例（page-ability-up.js 文件头同款登记）。**例外一处**：初吻
 * 部位一问保留 `useRule: false`——那四个编号的显示是有条件的、
 * 受理是无条件的，属「允许输入未显示编号」的既有行为，按 #572 的要求
 * 保住路径。免费文本支
 * （`INPUTS` 与 `[997] 自定义输入`）
 * 不受影响：它们是各自独立的 `era.input()`，与按钮轮不共用白名单。
 *
 * @param {number} cid 角色 ID
 * @param {(n: number) => number} [rand] `RAND:2` 的随机源
 * @returns {Promise<number>} 0（恒 `RETURN 0`）
 */
async function chara_first_xp(cid, rand = default_rand) {
  // $LOOP2 —— 问卷整体的重来点（「输入错误」「还是改一下吧」都回到这里）
  xp_loop: for (;;) {
    let kiss = 0; // LOCAL：初吻对象编码
    let kiss_name = ''; // LOCALS：初吻对象的称呼
    let sex = 0; // LOCAL:1：初体验对象编码
    let sex_name = ''; // LOCALS:1：初体验对象的称呼

    // 四项产物先写初值（本段每次重来都重置）
    chara(cid).train.初吻对象 = kiss; // CFLAG:16
    chara(cid).train.初吻对象名 = kiss_name; // CSTR:4
    chara(cid).train.初体验对象 = sex; // CFLAG:15
    chara(cid).train.初体验对象名 = sex_name; // CSTR:3
    if ((era.get(`ex_talent:${cid}:2`) || 0) !== 0) {
      return 0; // SIF EX_TALENT:ARG:2 RETURN 0（后代不问）
    }

    era.print('设定初体验');
    era.print('初吻对象是？');
    // 的九项 → 按钮（PR #53 通则，正文不写 [编号]；#572）
    era.printButton('不明', 0);
    era.printButton('魔王', 1);
    era.printButton('狂王', 993);
    era.printButton('怪物', 994);
    era.printButton('野狗', 995);
    era.printButton('触手', 999);
    era.printButton('随机', 996);
    era.printButton('自定义输入', 997);
    era.printButton('无', 998);
    kiss = await era.input();

    // SELECTCASE LOCAL
    if (kiss === 1) {
      // 魔王：先问部位
      era.print('初吻位置是？');
      // 的四行选项 → 按钮（PR #53 通则，正文不写 [编号]；#572）。
      // **保留 useRule: false**（#572 审查返工）：显示是有条件的（
      // SIF），受理是无条件的（`IF GROUPMATCH(RESULT,1,201,301,401)`）
      // ——女性魔王键入 201、男性魔王键入 301，照收且落盘编码与部位词
      // 都不同。收紧白名单会把这两条路径锁死，故与流放/公开处刑的 100、
      // ENDING 发色的 11 同款处置（先例 event-museum.js:83-85）。
      era.printButton('唇', 1);
      if (talent(0, T_扶她) || talent(0, T_男人)) {
        era.printButton('阴茎', 201); // （魔王的性别决定选项）
      }
      if (!talent(0, T_男人)) {
        era.printButton('私处', 301);
      }
      era.printButton('肛门', 401);
      const position = await era.input({ useRule: false });
      if (groupmatch(position, KISS_POSITIONS)) {
        kiss_name = chara_callname(0); // %SAVESTR:MASTER%
        kiss = position;
      } else {
        era.print('输入错误，请重新开始。');
        continue xp_loop; // GOTO LOOP2
      }
    } else if (kiss === 995) {
      // 野狗：部位码加到 995 上（996/997/998）
      era.print('初吻位置是？');
      era.printButton('肛门', 1);
      era.printButton('阴茎', 2);
      era.printButton('嘴', 3);
      const position = await era.input();
      if (groupmatch(position, DOG_POSITIONS)) {
        kiss += position; // LOCAL += RESULT
      } else {
        era.print('输入错误，请重新开始。');
        continue xp_loop;
      }
    } else if (kiss === 996) {
      kiss = -1; // 随机
    } else if (kiss === 997) {
      // 自定义输入：$LOOP3 覆盖「名字」与「部位」两步
      kiss_input: for (;;) {
        era.print('输入初吻对象（留空将会随机生成）：');
        // ere 侧补的输入 0 说明（#567：引擎不受理空提交，0 是「不输入」的可达形式）
        era.print('（输入 0 随机生成初吻对象）');
        kiss_name = input_text(await era.input()); // INPUTS + RESULTS
        const length = strlens(kiss_name);
        if (length > 16) {
          era.print(`太长，请使用全角八字以下。`);
          continue kiss_input; // GOTO LOOP3
        }
        if (length > 0) {
          era.print(`新建人物初吻对象为${kiss_name}。`);
        } else {
          era.print('随机生成。');
          kiss = -1;
        }
        if (kiss !== -1) {
          era.print('初吻位置是？');
          // 的四项 → 按钮（同上）
          era.printButton('唇', 1);
          era.printButton('阴茎', 201);
          era.printButton('私处', 301);
          era.printButton('肛门', 401);
          const position = await era.input();
          if (groupmatch(position, KISS_POSITIONS)) {
            kiss_name = chara_callname(0);
            kiss = position;
          } else {
            era.print('输入错误，请重新开始。');
            continue kiss_input; // GOTO LOOP3
          }
        }
        break;
      }
    } else if (kiss === 0) {
      // 不明：编码 0，不做别的
    } else if (kiss === 993) {
      // 狂王
    } else if (kiss === 994) {
      // 怪物
    } else if (kiss === 999) {
      // 触手
    } else if (kiss === 998) {
      kiss = -2; // 无
    } else {
      era.print('输入错误，请重新开始。');
      continue xp_loop;
    }

    // 初体验对象：只对非処女问
    if (!talent(cid, 0)) {
      era.print('初体验对象是？');
      // 的九项 → 按钮（同上）
      era.printButton('魔王', 1);
      era.printButton('蠕虫', 101);
      era.printButton('触手生物', 102);
      era.printButton('野狗', 103);
      era.printButton('怪物', 104);
      era.printButton('狂王', 105);
      era.printButton('随机', 996);
      era.printButton('自定义输入', 997);
      era.printButton('无', 998);
      sex = await era.input();
      if (sex === 1) {
        // 魔王
      } else if (sex === 101) {
        // 蠕虫
      } else if (sex === 102) {
        // 触手生物
      } else if (sex === 996) {
        sex = -1; // 随机
      } else if (sex === 997) {
        // 自定义输入（$LOOP4，只重问名字）
        for (;;) {
          era.print('输入初体验对象（留空将会随机生成）：');
          // ere 侧补的输入 0 说明（#567：引擎不受理空提交，0 是「不输入」的可达形式）
          era.print('（输入 0 随机生成初体验对象）');
          sex_name = input_text(await era.input());
          const length = strlens(sex_name);
          if (length > 16) {
            era.print('太长，请使用全角八字以下。');
            continue; // GOTO LOOP4
          }
          if (length > 0) {
            era.print(`新建人物初体验对象为${sex_name}。`);
          } else {
            era.print('随机生成。');
            sex = -1;
          }
          break;
        }
      } else if (sex === 998) {
        // 无
      } else if (sex === 103) {
        // 野狗
      } else if (sex === 104) {
        // 怪物
      } else if (sex === 105) {
        // 狂王
      } else {
        era.print('输入错误，请重新开始。');
        continue xp_loop; // GOTO LOOP2
      }
    }

    // A = ARG；非后代补 CM_NS_EXP 的经验初始化
    if ((era.get(`ex_talent:${cid}:2`) || 0) === 0) {
      await cm_ns_exp(cid, rand);
    }
    if (kiss !== -1) {
      chara(cid).train.初吻对象 = kiss;
      chara(cid).train.初吻对象名 = kiss_name;
    }
    if (sex !== -1) {
      chara(cid).train.初体验对象 = sex;
      chara(cid).train.初体验对象名 = sex_name;
    }

    // 初吻对象的回显
    era.print('　'); // （全角空格）
    if (chara(cid).train.初吻对象 > -1) {
      if (chara(cid).train.初吻对象 === 0) {
        era.print('[初吻对象：不明]');
      } else if (chara(cid).train.初吻对象 === 992) {
        // 992 在本问卷里取不到（选项里没有它，各支写下的
        // 编码也到不了 992）——保留既有写法，无对应测试
        era.print(`[初吻对象：${chara(cid).train.初吻对象名}]`);
      } else if (chara(cid).train.初吻对象 === 993) {
        era.print('[初吻对象：狂王]');
      } else if (chara(cid).train.初吻对象 === 994) {
        era.print('[初吻对象：怪物]');
      } else if (chara(cid).train.初吻对象 === 995) {
        era.print('[初吻对象：怪物的阴茎]');
      } else if (chara(cid).train.初吻对象 === 996) {
        era.print('[初吻对象：野狗的肛门]');
      } else if (chara(cid).train.初吻对象 === 997) {
        era.print('[初吻对象：野狗的阴茎]');
      } else if (chara(cid).train.初吻对象 === 998) {
        era.print('[初吻对象：野狗的嘴]');
      } else if (chara(cid).train.初吻对象 === 999) {
        era.print('[初吻对象：触手]');
      } else {
        let tail;
        if (rand(2)) {
          tail = '唇]'; // （掷中即唇，不再看编码）
        } else if (chara(cid).train.初吻对象 < 100) {
          tail = '唇]';
        } else if (chara(cid).train.初吻对象 < 300) {
          tail = '阴茎]';
        } else if (chara(cid).train.初吻对象 < 400) {
          tail = '私处]';
        } else if (chara(cid).train.初吻对象 < 500) {
          tail = '肛门]';
        } else {
          tail = ']'; // ENDIF 之后直接跟闭括号，500 以上无部位词
        }
        era.print(`[初吻对象：${chara(cid).train.初吻对象名}的${tail}`);
      }
    }

    // 初体验对象的回显
    if (chara(cid).train.初体验对象 > 0) {
      const local = chara(cid).train.初体验对象 - 1; // LOCAL = CFLAG:15 - 1
      if (chara(cid).train.初体验对象 === 101) {
        era.print('[初体验对象：蠕虫]');
      } else if (chara(cid).train.初体验对象 === 102) {
        era.print('[初体验对象：触手生物]');
      } else if (chara(cid).train.初体验对象 === 103) {
        era.print('[初体验对象：野狗]');
      } else if (chara(cid).train.初体验对象 === 104) {
        era.print('[初体验对象：怪物]');
      } else if (chara(cid).train.初体验对象 === 105) {
        era.print('[初体验对象：狂王]');
      } else if (local === 0) {
        // %SAVESTR:LOCAL% —— LOCAL 此处为 0 / 1（CFLAG:15=1 或 2），
        // SAVESTR:0 是魔王的称呼（#5 决议：SAVESTR:x ↔ callname:x:-1）
        era.print(`[初体验对象：${chara_callname(local)}]`);
      } else {
        era.print(`[初体验对象：${chara(cid).train.初体验对象名}]`);
      }
    }

    era.print('这样就可以了吗？');
    // 的两项 → 按钮（同上）
    era.printButton('好的', 0);
    era.printButton('还是改一下吧', 1);
    const answer = await era.input();
    if (answer === 1) {
      continue xp_loop; // GOTO LOOP2
    }
    return 0;
  }
}

// —— char_custom ——

/** `L_PAGE` 的三个素质页上界（`INRANGE(L_PAGE, 0, 2)`） */
const TALENT_PAGE_LAST = 2;
/** `L_PAGE` 的最后一页（`SIF L_PAGE < 4`） */
const PAGE_LAST = PAGE_COUNT - 1;

/**
 * char_custom：角色定制主循环。
 *
 * 两种模式由 `mode` 区分：0 = 新建（显示价格、可取消、确认后
 * 走初始化与扣款），1 = 修改（不显示价格、无取消、确认即完成——调试入口
 * 调试入口的用法）。
 *
 * @param {number} cid 角色 ID（被定制的角色）
 * @param {number} mode（0 = 新建，1 = 修改）
 * @param {(n: number) => number} [rand] 两处 RAND 的随机源
 * @returns {Promise<void>}
 */
async function char_custom(cid, mode, rand = default_rand) {
  let page = 0; // #DIM L_PAGE
  let price = 0; // #DIM PRICE
  let entry = era.getLineCount(); // L_LCOUNT = LINECOUNT
  price = chara_cost(cid);

  // $DRAW_PAGE —— 每轮的绘制入口
  draw: for (;;) {
    // REDRAW 0 关自动重绘、REDRAW 1 打开——EraElectron
    // 无对应开关，不镜像（page-ability-up.js 文件头第 3 条同款）
    await era.clear(era.getLineCount() - entry); // CLEARLINE LINECOUNT - L_LCOUNT
    entry = era.getLineCount(); // L_LCOUNT = LINECOUNT

    // CUSTOMDRAWLINE =（自定义分隔线，无内容）
    era.drawLine();

    // 页眉用制表符分段（标题／现价值／页码），\t 保留。
    if (mode === 0) {
      era.print(
        `设定角色属性（${chara_callname(cid)}）\t角色现价值为${price}\t\t<${page + 1}/${PAGE_COUNT}>`,
      );
    } else {
      era.print(
        `修改角色属性（${chara_callname(cid)}）\t\t\t<${page + 1}/${PAGE_COUNT}>`,
      );
    }
    era.drawLine();

    // 页体：前三页素质、后两页外观
    if (page >= 0 && page <= TALENT_PAGE_LAST) {
      char_custom_talent_page(page, mode, cid);
    } else {
      char_custom_look_page(page - 3, cid);
    }

    // 补行到 27 行的页高
    if (era.getLineCount() - entry < TALENT_PAGE_ROWS) {
      const pad = TALENT_PAGE_ROWS + entry - era.getLineCount();
      for (let i = 0; i < pad; i += 1) {
        era.println(); // PRINTL
      }
    }

    era.drawLine(); // 页脚段之前的 DRAWLINE
    // 页脚四键是四个 PRINTLC 串（模式 1 少一个），紧随的 PRINTL 只结束
    // 它们所在的那一行——PRINTLC 左对齐补位、**不换行**，那个 PRINTL 因此不产生
    // 空行。ere 的 printButton 自成一行（＝ PRINTLC + 收尾的 PRINTL），
    // 不再补空行。
    era.printButton('前一页', 997); // PRINTLC
    era.printButton('确定', 999);
    if (mode === 0) {
      era.printButton('取消', 996);
    }
    era.printButton('后一页', 998);

    // $INPUT_LOOP
    for (;;) {
      const result = await era.input();

      if (result === 999) {
        // 确定
        if (mode === 0) {
          if ((await talent_empty_check(cid)) === 1) {
            continue draw; // GOTO DRAW_PAGE
          }
          if (talent(cid, T_种族) === 9) {
            // 魔族新勇者随机成为黑暗救世主、九尾、混沌龙
            set_talent(cid, 322, rand(3) + 191);
          }
          // 人物初始设定（走 chara-make.js 的初始化函数）
          chara(cid).chara.等级 = 1; // CFLAG:A:9
          chara(cid).dungeon.战斗经验 = 0; // EXP:A:80
          chara(cid).invasion.状态 = 0; // CFLAG:A:1
          await cm_base(cid);
          await cm_kind(cid, rand);
          await cm_cloth(cid, rand);
          await random_self_call(cid, rand);
          const settings = era.get('flag:5') || 0; // GETBIT(FLAG:5,12/15)
          if (((settings >> 12) & 1) !== 0 || ((settings >> 15) & 1) !== 0) {
            char_body_generate_wapped(cid, rand);
          }
          // 妊娠设定出产日期
          const pregnant =
            talent(cid, 153) ||
            talent(cid, 341) ||
            talent(cid, 342) ||
            talent(cid, 343) ||
            talent(cid, 344);
          if (pregnant) {
            chara(cid).event.预产日 = era_flag.day_count + 10 + rand(6);
            chara(cid).event.孩子父亲 = 0;
          }
          price = chara_cost(cid); // 再次检查价格
          era.print(`${chara_callname(cid)}的最终价格是${price}点，可以吗？`);
          // 的两项 → 按钮（同上）
          era.printButton('好，就是这样了！', 1);
          era.printButton('我还想再修改一下。', 2);

          // $LOOP
          for (;;) {
            const answer = await era.input();
            if (answer === 1) {
              if (era_flag.money < price) {
                era.print('钱不够，还是重新设定吧！'); // PRINTW
                await era.waitAnyKey();
                continue draw; // GOTO DRAW_PAGE
              }
              era.print(
                `花费金钱${price}点，${chara_callname(cid)}现已加入啃鸡鸡豪华午餐。`,
              ); // PRINTFORMW
              await era.waitAnyKey();
              era_flag.money -= price; // MONEY -= PRICE
              era_exflag.legit_money -= price; // EX_FLAG:4444 -= PRICE
              return; // REDRAW 1 + SWAP + RETURN
            }
            if (answer === 2) {
              continue draw; // GOTO DRAW_PAGE
            }
            // 其余输入 GOTO LOOP
          }
        }
        // ARG:1 == 1：直接完成
        era.print(`${chara_callname(cid)}现已加入啃鸡鸡豪华午餐。`);
        await era.waitAnyKey();
        return;
      }

      if (result === 998) {
        // 后一页（到最后一页就不再前进）
        if (page < PAGE_LAST) {
          page += 1;
        }
        continue draw; // GOTO DRAW_PAGE
      }
      if (result === 997) {
        // 前一页
        if (page > 0) {
          page -= 1;
        }
        continue draw;
      }
      if (result === 996) {
        // 取消：删掉刚建出来的角色
        era.removeCharacter(cid); // DELCHARA ARG
        return;
      }

      // 分发：素质页走 char_custom_talent_deal + 重算价格，外观页走 char_custom_look_deal
      let dealt;
      if (page >= 0 && page <= TALENT_PAGE_LAST) {
        dealt = char_custom_talent_deal(result, cid, rand);
        price = chara_cost(cid); // 每次素质变更检查价格
      } else {
        dealt = char_custom_look_deal(result, cid);
        if (talent(cid, T_体型) <= 100) {
          set_talent(cid, 115, 0); // 纤细体型不肥胖
        }
      }

      if (dealt === 0) {
        continue draw; // GOTO DRAW_PAGE
      }
      // 未登记的编码：清一行、把上一行改写成「无效值」再重问。
      // **EraElectron 的输入集 = 本页已打印按钮的快捷键集**（夹具 era.input
      // 的按钮白名单校验），而本页所有按钮都是已登记的素质/外观编码——
      // 这一支因此不可达，按 page-ability-up.js:250-257 的先例留档。
      await era.clear(1); // CLEARLINE 1
      era.replaceText('无效值'); // REUSELASTLINE 无效值
      continue; // GOTO INPUT_LOOP
    }
  }
}

module.exports = {
  CONFLICT_PAIRS,
  TALENT_COLUMNS,
  TALENT_PAGE_GROUPS,
  chara_cost,
  custom_conflict_check,
  char_custom_talent_deal,
  char_custom_talent_page,
  print_single_talent,
  talent_empty_check,
  chara_first_xp,
  char_custom,
};
