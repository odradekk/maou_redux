/**
 * @file 简体参考集的形状与锚点测试（issue #188）。
 *
 * tools/lang-simp-ref.js 是外部上游（OpenCC TSCharacters）的派生物，不能在
 * 无网环境重derive——本文件把它的**语义**钉在锚点上：该在的在（表外繁体要
 * 红得了）、不该在的不在（正常简体不误伤）、派生规则没走样（简繁两用条目
 * 被排除）。换上游版本或换派生规则，锚点红；红的修法是重跑派生并逐字审
 * diff，不是手补锚点。
 *
 * 交叉不变量（第四条用例）：归一表的**目标值**不得落在繁侧集——否则表会把
 * 字映成另一个繁体（如 寵→龍），转换产物当场又被参考集报红。两条数据源
 * （归一表人工长、参考集上游派生）在 here 互为对方的质量闸。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { TRAD_SIDE } = require('../tools/lang-simp-ref');
const table = require('../tools/lang-table');

const SET = new Set(TRAD_SIDE);

test('形状：全部 CJK 表意文字、无重复、量级符合勘测（3203±10%）', () => {
  const chars = [...TRAD_SIDE];
  assert.ok(
    chars.length >= 2900 && chars.length <= 3500,
    `参考集 ${chars.length} 字，偏离 2026-07 勘测的 3203 超过 10%——上游或派生规则变了，重审`,
  );
  assert.equal(SET.size, chars.length, '参考集有重复字——派生脚本坏了');
  const non_cjk = chars.filter(
    // CJK 统一表意 + 扩 A + 兼容 + 扩 B..G（𰻞 U+30EDE 在 G 区）
    (ch) => !/[\u3400-\u9FFF\uF900-\uFAFF\u{20000}-\u{3134F}]/u.test(ch),
  );
  assert.deepEqual(non_cjk, [], '参考集混入了非 CJK 表意文字——派生脚本坏了');
});

test('锚点：表外繁体要在场（#188 的靶心与实测存量字）', () => {
  // 贖：#188 的实证靶心（find_offenders 曾放行、不在归一表）；
  // 蟻/鋭：#188 普查出的全部存量字（Chara203 / Chara18+19，进表后仍应在集）；
  // 調/華/靈/滅：表内繁体，参考集同样认定（两路判定的一致性）；
  // 贈/巖：无语料实据的常见繁体——在场证明集不是只收语料见过的字。
  for (const ch of ['贖', '蟻', '鋭', '調', '華', '靈', '滅', '贈', '巖']) {
    assert.ok(SET.has(ch), `「${ch}」不在参考集——表外繁体要红就红不了`);
  }
});

test('反锚点：简体值、简繁同形与简繁两用字不得在场（防误伤）', () => {
  // 魂：简繁同形（#188 派单实测的探针污染例）；后/里/干：一简对多繁的简端；
  // 着/于/斗：简体独有形。这些进了参考集，正常简体文本会大面积误红。
  for (const ch of ['魂', '后', '里', '干', '着', '于', '斗']) {
    assert.ok(!SET.has(ch), `「${ch}」不该在参考集——正常简体会被误伤`);
  }
  // 乾/於：OpenCC 标注简繁两用（乾→干 乾、於→于 於），派生规则必须排除；
  // 著：OpenCC 只在词级处理（著→着 不进字表），字级不得报。
  for (const ch of ['乾', '於', '著']) {
    assert.ok(
      !SET.has(ch),
      `「${ch}」是简繁两用/词级处理字，派生规则把它排除了才对`,
    );
  }
});

test('交叉不变量：归一表全部目标值不得落在繁侧集', () => {
  const values = [
    ...Object.values(table.TRAD_CHAR_MAP),
    ...Object.values(table.JP_CHAR_MAP),
    ...table.WORD_MAP.flatMap(({ target }) => [...target]),
  ];
  const offenders = [...new Set(values)].filter((ch) => SET.has(ch));
  assert.deepEqual(
    offenders,
    [],
    `归一表把字映成了繁侧字（${offenders.join(
      '',
    )}）——转换产物会立刻被参考集报红，两头都是错的`,
  );
});
