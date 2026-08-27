/**
 * @file 美术与音频分期进场的资源完整性测试（issue #69）。
 *
 * 三层验证：
 *   1. 搬运边界：res/ 的文件清单恰为 img.csv「菜单通用」节的 6 张图 + 三首
 *      BGM——头像素材（243 项）裁定为**不搬运不登记**（依据与裁定过程见
 *      issue #69 评论），精确清单断言让任何混入的头像文件当场红；
 *   2. 复制保真：媒体文件与只读移植源逐字节一致（验收项「不修改内容」的
 *      机械证明）；
 *   3. 引擎接受（test/helpers/engine-bundle.js，app.asar 真代码）：注册表
 *      csv 能被引擎解析器装载、行内文件真实存在；yml/Audio.yml 经引擎装载
 *      后 setVar 接受 audio: 寻址——「名字表在 + 桶在 → 通过」的实测路径。
 *
 * 引擎不在场（无 app.asar）时引擎比对用例整组 skip 并留警告。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const {
  create_variable_loader,
  load_engine_bundle,
} = require('./helpers/engine-bundle');

const engine = load_engine_bundle();
const engine_test = engine ? test : test.skip;

const REPO_ROOT = path.resolve(__dirname, '..');
const RES_DIR = path.join(REPO_ROOT, 'res');
const TARGET_RESOURCES = path.join(REPO_ROOT, 'target', 'resources');
const TARGET_SOUND = path.join(REPO_ROOT, 'target', 'sound');

// 这张票搬运范围（相对 res/ 的路径）。清单即边界：多一个少一个都红。
const EXPECTED_FILES = [
  '.gitkeep',
  'COVER_WHITE.png',
  'HEART.png',
  'HEART_B.png',
  'HEART_R.png',
  'TITLE.png',
  'WHITE_L.png',
  'img.csv',
  'sound/TFM-003A_17.mp3',
  'sound/sound.csv',
  'sound/great-library.mp3',
  'sound/stronghold-2.mp3',
];

// res/ 媒体文件 → 只读源文件的映射（复制保真断言用）
const SOURCE_OF = {
  'COVER_WHITE.png': path.join(TARGET_RESOURCES, 'COVER_WHITE.png'),
  'HEART.png': path.join(TARGET_RESOURCES, 'HEART.png'),
  'HEART_B.png': path.join(TARGET_RESOURCES, 'HEART_B.png'),
  'HEART_R.png': path.join(TARGET_RESOURCES, 'HEART_R.png'),
  'TITLE.png': path.join(TARGET_RESOURCES, 'TITLE.png'),
  'WHITE_L.png': path.join(TARGET_RESOURCES, 'WHITE_L.png'),
  'sound/TFM-003A_17.mp3': path.join(TARGET_SOUND, 'TFM-003A_17.mp3'),
  // 磁盘文件名改 ASCII（AGENTS.md 代码约定），只读源保持原名——
  // 键是产物路径、值是 target/ 源路径，两侧本就不必同名。
  'sound/great-library.mp3': path.join(TARGET_SOUND, '大书库.mp3'),
  'sound/stronghold-2.mp3': path.join(TARGET_SOUND, '据点2.mp3'),
};

/** 递归收集目录下全部文件的相对路径（posix 风格，排序保证断言稳定） */
function walk_files(dir, prefix = '') {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      out.push(...walk_files(path.join(dir, entry.name), rel));
    } else {
      out.push(rel);
    }
  }
  return out.sort();
}

test('res/ 的搬运范围恰为「菜单通用」六图 + 三首 BGM（头像素材不在内）', () => {
  assert.deepEqual(walk_files(RES_DIR), [...EXPECTED_FILES].sort());
});

test('图片与音频与只读源逐字节一致（不修改内容）', () => {
  for (const [rel, source] of Object.entries(SOURCE_OF)) {
    const copied = fs.readFileSync(path.join(RES_DIR, rel));
    const original = fs.readFileSync(source);
    assert.deepEqual(
      copied,
      original,
      `${rel} 与源 ${path.relative(REPO_ROOT, source)} 不一致`,
    );
  }
});

test('注册表不含头像素材的繁体注册名（紅綠藍銀——不登记裁定的机械钉子）', () => {
  const texts = ['img.csv', 'sound/sound.csv'].map((rel) =>
    fs.readFileSync(path.join(RES_DIR, rel), 'utf8'),
  );
  for (const traditional of ['紅', '綠', '藍', '銀']) {
    for (const text of texts) {
      assert.ok(
        !text.includes(traditional),
        `注册表出现了头像素材的繁体字 ${traditional}`,
      );
    }
  }
});

test('注册表的注册名覆盖游戏代码引用的全部媒体名（注册名即原作实参）', () => {
  // 游戏代码引用的媒体名（page-title.js / page-main-menu.js 的 #69 接入）
  const referenced = ['TFM-003A_17.mp3', '据点2.mp3', 'TITLE'];
  const registered = new Set();
  for (const rel of ['img.csv', 'sound/sound.csv']) {
    const text = fs.readFileSync(path.join(RES_DIR, rel), 'utf8');
    for (const line of text.split('\n')) {
      if (line && !line.startsWith(';')) {
        registered.add(line.split(',')[0]);
      }
    }
  }
  for (const name of referenced) {
    assert.ok(
      registered.has(name),
      `游戏代码引用的媒体名 ${name} 未在注册表登记`,
    );
  }
  // 大书库.mp3 已登记待接（播放点所在画面未移植），在册是待办的前提
  assert.ok(registered.has('大书库.mp3'));
});

// —— 引擎比对：注册表与 Audio.yml 都用引擎自己的代码装载 ——

engine_test('注册表 csv 能被引擎解析器装载，行内文件与 csv 同目录存在', () => {
  const registries = [
    { csv: 'img.csv', expect_rows: 6 },
    { csv: 'sound/sound.csv', expect_rows: 3 },
  ];
  for (const { csv, expect_rows } of registries) {
    const text = fs.readFileSync(path.join(RES_DIR, csv), 'utf8');
    const rows = engine.parse_data_file(text, 'csv', 'res');
    assert.equal(
      rows.length,
      expect_rows,
      `${csv} 注册行数（注释行被引擎解析器剥离）`,
    );
    for (const row of rows) {
      assert.ok(row[0] && row[1], `${csv} 每行都要有注册名与文件名`);
      // 引擎约束：注册用 csv 只能注册同文件夹的文件（dev-guides/16）
      assert.ok(
        fs.existsSync(path.join(path.dirname(path.join(RES_DIR, csv)), row[1])),
        `${csv} 的 ${row[1]} 必须与 csv 同目录存在`,
      );
    }
  }
});

engine_test(
  'Audio.yml 经引擎装载后 setVar 接受 audio: 寻址（扩展普通表路径）',
  () => {
    const loader = create_variable_loader();
    const text = fs.readFileSync(
      path.join(REPO_ROOT, 'yml', 'Audio.yml'),
      'utf8',
    );
    loader.load_rows(engine.parse_data_file(text, 'yml', 'audio'), 'audio');

    // 名字表在：中文名 → id 的映射按引擎装载路径成立
    assert.deepEqual(loader.static_data.audio, {
      是否启用背景音乐: 0,
      背景音乐音量: 1,
    });

    // 桶在（引擎侧由 fillData 自动建，此处按同形状提供）+ 扩展普通表注册
    // → 二段寻址数字与名字两种写法都通过（app.asar setVar 的扩展表分支）
    const fake_this = {
      staticData: loader.static_data,
      data: { audio: {} },
      extendedTables: { audio: engine.era_api.tableType.normal },
      era: {
        error: (msg) => {
          throw new Error(msg);
        },
      },
    };
    assert.equal(engine.set_var.call(fake_this, 'audio:0', 1), 1);
    assert.equal(engine.set_var.call(fake_this, 'audio:背景音乐音量', 66), 66);
    assert.deepEqual(fake_this.data.audio, { 0: 1, 1: 66 });
  },
);

// —— 版本库默认配置（#69 重开补的交付项）：资源开关进 git ——
//
// `resource: true` 不能只写本机 ere.config.json（gitignore，全新克隆落到引擎
// 默认 resource:false，一张图一个音都不加载——issue #69 重开评论的裁定）。
// 落点是 yml/_config.json：进 git 的默认值、用户仍可在配置 UI 覆盖（与
// _fixed.json 的结构性锁定不同类，extendedCharaTables 留在 _fixed.json）。

test('版本库默认配置开着资源：yml/_config.json 的 system.resource 为 true', () => {
  const config = JSON.parse(
    fs.readFileSync(path.join(REPO_ROOT, 'yml', '_config.json'), 'utf8'),
  );
  assert.equal(
    config?.system?.resource,
    true,
    '全新克隆的资源默认值来自 _config.json（ere.config.json 不进 git）',
  );
});

engine_test(
  'yml/_config.json 是引擎默认配置整份 + 唯一偏离 resource:true',
  () => {
    // 缺键调研（app.asar 实证）：_config.json 存在时 defaultConfig 整个是它，
    // getEmptyConfigForm() 只在文件缺失/解析失败时兜底、不做逐键合并；
    // syncConfig 又把 config 合并 _fixed.json 后整份写回 ere.config.json——
    // _config.json 没写的键从此不存在（window.audio 缺失 = 静默没声音一类坑）。
    // 故必须写全：与 getEmptyConfigForm() 逐键一致，唯一偏离 resource。
    const defaults = engine.engine_utils.getEmptyConfigForm();
    const config = JSON.parse(
      fs.readFileSync(path.join(REPO_ROOT, 'yml', '_config.json'), 'utf8'),
    );
    assert.deepEqual(config, {
      ...defaults,
      system: { ...defaults.system, resource: true },
    });
  },
);

// —— 存档槽位数（#135）：结构性要求，落 _fixed.json 而非 _config.json ——
//
// 原作有 99 个手动存档槽（0–98，SYSTEM_DATA.ERB 的 CASE 0 TO 98），另加 99 号
// 自动存档槽（ADR-0006）。引擎 listSaveFiles 的扫描是**闭区间**：
//   const e = saveFiles || 10; for (let t = 0; t <= e; ++t) { … }
// 所以 saveFiles = 99 恰好覆盖槽位 0–99。取 99 而非 100 还有一条硬约束：
// dev-guides/03-config.md:76 限定该值为 10–99 的整数。
//
// **为什么必须在 _fixed.json**：_config.json 会被本机已有的 ere.config.json
// 整份短路（app.asar：`if (this.config || (this.config = …defaultConfig))`），
// 而 ere.config.json 不进 git、且经 .worktreeinclude 复制进每个新 worktree。
// 落 _config.json 的话，任何装过旧版本的机器上 saveFiles 仍是 10，槽位 11–98
// 的备注不被 loadGlobal 维护——**原作大半存档槽在界面上显示为空栏位**，
// 且没有任何测试会红。这是「缺了会静默降级」，按 AGENTS.md 的判据归 _fixed.json。
//
// 代价（有意接受）：引擎配置 UI 若有「存档数量」开关，玩家点了不会生效。
engine_test(
  'yml/_fixed.json 锁定 saveFiles = 99（原作 0–98 手动槽 + 99 自动槽）',
  () => {
    const fixed = JSON.parse(
      fs.readFileSync(path.join(REPO_ROOT, 'yml', '_fixed.json'), 'utf8'),
    );
    assert.equal(
      fixed?.system?.saveFiles,
      99,
      'saveFiles 必须在 _fixed.json：_config.json 会被已有的 ere.config.json 整份短路',
    );
    // 与引擎的取值范围对齐：10–99（dev-guides/03-config.md:76）
    assert.ok(
      Number.isInteger(fixed.system.saveFiles) &&
        fixed.system.saveFiles >= 10 &&
        fixed.system.saveFiles <= 99,
      'saveFiles 必须是 10–99 的整数',
    );
    // 闭区间扫描：saveFiles 必须 >= 最大要用的槽位号（99 号自动存档槽）
    assert.ok(
      fixed.system.saveFiles >= 99,
      '99 号自动存档槽要被 loadGlobal 扫描到，saveFiles 不得小于 99',
    );
  },
);
