/**
 * @file 服装类型的显示串构造：@PRINT_CLOTHTYPE / _MAIN / _MAIN2 / _SPECIAL
 * （issue #215 J5；PRINT_/GET_ 分法见 #106 裁定三：PRINT_ → ere/page/，
 * GET_ → ere/system/cloth-lookup.js，两处不共享表——原作就是两份有差异
 * 的拷贝，MAIN2 缺 CASE 9、SPECIAL 的 98/99 文本不同，见 cloth-lookup.js
 * 文件头与 #14 登记）。
 *
 * 源: target/ERB/其他/FUNC_CLOTH.ERB  @PRINT_CLOTHTYPE（:35-58）
 *     target/ERB/其他/FUNC_CLOTH.ERB  @PRINT_CLOTHTYPE_MAIN（:61-156）
 *     target/ERB/其他/FUNC_CLOTH.ERB  @PRINT_CLOTHTYPE_MAIN2（:530-703）
 *     target/ERB/其他/FUNC_CLOTH.ERB  @PRINT_CLOTHTYPE_SPECIAL（:892-994）
 *
 * == 出口形态（equip-print.js 的「两种出口」同款裁定） ==
 *
 * 原作四个函数全用 PRINT（追加行缓冲、不换行），全部调用点都是**行内嵌**
 * ——SHOW_STATUS 的【…】包裹（TRAIN_MAIN.ERB:88-90）、TRAIN_MESSAGE_B 的
 * 「隔着…、」前缀（EVENT_TRAIN_MESSAGE_B.ERB:29-33）、EVENT_BEFORETRAIN
 * 的句中（:74-96）。ere 引擎每次 print 调用即结束一行，共一行的输出必须
 * 由调用方合成一次调用——故本模块四个出口一律**返回串**（monster_name
 * 的同款改法），无整行打印出口（独立整行调用点出现时再补，equip-print
 * 先例）。#106「无 GET_ 版本的两个不预先提取」照办：@PRINT_CLOTHTYPE 与
 * _MAIN 在此 1:1 落地，不拆成 GET_ + 打印。
 */

'use strict';

const era = require('#/era-electron');

/** CFLAG:40（着衣状态位域）的读数兜底（未声明下标 undefined → 0，#13） */
function worn_bits(cid) {
  return era.get(`cflag:${cid}:40`) || 0;
}

/** CFLAG:41（上衣类型）的读数兜底 */
function main_type(cid) {
  return era.get(`cflag:${cid}:41`) || 0;
}

/** CFLAG:42（特别服装类型）的读数兜底 */
function special_type(cid) {
  return era.get(`cflag:${cid}:42`) || 0;
}

/** TALENT 读数兜底 */
function talent(cid, idx) {
  return era.get(`talent:${cid}:${idx}`) || 0;
}

/**
 * @PRINT_CLOTHTYPE_MAIN2 的名字表（:531-703 逐字；与 GET 版的差异是
 * **本表有 CASE 9**（胸甲＆透视裙子）——两份表不合并，1:1 各自落地）。
 * 键 = CFLAG:41。
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
  9: '胸甲＆透视裙子',
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
 * @PRINT_CLOTHTYPE_SPECIAL 的名字表（:894-992 逐字；98/99 是简体形
 * ——GET 版同两号是繁体残留，ere 统一取本表的简体，#60）。键 = CFLAG:42。
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
 * @PRINT_CLOTHTYPE_SPECIAL（:892-994）：特别服装名。未知编号**无输出**
 * （原作无 CASEELSE，ENDIF 直接结束）——ere 以空串对应。
 * @param {number} cid 角色 ID
 * @returns {string}
 */
function clothtype_special_text(cid) {
  return SPECIAL_TABLE[special_type(cid)] ?? '';
}

/**
 * @PRINT_CLOTHTYPE_MAIN2（:530-703）：上衣下类型名。未知编号 →「服」
 * （:701-702 ELSE）。
 * @param {number} cid 角色 ID
 * @returns {string}
 */
function clothtype_main2_text(cid) {
  return MAIN2_TABLE[main_type(cid)] ?? '服';
}

/**
 * 乳房可见性的判定（:102 与 :126 共用的条件，TALENT:122 男人 /
 * 116 绝壁 / 109 贫乳 / 132 幼稚）：非男人、非绝壁、且贫乳与幼稚
 * 至少一项为 0 时「乳房外露」，否则「上半身裸露」。
 * @param {number} cid 角色 ID
 * @returns {boolean}
 */
function breasts_exposed(cid) {
  return (
    talent(cid, 122) === 0 &&
    talent(cid, 116) === 0 &&
    (talent(cid, 109) === 0 || talent(cid, 132) === 0)
  );
}

/**
 * @PRINT_CLOTHTYPE_MAIN（:61-156）：基本服装的整体形态句。
 * @param {number} cid 角色 ID
 * @returns {string}
 */
function clothtype_main_text(cid) {
  const type = main_type(cid);
  const bits = worn_bits(cid);

  // :63-65 ふんどし
  if (type === 192 && bits & 16) {
    return '只穿一条兜裆布';
  }
  // :67-83 体操服＆运动短裤（109）的半脱两态
  if (type === 109) {
    if (bits & 4 && (bits & 24) === 0) {
      // 只穿上身的体操服，+ 内裤有无
      return `只穿上身的体操服，${
        bits & 1 ? '内裤完全暴露出来' : '下半身裸露'
      }`;
    }
    if ((bits & 4) === 0 && bits & 24) {
      // 运动短裤 + 胸罩有无
      return bits & 2 ? '只穿运动短裤和胸罩' : '只穿一条运动短裤';
    }
  }
  // :86-110 全身タイプ（201-300）的半脱两态
  if (type >= 201 && type <= 300) {
    if (bits & 4 && (bits & 24) === 0) {
      // 下半身被撕破了，
      return `${clothtype_main2_text(cid)}的下半身被撕破了，${
        bits & 1 ? '内裤完全暴露出来' : '下半身裸露'
      }`;
    }
    if ((bits & 4) === 0 && bits & 24) {
      // 前襟撕裂了，+ 胸罩/乳房/裸上半身
      const upper =
        bits & 2
          ? '上身只穿着胸罩'
          : breasts_exposed(cid)
            ? '乳房外露'
            : '上半身裸露';
      return `${clothtype_main2_text(cid)}的前襟撕裂了，${upper}`;
    }
  }
  // :112-154 通常の衣服与内衣以下各态
  if (bits & 28) {
    if (bits & 4 && (bits & 24) === 0) {
      // 只穿着上衣，+ 内裤有无
      return `只穿着${clothtype_main2_text(cid)}的上衣，${
        bits & 1 ? '下身只有一条内裤' : '下半身裸露'
      }`;
    }
    if ((bits & 4) === 0 && bits & 24) {
      // 穿着（胸罩/乳房外露/上半身裸露），+ 下装
      const upper =
        bits & 2
          ? '穿着胸罩，'
          : breasts_exposed(cid)
            ? '乳房外露，'
            : '上半身裸露，';
      const lower = type >= 1 && type <= 100 ? '的裙子' : '的下身';
      return `${upper}穿着${clothtype_main2_text(cid)}${lower}`;
    }
    // 上下齐全：名 +（无特别服装时的）的姿态
    return `${clothtype_main2_text(cid)}${(bits & 64) === 0 ? '的姿态' : ''}`;
  }
  if (bits & 1 && bits & 2) {
    return `内衣${(bits & 64) === 0 ? '姿态' : ''}`;
  }
  if (bits & 1) {
    return '只穿着一条内裤';
  }
  if (bits & 2) {
    return '只穿着胸罩，下身裸露';
  }
  return '全裸';
}

/**
 * @PRINT_CLOTHTYPE（:35-58）：使用中的着衣表示（SHOW_STATUS 的【…】等）。
 * @param {number} cid 角色 ID
 * @returns {string}
 */
function clothtype_text(cid) {
  // :37-40 着衣設定を使ってない場合（FLAG:37 = 0）或无基本服装 → 全裸
  if ((era.get('flag:37') || 0) === 0 || main_type(cid) === 0) {
    return '全裸';
  }
  // :43-46 史莱姆特装（CFLAG:42 == 11 且着装位 64）
  if (special_type(cid) === 11 && worn_bits(cid) & 64) {
    return '被史莱姆包围着';
  }
  // :49 基本コスチューム + :52-56 特別コスチューム（穿戴着…的模样）
  let out = clothtype_main_text(cid);
  if (special_type(cid)) {
    out += `穿戴着${clothtype_special_text(cid)}的模样`;
  }
  return out;
}

module.exports = {
  MAIN2_TABLE,
  SPECIAL_TABLE,
  clothtype_main2_text,
  clothtype_main_text,
  clothtype_special_text,
  clothtype_text,
};
