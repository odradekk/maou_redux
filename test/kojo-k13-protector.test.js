/**
 * ere/kojo/kojo-k13-protector.js 的行为测试（issue #244：J34 口上·K13 庇護者）。
 *
 * 缝 = test/helpers/era-fixture.js。世界底座：通用奴隶（id 31）播种素质
 * 173（庇护者 → GET_KOJO_NUM = 113 → 分发 key 13）。
 *
 * K13 与模板七条的差别（按源文 1:1，非缺移植）：@KOJO_MESSAGE_COM_13
 * 只有四道活动守卫（口塞 TEQUIP:45 / 失神 TFLAG:899 / 兽奸 TEQUIP:89→
 * DOG_KOJO_13 / 死斗场 TEQUIP:55→COLOSSEUM_KOJO_13）。ASSI 守卫在源
 * :538-539 整行注释、TALENT:9 与 TEQUIP:90 本函数不读。
 */
'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

const seq_rand =
  (...draws) =>
  (n) => {
    const value = draws.shift() ?? 0;
    return value % n;
  };

async function setup_k13(seed, selectcom = 0) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '庇护者');
  fixture.era.beginTrain(0, 31);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = selectcom;
  fixture.store.set('talent:31:173', 1); // 庇护者 → GET_KOJO_NUM = 113
  fixture.store.set('flag:113', 1); // K13 存在标志
  fixture.store.set('flag:7', 2); // 总开关默认
  if (seed) {
    seed(fixture, era_flag);
  }
  fixture.load_module('kojo/kojo-system');
  fixture.load_module('kojo/kojo-k13-protector');
  return fixture;
}

async function speak_k13(fixture, rand) {
  const { kojo_message_com_family } = fixture.load_module('kojo/kojo-system');
  return kojo_message_com_family.call(13, { args: [rand] });
}

async function emit_train(fixture, rand) {
  const { emit } = fixture.load_module('system/event/registry');
  return emit('EVENTTRAIN', rand);
}

async function emit_end(fixture, rand) {
  const { emit } = fixture.load_module('system/event/registry');
  return emit('EVENTEND', rand);
}

// —— @EVENTTRAIN：存在标志一对 ——

test('@EVENTTRAIN #PRI 置存在标志、@EVENTEND #LATER 清 0（K13 一对）', async () => {
  const fixture = await setup_k13((f) => {
    f.store.delete('flag:113');
  });
  await emit_train(fixture, seq_rand(1));
  assert.equal(fixture.store.get('flag:113'), 1, 'K13 一对');
  assert.equal(fixture.store.get('flag:7'), 2, 'K13 一对');
  await emit_end(fixture, seq_rand(1));
  assert.equal(fixture.store.get('flag:113'), 0, 'K13 一对');
});

test('@EVENTTRAIN #PRI 口上开关补 0（FLAG:7 从 0 补到 2）', async () => {
  const fixture = await setup_k13((f) => {
    f.store.set('flag:7', 0);
  });
  await emit_train(fixture, seq_rand(1));
  assert.equal(fixture.store.get('flag:7'), 2, 'K13 一对');
});

test('EVENTTRAIN 自身守卫①口上开关<0（玩家显式关掉）静默跳过', async () => {
  const fixture = await setup_k13((f) => {
    f.store.set('flag:7', -1);
  });
  await emit_train(fixture, seq_rand(1));
  assert.deepEqual(fixture.text_lines(), []);
  assert.equal(
    fixture.store.get('cflag:31:201'),
    undefined,
    '自身守卫①口上开关',
  );
});

test('EVENTTRAIN 自身守卫②TALENT:173!=1 静默跳过', async () => {
  const fixture = await setup_k13((f) => f.store.set('talent:31:173', 0));
  await emit_train(fixture, seq_rand(1));
  assert.deepEqual(fixture.text_lines(), []);
  assert.equal(
    fixture.store.get('cflag:31:201'),
    undefined,
    '自身守卫②TALENT:173',
  );
});

// —— @EVENTTRAIN：初調教 CFLAG:201 状态机 ——

test('初調教（CFLAG:201==0）非人妻：三句警告 + 推进到 1', async () => {
  const fixture = await setup_k13();
  await emit_train(fixture, seq_rand(1));
  assert.deepEqual(fixture.text_lines(), [
    '「哎呀哎呀、我还是被抓住了呢」',
    '「要是对做我一直以来那种过分的事、我可不会原谅哦」',
    '「现在停手还来得及。再考虑考虑吧」',
  ]);
  assert.equal(fixture.store.get('cflag:31:201'), 1, '初调教推进到 1');
});

test('初調教人妻 + RAND:2==0：职业分档（战士）+ 镇定模样', async () => {
  const fixture = await setup_k13((f) => {
    f.store.set('talent:31:157', 1);
    f.store.set('talent:31:200', 1);
  });
  await emit_train(fixture, seq_rand(0, 0));
  assert.deepEqual(fixture.text_lines(), [
    '「哎呀哎呀、怎么办呢」',
    '「既然被没收了武器就没没办法了了」',
    '被俘虏的庇护者歪歪脑袋显出一副镇定沉着的模样。',
  ]);
  assert.equal(fixture.store.get('cflag:31:201'), 1, '初调教人妻推进到 1');
});

test('NTR 再捕获（CFLAG:201>=1 && CFLAG:650==1）爱慕/淫乱臂：解除开关', async () => {
  const fixture = await setup_k13((f) => {
    f.store.set('cflag:31:201', 2);
    f.store.set('cflag:31:650', 1);
    f.store.set('talent:31:85', 1);
  });
  await emit_train(fixture, seq_rand(1));
  assert.deepEqual(fixture.text_lines(), [
    '「呜呜……请原谅我。我一度背叛了您」',
    '「之前的事情我请让它就这样过去吧……」',
    '「今后我会竭尽全力的服侍您的……」',
  ]);
  assert.equal(fixture.store.get('cflag:31:650'), 0, 'NTR 开关解除');
});

test('屈服刻印分档（各 Lv 一次）：CFLAG:201 2 → 3 → 4 → 5 → 6', async () => {
  const lv1 = await setup_k13((f) => {
    f.store.set('cflag:31:201', 1);
    f.store.set('mark:31:2', 1);
  });
  await emit_train(lv1, seq_rand(1));
  assert.deepEqual(lv1.text_lines(), ['「比起那些、来做点有意义的事如何」']);
  assert.equal(lv1.store.get('cflag:31:201'), 2, '屈服Lv1 推进到 2');

  const lv2 = await setup_k13((f) => {
    f.store.set('cflag:31:201', 1);
    f.store.set('mark:31:2', 2);
  });
  await emit_train(lv2, seq_rand(1));
  assert.deepEqual(lv2.text_lines(), [
    '「我是……绝对不会被你支配的！」',
    '「绝对……我绝对是不会输的！」',
    '「继续做这种事也是一点意义都没有的明白了吗！」',
    '庇护者毅然决然地放出了这样的宣言。',
  ]);
  assert.equal(lv2.store.get('cflag:31:201'), 3, '屈服Lv2 推进到 3');

  const lv3 = await setup_k13((f) => {
    f.store.set('cflag:31:201', 1);
    f.store.set('mark:31:2', 3);
  });
  await emit_train(lv3, seq_rand(1));
  assert.deepEqual(lv3.text_lines(), [
    '「您是……主人、我向您屈服……」',
    '「所以……我不会再做、无谓的反抗了……」',
    '「什么都……什么都会做的……」',
  ]);
  assert.equal(lv3.store.get('cflag:31:201'), 4, '屈服Lv3 推进到 4');

  const whore = await setup_k13((f) => {
    f.store.set('cflag:31:201', 4);
    f.store.set('talent:31:76', 1);
  });
  await emit_train(whore, seq_rand(1));
  assert.deepEqual(whore.text_lines(), [
    '「让我变得这么淫荡……真是十分感谢」',
    '「作为一个女人……不、作为一条母狗、总算找回了些自信……」',
    '「今后也请您……好好地疼爱这条母狗哦……♪」',
  ]);
  assert.equal(whore.store.get('cflag:31:201'), 5, '淫乱推进到 5');

  const love = await setup_k13((f) => {
    f.store.set('cflag:31:201', 5);
    f.store.set('talent:31:85', 1);
  });
  await emit_train(love, seq_rand(1));
  assert.deepEqual(love.text_lines(), [
    '「嘻嘻、我想我现在找到了我的真爱了……谢谢您」',
    '「作为一个女人……之前的我竟然忘记了恋爱的感觉」',
    '「以后……可要好好地疼爱我哟……♪」',
  ]);
  assert.equal(love.store.get('cflag:31:201'), 6, '爱慕推进到 6');
});

test('屈服Lv2 原作 &&/|| 优先级：仅 TALENT:114 也走「人妻+胸」臂', async () => {
  const fixture = await setup_k13((f) => {
    f.store.set('cflag:31:201', 1);
    f.store.set('mark:31:2', 2);
    f.store.set('talent:31:114', 1);
  });
  await emit_train(fixture, seq_rand(1));
  assert.equal(
    fixture.text_lines()[0],
    '「呼呵呵……就承认这段时间我的心稍微有些动摇了吧」',
    '原作缺陷：157 && 110 || 114 || 119 先 AND 后 OR',
  );
  assert.equal(fixture.store.get('cflag:31:201'), 3, '屈服Lv2 胸臂推进到 3');
});

test('K13_KOJO2 二回目以降（ASSI < 0）：反抗刻印Lv3 支', async () => {
  const fixture = await setup_k13((f) => {
    f.store.set('cflag:31:201', 6);
    f.store.set('mark:31:3', 3);
  });
  await emit_train(fixture, seq_rand(1));
  assert.deepEqual(fixture.text_lines(), [
    '「哎呀哎呀、垃圾你在往哪看呢、说你呢」',
    '「赶紧从我的眼前消失」',
    '「看到你、我饭都吃不下去了……」',
  ]);
});

// —— @EVENTEND：调教终了分档 ——

test('@EVENTEND 调教终了分档（反抗 / 淫乱体力闸 / 爱慕）', async () => {
  const def = await setup_k13((f) => {
    f.store.set('mark:31:3', 3);
    f.store.set('base:31:0', 100);
  });
  await emit_end(def, seq_rand(1));
  assert.deepEqual(def.text_lines(), [
    '「真像秽物辣鸡干的事呢」',
    '「我恶心的快要吐了」',
    '「真是、受够了……」',
  ]);

  // 原作缺陷：淫乱 && BASE:0 >= 500 臂没有 RETURN 1，IF 链结束后 RETURN 0
  const whore_hi = await setup_k13((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('talent:31:85', 1);
    f.store.set('mark:31:2', 3);
    f.store.set('base:31:0', 500);
  });
  const r_hi = await emit_end(whore_hi, seq_rand(1));
  assert.deepEqual(whore_hi.text_lines(), [
    '「哎呀、已经结束了哎……明天也请您多多关照了……♪」',
    '「我会翘首以待的♪」',
  ]);
  void r_hi;
  assert.equal(
    whore_hi.text_lines().length,
    2,
    '淫乱体力>=500 无 RETURN 1（原作缺陷 1:1）',
  );

  const love_lo = await setup_k13((f) => {
    f.store.set('talent:31:85', 1);
    f.store.set('mark:31:2', 3);
    f.store.set('base:31:0', 300);
  });
  await emit_end(love_lo, seq_rand(1));
  assert.deepEqual(love_lo.text_lines(), [
    '「今天好激烈啊……我真是太满足了♪」',
    '「难道是累了吗……？　随时可以过来找我哦♪」',
  ]);
});

test('@EVENTEND BASE:0<=0（角色死亡）静默跳过', async () => {
  const fixture = await setup_k13((f) => {
    f.store.set('base:31:0', 0);
    f.store.set('mark:31:3', 3);
  });
  await emit_end(fixture, seq_rand(1));
  assert.deepEqual(fixture.text_lines(), []);
});

// —— @KOJO_MESSAGE_COM_13：头部四道活动守卫 ——

test('口塞（TEQUIP:45 且非指令45）：静默跳过', async () => {
  const fixture = await setup_k13((f) => f.store.set('tequip:31:45', 1));
  await speak_k13(fixture, seq_rand(0));
  assert.deepEqual(fixture.text_lines(), []);
});

test('失神（TFLAG:899）：静默跳过', async () => {
  const fixture = await setup_k13((f) => f.store.set('tflag:899', 1));
  await speak_k13(fixture, seq_rand(0));
  assert.deepEqual(fixture.text_lines(), []);
});

test('兽奸（TEQUIP:89）：岔进本文件真身 DOG_KOJO_13', async () => {
  const fixture = await setup_k13((f) => f.store.set('tequip:31:89', 1));
  await speak_k13(fixture, seq_rand(0));
  assert.deepEqual(fixture.text_lines(), ['「噫、干什么……？」']);
  assert.equal(
    fixture.store.get('cflag:31:301'),
    1,
    '兽奸爱抚初回（DOG_KOJO_13 CFLAG:301==0 且 MARK:2<2）',
  );
});

test('死斗场（TEQUIP:55）：岔进本文件真身 COLOSSEUM_KOJO_13', async () => {
  const fixture = await setup_k13((f) => {
    f.store.set('tequip:31:55', 1);
    f.store.set('base:31:1', 100);
  });
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.selectcom = 55;
  await speak_k13(fixture, seq_rand(0));
  assert.deepEqual(fixture.text_lines(), ['「你打算手下留情……？」']);
});

test('K13 无 ASSI 守卫：助手调教也出声（源 :538-539 整行注释）', async () => {
  const fixture = await setup_k13((f, era_flag) => {
    era_flag.assi = 31;
    era_flag.assiplay = 1;
  });
  await speak_k13(fixture, seq_rand(0));
  assert.ok(
    fixture.text_lines().length > 0,
    'K13 无 ASSI 守卫，助手调教也出声',
  );
});

test('K13 无 TALENT:9 / TEQUIP:90 守卫：崩坏与触手也出声', async () => {
  const broken = await setup_k13((f) => f.store.set('talent:31:9', 1));
  await speak_k13(broken, seq_rand(0));
  assert.ok(broken.text_lines().length > 0, 'K13 无崩坏守卫');

  const tentacle = await setup_k13((f) => f.store.set('tequip:31:90', 1));
  await speak_k13(tentacle, seq_rand(0));
  assert.ok(tentacle.text_lines().length > 0, 'K13 无触手守卫');
});

// —— SELECTCOM 0：爱抚 CFLAG:301 状态机 ——

test('爱抚初回（CFLAG:301==0 且 MARK:2<2）：拒绝 + 推进到 1', async () => {
  const fixture = await setup_k13();
  await speak_k13(fixture, seq_rand(0));
  assert.deepEqual(fixture.text_lines(), ['「左右搓揉着……我什么都感觉不到」']);
  assert.equal(fixture.store.get('cflag:31:301'), 1, '爱抚初回推进到 1');
});

test('爱抚初回的刻印分档（MARK:2>=2）：配合台词', async () => {
  const fixture = await setup_k13((f) => f.store.set('mark:31:2', 2));
  await speak_k13(fixture, seq_rand(0));
  assert.deepEqual(fixture.text_lines(), [
    '「噫、再这样摸下去的话……不行了！」',
  ]);
  assert.equal(fixture.store.get('cflag:31:301'), 1, '爱抚初回刻印推进到 1');
});

test('爱抚二回目以降的素质/刻印分档推进', async () => {
  const whore = await setup_k13((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:301', 1);
  });
  await speak_k13(whore, seq_rand(0));
  assert.deepEqual(whore.text_lines(), [
    '「啊、啊……快点让我的身子燃烧起来吧……♪」',
  ]);
  assert.equal(whore.store.get('cflag:31:301'), 6, '淫乱分支推进到 6');

  const love = await setup_k13((f) => {
    f.store.set('talent:31:85', 1);
    f.store.set('cflag:31:301', 1);
  });
  await speak_k13(love, seq_rand(0));
  assert.deepEqual(love.text_lines(), ['「请用力地抚弄我……还要……♪」']);
  assert.equal(love.store.get('cflag:31:301'), 5, '爱慕分支推进到 5');

  const lv3 = await setup_k13((f) => {
    f.store.set('mark:31:2', 3);
    f.store.set('cflag:31:301', 1);
  });
  await speak_k13(lv3, seq_rand(0));
  assert.deepEqual(lv3.text_lines(), ['「啊、啊……要去了……只是被摸而已……」']);
  assert.equal(lv3.store.get('cflag:31:301'), 4, '屈服Lv3 分支推进到 4');

  const lv2 = await setup_k13((f) => {
    f.store.set('mark:31:2', 2);
    f.store.set('cflag:31:301', 1);
  });
  await speak_k13(lv2, seq_rand(0));
  assert.deepEqual(lv2.text_lines(), ['「手法还挺……熟练的嘛？」']);
  assert.equal(lv2.store.get('cflag:31:301'), 3, '屈服Lv2 分支推进到 3');

  const other = await setup_k13((f) => {
    f.store.set('cflag:31:301', 1);
  });
  await speak_k13(other, seq_rand(0));
  assert.deepEqual(other.text_lines(), [
    '「又是这么……没水准呢。真的懂得怎么玩女人吗？」',
  ]);
  assert.equal(other.store.get('cflag:31:301'), 2, 'それ以外推进到 2');
});

test('阈值闸：FLAG:7==1 时淫乱阶段耗尽不出声、==2 时旁路重出声', async () => {
  const quiet = await setup_k13((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:301', 6);
    f.store.set('flag:7', 1);
  });
  await speak_k13(quiet, seq_rand(0));
  assert.deepEqual(quiet.text_lines(), []);
  assert.equal(quiet.store.get('cflag:31:301'), 6, '阈值闸耗尽保持 6');

  const bypass = await setup_k13((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:301', 6);
    f.store.set('flag:7', 2);
  });
  await speak_k13(bypass, seq_rand(0));
  assert.deepEqual(bypass.text_lines(), [
    '「啊、啊……快点让我的身子燃烧起来吧……♪」',
  ]);
});

test('存根清单可检索：docs/stub-registry.md 收录 SELL_MATURO_K0', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = fixture.load_module('kojo/kojo-k13-protector');
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
