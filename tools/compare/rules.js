/**
 * @file T18 输出对拍·差异归因规则（issue #48）。
 *
 * #9 的定案：忽略规则每条都要注明理由——否则忽略规则会逐渐变成掩盖缺陷
 * 的地毯。规则只认「有名字的差异」：
 *   - version：黄金样本录自比 target/ 更早的构建（#9 勘误二），54/55/56/
 *     89/110 五个编号的指令菜单差异是构建漂移、不是移植缺陷；
 *   - stub：docs/stub-registry.md 已登记的欠账（存根占位行、状态画面未
 *     移植的条段、COM_ABLE 未移植导致的按钮未过滤、SHOW_USERCOM 按钮组）；
 *   - 其余一律 unexplained——真缺陷候选，当次对拍必须归零或开票处置。
 *
 * 规则表是**白名单**形态：命中才豁免，改一个字就失配变红，逼改动者有
 * 意识地同步本表（与 #60 豁免名单同一设计哲学）。
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');

// —— 指令菜单的构建漂移（#9 勘误二 + 本票新证）——
// 日志侧：放置PLAY=54、交谈=55、穿脱衣服=89；target 侧：野外PLAY=54、
// 放置PLAY=55、交谈=56、兽奸PLAY=89、穿脱衣服=110。两构建在这些编号上
// 必然对不齐，追它们没有意义。
const VERSION_SKEW_IDS = new Set([54, 55, 56, 89, 110]);

// —— 同族漂移的**标签移位**（本票首跑对拍新发现，勘误二「0-39 全部吻合」
//    的例外）：黄金样本 打屁股[39]（log:66），Train.csv 打屁股=40——target
//    在 39-53 段插过指令、其后编号整体 +1。按 (标签, 侧, 编号) 精确配对，
//    不放宽到裸编号（裸 40 会吞掉真正的 COM_ABLE 回归）。
const MENU_LABEL_SHIFT = [{ key: '打屁股', golden: 39, ere: 40 }];

// —— @SHOW_USERCOM 的按钮组标签（docs/stub-registry.md「指令菜单按钮渲染」
//    行：[100]-[990] 组未挂载）。golden 侧出现这些标签 = 已登记欠账 ——
const USERCOM_BUTTON_LABELS = new Set([
  '能力表示',
  '污秽表示',
  '交代助手',
  '对换调教',
  '避孕套设定',
  '爱抚系过滤',
  '器具系过滤',
  '私处性交系过滤',
  '肛门性交系过滤',
  'ＳＭ系过滤',
  '调教菜单登录',
  '调教菜单表示',
  '调教菜单实行',
  '调教结束',
]);

// —— 存根占位行的自报形状（ere/utils/stub-line.js 与 page 内联占位）——
// 存根占位行自愿声明「尚未移植」并给出原作函数名/清单出处；本项目所有
// 占位行都含这个词，正文台词不含（output-lang-lock 同款口径）。
const STUB_TEXT_RE = /尚未移植/;

// —— 状态条欠账的 golden 侧键名（SHOW_STATUS 存根登记行）——
//   体力/气力：LIFE_BAR / VITAL_BAR（待认领·状态画面）；
//   射精（你）：SHOW_STATUS 射精/母乳/触手槽条段（登记，随指令/装备票）。
const STUB_GAUGE_KEYS = new Set(['体力', '气力', '射精（你）']);

// —— golden 侧文本的成对差异（服装系统欠账）——
//   TRAIN_MESSAGE_B 的服装前缀（PRINT_CLOTHTYPE_SPECIAL，登记随服装票）：
//   golden 带「隔着紧身衣＆裙甲、」前缀，ere 侧没有；ere 侧的裸文本与
//   golden 去前缀后逐字一致才豁免（成对豁免，单边不成立）。
const CLOTH_PREFIX = '隔着紧身衣＆裙甲、';
const STUB_TEXT_EXACT = new Set(['【紧身衣＆裙甲的姿态】']); // PRINT_CLOTHTYPE

/**
 * TrainCommand.yml 的全部编号（ere 侧菜单条目的合法值域）。
 * 规则用：ere 侧多出来的按钮只有编号在册才可归因「COM_ABLE 未移植」；
 * 编号不在册（拼错/凭空）照样 unexplained。
 */
function load_traincommand_ids(
  repo_root = path.resolve(__dirname, '..', '..'),
) {
  const text = fs.readFileSync(
    path.join(repo_root, 'yml', 'TrainCommand.yml'),
    'utf8',
  );
  return new Set(
    [...text.matchAll(/"(.+)":\r?\n\s+id:\s*(\d+)/g)].map((m) => Number(m[2])),
  );
}

/**
 * 归因单条差异条目。
 *
 * @param {object} entry 差异条目（kind 同 normalize）
 * @param {'golden'|'ere'} side 条目所在侧
 * @param {object} context { traincommand_ids: Set<number>,
 *   counterpart?: 对侧同编号/同键条目（成对差异时给） }
 * @returns {{category: 'version'|'stub', reason: string} | null
 *   null = 无法归因（unexplained，真缺陷候选）}
 */
function classify_entry(entry, side, context) {
  const tc_ids = context.traincommand_ids ?? load_traincommand_ids();

  if (entry.kind === 'menu') {
    const shift = MENU_LABEL_SHIFT.find(
      (s) => s.key === entry.key && s[side] === entry.val,
    );
    if (VERSION_SKEW_IDS.has(entry.val)) {
      return {
        category: 'version',
        reason: `指令编号 ${entry.val} 在黄金样本与 Train.csv 间漂移（#9 勘误二）`,
      };
    }
    if (shift) {
      return {
        category: 'version',
        reason: `标签移位：${shift.key} 在黄金样本是 ${shift.golden}、Train.csv 是 ${shift.ere}（勘误二「0-39 吻合」的例外，本票实证）`,
      };
    }
    if (side === 'golden' && USERCOM_BUTTON_LABELS.has(entry.key)) {
      return {
        category: 'stub',
        reason: `@SHOW_USERCOM 按钮组未挂载（${entry.key}，docs/stub-registry.md）`,
      };
    }
    if (
      side === 'ere' &&
      tc_ids.has(entry.val) &&
      !USERCOM_BUTTON_LABELS.has(entry.key) &&
      // 编号与 golden 侧同一指令撞名（change 对）时必须由对侧规则归因：
      // golden 是按钮组标签 → 存根欠账；否则同编号异名 = unexplained
      context.counterpart !== undefined &&
      USERCOM_BUTTON_LABELS.has(context.counterpart.key)
    ) {
      return {
        category: 'stub',
        reason: `触手系指令 ${entry.key} 未被 COM_ABLE 过滤（COM_ABLE 族未移植）`,
      };
    }
    if (
      side === 'ere' &&
      context.counterpart === undefined &&
      tc_ids.has(entry.val)
    ) {
      return {
        category: 'stub',
        reason: `指令 ${entry.key}(${entry.val}) 未被 COM_ABLE 过滤（COM_ABLE 族未移植，随各自指令票）`,
      };
    }
    return null;
  }

  if (
    entry.kind === 'gauge' &&
    side === 'golden' &&
    STUB_GAUGE_KEYS.has(entry.key)
  ) {
    return {
      category: 'stub',
      reason: `${entry.key}条未移植（LIFE_BAR/VITAL_BAR 或射精槽条段，docs/stub-registry.md）`,
    };
  }

  if (entry.kind === 'text') {
    if (side === 'ere' && STUB_TEXT_RE.test(entry.text)) {
      return {
        category: 'stub',
        reason:
          '存根占位行（ere/utils/stub-line.js 形状，docs/stub-registry.md）',
      };
    }
    if (side === 'golden' && STUB_TEXT_EXACT.has(entry.text)) {
      return {
        category: 'stub',
        reason: '服装类型显示未移植（PRINT_CLOTHTYPE，docs/stub-registry.md）',
      };
    }
    if (
      side === 'golden' &&
      entry.text.startsWith(CLOTH_PREFIX) &&
      context.counterpart?.kind === 'text' &&
      context.counterpart.text === entry.text.slice(CLOTH_PREFIX.length)
    ) {
      return {
        category: 'stub',
        reason:
          '服装前缀未移植（PRINT_CLOTHTYPE_SPECIAL，docs/stub-registry.md）',
      };
    }
    if (
      side === 'ere' &&
      context.counterpart?.kind === 'text' &&
      context.counterpart.text === CLOTH_PREFIX + entry.text
    ) {
      return {
        category: 'stub',
        reason: '同上：服装前缀差异的 ere 半边（成对豁免）',
      };
    }
  }

  return null;
}

module.exports = {
  CLOTH_PREFIX,
  MENU_LABEL_SHIFT,
  STUB_GAUGE_KEYS,
  STUB_TEXT_EXACT,
  STUB_TEXT_RE,
  USERCOM_BUTTON_LABELS,
  VERSION_SKEW_IDS,
  classify_entry,
  load_traincommand_ids,
};
