/**
 * @file engine-contract-check 的行为锁（issue #91）：工具不只「报告对得上」，
 * 三道门的每一条都要在退出码里生效——探针写坏规则靶子 / 伪造引擎 / 改坏
 * 台账，工具必须非 0 且点名；引擎缺失时必须退 0 并警告（skip 语义）。
 * 本文件不持事实表、基线或台账的副本（数据只在 tools/ 的三份源文件与工具
 * 内嵌基线里），只验行为——「规则写在测试里而工具声称在守、退出码却是
 * 0」是 trace-check 整改时的教训。
 *
 * 工具是 CLI（import 即执行并 process.exit），故用 spawn 而非 require。
 * 伪造引擎用 test/helpers/fake-asar.js 构造的最小 asar（同款头结构），
 * 不碰真实引擎。
 */

'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');

const { build_asar, build_renderer_map } = require('./helpers/fake-asar');

const REPO_ROOT = path.resolve(__dirname, '..');
const TOOL = path.join(REPO_ROOT, 'tools', 'engine-contract-check.mjs');
const FACTS = path.join(REPO_ROOT, 'tools', 'engine-contract-facts.mjs');
const LEDGER = path.join(REPO_ROOT, 'tools', 'engine-contract-ledger.mjs');
const PAGE_TRAIN = path.join(REPO_ROOT, 'ere', 'page', 'page-train.js');

// 事实表在 tools/ 侧是 ESM（与检查器同源）；Node 22.12+ 的 require(esm)
// 可同步引入无顶级 await 的模块——只为取锚点字面造伪造渲染包，不复制表
const { ENGINE_FACTS } = require('../tools/engine-contract-facts.mjs');

/** 跑一遍工具，返回 { status, output }；extra_env 可注入 ERE_ENGINE_ASAR */
function run_tool(args = [], extra_env = {}) {
  const r = spawnSync(process.execPath, [TOOL, ...args], {
    cwd: REPO_ROOT,
    encoding: 'utf8',
    maxBuffer: 16 * 1024 * 1024,
    env: { ...process.env, ...extra_env },
  });
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

test('engine-contract-check 全绿（规则 + 真实引擎锚点 + 台账两道门，退出码 0）', () => {
  const { status, output } = run_tool();
  if (status !== 0) {
    // 引擎缺失的裸克隆：工具按 skip 语义退 0，这里的非 0 只可能是真失守
    assert.fail(
      `engine-contract-check 应全绿，实际退出 ${status}：\n${output}`,
    );
  }
  assert.ok(output.includes('锚点') || output.includes('跳过'), output);
  assert.ok(output.includes('台账'), `报告应包含台账判定：\n${output}`);
});

test('调用点规则：barWidth 常量改成 24 必须红且点名（#74 形态的守门）', () => {
  const original = fs.readFileSync(PAGE_TRAIN, 'utf8');
  const anchor = 'const PALAM_PROGRESS_BAR_WIDTH = 16;';
  assert.ok(original.includes(anchor), '探针锚行不在 page-train.js 里？');
  try {
    fs.writeFileSync(
      PAGE_TRAIN,
      original.replace(anchor, 'const PALAM_PROGRESS_BAR_WIDTH = 24;'),
      'utf8',
    );
    const { status, output } = run_tool();
    assert.notEqual(
      status,
      0,
      'barWidth=24 时工具必须非 0——数值列被吞的缺陷形态',
    );
    assert.ok(
      output.includes('page-train') && output.includes('barWidth = 24'),
      `探针未被点名：\n${output}`,
    );
    assert.ok(output.includes('越界'), `报错应说明越界（1..23）：\n${output}`);
  } finally {
    fs.writeFileSync(PAGE_TRAIN, original, 'utf8');
  }
  const restored = run_tool();
  assert.equal(restored.status, 0, `探针删了还红：\n${restored.output}`);
});

test('调用点规则：删掉 config（不显式传 barWidth）必须红', () => {
  const original = fs.readFileSync(PAGE_TRAIN, 'utf8');
  const anchor = 'config: { barWidth: PALAM_PROGRESS_BAR_WIDTH },';
  assert.ok(original.includes(anchor), '探针锚行不在 page-train.js 里？');
  try {
    fs.writeFileSync(PAGE_TRAIN, original.replace(anchor, ''), 'utf8');
    const { status, output } = run_tool();
    assert.notEqual(
      status,
      0,
      '不显式传 barWidth 必须非 0——引擎缺省 24 吞掉数值列',
    );
    assert.ok(
      output.includes('未显式传 barWidth') && output.includes('page-train'),
      `探针未被点名：\n${output}`,
    );
  } finally {
    fs.writeFileSync(PAGE_TRAIN, original, 'utf8');
  }
  const restored = run_tool();
  assert.equal(restored.status, 0, `探针删了还红：\n${restored.output}`);
});

test('规则阈值来自事实表（同一条事实不抄两遍）：改表里的 max，规则跟着变', () => {
  // 把事实表的 max 从 23 放宽到 24，再把调用点改成 24——工具必须转绿：
  // 证明阈值读的是共享事实表，检查器里没有第二份数字
  const facts_original = fs.readFileSync(FACTS, 'utf8');
  const page_original = fs.readFileSync(PAGE_TRAIN, 'utf8');
  try {
    fs.writeFileSync(
      FACTS,
      facts_original.replace(
        'min: 1,\n      max: 23,',
        'min: 1,\n      max: 24,',
      ),
      'utf8',
    );
    fs.writeFileSync(
      PAGE_TRAIN,
      page_original.replace(
        'const PALAM_PROGRESS_BAR_WIDTH = 16;',
        'const PALAM_PROGRESS_BAR_WIDTH = 24;',
      ),
      'utf8',
    );
    // 引擎缺失环境下锚点门本就跳过，此探针只看规则门：显式指一个不存在的
    // asar，把锚点门摘出去
    const { status, output } = run_tool([
      '--asar',
      'Z:\\definitely\\missing.asar',
    ]);
    assert.equal(
      status,
      0,
      `max 放宽到 24 后 barWidth=24 应放行（阈值与事实表同源）：\n${output}`,
    );
  } finally {
    fs.writeFileSync(FACTS, facts_original, 'utf8');
    fs.writeFileSync(PAGE_TRAIN, page_original, 'utf8');
  }
  const restored = run_tool();
  assert.equal(restored.status, 0, `探针还原后还红：\n${restored.output}`);
});

test('锚点失配 → 硬红报「引擎变了」并点名事实（伪造 asar 探针）', () => {
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
      `报错必须以「引擎变了」开头并点名事实 id：\n${output}`,
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

test('渲染包缺失 → 硬红报「引擎变了」（引擎在场而形状漂移，不是环境缺失）', () => {
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
    `--asar 显式指路而所指不存在 = 引擎缺失，必须退 0（规则与台账照跑）：\n${output}`,
  );
  assert.ok(
    output.includes('未找到 app.asar') && output.includes('跳过'),
    `应留警告说明锚点门跳过：\n${output}`,
  );
  assert.ok(output.includes('台账'), `规则与台账照跑照判：\n${output}`);
});

test('台账只能变短：基线外新条目必须红且点名', () => {
  const original = fs.readFileSync(LEDGER, 'utf8');
  const anchor = "  {\n    id: 'waitanykey-fromclear-useRule',";
  assert.ok(original.includes(anchor), '探针锚行不在台账里——台账结构变了？');
  const probe = `  {\n    id: 'probe-outside-baseline',\n    desc: '探针：基线外条目',\n    witness: '不存在的见证串',\n  },\n${anchor}`;
  try {
    fs.writeFileSync(LEDGER, original.replace(anchor, probe), 'utf8');
    const { status, output } = run_tool([
      '--asar',
      'Z:\\definitely\\missing.asar',
    ]);
    assert.notEqual(
      status,
      0,
      '基线外新条目必须非 0——吸收欠账须显式改 LEDGER_BASELINE',
    );
    assert.ok(
      output.includes('probe-outside-baseline') &&
        output.includes('不在 #91 基线内'),
      `探针条目未被以基线名义点名：\n${output}`,
    );
  } finally {
    fs.writeFileSync(LEDGER, original, 'utf8');
  }
  const restored = run_tool();
  assert.equal(restored.status, 0, `台账还原后还红：\n${restored.output}`);
});

test('台账不许发霉：见证注释不在夹具里的条目必须红', () => {
  const original = fs.readFileSync(LEDGER, 'utf8');
  const anchor = "witness: 'setBack/setOverlay 的独立',";
  assert.ok(original.includes(anchor), '探针锚行不在台账里——台账结构变了？');
  try {
    fs.writeFileSync(
      LEDGER,
      original.replace(anchor, "witness: '不在夹具里的见证串 xyz',"),
      'utf8',
    );
    const { status, output } = run_tool([
      '--asar',
      'Z:\\definitely\\missing.asar',
    ]);
    assert.notEqual(
      status,
      0,
      '见证注释消失的条目必须非 0——分歧已变而台账没跟',
    );
    assert.ok(
      output.includes('setback-setoverlay-rearm') && output.includes('发霉'),
      `发霉条目未被逐条点名：\n${output}`,
    );
  } finally {
    fs.writeFileSync(LEDGER, original, 'utf8');
  }
  const restored = run_tool();
  assert.equal(restored.status, 0, `台账还原后还红：\n${restored.output}`);
});
