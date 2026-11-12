/**
 * @file 口上接入与钩子转交的契约锁（#859 重写；取代原来的分发族版本：
 * #282 的接入锁、#514 的「有本体必注册」锁、#855–#858 的类迁移锁）。
 *
 * #859 删掉 22 个分发族后，「模块装没装」「本体接没接」这两类事故换了形态，
 * 但后果一样（整性格口上静默失声），所以锁留着、核对对象换成工厂与类：
 *
 *   1. **装配**：每个 `register_kojo(N, Ctor)` 的 N，在主启动图装载后都必须
 *      能从工厂取到（`registered_kojo_ids()`）；反过来工厂里也不能有源码扫不到
 *      的号。模块没被装配表 require 时这条红（这就是 #282 的教训）。
 *   2. **转交**：类里每个钩子都是一行转交（`return 本体(...)`），本体必须是
 *      本文件的顶层函数；反过来，本文件里每个口上本体都必须被某个钩子转交
 *      （#514 的教训：K2/K4 整批漏接，各性格单测直调本体看不见）。
 *   3. **入口**：22 条入口各调一次，命中的必须就是工厂实例上的那个钩子
 *      ——断言方式是把实例的钩子换成探针后调入口，探针必须被调用。
 *
 * 扫描器读不懂的写法当场抛（#274/#282 的既有约定）：解析不了的新写法必须显式
 * 纳入这里，不许静默漏扫。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

const REPO = path.resolve(__dirname, '..');
const KOJO_DIR = path.join(REPO, 'ere', 'kojo');

const KOJO_FILES = fs
  .readdirSync(KOJO_DIR)
  .filter((name) => /^kojo-.*\.js$/.test(name))
  .sort();

/** 去注释：类方法、函数名都不出现在字符串字面量里，粗剥即可 */
const STRIPPED = new Map(
  KOJO_FILES.map((name) => [
    name,
    fs
      .readFileSync(path.join(KOJO_DIR, name), 'utf8')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*$/gm, ''),
  ]),
);

/** 每文件 `register_kojo(N, Ctor)` 声明：编号 → 类名 */
const REGISTERED = new Map();
for (const name of KOJO_FILES) {
  const rows = [
    ...STRIPPED.get(name).matchAll(/register_kojo\(\s*(\d+)\s*,\s*(\w+)/g),
  ];
  if (rows.length === 0) continue;
  if (rows.length > 1) {
    throw new Error(`${name} 声明了不止一套口上（#859 约定：一文件一套）`);
  }
  REGISTERED.set(name, { id: Number(rows[0][1]), cls: rows[0][2] });
}

/**
 * 钩子 → 本体名前缀（本体名 = 前缀 + 编号，或直接等于前缀）。
 *
 * 前缀来自 `EVENT_K_DISPATCH_TABLE` 的 `dispatch`（TRYCALLFORM 拼名前缀小写化），
 * 另加三处不走分发表的时机：DOG_KOJO / COLOSSEUM_KOJO（文件内直调）与
 * SELF_KOJO（表里是 `SELF_KOJO_K`）。
 */
function body_prefixes() {
  const fixture = create_era_fixture();
  const { EVENT_K_DISPATCH_TABLE } = fixture.load_module('kojo/kojo-system');
  // 三处不走分发表；osioski / osioki 是史拼（两处在用），一并收进来
  const out = new Set([
    'self_kojo_k',
    'dog_kojo_',
    'colosseum_kojo_',
    'osioski_koujo_k',
    'osioki_koujo_k',
  ]);
  for (const row of EVENT_K_DISPATCH_TABLE) {
    // 本体名 = 拼名前缀 + 编号：`KOJO_MESSAGE_COM_` → `kojo_message_com_4`、
    // `DUNGEON_VICTORY_K` → `dungeon_victory_k4`（前缀自带的分隔不补也不删）
    out.add(row.dispatch.toLowerCase());
  }
  return [...out];
}

/** 顶层函数定义名（`async function X(` / `function X(`） */
function defined_functions(name) {
  const out = new Set();
  for (const m of STRIPPED.get(name).matchAll(
    /^(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/gm,
  )) {
    out.add(m[1]);
  }
  return out;
}

test('装配：每个 register_kojo 的编号在主启动图装载后都在工厂里，且没有多出来的号', () => {
  const expected = [...REGISTERED.values()]
    .map((row) => row.id)
    .sort((a, b) => a - b);
  assert.ok(
    expected.length >= 19,
    `只扫到 ${expected.length} 个口上编号，扫描器可能读空了`,
  );

  const fixture = create_era_fixture();
  fixture.load_module('system/flow/main-loop');
  const { registered_kojo_ids } = fixture.load_module('kojo/kojo-factory');
  assert.deepEqual(
    registered_kojo_ids(),
    expected,
    '工厂里的口上编号与源码声明不一致：少了 = 模块漏被装配 require；多了 = 扫描器漏读',
  );
});

test('转交：类方法一行转交本体，且没有「定义了却没人转交」的本体', () => {
  const prefixes = body_prefixes();
  const problems = [];
  let bodies = 0;
  let delegations = 0;

  for (const [file, { cls }] of REGISTERED) {
    const defined = defined_functions(file);
    const src = STRIPPED.get(file);

    // 类体：找 `async <hook>(...) {` 的方法及其下一行
    const class_start = src.search(new RegExp(`^class ${cls}\\b`, 'm'));
    if (class_start < 0) {
      problems.push(`${file} 里找不到 class ${cls}（register_kojo 的第二参）`);
      continue;
    }
    const class_body = src.slice(class_start);
    for (const m of class_body.matchAll(
      /^ {2}async (\w+)\([^)]*\) \{\n\s+return ([\w$]+)\(/gm,
    )) {
      delegations += 1;
      const body = m[2];
      // 允许转交给导入的函数（K904 的 gobi_koujo 转给 #\/data/gobi-koujo-const 的
      // gobi_text）——但那种情况必须是文件里 require 进来的名字
      const imported = new RegExp(
        `\\{[^}]*\\b${body}\\b[^}]*\\} = require`,
      ).test(src);
      if (!defined.has(body) && !imported) {
        problems.push(
          `${file} 的 ${m[1]}() 转交给 ${body}()，本文件既没定义它也没导入它`,
        );
      }
    }

    // 本文件的口上本体：定义过就必须被引用（定义 + 至少一处转交）
    for (const body of defined) {
      const prefix = prefixes.find((p) => body.startsWith(p));
      if (prefix === undefined) continue;
      if (body === `${prefix}${''}`) continue; // 前缀本身（无编号的形式）
      bodies += 1;
      // 数「调用点」而不是「标识符出现次数」：定义行 `function body(` 占一次，
      // 所以要它 ≥ 2。module.exports 里的那一行不是调用——只导出、没人转交的
      // 死本体，用出现次数数不出来（#859 迁移变异条目时实测过）。
      const calls = src.split(new RegExp(`\\b${body}\\(`)).length - 1;
      if (calls < 2) {
        problems.push(`${file} 的 ${body}() 定义了却没人转交（玩家侧不会响）`);
      }
    }
  }

  assert.ok(bodies >= 300, `扫到的口上本体只有 ${bodies} 条，扫描器可能读空了`);
  assert.ok(delegations >= 300, `扫到的钩子转交只有 ${delegations} 条`);
  assert.deepEqual(
    problems,
    [],
    `钩子转交不完整：\n  ${problems.join('\n  ')}`,
  );
});

test('运行期：每个登记的口上都有 22 个钩子与两个事件钩子', () => {
  const { HOOKS } = require('./helpers/kojo-families');
  const fixture = create_era_fixture();
  fixture.load_module('system/flow/main-loop');
  const { get_kojo, registered_kojo_ids } =
    fixture.load_module('kojo/kojo-factory');
  const missing = [];
  for (const id of registered_kojo_ids()) {
    const instance = get_kojo(id);
    for (const hook of [...HOOKS, 'event_train', 'event_end']) {
      if (typeof instance[hook] !== 'function') missing.push(`${id}.${hook}`);
    }
  }
  assert.deepEqual(missing, [], `口上实例缺钩子：${missing.join(', ')}`);
});

// —— 入口 → 工厂 → 钩子：22 条入口各调一次，命中的必须是实例上的那个钩子 ——

/** 每个性格编号对应的素质播种地址（与各性格测试文件同一套映射） */
const TALENT_OF = {
  0: 'talent:31:160',
  1: 'talent:31:161',
  2: 'talent:31:162',
  3: 'talent:31:163',
  4: 'talent:31:164',
  5: 'talent:31:165',
  6: 'talent:31:166',
  7: 'talent:31:167',
  8: 'talent:31:168',
  9: 'talent:31:169',
  10: 'talent:31:170',
  11: 'talent:31:171',
  12: 'talent:31:172',
  13: 'talent:31:173',
  14: 'talent:31:174',
  15: 'talent:31:175',
  19: 'talent:31:179',
  903: 'ex_talent:31:103',
  904: 'ex_talent:31:104',
};

/** 入口名 → 实参按 `call` 名字表取值 */
function build_args(names, rand, cid) {
  const value = {
    rand,
    cid,
    event_no: 0,
    choice: 0,
    arg0: 0,
    q: 0,
    p: 0,
  };
  return names.map((name) => value[name]);
}

test('入口 → 工厂 → 钩子：22 条入口各调一次，探针命中对应钩子', async () => {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  const kojo = fixture.load_module('kojo/kojo-system');
  fixture.load_module('system/flow/main-loop');
  const { get_kojo } = fixture.load_module('kojo/kojo-factory');
  const era_flag = fixture.load_module('era-utils/era-flag');

  era_flag.target = 31;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = 0;
  fixture.store.set('flag:7', 2);

  for (const [id, talent] of Object.entries(TALENT_OF)) {
    for (const key of Object.keys(TALENT_OF)) {
      fixture.store.delete(TALENT_OF[key]);
    }
    fixture.store.set(talent, 1);

    const instance = get_kojo(Number(id));
    const calls = [];
    const probe = async () => {
      calls.push(true);
      return 0;
    };
    for (const hook of [
      ...require('./helpers/kojo-families').HOOKS,
      'event_train',
      'event_end',
    ]) {
      instance[hook] = probe;
    }

    const rand = () => 0;
    for (const row of kojo.EVENT_K_DISPATCH_TABLE) {
      const args = build_args(row.call, rand, 31);
      await fixture.load_module(row.module)[row.entry](...args);
    }
    assert.equal(
      calls.length,
      kojo.EVENT_K_DISPATCH_TABLE.length,
      `编号 ${id}：每条入口都该命中一次`,
    );
  }
});
