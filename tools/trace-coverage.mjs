// 移植状态表（issue #331，#329 裁定 3 / 裁定 8 的执行者）。
//
// 守什么：把 target/ERB/ 的 346 个 .ERB/.ERH 逐个归为五类——
//   已移植 / 部分移植 / 已判定不实现 / 待移植 / 纯声明——
// 分母写死 346（#329 裁定 3），本表是阶段 5 全部实施票的验收基准：
// 每张票交付后，它经手的文件分类必须从「待移植」变到「已移植」（或
// 「部分移植」——有意留尾时要能看见）。存根清单看不见没人调用的整块
// （處刑相關/ 3,441 行只对应 2 条存根），这是本表存在的理由。
//
// 为什么不能手工做（#329 实测两种启发式各错一类）：
//   - 按文件头关键词判定，把 kojo_message_com_7（kojo-k7-heart.js:1628
//     的真身）报成未移植；
//   - 按追溯引用判定，把 COMF31–38 报成未移植（com-service.js:4 用的是
//     「COMF30_手淫.ERB 至 COMF38_足コキ.ERB」范围写法）。
// 所以证据面与两类显式展开规则如下，全部机械化：
//
// 判「有移植产物」的证据 = 三路并集：
//   (a) tools/trace-refs/ 锚表的 FILES.refs[].src——全项目唯一被测试
//       守着的 js→ERB 映射（#290）；只有它会漏「有真身但正文没有内联
//       :N 引用」的文件，所以要并 (b)。
//   (b) ere/ 全部 .js 注释块（jsdoc 块注释 + 文件起首连续 // 行）里形如
//       target/ERB/….ERB 的整路径提及。扫注释块而非全文：正文里的
//       「调用点在 X.ERB:123」一类交叉引用不是移植声明，全文扫会把
//       待移植文件误判成有产物；文件级 jsdoc 的「源:」（如
//       kojo-dungeon-bitch-log.js 的 LOOK.ERB 段）同样是追溯注释，所以
//       不只扫文件头。era-electron.js 是引擎 SDK，不扫。
//   (c) 范围式引用展开：注释里「<dir>/<stem><N>….ERB 至 <stem><M>….ERB」
//       按同目录 <stem><k>（N≤k≤M，k 后不接数字）枚举真实文件——
//       com-service.js:4 一处即覆盖 COMF30–38 九个文件。
//   通配符提及（CHARA<N>.ERB、口上/*.ERB）不算证据也不报悬空：前者由
//   yml 规则兜住，后者是词汇表出处声明（kojo-text.js 的 %…% 插值表），
//   展开它会把「数据来自哪些文件」误读成「这些文件已移植」。
//
// 五类判定（优先级自上而下，先中者胜）：
//   1. 已判定不实现：下方 RULINGS 显式表（每条带裁定出处）。表是显式
//      维护的：推翻裁定 = 改表；表项指向不存在的文件即红。
//   2. 纯声明：扩展名 .erh（大小写不敏感——音声的全局变量.erh 是小写，
//      分母 346 因此必须按不敏感计数，实测敏感计数只有 345）。
//   3. yml 承载 → 计已移植：キャラ関数/CHARA<数字>.ERB 且
//      yml/Chara<数字>.yml 在库（8 个 1–3 行的 EX_TALENT 空壳；真身在
//      ere/chara/chara-ex.js，头部用 CHARA<N> 通配提及——本规则同时兜住
//      通配形态，#331 误报规则 2）。
//   4. 证据 ∩ 未了结存根 → 部分移植：有移植产物、且存根清单
//      （docs/stub-registry.md 第一张表「函数级存根」——#329 普查用的
//      同一张）仍有未了结项归因到该文件。归因按「源」列：整路径包含、
//      裸文件名全库唯一、前缀速记（目录/前缀（……））三段匹配，兼容
//      清单里的 \_ 转义与 * 代 _ 两种写法；**表行的管道符后带不带空格
//      两种形态都认**（`| \`FN\`` 254 行与 `|\`FN\`` 30 行——人工维护的
//      表，prettier 对两种都判合格，规范化它会在下一次手写时重新失效，
//      后者手写清单行时照这两种形态之一写即可）。未了结 = 状态以
//      存根 / 部分实现 开头，或 登记（ 开头且不带死标记（判死 / 不移植
//      / 不实现 / 不可达 / 落空）——登记行一半是「判死 1:1 保留」，那
//      不是欠账是完结方式，计入会把带死分支的已移植文件永远卡在
//      部分移植。已实现行不欠账，不归因。归因不到的行（待核 / 无源 /
//      内建函数 / 目录级引用）不构成信号，由 UNATTRIBUTED_BASELINE
//      钉住总数（见判据 ⑥）。只解析第一张表：变量级 /
//      资源级 / @USERSHOP 各表粒度不同，#329 普查同样只认第一张。
//   5. 有证据、无未了结项 → 已移植。
//   6. 无任何证据 → 待移植（正判据是「三路证据并集为空」，不是兜底：
//      证据面坏了会被待移植基线拦下，见下）。
//
// 失败判据（#331 验收：「无未归类项」的具体化 + 两道只减不增基线）：
//   ① 分母漂移：target/ERB 枚举数 ≠ 346 即红——target/ 是只读输入，
//      变动必须显式重新裁定（改 DENOMINATOR）；
//   ② 证据悬空：注释/锚表/范围展开指向不存在的 .ER[BH] 即红——拼错
//      路径的「移植声明」等于没声明，静默放行会让对应文件假性待移植；
//   ③ RULINGS 表悬空：表项文件不存在即红（裁定被 target/ 变动架空）；
//   ④ 合计 ≠ 346：分类算术的兜底（正常路径到不了这里）；
//   ⑤ 待移植基线只减不增：PENDING_BASELINE 冻结现值，超出即红——
//      ①–④ 只能拦「表算不出来 / 算错账」，拦不住「证据面静默失效」
//      （比如追溯注释被整批改掉，所有文件悄悄退回待移植而合计仍是
//      346）。基线让每张移植票交付时必须显式抬低这个数——这正是
//      #331 把本表定为验收基准的机械形态；发现分类错了往回调同样
//      显式（改基线就是公告）。与 ANCHOR_QUALITY_BASELINE 同款
//      冻结语义；
//   ⑥ 归因不到行数基线只减不增：UNATTRIBUTED_BASELINE 冻结现值，超出
//      即红——静默多出一行归因不到，正是「欠账被漏成已实现」的方向
//      （待移植数与五类合计都不动，⑤ 也盲；验收实证：30 行无空格形态
//      被跳过时 MONSTER_SETUP 所在文件被报成已移植而无人看见）。新增
//      归因不到的行必须显式抬基线——那是把「这行确实挂不到文件上」
//      写成公告的时机。
//
// 用法（挂在 tools/trace-check.mjs 的 --coverage 下，本模块不进 CLI）：
//   node tools/trace-check.mjs --coverage            五类计数 + 基线
//   node tools/trace-check.mjs --coverage --list     逐文件列出（验收对账用）
//   node tools/trace-check.mjs --coverage --only <子串[,子串…]>
//     只分类路径含子串的 target 文件；分母 / 基线 / 表悬空核对按范围
//     跳过或收窄，报告行自报范围（限定范围的绿不是全量绿，探针用）。
//
// 已判定不实现之外的三处显式裁定落点（票内定夺，依据见 issue #331 评论）：
//   - DEBUG小白娘2024ver0.0.14.ERB 与 MOD/、魔改新增/ 未移植文件归
//     待移植：清单给它们挂着「调试票」「魔改子系统票」的归属，是排期
//     不是不实现（阶段 6 / #329 裁定 6）。
//   - 口上/EVENT_K902_普林希丝 ver1.0.3.ERB 归已移植（经证据）而非
//     清单 251 行的「不实现」：那行判的是普林希丝没有自己的口上
//     （#14 缺陷 1 的 1:1 保留）；文件里生效的那份 _903 定义与
//     :422-489 的双执行 EVENTEND 已随 kojo-k903-garde.js 落地
//     （锚表 K902_SOURCE 在案）。
//   - COMF203/205 等零证据文件归待移植而非死码：清单只判了
//     @COM202-206 的段（:105-269）判死，整文件级裁定没有做过，留给
//     后续票。

import fs from 'node:fs';
import path from 'node:path';

import { DEFAULT_TRACE_REFS_DIR, load_trace_refs } from './trace-refs-load.mjs';

// —— 常量与显式表 ——

/** 分母（#329 裁定 3 写死；大小写不敏感枚举的实测值，见文件头「纯声明」条） */
export const DENOMINATOR = 346;

/**
 * 待移植基线（#331 冻结，只减不增）。每张把文件做进 ere/ 的票交付时
 * 显式改小；改大 = 回退已移植内容或证据面失效，必须是有意识的公告。
 */
export const PENDING_BASELINE = 96;

/**
 * 存根清单「归因不到」行数基线（#331 验收整改冻结，只减不增）。归因不到
 * 的行（待核 / 无源 / 内建函数 / 目录级引用）不构成部分移植信号，本身
 * 合法——但**静默多出来一行**正是「欠账被漏成已实现」的方向：待移植数
 * 与五类合计都不动，其余判据全盲（验收实证：30 行无空格形态被跳过时，
 * MONSTER_DATA.ERB 被报成已移植而无人看见）。冻结后，新增归因不到的行
 * 必须显式抬基线——那是把「这行确实挂不到文件上」写成公告的时机。
 */
export const UNATTRIBUTED_BASELINE = 14;

/** 文件级「已判定不实现」显式表：推翻裁定 = 改这里（每条注明出处）。 */
export const RULINGS = [
  {
    path: 'target/ERB/TITLE.ERB',
    reason:
      '#12：根目录同名 @SYSTEM_TITLE 被引擎忽略（生效版 SYSTEM/TITLE ver1.0.8.ERB）',
  },
  {
    path: 'target/ERB/侵略/AGENT/AGENT.ERB',
    reason:
      '#103：DUNGEON.ERB 的旧快照拷贝（复制粘贴事故），生效版在迷宮/DUNGEON.ERB',
  },
  {
    path: 'target/ERB/侵略/AGENT/AGENT_1.ERB',
    reason: '#103：CAMPAIGN_1.ERB 的 0 差异拷贝，14 个函数全库无调用点',
  },
  {
    path: 'target/ERB/侵略/AGENT/AGENT_EVENT.ERB',
    reason:
      '#103：12 个共享函数以 CAMPAIGN_EVENT.ERB 版为准（@AGENT_MENU 不排期）',
  },
  {
    path: 'target/ERB/口上/EVENT_F1_丽塔.ERB',
    reason: '#251：口上模板残片，不落真身',
  },
  {
    path: 'target/ERB/口上/EVENT_K20_琼 ver1.0.0.ERB',
    reason: '#251：空文件（0 字节），K20 无槽位，不落真身',
  },
  {
    path: 'target/ERB/其他/DATA_FIX.ERB',
    reason:
      'ADR-0006：Emuera 旧档迁移补丁，读旧档已判出界（三行新档语义归读档钩子）',
  },
];

/** 登记行里的死标记：带这些词的登记是完结方式，不算未了结欠账。 */
const DEAD_MARKERS = ['判死', '不移植', '不实现', '不可达', '落空'];

const TARGET_ERB_DIR = 'target/ERB';
const STUB_REGISTRY = 'docs/stub-registry.md';

/** 注释块里的整路径提及（.ERB/.ERH，大小写不敏感） */
const PATH_RE =
  /target\/ERB\/[^\s'"`，、；;)）】」』]*?\.ER[BH](?=$|[\s'"`，、；;)）】」』])/gi;

/** 范围式引用：<dir>/<stem><N><rest>.ER[BH] 至 <同目录>.ER[BH] */
const RANGE_RE =
  /(target\/ERB\/[^*?\s'"`，、；;)）]+?\.ER[BH])\s*至\s*([^\s'"`，、；;)）]+?\.ER[BH])/g;

// —— 工具 ——

export function list_erb_files(repo) {
  const out = [];
  const stack = [TARGET_ERB_DIR];
  while (stack.length > 0) {
    const cur = stack.pop();
    for (const name of fs.readdirSync(path.join(repo, cur)).sort()) {
      const rel = `${cur}/${name}`;
      if (fs.statSync(path.join(repo, rel)).isDirectory()) {
        stack.push(rel);
      } else if (/\.er[bh]$/i.test(name)) {
        out.push(rel);
      }
    }
  }
  out.sort();
  return out;
}

function list_js_comment_blocks(dir_rel, repo) {
  const files = [];
  const stack = [dir_rel];
  while (stack.length > 0) {
    const cur = stack.pop();
    for (const name of fs.readdirSync(path.join(repo, cur)).sort()) {
      const rel = `${cur}/${name}`;
      if (fs.statSync(path.join(repo, rel)).isDirectory()) {
        stack.push(rel);
      } else if (name.endsWith('.js')) {
        files.push(rel);
      }
    }
  }
  files.sort();
  const out = [];
  for (const rel of files) {
    const text = fs.readFileSync(path.join(repo, rel), 'utf8');
    // 块注释（含文件头 jsdoc 与函数级 jsdoc）
    for (const m of text.matchAll(/\/\*[\s\S]*?\*\//g)) {
      out.push({ rel, text: m[0] });
    }
    // 文件起首连续 // 行（无 jsdoc 头的文件）
    if (!text.startsWith('/*')) {
      const head = [];
      for (const line of text.split(/\r?\n/)) {
        if (!line.startsWith('//')) break;
        head.push(line);
      }
      if (head.length > 0) out.push({ rel, text: head.join('\n') });
    }
  }
  return out;
}

function is_wildcard_mention(p) {
  return p.includes('<N>') || p.includes('*');
}

/**
 * 范围展开：把「A 至 B」按数字段枚举成同目录真实文件。
 * 只信两边同目录、同 stem、数字递增（≤200）的范围；枚举出的文件必须真实存在。
 */
export function expand_range_mentions(mentions, files_set) {
  const out = new Set();
  for (const mention of mentions) {
    for (const m of mention.text.matchAll(RANGE_RE)) {
      const [, a, b] = m;
      // 两端各自取「目录 / 词干 / 数字」；b 常省目录（com-service.js:4 的
      // 「COMF30_手淫.ERB 至 COMF38_足コキ.ERB」），词干必须一致才展开
      const ma = a.match(/^(.*)\/([^/]*?)(\d+)[^/]*\.ER[BH]$/i);
      const mb = b.match(/^(?:(.*)\/)?([^/]*?)(\d+)[^/]*\.ER[BH]$/i);
      if (!ma || !mb) continue;
      const dir = mb[1] ?? ma[1];
      const stem = ma[2];
      const from = Number(ma[3]);
      const to = Number(mb[3]);
      if (
        !stem ||
        ma[1] !== dir ||
        mb[2] !== stem ||
        to < from ||
        to - from > 200
      ) {
        continue;
      }
      for (let k = from; k <= to; k += 1) {
        const prefix = `${dir}/${stem}${k}`;
        for (const f of files_set) {
          if (
            f === `${prefix}.ERB` ||
            f === `${prefix}.ERH` ||
            f.startsWith(`${prefix}_`)
          ) {
            out.add(f);
          }
        }
      }
    }
  }
  return out;
}

// —— 存根清单归因 ——

function parse_stub_registry(text) {
  const lines = text.split(/\r?\n/);
  const start = lines.findIndex((l) => l.startsWith('## 函数级存根'));
  const end = lines.findIndex((l, i) => i > start && l.startsWith('## '));
  if (start < 0) {
    throw new Error('docs/stub-registry.md 里找不到「## 函数级存根」表');
  }
  return lines.slice(start + 1, end < 0 ? lines.length : end);
}

function is_outstanding(status) {
  if (status.startsWith('存根') || status.startsWith('部分实现')) return true;
  return (
    status.startsWith('登记（') && !DEAD_MARKERS.some((d) => status.includes(d))
  );
}

/**
 * 把「源」列归因到具体文件。三段匹配，兼容清单的 \_ 转义与 * 代 _：
 *   ① 整路径包含（目录/文件名.ERB）；② 裸文件名全库唯一；③ 前缀速记
 *   （目录/前缀（……）→ 目录下以前缀_ 起头的文件）。
 * 归因不到（待核 / 无源 / 内建函数 / 目录级引用）的行直接跳过：
 * 那些行的欠账挂在别处或无法定位，不构成任何文件的部分移植信号。
 */
export function attribute_stub_rows(repo, files) {
  const text = fs.readFileSync(path.join(repo, STUB_REGISTRY), 'utf8');
  const basenames = new Map();
  for (const f of files) {
    const b = f.slice(`${TARGET_ERB_DIR}/`.length).split('/').pop();
    if (!basenames.has(b)) basenames.set(b, []);
    basenames.get(b).push(f);
  }
  const attributed = new Map();
  let unattributed = 0;
  for (const line of parse_stub_registry(text)) {
    // 行形态两种都认：`| \`FN\``（带空格，254 行）与 `|\`FN\``（无空格，30 行，
    // 含 MONSTER_SETUP / PASSOUT_CHECK / SEIIN_START 等——漏掉即把它们静默
    // 报成已实现。清单是人工维护的表，两种形态 prettier 都判合格，规范化
    // 会在下一次有人手写时重新失效，所以认两种而不是改表）
    if (!/^\|\s*`/.test(line)) continue;
    const cells = line
      .split('|')
      .map((c) => c.trim())
      .filter((c, i, a) => !(c === '' && (i === 0 || i === a.length - 1)));
    const fn = cells[0].replace(/[`*]/g, '');
    const src = cells[1] ?? '';
    const status = cells[cells.length - 1] ?? '';
    if (!is_outstanding(status)) continue;
    const cell = src.replaceAll('\\_', '_');
    const hits = new Set();
    // ① 整路径包含（* 代 _ 的变体一并试）
    for (const variant of [cell, cell.replaceAll('*', '_')]) {
      for (const f of files) {
        if (variant.includes(f.slice(`${TARGET_ERB_DIR}/`.length))) hits.add(f);
      }
    }
    // ② 裸文件名（全库唯一才认）
    for (const m of cell.matchAll(
      /(?:^|[\s（(／/])([A-Za-z0-9_\- .]+?\.ER[BH])(?=$|[\s:：（(])/g,
    )) {
      const owners = basenames.get(m[1]);
      if (owners?.length === 1) hits.add(owners[0]);
    }
    // ③ 前缀速记：目录/前缀（……）
    const pm = cell.match(/([^\s/（()]+)\/([A-Za-z0-9_\-]+)（/);
    if (pm) {
      const prefix = `${pm[1]}/${pm[2]}`;
      for (const f of files) {
        const base = f.slice(`${TARGET_ERB_DIR}/`.length);
        if (base.startsWith(`${prefix}_`)) hits.add(f);
      }
    }
    if (hits.size === 0) {
      unattributed += 1;
      continue;
    }
    for (const f of hits) {
      if (!attributed.has(f)) attributed.set(f, []);
      attributed.get(f).push(fn);
    }
  }
  return { attributed, unattributed };
}

// —— 主流程 ——

/**
 * 生成移植状态表并打印。返回失败数（0 = 全绿），由调用方决定退出码。
 *
 * @param {{ repo: string, only?: string[], list?: boolean }} opts
 * @returns {number} 失败数
 */
export async function run_coverage({ repo, only = [], list = false }) {
  const failures = [];
  const fail = (msg) => failures.push(msg);
  const scoped = only.length > 0;
  const in_scope = (f) => !scoped || only.some((p) => f.includes(p));

  const files = list_erb_files(repo);
  const files_set = new Set(files);
  const scoped_files = files.filter(in_scope);

  // 证据 (a)：锚表 FILES.refs[].src（与 trace-check 同一加载器，单一真相源）。
  // 锚表也登记非 ERB 的锚源（如 target/資料_非必要無須解壓/ 的旗标文档
  // .txt）——那不是移植对象的证据，静默跳过。
  const { FILES } = await load_trace_refs(DEFAULT_TRACE_REFS_DIR);
  const src_evidence = new Set();
  for (const { refs } of FILES) {
    for (const { src } of refs) {
      if (/\.er[bh]$/i.test(src)) {
        if (files_set.has(src)) src_evidence.add(src);
        else if (!scoped || in_scope(src)) {
          fail(
            `✗ 锚表 src 悬空：${src}（FILES 登记，但 target/ERB/ 下不存在）`,
          );
        }
      }
    }
  }

  // 证据 (b)：ere/ 注释块里的整路径提及
  const mention_evidence = new Set();
  const mentions = [];
  for (const block of list_js_comment_blocks('ere', repo)) {
    if (block.rel === 'ere/era-electron.js') continue; // 引擎 SDK，非移植注释
    for (const m of block.text.matchAll(PATH_RE)) {
      mentions.push({ rel: block.rel, text: block.text, path: m[0] });
    }
  }
  for (const m of mentions) {
    if (is_wildcard_mention(m.path)) continue; // 通配形态，见文件头
    if (files_set.has(m.path)) mention_evidence.add(m.path);
    else if (!scoped || in_scope(m.path)) {
      fail(
        `✗ 证据悬空：${m.rel} 注释提及 ${m.path}，但该文件不存在（拼错路径的移植声明等于没声明）`,
      );
    }
  }

  // 证据 (c)：范围式引用展开
  const range_evidence = expand_range_mentions(mentions, files_set);

  // yml 承载（→ 已移植）
  const yml_carried = new Set(
    files.filter((f) => {
      const m = f.match(/^target\/ERB\/キャラ関数\/CHARA(\d+)\.ERB$/);
      return (
        m !== null && fs.existsSync(path.join(repo, 'yml', `Chara${m[1]}.yml`))
      );
    }),
  );

  // 未了结存根归因（部分移植信号）
  const { attributed, unattributed } = attribute_stub_rows(repo, files);

  const ruled = new Map(RULINGS.map((r) => [r.path, r.reason]));
  const categories = {
    已移植: [],
    部分移植: [],
    已判定不实现: [],
    待移植: [],
    纯声明: [],
  };
  for (const f of scoped_files) {
    if (ruled.has(f)) categories['已判定不实现'].push(f);
    else if (/\.erh$/i.test(f)) categories['纯声明'].push(f);
    else if (yml_carried.has(f)) categories['已移植'].push(f);
    else if (
      src_evidence.has(f) ||
      mention_evidence.has(f) ||
      range_evidence.has(f)
    ) {
      (attributed.has(f) ? categories['部分移植'] : categories['已移植']).push(
        f,
      );
    } else {
      categories['待移植'].push(f);
    }
  }

  // —— 判据 ①③④⑤（scoped 模式跳过全局核对，报告行自报范围） ——
  if (!scoped && files.length !== DENOMINATOR) {
    fail(
      `✗ 分母漂移：target/ERB/ 枚举到 ${files.length} 个 .ERB/.ERH，≠ ${DENOMINATOR}（#329 裁定 3 写死；target/ 是只读输入，变动须显式重新裁定 DENOMINATOR）`,
    );
  }
  for (const r of RULINGS) {
    if (!files_set.has(r.path) && (!scoped || in_scope(r.path))) {
      fail(`✗ 已判定不实现表悬空：${r.path} 不存在（${r.reason}）`);
    }
  }
  const total = Object.values(categories).reduce((s, a) => s + a.length, 0);
  if (!scoped && total !== DENOMINATOR) {
    fail(`✗ 五类合计 ${total} ≠ ${DENOMINATOR}（分类算术失守）`);
  }
  if (!scoped && categories['待移植'].length > PENDING_BASELINE) {
    fail(
      `✗ 待移植 ${categories['待移植'].length} 条，超出 #331 基线 ${PENDING_BASELINE}（只减不增：移植票交付必须显式抬低；超出 = 证据面失效或内容回退）`,
    );
  }
  if (!scoped && unattributed > UNATTRIBUTED_BASELINE) {
    fail(
      `✗ 清单归因不到 ${unattributed} 行，超出 #331 基线 ${UNATTRIBUTED_BASELINE}（只减不增：新行写清「源」列即可归因；确实挂不到文件上时显式抬基线——静默多出的归因不到正是欠账被漏成已实现的方向）`,
    );
  }

  // —— 输出 ——
  const parts = Object.entries(categories).map(([k, v]) => `${k} ${v.length}`);
  const scope_note = scoped
    ? `（本次限定范围：--only ${only.join(',')}，不等于全量核对）`
    : '';
  console.log(
    `移植状态表（#331）：${parts.join('；')}；合计 ${total}/${DENOMINATOR}${scope_note}`,
  );
  if (!scoped) {
    console.log(
      `待移植 ${categories['待移植'].length} / 基线 ${PENDING_BASELINE}（#331 只减不增，每张移植票交付时显式抬低）`,
    );
    console.log(
      `清单归因不到 ${unattributed} 行 / 基线 ${UNATTRIBUTED_BASELINE}（#331 只减不增，新行写清「源」列即可归因）`,
    );
  }
  if (list) {
    for (const [k, v] of Object.entries(categories)) {
      console.log(`—— ${k}（${v.length}）——`);
      for (const f of v.sort()) console.log(`${k} ${f}`);
    }
  }
  for (const msg of failures) console.log(msg);
  if (failures.length > 0) {
    console.log(`✗ 移植状态表 ${failures.length} 项失守${scope_note}`);
  }
  return failures.length;
}
