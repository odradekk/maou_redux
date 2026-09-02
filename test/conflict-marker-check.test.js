/**
 * @file conflict-marker-check 的行为锁（issue #299）：已提交的冲突标记
 * 必须被直接点名，不能只靠 prettier / eslint / SyntaxError。
 *
 * 缘由：markdown 里七个连续大于号会被当成嵌套引用块，prettier
 * --write 会把它洗成七个用空格隔开的大于号，此后 --check 永远绿。#234/#236
 * 合并时留下的残留在 master 上躺了两个月，底下还压着本应在表里的登记。
 * JS 侧未解标记一跑就是 SyntaxError（#221），但报错不点名根因；markdown
 * 侧一张网都没有。
 *
 * 四条行为在此固定：
 *
 *   1. 全绿运行：tools/conflict-marker-check.mjs 对真树退出码 0。
 *   2. 探针：.md 与 .js 各塞一处原始冲突标记，必须红且点名两处文件与行号。
 *   3. 探针：markdown 只留结束标记，先 prettier --write 洗成引用块再跑，
 *      仍须红——只认原始形态等于没修（本票核心判据）。
 *   4. setext 标题下划线（上一行是标题正文、本行七个等号）不报；markdown 里
 *      上一行空白的孤立分隔线仍须红，证明排除是按上下文不是按扩展名。
 *
 * 工具是 CLI（import 即执行并 process.exit），故用 spawn 而非 require。
 * 写坏型探针住临时 git 仓库（#89：不写真树），用完即删。
 *
 * 本文件源码不出现行首冲突标记：标记串一律运行时拼接，避免守卫扫到自己。
 */

'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');

const REPO_ROOT = path.resolve(__dirname, '..');
const TOOL = path.join(REPO_ROOT, 'tools', 'conflict-marker-check.mjs');
const PRETTIER = path.join(
  REPO_ROOT,
  'node_modules',
  'prettier',
  'bin',
  'prettier.cjs',
);

const START = '<'.repeat(7);
const END = '>'.repeat(7);
const SEP = '='.repeat(7);
const WASHED = Array(7).fill('>').join(' ');

function run_tool(root) {
  const args = [TOOL];
  if (root) args.push('--root', root);
  const r = spawnSync(process.execPath, args, {
    cwd: REPO_ROOT,
    encoding: 'utf8',
    maxBuffer: 16 * 1024 * 1024,
  });
  return { status: r.status, output: `${r.stdout || ''}${r.stderr || ''}` };
}

function git(dir, args) {
  const r = spawnSync('git', args, { cwd: dir, encoding: 'utf8' });
  assert.equal(
    r.status,
    0,
    `git ${args.join(' ')} 失败：${r.stderr || r.stdout}`,
  );
  return r;
}

function with_repo(run) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ere-conflict-marker-'));
  try {
    git(dir, ['init', '-q']);
    git(dir, ['config', 'user.email', 'dev@example.com']);
    git(dir, ['config', 'user.name', 'dev']);
    return run(dir);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function add_file(dir, rel, content) {
  const full = path.join(dir, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
  git(dir, ['add', rel]);
}

function raw_conflict(left, right) {
  return `${START} HEAD\n${left}\n${SEP}\n${right}\n${END} origin/master\n`;
}

test('conflict-marker-check 全绿（跟踪文本无冲突标记，退出码 0）', () => {
  // 这条断言的对象是**本仓库**。变异检查的隔离副本按 COPY_DENY 把 .git
  // 排除在外，那里没有仓库可断言（工具靠 git ls-files 取跟踪清单，会以
  // 退出码 2 报「not a git repository」）——**用 return 而不是 t.skip()**：
  // 有引擎环境的跳过数守护要求跳过恒为 0，一个 skip 就把那道门判红。
  // 其余几条探针各自 git init 自己的临时仓库，在副本里照常跑，所以
  // M2740-M2742 的拦截不受影响。
  const probe = spawnSync('git', ['rev-parse', '--is-inside-work-tree'], {
    cwd: REPO_ROOT,
    encoding: 'utf8',
  });
  if (probe.status !== 0) {
    return;
  }
  const { status, output } = run_tool();
  assert.equal(
    status,
    0,
    `conflict-marker-check 应全绿，实际退出 ${status}：\n${output}`,
  );
  assert.ok(output.includes('冲突标记'), `报告应声明检查对象：\n${output}`);
});

test('探针：.md 与 .js 各塞一处原始冲突标记，必须红且点名两处', () => {
  with_repo((dir) => {
    add_file(dir, 'docs/probe.md', raw_conflict('left-md', 'right-md'));
    add_file(dir, 'ere/probe.js', raw_conflict('left-js', 'right-js'));
    const { status, output } = run_tool(dir);
    assert.notEqual(
      status,
      0,
      '原始冲突标记探针必须非 0——未解标记会让登记条目脱离表格',
    );
    assert.ok(
      output.includes('docs/probe.md'),
      `markdown 探针文件未被报出：\n${output}`,
    );
    assert.ok(
      output.includes('ere/probe.js'),
      `JS 探针文件未被报出：\n${output}`,
    );
    assert.ok(
      /docs\/probe\.md:\d+/.test(output),
      `markdown 探针未带行号：\n${output}`,
    );
    assert.ok(
      /ere\/probe\.js:\d+/.test(output),
      `JS 探针未带行号：\n${output}`,
    );
    assert.ok(
      output.includes(START) || output.includes('原始标记'),
      `未点名原始标记形态：\n${output}`,
    );
  });
});

test('探针：markdown 的结束标记经 prettier --write 洗净后仍须红', () => {
  with_repo((dir) => {
    const rel = 'docs/washed.md';
    add_file(dir, rel, `${END} origin/master\n`);
    const md = path.join(dir, rel);
    // 洗净形态直接写死，不在这里现跑 prettier。
    //
    // 本用例锁的是**我们的检查器认不认这个形态**；「prettier 会把
    // `>>>>>>> x` 规范化成 `> > > > > > > x`」是外部事实，由下面那条
    // 单独的用例在有 node_modules 的环境里核对。分开的理由是环境：
    // CI 的 engine / mutation 两个 job 不跑 npm ci（变异的隔离副本更是
    // 按 COPY_DENY 把 node_modules 排除在外），在那里 spawn prettier
    // 必然 ENOENT——首版合并时这条就把两个 job 打红了（#299 / #302）。
    fs.writeFileSync(md, `${WASHED} origin/master\n`, 'utf8');
    const washed_body = fs.readFileSync(md, 'utf8');
    assert.ok(
      !washed_body.includes(END),
      `洗净形态里不该还有原始结束标记：\n${washed_body}`,
    );
    git(dir, ['add', rel]);
    const { status, output } = run_tool(dir);
    assert.notEqual(status, 0, 'prettier 洗净后仍须红——只认原始形态等于没修');
    assert.ok(
      output.includes(rel),
      `洗净后的 markdown 探针未被报出：\n${output}`,
    );
    assert.ok(
      output.includes(WASHED) || output.includes('洗净'),
      `未点名 prettier 洗净形态：\n${output}`,
    );
  });
});

test('setext 标题下划线不得报为冲突标记', () => {
  with_repo((dir) => {
    add_file(dir, 'docs/heading.md', `合法标题\n${SEP}\n段落正文\n`);
    const { status, output } = run_tool(dir);
    assert.equal(
      status,
      0,
      `setext 标题下划线不得报为冲突标记，实际退出 ${status}：\n${output}`,
    );
  });
});

test('markdown 里上一行空白的孤立分隔线仍须红', () => {
  with_repo((dir) => {
    add_file(dir, 'docs/orphan.md', `\n${SEP}\n`);
    const { status, output } = run_tool(dir);
    assert.notEqual(
      status,
      0,
      '上一行空白的孤立分隔线仍须红——排除按上下文不是按扩展名',
    );
    assert.ok(
      output.includes('docs/orphan.md'),
      `孤立分隔线未被报出：\n${output}`,
    );
  });
});

test('外部事实：prettier 确实把 >>>>>>> 规范化成 > > > > > > >（有 node_modules 时才跑）', () => {
  // 上一条用例把洗净形态写死了，这条负责证明那个形态不是我们臆想的。
  // 依赖 node_modules 里的 prettier，而 CI 的 engine / mutation job 与变异
  // 的隔离副本都没有它——**用 return 而不是 t.skip()**：跳过数守护在有
  // 引擎的环境里要求跳过数恒为 0（test/engine-present-skip-baseline.txt），
  // 一个 skip 就会把那道门判红。
  if (!fs.existsSync(PRETTIER)) {
    return;
  }
  with_repo((dir) => {
    const rel = 'docs/washed-fact.md';
    add_file(dir, rel, `${END} origin/master\n`);
    const md = path.join(dir, rel);
    const pr = spawnSync(process.execPath, [PRETTIER, '--write', md], {
      cwd: dir,
      encoding: 'utf8',
    });
    assert.equal(
      pr.status,
      0,
      `prettier --write 失败：${pr.stderr || pr.stdout}`,
    );
    const body = fs.readFileSync(md, 'utf8');
    assert.ok(
      body.includes(WASHED),
      `prettier 没把结束标记洗成引用块——洗净形态的写死值该跟着改：\n${body}`,
    );
  });
});
