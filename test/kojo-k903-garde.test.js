/**
 * 嘉德 K903 的口上行为测试（issue #249）。
 *
 * 源: target/ERB/口上/EVENT_K903_嘉德.ERB。K903 不沿用普通性格的
 * FLAG/TALENT 注册对，而是 EX_FLAG:103（存在）和 EX_TALENT:103（守卫）。
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
  assert.equal(system.get_kojo_num(CID), 1003, 'EX_TALENT:103 映成 LOCAL=1003');
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

test('原作缺陷：303 误读 223、308 错写 306、314 两支同写 6', async () => {
  const wrong_read = await setup_k903((f) => {
    f.store.set(`cflag:${CID}:303`, 1);
    f.store.set(`cflag:${CID}:223`, 2);
    f.store.set('flag:7', 1);
  }, 2);
  await speak(wrong_read);
  assert.deepEqual(
    wrong_read.text_lines(),
    [],
    'CFLAG:303 的 else 误读 CFLAG:223，223=2 时不出声',
  );

  const wrong_write = await setup_k903((f) => {
    f.store.set(`cflag:${CID}:308`, 1);
    f.store.set(`talent:${CID}:76`, 1);
  }, 7);
  await speak(wrong_write);
  assert.equal(
    wrong_write.store.get(`cflag:${CID}:306`),
    5,
    'CFLAG:308 的淫乱支错写 CFLAG:306',
  );
  assert.equal(
    wrong_write.store.get(`cflag:${CID}:308`),
    1,
    'CFLAG:308 本身保持原值',
  );

  for (const [abl, text] of [
    [3, '有 A 感觉'],
    [0, '无 A 感觉'],
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
      6,
      `CFLAG:314 ${text}两支均写 6`,
    );
  }
});

test('原作缺陷：331 门槛错位、333 误读 332、341 使用 AND、342 误读 335', async () => {
  const handjob = await setup_k903((f) => {
    f.store.set(`cflag:${CID}:331`, 2);
    f.store.set(`abl:${CID}:16`, 3);
    f.store.set('flag:7', 1);
  }, 30);
  await speak(handjob);
  assert.deepEqual(
    handjob.text_lines(),
    [],
    'CFLAG:331 的侍奉精神支错误额外要求 TALENT:85，单有 ABL:16 不出声',
  );

  const breast = await setup_k903((f) => {
    f.store.set(`cflag:${CID}:333`, 5);
    f.store.set(`cflag:${CID}:332`, 9);
    f.store.set(`talent:${CID}:76`, 1);
    f.store.set('flag:7', 1);
  }, 32);
  await speak(breast);
  assert.deepEqual(
    breast.text_lines(),
    [],
    'CFLAG:333 的淫乱支误读 CFLAG:332=9 后被门槛拦下',
  );

  const spanking = await setup_k903((f) => {
    f.store.set(`cflag:${CID}:341`, 1);
    f.store.set('mark:33:0', 3);
    f.store.set('mark:33:2', 2);
    f.store.set('flag:7', 1);
  }, 40);
  await speak(spanking);
  assert.deepEqual(
    spanking.text_lines(),
    [],
    'CFLAG:341 苦痛与屈服必须同时 Lv3（AND）',
  );

  const whip = await setup_k903((f) => {
    f.store.set(`cflag:${CID}:342`, 1);
    f.store.set(`cflag:${CID}:335`, 9);
    f.store.set('flag:7', 1);
  }, 41);
  await speak(whip);
  assert.deepEqual(
    whip.text_lines(),
    [],
    'CFLAG:342 的 else 误读 CFLAG:335=9 后被门槛拦下',
  );
});

test('原作缺陷：两处重复 TALENT:74，露出狂分支误读 TALENT:83', async () => {
  const lewd = await setup_k903((f) => {
    f.store.set(`cflag:${CID}:201`, 6);
    f.store.set(`mark:${CID}:2`, 3);
    f.store.set(`talent:${CID}:76`, 1);
    f.store.set(`talent:${CID}:75`, 1);
  });
  const { k903_kojo2: lewd_kojo } = lewd.load_module('kojo/kojo-k903-garde');
  await lewd_kojo();
  assert.equal(
    lewd.text_lines().some((line) => line.includes('湿嗒嗒')),
    false,
    '重复 TALENT:74 压住第二支：湿嗒嗒',
  );

  const love = await setup_k903((f) => {
    f.store.set(`cflag:${CID}:201`, 6);
    f.store.set(`mark:${CID}:2`, 3);
    f.store.set(`talent:${CID}:85`, 1);
    f.store.set(`talent:${CID}:75`, 1);
  });
  const { k903_kojo2: love_kojo } = love.load_module('kojo/kojo-k903-garde');
  await love_kojo();
  assert.equal(
    love.text_lines().some((line) => line.includes('灵肉交汇')),
    false,
    '重复 TALENT:74 压住第二支：灵肉交汇',
  );

  const exposure = await setup_k903((f) => {
    f.store.set(`cflag:${CID}:201`, 6);
    f.store.set(`mark:${CID}:2`, 3);
    f.store.set(`talent:${CID}:85`, 1);
    f.store.set(`talent:${CID}:89`, 1);
  });
  const { k903_kojo2: exposure_kojo } = exposure.load_module(
    'kojo/kojo-k903-garde',
  );
  await exposure_kojo();
  assert.equal(
    exposure.text_lines().some((line) => line.includes('今天会带本宫去哪里玩')),
    false,
    '露出狂分支误读 TALENT:83，只有 TALENT:89 时不输出',
  );
});

test('GOHOUBI_REQUEST 保留 Y=0：奖励 2 不补公猪或雄马', async () => {
  const fixture = await setup_k903();
  const { chara } = fixture.load_module('facade/chara');
  chara(CID).stronghold.要求奖赏 = 2;
  const { gohoubi_request_koujo_family } = fixture.load_module(
    'kojo/kojo-dungeon-after',
  );
  await gohoubi_request_koujo_family.call(KEY, { args: [] });
  assert.equal(
    fixture.text_lines().some((line) => line.includes('公猪')),
    false,
  );
  assert.equal(
    fixture.text_lines().some((line) => line.includes('雄马')),
    false,
  );
});

test('原作缺陷：357 淫乱条件误读爱慕、死斗场多余引号、EVENTEND 后段不可达、模板空槽', async () => {
  const talk = await setup_k903((f) => {
    f.store.set(`cflag:${CID}:357`, 2);
    f.store.set(`talent:${CID}:76`, 1);
    f.store.set('flag:7', 1);
  }, 56);
  await speak(talk);
  assert.deepEqual(
    talk.text_lines(),
    [],
    'CFLAG:357 淫乱二次分支误读 TALENT:85',
  );

  const colosseum = await setup_k903((f, era_flag) => {
    f.store.set(`tequip:${CID}:55`, 1);
    era_flag.assi = CID;
    era_flag.assiplay = 1;
  }, 27);
  await speak(colosseum);
  assert.ok(
    colosseum.text_lines().some((line) => line.includes('」」')),
    '死斗场原文多余双引号保留',
  );

  const end = await setup_k903((f) => {
    f.store.set('exflag:103', 1);
    f.store.set(`cflag:${CID}:211`, 0);
    f.store.set('mark:33:3', 3);
    f.store.set(`base:${CID}:0`, 100);
  });
  const { emit } = end.load_module('system/event/registry');
  await emit('EVENTEND');
  assert.equal(end.store.get('exflag:103'), 0, '前一个 EVENTEND 仍清存在标志');
  assert.deepEqual(
    end.text_lines(),
    ['「啊……可恶……已经………………」'],
    '后一个 EVENTEND 只输出 RETURN 前一行，后段不可达',
  );

  const template = await setup_k903(
    (f) => f.store.set(`tequip:${CID}:17`, 1),
    17,
  );
  await speak(template);
  assert.deepEqual(
    template.text_lines(),
    [],
    '飞机杯段是注释模板空槽，SELECTCOM:17 无输出无状态',
  );
});
