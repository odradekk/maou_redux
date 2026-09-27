/**
 * 嘉德 K903 的口上行为测试（issue #249）。
 *
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_chara_0, join_slave_chara } = require('./helpers/chara');

const CID = 33;
const KEY = 903;

async function setup_k903(seed, selectcom = 0) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, CID, '嘉德');
  fixture.era.beginTrain(0, CID);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = CID;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = selectcom;
  fixture.store.set(`ex_talent:${CID}:103`, 1);
  fixture.store.set('flag:7', 2);
  if (seed) seed(fixture, era_flag);
  fixture.load_module('kojo/kojo-system');
  fixture.load_module('kojo/kojo-k903-garde');
  return fixture;
}

async function speak(fixture) {
  const { kojo_message_com_family } = fixture.load_module('kojo/kojo-system');
  return kojo_message_com_family.call(KEY, { args: [] });
}

async function palam_change(fixture) {
  const { kojo_message_palamcng_family } =
    fixture.load_module('kojo/kojo-system');
  return kojo_message_palamcng_family.call(KEY, { args: [] });
}

async function mark_change(fixture) {
  const { kojo_message_markcng_family } =
    fixture.load_module('kojo/kojo-system');
  return kojo_message_markcng_family.call(KEY, { args: [] });
}

test('EX_FLAG:103 生命周期：EVENTTRAIN 置 1，EVENTEND 清 0', async () => {
  const fixture = await setup_k903((f) => f.store.delete('exflag:103'));
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(fixture.store.get('exflag:103'), 1, 'EVENTTRAIN 置 EX_FLAG:103');
  await emit('EVENTEND');
  assert.equal(fixture.store.get('exflag:103'), 0, 'EVENTEND 清 EX_FLAG:103');
});

test('EX_TALENT:103 缺席时不进入嘉德调教口上', async () => {
  const fixture = await setup_k903((f) => {
    f.store.delete(`ex_talent:${CID}:103`);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(fixture.store.get(`cflag:${CID}:201`) || 0, 0);
  assert.deepEqual(fixture.text_lines(), []);
});

test('EVENTEND 调教结束正文只执行一次', async () => {
  const fixture = await setup_k903((f) => {
    f.store.set(`base:${CID}:0`, 100);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTEND');
  assert.deepEqual(fixture.text_lines(), ['「啊……可恶……已经………………」']);
});

test('EVENTEND 体力归零时先打印遗言再打印结束语', async () => {
  const fixture = await setup_k903((f) => {
    f.store.set(`base:${CID}:0`, 0);
  });
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTEND');
  assert.deepEqual(fixture.text_lines(), [
    '「明明……明明……马上就要取代那个老糊涂的……」',
    '「啊……可恶……已经………………」',
  ]);
});

test('CFLAG:201：初调教、屈服 1-3、淫乱、爱慕六档都按源推进，NTR:650 清零', async () => {
  const cases = [
    [{}, 1],
    [{ 'cflag:33:201': 1, 'mark:33:2': 1 }, 2],
    [{ 'cflag:33:201': 2, 'mark:33:2': 2 }, 3],
    [{ 'cflag:33:201': 3, 'mark:33:2': 3, 'talent:33:85': 0 }, 4],
    [{ 'cflag:33:201': 4, 'talent:33:76': 1, 'talent:33:85': 0 }, 5],
    [{ 'cflag:33:201': 5, 'talent:33:85': 1 }, 6],
  ];
  for (const [seed, expected] of cases) {
    const fixture = await setup_k903((f) => {
      for (const [address, value] of Object.entries(seed))
        f.store.set(address, value);
    });
    const { emit } = fixture.load_module('system/event/registry');
    await emit('EVENTTRAIN');
    assert.equal(
      fixture.store.get(`cflag:${CID}:201`),
      expected,
      `CFLAG:201 推进到 ${expected}`,
    );
  }

  const ntr = await setup_k903((f) => {
    f.store.set(`cflag:${CID}:201`, 1);
    f.store.set(`cflag:${CID}:650`, 1);
    f.store.set(`talent:${CID}:85`, 1);
  });
  const { emit } = ntr.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(
    ntr.store.get(`cflag:${CID}:650`),
    0,
    'NTR 再捕获后 CFLAG:650 清零',
  );
});

test('COM 仅保留源中活动的五道守卫：口塞、失神、DOG、触手、死斗场', async () => {
  const muted = await setup_k903((f) => f.store.set(`tequip:${CID}:45`, 1));
  await speak(muted);
  assert.deepEqual(muted.text_lines(), [], '口塞且非口塞指令时静默');

  const fainted = await setup_k903((f) => f.store.set('tflag:899', 1));
  await speak(fainted);
  assert.deepEqual(fainted.text_lines(), [], '失神时静默');

  const dog = await setup_k903((f) => f.store.set(`tequip:${CID}:89`, 1));
  await speak(dog);
  assert.equal(
    dog.store.get(`cflag:${CID}:301`),
    1,
    'DOG 守卫转发到 DOG_KOJO 并推进',
  );
  assert.ok(
    dog.text_lines().some((line) => line.includes('下等生物')),
    'DOG_KOJO_903 真身台词',
  );

  const tentacle = await setup_k903((f) => f.store.set(`tequip:${CID}:90`, 1));
  await speak(tentacle);
  assert.deepEqual(tentacle.text_lines(), [], '触手调教时静默');

  const colosseum = await setup_k903((f) => {
    f.store.set(`tequip:${CID}:55`, 1);
    f.store.set(`base:${CID}:1`, 0);
  }, 55);
  await speak(colosseum);
  assert.ok(
    colosseum.text_lines().length > 0,
    '死斗场守卫转发到 COLOSSEUM_KOJO',
  );
});

test('20 个分发族均注册 K903（key 903）', async () => {
  const fixture = await setup_k903();
  const system = fixture.load_module('kojo/kojo-system');
  const after = fixture.load_module('kojo/kojo-dungeon-after');
  const ravish = fixture.load_module('kojo/kojo-dungeon-ravish');
  const families = [
    system.kojo_message_com_family,
    system.self_kojo_family,
    system.kojo_message_palamcng_family,
    system.kojo_message_markcng_family,
    system.benki_koujo_family,
    system.enterenemy_koujo_family,
    system.dungeon_victory_family,
    system.dungeon_attack_family,
    system.ntr_koujo_family,
    system.exucution_koujo_family,
    system.museum_koujo_family,
    system.banishment_koujo_family,
    system.public_exucution_koujo_family,
    system.grotesque_koujo_family,
    system.gobi_koujo_family,
    after.gohoubi_after_koujo_family,
    after.osioski_koujo_family,
    after.gohoubi_request_koujo_family,
    ravish.ryouzyoku_kojo_family,
    ravish.ryouzyoku_after_kojo_family,
  ];
  assert.equal(families.length, 20, 'K903 应覆盖 20 个分发族');
  for (const family of families) {
    assert.equal(
      family.has(KEY),
      true,
      `${family.name || '分发族'} 缺 K903 注册`,
    );
  }
});

test('公共 EX 分发路径：EX_TALENT:103 映成 LOCAL=1003', async () => {
  const fixture = await setup_k903();
  const { get_kojo_num } = fixture.load_module('kojo/kojo-system');
  assert.equal(get_kojo_num(CID), 1003);
});

test('全部活动 SELECTCOM 初次分支均可命中并推进对应 CFLAG（穿卸分列）', async () => {
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
    [16, 317, 16, 1],
    [16, 377, 16, 0],
    [19, 320, 19, 1],
    [19, 379, 19, 0],
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
    [43, 344, 43, 1],
    [43, 380, 43, 0],
    [44, 345, 44, 1],
    [44, 385, 44, 0],
    [45, 346, 45, 1],
    [45, 386, 45, 0],
    [46, 347, 46, 1],
    [55, 356],
    [56, 357],
    [80, 381],
  ];
  for (const [selectcom, cflag, tequip, equipped] of cases) {
    const fixture = await setup_k903((f) => {
      if (tequip !== undefined)
        f.store.set(`tequip:${CID}:${tequip}`, equipped);
    }, selectcom);
    await speak(fixture);
    assert.equal(
      fixture.store.get(`cflag:${CID}:${cflag}`),
      1,
      `SELECTCOM:${selectcom} ${equipped === undefined ? '' : equipped ? '穿戴' : '卸下'}推进 CFLAG:${cflag}`,
    );
  }
});

test('SELECTCOM 二次状态：爱抚淫乱推进到 6', async () => {
  const fixture = await setup_k903((f) => {
    f.store.set(`cflag:${CID}:301`, 1);
    f.store.set(`talent:${CID}:76`, 1);
  });
  await speak(fixture);
  assert.equal(fixture.store.get(`cflag:${CID}:301`), 6);
});

test('PALAMCNG：221-229 的九个首超判据各自只置一次', async () => {
  const cases = [
    [221, `palam:${CID}:3`, 600],
    [222, `palam:${CID}:5`, 600],
    [223, `palam:${CID}:8`, 600],
    [224, `palam:${CID}:10`, 600],
    [225, `nowex:${CID}:0`, 1],
    [226, `nowex:${CID}:1`, 1],
    [227, `nowex:${CID}:2`, 1],
    [228, `nowex:${CID}:3`, 1],
  ];
  for (const [cflag, address, value] of cases) {
    const fixture = await setup_k903((f) => f.store.set(address, value));
    await palam_change(fixture);
    assert.equal(
      fixture.store.get(`cflag:${CID}:${cflag}`),
      1,
      `PALAMCNG 首超 CFLAG:${cflag}`,
    );
  }
  const virginity = await setup_k903((f) => {
    f.store.set('tflag:3', 1);
    f.store.set('tflag:20', 1);
  });
  await palam_change(virginity);
  assert.equal(
    virginity.store.get(`cflag:${CID}:229`),
    1,
    'PALAMCNG 处女丧失 CFLAG:229',
  );

  const boundary = await setup_k903((f) => {
    f.store.set(`palam:${CID}:3`, 500);
  });
  await palam_change(boundary);
  assert.equal(
    boundary.store.get(`cflag:${CID}:221`) || 0,
    0,
    '润滑等于阈值不算首超',
  );
});

test('MARKCNG：297-300 四种刻印 Lv3 均各自推进', async () => {
  const cases = [
    ['苦痛刻印变动', 297],
    ['快乐刻印变动', 298],
    ['屈服刻印变动', 299],
    ['反抗刻印变动', 300],
  ];
  for (const [name, cflag] of cases) {
    const fixture = await setup_k903();
    const { game } = fixture.load_module('facade/game');
    game.system[name] = 3;
    await mark_change(fixture);
    assert.equal(
      fixture.store.get(`cflag:${CID}:${cflag}`),
      1,
      `${name}推进 CFLAG:${cflag}`,
    );
  }
});

test('SELF_KOJO 通过 peek_aftertrain_q 读取 Q：野狗妄想分支可达', async () => {
  const fixture = await setup_k903((f) => {
    f.store.set('tflag:13', 1);
    f.store.set(`abl:${CID}:0`, 3);
    f.store.set(`abl:${CID}:11`, 2);
    f.store.set(`abl:${CID}:31`, 2);
    f.store.set(`abl:${CID}:39`, 4);
    f.store.set(`base:${CID}:0`, 1000);
    f.store.set('item:22', 1);
  });
  const after = fixture.load_module('event/event-aftertrain');
  await after.aftertrain_masturbation_check(0, 0, () => 2);
  assert.equal(after.peek_aftertrain_q(), 2, 'AFTERTRAIN 先写入 Q=2');
  const { self_kojo_family } = fixture.load_module('kojo/kojo-system');
  await self_kojo_family.call(KEY, { args: [] });
  assert.ok(
    fixture.text_lines().some((line) => line.includes('小狗狗')),
    'SELF_KOJO 读取 Q=2 野狗分支',
  );
});

test('SELECTCOM 2/7/13 计数器自洽：303 兜底读自身、308 二次写自身、314 按 A 感觉分档', async () => {
  const anal = await setup_k903((f) => {
    f.store.set(`cflag:${CID}:303`, 1);
    f.store.set(`cflag:${CID}:223`, 2);
    f.store.set('flag:7', 1);
  }, 2);
  await speak(anal);
  assert.ok(
    anal.text_lines().some((line) => line.includes('从后面玩弄本宫什么的')),
    'CFLAG:303=1 时兜底支出声（223 不参与判据）',
  );
  assert.equal(anal.store.get(`cflag:${CID}:303`), 2, '兜底支推进 CFLAG:303=2');

  const spread_cases = [
    ['淫乱', (f) => f.store.set(`talent:${CID}:76`, 1), 5],
    ['爱慕', (f) => f.store.set(`talent:${CID}:85`, 1), 4],
    ['ABL:17>=3', (f) => f.store.set(`abl:${CID}:17`, 3), 3],
    ['无素质兜底', () => {}, 2],
  ];
  for (const [name, seed, expected] of spread_cases) {
    const fixture = await setup_k903((f) => {
      f.store.set(`cflag:${CID}:308`, 1);
      seed(f);
    }, 7);
    await speak(fixture);
    assert.equal(
      fixture.store.get(`cflag:${CID}:308`),
      expected,
      `自己扒开${name}档推进 CFLAG:308=${expected}`,
    );
    assert.equal(
      fixture.store.get(`cflag:${CID}:306`) || 0,
      0,
      `自己扒开${name}档不写胸爱抚 CFLAG:306`,
    );
  }

  for (const [abl, expected] of [
    [3, 7],
    [0, 5],
  ]) {
    const fixture = await setup_k903((f) => {
      f.store.set(`cflag:${CID}:314`, 1);
      f.store.set(`talent:${CID}:76`, 1);
      f.store.set(`abl:${CID}:3`, abl);
      f.store.set(`tequip:${CID}:13`, 1);
    }, 13);
    await speak(fixture);
    assert.equal(
      fixture.store.get(`cflag:${CID}:314`),
      expected,
      `肛门虫淫乱档按 A 感觉分档：ABL:3=${abl} → CFLAG:314=${expected}`,
    );
  }
});

test('SELECTCOM 30/32/40/41 门槛与计数器自洽：侍奉支不需爱慕、各段读自身计数器', async () => {
  const handjob = await setup_k903((f) => {
    f.store.set(`cflag:${CID}:331`, 2);
    f.store.set(`abl:${CID}:16`, 3);
    f.store.set('flag:7', 1);
  }, 30);
  await speak(handjob);
  assert.ok(
    handjob.text_lines().some((line) => line.includes('什么都可以做来着')),
    'CFLAG:331 侍奉精神支单有 ABL:16>=3 即出声',
  );
  assert.equal(handjob.store.get(`cflag:${CID}:331`), 4, '推进 CFLAG:331=4');

  const paizuri = await setup_k903((f) => {
    f.store.set(`cflag:${CID}:333`, 4);
    f.store.set(`cflag:${CID}:332`, 9);
    f.store.set(`talent:${CID}:76`, 1);
    f.store.set('flag:7', 1);
  }, 32);
  await speak(paizuri);
  assert.ok(
    paizuri.text_lines().some((line) => line.includes('喜欢用胸部')),
    'CFLAG:333 淫乱支读 333 自身过门槛（332 不参与）',
  );
  assert.equal(paizuri.store.get(`cflag:${CID}:333`), 5, '推进 CFLAG:333=5');

  const spanking = await setup_k903((f) => {
    f.store.set(`cflag:${CID}:341`, 1);
    f.store.set('flag:7', 1);
  }, 40);
  await speak(spanking);
  assert.ok(
    spanking.text_lines().some((line) => line.includes('加倍奉还')),
    'CFLAG:341 兜底支按 OR 门槛出声',
  );
  assert.equal(spanking.store.get(`cflag:${CID}:341`), 2, '推进 CFLAG:341=2');

  const whip = await setup_k903((f) => {
    f.store.set(`cflag:${CID}:342`, 1);
    f.store.set(`cflag:${CID}:335`, 9);
    f.store.set('flag:7', 1);
  }, 41);
  await speak(whip);
  assert.ok(
    whip.text_lines().some((line) => line.includes('没……没用的')),
    'CFLAG:342 兜底支读 342 自身（335 不参与）',
  );
  assert.equal(whip.store.get(`cflag:${CID}:342`), 2, '推进 CFLAG:342=2');
});

test('KOJO2 开场素质链：自慰狂支不重复挡路，露出狂两支读 TALENT:89', async () => {
  const cases = [
    [
      '淫乱+自慰狂',
      { 'talent:33:76': 1, 'talent:33:74': 1 },
      ['爱上这种事', '总之不要让本宫再等了啦'],
      [],
    ],
    ['淫乱+性爱狂', { 'talent:33:76': 1, 'talent:33:75': 1 }, [], ['湿嗒嗒']],
    [
      '爱慕+自慰狂',
      { 'talent:33:85': 1, 'talent:33:74': 1 },
      ['爱上这种事'],
      [],
    ],
    ['爱慕+性爱狂', { 'talent:33:85': 1, 'talent:33:75': 1 }, [], ['灵肉交汇']],
    [
      '爱慕+露出狂',
      { 'talent:33:85': 1, 'talent:33:89': 1 },
      ['今天会带本宫去哪里玩么'],
      [],
    ],
    [
      '淫乱+露出狂',
      { 'talent:33:76': 1, 'talent:33:89': 1 },
      ['早点去外面'],
      [],
    ],
    [
      '爱慕+施虐狂',
      { 'talent:33:85': 1, 'talent:33:83': 1 },
      ['来这里躺好'],
      ['今天会带本宫去哪里玩么'],
    ],
    [
      '淫乱+施虐狂',
      { 'talent:33:76': 1, 'talent:33:83': 1 },
      ['来这里躺好'],
      ['早点去外面'],
    ],
  ];
  for (const [name, seeds, shown, hidden] of cases) {
    const fixture = await setup_k903((f) => {
      f.store.set(`cflag:${CID}:201`, 6);
      f.store.set(`mark:${CID}:2`, 3);
      for (const [address, value] of Object.entries(seeds))
        f.store.set(address, value);
    });
    const { k903_kojo2 } = fixture.load_module('kojo/kojo-k903-garde');
    await k903_kojo2();
    for (const snippet of shown) {
      assert.ok(
        fixture.text_lines().some((line) => line.includes(snippet)),
        `${name}：应出现「${snippet}」`,
      );
    }
    for (const snippet of hidden) {
      assert.ok(
        !fixture.text_lines().some((line) => line.includes(snippet)),
        `${name}：不再出现「${snippet}」`,
      );
    }
  }
});

test('#625 GOHOUBI_REQUEST 保留 Y=0、兽名与前后文同一行（要求奖赏 1/2/3）', async () => {
  // 原作 :5699（PRINTFORM）+ :5701/:5703/:5705（IF/ELSEIF 三档）+ :5707
  // （PRINTFORMW 收行）**是一整行**（#625）。后两档读的是从未赋值的 public
  // static Y（清洁调用时 = 0），所以要求奖赏 2/3 不补「公猪」「雄马」——
  // 整行只有前段与收行，源缺陷 1:1 保留
  const cases = [
    [1, '狗狗'],
    [2, ''],
    [3, ''],
  ];
  for (const [req, beast] of cases) {
    const fixture = await setup_k903();
    const { chara } = fixture.load_module('facade/chara');
    chara(CID).stronghold.要求奖赏 = req;
    const { gohoubi_request_koujo_family } = fixture.load_module(
      'kojo/kojo-dungeon-after',
    );
    await gohoubi_request_koujo_family.call(KEY, { args: [] });
    assert.deepEqual(
      fixture.text_lines(),
      [`「魔王大人，你懂得的吧…让本宫和${beast}好好地玩・一・玩吧♪」`],
      `要求奖赏 ${req}：兽名与前后文落在同一行，Y=0 时不补公猪/雄马（#625）`,
    );
  }
});

test('SELECTCOM 56 淫乱二次档读 TALENT:76（摄影与非摄影两支），SELECTCOM:17 无口上槽', async () => {
  for (const [name, filming] of [
    ['非摄影', false],
    ['摄影中', true],
  ]) {
    const talk = await setup_k903((f) => {
      f.store.set(`cflag:${CID}:357`, 2);
      f.store.set(`talent:${CID}:76`, 1);
      if (filming) f.store.set(`tequip:${CID}:53`, 1);
      f.store.set('flag:7', 1);
    }, 56);
    await speak(talk);
    assert.ok(talk.text_lines().length > 0, `${name}：淫乱二次档出声`);
    assert.equal(
      talk.store.get(`cflag:${CID}:357`),
      4,
      `${name}：推进 CFLAG:357=4`,
    );
  }

  const love_talk = await setup_k903((f) => {
    f.store.set(`cflag:${CID}:357`, 2);
    f.store.set(`talent:${CID}:85`, 1);
    f.store.set('flag:7', 1);
  }, 56);
  await speak(love_talk);
  assert.ok(
    love_talk.text_lines().some((line) => line.includes('喜欢本宫')),
    '爱慕二次档仍读 TALENT:85',
  );
  assert.equal(love_talk.store.get(`cflag:${CID}:357`), 3, '推进 CFLAG:357=3');

  const colosseum = await setup_k903((f, era_flag) => {
    f.store.set(`tequip:${CID}:55`, 1);
    era_flag.assi = CID;
    era_flag.assiplay = 1;
  }, 27);
  await speak(colosseum);
  assert.equal(
    colosseum.text_lines()[0],
    '「呜！啊啊啊啊！屁股……屁股…要被弄坏啦！！」',
    '死斗场 SELECTCOM:27 台词不多余右引号',
  );

  const template = await setup_k903(
    (f) => f.store.set(`tequip:${CID}:17`, 1),
    17,
  );
  await speak(template);
  assert.deepEqual(
    template.text_lines(),
    [],
    'SELECTCOM:17 没有台词槽：无输出无状态',
  );
});

// —— COLOSSEUM_KOJO_903：ITEM:PBAND → item:4（#552；源 :5394/:5427/:5451） ——
// PBAND 是 Emuera 内建非角色变量（SYSTEM ver1.0.3.ERB:42 赋 4；VariableSize.csv:61
// 的 `PBAND,1000` 只是给它扩容），4 号 = 假阳具；yml/Item.yml 名字表无 PBAND 条目，
// era.get('item:PBAND') 在引擎里恒 undefined（test/variable-yml.test.js 的引擎
// 用例），地址写回 item:PBAND 时下面三档必须红。助手用嘉德自己（同本文件
// 死斗场先例）：TALENT:121/122 均未置位，121/122 门不成立，判定只看假阳具位。
test('#625 COLOSSEUM_KOJO_903 SC31/21/27：武器名与前后文同一行（三种 selectcom × 三档）', async () => {
  // 原作 :5390+:5392+:5394+:5395、:5423+:5425+:5427+:5428、:5447+:5449+
  // 各是一整行（无后缀 PRINTFORM/PRINT 不换行，末行 PRINTFORMW
  // 收行），ere 侧曾把每行拆成四条 era.print（#625）。三档助手武器各断言整行
  const cases = [
    {
      selectcom: 31,
      quote: '「啊…唔……唔唔………就……就在这里吗？…咳……！」',
      head: '嘉德把',
      tail: '粗暴地塞入嘉德的嘴里，露出了心满意足的神情……',
    },
    {
      selectcom: 21,
      quote: '「啊…！唔……啊啊啊！…好深………弄的好深啦……！」',
      head: '嘉德听到悲鸣，更加兴奋了，继续用',
      tail: '毫不留情地蹂躏着嘉德的私处……',
    },
    {
      selectcom: 27,
      quote: '「呜！啊啊啊啊！屁股……屁股…要被弄坏啦！！」',
      head: '嘉德听到悲鸣，更加兴奋了，继续用',
      tail: '毫不留情地蹂躏着嘉德的肛门……',
    },
  ];
  const tiers = [
    { weapon: '阴茎', seed: (f) => f.store.set(`talent:${CID}:121`, 1) },
    { weapon: '假阳具', seed: (f) => f.store.set('item:4', 1) }, // 原作 ITEM:PBAND
    { weapon: '', seed: undefined },
  ];
  for (const { selectcom, quote, head, tail } of cases) {
    for (const { weapon, seed } of tiers) {
      const fixture = await setup_k903((f, era_flag) => {
        f.store.set(`tequip:${CID}:55`, 1);
        era_flag.assi = CID;
        era_flag.assiplay = 1;
        if (seed) {
          seed(f);
        }
      }, selectcom);
      await speak(fixture);
      assert.deepEqual(
        fixture.text_lines(),
        [quote, `${head}${weapon}${tail}`],
        `selectcom ${selectcom}（武器档「${weapon}」）：武器名与前后文落在同一行（#625）`,
      );
    }
  }
});
