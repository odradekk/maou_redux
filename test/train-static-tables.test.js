/**
 * @file 调教域静态表的引擎对拍测试（issue #43）。
 *
 * 与 test/variable-yml.test.js 同构的验证路线：不用夹具（记录层证明不了
 * 「引擎接受」），不用自写镜像（会漂移），全部经 test/helpers/engine-bundle.js
 * 驱动 app.asar 里的 parseDataFile 与 eraStart 变量表装载分支（转写），
 * 回答验收的核心问题——**引擎自己的代码**读到六张产物（Palam / Source /
 * Abl / Exp / Mark / TrainCommand）后得到的静态数据与读源 CSV 是否逐字段
 * 一致。
 *
 * 票面两个设计问题的引擎侧答案钉在这里：
 *   1. **Juel 不单独成表**：装载循环里 param/palam 两个文件名落到同一
 *      分支、共同装进 staticData.juel 一张名字表（juel/jewel 等文件名是
 *      受保护表名，警告后不读），寻址层 palam/param/jewel 同查它——
 *      Emuera 里 JUEL 与 PALAM 共用名字表，引擎侧同样成立（依据详见
 *      issue #43 评论与 dev-guides/09-static.md:298-305）；
 *   2. **调教指令表叫 traincommand**：train 是引擎弃用表名（装载时警告并
 *      跳过）、trainname 会被寻址层的 name 后缀规则拆成「train 表的名字
 *      查询」而 train 表不存在（寻址落到兜底分支、引擎报 key error in
 *      getter/setter）——#5 的 Train.yml 与 #10
 *      的 TrainName.yml 都是死表，实测留痕见 issue #43 评论。
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

// 六张表清单：源文件、表名、产物名、条目数。产物名与表名不同的唯一一例是
// traincommand（源 Train.csv，改名依据见文件头）。条目数是实测值——源是
// 只读输入，数目变动即需人工核读（转换器零告警地少一条也会在这里红）。
const TABLES = [
  { source: 'Palam.csv', table: 'palam', product: 'Palam.yml', entries: 17 },
  { source: 'source.csv', table: 'source', product: 'Source.yml', entries: 18 },
  { source: 'Abl.csv', table: 'abl', product: 'Abl.yml', entries: 28 },
  { source: 'exp.csv', table: 'exp', product: 'Exp.yml', entries: 46 },
  { source: 'Mark.csv', table: 'mark', product: 'Mark.yml', entries: 5 },
  {
    source: 'Train.csv',
    table: 'traincommand',
    product: 'TrainCommand.yml',
    entries: 101,
  },
];

// 走引擎两条静态装载路径各装一份表（csv 分支吃源文本，yml 分支吃产物文本）
function load_table(text, format, table) {
  const loader = create_variable_loader();
  loader.load_rows(engine.parse_data_file(text, format, table), table);
  return loader;
}

// —— 六张表：产物装载结果与源 CSV 逐字段一致（验收项） ——

for (const { source, table, product, entries } of TABLES) {
  engine_test(
    `${product}：产物经引擎装载的结果与源 CSV 逐字段一致（${entries} 条）`,
    () => {
      const { text } = read_text(path.join(CSV_DIR, source));
      const parsed = parse_variable_csv(text, { table });
      // 六张源表实测无重名、无重号、无列截断：转换器申报的偏差集必须为空，
      // 出现任何一条都意味着源表与 #43 调查时的认知不符，需人工核读
      assert.deepEqual(
        parsed.dropped,
        [],
        `${source} 实测无重名，出现即需人工核读`,
      );
      assert.deepEqual(
        parsed.warnings,
        [],
        `${source} 实测无截断/重名/重号告警，出现即需人工核读`,
      );
      assert.equal(parsed.entries.length, entries);

      const product_text = fs.readFileSync(
        path.join(REPO_ROOT, 'yml', product),
        'utf8',
      );
      const from_csv = load_table(text, 'csv', table);
      const from_yml = load_table(product_text, 'yml', table);

      // 名称 → 序号（staticData：era.get('<表>:<名称>') 的翻译层）
      assert.deepEqual(
        from_yml.static_data,
        from_csv.static_data,
        `${product} 与 ${source} 的名称→序号映射不一致`,
      );
      // 序号 → 名称 + 开发套件 k/t（fieldNames：<表>name:* 寻址的数据源）
      assert.deepEqual(
        from_yml.field_names,
        from_csv.field_names,
        `${product} 与 ${source} 的序号→名称映射不一致`,
      );
      assert.deepEqual(
        from_yml.warnings,
        [],
        `${product} 装载不应触发序号去重告警`,
      );
    },
  );
}

// —— Palam → juel 共用名字表：票面「Juel 是否单独成表」的引擎实证 ——

engine_test(
  'Palam：装载落进 juel 共用名字表（staticData.juel，而非 .palam）',
  () => {
    const product_text = fs.readFileSync(
      path.join(REPO_ROOT, 'yml', 'Palam.yml'),
      'utf8',
    );
    const loader = load_table(product_text, 'yml', 'palam');

    // 装载落点：param/palam 分支写的是 juel 共用表；.palam 不存在
    assert.equal(loader.static_data.palam, undefined);
    assert.equal(loader.static_data.juel['阴核'], 0);
    assert.equal(loader.static_data.juel['否定'], 100);
    // 开发套件键 k 的缺省前缀是 param（引擎 param/palam 分支原文），不是表名
    assert.deepEqual(loader.field_names.juel[0], {
      n: '阴核',
      k: 'param0',
      t: 'number',
    });
  },
);

engine_test(
  '寻址对拍：palam/param/jewel 三族寻址都经 juel 名字表翻译名称（JUEL 不落表的运行时证据）',
  () => {
    const product_text = fs.readFileSync(
      path.join(REPO_ROOT, 'yml', 'Palam.yml'),
      'utf8',
    );
    const loader = load_table(product_text, 'yml', 'palam');
    // beginTrain 前的运行时形状：palam/juel 两族按角色各开一张空表
    const fake_this = {
      staticData: loader.static_data,
      fieldNames: loader.field_names,
      data: { palam: { 0: {} }, juel: { 0: {} } },
      global: {},
      extendedTables: {},
    };
    // 引擎寻址模块 648：palam/param 归一互为别名、jewel 归一为 juel；
    // 名称段统一经 staticData.juel 翻译（case"palam" 分支）
    assert.equal(
      engine.set_var.call(fake_this, 'palam:0:阴核', 11),
      11,
      'palam:0:阴核 必须经 juel 名字表翻到序号 0',
    );
    assert.equal(fake_this.data.palam[0][0], 11);
    assert.equal(
      engine.set_var.call(fake_this, 'param:0:屈服', 22),
      22,
      'param 是 palam 的别名，同一翻译层',
    );
    assert.equal(fake_this.data.palam[0][6], 22);
    assert.equal(
      engine.set_var.call(fake_this, 'jewel:0:欲情', 33),
      33,
      'jewel 是 juel 的别名，名称翻译同走 juel 名字表',
    );
    assert.equal(fake_this.data.juel[0][5], 33);
    // 序号 → 名称：palamname/paramname/jewelname 同查 fieldNames.juel
    assert.equal(engine.set_var.call(fake_this, 'palamname:0'), '阴核');
    assert.equal(engine.set_var.call(fake_this, 'jewelname:5'), '欲情');
  },
);

// —— TrainCommand：表名可寻址性的对拍锁 ——

engine_test(
  'TrainCommand：三种寻址全通（train/trainname 两个死名的反例见 issue #43）',
  () => {
    const product_text = fs.readFileSync(
      path.join(REPO_ROOT, 'yml', 'TrainCommand.yml'),
      'utf8',
    );
    const loader = load_table(product_text, 'yml', 'traincommand');
    assert.equal(loader.static_data.traincommand['爱抚'], 0);
    assert.equal(loader.static_data.traincommand['死斗场'], 200);

    const fake_this = {
      staticData: loader.static_data,
      fieldNames: loader.field_names,
      data: { traincommand: { 0: 7 } },
      global: {},
      extendedTables: { traincommand: engine.era_api.tableType.normal },
    };
    // 指令菜单渲染的三种读法：按序号取值、按名称翻序号、按序号取名称。
    // 表名若叫 train（弃用名）产物整个不装载；若叫 trainname（name 后缀
    // 被寻址层拆解）前两种落到引擎兜底分支报 key error——两者都给不出这三行断言
    assert.equal(engine.set_var.call(fake_this, 'traincommand:0'), 7);
    assert.equal(
      engine.set_var.call(fake_this, 'traincommand:爱抚'),
      7,
      'traincommand:爱抚 必须经名字表翻到序号 0',
    );
    assert.equal(engine.set_var.call(fake_this, 'traincommandname:0'), '爱抚');
  },
);
