/**
 * @file 外观信息式中函数（issue #389，N5）：`%GET_LOOK_INFO(ARG, ARGS)%`。
 *
 * 源: target/ERB/キャラ関数/LOOK.ERB  @GET_LOOK_INFO（:2885-3775，
 *     `#FUNCTIONS` 于 :2886——**返回字符串的式中函数**，见
 *     .agents/skills/emuera-basic-agent-guide 的
 *     references/core-concepts/user-defined-functions.md：`#FUNCTION` 返回
 *     整数、`#FUNCTIONS` 返回字符串，两者都以 RETURNF 结束、不经 CALL 调用
 *     而是直接写在表达式里。全库 48 处调用点全部是 `%GET_LOOK_INFO(…)%` 形态，
 *     `CALL GET_LOOK_INFO` 零处）。
 *
 * 本文件只承载这一个纯计算函数：它被 `ere/chara/look.js`（同源文件的其余
 * 五个函数）与八个外部模块消费，且 **被 ere/dungeon/dungeon-lovers.js 反向
 * 依赖**——LOOK_INFO_LOVE 要用 dungeon-lovers 的 LOVER_NAMES，若两者同处一个
 * 模块即成 require 环（CJS 下先启动的一方拿到空 exports）。拆成叶子模块是
 * 消环的办法，不是分层主张。
 *
 * == 与 kojo-dungeon-bitch-log.js 旧子集的关系（本票的「调用面不留两份」）==
 *
 * #185（H16）在 `ere/kojo/kojo-dungeon-bitch-log.js` 里实现过本函数的 11 个
 * kind 子集（#383/#391 各补过一个）。#389 把那份实现整体搬到这里、补齐其余
 * kind，并让 kojo 侧改成 require——两份实现就此消失，全项目只剩这一份。
 * 子集原有的 11 个 kind 的返回值逐字未变（有测试锁），搬家不搬语义。
 *
 * == 逐条对照源文件时的三处判定 ==
 *
 *   - **"魅力点" CASE 29（:3172-3176）在源里用 PRINT 而非赋值**：原文是
 *     `SIF 男人||扶她 PRINT 自己的鸡鸡` / `SIF 不是两者 PRINT 私处`，
 *     LOCALS 保持空串。式中函数调用 PRINT 在本引擎里没有对应形态（era.print
 *     是异步且会切行），但**两者对调用方的可见效果相同**——调用方一律写
 *     `PRINTFORM %GET_LOOK_INFO(…)%`，PRINT 的内容先落进同一条输出流、空
 *     LOCALS 什么也不补。故本实现直接**返回**该串，与旧子集一致。
 *   - **"种族12"（:3309-3314）源里是 GOTO 两个标号**（`$INFO_种族` :3254 /
 *     `$INFO_种族2` :3286），效果等于按 TALENT:220 二选一递归调用；本实现按
 *     递归写，与旧子集一致。
 *   - **"原种族"（:3674-3703）的 CASEELSE 是 `ARGS = "种族"; RESTART`**
 *     （RESTART = 回到本函数开头重执行，见 control-flow.md）。重入时只改了
 *     ARGS，等价于递归调 "种族" 分支，同样按递归写。
 *
 * == 与源不同的两处等价改写（不影响返回值）==
 *
 *   - `CASE 2 TO 20` / `CASE 20 TO 50` 这类**闭区间重叠**：Emuera 的 CASE 是
 *     先匹配先取，故 20 归前者。here 用 `<=` 链表达同一顺序。
 *   - `TOSTR(v, "$${0}")`（:3307）＝ 字面量 `$` 拼段号，本实现写 `` `$${v}` ``
 *     ——注意 AGENTS.md 的 `${` 转义约定：模板串里 `$$` 才是字面 `$`。
 *
 * == 未落地的旁支（登记，不在本票范围）==
 *
 * 无。本函数全文落地，无存根、无占位。
 */

'use strict';

const era = require('#/era-electron');

/** 语言中立空串：未登记的 kind 与各 CASEELSE 的兜底 */
const ERROR = 'ERROR';

/** 定义时的 kind 名（`ELSEIF ARGS == "<名>"` 的实参；源 :2894 起） */
const KIND = {
  HAIR_COLOR_ALT: '发色(颜色)', // :2894
  HAIR_COLOR: '头发颜色', // :2922
  HAIR_STYLE_STATE: '头发状态', // :2950
  HAIR_LENGTH: '头发长度', // :2967
  HAIR_CUT: '头发修剪方式', // :2978
  HAIR_STYLE: '发型', // :2991
  EYES: '目', // :3020
  EYE_COLOR: '瞳色', // :3041
  LIPS: '唇', // :3058
  BODY: '体型', // :3071
  NIPPLE: '乳头', // :3082
  PUBIC: '阴毛状态', // :3095
  CHARM_POINT: '魅力点', // :3114
  HABIT: '癖', // :3180
  RACE: '种族', // :3253
  RACE2: '种族2', // :3285
  RACE12: '种族12', // :3309
  PREV_JOB: '成为勇者前的生活', // :3315
  HERO_REASON: '成为勇者的契机', // :3390
  PENIS: '阴茎的状态', // :3447
  JOB: '职业', // :3460
  PERSONALITY: '性格', // :3473
  MARRIAGE_HISTORY: '婚史', // :3490
  FAMILY: '家族', // :3562
  ORIGIN_RACE: '原种族', // :3674
  NOW_RACE: '现种族', // :3704
  COMMON_SENSE_BATTLE: '常识改变【战斗】', // :3710
  COMMON_SENSE_DAILY: '常识改变【日常】', // :3739
};

/** 素质下标（yml/Talent.yml 的名字表；源里混用列名与下标，此处统一取下标的字面量） */
const T_扶她 = 121;
const T_男人 = 122;
const T_精英 = 220;
const T_常识改变战斗 = 281;
const T_常识改变日常 = 283;
const T_头发颜色 = 300;
const T_头发状态 = 301;
const T_头发长度 = 302;
const T_头发修剪方式 = 303;
const T_发型 = 304;
const T_目 = 305;
const T_瞳色 = 306;
const T_唇 = 307;
const T_体型 = 308;
const T_乳头 = 309;
const T_阴毛状态 = 310;
const T_魅力点 = 312;
const T_癖 = 313;
const T_种族 = 314;
const T_成为勇者前的生活 = 315;
const T_成为勇者的契机 = 316;
const T_阴茎的状态 = 318;
const T_种族2 = 319;
const T_家族构成 = 320;
const T_原种族 = 321;
const T_现种族 = 322;
const T_父亲种族 = 323;
const T_母亲种族 = 324;

/** 发型长度档（源 :2967-2977 的闭区间） */
const HAIR_LENGTH_SHORT_MAX = 100;
const HAIR_LENGTH_MID_MAX = 200;
const HAIR_LENGTH_LONG_MAX = 300;

/** 体型档（源 :3071-3081） */
const BODY_SLIM_MAX = 100;
const BODY_NORMAL_MAX = 200;
const BODY_PLUMP_MAX = 300;

/** 阴毛状态档（源 :3095-3113） */
const PUBIC_MAX = 500;

/** 结婚对象的性别码（源 :3516-3522/:3527-3533/:3538-3544/:3549-3555 的 `CASE 0,4,8` / `CASE 1,5,7`） */
const HUSBAND_KINDS = [0, 4, 8];
const FUTA_WIFE_KINDS = [1, 5, 7];

/** 家族构成码的位数（源 :3490 起注释的十进制编码） */
const FAMILY_CHILD_DIGITS = [100, 1000];
const FAMILY_SIBLING_DIGITS = [100000, 1000000, 10000000, 100000000];
const FAMILY_MARRIAGE_PLACE = 1000000000;

/** 「职业」扫描的素质区间（源 :3462 `FOR LOCAL, 200, 229`——上界开区间） */
const JOB_RANGE = { start: 200, end: 229 };
/** 「性格」扫描的素质区间（源 :3475 起两段 `FOR … 179` / `… 19`） */
const PERSONALITY_RANGE = { start: 160, end: 179 };
const PERSONALITY_FALLBACK_RANGE = { start: 10, end: 19 };

/**
 * 源 :2894-3774 各 CASE 表的字面量映射（字面量集中在此，逐条带源行号）。
 * 与 Emuera 的 `SELECTCASE`/`CASEELSE` 同构：命中取表、未命中取 fallback。
 */
const HAIR_COLOR_ALT_MAP = {
  1: '金色',
  2: '栗色',
  3: '黑色',
  4: '红色',
  5: '银色',
  6: '蓝色',
  7: '绿色',
  8: '紫色',
  9: '白色',
  10: '暗金色',
  11: '粉色',
}; // :2895-2917

const HAIR_COLOR_MAP = {
  1: '金发',
  2: '栗发',
  3: '黑发',
  4: '红发',
  5: '银发',
  6: '蓝发',
  7: '绿发',
  8: '紫发',
  9: '白发',
  10: '暗金发',
  11: '粉发',
}; // :2923-2944

const HAIR_STATE_MAP = {
  1: '直发',
  2: '卷发',
  3: '内卷发',
  4: '外卷发',
  5: '天然卷',
  6: '大波浪',
}; // :2951-2963

const HAIR_CUT_MAP = { 1: '基本剪法', 2: '齐剪', 3: '层剪', 4: '碎发' }; // :2979-2987

const HAIR_STYLE_MAP = {
  1: '自然',
  2: '中分',
  3: '不均分',
  4: '长束发',
  5: '马尾',
  6: '侧马尾',
  7: '垂发辫',
  8: '双马尾',
  9: '顶束发',
  10: '侧束发',
  11: '鱼骨辫',
  12: '卷发',
}; // :2992-3016

const EYES_MAP = {
  1: '细长眼',
  2: '大眼',
  3: '深邃眼',
  4: '吊眼',
  5: '水汪汪眼',
  6: '标准眼',
  7: '三白眼',
  8: '下垂眼',
}; // :3021-3037

const EYE_COLOR_MAP = {
  1: '蓝色',
  2: '棕色',
  3: '灰色',
  4: '金色',
  5: '红色',
  6: '黑色',
}; // :3042-3054

const LIPS_MAP = { 1: '肉感的', 2: '薄的', 3: '丰润的', 4: '标准' }; // :3059-3067

const NIPPLE_MAP = { 1: '粉红色', 2: '褐色', 3: '标准', 4: '凹陷' }; // :3083-3091

const CHARM_POINT_MAP = {
  1: '皮肤',
  2: '眼角',
  3: '鼻梁',
  4: '嘴角',
  5: '泪痣',
  6: '锁骨',
  7: '小臂',
  8: '手腕',
  9: '手',
  10: '手指',
  11: '肚脐',
  12: '美乳',
  13: '腰线',
  14: '臀部线条',
  15: '腿部线条',
  16: '膝盖',
  17: '脚踝',
  18: '脚跟',
  19: '背脊',
  20: '耳朵',
  21: '性器',
  22: '头发的光泽',
  23: '丰满的屁股',
  24: '长睫毛',
  25: '虎牙',
  26: '眉毛',
  27: '指甲',
  28: '寝癖',
}; // :3115-3171

/** 魅力点 CASE 29（:3172-3176）：男人/扶她看自己的，其余看私处 */
const CHARM_POINT_PENIS = '自己的鸡鸡';
const CHARM_POINT_VULVA = '私处';

const HABIT_MAP = {
  1: '舔嘴唇',
  2: '往后看',
  3: '摸头发',
  4: '用腿夹住手',
  5: '抱手臂',
  6: '手指交握',
  7: '抖腿',
  8: '打拍子',
  9: '仰视对方',
  10: '歪脖子',
  11: '叹气',
  12: '动作夸张',
  13: '频繁眨眼',
  14: '鼓腮',
  15: '咬紧牙关',
  16: '遮住嘴',
  17: '摸耳朵',
  18: '懒散',
  19: '咂嘴',
  20: '咬指甲',
  21: '挠鼻子',
  22: '扶额',
  23: '握拳',
  24: '用手指人',
  25: '说口头禅',
  26: '扭腰',
  27: '闭上一只眼',
  28: '眯眼',
  29: '歪嘴',
  30: '碎碎念',
  31: '总往角落躲',
  32: '估算物体长度',
  33: '说话越说越近',
  34: '舔手背',
}; // :3181-3237

const RACE_MAP = {
  0: '人类',
  1: '精灵',
  2: '狼人',
  3: '吸血鬼',
  4: '无头骑士',
  5: '龙族',
  6: '天使',
  7: '暗精灵',
  8: '堕天使',
  9: '魔族',
  10: '霍比特人',
  11: '矮人',
}; // :3255-3279（"种族" 与 "原种族" :3675-3699 共用同一张表）

const RACE2_MAP = {
  1: '兽人',
  2: '史莱姆',
  3: '昆虫',
  4: '植物',
  5: '触手',
  11: '触手',
  6: '妖精',
  7: '巨人',
  8: '魔族',
  9: '魔族',
  10: '魔兽',
  12: '魔兽',
}; // :3287-3305

const PREV_JOB_MAP = {
  0: '不明',
  1: '学生',
  3: '农民',
  4: '渔民',
  5: '娼妓',
  6: '小偷',
  7: '乞丐',
  8: '贵族',
  9: '贫民',
  10: '守墓人',
  13: '预言家',
  14: '占卜师',
  15: '商人',
  16: '采药人',
  17: '隐士',
  18: '面包师',
  19: '军人',
  20: '奴隶',
  90: '淫乱的产物',
  91: '堕落的结果',
  92: '爱的结晶',
  93: '交欢的副产品',
  94: '魔族的孽种',
}; // :3316-3386 的性别中立档

/** 修道女/巫女/圣女/主妇四档按性别分叉（源 :3336-3340、:3356-3360、:3366-3370、:3378-3382） */
const PREV_JOB_SISTER = [2, '修士', '修女'];
const PREV_JOB_MIKO = [11, '巫者', '巫女'];
const PREV_JOB_SAINT = [12, '圣者', '圣女'];
const PREV_JOB_HOUSEWIFE = [21, '主夫', '主妇'];

const HERO_REASON_MAP = {
  0: '不明',
  1: '命运的引导',
  2: '为了钱',
  3: '受到了上天启示',
  4: '因使命感而热血沸腾',
  5: '对日常感到厌倦',
  6: '经历无尽悲伤后',
  7: '拯救故乡',
  8: '复仇',
  9: '国王的任命',
  10: '赎罪',
  11: '自暴自弃',
  12: '纯属意外',
  13: '被命令了',
  14: '无可奈何',
  15: '测试自己的力量',
  16: '为了和平',
  17: '为了正义',
  18: '梦见自己有所作为',
  19: '获得了力量',
  20: '旅行的结果',
  90: '父母的嘱咐',
  91: '憧憬魔王',
  92: '为了出人头地',
  93: '为了报恩',
  94: '被恶魔诱惑',
}; // :3391-3443

const PENIS_MAP = { 1: '巨根', 2: '短小包茎', 3: '包茎', 4: '马阴茎' }; // :3448-3456

/** 常识改变【战斗】（:3711-3735）：3-11 档源里显式留空，CASEELSE 回「不改变」 */
const COMMON_SENSE_BATTLE_MAP = {
  0: '不改变',
  1: '奉侍战斗',
  2: '跪地求饶',
  3: '',
  4: '',
  5: '',
  6: '',
  7: '',
  8: '',
  9: '',
  10: '',
  11: '',
};
const COMMON_SENSE_BATTLE_DEFAULT = '不改变';

/** 常识改变【日常】（:3740-3764）：同上 */
const COMMON_SENSE_DAILY_MAP = {
  0: '不改变',
  1: '服侍乞丐',
  2: '野外露出',
  3: '痴态公开',
  4: '公众便器',
  5: '兽奸狂热',
  6: '',
  7: '',
  8: '',
  9: '',
  10: '',
  11: '',
};
const COMMON_SENSE_DAILY_DEFAULT = '不改变';

/**
 * 角色的素质读数（`TALENT:ARG:n`；未声明的序号引擎返回 undefined，按 0 兜底）。
 * @param {number} cid 角色 ID
 * @param {number} idx 素质下标
 * @returns {number}
 */
function talent(cid, idx) {
  return era.get(`talent:${cid}:${idx}`) || 0;
}

/**
 * `%TALENTNAME:n%` 的等价物（引擎静态表 talent 的列名）。
 * @param {number} idx 素质下标
 * @returns {string}
 */
function talentname(idx) {
  return era.get(`talentname:${idx}`) ?? '';
}

/**
 * `%ITEMNAME:n%` 的等价物（引擎静态表 item 的列名）。
 * @param {number} idx 物品下标
 * @returns {string}
 */
function itemname(idx) {
  return era.get(`itemname:${idx}`) ?? '';
}

/**
 * 闭环区间判定（`INRANGE(v, a, b)`）。
 * @param {number} v 值
 * @param {number} low 下界
 * @param {number} high 上界
 * @returns {boolean}
 */
function inrange(v, low, high) {
  return v >= low && v <= high;
}

/**
 * 「婚史」族与「家族」族共用的配偶称呼（源 :3516-3522/:3527-3533/:3538-3544/:3549-3555 →
 * :3599-3601/:3606-3612/:3615-3621 三处 SELECTCASE 逐字相同）。
 * @param {number} kind 配偶性别码（整数部分取 LOCAL:2 / 1000000000）
 * @returns {string}
 */
function spouse_word(kind) {
  if (HUSBAND_KINDS.includes(kind)) return '丈夫';
  if (FUTA_WIFE_KINDS.includes(kind)) return '扶她妻子';
  return '妻子';
}

/**
 * 「家族」的兄弟姐妹/子女段（源 :3623 起七段同构：一位数=1 时不带数量，
 * >1 时 `TOSTR(LOCAL:1, " 娘x{0}")` 式的带数量写法）。
 * @param {number} count 该类的数量（家族构成码的一位）
 * @param {string} single 数量为 1 时的后缀
 * @param {string} label 数量 >1 时的类别字
 * @returns {string}
 */
function family_suffix(count, single, label) {
  if (count === 1) return ` ${single}`;
  if (count > 0) return ` ${label}x${count}`;
  return '';
}

/**
 * `%GET_LOOK_INFO(cid, kind)%`（源 @GET_LOOK_INFO :2885-3775，#FUNCTIONS）。
 *
 * 调用点一律是式中函数形态（`%GET_LOOK_INFO(…)%` 写在表达式里），本实现
 * 是纯函数：只有读取与字符串拼接，无输出、无状态写入。
 *
 * @param {number} cid 角色 ID（源 ARG）
 * @param {string} kind 参照内容（源 ARGS；各分支名见本文件 KIND 表）
 * @returns {string} 对应文字；未登记的 kind 返回空串（源 :3772-3773 的 ELSE）
 */
function get_look_info(cid, kind) {
  switch (kind) {
    case KIND.HAIR_COLOR_ALT:
      // :2894-2921 发色（形容词形；与 "头发颜色" 是两个 kind，源里各一张表）
      return HAIR_COLOR_ALT_MAP[talent(cid, T_头发颜色)] ?? '黑色';
    case KIND.HAIR_COLOR:
      // :2922-2948
      return HAIR_COLOR_MAP[talent(cid, T_头发颜色)] ?? '黑发';
    case KIND.HAIR_STYLE_STATE:
      // :2950-2966
      return HAIR_STATE_MAP[talent(cid, T_头发状态)] ?? ERROR;
    case KIND.HAIR_LENGTH: {
      // :2967-2977 `CASE 1 TO 100` / `101 TO 200` / `201 TO 300`
      const v = talent(cid, T_头发长度);
      if (v >= 1 && v <= HAIR_LENGTH_SHORT_MAX) return '短';
      if (v >= 101 && v <= HAIR_LENGTH_MID_MAX) return '半长';
      if (v >= 201 && v <= HAIR_LENGTH_LONG_MAX) return '长';
      return ERROR;
    }
    case KIND.HAIR_CUT:
      // :2978-2990
      return HAIR_CUT_MAP[talent(cid, T_头发修剪方式)] ?? ERROR;
    case KIND.HAIR_STYLE:
      // :2991-3019
      return HAIR_STYLE_MAP[talent(cid, T_发型)] ?? ERROR;
    case KIND.EYES:
      // :3020-3040
      return EYES_MAP[talent(cid, T_目)] ?? ERROR;
    case KIND.EYE_COLOR:
      // :3041-3057
      return EYE_COLOR_MAP[talent(cid, T_瞳色)] ?? ERROR;
    case KIND.LIPS:
      // :3058-3070
      return LIPS_MAP[talent(cid, T_唇)] ?? ERROR;
    case KIND.BODY: {
      // :3071-3081
      const v = talent(cid, T_体型);
      if (v >= 1 && v <= BODY_SLIM_MAX) return '纤细';
      if (v >= 101 && v <= BODY_NORMAL_MAX) return '标准';
      if (v >= 201 && v <= BODY_PLUMP_MAX) return '丰满';
      return ERROR;
    }
    case KIND.NIPPLE:
      // :3082-3094
      return NIPPLE_MAP[talent(cid, T_乳头)] ?? ERROR;
    case KIND.PUBIC: {
      // :3095-3113 `CASE 2 TO 20` 等六段闭区间（20/50/…/200 归前一段）
      const v = talent(cid, T_阴毛状态);
      if (v === 1) return '白虎';
      if (v >= 2 && v <= 20) return '胎毛';
      if (v > 20 && v <= 50) return '新长的';
      if (v > 50 && v <= 100) return '稀薄';
      if (v > 100 && v <= 150) return '标准';
      if (v > 150 && v <= 200) return '浓密';
      if (v > 200 && v <= PUBIC_MAX) return '硬毛';
      return ERROR;
    }
    case KIND.CHARM_POINT: {
      // :3114-3179
      const v = talent(cid, T_魅力点);
      if (v === 29) {
        // :3172-3176 CASE 29 是源里唯一以 PRINT 出值的分支（本文件头已判等价）
        return talent(cid, T_扶她) === 1 || talent(cid, T_男人) === 1
          ? CHARM_POINT_PENIS
          : CHARM_POINT_VULVA;
      }
      return CHARM_POINT_MAP[v] ?? ERROR;
    }
    case KIND.HABIT:
      // :3180-3252
      return HABIT_MAP[talent(cid, T_癖)] ?? ERROR;
    case KIND.RACE:
      // :3253-3284（标号 $INFO_种族 :3254）
      return RACE_MAP[talent(cid, T_种族)] ?? ERROR;
    case KIND.RACE2: {
      // :3285-3308（标号 $INFO_种族2 :3286）
      const v = talent(cid, T_种族2);
      return RACE2_MAP[v] ?? `$${v}`; // CASEELSE = TOSTR(v, "$${0}")
    }
    case KIND.RACE12:
      // :3309-3314 TALENT:220 为真走 种族2，否则走 种族
      return get_look_info(cid, talent(cid, T_精英) ? KIND.RACE2 : KIND.RACE);
    case KIND.PREV_JOB: {
      // :3315-3389：四档按性别分叉（男人走前一列）
      const v = talent(cid, T_成为勇者前的生活);
      const male = talent(cid, T_男人) !== 0;
      for (const [code, male_word, female_word] of [
        PREV_JOB_SISTER,
        PREV_JOB_MIKO,
        PREV_JOB_SAINT,
        PREV_JOB_HOUSEWIFE,
      ]) {
        if (v === code) return male ? male_word : female_word;
      }
      return PREV_JOB_MAP[v] ?? ERROR;
    }
    case KIND.HERO_REASON:
      // :3390-3446
      return HERO_REASON_MAP[talent(cid, T_成为勇者的契机)] ?? ERROR;
    case KIND.PENIS:
      // :3447-3459：CASEELSE 是「普通」（不是 ERROR）
      return PENIS_MAP[talent(cid, T_阴茎的状态)] ?? '普通';
    case KIND.JOB: {
      // :3460-3472：扫 200..228 取**最后一个**真值档
      let found = -1;
      for (let tc = JOB_RANGE.start; tc < JOB_RANGE.end; tc += 1) {
        if (talent(cid, tc)) found = tc;
      }
      if (found >= 0) return talentname(found);
      if (cid === 0) return '魔王';
      return '无';
    }
    case KIND.PERSONALITY: {
      // :3473-3489：先扫 160..178，全空再扫 10..18；都取最后一个真值档
      let found = -1;
      for (
        let tc = PERSONALITY_RANGE.start;
        tc < PERSONALITY_RANGE.end;
        tc += 1
      ) {
        if (talent(cid, tc)) found = tc;
      }
      if (found < 0) {
        for (
          let tc = PERSONALITY_FALLBACK_RANGE.start;
          tc < PERSONALITY_FALLBACK_RANGE.end;
          tc += 1
        ) {
          if (talent(cid, tc)) found = tc;
        }
      }
      return found >= 0 ? talentname(found) : '不明';
    }
    case KIND.MARRIAGE_HISTORY: {
      // :3490-3561（TALENT:320 压缩家族码；与 CHARA_MARRIGE_BEFORE 同源不同式）
      const family = talent(cid, T_家族构成);
      if (family % 10 === 0 && family !== 0) return '婚史保密';
      if (family === 0) return '无';
      const marriage = Math.trunc((family % 100000) / 10000);
      const kind = Math.trunc((family % 10000000000) / FAMILY_MARRIAGE_PLACE);
      switch (marriage) {
        case 0:
          return `${(era.get(`cflag:${cid}:601`) || 0) !== 0 ? '原' : ''}未婚`;
        case 1:
          return `已与${spouse_word(kind)}结婚`;
        case 2:
          return `已与原${spouse_word(kind)}离婚`;
        case 3:
          return `已与原${spouse_word(kind)}复婚`;
        case 4:
          return `已与原${spouse_word(kind)}离婚后重新结婚`;
        case 5:
          return '未亡人';
        default:
          return '秘密';
      }
    }
    case KIND.FAMILY: {
      // :3562-3673
      const father = talent(cid, T_父亲种族);
      const mother = talent(cid, T_母亲种族);
      if (father > 0 && mother > 0) {
        // :3564-3587 双亲指定（>1000 是素质、否则是物品图鉴号）
        const parent_word = (code, suffix) => {
          if (code > 1000) return `${talentname(code - 1000)}${suffix}`;
          return `${itemname(code)}${suffix}`;
        };
        return (
          parent_word(father, '的父亲，') + parent_word(mother, '的母亲，')
        );
      }
      const family = talent(cid, T_家族构成);
      if (family % 10 === 0) return '家族保密';
      let out = '';
      const marriage = Math.trunc(family / 10000) % 10;
      const kind = Math.trunc(family / FAMILY_MARRIAGE_PLACE) % 10;
      // :3599-3601-3621 夫の有無（LOCAL:1 == 1 与 == 3 两支同体）
      if (marriage === 1 || marriage === 3) out += spouse_word(kind);
      // :3623-3672 娘/儿/姊/兄/妹/弟六段，位序见文件头注释的十进制编码
      const names = [
        ['娘', '娘', FAMILY_CHILD_DIGITS[0]],
        ['儿', '儿', FAMILY_CHILD_DIGITS[1]],
        ['姊', '姊', FAMILY_SIBLING_DIGITS[0]],
        ['兄', '兄', FAMILY_SIBLING_DIGITS[1]],
        ['妹', '妹', FAMILY_SIBLING_DIGITS[2]],
        ['弟', '弟', FAMILY_SIBLING_DIGITS[3]],
      ];
      for (const [single, label, place] of names) {
        out += family_suffix(Math.trunc(family / place) % 10, single, label);
      }
      return out === '' ? '孤身一人' : out; // :3672-3673
    }
    case KIND.ORIGIN_RACE:
      // :3674-3703：CASEELSE 是 `ARGS = "种族"; RESTART`（本文件头已判等价）
      return RACE_MAP[talent(cid, T_原种族)] ?? get_look_info(cid, KIND.RACE);
    case KIND.NOW_RACE: {
      // :3704-3709
      const v = talent(cid, T_现种族);
      return inrange(v, 100, 220) ? itemname(v) : ERROR;
    }
    case KIND.COMMON_SENSE_BATTLE:
      // :3710-3738
      return (
        COMMON_SENSE_BATTLE_MAP[talent(cid, T_常识改变战斗)] ??
        COMMON_SENSE_BATTLE_DEFAULT
      );
    case KIND.COMMON_SENSE_DAILY:
      // :3739-3765
      return (
        COMMON_SENSE_DAILY_MAP[talent(cid, T_常识改变日常)] ??
        COMMON_SENSE_DAILY_DEFAULT
      );
    default:
      // :3772-3773 ELSE → LOCALS =（空串）
      return '';
  }
}

module.exports = {
  KIND,
  get_look_info,
};
