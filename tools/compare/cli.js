/**
 * @file T18 输出对拍·命令行入口（issue #48）。
 *
 * 用法：node tools/compare/cli.js
 *
 * 跑一次「黄金样本 vs ere 回放」的首回合对拍，打印：
 *   1. 装饰行占比复核（#9 的 21.2% 口径）；
 *   2. 全日志算式断言统计（自校验 / 链一致性，#9 的 400 条口径）；
 *   3. 首回合事件流对拍报告（version/stub/unexplained 三类）；
 *   4. 变量层：算式断言核对 + 回合前后快照差异。
 *
 * 退出码：unexplained > 0、断言自校验/链有无法解释项、或变量核对失败 → 1。
 *
 * 硬边界（必须随任何「对拍通过」的表述一起说）：黄金样本只覆盖调教这一
 * 段，「对拍通过」目前只等于「调教的这一段对得上」（#9 勘误一）。
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');

const {
  golden_stream,
  fixture_stream,
  line_stats,
  window_between_inputs,
} = require('./normalize');
const { diff_streams, format_report } = require('./diff');
const {
  extract_calc_assertions,
  check_assertions,
  parse_name_ids,
} = require('./assertions');
const { diff_snapshots } = require('./snapshot');
const { load_traincommand_ids } = require('./rules');

const REPO = path.resolve(__dirname, '..', '..');
const LOG = path.join(REPO, 'target', 'emuera.log');

async function main() {
  const log_text = fs.readFileSync(LOG, 'utf8');

  // 1. 装饰行占比复核
  const stats = line_stats(log_text);
  console.log(
    `[装饰行复核] 全 ${stats.total} 行：空行 ${stats.blank} + 分割线 ${stats.divider} + 省略号 ${stats.ellipsis}` +
      ` = ${stats.dropped}（${(stats.ratio * 100).toFixed(1)}%，#9 原口径 21.2%）`,
  );

  // 2. 全日志算式断言统计（自校验 + 链一致性）
  const palam_ids = parse_name_ids(path.join(REPO, 'yml', 'Palam.yml'));
  const full_stream = golden_stream(log_text);
  const { self_check } = extract_calc_assertions(full_stream, palam_ids, 31);
  console.log(
    `[算式断言] 共 ${self_check.total} 条（两项式 ${self_check.two_term} / 三项及以上 ${self_check.three_term}）；` +
      `自校验失败 ${self_check.self_validate_failures.length}；未识别指标 ${self_check.unknown_names.length}；` +
      `链：首尾相接 ${self_check.chain.chained} / 归零 ${self_check.chain.reset} / 无法解释 ${self_check.chain.unexplained.length}`,
  );

  // 3. 首回合对拍
  const { replay_first_turn } = require('./replay');
  const { fixture, before, after } = await replay_first_turn();
  const golden_window = window_between_inputs(full_stream, 0);
  const ere_window = window_between_inputs(fixture_stream(fixture.lines), 0);
  const report = diff_streams(golden_window, ere_window, {
    traincommand_ids: load_traincommand_ids(),
  });
  console.log(
    `[首回合对拍] golden 窗口 ${golden_window.length} 条 vs ere 窗口 ${ere_window.length} 条`,
  );
  console.log(format_report(report));

  // 4. 变量层
  const { assertions } = extract_calc_assertions(golden_window, palam_ids, 31);
  const failures = check_assertions(
    assertions,
    (p) => before[p],
    (p) => after[p],
  );
  console.log(
    `[变量层] 算式断言 ${assertions.length} 条，核对失败 ${failures.length} 条`,
  );
  failures.forEach((f) => {
    console.log(
      `  ${f.assertion.path}（${f.assertion.key}，log:${f.assertion.line}）` +
        ` ${f.stage} 期望 ${f.expect}，实得 ${f.actual}`,
    );
  });
  const snap = diff_snapshots(before, after);
  console.log(
    `[变量层] 回合前后快照：变 ${snap.changed.length} / 增 ${snap.added.length} / 删 ${snap.removed.length}`,
  );

  const bad =
    report.summary.unexplained > 0 ||
    self_check.self_validate_failures.length > 0 ||
    self_check.unknown_names.length > 0 ||
    self_check.chain.unexplained.length > 0 ||
    failures.length > 0;
  if (bad) {
    console.log('[结论] 存在未解释差异或断言失败，退出码 1');
    process.exitCode = 1;
  } else {
    console.log('[结论] 差异全部有名有姓，变量断言全过（边界见文件头）');
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
