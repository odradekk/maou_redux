/**
 * 口上族「有本体必注册」契约锁（issue #514）。
 *
 * 守什么：口上模块把某性格的某个口上本体（如 `kojo-k2-timid.js` 的
 * `dungeon_victory_k2`）写进文件、也导出了，却**没有 register 进该族**。
 * 分发表按编号找实现，找不到就静默（TRYCALL 落空的等价物；#565 返工起
 * 所有族都如此）。该响不响是玩家可见的错。
 *
 * 为什么这条锁必须存在：#514 发现 K2/K4 两个模块自 #233/#235 落地起就整批
 * 漏注册（`dungeon_victory`/`dungeon_attack` 只是其中两处），而这两个模块的
 * 单测走 `mod.<fn>(…)` **直调本体、绕过族**——注册与否单测看不见，于是一路
 * 绿到 #501 的登记表普查才被翻出来。逐性格补用例拦不住下一次；能拦住的只有
 * 「本体与注册成对」这条契约。
 *
 * == 契约 ==
 * 对「有分发路径的口上族」F，若某模块定义了 F 的本体函数 `前缀 + N`，
 * 该模块必须 `F.register(N, …)`（N 与函数名尾部编号一致）。
 *
 * == 「有分发路径」怎么判（不写死族清单） ==
 * 两条来源取并集，都由代码导出，不手工维护：
 *   1. `EVENT_K_DISPATCH_TABLE` 的 family 字段——#403 的 22 条分发表是口上
 *      分发的权威目录（表里含 GOHOUBI_AFTER_KOUJO 与 OSIOKI_KOUJO 两条；它们
 *      的**族实例**住在 kojo-dungeon-after.js，与此不矛盾），表与原件对不对得
 *      上由 test/event-k-dispatch.test.js 守。**当前全部有调用点的口上族都在
 *      表内**，本条即覆盖面（21 个族）；
 *   2. 全库（`ere/` 全体 `.js`，不只 `kojo/`）有 `<family>.call(` 调用点的族
 *      ——相对第 1 条今天**没有增量**（`_family.call(` 只出现在 kojo-system.js
 *      与 kojo-dungeon-after.js，涉及的族都在表内）。留着它是给将来不进分发表
 *      的族兜底，不是当前覆盖面的来源；把族当参数传的写法（`try_kojo`、
 *      `dispatch_execution_koujo`）本条也认不出来，同样靠第 1 条覆盖。
 * 于是 `dog_kojo_family` / `colosseum_kojo_family` 自然落在范围外：原作这两族
 * 是文件内直接 `CALL DOG_KOJO_N` / `CALL COLOSSEUM_KOJO_N`（全库扫过，无一处
 * TRYCALLFORM；如 `target/ERB/口上/EVENT_K4_冷徹.ERB:533`/:541），ere 侧同形
 * 直调（如 kojo-k2-timid.js:1304），族本身没有调用者——K0/K1/K6 往族里的既有
 * 注册（#231/#237 等口上票落的）因此是死接线，补全它们没有意义、也不是本契约
 * 要守的东西。范围纯由「有没有调用路径」推出，**不写豁免清单**；将来真给这两族
 * 加调用点时，本文件的自检（下面第二节「范围外」那条）会先红，提示把豁免改成
 * 核对——不是自动纳入，那条断言是刻意留的闸。
 *
 * == 本体函数的前缀从哪来（不写死映射） ==
 * 表里的族：用该族分发表的 `dispatch` 字段小写化——它就是原作 TRYCALLFORM
 * 拼名前缀，也正好是 ere 侧本体名（`DUNGEON_VICTORY_K` → `dungeon_victory_k`）。
 * 表外的族：从该族**已有的注册实参**反推——取 `register(N, fn)` 的 `fn` 尾部
 * 数字去掉后的部分。一个族可以有多个拼写（`osioski_koujo_family` 下
 * `osioki_koujo_kN` 与 `osioski_koujo_kN` 并存，沿用史，两处都在用），全收。
 *
 * == 三道核对（静态两道 + 运行期一道） ==
 *   1. 静态：源码里的「定义」与「注册」对照；
 *   2. 静态：**每族的注册号数与本体条数必须相等**（下一节）；
 *   3. 运行期：装载主启动图后，每个本体都必须能从**该族的实例**上 `has` 到。
 *      静态那层只证明源码里有一行 register，证明不了它落到了运行中的那个族
 *      实例上——#403 出过同一族名两个实例、一边的注册永远分不到的事故。
 *
 * == 为什么要有第 2 道（注册号 ⇄ 本体数一致） ==
 * 前两道静态核对都建立在「扫得准」上，而扫描器本身会漂：注册行若改成本文件
 * 读不懂的写法（如 `for (const [id, fn] of […]) family.register(id, fn)`），
 * 那一侧的号会静默少掉，GAPS 反倒变空、测试照样绿。因此扫描器对读不懂的
 * `register(` 调用一律抛（见 REGISTER_CALL_RE 处），且每族的
 * 「注册号集合大小」必须等于「扫到的本体条数」：少了本体 = 有号无本体（漏移植），
 * 少了注册号 = 扫描器漏读或写错。两者都不许静默通过。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

const REPO = path.resolve(__dirname, '..');
const KOJO_DIR = path.join(REPO, 'ere', 'kojo');
const ERE_DIR = path.join(REPO, 'ere');

const KOJO_FILES = fs
  .readdirSync(KOJO_DIR)
  .filter((name) => /^kojo-.*\.js$/.test(name))
  .sort();

// 去注释：族名与函数名不出现在字符串字面量里，粗剥即可（与 register-scan 同款）
const STRIPPED = new Map(
  KOJO_FILES.map((name) => [
    name,
    fs
      .readFileSync(path.join(KOJO_DIR, name), 'utf8')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*$/gm, ''),
  ]),
);

/** 每文件顶层函数定义名（`async function X(` / `function X(`） */
const DEFINED = new Map(
  KOJO_FILES.map((name) => {
    const names = new Set();
    for (const m of STRIPPED.get(name).matchAll(
      /^(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/gm,
    )) {
      names.add(m[1]);
    }
    return [name, names];
  }),
);

/** 任意 `family.register(` 调用（含本文件读不懂的写法，用于「必须抛」核对） */
const REGISTER_CALL_RE = /(\w+_family)\.register\(/g;
/** 本文件读得懂的写法：字面量编号 + 可选的裸函数名第二参 */
const REGISTER_ROW_RE =
  /(\w+_family)\.register\(\s*(\d+)\s*,\s*([A-Za-z_$][\w$]*)?/g;

/**
 * 每文件每族的注册号。`register(N, fn)` 的第二参可以是裸标识符，也可以是内联
 * 箭头（`(rand, p) => ntr_koujo_k4(p)`）——两种都算「该号已注册」；第二参只在
 * 反推前缀时用到，解析不出标识符时留 null。
 *
 * 每个 `family.register(` 调用都必须被解析出编号：读不懂的写法当场抛，不许
 * 静默漏号（#274/#282 的既有约定；否则扫描器一漂，GAPS 会假性变空）。
 * @returns {Map<string, {family: string, id: number, fn: string|null}[]>}
 */
const REGISTERS = new Map(
  KOJO_FILES.map((name) => {
    const src = STRIPPED.get(name);
    const rows = [];
    for (const m of src.matchAll(REGISTER_ROW_RE)) {
      rows.push({ family: m[1], id: Number(m[2]), fn: m[3] ?? null });
    }
    const calls = [...src.matchAll(REGISTER_CALL_RE)];
    if (calls.length !== rows.length) {
      const bad = calls.find(
        (m) => !/^\s*\d+\s*,/.test(src.slice(m.index + m[0].length)),
      );
      const where = bad
        ? src.slice(bad.index, bad.index + 80).split('\n')[0]
        : '(未定位到)';
      throw new Error(
        `${name} 有 ${calls.length} 处 family.register(，只解析出 ${rows.length} 处` +
          `——读不懂的写法必须显式纳入扫描器，不许静默漏号：${where}`,
      );
    }
    return [name, rows];
  }),
);

/** 族名 → 定义它的模块（`const F = new DispatchFamily(`），运行期核对用它取实例 */
const FAMILY_MODULE = new Map();
for (const name of KOJO_FILES) {
  for (const m of STRIPPED.get(name).matchAll(
    /const\s+(\w+_family)\s*=\s*new\s+DispatchFamily\(/g,
  )) {
    FAMILY_MODULE.set(m[1], `kojo/${name.replace(/\.js$/, '')}`);
  }
}

/** ere/ 全体源码一份，供 `.call(` 扫描（口上族的调用点不限于 kojo 目录） */
function all_ere_source() {
  const out = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.js'))
        out.push(fs.readFileSync(full, 'utf8'));
    }
  };
  walk(ERE_DIR);
  return out.join('\n');
}

const ALL_SOURCE = all_ere_source();

/** 全库出现过的族名（注册实参里的那些） */
const ALL_FAMILIES = new Set(
  [...REGISTERS.values()].flat().map((row) => row.family),
);

/**
 * 覆盖范围：族 → 本体函数名前缀集合。
 *
 * 表的族用 `dispatch`（TRYCALLFORM 拼名前缀）小写化；表外的族从注册实参反推。
 * 两条都并上注册实参推出来的前缀——同一族的拼写可能不止一种。
 * @returns {Map<string, string[]>}
 */
function coverage() {
  const fixture = create_era_fixture();
  const { EVENT_K_DISPATCH_TABLE } = fixture.load_module('kojo/kojo-system');

  const out = new Map();
  const add = (family, prefix) => {
    if (!out.has(family)) out.set(family, new Set());
    out.get(family).add(prefix);
  };

  /** 该族已有的注册实参能反推出的前缀（`register(N, 裸名_N)` 的裸名去尾号） */
  const registered_prefixes = (family) => {
    const prefixes = new Set();
    for (const rows of REGISTERS.values()) {
      for (const row of rows) {
        if (row.family !== family || row.fn === null) continue;
        const hit = row.fn.match(/^(.*?)\d+$/);
        if (hit !== null) prefixes.add(hit[1]);
      }
    }
    return prefixes;
  };

  // 1. 分发表的族：dispatch 就是 TRYCALLFORM 的拼名前缀，小写化即本体名前缀
  for (const entry of EVENT_K_DISPATCH_TABLE) {
    add(entry.family, entry.dispatch.toLowerCase());
  }
  // 2. 表外的直接调用族：前缀只能从注册实参反推
  for (const family of ALL_FAMILIES) {
    if (!new RegExp(`${family}\\.call\\(`).test(ALL_SOURCE)) continue;
    for (const prefix of registered_prefixes(family)) add(family, prefix);
  }
  // 3. 已进覆盖范围的族，把注册实参推出来的拼写变体（osioski/osioki 之类）并上
  for (const family of [...out.keys()]) {
    for (const prefix of registered_prefixes(family)) add(family, prefix);
  }

  const result = new Map();
  for (const [family, prefixes] of out) {
    if (prefixes.size === 0) {
      throw new Error(`${family} 的前缀推断不出（分发表没有 dispatch 字段？）`);
    }
    // 长的排前面，免得上位前缀抢走下位族的匹配
    result.set(
      family,
      [...prefixes].sort((a, b) => b.length - a.length),
    );
  }
  return result;
}

let coverage_cache = null;

/** 惰性求值：夹具在用例内创建，不在模块加载期产生副作用（与同款测试一致） */
function coverage_cached() {
  if (coverage_cache === null) coverage_cache = coverage();
  return coverage_cache;
}

/**
 * 全库「有本体」的条目：`{file, family, id, fn}`。
 * 前缀按长的优先，避免一个短前缀抢走另一个族的长前缀匹配。
 * @returns {{file: string, family: string, id: number, fn: string}[]}
 */
function bodies() {
  const out = [];
  for (const [family, prefixes] of coverage_cached()) {
    for (const file of KOJO_FILES) {
      for (const name of DEFINED.get(file)) {
        const prefix = prefixes.find((p) => name.startsWith(p));
        if (prefix === undefined) continue;
        const id = Number(name.slice(prefix.length));
        if (!Number.isInteger(id)) continue;
        out.push({ file, family, id, fn: name });
      }
    }
  }
  return out.sort(
    (a, b) =>
      a.family.localeCompare(b.family) ||
      a.id - b.id ||
      a.file.localeCompare(b.file),
  );
}

let bodies_cache = null;

function bodies_cached() {
  if (bodies_cache === null) bodies_cache = bodies();
  return bodies_cache;
}

/** 契约违反：有本体、该文件却没注册该号。 */
function gaps() {
  return bodies_cached().filter(({ file, family, id }) => {
    const registered = new Set(
      (REGISTERS.get(file) ?? [])
        .filter((row) => row.family === family)
        .map((row) => row.id),
    );
    return !registered.has(id);
  });
}

test('扫描器自检：覆盖族、前缀、本体三样都不为空', () => {
  const cover = coverage_cached();
  const found = bodies_cached();
  assert.ok(
    cover.size >= 18,
    `覆盖族只有 ${cover.size} 个：${[...cover.keys()].sort().join(', ')}`,
  );
  // 抽查四个玩家必经的口上族，防族名解析漂了还全绿
  for (const family of [
    'kojo_message_com_family',
    'self_kojo_family',
    'dungeon_victory_family',
    'dungeon_attack_family',
  ]) {
    assert.ok(cover.has(family), `${family} 应在覆盖范围内`);
  }
  // 没有调用路径的两族落在范围外（理由见文件头）。真给它们加了调用点，
  // 这条会红——那时把 here 改成核对、并把前缀来源补齐，别直接删。
  for (const family of ['dog_kojo_family', 'colosseum_kojo_family']) {
    assert.ok(!cover.has(family), `${family} 没有调用路径，不应进覆盖范围`);
  }
  // 本体总数是防漂阈值：扫描器读空（正则失配、前缀推断失效）时这里先红，
  // 而不是让下面几条契约核对在空集上「通过」
  assert.ok(
    found.length >= 300,
    `扫到的本体只有 ${found.length} 条，扫描器可能读空了`,
  );
  // 本体只认顶层 function 声明。别种写法（`const X = () => …` 等）会让本锁静默
  // 漏扫该本体——见到「族前缀 + 尾号」被赋值的形态就当场报，逼来源显式纳入
  // 扫描器（#274/#282 同款约定：解析不了新写法必须红，不能假装看不见）。
  const prefix_union = [...coverage_cached().values()].flat();
  for (const file of KOJO_FILES) {
    const re = new RegExp(
      `^(?:const|let|var)\\s+((?:${prefix_union.join('|')})\\d+)\\b`,
      'm',
    );
    const hit = STRIPPED.get(file).match(re);
    assert.equal(
      hit,
      null,
      `${file} 的 ${hit?.[1]} 用了本扫描器不认的本体写法（不是顶层 function 声明）——` +
        '请在 test/kojo-register-coverage.test.js 的定义扫描里显式纳入',
    );
  }
  // 反例：K2/K4 的迷宫本体确实在「有本体」这一侧
  for (const fn of [
    'dungeon_victory_k2',
    'dungeon_attack_k2',
    'dungeon_victory_k4',
    'dungeon_attack_k4',
  ]) {
    assert.ok(
      found.some((row) => row.fn === fn),
      `${fn} 应被扫成本体`,
    );
  }
});

test('每个口上本体都注册进了它所属的族', () => {
  const found = gaps();
  assert.equal(
    found.length,
    0,
    '口上本体未注册进族（#514）：\n' +
      found
        .map(
          (g) =>
            `  ${g.file} 的 ${g.fn} 未注册进 ${g.family}[${g.id}]，应补 ${g.family}.register(${g.id}, ${g.fn});`,
        )
        .join('\n'),
  );
});

test('每族的注册号数与扫到的本体条数相等，且注册的第二参就是该本体', () => {
  const found = bodies_cached();
  const problems = [];
  for (const family of [...coverage_cached().keys()].sort()) {
    const ids = new Set();
    for (const rows of REGISTERS.values()) {
      for (const row of rows) {
        if (row.family === family) ids.add(row.id);
      }
    }
    const bodies_count = found.filter((row) => row.family === family).length;
    if (ids.size !== bodies_count) {
      problems.push(`${family} 注册号 ${ids.size} / 本体 ${bodies_count}`);
    }
    // 第二参必须就是该族该号的本体：`register(2, X_k3)`（号与函数对不上）与
    // `register(2, 别的本体)`（号对、函数错）都当场红。适配器/包装函数（如
    // ntr_koujo_family 的 adapt_legacy_ntr_koujo，定义在 kojo-system.js）
    // 不在本文件，跳过——那不是本体，核对不了也不该猜。
    for (const [file, rows] of REGISTERS) {
      for (const row of rows) {
        if (row.family !== family || row.fn === null) continue;
        if (!DEFINED.get(file).has(row.fn)) continue;
        const body = found.find(
          (row2) =>
            row2.file === file && row2.family === family && row2.id === row.id,
        );
        if (body === undefined || body.fn !== row.fn) {
          problems.push(
            `${file} 的 ${row.family}.register(${row.id}, ${row.fn}) 与本体对不上` +
              `（该族该号在本文件的本体是 ${body === undefined ? '无' : body.fn}）`,
          );
        }
      }
    }
  }
  assert.deepEqual(
    problems,
    [],
    `注册号与本体不一致（#514）：扫描器少读或多读了某一侧，或号写错了：\n  ${problems.join('\n  ')}`,
  );
});

test('主启动图装载后，每个口上本体都能从族实例上取到', () => {
  // 静态那层只证明源码里有一行 register；这里证明它落到了运行中的那个族实例。
  const cover = coverage_cached();
  const fixture = create_era_fixture();
  fixture.load_module('system/flow/main-loop');
  const missing = [];
  for (const [family, prefixes] of cover) {
    if (!FAMILY_MODULE.has(family)) {
      throw new Error(`${family} 找不到定义它的模块（扫描器读不懂新写法？）`);
    }
    const module = fixture.load_module(FAMILY_MODULE.get(family));
    const instance = module[family];
    assert.ok(instance, `${FAMILY_MODULE.get(family)} 未导出 ${family}`);
    for (const { fn } of bodies_cached()) {
      const prefix = prefixes.find((p) => fn.startsWith(p));
      if (prefix === undefined) continue;
      const id = Number(fn.slice(prefix.length));
      if (instance.has(id)) continue;
      if (missing.some((row) => row.family === family && row.id === id))
        continue;
      missing.push({ family, id });
    }
  }
  assert.deepEqual(
    missing.map((row) => `${row.family}[${row.id}]`),
    [],
    `运行期族实例缺本体（#514）：${missing
      .map((row) => `${row.family}[${row.id}]`)
      .join(', ')}`,
  );
});
