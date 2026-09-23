/**
 * @file ere/era-utils/era-modsave.js 的行为测试（issue #547：魔改使用.ERH 的
 * 两个单档 SAVEDATA 变量落 yml/ModSave.yml 扩展普通表）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点，issue #16）。
 * 形状对照 test/era-global.test.js（#18）与 resource-media.test.js 的
 * Audio.yml 引擎装载用例（#69）。
 *
 * 覆盖四层：
 *   1. 未初始化读取返回 0（#13 引擎行为 + 包装层 `|| 0` 缺值处理）；
 *   2. 两个设置页变量的读写、循环/翻转业务方法（CONFIG.ERB:273-285）；
 *   3. 存档语义：modsave:* 随 saveData 落快照、loadData 整体替换后保持
 *      （#DIM SAVEDATA 的 ere 等价物，与 global:* 的跨档共享对照）；
 *   4. 引擎比对：ModSave.yml 用引擎自己的解析器装载后 setVar 接受
 *      modsave: 寻址（扩展普通表路径，Audio.yml 同款）。
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

const REPO_ROOT = path.resolve(__dirname, '..');

test('未初始化读取返回 0 而非 undefined（#13 引擎行为 + 包装层缺值处理）', () => {
  const fixture = create_era_fixture();
  const era_modsave = fixture.load_module('era-utils/era-modsave');

  assert.equal(era_modsave.prostitution_effect, 0);
  assert.equal(era_modsave.anti_cheat, 0);
  for (const value of [
    era_modsave.prostitution_effect,
    era_modsave.anti_cheat,
  ]) {
    assert.equal(typeof value, 'number');
  }
});

test('两个变量经包装层写入并读回（数字下标寻址，#5 决议）', () => {
  const fixture = create_era_fixture();
  const era_modsave = fixture.load_module('era-utils/era-modsave');

  era_modsave.prostitution_effect = 2;
  era_modsave.anti_cheat = 1;

  assert.equal(era_modsave.prostitution_effect, 2);
  assert.equal(era_modsave.anti_cheat, 1);
  assert.deepEqual(fixture.var_writes, [
    { name: 'modsave:0', value: 2 },
    { name: 'modsave:1', value: 1 },
  ]);
  assert.equal(fixture.store.get('modsave:0'), 2);
  assert.equal(fixture.store.get('modsave:1'), 1);
});

test('cycle_prostitution_effect：0→1→2→0 三档循环（CONFIG.ERB:273-278）', () => {
  const fixture = create_era_fixture();
  const era_modsave = fixture.load_module('era-utils/era-modsave');

  assert.equal(era_modsave.cycle_prostitution_effect(), 1);
  assert.equal(era_modsave.cycle_prostitution_effect(), 2);
  assert.equal(era_modsave.cycle_prostitution_effect(), 0);
  assert.equal(fixture.store.get('modsave:0'), 0);
});

test('toggle_anti_cheat：0↔1 翻转（CONFIG.ERB:281-285）', () => {
  const fixture = create_era_fixture();
  const era_modsave = fixture.load_module('era-utils/era-modsave');

  assert.equal(era_modsave.toggle_anti_cheat(), 1);
  assert.equal(era_modsave.toggle_anti_cheat(), 0);
  assert.equal(fixture.store.get('modsave:1'), 0);
});

// —— 存档语义（#547 验收：三个魔改变量能存档、读档后保持）——
//
// modsave 是扩展普通表：saveData 整存 this.data、loadData 整体替换——与
// #DIM SAVEDATA 一致（yml/ModSave.yml 头注）。对照组是 global:*（冒険者性別
// 所在表）：global 不随档走，loadData 后保持现值而非快照值。

test('modsave 两变量：存档 → 改值 → 读档恢复快照值', async () => {
  const fixture = create_era_fixture();
  const era_modsave = fixture.load_module('era-utils/era-modsave');

  era_modsave.prostitution_effect = 2;
  era_modsave.anti_cheat = 1;
  await fixture.era.saveData(0, 'test');
  // 读档前把现场改掉（模拟继续游玩后的变更）
  era_modsave.prostitution_effect = 0;
  era_modsave.anti_cheat = 0;

  assert.equal(await fixture.era.loadData(0), true);
  assert.equal(era_modsave.prostitution_effect, 2, '读档恢复卖淫影响');
  assert.equal(era_modsave.anti_cheat, 1, '读档恢复反作弊');
});

// —— 引擎比对（引擎不在场整组跳过，跳过数进 test/engine-skip-baseline.txt）——

const engine = load_engine_bundle();
const engine_test = engine ? test : test.skip;

engine_test(
  'ModSave.yml 经引擎装载后 setVar 接受 modsave: 寻址（扩展普通表路径）',
  () => {
    const loader = create_variable_loader();
    const text = fs.readFileSync(
      path.join(REPO_ROOT, 'yml', 'ModSave.yml'),
      'utf8',
    );
    loader.load_rows(engine.parse_data_file(text, 'yml', 'modsave'), 'modsave');

    // 名字表在：中文名 → id 的映射按引擎装载路径成立
    assert.deepEqual(loader.static_data.modsave, {
      卖淫影响: 0,
      反作弊: 1,
    });

    // 桶在（引擎侧由 fillData 自动建，此处按同形状提供）+ 扩展普通表注册
    // → 二段寻址数字与名字两种写法都通过（app.asar setVar 的扩展表分支，
    // resource-media.test.js 的 Audio.yml 同款探针）
    const fake_this = {
      staticData: loader.static_data,
      data: { modsave: {} },
      extendedTables: { modsave: engine.era_api.tableType.normal },
      era: {
        error: (msg) => {
          throw new Error(msg);
        },
      },
    };
    assert.equal(engine.set_var.call(fake_this, 'modsave:0', 2), 2);
    assert.equal(engine.set_var.call(fake_this, 'modsave:反作弊', 1), 1);
    assert.deepEqual(fake_this.data.modsave, { 0: 2, 1: 1 });
  },
);
