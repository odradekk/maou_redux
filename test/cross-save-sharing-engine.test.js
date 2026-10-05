'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
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

engine_test(
  '通信勇者：真实引擎导入旧共享档、保留字段并恢复接收档',
  async (t) => {
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
    const extended_tables = Object.fromEntries(
      JSON.parse(
        fs.readFileSync(path.join(YML_DIR, '_fixed.json'), 'utf8'),
      ).system.extendedCharaTables.map((table) => [
        table,
        engine.era_api.tableType.chara,
      ]),
    );
    const characters = create_chara_loader({ extended_tables });
    Object.assign(characters.static_data, variables.static_data);
    for (const cid of [0, 17, 18]) {
      characters.load_rows(
        engine.parse_data_file(
          fs.readFileSync(path.join(YML_DIR, `Chara${cid}.yml`), 'utf8'),
          'yml',
          'chara',
        ),
      );
    }
    const directory = fs.mkdtempSync(
      path.join(os.tmpdir(), 'ere-communication-'),
    );
    t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
    const errors = [];
    const state = {
      path: directory,
      config: { system: { saveFiles: 99, saveCompressedData: false } },
      global: { saves: {}, 100: '' },
      staticData: {
        ...characters.static_data,
        // 使用首个公开版本的存档，确保修复不要求玩家重新导出。
        gamebase: {
          gameCode: 931060,
          version: 1000,
          allowVersion: 1000,
          defaultChara: 0,
        },
      },
      fieldNames: variables.field_names,
      extendedTables: extended_tables,
      error: (...args) => errors.push(args.join(' ')),
    };
    const api = new engine.era_api(state);
    api.resetData();
    api.removeCharacter(0);
    assert.deepEqual(api.addCharacter(17, 18), [true, true]);
    for (const cid of [17, 18]) {
      api.set(`cflag:${cid}:190`, 12345 + cid);
      api.set(`cflag:${cid}:9`, 4);
      api.set(`cflag:${cid}:451`, 20);
      api.set(`juel:${cid}:0`, 321);
      api.set(`talent:${cid}:0`, 1);
      api.set(`mark:${cid}:0`, 2);
      api.set(`cstr:${cid}:12`, '翼纹');
    }
    assert.equal(await api.saveData(1000, '旧共享队伍'), true);
    api.resetData();
    const fixture = create_era_fixture();
    for (const name of [
      'get',
      'set',
      'add',
      'addCharacter',
      'getAddedCharacters',
      'saveData',
      'loadData',
      'saveGlobal',
      'loadGlobal',
    ]) {
      fixture.era[name] = api[name].bind(api);
    }
    const flags = fixture.load_module('era-utils/era-flag');
    flags.date = 42;
    flags.money = 98765;
    const net = fixture.load_module('system/cross-save-sharing');
    fixture.load_module('event/event-load');

    for (let attempt = 0; attempt < 2; attempt += 1) {
      fixture.set_inputs(0, 9);
      await assert.rejects(net.inport_a(), (error) => {
        assert.equal(error.name, 'BeginSignal');
        assert.equal(error.state, 'SHOP');
        return true;
      });
      assert.deepEqual(api.getAddedCharacters(), [0], '导入后恢复接收档的角色');
      assert.equal(flags.date, 42, '导入后恢复接收档的日期');
      assert.equal(flags.money, 98765, '导入后恢复接收档的资金');
      assert.equal(net.get_roster().length, 2, '重复导入不增加同一批通信勇者');
    }
    api.set('global:100', '[]');
    assert.equal(await api.loadGlobal(), true);
    const records = net.get_roster();
    assert.equal(records.length, 2, '通信名单必须写入公共存档');
    assert.ok(
      fixture.lines_history.some((line) => line.text === '2名勇者追加完毕'),
    );
    const fields = records[0].split('_');
    assert.equal(fields.length, 14, '保留通信记录的十四段格式');
    assert.equal(fields[9], '', '空装备段仍占原来的位置');
    assert.ok(fields[10].includes('0,321/'), '珠段位于装备段之后');
    assert.ok(fields[11].includes('0,1/'), '素质段的位置不变');
    assert.ok(fields[12].includes('0,2/'), '刻印段的位置不变');
    assert.ok(fields[13].includes('12,翼纹/'), '字符串段的位置不变');

    flags.communication_hero_level_one = 0;
    fixture.load_module('facade/game').game.system.外来勇者等级上限 = 100;
    const { chara_make_inport } = fixture.load_module(
      'chara/chara-make-inport',
    );
    assert.equal(
      chara_make_inport(() => 0),
      17,
    );
    assert.equal(api.get('juel:17:0'), 321, '登记的勇者仍能按原格式生成');
    assert.equal(api.get('talent:17:0'), 1);
    assert.equal(api.get('mark:17:0'), 2);
    assert.equal(api.get('cstr:17:12'), '翼纹');
    assert.deepEqual(errors, []);
  },
);
