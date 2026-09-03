/**
 * ere/kojo/kojo-k12-intellectual.js 的行为测试（issue #243：J33 口上·K12 知的）。
 *
 * 缝 = test/helpers/era-fixture.js。世界底座：智慧（性格素质 172 →
 * GET_KOJO_NUM = 112 → 分发 key 12）。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_chara_0, join_slave_chara } = require('./helpers/chara');

// 世界底座：智慧（素质 172 → GET_KOJO_NUM = 112 → 分发 key 12）入列调教
async function setup_k12(seed, selectcom = 0) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 20, '智慧');
  fixture.era.beginTrain(0, 20);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 20;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = selectcom;
  fixture.store.set('talent:20:172', 1); // 智慧 → GET_KOJO_NUM = 112
  fixture.store.set('flag:112', 1); // K12 存在标志
  fixture.store.set('flag:7', 2); // 口上总开关默认
  if (seed) {
    seed(fixture, era_flag);
  }
  fixture.load_module('kojo/kojo-system');
  fixture.load_module('kojo/kojo-k12-intellectual');
  return fixture;
}

// —— @EVENTTRAIN：存在标志一对 ——

test('@EVENTTRAIN #PRI 置存在标志、@EVENTEND #LATER 清 0（K12 一对）', async () => {
  const fixture = await setup_k12((f) => {
    f.store.delete('flag:112');
    f.store.set('cflag:20:201', 9); // 越过 EVENTTRAIN 前段状态机
  });

  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(fixture.store.get('flag:112'), 1); // K12 存在标志
  assert.equal(fixture.store.get('flag:7'), 2); // 总开关随之默认开
  await emit('EVENTEND');
  assert.equal(fixture.store.get('flag:112'), 0);
});

test('@EVENTTRAIN #PRI 口上开关补 0（FLAG:7 从 0 补到 2）', async () => {
  const fixture = await setup_k12((f) => {
    f.store.set('flag:7', 0);
    f.store.set('cflag:20:201', 9); // 越过状态机
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(fixture.store.get('flag:7'), 2);
});

test('EVENTTRAIN 自身守卫①口上开关<=0（玩家显式关掉）静默跳过', async () => {
  const fixture = await setup_k12((f) => {
    f.store.set('flag:7', -1);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), []);
  assert.equal(fixture.store.get('cflag:20:201'), undefined);
});

test('EVENTTRAIN 自身守卫②TALENT:172!=1 静默跳过', async () => {
  const fixture = await setup_k12((f) => f.store.set('talent:20:172', 0));
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), []);
  assert.equal(fixture.store.get('cflag:20:201'), undefined);
});

// —— @EVENTTRAIN：初調教 CFLAG:201 状态机 ——

test('初调教（CFLAG:201==0）人狼分档（TALENT:种族==2）：CFLAG:201=1', async () => {
  const fixture = await setup_k12((f) => f.store.set('talent:20:种族', 2));

  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), [
    '「就表扬你一下吧。这是超出了我预想的力量」',
    '「但是没用的哦。我作为自豪的人狼、还拥有最高的智能……」',
    '智慧虽然带着清爽的表情逞强着、但轻飘飘的耳朵害怕的低了下来。',
  ]);
  assert.equal(fixture.store.get('cflag:20:201'), 1);
});

test('初调教（CFLAG:201==0）非人狼分档：CFLAG:201=1', async () => {
  const fixture = await setup_k12((f) => f.store.set('talent:20:种族', 1));

  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), [
    '「看起来你比我更厉害呢」',
    '「但我可是接受过特殊训练的。不管对我做什么都是没用的」',
    '智慧表情冷淡强装镇定、声音微微发颤',
  ]);
  assert.equal(fixture.store.get('cflag:20:201'), 1);
});

test('NTR 再捕获（CFLAG:201>=1 && CFLAG:650==1）爱慕侧：解 NTR 标志', async () => {
  const fixture = await setup_k12((f) => {
    f.store.set('cflag:20:201', 1);
    f.store.set('cflag:20:650', 1);
    f.store.set('talent:20:85', 1);
  });

  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), [
    '「对不住了呢……在其他人的身体上做了活塞运动的确是事实呢」',
    '「但是从生物学上看这并没有什么问题、只是感情上的问题哦、所以原谅我吧」',
    '智慧低着头小声辩解道',
  ]);
  assert.equal(fixture.store.get('cflag:20:650'), 0);
});

test('NTR 再捕获（CFLAG:201>=1 && CFLAG:650==1）非爱慕侧：解 NTR 标志', async () => {
  const fixture = await setup_k12((f) => {
    f.store.set('cflag:20:201', 1);
    f.store.set('cflag:20:650', 1);
    f.store.set('talent:20:85', 0);
    f.store.set('talent:20:76', 0);
  });

  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), [
    '「又被抓住了呢……我的运气真不好」',
    '「是要继续调教我吗？　还是当成肉便器处理？　随便你吧」',
    '智慧冷冷的看着你',
  ]);
  assert.equal(fixture.store.get('cflag:20:650'), 0);
});

test('屈服刻印 Lv1（CFLAG:201<2 && MARK:2==1）：推进到 2', async () => {
  const fixture = await setup_k12((f) => {
    f.store.set('cflag:20:201', 1);
    f.store.set('mark:20:2', 1);
  });

  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), [
    '「看起来你的能力好像比资料上要高呢……」',
  ]);
  assert.equal(fixture.store.get('cflag:20:201'), 2);
});

test('屈服刻印 Lv2（CFLAG:201<3 && MARK:2==2）：推进到 3', async () => {
  const fixture = await setup_k12((f) => {
    f.store.set('cflag:20:201', 2);
    f.store.set('mark:20:2', 2);
  });

  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), [
    '「你到底是……何方神圣、能把我逼到这种地步……」',
  ]);
  assert.equal(fixture.store.get('cflag:20:201'), 3);
});

test('屈服刻印 Lv3（CFLAG:201<4 && MARK:2==3 && 爱无）：推进到 4', async () => {
  const fixture = await setup_k12((f) => {
    f.store.set('cflag:20:201', 3);
    f.store.set('mark:20:2', 3);
    f.store.set('talent:20:85', 0);
  });

  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), [
    '「难以置信……这样的情况、不管是数据还是资料上都从未见过呢！？」',
  ]);
  assert.equal(fixture.store.get('cflag:20:201'), 4);
});

test('淫乱（CFLAG:201<5 && TALENT:76==1 && 爱无）：推进到 5', async () => {
  const fixture = await setup_k12((f) => {
    f.store.set('cflag:20:201', 4);
    f.store.set('talent:20:76', 1);
    f.store.set('talent:20:85', 0);
  });

  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), [
    '「竟然还存在着如此美妙的新世界……让我更多地对此进行研究吧、拜托了！」',
    '「想尝试一下、我的身体能淫靡化到什么地步……已经、睡不着了！」',
    '智慧一边流着口水一边用腰蹭着你的腿',
    '她的脑海中已经填满了对性知识的渴求了……',
  ]);
  assert.equal(fixture.store.get('cflag:20:201'), 5);
});

test('爱慕（CFLAG:201<6 && TALENT:85==1）：推进到 6', async () => {
  const fixture = await setup_k12((f) => {
    f.store.set('cflag:20:201', 5);
    f.store.set('talent:20:85', 1);
  });

  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), [
    '「竟然还存在着如此美妙的新世界……拜托了！　让我和你一起来研究吧」',
    '「魔界的动植物和文化、魔法……全都是我还不懂的东西呢」',
    '进入房间的智慧正专心致志地在笔记本上写着什么',
    '完全被魔之知识迷住了的样子……',
  ]);
  assert.equal(fixture.store.get('cflag:20:201'), 6);
});

// —— @K12_KOJO2：二回目以降 ——

test('K12_KOJO2 反抗刻印 Lv3（MARK:3==3）：进入视线的拒绝', async () => {
  const fixture = await setup_k12((f) => {
    f.store.set('cflag:20:201', 9); // 越过前段状态机
    f.store.set('mark:20:3', 3);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.deepEqual(fixture.text_lines(), [
    '「不要再进入我的视线里……我很不高兴」',
  ]);
});

test('K12_KOJO2 淫乱（TALENT:76==1）rand=0 分档', async () => {
  const fixture = await setup_k12((f) => {
    f.store.set('cflag:20:201', 9);
    f.store.set('talent:20:76', 1);
    f.store.set('talent:20:85', 0);
    f.store.set('talent:20:种族', 2);
  });
  // 直接驱动 k12_kojo2（rand 固定 0 → rand_n(3)==0 第一支）
  const mod = fixture.load_module('kojo/kojo-k12-intellectual');
  await mod.k12_kojo2(() => 0);
  assert.deepEqual(fixture.text_lines(), [
    '「今天要研究什么Play呢、好期待啊♪」',
    '智慧像狗一样伸出舌头，吐出慌乱的吐息迎接了出来。',
  ]);
});

test('K12_KOJO2 爱慕（TALENT:85==1）rand=1（rand_n(3)=1 → 第二支）', async () => {
  const fixture = await setup_k12((f) => {
    f.store.set('cflag:20:201', 9);
    f.store.set('talent:20:85', 1);
    f.store.set('talent:20:76', 0);
    f.store.set('talent:20:种族', 1);
  });
  const mod = fixture.load_module('kojo/kojo-k12-intellectual');
  // rand_n(3): 用 n=>Math.floor(n*0.4)? 不确定，直接驱动使第二支命中：
  // rand_n(3)=1 需 rand 返回 3..5 区间——用一个只在 n>=3 返回 1 的函数不方便；
  // 这里固定 rand = (n)=>Math.floor(n/3)（3→1,2→0）。爱慕第一层 rand_n(3)：floor(3/3)=1 中第二支。
  await mod.k12_kojo2((n) => Math.floor(n / 3));
  assert.deepEqual(fixture.text_lines(), [
    '「今天的研究进展很大。好想被表扬呢」',
    '智慧从研究中的桌子旁站了起来，迎了出来。',
  ]);
});

// —— @EVENTEND：调教结束口上 ——

test('EVENTEND 死亡跳过（BASE:0<=0）静默', async () => {
  const fixture = await setup_k12((f) => {
    f.store.set('base:20:0', 0);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTEND');
  assert.deepEqual(fixture.text_lines(), []);
});

test('EVENTEND 爱慕低体力：回到研究桌继续工作', async () => {
  const fixture = await setup_k12((f) => {
    f.store.set('talent:20:85', 1);
    f.store.set('talent:20:76', 0);
    f.store.set('talent:20:种族', 1);
    f.store.set('base:20:0', 400);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTEND');
  assert.deepEqual(fixture.text_lines(), [
    '「果然、这种程度的体力消耗、是对研究的一大障碍呢……」',
    '智慧就那样以调教中的姿势回到了研究中的桌子旁，继续开始了工作。',
  ]);
});

// —— @KOJO_MESSAGE_COM_12：指令口上（S2a：守卫 + SELECTCOM 0/1/2） ——

async function speak_k12(fixture, rand) {
  const mod = fixture.load_module('kojo/kojo-k12-intellectual');
  return mod.kojo_message_com_12(rand);
}

test('KOJO_MESSAGE_COM_12 头部守卫① TEQUIP:45（口塞）且 SELECTCOM!=45 跳过', async () => {
  const fixture = await setup_k12((f) => {
    f.store.set('tequip:20:45', 1);
  }, 0);
  await speak_k12(fixture);
  assert.deepEqual(fixture.text_lines(), []);
  assert.equal(fixture.store.get('cflag:20:301'), undefined);
});

test('KOJO_MESSAGE_COM_12 头部守卫② TFLAG:899（失神）跳过', async () => {
  const fixture = await setup_k12((f) => {
    f.store.set('tflag:899', 1);
  }, 0);
  await speak_k12(fixture);
  assert.deepEqual(fixture.text_lines(), []);
});

test('KOJO_MESSAGE_COM_12 头部守卫③ TEQUIP:89（兽奸）占位存根', async () => {
  const fixture = await setup_k12((f) => {
    f.store.set('tequip:20:89', 1);
  }, 0);
  await speak_k12(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '（兽奸调教中的专用口上尚未移植，此处为占位——原作 @DOG_KOJO_12，见 docs/stub-registry.md。）',
  ]);
});

test('KOJO_MESSAGE_COM_12 头部守卫④ TEQUIP:55（死斗场）占位存根', async () => {
  const fixture = await setup_k12((f) => {
    f.store.set('tequip:20:55', 1);
  }, 55);
  await speak_k12(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '（死斗场调教中的专用口上尚未移植，此处为占位——原作 @COLOSSEUM_KOJO_12，见 docs/stub-registry.md。）',
  ]);
});

test('SELECTCOM==0（爱抚）初回：MARK:2>=2 分档，推进到 1', async () => {
  const fixture = await setup_k12((f) => {
    f.store.set('mark:20:2', 2);
  }, 0);
  await speak_k12(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「你知道这个理论吗？　一开始要先抚摸女性的肌肤呢」',
  ]);
  assert.equal(fixture.store.get('cflag:20:301'), 1);
});

test('SELECTCOM==0（爱抚）初回：MARK:2<2 分档', async () => {
  const fixture = await setup_k12((f) => {
    f.store.set('mark:20:2', 1);
  }, 0);
  await speak_k12(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「哼、真无聊呢。跟教科书一样的步骤呢」',
  ]);
  assert.equal(fixture.store.get('cflag:20:301'), 1);
});

test('SELECTCOM==0 怀孕分支（TALENT:153 && CFLAG:111==0）爱慕：推进到 5', async () => {
  const fixture = await setup_k12((f) => {
    f.store.set('cflag:20:301', 3);
    f.store.set('talent:20:153', 1);
    f.store.set('cflag:20:111', 0); // 孩子父亲 = 主人
    f.store.set('talent:20:85', 1);
    f.store.set('talent:20:种族', 1);
  }, 0);
  await speak_k12(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「又长大了呢、好想快点生下来啊♪」',
    '「嗯……我好想多做做脚部按摩啊。挺着大肚子可累了」',
  ]);
  assert.equal(fixture.store.get('cflag:20:301'), 5);
});

test('SELECTCOM==0 二回目以降淫乱：推进到 6', async () => {
  const fixture = await setup_k12((f) => {
    f.store.set('cflag:20:301', 5);
    f.store.set('talent:20:76', 1);
    f.store.set('talent:20:种族', 1);
  }, 0);
  await speak_k12(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「不要再挑逗我了……明明知道单是这样子已经无法满足我了」',
  ]);
  assert.equal(fixture.store.get('cflag:20:301'), 6);
});

test('SELECTCOM==1（舔阴）初回处女分档：推进到 1', async () => {
  const fixture = await setup_k12((f) => {
    f.store.set('talent:20:0', 1);
  }, 1);
  await speak_k12(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「哼、性器没被男人碰过真是对不住呢……」',
  ]);
  assert.equal(fixture.store.get('cflag:20:302'), 1);
});

test('SELECTCOM==2（肛门爱抚）二回目淫乱+润滑Lv2：推进到 7', async () => {
  const fixture = await setup_k12((f) => {
    f.store.set('cflag:20:303', 1);
    f.store.set('talent:20:76', 1);
    f.store.set('palam:20:3', 600);
    f.store.set('delta:20:3', 0);
  }, 2);
  await speak_k12(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「啊啊～、已经做好肛交的准备了哦！　排泄……不、已经变成性器啦♪」',
  ]);
  assert.equal(fixture.store.get('cflag:20:303'), 7);
});

test('SELECTCOM==3（自慰）淫乱+自慰中毒Lv3：RAND 推进到 8', async () => {
  const fixture = await setup_k12((f) => {
    f.store.set('cflag:20:304', 7);
    f.store.set('talent:20:76', 1);
    f.store.set('abl:20:31', 3);
  }, 3);
  await speak_k12(fixture, () => 0);
  assert.equal(fixture.store.get('cflag:20:304'), 8);
  assert.ok(
    fixture.text_lines()[0].includes('痴态'),
    fixture.text_lines().join('\n'),
  );
});

test('SELECTCOM==3（自慰）淫乱+自慰中毒Lv3：RAND=1 第二支 + clitoris_word 展开', async () => {
  const fixture = await setup_k12((f) => {
    f.store.set('cflag:20:304', 7);
    f.store.set('talent:20:76', 1);
    f.store.set('abl:20:31', 3);
  }, 3);
  // rand_n(4)!=0 且 rand_n(3)==0 → 第二支「猴子……要变成猴子」
  await speak_k12(fixture, (n) => (n === 3 ? 0 : 1));
  assert.equal(fixture.store.get('cflag:20:304'), 8);
  assert.deepEqual(fixture.text_lines(), [
    '「猴子……要变成猴子了！　变成自慰猴子了啊！」',
  ]);
});

test('SELECTCOM==5（胸爱抚）二回目 B感覚Lv3：推进到 3', async () => {
  const fixture = await setup_k12((f) => {
    f.store.set('cflag:20:306', 2);
    f.store.set('abl:20:1', 3);
  }, 5);
  await speak_k12(fixture);
  assert.deepEqual(fixture.text_lines(), ['「胸部……乳头好有感觉啊～！」']);
  assert.equal(fixture.store.get('cflag:20:306'), 3);
});

test('SELECTCOM==6（接吻）初吻（TFLAG:13）淫乱主人：推进到 1', async () => {
  const fixture = await setup_k12((f) => {
    f.store.set('talent:20:76', 1);
    f.store.set('tequip:20:89', 0);
    f.store.set('tequip:20:90', 0);
    const { game } = f.load_module('facade/game');
    game.train.初吻与自我口上 = 13;
  }, 6);
  await speak_k12(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「初吻什么的、感伤的感情是不必要的……不过还不错」',
  ]);
  assert.equal(fixture.store.get('cflag:20:307'), 1);
});

test('SELECTCOM==6（接吻）二回目顺从Lv2：推进到 3', async () => {
  const fixture = await setup_k12((f) => {
    f.store.set('cflag:20:307', 2);
    f.store.set('abl:20:10', 2);
  }, 6);
  await speak_k12(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「好吧、体液交换这种程度的事情没有问题」',
  ]);
  assert.equal(fixture.store.get('cflag:20:307'), 3);
});

test('SELECTCOM==7（自己扒开）初回淫乱：推进到 1', async () => {
  const fixture = await setup_k12((f) => {
    f.store.set('talent:20:76', 1);
  }, 7);
  await speak_k12(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「我的大受欢迎的地方、想被更多的看着呢♪」',
  ]);
  assert.equal(fixture.store.get('cflag:20:308'), 1);
});

test('SELECTCOM==7 二回目淫乱：原作缺陷 1:1（判据读 308、写入 306）', async () => {
  const fixture = await setup_k12((f) => {
    f.store.set('cflag:20:308', 1);
    f.store.set('talent:20:76', 1);
  }, 7);
  await speak_k12(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「怎么样、我性器的开发情况……♪　想让阴核变的多大呢？」',
  ]);
  // 原作 :806 写 CFLAG:306 = 5（缺陷 1:1，非 308）
  assert.equal(fixture.store.get('cflag:20:306'), 5);
  assert.equal(fixture.store.get('cflag:20:308'), 1);
});

test('SELECTCOM==8（插入手指）初回屈服刻印Lv3+爱：推进到 1', async () => {
  const fixture = await setup_k12((f) => {
    f.store.set('mark:20:2', 3);
    f.store.set('talent:20:85', 1);
  }, 8);
  await speak_k12(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「想通过你的手、来做个彻底的放松呢」',
  ]);
  assert.equal(fixture.store.get('cflag:20:309'), 1);
});

test('SELECTCOM==10（振动宝石）二回目屈服刻印Lv3：推进到 3', async () => {
  const fixture = await setup_k12((f) => {
    f.store.set('cflag:20:311', 2);
    f.store.set('mark:20:2', 3);
  }, 10);
  await speak_k12(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「道具的性能已经清楚了……但是、可以不把这个按在阴核上吗」',
  ]);
  assert.equal(fixture.store.get('cflag:20:311'), 3);
});

test('SELECTCOM==11（壶虫）装着初回非处女淫乱：推进到 1', async () => {
  const fixture = await setup_k12((f) => {
    f.store.set('tequip:20:11', 1);
    f.store.set('talent:20:0', 0);
    f.store.set('talent:20:76', 1);
  }, 11);
  await speak_k12(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「原来如此、将寄生虫家畜化吗。有意思……真想快点放进阴道品尝一下滋味呢♪」',
  ]);
  assert.equal(fixture.store.get('cflag:20:312'), 1);
});

test('SELECTCOM==11（壶虫）脱着时淫乱：推进到 3', async () => {
  const fixture = await setup_k12((f) => {
    f.store.set('tequip:20:11', 0);
    f.store.set('cflag:20:312', 1);
    f.store.set('talent:20:76', 1);
  }, 11);
  await speak_k12(fixture);
  assert.deepEqual(fixture.text_lines(), [
    '「实验已经结束了吗？　再多蹂躙一会儿也可以哦」',
  ]);
  assert.equal(fixture.store.get('cflag:20:372'), 3);
});
