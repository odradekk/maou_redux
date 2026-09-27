/**
 * @file 装备名称显示：print_equiptype_weapon、print_equiptype_ring。
 *
 * 名称与色彩是数据（ere/data/equip-database.js 的名称表），本文件只承载
 * 「拆码 → 前缀 + 名 + +强度」的显示行为。SETCOLORBYNAME LightSalmon …
 * RESETCOLOR 的 ere 等价物 = 片段自带 color（CSS 色名直通渲染层，
 * page-main-menu.js 的 yellow 先例）。
 *
 * 两种出口（引擎每次 print 调用即结束一行，单行多段输出必须合成一次
 * 调用）：`equip_weapon_spans`/`equip_ring_spans` 只产片段数组，供调用方与
 * 前后文拼成**一次** era.print；`print_equiptype_weapon`/`print_equiptype_ring`
 * 是独立调用点（整行只有装备名）用的整行出口。两者返回值恒 0，
 * 调用方只取输出、不读返回值。
 */

'use strict';

const era = require('#/era-electron');
const {
  EQUIP_PREFIX_NAMES,
  EQUIP_WEAPON_NAMES,
  EQUIP_WEAPON_FALLBACK,
  EQUIP_RING_NAMES,
  EQUIP_RING_FALLBACK,
} = require('#/data/equip-database');
const { decode_equip_no } = require('#/system/equip/equip-lookup');

/** SETCOLORBYNAME LightSalmon 的 ere 等价物 */
const LIGHT_SALMON = 'LightSalmon';

/**
 * equip_weapon_spans 的片段构造：前缀 + 武器名 + 强度后缀。
 * 未知识别号（不在 40-60 段）用「剑」并把 w 重置为 40 号强度 0。
 * @param {object} w 装备记录（读存储编号；未知识别号时会改写）
 * @returns {object[]} 片段数组（均着 LightSalmon）
 */
function equip_weapon_spans(w) {
  // 拆码
  const { 识别号, 强度, 前缀 } = decode_equip_no(w.存储编号);
  w.识别号 = 识别号;
  w.强度 = 强度;
  w.前缀 = 前缀;

  const spans = [];
  // 接頭語名
  const prefix_name = EQUIP_PREFIX_NAMES[前缀];
  if (prefix_name !== undefined) {
    spans.push({ content: prefix_name, color: LIGHT_SALMON });
  }

  // 武器の識別番号は 40～69 を指定（53-60 为空名）；ELSE 重置 40 号
  let name = EQUIP_WEAPON_NAMES[识别号];
  if (name === undefined) {
    name = EQUIP_WEAPON_FALLBACK;
    w.存储编号 = 40;
    w.识别号 = 40;
    w.强度 = 0;
  }
  spans.push({ content: name, color: LIGHT_SALMON });

  // SIF W:2 != 0 → PRINTFORM +{W:2}（读 w.强度——ELSE 重置后为 0）
  if (w.强度 !== 0) {
    spans.push({ content: `+${w.强度}`, color: LIGHT_SALMON });
  }
  return spans;
}

/**
 * equip_ring_spans 的片段构造：戒指名 + 强度后缀。
 * 未知识别号（> 20）用「暗黑戒指」并把 w 重置为 0 号强度 0。
 * @param {object} w 装备记录（读存储编号；未知识别号时会改写）
 * @returns {object[]} 片段数组（均着 LightSalmon）
 */
function equip_ring_spans(w) {
  // 拆码
  const { 识别号, 强度, 前缀 } = decode_equip_no(w.存储编号);
  w.识别号 = 识别号;
  w.强度 = 强度;
  w.前缀 = 前缀;

  const spans = [];
  // 指輪の識別番号は 0～39 を指定；ELSE 重置 0 号
  let name = EQUIP_RING_NAMES[识别号];
  if (name === undefined) {
    name = EQUIP_RING_FALLBACK;
    w.存储编号 = 0;
    w.识别号 = 0;
    w.强度 = 0;
  }
  spans.push({ content: name, color: LIGHT_SALMON });

  // SIF W:2 != 0 → PRINTFORM +{W:2}（读 w.强度——ELSE 重置后为 0）
  if (w.强度 !== 0) {
    spans.push({ content: `+${w.强度}`, color: LIGHT_SALMON });
  }
  return spans;
}

/**
 * print_equiptype_weapon 的整行出口：独立调用点用（行内只有装备名）。
 * @param {object} w 装备记录
 * @returns {number} 恒 0
 */
function print_equiptype_weapon(w) {
  era.print(equip_weapon_spans(w));
  return 0;
}

/**
 * print_equiptype_ring 的整行出口（RETURN 0）。
 * @param {object} w 装备记录
 * @returns {number} 恒 0
 */
function print_equiptype_ring(w) {
  era.print(equip_ring_spans(w));
  return 0;
}

module.exports = {
  LIGHT_SALMON,
  equip_weapon_spans,
  equip_ring_spans,
  print_equiptype_weapon,
  print_equiptype_ring,
};
