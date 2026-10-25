/**
 * @file 夹具 raw()（#902）：数据结构与引擎一致，且与 era.get / era.set 同源。
 *
 * 开发套件的具名访问器直接读写 `era.raw().data` / `era.raw().global`（#820
 * 拍板 adoption 选项 c），而这些属性在引擎里就是数据层本身。夹具这边是平表
 * store 上的两个活视图，本文件守三件事：
 *
 * 1. 两个方向都是同一份数据：raw() 写、era.get 读；era.set 写、raw() 读；
 * 2. 结构与引擎一致：用 test/helpers/engine-bundle.js 的 create_engine_data
 *    驱动 app.asar 里的真 resetData / addCharacter / beginTrain / raw / setVar
 *    逐键对照（ADR-0005 第一层：能执行的逐步比对）；
 * 3. 没加入的角色、调教期之外的调教表在结构上不存在，读具名属性会像引擎一样
 *    抛 TypeError。
 *
 * 文件尾部五条引擎比对用例在缺引擎（无 app.asar）时 skip，跳过数进
 * test/engine-skip-baseline.txt 基线；其余用例不依赖引擎照常跑。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const {
  create_engine_data,
  load_engine_bundle,
} = require('./helpers/engine-bundle');
const { load_repo_variable_tables } = require('./helpers/static-tables');
const { yml_extended_chara_tables } = require('./helpers/static-names');

const ROOT = path.resolve(__dirname, '..');

test('raw() 的包装对象每次新建，数据层是同一份活引用', () => {
  const fixture = create_era_fixture();
  const first = fixture.era.raw();
  const second = fixture.era.raw();

  // 引擎 `raw(){return{data:this.data,global:this.global}}`：外层对象每次
  // 新建，里面的 data / global 是同一份数据层
  assert.notEqual(first, second);
  assert.equal(first.data, second.data, 'raw().data 是同一份活引用');
  assert.equal(first.global, second.global, 'raw().global 是同一份活引用');
});

test('raw() 写入后 era.get 读到同一槽（data 方向）', () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(31, { name: '琼' });
  fixture.era.addCharacter(31);
  const { era } = fixture;
  const { data } = era.raw();

  data.flag[81] = 5;
  assert.equal(era.get('flag:81'), 5, 'raw() 写一维表，era.get 按序号读到');

  data.base[31][0] = 12;
  assert.equal(era.get('base:31:体力'), 12, 'raw() 按序号写、era.get 按名字读');

  data.item.hold[3] = 2;
  assert.equal(era.get('item:hold:3'), 2, 'item 子表的槽位同源');

  data.callname[31][-1] = '无名';
  assert.equal(era.get('callname:31:-1'), '无名', '负序号键同样同源');

  data.cstr[31][1] = '文本';
  assert.equal(era.get('cstr:31:1'), '文本', 'cstr 的字符串槽同源');
});

test('era.set / era.add 写入后 raw() 读到同一槽（反向）', () => {
  const fixture = create_era_fixture();
  const { era } = fixture;
  const { data } = era.raw();

  era.set('flag:特别税加成', 7);
  assert.equal(data.flag[9], 7, 'era.set 按名字写、raw() 按序号读到');

  era.add('flag:特别税加成', 1);
  assert.equal(data.flag[9], 8, 'era.add 累加后 raw() 读到新值');

  era.set('talent:31:男人', 3);
  assert.equal(data.talent[31][122], 3, '三段地址的名字翻译对 raw() 透明');

  era.set('item:price:3', 90);
  assert.equal(data.item.price[3], 90);

  era.set('global:3', -1);
  assert.equal(era.raw().global[3], -1, 'global 变量同源');
});

test('raw().global 与 era.get / era.set 同源，盖章常量由 save_gate 提供', () => {
  const fixture = create_era_fixture();
  const { era, save_gate } = fixture;
  const { global } = era.raw();

  global[3] = -1;
  assert.equal(era.get('global:3'), -1, 'raw() 写、era.get 读');

  era.set('global:7', 2);
  assert.equal(global[7], 2, 'era.set 写、raw() 读');

  global.saves[0] = '自动存档';
  assert.equal(era.get('global:saves:0'), '自动存档', '存档备注表同源');

  // resetGlobal 的两枚盖章常量：夹具不落进 store（saveGlobal / loadGlobal 会
  // 整份改写 global），视图与 era.get 共用 save_gate 这一份缺省
  assert.equal(global.code, save_gate.game_code);
  assert.equal(global.version, save_gate.current_version);
  assert.equal(
    era.get('global:code'),
    save_gate.game_code,
    'era.get 读到的盖章常量与视图一致',
  );
  assert.equal(era.get('global:version'), save_gate.current_version);
});

test('raw().data 的骨架按 resetData 字面量：19 张表、item 四个子表、bought 初值 -1', () => {
  const fixture = create_era_fixture();
  const { data } = fixture.era.raw();

  // resetData 的 19 个键 + yml/_fixed.json 登记的扩展角色表（引擎 fillData
  // 为每张登记表建顶层桶）
  const expected = [
    'abl',
    'base',
    'callname',
    'cflag',
    'code',
    'cstr',
    'equip',
    'exp',
    'flag',
    'item',
    'juel',
    'love',
    'mark',
    'maxbase',
    'no',
    'relation',
    'source',
    'talent',
    'version',
    ...yml_extended_chara_tables(),
  ];
  assert.deepEqual(Object.keys(data).sort(), expected.sort());
  assert.ok(yml_extended_chara_tables().length > 0, '本项目登记了扩展角色表');
  assert.ok('flag' in data, '空表也在：表的存在性不取决于写过没有');
  assert.deepEqual(Object.keys(data.item), [
    'bought',
    'hold',
    'price',
    'sales',
  ]);
  assert.equal(data.item.bought, -1, 'data.item.bought 初值 -1');
  assert.deepEqual([...data.no], [], 'data.no 初值是空数组');
  assert.equal(typeof data.code, 'number');
  assert.equal(typeof data.version, 'number');
  // 调教表由 beginTrain 建，此时一张都不在
  for (const table of [
    'delta',
    'deltabase',
    'ex',
    'gotjuel',
    'nowex',
    'palam',
    'stain',
    'tcvar',
    'tequip',
    'tflag',
  ]) {
    assert.ok(!(table in data), `调教表 ${table} 在调教期之外不存在`);
  }
});

test('读没加入的角色的具名属性抛 TypeError（与引擎一致）', () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(31, { name: '琼' });
  fixture.era.addCharacter(31);
  const { data } = fixture.era.raw();

  // 已加入的角色：行对象存在，列值没写过就是 undefined（稀疏语义）
  assert.equal(typeof data.abl[31], 'object');
  assert.deepEqual(Object.keys(data.abl), ['31'], '行集合只含已加入的角色');
  assert.equal(data.abl[31][10], undefined);
  // 扩展角色表同样逐角色建行（引擎 addCharacter 的扩展表段）
  for (const table of yml_extended_chara_tables()) {
    assert.equal(typeof data[table][31], 'object', `${table} 的行随加入建`);
    assert.throws(
      () => data[table][21][0],
      TypeError,
      `扩展角色表 ${table} 没加入的角色同样抛 TypeError`,
    );
  }

  // 没加入的角色：data.abl 里根本没有那一行——`undefined[序号]` 与引擎同样抛
  for (const table of ['abl', 'base', 'callname', 'maxbase', 'talent']) {
    assert.equal(data[table][21], undefined, `${table} 没有 21 这一行`);
    assert.throws(
      () => data[table][21][0],
      TypeError,
      `读没加入的角色的 ${table} 具名属性抛 TypeError`,
    );
  }
});

test('调教表与 data.no：调教期之外不存在，在训角色才有行', () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(31, { name: '琼' });
  fixture.seed_chara(0, { name: '你' });
  fixture.era.addCharacter(31);
  fixture.era.addCharacter(0);
  const raw = fixture.era.raw();

  assert.deepEqual([...raw.data.no], [31, 0], 'data.no 是插入序的活数组');
  assert.equal(fixture.era.get('no:0'), 31, 'era.get 的 no:<n> 读同一位');
  assert.equal(fixture.era.get('no:1'), 0);
  assert.equal(raw.data.no, fixture.chara_no, 'no 就是夹具维护的那只数组');

  assert.throws(
    () => raw.data.palam[31][5],
    TypeError,
    '调教期之外读调教表抛 TypeError',
  );

  fixture.era.beginTrain(31);
  assert.equal(typeof raw.data.palam[31], 'object', '在训角色有调教行');
  assert.equal(typeof raw.data.tflag, 'object', 'tflag 是调教建的一维表');
  assert.throws(
    () => raw.data.palam[0][5],
    TypeError,
    '不在训的角色没有调教行',
  );

  fixture.era.endTrain();
  assert.ok(!('palam' in raw.data), 'endTrain 删调教表');
  assert.ok(!('source' in raw.data), 'source 随 endTrain 一起消失');
  fixture.era.beginTrain(31);
  assert.ok('source' in raw.data, '下一次 beginTrain 重建 source');
});

// —— 引擎比对（ADR-0005 第一层：假 this + 真方法）——
// 引擎侧的 data / global 全部由 app.asar 里的真方法产生：resetData 的顶层
// 字面量、fillData 的缺省、addCharacter 逐角色建的行、beginTrain 建的表、
// raw 的包装对象。静态表取自与实机同源的装载（入库变量表 + Flag / Palam /
// Global），角色预设只留一个 31，便于逐行对照。缺引擎时整组 skip。

const engine = load_engine_bundle();
const engine_test = engine ? test : test.skip;

/**
 * 与实机同源的引擎静态表 + 一个角色预设。夹具的数据层结构与静态表登记了
 * 多少序号无关，所以这里只在预填会用到的表上装真数据。
 * @param {{ save_gate: object }} fixture
 * @returns {object} 可直接传给 create_engine_data 的 static_data
 */
function engine_static_data(fixture) {
  const tables = load_repo_variable_tables();
  for (const [file, table] of [
    ['Flag.yml', 'flag'],
    ['Palam.yml', 'palam'],
    ['Global.yml', 'global'],
  ]) {
    tables.load_rows(
      engine.parse_data_file(
        fs.readFileSync(path.join(ROOT, 'yml', file), 'utf8'),
        'yml',
        table,
      ),
      table,
    );
  }
  tables.static_data.chara = {
    31: { id: 31, name: '琼', callname: '琼' },
  };
  tables.static_data.relationship = { callname: {}, relation: {} };
  // 两枚 GameBase 公章取夹具的 save_gate：它是夹具对 GameBase.yml【版本】/
  // 【游戏标识】的代位，这样两侧的 data.code / data.version 可以直接比
  tables.static_data.gamebase = {
    gameCode: fixture.save_gate.game_code,
    version: fixture.save_gate.current_version,
  };
  return tables.static_data;
}

/**
 * 引擎侧的扩展角色表登记：与 yml/_fixed.json 同源（全部按 tableType.chara）。
 * filler / addCharacter 靠它建顶层桶与逐角色行，夹具靠同一份配置建骨架——
 * 两侧的顶层表集合因此可以直接比。
 * @returns {Object<string, number>} 表名 → tableType.chara
 */
function engine_extended_tables() {
  return Object.fromEntries(
    yml_extended_chara_tables().map((table) => [
      table,
      engine.era_api.tableType.chara,
    ]),
  );
}

engine_test('引擎比对：raw().data 的顶层表集合与 resetData 一致', () => {
  const fixture = create_era_fixture();
  const engine_data = create_engine_data({
    static_data: engine_static_data(fixture),
    extended_tables: engine_extended_tables(),
  });
  engine_data.reset_data();

  assert.deepEqual(
    Object.keys(fixture.era.raw().data).sort(),
    Object.keys(engine_data.raw().data).sort(),
    '夹具的顶层骨架与引擎 resetData 逐表一致',
  );
  assert.equal(
    fixture.era.raw().data.code,
    engine_data.raw().data.code,
    'data.code 取 GameBase 的游戏标识',
  );
  assert.equal(
    fixture.era.raw().data.version,
    engine_data.raw().data.version,
    'data.version 取 GameBase 的版本',
  );
});

engine_test(
  '引擎比对：item 子表与 global 顶层键一致（int 换成字符串后逐键对照）',
  async () => {
    const fixture = create_era_fixture();
    const engine_data = create_engine_data({
      static_data: engine_static_data(fixture),
    });
    engine_data.reset_data();
    await engine_data.reset_global();
    const fixture_raw = fixture.era.raw();
    const engine_raw = engine_data.raw();

    assert.deepEqual(
      Object.keys(fixture_raw.data.item),
      Object.keys(engine_raw.data.item),
      'item 的四个子表',
    );
    assert.equal(
      fixture_raw.data.item.bought,
      engine_raw.data.item.bought,
      'bought 初值两侧都是 -1',
    );

    // global 的三枚顶层键都在引擎侧；Global.yml 声明序号的 0 预置不镜像
    // （夹具保持平表稀疏语义，见夹具注释），所以只比这三枚与它们的值
    const engine_global_keys = Object.keys(engine_raw.global);
    assert.deepEqual(Object.keys(fixture_raw.global), [
      'code',
      'saves',
      'version',
    ]);
    for (const key of ['code', 'saves', 'version']) {
      assert.ok(engine_global_keys.includes(key), `引擎 global 也有 ${key}`);
    }
    assert.equal(fixture_raw.global.code, engine_raw.global.code);
    assert.equal(fixture_raw.global.version, engine_raw.global.version);
  },
);

engine_test('引擎比对：加入角色的行集合与未加入角色的 TypeError 一致', () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(31, { name: '琼' });
  fixture.era.addCharacter(31);
  const engine_data = create_engine_data({
    static_data: engine_static_data(fixture),
    extended_tables: engine_extended_tables(),
  });
  engine_data.reset_data();
  engine_data.add(31);
  const fixture_raw = fixture.era.raw();
  const engine_raw = engine_data.raw();

  assert.deepEqual(
    [...fixture_raw.data.no],
    [...engine_raw.data.no],
    'data.no 的成员与顺序',
  );
  for (const table of [
    'abl',
    'base',
    'callname',
    'cflag',
    'cstr',
    'equip',
    'exp',
    'juel',
    'mark',
    'maxbase',
    'relation',
    'talent',
    ...yml_extended_chara_tables(),
  ]) {
    assert.deepEqual(
      Object.keys(fixture_raw.data[table]).sort(),
      Object.keys(engine_raw.data[table]).sort(),
      `${table} 的行集合`,
    );
    assert.equal(
      typeof fixture_raw.data[table][31],
      typeof engine_raw.data[table][31],
      `${table}[31] 的行存在性`,
    );
  }
  // callname 的两条预设（-1 名字 / -2 称呼）由两侧各自的 addCharacter 写入
  assert.deepEqual(
    Object.keys(fixture_raw.data.callname[31]).sort(),
    Object.keys(engine_raw.data.callname[31]).sort(),
    'callname 行的两个负序号键',
  );
  assert.equal(
    fixture_raw.data.callname[31][-1],
    engine_raw.data.callname[31][-1],
    'callname:-1 取预设名字',
  );

  // 没加入的角色：两侧都没有行，再取序号都抛 TypeError
  assert.equal(engine_raw.data.abl[21], undefined);
  assert.throws(
    () => engine_raw.data.abl[21][0],
    TypeError,
    '引擎侧同样抛 TypeError',
  );
  assert.equal(fixture_raw.data.abl[21], engine_raw.data.abl[21]);
  assert.throws(
    () => fixture_raw.data.abl[21][0],
    TypeError,
    '夹具侧同样抛 TypeError',
  );
});

engine_test(
  '引擎比对：调教表随 beginTrain / endTrain 建表与删除，source 一并消失',
  () => {
    const fixture = create_era_fixture();
    fixture.seed_chara(31, { name: '琼' });
    fixture.era.addCharacter(31);
    const engine_data = create_engine_data({
      static_data: engine_static_data(fixture),
      extended_tables: engine_extended_tables(),
    });
    engine_data.reset_data();
    engine_data.add(31);

    engine_data.begin_train(31);
    fixture.era.beginTrain(31);
    assert.deepEqual(
      Object.keys(fixture.era.raw().data).sort(),
      Object.keys(engine_data.raw().data).sort(),
      'beginTrain 之后建的表逐张一致',
    );
    for (const table of ['palam', 'tequip', 'source', 'stain', 'tcvar']) {
      assert.deepEqual(
        Object.keys(fixture.era.raw().data[table]).sort(),
        Object.keys(engine_data.raw().data[table]).sort(),
        `${table} 的在训行集合`,
      );
    }

    engine_data.end_train();
    fixture.era.endTrain();
    assert.deepEqual(
      Object.keys(fixture.era.raw().data).sort(),
      Object.keys(engine_data.raw().data).sort(),
      'endTrain 之后剩下的表逐张一致（source 一起消失）',
    );
    assert.ok(!('source' in engine_data.raw().data), '引擎 endTrain 删 source');
    assert.ok(!('source' in fixture.era.raw().data), '夹具同款');
  },
);

engine_test('引擎比对：raw() 的路径与引擎 setVar 落在同一处', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(31, { name: '琼' });
  fixture.era.addCharacter(31);
  fixture.era.beginTrain(31);
  const engine_data = create_engine_data({
    static_data: engine_static_data(fixture),
    extended_tables: engine_extended_tables(),
  });
  engine_data.reset_data();
  engine_data.add(31);
  engine_data.begin_train(31);
  await engine_data.reset_global();

  // 同一处数据两条路径：引擎经寻址层 setVar 写地址，夹具经 raw() 写嵌套
  // 属性。若夹具的路径与地址指向不同槽，下面 era.get 的读回就是 undefined
  const cases = [
    ['flag:81', 5, (raw) => (raw.data.flag[81] = 5)],
    ['talent:31:122', 3, (raw) => (raw.data.talent[31][122] = 3)],
    ['abl:31:10', 4, (raw) => (raw.data.abl[31][10] = 4)],
    ['palam:31:5', 300, (raw) => (raw.data.palam[31][5] = 300)],
    ['item:hold:3', 2, (raw) => (raw.data.item.hold[3] = 2)],
    ['item:price:3', 90, (raw) => (raw.data.item.price[3] = 90)],
    ['base:31:0', 12, (raw) => (raw.data.base[31][0] = 12)],
    ['callname:31:-1', '改名', (raw) => (raw.data.callname[31][-1] = '改名')],
    ['global:3', -1, (raw) => (raw.global[3] = -1)],
  ];
  for (const [address, value, write_raw] of cases) {
    engine_data.set_var(address, value);
    write_raw(fixture.era.raw());
    assert.equal(
      fixture.era.get(address),
      value,
      `${address}：raw() 写、era.get 读到同一槽`,
    );
    assert.equal(
      engine_data.set_var(address),
      value,
      `${address}：引擎 setVar 写回同一处`,
    );
  }
});
