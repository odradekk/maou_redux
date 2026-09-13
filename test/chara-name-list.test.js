/**
 * @file ere/chara/chara-name-list.js 与 yml/CharaNameList.yml 的行为测试
 * （issue #388：CHARA_NAME_INIT 落表）。
 *
 * 三层验证：
 *   - 夹具层（快，无需引擎）：get_fixed_chara_name 的守卫与缓存行为；
 *   - 引擎实证层（skip 于无引擎环境）：证明「未注册 id 直接崩溃」是真实
 *     风险——不经守卫的裸三段寻址会撞上它，这正是 chara-name-list.js
 *     valid_ids() 存在的理由；
 *   - 数据同步层（无需引擎）：从 target/ERB 独立重新推导整张表（提取、
 *     そら 覆盖、归一、重名合并），与库内产物逐条比对——防止产物被
 *     手改漂移，或归一表变化后产物未跟着重转。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const {
  create_variable_loader,
  load_engine_bundle,
} = require('./helpers/engine-bundle');
const { to_simplified, load_table } = require('../tools/lang-normalize');

const engine = load_engine_bundle();
const engine_test = engine ? test : test.skip;

const REPO_ROOT = path.resolve(__dirname, '..');
const YML_PATH = path.join(REPO_ROOT, 'yml', 'CharaNameList.yml');
const SRC_PATH = path.join(
  REPO_ROOT,
  'target',
  'ERB',
  'キャラ関数',
  'CHARA_NAME_INIT.ERB',
);

// —— 夹具层：valid_ids 守卫与缓存 ——

test('get_fixed_chara_name：已注册 id 查表返回名字', () => {
  const fixture = create_era_fixture();
  fixture.store.set('charanamelistkeys', [0, 17, 3610]);
  fixture.store.set('charanamelistname:17', '雅儿贝德');
  const { get_fixed_chara_name } = fixture.load_module('chara/chara-name-list');

  assert.equal(
    get_fixed_chara_name(17),
    '雅儿贝德',
    '已注册 id 必须查表返回名字',
  );
});

test('get_fixed_chara_name：未注册 id（含合并丢弃的缺口）直接返回空串，不去读名字地址', () => {
  const fixture = create_era_fixture();
  // 3030 不在 keys 里（模拟被重名合并丢弃），但故意仍在 store 里放一个陈旧值，
  // 证明函数走的是 valid_ids 守卫、不是「地址查到了就用」。
  fixture.store.set('charanamelistkeys', [0, 17]);
  fixture.store.set('charanamelistname:3030', '陈旧残留');
  const { get_fixed_chara_name } = fixture.load_module('chara/chara-name-list');

  assert.equal(
    get_fixed_chara_name(3030),
    '',
    '未注册 id 必须直接返回空串，不得读到陈旧的名字地址残留',
  );
  assert.equal(
    get_fixed_chara_name(99999),
    '',
    '声明范围外的编号同样安全返回空串',
  );
});

test('get_fixed_chara_name：已注册但名字地址未播种（undefined）时兜底为空串', () => {
  const fixture = create_era_fixture();
  fixture.store.set('charanamelistkeys', [42]);
  // 42 在 keys 里，但对应的 name: 地址没有被播种——只有在这个场景下 `?? ''`
  // 才有意义（真实引擎里名字表与 keys 恒同步，这里是防御性验证）。
  const { get_fixed_chara_name } = fixture.load_module('chara/chara-name-list');

  assert.equal(
    get_fixed_chara_name(42),
    '',
    "名字地址未播种时必须兜底为空串（?? ''）",
  );
});

test('get_fixed_chara_name：valid_ids 缓存只建一次（重复查表不重复读 keys）', () => {
  const fixture = create_era_fixture();
  fixture.store.set('charanamelistkeys', [1, 2]);
  fixture.store.set('charanamelistname:1', '甲');
  fixture.store.set('charanamelistname:2', '乙');
  const { get_fixed_chara_name } = fixture.load_module('chara/chara-name-list');

  get_fixed_chara_name(1);
  get_fixed_chara_name(2);
  get_fixed_chara_name(999); // 未注册也只查缓存，不再读 keys

  const keys_reads = fixture.var_reads.filter(
    (r) => r.name === 'charanamelistkeys',
  );
  assert.equal(
    keys_reads.length,
    1,
    'charanamelistkeys 只应被读取一次（缓存生效）',
  );
});

test('chara_name_init：调用点可观测（预热 valid_ids 缓存），不抛错', () => {
  const fixture = create_era_fixture();
  fixture.store.set('charanamelistkeys', [7]);
  const { chara_name_init } = fixture.load_module('chara/chara-name-list');

  assert.doesNotThrow(() => chara_name_init());
  assert(
    fixture.var_reads.some((r) => r.name === 'charanamelistkeys'),
    'chara_name_init 必须读取 charanamelistkeys（否则调用点被删掉也测不出来）',
  );
});

test('EVENTFIRST/EVENTLOAD 真的调用了 chara_name_init（读取 charanamelistkeys 可观测）', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  const { emit } = fixture.load_module('system/event/registry');
  fixture.load_module('event/event-load');

  await emit('EVENTLOAD');

  assert(
    fixture.var_reads.some((r) => r.name === 'charanamelistkeys'),
    'EVENTLOAD 链必须真的调用 chara_name_init（不是只证明存在）',
  );
});

// —— 引擎实证层：未注册 id 崩溃是真实风险，valid_ids 因此不可省 ——

function load_real_table() {
  const loader = create_variable_loader();
  const text = fs.readFileSync(YML_PATH, 'utf8');
  loader.load_rows(
    engine.parse_data_file(text, 'yml', 'charanamelist'),
    'charanamelist',
  );
  return loader;
}

engine_test(
  '引擎实证：CharaNameList.yml 装载零告警、零重号（去重前已手工消解）',
  () => {
    const loader = load_real_table();
    assert.deepEqual(loader.warnings, []);
  },
);

engine_test(
  '引擎实证：注册 id 经 charanamelistname 三种范围各取一例读出正确名字',
  () => {
    const loader = load_real_table();
    const fake = {
      staticData: loader.static_data,
      fieldNames: loader.field_names,
      data: {},
      global: {},
      extendedTables: {},
      era: { error: () => {} },
    };
    const cases = [
      [0, '玛丽'], // 洋名
      [3610, '空'], // 男性和名，そら 覆盖
      [3003, '飒太'], // 男性和名，同 id 二次赋值取最后一次 + 归一
    ];
    for (const [id, expected] of cases) {
      assert.equal(
        engine.set_var.call(fake, `charanamelistname:${id}`),
        expected,
      );
    }
  },
);

engine_test(
  '引擎实证：未注册 id（含被合并丢弃的 3030）裸三段寻址直接崩溃',
  () => {
    const loader = load_real_table();
    const fake = {
      staticData: loader.static_data,
      fieldNames: loader.field_names,
      data: {},
      global: {},
      extendedTables: {},
      era: { error: () => {} },
    };
    for (const gap_id of [3030, 5289, 99999]) {
      assert.throws(
        () => engine.set_var.call(fake, `charanamelistname:${gap_id}`),
        /Cannot read properties of undefined/,
        `id ${gap_id} 应当撞上未注册崩溃（chara-name-list.js 的 valid_ids 守卫正是防这个）`,
      );
    }
  },
);

engine_test(
  '引擎实证：charanamelistkeys 与 valid_ids() 读的是同一份 id 集合',
  () => {
    const loader = load_real_table();
    const fake = {
      staticData: loader.static_data,
      fieldNames: loader.field_names,
      data: {},
      global: {},
      extendedTables: {},
      era: { error: () => {} },
    };
    const keys = engine.set_var.call(fake, 'charanamelistkeys');
    assert.equal(
      keys.length,
      Object.keys(loader.static_data.charanamelist).length,
    );
    assert(keys.includes(0) && keys.includes(3610) && !keys.includes(3030));
  },
);

// —— 数据同步层：从 target/ERB 独立重推导，与库内产物逐条比对 ——

/** 与 yml/CharaNameList.yml 同一算法，独立重算一遍（不 require 生成脚本，脚本未入库） */
function recompute_expected() {
  const src = fs.readFileSync(SRC_PATH, 'utf8');
  const re = /^LIST_CHARA_NAME:(\d+)\s*=\s*(.*)$/;
  const by_id = new Map();
  for (const line of src.split(/\r?\n/)) {
    const m = re.exec(line.trim());
    if (m) {
      by_id.set(Number(m[1]), m[2]); // Map.set 覆盖：天然取「最后一次赋值」
    }
  }
  by_id.set(3610, '空'); // そら → 空（issue #388 讨论确认，一次性译名决定）

  const tbl = load_table();
  const by_name = new Map();
  for (const [id, raw] of by_id) {
    const name = to_simplified(raw, tbl);
    if (!by_name.has(name)) {
      by_name.set(name, []);
    }
    by_name.get(name).push(id);
  }
  const kept = new Map();
  for (const [name, ids] of by_name) {
    kept.set(name, Math.max(...ids)); // 重名合并：保留较大 id
  }
  return kept;
}

/** 解析 yml/CharaNameList.yml 的 "名字":\n  id: N 正文（跳过 # 头注） */
function parse_product() {
  const lines = fs.readFileSync(YML_PATH, 'utf8').split(/\r?\n/);
  const entries = new Map();
  let pending_name;
  for (const line of lines) {
    const name_m = /^"(.*)":$/.exec(line);
    if (name_m) {
      pending_name = name_m[1];
      continue;
    }
    const id_m = /^\s+id:\s*(\d+)$/.exec(line);
    if (id_m && pending_name !== undefined) {
      entries.set(pending_name, Number(id_m[1]));
      pending_name = undefined;
    }
  }
  return entries;
}

test('产物同步：yml/CharaNameList.yml 与从 target/ERB 独立重推导的结果逐条一致', () => {
  const expected = recompute_expected();
  const actual = parse_product();

  assert.equal(actual.size, expected.size, '条目总数必须一致');
  assert.deepEqual(
    [...actual.entries()].sort(),
    [...expected.entries()].sort(),
    '产物内容与源数据重推导结果逐条一致（含重名合并与 そら 覆盖）——drift 说明产物被手改或归一表变化后未重转',
  );
});

test('产物同步：源文件的两处「同一 id 二次赋值」按最后一次生效', () => {
  const expected = recompute_expected();
  // 3003 源文件先赋 陸 后赋 颯太（归一后 飒太）；3013 先赋 悠斗 后赋 陽斗（归一后 阳斗）
  assert.equal(expected.get('飒太'), 3003);
  assert.equal(expected.get('阳斗'), 3013);
  assert.ok(
    ![...expected.keys()].includes('陆') || expected.get('陆') !== 3003,
  );
});
