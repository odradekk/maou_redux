/**
 * @file 角色文件里的预设（フラグ / CSTR / MARK / 素質）在加入与读档时真正落库
 * （issue #814）。
 *
 * 背景：引擎的 initCharaTable 只给 yml 名字表里登记的下标建槽并抄角色预设。
 * CFlag.yml / CStr.yml 此前是空表、Mark.yml 没有 4 号、Talent.yml 没有 2 号，
 * 于是 44 个角色文件里的预设值被静默丢掉——狂王（34）加入后等级、基础攻防、
 * 初始装备都是 0。这里用引擎自己的 addCharacter 与 fillData 钉住三件事：
 *
 *   1. 全部角色文件的预设都落在 data 上（新增一列预设而忘了登记时当场红）；
 *   2. 狂王加入后的具体数值（工单验收的第一条）；
 *   3. 旧存档读档时补进哪些槽（ADR-0006 判定「是否需要迁移代码」的依据）。
 *
 * 引擎不在场（无 app.asar）时整文件的引擎用例 skip 并留警告，跳过数计入
 * test/engine-skip-baseline.txt；文件级的 yml 形状用例不依赖引擎，任何环境都跑。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');

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
const EXTENDED_TABLES = {
  portcflag: 2,
  ex_talent: 2,
  c_relation: 2,
  c_relation_sub: 2,
};

// 本工单新登记的下标：旧存档里这些槽都不存在（见 yml/CFlag.yml 的文件头）
const NEW_CFLAG_IDS = [
  0, 1, 2, 9, 11, 12, 13, 14, 15, 16, 41, 42, 46, 120, 151, 152, 420, 450, 451,
  452, 453, 454, 455, 456, 457, 501, 508, 520, 550, 551, 552, 580, 800,
];
// 没有角色预设、但必须登记的代码自有槽：调教结束时的欲情快照（#906）。
// 它要跨过 endTrain 留存（PALAM 随窗口删除），次日评分从日循环里读它
const CODE_OWNED_CFLAG_IDS = [668];
const NEW_CSTR_IDS = [31, 60];

/** 角色文件清单（与引擎同款：文件名以 chara 开头） */
function chara_files() {
  return fs
    .readdirSync(YML_DIR)
    .filter((name) => /^Chara.*\.yml$/i.test(name))
    .sort();
}

/**
 * 装载全部角色文件与变量表，返回引擎侧的装载状态。
 * @param {{ tables?: object }} [options] tables 可换成另一份变量表（模拟旧存档
 *   之前的世界：cflag/cstr 空表、mark 无 4 号、talent 无 2 号）
 */
function load_world({ tables = repo_tables } = {}) {
  const loader = create_chara_loader({ extended_tables: EXTENDED_TABLES });
  attach_variable_tables(loader, tables);
  for (const file of chara_files()) {
    loader.load_rows(
      engine.parse_data_file(
        fs.readFileSync(path.join(YML_DIR, file), 'utf8'),
        'yml',
        'chara',
      ),
    );
  }
  assert.deepEqual(loader.errors, [], '全部角色文件必须零装载错误');
  return loader;
}

/** 从变量表副本里删掉本工单新登记的下标，得到「修复前」的名字表 */
function old_tables() {
  const tables = {
    static_data: structuredClone(repo_tables.static_data),
    field_names: structuredClone(repo_tables.field_names),
  };
  const drop = (table, ids) => {
    const names = tables.static_data[table];
    for (const [name, id] of Object.entries(names)) {
      if (ids.includes(Number(id))) {
        delete names[name];
      }
    }
  };
  drop('cflag', [...NEW_CFLAG_IDS, ...CODE_OWNED_CFLAG_IDS]);
  drop('cstr', NEW_CSTR_IDS);
  drop('mark', [4]);
  drop('talent', [2]);
  return tables;
}

/**
 * 读一个角色文件里的某张预设表（引擎装载后的形状，即预设本身）。
 * @param {object} loader load_world() 的返回值
 * @param {number} cid 角色号
 * @param {string} table 表名
 */
function preset_of(loader, cid, table) {
  return loader.static_data.chara[cid]?.[table] ?? {};
}

// —— 1. 全部角色文件的预设都落库 ——

engine_test(
  '每张表里角色文件的预设都随 addCharacter 落进 data（漏登记即红）',
  () => {
    const loader = load_world();
    const declared = (table) =>
      new Set(Object.values(loader.static_data[table] ?? {}).map(Number));

    // 预设里出现的每个**非零**下标都必须已登记：没登记的下标引擎不建槽、值被
    // 丢弃。值为 0（字符串表是空串）的预设行与引擎建槽时的缺省同值，登记与否
    // 读出来的结果一样，不要求登记——Chara34 的 45:0、Chara150 的 502:0 就是
    // 这一类。
    const blank = (table, value) =>
      value === undefined || value === '' || Number(value) === 0;
    for (const table of ['cflag', 'cstr', 'mark', 'talent']) {
      const used = new Set();
      for (const cid of Object.keys(loader.static_data.chara)) {
        const preset = preset_of(loader, cid, table);
        for (const [index, value] of Object.entries(preset)) {
          if (!blank(table, value)) {
            used.add(Number(index));
          }
        }
      }
      const missing = [...used].filter((index) => !declared(table).has(index));
      assert.deepEqual(
        missing,
        [],
        `${table} 有角色预设在用的下标没登记进 yml：${missing.join(',')}` +
          '——引擎只给名字表内的下标建槽，这些预设会被静默丢弃',
      );
    }

    // 逐角色核对落库：预设值必须等于角色文件里的值，未预设的登记下标是缺省值
    const adder = create_add_character(loader.static_data, {
      extended_tables: EXTENDED_TABLES,
    });
    let checked = 0;
    for (const cid of Object.keys(loader.static_data.chara)) {
      assert.equal(adder.add(Number(cid)), true, `角色 ${cid} 必须能加入`);
      for (const table of ['cflag', 'mark', 'talent']) {
        const preset = preset_of(loader, cid, table);
        for (const index of declared(table)) {
          const want = Number(preset[index] ?? 0);
          assert.equal(
            adder.data[table][cid][index],
            want,
            `角色 ${cid} 的 ${table}:${index} 落库值应是预设 ${want}`,
          );
          checked += 1;
        }
      }
      // 字符串表：没预设的登记下标落空串
      for (const index of declared('cstr')) {
        const want = preset_of(loader, cid, 'cstr')[index] ?? '';
        assert.equal(
          adder.data.cstr[cid][index],
          want,
          `角色 ${cid} 的 cstr:${index} 落库值应是预设「${want}」`,
        );
        checked += 1;
      }
    }
    assert.ok(checked > 0, '逐角色核对必须真的跑过');
  },
);

// —— 2. 狂王（34）加入后的数值与角色文件一致 ——

engine_test(
  '狂王（34）加入：等级、基础攻防、初始装备、所持金与角色文件一致',
  () => {
    const loader = load_world();
    const adder = create_add_character(loader.static_data, {
      extended_tables: EXTENDED_TABLES,
    });

    assert.equal(adder.add(34), true);
    const cflag = adder.data.cflag[34];
    // yml/Chara34.yml 的「フラグ」行
    assert.equal(cflag[1], 2, '状态：侵攻中');
    assert.equal(cflag[9], 1000, '等级 1000');
    assert.equal(cflag[11], 7000, '攻击力 7000');
    assert.equal(cflag[12], 7000, '防御力 7000');
    assert.equal(cflag[13], 6000, '基础攻击 6000');
    assert.equal(cflag[14], 6000, '基础防御 6000');
    assert.equal(cflag[16], -1, '初吻对象：未设定');
    assert.equal(cflag[41], 252, '上衣类型 252');
    assert.equal(cflag[420], 1, '命名检查');
    assert.equal(cflag[520], 8, '目标阶层 8');
    assert.equal(cflag[550], 410050, '初始武装');
    assert.equal(cflag[551], 10016, '初始装饰');
    assert.equal(cflag[552], 10017, '初始装饰 2');
    assert.equal(cflag[580], 1000000, '所持金 1000000');
    assert.equal(cflag[800], 4, '特殊角色标记：狂王');
    // 「MARK」与「素質」行
    assert.equal(adder.data.mark[34][4], 3, '反抗刻印履历 = 3');
    assert.equal(adder.data.talent[34][2], 1, '狂王替身');
    // 没预设的登记下标落缺省值（不是 undefined——那会让读点拿到旧口径）
    assert.equal(cflag[2], 0, '没预设的好感度落 0');
    assert.equal(adder.data.mark[34][0], 0, '没预设的苦痛刻印落 0');
  },
);

engine_test('CSTR 预设随加入落库：丽塔的 31 号与嘉德的 60 号自称', () => {
  const loader = load_world();
  const adder = create_add_character(loader.static_data, {
    extended_tables: EXTENDED_TABLES,
  });

  assert.equal(adder.add(223), true);
  assert.equal(adder.data.cstr[223][31], '我', 'CSTR,31,我');
  assert.equal(adder.add(33), true);
  assert.equal(adder.data.cstr[33][60], '本宫', 'CSTR,60,本宫');
});

// —— 3. 读档：旧存档里没写过的槽按预设补上 ——

engine_test(
  '读档补槽：旧存档里从未写过的 cflag/mark/talent 槽按角色预设补齐（ADR-0006 判定依据）',
  async () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ere-preset-814-'));
    try {
      // 旧世界 = 本工单之前的名字表：cflag/cstr 空表、mark 无 4 号、talent 无 2 号
      const old_loader = load_world({ tables: old_tables() });
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
      assert.equal(api.addCharacter(34), true);
      // 旧世界的样子：这些槽一个都不存在（预设被名字表缺口丢下）。角色桶
      // 本身由 addCharacter 建，所以是空对象而不是 undefined
      assert.deepEqual(fake_era.data.cflag[34], {});
      assert.equal(fake_era.data.mark[34][4], undefined);
      assert.equal(fake_era.data.talent[34][2], undefined);
      assert.equal(await api.saveData(1, '旧存档'), true);

      // 读档：换成修复后的名字表，重启后 loadData（内部会调 fillData）
      fake_era.staticData = {
        ...load_world().static_data,
        gamebase: fake_era.staticData.gamebase,
      };
      fake_era.data = {};
      assert.equal(await api.loadData(1), true);

      // fillData 为每个已加入角色补齐登记下标，值取角色预设
      assert.equal(api.get('cflag:34:9'), 1000, '等级补成预设 1000');
      assert.equal(api.get('cflag:34:13'), 6000, '基础攻击补成预设 6000');
      assert.equal(api.get('cflag:34:550'), 410050, '初始武装补成预设');
      assert.equal(api.get('mark:34:4'), 3, '反抗刻印履历补成预设 3');
      assert.equal(api.get('talent:34:2'), 1, '狂王替身补成预设 1');
      // 没预设的登记下标补 0（与补槽前的 undefined 同判定结果）
      assert.equal(api.get('cflag:34:2'), 0);
      // 代码自有的槽同样补 0：旧存档读进来与「没有这个槽」表现一致（ADR-0006
      // 的判定依据——#906 的新槽不需要抬存档版本）
      assert.equal(api.get('cflag:34:668'), 0);
      // 状态位同样按预设补：原版 1 = 待機、2 = 侵攻中，与移植版 0 = 在城可
      // 操作不同——这是本工单唯一的语义差异，逐序号结论见 PR
      assert.equal(api.get('cflag:34:1'), 2);
      // CSTR 的读档路径根本不会补：fillData 的 `this.data.cstr || (…)` 只在
      // 存档完全没有 cstr 桶时才进，进了也把预设路径拼成 `<角色>.chara.<下标>`
      // （恒 undefined → 空串）。所以这两个预设只在新加入时生效
      assert.equal(api.get('cstr:34:60'), undefined, 'CSTR 预设不在读档路径上');
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  },
);

// —— 4. yml 形状：新登记的条目带中文键 + 英文 snake_case 的 name + type ——

/**
 * 解析一张 yml 名字表里的「键 / id / name / type」四元组。
 * @param {string} file yml 文件名
 * @returns {Array<{ key: string, id: number, name?: string, type?: string }>}
 */
function parse_entries(file) {
  const text = fs.readFileSync(path.join(YML_DIR, file), 'utf8');
  const entries = [];
  for (const match of text.matchAll(/^"([^"]+)":\r?\n((?: {2}.+\r?\n)+)/gm)) {
    const entry = { key: match[1] };
    for (const line of match[2].split(/\r?\n/)) {
      const field = /^ {2}(id|name|type): (.+)$/.exec(line);
      if (!field) {
        continue;
      }
      entry[field[1]] =
        field[1] === 'id' ? Number(field[2]) : field[2].replace(/"/g, '');
    }
    entries.push(entry);
  }
  return entries;
}

test('CFlag.yml 登记了角色预设用到的全部下标，每条带英文 snake_case 的 name 与 type', () => {
  const entries = parse_entries('CFlag.yml');
  const ids = entries.map((entry) => entry.id).sort((a, b) => a - b);
  assert.deepEqual(
    ids,
    [...NEW_CFLAG_IDS, ...CODE_OWNED_CFLAG_IDS].sort((a, b) => a - b),
    'CFlag.yml 的下标集合必须正好是角色预设在用的那 33 个，加上 #906 的代码自有槽',
  );
  for (const entry of entries) {
    assert.match(
      entry.name ?? '',
      /^[a-z][a-z0-9_]*$/,
      `cflag:${entry.id}「${entry.key}」的 name 必须是英文 snake_case，实为 ${entry.name}`,
    );
    assert.equal(
      entry.type,
      'number',
      `cflag:${entry.id} 的 type 必须是 number`,
    );
  }
  const names = entries.map((entry) => entry.name);
  assert.equal(new Set(names).size, names.length, 'name 不得重复');
});

test('CStr/Mark/Talent 的新增条目同样带 name 与 type', () => {
  const shapes = [
    ['CStr.yml', [31, 60], 'string'],
    ['Mark.yml', [4], 'number'],
    ['Talent.yml', [2], 'number'],
  ];
  for (const [file, ids, type] of shapes) {
    const entries = parse_entries(file);
    for (const id of ids) {
      const entry = entries.find((item) => item.id === id);
      assert.ok(entry, `${file} 缺 ${id} 号条目`);
      assert.match(
        entry.name ?? '',
        /^[a-z][a-z0-9_]*$/,
        `${file} 的 ${id} 号 name 必须是英文 snake_case`,
      );
      assert.equal(entry.type, type, `${file} 的 ${id} 号 type 必须是 ${type}`);
    }
  }
});
