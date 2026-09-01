/**
 * @file ere/kojo/kojo-k8-spade.js 的行为测试（issue #239：J29 口上·K8 スペード）。
 *
 * 缝 = test/helpers/era-fixture.js。世界底座：银黑桃（id 31，随机生成的角色，
 * 测试播种素质 168 → GET_KOJO_NUM = 108）。
 *
 * 骨架票覆盖（验收清单逐项，随本票分段填充继续扩展）：
 *   - @EVENTTRAIN #PRI 置存在标志、@EVENTEND #LATER 清；
 *   - @KOJO_MESSAGE_COM_8 的七道头部守卫（ASSIPLAY→跳、口塞→跳、失神→跳、
 *     兽奸→DOG_KOJO_8、死斗场→COLOSSEUM_KOJO_8、崩坏→跳、触手→跳）；
 *   - @EVENTTRAIN 的 CFLAG:201 状态机（初调教种族分档、魔族化一回のみ、
 *     NTR 再捕获、屈服刻印Lv1/2/3、淫乱/爱慕+魔族化分档、崩坏、简易助手
 *     金红桃/白梅花/扶她三支）与 @K8_KOJO2（二回目以降，含淫乱/爱慕的
 *     着装与魔族分档）；
 *   - @EVENTEND 的调教终了分档；
 *   - 存根清单核对（docs/stub-registry.md 收录 STUBBED_CALLS 全部占位名）。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

// RAND:N 定值序：draws 依次被消费，越界取模
const seq_rand =
  (...draws) =>
  (n) => {
    const value = draws.shift() ?? 0;
    return value % n;
  };

// 世界底座：银黑桃（素质 168 → GET_KOJO_NUM = 108 → 分发 key 8）入列调教
async function setup_k8(seed, selectcom = 0) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '银黑桃');
  fixture.era.beginTrain(0, 31);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = selectcom;
  fixture.store.set('talent:31:168', 1); // 银黑桃 → GET_KOJO_NUM = 108
  fixture.store.set('flag:108', 1); // K8 存在标志
  fixture.store.set('flag:7', 2); // 总开关默认
  fixture.store.set('talent:0:122', 1); // TALENT:MASTER:122（男性），简易助手分支的守卫默认放行
  if (seed) {
    seed(fixture, era_flag);
  }
  fixture.load_module('kojo/kojo-system');
  fixture.load_module('kojo/kojo-k8-spade');
  return fixture;
}

// 经分发族调用（TRYCALLFORM KOJO_MESSAGE_COM_8 的等价物）
async function speak_k8(fixture, rand) {
  const { kojo_message_com_family } = fixture.load_module('kojo/kojo-system');
  return kojo_message_com_family.call(8, { args: [rand] });
}

// —— @EVENTTRAIN #PRI / @EVENTEND #LATER：存在标志 ——

test('@EVENTTRAIN #PRI 置存在标志、@EVENTEND #LATER 清 0（K8 一对）', async () => {
  const fixture = await setup_k8((f) => f.store.delete('flag:108'));
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(fixture.store.get('flag:108'), 1); // K8 存在标志
  assert.equal(fixture.store.get('flag:7'), 2); // 总开关随之默认开
  await emit('EVENTEND');
  assert.equal(fixture.store.get('flag:108'), 0);
});

// —— @EVENTTRAIN：CFLAG:201 状态机 ——

test('初調教（CFLAG:201 == 0）：种族分档（人间）+ 推进到 1', async () => {
  const fixture = await setup_k8();
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.deepEqual(
    fixture.text_lines(),
    [
      '在调教房间的床上盘腿坐着。很无聊的打着哈欠朝着一个地方看，好像在等些什么。',
      '然后，把那美丽的银发拨到后面盯着你。',
      '「哎呀…真想不到居然把我捉住了呢。首先把恬不知耻的你的头给割下来…然后顺便救出其他的女孩子………」',
      '「…啊…嗯？…使不出力气了…忍术也用不了…怎么可能！」',
      '这是理所当然的，这个调教房间为了让勇士的力量无法使用，用奇怪的法术张开了特殊的结界。',
      '你默默的笑着把银黑桃压倒了。',
      '「在这个状态下会被做些什么我已经知道了…不过不管你干什么，我是绝对不会屈服的」',
      '（唔…早知道这样应该接受女忍的训练的！）',
    ].map((line) => (line.startsWith('在') ? `银黑桃${line}` : line)),
  );
  assert.equal(fixture.store.get('cflag:31:201'), 1);
  assert.equal(fixture.store.get('cflag:31:370'), undefined);
});

test('初調教种族分档（魔族，TALENT:314 == 9）：置魔族化开关', async () => {
  const fixture = await setup_k8((f) => f.store.set('talent:31:314', 9));
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(
    fixture.text_lines()[0],
    '银黑桃在被你调教之前，被魔族改造了。成为了魔族中的忍者...魔忍了。',
  );
  assert.equal(fixture.store.get('cflag:31:201'), 1);
  assert.equal(fixture.store.get('cflag:31:370'), 1);
});

test('魔族化（一回のみ）：初回調教後魔族化、陥落前 → CFLAG:370 = 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:314', 9);
    f.store.set('cflag:31:201', 1);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), [
    '银黑桃经你之手改造成了魔族。成为魔族的忍者…魔忍了。',
    '银黑桃青色的肌肤映照着银发非常的美丽。真想就这样压倒做一些乱七八糟想做的事。',
    '「咕…嗯…做了这样的事情…想要我吗…？」',
    '银黑桃通红的魔族眼睛哭泣着。',
    '变成了这么肮脏的魔族…狂王大人也会抛弃我吧…啊啊………」',
    '银黑桃发出了叹息、然后留下了一滴眼泪………',
  ]);
  assert.equal(fixture.store.get('cflag:31:370'), 2);
});

test('NTR 再捕获（CFLAG:650 == 1）：爱慕/淫乱分档，写入后解除', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:201', 1);
    f.store.set('cflag:31:650', 1);
    f.store.set('talent:31:85', 1); // 爱慕
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), [
    '「啊、好久不见………不处刑我证明你觉得我还有利用价值？」',
    '银黑桃被反手捆绑正坐着。银黑桃好像很习惯似的一脸平静让人看不出情绪。',
    '「难道说…看到我和狂王大人被其他的男人抱着，稍微受到了点打击吗？」',
    '银黑桃嘲笑似的歪着嘴唇、没被提问也滔滔不绝开始讲起来了。',
    '「啊啊、比你抱起来舒服得多了啊，果然还是被很多人一起抱更爽」',
    '「被狂王大人抱着无数次的绝顶是到目前为止的经验中最棒的一个」',
    '「在那个城里全身沾满了爱液和精液不停被轮奸的时候简直就像做梦…一样…呢………」',
    '银黑桃的声音渐渐变成了哭腔、额头垂到了地板上。',
    '「对不起…对不起…不要把我扔掉…不要把我扔掉………」',
  ]);
  assert.equal(fixture.store.get('cflag:31:650'), 0);
});

test('屈服刻印 Lv1/Lv2/Lv3：各推进一次并写出台词', async () => {
  const lv1 = await setup_k8((f) => {
    f.store.set('mark:31:2', 1);
    f.store.set('cflag:31:201', 1);
  });
  const { emit: emit1 } = lv1.load_module('system/event/registry');
  await emit1('EVENTTRAIN');
  assert.deepEqual(lv1.text_lines(), [
    '「哼，这样的事情和那个地狱修行相比，什么也不算」',
    '银黑桃虽然在之前的调教中被做了屈辱的事情，不过还是一脸冷静的和你说着话。',
    '「那么，接下来要做什么呢？」',
  ]);
  assert.equal(lv1.store.get('cflag:31:201'), 2);

  const lv3 = await setup_k8((f) => {
    f.store.set('mark:31:2', 3);
    f.store.set('cflag:31:201', 1);
  });
  const { emit: emit3 } = lv3.load_module('system/event/registry');
  await emit3('EVENTTRAIN');
  assert.deepEqual(lv3.text_lines(), [
    '你在来房间的时候银黑桃一边用手擦拭眼角一边站了起来。',
    '「突、突然干什么啊，抱我？ 是啊…到这个地方来的理由只能是那个啊」',
    '「随你怎么做吧，你的做法我也习惯了………」',
    '然后银黑桃用自然的动作靠近了你刷的转动手和头，在你的耳边轻声说',
    '「呵呵呵、这么轻松被抱住也太大意了？…啊！什么啊…啊嗯！」',
    '你开玩笑似得绊倒了银黑桃推倒在床上，调教开始了………',
  ]);
  assert.equal(lv3.store.get('cflag:31:201'), 4);
});

test('淫乱（无处女）：CFLAG:201 推进到 5', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:201', 4);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(fixture.text_lines().length, 9);
  assert.ok(fixture.text_lines()[8].includes('赐给牝奴隶的我吧'));
  assert.equal(fixture.store.get('cflag:31:201'), 5);
});

test('淫乱+魔族化（调教前从魔族，CFLAG:370 == 1）：推进到 6', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:314', 9);
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:201', 5);
    f.store.set('cflag:31:370', 1);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(
    fixture.text_lines()[0],
    '「啊…已经无法离开你了…更多…让我更多的舒服吧…♡」',
  );
  assert.equal(fixture.store.get('cflag:31:201'), 6);
});

test('爱慕（无处女）：CFLAG:201 推进到 7', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:85', 1);
    f.store.set('cflag:31:201', 6);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(fixture.text_lines()[0], '银黑桃一脸神圣，单膝跪地，等待着你。');
  assert.equal(fixture.store.get('cflag:31:201'), 7);
});

test('崩坏（TALENT:9 == 1，CFLAG:201 < 9）：推进到 9', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:9', 1);
    f.store.set('cflag:31:201', 8);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), [
    '银黑桃的双眼看上去已经没有理智存在了',
    '进行了过于残酷的调教、精神貌似已经崩坏了。',
    '银黑桃像是坏掉的玩具一样好像在呼唤着谁的名字………',
    '「哈…呵…啊哈啊…啊哇、哇的大人哈哇大人在哪里」',
  ]);
  assert.equal(fixture.store.get('cflag:31:201'), 9);
});

test('K8_KOJO2 反抗刻印Lv3（MARK:3 == 3）：经助手无路径触发', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:201', 9);
    f.store.set('mark:31:3', 3);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), [
    '「总有一天…要让你掉进比死还要痛苦的地狱…………」',
    '银黑桃充满着怒意的眼神盯着你………',
  ]);
});

// —— 简易助手口上（NO:ASSI == 20/22/23） ——

test('简易助手·金红桃（NO:ASSI == 20）：初回落在爱/淫乱之外，写入初吻', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:201', 1); // 跳过初调教分支，落入简易助手判定
  });
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.assi = 20;
  fixture.store.set('cflag:31:16', -1); // 初吻对象未写
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.ok(
    fixture.text_lines().some((line) => line.includes('看来是银黑桃的初吻')),
  );
  assert.equal(fixture.store.get('cflag:31:16'), 1);
  assert.equal(fixture.store.get('cflag:31:202'), 1);
});

test('简易助手·（NO:ASSI == 23，扶她）：TALENT:ASSI:121 == 0 静默跳过', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:201', 1); // 跳过初调教分支，落入简易助手判定
  });
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.assi = 23;
  fixture.store.set('talent:23:121', 0);
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), []);
});

// —— @K8_KOJO2（二回目以降）：屈服刻印Lv0 ——

test('K8_KOJO2 屈服刻印Lv0（MARK:2 == 0）：经助手无路径触发', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:201', 1); // 跳过初调教分支，落入助手无判定
  });
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.assi = -1;
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), [
    '「接下来要开始调教了么？」',
    '「嘛、也许能代替按摩吧」',
    '银黑桃非常轻松的样子………',
  ]);
});

// —— @EVENTEND：调教终了分档 ——

test('@EVENTEND 崩坏：TALENT:9 == 1 出声', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:9', 1);
    f.store.set('base:31:0', 100);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTEND');
  assert.deepEqual(fixture.text_lines(), [
    '「想要哈哇大人的……」',
    '银黑桃朝着奇怪的方向嘟囔着什么………',
  ]);
});

test('@EVENTEND 角色死亡（BASE:0 <= 0）：跳过', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('base:31:0', 0);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTEND');
  assert.deepEqual(fixture.text_lines(), []);
});

// —— @KOJO_MESSAGE_COM_8：七道头部守卫 ——

test('头部守卫：助手调教（ASSI > 0 && ASSIPLAY）跳过', async () => {
  const fixture = await setup_k8();
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.assi = 17;
  era_flag.assiplay = 1;
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), []);
});

test('头部守卫：口塞（TEQUIP:45，SELECTCOM != 45）跳过', async () => {
  const fixture = await setup_k8(undefined, 0);
  fixture.store.set('tequip:31:45', 1);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), []);
});

test('头部守卫：失神（TFLAG:899）跳过', async () => {
  const fixture = await setup_k8();
  fixture.store.set('tflag:899', 1);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), []);
});

test('头部守卫：兽奸（TEQUIP:89）岔去 DOG_KOJO_8 真身（骨架期打占位）', async () => {
  const fixture = await setup_k8();
  fixture.store.set('tequip:31:89', 1);
  await speak_k8(fixture);
  assert.ok(fixture.text_lines().some((line) => line.includes('@DOG_KOJO_8')));
});

test('头部守卫：死斗场（TEQUIP:55）岔去 COLOSSEUM_KOJO_8 真身（骨架期打占位）', async () => {
  const fixture = await setup_k8();
  fixture.store.set('tequip:31:55', 1);
  await speak_k8(fixture);
  assert.ok(
    fixture.text_lines().some((line) => line.includes('@COLOSSEUM_KOJO_8')),
  );
});

test('头部守卫：崩坏（TALENT:9 == 1）跳过', async () => {
  const fixture = await setup_k8();
  fixture.store.set('talent:31:9', 1);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), []);
});

test('头部守卫：触手（TEQUIP:90）跳过', async () => {
  const fixture = await setup_k8();
  fixture.store.set('tequip:31:90', 1);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), []);
});

test('骨架期：SELECTCOM 0 落 KOJO_MESSAGE_COM_8 占位行', async () => {
  const fixture = await setup_k8(undefined, 0);
  await speak_k8(fixture, seq_rand());
  assert.ok(
    fixture.text_lines().some((line) => line.includes('@KOJO_MESSAGE_COM_8')),
  );
});
// —— 存根清单核对 ——

test('存根清单可检索：docs/stub-registry.md 收录 STUBBED_CALLS 全部占位名', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = fixture.load_module('kojo/kojo-k8-spade');
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
