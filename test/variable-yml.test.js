/**
 * @file 变量表迁移的引擎对拍测试（issue #38）。
 *
 * 与 test/chara-yml.test.js 同构的验证路线：不用夹具（记录层证明不了
 * 「引擎接受」），不用自写镜像（会漂移），全部经 test/helpers/engine-bundle.js
 * 驱动 app.asar 里的 parseDataFile 与 eraStart 变量表装载分支（转写），
 * 回答验收的核心问题——**引擎自己的代码**读到 yml/Talent.yml、yml/Item.yml
 * 后得到的静态数据与读源 CSV 是否逐字段一致；yml/Base.yml（人工表）装载
 * 后的形状是否符合预期；item* 寻址在表在场/缺席时的引擎行为（PR #34 硬崩
 * 的回归锁）。
 *
 * 已知并钉死的一处偏差：Item.csv 有 5 对重名（1000-1004 与 1005-1009，
 * 名称与价格完全相同）。引擎 csv 路径 name→id 后者覆盖、序号各自保留；
 * yml 以名称为键无法表达同名双序号，产物保留后者（见 Item.yml 头注与
 * issue #38 评论）。对拍用「csv 侧状态剔除被合并序号」作为期望，剔除集
 * 由转换器返回的 dropped 逐点断言——偏差集有任何意外扩大都会红。
 *
 * 引擎不在场（无 app.asar）时整文件 skip 并留警告。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const {
  create_variable_loader,
  load_engine_bundle,
} = require('./helpers/engine-bundle');
const { parse_variable_csv, read_text } = require('../tools/csv-to-yml');

const engine = load_engine_bundle();
const engine_test = engine ? test : test.skip;

const REPO_ROOT = path.resolve(__dirname, '..');
const CSV_DIR = path.join(REPO_ROOT, 'target', 'CSV');

// deepEqual 的布尔版（diff_ids 用；assert.deepEqual 抛错而非返回值）
const deep_equal = (a, b) => {
  try {
    assert.deepEqual(a, b);
    return true;
  } catch {
    return false;
  }
};

// 走引擎 csv 路径装载一份表
function load_csv_table(csv_text, table) {
  const loader = create_variable_loader();
  loader.load_rows(engine.parse_data_file(csv_text, 'csv', table), table);
  return loader;
}

// 走引擎 yml 路径装载一份表
function load_yml_table(yml_text, table) {
  const loader = create_variable_loader();
  loader.load_rows(engine.parse_data_file(yml_text, 'yml', table), table);
  return loader;
}

// —— Talent：无重复，两条加载路径逐字段一致（验收项） ——

engine_test('Talent：产物经引擎装载的结果与源 CSV 逐字段一致', () => {
  const { text } = read_text(path.join(CSV_DIR, 'Talent.csv'));
  const { entries, dropped, warnings } = parse_variable_csv(text, {
    table: 'talent',
  });
  assert.deepEqual(dropped, [], 'Talent.csv 实测无重名，出现即需人工核读');
  assert.deepEqual(
    warnings,
    [],
    'Talent.csv 实测无截断/重名告警，出现即需人工核读',
  );
  assert.equal(entries.length, 267, 'Talent.csv 转换后应为 267 条');

  const product = fs.readFileSync(
    path.join(REPO_ROOT, 'yml', 'Talent.yml'),
    'utf8',
  );
  const from_csv = load_csv_table(text, 'talent');
  const from_yml = load_yml_table(product, 'talent');

  // 名称 → 序号（staticData：era.get('talent:名称') 的翻译层）
  assert.deepEqual(from_yml.static_data.talent, from_csv.static_data.talent);
  // 序号 → 名称 + 开发套件 k/t（fieldNames：itemname/*name 寻址的数据源）
  assert.deepEqual(from_yml.field_names.talent, from_csv.field_names.talent);
  // 点名几条：id 1 = 童贞（Chara0 的素質 1 预设指向它）
  assert.equal(from_yml.static_data.talent['童贞'], 1);
  assert.equal(from_yml.static_data.talent['男人'], 122);
  assert.deepEqual(from_yml.field_names.talent[1], {
    n: '童贞',
    k: 'talent1',
    t: 'number',
  });
});

// —— Item：重名合并偏差集逐点钉死，其余逐字段一致（验收项） ——

engine_test(
  'Item：产物与源 CSV 一致（重名合并的 5 个序号除外，逐点钉死）',
  () => {
    const { text } = read_text(path.join(CSV_DIR, 'Item.csv'));
    const { dropped, warnings } = parse_variable_csv(text, { table: 'item' });

    // 偏差集 = 转换器申报的重名合并：恰好 5 对，先出现的序号被并入后者
    assert.deepEqual(
      dropped.map((entry) => [entry.id, entry.name]),
      [
        [1000, '十字军战士'],
        [1001, '十字军神官'],
        [1002, '十字军骑士'],
        [1003, '十字军法师'],
        [1004, '十字军猎手'],
      ],
      '重名合并集与 issue #38 登记的 5 对不一致，产物语义变了',
    );
    // 第 4 列非注释（序号 28）的告警恰好一条
    assert.equal(
      warnings.filter((warning) => warning.includes('第 4 列')).length,
      1,
    );

    const product = fs.readFileSync(
      path.join(REPO_ROOT, 'yml', 'Item.yml'),
      'utf8',
    );
    const from_csv = load_csv_table(text, 'item');
    const from_yml = load_yml_table(product, 'item');

    // 名称 → 序号：两条路径完全一致（含重名对取后者的语义）
    assert.deepEqual(
      from_yml.static_data.item.name,
      from_csv.static_data.item.name,
      'name→id 映射必须逐字段一致（含 5 对重名取后者）',
    );
    assert.equal(from_yml.static_data.item.name['十字军战士'], 1005);

    // 序号 → 价格 / fieldNames 的实际差集必须恰好等于预报差集（两类）：
    //   a) 重名合并——被并入后者的 5 个序号在 yml 路径整体消失；
    //   b) 序号 28 的开发套件键 k——csv 第 4 列非注释文本被引擎记进 k，
    //      产物按文档形状不写该列，回落缺省 item28（n/t 不受影响）。
    // 差集之外多一条、少一条、错一条都会在这里红——偏差不允许静默扩大。
    const dropped_ids = new Set(dropped.map((entry) => entry.id));
    const diff_ids = (yml_obj, csv_obj) => {
      const diffs = [];
      for (const key of Object.keys(csv_obj)) {
        if (!deep_equal(yml_obj[key], csv_obj[key])) {
          diffs.push(Number(key));
        }
      }
      for (const key of Object.keys(yml_obj)) {
        if (!(key in csv_obj)) {
          diffs.push(Number(key));
        }
      }
      return diffs.sort((a, b) => a - b);
    };
    assert.deepEqual(
      diff_ids(
        from_yml.static_data.item.price,
        from_csv.static_data.item.price,
      ),
      [...dropped_ids].sort((a, b) => a - b),
      '价格映射的差集必须恰好是重名合并集',
    );
    assert.deepEqual(
      diff_ids(from_yml.field_names.item, from_csv.field_names.item),
      [28, ...[...dropped_ids].sort((a, b) => a - b)],
      'fieldNames 的差集必须恰好是 {k 差异的 28} ∪ 重名合并集',
    );
    // 偏差 a 的形态：被合并序号在 yml 路径确实不可寻址（偏差是真实的）
    assert.equal(from_yml.field_names.item[1000], undefined);
    assert.equal(from_yml.static_data.item.price[1000], undefined);
    assert.equal(from_yml.field_names.item[1005].n, '十字军战士');
    // 偏差 b 的形态：28 号仅 k 不同（csv 侧是第 4 列原文，yml 侧是缺省键）
    assert.equal(
      from_csv.field_names.item[28].k,
      'ビデオカメラの使用に必要。使い捨て',
    );
    assert.equal(from_yml.field_names.item[28].k, 'item28');
    assert.equal(
      from_yml.field_names.item[28].n,
      from_csv.field_names.item[28].n,
    );
    assert.equal(
      from_yml.field_names.item[28].t,
      from_csv.field_names.item[28].t,
    );
    // 保留序号的价格逐条抽查（含首个与最后一个）
    assert.equal(from_yml.static_data.item.price[0], 200);
    assert.equal(from_yml.static_data.item.price[1009], 1);
  },
);

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

// —— item* 寻址：表在场/缺席的引擎行为（PR #34 硬崩的回归锁） ——

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
      '静态表缺失时 item* 寻址必须硬崩——这是 PR #34 降级该写入的依据',
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
