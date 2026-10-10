'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara } = require('./helpers/chara');

function seed_world() {
  const fixture = create_era_fixture();
  join_slave_chara(fixture, 0, '你');
  fixture.store.set('base:0:0', 5000);
  fixture.store.set('base:0:1', 5000);
  fixture.store.set('maxbase:0:0', 10000);
  fixture.store.set('maxbase:0:1', 10000);
  fixture.store.set('flag:10004', 10000); // 所持金
  fixture.store.set('exflag:4444', 1234); // 非作弊资金
  fixture.store.set('flag:400', 0); // 勇者战役中
  return fixture;
}

async function remove_by_death(fixture, cid) {
  const flags = fixture.load_module('era-utils/era-flag');
  flags.target = flags.target_backup = flags.target_record = cid;
  flags.assi = flags.assi_backup = flags.assi_record = -1;
  flags.master_backup = flags.player = 0;
  fixture.era.beginTrain(0, cid);
  fixture.store.set(`base:${cid}:0`, 0);
  fixture.load_module('event/event-end');
  const { run_aftertrain } = fixture.load_module('system/train/train-loop');
  assert.equal(await run_aftertrain(), 'TURNEND');
}

test('死亡除名后正常回复气力：近卫后代不触发战役，普通勇者保留除名与苏生标记', async () => {
  for (const source of [201, 1]) {
    const fixture = seed_world();
    fixture.override_math_random(() => 0);
    try {
      let cid = 1;
      if (source === 201) {
        fixture.seed_chara(201, { name: '近卫', callname: '近卫' });
        const { gb_add_guard } = fixture.load_module('chara/chara-pregnancy');
        cid = await gb_add_guard(0, -2, () => 0);
        assert.equal(cid, 120000);
      } else {
        join_slave_chara(fixture, 1, '战士');
      }

      await remove_by_death(fixture, cid);
      assert(!fixture.era.getAddedCharacters().includes(cid));
      fixture.load_module('event/event-turnend');
      fixture.load_module('system/turnend-settle');
      fixture.load_module('event/event-turnend-later');
      fixture.disable_enter_enemy();
      await fixture.load_module('system/event/registry').emit('EVENTTURNEND');

      assert.equal(fixture.era.get('base:0:1'), 6000, '除名后正常回复气力');
      assert.equal(fixture.era.get('flag:400'), 0, '除名不得开启战役');
      assert.equal(fixture.era.get('flag:200') || 0, source === 1 ? 1 : 0);
      assert.equal(fixture.era.get('flag:1000') || 0, source === 1 ? -2 : 0);
      assert.equal(
        fixture.era.get('flag:120999') || 0,
        0,
        '后代不进入苏生名单',
      );
    } finally {
      fixture.restore_math_random();
    }
  }
});

const removal_entries = [
  ['死亡', remove_by_death],
  [
    '出售',
    (fixture, cid) =>
      fixture.load_module('system/stronghold/sale').kill_target(cid),
  ],
  [
    '处刑',
    (fixture, cid) =>
      fixture
        .load_module('event/event-execution-common')
        .dispose_character(cid),
  ],
  [
    '献祭',
    async (fixture, cid) => {
      join_slave_chara(fixture, 31, '魔王之影');
      fixture.store.set('cflag:31:1', 11); // 献祭召唤中
      fixture.store.set(`cflag:${cid}:1`, 8); // 可献祭的奴隶
      fixture.set_inputs(10, cid, 1, 999, 100);
      await fixture
        .load_module('page/page-chara-info-show')
        .show_chara_info(31, -1, () => 0);
    },
  ],
  [
    '博物馆',
    async (fixture, cid) => {
      fixture.era.beginTrain(0, cid);
      fixture.set_inputs(8); // 家具化
      await fixture.load_module('event/event-museum').museum(cid, () => 0);
    },
  ],
];

test('除名标记：魔王及负编号不占用勇者标记', () => {
  const fixture = seed_world();
  const flags = fixture.load_module('era-utils/era-flag');
  for (const template of [-1, 0]) {
    flags.mark_hero_removed(template);
  }
  assert.equal(fixture.era.get('flag:199'), undefined, '魔王不写除名标记');
  assert.equal(fixture.era.get('flag:198'), undefined, '负编号不写除名标记');
});

const removal_cases = [
  [1, 1],
  [100, 100],
  [101, 101],
  [150, 150],
  [223, 223],
  [777, 777],
  [1, 100000],
  ...Array.from({ length: 11 }, (_, index) => [201 + index, 201 + index]),
  ...Array.from({ length: 11 }, (_, index) => [
    201 + index,
    120000 + index * 100,
  ]),
];

for (const [entry_name, remove] of removal_entries) {
  test(`${entry_name}除名：普通勇者保留标记，近卫预设及后代不改其他玩法标志`, async () => {
    for (const [source, cid] of removal_cases) {
      const fixture = seed_world();
      fixture.override_math_random(() => 0);
      try {
        fixture.seed_chara(source, { name: '目标', callname: '目标' });
        assert.equal(fixture.era.addCharacter([cid, source]), true);
        for (const slot of [550, 551, 552]) {
          fixture.store.set(`cflag:${cid}:${slot}`, -1); // 无装备
        }
        const protected_flags = new Map(
          [
            200, 299, 300, 349, 400, 401, 402, 403, 404, 405, 406, 407, 408,
            409, 410, 422, 976,
          ].map((index) => [index, index === 400 ? 0 : 7]),
        );
        for (const [index, value] of protected_flags) {
          fixture.store.set(`flag:${index}`, value);
        }

        await remove(fixture, cid);

        assert(
          !fixture.era.getAddedCharacters().includes(cid),
          `角色 ${cid} 已除名`,
        );
        const marked = source === 1 ? 200 : source === 100 ? 299 : -1;
        for (const [index, previous] of protected_flags) {
          assert.equal(
            fixture.era.get(`flag:${index}`),
            index === marked ? 1 : previous,
            `${entry_name}：模板 ${source}、角色 ${cid} 的 FLAG:${index}`,
          );
        }
      } finally {
        fixture.restore_math_random();
      }
    }
  });
}
