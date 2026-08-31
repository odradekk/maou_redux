/**
 * ere/kojo/kojo-k0-tender.js 的行为测试（issue #231——K0 慈爱口上）。
 *
 * 缝 = test/helpers/era-fixture.js。世界底座：琼（Chara31，素质 160
 * 慈爱 → GET_KOJO_NUM 100）入列调教。覆盖第一刀：
 *   - 首次与二次以后走不同分支且状态推进（验收项「此行为有测试」）；
 *   - MARK:2 刻印分档（>= 2 / == 3 / == 2 / <= 1）与 TALENT:76/85 素质分支；
 *   - FLAG:7 == 1 的阈值闸（每阶段一次）与 == 2 的旁路（每次出声）；
 *   - 七道跳过判定（K0 顺序：死斗场最先、崩坏在兽奸前；死斗场/兽奸岔专用口上）；
 *   - 爱抚外指令落占位行；
 *   - @EVENTTRAIN #PRI / @EVENTEND #LATER 的存在标志；
 *   - 存根清单核对（docs/stub-registry.md）。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

// 世界底座：琼入列调教 + K0 触发面（素质 160 / 存在标志 / 总开关默认 2）
async function setup_k0(seed) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '琼');
  fixture.era.beginTrain(0, 31);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = 0;
  fixture.store.set('talent:31:160', 1); // 慈爱 → GET_KOJO_NUM = 100
  fixture.store.set('flag:100', 1); // K0 存在标志
  fixture.store.set('flag:7', 2); // 总开关默认（2 = 每次出声）
  if (seed) {
    seed(fixture);
  }
  fixture.load_module('kojo/kojo-system');
  fixture.load_module('kojo/kojo-k0-tender');
  return fixture;
}

// 经分发族调用（TRYCALLFORM KOJO_MESSAGE_COM_0 的等价物）
async function speak_k0(fixture) {
  const { kojo_message_com_family } = fixture.load_module('kojo/kojo-system');
  return kojo_message_com_family.call(0);
}

test('首次（CFLAG:301 == 0 且 MARK:2 < 2）：虚假的爱 + 状态推进到 1', async () => {
  const fixture = await setup_k0();
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「你的爱是虚假的」',
    '琼紧锁眉头、蜷缩着身体………',
  ]);
  assert.equal(fixture.store.get('cflag:31:301'), 1, '状态推进到 1');
});

test('首次的刻印分档（MARK:2 >= 2）：老实支两句，推进到 1', async () => {
  const fixture = await setup_k0((f) => f.store.set('mark:31:2', 2));
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…我会、老实的…所以…啊～啊啊～！」',
    '琼乖乖的被你爱抚着身体………',
  ]);
  assert.equal(fixture.store.get('cflag:31:301'), 1);
});

test('二次以后走それ以外支（MARK:2 <= 1）：与首次不同分支，推进到 2', async () => {
  const fixture = await setup_k0((f) => f.store.set('cflag:31:301', 1));
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), ['「…好恶心」', '琼叹了口气………']);
  assert.equal(fixture.store.get('cflag:31:301'), 2);
});

test('淫乱分支（TALENT:76）：两句 + ♡ 插值，推进到 6', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:301', 1);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊～…额呵呵…那个地方…再多摸摸…♡」',
    '只是稍微摸了摸琼她就把持不住了………',
  ]);
  assert.equal(fixture.store.get('cflag:31:301'), 6);
});

test('爱慕分支（TALENT:85）优先于刻印档：推进到 5', async () => {
  const fixture = await setup_k0((f) => {
    f.store.set('talent:31:85', 1);
    f.store.set('cflag:31:301', 1);
    f.store.set('mark:31:2', 3); // 刻印档在场，素质分支仍先取
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「再来…请把我揉得乱七八糟吧……！」',
    '琼像引诱你的手似的扭着身体………',
  ]);
  assert.equal(fixture.store.get('cflag:31:301'), 5);
});

test('屈服刻印 Lv3 / Lv2 分档：各推进到 4 / 3', async () => {
  const lv3 = await setup_k0((f) => {
    f.store.set('mark:31:2', 3);
    f.store.set('cflag:31:301', 3);
  });
  await speak_k0(lv3);
  assert.deepEqual(lv3.text_lines(), [
    '「哈啊…哈啊…啊啊啊～」',
    '琼的嘴里呼着热气………',
  ]);
  assert.equal(lv3.store.get('cflag:31:301'), 4);

  const lv2 = await setup_k0((f) => {
    f.store.set('mark:31:2', 2);
    f.store.set('cflag:31:301', 2);
  });
  await speak_k0(lv2);
  assert.deepEqual(lv2.text_lines(), [
    '「才不会…觉得舒服呢！　绝对不会！」',
    '琼扭动着身体忍耐着的样子………',
  ]);
  assert.equal(lv2.store.get('cflag:31:301'), 3);
});

test('阈值闸：FLAG:7 == 1 时上限生效（阶段耗尽后不出声），== 2 时旁路', async () => {
  // FLAG:7 == 1：淫乱已到 6（> 5），素质与刻印全不匹配 → 静默
  const quiet = await setup_k0((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:301', 6);
    f.store.set('flag:7', 1);
  });
  await speak_k0(quiet);
  assert.deepEqual(quiet.text_lines(), []);
  assert.equal(quiet.store.get('cflag:31:301'), 6); // 状态不动

  // 同状态 FLAG:7 == 2（默认）：上限旁路，淫乱支每次出声
  const repeat = await setup_k0((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:301', 6);
  });
  await speak_k0(repeat);
  assert.equal(repeat.text_lines().length, 2);
  assert.equal(repeat.store.get('cflag:31:301'), 6);
});

// —— 七道跳过判定（:676-699，K0 顺序：死斗场最先、崩坏在兽奸前） ——

test('死斗场（TEQUIP:55）最先：岔进 COLOSSEUM_KOJO_0 占位行', async () => {
  const fixture = await setup_k0((f) => f.store.set('tequip:31:55', 1));
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '（死斗场专用口上尚未移植，此处为占位——原作 @COLOSSEUM_KOJO_0，随死斗场票，见 docs/stub-registry.md。）',
  ]);
  assert.equal(fixture.store.get('cflag:31:301'), undefined);
});

test('助手调教中（ASSI > 0 && ASSIPLAY）：不输出', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.assi = 17;
    era_flag.assiplay = 1;
    f.seed_chara(17, { id: 17, name: '玛奥' });
    f.era.addCharacter(17);
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), []);
  assert.equal(fixture.store.get('cflag:31:301'), undefined); // 状态未动
});

test('口塞（TEQUIP:45）：SELECTCOM != 45 跳过、== 45 不被此判定拦', async () => {
  const gagged = await setup_k0((f) => f.store.set('tequip:31:45', 1));
  await speak_k0(gagged);
  assert.deepEqual(gagged.text_lines(), []);

  // SELECTCOM == 45：不跳过——爱抚外分支落占位行
  const speaking = await setup_k0((f) => {
    f.store.set('tequip:31:45', 1);
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 45;
  });
  await speak_k0(speaking);
  assert.ok(
    speaking.text_lines().some((line) => line.includes('@KOJO_MESSAGE_COM_0')),
    '口塞中的 45 指令走到爱抚外分支的占位行',
  );
});

test('失神（TFLAG:899）：不输出', async () => {
  const fixture = await setup_k0((f) => f.store.set('tflag:899', 1));
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), []);
});

test('崩坏（TALENT:9）在兽奸前：不输出', async () => {
  const fixture = await setup_k0((f) => f.store.set('talent:31:9', 1));
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), []);
});

test('兽奸（TEQUIP:89）：K0 岔进 DOG_KOJO_0 占位行', async () => {
  const fixture = await setup_k0((f) => f.store.set('tequip:31:89', 1));
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '（兽奸专用口上尚未移植，此处为占位——原作 @DOG_KOJO_0，随兽奸票，见 docs/stub-registry.md。）',
  ]);
});

test('触手（TEQUIP:90）：不输出', async () => {
  const fixture = await setup_k0((f) => f.store.set('tequip:31:90', 1));
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), []);
});

test('爱抚外指令（SELECTCOM != 0）：落占位行（分支待办可见）', async () => {
  const fixture = await setup_k0((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 1; // 舔阴
  });
  await speak_k0(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '（指令 1 的口上尚未移植，此处为占位——原作 @KOJO_MESSAGE_COM_0，随各自指令票，见 docs/stub-registry.md。）',
  ]);
});

test('K0 @EVENTTRAIN #PRI 置 FLAG:100、@EVENTEND #LATER 清 FLAG:100', async () => {
  const fixture = await setup_k0((f) => {
    f.store.delete('flag:100');
    f.store.delete('flag:7');
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(fixture.store.get('flag:100'), 1, 'K0 EVENTTRAIN 置 FLAG:100');
  assert.equal(fixture.store.get('flag:7'), 2, 'K0 EVENTTRAIN 总开关补 0→2');
  await emit('EVENTEND');
  assert.equal(fixture.store.get('flag:100'), 0, 'K0 EVENTEND 清 FLAG:100');
});

// —— 存根清单核对 ——

test('存根清单可检索：docs/stub-registry.md 收录这张票全部占位名', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = fixture.load_module('kojo/kojo-k0-tender');
  const registry = fs.readFileSync(
    path.resolve(__dirname, '..', 'docs', 'stub-registry.md'),
    'utf8',
  );
  for (const name of STUBBED_CALLS) {
    assert.ok(
      registry.includes(name),
      `docs/stub-registry.md 必须收录 ${name}`,
    );
  }
});
