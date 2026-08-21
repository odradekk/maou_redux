/**
 * tools/compare/snapshot.js 与 assertions.js 的行为测试（issue #48）。
 *
 * snapshot：快照展平、era.get 退路（era.raw() 未被 SDK 声明的风险记录见
 * 模块头与 #9 结论评论）、三类差异与忽略规则。
 * assertions：算式断言的抽取与自校验（#9 定下的「抽取器必须自校验」）、
 * 真实 emuera.log 上 400 条断言的原型的统计复现、链一致性。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const {
  diff_snapshots,
  snapshot_from_store,
  snapshot_via_get,
} = require('../tools/compare/snapshot');
const {
  check_assertions,
  extract_calc_assertions,
  parse_name_ids,
} = require('../tools/compare/assertions');
const { golden_stream } = require('../tools/compare/normalize');

const REPO = path.resolve(__dirname, '..');
const LOG = fs.readFileSync(path.join(REPO, 'target', 'emuera.log'), 'utf8');

// —— snapshot ——

test('快照展平：键排序、deep 友好', () => {
  const store = new Map([
    ['palam:31:2', 0],
    ['palam:31:0', 5240],
    ['flag:7', 2],
  ]);
  assert.deepEqual(snapshot_from_store(store), {
    'flag:7': 2,
    'palam:31:0': 5240,
    'palam:31:2': 0,
  });
});

test('era.get 退路：与 store 快照等值（raw() 失效时的采集法）', () => {
  const fake_era = {
    get(name) {
      return name === 'flag:7' ? 2 : name === 'palam:31:0' ? 5240 : undefined;
    },
  };
  assert.deepEqual(
    snapshot_via_get(fake_era, ['palam:31:0', 'flag:7', 'unwritten:x']),
    { 'flag:7': 2, 'palam:31:0': 5240 },
  );
});

test('快照差异三分类：变 / 增 / 删，忽略规则带理由放行', () => {
  const before = { 'palam:31:0': 5240, 'flag:10011': 0, 'tflag:999': 12 };
  const after = {
    'palam:31:0': 5540,
    'flag:10011': 0,
    'cflag:31:2': 1,
    'tflag:999': 40,
  };
  const diff = diff_snapshots(before, after, [
    // SET_CLEAR_POINT 的行号随输出行数漂移，属回放采集噪音（理由随规则走）
    { re: /^tflag:999$/, reason: '清除点行号漂移' },
  ]);
  assert.deepEqual(diff.changed, [
    { path: 'palam:31:0', from: 5240, to: 5540 },
  ]);
  assert.deepEqual(diff.added, [{ path: 'cflag:31:2', value: 1 }]);
  assert.deepEqual(diff.removed, []);
  assert.deepEqual(diff.ignored, [
    { path: 'tflag:999', reason: '清除点行号漂移' },
  ]);
});

// —— assertions ——

test('名表解析：Palam.yml 17 名（16 参数 + 否定 100）与序号对应', () => {
  const ids = parse_name_ids(path.join(REPO, 'yml', 'Palam.yml'));
  assert.equal(ids.get('阴核'), 0);
  assert.equal(ids.get('局部'), 15);
  assert.equal(ids.get('否定'), 100);
  assert.equal(ids.size, 17);
});

test('算术自校验：验算不过的算式被报出（工具自身可信的前提）', () => {
  const stream = golden_stream('阴核  100+  1=  101\n');
  const { self_check } = extract_calc_assertions(
    stream,
    parse_name_ids(path.join(REPO, 'yml', 'Palam.yml')),
    31,
  );
  assert.equal(self_check.self_validate_failures.length, 0);
  const bad = golden_stream('阴核  100+  1=  999\n');
  const bad_check = extract_calc_assertions(
    bad,
    parse_name_ids(path.join(REPO, 'yml', 'Palam.yml')),
    31,
  );
  assert.equal(bad_check.self_check.self_validate_failures.length, 1);
  assert.equal(bad_check.assertions.length, 0); // 坏行不产断言
});

test('真实样本全量：400 条断言与 #9 原型的统计逐项一致', () => {
  const { assertions, self_check } = extract_calc_assertions(
    golden_stream(LOG),
    parse_name_ids(path.join(REPO, 'yml', 'Palam.yml')),
    31,
  );
  assert.equal(assertions.length, 400);
  assert.equal(self_check.two_term, 392);
  assert.equal(self_check.three_term, 8);
  assert.equal(self_check.self_validate_failures.length, 0);
  assert.equal(self_check.unknown_names.length, 0);
  assert.deepEqual(
    [self_check.chain.chained, self_check.chain.reset],
    [361, 29],
  );
  assert.equal(self_check.chain.unexplained.length, 0);
});

test('链一致性：to ≠ 下一条 from 且非归零 → 无法解释的断裂', () => {
  // 造一段「润滑 100+1=101」紧跟「润滑 500+1=501」的断裂（非归零）
  const stream = golden_stream(
    '润滑  100+  1=  101\n润滑  500+  1=  501\n润滑    0+  1=    1\n',
  );
  const { self_check } = extract_calc_assertions(
    stream,
    parse_name_ids(path.join(REPO, 'yml', 'Palam.yml')),
    31,
  );
  assert.equal(self_check.chain.unexplained.length, 1);
  assert.equal(self_check.chain.reset, 1); // 第三条 from=0 → 归零类
});

test('check_assertions：before/after 两端核对，错值报出', () => {
  const failures = check_assertions(
    [
      {
        path: 'palam:31:0',
        key: '阴核',
        from: 5240,
        add: 300,
        sub: 0,
        to: 5540,
        line: 33,
      },
      {
        path: 'palam:31:3',
        key: '润滑',
        from: 2854,
        add: 61,
        sub: 0,
        to: 2915,
        line: 35,
      },
    ],
    (p) => ({ 'palam:31:0': 5240, 'palam:31:3': 2855 })[p],
    (p) => ({ 'palam:31:0': 5540, 'palam:31:3': 2915 })[p],
  );
  assert.equal(failures.length, 1);
  assert.equal(failures[0].assertion.key, '润滑');
  assert.equal(failures[0].stage, 'before');
  assert.equal(failures[0].actual, 2855);
});
