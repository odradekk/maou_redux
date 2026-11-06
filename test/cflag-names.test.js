/**
 * @file cflag 其余序号补名字（issue #831）。
 *
 * cflag 用到 256 个序号，master 上只有 #814 登记的角色预设在用的那 34 个；
 * 其余 179 个（源码在读写、facade-names 有名字）在名字表里缺席。本票把它们
 * 登记进 yml/CFlag.yml，本文件把「登记」这件事的两侧都钉住：
 *
 *   - **登记面**（不依赖引擎）：源码按字面量下标寻址的 cflag 序号，要么在
 *     CFlag.yml 里有一条，要么在下面那份**无名位清单**里（两处都没有名字、
 *     本票不凭空造名）；中文键与 tools/facade-names.js 逐条一致；id 唯一。
 *   - **行为面**（驱动 app.asar）：登记会改变引擎行为，四条都要有用例——
 *     ① addCharacter 给每个角色建出全部登记序号（值 = 角色预设，无预设为 0），
 *     这也是存档体积增长的那部分；② add 打在登记过的槽上不再是 NaN；
 *     ③ 旧档（0.1.0 形状、cflag 桶为空）读档时补齐为 0、已写过的值保留；
 *     ④ `=== 0` 那几个严格比较点（500 / 504 / 650）读到的确实是数字 0 而不是
 *     undefined——登记前它们恒假，正是本票「修复」类判定的机器判据。
 *
 * 为什么不能只看测试绿：夹具不镜像 yml 声明集（#977），登记前后的差别在
 * 夹具里看不见；④ 那三条分支在夹具里永远走不到。
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

const engine = load_engine_bundle();
const engine_test = engine ? test : test.skip;

const REPO_ROOT = path.resolve(__dirname, '..');
const ERE_DIR = path.join(REPO_ROOT, 'ere');
const YML_DIR = path.join(REPO_ROOT, 'yml');

/**
 * 无名字位：源码在读写、但 tools/facade-names.js 与 yml 两处都没有名字。
 *
 * 本票不登记它们（#830 对 tequip 的 14 个无名字位同款处理）：没有名字就没有
 * 语义依据，登记会让引擎在每个角色上多建一格含义不明的槽。清单是显式的——
 * 新出现一个无名字的下标当场红，而不是悄悄停在「读 undefined、写 NaN」。
 * 152 / 450 / 800 不在此列（它们已经有名字、也已登记；缺的只是 facade-names
 * 那一侧的条目，因此没有门面访问器）。
 */
const UNNAMED_IDS = [
  22, 24, 25, 62, 74, 77, 90, 99, 100, 458, 459, 494, 497, 509, 512, 513, 514,
  515, 530, 531, 532, 533, 535, 536, 537, 538, 539, 540, 581, 600, 603, 604,
  605, 609, 621, 661, 662, 663, 664, 665, 680, 681, 682,
];

/** 已登记但只在 yml 有名字的三条（#814 起就在，facade-names 没有条目） */
const YML_ONLY_IDS = [152, 450, 800];

/** 本票补登的 179 个序号（yml 里补登段的实证条数） */
const NEW_IDS_COUNT = 179;

/** 登记后的总条数：34（#814 + #906）+ 179（本票） */
const DECLARED_COUNT = 213;

/** 本票里 add 会从 NaN 变成数字的序号（见补登段各条的注释） */
const ADD_IDS = [31, 81, 82, 106, 107, 666, 667];

/** 解析 yml 里声明的序号（`"键":` + 两空格缩进的 `id:`，同引擎装载形状） */
function declared_ids() {
  const text = fs.readFileSync(path.join(YML_DIR, 'CFlag.yml'), 'utf8');
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
 * 扫出源码里按字面量下标寻址的 cflag 序号。
 *
 * 三段地址（`cflag:31:504`）取第三段；下标是插值的地址（`cflag:${cid}:${slot}`）
 * 无法核对，跳过——那一族历来靠人工。`portcflag` 的地址不算（表名不是 cflag）。
 *
 * @returns {Map<number, string>} 序号 → 首个引用处（文件:行）
 */
function literal_addresses() {
  const found = new Map();
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
      if (parts[0].toLowerCase() !== 'cflag' || parts.length !== 3) {
        continue;
      }
      if (!/^-?\d+$/.test(parts[2])) {
        continue;
      }
      const index = Number(parts[2]);
      if (!found.has(index)) {
        const line = body.slice(0, match.index).split('\n').length;
        found.set(index, `${where}:${line}`);
      }
    }
  }
  return found;
}

test('源码按字面量下标寻址的 cflag 序号：已登记，或在那份无名位清单里（#831）', () => {
  const addresses = literal_addresses();
  const declared = declared_ids();
  const missing = [...addresses]
    .filter(([index]) => !declared.has(index))
    .map(([index]) => index)
    .sort((a, b) => a - b);
  assert.deepEqual(
    missing,
    UNNAMED_IDS,
    '这些序号源码在用、CFlag.yml 没有登记：登记前读到 undefined、add 会累出 NaN；' +
      '新补名字的请登记进 yml，确实没有名字来源的才加进 UNNAMED_IDS',
  );
  // 扫描本身要有产出——正则失效会让上面的断言退化成空转
  assert.ok(
    addresses.size >= 250,
    `从 ere/ 扫出的 cflag 序号只有 ${addresses.size} 个，扫描八成失效了`,
  );
});

test('CFlag.yml 的条数与本票的补登面对得上（#831）', () => {
  const declared = declared_ids();
  assert.equal(
    declared.size,
    DECLARED_COUNT,
    `CFlag.yml 应登记 ${DECLARED_COUNT} 条（#814 的 34 条 + 本票补登的 ${NEW_IDS_COUNT} 条）`,
  );
  assert.equal(
    new Set(declared.keys()).size,
    declared.size,
    '同一个序号不得出现两次（引擎装载时按序号去重，后者会顶掉前者并告警）',
  );
});

test('中文键与 tools/facade-names.js 逐条一致，只在 yml 有名字的只有那三条（#831）', () => {
  const declared = declared_ids();
  const manual = new Map(
    Object.entries(NAMES.cflag).map(([index, entry]) => [
      Number(index),
      entry.name,
    ]),
  );
  const problems = [];
  for (const [index, key] of declared) {
    if (!manual.has(index)) {
      if (!YML_ONLY_IDS.includes(index)) {
        problems.push(`CFlag.yml 多出 facade-names 没有的 ${index}「${key}」`);
      }
      continue;
    }
    if (manual.get(index) !== key) {
      problems.push(
        `CFlag.yml 的 ${index} 中文键「${key}」与 facade-names「${manual.get(index)}」不一致`,
      );
    }
  }
  for (const [index, key] of manual) {
    if (!declared.has(index)) {
      problems.push(`CFlag.yml 缺 ${index}「${key}」（facade-names 有名字）`);
    }
  }
  assert.deepEqual(problems, [], '名字只有一个来源：tools/facade-names.js');
});

// —— 以下驱动 app.asar 的真方法，无引擎时整组 skip ——

/**
 * 造一份引擎实例（`new era_api(fake_era)`）：path 指向临时目录，静态表取
 * yml/ 装载结果。角色只给 31 号的最小形状（只有 id / name / callname，
 * **不带 CFLAG 预设段**）——这样登记过的槽全部落「没有预设 → 0」这一支，
 * 断言不必跟着角色文件里的具体数值走；预设值的落库由
 * test/chara-preset-apply.test.js 逐字段覆盖。
 *
 * @returns {{ api: object, errors: string[] }}
 */
function make_api(dir, tables) {
  const errors = [];
  const static_data = structuredClone(tables.static_data);
  static_data.chara = { 31: { id: 31, name: '琼', callname: '琼' } };
  static_data.relationship = { callname: {}, relation: {} };
  static_data.gamebase = {
    gameCode: 931060,
    version: 1005,
    allowVersion: 1000,
  };
  const fake_era = {
    path: dir,
    config: { system: { saveCompressedData: false } },
    global: { saves: {} },
    staticData: static_data,
    fieldNames: structuredClone(tables.field_names),
    data: {},
    extendedTables: {},
    connect: () => {},
    error: (...args) => errors.push(String(args[0])),
    log: () => {},
  };
  return { api: new engine.era_api(fake_era), errors };
}

/** 临时目录：先建、跑完删（异步体要等完再删） */
async function with_temp_dir(run) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ere-831-'));
  try {
    return await run(dir);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

engine_test(
  'addCharacter 建出全部登记序号：每个角色 213 格，无预设为 0（登记前是 undefined，#831）',
  async () => {
    await with_temp_dir(async (dir) => {
      const { api } = make_api(dir, load_repo_variable_tables());
      api.resetData();
      api.addCharacter(31);
      const { data } = api.raw();
      const declared = declared_ids();
      for (const index of declared.keys()) {
        assert.equal(
          typeof data.cflag[31][index],
          'number',
          `cflag:31:${index} 必须由 addCharacter 建成数字（登记前是 undefined）`,
        );
      }
      // 夹具里的 31 号不带 CFLAG 预设段，登记过的槽全部落 0
      for (const index of declared.keys()) {
        assert.equal(
          data.cflag[31][index],
          0,
          `cflag:31:${index} 无预设时应为 0`,
        );
      }
      // 存档体积增长的就是这一行：213 格 × 每个已加入角色
      assert.equal(
        Object.keys(data.cflag[31]).length,
        DECLARED_COUNT,
        '每个角色的 cflag 行应正好是登记集大小',
      );
    });
  },
);

engine_test(
  'add 打在登记过的槽上是数字：31 / 81 / 82 / 106 / 107 / 666 / 667（#831）',
  async () => {
    await with_temp_dir(async (dir) => {
      const { api } = make_api(dir, load_repo_variable_tables());
      api.resetData();
      api.addCharacter(31);

      for (const index of ADD_IDS) {
        assert.equal(
          api.add(`cflag:31:${index}`, 2),
          2,
          `cflag:31:${index} 的 add 必须从 0 起算（登记前是 undefined + 2 = NaN）`,
        );
        assert.equal(api.add(`cflag:31:${index}`, 1), 3);
      }
      // 对照：没登记的无名位仍是 NaN——登记才是那批点的唯一修法
      assert.ok(
        Number.isNaN(api.add('cflag:31:661', 1)),
        '未登记的 cflag 序号上 add 仍是 NaN（661 在无名位清单里）',
      );

      assert.equal(await api.saveData(1, 'add 落档'), true);
      const saved = JSON.parse(
        fs.readFileSync(path.join(dir, 'sav', 'save1.sav'), 'utf8'),
      );
      for (const index of ADD_IDS) {
        assert.equal(
          saved.cflag['31'][index],
          3,
          `cflag:31:${index} 必须落成数字 3——登记前是 NaN，JSON 里序列化成 null`,
        );
      }
    });
  },
);

engine_test(
  '0.1.0 旧档读档：登记的 cflag 补 0，已写过的值一个不动（#831）',
  async () => {
    await with_temp_dir(async (dir) => {
      const { api } = make_api(dir, load_repo_variable_tables());

      // 基础存档由引擎自己产出（resetData → saveData），再把 cflag 桶清成
      // 0.1.0 的形状（当时 CFlag.yml 是空表，一格都没有）、只回填一个写过的
      // 值，并把【版本】回盖到 0.1.0 的 1000。
      api.resetData();
      api.addCharacter(31);
      assert.equal(await api.saveData(0, '旧档基线'), true);

      const save_path = path.join(dir, 'sav', 'save0.sav');
      const saved = JSON.parse(fs.readFileSync(save_path, 'utf8'));
      saved.cflag = { 31: { 9: 12 } };
      saved.version = 1000;
      fs.writeFileSync(save_path, JSON.stringify(saved), 'utf8');

      assert.equal(await api.loadData(0), true, '0.1.0 存档必须被引擎接受');
      const { data } = api.raw();
      const declared = declared_ids();
      for (const index of declared.keys()) {
        if (index === 9) {
          continue;
        }
        assert.equal(
          data.cflag[31][index],
          0,
          `cflag:31:${index} 旧档读档后补 0（fillData 按静态声明补值）`,
        );
      }
      // 已登记的既有序号保留存档里的值（补值只对缺键生效）
      assert.equal(data.cflag[31][9], 12, 'cflag:31:9 保留存档值');
      // 本票新登记的代表位：读档后是 0 而不是 undefined
      assert.equal(data.cflag[31][504], 0, 'cflag:504 要求奖赏');
      assert.equal(data.cflag[31][106], 0, 'cflag:106 犬膣内射精');
      assert.equal(data.cflag[31][666], 0, 'cflag:666 自动调教');
    });
  },
);

engine_test(
  '严格比较的落点：500 / 504 / 650 读到的是数字 0，`=== 0` 分支首次可命中（#831）',
  async () => {
    await with_temp_dir(async (dir) => {
      const { api } = make_api(dir, load_repo_variable_tables());
      api.resetData();
      api.addCharacter(31);
      for (const index of [500, 504, 650]) {
        assert.equal(
          api.get(`cflag:31:${index}`),
          0,
          `cflag:31:${index} 必须是 0——口上的「=== 0」分支按它判断`,
        );
        assert.equal(
          api.get(`cflag:31:${index}`) === 0,
          true,
          `cflag:31:${index} === 0 在登记后应可命中（登记前恒假）`,
        );
      }
      // 与 0 以外常量比较的分支不受影响：登记前后都是 false
      assert.equal(api.get('cflag:31:500') === 1, false);
    });
  },
);
