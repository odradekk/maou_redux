// 变异测试驱动器（issue #44 建立；#89 重构为「条目表 sidecar + 分层执行点」）。
//
// 守什么：测试是否真的守得住它声称守护的行为——把被测代码改坏一小块
// （变异），对应测试必须红；红不了 = 误报通过。它因此是「验证其余检查器
// 真的守得住」的那一个：trace-check / domain-check / engine-contract-check /
// compare 的行为锁各有变异条目钉在条目表里。
//
// 形态（#89 两问之「形态」）：
//   变异记录按靶文件目录分片住在 tools/mutations/*.mjs（加载时动态汇总，
//   新增分片文件即入账，无需登记）。desc 里的 M 编号是历史惯性编号
//   （M117 曾被两票撞号使用），只作引用锚点保留，不再人工分配——引用
//   变异时用运行时生成的稳定短号 [M-xxxxxxxx]（desc 内容哈希）或直接
//   引 desc。字段：
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
//   1. 计数检查：条目表条数必须等于 LEDGER_COUNT_BASELINE——增删条目必须
//      显式改这份常量，搬家丢条目、悄悄混条目都在版本库差异里看得见；
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
//   node tools/mutation-check.mjs --sample 12 --seed N   抽样执行（CI 的抽样模式）
//   node tools/mutation-check.mjs --jobs 4               隔离副本并行全量（CI 的 master 档 / SOP 的 T4 阶段闸）
//   --changed / --base <ref>  按 git 改动过滤条目的 file:（默认基线 origin/master）
//   --files a.js,b.js         显式给靶文件列表（不走 git；测试夹具与诊断用）
//   --root <dir>            变异所在的仓库根（默认本工具的上级；测试夹具用）
//   --ledger-dir <dir>      条目表目录（默认 tools/mutations；测试夹具用）
//   --baseline <n>          覆盖计数检查基线（测试夹具用）
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

import { spawn, spawnSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { DEFAULT_LEDGER_DIR, load_ledger } from './load-mutations.mjs';

const TOOL_DIR = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_ROOT = path.resolve(TOOL_DIR, '..');

/**
 * 条目表计数基线（门 1）：条数只能通过显式改这份常量来变。
 * 增 = 新变异落地（公告）；减 = 变异被删（也应是公告）。
 * #115 起为 201：+6（M190-M195，日程推进与月份回绕）。
 * #119 起为 217：+3（M197-M199，KYOTEN_EVENT 日循环接线）。
 * #118 起为 226：+9（INVASION_CHECK 五组判据与 ENDING_1 链——page/wrapper
 * 切片的 M196-M198、M203-M204 与 event 切片的 M205-M208）。
 * #120 起为 227：+1（M209 人间界结局判据整支删除——端到端用例的专属靶；
 * M157/M188 的 tests 列表挂进 event-ending-e2e，条数不变）。
 */
// #116 起抬 11（M209-M219，ENDCHECK 全链的行为锁）
// #120 起抬 1（M220，端到端专属靶：人间界结局判据整支删除）
// #129 起为 239：+1（M221，[109] 侵略按钮 accelerator——渲染守卫）。
// #130 起为 240：+1（M179，input 白名单校验——喂未打印按钮值的防线）。
// #133 rebase 到含 #136 的 master 后为 258：master 侧 253（含 #136 的
// M223-M234 十二条）+ 本票 5 条（M235-M239，ownership 文件级归属的优先级/
// 去偏导出/存在性与重复认领守卫/清单-产物互锁；另收紧 M135 的 must_mention——
// 同款文案在宿主多处出现，按 SOP 判据 3 换成用例名独有片段，条数不变）。
// 本票原编号 M223-M227 与 #136 撞号，按 SOP §5.5「后合并那批整体顺延」改号。
// #138 起为 264：+6（M240 ex_talent 登记被删、M241 登记名丢下划线、
// M242 FLAG:26 槽序颠倒、M243 Chara31 ABL 预设改坏、M244 版本轴退回、
// M245 Chara34 MARK 预设段删；M114 的 find 串随 _fixed.json 登记集扩容同步
// 更新，条数不变）。
// #138 追加 +1：M246 版本退回 0（loadData truthy 短路拒档——版本下限
// 文件级用例直接红，无引擎也拦，不进跳过数）。现为 265。
// #148 起为 281：+3（M273 夹具 quit 的 throw 拆回普通返回——G5 镜像本体；
// M274 ere 侧 quit 调用被拆、哨兵复辟；M275 INVASION_CHECK 吞掉 QUIT 异常。
// 另同步 M206/M220 的 find 到 #148 改造后的代码形状，条数不变）。
// #147 起为 288：+7（global 系存档镜像——M276 saveGlobal 盖戳写盘、
// M277 loadGlobal 不匹配 throw、M278 loadGlobal 闸门被换成 truthy 写法、
// M279 resetGlobal 重建、M280 listSaveFiles 对账整体跳过、M281 UNNAMED
// 补名；M282 has_valid_save 的 FILE LOST 前缀分支——#147 点名的无钉住缺口）。
// #147 验收补 +1，现为 289：M283 loadGlobal 闸门换成取反后忠实照抄的 truthy
// 写法。M278 模拟的是漏取反的照抄（闸门整体反向，打死 4 条用例）；两种写法
// 真正分道的取值是 version 0 且下限 0，此前只有对照用例覆盖、无条目钉住。
// #156 起为 293：+4（对拍多样本机制——M284 样本登记表未知名静默回落、
// M285 cli 缺席样本继续走、M286 引用前缀解析退回无前缀正则、M287 样本锚
// 校验焊死）。这批的 M 编号在 rebase 时整体顺延（原 M276-M279 与 #147
// 撞号，SOP §5.5）。
// #149 起为 295：+2（M288 夹具 removeCharacter 只过滤列表、幸存者三段键
// 清理被省；M289 返回值复辟成布尔）。这批 M 编号在 rebase 时顺延（原
// M284/M285 与 #156 撞号，SOP §5.5）。
// #150 起为 298：+3（角色列表顺序语义——M290 getAddedCharacters 退回
// 插入序、M291 getCharactersInTrain 退回插入序、M292 getAllCharacters
// 退回预设表插入序；三条同钉 fixture 的非升序正主用例，升序用例不误伤）。
// #151 起为 301：+3（input 回传值的 getNumber 归一——M293 归一被拆
// （#151 前的真实写法）、M294 归一加 typeof string 守卫、M295 归一换成
// parseInt 截断解析；三条同钉 fixture 的字符串预置正主用例，数字预置的
// 既有用例零误伤）。
// #152 起为 304：+3（调教域表生命周期——M296 beginTrain 重建守卫被拆、
// M297 删表范围收窄到 tflag、M298 resetData 调教态不清；三条各只死
// fixture 的对应用例，单场调教的存量用例零误伤）。
// #161 起为 312：+8（范围 B 对拍——归一化器扩展与样本登记的镜像本体）。
// 本批 M 编号在 rebase 时整体顺延（原 M293-M300 与 #151/#152 撞号，SOP §5.5）。
// #170 起为 315：+3（角色生成管线——M307 CM_STP 的 CFLAG:A:1 = 2 改 3、
// M308 三分叉第一支守卫砍掉 !精英、M309 转发层折叠；三条同钉新宿主
// chara-make，无老宿主代红之虞）。
// #174 起为 333：+18（装备系统 M330-M347——数据表形状锁/逐分支等价/往返
// 拆装六条、行为七条、回合结算接线两条、日循环接线一条、显示后缀一条）。
// 本票 M 号段由派单简报显式隔开（#170 用 M307 起、本票 M330 起），零撞号。
// #171 起为 343：+10（M348-M357，勇者来袭——月末守卫的反向变异、人数
// 上限、恐惧早退、金钱上下限、座標、K_34/GET_ENEMY 的 CFLAG:1、:93 接线、
// 夹具隔离开关）。
// #188 起为 346：+3（简体锁收紧——M370 表外繁体判定器坏、M371 参考集数据
// 删锚点字 贖、M372 归一表目标值映进繁侧；本票 M370 起由派单简报指定，与
// #171 的 M348 号段零撞号）。
// 变异条目计数基线：条目表条数必须与此相等（增删条目 = 显式改这里）。
// #172（H3 迷宫主循环）+14（tools/mutations/dungeon.mjs，M375-M388）。
// #173（H4 ENDING_2 与端到端）+7（event.mjs 的 M440-M445：QUIT 降格 /
// 名字写死 / GAMEOVER 行删 / 横幅末行删 / INPUT 删 / 读键删；dungeon.mjs
// 的 M446：魔王房间演出行删）。
// #184（H15 地下城卖春系统）+4（kojo.mjs 的 M400-M403）。现为 373。
// #175（H6 迷宫战斗）+8（dungeon.mjs 的 M480-M487）。现为 382
// （rebase 相加：master 的 374 + 本票 8）。
// #183（H14 迷宫凌辱男性对象）+5（kojo.mjs 的 M420-M424：同名函数区分、
// %SAVESTR:ARG% 插值承载、史莱姆 BASE 回复、分派缺失、初吻推进）。
// #176（H7 迷宫陷阱）+12（dungeon.mjs 的 M540-M551）。
// #180（H11 迷宫情报与建设）+11（page.mjs 的 M560-M570）。
// #182（H13 迷宫凌辱女性对象）+5（kojo.mjs 的 M488-M492：分派缺失、凌辱
// 畏怖记忆推进、PC_RYOU 处女丧失、逃脱救援回城、胜利凌辱善恶门槛）。
// #181（H12 2D 地下城）+8（dungeon.mjs 的 M580-M587）；返工 +2（M588/M589
// 钉住 DA/DB/DC 引擎表承载不倒退）。
// #179（H10 迷宫日程与战果）+13（dungeon.mjs 的 M620-M632）。
// #185（H16 卖春记录与日志分支）+4（kojo.mjs 的 M520-M523）。

// #177（H8 迷宫房间与设施）+22（dungeon.mjs 的 M600-M619 与 M633/M634：
// 八设施效果各一条 + RESULT 契约 + 建设扩张 + 两条日结算 + 两处原作缺陷
// 反向钉 + 接线两处 + 514 观测锚点自证。M620/M621 与 #179 撞号，验收时
// 改到 M633/M634）。

// #178（H9 城镇与任务）+14（dungeon.mjs 的 M640-M653：借贷还债担保三段、
// 宴会预算不对称、任务受注与报酬结算、两处原作笔误反向钉、TARGET 语义
// 两条）。现为 478。
// #212（J2）+19：M700-M714（首轮）+ 返工 M715-M718（二段寻址守卫
// M715/M716 与存量修复回退 M717/M718；M712 的 find 随三段形态更新，条数不变）
// #211 第三段 +8：M660-M667（登记/回放序列/归因改正/窗口裁切）
// #256（测试验收分层）+3：checkers.mjs 的 M730-M732（选择器的三条保守
// 性质：全局锁恒在 / 兜底退回全量 / 目录探针不退化），再 +2：M733/M734
// （引擎声明的门 4 与逐条交叉核对）。现为 510。
const LEDGER_COUNT_BASELINE = 630; // #214 +26（M760-M786）；#215 +24（M790-M813）；#217 +17（M830-M846）；#216 +40（M870-M909）

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
 * 当前 17 条（#256 用 `ERE_ENGINE_ASAR=none … --asar none --jobs 4` 实测
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
 */
const ENGINE_SKIP_BASELINE = 17;

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
    baseline: LEDGER_COUNT_BASELINE,
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
    else if (a === '--sample') out.sample = Number(next());
    else if (a === '--seed') out.seed = String(next());
    else if (a === '--jobs') out.jobs = Math.max(1, Number(next()));
    else if (a === '--slice')
      out.slice = [Number(argv[(i += 1)]), Number(argv[(i += 1)])];
    else if (a === '--root') out.root = path.resolve(String(next()));
    else if (a === '--ledger-dir')
      out.ledger_dir = path.resolve(String(next()));
    else if (a === '--baseline') out.baseline = Number(next());
    else if (a === '--skip-baseline') out.skip_baseline = String(next());
    else if (a === '--asar') out.asar = String(next());
    else throw new Error(`未知参数：${a}`);
  }
  return out;
}

// —— 条目表装载与稳定短号 ——

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

function gate_shape(entries) {
  const errors = [];
  const seen = new Set();
  for (const m of entries) {
    if (typeof m.desc !== 'string' || !m.desc) {
      errors.push(`条目缺 desc：${JSON.stringify(m).slice(0, 80)}`);
      continue;
    }
    if (seen.has(m.desc)) {
      errors.push(`desc 重复：${m.desc}`);
    }
    seen.add(m.desc);
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

function gate_count(entries, baseline) {
  if (entries.length !== baseline) {
    const dir =
      entries.length > baseline
        ? `多出 ${entries.length - baseline} 条（新变异落地须显式抬基线）`
        : `少了 ${baseline - entries.length} 条（条目丢失或被删，须显式降基线）`;
    return [`条目表条数 ${entries.length} ≠ 基线 ${baseline}：${dir}`];
  }
  return [];
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
  const declared = entries.filter((m) => m.engine === true).length;
  return declared === ENGINE_SKIP_BASELINE
    ? []
    : [
        `engine: true 的声明数 ${declared} ≠ ENGINE_SKIP_BASELINE ${ENGINE_SKIP_BASELINE}` +
          `——新条目若只被引擎比对用例守护，它在 CI 上只被「跳过」覆盖，` +
          `改这两个数字前想清楚`,
      ];
}

function run_gates(entries, args) {
  const errors = [
    ...gate_shape(entries),
    ...gate_count(entries, args.baseline),
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
    const run = spawnSync(process.execPath, ['--test', ...files], {
      cwd: root,
      encoding: 'utf8',
      maxBuffer: 16 * 1024 * 1024,
      env: clean_env(),
    });
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

function execute(entries, args) {
  const tally = { caught: 0, skipped: 0, red: 0 };
  for (const m of select_entries(entries, args)) {
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
          ],
          { cwd: copy },
        ),
      ),
    );
    const tally = { caught: 0, skipped: 0, red: 0 };
    results.forEach((r, i) => {
      process.stdout.write(r.output);
      const m = SUMMARY_RE.exec(r.output);
      if (r.code !== 0 || !m) {
        tally.red += 1;
        if (!m) {
          console.log(`✗ 子进程 ${i} 没有给出可解析的 SUMMARY 行`);
        }
        return;
      }
      tally.caught += Number(m[1]);
      tally.skipped += Number(m[2]);
      tally.red += Number(m[3]);
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
  const entries = await load_ledger(args.ledger_dir);
  const gates_ok = run_gates(entries, args);
  if (args.verify) {
    if (gates_ok) {
      console.log(
        `✓ 结构校验全绿：${entries.length} 条条目表，三项检查全过（计数基线 ${args.baseline}）`,
      );
    } else {
      console.log('✗ 结构校验未过（三项检查见上）');
    }
    process.exit(gates_ok ? 0 : 1);
  }
  if (!gates_ok) {
    console.log('✗ 三项检查未过，拒绝执行');
    process.exit(1);
  }
  const engine_present = Boolean(locate_asar(args.root, args.asar));
  if (!engine_present) {
    console.log(
      '⚠ 未找到引擎 asar：依赖引擎的变异将按「跳过」分类（严格标准须有引擎的本地全量）',
    );
  }
  const started = Date.now();
  const tally =
    args.jobs > 1 ? await execute_jobs(args) : execute(entries, args);
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
  process.exit(problems.length === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error(e?.stack || e);
  process.exit(1);
});
