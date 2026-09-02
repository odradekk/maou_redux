/**
 * @file skip-count-check 的行为锁（issue #92）：无引擎跳过数守护不只
 * 「数字对得上就绿」，还要「表外即红、输入烂即拒」——五条行为在此固定：
 *
 *   1. 全绿：TAP 跳过数与基线一致 → 退出 0，输出报出 数字/总数 与基线
 *      文件。这一条也锁定「看得见的数字」的输出形状（CI 日志靠它说话）。
 *   2. 偏多即红：跳过 39 vs 基线 38 → 退出 1（新增引擎依赖用例没记账）。
 *   3. 偏少即红：跳过 37 vs 基线 38 → 退出 1（用例被删或 skip 门失效）。
 *      验收要求的自证「让一个用例新增引擎依赖，确认有东西说话」在 CI
 *      侧的机制就是这两条；整机演示（真把一个用例改成引擎依赖跑一遍）
 *      见 issue #92 的实现评论。
 *   4. 缺摘要即拒：TAP 没有 `# skipped` 行 → 退出 2。node --test 异常
 *      退出时不产摘要，绝不能被当成「核对通过」放行。
 *   5. 烂基线即拒：基线文件非「注释/空行 + 恰好一行纯数字」→ 退出 2。
 *
 * 另有一条仓库健康锁：test/engine-skip-baseline.txt 本身必须解析出非负
 * 整数——基线烂在本地 npm test 就红，不用等 CI。
 *
 * 工具是 CLI（import 即执行并 process.exit），故用 spawn 而非 require
 * （做法沿用 test/trace-check.test.js）。夹具全部进临时目录，不碰仓库
 * 的真实基线文件。
 */

'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');

const REPO_ROOT = path.resolve(__dirname, '..');
const TOOL = path.join(REPO_ROOT, 'tools', 'skip-count-check.mjs');
const REAL_BASELINE = path.join(REPO_ROOT, 'test', 'engine-skip-baseline.txt');
const PRESENT_BASELINE = path.join(
  REPO_ROOT,
  'test',
  'engine-present-skip-baseline.txt',
);

/** 临时目录夹具：用完即删，测试之间互不污染（做法同 csv-to-yml.test.js） */
function with_temp_dir(run) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ere-skip-count-'));
  try {
    return run(dir);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

/** 造一份形状同真的最小 TAP（摘要行来自 node --test 实测格式） */
function make_tap(skipped, tests) {
  return [
    'TAP version 13',
    'ok 1 - a',
    'ok 2 - b # SKIP',
    `1..${tests}`,
    `# tests ${tests}`,
    '# suites 0',
    `# pass ${tests - skipped}`,
    '# fail 0',
    '# cancelled 0',
    `# skipped ${skipped}`,
    '# todo 0',
    '# duration_ms 1',
    '',
  ].join('\n');
}

/** 基线夹具：注释 + 空行 + 一行数字，形状与仓库真实基线一致 */
function make_baseline(dir, value) {
  const file = path.join(dir, 'baseline.txt');
  fs.writeFileSync(
    file,
    [
      '# 注释行：形状与 test/engine-skip-baseline.txt 一致',
      '',
      `${value}`,
      '',
    ].join('\n'),
    'utf8',
  );
  return file;
}

/** 跑一遍工具，返回 { status, output } */
function run_tool(tap_file, baseline_file) {
  const r = spawnSync(
    process.execPath,
    [TOOL, tap_file, '--baseline', baseline_file],
    { cwd: REPO_ROOT, encoding: 'utf8' },
  );
  return { status: r.status, output: `${r.stdout || ''}${r.stderr || ''}` };
}

test('全绿：跳过数与基线一致 → 退出 0，报出 数字/总数 与基线路径', () => {
  with_temp_dir((dir) => {
    const tap = path.join(dir, 'report.tap');
    fs.writeFileSync(tap, make_tap(38, 553), 'utf8');
    const baseline = make_baseline(dir, 38);
    const { status, output } = run_tool(tap, baseline);
    assert.equal(status, 0, `核对应通过，实际退出 ${status}：\n${output}`);
    assert.match(
      output,
      /38\/553（6\.9%）/,
      `数字/总数未按形状报出：\n${output}`,
    );
    assert.ok(output.includes('一致'), `未声明与基线一致：\n${output}`);
    assert.ok(output.includes('baseline.txt'), `未报出基线文件：\n${output}`);
  });
});

test('偏多即红：39 vs 基线 38 → 退出 1，两个数字与方向提示都在场', () => {
  with_temp_dir((dir) => {
    const tap = path.join(dir, 'report.tap');
    fs.writeFileSync(tap, make_tap(39, 554), 'utf8');
    const baseline = make_baseline(dir, 38);
    const { status, output } = run_tool(tap, baseline);
    assert.equal(status, 1, `偏多应核对失败，实际退出 ${status}：\n${output}`);
    assert.ok(
      output.includes('39') && output.includes('38'),
      `基线与实际两个数字未同时在场：\n${output}`,
    );
    assert.ok(output.includes('+1'), `未报出偏移量：\n${output}`);
    assert.ok(
      output.includes('引擎依赖') || output.includes('条件跳过'),
      `偏多方向未给提示：\n${output}`,
    );
  });
});

test('偏少即红：37 vs 基线 38 → 退出 1', () => {
  with_temp_dir((dir) => {
    const tap = path.join(dir, 'report.tap');
    fs.writeFileSync(tap, make_tap(37, 552), 'utf8');
    const baseline = make_baseline(dir, 38);
    const { status, output } = run_tool(tap, baseline);
    assert.equal(status, 1, `偏少应核对失败，实际退出 ${status}：\n${output}`);
    assert.ok(output.includes('-1'), `未报出偏移量：\n${output}`);
    assert.ok(
      output.includes('skip 门') || output.includes('被删'),
      `偏少方向未给提示：\n${output}`,
    );
  });
});

test('缺摘要即拒：TAP 没有 `# skipped` 行 → 退出 2（不许当核对通过）', () => {
  with_temp_dir((dir) => {
    const tap = path.join(dir, 'broken.tap');
    fs.writeFileSync(tap, 'TAP version 13\nok 1 - a\n1..1\n', 'utf8');
    const baseline = make_baseline(dir, 38);
    const { status, output } = run_tool(tap, baseline);
    assert.equal(
      status,
      2,
      `缺摘要应拒绝核对（退出 2），实际退出 ${status}：\n${output}`,
    );
    assert.ok(
      output.includes('# skipped') && output.includes('异常退出'),
      `未解释摘要缺失的原因：\n${output}`,
    );
  });
});

test('烂基线即拒：两个非注释数字行 → 退出 2', () => {
  with_temp_dir((dir) => {
    const tap = path.join(dir, 'report.tap');
    fs.writeFileSync(tap, make_tap(38, 553), 'utf8');
    const baseline = path.join(dir, 'bad-baseline.txt');
    fs.writeFileSync(baseline, '# 注释\n38\n三十九\n', 'utf8');
    const { status, output } = run_tool(tap, baseline);
    assert.equal(
      status,
      2,
      `烂基线应拒绝（退出 2），实际退出 ${status}：\n${output}`,
    );
    assert.ok(
      output.includes('恰好一行纯数字'),
      `未说明基线的期望形状：\n${output}`,
    );
  });
});

test('仓库基线健康：真实基线文件解析出非负整数（烂在本地，不等 CI）', () => {
  // 直接借工具的解析器（经 CLI 出口跑一遍，对真实基线 + 绿色 TAP）：
  // 基线文件本身烂时，这一条在本地 npm test 就红。
  with_temp_dir((dir) => {
    const tap = path.join(dir, 'report.tap');
    fs.writeFileSync(tap, make_tap(0, 0), 'utf8');
    const { status, output } = run_tool(tap, REAL_BASELINE);
    assert.notEqual(
      status,
      2,
      `仓库基线 test/engine-skip-baseline.txt 解析失败：\n${output}`,
    );
    assert.ok(
      output.includes('38') || output.includes('偏离'),
      `真实基线未参与核对：\n${output}`,
    );
  });
});

// —— #302：有引擎那一侧的基线与提示 ——

test('仓库基线健康：有引擎侧的基线只能是 0（改成别的数就是默许跳过）', () => {
  // 这份基线没有「有意识地改」的空间：引擎装上了还有东西被跳过，只可能是
  // 门控写错或 asar 没被 locate_asar 认出来。所以它锁的是具体值 0，不是
  // 「能解析」——与无引擎那侧（72，随覆盖面有意增减）待遇不同。
  with_temp_dir((dir) => {
    const tap = path.join(dir, 'report.tap');
    fs.writeFileSync(tap, make_tap(0, 3), 'utf8');
    const { status, output } = run_tool(tap, PRESENT_BASELINE);
    assert.notEqual(
      status,
      2,
      `test/engine-present-skip-baseline.txt 解析失败：\n${output}`,
    );
    assert.equal(
      status,
      0,
      `有引擎侧基线不是 0——跳过 0 的 TAP 竟然判红：\n${output}`,
    );
  });
});

test('跑错环境时给得出方向：基线 0 而实际有跳过，提示指向 asar 与门控', () => {
  with_temp_dir((dir) => {
    const tap = path.join(dir, 'report.tap');
    fs.writeFileSync(tap, make_tap(2, 3), 'utf8');
    const { status, output } = run_tool(tap, PRESENT_BASELINE);
    assert.equal(status, 1, `应判红：\n${output}`);
    assert.ok(
      output.includes('locate_asar'),
      `基线为 0 时应提示 asar 没被认出来这条最可能的原因：\n${output}`,
    );
  });
});
