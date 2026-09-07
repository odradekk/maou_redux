// 变异测试驱动器（issue #44 建立；#89 重构为「条目表 sidecar + 分层执行点」）。
//
// 守什么：测试是否真的守得住它声称守护的行为——把被测代码改坏一小块
// （变异），对应测试必须红；红不了 = 误报通过。它因此是「验证其余检查器
// 真的守得住」的那一个：trace-check / domain-check / engine-contract-check /
// compare 的行为锁各有变异条目钉在条目表里。
//
// 形态（#89 两问之「形态」）：
//   变异记录按靶文件目录分片住在 tools/mutations/*.mjs（加载时动态汇总，
//   新增分片文件即入账，无需登记）。desc 里的 M 编号不人工分配，只作引用
//   锚点，但**全表必须唯一**——简报/issue/验收评论里都靠这个号指认一条
//   具体条目，重号让句柄失效（#295；M117 曾被两票撞号，已改正）。唯一性
//   由 gate_shape 随 --verify 秒级核对。引用变异时也可用运行时生成的
//   稳定短号 [M-xxxxxxxx]（desc 内容哈希）或直接引 desc。字段：
//     { desc, file, find, replace, tests, must_mention, engine? }
//   - find 必须在靶文件中恰好出现 1 次（失配 = 直接判失败：靶代码被重构后，
//     工具当场红而不是静默失守——这条安全性质不许拆）；
//   - tests = 应变红的测试文件名（不含 test/ 前缀与 .test.js 后缀）；
//   - must_mention = 测试输出里必须能找到的片段，证明红的正是被测行为。
//     语义是「输出包含该片段」，不是「只有它红了」——按实义命名
//     （旧名 expect_only 名不副实，#89 改名），必填，无宽松判定。
//   - engine = 该条只被引擎比对用例守护（无引擎处按「跳过」放行）。可选，
//     省略即 false；声明数由门 4 核对，实测由 verdict_problems 交叉核对。
//
// 条目表四项检查（照 #72 domain-check 的两项检查形状，多一道测试文件存在性
// 与一道引擎声明数）：
//   1. 计数检查：每个分片的条数必须等于它自己导出的 COUNT——增删条目必须
//      显式改同一份文件里的那个数，搬家丢条目、并表时把别人的条目解析掉，
//      都当场红。这个数**按分片自报**（#367 从单个全局常量改来）：全局常量
//      让每张实施票都改到同一行，一批五张票撞了五次；分片自报之后，声明
//      落在本票本来就要改的那个分片里，冲突面只剩「两票同改一分片」，
//      而那种情形条目数组本身也要合并，不多一处代价。
//      整份分片被删仍是盲区（COUNT 随文件一起消失），但那是六百行的删除，
//      不是解析冲突时悄悄少三条——后者才是这道门真正在守的东西。
//   2. 失配检查：每条 find 在靶文件中恰好 1 次，靶文件必须存在；
//   3. 测试文件检查：tests 引用的 test/<名字>.test.js 必须存在——文件
//      不存在时 node --test 因「找不到文件」退出非 0，形同假拦截。
//   4. 引擎声明检查（#256）：`engine: true` 的条数必须等于 ENGINE_SKIP_
//      BASELINE。只对真条目表生效（--ledger-dir 换表时跳过）。
//
// 用法：
//   node tools/mutation-check.mjs                        全量（串行，就地变异+还原）
//   node tools/mutation-check.mjs --verify               只跑三项检查（秒级；进 npm test 的快速模式）
//   node tools/mutation-check.mjs --changed              定向：只跑改动文件的条目（SOP 的 T3 票验收档）
//   node tools/mutation-check.mjs --sample 12 --seed N   抽样执行（本地想快速看一眼时用；CI 自 #302 起跑全量）
//   node tools/mutation-check.mjs --jobs 4               隔离副本并行全量（CI 的 master 档 / SOP 的 T4 阶段闸）
//   --changed / --base <ref>  按 git 改动过滤条目的 file:（默认基线 origin/master）
//   --files a.js,b.js         显式给靶文件列表（不走 git；测试夹具与诊断用）
//   --ids M4246,M4250-M4260   只跑点名的 M 编号（agent 内环用：证明**刚加的**
//                             那几条真能拦。`--files` 会把打同一个靶文件的条目
//                             全跑一遍——K11 有 502 条 × 4.8s ≈ 40 分钟，每加一条
//                             指令就重跑一遍整份，是 #242 实测的主要拖慢来源）。
//                             点名的编号在表里不存在时当场报错，不静默跑 0 条。
//   --root <dir>            变异所在的仓库根（默认本工具的上级；测试夹具用）
//   --ledger-dir <dir>      条目表目录（默认 tools/mutations；测试夹具用）
//   --skip-baseline <n|off> 覆盖无引擎跳过基线（测试夹具与并行子进程用）
//   --slice <i> <k>         只跑 sha1(desc) % k === i 的条目（并行子进程用）
//   --asar <path|none>      显式指引擎 asar（none = 视为无引擎；给了就不再
//                           三址回落，所指不存在按无引擎处理——测试与诊断
//                           用，与 tools/engine-contract-check.mjs 同款标准）
//
// 退出码：全拦 = 0（无引擎环境下另允许「跳过数恰等于基线」）；任何
// 失配、误报通过、还原失败、副本破损 = 1。测试驱动工具看退出码，不在测试
// 里复制基线（trace-check 的整改教训：规则写在测试里而不在工具里，
// 工具会声称自己在守、退出码却是 0）。
//
// 无引擎环境（CI runner）：变异靶的测试若整组依赖引擎（engine-bundle
// 找不到 asar 时逐用例 skip 并打警告），该条分类为「跳过（依赖引擎的测试绿 +
// 缺引擎警告）」——分类是纯输出判定，不掺环境；总数对 ENGINE_SKIP_
// BASELINE 核对、偏离即红——引擎比对的覆盖面收缩必须是有意识的提交
// （与 test/engine-skip-baseline.txt 同一标准）。
// **核对只在全量模式生效**：基线是全量模式的不变量，抽样/切片/定向子集
// 没有期望跳过数，不核对（见 verdict_problems 与 is_partial）。
// 分层之后（#256）全量只在阶段闸跑，这条运行时核对因此**一个阶段才生效
// 一次**——不够。补偿是把它同时做成**静态声明**：依赖引擎的条目带
// `engine: true`，门 4 在秒级的 --verify 里核对声明数（于是随 npm test 每
// 次都查），全量模式再交叉核对声明与实测（于是声明不会长草）。
// **引擎在场时跳过数必须为
// 0，任何档位都是硬判**——这条否决权集中在 verdict_problems，与分类
// 分离，行为锁可直接钉（#89 二次验收的探针 G）。CI 的「跳过」仍是弱
// 路径：无引擎处真误报通过分不清，严格标准以有引擎的本地全量为准。
//
// 并行模式（--jobs K）用隔离临时副本：主树只读，每个子进程在自己那份
// 副本里就地变异（副本 = ere/yml/res/test/tools/ownership/target 等白名单
// 条目，测试零第三方依赖，node_modules 与引擎不进副本）。副本先跑一遍
// 不变异的对照全量——副本缺文件会表现为测试红，不先对照会被误判成
// 「变异被拦截」，是并行模式误报通过的最大来源。
//
// **报告路径一律 process.exitCode，不许 process.exit**（#304）：管道上
// process.stdout 是异步的，exit() 会把排队未写完的输出直接丢掉。实测写
// 836038 字节后立即 exit(1)，管道对端只收到 65536 字节（管道缓冲区大小），
// 末行截断在半个字符上、SUMMARY 行整个没了。并行模式把每个子进程的输出
// 整块转发，正好撞上这条——CI 上表现为「跑到一半神秘崩溃」，而本机把
// stdout 重定向到文件时是同步写、一个字节不丢，所以本机永远复现不出来。
// 只有 SIGINT 处理器可以用 exit（中断时先把靶文件还原要紧）。

import { spawn, spawnSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { DEFAULT_LEDGER_DIR, load_shards } from './load-mutations.mjs';

const TOOL_DIR = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_ROOT = path.resolve(TOOL_DIR, '..');

/**
 * 无引擎环境的预期跳过数：变异靶的测试整组依赖引擎的条目数。新变异若
 * 只被引擎比对用例守护，此数会涨——那意味着该变异在 CI 上只被「跳过」
 * 覆盖，改这份常量时想清楚。
 *
 * **这个数字现在有两个核对点**（#256 分层之后）：
 *   - **门 4（静态，秒级）**：条目表里 `engine: true` 的条数必须等于它。
 *     随 `--verify` 进 `npm test`，每次三项自检都查。加这道门的理由就是
 *     下面那次事故——分层把全量变异退到阶段闸之后，只剩运行时核对的话，
 *     同样的漏抬要一个阶段才暴露。
 *   - **运行时（全量模式）**：无引擎跑全量，实测跳过数必须等于它；且
 *     `run_one` 逐条交叉核对声明与实测（实测跳过却没声明、声明了却无
 *     引擎也拦得下，都当场判红）——所以声明不会长草。
 *
 * **逐条记全，别只记增量。** 只记「#N 起 +k」时，某一票漏抬就再也对不
 * 上账：#135 加的 M222 漏抬（11 未进 12），其后 #138 的 +2 与 #139 的 +3
 * 各自算对了自己那份，总数却一直差 1，master CI 因此连红 18 次 4 天
 * （首红 6f17fc3，2026-08-24）——直到有人把 17 条逐条列出来才对上。
 *
 * 当前 19 条（#256 用 `ERE_ENGINE_ASAR=none … --asar none --jobs 4` 实测
 * 复核过，与下面这份清单逐条一致，并已就地标上 `engine: true`）：
 *   基础 7：M112/M113/M115（portcflag 预设比对）、M127（资源缺省配置
 *           比对）、M167/M169/M171（夹具的引擎镜像语义）
 *   #113 +4：Chara35 预设值、ExFlag 名字表 id、ExFlag 结局线槽位、
 *           Flag 侵略线 id
 *   #135 +1：M222（saveFiles 落 _fixed.json——靶用例 resource-media 的
 *           引擎默认形状比对。**当时漏抬，本处补记**）
 *   #138 +2：M243/M245（Chara31 ABL / Chara34 MARK 预设比对——靶用例是
 *           extalent-table 的 engine_test 组；同票 M240/M241/M244 靶在
 *           文件级用例（登记契约/版本轴）上，无引擎也红，不进跳过数）
 *   #139 +3：M270/M271/M272（Chara150 素質 320 / Chara201 素質 319 /
 *           Chara777 相性段）
 *   #349 +2：M6993/M6994（C_Relation/C_Relation_Sub 名字表经引擎真解析、
 *           建桶、寻址与存档往返）
 */
const ENGINE_SKIP_BASELINE = 19;

/** engine-bundle 缺 asar 时的警告前缀（测试输出里据此识别整组跳过） */
const ENGINE_WARN_MARKER = '[engine-bundle] 未找到 ere-4.8.0 的 app.asar';

/**
 * 并行副本不携带的顶层条目（拒绝清单而非白名单：仓库里凡测试可能读到
 * 的数据目录——docs/、ownership/、target/ 等——一律自动入副本；漏带会
 * 表现为对照运行红，而不是变异被误判拦截）。引擎目录与 node_modules
 * 体积大且测试不依赖（测试零第三方依赖，引擎比对走三址回落）。
 */
const COPY_DENY = new Set([
  '.git',
  '.claude',
  '.agents',
  'node_modules',
  'ere-4.8.0-win-x64',
  'sav',
  'test-report.tap',
]);

// —— 参数 ——

function parse_args(argv) {
  const out = {
    verify: false,
    sample: undefined,
    seed: '',
    jobs: 1,
    slice: undefined,
    root: DEFAULT_ROOT,
    ledger_dir: DEFAULT_LEDGER_DIR,
    skip_baseline: undefined,
    asar: undefined,
    files: undefined,
    base: undefined,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    const next = () => argv[(i += 1)];
    if (a === '--verify') out.verify = true;
    else if (a === '--changed') out.base = 'origin/master';
    else if (a === '--base') out.base = String(next());
    else if (a === '--files')
      out.files = String(next())
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    else if (a === '--ids') out.ids = parse_ids(String(next()));
    else if (a === '--sample') out.sample = Number(next());
    else if (a === '--seed') out.seed = String(next());
    else if (a === '--jobs') out.jobs = Math.max(1, Number(next()));
    else if (a === '--slice')
      out.slice = [Number(argv[(i += 1)]), Number(argv[(i += 1)])];
    else if (a === '--root') out.root = path.resolve(String(next()));
    else if (a === '--ledger-dir')
      out.ledger_dir = path.resolve(String(next()));
    else if (a === '--skip-baseline') out.skip_baseline = String(next());
    else if (a === '--asar') out.asar = String(next());
    else throw new Error(`未知参数：${a}`);
  }
  return out;
}

// —— 条目表装载与稳定短号 ——

/** 把一段字面量转成只匹配它自己的正则源码（供 --test-name-pattern 用） */
function escape_regexp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** desc 的内容哈希短号：引用锚点 [M-xxxxxxxx]，desc 变则号变，无需人工分配 */
function stable_id(desc) {
  return `M-${crypto.createHash('sha1').update(desc).digest('hex').slice(0, 8)}`;
}

function desc_rank(desc) {
  return parseInt(
    crypto.createHash('sha1').update(desc).digest('hex').slice(0, 12),
    16,
  );
}

// —— 三项检查 ——

/** 命令行取值错误：顶层按「一行错误信息 + 退出码 1」收，不打栈。 */
class ArgError extends Error {}

/**
 * `--ids` 的取值：逗号分隔的 M 编号与闭区间，`M` 前缀可省。
 * `M4246,M4250-M4260` → Set{4246, 4250..4260}。
 */
function parse_ids(spec) {
  const out = new Set();
  for (const part of spec
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)) {
    const m = /^M?(\d+)(?:-M?(\d+))?$/i.exec(part);
    if (!m) {
      throw new ArgError(
        `✗ --ids 的 "${part}" 不是 M 编号或区间（如 M4246 / M4250-M4260）`,
      );
    }
    const from = Number(m[1]);
    const to = m[2] === undefined ? from : Number(m[2]);
    for (let n = Math.min(from, to); n <= Math.max(from, to); n += 1)
      out.add(n);
  }
  return out;
}

/** desc 开头的 M 编号（如 "M1790 ..." → "1790"）；无前缀（#113 遗留 4 条老条目）返回 null */
function extract_m_number(desc) {
  const m = /^M(\d+)\b/.exec(desc);
  return m ? m[1] : null;
}

function gate_shape(entries) {
  const errors = [];
  const seen = new Set();
  // M 编号 → 首次见到的 desc（#295）。只锚定「第一次见到」的那条：三方
  // 撞号时后两条都对第一条报错，不逐条互相比对——早的是唯一真相源。
  const seen_by_number = new Map();
  for (const m of entries) {
    if (typeof m.desc !== 'string' || !m.desc) {
      errors.push(`条目缺 desc：${JSON.stringify(m).slice(0, 80)}`);
      continue;
    }
    if (seen.has(m.desc)) {
      errors.push(`desc 重复：${m.desc}`);
    }
    seen.add(m.desc);
    const num = extract_m_number(m.desc);
    if (num !== null) {
      const prior = seen_by_number.get(num);
      if (prior !== undefined && prior !== m.desc) {
        errors.push(
          `M${num} 编号重复：${JSON.stringify(prior)} 与 ${JSON.stringify(m.desc)}` +
            `——M 编号是引用句柄，两条不同条目不许共用（#295）`,
        );
      } else {
        seen_by_number.set(num, m.desc);
      }
    }
    if (typeof m.file !== 'string' || !m.file) {
      errors.push(`[${m.desc}] 缺 file`);
    }
    if (typeof m.find !== 'string' || typeof m.replace !== 'string') {
      errors.push(`[${m.desc}] find/replace 必须是字符串`);
    }
    if (!Array.isArray(m.tests) || m.tests.length === 0) {
      errors.push(`[${m.desc}] tests 必须是非空数组`);
    }
    if (typeof m.must_mention !== 'string' || !m.must_mention) {
      errors.push(`[${m.desc}] 缺 must_mention（无宽松判定，必填）`);
    }
  }
  return errors;
}

function gate_count(shards) {
  const errors = [];
  for (const s of shards) {
    if (typeof s.declared !== 'number') {
      errors.push(
        `${s.name} 没有导出 COUNT——分片必须自报条数，缺了这道门对它失明`,
      );
      continue;
    }
    if (s.entries.length !== s.declared) {
      const dir =
        s.entries.length > s.declared
          ? `多出 ${s.entries.length - s.declared} 条（新变异落地须同步抬 COUNT）`
          : `少了 ${s.declared - s.entries.length} 条（条目丢失或被删，须同步降 COUNT）`;
      errors.push(
        `${s.name} 实际 ${s.entries.length} 条 ≠ 自报 COUNT ${s.declared}：${dir}`,
      );
    }
  }
  return errors;
}

function gate_targets(root, entries) {
  const errors = [];
  const content_by_file = new Map();
  for (const m of entries) {
    if (typeof m.file !== 'string') {
      continue;
    }
    if (!content_by_file.has(m.file)) {
      const full = path.join(root, m.file);
      if (!fs.existsSync(full)) {
        errors.push(`[${m.desc}] 靶文件不存在：${m.file}`);
        content_by_file.set(m.file, null);
        continue;
      }
      content_by_file.set(m.file, fs.readFileSync(full, 'utf8'));
    }
    const content = content_by_file.get(m.file);
    if (content === null) {
      continue;
    }
    const count = content.split(m.find).length - 1;
    if (count !== 1) {
      errors.push(
        `[${m.desc}] find 在 ${m.file} 中出现 ${count} 次（要求恰 1 次）` +
          `——靶代码被重构了？先同步 find 串再跑`,
      );
    }
  }
  return errors;
}

function gate_test_files(root, entries) {
  const errors = [];
  const missing = new Set();
  for (const m of entries) {
    for (const t of Array.isArray(m.tests) ? m.tests : []) {
      const rel = `test/${t}.test.js`;
      if (!missing.has(rel) && !fs.existsSync(path.join(root, rel))) {
        missing.add(rel);
        errors.push(`[${m.desc}] 测试文件不存在：${rel}`);
      }
    }
  }
  return errors;
}

/**
 * 门 4（#256）：`engine: true` 的声明数必须等于 ENGINE_SKIP_BASELINE。
 *
 * 存在的理由是分层：全量变异退到阶段闸之后，那条**运行时**核对一个阶段
 * 才生效一次，而 #135 的 M222 漏抬正是这一类漏网（master 连红 18 次 4 天）。
 * 这道门是静态的，随 --verify 进 npm test，每次三项自检都查。
 *
 * 声明会不会长草？不会——全量模式交叉核对声明与实测（见 verdict_problems），
 * 声明多了少了、标错了哪一条，都在那里当场红。
 */
function gate_engine_declared(entries, args) {
  // 只对真条目表生效。夹具用 --ledger-dir 换一份自造条目表，那份与
  // ENGINE_SKIP_BASELINE 没有关系；把 --skip-baseline 拿来当这道门的
  // 期望值是错的（那是**运行时**跳过数的覆盖开关，不是声明数），
  // 首版这么写，当场打死了夹具用例 8。
  if (args.ledger_dir !== DEFAULT_LEDGER_DIR) return [];
  // 并行子进程（--slice）跑的是父进程副本里的条目表，路径恰好等于它自己的
  // DEFAULT_LEDGER_DIR——于是上面那条豁免对它失效。这道门属于父进程：父进程
  // 在 spawn 之前已经对真条目表跑过全套门（main 里的 run_gates），子进程再跑
  // 一遍不增加信息，却会让「父进程换了表」的情形在副本里当场撞门（#304）。
  if (args.slice !== undefined) return [];
  const declared = entries.filter((m) => m.engine === true).length;
  return declared === ENGINE_SKIP_BASELINE
    ? []
    : [
        `engine: true 的声明数 ${declared} ≠ ENGINE_SKIP_BASELINE ${ENGINE_SKIP_BASELINE}` +
          `——新条目若只被引擎比对用例守护，它在 CI 上只被「跳过」覆盖，` +
          `改这两个数字前想清楚`,
      ];
}

function run_gates(shards, entries, args) {
  const errors = [
    ...gate_shape(entries),
    ...gate_count(shards),
    ...gate_targets(args.root, entries),
    ...gate_test_files(args.root, entries),
    ...gate_engine_declared(entries, args),
  ];
  for (const e of errors) {
    console.log(`✗ 门：${e}`);
  }
  return errors.length === 0;
}

// —— 引擎在场判定（默认与 test/helpers/engine-bundle.js 同款回落；
//    --asar 显式指路时不再回落，指 none 或所指不存在 = 无引擎）——

/** 候选位置与 test/helpers/engine-bundle.js 同款，逐条理由见那里的注释；
 *  漂移由 test/asar-candidates.test.js 判红。
 *
 *  **并行模式尤其依赖后三条绝对路径**：COPY_DENY 把 ere-4.8.0-win-x64 排除在
 *  副本外（见那里的注释），子进程在副本里跑，仓库内那条必然落空。少了它们，
 *  有引擎的机器上 --jobs 会得到「引擎在场却有 N 条按跳过处理」而整体判红。 */
const ASAR_CANDIDATES = (root) =>
  [
    process.env.ERE_ENGINE_ASAR,
    path.join(root, 'ere-4.8.0-win-x64', 'resources', 'app.asar'),
    path.join(os.homedir(), '.era-engine', 'app.asar'),
    '/mnt/d/Code/era/ere-4.8.0-win-x64/resources/app.asar',
    'D:\\Code\\era\\ere-4.8.0-win-x64\\resources\\app.asar',
  ].filter(Boolean);

function locate_asar(root, explicit) {
  if (explicit) {
    if (explicit === 'none') {
      return undefined;
    }
    return fs.existsSync(explicit) ? explicit : undefined;
  }
  // env 的 none 与 --asar none 同款语义（显式无引擎）：绝对路径回落进来之后，
  // 单靠 `env -u ERE_ENGINE_ASAR` 已经造不出无引擎环境了
  if (process.env.ERE_ENGINE_ASAR === 'none') {
    return undefined;
  }
  return ASAR_CANDIDATES(root).find((c) => fs.existsSync(c));
}

// —— 单条执行（就地变异 + 还原 + 还原读回校验）——

/**
 * 孙进程环境消毒：node --test 给测试文件传 NODE_TEST_CONTEXT，原样漏进
 * 再起的 node --test 会让后者误入「测试子进程上报模式」、静默退 0——
 * 快速模式（npm test 内驱动本工具，工具再起 node --test）必踩，红不了
 * 还会被误判成误报通过。所有内部 spawn 一律剔掉 NODE_TEST* 键。
 */
function clean_env() {
  const env = { ...process.env };
  for (const key of Object.keys(env)) {
    if (key.startsWith('NODE_TEST')) {
      delete env[key];
    }
  }
  return env;
}

let active_restore = null; // { full, original }：SIGINT 兜底还原
process.on('SIGINT', () => {
  if (active_restore) {
    try {
      fs.writeFileSync(active_restore.full, active_restore.original, 'utf8');
    } catch {
      /* 尽力而为；中断后先 git status 再谈别的（#89 教训） */
    }
  }
  process.exit(130);
});

/**
 * 单条分类是**纯输出判定**（不掺环境）：依赖引擎的测试整组绿 + 输出含缺引擎
 * 警告 = engine-skip。「引擎在场时跳过必须为 0」的否决权全部集中在
 * verdict_problems——分类与判定分离后，这条不变量从 CLI 可观测、可测
 * （#89 二次验收的探针 G：判定若被抽样档短路，行为锁当场红）。真实
 * 跑动里父进程与子测试的引擎判定总是一致，两侧行为不变；只有 --asar
 * 错配（父进程说有引擎、子测试看不到）的夹具形态会走到「在场却跳过」，
 * 由 verdict 拦下。
 *
 * @returns {'caught'|'miss'|'engine-skip'|'find-mismatch'|'restore-fail'}
 */
function run_one(root, m) {
  const full = path.join(root, m.file);
  const original = fs.readFileSync(full, 'utf8');
  const count = original.split(m.find).length - 1;
  if (count !== 1) {
    console.log(
      `✗ [${stable_id(m.desc)}] ${m.desc} — find 出现 ${count} 次（要求恰 1 次），先修正条目表`,
    );
    return 'find-mismatch';
  }
  active_restore = { full, original };
  let failed_as_expected = false;
  let output = '';
  try {
    fs.writeFileSync(full, original.replace(m.find, m.replace), 'utf8');
    const files = m.tests.map((t) => `test/${t}.test.js`);
    const run_tests = (extra) =>
      spawnSync(process.execPath, ['--test', ...extra, ...files], {
        cwd: root,
        encoding: 'utf8',
        maxBuffer: 16 * 1024 * 1024,
        env: clean_env(),
      });
    // 先只跑 must_mention 点名的那个用例（#242）。条目表的主流写法就是
    // 「must_mention 逐字等于测试名」，所以这个模式通常恰好命中一条，
    // 而整份测试文件在口上票里已经涨到几百个用例：K11 实测跑全文 5.9s、
    // 只跑一条 0.35s，`--files ere/kojo/kojo-k11-lily.js` 从 51 分钟落到 3 分钟。
    //
    // **判定不会因此变松**：只有「过滤跑已经红了」才走快路，其余一律照旧
    // 重跑全文再判。模式一条也没匹配上时 node --test 退 0（实测），于是
    // 同样落回全文——最坏情况等于今天的行为多花 0.2 秒。
    //
    // `test_name` 是给「must_mention 是运行期拼出来的断言消息」用的逃生口：
    // 表驱动的条目常把档位号插进消息里（`第 ${i + 1} 档推进`），源码里没有
    // 这个字面量，模式必然落空。写上所在用例的名字，这类条目也能走快路。
    const pattern = m.test_name || m.must_mention;
    let run = pattern
      ? run_tests([`--test-name-pattern=${escape_regexp(pattern)}`])
      : null;
    if (!run || run.status === 0) run = run_tests([]);
    output = `${run.stdout || ''}${run.stderr || ''}`;
    if (run.status !== 0) {
      failed_as_expected = true;
    }
  } finally {
    fs.writeFileSync(full, original, 'utf8');
  }
  if (fs.readFileSync(full, 'utf8') !== original) {
    console.log(`✗ [${stable_id(m.desc)}] ${m.desc} — 还原失败（读回不一致）`);
    active_restore = null;
    return 'restore-fail';
  }
  active_restore = null;
  const saw_named_failure = output.includes(m.must_mention);
  if (failed_as_expected && saw_named_failure) {
    // 反向的交叉核对：无引擎处仍被拦下，说明它不是「只被引擎用例守护」，
    // 声明过时了。有引擎时不判——那时所有条目都拦得下，判不出信息。
    if (m.engine === true && output.includes(ENGINE_WARN_MARKER)) {
      console.log(
        `✗ [${stable_id(m.desc)}] ${m.desc} — 声明了 engine: true，实测无引擎也拦得下（声明过时）`,
      );
      return 'miss';
    }
    console.log(
      `✓ [${stable_id(m.desc)}] ${m.desc} — 红=true 命中「${m.must_mention}」=true`,
    );
    return 'caught';
  }
  if (!failed_as_expected && output.includes(ENGINE_WARN_MARKER)) {
    // 交叉核对（#256）：实测「只被引擎用例守护」的条目，必须已经声明
    // engine: true。门 4 只数得出声明的**个数**，数对了但标错了哪一条，
    // 只有这里能看见。
    if (m.engine !== true) {
      console.log(
        `✗ [${stable_id(m.desc)}] ${m.desc} — 实测只被引擎用例守护，却没声明 engine: true`,
      );
      return 'miss';
    }
    console.log(
      `⏭ [${stable_id(m.desc)}] ${m.desc} — 跳过（依赖引擎的测试绿 + 缺引擎警告）`,
    );
    return 'engine-skip';
  }
  console.log(
    `✗ [${stable_id(m.desc)}] ${m.desc} — 红=${failed_as_expected} 命中「${m.must_mention}」=${saw_named_failure}`,
  );
  return 'miss';
}

// —— 执行模式 ——

/**
 * 相对 base 的改动文件（含未提交与未跟踪）。与 tools/select-tests.mjs 的
 * changed_files 同款口径——两个工具对「什么算改动」的理解必须一致，
 * 否则会出现「选择器选中了某测试、定向变异却不跑对应条目」的错位。
 */
function changed_files(root, base) {
  const run = (a) => {
    const r = spawnSync('git', a, { cwd: root, encoding: 'utf8' });
    if (r.status !== 0) {
      throw new Error(`git ${a.join(' ')} 失败：${(r.stderr || '').trim()}`);
    }
    return r.stdout;
  };
  const mb = run(['merge-base', base, 'HEAD']).trim();
  return new Set(
    `${run(['diff', '--name-only', mb])}\n${run(['ls-files', '--others', '--exclude-standard'])}`
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean),
  );
}

function select_entries(entries, args) {
  if (args.ids) {
    const picked = entries.filter((m) => {
      const n = extract_m_number(m.desc);
      return n !== null && args.ids.has(Number(n));
    });
    // 点名了却一条都没命中 = 编号写错或条目还没加。静默跑 0 条是这道工具
    // 最不该有的行为（选少了还不说），所以当场报错退出。
    const missing = [...args.ids].filter(
      (n) => !picked.some((m) => Number(extract_m_number(m.desc)) === n),
    );
    if (missing.length > 0) {
      throw new ArgError(
        `✗ --ids 里这些编号在条目表里不存在：${missing.map((n) => `M${n}`).join(', ')}`,
      );
    }
    return picked;
  }
  if (args.files || args.base) {
    const files = args.files
      ? new Set(args.files)
      : changed_files(args.root, args.base);
    return entries.filter((m) => files.has(m.file));
  }
  if (args.slice) {
    const [i, k] = args.slice;
    return entries.filter((m) => desc_rank(m.desc) % k === i);
  }
  if (args.sample !== undefined) {
    return [...entries]
      .sort(
        (a, b) =>
          desc_rank(`${args.seed}:${a.desc}`) -
          desc_rank(`${args.seed}:${b.desc}`),
      )
      .slice(0, args.sample);
  }
  return entries;
}

/**
 * 串行执行。**每条之前让出一次事件循环**（#321）：整段都是 spawnSync，
 * 循环不转，排队的 SIGINT 就永远派发不到那个「中断时先把靶文件还原」的
 * 处理器上——实测 kill -INT 之后 21 秒仍在跑，靶文件停在变异态，最后只能
 * 硬杀再 git checkout 手工还原。而并行档用隔离副本、根本不碰主工作树，
 * 于是那个处理器唯一真正需要生效的场合，恰好是它到不了的那个。
 */
async function execute(entries, args) {
  const tally = { caught: 0, skipped: 0, red: 0 };
  for (const m of select_entries(entries, args)) {
    await new Promise((resolve) => setImmediate(resolve));
    const r = run_one(args.root, m);
    if (r === 'caught') tally.caught += 1;
    else if (r === 'engine-skip') tally.skipped += 1;
    else tally.red += 1;
  }
  return tally;
}

/**
 * 本轮是否只执行条目表的一个子集（抽样 / 切片 / 定向）。
 *
 * **新的子集档位必须加进这里**：ENGINE_SKIP_BASELINE 是全量模式的不变量，
 * 子集没有期望跳过数，漏加会让定向模式在无引擎处必然假红。
 */
function is_partial(args) {
  return (
    args.sample !== undefined ||
    args.slice !== undefined ||
    args.files !== undefined ||
    args.ids !== undefined ||
    args.base !== undefined
  );
}

function verdict_problems(tally, args, engine_present) {
  const problems = [];
  if (tally.red > 0) {
    problems.push(`未被拦截/失配/还原失败共 ${tally.red} 条`);
  }
  if (engine_present) {
    if (tally.skipped > 0) {
      problems.push(`引擎在场却有 ${tally.skipped} 条按「跳过」处理（不允许）`);
    }
  } else if (!is_partial(args) && args.skip_baseline !== 'off') {
    // ENGINE_SKIP_BASELINE 是全量模式的不变量（7/186 恰好依赖引擎）。
    // 抽样/切片是子集，没有「期望跳过数」——抽 12 条命中 7 条依赖引擎的概率
    // 约为零，拿全量基线核对子集必然假红（#89 发回整改的阻断 1：干净
    // Linux 上 --sample 3 三条全拦仍退 1）。子集档不核对；跳过数的核对
    // 由全量模式执行（CI master push / 手动触发 / 本地全量）。
    const baseline =
      args.skip_baseline === undefined
        ? ENGINE_SKIP_BASELINE
        : Number(args.skip_baseline);
    if (tally.skipped !== baseline) {
      problems.push(
        `无引擎跳过 ${tally.skipped} ≠ 基线 ${baseline}` +
          `——依赖引擎的用例覆盖面变了，这个数字必须是有意识的提交`,
      );
    }
  }
  return problems;
}

// —— 子进程原语：捕获输出的 spawn（对照运行与并行子进程共用）——

function spawn_capture(cmd, cmd_args, opts) {
  return new Promise((resolve) => {
    const child = spawn(cmd, cmd_args, {
      ...opts,
      stdio: ['ignore', 'pipe', 'pipe'],
      env: clean_env(),
    });
    let output = '';
    let done = false;
    const add = (d) => {
      output += d;
    };
    child.stdout.on('data', add);
    child.stderr.on('data', add);
    const finish = (code) => {
      if (!done) {
        done = true;
        resolve({ code: code ?? 1, output });
      }
    };
    child.on('exit', finish);
    child.on('error', finish);
  });
}

// —— 并行（隔离临时副本）：主树只读，每个子进程在自己的副本里就地变异 ——

function make_copy(root) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'mutation-copy-'));
  for (const name of fs.readdirSync(root)) {
    if (COPY_DENY.has(name)) {
      continue;
    }
    fs.cpSync(path.join(root, name), path.join(tmp, name), {
      recursive: true,
    });
  }
  return tmp;
}

const SUMMARY_RE = /^SUMMARY caught=(\d+) skipped=(\d+) red=(\d+)$/m;

async function execute_jobs(args) {
  const jobs = args.jobs;
  const copies = [];
  try {
    for (let i = 0; i < jobs; i += 1) {
      copies.push(make_copy(args.root));
    }
    // 每个副本先跑不变异的对照全量（并行）：副本缺文件/环境破损会表现为
    // 测试红，若不先对照，会被误判成「变异被拦截」——误报通过的最大来源
    const controls = await Promise.all(
      copies.map((copy) =>
        spawn_capture(process.execPath, ['--test'], { cwd: copy }),
      ),
    );
    for (let i = 0; i < jobs; i += 1) {
      if (controls[i].code !== 0) {
        console.log(`✗ 副本 ${i} 对照运行即红（副本环境破损，非变异拦截）：`);
        // 先列出失败的测试（not ok / ✖ / 非零 fail 计数），没有再退回
        // 尾部 60 行——对照失败必须能定位到用例，尾 12 行连测试名都露不出
        const lines = controls[i].output.split('\n');
        const failures = lines.filter((l) =>
          /^(not ok|✖|# fail\s+[1-9])/.test(l),
        );
        console.log(
          failures.length > 0
            ? failures.slice(0, 20).join('\n')
            : lines.slice(-60).join('\n'),
        );
        return { caught: 0, skipped: 0, red: 1 };
      }
    }
    // 子进程要继承父进程的条目表与计数基线：只传 --slice 时，子进程会用
    // 默认的 tools/mutations 与内置基线跑——真仓库上恰好一致所以看不出来，
    // 换表/换基线（测试夹具、诊断）就会在副本里当场撞门（#304）。
    // --ledger-dir 落在 root 内时按相对路径改指副本内的同一处。
    const rel_ledger = path.relative(args.root, args.ledger_dir);
    const in_root = rel_ledger !== '' && !rel_ledger.startsWith('..');
    const results = await Promise.all(
      copies.map((copy, i) =>
        spawn_capture(
          process.execPath,
          [
            path.join(copy, 'tools', 'mutation-check.mjs'),
            '--slice',
            String(i),
            String(jobs),
            '--skip-baseline',
            'off',
            '--ledger-dir',
            in_root ? path.join(copy, rel_ledger) : args.ledger_dir,
          ],
          { cwd: copy },
        ),
      ),
    );
    const tally = { caught: 0, skipped: 0, red: 0 };
    results.forEach((r, i) => {
      process.stdout.write(r.output);
      const m = SUMMARY_RE.exec(r.output);
      if (m) {
        // 子进程判红时自己就退 1——那是**它已经报告过的红**，照它的计数
        // 汇总即可。旧写法在 code !== 0 时改记「红 +1」并丢掉整份 caught，
        // 于是一个子进程发现一条红，父进程的拦截数就少掉它那一整片（#304）。
        tally.caught += Number(m[1]);
        tally.skipped += Number(m[2]);
        tally.red += Number(m[3]);
        return;
      }
      // 没有 SUMMARY = 子进程没跑完（崩溃/被杀/参数错）。这时必须报出
      // 足以定位的信息，否则排查一半的成本花在「它到底怎么了」上（#304）。
      tally.red += 1;
      const tail = r.output.split('\n').slice(-25).join('\n');
      console.log(
        `✗ 子进程 ${i} 没有给出可解析的 SUMMARY 行（退出码 ${r.code}）——` +
          `它没跑完，不是判红。末尾 25 行：\n${tail}`,
      );
    });
    return tally;
  } finally {
    for (const copy of copies) {
      fs.rmSync(copy, { recursive: true, force: true });
    }
  }
}

// —— 主流程 ——

async function main() {
  const args = parse_args(process.argv.slice(2));
  const shards = await load_shards(args.ledger_dir);
  const entries = shards.flatMap((s) => s.entries);
  const gates_ok = run_gates(shards, entries, args);
  if (args.verify) {
    if (gates_ok) {
      console.log(
        `✓ 结构校验全绿：${entries.length} 条条目表 / ${shards.length} 个分片，三项检查全过`,
      );
    } else {
      console.log('✗ 结构校验未过（三项检查见上）');
    }
    process.exitCode = gates_ok ? 0 : 1;
    return;
  }
  if (!gates_ok) {
    console.log('✗ 三项检查未过，拒绝执行');
    process.exitCode = 1;
    return;
  }
  const engine_present = Boolean(locate_asar(args.root, args.asar));
  if (!engine_present) {
    console.log(
      '⚠ 未找到引擎 asar：依赖引擎的变异将按「跳过」分类（严格标准须有引擎的本地全量）',
    );
  }
  const started = Date.now();
  const tally =
    args.jobs > 1 ? await execute_jobs(args) : await execute(entries, args);
  const elapsed = ((Date.now() - started) / 1000).toFixed(1);
  const problems = verdict_problems(tally, args, engine_present);
  console.log(
    `\n拦截 ${tally.caught} / 跳过 ${tally.skipped} / 红 ${tally.red} — ${elapsed}s` +
      (problems.length === 0
        ? '（全部变异被测试拦截，无误报通过）'
        : `（存在问题：${problems.join('；')}）`),
  );
  console.log(
    `SUMMARY caught=${tally.caught} skipped=${tally.skipped} red=${tally.red}`,
  );
  process.exitCode = problems.length === 0 ? 0 : 1;
}

main().catch((e) => {
  console.error(e instanceof ArgError ? e.message : e?.stack || e);
  process.exitCode = 1;
});
