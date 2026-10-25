/**
 * @file 调教域静态表的引擎行为测试（issue #43；#640 起只留 yml 侧行为）。
 *
 * 不用夹具（记录层证明不了「引擎接受」），不用自写镜像（会与引擎不一致），全部经
 * test/helpers/engine-bundle.js 驱动 app.asar 里的 parseDataFile 与 eraStart
 * 变量表装载分支（转写），钉住：
 *   - **Juel 不单独成表**：装载循环里 param/palam 两个文件名落到同一
 *     分支、共同装进 staticData.juel 一张名字表（juel/jewel 等文件名是
 *     受保护表名，警告后不读），寻址层 palam/param/jewel 同查它。
 *
 * 调教指令的名称自 #836 起是脚本里的常量（ere/data/train-command-const.js），
 * 不再有 traincommand 静态表，原先钉住「调教指令表叫 traincommand、读未声明
 * 序号的名字抛错」的两段引擎行为随表一起删除。
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
    // 开发套件键 k 取自条目的 name（Palam 全表自 #901 起登记）；条目没写 name
    // 时才是引擎的缺省前缀 param + 序号——拿一段不带 name 的文本钉住后半句
    assert.deepEqual(loader.field_names.juel[0], {
      n: '阴核',
      k: 'clitoris',
      t: 'number',
    });
    const unnamed = load_table('"试验":\n  id: 0\n', 'yml', 'palam');
    assert.deepEqual(unnamed.field_names.juel[0], {
      n: '试验',
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
