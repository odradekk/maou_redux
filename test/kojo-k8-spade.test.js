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

test('头部守卫：兽奸（TEQUIP:89）岔去 DOG_KOJO_8 真身（源作对白全为空参数，仅状态机推进，1:1 保真）', async () => {
  const fixture = await setup_k8();
  fixture.store.set('tequip:31:89', 1);
  await speak_k8(fixture);
  assert.deepEqual(
    fixture.text_lines(),
    [''],
    'DOG_KOJO_8 それ以外档打印一行空文本（源作空参数 PRINTFORMW，未落到主 COM_8 的真实对白）',
  );
  assert.equal(
    fixture.store.get('cflag:31:301'),
    1,
    'CFLAG:301 推进到 1（DOG_KOJO_8 初めて档）',
  );
});

test('头部守卫：死斗场（TEQUIP:55）岔去 COLOSSEUM_KOJO_8 真身（放置PLAY·气力０以下）', async () => {
  const fixture = await setup_k8((f, ef) => {
    ef.selectcom = 55;
  });
  fixture.store.set('tequip:31:55', 1);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), ['银黑桃连站起来的力气都没有了……']);
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

test('SELECTCOM 23 背面座位，初めて·非处女爱慕', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:85', 1);
  }, 23);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯啊…继续从后面抱着我吧…嗯…啊啊啊嗯♡」',
    '银黑桃把身体靠向你，就这样一边动着腰一边呻吟着。',
    '「嗯…啊嗯…啊啊…嗯…我…已经…啊…啊啊——♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:324'), 1, 'CFLAG:324 推进到 1');
});

test('SELECTCOM 23 背面座位，二回目以降·淫乱+TEQUIP:57 镜子加成：CFLAG:324 推进到 6', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:324', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('tequip:31:57', 1);
    f.store.set('abl:31:17', 1);
  }, 23);
  await speak_k8(fixture, () => 0);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…只是在你面前分开两腿…就有感觉了♡」',
    '银黑桃大大的分开双腿、接受着你的阴茎直到蜜裂的深处，就那样前后动着腰。',
    '「啊嗯…啊啊嗯♡ 啊嗯…阴茎好舒服…好舒服啊♡」',
    '你从后面抓住银黑桃的乳房',
    '「啊嗯…继续触碰我的身体吧…啊嗯…啊嗯…我的身体全部都是你的东西…啊啊♡」',
    '「啊啊…阴茎全部插进…我的小穴·里来了…全部…啊啊——♡',
    '银黑桃因为大镜子映出的自己的姿态而兴奋着……',
  ]);
  assert.equal(fixture.store.get('cflag:31:324'), 6, 'CFLAG:324 推进到 6');
});

test('SELECTCOM 23 背面座位，二回目以降·屈服刻印Lv3：CFLAG:324 推进到 3', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:324', 1);
    f.store.set('mark:31:2', 3);
  }, 23);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯…嗯…啊…嗯啾…啊…嗯…啊啊…插到我的深处了…啊…咕…嗯嗯」',
    '银黑桃的蜜裂被你的阴茎一直插到深处。面对因为自身重量而插进来的阴茎，银黑桃连逃走都做不到。',
    '「啊啊…我…已经…变得奇怪了……啊啊…嗯…啊啊——」',
    '银黑桃只能被你从背后随他的想法被玩弄……',
  ]);
  assert.equal(fixture.store.get('cflag:31:324'), 3, 'CFLAG:324 推进到 3');
});

test('SELECTCOM 23 背面座位，二回目以降·それ以外：CFLAG:324 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:324', 1);
  }, 23);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯啊…嗯呼…呜！咕…啊啊！咕…呜…呜！」',
    '银黑桃被你从后面一边爱抚着乳房和阴蒂一边动着腰。因为那个刺激，她已经奄奄一息了',
    '「快、快…住手…啊…啊咕…呜…嗯嗯嗯——！」',
  ]);
  assert.equal(fixture.store.get('cflag:31:324'), 2, 'CFLAG:324 推进到 2');
});

test('SELECTCOM 26 正常位肛交，初めて·淫乱·A感觉Lv3未満：CFLAG:327 推进到 1', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:76', 1);
  }, 26);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯…咕…我的肛门…被你填满了♡ 啊啊——」',
    '你贯穿了银黑桃的未开发的肛门',
    '「嗯…嗯…你还真是毫不留情啊…啊…啊…啊啊——」',
  ]);
  assert.equal(fixture.store.get('cflag:31:327'), 1, 'CFLAG:327 推进到 1');
});

test('SELECTCOM 26 正常位肛交，初めて·それ以外·A感觉Lv3以上', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('abl:31:3', 3);
  }, 26);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊！明明都说了好几次不是该插进这里…嗯…啊啊…咕…啊啊啊啊」',
    '你按住银黑桃侵犯着肛门。',
    '无论多么不愿意，银黑桃被开发过的肛门都为了接受阴茎而张开着',
  ]);
});

test('SELECTCOM 26 正常位肛交，二回目以降·淫乱+A感觉Lv3以上：CFLAG:327 推进到 7', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:327', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
  }, 26);
  await speak_k8(fixture, () => 0);
  assert.deepEqual(fixture.text_lines(), [
    '「我的肛门♡ 和你的阴茎相性很好的样子…啊啊♡」',
    '银黑桃久经开发的肛门轻易地的吞下了你的阴茎',
    '银黑桃的肛门啾的包住了你的阴茎。',
    '「啊啊啊…我的肛门！继续！继续侵犯啊！啊啊…啊啊啊啊啊～♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:327'), 7, 'CFLAG:327 推进到 7');
});

test('SELECTCOM 26 正常位肛交，二回目以降·淫乱（A感觉Lv3未満）：CFLAG:327 推进到 6', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:327', 1);
    f.store.set('talent:31:76', 1);
  }, 26);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯啊…你的话想要怎么侵犯我都可以啊…啊啊嗯…啊啊…嗯啊…嗯！」',
    '你贯穿了银黑桃正在开发途中的肛门、银黑桃因为痛苦而不禁皱起了眉',
    '「请、请在温柔一点…啊…啊啊——！」',
  ]);
  assert.equal(fixture.store.get('cflag:31:327'), 6, 'CFLAG:327 推进到 6');
});

test('SELECTCOM 26 正常位肛交，二回目以降·A感觉Lv3以上（无好感）：CFLAG:327 推进到 3', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:327', 1);
    f.store.set('abl:31:3', 3);
  }, 26);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「还要…继续侵犯…我的肛门…啊…啊啊！不、不要…明明不想要…咕——」',
    '你按住银黑桃侵犯着肛门',
    '无论多么不愿意，银黑桃被开发过的肛门都为了接受阴茎而张开着',
    '「嗯啊…啊嗯…嗯…咕…我明明不能就这样…就有…感觉…啊啊啊啊啊」',
  ]);
  assert.equal(fixture.store.get('cflag:31:327'), 3, 'CFLAG:327 推进到 3');
});

test('SELECTCOM 26 正常位肛交，二回目以降·それ以外：CFLAG:327 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:327', 1);
  }, 26);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「恩爱…啊啊…好疼…好疼啊…快、快点…停下…啊…啊啊啊」',
    '银黑桃的还未开发的肛门被你阴茎了进去，充分的侵犯着……',
    '压住扭动身体想要挣脱的银黑桃的肩膀，你享受着在肛门里抽送的快乐……',
  ]);
  assert.equal(fixture.store.get('cflag:31:327'), 2, 'CFLAG:327 推进到 2');
});

test('SELECTCOM 27 背后位アナル，初めて·爱慕·A感觉Lv3以上：CFLAG:328 推进到 1', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:85', 1);
    f.store.set('abl:31:3', 3);
  }, 27);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊！…继续…侵犯…我的肛门…啊…嗯啊啊♡」',
    '银黑桃被开发了的肛门把你的阴茎轻易吞了进去。',
    '从后面被侵犯的银黑桃的肛门被扩张的地方轻易的看见。',
    '「被这么侵犯的话…我已经…逃不掉了…啊啊啊♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:328'), 1, 'CFLAG:328 推进到 1');
});

test('SELECTCOM 27 背后位アナル，二回目以降·淫乱（A感觉Lv3未満）：CFLAG:328 推进到 6', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:328', 1);
    f.store.set('talent:31:76', 1);
  }, 27);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯…更激烈的…侵犯，调教…我的肛门吧♡」',
    '你抓住银黑桃的屁股，贯穿了她未开发的肛门。',
    '「啊啊…来吧…更用力…更激烈的…嗯…啊啊♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:328'), 6, 'CFLAG:328 推进到 6');
});

test('SELECTCOM 27 背后位アナル，二回目以降·爱慕（A感觉Lv3未満）：CFLAG:328 推进到 4', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:328', 1);
    f.store.set('talent:31:85', 1);
  }, 27);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊…你的…进来了…嗯…全部都…进来了」',
    '你抓住银黑桃的屁股，贯穿了她未开发的肛门。',
    '银黑桃的脸因痛苦而歪曲着，发出了忍耐的声音。',
    '「没关系…啊…嗯嗯…啊…呜…啊！」',
  ]);
  assert.equal(fixture.store.get('cflag:31:328'), 4, 'CFLAG:328 推进到 4');
});

test('SELECTCOM 27 背后位アナル，二回目以降·それ以外：CFLAG:328 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:328', 1);
  }, 27);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊…啊啊！以、已经不行了…嗯…咕…啊啊啊！」',
    '你抓住银黑桃的屁股，一口气把阴茎插进了未被开发的肛门。',
    '「再继续侮辱我的话…啊…啊啊…啊…咦呀——！」',
    '银黑桃发出着悲鸣………',
  ]);
  assert.equal(fixture.store.get('cflag:31:328'), 2, 'CFLAG:328 推进到 2');
});

test('SELECTCOM 28 对面座位アナル，初めて·淫乱（A感觉Lv3未満）：CFLAG:329 推进到 1', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:76', 1);
  }, 28);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「呜…啊啊…啊…啊…全部都进到我的肛门里来了…～！」',
    '你掰开银黑桃的屁股，插进了她未开发的肛门。',
    '银黑桃有些痛苦的抱着你。',
    '「啊啊…被你的阴茎继续插的话…很快就会变舒服的…啊啊…别想太多侵犯我吧…♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:329'), 1, 'CFLAG:329 推进到 1');
});

test('SELECTCOM 28 对面座位アナル，二回目以降·淫乱+A感觉Lv3以上 RAND1：CFLAG:329 推进到 7', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:329', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
  }, 28);
  await speak_k8(fixture, () => 1);
  assert.deepEqual(fixture.text_lines(), [
    '银黑桃利用自己的体重，把你的阴茎直到根部位置一口气都插进了自己的肛门里。',
    '「呜…啊啊…啊…啊啊啊啊♡ 全都…全都是我的♡」',
    '银黑桃细细品味着你的阴茎，前后摇动着腰。',
    '「你的阴茎…嗯…啊啊…是我的东西…嗯…嗯嗯…啊啊…嗯…啊啊♡」',
    '「绝对不会放开的…啊嗯…啊啊…啾…嗯啾…啾…♡」',
    '银黑桃紧紧抱住你接着吻，肛门又变得更紧了………',
  ]);
  assert.equal(fixture.store.get('cflag:31:329'), 7, 'CFLAG:329 推进到 7');
});

test('SELECTCOM 28 对面座位アナル，二回目以降·A感觉Lv3以上（无好感）：CFLAG:329 推进到 3', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:329', 1);
    f.store.set('abl:31:3', 3);
  }, 28);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊！不、不要…不要抱着我啊…呜…咕…啊…啊啊！」',
    '你抱着银黑桃，集中侵犯着她的肛门。',
    '银黑桃被开发过的肛门和银黑桃的意志相反，轻易地接受了你的阴茎。',
    '「啊啊啊！全部…全部都进来…不要…不要啊…啊啊啊啊！」',
    '银黑桃因为肛门和背部升起快感而感到战栗、反射性的抱住了你………',
  ]);
  assert.equal(fixture.store.get('cflag:31:329'), 3, 'CFLAG:329 推进到 3');
});

test('SELECTCOM 28 对面座位アナル，二回目以降·それ以外：源作误写缺失结尾引号 1:1 保真，CFLAG:329 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:329', 1);
  }, 28);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊、走开…我可没兴趣和你抱在一起…呜…啊啊！」',
    '你抱着银黑桃集中蹂躏着肛门，一次又一次的向上突刺着。',
    '「停、停下…求你了…啊…啊啊…呀啊啊啊！',
    '未开发的肛门紧紧地包裹着你的阴茎。',
    '而为了忍耐那份疼痛，银黑桃只能抱着你………',
  ]);
  assert.equal(fixture.store.get('cflag:31:329'), 2, 'CFLAG:329 推进到 2');
});

test('SELECTCOM 29 背面座位肛交，初めて·爱慕·A感觉Lv3以上：羞耻PLAY 档1（TEQUIP:57+ABL:17+TALENT:85），CFLAG:330 推进到 1', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:85', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('tequip:31:57', 1);
    f.store.set('abl:31:17', 1);
  }, 29);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '肛门被开发了的银黑桃坐在了你上面身上、粗重的喘息着。',
    '「啊…啊啊…嗯、啊啊啊啊啊………嗯啊…腰自己动起来了…啊啊…继续抱我…！」',
    '银黑桃的肛门很舒服似的把你的阴茎连根部都吞了下去………',
    '「啊啊…我的肛门能把你的全部放进来…我是多么幸福的人啊………♡」',
    '银黑桃看着镜子中映出的自己的痴态，更加兴奋了………',
  ]);
  assert.equal(fixture.store.get('cflag:31:330'), 1, 'CFLAG:330 推进到 1');
});

test('SELECTCOM 29 背面座位肛交，二回目以降·それ以外（无 TEQUIP:57，无羞耻PLAY）：CFLAG:330 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:330', 1);
  }, 29);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯啊…嗯啊…咕…呜…嗯…啊啊啊！停、停下…啊…啊啊！」',
    '你从后面抱着银黑桃从下往上插着肛门。',
    '银黑桃发出了好像很痛苦的声音。',
    '「啊咕…呜…呜…不、不要…这…样…啊嗯！',
    '你一边愉快的听着银黑桃的呻吟、一边开始爱抚乳房和蜜裂………',
  ]);
  assert.equal(fixture.store.get('cflag:31:330'), 2, 'CFLAG:330 推进到 2');
});

test('SELECTCOM 29 背面座位肛交，二回目以降·爱慕 + 羞耻PLAY 档1：源作误写缺失结尾引号 1:1 保真', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:330', 1);
    f.store.set('tequip:31:57', 1);
    f.store.set('abl:31:17', 1);
    f.store.set('talent:31:85', 1);
  }, 29);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…还要继续被你侵犯…嗯啊啊…啊啊啊嗯！」',
    '银黑桃把身体交给你、未开发的肛门被从下不停的突刺着。',
    '「我没关系的…在肛门中满满的出来吧…嗯…啊啊♡」',
    '「啊啊…我的肛门能把你的全部放进来…我是多么幸福的人啊………♡',
    '银黑桃看着镜子中映出的自己的痴态，更加兴奋了………',
  ]);
  assert.equal(fixture.store.get('cflag:31:330'), 4, 'CFLAG:330 推进到 4');
});

test('SELECTCOM 29 背面座位肛交，二回目以降·爱+A感觉Lv3以上 RAND1（嵌套 RAND 未命中）：CFLAG:330 推进到 5', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:330', 1);
    f.store.set('talent:31:85', 1);
    f.store.set('abl:31:3', 3);
  }, 29);
  await speak_k8(fixture, () => 1);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯啊…啊…啊啊…屁股…自己动起来了…我的肛门已经…是你的东西了♡ 啊啊♡」',
    '银黑桃被开发了的肛门、黏糊糊的肠壁向你阴茎缠绕了上去。',
    '「啊啊啊…啊…啊…啊嗯啊…从肛门哪里来来回回的敲打着子宫…啊啊啊♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:330'), 5, 'CFLAG:330 推进到 5');
});

test('SELECTCOM 30 手淫，初めて·侍奉精神Lv3以上（无 TALENT）：CFLAG:331 推进到 1', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('abl:31:16', 3);
  }, 30);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「我不做这种事不行么…真没办法…呵呵呵」',
    '银黑桃一边舔着嘴唇。一边侍奉着你的阴茎………',
  ]);
  assert.equal(fixture.store.get('cflag:31:331'), 1, 'CFLAG:331 推进到 1');
});

test('SELECTCOM 30 手淫，二回目以降·淫乱+侍奉精神Lv3以上 RAND0：CFLAG:331 推进到 7', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:331', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:16', 3);
  }, 30);
  await speak_k8(fixture, () => 0);
  assert.deepEqual(fixture.text_lines(), [
    '「看，你的阴茎勃起的更厉害了、因为我把你弄得更舒服了吧♡」',
    '银黑桃的左手紧紧握着你阴茎的根部，右手撸动着。',
    '「啊啊♡啊啊♡ …这么红，好棒…♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:331'), 7, 'CFLAG:331 推进到 7');
});

test('SELECTCOM 30 手淫，二回目以降·爱+侍奉精神Lv5 RAND1：CFLAG:331 推进到 5', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:331', 1);
    f.store.set('talent:31:85', 1);
    f.store.set('abl:31:16', 5);
  }, 30);
  await speak_k8(fixture, () => 1);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…现在好像马上就要咻咻的射精出来哦…你的阴茎♡」',
    '银黑桃用湿润的眼睛凝视着你的阴茎。',
    '「就这样…用我的手变得非常非常舒服…射出非常非常多的精液来吧…♪」',
  ]);
  assert.equal(fixture.store.get('cflag:31:331'), 5, 'CFLAG:331 推进到 5');
});

test('SELECTCOM 30 手淫，源作误写死区：TALENT:85+侍奉精神Lv3以上、CFLAG:331=4、口上开关关闭时无分支命中，1:1 保真不修补', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:331', 4);
    f.store.set('talent:31:85', 1);
    f.store.set('abl:31:16', 3);
    f.store.set('flag:7', 0);
  }, 30);
  await speak_k8(fixture);
  assert.deepEqual(
    fixture.text_lines(),
    [],
    '源作死区：无分支命中，不打印任何文本',
  );
  assert.equal(fixture.store.get('cflag:31:331'), 4, 'CFLAG:331 保持不变');
});

test('SELECTCOM 31 口交，初めて·爱慕：CFLAG:332 推进到 1', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:85', 1);
  }, 31);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「即使是你的阴茎，这么突然让我舔你觉得可能吗？」',
    '银黑桃这么说着，一边撸着你的阴茎，一边吻向了阴茎的顶部。',
    '「嗯…呵呵呵、首先要先接吻…♡ 然后…嗯咕嗯…再舔舔龟头吧♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:332'), 1, 'CFLAG:332 推进到 1');
});

test('SELECTCOM 31 口交，二回目以降·淫乱 RAND3=0：CFLAG:332 推进到 5', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:332', 1);
    f.store.set('talent:31:76', 1);
  }, 31);
  await speak_k8(fixture, () => 0);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊，你的阴茎…每天都想舔…嗯…咕噜…嗯啾♡」',
    '银黑桃吞下你阴茎直到喉咙的深处。',
    '「嗯啾…啾…啾…嗯嗯…啊啊…阴茎…阴茎…♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:332'), 5, 'CFLAG:332 推进到 5');
});

test('SELECTCOM 31 口交，二回目以降·爱慕 RAND3=2（末臂）：CFLAG:332 推进到 4', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:332', 1);
    f.store.set('talent:31:85', 1);
  }, 31);
  await speak_k8(fixture, () => 2);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…只是含着男人的阴茎而已…就这么幸福什么的…我好想已经变得不对劲了…♡」',
    '银黑桃干起来很高兴的舔着你的阴茎。',
    '「咕…啾…啾嗯…啊啊…明明味道这么重但我就是停不下来♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:332'), 4, 'CFLAG:332 推进到 4');
});

test('SELECTCOM 31 口交，二回目以降·侍奉精神Lv3以上：CFLAG:332 推进到 3', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:332', 1);
    f.store.set('abl:31:16', 3);
  }, 31);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯啊…嗯…啊嗯…咕噜…啾…啊…嗯啊…♪」',
    '银黑桃热心的舔着你的阴茎。',
    '「让我做到这种程度什么的…你这家伙…嗯…啊…咕噜…」',
  ]);
  assert.equal(fixture.store.get('cflag:31:332'), 3, 'CFLAG:332 推进到 3');
});

test('SELECTCOM 31 口交，二回目以降·それ以外：CFLAG:332 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:332', 1);
  }, 31);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯…嗯嗯…咕噜…嗯啊…嗯…让我继续舔？ 啊…嗯啾啾！」',
    '银黑桃带着不甘心的表情继续舔着你的阴茎………',
  ]);
  assert.equal(fixture.store.get('cflag:31:332'), 2, 'CFLAG:332 推进到 2');
});

test('SELECTCOM 32 乳交，初めて·弄乳狂：CFLAG:333 推进到 1', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:78', 1);
  }, 32);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊…用我的好色的胸部让你的阴茎更舒服吧…♪」',
    '银黑桃的眼角垂了下来、为用胸部侍奉而兴奋这。',
    '「胸部变得太舒服…啊啊…要融化了………」',
  ]);
  assert.equal(fixture.store.get('cflag:31:333'), 1, 'CFLAG:333 推进到 1');
});

test('SELECTCOM 32 乳交，二回目以降·弄乳狂+淫乱 RAND0：CFLAG:333 推进到 8', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:333', 1);
    f.store.set('talent:31:78', 1);
    f.store.set('talent:31:76', 1);
  }, 32);
  await speak_k8(fixture, () => 0);
  assert.deepEqual(fixture.text_lines(), [
    '「继续侵犯我的胸部吧…啊啊…用你的阴茎的话我多少次都能高潮…啊啊啊♡」',
    '银黑桃露出放荡的表情用乳房蹭着你的阴茎。随着身体的上下摇动，又大又硬的乳头勃起着。',
    '「嗯…啊嗯…啊啊…嗯♡ 就这样射精…然后就这样让我更舒服吧♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:333'), 8, 'CFLAG:333 推进到 8');
});

test('SELECTCOM 32 乳交，二回目以降·弄乳狂单独 RAND1：CFLAG:333 推进到 4', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:333', 1);
    f.store.set('talent:31:78', 1);
  }, 32);
  await speak_k8(fixture, () => 1);
  assert.deepEqual(fixture.text_lines(), [
    '「明明是这么屈辱的姿势…我的胸部太舒服了…啊啊…要融化了啊………」',
    '银黑桃的两个乳头完全勃起着、你的阴茎品味着快乐好像变得大了………',
  ]);
  assert.equal(fixture.store.get('cflag:31:333'), 4, 'CFLAG:333 推进到 4');
});

test('SELECTCOM 33 股间性交，初めて·それ以外（爱無し）：CFLAG:334 推进到 1', async () => {
  const fixture = await setup_k8(undefined, 33);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…让我做这种事…呜…咕…啊…啊…啊嗯」',
    '「嗯啊…你的那个太精神、好像快从胯下飞出来了似的………」',
  ]);
  assert.equal(fixture.store.get('cflag:31:334'), 1, 'CFLAG:334 推进到 1');
});

test('SELECTCOM 33 股间性交，二回目以降·淫乱+处女：CFLAG:334 推进到 6', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:334', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('talent:31:0', 1);
  }, 33);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…呐…什么时候才会取走我的处女呢？」',
    '银黑桃的秘裂流着、每次摩擦都会发出下流的声音。',
    '「你看…你看…明明我想要你的阴茎想要得不得了…你却不来拿…啊啊♡」',
    '银黑桃激烈的动着腰的两腿之间，你拔走了阴茎。',
    '「如果太难忍的话…啊…啊啊…呵呵呵、就这样直接插进来也可以哦…♡」',
    '「………开、开玩笑而已、我会好好的奉仕啦。只要让咱们两个都更舒服这件事不会忘的…啊啊♪」',
    '银黑桃扑哧一笑，用股间把你的阴茎重新夹好、再次开始了股间性交奉仕………',
  ]);
  assert.equal(fixture.store.get('cflag:31:334'), 6, 'CFLAG:334 推进到 6');
});

test('SELECTCOM 33 股间性交，二回目以降·爱有り（无处女）：CFLAG:334 推进到 3', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:334', 1);
    f.store.set('talent:31:85', 1);
  }, 33);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊、舒服吗？我很舒服哦…啊…嗯…啊啊…啊啊…♡」',
    '银黑桃经过锻炼的细长大腿为了更舒服而努力加紧。',
    '「你的阴茎也这么热…啊啊…我的腿好像快融化了…嗯…啊嗯…啊啊嗯♡」',
    '「我…想要你的…快忍不住了…求你了…快点插进来吧！」',
    '面对银黑桃的祈求，你打了银黑桃的屁股，然后继续股间性交奉仕。',
    '「啊啊…对不起…我会让你更舒服的………」',
  ]);
  assert.equal(fixture.store.get('cflag:31:334'), 3, 'CFLAG:334 推进到 3');
});

test('SELECTCOM 33 股间性交，二回目以降·それ以外（爱無し）：CFLAG:334 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:334', 1);
  }, 33);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「额…啊啊…你的…感觉好热…啊啊…」',
    '银黑桃一边快要哭了一般皱着眉，一边夹紧大腿继续着股间性交。',
    '「这么做的话，我会有感觉的…啊…啊嗯…啊啊！」',
  ]);
  assert.equal(fixture.store.get('cflag:31:334'), 2, 'CFLAG:334 推进到 2');
});

test('SELECTCOM 34 骑乘位，初めて·处女+魔族+爱慕：源作误写缺失结尾引号 1:1 保真，CFLAG:335 推进到 1', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:0', 1);
    f.store.set('talent:31:314', 9);
    f.store.set('talent:31:85', 1);
  }, 34);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…第一次奉献给你…魔王大人…啊啊♡」',
    '银黑桃跨在你上面慢慢沉下了腰。',
    '阴茎把蜜裂挤开、对准膣内插了进去。',
    '「嗯…啊啊啊…嗯…能感觉到…我的处女膜吗？啊…啊啊啊！」',
    '阴茎往深处前进，能感觉到处女膜破了。然后银黑桃终于把完全坐了下来、把你的阴茎连根部也埋了进去。',
    '银黑桃因为破瓜的痛楚和为你奉上处女的喜悦而后仰着张开了双翼。',
    '「啊啊啊啊…嗯啊♡ 啊啊…现在不要动…我会让你舒服起来的…嗯…嗯啊！',
    '你握着银黑桃的腰，用阴茎放出了魔力。',
    '「啊啊…啊啊嗯啊！啊嗯…我的肚子里…你的魔力满满的注入进来了…啊…啊啊啊啊♡」',
    '已经是魔族的银黑桃的身体从内测被你的魔力侵染着。',
    '「你的魔力在子宫里留下了标记…啊啊…我已经无法从你身边离开了…♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:335'), 1, 'CFLAG:335 推进到 1');
});

test('SELECTCOM 34 骑乘位，初めて·非处女それ以外：CFLAG:335 推进到 1', async () => {
  const fixture = await setup_k8(undefined, 34);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯啊…明明知道让我跨在你上面是多么愚蠢…嗯…啊啊啊！嗯、嗯啊！啊！」',
    '虽然看见银黑桃在嘟囔着什么，但你毫不在意的挺着腰，享受着银黑桃的蜜壶。',
    '「啊…嗯…啊啊！嗯…啊嗯…真，真是的…为什么…我这样好像被喜欢着一样…啊啊！」',
    '看着在你的腰上跳舞一样的银黑桃、你把腰挺得更高了………',
  ]);
  assert.equal(fixture.store.get('cflag:31:335'), 1, 'CFLAG:335 推进到 1');
});

test('SELECTCOM 34 骑乘位，二回目以降·淫乱+V感觉Lv3以上 末臂（三层四选一全部未命中）：源作误写"插在小学里" 1:1 保真，CFLAG:335 推进到 8', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:335', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:2', 3);
  }, 34);
  await speak_k8(fixture, () => 1);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…就这样把阴茎插在里面生活明明是最棒的…嗯…啊嗯♡」',
    '银黑桃的腰沉在底部，就这样慢慢左右晃动，充分品味着阴茎的触感。',
    '「所以就这样一直抱着我…啊…如何？不行吗？嗯♡ 不行的话，真可惜…啊啊！」',
    '「那么作为代替，这有现在也好，你要一直插在小学里…啊啊…啊嗯…啊嗯嗯啊♡」',
    '银黑桃想品味着着阴茎一样，继续动着腰………',
  ]);
  assert.equal(fixture.store.get('cflag:31:335'), 8, 'CFLAG:335 推进到 8');
});

test('SELECTCOM 34 骑乘位，二回目以降·屈服刻印Lv3+V感觉Lv3以上 RAND3=0：CFLAG:335 推进到 4', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:335', 1);
    f.store.set('mark:31:2', 3);
    f.store.set('abl:31:2', 3);
  }, 34);
  await speak_k8(fixture, () => 0);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯啊…嗯啊！嗯嗯…要射出来了！…不然的话，我…啊啊！啊嗯！」',
    '银黑桃的腰一扭一扭的上下动着、那已经完全“女人”的动作了。',
    '珍珠一样的汗水在额头反着光、渐渐漏出了喘息的声音。',
    '「啊…嗯啊…啊嗯…啊啊…我的啊嗯…啊啊…啊啊啊…啊——！」',
  ]);
  assert.equal(fixture.store.get('cflag:31:335'), 4, 'CFLAG:335 推进到 4');
});

test('SELECTCOM 34 骑乘位，二回目以降·屈服刻印Lv3（无 V感觉）：CFLAG:335 推进到 3', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:335', 1);
    f.store.set('mark:31:2', 3);
  }, 34);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯…嗯啊…啊嗯…恩…这、这样就可以了吧？」',
    '银黑桃笨拙的动着腰，看样子离有快感还很远。',
    '「嗯啊…来吧，早点射出来吧…嗯…咕啊…啊…啊啊！」',
    '你配合着银黑桃的腰动着、银黑桃发出了模糊不清的悲鸣………',
  ]);
  assert.equal(fixture.store.get('cflag:31:335'), 3, 'CFLAG:335 推进到 3');
});

test('SELECTCOM 35 全身擦洗，初めて·侍奉精神Lv3以上：CFLAG:336 推进到 1', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('abl:31:16', 3);
  }, 35);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「来，伸出手…这样帮你洗就行了吧？」',
    '「啊…啊嗯！不、不要欺负我啊！…啊…嗯嗯！就不能好好地洗澡么？」',
  ]);
  assert.equal(fixture.store.get('cflag:31:336'), 1, 'CFLAG:336 推进到 1');
});

test('SELECTCOM 35 全身擦洗，初めて·それ以外：CFLAG:336 推进到 1', async () => {
  const fixture = await setup_k8(undefined, 35);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…我也是个女孩子啊…把身体洗干净是很舒服…但是不得不洗你的身体什么的…啊啊」',
    '「而我的身体………」',
  ]);
  assert.equal(fixture.store.get('cflag:31:336'), 1, 'CFLAG:336 推进到 1');
});

test('SELECTCOM 35 全身擦洗，二回目以降·淫乱＋侍奉精神Lv5：CFLAG:336 推进到 5', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:336', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:16', 5);
  }, 35);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊嗯啊…啊啊…把手指…插进我里面也可以呦…啊啊♡」',
    '银黑桃一边抱住你互相摩擦着上半身、一边把你的手拉到了自己的股间。',
    '「我的小穴…啊啊！要用你的手指来洗…啊啊…嗯！再粗暴些也没关系♡」',
    '银黑桃的喘息吹到了你的耳边，腰颤抖，痉挛着。',
    '你的手指一根根的插了进去，搅拌着银黑桃的蜜裂。',
    '「啊啊…我的身体…变干净了…嗯…啊嗯…啊啊…嗯…啊啊——♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:336'), 5, 'CFLAG:336 推进到 5');
});

test('SELECTCOM 35 全身擦洗，二回目以降·爱＋侍奉精神Lv5：CFLAG:336 推进到 4', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:336', 1);
    f.store.set('talent:31:85', 1);
    f.store.set('abl:31:16', 5);
  }, 35);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…啊嗯…洗澡好舒服啊、啊啊…呵呵呵、有感觉养的地方吗？」',
    '银黑桃抱着你，用肌肤摩擦着他的后背、勃起的乳头的触感理所当然的能清楚的感觉到。',
    '「这里痒的已经快受不了了吧？」',
    '银黑桃一边坏笑着把手伸向你的股间握住了阴茎，一边继续洗背。',
    '「啊啊…啊嗯…你的阴茎一抖一抖的…啊啊…洗起来好舒服！好舒服啊♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:336'), 4, 'CFLAG:336 推进到 4');
});

test('SELECTCOM 35 全身擦洗，二回目以降·侍奉精神Lv3以上 RAND3=0：追加弟弟台词，CFLAG:336 推进到 3', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:336', 1);
    f.store.set('abl:31:16', 3);
  }, 35);
  await speak_k8(fixture, () => 0);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…嗯…嗯啊…我帮你洗的很舒服吧？嗯啊…啊啊…啊嗯…啊啊…」',
    '银黑桃把你加到了泡沫中的胸部中间、摩擦着。',
    '「继续摸…我的胸部也可以…啊啊…所以老实的把澡洗完…嗯！嗯嗯！」',
    '「总觉得想起了帮弟弟洗澡的时候………」',
  ]);
  assert.equal(fixture.store.get('cflag:31:336'), 3, 'CFLAG:336 推进到 3');
});

test('SELECTCOM 35 全身擦洗，二回目以降·侍奉精神Lv3以上 RAND3=1：SIF 未命中不追加台词，CFLAG:336 仍推进到 3', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:336', 1);
    f.store.set('abl:31:16', 3);
  }, 35);
  await speak_k8(fixture, () => 1);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…嗯…嗯啊…我帮你洗的很舒服吧？嗯啊…啊啊…啊嗯…啊啊…」',
    '银黑桃把你加到了泡沫中的胸部中间、摩擦着。',
    '「继续摸…我的胸部也可以…啊啊…所以老实的把澡洗完…嗯！嗯嗯！」',
  ]);
  assert.equal(fixture.store.get('cflag:31:336'), 3, 'CFLAG:336 推进到 3');
});

test('SELECTCOM 35 全身擦洗，二回目以降·それ以外：CFLAG:336 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:336', 1);
  }, 35);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「老实点、这样我不是没法好好帮你洗了吗…啊嗯…嗯…啊啊！…喂、不要碰那里…啊啊！」',
    '银黑桃开始用身体帮你洗澡。银黑桃勃起的乳头碰到了你的后背………',
  ]);
  assert.equal(fixture.store.get('cflag:31:336'), 2, 'CFLAG:336 推进到 2');
});

test('SELECTCOM 36 骑乘位肛交，初めて·淫乱+A感觉Lv3以上：CFLAG:337 推进到 1', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
  }, 36);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯…嗯啊…啊啊…你的全部进来了…啊啊♡」',
    '银黑桃被开发了的肛门把你阴茎很美味似的吞了下去。',
    '银黑桃左右晃动着腰，发出了喘息声。',
    '「嗯啊啊…那，差不多该认真的动起来了…啊嗯…恩…啊啊♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:337'), 1, 'CFLAG:337 推进到 1');
});

test('SELECTCOM 36 骑乘位肛交，初めて·それ以外+未开发：源作误写缺失结尾引号与多余句读 1:1 保真，CFLAG:337 推进到 1', async () => {
  const fixture = await setup_k8(undefined, 36);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「咕…全都进来了…啊啊…好…好难受…咕！」',
    '银黑桃未开发的肛门，紧紧地包住了你的阴茎。',
    '银黑桃被你压住了腰，根本没法逃跑。',
    '「啊啊…已、已经不行了…啊啊！」',
  ]);
  assert.equal(fixture.store.get('cflag:31:337'), 1, 'CFLAG:337 推进到 1');
});

test('SELECTCOM 36 骑乘位肛交，初めて·それ以外+A感觉Lv3以上：源作误写缺失结尾引号与行尾"……・" 1:1 保真', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('abl:31:3', 3);
  }, 36);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯…嗯嗯！我的肛门啊…啊啊！嗯啊啊啊！」',
    '经由你的手开发过的银黑桃的肛门轻易的接受了阴茎。',
    '「啊啊…嗯啊…嗯…啊啊…啊…啊嗯嗯！',
    '你向上挺着腰侵犯着银黑桃肛门……・',
  ]);
  assert.equal(fixture.store.get('cflag:31:337'), 1, 'CFLAG:337 推进到 1');
});

test('SELECTCOM 36 骑乘位肛交，二回目以降·淫乱+A感觉Lv3以上 末臂（RAND3/RAND2 皆未命中）：源作误写"前后懂的话"1:1 保真，CFLAG:337 推进到 7', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:337', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
  }, 36);
  await speak_k8(fixture, () => 1);
  assert.deepEqual(fixture.text_lines(), [
    '银黑桃的肛门把你的阴茎直到根部都吞了下去、前后左右的摇晃着腰。',
    '配合着淫乱的腰的动作银黑桃漏出了喘息声。',
    '「啊嗯…嗯…嗯嗯…嗯啊嗯嗯♡ 就这样前后懂的话…嗯！子宫的后面被摩擦的感觉…啊嗯♡」',
    '「嗯！这、这样…插过来的话…啊啊啊啊！啊…啊嗯♡」',
    '银黑桃的嘴里流出了唾液，你就这样继续突刺着肛门………',
  ]);
  assert.equal(fixture.store.get('cflag:31:337'), 7, 'CFLAG:337 推进到 7');
});

test('SELECTCOM 36 骑乘位肛交，二回目以降·淫乱（无 A感觉）：CFLAG:337 推进到 6', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:337', 1);
    f.store.set('talent:31:76', 1);
  }, 36);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「你的全部进来了…啊啊…好、好紧…嗯…咕！」',
    '银黑桃那还未开发的肛门接受你阴茎的话，似乎还有些困难。',
    '「嗯啊…只有你舒服也好…啊啊…啊嗯♡」',
    '银黑桃继续在你的上面动着腰………',
  ]);
  assert.equal(fixture.store.get('cflag:31:337'), 6, 'CFLAG:337 推进到 6');
});

test('SELECTCOM 36 骑乘位肛交，二回目以降·爱+A感觉Lv3以上 末臂：CFLAG:337 推进到 5', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:337', 1);
    f.store.set('talent:31:85', 1);
    f.store.set('abl:31:3', 3);
  }, 36);
  await speak_k8(fixture, () => 1);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯…啊嗯…啊啊…因为被你开发的原因，肛门舒服的快要坏掉了…啊啊啊啊♡」',
    '银黑桃用力夹紧着肛门，前后摆动着。',
    '「啊啊…嗯、啊啊！嗯…从后面…啊啊…刺激子宫的感觉好舒服…♡」',
    '银黑桃带着快要融化一样的表情扭动着腰………',
  ]);
  assert.equal(fixture.store.get('cflag:31:337'), 5, 'CFLAG:337 推进到 5');
});

test('SELECTCOM 36 骑乘位肛交，二回目以降·爱慕（无 A感觉）：CFLAG:337 推进到 4', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:337', 1);
    f.store.set('talent:31:85', 1);
  }, 36);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「咕…嗯…啊…啊啊…嗯啊…啊！」',
    '银黑桃那还未开发的肛门接受你阴茎的话，似乎还有些困难。',
    '「嗯啊…我来动…嗯…让你舒服起来…啊…♡」',
    '银黑桃笨拙的动着腰，继续这肛门的奉仕………',
  ]);
  assert.equal(fixture.store.get('cflag:31:337'), 4, 'CFLAG:337 推进到 4');
});

test('SELECTCOM 36 骑乘位肛交，二回目以降·A感觉Lv3以上：CFLAG:337 推进到 3', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:337', 1);
    f.store.set('abl:31:3', 3);
  }, 36);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…腰擅自…动起来了…嗯…嗯啊…嗯…啊啊啊啊！」',
    '经由你的手开发过的银黑桃的肛门轻易的接受了阴茎。',
    '「啊啊…嗯啊…嗯…啊啊…啊…啊嗯嗯！再、再继续的话…啊啊啊啊啊！」',
    '你向上顶着腰，侵犯着银黑桃的肛门………',
  ]);
  assert.equal(fixture.store.get('cflag:31:337'), 3, 'CFLAG:337 推进到 3');
});

test('SELECTCOM 36 骑乘位肛交，二回目以降·それ以外：CFLAG:337 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:337', 1);
  }, 36);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊…好、好紧…咕…嗯咕！」',
    '银黑桃未开发的肛门，紧紧地包住了你的阴茎。',
    '银黑桃被你压住了腰，根本没法逃跑。',
    '「快、快停下…啊啊…咕、啊嗯…啊啊——！」',
  ]);
  assert.equal(fixture.store.get('cflag:31:337'), 2, 'CFLAG:337 推进到 2');
});

test('SELECTCOM 37 肛门侍奉，初めて·侍奉精神Lv3以上：CFLAG:338 推进到 1', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('abl:31:16', 3);
  }, 37);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「你都是让别人帮你把那里舔干净吧…啊啊、我明白…真没办法」',
    '「嗯…嗯嗯…嗯…啾…就…嗯啾…嗯…嗯啊」',
  ]);
  assert.equal(fixture.store.get('cflag:31:338'), 1, 'CFLAG:338 推进到 1');
});

test('SELECTCOM 37 肛门侍奉，初めて·それ以外：CFLAG:338 推进到 1', async () => {
  const fixture = await setup_k8(undefined, 37);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「这么干怎么说都有点………唉、我明白的、不想干也得干对吧？」',
    '「嗯咕…呜…呜…啾…嗯…嗯啊」',
  ]);
  assert.equal(fixture.store.get('cflag:31:338'), 1, 'CFLAG:338 推进到 1');
});

test('SELECTCOM 37 肛门侍奉，二回目以降·淫乱＋侍奉精神Lv5：CFLAG:338 推进到 5', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:338', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:16', 5);
  }, 37);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「如果弄得很舒服的话…有奖励吧？…嗯、啊啊啊………♪」',
    '银黑桃高兴的张开嘴一边下流的留着口水一边开始舔舐你的肛门。',
    '「嗯咕…啾咕…啾…嗯…嗯啾…啾…你的肛门真美味…♡」',
    '银黑桃眼睛中的情欲松弛了下来、完全不在意的舔舐着你的不净的场所。',
    '「你看、我要把舌头放进你的肛门里了…再放松点…嗯…嗯…啾…♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:338'), 5, 'CFLAG:338 推进到 5');
});

test('SELECTCOM 37 肛门侍奉，二回目以降·爱＋侍奉精神Lv5：CFLAG:338 推进到 4', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:338', 1);
    f.store.set('talent:31:85', 1);
    f.store.set('abl:31:16', 5);
  }, 37);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…只是舔着你的肛门而已、就这么幸福什么的、我已经离不开你了…啾」',
    '银黑桃高兴地张开嘴伸出舌头、发出着水声舔舐着你的肛门。',
    '「嗯啾…啾…啾…嗯…嗯啾…啾…嗯…啊啊」',
    '「啊啊…我给你当狗也可以…啾♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:338'), 4, 'CFLAG:338 推进到 4');
});

test('SELECTCOM 37 肛门侍奉，二回目以降·侍奉精神Lv3以上：CFLAG:338 推进到 3', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:338', 1);
    f.store.set('abl:31:16', 3);
  }, 37);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯…舔你的肛门什么的，明明应该很屈辱…嗯…嗯啊…啊啊…啾…♪」',
    '银黑桃一边喘着粗气一边舔着你的肛门。',
    '「嗯啾…啾…嗯…啾…♪」',
  ]);
  assert.equal(fixture.store.get('cflag:31:338'), 3, 'CFLAG:338 推进到 3');
});

test('SELECTCOM 37 肛门侍奉，二回目以降·それ以外：CFLAG:338 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:338', 1);
  }, 37);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯嗯…我的舌头…会烂掉的…嗯…嗯嗯…咕…嗯嗯！」',
    '银黑桃一边眼里含着泪，一边服侍着你的肛门………',
  ]);
  assert.equal(fixture.store.get('cflag:31:338'), 2, 'CFLAG:338 推进到 2');
});

test('SELECTCOM 40 打屁股，初めて：CFLAG:341 推进到 1', async () => {
  const fixture = await setup_k8(undefined, 40);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「呃…学别人拷问我么？你这么干的话，很容易就能忍住吧……嗯！啊嗯！」',
    '「嗯？…打屁股吗！？…啊啊！我明明已经不是小孩子了！」',
  ]);
  assert.equal(fixture.store.get('cflag:31:341'), 1, 'CFLAG:341 推进到 1');
});

test('SELECTCOM 40 打屁股，二回目以降·淫乱＋受虐狂っ気Lv3：源作误写"辩证这样"1:1 保真，CFLAG:341 推进到 5', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:341', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:21', 3);
  }, 40);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「再继续打我的屁股！啊啊啊！呀…呀啊♡」',
    '银黑桃随着被打屁股而发出了娇喘、身体一抖一抖的痉挛了起来。',
    '「被你打屁股…啊啊…好舒服…啊啊…啊啊啊——♡」',
    '「啊嗯…我的身体辩证这样，你要负责任啊…啊嗯…啊啊嗯♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:341'), 5, 'CFLAG:341 推进到 5');
});

test('SELECTCOM 40 打屁股，二回目以降·爱＋受虐狂っ気Lv3：CFLAG:341 推进到 4', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:341', 1);
    f.store.set('talent:31:85', 1);
    f.store.set('abl:31:21', 3);
  }, 40);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…这么中意我的屁股的话…啊嗯…用咬的…就这样吃下去也可以呦…啊嗯♡」',
    '银黑桃因为被打屁股而漏出了娇喘。连疼痛都变成快感而露出了痴迷的表情。',
    '「啊嗯…啊啊…你真是坏心眼、只打我的屁股………啊嗯」',
    '「我想做的事却全都不做…啊…啊啊——！」',
  ]);
  assert.equal(fixture.store.get('cflag:31:341'), 4, 'CFLAG:341 推进到 4');
});

test('SELECTCOM 40 打屁股，二回目以降·苦痛刻印Lv3+屈服刻印Lv3：CFLAG:341 推进到 3', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:341', 1);
    f.store.set('mark:31:0', 3);
    f.store.set('mark:31:2', 3);
  }, 40);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯…不要…啊啊…这个打的方式…啊啊啊…和父亲大人打我的方式好像…嗯…咕！」',
    '银黑桃想起了曾经屈辱的感觉，一边含着眼泪一边继续被打着。',
    '「啊…啊啊…对不起对不起…明明输了还…啊啊…这么屈辱的活着！」',
  ]);
  assert.equal(fixture.store.get('cflag:31:341'), 3, 'CFLAG:341 推进到 3');
});

test('SELECTCOM 40 打屁股，源作误写死区：それ以外分支用 && 而非 ||（CFLAG:341<=1 && FLAG:7==2），正常游玩下永不命中，1:1 保真不修补', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:341', 1);
    f.store.set('flag:7', 0);
  }, 40);
  await speak_k8(fixture);
  assert.deepEqual(
    fixture.text_lines(),
    [],
    '源作死区：正常游玩下无分支命中，不打印任何文本',
  );
  assert.equal(fixture.store.get('cflag:31:341'), 1, 'CFLAG:341 保持不变');
});

test('SELECTCOM 41 鞭，初めて：CFLAG:342 推进到 1', async () => {
  const fixture = await setup_k8(undefined, 41);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊、终于用对待俘虏的方式对待我了。来，照你想的去做吧！」',
    '银黑桃看起来很高兴的接受着你的鞭打………',
  ]);
  assert.equal(fixture.store.get('cflag:31:342'), 1, 'CFLAG:342 推进到 1');
});

test('SELECTCOM 41 鞭，二回目以降·淫乱＋受虐狂っ気Lv5以上：CFLAG:342 推进到 9', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:342', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:21', 5);
  }, 41);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…想要你的鞭子…你的惩罚…做了很多不好的事情哦…啊嗯…啊啊…请继续用鞭子打我！」',
    '银黑桃每次被你打都发出了好像是故意一样的喘息………',
  ]);
  assert.equal(fixture.store.get('cflag:31:342'), 9, 'CFLAG:342 推进到 9');
});

test('SELECTCOM 41 鞭，二回目以降·受虐狂っ気Lv3以上：CFLAG:342 推进到 3', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:342', 1);
    f.store.set('abl:31:21', 3);
  }, 41);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…由你继续在我的背上刻上伤痕吧…啊…啊啊——！」',
    '银黑桃每次被你鞭打都会发出娇喘………',
  ]);
  assert.equal(fixture.store.get('cflag:31:342'), 3, 'CFLAG:342 推进到 3');
});

test('SELECTCOM 41 鞭，二回目以降·それ以外：CFLAG:342 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:342', 1);
  }, 41);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「咕…啊啊！呵呵呵…真不愧是这个鞭子，不是一般的疼啊…上次打出来的红肿还这么显眼，看样子消肿还要很长时间」',
    '银黑桃一边开着玩笑一边承受着你的鞭子………',
  ]);
  assert.equal(fixture.store.get('cflag:31:342'), 2, 'CFLAG:342 推进到 2');
});

test('SELECTCOM 41 鞭，源作误写：それ以外分支判定读的是 CFLAG:335（骑乘位）而非 CFLAG:342（鞭）本身，正常游玩下骑乘位推进过一次即锁死鞭的それ以外分支，1:1 保真不修补', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:342', 1);
    f.store.set('cflag:31:335', 5);
    f.store.set('flag:7', 0);
  }, 41);
  await speak_k8(fixture);
  assert.deepEqual(
    fixture.text_lines(),
    [],
    '源作误写导致该分支的守卫读错了变量，正常游玩下骑乘位一旦推进就锁死，不打印任何文本',
  );
  assert.equal(
    fixture.store.get('cflag:31:342'),
    1,
    'CFLAG:342 保持不变（锁死）',
  );
});

test('SELECTCOM 42 针，初めて：CFLAG:343 推进到 1', async () => {
  const fixture = await setup_k8(undefined, 42);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「呵呵呵、用针扎人的话，不扎像指甲缝之类更疼的地方可是没用的呦…？」',
  ]);
  assert.equal(fixture.store.get('cflag:31:343'), 1, 'CFLAG:343 推进到 1');
});

test('SELECTCOM 42 针，二回目以降·淫乱＋受虐狂っ気Lv5以上：CFLAG:343 推进到 9', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:343', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:21', 5);
  }, 42);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…嗯…把针扎刺进我勃起的乳头里吧…啊啊♡」',
    '「这样我就能高潮了…啊啊…喂、求你了♡」',
    '你听从了银黑桃的愿望、把针刺进了乳头。',
    '「咕啊…啊啊…呀——！好厉害…啊啊…去了啊啊啊——！」',
  ]);
  assert.equal(fixture.store.get('cflag:31:343'), 9, 'CFLAG:343 推进到 9');
});

test('SELECTCOM 42 针，二回目以降·受虐狂っ気Lv3以上：CFLAG:343 推进到 3', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:343', 1);
    f.store.set('abl:31:21', 3);
  }, 42);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…你的针…啊嗯…深一点…嗯…啊啊…咕！」',
    '银黑桃的皮肤上到处都流着血、喘着粗气………',
  ]);
  assert.equal(fixture.store.get('cflag:31:343'), 3, 'CFLAG:343 推进到 3');
});

test('SELECTCOM 42 针，二回目以降·それ以外：CFLAG:343 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:343', 1);
  }, 42);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯…嗯…咕…嗯！……呵呵呵、还早得很呢…就这样…还没发让我屈服」',
    '银黑桃带着有余裕的表情露出了沾满鲜血的身体………',
  ]);
  assert.equal(fixture.store.get('cflag:31:343'), 2, 'CFLAG:343 推进到 2');
});

test('SELECTCOM 43 眼罩·開始時，初めて（TEQUIP:43 已装）：CFLAG:344 推进到 1', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tequip:31:43', 1);
  }, 43);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「呵呵呵、拷问也好调教也好、遮断感觉都是常用手段呢」',
    '银黑桃呼的一笑，戴上了眼罩………',
  ]);
  assert.equal(fixture.store.get('cflag:31:344'), 1, 'CFLAG:344 推进到 1');
});

test('SELECTCOM 43 眼罩·開始時，二回目以降·淫乱＋受虐狂っ気Lv5以上：CFLAG:344 推进到 9', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tequip:31:43', 1);
    f.store.set('cflag:31:344', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:21', 5);
  }, 43);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「不光蒙眼…也用绳子把我帮上的话我会很高兴的…啊啊♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:344'), 9, 'CFLAG:344 推进到 9');
});

test('SELECTCOM 43 眼罩·開始時，二回目以降·受虐狂っ気Lv3以上：CFLAG:344 推进到 3', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tequip:31:43', 1);
    f.store.set('cflag:31:344', 1);
    f.store.set('abl:31:21', 3);
  }, 43);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊、蒙着眼真好…来吧、玩弄我的身体吧………♪」',
  ]);
  assert.equal(fixture.store.get('cflag:31:344'), 3, 'CFLAG:344 推进到 3');
});

test('SELECTCOM 43 眼罩·開始時，二回目以降·それ以外：CFLAG:344 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tequip:31:43', 1);
    f.store.set('cflag:31:344', 1);
  }, 43);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), ['「呵呵呵、还要蒙着眼玩吗？」']);
  assert.equal(fixture.store.get('cflag:31:344'), 2, 'CFLAG:344 推进到 2');
});

test('SELECTCOM 43 眼罩·終了時（TEQUIP:43 已摘）·淫乱：CFLAG:380 推进到 3', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:76', 1);
  }, 43);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), ['「呵呵呵、玩得很高兴」']);
  assert.equal(fixture.store.get('cflag:31:380'), 3, 'CFLAG:380 推进到 3');
});

test('SELECTCOM 43 眼罩·終了時·爱慕：CFLAG:380 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:85', 1);
  }, 43);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), ['「呵呵呵、玩得很高兴」']);
  assert.equal(fixture.store.get('cflag:31:380'), 2, 'CFLAG:380 推进到 2');
});

test('SELECTCOM 43 眼罩·終了時·それ以外：CFLAG:380 推进到 1', async () => {
  const fixture = await setup_k8(undefined, 43);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), ['「呵呵呵、玩得很高兴」']);
  assert.equal(fixture.store.get('cflag:31:380'), 1, 'CFLAG:380 推进到 1');
});

test('SELECTCOM 44 绳子·開始時，初めて（TEQUIP:44 已装）：CFLAG:345 推进到 1', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tequip:31:44', 1);
  }, 44);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「呵呵呵、你束缚还真熟练呢」',
    '「啊啊…不过如果不绑的更紧的话，我很容易就能从绳子里出来哦？」',
  ]);
  assert.equal(fixture.store.get('cflag:31:345'), 1, 'CFLAG:345 推进到 1');
});

test('SELECTCOM 44 绳子·開始時，二回目以降·淫乱＋受虐狂っ気Lv5以上：CFLAG:345 推进到 9', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tequip:31:44', 1);
    f.store.set('cflag:31:345', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:21', 5);
  }, 44);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…更多的触碰…我被束缚的身体…啊嗯…感受我吧…♡」',
    '银黑桃的身体被绳子束缚住、乳房像要飞出来一样被绳子挤在一起………',
  ]);
  assert.equal(fixture.store.get('cflag:31:345'), 9, 'CFLAG:345 推进到 9');
});

test('SELECTCOM 44 绳子·開始時，二回目以降·それ以外：CFLAG:345 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tequip:31:44', 1);
    f.store.set('cflag:31:345', 1);
  }, 44);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯…呵呵呵、果然被这么紧的绑住的话…啊啊…还真是逃不了呢」',
  ]);
  assert.equal(fixture.store.get('cflag:31:345'), 2, 'CFLAG:345 推进到 2');
});

test('SELECTCOM 44 绳子·終了時（TEQUIP:44 已解开）·淫乱：CFLAG:385 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:76', 1);
  }, 44);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), ['「啊嗯…还不要解开绳子啊！」']);
  assert.equal(fixture.store.get('cflag:31:385'), 2, 'CFLAG:385 推进到 2');
});

test('SELECTCOM 44 绳子·終了時·爱慕：CFLAG:385 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:85', 1);
  }, 44);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), ['「明明还想继续被绑起来…」']);
  assert.equal(fixture.store.get('cflag:31:385'), 2, 'CFLAG:385 推进到 2');
});

test('SELECTCOM 44 绳子·終了時·それ以外：CFLAG:385 推进到 1', async () => {
  const fixture = await setup_k8(undefined, 44);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), ['「这就解开了么？」']);
  assert.equal(fixture.store.get('cflag:31:385'), 1, 'CFLAG:385 推进到 1');
});

test('SELECTCOM 45 口塞·開始時，初めて（TEQUIP:45 已装）：CFLAG:346 推进到 1', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tequip:31:45', 1);
  }, 45);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…就这样让我戴上口枷…要做很过分的事吗………♪」',
  ]);
  assert.equal(fixture.store.get('cflag:31:346'), 1, 'CFLAG:346 推进到 1');
});

test('SELECTCOM 45 口塞·開始時，二回目以降·淫乱＋受虐狂っ気Lv5以上，眼罩已戴：拼接嘴的缝隙台词，CFLAG:346 推进到 9', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tequip:31:45', 1);
    f.store.set('cflag:31:346', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:21', 5);
    f.store.set('tequip:31:43', 1);
  }, 45);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「我舒服起来之后一直都很吵呢…没办法呢……♡」',
    '银黑桃自己戴上了口枷',
    '嘴的缝隙里，漏出了灼热的吐息………',
  ]);
  assert.equal(fixture.store.get('cflag:31:346'), 9, 'CFLAG:346 推进到 9');
});

test('SELECTCOM 45 口塞·開始時，二回目以降·淫乱＋受虐狂っ気Lv5以上，眼罩未戴：拼接眼神快融化了台词', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tequip:31:45', 1);
    f.store.set('cflag:31:346', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:21', 5);
  }, 45);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「我舒服起来之后一直都很吵呢…没办法呢……♡」',
    '银黑桃自己戴上了口枷',
    '眼神快融化了………',
  ]);
});

test('SELECTCOM 45 口塞·開始時，二回目以降·爱＋受虐狂っ気Lv5以上，眼罩未戴：源作误写此档缺"了"字（与淫乱两档"眼神快融化了………"不同），1:1 保真', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tequip:31:45', 1);
    f.store.set('cflag:31:346', 1);
    f.store.set('talent:31:85', 1);
    f.store.set('abl:31:21', 5);
  }, 45);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊嗯…恩…嗯咕………！」',
    '银黑桃被按上了口塞',
    '眼神快融化………',
  ]);
});

test('SELECTCOM 45 口塞·開始時，二回目以降·受虐狂っ気Lv3以上，眼罩已戴：拼接嘴的缝隙台词，CFLAG:346 推进到 3', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tequip:31:45', 1);
    f.store.set('cflag:31:346', 1);
    f.store.set('abl:31:21', 3);
    f.store.set('tequip:31:43', 1);
  }, 45);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯啊…被装上口枷的话，总觉得脑袋都要变成傻瓜了………」',
    '银黑桃被按上了口塞',
    '嘴的缝隙里，漏出了灼热的吐息………',
  ]);
  assert.equal(fixture.store.get('cflag:31:346'), 3, 'CFLAG:346 推进到 3');
});

test('SELECTCOM 45 口塞·開始時，二回目以降·それ以外：CFLAG:346 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tequip:31:45', 1);
    f.store.set('cflag:31:346', 1);
  }, 45);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊咕…嗯…」',
    '银黑桃被口塞堵住的嘴的缝隙里，漏出了声音………',
  ]);
  assert.equal(fixture.store.get('cflag:31:346'), 2, 'CFLAG:346 推进到 2');
});

test('SELECTCOM 45 口塞·終了時（TEQUIP:45 已取下）·淫乱：CFLAG:386 推进到 3', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:76', 1);
  }, 45);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…嗯…嗯啊………」',
    '取下了口塞的银黑桃的嘴里，流下了唾液………',
  ]);
  assert.equal(fixture.store.get('cflag:31:386'), 3, 'CFLAG:386 推进到 3');
});

test('SELECTCOM 45 口塞·終了時·爱慕：文本与淫乱档相同，CFLAG:386 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:85', 1);
  }, 45);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…嗯…嗯啊………」',
    '取下了口塞的银黑桃的嘴里，流下了唾液………',
  ]);
  assert.equal(fixture.store.get('cflag:31:386'), 2, 'CFLAG:386 推进到 2');
});

test('SELECTCOM 45 口塞·終了時·それ以外：CFLAG:386 推进到 1', async () => {
  const fixture = await setup_k8(undefined, 45);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「呼啊…嗯啊…」',
    '取下了口塞的银黑桃的嘴里，流下了唾液………',
  ]);
  assert.equal(fixture.store.get('cflag:31:386'), 1, 'CFLAG:386 推进到 1');
});

test('SELECTCOM 46 灌肠肛塞，初めて（TEQUIP:46 已装）：CFLAG:347 推进到 1', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tequip:31:46', 1);
  }, 46);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…嗯啊啊啊…！肚子…啊啊啊…好痛苦…嗯…嗯…快…快停下！」',
    '就算是银黑桃，被这样大量的灌肠也开始哭着请求你的原谅。',
    '「求、求你了…至少…厕所…呀…啊咕！」',
  ]);
  assert.equal(fixture.store.get('cflag:31:347'), 1, 'CFLAG:347 推进到 1');
});

test('SELECTCOM 46 灌肠肛塞，二回目以降·淫乱＋A感觉Lv3以上＋受虐狂っ気Lv3以上：CFLAG:347 推进到 7', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tequip:31:46', 1);
    f.store.set('cflag:31:347', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('abl:31:21', 3);
  }, 46);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊！继续…继续把灌肠液灌进来！到我的肚子撑起来为止♡」',
    '你如银黑桃所愿一次次的灌着肠、插着肛塞的肛门附近，肚子越来越鼓。',
    '「啊啊…啊啊啊…这个拔掉的话…会很厉害的喷出来吧…啊啊…啊啊嗯啊♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:347'), 7, 'CFLAG:347 推进到 7');
});

test('SELECTCOM 46 灌肠肛塞，二回目以降·爱＋A感觉Lv3以上＋受虐狂っ気Lv3以上：源作误写"全时灌肠液"应为"全是灌肠液"，1:1 保真，CFLAG:347 推进到 5', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tequip:31:46', 1);
    f.store.set('cflag:31:347', 1);
    f.store.set('talent:31:85', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('abl:31:21', 3);
  }, 46);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊…啊嗯嗯！肚子里…全时灌肠液…嗯啊…这样我还有感觉什么的…♡」',
    '银黑桃一边喘着粗气一边感受着灌肠液的刺激。',
    '「啊啊…你的话即使要看我最害羞的地方…啊啊也可以啊！」',
  ]);
  assert.equal(fixture.store.get('cflag:31:347'), 5, 'CFLAG:347 推进到 5');
});

test('SELECTCOM 46 灌肠肛塞，二回目以降·A感觉Lv3以上＋受虐狂っ気Lv3以上：CFLAG:347 推进到 3', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tequip:31:46', 1);
    f.store.set('cflag:31:347', 1);
    f.store.set('abl:31:3', 3);
    f.store.set('abl:31:21', 3);
  }, 46);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯啊…啊嗯！…我的肚子…啊啊…咕噜咕噜的响着…啊啊…啊嗯嗯嗯——！」',
    '银黑桃在灌肠液的刺激下，一边流着汗，一边漏出了喘息。',
    '而插上肛塞的时候，发出的声音格外的响………',
  ]);
  assert.equal(fixture.store.get('cflag:31:347'), 3, 'CFLAG:347 推进到 3');
});

test('SELECTCOM 46 灌肠肛塞，二回目以降·それ以外：CFLAG:347 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tequip:31:46', 1);
    f.store.set('cflag:31:347', 1);
  }, 46);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「不要…啊啊不要！啊啊…！不要这样！」',
    '银黑桃和想起了以前的屈辱而哭泣着，你毫不留情的灌了肠，并把肛塞塞进了肛门………',
  ]);
  assert.equal(fixture.store.get('cflag:31:347'), 2, 'CFLAG:347 推进到 2');
});

test('SELECTCOM 46 灌肠肛塞，源作无終了時分支：TEQUIP:46 未装时不打印任何文本、CFLAG:347 不变，1:1 保真', async () => {
  const fixture = await setup_k8(undefined, 46);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [], '源作无对应分支：不打印任何文本');
  assert.equal(
    fixture.store.get('cflag:31:347'),
    undefined,
    'CFLAG:347 未写入',
  );
});

test('SELECTCOM 55 放置PLAY，初めて·それ以外：CFLAG:356 推进到 1，附加装备补充描写（含 PRINTL 空行）', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tequip:31:11', 1);
    f.store.set('tequip:31:16', 1);
  }, 55);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「稍微休息一下吗？倒不如就这样永远休息下去也可以呦」',
    '银黑桃轻蔑的用鼻子笑着………',
    '',
    '银黑桃的蜜裂里，蠕虫蠕动着、毫不留情的搅动着腔内。',
    '银黑桃的胸部上装着榨乳器，吸出着母乳。',
  ]);
  assert.equal(fixture.store.get('cflag:31:356'), 1, 'CFLAG:356 推进到 1');
});

test('SELECTCOM 55 放置PLAY，二回目以降·淫乱＋欲情Lv3以上：CFLAG:356 推进到 6', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:356', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('palam:31:5', 100);
    f.store.set('palamlv:3', 50);
  }, 55);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…不被你碰，我都着急得快疯了、你这家伙………♡」',
    '银黑桃的表情放松了下来、眼睛因为发情而湿润取来。有什么契机的话，好像就会那样把你推到一样………',
    '',
  ]);
  assert.equal(fixture.store.get('cflag:31:356'), 6, 'CFLAG:356 推进到 6');
});

test('SELECTCOM 56 交谈，初めて·无摄像·それ以外：CFLAG:357 推进到 1', async () => {
  const fixture = await setup_k8(undefined, 56);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '你',
    '刚和她交谈了几句、银黑桃就一边发出着',
    '声音，一边拼命忍耐着的回着话',
  ]);
  assert.equal(fixture.store.get('cflag:31:357'), 1, 'CFLAG:357 推进到 1');
});

test('SELECTCOM 56 交谈，初めて·视频自我介绍·TALENT:89：TFLAG:32 写入位 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tequip:31:53', 1);
    f.store.set('talent:31:89', 1);
    f.store.set('abl:31:31', 3);
  }, 56);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '你催促着银黑桃进行自我介绍、',
    '银黑桃把自己的本名和至今为止的性经验',
    '甚至自慰时妄想的内容都',
    '微笑的娓娓道来……',
    '只是期待着把水晶球的内容送到狂王那里去，股间就开始湿了……',
  ]);
  assert.equal(fixture.store.get('tflag:32'), 2, 'TFLAG:32 写入位 2');
});

test('SELECTCOM 56 交谈，二回目以降·视频·淫乱＋PALAMLV4＋插着不拔：源作误写"晃着要"应为"晃着腰"，1:1 保真', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:357', 1);
    f.store.set('tequip:31:53', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('palam:31:5', 100);
    f.store.set('palamlv:4', 50);
    f.store.set('tflag:60', 1);
  }, 56);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '你催促着银黑桃进行自我介绍、',
    '银黑桃一边晃着要，一边不停的说着猥琐的语言',
  ]);
});

test('SELECTCOM 56 交谈，二回目以降·无摄像·TEQUIP:11：拼接"快乐的"', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:357', 1);
    f.store.set('palam:31:4', 100);
    f.store.set('palamlv:4', 50);
    f.store.set('palam:31:5', 100);
    f.store.set('tequip:31:11', 1);
  }, 56);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '你',
    '刚和她交谈了几句、银黑桃就一边发出着',
    '快乐的',
    '声音、一边拼命忍耐着的回着话',
  ]);
});

test('SELECTCOM 69 六九式，初めて·それ以外：CFLAG:364 推进到 1', async () => {
  const fixture = await setup_k8(undefined, 69);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊…嗯…嗯…恶、恶作剧太过分的话…我、我就要下去了！」',
    '银黑桃一边像是要忍耐蜜裂的刺激一样左右摇动着屁股，一边舔着你的阴茎………',
  ]);
  assert.equal(fixture.store.get('cflag:31:364'), 1, 'CFLAG:364 推进到 1');
});

test('SELECTCOM 69 六九式，二回目以降·爱慕：源作结尾多一个引号，1:1 保真，CFLAG:364 推进到 4', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:364', 1);
    f.store.set('talent:31:85', 1);
  }, 69);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…嗯…不要…这么努力的舔我…我快不能认真舔你的阴茎了…♡」',
    '银黑桃每次被舔到蜜裂，都会吮吸你的阴茎。',
    '「啊…嗯…啾…啊…一边被你爱抚一边舔着你，好幸福…♡」',
    '「嗯…嗯啾…啾…啾…啾…啊…嗯…再继续…♡」」',
  ]);
  assert.equal(fixture.store.get('cflag:31:364'), 4, 'CFLAG:364 推进到 4');
});

test('SELECTCOM 69 六九式，二回目以降·それ以外：源作缺失结尾引号，1:1 保真', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:364', 1);
  }, 69);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊…嗯…嗯…啊嗯…嗯啊…嗯…嗯嗯…啾…啾…不、不行啊、这么欺负我的话…啊啊！',
    '银黑桃一边像是要忍耐蜜裂的刺激一样左右摇动着屁股，一边舔着你的阴茎。',
    '「啊嗯…小心我会咬你啊…嗯…啊嗯」',
  ]);
});

test('SELECTCOM 80 强制口交，初めて·それ以外（无爱慕档）：CFLAG:381 推进到 1', async () => {
  const fixture = await setup_k8(undefined, 80);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯咕…嗯咕…！？…啊、不、不要…嗯咕…嗯…嗯咕！」',
    '银黑桃的喉咙深处被侵犯着而翻着白眼。偶尔牙齿碰到阴茎的疼痛也无视，继续插了进去………',
  ]);
  assert.equal(fixture.store.get('cflag:31:381'), 1, 'CFLAG:381 推进到 1');
});

test('SELECTCOM 80 强制口交，二回目以降·爱＋侍奉精神Lv5（初めて 无此档，档位结构不对称，源作如此）：CFLAG:381 推进到 4', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:381', 1);
    f.store.set('talent:31:85', 1);
    f.store.set('abl:31:16', 5);
  }, 80);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯咕…嗯…嗯…嗯咕…嗯…啊嗯…嗯…嗯咕♪」',
    '银黑桃知道喉咙深处都被侵犯着，为了给予你的阴茎快感而奉仕着。',
    '黏糊糊的舌头缠绕着你的阴茎，并为了紧闭嘴唇，让牙不碰到阴茎而努力着。',
    '「嗯啾…啾…嗯咕…嗯…嗯咕…嗯…嗯♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:381'), 4, 'CFLAG:381 推进到 4');
});

test('SELECTCOM 123 乳夹口交，初めて·弄乳狂＋巨乳（TALENT:110）：拼接巨乳加成台词', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:78', 1);
    f.store.set('talent:31:110', 1);
  }, 123);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊嗯…我明明这么舒服…啊啊…胸部太舒服了…嗯…啊嗯…嗯啾…啾♪」',
    '银黑桃带着出神的表情一边舔着你的阴茎，一边加在乳房中间。',
    '仔细看的话，银黑桃抓着乳房的手指，正在不停的在乳头上旋转。',
    '「嗯…嗯咕…嗯…我…我…我的脑袋变奇怪了…嗯…咕啾…啾……♪」',
    '「被你变大的胸部…变的更舒服了…嗯…咕啾嗯啾啾♪」',
  ]);
  assert.equal(fixture.store.get('cflag:31:360'), 1, 'CFLAG:360 推进到 1');
});

test('SELECTCOM 123 乳夹口交，二回目以降·弄乳狂＋淫乱（无巨乳）：不拼接巨乳加成，CFLAG:360 推进到 8', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:360', 1);
    f.store.set('talent:31:78', 1);
    f.store.set('talent:31:76', 1);
  }, 123);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…我的阴茎…让我变得舒服的阴茎…啾…啾…嗯…啾…啾…♡」',
    '银黑桃的乳房夹住你的阴茎、一边忍不住的吮吸着阴茎。',
    '「嗯啾…啾…啾…啊啊…我的嘴和胸部同时被侵犯…我快高潮了…嗯…啾…嗯♡」',
    '银黑桃一边漏出灼热的吐息、一边不停的亲吻着从胸部中露出来的你的阴茎。',
    '「啾啾…啾♡ 我最喜欢的阴茎…啊啊…更加更加更加的让我舒服起来吧♡ 啾♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:360'), 8, 'CFLAG:360 推进到 8');
});

test('SELECTCOM 125 口交时自慰，初めて·淫乱：CFLAG:361 推进到 1', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:76', 1);
  }, 125);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '银黑桃看着眼前伸出来的阴茎、露出了稍微有些为难的表情。',
    '「啊啊…虽然口交也不错、但还是想集中在自慰上…你还真是坏心眼呢♡ 啊啊…啊嗯…嗯嗯♡」',
    '银黑桃高兴地一边含着你阴茎，一边开始了自慰………',
  ]);
  assert.equal(fixture.store.get('cflag:31:361'), 1, 'CFLAG:361 推进到 1');
});

test('SELECTCOM 125 口交时自慰，二回目以降·それ以外：CFLAG:361 推进到 2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:361', 1);
  }, 125);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯咕…嗯…嗯………」',
    '银黑桃发出着鼻音、一边自慰一边吮吸着你的阴茎………',
  ]);
  assert.equal(fixture.store.get('cflag:31:361'), 2, 'CFLAG:361 推进到 2');
});

test('SELECTCOM 126 手搓口交，初めて·淫乱：CFLAG:362 推进到 1', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:76', 1);
  }, 126);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊嗯…♡ 嗯…啾…啾…嗯啊…你的阴茎…真好吃…嗯♡」',
    '银黑桃一边激烈地撸着、一边像舔冰激凌那样温柔地舔着你的阴茎………',
  ]);
  assert.equal(fixture.store.get('cflag:31:362'), 1, 'CFLAG:362 推进到 1');
});

test('SELECTCOM 126 手搓口交，二回目以降·侍奉精神Lv3以上：CFLAG:362 推进到 3', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:362', 1);
    f.store.set('abl:31:16', 3);
  }, 126);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啾…嗯…你被这么做就会很舒服呢…嗯…啾…啾…嗯！」',
    '银黑桃一边脸颊泛红的用手撸着、一边继续口腔奉仕………',
  ]);
  assert.equal(fixture.store.get('cflag:31:362'), 3, 'CFLAG:362 推进到 3');
});

test('SELECTCOM 127 真空口交，初めて·侍奉精神Lv3以上：源作结尾多一个引号，1:1 保真，CFLAG:363 推进到 1', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('abl:31:16', 3);
  }, 127);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯…嗯啾…啾…啾…♪啾…啾…♪」」',
    '银黑桃兴奋的发出着响声，吮吸着你的阴茎………',
  ]);
  assert.equal(fixture.store.get('cflag:31:363'), 1, 'CFLAG:363 推进到 1');
});

test('SELECTCOM 127 真空口交，二回目以降·爱慕：CFLAG:363 推进到 4', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:363', 1);
    f.store.set('talent:31:85', 1);
  }, 127);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「你的阴茎…明明那么臭…对我来说确实最棒的香味呢…啊啊…嗯啾啾啾♡」',
    '银黑桃因为口腔奉仕而兴奋地发出响声，开始吮吸着你的阴茎。',
    '「在我嘴里…满满的射出来吧…啊啊…♡ 啾…啾啾…嗯嗯♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:363'), 4, 'CFLAG:363 推进到 4');
});

test('SELECTCOM 124 深喉，初めて·爱慕：CFLAG:365 推进到 1', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:85', 1);
  }, 124);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…你的阴茎全都是我的东西…嗯咕…啾…嗯…嗯咕♡」',
    '银黑桃用鼻子喘着气，把你的阴茎一直吞到了喉咙深处………',
  ]);
  assert.equal(fixture.store.get('cflag:31:365'), 1, 'CFLAG:365 推进到 1');
});

test('SELECTCOM 124 深喉，二回目以降·CFLAG:363 误读源作 bug：CFLAG:365 已推进但 CFLAG:363（真空口交）碰巧偏高时被锁死，不打印任何文本、CFLAG:365 不变，1:1 保真', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:365', 1);
    f.store.set('cflag:31:363', 10);
    f.store.set('talent:31:76', 1);
    f.store.set('flag:7', 1); // 覆盖 setup_k8 默认的 FLAG:7==2，走正常死区判定
  }, 124);
  await speak_k8(fixture);
  assert.deepEqual(
    fixture.text_lines(),
    [],
    '源作条件读 CFLAG:363 而非 CFLAG:365，误判死区导致无分支命中',
  );
  assert.equal(fixture.store.get('cflag:31:365'), 1, 'CFLAG:365 未推进');
});

test('SELECTCOM 124 深喉，二回目以降·CFLAG:363 未被推高时正常触发淫乱档：CFLAG:365 推进到 5', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:365', 1);
    f.store.set('cflag:31:363', 0);
    f.store.set('talent:31:76', 1);
  }, 124);
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…我已经迷上了你的阴茎了…嗯啾…啾…嗯…嗯♡」',
    '银黑桃用鼻子喘着气，把你的阴茎一直吞到了喉咙深处。',
    '「啾…嗯…嗯咕…嗯…咕…啊啊…嗯…被侵犯嘴里的感觉，受不了…嗯…嗯啾♡」',
  ]);
  assert.equal(fixture.store.get('cflag:31:365'), 5, 'CFLAG:365 推进到 5');
});

test('SELECTCOM 87 穿环，初めて·淫乱·P=1（乳头）已装：CFLAG:348 推进到 1', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:7', 1);
  }, 87);
  fixture.load_module('system/train/piercing-state').piercing_state.p = 1;
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '银黑桃想着第一次在身上打孔的疼痛痛而皱着眉。',
    '「啊嗯…乳头上装上环的话…会太有感觉的…啊啊♪」',
    '银黑桃完全勃起的乳头上的环闪着光………',
  ]);
  assert.equal(fixture.store.get('cflag:31:348'), 1, 'CFLAG:348 推进到 1');
});

test('SELECTCOM 87 穿环，初めて·それ以外·P=8（阴蒂，无 TALENT:121/122）已装', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:7', 8);
  }, 87);
  fixture.load_module('system/train/piercing-state').piercing_state.p = 8;
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '银黑桃想着第一次在身上打孔的疼痛痛而悲鸣着。',
    '「啊啊…嗯…啊啊…对我的敏感的地方…啊啊…做这种…事！」',
    '银黑桃敏感的阴蒂上被装上了环………',
  ]);
});

test('SELECTCOM 87 穿环，初めて·それ以外·P=8（阴茎，TALENT:121）已装：与阴蒂档文本不同', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:7', 8);
    f.store.set('talent:31:121', 1);
  }, 87);
  fixture.load_module('system/train/piercing-state').piercing_state.p = 8;
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '银黑桃想着第一次在身上打孔的疼痛痛而悲鸣着。',
    '「啊咕…咕…这样的东西…不会吧………」',
    '银黑桃一想到长出的阴茎上被强行装上环的屈辱，就不禁流下了泪………',
  ]);
});

test('SELECTCOM 87 穿环，初めて·爱慕·P=16（舌先，源作用 PRINTFORM 不等待，此实现仍逐条 await）已装', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:85', 1);
    f.store.set('cflag:31:7', 16);
  }, 87);
  fixture.load_module('system/train/piercing-state').piercing_state.p = 16;
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '银黑桃想着第一次在身上打孔的疼痛痛而皱着眉。',
    '「啊啊…如果和你舌吻的话…会变得很舒服吧…？」',
    '银黑桃为了展示环而伸出了舌头………',
  ]);
});

test('SELECTCOM 87 穿环，初めて·淫乱·取り外し（CFLAG:7 未含 P）：无关部位不打印装着台词', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:7', 0);
  }, 87);
  fixture.load_module('system/train/piercing-state').piercing_state.p = 2;
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '银黑桃寂寞的抚摸着取下环而留着的伤痕………',
  ]);
});

test('SELECTCOM 87 穿环，初めて·助手在场：不打印任何文本、CFLAG:348 不写入', async () => {
  const fixture = await setup_k8((f, ef) => {
    ef.assi = 5;
    ef.assiplay = 1;
  }, 87);
  fixture.load_module('system/train/piercing-state').piercing_state.p = 1;
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), []);
  assert.equal(
    fixture.store.get('cflag:31:348'),
    undefined,
    'CFLAG:348 未写入',
  );
});

test('SELECTCOM 87 穿环，二回目以降·淫乱·P=64（鼻穴）已装：CFLAG:348 推进到 4', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('cflag:31:348', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:7', 64);
  }, 87);
  fixture.load_module('system/train/piercing-state').piercing_state.p = 64;
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '银黑桃想着第一次在身上打孔的疼痛痛而皱着眉。',
    '「这个还是有点害羞呢…嗯？很酷？是这样吗」',
    '银黑桃鼻子上的环闪着光………',
  ]);
  assert.equal(fixture.store.get('cflag:31:348'), 4, 'CFLAG:348 推进到 4');
});

test('SELECTCOM 87 穿环，二回目以降·助手在场：不打印任何文本、CFLAG:348 不推进', async () => {
  const fixture = await setup_k8((f, ef) => {
    f.store.set('cflag:31:348', 1);
    ef.assi = 5;
    ef.assiplay = 1;
  }, 87);
  fixture.load_module('system/train/piercing-state').piercing_state.p = 1;
  await speak_k8(fixture);
  assert.deepEqual(fixture.text_lines(), []);
  assert.equal(
    fixture.store.get('cflag:31:348'),
    1,
    'CFLAG:348 保持 1，未推进',
  );
});

// —— DOG_KOJO_8（兽奸专用口上，源作对白全为空参数，仅验证状态机 + 路由 + 罕见分支） ——

test('DOG_KOJO_8 SC0 爱撫 二回目·牝犬（TALENT:136）：CFLAG:301 推进到 7', async () => {
  const fixture = await setup_k8((f, ef) => {
    f.store.set('cflag:31:301', 1);
    f.store.set('talent:31:136', 1);
    ef.selectcom = 0;
  });
  const { dog_kojo_8 } = fixture.load_module('kojo/kojo-k8-spade');
  await dog_kojo_8();
  assert.deepEqual(fixture.text_lines(), ['']);
  assert.equal(fixture.store.get('cflag:31:301'), 7, 'CFLAG:301 推进到 7');
});

test('DOG_KOJO_8 SC6 キス 初吻（CFLAG:307==0 且 TFLAG:13）·淫乱：CFLAG:307 推进到 1', async () => {
  const fixture = await setup_k8((f, ef) => {
    f.store.set('tflag:13', 1);
    f.store.set('talent:31:76', 1);
    ef.selectcom = 6;
  });
  const { dog_kojo_8 } = fixture.load_module('kojo/kojo-k8-spade');
  await dog_kojo_8();
  assert.deepEqual(fixture.text_lines(), ['']);
  assert.equal(
    fixture.store.get('cflag:31:307'),
    1,
    'CFLAG:307 推进到 1（初吻档）',
  );
});

test('DOG_KOJO_8 SC6 キス（調教で和）初めて（无 TFLAG:13）·それ以外：CFLAG:307 推进到 1', async () => {
  const fixture = await setup_k8((f, ef) => {
    ef.selectcom = 6;
  });
  const { dog_kojo_8 } = fixture.load_module('kojo/kojo-k8-spade');
  await dog_kojo_8();
  assert.deepEqual(fixture.text_lines(), ['']);
  assert.equal(
    fixture.store.get('cflag:31:307'),
    1,
    'CFLAG:307 推进到 1（調教で和初めて档）',
  );
});

test('DOG_KOJO_8 SC21 背后位 初めて·处女·淫乱：CFLAG:322 推进到 1', async () => {
  const fixture = await setup_k8((f, ef) => {
    f.store.set('talent:31:0', 1);
    f.store.set('talent:31:76', 1);
    ef.selectcom = 21;
  });
  const { dog_kojo_8 } = fixture.load_module('kojo/kojo-k8-spade');
  await dog_kojo_8();
  assert.deepEqual(fixture.text_lines(), ['']);
  assert.equal(fixture.store.get('cflag:31:322'), 1, 'CFLAG:322 推进到 1');
});

test('DOG_KOJO_8 SC21 背后位 二回目·牝犬：RAND 三选一均打印空文本，CFLAG:322 推进到 7', async () => {
  const fixture = await setup_k8((f, ef) => {
    f.store.set('cflag:31:322', 1);
    f.store.set('talent:31:136', 1);
    ef.selectcom = 21;
  });
  const { dog_kojo_8 } = fixture.load_module('kojo/kojo-k8-spade');
  await dog_kojo_8(() => 1); // rand_n 恒非 0，落到 ELSE 档
  assert.deepEqual(fixture.text_lines(), ['']);
  assert.equal(fixture.store.get('cflag:31:322'), 7, 'CFLAG:322 推进到 7');
});

test('DOG_KOJO_8 SC31 口交 二回目·爱＋侍奉精神Lv5：PRINTFORML+PRINTFORMW 各打印一行空文本', async () => {
  const fixture = await setup_k8((f, ef) => {
    f.store.set('cflag:31:332', 1);
    f.store.set('talent:31:85', 1);
    f.store.set('abl:31:16', 5);
    ef.selectcom = 31;
  });
  const { dog_kojo_8 } = fixture.load_module('kojo/kojo-k8-spade');
  await dog_kojo_8();
  assert.deepEqual(fixture.text_lines(), ['', '']);
  assert.equal(fixture.store.get('cflag:31:332'), 4, 'CFLAG:332 推进到 4');
});

test('DOG_KOJO_8 SC43 眼罩 開始時（TEQUIP:43）·初めて·牝犬：CFLAG:344 推进到 1', async () => {
  const fixture = await setup_k8((f, ef) => {
    f.store.set('tequip:31:43', 1);
    f.store.set('talent:31:136', 1);
    ef.selectcom = 43;
  });
  const { dog_kojo_8 } = fixture.load_module('kojo/kojo-k8-spade');
  await dog_kojo_8();
  assert.deepEqual(fixture.text_lines(), ['']);
  assert.equal(fixture.store.get('cflag:31:344'), 1, 'CFLAG:344 推进到 1');
});

test('DOG_KOJO_8 SC43 眼罩 終了時（TEQUIP:43 == 0）·牝犬：源作守卫误读 CFLAG:338 而非 CFLAG:444，1:1 保真', async () => {
  const fixture = await setup_k8((f, ef) => {
    f.store.set('flag:7', 1); // 关闭上限旁路，令 CFLAG 阈值真正生效（默认 2 会短路掉本测试要验的条件）
    f.store.set('talent:31:136', 1);
    f.store.set('cflag:31:338', 5); // 肛门侍奉计数偏高，源作 bug 命中此档的守卫读的是它而非 CFLAG:444
    ef.selectcom = 43;
  });
  const { dog_kojo_8 } = fixture.load_module('kojo/kojo-k8-spade');
  await dog_kojo_8();
  assert.deepEqual(
    fixture.text_lines(),
    [''],
    'CFLAG:338 = 5（>= 3）令牝犬档守卫判假，源作 bug 使其跌落到それ以外档而非牝犬档',
  );
  assert.equal(
    fixture.store.get('cflag:31:444'),
    1,
    'CFLAG:444 落到それ以外档的值 1，而非牝犬档应有的 4（源作 bug，1:1 保真）',
  );
});

test('DOG_KOJO_8 SC43 眼罩 終了時·牝犬·CFLAG:338 未被推高：正常触发，CFLAG:444 推进到 4', async () => {
  const fixture = await setup_k8((f, ef) => {
    f.store.set('talent:31:136', 1);
    ef.selectcom = 43;
  });
  const { dog_kojo_8 } = fixture.load_module('kojo/kojo-k8-spade');
  await dog_kojo_8();
  assert.deepEqual(fixture.text_lines(), ['']);
  assert.equal(fixture.store.get('cflag:31:444'), 4, 'CFLAG:444 推进到 4');
});

test('DOG_KOJO_8 SC56 会話 初めて·无摄像（TEQUIP:53 == 0）：不打印任何文本，CFLAG:357 仍推进到 1', async () => {
  const fixture = await setup_k8((f, ef) => {
    ef.selectcom = 56;
  });
  const { dog_kojo_8 } = fixture.load_module('kojo/kojo-k8-spade');
  await dog_kojo_8();
  assert.deepEqual(
    fixture.text_lines(),
    [],
    '狗不能对话，无摄像时源作直接跳过（IF TEQUIP:53 内层判定）',
  );
  assert.equal(fixture.store.get('cflag:31:357'), 1, 'CFLAG:357 推进到 1');
});

test('DOG_KOJO_8 SC56 会話 初めて·有摄像（TEQUIP:53）·淫乱：CFLAG:357 推进到 1', async () => {
  const fixture = await setup_k8((f, ef) => {
    f.store.set('tequip:31:53', 1);
    f.store.set('talent:31:76', 1);
    ef.selectcom = 56;
  });
  const { dog_kojo_8 } = fixture.load_module('kojo/kojo-k8-spade');
  await dog_kojo_8();
  assert.deepEqual(fixture.text_lines(), ['']);
  assert.equal(fixture.store.get('cflag:31:357'), 1, 'CFLAG:357 推进到 1');
});

// —— COLOSSEUM_KOJO_8（死斗场专用口上） ——

test('COLOSSEUM_KOJO_8 SC56 交谈 气力０以下·助手在场：CFLAG 不涉及，仅文本区分', async () => {
  const fixture = await setup_k8((f, ef) => {
    ef.selectcom = 56;
    ef.assi = 5;
    ef.assiplay = 1;
  });
  const { colosseum_kojo_8 } = fixture.load_module('kojo/kojo-k8-spade');
  await colosseum_kojo_8();
  assert.deepEqual(fixture.text_lines(), [
    '「咕…输给你了………」',
    '银黑桃丢下武器跪了下来……',
  ]);
});

test('COLOSSEUM_KOJO_8 SC56 交谈 气力０以下·助手不在场', async () => {
  const fixture = await setup_k8((f, ef) => {
    ef.selectcom = 56;
  });
  const { colosseum_kojo_8 } = fixture.load_module('kojo/kojo-k8-spade');
  await colosseum_kojo_8();
  assert.deepEqual(fixture.text_lines(), [
    '「快、快住手…别靠近我………」',
    '银黑桃丢下武器跪了下来……',
  ]);
});

test('COLOSSEUM_KOJO_8 SC56 交谈 气力充足·助手在场', async () => {
  const fixture = await setup_k8((f, ef) => {
    f.store.set('base:31:1', 100);
    join_slave_chara(f, 5, '奴隶5');
    ef.selectcom = 56;
    ef.assi = 5;
    ef.assiplay = 1;
  });
  const { colosseum_kojo_8 } = fixture.load_module('kojo/kojo-k8-spade');
  await colosseum_kojo_8();
  assert.deepEqual(fixture.text_lines(), [
    '「我知道我不会输给你的…即使被加上多么不利的条件也是」',
    '银黑桃架起武器，和奴隶5相对着………',
  ]);
});

test('COLOSSEUM_KOJO_8 SC31 口交 助手在场·持阴茎（TALENT:121）：拼接"阴茎"', async () => {
  const fixture = await setup_k8((f, ef) => {
    f.store.set('talent:5:121', 1);
    join_slave_chara(f, 5, '奴隶5');
    ef.selectcom = 31;
    ef.assi = 5;
    ef.assiplay = 1;
  });
  const { colosseum_kojo_8 } = fixture.load_module('kojo/kojo-k8-spade');
  await colosseum_kojo_8();
  assert.deepEqual(fixture.text_lines(), [
    '「啊嗯…恩咕…咕…会好好舔的所以不要用暴力…嗯嗯嗯！」',
    '奴隶5因为',
    '阴茎',
    '被银黑桃舔着而露出了心旷神怡的表情……',
  ]);
});

test('COLOSSEUM_KOJO_8 SC31 口交 助手不在场：怪物阴茎档', async () => {
  const fixture = await setup_k8((f, ef) => {
    ef.selectcom = 31;
  });
  const { colosseum_kojo_8 } = fixture.load_module('kojo/kojo-k8-spade');
  await colosseum_kojo_8();
  assert.deepEqual(fixture.text_lines(), [
    '「嗯咕…好、好脏…啊啊啊…啾…啾…嗯啾………」',
    '银黑桃舔着那带有令人作呕的气味的阴茎……',
  ]);
});

test('COLOSSEUM_KOJO_8 SC5 胸爱撫 助手不在场：怪物档三行', async () => {
  const fixture = await setup_k8((f, ef) => {
    ef.selectcom = 5;
  });
  const { colosseum_kojo_8 } = fixture.load_module('kojo/kojo-k8-spade');
  await colosseum_kojo_8();
  assert.deepEqual(fixture.text_lines(), [
    '「啊、放开…放开那肮脏的手…啊…啊啊！」',
    '像是因为银黑桃高压的态度还不崩溃而生气了、怪物握住了银黑桃的胸部揉了起来。',
    '「咕——————！好、好疼…快、快住手！」',
  ]);
});

test('COLOSSEUM_KOJO_8 SC5 胸爱撫 助手在场：三行观众围观档', async () => {
  const fixture = await setup_k8((f, ef) => {
    join_slave_chara(f, 5, '奴隶5');
    ef.selectcom = 5;
    ef.assi = 5;
    ef.assiplay = 1;
  });
  const { colosseum_kojo_8 } = fixture.load_module('kojo/kojo-k8-spade');
  await colosseum_kojo_8();
  assert.deepEqual(fixture.text_lines(), [
    '「嗯啊…啊啊拜托你了…因为我是后辈温柔点吧…啊…嗯嗯！」',
    '银黑桃就这样任由奴隶5摆弄胸部。',
    '然后奴隶5为了让观众观赏而开始揉动胸部………',
  ]);
});

test('COLOSSEUM_KOJO_8 SC21 背后位 巨魔（TFLAG:400 死斗场敌种 == 206）：三行巨魔专属台词', async () => {
  const fixture = await setup_k8((f, ef) => {
    f.store.set('tflag:400', 206);
    ef.selectcom = 21;
  });
  const { colosseum_kojo_8 } = fixture.load_module('kojo/kojo-k8-spade');
  await colosseum_kojo_8();
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊啊啊！…要、要坏掉了…啊、啊啊…咕…咕啊啊啊啊！」',
    '可怜的银黑桃一边发出癞蛤蟆被弄死一样的声音一边就那样任由巨魔摆布着。',
    '观众一个个都站了起来，沸腾着………',
  ]);
});

test('COLOSSEUM_KOJO_8 SC21 背后位 普通怪物（非巨魔、无助手）', async () => {
  const fixture = await setup_k8((f, ef) => {
    ef.selectcom = 21;
  });
  const { colosseum_kojo_8 } = fixture.load_module('kojo/kojo-k8-spade');
  await colosseum_kojo_8();
  assert.deepEqual(fixture.text_lines(), [
    '「、不要啊…啊啊…呜…啊啊…啊啊——！嗯…啊啊啊啊啊！」',
    '银黑桃因为被怪物从后面侵犯而继续发出着悲鸣。',
    '观众一个个都站了起来，沸腾着………',
  ]);
});

test('COLOSSEUM_KOJO_8 SC27 背后位アナル 助手在场·无阴茎无假阴茎：不拼接部位词', async () => {
  const fixture = await setup_k8((f, ef) => {
    join_slave_chara(f, 5, '奴隶5');
    ef.selectcom = 27;
    ef.assi = 5;
    ef.assiplay = 1;
  });
  const { colosseum_kojo_8 } = fixture.load_module('kojo/kojo-k8-spade');
  await colosseum_kojo_8();
  assert.deepEqual(fixture.text_lines(), [
    '「求、求你…啊咕…饶了我吧…啊啊…嗯…牙啊啊啊啊啊！」',
    '奴隶5一边听着银黑桃的悲鸣。一边用',
    '一般毫不留情的继续蹂躏着银黑桃的肛门。',
    '随着银黑桃发出悲鸣，观众沸腾了起来………',
  ]);
});

test('COLOSSEUM_KOJO_8 SC51 媚药史莱姆：单行台词', async () => {
  const fixture = await setup_k8((f, ef) => {
    ef.selectcom = 51;
  });
  const { colosseum_kojo_8 } = fixture.load_module('kojo/kojo-k8-spade');
  await colosseum_kojo_8();
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…史莱姆么…嗯…连这种地方都进来了…啊啊！」',
  ]);
});

// —— KOJO_MESSAGE_PALAMCNG_8（参数变动口上） ——

async function speak_palamcng_k8(fixture, rand) {
  const { kojo_message_palamcng_family } =
    fixture.load_module('kojo/kojo-system');
  return kojo_message_palamcng_family.call(8, { args: [rand] });
}

test('PALAMCNG：头部守卫 TEQUIP:45（口塞）跳过', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tequip:31:45', 1);
    f.store.set('palam:31:3', 501);
  });
  await speak_palamcng_k8(fixture);
  assert.deepEqual(fixture.text_lines(), []);
});

test('PALAMCNG：首次润滑 Lv2 爱慕+润滑液（SELECTCOM==50）写 CFLAG:221', async () => {
  const fixture = await setup_k8((f, ef) => {
    f.store.set('talent:31:85', 1);
    f.store.set('palam:31:3', 501);
    ef.selectcom = 50;
  });
  await speak_palamcng_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…润滑液黏糊糊的…啊嗯」',
    '―――润滑初次超过LV2。',
  ]);
  assert.equal(fixture.store.get('cflag:31:221'), 1, '首次润滑Lv2');
});

test('PALAMCNG：首次欲情 Lv2 それ以外+非媚药写 CFLAG:222', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('palam:31:5', 501);
  });
  await speak_palamcng_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「呵呵呵、身体稍微变得热起来的样子了…啊啊…啊啊啊………」',
    '―――欲情初次超过LV2。',
  ]);
  assert.equal(fixture.store.get('cflag:31:222'), 1, '首次欲情Lv2');
});

test('PALAMCNG：首次耻情 Lv2 爱慕写 CFLAG:223', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:85', 1);
    f.store.set('palam:31:8', 501);
  });
  await speak_palamcng_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…太羞耻了…不要看啊…」',
    '―――耻情初次超过LV2。',
  ]);
  assert.equal(fixture.store.get('cflag:31:223'), 1, '首次耻情Lv2');
});

test('PALAMCNG：首次恐怖 Lv2 それ以外写 CFLAG:224', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('palam:31:10', 501);
  });
  await speak_palamcng_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「我才没有…害怕呢…咕」',
    '―――恐怖初次超过LV2。',
  ]);
  assert.equal(fixture.store.get('cflag:31:224'), 1, '首次恐怖Lv2');
});

test('PALAMCNG：首次阴蒂绝顶 それ以外写 CFLAG:225', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('nowex:31:0', 1);
  });
  await speak_palamcng_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊…啊啊！？不、不行…再继续弄的话…啊…嗯…呜啊！？」',
    '银黑桃在阴蒂的强烈刺激下发出了悲鸣。但是很容易就能明白，那悲鸣里混杂着甜美和快乐。',
    '然后银黑桃张开漂亮的喉咙，发出了绝顶的娇喘。',
    '「啊…嗯…不、不要啊…这样…被强迫着去了什么的…啊啊不行…啊…咕…嗯…呀啊啊啊！」',
    '「嗯啊………这种…屈辱…嗯嗯嗯」',
  ]);
  assert.equal(fixture.store.get('cflag:31:225'), 1, '首次C绝顶');
});

test('PALAMCNG：首次私处绝顶 淫乱写 CFLAG:226', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('nowex:31:1', 1);
  });
  await speak_palamcng_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…继续侵犯…我的小穴…♡ 啊啊…要去…要去了♡」',
    '银黑桃下流的张开双腿，蜜裂抽搐着。那个姿态已经完全不是帅气的女忍者的身姿了。',
    '「我…去了…用小穴…用小穴去了♡ 啊啊…啊嗯…啊啊啊♡」',
    '银黑桃全身痉挛着，迎来了第一次私处绝顶………',
  ]);
  assert.equal(fixture.store.get('cflag:31:226'), 1, '首次V绝顶');
});

test('PALAMCNG：私处绝顶二回目·淫乱+插着不拔（TFLAG:60）', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('nowex:31:1', 1);
    f.store.set('cflag:31:226', 1);
    f.store.set('tflag:60', 1);
  });
  await speak_palamcng_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…我的小穴…被你的阴茎插的…啊啊…变成马上就回去的淫乱小穴了♡」',
    '银黑桃的深处每次被侵犯，腔口都会痉挛着包裹住你的阴茎。',
    '「来…继续插进来…啊啊…嗯…啊嗯…啊啊——♡」',
    '「啊…啊啊…这样…这样好舒服…用你的阴茎…啊…去了去了…啊啊啊啊——♡」',
    '然后银黑桃发出着格外高亢的娇喘、高潮了………',
  ]);
});

test('PALAMCNG：肛门绝顶二回目·それ以外', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('nowex:31:2', 1);
    f.store.set('cflag:31:227', 1);
  });
  await speak_palamcng_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「不行…再继续的话…我…我的…肛门要…变得奇怪了…啊啊——！」',
    '银黑桃的肛门好几次颤抖着绝顶了、精疲力尽的身体横躺到了一旁。',
    '「啊啊…已经…回不去了…我…已经不行了………」',
  ]);
});

test('PALAMCNG：乳房绝顶二回目·弄乳狂（TALENT:78）RAND==0 分档', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('nowex:31:3', 1);
    f.store.set('cflag:31:228', 1);
    f.store.set('talent:31:78', 1);
  });
  await speak_palamcng_k8(fixture, () => 0);
  assert.deepEqual(fixture.text_lines(), [
    '「啊…啊啊啊…胸部…要去…要去了…啊啊啊…我的胸部…好奇怪啊♡」',
    '「啊嗯…恩…啊啊…胸部要融化了…要融化了…啊啊啊♡」',
    '银黑桃的乳房被刺激着好像快疯了、乳头通红的充着血勃起着，嘴里不停的流着口水。',
    '「啊嗯…啊…啊…啊啊…啊啊…继续…欺负胸部…啊嗯…啊啊啊♡」',
  ]);
});

test('PALAMCNG：处女丧失·主人导致·淫乱且未获反抗刻印写 CFLAG:229', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('tflag:3', 1);
    f.store.set('tflag:20', 1);
  });
  await speak_palamcng_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊嗯…终于成为你的东西了…啊嗯…啊啊…啊…我…想要你的阴茎想要得不得了♡」',
    '银黑桃无视破瓜残留的疼痛，就这样被你贯穿着发出了甜甜的声音。',
    '「这样的话就会…开始咕啾咕啾的侵犯我的小穴…并开始调教吧？」',
  ]);
  assert.equal(fixture.store.get('cflag:31:229'), 1, '处女丧失');
});

test('PALAMCNG：处女丧失·主人以外·それ以外', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tflag:3', 1);
    f.store.set('tflag:20', 0);
  });
  await speak_palamcng_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「嗯啊…这样的话还不如干脆用自己的手…来做就好了………」',
    '银黑桃因为破瓜之痛而带着痛苦的表情嘟囔着………',
  ]);
});

// —— KOJO_MESSAGE_MARKCNG_8（刻印取得口上） ——

async function speak_markcng_k8(fixture) {
  const { kojo_message_markcng_family } =
    fixture.load_module('kojo/kojo-system');
  return kojo_message_markcng_family.call(8);
}

test('MARKCNG：头部守卫 TEQUIP:45（口塞）跳过', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tequip:31:45', 1);
    f.store.set('tflag:22', 3);
  });
  await speak_markcng_k8(fixture);
  assert.deepEqual(fixture.text_lines(), []);
});

test('MARKCNG：助手调教时不跳过（源作守卫注释掉，1:1 保真）', async () => {
  const fixture = await setup_k8((f, ef) => {
    f.store.set('tflag:22', 3);
    ef.assi = 5;
    ef.assiplay = 1;
  });
  await speak_markcng_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…这种痛苦…唔……不、不要…不要啊！」',
    '银黑桃因为超过限度的苦痛而悲鸣着………',
  ]);
});

test('MARKCNG：苦痛刻印Lv3取得 爱慕写 CFLAG:297', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:85', 1);
    f.store.set('tflag:22', 3);
  });
  await speak_markcng_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…你竟然做到了这种程度…唔…啊…啊啊！」',
    '银黑桃因为超过限度的苦痛而悲鸣着………',
  ]);
  assert.equal(fixture.store.get('cflag:31:297'), 1, '苦痛刻印Lv3');
});

test('MARKCNG：快乐刻印Lv3取得 それ以外写 CFLAG:298', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tflag:23', 3);
  });
  await speak_markcng_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…这么舒服…还是第一次…啊啊！不行…再继续被玩弄的话我…已经…啊啊…变得奇怪…回不了头啊！」',
    '银黑桃的身体里被刻下了强烈的快感、漏出了快要融化一样的表情………',
  ]);
  assert.equal(fixture.store.get('cflag:31:298'), 1, '快乐刻印Lv3');
});

test('MARKCNG：屈服刻印Lv3取得写 CFLAG:299（单档，无爱慕分歧）', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tflag:24', 3);
  });
  await speak_markcng_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…我…已经…不会再反抗了…」',
    '「或许这才是我…新的………」',
    '银黑桃完全的屈服了的样子………',
  ]);
  assert.equal(fixture.store.get('cflag:31:299'), 1, '屈服刻印Lv3');
});

test('MARKCNG：反抗刻印Lv3取得 爱慕写 CFLAG:300', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:85', 1);
    f.store.set('tflag:21', 3);
  });
  await speak_markcng_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「为…为什么要这么对我…真的会讨厌你的…呜呜」',
  ]);
  assert.equal(fixture.store.get('cflag:31:300'), 1, '反抗刻印Lv3');
});

// —— SELF_KOJO_K8（事件口上，TFLAG:13 分派） ——

async function speak_self_kojo_k8(fixture, rand, q, s) {
  const { self_kojo_family } = fixture.load_module('kojo/kojo-system');
  return self_kojo_family.call(8, { args: [rand, q, s] });
}

test('SELF_KOJO：调教后自慰 崩坏支写空 CFLAG（TALENT:9）', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tflag:13', 1);
    f.store.set('talent:31:9', 1);
  });
  await speak_self_kojo_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊嗯…嗯啊大人嗯大人………」',
    '银黑桃像坏掉的玩具一样，疯狂的自慰着………',
  ]);
  assert.equal(fixture.store.get('tflag:13'), 0, '末行复位');
});

test('SELF_KOJO：调教后自慰 Q==1 追寻助手残渣（#214 显式传参）', async () => {
  const fixture = await setup_k8((f, ef) => {
    f.store.set('tflag:13', 1);
    join_slave_chara(f, 5, '奴隶5');
    ef.assi = 5;
  });
  await speak_self_kojo_k8(fixture, undefined, 1);
  assert.deepEqual(fixture.text_lines(), [
    '「那个人…还会…来抱我吗…嗯…嗯嗯！」',
    '银黑桃像是在寻求奴隶5的残渣一样，用手指抚摸着秘所………',
  ]);
});

test('SELF_KOJO：调教后自慰 Q==2 追寻野狗幻影', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tflag:13', 1);
  });
  await speak_self_kojo_k8(fixture, undefined, 2);
  assert.deepEqual(fixture.text_lines(), [
    '「啊嗯…忘不了流浪狗大人的阴茎…啊…啊啊啊！」',
    '银黑桃想象被流浪狗侵犯着，疯狂的自慰着………',
  ]);
});

test('SELF_KOJO：调教后自慰 淫乱+处女写 CFLAG:261=4', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tflag:13', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('talent:31:0', 1);
    f.store.set('flag:7', 1);
  });
  await speak_self_kojo_k8(fixture);
  assert.equal(fixture.store.get('cflag:31:261'), 4, '调教后自慰 CFLAG:261');
  assert.ok(
    fixture
      .text_lines()
      .includes('然后银黑桃用手指不停的搅拌着还不知道男性的蜜裂的入口。'),
  );
});

test('SELF_KOJO：百合PLAY 崩坏支写 CFLAG:262=6', async () => {
  const fixture = await setup_k8((f, ef) => {
    f.store.set('tflag:13', 2);
    f.store.set('talent:31:9', 1);
    join_slave_chara(f, 5, '奴隶5');
    ef.assi = 5;
  });
  await speak_self_kojo_k8(fixture);
  assert.equal(fixture.store.get('cflag:31:262'), 6, '百合PLAY CFLAG:262');
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…哇，大人的胸部…哇，大人…人enenenenen——……」',
    '奴隶5和坏掉的银黑桃享受着这颓废的百合play………',
  ]);
});

test('SELF_KOJO：朝口交 それ以外写 CFLAG:263=1', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tflag:13', 3);
    f.store.set('flag:7', 1);
  });
  await speak_self_kojo_k8(fixture);
  assert.equal(fixture.store.get('cflag:31:263'), 1, '朝口交 CFLAG:263');
  assert.deepEqual(fixture.text_lines(), [
    '「嗯啊…总觉得今天早上想要你的呢…所以就稍微偷吃了一下…」',
    '「会好好的全都清理干净的你别在意…嗯…啾…嗯啾…嗯…嗯………」',
    '这么说着的银黑桃的脸上从脸颊到耳朵全都通红通红的………',
  ]);
});

test('SELF_KOJO：调教后性交 V感觉Lv4以上 s>=3 加中出行', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tflag:13', 4);
    f.store.set('abl:31:2', 4);
  });
  await speak_self_kojo_k8(fixture, undefined, undefined, 3);
  assert.ok(
    fixture.text_lines().includes('银黑桃的蜜壶已经被中出了3回，泛起泡沫了。'),
  );
  assert.equal(fixture.store.get('cflag:31:264'), 2, '调教后性交 CFLAG:264');
});

test('SELF_KOJO：调教后性交 V感觉Lv4以上 s<3 不加中出行', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tflag:13', 4);
    f.store.set('abl:31:2', 4);
  });
  await speak_self_kojo_k8(fixture, undefined, undefined, 1);
  assert.ok(
    !fixture.text_lines().some((l) => l.includes('中出了')),
    's<3 不应出现中出补充行',
  );
});

test('SELF_KOJO：调教后性交 それ以外写 CFLAG:264=1（含 s 回分精液）', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tflag:13', 4);
    f.store.set('flag:7', 1);
  });
  await speak_self_kojo_k8(fixture, undefined, undefined, 5);
  assert.ok(
    fixture.text_lines().includes('5回分的精液从银黑桃的股间流了下来………'),
  );
  assert.equal(fixture.store.get('cflag:31:264'), 1, '调教后性交 CFLAG:264');
});

test('SELF_KOJO：经顶层 self_kojo() 分发，s 显式传参一路到达 K8（#214）', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tflag:13', 4);
    f.store.set('abl:31:2', 4);
  });
  const { self_kojo } = fixture.load_module('kojo/kojo-system');
  await self_kojo(undefined, undefined, 7);
  assert.ok(
    fixture.text_lines().includes('银黑桃的蜜壶已经被中出了7回，泛起泡沫了。'),
    's 必须经 self_kojo() 顶层分发一路到达 self_kojo_k8',
  );
});

test('SELF_KOJO：夜袭 已达成且总开关非 2 时外层守卫静默', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tflag:13', 5);
    f.store.set('cflag:31:265', 1);
    f.store.set('flag:7', 1);
  });
  await speak_self_kojo_k8(fixture);
  assert.deepEqual(
    fixture.text_lines(),
    [],
    '外层 CFLAG:265 < 1 守卫应拦下整支',
  );
});

test('SELF_KOJO：夜袭 崩坏支写 CFLAG:265=2', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tflag:13', 5);
    f.store.set('talent:31:9', 1);
    f.store.set('flag:7', 1);
  });
  await speak_self_kojo_k8(fixture);
  assert.equal(fixture.store.get('cflag:31:265'), 2, '夜袭 CFLAG:265');
  assert.ok(fixture.text_lines().includes('「啊…啊…啊啊…想变成小穴…小穴………」'));
});

test('SELF_KOJO：卖却 それ以外 + 非扶她尾调 SELL_MATURO_K0', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tflag:13', 6);
    f.store.set('talent:31:122', 0);
  });
  await speak_self_kojo_k8(fixture);
  const lines = fixture.text_lines();
  assert.ok(lines.includes('「我的结局就是这样什么的…骗…骗人吧………」'));
  assert.ok(
    lines.some((l) => l.includes('SELL_MATURO_K0')),
    '非扶她应尾调存根 SELL_MATURO_K0',
  );
});

test('SELF_KOJO：卖却 扶她（TALENT:122==1）不调 SELL_MATURO_K0', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tflag:13', 6);
    f.store.set('talent:31:122', 1);
  });
  await speak_self_kojo_k8(fixture);
  assert.ok(
    !fixture.text_lines().some((l) => l.includes('SELL_MATURO_K0')),
    '扶她应跳过 SELL_MATURO_K0',
  );
});

test('SELF_KOJO：妊娠发觉 首次+父親主人爱持ち写 CFLAG:271=1', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tflag:13', 11);
    f.store.set('talent:31:85', 1);
    f.store.set('cflag:31:102', 1);
  });
  await speak_self_kojo_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「呐、今天有令人高兴的报告…看起来我好像有你的孩子了、我绝对要生下来呢………♡」',
    '银黑桃得意洋洋的吧妊娠的消息报告给了你………',
  ]);
  assert.equal(fixture.store.get('cflag:31:271'), 1, '妊娠发觉 CFLAG:271');
});

test('SELF_KOJO：妊娠发觉 二次通知与首次内容 1:1 重复（源作如此）', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tflag:13', 11);
    f.store.set('talent:31:85', 1);
    f.store.set('cflag:31:102', 1);
    f.store.set('cflag:31:271', 1); // 已发觉过
  });
  await speak_self_kojo_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「呐、今天有令人高兴的报告…看起来我好像有你的孩子了、我绝对要生下来呢………♡」',
    '银黑桃得意洋洋的吧妊娠的消息报告给了你………',
  ]);
});

test('SELF_KOJO：生产 首次それ以外写 CFLAG:272=1', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tflag:13', 12);
  });
  await speak_self_kojo_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「总觉得很不可思议…就算是这种孩子也舍不得扔掉呢」',
    '银黑桃抱起了孩子，开始哄着他………',
  ]);
  assert.equal(fixture.store.get('cflag:31:272'), 1, '生产 CFLAG:272');
});

test('SELF_KOJO：生产 已生产分支源作误写缺失开头引号（1:1 保真）', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tflag:13', 12);
    f.store.set('cflag:31:272', 1); // 已生产过
  });
  await speak_self_kojo_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '总觉得很不可思议…就算是这样也舍不得扔掉这个孩子呢」',
    '银黑桃抱起了孩子，开始哄着他………',
  ]);
});

test('SELF_KOJO：育儿室 妊娠中支写 CFLAG:273=1', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tflag:13', 13);
    f.store.set('talent:31:85', 1);
    f.store.set('talent:31:153', 1);
  });
  await speak_self_kojo_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「呵呵呵、马上就要生下来了、到底是个怎么样的孩子呢，真期待啊♪」',
    '银黑桃抚摸着因为临月而膨胀起来的肚子………',
  ]);
  assert.equal(fixture.store.get('cflag:31:273'), 1, '育儿室 CFLAG:273');
});

test('SELF_KOJO：亲离 陥落済写 CFLAG:274=1', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tflag:13', 14);
    f.store.set('talent:31:76', 1);
  });
  await speak_self_kojo_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「因为是我的孩子、不管去哪里、一定、一定没事的」',
  ]);
  assert.equal(fixture.store.get('cflag:31:274'), 1, '亲离 CFLAG:274');
});

test('SELF_KOJO：死亡 两支均为空行（源作未填写，1:1 保真）', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tflag:13', 999);
    f.store.set('talent:31:85', 1);
  });
  await speak_self_kojo_k8(fixture);
  assert.deepEqual(fixture.text_lines(), ['']);
});

test('SELF_KOJO：寿命消灭 それ以外支也为空行', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('tflag:13', 998);
  });
  await speak_self_kojo_k8(fixture);
  assert.deepEqual(fixture.text_lines(), ['']);
});

// —— 迷宫四函数（DUNGEON_RYOUZYOKU / _AFTER / VICTORY / ATTACK） ——

async function call_dungeon(fixture, family_name, module_path, args = []) {
  const family = fixture.load_module(module_path)[family_name];
  return family.call(8, { args });
}

test('DUNGEON_RYOUZYOKU：处女支心声提处女被夺', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:0', 1);
  });
  await call_dungeon(
    fixture,
    'ryouzyoku_kojo_family',
    'kojo/kojo-dungeon-ravish',
  );
  assert.deepEqual(fixture.text_lines(), [
    '「咕…是我输了…你想怎么样就怎么样吧………」',
    '（找个破绽…想办法逃出去…！处女被夺走这种事怎么说都行…！）',
    '虽然输了，但是银黑桃的眼神还没有放弃………',
  ]);
});

test('DUNGEON_RYOUZYOKU：非处女支心声只剩逃跑', async () => {
  const fixture = await setup_k8();
  await call_dungeon(
    fixture,
    'ryouzyoku_kojo_family',
    'kojo/kojo-dungeon-ravish',
  );
  assert.deepEqual(fixture.text_lines(), [
    '「咕…是我输了…你想怎么样就怎么样吧………」',
    '（找个破绽…想办法逃出去…！）',
    '虽然输了，但是银黑桃的眼神还没有放弃………',
  ]);
});

test('DUNGEON_RYOUZYOKU_AFTER：处女支三档 EXP 全不过门槛只出两行', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:0', 1);
  });
  await call_dungeon(
    fixture,
    'ryouzyoku_after_kojo_family',
    'kojo/kojo-dungeon-ravish',
  );
  assert.deepEqual(fixture.text_lines(), [
    '（啊啊…明明还是处女呢…）',
    '「已经…完了…吧…」',
  ]);
});

test('DUNGEON_RYOUZYOKU_AFTER：处女支三档 EXP 全过门槛（无膣档）', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:0', 1);
    f.store.set('exp:31:0', 99); // 膣：处女支不读
    f.store.set('exp:31:1', 21);
    f.store.set('exp:31:22', 21);
    f.store.set('exp:31:20', 21);
  });
  await call_dungeon(
    fixture,
    'ryouzyoku_after_kojo_family',
    'kojo/kojo-dungeon-ravish',
  );
  assert.deepEqual(fixture.text_lines(), [
    '（啊啊…明明还是处女呢…）',
    '「已经…完了…吧…」',
    '银黑桃的肛门里，不只是粘液还是精液的东西溢了出来。',
    '「啊啊…屁股…已经什么都感觉不到了…嗯…嗯咕………」',
    '毫无休息的口交的银黑桃的脸上沾满了粘液和精液。',
    '「咳咳咳…呜啊…我、我已经不想再喝精液了…饶了我吧………」',
    '「啊、嗯、嗯、你们的精液又浓又臭…啊啊…比人类的男性的更好吃…嗯嗯嗯………」',
    '银黑桃被强迫说着关于精液味道的感想………',
  ]);
});

test('DUNGEON_RYOUZYOKU_AFTER：非处女支四档 EXP 全不过门槛只出一行', async () => {
  const fixture = await setup_k8();
  await call_dungeon(
    fixture,
    'ryouzyoku_after_kojo_family',
    'kojo/kojo-dungeon-ravish',
  );
  assert.deepEqual(
    fixture.text_lines(),
    ['「啊啊…被弄得乱七八糟了…啊、啊啊啊啊………」'],
    '非处女四档 EXP 全为 0 时只出开场一行',
  );
});

test('DUNGEON_RYOUZYOKU_AFTER：非处女支多膣档，且精液味档源作多打一行孤立开引号（1:1 保真）', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('exp:31:0', 21);
    f.store.set('exp:31:20', 21);
  });
  await call_dungeon(
    fixture,
    'ryouzyoku_after_kojo_family',
    'kojo/kojo-dungeon-ravish',
  );
  assert.deepEqual(
    fixture.text_lines(),
    [
      '「啊啊…被弄得乱七八糟了…啊、啊啊啊啊………」',
      '「我的小穴里咕噜咕噜的…啊…啊啊………」',
      '银黑桃已经合不上的蜜裂里，不知识粘液还是精液的东西大量的溢了出来。',
      '「',
      '「啊、嗯、嗯、你们的精液又浓又臭…啊啊…比人类的男性的更好吃…嗯嗯嗯………」',
      '银黑桃被强迫说着关于精液味道的感想………',
    ],
    '非处女精液味档 源作多打一行孤立开引号',
  );
});

test('DUNGEON_VICTORY：RAND:3==0 决胜台词 + 残血险胜', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('base:31:0', 10);
    f.store.set('maxbase:31:0', 100);
    f.store.set('base:31:1', 100);
    f.store.set('maxbase:31:1', 100);
  });
  await call_dungeon(fixture, 'dungeon_victory_family', 'kojo/kojo-system', [
    () => 0,
  ]);
  assert.deepEqual(fixture.text_lines(), [
    '「哼、没有会输的要素、这是理所当然的结果」',
    '（稍微有些得意忘形了吧…不快点休息一下的话…）',
    '银黑桃气喘吁吁的………',
  ]);
});

test('DUNGEON_VICTORY：RAND 全非零走「又砍了无聊的东西」+ 余裕支', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('base:31:0', 100);
    f.store.set('maxbase:31:0', 100);
    f.store.set('base:31:1', 100);
    f.store.set('maxbase:31:1', 100);
  });
  await call_dungeon(fixture, 'dungeon_victory_family', 'kojo/kojo-system', [
    () => 1,
  ]);
  assert.deepEqual(fixture.text_lines(), [
    '「又砍了无聊的东西」',
    '「那么、今天不如再前进一点吧」',
    '银黑桃蹦蹦跳跳的向迷宫深处迈开了步子………',
  ]);
});

test('DUNGEON_ATTACK：侵攻中（CFLAG:1 == 2）与迎击中各走各的三选一', async () => {
  const invading = await setup_k8((f) => {
    f.store.set('cflag:31:1', 2);
  });
  await call_dungeon(invading, 'dungeon_attack_family', 'kojo/kojo-system', [
    () => 0,
  ]);
  assert.deepEqual(
    invading.text_lines(),
    ['「到处都是空隙呢」'],
    '侵攻中 CFLAG:1 == 2',
  );

  const defending = await setup_k8();
  await call_dungeon(defending, 'dungeon_attack_family', 'kojo/kojo-system', [
    () => 0,
  ]);
  assert.deepEqual(
    defending.text_lines(),
    ['「呵呵呵、你也成为我们的同伴吧♪」'],
    '迎击中（CFLAG:1 非 2）',
  );
});

// —— BENKI_KOUJO_K8（肉便器口上，FLAG:62 六档 × 四选一） ——

async function speak_benki_k8(fixture) {
  const { benki_koujo_family } = fixture.load_module('kojo/kojo-system');
  return benki_koujo_family.call(8, { args: [] });
}

test('BENKI：FLAG:62==0 四选一逐档（淫乱/爱慕/侍奉Lv5/それ以外）', async () => {
  const inran = await setup_k8((f) => {
    f.store.set('flag:62', 0);
    f.store.set('talent:31:76', 1);
  });
  await speak_benki_k8(inran);
  assert.deepEqual(
    inran.text_lines(),
    ['「请快点给我更多阴茎！啊…啊啊…啊嗯啊啊啊啊♡」'],
    'FLAG:62==0 淫乱',
  );

  const aibo = await setup_k8((f) => {
    f.store.set('flag:62', 0);
    f.store.set('talent:31:85', 1);
  });
  await speak_benki_k8(aibo);
  assert.deepEqual(
    aibo.text_lines(),
    ['「啊啊…我是魔王大人的…嗯…快、快停下…嗯…啊啊啊——！」'],
    'FLAG:62==0 爱慕',
  );

  const shifu = await setup_k8((f) => {
    f.store.set('flag:62', 0);
    f.store.set('abl:31:16', 5);
  });
  await speak_benki_k8(shifu);
  assert.deepEqual(
    shifu.text_lines(),
    ['「请、请让我服侍大家的阴茎…嗯…嗯咕！？」'],
    'FLAG:62==0 侍奉精神Lv5以上',
  );

  const other = await setup_k8((f) => {
    f.store.set('flag:62', 0);
  });
  await speak_benki_k8(other);
  assert.deepEqual(
    other.text_lines(),
    ['「呀！不要碰我！好脏…啊啊！不、不要…啊啊——！」'],
    'FLAG:62==0 それ以外',
  );
});

test('BENKI：FLAG:62==1 爱慕支两行（第二行带角色名）', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('flag:62', 1);
    f.store.set('talent:31:85', 1);
  });
  await speak_benki_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊…被弄得这么脏的话、会再也见不到那个人了吧………」',
    '面对银黑桃的叹息，周围的女魔族冷冷的笑着………',
  ]);
});

test('BENKI：FLAG:62==2 獣姦档それ以外', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('flag:62', 2);
  });
  await speak_benki_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「不要…不要…竟然被野兽侵犯什么的…嗯咕！嗯！还、还射在里面…啊啊！还这么大！」',
  ]);
});

test('BENKI：FLAG:62==3 侍奉支源作句末多打一个引号（1:1 保真）', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('flag:62', 3);
    f.store.set('abl:31:16', 5);
  });
  await speak_benki_k8(fixture);
  assert.deepEqual(
    fixture.text_lines(),
    ['「啊嗯…恩…啊啊…我没有2个小穴，所以请按照顺序来侵犯…啊…啊嗯啊」」'],
    'A+V 侍奉支 源作句末多打一个引号',
  );
});

test('BENKI：FLAG:62==4 淫乱支两处爱心', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('flag:62', 4);
    f.store.set('talent:31:76', 1);
  });
  await speak_benki_k8(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊嗯…啊嗯啊♡ 继续侵犯我的小穴…满满的射出精液吧…♡」',
  ]);
});

test('BENKI：FLAG:62==5 侍奉支；FLAG:62 越界（6）整段静默', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('flag:62', 5);
    f.store.set('abl:31:16', 5);
  });
  await speak_benki_k8(fixture);
  assert.deepEqual(
    fixture.text_lines(),
    ['「嗯…呀…我是最喜欢肛门的变态便器…啊啊啊…」'],
    'FLAG:62==5 侍奉精神Lv5以上',
  );

  const oob = await setup_k8((f) => {
    f.store.set('flag:62', 6);
    f.store.set('talent:31:76', 1);
  });
  await speak_benki_k8(oob);
  assert.deepEqual(oob.text_lines(), [], 'FLAG:62 越界时六档全不命中');
});

// —— NTR_KOUJO_K8（NTR 口上，P 1-7 / 20） ——

async function speak_ntr_k8(fixture, p) {
  const { ntr_koujo_family } = fixture.load_module('kojo/kojo-system');
  return ntr_koujo_family.call(8, { args: [p] });
}

test('NTR：入口无条件补 CFLAG:650（NTR 再捕获位）', async () => {
  const fixture = await setup_k8();
  await speak_ntr_k8(fixture, 0);
  assert.equal(fixture.store.get('cflag:31:650'), 1, 'NTR 再捕获 CFLAG:650');
  assert.deepEqual(fixture.text_lines(), [], 'P 不在 1-7/20 内时整段静默');
});

test('NTR：P==1 陥落済支走巨根（FLAG:500==0），记 CFLAG:651', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('flag:500', 0);
  });
  await speak_ntr_k8(fixture, 1);
  assert.deepEqual(fixture.text_lines(), [
    '「狂王…我不能把我的处女给你…咕…呜…不、不要…我已经找到了新的主君了…」',
    '说着强气的台词的银黑桃被狂王捆住，束缚着自由、两只脚被大大的分开着。',
    '然后、狂王的巨根',
    '慢慢的插进了银黑桃的秘裂。在镜头下银黑桃还不知道男人的蜜壶被插进了深处。',
    '从蜜裂留到屁股上的破瓜之血。在屈辱和疼痛下，即使是刚强的银黑桃也只能流下眼泪。',
    '「对不起…对不起………」',
  ]);
  assert.equal(fixture.store.get('cflag:31:651'), 1, 'NTR_651 CFLAG:651');
});

test('NTR：P==1 それ以外支且 FLAG:500==1 走按摩棒', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('flag:500', 1);
  });
  await speak_ntr_k8(fixture, 1);
  assert.deepEqual(
    fixture.text_lines().slice(0, 3),
    [
      '还是处女的银黑桃的秘裂被',
      '特大号的按摩棒',
      '深深的插了进去。破瓜之血从秘裂里流了出来。',
    ],
    'FLAG:500==1 走按摩棒',
  );
});

test('NTR：P==2 陥落済支六行 + CFLAG:652', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:85', 1);
    f.store.set('flag:500', 2); // 0·2 同为扶她
  });
  await speak_ntr_k8(fixture, 2);
  assert.deepEqual(fixture.text_lines(), [
    '「呵呵呵、我才不会…嗯…啊嗯…因为这点程度就屈服…啊…啊啊！」',
    '狂王从后边把银黑桃绑起来，从后面有条不紊的插进了肛门。',
    '大概是好几次灌肠和扩张的原因，银黑桃通红的充着血的肛门缠了回去。',
    '「啊…嗯、太大了…这、这个…啊啊…啊…啊啊啊——！」',
    '狂王的巨根',
    '在银黑桃的肛门里转动着、银黑桃露出了喘息的声音………',
  ]);
  assert.equal(fixture.store.get('cflag:31:652'), 1, 'NTR_652 CFLAG:652');
});

test('NTR：P==3 兽奸秀 TALENT:136 优先于淫乱/爱慕', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('talent:31:136', 1);
    f.store.set('talent:31:76', 1); // 同时置位，136 必须先命中
  });
  await speak_ntr_k8(fixture, 3);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊——♡ 被野狗大人侵犯最棒了…啊嗯…啊…啊啊——♡」',
    '银黑桃一边被周围的观众嘲笑着、一边沉浸在被狗侵犯的快感里………',
  ]);
  assert.equal(fixture.store.get('cflag:31:653'), 1, 'NTR_653 CFLAG:653');
});

test('NTR：P==4 それ以外支末行源作无省略号（1:1 保真）', async () => {
  const fixture = await setup_k8((f) => {
    f.store.set('flag:500', 0);
  });
  await speak_ntr_k8(fixture, 4);
  const lines = fixture.text_lines();
  assert.equal(
    lines[lines.length - 1],
    '水晶球录下了好几个银黑桃被狂王抱着不停绝顶的画面',
    'P==4 それ以外末行源作无省略号',
  );
  assert.equal(fixture.store.get('cflag:31:654'), 1, 'NTR_654 CFLAG:654');
});

test('NTR：P==5 それ以外支只判 FLAG:500 == 0（扶她的 2 走假阳具，1:1 保真）', async () => {
  const zero = await setup_k8((f) => {
    f.store.set('flag:500', 0);
  });
  await speak_ntr_k8(zero, 5);
  assert.deepEqual(zero.text_lines(), [
    '「啊啊…好舒服啊…给我…给我更多阴茎！啊啊…嗯…好深…好棒♪」',
    '银黑桃的蜜裂和肛门被',
    '阴茎搅动着、精液不停的溢了出来………',
  ]);
  assert.equal(zero.store.get('cflag:31:655'), 1, 'NTR_655 CFLAG:655');

  const two = await setup_k8((f) => {
    f.store.set('flag:500', 2);
  });
  await speak_ntr_k8(two, 5);
  assert.equal(
    two.text_lines()[2],
    '假阳具搅动着、爱液不停的溢了出来………',
    'FLAG:500==2 在本支走假阳具（与同函数其余各处的 0 或 2 判定不同）',
  );
});

test('NTR：P==6 / P==7 各记一位', async () => {
  const p6 = await setup_k8();
  await speak_ntr_k8(p6, 6);
  assert.deepEqual(p6.text_lines(), [
    '「啊嗯…更多的使用作为便所的我把…现在免费使用小穴也可以…啊嗯啊嗯♪」',
    '银黑桃凭空动着腰诱惑着其他男人。看到这里的男人们一边嘲笑着银黑桃一边聚集了起来………',
  ]);
  assert.equal(p6.store.get('cflag:31:656'), 1, 'NTR_656 CFLAG:656');

  const p7 = await setup_k8((f) => {
    f.store.set('talent:31:76', 1);
  });
  await speak_ntr_k8(p7, 7);
  assert.equal(p7.store.get('cflag:31:657'), 1, 'NTR_657 CFLAG:657');
});

test('NTR：P==20 公开生产按 CFLAG:102 分岔，且本支不记位', async () => {
  const master_child = await setup_k8((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:102', 1); // 妊娠相手 = 主人
  });
  await speak_ntr_k8(master_child, 20);
  assert.deepEqual(master_child.text_lines(), [
    '「啊啊…让我抱抱我的孩子…求你了…啊啊啊…」',
    '银黑桃生出来的你的孩子被观众们包围着。',
    '被还回来的时候不可能还是正常的状态吧………',
  ]);
  assert.equal(
    master_child.store.get('cflag:31:658'),
    undefined,
    'P==20 源作不记位',
  );

  const other = await setup_k8((f) => {
    f.store.set('talent:31:76', 1);
  });
  await speak_ntr_k8(other, 20);
  assert.deepEqual(other.text_lines(), [
    '「啊嗯…恩…嗯…我的出产秀怎么样魔王大人、看得高兴吗？」',
    '银黑桃一边隔着摄像机看着你一边说着。',
    '「今后也会生下很多小宝宝的…敬请期待♡」',
  ]);
});

// —— 结局/处刑六函数（EXUCUTION / MUSEUM / BANISHMENT / PUBLIC_EXUCUTION /
//    GROTESQUE / ENTERENEMY） ——

async function speak_family_k8(fixture, family_name, args = []) {
  const family = fixture.load_module('kojo/kojo-system')[family_name];
  return family.call(8, { args });
}

test('EXUCUTION：TFLAG:16 四档，第 7 档源作未填只出空行；档外静默', async () => {
  const benki = await setup_k8((f) => {
    f.store.set('tflag:16', 4);
  });
  await speak_family_k8(benki, 'exucution_koujo_family');
  assert.deepEqual(
    benki.text_lines(),
    [
      '「怎么这样…我一生都要不停的给怪物生孩子什么的…啊…不要，放开我…啊啊啊啊啊啊啊！」',
    ],
    'TFLAG:16==4 肉便器刑',
  );

  const senuin = await setup_k8((f) => {
    f.store.set('tflag:16', 5);
  });
  await speak_family_k8(senuin, 'exucution_koujo_family');
  assert.deepEqual(
    senuin.text_lines(),
    ['「什么都好…命令…为了…主人大人………」'],
    'TFLAG:16==5 战斗员化',
  );

  const erase = await setup_k8((f) => {
    f.store.set('tflag:16', 7);
  });
  await speak_family_k8(erase, 'exucution_koujo_family');
  assert.deepEqual(erase.text_lines(), [''], 'TFLAG:16==7 源作未填台词');

  const oob = await setup_k8((f) => {
    f.store.set('tflag:16', 3);
  });
  await speak_family_k8(oob, 'exucution_koujo_family');
  assert.deepEqual(oob.text_lines(), [], 'TFLAG:16 档外静默');
});

test('MUSEUM：TFLAG:500 石化/剥制有词，蜡人形档值是 21（非 2）', async () => {
  const stone = await setup_k8((f) => {
    f.store.set('tflag:500', 0);
  });
  await speak_family_k8(stone, 'museum_koujo_family');
  assert.deepEqual(stone.text_lines(), [
    '「啊啊…我、我的身体…变得越来越冷了…啊…啊啊…不要…不………要…………」',
  ]);

  const stuffed = await setup_k8((f) => {
    f.store.set('tflag:500', 1);
  });
  await speak_family_k8(stuffed, 'museum_koujo_family');
  assert.deepEqual(stuffed.text_lines(), [
    '「死了之后还一直暴露着…呜…呜呜呜………」',
  ]);

  const wax = await setup_k8((f) => {
    f.store.set('tflag:500', 21);
  });
  await speak_family_k8(wax, 'museum_koujo_family');
  assert.deepEqual(wax.text_lines(), [''], '蝋人形化档值 21（源作如此）');

  const two = await setup_k8((f) => {
    f.store.set('tflag:500', 2);
  });
  await speak_family_k8(two, 'museum_koujo_family');
  assert.deepEqual(
    two.text_lines(),
    [],
    'TFLAG:500==2 无对应档（21 不是笔误）',
  );
});

test('BANISHMENT：TFLAG:510 追放有词，其余四档空行', async () => {
  const banish = await setup_k8((f) => {
    f.store.set('tflag:510', 0);
  });
  await speak_family_k8(banish, 'banishment_koujo_family');
  assert.deepEqual(banish.text_lines(), [
    '「这样就自由了…但是、失去力量的我的存在价值………」',
  ]);

  const male = await setup_k8((f) => {
    f.store.set('tflag:510', 1);
  });
  await speak_family_k8(male, 'banishment_koujo_family');
  assert.deepEqual(male.text_lines(), [''], 'TFLAG:510==1 源作未填台词');
});

test('PUBLIC_EXUCUTION：TFLAG:520 三档（0/1 有词，2 空行）', async () => {
  const ryou = await setup_k8((f) => {
    f.store.set('tflag:520', 0);
  });
  await speak_family_k8(ryou, 'public_exucution_koujo_family');
  assert.deepEqual(ryou.text_lines(), [
    '「那个烙印是…啊…停、停下快停下…呀…啊…啊呀啊啊啊啊啊啊啊啊！」',
  ]);

  const hang = await setup_k8((f) => {
    f.store.set('tflag:520', 1);
  });
  await speak_family_k8(hang, 'public_exucution_koujo_family');
  assert.deepEqual(hang.text_lines(), [
    '「能不能至少给我套个皮革袋子、我不想漏出可怜的死相…呜…呜呜呜呜………」',
  ]);

  const soul = await setup_k8((f) => {
    f.store.set('tflag:520', 2);
  });
  await speak_family_k8(soul, 'public_exucution_koujo_family');
  assert.deepEqual(soul.text_lines(), [''], 'TFLAG:520==2 源作未填台词');
});

test('GROTESQUE：TFLAG:530 七档源作全未填，逐档只出空行；档外静默', async () => {
  for (const lv of [0, 1, 2, 3, 4, 5, 6]) {
    const fixture = await setup_k8((f) => {
      f.store.set('tflag:530', lv);
    });
    await speak_family_k8(fixture, 'grotesque_koujo_family');
    assert.deepEqual(
      fixture.text_lines(),
      [''],
      `TFLAG:530==${lv} 源作未填台词，只出空行`,
    );
  }

  const oob = await setup_k8((f) => {
    f.store.set('tflag:530', 7);
  });
  await speak_family_k8(oob, 'grotesque_koujo_family');
  assert.deepEqual(oob.text_lines(), [], 'TFLAG:530==7 档外静默');
});

test('ENTERENEMY：淫乱 → 爱慕 → それ以外 三选一', async () => {
  const inran = await setup_k8((f) => {
    f.store.set('talent:31:76', 1);
  });
  await speak_family_k8(inran, 'enterenemy_koujo_family');
  assert.deepEqual(inran.text_lines(), [
    '「想看我被怪物轮奸什么的，魔王大人的趣味还真令人困扰啊♡」',
  ]);

  const aibo = await setup_k8((f) => {
    f.store.set('talent:31:85', 1);
  });
  await speak_family_k8(aibo, 'enterenemy_koujo_family');
  assert.deepEqual(aibo.text_lines(), ['「现在…就去见你魔王大人♪」']);

  const other = await setup_k8();
  await speak_family_k8(other, 'enterenemy_koujo_family');
  assert.deepEqual(other.text_lines(), [
    '「还真是好久没有只身一人潜入迷宫了呢」',
  ]);
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
