/**
 * @file ere/system/event/registry.js 的行为测试（issue #20，决议 #6）。
 *
 * 核心被测行为（#6 推翻 #3 之后的语义，这张票是它的首次运行时验证）：
 *   - 事件链中的 BEGIN 不中止链：剩余处理器仍然全部执行；
 *   - 链中多次 BEGIN 后写覆盖先写，最后一个胜出；
 *   - 转场是处理器返回值（#850），普通返回值不算转场；
 *   - 回标题是终止型转场（#852）：链当场中止，后续处理器不再执行、不再
 *     覆盖它——原实现在这些位置是 QUIT，异常炸断整条链。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点，issue #16）。注册表是
 * 模块级状态，夹具每次重建都清 ere/ 模块缓存，用例之间互不污染。
 *
 * 合成事件名（如旧写法的 EVENTTEST）自 #849 起是非法名：注册与触发都只收枚举
 * 里的名字。本文件的夹具不装载任何处理器模块，注册表是空的，所以拿一个真名字
 * 当临时链名用——写 EVENT.TRAIN 只是借用这个键，不涉及调教域的行为。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { EVENT } = require('../ere/data/event-name-const');

// 建夹具并载入被测两模块（registry 的 emit 与 flow 的 begin 配合发转场）
function setup() {
  const fixture = create_era_fixture();
  return {
    fixture,
    registry: fixture.load_module('system/event/registry'),
    flow: fixture.load_module('system/flow/game-state'),
  };
}

test('一个事件挂多个处理器：全部执行（对应同名事件的多处定义）', async () => {
  const { registry } = setup();
  const ran = [];
  registry.on(EVENT.TRAIN, async () => ran.push('a'));
  registry.on(EVENT.TRAIN, async () => ran.push('b'));
  registry.on(EVENT.TRAIN, async () => ran.push('c'));

  await registry.emit(EVENT.TRAIN);

  assert.deepEqual(ran, ['a', 'b', 'c']);
});

test('三档优先级：PRI → 普通 → LATER（对应 #PRI / 无标记 / #LATER）', async () => {
  const { registry } = setup();
  const ran = [];
  // 故意交错注册：执行序必须只看档位，不看注册先后跨档穿插
  registry.on(EVENT.TRAIN, async () => ran.push('normal-1'));
  registry.on(
    EVENT.TRAIN,
    async () => ran.push('later-1'),
    registry.TIER.LATER,
  );
  registry.on(EVENT.TRAIN, async () => ran.push('pri'), registry.TIER.PRI);
  registry.on(EVENT.TRAIN, async () => ran.push('normal-2'));
  registry.on(
    EVENT.TRAIN,
    async () => ran.push('later-2'),
    registry.TIER.LATER,
  );

  await registry.emit(EVENT.TRAIN);

  assert.deepEqual(ran, ['pri', 'normal-1', 'normal-2', 'later-1', 'later-2']);
});

test('同档内按注册的书写顺序执行（有意偏离目录枚举顺序，#6）', async () => {
  const { registry } = setup();
  const ran = [];
  // 同档三个处理器：书写序 b,a,c，执行序必须是 b,a,c 而非名字序或其他
  registry.on(EVENT.TRAIN, async () => ran.push('b'));
  registry.on(EVENT.TRAIN, async () => ran.push('a'));
  registry.on(EVENT.TRAIN, async () => ran.push('c'));

  await registry.emit(EVENT.TRAIN);

  assert.deepEqual(ran, ['b', 'a', 'c']);
});

test('事件链中的 BEGIN：剩余处理器仍然全部执行，emit 返回暂存目标', async () => {
  const { registry, flow } = setup();
  const ran = [];
  // 对照 EVENTTURNEND 事件的三档定义（#6 的证据链场景）：
  // PRI 组以无条件 BEGIN SHOP 结尾，普通组必须仍然执行
  registry.on(
    EVENT.TRAIN,
    async () => {
      ran.push('pri');
      return flow.begin(flow.STATE.SHOP);
    },
    registry.TIER.PRI,
  );
  registry.on(EVENT.TRAIN, async () => ran.push('normal'));
  registry.on(EVENT.TRAIN, async () => ran.push('later'), registry.TIER.LATER);

  const pending = await registry.emit(EVENT.TRAIN);

  // 链没有中止：三档处理器全跑了（#6 验证时确认的语义）
  assert.deepEqual(ran, ['pri', 'normal', 'later']);
  assert.equal(pending, flow.STATE.SHOP);
});

test('链中多次 BEGIN：后写覆盖先写，最后一个生效', async () => {
  const { registry, flow } = setup();
  const ran = [];
  registry.on(
    EVENT.TRAIN,
    async () => {
      ran.push('first-begin');
      return flow.begin(flow.STATE.SHOP);
    },
    registry.TIER.PRI,
  );
  registry.on(EVENT.TRAIN, async () => {
    ran.push('second-begin');
    return flow.begin(flow.STATE.TRAIN); // 覆盖先前的暂存值
  });
  // 之后没有再 BEGIN 的处理器不改变暂存值
  registry.on(
    EVENT.TRAIN,
    async () => ran.push('no-begin'),
    registry.TIER.LATER,
  );

  const pending = await registry.emit(EVENT.TRAIN);

  assert.deepEqual(ran, ['first-begin', 'second-begin', 'no-begin']);
  assert.equal(pending, flow.STATE.TRAIN);
});

test('回标题（游戏结束）是终止型转场：链当场中止，后续的 BEGIN SHOP 不覆盖它', async () => {
  const { registry, flow } = setup();
  const ran = [];
  // 魔王暴走走的就是这条形状：EVENTTURNEND 的 #PRI 档判定游戏结束，
  // 普通档（回合结算本体）无条件 BEGIN SHOP。游戏结束后世界已结束，
  // 结算不得再跑、更不得把转场改成 SHOP
  registry.on(
    EVENT.TRAIN,
    async () => {
      ran.push('pri-gameover');
      return flow.begin(flow.STATE.TITLE);
    },
    registry.TIER.PRI,
  );
  registry.on(EVENT.TRAIN, async () => {
    ran.push('normal-settle');
    return flow.begin(flow.STATE.SHOP);
  });
  registry.on(EVENT.TRAIN, async () => ran.push('later'), registry.TIER.LATER);

  const pending = await registry.emit(EVENT.TRAIN);

  assert.deepEqual(ran, ['pri-gameover'], '链在回标题处中止');
  assert.equal(pending, flow.STATE.TITLE, '转场仍是回标题，不被打包成 SHOP');
});

test('处理器的普通返回值不改暂存值：只有 STATE 取值才算转场', async () => {
  const { registry, flow } = setup();
  const ran = [];
  registry.on(EVENT.TRAIN, async () => {
    ran.push('begin');
    return flow.begin(flow.STATE.SHOP);
  });
  // 处理器顺手返回的普通值（判断结果、按钮号、近似字符串……）不是转场：
  // 它们既不覆盖也不伪造待跳转状态
  registry.on(EVENT.TRAIN, async () => {
    ran.push('number');
    return 1;
  });
  registry.on(EVENT.TRAIN, async () => {
    ran.push('string');
    return 'SHOPPING';
  });

  const pending = await registry.emit(EVENT.TRAIN);

  assert.deepEqual(ran, ['begin', 'number', 'string']);
  assert.equal(pending, flow.STATE.SHOP);
});

test('处理器抛普通错误：原样上抛并中断链', async () => {
  const { registry } = setup();
  const ran = [];
  registry.on(EVENT.TRAIN, async () => ran.push('before'));
  registry.on(EVENT.TRAIN, async () => {
    throw new Error('业务错误');
  });
  registry.on(EVENT.TRAIN, async () => ran.push('after'));

  await assert.rejects(() => registry.emit(EVENT.TRAIN), /业务错误/);
  assert.deepEqual(ran, ['before']);
});

test('emit 透传参数；合法但无人注册的事件是空链，返回 undefined 不报错', async () => {
  const { registry } = setup();
  const seen = [];
  registry.on(EVENT.TRAIN, async (a, b) => seen.push([a, b]));

  await registry.emit(EVENT.TRAIN, 7, '加护');
  assert.deepEqual(seen, [[7, '加护']]);

  assert.equal(await registry.emit(EVENT.SHOP), undefined);
});

test('emit 收到未知事件名：当场抛错，不按空链返回', async () => {
  const { registry } = setup();

  // 拼错一个字母的 EVENTTURNEND 曾被当作「这个事件没有任何定义」静默通过
  await assert.rejects(
    () => registry.emit('EVENTTURNEDN'),
    /emit\(\) 收到未知事件名 EVENTTURNEDN/,
  );
});

test('emit 收到非字符串的未知名字：报错把它原样打出来', async () => {
  const { registry } = setup();

  await assert.rejects(() => registry.emit(undefined), /未知事件名 undefined/);
});

test('on()：处理器非函数、未知优先档都在注册处即时报错', () => {
  const { registry } = setup();

  assert.throws(() => registry.on(EVENT.TRAIN, null), TypeError);
  assert.throws(
    () => registry.on(EVENT.TRAIN, async () => {}, 'MAYBE'),
    /优先档无效/,
  );
});

test('on() 收到未知事件名：注册处即时报错，链上不会多出一条死链', () => {
  const { registry } = setup();

  assert.throws(
    () => registry.on('EVENTTRAIN_', async () => {}),
    /on\(\) 收到未知事件名 EVENTTRAIN_/,
  );
});
