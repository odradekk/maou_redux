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
  assert.deepEqual(fixture.text_lines(), [], '自身守卫①口上开关');
  assert.equal(
    fixture.store.get('cflag:31:201'),
    undefined,
    '自身守卫①口上开关',
  );
});

test('EVENTTRAIN 自身守卫②TALENT:173!=1 静默跳过', async () => {
  const fixture = await setup_k13((f) => f.store.set('talent:31:173', 0));
  await emit_train(fixture, seq_rand(1));
  assert.deepEqual(fixture.text_lines(), [], '自身守卫②TALENT:173');
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
  assert.deepEqual(
    fixture.text_lines(),
    [
      '「哎呀哎呀、我还是被抓住了呢」',
      '「要是对做我一直以来那种过分的事、我可不会原谅哦」',
      '「现在停手还来得及。再考虑考虑吧」',
    ],
    '初调教推进到 1',
  );
  assert.equal(fixture.store.get('cflag:31:201'), 1, '初调教推进到 1');
});

test('初調教人妻 + RAND:2==0：职业分档（战士）+ 镇定模样', async () => {
  const fixture = await setup_k13((f) => {
    f.store.set('talent:31:157', 1);
    f.store.set('talent:31:200', 1);
  });
  await emit_train(fixture, seq_rand(0, 0));
  assert.deepEqual(
    fixture.text_lines(),
    [
      '「哎呀哎呀、怎么办呢」',
      '「既然被没收了武器就没没办法了了」',
      '被俘虏的庇护者歪歪脑袋显出一副镇定沉着的模样。',
    ],
    '初调教人妻推进到 1',
  );
  assert.equal(fixture.store.get('cflag:31:201'), 1, '初调教人妻推进到 1');
});

test('NTR 再捕获（CFLAG:201>=1 && CFLAG:650==1）爱慕/淫乱臂：解除开关', async () => {
  const fixture = await setup_k13((f) => {
    f.store.set('cflag:31:201', 2);
    f.store.set('cflag:31:650', 1);
    f.store.set('talent:31:85', 1);
  });
  await emit_train(fixture, seq_rand(1));
  assert.deepEqual(
    fixture.text_lines(),
    [
      '「呜呜……请原谅我。我一度背叛了您」',
      '「之前的事情我请让它就这样过去吧……」',
      '「今后我会竭尽全力的服侍您的……」',
    ],
    'NTR 开关解除',
  );
  assert.equal(fixture.store.get('cflag:31:650'), 0, 'NTR 开关解除');
});

test('屈服刻印分档（各 Lv 一次）：CFLAG:201 2 → 3 → 4 → 5 → 6', async () => {
  const lv1 = await setup_k13((f) => {
    f.store.set('cflag:31:201', 1);
    f.store.set('mark:31:2', 1);
  });
  await emit_train(lv1, seq_rand(1));
  assert.deepEqual(
    lv1.text_lines(),
    ['「比起那些、来做点有意义的事如何」'],
    '屈服Lv1 推进到 2',
  );
  assert.equal(lv1.store.get('cflag:31:201'), 2, '屈服Lv1 推进到 2');

  const lv2 = await setup_k13((f) => {
    f.store.set('cflag:31:201', 1);
    f.store.set('mark:31:2', 2);
  });
  await emit_train(lv2, seq_rand(1));
  assert.deepEqual(
    lv2.text_lines(),
    [
      '「我是……绝对不会被你支配的！」',
      '「绝对……我绝对是不会输的！」',
      '「继续做这种事也是一点意义都没有的明白了吗！」',
      '庇护者毅然决然地放出了这样的宣言。',
    ],
    '屈服Lv2 推进到 3',
  );
  assert.equal(lv2.store.get('cflag:31:201'), 3, '屈服Lv2 推进到 3');

  const lv3 = await setup_k13((f) => {
    f.store.set('cflag:31:201', 1);
    f.store.set('mark:31:2', 3);
  });
  await emit_train(lv3, seq_rand(1));
  assert.deepEqual(
    lv3.text_lines(),
    [
      '「您是……主人、我向您屈服……」',
      '「所以……我不会再做、无谓的反抗了……」',
      '「什么都……什么都会做的……」',
    ],
    '屈服Lv3 推进到 4',
  );
  assert.equal(lv3.store.get('cflag:31:201'), 4, '屈服Lv3 推进到 4');

  const whore = await setup_k13((f) => {
    f.store.set('cflag:31:201', 4);
    f.store.set('talent:31:76', 1);
  });
  await emit_train(whore, seq_rand(1));
  assert.deepEqual(
    whore.text_lines(),
    [
      '「让我变得这么淫荡……真是十分感谢」',
      '「作为一个女人……不、作为一条母狗、总算找回了些自信……」',
      '「今后也请您……好好地疼爱这条母狗哦……♪」',
    ],
    '淫乱推进到 5',
  );
  assert.equal(whore.store.get('cflag:31:201'), 5, '淫乱推进到 5');

  const love = await setup_k13((f) => {
    f.store.set('cflag:31:201', 5);
    f.store.set('talent:31:85', 1);
  });
  await emit_train(love, seq_rand(1));
  assert.deepEqual(
    love.text_lines(),
    [
      '「嘻嘻、我想我现在找到了我的真爱了……谢谢您」',
      '「作为一个女人……之前的我竟然忘记了恋爱的感觉」',
      '「以后……可要好好地疼爱我哟……♪」',
    ],
    '爱慕推进到 6',
  );
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
  assert.deepEqual(
    fixture.text_lines(),
    [
      '「哎呀哎呀、垃圾你在往哪看呢、说你呢」',
      '「赶紧从我的眼前消失」',
      '「看到你、我饭都吃不下去了……」',
    ],
    'K13_KOJO2 反抗刻印Lv3',
  );
});

// —— @EVENTEND：调教终了分档 ——

test('@EVENTEND 调教终了分档（反抗 / 淫乱体力闸 / 爱慕）', async () => {
  const def = await setup_k13((f) => {
    f.store.set('mark:31:3', 3);
    f.store.set('base:31:0', 100);
  });
  await emit_end(def, seq_rand(1));
  assert.deepEqual(
    def.text_lines(),
    ['「真像秽物辣鸡干的事呢」', '「我恶心的快要吐了」', '「真是、受够了……」'],
    'EVENTEND 反抗刻印Lv3',
  );

  // 原作缺陷：淫乱 && BASE:0 >= 500 臂没有 RETURN 1，IF 链结束后 RETURN 0
  // emit() 丢掉处理器返回值，直接调 eventend_k13 才能锁住这条缺陷
  const whore_hi = await setup_k13((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('talent:31:85', 1);
    f.store.set('mark:31:2', 3);
    f.store.set('base:31:0', 500);
  });
  const { eventend_k13 } = whore_hi.load_module('kojo/kojo-k13-protector');
  const r_hi = await eventend_k13(seq_rand(1));
  assert.deepEqual(
    whore_hi.text_lines(),
    ['「哎呀、已经结束了哎……明天也请您多多关照了……♪」', '「我会翘首以待的♪」'],
    '淫乱体力>=500 无 RETURN 1（原作缺陷 1:1）',
  );
  assert.equal(r_hi, 0, '淫乱体力>=500 无 RETURN 1（原作缺陷 1:1）');

  const love_lo = await setup_k13((f) => {
    f.store.set('talent:31:85', 1);
    f.store.set('mark:31:2', 3);
    f.store.set('base:31:0', 300);
  });
  await emit_end(love_lo, seq_rand(1));
  assert.deepEqual(
    love_lo.text_lines(),
    [
      '「今天好激烈啊……我真是太满足了♪」',
      '「难道是累了吗……？　随时可以过来找我哦♪」',
    ],
    'EVENTEND 爱慕体力<=500',
  );
});

test('@EVENTEND BASE:0<=0（角色死亡）静默跳过', async () => {
  const fixture = await setup_k13((f) => {
    f.store.set('base:31:0', 0);
    f.store.set('mark:31:3', 3);
  });
  await emit_end(fixture, seq_rand(1));
  assert.deepEqual(
    fixture.text_lines(),
    [],
    'EVENTEND BASE:0<=0（角色死亡）静默跳过',
  );
});

// —— @KOJO_MESSAGE_COM_13：头部四道活动守卫 ——

test('口塞（TEQUIP:45 且非指令45）：静默跳过', async () => {
  const fixture = await setup_k13((f) => f.store.set('tequip:31:45', 1));
  await speak_k13(fixture, seq_rand(0));
  assert.deepEqual(
    fixture.text_lines(),
    [],
    '口塞（TEQUIP:45 且非指令45）：静默跳过',
  );
});

test('失神（TFLAG:899）：静默跳过', async () => {
  const fixture = await setup_k13((f) => f.store.set('tflag:899', 1));
  await speak_k13(fixture, seq_rand(0));
  assert.deepEqual(fixture.text_lines(), [], '失神（TFLAG:899）：静默跳过');
});

test('兽奸（TEQUIP:89）：岔进本文件真身 DOG_KOJO_13', async () => {
  const fixture = await setup_k13((f) => f.store.set('tequip:31:89', 1));
  await speak_k13(fixture, seq_rand(0));
  assert.deepEqual(
    fixture.text_lines(),
    ['「噫、干什么……？」'],
    '兽奸（TEQUIP:89）：岔进本文件真身 DOG_KOJO_13',
  );
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
  assert.deepEqual(
    fixture.text_lines(),
    ['「你打算手下留情……？」'],
    '死斗场（TEQUIP:55）：岔进本文件真身 COLOSSEUM_KOJO_13',
  );
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
  assert.deepEqual(
    fixture.text_lines(),
    ['「左右搓揉着……我什么都感觉不到」'],
    '爱抚初回推进到 1',
  );
  assert.equal(fixture.store.get('cflag:31:301'), 1, '爱抚初回推进到 1');
});

test('爱抚初回的刻印分档（MARK:2>=2）：配合台词', async () => {
  const fixture = await setup_k13((f) => f.store.set('mark:31:2', 2));
  await speak_k13(fixture, seq_rand(0));
  assert.deepEqual(
    fixture.text_lines(),
    ['「噫、再这样摸下去的话……不行了！」'],
    '爱抚初回刻印推进到 1',
  );
  assert.equal(fixture.store.get('cflag:31:301'), 1, '爱抚初回刻印推进到 1');
});

test('爱抚二回目以降的素质/刻印分档推进', async () => {
  const whore = await setup_k13((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:301', 1);
  });
  await speak_k13(whore, seq_rand(0));
  assert.deepEqual(
    whore.text_lines(),
    ['「啊、啊……快点让我的身子燃烧起来吧……♪」'],
    '淫乱分支推进到 6',
  );
  assert.equal(whore.store.get('cflag:31:301'), 6, '淫乱分支推进到 6');

  const love = await setup_k13((f) => {
    f.store.set('talent:31:85', 1);
    f.store.set('cflag:31:301', 1);
  });
  await speak_k13(love, seq_rand(0));
  assert.deepEqual(
    love.text_lines(),
    ['「请用力地抚弄我……还要……♪」'],
    '爱慕分支推进到 5',
  );
  assert.equal(love.store.get('cflag:31:301'), 5, '爱慕分支推进到 5');

  const lv3 = await setup_k13((f) => {
    f.store.set('mark:31:2', 3);
    f.store.set('cflag:31:301', 1);
  });
  await speak_k13(lv3, seq_rand(0));
  assert.deepEqual(
    lv3.text_lines(),
    ['「啊、啊……要去了……只是被摸而已……」'],
    '屈服Lv3 分支推进到 4',
  );
  assert.equal(lv3.store.get('cflag:31:301'), 4, '屈服Lv3 分支推进到 4');

  const lv2 = await setup_k13((f) => {
    f.store.set('mark:31:2', 2);
    f.store.set('cflag:31:301', 1);
  });
  await speak_k13(lv2, seq_rand(0));
  assert.deepEqual(
    lv2.text_lines(),
    ['「手法还挺……熟练的嘛？」'],
    '屈服Lv2 分支推进到 3',
  );
  assert.equal(lv2.store.get('cflag:31:301'), 3, '屈服Lv2 分支推进到 3');

  const other = await setup_k13((f) => {
    f.store.set('cflag:31:301', 1);
  });
  await speak_k13(other, seq_rand(0));
  assert.deepEqual(
    other.text_lines(),
    ['「又是这么……没水准呢。真的懂得怎么玩女人吗？」'],
    'それ以外推进到 2',
  );
  assert.equal(other.store.get('cflag:31:301'), 2, 'それ以外推进到 2');
});

test('阈值闸：FLAG:7==1 时淫乱阶段耗尽不出声、==2 时旁路重出声', async () => {
  const quiet = await setup_k13((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:301', 6);
    f.store.set('flag:7', 1);
  });
  await speak_k13(quiet, seq_rand(0));
  assert.deepEqual(quiet.text_lines(), [], '阈值闸耗尽保持 6');
  assert.equal(quiet.store.get('cflag:31:301'), 6, '阈值闸耗尽保持 6');

  const bypass = await setup_k13((f) => {
    f.store.set('talent:31:76', 1);
    f.store.set('cflag:31:301', 6);
    f.store.set('flag:7', 2);
  });
  await speak_k13(bypass, seq_rand(0));
  assert.deepEqual(
    bypass.text_lines(),
    ['「啊、啊……快点让我的身子燃烧起来吧……♪」'],
    '阈值闸 FLAG:7==2 旁路重出声',
  );
});

test('存根清单可检索：docs/stub-registry.md 收录 SELL_MATURO_K0', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = fixture.load_module('kojo/kojo-k13-protector');
  assert.deepEqual(STUBBED_CALLS, ['SELL_MATURO_K0']);
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

// —— 家族注册接线 ——

test('20 个分发族全部注册了 K13（key 13）', async () => {
  const fixture = await setup_k13();
  const {
    kojo_message_com_family,
    self_kojo_family,
    kojo_message_palamcng_family,
    kojo_message_markcng_family,
    benki_koujo_family,
    enterenemy_koujo_family,
    dungeon_victory_family,
    dungeon_attack_family,
    ntr_koujo_family,
    exucution_koujo_family,
    museum_koujo_family,
    banishment_koujo_family,
    public_exucution_koujo_family,
    grotesque_koujo_family,
    gobi_koujo_family,
  } = fixture.load_module('kojo/kojo-system');
  const {
    gohoubi_after_koujo_family,
    osioski_koujo_family,
    gohoubi_request_koujo_family,
  } = fixture.load_module('kojo/kojo-dungeon-after');
  const { ryouzyoku_kojo_family, ryouzyoku_after_kojo_family } =
    fixture.load_module('kojo/kojo-dungeon-ravish');
  const families = [
    kojo_message_com_family,
    self_kojo_family,
    kojo_message_palamcng_family,
    kojo_message_markcng_family,
    benki_koujo_family,
    enterenemy_koujo_family,
    dungeon_victory_family,
    dungeon_attack_family,
    ntr_koujo_family,
    exucution_koujo_family,
    museum_koujo_family,
    banishment_koujo_family,
    public_exucution_koujo_family,
    grotesque_koujo_family,
    gobi_koujo_family,
    gohoubi_after_koujo_family,
    osioski_koujo_family,
    gohoubi_request_koujo_family,
    ryouzyoku_kojo_family,
    ryouzyoku_after_kojo_family,
  ];
  assert.equal(families.length, 20, 'K13 二十族清单长度');
  for (const family of families) {
    assert.equal(family.has(13), true, `${family.name || '(族)'} 缺 K13 注册`);
  }
});

// —— PALAMCNG / MARKCNG ——

test('KOJO_MESSAGE_PALAMCNG_13 口塞守卫静默跳过', async () => {
  const fixture = await setup_k13((f) => {
    f.store.set('tequip:31:45', 1);
    f.store.set('palam:31:3', 600);
  });
  const { kojo_message_palamcng_family } =
    fixture.load_module('kojo/kojo-system');
  await kojo_message_palamcng_family.call(13, { args: [] });
  assert.deepEqual(fixture.text_lines(), [], 'PALAMCNG 口塞守卫');
  assert.equal(
    fixture.store.get('cflag:31:221'),
    undefined,
    'PALAMCNG 口塞守卫',
  );
});

test('KOJO_MESSAGE_PALAMCNG_13：首次润滑 Lv2 爱慕臂推进 CFLAG:221', async () => {
  const fixture = await setup_k13((f) => {
    f.store.set('talent:31:85', 1);
    f.store.set('palam:31:3', 600);
  });
  const { kojo_message_palamcng_family } =
    fixture.load_module('kojo/kojo-system');
  await kojo_message_palamcng_family.call(13, { args: [] });
  assert.deepEqual(
    fixture.text_lines(),
    ['「湿了……湿了、、、吗」'],
    'PALAMCNG 首次润滑Lv2 爱慕臂',
  );
  assert.equal(
    fixture.store.get('cflag:31:221'),
    1,
    'PALAMCNG 首次润滑Lv2 推进到 1',
  );
});

test('KOJO_MESSAGE_PALAMCNG_13：首次 C 绝顶推进 CFLAG:225', async () => {
  const fixture = await setup_k13((f) => {
    f.store.set('nowex:31:0', 1);
  });
  const { kojo_message_palamcng_family } =
    fixture.load_module('kojo/kojo-system');
  await kojo_message_palamcng_family.call(13, { args: [] });
  assert.deepEqual(
    fixture.text_lines(),
    ['「阴核……要高潮了！！」'],
    'PALAMCNG 首次C绝顶',
  );
  assert.equal(
    fixture.store.get('cflag:31:225'),
    1,
    'PALAMCNG 首次C绝顶推进到 1',
  );
});

test('KOJO_MESSAGE_MARKCNG_13：苦痛刻印变动==3 推进 CFLAG:297', async () => {
  const fixture = await setup_k13();
  const { game } = fixture.load_module('facade/game');
  game.system.苦痛刻印变动 = 3;
  const { kojo_message_markcng_family } =
    fixture.load_module('kojo/kojo-system');
  await kojo_message_markcng_family.call(13, { args: [] });
  assert.deepEqual(
    fixture.text_lines(),
    ['「好痛苦……呜呜…………」'],
    'MARKCNG 苦痛刻印Lv3',
  );
  assert.equal(
    fixture.store.get('cflag:31:297'),
    1,
    'MARKCNG 苦痛刻印Lv3 推进到 1',
  );
});

// —— SELECTCOM 代表枝 ——

test('SELECTCOM==20（正常位）初回处女：默认档推进 CFLAG:321', async () => {
  const fixture = await setup_k13((f) => {
    f.store.set('talent:31:0', 1);
  }, 20);
  await speak_k13(fixture, seq_rand(0));
  assert.deepEqual(
    fixture.text_lines(),
    ['「第一次被夺走了……」'],
    '正常位初回处女默认档',
  );
  assert.equal(fixture.store.get('cflag:31:321'), 1, '正常位初回推进到 1');
});

// —— SELF_KOJO ——

test('SELF_KOJO_K13 TFLAG:13==6（卖却）：存根行 SELL_MATURO_K0', async () => {
  const fixture = await setup_k13();
  const { game } = fixture.load_module('facade/game');
  game.train.初吻与自我口上 = 6;
  const { self_kojo_family } = fixture.load_module('kojo/kojo-system');
  await self_kojo_family.call(13, { args: [] });
  assert.ok(
    fixture.text_lines().some((line) => line.includes('SELL_MATURO_K0')),
    'SELF_KOJO 卖却分支存根 SELL_MATURO_K0',
  );
});

// —— 迷宫 ——

test('DUNGEON_VICTORY_K13：默认档 rand 0 + 体力低于五成追加', async () => {
  const fixture = await setup_k13((f) => {
    f.store.set('base:31:0', 10);
    f.store.set('maxbase:31:0', 100);
    f.store.set('base:31:1', 100);
    f.store.set('maxbase:31:1', 100);
  });
  const { dungeon_victory_family } = fixture.load_module('kojo/kojo-system');
  await dungeon_victory_family.call(13, { args: [seq_rand(0)] });
  assert.deepEqual(
    fixture.text_lines(),
    [
      '「呵呵……怎么样。我赢了」',
      '「这次的胜利、为了辉煌的明日……」',
      '（但是、还真是危险啊……）',
    ],
    'DUNGEON_VICTORY 低体力追加',
  );
});

test('DUNGEON_VICTORY_K13：体力过半不追加低体力旁白', async () => {
  const fixture = await setup_k13((f) => {
    f.store.set('base:31:0', 60);
    f.store.set('maxbase:31:0', 100);
    f.store.set('base:31:1', 100);
    f.store.set('maxbase:31:1', 100);
  });
  const { dungeon_victory_family } = fixture.load_module('kojo/kojo-system');
  await dungeon_victory_family.call(13, { args: [seq_rand(0)] });
  assert.deepEqual(
    fixture.text_lines(),
    [
      '「呵呵……怎么样。我赢了」',
      '「这次的胜利、为了辉煌的明日……」',
      '「那么、前进咯」',
    ],
    'DUNGEON_VICTORY 体力过半不追加',
  );
});

test('DUNGEON_ATTACK_K13：侵略状态==2 默认档 rand 0', async () => {
  const fixture = await setup_k13();
  const { chara } = fixture.load_module('facade/chara');
  chara(31).invasion.状态 = 2;
  const { dungeon_attack_family } = fixture.load_module('kojo/kojo-system');
  await dungeon_attack_family.call(13, { args: [seq_rand(0)] });
  assert.deepEqual(
    fixture.text_lines(),
    ['「上咯！」'],
    'DUNGEON_ATTACK 侵略状态==2',
  );
});

test('DUNGEON_RYOUZYOKU_K13 / AFTER_K13：处女默认档', async () => {
  const fixture = await setup_k13((f) => {
    f.store.set('talent:31:0', 1);
  });
  const { ryouzyoku_kojo_family, ryouzyoku_after_kojo_family } =
    fixture.load_module('kojo/kojo-dungeon-ravish');
  await ryouzyoku_kojo_family.call(13, { args: [] });
  assert.deepEqual(
    fixture.text_lines(),
    [
      '「怎么会这样……我的……第一次……」',
      '「啊啊……早知道会这样的话……就不冒这个险了……」',
    ],
    'DUNGEON_RYOUZYOKU 处女默认档',
  );
  const before = fixture.text_lines().length;
  await ryouzyoku_after_kojo_family.call(13, { args: [] });
  assert.deepEqual(
    fixture.text_lines().slice(before),
    ['「哈啊……总算保住了我的贞操」'],
    'DUNGEON_RYOUZYOKU_AFTER 处女保住贞操',
  );
});

// —— 战果 / 语尾 / 肉便器 / 来袭 ——

test('GOHOUBI_REQUEST_KOUJO_K13：CFLAG:504==0 请求金钱', async () => {
  const fixture = await setup_k13();
  const { gohoubi_request_koujo_family } = fixture.load_module(
    'kojo/kojo-dungeon-after',
  );
  await gohoubi_request_koujo_family.call(13, { args: [] });
  assert.deepEqual(
    fixture.text_lines(),
    ['庇护者要求奖励金钱', '「等我存够了钱、我们一起出去旅游吧♪　呵呵」'],
    'GOHOUBI_REQUEST 金钱',
  );
});

test('GOHOUBI_AFTER_KOUJO_K13：choice 参数传递（0 失望 / 1 保存）', async () => {
  const fixture = await setup_k13();
  const { gohoubi_after_koujo_family } = fixture.load_module(
    'kojo/kojo-dungeon-after',
  );
  await gohoubi_after_koujo_family.call(13, { args: [31, 0] });
  assert.deepEqual(
    fixture.text_lines(),
    ['「这样啊……真失望」'],
    'GOHOUBI_AFTER choice==0',
  );
  const before = fixture.text_lines().length;
  await gohoubi_after_koujo_family.call(13, { args: [31, 1] });
  assert.deepEqual(
    fixture.text_lines().slice(before),
    ['「呵呵、这是很重要的东西我会好好保存的」'],
    'GOHOUBI_AFTER choice==1',
  );
});

test('GOBI_KOUJO_K13：ARG:0==1 取语尾', async () => {
  const fixture = await setup_k13();
  const { gobi_koujo_family } = fixture.load_module('kojo/kojo-system');
  await gobi_koujo_family.call(13, { args: [1, seq_rand(0)] });
  assert.deepEqual(fixture.text_lines(), ['嗯♪'], 'GOBI ARG:0==1');
});

test('BENKI_KOUJO_K13：肉便器行动==0 默认档', async () => {
  const fixture = await setup_k13();
  const { game } = fixture.load_module('facade/game');
  game.train.肉便器行动 = 0;
  const { benki_koujo_family } = fixture.load_module('kojo/kojo-system');
  await benki_koujo_family.call(13, { args: [] });
  assert.deepEqual(
    fixture.text_lines(),
    ['「好的……会尽全力服侍的……」'],
    'BENKI 肉便器行动==0',
  );
});

test('ENTERENEMY_KOUJO_K13：默认档来袭口上', async () => {
  const fixture = await setup_k13();
  const { enterenemy_koujo_family } = fixture.load_module('kojo/kojo-system');
  await enterenemy_koujo_family.call(13, { args: [] });
  assert.deepEqual(
    fixture.text_lines(),
    ['「呵呵、我、会努力的♪」'],
    'ENTERENEMY 默认档',
  );
});

// —— NTR / 处刑 / 博物馆 ——

test('NTR_KOUJO_K13：P==1 爱慕臂首次经 CFLAG:650/651 标记', async () => {
  const fixture = await setup_k13((f) => {
    f.store.set('talent:31:85', 1);
  });
  const { game } = fixture.load_module('facade/game');
  game.system.狂王性别 = 0;
  const { ntr_koujo_family } = fixture.load_module('kojo/kojo-system');
  await ntr_koujo_family.call(13, { args: [seq_rand(0), 1] });
  assert.ok(
    fixture.text_lines().some((l) => l.includes('全都是魔王大人的东西')),
    'NTR P==1 爱慕臂台词',
  );
  assert.equal(fixture.store.get('cflag:31:650'), 1, 'NTR 开关 CFLAG:650');
  assert.equal(fixture.store.get('cflag:31:651'), 1, 'NTR P==1 记位 CFLAG:651');
});

test('EXUCUTION / BANISHMENT / PUBLIC_EXUCUTION_KOUJO_K13：有台词档', async () => {
  const fixture = await setup_k13();
  const { game } = fixture.load_module('facade/game');
  const {
    exucution_koujo_family,
    banishment_koujo_family,
    public_exucution_koujo_family,
  } = fixture.load_module('kojo/kojo-system');

  game.event.犬射精或处刑口上 = 4;
  await exucution_koujo_family.call(13, { args: [] });
  assert.deepEqual(
    fixture.text_lines(),
    ['「噫、有谁……可以救救我」'],
    'EXUCUTION 档 4',
  );

  let before = fixture.text_lines().length;
  game.event.流放口上 = 0;
  await banishment_koujo_family.call(13, { args: [] });
  assert.deepEqual(
    fixture.text_lines().slice(before),
    ['「再见。应该是再也不见吧……」'],
    'BANISHMENT 档 0',
  );

  before = fixture.text_lines().length;
  game.event.公开处刑口上 = 0;
  await public_exucution_koujo_family.call(13, { args: [] });
  assert.deepEqual(
    fixture.text_lines().slice(before),
    ['「你、还是杀了我吧……」'],
    'PUBLIC_EXUCUTION 档 0',
  );
});

test('MUSEUM_KOUJO_K13：TFLAG:500==3 有台词', async () => {
  const fixture = await setup_k13();
  const { game } = fixture.load_module('facade/game');
  const { museum_koujo_family } = fixture.load_module('kojo/kojo-system');
  game.event.博物馆口上 = 3;
  await museum_koujo_family.call(13, { args: [] });
  assert.deepEqual(
    fixture.text_lines(),
    ['「啊啦啊啦、我的这副样子被看到的话…真是很困扰呢」'],
    'MUSEUM 档 3',
  );
});
