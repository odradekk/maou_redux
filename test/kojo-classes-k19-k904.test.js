/**
 * 菲娅口上子类 K19 / K904 的契约（issue #858）。
 *
 * #858 的两条验收拆成三层，每层都能单独变红：
 *
 *   1. **静态 · K19 的入口清单**：KojoK19 覆盖了哪些钩子、每个钩子转交哪个本体，
 *      与迁移前的族注册（`family.register(19, 本体)`）一一对应；模板方法
 *      `kojo_message_com` 不覆盖（覆盖就绕开七道头部检查）。
 *   2. **静态 · K904 只保留差异**：KojoK904 的**自有**成员恰好是三个差异点
 *      （`is_own_kojo` / `mark_present` / `gobi_koujo`），其余钩子全部继承；
 *      文件里不再出现台词、状态推进与 era 输出——「删掉重复的那一份」的机器判定。
 *   3. **运行期 · 入口走工厂**：`EVENT_K_DISPATCH_TABLE` 的 21 条分发入口 ×
 *      两套口上逐条驱动，钩子必须收到与入口语义一致的实参、返回值契约不变；
 *      20 个族的 19 / 904 两个号都转发到各自的实例（换成探针能拦住直挂本体）。
 *
 * == 方法级差异对照表（改前 → 改后） ==
 *
 * | 差异         | 改前                                        | 改后                             |
 * | ------------ | ------------------------------------------- | -------------------------------- |
 * | 是否本口上   | 两份文件各自 `handle_train` / `handle_end`  | `is_own_kojo(target)`            |
 * |              | 里的 `if (era.get(...) != 1) return 0;`     | （19：TALENT:179 / 904：EX_TALENT:104） |
 * | 存在标志     | 两份 `handle_train_pri` / `handle_end_later` | `mark_present(value)`            |
 * |              | （19：`game.kojo.口上存在_19`，904：`era_exflag.set(104)`） | （19：FLAG:119 / 904：EX_FLAG:104） |
 * | 语尾文字     | 两份 `gobi_koujo_k1` / `gobi_koujo_k904`    | 钩子 `gobi_koujo(arg0, rand)`    |
 * |              | 分别取常量表 19 号行与 904 号行             | （两家各取自己那一行，文字当前逐字相同） |
 *
 * 四处事件处理器（EVENTTRAIN 的 #PRI / NORMAL 档、EVENTEND 的 #LATER / NORMAL 档）
 * 与其余台词本体一样只剩一份，栖在 kojo-k19-fia.js 顶层，由两个实例各接一次线。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一注入点）。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { register_handlers } = require('./helpers/event-registration');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

const REPO = path.resolve(__dirname, '..');
const CID = 35;

/** 基类的 22 个钩子（名单与 test/kojo-base-factory.test.js 一致） */
const HOOKS = [
  'kojo_message_com',
  'kojo_message_palamcng',
  'kojo_message_markcng',
  'self_kojo',
  'dog_kojo',
  'colosseum_kojo',
  'benki_koujo',
  'dungeon_victory',
  'dungeon_attack',
  'dungeon_ryouzyoku',
  'dungeon_ryouzyoku_after',
  'ntr_koujo',
  'exucution_koujo',
  'museum_koujo',
  'banishment_koujo',
  'public_exucution_koujo',
  'grotesque_koujo',
  'enterenemy_koujo',
  'gohoubi_request_koujo',
  'gohoubi_after_koujo',
  'osioski_koujo',
  'gobi_koujo',
];

/**
 * K19 覆盖的「钩子 → 本体」= 迁移前 `family.register(19, 本体)` 的第二参。
 * 没有 dog_kojo（兽奸在头部检查里静默跳过）与 colosseum_kojo（死斗场本体由
 * `kojo_message_com_19` 的头部检查直接调用，不走钩子）。
 */
const K19_HOOKS = {
  select_com: 'kojo_message_com_19',
  kojo_message_palamcng: 'kojo_message_palamcng_19',
  kojo_message_markcng: 'kojo_message_markcng_19',
  self_kojo: 'self_kojo_k19',
  benki_koujo: 'benki_koujo_k19',
  dungeon_victory: 'dungeon_victory_k19',
  dungeon_attack: 'dungeon_attack_k19',
  dungeon_ryouzyoku: 'dungeon_ryouzyoku_k19',
  dungeon_ryouzyoku_after: 'dungeon_ryouzyoku_after_k19',
  ntr_koujo: 'ntr_koujo_k19',
  exucution_koujo: 'exucution_koujo_k19',
  museum_koujo: 'museum_koujo_k19',
  banishment_koujo: 'banishment_koujo_k19',
  public_exucution_koujo: 'public_exucution_koujo_k19',
  grotesque_koujo: 'grotesque_koujo_k19',
  enterenemy_koujo: 'enterenemy_koujo_k19',
  gohoubi_request_koujo: 'gohoubi_request_koujo_k19',
  gohoubi_after_koujo: 'gohoubi_after_koujo_k19',
  osioski_koujo: 'osioki_koujo_k19',
  gobi_koujo: 'gobi_koujo_k19',
};

/** K904 的自有成员：三个差异点（多一个就是重复在长回来） */
const K904_OWN_MEMBERS = ['is_own_kojo', 'mark_present', 'gobi_koujo'];

/** 两套口上：键、模块、类、素质、存在标志 */
const FIA = [
  {
    name: 'K19',
    key: 19,
    module: 'kojo/kojo-k19-fia',
    cls: 'KojoK19',
    talent: `talent:${CID}:179`,
    presence: 'flag:119',
  },
  {
    name: 'K904',
    key: 904,
    module: 'kojo/kojo-k904-fia',
    cls: 'KojoK904',
    talent: `ex_talent:${CID}:104`,
    presence: 'exflag:104',
  },
];

/** 确定性随机源 */
const always = () => 0;

/**
 * 世界底座：菲娅入列、指定那套口上的素质与存在标志、口上总开关开。
 * @param {object} kojo FIA 的一行
 * @returns {object} 夹具
 */
function setup_fia(kojo) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, CID, '菲娅');
  fixture.era.beginTrain(0, CID);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = CID;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = 0;
  fixture.store.set(kojo.talent, 1);
  fixture.store.set(kojo.presence, 1);
  fixture.store.set('flag:7', 2);
  register_handlers(fixture, 'kojo/kojo-system');
  register_handlers(fixture, kojo.module);
  return fixture;
}

/** 入口名 → 钩子名（只有迷宫两族带 `_K` 后缀，三条入口共用两族的一族） */
const HOOK_BY_ENTRY = {
  kojo_message_com: 'kojo_message_com',
  kojo_message_palamcng: 'kojo_message_palamcng',
  kojo_message_markcng: 'kojo_message_markcng',
  self_kojo: 'self_kojo',
  dungeon_ryouzyoku: 'dungeon_ryouzyoku',
  dungeon_ryouzyoku_after: 'dungeon_ryouzyoku_after',
  benki_koujo: 'benki_koujo',
  victory_koujo: 'dungeon_victory',
  attack_koujo: 'dungeon_attack',
  attack_koujo_b: 'dungeon_attack',
  ntr_koujo: 'ntr_koujo',
  exucution_koujo: 'exucution_koujo',
  museum_koujo: 'museum_koujo',
  banishment_koujo: 'banishment_koujo',
  public_exucution_koujo: 'public_exucution_koujo',
  grotesque_koujo: 'grotesque_koujo',
  enterenemy_koujo: 'enterenemy_koujo',
  gohoubi_request_koujo: 'gohoubi_request_koujo',
  gohoubi_after_koujo: 'gohoubi_after_koujo',
  osioski_koujo: 'osioski_koujo',
  gobi_koujo: 'gobi_koujo',
};

/** 每条入口的钩子实参（= #213 的 handler 契约，见 ere/kojo/kojo-base.js） */
const HOOK_ARGS = {
  kojo_message_com: (ctx) => [ctx.rand],
  kojo_message_palamcng: (ctx) => [ctx.rand],
  kojo_message_markcng: (ctx) => [ctx.rand],
  self_kojo: (ctx) => [ctx.rand, 1],
  benki_koujo: (ctx) => [ctx.rand],
  victory_koujo: (ctx) => [ctx.rand],
  attack_koujo: (ctx) => [ctx.rand],
  attack_koujo_b: (ctx) => [ctx.rand],
  ntr_koujo: (ctx) => [ctx.rand, 9],
  exucution_koujo: () => [42],
  museum_koujo: () => [42],
  banishment_koujo: () => [42],
  public_exucution_koujo: () => [42],
  grotesque_koujo: () => [42],
  enterenemy_koujo: (ctx) => [ctx.rand],
  gohoubi_request_koujo: () => [CID],
  gohoubi_after_koujo: () => [CID, 9],
  osioski_koujo: () => [CID, 9],
  gobi_koujo: (ctx) => [2, ctx.rand],
  dungeon_ryouzyoku: () => [],
  dungeon_ryouzyoku_after: () => [],
};

/** 实参名 → 取值 */
function arg_value(name, ctx) {
  switch (name) {
    case 'cid':
      return ctx.cid;
    case 'event_no':
      return 42;
    case 'choice':
      return 9;
    case 'arg0':
      return 2;
    case 'q':
      return 1;
    case 'rand':
      return ctx.rand;
    default:
      throw new Error(`表里出现未登记的实参名：${name}`);
  }
}

/** 入口把钩子返回值交回调用方的那些（其余入口一律 return 0） */
const VALUE_RETURNING = new Set([
  'kojo_message_palamcng',
  'kojo_message_markcng',
  'benki_koujo',
  'victory_koujo',
  'attack_koujo',
  'attack_koujo_b',
  'enterenemy_koujo',
  'gobi_koujo',
]);

function read_source(module_path) {
  return fs.readFileSync(path.join(REPO, 'ere', `${module_path}.js`), 'utf8');
}

// —— 静态：K19 的入口清单 ——

test('KojoK19 在父类之外只覆盖钩子，且每个钩子转交迁移前的那个本体', () => {
  const fixture = create_era_fixture();
  const { KojoBase } = fixture.load_module('kojo/kojo-base');
  const { KojoK19 } = fixture.load_module('kojo/kojo-k19-fia');

  assert.ok(KojoK19.prototype instanceof KojoBase, 'KojoK19 继承基类');
  const own = Object.getOwnPropertyNames(KojoK19.prototype)
    .filter((name) => name !== 'constructor')
    .sort();
  assert.deepEqual(
    own,
    [
      ...Object.keys(K19_HOOKS),
      'is_own_kojo',
      'mark_present',
      'register_events',
    ].sort(),
    'K19 的覆盖清单 = 20 个钩子 + 三个实例成员（差异点 2 + 事件接线）',
  );

  // 文档化对齐：每个钩子名都在二 22 个钩子名单里（写错名字会变成死方法）
  for (const hook of Object.keys(K19_HOOKS)) {
    assert.ok(
      HOOKS.includes(hook) || hook === 'select_com',
      `${hook} 不是基类的钩子`,
    );
  }
  // 模板方法不覆盖（覆盖了就绕开七道头部检查）
  assert.equal(
    KojoK19.prototype.kojo_message_com,
    KojoBase.prototype.kojo_message_com,
    '模板方法 kojo_message_com 必须留给基类',
  );
});

test('静态：每个钩子是一行转交，转交目标就是迁移前的族注册本体', () => {
  const src = read_source('kojo/kojo-k19-fia');
  for (const [hook, body] of Object.entries(K19_HOOKS)) {
    if (hook === 'ntr_koujo') continue; // 收旧引擎的全局 P，见下一条
    if (hook === 'gohoubi_after_koujo' || hook === 'osioski_koujo') continue;
    assert.ok(
      new RegExp(
        `async ${hook}\\((\\.\\.\\.args|arg0, rand)\\) \\{\\s*return ${body}\\(`,
      ).test(src),
      `KojoK19.${hook} 应转交 ${body}`,
    );
  }
  // 三处形参不同的转交（实参形状由迁移前的族注册定死）
  assert.match(
    src,
    /async ntr_koujo\(rand, p\) \{\s*return ntr_koujo_k19\(p \?\? rand\);/,
  );
  assert.match(
    src,
    /async gohoubi_after_koujo\(cid, choice\) \{\s*return gohoubi_after_koujo_k19\(undefined, cid, choice\);/,
  );
  assert.match(
    src,
    /async osioski_koujo\(cid, choice\) \{\s*return osioki_koujo_k19\(undefined, cid, choice\);/,
  );
});

// —— 静态：K904 只保留差异 ——

test('KojoK904 的自有成员恰好是三个差异点，其余全部继承', () => {
  const fixture = create_era_fixture();
  const { KojoK19 } = fixture.load_module('kojo/kojo-k19-fia');
  const { KojoK904 } = fixture.load_module('kojo/kojo-k904-fia');

  assert.ok(KojoK904.prototype instanceof KojoK19, 'K904 继承 K19');
  const own = Object.getOwnPropertyNames(KojoK904.prototype)
    .filter((name) => name !== 'constructor')
    .sort();
  assert.deepEqual(own, [...K904_OWN_MEMBERS].sort(), 'K904 只覆盖三处差异');

  // 覆盖的是差异、不是同一具身体的另一份：未覆盖的钩子在原型链上就是 K19 的
  for (const hook of HOOKS) {
    if (K904_OWN_MEMBERS.includes(hook)) continue;
    assert.equal(
      KojoK904.prototype[hook],
      KojoK19.prototype[hook],
      `${hook} 必须继承 K19 的实现（不许各写一份）`,
    );
  }
});

test('静态：K904 的文件里没有台词、状态推进与输出（重复没长回来）', () => {
  const src = read_source('kojo/kojo-k904-fia');
  for (const forbidden of [
    'printAndWait',
    'era.print(',
    'cflag:',
    'palam:',
    'chara(',
    'self_call',
    'peek_sale_price',
  ]) {
    assert.ok(
      !src.includes(forbidden),
      `kojo-k904-fia.js 里不该再出现 ${forbidden}（那是从 K19 复制过来的身体）`,
    );
  }
  // 只留三个差异的落点
  assert.ok(src.includes('ex_talent:${target}:104'));
  assert.ok(src.includes('era_exflag.set(104, value)'));
  assert.ok(src.includes('gobi_text(904, arg0, rand)'));
});

test('语尾两行文字当前逐字相同（差异只在取哪一行，不在文字本身）', () => {
  const fixture = create_era_fixture();
  const { gobi_text } = fixture.load_module('data/gobi-koujo-const');
  for (const tier of [0, 1, 2, 3, 4, 5]) {
    assert.equal(
      gobi_text(904, tier, () => 0),
      gobi_text(19, tier, () => 0),
      `ARG:0=${tier} 的两行语尾应逐字相同`,
    );
  }
});

// —— 运行期：工厂 ——

test('两套口上都注册进工厂，19 与 904 是两个不同的实例', () => {
  const fixture = create_era_fixture();
  register_handlers(fixture, 'kojo/kojo-system');
  const { KojoK19 } = fixture.load_module('kojo/kojo-k19-fia');
  const { KojoK904 } = fixture.load_module('kojo/kojo-k904-fia');
  const { get_kojo } = fixture.load_module('kojo/kojo-factory');

  const k19 = get_kojo(19);
  const k904 = get_kojo(904);
  assert.ok(k19 instanceof KojoK19, '19 取到 KojoK19');
  assert.ok(k904 instanceof KojoK904, '904 取到 KojoK904');
  assert.ok(k904 instanceof KojoK19, '904 同时是 KojoK19（继承）');
  assert.notEqual(k19, k904, '两套口上不是同一个对象');
  assert.equal(k19.id, 19);
  assert.equal(k904.id, 904);
});

test('只装载 K904 的模块也会装上 K19（子类要父类，装配表两家都登记）', () => {
  const fixture = create_era_fixture();
  const { get_kojo } = fixture.load_module('kojo/kojo-factory');
  assert.equal(get_kojo(19), null, '装载前 19 未注册');
  fixture.load_module('kojo/kojo-k904-fia');
  assert.ok(get_kojo(19), 'K904 的模块把 K19 一起装上');
  assert.ok(get_kojo(904), '904 也就位');
});

// —— 运行期：21 条入口逐条走工厂 ——

test('21 条分发入口 × 两套口上：钩子收到与入口语义一致的实参，返回值契约不变', async () => {
  const { EVENT_K_DISPATCH_TABLE } =
    create_era_fixture().load_module('kojo/kojo-system');
  for (const kojo of FIA) {
    for (const row of EVENT_K_DISPATCH_TABLE) {
      const fixture = setup_fia(kojo);
      const mod = fixture.load_module(row.module);
      const hook = HOOK_BY_ENTRY[row.entry];
      assert.ok(hook, `${row.entry} 没登记钩子名`);

      const instance = fixture
        .load_module('kojo/kojo-factory')
        .get_kojo(kojo.key);
      const seen = [];
      const original = instance[hook];
      instance[hook] = async (...args) => {
        seen.push(args);
        return hook === 'gobi_koujo' ? '尾' : 7;
      };
      fixture.set_inputs(...Array(4).fill(0));
      const ctx = { cid: CID, rand: always };
      let result;
      try {
        result = await mod[row.entry](
          ...row.call.map((name) => arg_value(name, ctx)),
        );
      } finally {
        instance[hook] = original;
      }

      assert.deepEqual(
        seen,
        [HOOK_ARGS[row.entry](ctx)],
        `${kojo.name} ${row.entry}：钩子实参与入口语义一致`,
      );
      const expected =
        hook === 'gobi_koujo' ? '尾' : VALUE_RETURNING.has(row.entry) ? 7 : 0;
      assert.equal(
        result,
        expected,
        `${kojo.name} ${row.entry}：返回值契约不变`,
      );
    }
  }
});

test('20 个族的 19 与 904 都转发到工厂实例（直挂本体会被这层拦住）', async () => {
  const fixture = setup_fia(FIA[1]);
  const kojo = fixture.load_module('kojo/kojo-system');
  const after = fixture.load_module('kojo/kojo-dungeon-after');
  const ravish = fixture.load_module('kojo/kojo-dungeon-ravish');
  const { get_kojo } = fixture.load_module('kojo/kojo-factory');

  // 族 → 该族转发到的钩子名（与两个口上文件里的注册行一一对应）
  const FAMILIES = [
    [ravish.ryouzyoku_kojo_family, 'dungeon_ryouzyoku'],
    [ravish.ryouzyoku_after_kojo_family, 'dungeon_ryouzyoku_after'],
    [kojo.benki_koujo_family, 'benki_koujo'],
    [kojo.dungeon_victory_family, 'dungeon_victory'],
    [kojo.dungeon_attack_family, 'dungeon_attack'],
    [kojo.ntr_koujo_family, 'ntr_koujo'],
    [kojo.exucution_koujo_family, 'exucution_koujo'],
    [kojo.museum_koujo_family, 'museum_koujo'],
    [kojo.banishment_koujo_family, 'banishment_koujo'],
    [kojo.public_exucution_koujo_family, 'public_exucution_koujo'],
    [kojo.grotesque_koujo_family, 'grotesque_koujo'],
    [kojo.enterenemy_koujo_family, 'enterenemy_koujo'],
    // GOHOUBI_REQUEST 族只此一个实例、住在 kojo-dungeon-after（#403）
    [after.gohoubi_request_koujo_family, 'gohoubi_request_koujo'],
    [after.gohoubi_after_koujo_family, 'gohoubi_after_koujo'],
    [after.osioski_koujo_family, 'osioski_koujo'],
    [kojo.gobi_koujo_family, 'gobi_koujo'],
    [kojo.kojo_message_com_family, 'kojo_message_com'],
    [kojo.kojo_message_palamcng_family, 'kojo_message_palamcng'],
    [kojo.kojo_message_markcng_family, 'kojo_message_markcng'],
    [kojo.self_kojo_family, 'self_kojo'],
  ];
  assert.equal(FAMILIES.length, 20, '口上族共 20 个（两族无分发入口，不在内）');

  for (const kojo_row of FIA) {
    const instance = get_kojo(kojo_row.key);
    for (const [family, hook] of FAMILIES) {
      assert.equal(
        family.has(kojo_row.key),
        true,
        `${kojo_row.name}：${family.name} 注册了 ${kojo_row.key}`,
      );

      // 族注册是 `(...args) => instance.hook(...args)`，所以换掉实例上的方法
      // 就能拦住「直挂本体」的写法（那时换方法族照旧调本体）
      const seen = [];
      const original = instance[hook];
      instance[hook] = async (...args) => {
        seen.push(args);
        return hook === 'gobi_koujo' ? '尾' : 7;
      };
      let result;
      try {
        result = await family.call(kojo_row.key, { args: [always] });
      } finally {
        instance[hook] = original;
      }
      assert.equal(
        seen.length,
        1,
        `${kojo_row.name}：${family.name} 转发到 ${hook}`,
      );
      assert.equal(
        result,
        hook === 'gobi_koujo' ? '尾' : 7,
        `${kojo_row.name}：${family.name} 把钩子返回值原样交回`,
      );
    }
  }
});

// —— 运行期：三处差异各自落点 ——

test('差异一 · 是否本口上：19 认 TALENT:179，904 认 EX_TALENT:104，互不串门', () => {
  const fixture = create_era_fixture();
  register_handlers(fixture, 'kojo/kojo-system');
  fixture.load_module('kojo/kojo-k19-fia');
  fixture.load_module('kojo/kojo-k904-fia');
  const { get_kojo } = fixture.load_module('kojo/kojo-factory');
  const k19 = get_kojo(19);
  const k904 = get_kojo(904);

  assert.equal(k19.is_own_kojo(CID), false, '没挂 TALENT:179 时 K19 不认');
  assert.equal(k904.is_own_kojo(CID), false, '没挂 EX_TALENT:104 时 K904 不认');

  fixture.store.set(`talent:${CID}:179`, 1);
  assert.equal(k19.is_own_kojo(CID), true, 'K19 认 TALENT:179');
  assert.equal(k904.is_own_kojo(CID), false, 'K19 的素质不喂给 K904');

  fixture.store.delete(`talent:${CID}:179`);
  fixture.store.set(`ex_talent:${CID}:104`, 1);
  assert.equal(k904.is_own_kojo(CID), true, 'K904 认 EX_TALENT:104');
  assert.equal(k19.is_own_kojo(CID), false, 'K904 的素质不喂给 K19');
});

test('差异二 · 存在标志：19 写 FLAG:119，904 写 EX_FLAG:104', () => {
  const fixture = create_era_fixture();
  register_handlers(fixture, 'kojo/kojo-system');
  fixture.load_module('kojo/kojo-k19-fia');
  fixture.load_module('kojo/kojo-k904-fia');
  const { get_kojo } = fixture.load_module('kojo/kojo-factory');
  const k19 = get_kojo(19);
  const k904 = get_kojo(904);

  k19.mark_present(1);
  assert.equal(fixture.store.get('flag:119'), 1, '19 的存在标志是 FLAG:119');
  assert.equal(fixture.store.get('exflag:104') || 0, 0, '19 不碰 EX_FLAG:104');
  k19.mark_present(0);
  assert.equal(fixture.store.get('flag:119'), 0);

  k904.mark_present(1);
  assert.equal(
    fixture.store.get('exflag:104'),
    1,
    '904 的存在标志是 EX_FLAG:104',
  );
  assert.equal(fixture.store.get('flag:119'), 0, '904 不碰 FLAG:119');
  k904.mark_present(0);
  assert.equal(fixture.store.get('exflag:104'), 0);
});

test('差异三 · 语尾：钩子沿用本家的常量表行（19 与 904 各取各的）', async () => {
  const fixture = create_era_fixture();
  const { gobi_text } = fixture.load_module('data/gobi-koujo-const');
  register_handlers(fixture, 'kojo/kojo-system');
  fixture.load_module('kojo/kojo-k19-fia');
  fixture.load_module('kojo/kojo-k904-fia');
  const { get_kojo } = fixture.load_module('kojo/kojo-factory');

  for (const kojo of FIA) {
    const instance = get_kojo(kojo.key);
    for (const tier of [0, 2, 5]) {
      assert.equal(
        await instance.gobi_koujo(tier, always),
        gobi_text(kojo.key, tier, always),
        `${kojo.name} 的语尾取自 ${kojo.key} 号行`,
      );
    }
  }
});

// —— 运行期：两套口上的事件接线各接一次 ——

test('两套口上的 register() 各把四处处理器接到自己的实例上', async () => {
  for (const kojo of FIA) {
    const fixture = await (async () => setup_fia(kojo))();
    const registry = fixture.load_module('system/event/registry');
    const counts = {
      train: registry.handler_counts('EVENTTRAIN'),
      end: registry.handler_counts('EVENTEND'),
    };
    // K19 与 K904 各自 4 条：EVENTTRAIN 的 PRI + NORMAL、EVENTEND 的 LATER + NORMAL
    assert.equal(counts.train.PRI, 1, `${kojo.name} EVENTTRAIN #PRI 一条`);
    assert.equal(counts.train.NORMAL, 1, `${kojo.name} EVENTTRAIN NORMAL 一条`);
    assert.equal(counts.end.LATER, 1, `${kojo.name} EVENTEND #LATER 一条`);
    assert.equal(counts.end.NORMAL, 1, `${kojo.name} EVENTEND NORMAL 一条`);
  }
});

test('事件处理器绑定的是自己的实例：改实例上的 mark_present，emit 就按它写', async () => {
  for (const kojo of FIA) {
    const fixture = setup_fia(kojo);
    const { get_kojo } = fixture.load_module('kojo/kojo-factory');
    const instance = get_kojo(kojo.key);
    const seen = [];
    const real = instance.mark_present;
    instance.mark_present = (value) => {
      seen.push(value);
      real.call(instance, value);
    };
    const registry = fixture.load_module('system/event/registry');
    try {
      await registry.emit('EVENTTRAIN');
      assert.deepEqual(seen, [1], `${kojo.name} EVENTTRAIN 置 1`);
      seen.length = 0;
      await registry.emit('EVENTEND');
      assert.deepEqual(seen, [0], `${kojo.name} EVENTEND 清 0`);
    } finally {
      instance.mark_present = real;
    }
  }
});
