'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const {
  create_chara_loader,
  create_variable_loader,
  load_engine_bundle,
} = require('./helpers/engine-bundle');

const engine = load_engine_bundle();
const engine_test = engine ? test : test.skip;
const YML_DIR = path.join(__dirname, '..', 'yml');

function load_presets() {
  const variables = create_variable_loader();
  for (const file of fs.readdirSync(YML_DIR)) {
    if (!file.endsWith('.yml') || /^(Chara\d+|GameBase)\.yml$/i.test(file)) {
      continue;
    }
    const table = path.basename(file, '.yml').toLowerCase();
    variables.load_rows(
      engine.parse_data_file(
        fs.readFileSync(path.join(YML_DIR, file), 'utf8'),
        'yml',
        table,
      ),
      table,
    );
  }
  const { system } = JSON.parse(
    fs.readFileSync(path.join(YML_DIR, '_fixed.json'), 'utf8'),
  );
  const extended_tables = Object.fromEntries([
    ...system.extendedCharaTables.map((table) => [
      table,
      engine.era_api.tableType.chara,
    ]),
    ['exflag', engine.era_api.tableType.normal],
  ]);
  const characters = create_chara_loader({ extended_tables });
  Object.assign(characters.static_data, variables.static_data);
  for (const cid of [
    0,
    ...Array.from({ length: 16 }, (_, i) => i + 1),
    150,
    201,
  ]) {
    characters.load_rows(
      engine.parse_data_file(
        fs.readFileSync(path.join(YML_DIR, `Chara${cid}.yml`), 'utf8'),
        'yml',
        'chara',
      ),
    );
  }
  assert.deepEqual(characters.errors, []);
  return {
    staticData: {
      ...characters.static_data,
      gamebase: { gameCode: 931060, version: 1000, defaultChara: 0 },
    },
    fieldNames: variables.field_names,
    extendedTables: extended_tables,
  };
}

function setup(presets) {
  const api = new engine.era_api({
    ...presets,
    global: {},
    error: (...args) => assert.fail(args.join(' ')),
  });
  api.resetData();
  const fixture = create_era_fixture();
  // 输出和输入沿用唯一测试注入点，角色与变量读写全部交给真实引擎。
  for (const name of [
    'get',
    'set',
    'add',
    'addCharacter',
    'getAllCharacters',
    'getAddedCharacters',
  ]) {
    fixture.era[name] = api[name].bind(api);
  }
  api.set('flag:10005', 0); // 调教目标
  api.set('flag:10004', 100000); // 所持金
  api.set('exflag:4444', 100000); // 非作弊资金
  api.set('cflag:0:9', 30); // 魔王等级
  api.set('flag:83', 30); // 肉便器数
  return { api, fixture };
}

function mark_progress(api, cid) {
  assert.equal(api.addCharacter(cid), true);
  api.set(`base:${cid}:0`, 1234); // 成长后的体力
  api.set(`talent:${cid}:200`, cid === 150 ? 1 : 0); // 与预设不同的童贞素质
  api.set(`callname:${cid}:-1`, '现有角色'); // 名字
  api.set(`callname:${cid}:-2`, '现有称呼'); // 呼び名
  api.set(`cstr:${cid}:12`, '已有纹身'); // 玩家定制文本
  api.set(`c_relation:${cid}:${cid}`, 0); // 已初始化的家族对角项
}

function snapshot_character(api, cid) {
  return structuredClone(
    Object.fromEntries(
      Object.entries(api.data)
        .filter(([, table]) => table?.[cid] && typeof table[cid] === 'object')
        .map(([name, table]) => [name, table[cid]]),
    ),
  );
}

function has_text(fixture, text) {
  return fixture.lines_history.some((line) => line.text?.includes(text));
}

engine_test(
  '角色创建：真实引擎保留已在场角色并允许首次加入（#749、#759）',
  async (t) => {
    const presets = load_presets();

    await t.test(
      '引擎同号 addCharacter 确实重建数据，列表仍只有一名同号角色',
      () => {
        for (const cid of [1, 150]) {
          const { api } = setup(presets);
          mark_progress(api, cid);
          assert.equal(api.addCharacter(cid), true);
          assert.equal(api.get(`base:${cid}:0`), cid === 1 ? 2400 : 2000);
          assert.equal(api.get(`talent:${cid}:200`), cid === 1 ? 1 : 0);
          assert.notEqual(api.get(`callname:${cid}:-1`), '现有角色');
          assert.deepEqual(api.getAddedCharacters(), [0, cid]);
        }
      },
    );

    await t.test(
      '普通来袭抽中已具备出售或助手资格的角色时保留全部数据',
      async () => {
        for (const qualification of [1, 2]) {
          const { api, fixture } = setup(presets);
          mark_progress(api, 1);
          api.set('cflag:1:0', qualification); // 出售或助手资格
          const before = snapshot_character(api, 1);
          const { enter_enemy } = fixture.load_module('event/enter-enemy');

          const result = await enter_enemy(0, () => 0);
          assert.deepEqual(
            snapshot_character(api, 1),
            before,
            '普通来袭保留已有角色全部数据',
          );
          assert.equal(result, 0, '同号角色已在场，本次来袭取消');
          assert.deepEqual(api.getAddedCharacters(), [0, 1]);
          assert.ok(has_text(fixture, '出于对魔王的恐惧，勇者没有出现。'));
        }
      },
    );

    await t.test('调试位开启时普通和家族来袭均保留在场角色', async () => {
      for (const mode of [0, 1]) {
        const { api, fixture } = setup(presets);
        mark_progress(api, 1);
        api.set('flag:5', 2 ** 32); // 开局设置位图的调试位
        const before = snapshot_character(api, 1);
        const { enter_enemy } = fixture.load_module('event/enter-enemy');

        const result = await enter_enemy(mode, () => 0);
        assert.deepEqual(
          snapshot_character(api, 1),
          before,
          '调试来袭保留已有角色全部数据',
        );
        assert.equal(result, 0);
        assert.deepEqual(api.getAddedCharacters(), [0, 1]);
      }
    });

    await t.test('未在场预设首次普通来袭仍加入并初始化', async () => {
      const { api, fixture } = setup(presets);
      const { enter_enemy } = fixture.load_module('event/enter-enemy');

      assert.equal(await enter_enemy(0, () => 0), 1);
      assert.deepEqual(api.getAddedCharacters(), [0, 1]);
      assert.equal(api.get('base:1:0'), 2400, '从真实勇者预设读取体力');
      assert.equal(api.get('cflag:1:1'), 2, '新勇者侵攻中');
      assert.equal(api.get('cflag:1:501'), 1, '初始化侵攻阶层');
      assert.equal(api.get('cflag:1:508'), 3, '初始化再起点');
      assert.equal(api.get('cflag:1:510'), 0, '初始化横坐标');
      assert.equal(api.get('cflag:1:511'), 0, '初始化纵坐标');
      assert.ok(has_text(fixture, '开始了地下城的攻略！'));
    });

    await t.test(
      '普通生命摇篮拒绝已在场勇者和精英，返回后全部数据不变',
      async () => {
        for (const [cid, selection] of [
          [1, 1],
          [201, 21],
        ]) {
          const { api, fixture } = setup(presets);
          mark_progress(api, cid);
          const before = snapshot_character(api, cid);
          const { char_create } = fixture.load_module('chara/chara-custom');
          fixture.set_inputs(selection);

          const result = await char_create(0, () => 0).catch((error) => error);
          assert.deepEqual(
            snapshot_character(api, cid),
            before,
            '拒绝后保留已有角色的全部数据',
          );
          assert.equal(result, 0);
          assert.equal(api.get('flag:10004'), 100000, '拒绝创建不扣资金');
          assert.equal(api.get('flag:10005'), 0, '调教目标保持不变');
          assert.ok(has_text(fixture, '该角色已在场，无法重复创建'));
        }
      },
    );

    await t.test('捕获勇者仅从未在场预设抽取，不覆盖既有角色', async () => {
      const { api, fixture } = setup(presets);
      mark_progress(api, 1);
      const before = snapshot_character(api, 1);
      const { get_enemy } = fixture.load_module('event/enter-enemy');

      const cid = await get_enemy(() => 0);
      assert.deepEqual(
        snapshot_character(api, 1),
        before,
        '捕获不重建既有角色',
      );
      assert.equal(cid, 2, '抽取剩余候选的首位');
      assert.deepEqual(api.getAddedCharacters(), [0, 1, 2]);
      assert.equal(api.get('cflag:2:1'), 0, '新俘虏不侵攻');
      assert.equal(api.get('cflag:2:501'), 1, '新俘虏初始化侵攻阶层');
      assert.equal(api.get('cflag:2:508'), 3, '新俘虏初始化再起点');
    });

    await t.test(
      '影仆召唤拒绝已在场编号，取消后保留角色和全部代价',
      async () => {
        const { api, fixture } = setup(presets);
        mark_progress(api, 150);
        const before = snapshot_character(api, 150);
        const { summon_slave } = fixture.load_module('page/page-shop-labo');
        fixture.set_inputs(150, 0);

        const result = await summon_slave();
        assert.deepEqual(
          snapshot_character(api, 150),
          before,
          '影仆召唤不重建既有角色',
        );
        assert.equal(result, 0);
        assert.equal(api.get('flag:10004'), 100000);
        assert.equal(api.get('exflag:4444'), 100000);
        assert.equal(api.get('cflag:0:9'), 30);
        assert.equal(api.get('flag:83'), 30);
        assert.ok(has_text(fixture, '该角色已在场，无法重复召唤'));
      },
    );

    await t.test(
      '直接追加在场预设在付费和调试模式均不修改任何数据',
      async () => {
        for (const mode of [0, 1]) {
          const { api, fixture } = setup(presets);
          mark_progress(api, 1);
          const before = structuredClone(api.data);
          const { char_append } = fixture.load_module('chara/chara-custom');
          assert.equal(await char_append(1, mode, () => 0), -1);
          assert.deepEqual(api.data, before);
        }
      },
    );

    await t.test('普通预设全部在场时捕获明确返回失败且不改变角色', async () => {
      const { api, fixture } = setup(presets);
      for (let cid = 1; cid <= 16; cid += 1) mark_progress(api, cid);
      const before = structuredClone(api.data);
      const { get_enemy } = fixture.load_module('event/enter-enemy');
      assert.equal(await get_enemy(() => 0), 0);
      assert.deepEqual(api.data, before, '没有候选时不写角色数据');
      assert.ok(has_text(fixture, '没有可捕获的新勇者'));
    });

    await t.test('普通预设全部在场仍可捕获未在场的异国勇者', async () => {
      const { api, fixture } = setup(presets);
      for (let cid = 1; cid <= 16; cid += 1) mark_progress(api, cid);
      fixture.load_module('facade/game').game.system.外来勇者等级上限 = 10;
      api.set(
        'global:100',
        JSON.stringify([
          [
            123,
            201,
            1,
            '异国勇者',
            '',
            '0,1234/',
            '',
            '190,123/',
            '',
            '',
            '',
            '',
            '',
            '',
          ].join('_'),
        ]),
      ); // 通信名单，预设 201 尚未在场
      const before = snapshot_character(api, 1);
      const { get_enemy } = fixture.load_module('event/enter-enemy');
      assert.equal(await get_enemy(() => 0), 201);
      assert.deepEqual(snapshot_character(api, 1), before);
      assert.equal(api.get('callname:201:-1'), '异国勇者', '沿用异国勇者记录');
      assert.equal(api.get('cflag:201:190'), 123, '保留通信唯一标记');
      assert.equal(api.get('cflag:201:1'), 0, '异国勇者作为俘虏加入');
    });

    await t.test('首次创建勇者、精英和影仆仍执行初始化', async () => {
      for (const [cid, selection] of [
        [1, 1],
        [201, 21],
      ]) {
        const { api, fixture } = setup(presets);
        const { char_create } = fixture.load_module('chara/chara-custom');
        fixture.set_inputs(selection, 1, '莉塔', 996);
        assert.equal(await char_create(0, () => 0), cid);
        assert.deepEqual(api.getAddedCharacters(), [0, cid]);
        assert.equal(api.get(`callname:${cid}:-1`), '莉塔');
        assert.equal(api.get(`talent:${cid}:122`), 1, '性别初始化');
        assert.equal(api.get('flag:10005'), 0, '追加后还原调教目标');
      }
      const { api, fixture } = setup(presets);
      const { summon_slave } = fixture.load_module('page/page-shop-labo');
      fixture.set_inputs(150);
      assert.equal(await summon_slave(), 1);
      assert.deepEqual(api.getAddedCharacters(), [0, 150]);
      assert.equal(api.get('talent:150:292'), 1, '魔王之影初始化');
      assert.equal(api.get('cflag:150:1'), 11, '召唤酩酊状态');
      assert.equal(api.get('flag:10004'), 0);
      assert.equal(api.get('exflag:4444'), 0);
      assert.equal(api.get('cflag:0:9'), 0);
      assert.equal(api.get('flag:83'), 0);
    });
  },
);
