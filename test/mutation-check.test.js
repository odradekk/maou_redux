/**
 * @file mutation-check 的行为锁（issue #89）：工具不只「条目表对得上」，二十条
 * 行为在此固定。全部通过临时目录夹具驱动（--root/--ledger-dir/--asar），**不往工作树写探针**——#92 两次探针残留的教训（进程在写入与
 * finally 还原之间被杀，脏数据留在工作树）在这里从根上排除：夹具住临时
 * 目录，进程怎么死都污染不到仓库。
 *
 *   1. 快速模式全绿：--verify 退出码 0——五项检查（计数/失配/测试文件/
 *      引擎声明/must_mention 出处）由此进 npm test，变异检查拿到第一个
 *      自动执行点。本文件不持条数副本（数字只在各分片里），只验行为。
 *   2. 拦截路径：夹具变异被夹具测试拦下（退出码 0），且靶文件逐字节还原
 *      ——还原读回校验从工具外侧再证一遍。
 *   3. 误报通过必红：变异不伤被测行为（测试照过）→ 退出码 1。
 *   4. 未报出即红：测试红了、但 must_mention 片段不在输出里 → 退出码 1
 *      （must_mention 的实义：证明红的正是被测行为，不是别的什么红了）。
 *   5. find 失配直接判失败：出现 0 次 / 2 次 → 退出码 1——重构靶代码后工具当场
 *      红，不静默失守（#89 复核报出的安全性质，不许拆）。
 *   6. 计数检查双向（#367 起按分片自报）：实际条数少于分片 COUNT（搬家
 *      丢条目、解析合并冲突时少收几条）/多于 COUNT（未宣告的增长）
 *      /desc 重复 → 退出码 1，前两者报错点名分片与两个数。
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
 *  14. 分片没导出 COUNT（门 1，#367）→ 退出码 1：缺声明必须红，而不是
 *      「没声明就不查」——后者会让新分片默认脱离门 1，正是「新增分片
 *      即入账」要防的反面。
 *  15. must_mention 出处门（#442）：must_mention 在它声明的 tests:/file:/
 *      era-fixture.js 里都找不到出处（逐字与模板字面段都匹配不上）→
 *      退出码 1，报错点名 desc 与 must_mention——这道门查的是「断言与
 *      出处脱节」，不是「断言有没有区分力」，见 gate_must_mention_source
 *      头注。
 *  16. `--verify` 全程只读（#532）：门全过与门失败两种形态下，工作区都
 *      逐字节不变，且 `--verify` 不进入执行阶段（靶文件置为只读仍报绿
 *      ——「写了再还原」在 Windows 上是 EPERM、Linux 上是 EACCES）。
 *      `--verify` 是最高频的入口，跑它的人没预期源码会被改。
 *  17. 启动自检（#532）：靶文件停在「HEAD 内容应用了某条变异」的状态时，
 *      拒绝启动、点名 M 编号、打印可照抄的还原命令，且不自动还原（方向
 *      是「脏了立刻发现」，不是「脏了之后自动修」）；其余未提交改动
 *      （正在改那个靶文件）一律不拦——恒等判定零误报，见 detect_residue
 *      头注。夹具因此要造真 git 仓库（make_git_fixture），非 git 夹具
 *      根自检跳过。
 *  18. 自检排在门之前、所有档位都查（#532）：`--verify` 读的也是工作区里
 *      的靶文件，残留态下它的「五项检查全过」是假结论，比不报更坏（它在
 *      npm test 里）。这条与 16 一起构成 `--verify` 的两种形态：干净树报
 *      绿且只读，残留态拒绝并给还原命令。
 *  19. 自检的两条鲁棒分支（#532）：靶文件只进了索引、HEAD 里还没有它
 *      （取不到 HEAD 内容）→ 跳过该文件而不是崩；旧条目 desc 没有 M 编号
 *      → 报「某条」而不是「Mnull」，还原命令照给。后者是 #113 遗留的 4 条。
 *  20. 判据与 `run_one` 共用同一份 `apply_mutation`（#532）：replace 里的
 *      `$$`/`$&`/`$'` 会被 String.replace 展开（1056 条条目的 replace 带
 *      `$`），所以「写下去的字节」不等于条目表里的字面 replace。整串恒等
 *      判定不许换成「长度差对得上就算残留」这类便宜近似——最坏形态
 *      （1.2 MB × 961 条）正诱人这么省，见 detect_residue 头注的实测。
 *
 * 工具是 CLI（import 即执行并 process.exit），故用 spawn 而非 require。
 */

'use strict';

const assert = require('node:assert/strict');
const { spawn, spawnSync } = require('node:child_process');
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
    // 本机实测最重的 --verify 约 2s，其余调用都是临时目录里 1-2 个文件
    // 的夹具规模、更快；30s 留出充足余量（#449 统一默认值）
    timeout: 30_000,
    killSignal: 'SIGKILL',
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

/**
 * 写一份单分片条目表。`declared` 省略时按实际条数自报（门 1 放行），
 * 传值即造「自报与实际不符」；传 null 造「分片没导出 COUNT」。
 */
function write_ledger(root, entries, declared) {
  const dir = path.join(root, 'ledger');
  fs.mkdirSync(dir, { recursive: true });
  const count =
    declared === null
      ? ''
      : `export const COUNT = ${declared === undefined ? entries.length : declared};\n`;
  fs.writeFileSync(
    path.join(dir, 'fx.mjs'),
    count + 'export default ' + JSON.stringify(entries) + ';\n',
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

test('快速模式全绿：--verify 退出码 0（五项检查进 npm test，变异检查的自动执行点）', () => {
  const { status, output } = run_tool(['--verify']);
  assert.equal(status, 0, `--verify 应全绿，实际退出 ${status}：\n${output}`);
  assert.ok(output.includes('五项检查全过'), `应报告五项检查全过：\n${output}`);
});

test('门 1：分片没导出 COUNT → 退出码 1（缺声明不是免检）', () => {
  const root = make_fixture();
  try {
    const ledger = write_ledger(root, [GOOD_ENTRY], null);
    const { status, output } = run_tool([
      '--root',
      root,
      '--ledger-dir',
      ledger,
      '--asar',
      'none',
      '--skip-baseline',
      '0',
    ]);
    assert.notEqual(status, 0, '缺 COUNT 必须非 0——否则新分片默认脱离门 1');
    assert.ok(
      output.includes('fx.mjs') && output.includes('没有导出 COUNT'),
      `报错要点名分片与「没有导出 COUNT」——落回条数不符那句会得到「自报 ` +
        `COUNT undefined」，看不出该补声明还是该改数：\n${output}`,
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
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
    // 门 5（#442）只按静态出处核对 must_mention，不管它会不会真的出现在
    // 运行期输出里——这条注释满足门 5 的静态定位，不会被执行到，因此不
    // 影响本用例要验证的行为：红了但输出里没有这个片段仍必须判红。
    fs.appendFileSync(
      path.join(root, 'test', 'calc.test.js'),
      '// 完全不在输出里的片段：仅供 must_mention 静态定位使用，不会被执行到\n',
      'utf8',
    );
    const ledger = write_ledger(root, [
      { ...GOOD_ENTRY, must_mention: '完全不在输出里的片段' },
    ]);
    const { status, output } = run_tool([
      '--root',
      root,
      '--ledger-dir',
      ledger,
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
    // 自报 2 条、实际 1 条：解析合并冲突时少收一条就是这个形状
    const ledger = write_ledger(root, [GOOD_ENTRY], 2);
    const low = run_tool([
      '--root',
      root,
      '--ledger-dir',
      ledger,
      '--asar',
      'none',
      '--skip-baseline',
      '0',
    ]);
    assert.notEqual(
      low.status,
      0,
      '实际少于自报必须非 0——搬家丢条目要有东西当场红',
    );
    assert.ok(
      low.output.includes('fx.mjs') &&
        low.output.includes('实际 1 条') &&
        low.output.includes('自报 COUNT 2') &&
        low.output.includes('少了 1 条'),
      `报错要点名分片与两个数，少一个就不知道该改哪份文件：\n${low.output}`,
    );

    const grown = write_ledger(
      root,
      [GOOD_ENTRY, { ...GOOD_ENTRY, desc: 'T2' }],
      1,
    );
    const high = run_tool([
      '--root',
      root,
      '--ledger-dir',
      grown,
      '--asar',
      'none',
      '--skip-baseline',
      '0',
    ]);
    assert.notEqual(high.status, 0, '实际多于自报必须非 0——增长须同步抬 COUNT');
    assert.ok(
      high.output.includes('多出 1 条'),
      `增长方向也要报出差额：\n${high.output}`,
    );

    const dup = write_ledger(root, [
      GOOD_ENTRY,
      { ...GOOD_ENTRY, find: 'zzz' },
    ]);
    const rd = run_tool([
      '--root',
      root,
      '--ledger-dir',
      dup,
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

test('must_mention 出处门（#442）：出处在 tests:/file:/era-fixture.js 里都找不到 → 退出码 1', () => {
  // 自证（issue #442 验收要求）：合成一条 must_mention 与它声明的出处
  // （tests: calc、file: lib/calc.js）毫无关系的条目——calc.test.js/
  // calc.js 都不含这段文字，夹具根也没有 era-fixture.js。门 5 必须报错，
  // 且退出码非 0；关掉/短路这道门时（M9519 一类变异）它必须重新变绿，
  // 证明「关了它就查不出这类脱节」。
  const root = make_fixture();
  try {
    const ledger = write_ledger(root, [
      { ...GOOD_ENTRY, must_mention: '这段文字在 calc 的测试与源码里都不存在' },
    ]);
    const { status, output } = run_tool([
      '--root',
      root,
      '--ledger-dir',
      ledger,
      '--verify',
    ]);
    assert.notEqual(
      status,
      0,
      `must_mention 找不到出处必须非 0，实际退出 ${status}：\n${output}`,
    );
    assert.ok(
      output.includes('都找不到'),
      `应报出「出处都找不到」：\n${output}`,
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
      // must_mention 覆盖成 gated.test.js 里的测试名（门 5，#442 静态出处
      // 要求）——这条测试恒为 skip: true，failed_as_expected 恒 false，
      // 换哪个字符串都不改变跳过分类的判定。
      {
        ...GOOD_ENTRY,
        tests: ['gated'],
        engine: true,
        must_mention: '依赖引擎的用例',
      },
    ]);
    const args = ['--root', root, '--ledger-dir', ledger];
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
      { ...GOOD_ENTRY, tests: ['gated'], must_mention: '依赖引擎的用例' },
    ]);
    const stale = run_tool([
      '--root',
      root,
      '--ledger-dir',
      undeclared,
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
        must_mention: '依赖引擎的用例', // 门 5（#442）静态出处要求，见 gated.test.js
      },
    ]);
    const { status, output } = run_tool([
      '--root',
      root,
      '--ledger-dir',
      ledger,
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
        must_mention: '依赖引擎的用例', // 门 5（#442）静态出处要求，见 gated.test.js
      },
    ]);
    const { status, output } = run_tool([
      '--root',
      root,
      '--ledger-dir',
      ledger,
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

// —— #304：并行模式的输出与计数 ——

test('并行汇总不吞子进程的计数：一片全拦 + 一片判红 → caught 与 red 都如实累加', () => {
  // 旧写法在子进程退出码非 0 时改记「红 +1」并**丢掉整份 caught**——一个
  // 子进程发现一条红，父进程的拦截数就少掉它那一整片。判红的子进程自己
  // 已经把结果报告过了，照它的 SUMMARY 汇总即可。
  const root = make_fixture();
  try {
    // 门 5（#442）只按静态出处核对 must_mention，不管运行期输出——这条
    // 注释满足门 5 的静态定位，不会被执行到，不影响 T9 要验证的行为：
    // 这句话确实不出现在任何失败输出里，因此判红（失配）。
    fs.appendFileSync(
      path.join(root, 'test', 'calc.test.js'),
      '// 这句话不会出现在任何失败输出里（must_mention 静态定位占位注释）\n',
      'utf8',
    );
    // 并行模式假定副本就是一份完整仓库：子进程以 cwd=副本 跑
    // <副本>/tools/mutation-check.mjs，条目表取默认的 <副本>/tools/mutations。
    // 所以夹具根要摆成同一形状，工具本体也得拷进去。
    fs.mkdirSync(path.join(root, 'tools', 'mutations'), { recursive: true });
    for (const f of ['mutation-check.mjs', 'load-mutations.mjs']) {
      fs.copyFileSync(
        path.join(REPO_ROOT, 'tools', f),
        path.join(root, 'tools', f),
      );
    }
    // 两条条目：一条能被拦下，一条 must_mention 对不上 → 判红（失配）。
    // --slice 按 sha1(desc) % k 分片，两条 desc 不同即可落到两片或同片，
    // 无论怎么分，父进程的汇总都必须是 caught=1 / red=1。
    const entries = [
      { ...GOOD_ENTRY, desc: 'T8 加倍系数改坏（应被拦下）' },
      {
        ...GOOD_ENTRY,
        desc: 'T9 锚对不上（应判红：失配）',
        must_mention: '这句话不会出现在任何失败输出里',
      },
    ];
    fs.writeFileSync(
      path.join(root, 'tools', 'mutations', 'fx.mjs'),
      `export const COUNT = ${entries.length};\n` +
        'export default ' +
        JSON.stringify(entries) +
        ';\n',
      'utf8',
    );
    const { status, output } = run_tool([
      '--root',
      root,
      '--ledger-dir',
      path.join(root, 'tools', 'mutations'),
      '--jobs',
      '2',
      '--asar',
      'none',
    ]);
    assert.equal(status, 1, `有一条判红，整体应退 1：\n${output}`);
    // 父进程会把每个子进程的输出原样转发，其中就有子进程自己的 SUMMARY
    // 行——所以只能取**最后一条**，那才是父进程的汇总。首版没取最后一条，
    // 证伪探针（把汇总逻辑改回旧写法）当场不红，等于白写。
    const summaries = [
      ...output.matchAll(/^SUMMARY caught=(\d+) skipped=(\d+) red=(\d+)$/gm),
    ];
    assert.ok(summaries.length >= 1, `没有 SUMMARY 行：\n${output}`);
    const last = summaries[summaries.length - 1];
    assert.deepEqual(
      { caught: Number(last[1]), red: Number(last[3]) },
      { caught: 1, red: 1 },
      `父进程应如实累加两片的计数（旧写法会得到 caught=0 red=1）：\n${output}`,
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('报告路径不许用 process.exit：管道上它会丢弃排队的 stdout（#304）', () => {
  // 实测：写 836038 字节后立即 process.exit(1)，管道对端只收到 65536 字节
  // （管道缓冲区大小），末行截断在半个字符上、SUMMARY 行整个没了——CI 上
  // 「并行模式神秘崩溃」三次都是这个，而本机重定向到文件时 stdout 是同步
  // 写、一个字节不丢，所以本机永远复现不出来。
  // 只有 SIGINT 处理器可以用 process.exit（中断时先还原靶文件要紧）。
  const src = fs.readFileSync(
    path.join(REPO_ROOT, 'tools', 'mutation-check.mjs'),
    'utf8',
  );
  const calls = src
    .split('\n')
    .map((line, i) => [i + 1, line])
    .filter(([, line]) => /process\.exit\(/.test(line));
  const outside_sigint = calls.filter(([, line]) => !/exit\(130\)/.test(line));
  assert.deepEqual(
    outside_sigint.map(([n, line]) => `:${n} ${line.trim()}`),
    [],
    '报告路径要用 process.exitCode 让事件循环自然退出，exit() 会截断管道输出',
  );
});

test('--ids 只跑点名的编号：区间与单号取并集，其余条目不跑', () => {
  const root = make_fixture();
  try {
    const ledger = write_ledger(root, [
      { ...GOOD_ENTRY, desc: 'M9001 加倍系数改坏（点名内）' },
      { ...GOOD_ENTRY, desc: 'M9002 加倍系数改坏（点名内，区间端点）' },
      // 点名之外的第三条：本身完全合法（跑起来也会被拦下），所以
      // 「跑没跑它」只能从计数看——跑了就是 3，没跑才是 2。
      {
        ...GOOD_ENTRY,
        desc: 'M9003 导出被拆（点名外）',
        find: 'module.exports = { double };',
        replace: 'const unused = { double };',
      },
    ]);
    const { status, output } = run_tool([
      '--root',
      root,
      '--ledger-dir',
      ledger,
      '--asar',
      'none',
      '--skip-baseline',
      '0',
      '--ids',
      'M9001,M9002',
    ]);
    assert.equal(
      status,
      0,
      `点名的两条应全拦，实际退出 ${status}：\n${output}`,
    );
    assert.match(
      output,
      /拦截 2 \//,
      '--ids 必须只跑点名的两条：三条都跑会是「拦截 3」',
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('--ids 点名的编号不存在时当场报错退 1，不静默跑 0 条', () => {
  const root = make_fixture();
  try {
    const ledger = write_ledger(root, [
      { ...GOOD_ENTRY, desc: 'M9001 加倍系数改坏' },
    ]);
    const { status, output } = run_tool([
      '--root',
      root,
      '--ledger-dir',
      ledger,
      '--asar',
      'none',
      '--skip-baseline',
      '0',
      '--ids',
      'M9001,M9404',
    ]);
    assert.equal(status, 1, `编号不存在必须退 1，实际 ${status}：\n${output}`);
    assert.match(
      output,
      /M9404/,
      '报错必须点名那个不存在的编号，否则查不出是编号写错还是条目没加',
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('--files 接受 Windows 反斜杠路径', () => {
  const root = make_fixture();
  try {
    const ledger = write_ledger(root, [GOOD_ENTRY]);
    const { status, output } = run_tool([
      '--root',
      root,
      '--ledger-dir',
      ledger,
      '--asar',
      'none',
      '--skip-baseline',
      '0',
      '--files',
      'lib\\calc.js',
    ]);
    assert.equal(status, 0, `反斜杠路径应命中条目：\n${output}`);
    assert.match(output, /拦截 1 \/ 跳过 0 \/ 红 0/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('--files 显式给出的文件零匹配时退 1，不把空跑报告成全拦截', () => {
  const root = make_fixture();
  try {
    const ledger = write_ledger(root, [GOOD_ENTRY]);
    const { status, output } = run_tool([
      '--root',
      root,
      '--ledger-dir',
      ledger,
      '--asar',
      'none',
      '--skip-baseline',
      '0',
      '--files',
      'lib/missing.js',
    ]);
    assert.equal(status, 1, `零匹配必须退 1：\n${output}`);
    assert.match(output, /--files 没有命中任何变异条目.*lib\/missing\.js/);
    assert.doesNotMatch(output, /全部变异被测试拦截/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('--ids 是子集档：不带 --skip-baseline 也不核对 ENGINE_SKIP_BASELINE', () => {
  const root = make_fixture();
  try {
    const ledger = write_ledger(root, [
      { ...GOOD_ENTRY, desc: 'M9001 加倍系数改坏' },
    ]);
    // 故意不给 --skip-baseline：子集档没有期望跳过数，is_partial 必须认出
    // --ids，否则无引擎处会拿 0 去比 ENGINE_SKIP_BASELINE 而假红（#256 的
    // 「新的子集档位必须加进 is_partial」）。
    const { status, output } = run_tool([
      '--root',
      root,
      '--ledger-dir',
      ledger,
      '--asar',
      'none',
      '--ids',
      'M9001',
    ]);
    assert.equal(
      status,
      0,
      `--ids 是子集档，不该核对跳过基线，实际退出 ${status}：\n${output}`,
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

/**
 * 「只跑 must_mention 点名的用例」的判别式（#242）：夹具里放一个**留痕**的
 * 旁支用例——它一跑就往夹具根写 ran-other，从工具外侧看得见整份文件跑没跑。
 * 不这么做就只能看耗时，那是块表不是断言。
 */
function make_two_test_fixture() {
  const root = make_fixture();
  fs.writeFileSync(
    path.join(root, 'test', 'calc.test.js'),
    [
      "const { test } = require('node:test');",
      "const assert = require('node:assert/strict');",
      "const fs = require('node:fs');",
      "const path = require('node:path');",
      "const { double } = require('../lib/calc');",
      "test('加倍', () => {",
      "  assert.equal(double(21), 42, '加倍系数必须是 2');",
      '});',
      "test('旁支：与本次变异无关，跑了就留痕', () => {",
      "  fs.writeFileSync(path.join(__dirname, '..', 'ran-other'), '1');",
      '});',
      '',
    ].join('\n'),
    'utf8',
  );
  return root;
}

test('must_mention 等于测试名时只跑那一个用例：同文件的旁支用例不跑', () => {
  const root = make_two_test_fixture();
  try {
    const ledger = write_ledger(root, [GOOD_ENTRY]);
    const { status, output } = run_tool([
      '--root',
      root,
      '--ledger-dir',
      ledger,
      '--asar',
      'none',
      '--skip-baseline',
      '0',
    ]);
    assert.equal(status, 0, `变异应被拦下，实际退出 ${status}：\n${output}`);
    assert.equal(
      fs.existsSync(path.join(root, 'ran-other')),
      false,
      '过滤跑已经红了就该收手；旁支用例留了痕，说明整份文件仍在跑（口上票里这是每条几秒的代价）',
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('must_mention 不是测试名时落回整份文件：判定不变，仍拦得下', () => {
  const root = make_two_test_fixture();
  try {
    // 断言消息而非测试名：过滤模式一条也匹配不上，node --test 退 0，
    // 工具必须据此重跑全文——最坏等于过滤之前的行为，不许变成漏判。
    const ledger = write_ledger(root, [
      { ...GOOD_ENTRY, must_mention: '加倍系数必须是 2' },
    ]);
    const { status, output } = run_tool([
      '--root',
      root,
      '--ledger-dir',
      ledger,
      '--asar',
      'none',
      '--skip-baseline',
      '0',
    ]);
    assert.equal(
      status,
      0,
      `落回全文后仍应拦下，实际退出 ${status}：\n${output}`,
    );
    assert.equal(
      fs.existsSync(path.join(root, 'ran-other')),
      true,
      '匹配不上就必须重跑整份文件，否则这条变异会被判成漏网',
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('test_name 是 must_mention 不是测试名时的逃生口：仍只跑那一个用例', () => {
  const root = make_two_test_fixture();
  try {
    // must_mention 取断言消息（表驱动条目的常态：档位号是运行期拼进去的，
    // 源码里没有这个字面量）；test_name 指出它所在的用例。
    const ledger = write_ledger(root, [
      { ...GOOD_ENTRY, must_mention: '加倍系数必须是 2', test_name: '加倍' },
    ]);
    const { status, output } = run_tool([
      '--root',
      root,
      '--ledger-dir',
      ledger,
      '--asar',
      'none',
      '--skip-baseline',
      '0',
    ]);
    assert.equal(status, 0, `变异应被拦下，实际退出 ${status}：\n${output}`);
    assert.equal(
      fs.existsSync(path.join(root, 'ran-other')),
      false,
      'test_name 点名了用例就该只跑它；旁支用例留了痕，说明逃生口没接上',
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

/**
 * 中断可达（#321）：串行档整段是 spawnSync，循环不转就没人派发 SIGINT，
 * 那个「中断时先把靶文件还原」的处理器因此永远到不了——而并行档用隔离
 * 副本、不碰主工作树，处理器唯一需要生效的场合正是它到不了的那个。
 * 实测形态：kill -INT 之后 21 秒仍在跑，靶文件停在变异态。
 */
test('SIGINT 能中断串行档，并把靶文件还原', async () => {
  const root = make_fixture();
  try {
    // 让每条变异都慢下来，信号才有机会落在两条之间
    fs.writeFileSync(
      path.join(root, 'test', 'calc.test.js'),
      [
        "const { test } = require('node:test');",
        "const assert = require('node:assert/strict');",
        "const { double } = require('../lib/calc');",
        "test('加倍', () => {",
        '  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 400);',
        '  assert.equal(double(21), 42);',
        '});',
        '',
      ].join('\n'),
      'utf8',
    );
    const ledger = write_ledger(root, [
      { ...GOOD_ENTRY, desc: 'M1 加倍系数改坏' },
      { ...GOOD_ENTRY, desc: 'M2 加倍系数改坏' },
      { ...GOOD_ENTRY, desc: 'M3 加倍系数改坏' },
      { ...GOOD_ENTRY, desc: 'M4 加倍系数改坏' },
    ]);
    const original = fs.readFileSync(path.join(root, 'lib', 'calc.js'), 'utf8');
    const child = spawn(
      process.execPath,
      [
        // Windows child.kill('SIGINT') 是强制终止，不会触发 JS 处理器。
        // 用 IPC 在子进程内触发同一处理器；POSIX 仍验证真实信号投递。
        '--import',
        'data:text/javascript,' +
          encodeURIComponent(
            "process.on('message', () => process.emit('SIGINT'));",
          ),
        TOOL,
        '--root',
        root,
        '--ledger-dir',
        ledger,
        '--asar',
        'none',
        '--skip-baseline',
        '0',
      ],
      { cwd: REPO_ROOT, stdio: ['ignore', 'pipe', 'pipe', 'ipc'] },
    );
    let output = '';
    const status = await new Promise((resolve) => {
      child.on('exit', (code, signal) => resolve(code ?? signal));
      // 等第一条变异已执行才请求中断，避免机器启动速度决定信号落点。
      let requested = false;
      child.stdout.on('data', (chunk) => {
        output += chunk;
        if (requested || !output.includes('红=true')) return;
        requested = true;
        if (process.platform === 'win32') child.send('interrupt');
        else child.kill('SIGINT');
      });
      child.stderr.resume();
    });
    assert.equal(
      status,
      130,
      `SIGINT 必须被处理器接住并退 130，实际 ${status}——串行档的循环不让出事件循环时，信号会一直排队到跑完`,
    );
    assert.ok(
      !output.includes('SUMMARY'),
      '中断必须发生在全轮变异完成之前，否则信号会一直排队到跑完',
    );
    assert.equal(
      fs.readFileSync(path.join(root, 'lib', 'calc.js'), 'utf8'),
      original,
      '中断时靶文件必须已还原：还原不了就得手工 git checkout，而那一行变异看着像手改',
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

// —— #532：--verify 不碰工作区 + 残留态启动自检 ——

/** 递归快照（相对路径 → 内容）：断言「工作区被碰过没有」用它，不看 mtime。 */
function snapshot_tree(root) {
  const files = new Map();
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else {
        files.set(
          path.relative(root, full).replaceAll('\\', '/'),
          fs.readFileSync(full, 'utf8'),
        );
      }
    }
  };
  walk(root);
  return files;
}

/**
 * git 夹具仓库：启动自检要读 HEAD 才有东西可比。临时目录里的普通夹具不是
 * git 仓库，自检在那里一律跳过（并行副本同款——COPY_DENY 把 .git 排除在
 * 副本外）。
 *
 * `-c` 覆盖逐条写给需要的地方：全局 config 里的 user/签名/换行转换都不能
 * 影响夹具的确定性（CI 与各人本机的 git 配置不同）。子进程调用一律带
 * timeout（test/child-process-timeout-check.test.js 守着：#449 那次挂死
 * 就是一处裸 spawnSync 卡住了整份测试文件的退出）。
 */
function make_git_fixture() {
  const root = make_fixture();
  const git = (...args) =>
    spawnSync(
      'git',
      [
        '-c',
        'user.email=fixture@example.com',
        '-c',
        'user.name=fixture',
        '-c',
        'commit.gpgsign=false',
        '-c',
        'core.autocrlf=false',
        ...args,
      ],
      {
        cwd: root,
        encoding: 'utf8',
        timeout: 30_000,
        killSignal: 'SIGKILL',
      },
    );
  for (const a of [
    ['init', '-q'],
    ['add', '-A'],
    ['commit', '-q', '-m', 'init'],
  ]) {
    const r = git(...a);
    assert.equal(r.status, 0, `夹具仓库 ${a.join(' ')} 失败：${r.stderr}`);
  }
  return root;
}

/** 夹具自己的变异态：目标文件恰好是「HEAD 内容应用了这条变异」的结果 */
const MUTATED_CALC_JS = CALC_JS.replace('n * 2', 'n * 3');

test('--verify 全程只读：靶文件置为只读照样报绿，且不进入执行阶段（#532）', () => {
  // 「写了再还原」是 #513 认定 `--verify` 会脏工作区的那种形态。内容比对
  // 区分不出它，只读属性可以：Windows 上 writeFileSync 撞 EPERM、Linux 上
  // EACCES，工具若在 --verify 路径里加了一次写，这条当场红。
  // 旁支用例留痕（make_two_test_fixture）是第二重：跑了测试就会写出
  // ran-other，证明 --verify 没有落进执行阶段。
  const root = make_two_test_fixture();
  const target = path.join(root, 'lib', 'calc.js');
  try {
    const ledger = write_ledger(root, [GOOD_ENTRY]);
    const before = snapshot_tree(root);
    fs.chmodSync(target, 0o444);
    const { status, output } = run_tool([
      '--root',
      root,
      '--ledger-dir',
      ledger,
      '--verify',
    ]);
    assert.equal(
      status,
      0,
      `--verify 应全绿（工作区只读不该影响结构校验），实际退出 ${status}：\n${output}`,
    );
    assert.ok(
      output.includes('五项检查全过'),
      `应报告五项检查全过：\n${output}`,
    );
    assert.doesNotMatch(
      output,
      /SUMMARY caught=/,
      `--verify 不得进入执行阶段（跑出 SUMMARY 就是真跑了变异）：\n${output}`,
    );
    assert.equal(
      fs.existsSync(path.join(root, 'ran-other')),
      false,
      '--verify 不许跑任何测试：旁支用例留了痕',
    );
    assert.deepEqual(
      [...snapshot_tree(root)],
      [...before],
      '--verify 全程不许改工作区里的任何一个字节',
    );
  } finally {
    fs.chmodSync(target, 0o666);
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('门失败时 --verify 也只读：报错退出 1，残留态原样留着不自动修（#532）', () => {
  // 门失败最要紧的形态是「靶文件已经是变异态」：门 2（find 恰 1 次）会报
  // 出来，但工具只负责报，不负责还原——工单的方向是「不要把工作区搞脏」
  // 和「脏了立刻发现」，不是「脏了之后自动修」。
  const root = make_fixture();
  try {
    const ledger = write_ledger(root, [GOOD_ENTRY]);
    fs.writeFileSync(
      path.join(root, 'lib', 'calc.js'),
      MUTATED_CALC_JS, // 手工造残留：等价于上次变异被强杀
      'utf8',
    );
    const before = snapshot_tree(root);
    const { status, output } = run_tool([
      '--root',
      root,
      '--ledger-dir',
      ledger,
      '--verify',
    ]);
    assert.equal(
      status,
      1,
      `残留态下 --verify 必须报错，实际 ${status}：\n${output}`,
    );
    assert.ok(output.includes('结构校验未过'), `应报结构校验未过：\n${output}`);
    assert.deepEqual(
      [...snapshot_tree(root)],
      [...before],
      '门失败时也不许碰工作区：不写、也不代为还原',
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('启动自检：靶文件停在变异态就拒绝启动，点名 M 编号并给出还原命令（#532）', () => {
  // #513 的 M11069 就是这么留下的：超时截断时 taskkill 杀进程树，finally
  // 不执行；而拆掉上界核对的残留形态（还有 38 条 replace 含 find 的条目
  // 同款）对全绿真树没有输出影响，肉眼与 CI 都看不出来，实施者因而误把
  // 变异态提交过一次（66bc345）。门 2 也兜不住那一类（残留后 find 照样
  // 恰 1 次），它那句「find 出现 0 次」还会把人引向改 find 串。
  const root = make_git_fixture();
  const target = path.join(root, 'lib', 'calc.js');
  try {
    const ledger = write_ledger(root, [
      { ...GOOD_ENTRY, desc: 'M9001 加倍系数改坏（n*2 → n*3）' },
    ]);
    fs.writeFileSync(target, MUTATED_CALC_JS, 'utf8');
    const { status, output } = run_tool([
      '--root',
      root,
      '--ledger-dir',
      ledger,
      '--asar',
      'none',
      '--skip-baseline',
      '0',
      '--ids',
      'M9001',
    ]);
    assert.equal(
      status,
      1,
      `残留态必须拒绝启动，实际退出 ${status}：\n${output}`,
    );
    assert.ok(
      output.includes('启动自检') && output.includes('的变异态'),
      `应点名启动自检与「停在某条的变异态」：\n${output}`,
    );
    // 断言的是**点名**（停在 M9001 的变异态），不是 desc 里出现过 M9001——
    // 报告的第二行本来就印 desc，拿 output.includes('M9001') 会恒真
    // （M11246 实测正是这样漏过去的：编号被焊死成「某条」也照样命中）。
    assert.ok(
      output.includes('停在 M9001 的变异态'),
      `必须点名是哪一条的变异态，否则不知道该还原成什么：\n${output}`,
    );
    assert.ok(
      output.includes('git checkout HEAD -- lib/calc.js'),
      `必须打印可直接照抄的还原命令：\n${output}`,
    );
    assert.doesNotMatch(
      output,
      /SUMMARY caught=/,
      `残留态下不得继续跑（后续结果全部不可信）：\n${output}`,
    );
    assert.equal(
      fs.readFileSync(target, 'utf8'),
      MUTATED_CALC_JS,
      '自检只报不修：还原由人决定，工具不擅自 git checkout',
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('启动自检零误报：靶文件有未提交的合法改动时照常执行（#532）', () => {
  // 开发常态：正在改某个靶文件，同票又给它加变异条目（#530 改
  // chara-make.js 就是这么跑的）。自检的判据是「工作树 === HEAD 内容应用
  // 某条变异」这一恒等形态，不是「和 HEAD 不一致」——后者会把开发流程整个
  // 卡死，也会让并行副本、临时夹具全部跑不起来。
  const root = make_git_fixture();
  try {
    const ledger = write_ledger(root, [
      { ...GOOD_ENTRY, desc: 'M9001 加倍系数改坏（n*2 → n*3）' },
    ]);
    fs.writeFileSync(
      path.join(root, 'lib', 'calc.js'),
      CALC_JS.replace(
        'const double',
        '// 未提交的合法改动：正在改这个靶文件\nconst double',
      ),
      'utf8',
    );
    const { status, output } = run_tool([
      '--root',
      root,
      '--ledger-dir',
      ledger,
      '--asar',
      'none',
      '--skip-baseline',
      '0',
      '--ids',
      'M9001',
    ]);
    assert.equal(
      status,
      0,
      `合法改动不该被当成残留拦下，实际退出 ${status}：\n${output}`,
    );
    assert.match(
      output,
      /拦截 1 \/ 跳过 0 \/ 红 0/,
      `应照常执行并拦截：\n${output}`,
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('启动自检覆盖 --verify 档：残留态下不许给出「结构校验全绿」的假结论（#532）', () => {
  // --verify 读的也是工作区里的靶文件。残留态下它的「五项检查全过」是个假
  // 结论——比不报更坏，因为 --verify 是最高频的入口（npm test 里就有一条），
  // 绿了就等于告诉所有人工作区没问题。自检因此排在门之前、所有档位都查。
  const root = make_git_fixture();
  try {
    const ledger = write_ledger(root, [
      { ...GOOD_ENTRY, desc: 'M9001 加倍系数改坏（n*2 → n*3）' },
    ]);
    fs.writeFileSync(
      path.join(root, 'lib', 'calc.js'),
      MUTATED_CALC_JS,
      'utf8',
    );
    const { status, output } = run_tool([
      '--root',
      root,
      '--ledger-dir',
      ledger,
      '--verify',
    ]);
    assert.equal(
      status,
      1,
      `残留态下 --verify 必须拒绝，实际退出 ${status}：\n${output}`,
    );
    assert.ok(
      output.includes('启动自检') && output.includes('停在 M9001 的变异态'),
      `--verify 档也要走自检并点名 M 编号：\n${output}`,
    );
    assert.doesNotMatch(
      output,
      /五项检查全过/,
      `残留态下不得报「五项检查全过」：\n${output}`,
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('启动自检的退化形态一：靶文件只进了索引、HEAD 里还没有它 → 跳过该文件，工具照常跑（#532）', () => {
  // git show HEAD:<file> 取不到内容时必须跳过（否则 null.split 当场崩），
  // 而这类文件确实会出现在 `git diff --name-only HEAD` 里（git add 之后
  // 未提交）。属门前的鲁棒分支，不跳就是工具直接抛栈。
  const root = make_git_fixture();
  try {
    fs.writeFileSync(
      path.join(root, 'lib', 'new.js'),
      'const triple = (n) => n * 3;\nmodule.exports = { triple };\n',
      'utf8',
    );
    fs.writeFileSync(
      path.join(root, 'test', 'new.test.js'),
      [
        "const { test } = require('node:test');",
        "const assert = require('node:assert/strict');",
        "const { triple } = require('../lib/new');",
        "test('三倍', () => {",
        '  assert.equal(triple(21), 63);',
        '});',
        '',
      ].join('\n'),
      'utf8',
    );
    const git = spawnSync('git', ['add', 'lib/new.js', 'test/new.test.js'], {
      cwd: root,
      encoding: 'utf8',
      timeout: 30_000,
      killSignal: 'SIGKILL',
    });
    assert.equal(git.status, 0, `夹具 git add 失败：${git.stderr}`);
    const ledger = write_ledger(root, [
      {
        ...GOOD_ENTRY,
        desc: 'M9001 新靶文件的三倍系数改坏',
        file: 'lib/new.js',
        find: 'n * 3',
        replace: 'n * 4',
        tests: ['new'],
        must_mention: '三倍',
      },
    ]);
    const { status, output } = run_tool([
      '--root',
      root,
      '--ledger-dir',
      ledger,
      '--asar',
      'none',
      '--skip-baseline',
      '0',
      '--ids',
      'M9001',
    ]);
    assert.equal(
      status,
      0,
      `HEAD 里没有该文件时自检必须跳过而不是崩，实际退出 ${status}：\n${output}`,
    );
    assert.match(output, /拦截 1 \/ 跳过 0 \/ 红 0/, `应照常执行：\n${output}`);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('启动自检的退化形态二：旧条目 desc 没有 M 编号 → 报「某条」而不是「Mnull」（#532）', () => {
  // #113 遗留的 4 条老条目 desc 没有 M 编号（extract_m_number 返回 null）。
  // 还原命令仍然照给，否则这四条一旦残留就只能自己猜该退什么。
  // 不带 --ids：这条 desc 取不出编号，点名档会先报「编号不存在」。
  const root = make_git_fixture();
  try {
    const ledger = write_ledger(root, [
      { ...GOOD_ENTRY, desc: 'T1 加倍系数改坏（无 M 编号的老条目形态）' },
    ]);
    fs.writeFileSync(
      path.join(root, 'lib', 'calc.js'),
      MUTATED_CALC_JS,
      'utf8',
    );
    const { status, output } = run_tool([
      '--root',
      root,
      '--ledger-dir',
      ledger,
      '--asar',
      'none',
      '--skip-baseline',
      '0',
    ]);
    assert.equal(status, 1, `残留态必须拒绝，实际 ${status}：\n${output}`);
    assert.ok(
      output.includes('停在 某条 的变异态'),
      `无 M 编号的老条目应报「某条」：\n${output}`,
    );
    assert.ok(
      output.includes('git checkout HEAD -- lib/calc.js'),
      `无 M 编号也要给还原命令：\n${output}`,
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('启动自检认得 replace 里的 $ 转义：整串判定不许换成便宜的近似（#532）', () => {
  // String.replace 会展开 replace 里的 $$/$&/$'/$`（1246 条条目的 find、
  // 1056 条条目的 replace 里带 $），所以「写下去的那串字节」不等于条目表里
  // 的字面 replace。判据必须与 run_one 共用同一份实现（apply_mutation）；
  // 换成「长度差对得上就算残留」这类便宜的近似，这些条目就漏判了——而
  // 1.2 MB × 961 条那种最坏形态下正有人想这么省（见 detect_residue 头注）。
  const root = make_git_fixture();
  try {
    // 条目表里的 replace 是 `n * 2 + $$100`，实际写下去的是 `n * 2 + $100`
    const ledger = write_ledger(root, [
      {
        ...GOOD_ENTRY,
        desc: 'M9001 报价系数改坏（replace 带 $$ 转义）',
        replace: 'n * 2 + $$100',
      },
    ]);
    fs.writeFileSync(
      path.join(root, 'lib', 'calc.js'),
      'const double = (n) => n * 2 + $100;\nmodule.exports = { double };\n',
      'utf8',
    );
    const { status, output } = run_tool([
      '--root',
      root,
      '--ledger-dir',
      ledger,
      '--asar',
      'none',
      '--skip-baseline',
      '0',
      '--ids',
      'M9001',
    ]);
    assert.equal(
      status,
      1,
      `带 $ 转义的残留也必须被认出来（近似判定会漏掉它），实际退出 ${status}：\n${output}`,
    );
    assert.ok(
      output.includes('停在 M9001 的变异态'),
      `应点名 M9001：\n${output}`,
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
