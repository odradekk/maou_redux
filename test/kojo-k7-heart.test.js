/**
 * ere/kojo/kojo-k7-heart.js 的行为测试（issue #238：J28 口上·K7 ハート）。
 *
 * 缝 = test/helpers/era-fixture.js。世界底座：金红桃（性格素质 167 →
 * GET_KOJO_NUM = 107 → 分发 key 7）。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_chara_0, join_slave_chara } = require('./helpers/chara');

// 世界底座：金红桃（素质 167 → GET_KOJO_NUM = 107 → 分发 key 7）入列调教
async function setup_k7(seed, selectcom = 0) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 20, '金红桃');
  fixture.era.beginTrain(0, 20);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 20;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = selectcom;
  fixture.store.set('talent:20:167', 1); // 金红桃 → GET_KOJO_NUM = 107
  fixture.store.set('flag:107', 1); // K7 存在标志
  fixture.store.set('flag:7', 2); // 口上总开关默认
  fixture.store.set('talent:0:122', 1); // MASTER 是男性（简易助手分支的守卫）
  if (seed) {
    seed(fixture, era_flag);
  }
  fixture.load_module('kojo/kojo-system');
  fixture.load_module('kojo/kojo-k7-heart');
  return fixture;
}

// —— @EVENTTRAIN：存在标志一对 ——

test('@EVENTTRAIN #PRI 置存在标志、@EVENTEND #LATER 清 0（K7 一对）', async () => {
  const fixture = await setup_k7((f) => f.store.delete('flag:107'));
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(fixture.store.get('flag:107'), 1); // K7 存在标志
  assert.equal(fixture.store.get('flag:7'), 2); // 总开关随之默认开
  await emit('EVENTEND');
  assert.equal(fixture.store.get('flag:107'), 0);
});

// —— @EVENTTRAIN：初調教 CFLAG:201 状态机 ——

test('初調教（CFLAG:201 == 0）：人間分档，推进到 1', async () => {
  const fixture = await setup_k7();
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(
    fixture.text_lines()[0],
    '「啊啦啊啦、终于来见我了吗？魔王」',
    '初调教人间分档首句',
  );
  assert.equal(fixture.store.get('cflag:20:201'), 1, 'CFLAG:201 推进到 1');
});

test('初調教（CFLAG:201 == 0）：魔族分档（TALENT:314 == 9），附带魔族スイッチ１', async () => {
  const fixture = await setup_k7((f) => f.store.set('talent:20:314', 9));
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(
    fixture.text_lines()[0],
    '「呵、呵呵…嘛、就算变成了魔族，我也不会认输的………」',
    '初调教魔族分档首句',
  );
  assert.equal(fixture.store.get('cflag:20:370'), 1, '魔族スイッチ１');
});

test('魔族化（１回のみ）：CFLAG:201<5 且未魔族化时改造，CFLAG:370 = 2', async () => {
  const fixture = await setup_k7((f) => {
    f.store.set('cflag:20:201', 2);
    f.store.set('talent:20:314', 9);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), [
    '「竟然…竟然把我变成魔族什么的！」',
    '你为了让金红桃方便陷落，把她推进实验室进行了魔族化改造。',
    '金红桃表面上看似很平静，实际上受到了难以置信的打击。',
    '「把我变成肮脏的魔族会让你感到满足？差劲！那个恶心的笑…真让人厌恶」',
    '青色的肌肤，瞳孔也变成魔族的黄色、长出了尖尖的翅膀和尾巴金红桃的情绪和反应基本上在预料中、改造完全成功了。',
    '「啊…要是这种姿态被狂王大人看见的话…已经想去死了啦………！」',
    '令人吃惊金红桃好像还有逃出去的意志和企图。你似乎感到很有趣，带着微笑开始了调教………',
  ]);
  assert.equal(fixture.store.get('cflag:20:370'), 2);
});

test('NTR再捕獲（CFLAG:201>=1 && CFLAG:650==1）：爱慕臂清 NTR 开关', async () => {
  const fixture = await setup_k7((f) => {
    f.store.set('cflag:20:201', 2);
    f.store.set('cflag:20:650', 1);
    f.store.set('talent:20:85', 1); // 爱慕
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(
    fixture.text_lines()[0],
    '「啊、魔王大人…哇、我…又像以前那样对您刀剑相向了啊…您、请您原谅…」',
  );
  assert.equal(fixture.store.get('cflag:20:650'), 0);
});

test('屈服刻印分档（各 Lv 一次）：CFLAG:201 2 → 3 → 4', async () => {
  const lv1 = await setup_k7((f) => {
    f.store.set('mark:20:2', 1);
    f.store.set('cflag:20:201', 1);
  });
  const { emit: emit1 } = lv1.load_module('system/event/registry');
  await emit1('EVENTTRAIN');
  assert.deepEqual(lv1.text_lines(), [
    '「呵呵…你的手段差劲透了…真叫人失望」',
    '虽然在上次调教受到了屈辱的对待，不过金红桃比想象中的更能忍受嘛。',
    '「和狂王大人的技术没得比啦、你」',
    '时间还有的是、为了让这个小妞更屈服，继续调教吧………',
  ]);
  assert.equal(lv1.store.get('cflag:20:201'), 2);

  const lv3 = await setup_k7((f) => {
    f.store.set('mark:20:2', 3);
    f.store.set('cflag:20:201', 3);
  });
  const { emit: emit3 } = lv3.load_module('system/event/registry');
  await emit3('EVENTTRAIN');
  assert.equal(lv3.text_lines()[0], '「不要…已、已经不想再来这里了………」');
  assert.equal(lv3.store.get('cflag:20:201'), 4);
});

test('淫乱（{CFLAG:10} 插值 + 处女附注）：CFLAG:201 = 5', async () => {
  const fixture = await setup_k7((f) => {
    f.store.set('cflag:20:201', 4);
    f.store.set('talent:20:76', 1); // 淫乱
    f.store.set('cflag:20:10', 3);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(
    fixture.text_lines()[1],
    '「又来了啊…像这样和我见面…嗯，已经3次了呢」',
    '{CFLAG:10} 插值正确展开',
  );
  assert.equal(fixture.store.get('cflag:20:201'), 5);
});

test('爱慕：CFLAG:201 = 7', async () => {
  const fixture = await setup_k7((f) => {
    f.store.set('cflag:20:201', 6);
    f.store.set('talent:20:85', 1); // 爱慕
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(
    fixture.text_lines()[0],
    '「啊啊…魔王大人…我金红桃向您宣誓永远效忠………」',
  );
  assert.equal(fixture.store.get('cflag:20:201'), 7);
});

test('崩坏（TALENT:9 == 1 && CFLAG:201 < 9）：CFLAG:201 = 9', async () => {
  const fixture = await setup_k7((f) => {
    f.store.set('talent:20:9', 1);
    f.store.set('cflag:20:201', 8);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), [
    '「呼啊…啊…………啊啊…………」',
    '真是够了金红桃精神完完全全的崩溃了。',
    '不管是和她搭话、摇晃肩膀还是殴打她，都没有一点反应………',
  ]);
  assert.equal(fixture.store.get('cflag:20:201'), 9);
});

test('崩坏後は K7_KOJO2 二回目以降へ（CFLAG:201 == 9 时直接岔走，不再打崩坏台词）', async () => {
  const fixture = await setup_k7((f) => {
    f.store.set('talent:20:9', 1);
    f.store.set('cflag:20:201', 9);
    f.store.set('cflag:20:202', 5); // 让简易助手分支不命中，落到 K7_KOJO2 内部判定
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.ok(
    !fixture.text_lines().includes('「呼啊…啊…………啊啊…………」'),
    '崩坏只播一次，二回目以降改走 K7_KOJO2',
  );
});

// —— @EVENTTRAIN：简易助手口上 ——

test('无名助手（TALENT:MASTER:122 == 0）时岔去 K7_KOJO2，不进助手分支', async () => {
  const fixture = await setup_k7((f) => {
    f.store.set('cflag:20:201', 9); // 越过前面所有状态机分支
    f.store.set('talent:0:122', 0); // MASTER 不是男性
  });
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.assi = 21;
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.ok(
    !fixture.text_lines().some((l) => l.includes('紧紧的抱住')),
    'TALENT:MASTER:122 == 0 时不进 NO:ASSI 分支，直接岔去 K7_KOJO2',
  );
});

test('助手银黑桃（NO:ASSI == 21）初めて：爱取得済み分档', async () => {
  const fixture = await setup_k7((f) => {
    f.store.set('cflag:20:201', 9);
    f.store.set('talent:20:85', 1);
  });
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.assi = 21;
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(
    fixture.text_lines()[0],
    '「啊啊啊…真是够了，被你看到了我这个样子…啊嗯…唔、我该怎么办…？」',
  );
  assert.equal(fixture.store.get('cflag:20:202'), 2);
});

test('助手白梅花（NO:ASSI == 23）守卫：TALENT:ASSI:121 == 0 时静默跳过', async () => {
  const fixture = await setup_k7((f) => {
    f.store.set('cflag:20:201', 9);
    f.store.set('talent:23:121', 0); // 白梅花未着装扶她属性
  });
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.assi = 23;
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), []);
});

test('助手黑方片（NO:ASSI == 22）二回目以降 CFLAG:203==2 分支缺 RETURN 1（1:1 保留原作缺陷）', async () => {
  const fixture = await setup_k7((f) => {
    f.store.set('cflag:20:201', 9);
    f.store.set('cflag:20:203', 2);
    f.store.set('talent:20:85', 1);
  });
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.assi = 22;
  const { emit } = fixture.load_module('system/event/registry');
  const result = await emit('EVENTTRAIN');
  assert.equal(
    fixture.text_lines()[0],
    '「哎呀、今日是三个人一起享受吧♡」',
    'TIME 三目按 era_flag.time 展开（默认 0 → 今日）',
  );
  void result;
});

// —— @EVENTEND：调教结束口上 ——

test('@EVENTEND 死亡守卫（BASE:0 <= 0）：静默跳过', async () => {
  const fixture = await setup_k7((f) => f.store.set('base:20:0', 0));
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTEND');
  assert.deepEqual(fixture.text_lines(), []);
});

test('@EVENTEND 崩坏：TALENT:9==1 && FLAG:7==2', async () => {
  const fixture = await setup_k7((f) => {
    f.store.set('base:20:0', 100);
    f.store.set('talent:20:9', 1);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTEND');
  assert.deepEqual(fixture.text_lines(), [
    '「不…讨厌…怪物的孩子不要生下来…不要………」',
    '金红桃脸上混着泪水与口水目光呆滞的躺在地上………',
  ]);
});

test('@EVENTEND 淫乱体力分档：BASE:0 >= 500 与 <= 500 两臂不同台词', async () => {
  const high = await setup_k7((f) => {
    f.store.set('base:20:0', 600);
    f.store.set('talent:20:76', 1);
  });
  const { emit: emit1 } = high.load_module('system/event/registry');
  await emit1('EVENTEND');
  assert.equal(
    high.text_lines()[0],
    '「啊啊真是的…我感觉一点也不够啊…呐…难道是对我的身体厌倦了吗？」',
  );

  const low = await setup_k7((f) => {
    f.store.set('base:20:0', 400);
    f.store.set('talent:20:76', 1);
  });
  const { emit: emit2 } = low.load_module('system/event/registry');
  await emit2('EVENTEND');
  assert.equal(low.text_lines()[0], '「呼啊呼啊…如果再抱我一下…就满足了………♡」');
});
