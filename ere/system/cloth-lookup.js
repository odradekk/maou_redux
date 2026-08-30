/**
 * @file 服装类型的取串函数：@GET_CLOTHTYPE_MAIN2 与 @GET_CLOTHTYPE_SPECIAL
 * （issue #215 J5；PRINT_/GET_ 分法见 #106 裁定三：GET_ → ere/system/，
 * PRINT_ → ere/page/page-clothtype.js，两处不共享表——原作自己就是两份
 * 有差异的拷贝，见下）。
 *
 * 源: target/ERB/其他/FUNC_CLOTH.ERB  @GET_CLOTHTYPE_MAIN2（:707-888）
 *     target/ERB/其他/FUNC_CLOTH.ERB  @GET_CLOTHTYPE_SPECIAL（:998-1109）
 *
 * == Emuera 内联 PRINT 习语的 ere 等价物 ==
 *
 * 原作 @GET_CLOTHTYPE_MAIN2 的 CASE 分支全部用 `PRINT`（不赋 LOCALS），
 * 尾部 `RETURNF L_VERB + LOCALS` 返回的其实是动词 + 空串——名字靠 PRINT
 * 副作用在 PRINTFORM 的 %...% 求值中途落进当前行（Emuera 的 PRINT 追加
 * 行缓冲、不换行；黄金样本 train-natural:122 的「隔着紧身衣＆裙甲、…」
 * 一行内三段 PRINT 拼接是直接证据）。ere 引擎的 era.print 每次调用即结束
 * 一行，内联拼接必须由调用方合成一次输出——故 ere 侧取值函数直接返回
 * 名字串（ere/dungeon/monster-data.js 的 monster_name 同款改法：原作
 * PRINT、ere 返回串供调用方并入一次 era.print）。
 *
 * 由此动词参数的渲染序原样保留：原作渲染序是「名字（PRINT 副作用）→
 * 动词（RETURNF 值）」，即 %GET_CLOTHTYPE_MAIN2(TARGET,"身穿")% 渲染为
 * 「紧身衣＆裙甲身穿」而非「身穿紧身衣＆裙甲」。当前全库带参调用只在
 * SHOP_TAILOR.ERB（:73/:168/:176，阶段 5），届时以实机核对为准。
 *
 * == 与 PRINT 版的两处表差（1:1 保留，不做合并重构） ==
 *
 * - @GET_CLOTHTYPE_MAIN2 缺 CASE 9（胸甲＆透视裙子）：PRINT 版有，GET 版
 *   落 CASEELSE「服」——两函数是独立拷贝（GET 版头部注着 ;REF），差异
 *   原样登记进 #14（原作缺陷第若干批），ere 不合并两张表。
 * - @GET_CLOTHTYPE_SPECIAL 的 CASE 98/99 用 PRINT 不赋 LOCALS，且文本是
 *   未汉化的繁体（「神秘的導尿管」「附加導尿管神秘的貞操帯」；PRINT 版
 *   是简体「神秘的尿道导管」「附有神秘尿道导管的贞操带」）。ere 侧按
 *   #60（玩家可见文本一律简体）取 PRINT 版的简体名；繁体残留与 PRINT/
 *   LOCALS 混用两处均登记 #14。
 */

'use strict';

const era = require('#/era-electron');

/** CFLAG:41（上衣类型）的读数兜底（未声明下标 undefined → 0，#13） */
function cloth_main_type(cid) {
  return era.get(`cflag:${cid}:41`) || 0;
}

/** CFLAG:42（特别服装类型）的读数兜底 */
function cloth_special_type(cid) {
  return era.get(`cflag:${cid}:42`) || 0;
}

/**
 * @GET_CLOTHTYPE_MAIN2 的名字表（:716-886 逐字；**缺 CASE 9**——见文件头，
 * 9 号落 CASEELSE「服」，与 PRINT 版的差异 1:1 保留）。键 = CFLAG:41。
 */
const MAIN2_TABLE = {
  0: '全裸',
  1: '日常服装',
  2: '护胸＆裙甲',
  3: '锁甲',
  4: '皮甲＆裙甲',
  5: '紧身衣＆裙甲',
  6: '胸甲＆裙子',
  7: '尖刺铠＆裙子',
  8: '乳贴＆迷你短裙铠甲',
  17: '高中制服',
  18: '初中制服',
  19: '水手服',
  20: '私立贵族学院制服',
  21: '西装',
  22: '童装',
  23: '名牌服装',
  24: '护士服',
  25: '女性用军服',
  26: '女侍制服',
  27: '便利店制服',
  28: '事务员制服',
  29: '岛屿女孩服装',
  30: '演出服',
  31: '运动服',
  32: '丧服',
  33: '拉拉队服',
  34: '网球服',
  35: '女警服',
  101: '日常服装',
  102: '狩衣',
  103: '冒险服',
  104: '巫女装束',
  105: '骑士铠',
  106: '军服',
  108: '护胸＆短裙式护甲',
  109: '体操服＆运动短裤',
  110: '忍者装束',
  111: '胸甲＆南瓜裙',
  112: '骑马服',
  113: '冒险服＆丁字裤',
  114: '袒胸露乳的巫女装',
  115: '暴露的女忍者装',
  116: '胸甲＆丁字裤',
  120: '滑雪服',
  122: '童装',
  131: '睡衣',
  191: '超小比基尼',
  192: '兜裆布',
  193: '比基尼铠甲',
  194: '性感内衣',
  195: '梦魔式比基尼',
  196: '分体泳装',
  201: '连衣裙',
  202: '和服',
  203: '妓女裙装',
  204: '浴衣',
  205: '孕妇装',
  206: '长袍',
  207: '神官服',
  208: '晚礼服',
  209: '女仆装',
  210: '挂满避孕套的妓女服装',
  211: '淫荡暴露的神官服',
  212: '露出乳头与私处的紧身衣',
  213: '挂满避孕套的圣女服',
  214: '旗袍',
  221: '幼稚园服',
  222: '幼儿连衣裙',
  240: '婚礼裙装',
  241: '拘束衣',
  251: '紧身护甲',
  252: '全覆式护甲',
  253: '混沌护甲',
  254: '兔女郎装',
  291: '学校泳装',
  292: '贴身甲',
  293: '吊带装',
  294: '恶魔紧身衣',
  295: '连身泳装',
  [-1]: '内衣',
};

/**
 * @GET_CLOTHTYPE_SPECIAL 的名字表（:1006-1107 逐字；98/99 按文件头裁定
 * 取 PRINT 版的简体名）。键 = CFLAG:42。
 */
const SPECIAL_TABLE = {
  1: '围裙',
  2: '大衣',
  3: '白大褂',
  4: '男装衬衣',
  10: '颜色朴素的背心',
  11: '史莱姆',
  12: '斗篷',
  13: '长袍',
  51: '拉拉队彩球',
  52: '护额',
  53: '护士帽',
  54: '女警帽',
  55: '牛仔帽',
  56: '土著头饰',
  57: '腕带',
  58: '串珠手环',
  59: '长手套',
  60: '阶级章',
  61: '名牌',
  62: '蝴蝶结',
  69: '尿布',
  71: '狗项圈',
  72: '龟甲缚',
  73: '牛铃铛＆鼻环',
  74: '手铐',
  75: '脚镣',
  76: '颈枷',
  77: '涂鸦',
  78: '魔法刺青',
  79: '贞操带',
  80: '绳印',
  81: '宝冠',
  82: '发簪',
  83: '眼镜',
  84: '太阳镜',
  85: '护身符',
  86: '银手镯',
  87: '银吊坠',
  88: '珍珠项链',
  89: '勾玉项链',
  90: '项链',
  91: '头环',
  92: '戒指',
  98: '神秘的尿道导管',
  99: '附有神秘尿道导管的贞操带',
  101: '黑丝袜',
};

/**
 * @GET_CLOTHTYPE_MAIN2（:707-888）。渲染序「名字 → 动词」是原作行为
 * （文件头「内联 PRINT 习语」节），动词缺省空串。
 * @param {number} cid 角色 ID（原作 L_A，缺省 TARGET 的显式化）
 * @param {string} [verb] 衣服前的动词（原作 L_VERB；渲染在名字之后）
 * @returns {string} 服装名（未知编号 →「服」，CASEELSE :884-885）
 */
function get_clothtype_main2(cid, verb = '') {
  const name = MAIN2_TABLE[cloth_main_type(cid)] ?? '服';
  return name + verb;
}

/**
 * @GET_CLOTHTYPE_SPECIAL（:998-1109）。
 * @param {number} cid 角色 ID（原作 L_A，缺省 TARGET 的显式化）
 * @returns {string} 特别服装名（未知编号 → 'ERROR'，CASEELSE :1105-1106
 *   的 RETURNF "ERROR" 哨兵 1:1 保留——AFTERTRAIN_CLOTH 等消费方以空串
 *   判定，ERROR 与未装备的区分由调用方自理）
 */
function get_clothtype_special(cid) {
  return SPECIAL_TABLE[cloth_special_type(cid)] ?? 'ERROR';
}

module.exports = {
  MAIN2_TABLE,
  SPECIAL_TABLE,
  get_clothtype_main2,
  get_clothtype_special,
};
