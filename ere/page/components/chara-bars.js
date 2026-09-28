/**
 * @file 角色基础条组件：体力/气力条（life_bar/vital_bar）与槽条 progress
 * 格助手（射精/母乳/触手段共用）。
 *
 * 表现层（#74 决定的 BASE 条版）：引擎的百分比条 + (cur/max) 数值
 * + 状态标（printMultiColumns 的 progress 格）——
 *   - 语义值＝条内文字（体力/气力/射精（名）…）+ 条后文字 `(cur/max)`，
 *     读取层零解析直取（progress 格的条内/条后文字即全部语义，
 *     #212 起 `(cur/max)` 映射为 gauge{val, max}）；
 *   - 条形几何不进事件流（14/32 格字符条还是引擎百分比条都不影响语义值）；
 *   - 状态标（★濒死★ 等）与「避孕套使用中」缀在 (cur/max) 之后，玩家可见。
 *
 * 立绘分支不镜像（立绘开关开时条宽 14，且该分支渲染的是恒空条
 * ——显示缺陷，黄金样本第 48 行的 14 格空条即它，
 * 比对只取 val/max、不受影响）：条宽是纯表现，ere 侧恒 < 24——引擎
 * ProgressConfig 的 barWidth ≥ 24 会把条后文字列（el-col-0）整列藏掉，
 * 语义值必须玩家可见（#74 硬约束）。立绘开关本体（存档设置项）随设置票落表，
 * 届时只影响条宽、无语义面。
 *
 * 指定角色走显式参数 cid（TARGET 换出换入习语不移植，
 * ere 一律显式传参）；「末尾免改行」不承载——progress 格一行一条，
 * ere 一律显式传参）；「末尾免改行」第二参不承载——progress 格一行一条，
 * 调用点是 page-train.js 状态画面与 chara-info-title.js 角色信息块
 * （#596 起逐行，同行拼接的形状问题不再出现）。
 */

const era = require('#/era-electron');
const { pad_left } = require('#/utils/display-width'); // #577：对齐补位 NBSP 化

// 条宽（纯表现；< 24 的硬约束见文件头，与 page-train 参数条同取 16）
const BASE_BAR_WIDTH = 16;

/**
 * 基础槽条的 progress 格：`(cur/max)` 数值 + 可选缀文。
 *
 * @param {string} label 条内文字（体力/气力/射精（名）…；名字后的全角
 *   对齐衬垫是字符条时代的排版，progress 格由引擎排版，不镜像）
 * @param {number} cur 当前值（负值按 0 渲染——死亡分支的恒空条写法）
 * @param {number} max 上限
 * @param {{value_width?: number, suffix?: string}} [options]
 *   value_width：数值右对齐宽（体力/气力条取 4；射精/母乳段
 *   无宽度规格取 0＝不填充）
 *   suffix：缀文（避孕套使用中 / ★濒死★…，缀在 (cur/max) 之后）
 */
function print_base_bar(
  label,
  cur,
  max,
  { value_width = 0, suffix = '' } = {},
) {
  const shown = Math.max(cur, 0);
  const value = pad_left(String(shown), value_width);
  era.printMultiColumns([
    {
      type: 'progress',
      percentage: max > 0 ? (100 * shown) / max : 0,
      inContent: label,
      outContent: `(${value}/${max})${suffix}`,
      config: { barWidth: BASE_BAR_WIDTH },
    },
  ]);
}

/**
 * life_bar：体力条。
 * MAXBASE:0 ≤ 0 时静默返回；濒死（< 500）/死亡（< 0）缀标。
 * @param {number} cid 角色 ID
 */
function life_bar(cid) {
  const max = era.get(`maxbase:${cid}:0`) || 0;
  // MAXBASE:0 <= 0 → 无输出直接返回
  if (max <= 0) {
    return;
  }
  const cur = era.get(`base:${cid}:0`) || 0;
  // 死亡/濒死标（缀在数值后）
  let suffix = '';
  if (cur < 0) {
    suffix = '★死亡★';
  } else if (cur < 500) {
    suffix = '★濒死★';
  }
  // 体力条：数值右对齐宽 4
  print_base_bar('体力', cur, max, { value_width: 4, suffix });
}

/**
 * vital_bar：气力条。
 * MAXBASE:1 ≤ 0 时静默返回；气力 0（≤ 0）缀标。
 * @param {number} cid 角色 ID
 */
function vital_bar(cid) {
  const max = era.get(`maxbase:${cid}:1`) || 0;
  if (max <= 0) {
    return;
  }
  const cur = era.get(`base:${cid}:1`) || 0;
  print_base_bar('气力', cur, max, {
    value_width: 4,
    suffix: cur <= 0 ? '★气力０★' : '',
  });
}

module.exports = { BASE_BAR_WIDTH, life_bar, print_base_bar, vital_bar };
