/**
 * @file 简体文本检查（tools/lang-check.js）的单元测试（issue #60；#640 改名）。
 *
 * 钉两件事：
 *   1. **表不变量**：load_table() 对坏形状（非单字、链式映射、词级 target
 *      再含键、空豁免）必须 throw——表只能以合法形状生长；
 *   2. **判定行为**：find_offenders / find_outside_trad / is_exempted /
 *      scan_string_literals 的命中形态逐条固定（字级 / 词级 / 假名 / 表外
 *      繁侧 / 豁免整串 / 注释与转义不骗扫描器）。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const {
  find_offenders,
  find_outside_trad,
  is_exempted,
  load_table,
  scan_string_literals,
  validate,
} = require('../tools/lang-check');
const table = require('../tools/lang-table');

// —— 表不变量 ——

test('load_table：合法表载入即过，字级与词级条目在位', () => {
  const tbl = load_table();
  assert.ok(tbl.char_map.size >= 500, '字级条目意外地少，表八成没载全');
  assert.ok(tbl.word_map.length >= 3);
});

test('validate：坏表形状必须载入期就红（逐条变异过）', () => {
  const bad = (mutate) => {
    const raw = JSON.parse(JSON.stringify(table));
    mutate(raw);
    validate(raw);
  };
  assert.throws(
    () =>
      bad((raw) => {
        raw.TRAD_CHAR_MAP['這個'] = '这个'; // 两字键
      }),
    /非单字条目/,
  );
  assert.throws(
    () =>
      bad((raw) => {
        raw.TRAD_CHAR_MAP['後'] = '後'; // 无变化
      }),
    /无变化条目/,
  );
  assert.throws(
    () =>
      bad((raw) => {
        // 链式：造 后→後 即成 后 → 後 → 后
        raw.TRAD_CHAR_MAP['后'] = '後';
      }),
    /链式映射/,
  );
  assert.throws(
    () =>
      bad((raw) => {
        raw.WORD_MAP.push({ source: '隷', target: '隶' }); // 单字词
      }),
    /词级条目过短/,
  );
  assert.throws(
    () =>
      bad((raw) => {
        // target 里含字级键（廃）：转换一趟之后还会被字级再转一次
        raw.WORD_MAP.push({ source: '戰廃', target: '战廃' });
      }),
    /词级 target 含字级键/,
  );
  assert.throws(() => {
    bad((raw) => {
      raw.EXEMPT_STRINGS.push({ value: '', where: 'x', why: 'x' });
    });
  }, /豁免条目 value 为空/);
});

// —— 判定行为 ——

test('find_offenders：字级/词级/假名分别报出，豁免按整串放行', () => {
  const tbl = load_table();
  assert.deepEqual(find_offenders('你是变态', tbl), []);
  const kinds = find_offenders('你這個變態', tbl).map((h) => h.kind);
  assert.deepEqual(kinds, ['char', 'char', 'char', 'char']);
  assert.ok(find_offenders('奴隷', tbl).some((h) => h.kind === 'word'));
  assert.ok(find_offenders('気力', tbl).some((h) => h.kind === 'word'));
  assert.deepEqual(find_offenders('華胥の亡靈', tbl), [
    { kind: 'char', value: '華' },
    { kind: 'kana', value: 'の' },
    { kind: 'char', value: '靈' },
  ]);
  // 豁免整串放行（#642 起改用存根函数名「自動處刑」：致谢名单整段已删除，
  // 原探针串不再匹配任何豁免条目）
  assert.ok(is_exempted('自動處刑', tbl), '存根函数名整串豁免');
  assert.ok(
    !is_exempted('處刑', tbl),
    '豁免粒度是字符串整体：函数名里抠出来的片段不豁免',
  );
});

test('find_outside_trad：表外繁侧字报出、表内字与简体不报（#188）', () => {
  const tbl = load_table();
  assert.deepEqual(
    find_outside_trad('巖穴里的赠礼', tbl),
    [{ kind: 'outside', value: '巖' }],
    '巖 不在归一表——这正是 #188 的失明点，由参考集报出',
  );
  assert.deepEqual(
    find_outside_trad('調教', tbl),
    [],
    '調 在归一表，归 find_offenders 报（char:調），此处不重复',
  );
  assert.deepEqual(find_outside_trad('你是变态', tbl), [], '正常简体不报');
  assert.deepEqual(
    find_outside_trad('贈身於巖', tbl),
    [
      { kind: 'outside', value: '贈' },
      { kind: 'outside', value: '巖' },
    ],
    '去重保序；於 是简繁两用字（OpenCC 排除），不报',
  );
  assert.deepEqual(
    find_outside_trad('巖穴巖壁', tbl),
    [{ kind: 'outside', value: '巖' }],
    '同字去重',
  );
});

test('scan_string_literals：注释里的引号与转义不骗扫描器', () => {
  const src = [
    "// it's a comment with 'quotes'",
    'const a = "他\\t發";',
    'const b = `多行',
    '模板`;',
  ].join('\n');
  const lits = scan_string_literals(src);
  assert.equal(lits.length, 2, '注释里的引号不得开字符串');
  assert.equal(
    lits[0].content,
    '他t發',
    '转义序列按其字面值入内容（\\t 即字母 t）',
  );
  assert.ok(lits[1].content.includes('多行'));
});
