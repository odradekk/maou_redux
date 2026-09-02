/**
 * @file tools/select-tests.mjs 的行为锁（issue #256）。
 *
 * 这个工具的危险不在「选错」，在**选少了还不说**。所以锁的重点是那几条
 * 保守性质，而不是「某个输入选出某个集合」：
 *
 *   1. 全局锁恒在：不带 --no-locks 时，LOCKS 那 19 个文件一个不少。
 *   2. 兜底必须退回全量：任一改动文件解析不出测试面，输出就是全部
 *      test/*.test.js——**正确性不依赖规则表的完备性**，这是整套分层能
 *      成立的前提。规则表将来长草，代价只是慢，不是漏测。
 *   3. 四条规则各自生效且取并集：改动的测试文件本身 / 条目表 file:→tests: /
 *      门面产物归 gen-facade / 路径字面量反查。
 *   4. 目录探针只对二级以上目录启用：`tools/x.mjs` 不许因为目录是裸
 *      `tools` 而命中一大片。这条是实测逼出来的——没有它，
 *      docs/stub-registry.md 牵出 44 个测试而真实依赖只有 30 个，
 *      tools/trace-check.mjs 牵出 33 个而真实依赖只有 1 个。
 *   5. 选出的每个文件都真实存在：node --test 遇到不存在的文件直接非 0
 *      退出，形同空跑（与条目表「测试文件检查」同款标准）。
 *   6. 工具文件名不落在 node --test 的发现模式里：叫 test-select.mjs 会被
 *      `npm test` 当成测试文件执行。首版就踩了，这里钉住不复发。
 *
 * 工具是 CLI（import 即执行并 process.exit），故用 spawn 而非 require。
 * stdout 是文件列表、stderr 是报告，两者分流也在这里钉住——列表要能直接
 * 喂给别的命令。
 */

'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const REPO_ROOT = path.resolve(__dirname, '..');
const TOOL = path.join(REPO_ROOT, 'tools', 'select-tests.mjs');

/** 跑一遍工具，stdout 与 stderr 分开返回（分流本身就是被锁的行为） */
function run(...args) {
  const r = spawnSync(process.execPath, [TOOL, ...args], {
    cwd: REPO_ROOT,
    encoding: 'utf8',
    maxBuffer: 16 * 1024 * 1024,
  });
  return {
    status: r.status,
    files: (r.stdout || '').split('\n').filter(Boolean),
    report: r.stderr || '',
  };
}

function all_test_files() {
  return fs
    .readdirSync(path.join(REPO_ROOT, 'test'))
    .filter((n) => n.endsWith('.test.js'))
    .map((n) => `test/${n}`);
}

// 与工具里的 LOCKS 常量刻意不共享：测试复制一份，工具改了这里就红。
// 「全局锁少了一个」必须是一次有意识的提交，而不是编辑常量的副作用。
const LOCKS = [
  'test/asar-candidates.test.js',
  'test/compare-first-turn.test.js',
  'test/compare-train.test.js',
  'test/chara-table-addressing.test.js',
  'test/com-family-wiring.test.js',
  'test/kojo-family-wiring.test.js',
  'test/kojo-text-fidelity.test.js',
  'test/domain-check.test.js',
  'test/engine-contract-check.test.js',
  'test/mutation-check.test.js',
  'test/output-lang-lock.test.js',
  'test/ownership-scan.test.js',
  'test/resource-media.test.js',
  'test/skip-count-check.test.js',
  'test/static-table-coverage.test.js',
  'test/top-level-wiring.test.js',
  'test/trace-check.test.js',
  'test/worktree-write-lock.test.js',
  'test/conflict-marker-check.test.js',
];

test('全局锁恒在：条目表命中的改动也带上 LOCKS 全部 19 个', () => {
  const { status, files } = run('--files', 'ere/chara/chara-make.js');
  assert.equal(status, 0);
  for (const lock of LOCKS) {
    assert.ok(files.includes(lock), `全局锁缺了 ${lock}`);
  }
  assert.ok(
    files.includes('test/chara-make.test.js'),
    '条目表 file:→tests: 没生效',
  );
});

test('--locks-only 只给 LOCKS，一个不多一个不少', () => {
  const { status, files } = run('--locks-only');
  assert.equal(status, 0);
  assert.deepEqual([...files].sort(), [...LOCKS].sort());
});

test('--no-locks 去掉全局锁（内环档），但保留真实相关的测试', () => {
  const { files } = run('--files', 'ere/chara/chara-make.js', '--no-locks');
  assert.ok(files.includes('test/chara-make.test.js'));
  assert.equal(
    files.filter(
      (f) => LOCKS.includes(f) && f !== 'test/mutation-check.test.js',
    ).length,
    0,
    '--no-locks 仍带进了全局锁',
  );
});

/**
 * 不可解析的路径必须**在运行时拼**，不能写成字面量。
 *
 * 路径反查扫的是 test/ 全树的源码，而本文件也在那棵树里——把
 * `no/such/file.xyz` 写成字面量，它就出现在本文件源码里，于是「不存在的
 * 文件」被反查命中本文件，兜底用例当场假绿。首版就是这么写的。
 */
function unresolvable_path() {
  return ['zz', 'probe', String(Date.now()), 'x'].join('/') + '.bin';
}

test('兜底：任一改动文件解析不出测试面 → 退回全量（整套分层的安全前提）', () => {
  const probe = unresolvable_path();
  const { status, files, report } = run('--files', probe);
  assert.equal(status, 0);
  assert.deepEqual([...files].sort(), all_test_files().sort());
  assert.match(report, /退回全量/);
  assert.ok(report.includes(probe), '不可解析的文件名必须被打出来');
});

test('兜底是「任一」不是「全部」：一个可解析 + 一个不可解析 → 仍退回全量', () => {
  const { files } = run(
    '--files',
    `ere/chara/chara-make.js,${unresolvable_path()}`,
  );
  assert.deepEqual([...files].sort(), all_test_files().sort());
});

test('规则：改动的测试文件本身必被选中', () => {
  const { files } = run('--files', 'test/example.test.js', '--no-locks');
  assert.ok(files.includes('test/example.test.js'));
});

test('规则：门面产物归 gen-facade（ere/facade/ 不在条目表里）', () => {
  const { files, report } = run('--files', 'ere/facade/game.js', '--no-locks');
  assert.ok(files.includes('test/gen-facade.test.js'));
  assert.match(report, /门面产物/);
});

test('规则：路径字面量反查——docs/stub-registry.md 牵出读它的那些测试', () => {
  const { files, report } = run(
    '--files',
    'docs/stub-registry.md',
    '--no-locks',
  );
  assert.match(report, /路径反查/);
  // 该登记表被多个域的存根清单用例读，这里只钉「反查确实生效且跨域」，
  // 不复制具体名单（名单会随移植推进增长，复制就是第二份真相）。
  assert.ok(files.length >= 5, `路径反查只牵出 ${files.length} 个，太少`);
  assert.ok(files.includes('test/chara-make.test.js'));
});

test('目录探针只对二级以上目录启用：tools/x.mjs 不许牵出一大片', () => {
  // tools/trace-check.mjs 的真实反查依赖是个位数；若目录探针退化成裸
  // `tools`，每个在注释里提过任何工具的测试都会命中（实测 33 个）。
  const { files } = run('--files', 'tools/trace-check.mjs', '--no-locks');
  assert.ok(
    files.length <= 10,
    `tools/trace-check.mjs 牵出 ${files.length} 个测试——目录探针退化了`,
  );
  // 而二级目录仍要生效：tools/mutations/<分片> 靠目录探针命中。
  const shard = run('--files', 'tools/mutations/chara.mjs', '--no-locks');
  assert.ok(shard.files.length > 0, '二级目录探针失效');
});

test('选出的每个文件都真实存在（不存在 = node --test 直接非 0，形同空跑）', () => {
  const { files } = run('--files', 'ere/chara/chara-make.js');
  for (const f of files) {
    assert.ok(fs.existsSync(path.join(REPO_ROOT, f)), `选出了不存在的 ${f}`);
  }
});

test('stdout 是文件列表、stderr 是报告——列表要能直接喂给别的命令', () => {
  const { files, report } = run('--files', 'ere/chara/chara-make.js');
  assert.ok(
    files.every((f) => /^test\/[\w.-]+\.test\.js$/.test(f)),
    `stdout 混进了非文件行：${files.filter((f) => !/^test\//.test(f)).join(' ')}`,
  );
  assert.match(report, /改动 1 个文件/);
});

test('工具文件名避开 node --test 的发现模式（叫 test-select.mjs 会被当测试跑）', () => {
  const name = path.basename(TOOL);
  assert.ok(!name.startsWith('test-'), `${name} 会被 **/test-*.mjs 命中`);
  assert.ok(!/[-_.]test\.[cm]?js$/.test(name), `${name} 会被 *-test.mjs 命中`);
  assert.notEqual(name, 'test.mjs');
});

test('未知参数直接报错，不静默忽略', () => {
  const { status, report } = run('--nonesuch');
  assert.equal(status, 1);
  assert.match(report, /未知参数/);
});
