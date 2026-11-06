/**
 * @file cflag 名字登记面与 add 落点（issue #831、#982、#983）。
 *
 * cflag 用到 256 个序号：#814 登记了角色预设在用的 34 个，#831 把源码在用的
 * 其余 179 个补进 yml/CFlag.yml（共 213），#982 又从读写点建模补了 41 个
 * （共 254），剩下 2 个（77 / 621）判为「确实无意义」不登记。本文件把
 * 「登记」这件事的几面都钉住：
 *
 *   - **登记面**（不依赖引擎）：源码按字面量下标寻址的 cflag 序号，要么在
 *     CFlag.yml 里有一条，要么在下面那份**无名位清单**里；中文键与
 *     tools/facade-names.js 逐条一致；id 唯一。
 *   - **add 落点**（不依赖引擎）：「era.add」 打在任何未登记序号上都是
 *     「undefined + n = NaN」（#830 的机制），因此字面量地址的 add 必须全部
 *     登记——这一条是 NaN 那一类缺陷的通用守卫，#982 的 7 个落点由它兜住。
 *   - **行为面**（驱动 app.asar）：登记会改变引擎行为，四条都要有用例——
 *     ① addCharacter 给每个角色建出全部登记序号（值 = 角色预设，无预设为 0），
 *     这也是存档体积增长的那部分；② 13 个 add 落点（#982 的 22 / 600 /
 *     661-665，与 #831 的 31 / 81 / 82 / 106 / 107 / 667）从 0 起算、
 *     不再是 NaN；
 *     ③ 旧档（0.1.0 形状、cflag 桶为空）读档时补齐为 0、已写过的值保留；
 *     ④ 「=== 0」 那几个严格比较点（500 / 504 / 650）读到的确实是数字 0 而不是
 *     undefined——登记前它们恒假，正是 #831「修复」类判定的机器判据。
 *
 * 为什么不能只看测试绿：夹具不镜像 yml 声明集（#977），登记前后的差别在
 * 夹具里看不见；④ 那三条分支在夹具里永远走不到。所以 ②③④ 用引擎真方法
 * （app.asar 的 EraApi），登记面与 add 落点用源码 + yml 直读。
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
 * 无名字位：源码在读写、但读写点本身给不出可验证的语义，因此不登记
 * （#830 对 tequip 的 14 个无名字位同款处理）：登记会让引擎在每个角色上多
 * 建一格含义不明的槽，而读到的 0 与 undefined 在这些读点上同值。
 *
 *   - 77：全库无写点。唯一的读点（page-chara-info.js 的拘束台解放）只用它
 *     决定要不要顺手清 CFLAG:777（待处刑标签）——「已处刑」还是「已登记
 *     处刑」没有写点可对照。
 *   - 621：只写不读。chara-soul-transfer.js 在灵魂转移前把 601（结婚对象）
 *     备份到魔王与配偶的 621 上，全库没有任何读点。
 *
 * 清单是显式的：新出现一个无名字的下标当场红，而不是悄悄停在「读 undefined、
 * 写 NaN」。152 / 450 / 800 不在此列——它们有名字、已登记，缺的只是门面
 * 那一侧的条目，#983 补齐后「yml 有名字、facade-names 没有」的清单归零。
 */
const UNNAMED_IDS = [77, 621];

/** #831 与 #982 两次补登的条数（34 + 179 + 41；yml 里的实证条数） */
const NEW_IDS_COUNT = 220;

/** 登记后的总条数：34（#814 + #906）+ 179（#831）+ 41（#982） */
const DECLARED_COUNT = 254;

/**
 * 有 「era.add」 落点的序号：未登记时 「undefined + n = NaN」，登记后从 0 起算。
 *
 * #982 补名的 22 / 600 / 661-665 就在这里——它们是这张工单的「救 NaN」对象。
 * 666（自动调教）不在表里：它只有读点与 「= 0」 的复位，实际累加落在 667
 * （「era.add(cflag:T:667, cflag:T:666)」），源码里没有 add 打到 666 上。
 */
const ADD_IDS = [22, 31, 81, 82, 106, 107, 600, 661, 662, 663, 664, 665, 667];

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
 * 三段地址（「cflag:31:504」）取第三段；下标是插值的地址（「cflag:${cid}:${slot}」）
 * 无法核对，跳过——那一族历来靠人工。「portcflag」 的地址不算（表名不是 cflag）。
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

/**
 * 扫出 「era.add」 打在 cflag 上的字面量序号。
 *
 * 这一类比普通读写点危险：未登记的槽上 「undefined + n」 得 NaN，读侧的
 * 「|| 0」 又把 NaN 吞成 0——计数器不涨、落档是 null，全静默（#830 修的是
 * 同一类）。所以 add 的落点必须全部落在名字表里；add 在动态下标上的
 * （「cflag:${cid}:${slot}」）正则核不到，仍靠人工。
 *
 * @returns {Map<number, string>} 序号 → 首个 add 处（文件:行）
 */
function add_addresses() {
  const found = new Map();
  for (const file of walk_js(ERE_DIR)) {
    if (path.basename(file) === 'era-electron.js') {
      continue;
    }
    const body = strip_comments(fs.readFileSync(file, 'utf8'));
    const where = path.relative(REPO_ROOT, file).replace(/\\/g, '/');
    // 反引号写成 \x60：源码里再多一个裸反引号会让 mutation-check 的
    // must_mention 模板段切分整体错位（它按成对反引号扫模板串）。
    for (const match of body.matchAll(
      /era\.add\(\s*(?:'([^'\n]*)'|"([^"\n]*)"|\x60([^\x60]*)\x60)/g,
    )) {
      const parts = (match[1] ?? match[2] ?? match[3]).split(':');
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

test('每一个 cflag 的 era.add 落点都已登记（未登记就是 undefined + n = NaN，#982）', () => {
  const adds = add_addresses();
  const declared = declared_ids();
  const missing = [...adds]
    .filter(([index]) => !declared.has(index))
    .map(([index, where]) => `${index}（${where}）`)
    .sort();
  assert.deepEqual(
    missing,
    [],
    'cflag 上有 add 但 yml 没登记：undefined + n 得到 NaN，读侧 || 0 把它吞成 0，' +
      '计数器静默不涨、落档是 null（#830、#982 修的就是这一类）',
  );
  // 扫描本身要有产出：全库确实有一批 add 落在 cflag 上
  assert.ok(adds.size >= 10, `扫出的 cflag add 落点只有 ${adds.size} 个`);
  for (const index of ADD_IDS) {
    assert.ok(
      adds.has(index),
      `cflag:${index} 应在 ADD_IDS 里——它是源码真的 add 过的落点`,
    );
  }
});

test('CFlag.yml 的条数与两次补登的面对得上（#831 / #982）', () => {
  const declared = declared_ids();
  assert.equal(
    declared.size,
    DECLARED_COUNT,
    `CFlag.yml 应登记 ${DECLARED_COUNT} 条（#814 的 34 条 + 两次补登的 ${NEW_IDS_COUNT} 条）`,
  );
  assert.equal(
    new Set(declared.keys()).size,
    declared.size,
    '同一个序号不得出现两次（引擎装载时按序号去重，后者会顶掉前者并告警）',
  );
});

test('中文键与 tools/facade-names.js 逐条一致，双向上都没有缺口（#831 / #983）', () => {
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
      problems.push(`CFlag.yml 多出 facade-names 没有的 ${index}「${key}」`);
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
 * 造一份引擎实例（「new era_api(fake_era)」）：path 指向临时目录，静态表取
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
  'addCharacter 建出全部登记序号：每个角色 254 格，无预设为 0（登记前是 undefined，#831 / #982）',
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
      // 存档体积增长的就是这一行：254 格 × 每个已加入角色
      assert.equal(
        Object.keys(data.cflag[31]).length,
        DECLARED_COUNT,
        '每个角色的 cflag 行应正好是登记集大小',
      );
    });
  },
);

engine_test(
  'add 打在登记过的槽上是数字：22 / 600 / 661-665 与 #831 的那七个（#982）',
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
        Number.isNaN(api.add('cflag:31:77', 1)),
        '未登记的 cflag 序号上 add 仍是 NaN（77 在无名位清单里）',
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
      // 两次补登的代表位：读档后是 0 而不是 undefined
      assert.equal(data.cflag[31][504], 0, 'cflag:504 要求奖赏');
      assert.equal(data.cflag[31][106], 0, 'cflag:106 犬膣内射精');
      assert.equal(data.cflag[31][666], 0, 'cflag:666 自动调教');
      assert.equal(data.cflag[31][22], 0, 'cflag:22 调教者的经验');
      assert.equal(data.cflag[31][661], 0, 'cflag:661 示众台正字_肉穴');
      assert.equal(data.cflag[31][682], 0, 'cflag:682 魔法伤害上升率');
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
