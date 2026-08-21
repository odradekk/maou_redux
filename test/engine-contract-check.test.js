/**
 * @file engine-contract-check 的行为锁（issue #91）：工具不只「报告对得上」，
 * 三项检查的每一条都要在退出码里生效——探针写坏规则靶子 / 伪造引擎 / 改坏
 * 条目表，工具必须非 0 且报出位置；引擎缺失时必须退 0 并警告（skip 语义）。
 * 本文件不持事实表、基线或条目表的副本（数据只在 tools/ 的三份源文件与工具
 * 内嵌基线里），只验行为——「规则写在测试里而工具声称自己在守、退出码却是
 * 0」是 trace-check 整改时的教训。
 *
 * 工具是 CLI（import 即执行并 process.exit），故用 spawn 而非 require。
 * 伪造引擎用 test/helpers/fake-asar.js 构造的最小 asar（同款头结构），
 * 不碰真实引擎。
 *
 * 写坏型探针一律住在**临时仓库副本**里（#89 整改的阻断 2，两轮）：node
 * --test 并行跑测试文件，就地改 ere/page/page-train.js 这类工作树文件会
 * 与并行读者撞车（16 核 Linux 五跑四红）；而副本若整棵拷 ere/，递归拷贝
 * 在乎的不是内容是「条目在不在」，并行的探针在 ere/ 里增删文件会让
 * cpSync 中途 ENOENT（Windows npm test 7/9 红的回归形态）。故副本按
 * **清单最小拷贝**（PROBE_REPO_ENTRIES：工具本体 + 事实表 + 条目表 + 全仓
 * 唯一的 progress 调用点 + 见证所在的夹具——门 A 在副本里扫 ere/ 只见
 * page-train.js，调用点 1 处与真树合计一致，判定可平移）；副本进程内
 * 单例、文件内用例串行复用，finally 用清单回拷还原。副本的 tools/ 在
 * 运行时从真树拷入，变异到工具本体的条目仍传得进副本。只读型探针
 * （伪造 asar、全绿对照）仍跑真树真工具——它们不写任何东西，无竞态可言。
 */

'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { after, test } = require('node:test');

const { build_asar, build_renderer_map } = require('./helpers/fake-asar');
const { make_probe_repo, refresh_probe_repo } = require('./helpers/probe-repo');

const REPO_ROOT = path.resolve(__dirname, '..');
const TOOL = path.join(REPO_ROOT, 'tools', 'engine-contract-check.mjs');

// 事实表在 tools/ 侧是 ESM（与检查器同源）；Node 22.12+ 的 require(esm)
// 可同步引入无顶级 await 的模块——只为取锚点字面造伪造渲染包，不复制表
const { ENGINE_FACTS } = require('../tools/engine-contract-facts.mjs');

/** 跑一遍真树工具，返回 { status, output }；extra_env 可注入 ERE_ENGINE_ASAR（只读探针用） */
function run_tool(args = [], extra_env = {}) {
  const r = spawnSync(process.execPath, [TOOL, ...args], {
    cwd: REPO_ROOT,
    encoding: 'utf8',
    maxBuffer: 16 * 1024 * 1024,
    env: { ...process.env, ...extra_env },
  });
  return { status: r.status, output: `${r.stdout || ''}${r.stderr || ''}` };
}

// 探针副本清单（最小集）+ 进程内单例：写坏型探针的私有地
const PROBE_REPO_ENTRIES = [
  'tools/engine-contract-check.mjs',
  'tools/engine-contract-facts.mjs',
  'tools/engine-contract-ledger.mjs',
  'ere/page/page-train.js',
  'test/helpers/era-fixture.js',
];

let probe_repo_cache;

/** 单例副本（本文件全部写坏型探针共用一份；文件内用例串行） */
function probe_repo() {
  probe_repo_cache ??= make_probe_repo(PROBE_REPO_ENTRIES);
  return probe_repo_cache;
}

after(() => {
  if (probe_repo_cache) {
    fs.rmSync(probe_repo_cache, { recursive: true, force: true });
  }
});

/** 跑副本里的工具（写坏型探针用，与 run_tool 同款返回） */
function run_tool_in(root, args = []) {
  const r = spawnSync(
    process.execPath,
    [path.join(root, 'tools', 'engine-contract-check.mjs'), ...args],
    {
      cwd: root,
      encoding: 'utf8',
      maxBuffer: 16 * 1024 * 1024,
      env: { ...process.env },
    },
  );
  return { status: r.status, output: `${r.stdout || ''}${r.stderr || ''}` };
}

/** 全部事实的锚点字面合集（伪造「锚点齐全」的渲染包用） */
function all_anchor_literals() {
  return ENGINE_FACTS.flatMap((fact) => fact.anchors);
}

/** 在临时目录落一个伪造 asar，返回其路径 */
function write_fake_asar(files) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ere-contract-check-'));
  const asar_path = path.join(dir, 'app.asar');
  fs.writeFileSync(asar_path, build_asar(files));
  return asar_path;
}

test('engine-contract-check 全绿（规则 + 真实引擎锚点 + 条目表两项检查，退出码 0）', () => {
  const { status, output } = run_tool();
  if (status !== 0) {
    // 引擎缺失的裸克隆：工具按 skip 语义退 0，这里的非 0 只可能是真失守
    assert.fail(
      `engine-contract-check 应全绿，实际退出 ${status}：\n${output}`,
    );
  }
  assert.ok(output.includes('锚点') || output.includes('跳过'), output);
  assert.ok(output.includes('条目表'), `报告应包含条目表判定：\n${output}`);
});

test('调用点规则：barWidth 常量改成 24 必须红且报出位置（#74 形态的拦截）', () => {
  const root = probe_repo();
  try {
    const page_train = path.join(root, 'ere', 'page', 'page-train.js');
    const original = fs.readFileSync(page_train, 'utf8');
    const anchor = 'const PALAM_PROGRESS_BAR_WIDTH = 16;';
    assert.ok(original.includes(anchor), '探针锚行不在 page-train.js 里？');
    fs.writeFileSync(
      page_train,
      original.replace(anchor, 'const PALAM_PROGRESS_BAR_WIDTH = 24;'),
      'utf8',
    );
    const { status, output } = run_tool_in(root);
    assert.notEqual(
      status,
      0,
      'barWidth=24 时工具必须非 0——数值列被吞的缺陷形态',
    );
    assert.ok(
      output.includes('page-train') && output.includes('barWidth = 24'),
      `探针未被报出：\n${output}`,
    );
    assert.ok(output.includes('越界'), `报错应说明越界（1..23）：\n${output}`);
    // 还原副本后再跑必须绿——证明上面的红确实来自探针，不是副本本身破损
    fs.writeFileSync(page_train, original, 'utf8');
    const restored = run_tool_in(root);
    assert.equal(
      restored.status,
      0,
      `探针还原后还红——副本或真树有一边不对：\n${restored.output}`,
    );
  } finally {
    refresh_probe_repo(root, PROBE_REPO_ENTRIES);
  }
});

test('调用点规则：删掉 config（不显式传 barWidth）必须红', () => {
  const root = probe_repo();
  try {
    const page_train = path.join(root, 'ere', 'page', 'page-train.js');
    const original = fs.readFileSync(page_train, 'utf8');
    const anchor = 'config: { barWidth: PALAM_PROGRESS_BAR_WIDTH },';
    assert.ok(original.includes(anchor), '探针锚行不在 page-train.js 里？');
    fs.writeFileSync(page_train, original.replace(anchor, ''), 'utf8');
    const { status, output } = run_tool_in(root);
    assert.notEqual(
      status,
      0,
      '不显式传 barWidth 必须非 0——引擎缺省 24 吞掉数值列',
    );
    assert.ok(
      output.includes('未显式传 barWidth') && output.includes('page-train'),
      `探针未被报出：\n${output}`,
    );
  } finally {
    refresh_probe_repo(root, PROBE_REPO_ENTRIES);
  }
});

test('规则阈值来自事实表（同一条事实不抄两遍）：改表里的 max，规则跟着变', () => {
  // 把事实表的 max 从 23 放宽到 24，再把调用点改成 24——工具必须转绿：
  // 证明阈值读的是共享事实表，检查器里没有第二份数字
  const root = probe_repo();
  try {
    const facts = path.join(root, 'tools', 'engine-contract-facts.mjs');
    const page_train = path.join(root, 'ere', 'page', 'page-train.js');
    const facts_original = fs.readFileSync(facts, 'utf8');
    const page_original = fs.readFileSync(page_train, 'utf8');
    fs.writeFileSync(
      facts,
      facts_original.replace(
        'min: 1,\n      max: 23,',
        'min: 1,\n      max: 24,',
      ),
      'utf8',
    );
    fs.writeFileSync(
      page_train,
      page_original.replace(
        'const PALAM_PROGRESS_BAR_WIDTH = 16;',
        'const PALAM_PROGRESS_BAR_WIDTH = 24;',
      ),
      'utf8',
    );
    // 引擎缺失环境下锚点检查本就跳过，此探针只看规则门：显式指一个不存在的
    // asar，把锚点检查摘出去
    const { status, output } = run_tool_in(root, [
      '--asar',
      'Z:\\definitely\\missing.asar',
    ]);
    assert.equal(
      status,
      0,
      `max 放宽到 24 后 barWidth=24 应放行（阈值与事实表同源）：\n${output}`,
    );
  } finally {
    refresh_probe_repo(root, PROBE_REPO_ENTRIES);
  }
});

test('锚点失配 → 直接判失败报「引擎变了」并报出事实（伪造 asar 探针）', () => {
  const asar_path = write_fake_asar({
    'js/app.2cccec57.js.map': build_renderer_map(
      all_anchor_literals().filter(
        (literal) => literal !== 'barWidth: data.config.barWidth ?? 24',
      ),
    ),
  });
  try {
    const { status, output } = run_tool(['--asar', asar_path]);
    assert.notEqual(
      status,
      0,
      '锚点字面消失时工具必须非 0——引擎升版改默认值的当天就要红',
    );
    assert.ok(
      output.includes('引擎变了') &&
        output.includes('progress-bar-width-default'),
      `报错必须以「引擎变了」开头并报出事实 id：\n${output}`,
    );
    assert.ok(
      output.includes('era-fixture'),
      `报错应指路夹具镜像位（fact.mirror）：\n${output}`,
    );
  } finally {
    fs.rmSync(path.dirname(asar_path), { recursive: true, force: true });
  }
});

test('锚点定位器按模式匹配渲染包：换了内容哈希的文件名仍能定位（不写死）', () => {
  const asar_path = write_fake_asar({
    'js/app.deadbeef99.js.map': build_renderer_map(all_anchor_literals()),
  });
  try {
    const { status, output } = run_tool(['--asar', asar_path]);
    assert.equal(
      status,
      0,
      `渲染包文件名换成别的哈希后锚点仍应全中（定位器是模式匹配）：\n${output}`,
    );
    assert.ok(output.includes('全中'), `报告应给出锚点判定：\n${output}`);
  } finally {
    fs.rmSync(path.dirname(asar_path), { recursive: true, force: true });
  }
});

test('渲染包缺失 → 直接判失败报「引擎变了」（引擎在场而形状漂移，不是环境缺失）', () => {
  const asar_path = write_fake_asar({ 'background.js': 'x' });
  try {
    const { status, output } = run_tool(['--asar', asar_path]);
    assert.notEqual(status, 0, 'asar 在场而渲染包定位不到必须非 0');
    assert.ok(
      output.includes('引擎变了') && output.includes('渲染包'),
      `报错应说明渲染包漂移：\n${output}`,
    );
  } finally {
    fs.rmSync(path.dirname(asar_path), { recursive: true, force: true });
  }
});

test('引擎缺失 → 退 0 并警告（skip 语义，不是失守）', () => {
  const { status, output } = run_tool([
    '--asar',
    'Z:\\definitely\\missing.asar',
  ]);
  assert.equal(
    status,
    0,
    `--asar 显式指路而所指不存在 = 引擎缺失，必须退 0（规则与条目表照跑）：\n${output}`,
  );
  assert.ok(
    output.includes('未找到 app.asar') && output.includes('跳过'),
    `应留警告说明锚点检查跳过：\n${output}`,
  );
  assert.ok(output.includes('条目表'), `规则与条目表照跑照判：\n${output}`);
});

test('条目表只能变短：基线外新条目必须红且报出位置', () => {
  const root = probe_repo();
  try {
    const ledger = path.join(root, 'tools', 'engine-contract-ledger.mjs');
    const original = fs.readFileSync(ledger, 'utf8');
    const anchor = "  {\n    id: 'waitanykey-fromclear-useRule',";
    assert.ok(
      original.includes(anchor),
      '探针锚行不在条目表里——条目表结构变了？',
    );
    const probe = `  {\n    id: 'probe-outside-baseline',\n    desc: '探针：基线外条目',\n    witness: '不存在的见证串',\n  },\n${anchor}`;
    fs.writeFileSync(ledger, original.replace(anchor, probe), 'utf8');
    const { status, output } = run_tool_in(root, [
      '--asar',
      'Z:\\definitely\\missing.asar',
    ]);
    assert.notEqual(
      status,
      0,
      '基线外新条目必须非 0——吸收待办须显式改 LEDGER_BASELINE',
    );
    assert.ok(
      output.includes('probe-outside-baseline') &&
        output.includes('不在 #91 基线内'),
      `探针条目未被以基线名义报出：\n${output}`,
    );
    fs.writeFileSync(ledger, original, 'utf8');
    const restored = run_tool_in(root);
    assert.equal(
      restored.status,
      0,
      `条目表还原后还红——副本或真树有一边不对：\n${restored.output}`,
    );
  } finally {
    refresh_probe_repo(root, PROBE_REPO_ENTRIES);
  }
});

test('条目表不许过期失效：见证注释不在夹具里的条目必须红', () => {
  const root = probe_repo();
  try {
    const ledger = path.join(root, 'tools', 'engine-contract-ledger.mjs');
    const original = fs.readFileSync(ledger, 'utf8');
    const anchor = "witness: 'setBack/setOverlay 的独立',";
    assert.ok(
      original.includes(anchor),
      '探针锚行不在条目表里——条目表结构变了？',
    );
    fs.writeFileSync(
      ledger,
      original.replace(anchor, "witness: '不在夹具里的见证串 xyz',"),
      'utf8',
    );
    const { status, output } = run_tool_in(root, [
      '--asar',
      'Z:\\definitely\\missing.asar',
    ]);
    assert.notEqual(
      status,
      0,
      '见证注释消失的条目必须非 0——分歧已变而条目表没跟',
    );
    assert.ok(
      output.includes('setback-setoverlay-rearm') &&
        output.includes('过期失效'),
      `过期失效条目未被逐条报出：\n${output}`,
    );
    fs.writeFileSync(ledger, original, 'utf8');
    const restored = run_tool_in(root);
    assert.equal(
      restored.status,
      0,
      `条目表还原后还红——副本或真树有一边不对：\n${restored.output}`,
    );
  } finally {
    refresh_probe_repo(root, PROBE_REPO_ENTRIES);
  }
});
