/**
 * @file 事件处理器装配表（issue #851）：system/flow/startup.js 的守护用例。
 *
 * 守什么：
 *   - 每条事件链由哪些模块、按什么档位、以什么顺序组成，有一份可读的期望
 *     表。表是装配顺序的契约，改装配顺序必须在这里显式改；
 *   - 各模块导出的 HANDLERS 与装配表对得上，没声明的模块不会被静默跳过；
 *   - register_all() 确实把声明的处理器挂进注册表，且**装载处理器模块本身
 *     不注册**——这正是本票要拆掉的旧行为（require 的副作用即注册）。
 *
 * 期望表按档位分组：同一档内自上而下就是执行顺序（registry.js 的「书写
 * 顺序」），跨档顺序由 emit 固定（PRI → NORMAL → LATER），不受装配表影响。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { EVENT_NAMES } = require('../ere/data/event-name-const');

/** 执行序的三档，与 registry.js 一致（这里只按名字用，不 import 实现） */
const TIER_ORDER = ['PRI', 'NORMAL', 'LATER'];

/**
 * 期望的装配结果：事件 → 档位 → 按执行顺序的模块路径。
 *
 * 与改动前 main-loop.js 的 require 书写顺序逐条对齐（那是当时唯一的顺序
 * 来源）：口上同档处理器按 kojo 模块的装载顺序执行，EVENTTRAIN 的 #PRI 档在
 * 前、无属性档在后由档位决定。删一行 = 某条链少一个处理器，会在这里当场红。
 */
const EXPECTED = {
  EVENTFIRST: {
    NORMAL: ['#/event/event-first'],
  },
  EVENTTRAIN: {
    PRI: [
      '#/event/event-train',
      '#/kojo/kojo-k0-tender',
      '#/kojo/kojo-k2-timid',
      '#/kojo/kojo-k3-noble',
      '#/kojo/kojo-k5-mao',
      '#/kojo/kojo-k1-confident',
      '#/kojo/kojo-k4-stoic',
      '#/kojo/kojo-k6-wicked',
      '#/kojo/kojo-k7-heart',
      '#/kojo/kojo-k8-spade',
      '#/kojo/kojo-k9-diamond',
      '#/kojo/kojo-k10-club',
      '#/kojo/kojo-k11-lily',
      '#/kojo/kojo-k13-protector',
      '#/kojo/kojo-k14-nobleman',
      '#/kojo/kojo-k15-clever',
      '#/kojo/kojo-k12-intellectual',
      '#/kojo/kojo-k903-garde',
      '#/kojo/kojo-k19-fia',
      '#/kojo/kojo-k904-fia',
    ],
    NORMAL: [
      '#/event/event-train-normal',
      '#/kojo/kojo-k0-tender',
      '#/kojo/kojo-k2-timid',
      '#/kojo/kojo-k3-noble',
      '#/kojo/kojo-k5-mao',
      '#/kojo/kojo-k1-confident',
      '#/kojo/kojo-k4-stoic',
      '#/kojo/kojo-k6-wicked',
      '#/kojo/kojo-k7-heart',
      '#/kojo/kojo-k8-spade',
      '#/kojo/kojo-k9-diamond',
      '#/kojo/kojo-k10-club',
      '#/kojo/kojo-k11-lily',
      '#/kojo/kojo-k13-protector',
      '#/kojo/kojo-k14-nobleman',
      '#/kojo/kojo-k15-clever',
      '#/kojo/kojo-k12-intellectual',
      '#/kojo/kojo-k903-garde',
      '#/kojo/kojo-k19-fia',
      '#/kojo/kojo-k904-fia',
    ],
  },
  EVENTCOM: {
    PRI: ['#/event/event-com'],
  },
  EVENTCOMEND: {
    PRI: ['#/event/event-comend'],
    NORMAL: ['#/event/event-comend-normal'],
  },
  EVENTEND: {
    NORMAL: [
      '#/kojo/kojo-k0-tender',
      '#/kojo/kojo-k2-timid',
      '#/kojo/kojo-k3-noble',
      '#/kojo/kojo-k5-mao',
      '#/kojo/kojo-k1-confident',
      '#/kojo/kojo-k4-stoic',
      '#/kojo/kojo-k6-wicked',
      '#/kojo/kojo-k7-heart',
      '#/kojo/kojo-k8-spade',
      '#/kojo/kojo-k9-diamond',
      '#/kojo/kojo-k10-club',
      '#/kojo/kojo-k11-lily',
      '#/kojo/kojo-k13-protector',
      '#/kojo/kojo-k14-nobleman',
      '#/kojo/kojo-k15-clever',
      '#/kojo/kojo-k12-intellectual',
      '#/kojo/kojo-k903-garde',
      '#/kojo/kojo-k19-fia',
      '#/kojo/kojo-k904-fia',
    ],
    LATER: [
      '#/event/event-end',
      '#/kojo/kojo-k0-tender',
      '#/kojo/kojo-k2-timid',
      '#/kojo/kojo-k3-noble',
      '#/kojo/kojo-k5-mao',
      '#/kojo/kojo-k1-confident',
      '#/kojo/kojo-k4-stoic',
      '#/kojo/kojo-k6-wicked',
      '#/kojo/kojo-k7-heart',
      '#/kojo/kojo-k8-spade',
      '#/kojo/kojo-k9-diamond',
      '#/kojo/kojo-k10-club',
      '#/kojo/kojo-k11-lily',
      '#/kojo/kojo-k13-protector',
      '#/kojo/kojo-k14-nobleman',
      '#/kojo/kojo-k15-clever',
      '#/kojo/kojo-k12-intellectual',
      '#/kojo/kojo-k903-garde',
      '#/kojo/kojo-k19-fia',
      '#/kojo/kojo-k904-fia',
    ],
  },
  EVENTLOAD: {
    NORMAL: ['#/event/event-load'],
  },
  EVENTTURNEND: {
    PRI: ['#/event/event-turnend'],
    NORMAL: ['#/system/turnend-settle'],
    LATER: ['#/event/event-turnend-later'],
  },
  SOURCE_CHECK: {
    NORMAL: ['#/system/train/source-check'],
  },
  SOURCE_CHECK_AUTO: {
    NORMAL: ['#/system/train/source-check'],
  },
  SHOW_STATUS: {
    NORMAL: ['#/page/page-train'],
  },
  SHOW_USERCOM: {
    NORMAL: ['#/page/page-usercom'],
  },
  USERCOM: {
    NORMAL: ['#/page/page-usercom'],
  },
  EVENTSHOP: {
    PRI: ['#/kojo/kojo-system'],
    NORMAL: ['#/page/page-shop'],
  },
};

/**
 * 逐个模块调用 register()，用替身 on() 记录「模块 → 事件 → 档位」的注册顺序。
 *
 * 模块在首次 require 时解构 `{ on }`，因此替身必须在装载任何处理器模块之前
 * 装好——本函数先取 registry、换 on，再装载装配表（它会 require 全部处理器
 * 模块）。记录的是运行期真正发生的事，不是源码里的第二份清单。
 *
 * @param {object} fixture 夹具
 * @returns {{table: object, calls: Array, startup: object, registry: object}}
 */
function collect_registration(fixture) {
  const registry = fixture.load_module('system/event/registry');
  const real_on = registry.on;
  const calls = [];
  let current_path = null;
  registry.on = (event_name, handler, tier) => {
    calls.push([current_path, event_name, handler, tier ?? 'NORMAL']);
    real_on(event_name, handler, tier);
  };

  // 替身装好之后才装载装配表：处理器模块在首次 require 时解构 on
  const startup = fixture.load_module('system/flow/startup');
  for (const [path, handler_module] of startup.HANDLER_MODULES) {
    current_path = path;
    handler_module.register();
  }

  const by_event = {};
  for (const [path, event_name, , tier] of calls) {
    by_event[event_name] ??= {};
    by_event[event_name][tier] ??= [];
    by_event[event_name][tier].push(path);
  }
  // 按档位重排（对象键序不可依赖，输出顺序固定为 PRI → NORMAL → LATER）
  const table = {};
  for (const event_name of EVENT_NAMES) {
    if (by_event[event_name] === undefined) continue;
    table[event_name] = {};
    for (const tier of TIER_ORDER) {
      if (by_event[event_name][tier] !== undefined) {
        table[event_name][tier] = by_event[event_name][tier];
      }
    }
  }
  return { table, calls, startup, registry };
}

test('装配表与期望一致：每条链的模块、档位、顺序都在一张表里', () => {
  const fixture = create_era_fixture();
  const { table } = collect_registration(fixture);

  // 每条链的组成与顺序（含条数）逐项相等；多一个口上文件、调一次顺序都会红
  assert.deepEqual(table, EXPECTED);
  // 枚举里的每个名字都有人挂——不留「合法但没人响应」的死名字
  assert.deepEqual(Object.keys(table).sort(), [...EVENT_NAMES].sort());
});

test('装配表里的模块都导出了 register()，且没有重复项', () => {
  const fixture = create_era_fixture();
  const { HANDLER_MODULES } = fixture.load_module('system/flow/startup');

  const paths = HANDLER_MODULES.map(([path]) => path);
  assert.equal(new Set(paths).size, paths.length, '装配表里有重复模块');
  for (const [path, handler_module] of HANDLER_MODULES) {
    assert.equal(
      typeof handler_module.register,
      'function',
      `${path} 必须导出 register()`,
    );
  }
});

test('每条注册都合法：事件名取枚举、处理器是函数、档位是三档之一', () => {
  const fixture = create_era_fixture();
  const { calls } = collect_registration(fixture);

  for (const [path, event_name, handler, tier] of calls) {
    assert.ok(
      EVENT_NAMES.includes(event_name),
      `${path} 注册了枚举外的事件名 ${event_name}`,
    );
    assert.equal(
      typeof handler,
      'function',
      `${path} 的 ${event_name} 处理器不是函数`,
    );
    assert.ok(
      TIER_ORDER.includes(tier),
      `${path} 的 ${event_name} 档位无效：${tier}`,
    );
  }
});

test('装载处理器模块本身不注册：注册只发生在 register_all', () => {
  const fixture = create_era_fixture();
  const registry = fixture.load_module('system/event/registry');

  // 单独装载处理器模块（旧写法下这里就会往链上塞函数）
  fixture.load_module('page/page-shop');
  fixture.load_module('event/event-turnend');
  fixture.load_module('kojo/kojo-k3-noble');

  for (const event_name of EVENT_NAMES) {
    assert.deepEqual(
      registry.handler_counts(event_name),
      { PRI: 0, NORMAL: 0, LATER: 0 },
      `${event_name} 在 register_all 之前就必须是空链`,
    );
  }
});

test('register_all 把声明的处理器全部挂进注册表，条数按档位对齐', () => {
  const fixture = create_era_fixture();
  const registry = fixture.load_module('system/event/registry');
  const { register_all } = fixture.load_module('system/flow/startup');

  register_all();

  for (const [event_name, by_tier] of Object.entries(EXPECTED)) {
    const expected = { PRI: 0, NORMAL: 0, LATER: 0 };
    for (const [tier, modules] of Object.entries(by_tier)) {
      expected[tier] = modules.length;
    }
    assert.deepEqual(
      registry.handler_counts(event_name),
      expected,
      `${event_name} 注册条数与装配表不一致`,
    );
  }
});

test('主启动图装载后事件链已就绪：register_all 由 main-loop 在模块顶层调用', () => {
  const fixture = create_era_fixture();
  const registry = fixture.load_module('system/event/registry');
  // 只装载主启动图（它 require 装配表并调用 register_all）
  fixture.load_module('system/flow/main-loop');

  for (const [event_name, by_tier] of Object.entries(EXPECTED)) {
    const expected = { PRI: 0, NORMAL: 0, LATER: 0 };
    for (const [tier, modules] of Object.entries(by_tier)) {
      expected[tier] = modules.length;
    }
    assert.deepEqual(
      registry.handler_counts(event_name),
      expected,
      `${event_name} 注册条数与装配表不一致`,
    );
  }
});

test('register_all 按装配表的顺序调用各模块（顺序本身也是契约）', () => {
  const fixture = create_era_fixture();
  const { register_all, HANDLER_MODULES } = fixture.load_module(
    'system/flow/startup',
  );

  // 替换每个模块的 register，记录 register_all 的真实调用顺序：register_all
  // 取的是模块对象上的属性，替换后仍然由它驱动
  const order = [];
  const originals = new Map();
  for (const [path, handler_module] of HANDLER_MODULES) {
    originals.set(path, handler_module.register);
    handler_module.register = () => {
      order.push(path);
      return originals.get(path)();
    };
  }

  register_all();

  assert.deepEqual(
    order,
    HANDLER_MODULES.map(([path]) => path),
    'register_all 的装配顺序必须与 HANDLER_MODULES 一致',
  );
});
