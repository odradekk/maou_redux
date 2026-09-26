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
 *   - 成熟出售调用（SELL_MATURO_K0，#338 接通）。
 */
const assert = require('node:assert/strict');
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

test('GOBI_KOUJO：ARG=1 喜悦语尾（返回文字，#570）', async () => {
  const fixture = await setup_k1();
  const { gobi_koujo } = fixture.load_module('kojo/kojo-system');
  assert.equal(await gobi_koujo(1), '哎哟♪', '哎哟♪');
  assert.deepEqual(fixture.text_lines(), [], '语尾真身不得自行打印');
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

// —— #622：拆行合并后的整行断言（每组一处，覆盖该行的各分支组合） ——
//
// 组内各段在原作同属一行（无后缀 PRINTFORM 不换行），ere 曾拆成多条输出。
// 行号是原作 ERB 行号，见 ere/kojo/kojo-k1-confident.js 的拼接锚。

async function speak_self_kojo_k1(fixture, rand, q) {
  const { self_kojo_family } = fixture.load_module('kojo/kojo-system');
  return self_kojo_family.call(1, { args: [rand, q] });
}

async function speak_gohoubi_request_k1(fixture) {
  const { gohoubi_request_koujo_family } = fixture.load_module(
    'kojo/kojo-dungeon-after',
  );
  return gohoubi_request_koujo_family.call(1, { args: [CID] });
}

// TFLAG:89 时 kojo_message_com_1 岔进 DOG_KOJO_1、TFLAG:55 时岔进 COLOSSEUM_KOJO_1
function dog_seed(extra) {
  return (f) => {
    f.store.set(`tequip:${CID}:89`, 1);
    f.store.set(`tflag:13`, 0);
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = 56;
    extra(f);
  };
}

function colosseum_seed(selectcom, extra) {
  return (f) => {
    f.store.set(`tequip:${CID}:55`, 1);
    f.store.set(`base:${CID}:1`, 500);
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.selectcom = selectcom;
    extra(f);
  };
}

test('SELECTCOM 56 交谈·初めて·视频·TALENT:89（RAND:3==0）：:4747+:4749+:4750 是一行（#622）', async () => {
  const fixture = await setup_k1((f) => {
    f.store.set(`tequip:${CID}:53`, 1);
    f.store.set(`talent:${CID}:89`, 1);
    f.store.set(`abl:${CID}:31`, 3);
    f.load_module('era-utils/era-flag').selectcom = 56;
  });
  await speak_k1(fixture, seq_rand(0));
  assert.deepEqual(fixture.text_lines(), [
    `你催促${NAME}进行一下自我介绍。`,
    `于是${NAME}将自己的本名、至今为止的性体验以及自慰时意淫的内容津津有味的说了起来……`,
    `只是想想这个水晶球在故乡公开放映的样子、${NAME}的股间就开始湿了……`,
  ]);
});

test('SELECTCOM 56 交谈·初めて·视频·TALENT:89（RAND:3==0）但 ABL:31 < 3：SIF 段不拼（#622）', async () => {
  const fixture = await setup_k1((f) => {
    f.store.set(`tequip:${CID}:53`, 1);
    f.store.set(`talent:${CID}:89`, 1);
    f.store.set(`abl:${CID}:31`, 2);
    f.load_module('era-utils/era-flag').selectcom = 56;
  });
  await speak_k1(fixture, seq_rand(0));
  assert.equal(
    fixture.text_lines()[1],
    `于是${NAME}将自己的本名、至今为止的性体验津津有味的说了起来……`,
  );
});

test('SELECTCOM 56 交谈·初めて·无摄像·求爱档：:4787+:4789 是一行（#622）', async () => {
  const fixture = await setup_k1((f) => {
    f.store.set(`talent:${CID}:85`, 1);
    f.store.set(`palam:${CID}:5`, 10000); // PALAMLV[4]
    f.store.set('tflag:60', 1);
    f.load_module('era-utils/era-flag').selectcom = 56;
  });
  await speak_k1(fixture);
  assert.deepEqual(fixture.text_lines(), [
    `一边与你说着情话、${NAME}一边扭动着腰。`,
  ]);
});

test('SELECTCOM 56 交谈·初めて·无摄像·装备档：:4793+:4795+:4797+:4799 是一行（#622）', async () => {
  const fixture = await setup_k1((f) => {
    f.store.set(`tequip:${CID}:11`, 1); // 快感装备
    f.store.set(`palam:${CID}:4`, 10000);
    f.store.set(`palam:${CID}:5`, 10000);
    f.load_module('era-utils/era-flag').selectcom = 56;
  });
  await speak_k1(fixture);
  assert.deepEqual(fixture.text_lines(), [
    `一边与你聊天、${NAME}一边发出着快乐的声音、一边拼命地回应着你。`,
  ]);
});

test('SELECTCOM 56 交谈·初めて·无摄像·痛苦装备（TEQUIP:44）：拼「痛苦的」（#622）', async () => {
  const fixture = await setup_k1((f) => {
    f.store.set(`tequip:${CID}:44`, 1);
    f.store.set(`palam:${CID}:4`, 10000);
    f.store.set(`palam:${CID}:5`, 10000);
    f.load_module('era-utils/era-flag').selectcom = 56;
  });
  await speak_k1(fixture);
  assert.deepEqual(fixture.text_lines(), [
    `一边与你聊天、${NAME}一边发出着痛苦的声音、一边拼命地回应着你。`,
  ]);
});

test('SELECTCOM 56 交谈·二回目·视频·TALENT:89（RAND:3==0）：:4833+:4835+:4836 是一行（#622）', async () => {
  const fixture = await setup_k1((f) => {
    f.store.set(`cflag:${CID}:357`, 1);
    f.store.set(`tequip:${CID}:53`, 1);
    f.store.set(`talent:${CID}:89`, 1);
    f.store.set(`abl:${CID}:31`, 3);
    f.load_module('era-utils/era-flag').selectcom = 56;
  });
  await speak_k1(fixture, seq_rand(0));
  assert.deepEqual(fixture.text_lines(), [
    `你催促${NAME}进行一下自我介绍。`,
    `于是${NAME}将自己的本名、至今为止的性体验以及自慰时意淫的内容津津有味的说了起来……`,
    `只是想想这个水晶球在故乡公开放映的样子、${NAME}的股间就开始湿了……`,
  ]);
});

test('SELECTCOM 56 交谈·二回目·无摄像·求爱档：:4873+:4875 是一行（#622）', async () => {
  const fixture = await setup_k1((f) => {
    f.store.set(`cflag:${CID}:357`, 1);
    f.store.set(`talent:${CID}:85`, 1);
    f.store.set(`palam:${CID}:5`, 10000); // PALAMLV[4]
    f.store.set('tflag:60', 1);
    f.load_module('era-utils/era-flag').selectcom = 56;
  });
  await speak_k1(fixture);
  assert.deepEqual(fixture.text_lines(), [
    `你让${NAME}一边扭动着腰一边与你说着情话。`,
  ]);
});

test('SELECTCOM 56 交谈·二回目·无摄像·装备档：:4879+:4881+:4883+:4885 是一行（#622）', async () => {
  const fixture = await setup_k1((f) => {
    f.store.set(`cflag:${CID}:357`, 1);
    f.store.set(`tequip:${CID}:11`, 1);
    f.store.set(`palam:${CID}:4`, 10000);
    f.store.set(`palam:${CID}:5`, 10000);
    f.load_module('era-utils/era-flag').selectcom = 56;
  });
  await speak_k1(fixture);
  assert.deepEqual(fixture.text_lines(), [
    `你让${NAME}一边发出着快乐的声音、一边拼命地回应着你。`,
  ]);
});

test('SELECTCOM 56 交谈·二回目·无摄像·痛苦装备（TEQUIP:44）：拼「痛苦的」（#622）', async () => {
  const fixture = await setup_k1((f) => {
    f.store.set(`cflag:${CID}:357`, 1);
    f.store.set(`tequip:${CID}:44`, 1);
    f.store.set(`palam:${CID}:4`, 10000);
    f.store.set(`palam:${CID}:5`, 10000);
    f.load_module('era-utils/era-flag').selectcom = 56;
  });
  await speak_k1(fixture);
  assert.deepEqual(fixture.text_lines(), [
    `你让${NAME}一边发出着痛苦的声音、一边拼命地回应着你。`,
  ]);
});

test('DOG 兽奸会話·初めて·视频·牝犬：:6341..:6348 与 :6351..:6371 各是一行（#622）', async () => {
  const fixture = await setup_k1(
    dog_seed((f) => {
      f.store.set(`tequip:${CID}:53`, 1);
      f.store.set(`talent:${CID}:136`, 1);
      f.store.set(`cflag:${CID}:601`, 900); // 与野良犬结婚中
      f.store.set(`talent:${CID}:成为勇者前的生活`, 1); // 学生
    }),
  );
  await speak_k1(fixture);
  const lines = fixture.text_lines();
  assert.equal(lines[3], `「现在是优秀的狗的妻子！快乐的作为家畜生活着♡」`);
  assert.equal(
    lines[6],
    `「在最后同班同学的大家、我成为了这样的变态母狗……对不起啊♡」`,
  );
});

test('DOG 兽奸会話·初めて·视频·牝犬·未与狗结婚：另一支走「母狗」（#622）', async () => {
  const fixture = await setup_k1(
    dog_seed((f) => {
      f.store.set(`tequip:${CID}:53`, 1);
      f.store.set(`talent:${CID}:136`, 1);
      f.store.set(`cflag:${CID}:601`, 0);
    }),
  );
  await speak_k1(fixture);
  assert.equal(
    fixture.text_lines()[3],
    `「现在是优秀的母狗！快乐的作为家畜生活着♡」`,
  );
});

test('DOG 兽奸会話·二回目·视频·牝犬：:6403..:6410 与 :6413..:6433 各是一行（#622）', async () => {
  const fixture = await setup_k1(
    dog_seed((f) => {
      f.store.set(`cflag:${CID}:357`, 1);
      f.store.set(`tequip:${CID}:53`, 1);
      f.store.set(`talent:${CID}:136`, 1);
      f.store.set(`cflag:${CID}:601`, 900);
      f.store.set(`talent:${CID}:成为勇者前的生活`, 15); // 商人・パン屋
    }),
  );
  await speak_k1(fixture);
  const lines = fixture.text_lines();
  assert.equal(lines[2], `「现在是优秀的狗的妻子、快乐的作为家畜生活着♡」`);
  assert.equal(
    lines[5],
    `「在最后在我的店里消费过的客人、我成为了这样的变态母狗……对不起啊♡」`,
  );
});

test('DOG 兽奸会話·初めて·视频·牝犬的「在最后」：其余四档各自成句（#622）', async () => {
  const cases = [
    [2, '修道院的大家'],
    [19, '部下的大家'],
    [21, '最重要的你'],
    [0, '爸爸、妈妈'],
  ];
  for (const [life, who] of cases) {
    const fixture = await setup_k1(
      dog_seed((f) => {
        f.store.set(`tequip:${CID}:53`, 1);
        f.store.set(`talent:${CID}:136`, 1);
        f.store.set(`cflag:${CID}:601`, 900);
        f.store.set(`talent:${CID}:成为勇者前的生活`, life);
      }),
    );
    await speak_k1(fixture);
    assert.equal(
      fixture.text_lines()[6],
      `「在最后${who}、我成为了这样的变态母狗……对不起啊♡」`,
      `成为勇者前的生活 == ${life}`,
    );
  }
});

test('DOG 兽奸会話·二回目·视频·牝犬的「在最后」：另一档（最重要的你）（#622）', async () => {
  const fixture = await setup_k1(
    dog_seed((f) => {
      f.store.set(`cflag:${CID}:357`, 1);
      f.store.set(`tequip:${CID}:53`, 1);
      f.store.set(`talent:${CID}:136`, 1);
      f.store.set(`cflag:${CID}:601`, 900);
      f.store.set(`talent:${CID}:成为勇者前的生活`, 21);
    }),
  );
  await speak_k1(fixture);
  assert.equal(
    fixture.text_lines()[5],
    `「在最后最重要的你、我成为了这样的变态母狗……对不起啊♡」`,
  );
});

test('DOG 兽奸会話·初めて·视频·淫乱：:6374+:6376+:6377 是一行（#622）', async () => {
  const fixture = await setup_k1(
    dog_seed((f) => {
      f.store.set(`tequip:${CID}:53`, 1);
      f.store.set(`talent:${CID}:76`, 1);
      f.store.set(`abl:${CID}:31`, 3);
    }),
  );
  await speak_k1(fixture);
  assert.equal(
    fixture.text_lines()[1],
    `${NAME}说出了自己的本名和至今为止关于性的体验、更说出了在自慰的时候意淫的内容、高兴地开始津津有味的说了起来……`,
  );
});

test('DOG 兽奸会話·初めて·视频·爱慕：:6381+:6383+:6384 是一行（#622）', async () => {
  const fixture = await setup_k1(
    dog_seed((f) => {
      f.store.set(`tequip:${CID}:53`, 1);
      f.store.set(`talent:${CID}:85`, 1);
      f.store.set(`abl:${CID}:31`, 2); // 不拼 SIF 段
    }),
  );
  await speak_k1(fixture);
  assert.equal(
    fixture.text_lines()[1],
    `${NAME}说出了自己的本名和至今为止关于性的体验开始高兴地讲着……`,
  );
});

test('DOG 兽奸会話·二回目·视频·淫乱：:6437+:6439+:6440 是一行（#622）', async () => {
  const fixture = await setup_k1(
    dog_seed((f) => {
      f.store.set(`cflag:${CID}:357`, 1);
      f.store.set(`tequip:${CID}:53`, 1);
      f.store.set(`talent:${CID}:76`, 1);
      f.store.set(`abl:${CID}:31`, 3);
    }),
  );
  await speak_k1(fixture);
  assert.equal(
    fixture.text_lines()[0],
    `${NAME}说出了自己的本名和至今为止关于性的体验、更说出了在自慰的时候意淫的内容、高兴地开始津津有味的说了起来……`,
  );
});

test('DOG 兽奸会話·二回目·视频·爱慕：:6445+:6447+:6448 是一行（#622）', async () => {
  const fixture = await setup_k1(
    dog_seed((f) => {
      f.store.set(`cflag:${CID}:357`, 1);
      f.store.set(`tequip:${CID}:53`, 1);
      f.store.set(`talent:${CID}:85`, 1);
      f.store.set(`abl:${CID}:31`, 3);
    }),
  );
  await speak_k1(fixture);
  assert.equal(
    fixture.text_lines()[0],
    `${NAME}说出了自己的本名和至今为止关于性的体验、更说出了在自慰的时候意淫的内容、高兴地开始津津有味的说了起来……`,
  );
});

test('SELF_KOJO 妊娠発覚·牝犬与野良犬结婚（1回目）：:7040+:7042 是一行（#622）', async () => {
  const fixture = await setup_k1((f) => {
    f.store.set('tflag:13', 11);
    f.store.set(`talent:${CID}:136`, 1);
    f.store.set(`cflag:${CID}:102`, 5);
    f.store.set(`cflag:${CID}:601`, 90);
  });
  await speak_self_kojo_k1(fixture, seq_rand(1, 0)); // RAND:2 非 0 → ELSE 支；RAND:9 == 0 → 波奇
  assert.ok(
    fixture
      .text_lines()
      .includes(`「竟然会…和狗生下孩子什么的…唔噗噗…名字叫什么好呢…波奇？」`),
    '同一行里拼出名字',
  );
});

test('SELF_KOJO 妊娠発覚·牝犬与野良犬结婚（2回目）：:7106+:7108 是一行（#622）', async () => {
  const fixture = await setup_k1((f) => {
    f.store.set('tflag:13', 11);
    f.store.set(`cflag:${CID}:271`, 1);
    f.store.set(`talent:${CID}:136`, 1);
    f.store.set(`cflag:${CID}:102`, 5);
    f.store.set(`cflag:${CID}:601`, 90);
  });
  await speak_self_kojo_k1(fixture, seq_rand(1, 0));
  assert.ok(
    fixture
      .text_lines()
      .includes(`「竟然会…和狗生下孩子什么的…唔噗噗…名字叫什么好呢…波奇？」`),
    '同一行里拼出名字（2回目以降）',
  );
});

test('SELF_KOJO 妊娠発覚·牝犬与野良犬结婚（1回目）：非首支也拼前缀（第二支「哈娜？」）（#622）', async () => {
  const fixture = await setup_k1((f) => {
    f.store.set('tflag:13', 11);
    f.store.set(`talent:${CID}:136`, 1);
    f.store.set(`cflag:${CID}:102`, 5);
    f.store.set(`cflag:${CID}:601`, 90);
  });
  // RAND:2 非 0 → ELSE 支；RAND:9 非 0、RAND:8 == 0 → 第二支「哈娜？」
  await speak_self_kojo_k1(fixture, seq_rand(1, 1, 0));
  assert.ok(
    fixture
      .text_lines()
      .includes('「竟然会…和狗生下孩子什么的…唔噗噗…名字叫什么好呢…哈娜？」'),
    '非首支也带前缀（漏拼前缀会红）',
  );
});

test('SELF_KOJO 妊娠発覚·牝犬与野良犬结婚（2回目）：非首支也拼前缀（第二支「哈娜？」）（#622）', async () => {
  const fixture = await setup_k1((f) => {
    f.store.set('tflag:13', 11);
    f.store.set(`cflag:${CID}:271`, 1);
    f.store.set(`talent:${CID}:136`, 1);
    f.store.set(`cflag:${CID}:102`, 5);
    f.store.set(`cflag:${CID}:601`, 90);
  });
  await speak_self_kojo_k1(fixture, seq_rand(1, 1, 0));
  assert.ok(
    fixture
      .text_lines()
      .includes('「竟然会…和狗生下孩子什么的…唔噗噗…名字叫什么好呢…哈娜？」'),
    '非首支也带前缀（2回目以降，漏拼前缀会红）',
  );
});

test('COLOSSEUM SC31 口交·助手在场：:7763+:7765+:7767+:7768 是一行（#622）', async () => {
  const fixture = await setup_k1(
    colosseum_seed(31, (f) => {
      const era_flag = f.load_module('era-utils/era-flag');
      era_flag.assi = 5;
      era_flag.assiplay = 1;
      join_slave_chara(f, 5, '奴隶5');
      f.store.set('talent:5:121', 1); // 真正的小鸡鸡
    }),
  );
  await speak_k1(fixture);
  assert.deepEqual(fixture.text_lines(), [
    `「啊呜…呜嗯…嗯咕…嗯…呼啊……」`,
    `奴隶5因为真正的小鸡鸡被${NAME}含了进去而露出了心旷神怡的表情……`,
  ]);
});

test('COLOSSEUM SC21 背后位·助手在场：:7796+:7798+:7800+:7801 是一行（#622）', async () => {
  const fixture = await setup_k1(
    colosseum_seed(21, (f) => {
      const era_flag = f.load_module('era-utils/era-flag');
      era_flag.assi = 5;
      era_flag.assiplay = 1;
      join_slave_chara(f, 5, '奴隶5');
      f.store.set('item:4', 1); // 假阳具
    }),
  );
  await speak_k1(fixture);
  assert.deepEqual(fixture.text_lines(), [
    `「啊啊啊…啊！这、这样的…不行了不行了～！」`,
    `奴隶5一边听着悲鸣一边用假阳具毫不留情的继续蹂躏${NAME}的阴道……`,
  ]);
});

test('COLOSSEUM SC27 背后位アナル·助手在场：:7820+:7822+:7824+:7825 是一行（#622）', async () => {
  const fixture = await setup_k1(
    colosseum_seed(27, (f) => {
      const era_flag = f.load_module('era-utils/era-flag');
      era_flag.assi = 5;
      era_flag.assiplay = 1;
      join_slave_chara(f, 5, '奴隶5');
      f.store.set('item:4', 1);
    }),
  );
  await speak_k1(fixture);
  assert.deepEqual(fixture.text_lines(), [
    `「啊啊啊…啊！屁、屁股坏掉了呜啊…不行了不行了～！」`,
    `奴隶5一边听着悲鸣一边用假阳具毫不留情的继续蹂躏${NAME}的肛门……`,
  ]);
});

test('GOHOUBI_REQUEST 兽奸要求：:8075..:8083 是一行，兽名三档（#622）', async () => {
  for (const [lv, beast] of [
    [1, '狗'],
    [2, '猪'],
    [3, '马'],
  ]) {
    const fixture = await setup_k1((f) => f.store.set(`cflag:${CID}:504`, lv));
    await speak_gohoubi_request_k1(fixture);
    assert.deepEqual(
      fixture.text_lines(),
      [`「胜利之后、想要和${beast}交尾」`],
      `CFLAG:504==${lv} 兽奸要求`,
    );
  }
});
