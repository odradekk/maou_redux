/**
 * @file T18 输出比对·命令行入口（issue #48；#156 阶段一起加 --sample）。
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
 * 文件落 golden/、由人录制回收后入库）。新样本目前只跑与内容无关的通用
 * 部分（头注回显 + 装饰行复核 + 算式断言统计）；ere 侧回放与事件流比对
 * 属阶段二——归一化器要不要扩展、差异如何归因，必须看了实际样本形态才
 * 判（#109 裁定问题五，现在判就是猜）。头注 sidecar（<样本>.meta.json）
 * 缺失或字段不全按「样本不可重录」拒绝（#156：置位串不落库，样本就不可
 * 重录）。
 *
 * 退出码：参数/样本/头注不合法 → 1；缺省路径下 unexplained > 0、断言自
 * 校验/链有无法解释项、或变量核对失败 → 1。
 *
 * 硬边界（必须随任何「比对通过」的表述一起说）：黄金样本只覆盖调教这一
 * 段，「比对通过」目前只等于「调教的这一段对得上」（#9 勘误一）。
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

/** --sample 必填的四个头注字段（#156：置位串不落库，样本就不可重录） */
const META_REQUIRED = ['build', 'save', 'seed_string', 'macro_key'];

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
 * 命名样本（#156 范围 B）的通用分析：头注回显 + 装饰行复核 + 算式断言
 * 统计。不做 ere 侧比对（阶段二，见文件头注）。全部通过则退出码 0。
 * @param {{name: string, rel: string, abs: string}} sample resolve_sample 的结果
 */
function run_named_sample(sample) {
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
        `四个字段的意义与示例见 golden/README.md`,
    );
    return;
  }

  console.log(`[样本] ${sample.name}（${sample.rel}）`);
  console.log(
    `[样本头注] 构建标识 ${meta.build} ｜ 起录存档 ${meta.save} ｜ 宏键 ${meta.macro_key} ｜ ` +
      (meta.seed_string === '' ? '置位串（空 = 自然态）' : '置位串 ↓'),
  );
  if (meta.seed_string !== '') {
    meta.seed_string
      .split(/\r?\n/)
      .forEach((line) => console.log(`[样本头注·置位串] ${line}`));
  }

  const log_text = fs.readFileSync(sample.abs, 'utf8');
  const stats = line_stats(log_text);
  console.log(
    `[装饰行复核] 全 ${stats.total} 行：空行 ${stats.blank} + 分割线 ${stats.divider} + 省略号 ${stats.ellipsis}` +
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
  console.log(
    '[比对] 跳过：该样本的 ere 侧回放与事件流比对属 #156 阶段二——归一化器要不要扩展、' +
      '差异如何归因，以回收样本的实际输出形态为准（#109 裁定问题五）。',
  );
}

async function main() {
  const opts = parse_args(process.argv.slice(2));
  const sample = resolve_sample(opts.sample);
  if (sample.name !== '') {
    run_named_sample(sample);
    return;
  }
  const log_text = fs.readFileSync(sample.abs, 'utf8');

  // 1. 装饰行占比复核
  const stats = line_stats(log_text);
  console.log(
    `[装饰行复核] 全 ${stats.total} 行：空行 ${stats.blank} + 分割线 ${stats.divider} + 省略号 ${stats.ellipsis}` +
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
