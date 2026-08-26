'use strict';

/**
 * @file 样本登记表与 cli --sample 的行为锁（issue #156 阶段一）。
 *
 * 守四件事：
 *   1. 缺省 = 旧样本：resolve 到 target/emuera.log，spawn cli 全绿且四段
 *      报告齐全——「缺省行为与改造前逐字一致」的可执行形态（#48 的管线
 *      一行没动，缺省路径只是经 resolve_sample 走到同一个文件）。
 *   2. 未登记样本名 → 非零退出 + 报出有效名单。**绝不静默回落缺省**：
 *      回落 = 拿旧样本冒充新样本，比对结论整个作废。
 *   3. 已登记样本已真实入库（#161 阶段二）→ 真库直跑，走到头注校验之后
 *      的通用统计。占位形态（文件不在库 → 非零退出 + 点名阶段二）成为
 *      历史，该用例随之改写。
 *   4. 样本 + 头注齐备的完整路径（临时仓库副本里伪造最小样本）→ 退出 0、
 *      头注回显、通用统计执行、且明说跳过 ere 侧比对（归一化器要不要
 *      扩展是阶段二裁定，#109 问题五）。头注缺失 / 缺必填字段 → 非零
 *      （#156：「置位串不落库，样本就不可重录」的机械执行）。
 *
 * 副本清单与 trace-check 探针同思路（#89 整改：写坏型探针不写工作树），
 * 但只需 cli 命名路径的判定面：tools/（工具本体）+ yml/（Palam.yml 的
 * 算式指标）+ golden/（样本落点；#161 阶段二起六份样本已真实入库，副本里
 * 会被 write_fake_sample 覆盖 mainmenu-natural——副本是临时的，预期如此）。
 */

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const { after, test } = require('node:test');

const { make_probe_repo } = require('./helpers/probe-repo');
const { resolve_sample } = require('../tools/compare/samples');

const REPO_ROOT = path.resolve(__dirname, '..');
const CLI = path.join(REPO_ROOT, 'tools', 'compare', 'cli.js');

/** 跑一次 cli，返回 { status, output } */
function run_cli(args, cwd = REPO_ROOT, cli = CLI) {
  const r = spawnSync(process.execPath, [cli, ...args], {
    cwd,
    encoding: 'utf8',
    maxBuffer: 16 * 1024 * 1024,
  });
  return { status: r.status, output: `${r.stdout || ''}${r.stderr || ''}` };
}

test('缺省样本仍是 target/emuera.log：resolve 直达 + cli 全绿且四段报告齐全', () => {
  const resolved = resolve_sample('');
  assert.equal(resolved.rel, 'target/emuera.log');
  assert.ok(fs.existsSync(resolved.abs), '旧样本必须在库');

  const { status, output } = run_cli([]);
  assert.equal(status, 0, `缺省路径应全绿：\n${output}`);
  assert.match(output, /\[装饰行复核\]/);
  assert.match(output, /\[算式断言\] 共 400 条/);
  assert.match(output, /\[首回合比对\]/);
  assert.match(output, /\[变量层\]/);
  assert.match(output, /\[结论\] 差异全部有名有姓/);
});

test('登记表覆盖范围 B 三段 × 两态，且路径都锚在 golden/（或旧样本）', () => {
  const names = [
    'mainmenu-natural',
    'mainmenu-max',
    'saveload-natural',
    'saveload-max',
    'daycycle-natural',
    'daycycle-max',
  ];
  for (const name of names) {
    const resolved = resolve_sample(name);
    assert.equal(resolved.rel, `golden/${name}.log`);
  }
});

test('未登记样本名：非零退出 + 报出有效名单，绝不静默回落缺省', () => {
  const { status, output } = run_cli(['--sample', 'nosuch-sample']);
  assert.notEqual(
    status,
    0,
    '未知样本名必须失败——静默回落等于拿旧样本冒充新样本',
  );
  assert.match(
    output,
    /未知样本名「nosuch-sample」/,
    '失败消息必须点名坏名字本身',
  );
  assert.match(
    output,
    /有效样本名：.*mainmenu-natural/,
    '失败消息必须报出有效名单（录制者/后续票靠它自查拼写）',
  );
  // 未知参数同属这一类：本工具此前没有参数，未知即错
  const bad_arg = run_cli(['--sample']);
  assert.notEqual(bad_arg.status, 0);
  assert.match(bad_arg.output, /--sample 缺样本名/);
});

test('已登记样本已真实入库：真库直跑，头注校验通过且事件流比对全绿', () => {
  // #161 阶段二：六份样本由人录制回收后入库，「已登记但样本未入库」的
  // 占位形态成为历史。本用例随之从「期待非零退出（样本文件不在库）」改写
  // 为：golden/mainmenu-natural.log 现在是真的，跑它必须走过头注校验、
  // 产出头注回显与通用统计，并完成事件流比对（回放 + 归因，unexplained
  // 归零 → 退出 0；这份样本的归因基线由 test/compare-scope-b.test.js 锁）
  const { status, output } = run_cli(['--sample', 'mainmenu-natural']);
  assert.equal(
    status,
    0,
    `真实样本的完整比对路径应全绿（unexplained 归零）：\n${output}`,
  );
  assert.match(
    output,
    /\[样本\] mainmenu-natural（golden\/mainmenu-natural\.log）/,
  );
  assert.match(
    output,
    /\[样本头注\] 构建标识 93106 ｜ 起录存档 save99（第 7 日午前） ｜ 宏键 manual ｜ 置位串（空 = 自然态） ｜ 自动存档 关/,
  );
  assert.match(output, /\[装饰行复核\]/, '头注校验之后的通用统计必须执行');
  assert.match(
    output,
    /\[事件流比对\] golden \d+ 条 vs ere \d+ 条/,
    '#161 起命名样本必须跑 ere 侧回放与事件流比对，不再跳过',
  );
  assert.match(output, /未解释 0/);
});

test('样本文件缺席仍必须显式失败（守卫的复现场景：副本里删掉已入库样本）', () => {
  // #161 样本入库后主仓库恒有样本文件，这段守卫的真值场景搬进副本：
  // 删掉副本里的 mainmenu-natural.log 再跑，必须非零退出 + 报出缺席路径
  // 本体，不得裸崩（读文件 ENOENT）、不得静默继续（变异 M285 的靶）
  const root = probe_repo();
  const sample_path = path.join(root, 'golden', 'mainmenu-natural.log');
  fs.rmSync(sample_path, { force: true });
  try {
    const { status, output } = run_cli(
      ['--sample', 'mainmenu-natural'],
      root,
      path.join(root, 'tools', 'compare', 'cli.js'),
    );
    assert.notEqual(status, 0, '样本文件不在库时必须失败');
    assert.match(
      output,
      /样本文件不在库：golden\/mainmenu-natural\.log/,
      '消息必须给出缺席路径本体',
    );
  } finally {
    // 还原副本里的样本（真树回拷）
    fs.copyFileSync(
      path.join(REPO_ROOT, 'golden', 'mainmenu-natural.log'),
      sample_path,
    );
  }
});

// —— 完整路径：临时副本里伪造一份最小样本（头注校验的行为靶） ——

const PROBE_REPO_ENTRIES = [
  'tools',
  'yml',
  'golden',
  // #161 起 cli 的命名样本路径跑 ere 侧回放：replay-b.js 依赖
  // test/helpers/era-fixture.js 与 ere/ 全部游戏代码（#'/' 别名映射 ere/）
  'ere',
  'test/helpers',
];

let probe_repo_cache;

function probe_repo() {
  probe_repo_cache ??= make_probe_repo(PROBE_REPO_ENTRIES);
  return probe_repo_cache;
}

after(() => {
  if (probe_repo_cache) {
    fs.rmSync(probe_repo_cache, { recursive: true, force: true });
  }
});

/** 在副本里写一份最小样本 + 头注，返回副本根 */
function write_fake_sample({ meta_extra = {}, meta_drop = [] } = {}) {
  const root = probe_repo();
  const dir = path.join(root, 'golden');
  fs.mkdirSync(dir, { recursive: true });
  // 两行叙述 + 一行分割线：装饰行复核有东西可数，算式断言为 0 条
  fs.writeFileSync(
    path.join(dir, 'mainmenu-natural.log'),
    '第1年 1月7日（第7日） 上午\r\n' +
      '══════════════════════════════════════\r\n' +
      '[100] 调教\r\n',
    'utf8',
  );
  const meta = {
    sample: 'mainmenu-natural',
    segment: '标题→主菜单',
    state: 'natural',
    build: '93106',
    save: 'save99（第 7 日午前）',
    seed_string: '',
    macro_key: 'F1',
    autosave: false,
    ...meta_extra,
  };
  for (const key of meta_drop) {
    delete meta[key];
  }
  fs.writeFileSync(
    path.join(dir, 'mainmenu-natural.meta.json'),
    `${JSON.stringify(meta, null, 2)}\n`,
    'utf8',
  );
  return root;
}

function clean_fake_sample() {
  const root = probe_repo();
  for (const name of ['mainmenu-natural.log', 'mainmenu-natural.meta.json']) {
    const p = path.join(root, 'golden', name);
    if (fs.existsSync(p)) {
      fs.unlinkSync(p);
    }
  }
}

test('样本与头注齐备：头注校验放行、通用统计执行、事件流比对照跑', () => {
  const root = write_fake_sample();
  try {
    const { status, output } = run_cli(
      ['--sample', 'mainmenu-natural'],
      root,
      path.join(root, 'tools', 'compare', 'cli.js'),
    );
    // 假样本（3 行杜撰内容）与 ere 回放比对必然大量未解释 → 退出 1；
    // 本用例的靶点是「头注齐备不被拒、比对真的跑了」，退出码预期见断言
    assert.notEqual(status, 0, '假样本内容与回放对不上，未解释必非零');
    assert.ok(
      !/样本头注缺必填字段|样本头注缺失/.test(output),
      '头注齐备的样本不得在头注校验被拒',
    );
    assert.match(
      output,
      /\[样本\] mainmenu-natural（golden\/mainmenu-natural\.log）/,
    );
    assert.match(
      output,
      /构建标识 93106 ｜ 起录存档 save99（第 7 日午前） ｜ 宏键 F1 ｜ 置位串（空 = 自然态） ｜ 自动存档 关/,
      '头注回显必须包含自动存档开关状态（#161 新契约字段）',
    );
    assert.match(
      output,
      /置位串（空 = 自然态）/,
      '自然态的空置位串必须显式说明',
    );
    assert.match(output, /\[装饰行复核\] 全 3 行/);
    assert.match(output, /\[算式断言\] 共 0 条/);
    assert.match(
      output,
      /\[事件流比对\] golden \d+ 条 vs ere \d+ 条/,
      '#161 起必须跑 ere 侧回放与事件流比对（假样本红在未解释，不在流程缺席）',
    );
  } finally {
    clean_fake_sample();
  }
});

test('头注缺失或字段不全：非零退出（置位串不落库，样本就不可重录）', () => {
  // 副本里只有 .log 没有 .meta.json
  const root = probe_repo();
  const dir = path.join(root, 'golden');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'mainmenu-natural.log'), 'x\r\n', 'utf8');
  try {
    const no_meta = run_cli(
      ['--sample', 'mainmenu-natural'],
      root,
      path.join(root, 'tools', 'compare', 'cli.js'),
    );
    assert.notEqual(no_meta.status, 0, '无头注的样本必须被拒绝');
    assert.match(
      no_meta.output,
      /样本头注缺失：golden\/mainmenu-natural\.meta\.json/,
    );

    const drop_seed = write_fake_sample({ meta_drop: ['seed_string'] });
    const no_seed = run_cli(
      ['--sample', 'mainmenu-natural'],
      drop_seed,
      path.join(drop_seed, 'tools', 'compare', 'cli.js'),
    );
    assert.notEqual(no_seed.status, 0, '缺置位串字段的头注必须被拒绝');
    assert.match(
      no_seed.output,
      /样本头注缺必填字段：seed_string/,
      '消息必须点名缺席字段',
    );

    const drop_autosave = write_fake_sample({ meta_drop: ['autosave'] });
    const no_autosave = run_cli(
      ['--sample', 'mainmenu-natural'],
      drop_autosave,
      path.join(drop_autosave, 'tools', 'compare', 'cli.js'),
    );
    assert.notEqual(no_autosave.status, 0, '缺自动存档字段的头注必须被拒绝');
    assert.match(
      no_autosave.output,
      /样本头注缺必填字段：autosave/,
      '消息必须点名缺席字段（#161：自动存档状态不落库，将来重录会得到不同的 [99] 行而查不出原因）',
    );
  } finally {
    clean_fake_sample();
  }
});
