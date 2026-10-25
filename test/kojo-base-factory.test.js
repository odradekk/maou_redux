/**
 * 口上基类 + 工厂 + `run_kojo` 唯一入口的契约（issue #854）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一注入点）。覆盖：
 *   - 基类：22 个钩子各有一个方法、默认不输出；`kojo_message_com` 是模板方法
 *     （先头部检查、后指令分支），检查命中时不许进分支；
 *   - 工厂：按编号选类、缓存实例、未注册返回 null（过渡期回落旧族）；
 *     重复注册 / 非 KojoBase 子类 / 非整数编号在注册期即抛；
 *   - `run_kojo`：总开关、存在判定、钩子名由族名反查、未迁移性格回落原族；
 *   - **21 条分发入口逐条改走工厂**：给未迁移的性格注册一套假子类后，入口
 *     必须调子类的钩子、且不再碰旧分发族（本票「过渡期 22 个分发族入口改为
 *     调用工厂，调用方不改」的机器判定）；
 *   - K4 是第一个子类：22 个钩子全部覆盖、com 的族注册经工厂实例；
 *   - 钩子名与族名的对齐（22 个族名小写后必须都是基类方法）。
 *
 * 本文件不重复 test/event-k-dispatch.test.js 的旧族行为（那批测试断言不改，
 * 本票的要求是它们照旧通过）；这里只钉新结构。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

/**
 * 基类的 22 个钩子，与 22 个分发族一一对应；名字 = 族名小写 = 入口名。
 * 这张表是本票的接口面：加钩子要同时加在这里（下一节的集合比对会红）。
 */
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

/** 基类里除 22 个钩子之外的成员：模板方法的两段（select_com / header_checks）。 */
const TEMPLATE_MEMBERS = ['header_checks', 'select_com'];

/** 确定性随机源：恒 0（上界另有专测）。 */
const always = () => 0;

/**
 * 世界底座：玛奥（17）入列、口上总开关开、调教已开（SELF_KOJO 的检查会写
 * TFLAG:15，那张表只在调教期存在）。性格素质由各用例自行 seed。
 * @param {number} [cid=17] 目标角色号
 * @returns {object} 夹具
 */
function setup_kojo(cid = 17) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, cid, '玛奥');
  fixture.era.beginTrain(0, cid);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = cid;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = 0;
  fixture.store.set('flag:7', 2);
  return fixture;
}

/** 未迁移的性格：高貴 163 → LOCAL 103 → 分发键 3；存在标志 FLAG:103。 */
function seed_noble(fixture, cid = 17) {
  fixture.store.set(`talent:${cid}:163`, 1);
  fixture.store.set('flag:103', 1);
}

/** 已迁移的性格：冷徹 164 → LOCAL 104 → 分发键 4；存在标志 FLAG:104。 */
function seed_stoic(fixture, cid = 17) {
  fixture.store.set(`talent:${cid}:164`, 1);
  fixture.store.set('flag:104', 1);
}

/** 分发表（纯数据；独立夹具加载一次即可）。 */
function table_rows() {
  return create_era_fixture().load_module('kojo/kojo-system')
    .EVENT_K_DISPATCH_TABLE;
}

/** 实参名 → 取值（驱动方上下文）。 */
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

/**
 * 入口名 → 钩子名。只有三处不同名：迷宫两族带 `_K` 后缀（族名照
 * TRYCALLFORM 的拼写），胜利/被攻击两族由三条入口共用（ATtack 与
 * Attack_B 同族）。
 */
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

/**
 * 每条入口的钩子实参（= #213 的 handler 契约，见 ere/kojo/kojo-base.js 的
 * 钩子名单）。迁移只搬实现，不搬实参：迁移过的性格收到的实参与旧族一致。
 */
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
  gohoubi_request_koujo: () => [17],
  gohoubi_after_koujo: () => [17, 9],
  osioski_koujo: () => [17, 9],
  gobi_koujo: (ctx) => [2, ctx.rand],
  dungeon_ryouzyoku: () => [],
  dungeon_ryouzyoku_after: () => [],
};

/**
 * 入口把钩子返回值交回调用方的那些（其余入口一律 return 0——TRYCALLFORM 的
 * RESULT 不读，这是各入口既有的契约，本票不改）。
 */
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

// —— 基类 ——

test('基类：22 个钩子各有一个方法，默认不输出', async () => {
  const fixture = create_era_fixture();
  const { KojoBase } = fixture.load_module('kojo/kojo-base');

  const instance = new KojoBase(7);
  assert.equal(instance.id, 7, '构造时记下口上编号');
  for (const hook of HOOKS) {
    assert.equal(
      typeof KojoBase.prototype[hook],
      'function',
      `基类缺钩子 ${hook}`,
    );
    const value = await instance[hook](always);
    assert.equal(
      value,
      hook === 'gobi_koujo' ? '' : 0,
      `${hook} 的默认值：语尾是空串、其余 0`,
    );
  }
  assert.deepEqual(fixture.text_lines(), [], '基类的默认实现不输出');
  assert.equal(await instance.header_checks(), true, '头部检查默认放行');
});

test('基类：方法名集合就是 22 个钩子 + 模板方法的两段（加钩子要同步改名单）', () => {
  const fixture = create_era_fixture();
  const { KojoBase } = fixture.load_module('kojo/kojo-base');
  const names = Object.getOwnPropertyNames(KojoBase.prototype)
    .filter((name) => name !== 'constructor')
    .sort();
  assert.deepEqual(names, [...HOOKS, ...TEMPLATE_MEMBERS].sort());
});

test('基类模板方法：先头部检查、后指令分支；检查不通过不进分支', async () => {
  const fixture = create_era_fixture();
  const { KojoBase } = fixture.load_module('kojo/kojo-base');
  const seen = [];

  class Probe extends KojoBase {
    async header_checks(rand) {
      seen.push(['header', rand]);
      return this.allow;
    }
    async select_com(rand) {
      seen.push(['select', rand]);
      return 42;
    }
  }

  const probe = new Probe(7);
  probe.allow = true;
  const rand = always;
  assert.equal(await probe.kojo_message_com(rand), 42, '分支的返回值原样交回');
  assert.deepEqual(seen, [
    ['header', rand],
    ['select', rand],
  ]);

  seen.length = 0;
  probe.allow = false;
  assert.equal(await probe.kojo_message_com(rand), 0);
  assert.deepEqual(seen, [['header', rand]], '检查不过不进 select_com');
});

// —— 工厂 ——

test('工厂：按编号选类、缓存实例，未注册的编号返回 null', () => {
  const fixture = create_era_fixture();
  const { KojoBase } = fixture.load_module('kojo/kojo-base');
  const { get_kojo, register_kojo } = fixture.load_module('kojo/kojo-factory');

  class Fake extends KojoBase {}

  register_kojo(9, Fake);
  const first = get_kojo(9);
  assert.ok(first instanceof Fake, '按注册的类构造');
  assert.equal(first.id, 9, '编号传进构造函数');
  assert.equal(get_kojo(9), first, '同一编号复用实例（缓存）');
  assert.equal(get_kojo(8), null, '未注册的编号不造基类实例（回落旧族）');
});

test('工厂：重复注册、非 KojoBase 子类、非整数编号在注册期即抛', () => {
  const fixture = create_era_fixture();
  const { KojoBase } = fixture.load_module('kojo/kojo-base');
  const { register_kojo } = fixture.load_module('kojo/kojo-factory');

  class Fake extends KojoBase {}

  register_kojo(9, Fake);
  assert.throws(() => register_kojo(9, Fake), /重复注册/);
  assert.throws(
    () => register_kojo(10, class {}),
    /必须继承 KojoBase/,
    '没继承基类的类会缺钩子，启动期即报',
  );
  assert.throws(() => register_kojo('4', Fake), /必须是整数/);
});

test('K4 是第一个子类：22 个钩子全部覆盖，编号 = 4', () => {
  const fixture = create_era_fixture();
  const { KojoBase } = fixture.load_module('kojo/kojo-base');
  fixture.load_module('kojo/kojo-system');
  const { KojoK4 } = fixture.load_module('kojo/kojo-k4-stoic');
  const { get_kojo } = fixture.load_module('kojo/kojo-factory');

  assert.ok(KojoK4.prototype instanceof KojoBase, 'KojoK4 继承基类');
  // kojo_message_com 是基类的模板方法（头部检查 → 指令分支），子类覆盖的是
  // select_com；覆盖模板方法就会绕开头部检查，所以它不在覆盖清单里
  const overridden = HOOKS.filter((hook) => hook !== 'kojo_message_com');
  for (const hook of [...overridden, 'select_com']) {
    assert.notEqual(
      KojoK4.prototype[hook],
      KojoBase.prototype[hook],
      `K4 应覆盖 ${hook}（迁移一个钩子就覆盖一个方法）`,
    );
  }
  assert.equal(
    KojoK4.prototype.kojo_message_com,
    KojoBase.prototype.kojo_message_com,
    '模板方法不覆盖（覆盖了就绕过七道头部检查）',
  );
  const k4 = get_kojo(4);
  assert.ok(k4 instanceof KojoK4, 'K4 注册进了工厂');
  assert.equal(k4.id, 4);
});

// —— run_kojo ——

test('run_kojo：已迁移的性格走子类钩子（K4 真跑一句）', async () => {
  const fixture = setup_kojo();
  seed_stoic(fixture);
  const { kojo_message_com_family, run_kojo } =
    fixture.load_module('kojo/kojo-system');
  fixture.load_module('kojo/kojo-k4-stoic');

  assert.equal(
    await run_kojo('kojo_message_com', kojo_message_com_family, {
      args: [always],
    }),
    0,
    '入口契约仍 0',
  );
  assert.deepEqual(fixture.text_lines(), ['「讨厌！这变态！」']);
  assert.equal(fixture.store.get('cflag:17:301'), 1, '状态机照常推进');
});

test('run_kojo：未迁移的性格回落原分发族（实参、返回值透传）', async () => {
  const fixture = setup_kojo();
  seed_noble(fixture);
  const { kojo_message_com_family, run_kojo } =
    fixture.load_module('kojo/kojo-system');
  const seen = [];
  kojo_message_com_family.register(3, async (...args) => {
    seen.push(args);
    return 7;
  });

  assert.equal(
    await run_kojo('kojo_message_com', kojo_message_com_family, {
      args: [always],
    }),
    7,
    '回落路径的返回值原样交回',
  );
  assert.deepEqual(seen, [[always]], '实参与族签名一致');
});

test('run_kojo：总开关关掉时不派发；when_disabled 的副作用照常执行', async () => {
  // SELF_KOJO：FLAG:7 <= 0 时清 TFLAG:15（怪物射精或购入金），其余入口只是不响
  const fixture = setup_kojo();
  seed_stoic(fixture);
  fixture.store.set('flag:7', 0);
  fixture.store.set('tflag:15', 7);
  const { run_kojo, self_kojo_family } =
    fixture.load_module('kojo/kojo-system');
  fixture.load_module('kojo/kojo-k4-stoic');

  assert.equal(
    await run_kojo('self_kojo', self_kojo_family, {
      args: [always, 0],
      flag_guard: true,
      when_disabled: () => {
        const { game } = fixture.load_module('facade/game');
        game.train.怪物射精或购入金 = 0;
      },
    }),
    0,
  );
  assert.equal(fixture.store.get('tflag:15'), 0, '关掉口上时清 TFLAG:15');
  assert.deepEqual(fixture.text_lines(), [], '关掉口上时不出声');
});

test('run_kojo：存在判定命中时不派发（口上文件「被删掉」的容错）', async () => {
  const fixture = setup_kojo();
  seed_stoic(fixture);
  fixture.store.delete('flag:104'); // K4 存在标志清 0；EX_FLAG 分支也不是它
  const { run_kojo, kojo_message_com_family } =
    fixture.load_module('kojo/kojo-system');
  fixture.load_module('kojo/kojo-k4-stoic');

  assert.equal(
    await run_kojo('kojo_message_com', kojo_message_com_family, {
      args: [always],
      presence: true,
    }),
    0,
  );
  assert.deepEqual(fixture.text_lines(), []);
});

test('钩子名与入口对齐：21 条入口各有钩子，22 个族都取得到实例', () => {
  const fixture = create_era_fixture();
  const { KojoBase } = fixture.load_module('kojo/kojo-base');
  const kojo = fixture.load_module('kojo/kojo-system');
  const after = fixture.load_module('kojo/kojo-dungeon-after');
  const ravish = fixture.load_module('kojo/kojo-dungeon-ravish');

  // 每条入口声明的钩子必须是基类方法（名字写错时 run_kojo 首次调用才抛，
  // 这里提前到场）
  for (const row of kojo.EVENT_K_DISPATCH_TABLE) {
    const hook = HOOK_BY_ENTRY[row.entry];
    assert.ok(hook, `${row.entry} 没登记钩子名`);
    assert.equal(
      typeof KojoBase.prototype[hook],
      'function',
      `${row.entry} 的钩子 ${hook} 必须是基类方法`,
    );
  }

  // 表内 20 个族 + 两处没有分发入口的族（各口上文件内部直调）= 22 个口上族
  const families = new Set();
  for (const row of kojo.EVENT_K_DISPATCH_TABLE) {
    families.add(row.family);
  }
  families.add('dog_kojo_family');
  families.add('colosseum_kojo_family');
  assert.equal(families.size, 22, '口上族共 22 个');
  for (const name of families) {
    const instance = kojo[name] ?? after[name] ?? ravish[name];
    assert.ok(instance, `找不到族实例 ${name}`);
    assert.equal(typeof instance.register, 'function', `${name} 是分发族`);
  }
});

// —— 21 条入口逐条改走工厂 ——

test('21 条入口都经工厂：假子类接管后旧分发族不再被调用', async () => {
  for (const row of table_rows()) {
    const cid = 17;
    const rand = always;
    const fixture = setup_kojo(cid);
    seed_noble(fixture, cid); // LOCAL 103 → 键 3（未迁移性格）
    const mod = fixture.load_module(row.module);
    const family = mod[row.family];
    const hook = HOOK_BY_ENTRY[row.entry];
    assert.ok(hook, `${row.entry} 没登记钩子名`);

    const { KojoBase } = fixture.load_module('kojo/kojo-base');
    const { register_kojo } = fixture.load_module('kojo/kojo-factory');
    const seen = [];
    class Fake extends KojoBase {
      async [hook](...args) {
        seen.push(args);
        return hook === 'gobi_koujo' ? '尾' : 7;
      }
    }
    register_kojo(3, Fake);

    const legacy_seen = [];
    family.register(3, async (...args) => {
      legacy_seen.push(args);
      return 0;
    });

    fixture.set_inputs(...Array(4).fill(0));
    const ctx = { cid, rand };
    const result = await mod[row.entry](
      ...row.call.map((name) => arg_value(name, ctx)),
    );

    assert.deepEqual(
      seen,
      [HOOK_ARGS[row.entry](ctx)],
      `${row.entry}：钩子实参与入口语义一致`,
    );
    assert.deepEqual(
      legacy_seen,
      [],
      `${row.entry}：迁移后的性格不再走旧分发族`,
    );
    const expected =
      hook === 'gobi_koujo' ? '尾' : VALUE_RETURNING.has(row.entry) ? 7 : 0;
    assert.equal(result, expected, `${row.entry}：返回值契约不变`);
  }
});

test('K4 的指令口上经工厂实例：族注册不是直挂本体（头部检查不会被绕开）', async () => {
  const fixture = setup_kojo();
  seed_stoic(fixture);
  const { kojo_message_com_family } = fixture.load_module('kojo/kojo-system');
  fixture.load_module('kojo/kojo-k4-stoic');
  const { get_kojo } = fixture.load_module('kojo/kojo-factory');

  const k4 = get_kojo(4);
  const real = k4.kojo_message_com;
  let calls = 0;
  k4.kojo_message_com = async (...args) => {
    calls += 1;
    return real.apply(k4, args);
  };
  try {
    await kojo_message_com_family.call(4, { args: [always] });
  } finally {
    k4.kojo_message_com = real;
  }
  assert.equal(calls, 1, '族注册转发到工厂实例的钩子');
  assert.deepEqual(fixture.text_lines(), ['「讨厌！这变态！」']);
});
