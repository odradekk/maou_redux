// 变异测试驱动器（issue #44 建立；#89 重构为「条目表 sidecar + 分层执行点」）。
//
// 守什么：测试是否真的守得住它声称守护的行为——把被测代码改坏一小块
// （变异），对应测试必须红；红不了 = 误报通过。它因此是「验证其余检查器
// 真的守得住」的那一个：domain-check / engine-contract-check 等
// 检查器的行为锁各有变异条目钉在条目表里。
//
// 形式（#89 两问之「形式」）：
//   变异记录按目标文件目录分片住在 tools/mutations/*.mjs（加载时动态汇总，
//   新增分片文件即入账，无需登记）。desc 里的 M 编号不人工分配，只作引用
//   基准，但**全表必须唯一**——简报/issue/验收评论里都靠这个号指认一条
//   具体条目，重号让句柄失效（#295；M117 曾被两票撞号，已改正）。唯一性
//   由 gate_shape 随 --verify 秒级核对。引用变异时也可用运行时生成的
//   稳定短号 [M-xxxxxxxx]（desc 内容哈希）或直接引 desc。字段：
//     { desc, file, find, replace, tests, must_mention, engine? }
//   - find 必须在目标文件中恰好出现 1 次（失配 = 直接判失败：目标代码被重构、
//     或上次变异被强杀留下了残留，工具当场红而不是静默失守——这条安全性质
//     不许拆；两种成因要做的处置相反，报错里分开写，见 gate_targets）；
//   - tests = 应变红的测试文件名（不含 test/ 前缀与 .test.js 后缀）；
//   - must_mention = 测试输出里必须能找到的片段，证明红的正是被测行为。
//     语义是「输出包含该片段」，不是「只有它红了」——按实义命名
//     （旧名 expect_only 名不副实，#89 改名），必填，无宽松判定。
//   - engine = 该条只被引擎比对用例守护（无引擎处按「跳过」放行）。可选，
//     省略即 false；声明数由检查 4 核对，实测由 verdict_problems 交叉核对。
//
// 条目表五项检查（照 #72 domain-check 的两项检查形状，多测试文件存在性、
// 引擎声明数与 must_mention 出处三道）：
//   1. 计数检查：每个分片的条数必须等于它自己导出的 COUNT——增删条目必须
//      显式改同一份文件里的那个数，搬家丢条目、并表时把别人的条目解析掉，
//      都当场红。这个数**按分片自报**（#367 从单个全局常量改来）：全局常量
//      让每张实施票都改到同一行，一批五张票撞了五次；分片自报之后，声明
//      落在本工单本来就要改的那个分片里，冲突面只剩「两工单同改一分片」，
//      而那种情形条目数组本身也要合并，不多一处代价。
//      整份分片被删仍是盲区（COUNT 随文件一起消失），但那是六百行的删除，
//      不是解析冲突时悄悄少三条——后者才是这道检查真正在守的东西。
//   2. 失配检查：每条 find 在目标文件中恰好 1 次，目标文件必须存在；
//   3. 测试文件检查：tests 引用的 test/<名字>.test.js 必须存在——文件
//      不存在时 node --test 因「找不到文件」退出非 0，形同假拦截。
//   4. 引擎声明检查（#256）：`engine: true` 的条数必须等于 ENGINE_SKIP_
//      BASELINE。只对真条目表生效（--ledger-dir 换表时跳过）。
//   5. must_mention 出处检查（#442）：must_mention 必须能在 tests:/file:/
//      era-fixture.js 的源码里逐字或按模板字面段找到出处，否则该条目在
//      「测试改坏、断言与源码早已脱节」时会被静默放过——这一类漏配此前
//      只能靠一次完整变异跑（约 1.5～2 小时）事后发现（#381）。**这道检查查
//      的是「断言与出处对不上」，不是「断言本身有没有区分力」**：出处存在
//      不代表 must_mention 真的只在被测行为触发时才出现在输出里，那一层
//      仍要靠变异跑本身（红没红、命不命中）来验证。少量出处只存在于运行期
//      字符串拼接或条目表以外的文件里（三类成因见 EXEMPT_MUST_MENTION 头
//      注），逐条手工核实后登记豁免，豁免清单只许缩短、不许新增。
//
// 用法：
//   node tools/mutation-check.mjs                        全量（串行，在隔离副本里逐条变异）
//   node tools/mutation-check.mjs --verify               只跑五项检查（秒级；进 npm test 的快速模式）
//   node tools/mutation-check.mjs --changed              定向：只跑目标文件或测试文件改过的条目（工单验收档）
//   node tools/mutation-check.mjs --sample 12 --seed N   抽样执行（本地想快速看一眼时用；CI 自 #302 起跑全量）
//   node tools/mutation-check.mjs --jobs 4               隔离副本并行全量（CI 的 master 档 / SOP 的 T4 阶段闸）
//   --jobs K 与筛选参数同给时：--ids/--files/--changed 会下传给副本子进程，
//                             副本数与对照运行按筛选收窄（#553）；串行档下
//                             --slice 与任何筛选取交集（单独给 --slice 仍是
//                             全表切片，行为不变）。--sample 与 --slice 同
//                             --jobs 互斥：抽样的总量、外层的切片都没有副本
//                             表达（副本自按 --slice i k 分摊），同时给当场
//                             报错，不静默换语义、不静默跑整表
//   --changed / --base <ref>  按 git 改动过滤：file: 或 tests: 的测试文件改过即选中（默认基线 origin/master）
//   --files a.js,b.js         显式给文件列表，规则同 --changed（不走 git；测试夹具与诊断用）
//   --ids M4246,M4250-M4260   只跑点名的 M 编号（agent 内环用：证明**刚加的**
//                             那几条真能拦。`--files` 会把打同一个目标文件的条目
//                             全跑一遍——K11 有 502 条 × 4.8s ≈ 40 分钟，每加一条
//                             指令就重跑一遍整份，是 #242 实测的主要拖慢来源）。
//                             点名的编号在表里不存在时当场报错，不静默跑 0 条。
//   --root <dir>            变异所在的仓库根（默认本工具的上级；测试夹具用）
//   --ledger-dir <dir>      条目表目录（默认 tools/mutations；测试夹具用）
//   --skip-baseline <n|off> 覆盖无引擎跳过基线（测试夹具与并行子进程用）
//   --slice <i> <k>         只跑 sha1(desc) % k === i 的条目（并行子进程与 CI 分片用）
//   --in-place              直接在 --root 里变异、每条跑完还原，不建副本（并行子进程
//                           与 CI 分片用：它们本来就在用完即弃的目录里）
//   --asar <path|none>      显式指引擎 asar（none = 视为无引擎；给了就不再
//                           三址回落，所指不存在按无引擎处理——测试与诊断
//                           用，与 tools/engine-contract-check.mjs 同款标准）
//
// **工作区不被写入。** 串行档与并行档都在隔离副本里变异（见 execute_in_copy），
// 进程被强制终止时 finally 不执行，留下变异的也只是临时目录里的副本，工作区
// 不会停在某条变异的状态；只有显式给 `--in-place` 才就地改 --root。`--verify`
// 只读条目表、目标文件与 tests: 声明的出处，检查全过与检查失败两种情形都不写
// 工作区（测试用「目标文件置为只读」锁住这条：往里加一次写，Windows 上当场
// EPERM、Linux 上是 EACCES）。任何档位（含 --verify）启动时都会清理 %TEMP%
// 里的陈旧副本，见 clean_stale_copies——临时目录不在「不写」之列。
//
// 退出码：全拦 = 0（无引擎环境下另允许「跳过数恰等于基线」）；任何
// 失配、误报通过、还原失败、副本破损 = 1。测试驱动工具看退出码，不在测试
// 里复制基线（既往检查器的返工教训：规则写在测试里而不在工具里，
// 工具会声称自己在守、退出码却是 0）。
//
// 无引擎环境（CI runner）：变异目标的测试若整组依赖引擎（engine-bundle
// 找不到 asar 时逐用例 skip 并打警告），该条分类为「跳过（依赖引擎的测试绿 +
// 缺引擎警告）」——分类是纯输出判定，不掺环境；总数对 ENGINE_SKIP_
// BASELINE 核对、偏离即红——引擎比对的覆盖面收缩必须是有意识的提交
// （与 test/engine-skip-baseline.txt 同一标准）。
// **核对只在全量模式生效**：基线是全量模式的不变量，抽样/切片/定向子集
// 没有期望跳过数，不核对（见 verdict_problems 与 is_partial）。
// 分层之后（#256）全量只在阶段闸跑，这条运行时核对因此**一个阶段才生效
// 一次**——不够。补偿是把它同时做成**静态声明**：依赖引擎的条目带
// `engine: true`，检查 4 在秒级的 --verify 里核对声明数（于是随 npm test 每
// 次都查），全量模式再交叉核对声明与实测（于是声明不会长草）。
// **引擎在场时跳过数必须为
// 0，任何档位都是硬判**——这条否决权集中在 verdict_problems，与分类
// 分离，行为锁可直接钉（#89 二次验收的探针 G）。CI 的「跳过」仍是弱
// 路径：无引擎处真误报通过分不清，严格标准以有引擎的本地全量为准。
//
// 隔离副本（串行档一份，--jobs K 每个子进程一份）复制仓库根下 COPY_DENY
// 以外的全部条目，主树只读。变异之前先在副本里跑一遍不变异的对照——副本
// 缺文件会表现为测试红，不先对照会被误判成「变异被拦截」，是误报通过的
// 最大来源；对照的范围与执行范围对齐：并行全量档跑整份测试，串行档与并行
// 筛选档（--ids/--files/--changed 与 --jobs 同给，#553）只跑选中条目点名的
// 测试文件。并行档的筛选参数随 --slice 一起下传子进程、
// 副本数按选中条数限定——此前子进程只拿到 --slice，父进程的筛选被静默
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
// 只有 SIGINT 处理器可以用 exit（中断时先把目标文件还原要紧）。
//
// **目标文件写入的瞬态失败重试**（#553 还原、#582 变异，同一个 write_with_retry）：
// Windows 上杀毒扫描、索引服务或尚未退尽的子进程会短暂占住目标文件，
// writeFileSync 抛 UNKNOWN/EBUSY/EPERM——#541 一晚三次即红，同一批条目之后
// 逐条单独重跑全部正常，占不住。重试尽仍失败时两种失败的处置相反：
// 还原失败说明目标文件可能停在变异态，报出 M 编号与还原命令后**停止**整轮
// （残留下后续每一条的判定都不可信）；变异写入失败先读回核对——仍是原文
// （open 阶段就没成）的按「未写入」计红后**跳过该条继续**，文件已被写坏的
// （write 阶段失败、O_TRUNC 已生效）按残留处理、同样停止整轮。
// 两个方向的理由见 report_write_failed 与 run_one 里的读回那一段。
//
// **并行副本的启动清理**（#582）：--jobs 的副本目录在 finally 里删，外层
// `run-node` 超时用 `taskkill /T /F` 结束进程树时 finally 不执行，
// %TEMP%\mutation-copy-* 会累积（#553 时本机 34 个）。启动时清掉「超过
// COPY_STALE_MS 且所有者进程已不在」的旧副本（年龄过 COPY_FORCE_STALE_MS
// 的一律清），判定条件与取舍见 clean_stale_copies。

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
 * 无引擎环境的预期跳过数：变异目标的测试整组依赖引擎的条目数。新变异若
 * 只被引擎比对用例守护，此数会涨——那意味着该变异在 CI 上只被「跳过」
 * 覆盖，改这份常量时想清楚。
 *
 * **这个数字现在有两个核对点**（#256 分层之后）：
 *   - **检查 4（静态，秒级）**：条目表里 `engine: true` 的条数必须等于它。
 *     随 `--verify` 进 `npm test`，每次三项自检都查。加这道检查的理由就是
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
 *   #135 +1：M222（saveFiles 落 _fixed.json——目标用例 resource-media 的
 *           引擎默认形状比对。**当时漏抬，本处补记**）
 *   #138 +2：M243/M245（Chara31 ABL / Chara34 MARK 预设比对——目标用例是
 *           extalent-table 的 engine_test 组；同工单 M240/M241/M244 目标在
 *   #139 +3：M270/M271/M272（Chara150 素質 320 / Chara201 素質 319 /
 *           Chara777 相性段）
 *   #349 +2：M6993/M6994（C_Relation/C_Relation_Sub 名字表经引擎真解析、
 *           建桶、寻址与存档往返）
 */
const ENGINE_SKIP_BASELINE = 27; // #733 +1（M14540：真实引擎通信回归场景漏载 Equip 名字表）；#640 +7（M12870/M12871/M12872/M12874/M12875/M12876 六个新引擎条目 + M7975 改由引擎实证守护）

/** engine-bundle 缺 asar 时的警告前缀（测试输出里据此识别整组跳过） */
const ENGINE_WARN_MARKER = '[engine-bundle] 未找到 ere-4.8.0 的 app.asar';

/**
 * 并行副本不携带的顶层条目（拒绝清单而非白名单：仓库里凡测试可能读到
 * 的数据目录——docs/、ownership/ 等——一律自动入副本；漏带会
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

/** 并行副本目录名的前缀；名字里带创建者的 PID（见 make_copy / clean_stale_copies） */
const COPY_PREFIX = 'mutation-copy-';

/**
 * 从副本目录名里取创建者 PID（make_copy 写进去的那个）；旧格式（没有 PID）
 * 取不到 → null，只能按年龄判。**前缀必须与 COPY_PREFIX 同源**：写死一遍
 * 的话，前缀一改这里就静默失配、清理退化成只看年龄——正是「绝不删活副本」
 * 要防的那种失效。
 */
const COPY_OWNER_RE = new RegExp(`^${COPY_PREFIX}(\\d+)-`);

/**
 * 副本多久没用算陈旧（clean_stale_copies 的年龄判定条件）。本机 `--jobs 2` 全量
 * 约 80 分钟，3 小时给了约两倍余量：慢机器上的长任务副本不能被误删。年龄
 * 判定条件真正管的是两类「探不到主」的副本——老版本留下的（名字里没有 PID）、
 * 以及父进程被强杀后仍在写的孤儿子进程。
 *
 * 注意年龄取的是副本根目录的 mtime，而运行期间的写入都落在子目录里，所以
 * 它实际上是「创建至今」（日志与注释都按这个说，不写「闲置」）。
 */
const COPY_STALE_MS = 3 * 60 * 60 * 1000;

/**
 * 硬上限：过了这个年龄不再探活，一律删（24 小时，约 7 倍于本机全量运行时长）。
 * 为什么需要它：PID 会被回收，死副本名里的号一旦被某个长驻进程占去，
 * process.kill(pid, 0) 就永远成功，那份副本成了永远清不掉的残留——本工单要治
 * 的累积在这些目录上回到原样。代价是一份真跑了 24 小时的副本会被误删，而
 * 那不是本工具的正常情形（外层总有限时）。
 */
const COPY_FORCE_STALE_MS = 24 * 60 * 60 * 1000;

// —— 参数 ——

function parse_args(argv) {
  const out = {
    verify: false,
    sample: undefined,
    seed: '',
    jobs: 1,
    slice: undefined,
    in_place: false,
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
    else if (a === '--in-place') out.in_place = true;
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

/** desc 的内容哈希短号：引用基准 [M-xxxxxxxx]，desc 变则号变，无需人工分配 */
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

/** 条目的引用称呼（报告用）：有 M 编号就用它，老条目退回「某条」 */
function entry_label(m) {
  const num = extract_m_number(m.desc);
  return num === null ? '某条' : `M${num}`;
}

function gate_shape(entries) {
  const errors = [];
  const seen = new Set();
  // M 编号 → 首次见到的 desc（#295）。只钉住「第一次见到」的那条：三方
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
        `${s.name} 没有导出 COUNT——分片必须自报条数，缺了这道检查对它失明`,
      );
      continue;
    }
    if (s.entries.length !== s.declared) {
      const dir =
        s.entries.length > s.declared
          ? `多出 ${s.entries.length - s.declared} 条（新变异入表须同步抬 COUNT）`
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
        errors.push(`[${m.desc}] 目标文件不存在：${m.file}`);
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
      // 0 次有两种成因，且该做的事相反：目标代码被重构了要「同步 find 串」，
      // 上次变异被强杀留下的残留则要「还原」（照着同步 find 串正好把残留
      // 坐实成正式代码，#513 出过这种事）。默认档在副本里变异，工作区只有
      // 显式 --in-place 的运行被强杀才会留下残留，但那一路仍在，这半句不能省。
      const hint =
        count === 0
          ? `——要么目标代码被重构了（先同步 find 串），要么上次变异被强杀留下了残留` +
            `（先 git diff ${m.file} 核一下，是残留就 git checkout HEAD -- ${m.file}）`
          : `——同一段代码在目标文件里出现多次，替换目标有歧义，先同步 find 串再跑`;
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
 * 检查 4（#256）：`engine: true` 的声明数必须等于 ENGINE_SKIP_BASELINE。
 *
 * 存在的理由是分层：全量变异退到阶段闸之后，那条**运行时**核对一个阶段
 * 才生效一次，而 #135 的 M222 漏抬正是这一类漏网（master 连红 18 次 4 天）。
 * 这道检查是静态的，随 --verify 进 npm test，每次三项自检都查。
 *
 * 声明会不会长草？不会——全量模式交叉核对声明与实测（见 verdict_problems），
 * 声明多了少了、标错了哪一条，都在那里当场红。
 */
function gate_engine_declared(entries, args) {
  // 只对真条目表生效。夹具用 --ledger-dir 换一份自造条目表，那份与
  // ENGINE_SKIP_BASELINE 没有关系；把 --skip-baseline 拿来当这道检查的
  // 期望值是错的（那是**运行时**跳过数的覆盖开关，不是声明数），
  // 首版这么写，当场打死了夹具用例 8。
  if (args.ledger_dir !== DEFAULT_LEDGER_DIR) return [];
  // 并行子进程（--slice）跑的是父进程副本里的条目表，路径恰好等于它自己的
  // DEFAULT_LEDGER_DIR——于是上面那条豁免对它失效。这道检查属于父进程：父进程
  // 在 spawn 之前已经对真条目表跑过全套检查（main 里的 run_gates），子进程再跑
  // 一遍不增加信息，却会让「父进程换了表」的情形在副本里当场失败（#304）。
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

// —— 检查 5：must_mention 出处（issue #442）——

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
  // 只有占位符、没有一个字面字符的模板串（如 `${heart(1)}`）能「匹配」任意文字，
  // 不能当出处（C10 验收时 M3312 就是这样漏过的）
  return template_literal_segments(content)
    .filter((segs) => segs.some((s) => s !== ''))
    .some((segs) => matches_template(segs, must_mention));
}

/**
 * 检查 5 的豁免清单（issue #442）：must_mention 逐字 + 模板字面段匹配都在
 * tests:/file:/era-fixture.js 里找不到出处，但逐条手工核对源码后确认并非
 * must_mention 过时——按 M 编号钉住，附一句可核实的理由（含文件:行号）。
 *
 * **只许缩短，不许新增**：新条目落进这份清单前，先确认真的不是过时——
 * 缩短已核实的旧条目须重新量测；不许为了让检查 5 变绿而放宽已有条目的
 * must_mention。全表量测（5294 条）结果见 issue #442：逐字匹配不上 524
 * 条，逐字 + 模板字面段都匹配不上的只剩这 16 条，三类成因：
 *   A. 模板字面量插值——must_mention 的边界（通常是结尾）落在占位符的
 *      运行期取值内部，取值前后再无字面文字可供重建，静态展开必然截断，
 *      是 matches_template 的固有局限，不是缺陷（放宽 guard 的后果见
 *      matches_template 头注）。
 *   C. 字符串拼接（+ / .map().join()）拼出最终文本，不是单一模板字面量，
 *      template_literal_segments 只切单个反引号串，切不出跨拼接的边界。
 *   D. must_mention 定义在 tests: 引入的共享库模块里，既不是 file: 目标，
 *      也不是 era-fixture.js，落在检查 5 的搜索范围之外。
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
  [
    '2120',
    'test/top-level-wiring.test.js:584 `顶层 require：${rel}:${r.line} → ${r.target}`，must_mention「顶层 require：ere/system/train/com-tentacle.js」止步于 ${rel} 取值',
  ],
  [
    '8301',
    'test/look.test.js:1014 的用例标题 `look_set 素质 ${talent_idx}：${note}`，must_mention「look_set 素质 300」止步于 ${talent_idx} 取值',
  ],
  [
    '12708',
    'test/kojo-dungeon-ravish-man.test.js:406/433/461/487 的 `… → 整行「${line}」`，must_mention「整行「兽人的阴茎插进了」止步于 ${line} 取值中间',
  ],
  [
    '12709',
    'test/kojo-dungeon-ravish-man.test.js 同款 `… → 整行「${line}」`，must_mention「整行「兽人们把润滑液涂在了」止步于 ${line} 取值中间',
  ],
  [
    '12713',
    'test/kojo-dungeon-ravish.test.js:554 的 `… → 整行「${line}」`，must_mention「整行「四肢着地趴在地上」止步于 ${line} 取值中间，其后的字面「」」够不着',
  ],
  [
    '12715',
    'test/kojo-dungeon-ravish.test.js:616 的 `… → 整行「${line}」`，must_mention「整行「无头骑士的冒险者身体被固定住了」止步于 ${line} 取值中间，其后的字面「」」够不着',
  ],
  [
    '12719',
    'test/kojo-dungeon-ravish.test.js:723 的 `… → 整行「${line}」`，must_mention「整行「兽人的阴茎插进了」止步于 ${line} 取值中间，其后的字面「」」够不着',
  ],
  [
    '12720',
    'test/kojo-dungeon-ravish.test.js:750 的 `… → 整行「${line}」`，must_mention「整行「兽人们把润滑液涂在了」止步于 ${line} 取值中间，其后的字面「」」够不着',
  ],
  [
    '12724',
    'test/kojo-dungeon-ravish.test.js:861 的 `… → 整行「${line}」`，must_mention「整行「紫色的长舌头」止步于 ${line} 取值中间，其后的字面「」」够不着',
  ],
  [
    '12725',
    'test/kojo-dungeon-ravish.test.js:887 的 `… → 整行「${line}」`，must_mention「整行「紫色的长舌头」止步于 ${line} 取值中间，其后的字面「」」够不着',
  ],
  [
    '12726',
    'test/kojo-dungeon-ravish.test.js:913 的 `… → 整行「${line}」`，must_mention「整行「紫色的手」止步于 ${line} 取值中间，其后的字面「」」够不着',
  ],
  [
    '12727',
    'test/kojo-dungeon-ravish.test.js:932 的 `… → 整行「${line}」`，must_mention「→ 整行「『这边的穴」止步于 ${line} 取值中间，其后的字面「」」够不着',
  ],
  [
    '12746',
    'test/kojo-dungeon-ravish.test.js:594 的 `… → 整行「${line}」`，must_mention「→ 整行「脸上的神情为屈服的喜悦与口水所浸染……」止步于 ${line} 取值中间，其后的字面「」」够不着',
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
  // 类别 D：出处在共享测试助手里，不在检查范围内
  [
    '12129',
    'test/helpers/blank-lines.js:104 的 `${label}：末尾是真空行（不许删）`，must_mention「W < 5 废人支的收尾：末尾是真空行」由共享助手拼出，助手不在 tests:/file: 范围内',
  ],
  [
    '12127',
    'test/helpers/blank-lines.js:54 的 `${label}：这一行之后是真空行（不许删）`，must_mention「处置菜单末项：这一行之后是真空行」由共享助手拼出，助手不在 tests:/file: 范围内',
  ],
]);

/**
 * 检查 5（#442）：must_mention 必须能在它声明的出处——tests: 各文件、file:
 * 目标文件、test/helpers/era-fixture.js——里逐字或按模板字面段找到，否则
 * 判定为「断言与出处脱节」。
 *
 * **这道检查查得出什么、查不出什么**：查得出「must_mention 改错、测试文件
 * 改名/删除内容之后断言再也接不上出处」这一类静态可见的脱节；查不出
 * 「must_mention 虽然有出处，但和被测行为其实没关系」——后一层是语义层面
 * 的断言有效性，只有变异真跑一遍、看它红没红、命不命中才验证得了，检查 5
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
          `里都找不到——测试或目标代码是不是改了，断言没跟上？` +
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
    console.log(`✗ 检查：${e}`);
  }
  return errors.length === 0;
}

// —— 引擎在场判定（默认与 test/helpers/engine-bundle.js 同款回落；
//    --asar 显式指路时不再回落，指 none 或所指不存在 = 无引擎）——

/** 候选位置与 test/helpers/engine-bundle.js 同款，逐条理由见那里的注释；
 *  不一致由 test/asar-candidates.test.js 判红。
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
 * 应用一条变异：把 content 里唯一那次 find 换成 replace。`String.replace`
 * 会展开 replace 里的 `$&`、`$'`、`$$`（1056 条条目的 replace 带 `$`），所以
 * 写下去的字节不一定等于条目表里的字面 replace。
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
 * 目标文件写入（变异 / 还原共用）的瞬态失败重试（#553 还原、#582 变异）：
 * Windows 上杀毒扫描、索引服务或尚未退尽的子进程会短暂占住目标文件，
 * writeFileSync 抛 UNKNOWN/EBUSY/EPERM——#541 一晚三次还原失败即红，同一批
 * 条目之后逐条单独重跑全部正常，占不住。重试几次、每次短暂同步等待；重试尽
 * 仍失败由调用方决定怎么办（两个写点的处置相反，见 run_one 的两处头注）。
 *
 * 同步等待用 Atomics.wait：run_one 整段是 spawnSync 的同步上下文，setTimeout
 * 要事件循环转起来才派发，等不起也说不清顺序。
 */
const WRITE_RETRY_TRIES = 5;
const WRITE_RETRY_DELAYS_MS = [200, 400, 800, 1600];
const WRITE_RETRY_CODES = new Set(['UNKNOWN', 'EBUSY', 'EPERM']);

/**
 * 测试钩子（#553/#582）：前 N 次写入确定性抛指定错误码（`N` 或 `N:CODE`，
 * 默认 UNKNOWN）。真实的文件占用造不出来（不该让测试依赖 Windows 的占用
 * 行为），注入失败次数才能确定地走到「重试后成功」与「重试尽仍失败」
 * 两条分支；错误码可指定，三个可重试码才都能被测到（审查发现 6）。计数
 * 按进程内的写入累计；仅测试设置，真实运行不碰。
 *
 * **变异与还原各一份预算**（#582）：混在一个计数器里，测试就没法只让变异
 * 写入失败（还原跟着一起失败会把结论带偏），也没法在一条预算用尽之后让
 * 后面的条目照常写下去（「跳过本条、后续继续」正是这样判的）。
 *
 * 第三种写法 `N:CODE:DIRTY`（#582 审查轮）在抛错前**先把内容写下去**，模拟
 * 「open 成功之后才失败」——那一情形下 O_TRUNC 已经生效，目标文件被清空或
 * 半写；写入失败后「仍是原文」的读回实测分支只有它能走到（注入点在
 * writeFileSync 之前抛，正常情形测不到）。
 */
function fail_budget(env_name) {
  const spec = /^(\d+)(?::([A-Z]+))?(?::(DIRTY))?$/.exec(
    process.env[env_name] || '',
  );
  return {
    left: spec ? Number(spec[1]) : 0,
    code: spec?.[2] ?? 'UNKNOWN',
    dirty: spec?.[3] !== undefined,
  };
}
const RESTORE_FAIL_FIRST_ENV = 'MUTATION_CHECK_RESTORE_FAIL_FIRST';
const MUTATE_FAIL_FIRST_ENV = 'MUTATION_CHECK_MUTATE_FAIL_FIRST';
const restore_fail = fail_budget(RESTORE_FAIL_FIRST_ENV);
const mutate_fail = fail_budget(MUTATE_FAIL_FIRST_ENV);

/** 同步等待 ms 毫秒（Atomics.wait 在主线程上除等待外无副作用）。 */
function sync_sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

/**
 * 写目标文件，瞬态失败按 WRITE_RETRY_DELAYS_MS 重试。
 *
 * `content` 是要写进去的内容（变异态或原文），`rel` 是报错用的仓库相对路径，
 * `label` 只进日志（'变异写入' / '还原写入'，两处写点据此区分），`budget`
 * 是本写点的注入预算（见 fail_budget）。
 *
 * @returns {undefined|{error: Error, tries: number}} 成功返回 undefined；
 *   失败返回最后一次错误与实际尝试次数（不属可重试码时就是 1 次）。
 *   不抛——调用方要先把 M 编号与处置办法报清楚再决定继续还是停止。
 */
function write_with_retry(full, content, rel, budget, label) {
  let last;
  let tries = 0;
  for (let attempt = 1; attempt <= WRITE_RETRY_TRIES; attempt += 1) {
    tries = attempt;
    try {
      if (budget.left > 0) {
        budget.left -= 1;
        // DIRTY：先把内容写下去再抛，模拟「open 成功之后才失败」（见 fail_budget）
        if (budget.dirty) fs.writeFileSync(full, content, 'utf8');
        throw Object.assign(
          new Error(`${budget.code}: unknown error (注入), open '${full}'`),
          { code: budget.code },
        );
      }
      fs.writeFileSync(full, content, 'utf8');
      return undefined;
    } catch (e) {
      last = e;
      if (!WRITE_RETRY_CODES.has(e.code) || attempt === WRITE_RETRY_TRIES) {
        return { error: e, tries };
      }
      console.log(
        `⚠ ${label}第 ${attempt} 次失败（${e.code}），` +
          `${WRITE_RETRY_DELAYS_MS[attempt - 1]}ms 后重试：${rel}`,
      );
      sync_sleep(WRITE_RETRY_DELAYS_MS[attempt - 1]);
    }
  }
  return { error: last, tries };
}

/**
 * 目标文件可能停在变异态时的统一报告（#553）：点名条目（M 编号）、文件与
 * 按 git 状态给出的还原办法；打印后由 execute 停止后续条目。
 *
 * `git checkout` 只在「变异前的原文恰等于 HEAD 内容」时才无损，否则会连未
 * 提交改动一起删掉（同一张工单既改目标文件又跑它的变异条目是常态），所以
 * 按原文与 HEAD 是否一致给两套说法。非 git 根（隔离副本、临时夹具）取不到
 * HEAD，另给一套说法。
 */
function report_dirty_target(root, m, original, headline) {
  const which = entry_label(m);
  console.log(`✗ [${stable_id(m.desc)}] ${m.desc} — ${headline}`);
  console.log(`    ${m.file} 可能停在 ${which} 的变异态，后续条目不再执行`);
  const head = git_head_content(root, m.file);
  if (head !== null && head === original) {
    console.log(
      `    还原：先 git diff ${m.file} 核对，是残留就 git checkout HEAD -- ${m.file}`,
    );
  } else if (head === null) {
    console.log(
      `    还原：${m.file} 不在 git 管理下（隔离副本或临时夹具）——` +
        `若是副本，主工作树没有被改动；其余情况把该条条目的 replace 换回 find` +
        `（replace 里的 $ 会被 String.replace 展开，以原文为准），只回退这次变异`,
    );
  } else {
    console.log(
      `    还原：${m.file} 变异前就有未提交改动，git checkout 会连它一起删掉——` +
        `先 git diff 核对，再把该条条目的 replace 换回 find（只回退这次变异；` +
        `带 $ 的条目以 diff 为准，replace 里的 $ 会被 String.replace 展开）`,
    );
  }
}

/**
 * 变异写入重试尽仍失败的统一报告（#582）：报出条目（M 编号）、文件与错误码，
 * 并说明处置——按「未写入」计红、跳过本条、后续条目继续。
 *
 * **为什么是「跳过并继续」而不是像还原失败那样停止整轮**：可重试的三个码
 * （UNKNOWN/EBUSY/EPERM）都发生在 open 阶段——#541 实测的那次就是
 * `unknown error, open '…'`，而 O_TRUNC 在 open 成功之后才生效，因此
 * 「open 阶段失败」= 一个字节都没写下去，目标文件仍是原文，后续每一条的判定
 * 仍然可信；为一次瞬态占用丢掉整轮（本机全量串行约 80 分钟）不划算。还原
 * 失败恰恰相反：那时文件可能正停在变异态，继续跑会把残留读成原文，所以
 * 那边必须停（#553）。计红是必须的——这一条的「测试拦得住吗」根本没验证过，
 * 含糊放行就成了一次安静的误报通过。
 *
 * **这句「仍是原文」是读回实测的，不是推出来的**（#582 审查轮）：write 阶段
 * 的失败（EIO、UNKNOWN 一类同样能出现在 open 之后）会留下截断或半写的文件，
 * 那时再报「仍是原文」就是反的，后面的条目还会把它当原文跑。所以调用方先
 * 读回比对，只有逐字节等于 original 才走这一份报告；不是原文的那一支按
 * 还原失败处理（见 run_one）。
 */
function report_write_failed(m, error) {
  const which = entry_label(m);
  console.log(
    `✗ [${stable_id(m.desc)}] ${m.desc} — 变异写入失败` +
      `（尝试 ${error.tries} 次仍 ${error.error.code}），本条按「未写入」计红`,
  );
  console.log(
    `    ${which} 未写入：${m.file} 仍是原文（已读回核对）；跳过本条，后续条目继续`,
  );
}

let active_restore = null; // { root, full, original, m }：SIGINT 中断时兜住还原
process.on('SIGINT', () => {
  if (active_restore) {
    const r = write_with_retry(
      active_restore.full,
      active_restore.original,
      active_restore.m.file,
      restore_fail,
      '还原写入',
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
 * 错配（父进程说有引擎、子测试看不到）的夹具情形会走到「在场却跳过」，
 * 由 verdict 拦下。
 *
 * @returns {'caught'|'miss'|'engine-skip'|'find-mismatch'|'restore-fail'|'write-fail'}
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
  // 变异写入也走重试（#582）：失败处置与还原相反，见 report_write_failed。
  // 这一步排在 active_restore 之前——open 阶段写不下去时目标文件还是原文，
  // 没有可还原的东西，SIGINT 处理器不该把这条记成「正在变异」。
  const write_error = write_with_retry(
    full,
    apply_mutation(original, m),
    m.file,
    mutate_fail,
    '变异写入',
  );
  if (write_error) {
    // 「仍是原文」必须实测（审查轮）：open 成功之后才失败的写（EIO、磁盘满、
    // Windows 的 UNKNOWN 都可能落在 write 阶段）会把文件截断或半写，那时
    // 继续跑等于拿坏文件当原文。读回比对与还原那一侧同一标准——不一致就按
    // 残留处理：报出还原办法并停止整轮（后续判定都不可信）。
    if (fs.readFileSync(full, 'utf8') !== original) {
      report_dirty_target(
        root,
        m,
        original,
        `变异写入失败（尝试 ${write_error.tries} 次仍 ${write_error.error.code}）且目标文件已不是原文`,
      );
      return 'restore-fail';
    }
    report_write_failed(m, write_error);
    return 'write-fail';
  }
  active_restore = { root, full, original, m };
  let failed_as_expected = false;
  let output = '';
  let restore_error;
  try {
    const files = m.tests.map((t) => `test/${t}.test.js`);
    const run_tests = (extra) =>
      spawnSync(
        process.execPath,
        ['--test', '--test-concurrency=4', ...extra, ...files],
        {
          cwd: root,
          encoding: 'utf8',
          maxBuffer: 16 * 1024 * 1024,
          env: clean_env(),
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
    restore_error = write_with_retry(
      full,
      original,
      m.file,
      restore_fail,
      '还原写入',
    );
  }
  if (restore_error) {
    // 还原写不回去：目标文件停在变异态，残留下后面每一条的判定都不可信，
    // 报出 M 编号与还原建议后由 execute 停止（#553）。此前这里直接把
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
    // engine: true。检查 4 只数得出声明的**个数**，数对了但标错了哪一条，
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

/** --files 给的清单，或 --changed/--base 相对基线的改动文件。 */
function filter_files(args) {
  return args.files ? new Set(args.files) : changed_files(args.root, args.base);
}

/**
 * 条目的目标文件或它引用的测试文件在清单里。只改测试标题、条目自身没改时，
 * 过时的 must_mention 只有实跑才发现，所以引用了改动测试文件的条目也要挑上。
 */
function entry_touches(m, files) {
  return (
    files.has(m.file) || m.tests.some((t) => files.has(`test/${t}.test.js`))
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
    const files = filter_files(args);
    picked = entries.filter((m) => entry_touches(m, files));
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
 * 在 root 里逐条就地变异（root 是隔离副本，或显式 --in-place 给的目录）。
 * **每条之前让出一次事件循环**（#321）：整段都是 spawnSync，循环不转，排队的
 * SIGINT 就永远派发不到那个「中断时先把目标文件还原」的处理器上——实测
 * kill -INT 之后 21 秒仍在跑，目标文件停在变异态。
 */
async function execute(picked, root) {
  const tally = { caught: 0, skipped: 0, red: 0 };
  // 空选集不是「全拦」（#553 审查轮发现 3）：汇总行那句「全部变异被测试
  // 拦截，无误报通过」在 0 条上会被读成「都验证过了」——`--files` 恰好分到
  // 空片、`--ids ''` 两条路都到这里。空片是合法分工（不报错），但要说清。
  if (picked.length === 0) {
    console.log('⚠ 本轮 0 条：筛选/切片后没有可跑的条目（不是「全部被拦截」）');
  }
  for (const m of picked) {
    await new Promise((resolve) => setImmediate(resolve));
    const r = run_one(root, m);
    if (r === 'caught') tally.caught += 1;
    else if (r === 'engine-skip') tally.skipped += 1;
    else tally.red += 1;
    // 还原失败 = 目标文件停在变异态：继续跑只会把残留读成「原文」，后面
    // 每一条的判定都不可信，当场停（#553；报告在 run_one 里已打印）。
    // 变异写入失败（write-fail）相反：一个字节都没写下去，目标文件仍是原文，
    // 计红即可、后续照跑（#582；两边的取舍见 report_write_failed 头注）。
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
    problems.push(`未被拦截/失配/还原失败/变异写入失败共 ${tally.red} 条`);
  }
  if (engine_present) {
    if (tally.skipped > 0) {
      problems.push(`引擎在场却有 ${tally.skipped} 条按「跳过」处理（不允许）`);
    }
  } else if (!is_partial(args) && args.skip_baseline !== 'off') {
    // ENGINE_SKIP_BASELINE 是全量模式的不变量（7/186 恰好依赖引擎）。
    // 抽样/切片是子集，没有「期望跳过数」——抽 12 条命中 7 条依赖引擎的概率
    // 约为零，拿全量基线核对子集必然假红（#89 发回返工的阻断 1：干净
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

// —— 隔离副本：主树只读，变异写在副本里（串行档一份，并行档每个子进程一份）——

/**
 * 建一个隔离副本。**目录名带创建者的 PID**（#582）：启动清理据此判断副本
 * 还有没有主（见 clean_stale_copies），只看年龄会把另一个 agent 正在跑的
 * 长任务副本删掉。
 */
function make_copy(root) {
  const tmp = fs.mkdtempSync(
    path.join(os.tmpdir(), `${COPY_PREFIX}${process.pid}-`),
  );
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

/**
 * 删副本。maxRetries：副本里被占住的文件（Windows 上杀毒、索引或未退尽的
 * 子进程）会让无重试的 rmSync 在 finally 里抛错——覆盖已算好的汇总、剩下
 * 的副本也不再清理（#553 审查发现 8）。
 */
function remove_copy(copy) {
  fs.rmSync(copy, {
    recursive: true,
    force: true,
    maxRetries: 10,
    retryDelay: 200,
  });
}

/** 选中条目点名的测试文件（去重），供对照运行用 */
function tests_of(picked) {
  return [
    ...new Set(picked.flatMap((m) => m.tests.map((t) => `test/${t}.test.js`))),
  ];
}

/**
 * 对照运行没过时的报告：先列出失败的测试（not ok / ✖ / 非零 fail 计数），
 * 没有再退回尾部 60 行——对照失败必须能定位到用例，尾 12 行连测试名都露不出。
 */
function report_control_failure(label, control) {
  console.log(`✗ ${label}对照运行即红（副本环境破损，非变异拦截）：`);
  const lines = control.output.split('\n');
  const failures = lines.filter((l) => /^(not ok|✖|# fail\s+[1-9])/.test(l));
  console.log(
    failures.length > 0
      ? failures.slice(0, 20).join('\n')
      : lines.slice(-60).join('\n'),
  );
}

/**
 * 串行档：建一份隔离副本，先跑选中条目的测试做不变异的对照，再在副本里
 * 逐条变异，最后删掉副本。
 *
 * 不在工作区就地改的原因：进程被强制终止（`run-node` 超时的 `taskkill /T /F`、
 * 硬杀）时 finally 不执行，目标文件会停在变异态；目标文件本来就带着未提交
 * 改动时，残留混在改动里很难认出来（#536）。副本在 Windows 上实测复制约
 * 2.7 秒、删除约 0.7 秒，与每条变异都要跑的测试相比可以忽略。
 *
 * picked 由调用方在真实工作区里选好：--changed 要读 git，副本里没有 .git。
 */
async function execute_in_copy(picked, root) {
  if (picked.length === 0) return execute(picked, root);
  const copy = make_copy(root);
  console.log(`▶ ${picked.length} 条，在隔离副本里跑（先跑一遍对照）：${copy}`);
  try {
    const control = await spawn_capture(
      process.execPath,
      ['--test', '--test-concurrency=4', ...tests_of(picked)],
      { cwd: copy },
    );
    if (control.code !== 0) {
      report_control_failure('副本', control);
      return { caught: 0, skipped: 0, red: 1 };
    }
    return await execute(picked, copy);
  } finally {
    remove_copy(copy);
  }
}

/**
 * 启动时清理陈旧并行副本（#582）。副本目录在 execute_jobs 的 finally 里删，
 * 而外层 `run-node` 超时用 `taskkill /T /F` 结束进程树时 finally 不执行，
 * %TEMP%\mutation-copy-* 就此累积（#553 时本机 34 个）。
 *
 * **两个条件都满足才删**（缺一条都会误删别人的活副本）：
 *   - **年龄**超过 COPY_STALE_MS：覆盖两类探不到主的副本——老版本留下的
 *     （名字里没有 PID，无从探活）与父进程被强杀后仍在写的孤儿子进程
 *     （父进程没了，但副本还在被用）。
 *   - **所有者不在**：目录名里的 PID 用 process.kill(pid, 0) 探活。本机
 *     常有多个 agent 同时跑（AGENTS.md 的并发上限说明），另一个 agent 的
 *     `--jobs` 长任务副本可能已经超过年龄阈值，但它有主，绝不能删。
 *
 * 两条之外还有一条**硬上限**：年龄超过 COPY_FORCE_STALE_MS 一律删，不再探活。
 * 理由是 PID 会被回收——死副本的号一旦被某个长驻进程占去，探活永远成功，
 * 它就成了永远清不掉的残留，正是本工单要治的那件事（22 小时余量远超任何一次
 * 真实运行，见该常量的注释）。
 *
 * 探活返回 EPERM 视为活着（Windows 上探不动不等于不存在），宁可漏删。
 * 删除失败只报不抛：副本里的文件正被占住时 rmSync 会抛，那不该拦住本次
 * 变异运行——报出目录，人可以手工删。
 *
 * 每次启动都清（含 --verify 与副本内的子进程）：它只动临时目录里的副本，
 * 不碰工作区的任何一个字节（--verify 的「只读」限定的是工作区与条目表）。
 */
function clean_stale_copies() {
  let names;
  try {
    names = fs.readdirSync(os.tmpdir());
  } catch {
    return; // 取不到临时目录：没有副本可清，不打断运行
  }
  for (const name of names) {
    if (!name.startsWith(COPY_PREFIX)) continue;
    const dir = path.join(os.tmpdir(), name);
    let age;
    try {
      const stat = fs.statSync(dir);
      if (!stat.isDirectory()) continue;
      age = Date.now() - stat.mtimeMs;
    } catch {
      continue; // 刚被另一个实例删掉，或不是目录
    }
    if (age < COPY_STALE_MS) continue;
    const owner = COPY_OWNER_RE.exec(name);
    if (age < COPY_FORCE_STALE_MS) {
      const owner = COPY_OWNER_RE.exec(name);
      if (owner !== null) {
        try {
          process.kill(Number(owner[1]), 0);
          continue; // 所有者进程还在跑
        } catch (e) {
          if (e?.code === 'EPERM') continue; // 存在但探不动，按活着处理
        }
      }
    }
    try {
      fs.rmSync(dir, {
        recursive: true,
        force: true,
        maxRetries: 10,
        retryDelay: 200,
      });
      console.log(
        `⚠ 清理陈旧并行副本：${dir}` +
          `（已有 ${Math.round(age / 60000)} 分钟，超过 ${COPY_STALE_MS / 60000} 分钟且所有者进程已不在${age >= COPY_FORCE_STALE_MS ? '，或超过硬上限' : ''}）`,
      );
    } catch (e) {
      console.log(
        `⚠ 陈旧并行副本清理失败（${e.code}）：${dir}` +
          `——不影响本次运行，可手工删除`,
      );
    }
  }
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
  // 跑整表切片）：缺号/git 失败趁建副本之前报；副本数按选中条数限定；
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
    // 只传被选中条目用到的那部分清单：子进程按同一规则重选，结果与这里一致
    const files = [...filter_files(args)].filter((f) =>
      selection.some((m) => entry_touches(m, new Set([f]))),
    );
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
    const control_files = tests_of(selection);
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
        report_control_failure(`副本 ${i} `, controls[i]);
        return { caught: 0, skipped: 0, red: 1 };
      }
    }
    // 子进程要继承父进程的条目表与计数基线：只传 --slice 时，子进程会用
    // 默认的 tools/mutations 与内置基线跑——真仓库上恰好一致所以看不出来，
    // 换表/换基线（测试夹具、诊断）就会在副本里当场失败（#304）。
    // --ledger-dir 落在 root 内时按相对路径改指副本内的同一处。子进程已经
    // 在副本里，带 --in-place 直接就地变异，不再各建一份副本。
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
            '--in-place',
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
      remove_copy(copy);
    }
  }
}

// —— 主流程 ——

/** HEAD 里那份文件的内容；HEAD 里没有（新增文件）取不到时返回 null */
function git_head_content(root, rel) {
  const r = spawnSync('git', ['show', `HEAD:${rel}`], {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 16 * 1024 * 1024,
  });
  return !r.error && r.status === 0 ? r.stdout : null;
}

async function main() {
  const args = parse_args(process.argv.slice(2));
  // 陈旧并行副本的清理排在最前：建副本之前清掉，本轮的副本才不会被自己
  // 扫进来（年龄判定条件也轮不到它），而且它只动临时目录、不读条目表（#582）。
  clean_stale_copies();
  const shards = await load_shards(args.ledger_dir);
  const entries = shards.flatMap((s) => s.entries);
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
  let tally;
  if (args.jobs > 1) {
    tally = await execute_jobs(args, entries);
  } else {
    const picked = select_entries(entries, args);
    tally = args.in_place
      ? await execute(picked, args.root)
      : await execute_in_copy(picked, args.root);
  }
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
