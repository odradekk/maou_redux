/**
 * @file facade-property-check 的行为锁（issue #493）：工具不只「当前全绿」，
 * 还要「写坏即红、且指得出位置与整改方向」——三条行为在此固定：
 *
 *   1. 全绿运行：tools/facade-property-check.mjs 退出码 0。本用例把工具并入
 *      npm test——门面改名、域切片搬走、口上里新写错属性名，任一都会让三项
 *      自检变红，不再依赖记得手动跑。
 *   2. 探针：把 #493 的四类写法各写一处进 ere/（属性名写错、域写错、域段写错、
 *      域切片别名上的属性写错），工具必须非 0、逐处报出 file:line 与地址，并给出
 *      可区分的整改指引。
 *   3. 探针删净后复绿——证明红的正是探针，不是副本或工具坏了。
 *
 * 写坏型探针住在**临时仓库副本**里（#89 的纪律，见 helpers/probe-repo.js）：
 * 就地写工作树会与 node --test 的并行读者撞车。副本按清单最小拷贝（ere/ 全树
 * + 工具本体），判定面与真树一致。
 */

'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const { after, test } = require('node:test');

const { make_probe_repo } = require('./helpers/probe-repo');

const REPO_ROOT = path.resolve(__dirname, '..');
const TOOL = path.join(REPO_ROOT, 'tools', 'facade-property-check.mjs');

/**
 * 跑一遍工具，返回 { status, output }。工具按自身位置推导仓库根，所以探针必须
 * 跑**副本里的**工具（传入副本路径），不是真树的那个。
 */
function run_tool(tool, cwd) {
  const r = spawnSync(process.execPath, [tool], {
    cwd,
    encoding: 'utf8',
    maxBuffer: 16 * 1024 * 1024,
    timeout: 30_000,
    killSignal: 'SIGKILL',
  });
  return { status: r.status, output: `${r.stdout || ''}${r.stderr || ''}` };
}

/** 副本里的工具路径 */
function probe_tool(root) {
  return path.join(root, 'tools', 'facade-property-check.mjs');
}

// 判定面 = ere/ 全树（域清单来自 facade/chara.js、属性集来自 facade/chara-*.js）
// + 工具本体。副本进程内单例，用例串行复用。
const PROBE_REPO_ENTRIES = ['ere', 'tools/facade-property-check.mjs'];

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

// 探针模块主体：#493 修前的四类写法（属性名写错 / 域写错 / 域段写错 / 别名上的
// 属性名写错）各一处。四行都带独立的域.属性串，报错文案互不重叠；变异拆掉哪一类
// 判定，对应用例就因「红或文案缺失」而失败。
const PROBE_BODY = [
  '// 探针模块（test/facade-property-check.test.js 写入，跑完即删）：',
  '// #493 修前的四类写法，门面属性检查器的靶子。',
  'module.exports = {};',
  'function probe(cid) {',
  '  const kojo = chara(cid).kojo; // 域切片别名（复核发现的第 14 处藏在别名写法里）',
  '  return {',
  '    a: chara(cid).train.穿孔装着, // 属性名写错（train 域无此属性）',
  '    b: chara(cid).kojo.状态, // 域写错（CFLAG:1 属 invasion 域）',
  '    c: chara(cid).trains.状态, // 域段写错（chara() 视图没有 trains）',
  '    d: kojo.初吻对象, // 别名上的域写错（CFLAG:16 属 train 域）',
  '  };',
  '}',
  '',
].join('\n');

test('facade-property-check 全绿（chara() 门面访问的属性都落在对应域门面上）', () => {
  const { status, output } = run_tool(TOOL, REPO_ROOT);
  assert.equal(
    status,
    0,
    `门面属性检查应全绿，实际退出 ${status}：\n${output}`,
  );
  assert.ok(output.includes('门面属性'), `报告应含判定统计：\n${output}`);
  assert.ok(
    output.includes('chara() 门面访问'),
    `报告应说明扫了什么：\n${output}`,
  );
});

test('探针：属性名写错（train.穿孔装着）必须红，并指路「该域门面没有」', () => {
  const root = probe_repo();
  const probe = path.join(root, 'ere', '__facade_probe__.js');
  const cleanup = () => {
    if (fs.existsSync(probe)) {
      fs.unlinkSync(probe);
    }
  };
  cleanup(); // 上一次异常退出留下的残骸先清
  try {
    fs.writeFileSync(probe, PROBE_BODY, 'utf8');
    const { status, output } = run_tool(probe_tool(root), root);
    assert.notEqual(
      status,
      0,
      '探针带着不存在的门面属性，工具必须非 0——属性名写错会静默读成 undefined',
    );
    const lines = output.split('\n');
    const hit = lines.find(
      (line) =>
        line.includes('__facade_probe__.js') && line.includes('train.穿孔装着'),
    );
    assert.ok(hit, `探针的属性名未被逐处报出：\n${output}`);
    assert.match(
      hit,
      /train 域门面没有「穿孔装着」/,
      `整改指引应指路「补名或补访问器」：\n${hit}`,
    );
  } finally {
    cleanup();
  }
  // 删净之后复绿（也证明探针真的进过扫描）
  const restored = run_tool(probe_tool(root), root);
  assert.equal(
    restored.status,
    0,
    `探针删了还红——副本或工具有一边不对：\n${restored.output}`,
  );
});

test('探针：域写错（kojo.状态）与域段写错（trains）必须红，且指引可区分', () => {
  const root = probe_repo();
  const probe = path.join(root, 'ere', '__facade_probe__.js');
  const cleanup = () => {
    if (fs.existsSync(probe)) {
      fs.unlinkSync(probe);
    }
  };
  cleanup();
  try {
    fs.writeFileSync(probe, PROBE_BODY, 'utf8');
    const { status, output } = run_tool(probe_tool(root), root);
    assert.notEqual(status, 0, '探针在，工具必须非 0');
    const lines = output.split('\n');
    const wrong_domain = lines.find(
      (line) =>
        line.includes('__facade_probe__.js') && line.includes('kojo.状态'),
    );
    assert.ok(wrong_domain, `域写错未被报出：\n${output}`);
    assert.match(
      wrong_domain,
      /「状态」在 invasion 域存在/,
      `域写错应指路属主域：\n${wrong_domain}`,
    );
    const wrong_segment = lines.find(
      (line) =>
        line.includes('__facade_probe__.js') && line.includes('trains.状态'),
    );
    assert.ok(wrong_segment, `域段写错未被报出：\n${output}`);
    assert.match(
      wrong_segment,
      /chara\(\) 视图上没有「trains」域/,
      `域段写错应指路装配体：\n${wrong_segment}`,
    );
  } finally {
    cleanup();
  }
  const restored = run_tool(probe_tool(root), root);
  assert.equal(
    restored.status,
    0,
    `探针删了还红——副本或工具有一边不对：\n${restored.output}`,
  );
});

test('探针：域切片别名上的属性必须同样受判（const kojo = chara(x).kojo → kojo.初吻对象）', () => {
  // 复核发现的第 14 处（K9 的 `kojo.初吻对象`）落在别名写法上，直链扫描看不见。
  // 本用例钉住别名这一面真的进了判定：只破坏别名路径也应报出位置与属主域。
  const root = probe_repo();
  const probe = path.join(root, 'ere', '__facade_probe__.js');
  const cleanup = () => {
    if (fs.existsSync(probe)) {
      fs.unlinkSync(probe);
    }
  };
  cleanup();
  try {
    fs.writeFileSync(probe, PROBE_BODY, 'utf8');
    const { status, output } = run_tool(probe_tool(root), root);
    assert.notEqual(status, 0, '探针在，工具必须非 0');
    const hit = output
      .split('\n')
      .find(
        (line) =>
          line.includes('__facade_probe__.js') &&
          line.includes('kojo.初吻对象'),
      );
    assert.ok(hit, `别名上的属性未被报出：\n${output}`);
    assert.match(
      hit,
      /「初吻对象」在 train 域存在/,
      `别名路径的整改指引应指路属主域：\n${hit}`,
    );
  } finally {
    cleanup();
  }
  const restored = run_tool(probe_tool(root), root);
  assert.equal(
    restored.status,
    0,
    `探针删了还红——副本或工具有一边不对：\n${restored.output}`,
  );
});
