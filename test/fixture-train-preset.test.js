/**
 * @file 夹具按 yml 声明集预置调教域表（issue #977）。
 *
 * 引擎在建表/加角色时**按静态声明集预置值**，夹具此前不预置：读到的是
 * `undefined` 而真机是 `0`。`yml/TFlag.yml` 等从空表登记成几百条之后，这个
 * 偏差开始骗人——守卫 `era.get('tequip:31:89') === 0` 在测试里恒假、在真机
 * 上恒真（#830 登记 `TEquip.yml` 后初次变活，#977 补上夹具这一侧）。
 *
 * 本文件钉住四条镜像（引擎原文见 test/helpers/era-fixture.js 的对应段）：
 *   ① `beginTrain` 重建 tequip 表时把 `TFlag.yml` 的声明序号置 0；
 *   ② `addCharacterForTrain` 逐角色把 `tequip` / `tcvar` / `source` / `stain`
 *     与 `ex` / `nowex` 的声明序号置 0；
 *   ③ `addCharacter` 把 `cstr` 的声明序号置**空串**（字符串表，不是 0）；
 *   ④ `resetData` / `loadData` 共用的 `fillData` 口径：`flag` 的声明序号
 *     缺值补 0，写过的值不动。
 *
 * 判据是「yml 解析出至少一条条目」，不是「文件存在」：只有注释的空表在引擎
 * 眼里同样没有声明集（#970 的分界）。项目里 `tcvar` 连 `TCvar.yml` 都没有，
 * 引擎的 `staticData.tcvar` 因此是 undefined——同名地址在夹具里必须仍读
 * undefined，而不是被「有这张表」的存在性预置成 0。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara } = require('./helpers/chara');
const { yml_declared_ids } = require('./helpers/static-names');

const CID = 31; // 琼：调教域测试的常用角色

/** 声明集必须是「解析出条目」的那一份，否则下面的断言是空转 */
function declared(table) {
  const ids = yml_declared_ids(table);
  assert.ok(
    ids !== undefined && ids.size > 0,
    `${table} 的 yml 必须解析出条目——空表算无声明集`,
  );
  return [...ids].sort((a, b) => a - b);
}

/** 建一个「31 号在训」的世界 */
function train_world() {
  const fixture = create_era_fixture();
  join_slave_chara(fixture, CID, '琼');
  fixture.era.beginTrain(CID);
  return fixture;
}

// —— ① beginTrain 的 tflag ——

test('beginTrain 把 TFlag.yml 的声明序号预置成 0', () => {
  const fixture = create_era_fixture();
  fixture.era.beginTrain(CID);

  // 抽查：0 号、30（主人经验计数器）、45（口塞计数）、402（死斗场收入）、
  // 899（失神）——`=== 0` / `!== undefined` 的守卫读的就是这些槽
  assert.equal(fixture.era.get('tflag:0'), 0, 'tflag:0 预置 0');
  assert.equal(fixture.era.get('tflag:30'), 0, 'tflag:30 预置 0');
  assert.equal(fixture.era.get('tflag:45'), 0, 'tflag:45 预置 0');
  assert.equal(fixture.era.get('tflag:402'), 0, 'tflag:402 预置 0');
  assert.equal(fixture.era.get('tflag:899'), 0, 'tflag:899 预置 0');
  // 全量：声明集里一个都不能少
  for (const id of declared('tflag')) {
    assert.equal(fixture.era.get(`tflag:${id}`), 0, `tflag:${id} 预置 0`);
  }
});

test('beginTrain 不预置声明集之外的 tflag（33 仍读 undefined）', () => {
  const fixture = create_era_fixture();
  fixture.era.beginTrain(CID);
  assert.ok(!declared('tflag').includes(33), '33 未登记进 TFlag.yml');
  assert.equal(
    fixture.era.get('tflag:33'),
    undefined,
    '未声明的序号没有这一格（引擎侧同样 undefined）',
  );
});

test('同场重复 beginTrain 不重置 tflag（只在 tequip 表缺失时预置）', () => {
  const fixture = train_world();
  fixture.era.set('tflag:30', 4);
  fixture.era.beginTrain(CID);
  assert.equal(
    fixture.era.get('tflag:30'),
    4,
    '引擎的 `this.data.tequip || (…)` 短路：表在就不重建、不清值',
  );
});

test('endTrain 删表后 tflag 读 undefined，下一次 beginTrain 重新预置 0', () => {
  const fixture = train_world();
  fixture.era.endTrain();
  assert.throws(
    () => fixture.era.get('tflag:30'),
    /key error/,
    '调教域表随 endTrain 消失（二段地址走引擎的缺省分支）',
  );
  fixture.era.beginTrain(CID);
  assert.equal(fixture.era.get('tflag:30'), 0, '重建时重新按声明集补 0');
});

// —— ② addCharacterForTrain 的逐角色表 ——

test('addCharacterForTrain 逐角色预置 tequip / tcvar / source / stain 为 0', () => {
  const fixture = train_world();

  // tequip：45 口塞 / 89 兽奸 / 90 触手 是 `=== 0` 守卫依赖的三格
  assert.equal(fixture.era.get('tequip:31:45'), 0, 'tequip:31:45 预置 0');
  assert.equal(fixture.era.get('tequip:31:89'), 0, 'tequip:31:89 预置 0');
  assert.equal(fixture.era.get('tequip:31:90'), 0, 'tequip:31:90 预置 0');
  assert.equal(fixture.era.get('stain:31:2'), 0, 'stain:31:2 预置 0');
  assert.equal(fixture.era.get('source:31:18'), 0, 'source:31:18 预置 0');
  for (const id of declared('tequip')) {
    assert.equal(fixture.era.get(`tequip:${CID}:${id}`), 0, `tequip:${id}`);
  }
  for (const id of declared('stain')) {
    assert.equal(fixture.era.get(`stain:${CID}:${id}`), 0, `stain:${id}`);
  }
  for (const id of declared('source')) {
    assert.equal(fixture.era.get(`source:${CID}:${id}`), 0, `source:${id}`);
  }
  // 声明集之外的装备位（46 灌肠肛塞在源码里用到、TEquip.yml 没有）不预置
  assert.equal(
    fixture.era.get('tequip:31:46'),
    undefined,
    '未登记进 TEquip.yml 的 46 不预置',
  );
});

test('没有 TCvar.yml 的表一格都不预置（判据是解析出条目，不是文件存在）', () => {
  const fixture = train_world();
  assert.equal(yml_declared_ids('tcvar'), undefined, '项目里没有 TCvar.yml');
  assert.equal(
    fixture.era.get('tcvar:31:0'),
    undefined,
    '没有声明集就没有预置（引擎的 staticData.tcvar 同样不存在）',
  );
});

test('addCharacterForTrain 预置 ex / nowex（Ex.yml 的声明集）', () => {
  const fixture = train_world();
  assert.equal(fixture.era.get('ex:31:0'), 0, 'ex:31:0 预置 0');
  assert.equal(fixture.era.get('nowex:31:5'), 0, 'nowex:31:5 预置 0');
  for (const id of declared('ex')) {
    assert.equal(fixture.era.get(`ex:${CID}:${id}`), 0, `ex:${id}`);
    assert.equal(fixture.era.get(`nowex:${CID}:${id}`), 0, `nowex:${id}`);
  }
});

test('只给这次入训的角色预置，不给别人造行', () => {
  const fixture = train_world();
  fixture.seed_chara(32, { id: 32, name: '另一个' });
  fixture.era.addCharacter(32);
  assert.equal(
    fixture.era.get('tequip:32:45'),
    undefined,
    '32 号没入训，调教域没有它的格',
  );
  fixture.era.addCharacterForTrain(32);
  assert.equal(fixture.era.get('tequip:32:45'), 0, '入训后补上');
});

test('重复 addCharacterForTrain 不覆盖已写的值（引擎的 `!data.tequip[e]` 过滤）', () => {
  const fixture = train_world();
  fixture.era.set('tequip:31:45', 1); // 装着口塞
  fixture.era.addCharacterForTrain(CID);
  assert.equal(
    fixture.era.get('tequip:31:45'),
    1,
    '已在训的角色不再重建行（否则装备状态会被预置冲掉）',
  );
});

// —— ③ addCharacter 的 cstr ——

test('addCharacter 把 CStr.yml 的声明序号预置成空串（不是 0）', () => {
  const fixture = create_era_fixture();
  join_slave_chara(fixture, CID, '琼');

  const one = fixture.era.get('cstr:31:60');
  assert.equal(one, '', 'cstr:31:60 预置空串');
  assert.equal(typeof one, 'string', 'cstr:31:60 是字符串，不是数字 0');
  for (const id of declared('cstr')) {
    const value = fixture.era.get(`cstr:${CID}:${id}`);
    assert.equal(value, '', `cstr:${id} 预置空串`);
    assert.equal(typeof value, 'string', `cstr:${id} 是字符串表，不是数字 0`);
  }
  // 30 在源码里读写、CStr.yml 没有登记——不预置
  assert.equal(
    fixture.era.get('cstr:31:30'),
    undefined,
    '未登记进 CStr.yml 的 30 不预置',
  );
});

test('cstr 预设里有值时按预设落库，缺省才是空串', () => {
  const fixture = create_era_fixture();
  join_slave_chara(fixture, CID, '琼', { cstr: { 60: '朕' } });
  assert.equal(fixture.era.get('cstr:31:60'), '朕', '一人称取预设值');
  assert.equal(fixture.era.get('cstr:31:4'), '', '预设没给的那格仍是空串');
});

// —— ④ fillData 的 flag 口径（resetData / loadData 共用）——

test('resetData 按 Flag.yml 的声明集把 flag 补 0', () => {
  const fixture = create_era_fixture();
  fixture.era.resetData();
  assert.equal(fixture.era.get('flag:80'), 0, 'flag:80 补 0');
  assert.equal(fixture.era.get('flag:614'), 0, 'flag:614 补 0');
  for (const id of declared('flag')) {
    assert.equal(fixture.era.get(`flag:${id}`), 0, `flag:${id} 补 0`);
  }
});

test('resetData 不动已经写过的 flag', () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:80', 6);
  fixture.era.resetData();
  assert.equal(fixture.era.get('flag:80'), 6, 'fillData 的 `??=` 只补缺值');
});

test('loadData 读入旧档：登记的 flag 补 0，写过的值保留', async () => {
  const fixture = create_era_fixture();
  fixture.era.resetData();
  // 造一份「登记之前写出的档」：里面没有这些 flag 键
  for (const key of [...fixture.store.keys()]) {
    if (key.startsWith('flag:')) {
      fixture.store.delete(key);
    }
  }
  fixture.store.set('flag:614', 7);
  assert.equal(await fixture.era.saveData(1), true);

  fixture.era.resetData(); // 内存里恢复成有声明集的样子，读档时同样要补
  assert.equal(fixture.era.get('flag:80'), 0);
  assert.equal(await fixture.era.loadData(1), true);
  assert.equal(
    fixture.era.get('flag:80'),
    0,
    '档里没有的登记序号由 fillData 补 0',
  );
  assert.equal(fixture.era.get('flag:614'), 7, '档里写过的值不被覆盖');
});
