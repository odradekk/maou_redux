/**
 * @file ere/system/dispatch/dispatch-family.js 与 ere/chara/chara-ex.js 的
 * 行为测试（issue #21，决议 #7）。
 *
 * 核心被守行为（#7 的接口语义，本票是它的首次运行时验证）：
 *   - 「已声明的编号空间」与「已实现的编号」分开：空间内缺失合法、返回
 *     调用点指定的 whenMissing；空间外抛错（拼写错误）；
 *   - 缺失值由调用点声明——同一注册表在不同调用点给不同值（原作四个
 *     COM_ABLE 调用点预置各不相同的实证，#7）；
 *   - 重复注册启动期即炸（#14 的同名遮蔽事故在本项目不可重演）；
 *   - CHARA_EX 族：45 声明 / 8 实现 / 37 缺失，「加入初始角色 → 分发到
 *     专属初始化」在真实新游戏路径上跑通；
 *   - 分发注册表与事件注册表（#6）是两套独立机制，互不依赖、互不串扰。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试缝，issue #16）。注册表是
 * 模块级状态，夹具每次重建都清 ere/ 模块缓存，用例之间互不污染。
 */

const assert = require('node:assert/strict');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_gamebase } = require('./helpers/gamebase');
const { preset_chara_0 } = require('./helpers/chara');

// ere/ 的绝对路径（require.cache 键以此为前缀），独立性用例用它断言
// 「载入 A 不连带动入 B」
const ERE_DIR = path.resolve(__dirname, '..', 'ere');

// —— DispatchFamily（机制本体）——

function make_family(fixture, name = 'DEMO', ids = [1, 2, 3]) {
  const { DispatchFamily } = fixture.load_module(
    'system/dispatch/dispatch-family',
  );
  return new DispatchFamily(name, ids);
}

test('命中已实现的编号：返回该实现的结果，args 透传，异步实现被 await', async () => {
  const fixture = create_era_fixture();
  const family = make_family(fixture);
  const seen = [];
  family.register(2, async (a, b) => {
    seen.push([a, b]);
    return a + b;
  });

  const result = await family.call(2, { args: [20, 22] });

  assert.equal(result, 42); // 异步实现的返回值经 await 交回，不是 Promise
  assert.deepEqual(seen, [[20, 22]]);
});

test('空间内未实现：返回调用点指定的缺失值', async () => {
  const fixture = create_era_fixture();
  const family = make_family(fixture);
  family.register(2, () => 0); // 只实现 2，1/3 是合法缺失

  assert.equal(await family.call(1, { whenMissing: -1 }), -1);
});

test('同一注册表、不同调用点可指定不同缺失值（#7：原作四调用点各不相同）', async () => {
  const fixture = create_era_fixture();
  const family = make_family(fixture, 'COM_ABLE', [10, 11]);
  family.register(10, () => 5); // 11 缺失，供各调用点各自取值

  assert.equal(await family.call(11, { whenMissing: -1 }), -1); // ABL.ERB:255 预置 -1
  assert.equal(await family.call(11, { whenMissing: 0 }), 0); // CAMPAIGN_ROOM:163 预置 0
  assert.equal(await family.call(11, { whenMissing: 1 }), 1); // COMSEQ_TRAIN:219 预置 1
  // COMSEQ_SHOW:131 不预置、读上一轮 RESULT 残留 → ere 侧等价写法是调用点
  // 把上一轮的值显式传进来（#5 已丢弃全局 RESULT 槽）：whenMissing: result
  assert.equal(await family.call(11), 0); // 缺省 0 = TRYCALL 落空 RESULT 0
});

test('编号空间外的调用抛错（拼写错误防护——原作 TRYCALL 静默跳过，无法区分）', async () => {
  const fixture = create_era_fixture();
  const family = make_family(fixture);
  family.register(2, () => 0);

  await assert.rejects(() => family.call(99), /不在声明的编号空间内/);
  // 字符串 '2' 不等价于数字 2：空间判据是严格集合成员，这正是要抓的拼写
  await assert.rejects(() => family.call('2'), /不在声明的编号空间内/);
});

test('重复注册同一编号抛错，且首个实现不被覆盖（#14：原作 23 个同名口上被悄悄遮蔽）', async () => {
  const fixture = create_era_fixture();
  const family = make_family(fixture);
  family.register(2, () => 'first');

  assert.throws(() => family.register(2, () => 'second'), /重复注册/);
  // 抛错后原实现原样保留（原作里被遮蔽的那份在本项目不会丢）
  assert.equal(await family.call(2), 'first');
});

test('空间外注册同样抛错（注册侧的拼写防护）', () => {
  const fixture = create_era_fixture();
  const family = make_family(fixture);

  assert.throws(() => family.register(42, () => 0), /不在声明的编号空间内/);
});

test('missing()：可查询「已声明但未实现」的编号集合（构建期报告，升序）', () => {
  const fixture = create_era_fixture();
  const family = make_family(fixture, 'DEMO', [3, 1, 2]);
  family.register(2, () => 0);

  assert.deepEqual(family.missing(), [1, 3]);
});

test('has()：已实现为 true；空间内未实现与空间外一律 false', () => {
  const fixture = create_era_fixture();
  const family = make_family(fixture, 'DEMO', [1, 2]);
  family.register(1, () => 0);

  assert.equal(family.has(1), true);
  assert.equal(family.has(2), false);
  assert.equal(family.has(99), false);
});

test('实现抛出的异常原样上抛（含 BeginSignal 转场信号），注册表不吞不拦', async () => {
  const fixture = create_era_fixture();
  const family = make_family(fixture, 'DEMO', [1]);
  const { BeginSignal } = fixture.load_module('system/flow/begin-signal');
  family.register(1, () => {
    throw new BeginSignal('SHOP');
  });

  await assert.rejects(
    () => family.call(1),
    (e) => e instanceof BeginSignal && e.state === 'SHOP',
  );
});

// —— CHARA_EX 族（真实场景：角色专属初始化）——

function load_chara_ex() {
  const fixture = create_era_fixture();
  const { add_chara_ex, chara_ex } = fixture.load_module('chara/chara-ex');
  return { fixture, add_chara_ex, chara_ex };
}

test('CHARA_EX 族静态形状：45 声明 / 8 实现 / 37 缺失（空间远大于实现集）', () => {
  const { chara_ex } = load_chara_ex();

  assert.equal(chara_ex.declared.size, 45);
  // 8 个实现（@CHARA_EX_ 的全部定义，散落在 CHARA<N>.ERB）
  for (const id of [0, 31, 32, 33, 34, 35, 223, 777]) {
    assert(chara_ex.has(id), `CHARA_EX_${id} 应已实现`);
  }
  const missing = chara_ex.missing();
  assert.equal(missing.length, 37);
  // 缺失全部仍在声明空间内：是合法缺失，不是空间外的拼写错误
  assert(missing.every((id) => chara_ex.declared.has(id)));
});

test('add_chara_ex(0)：守卫通过 → 分发到 CHARA_EX_0，写入魔王素质', async () => {
  const { fixture, add_chara_ex } = load_chara_ex();

  await add_chara_ex(0);

  assert.deepEqual(fixture.var_writes, [{ name: 'ex_talent:0:200', value: 1 }]);
});

test('add_chara_ex(31/34)：cid 透传进实现（原作经 TARGET，ere 经 args）', async () => {
  const { fixture, add_chara_ex } = load_chara_ex();

  await add_chara_ex(31);
  await add_chara_ex(34);

  // 31 → 琼（:101）；34 → 狂王替身/无双/一人军团（:4/:801/:901，三连写）
  assert.deepEqual(
    fixture.var_writes.map((w) => w.name),
    [
      'ex_talent:31:101',
      'ex_talent:34:4',
      'ex_talent:34:801',
      'ex_talent:34:901',
    ],
  );
});

test('全部 37 个缺失编号逐个分发：不抛错、返回 0、零写入（37/45 的常态路径）', async () => {
  const { fixture, add_chara_ex, chara_ex } = load_chara_ex();

  for (const id of chara_ex.missing()) {
    assert.equal(await add_chara_ex(id), 0, `CHARA_EX_${id} 应走缺失路径`);
  }

  // 缺失路径零副作用：不报错、不中断调用方流程（验收项）
  assert.deepEqual(fixture.var_writes, []);
});

test('add_chara_ex(5)：编号 1-16 被守卫拦下（原作 :28 SIF 的设计，非遗漏）', async () => {
  const { fixture, add_chara_ex, chara_ex } = load_chara_ex();

  // 编号 1-16 当前都没有实现，光断言「返回 0、零写入」无法区分「被守卫拦下」
  // 与「走了缺失路径」——两条路的可观测结果完全相同，守卫删掉用例照样绿。
  // 故临时给 5 号注册一个实现：守卫在，它绝不会被调到。
  let called = false;
  chara_ex.register(5, () => {
    called = true;
  });

  assert.equal(await add_chara_ex(5), 0);
  assert.equal(called, false, '守卫应在分发前拦下编号 1-16，实现不得被调用');
  assert.deepEqual(fixture.var_writes, []);

  // 对照：同一个实现在守卫放行的编号上确实会被调到，证明上面的 false 不是
  // 因为注册本身没生效
  chara_ex.register(17, () => {
    called = true;
  });
  await add_chara_ex(17);
  assert.equal(called, true);
});

test('add_chara_ex(999)：编号空间外 → 抛错（拼写错误）', async () => {
  const { add_chara_ex } = load_chara_ex();

  await assert.rejects(() => add_chara_ex(999), /不在声明的编号空间内/);
});

test('端到端：标题选「新的猎物」→ 加入角色 0 → 经注册表分发到专属初始化', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  // 预置标题音乐默认值播种标记（#69），让全量 var_writes 断言只看见分发写入；
  // 播种自身的用例在 test/page-title.test.js
  fixture.store.set('global:2', 1);
  // 严格夹具：角色 0 要有预设才加得进（#35 镜像的引擎守卫）
  preset_chara_0(fixture);
  fixture.set_inputs(1);
  const run_title_page = fixture.load_module('page/page-title');
  const { BeginSignal, STATE } = fixture.load_module(
    'system/flow/begin-signal',
  );

  // 新游戏分支以 FIRST 转场信号结束（原作 :103 BEGIN FIRST）
  await assert.rejects(
    () => run_title_page(),
    (e) => e instanceof BeginSignal && e.state === STATE.FIRST,
  );

  // 原作 :101 ADDCHARA 0：加入初始角色（#23 起夹具实装已加入列表，
  // 断言列表内容即断言调用）
  assert.deepEqual(fixture.chara_no, [0], '必须加入初始角色 0');
  // 原作 :102 CALL @ADDCHARA_EX → TRYCALLFORM CHARA_EX_0 → @CHARA_EX_0：
  // 分发真实发生的证据 = 角色 0 专属初始化的写入（EX_TALENT:200 = 魔王），
  // 且此前零写入（全量断言，任何意外写入都会暴露）
  assert.deepEqual(fixture.var_writes, [{ name: 'ex_talent:0:200', value: 1 }]);
});

// —— 独立性：分发注册表与事件注册表是两套机制（#7 的边界判断）——

test('独立性：分发注册表可用且不连带载入事件注册表', async () => {
  const fixture = create_era_fixture();
  const family = make_family(fixture, 'DEMO', [1, 2]);
  family.register(1, async () => '命中');
  assert.equal(await family.call(1), '命中');
  assert.equal(await family.call(2, { whenMissing: -1 }), -1);

  // require.cache 里不得出现事件注册表（加载分发机制不该拉动事件机制）
  const loaded = Object.keys(require.cache).filter((key) =>
    key.startsWith(ERE_DIR + path.sep),
  );
  assert(
    loaded.every((key) => !key.includes(path.join('system', 'event'))),
    `分发注册表连带动入了事件注册表: ${loaded.join(', ')}`,
  );
});

test('独立性：事件注册表可用且不连带载入分发注册表', async () => {
  const fixture = create_era_fixture();
  const registry = fixture.load_module('system/event/registry');
  const ran = [];
  registry.on('EVENTTEST', async () => ran.push('处理器'));
  await registry.emit('EVENTTEST');
  assert.deepEqual(ran, ['处理器']);

  const loaded = Object.keys(require.cache).filter((key) =>
    key.startsWith(ERE_DIR + path.sep),
  );
  assert(
    loaded.every((key) => !key.includes(path.join('system', 'dispatch'))),
    `事件注册表连带动入了分发注册表: ${loaded.join(', ')}`,
  );
});

test('独立性：CHARA_EX 族不往事件注册表塞任何处理器（反之亦然）', async () => {
  const fixture = create_era_fixture();
  const { chara_ex } = fixture.load_module('chara/chara-ex');
  const registry = fixture.load_module('system/event/registry');

  // 族名不是事件名：emit 空链返回 undefined，没有任何处理器被广播执行
  assert.equal(await registry.emit('CHARA_EX'), undefined);
  // 族自身状态完好（8 实现未被事件机制干扰）
  assert.equal(chara_ex.missing().length, 37);
});

test('独立性：两套机制同进程并用，同名互不串扰', async () => {
  const fixture = create_era_fixture();
  const family = make_family(fixture, 'CHARA_EX', [0]);
  const registry = fixture.load_module('system/event/registry');
  family.register(0, async () => '查表命中');
  const ran = [];
  registry.on('CHARA_EX', async () => ran.push('广播处理器'));

  // 查表式：一个编号命中唯一实现
  assert.equal(await family.call(0), '查表命中');
  // 广播式：一个事件跑全部处理器；族的存在不影响事件链的返回
  assert.equal(await registry.emit('CHARA_EX'), undefined);
  assert.deepEqual(ran, ['广播处理器']);
  // 事件注册没有给族凭空造出实现，广播执行也没有算进族的实现
  assert.deepEqual(family.missing(), []);
});
