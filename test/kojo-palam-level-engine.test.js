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

engine_test(
  '真实引擎：慈爱口上读取合法阈值，爱抚不提前消耗首次台词',
  async () => {
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
    for (const cid of [0, 31]) {
      characters.load_rows(
        engine.parse_data_file(
          fs.readFileSync(path.join(YML_DIR, `Chara${cid}.yml`), 'utf8'),
          'yml',
          'chara',
        ),
      );
    }
    assert.deepEqual(characters.errors, []);
    const errors = [];
    const state = {
      config: {},
      global: {},
      staticData: characters.static_data,
      fieldNames: variables.field_names,
      extendedTables: extended_tables,
      error: (message) => errors.push(message),
    };
    const api = new engine.era_api(state);
    api.resetData();
    assert.equal(api.addCharacter(31), true);
    api.beginTrain(0, 31);
    const fixture = create_era_fixture();
    for (const name of [
      'get',
      'set',
      'add',
      'getAddedCharacters',
      'getAllCharacters',
      'getCharactersInTrain',
      'nextTurnInTrain',
    ]) {
      fixture.era[name] = api[name].bind(api);
    }
    const flags = fixture.load_module('era-utils/era-flag');
    flags.target = 31;
    flags.player = 0;
    flags.assi = -1;
    flags.assiplay = 0;
    flags.selectcom = 0;
    flags.prevcom = -1;
    api.set('flag:7', 2); // 口上总开关：每次出声。
    api.set('flag:100', 1); // 慈爱口上已注册。
    // 让首轮爱抚停留在低等级，避免角色预设素质放大参数后合法跨过阈值。
    for (const cid of [0, 31]) {
      for (const index of api.get('ablkeys')) api.set(`abl:${cid}:${index}`, 0);
      for (const index of api.get('talentkeys'))
        api.set(`talent:${cid}:${index}`, 0);
      for (const index of [0, 1]) {
        api.set(`maxbase:${cid}:${index}`, 2000);
        api.set(`base:${cid}:${index}`, 2000);
      }
    }
    api.set('talent:0:122', 1); // 调教者为男性。
    api.set('talent:31:160', 1); // 目标使用慈爱口上。
    fixture.load_module('kojo/kojo-k0-tender');
    fixture.load_module('system/train/com-caress');
    fixture.load_module('event/event-com');
    fixture.load_module('event/source-check');
    fixture.load_module('event/event-comend');
    const { execute_command_round } = fixture.load_module(
      'system/train/train-loop',
    );
    assert.deepEqual(await execute_command_round(0), { missing: false });
    assert.deepEqual(errors, [], '爱抚不得产生引擎变量寻址错误');
    for (const index of [3, 5, 8, 10]) {
      assert.ok(api.get(`palam:31:${index}`) <= 500, '本回合参数仍未超过 Lv2');
    }
    for (const index of [221, 222, 223, 224]) {
      assert.equal(
        api.get(`cflag:31:${index}`) || 0,
        0,
        '低等级爱抚保留首次台词',
      );
    }
  },
);
