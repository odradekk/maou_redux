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

// —— SELECTCOM 1–12：指令口上（切片 3） ——

test('舔阴初回（CFLAG:302==0）：处女 / 非处女分档 + 推进到 1', async () => {
  const virgin = await setup_k15((f) => f.store.set(`talent:${CID}:0`, 1), 1);
  await speak_k15(virgin, seq_rand(0));
  assert.ok(
    virgin.text_lines().some((l) => l.includes('真是不敢相信')),
    '舔阴初回处女台词',
  );
  assert.equal(virgin.store.get(`cflag:${CID}:302`), 1, '舔阴初回推进到 1');

  const other = await setup_k15(undefined, 1);
  await speak_k15(other, seq_rand(0));
  assert.ok(
    other.text_lines().some((l) => l.includes('离') && l.includes('远点')),
    '舔阴初回非处女台词',
  );
  assert.equal(
    other.store.get(`cflag:${CID}:302`),
    1,
    '舔阴初回非处女推进到 1',
  );
});

test('舔阴二回目以降：淫乱 / 爱慕 / 屈服Lv3 / それ以外', async () => {
  const whore = await setup_k15((f) => {
    f.store.set(`talent:${CID}:76`, 1);
    f.store.set(`cflag:${CID}:302`, 1);
  }, 1);
  await speak_k15(whore, seq_rand(0));
  assert.ok(
    whore.text_lines().some((l) => l.includes('湿答答')),
    '舔阴淫乱台词',
  );
  assert.equal(whore.store.get(`cflag:${CID}:302`), 5, '淫乱 → CFLAG:302 = 5');

  const love = await setup_k15((f) => {
    f.store.set(`talent:${CID}:85`, 1);
    f.store.set(`cflag:${CID}:302`, 1);
  }, 1);
  await speak_k15(love, seq_rand(0));
  assert.ok(
    love.text_lines().some((l) => l.includes('会流出来')),
    '舔阴爱慕台词',
  );
  assert.equal(love.store.get(`cflag:${CID}:302`), 4, '爱慕 → CFLAG:302 = 4');

  const sub3 = await setup_k15((f) => {
    f.store.set(`mark:${CID}:2`, 3);
    f.store.set(`cflag:${CID}:302`, 1);
  }, 1);
  await speak_k15(sub3, seq_rand(0));
  assert.ok(
    sub3.text_lines().some((l) => l.includes('那个地方')),
    '舔阴屈服Lv3台词',
  );
  assert.equal(sub3.store.get(`cflag:${CID}:302`), 3, '屈服Lv3 → 3');

  const other = await setup_k15((f) => f.store.set(`cflag:${CID}:302`, 1), 1);
  await speak_k15(other, seq_rand(0));
  assert.ok(
    other
      .text_lines()
      .some((l) => l.includes('恶心死了') || l.includes('令人作呕')),
    '舔阴それ以外 PRINTDATAL',
  );
  assert.equal(other.store.get(`cflag:${CID}:302`), 2, 'それ以外 → 2');
});

test('肛门爱抚初回（CFLAG:303==0）推进到 1', async () => {
  const fixture = await setup_k15(undefined, 2);
  await speak_k15(fixture, seq_rand(0));
  assert.ok(
    fixture.text_lines().some((l) => l.includes('在摸哪里')),
    '肛门爱抚初回台词',
  );
  assert.equal(
    fixture.store.get(`cflag:${CID}:303`),
    1,
    '肛门爱抚初回推进到 1',
  );
});

test('肛门爱抚二回目以降：润滑分档 + それ以外读 CFLAG:223（源缺陷 1:1）', async () => {
  const whore_wet = await setup_k15((f) => {
    f.store.set(`talent:${CID}:76`, 1);
    f.store.set(`cflag:${CID}:303`, 1);
    f.store.set(`palam:${CID}:3`, 500);
  }, 2);
  await speak_k15(whore_wet, seq_rand(0));
  assert.ok(
    whore_wet.text_lines().some((l) => l.includes('还想要更多')),
    '肛门爱抚淫乱+润滑Lv2以上',
  );
  assert.equal(
    whore_wet.store.get(`cflag:${CID}:303`),
    7,
    '淫乱+润滑Lv2以上 → CFLAG:303 = 7',
  );

  const whore_dry = await setup_k15((f) => {
    f.store.set(`talent:${CID}:76`, 1);
    f.store.set(`cflag:${CID}:303`, 1);
  }, 2);
  await speak_k15(whore_dry, seq_rand(0));
  assert.ok(
    whore_dry.text_lines().some((l) => l.includes('再伸进来一点')),
    '肛门爱抚淫乱+润滑Lv2未満',
  );
  assert.equal(
    whore_dry.store.get(`cflag:${CID}:303`),
    6,
    '淫乱+润滑Lv2未満 → CFLAG:303 = 6',
  );

  const other = await setup_k15((f) => {
    f.store.set(`cflag:${CID}:303`, 1);
    f.store.set(`cflag:${CID}:223`, 2);
    f.store.set('flag:7', 1);
  }, 2);
  await speak_k15(other, seq_rand(0));
  assert.deepEqual(
    other.text_lines(),
    [],
    '肛门爱抚それ以外读 CFLAG:223：已推进且 FLAG:7==1 时不出声',
  );
  assert.equal(
    other.store.get(`cflag:${CID}:303`),
    1,
    'CFLAG:303 状态不动（源读 223 而非 303）',
  );
});

test('自慰初回（CFLAG:304==0）推进到 1', async () => {
  const fixture = await setup_k15(undefined, 3);
  await speak_k15(fixture, seq_rand(0));
  assert.ok(
    fixture.text_lines().some((l) => l.includes('怎么会有这种要求')),
    '自慰初回台词',
  );
  assert.equal(fixture.store.get(`cflag:${CID}:304`), 1, '自慰初回推进到 1');
});

test('自慰二回目以降：淫乱处女 / RAND:2 / それ以外', async () => {
  const virgin = await setup_k15((f) => {
    f.store.set(`talent:${CID}:76`, 1);
    f.store.set(`talent:${CID}:0`, 1);
    f.store.set(`cflag:${CID}:304`, 1);
  }, 3);
  await speak_k15(virgin, seq_rand(0));
  assert.ok(
    virgin.text_lines().some((l) => l.includes('还没开苞')),
    '自慰淫乱处女台词',
  );
  assert.equal(virgin.store.get(`cflag:${CID}:304`), 9, '淫乱处女 → 9');

  const addict = await setup_k15((f) => {
    f.store.set(`talent:${CID}:76`, 1);
    f.store.set(`abl:${CID}:31`, 3);
    f.store.set(`cflag:${CID}:304`, 1);
  }, 3);
  await speak_k15(addict, seq_rand(1));
  assert.ok(
    addict.text_lines().some((l) => l.includes('被人看着自慰')),
    '自慰淫乱中毒Lv3 RAND:2 真值臂',
  );
  assert.equal(addict.store.get(`cflag:${CID}:304`), 8, '淫乱中毒Lv3 → 8');

  const other = await setup_k15((f) => f.store.set(`cflag:${CID}:304`, 1), 3);
  await speak_k15(other, seq_rand(0));
  assert.ok(
    other.text_lines().some((l) => l.includes('喜欢看这种事情')),
    '自慰それ以外 RAND:2==0',
  );
  assert.equal(other.store.get(`cflag:${CID}:304`), 2, 'それ以外 → 2');
});

test('胸爱抚初回（CFLAG:306==0）：爱慕 / それ以外', async () => {
  const love = await setup_k15((f) => f.store.set(`talent:${CID}:85`, 1), 5);
  await speak_k15(love, seq_rand(0));
  assert.ok(
    love.text_lines().some((l) => l.includes('有点害羞')),
    '胸爱抚初回爱慕台词',
  );
  assert.equal(love.store.get(`cflag:${CID}:306`), 1, '胸爱抚初回推进到 1');

  const other = await setup_k15(undefined, 5);
  await speak_k15(other, seq_rand(0));
  assert.ok(
    other.text_lines().some((l) => l.includes('痴汉')),
    '胸爱抚初回それ以外台词',
  );
  assert.equal(
    other.store.get(`cflag:${CID}:306`),
    1,
    '胸爱抚初回非爱慕推进到 1',
  );
});

test('胸爱抚二回目以降：淫乱 / 爱慕+ASSIPLAY 不写计数器 / B感覚', async () => {
  const whore = await setup_k15((f) => {
    f.store.set(`talent:${CID}:76`, 1);
    f.store.set(`cflag:${CID}:306`, 1);
  }, 5);
  await speak_k15(whore, seq_rand(0));
  assert.ok(
    whore.text_lines().some((l) => l.includes('再') && l.includes('用力')),
    '胸爱抚淫乱台词',
  );
  assert.equal(whore.store.get(`cflag:${CID}:306`), 5, '淫乱 → 5');

  const assi = await setup_k15((f, era_flag) => {
    f.store.set(`talent:${CID}:85`, 1);
    f.store.set(`cflag:${CID}:306`, 1);
    era_flag.assiplay = 1;
  }, 5);
  await speak_k15(assi, seq_rand(0));
  assert.ok(
    assi.text_lines().some((l) => l.includes('注视')),
    '胸爱抚爱慕+ASSIPLAY 台词',
  );
  assert.equal(
    assi.store.get(`cflag:${CID}:306`),
    1,
    '爱慕+ASSIPLAY 不写 CFLAG:306（源未赋值）',
  );

  const sense = await setup_k15((f) => {
    f.store.set(`abl:${CID}:1`, 3);
    f.store.set(`cflag:${CID}:306`, 1);
  }, 5);
  await speak_k15(sense, seq_rand(0));
  assert.ok(
    sense
      .text_lines()
      .some((l) => l.includes('不要再捏乳头') || l.includes('不要再揉胸部')),
    '胸爱抚 B感覚Lv3 PRINTDATAL',
  );
  assert.equal(sense.store.get(`cflag:${CID}:306`), 3, 'B感覚Lv3 → 3');
});

test('接吻初吻（CFLAG:307==0 && TFLAG:13）：淫乱 / それ以外拼接', async () => {
  const whore = await setup_k15((f) => {
    f.store.set(`talent:${CID}:76`, 1);
    f.store.set('tflag:13', 1);
  }, 6);
  await speak_k15(whore, seq_rand(0));
  assert.ok(
    whore.text_lines().some((l) => l.includes('早就想跟主人接吻')),
    '接吻初吻淫乱台词',
  );
  assert.equal(whore.store.get(`cflag:${CID}:307`), 1, '初吻推进到 1');

  const other = await setup_k15((f) => f.store.set('tflag:13', 1), 6);
  await speak_k15(other, seq_rand(0));
  assert.ok(
    other.text_lines().some((l) => l.includes('用手模擦')),
    '接吻初吻それ以外无口塞：拼接擦嘴台词',
  );
  assert.ok(
    other.text_lines().some((l) => l.includes('夺走了初吻')),
    '接吻初吻それ以外旁白',
  );

  const gag = await setup_k15((f) => {
    f.store.set('tflag:13', 1);
    f.store.set(`tequip:${CID}:44`, 1);
  }, 6);
  await speak_k15(gag, seq_rand(0));
  assert.ok(
    !gag.text_lines().some((l) => l.includes('用手模擦')),
    '绳子束缚时 SIF !TEQUIP:44 不拼接擦嘴',
  );
});

test('接吻调教初回（CFLAG:307==0 无 TFLAG:13）与二回目以降', async () => {
  const first = await setup_k15(undefined, 6);
  await speak_k15(first, seq_rand(0));
  assert.ok(
    first.text_lines().some((l) => l.includes('谁要跟你这种')),
    '接吻调教初回それ以外',
  );
  assert.equal(first.store.get(`cflag:${CID}:307`), 1, '调教初回推进到 1');

  const whore = await setup_k15((f) => {
    f.store.set(`talent:${CID}:76`, 1);
    f.store.set(`cflag:${CID}:307`, 1);
  }, 6);
  await speak_k15(whore, seq_rand(0));
  assert.ok(
    whore.text_lines().some((l) => l.includes('还要')),
    '接吻二回目淫乱台词',
  );
  assert.equal(whore.store.get(`cflag:${CID}:307`), 5, '淫乱 → 5');
});

test('自己扒开初回推进 CFLAG:308=1；二回目以降误写 CFLAG:306（源缺陷 1:1）', async () => {
  const first = await setup_k15(undefined, 7);
  await speak_k15(first, seq_rand(0));
  assert.ok(
    first.text_lines().some((l) => l.includes('做这种事情')),
    '自己扒开初回それ以外',
  );
  assert.equal(first.store.get(`cflag:${CID}:308`), 1, '自己扒开初回推进到 1');

  const whore = await setup_k15((f) => {
    f.store.set(`talent:${CID}:76`, 1);
    f.store.set(`cflag:${CID}:308`, 1);
  }, 7);
  await speak_k15(whore, seq_rand(0));
  assert.ok(
    whore.text_lines().some((l) => l.includes('看清楚里面')),
    '自己扒开淫乱台词',
  );
  assert.equal(
    whore.store.get(`cflag:${CID}:306`),
    5,
    '源误写 CFLAG:306=5（非 308）',
  );
  assert.equal(
    whore.store.get(`cflag:${CID}:308`),
    1,
    'CFLAG:308 保持不变（二回目未写）',
  );
});

test('插入手指 / 舔肛 / 振动宝石：空 PRINTFORMW 仍推进计数器', async () => {
  const finger = await setup_k15(undefined, 8);
  await speak_k15(finger, seq_rand(0));
  assert.ok(finger.text_lines().includes(''), '插入手指初回空 PRINTFORMW');
  assert.equal(finger.store.get(`cflag:${CID}:309`), 1, '插入手指初回 → 1');

  const finger2 = await setup_k15((f) => {
    f.store.set(`talent:${CID}:76`, 1);
    f.store.set(`cflag:${CID}:309`, 1);
  }, 8);
  await speak_k15(finger2, seq_rand(0));
  assert.equal(finger2.store.get(`cflag:${CID}:309`), 5, '插入手指淫乱 → 5');

  const lick = await setup_k15(undefined, 9);
  await speak_k15(lick, seq_rand(0));
  assert.equal(lick.store.get(`cflag:${CID}:310`), 1, '舔肛初回 → 1');

  const rotor = await setup_k15(undefined, 10);
  await speak_k15(rotor, seq_rand(0));
  assert.equal(rotor.store.get(`cflag:${CID}:311`), 1, '振动宝石初回 → 1');
});

test('壶虫开始（SELECTCOM 11 && TEQUIP:11）：处女 / 非处女分档', async () => {
  const virgin = await setup_k15((f) => {
    f.store.set(`tequip:${CID}:11`, 1);
    f.store.set(`talent:${CID}:0`, 1);
  }, 11);
  await speak_k15(virgin, seq_rand(0));
  assert.ok(
    virgin.text_lines().some((l) => l.includes('被壶虫破处')),
    '壶虫处女それ以外台词',
  );
  assert.equal(virgin.store.get(`cflag:${CID}:312`), 1, '壶虫初回 → 1');

  const used = await setup_k15((f) => {
    f.store.set(`tequip:${CID}:11`, 1);
    f.store.set(`talent:${CID}:76`, 1);
  }, 11);
  await speak_k15(used, seq_rand(0));
  assert.ok(
    used.text_lines().some((l) => l.includes('在里面动')),
    '壶虫非处女淫乱台词',
  );
  assert.equal(used.store.get(`cflag:${CID}:312`), 1, '壶虫非处女初回 → 1');
});

test('壶虫着脱（SELECTCOM 11 && TEQUIP:11==0）：CFLAG:372', async () => {
  const whore = await setup_k15((f) => f.store.set(`talent:${CID}:76`, 1), 11);
  await speak_k15(whore, seq_rand(0));
  assert.ok(
    whore.text_lines().some((l) => l.includes('拔出来了')),
    '壶虫着脱淫乱台词',
  );
  assert.equal(
    whore.store.get(`cflag:${CID}:372`),
    3,
    '着脱淫乱 → CFLAG:372 = 3',
  );

  const other = await setup_k15(undefined, 11);
  await speak_k15(other, seq_rand(0));
  assert.ok(
    other.text_lines().some((l) => l.includes('终于')),
    '壶虫着脱それ以外台词',
  );
  assert.equal(other.store.get(`cflag:${CID}:372`), 1, '着脱それ以外 → 1');
});

test('振动杖初回 / 二回目以降分档', async () => {
  const first = await setup_k15(undefined, 12);
  await speak_k15(first, seq_rand(0));
  assert.ok(
    first.text_lines().some((l) => l.includes('借助道具')),
    '振动杖初回それ以外',
  );
  assert.equal(first.store.get(`cflag:${CID}:313`), 1, '振动杖初回 → 1');

  const whore = await setup_k15((f) => {
    f.store.set(`talent:${CID}:76`, 1);
    f.store.set(`cflag:${CID}:313`, 1);
  }, 12);
  await speak_k15(whore, seq_rand(0));
  assert.ok(
    whore.text_lines().some((l) => l.includes('好有感觉')),
    '振动杖淫乱台词',
  );
  assert.equal(whore.store.get(`cflag:${CID}:313`), 5, '淫乱 → 5');
});

// —— SELECTCOM 13–37：指令口上（切片 4） ——
// COM 14–17 整段注释，活代码只有 13 / 19–23 / 26–37。

test('肛门虫开始（SELECTCOM 13 && TEQUIP:13）：初回 / 二回目淫乱两臂都写 6', async () => {
  const first = await setup_k15((f) => f.store.set(`tequip:${CID}:13`, 1), 13);
  await speak_k15(first, seq_rand(0));
  assert.ok(
    first.text_lines().some((l) => l.includes('肮脏的虫子')),
    '肛门虫初回それ以外',
  );
  assert.equal(first.store.get(`cflag:${CID}:314`), 1, '肛门虫初回 → 1');

  const whore_abl = await setup_k15((f) => {
    f.store.set(`tequip:${CID}:13`, 1);
    f.store.set(`talent:${CID}:76`, 1);
    f.store.set(`abl:${CID}:3`, 3);
    f.store.set(`cflag:${CID}:314`, 1);
  }, 13);
  await speak_k15(whore_abl, seq_rand(0));
  assert.ok(
    whore_abl.text_lines().some((l) => l.includes('宝贝')),
    '肛门虫淫乱+A感覚Lv3',
  );
  assert.equal(whore_abl.store.get(`cflag:${CID}:314`), 6, '淫乱+A感覚 → 6');

  const whore = await setup_k15((f) => {
    f.store.set(`tequip:${CID}:13`, 1);
    f.store.set(`talent:${CID}:76`, 1);
    f.store.set(`cflag:${CID}:314`, 1);
  }, 13);
  await speak_k15(whore, seq_rand(0));
  assert.ok(
    whore.text_lines().some((l) => l.includes('又要用这个来欺负')),
    '肛门虫淫乱（无 A感覚）',
  );
  assert.equal(whore.store.get(`cflag:${CID}:314`), 6, '淫乱两臂都写 6');
});

test('肛门虫着脱（SELECTCOM 13 && TEQUIP:13==0）：CFLAG:374', async () => {
  const whore = await setup_k15((f) => f.store.set(`talent:${CID}:76`, 1), 13);
  await speak_k15(whore, seq_rand(0));
  assert.ok(
    whore.text_lines().some((l) => l.includes('要拿走了吗')),
    '肛门虫着脱淫乱',
  );
  assert.equal(whore.store.get(`cflag:${CID}:374`), 4, '着脱淫乱 → 4');

  const other = await setup_k15(undefined, 13);
  await speak_k15(other, seq_rand(0));
  assert.ok(
    other.text_lines().some((l) => l.includes('心有余悸')),
    '肛门虫着脱それ以外',
  );
  assert.equal(other.store.get(`cflag:${CID}:374`), 1, '着脱それ以外 → 1');
});

test('SELECTCOM 14–17 整段注释：静默且不写计数器', async () => {
  const cases = [
    { com: 14, cflag: 315, teq: 14 },
    { com: 15, cflag: 316, teq: 15 },
    { com: 16, cflag: 317, teq: 16 },
    { com: 17, cflag: 318, teq: 17 },
  ];
  for (const { com, cflag, teq } of cases) {
    const fixture = await setup_k15(
      (f) => f.store.set(`tequip:${CID}:${teq}`, 1),
      com,
    );
    await speak_k15(fixture, seq_rand(0));
    assert.deepEqual(
      fixture.text_lines(),
      [],
      `SELECTCOM ${com} 整段注释，不出声`,
    );
    assert.equal(
      fixture.store.get(`cflag:${CID}:${cflag}`),
      undefined,
      `SELECTCOM ${com} 不写 CFLAG:${cflag}`,
    );
  }
});

test('肛珠开始 / 着脱；爱+A感覚臂带 !ASSIPLAY（源 1:1）', async () => {
  const first = await setup_k15((f) => f.store.set(`tequip:${CID}:19`, 1), 19);
  await speak_k15(first, seq_rand(0));
  assert.ok(
    first.text_lines().some((l) => l.includes('这个癖好也太恶心')),
    '肛珠初回それ以外',
  );
  assert.equal(first.store.get(`cflag:${CID}:320`), 1, '肛珠初回 → 1');

  const whore = await setup_k15((f) => {
    f.store.set(`tequip:${CID}:19`, 1);
    f.store.set(`talent:${CID}:76`, 1);
    f.store.set(`abl:${CID}:3`, 3);
    f.store.set(`cflag:${CID}:320`, 1);
  }, 19);
  await speak_k15(whore, seq_rand(0));
  assert.ok(
    whore.text_lines().some((l) => l.includes('塞的满满的')),
    '肛珠淫乱+A感覚',
  );
  assert.equal(whore.store.get(`cflag:${CID}:320`), 7, '淫乱+A感覚 → 7');

  const love_assi = await setup_k15((f, era_flag) => {
    f.store.set(`tequip:${CID}:19`, 1);
    f.store.set(`talent:${CID}:85`, 1);
    f.store.set(`abl:${CID}:3`, 3);
    f.store.set(`cflag:${CID}:320`, 1);
    era_flag.assiplay = 1;
  }, 19);
  await speak_k15(love_assi, seq_rand(0));
  assert.ok(
    !love_assi.text_lines().some((l) => l.includes('区区')),
    '爱+A感覚+ASSIPLAY 不进爱臂（源 !ASSIPLAY）',
  );
  assert.equal(
    love_assi.store.get(`cflag:${CID}:320`),
    3,
    'ASSIPLAY 落到 A感覚Lv3 臂 → 3',
  );

  const off = await setup_k15((f) => f.store.set(`talent:${CID}:76`, 1), 19);
  await speak_k15(off, seq_rand(0));
  assert.ok(
    off.text_lines().some((l) => l.includes('放更')),
    '肛珠着脱淫乱',
  );
  assert.equal(off.store.get(`cflag:${CID}:379`), 4, '着脱淫乱 → 4');
});

test('正常位 / 背后位 / 对面座位 / 背面座位：处女それ以外 + 二回目淫乱', async () => {
  const v20 = await setup_k15((f) => f.store.set(`talent:${CID}:0`, 1), 20);
  await speak_k15(v20, seq_rand(0));
  assert.ok(
    v20.text_lines().some((l) => l.includes('第一次居然')),
    '正常位初回处女それ以外',
  );
  assert.equal(v20.store.get(`cflag:${CID}:321`), 1, '正常位初回 → 1');

  const w20 = await setup_k15((f) => {
    f.store.set(`talent:${CID}:76`, 1);
    f.store.set(`cflag:${CID}:321`, 1);
  }, 20);
  await speak_k15(w20, seq_rand(0));
  assert.ok(
    w20
      .text_lines()
      .some((l) => l.includes('最棒的了') || l.includes('还要啊')),
    '正常位二回目淫乱 PRINTDATAL',
  );
  assert.equal(w20.store.get(`cflag:${CID}:321`), 6, '正常位淫乱 → 6');

  const w21 = await setup_k15((f) => {
    f.store.set(`talent:${CID}:76`, 1);
    f.store.set(`cflag:${CID}:322`, 1);
  }, 21);
  await speak_k15(w21, seq_rand(0));
  assert.equal(w21.store.get(`cflag:${CID}:322`), 6, '背后位淫乱 → 6');

  const o22 = await setup_k15(undefined, 22);
  await speak_k15(o22, seq_rand(0));
  assert.ok(
    o22.text_lines().some((l) => l.includes('放手！你想要做什么')),
    '对面座位初回非处女それ以外',
  );
  assert.equal(o22.store.get(`cflag:${CID}:323`), 1, '对面座位初回 → 1');

  const s23 = await setup_k15((f) => {
    f.store.set(`mark:${CID}:2`, 3);
    f.store.set(`cflag:${CID}:324`, 1);
  }, 23);
  await speak_k15(s23, seq_rand(0));
  assert.equal(s23.store.get(`cflag:${CID}:324`), 3, '背面座位屈服Lv3 → 3');
});

test('正常位肛交 / 背后位肛交 / 对面座位肛交 / 背面座位肛交', async () => {
  const first = await setup_k15(undefined, 26);
  await speak_k15(first, seq_rand(0));
  assert.ok(
    first.text_lines().some((l) => l.includes('真不敢相信')),
    '正常位肛交初回それ以外',
  );
  assert.equal(first.store.get(`cflag:${CID}:327`), 1, '正常位肛交初回 → 1');

  const whore = await setup_k15((f) => {
    f.store.set(`talent:${CID}:76`, 1);
    f.store.set(`abl:${CID}:3`, 3);
    f.store.set(`cflag:${CID}:327`, 1);
  }, 26);
  await speak_k15(whore, seq_rand(0));
  assert.ok(
    whore.text_lines().some((l) => l.includes('塞得满满的')),
    '正常位肛交淫乱+A感覚',
  );
  assert.equal(whore.store.get(`cflag:${CID}:327`), 7, '淫乱+A感覚 → 7');

  const b27 = await setup_k15((f) => {
    f.store.set(`talent:${CID}:76`, 1);
    f.store.set(`cflag:${CID}:328`, 1);
  }, 27);
  await speak_k15(b27, seq_rand(0));
  assert.equal(b27.store.get(`cflag:${CID}:328`), 6, '背后位肛交淫乱 → 6');

  const f28 = await setup_k15((f) => f.store.set(`talent:${CID}:76`, 1), 28);
  await speak_k15(f28, seq_rand(0));
  assert.ok(
    f28.text_lines().some((l) => l.includes('怕') && l.includes('跑掉')),
    '对面座位肛交初回淫乱',
  );
  assert.equal(f28.store.get(`cflag:${CID}:329`), 1, '对面座位肛交初回 → 1');

  const f29 = await setup_k15(undefined, 29);
  await speak_k15(f29, seq_rand(0));
  assert.ok(
    f29.text_lines().some((l) => l.includes('该不会')),
    '背面座位肛交初回それ以外',
  );
  assert.equal(f29.store.get(`cflag:${CID}:330`), 1, '背面座位肛交初回 → 1');
});

test('手淫 / 口交_奴：初回それ以外 + 二回目淫乱', async () => {
  const h = await setup_k15(undefined, 30);
  await speak_k15(h, seq_rand(0));
  assert.ok(
    h.text_lines().some((l) => l.includes('脏东西')),
    '手淫初回それ以外',
  );
  assert.equal(h.store.get(`cflag:${CID}:331`), 1, '手淫初回 → 1');

  const hw = await setup_k15((f) => {
    f.store.set(`talent:${CID}:76`, 1);
    f.store.set(`abl:${CID}:16`, 3);
    f.store.set(`cflag:${CID}:331`, 1);
  }, 30);
  await speak_k15(hw, seq_rand(0));
  assert.ok(
    hw.text_lines().some((l) => l.includes('快点变大')),
    '手淫淫乱+奉仕Lv3',
  );
  assert.equal(hw.store.get(`cflag:${CID}:331`), 6, '手淫淫乱+奉仕 → 6');

  const o = await setup_k15(undefined, 31);
  await speak_k15(o, seq_rand(0));
  assert.ok(
    o.text_lines().some((l) => l.includes('这么脏的东西')),
    '口交初回それ以外',
  );
  assert.equal(o.store.get(`cflag:${CID}:332`), 1, '口交初回 → 1');

  const ow = await setup_k15((f) => {
    f.store.set(`talent:${CID}:76`, 1);
    f.store.set(`abl:${CID}:16`, 5);
    f.store.set(`cflag:${CID}:332`, 1);
  }, 31);
  await speak_k15(ow, seq_rand(0));
  assert.ok(
    ow.text_lines().some((l) => l.includes('解渴')),
    '口交淫乱+奉仕Lv5',
  );
  assert.equal(ow.store.get(`cflag:${CID}:332`), 6, '口交淫乱+奉仕Lv5 → 6');
});

test('乳交：初回淫乱先写 5 再被外层写成 1；二回目读 CFLAG:332（源缺陷 1:1）', async () => {
  const first = await setup_k15((f) => f.store.set(`talent:${CID}:76`, 1), 32);
  await speak_k15(first, seq_rand(0));
  assert.ok(
    first.text_lines().some((l) => l.includes('用胸部摩擦就会硬')),
    '乳交初回淫乱台词',
  );
  assert.equal(
    first.store.get(`cflag:${CID}:333`),
    1,
    '初回淫乱先写 5 再被 CFLAG:TARGET:333=1 覆盖',
  );

  const later = await setup_k15((f) => {
    f.store.set(`talent:${CID}:76`, 1);
    f.store.set(`abl:${CID}:16`, 5);
    f.store.set(`cflag:${CID}:333`, 1);
    f.store.set(`cflag:${CID}:332`, 6);
    f.store.set('flag:7', 1);
  }, 32);
  await speak_k15(later, seq_rand(0));
  assert.ok(
    later.text_lines().some((l) => l.includes('在胸部上面')),
    '二回目淫乱+奉仕Lv5 读 CFLAG:332 失败后落到奉仕Lv3 臂（源 1:1）',
  );
  assert.equal(
    later.store.get(`cflag:${CID}:333`),
    3,
    'CFLAG:333 被奉仕Lv3 臂写成 3（源读 332 后掉档）',
  );

  const later_ok = await setup_k15((f) => {
    f.store.set(`talent:${CID}:76`, 1);
    f.store.set(`abl:${CID}:16`, 5);
    f.store.set(`cflag:${CID}:333`, 1);
  }, 32);
  await speak_k15(later_ok, seq_rand(0));
  assert.ok(
    later_ok
      .text_lines()
      .some(
        (l) =>
          l.includes('光是用这里摩擦') ||
          l.includes('变得好大') ||
          l.includes('热腾腾的牛奶'),
      ),
    'CFLAG:332 未推进时二回目淫乱+奉仕Lv5 仍出声',
  );
  assert.equal(later_ok.store.get(`cflag:${CID}:333`), 6, '命中时写 6');
});

test('股间性交 / 全身擦洗 / 肛门侍奉：空 PRINTFORMW 仍推进', async () => {
  const g = await setup_k15(undefined, 33);
  await speak_k15(g, seq_rand(0));
  assert.ok(g.text_lines().includes(''), '股间性交初回空 PRINTFORMW');
  assert.equal(g.store.get(`cflag:${CID}:334`), 1, '股间性交初回 → 1');

  const g2 = await setup_k15((f) => {
    f.store.set(`talent:${CID}:76`, 1);
    f.store.set(`talent:${CID}:0`, 1);
    f.store.set(`cflag:${CID}:334`, 1);
  }, 33);
  await speak_k15(g2, seq_rand(0));
  assert.equal(g2.store.get(`cflag:${CID}:334`), 6, '股间性交淫乱处女 → 6');

  const w = await setup_k15(undefined, 35);
  await speak_k15(w, seq_rand(0));
  assert.equal(w.store.get(`cflag:${CID}:336`), 1, '全身擦洗初回 → 1');

  const a = await setup_k15(undefined, 37);
  await speak_k15(a, seq_rand(0));
  assert.equal(a.store.get(`cflag:${CID}:338`), 1, '肛门侍奉初回 → 1');
});

test('骑乘位 / 骑乘位肛交：初回それ以外 + 二回目淫乱', async () => {
  const r = await setup_k15(undefined, 34);
  await speak_k15(r, seq_rand(0));
  assert.ok(
    r.text_lines().some((l) => l.includes('坐上去自己动')),
    '骑乘位初回非处女それ以外',
  );
  assert.equal(r.store.get(`cflag:${CID}:335`), 1, '骑乘位初回 → 1');

  const rw = await setup_k15((f) => {
    f.store.set(`talent:${CID}:76`, 1);
    f.store.set(`cflag:${CID}:335`, 1);
  }, 34);
  await speak_k15(rw, seq_rand(0));
  assert.ok(
    rw.text_lines().some((l) => l.includes('好棒') || l.includes('顶进来了')),
    '骑乘位二回目淫乱',
  );
  assert.equal(rw.store.get(`cflag:${CID}:335`), 6, '骑乘位淫乱 → 6');

  const a = await setup_k15(undefined, 36);
  await speak_k15(a, seq_rand(0));
  assert.ok(
    a.text_lines().some((l) => l.includes('真是变态')),
    '骑乘位肛交初回それ以外',
  );
  assert.equal(a.store.get(`cflag:${CID}:337`), 1, '骑乘位肛交初回 → 1');

  const aw = await setup_k15((f) => {
    f.store.set(`talent:${CID}:76`, 1);
    f.store.set(`abl:${CID}:3`, 3);
    f.store.set(`cflag:${CID}:337`, 1);
  }, 36);
  await speak_k15(aw, seq_rand(0));
  assert.ok(
    aw
      .text_lines()
      .some((l) => l.includes('停不下来') || l.includes('要用屁股高潮')),
    '骑乘位肛交淫乱+A感覚 RAND:2',
  );
  assert.equal(aw.store.get(`cflag:${CID}:337`), 7, '淫乱+A感覚 → 7');
});
