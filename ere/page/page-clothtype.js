/**
 * @file 服装类型的显示串构造：clothtype_text / clothtype_main_text /
 * clothtype_main2_text / clothtype_special_text
 * （issue #215 J5；PRINT_/GET_ 分法见 #106 决定三：PRINT_ → ere/page/，
 * GET_ → ere/system/cloth-lookup.js）。两版共用一份名字表，表定义在
 * ere/system/cloth-lookup.js，本模块直接取用；两版出口只在未知编号的
 * 缺省上分叉——main2 两版都回「服」，special 本版回空串、GET 版回
 * 'ERROR' 哨兵。
 *
 * == 出口形式（equip-print.js 的「两种出口」同款决定） ==
 *
 * 全部调用点都是**行内嵌**——状态画面的【…】包裹（page-train.js）、
 * 侍奉指令的「隔着…、」前缀（com-caress.js）、事件文本与外观信息行的
 * 句中嵌入（event-beforetrain/autotrain/nextday/nextday-pillory、
 * components/chara-appearance.js）。
 * 引擎的 era.print 每次调用即结束一行，共一行的输出必须由调用方合成
 * 一次调用——故本模块四个出口一律**返回串**（monster_name 的同款改法），
 * 无整行打印出口（独立整行调用点出现时再补，equip-print 先例）。
 * #106「无 GET_ 版本的两个不预先提取」照办：clothtype_text 与
 * clothtype_main_text 在此实现，不拆成 GET_ + 打印。
 */

'use strict';

const era = require('#/era-electron');

const { MAIN2_TABLE, SPECIAL_TABLE } = require('#/system/cloth-lookup');

/** CFLAG:40（着衣状态位域）的读数缺省处理（未声明下标 undefined → 0，#13） */
function worn_bits(cid) {
  return era.get(`cflag:${cid}:40`) || 0;
}

/** CFLAG:41（上衣类型）的读数缺省处理 */
function main_type(cid) {
  return era.get(`cflag:${cid}:41`) || 0;
}

/** CFLAG:42（特别服装类型）的读数缺省处理 */
function special_type(cid) {
  return era.get(`cflag:${cid}:42`) || 0;
}

/** TALENT 读数缺省处理 */
function talent(cid, idx) {
  return era.get(`talent:${cid}:${idx}`) || 0;
}

/**
 * clothtype_special_text：特别服装名。未知编号**无输出**
 * （表外编号不进任何分支）——ere 以空串对应。名字表与 GET 版共用
 * （ere/system/cloth-lookup.js 的 SPECIAL_TABLE）。
 * @param {number} cid 角色 ID
 * @returns {string}
 */
function clothtype_special_text(cid) {
  return SPECIAL_TABLE[special_type(cid)] ?? '';
}

/**
 * clothtype_main2_text：上衣下类型名。未知编号 →「服」（缺省分支）。
 * 名字表与 GET 版共用（ere/system/cloth-lookup.js 的 MAIN2_TABLE）。
 * @param {number} cid 角色 ID
 * @returns {string}
 */
function clothtype_main2_text(cid) {
  return MAIN2_TABLE[main_type(cid)] ?? '服';
}

/**
 * 乳房可见性的判定（TALENT:122 男人 / 116 绝壁 / 109 贫乳 / 132 幼稚）：
 * 非男人、非绝壁、且贫乳与幼稚至少一项为 0 时「乳房外露」，否则
 * 「上半身裸露」。
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
 * clothtype_main_text：基本服装的整体状态句。
 * @param {number} cid 角色 ID
 * @returns {string}
 */
function clothtype_main_text(cid) {
  const type = main_type(cid);
  const bits = worn_bits(cid);

  // ふんどし
  if (type === 192 && bits & 16) {
    return '只穿一条兜裆布';
  }
  // 体操服＆运动短裤（109）的半脱两态
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
  // 全身タイプ（201-300）的半脱两态
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
  // 通常の衣服与内衣以下各态
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
 * clothtype_text：使用中的着衣表示（状态画面等的【…】内嵌）。
 * @param {number} cid 角色 ID
 * @returns {string}
 */
function clothtype_text(cid) {
  // 着衣設定を使ってない場合（FLAG:37 = 0）或无基本服装 → 全裸
  if ((era.get('flag:37') || 0) === 0 || main_type(cid) === 0) {
    return '全裸';
  }
  // 史莱姆特装（CFLAG:42 == 11 且着装位 64）
  if (special_type(cid) === 11 && worn_bits(cid) & 64) {
    return '被史莱姆包围着';
  }
  // 基本服装 + 特别服装（穿戴着…的模样）
  let out = clothtype_main_text(cid);
  if (special_type(cid)) {
    out += `穿戴着${clothtype_special_text(cid)}的模样`;
  }
  return out;
}

module.exports = {
  clothtype_main2_text,
  clothtype_main_text,
  clothtype_special_text,
  clothtype_text,
};
