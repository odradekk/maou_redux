/**
 * @file 角色基础条组件：体力/气力条（@LIFE_BAR/@VITAL_BAR）与槽条 progress
 * 格助手（射精/母乳/触手段共用）。
 *
 * 源: target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB
 *       @LIFE_BAR（:1129-1168）/ @VITAL_BAR（:1175-1203）
 *     （存根登记原写「文件待核」，#212 核实并落地——这两个函数住在
 *     CHARA_INFO_SHOW，但 SHOW_STATUS 是它们的第一个消费者，归调教骨架票）
 *
 * 表现层（#74 裁定的 BASE 条版）：原作是 BAR 命令的字符条 + (cur/max) 数值
 * + 状态标；ere 侧换 printMultiColumns 的 progress 格——
 *   - 语义值＝条内文字（体力/气力/射精（名）…）+ 条后文字 `(cur/max)`，
 *     归一化器零解析直取（tools/compare/normalize.js 的 progress 分支，
 *     #212 扩展了 `(cur/max)` → gauge{val, max} 的映射）；
 *   - 条形几何不进事件流（原作 14/32 格字符条 vs 引擎百分比条）；
 *   - 状态标（★濒死★ 等）与「避孕套使用中」缀在 (cur/max) 之后，玩家可见。
 *
 * 立绘分支不镜像（:1145-1156 的 IF 立绘 → 条宽 14，且存活臂渲染的是
 * BAR 0——恒空条，原作自身的显示缺陷；黄金样本第 48 行的 14 格空条即此形态，
 * 比对只取 val/max、不受影响）：条宽是纯表现，ere 侧恒 < 24——引擎
 * ProgressConfig 的 barWidth ≥ 24 会把条后文字列（el-col-0）整列藏掉，
 * 语义值必须玩家可见（#74 硬约束）。开关本体（#DIM SAVEDATA 立绘，
 * 魔改新增/魔改使用.ERH:6；SYSTEM/CONFIG.ERB 的 268/270 行置位）随设置票落表，
 * 届时只影响条宽、无语义面。
 *
 * ARG:0（指定角色）→ 显式参数 cid（Emuera 的 TARGET 换出换入习语不移植，
 * ere 一律显式传参）；ARG:1（末尾免改行）不承载——progress 格一行一条，
 * 当前唯一调用点 @SHOW_STATUS 用默认带改行（CHARA_INFO_SHOW 后续调用点
 * 需要同行拼接时再定形状，见 docs/stub-registry.md 的角色信息票）。
 */

const era = require('#/era-electron');

// 条宽（纯表现；< 24 的硬约束见文件头，与 page-train 参数条同取 16）
const BASE_BAR_WIDTH = 16;

/**
 * 基础槽条的 progress 格：`(cur/max)` 数值 + 可选缀文。
 *
 * @param {string} label 条内文字（体力/气力/射精（名）…；原作名字后的全角
 *   对齐衬垫是字符条时代的排版，progress 格由引擎排版，不镜像）
 * @param {number} cur 当前值（负值按 0 渲染——原作死亡分支 BAR 0 的写法）
 * @param {number} max 上限
 * @param {{value_width?: number, suffix?: string}} [options]
 *   value_width：数值右对齐宽（LIFE/VITAL 的 {BASE,4} 取 4；射精/母乳段
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
  const value = String(shown).padStart(value_width, ' ');
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
 * @LIFE_BAR（CHARA_INFO_SHOW ver1.1.2.ERB:1129-1168）：体力条。
 * MAXBASE:0 ≤ 0 时静默返回（:1137-1141）；濒死（< 500）/死亡（< 0）缀标。
 * @param {number} cid 角色 ID
 */
function life_bar(cid) {
  const max = era.get(`maxbase:${cid}:0`) || 0;
  // :1137-1141 IF MAXBASE:0 <= 0 → RETURN 0（无输出）
  if (max <= 0) {
    return;
  }
  const cur = era.get(`base:${cid}:0`) || 0;
  // :1159-1163 死亡/濒死标（缀在数值后）
  let suffix = '';
  if (cur < 0) {
    suffix = '★死亡★';
  } else if (cur < 500) {
    suffix = '★濒死★';
  }
  // :1143-1157 体力 BAR +（{BASE:0, 4}/{MAXBASE:0}）——数值宽 4
  print_base_bar('体力', cur, max, { value_width: 4, suffix });
}

/**
 * @VITAL_BAR（CHARA_INFO_SHOW ver1.1.2.ERB:1175-1203）：气力条。
 * MAXBASE:1 ≤ 0 时静默返回（:1183-1187）；气力 0（≤ 0）缀标（:1198-1199）。
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
