// 跳过数守护（issue #92；#302 起两侧都用）：跳过的用例数不许隐形。
// 本工具读 `npm run test:ci` 落盘的 TAP 报告，把摘要里的跳过数与基线核对：
//
//   一致 → 退出 0，把「跳过 N/总数」打在 CI 日志（有 GITHUB_STEP_SUMMARY
//          时同时写进度摘要）；
//   偏离 → 退出 1。偏多＝有用例新增了引擎依赖（或新的条件跳过）没记账，
//          偏少＝引擎依赖用例被删、去引擎化，或 skip 门本身失效。两个
//          方向都给出提示——基线只能有意识地改，改数字的提交本身就是
//          「覆盖面变了」的公告。
//
// 为什么是 test:ci 之后单独一步而不是并进 npm test：跳过数度量的是
// 「CI 比本地弱多少」，值得在 Actions 步骤列表里占一行自己的红绿；
// 测试步红时守护不会跑（GitHub Actions 逐步短路），不会叠加误导。
//
// 退出码：0 核对通过；1 核对失败（数字偏离基线）；2 输入不可用（TAP
// 缺摘要、文件缺失、基线烂——测试运行器异常退出不该被当成核对通过）。
//
// **两侧各有一份基线，别混用**（#302）：
//   test/engine-skip-baseline.txt（现 72）—— 无引擎环境（CI 的 engineless
//     job、未放置 ere-4.8.0 的裸克隆）。守「引擎缺席的代价必须是看得见的
//     数字」，新增引擎依赖用例必须同步改基线。
//   test/engine-present-skip-baseline.txt（只能是 0）—— 有引擎环境（CI 的
//     engine / mutation job、本机）。守「引擎装上了却还有东西被跳过」，
//     那意味着门控条件写错或 asar 没被 locate_asar 认出来。
// 拿其中一份去核对另一种环境必然红——那是提醒你跑错了环境，不是基线错了。
//
// 用法：node tools/skip-count-check.mjs [TAP 文件] [--baseline <基线文件>]
//   TAP 文件默认 test-report.tap（package.json 的 test:ci 落盘位置）；
//   基线默认 test/engine-skip-baseline.txt。
//
// test/skip-count-check.test.js 是本工具的行为锁（全绿/偏多/偏少/缺摘要/
// 烂基线五路退出码与输出），不持基线副本——数字只有基线文件一份真相。

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);
const DEFAULT_TAP = path.join(REPO_ROOT, 'test-report.tap');
const DEFAULT_BASELINE = path.join(
  REPO_ROOT,
  'test',
  'engine-skip-baseline.txt',
);

/** 解析命令行：一个可选的位置参数（TAP 文件）+ --baseline <文件> */
function parse_argv(argv) {
  const options = { tap: DEFAULT_TAP, baseline: DEFAULT_BASELINE };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--baseline') {
      i += 1;
      if (!argv[i]) {
        throw new Error('--baseline 后面要跟文件路径');
      }
      options.baseline = argv[i];
    } else if (arg.startsWith('--baseline=')) {
      options.baseline = arg.slice('--baseline='.length);
    } else if (!arg.startsWith('--')) {
      options.tap = arg;
    } else {
      throw new Error(`未知参数：${arg}`);
    }
  }
  return options;
}

/**
 * 读基线文件：`#` 注释行与空行之外，必须恰好一行纯数字。
 * 允许注释是为了让基线文件自带维护说明（数字只有这一份真相）。
 */
function read_baseline(file) {
  let lines;
  try {
    lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  } catch {
    throw new Error(`基线文件读不到：${file}`);
  }
  const values = lines
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'));
  if (values.length !== 1 || !/^\d+$/.test(values[0])) {
    throw new Error(
      `基线文件形状不对：${file} 应为「注释/空行 + 恰好一行纯数字」，` +
        `实际非注释行 ${values.map((v) => `"${v}"`).join(', ') || '（空）'}`,
    );
  }
  return Number(values[0]);
}

/** 读 TAP 摘要：`# skipped N` 必在；`# tests N` 缺失时百分比降级不打印 */
function read_summary(tap_file) {
  let text;
  try {
    text = fs.readFileSync(tap_file, 'utf8');
  } catch {
    throw new Error(
      `TAP 报告读不到：${tap_file}（先跑 npm run test:ci 生成它）`,
    );
  }
  const skipped = /^# skipped (\d+)\s*$/m.exec(text);
  if (!skipped) {
    throw new Error(
      `TAP 摘要缺 \`# skipped\` 行：${tap_file}——node --test 异常退出时` +
        `不产摘要，先看测试步的日志`,
    );
  }
  const tests = /^# tests (\d+)\s*$/m.exec(text);
  return { skipped: Number(skipped[1]), tests: tests ? Number(tests[1]) : 0 };
}

/** 有 GITHUB_STEP_SUMMARY 就把数字写上去（本地无此变量，静默跳过） */
function write_step_summary(line) {
  const target = process.env.GITHUB_STEP_SUMMARY;
  if (target) {
    fs.appendFileSync(target, `${line}\n`);
  }
}

function main() {
  let options;
  let baseline;
  let summary;
  try {
    // parse_argv 也在 try 内：参数错误同样走「输入不可用」的退出码 2，
    // 不以未捕获异常的姿态与核对失败（1）混淆（#92 复查意见）
    options = parse_argv(process.argv.slice(2));
    baseline = read_baseline(options.baseline);
    summary = read_summary(options.tap);
  } catch (error) {
    console.error(`✗ ${error.message}`);
    process.exit(2);
  }

  const total_part =
    summary.tests > 0
      ? `${summary.skipped}/${summary.tests}（${(
          (summary.skipped / summary.tests) *
          100
        ).toFixed(1)}%）`
      : `${summary.skipped}`;

  if (summary.skipped === baseline) {
    const line = `✓ 跳过 ${total_part}，与基线一致（${options.baseline}）`;
    console.log(line);
    write_step_summary(
      `### 跳过数\n跳过 ${total_part}，与基线（\`${path.relative(REPO_ROOT, options.baseline)}\`）一致`,
    );
    return;
  }

  const delta = summary.skipped - baseline;
  const direction =
    delta > 0
      ? '跳过变多：多半是有用例新增了引擎依赖（或新的条件跳过）。若有意，' +
        '上调基线并在 PR 里说明覆盖面变化；若无意，这个用例在 CI 上根本没跑。'
      : '跳过变少：引擎依赖用例被删、去引擎化，或 skip 门本身失效（引擎' +
        '缺失时它真的在跑？）。若有意，下调基线。';
  const wrong_env =
    baseline === 0
      ? '\n  基线为 0 = 有引擎环境：跳过不为 0 多半是 asar 没被 locate_asar 认出来，' +
        '或该用例的门控条件写错了。'
      : '';
  console.error(
    `✗ 跳过数偏离基线：基线 ${baseline}，实际 ${summary.skipped}` +
      `（${delta > 0 ? '+' : ''}${delta}）\n  ${direction}${wrong_env}\n` +
      `  基线文件：${options.baseline}`,
  );
  write_step_summary(
    `### 跳过数\n跳过 ${total_part}，**偏离基线 ${baseline}（${
      delta > 0 ? '+' : ''
    }${delta}）**——本步已红`,
  );
  process.exit(1);
}

main();
