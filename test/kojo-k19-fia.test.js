/**
 * ere/kojo/kojo-k19-fia.js 的行为测试（issue #247：J37 口上·K19 菲娅）。
 *
 * 缝 = test/helpers/era-fixture.js。世界底座：菲娅（性格素质 179 →
 * GET_KOJO_NUM = 119 → 分发 key 19）。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');
const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

const CID = 35;
const KEY = 19;

async function setup_k19(seed, selectcom = 0) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, CID, '菲娅');
  fixture.era.beginTrain(0, CID);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = CID;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = selectcom;
  fixture.store.set(`talent:${CID}:179`, 1);
  fixture.store.set('flag:119', 1);
  fixture.store.set('flag:7', 2);
  if (seed) seed(fixture, era_flag);
  fixture.load_module('kojo/kojo-system');
  fixture.load_module('kojo/kojo-k19-fia');
  return fixture;
}

async function emit(fixture, event) {
  const registry = fixture.load_module('system/event/registry');
  await registry.emit(event);
}

async function speak_k19(fixture, rand = () => 0) {
  const { kojo_message_com_family } = fixture.load_module('kojo/kojo-system');
  return kojo_message_com_family.call(KEY, { args: [rand] });
}

async function palam_k19(fixture) {
  const { kojo_message_palamcng_family } =
    fixture.load_module('kojo/kojo-system');
  return kojo_message_palamcng_family.call(KEY, { args: [] });
}

async function mark_k19(fixture) {
  const { kojo_message_markcng_family } =
    fixture.load_module('kojo/kojo-system');
  return kojo_message_markcng_family.call(KEY, { args: [] });
}

async function self_k19(fixture) {
  const { self_kojo_family } = fixture.load_module('kojo/kojo-system');
  return self_kojo_family.call(KEY, { args: [] });
}

test('@EVENTTRAIN #PRI 置存在标志并补总开关，@EVENTEND #LATER 清标志', async () => {
  const fixture = await setup_k19((f) => {
    f.store.delete('flag:119');
    f.store.set('flag:7', 0);
    f.store.set(`cflag:${CID}:201`, 9);
  });
  await emit(fixture, 'EVENTTRAIN');
  assert.equal(fixture.store.get('flag:119'), 1, 'K19 存在标志置 1');
  assert.equal(fixture.store.get('flag:7'), 2, '口上总开关从 0 补到 2');
  await emit(fixture, 'EVENTEND');
  assert.equal(fixture.store.get('flag:119'), 0, 'K19 存在标志清 0');
});

test('EVENTTRAIN 初调教推进 CFLAG:201，人类与魔族分档', async () => {
  const human = await setup_k19();
  await emit(human, 'EVENTTRAIN');
  assert.equal(human.store.get(`cflag:${CID}:201`), 1, '人类初调教推进到 1');
  assert.ok(
    human.text_lines().some((line) => line.includes('你是坏人吧')),
    '人类初调教台词',
  );

  const demon = await setup_k19((f) => f.store.set(`talent:${CID}:314`, 9));
  await emit(demon, 'EVENTTRAIN');
  assert.equal(demon.store.get(`cflag:${CID}:201`), 1, '魔族初调教推进到 1');
  assert.equal(demon.store.get(`cflag:${CID}:370`), 1, '魔族化计数置 1');
});

for (const guard of [
  ['助手调教', (_f, flag) => ((flag.assi = 1), (flag.assiplay = 1))],
  ['口塞', (f) => f.store.set(`tequip:${CID}:45`, 1)],
  ['失神', (f) => f.store.set('tflag:899', 1)],
  ['兽奸', (f) => f.store.set(`tequip:${CID}:89`, 1)],
  ['触手', (f) => f.store.set(`tequip:${CID}:90`, 1)],
  ['崩坏', (f) => f.store.set(`talent:${CID}:9`, 1)],
]) {
  test(`KOJO_MESSAGE_COM 头部守卫：${guard[0]}静默跳过`, async () => {
    const fixture = await setup_k19((f, flag) => {
      f.store.set(`cflag:${CID}:301`, 0);
      guard[1](f, flag);
    });
    await speak_k19(fixture);
    assert.deepEqual(fixture.text_lines(), [], `${guard[0]}守卫无输出`);
    assert.equal(
      fixture.store.get(`cflag:${CID}:301`),
      0,
      `${guard[0]}守卫不推进爱抚计数`,
    );
  });
}

test('KOJO_MESSAGE_COM 头部守卫：死斗场转入专用口上', async () => {
  const fixture = await setup_k19(
    (f) => f.store.set(`tequip:${CID}:55`, 1),
    55,
  );
  await speak_k19(fixture);
  assert.ok(
    fixture.text_lines().some((line) => line.includes('死斗场')),
    '死斗场守卫转入专用口上',
  );
});

test('SELECTCOM 0 爱抚首回合：输出并将 CFLAG:301 从 0 推进到 1', async () => {
  const fixture = await setup_k19();
  await speak_k19(fixture);
  assert.equal(fixture.store.get(`cflag:${CID}:301`), 1, '爱抚计数推进到 1');
  assert.ok(fixture.text_lines().length > 0, '爱抚首回合有角色台词');
});

test('KOJO_MESSAGE_COM：全部 SELECTCOM 顶层分支的首回合状态可达', async () => {
  const cases = [
    [0, 301],
    [1, 302],
    [2, 303],
    [3, 304],
    [5, 306],
    [6, 307],
    [7, 308],
    [8, 309],
    [9, 310],
    [10, 311],
    [11, 312, 11, 1],
    [11, 372, 11, 0],
    [12, 313],
    [13, 314, 13, 1],
    [13, 374, 13, 0],
    [14, 315, 14, 1],
    [14, 375, 14, 0],
    [15, 316, 15, 1],
    [15, 376, 15, 0],
    [19, 320, 19, 1],
    [19, 379, 19, 0],
    [20, 321],
    [21, 322],
    [22, 323],
    [23, 324],
    [26, 327],
    [27, 328],
    [28, 329],
    [29, 337],
    [30, 331],
    [31, 332],
    [32, 333],
    [33, 334],
    [34, 335],
    [35, 336],
    [36, 337],
    [37, 338],
    [38, 339],
    [40, 341],
    [41, 342],
    [42, 343],
    [43, 344, 43, 1],
    [43, 380, 43, 0],
    [44, 345, 44, 1],
    [44, 385, 44, 0],
    [45, 346, 45, 1],
    [45, 386, 45, 0],
    [46, 347, 46, 1],
    [55, 356],
    [56, 357],
    [125, 361],
    [126, 362],
    [127, 363],
    [69, 364],
    [124, 365],
    [80, 381],
  ];
  for (const [selectcom, counter, tequip, equipped] of cases) {
    const fixture = await setup_k19((f) => {
      if (tequip) f.store.set(`tequip:${CID}:${tequip}`, equipped);
    }, selectcom);
    await speak_k19(fixture);
    assert.equal(
      fixture.store.get(`cflag:${CID}:${counter}`),
      1,
      `SELECTCOM ${selectcom}${tequip ? ` TEQUIP:${tequip}=${equipped}` : ''} 首回合推进 CFLAG:${counter}`,
    );
  }
});

test('原作缺陷：SELECTCOM 56 少 ENDIF，使 SELECTCOM 123 不可达', async () => {
  const fixture = await setup_k19(undefined, 123);
  await speak_k19(fixture);
  assert.equal(
    fixture.store.get(`cflag:${CID}:360`),
    undefined,
    '原作缺 ENDIF：SELECTCOM 123 的 CFLAG:360 不可达',
  );
});

test('PALAMCNG：润滑首超、四类 NOWEX 首次绝顶分别推进状态', async () => {
  const fixture = await setup_k19((f) => {
    f.store.set(`palam:${CID}:3`, 600);
    for (const index of [0, 1, 2, 3]) f.store.set(`nowex:${CID}:${index}`, 1);
  });
  await palam_k19(fixture);
  for (const [index, label] of [
    [221, '首次润滑'],
    [225, '首次C绝顶'],
    [226, '首次V绝顶'],
    [227, '首次A绝顶'],
    [228, '首次B绝顶'],
  ]) {
    assert.equal(fixture.store.get(`cflag:${CID}:${index}`), 1, `${label}推进`);
  }
});

test('MARKCNG：苦痛、快乐、屈服、反抗刻印首超分别推进', async () => {
  const fixture = await setup_k19((f) => {
    for (const index of [21, 22, 23, 24]) f.store.set(`tflag:${index}`, 3);
  });
  await mark_k19(fixture);
  for (const [index, label] of [
    [297, '苦痛刻印'],
    [298, '快乐刻印'],
    [299, '屈服刻印'],
    [300, '反抗刻印'],
  ]) {
    assert.equal(
      fixture.store.get(`cflag:${CID}:${index}`),
      1,
      `${label}首超推进`,
    );
  }
});

test('SELF_KOJO 读取全局 Q 并在结束时清 TFLAG:13', async () => {
  const fixture = await setup_k19((f, era_flag) => {
    join_slave_chara(f, 1, '助手');
    era_flag.assi = 1;
    f.store.set('tflag:13', 1);
  });
  const after = fixture.load_module('event/event-aftertrain');
  fixture.store.set(`abl:${CID}:0`, 3);
  fixture.store.set(`abl:${CID}:11`, 2);
  fixture.store.set(`abl:${CID}:31`, 2);
  fixture.store.set(`abl:${CID}:22`, 4);
  fixture.store.set(`base:${CID}:0`, 1000);
  await after.aftertrain_masturbation_check(0, 1, () => 2);
  assert.equal(after.peek_aftertrain_q(), 1, '全局 Q 由调教后判定置 1');
  assert.equal(fixture.store.get('tflag:13'), 0, 'SELF_KOJO 清 TFLAG:13');
  assert.ok(fixture.text_lines().length > 0, 'SELF_KOJO Q==1 有输出');
});

test('原作缺陷：自己扒开用 308 判首次、二次却推进胸部爱抚 306', async () => {
  const first = await setup_k19(undefined, 7);
  await speak_k19(first);
  assert.equal(first.store.get(`cflag:${CID}:308`), 1, '首次推进 CFLAG:308');

  const repeat = await setup_k19((f) => {
    f.store.set(`cflag:${CID}:308`, 1);
    f.store.set(`cflag:${CID}:306`, 0);
  }, 7);
  await speak_k19(repeat);
  assert.equal(
    repeat.store.get(`cflag:${CID}:308`),
    1,
    '二次不再推进 CFLAG:308',
  );
  assert.equal(
    repeat.store.get(`cflag:${CID}:306`),
    2,
    '原作缺陷推进 CFLAG:306',
  );
});

test('原作缺陷：MUSEUM 在 TFLAG:500 分派前无条件返回', async () => {
  const fixture = await setup_k19();
  const { game } = fixture.load_module('facade/game');
  game.event.博物馆口上 = 9;
  const { museum_koujo_family } = fixture.load_module('kojo/kojo-system');
  await museum_koujo_family.call(KEY, { args: [] });
  assert.equal(fixture.text_lines().length, 1, '无条件 RETURN 后分派段不可达');
});

test('非调教族：NTR、处刑与语尾均注册并执行关键状态', async () => {
  const fixture = await setup_k19();
  const system = fixture.load_module('kojo/kojo-system');
  await system.ntr_koujo_family.call(KEY, { args: [1] });
  assert.equal(fixture.store.get(`cflag:${CID}:650`), 1, 'NTR 再捕获状态推进');
  assert.equal(fixture.store.get(`cflag:${CID}:651`), 1, 'NTR P==1 状态推进');

  const { game } = fixture.load_module('facade/game');
  game.event.犬射精或处刑口上 = 4;
  await system.exucution_koujo_family.call(KEY, { args: [] });
  const before = fixture.text_lines().length;
  await system.gobi_koujo_family.call(KEY, { args: [1, () => 0] });
  assert.equal(
    fixture.text_lines().length,
    before + 1,
    '语尾族 ARG:0==1 输出一行',
  );
});
