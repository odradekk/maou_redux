/**
 * @file T18 输出比对·命令行入口（issue #48；#156 阶段一起加 --sample，
 * #161 阶段二接事件流比对）。
 *
 * 用法：node tools/compare/cli.js [--sample <样本名>]
 *
 * 缺省（不带 --sample，等价 `--sample ''`）跑一次「黄金样本 vs ere 回放」
 * 的首回合比对，行为与 #48 时代零变化，打印：
 *   1. 装饰行占比复核（#9 的 21.2% 这个数）；
 *   2. 全日志算式断言统计（自校验 / 链一致性，#9 的 400 条标准）；
 *   3. 首回合事件流比对报告（version/stub/unexplained 三类）；
 *   4. 变量层：算式断言核对 + 回合前后快照差异。
 *
 * `--sample <名>` 选 #156 范围 B 的新样本（登记表 tools/compare/samples.js，
 * 文件落 golden/）。#161 阶段二起跑完整比对：头注回显 + 装饰行复核 +
 * 算式断言统计 + **黄金样本 vs ere 回放的事件流比对**（回放器
 * tools/compare/replay-b.js——世界播种、观测面、输入通道的裁定见该文件
 * 头注；归因走 rules.js 的范围 B 规则组，scope/segment 由此处传入）。
 * 基线（六份样本的匹配/差异四数）由 test/compare-scope-b.test.js 锁死。
 * 头注 sidecar（<样本>.meta.json）缺失或字段不全按「样本不可重录」拒绝
 * （#156：置位串不落库，样本就不可重录；#161 加 autosave——自动存档
 * 开着会让 [99] 行中途变化且覆盖 target/Sav/save99.sav）。
 *
 * 退出码：参数/样本/头注不合法 → 1；缺省路径下 unexplained > 0、断言自
 * 校验/链有无法解释项、或变量核对失败 → 1；命名样本下 unexplained > 0
 * 或断言自校验失败 → 1。
 *
 * 硬边界（必须随任何「比对通过」的表述一起说）：调教段比对只覆盖调教
 * 这一段（#9 勘误一）；范围 B 三段两态（标题→主菜单 / 存读档 / 日循环
 * 推进一日）自 #161 起有对拍，边界与范围外处置见 docs/output-diff.md。
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
const { meta_rel, resolve_sample } = require('./samples');

const REPO = path.resolve(__dirname, '..', '..');

/**
 * --sample 必填的五个头注字段（#156：置位串不落库，样本就不可重录；#161：
 * 自动存档状态不落库，将来重录会得到不同的 [99] 行而查不出原因——录制时
 * 该开关必须为关，见 golden/README.md）。
 */
const META_REQUIRED = ['build', 'save', 'seed_string', 'macro_key', 'autosave'];

/**
 * 解析命令行参数。此前没有任何参数，故采取严格策略：未知参数即错。
 * @param {string[]} argv process.argv.slice(2)
 * @returns {{sample: string}} 样本名；缺省为空串（= 旧样本）
 */
function parse_args(argv) {
  const out = { sample: '' };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--sample') {
      const value = argv[i + 1];
      if (value === undefined) {
        throw new Error(
          '--sample 缺样本名（有效名单见 tools/compare/samples.js）',
        );
      }
      out.sample = value;
      i += 1;
    } else if (arg.startsWith('--sample=')) {
      out.sample = arg.slice('--sample='.length);
    } else {
      throw new Error(`未知参数「${arg}」——本工具只认 --sample <样本名>`);
    }
  }
  return out;
}

/** 失败退出：只打消息不打栈（参数/样本/头注类错误，人读的） */
function die(message) {
  console.error(message);
  process.exitCode = 1;
}

/**
 * 命名样本（#156 范围 B，#161 阶段二起含事件流比对）：头注回显 + 装饰行
 * 复核 + 算式断言统计 + 黄金样本 vs ere 回放的事件流比对。unexplained > 0
 * 或断言自校验失败 → 退出码 1。
 * @param {{name: string, rel: string, abs: string}} sample resolve_sample 的结果
 */
async function run_named_sample(sample) {
  if (!fs.existsSync(sample.abs)) {
    die(
      `样本文件不在库：${sample.rel}——#156 的样本由人录制回收后入库（阶段二），` +
        `在此之前该样本名只能占位。有效名单见 tools/compare/samples.js`,
    );
    return;
  }
  const meta_path = path.join(REPO, meta_rel(sample.rel));
  if (!fs.existsSync(meta_path)) {
    die(
      `样本头注缺失：${meta_rel(sample.rel)}——头注（构建标识/起录存档/置位串/` +
        `宏键）不落库，样本就不可重录（#156）。格式契约见 golden/README.md`,
    );
    return;
  }
  let meta;
  try {
    meta = JSON.parse(fs.readFileSync(meta_path, 'utf8'));
  } catch (err) {
    die(`样本头注不是合法 JSON：${meta_rel(sample.rel)}（${err.message}）`);
    return;
  }
  const missing = META_REQUIRED.filter(
    (key) => meta[key] === undefined || meta[key] === null,
  );
  if (missing.length > 0) {
    die(
      `样本头注缺必填字段：${missing.join('、')}（${meta_rel(sample.rel)}）——` +
        `五个字段的意义与示例见 golden/README.md`,
    );
    return;
  }

  console.log(`[样本] ${sample.name}（${sample.rel}）`);
  console.log(
    `[样本头注] 构建标识 ${meta.build} ｜ 起录存档 ${meta.save} ｜ 宏键 ${meta.macro_key} ｜ ` +
      (meta.seed_string === '' ? '置位串（空 = 自然态）' : '置位串 ↓') +
      ` ｜ 自动存档 ${meta.autosave === false ? '关' : '开'}`,
  );
  if (meta.seed_string !== '') {
    meta.seed_string
      .split(/\r?\n/)
      .forEach((line) => console.log(`[样本头注·置位串] ${line}`));
  }

  const log_text = fs.readFileSync(sample.abs, 'utf8');
  const stats = line_stats(log_text);
  console.log(
    `[装饰行复核] 全 ${stats.total} 行：空行 ${stats.blank} + 分割线 ${stats.divider} + 省略号 ${stats.ellipsis} + 图形标记 ${stats.shape}` +
      ` = ${stats.dropped}（${(stats.ratio * 100).toFixed(1)}%）`,
  );

  const palam_ids = parse_name_ids(path.join(REPO, 'yml', 'Palam.yml'));
  const { self_check } = extract_calc_assertions(
    golden_stream(log_text),
    palam_ids,
    31,
  );
  console.log(
    `[算式断言] 共 ${self_check.total} 条（两项式 ${self_check.two_term} / 三项及以上 ${self_check.three_term}）；` +
      `自校验失败 ${self_check.self_validate_failures.length}；未识别指标 ${self_check.unknown_names.length}；` +
      `链：首尾相接 ${self_check.chain.chained} / 归零 ${self_check.chain.reset} / 无法解释 ${self_check.chain.unexplained.length}`,
  );

  // 事件流比对：按段分流（段名 = 样本名第一段）。
  //   - train（#211 第三段）：调教段全序列——golden 窗口（train_window 裁：
  //     进调教起、能力值提高结束止）vs replay_train_sample 的回放流，归因
  //     走 rules.js 的调教段规则组（无 scope，与旧样本首回合共用）。
  //   - 其余（#161 范围 B）：golden 全流 vs replay-b 回放，scope: 'B'。
  const segment = sample.name.split('-')[0];
  let report;
  if (segment === 'train') {
    const { replay_train_sample, train_window } = require('./replay');
    const { stream_source } = await replay_train_sample(sample.name);
    const golden_entries = train_window(golden_stream(log_text), sample.name);
    const ere_entries = fixture_stream(stream_source).filter(
      (e) => e.kind !== 'discard' && e.kind !== 'group',
    );
    console.log(
      `[事件流比对] golden ${golden_entries.length} 条 vs ere ${ere_entries.length} 条`,
    );
    report = diff_streams(golden_entries, ere_entries, {
      scope: 'train',
      sample: sample.name,
      traincommand_ids: load_traincommand_ids(),
    });
  } else {
    const { replay_scope_b } = require('./replay-b');
    const { stream_source } = await replay_scope_b(
      segment,
      meta.state ?? 'natural',
    );
    const golden_entries = golden_stream(log_text).filter(
      (e) => e.kind !== 'discard' && e.kind !== 'group',
    );
    const ere_entries = fixture_stream(stream_source).filter(
      (e) => e.kind !== 'discard' && e.kind !== 'group',
    );
    console.log(
      `[事件流比对] golden ${golden_entries.length} 条 vs ere ${ere_entries.length} 条`,
    );
    report = diff_streams(golden_entries, ere_entries, {
      scope: 'B',
      segment,
    });
  }
  console.log(format_report(report));

  const bad =
    report.summary.unexplained > 0 ||
    self_check.self_validate_failures.length > 0 ||
    self_check.unknown_names.length > 0 ||
    self_check.chain.unexplained.length > 0;
  if (bad) {
    console.log('[结论] 存在未解释差异或断言失败，退出码 1');
    process.exitCode = 1;
  } else {
    console.log(
      segment === 'train'
        ? '[结论] 差异全部有名有姓（调教段全序列：两份样本，边界见文件头）'
        : '[结论] 差异全部有名有姓（范围 B：三段两态，边界见文件头）',
    );
  }
}

async function main() {
  const opts = parse_args(process.argv.slice(2));
  const sample = resolve_sample(opts.sample);
  if (sample.name !== '') {
    await run_named_sample(sample);
    return;
  }
  const log_text = fs.readFileSync(sample.abs, 'utf8');

  // 1. 装饰行占比复核
  const stats = line_stats(log_text);
  console.log(
    `[装饰行复核] 全 ${stats.total} 行：空行 ${stats.blank} + 分割线 ${stats.divider} + 省略号 ${stats.ellipsis} + 图形标记 ${stats.shape}` +
      ` = ${stats.dropped}（${(stats.ratio * 100).toFixed(1)}%，#9 原标准 21.2%）`,
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

  // 3. 首回合比对
  const { replay_first_turn } = require('./replay');
  const { fixture, before, after } = await replay_first_turn();
  const golden_window = window_between_inputs(full_stream, 0);
  const ere_window = window_between_inputs(fixture_stream(fixture.lines), 0);
  const report = diff_streams(golden_window, ere_window, {
    traincommand_ids: load_traincommand_ids(),
  });
  console.log(
    `[首回合比对] golden 窗口 ${golden_window.length} 条 vs ere 窗口 ${ere_window.length} 条`,
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
