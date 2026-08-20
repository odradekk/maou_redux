/**
 * @file domain-check 的行为锁（issue #72）：工具不只「台账对得上」，还要
 * 「表外即红」——六条行为在此钉死：
 *
 *   1. 全绿运行：tools/domain-check.mjs 退出码 0（跨域写全数在账 + 台账
 *      对账 + 基线对账 + 目录认领 + 包装层白名单门槛全过）。本用例把
 *      工具并入 npm test——所有权产物漂移、台账长草、基线失守，任一都
 *      会让三件套变红，不再依赖记得手动跑。
 *   2. 探针：往 ere/ 塞一个带未登记裸跨域写的模块，工具必须非 0、点名
 *      探针文件与寻址串、并给出门面整改指引（有访问器→改用；无→先补
 *      名）——证明「新塞进 ere/ 的跨域写自动受锁」，而不是只在既有文件
 *      上凑绿（做法沿用 #46/#60/#63 的探针先例）。
 *   3. 探针：包装层的排除是白名单不是目录逃生门——往 ere/facade/ 塞未
 *      登记 WRAPPER_FILES 的文件，工具必须红（目录未认领）。#66 验收
 *      教训：探针在 worktree 内做，扫描器读的就是这棵树。
 *   4. 台账只能变短（基线外新条目）：塞一条 #72 基线外的条目进台账，
 *      工具必须红且点名——规则在工具里执行、退出码生效（追溯校核器的
 *      整改教训：规则写在测试里而不在工具里，工具会声称自己在守却退出
 *      码为 0）。本文件不持基线副本（数据只有台账与工具内嵌的冻结基线
 *      两份），只验行为。
 *   5. 台账计数不得超基线：抬升既有条目计数，工具必须红且以基线名义
 *      点名——吸收新增欠账必须显式改 LEDGER_BASELINE，在版本库差异里
 *      看得见。
 *   6. 台账不许发霉：条目在代码里已不存在（访问被删或改写）也红。
 *
 * 探针条目选零计数/独立文案的靶子，各门的报错文案互不重叠——变异拆掉
 * 哪条门，对应用例就因「红或文案缺失」而失败（M900–M905）。
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
const TOOL = path.join(REPO_ROOT, 'tools', 'domain-check.mjs');
const LEDGER = path.join(REPO_ROOT, 'tools', 'domain-ledger.mjs');
const PROBE = path.join(REPO_ROOT, 'ere', '__domain_probe__.js');
const FACADE_PROBE = path.join(
  REPO_ROOT,
  'ere',
  'facade',
  '__domain_probe__.js',
);

/** 跑一遍工具，返回 { status, output } */
function run_tool() {
  const r = spawnSync(process.execPath, [TOOL], {
    cwd: REPO_ROOT,
    encoding: 'utf8',
    maxBuffer: 16 * 1024 * 1024,
  });
  return { status: r.status, output: `${r.stdout || ''}${r.stderr || ''}` };
}

/** 探针模块正文：一处 tflag:899（train 属主）的裸跨域写。注释不含 :数字（trace-check 的 ERB 完整性锁并行在扫 ere/） */
const PROBE_BODY = [
  '// 探针模块（test/domain-check.test.js 写入，跑完即删）：',
  '// 一处未登记的裸跨域写，域边界检查器的靶子。',
  'module.exports = {};',
  "era.set('tflag:899', 1);",
  '',
].join('\n');

test('domain-check 全绿（跨域写全数在账 + 台账与基线对账，退出码 0）', () => {
  const { status, output } = run_tool();
  assert.equal(
    status,
    0,
    `domain-check 应全绿，实际退出 ${status}：\n${output}`,
  );
  assert.ok(output.includes('跨域写'), `报告应包含判定统计：\n${output}`);
});

test('探针：往 ere/ 塞未登记跨域写的模块，domain-check 必须红且点名（新文件自动纳入）', () => {
  const cleanup = () => {
    if (fs.existsSync(PROBE)) {
      fs.unlinkSync(PROBE);
    }
  };
  cleanup(); // 上一次异常退出留下的残骸先清
  try {
    fs.writeFileSync(PROBE, PROBE_BODY, 'utf8');
    const { status, output } = run_tool();
    assert.notEqual(
      status,
      0,
      '探针带着未登记的裸跨域写在 ere/ 里，工具必须非 0——完整性门对后来者失明',
    );
    assert.ok(
      output.includes('__domain_probe__'),
      `探针文件未被点名：\n${output}`,
    );
    assert.ok(output.includes('tflag:899'), `寻址串未被点名：\n${output}`);
    assert.ok(
      output.includes('game.train.失神'),
      `整改指引应给出既有门面访问器：\n${output}`,
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

test('探针：包装层不是目录逃生门——往 ere/facade/ 塞未登记文件也红', () => {
  const cleanup = () => {
    if (fs.existsSync(FACADE_PROBE)) {
      fs.unlinkSync(FACADE_PROBE);
    }
  };
  cleanup();
  try {
    fs.writeFileSync(FACADE_PROBE, PROBE_BODY, 'utf8');
    const { status, output } = run_tool();
    assert.notEqual(
      status,
      0,
      '未登记 WRAPPER_FILES 的包装层文件必须非 0——白名单退化成目录口子',
    );
    assert.ok(
      output.includes('目录未认领'),
      `红的原因必须是目录未认领，而不是别的门先开：\n${output}`,
    );
    assert.ok(
      output.includes('WRAPPER_FILES'),
      `报错应指路 WRAPPER_FILES（显式登记，差异可见）：\n${output}`,
    );
  } finally {
    cleanup();
  }
  const restored = run_tool();
  assert.equal(
    restored.status,
    0,
    `探针删了还红——文件系统或工具有一边不对：\n${restored.output}`,
  );
});

test('台账只能变短：塞基线外新条目进台账，工具必须红且点名', () => {
  const original = fs.readFileSync(LEDGER, 'utf8');
  // 探针条目选零计数：不会触发发霉门（0 不大于代码实际 0），唯一会红的
  // 就是「不在 #72 基线内」——文案隔离，变异拆门时可被单独打死。
  const anchor = "  'ere/event/event-com.js': {\n    'tflag:100': 1,\n  },";
  if (!original.includes(anchor)) {
    throw new Error('探针锚行不在 domain-ledger.mjs 里——台账结构变了？');
  }
  const probe_block =
    "  'ere/event/event-com.js': {\n    'tflag:100': 1,\n    'flag:9': 0,\n  },";
  try {
    fs.writeFileSync(LEDGER, original.replace(anchor, probe_block), 'utf8');
    const { status, output } = run_tool();
    assert.notEqual(
      status,
      0,
      '台账长出基线外条目，工具必须非 0——「只能变短」不在退出码语义里',
    );
    assert.ok(
      output.includes('flag:9') && output.includes('不在 #72 基线内'),
      `探针条目未被以基线名义点名：\n${output}`,
    );
  } finally {
    fs.writeFileSync(LEDGER, original, 'utf8');
  }
  const restored = run_tool();
  assert.equal(
    restored.status,
    0,
    `台账还原后还红——文件系统或工具有一边不对：\n${restored.output}`,
  );
});

test('台账计数不得超基线：抬升既有条目计数，工具必须红且点名', () => {
  const original = fs.readFileSync(LEDGER, 'utf8');
  // 抬计数会同时触发发霉（计数大于代码实际），故断言盯「超 #72 基线」
  // 文案——证明基线这道门本身在退出码里，而不只是发霉门的影子。
  const anchor = "    'tflag:34': 2,";
  if (!original.includes(anchor)) {
    throw new Error('探针锚行不在 domain-ledger.mjs 里——台账结构变了？');
  }
  try {
    fs.writeFileSync(
      LEDGER,
      original.replace(anchor, "    'tflag:34': 3,"),
      'utf8',
    );
    const { status, output } = run_tool();
    assert.notEqual(
      status,
      0,
      '台账计数超出基线，工具必须非 0——吸收新增欠账必须显式改 LEDGER_BASELINE',
    );
    assert.ok(
      output.includes('tflag:34') && output.includes('超 #72 基线'),
      `探针条目未被以基线名义点名：\n${output}`,
    );
  } finally {
    fs.writeFileSync(LEDGER, original, 'utf8');
  }
  const restored = run_tool();
  assert.equal(
    restored.status,
    0,
    `台账还原后还红——文件系统或工具有一边不对：\n${restored.output}`,
  );
});

test('台账不许发霉：条目在代码里已不存在也红', () => {
  const original = fs.readFileSync(LEDGER, 'utf8');
  // 计数 1 的虚构条目：基线门与发霉门都会红，断言盯「发霉」文案——
  // 变异拆掉发霉门时，本用例因文案缺失而失败。
  const anchor = "  'ere/event/event-com.js': {\n    'tflag:100': 1,\n  },";
  const probe_block =
    "  'ere/event/event-com.js': {\n    'tflag:100': 1,\n    'flag:9': 1,\n  },";
  try {
    fs.writeFileSync(LEDGER, original.replace(anchor, probe_block), 'utf8');
    const { status, output } = run_tool();
    assert.notEqual(status, 0, '发霉条目必须让工具非 0');
    assert.ok(
      output.includes('flag:9') && output.includes('条目发霉'),
      `发霉条目未被逐条点名：\n${output}`,
    );
  } finally {
    fs.writeFileSync(LEDGER, original, 'utf8');
  }
  const restored = run_tool();
  assert.equal(
    restored.status,
    0,
    `台账还原后还红——文件系统或工具有一边不对：\n${restored.output}`,
  );
});
