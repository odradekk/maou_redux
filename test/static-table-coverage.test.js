/**
 * @file 静态表覆盖回归锁：游戏代码用到的每一个三段寻址族，`yml/` 里都得有
 * 对应的名字表（issue #42 实机缺陷）。
 *
 * 缘由：引擎的三段寻址在 **`data[表][角色]` 存在、而 `staticData[表]` 缺位**
 * 时**直接抛错**——app.asar 的 setVar 兜底分支是
 * `u = i(this.staticData[a][u], u)`，没有守卫。调教域的表由
 * `beginTrain` / `addCharacter` 按角色开桶，所以桶一定在，崩就崩在名字表
 * 这一侧。实机撞见：调教开始时写 `stain:31:2` 报
 * `Cannot read properties of undefined (reading '2')`（stain/ex/cstr/tequip
 * 四张表当时都缺）。
 *
 * 这一类缺陷夹具看不见（夹具只记调用，不查静态表），单元测试也看不见
 * （各用例只播自己要的那张表）。所以本文件**从游戏源码里扫出寻址族**，
 * 再用引擎自己的 `setVar` 逐个探一遍——新写一个族而忘了配表，会在这里红，
 * 而不是等实机崩。
 *
 * 引擎不在场（无 app.asar）时整文件 skip。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const {
  create_variable_loader,
  load_engine_bundle,
} = require('./helpers/engine-bundle');

const engine = load_engine_bundle();
const engine_test = engine ? test : test.skip;

const REPO_ROOT = path.resolve(__dirname, '..');
const ERE_DIR = path.join(REPO_ROOT, 'ere');
const YML_DIR = path.join(REPO_ROOT, 'yml');

// 角色表产物不进变量装载路径（它们走 chara 分支）
const CHARA_PRODUCT = /^Chara\d+\.yml$/;
// 这些族不经「staticData[表名]」翻译，另有归属（引擎寻址层的显式 case）：
//   palam/param/gotjuel/delta → staticData.juel；nowex → staticData.ex；
//   base/maxbase/deltabase → staticData.base；item* → staticData.item
const ALIASED = new Map([
  ['palam', 'juel'],
  ['param', 'juel'],
  ['gotjuel', 'juel'],
  ['gotjewel', 'juel'],
  ['jewel', 'juel'],
  ['delta', 'juel'],
  ['nowex', 'ex'],
  ['maxbase', 'base'],
  ['deltabase', 'base'],
]);
// 二段寻址或另有落点，不吃 staticData[表]：flag/global 走各自 case；
// callname/relation/no 是受保护内置；itemsales 走 item 分支；
// *name 是「取名字」的读法，查的是被去掉后缀的那张表
const NOT_THREE_PART = new Set([
  'flag',
  'global',
  'callname',
  'relation',
  'itemsales',
  'no',
  'ex_talent', // 无 data 桶：写入静默丢弃（#21 已知，落表前不崩）
]);

/** 递归收集 ere/ 下的 .js */
function walk_js(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk_js(full, out);
    } else if (entry.name.endsWith('.js')) {
      out.push(full);
    }
  }
  return out;
}

/** 从游戏源码里扫出 era.get/set/add 的寻址族前缀 */
function collect_addressed_tables() {
  const found = new Set();
  for (const file of walk_js(ERE_DIR)) {
    // era-electron.js 是引擎 SDK，其 JSDoc 里的例子不算游戏代码
    if (path.basename(file) === 'era-electron.js') {
      continue;
    }
    const body = fs.readFileSync(file, 'utf8');
    for (const m of body.matchAll(/era\.(?:get|set|add)\(`([a-z_]+):/g)) {
      found.add(m[1]);
    }
  }
  return [...found].sort();
}

/** 按 yml/ 现状走引擎的变量装载路径，得到 staticData */
function load_all_products() {
  const loader = create_variable_loader();
  for (const file of fs.readdirSync(YML_DIR)) {
    if (!file.endsWith('.yml') || CHARA_PRODUCT.test(file)) {
      continue;
    }
    const table = file.replace(/\.yml$/, '').toLowerCase();
    if (table === 'gamebase') {
      continue;
    }
    const text = fs.readFileSync(path.join(YML_DIR, file), 'utf8');
    loader.load_rows(engine.parse_data_file(text, 'yml', table), table);
  }
  return loader;
}

engine_test(
  '游戏代码用到的每个三段寻址族，yml/ 都有对应名字表（缺表即实机直接崩溃）',
  () => {
    const loader = load_all_products();
    const addressed = collect_addressed_tables();
    // 扫描本身要有产出——正则失效会让整条断言退化成空转
    assert.ok(
      addressed.length >= 10,
      `从 ere/ 扫出的寻址族只有 ${addressed.length} 个，扫描八成失效了`,
    );

    const missing = [];
    for (const table of addressed) {
      const base = table.replace(/name$/, '');
      const key = ALIASED.get(base) ?? base;
      if (NOT_THREE_PART.has(base) || NOT_THREE_PART.has(table)) {
        continue;
      }
      if (!loader.static_data[key]) {
        missing.push(`${table} → staticData.${key}`);
      }
    }
    assert.deepEqual(
      missing,
      [],
      `这些寻址族在 yml/ 里没有名字表，三段写入会在实机上抛错：\n  ${missing.join('\n  ')}`,
    );
  },
);

engine_test('引擎实证：缺名字表时三段寻址直接崩溃（本锁存在的理由）', () => {
  const loader = load_all_products();
  const cid = 31;
  const data = { stain: { [cid]: {} } };
  const fake = {
    staticData: { ...loader.static_data },
    fieldNames: loader.field_names,
    data,
    global: {},
    extendedTables: {},
    era: { error: () => {} },
  };
  // 表在：正常写入
  assert.equal(engine.set_var.call(fake, `stain:${cid}:2`, 2), 2);
  // 抽掉名字表：同一句直接抛错（实机撞见的那一条）
  delete fake.staticData.stain;
  assert.throws(
    () => engine.set_var.call(fake, `stain:${cid}:2`, 2),
    /Cannot read properties of undefined \(reading '2'\)/,
  );
});
