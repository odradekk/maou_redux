// 内联行号引用校核器（issue #44 验收整改；#48 验收整改起纳入 emuera.log；
// #63 起 ERB 侧补齐同款扫描完整性；#156 起多样本：引用前缀按样本名派生；
// #290 起锚表按 js 文件拆进 tools/trace-refs/，本文件只留校核；
// #298 起量鉴别力：命中 1 处 / 平行复现放行 / 空 PRINTFORM 整行锚放行，
// 其余弱锚冻结成只减不增的基线；#331 起 --coverage 独占模式出移植状态表，
// 判定面在 tools/trace-coverage.mjs）。
//
// 守什么：ere/ 移植文件正文里的 `// :N 原作片段` 注释，以及 #48 起
// tools/compare 等处指向黄金样本 target/emuera.log 的 `log:N` 注释。文件头
// 的「源: 文件 @函数」在历次验收里靠人核对了，但正文内联引用数量大、成片
// 偏移靠人眼查不出来（#44 实测：偏早 2~30 行；#48 实测：emuera.log 引用
// 26/42 处错——数值读对、行号指错，同一款亏）。
//
// 怎么守：输入一张「js 文件 → 源 ERB」映射 + 每条引用的锚（源文件在所引
// 行上应含的内容）。对每条：
//   1. js 文件里必须仍写着这条 `:N`（引用被删/被改，先红在这里）；
//   2. 源文件的第 N..M 行必须命中锚（行号偏移、源文件漂移，红在这里）。
// emuera.log 引用（LOG_REFS）同款两道，外加第三道**扫描完整性**：
//   3. ere/ tools/ test/ 全部 .js/.mjs 里出现的每个 log:N / emuera.log:N
//      （含区间）都必须在 LOG_REFS 登记——新增引用不登记即红，防绕过。
//      #156 起引用可带**样本名前缀**：`<样本名>-log:行号`（如范围 B 的
//      mainmenu-natural-log:行号）。前缀的样本名必须在 SAMPLES（唯一
//      真相源 tools/compare/samples.js，与 cli --sample 共用——两边映射
//      漂移 = 静默错判）登记，引用锚表按样本名分住在 SAMPLE_LOG_REFS，
//      校核目标是该样本名对应的样本文件。**裸 log:N 与 legacy
//      emuera.log:N 恒等价旧样本 target/emuera.log，存量注释一行不改**；
//      不带前缀写新样本的行号，扫描只会拿它去核旧样本（核对目标错位且
//      不报错）——所以新样本引用必须带前缀（#109 裁定）。
// ERB 侧同款第三道（#63 起）：
//   4. ere/ 全部 .js 注释里出现的每个 :N / :N-M 都必须在 FILES 登记或在
//      tools/trace-exempt.mjs 豁免——新增引用静默失守即红（#63 之前，
//      page-main-menu.js 零登记，派单时已知 3 条引用指错、实审得 7 条，
//      两颗贯通验证都没抓到）。引用形态统一定义为「注释内、冒号前不是词字符/点号/花括号的
//      :数字」——覆盖工单指出的三种写法（行尾 `// :N`、块注释 `* :N`、
//      括号 `（:N）`/`(:N)`）及其复合（斜杠链 `:A/:B`、`@函数名 :N`），
//      同时天然排除 `era.get('base:0:0')` 与注释里的 `deltabase:${cid}:0`
//      一类变量寻址（花括号排除 `}:0` 形态）与 `ERB:2` 一类
//      文件名:行号（后者不进锁：改写它会连坐 mutation-check 的 find 串）。
//      代码侧（注释外）一律不扫：三段寻址 `cflag:${id}:1` 无法与引用区分。
// 豁免清单是 #63 冻结的现有待办（未审计、行号对错未知）：只能变短
//   （本工具内嵌 ERB_EXEMPT_BASELINE 基线固定，超基线即红）、不许过期失效
//   （条目对应的 js 引用消失也红）——两条都在本工具里执行，退出码语义
//   对二者同样生效。行号一律以原始文件为准（emuera.log 是 UTF-8 BOM
//   + CRLF，BOM 不占行）。后来者改代码动了引用：把表里的 ref/锚一起更新，
//   锚对着 target/ 原文重新落位——表本身以源文件为准，不以致动者的记忆
//   为准。
//
// #290：FILES / LOG_REFS / SAMPLE_LOG_REFS 按「一个 js 文件一份锚表」落在
// tools/trace-refs/，加载器按目录扫描、新增分片即入账。按域合成不够——
// 二十张口上票全落 kojo.mjs 仍互撞。本文件只留校核。
//
// #298：第 1–2 步只回答「:N 登记了吗、声明切片上能命中吗」，不看锚有没有
// 鉴别力。ENDIF / 裸 PRINTFORMW / 无锚定正则命中几十上百行，行号漂了仍绿
// ——这正是 #44 成片偏移时工具该抓却抓不到的那一类。关键词黑名单永远追
// 不全，所以直接量：把锚拿到源文件**全文**上跑（段级多行锚按单行逐行会
// 得到 0 命中，见 kojo-k10-club.mjs 头注）。判据：
//   - 命中 1 处 = 满分；
//   - 命中 N 处但窗口逐字相同且有正文 = 平行复现，放行（#242：漂移落到
//     内容相同的另一处，无从产生错误绑定）；
//   - 空 PRINTFORM 整行锚 `/^\s*PRINTFORMW\s*$/m` 放行（#235）；
//   - 其余（窗口不同，或窗口无正文）= 弱锚。存量冻结成
//     ANCHOR_QUALITY_BASELINE / ANCHOR_QUALITY_BY_FILE，只减不增——
//     不回头改已合并模块，但让它们再也涨不上去。
// 量法并进第 2 步的现有遍历，不另起扫描。
//
// 默认路径**只量未冻结文件**（#298 验收：合上 K8 后全文量是 master 的 4.2
// 倍、每次 npm test +19s）。ANCHOR_QUALITY_BY_FILE 里的文件存量已冻结，
// 默认不再重算——弱锚涨只可能来自新文件，ENDIF 探针也是新文件。
// `--anchor-quality` 打印本次量到的分布；`--anchor-quality --all` 才全文量
// 并核对总基线（消化弱锚后基线一并改小）。完成报告用带 `--all` 的那条。
//
// #513 起第 1 步再绑一层源：内联 :N 按最近的「源: target/…ERB」单文件声明
// 归属到具体 ERB——js 侧（绑定区引用须有同 src 登记）与表侧（条目须有
// 归属该 src 的引用在场）双向锁死。此前只对 ref 数值判在场，行号漂到同表
// 其他文件的登记值时照样绿（#491 抽样实测；#504 的 20 条系统性 src 错位、
// #512 的五个函数自撞，都是这一款）。绑定信号与作用域：
//   - jsdoc 块（文件头区之后）内的单文件声明从该块起生效，延续到下一个含
//     声明的 jsdoc；列举式（路径后跟 ～/、）开开放段；无「源:」的 jsdoc 不
//     改变当前段——函数体里穿插的字段注释不断段。
//   - 行注释「// 源: …」只覆盖注释组 + 紧随的第一条语句（注册行注解形态，
//     见 kojo-k903-garde.js:695），之后回到 jsdoc 层的当前段。
//   - 文件头区（文件起首 jsdoc 或连续 // 行组）恒开放：那是「本文件承载哪些
//     源」的集合性声明，不定位具体引用；锚表挂多 src 的文件（如
//     page-invasion.js 的 4 个源）在 js 侧无从按段绑定，维持按 ref 匹配的
//     现状语义。开放区出现同样满足跨文件条目的在场检查（#486 的路径限定
//     写法 Z.ERB:77 由注释侧扫描天然排除，仍靠现状 ref_re 全文兜底）。
//   - 存量错绑冻结进 SRC_MISBIND_BASELINE（只减不增；条目不再报错绑时必须
//     删——消化即删，与 ERB_EXEMPT_BASELINE 同款两道规则）。
//
// 用法：node tools/trace-check.mjs（全绿退出码 0，任何失配退出码 1）。
//       node tools/trace-check.mjs --anchor-quality
//         打印本次鉴别力分布（默认只含未冻结文件）。
//       node tools/trace-check.mjs --anchor-quality --all
//         全文量并打印分布（命中 1 处 / 平行复现 / 空 PRINTFORM 整行锚 /
//         弱锚），供完成报告引用；不要再引「trace-check 全绿」。
//       node tools/trace-check.mjs --only ere/kojo/kojo-k19-fia.js
//         只核路径含该子串的文件（逗号分隔可给多个）。一次全量现在是
//         96463 条引用 / 55 秒；限到一个文件是 3 秒。写坏型探针用它，
//         **报告行会自报范围**——限定范围的绿不是全量绿。
//       node tools/trace-check.mjs --coverage
//         移植状态表（#331，独占模式——不跑上面的锚校验）：target/ERB/
//         346 个文件逐个归为 已移植 / 部分移植 / 已判定不实现 / 待移植 /
//         纯声明，分母与待移植基线写死、未归类即失败。判据与证据面见
//         tools/trace-coverage.mjs 头注。`--coverage --list` 逐文件列出
//         （验收对账用）；`--only` 在本模式下限定 **target 文件**路径。

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import samples_module from './compare/samples.js';
import { ERB_EXEMPT } from './trace-exempt.mjs';
import { DEFAULT_TRACE_REFS_DIR, load_trace_refs } from './trace-refs-load.mjs';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// 样本名 → 样本文件（唯一真相源 tools/compare/samples.js；default 互导拿整
// 份 module.exports，不依赖 CJS 具名导出的静态分析）。
const SAMPLES = samples_module.SAMPLES;

const EMUERA_LOG = 'target/emuera.log';

const WANT_QUALITY_REPORT = process.argv.includes('--anchor-quality');
const WANT_QUALITY_ALL = process.argv.includes('--all');

// `--only <子串[,子串…]>`：把三处文件扫描（FILES 遍历、log 引用完整性、
// ERB 引用完整性）限定到路径含任一子串的文件。
//
// 为什么要有它：一次全量校核现在是 96463 条引用、44 秒，而 15 个写坏型
// 探针每个都在临时副本里跑一遍全量——那个测试文件因此单跑 11 分钟，且它是
// 全局锁，每个 PR 都要付。绝大多数探针只断言「我注入的这一处错误被报出
// 来」，根本不需要扫全仓库。
//
// **限定范围的绿不等于全量绿。** 冻结基线那几项只读常量、与扫描面无关，
// 照常核对；但报告行会显式标出范围，免得有人拿一次 `--only` 的绿当全量绿
// 引用（`--verify` 被当成全量变异用过一次，见 SOP）。
const ONLY = (() => {
  const i = process.argv.indexOf('--only');
  const inline = process.argv.find((a) => a.startsWith('--only='));
  const raw = inline
    ? inline.slice('--only='.length)
    : i >= 0
      ? process.argv[i + 1]
      : '';
  const parts = String(raw || '')
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);
  if ((inline || i >= 0) && parts.length === 0) {
    console.error(
      '✗ --only 需要至少一个路径子串（如 --only ere/kojo/kojo-k19-fia.js）',
    );
    process.exit(1);
  }
  return parts;
})();

/** 该文件是否在本次扫描面内（无 --only 时恒真） */
function in_scope(rel) {
  return ONLY.length === 0 || ONLY.some((p) => rel.includes(p));
}

// #331：--coverage 独占模式——只出移植状态表，不跑锚校验（两者成本与
// 判定面不同：状态表读注释与清单，锚校验跑 9.6 万条引用）。--only 在
// 此模式下限定 target 文件路径（上文的解析对两种模式通用）。
if (process.argv.includes('--coverage')) {
  const { run_coverage } = await import('./trace-coverage.mjs');
  const failures = await run_coverage({
    repo: REPO,
    only: ONLY,
    list: process.argv.includes('--list'),
  });
  process.exitCode = failures === 0 ? 0 : 1;
  // stdout 是管道时 console.log 是异步的，process.exit() 会丢掉还留在缓冲里
  // 的部分。--list 要打三百多行，实测在 CI 上正好从「已判定不实现」那一段
  // 起整段消失，而摘要行已经写出去了——于是分类明明是对的，调用方却读到
  // 一份截断的报告（#387 合并后 master 的 engine job 连红，同一个用例在此
  // 前的全量变异里也闪过一次）。等 stdout 排空再退。
  await new Promise((resolve) => process.stdout.write('', resolve));
  process.exit();
}

// #282 注释自身的引用（本文件注释里写了 emuera.log:26，被完整性扫描
// 扫到；登记后自洽）——条目仍挂本文件，不跟锚表一起搬走。
const { FILES, LOG_REFS, SAMPLE_LOG_REFS } = await load_trace_refs(
  DEFAULT_TRACE_REFS_DIR,
);

// —— 校核 ——

const js_text_cache = new Map();
function load_js_text(rel) {
  if (!js_text_cache.has(rel)) {
    js_text_cache.set(rel, fs.readFileSync(path.join(REPO, rel), 'utf8'));
  }
  return js_text_cache.get(rel);
}

// 引用形态（#63 起的统一定义）：「注释内、冒号前不是词字符/点号/花括号的
// :数字」——覆盖行尾 `// :N`、块注释 `* :N`、括号 `（:N）` 及其复合（斜杠
// 链 :A/:B、@函数名 :N），同时天然排除三段寻址与「路径:行号」限定写法
// （#486——路径限定引用不进完整性锁，靠锚校验在场的全文兜底）。
const ERB_REF_RE = /(?<![A-Za-z0-9_.{}]):(\d+)(?:-(\d+))?/g;

// 「源:」声明可接受的路径扩展名（#513）
const SRC_PATH_EXT_RE = /\.(?:ERB|ERH|CSV|TXT|txt|log)$/i;

// —— #513 源错绑冻结基线（只减不增）。收紧判定暴露的存量「js :N ↔ 锚表
//    src」两侧不一致逐条登记在此：消化一条（js 行号/src 两侧核对后对齐，
//    或给函数头注补「源:」声明）就删一条；基线条目不再报错绑时也必须删，
//    两条都在下面的核对里执行（与 ERB_EXEMPT_BASELINE 同款语义）。新错绑
//    不许进——那是判定要拦的东西。 ——
const SRC_MISBIND_BASELINE = {
  // #513 真空基线实测 286 条（A 侧 221 + B 侧 75 去重），三个文件：
  //   - ablup.js 280：大头是 decide/core_ablupN 辅助函数的 jsdoc 没写「源:」行、
  //     被上一段声明覆盖而错位（如 decide_ablup10 的引用绑到 ABLUP9 段），含
  //     ABLUP9 段 :281-283 挂 ABLUP10 一类锚表 src 错位；
  //   - monster-data.js 4：@ENEMY_DATA_CHECK/@CRUSADER 段 jsdoc 无「源:」声明、
  //     延续 CAMPAIGN_EVENT 段；
  //   - kojo-k10-club.js 2：:657-665 段声明与锚表 src 对不上。
  // 逐条明细见 #513 完成报告。消化 = 核对后同步 js 行号或锚表 src（或给函数
  // 头注补「源:」声明），删本表条目。
  'ere/dungeon/monster-data.js': [
    'target/ERB/怪物相關/MONSTER_DATA.ERB|96-110',
    'target/ERB/怪物相關/MONSTER_DATA.ERB|112-170',
    'target/ERB/怪物相關/MONSTER_DATA.ERB|171-172',
    'target/ERB/怪物相關/MONSTER_DATA.ERB|174-182',
    'target/ERB/怪物相關/MONSTER_DATA.ERB|184-214',
    'target/ERB/怪物相關/MONSTER_DATA.ERB|216-339',
    'target/ERB/怪物相關/MONSTER_DATA.ERB|341-355',
    'target/ERB/怪物相關/MONSTER_DATA.ERB|357-419',
    'target/ERB/怪物相關/MONSTER_DATA.ERB|421-437',
    'target/ERB/怪物相關/MONSTER_DATA.ERB|443-456',
    'target/ERB/怪物相關/MONSTER_DATA.ERB|2861-2875',
    'target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB|10-40',
    'target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB|96-110',
    'target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB|112-170',
    'target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB|171-172',
    'target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB|174-182',
    'target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB|184-214',
    'target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB|216-339',
    'target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB|341-355',
    'target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB|357-419',
    'target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB|421-437',
    'target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB|443-456',
    'target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB|2861-2875',
    'target/ERB/侵略/ENEMY_DATA.ERB|10-40',
  ],
  'ere/kojo/kojo-k10-club.js': [
    'target/ERB/口上/EVENT_K10_クラブ.ERB|657-665',
    'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB|657-665',
  ],
  'ere/system/train/ablup.js': [
    'target/ERB/ABL/ABL.ERB|78',
    'target/ERB/ABL/ABL.ERB|89',
    'target/ERB/ABL/ABL.ERB|94',
    'target/ERB/ABL/ABL.ERB|99',
    'target/ERB/ABL/ABL.ERB|105',
    'target/ERB/ABL/ABL.ERB|146',
    'target/ERB/ABL/ABL.ERB|193-195',
    'target/ERB/ABL/ABL.ERB|203-267',
    'target/ERB/ABL/ABL.ERB|204-206',
    'target/ERB/ABL/ABL.ERB|208-213',
    'target/ERB/ABL/ABL.ERB|215-238',
    'target/ERB/ABL/ABL.ERB|230-232',
    'target/ERB/ABL/ABL.ERB|233-235',
    'target/ERB/ABL/ABL.ERB|264-265',
    'target/ERB/ABL/ABL.ERB|267',
    'target/ERB/ABL/ABLUP0.ERB|84',
    'target/ERB/ABL/ABLUP0.ERB|99-105',
    'target/ERB/ABL/ABLUP0.ERB|116-120',
    'target/ERB/ABL/ABLUP1.ERB|18-20',
    'target/ERB/ABL/ABLUP1.ERB|50-53',
    'target/ERB/ABL/ABLUP1.ERB|62',
    'target/ERB/ABL/ABLUP1.ERB|62-66',
    'target/ERB/ABL/ABLUP1.ERB|64-66',
    'target/ERB/ABL/ABLUP1.ERB|69-71',
    'target/ERB/ABL/ABLUP1.ERB|99-105',
    'target/ERB/ABL/ABLUP1.ERB|102-104',
    'target/ERB/ABL/ABLUP1.ERB|116-120',
    'target/ERB/ABL/ABLUP1.ERB|119-170',
    'target/ERB/ABL/ABLUP1.ERB|173-184',
    'target/ERB/ABL/ABLUP1.ERB|186-190',
    'target/ERB/ABL/ABLUP1.ERB|192-202',
    'target/ERB/ABL/ABLUP1.ERB|227-228',
    'target/ERB/ABL/ABLUP1.ERB|229-231',
    'target/ERB/ABL/ABLUP10.ERB|156-206',
    'target/ERB/ABL/ABLUP10.ERB|208-216',
    'target/ERB/ABL/ABLUP10.ERB|218-223',
    'target/ERB/ABL/ABLUP10.ERB|224-230',
    'target/ERB/ABL/ABLUP10.ERB|231-237',
    'target/ERB/ABL/ABLUP10.ERB|238-242',
    'target/ERB/ABL/ABLUP10.ERB|243-248',
    'target/ERB/ABL/ABLUP10.ERB|249-253',
    'target/ERB/ABL/ABLUP10.ERB|254-258',
    'target/ERB/ABL/ABLUP10.ERB|260-266',
    'target/ERB/ABL/ABLUP10.ERB|266-269',
    'target/ERB/ABL/ABLUP10.ERB|270-276',
    'target/ERB/ABL/ABLUP10.ERB|278-280',
    'target/ERB/ABL/ABLUP10.ERB|281-283',
    'target/ERB/ABL/ABLUP10.ERB|284-286',
    'target/ERB/ABL/ABLUP10.ERB|288-293',
    'target/ERB/ABL/ABLUP10.ERB|295-297',
    'target/ERB/ABL/ABLUP10.ERB|300-306',
    'target/ERB/ABL/ABLUP10.ERB|308-310',
    'target/ERB/ABL/ABLUP10.ERB|312-319',
    'target/ERB/ABL/ABLUP10.ERB|321-328',
    'target/ERB/ABL/ABLUP10.ERB|330-336',
    'target/ERB/ABL/ABLUP10.ERB|338-342',
    'target/ERB/ABL/ABLUP100.ERB|45',
    'target/ERB/ABL/ABLUP100.ERB|78',
    'target/ERB/ABL/ABLUP100.ERB|89',
    'target/ERB/ABL/ABLUP100.ERB|94',
    'target/ERB/ABL/ABLUP100.ERB|99',
    'target/ERB/ABL/ABLUP100.ERB|105',
    'target/ERB/ABL/ABLUP100.ERB|193-195',
    'target/ERB/ABL/ABLUP100.ERB|203-267',
    'target/ERB/ABL/ABLUP100.ERB|204-206',
    'target/ERB/ABL/ABLUP100.ERB|208-213',
    'target/ERB/ABL/ABLUP100.ERB|215-238',
    'target/ERB/ABL/ABLUP100.ERB|230-232',
    'target/ERB/ABL/ABLUP100.ERB|233-235',
    'target/ERB/ABL/ABLUP100.ERB|264-265',
    'target/ERB/ABL/ABLUP100.ERB|267',
    'target/ERB/ABL/ABLUP100.ERB|529-533',
    'target/ERB/ABL/ABLUP11.ERB|9',
    'target/ERB/ABL/ABLUP11.ERB|15-17',
    'target/ERB/ABL/ABLUP11.ERB|18-20',
    'target/ERB/ABL/ABLUP12.ERB|9',
    'target/ERB/ABL/ABLUP12.ERB|26',
    'target/ERB/ABL/ABLUP12.ERB|96-97',
    'target/ERB/ABL/ABLUP12.ERB|192-194',
    'target/ERB/ABL/ABLUP13.ERB|45-46',
    'target/ERB/ABL/ABLUP13.ERB|51',
    'target/ERB/ABL/ABLUP13.ERB|53',
    'target/ERB/ABL/ABLUP13.ERB|56-57',
    'target/ERB/ABL/ABLUP13.ERB|63',
    'target/ERB/ABL/ABLUP13.ERB|139-142',
    'target/ERB/ABL/ABLUP13.ERB|147-150',
    'target/ERB/ABL/ABLUP13.ERB|152-154',
    'target/ERB/ABL/ABLUP13.ERB|155-158',
    'target/ERB/ABL/ABLUP13.ERB|207-209',
    'target/ERB/ABL/ABLUP14.ERB|12',
    'target/ERB/ABL/ABLUP14.ERB|18-19',
    'target/ERB/ABL/ABLUP14.ERB|23-24',
    'target/ERB/ABL/ABLUP14.ERB|26',
    'target/ERB/ABL/ABLUP14.ERB|27',
    'target/ERB/ABL/ABLUP14.ERB|44-45',
    'target/ERB/ABL/ABLUP14.ERB|50',
    'target/ERB/ABL/ABLUP14.ERB|52',
    'target/ERB/ABL/ABLUP14.ERB|65-66',
    'target/ERB/ABL/ABLUP14.ERB|164-167',
    'target/ERB/ABL/ABLUP14.ERB|180-183',
    'target/ERB/ABL/ABLUP14.ERB|250-252',
    'target/ERB/ABL/ABLUP15.ERB|50',
    'target/ERB/ABL/ABLUP15.ERB|66',
    'target/ERB/ABL/ABLUP15.ERB|89-90',
    'target/ERB/ABL/ABLUP16.ERB|10',
    'target/ERB/ABL/ABLUP16.ERB|47-48',
    'target/ERB/ABL/ABLUP16.ERB|60',
    'target/ERB/ABL/ABLUP16.ERB|69',
    'target/ERB/ABL/ABLUP16.ERB|89-90',
    'target/ERB/ABL/ABLUP16.ERB|94-95',
    'target/ERB/ABL/ABLUP16.ERB|105-106',
    'target/ERB/ABL/ABLUP16.ERB|107-108',
    'target/ERB/ABL/ABLUP16.ERB|109-110',
    'target/ERB/ABL/ABLUP16.ERB|113',
    'target/ERB/ABL/ABLUP16.ERB|146',
    'target/ERB/ABL/ABLUP16.ERB|529-533',
    'target/ERB/ABL/ABLUP17.ERB|10',
    'target/ERB/ABL/ABLUP17.ERB|16-18',
    'target/ERB/ABL/ABLUP17.ERB|19-21',
    'target/ERB/ABL/ABLUP17.ERB|41-42',
    'target/ERB/ABL/ABLUP17.ERB|45-46',
    'target/ERB/ABL/ABLUP17.ERB|57-58',
    'target/ERB/ABL/ABLUP17.ERB|63',
    'target/ERB/ABL/ABLUP17.ERB|118',
    'target/ERB/ABL/ABLUP17.ERB|160-162',
    'target/ERB/ABL/ABLUP17.ERB|172-174',
    'target/ERB/ABL/ABLUP17.ERB|178-180',
    'target/ERB/ABL/ABLUP17.ERB|181-183',
    'target/ERB/ABL/ABLUP17.ERB|184-186',
    'target/ERB/ABL/ABLUP17.ERB|188-190',
    'target/ERB/ABL/ABLUP17.ERB|203-206',
    'target/ERB/ABL/ABLUP17.ERB|219-222',
    'target/ERB/ABL/ABLUP2.ERB|18-20',
    'target/ERB/ABL/ABLUP2.ERB|67',
    'target/ERB/ABL/ABLUP2.ERB|67-69',
    'target/ERB/ABL/ABLUP2.ERB|69-71',
    'target/ERB/ABL/ABLUP2.ERB|119-170',
    'target/ERB/ABL/ABLUP2.ERB|173-184',
    'target/ERB/ABL/ABLUP2.ERB|186-190',
    'target/ERB/ABL/ABLUP2.ERB|192-202',
    'target/ERB/ABL/ABLUP2.ERB|223-224',
    'target/ERB/ABL/ABLUP2.ERB|225-227',
    'target/ERB/ABL/ABLUP2.ERB|227-228',
    'target/ERB/ABL/ABLUP2.ERB|229-231',
    'target/ERB/ABL/ABLUP20.ERB|19-21',
    'target/ERB/ABL/ABLUP20.ERB|63',
    'target/ERB/ABL/ABLUP20.ERB|185-188',
    'target/ERB/ABL/ABLUP21.ERB|9',
    'target/ERB/ABL/ABLUP21.ERB|15-17',
    'target/ERB/ABL/ABLUP21.ERB|19-21',
    'target/ERB/ABL/ABLUP21.ERB|22-24',
    'target/ERB/ABL/ABLUP21.ERB|84',
    'target/ERB/ABL/ABLUP21.ERB|276-282',
    'target/ERB/ABL/ABLUP22.ERB|65',
    'target/ERB/ABL/ABLUP22.ERB|71',
    'target/ERB/ABL/ABLUP22.ERB|327-330',
    'target/ERB/ABL/ABLUP23.ERB|10-11',
    'target/ERB/ABL/ABLUP23.ERB|12',
    'target/ERB/ABL/ABLUP23.ERB|18',
    'target/ERB/ABL/ABLUP23.ERB|18-20',
    'target/ERB/ABL/ABLUP23.ERB|21-23',
    'target/ERB/ABL/ABLUP23.ERB|46-47',
    'target/ERB/ABL/ABLUP23.ERB|67',
    'target/ERB/ABL/ABLUP23.ERB|78-79',
    'target/ERB/ABL/ABLUP3.ERB|50-53',
    'target/ERB/ABL/ABLUP3.ERB|64-66',
    'target/ERB/ABL/ABLUP3.ERB|65',
    'target/ERB/ABL/ABLUP3.ERB|67-69',
    'target/ERB/ABL/ABLUP3.ERB|70-72',
    'target/ERB/ABL/ABLUP3.ERB|76-77',
    'target/ERB/ABL/ABLUP3.ERB|223-224',
    'target/ERB/ABL/ABLUP3.ERB|225-227',
    'target/ERB/ABL/ABLUP30.ERB|17',
    'target/ERB/ABL/ABLUP30.ERB|26',
    'target/ERB/ABL/ABLUP30.ERB|27',
    'target/ERB/ABL/ABLUP30.ERB|29',
    'target/ERB/ABL/ABLUP30.ERB|46-47',
    'target/ERB/ABL/ABLUP30.ERB|50',
    'target/ERB/ABL/ABLUP30.ERB|53-55',
    'target/ERB/ABL/ABLUP30.ERB|56',
    'target/ERB/ABL/ABLUP30.ERB|63',
    'target/ERB/ABL/ABLUP30.ERB|64',
    'target/ERB/ABL/ABLUP30.ERB|68',
    'target/ERB/ABL/ABLUP30.ERB|74-75',
    'target/ERB/ABL/ABLUP30.ERB|235-239',
    'target/ERB/ABL/ABLUP30.ERB|249-253',
    'target/ERB/ABL/ABLUP30.ERB|254-258',
    'target/ERB/ABL/ABLUP30.ERB|261-265',
    'target/ERB/ABL/ABLUP31.ERB|10',
    'target/ERB/ABL/ABLUP31.ERB|17-19',
    'target/ERB/ABL/ABLUP31.ERB|20-22',
    'target/ERB/ABL/ABLUP31.ERB|27',
    'target/ERB/ABL/ABLUP31.ERB|60',
    'target/ERB/ABL/ABLUP31.ERB|70',
    'target/ERB/ABL/ABLUP31.ERB|77',
    'target/ERB/ABL/ABLUP31.ERB|78',
    'target/ERB/ABL/ABLUP31.ERB|79',
    'target/ERB/ABL/ABLUP31.ERB|81',
    'target/ERB/ABL/ABLUP31.ERB|86-87',
    'target/ERB/ABL/ABLUP31.ERB|311-312',
    'target/ERB/ABL/ABLUP31.ERB|339-340',
    'target/ERB/ABL/ABLUP32.ERB|9',
    'target/ERB/ABL/ABLUP32.ERB|26',
    'target/ERB/ABL/ABLUP32.ERB|57-59',
    'target/ERB/ABL/ABLUP32.ERB|66',
    'target/ERB/ABL/ABLUP32.ERB|76',
    'target/ERB/ABL/ABLUP32.ERB|91',
    'target/ERB/ABL/ABLUP32.ERB|97-98',
    'target/ERB/ABL/ABLUP32.ERB|364-365',
    'target/ERB/ABL/ABLUP33.ERB|10-11',
    'target/ERB/ABL/ABLUP33.ERB|19-21',
    'target/ERB/ABL/ABLUP33.ERB|22-24',
    'target/ERB/ABL/ABLUP33.ERB|29',
    'target/ERB/ABL/ABLUP33.ERB|51-52',
    'target/ERB/ABL/ABLUP33.ERB|57',
    'target/ERB/ABL/ABLUP33.ERB|57-59',
    'target/ERB/ABL/ABLUP33.ERB|64',
    'target/ERB/ABL/ABLUP33.ERB|66',
    'target/ERB/ABL/ABLUP33.ERB|67',
    'target/ERB/ABL/ABLUP33.ERB|97-98',
    'target/ERB/ABL/ABLUP33.ERB|242-246',
    'target/ERB/ABL/ABLUP33.ERB|254-258',
    'target/ERB/ABL/ABLUP33.ERB|290-294',
    'target/ERB/ABL/ABLUP33.ERB|310-314',
    'target/ERB/ABL/ABLUP33.ERB|322-326',
    'target/ERB/ABL/ABLUP33.ERB|361-362',
    'target/ERB/ABL/ABLUP37.ERB|62',
    'target/ERB/ABL/ABLUP39.ERB|63',
    'target/ERB/ABL/ABLUP4.ERB|64-66',
    'target/ERB/ABL/ABLUP4.ERB|70-72',
    'target/ERB/ABL/ABLUP40.ERB|46',
    'target/ERB/ABL/ABLUP7.ERB|52',
    'target/ERB/ABL/ABLUP7.ERB|59',
    'target/ERB/ABL/ABLUP8.ERB|2-189',
    'target/ERB/ABL/ABLUP9.ERB|15-17',
    'target/ERB/ABL/ABLUP9.ERB|18-20',
    'target/ERB/ABL/ABLUP9.ERB|156-206',
    'target/ERB/ABL/ABLUP9.ERB|208-216',
    'target/ERB/ABL/ABLUP9.ERB|218-223',
    'target/ERB/ABL/ABLUP9.ERB|224-230',
    'target/ERB/ABL/ABLUP9.ERB|231-237',
    'target/ERB/ABL/ABLUP9.ERB|238-242',
    'target/ERB/ABL/ABLUP9.ERB|243-248',
    'target/ERB/ABL/ABLUP9.ERB|249-253',
    'target/ERB/ABL/ABLUP9.ERB|254-258',
    'target/ERB/ABL/ABLUP9.ERB|260-266',
    'target/ERB/ABL/ABLUP9.ERB|266-269',
    'target/ERB/ABL/ABLUP9.ERB|270-276',
    'target/ERB/ABL/ABLUP9.ERB|278-280',
    'target/ERB/ABL/ABLUP9.ERB|281-283',
    'target/ERB/ABL/ABLUP9.ERB|284-286',
    'target/ERB/ABL/ABLUP9.ERB|288-293',
    'target/ERB/ABL/ABLUP9.ERB|295-297',
    'target/ERB/ABL/ABLUP9.ERB|300-306',
    'target/ERB/ABL/ABLUP9.ERB|308-310',
    'target/ERB/ABL/ABLUP9.ERB|312-319',
    'target/ERB/ABL/ABLUP9.ERB|321-328',
    'target/ERB/ABL/ABLUP9.ERB|330-336',
    'target/ERB/ABL/ABLUP9.ERB|338-342',
    'target/ERB/ABL/ABLUP99.ERB|61',
  ],
};

// #513：js 侧源绑定（按文件惰性解析；锚校验在场检查与 ERB 完整性共用）
const src_binding_cache = new Map();
function get_src_binding(rel) {
  let binding = src_binding_cache.get(rel);
  if (!binding) {
    binding = parse_src_bindings(load_js_text(rel).split(/\r?\n/));
    src_binding_cache.set(rel, binding);
  }
  return binding;
}

/** 错绑对的键（#513）：js\0src\0ref —— A/B 两侧共用同一身份核对基线 */
function misbind_key(js, src, ref) {
  return `${js}\u0000${src}\u0000${ref}`;
}

const misbind_seen = new Set(); // 本轮扫到的错绑对（基线内核对用；基线内计数在核对处统一算，防同对多次命中重复累计）

const source_cache = new Map();
const source_pack_cache = new Map();
const classify_cache = new Map();
function load_source(rel) {
  if (!source_cache.has(rel)) {
    source_cache.set(
      rel,
      fs.readFileSync(path.join(REPO, rel), 'utf8').split(/\r?\n/),
    );
  }
  return source_cache.get(rel);
}

function load_source_pack(rel) {
  if (!source_pack_cache.has(rel)) {
    const lines = load_source(rel);
    const text = lines.join('\n');
    const starts = [0];
    for (let i = 0; i < text.length; i += 1) {
      if (text.charCodeAt(i) === 10) starts.push(i + 1);
    }
    source_pack_cache.set(rel, { lines, text, starts });
  }
  return source_pack_cache.get(rel);
}

function pos_to_line(starts, pos) {
  let lo = 0;
  let hi = starts.length - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (starts[mid] <= pos) lo = mid;
    else hi = mid - 1;
  }
  return lo + 1;
}

function with_global_m(anchor) {
  let flags = anchor.flags.replaceAll('g', '');
  if (!flags.includes('m')) flags += 'm';
  return new RegExp(anchor.source, `${flags}g`);
}

function* iter_regex_hits(pack, anchor) {
  const re = with_global_m(anchor);
  let m;
  let guard = 0;
  while ((m = re.exec(pack.text)) !== null) {
    yield [m.index, m.index + m[0].length];
    if (m[0].length === 0) re.lastIndex += 1;
    guard += 1;
    if (guard > 200000) return;
  }
}

function window_at(pack, start, end) {
  const line_from = pos_to_line(pack.starts, start);
  const line_to = pos_to_line(
    pack.starts,
    Math.max(start, end - (end > start ? 1 : 0)),
  );
  return pack.lines.slice(line_from - 1, line_to).join('\n');
}

function normalize_window(s) {
  return s
    .split('\n')
    .map((line) => line.replace(/[ \t]+/g, ' ').trim())
    .join('\n')
    .trim();
}

const EMPTY_PRINT_CMD_RE =
  /^(PRINTFORMW|PRINTFORML|PRINTFORM|PRINTDATA|PRINT)$/i;

function is_whole_line_empty_print(anchor) {
  const s = anchor.source
    .replace(/^\^/, '')
    .replace(/\$$/, '')
    .replace(/\\s\*/g, '')
    .replace(/\\s\+/g, '')
    .trim();
  return EMPTY_PRINT_CMD_RE.test(s);
}

function window_has_payload(window) {
  const s = window.trim();
  if (!s) return false;
  const m = s.match(
    /^(PRINTFORMW|PRINTFORML|PRINTFORM|PRINTDATA|PRINT|DRAWLINE|SIF|IF|ELSEIF|ELSE|ENDIF|RETURN|REND|ENDSELECT|SELECTCASE|CASE|REPEAT|FOR|NEXT|WHILE|WEND|BREAK|CONTINUE|TIMES|VARSET|CALL|GOTO|BEGIN|TRYCALL|TRYCCALL|CATCH|ENDCATCH|#PRI|#LATER|#DIM|#DIMS|#FUNCTION|#FUNCTIONS)\b[ \t]*(.*)$/is,
  );
  if (!m) return true;
  const rest = m[2].trim();
  if (!rest) return false;
  if (/^RETURN$/i.test(m[1]) && /^[01]$/.test(rest)) return false;
  return true;
}

const QUALITY_RANK = {
  unique: 0,
  ident_payload: 1,
  ident_empty_print: 2,
  ident_no_payload: 3,
  diff: 4,
};

function classify_hits(n, first_norm, all_same, anchor) {
  if (n <= 1) return { kind: 'unique', hits: n || 1 };
  if (!all_same) return { kind: 'diff', hits: n };
  if (window_has_payload(first_norm)) {
    return { kind: 'ident_payload', hits: n };
  }
  if (
    is_whole_line_empty_print(anchor) &&
    EMPTY_PRINT_CMD_RE.test(first_norm)
  ) {
    return { kind: 'ident_empty_print', hits: n };
  }
  return { kind: 'ident_no_payload', hits: n };
}

function classify_anchor(src, anchor, pack) {
  const key = `${src}\0${anchor.source}\0${anchor.flags}`;
  if (classify_cache.has(key)) return classify_cache.get(key);
  let n = 0;
  let first_norm = null;
  let all_same = true;
  for (const [start, end] of iter_regex_hits(pack, anchor)) {
    n += 1;
    if (!all_same) continue;
    const w = normalize_window(window_at(pack, start, end));
    if (n === 1) first_norm = w;
    else if (w !== first_norm) all_same = false;
  }
  const rec = classify_hits(n, first_norm, all_same, anchor);
  classify_cache.set(key, rec);
  return rec;
}

function unique_nonblank_in_slice(lines, a, b) {
  const out = [];
  const seen = new Set();
  for (let i = a - 1; i < b && i < lines.length; i += 1) {
    const t = lines[i].trim();
    if (!t) continue;
    if (seen.has(t)) continue;
    seen.add(t);
    out.push({ line: i + 1, text: t });
    if (out.length >= 5) break;
  }
  return out;
}

const ANCHOR_QUALITY_BASELINE = 5153; // #298 冻结：弱锚只减不增；#239 K8 并入 +500；#231 K0 并入 +364；#417 train-message 消化 -4；#401 event-turnend 消化 -2
const ANCHOR_QUALITY_BY_FILE = {
  'ere/chara/chara-make.js': 35,
  'ere/data/equip-database.js': 2,
  'ere/dungeon/dungeon-after.js': 3,
  'ere/dungeon/dungeon-battle.js': 12,
  'ere/dungeon/dungeon-battle2.js': 8,
  'ere/dungeon/dungeon-party.js': 1,
  'ere/dungeon/dungeon-quest.js': 11,
  'ere/dungeon/dungeon-room.js': 40,
  'ere/dungeon/dungeon-town.js': 15,
  'ere/dungeon/dungeon-trap.js': 63,
  'ere/dungeon/dungeon.js': 36,
  'ere/dungeon/labo-dungeon-map.js': 10,
  'ere/dungeon/labo-map.js': 1,
  'ere/dungeon/labo.js': 7,
  'ere/dungeon/monster-data.js': 3,
  'ere/event/enter-enemy.js': 30,
  'ere/event/event-aftertrain.js': 2,
  'ere/event/event-beforetrain.js': 1,
  'ere/event/event-comend.js': 4,
  'ere/event/event-end.js': 2,
  'ere/event/event-endcheck.js': 5,
  'ere/event/event-ending.js': 2,
  'ere/event/event-nextday.js': 9,
  'ere/event/first-setting.js': 1,
  'ere/event/source-check.js': 23,
  'ere/kojo/kojo-dungeon-bitch-log.js': 15,
  'ere/kojo/kojo-dungeon-bitch.js': 50,
  'ere/kojo/kojo-dungeon-ravish-man.js': 84,
  'ere/kojo/kojo-dungeon-ravish.js': 193,
  // K0 与 K8 一样，是在本门存在之前合的（#231 / #239），弱锚按存量冻结。
  // 这两份的 `ELSEIF TALENT:TARGET:76 == 1` 一类锚一条命中几十处，正是本门
  // 要拦的形态——冻结只表示「不追溯」，消化时收窄锚、把这两个数一并改小。
  'ere/kojo/kojo-k0-tender.js': 364,
  'ere/kojo/kojo-k1-confident.js': 784,
  'ere/kojo/kojo-k10-club.js': 32,
  'ere/kojo/kojo-k2-timid.js': 566,
  'ere/kojo/kojo-k3-noble.js': 742,
  'ere/kojo/kojo-k4-stoic.js': 18,
  'ere/kojo/kojo-k5-mao.js': 468,
  'ere/kojo/kojo-k6-wicked.js': 564,
  'ere/kojo/kojo-k7-heart.js': 109,
  'ere/kojo/kojo-k8-spade.js': 500,
  'ere/kojo/kojo-k9-diamond.js': 23,
  'ere/page/page-clothtype.js': 2,
  'ere/page/page-dungeon-setup.js': 1,
  'ere/page/page-invasion.js': 5,
  'ere/page/page-main-menu.js': 4,
  'ere/page/page-save-load.js': 18,
  'ere/page/page-train.js': 2,
  'ere/system/equip/equip-curse.js': 1,
  'ere/system/equip/equip-lookup.js': 1,
  'ere/system/equip/equip-print.js': 3,
  'ere/system/train/benki.js': 4,
  'ere/system/train/cloth.js': 1,
  'ere/system/train/com-analsex.js': 12,
  'ere/system/train/com-caress.js': 81,
  'ere/system/train/com-colosseum.js': 36,
  'ere/system/train/com-condom.js': 17,
  'ere/system/train/com-hardcore.js': 2,
  'ere/system/train/com-register.js': 7,
  'ere/system/train/com-sex.js': 1,
  'ere/system/train/com-sm.js': 63,
  'ere/system/train/com-special.js': 1,
  'ere/system/train/com-tentacle.js': 4,
  'ere/system/train/com-toy.js': 3,
  'ere/system/train/com-vaginasex.js': 22,
  'ere/system/train/juel-check.js': 1,
  'ere/system/train/passout.js': 17,
  'ere/system/train/seiin.js': 2,
  'ere/system/train/v-able.js': 1,
  'ere/system/turnend-settle.js': 3,
};

let failures = 0;
let checked = 0;
const quality_counts = {
  unique: 0,
  ident_payload: 0,
  ident_empty_print: 0,
  ident_no_payload: 0,
  diff: 0,
};
const quality_weak_by_file = new Map();
const quality_new_weak = [];

for (const { js, refs } of FILES) {
  if (!in_scope(js)) continue;
  const js_path = path.join(REPO, js);
  const js_text = fs.readFileSync(js_path, 'utf8');
  let this_weak = 0;
  for (const { src, ref, any } of refs) {
    checked += 1;
    const label = `${js} :${ref} ↔ ${src}`;
    // 1) js 侧：引用仍在（防静默删除/改动）；#513 起再绑一层源——绑定区的
    //    出现须归属本条目的 src。开放区出现维持按 ref 匹配的现状语义；注释
    //    侧完全无出现时（路径限定写法、区间前缀一类 ERB_REF_RE 看不见的形
    //    态）退回全文 ref_re 兜底，不扩大打击面。
    const occ = get_src_binding(js).refs.get(ref) ?? [];
    if (occ.length > 0) {
      if (!occ.some((o) => o.src === null || o.src === src)) {
        const actuals = [...new Set(occ.map((o) => o.src))].join('、');
        const key = misbind_key(js, src, ref);
        misbind_seen.add(key);
        if (!(SRC_MISBIND_BASELINE[js] ?? []).includes(`${src}|${ref}`)) {
          console.log(
            `✗ ${label} —— js 里 :${ref} 的出现全部归属其他源（${actuals}），无本 src 或开放区出现（#513 源绑定：行号或 src 挂错了文件？核对后同步 js 或锚表）`,
          );
          failures += 1;
          continue;
        }
      }
    } else {
      const ref_re = new RegExp(`:${ref.replace('-', '-')}(?!\\d)`);
      if (!ref_re.test(js_text)) {
        console.log(
          `✗ ${label} —— js 里已不存在「:${ref}」（引用被删或被改？同步更新本表）`,
        );
        failures += 1;
        continue;
      }
    }
    // 2) 源侧：所引行命中锚（防行号偏移/源漂移）
    const pack = load_source_pack(src);
    const [a, b = a] = ref.split('-').map(Number);
    const slice = pack.lines.slice(a - 1, b).join('\n');
    const matching = any.filter((anchor) => anchor.test(slice));
    if (matching.length === 0) {
      console.log(
        `✗ ${label} —— 源文件 ${a}${b === a ? '' : `-${b}`} 行未命中任何锚`,
      );
      failures += 1;
      continue;
    }
    // 2b) 鉴别力（#298）：默认 / `--anchor-quality` 只量未冻结文件；
    // `--all` 才全文量。
    const want_quality =
      (WANT_QUALITY_REPORT && WANT_QUALITY_ALL) ||
      !(js in ANCHOR_QUALITY_BY_FILE);
    if (want_quality) {
      let best = null;
      for (const anchor of matching) {
        const rec = {
          ...classify_anchor(src, anchor, pack),
          source: anchor.source,
        };
        if (!best || QUALITY_RANK[rec.kind] < QUALITY_RANK[best.kind])
          best = rec;
      }
      quality_counts[best.kind] += 1;
      if (best.kind === 'ident_no_payload' || best.kind === 'diff') {
        this_weak += 1;
        quality_new_weak.push({
          js,
          src,
          ref,
          kind: best.kind,
          hits: best.hits,
          source: best.source,
          a,
          b,
        });
      }
    }
  }
  quality_weak_by_file.set(js, (quality_weak_by_file.get(js) ?? 0) + this_weak);
}
// —— emuera.log 引用：同款两道校验（presence 用带 log: 前缀的更严形态，
//    单值引用不得被区间引用的「log:N-M」前缀冒名满足）——

for (const { js, refs } of LOG_REFS) {
  const js_text = load_js_text(js);
  for (const { ref, any } of refs) {
    checked += 1;
    const label = `${js} log:${ref} ↔ ${EMUERA_LOG}`;
    // 前瞻防区间冒名（单值不被 log:N-M 满足）；后顾防样本前缀冒名
    // （<样本名>-log:N 不是裸 log:N，不得满足裸引用的在场检查——那是
    // 另一个样本的行号，#156 静默错判的另一半）
    const presence = new RegExp(`(?<![A-Za-z0-9-])log:${ref}(?!-?\\d)`);
    if (!presence.test(js_text)) {
      console.log(
        `✗ ${label} —— js 里已不存在「log:${ref}」（引用被删或被改？同步更新本表）`,
      );
      failures += 1;
      continue;
    }
    const lines = load_source(EMUERA_LOG);
    const [a, b = a] = ref.split('-').map(Number);
    const slice = lines.slice(a - 1, b).join('\n');
    if (!any.some((anchor) => anchor.test(slice))) {
      console.log(
        `✗ ${label} —— 样本 ${a}${b === a ? '' : `-${b}`} 行未命中任何锚`,
      );
      failures += 1;
    }
  }
}

// —— 带样本名前缀的引用：同款两道校验（在场 + 锚），目标是 SAMPLES 里
//    该样本名对应的样本文件。样本名未登记 / 样本文件不在库，先红——
//    引用锚到不存在的样本等于没锚。 ——

/** 样本名做正则字面量安全转义（样本名约定 [A-Za-z0-9-]，转义是防御） */
function escape_re(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

for (const [sample_name, groups] of Object.entries(SAMPLE_LOG_REFS)) {
  const sample_rel = SAMPLES[sample_name];
  if (sample_rel === undefined) {
    checked += 1;
    console.log(
      `✗ ${sample_name} 的引用锚表 —— 样本名不在 SAMPLES（tools/compare/samples.js 是样本名→文件的唯一真相源，先登记再引用）`,
    );
    failures += 1;
    continue;
  }
  if (!fs.existsSync(path.join(REPO, sample_rel))) {
    checked += 1;
    console.log(
      `✗ ${sample_name} 的引用锚表 —— 样本文件 ${sample_rel} 不在库（#156 阶段二回收后才能登记引用锚）`,
    );
    failures += 1;
    continue;
  }
  for (const { js, refs } of groups) {
    const js_text = load_js_text(js);
    for (const { ref, any } of refs) {
      checked += 1;
      const label = `${js} ${sample_name}-log:${ref} ↔ ${sample_rel}`;
      const presence = new RegExp(
        `${escape_re(sample_name)}-log:${ref}(?!-?\\d)`,
      );
      if (!presence.test(js_text)) {
        console.log(
          `✗ ${label} —— js 里已不存在「${sample_name}-log:${ref}」（引用被删或被改？同步更新本表）`,
        );
        failures += 1;
        continue;
      }
      const lines = load_source(sample_rel);
      const [a, b = a] = ref.split('-').map(Number);
      const slice = lines.slice(a - 1, b).join('\n');
      if (!any.some((anchor) => anchor.test(slice))) {
        console.log(
          `✗ ${label} —— 样本 ${a}${b === a ? '' : `-${b}`} 行未命中任何锚`,
        );
        failures += 1;
      }
    }
  }
}

// —— 扫描完整性：ere/ tools/ test/ 全部 .js/.mjs 里的 log:N 引用都必须
//    在锚表登记（防新增引用绕过锚表——本锁的存在理由就是 #48 的
//    26 处无人看守的偏移）。#156 起引用可带样本名前缀：前缀段 = 紧邻
//    log: 之前、由字母数字与连词符组成且以 - 收尾的一截；带前缀的引用
//    按样本名查 SAMPLES 与 SAMPLE_LOG_REFS，裸引用照旧查 LOG_REFS。
//    legacy 的 emuera.log:N 写法照旧按裸引用解析（存量一行不改）。 ——

const LOG_REF_RE =
  /([A-Za-z0-9]+(?:-[A-Za-z0-9]+)*-)?(?:emuera\.)?log:(\d+)(?:-(\d+))?/g;

function list_js_files(dir_rel) {
  const out = [];
  const stack = [dir_rel];
  while (stack.length > 0) {
    const cur = stack.pop();
    for (const name of fs.readdirSync(path.join(REPO, cur))) {
      if (name === 'node_modules' || name.startsWith('.')) {
        continue;
      }
      const rel = `${cur}/${name}`;
      if (fs.statSync(path.join(REPO, rel)).isDirectory()) {
        stack.push(rel);
      } else if (/\.(js|mjs)$/.test(name)) {
        out.push(rel);
      }
    }
  }
  return out;
}

const tabled_by_file = new Map(
  LOG_REFS.map(({ js, refs }) => [js, new Set(refs.map((r) => r.ref))]),
);
const sample_tabled_by_file = new Map();
for (const [sample_name, groups] of Object.entries(SAMPLE_LOG_REFS)) {
  for (const { js, refs } of groups) {
    const key = `${sample_name}\u0000${js}`;
    const set = sample_tabled_by_file.get(key) ?? new Set();
    refs.forEach((r) => set.add(r.ref));
    sample_tabled_by_file.set(key, set);
  }
}
for (const rel of ['ere', 'tools', 'test'].flatMap(list_js_files)) {
  if (!in_scope(rel)) continue;
  const found = new Set(
    [...load_js_text(rel).matchAll(LOG_REF_RE)].map((m) => {
      const sample = m[1] ? m[1].slice(0, -1) : '';
      const ref = m[2] ? `${m[2]}${m[3] ? `-${m[3]}` : ''}` : '';
      return `${sample}\u0000${ref}`;
    }),
  );
  for (const entry of found) {
    const [sample, ref] = entry.split('\u0000');
    if (sample === '') {
      if (!tabled_by_file.get(rel)?.has(ref)) {
        console.log(
          `✗ ${rel} log:${ref} —— 未登记进 LOG_REFS（登记后才能过锚校验）`,
        );
        failures += 1;
      }
      continue;
    }
    const token = `${sample}-log:${ref}`;
    if (!Object.hasOwn(SAMPLES, sample)) {
      console.log(
        `✗ ${rel} ${token} —— 样本名不在 SAMPLES（tools/compare/samples.js），先登记样本名再引用`,
      );
      failures += 1;
    } else if (!sample_tabled_by_file.get(`${sample}\u0000${rel}`)?.has(ref)) {
      console.log(
        `✗ ${rel} ${token} —— 未登记进 SAMPLE_LOG_REFS['${sample}']（登记后才能过锚校验）`,
      );
      failures += 1;
    }
  }
}

// —— #63 冻结基线：豁免清单（tools/trace-exempt.mjs）的上界快照 ——
//
// 条目表里的每一条都必须出现在这份基线内——超出即红（清单只能变短）。
// 消化现有条目 = 只动 trace-exempt.mjs（删条目，本表不碰）；要扩表必须连
// 这里一起改——冻结不是不可变，是「改动必须显式发生在标着冻结的地方」。
// 与 log 侧同构：扫描完整性（含它的数据）住在工具里，测试只做行为靶。

const ERB_EXEMPT_BASELINE = {
  'ere/chara/chara-ex.js': ['28-29', '28', '29', '101-102', '102'],
  'ere/era-utils/era-flag.js': ['26', '51', '321', '323'],
  'ere/event/event-com.js': ['261-268'],
  'ere/event/event-comend.js': ['45', '272-310', '292-309'],
  'ere/event/event-end.js': ['314-429', '421'],
  'ere/event/event-first.js': [
    '1',
    '8-9',
    '11-12',
    '15',
    '19',
    '21-24',
    '26',
    '27',
    '29-30',
    '31',
    '33',
    '35',
    '36-40',
    '42',
    '45',
    '47',
    '50-52',
    '53',
    '55',
    '56',
    '60-62',
    '62',
    '65-74',
    '69-73',
    '78',
    '80',
    '82-92',
    '87',
    '91',
    '92',
    '95-187',
    '96-100',
    '102',
    '103',
    '105',
    '107',
    '109',
    '110-119',
    '111',
    '121',
    '126-129',
    '130-133',
    '135-150',
    '138-142',
    '144-147',
    '152-166',
    '168-172',
    '169-170',
    '175',
    '187',
    '190-201',
    '198',
    '199-201',
    '203',
    '205-215',
    '231',
  ],
  'ere/event/event-train.js': ['13-58'],
  'ere/event/event-turnend.js': ['8-140'],
  'ere/event/first-setting.js': [
    '16-17',
    '781-935',
    '787-864',
    '909-915',
    '911',
    '912',
    '913',
    '914-915',
  ],
  'ere/event/source-check.js': [
    '31',
    '45',
    '56',
    '57-68',
    '79-86',
    '88-95',
    '97-104',
    '106-113',
    '115-122',
    '148',
    '152',
    '160-161',
    '222',
    '265',
    '393',
    '398',
    '406',
    '411',
    '504',
    '512',
    '547-549',
    '552',
    '578-655',
    '657-735',
    '691',
    '737-856',
    '740',
    '858-939',
    '936-951',
    '2122',
    '2175',
    '2508-2572',
  ],
  'ere/kojo/kojo-k3-noble.js': [
    '83',
    '84-85',
    '89',
    '887',
    '888-912',
    '918',
    '920-1105',
    '925',
    '928',
    '930',
    '931',
    '932-1104',
    '936',
    '938',
    '939',
    '940',
    '941',
    '943',
    '945',
    '946',
    '948',
    '949',
    '950',
    '951',
    '953',
    '956',
    '958',
    '960',
    '961',
    '963',
    '964',
    '965',
    '966',
    '967',
    '969',
    '970',
    '971',
    '972',
    '973',
    '975',
    '978',
    '980-988',
    '983',
    '984',
    '985',
    '987',
    '989',
    '991-1002',
    '993',
    '994',
    '995',
    '996',
    '998',
    '999',
    '1000',
    '1001',
    '1003',
    '1005',
    '1006',
    '1007',
    '1008',
    '1009',
    '1010-1019',
    '1015',
    '1017',
    '1022',
    '1024',
    '1025',
    '1026',
    '1027',
    '1028',
    '1030',
    '1031',
    '1032',
    '1033',
    '1034',
    '1036',
    '1037',
    '1038',
    '1039',
    '1040',
    '1042-1049',
    '1044',
    '1046',
    '1048',
    '1053',
    '1056-1066',
    '1057',
    '1058',
    '1059',
    '1060',
    '1062-1063',
    '1065',
    '1069-1078',
    '1071',
    '1073',
    '1075',
    '1076',
    '1077',
    '1078',
    '1080-1091',
    '1082',
    '1083',
    '1084',
    '1086',
    '1087',
    '1088',
    '1090',
    '1093-1101',
    '1095',
    '1099',
  ],
  'ere/kojo/kojo-k5-mao.js': [
    '82',
    '83-84',
    '88',
    '770',
    '772-773',
    '802',
    '807',
    '810',
    '811',
    '813',
    '814',
    '815-847',
    '819',
    '820',
    '821',
    '822',
    '825',
    '826',
    '827',
    '828',
    '831',
    '832',
    '833',
    '834',
    '837',
    '838',
    '839',
    '842',
    '843',
    '844',
    '846',
    '848',
  ],
  'ere/kojo/kojo-system.js': [
    '90-91',
    '92-131',
    '134-144',
    '152',
    '155',
    '157',
    '160',
    '161',
  ],
  'ere/page/page-ablup.js': [
    '10-11',
    '29-117',
    '32-33',
    '34-35',
    '36-37',
    '38-39',
    '40-41',
  ],
  'ere/page/page-info-exp.js': [
    '135',
    '1024-1029',
    '1032-1040',
    '1036',
    '1045-1047',
    '1048-1050',
    '1051-1053',
    '1058',
    '1058-1090',
    '1064-1065',
    '1066-1067',
    '1068-1069',
    '1070-1071',
    '1072-1073',
    '1074-1075',
    '1092-1113',
    '1095-1096',
    '1098-1099',
    '1101-1102',
    '1104-1105',
    '1108-1109',
  ],
  'ere/page/page-select-target.js': ['10-52', '105-112', '116-133', '311-321'],
  'ere/page/page-shop.js': [
    '20',
    '22-38',
    '24',
    '25-30',
    '33-36',
    '35',
    '38',
    '40-229',
    '44-57',
    '44',
    '59',
    '59-101',
    '65-68',
    '67-68',
    '68',
    '71-97',
    '79-80',
    '81-82',
    '83-84',
    '85-88',
    '91-92',
    '94-97',
    '96',
    '98-99',
    '99',
    '101',
    '102-106',
    '105',
    '108',
    '110',
    '113',
    '115',
    '117',
    '119-120',
    '121-122',
    '124-128',
    '127',
    '130-131',
    '132-133',
    '134-138',
    '140',
    '142',
    '144',
    '146',
    '148',
    '152',
    '152-153',
    '154',
    '154-155',
    '156-157',
    '158-159',
    '160-161',
    '162-163',
    '164-165',
    '166-167',
    '168-170',
    '172-221',
    '208-216',
    '222-223',
    '226-227',
    '236-330',
    '337-421',
  ],
  'ere/page/page-title.js': [
    '2',
    '3-7',
    '13-15',
    '17',
    '19',
    '20-21',
    '25-26',
    '27',
    '29-35',
    '36-37',
    '38',
    '39-86',
    '58-73',
    '73',
    '74-81',
    '76-79',
    '80',
    '82',
    '84',
    '86',
    '89-90',
    '91',
    '92-101',
    '93',
    '99',
    '100',
    '100-103',
    '101-102',
    '102-107',
    '103',
    '106',
    '108-110',
    '111-113',
    '114-115',
  ],
  'ere/page/page-train.js': ['60-259'],
  'ere/page/page-usercom.js': ['7-100', '102-177', '771-780'],
  'ere/system/flow/main-loop.js': ['231'],
  'ere/system/train/com-caress.js': [
    '30',
    '34',
    '76-82',
    '91',
    '92',
    '93',
    '94',
    '97-98',
    '100-101',
    '103-104',
    '117-118',
    '122-123',
    '128-133',
    '134-141',
    '144-165',
    '147-165',
    '149-150',
    '153-154',
    '160',
    '163',
  ],
  'ere/system/train/juel-check.js': [
    '443-549',
    '449-458',
    '540-541',
    '541-546',
    '546',
    '549',
    '558-601',
    '598',
    '607',
    '624',
    '648-656',
    '655',
    '658-735',
    '659-692',
    '669',
    '671',
    '674',
    '682-685',
    '688-691',
    '693-724',
    '707',
    '708-711',
    '720-723',
    '740',
  ],
  'ere/system/train/train-loop.js': ['545'],
  'ere/system/train/train-message.js': [
    '10',
    '12-3049',
    '12',
    '15-1351',
    '15',
    '22-26',
    '28-90',
    '30-120',
    '69',
    '70',
    '71',
    '74-87',
    '94',
  ],
};

// —— ERB 侧扫描完整性（#63）：ere/ 全部 .js 注释里的 :N / :N-M 引用都
//    必须在 FILES 登记或在 ERB_EXEMPT 豁免——与 log 侧第三道同款，防
//    新增引用绕过锚表。引用形态见文件头第 4 条；豁免清单只能变短、
//    不许过期失效（见 tools/trace-exempt.mjs 头注） ——

/** 注释可扫片段：块注释行、// 之后的部分、行内块注释段（scan_erb_refs 与 #513 源绑定共用） */
function comment_parts(line) {
  const parts = [];
  // 块注释行（jsdoc 的 * 续行与 /* 起始行）整行可扫
  if (/^\s*\*/.test(line) || /^\s*\/\*/.test(line)) parts.push(line);
  // 行注释：只扫 // 之后的部分（前面是代码，含三段寻址）
  const ci = line.indexOf('//');
  if (ci >= 0) {
    parts.push(line.slice(ci));
  }
  // 行内 /* … */ 段（本仓库罕用，出现即扫）
  for (const m of line.matchAll(/\/\*(.*?)\*\//g)) {
    parts.push(m[1]);
  }
  return parts;
}

// —— #513：源绑定解析。绑定信号 = 注释里的「源: target/…ERB」单文件声明，
//    作用域见文件头注。开放区（src = null）的引用维持按 ref 匹配的现状语义。 ——

/**
 * 「源:」行剩余文本 → 单文件 src / { listing: true } / null（无完整路径）。
 * 带空格的文件名（EVENT_K902_普林希丝 ver1.0.3.ERB）按「首段 + 次段扩展名」
 * 吞并；列举式（路径后紧跟 ～/、，或行内多个 target/ 段）不开绑定段。
 */
function extract_single_src(rest) {
  const m = rest.match(/target\/\S+/);
  if (!m) return null;
  let p = m[0].replace(/[）)。、，,;；:：]+$/, '');
  const after = rest.slice(rest.indexOf(m[0]) + m[0].length);
  if (!SRC_PATH_EXT_RE.test(p)) {
    // 空格修正：提取段不以扩展名结尾且紧随一段是扩展名结尾 → 合成一个路径
    const nxt = after.match(/^\s+(\S+\.(?:ERB|ERH|CSV|TXT|txt|log))(?!\w)/);
    if (nxt) {
      p = `${p} ${nxt[1]}`;
    }
  }
  if (!SRC_PATH_EXT_RE.test(p)) return null;
  const path_count = (rest.match(/target\/\S+/g) ?? []).length;
  if (/^\s*[～~、]/.test(after) || path_count > 1) return { listing: true };
  return { src: p };
}

/**
 * 解析一份 js 的源绑定（#513）。
 *
 * @param {string[]} lines 按行拆开的 js 文本
 * @returns {{ refs: Map<string, {line: number, src: string|null}[]> }}
 *   refs：注释侧每个 :N/:N-M 引用的出现位置与归属 src（null = 开放区）。
 */
function parse_src_bindings(lines) {
  const tags = new Array(lines.length).fill(null);
  const first_nonempty = lines.findIndex((l) => l.trim() !== '');
  let header_end = -1;
  if (first_nonempty >= 0) {
    const ft = lines[first_nonempty].trimStart();
    if (ft.startsWith('/**')) {
      let j = first_nonempty;
      while (j < lines.length && !lines[j].includes('*/')) j += 1;
      header_end = Math.min(j, lines.length - 1);
    } else if (ft.startsWith('//')) {
      let j = first_nonempty;
      while (j < lines.length && lines[j].trimStart().startsWith('//')) j += 1;
      header_end = j - 1;
    }
  }
  // 文件头区（含起首 jsdoc / 起首 // 组）恒开放：集合性声明不定位具体引用
  const events = []; // { line(0-based 生效行), kind: 'bind'|'open'|'narrow', src, end }
  let k = header_end + 1;
  while (k < lines.length) {
    const t = lines[k].trimStart();
    if (t.startsWith('/**')) {
      let j = k;
      while (j < lines.length && !lines[j].includes('*/')) j += 1;
      let decl = null;
      for (let x = k; x <= Math.min(j, lines.length - 1); x += 1) {
        for (const part of comment_parts(lines[x])) {
          const dm = part.match(/源[:：]\s*(.*)/);
          if (dm && decl === null) decl = extract_single_src(dm[1]);
        }
      }
      if (decl) {
        events.push(
          decl.listing
            ? { line: k, kind: 'open' }
            : { line: k, kind: 'bind', src: decl.src },
        );
      }
      // 无「源:」的 jsdoc 不切段：函数体里穿插的字段注释延续当前段
      k = j + 1;
      continue;
    }
    if (t.startsWith('//')) {
      const group_start = k;
      let j = k;
      while (j < lines.length && lines[j].trimStart().startsWith('//')) j += 1;
      let decl = null;
      for (let x = group_start; x < j; x += 1) {
        const part = lines[x].slice(lines[x].indexOf('//'));
        const dm = part.match(/源[:：]\s*(.*)/);
        if (dm && decl === null) decl = extract_single_src(dm[1]);
      }
      if (decl && !decl.listing) {
        // 行注释声明只盖住注释组 + 紧随的第一条语句（注册行注解形态）
        let l = j;
        while (l < lines.length && lines[l].trim() === '') l += 1;
        events.push({
          line: group_start,
          kind: 'narrow',
          src: decl.src,
          end: Math.min(l, lines.length - 1),
        });
      }
      k = j;
      continue;
    }
    k += 1;
  }
  events.sort((a, b) => a.line - b.line);
  const narrows = events.filter((ev) => ev.kind === 'narrow');
  let current = null;
  let e = 0;
  for (let n = 0; n < lines.length; n += 1) {
    while (e < events.length && events[e].line <= n) {
      const ev = events[e];
      if (ev.kind === 'bind') current = ev.src;
      else if (ev.kind === 'open') current = null;
      e += 1;
    }
    let tag = current;
    for (const nw of narrows) {
      if (nw.line <= n && n <= nw.end) tag = nw.src;
    }
    tags[n] = tag;
  }
  const refs = new Map();
  lines.forEach((line, idx) => {
    for (const part of comment_parts(line)) {
      for (const rm of part.matchAll(ERB_REF_RE)) {
        const ref = rm[2] ? `${rm[1]}-${rm[2]}` : rm[1];
        if (!refs.has(ref)) refs.set(ref, []);
        refs.get(ref).push({ line: idx + 1, src: tags[idx] });
      }
    }
  });
  return { refs };
}

/** 扫单个 js 文本里的 ERB 行号引用（注释侧；代码侧不扫，见文件头） */
function scan_erb_refs(text) {
  const found = new Set();
  for (const line of text.split(/\r?\n/)) {
    for (const part of comment_parts(line)) {
      for (const m of part.matchAll(ERB_REF_RE)) {
        found.add(m[2] ? `${m[1]}-${m[2]}` : m[1]);
      }
    }
  }
  return found;
}

const erb_registered_by_file = new Map(
  FILES.map(({ js, refs }) => [js, new Set(refs.map((r) => r.ref))]),
);
// #513：同 src 同 ref 的成对登记（绑定区引用按「段 src + ref」核对）
const erb_registered_pairs_by_file = new Map(
  FILES.map(({ js, refs }) => [
    js,
    new Set(refs.map((r) => `${r.src}\u0000${r.ref}`)),
  ]),
);
const erb_baseline_total = Object.values(ERB_EXEMPT_BASELINE).reduce(
  (sum, refs) => sum + refs.length,
  0,
);
let erb_found_total = 0;
let erb_exempt_total = 0;
for (const rel of list_js_files('ere')) {
  if (rel === 'ere/era-electron.js') {
    continue; // 引擎 SDK：JSDoc 示例不是移植注释
  }
  if (!in_scope(rel)) continue;
  // #513：扫描换成带源归属的出现明细（ref 集合口径不变，按 Map 键去重）
  const binding = get_src_binding(rel);
  const found = binding.refs;
  erb_found_total += found.size;
  const registered = erb_registered_by_file.get(rel);
  const registered_pairs = erb_registered_pairs_by_file.get(rel);
  const exempt = ERB_EXEMPT[rel] ?? [];
  erb_exempt_total += exempt.length;
  for (const [ref, occ] of found) {
    const bound = occ.filter((o) => o.src !== null);
    const has_open = occ.some((o) => o.src === null);
    if (bound.length > 0) {
      // 绑定区出现逐个核对同 src 登记（#513）：同 ref 的其他合法出现掩护不
      // 了漂进来的那一条；另有开放区出现且按现状判定能过的，整体宽放——锁
      // 的是「只出现在绑定区却挂错源」
      const bad = bound.filter(
        (o) => !registered_pairs?.has(`${o.src}\u0000${ref}`),
      );
      if (bad.length === 0) continue;
      if (exempt.includes(ref)) continue;
      if (has_open && registered?.has(ref)) continue;
      for (const o of bad) {
        const key = misbind_key(rel, o.src, ref);
        misbind_seen.add(key);
        if (!(SRC_MISBIND_BASELINE[rel] ?? []).includes(`${o.src}|${ref}`)) {
          console.log(
            `✗ ${rel} :${ref} —— 按「源:」声明归属 ${o.src}（@js:${o.line}），锚表同 src 无此登记（#513 源绑定：行号漂到别的文件名下了？核对后同步 js 或锚表）`,
          );
          failures += 1;
        }
      }
    } else if (!registered?.has(ref) && !exempt.includes(ref)) {
      console.log(
        `✗ ${rel} :${ref} —— 未登记进 FILES（新引用必须登记锚表；豁免清单是 #63 冻结的现有，不收新条目）`,
      );
      failures += 1;
    }
  }
  for (const ref of exempt) {
    if (!found.has(ref)) {
      console.log(
        `✗ ${rel} :${ref} —— 豁免条目在 js 里已不存在（引用被删/改号？同步删本条，清单只能变短）`,
      );
      failures += 1;
    }
  }
}

// 规则 1「只能变短」：条目表条目必须逐条落在 #63 基线内（在工具里执行，
// 与退出码语义一致——验收整改：此前这条只在测试里，条目表 465→466 时
// 单独跑工具的人看到的是绿）
for (const [rel, refs] of Object.entries(ERB_EXEMPT)) {
  const baseline_refs = ERB_EXEMPT_BASELINE[rel] ?? [];
  for (const ref of refs) {
    if (!baseline_refs.includes(ref)) {
      console.log(
        `✗ ${rel} :${ref} —— 豁免条目不在 #63 基线内（清单只能变短：消化现有条目 = 删条目；新引用登记 FILES 锚表，扩基线必须显式改 ERB_EXEMPT_BASELINE）`,
      );
      failures += 1;
    }
  }
}

// —— #513 错绑基线两道核对：
//    规则 1「基线外的错绑」在两侧扫描里当场报（见上方两处 ✗）；
//    规则 2「不许过期失效」在此——基线条目对应的错绑已不存在（消化后忘了删，
//    或凭空塞入）必须红。只核对本次扫描面内的文件（--only 时其余文件不在面内，
//    没扫到不等于消化）。 ——
const misbind_baseline_total = Object.values(SRC_MISBIND_BASELINE).reduce(
  (sum, pairs) => sum + pairs.length,
  0,
);
let misbind_in_baseline = 0; // 基线内且本轮仍扫到的错绑对数（在核对处统一数，防同对多次命中重复累计）
for (const [rel, pairs] of Object.entries(SRC_MISBIND_BASELINE)) {
  if (!in_scope(rel)) continue;
  for (const pair of pairs) {
    const sep = pair.lastIndexOf('|');
    const src = pair.slice(0, sep);
    const ref = pair.slice(sep + 1);
    if (misbind_seen.has(misbind_key(rel, src, ref))) {
      misbind_in_baseline += 1;
      continue;
    }
    console.log(
      `✗ ${rel} :${ref} ↔ ${src} —— #513 基线条目已不再报错绑（错绑已消化？删掉本条——基线只减不增）`,
    );
    failures += 1;
  }
}
// —— #298 鉴别力：弱锚只减不增 ——
//
// 弱锚 = 全文命中 >1 且（窗口彼此不同，或窗口无正文）。平行复现（窗口
// 逐字相同且有正文）与空 PRINTFORM 整行锚不进这张表。扩基线必须显式改
// 上面两份常量——冻结不是不可变，是「改动必须发生在标着冻结的地方」。
// 默认路径只核对新文件（不在 ANCHOR_QUALITY_BY_FILE 里的）超出 0；
// 总基线只在 `--anchor-quality --all` 全文量时核对。

const FROZEN_WEAK_SUM = Object.values(ANCHOR_QUALITY_BY_FILE).reduce(
  (sum, n) => sum + n,
  0,
);
if (FROZEN_WEAK_SUM > ANCHOR_QUALITY_BASELINE) {
  console.log(
    `✗ 分文件弱锚基线合计 ${FROZEN_WEAK_SUM}，超出总基线 ${ANCHOR_QUALITY_BASELINE}（#298 只减不增）`,
  );
  failures += 1;
}

const quality_weak_total =
  quality_counts.ident_no_payload + quality_counts.diff;

const overflowing = [];
for (const [js, actual] of quality_weak_by_file.entries()) {
  const allowed = ANCHOR_QUALITY_BY_FILE[js] ?? 0;
  if (actual > allowed) overflowing.push({ js, actual, allowed });
}

const REPORT_CAP = 30;
if (overflowing.length > 0) {
  const overflow_files = new Set(overflowing.map((x) => x.js));
  const extras = quality_new_weak.filter((w) => overflow_files.has(w.js));
  let shown = 0;
  for (const w of extras) {
    if (shown >= REPORT_CAP) {
      console.log(
        `✗ 鉴别力弱锚另有 ${extras.length - shown} 条未列出（#298；先修上面这些）`,
      );
      break;
    }
    const pack = load_source_pack(w.src);
    const candidates = unique_nonblank_in_slice(pack.lines, w.a, w.b).filter(
      (c) => window_has_payload(c.text),
    );
    const cand_text =
      candidates.length > 0
        ? `窗口内候选行：${candidates.map((c) => `${c.line} ${c.text}`).join(' / ')}`
        : '窗口内无更高鉴别力候选';
    const why =
      w.kind === 'ident_no_payload' ? '窗口无正文' : '命中窗口彼此不同';
    console.log(
      `✗ ${w.js} :${w.ref} —— 弱锚（鉴别力）：/${w.source}/ 命中 ${w.hits} 处，${why}（#298）。${cand_text}`,
    );
    shown += 1;
    failures += 1;
  }
  for (const { js, actual, allowed } of overflowing) {
    if (extras.every((w) => w.js !== js)) {
      console.log(
        `✗ ${js} —— 弱锚 ${actual} 条，超出 #298 基线 ${allowed}（只减不增）`,
      );
      failures += 1;
    }
  }
}

if (
  WANT_QUALITY_REPORT &&
  WANT_QUALITY_ALL &&
  quality_weak_total > ANCHOR_QUALITY_BASELINE
) {
  console.log(
    `✗ 鉴别力弱锚 ${quality_weak_total} 条，超出 #298 基线 ${ANCHOR_QUALITY_BASELINE}（只减不增：消化 = 收窄锚后基线一并改小；新弱锚不许进）`,
  );
  failures += 1;
}

const quality_line = `鉴别力：命中 1 处 ${quality_counts.unique}；平行复现 ${quality_counts.ident_payload}；空 PRINTFORM 整行锚 ${quality_counts.ident_empty_print}；弱锚 ${quality_weak_total} / 基线 ${ANCHOR_QUALITY_BASELINE}（#298 只减不增）`;

if (WANT_QUALITY_REPORT) {
  console.log(quality_line);
}

const scope_note =
  ONLY.length === 0
    ? ''
    : `（本次限定范围：--only ${ONLY.join(',')}，不等于全量绿）`;
console.log(
  failures === 0
    ? `✓ ${checked} 条内联行号引用全部与源文件一致${scope_note}；ERB 完整性：ere/ ${erb_found_total} 条引用全数登记或豁免（豁免 ${erb_exempt_total}/${erb_baseline_total} 条，#63 基线内只减不增，条目表见 tools/trace-exempt.mjs）；存量源错绑 ${misbind_in_baseline}/${misbind_baseline_total}（#513 基线只减不增）`
    : `✗ ${failures}/${checked} 条引用对不上${scope_note}（另有 ERB 完整性失守计入 failures）`,
);
// 同上：锚校验模式也成批打印失败行，而这是文件最后一句，设 exitCode 让
// 进程自然退出即可，不必显式排空。
process.exitCode = failures === 0 ? 0 : 1;
