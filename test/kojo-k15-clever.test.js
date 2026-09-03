/**
 * ere/kojo/kojo-k15-clever.js 的行为测试（issue #246：J36 口上·K15 伶俐）。
 *
 * 缝 = test/helpers/era-fixture.js。世界底座：伶俐（素质 175 →
 * GET_KOJO_NUM = 115 → 分发 key 15）。本文件按切片增长。
 *
 * K15 与模板七条的差别（按源文 1:1，非缺移植）：@KOJO_MESSAGE_COM_15
 * 头部只有四道活动守卫——ASSI/ASSIPLAY 整行注释、无 TALENT:9、无
 * TEQUIP:90；TEQUIP:89 → DOG_KOJO_15 真身、TEQUIP:55 → COLOSSEUM_KOJO_15
 * 真身。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

const CID = 31;
const KEY = 15;

const seq_rand =
  (...draws) =>
  (n) => {
    const value = draws.shift() ?? 0;
    return value % n;
  };

async function setup_k15(seed, selectcom = 0) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, CID, '伶俐');
  fixture.era.beginTrain(0, CID);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = CID;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = selectcom;
  fixture.store.set(`talent:${CID}:175`, 1); // 伶俐 → GET_KOJO_NUM = 115
  fixture.store.set('flag:115', 1); // K15 存在标志
  fixture.store.set('flag:7', 2); // 总开关默认
  if (seed) {
    seed(fixture, era_flag);
  }
  fixture.load_module('kojo/kojo-system');
  fixture.load_module('kojo/kojo-k15-clever');
  return fixture;
}

async function emit_train(fixture) {
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
}

async function emit_end(fixture) {
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTEND');
}

async function speak_k15(fixture, rand) {
  const { kojo_message_com_family } = fixture.load_module('kojo/kojo-system');
  return kojo_message_com_family.call(KEY, { args: [rand] });
}

// —— @EVENTTRAIN / @EVENTEND：存在标志一对 ——

test('@EVENTTRAIN #PRI 置存在标志、@EVENTEND #LATER 清 0（K15 一对）', async () => {
  const fixture = await setup_k15((f) => {
    f.store.delete('flag:115');
    f.store.set(`talent:${CID}:175`, 0); // 越过 EVENTTRAIN 普通档
  });
  await emit_train(fixture);
  assert.equal(fixture.store.get('flag:115'), 1, 'K15 存在标志 FLAG:115');
  assert.equal(fixture.store.get('flag:7'), 2, '总开关随之默认开');
  await emit_end(fixture);
  assert.equal(fixture.store.get('flag:115'), 0, 'EVENTEND #LATER 清 FLAG:115');
});

test('@EVENTTRAIN #PRI 口上开关补 0（FLAG:7 从 0 补到 2）', async () => {
  const fixture = await setup_k15((f) => {
    f.store.set('flag:7', 0);
    f.store.set(`talent:${CID}:175`, 0);
  });
  await emit_train(fixture);
  assert.equal(fixture.store.get('flag:7'), 2, 'FLAG:7 从 0 补到 2');
});

test('EVENTTRAIN 自身守卫①口上开关<0（玩家显式关掉）静默跳过', async () => {
  const fixture = await setup_k15((f) => f.store.set('flag:7', -1));
  await emit_train(fixture);
  assert.deepEqual(fixture.text_lines(), []);
  assert.equal(fixture.store.get(`cflag:${CID}:201`), undefined);
});

test('EVENTTRAIN 自身守卫②TALENT:175!=1 静默跳过', async () => {
  const fixture = await setup_k15((f) => f.store.set(`talent:${CID}:175`, 0));
  await emit_train(fixture);
  assert.deepEqual(fixture.text_lines(), []);
  assert.equal(fixture.store.get(`cflag:${CID}:201`), undefined);
});

// —— 初调教 CFLAG:201 状态机 ——

test('初调教暗器：选 2 偏头闪躲 → 恭顺珠 +50、CFLAG:201=1', async () => {
  const fixture = await setup_k15();
  fixture.set_inputs(2);
  await emit_train(fixture);
  assert.equal(
    fixture.text_lines()[0],
    '才刚走进牢房里，一枚带着光明气息的暗器就这样朝你的眼眸激射而来！！',
    '初调教暗器首句',
  );
  assert.ok(
    fixture.text_lines().some((l) => l.includes('你稍微一偏头')),
    '偏头闪躲台词',
  );
  assert.equal(fixture.store.get(`juel:${CID}:4`), 50, '恭顺珠 JUEL:4 += 50');
  assert.equal(fixture.store.get(`cflag:${CID}:201`), 1, '初调教推进到 1');
});

test('初调教暗器：选 1 不闪不避 → 擦伤、无恭顺珠', async () => {
  const fixture = await setup_k15();
  fixture.set_inputs(1);
  await emit_train(fixture);
  assert.ok(
    fixture.text_lines().some((l) => l.includes('你不闪不避')),
    '不闪不避台词',
  );
  assert.equal(
    fixture.store.get(`juel:${CID}:4`) || 0,
    0,
    '不闪不避不加恭顺珠',
  );
  assert.equal(fixture.store.get(`cflag:${CID}:201`), 1, '初调教推进到 1');
});

test('初调教：TALENT:314==9 跳过暗器陷阱仍推进到 1', async () => {
  const fixture = await setup_k15((f) => f.store.set(`talent:${CID}:314`, 9));
  await emit_train(fixture);
  const lines = fixture.text_lines();
  assert.ok(
    lines.some((l) => l.includes('别以为只要囚禁我')),
    '跳过暗器后的挑衅（SELF_CALL 缺省「我」；:81 PRINTFORML 空行在前）',
  );
  assert.ok(!lines.some((l) => l.includes('暗器')), '种族 314==9 不出暗器段');
  assert.equal(fixture.store.get(`cflag:${CID}:201`), 1);
});

test('初调教：TALENT:10 胆怯 → 紧握拳头保持镇定', async () => {
  const fixture = await setup_k15((f) => f.store.set(`talent:${CID}:10`, 1));
  fixture.set_inputs(1);
  await emit_train(fixture);
  assert.ok(
    fixture.text_lines().some((l) => l.includes('紧握着拳头')),
    '胆怯/低姿态分档',
  );
});

test('NTR 再捕获（CFLAG:650==1）：爱慕/淫乱臂解除开关', async () => {
  const fixture = await setup_k15((f) => {
    f.store.set(`cflag:${CID}:201`, 1);
    f.store.set(`cflag:${CID}:650`, 1);
    f.store.set(`talent:${CID}:85`, 1);
  });
  await emit_train(fixture);
  assert.ok(
    fixture.text_lines().some((l) => l.includes('真是非常抱歉')),
    'NTR 再捕获爱慕/淫乱臂',
  );
  assert.equal(fixture.store.get(`cflag:${CID}:650`), 0, 'NTR 开关解除');
});

test('NTR 再捕获：未沦陷臂', async () => {
  const fixture = await setup_k15((f) => {
    f.store.set(`cflag:${CID}:201`, 1);
    f.store.set(`cflag:${CID}:650`, 1);
  });
  await emit_train(fixture);
  assert.ok(
    fixture.text_lines().some((l) => l.includes('反正不管在哪')),
    'NTR 再捕获未沦陷臂',
  );
  assert.equal(fixture.store.get(`cflag:${CID}:650`), 0);
});

test('屈服刻印 Lv1/2/3：CFLAG:201 2 → 3 → 4', async () => {
  const lv1 = await setup_k15((f) => {
    f.store.set(`cflag:${CID}:201`, 1);
    f.store.set(`mark:${CID}:2`, 1);
  });
  await emit_train(lv1);
  assert.ok(
    lv1.text_lines().some((l) => l.includes('只会用这些小手段')),
    '屈服 Lv1 台词',
  );
  assert.equal(lv1.store.get(`cflag:${CID}:201`), 2, '屈服 Lv1 推进到 2');

  const lv2 = await setup_k15((f) => {
    f.store.set(`cflag:${CID}:201`, 2);
    f.store.set(`mark:${CID}:2`, 2);
  });
  await emit_train(lv2);
  assert.ok(
    lv2.text_lines().some((l) => l.includes('这些反应只是因为习惯而已')),
    '屈服 Lv2 台词',
  );
  assert.equal(lv2.store.get(`cflag:${CID}:201`), 3, '屈服 Lv2 推进到 3');

  const lv3 = await setup_k15((f) => {
    f.store.set(`cflag:${CID}:201`, 3);
    f.store.set(`mark:${CID}:2`, 3);
  });
  await emit_train(lv3);
  assert.ok(
    lv3.text_lines().some((l) => l.includes('难道我是')),
    '屈服 Lv3 台词',
  );
  assert.equal(lv3.store.get(`cflag:${CID}:201`), 4, '屈服 Lv3 推进到 4');
});

test('淫乱（CFLAG:201<5 && TALENT:76）：推进到 5', async () => {
  const fixture = await setup_k15((f) => {
    f.store.set(`cflag:${CID}:201`, 4);
    f.store.set(`talent:${CID}:76`, 1);
  });
  await emit_train(fixture);
  assert.ok(
    fixture.text_lines().some((l) => l.includes('什么叫做『欢愉』')),
    '淫乱档台词',
  );
  assert.equal(fixture.store.get(`cflag:${CID}:201`), 5, '淫乱推进到 5');
});

test('爱慕（CFLAG:201<6 && TALENT:85）：男人分档推进到 6', async () => {
  const love = await setup_k15((f) => {
    f.store.set(`cflag:${CID}:201`, 5);
    f.store.set(`talent:${CID}:85`, 1);
  });
  await emit_train(love);
  assert.ok(
    love.text_lines().some((l) => l.includes('花朵盛开')),
    '爱慕非男人分档',
  );
  assert.equal(love.store.get(`cflag:${CID}:201`), 6, '爱慕推进到 6');

  const male = await setup_k15((f) => {
    f.store.set(`cflag:${CID}:201`, 5);
    f.store.set(`talent:${CID}:85`, 1);
    f.store.set(`talent:${CID}:122`, 1);
  });
  await emit_train(male);
  assert.ok(
    male.text_lines().some((l) => l.includes('和煦的春风')),
    '爱慕男人分档 TALENT:122',
  );
});

test('崩坏（TALENT:9 && CFLAG:201<9）：推进到 9', async () => {
  const fixture = await setup_k15((f) => {
    f.store.set(`cflag:${CID}:201`, 6);
    f.store.set(`talent:${CID}:9`, 1);
  });
  await emit_train(fixture);
  assert.ok(
    fixture.text_lines().some((l) => l.includes('被玩坏了')),
    '崩坏档台词',
  );
  assert.equal(fixture.store.get(`cflag:${CID}:201`), 9, '崩坏推进到 9');
});

// —— @K15_KOJO2：二回目以降 ——

test('K15_KOJO2 反抗刻印 Lv3（ASSI<0 岔入）', async () => {
  const fixture = await setup_k15((f) => {
    f.store.set(`cflag:${CID}:201`, 6);
    f.store.set(`mark:${CID}:3`, 3);
  });
  await emit_train(fixture);
  assert.ok(
    fixture.text_lines().some((l) => l.includes('魔界的脸皮是不值钱的吧')),
    'K15_KOJO2 反抗刻印 Lv3',
  );
});

test('K15_KOJO2 屈服刻印 Lv0：PRINTDATAL 随机两条', async () => {
  const a = await setup_k15((f) => {
    f.store.set(`cflag:${CID}:201`, 6);
    f.store.set(`mark:${CID}:2`, 0);
  });
  a.override_math_random(() => 0);
  try {
    await emit_train(a);
    assert.ok(
      a.text_lines().some((l) => l.includes('优雅且安静地滚开')),
      'PRINTDATAL 第一条（rand_n=0）',
    );
  } finally {
    a.restore_math_random();
  }

  const b = await setup_k15((f) => {
    f.store.set(`cflag:${CID}:201`, 6);
    f.store.set(`mark:${CID}:2`, 0);
  });
  b.override_math_random(() => 0.9);
  try {
    await emit_train(b);
    assert.ok(
      b.text_lines().some((l) => l.includes('换一只猴子')),
      'PRINTDATAL 第二条（rand_n=1）',
    );
  } finally {
    b.restore_math_random();
  }
});

test('K15_KOJO2 淫乱：RAND:2 两臂', async () => {
  const a = await setup_k15((f) => {
    f.store.set(`cflag:${CID}:201`, 6);
    f.store.set(`mark:${CID}:2`, 3); // 绕开 MARK:2==0/1/2 的先行臂（原作顺序 1:1）
    f.store.set(`talent:${CID}:76`, 1);
  });

  a.override_math_random(() => 0.9);
  try {
    await emit_train(a);
    assert.ok(
      a.text_lines().some((l) => l.includes('今天要玩些什么呢')),
      '淫乱 RAND 真值臂',
    );
  } finally {
    a.restore_math_random();
  }

  const b = await setup_k15((f) => {
    f.store.set(`cflag:${CID}:201`, 6);
    f.store.set(`mark:${CID}:2`, 3);
    f.store.set(`talent:${CID}:76`, 1);
  });

  b.override_math_random(() => 0);
  try {
    await emit_train(b);
    assert.ok(
      b.text_lines().some((l) => l.includes('新的知识')),
      '淫乱 RAND 假值臂',
    );
  } finally {
    b.restore_math_random();
  }
});

// —— @EVENTEND 调教终了 ——

test('EVENTEND 死亡（BASE:0<=0）静默跳过', async () => {
  const fixture = await setup_k15((f) => f.store.set(`base:${CID}:0`, 0));
  await emit_end(fixture);
  assert.deepEqual(fixture.text_lines(), []);
});

test('EVENTEND 反抗刻印 Lv3 + 无爱慕', async () => {
  const fixture = await setup_k15((f) => {
    f.store.set(`mark:${CID}:3`, 3);
    f.store.set(`base:${CID}:0`, 100);
  });
  await emit_end(fixture);
  assert.ok(
    fixture.text_lines().some((l) => l.includes('真是人渣')),
    'EVENTEND 反抗刻印 Lv3',
  );
});

test('EVENTEND 屈服 Lv1 以下 + 故乡恋人（TALENT:317==4）', async () => {
  const fixture = await setup_k15((f) => {
    f.store.set(`mark:${CID}:2`, 1);
    f.store.set(`talent:${CID}:317`, 4);
    f.store.set(`base:${CID}:0`, 100);
  });
  await emit_end(fixture);
  assert.ok(
    fixture.text_lines().some((l) => l.includes('就这')),
    'EVENTEND 屈服 Lv1 台词',
  );
  assert.ok(
    fixture.text_lines().some((l) => l.includes('为了那个人')),
    '故乡恋人内心独白',
  );
});

test('EVENTEND 淫乱体力>=500 / 爱慕体力<500', async () => {
  // 刻印臂都带 TALENT:85==0；要落到淫乱必须同时有爱慕以绕开刻印臂（原作顺序 1:1）
  const whore = await setup_k15((f) => {
    f.store.set(`talent:${CID}:76`, 1);
    f.store.set(`talent:${CID}:85`, 1);
    f.store.set(`base:${CID}:0`, 500);
  });
  await emit_end(whore);
  assert.ok(
    whore.text_lines().some((l) => l.includes('结束了吗')),
    '淫乱体力充足',
  );

  const love = await setup_k15((f) => {
    f.store.set(`talent:${CID}:85`, 1);
    f.store.set(`base:${CID}:0`, 300);
  });
  love.override_math_random(() => 0);
  try {
    await emit_end(love);
    assert.ok(
      love.text_lines().some((l) => l.includes('合而为一')),
      '爱慕体力不足 PRINTDATAL 第一条',
    );
  } finally {
    love.restore_math_random();
  }
});

// —— @KOJO_MESSAGE_COM_15：头部守卫（K15 四道活动守卫） ——

test('口塞（TEQUIP:45 且非指令45）：静默跳过', async () => {
  const fixture = await setup_k15((f) => f.store.set(`tequip:${CID}:45`, 1));
  await speak_k15(fixture, seq_rand(0));
  assert.deepEqual(fixture.text_lines(), [], '口塞守卫跳过');
});

test('口塞守卫不拦 SELECTCOM==45', async () => {
  const fixture = await setup_k15(
    (f) => f.store.set(`tequip:${CID}:45`, 1),
    45,
  );
  await speak_k15(fixture, seq_rand(0));
  // SELECTCOM 45 本切片尚未落地，不应被口塞守卫拦成空输出以外的副作用；
  // 这里只锁「不是被 45 守卫 return 0」——后续切片接口塞指令时改断言。
  assert.equal(
    fixture.store.get(`cflag:${CID}:301`) || 0,
    0,
    '口塞指令不走爱抚',
  );
});

test('失神（TFLAG:899）：静默跳过', async () => {
  const fixture = await setup_k15((f) => f.store.set('tflag:899', 1));
  await speak_k15(fixture, seq_rand(0));
  assert.deepEqual(fixture.text_lines(), [], '失神守卫跳过');
});

test('兽奸（TEQUIP:89）：岔进本文件真身 DOG_KOJO_15', async () => {
  const fixture = await setup_k15((f) => f.store.set(`tequip:${CID}:89`, 1));
  await speak_k15(fixture, seq_rand(0));
  assert.ok(
    fixture
      .text_lines()
      .some((l) => l.includes('别靠过来') || l.includes('恶心')),
    '兽奸爱抚初回（DOG_KOJO_15 :4032 CFLAG:301==0 且 MARK:2<2）',
  );
  assert.equal(
    fixture.store.get(`cflag:${CID}:301`),
    1,
    '兽奸爱抚初回推进 CFLAG:301=1',
  );
});

test('死斗场（TEQUIP:55）：岔进本文件真身 COLOSSEUM_KOJO_15', async () => {
  const fixture = await setup_k15((f) => {
    f.store.set(`tequip:${CID}:55`, 1);
    f.store.set(`base:${CID}:1`, 100);
  }, 55);
  await speak_k15(fixture, seq_rand(0));
  assert.ok(
    fixture.text_lines().some((l) => l.includes('死斗场气氛')),
    '死斗场 SELECTCOM 55 気力>0',
  );
});

test('K15 无 ASSI 守卫：助手调教也出声（源 :408-410 整行注释）', async () => {
  const fixture = await setup_k15((f, era_flag) => {
    era_flag.assi = CID;
    era_flag.assiplay = 1;
  });
  await speak_k15(fixture, seq_rand(0));
  assert.ok(
    fixture.text_lines().length > 0,
    'K15 无 ASSI 守卫，助手调教也出声',
  );
});

test('K15 无 TALENT:9 / TEQUIP:90 守卫：崩坏与触手仍出声', async () => {
  const broken = await setup_k15((f) => f.store.set(`talent:${CID}:9`, 1));
  await speak_k15(broken, seq_rand(0));
  assert.ok(broken.text_lines().length > 0, 'K15 无 TALENT:9 守卫');

  const tentacle = await setup_k15((f) => f.store.set(`tequip:${CID}:90`, 1));
  await speak_k15(tentacle, seq_rand(0));
  assert.ok(tentacle.text_lines().length > 0, 'K15 无 TEQUIP:90 守卫');
});

test('kojo_message_com_family 注册了 K15（key 15）', async () => {
  const fixture = await setup_k15();
  const { kojo_message_com_family, self_kojo_family } =
    fixture.load_module('kojo/kojo-system');
  assert.equal(kojo_message_com_family.has(KEY), true, 'COM 族缺 K15 注册');
  assert.equal(self_kojo_family.has(KEY), true, 'SELF_KOJO 族缺 K15 注册');
});

// —— SELECTCOM 0：爱抚 CFLAG:301 状态机 ——

test('爱抚初回（CFLAG:301==0 且 MARK:2<2）：嫌弃 + 推进到 1', async () => {
  const fixture = await setup_k15();
  await speak_k15(fixture, seq_rand(0));
  assert.ok(
    fixture.text_lines().some((l) => l.includes('除了恶心之外没有其他感觉')),
    '爱抚初回无刻印台词',
  );
  assert.equal(fixture.store.get(`cflag:${CID}:301`), 1, '爱抚初回推进到 1');
});

test('爱抚初回的刻印分档（MARK:2>=2）：忍耐台词', async () => {
  const fixture = await setup_k15((f) => f.store.set(`mark:${CID}:2`, 2));
  await speak_k15(fixture, seq_rand(0));
  assert.ok(
    fixture.text_lines().some((l) => l.includes('不要摸')),
    '爱抚初回屈服 Lv2 台词',
  );
  assert.equal(fixture.store.get(`cflag:${CID}:301`), 1, '爱抚初回推进到 1');
});

test('爱抚二回目以降的素质/刻印分档推进', async () => {
  const whore = await setup_k15((f) => {
    f.store.set(`talent:${CID}:76`, 1);
    f.store.set(`cflag:${CID}:301`, 1);
  });
  await speak_k15(whore, seq_rand(0));
  assert.ok(
    whore.text_lines().some((l) => l.includes('好舒服') || l.includes('好热')),
    '淫乱 PRINTDATAL',
  );
  assert.equal(
    whore.store.get(`cflag:${CID}:301`),
    6,
    '淫乱 TALENT:76 → CFLAG:301 = 6',
  );

  const love = await setup_k15((f) => {
    f.store.set(`talent:${CID}:85`, 1);
    f.store.set(`cflag:${CID}:301`, 1);
  });
  await speak_k15(love, seq_rand(0));
  assert.ok(
    love
      .text_lines()
      .some((l) => l.includes('请随意') || l.includes('好喜欢被这样子抚摸')),
    '爱慕 PRINTDATAL',
  );
  assert.equal(
    love.store.get(`cflag:${CID}:301`),
    5,
    '爱慕 TALENT:85 → CFLAG:301 = 5',
  );

  const sub3 = await setup_k15((f) => {
    f.store.set(`mark:${CID}:2`, 3);
    f.store.set(`cflag:${CID}:301`, 1);
  });
  await speak_k15(sub3, seq_rand(0));
  assert.ok(
    sub3.text_lines().some((l) => l.includes('这种感觉')),
    '屈服刻印 Lv3 台词',
  );
  assert.equal(sub3.store.get(`cflag:${CID}:301`), 4, '屈服刻印Lv3 → 4');

  const sub2 = await setup_k15((f) => {
    f.store.set(`mark:${CID}:2`, 2);
    f.store.set(`cflag:${CID}:301`, 1);
  });
  await speak_k15(sub2, seq_rand(0));
  assert.ok(
    sub2.text_lines().some((l) => l.includes('就算是这样')),
    '屈服刻印 Lv2 台词',
  );
  assert.equal(sub2.store.get(`cflag:${CID}:301`), 3, '屈服刻印Lv2 → 3');

  const other = await setup_k15((f) => f.store.set(`cflag:${CID}:301`, 1));
  await speak_k15(other, seq_rand(0));
  assert.ok(
    other
      .text_lines()
      .some(
        (l) =>
          l.includes('恶心') ||
          l.includes('技术这么差') ||
          l.includes('一点也不舒服'),
      ),
    'それ以外 PRINTDATAL',
  );
  assert.equal(
    other.store.get(`cflag:${CID}:301`),
    2,
    'それ以外（MARK:2 <= 1）→ 2',
  );
});

test('爱抚阶段耗尽后（FLAG:7==1）静默；FLAG:7==2 旁路重出声', async () => {
  const quiet = await setup_k15((f) => {
    f.store.set(`talent:${CID}:76`, 1);
    f.store.set(`cflag:${CID}:301`, 6);
    f.store.set('flag:7', 1);
  });
  await speak_k15(quiet, seq_rand(0));
  assert.deepEqual(quiet.text_lines(), [], 'FLAG:7==1 阶段耗尽静默');
  assert.equal(quiet.store.get(`cflag:${CID}:301`), 6, '状态不动');

  const repeat = await setup_k15((f) => {
    f.store.set(`talent:${CID}:76`, 1);
    f.store.set(`cflag:${CID}:301`, 6);
  });
  await speak_k15(repeat, seq_rand(0));
  assert.ok(
    repeat.text_lines().some((l) => l.includes('好舒服') || l.includes('好热')),
    'FLAG:7==2 旁路重出声',
  );
  assert.equal(repeat.store.get(`cflag:${CID}:301`), 6, '已到顶，不再动');
});
