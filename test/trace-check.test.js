/**
 * @file trace-check 的行为锁（issue #63）：工具不只「表内一致」，还要
 * 「表外即红」——三条行为在此钉死：
 *
 *   1. 全绿运行：tools/trace-check.mjs 退出码 0（锚校验 + 两侧扫描完整性
 *      + 豁免对账全过）。本用例把工具并入 npm test——锚表烂掉、完整性
 *      失守、豁免发霉，任一都会让三件套变红，不再依赖记得手动跑。
 *   2. 探针：往 ere/ 塞一个带未登记 `:N` 引用的模块，工具必须非 0 且
 *      点名探针文件与引用串——证明「新塞进 ere/ 的引用自动受锁」，
 *      而不是只在既有文件上凑绿（做法沿用 #46/#60 的探针先例，形状同
 *      test/output-lang-lock.test.js；探针放 ere/ 根，注释形态、无字符串
 *      字面量、无 era.get 寻址，避免与并行测试互踩）。
 *   3. 豁免清单只能变短：往 tools/trace-exempt.mjs 塞一条 #63 基线外的
 *      条目，工具必须非 0 且点名——规则在工具里执行、退出码生效（验收
 *      整改：此前这条只在测试里，台账 465→466 时单独跑工具的人看到的是
 *      绿）。本文件不持基线副本（数据只有台账与工具内嵌的冻结基线
 *      两份），只验行为：塞进基线外条目 → 红，还原 → 复绿。
 *
 * 工具是 CLI（import 即执行并 process.exit），故用 spawn 而非 require。
 */

'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const REPO_ROOT = path.resolve(__dirname, '..');
const TOOL = path.join(REPO_ROOT, 'tools', 'trace-check.mjs');
const PROBE = path.join(REPO_ROOT, 'ere', '__trace_probe__.js');

/** 跑一遍工具，返回 { status, output } */
function run_tool() {
  const r = spawnSync(process.execPath, [TOOL], {
    cwd: REPO_ROOT,
    encoding: 'utf8',
    maxBuffer: 16 * 1024 * 1024,
  });
  return { status: r.status, output: `${r.stdout || ''}${r.stderr || ''}` };
}

test('trace-check 全绿（锚校验 + 两侧扫描完整性 + 豁免对账，退出码 0）', () => {
  const { status, output } = run_tool();
  assert.equal(
    status,
    0,
    `trace-check 应全绿，实际退出 ${status}：\n${output}`,
  );
});

test('探针：往 ere/ 塞未登记引用的模块，trace-check 必须红且点名（自动纳入后来者）', () => {
  const cleanup = () => {
    if (fs.existsSync(PROBE)) {
      fs.unlinkSync(PROBE);
    }
  };
  cleanup(); // 上一次异常退出留下的残骸先清
  try {
    fs.writeFileSync(
      PROBE,
      [
        '// 探针模块（test/trace-check.test.js 写入，跑完即删）：',
        '// :999993 未登记的单值引用（#63 完整性锁的靶子）。',
        '// :999988-999990 未登记的区间引用（同上，区间形态）。',
        'module.exports = {};',
        '',
      ].join('\n'),
      'utf8',
    );
    const { status, output } = run_tool();
    assert.notEqual(
      status,
      0,
      '探针带着未登记引用在 ere/ 里，工具必须非 0——完整性门对后来者失明',
    );
    assert.ok(
      output.includes('__trace_probe__'),
      `探针文件未被点名：\n${output}`,
    );
    assert.ok(output.includes(':999993'), `单值引用未被点名：\n${output}`);
    assert.ok(
      output.includes(':999988-999990'),
      `区间引用未被点名：\n${output}`,
    );
  } finally {
    cleanup();
  }
  // 删净之后复绿（也证明探针真的进过扫描）
  const restored = run_tool();
  assert.equal(
    restored.status,
    0,
    `探针删了还红——文件系统或工具有一边不对：\n${restored.output}`,
  );
});

test('豁免清单只能变短：塞基线外条目进台账，工具必须红且点名', () => {
  const exempt_path = path.join(REPO_ROOT, 'tools', 'trace-exempt.mjs');
  const original = fs.readFileSync(exempt_path, 'utf8');
  // 探针条目选已登记引用 page-main-menu 的 :53：完整性门与发霉门都不
  // 会对它开口（引用在、且已登记），唯一会红的就是「不在 #63 基线内」。
  const anchor = "  'ere/system/train/train-loop.js': ['545'],";
  if (!original.includes(anchor)) {
    throw new Error('探针锚行不在 trace-exempt.mjs 里——台账结构变了？');
  }
  const probe_line = "  'ere/page/page-main-menu.js': ['53'],";
  try {
    fs.writeFileSync(
      exempt_path,
      original.replace(anchor, `${anchor}\n${probe_line}`),
      'utf8',
    );
    const { status, output } = run_tool();
    assert.notEqual(
      status,
      0,
      '台账长出基线外条目，工具必须非 0——「只能变短」不在退出码语义里',
    );
    assert.ok(
      output.includes('page-main-menu') && output.includes(':53'),
      `探针条目未被点名：\n${output}`,
    );
    assert.ok(
      output.includes('#63 基线'),
      `红的原因必须是基线失守，而不是别的门先开：\n${output}`,
    );
  } finally {
    fs.writeFileSync(exempt_path, original, 'utf8');
  }
  // 还原之后复绿（也证明探针真的改过台账）
  const restored = run_tool();
  assert.equal(
    restored.status,
    0,
    `台账还原后还红——文件系统或工具有一边不对：\n${restored.output}`,
  );
});
