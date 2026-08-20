// 域边界检查器（issue #72）：跨域写未具名即红，存量冻结成只能变短的台账。
//
// 守什么：ere/ 游戏代码里的 era.set / era.add（写）与 era.get（读）。写的
// 判定依据是 ownership/ 的区段所有权产物（#66/#70 实测，16 张表、区间键
// 展开为逐下标属主）——属主域 ≠ 所在文件的域 = 跨域写，必须走属主域导出
// 的具名方法（门面 setter，#71）；裸字符串寻址的跨域写即红，除非落在台账。
// 跨域读放行（#70 实测：跨域读 42,741 次、高度分散，强制走方法 = 约 4.3
// 万处样板——ADR-0002「跨域读放行，跨域写具名」），但计数进报告，可见
// 而不强制。
//
// 怎么守（照 tools/trace-check.mjs 的形状，#63 已被多轮验收探针打过）：
//   1. 台账在 tools/domain-ledger.mjs（条目 = 文件 → 寻址串 → 次数），
//      与代码实测逐条对账：代码多出即红（未登记的跨域写，新文件自动
//      纳入——扫描的是 ere/ 全树，不是登记表）；代码少了也红（条目
//      发霉：访问被删或改写，须同步删/减）。
//   2. 基线 LEDGER_BASELINE 内嵌在本工具本体：台账条目必须逐条落在基线
//      内、计数不得超过基线——扩基线必须显式改这份常量，在版本库差异
//      里看得见。台账是「尚未迁移」的欠账表，不是「可以这么写」的许可。
//   3. 判定依据全部读产物与代码，不在本工具里硬编码属主：所有权来自
//      ownership/<表>-ownership.yml；「某寻址有没有具名方法」来自解析
//      ere/facade/*.js 的访问器注释；文件属于哪个域来自下方 DIR_DOMAINS。
//
// 台账条目的标识形态：文件 → `表:下标` → 次数。行号会随编辑腐烂、同一
// 寻址串在同一文件里可能重复，故不用行号；次数吸收重复——修掉一处，
// 计数减一（改台账，差异可见），修光则删条目。era.set 与 era.add 记同
// 一条（欠账是「这处跨域写还没走门面」，与写法无关）。
//
// 不判定的写（只计数进报告，不红）：动态下标（`tflag:${i}`，静态无法
// 知道写了哪些下标——与 test/static-table-coverage 只扫字面量前缀同款
// 口径）；表无所有权产物（juel / delta / ex_talent 等 #70 未测量或引擎
// 内建表，测量补齐前无判定依据——表清单也从 ownership/ 目录推导，产物
// 落地即自动纳入）；下标无测量事实（如 flag:10000+ 保留区，#70 只对
// 原作实写下标给出属主）。拼接/变量首参（`'flag:' + n`）静态连寻址串都
// 拿不到，清点为「不可见」逐处点名进报告——不判定，但必须被看见。
// cid 段认字面量与模板两种形态（`base:0:2` 与 `base:${cid}:2` 同判，
// 属主与角色无关）。这不与「写变量前所属静态表必须已落地」（名字表不
// 在 + 桶在 → 硬崩）混为一谈——那是引擎表覆盖问题
// （test/static-table-coverage.test.js），这里是域边界问题。
//
// 包装层的排除按角色显式声明（不是目录逃生门）：WRAPPER_FILES 逐文件
// 列出 ere/facade/ 与 ere/era-utils/ 里承担「具名方法本体」的模块——它们
// 的裸寻址是职责不是违规。口子收在两层：条目必须落在 WRAPPER_HOMES 两
// 个包装层目录里（游戏代码目录永远进不了这张表），且包装层里未登记的
// 新文件没有域映射，同样红（往 ere/facade/ 塞文件逃不掉）。era-electron.js
// 是引擎 SDK，整体跳过（与 trace-check 同款）。
//
// 用法：node tools/domain-check.mjs [--print-ledger]
//   全绿退出码 0；任何失配退出码 1。--print-ledger 打印当前实测的台账
//   形状（首次冻结、或属主产物重测后需要整体重算时用；日常消化存量 =
//   手工删/减条目，不走过这里）。

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { DOMAIN_LEDGER } from './domain-ledger.mjs';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// —— 配置常量（显式声明，改动即版本库差异）——

/**
 * 所有权产物覆盖的表：从 ownership/ 目录推导（* -ownership.yml），不逐张
 * 硬编码——测量补齐新表（juel 等）时产物落地即自动纳入判定（代码审查
 * c-3：表清单也是「来自产物」的一部分）。
 */
function list_ownership_tables() {
  return fs
    .readdirSync(path.join(REPO, 'ownership'))
    .filter((name) => name.endsWith('-ownership.yml'))
    .map((name) => name.slice(0, -'-ownership.yml'.length))
    .sort();
}

/** 引擎 SDK：不是游戏代码，整体跳过（trace-check 同款口径） */
const SDK_FILE = 'ere/era-electron.js';

/** 包装层目录：WRAPPER_FILES 的条目只准落在这里（角色门槛，防白名单被挪用） */
const WRAPPER_HOMES = ['ere/facade/', 'ere/era-utils/'];

/**
 * 包装层模块（按角色显式声明，#71 生成的门面 + 既有的扁平包装层）。
 * 它们是「具名方法的本体」，裸寻址是职责不是违规。新包装文件必须显式
 * 加进这张表；包装层目录里未登记的文件没有域映射，检查器照样红。
 */
const WRAPPER_FILES = [
  'ere/era-utils/era-audio.js',
  'ere/era-utils/era-flag.js',
  'ere/era-utils/era-global.js',
  'ere/era-utils/palam-level.js',
  'ere/facade/chara-chara.js',
  'ere/facade/chara-dungeon.js',
  'ere/facade/chara-event.js',
  'ere/facade/chara-kojo.js',
  'ere/facade/chara-patch.js',
  'ere/facade/chara-stronghold.js',
  'ere/facade/chara-system.js',
  'ere/facade/chara-train.js',
  'ere/facade/chara.js',
  'ere/facade/game-chara.js',
  'ere/facade/game-dungeon.js',
  'ere/facade/game-event.js',
  'ere/facade/game-invasion.js',
  'ere/facade/game-kojo.js',
  'ere/facade/game-stronghold.js',
  'ere/facade/game-system.js',
  'ere/facade/game-train.js',
  'ere/facade/game.js',
];

/**
 * 子目录 → 域（段边界最长匹配；未认领即红）。ere/ 的目录布局就是移植侧
 * 的域声明（AGENTS.md 的导入分组同款词汇）；target/ERB/ 一级目录 → 域
 * 的映射在 ownership/domains.yml（#70），两边不是同一套布局。
 * page / utils 是伪域：表现层与工具层不拥有任何玩法状态，写玩法表
 * 即跨域（读放行）——这正是「界面写状态应走门面」的架构意图。
 * ere/ 根下直接摆放的文件（main.js 等基础设施）属 system，不走本表，
 * 也不给「ere/ 全树」兜底——否则包装层目录里未登记的新文件会被静默
 * 归进 system，白名单就退化成了目录逃生门。
 */
const DIR_DOMAINS = [
  ['ere/system/train', 'train'],
  ['ere/kojo', 'kojo'],
  ['ere/chara', 'chara'],
  ['ere/event', 'event'],
  ['ere/system', 'system'],
  ['ere/page', 'page'],
  ['ere/utils', 'utils'],
];

/**
 * 台账冻结基线（issue #72 首冻）。台账（tools/domain-ledger.mjs）的每条
 * 条目必须落在本基线内、计数不得超过——「只能变短」。消化存量 = 删/减
 * 台账条目；扩基线必须显式改这份常量。
 */
const LEDGER_BASELINE = {
  'ere/event/event-com.js': {
    'tflag:100': 1,
  },
  'ere/event/event-comend.js': {
    'tflag:34': 2,
  },
  'ere/event/event-end.js': {
    'base:1': 2,
    'cflag:81': 2,
    'cflag:82': 2,
    'flag:7': 2,
    'tflag:860': 2,
  },
  'ere/event/event-first.js': {
    'cflag:1': 1,
    'cflag:11': 1,
    'cflag:12': 1,
    'cflag:13': 1,
    'cflag:14': 1,
    'cflag:16': 1,
    'cflag:420': 1,
    'cflag:450': 1,
    'cflag:451': 1,
    'cflag:9': 1,
    'flag:35': 1,
    'flag:37': 1,
    'flag:5': 1,
    'flag:500': 1,
  },
  'ere/event/event-train.js': {
    'base:2': 3,
    'base:3': 1,
    'base:4': 1,
    'cflag:10': 1,
    'palam:3': 1,
    'palam:5': 1,
    'tflag:402': 1,
  },
  'ere/event/first-setting.js': {
    'flag:501': 1,
  },
  'ere/event/source-check.js': {
    'abl:10': 9,
    'abl:11': 1,
    'cflag:2': 1,
    'exp:2': 1,
    'exp:33': 1,
    'mark:0': 3,
    'mark:1': 3,
    'mark:2': 3,
    'mark:3': 3,
    'mark:4': 3,
    'talent:13': 1,
    'tflag:14': 1,
    'tflag:150': 1,
    'tflag:200': 6,
    'tflag:21': 3,
    'tflag:22': 3,
    'tflag:23': 3,
    'tflag:24': 3,
    'tflag:25': 1,
    'tflag:29': 2,
    'tflag:30': 4,
    'tflag:50': 1,
  },
  'ere/page/page-select-target.js': {
    'flag:1': 1,
    'flag:2': 1,
  },
  'ere/page/page-shop.js': {
    'flag:36': 4,
  },
  'ere/page/page-train.js': {
    'tflag:999': 1,
  },
};

// —— 所有权产物：区间键展开为逐下标属主（同 tools/gen-facade.js 的解析） ——

const ownership_cache = new Map();

function parse_ownership(text) {
  const owned = new Map();
  const re = /^"(\d+)(?:-(\d+))?":\r?\n {2}owner: ([a-z][a-z0-9_]*)/gm;
  let match;
  while ((match = re.exec(text))) {
    const start = Number(match[1]);
    const end = match[2] ? Number(match[2]) : start;
    const owner = match[3];
    for (let i = start; i <= end; i += 1) {
      owned.set(i, owner);
    }
  }
  return owned;
}

function load_owners(table) {
  if (!ownership_cache.has(table)) {
    const file = path.join(REPO, 'ownership', `${table}-ownership.yml`);
    ownership_cache.set(table, parse_ownership(fs.readFileSync(file, 'utf8')));
  }
  return ownership_cache.get(table);
}

// —— 扫描 ——

function list_js_files(dir) {
  const out = [];
  const walk = (rel) => {
    const abs = path.join(REPO, rel);
    for (const entry of fs.readdirSync(abs, { withFileTypes: true })) {
      const child = `${rel}/${entry.name}`;
      if (entry.isDirectory()) {
        walk(child);
      } else if (entry.name.endsWith('.js')) {
        out.push(child);
      }
    }
  };
  walk(dir);
  return out.sort();
}

/** 子目录段边界最长匹配；ere/ 根下的文件属 system；未认领返回 null */
function file_domain(rel) {
  if (!rel.slice('ere/'.length).includes('/')) {
    return 'system';
  }
  let best = null;
  for (const [prefix, domain] of DIR_DOMAINS) {
    if (!rel.startsWith(`${prefix}/`)) {
      continue;
    }
    if (best === null || prefix.length > best[0].length) {
      best = [prefix, domain];
    }
  }
  return best ? best[1] : null;
}

/**
 * 解析门面访问器注释，建立 `表:下标` → 具名方法 的映射（报错的整改
 * 指引用；门面本体的裸寻址不进扫描——WRAPPER_FILES 已排除）。
 * 注释形态（gen-facade 生成）：`   * 录像开始状况（flag:22 ↔ FLAG:22）`
 * 与 `   * 爱抚（cflag:cid:301 ↔ CFLAG:301）`。
 */
function parse_accessors() {
  const accessors = new Map();
  for (const file of fs.readdirSync(path.join(REPO, 'ere', 'facade'))) {
    if (!file.endsWith('.js')) {
      continue;
    }
    const kind = file.startsWith('game-')
      ? ['game', file.slice('game-'.length, -3)]
      : file.startsWith('chara-')
        ? ['chara(cid)', file.slice('chara-'.length, -3)]
        : null;
    if (!kind) {
      continue;
    }
    const text = fs.readFileSync(
      path.join(REPO, 'ere', 'facade', file),
      'utf8',
    );
    const re =
      /^ {3}\* (.+?)（([a-z_]+):(?:(?:cid|\$\{this\.cid\}):)?(-?\d+) ↔ /gm;
    let match;
    while ((match = re.exec(text))) {
      accessors.set(
        `${match[2]}:${match[3]}`,
        `${kind[0]}.${kind[1]}.${match[1]}`,
      );
    }
  }
  return accessors;
}

/**
 * 扫单个 js 文本里的 era.get/set/add 调用。字符串首参（字面量或模板串）
 * 逐处解析；cid 段认 `${...}` 与字面量数字两种形态（`base:0:2` 与
 * `base:${cid}:2` 同判——代码审查实证曾有 14 处字面量 cid 写被当成动态
 * 下标漏出台账）；多行调用按整文件正则捕获，行号用换行计数回算。
 * 返回 [{ op, table, index | null, line }]：index 为 null = 动态下标
 * （模板串下标位含 ${} 或名字下标）。
 */
function scan_calls(text) {
  const calls = [];
  const re = /era\.(get|set|add)\s*\(\s*(`[^`]*`|'[^']*'|"[^"]*")\s*[,)]/g;
  let match;
  while ((match = re.exec(text))) {
    const op = match[1];
    const raw = match[2].slice(1, -1);
    const line = text.slice(0, match.index).split('\n').length;
    const parts = raw.split(':');
    const table = /^[a-z][a-z0-9_]*$/.test(parts[0]) ? parts[0] : null;
    const index_part = parts[parts.length - 1];
    const cid_ok =
      parts.length === 2 ||
      (parts.length === 3 &&
        (/^\$\{.*\}$/.test(parts[1]) || /^\d+$/.test(parts[1])));
    const shape_ok = table !== null && cid_ok && /^-?\d+$/.test(index_part);
    calls.push({
      op,
      table,
      index: shape_ok ? Number(index_part) : null,
      line,
    });
  }
  return calls;
}

/**
 * 清点扫描正则看不见的调用：首参是拼接（`'flag:' + n`）或变量等非纯串
 * 形态。当前存量实测为零；一旦出现即计入「动态/不可见」——拼接下标静态
 * 无法判定属主，但必须被看见，不许静默逃逸（代码审查 c-2）。
 * 返回 [{ op, line }]。
 */
function scan_invisible_calls(text) {
  const invisible = [];
  const openers = /era\.(get|set|add)\s*\(/g;
  const strings = /era\.(get|set|add)\s*\(\s*(`[^`]*`|'[^']*'|"[^"]*")\s*[,)]/g;
  const seen = new Set();
  let match;
  while ((match = strings.exec(text))) {
    seen.add(match.index);
  }
  while ((match = openers.exec(text))) {
    if (!seen.has(match.index)) {
      invisible.push({
        op: match[1],
        line: text.slice(0, match.index).split('\n').length,
      });
    }
  }
  return invisible;
}

/** 实测：跨域写按文件 → 寻址串 → 次数；其余类别只计数 */
function measure() {
  const accessors = parse_accessors();
  const ownership_tables = list_ownership_tables();
  const cross_writes = new Map(); // file -> Map(key -> count)
  // `${file} ${key}` -> 行号数组（按出现序，报错逐处指位）
  const cross_write_sites = new Map();
  const stats = {
    files: 0,
    reads: { intra: 0, cross: 0, dynamic: 0, no_table: 0, no_fact: 0 },
    writes: { intra: 0, dynamic: 0, no_table: 0, no_fact: 0 },
    cross_read_by_table: new Map(),
    invisible_sites: [],
    unmapped: [],
  };
  for (const rel of list_js_files('ere')) {
    if (rel === SDK_FILE || WRAPPER_FILES.includes(rel)) {
      continue;
    }
    const domain = file_domain(rel);
    if (domain === null) {
      stats.unmapped.push(rel);
      continue;
    }
    stats.files += 1;
    const text = fs.readFileSync(path.join(REPO, rel), 'utf8');
    // 拼接/变量首参：看不见的调用先清点（不判定，但必须可见）
    for (const { op, line } of scan_invisible_calls(text)) {
      (op === 'get' ? stats.reads : stats.writes).dynamic += 1;
      stats.invisible_sites.push(`${rel}:${line} ${op}（拼接/变量首参）`);
    }
    for (const call of scan_calls(text)) {
      const is_write = call.op !== 'get';
      const kind = is_write ? stats.writes : stats.reads;
      if (call.table === null || call.index === null) {
        kind.dynamic += 1;
        continue;
      }
      if (!ownership_tables.includes(call.table)) {
        kind.no_table += 1;
        continue;
      }
      const owner = load_owners(call.table).get(call.index);
      if (owner === undefined) {
        kind.no_fact += 1;
        continue;
      }
      if (owner === domain) {
        kind.intra += 1;
        continue;
      }
      if (is_write) {
        const key = `${call.table}:${call.index}`;
        if (!cross_writes.has(rel)) {
          cross_writes.set(rel, new Map());
        }
        const bucket = cross_writes.get(rel);
        bucket.set(key, (bucket.get(key) ?? 0) + 1);
        const sites_key = `${rel} ${key}`;
        if (!cross_write_sites.has(sites_key)) {
          cross_write_sites.set(sites_key, []);
        }
        cross_write_sites.get(sites_key).push(call.line);
      } else {
        stats.reads.cross += 1;
        stats.cross_read_by_table.set(
          call.table,
          (stats.cross_read_by_table.get(call.table) ?? 0) + 1,
        );
      }
    }
  }
  return { accessors, cross_writes, cross_write_sites, stats };
}

function remedy_for(accessors, key) {
  const named = accessors.get(key);
  if (named) {
    return `门面已有 ${named}（ere/facade/）——改用之`;
  }
  return `门面尚无 ${key} 的访问器——先在 tools/facade-names.js 补名并 node tools/gen-facade.js --force（#71 裁定三：未命名属主下标不进门面，ownership/ 仍登记），再改用之`;
}

// —— 对账 ——

function run() {
  const { accessors, cross_writes, cross_write_sites, stats } = measure();
  let failures = 0;

  // 0) 目录认领 + 包装层白名单的角色门槛
  for (const rel of stats.unmapped) {
    const hint = WRAPPER_HOMES.some((home) => rel.startsWith(home))
      ? '（包装层新文件须显式登记 WRAPPER_FILES）'
      : '（新目录须在 DIR_DOMAINS 认领，照 ownership-scan 的纪律）';
    console.log(`✗ ${rel} —— 目录未认领：检查器不知道它属于哪个域${hint}`);
    failures += 1;
  }
  for (const rel of WRAPPER_FILES) {
    if (!fs.existsSync(path.join(REPO, rel))) {
      console.log(
        `✗ ${rel} —— WRAPPER_FILES 条目已不存在（文件被删或改名，同步删本条）`,
      );
      failures += 1;
      continue;
    }
    if (!WRAPPER_HOMES.some((home) => rel.startsWith(home))) {
      console.log(
        `✗ ${rel} —— WRAPPER_FILES 条目不在包装层目录（${WRAPPER_HOMES.join(' / ')}）里：游戏代码不能借这张表白名单`,
      );
      failures += 1;
    }
  }

  // 1) 代码侧：每处跨域写都必须在台账里，且次数对得上（逐处指位）
  for (const [rel, bucket] of cross_writes) {
    const ledger = DOMAIN_LEDGER[rel] ?? {};
    for (const [key, actual] of bucket) {
      const ledger_count = ledger[key] ?? 0;
      if (actual > ledger_count) {
        const sites = cross_write_sites.get(`${rel} ${key}`);
        for (let n = ledger_count; n < actual; n += 1) {
          console.log(
            `✗ ${rel}:${sites[n]} 裸跨域写 ${key}（第 ${n + 1}/${actual} 处）不在台账——${remedy_for(accessors, key)}`,
          );
          failures += 1;
        }
      }
    }
  }

  // 2) 台账侧：条目发霉即红（代码里已不存在），且逐条落在 #72 基线内
  for (const [rel, ledger] of Object.entries(DOMAIN_LEDGER)) {
    const actual_bucket = cross_writes.get(rel) ?? new Map();
    if (WRAPPER_FILES.includes(rel)) {
      console.log(
        `✗ ${rel} —— 台账条目指向包装层文件（包装层经 WRAPPER_FILES 排除，不该有台账欠账）`,
      );
      failures += 1;
      continue;
    }
    for (const [key, count] of Object.entries(ledger)) {
      const actual = actual_bucket.get(key) ?? 0;
      if (count > actual) {
        console.log(
          `✗ ${rel} ${key} —— 台账计数 ${count} > 代码实际 ${actual}（条目发霉：访问被删或改写，同步删/减本条；台账只能变短）`,
        );
        failures += 1;
      }
      const baseline = LEDGER_BASELINE[rel]?.[key];
      if (baseline === undefined) {
        console.log(
          `✗ ${rel} ${key} —— 台账条目不在 #72 基线内（只能变短：消化存量 = 删/减条目；新跨域写走门面，扩基线必须显式改 LEDGER_BASELINE）`,
        );
        failures += 1;
      } else if (count > baseline) {
        console.log(
          `✗ ${rel} ${key} —— 台账计数 ${count} 超 #72 基线 ${baseline}（扩基线必须显式改 LEDGER_BASELINE，在版本库差异里看得见）`,
        );
        failures += 1;
      }
    }
  }

  // —— 报告（放行的读与不判定的写：可见，不强制）——
  const ledger_entries = Object.values(DOMAIN_LEDGER).reduce(
    (sum, ledger) => sum + Object.keys(ledger).length,
    0,
  );
  const cross_write_total = [...cross_writes.values()].reduce(
    (sum, bucket) => sum + [...bucket.values()].reduce((a, b) => a + b, 0),
    0,
  );
  const top_reads = [...stats.cross_read_by_table.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([table, count]) => `${table} ${count}`)
    .join(' / ');
  const w = stats.writes;
  const r = stats.reads;
  if (failures === 0) {
    const report = [
      `✓ 域边界：${stats.files} 个游戏文件，跨域写 ${cross_write_total} 处全数在账（台账 ${ledger_entries} 条，#72 基线内只减不增）`,
      `  写：域内 ${w.intra} · 在账 ${cross_write_total} · 不判定 ${w.dynamic + w.no_table + w.no_fact}（动态 ${w.dynamic} · 无所有权表 ${w.no_table} · 无测量事实 ${w.no_fact}）`,
      `  读：域内 ${r.intra} · 跨域放行 ${r.cross}（前五表：${top_reads}）· 不判定 ${r.dynamic + r.no_table + r.no_fact}`,
    ];
    // 拼接/变量首参：存量应为零；出现即逐处点名，不留静默逃生口
    for (const site of stats.invisible_sites) {
      report.push(`  ⚠ ${site} —— 静态不可判定，须改字面量/模板串或走门面`);
    }
    console.log(report.join('\n'));
  } else {
    // 汇总不枚举门名：哪条门触发了，上方逐条消息已经写明；枚举会让
    // 「文案断言」型的测试被未触发的门名误满足（M902 曾因此漏网）
    console.log(`✗ ${failures} 处域边界失守（逐条见上）`);
  }
  return failures;
}

/** 打印当前实测的台账形状（首次冻结、属主产物重测后整体重算时用） */
function print_ledger() {
  const { cross_writes } = measure();
  const lines = [];
  for (const rel of [...cross_writes.keys()].sort()) {
    const entries = [...cross_writes.get(rel).entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, count]) => `    '${key}': ${count},`)
      .join('\n');
    lines.push(`  '${rel}': {\n${entries}\n  },`);
  }
  console.log(lines.join('\n'));
}

// —— 入口 ——

if (process.argv.includes('--print-ledger')) {
  print_ledger();
} else {
  process.exit(run() === 0 ? 0 : 1);
}
