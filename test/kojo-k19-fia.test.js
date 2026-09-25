/**
 * ere/kojo/kojo-k19-fia.js 的行为测试（issue #247：J37 口上·K19 菲娅）。
 *
 * 缝 = test/helpers/era-fixture.js。世界底座：菲娅（性格素质 179 →
 * GET_KOJO_NUM = 119 → 分发 key 19）。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');
const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

const CID = 35;
const KEY = 19;

async function setup_k19(seed, selectcom = 0) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, CID, '菲娅');
  fixture.era.beginTrain(0, CID);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = CID;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = selectcom;
  fixture.store.set(`talent:${CID}:179`, 1);
  for (const talent of [0, 9, 76, 85, 314]) {
    fixture.store.set(`talent:${CID}:${talent}`, 0);
  }
  for (const mark of [0, 1, 2, 3]) {
    fixture.store.set(`mark:${CID}:${mark}`, 0);
  }
  fixture.store.set('flag:119', 1);
  fixture.store.set('flag:7', 2);
  if (seed) seed(fixture, era_flag);
  fixture.load_module('kojo/kojo-system');
  fixture.load_module('kojo/kojo-k19-fia');
  return fixture;
}

async function emit(fixture, event) {
  const registry = fixture.load_module('system/event/registry');
  await registry.emit(event);
}

async function speak_k19(fixture, rand = () => 0) {
  const { kojo_message_com_family } = fixture.load_module('kojo/kojo-system');
  return kojo_message_com_family.call(KEY, { args: [rand] });
}

async function palam_k19(fixture) {
  const { kojo_message_palamcng_family } =
    fixture.load_module('kojo/kojo-system');
  return kojo_message_palamcng_family.call(KEY, { args: [] });
}

async function mark_k19(fixture) {
  const { kojo_message_markcng_family } =
    fixture.load_module('kojo/kojo-system');
  return kojo_message_markcng_family.call(KEY, { args: [] });
}

async function self_k19(fixture) {
  const { self_kojo_family } = fixture.load_module('kojo/kojo-system');
  return self_kojo_family.call(KEY, { args: [] });
}

test('@EVENTTRAIN #PRI 置存在标志并补总开关，@EVENTEND #LATER 清标志', async () => {
  const fixture = await setup_k19((f) => {
    f.store.delete('flag:119');
    f.store.set('flag:7', 0);
    f.store.set(`cflag:${CID}:201`, 9);
  });
  await emit(fixture, 'EVENTTRAIN');
  assert.equal(fixture.store.get('flag:119'), 1, 'K19 存在标志置 1');
  assert.equal(fixture.store.get('flag:7'), 2, '口上总开关从 0 补到 2');
  await emit(fixture, 'EVENTEND');
  assert.equal(fixture.store.get('flag:119'), 0, 'K19 存在标志清 0');
});

test('EVENTTRAIN 初调教推进 CFLAG:201，人类与魔族分档', async () => {
  const human = await setup_k19();
  await emit(human, 'EVENTTRAIN');
  assert.equal(human.store.get(`cflag:${CID}:201`), 1, '人类初调教推进到 1');
  assert.ok(
    human.text_lines().some((line) => line.includes('你是坏人吧')),
    '人类初调教台词',
  );

  const demon = await setup_k19((f) => f.store.set(`talent:${CID}:314`, 9));
  await emit(demon, 'EVENTTRAIN');
  assert.equal(demon.store.get(`cflag:${CID}:201`), 1, '魔族初调教推进到 1');
  assert.equal(demon.store.get(`cflag:${CID}:370`), 1, '魔族化计数置 1');
});

test('EVENTTRAIN CFLAG:201 主状态机逐档推进到 2–9', async () => {
  const cases = [
    [1, 2, (f) => f.store.set(`mark:${CID}:2`, 1)],
    [2, 3, (f) => f.store.set(`mark:${CID}:2`, 2)],
    [3, 4, (f) => f.store.set(`mark:${CID}:2`, 3)],
    [4, 5, (f) => f.store.set(`talent:${CID}:76`, 1)],
    [
      5,
      6,
      (f) => {
        f.store.set(`talent:${CID}:314`, 9);
        f.store.set(`talent:${CID}:76`, 1);
      },
    ],
    [6, 7, (f) => f.store.set(`talent:${CID}:85`, 1)],
    [
      7,
      8,
      (f) => {
        f.store.set(`talent:${CID}:314`, 9);
        f.store.set(`talent:${CID}:85`, 1);
        f.store.set(`cflag:${CID}:370`, 1);
      },
    ],
    [8, 9, (f) => f.store.set(`talent:${CID}:9`, 1)],
  ];
  for (const [before, after, seed] of cases) {
    const fixture = await setup_k19((f) => {
      f.store.set(`cflag:${CID}:201`, before);
      f.store.set(`cflag:${CID}:650`, 0);
      seed(f);
    });
    await emit(fixture, 'EVENTTRAIN');
    assert.equal(
      fixture.store.get(`cflag:${CID}:201`),
      after,
      `初调教主状态机 ${before} → ${after}`,
    );
  }
});

for (const guard of [
  ['助手调教', (_f, flag) => ((flag.assi = 1), (flag.assiplay = 1))],
  ['口塞', (f) => f.store.set(`tequip:${CID}:45`, 1)],
  ['失神', (f) => f.store.set('tflag:899', 1)],
  ['兽奸', (f) => f.store.set(`tequip:${CID}:89`, 1)],
  ['触手', (f) => f.store.set(`tequip:${CID}:90`, 1)],
  ['崩坏', (f) => f.store.set(`talent:${CID}:9`, 1)],
]) {
  test(`KOJO_MESSAGE_COM 头部守卫：${guard[0]}静默跳过`, async () => {
    const fixture = await setup_k19((f, flag) => {
      f.store.set(`cflag:${CID}:301`, 0);
      guard[1](f, flag);
    });
    await speak_k19(fixture);
    assert.deepEqual(fixture.text_lines(), [], `${guard[0]}守卫无输出`);
    assert.equal(
      fixture.store.get(`cflag:${CID}:301`),
      0,
      `${guard[0]}守卫不推进爱抚计数`,
    );
  });
}

test('KOJO_MESSAGE_COM 头部守卫：死斗场转入专用口上', async () => {
  const fixture = await setup_k19(
    (f) => f.store.set(`tequip:${CID}:55`, 1),
    55,
  );
  await speak_k19(fixture);
  assert.ok(
    fixture.text_lines().some((line) => line.includes('死斗场')),
    '死斗场守卫转入专用口上',
  );
});

test('SELECTCOM 0 爱抚首回合：输出并将 CFLAG:301 从 0 推进到 1', async () => {
  const fixture = await setup_k19();
  await speak_k19(fixture);
  assert.equal(fixture.store.get(`cflag:${CID}:301`), 1, '爱抚计数推进到 1');
  assert.ok(fixture.text_lines().length > 0, '爱抚首回合有角色台词');
});

test('KOJO_MESSAGE_COM：全部 SELECTCOM 顶层分支的首回合状态可达', async () => {
  const cases = [
    [0, 301],
    [1, 302],
    [2, 303],
    [3, 304],
    [5, 306],
    [6, 307],
    [7, 308],
    [8, 309],
    [9, 310],
    [10, 311],
    [11, 312, 11, 1],
    [11, 372, 11, 0],
    [12, 313],
    [13, 314, 13, 1],
    [13, 374, 13, 0],
    [14, 315, 14, 1],
    [14, 375, 14, 0],
    [15, 316, 15, 1],
    [15, 376, 15, 0],
    [19, 320, 19, 1],
    [19, 379, 19, 0],
    [20, 321],
    [21, 322],
    [22, 323],
    [23, 324],
    [26, 327],
    [27, 328],
    [28, 329],
    [29, 337],
    [30, 331],
    [31, 332],
    [32, 333],
    [33, 334],
    [34, 335],
    [35, 336],
    [36, 337],
    [37, 338],
    [38, 339],
    [40, 341],
    [41, 342],
    [42, 343],
    [43, 344, 43, 1],
    [43, 380, 43, 0],
    [44, 345, 44, 1],
    [44, 385, 44, 0],
    [45, 346, 45, 1],
    [45, 386, 45, 0],
    [46, 347, 46, 1],
    [55, 356],
    [56, 357],
    [125, 361],
    [126, 362],
    [127, 363],
    [69, 364],
    [124, 365],
    [80, 381],
  ];
  for (const [selectcom, counter, tequip, equipped] of cases) {
    const fixture = await setup_k19((f) => {
      if (tequip) f.store.set(`tequip:${CID}:${tequip}`, equipped);
    }, selectcom);
    await speak_k19(fixture);
    assert.equal(
      fixture.store.get(`cflag:${CID}:${counter}`),
      1,
      `SELECTCOM ${selectcom}${tequip ? ` TEQUIP:${tequip}=${equipped}` : ''} 首回合推进 CFLAG:${counter}`,
    );
  }
});

test('KOJO_MESSAGE_COM：全部可达计数器至少推进一个后续档', async () => {
  const cases = [
    [0, 301, 2],
    [1, 302, 2],
    [2, 303, 2],
    [3, 304, 2],
    [5, 306, 2],
    [6, 307, 2],
    [8, 309, 2],
    [9, 310, 2],
    [10, 311, 2],
    [11, 312, 2, 11, 1],
    [11, 372, 3, 11, 0, 85],
    [12, 313, 2],
    [13, 314, 2, 13, 1],
    [13, 374, 3, 13, 0, 85],
    [14, 315, 2, 14, 1],
    [14, 375, 2, 14, 0, 85],
    [15, 316, 2, 15, 1],
    [15, 376, 2, 15, 0, 85],
    [19, 320, 2, 19, 1],
    [19, 379, 3, 19, 0, 85],
    [20, 321, 2],
    [21, 322, 2],
    [22, 323, 2],
    [23, 324, 2],
    [26, 327, 2],
    [27, 328, 2],
    [28, 329, 2],
    [29, 337, 2],
    [30, 331, 2],
    [31, 332, 2],
    [32, 333, 2],
    [33, 334, 2],
    [34, 335, 2],
    [35, 336, 2],
    [36, 337, 2],
    [37, 338, 2],
    [38, 339, 2],
    [40, 341, 2],
    [41, 342, 2],
    [42, 343, 2],
    [43, 344, 2, 43, 1],
    [43, 380, 2, 43, 0, 85],
    [44, 345, 2, 44, 1],
    [44, 385, 2, 44, 0, 85],
    [45, 346, 2, 45, 1],
    [45, 386, 2, 45, 0, 85],
    [46, 347, 2, 46, 1],
    [55, 356, 2, 55, 0],
    [56, 357, 1, 55, 0],
    [125, 361, 2],
    [126, 362, 2],
    [127, 363, 2],
    [69, 364, 2],
    [124, 365, 2],
    [80, 381, 2],
  ];
  for (const [
    selectcom,
    counter,
    expected,
    tequip,
    equipped,
    talent,
  ] of cases) {
    const fixture = await setup_k19((f) => {
      f.store.set(`cflag:${CID}:${counter}`, 1);
      if (tequip) f.store.set(`tequip:${CID}:${tequip}`, equipped);
      if (talent) f.store.set(`talent:${CID}:${talent}`, 1);
    }, selectcom);
    await speak_k19(fixture);
    assert.equal(
      fixture.store.get(`cflag:${CID}:${counter}`),
      expected,
      `SELECTCOM ${selectcom}${tequip ? ` TEQUIP:${tequip}=${equipped}` : ''} 后续档推进 CFLAG:${counter}=${expected}`,
    );
  }
});

test('原作缺陷：SELECTCOM 56 少 ENDIF，使 SELECTCOM 123 不可达', async () => {
  const fixture = await setup_k19(undefined, 123);
  await speak_k19(fixture);
  assert.equal(
    fixture.store.get(`cflag:${CID}:360`),
    undefined,
    '原作缺 ENDIF：SELECTCOM 123 的 CFLAG:360 不可达',
  );
});

test('PALAMCNG：润滑首超、四类 NOWEX 首次绝顶分别推进状态', async () => {
  const fixture = await setup_k19((f) => {
    for (const index of [3, 5, 8, 10])
      f.store.set(`palam:${CID}:${index}`, 600);
    f.store.set('tflag:3', 1);
    for (const index of [0, 1, 2, 3]) f.store.set(`nowex:${CID}:${index}`, 1);
  });
  await palam_k19(fixture);
  for (const [index, label] of [
    [221, '首次润滑'],
    [222, '首次欲情'],
    [223, '首次耻情'],
    [224, '首次恐怖'],
    [225, '首次C绝顶'],
    [226, '首次V绝顶'],
    [227, '首次A绝顶'],
    [228, '首次B绝顶'],
  ]) {
    assert.equal(fixture.store.get(`cflag:${CID}:${index}`), 1, `${label}推进`);
  }
  assert.equal(fixture.store.get(`cflag:${CID}:229`), 1, '处女丧失推进');
});

test('MARKCNG：苦痛、快乐、屈服、反抗刻印首超分别推进', async () => {
  const fixture = await setup_k19((f) => {
    for (const index of [21, 22, 23, 24]) f.store.set(`tflag:${index}`, 3);
  });
  await mark_k19(fixture);
  for (const [index, label] of [
    [297, '苦痛刻印'],
    [298, '快乐刻印'],
    [299, '屈服刻印'],
    [300, '反抗刻印'],
  ]) {
    assert.equal(
      fixture.store.get(`cflag:${CID}:${index}`),
      1,
      `${label}首超推进`,
    );
  }
});

test('SELF_KOJO 读取全局 Q 并在结束时清 TFLAG:13', async () => {
  const fixture = await setup_k19((f, era_flag) => {
    join_slave_chara(f, 1, '助手');
    era_flag.assi = 1;
    f.store.set('tflag:13', 1);
  });
  const after = fixture.load_module('event/event-aftertrain');
  fixture.store.set(`abl:${CID}:0`, 3);
  fixture.store.set(`abl:${CID}:11`, 2);
  fixture.store.set(`abl:${CID}:31`, 2);
  fixture.store.set(`abl:${CID}:22`, 4);
  fixture.store.set(`base:${CID}:0`, 1000);
  await after.aftertrain_masturbation_check(0, 1, () => 2);
  assert.equal(after.peek_aftertrain_q(), 1, '全局 Q 由调教后判定置 1');
  assert.equal(fixture.store.get('tflag:13'), 0, 'SELF_KOJO 清 TFLAG:13');
  assert.ok(fixture.text_lines().length > 0, 'SELF_KOJO Q==1 有输出');
});

test('SELF_KOJO 各阶段推进 CFLAG:261–265 与 271–274', async () => {
  for (const [phase, counter] of [
    [1, 261],
    [2, 262],
    [3, 263],
    [4, 264],
    [5, 265],
    [11, 271],
    [12, 272],
    [13, 273],
    [14, 274],
  ]) {
    const fixture = await setup_k19((f) => f.store.set('tflag:13', phase));
    await self_k19(fixture);
    assert.equal(
      fixture.store.get(`cflag:${CID}:${counter}`),
      1,
      `SELF_KOJO TFLAG:13=${phase} 推进 CFLAG:${counter}`,
    );
    assert.equal(
      fixture.store.get('tflag:13'),
      0,
      `SELF_KOJO ${phase} 后清 TFLAG:13`,
    );
  }
});

test('原作缺陷：自己扒开用 308 判首次、二次却推进胸部爱抚 306', async () => {
  const first = await setup_k19(undefined, 7);
  await speak_k19(first);
  assert.equal(first.store.get(`cflag:${CID}:308`), 1, '首次推进 CFLAG:308');

  const repeat = await setup_k19((f) => {
    f.store.set(`cflag:${CID}:308`, 1);
    f.store.set(`cflag:${CID}:306`, 0);
  }, 7);
  await speak_k19(repeat);
  assert.equal(
    repeat.store.get(`cflag:${CID}:308`),
    1,
    '二次不再推进 CFLAG:308',
  );
  assert.equal(
    repeat.store.get(`cflag:${CID}:306`),
    2,
    '原作缺陷推进 CFLAG:306',
  );
});

test('原作缺陷：MUSEUM 在 TFLAG:500 分派前无条件返回', async () => {
  const fixture = await setup_k19();
  const { game } = fixture.load_module('facade/game');
  game.event.博物馆口上 = 9;
  const { museum_koujo_family } = fixture.load_module('kojo/kojo-system');
  await museum_koujo_family.call(KEY, { args: [] });
  assert.equal(fixture.text_lines().length, 1, '无条件 RETURN 后分派段不可达');
});

test('非调教族：NTR、处刑与语尾均注册并执行关键状态', async () => {
  const fixture = await setup_k19();
  const system = fixture.load_module('kojo/kojo-system');
  await system.ntr_koujo_family.call(KEY, { args: [1] });
  assert.equal(fixture.store.get(`cflag:${CID}:650`), 1, 'NTR 再捕获状态推进');
  assert.equal(fixture.store.get(`cflag:${CID}:651`), 1, 'NTR P==1 状态推进');

  const { game } = fixture.load_module('facade/game');
  game.event.犬射精或处刑口上 = 4;
  await system.exucution_koujo_family.call(KEY, { args: [] });
  const before = fixture.text_lines().length;
  const gobi_text = await system.gobi_koujo_family.call(KEY, {
    args: [1, () => 0],
  });
  assert.equal(gobi_text, '，诶嘿嘿～♪', '语尾返回文字（#570）');
  assert.equal(
    fixture.text_lines().length,
    before,
    '语尾真身不打印（行内拼接由调用方做）',
  );
});

// —— #625：原作同一行被拆成多条 era.print 的合并点 ——

test('#625 交谈·自我介绍：名字与后续是同一行（:4340 / :4410 两处 × ABL:31 两档）', async () => {
  // 原作 :4340（PRINTFORM）+ :4342（SIF ABL:31 >= 3 只护这一段）+ :4343
  // （PRINTFORMW 收行）**是一整行**，:4410+:4412+:4413 是二次以后的同型行；
  // ere 侧曾各拆成三条 era.print（#625）
  const cases = [
    [0, 0],
    [0, 3],
    [1, 0],
    [1, 3],
  ];
  for (const [talked, abl31] of cases) {
    const fixture = await setup_k19((f) => {
      f.store.set(`tequip:${CID}:53`, 1); // 摄影中
      f.store.set(`abl:${CID}:17`, 5); // :4339 的 (TALENT:89 || ABL:17 >= 5)
      f.store.set(`abl:${CID}:31`, abl31);
      if (talked) {
        f.load_module('facade/chara').chara(CID).kojo.交谈 = 1; // 二次以后
      }
    }, 56);
    await speak_k19(fixture);
    const merged = fixture.text_lines().find((l) => l.startsWith('于是'));
    assert.ok(merged, `交谈${talked ? '二次' : '首次'}：自我介绍必须出声`);
    assert.ok(
      merged.endsWith('之类的介绍了出来……') &&
        (abl31 >= 3
          ? merged ===
            '于是菲娅将自己的名字、喜欢的H的方式还有手淫时妄想的内容之类的介绍了出来……'
          : merged === '于是菲娅将自己的名字、喜欢的H的方式之类的介绍了出来……'),
      `交谈${talked ? '二次' : '首次'}（ABL:31==${abl31}）：名字段与后文落在同一行（#625）`,
    );
  }
});

test('#625 交谈·压抑着呼吸声：工具档与前后文同一行（:4375 / :4446 两处 × 两档）', async () => {
  // 原作 :4375+:4377+:4379+:4381（无 ELSE，两档都不满足时中间为空）与
  // :4446+:4448+:4450+:4452 各是一整行，末行 PRINTFORML 收行；ere 侧曾各拆成
  // 四条 era.print（#625）。:4446 那一处还在 :4440 的 PLAYER 前缀行之后，
  // 行首要带前缀
  const cases = [
    { talked: 0, tequip: 11, prefix: '' },
    { talked: 0, tequip: 44, prefix: '' },
    { talked: 1, tequip: 11, prefix: '你' },
    { talked: 1, tequip: 44, prefix: '你' },
  ];
  for (const { talked, tequip, prefix } of cases) {
    const fixture = await setup_k19((f) => {
      f.store.set(`palam:${CID}:5`, 10000); // >= PALAMLV[4]
      f.store.set(`palam:${CID}:4`, 10000);
      f.store.set(`tequip:${CID}:${tequip}`, 1);
      if (talked) {
        f.load_module('facade/chara').chara(CID).kojo.交谈 = 1;
      }
    }, 56);
    await speak_k19(fixture);
    const word = tequip === 11 ? '快乐的' : '痛苦的';
    assert.deepEqual(
      fixture.text_lines(),
      [`${prefix}菲娅一边压抑着${word}呼吸声，一边努力回应着你……`],
      `交谈${talked ? '二次' : '首次'}（${word}档）：工具档与前后文落在同一行（#625）`,
    );
  }
});

test('#625 交谈·PLAYER 前缀行与各互斥尾段同属一行（:4440 与 :4442/:4444/:4455/:4458/:4461/:4464）', async () => {
  // 原作 :4440 的 `PRINTFORM %SAVESTR:PLAYER%` 不换行，随后的 IF/ELSEIF 各支
  // 用自己的 PRINTFORML 收行——整条链每一支都是「前缀 + 尾段」的一行。ere 侧
  // 曾把前缀单独打成一行（#625）。各支各断言整行
  const cases = [
    {
      name: ':4442 爱慕+插着不拔',
      seed: (f) => {
        f.store.set(`palam:${CID}:5`, 10000);
        f.store.set(`talent:${CID}:85`, 1);
        f.load_module('facade/game').game.event.插着不拔 = 1;
      },
      line: '你菲娅一边与你说着话，一边对着你露出了重要的地方。',
    },
    {
      name: ':4444 淫乱+插着不拔',
      seed: (f) => {
        f.store.set(`palam:${CID}:5`, 10000);
        f.store.set(`talent:${CID}:76`, 1);
        f.load_module('facade/game').game.event.插着不拔 = 1;
      },
      line: '你菲娅开心的朝着你撒着娇，对着你说着色色的话语。',
    },
    {
      name: ':4455 淫乱（无插着不拔、欲情低）',
      seed: (f) => f.store.set(`talent:${CID}:76`, 1),
      line: '你菲娅一边这么说着，一边对着你露出了重要的地方。',
    },
    {
      name: ':4458 欲情LV4 但欲情5 未达标',
      seed: (f) => f.store.set(`palam:${CID}:4`, 10000),
      line: '你菲娅开心的朝着你撒着娇，说着色色的话语。',
    },
    {
      name: ':4461 技巧Lv3',
      seed: (f) => f.store.set(`abl:${CID}:10`, 3),
      line: '你菲娅大口大口的喘着气，小小的身体因为快感而像触电一样痉挛个不停。',
    },
    {
      name: ':4464 都不满足',
      seed: () => {},
      line: '你菲娅乖巧的低着头听着。',
    },
  ];
  for (const { name, seed, line } of cases) {
    const fixture = await setup_k19((f) => {
      seed(f);
      f.load_module('facade/chara').chara(CID).kojo.交谈 = 1;
    }, 56);
    await speak_k19(fixture);
    assert.ok(
      fixture.text_lines().includes(line),
      `${name}：PLAYER 前缀与尾段落在同一行（#625）`,
    );
  }
});

test('#625 COLOSSEUM_KOJO_19：SC31/21/27 武器名与前后文同一行（三种 selectcom × 三档）', async () => {
  // 原作 :6160+:6162+:6164+:6165、:6193+:6195+:6197+:6198、:6217+:6219+
  // :6221+:6222 各是一整行（无后缀 PRINT 不换行，末行 PRINTFORMW 收行），
  // ere 侧曾把每行拆成四条 era.print（#625）。助手臂在 KOJO_MESSAGE_COM 的
  // ASSI 守卫之后、运行时不带助手才可达，直接调真身覆盖（同 K2/K4/K903）
  const cases = [
    {
      selectcom: 31,
      quote: '「啊唔…我、我会好好舔的…不要做很痛的事……嗯咕……」',
      head: '玛奥因为',
      tail: '被菲娅含住而露出了快乐的的表情……',
      weapon_penis: '阴茎',
    },
    {
      selectcom: 21,
      quote: '「不要不要…太过分了…不要了啊…啊啊！」',
      head: '玛奥一边听着悲鸣，一边用',
      tail: '毫不留情的继续蹂躏着菲娅的腔内……',
      weapon_penis: '肉棒',
    },
    {
      selectcom: 27,
      quote: '「不要不要…不是插进哪里啊…不要了啊…啊啊！」',
      head: '玛奥一边听着悲鸣，一边用',
      tail: '毫不留情的继续蹂躏着菲娅的肛门……',
      weapon_penis: '肉棒',
    },
  ];
  for (const { selectcom, quote, head, tail, weapon_penis } of cases) {
    const tiers = [
      { weapon: weapon_penis, seed: (f) => f.store.set('talent:17:121', 1) },
      { weapon: '假阴茎', seed: (f) => f.store.set('item:4', 1) },
      { weapon: '', seed: undefined },
    ];
    for (const { weapon, seed } of tiers) {
      const fixture = await setup_k19((f, era_flag) => {
        join_slave_chara(f, 17, '玛奥');
        f.store.set(`tequip:${CID}:55`, 1); // 死斗场
        era_flag.assi = 17;
        era_flag.assiplay = 1;
        if (seed) {
          seed(f);
        }
      }, selectcom);
      const { colosseum_kojo_19 } = fixture.load_module('kojo/kojo-k19-fia');
      await colosseum_kojo_19();
      assert.ok(
        fixture.text_lines().includes(quote),
        `selectcom ${selectcom}：开场白仍在`,
      );
      assert.ok(
        fixture.text_lines().includes(`${head}${weapon}${tail}`),
        `selectcom ${selectcom}（武器档「${weapon}」）：武器名与前后文落在同一行（#625）`,
      );
    }
  }
});

test('#625 GOHOUBI_REQUEST：空首尾夹着的兽名单独成行（CFLAG:504 三档）', async () => {
  // 原作 :6525（PRINTFORM 空串）+ :6527/:6529/:6531（IF/ELSEIF 三档兽名）
  // + :6533（PRINTFORMW 空串）**是一整行**，内容只有兽名；ere 侧曾拆成
  // 三条 era.print（前后两条还是空行）（#625）
  const cases = [
    [1, '犬'],
    [2, '豚'],
    [3, '马'],
  ];
  for (const [req, beast] of cases) {
    const fixture = await setup_k19((f) => {
      f.load_module('facade/chara').chara(CID).stronghold.要求奖赏 = req;
    });
    const { gohoubi_request_koujo_family } = fixture.load_module(
      'kojo/kojo-dungeon-after',
    );
    await gohoubi_request_koujo_family.call(KEY, { args: [CID] });
    assert.deepEqual(
      fixture.text_lines(),
      [beast],
      `CFLAG:504==${req}：空首尾不再各占一行（#625）`,
    );
  }
});
