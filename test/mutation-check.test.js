/**
 * @file mutation-check 的行为锁（issue #89）：工具不只「条目表对得上」，十二条
 * 行为在此固定。全部通过临时目录夹具驱动（--root/--ledger-dir/--baseline/
 * --asar），**不往工作树写探针**——#92 两次探针残留的教训（进程在写入与
 * finally 还原之间被杀，脏数据留在工作树）在这里从根上排除：夹具住临时
 * 目录，进程怎么死都污染不到仓库。
 *
 *   1. 快速模式全绿：--verify 退出码 0——三项检查（形状/计数/失配/测试文件）
 *      由此进 npm test，变异检查拿到第一个自动执行点。本文件不持基线
 *      副本（数字只在工具里），只验行为。
 *   2. 拦截路径：夹具变异被夹具测试拦下（退出码 0），且靶文件逐字节还原
 *      ——还原读回校验从工具外侧再证一遍。
 *   3. 误报通过必红：变异不伤被测行为（测试照过）→ 退出码 1。
 *   4. 未报出即红：测试红了、但 must_mention 片段不在输出里 → 退出码 1
 *      （must_mention 的实义：证明红的正是被测行为，不是别的什么红了）。
 *   5. find 失配直接判失败：出现 0 次 / 2 次 → 退出码 1——重构靶代码后工具当场
 *      红，不静默失守（#89 复核报出的安全性质，不许拆）。
 *   6. 计数检查双向：条目少于基线（搬家丢条目）/多于基线（未宣告的增长）
 *      /desc 重复 → 退出码 1。
 *   7. 测试文件检查：tests 引用不存在的测试文件 → 退出码 1（node --test 对
 *      缺失文件退非 0，不拦就是假拦截）。
 *   8. 无引擎跳过分类：引擎缺失（--asar none）时整组依赖引擎的变异按「跳过」
 *      放行且计入核对；引擎在场（--asar 指到存在文件）时同场景必须红
 *      ——跳过分类只在无引擎处成立，硬标准不因此松动。
 *   9. 抽样档不核对跳过基线：无引擎 + 抽样全拦 → 退 0（#89 发回整改的
 *      阻断 1——ENGINE_SKIP_BASELINE 是全量不变量，子集没有期望跳过数；
 *      抽样模式的形态：无引擎 + --sample 12）。
 *  10. 抽样含依赖引擎的条目同样退 0：该条按「跳过（无引擎）」放行，不得因
 *      跳过数 ≠ 全量基线而红（全量模式的核对由用例 8 锁）。
 *  11. 引擎在场的硬判不被抽样档短路：引擎「在场」+ 抽样 + 依赖引擎的条目
 *      跳过 = 未拦截，任何档位都必须退 1（#89 二次验收的探针 G——
 *      「引擎在场时跳过必须为 0」这条不变量声称任何档位不变，此前
 *      没有测试守它）。
 *  12. 引擎声明与实测不许分家（#256）：实测按「跳过」分类却没声明
 *      `engine: true` → 退出码 1。全量变异退到阶段闸之后，门 4 只数得出
 *      声明的**个数**；数对了但标错了哪一条，只有这条逐条核对能看见。
 *      （门 4 本身只对真条目表生效，夹具换表时跳过，由变异条目 M733 守。）
 *  13. M 编号唯一性（#295）：desc 开头的 M 编号相同、正文不同（如
 *      "M1 A" 与 "M1 B"）→ 退出码 1，报错点名编号与两条 desc——M 编号是
 *      简报/issue/验收评论里指认条目的引用句柄，重号让句柄失效。desc
 *      完全相同（真重复）已由用例 6 的 desc 重复覆盖，不与本条重叠。
 *
 * 工具是 CLI（import 即执行并 process.exit），故用 spawn 而非 require。
 */

'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');

const REPO_ROOT = path.resolve(__dirname, '..');
const TOOL = path.join(REPO_ROOT, 'tools', 'mutation-check.mjs');

/** 跑一遍工具（夹具用例一律 --asar none 固定引擎判定，机器上装没装引擎都不影响） */
function run_tool(args) {
  const r = spawnSync(process.execPath, [TOOL, ...args], {
    cwd: REPO_ROOT,
    encoding: 'utf8',
    maxBuffer: 16 * 1024 * 1024,
  });
  return { status: r.status, output: `${r.stdout || ''}${r.stderr || ''}` };
}

const CALC_JS = 'const double = (n) => n * 2;\nmodule.exports = { double };\n';
const CALC_TEST = [
  "const { test } = require('node:test');",
  "const assert = require('node:assert/strict');",
  "const { double } = require('../lib/calc');",
  "test('加倍', () => {",
  '  assert.equal(double(21), 42);',
  '});',
  '',
].join('\n');

/** 夹具根：lib/calc.js + test/calc.test.js（真 node:test 文件，零仓库依赖） */
function make_fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'mutation-fx-'));
  fs.mkdirSync(path.join(root, 'lib'), { recursive: true });
  fs.mkdirSync(path.join(root, 'test'), { recursive: true });
  fs.writeFileSync(path.join(root, 'lib', 'calc.js'), CALC_JS, 'utf8');
  fs.writeFileSync(path.join(root, 'test', 'calc.test.js'), CALC_TEST, 'utf8');
  return root;
}

function write_ledger(root, entries) {
  const dir = path.join(root, 'ledger');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, 'fx.mjs'),
    'export default ' + JSON.stringify(entries) + ';\n',
    'utf8',
  );
  return dir;
}

const GOOD_ENTRY = {
  desc: 'T1 加倍系数改坏（n*2 → n*3）',
  file: 'lib/calc.js',
  find: 'n * 2',
  replace: 'n * 3',
  tests: ['calc'],
  must_mention: '加倍',
};

test('快速模式全绿：--verify 退出码 0（三项检查进 npm test，变异检查的自动执行点）', () => {
  const { status, output } = run_tool(['--verify']);
  assert.equal(status, 0, `--verify 应全绿，实际退出 ${status}：\n${output}`);
  assert.ok(output.includes('三项检查全过'), `应报告三项检查全过：\n${output}`);
});

test('拦截路径：变异被拦下退出码 0，且靶文件逐字节还原', () => {
  const root = make_fixture();
  try {
    const ledger = write_ledger(root, [GOOD_ENTRY]);
    const { status, output } = run_tool([
      '--root',
      root,
      '--ledger-dir',
      ledger,
      '--baseline',
      '1',
      '--asar',
      'none',
      '--skip-baseline',
      '0',
    ]);
    assert.equal(status, 0, `应拦截，实际退出 ${status}：\n${output}`);
    assert.equal(
      fs.readFileSync(path.join(root, 'lib', 'calc.js'), 'utf8'),
      CALC_JS,
      '靶文件必须逐字节还原（变异残留 = 工具缺陷）',
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('误报通过必红：变异不伤被测行为（测试照过）→ 退出码 1', () => {
  const root = make_fixture();
  try {
    const ledger = write_ledger(root, [
      { ...GOOD_ENTRY, replace: 'n * 2 ' }, // 无行为差异：测试照过
    ]);
    const { status, output } = run_tool([
      '--root',
      root,
      '--ledger-dir',
      ledger,
      '--baseline',
      '1',
      '--asar',
      'none',
      '--skip-baseline',
      '0',
    ]);
    assert.notEqual(status, 0, '未拦截的变异必须让工具非 0——误报通过');
    assert.ok(output.includes('红=false'), `应以红=false 命中：\n${output}`);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('未报出即红：测试红了但 must_mention 片段不在输出 → 退出码 1', () => {
  const root = make_fixture();
  try {
    const ledger = write_ledger(root, [
      { ...GOOD_ENTRY, must_mention: '完全不在输出里的片段' },
    ]);
    const { status, output } = run_tool([
      '--root',
      root,
      '--ledger-dir',
      ledger,
      '--baseline',
      '1',
      '--asar',
      'none',
      '--skip-baseline',
      '0',
    ]);
    assert.notEqual(status, 0, '红了但没命中必须非 0——红的可能不是被测行为');
    assert.ok(output.includes('=false'), `应报告未命中：\n${output}`);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('find 失配直接判失败：出现 0 次或 2 次都退出码 1（重构后当场红，不静默失守）', () => {
  const root = make_fixture();
  try {
    const zero = write_ledger(root, [
      { ...GOOD_ENTRY, find: 'n * 9' }, // 0 次：靶代码被重构
    ]);
    const r0 = run_tool([
      '--root',
      root,
      '--ledger-dir',
      zero,
      '--baseline',
      '1',
      '--asar',
      'none',
      '--skip-baseline',
      '0',
    ]);
    assert.notEqual(r0.status, 0, 'find 0 次必须非 0');
    assert.ok(
      r0.output.includes('0 次') || r0.output.includes('出现 0'),
      `应报出出现次数：\n${r0.output}`,
    );

    fs.writeFileSync(
      path.join(root, 'lib', 'calc.js'),
      CALC_JS + 'const also = (n) => n * 2;\nmodule.exports.also = also;\n',
      'utf8',
    );
    const twice = write_ledger(root, [
      { ...GOOD_ENTRY, find: 'n * 2' }, // 现在出现 2 次
    ]);
    const r2 = run_tool([
      '--root',
      root,
      '--ledger-dir',
      twice,
      '--baseline',
      '1',
      '--asar',
      'none',
      '--skip-baseline',
      '0',
    ]);
    assert.notEqual(r2.status, 0, 'find 2 次必须非 0（替换目标有歧义）');
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('计数检查双向：丢条目 / 未宣告增长 / desc 重复都退出码 1', () => {
  const root = make_fixture();
  try {
    const ledger = write_ledger(root, [GOOD_ENTRY]);
    const low = run_tool([
      '--root',
      root,
      '--ledger-dir',
      ledger,
      '--baseline',
      '2',
      '--asar',
      'none',
      '--skip-baseline',
      '0',
    ]);
    assert.notEqual(
      low.status,
      0,
      '条目表少于基线必须非 0——搬家丢条目要有东西当场红',
    );
    assert.ok(
      low.output.includes('少了 1 条'),
      `应以「少了 1 条」要报出来：\n${low.output}`,
    );

    const high = run_tool([
      '--root',
      root,
      '--ledger-dir',
      ledger,
      '--baseline',
      '0',
      '--asar',
      'none',
      '--skip-baseline',
      '0',
    ]);
    assert.notEqual(high.status, 0, '条目表多于基线必须非 0——增长须显式抬基线');

    const dup = write_ledger(root, [
      GOOD_ENTRY,
      { ...GOOD_ENTRY, find: 'zzz' },
    ]);
    const rd = run_tool([
      '--root',
      root,
      '--ledger-dir',
      dup,
      '--baseline',
      '2',
      '--asar',
      'none',
      '--skip-baseline',
      '0',
    ]);
    assert.notEqual(rd.status, 0, 'desc 重复必须非 0——引用锚点不容二义');
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('M 编号唯一性（#295）：desc 开头的 M 编号相同、正文不同 → 退出码 1，点名编号与两条 desc', () => {
  const root = make_fixture();
  try {
    const first = { ...GOOD_ENTRY, desc: 'M1 加倍系数改坏（n*2 → n*3）' };
    // 同一 find/replace 只换 desc：两条各自单独执行都合法（都会被真拦下），
    // 唯一的问题是共用了 M1——这样门失守时执行阶段不会因别的原因意外变红，
    // 断言落在真正想守的那句话上。
    const second = { ...GOOD_ENTRY, desc: 'M1 另一条撞了同一个编号' };
    const ledger = write_ledger(root, [first, second]);
    const { status, output } = run_tool([
      '--root',
      root,
      '--ledger-dir',
      ledger,
      '--baseline',
      '2',
      '--asar',
      'none',
      '--skip-baseline',
      '0',
    ]);
    assert.notEqual(
      status,
      0,
      'M 编号相同但 desc 不同必须非 0——引用句柄不容二义',
    );
    assert.ok(output.includes('M1 编号重复'), `应点名重复的编号：\n${output}`);
    assert.ok(
      output.includes(first.desc) && output.includes(second.desc),
      `应点名两条冲突的 desc：\n${output}`,
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('测试文件检查：tests 引用不存在的测试文件 → 退出码 1', () => {
  const root = make_fixture();
  try {
    const ledger = write_ledger(root, [
      { ...GOOD_ENTRY, tests: ['no-such-test'] },
    ]);
    const { status, output } = run_tool([
      '--root',
      root,
      '--ledger-dir',
      ledger,
      '--baseline',
      '1',
      '--asar',
      'none',
      '--skip-baseline',
      '0',
    ]);
    assert.notEqual(
      status,
      0,
      '测试文件不存在必须非 0——node --test 对缺失文件退非 0，不拦就是假拦截',
    );
    assert.ok(
      output.includes('测试文件不存在'),
      `应报出缺失的文件：\n${output}`,
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('无引擎跳过分类：引擎缺失按跳过放行核对；引擎在场同场景必须红', () => {
  const root = make_fixture();
  try {
    // 依赖引擎的测试：打印 engine-bundle 的缺引擎警告并整组 skip（不触被测行为）
    fs.writeFileSync(
      path.join(root, 'test', 'gated.test.js'),
      [
        "const { test } = require('node:test');",
        "console.warn('[engine-bundle] 未找到 ere-4.8.0 的 app.asar（可设 ERE_ENGINE_ASAR 指路），引擎比对用例将跳过');",
        "test('依赖引擎的用例', { skip: true }, () => {});",
        '',
      ].join('\n'),
      'utf8',
    );
    const ledger = write_ledger(root, [
      // engine: true 是 #256 的交叉核对要求的：实测按「跳过」分类的条目
      // 必须已声明，否则 run_one 当场判红（声明与实测不许分家）。
      { ...GOOD_ENTRY, tests: ['gated'], engine: true },
    ]);
    const args = ['--root', root, '--ledger-dir', ledger, '--baseline', '1'];
    const engineless = run_tool([
      ...args,
      '--asar',
      'none',
      '--skip-baseline',
      '1',
    ]);
    assert.equal(
      engineless.status,
      0,
      `无引擎 + 依赖引擎的测试 = 跳过且核对过，实际退出 ${engineless.status}：\n${engineless.output}`,
    );
    assert.ok(
      engineless.output.includes('跳过（依赖引擎的测试绿 + 缺引擎警告）'),
      `应报出跳过分类：\n${engineless.output}`,
    );

    const with_engine = run_tool([
      ...args,
      '--asar',
      path.join(root, 'lib', 'calc.js'), // 任意存在文件：引擎「在场」
      '--skip-baseline',
      '0',
    ]);
    assert.notEqual(
      with_engine.status,
      0,
      '引擎在场时未被拦截必须非 0——跳过分类不掩盖真误报通过',
    );

    // #256 的交叉核对：同一条目摘掉 engine: true，实测按「跳过」分类却
    // 没声明——必须当场红。门 4 只数得出声明的个数，数对了但标错了哪
    // 一条，只有这里能看见。
    const undeclared = write_ledger(root, [
      { ...GOOD_ENTRY, tests: ['gated'] },
    ]);
    const stale = run_tool([
      '--root',
      root,
      '--ledger-dir',
      undeclared,
      '--baseline',
      '1',
      '--asar',
      'none',
      '--skip-baseline',
      '1',
    ]);
    assert.notEqual(stale.status, 0, '漏声明 engine: true 必须非 0');
    assert.ok(
      stale.output.includes('实测只被引擎用例守护，却没声明 engine: true'),
      `应报出漏声明：\n${stale.output}`,
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('抽样档不核对跳过基线：无引擎 + 抽样全拦（没抽中依赖引擎的条目）→ 退 0（抽样模式形态）', () => {
  // #89 发回整改的阻断 1：ENGINE_SKIP_BASELINE 是全量模式的不变量，
  // 抽样子集没有期望跳过数——拿全量基线核对抽样必然假红（干净 Linux 上
  // --sample 3 三条全拦仍退 1，同命令在有引擎的 Windows 上试不出来）。
  // 本用例不传 --skip-baseline：锁的是抽样档默认就不核对。
  const root = make_fixture();
  try {
    const entries = [1, 2, 3, 4].map((i) => ({
      ...GOOD_ENTRY,
      desc: `T${i} 加倍系数改坏（抽样样本 ${i}）`,
    }));
    const ledger = write_ledger(root, entries);
    const { status, output } = run_tool([
      '--root',
      root,
      '--ledger-dir',
      ledger,
      '--baseline',
      '4',
      '--asar',
      'none',
      '--sample',
      '3',
      '--seed',
      'ci',
    ]);
    assert.equal(
      status,
      0,
      `无引擎 + 抽样 3 条全拦应退 0，实际退出 ${status}：\n${output}`,
    );
    assert.ok(
      output.includes('SUMMARY caught=3 skipped=0 red=0'),
      `应报告 3 拦 / 0 跳 / 0 红：\n${output}`,
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('抽样含依赖引擎的条目同样退 0：抽样档不核对，依赖引擎的条目按跳过放行', () => {
  // 抽样子集恰好含依赖引擎条目时，该条分类「跳过（无引擎）」；子集没有
  // 期望跳过数，不得因跳过数 ≠ 全量基线而红。全量模式的核对另有用例在锁。
  const root = make_fixture();
  try {
    fs.writeFileSync(
      path.join(root, 'test', 'gated.test.js'),
      [
        "const { test } = require('node:test');",
        "console.warn('[engine-bundle] 未找到 ere-4.8.0 的 app.asar（可设 ERE_ENGINE_ASAR 指路），引擎比对用例将跳过');",
        "test('依赖引擎的用例', { skip: true }, () => {});",
        '',
      ].join('\n'),
      'utf8',
    );
    const ledger = write_ledger(root, [
      { ...GOOD_ENTRY, desc: 'T5 加倍系数改坏（普通条目）' },
      {
        ...GOOD_ENTRY,
        desc: 'T6 依赖引擎条目',
        tests: ['gated'],
        engine: true,
      },
    ]);
    const { status, output } = run_tool([
      '--root',
      root,
      '--ledger-dir',
      ledger,
      '--baseline',
      '2',
      '--asar',
      'none',
      '--sample',
      '2',
      '--seed',
      'ci',
    ]);
    assert.equal(
      status,
      0,
      `抽样含依赖引擎的条目（1 拦 + 1 跳）应退 0，实际退出 ${status}：\n${output}`,
    );
    assert.ok(
      output.includes('SUMMARY caught=1 skipped=1 red=0'),
      `应报告 1 拦 / 1 跳 / 0 红：\n${output}`,
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('引擎在场的硬判不被抽样档短路：sample + 依赖引擎的条目跳过也必须退 1', () => {
  // #89 二次验收的探针 G：把「引擎在场时跳过必须为 0」也按 is_partial
  // 短路（tally.skipped > 0 && !is_partial(args)）时，十条锁全绿——这条
  // 声称「任何档位不变」的不变量没有测试守。本条补上：引擎「在场」的
  // 抽样档里，依赖引擎的测试整组 skip 的条目就是未拦截（红=false），必须退 1。
  const root = make_fixture();
  try {
    fs.writeFileSync(
      path.join(root, 'test', 'gated.test.js'),
      [
        "const { test } = require('node:test');",
        "console.warn('[engine-bundle] 未找到 ere-4.8.0 的 app.asar（可设 ERE_ENGINE_ASAR 指路），引擎比对用例将跳过');",
        "test('依赖引擎的用例', { skip: true }, () => {});",
        '',
      ].join('\n'),
      'utf8',
    );
    const ledger = write_ledger(root, [
      {
        ...GOOD_ENTRY,
        desc: 'T7 依赖引擎条目',
        tests: ['gated'],
        engine: true,
      },
    ]);
    const { status, output } = run_tool([
      '--root',
      root,
      '--ledger-dir',
      ledger,
      '--baseline',
      '1',
      '--asar',
      path.join(root, 'lib', 'calc.js'), // 任意存在文件：引擎「在场」
      '--sample',
      '1',
      '--seed',
      'g',
    ]);
    assert.notEqual(
      status,
      0,
      '引擎在场 + 抽样 + 依赖引擎的条目被跳过 = 未拦截，抽样档不得放宽硬判',
    );
    assert.ok(
      output.includes('SUMMARY caught=0 skipped=1 red=0'),
      `应报告 0 拦 / 1 跳 / 0 红（分类是输出判定，否决权在 verdict）：\n${output}`,
    );
    assert.ok(
      output.includes('引擎在场'),
      `应以「引擎在场」名义点红跳过分类：\n${output}`,
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
