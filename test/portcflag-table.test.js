/**
 * @file 自造扩展表 portcflag 的全套验证（issue #67）。
 *
 * ADR-0001「新字段落在自造扩展表」的第一个实例。验证面按验收清单推广，
 * 全部驱动引擎自己的代码（test/helpers/engine-bundle.js），不用自写镜像：
 *
 *   - 登记契约（无引擎也跑）：_fixed.json 的登记 ⇔ yml/ 名字表在场。
 *     两个方向都有实害：登记了没表 → addCharacter 在 `data[表][cid] = {}`
 *     处直接崩（顶层桶由 fillData 的 filter（staticData[表] 在场）建）；
 *     有表没登记 → 引擎按一维自动生效，角色桶永不创建、写入静默丢弃、
 *     预设行被装载循环整行跳过。
 *   - 名字表装载：PortCFlag.yml 经引擎 parseDataFile + 变量表装载循环。
 *   - 预设生效：库内 yml/Chara17.yml 的 portcflag 行（人工增补，非转换
 *     内容——被丢即红，--force 重跑丢行的把关的在这里）经角色装载循环落
 *     预设、经真 addCharacter 落桶；未登记（一维模式）的反面同证。
 *   - 寻址：具名 portcflag:17:数据版本 与序号 portcflag:17:0 同槽。
 *   - PR#57 判据重证：名字表在/不在 × 桶在/不在 的三种组合在新表上与
 *     内置表逐一同路（setVar case 3 default 不特判扩展表，实测依据）。
 *   - 存档往返：真 EraApi 实例（临时目录、真文件、真 saveData/loadData），
 *     不经夹具——夹具的记录层证明不了「引擎接受了」。
 *   - 引擎怪癖钉住：fillData 对扩展表不重建 per-chara 桶（死分支，
 *     app.asar 的 `e[1] === tableType.chara` 里 e 是表名字符串），读
 *     「表晚于存档出现」的旧档时写入静默丢弃。
 *
 * 引擎不在场（无 app.asar）时引擎级用例整文件 skip 并留警告；登记契约
 * 两条只读仓库文件，始终跑。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');

const {
  create_add_character,
  create_chara_loader,
  create_variable_loader,
  load_engine_bundle,
} = require('./helpers/engine-bundle');
const {
  attach_variable_tables,
  load_repo_variable_tables,
} = require('./helpers/static-tables');

const engine = load_engine_bundle();
const engine_test = engine ? test : test.skip;

const REPO_ROOT = path.resolve(__dirname, '..');
const YML_DIR = path.join(REPO_ROOT, 'yml');
const TABLE_NAME = 'portcflag';

function read_yml(name) {
  return fs.readFileSync(path.join(YML_DIR, name), 'utf8');
}

// —— 登记契约（仓库文件层，无引擎也跑）——

test('登记契约：_fixed.json 登记的每个二维扩展表都有 yml 名字表（缺表即 addCharacter 直接崩溃）', () => {
  const fixed = JSON.parse(read_yml('_fixed.json'));
  const registered = fixed?.system?.extendedCharaTables ?? [];
  assert.ok(
    registered.length > 0,
    '登记清单为空——extendedCharaTables 回到空数组意味着这条路没人走',
  );
  const yml_files = fs.readdirSync(YML_DIR).map((name) => name.toLowerCase());
  for (const name of registered) {
    assert.ok(
      yml_files.includes(`${name.toLowerCase()}.yml`),
      `_fixed.json 登记了 ${name}，但 yml/ 里没有对应名字表——引擎 addCharacter 会在建顶层桶时直接崩溃`,
    );
  }
});

test('登记契约：PortCFlag.yml 在场则 portcflag 必须登记（未登记即静默降一维）', () => {
  const fixed = JSON.parse(read_yml('_fixed.json'));
  const registered = (fixed?.system?.extendedCharaTables ?? []).map((name) =>
    name.toLowerCase(),
  );
  assert.ok(
    registered.includes(TABLE_NAME),
    'yml/PortCFlag.yml 存在而 portcflag 未登记——引擎按一维自动生效，角色桶不建、预设行被跳过',
  );
});

// —— 引擎级（驱动 app.asar 的真代码）——

/** 装载库内 portcflag 名字表（引擎 parseDataFile + 变量表装载循环） */
function load_portcflag_table() {
  const loader = create_variable_loader();
  loader.load_rows(
    engine.parse_data_file(read_yml('PortCFlag.yml'), 'yml', TABLE_NAME),
    TABLE_NAME,
  );
  return loader;
}

/**
 * 按给定登记装载库内角色预设（yml/Chara17.yml，含人工增补的 portcflag 行）。
 * 仓库全部变量表（base/talent/cflag/portcflag…）一并挂上——Chara17.yml 的
 * 既有预设行也要经各自名字表翻译，缺表即整行报错丢弃。
 */
function load_chara17_preset(extended_tables) {
  const loader = create_chara_loader({ extended_tables });
  attach_variable_tables(loader, load_repo_variable_tables());
  loader.load_rows(
    engine.parse_data_file(read_yml('Chara17.yml'), 'yml', 'chara'),
  );
  return loader;
}

engine_test(
  '名字表：PortCFlag.yml 经引擎装载，数据版本 → id 0，k/t 元数据齐全',
  () => {
    const loader = load_portcflag_table();
    assert.deepEqual(loader.static_data.portcflag, { 数据版本: 0 });
    assert.deepEqual(loader.field_names.portcflag[0], {
      n: '数据版本',
      k: 'data_version',
      t: 'number',
    });
    assert.deepEqual(loader.warnings, [], '人工表不应触发序号去重告警');
  },
);

engine_test(
  '预设：Chara17.yml 的 portcflag 行经引擎装载进预设，真 addCharacter 时落桶',
  () => {
    const { tableType } = engine.era_api;
    const registration = { [TABLE_NAME]: tableType.chara };

    // 角色装载循环：预设行经 staticData.portcflag 的 name→id 翻译落进预设
    const loader = load_chara17_preset(registration);
    assert.deepEqual(loader.errors, [], '登记在场，预设行不应报缺表');
    assert.deepEqual(loader.static_data.chara[17].portcflag, { 0: 0 });

    // 真 addCharacter：预设值（而非缺省）落进角色桶——预设在加入时生效
    const adder = create_add_character(loader.static_data, {
      extended_tables: registration,
    });
    assert.equal(adder.add(17), true);
    assert.deepEqual(adder.data.portcflag[17], { 0: 0 });
  },
);

engine_test(
  '预设的反面：未登记（引擎按一维自动生效）时同一预设行被装载循环整行跳过',
  () => {
    const { tableType } = engine.era_api;
    // 引擎实测：表文件在场而名字未登记 → extendedTables[表] = normal
    const auto_one_dim = load_chara17_preset({
      [TABLE_NAME]: tableType.normal,
    });
    assert.equal(
      auto_one_dim.static_data.chara[17].portcflag,
      undefined,
      '一维表没有按角色预设，守卫（extendedTables[表] !== normal）应把整行筛掉',
    );
  },
);

engine_test(
  '寻址：具名 portcflag:17:数据版本 与序号 portcflag:17:0 同槽读写',
  () => {
    const loader = load_portcflag_table();
    const fake = {
      staticData: loader.static_data,
      fieldNames: loader.field_names,
      data: { [TABLE_NAME]: { 17: {} } },
      global: {},
      extendedTables: {},
      era: { error: () => {} },
    };
    // 具名写入 → 序号可读（name→id 翻译后落 id 0）
    assert.equal(engine.set_var.call(fake, 'portcflag:17:数据版本', 5), 5);
    assert.equal(engine.set_var.call(fake, 'portcflag:17:0', 6), 6);
    assert.deepEqual(fake.data.portcflag[17], { 0: 6 });
    // 序号写入 → 具名可读（同一槽）
    assert.equal(
      engine.set_var.call(fake, 'portcflag:17:数据版本', undefined),
      6,
    );
  },
);

engine_test(
  '判据重证（PR#57）：名字表在＋桶在 → 通过；名字表不在＋桶在 → 直接崩溃；桶不在 → 静默 undefined',
  () => {
    const loader = load_portcflag_table();
    // 组合一：全部在场 → 写入通过（与内置表同路）
    const fake = {
      staticData: loader.static_data,
      fieldNames: loader.field_names,
      data: { [TABLE_NAME]: { 17: {} } },
      global: {},
      extendedTables: {},
      era: { error: () => {} },
    };
    assert.equal(engine.set_var.call(fake, 'portcflag:17:0', 2), 2);
    // 组合二：抽掉名字表 → 同一句直接抛错（static-table-coverage 锁的同类）
    delete fake.staticData.portcflag;
    assert.throws(
      () => engine.set_var.call(fake, 'portcflag:17:0', 3),
      /Cannot read properties of undefined \(reading '0'\)/,
    );
    // 组合三：名字表在、角色桶不在 → 静默丢弃（不落不抛）
    const no_bucket = {
      staticData: load_portcflag_table().static_data,
      fieldNames: loader.field_names,
      data: { [TABLE_NAME]: {} },
      global: {},
      extendedTables: {},
      era: { error: () => {} },
    };
    assert.equal(
      engine.set_var.call(no_bucket, 'portcflag:17:0', 4),
      undefined,
    );
    assert.deepEqual(no_bucket.data.portcflag, {});
  },
);

engine_test(
  '存档往返：真 EraApi 实例（临时目录、真文件）——写入 → saveData → 清 data → loadData → 取回，值不变',
  async () => {
    const { tableType } = engine.era_api;
    const registration = { [TABLE_NAME]: tableType.chara };
    const variable = load_portcflag_table();
    const loader = load_chara17_preset(registration);

    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ere-portcflag-'));
    try {
      const fake_era = {
        path: tmp,
        config: { system: { saveCompressedData: false } },
        // saves 由引擎维护备注（saveData 写 this.global.saves[栏位]）
        global: { saves: {} },
        staticData: {
          ...loader.static_data,
          portcflag: variable.static_data.portcflag,
          gamebase: {
            version: 93106,
            gameCode: 931060,
            allowVersion: 93106,
            defaultChara: 0,
          },
          chara: {
            0: { id: '0', name: '你', callname: '你' },
            17: loader.static_data.chara[17],
          },
        },
        data: {},
        fieldNames: variable.field_names,
        extendedTables: registration,
        connect: () => {},
        error: () => {},
        log: () => {},
      };
      const api = new engine.era_api(fake_era);

      // 新游戏路径：resetData 建全量 data + fillData 建扩展表顶层桶 +
      // addCharacter(0)（defaultChara）；再按村娘分支加入 17（预设生效）
      api.resetData();
      api.addCharacter(17);
      assert.deepEqual(api.get('portcflag:17:数据版本'), 0);

      // 游戏代码同款写入（具名寻址）
      assert.equal(api.set('portcflag:17:数据版本', 7), 7);

      // 存档：真 saveData（JSON.stringify(this.data) 整体序列化）
      assert.equal(await api.saveData(1, '扩展表往返'), true);
      const saved = JSON.parse(
        fs.readFileSync(path.join(tmp, 'sav', 'save1.sav'), 'utf8'),
      );
      assert.deepEqual(
        saved.portcflag[17],
        { 0: 7 },
        '存档载荷里必须有扩展表（saveData 序列化整个 data）',
      );

      // 读档：清空 data（等价进程重启）后真 loadData 整体还原
      fake_era.data = {};
      assert.equal(await api.loadData(1), true);
      assert.equal(api.get('portcflag:17:数据版本'), 7);
      assert.equal(api.get('portcflag:17:0'), 7);
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  },
);

engine_test(
  '引擎怪癖钉住：fillData 不为扩展表重建 per-chara 桶（死分支），旧档补表后写入静默丢弃',
  () => {
    const { tableType } = engine.era_api;
    const registration = { [TABLE_NAME]: tableType.chara };
    const loader = load_chara17_preset(registration);

    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ere-portcflag-quirk-'));
    try {
      const fake_era = {
        path: tmp,
        config: { system: { saveCompressedData: false } },
        global: { saves: {} },
        staticData: {
          ...loader.static_data,
          gamebase: {
            version: 93106,
            gameCode: 931060,
            allowVersion: 93106,
            defaultChara: 0,
          },
          chara: {
            0: { id: '0', name: '你', callname: '你' },
            17: loader.static_data.chara[17],
          },
        },
        data: {},
        fieldNames: {},
        extendedTables: registration,
        connect: () => {},
        error: () => {},
        log: () => {},
      };
      const api = new engine.era_api(fake_era);
      api.resetData();
      api.addCharacter(17);

      // 「表晚于存档出现」的旧档形状：角色都在，唯独没有扩展表桶
      delete fake_era.data.portcflag;
      api.fillData();
      // 顶层桶重建（fillData 的 data[表] ||= {}），per-chara 桶不重建：
      // 引擎的重建条件 e[1] === tableType.chara 里 e 是表名字符串（恒假）
      assert.deepEqual(fake_era.data.portcflag, {});
      // 后果如实钉住：三段寻址静默丢弃（不崩——崩的是名字表缺位那条路）
      assert.equal(api.set('portcflag:17:0', 5), undefined);
      assert.equal(api.get('portcflag:17:0'), undefined);
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  },
);
