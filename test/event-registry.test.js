/**
 * @file ere/system/event/registry.js 的行为测试（issue #20，决议 #6）。
 *
 * 核心被守行为（#6 推翻 #3 之后的语义，这张票是它的首次运行时验证）：
 *   - 事件链中的 BEGIN 不中止链：剩余处理器仍然全部执行；
 *   - 链中多次 BEGIN 后写覆盖先写，最后一个胜出；
 *   - 吞掉信号 = 转场静默丢失（硬约束存在的原因，反例用例）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点，issue #16）。注册表是
 * 模块级状态，夹具每次重建都清 ere/ 模块缓存，用例之间互不污染。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

// 建夹具并载入被测两模块（registry 的 emit 需要 BeginSignal 配合发信号）
function setup() {
  const fixture = create_era_fixture();
  return {
    fixture,
    registry: fixture.load_module('system/event/registry'),
    flow: fixture.load_module('system/flow/begin-signal'),
  };
}

test('一个事件挂多个处理器：全部执行（对应原作同名事件的多处定义）', async () => {
  const { registry } = setup();
  const ran = [];
  registry.on('EVENTTEST', async () => ran.push('a'));
  registry.on('EVENTTEST', async () => ran.push('b'));
  registry.on('EVENTTEST', async () => ran.push('c'));

  await registry.emit('EVENTTEST');

  assert.deepEqual(ran, ['a', 'b', 'c']);
});

test('三档优先级：PRI → 普通 → LATER（对应 #PRI / 无标记 / #LATER）', async () => {
  const { registry } = setup();
  const ran = [];
  // 故意交错注册：执行序必须只看档位，不看注册先后跨档穿插
  registry.on('EVENTTEST', async () => ran.push('normal-1'));
  registry.on(
    'EVENTTEST',
    async () => ran.push('later-1'),
    registry.TIER.LATER,
  );
  registry.on('EVENTTEST', async () => ran.push('pri'), registry.TIER.PRI);
  registry.on('EVENTTEST', async () => ran.push('normal-2'));
  registry.on(
    'EVENTTEST',
    async () => ran.push('later-2'),
    registry.TIER.LATER,
  );

  await registry.emit('EVENTTEST');

  assert.deepEqual(ran, ['pri', 'normal-1', 'normal-2', 'later-1', 'later-2']);
});

test('同档内按注册的书写顺序执行（有意偏离原作的目录项序，#6）', async () => {
  const { registry } = setup();
  const ran = [];
  // 同档三个处理器：书写序 b,a,c，执行序必须是 b,a,c 而非名字序或其他
  registry.on('EVENTTEST', async () => ran.push('b'));
  registry.on('EVENTTEST', async () => ran.push('a'));
  registry.on('EVENTTEST', async () => ran.push('c'));

  await registry.emit('EVENTTEST');

  assert.deepEqual(ran, ['b', 'a', 'c']);
});

test('事件链中的 BEGIN：剩余处理器仍然全部执行，emit 返回暂存目标', async () => {
  const { registry, flow } = setup();
  const ran = [];
  // 对照原作 @EVENTTURNEND 的三组定义（#6 的证据链场景）：
  // PRI 组以无条件 BEGIN SHOP 结尾，普通组必须仍然执行
  registry.on(
    'EVENTTEST',
    async () => {
      ran.push('pri');
      flow.begin(flow.STATE.SHOP);
    },
    registry.TIER.PRI,
  );
  registry.on('EVENTTEST', async () => ran.push('normal'));
  registry.on('EVENTTEST', async () => ran.push('later'), registry.TIER.LATER);

  const pending = await registry.emit('EVENTTEST');

  // 链没有中止：三档处理器全跑了（#6 用 emuera.log 证明的原作语义）
  assert.deepEqual(ran, ['pri', 'normal', 'later']);
  assert.equal(pending, flow.STATE.SHOP);
});

test('链中多次 BEGIN：后写覆盖先写，最后一个生效', async () => {
  const { registry, flow } = setup();
  const ran = [];
  registry.on(
    'EVENTTEST',
    async () => {
      ran.push('first-begin');
      flow.begin(flow.STATE.SHOP);
    },
    registry.TIER.PRI,
  );
  registry.on('EVENTTEST', async () => {
    ran.push('second-begin');
    flow.begin(flow.STATE.TRAIN); // 覆盖先前的暂存值
  });
  // 之后没有再 BEGIN 的处理器不改变暂存值
  registry.on(
    'EVENTTEST',
    async () => ran.push('no-begin'),
    registry.TIER.LATER,
  );

  const pending = await registry.emit('EVENTTEST');

  assert.deepEqual(ran, ['first-begin', 'second-begin', 'no-begin']);
  assert.equal(pending, flow.STATE.TRAIN);
});

test('反例（硬约束的由来）：处理器吞掉信号 → 转场静默丢失', async () => {
  const { registry, flow } = setup();
  const ran = [];
  registry.on('EVENTTEST', async () => {
    ran.push('swallow');
    try {
      flow.begin(flow.STATE.SHOP);
    } catch (e) {
      // 故意违反硬约束：catch 住信号但不重抛。真业务代码里这么写，BEGIN
      // 就消失了——不报错、不停机，游戏停在原地。此用例把该失效方式钉进
      // 测试，证明「catch 首行 if (e instanceof BeginSignal) throw e;」
      // （来源于 #6）不可省。
    }
  });
  registry.on('EVENTTEST', async () => ran.push('after'));

  const pending = await registry.emit('EVENTTEST');

  // 转场丢了：emit 返回 undefined（链本身未受影响，其余处理器照跑）
  assert.equal(pending, undefined);
  assert.deepEqual(ran, ['swallow', 'after']);
});

test('处理器抛普通错误：原样上抛并中断链（对应 Emuera 报错停机）', async () => {
  const { registry } = setup();
  const ran = [];
  registry.on('EVENTTEST', async () => ran.push('before'));
  registry.on('EVENTTEST', async () => {
    throw new Error('业务错误');
  });
  registry.on('EVENTTEST', async () => ran.push('after'));

  await assert.rejects(() => registry.emit('EVENTTEST'), /业务错误/);
  assert.deepEqual(ran, ['before']);
});

test('emit 透传参数；未注册的事件是空链，返回 undefined 不报错', async () => {
  const { registry } = setup();
  const seen = [];
  registry.on('EVENTTEST', async (a, b) => seen.push([a, b]));

  await registry.emit('EVENTTEST', 7, '加护');
  assert.deepEqual(seen, [[7, '加护']]);

  assert.equal(await registry.emit('UNREGISTERED'), undefined);
});

test('on()：处理器非函数、未知优先档都在注册处即时报错', () => {
  const { registry } = setup();

  assert.throws(() => registry.on('EVENTTEST', null), TypeError);
  assert.throws(
    () => registry.on('EVENTTEST', async () => {}, 'MAYBE'),
    /优先档无效/,
  );
});
