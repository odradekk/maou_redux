/**
 * @file 静态地址的序号必须落在 yml 的声明集内（issue #970）。
 *
 * == 为什么要锁 ==
 *
 * 引擎在名字表里查不到序号时**不报错**：三段寻址的回落分支把下标原样当成
 * 数字（`safeUndefinedCheck`），于是「代码想读一个真槽、实际读不到」这类
 * 写法完全静默。`test/static-table-coverage.test.js` 只查「表在不在」，
 * 查不出序号在不在。
 *
 * #923 就是这一层：`Palam.yml` 只声明 0–15 与 100，`com-caress` 的
 * `train_message_a_3` 却把 `delta:<角色>:17` 读成 D 段，D 恒为 0，六档文案
 * 的判定里那一项从未参与过——没有报错、没有日志，只有一条从没生效过的加法。
 *
 * 所以这里把「序号落在声明集内」变成断言：扫 `ere/` 里 `era.get/set/add` 的
 * 字面量地址（单引号、双引号、模板串都扫，跳过注释与引擎 SDK），把最后一个
 * 冒号段当序号——`` `delta:${cid}:17` `` 取 17，`'flag:123'` 取 123——核对它
 * 落在对应 yml 的声明集里。
 *
 * == 判据是「解析后至少一条条目」，不是「文件存在」 ==
 *
 * 声明集按引擎装载器认的形状解析（`"键":` 顶格 + 两空格缩进的 `id: N`）。
 * **文件存在不算声明集**：`TFlag.yml` / `TEquip.yml` / `Stain.yml` 在 #830
 * 之前是只有注释的空表，那时把「文件存在」当判据，等于说它们的声明集是空集，
 * 任何序号都越界——几百条红全是「表故意为空」的噪音，防线会退化成噪音然后
 * 被人加豁免加到失效。
 *
 * 现在按「解析出 ≥ 1 条条目」判：解析不出条目的表（`tstr` 这类只有注释的空表，
 * 以及 `callname` / `relation` 这类引擎内置、根本没有 yml 的表）归到
 * **无声明集表** 一类跳过。将来再加一张空表，是这一族多一张，不是立刻炸。
 *
 * == 两类跳过都要报数 ==
 *
 *   - **动态地址**：序号段是拼的（`flag:${n}`、`tflag:${template_no + 199}`），
 *     本票不做值域分析——跳过并计数；
 *   - **无声明集表**：上面那一族——跳过并计数（按表统计处数）。
 *
 * 两个数字既写进断言的失败信息，也在用例里用 `t.diagnostic` 打出来。只报
 * 「通过」的话，「所有地址都被跳过」与「所有地址都合格」在输出里长得一模一样，
 * 扫描面自检（文件数、地址数、声明集表数、动态地址数各有下限）就是拦这种
 * 全员静默的那道门。
 *
 * == 已知越界：只报告，不在本票修 ==
 *
 * master 上仍有一批真实越界项，按工单边界钉在 `KNOWN_GAPS` 里逐格列出（每族
 * 一条理由）。断言是**精确相等**：新出现一格当场红，修好一格也要回来删掉
 * （清单只许缩短）。这样「有豁免就绿」不会发生——清单本身是被断言的。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const REPO_ROOT = path.resolve(__dirname, '..');
const ERE_DIR = path.join(REPO_ROOT, 'ere');
const YML_DIR = path.join(REPO_ROOT, 'yml');

// 地址抽取不另写一套：与 ere_check_game 共用同一份只读扫描器
const {
  blankComments,
  extractDataPaths,
  listFilesUnder,
} = require('../tools/ere-game-builder/lib/js-scan.js');

/**
 * 源码里在用、yml 没声明的序号。逐格列出，精确相等。
 *
 * 四张表按「已登记的范围由建模决定」放着等族票：#830 把 tflag / tequip /
 * stain / cstr 的登记面钉在 train-table-names.test.js 里，缺口清单那边有一份
 * （tequip 的十四个装具位、stain 的 0/1/4、cstr 的 30），两份必须一起缩。
 *
 * 清单只许缩短：登记面补上一格，这里就要删掉那一格（断言是精确相等，忘删
 * 当场红）。#982 把 cflag 从 213 条补到 254 条、其余 41 格进了名字表之后，
 * 这一族就只剩下面两格。
 */
const KNOWN_GAPS = {
  // cflag 剩下的两格：其余 41 格已在 #982 登记进 CFlag.yml，本清单只留确实
  // 没有名字来源的两格（`UNNAMED_IDS` 的同款两格）。新出现一格仍要红——那
  // 说明有人又写了个「想读真槽、实际读 0」的点。
  cflag: [77, 621],
  // 装具位与污渍位：源码照写在用、facade-names 没有名字来源的位，随各自的
  // 族票建模（#215 的十四个未建模装具位、三个污渍位）。
  tequip: [11, 13, 14, 15, 16, 17, 19, 43, 44, 46, 47, 49, 88, 98],
  stain: [0, 1, 4],
  // 处刑称号：只写不读、没有名字来源。
  cstr: [30],
  // 以下三张是真的越界——代码想读的槽不存在、读到恒 0。各开票修，不在 #970
  // （talent / abl / exp 归 #991）。
  talent: [120, 178, 179, 221, 1000, 1254],
  abl: [5, 70],
  exp: [90, 91],
};

/** 表名 → 声明集所在的表。引擎把几族数据分进多张桶，名字表只有一份。 */
const ALIAS = new Map([
  ['juel', 'palam'],
  ['param', 'palam'],
  ['gotjuel', 'palam'],
  ['gotjewel', 'palam'],
  ['jewel', 'palam'],
  ['delta', 'palam'],
  ['nowex', 'ex'],
  ['maxbase', 'base'],
  ['deltabase', 'base'],
  ['itemprice', 'item'],
  ['itemsales', 'item'],
]);

/**
 * 解析一份 yml 文本里声明的序号。
 *
 * 形状与引擎装载器一致：`"键":` 顶格起条目，紧随的 `  id: N` 是该条目的序号。
 * 只有注释、`{}` 或干脆空白的文件解析出零条——**零条即「没有声明集」**，
 * 与「声明集是空集」是两件事。
 *
 * @param {string} text yml 全文
 * @returns {Set<number>} 声明的序号
 */
function parse_declared_ids(text) {
  const ids = new Set();
  let in_entry = false;
  for (const line of text.split('\n')) {
    if (/^"[^"]+":\s*$/.test(line)) {
      in_entry = true;
      continue;
    }
    const id_match = /^ {2}id:\s*(\d+)$/.exec(line);
    if (id_match && in_entry) {
      ids.add(Number(id_match[1]));
      in_entry = false;
    }
  }
  return ids;
}

let cached_sets;

/**
 * 表名（小写）→ { file, ids }。**解析不出条目的表不进这张图**——它们与
 * 「表不存在」同在「无声明集」一类，而不是「声明集是空集」。
 */
function declaration_sets() {
  if (cached_sets !== undefined) {
    return cached_sets;
  }
  cached_sets = new Map();
  for (const file of fs.readdirSync(YML_DIR)) {
    if (!file.endsWith('.yml')) {
      continue;
    }
    const ids = parse_declared_ids(
      fs.readFileSync(path.join(YML_DIR, file), 'utf8'),
    );
    if (ids.size > 0) {
      cached_sets.set(file.replace(/\.yml$/i, '').toLowerCase(), {
        file,
        ids,
      });
    }
  }
  return cached_sets;
}

/**
 * 地址里的表名 → 声明集所在的表名。
 *
 * `<表>name` / `<表>keys` 是读名字与序号的写法（`palamname:16` 查的是 Palam
 * 的第 16 格），去掉后缀能查到才这么算——`callname` 自己就是一张表，不是
 * `call` 的名字读法。查不到的一律原样返回，由调用方计入「无声明集表」。
 *
 * @param {string} table 地址里的表名（小写）
 * @returns {string} 声明集所在的表名
 */
function declaration_table_of(table) {
  const sets = declaration_sets();
  const base = table.replace(/(?:name|keys)$/, '');
  for (const candidate of [base, ALIAS.get(base) ?? base]) {
    if (sets.has(candidate)) {
      return candidate;
    }
  }
  return ALIAS.get(table) ?? table;
}

/** 把序号集合写成 `0-15,100` 这样的紧凑区间 */
function format_ids(ids) {
  const sorted = [...ids].sort((a, b) => a - b);
  const runs = [];
  for (const id of sorted) {
    const last = runs[runs.length - 1];
    if (last && id === last[1] + 1) {
      last[1] = id;
    } else {
      runs.push([id, id]);
    }
  }
  return runs.map(([a, b]) => (a === b ? `${a}` : `${a}-${b}`)).join(',');
}

/**
 * 行号游标：`extractDataPaths` 的偏移是递增的，逐字符推进即可摊还 O(n)。
 * 换成 `lineAt(source, offset)` 就成了每处地址重扫一遍全文——两万多处地址
 * 在最大的口上文件上要几十秒。
 *
 * @param {string} source 源码全文
 * @returns {(offset: number) => number} 1 基行号
 */
function line_cursor(source) {
  let line = 1;
  let cursor = 0;
  return (offset) => {
    while (cursor < offset) {
      if (source.charCodeAt(cursor) === 0x0a) {
        line += 1;
      }
      cursor += 1;
    }
    return line;
  };
}

/**
 * 扫一份源码里 `era.get/set/add` 的字面量地址，按声明集核对最后一个冒号段。
 *
 * 地址的抽取交给 `tools/ere-game-builder/lib/js-scan.js` 的现成扫描器
 * （`blankComments` 把注释换成空格、偏移不动，`extractDataPaths` 只认第一种
 * 引号 / 模板串写法），与 `ere_check_game` 用的是同一份——报出来的地址与那里
 * 认的一致，不会两处各有一套正则。
 *
 * 表名本身是插值的地址（`${table}:0`）与序号是插值的地址同样无从核对，都算
 * 动态；解析不到声明集的表单独计数，与动态地址分开——两类都是「跳过」，混成
 * 一个数字就分不清是值域分析缺席还是表没建模。
 *
 * 整条地址是变量传进来的调用（`era.get(address)`）不在这个扫描面上：那不是
 * 约定了具体序号的地址，本票的值域分析也没有更多可说。
 *
 * @param {string} source 源码全文
 * @param {string} file_name 报告里用的文件名
 * @returns {{ violations: object[], dynamic: number, addresses: number,
 *            no_declaration: Map<string, number>, checked: Map<string, number> }}
 */
function scan_source(source, file_name) {
  const violations = [];
  const no_declaration = new Map();
  const checked = new Map();
  const line_of = line_cursor(source);
  let dynamic = 0;
  let addresses = 0;
  for (const { text: address, offset } of extractDataPaths(
    blankComments(source),
  )) {
    const parts = address.split(':');
    // 一段地址没有序号可核对
    if (parts.length < 2) {
      continue;
    }
    addresses += 1;
    const table = parts[0].toLowerCase();
    const where = `${file_name}:${line_of(offset)}`;
    if (/[${}]/.test(table)) {
      dynamic += 1;
      continue;
    }
    const index = parts[parts.length - 1];
    if (!/^-?\d+$/.test(index)) {
      dynamic += 1;
      continue;
    }
    const key = declaration_table_of(table);
    const declared = declaration_sets().get(key);
    if (!declared) {
      no_declaration.set(table, (no_declaration.get(table) ?? 0) + 1);
      continue;
    }
    checked.set(key, (checked.get(key) ?? 0) + 1);
    if (!declared.ids.has(Number(index))) {
      violations.push({
        where,
        table,
        index: Number(index),
        declared,
      });
    }
  }
  return { violations, dynamic, addresses, no_declaration, checked };
}

/** 扫 `ere/` 下全部游戏代码 */
function scan_game() {
  const violations = [];
  const no_declaration = new Map();
  const checked = new Map();
  let dynamic = 0;
  let addresses = 0;
  const files = listFilesUnder(
    ERE_DIR,
    (file) =>
      file.endsWith('.js') &&
      // era-electron.js 是引擎 SDK，其 JSDoc 里的例子不算游戏代码
      path.basename(file) !== 'era-electron.js',
  );
  for (const file of files) {
    const source = fs.readFileSync(path.join(ERE_DIR, file), 'utf8');
    const result = scan_source(source, `ere/${file}`);
    violations.push(...result.violations);
    dynamic += result.dynamic;
    addresses += result.addresses;
    for (const [table, count] of result.no_declaration) {
      no_declaration.set(table, (no_declaration.get(table) ?? 0) + count);
    }
    for (const [table, count] of result.checked) {
      checked.set(table, (checked.get(table) ?? 0) + count);
    }
  }
  return {
    violations,
    dynamic,
    no_declaration,
    checked,
    files: files.length,
    addresses,
  };
}

/** 越界项按表归并成 `表 → 升序去重的序号`，形状与 KNOWN_GAPS 一致 */
function group_by_table(violations) {
  const grouped = {};
  for (const { table, index } of violations) {
    (grouped[table] ??= new Set()).add(index);
  }
  return Object.fromEntries(
    Object.entries(grouped)
      .sort(([a], [b]) => (a < b ? -1 : 1))
      .map(([table, indexes]) => [table, [...indexes].sort((a, b) => a - b)]),
  );
}

const SCAN = scan_game();

/** 一类越界项的引用键：`表:序号` */
const pair_of = (table, index) => `${table}:${index}`;

test('静态地址的序号都在 yml 的声明集内（#923 那类「读未声明槽」的通用防线）', (t) => {
  const grouped = group_by_table(SCAN.violations);
  const skips =
    `扫描面 ${SCAN.files} 个 .js、${SCAN.addresses} 处二段以上的字面量地址；` +
    `本次跳过 ${SCAN.dynamic} 处动态地址、` +
    `${SCAN.no_declaration.size} 张无声明集表` +
    `（${[...SCAN.no_declaration.keys()].sort().join(' / ')}）`;
  t.diagnostic(skips);
  // 失败信息只列「新增」与「已修」两族：1132 处已知越界逐行打出来没人读，
  // 要动手的永远是新出现的那几格、以及清单里已经不成立的那几格。
  const known = new Set(
    Object.entries(KNOWN_GAPS).flatMap(([table, indexes]) =>
      indexes.map((index) => pair_of(table, index)),
    ),
  );
  const fresh = SCAN.violations
    .filter(({ table, index }) => !known.has(pair_of(table, index)))
    .map(
      ({ where, table, index, declared }) =>
        `${where} → ${table}:${index}（${declared.file} 声明集 ${format_ids(declared.ids)}）`,
    )
    .sort();
  const closed = [...known]
    .filter((pair) => {
      const [table, index] = pair.split(':');
      return !(grouped[table] ?? []).includes(Number(index));
    })
    .sort();
  assert.deepEqual(
    grouped,
    KNOWN_GAPS,
    `这些地址的序号在对应 yml 的声明集里查不到——引擎不报错，读到的恒是 0` +
      `（#923 的 delta:17 就是这么把一整段加法变成死码的）。\n` +
      `新增越界（要修代码、补登记，或确认后加进 KNOWN_GAPS）：\n  ` +
      `${fresh.join('\n  ') || '（无）'}\n` +
      `清单里已不成立（修好了就回来删掉）：${closed.join(' / ') || '（无）'}\n` +
      skips,
  );
});

test('扫描自证：越界项报出、动态地址与无声明集表分别计数', () => {
  const source = [
    'era.get(`delta:${cid}:2`);',
    'era.get(`delta:${cid}:17`);',
    'era.get(`delta:${cid}:${n}`);',
    "era.set('tstr:7', 1);",
    'era.add(`${table}:0`, 1);',
    '// era.get(`delta:${cid}:99`)',
    "era.get('money');",
  ].join('\n');
  const result = scan_source(source, 'probe.js');
  assert.deepEqual(
    result.violations.map(
      ({ where, table, index }) => `${where} ${table}:${index}`,
    ),
    ['probe.js:2 delta:17'],
    '第三段是字面量的越界项必须报出，其余四种形态都不该报',
  );
  assert.equal(result.dynamic, 2, '序号插值、表名插值各有 1 处');
  assert.deepEqual(
    [...result.no_declaration],
    [['tstr', 1]],
    '解析不到声明集的表按处数计数，与动态地址分开',
  );
});

test('声明集判据：解析出零条即「没有声明集」，不是「声明集为空集」', () => {
  assert.deepEqual(
    [...parse_declared_ids('"甲":\n  id: 0\n"乙":\n  id: 7\n')],
    [0, 7],
  );
  // 只有注释、只有 `{}`、以及将来可能出现的空表：一律零条
  assert.equal(parse_declared_ids('# 空表即够用\n').size, 0);
  assert.equal(parse_declared_ids('{}\n').size, 0);
  // 仓库里真有这种表：tstr 是只有注释的空表，它的地址因此整族跳过
  assert.equal(declaration_sets().has('tstr'), false);
  assert.equal(declaration_sets().has('palam'), true);
  // 名字读法查的是去掉后缀的那张表，别名族按引擎的归属归并
  assert.equal(declaration_table_of('palamname'), 'palam');
  assert.equal(declaration_table_of('delta'), 'palam');
  assert.equal(declaration_table_of('maxbase'), 'base');
  // callname 自己是一张表，不是 call 的名字读法；它没有 yml
  assert.equal(declaration_table_of('callname'), 'callname');
});

test('扫描面自检：文件数、地址数、声明集表数与动态地址数都有下限', () => {
  // 断言「越界项为空」这种失效：正则失效、别名解析全挂、yml 解析退化成
  // 「零声明集」，都会让上面那条用例在 0 条地址上绿得毫无意义。下限取当前
  // 实测的七成左右，删并文件不至于撞红。
  const declared_tables = declaration_sets().size;
  assert.ok(SCAN.files >= 200, `只扫到 ${SCAN.files} 个 .js，扫描面八成失效了`);
  assert.ok(
    SCAN.addresses >= 15000,
    `只扫到 ${SCAN.addresses} 处二段以上的地址，正则八成失效了`,
  );
  assert.ok(
    declared_tables >= 15,
    `只解析出 ${declared_tables} 张有声明集的表，yml 解析八成失效了`,
  );
  assert.ok(
    SCAN.dynamic >= 500,
    `只统计到 ${SCAN.dynamic} 处动态地址——这类跳过是值域分析缺席的代价，` +
      `数量掉到这么低说明扫描或分类坏了`,
  );
  // 参数表这一族必须有产出：它的声明集最稀疏，正是本票要守的地方。分居
  // 多张数据表（palam / juel / delta / palamname…）共一份名字表，别名解析
  // 挂掉时这里先红。
  const palam = SCAN.checked.get('palam') ?? 0;
  assert.ok(
    palam >= 500,
    `palam 族只核对到 ${palam} 处地址，别名解析八成失效了`,
  );
});
