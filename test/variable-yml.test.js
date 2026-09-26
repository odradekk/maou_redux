/**
 * @file 变量表装载的引擎行为测试（issue #38；#640 起只留 yml 侧行为）。
 *
 * 不用夹具（记录层证明不了「引擎接受」），不用自写镜像（会漂移），全部经
 * test/helpers/engine-bundle.js 驱动 app.asar 里的 parseDataFile 与 eraStart
 * 变量表装载分支（转写），钉住：
 *   - yml/Base.yml（人工表）装载后的形状符合预期；
 *   - item* 寻址在表在场/缺席时的引擎行为（PR #34 直接崩溃的回归锁）；
 *   - item:PBAND 具名地址落空时读恒 undefined、写另立键（#552 的依据）。
 *
 * 引擎不在场（无 app.asar）时整文件 skip 并留警告。
 */

'use strict';

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

// 走引擎 yml 路径装载一份表
function load_yml_table(yml_text, table) {
  const loader = create_variable_loader();
  loader.load_rows(engine.parse_data_file(yml_text, 'yml', table), table);
  return loader;
}

// —— Base：人工表装载形状（base 同时定义 maxbase，驱动 addCharacter 预设） ——

engine_test('Base：人工表装载得到 6 个下标，名称→序号映射正确', () => {
  const product = fs.readFileSync(
    path.join(REPO_ROOT, 'yml', 'Base.yml'),
    'utf8',
  );
  const loader = load_yml_table(product, 'base');

  assert.deepEqual(loader.static_data.base, {
    体力: 0,
    气力: 1,
    射精槽: 2,
    母乳槽: 3,
    触手射精槽: 4,
    寿命: 10,
  });
  assert.deepEqual(loader.warnings, [], '人工表不应触发序号去重告警');
  // name/type 元数据进 fieldNames 的 k/t（#5 三层命名的落点）
  assert.deepEqual(loader.field_names.base[0], {
    n: '体力',
    k: 'stamina',
    t: 'number',
  });
  assert.deepEqual(loader.field_names.base[10], {
    n: '寿命',
    k: 'lifespan',
    t: 'number',
  });
});

// —— item* 寻址：表在场/缺席的引擎行为（PR #34 直接崩溃的回归锁） ——

engine_test(
  "引擎 setVar：无 Item 表时 itemsales 写入抛 reading 'name'（PR #34）",
  () => {
    const loader = create_variable_loader();
    // 修复前的 yml/ 状态：没有 Item.yml，staticData.item 不存在
    assert.equal(loader.static_data.item, undefined);
    const fake_this = {
      staticData: loader.static_data,
      data: { item: { sales: {} } },
      global: {},
      extendedTables: {},
    };
    assert.throws(
      () => engine.set_var.call(fake_this, 'itemsales:53', 1),
      /reading 'name'/,
      '静态表缺失时 item* 寻址必须直接崩溃——这是 PR #34 降级该写入的依据',
    );
  },
);

engine_test(
  '引擎 setVar：Item 表在场时 itemsales:53 = 1 落进 data.item.sales',
  () => {
    const product = fs.readFileSync(
      path.join(REPO_ROOT, 'yml', 'Item.yml'),
      'utf8',
    );
    const loader = load_yml_table(product, 'item');
    const fake_this = {
      staticData: loader.static_data,
      data: { item: { sales: {} } },
      global: {},
      extendedTables: {},
    };
    const result = engine.set_var.call(fake_this, 'itemsales:53', 1);
    assert.equal(result, 1);
    assert.equal(fake_this.data.item.sales[53], 1);
  },
);

engine_test(
  '引擎 setVar：item:PBAND 名字表查不到 → 读恒 undefined、写另立键（口上 25 处读错下标的依据，#552）',
  () => {
    // PBAND 是个内建非角色变量的名字（口上按 ITEM:PBAND 判助手是否持有
    // 假阳具）。引擎 setVar 的 item 分支按 staticData.item.name[下标] 翻译
    // 名字，yml/Item.yml 没有 PBAND 条目，翻译不中就原样回落，落到
    // data.item.hold['pband'] 这个不存在的键上。
    const product = fs.readFileSync(
      path.join(REPO_ROOT, 'yml', 'Item.yml'),
      'utf8',
    );
    const loader = load_yml_table(product, 'item');
    assert.ok(!('pband' in loader.static_data.item.name));
    assert.equal(loader.static_data.item.name['假阳具'], 4);
    const fake_this = {
      staticData: loader.static_data,
      data: { item: { hold: {}, price: {}, sales: {} } },
      global: {},
      extendedTables: {},
    };
    fake_this.data.item.hold[4] = 1; // 助手持有假阳具（era.set('item:4', 1)）
    assert.equal(engine.set_var.call(fake_this, 'item:4'), 1);
    assert.equal(
      engine.set_var.call(fake_this, 'item:PBAND'),
      undefined,
      '具名地址在名字表与数据桶里都落空，必须读到 undefined——持有假阳具也判不出',
    );
    // 写侧同样另立门户：era.set('item:PBAND', 1) 落 hold['pband']，与 hold[4]
    // 互不相通（写未声明的名字会静默建变量，在 item 族的形态）
    engine.set_var.call(fake_this, 'item:PBAND', 1);
    assert.deepEqual(Object.keys(fake_this.data.item.hold), ['4', 'pband']);
  },
);
