/**
 * @file asar 候选位置的同步锁。
 *
 * 引擎 asar 的定位在三处各写了一份（CJS/ESM 混用，抽不成共享模块）：
 *   test/helpers/engine-bundle.js     测试侧的引擎比对
 *   tools/mutation-check.mjs          变异检查的「引擎在场」判定
 *   tools/engine-contract-check.mjs   引擎契约锚点校核
 *
 * 三份漂移的后果不是报错，是**静默降级**：找不到 asar 的那一侧把引擎用例
 * 整片 skip 却仍报绿（#113 验收被这个假象误导过），而 mutation-check 那侧
 * 会判出「引擎在场却有 N 条按跳过处理」的整体红。两种表现差得太远，靠人
 * 记住「改一处要改三处」不可靠，所以在这里钉死。
 *
 * 锁的口径是**候选列表逐条同序相等**，不是「都含某几条」——顺序决定命中
 * 哪一份 asar，乱序会让慢盘那条排到快盘前面。
 */

const assert = require('node:assert');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const REPO_ROOT = path.resolve(__dirname, '..');

const SOURCES = [
  'test/helpers/engine-bundle.js',
  'tools/mutation-check.mjs',
  'tools/engine-contract-check.mjs',
];

/**
 * 从源码里切出 ASAR_CANDIDATES 的数组体，逐条归一。
 *
 * 归一只做一件事：把三处各异的仓库根变量名（REPO_ROOT / REPO / root）换成
 * 同一个占位符。其余一律逐字比较——路径字面量差一个字符就该红。
 */
function extract_candidates(text, where) {
  const start = text.indexOf('const ASAR_CANDIDATES =');
  assert.notEqual(
    start,
    -1,
    `${where} 里找不到 ASAR_CANDIDATES——三处的定位必须都用这个名字，改名请同步本锁`,
  );
  const open = text.indexOf('[', start);
  const close = text.indexOf('].filter(Boolean)', open);
  assert.ok(
    open !== -1 && close !== -1 && close > open,
    `${where} 的 ASAR_CANDIDATES 不是 [...].filter(Boolean) 的形状`,
  );
  return text
    .slice(open + 1, close)
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('//'))
    .map((line) => line.replace(/,$/, ''))
    .map((line) => line.replace(/\b(REPO_ROOT|REPO|root)\b/g, '<ROOT>'));
}

test('三处 asar 候选列表逐条同序相等', () => {
  const lists = SOURCES.map((rel) => ({
    rel,
    items: extract_candidates(
      fs.readFileSync(path.join(REPO_ROOT, rel), 'utf8'),
      rel,
    ),
  }));

  const [first, ...rest] = lists;
  assert.ok(first.items.length >= 3, '候选列表短得可疑，提取多半出错了');
  for (const other of rest) {
    assert.deepEqual(
      other.items,
      first.items,
      `${other.rel} 的 asar 候选列表与 ${first.rel} 不一致——三处必须同款（同序逐条相等）`,
    );
  }
});

test('候选列表覆盖 worktree 场景：仓库内那条之外必须有绝对路径回落', () => {
  const items = extract_candidates(
    fs.readFileSync(path.join(REPO_ROOT, SOURCES[0]), 'utf8'),
    SOURCES[0],
  );

  // ere-4.8.0-win-x64/ 不进 git（.gitignore:15），worktree 与 mutation-check
  // 的并行副本里都没有它——只靠「仓库内」那条必然落空
  const repo_local = items.filter((i) => i.includes('<ROOT>'));
  assert.equal(repo_local.length, 1, '仓库内候选应恰有一条');

  const absolute = items.filter(
    (i) => !i.includes('<ROOT>') && !i.includes('process.env'),
  );
  assert.ok(
    absolute.length >= 1,
    'ere-4.8.0-win-x64/ 不进 git，worktree 与并行副本够不着仓库内那条，' +
      '必须至少留一条绝对路径回落，否则引擎用例会整片静默 skip',
  );

  assert.ok(
    items[0].includes('process.env.ERE_ENGINE_ASAR'),
    '环境变量必须排第一——显式指路要能压过一切回落',
  );
});

test('三处都认 ERE_ENGINE_ASAR=none（SOP 跳过基线核对的唯一开关）', () => {
  // 候选列表里有绝对路径回落之后，`env -u ERE_ENGINE_ASAR` 不再等于无引擎
  // ——它照样命中 ~/.era-engine 或 /mnt/d 那条。SOP 第 2 步「跳过基线核对
  // （不带引擎）」于是完全依赖这个显式开关，三处缺一它就名存实亡。
  for (const rel of SOURCES) {
    const text = fs.readFileSync(path.join(REPO_ROOT, rel), 'utf8');
    assert.match(
      text,
      /process\.env\.ERE_ENGINE_ASAR === 'none'/,
      `${rel} 不认 ERE_ENGINE_ASAR=none——SOP 的无引擎核对会静默变成「带引擎」`,
    );
  }
});

test('行为验证：ERE_ENGINE_ASAR=none 时 engine-bundle 真的退回无引擎', () => {
  // 静态匹配只证明写了那行字，证不了它接在正确的位置上（比如写在回落之后
  // 就永远轮不到）。这里起子进程实跑一次。
  // 判据用 falsy 而不是 === undefined：无引擎时 load_engine_bundle 返回的是
  // null（engine-bundle.js 里 cached_bundle = null 那支），=== undefined 会
  // 把「无引擎」误读成「有引擎」
  const probe = `
    const b = require(${JSON.stringify(path.join(REPO_ROOT, 'test/helpers/engine-bundle.js'))});
    console.log(b.load_engine_bundle() ? 'ENGINE_PRESENT' : 'NO_ENGINE');
  `;
  const run = (env_value) =>
    spawnSync(process.execPath, ['-e', probe], {
      encoding: 'utf8',
      env: { ...process.env, ERE_ENGINE_ASAR: env_value },
    }).stdout.trim();

  assert.equal(
    run('none'),
    'NO_ENGINE',
    'none 必须让 engine-bundle 退回无引擎',
  );

  // 反向自证：换成一个真实存在的 asar，同一段探针必须给出相反结论——
  // 否则「返回 undefined」可能只是探针自己坏了。无引擎的机器（CI）上
  // locate_asar 本就返回 undefined，那里跳过这半条。
  const real = require('./helpers/engine-bundle.js').locate_asar();
  if (real) {
    assert.equal(
      run(real),
      'ENGINE_PRESENT',
      '指向真实 asar 时必须判定为引擎在场，否则上一条的 NO_ENGINE 不说明问题',
    );
  }
});

test('自证：候选顺序被打乱时本锁必须报出来', () => {
  const good = `const ASAR_CANDIDATES = () =>
  [
    process.env.ERE_ENGINE_ASAR,
    path.join(REPO_ROOT, 'a', 'app.asar'),
    '/mnt/d/x/app.asar',
  ].filter(Boolean);`;
  // 只交换后两条的次序，条目集合完全相同——「都含某几条」式的写法会漏掉它
  const swapped = `const ASAR_CANDIDATES = () =>
  [
    process.env.ERE_ENGINE_ASAR,
    '/mnt/d/x/app.asar',
    path.join(REPO, 'a', 'app.asar'),
  ].filter(Boolean);`;

  const a = extract_candidates(good, '<合成 good>');
  const b = extract_candidates(swapped, '<合成 swapped>');
  assert.deepEqual([...a].sort(), [...b].sort(), '集合应当相同（这正是陷阱）');
  assert.notDeepEqual(a, b, '同序比较必须能区分它们，否则本锁对乱序失明');
});
