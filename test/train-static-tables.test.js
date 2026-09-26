/**
 * @file 调教域静态表的引擎行为测试（issue #43；#640 起只留 yml 侧行为）。
 *
 * 不用夹具（记录层证明不了「引擎接受」），不用自写镜像（会漂移），全部经
 * test/helpers/engine-bundle.js 驱动 app.asar 里的 parseDataFile 与 eraStart
 * 变量表装载分支（转写），钉住：
 *   1. **Juel 不单独成表**：装载循环里 param/palam 两个文件名落到同一
 *      分支、共同装进 staticData.juel 一张名字表（juel/jewel 等文件名是
 *      受保护表名，警告后不读），寻址层 palam/param/jewel 同查它；
 *   2. **调教指令表叫 traincommand**：train 是引擎弃用表名（装载时警告并
 *      跳过）、trainname 会被寻址层的 name 后缀规则拆成「train 表的名字
 *      查询」而 train 表不存在（寻址落到兜底分支、引擎报 key error in
 *      getter/setter）——#5 的 Train.yml 与 #10 的 TrainName.yml 都是死表。
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
function load_table(text, format, table) {
  const loader = create_variable_loader();
  loader.load_rows(engine.parse_data_file(text, format, table), table);
  return loader;
}

// —— Palam → juel 共用名字表：「Juel 是否单独成表」的引擎实证 ——

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
  '寻址比对：palam/param/jewel 三族寻址都经 juel 名字表翻译（JUEL 不落表的运行时证据）',
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
    // 引擎寻址：palam/param 归一互为别名、jewel 归一为 juel；
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

// —— TrainCommand：表名可寻址性的比对锁 ——

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
