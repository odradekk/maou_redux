/**
 * @file 调教期表、flag、cstr 的名字登记（issue #830）。
 *
 * TFlag / TEquip / Stain 的名字此前只写在 tools/facade-names.js 里，yml 侧是
 * 空表；flag 有一批源码在用的序号没有登记；cstr 的八个名字同样只在
 * facade-names。本文件把「登记」这件事的两侧都钉住：
 *
 *   - **登记面**（不依赖引擎）：源码里按字面量下标寻址的 flag / tflag /
 *     tequip / stain / cstr 序号，必须在对应 yml 里有一条；四张调教域表的中文
 *     键必须与 facade-names.js 逐条一致（名字只有一个来源）。
 *   - **行为面**（驱动 app.asar）：登记会改变引擎行为，五条都要有用例——
 *     ① beginTrain 把登记的 tflag 序号预置 0；② add 打在登记过的槽上不再出
 *     NaN（未登记的槽仍是 NaN，这就是「登记顺手修掉的那批点」的判据）；
 *     ③ addCharacterForTrain 预置 tequip / stain 为 0；④ addCharacter 给 cstr
 *     预置空串；⑤ 旧存档读档时 fillData 把登记的 flag 补成 0 且不动已写过的
 *     值；⑥ flag:60 那条 add 不再把 NaN 带进存档。
 *
 * 改前的红：TFlag.yml 是空表 → beginTrain 一格都不预置，tflag:30/402 累加出
 * NaN；flag:60 的 add 同理，NaN 在 JSON 里落成 null 进了存档。
 *
 * 引擎不在场（无 app.asar）时行为面五条 skip，登记面两条照常跑。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');

const { NAMES } = require('../tools/facade-names');
const { load_engine_bundle } = require('./helpers/engine-bundle');
const { load_repo_variable_tables } = require('./helpers/static-tables');

const REPO_ROOT = path.resolve(__dirname, '..');
const ERE_DIR = path.join(REPO_ROOT, 'ere');
const YML_DIR = path.join(REPO_ROOT, 'yml');

const engine = load_engine_bundle();
const engine_test = engine ? test : test.skip;

/** 表 → 名字表文件。五张表都只有「中文键 + id/name/type」这一种形状。 */
const TABLES = {
  flag: 'Flag.yml',
  tflag: 'TFlag.yml',
  tequip: 'TEquip.yml',
  stain: 'Stain.yml',
  cstr: 'CStr.yml',
};

/** 解析 yml 里声明的序号（只认 `"键":` + 两空格缩进的 `id:`，同引擎装载形状） */
function declared_ids(table) {
  const text = fs.readFileSync(path.join(YML_DIR, TABLES[table]), 'utf8');
  const ids = new Map();
  let key = null;
  for (const line of text.split('\n')) {
    const key_match = /^"([^"]+)":\s*$/.exec(line);
    if (key_match) {
      key = key_match[1];
      continue;
    }
    const id_match = /^ {2}id: (\d+)$/.exec(line);
    if (id_match && key !== null) {
      ids.set(Number(id_match[1]), key);
      key = null;
    }
  }
  return ids;
}

/** 递归收集 ere/ 下的 .js */
function walk_js(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk_js(full, out);
    } else if (entry.name.endsWith('.js')) {
      out.push(full);
    }
  }
  return out;
}

/** 去掉注释（块注释保留换行，行号仍对得上源码） */
function strip_comments(body) {
  return body
    .replace(/\/\*[\s\S]*?\*\//g, (block) => block.replace(/[^\n]/g, ''))
    .replace(/(^|[^:'"`\\])\/\/.*$/gm, '$1');
}

/**
 * 扫出源码里按字面量下标寻址的条目。
 *
 * 两段地址（`flag:0` / `tflag:0`）取第二段，三段地址（`tequip:31:45` /
 * `stain:31:2` / `cstr:31:7`）取第三段；下标是插值的地址（`flag:${n}`、
 * `flag:${template_no + 199}`）无法核对，跳过——那一族历来靠人工。
 *
 * @returns {Object<string, Map<number, string>>} 表 → 序号 → 首个引用处
 */
function literal_addresses() {
  const found = {};
  for (const table of Object.keys(TABLES)) {
    found[table] = new Map();
  }
  for (const file of walk_js(ERE_DIR)) {
    if (path.basename(file) === 'era-electron.js') {
      continue;
    }
    const source = fs.readFileSync(file, 'utf8');
    const body = strip_comments(source);
    const where = path.relative(REPO_ROOT, file).replace(/\\/g, '/');
    for (const match of body.matchAll(
      /era\.(?:get|set|add)\(\s*(?:'([^'\n]*)'|"([^"\n]*)"|`([^`]*)`)/g,
    )) {
      const address = match[1] ?? match[2] ?? match[3];
      const parts = address.split(':');
      const table = parts[0].toLowerCase();
      if (!(table in found)) {
        continue;
      }
      const segment = parts.length === 2 ? parts[1] : parts[2];
      if (segment === undefined || !/^-?\d+$/.test(segment)) {
        continue;
      }
      const index = Number(segment);
      if (!found[table].has(index)) {
        const line = body.slice(0, match.index).split('\n').length;
        found[table].set(index, `${where}:${line}`);
      }
    }
  }
  return found;
}

test('源码按字面量下标寻址的 flag / tflag 序号都已登记（#830）', () => {
  const addresses = literal_addresses();
  const missing = [];
  for (const table of ['flag', 'tflag']) {
    const declared = declared_ids(table);
    for (const [index, where] of [...addresses[table]].sort(
      (a, b) => a[0] - b[0],
    )) {
      if (!declared.has(index)) {
        missing.push(
          `${table}:${index}（${TABLES[table]} 无此序号，首个引用 ${where}）`,
        );
      }
    }
  }
  assert.deepEqual(
    missing,
    [],
    '这些序号源码在用、yml 没有登记：登记前读到 undefined，add 会累出 NaN',
  );
  // 扫描本身要有产出——正则失效会让上面的断言退化成空转
  const total = Object.values(addresses).reduce(
    (sum, sites) => sum + sites.size,
    0,
  );
  assert.ok(total >= 150, `从 ere/ 扫出的序号只有 ${total} 个，扫描八成失效了`);
});

// tequip / stain 的建模范围是各自的族票定的（#215 的 15 个装具位、facade-names
// 的三个污渍位），源码里还有一批照样在写、但没有名字来源的下标。这份缺口钉在
// 这里：新出现一个无名字的下标会当场红，而不是悄悄停在「读 undefined、写 NaN」
// 的状态里等人发现。
test('tequip / stain 的无名下标是一份已知清单（本票不补，随族票建模）（#830）', () => {
  const addresses = literal_addresses();
  const gap = (table) =>
    [...addresses[table]]
      .filter(([index]) => !declared_ids(table).has(index))
      .map(([index]) => index)
      .sort((a, b) => a - b);
  assert.deepEqual(
    gap('tequip'),
    [11, 13, 14, 15, 16, 17, 19, 43, 44, 46, 47, 49, 88, 98],
    'TEQUIP 的未建模位：源码在写、facade-names 没有名字（随 ownership 与族票补）',
  );
  assert.deepEqual(
    gap('stain'),
    [0, 1, 4],
    'STAIN 的未建模位：0/1/4 没有名字来源（2/3/5 已登记）',
  );
  assert.deepEqual(
    [...addresses.cstr.keys()].filter(
      (index) => !declared_ids('cstr').has(index),
    ),
    [30],
    'CSTR 只差 30（处刑称号，只写不读、没有名字来源）',
  );
});

test('四张调教域表的中文键与 tools/facade-names.js 逐条一致（#830）', () => {
  const problems = [];
  for (const table of ['tflag', 'tequip', 'stain', 'cstr']) {
    const declared = declared_ids(table);
    const manual = new Map(
      Object.entries(NAMES[table]).map(([index, entry]) => [
        Number(index),
        entry.name,
      ]),
    );
    for (const [index, key] of declared) {
      if (!manual.has(index)) {
        // cstr 的 31 / 60 是 #830 之前就登记的两条（角色预设在用、没有门面
        // 字段），其余表出现无名条目就是凭空多出来的一格
        if (table !== 'cstr') {
          problems.push(
            `${TABLES[table]} 多出 facade-names 没有的 ${table}:${index}「${key}」`,
          );
        }
      } else if (manual.get(index) !== key) {
        problems.push(
          `${TABLES[table]} 的 ${table}:${index} 中文键「${key}」与 facade-names「${manual.get(index)}」不一致`,
        );
      }
    }
    for (const [index, key] of manual) {
      if (!declared.has(index)) {
        problems.push(
          `${TABLES[table]} 缺 ${table}:${index}「${key}」（facade-names 有名字）`,
        );
      }
    }
  }
  assert.deepEqual(problems, [], '名字只有一个来源：facade-names.js');
});

// —— 以下驱动 app.asar 的真方法，无引擎时整组 skip ——

/** 仓库变量表装载结果：五张名字表 + 其余入库表（角色预设要用） */
function repo_tables() {
  const tables = load_repo_variable_tables();
  for (const [table, file] of [
    ['flag', 'Flag.yml'],
    ['tflag', 'TFlag.yml'],
    ['tequip', 'TEquip.yml'],
    ['stain', 'Stain.yml'],
  ]) {
    tables.load_rows(
      engine.parse_data_file(
        fs.readFileSync(path.join(YML_DIR, file), 'utf8'),
        'yml',
        table,
      ),
      table,
    );
  }
  return tables;
}

/**
 * 造一份引擎实例（`new era_api(fake_era)`）：path 指向临时目录，静态表取
 * yml/ 装载结果，GameBase 两枚公章按 AGENTS.md 的现行值。角色预设只给 31 号
 * （调教对象的典型编号），不带 defaultChara——resetData 因此不建初始角色，
 * 用例自己决定谁入列。era.error 只收集不抛：引擎的 key error 分支要靠它留痕。
 *
 * @returns {{ api: object, errors: string[] }}
 */
function make_api(static_tables, dir) {
  const errors = [];
  const fake_era = {
    path: dir,
    config: { system: { saveCompressedData: false } },
    global: { saves: {} },
    staticData: static_tables.static_data,
    fieldNames: static_tables.field_names,
    data: {},
    extendedTables: {},
    connect: () => {},
    error: (...args) => errors.push(String(args[0])),
    log: () => {},
  };
  fake_era.staticData.chara = { 31: { id: 31, name: '琼', callname: '琼' } };
  fake_era.staticData.relationship = { callname: {}, relation: {} };
  fake_era.staticData.gamebase = {
    gameCode: 931060,
    version: 1005,
    allowVersion: 1000,
  };
  return { api: new engine.era_api(fake_era), errors };
}

/** 临时目录：先建、跑完删（异步体要等完再删） */
async function with_temp_dir(run) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ere-830-'));
  try {
    return await run(dir);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

engine_test(
  'beginTrain 把登记的 tflag 序号预置 0：106 格全部可读可加（#830）',
  async () => {
    await with_temp_dir(async (dir) => {
      const { api, errors } = make_api(repo_tables(), dir);
      api.resetData();

      // 入列之前：tflag 表不存在，二段寻址落引擎的 key error 分支
      assert.equal(api.set('tflag:0', 1), undefined);
      assert.deepEqual(errors, ['key error in getter/setter! key (tflag:0)']);

      api.beginTrain(31);
      const { data } = api.raw();
      const declared = declared_ids('tflag');
      assert.equal(
        declared.size,
        106,
        'TFlag.yml 应登记 106 条（facade-names 全覆盖）',
      );
      for (const index of declared.keys()) {
        assert.equal(
          data.tflag[index],
          0,
          `TFLAG:${index} 必须由 beginTrain 预置成 0（登记前是 undefined）`,
        );
      }
      // 预置之后立刻可累加——这正是登记修掉的那批 NaN
      assert.equal(api.add('tflag:30', 2), 2);
      assert.equal(api.add('tflag:30', 1), 3);
    });
  },
);

engine_test(
  'add 打在登记过的槽上是数字，未登记的槽仍是 NaN：tflag:30 / tflag:402 / flag:60（#830）',
  async () => {
    await with_temp_dir(async (dir) => {
      const { api } = make_api(repo_tables(), dir);
      api.resetData();
      api.beginTrain(31);

      // 两处真实写点：主人经验（com-analsex / com-assistant / com-caress /
      // com-hardcore / com-service / com-sm / com-vaginasex 共十四处 add）
      // 与死斗场收入（com-colosseum 的八处 add）
      assert.equal(api.add('tflag:30', 1), 1, 'TFLAG:30 主人经验');
      assert.equal(api.add('tflag:30', 1), 2);
      assert.equal(api.add('tflag:402', 13000), 13000, 'TFLAG:402 死斗场收入');
      // flag 侧唯一一处 add：勇者基础等级修正（enter-enemy 的遗传等级）
      assert.equal(api.add('flag:60', 1), 1, 'FLAG:60 勇者基础等级修正');

      // 对照：没登记的序号上 add 仍是 undefined + n = NaN（引擎 setVar 的
      // 加法分支 `this.data[a][u] += t`，槽不存在时不报错、静默写回 NaN）
      assert.ok(
        Number.isNaN(api.add('tflag:3050', 1)),
        '未登记的 tflag 序号上 add 仍是 NaN——登记才是那批点的唯一修法',
      );
      assert.ok(
        Number.isNaN(api.add('flag:1234', 1)),
        '未登记的 flag 序号同理',
      );
    });
  },
);

engine_test(
  'addCharacterForTrain 预置 tequip / stain 为 0：位掩码 add 从 0 起算（#830）',
  async () => {
    await with_temp_dir(async (dir) => {
      const { api } = make_api(repo_tables(), dir);
      api.resetData();
      api.beginTrain(31);
      const { data } = api.raw();

      for (const index of declared_ids('tequip').keys()) {
        assert.equal(data.tequip[31][index], 0, `TEQUIP:${index} 预置 0`);
      }
      for (const index of declared_ids('stain').keys()) {
        assert.equal(data.stain[31][index], 0, `STAIN:${index} 预置 0`);
      }
      // 装具位是「装上 = 1」，污渍位是位掩码，两者都从 0 起算才对
      assert.equal(api.add('tequip:31:53', 1), 1, 'TEQUIP:53 录像摄影');
      // 口上的「未装着」守卫写成 `tequip:X === 0` / `== 0`（K1/K2/K5/K6/K9/K10/
      // K12/K14/K19/K904 等十余处），预置 0 才让这些分支在真引擎上可达——
      // 登记前它们是 undefined，恒不等于 0，整条分支在实机上是死代码
      for (const index of [45, 89, 90]) {
        assert.equal(
          api.get(`tequip:31:${index}`),
          0,
          `TEQUIP:${index} 必须是 0（口上的 === 0 守卫按它判「未装着」）`,
        );
      }
      assert.equal(api.add('stain:31:2', 1), 1, 'STAIN:2 阴茎污渍');
      assert.equal(api.add('stain:31:2', 4), 5, '位掩码累加：1 | 4');
      // 对照：facade-names 没有的 tequip 序号仍是 undefined + n = NaN
      assert.ok(Number.isNaN(api.add('tequip:31:17', 1)));
    });
  },
);

engine_test(
  'addCharacter 给登记的 cstr 序号预置空串，不是数字 0（#830）',
  async () => {
    await with_temp_dir(async (dir) => {
      const { api } = make_api(repo_tables(), dir);
      api.resetData();
      api.addCharacter(31);
      const { data } = api.raw();
      const declared = declared_ids('cstr');
      assert.equal(
        declared.size,
        10,
        'CStr.yml 应登记 10 条（本票 8 条 + 既有的 31/60）',
      );
      for (const index of declared.keys()) {
        assert.equal(
          data.cstr[31][index],
          '',
          `CSTR:${index} 预置成空串（字符串表的缺省，不是数字 0）`,
        );
      }
    });
  },
);

engine_test(
  '0.1.0 旧档读档：登记的 flag 补 0，已写过的值一个不动（#830）',
  async () => {
    await with_temp_dir(async (dir) => {
      const { api } = make_api(repo_tables(), dir);

      // 基础存档由引擎自己产出（resetData → saveData），再把 flag 桶清空、
      // 只回填「存档里真正写过的值」，并把【版本】回盖到 0.1.0 的 1000。
      // 0.1.0 的存档对当时已声明的序号也会带一批 0 值键；这里取的是它的
      // 更强形状（连那些 0 也没有），读档后两者同值。
      api.resetData();
      assert.equal(await api.saveData(0, '旧档基线'), true);

      const save_path = path.join(dir, 'sav', 'save0.sav');
      const saved = JSON.parse(fs.readFileSync(save_path, 'utf8'));
      saved.flag = {};
      saved.flag['81'] = 3700; // 人间界侵攻度：0.1.0 时已声明、写过的值
      saved.flag['9'] = 5; // 特别税加成：同上
      saved.version = 1000; // 0.1.0 的【版本】编码
      fs.writeFileSync(save_path, JSON.stringify(saved), 'utf8');

      assert.equal(await api.loadData(0), true, '0.1.0 存档必须被引擎接受');
      const { data } = api.raw();
      const preserved = new Map([
        [81, 3700], // 人间界侵攻度
        [9, 5], // 特别税加成
      ]);
      for (const index of declared_ids('flag').keys()) {
        if (preserved.has(index)) {
          continue;
        }
        assert.equal(
          data.flag[index],
          0,
          `FLAG:${index} 旧档读档后补 0（fillData 按静态声明补值）`,
        );
      }
      // 三个本票新登记的代表位：读档后是 0 而不是 undefined
      assert.equal(data.flag[0], 0, 'FLAG:0 休息');
      assert.equal(data.flag[402], 0, 'FLAG:402 派遣奴隶标志');
      assert.equal(data.flag[614], 0, 'FLAG:614 人类牧场设定');
      // 已登记的既有序号保留存档里的值（补值只对缺键生效）
      for (const [index, value] of preserved) {
        assert.equal(data.flag[index], value, `FLAG:${index} 保留存档值`);
      }
    });
  },
);

engine_test(
  'flag:60 的 add 不再把 NaN 写进存档（NaN 在 JSON 里是 null）（#830）',
  async () => {
    await with_temp_dir(async (dir) => {
      const { api } = make_api(repo_tables(), dir);
      api.resetData();
      // 勇者来袭时按 flag:60 逐级调 st_up 之前先加一（enter-enemy 的唯一写点）
      assert.equal(api.add('flag:60', 1), 1);
      assert.equal(await api.saveData(1, '勇者登场'), true);
      const saved = JSON.parse(
        fs.readFileSync(path.join(dir, 'sav', 'save1.sav'), 'utf8'),
      );
      assert.equal(
        saved.flag['60'],
        1,
        'FLAG:60 必须落成数字 1——登记前是 undefined + 1 = NaN，序列化成 null',
      );
    });
  },
);
