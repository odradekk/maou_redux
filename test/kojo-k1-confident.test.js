/**
 * ere/kojo/kojo-k1-confident.js 的行为测试（issue #232，J22 自信家）。
 *
 * 缝 = test/helpers/era-fixture.js。世界底座：自信家素质 161 的奴隶入列
 * 调教。覆盖验收项「此行为有测试」：
 *   - 七道头部守卫（助手不跳过；死斗场/兽奸走真身；口塞/失神/崩坏/触手跳过）；
 *   - CFLAG:301 爱抚个位数推进（初回 → 1；二回目以降按素质/刻印取首个命中）；
 *   - FLAG:7 == 1 阈值闸与 == 2 旁路；
 *   - PALAMCNG / MARKCNG 真身；
 *   - DOG / COLOSSEUM / NTR / BENKI / ENTERENEMY / GOBI 入口；
 *   - 存根清单（SELL_MATURO_K0）。
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

const CID = 31;
const NAME = '自信家';

async function setup_k1(seed) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, CID, NAME);
  fixture.era.beginTrain(0, CID);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = CID;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = 0;
  fixture.store.set(`talent:${CID}:161`, 1); // 自信家 → GET_KOJO_NUM = 101
  fixture.store.set('flag:101', 1); // K1 存在标志
  fixture.store.set('flag:7', 2); // 总开关默认（2 = 每次出声）
  if (seed) {
    seed(fixture);
  }
  fixture.load_module('kojo/kojo-system');
  fixture.load_module('kojo/kojo-k1-confident');
  return fixture;
}

async function speak_k1(fixture, rand) {
  const { kojo_message_com_family } = fixture.load_module('kojo/kojo-system');
  return kojo_message_com_family.call(1, { args: [rand] });
}

const seq_rand =
  (...draws) =>
  (n) => {
    const value = draws.shift() ?? 0;
    return value % n;
  };

test('首次爱抚（CFLAG:301 == 0 且 MARK:2 < 2）：一句拒绝 + 推进到 1', async () => {
  const fixture = await setup_k1();
  await speak_k1(fixture);
  assert.deepEqual(
    fixture.text_lines(),
    ['「放过我吧！别再来了…唔哇」'],
    '「放过我吧！别再来了…唔哇」',
  );
  assert.equal(fixture.store.get(`cflag:${CID}:301`), 1, '首次爱抚推进到 1');
});

test('首次爱抚的刻印分档（MARK:2 >= 2）：温柔台词仍推进到 1', async () => {
  const fixture = await setup_k1((f) => f.store.set(`mark:${CID}:2`, 2));
  await speak_k1(fixture);
  assert.deepEqual(
    fixture.text_lines(),
    ['「真的！…但、只要忍住就好了…啊…啊啊啊！」'],
    '刻印分档也推进到 1',
  );
  assert.equal(fixture.store.get(`cflag:${CID}:301`), 1, '刻印分档也推进到 1');
});

test('二次以后 MARK:2 <= 1：与首次不同分支，推进到 2', async () => {
  const fixture = await setup_k1((f) => f.store.set(`cflag:${CID}:301`, 1));
  await speak_k1(fixture);
  assert.deepEqual(
    fixture.text_lines(),
    ['「哈…放过我吧…这样一点儿也…咕！」'],
    '「哈…放过我吧…这样一点儿也…咕！」',
  );
  assert.equal(fixture.store.get(`cflag:${CID}:301`), 2, '爱抚推进到 2');
});

test('二次以后屈服 Lv3：推进到 4', async () => {
  const fixture = await setup_k1((f) => {
    f.store.set(`cflag:${CID}:301`, 1);
    f.store.set(`mark:${CID}:2`, 3);
  });
  await speak_k1(fixture);
  assert.ok(
    fixture.text_lines().includes('「哈…爱抚…更多的爱抚呦…」'),
    '屈服 Lv3 台词',
  );
  assert.equal(fixture.store.get(`cflag:${CID}:301`), 4, '爱抚推进到 4');
});

test('淫乱分支（TALENT:76）：推进到 6', async () => {
  const fixture = await setup_k1((f) => {
    f.store.set(`talent:${CID}:76`, 1);
    f.store.set(`cflag:${CID}:301`, 1);
  });
  await speak_k1(fixture);
  assert.ok(
    fixture.text_lines().some((line) => line.includes('想要更多的爱抚')),
    '淫乱爱抚台词',
  );
  assert.equal(fixture.store.get(`cflag:${CID}:301`), 6, '爱抚推进到 6');
});

test('爱慕分支（TALENT:85）：推进到 5', async () => {
  const fixture = await setup_k1((f) => {
    f.store.set(`talent:${CID}:85`, 1);
    f.store.set(`cflag:${CID}:301`, 1);
  });
  await speak_k1(fixture);
  assert.ok(
    fixture.text_lines().includes('「啊…即使更加激烈…没关系的…真的♪」'),
    '爱慕爱抚台词',
  );
  assert.equal(fixture.store.get(`cflag:${CID}:301`), 5, '爱抚推进到 5');
});

test('阈值闸：FLAG:7 == 1 时阶段耗尽不出声、== 2 时旁路重出声', async () => {
  const quiet = await setup_k1((f) => {
    f.store.set(`cflag:${CID}:301`, 2);
    f.store.set('flag:7', 1);
  });
  await speak_k1(quiet);
  assert.deepEqual(quiet.text_lines(), [], 'FLAG:7 == 1 阶段耗尽不出声');
  assert.equal(quiet.store.get(`cflag:${CID}:301`), 2);

  const repeat = await setup_k1((f) => f.store.set(`cflag:${CID}:301`, 2));
  await speak_k1(repeat);
  assert.equal(repeat.text_lines().length, 1, 'FLAG:7 == 2 旁路重出声');
  assert.equal(repeat.store.get(`cflag:${CID}:301`), 2);
});

test('@EVENTTRAIN #PRI 置 FLAG:101、@EVENTEND #LATER 清 0', async () => {
  const fixture = await setup_k1((f) => {
    f.store.delete('flag:101');
    f.store.delete('flag:7');
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(fixture.store.get('flag:101'), 1, 'K1 存在标志置 1');
  assert.equal(fixture.store.get('flag:7'), 2, '总开关随之默认开');
  await emit('EVENTEND');
  assert.equal(fixture.store.get('flag:101'), 0, 'K1 存在标志清 0');
});

test('助手调教不跳过：首次爱抚出台词', async () => {
  const fixture = await setup_k1((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.assi = 17;
    era_flag.assiplay = 1;
    f.seed_chara(17, { id: 17, name: '玛奥', callname: '玛奥' });
    f.era.addCharacter(17);
  });
  await speak_k1(fixture);
  assert.deepEqual(
    fixture.text_lines(),
    [`${NAME}转过脸就这样看着玛奥………`],
    '助手调教不跳过出台词',
  );
  assert.equal(fixture.store.get(`cflag:${CID}:301`), 1, '助手调教也推进到 1');
});

test('口塞（TEQUIP:45）：SELECTCOM != 45 跳过、== 45 不被此判定拦', async () => {
  const gagged = await setup_k1((f) => f.store.set(`tequip:${CID}:45`, 1));
  await speak_k1(gagged);
  assert.deepEqual(gagged.text_lines(), [], '口塞非 45 指令跳过');

  const speaking = await setup_k1((f) => {
    f.store.set(`tequip:${CID}:45`, 1);
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 45;
  });
  await speak_k1(speaking);
  assert.deepEqual(
    speaking.text_lines(),
    ['「呜呜…呜…呼…呼」'],
    '口塞指令自己说话',
  );
});

test('失神（TFLAG:899）：静默跳过', async () => {
  const fixture = await setup_k1((f) => f.store.set('tflag:899', 1));
  await speak_k1(fixture);
  assert.deepEqual(fixture.text_lines(), [], '失神：跳过');
  assert.equal(
    fixture.store.get(`cflag:${CID}:301`),
    undefined,
    '失神：状态未动',
  );
});

test('崩坏（TALENT:9）：静默跳过', async () => {
  const fixture = await setup_k1((f) => f.store.set(`talent:${CID}:9`, 1));
  await speak_k1(fixture);
  assert.deepEqual(fixture.text_lines(), [], '崩坏：跳过');
  assert.equal(
    fixture.store.get(`cflag:${CID}:301`),
    undefined,
    '崩坏：状态未动',
  );
});

test('触手（TEQUIP:90）：静默跳过', async () => {
  const fixture = await setup_k1((f) => f.store.set(`tequip:${CID}:90`, 1));
  await speak_k1(fixture);
  assert.deepEqual(fixture.text_lines(), [], '触手：跳过');
  assert.equal(
    fixture.store.get(`cflag:${CID}:301`),
    undefined,
    '触手：状态未动',
  );
});

test('死斗场（TEQUIP:55）：岔进 COLOSSEUM_KOJO_1 真身', async () => {
  const fixture = await setup_k1((f) => {
    f.store.set(`tequip:${CID}:55`, 1);
    f.store.set(`base:${CID}:1`, 500);
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 55;
  });
  await speak_k1(fixture);
  assert.deepEqual(
    fixture.text_lines(),
    [`${NAME}看到死斗场的热浪和将要面对的对手吓得直哆嗦……`],
    '看到死斗场的热浪',
  );
});

test('兽奸（TEQUIP:89）：岔进 DOG_KOJO_1 真身', async () => {
  const fixture = await setup_k1((f) => f.store.set(`tequip:${CID}:89`, 1));
  await speak_k1(fixture);
  assert.deepEqual(
    fixture.text_lines(),
    ['「讨厌啊！　不要靠过来！」'],
    '「讨厌啊！　不要靠过来！」',
  );
  assert.equal(fixture.store.get(`cflag:${CID}:301`), 1, '兽奸爱抚也推进到 1');
});

test('PALAMCNG：首次润滑超过 LV2', async () => {
  const fixture = await setup_k1((f) => {
    f.store.set(`palam:${CID}:3`, 600);
    f.store.set(`delta:${CID}:3`, 0);
  });
  const { kojo_message_palamcng } = fixture.load_module('kojo/kojo-system');
  await kojo_message_palamcng();
  assert.ok(
    fixture.text_lines().includes('―――第一次润滑超过了LV 2'),
    'PALAMCNG 润滑 LV2',
  );
  assert.equal(fixture.store.get(`cflag:${CID}:221`), 1, '首次润滑Lv2 推进');
});

test('PALAMCNG：首次 C 绝顶（nowex:target:0 > 0 且标志为 0）', async () => {
  const fixture = await setup_k1((f) => f.store.set(`nowex:${CID}:0`, 1));
  const { kojo_message_palamcng } = fixture.load_module('kojo/kojo-system');
  await kojo_message_palamcng();
  assert.ok(
    fixture.text_lines().includes('「咕…咿咿！？」'),
    '首次C绝顶默认台词',
  );
  assert.ok(
    fixture.text_lines().some((line) => line.includes('第一次被刺激阴蒂绝顶')),
    '首次C绝顶叙述',
  );
  assert.equal(fixture.store.get(`cflag:${CID}:225`), 1, '首次C绝顶推进');
});

test('PALAMCNG：首次 C 绝顶标志已置则不重复', async () => {
  const fixture = await setup_k1((f) => {
    f.store.set(`nowex:${CID}:0`, 1);
    f.store.set(`cflag:${CID}:225`, 1);
  });
  const { kojo_message_palamcng } = fixture.load_module('kojo/kojo-system');
  await kojo_message_palamcng();
  assert.deepEqual(fixture.text_lines(), [], '首次C绝顶不重复');
});

test('MARKCNG：苦痛刻印 Lv3 真身', async () => {
  const fixture = await setup_k1((f) => f.store.set('tflag:22', 3));
  const { kojo_message_markcng } = fixture.load_module('kojo/kojo-system');
  await kojo_message_markcng();
  assert.deepEqual(
    fixture.text_lines(),
    ['「啊啊啊…再…痛…啊」'],
    '「啊啊啊…再…痛…啊」',
  );
  assert.equal(fixture.store.get(`cflag:${CID}:297`), 1, '苦痛刻印Lv3 推进');
});

test('BENKI_KOUJO：肉便器行动 0 默认支真身', async () => {
  const fixture = await setup_k1((f) => f.store.set('flag:62', 0));
  const { benki_koujo } = fixture.load_module('kojo/kojo-system');
  await benki_koujo();
  assert.deepEqual(fixture.text_lines(), ['「噫、好脏……」'], '「噫、好脏……」');
});

test('NTR_KOUJO：P=1 默认支推进 CFLAG:651', async () => {
  const fixture = await setup_k1();
  const { ntr_koujo_family } = fixture.load_module('kojo/kojo-system');
  await ntr_koujo_family.call(1, { args: [undefined, 1] });
  assert.deepEqual(
    fixture.text_lines(),
    ['「啊啊啊…为什么…这样…啊嗯！不行了…这样弄不行了啊！」'],
    '「啊啊啊…为什么…这样…啊嗯！不行了…这样弄不行了啊！」',
  );
  assert.equal(fixture.store.get(`cflag:${CID}:651`), 1, 'NTR_651 推进');
  assert.equal(fixture.store.get(`cflag:${CID}:650`), 1, 'NTR再捕获推进');
});

test('ENTERENEMY_KOUJO：默认支真身', async () => {
  const fixture = await setup_k1();
  const { enterenemy_koujo } = fixture.load_module('kojo/kojo-system');
  await enterenemy_koujo(CID);
  assert.deepEqual(
    fixture.text_lines(),
    ['「虽然不怎么了解魔王的实力、不过觉悟吧！！」'],
    '虽然不怎么了解魔王的实力',
  );
});

test('GOBI_KOUJO：ARG=1 喜悦语尾', async () => {
  const fixture = await setup_k1();
  const { gobi_koujo } = fixture.load_module('kojo/kojo-system');
  await gobi_koujo(1);
  assert.deepEqual(fixture.text_lines(), ['哎哟♪'], '哎哟♪');
});

test('DUNGEON_VICTORY：默认开场真身', async () => {
  const fixture = await setup_k1();
  const { victory_koujo } = fixture.load_module('kojo/kojo-system');
  await victory_koujo(CID, seq_rand(0));
  assert.ok(
    fixture.text_lines().includes('「我赢不了啊！」') ||
      fixture.text_lines().some((line) => line.includes('赢不了啊')),
    '胜利口上开场',
  );
});

test('DUNGEON_ATTACK：奴隶态 TALENT:11 真身', async () => {
  const fixture = await setup_k1((f) => {
    f.store.set(`cflag:${CID}:1`, 2);
    f.store.set(`talent:${CID}:11`, 1);
  });
  const { attack_koujo } = fixture.load_module('kojo/kojo-system');
  await attack_koujo(CID, seq_rand(0));
  assert.deepEqual(
    fixture.text_lines(),
    ['「怪物！　死吧！」'],
    '「怪物！　死吧！」',
  );
});

test('存根清单可检索：docs/stub-registry.md 收录这张票全部占位名', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = fixture.load_module('kojo/kojo-k1-confident');
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
