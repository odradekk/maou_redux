/**
 * @file 预设模板与角色号分开（issue #884）。
 *
 * 现状是角色号直接当预设号用：普通角色的预设号就是角色 ID，后代按
 * 「每个来源预设保留一段 ID 区间」编码，再由 template_no_of 反推。
 * 本票给 portcflag 加「预设模板」字段，把预设号变成角色自己的数据：
 *
 *   - 角色文件（yml/Chara*.yml）每张预设都带一行「预设模板: 番号」，
 *     引擎的 addCharacter 把它抄进目标角色的 portcflag——**目标号与源号
 *     可以不同**（addCharacter([新 ID, 预设号]) 是后代唯一的建角色写法），
 *     这正是角色号与预设号分开的落点；
 *   - 需要预设号的代码改读 template_no_of（ere/system/chara/chara-pregnancy.js），
 *     不再从角色号反推；
 *   - 0.1.0 起的旧存档里没有这个字段，读档钩子 EVENTLOAD 调用
 *     backfill_chara_templates 按旧编码（template_no_from_id）补填。
 *
 * 旧存档的两条补填路径（ADR-0006 的判定证据，见本文件最后两条引擎用例）：
 *
 *   - 有预设的角色（0-16、17-35、100/150/201-211/223/777）：引擎读档时
 *     fillData 按角色自己的预设把字段补成预设号；
 *   - 没有预设的角色（后代的动态 ID）：fillData 补 0，由读档补填写入旧编码
 *     反推出的预设号。
 *
 * 引擎不在场（无 app.asar）时引擎级用例 skip 并留警告，跳过数计入
 * test/engine-skip-baseline.txt；文件级与夹具级用例不依赖引擎。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const {
  create_add_character,
  create_chara_loader,
  load_engine_bundle,
} = require('./helpers/engine-bundle');
const {
  attach_variable_tables,
  load_repo_variable_tables,
} = require('./helpers/static-tables');

const engine = load_engine_bundle();
const engine_test = engine ? test : test.skip;
const repo_tables = load_repo_variable_tables();

const REPO_ROOT = path.resolve(__dirname, '..');
const YML_DIR = path.join(REPO_ROOT, 'yml');

// yml/_fixed.json 登记的扩展角色表（引擎装载后 extendedTables 的形状）
const EXTENDED_TABLES = { portcflag: 2, ex_talent: 2 };

// 名字表里的中文键与序号（yml/PortCFlag.yml）
const TEMPLATE_FIELD = '预设模板';
const TEMPLATE_FIELD_ID = 2;

function read_yml(name) {
  return fs.readFileSync(path.join(YML_DIR, name), 'utf8');
}

function chara_files() {
  return fs
    .readdirSync(YML_DIR)
    .filter((name) => /^Chara.*\.yml$/i.test(name))
    .sort();
}

/** 角色文件里的 番号（预设号） */
function preset_no_of(file) {
  const match = /^"番号":\s*(\d+)$/m.exec(read_yml(file));
  assert.ok(match, `${file} 缺「番号」行`);
  return Number(match[1]);
}

/** 角色文件 portcflag 段里的「预设模板」值；没有该行返回 undefined */
function template_row_of(file) {
  const block = /^"portcflag":\s*\r?\n((?: {2}.+\r?\n?)+)/m.exec(
    read_yml(file),
  );
  if (!block) {
    return undefined;
  }
  const row = /^ {2}"预设模板":\s*(\d+)\s*$/m.exec(block[1]);
  return row ? Number(row[1]) : undefined;
}

/** 装载全部角色预设（与引擎 eraStart 的逐角色装载同构） */
function load_world({ tables = repo_tables, drop_template = false } = {}) {
  const loader = create_chara_loader({ extended_tables: EXTENDED_TABLES });
  attach_variable_tables(loader, tables);
  for (const file of chara_files()) {
    loader.load_rows(engine.parse_data_file(read_yml(file), 'yml', 'chara'));
  }
  assert.deepEqual(loader.errors, [], '全部角色文件必须零装载错误');
  if (drop_template) {
    // 旧版本的世界：名字表与角色预设里都还没有这个字段
    delete loader.static_data.portcflag[TEMPLATE_FIELD];
    for (const preset of Object.values(loader.static_data.chara)) {
      delete preset.portcflag?.[TEMPLATE_FIELD_ID];
    }
  }
  return loader;
}

// —— 1. 静态数据：字段登记与「每张预设都带一行」 ——

test('PortCFlag.yml 登记预设模板字段（id 2、name template_no、type number）', () => {
  const block = /^"预设模板":\r?\n((?: {2}.+\r?\n?)+)/m.exec(
    read_yml('PortCFlag.yml'),
  );
  assert.ok(block, 'yml/PortCFlag.yml 必须有「预设模板」条目');
  const fields = {};
  for (const line of block[1].split(/\r?\n/)) {
    const match = /^ {2}(id|name|type):\s*(.+)$/.exec(line);
    if (match) {
      fields[match[1]] = match[2].replace(/"/g, '').trim();
    }
  }
  assert.equal(Number(fields.id), TEMPLATE_FIELD_ID, '序号 2（0/1 已占用）');
  assert.equal(fields.name, 'template_no', '英文蛇形标识符');
  assert.equal(fields.type, 'number', '数值字段');
});

test('每张角色预设都带「预设模板 = 番号」（漏写的预设加入后字段是 0）', () => {
  const missing = [];
  for (const file of chara_files()) {
    const preset_no = preset_no_of(file);
    const template = template_row_of(file);
    if (template !== preset_no) {
      missing.push(`${file}（番号 ${preset_no}，实为 ${template}）`);
    }
  }
  assert.deepEqual(
    missing,
    [],
    '角色预设缺「预设模板」行或值与番号不符——加入该预设的角色会带 0，' +
      '读档补填也救不回来（那是旧编码的换算）',
  );
});

// —— 2. 夹具：字段是唯一读取来源 ——

/** ere/ 下所有 .js（递归；静态扫描用） */
function ere_files(dir = path.join(REPO_ROOT, 'ere')) {
  const found = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...ere_files(full));
    } else if (entry.name.endsWith('.js')) {
      found.push(full);
    }
  }
  return found;
}

test('旧编码换算只在读档补填里用：读取侧不自己从角色号反推', () => {
  const offenders = ere_files()
    .filter((file) =>
      /template_no_from_id\s*\(/.test(fs.readFileSync(file, 'utf8')),
    )
    .map((file) => path.relative(REPO_ROOT, file).replace(/\\/g, '/'));
  assert.deepEqual(
    offenders,
    ['ere/system/chara/chara-pregnancy.js'],
    'template_no_from_id 只给 backfill_chara_templates 用——别处要用预设号就调 ' +
      'template_no_of（读 portcflag 的「预设模板」字段）',
  );
});

function template_no_of(fixture, cid) {
  return fixture
    .load_module('system/chara/chara-pregnancy')
    .template_no_of(cid);
}

test('template_no_of 读预设模板字段：普通角色是预设号，后代带上来源预设', () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(31, { id: 31, name: '琼', callname: '琼' });
  assert.equal(fixture.era.addCharacter(31), true);
  assert.equal(template_no_of(fixture, 31), 31, '普通角色的预设号 = 角色号');

  fixture.seed_chara(1, { id: 1, name: '后代模板' });
  assert.equal(fixture.era.addCharacter([100000, 1]), true);
  assert.equal(
    template_no_of(fixture, 100000),
    1,
    '后代的目标号与预设号分开：写入的是源预设的预设模板',
  );
  assert.equal(
    fixture.store.get('portcflag:100000:2'),
    1,
    '字段落在目标角色自己的 portcflag 桶里',
  );
});

test('模板字段优先于旧编码：字段写 2 的后代按模板 2 生成', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(1, { id: 1, name: '后代模板' });
  fixture.seed_chara(2, { id: 2, name: '另一个模板' });
  // 母亲是模板 2 的后代：角色号落在模板 1 的区间（旧编码会反推成 1），
  // 预设里写 2——分发与生育都必须认字段
  fixture.seed_chara(100000, {
    id: 100000,
    name: '动态母亲',
    portcflag: { 预设模板: 2 },
  });
  assert.equal(fixture.era.addCharacter(100000), true);
  assert.equal(template_no_of(fixture, 100000), 2);

  const child = await fixture
    .load_module('system/chara/chara-pregnancy')
    .gb_add_slave(100000, -1, (n) => (n === 789 ? 1 : 0));

  assert.equal(child, 100100, '模板 2 的 ID 区间，与旧编码的模板 1 不同');
});

test('除名登记读字段：模板 2 的后代落 FLAG:201（旧编码会算出模板 1 → FLAG:200）', () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  assert.equal(fixture.era.addCharacter(0), true);
  fixture.seed_chara(2, { id: 2, name: '另一个模板' });
  fixture.seed_chara(100000, {
    id: 100000,
    name: '后代',
    portcflag: { 预设模板: 2 },
  });
  assert.equal(fixture.era.addCharacter(100000), true);

  fixture.load_module('system/chara-removal').remove_character(100000);

  assert.equal(fixture.era.get('flag:201'), 1, '模板 2 → FLAG:(2+199)');
  assert.equal(fixture.era.get('flag:200') ?? 0, 0, '不按旧编码算出的模板 1');
});

// —— 3. 读档补填 ——

test('backfill_chara_templates：旧存档缺字段的角色按旧编码补，0 号位保持 0', () => {
  const fixture = create_era_fixture();
  // 旧存档读进来的样子：有预设的角色由 fillData 补成预设号，后代补 0
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.seed_chara(31, { id: 31, name: '琼', callname: '琼' });
  fixture.seed_chara(100250, {
    id: 100250,
    name: '三代后代',
    portcflag: { 预设模板: 0 },
  });
  for (const cid of [0, 31, 100250]) {
    assert.equal(fixture.era.addCharacter(cid), true);
  }
  assert.equal(fixture.store.get('portcflag:100250:2'), 0, '旧档补进来的 0');

  const { backfill_chara_templates } = fixture.load_module(
    'system/chara/chara-pregnancy',
  );
  const filled = backfill_chara_templates();

  assert.equal(fixture.store.get('portcflag:0:2'), 0, '魔王是 0');
  assert.equal(fixture.store.get('portcflag:31:2'), 31, '已有值不动');
  assert.equal(
    fixture.store.get('portcflag:100250:2'),
    3,
    '后代按「来源预设各保留 100 位」反推（250 落在模板 3 的区间）',
  );
  assert.equal(filled, 1, '只补了后代那一条');

  // 幂等：再跑一次不改任何值
  assert.equal(backfill_chara_templates(), 0, '补过的角色不再补');
  assert.equal(fixture.store.get('portcflag:100250:2'), 3);
});

test('backfill_chara_templates：字段整体缺失（未初始化）时同样补', () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(1, { id: 1, name: '后代模板' });
  assert.equal(fixture.era.addCharacter([100000, 1]), true);
  // 夹具按预设抄进来的是 :2；旧世界根本没有这个键
  fixture.store.delete('portcflag:100000:2');
  assert.equal(fixture.store.get('portcflag:100000:2'), undefined);

  assert.equal(
    fixture
      .load_module('system/chara/chara-pregnancy')
      .backfill_chara_templates(),
    1,
  );

  assert.equal(fixture.store.get('portcflag:100000:2'), 1);
});

test('EVENTLOAD 链上执行补填：读档后旧角色的字段不再是空的', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你', portcflag: {} });
  fixture.seed_chara(100250, {
    id: 100250,
    name: '三代后代',
    portcflag: { 预设模板: 0 },
  });
  assert.equal(fixture.era.addCharacter(0), true);
  assert.equal(fixture.era.addCharacter(100250), true);
  // 旧存档：魔王是 0 号预设、后代没有预设（fillData 只能补 0）
  fixture.store.set('portcflag:0:2', 0);
  fixture.store.delete('portcflag:100250:2');

  const { emit } = fixture.load_module('system/event/registry');
  fixture.load_module('event/event-load');
  await emit('EVENTLOAD');

  assert.equal(fixture.store.get('portcflag:0:2'), 0, '魔王不用补');
  assert.equal(
    fixture.store.get('portcflag:100250:2'),
    3,
    'EVENTLOAD 把后代补成来源预设号',
  );
});

// —— 4. 引擎：加入时抄写、读档时补齐 ——

engine_test(
  '引擎 addCharacter 把源预设的预设模板抄进目标角色（单号与 [目标, 预设] 两种写法）',
  () => {
    const loader = load_world();
    const adder = create_add_character(loader.static_data, {
      extended_tables: EXTENDED_TABLES,
    });

    assert.equal(adder.add(31), true);
    assert.equal(
      adder.data.portcflag[31][TEMPLATE_FIELD_ID],
      31,
      '单号加入：预设号 = 角色号',
    );

    assert.equal(adder.add([100000, 1]), true);
    assert.equal(
      adder.data.portcflag[100000][TEMPLATE_FIELD_ID],
      1,
      '双号加入：抄的是源预设的预设模板',
    );

    assert.equal(adder.add([120000, 201]), true);
    assert.equal(
      adder.data.portcflag[120000][TEMPLATE_FIELD_ID],
      201,
      '近卫模板同样按源预设抄写',
    );
  },
);

engine_test(
  '0.1.0 存档读到新版本：预设角色由 fillData 补成预设号，后代补 0（读档补填接住）',
  async () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ere-template-884-'));
    try {
      // 旧世界 = 本票之前的名字表与角色预设：portcflag 里没有「预设模板」
      const old_loader = load_world({
        tables: {
          static_data: structuredClone(repo_tables.static_data),
          field_names: structuredClone(repo_tables.field_names),
        },
        drop_template: true,
      });
      assert.equal(old_loader.static_data.portcflag[TEMPLATE_FIELD], undefined);
      const fake_era = {
        path: tmp,
        config: { system: { saveCompressedData: false } },
        global: { saves: {} },
        staticData: {
          ...old_loader.static_data,
          gamebase: {
            // 0.1.0 的版本号（major×1000000 + minor×1000 + patch）
            version: 1000,
            gameCode: 931060,
            allowVersion: 1000,
            defaultChara: 0,
          },
        },
        data: {},
        fieldNames: repo_tables.field_names,
        extendedTables: EXTENDED_TABLES,
        connect: () => {},
        error: () => {},
        log: () => {},
      };
      const api = new engine.era_api(fake_era);
      api.resetData();
      assert.equal(api.addCharacter(31), true);
      assert.equal(api.addCharacter([100000, 1]), true);
      // 旧世界的样子：已登记的字段补 0，本票新增的「预设模板」根本没有
      assert.equal(fake_era.data.portcflag[31][TEMPLATE_FIELD_ID], undefined);
      assert.equal(
        fake_era.data.portcflag[100000][TEMPLATE_FIELD_ID],
        undefined,
      );
      assert.equal(await api.saveData(1, '0.1.0 存档'), true);

      // 读档：改用本票之后的静态数据，引擎 loadData 内部会调 fillData
      fake_era.staticData = {
        ...load_world().static_data,
        gamebase: fake_era.staticData.gamebase,
      };
      fake_era.data = {};
      assert.equal(await api.loadData(1), true, '0.1.0 的存档必须读得回来');

      // 有预设的角色：按自己的预设补成预设号
      assert.equal(api.get('portcflag:31:预设模板'), 31);
      // 没有预设的后代：补 0，等读档补填按旧编码换算
      assert.equal(api.get('portcflag:100000:预设模板'), 0);
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  },
);
