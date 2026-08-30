// 测试选择器（issue #256）：由改动文件推出「该跑哪些测试」，让 agent 的
// 内环与交付闸不必每次跑全量的 94 个文件 / 1386 个用例（实测 98s）。
//
// **文件名不能叫 test-select.mjs**：node --test 的默认发现模式含
// `**/test-*.?(c|m)js`，`tools/` 也在扫描范围内——叫那个名字，`npm test`
// 会把这个工具当成测试文件执行，当场多出一条失败。首版就叫那个名字，
// 是变异检查的副本对照运行把它暴露出来的（`✖ tools/test-select.mjs`）。
// 往 tools/ 加工具时避开这几种名字：`test-*`、`*-test`、`*_test`、`test`。
//
// 守什么：**选择器不承担正确性**。它只承担速度——任何它拿不准的改动都
// 退回全量，所以最坏情况等于今天的行为，绝不会因为规则表不全而漏测。
// 正确性仍由 SOP 的 T3（票验收跑全量）与 T4（阶段闸跑全量变异）承担。
//
// 相关性映射从哪来：**tools/mutations/*.mjs 的条目表**。每条带 `file:`
// （靶文件）与 `tests:`（改坏该文件后应当变红的测试）——这张映射不是新造
// 的，是变异检查每次全量都在实证它（「改这个文件，这些测试必须红」正是
// 变异检查的判据）。505 条覆盖 111 个文件路径、78 个测试文件。
//
// 为什么不做静态 require 图：本项目建不出来。测试几乎都经
// test/helpers/era-fixture.js 动态加载，全仓库 `require('#/…')` 只有 11 处。
//
// 选择规则。**前四条取并集**（一个文件可能同时被多条命中，多选无害、
// 少选才危险），四条全不命中才算不可解析：
//   1. 改动的 test/*.test.js 本身 → 选中（改了测试当然要跑）。
//   2. 查条目表 `file: === <改动文件>` → 取其 `tests:` 映射成
//      test/<名>.test.js。条目表覆盖 ere/、tools/、test/helpers/、ownership/。
//   3. ere/facade/*.js → gen-facade。这 15 个文件是 tools/gen-facade.js 的
//      产物，test/gen-facade.test.js 逐文件比对真产物，已实证是其守护者。
//   4. **路径字面量反查**：源码里出现该文件路径（或其所在目录）的测试全部
//      选中。这条是**推导出来的、不是手写表**，所以不会长草。它解决的是
//      数据文件与登记表——docs/stub-registry.md 被 30 个测试读、
//      test/helpers/era-fixture.js 被 57 个测试引、test/engine-skip-baseline.txt
//      被 2 个读，这些都不在条目表里，却是每张票必改的东西。
//      注释里提到路径也会命中：那是**过度选择**，落在安全的一侧。
//   5. 全局锁（LOCKS）恒选：改任何东西都可能弄红的那一组。
//   6. **兜底：任一改动文件四条规则都不命中 → 退回全量**，并把文件名打
//      出来。打印出来的名字就是「该给它补一条变异条目」的压力。硬报错
//      会把选择器变成路障，那会让人绕开它，比慢更糟。
//
// 第 4 条是实测逼出来的，不是设计出来的（#256 验收）：只有前三条时，
// 拿最近三张已合并的票回放，**三张全部退回全量**——因为每张票都改
// docs/stub-registry.md、tools/mutation-check.mjs 与 tools/mutations/*.mjs。
// 「选择器对真实工单一次也没生效」这件事，只有回放才看得见。
//
// **别高估它对交付闸（T2）的收益。** 拿六个已合并提交回放（#256 验收，
// 判据是「喂非测试改动，看能否覆盖该提交实际改动的测试文件」）：三个
// 精确选中 46/56/84（全部 95 个中），两个退回全量，一个没改测试。
// **零漏测**——但省下的只有一到五成。原因是真实工单必然会碰
// docs/stub-registry.md（牵 30 个）与 test/helpers/era-fixture.js（牵 57 个），
// 那些依赖是真的，不是选择器保守。
// 真正的收益在**内环（T1）**：`--no-locks` 加自己那个模块，通常 2–4 个
// 文件、个位数秒，而全量 98s。这个工具是为内环写的，T2 的那点加速是搭头。
//
// 有意不做的一件事：**没有「无测试面路径」白名单**（docs/、.github/ 之类）。
// 那种表要么靠人判断（会漂），要么靠 grep 自证（测试里的注释会误命中，
// 自证不可靠）。它能省的只有「纯文档票」这一种情形，而那种票是派单人在
// 跑，自己判断即可。规则表一旦承担正确性，这个工具就不再安全。
//
// 用法：
//   node tools/select-tests.mjs                     打印选中的测试文件（对 origin/master）
//   node tools/select-tests.mjs --run               直接跑它们
//   node tools/select-tests.mjs --base <ref>        换比较基线
//   node tools/select-tests.mjs --files a.js,b.js   显式给改动文件（不走 git）
//   node tools/select-tests.mjs --locks-only        只要全局锁那一组
//   node tools/select-tests.mjs --no-locks          去掉全局锁（T1 内环用）
//   --root <dir> / --ledger-dir <dir>              测试夹具用
//
// --no-locks 是给红绿切片的内环用的：那时只想知道「我这个模块还对不对」，
// 全局锁那 11 个文件 20s 是纯等待。交付闸（T2）与验收（T3）**不许去锁**。
//
// 输出分流：**stdout 是文件列表（每行一个），stderr 是报告**——
// `node tools/select-tests.mjs` 的输出可以直接喂给别的命令。
// 退出码：不带 --run 恒为 0；带 --run 时透传 node --test 的退出码。

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { DEFAULT_LEDGER_DIR, load_ledger } from './load-mutations.mjs';

const TOOL_DIR = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_ROOT = path.resolve(TOOL_DIR, '..');

/**
 * 全局锁：改任何东西都可能弄红的测试，因此恒选。判据是「失败原因与被改
 * 的是哪个域无关」——扫全树的检查器、全局计数字段的守护、跨文件同步的
 * 守护。实测这一组 11 个文件 / 118 个用例 / 20s。
 *
 * source-check 名字像检查器，**不在此列**：它是 ere/event/source-check.js
 * 的域测试（6.6s），只有改到该文件才需要跑。
 */
const LOCKS = [
  'output-lang-lock', // 简体锁：扫 ere/ 全部字符串字面量与 yml/ 产物串
  'trace-check', // 1:1 追溯锚点：任何新文件都要登记
  'domain-check', // 跨域写登记 + 目录认领：新文件的裸跨域写即红
  'ownership-scan', // 所有权产物漂移
  'static-table-coverage', // 新寻址族忘配表（名字表不在 + 桶在 = 实机崩溃）
  'mutation-check', // 条目表三项检查：LEDGER_COUNT_BASELINE 等全局计数
  'asar-candidates', // 三处 ASAR_CANDIDATES 清单同步
  'worktree-write-lock', // 测试不写工作树
  'skip-count-check', // 跳过数守护工具自身
  'engine-contract-check', // 引擎契约锚点
  'resource-media', // 引擎默认配置形状逐键比对
];

// —— 参数 ——

function parse_args(argv) {
  const out = {
    base: 'origin/master',
    files: undefined,
    root: DEFAULT_ROOT,
    ledger_dir: DEFAULT_LEDGER_DIR,
    locks_only: false,
    no_locks: false,
    run: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    const next = () => argv[(i += 1)];
    if (a === '--run') out.run = true;
    else if (a === '--locks-only') out.locks_only = true;
    else if (a === '--no-locks') out.no_locks = true;
    else if (a === '--base') out.base = String(next());
    else if (a === '--files')
      out.files = String(next())
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    else if (a === '--root') out.root = path.resolve(String(next()));
    else if (a === '--ledger-dir')
      out.ledger_dir = path.resolve(String(next()));
    else throw new Error(`未知参数：${a}`);
  }
  return out;
}

// —— 改动文件 ——

function git(root, args) {
  const r = spawnSync('git', args, { cwd: root, encoding: 'utf8' });
  if (r.status !== 0) {
    throw new Error(
      `git ${args.join(' ')} 失败（退出码 ${r.status}）：${(r.stderr || '').trim()}`,
    );
  }
  return r.stdout;
}

/**
 * 相对 base 的改动文件：已提交 + 工作树未提交 + 未跟踪。
 *
 * 三者都要：agent 在提交前跑这个工具（工作树），派单人在验收时跑（已提交），
 * 而**新增的测试文件在提交前是未跟踪的**——漏掉它就会「新写的测试没被选中」。
 */
function changed_files(root, base) {
  const merge_base = git(root, ['merge-base', base, 'HEAD']).trim();
  const tracked = git(root, ['diff', '--name-only', merge_base]);
  const untracked = git(root, ['ls-files', '--others', '--exclude-standard']);
  return [
    ...new Set(
      `${tracked}\n${untracked}`
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
    ),
  ].sort();
}

// —— 解析 ——

function all_test_files(root) {
  return fs
    .readdirSync(path.join(root, 'test'))
    .filter((n) => n.endsWith('.test.js'))
    .map((n) => `test/${n}`)
    .sort();
}

/** 条目表的 file: → tests: 映射（一个文件可能有多条条目，测试取并集） */
function build_ledger_map(entries) {
  const map = new Map();
  for (const m of entries) {
    if (!map.has(m.file)) map.set(m.file, new Set());
    for (const t of m.tests) map.get(m.file).add(`test/${t}.test.js`);
  }
  return map;
}

/** 每个测试文件的源码，供路径字面量反查（读一次，全部改动文件复用） */
function read_test_sources(root, test_files) {
  return test_files.map((t) => [
    t,
    fs.readFileSync(path.join(root, t), 'utf8'),
  ]);
}

/**
 * 路径字面量反查：源码里出现 `f` 的路径或其所在目录的测试。
 *
 * 只认仓库相对路径，不认 basename——`game.js` 那样的名字会命中一大片，
 * 而多选虽安全，选到接近全量就等于没选。
 *
 * 目录探针是为 tools/mutations/ 这类「测试提目录、不提具体分片」的形态
 * 准备的，**只对二级以上目录启用**：`tools/x.mjs` 的目录是裸 `tools`，
 * 那会命中每一个在注释里提过任何工具的测试。实测这条差错让
 * tools/trace-check.mjs 牵出 33 个测试、docs/stub-registry.md 牵出 44 个
 * （真实依赖分别是 1 个和 30 个），选择器等于没选。
 */
function grep_path(f, sources) {
  const dir = path.posix.dirname(f);
  const probes = dir.includes('/') ? [f, dir] : [f];
  return sources
    .filter(([, src]) => probes.some((p) => src.includes(p)))
    .map(([t]) => t);
}

/**
 * 逐个改动文件求它的测试面。前四条规则取并集。
 *
 * @returns {{tests: Set<string>, reasons: Map<string, string>, unresolved: string[]}}
 *   unresolved 非空 = 调用方必须退回全量。
 */
function resolve(files, ledger_map, sources) {
  const tests = new Set();
  const reasons = new Map();
  const unresolved = [];
  for (const f of files) {
    const why = [];
    if (f.startsWith('test/') && f.endsWith('.test.js')) {
      tests.add(f);
      why.push('测试文件本身');
    }
    const from_ledger = ledger_map.get(f);
    if (from_ledger && from_ledger.size > 0) {
      for (const t of from_ledger) tests.add(t);
      why.push(`条目表 ${from_ledger.size} 个`);
    }
    if (f.startsWith('ere/facade/') && f.endsWith('.js')) {
      tests.add('test/gen-facade.test.js');
      why.push('门面产物 → gen-facade');
    }
    const from_grep = grep_path(f, sources);
    if (from_grep.length > 0) {
      for (const t of from_grep) tests.add(t);
      why.push(`路径反查 ${from_grep.length} 个`);
    }
    if (why.length === 0) unresolved.push(f);
    else reasons.set(f, why.join(' + '));
  }
  return { tests, reasons, unresolved };
}

// —— 主流程 ——

async function main() {
  const args = parse_args(process.argv.slice(2));
  const existing = new Set(all_test_files(args.root));
  const locks = LOCKS.map((n) => `test/${n}.test.js`);

  const missing_locks = locks.filter((t) => !existing.has(t));
  if (missing_locks.length > 0) {
    // 锁清单指向不存在的文件 = node --test 因「找不到文件」退出非 0，形同
    // 空跑。与条目表三项检查的「测试文件检查」同款标准，宁可当场红。
    console.error(`✗ 全局锁清单指向不存在的文件：${missing_locks.join(' ')}`);
    process.exit(1);
  }

  let selected;
  let full = false;
  if (args.locks_only) {
    selected = [...locks].sort();
    console.error(`只要全局锁：${selected.length} 个文件`);
  } else {
    const files = args.files ?? changed_files(args.root, args.base);
    const ledger_map = build_ledger_map(await load_ledger(args.ledger_dir));
    const sources = read_test_sources(args.root, [...existing]);
    const { tests, reasons, unresolved } = resolve(files, ledger_map, sources);

    console.error(`改动 ${files.length} 个文件：`);
    for (const f of files) {
      console.error(`  ${f} — ${reasons.get(f) ?? '**无法解析**'}`);
    }

    if (unresolved.length > 0) {
      full = true;
      selected = all_test_files(args.root);
      console.error(
        `\n⚠ ${unresolved.length} 个文件的测试面无法解析，退回全量（${selected.length} 个文件）。`,
      );
      console.error(
        '  给它们各补一条变异条目（tools/mutations/*.mjs），下次即可精确选中。',
      );
    } else {
      if (!args.no_locks) for (const t of locks) tests.add(t);
      selected = [...tests].filter((t) => existing.has(t)).sort();
      console.error(
        `\n选中 ${selected.length} 个测试文件（全部 ${existing.size} 个中；` +
          (args.no_locks
            ? '**已去掉全局锁——内环专用，交付前必须补跑**）'
            : `含 ${locks.length} 个全局锁）`),
      );
    }
  }

  console.log(selected.join('\n'));

  if (!args.run) process.exit(0);

  if (full) {
    console.error('（退回全量，等价于 npm test）');
  }
  const r = spawnSync(process.execPath, ['--test', ...selected], {
    cwd: args.root,
    stdio: 'inherit',
  });
  process.exit(r.status ?? 1);
}

main().catch((e) => {
  console.error(`✗ ${e.message}`);
  process.exit(1);
});
