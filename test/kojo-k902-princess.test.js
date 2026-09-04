/**
 * 普林希斯（K902）的口上行为测试（issue #248）。
 *
 * 源: target/ERB/口上/EVENT_K902_普林希丝 ver1.0.3.ERB。
 * K902 是 EX 口上：EX_FLAG:102 是全局存在标志，EX_TALENT:TARGET:102 才是
 * 角色素质守卫，二者不可互换。源 :492-493 的 ASSI 守卫被注释，且无
 * TALENT:9 守卫；COM 头部只测试五道活动守卫。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

const CID = 32;
const KEY = 902;

const seq_rand =
  (...draws) =>
  (n) => {
    const value = draws.shift() ?? 0;
    return value % n;
  };

async function setup_k902(seed, selectcom = 0) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, CID, '普林希斯');
  fixture.era.beginTrain(0, CID);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = CID;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = selectcom;
  fixture.store.set(`ex_talent:${CID}:102`, 1);
  fixture.store.set('exflag:102', 1);
  fixture.store.set('flag:7', 2);
  if (seed) {
    seed(fixture, era_flag);
  }
  fixture.load_module('kojo/kojo-system');
  fixture.load_module('kojo/kojo-k902-princess');
  return fixture;
}

async function emit(fixture, name) {
  const { emit: emit_event } = fixture.load_module('system/event/registry');
  await emit_event(name);
}

async function speak(fixture, rand) {
  const { kojo_message_com_family } = fixture.load_module('kojo/kojo-system');
  return kojo_message_com_family.call(KEY, { args: [rand] });
}

// —— EX 存在标志与 CFLAG:201 ——

test('EVENTTRAIN #PRI 写 EX_FLAG:102、EVENTEND #LATER 清 0', async () => {
  const fixture = await setup_k902((f) => f.store.delete('exflag:102'));
  await emit(fixture, 'EVENTTRAIN');
  assert.equal(
    fixture.store.get('exflag:102'),
    1,
    'EX_FLAG:102 置口上存在标志',
  );
  await emit(fixture, 'EVENTEND');
  assert.equal(fixture.store.get('exflag:102'), 0, 'EVENTEND 清 EX_FLAG:102');
});

test('EVENTTRAIN：EX_TALENT:102 不是 EX_FLAG，缺素质时静默', async () => {
  const fixture = await setup_k902((f) => {
    f.store.set(`ex_talent:${CID}:102`, 0);
    f.store.set('exflag:102', 1);
  });
  await emit(fixture, 'EVENTTRAIN');
  assert.deepEqual(
    fixture.text_lines(),
    [],
    'EX_TALENT:102 缺席不出初调教口上',
  );
  assert.equal(
    fixture.store.get(`cflag:${CID}:201`),
    undefined,
    '不推进初调教',
  );
});

test('CFLAG:201：初回、NTR 再捕获与四档阶段各写到源定值', async () => {
  const first = await setup_k902();
  await emit(first, 'EVENTTRAIN');
  assert.equal(first.store.get(`cflag:${CID}:201`), 1, '初调教推进到 1');

  const ntr = await setup_k902((f) => {
    f.store.set(`cflag:${CID}:201`, 1);
    f.store.set(`cflag:${CID}:650`, 1);
    f.store.set(`talent:${CID}:85`, 1);
  });
  await emit(ntr, 'EVENTTRAIN');
  assert.equal(ntr.store.get(`cflag:${CID}:650`), 0, 'NTR 再捕获清 CFLAG:650');

  const stages = [
    [1, { mark: 1 }, 2, '屈服 Lv1'],
    [2, { mark: 2 }, 3, '屈服 Lv2'],
    [3, { mark: 3 }, 4, '屈服 Lv3'],
    [4, { talent: 76 }, 5, '淫乱'],
    [5, { talent: 85 }, 6, '爱慕'],
  ];
  for (const [before, condition, after, label] of stages) {
    const fixture = await setup_k902((f) => {
      f.store.set(`cflag:${CID}:201`, before);
      if (condition.mark) f.store.set(`mark:${CID}:2`, condition.mark);
      if (condition.talent) f.store.set(`talent:${CID}:${condition.talent}`, 1);
      if (condition.mark === 3 || condition.talent === 76) {
        f.store.set(`talent:${CID}:85`, 0);
      }
    });
    await emit(fixture, 'EVENTTRAIN');
    assert.equal(
      fixture.store.get(`cflag:${CID}:201`),
      after,
      `${label}推进到 ${after}`,
    );
  }
});

// —— @KOJO_MESSAGE_COM_902：源文五道活动守卫 ——

test('COM 守卫① TEQUIP:45 且 SELECTCOM!=45 时静默', async () => {
  const fixture = await setup_k902((f) => f.store.set(`tequip:${CID}:45`, 1));
  await speak(fixture);
  assert.deepEqual(fixture.text_lines(), [], '口塞守卫静默');
});

test('COM 守卫② TFLAG:899 失神时静默', async () => {
  const fixture = await setup_k902((f) => f.store.set('tflag:899', 1));
  await speak(fixture);
  assert.deepEqual(fixture.text_lines(), [], '失神守卫静默');
});

test('COM 守卫③ TEQUIP:89 转入 DOG_KOJO_902 真身', async () => {
  const fixture = await setup_k902((f) => f.store.set(`tequip:${CID}:89`, 1));
  await speak(fixture);
  assert.ok(
    fixture.text_lines().some((line) => line.includes('堂堂本宫')),
    'DOG_KOJO_902 真身台词',
  );
  assert.equal(fixture.store.get(`cflag:${CID}:301`), 1, '兽奸爱抚独立推进');
});

test('COM 守卫④ TEQUIP:90 触手调教时静默', async () => {
  const fixture = await setup_k902((f) => f.store.set(`tequip:${CID}:90`, 1));
  await speak(fixture);
  assert.deepEqual(fixture.text_lines(), [], '触手守卫静默');
});

test('COM 守卫⑤ TEQUIP:55 转入 COLOSSEUM_KOJO_902 真身', async () => {
  const fixture = await setup_k902((f) => {
    f.store.set(`tequip:${CID}:55`, 1);
    f.store.set(`base:${CID}:1`, 0);
  }, 55);
  await speak(fixture);
  assert.deepEqual(fixture.text_lines(), ['普林希斯连站都站不稳了……']);
});

test('COM：源中已注释的 ASSI 与 TALENT:9 两道不启用', async () => {
  for (const [label, seed] of [
    [
      '助手',
      (f, flag) => {
        flag.assi = 1;
        flag.assiplay = 1;
        f.store.set(`mark:${CID}:2`, 2);
      },
    ],
    [
      '崩坏',
      (f) => {
        f.store.set(`talent:${CID}:9`, 1);
        f.store.set(`mark:${CID}:2`, 2);
      },
    ],
  ]) {
    const fixture = await setup_k902(seed);
    await speak(fixture);
    assert.equal(
      fixture.store.get(`cflag:${CID}:301`),
      1,
      `${label}条件不构成 K902 头部守卫`,
    );
  }
});

// —— 代表性 COM 状态机与原作缺陷 ——

test('SELECTCOM:0 爱抚初回与淫乱再入分别推进 1、6', async () => {
  const first = await setup_k902((f) => f.store.set(`mark:${CID}:2`, 2));
  await speak(first);
  assert.equal(first.store.get(`cflag:${CID}:301`), 1, '爱抚初回推进到 1');

  const whore = await setup_k902((f) => {
    f.store.set(`cflag:${CID}:301`, 1);
    f.store.set(`talent:${CID}:76`, 1);
  });
  await speak(whore);
  assert.equal(whore.store.get(`cflag:${CID}:301`), 6, '爱抚淫乱推进到 6');
});

test('SELECTCOM:2 的回退条件错误读取 CFLAG:223（原作缺陷）', async () => {
  const fixture = await setup_k902((f) => {
    f.store.set('flag:7', 1);
    f.store.set(`cflag:${CID}:303`, 1);
    f.store.set(`cflag:${CID}:223`, 2);
    f.store.set('palamlv:2', 1);
  }, 2);
  await speak(fixture);
  assert.deepEqual(
    fixture.text_lines(),
    [],
    '耻情已触发会错误地压住肛门爱抚回退',
  );
  assert.equal(
    fixture.store.get(`cflag:${CID}:303`),
    1,
    '不写 CFLAG:303 回退值',
  );
});

test('SELECTCOM:7 二回目误写 CFLAG:306、保留 CFLAG:308', async () => {
  const fixture = await setup_k902((f) => {
    f.store.set('flag:7', 1);
    f.store.set(`cflag:${CID}:308`, 1);
    f.store.set(`cflag:${CID}:306`, 0);
    f.store.set(`talent:${CID}:76`, 1);
  }, 7);
  await speak(fixture);
  assert.equal(
    fixture.store.get(`cflag:${CID}:308`),
    1,
    '自己扒开计数器保持 1',
  );
  assert.equal(fixture.store.get(`cflag:${CID}:306`), 5, '源误写胸爱抚为 5');
});

test('SELECTCOM:8 插入手指状态机按 CFLAG:309 推进', async () => {
  const fixture = await setup_k902(undefined, 8);
  await speak(fixture);
  assert.equal(
    fixture.store.get(`cflag:${CID}:309`),
    1,
    '插入手指初回推进到 1',
  );
});

test('COM：源文全部活动 SELECTCOM 入口均可达并推进各自状态', async () => {
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
    [11, 372],
    [12, 313],
    [13, 374],
    [14, 375],
    [15, 376],
    [16, 377],
    [19, 379],
    [20, 321],
    [21, 322],
    [22, 323],
    [23, 324],
    [26, 327],
    [27, 328],
    [28, 329],
    [29, 330],
    [30, 331],
    [31, 332],
    [32, 333],
    [33, 334],
    [34, 335],
    [35, 336],
    [36, 337],
    [37, 338],
    [40, 341],
    [41, 342],
    [42, 343],
    [43, 380],
    [44, 385],
    [45, 386],
    [46, 347],
    [55, 356],
    [56, 357],
    [80, 381],
  ];

  for (const [selectcom, cflag] of cases) {
    const fixture = await setup_k902(
      selectcom === 46
        ? (f) => f.store.set(`tequip:${CID}:${selectcom}`, 1)
        : undefined,
      selectcom,
    );
    await speak(fixture, seq_rand(0));
    assert.equal(
      fixture.store.get(`cflag:${CID}:${cflag}`),
      1,
      `SELECTCOM:${selectcom} 推进 CFLAG:${cflag}`,
    );
  }
});

test('COM：带装备的活动 SELECTCOM 卸下分支均可达', async () => {
  const cases = [
    [11, 312],
    [13, 314],
    [14, 315],
    [15, 316],
    [16, 317],
    [19, 320],
    [43, 344],
    [44, 345],
    [45, 346],
  ];

  for (const [selectcom, cflag] of cases) {
    const fixture = await setup_k902((f) => {
      f.store.set(`tequip:${CID}:${selectcom}`, 1);
    }, selectcom);
    await speak(fixture, seq_rand(0));
    assert.equal(
      fixture.store.get(`cflag:${CID}:${cflag}`),
      1,
      `SELECTCOM:${selectcom} 卸下装备推进 CFLAG:${cflag}`,
    );
  }
});

// —— PALAMCNG / MARKCNG 首次阈值 ——

test('PALAMCNG：PALAM:3 + UP:3 首次严格超过 PALAMLV:2 才置 221', async () => {
  const equal = await setup_k902((f) => {
    f.store.set(`palam:${CID}:3`, 500);
    f.store.set(`delta:${CID}:3`, 0);
  });
  const equal_family = equal.load_module('kojo/kojo-system');
  await equal_family.kojo_message_palamcng_family.call(KEY, { args: [] });
  assert.equal(
    equal.store.get(`cflag:${CID}:221`),
    undefined,
    '等于阈值不算首超',
  );

  const over = await setup_k902((f) => {
    f.store.set(`palam:${CID}:3`, 500);
    f.store.set(`delta:${CID}:3`, 1);
  });
  const over_family = over.load_module('kojo/kojo-system');
  await over_family.kojo_message_palamcng_family.call(KEY, { args: [] });
  assert.equal(over.store.get(`cflag:${CID}:221`), 1, '润滑首次超过阈值');
});

test('PALAMCNG：NOWEX 三段寻址首次 C 绝顶置 CFLAG:225', async () => {
  const fixture = await setup_k902((f) => f.store.set(`nowex:${CID}:0`, 1));
  const { kojo_message_palamcng_family } =
    fixture.load_module('kojo/kojo-system');
  await kojo_message_palamcng_family.call(KEY, { args: [] });
  assert.equal(
    fixture.store.get(`cflag:${CID}:225`),
    1,
    'NOWEX:TARGET:0 首次 C 绝顶',
  );
});

test('PALAMCNG：首次耻情保留误写为嘉德的原作台词', async () => {
  const fixture = await setup_k902((f) => {
    f.store.set(`palam:${CID}:8`, 501);
  });
  const { kojo_message_palamcng_family } =
    fixture.load_module('kojo/kojo-system');
  await kojo_message_palamcng_family.call(KEY, { args: [] });
  assert.ok(
    fixture.text_lines().includes('但是嘉德已经涨红了脸，害羞得不得了了'),
    '保留 K902 台词误称嘉德',
  );
});

test('K902_KOJO2：两处重复 TALENT:74 判断使第二支保持不可达', async () => {
  for (const [lead_talent, unreachable_text] of [
    [76, '湿嗒嗒'],
    [85, '灵肉交汇'],
  ]) {
    const fixture = await setup_k902((f) => {
      f.store.set(`mark:${CID}:2`, 3);
      f.store.set(`talent:${CID}:${lead_talent}`, 1);
      f.store.set(`talent:${CID}:75`, 1);
    });
    const { k902_kojo2 } = fixture.load_module('kojo/kojo-k902-princess');
    await k902_kojo2();
    assert.equal(
      fixture.text_lines().some((line) => line.includes(unreachable_text)),
      false,
      `重复 TALENT:74 压住第二支：${unreachable_text}`,
    );
  }
});

test('MARKCNG：四个刻印首次三级各置对应 CFLAG', async () => {
  const fixture = await setup_k902();
  const { game } = fixture.load_module('facade/game');
  const { kojo_message_markcng_family } =
    fixture.load_module('kojo/kojo-system');
  for (const [field, cflag, label] of [
    ['反抗刻印变动', 300, '反抗'],
    ['苦痛刻印变动', 297, '苦痛'],
    ['快乐刻印变动', 298, '快乐'],
    ['屈服刻印变动', 299, '屈服'],
  ]) {
    game.system[field] = 3;
    await kojo_message_markcng_family.call(KEY, { args: [] });
    assert.equal(
      fixture.store.get(`cflag:${CID}:${cflag}`),
      1,
      `${label}刻印 Lv3 首次`,
    );
    game.system[field] = 0;
  }
});

// —— 非调教入口与残留变量缺陷 ——

test('非调教 20 个分发族均注册 K902', async () => {
  const fixture = await setup_k902();
  const kojo = fixture.load_module('kojo/kojo-system');
  const after = fixture.load_module('kojo/kojo-dungeon-after');
  const ravish = fixture.load_module('kojo/kojo-dungeon-ravish');
  const families = [
    kojo.kojo_message_com_family,
    kojo.self_kojo_family,
    kojo.kojo_message_palamcng_family,
    kojo.kojo_message_markcng_family,
    kojo.benki_koujo_family,
    kojo.enterenemy_koujo_family,
    kojo.dungeon_victory_family,
    kojo.dungeon_attack_family,
    kojo.ntr_koujo_family,
    kojo.exucution_koujo_family,
    kojo.museum_koujo_family,
    kojo.banishment_koujo_family,
    kojo.public_exucution_koujo_family,
    kojo.grotesque_koujo_family,
    kojo.gobi_koujo_family,
    after.gohoubi_after_koujo_family,
    after.osioski_koujo_family,
    after.gohoubi_request_koujo_family,
    ravish.ryouzyoku_kojo_family,
    ravish.ryouzyoku_after_kojo_family,
  ];
  for (const family of families) {
    assert.equal(family.has(KEY), true, `${family.name} 注册 K902`);
  }
});

test('迷宫凌辱、BENKI、NTR、处刑与流放各有可达真身', async () => {
  const fixture = await setup_k902((f) => f.store.set(`talent:${CID}:0`, 1));
  const kojo = fixture.load_module('kojo/kojo-system');
  const ravish = fixture.load_module('kojo/kojo-dungeon-ravish');
  await ravish.ryouzyoku_kojo_family.call(KEY, { args: [] });
  assert.ok(
    fixture.text_lines().some((line) => line.includes('放开本宫')),
    '迷宫凌辱',
  );

  const game = fixture.load_module('facade/game').game;
  game.train.肉便器行动 = 0;
  await kojo.benki_koujo_family.call(KEY, { args: [] });
  assert.ok(
    fixture.text_lines().some((line) => line.includes('失去了力量')),
    'BENKI',
  );

  await kojo.ntr_koujo_family.call(KEY, { args: [seq_rand(0), 1] });
  assert.equal(fixture.store.get(`cflag:${CID}:650`), 1, 'NTR P=1 置再捕获');

  game.event.犬射精或处刑口上 = 4;
  await kojo.exucution_koujo_family.call(KEY, { args: [] });
  assert.ok(
    fixture.text_lines().some((line) => line.includes('侍奉怪物')),
    '处刑',
  );

  game.event.流放口上 = 0;
  await kojo.banishment_koujo_family.call(KEY, { args: [] });
  assert.ok(
    fixture.text_lines().some((line) => line.includes('力量')),
    '流放',
  );
});

test('GOHOUBI_REQUEST 奖励 2/3 的 Y 残留保持未赋值分支', async () => {
  const fixture = await setup_k902((f) => f.store.set(`cflag:${CID}:504`, 2));
  const { gohoubi_request_koujo_family } = fixture.load_module(
    'kojo/kojo-dungeon-after',
  );
  await gohoubi_request_koujo_family.call(KEY, { args: [CID, undefined] });
  assert.deepEqual(
    fixture.text_lines(),
    ['「魔王大人，你懂得的吧…让本宫和', '好好地玩・一・玩吧♪」'],
    'Y 残留为 0，不补公猪或雄马',
  );
});

test('GOBI 参数 1 输出固定语尾', async () => {
  const fixture = await setup_k902();
  const { gobi_koujo_family } = fixture.load_module('kojo/kojo-system');
  await gobi_koujo_family.call(KEY, { args: [1, seq_rand(0)] });
  assert.deepEqual(fixture.text_lines(), ['哦～♪']);
});
