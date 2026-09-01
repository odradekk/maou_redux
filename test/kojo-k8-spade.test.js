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
  assert.equal(fixture.store.get('cflag:31:201'), 1, 'CFLAG:201 推进到 1');
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
  assert.ok(
    fixture.text_lines()[8].includes('赐给牝奴隶的我吧'),
    '淫乱分档末句：赐给牝奴隶的我吧',
  );
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
    '初吻旁白：看来是银黑桃的初吻',
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
  assert.ok(
    fixture.text_lines().some((line) => line.includes('@DOG_KOJO_8')),
    '占位行含 @DOG_KOJO_8',
  );
});

test('头部守卫：死斗场（TEQUIP:55）岔去 COLOSSEUM_KOJO_8 真身（骨架期打占位）', async () => {
  const fixture = await setup_k8();
  fixture.store.set('tequip:31:55', 1);
  await speak_k8(fixture);
  assert.ok(
    fixture.text_lines().some((line) => line.includes('@COLOSSEUM_KOJO_8')),
    '占位行含 @COLOSSEUM_KOJO_8',
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

// —— KOJO_MESSAGE_COM_8：SELECTCOM 0 爱撫 / 1 舔阴（已实现的两支） ——

test('SELECTCOM 0 爱撫，初めて（CFLAG:301 == 0）：屈服刻印Lv2以上分档 + 推进到 1', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('mark:31:2', 2);
  }, 0);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「呵呵呵…就像稍微强一点的按摩一样呢」',
    '「嗯…啊…啊哈哈…好痒啊」',
  ]);
  assert.equal(fixture.store.get('cflag:31:301'), 1, 'CFLAG:301 推进到 1');
});

test('SELECTCOM 0 爱撫，二回目以降·淫乱：CFLAG:301 推进到 6', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:301', 3);
    f.store.set('talent:31:76', 1);
  }, 0);
  await speak_k8(fixture);
  assert.equal(fixture.text_lines()[2], '银黑桃被你爱抚着，腰部扭动了起来………');
  assert.equal(fixture.store.get('cflag:31:301'), 6, 'CFLAG:301 推进到 6');
});

test('SELECTCOM 1 舔阴，初めて（CFLAG:302 == 0）：处女分档 + 推进到 1', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:0', 1);
  }, 1);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「呵呵呵、知道了吗？我还是处女呢…嗯…嗯…因为是处女所以兴奋了吗、啊啊…那么用力…！」',
    '你开始舔着银黑桃散发着处女味道的秘裂………',
  ]);
  assert.equal(fixture.store.get('cflag:31:302'), 1, 'CFLAG:302 推进到 1');
});

test('SELECTCOM 1 舔阴，二回目以降·それ以外（屈服刻印Lv3未满）：CFLAG:302 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:302', 1);
  }, 1);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「唔…啊啊…唔…呜…！简直跟狗一样的舔法…啊啊！」',
    '银黑桃扭动着腰想要从你的嘴边逃开、就那样被你压住了腰………',
  ]);
  assert.equal(fixture.store.get('cflag:31:302'), 2, 'CFLAG:302 推进到 2');
});

// —— KOJO_MESSAGE_COM_8：SELECTCOM 2 阿纳尔爱撫 / 3 自慰 / 5 胸爱撫 / 6 接吻 /
//    7 自己扒开 / 8 插入手指 / 9 舔肛 / 10 振动宝石 ——

test('SELECTCOM 2 阿纳尔爱撫，初めて（CFLAG:303 == 0）：A感覚Lv3以上分档 + 推进到 1', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('abl:31:3', 3);
  }, 2);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊…啊~啊！菊花…嗯…啊哈…好舒服…啊啊…啊啊！」',
    '银黑桃被开发了的肛门因为你的爱抚，反应很敏感………',
  ]);
  assert.equal(fixture.store.get('cflag:31:303'), 1, 'CFLAG:303 推进到 1');
});

test('SELECTCOM 2 阿纳尔爱撫，二回目以降·淫乱+润滑Lv2以上：CFLAG:303 推进到 7', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:303', 3);
    f.store.set('talent:31:76', 1);
    f.store.set('palam:31:3', 1000000);
  }, 2);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊…啊啊…再摸摸我的肛门吧♡ 嗯…好舒服♡」',
    '银黑桃被你爱抚着发出了娇艳的声音………',
  ]);
  assert.equal(fixture.store.get('cflag:31:303'), 7, 'CFLAG:303 推进到 7');
});

test('SELECTCOM 3 自慰，初めて（CFLAG:304 == 0）：推进到 1', async () => {
  const fixture = await setup_k8(undefined, 3);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「哈啊哈啊…啊…啊啊…嗯…哈啊哈啊…啊…嗯！」',
    '银黑桃闭着眼睛自慰着、好像是在想着谁似得………',
  ]);
  assert.equal(fixture.store.get('cflag:31:304'), 1, 'CFLAG:304 推进到 1');
});

test('SELECTCOM 3 自慰，二回目以降·それ以外（RAND:2 == 0）：CFLAG:304 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:304', 1);
  }, 3);
  await speak_k8(fixture, seq_rand(0));
  assert.deepEqual(fixture.text_lines(), [
    '「哈…啊…嗯…嗯…哈啊哈啊…啊…啊啊！」',
    '银黑桃非常熟练的自慰着………',
  ]);
  assert.equal(fixture.store.get('cflag:31:304'), 2, 'CFLAG:304 推进到 2');
});

test('SELECTCOM 5 胸爱撫，初めて（CFLAG:306 == 0）：非母乳体质·それ以外 + 推进到 1', async () => {
  const fixture = await setup_k8(undefined, 5);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊…嗯…嗯…啊…稍微温柔一点啊…我的胸部很敏感的…啊、没什么…啊、嗯！」',
  ]);
  assert.equal(fixture.store.get('cflag:31:306'), 1, 'CFLAG:306 推进到 1');
});

test('SELECTCOM 5 胸爱撫，二回目以降·それ以外（非母乳体质）：CFLAG:306 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:306', 1);
  }, 5);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊…嗯…嗯咕…哈啊哈啊…确实的进攻我的弱点，不愧是魔王呢…啊…！」',
    '银黑桃被你爱抚着胸部，反应很敏感的样子………',
  ]);
  assert.equal(fixture.store.get('cflag:31:306'), 2, 'CFLAG:306 推进到 2');
});

test('SELECTCOM 6 接吻，（調教で）初めて（CFLAG:307 == 0 && !TFLAG:13）：それ以外 + 推进到 1', async () => {
  const fixture = await setup_k8(undefined, 6);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯、呼…快…离开…唔…从我嘴里把你的………」',
    '银黑桃和你嘴唇分开后抹了抹嘴角………',
  ]);
  assert.equal(fixture.store.get('cflag:31:307'), 1, 'CFLAG:307 推进到 1');
});

test('SELECTCOM 6 接吻，初吻（CFLAG:307 == 0 && TFLAG:13）：それ以外 + 推进到 1', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tflag:13', 1);
  }, 6);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯…咕…别这样…为什么第一次是你…！」',
    '银黑桃和你嘴唇分开后抹了抹嘴角………',
  ]);
  assert.equal(fixture.store.get('cflag:31:307'), 1, 'CFLAG:307 推进到 1');
});

test('SELECTCOM 6 接吻，二回目以降·それ以外：CFLAG:307 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:307', 1);
  }, 6);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「呜…呜呜…嘴唇…果然很不舒服…啊…呜！」',
    '你把银黑桃抱在怀里，不停的亲吻着………',
  ]);
  assert.equal(fixture.store.get('cflag:31:307'), 2, 'CFLAG:307 推进到 2');
});

test('SELECTCOM 7 自己扒开，初めて（CFLAG:308 == 0）：それ以外 + 推进到 1', async () => {
  const fixture = await setup_k8(undefined, 7);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「唔…屈辱啊…这个样子………」',
    '银黑桃大大的张开自己的大腿、用手指分开着自己的小穴。脸上因为羞耻而十分红润。',
    '「笨、笨蛋…”漂亮”是什么意思啊…呜！」',
  ]);
  assert.equal(fixture.store.get('cflag:31:308'), 1, 'CFLAG:308 推进到 1');
});

test('SELECTCOM 7 自己扒开，二回目以降·それ以外：源作误写为 CFLAG:306，1:1 保留原作寻址', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:308', 1);
  }, 7);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「哈啊…哈啊……不用继续摆这个姿势了吧？ 诶、还有5分钟？唔…呜…饶、饶了我吧…啊啊！」',
    '银黑桃服从着你那屈辱的命令。',
    '「啊、啊啊…我已经………」',
  ]);
  assert.equal(
    fixture.store.get('cflag:31:306'),
    2,
    'CFLAG:306（非 308）推进到 2，复现源作寻址错误',
  );
  assert.equal(
    fixture.store.get('cflag:31:308'),
    1,
    'CFLAG:308 保持不变（未被二回目分支写过）',
  );
});

test('SELECTCOM 8 插入手指，初めて（CFLAG:309 == 0）：それ以外 + 推进到 1', async () => {
  const fixture = await setup_k8(undefined, 8);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯…唔…你的手指…再稍微温柔一点啊…啊啊…！啊、这么深…啊啊！」',
  ]);
  assert.equal(fixture.store.get('cflag:31:309'), 1, 'CFLAG:309 推进到 1');
});

test('SELECTCOM 8 插入手指，二回目以降·それ以外：CFLAG:309 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:309', 1);
  }, 8);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「我的…啊啊啊…那里…被这样玩弄的话…咕…啊！」',
  ]);
  assert.equal(fixture.store.get('cflag:31:309'), 2, 'CFLAG:309 推进到 2');
});

test('SELECTCOM 9 舔肛，初めて（CFLAG:310 == 0）：それ以外 + 推进到 1', async () => {
  const fixture = await setup_k8(undefined, 9);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯…嗯…啊啊…快住…快助手啊！…我的…那个地方…啊啊明明很脏的！」',
  ]);
  assert.equal(fixture.store.get('cflag:31:310'), 1, 'CFLAG:310 推进到 1');
});

test('SELECTCOM 9 舔肛，二回目以降·それ以外：CFLAG:310 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:310', 1);
  }, 9);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「哈…嗯…嗯…不、不要再这样了…啊啊…我的屁股…啊啊快停下啊！」',
    '你用舌头让银黑桃紧固的花蕾一点点开始变习惯了………',
  ]);
  assert.equal(fixture.store.get('cflag:31:310'), 2, 'CFLAG:310 推进到 2');
});

test('SELECTCOM 10 振动宝石，初めて（CFLAG:311 == 0）：それ以外 + 推进到 1', async () => {
  const fixture = await setup_k8(undefined, 10);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯…这个稍微有点痒啊…啊嗯…已、已经…嗯…啊啊！」',
  ]);
  assert.equal(fixture.store.get('cflag:31:311'), 1, 'CFLAG:311 推进到 1');
});

test('SELECTCOM 10 振动宝石，二回目以降·それ以外：CFLAG:311 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:311', 1);
  }, 10);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯…这个稍微有点痒啊…啊嗯…已、已经…嗯…啊啊！」',
    '银黑桃敏感部分被振动宝石贴着而发出了叫声',
  ]);
  assert.equal(fixture.store.get('cflag:31:311'), 2, 'CFLAG:311 推进到 2');
});

test('SELECTCOM 10 振动宝石，二回目以降·淫乱：CFLAG:311 推进到 5', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:311', 3);
    f.store.set('talent:31:76', 1);
  }, 10);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「那是我的…敏感部位…继续…啊啊♡」',
    '银黑桃振动宝石贴住阴蒂的刺激让她发出了娇喘',
    '「啊啊啊,我的阴蒂♡ 啊啊啊啊啊♡ 做更多舒服的事情吧♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:311'), 5, 'CFLAG:311 推进到 5');
});

// —— KOJO_MESSAGE_COM_8：SELECTCOM 11 壶虫 / 12 振动杖 / 13 肛门虫 / 14 阴蒂夹 /
//    15 乳头夹 / 16 榨乳器 / 19 肛珠（TEQUIP 開始/脱着双档） ——

test('SELECTCOM 11 壶虫，開始時 初めて（TEQUIP:11=1，CFLAG:312==0）：处女それ以外 + 推进到 1', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tequip:31:11', 1);
  }, 11);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯…这种蠕虫…根本就不可能进来吧…嗯啊啊啊！」',
  ]);
  assert.equal(fixture.store.get('cflag:31:312'), 1, 'CFLAG:312 推进到 1');
});

test('SELECTCOM 11 壶虫，開始時 二回目以降·それ以外：CFLAG:312 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tequip:31:11', 1);
    f.store.set('cflag:31:312', 1);
  }, 11);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊啊…不要欺负…我那里啊……啊啊啊…啊！」',
    '银黑桃被蠕虫刺进了小穴深处………',
  ]);
  assert.equal(fixture.store.get('cflag:31:312'), 2, 'CFLAG:312 推进到 2');
});

test('SELECTCOM 11 壶虫，脱着時（TEQUIP:11=0）·それ以外：CFLAG:372 推进到 1', async () => {
  const fixture = await setup_k8(undefined, 11);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), ['「啊…啊啊啊…我的那里…啊啊……」']);
  assert.equal(fixture.store.get('cflag:31:372'), 1, 'CFLAG:372 推进到 1');
});

test('SELECTCOM 12 振动杖，初めて（CFLAG:313==0）：それ以外 + 推进到 1', async () => {
  const fixture = await setup_k8(undefined, 12);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊…啊啊…这种…振动的话我…啊啊…应该有办法…嗯…咕！」',
  ]);
  assert.equal(fixture.store.get('cflag:31:313'), 1, 'CFLAG:313 推进到 1');
});

test('SELECTCOM 12 振动杖，二回目以降·屈服刻印Lv3：CFLAG:313 推进到 3', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:313', 1);
    f.store.set('mark:31:2', 3);
  }, 12);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯…咕…嗯…振动…我的那里…啊啊！」',
    '银黑桃紧闭着眼睛皱着眉，抵抗着快感',
    '可是那淫靡的震动却确实的不断给予着银黑桃的身体快乐的波浪………',
  ]);
  assert.equal(fixture.store.get('cflag:31:313'), 3, 'CFLAG:313 推进到 3');
});

test('SELECTCOM 12 振动杖，二回目以降·それ以外：CFLAG:313 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:313', 1);
  }, 12);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…我的…那里…变得…要变得…奇怪了…停下…啊！」',
    '银黑桃振动杖的刺激让她发出悲鸣',
  ]);
  assert.equal(fixture.store.get('cflag:31:313'), 2, 'CFLAG:313 推进到 2');
});

test('SELECTCOM 13 肛门虫，開始時 初めて（TEQUIP:13=1，CFLAG:314==0）：それ以外 + 推进到 1', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tequip:31:13', 1);
  }, 13);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「停，停下，把这么肮脏的蠕虫…放进来…啊啊啊」',
    '银黑桃因为肛门被塞入蠕虫而发出痛苦的声音你让肛门虫前后动着',
  ]);
  assert.equal(fixture.store.get('cflag:31:314'), 1, 'CFLAG:314 推进到 1');
});

test('SELECTCOM 13 肛门虫，開始時 二回目以降·それ以外：CFLAG:314 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tequip:31:13', 1);
    f.store.set('cflag:31:314', 1);
  }, 13);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「不、不要…好、好难受…我的屁股要变得奇怪了…啊…啊啊——！',
    '银黑桃因为肛门被塞入蠕虫而发出痛苦的声音。像是在享受着这个声音的你让肛门虫前后动着………',
  ]);
  assert.equal(fixture.store.get('cflag:31:314'), 2, 'CFLAG:314 推进到 2');
});

test('SELECTCOM 13 肛门虫，脱着時（TEQUIP:13=0）·それ以外：CFLAG:374 推进到 1', async () => {
  const fixture = await setup_k8(undefined, 13);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), ['「啊啊…我的肛门…嗯…奇怪了………」']);
  assert.equal(fixture.store.get('cflag:31:374'), 1, 'CFLAG:374 推进到 1');
});

test('SELECTCOM 14 阴蒂夹，開始時 初めて（TEQUIP:14=1，CFLAG:315==0）：それ以外 + 推进到 1', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tequip:31:14', 1);
  }, 14);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「因、因为这种拷问道具而有感觉什么的…啊啊…啊…我的阴蒂…这样…啊啊！」',
    '夹着银黑桃的阴蒂阴蒂夹毫不留情的给予着银黑桃快感',
  ]);
  assert.equal(fixture.store.get('cflag:31:315'), 1, 'CFLAG:315 推进到 1');
});

test('SELECTCOM 14 阴蒂夹，開始時 二回目以降·それ以外：CFLAG:315 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tequip:31:14', 1);
    f.store.set('cflag:31:315', 1);
  }, 14);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…不要再欺负我的阴蒂了…啊…啊啊——！」',
    '银黑桃的双膝因为被被装上电动阴蒂夹而相互摩擦着，就这样昏了过去',
  ]);
  assert.equal(fixture.store.get('cflag:31:315'), 2, 'CFLAG:315 推进到 2');
});

test('SELECTCOM 14 阴蒂夹，脱着時（TEQUIP:14=0）·それ以外：CFLAG:375 推进到 1', async () => {
  const fixture = await setup_k8(undefined, 14);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), ['「哈啊…哈啊…我…已经………」']);
  assert.equal(fixture.store.get('cflag:31:375'), 1, 'CFLAG:375 推进到 1');
});

test('SELECTCOM 15 乳头夹，開始時 初めて（TEQUIP:15=1，CFLAG:316==0）：それ以外 + 推进到 1', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tequip:31:15', 1);
  }, 15);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊…乳头不行…这个、快点拿掉…啊…呜啊啊啊！」',
    '银黑桃的乳头被乳头夹轻轻夹住，银黑桃发出了悲鸣………',
  ]);
  assert.equal(fixture.store.get('cflag:31:316'), 1, 'CFLAG:316 推进到 1');
});

test('SELECTCOM 15 乳头夹，開始時 二回目以降·それ以外：CFLAG:316 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tequip:31:15', 1);
    f.store.set('cflag:31:316', 1);
  }, 15);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯…啊…啊…咕…嗯…我的乳头…啊啊…太舒服了…」',
    '银黑桃发出了炽热的叹息声………………',
  ]);
  assert.equal(fixture.store.get('cflag:31:316'), 2, 'CFLAG:316 推进到 2');
});

test('SELECTCOM 15 乳头夹，脱着時（TEQUIP:15=0）·それ以外：CFLAG:376 推进到 1', async () => {
  const fixture = await setup_k8(undefined, 15);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「哈啊哈啊…啊…这种东西………」',
    '银黑桃难过的看着夹子被拿下来………',
  ]);
  assert.equal(fixture.store.get('cflag:31:376'), 1, 'CFLAG:376 推进到 1');
});

test('SELECTCOM 16 榨乳器，開始時 初めて（TEQUIP:16=1，CFLAG:317==0）：それ以外 + 推进到 1', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tequip:31:16', 1);
  }, 16);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊嗯…啊…我的胸部…那样…嗯…啊啊啊！」',
    '银黑桃因为被榨乳器强行榨乳的感觉而发出了悲鸣………',
  ]);
  assert.equal(fixture.store.get('cflag:31:317'), 1, 'CFLAG:317 推进到 1');
});

test('SELECTCOM 16 榨乳器，開始時 二回目以降·それ以外：CFLAG:317 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tequip:31:16', 1);
    f.store.set('cflag:31:317', 1);
  }, 16);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…啊…我的胸部…那么…嗯…呀啊！」',
    '银黑桃因为被榨乳器强行榨乳的感觉而发出了悲鸣………',
  ]);
  assert.equal(fixture.store.get('cflag:31:317'), 2, 'CFLAG:317 推进到 2');
});

test('SELECTCOM 16 榨乳器，開始時 二回目以降·爱慕+弄乳狂：源作误写为 CFLAG:316，1:1 保留原作寻址', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tequip:31:16', 1);
    f.store.set('talent:31:85', 1);
    f.store.set('talent:31:78', 1);
    f.store.set('cflag:31:317', 1); // 越过初回门槛
  }, 16);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「我的胸部…明明不好好的给小宝宝是不行的♡ 这样的被榨取的话♡」',
    '「啊啊…好舒服…舒服的快要发狂了…更多的榨取吧♡」',
    '银黑桃因为被榨乳器强行榨乳的快感而发出了娇喘………',
  ]);
  assert.equal(
    fixture.store.get('cflag:31:317'),
    5,
    'CFLAG:317（真正的榨乳器计数）推进到 5',
  );
});

test('SELECTCOM 16 榨乳器，脱着時（TEQUIP:16=0）·それ以外：CFLAG:377 推进到 1', async () => {
  const fixture = await setup_k8(undefined, 16);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), ['「嗯…啊…继续…做啊…」']);
  assert.equal(fixture.store.get('cflag:31:377'), 1, 'CFLAG:377 推进到 1');
});

test('SELECTCOM 19 肛珠，開始時 初めて（TEQUIP:19=1，CFLAG:320==0）：それ以外 + 推进到 1', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tequip:31:19', 1);
  }, 19);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯…啊啊…全部都进来了…啊，喂…难道…拔出的时候…会全部…一口气抽出…啊啊！」',
    '直觉不错的银黑桃开始未来感到恐惧………',
  ]);
  assert.equal(fixture.store.get('cflag:31:320'), 1, 'CFLAG:320 推进到 1');
});

test('SELECTCOM 19 肛珠，開始時 二回目以降·それ以外：CFLAG:320 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tequip:31:19', 1);
    f.store.set('cflag:31:320', 1);
  }, 19);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊…不要…不要这样…不要弄坏我的屁股…啊啊啊！」',
    '银黑桃想起以前肛珠被拔出的感觉让她不自觉夹紧了肛门，但你仍然认真的把肛珠一个个的塞了进去',
  ]);
  assert.equal(fixture.store.get('cflag:31:320'), 2, 'CFLAG:320 推进到 2');
});

test('SELECTCOM 19 肛珠，脱着時（TEQUIP:19=0）·それ以外：CFLAG:379 推进到 1', async () => {
  const fixture = await setup_k8(undefined, 19);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊…啊啊…啊…咕…我…我的屁股…要坏掉了………」',
    '银黑桃因为被一口气拔出肛珠的痛苦，眼睛里含着泪',
  ]);
  assert.equal(fixture.store.get('cflag:31:379'), 1, 'CFLAG:379 推进到 1');
});

test('SELECTCOM 20 正常位，初めて·处女+魔族+淫乱：CFLAG:321 推进到 1', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:0', 1);
    f.store.set('talent:31:314', 9);
    f.store.set('talent:31:76', 1);
  }, 20);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '你分开银黑桃的双腿押着膝盖，插入的时候像为了展现给她看一样，每次都是缓缓的沉入。',
    '「啊啊啊啊…我的魔族小穴…被你的…被魔王大人的阴茎插进来了…啊啊…再深一点♡ 让我变成你的东西吧♡」',
    '银黑桃流着口水，为了迎合你而腰上下动着腰。',
    '然后你如银黑桃所愿，贯穿了处女膜，一口气插入到最深处。',
    '「嗯…啊…啊嗯！插到…插到最深处了…你的阴茎…啊啊啊…啊…啊啊——♡」',
    '银黑桃因为破瓜的疼痛和还不知道男性的小穴被贯穿的刺激而发出了悲鸣',
    '你紧紧地把阴茎插入深处并把魔力释放了出去',
    '已经是魔族的银黑桃的身体内部染上了你的魔力的色彩。',
    '「还想更多的感受…你的阴茎…继续…继续动啊…啊啊啊♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:321'), 1, 'CFLAG:321 推进到 1');
});

test('SELECTCOM 20 正常位，初めて·处女+人間+それ以外', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:0', 1);
  }, 20);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '你为了强行分开银黑桃的双腿而押着她的膝盖，插入的时候像是要展示她看一样，慢慢的挤了进去',
    '「啊…啊…咕…呜啊…呼，好粗…插进来了…啊…啊啊…啊啊——！」',
    '听着银黑桃发出的哭喊声你把她的处女膜慢慢地捅破。插在深处的阴茎慢慢的释放出了魔力。',
    '然后银黑桃的眼睛里不停流出大颗的泪珠',
    '「让我受到…这样的…屈辱…啊啊…不要…不要动啊…嗯…啊…好、好疼…啊…咕…啊啊——」',
    '你像是为了给银黑桃刻上痛苦一样，慢慢的开始了抽送阴茎',
  ]);
});

test('SELECTCOM 20 正常位，初めて·非处女+淫乱', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:76', 1);
  }, 20);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '你分开银黑桃的双腿押着膝盖，插入的时候像为了展现给她看一样，每次都是缓缓的沉入。',
    '「啊嗯……我的小穴被你的阴茎插进来了♡ 啊啊啊啊…啊——♡」',
    '因为被你的阴茎插入盗深处而她露出笑容的银黑桃已经完全是色情狂了。',
    '「哈啊…更多…更多地侵犯我吧…啊啊啊♡」',
  ]);
});

test('SELECTCOM 20 正常位，二回目以降·淫乱+V感覚Lv3以上：CFLAG:321 推进到 6', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:321', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:2', 3);
  }, 20);
  await speak_k8(fixture, () => 0);
  assert.deepEqual(fixture.text_lines(), [
    '你分开银黑桃的双腿押着膝盖，插入的时候像为了展现给她看一样，每次都是缓缓的沉入。',
    '「啊嗯……我的小穴被你的阴茎插进来了♡ 啊啊啊啊…啊——♡」',
    '因为被你的阴茎插入盗深处而她露出笑容的银黑桃已经完全是色情狂了。',
    '「哈啊…更多…更多地侵犯我吧…啊啊啊♡」',
    '「啊…啊嗯♡更多，更多的塞满我的女阴吧…嗯…啊♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:321'), 6, 'CFLAG:321 推进到 6');
});

test('SELECTCOM 20 正常位，二回目以降·爱慕それ以外分支：CFLAG:321 推进到 5', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:321', 1);
    f.store.set('talent:31:85', 1);
  }, 20);
  await speak_k8(fixture, () => 1);
  assert.deepEqual(fixture.text_lines(), [
    '「啊…啊啊嗯…嗯…嗯…好深…你的插到深处了…啊啊…嗯啊啊嗯♡」',
    '银黑桃因为被你蹂躏着深处的深处而露出了快要融化一样的表情。',
    '「再…激烈一点…把我哪里搅动得黏糊糊的吧…啊啊…♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:321'), 5, 'CFLAG:321 推进到 5');
});

test('SELECTCOM 20 正常位，二回目以降·屈服刻印Lv3：CFLAG:321 推进到 3', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:321', 1);
    f.store.set('mark:31:2', 3);
  }, 20);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '你命令银黑桃分开双腿，插入的时候像为了展现给她看一样，每次都是缓缓的沉入。',
    '「啊啊…要侵犯的话就再稍微…温柔点啊…嗯…嗯…啊啊…嗯啊…啊啊啊——！」',
    '银黑桃因为你的上面不停的动着而发出了悲鸣',
    '「啊…啊啊…嗯…以、已经…啊啊…啊…啊啊啊——」',
  ]);
  assert.equal(fixture.store.get('cflag:31:321'), 3, 'CFLAG:321 推进到 3');
});

test('SELECTCOM 20 正常位，二回目以降·屈服刻印Lv3+V感覚Lv3以上：CFLAG:321 推进到 4', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:321', 1);
    f.store.set('mark:31:2', 3);
    f.store.set('abl:31:2', 3);
  }, 20);
  await speak_k8(fixture, () => 0);
  assert.deepEqual(fixture.text_lines(), [
    '你命令银黑桃分开双腿，插入的时候像为了展现给她看一样，每次都是缓缓的沉入。',
    '「啊啊…插进来了…你的…啊啊…啊…嗯…啊嗯…啊啊啊啊」',
    '「不、不是的…我才不…啊…啊啊啊…不可能有感觉…啊…呀啊啊啊啊！」',
    '银黑桃被你刺入深处而发出的可爱呻吟，被你高兴的听在耳里。',
  ]);
  assert.equal(fixture.store.get('cflag:31:321'), 4, 'CFLAG:321 推进到 4');
});

test('SELECTCOM 20 正常位，二回目以降·それ以外：CFLAG:321 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:321', 1);
  }, 20);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '你为了强行分开银黑桃的双腿而押着她的膝盖，插入的时候像是要展示她看一样，慢慢的挤了进去。',
    '「啊…啊啊…我…被侵犯了…啊啊…啊…嗯…啊，啊啊啊！」',
    '银黑桃因为你抽送而发出呻吟',
    '「啊…哈…咕…嗯…啊啊…嗯…嗯…啊啊——！！」',
  ]);
  assert.equal(fixture.store.get('cflag:31:321'), 2, 'CFLAG:321 推进到 2');
});

test('SELECTCOM 21 背后位，初めて·处女+人間+爱慕：CFLAG:322 推进到 1', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:0', 1);
    f.store.set('talent:31:85', 1);
  }, 21);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '你抓住银黑桃的腰慢慢的插进了她的小穴。银黑桃敏感的屁股颤抖了起来。',
    '「啊嗯…啊啊…没关系…把我的…我的第一次…拿走…啊啊…快、快点…♡」',
    '你的阴茎慢慢插入了银黑桃。扑哧一声银黑桃的处女膜破了。',
    '「嗯…啊咕…嗯你的…全部在我里面…啊嗯…啊啊…已经习惯疼痛了，所以…动起来吧…把我变成你的东西吧！」',
    '银黑桃忍耐不住的恳求的声音扭动着腰，虽然你努力的压着，但是还是没压住。',
    '「求你了…侵犯我吧…啊啊…我等这一天已经很久了…啊啊——♡」',
    '你默默地笑着并慢慢的用阴茎开始抽送………',
    '「嗯…啊嗯…你的快动起来…啊…啊啊…刺进来…啊嗯…啊啊…嗯…嗯…啊啊——♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:322'), 1, 'CFLAG:322 推进到 1');
});

test('SELECTCOM 21 背后位，初めて·非处女それ以外', async () => {
  const fixture = await setup_k8(undefined, 21);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「哼…男的都喜欢从后面侵犯女人呢…嗯…咕…啊啊…不、不要…嗯…啊啊」',
    '「这么激烈…嗯…啊啊…不…不行啊…啊啊…咕痛啊…嗯…啊啊——」',
    '你压住银黑桃的后颈，腰更加激烈的动了起来……',
  ]);
});

test('SELECTCOM 21 背后位，二回目以降·淫乱：CFLAG:322 推进到 6', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:322', 1);
    f.store.set('talent:31:76', 1);
  }, 21);
  await speak_k8(fixture, () => 0);
  assert.deepEqual(fixture.text_lines(), [
    '「继续…继续从后面侵犯我吧…嗯啊…啊嗯…阴茎好棒…你的阴茎好棒♡」',
    '银黑桃为了让你更加容易侵犯一样，高高抬起了腰。',
    '「嗯…啊啊…这、这样…这样好舒服…更多的侵犯我吧♡」',
    '「把我的小穴弄得更加乱七八糟的♡ 变成你中意的小穴吧♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:322'), 6, 'CFLAG:322 推进到 6');
});

test('SELECTCOM 21 背后位，二回目以降·屈服刻印Lv3：CFLAG:322 推进到 3', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:322', 1);
    f.store.set('mark:31:2', 3);
  }, 21);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…啊…嗯…嗯咕…咕…嗯！」',
    '银黑桃被你从后面抓着腰侵犯着。大概是作为最低限度的抵抗而尽量不发出着声音',
    '「我不能…就这样…输掉…嗯…嗯…咕…嗯…嗯——！」',
  ]);
  assert.equal(fixture.store.get('cflag:31:322'), 3, 'CFLAG:322 推进到 3');
});

test('SELECTCOM 21 背后位，二回目以降·それ以外：CFLAG:322 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:322', 1);
  }, 21);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '银黑桃被你按着后颈，就这样不停的侵犯着',
    '「嗯咕…嗯…啊啊…咕…嗯…住、助手…啊…啊咕…嗯」',
    '你听着银黑桃痛苦的声音，就那样很舒服的继续动着腰……',
  ]);
  assert.equal(fixture.store.get('cflag:31:322'), 2, 'CFLAG:322 推进到 2');
});

test('SELECTCOM 21 背后位，二回目以降·淫乱 RAND1+V感覚Lv3以上：源作误写双引号 1:1 保真', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:322', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:2', 3);
  }, 21);
  const seq = [1, 0];
  let i = 0;
  await speak_k8(fixture, () => seq[i++]);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…嗯…继续…继续…侵犯我吧♡」',
    '银黑桃被你从后面抓住双臂，就那样侵犯着。',
    '「用你的阴茎让我更加疯狂吧…啊啊…啊啊——♡」',
    '每次被你的腰撞到，银黑桃的蜜裂都会有爱液飞散出来。',
    '「啊啊…你的阴茎是最棒的♡不要再拔出来，一直侵犯我吧♡」',
    '「啊嗯…啊啊…嗯…嗯…那里…继续插进更深的地方…让我发疯吧♡」」',
  ]);
});

test('SELECTCOM 22 对面座位，初めて·处女：源作空白引号占位 1:1 保真', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:0', 1);
  }, 22);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), ['「」']);
  assert.equal(fixture.store.get('cflag:31:323'), 1, 'CFLAG:323 推进到 1');
});

test('SELECTCOM 22 对面座位，初めて·非处女淫乱', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:76', 1);
  }, 22);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊嗯…现在我一人独占你的阴茎了…嗯啊…嗯…啊啊…好深♡」',
    '银黑桃双手双脚抱住你，自己动起了腰。',
    '「嗯…啊啊…阴茎好舒服…好舒服♡ 啊啊…腰停不下来了…啊啊啊啊——」',
    '银黑桃下流的摆动着腰在你的上面跳着舞………',
  ]);
});

test('SELECTCOM 22 对面座位，二回目以降·淫乱：CFLAG:323 推进到 6', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:323', 1);
    f.store.set('talent:31:76', 1);
  }, 22);
  await speak_k8(fixture, () => 0);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊嗯…现在我一人独占你的阴茎了…嗯啊…嗯…啊啊…好深♡」',
    '银黑桃双手双脚抱住你，自己动起了腰',
    '「嗯啊…嗯…好深…你的阴茎…把我的小穴弄得乱七八糟的…啊啊♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:323'), 6, 'CFLAG:323 推进到 6');
});

test('SELECTCOM 22 对面座位，二回目以降·屈服刻印Lv3+V感覚Lv3以上：CFLAG:323 推进到 4', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:323', 1);
    f.store.set('mark:31:2', 3);
    f.store.set('abl:31:2', 3);
  }, 22);
  await speak_k8(fixture, () => 0);
  assert.deepEqual(fixture.text_lines(), [
    '银黑桃被你抱住腰就那样往上顶着，而无法忍受的银黑桃只能抱着你。',
    '「啊…啊…嗯…嗯啊…啊啊…啊啊——！不、不要…在继续虐待我了…啊嗯…恩…啊啊」',
    '你每次插一下，银黑桃已经充分开发的蜜裂都会产生出让她的脑髓都快要融化了一样的快感。',
    '「不不行啊…啊…嗯…啊啊…嗯…嗯啊——」',
  ]);
  assert.equal(fixture.store.get('cflag:31:323'), 4, 'CFLAG:323 推进到 4');
});

test('SELECTCOM 22 对面座位，二回目以降·それ以外：CFLAG:323 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:323', 1);
  }, 22);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「给我走开…啊啊不要碰我…啊啊…啊！」',
    '银黑桃虽然抵抗着，但是随着你从下往上的突刺的她已经只能紧紧抓住你来忍耐的。',
    '「咕…嗯…不要…在插进来了…啊…啊咕…嗯嗯嗯嗯——」',
  ]);
  assert.equal(fixture.store.get('cflag:31:323'), 2, 'CFLAG:323 推进到 2');
});

test('骨架期：SELECTCOM 23（未实现分支）落 KOJO_MESSAGE_COM_8 占位行', async () => {
  const fixture = await setup_k8(undefined, 23);
  await speak_k8(fixture, seq_rand());
  assert.ok(
    fixture.text_lines().some((line) => line.includes('@KOJO_MESSAGE_COM_8')),
    '占位行含 @KOJO_MESSAGE_COM_8',
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
