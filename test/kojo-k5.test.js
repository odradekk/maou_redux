/**
 * ere/kojo/kojo-k5.js 的行为测试（issue #46——实机唯一能触发的口上支）。
 *
 * 缝 = test/helpers/era-fixture.js。世界底座：玛奥（Chara17，素质 165
 * 村娘A → GET_KOJO_NUM 105）入列调教。覆盖：
 *   - 首次与二次以后走不同分支且状态推进（验收项「此行为有测试」）；
 *   - MARK:2 刻印分档（>= 2 / == 3 / == 2 / <= 1）与 TALENT:76/85 素质分支；
 *   - FLAG:7 == 1 的阈值闸（每阶段一次）与 == 2 的旁路（每次出声）；
 *   - 七道跳过判定（含 K5 特有：兽奸静默无 DOG_KOJO、死斗场占位行）；
 *   - 插值（%SAVESTR:TARGET/PLAYER% 与心形 ♡；繁体正文照抄不统一）；
 *   - 存根清单核对（docs/stub-registry.md）。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

// 世界底座：玛奥入列调教 + K5 触发面（素质 165 / 存在标志 / 总开关默认 2）
async function setup_k5(seed) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 17, '玛奥');
  fixture.era.beginTrain(0, 17);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 17;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = 0;
  fixture.store.set('talent:17:165', 1); // 村娘A → GET_KOJO_NUM = 105
  fixture.store.set('flag:105', 1); // K5 存在标志
  fixture.store.set('flag:7', 2); // 总开关默认（2 = 每次出声）
  if (seed) {
    seed(fixture);
  }
  fixture.load_module('kojo/kojo-system');
  fixture.load_module('kojo/kojo-k5');
  return fixture;
}

// 经分发族调用（TRYCALLFORM 的等价物——注册与分发都在路径上）
async function speak_k5(fixture) {
  const { kojo_message_com_family } = fixture.load_module('kojo/kojo-system');
  return kojo_message_com_family.call(5);
}

test('首次（CFLAG:301 == 0 且 MARK:2 < 2）：两句拒绝 + 状态推进到 1', async () => {
  const fixture = await setup_k5();
  await speak_k5(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「你这个变态…别、别碰我！」',
    '（现在如果发出奇怪的声音的话…只会让这家伙感到高兴、一定要忍耐…！）',
  ]);
  assert.equal(fixture.store.get('cflag:17:301'), 1);
});

test('二次以后走それ以外支（MARK:2 <= 1）：与首次不同分支，推进到 2', async () => {
  const fixture = await setup_k5((f) => f.store.set('cflag:17:301', 1));
  await speak_k5(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「不要、那、那里…不要…碰那里…啊！」',
    '玛奥不停地扭动着身体进行反抗………',
  ]);
  assert.equal(fixture.store.get('cflag:17:301'), 2);
});

test('首次的刻印分档（MARK:2 >= 2）：只出一句', async () => {
  const fixture = await setup_k5((f) => f.store.set('mark:17:2', 2));
  await speak_k5(fixture);
  assert.deepEqual(fixture.text_lines(), ['「咕…呜呜…啊！」']);
  assert.equal(fixture.store.get('cflag:17:301'), 1);
});

test('淫乱分支（TALENT:76）：三句 + 插值（角色名 / 调教者名 / ♡），推进到 6', async () => {
  const fixture = await setup_k5((f) => {
    f.store.set('talent:17:76', 1);
    f.store.set('cflag:17:301', 1);
  });
  await speak_k5(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯…啊…主人的手指好厉害…♡」',
    '玛奥弯曲着身体、把你的手夹在自己的大腿间。',
    '「请让我的H小穴…变得更加淫乱吧♡」',
  ]);
  assert.equal(fixture.store.get('cflag:17:301'), 6);
});

test('爱慕分支（TALENT:85）优先于刻印档：推进到 5', async () => {
  const fixture = await setup_k5((f) => {
    f.store.set('talent:17:85', 1);
    f.store.set('cflag:17:301', 1);
    f.store.set('mark:17:2', 3); // 刻印档在场，素质分支仍先取
  });
  await speak_k5(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊…啊哈…啊♡不要嗯♡」',
    '故意发出尖叫的玛奥显得十分的可爱。',
    '「主人、再多摸摸我嘛♡ 舒服的我都要叫出来了啦♡」',
  ]);
  assert.equal(fixture.store.get('cflag:17:301'), 5);
});

test('屈服刻印 Lv3 / Lv2 分档：各推进到 4 / 3', async () => {
  const lv3 = await setup_k5((f) => {
    f.store.set('mark:17:2', 3);
    f.store.set('cflag:17:301', 3);
  });
  await speak_k5(lv3);
  assert.deepEqual(lv3.text_lines().slice(0, 1), [
    '「哈…呜…嗯咕♡…啊…啊…嗯♡……」',
  ]);
  assert.equal(lv3.store.get('cflag:17:301'), 4);

  const lv2 = await setup_k5((f) => {
    f.store.set('mark:17:2', 2);
    f.store.set('cflag:17:301', 2);
  });
  await speak_k5(lv2);
  assert.deepEqual(lv2.text_lines(), [
    '「啊…啊咕…呜呜…嗯咕…！」',
    '玛奥感受到了从未体验过的愉悦在沸腾着、忍不住皱起了脸………',
  ]);
  assert.equal(lv2.store.get('cflag:17:301'), 3);
});

test('阈值闸：FLAG:7 == 1 时上限生效（阶段耗尽后不出声），== 2 时旁路', async () => {
  // FLAG:7 == 1：淫乱已到 6（> 5），素质与刻印全不匹配 → 静默
  const quiet = await setup_k5((f) => {
    f.store.set('talent:17:76', 1);
    f.store.set('cflag:17:301', 6);
    f.store.set('flag:7', 1);
  });
  await speak_k5(quiet);
  assert.deepEqual(quiet.text_lines(), []);
  assert.equal(quiet.store.get('cflag:17:301'), 6); // 状态不动

  // 同状态 FLAG:7 == 2（默认）：上限旁路，淫乱支每次出声
  const repeat = await setup_k5((f) => {
    f.store.set('talent:17:76', 1);
    f.store.set('cflag:17:301', 6);
  });
  await speak_k5(repeat);
  assert.equal(repeat.text_lines().length, 3);
  assert.equal(repeat.store.get('cflag:17:301'), 6);
});

// —— 七道跳过判定（:771-793，顺序与判据各文件 1:1） ——

test('助手调教中（ASSI > 0 && ASSIPLAY）：不输出', async () => {
  const fixture = await setup_k5((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.assi = 31;
    era_flag.assiplay = 1;
    f.seed_chara(31, { id: 31, name: '奴隶31' });
    f.era.addCharacter(31);
  });
  await speak_k5(fixture);
  assert.deepEqual(fixture.text_lines(), []);
  assert.equal(fixture.store.get('cflag:17:301'), undefined); // 状态未动
});

test('口塞（TEQUIP:45）：SELECTCOM != 45 跳过、== 45 不被此判定拦', async () => {
  const gagged = await setup_k5((f) => f.store.set('tequip:17:45', 1));
  await speak_k5(gagged);
  assert.deepEqual(gagged.text_lines(), []);

  // SELECTCOM == 45（戴口塞说话的那条指令）：不跳过——爱抚外分支落占位行
  const speaking = await setup_k5((f) => {
    f.store.set('tequip:17:45', 1);
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 45;
  });
  await speak_k5(speaking);
  assert.ok(
    speaking.text_lines().some((line) => line.includes('@KOJO_MESSAGE_COM_5')),
    '口塞中的 45 指令走到爱抚外分支的占位行',
  );
});

test('失神（TFLAG:899）/ 触手（TEQUIP:90）/ 崩坏（TALENT:9）：不输出', async () => {
  for (const [desc, seed] of [
    ['失神', (f) => f.store.set('tflag:899', 1)],
    ['触手', (f) => f.store.set('tequip:17:90', 1)],
    ['崩坏', (f) => f.store.set('talent:17:9', 1)],
  ]) {
    const fixture = await setup_k5(seed);
    await speak_k5(fixture);
    assert.deepEqual(fixture.text_lines(), [], `${desc}：跳过`);
  }
});

test('兽奸（TEQUIP:89）：K5 是静默跳过（无 DOG_KOJO 占位行）', async () => {
  const fixture = await setup_k5((f) => f.store.set('tequip:17:89', 1));
  await speak_k5(fixture);
  assert.deepEqual(fixture.text_lines(), []);
});

test('死斗场（TEQUIP:55）：岔进专用口上的占位行', async () => {
  const fixture = await setup_k5((f) => f.store.set('tequip:17:55', 1));
  await speak_k5(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '（死斗场专用口上尚未移植，此处为占位——原作 @COLOSSEUM_KOJO_5，随死斗场票，见 docs/stub-registry.md。）',
  ]);
});

// —— 存根清单核对 ——

test('存根清单可检索：docs/stub-registry.md 收录这张票全部占位名', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = fixture.load_module('kojo/kojo-k5');
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
