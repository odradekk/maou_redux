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

function seed_world() {
  const yml_dir = path.join(__dirname, '..', 'yml');
  const variables = create_variable_loader();
  for (const file of fs.readdirSync(yml_dir)) {
    if (!file.endsWith('.yml') || /^(Chara\d+|GameBase)\.yml$/i.test(file)) {
      continue;
    }
    const table = path.basename(file, '.yml').toLowerCase();
    variables.load_rows(
      engine.parse_data_file(
        fs.readFileSync(path.join(yml_dir, file), 'utf8'),
        'yml',
        table,
      ),
      table,
    );
  }
  const extended_tables = Object.fromEntries(
    JSON.parse(
      fs.readFileSync(path.join(yml_dir, '_fixed.json'), 'utf8'),
    ).system.extendedCharaTables.map((table) => [
      table,
      engine.era_api.tableType.chara,
    ]),
  );
  extended_tables.exflag = engine.era_api.tableType.normal;
  const characters = create_chara_loader({ extended_tables });
  Object.assign(characters.static_data, variables.static_data);
  for (const cid of [0, 31, 32]) {
    characters.load_rows(
      engine.parse_data_file(
        fs.readFileSync(path.join(yml_dir, `Chara${cid}.yml`), 'utf8'),
        'yml',
        'chara',
      ),
    );
  }
  assert.deepEqual(characters.errors, []);
  const errors = [];
  const api = new engine.era_api({
    config: {},
    global: {},
    staticData: characters.static_data,
    fieldNames: variables.field_names,
    extendedTables: extended_tables,
    error: (message) => errors.push(message),
  });
  api.resetData();
  assert.equal(api.addCharacter(31), true);
  assert.equal(api.addCharacter(32), true);
  api.beginTrain(0, 31, 32);
  const fixture = create_era_fixture();
  for (const name of [
    'get',
    'set',
    'add',
    'getAddedCharacters',
    'getAllCharacters',
    'getCharactersInTrain',
    'beginTrain',
    'endTrain',
    'removeCharacter',
  ]) {
    fixture.era[name] = api[name].bind(api);
  }
  const flags = fixture.load_module('era-utils/era-flag');
  flags.target = flags.target_backup = flags.target_record = 31;
  flags.assi = flags.assi_backup = flags.assi_record = 32;
  flags.master_backup = flags.player = 0;
  api.set('flag:35', 0); // 濒死自动结束关闭。
  api.set('flag:37', 0); // 本用例不启用着衣系统。
  api.set('base:31:0', 0);
  api.set('juel:31:0', 10);
  api.set('gotjuel:31:0', 7);
  api.set('juel:32:0', 20);
  api.set('gotjuel:32:0', 5);
  fixture.load_module('event/event-end');
  return { api, errors, fixture, flags };
}

engine_test('真实引擎：调教结束的死亡除名与珠结算', async (t) => {
  await t.test(
    '死亡目标不获珠，幸存角色结算一次，正常进入回合结算',
    async () => {
      const { api, errors, fixture, flags } = seed_world();
      const target_juel = api.data.juel[31];
      api.set('gotjuel:31:3', 9);
      api.set('gotjuel:31:100', 11);
      const previous_juel = { ...target_juel };
      flags.target = flags.target_record = 32;
      const { on, TIER } = fixture.load_module('system/event/registry');
      on(
        'EVENTEND',
        () => {
          assert.equal(
            api.get('tflag:13'),
            999,
            '剩余事件仍可读取死亡口上事件码',
          );
          assert.ok(
            api.getAddedCharacters().includes(31),
            '事件链内保留死亡目标数据',
          );
        },
        TIER.LATER,
      );
      const { run_aftertrain } = fixture.load_module('system/train/train-loop');

      assert.equal(await run_aftertrain(), 'TURNEND');

      assert.deepEqual(api.getAddedCharacters(), [0, 32], '死亡目标必须除名');
      assert.deepEqual(target_juel, previous_juel, '死亡目标不获得珠');
      assert.equal(api.get('juel:32:0'), 25, '幸存角色的珠只结算一次');
      assert.deepEqual(api.getCharactersInTrain(), []);
      assert.equal(api.data.gotjuel, undefined, '调教期表必须销毁');
      assert.equal(flags.target, -1);
      assert.equal(flags.assi, -1);
      assert.ok(fixture.text_lines().some((line) => line.includes('死掉了')));
      assert.ok(!fixture.text_lines().includes('以上的点数变化了。'));
      assert.deepEqual(errors, [], '死亡收尾不得产生引擎寻址错误');
    },
  );

  for (const [label, stamina, auto_end] of [
    ['存活目标', 2000, 0],
    ['濒死自动结束开启', 0, 1],
  ]) {
    await t.test(`${label}仍正常结算珠并保留角色`, async () => {
      const { api, errors, fixture, flags } = seed_world();
      api.set('maxbase:31:0', 2000);
      api.set('base:31:0', stamina);
      api.set('flag:35', auto_end);
      api.set('ex:31:0', 1); // 一次阴蒂绝顶获得 1000 珠。
      fixture.set_inputs(999);
      const { run_aftertrain } = fixture.load_module('system/train/train-loop');

      assert.equal(await run_aftertrain(), 'TURNEND');

      assert.deepEqual(api.getAddedCharacters(), [0, 31, 32]);
      assert.equal(api.get('base:31:0'), auto_end ? 1 : 2000);
      assert.equal(api.get('juel:31:0'), 1010, '目标的珠不重复加算');
      assert.equal(api.get('juel:32:0'), 25, '助手的珠不重复加算');
      assert.equal(flags.target, 31);
      assert.equal(flags.assi, 32);
      assert.deepEqual(api.getCharactersInTrain(), []);
      assert.equal(api.data.gotjuel, undefined);
      assert.ok(fixture.text_lines().includes('以上的点数变化了。'));
      assert.ok(!fixture.text_lines().some((line) => line.includes('死掉了')));
      api.beginTrain(...api.getAddedCharacters());
      api.endTrain();
      assert.equal(api.get('juel:31:0'), 1010, '下一场不残留上场待结算珠');
      assert.equal(api.get('juel:32:0'), 25);
      assert.deepEqual(errors, [], '存活收尾不得产生引擎寻址错误');
    });
  }
});
