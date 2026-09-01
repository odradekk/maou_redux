/**
 * 指令族接线的通用锁（issue #274）：`ere/system/train/com-*.js` 里靠副作用
 * 注册进 COM / COM_ABLE 的模块，必须同时出现在两张清单上——
 *
 *   - `ere/system/flow/main-loop.js`：游戏运行时实际加载的族；
 *   - `tools/compare/replay.js` 的 TRAIN_PATH_MODULES：对拍回放实际加载的族。
 *
 * 两边都没有守卫时，族票的单测走 `load_module('system/train/com-xxx')`、
 * 对拍走 replay 自己的清单，主启动图漏装不会被任何检查发现（#228 的
 * com-cloth、#223/#226/#224/#222 的 replay 漏装都是这样混过去的）。
 *
 * 号集合从源码扫出，不维护手写名单——新族文件落地即纳入；漏 require
 * 时断言点名模块，不报一串裸编号。
 */
'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { TRAIN_PATH_MODULES } = require('../tools/compare/replay');

const REPO = path.resolve(__dirname, '..');
const TRAIN_DIR = path.join(REPO, 'ere', 'system', 'train');

const COM_FAMILY_FILES = fs
  .readdirSync(TRAIN_DIR)
  .filter((name) => /^com-.*\.js$/.test(name))
  .sort();

const { extract_register_ids } = require('./helpers/register-scan');

/**
 * 每个族文件扫出的 COM / COM_ABLE 号。没有 register 调用的文件（com-adv、
 * com-index 等辅助模块）不进表——它们不是靠副作用注册的族。
 * @returns {Map<string, {com: Set<number>, able: Set<number>}>}
 */
function scan_family_modules() {
  const out = new Map();
  for (const name of COM_FAMILY_FILES) {
    const src = fs.readFileSync(path.join(TRAIN_DIR, name), 'utf8');
    const com = extract_register_ids(src, 'com_family');
    const able = extract_register_ids(src, 'com_able_family');
    if (com.size === 0 && able.size === 0) {
      continue;
    }
    out.set(name.replace(/\.js$/, ''), { com, able });
  }
  return out;
}

function union_ids(by_module, field) {
  const ids = new Set();
  for (const sets of by_module.values()) {
    sets[field].forEach((id) => ids.add(id));
  }
  return ids;
}

function registered_ids(family, declared) {
  return new Set(declared.filter((id) => family.has(id)));
}

function format_missing(label, missing) {
  return (
    `${label}漏装：` +
    missing
      .map(({ mod, lost }) => `${mod}（COM ${lost.join(', ')}）`)
      .join('；')
  );
}

function missing_modules(expected_by_module, field, actual) {
  const missing = [];
  for (const [mod, sets] of expected_by_module) {
    const lost = [...sets[field]]
      .filter((id) => !actual.has(id))
      .sort((a, b) => a - b);
    if (lost.length > 0) {
      missing.push({ mod, lost });
    }
  }
  return missing;
}

function extra_ids(expected, actual) {
  return [...actual].filter((id) => !expected.has(id)).sort((a, b) => a - b);
}

test('源码扫描能拿到每个族模块的 COM / COM_ABLE 号，循环注册不漏', () => {
  const by_module = scan_family_modules();
  // 抽查三种写法各一份，防止扫描器自己漂成空集还全绿
  assert.deepEqual(
    [...by_module.get('com-cloth').com].sort((a, b) => a - b),
    [110, 111],
  );
  assert.deepEqual(
    [...by_module.get('com-caress').com].sort((a, b) => a - b),
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  );
  assert.deepEqual(
    [...by_module.get('com-colosseum').com].sort((a, b) => a - b),
    [200, 201, 202, 203, 204, 205, 206, 207],
  );
  assert.deepEqual(
    [...by_module.get('com-colosseum').able].sort((a, b) => a - b),
    [200, 201, 202, 203, 204, 205, 206, 207],
  );
  assert.ok(by_module.has('com-sm'));
  assert.ok(by_module.has('com-hardcore'));
  assert.ok(by_module.has('com-special'));
  assert.ok(by_module.has('com-service'));
});

test('主启动图加载 main-loop 后，COM / COM_ABLE 注册号等于族模块并集', () => {
  // 漏装时报「主启动图漏装：com-cloth」——M1370 的 must_mention 锚
  const expected_by_module = scan_family_modules();
  const expected_com = union_ids(expected_by_module, 'com');
  const expected_able = union_ids(expected_by_module, 'able');

  const fixture = create_era_fixture();
  fixture.load_module('system/flow/main-loop');
  const { DECLARED_COM_IDS, com_able_family, com_family } = fixture.load_module(
    'system/train/com-family',
  );
  const actual_com = registered_ids(com_family, DECLARED_COM_IDS);
  const actual_able = registered_ids(com_able_family, DECLARED_COM_IDS);

  const missing_com = missing_modules(expected_by_module, 'com', actual_com);
  assert.equal(missing_com.length, 0, format_missing('主启动图', missing_com));
  const missing_able = missing_modules(expected_by_module, 'able', actual_able);
  assert.equal(
    missing_able.length,
    0,
    format_missing('主启动图 COM_ABLE', missing_able),
  );
  assert.deepEqual(
    extra_ids(expected_com, actual_com),
    [],
    '主启动图多出未扫到的 COM 号',
  );
  assert.deepEqual(
    extra_ids(expected_able, actual_able),
    [],
    '主启动图多出未扫到的 COM_ABLE 号',
  );
});

test('回放清单加载 TRAIN_PATH_MODULES 后，COM / COM_ABLE 注册号等于族模块并集', () => {
  // 漏装时报「回放清单漏装：com-service」——M1371 的 must_mention 锚
  const expected_by_module = scan_family_modules();
  const expected_com = union_ids(expected_by_module, 'com');
  const expected_able = union_ids(expected_by_module, 'able');

  const fixture = create_era_fixture();
  TRAIN_PATH_MODULES.forEach((name) => fixture.load_module(name));
  const { DECLARED_COM_IDS, com_able_family, com_family } = fixture.load_module(
    'system/train/com-family',
  );
  const actual_com = registered_ids(com_family, DECLARED_COM_IDS);
  const actual_able = registered_ids(com_able_family, DECLARED_COM_IDS);

  const missing_com = missing_modules(expected_by_module, 'com', actual_com);
  assert.equal(missing_com.length, 0, format_missing('回放清单', missing_com));
  const missing_able = missing_modules(expected_by_module, 'able', actual_able);
  assert.equal(
    missing_able.length,
    0,
    format_missing('回放清单 COM_ABLE', missing_able),
  );
  assert.deepEqual(
    extra_ids(expected_com, actual_com),
    [],
    '回放清单多出未扫到的 COM 号',
  );
  assert.deepEqual(
    extra_ids(expected_able, actual_able),
    [],
    '回放清单多出未扫到的 COM_ABLE 号',
  );
});
