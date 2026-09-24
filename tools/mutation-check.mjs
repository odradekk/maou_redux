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
//   - find 必须在靶文件中恰好出现 1 次（失配 = 直接判失败：靶代码被重构、
//     或上次变异被强杀留下了残留，工具当场红而不是静默失守——这条安全性质
//     不许拆；两种成因要做的处置相反，报错里分开写，见 gate_targets）；
//   - tests = 应变红的测试文件名（不含 test/ 前缀与 .test.js 后缀）；
//   - must_mention = 测试输出里必须能找到的片段，证明红的正是被测行为。
//     语义是「输出包含该片段」，不是「只有它红了」——按实义命名
//     （旧名 expect_only 名不副实，#89 改名），必填，无宽松判定。
//   - engine = 该条只被引擎比对用例守护（无引擎处按「跳过」放行）。可选，
//     省略即 false；声明数由门 4 核对，实测由 verdict_problems 交叉核对。
//
// 条目表五项检查（照 #72 domain-check 的两项检查形状，多测试文件存在性、
// 引擎声明数与 must_mention 出处三道）：
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
//   5. must_mention 出处检查（#442）：must_mention 必须能在 tests:/file:/
//      era-fixture.js 的源码里逐字或按模板字面段找到出处，否则该条目在
//      「测试改坏、断言与源码早已脱节」时会被静默放过——这一类漏配此前
//      只能靠一次完整变异跑（约 1.5～2 小时）事后发现（#381）。**这道门查
//      的是「断言与出处对不上」，不是「断言本身有没有区分力」**：出处存在
//      不代表 must_mention 真的只在被测行为触发时才出现在输出里，那一层
//      仍要靠变异跑本身（红没红、命不命中）来验证。少量出处只存在于运行期
//      字符串拼接或条目表以外的文件里（三类成因见 EXEMPT_MUST_MENTION 头
//      注），逐条手工核实后登记豁免，豁免清单只许缩短、不许新增。
//
// 用法：
//   node tools/mutation-check.mjs                        全量（串行，就地变异+还原）
//   node tools/mutation-check.mjs --verify               只跑五项检查（秒级；进 npm test 的快速模式）
//   node tools/mutation-check.mjs --changed              定向：只跑改动文件的条目（SOP 的 T3 票验收档）
//   node tools/mutation-check.mjs --sample 12 --seed N   抽样执行（本地想快速看一眼时用；CI 自 #302 起跑全量）
//   node tools/mutation-check.mjs --jobs 4               隔离副本并行全量（CI 的 master 档 / SOP 的 T4 阶段闸）
//   --jobs K 与筛选参数同给时：--ids/--files/--changed 会下传给副本子进程，
//                             副本数与对照运行按筛选收敛（#553）；串行档下
//                             --slice 与任何筛选取交集（单独给 --slice 仍是
//                             全表切片，行为不变）。--sample 与 --slice 同
//                             --jobs 互斥：抽样的总量、外层的切片都没有副本
//                             表达（副本自按 --slice i k 分摊），同时给当场
//                             报错，不静默换语义、不静默跑整表
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
// 两条与「工作区干净」有关的性质（#532）：
//
//   **`--verify` 全程只读。** 它只读条目表、靶文件与 tests: 声明的出处，
//   不写工作区里的任何一个字节——门全过与门失败两种形态都是（门失败时也
//   不代为还原）。测试用「靶文件置为只读」锁住这条：往里加一次写，Windows
//   上当场 EPERM、Linux 上是 EACCES。反过来，`--verify` 的绿**不等于**工作
//   区干净：它照样读工作区，残留态下给的是假结论（下面那条治它）。
//
//   **启动自检（任何档位，含 --verify）。** 靶文件若停在「HEAD 内容应用了
//   某条变异」的残留态（变异被强杀时 finally 不执行），当场点出 M 编号与
//   还原命令并退出 1，不继续跑——否则后续结果全部不可信。判据、开销与已知
//   盲区见 detect_residue 头注。变异运行自己拉起来的进程跳过这道自检（标记
//   的 root 与自己的相同，那种脏是故意的）：`MUTATION_CHECK_INFLIGHT_ROOT`，
//   见 INFLIGHT_ROOT_ENV 头注。
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
// 不变异的对照——副本缺文件会表现为测试红，不先对照会被误判成
// 「变异被拦截」，是并行模式误报通过的最大来源；对照的范围与执行范围
// 对齐：全量档跑整份测试，筛选档（--ids/--files/--changed 与 --jobs 同给，
// #553）只跑选中条目点名的测试文件。筛选参数随 --slice 一起下传子进程、
// 副本数按选中条数收敛——此前子进程只拿到 --slice，父进程的筛选被静默
// 丢掉，--jobs 2 --ids … 实际是每个副本各跑半张全表（#553 的主题）。
// 子进程输出逐块转发：每完成一条就落一行，外层超时终止时已完成的
// 结果不再跟着「等全部结束才汇总」一起消失。
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
 * 「我正在就地变异这个仓库根」的环境标记（#532）。
 *
 * `run_one` 给测试子进程带上它，值就是它正在变异的 root。启动自检只在标记
 * 与自己的 `--root` 一致时跳过：那条变异是**故意**施加的（测试正要观察被
 * 改坏的工具或靶文件），不是残留。
 *
 * 不加这道口会怎样：靶在本工具自己的文件上时（M733、M9519-M9528 那一批），
 * 变异就是把 `tools/mutation-check.mjs` 写成「HEAD + 该条变异」——而测试里
 * 的 `--verify` 跑在真仓库上，被它拉起来的本工具一看：工作树恰好等于某条的
 * 变异态 → 报残留并拒绝启动。于是这些条目全部变成「无论如何都红」的假守卫
 * （#532 的 `--changed` 实测：M733 直接判红、六条退化成靠断言消息命中），
 * 而它们本来要观察的是门 4/门 5 的行为。
 *
 * 标记按 root 比对，不按「有没有设」：夹具跑的是另一个 root，自检照常生效
 * （`test/mutation-check.test.js` 的 #532 用例锁着两个方向）。
 */
const INFLIGHT_ROOT_ENV = 'MUTATION_CHECK_INFLIGHT_ROOT';

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
    ids: undefined,
    ids_spec: undefined,
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
        .map((s) => s.trim().replaceAll('\\', '/'))
        .filter(Boolean);
    else if (a === '--ids') {
      // 原始串单独留着：并行模式把它原样下传子进程（重建 Set 会把
      // M9100-M9180 这类区间展开成几十个单号，白占命令行）。
      out.ids_spec = String(next());
      out.ids = parse_ids(out.ids_spec);
    } else if (a === '--sample') out.sample = Number(next());
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
      // 0 次有两种成因，且该做的事相反：靶代码被重构了要「同步 find 串」，
      // 上次变异被强杀留下的残留则要「还原」（照着同步 find 串正好把残留
      // 坐实成正式代码——#513 就吃过这一口，见 detect_residue 头注）。
      // 启动自检能认出的那一类在此之前就报了，走到这句的残留多半是它查不
      // 出来的盲区（变异写下时靶文件就带着未提交改动），所以这半句不能省。
      const hint =
        count === 0
          ? `——要么靶代码被重构了（先同步 find 串），要么上次变异被强杀留下了残留` +
            `（先 git diff ${m.file} 核一下，是残留就 git checkout HEAD -- ${m.file}）`
          : `——同一段代码在靶文件里出现多次，替换目标有歧义，先同步 find 串再跑`;
      errors.push(
        `[${m.desc}] find 在 ${m.file} 中出现 ${count} 次（要求恰 1 次）${hint}`,
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

// —— 门 5：must_mention 出处（issue #442）——

/** 反引号模板串的字面段，按 ${...} 切开（不处理嵌套花括号——本仓库测试
 *  文件里未见占位符内再套花括号的写法）。 */
function template_literal_segments(source) {
  const templates = [];
  const re = /`((?:\\.|[^`\\])*)`/g;
  let m;
  while ((m = re.exec(source))) {
    templates.push(m[1].split(/\$\{[^}]*\}/));
  }
  return templates;
}

/** a 的某个非空后缀是否等于 b 的等长前缀（起点段允许被从中间截断）。 */
function suffix_overlaps_prefix(a, b) {
  const max = Math.min(a.length, b.length);
  for (let k = max; k >= 1; k -= 1) {
    if (a.slice(a.length - k) === b.slice(0, k)) return true;
  }
  return false;
}

/** seg 的某个非空前缀是否等于 tail 的等长后缀；tail 为空串时自动满足
 *（must_mention 在这一段开始前已经用完）。 */
function prefix_overlaps_suffix(seg, tail) {
  if (tail === '') return true;
  const max = Math.min(seg.length, tail.length);
  for (let k = max; k >= 1; k -= 1) {
    if (seg.slice(0, k) === tail.slice(tail.length - k)) return true;
  }
  return false;
}

/**
 * must_mention 是否与某个模板串对得上。占位符视为可匹配任意内容的空档；
 * must_mention 未必覆盖模板整句的首尾，起点、终点都可能落在某一段中间，
 * 因此枚举「起点落在哪一段、终点落在哪一段」（段数通常 ≤4，代价可忽略）：
 * 起点段只需后缀重叠、终点段只需前缀重叠，夹在中间、两侧都紧挨占位符的
 * 段没有「被截断」的余地，必须整段出现。
 *
 * 这里是**保守**版本：起点段与 must_mention 完全无重叠（即整个起点段落在
 * 占位符运行期取值内部，例如 `威望 ${p}（${tier}）...` 里 must_mention 从
 * ${tier} 的取值中段起跳）时一律不算命中——量测阶段试过放开这道 guard，
 * 结果把「出处根本不在模板里」的条目（如 M92，见 EXEMPT_MUST_MENTION）也
 * 判成命中：任何以某段字面文字结尾的字符串都会被判定为「与该模板对得上」，
 * 与占位符运行期实际取的值无关。按 #431 的准则（宁可窄而能报警，不可宽而
 * 永远不报警），这里保留更保守、可能漏判的版本；漏判的残留个案进
 * EXEMPT_MUST_MENTION，逐条手工核实，不指望匹配器本身覆盖到。
 */
function matches_template(segments, must_mention) {
  const n = segments.length;
  for (let start = 0; start < n; start += 1) {
    for (let end = start; end < n; end += 1) {
      if (start === end) {
        if (segments[start] !== '' && segments[start].includes(must_mention))
          return true;
        continue;
      }
      if (
        segments[start] !== '' &&
        !suffix_overlaps_prefix(segments[start], must_mention)
      )
        continue;
      let pos = 0;
      if (segments[start] !== '') {
        const max = Math.min(segments[start].length, must_mention.length);
        for (let k = max; k >= 0; k -= 1) {
          if (
            k === 0 ||
            segments[start].slice(segments[start].length - k) ===
              must_mention.slice(0, k)
          ) {
            pos = k;
            break;
          }
        }
      }
      let ok = true;
      for (let mid = start + 1; mid < end; mid += 1) {
        const idx = must_mention.indexOf(segments[mid], pos);
        if (idx === -1) {
          ok = false;
          break;
        }
        pos = idx + segments[mid].length;
      }
      if (!ok) continue;
      const tail = must_mention.slice(pos);
      if (segments[end] === '' || prefix_overlaps_suffix(segments[end], tail))
        return true;
    }
  }
  return false;
}

/** must_mention 逐字或按模板字面段，能否在 content 里找到出处。 */
function must_mention_found(content, must_mention) {
  if (content.includes(must_mention)) return true;
  return template_literal_segments(content).some((segs) =>
    matches_template(segs, must_mention),
  );
}

/**
 * 门 5 的豁免清单（issue #442）：must_mention 逐字 + 模板字面段匹配都在
 * tests:/file:/era-fixture.js 里找不到出处，但逐条手工核对源码后确认并非
 * must_mention 过时——按 M 编号钉住，附一句可核实的理由（含文件:行号）。
 *
 * **只许缩短，不许新增**：新条目落进这份清单前，先确认真的不是过时——
 * 缩短已核实的旧条目须重新量测；不许为了让门 5 变绿而放宽已有条目的
 * must_mention。全表量测（5294 条）结果见 issue #442：逐字匹配不上 524
 * 条，逐字 + 模板字面段都匹配不上的只剩这 16 条，三类成因：
 *   A. 模板字面量插值——must_mention 的边界（通常是结尾）落在占位符的
 *      运行期取值内部，取值前后再无字面文字可供重建，静态展开必然截断，
 *      是 matches_template 的固有局限，不是缺陷（放宽 guard 的后果见
 *      matches_template 头注）。
 *   C. 字符串拼接（+ / .map().join()）拼出最终文本，不是单一模板字面量，
 *      template_literal_segments 只切单个反引号串，切不出跨拼接的边界。
 *   D. must_mention 定义在 tests: 引入的共享库模块里，既不是 file: 目标，
 *      也不是 era-fixture.js，落在门 5 的搜索范围之外。
 */
const EXEMPT_MUST_MENTION = new Map([
  // 类别 A：占位符运行期取值决定匹配边界
  [
    '8341',
    'test/chara-first-exp.test.js:182 `male=${row.male} virgin=${row.virgin}：...`，' +
      'must_mention 结尾停在 ${row.virgin} 取值中间，其后还有字面「：」与第三段占位符',
  ],
  [
    '9054',
    'test/chara-temptation.test.js:428 `档 ${slot}：掷骰上界`，must_mention「档 1」' +
      '止步于 ${slot} 的取值，取值后紧跟的字面「：掷骰上界」够不着',
  ],
  [
    '9055',
    'test/chara-temptation.test.js:434/439/444/449 同款 `档 ${slot}：...` 模板，' +
      'must_mention「档 2」同上，止步于 ${slot} 取值',
  ],
  [
    '9056',
    'test/chara-temptation.test.js 同款 `档 ${slot}：...` 模板，' +
      'must_mention「档 2」同上，止步于 ${slot} 取值',
  ],
  [
    '6758',
    'test/dungeon-magic.test.js:484 `治疗 ${type}：按目标类型...`，' +
      'must_mention「治疗 2」止步于 ${type} 取值',
  ],
  [
    '6759',
    'test/dungeon-magic.test.js:502 `诅咒 ${type}：按目标类型...`，' +
      'must_mention「诅咒 1」止步于 ${type} 取值',
  ],
  [
    '8607',
    'test/event-nextday.test.js:1610 `${label}：RAND:3 = ${roll} → JUEL:L:4`，' +
      'must_mention「RAND:3 = 2」止步于 ${roll} 取值，够不着后面的「 → JUEL:L:4」',
  ],
  [
    '8609',
    'test/event-nextday.test.js:1416 `露+抖M = ${sum} 时的 JUEL:8`，' +
      'must_mention「露+抖M = 8」止步于 ${sum} 取值',
  ],
  [
    '2104',
    'test/page-invasion.test.js:113 `威望 ${prestige}（${tier}）的侵攻度增量`，' +
      'must_mention「略受质疑）的侵攻度增量」从 ${tier} 取值中段起跳，起点段' +
      '「（」与它无字面重叠',
  ],
  [
    '2105',
    'test/page-invasion.test.js:113 同上模板，must_mention「相安无事）的侵攻度增量」同样从 ${tier} 取值中段起跳',
  ],
  [
    '2106',
    'test/page-invasion.test.js:113 同上模板，must_mention「广受爱戴）的侵攻度增量」同样从 ${tier} 取值中段起跳',
  ],
  [
    '784',
    'test/com-order.test.js:162 `T 系数 = ${factor}（含素质段双计）`，' +
      'must_mention「T 系数 = 4」止步于 ${factor} 取值，够不着「（含素质段双计）」',
  ],
  // 类别 C：字符串拼接，非单一模板字面量可重建
  [
    '1773',
    'test/kojo-family-wiring.test.js:111-114 的 format_missing(label, missing)：' +
      "`${label}漏装：` + missing.map(...).join('；')，must_mention「主启动图漏装：" +
      'kojo-k4-stoic」横跨模板串与数组 join 的拼接边界',
  ],
  [
    '3328',
    'test/kojo-family-wiring.test.js:111-114 同一个 format_missing()，' +
      'must_mention「主启动图漏装：kojo-k13-protector」同样横跨拼接边界',
  ],
  [
    '1521',
    'test/kojo-family-wiring.test.js:111-114 同一个 format_missing()，' +
      'must_mention「主启动图漏装：kojo-k5-mao」同样横跨拼接边界',
  ],
  // 类别 D：出处在 tests: 引入的共享库模块里，不在 file:/era-fixture.js 范围内
  [
    '92',
    'must_mention「比对窗口不完整」定义在 tools/compare/normalize.js:421 的' +
      'window_between_inputs()，由 test/compare-first-turn.test.js 用 ' +
      "require('../tools/compare/normalize') 引入——既非 file: 目标" +
      '（tools/compare/replay.js），也非 era-fixture.js',
  ],
]);

/**
 * 门 5（#442）：must_mention 必须能在它声明的出处——tests: 各文件、file:
 * 靶文件、test/helpers/era-fixture.js——里逐字或按模板字面段找到，否则
 * 判定为「断言与出处脱节」。
 *
 * **这道门查得出什么、查不出什么**：查得出「must_mention 改错、测试文件
 * 改名/删除内容之后断言再也接不上出处」这一类静态可见的脱节；查不出
 * 「must_mention 虽然有出处，但和被测行为其实没关系」——后一层是语义层面
 * 的断言有效性，只有变异真跑一遍、看它红没红、命不命中才验证得了，门 5
 * 不做这个判断，也做不了。
 */
function gate_must_mention_source(root, entries) {
  const errors = [];
  const content_by_file = new Map();
  const read = (rel) => {
    if (!content_by_file.has(rel)) {
      const full = path.join(root, rel);
      content_by_file.set(
        rel,
        fs.existsSync(full) ? fs.readFileSync(full, 'utf8') : null,
      );
    }
    return content_by_file.get(rel);
  };
  const fixture_content = read('test/helpers/era-fixture.js');
  for (const m of entries) {
    if (typeof m.must_mention !== 'string' || !m.must_mention) {
      continue; // gate_shape 已经报过缺 must_mention，这里不重复报
    }
    const num = extract_m_number(m.desc);
    if (num !== null && EXEMPT_MUST_MENTION.has(num)) {
      continue;
    }
    const sources = (Array.isArray(m.tests) ? m.tests : [])
      .map((t) => read(`test/${t}.test.js`))
      .concat([
        typeof m.file === 'string' ? read(m.file) : null,
        fixture_content,
      ])
      .filter((c) => c !== null);
    const found = sources.some((c) => must_mention_found(c, m.must_mention));
    if (!found) {
      errors.push(
        `[${m.desc}] must_mention「${m.must_mention}」在它声明的出处` +
          `（tests:${JSON.stringify(m.tests)} / file:${m.file} / era-fixture.js）` +
          `里都找不到——测试或靶代码是不是改了，断言没跟上？` +
          `确认并非过时后按 EXEMPT_MUST_MENTION 的格式登记豁免并写明理由`,
      );
    }
  }
  return errors;
}

function run_gates(shards, entries, args) {
  const errors = [
    ...gate_shape(entries),
    ...gate_count(shards),
    ...gate_targets(args.root, entries),
    ...gate_test_files(args.root, entries),
    ...gate_engine_declared(entries, args),
    ...gate_must_mention_source(args.root, entries),
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
 *  **并行模式尤其依赖 ~/.era-engine 那条**：COPY_DENY 把 ere-4.8.0-win-x64
 *  排除在副本外（见那里的注释），子进程在副本里跑，仓库内那条必然落空。少了
 *  它，有引擎的机器上 --jobs 会得到「引擎在场却有 N 条按跳过处理」而整体判红。 */
const ASAR_CANDIDATES = (root) =>
  [
    process.env.ERE_ENGINE_ASAR,
    path.join(root, 'ere-4.8.0-win-x64', 'resources', 'app.asar'),
    path.join(os.homedir(), '.era-engine', 'app.asar'),
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
 * 应用一条变异：把 content 里唯一那次 find 换成 replace。
 *
 * **必须只有这一份实现**：`run_one` 用它写下去，#532 的残留自检
 * （detect_residue）用它算「残留该长什么样」。两边一旦分家——比如自检改用
 * split/join 拼——`String.replace` 对 `$&`、`$'`、`$$` 的展开差异就会让
 * 判定悄悄漏掉既非逐字也非模板的形态（1246 条条目的 find、1056 条的
 * replace 里带 `$`），而漏判的正是这个工单要治的那类残留。
 */
function apply_mutation(content, m) {
  return content.replace(m.find, m.replace);
}

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

/**
 * 还原写入的瞬态失败重试（#553）：Windows 上杀毒扫描、索引服务或尚未退尽
 * 的子进程会短暂占住靶文件，writeFileSync 抛 UNKNOWN/EBUSY/EPERM——#541
 * 一晚三次还原失败即红，同一批条目之后逐条单独重跑全部正常，占不住。
 * 重试几次、每次短暂同步等待；重试尽仍失败由调用方报出 M 编号与还原命令
 * 后停止执行（残留下后续每一条的判定都不可信）。
 *
 * 同步等待用 Atomics.wait：run_one 整段是 spawnSync 的同步上下文，setTimeout
 * 要事件循环转起来才派发，等不起也说不清顺序。
 */
const RESTORE_WRITE_TRIES = 5;
const RESTORE_RETRY_DELAYS_MS = [200, 400, 800, 1600];
const RESTORE_RETRY_CODES = new Set(['UNKNOWN', 'EBUSY', 'EPERM']);

/**
 * 测试钩子（#553）：前 N 次还原写入确定性抛指定错误码（`N` 或 `N:CODE`，
 * 默认 UNKNOWN）。真实的文件占用造不出来（不该让测试依赖 Windows 的占用
 * 行为），注入失败次数才能确定地走到「重试后成功」与「重试尽仍失败」
 * 两条分支；错误码可指定，三个可重试码才都能被测到（审查发现 6）。计数
 * 按进程内的还原写入累计；仅测试设置，真实运行不碰。
 */
const RESTORE_FAIL_FIRST_ENV = 'MUTATION_CHECK_RESTORE_FAIL_FIRST';
const fail_spec = /^(\d+)(?::([A-Z]+))?$/.exec(
  process.env[RESTORE_FAIL_FIRST_ENV] || '',
);
let restore_fail_budget = fail_spec ? Number(fail_spec[1]) : 0;
const restore_fail_code = fail_spec?.[2] ?? 'UNKNOWN';

/** 同步等待 ms 毫秒（Atomics.wait 在主线程上除等待外无副作用）。 */
function sync_sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

/**
 * 写回靶文件原文，瞬态失败按 RESTORE_RETRY_DELAYS_MS 重试。
 *
 * @returns {undefined|{error: Error, tries: number}} 成功返回 undefined；
 *   失败返回最后一次错误与实际尝试次数（不属可重试码时就是 1 次）。
 *   不抛——调用方要先把 M 编号与还原命令报清楚再决定退出。
 */
function write_restore(full, original, rel) {
  let last;
  let tries = 0;
  for (let attempt = 1; attempt <= RESTORE_WRITE_TRIES; attempt += 1) {
    tries = attempt;
    try {
      if (restore_fail_budget > 0) {
        restore_fail_budget -= 1;
        throw Object.assign(
          new Error(
            `${restore_fail_code}: unknown error (注入), open '${full}'`,
          ),
          { code: restore_fail_code },
        );
      }
      fs.writeFileSync(full, original, 'utf8');
      return undefined;
    } catch (e) {
      last = e;
      if (!RESTORE_RETRY_CODES.has(e.code) || attempt === RESTORE_WRITE_TRIES) {
        return { error: e, tries };
      }
      console.log(
        `⚠ 还原写入第 ${attempt} 次失败（${e.code}），` +
          `${RESTORE_RETRY_DELAYS_MS[attempt - 1]}ms 后重试：${rel}`,
      );
      sync_sleep(RESTORE_RETRY_DELAYS_MS[attempt - 1]);
    }
  }
  return { error: last, tries };
}

/**
 * 靶文件可能停在变异态时的统一报告（#553）：点名条目与按 git 状态给出的
 * 还原建议，首两行的格式与 #532 启动自检一致；打印后由 execute 停止后续
 * 条目。
 *
 * 还原建议分三种（审查发现 2）：`git checkout HEAD --` 只在「变异前的原文
 * 恰等于 HEAD 内容」时才无损——否则会连未提交改动一起删掉（同一张票既改
 * 靶文件又跑它的变异条目是常态，这种残留还落在 #536 记录的自检盲区里，
 * 这份报告是用户唯一能看到的提示）。非 git 根（并行模式的隔离副本、临时
 * 夹具）取不到 HEAD，另给一套说法。
 */
function report_dirty_target(root, m, original, headline) {
  const num = extract_m_number(m.desc);
  const which = num === null ? '某条' : `M${num}`;
  console.log(`✗ [${stable_id(m.desc)}] ${m.desc} — ${headline}`);
  console.log(`    ${m.file} 可能停在 ${which} 的变异态，后续条目不再执行`);
  const head = git_head_content(root, m.file);
  if (head !== null && head === original) {
    console.log(
      `    还原：先 git diff ${m.file} 核对，是残留就 git checkout HEAD -- ${m.file}`,
    );
  } else if (head === null) {
    console.log(
      `    还原：${m.file} 不在 git 管理下（并行模式的隔离副本或临时夹具）——` +
        `若是副本，主工作树没有被改动；其余情况按该条条目把 replace 换回 find`,
    );
  } else {
    console.log(
      `    还原：${m.file} 变异前就有未提交改动，git checkout 会连它一起删掉——` +
        `先 git diff 核对，再按该条条目把 replace 换回 find（只回退这次变异）`,
    );
  }
}

let active_restore = null; // { root, full, original, m }：SIGINT 兜底还原
process.on('SIGINT', () => {
  if (active_restore) {
    const r = write_restore(
      active_restore.full,
      active_restore.original,
      active_restore.m.file,
    );
    if (r) {
      report_dirty_target(
        active_restore.root,
        active_restore.m,
        active_restore.original,
        `中断时还原失败（尝试 ${r.tries} 次仍 ${r.error.code}）`,
      );
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
  active_restore = { root, full, original, m };
  let failed_as_expected = false;
  let output = '';
  let restore_error;
  try {
    fs.writeFileSync(full, apply_mutation(original, m), 'utf8');
    const files = m.tests.map((t) => `test/${t}.test.js`);
    const run_tests = (extra) =>
      spawnSync(
        process.execPath,
        ['--test', '--test-concurrency=4', ...extra, ...files],
        {
          cwd: root,
          encoding: 'utf8',
          maxBuffer: 16 * 1024 * 1024,
          // 标记挂在 env 上，不经命令行：测试里再拉起来的本工具也要拿到它
          // （见 INFLIGHT_ROOT_ENV 头注）。
          env: { ...clean_env(), [INFLIGHT_ROOT_ENV]: root },
        },
      );
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
    restore_error = write_restore(full, original, m.file);
  }
  if (restore_error) {
    // 还原写不回去：靶文件停在变异态，残留下后面每一条的判定都不可信，
    // 报出 M 编号与还原建议后由 execute 停止（#553）。此前这里直接把
    // 异常抛出去：栈打到顶层、剩余条目全部不跑，还原命令只能自己猜。
    report_dirty_target(
      root,
      m,
      original,
      `还原写入失败（尝试 ${restore_error.tries} 次仍 ${restore_error.error.code}）`,
    );
    active_restore = null;
    return 'restore-fail';
  }
  if (fs.readFileSync(full, 'utf8') !== original) {
    report_dirty_target(root, m, original, '还原失败（读回不一致）');
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
 * 相对 base 的改动文件（含未提交与未跟踪），供 --changed 过滤条目。
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
  let picked = entries;
  if (args.ids) {
    picked = entries.filter((m) => {
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
  } else if (args.files || args.base) {
    const files = args.files
      ? new Set(args.files)
      : changed_files(args.root, args.base);
    picked = entries.filter((m) => files.has(m.file));
  } else if (args.sample !== undefined) {
    picked = [...entries]
      .sort(
        (a, b) =>
          desc_rank(`${args.seed}:${a.desc}`) -
          desc_rank(`${args.seed}:${b.desc}`),
      )
      .slice(0, args.sample);
  }
  // --slice 一律最后施加、与上面的筛选取交集（#553 起不再互相短路）：
  // 并行模式的子进程拿到的就是「筛选 ∩ 切片」，单独给某个参数时行为不变。
  if (args.slice) {
    const [i, k] = args.slice;
    picked = picked.filter((m) => desc_rank(m.desc) % k === i);
  }
  return picked;
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
    // 还原失败 = 靶文件停在变异态：继续跑只会把残留读成「原文」，后面
    // 每一条的判定都不可信，当场停（#553；报告在 run_one 里已打印）。
    if (r === 'restore-fail') break;
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
    const { on_chunk, ...spawn_opts } = opts ?? {};
    const child = spawn(cmd, cmd_args, {
      ...spawn_opts,
      stdio: ['ignore', 'pipe', 'pipe'],
      env: clean_env(),
    });
    let output = '';
    let done = false;
    const add = (d) => {
      output += d;
      // 逐块转发（#553）：并行模式的子进程每完成一条就落一行到父进程的
      // 日志，外层超时终止时已完成的结果不再跟着「等全部结束才汇总」消失。
      if (on_chunk) on_chunk(d);
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

async function execute_jobs(args, entries) {
  // --sample 与 --jobs 互斥（#553）：抽样要的是「总量 N 条」，副本各自抽样
  // 会变成 N×K 条；而父进程选出的样本（含无 M 编号的老条目）没有能经 CLI
  // 下传子进程的表达。与其静默换语义，不如当场报错。
  if (args.sample !== undefined) {
    throw new ArgError(
      '✗ --sample 与 --jobs 不能同时用：抽样要的是总量 N 条，' +
        '副本各自抽样会变成 N×K 条。快速抽查请用串行 --sample',
    );
  }
  // --slice 与 --jobs 同样互斥（审查发现 1）：--jobs 自带切片分工（副本按
  // --slice i k 分摊），外层再给 --slice 只会被静默丢掉——CI 上复现某个红
  // 分片时很自然会写 `--slice 3 8 --jobs 2`，那会跑完整表而不是那一片。
  if (args.slice !== undefined) {
    throw new ArgError(
      '✗ --slice 与 --jobs 不能同时用：--jobs 的副本自己按 --slice i k 分摊，' +
        '外层 --slice 会被丢掉。单跑某一片请用串行 --slice i k',
    );
  }
  // 父进程先把筛选选一遍（#553 前筛选参数不进副本，--jobs K --ids … 实际
  // 跑整表切片）：缺号/git 失败趁建副本之前报；副本数按选中条数收敛；
  // 筛选档对照运行跑哪些测试文件也由它决定。切片在这里剥掉——它属于
  // 子进程的分工（「筛选 ∩ 切片」），父进程要的是完整的筛选结果。
  const filtered = Boolean(args.ids || args.files || args.base);
  const selection = select_entries(entries, { ...args, slice: undefined });
  if (filtered && selection.length === 0) {
    console.log('▶ 筛选后 0 条，无变异可跑（未建副本）');
    return { caught: 0, skipped: 0, red: 0 };
  }
  const jobs = filtered
    ? Math.max(1, Math.min(args.jobs, selection.length))
    : args.jobs;
  // 子进程继承父进程的筛选：--changed/--base 的文件清单取自 selection（真树
  // 上算过一次，副本里没有 .git、子进程自己算不了；只传有条目的文件，几十
  // 个在命令行上限内）。--slice 与筛选在 select_entries 尾部取交集，每个副本
  // 只跑自己那一片。--asar 不下传：副本经 ~/.era-engine 自行定位，与父
  // 进程的默认路径一致（#304 同款约定）。
  let filter_args = [];
  if (args.ids !== undefined) {
    filter_args = ['--ids', args.ids_spec ?? [...args.ids].join(',')];
  } else if (args.files || args.base) {
    const files = [...new Set(selection.map((m) => m.file))];
    filter_args = ['--files', files.join(',')];
  }
  if (filtered) {
    console.log(
      `▶ 并行模式：筛选后 ${selection.length} 条，${jobs} 个副本（--slice 与筛选取交集）`,
    );
  }
  const copies = [];
  try {
    for (let i = 0; i < jobs; i += 1) {
      copies.push(make_copy(args.root));
    }
    // 每个副本先跑不变异的对照（并行）：副本缺文件/环境破损会表现为
    // 测试红，若不先对照，会被误判成「变异被拦截」——误报通过的最大来源。
    // 对照范围与执行范围对齐（#553）：全量档跑整份测试（#304 起的行为，
    // CI 的 mutation 分片走的就是这条路）；筛选档只跑选中条目点名的测试
    // 文件——对照要守的就是「判这些变异红绿的那批测试」，其余测试在副本
    // 里红不红与判定无关，而不收窄的话 --jobs --ids 每个副本都要先白跑
    // 一遍全量，筛选档就没有可用性。selection 非空时它至少有一个文件。
    const control_files = [
      ...new Set(
        selection.flatMap((m) => m.tests.map((t) => `test/${t}.test.js`)),
      ),
    ];
    const controls = await Promise.all(
      copies.map((copy) =>
        spawn_capture(
          process.execPath,
          [
            '--test',
            '--test-concurrency=4',
            ...(filtered ? control_files : []),
          ],
          { cwd: copy },
        ),
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
    const in_root =
      rel_ledger !== '' &&
      !path.isAbsolute(rel_ledger) &&
      rel_ledger !== '..' &&
      !rel_ledger.startsWith(`..${path.sep}`);
    const results = await Promise.all(
      copies.map((copy, i) =>
        spawn_capture(
          process.execPath,
          [
            path.join(copy, 'tools', 'mutation-check.mjs'),
            ...filter_args,
            '--slice',
            String(i),
            String(jobs),
            '--skip-baseline',
            'off',
            '--ledger-dir',
            in_root ? path.join(copy, rel_ledger) : args.ledger_dir,
          ],
          { cwd: copy, on_chunk: (d) => process.stdout.write(d) },
        ),
      ),
    );
    const tally = { caught: 0, skipped: 0, red: 0 };
    results.forEach((r, i) => {
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
      // 输出此前已逐块转发进本进程日志，这里再贴一次末尾 25 行，让崩溃
      // 诊断不用回头翻整份流水。
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
      // maxRetries：副本里被占住的文件（正是本票治的那类 Windows 占用）会让
      // 无重试的 rmSync 在 finally 里抛错——覆盖已算好的汇总、剩下的副本也
      // 不再清理（审查发现 8）。
      fs.rmSync(copy, {
        recursive: true,
        force: true,
        maxRetries: 10,
        retryDelay: 200,
      });
    }
  }
}

// —— 主流程 ——

/**
 * 与 HEAD 不一致的文件集（含已暂存）；**非 git 仓库返回 null**（自检跳过）。
 *
 * 路径按仓库根解析（cwd = root），与 changed_files 的假定一致。
 */
function git_dirty_files(root) {
  const r = spawnSync('git', ['diff', '--name-only', 'HEAD'], {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 16 * 1024 * 1024,
  });
  if (r.error || r.status !== 0) {
    return null;
  }
  return new Set(
    r.stdout
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean),
  );
}

/** HEAD 里那份文件的内容；HEAD 里没有（新增文件）取不到时返回 null */
function git_head_content(root, rel) {
  const r = spawnSync('git', ['show', `HEAD:${rel}`], {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 16 * 1024 * 1024,
  });
  return !r.error && r.status === 0 ? r.stdout : null;
}

/**
 * 启动自检（#532）：找出**停在变异态**的靶文件——工作树内容恰等于「HEAD
 * 内容应用了某条变异」的结果。
 *
 * 为什么要有它：变异被强杀（`run-node` 到点 `taskkill /T /F`、Ctrl+C 后的
 * 硬杀）时 `finally` 不执行，靶文件就留在那一态（#493/#500/#505/#513 一晚
 * 四次）。而这一路**不能指望门 2 兜底**：
 *
 *   - 门 2 只查 find 恰 1 次。6077 条里有 38 条的 replace 仍含 find（往
 *     函数体开头插一句 `return 0;` 的那一类，如 M6882），残留之后 find
 *     照样恰 1 次——门全绿、真树也全绿，肉眼与 CI 都看不出来，#513 的
 *     M11069 因此被误提交过一次（66bc345）。
 *   - 查得出来的那 6000 多条，门 2 报的是「find 出现 0 次」并提示两种成因
 *     （同步 find 串 / 还原）。只按前一种做——把 find 串改成残留后的样子
 *     ——正好把残留坐实成正式代码。
 *
 * 判据因此做成**恒等**的，而不是「与 HEAD 不一致」：后者会把开发流程整个
 * 卡死（同票既改靶文件又给它加变异条目是常态，#530 就是这么跑的），也会
 * 让并行副本与临时夹具全部跑不起来。
 *
 * 代价（#532 实测，Windows）：与 HEAD 干净的树上一次 `git diff --name-only
 * HEAD` 90～110 ms（Linux 更便宜），`--verify` 全程 2371 ms 里占约 4%；每个
 * 不一致的靶文件再加一次 `git show HEAD:<file>`；每条候选条目一次整串恒等
 * 判定。最坏形态是口上那种「正被改的大文件 × 它的近千条条目」：1.2 MB ×
 * 961 条实测 564 ms（一次进程一次，不是每条变异一次）。试过两条更便宜的
 * 前置（长度差、`startsWith(replace, i)`）能压到 122～215 ms，但
 * `String.replace` 会展开 replace 里的 `$&`/`$'`/`$$`（1056 条条目的
 * replace 带 `$`），这两条前置对这些条目不成立——拿它们当判据会漏判残留，
 * 正是本工单要治的，故保留整串判定。
 *
 * 取不到 git 时（非 git 仓库、临时夹具、并行模式的隔离副本——COPY_DENY
 * 把 `.git` 排除在副本外）整段跳过：副本里的变异由父进程在真树上查过。
 *
 * **查得出来的与查不出来的（#532 规范/需求审查各点了一次）**：判据拿 HEAD
 * 当基准，因此只在「变异写下时靶文件恰与 HEAD 一致」时成立。两种情形**查
 * 不出来**，都属已知盲区，本票不治：
 *
 *   - 靶文件当时就带着未提交改动（开发常态：同票既改靶文件、又跑打它的
 *     变异条目，SOP §2 的内环）。残留 = 那份工作树内容 + 变异，与
 *     「HEAD + 变异」不等。这一路只剩门 2 的「find 出现 0 次」在喊，而
 *     38 条 replace 含 find 的条目连它也不喊。
 *   - 靶文件还没进 HEAD（新文件，`git show HEAD:<file>` 取不到）——同上。
 *
 * 根治的办法是让 `run_one` 事前留痕：写下变异前把原文另存一份、`finally`
 * 删掉，被强杀时备份还在，于是「基准是什么」有了答案，判定对任意脏工作树
 * 都成立。那要新增一份状态文件（位置、陈旧备份、并发同名——本仓库常有多
 * 个 agent 同时跑），是一次独立的改动，建议另开票（#532 完成评论里记了）。
 *
 * @returns {null|Array<{file: string, desc: string, number: string|null}>}
 *   null = 无从查起（非 git 仓库）；数组 = 命中（可能为空）
 */
function detect_residue(root, entries) {
  const dirty = git_dirty_files(root);
  if (dirty === null) return null;
  const by_file = new Map();
  for (const m of entries) {
    if (typeof m.file !== 'string' || !dirty.has(m.file)) continue;
    if (!by_file.has(m.file)) by_file.set(m.file, []);
    by_file.get(m.file).push(m);
  }
  const findings = [];
  for (const [file, candidates] of by_file) {
    const full = path.join(root, file);
    if (!fs.existsSync(full)) continue;
    const working = fs.readFileSync(full, 'utf8');
    const head = git_head_content(root, file);
    // HEAD 里取不到这份文件（新增文件只进了索引、还没提交）：无从定义
    // 「HEAD 内容应用该条变异」，这条靶文件跳过。
    if (head === null) continue;
    for (const m of candidates) {
      // 前置条件与门 2 同一判据：HEAD 里 find 恰 1 次。不恰 1 次说明这条
      // 的靶代码早就重构过（门 2 会报），不能拿它推残留。
      if (head.split(m.find).length - 1 !== 1) continue;
      if (apply_mutation(head, m) === working) {
        findings.push({
          file,
          desc: m.desc,
          number: extract_m_number(m.desc),
        });
      }
    }
  }
  return findings;
}

/** 只报不修：还原由人决定（工单方向是「脏了立刻发现」，不是「脏了之后自动修」） */
function report_residue(findings) {
  for (const f of findings) {
    const which = f.number === null ? '某条' : `M${f.number}`;
    console.log(
      `✗ 启动自检：${f.file} 停在 ${which} 的变异态` +
        `——工作树内容 = HEAD 内容应用该条变异的结果`,
    );
    console.log(`    ${f.desc}`);
    console.log(`    还原：git checkout HEAD -- ${f.file}`);
  }
}

async function main() {
  const args = parse_args(process.argv.slice(2));
  const shards = await load_shards(args.ledger_dir);
  const entries = shards.flatMap((s) => s.entries);
  // 自检排在门之前：残留态下门 2 那句「find 出现 0 次」会把人引向改 find
  // 串——那正好把残留坐实。自检先说清是残留、怎么还原，这一路才走不到那句
  // 误导上。所有模式都查（含 --verify：它同样读工作区，残留态下「结构校验
  // 全绿」是个假结论）。
  //
  // 唯一的例外是「我正因为某个变异运行而被拉起来，而那个变异打的正是我
  // 这个 root」——那种脏是故意的，见 INFLIGHT_ROOT_ENV 头注。标记按 root
  // 比对：夹具跑了别的 root 就照常查。
  const inflight = process.env[INFLIGHT_ROOT_ENV];
  const residue =
    inflight && path.resolve(inflight) === args.root
      ? null
      : detect_residue(args.root, entries);
  if (residue !== null && residue.length > 0) {
    report_residue(residue);
    console.log(
      '✗ 靶文件带着残留，拒绝执行：残留态下测试对着已改坏的源码跑，' +
        '后续结果全部不可信（按上面的命令还原后重跑）',
    );
    process.exitCode = 1;
    return;
  }
  const gates_ok = run_gates(shards, entries, args);
  if (args.verify) {
    if (gates_ok) {
      console.log(
        `✓ 结构校验全绿：${entries.length} 条条目表 / ${shards.length} 个分片，五项检查全过`,
      );
    } else {
      console.log('✗ 结构校验未过（五项检查见上）');
    }
    process.exitCode = gates_ok ? 0 : 1;
    return;
  }
  if (!gates_ok) {
    console.log('✗ 五项检查未过，拒绝执行');
    process.exitCode = 1;
    return;
  }
  // --files 零匹配要当场报错；判断看**切片前**的筛选结果（审查发现 4）：
  // 文件名拼错时无论带不带 --slice 都要报，而并行子进程带着的 --slice 只是
  // 分摊（父进程已确认清单选得中条目），分到空片是正常分工不是写错。
  if (
    args.files &&
    select_entries(entries, { ...args, slice: undefined }).length === 0
  ) {
    throw new ArgError(
      `✗ --files 没有命中任何变异条目：${args.files.join(', ')}`,
    );
  }
  const engine_present = Boolean(locate_asar(args.root, args.asar));
  if (!engine_present) {
    console.log(
      '⚠ 未找到引擎 asar：依赖引擎的变异将按「跳过」分类（严格标准须有引擎的本地全量）',
    );
  }
  const started = Date.now();
  const tally =
    args.jobs > 1
      ? await execute_jobs(args, entries)
      : await execute(entries, args);
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
