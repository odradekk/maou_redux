/**
 * @file 服饰店（裁缝）：SHOP_TAILOR.ERB 全 12 函数（issue #397 / N13 段 3）。
 *
 * 源: target/ERB/SHOP/SHOP_TAILOR.ERB  @TAILOR_MAIN（:6-59）/
 *     @TAILOR_CORE（:61-254）/@TAILOR_CASUAL（:259-303）/
 *     @TAILOR_NORMAL（:308-550）/@TAILOR_ACCESSORY（:556-862）/
 *     @TAILOR_UNDERWARE（:867-882）/@TAILOR_DIAPER（:887-901）/
 *     @CHASTITY_KEY（:906-928）/@LIFE_LIST_TAILOR（:933-979）/
 *     @EQUIP_MAGIC_ITEM（:982-1129）/@EQUIP_MAGIC_WEAPON（:1133-1292）/
 *     @TAILOR_NORMAL_SPECIAL（:1299-1461）。
 *
 * 调用点（本票接入）：page/page-shop.js 的 usershop [108] 分支、
 * page/page-chara-info.js 的 CHARA_INFO_INDIVIDUAL CASE 11（只调 CORE）。
 *
 * 移植说明（有意偏离，均注明依据）：
 *
 * 1. **全局变量 A / C / R / S / F / M / P / T 的语义**（原作是未声明就用的
 *    全局——`@TAILOR_MAIN` 开头注释写明「Z は TARGET を保存してるため使用
 *    禁止」，即这批单字母全局是跨函数传参通道）：本移植把它们收进调用链的
 *    显式返回值。每个子菜单函数返回 `{a, c, r, s}`（A = 购入品种、C = 价格、
 *    R = 服装编号、S = 需要的顺从 Lv），@TAILOR_CORE 收到后走同一段应用逻辑。
 *    TARGET 仍是 era_flag.target（#5 决议：SAVESTR/TARGET 走引擎内置）。
 *
 * 2. **物品表落成数据表**（原作的 if/elseif 长链是纯数据）：四张表
 *    `CASUAL_ITEMS` / `NORMAL_ITEMS` / `ACCESSORY_ITEMS` / `SPECIAL_ITEMS`
 *    逐条照抄（编号、名字、价格、顺从档），S 的动态调整作为小函数挂在各条上
 *    （表里写不出「10 - ABL:21」这类判据）。表驱动让测试能整表走完每个维度
 *    （覆盖面标准），也让 42/43/27 条的字面量逐个可钉。
 *
 * 3. **子菜单的选项一律按钮化**（PR #53 通则）：原作的 `[n] - 名字` 纯文本
 *    改成 `era.printButton(名字, n)`；翻页键 [997]/[998]、黑市 [996]、返回
 *    [999] 同。价格与顺从档**印在按钮正文里**（原作是把价格写在名字后的
 *    括号里、顺从档不显示——见 :78-88 的主菜单才写价格；此处照原作：
 *    价格只在主菜单与装备品/黑市表里出现，普通装备表只写名字）。
 *
 * 4. **PRINTW / CLEARLINE / SETFONT / WAIT**：PRINTW 用 print + waitAnyKey、
 *    局部重绘不镜像、字体命令无对应 API、`WAIT`（:138/:155/:180/:252/:922）
 *    用 `era.waitAnyKey()`——与 page-ability-up.js 同款。
 *
 * 5. **`@EQUIP_MAGIC_ITEM` / `@EQUIP_MAGIC_WEAPON` 的强化数学逐字保留**
 *    （:1091-1128 / :1229-1291）：强化等级在编号的千位（`W:0 % 100000 / 1000`）、
 *    每 +1 一万点、上限 10、超限回退（`Y:2 += 10 - W:2`），以及武器特有的
 *    前缀档（0-9，写在十万位）。0 号槽（`W:0 <= -1`）表示没装。
 *
 * 5a. **一处不可达的判据半支**：演出判据里的 `R == 99`（:226）在本代码路径
 *     取不到——装备品表的 R 值是 79（贞操带）/ 98（尿道导管）等，没有 99。
 *     1:1 保留（原作改过表之后可能补上 99 号装备），另一支 `R == 98` 有用例。
 *
 * 5b. **一处结构性不可达的守卫，登记在此**：@EQUIP_MAGIC_ITEM / @EQUIP_MAGIC_WEAPON
 *     强化档画面里的「钱不够！！」（`MONEY < RESULT * 10000`）永远不成立——
 *     可选档位由当时的 `MONEY / 10000` 现算（:1068-1071/:1206-1209 的 X），
 *     打印出来的按钮集合里不会有超过它的档位，而 ere 的输入集就是已打印按钮。
 *     1:1 保留（原作玩家可以手敲任意数字，所以那句在原作是可达的）。
 *
 * 6. **`@LIFE_LIST_TAILOR` 的列表**：原作是 `REPEAT CHARANUM` + 排除魔王/
 *    濒死/非待机，逐行打「编号 名字 / 穿着…」。列表行按 #391（page-chara-info.js 的 print_chara_row）的通例做成
 *    多列行（编号按钮格 + 正文格，page-life-list.js 的 print_row）。
 */

'use strict';
/* eslint-disable no-irregular-whitespace -- 装备槽与装备名的全角空格（原作 :992/:1143 的 `装饰A　:` / `武器　:`），1:1 保留原文标点 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { chara } = require('#/facade/chara');
const { equip_get, get_equip_num } = require('#/system/equip/equip-lookup');
const {
  equip_ring_spans,
  equip_weapon_spans,
} = require('#/system/equip/equip-print');
const { chara_callname } = require('#/utils/callname-utils');
const {
  clothtype_main2_text,
  clothtype_special_text,
} = require('#/page/page-clothtype');
const { get_clothtype_main2 } = require('#/system/cloth-lookup');
const { print_row } = require('#/page/page-life-list');
const { wearing_cloth_able } = require('#/system/train/cloth');

/** 服装种类的编号（:7 的注释 + :165/:172/:177/:202/:206/:209/:218/:557/:869/:889 的 A = …） */
const KIND_CLOTHES = 1; // 1-9：通常衣類（A <= 9 走 :165 的应用支）
const KIND_CHILD = 3; // 童装（:130 的魁梧判定只对它生效）
const KIND_UNDERWARE = 10; // 下着（:177）
const KIND_DIAPER = 11; // 替えオムツ（:206）
const KIND_ACCESSORY = 20; // 装備品（:209）

/** 各菜单的价格（:261 / :310 / :1302 / :869 / :889） */
const CASUAL_PRICE = 100;
const NORMAL_PRICE = 1000;
const SPECIAL_PRICE = 30000;
const UNDERWARE_PRICE = 5;
const DIAPER_PRICE = 50;

/** 装备强化的单位价与上限（:1062/:1086/:1103/:1200/:1224/:1240） */
const ENHANCE_UNIT = 10000;
const ENHANCE_MAX = 10;
/** 武器前缀的档次（:1254-1263 的 0-9） */
const WEAPON_PREFIX_MAX = 9;
/** 强化/前缀在编号里的位权（:1096/:1107/:1127/:1233/:1244/:1289/:1290） */
const ENHANCE_SCALE = 1000;
const WEAPON_PREFIX_SCALE = 100000;
/** 装备槽（装饰 A / B / 武器）在 CFLAG 里的下标（:990/:999/:1141） */
const SLOT_RING_A = 551;
const SLOT_RING_B = 552;
const SLOT_WEAPON = 550;
/** 装饰品第三档（`:1124` 的 ITEM 编号偏移，300+ 是装备品） */
const EQUIP_ITEM_BASE = 300;
const EQUIP_ITEM_COUNT = 20; // :1024 的 REPEAT 20
/** 武器段的 ITEM 编号（:1153-1157 的 341-360，排除 349） */
const WEAPON_ITEM_START = 341;
const WEAPON_ITEM_COUNT = 19;
const WEAPON_TENTACLE_ITEM = 90; // :1159 的武器化触手
const WEAPON_TENTACLE_RESULT = 990; // :1160 的 [990]
const WEAPON_TENTACLE_ID = 349; // :1160-1181 的 349 号装备
const SWORD_ITEM = 340; // :1151 的 [340] 剑
/** 强化开放所需等级（:1030/:1048/:1162/:1186） */
const ENHANCE_LEVEL = 30;
/** SETCOLOR 80,80,80（:1164，等级不足的灰显文本） */
const GRAY = '#505050';

/** CFLAG 读数兜底（#13） */
function cflag(cid, idx) {
  return era.get(`cflag:${cid}:${idx}`) || 0;
}

/** TALENT 读数兜底 */
function talent(cid, idx) {
  return era.get(`talent:${cid}:${idx}`) || 0;
}

/** ABL 读数兜底 */
function abl(cid, idx) {
  return era.get(`abl:${cid}:${idx}`) || 0;
}

/** WAIT 习语（print + 读键之间没有输出时只等键） */
async function wait() {
  await era.waitAnyKey();
}

/** 校验类提示（PRINTW / PRINTFORMW 的等价物） */
async function print_wait(text) {
  era.print(text);
  await era.waitAnyKey();
}

// —— 四张物品表（原作 if/elseif 链的逐条转写）——

/**
 * @TAILOR_CASUAL 的两件（:283-299）：R = 服装编号，S = 顺从档。
 * 裙子（1）对男性角色要 S = 3（:286-287 的 SIF TALENT:122）。
 */
const CASUAL_ITEMS = [
  {
    n: 1,
    label: '日常着装・裙子',
    r: 1,
    s: (cid) => (talent(cid, 122) ? 3 : 0),
  },
  { n: 2, label: '日常着装・裤子', r: 101, s: () => 0 },
];

/**
 * @TAILOR_NORMAL 的 42 件（:327-527）：page 是原作的 P（0-4，每页 10 件），
 * n 是玩家输入的编号。童装（n = 2）的 A 是 3（:395），其余 A = 1。
 */
const NORMAL_ITEMS = [
  { page: 0, n: 1, label: '护胸＆裙甲', r: 2, s: () => 0 },
  {
    page: 0,
    n: 2,
    label: '童装（女孩用）',
    a: KIND_CHILD,
    r: 22,
    // :397-401：娇小/未成长/幼儿体质 → 免顺从；男性 → 至少 3
    s: (cid) => {
      let s = 5;
      if (talent(cid, 132) || talent(cid, 135) || talent(cid, 131)) s = 0;
      if (talent(cid, 122) && s < 3) s = 3;
      return s;
    },
  },
  { page: 0, n: 3, label: '锁甲', r: 3, s: () => 0 },
  { page: 0, n: 4, label: '皮甲＆裙甲', r: 4, s: () => 0 },
  { page: 0, n: 5, label: '护胸＆短裤式护甲', r: 108, s: () => 0 },
  { page: 0, n: 6, label: '神官服', r: 207, s: () => 0 },
  { page: 0, n: 7, label: '胸甲＆南瓜裙', r: 111, s: () => 0 },
  { page: 0, n: 8, label: '长袍', r: 206, s: () => 3 },
  { page: 0, n: 9, label: '睡衣', r: 131, s: () => 0 },
  {
    page: 0,
    n: 10,
    label: '连衣裙',
    r: 201,
    s: (cid) => (talent(cid, 122) ? 3 : 0),
  },
  { page: 1, n: 11, label: '忍者装', r: 110, s: () => 0 },
  {
    page: 1,
    n: 12,
    label: '妓女装',
    r: 203,
    s: (cid) => (talent(cid, 122) ? 3 : 1),
  },
  { page: 1, n: 13, label: '巫女装', r: 104, s: () => 0 },
  {
    page: 1,
    n: 14,
    label: '孕妇装',
    r: 205,
    s: (cid) => (talent(cid, 153) ? 1 : 4),
  },
  { page: 1, n: 15, label: '紧身装甲', r: 251, s: () => 0 },
  { page: 1, n: 16, label: '兔女郎装', r: 254, s: () => 3 },
  { page: 1, n: 17, label: '紧身服＆裙甲', r: 5, s: () => 0 },
  { page: 1, n: 18, label: '胸甲＆裙子', r: 6, s: () => 0 },
  { page: 1, n: 19, label: '尖刺铠＆裙子', r: 7, s: () => 2 },
  { page: 1, n: 20, label: '女仆装', r: 209, s: () => 0 },
  { page: 2, n: 21, label: '冒险装', r: 103, s: () => 0 },
  { page: 2, n: 22, label: '骑士铠', r: 105, s: () => 0 },
  { page: 2, n: 23, label: '混沌护甲', r: 253, s: () => 3 },
  { page: 2, n: 24, label: '贴身甲', r: 292, s: () => 0 },
  { page: 2, n: 25, label: '比基尼铠甲', r: 193, s: () => 0 },
  { page: 2, n: 26, label: '性感内衣', r: 194, s: () => 3 },
  { page: 2, n: 27, label: '梦魔式比基尼', r: 195, s: () => 3 },
  { page: 2, n: 28, label: '恶魔紧身衣', r: 294, s: () => 3 },
  { page: 2, n: 29, label: '拘束衣', r: 241, s: () => 3 },
  { page: 2, n: 30, label: '挂满避孕套的圣女服', r: 213, s: () => 3 },
  { page: 3, n: 31, label: '冒险服＆丁字裤', r: 113, s: () => 3 },
  { page: 3, n: 32, label: '乳贴＆迷你短裙铠甲', r: 8, s: () => 3 },
  { page: 3, n: 33, label: '胸甲＆透视裙子', r: 9, s: () => 3 },
  { page: 3, n: 34, label: '袒胸露乳的巫女装', r: 114, s: () => 3 },
  { page: 3, n: 35, label: '暴露的女忍者装', r: 115, s: () => 3 },
  { page: 3, n: 36, label: '胸甲＆丁字裤', r: 116, s: () => 3 },
  { page: 3, n: 37, label: '挂满避孕套的妓女服装', r: 210, s: () => 3 },
  { page: 3, n: 38, label: '淫荡暴露的神官服', r: 211, s: () => 3 },
  { page: 3, n: 39, label: '露出乳头与私处的紧身衣', r: 212, s: () => 3 },
  { page: 3, n: 40, label: '连身泳装', r: 295, s: () => 1 },
  { page: 4, n: 41, label: '分体泳装', r: 196, s: () => 1 },
  { page: 4, n: 42, label: '旗袍', r: 214, s: () => 0 },
];

/** 普通装备的页数（:530 的 `P %= 5`） */
const NORMAL_PAGES = 5;

/**
 * @TAILOR_ACCESSORY 的 43 件（:570-850）：page 是原作的 LOCAL:0（每页 10 件，
 * 由 `LOCAL:1 = 40` 的 `(LOCAL:1)/10` 决定共 5 页）。
 */
const ACCESSORY_ITEMS = [
  { page: 0, n: 1, label: '围裙', r: 1, c: 10000, s: () => 0 },
  { page: 0, n: 2, label: '外套', r: 2, c: 10000, s: () => 0 },
  { page: 0, n: 3, label: '白衣', r: 3, c: 10000, s: () => 0 },
  { page: 0, n: 4, label: '男装衬衣', r: 4, c: 10000, s: () => 1 },
  { page: 0, n: 5, label: '朴素的背心', r: 10, c: 10000, s: () => 0 },
  { page: 0, n: 6, label: '斗篷', r: 12, c: 10000, s: () => 1 },
  { page: 0, n: 7, label: '头饰', r: 81, c: 10000, s: () => 0 },
  { page: 0, n: 8, label: '护额', r: 52, c: 10000, s: () => 0 },
  {
    page: 0,
    n: 9,
    label: '护士帽',
    r: 53,
    c: 10000,
    // :681-683：护士资质（TALENT:63）降一档，男性至少 3
    s: (cid) => {
      let s = 2 - talent(cid, 63);
      if (talent(cid, 122) && s < 3) s = 3;
      return s;
    },
  },
  { page: 0, n: 10, label: '女警帽', r: 54, c: 10000, s: () => 0 },
  { page: 1, n: 11, label: '牛仔帽', r: 55, c: 10000, s: () => 0 },
  { page: 1, n: 12, label: '土著帽子', r: 56, c: 10000, s: () => 0 },
  { page: 1, n: 13, label: '发饰', r: 82, c: 10000, s: () => 0 },
  { page: 1, n: 14, label: '眼镜', r: 83, c: 10000, s: () => 0 },
  { page: 1, n: 15, label: '墨镜', r: 84, c: 10000, s: () => 0 },
  { page: 1, n: 16, label: '银吊坠', r: 87, c: 10000, s: () => 0 },
  { page: 1, n: 17, label: '珍珠项链', r: 88, c: 10000, s: () => 0 },
  { page: 1, n: 18, label: '勾玉项链', r: 89, c: 10000, s: () => 0 },
  { page: 1, n: 19, label: '阶级章', r: 60, c: 10000, s: () => 0 },
  { page: 1, n: 20, label: '名牌', r: 61, c: 10000, s: () => 0 },
  { page: 2, n: 21, label: '项链', r: 90, c: 10000, s: () => 0 },
  { page: 2, n: 22, label: '蝴蝶结', r: 62, c: 10000, s: () => 0 },
  { page: 2, n: 23, label: '银手镯', r: 86, c: 10000, s: () => 0 },
  { page: 2, n: 24, label: '护身符', r: 85, c: 10000, s: () => 0 },
  { page: 2, n: 25, label: '拉拉队彩球', r: 51, c: 10000, s: () => 0 },
  { page: 2, n: 26, label: '腕带', r: 57, c: 10000, s: () => 0 },
  { page: 2, n: 27, label: '串珠手镯', r: 58, c: 10000, s: () => 0 },
  { page: 2, n: 28, label: '长手套', r: 59, c: 10000, s: () => 0 },
  {
    page: 2,
    n: 29,
    label: '狗项圈',
    r: 71,
    c: 10000,
    // :763-767：欲望（ABL:21）越高越难，奴隶气质/高感度各降一档
    s: (cid) => {
      let s = 10 - abl(cid, 21);
      if (talent(cid, 124) && s > 5) s = 5;
      if (talent(cid, 136) || s < 3) s = 3;
      return s;
    },
  },
  {
    page: 2,
    n: 30,
    label: '龟甲缚用的绳子',
    r: 72,
    c: 10000,
    s: (cid) => {
      let s = 8 - abl(cid, 21);
      if (talent(cid, 88) || s < 3) s = 3;
      return s;
    },
  },
  {
    page: 3,
    n: 31,
    label: '牛铃和鼻环',
    r: 73,
    c: 10000,
    // :777-779：巨乳/爆乳 + 奶牛 → 降为 3
    s: (cid) => {
      let s = 6;
      if ((talent(cid, 110) || talent(cid, 114)) && talent(cid, 130)) s = 3;
      return s;
    },
  },
  {
    page: 3,
    n: 32,
    label: '手枷',
    r: 74,
    c: 10000,
    s: (cid) => {
      let s = 10 - abl(cid, 21);
      if (talent(cid, 124) && s > 5) s = 5;
      if (talent(cid, 136) || s < 3) s = 3;
      return s;
    },
  },
  {
    page: 3,
    n: 33,
    label: '足枷',
    r: 75,
    c: 10000,
    s: (cid) => {
      let s = 10 - abl(cid, 21);
      if (talent(cid, 124) && s > 5) s = 5;
      if (talent(cid, 136) || s < 3) s = 3;
      return s;
    },
  },
  {
    page: 3,
    n: 34,
    label: '首枷',
    r: 76,
    c: 10000,
    s: (cid) => {
      let s = 10 - abl(cid, 21);
      if (talent(cid, 124) && s > 5) s = 5;
      if (talent(cid, 136) || s < 3) s = 3;
      return s;
    },
  },
  {
    page: 3,
    n: 35,
    label: '涂鸦',
    r: 77,
    c: 100,
    s: (cid) => {
      let s = 8 - abl(cid, 21);
      if (talent(cid, 88) || s < 3) s = 3;
      return s;
    },
  },
  {
    page: 3,
    n: 36,
    label: '绳子印',
    r: 80,
    c: 100,
    s: (cid) => {
      let s = 8 - abl(cid, 21);
      if (talent(cid, 88) || s < 3) s = 3;
      return s;
    },
  },
  { page: 3, n: 37, label: '魔法纹身', r: 78, c: 500, s: () => 5 },
  {
    page: 3,
    n: 38,
    label: '尿布',
    r: 69,
    c: 100,
    // :824-825：尿布爱好（TALENT:57）→ 1
    s: (cid) => (talent(cid, 57) ? 1 : 6),
  },
  {
    page: 3,
    n: 39,
    label: '贞操带',
    r: 79,
    c: 100,
    // :830-831：男性 → 99（等于穿不上）
    s: (cid) => (talent(cid, 122) ? 99 : 0),
  },
  { page: 3, n: 40, label: '长袍', r: 13, c: 10000, s: () => 0 },
  { page: 4, n: 41, label: '头环', r: 91, c: 10000, s: () => 0 },
  {
    page: 4,
    n: 42,
    label: '戒指',
    r: 92,
    c: 100000,
    // :844-845：爱慕 → 1
    s: (cid) => (talent(cid, 85) ? 1 : 6),
  },
  { page: 4, n: 43, label: '神秘的尿道导管', r: 98, c: 3000, s: () => 3 },
];

/** 装备品的页数（:562 `LOCAL:1 = 40` → `(LOCAL:1)/10` = 4，页号 0-4） */
const ACCESSORY_PAGE_MAX = 4;

/** 黑市（@TAILOR_NORMAL_SPECIAL）的 27 件（:1319-1456） */
const SPECIAL_ITEMS = [
  { page: 0, n: 1, label: '高中制服', r: 17, s: () => 0 },
  { page: 0, n: 2, label: '初中制服', r: 18, s: () => 0 },
  { page: 0, n: 3, label: '水手服', r: 19, s: () => 0 },
  { page: 0, n: 4, label: '私立贵族学院制服', r: 20, s: () => 0 },
  { page: 0, n: 5, label: '西装', r: 21, s: () => 0 },
  { page: 0, n: 6, label: '浴衣', r: 204, s: () => 0 },
  { page: 0, n: 7, label: '名牌服装', r: 23, s: () => 0 },
  { page: 0, n: 8, label: '护士服', r: 24, s: () => 0 },
  { page: 0, n: 9, label: '女性用军服', r: 25, s: () => 0 },
  { page: 0, n: 10, label: '女侍制服', r: 26, s: () => 0 },
  { page: 1, n: 11, label: '便利店制服', r: 27, s: () => 0 },
  { page: 1, n: 12, label: '事务员制服', r: 28, s: () => 0 },
  { page: 1, n: 13, label: '岛屿女孩服装', r: 29, s: () => 2 },
  { page: 1, n: 14, label: '演出服', r: 30, s: () => 0 },
  { page: 1, n: 15, label: '运动服', r: 31, s: () => 3 },
  { page: 1, n: 16, label: '丧服', r: 32, s: () => 0 },
  { page: 1, n: 17, label: '拉拉队服', r: 33, s: () => 3 },
  { page: 1, n: 18, label: '网球服', r: 34, s: () => 3 },
  { page: 1, n: 19, label: '女警服', r: 35, s: () => 2 },
  { page: 1, n: 20, label: '狩衣', r: 102, s: () => 0 },
  { page: 2, n: 21, label: '巫女装束', r: 104, s: () => 0 },
  { page: 2, n: 22, label: '军服', r: 106, s: () => 0 },
  { page: 2, n: 23, label: '忍者装束', r: 109, s: () => 3 },
  { page: 2, n: 24, label: '骑马服', r: 110, s: () => 2 },
  { page: 2, n: 25, label: '滑雪服', r: 112, s: () => 0 },
  { page: 2, n: 26, label: '和服', r: 120, s: () => 2 },
  { page: 2, n: 27, label: '浴衣', r: 202, s: () => 0 },
];

/** 黑市的页数（:1363 `P %= 3`） */
const SPECIAL_PAGES = 3;

/** 武器前缀表（:1254-1263） */
const WEAPON_PREFIXES = [
  '无',
  '巨型',
  '剧毒',
  '死亡',
  '开叉',
  '火之',
  '冰之',
  '雷之',
  '魔导',
  '暗黑',
];

// —— @LIFE_LIST_TAILOR（:933-979）——

/**
 * @LIFE_LIST_TAILOR（:933-979）：服饰店的成员列表（排除魔王/濒死/非待机）。
 *
 * 行正文 = `[编号] 名字 / 穿着…`（:945-978）：上衣（CFLAG:41）、内衣
 * （CFLAG:43/44）、特别服装（CFLAG:42）、武器（CFLAG:550）、两个戒指
 * （CFLAG:551/552）。
 */
function life_list_tailor() {
  for (const cid of era.getAddedCharacters()) {
    if (cid === 0) continue; // :936-937 主人公は排除
    if ((era.get(`base:${cid}:0`) || 0) < 1) continue; // :939-940 臨死中
    if (cflag(cid, 1) !== 0) continue; // :942-943 調教中以外は排除
    era_flag.target = cid; // :944 TARGET = COUNT（供 PRINT_CLOTHTYPE_* 读）
    const fragments = [{ content: `${chara_callname(cid)} ` }];
    // :946-954 穿着状态：有上衣 → 「/ 穿着 上衣名」；否则内衣；否则全裸
    if (cflag(cid, 41) && (cflag(cid, 45) >= 0 || cflag(cid, 46) >= 0)) {
      fragments.push({ content: `/ 穿着${clothtype_main2_text(cid)}` });
    } else if (cflag(cid, 41) && (cflag(cid, 43) >= 0 || cflag(cid, 44) >= 0)) {
      fragments.push({ content: '/ 穿着内衣' });
    } else {
      fragments.push({ content: '/ 全裸着' });
    }
    // :955-959 特别服装
    if (cflag(cid, 42) && cflag(cid, 47) >= 0) {
      fragments.push({ content: `/ 佩戴着${clothtype_special_text(cid)}` });
    }
    // :960-977 武器与两枚戒指（W:0 = CFLAG:COUNT:550 等的 ere 等价物是
    // 一次性的装备记录对象，见 equip-lookup.js 文件头）
    for (const [slot, span_of] of [
      [SLOT_WEAPON, equip_weapon_spans],
      [SLOT_RING_A, equip_ring_spans],
      [SLOT_RING_B, equip_ring_spans],
    ]) {
      if (cflag(cid, slot) > 0) {
        fragments.push({ content: '/ [' });
        fragments.push(...span_of({ 存储编号: cflag(cid, slot) })); // :962-970
        fragments.push({ content: '] ' });
      }
    }
    print_row(cid, fragments, 4);
  }
}

// —— 子菜单（原作的 A/C/R/S 全局经返回值传回 @TAILOR_CORE）——

/**
 * @TAILOR_CASUAL（:259-303）：日常服饰（2 件，100 点）。
 * @param {number} cid 目标
 * @returns {Promise<{a: number, c: number, r: number, s: number}>}
 */
async function tailor_casual(cid) {
  const price = CASUAL_PRICE; // :261
  if (era_flag.money < price) {
    await print_wait('钱不够！'); // :264-268
    return { a: 0, c: 0, r: 0, s: 0 };
  }
  for (;;) {
    era.print('□日常着装'); // :272
    era.print(`所持金：${era_flag.money}点`); // :273
    era.drawLine();
    for (const item of CASUAL_ITEMS) {
      era.printButton(item.label, item.n); // :276-277
    }
    era.drawLine();
    era.printButton('- 返回', 999); // :279
    const result = await era.input(); // :281
    const item = CASUAL_ITEMS.find((entry) => entry.n === result);
    if (item) {
      return { a: KIND_CLOTHES, c: price, r: item.r, s: item.s(cid) };
    }
    if (result === 999) {
      return { a: 0, c: 0, r: 0, s: 0 }; // :291-296
    }
    // :297-298 其余输入重绘
  }
}

/**
 * @TAILOR_NORMAL（:308-550）：普通装备（42 件、1000 点、5 页），含黑市入口。
 * @param {number} cid 目标
 * @returns {Promise<object>}
 */
async function tailor_normal(cid) {
  const price = NORMAL_PRICE;
  if (era_flag.money < price) {
    await print_wait('钱不够！');
    return { a: 0, c: 0, r: 0, s: 0 };
  }
  let page = 0; // :313 の P
  for (;;) {
    era.print('□普通的服装');
    era.print(`所持金：${era_flag.money}点`);
    era.drawLine();
    for (const item of NORMAL_ITEMS) {
      if (item.page !== page) continue;
      era.printButton(item.label, item.n);
    }
    era.drawLine();
    era.printButton('下一页', 997); // SHOP_TAILOR.ERB:384（原文此处无「- 」）
    era.printButton('服装黑市', 996); // SHOP_TAILOR.ERB:385（同上）
    era.printButton('上一页', 998); // SHOP_TAILOR.ERB:386（同上）
    era.printButton('- 返回', 999); // SHOP_TAILOR.ERB:387
    const result = await era.input();
    const item = NORMAL_ITEMS.find((entry) => entry.n === result);
    if (item) {
      return {
        a: item.a ?? KIND_CLOTHES,
        c: price,
        r: item.r,
        s: item.s(cid),
      };
    }
    if (result === 997) {
      page = (page + 1) % NORMAL_PAGES;
      continue;
    }
    if (result === 998) {
      page = (page + NORMAL_PAGES - 1) % NORMAL_PAGES;
      continue;
    }
    if (result === 996) {
      // :544-550 服装黑市：`CALL TAILOR_NORMAL_SPECIAL` 之后落到段尾的
      // `RETURN 1`——黑市取消（A = 0）也照这条回去，由 @TAILOR_CORE 的
      // `A == 0 → GOTO INPUT_LOOP_02` 回主菜单（不是留在本画面）
      return tailor_normal_special(cid);
    }
    if (result === 999) {
      return { a: 0, c: 0, r: 0, s: 0 };
    }
    // 其余输入重绘
  }
}

/**
 * @TAILOR_NORMAL_SPECIAL（:1299-1461）：服装黑市（27 件、30000 点、3 页）。
 * @param {number} cid 目标
 * @returns {Promise<object>}
 */
async function tailor_normal_special(cid) {
  const price = SPECIAL_PRICE;
  if (era_flag.money < price) {
    await print_wait('钱不够！');
    return { a: 0, c: 0, r: 0, s: 0 };
  }
  let page = 0;
  for (;;) {
    era.print('□黑市服装');
    era.print(`所持金：${era_flag.money}点`);
    era.drawLine();
    for (const item of SPECIAL_ITEMS) {
      if (item.page !== page) continue;
      era.printButton(item.label, item.n);
    }
    era.drawLine();
    era.printButton('下一页', 997); // SHOP_TAILOR.ERB:628（原文此处无「- 」）
    era.printButton('上一页', 998); // SHOP_TAILOR.ERB:629（同上）
    era.printButton('- 返回', 999); // SHOP_TAILOR.ERB:630
    const result = await era.input();
    const item = SPECIAL_ITEMS.find((entry) => entry.n === result);
    if (item) {
      // :1301 A = 2（黑市的服装档）
      return { a: 2, c: price, r: item.r, s: item.s(cid) };
    }
    if (result === 997) {
      page = (page + 1) % SPECIAL_PAGES;
      continue;
    }
    if (result === 998) {
      page = (page + SPECIAL_PAGES - 1) % SPECIAL_PAGES;
      continue;
    }
    if (result === 999) {
      return { a: 0, c: 0, r: 0, s: 0 }; // :1370-1375（A/C/R/S/T 清零）
    }
  }
}

/**
 * @TAILOR_ACCESSORY（:556-862）：装备品（43 件、5 页、价格随件）。
 * @param {number} cid 目标
 * @returns {Promise<object>}
 */
async function tailor_accessory(cid) {
  let page = 0; // :560 LOCAL:0
  for (;;) {
    // :566 `□装备品 ({(LOCAL:0)+1,2}/{(LOCAL:1/10)+1,2}页)`
    era.print(`□装备品 (${page + 1}/ ${ACCESSORY_PAGE_MAX + 1}页)`);
    era.print(`所持金：${era_flag.money}点`);
    era.drawLine();
    for (const item of ACCESSORY_ITEMS) {
      if (item.page !== page) continue;
      era.printButton(`${item.label}（${item.c}点）`, item.n);
    }
    era.drawLine();
    era.printButton('下一页', 997); // SHOP_TAILOR.ERB:1355（原文此处无「- 」）
    era.printButton('上一页', 998); // SHOP_TAILOR.ERB:1356（同上）
    era.printButton('- 返回', 999); // SHOP_TAILOR.ERB:1357
    const result = await era.input();
    const item = ACCESSORY_ITEMS.find((entry) => entry.n === result);
    if (item) {
      return {
        a: KIND_ACCESSORY,
        c: item.c,
        r: item.r,
        s: item.s(cid),
      };
    }
    if (result === 997) {
      page = page > ACCESSORY_PAGE_MAX - 1 ? 0 : page + 1; // :634-639
      continue;
    }
    if (result === 998) {
      page = page < 1 ? ACCESSORY_PAGE_MAX : page - 1; // :640-645
      continue;
    }
    if (result === 999) {
      return { a: 0, c: 0, r: 0, s: 0 };
    }
  }
}

/**
 * @TAILOR_UNDERWARE（:867-882）：替换内衣（5 点）。
 * @returns {Promise<object>}
 */
async function tailor_underware() {
  const price = UNDERWARE_PRICE;
  if (era_flag.money < price) {
    await print_wait('钱不够！'); // :873-879
    return { a: 0, c: 0, r: 0, s: 0 };
  }
  return { a: KIND_UNDERWARE, c: price, r: 0, s: 0 }; // :868-871
}

/**
 * @TAILOR_DIAPER（:887-901）：替换尿布（50 点）。
 * @returns {Promise<object>}
 */
async function tailor_diaper() {
  const price = DIAPER_PRICE;
  if (era_flag.money < price) {
    await print_wait('钱不够！');
    return { a: 0, c: 0, r: 0, s: 0 };
  }
  return { a: KIND_DIAPER, c: price, r: 0, s: 0 };
}

/**
 * @CHASTITY_KEY（:906-928）：扔掉贞操带的钥匙。
 * @returns {Promise<object>} A 恒 0（:907）——只是演出 + 写 CFLAG:49 = 1
 */
async function chastity_key() {
  era.print(`${chara_callname(era_flag.target)}贞操带的钥匙丢掉的话，`); // :909
  era.print(`就再也无法打开${chara_callname(0)}的贞操带了。`); // :910
  era.print('丢掉钥匙，而且也没有后备匙，钥匙真的再也找不回来了哦！'); // :911
  for (;;) {
    era.print(''); // :913 PRINTL
    era.print(
      `当真当真要把${chara_callname(era_flag.target)}贞操带的钥匙丢掉吗？`,
    ); // :914
    era.printButton('- 丢掉！', 0); // :915
    era.printButton('- 不丢。', 1); // :916
    const result = await era.input(); // :917
    if (result === 0) {
      era.print(`${chara_callname(era_flag.target)}呆若木鸡地看着前方，`); // :919
      era.print(
        `${chara_callname(0)}把贞操带的钥匙，丢到连接地下城迷宫各层的楼梯处。`,
      ); // :920
      era.print('到底掉到哪层，掉到哪里，再也没人知道了。'); // :921
      await wait(); // :922
      chara(era_flag.target).stronghold.贞操带钥匙已丢弃 = 1; // :923 CFLAG:49 = 1
      return { a: 0, c: 0, r: 0, s: 0 };
    }
    if (result !== 1) {
      continue; // :924-925
    }
    return { a: 0, c: 0, r: 0, s: 0 }; // :912-926（不丢 → A 保持 0，回主菜单）
  }
}

/**
 * 强化档的公共计算（:1091-1128 与 :1229-1291 的同一段）：现有强度在编号的
 * 千位（`W:0 % 100000 / 1000`），加档位、超上限回退（`Y:2 += 10 - W:2`）、
 * 按**调整后**的档位计价。
 *
 * @param {number} current 现有存储编号
 * @param {number} amount 玩家选的档位（0-10）
 * @returns {{value: number, pay: number}} 新的存储编号与实付档位
 */
function enhanced_value(current, amount) {
  let strength =
    Math.trunc((current % WEAPON_PREFIX_SCALE) / ENHANCE_SCALE) + amount;
  let pay = amount;
  if (strength > ENHANCE_MAX) {
    pay += ENHANCE_MAX - strength; // :1103-1104 超限回退
  }
  return { value: current + ENHANCE_SCALE * pay, pay };
}

/**
 * 强化档的选择（:1067-1089 / :1205-1227）：0-10，受所持金限制。
 * @returns {Promise<number|null>} null = 不装备（[999] 或钱不够）
 */
async function pick_enhance_amount() {
  for (;;) {
    let max_amount = Math.trunc(era_flag.money / ENHANCE_UNIT); // X = MONEY / 10000
    if (max_amount > ENHANCE_MAX) {
      max_amount = ENHANCE_MAX; // :1070-1071
    }
    // :1073 `PRINTFORML [0] [1] [2] [4] [6] [8] [{X}]` 是「可选档位一览 + 自由
    // 输入」；ere 引擎只回传已打印按钮的编号，故这里把这些档位逐个按钮化
    // （取值集合与原文逐字相同，去重后按原序）
    for (const amount of [...new Set([0, 1, 2, 4, 6, 8, max_amount])]) {
      era.printButton(String(amount), amount);
    }
    era.printButton('- 不装备', 999); // :1074
    const result = await era.input(); // :1076
    if (result === 999) {
      return null; // :1078-1079
    }
    // :1080 原作判的是 X（所持金的档位数）而非 RESULT，1:1 保留这一判据
    if (max_amount < 0 || max_amount > ENHANCE_MAX) {
      continue;
    }
    if (era_flag.money < result * ENHANCE_UNIT) {
      await print_wait('钱不够！！'); // :1086-1088
      return null;
    }
    return result; // :1081 Y:2 = RESULT
  }
}

/**
 * 武器前缀的选择（:1253-1275）：0-9。
 * @returns {Promise<number|null>} null = 返回（[999]）；其余非法输入按无前缀
 */
async function pick_weapon_prefix() {
  era.print('可以设定强化的前缀'); // :1253
  for (let index = 0; index <= WEAPON_PREFIX_MAX; index += 1) {
    era.printButton(WEAPON_PREFIXES[index], index); // :1254-1263
  }
  era.printButton('- 返回', 999); // :1265
  const result = await era.input(); // :1267
  if (result === 999) {
    return null; // :1269-1270
  }
  if (result >= 0 && result <= WEAPON_PREFIX_MAX) {
    return result; // :1271-1272 Y:3 = RESULT
  }
  return 0; // :1273-1274 原作回循环头；ere 侧按钮集即 0-9 与 999，等价
}

/**
 * 装备一件（:1116-1128 / :1277-1291 的公共尾段）：原有装备回包、新装备
 * 出包、按档位扣钱、写入存储编号（前缀写在十万位）。
 *
 * @param {number} cid 目标
 * @param {number} slot CFLAG 槽位
 * @param {number} item_no 道具号（300+段）
 * @param {number} amount 强化档位
 * @param {number} prefix 武器前缀档（0 = 无）
 */
function install_equip(cid, slot, item_no, amount, prefix) {
  const old = { 存储编号: cflag(cid, slot) };
  equip_get(old); // :1116/:1190/:1278 CALL EQUIP_GET（旧装备回包）
  era.set(`item:${item_no}`, (era.get(`item:${item_no}`) || 0) - 1); // :1120/:1282
  era_flag.money -= amount * ENHANCE_UNIT; // :1122-1123 / :1284-1285
  era.set('exflag:4444', (era.get('exflag:4444') || 0) - amount * ENHANCE_UNIT);
  const w = { 备注: item_no }; // W:8 = Y:1
  get_equip_num(w); // :1126 / :1288（编号 → 识别号）
  era.set(
    `cflag:${cid}:${slot}`,
    w.存储编号 +
      ENHANCE_SCALE * amount +
      (prefix === 0 ? 0 : WEAPON_PREFIX_SCALE * prefix),
  ); // :1127-1128 / :1289-1291
}

/**
 * @EQUIP_MAGIC_ITEM（:982-1129）：魔法装饰（戒指槽 A/B）的装备与强化。
 * @param {number} cid 目标
 * @returns {Promise<object>} A 恒 0（:1012-1013 的 RETURN 0）
 */
async function equip_magic_item(cid) {
  for (;;) {
    // :988-1008 选槽（装饰 A [1] / 装饰 B [2]）——原作的 `PRINTFORM  [1] - 装饰A　:`
    // 是纯文本 + 自由输入，ere 侧按钮化（PR #53 通则），编号 1/2 保持
    for (const [result_id, slot] of [
      [1, SLOT_RING_A],
      [2, SLOT_RING_B],
    ]) {
      const w = { 存储编号: cflag(cid, slot) }; // :990/:999 W:0 = CFLAG:…
      const label = result_id === 1 ? '装饰A' : '装饰B';
      if (w.存储编号 <= -1) {
        era.printButton(`- ${label}　: 无`, result_id); // :992-993
      } else {
        era.printButton(
          [
            { content: `- ${label}　: ` }, // SHOP_TAILOR.ERB:991/1000
            ...equip_ring_spans(w), // :995 CALL PRINT_EQUIPTYPE_RING
          ],
          result_id,
        );
      }
    }
    era.printButton('- 返回', 999); // :1008
    const result = await era.input(); // :1010
    if (result === 999) {
      return { a: 0, c: 0, r: 0, s: 0 }; // :1012-1013
    }
    let slot;
    if (result === 1) {
      slot = SLOT_RING_A; // :1014-1015 Y:0 = 551
    } else if (result === 2) {
      slot = SLOT_RING_B; // :1016-1017 Y:0 = 552
    } else {
      continue; // :1018-1019
    }
    await pick_ring(cid, slot); // :1022-1129 的选件与强化
  }
}

/**
 * 戒指的选件与强化（:1022-1129）。
 * @param {number} cid 目标
 * @param {number} slot CFLAG 槽位（551/552）
 */
async function pick_ring(cid, slot) {
  for (;;) {
    // :1024-1028 列出持有的装备品（编号 300-319）
    for (let index = 0; index < EQUIP_ITEM_COUNT; index += 1) {
      const item_no = EQUIP_ITEM_BASE + index; // X = COUNT + 300
      if ((era.get(`item:${item_no}`) || 0) > 0) {
        // 正文不写 [编号]：引擎 showAcc 自动拼 `[300] …`（PR #30，AGENTS.md）
        era.printButton(
          `${era.get(`itemname:${item_no}`) ?? ''} (${era.get(`item:${item_no}`)})`,
          item_no,
        );
      }
    }
    // :1030-1039 强化 / 取下
    if (cflag(0, 9) < ENHANCE_LEVEL) {
      era.print([{ content: '未开放（30级后才能装备强化）', color: GRAY }]);
    } else if (cflag(cid, slot) >= 0) {
      era.printButton('- 装备强化', 997); // SHOP_TAILOR.ERB:1035
    }
    if (cflag(cid, slot) >= 0) {
      era.printButton('- 取下', 998); // SHOP_TAILOR.ERB:1039
    }
    era.printButton('- 返回', 999); // :1040

    const result = await era.input(); // :1042
    let enhance_type = 0; // :1044 EQUIPTYPE = 0
    let item_no = null;
    if (result === 999) {
      return; // :1046-1047（回选槽）
    }
    if (result === 997 && cflag(0, 9) >= ENHANCE_LEVEL) {
      enhance_type = 1; // :1048-1049
    } else if (result === 998) {
      // :1050-1054 取下：装备回包、槽置 -1
      const w = { 存储编号: cflag(cid, slot) };
      equip_get(w);
      era.set(`cflag:${cid}:${slot}`, -1);
      continue;
    } else if (result >= EQUIP_ITEM_BASE) {
      item_no = result; // :1055-1056 Y:1 = RESULT
    } else {
      continue; // :1057-1058
    }

    // :1061-1065 确认行
    era.print(
      enhance_type === 1
        ? `要强化现在的装备吗？　每+1需花费${ENHANCE_UNIT}pt，最多能+${ENHANCE_MAX}。`
        : `要装备${era.get(`itemname:${result}`) ?? ''}了吗？　请确认装备的提升。每+1需花费${ENHANCE_UNIT}pt，最多能+${ENHANCE_MAX}。`,
    );

    const amount = await pick_enhance_amount(); // :1067-1089
    if (amount === null) {
      continue;
    }

    if (enhance_type === 1) {
      // :1094-1113 强化
      const { value, pay } = enhanced_value(cflag(cid, slot), amount);
      era_flag.money -= pay * ENHANCE_UNIT; // :1110-1111
      era.set(
        'exflag:4444',
        (era.get('exflag:4444') || 0) - pay * ENHANCE_UNIT,
      );
      era.set(`cflag:${cid}:${slot}`, value); // :1112
      continue;
    }

    install_equip(cid, slot, item_no, amount, 0); // :1116-1128
    continue;
  }
}

/**
 * @EQUIP_MAGIC_WEAPON（:1133-1292）：武器的装备与强化。
 * @param {number} cid 目标
 * @returns {Promise<object>} A 恒 0（:1178-1179 的 RETURN 0）
 */
async function equip_magic_weapon(cid) {
  for (;;) {
    const current = { 存储编号: cflag(cid, SLOT_WEAPON) }; // :1141 W:0
    if (current.存储编号 <= -1) {
      era.print('武器　: 空手'); // :1144-1145
    } else {
      era.print([{ content: '武器　: ' }, ...equip_weapon_spans(current)]); // :1146-1148
    }
    era.printButton('- 剑', SWORD_ITEM); // :1151（[340]）
    for (let index = 0; index < WEAPON_ITEM_COUNT; index += 1) {
      const item_no = WEAPON_ITEM_START + index; // X = COUNT + 341
      if (
        (era.get(`item:${item_no}`) || 0) > 0 &&
        item_no !== WEAPON_TENTACLE_ID
      ) {
        // 正文不写 [编号]：引擎 showAcc 自动拼 `[300] …`（PR #30，AGENTS.md）
        era.printButton(
          `${era.get(`itemname:${item_no}`) ?? ''} (${era.get(`item:${item_no}`)})`,
          item_no,
        ); // :1156
      }
    }
    if ((era.get(`item:${WEAPON_TENTACLE_ITEM}`) || 0) > 0) {
      era.printButton('- 武器化触手', WEAPON_TENTACLE_RESULT); // :1159-1160（[990]）
    }
    if (cflag(0, 9) < ENHANCE_LEVEL) {
      era.print([{ content: '未开放（30级后才能装备强化）', color: GRAY }]); // :1163-1165
    } else if (current.存储编号 >= 0) {
      era.printButton('- 装备强化', 997); // :1166-1168
    }
    if (current.存储编号 >= 0) {
      era.printButton('- 取下', 998); // :1170-1171
    }
    era.printButton('- 返回', 999); // :1172

    const result = await era.input(); // :1174
    let enhance_type = 0; // :1176 EQUIPTYPE = 0
    let item_no = result;
    if (result === 999) {
      return { a: 0, c: 0, r: 0, s: 0 }; // :1178-1179
    }
    if (result === WEAPON_TENTACLE_RESULT) {
      item_no = WEAPON_TENTACLE_ID; // :1180-1182 Y:1 = 349; RESULT = 349
    } else if (result === 997 && current.存储编号 <= -1) {
      era.print('手无寸铁，强化啥子？'); // :1183-1185
      continue;
    } else if (result === 997 && cflag(0, 9) >= ENHANCE_LEVEL) {
      enhance_type = 1; // :1186-1187
    } else if (result === 998) {
      // :1188-1192 取下
      const w = { 存储编号: cflag(cid, SLOT_WEAPON) };
      equip_get(w);
      era.set(`cflag:${cid}:${SLOT_WEAPON}`, -1);
      continue;
    } else if (result < EQUIP_ITEM_BASE) {
      continue; // :1193-1196
    }

    // :1199-1203 确认行
    era.print(
      enhance_type === 1
        ? `要强化现在的装备吗？　每+1需花费${ENHANCE_UNIT}pt，最多能+${ENHANCE_MAX}。`
        : `要装备${era.get(`itemname:${result}`) ?? ''}了吗？　请确认装备的提升。每+1需花费${ENHANCE_UNIT}pt，最多能+${ENHANCE_MAX}。`,
    );

    const amount = await pick_enhance_amount(); // :1205-1227
    if (amount === null) {
      continue;
    }

    if (enhance_type === 1) {
      // :1230-1251 强化
      const { value, pay } = enhanced_value(cflag(cid, SLOT_WEAPON), amount);
      era_flag.money -= pay * ENHANCE_UNIT; // :1247-1248
      era.set(
        'exflag:4444',
        (era.get('exflag:4444') || 0) - pay * ENHANCE_UNIT,
      );
      era.set(`cflag:${cid}:${SLOT_WEAPON}`, value); // :1249
      continue;
    }

    // :1253-1275 前缀档
    const prefix = await pick_weapon_prefix();
    if (prefix === null) {
      continue;
    }
    install_equip(cid, SLOT_WEAPON, item_no, amount, prefix); // :1277-1291
    continue;
  }
}

// —— @TAILOR_CORE / @TAILOR_MAIN ——

/**
 * 购入的四道门（:116-127）：A == 0 / 贞操带锁 / 钱不够 / 顺从不够。
 *
 * @param {number} cid 目标
 * @param {{a: number, c: number, r: number, s: number}} picked 子菜单的选择结果
 * @returns {Promise<boolean>} true = 被门拦下（未应用，调用方回主菜单），
 *   false = 放行，交给 apply_purchase
 */
async function purchase_guard(cid, picked) {
  const { a, c, s } = picked;
  // 四道门的**次序照原作**（:116-127），它们在童装撑破询问（:129-163）之前：
  // 钱不够/顺从不够时不会被问「要不要强行套上」
  if (a === 0) {
    return true; // :116-117 A == 0 → 回主菜单（各子菜单的取消都走这支）
  }
  if (a === KIND_ACCESSORY && cflag(cid, 49)) {
    await print_wait('不解开贞操带的话，无法穿戴其他装备！'); // :118-120
    return true;
  }
  if (era_flag.money < c) {
    era.print('钱不够！'); // :121-123
    await wait();
    return true;
  }
  if (abl(cid, 10) < s) {
    await print_wait('拒绝穿戴。'); // :124-126
    return true;
  }
  return false;
}

/**
 * 应用一次购入（:165-230 的四支 + :232-245 的撑破 + :247-252 的收尾）。
 * 四道门在调用方（purchase_guard）先过，本函数只管应用。
 *
 * @param {number} cid 目标
 * @param {{a: number, c: number, r: number, torn?: number}} picked
 */
async function apply_purchase(cid, picked) {
  const { a, c, r } = picked;
  const torn = picked.torn ?? 0; // F（:16 的着衣时损伤标志）

  // :165-175 通常衣類（A <= 9）：换上衣
  if (a <= 9) {
    era.print(chara_callname(cid)); // :166
    if (cflag(cid, 41) && (cflag(cid, 45) === 0 || cflag(cid, 46) === 0)) {
      // :167-169 %GET_CLOTHTYPE_MAIN2(TARGET,"脱下")%——动词是实参的一部分
      era.print(get_clothtype_main2(cid, '脱下'));
    }
    chara(cid).train.上衣类型 = r; // :172
    chara(cid).train.上衣上状态 = 0; // :173
    chara(cid).train.上衣下状态 = 0; // :174
    era.print(`${get_clothtype_main2(cid, '换上')}了。`); // :176
  } else if (a === KIND_UNDERWARE) {
    // :177-205 内衣：旧内衣卖掉换钱（:179-194）
    era.print(`为${chara_callname(cid)}买了新内衣。`);
    if (cflag(cid, 43) >= 0 && cflag(cid, 48) >= 6) {
      await wait(); // :180
      let price = 50 * cflag(cid, 48); // :181
      if (talent(cid, 74)) price = Math.trunc(price * 1.5); // :183-184 自慰狂
      if (talent(cid, 92)) price = Math.trunc(price * 2.0); // :186-187 谜之魅力
      if (talent(cid, 126)) price = Math.trunc(price * 1.5); // :189-190 高人气
      era.print(`穿过的内裤被卖掉挣了${price}点钱。`); // :191
      era_flag.money += price; // :192
      era.set('exflag:4444', (era.get('exflag:4444') || 0) + price); // :193
    }
    if (cflag(cid, 41) === 0) {
      chara(cid).train.上衣类型 = 1; // :196-200
      chara(cid).train.上衣上状态 = -3;
      chara(cid).train.上衣下状态 = -3;
    }
    chara(cid).train.着衣状态 = 3; // :202-205
    chara(cid).train.内裤状态 = 0;
    chara(cid).stronghold.胸罩状态 = 0;
    chara(cid).train.内裤穿着期间 = 0;
  } else if (a === KIND_DIAPER) {
    // :206-208 尿布
    era.print(`${chara_callname(cid)}在房间的角落穿上了尿布。`);
    chara(cid).train.特别服装状态 = 0;
  } else if (a === KIND_ACCESSORY) {
    // :209-229 装备品
    if (cflag(cid, 42) && cflag(cid, 47) === 0) {
      era.print(`${chara_callname(cid)}将`);
      era.print(clothtype_special_text(cid));
      era.print('脱了下来，');
    } else {
      era.print(`${chara_callname(cid)}穿上了`);
    }
    chara(cid).chara.特别服装类型 = r; // :218
    chara(cid).train.特别服装状态 = 0; // :219
    era.print(clothtype_special_text(cid));
    era.print('穿上了。'); // :222
    if (r === 99 || r === 98) {
      era.print('穿衣的时候，因为尚未习惯的尿道导管的插入，'); // :226
      era.print(`${chara_callname(cid)}不自觉的发出了声音，脸上也泛起了红潮。`); // :227
    }
  }

  // :232-245 撑破（童装穿不下时的两支）
  if (torn === 1) {
    era.print('新买的');
    era.print(clothtype_main2_text(cid));
    era.print('的上半身被撑破了，');
    era.print(`${chara_callname(cid)}高耸入云的双峰，一览无遗。`);
    chara(cid).stronghold.胸罩状态 = -3; // :237-238
    chara(cid).train.上衣上状态 = -3;
  } else if (torn === 2) {
    era.print('新买的');
    era.print(clothtype_main2_text(cid));
    era.print('的下半身被撑破了，');
    era.print(`${chara_callname(cid)}的屁股暴露人前。`);
    chara(cid).train.上衣下状态 = -3; // :244
  }

  wearing_cloth_able(cid); // :247 CALL WEARING_CLOTH_ABLE（#215 真身）
  era_flag.target = -1; // :249 TARGET = -1
  era_flag.money -= c; // :250 MONEY -= C
  era.set('exflag:4444', (era.get('exflag:4444') || 0) - c); // :251
  await wait(); // :252 WAIT
}

/**
 * @TAILOR_CORE（:61-254）：换装菜单（选中角色后的主循环）。
 *
 * @param {number} arg 角色 ID
 * @returns {Promise<number>} 0（:110-111 与 :249-251 的 RETURN 0）
 */
async function tailor_core(arg) {
  era_flag.target = arg; // :63 TARGET = ARG

  // $INPUT_LOOP_02（:65-127 的绘制与分发 + :232-254 的应用）
  for (;;) {
    era.drawLine(); // :71-72（DRAWLINE + 所持金）
    era.print(`所持金：${era_flag.money}点`); // :72
    era.print(
      `${chara_callname(arg)}现在${get_clothtype_main2(arg, '身穿')}。`,
    ); // :73 %GET_CLOTHTYPE_MAIN2(TARGET,"身穿")%
    // :73-75 是两条 PRINTFORML 逐行相邻（中间那行是空白源码行，不含 PRINTL），
    // 原作这里没有空行
    era.print(`要让${chara_callname(arg)}穿上什么？`); // :75
    era.drawLine(); // :76-78（DRAWLINE + 日常服饰项）
    era.printButton(`- 日常服饰（${CASUAL_PRICE}点）`, 0); // :78
    era.printButton(`- 普通装备（${NORMAL_PRICE}点）`, 1); // :79
    era.printButton('- 其它', 2); // :80
    era.printButton(`- 替换内衣（${UNDERWARE_PRICE}点）`, 3); // :81
    // 原作的 `CFLAG:42` / `TALENT:0` 是单参形态 = **TARGET 的**读数
    // （TAILOR_CORE :63 已置 TARGET = ARG）
    if (
      cflag(arg, 42) === 69 &&
      ((cflag(arg, 40) & 64) === 0 || cflag(arg, 47) > 0)
    ) {
      era.printButton(`- 替换尿布（${DIAPER_PRICE}点）`, 4); // :82-83
    }
    if (
      cflag(arg, 42) === 79 &&
      (cflag(arg, 40) & 64) !== 0 &&
      cflag(arg, 49) === 0 &&
      talent(arg, 0) !== 0
    ) {
      era.printButton('- 扔掉贞操带的钥匙', 5); // :84-85（TALENT:0 = 処女，为真才给）
    }
    era.printButton('- 魔法装备', 7); // :87
    era.printButton('- 武器', 8); // :88
    era.drawLine();
    era.printButton('- 返回', 999); // :90

    const result = await era.input(); // :92

    let picked = null;
    if (result === 0) {
      picked = await tailor_casual(arg); // :94-95
    } else if (result === 1) {
      picked = await tailor_normal(arg); // :96-97
    } else if (result === 2) {
      picked = await tailor_accessory(arg); // :98-99
    } else if (result === 3) {
      picked = await tailor_underware(); // :100-101
    } else if (result === 4 && cflag(arg, 42) === 69) {
      picked = await tailor_diaper(arg); // :102-103
    } else if (
      result === 5 &&
      cflag(arg, 42) === 79 &&
      (cflag(arg, 40) & 64) !== 0 &&
      cflag(arg, 49) === 0 &&
      talent(arg, 0) !== 0 &&
      cflag(arg, 71) === 0
    ) {
      picked = await chastity_key(); // :104-105
    } else if (result === 7) {
      picked = await equip_magic_item(arg); // :106-107
    } else if (result === 8) {
      picked = await equip_magic_weapon(arg); // :108-109
    } else if (result === 999) {
      return 0; // :110-111（返回键）
    } else {
      continue; // :112-113
    }

    // :116-127 四道门（A == 0 / 贞操带锁 / 钱不够 / 顺从不够）——在撑破询问之前
    if (await purchase_guard(arg, picked)) {
      continue;
    }

    // :129-163 童装的撑破判定（【魁梧】/【巨乳】等穿不下童装）
    let torn = 0;
    if (talent(arg, 99) && picked.a === KIND_CHILD) {
      const forced = await confirm_tear(
        `${chara_callname(arg)}应该是穿不下这衣服。`,
      );
      if (forced === false) {
        continue;
      }
      era.print('强行套上的时候，把衣服的下半身撑破啦！'); // :137
      await wait();
      torn = 2; // :140 F = 2
    } else if (
      talent(arg, 100) === 0 &&
      (talent(arg, 114) || talent(arg, 110) || talent(arg, 119)) &&
      picked.a === KIND_CHILD
    ) {
      const forced = await confirm_tear(
        `${chara_callname(arg)}应该是穿不下这衣服。`,
      );
      if (forced === false) {
        continue;
      }
      era.print('强行套上的时候，把衣服的上半身撑破啦！'); // :154
      await wait();
      torn = 1; // :157 F = 1
    }

    await apply_purchase(arg, { ...picked, torn }); // :165-252（应用与收尾）
    return 0; // :247-254（收尾：着衣重算 + TARGET 还原 + 扣款 + RETURN 0）
  }
}

/**
 * 童装撑破的二选一（:131-145 / :148-162 同构的两个循环）。
 * @param {string} prompt
 * @returns {Promise<boolean>} true = 强行套上，false = 作罢（回主菜单）
 */
async function confirm_tear(prompt) {
  for (;;) {
    era.print(prompt);
    era.printButton('- 强行套上', 0); // SHOP_TAILOR.ERB:133
    era.printButton('- 作罢', 1); // SHOP_TAILOR.ERB:134
    const result = await era.input();
    if (result === 0) {
      return true; // F = 1/2
    }
    if (result === 1) {
      return false; // GOTO INPUT_LOOP_02
    }
  }
}

/**
 * @TAILOR_MAIN（:6-59）：服饰店入口。
 *
 * @returns {Promise<number>} 0（:43-46 的 RETURN 0）
 */
async function tailor_main() {
  for (;;) {
    // :20-38 标题与日期
    era.drawLine({ isSolid: true }); // :20-21 CUSTOMDRAWLINE = + 标题
    era.print('服装设计师'); // :21
    era.print('《这里是制作衣装的服饰店》'); // :22
    era.drawLine(); // :23-24（DRAWLINE + PRINTV DAY+1）
    era.print(
      `${era_flag.day_count + 1}日${era_flag.time === 0 ? ' 午前' : ' 午后'}`,
    ); // :24-30
    era.print(`所持金：${era_flag.money}点`); // :32
    era.drawLine(); // :33-34（DRAWLINE + 调整谁的衣装）
    era.print('调整谁的衣装？'); // :34
    era.drawLine(); // :35-36（DRAWLINE + LIFE_LIST_TAILOR）
    life_list_tailor(); // :36 CALL LIFE_LIST_TAILOR
    era.drawLine(); // :37 CUSTOMDRAWLINE ‥
    era.printButton('- 返回', 999); // :38

    const result = await era.input(); // :40
    if (result === 999) {
      return 0; // :42-46
    }
    // :47-54 三道守卫：范围外 / 濒死 / 非待机（均静默回循环头）
    if (result < 1 || !era.getAddedCharacters().includes(result)) {
      continue;
    }
    if ((era.get(`base:${result}:0`) || 0) < 1) {
      continue;
    }
    if (cflag(result, 1) !== 0) {
      continue;
    }
    await tailor_core(result); // :57 CALL TAILOR_CORE(RESULT)
    // :59 RESTART：回到本函数头（重画成员列表）
  }
}

module.exports = {
  ACCESSORY_ITEMS,
  CASUAL_ITEMS,
  CASUAL_PRICE,
  DIAPER_PRICE,
  NORMAL_ITEMS,
  NORMAL_PRICE,
  SPECIAL_ITEMS,
  SPECIAL_PRICE,
  UNDERWARE_PRICE,
  WEAPON_PREFIXES,
  equip_magic_item,
  equip_magic_weapon,
  life_list_tailor,
  tailor_core,
  tailor_main,
};
