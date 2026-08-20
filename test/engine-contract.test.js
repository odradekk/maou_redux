/**
 * @file 引擎语义的契约对拍（issue #91，ADR-0005 第一层）。
 *
 * 夹具（era-fixture.js）对引擎 allowWait 状态机的镜像，此前只有人读
 * app.asar 后写下的注释背书——注释不会在回归时说话（#68 input 回显 +1
 * Row、#69 playMusic 不占 Row，两次都是测试全绿、实机出错）。本文件把
 * engine-bundle 取到的**真 EraApi 方法**（模块 183 的原型方法，闭包是真
 * 的、this 是最小假体）与夹具镜像放在同一串调用序列下**逐步**对拍：每
 * 一步比对 {行数, allowWait} 与 waits 观测记录，而不是只比末态——三次
 * 缺陷的共同形态是「某一步的副作用被漏掉」，末态对拍在副作用互相抵消时
 * 静默通过。
 *
 * 边界（工单已查实，勿重查）：clear 横跨两层——守卫链（disableClear
 * 短路、isContinue 强制等键、setTotalLines 再置位）在 background.js，
 * 行数算术在渲染层。这里只对拍守卫链：引擎侧的 clearScreen 用「假渲染
 * 层」打桩（era.connect/listen 立即按渲染层公式应答剩余行数），两侧的
 * 算术同源、不比；第二层（渲染变换）不执行——锚点校核在
 * tools/engine-contract-check.mjs。
 *
 * 引擎缺失（无 app.asar）时对拍用例整组 skip 并留警告（engine-bundle
 * 内建）；模块号漂移则硬红（load_engine_bundle 的形状守卫 + 本文件的
 * 探针用例）。
 */

'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { build_asar } = require('./helpers/fake-asar');
const { load_engine_bundle } = require('./helpers/engine-bundle');

const REPO_ROOT = path.resolve(__dirname, '..');

const engine = load_engine_bundle();
const engine_test = engine ? test : test.skip;

// —— 引擎侧适配器：真方法 + 假 this ——
//
// this 按方法体的依赖清单最小构造；方法互相经 this 调用（print 结尾调
// this.addTotalLines、clear 调 this.waitAnyKey / this.clearScreen），故把
// 需要的原型方法挂到 this 上（未绑定，this 仍是假体）。渲染层用假 era
// 打桩：connect 记录事件流；listen 立即应答——input 应答回 {val, continue}
// （引擎以它维护 isContinue、决定回显），clear 应答回「渲染层公式」算出的
// 剩余行数（NaN / 超界 → 0，否则删最近 n 行——公式两侧同源，本文件不比
// 算术、只比守卫链）。waitAnyKey 内部走 input({any:true})，同样过假 era，
// 它消费的值与显式 input 的值分池（expect 旗标区分），避免顺序串味。
function create_engine_side() {
  const api = engine.era_api.prototype;
  const renderer_events = [];
  const input_values = []; // 显式 input() 步骤的值（与夹具 set_inputs 对应）
  const state = {
    config: { system: { hideUserInput: false, disableClear: false } },
    totalLines: 0,
    allowWait: false,
    isContinue: false,
    debug: false,
    res: {}, // 空注册表：playMusic 走「全落空返回 false」路径（两侧同判）
    era: {
      connect(type, payload) {
        renderer_events.push({ type, payload });
      },
      listen(_key, cb) {
        const last = renderer_events[renderer_events.length - 1];
        if (last.type === 'input') {
          const queue =
            adapter.expect === 'input' ? input_values : [{ val: 0 }];
          const val = queue.length > 0 ? queue.shift().val : 0;
          cb(undefined, { val, continue: false });
        } else if (last.type === 'clear') {
          const n = Number(last.payload.lineCount);
          cb(
            undefined,
            Number.isNaN(n) || n > state.totalLines ? 0 : state.totalLines - n,
          );
        }
      },
      cleanListener() {},
    },
    text() {}, // print 的渲染转发打桩：行数语义在 addTotalLines，不在 text
  };
  for (const method of [
    'print',
    'println',
    'printProgress',
    'drawLine',
    'input',
    'waitAnyKey',
    'clear',
    'clearScreen',
    'addTotalLines',
    'setTotalLines',
    'getLineCount',
    'playMusic',
  ]) {
    state[method] = api[method];
  }
  const adapter = {
    expect: 'wait', // 当前在途的 input 是显式调用还是 waitAnyKey/clear 内部
    print: (t) => state.print(t),
    print_progress: (...args) => state.printProgress(...args),
    play_music: (name) => state.playMusic(name),
    async input(config) {
      adapter.expect = 'input';
      try {
        return await state.input(config);
      } finally {
        adapter.expect = 'wait';
      }
    },
    async wait_any_key(force) {
      const rows_at_wait = state.totalLines;
      const events_before = renderer_events.length;
      await state.waitAnyKey(force);
      // 「真的等了」的实证 = 渲染层真收到一次 any 输入请求（waited 的判据
      // 本体在引擎条件式里，这里从事件流取证，不重写条件）
      const fired = renderer_events
        .slice(events_before)
        .some((e) => e.type === 'input' && e.payload.config?.any === true);
      return { waited: fired, rows_at_wait, forced: Boolean(force) };
    },
    async clear(line_count) {
      const rows_at_wait = state.totalLines;
      const events_before = renderer_events.length;
      const returned = await state.clear(line_count);
      const forced_wait = renderer_events
        .slice(events_before)
        .some(
          (e) =>
            e.type === 'input' &&
            e.payload.config?.any === true &&
            e.payload.config?.fromClear === true,
        );
      return {
        returned,
        wait: forced_wait ? { waited: true, rows_at_wait, forced: true } : null,
      };
    },
    snapshot() {
      return { rows: state.getLineCount(), allowWait: state.allowWait };
    },
    set_continue(value) {
      state.isContinue = Boolean(value);
    },
    set_hide_user_input(value) {
      state.config.system.hideUserInput = Boolean(value);
    },
    set_disable_clear(value) {
      state.config.system.disableClear = Boolean(value);
    },
    queue(...values) {
      input_values.push(...values.map((val) => ({ val })));
    },
  };
  return adapter;
}

// —— 夹具侧适配器：同一接口，走夹具的镜像与观测面 ——
function create_fixture_side() {
  const fixture = create_era_fixture();
  return {
    fixture,
    print: (t) => fixture.era.print(t),
    print_progress: (...args) => fixture.era.printProgress(...args),
    play_music: (name) => fixture.era.playMusic(name),
    input: (config) => fixture.era.input(config),
    async wait_any_key(force) {
      await fixture.era.waitAnyKey(force);
      return { ...fixture.waits[fixture.waits.length - 1] };
    },
    async clear(line_count) {
      const waits_before = fixture.waits.length;
      const returned = await fixture.era.clear(line_count);
      return {
        returned,
        wait:
          fixture.waits.length > waits_before
            ? { ...fixture.waits[fixture.waits.length - 1] }
            : null,
      };
    },
    snapshot() {
      return {
        rows: fixture.era.getLineCount(),
        allowWait: fixture.allow_wait,
      };
    },
    set_continue(value) {
      fixture.is_continue = Boolean(value);
    },
    set_hide_user_input(value) {
      fixture.system_config.hideUserInput = Boolean(value);
    },
    set_disable_clear(value) {
      fixture.system_config.disableClear = Boolean(value);
    },
    queue(...values) {
      fixture.set_inputs(...values);
    },
  };
}

/**
 * 跑同一串步骤，产出逐步轨迹 [{step, rows, allowWait, …额外记录}]。
 * 步骤的 run 返回的键并入该步记录（wait / returned 等）——deepEqual 整条
 * 轨迹即「逐步对拍」。
 */
async function run_sequence(make_side, steps) {
  const side = make_side();
  const trace = [];
  for (const step of steps) {
    const extra = (await step.run(side)) ?? {};
    trace.push({ step: step.name, ...side.snapshot(), ...extra });
  }
  return trace;
}

/** 空步骤（纯置位/预置），只为让轨迹里留下这一拍的快照 */
const noop = () => {};

// —— 主序列：allowWait 状态机全部转移 + 三次缺陷的形态 ——
//
// 序列按 waits[] 现有观测面（{waited, rows_at_wait, forced}）与每步的
// {行数, allowWait} 设计，判据是三次缺陷的形态能否被跑出来：
//   #68 input 回显 +1 Row → 「input() 回显」步：行数必须 +1（漏镜像即错位）；
//   #69 playMusic 不占 Row → 「playMusic」步：行数与 allowWait 都不动；
//   #74 参数条 → 「printProgress」步的行数面（+1 Row 恰一次）；barWidth 的
//     值语义在渲染层（第二层），由锚点校核与调用点规则守，不在本序列。
// 状态机转移的覆盖：置位（print / 回显 / clear 再置位）、消费（waitAnyKey
// 等即清零）、空转（无输出不等）、强制（waitAnyKey(true) 与快进态 clear）、
// 同值 setTotalLines 不再置位（clear(0)）、disableClear 整体无操作。
const MAIN_SEQUENCE = [
  { name: '初态', run: noop },
  { name: '预置显式输入', run: (s) => s.queue(7, 9, 5) },
  { name: 'print 置位', run: (s) => s.print('标题行') },
  {
    name: 'waitAnyKey 消费',
    run: async (s) => ({ wait: await s.wait_any_key() }),
  },
  {
    name: 'waitAnyKey 空转（无输出不等）',
    run: async (s) => ({ wait: await s.wait_any_key() }),
  },
  {
    name: 'waitAnyKey(true) 强制',
    run: async (s) => ({ wait: await s.wait_any_key(true) }),
  },
  {
    name: 'input() 回显 +1 Row（#68 形态）',
    run: async (s) => ({ returned: await s.input() }),
  },
  {
    name: 'input({any:true}) 回显短路第三段',
    run: async (s) => ({ returned: await s.input({ any: true }) }),
  },
  { name: '开 hideUserInput', run: (s) => s.set_hide_user_input(true) },
  {
    name: 'input() 回显短路第一段',
    run: async (s) => ({ returned: await s.input() }),
  },
  { name: '关 hideUserInput', run: (s) => s.set_hide_user_input(false) },
  {
    name: 'playMusic 不占行不置位（#69 形态）',
    run: (s) => ({ returned: s.play_music('未注册') }),
  },
  {
    name: 'printProgress +1 Row（#74 形态的行数面）',
    run: (s) => s.print_progress(50, '阴核', ' 5540', { barWidth: 16 }),
  },
  { name: 'clear(1) 删一行并再置位', run: async (s) => await s.clear(1) },
  {
    name: 'clear(0) 无操作、同值不再置位',
    run: async (s) => await s.clear(0),
  },
  {
    name: 'clear() 整屏清空并再置位',
    run: async (s) => await s.clear(undefined),
  },
  { name: '开快进态 isContinue', run: (s) => s.set_continue(true) },
  {
    name: '快进态 clear(0) 仍不等（0!==e 不成立）',
    run: async (s) => await s.clear(0),
  },
  {
    name: '快进态 clear(2) 清屏前强制等键、清后无新行不再置位',
    run: async (s) => await s.clear(2),
  },
  { name: '关快进态', run: (s) => s.set_continue(false) },
  { name: 'print 恢复置位', run: (s) => s.print('尾部行') },
  { name: '开 disableClear', run: (s) => s.set_disable_clear(true) },
  {
    name: 'disableClear 下 clear 整体无操作',
    run: async (s) => await s.clear(1),
  },
  { name: '关 disableClear', run: (s) => s.set_disable_clear(false) },
];

engine_test(
  '契约对拍：真 EraApi 与夹具镜像在同一串调用下逐步一致（allowWait 状态机全转移）',
  async () => {
    const engine_trace = await run_sequence(create_engine_side, MAIN_SEQUENCE);
    const fixture_trace = await run_sequence(
      create_fixture_side,
      MAIN_SEQUENCE,
    );
    assert.deepEqual(
      fixture_trace,
      engine_trace,
      '夹具镜像与引擎逐步分叉——轨迹里第一个不一致的 step 即缺陷位',
    );
    // 关键转移的定点复核（deepEqual 已含，显式写出便于读报告定位）
    const by_name = Object.fromEntries(engine_trace.map((t) => [t.step, t]));
    assert.deepEqual(by_name['print 置位'], {
      step: 'print 置位',
      rows: 1,
      allowWait: true,
    });
    assert.equal(by_name['waitAnyKey 消费'].wait.waited, true);
    assert.equal(by_name['waitAnyKey 空转（无输出不等）'].wait.waited, false);
    assert.equal(by_name['waitAnyKey(true) 强制'].wait.forced, true);
    assert.deepEqual(by_name['input() 回显 +1 Row（#68 形态）'], {
      step: 'input() 回显 +1 Row（#68 形态）',
      rows: 2,
      allowWait: true,
      returned: 7,
    });
    assert.deepEqual(by_name['playMusic 不占行不置位（#69 形态）'], {
      step: 'playMusic 不占行不置位（#69 形态）',
      rows: 2,
      allowWait: true,
      returned: false,
    });
    assert.deepEqual(by_name['disableClear 下 clear 整体无操作'], {
      step: 'disableClear 下 clear 整体无操作',
      rows: 1,
      allowWait: true,
      returned: 1,
      wait: null,
    });
  },
);

// —— 末态相同但中途分叉的序列（验收：此行为有测试）——
// 两条序列的共同点：**正确实现下两侧的末态本来就一致**，把断言换成
// 「只比末态」它们永远绿——中途的 allowWait 分歧被后续副作用抹平，只有
// 逐步对拍抓得住。变异 M901/M902 分别拆掉对应镜像，此处必须红。

engine_test(
  '末态相同但中途分叉（一）：清屏再置位抹平「waitAnyKey 不清零」的分歧',
  async () => {
    const steps = [
      { name: '初态', run: noop },
      { name: 'print 置位', run: (s) => s.print('行') },
      {
        name: 'waitAnyKey 消费',
        run: async (s) => ({ wait: await s.wait_any_key() }),
      },
      { name: 'clear() 整屏清空并再置位', run: async (s) => await s.clear() },
    ];
    // 末态两侧同为 {rows:0, allowWait:true}（清屏的行数变化把 allowWait 再
    // 置位，抹平了上一步「消费」的分歧）——只比末态对「waitAnyKey 不清零」
    // 的变异是盲的；逐步轨迹在「waitAnyKey 消费」一步分叉（F vs T）
    const engine_trace = await run_sequence(create_engine_side, steps);
    const fixture_trace = await run_sequence(create_fixture_side, steps);
    assert.deepEqual(engine_trace[2].allowWait, false);
    assert.deepEqual(engine_trace.at(-1), {
      step: 'clear() 整屏清空并再置位',
      rows: 0,
      allowWait: true,
      returned: 0,
      wait: null,
    });
    assert.deepEqual(fixture_trace, engine_trace);
  },
);

engine_test(
  '末态相同但中途分叉（二）：等键消费抹平「clear 不再置位」的分歧',
  async () => {
    const steps = [
      { name: '初态', run: noop },
      { name: 'print 置位', run: (s) => s.print('行') },
      { name: 'clear() 整屏清空并再置位', run: async (s) => await s.clear() },
      {
        name: 'waitAnyKey 消费',
        run: async (s) => ({ wait: await s.wait_any_key() }),
      },
    ];
    // 末态两侧同为 {rows:0, allowWait:false}（等键把 clear 的再置位消费掉，
    // 抹平了「clear 后」那一步的分歧）——只比末态对「clear 的 setTotalLines
    // 再置位被删」的变异是盲的；逐步轨迹在「clear 后」分叉（T vs F），且
    // 等键记录本身分叉（waited 真 vs 假）
    const engine_trace = await run_sequence(create_engine_side, steps);
    const fixture_trace = await run_sequence(create_fixture_side, steps);
    assert.deepEqual(engine_trace[2].allowWait, true);
    assert.deepEqual(engine_trace[3].wait, {
      waited: true,
      rows_at_wait: 0,
      forced: false,
    });
    assert.deepEqual(fixture_trace, engine_trace);
  },
);

// —— 模块号漂移 → 硬红（不依赖真实引擎：伪造 asar 探针）——
//
// background.js 造形成「入口标记仍在、模块 183 不是 EraApi」的形状——
// 即引擎升版后最可能的样子。load_engine_bundle 的形状守卫必须抛
// 「引擎变了」，而不是让下游炸 TypeError 或静默 skip。
test('模块号漂移 → 硬红报「引擎变了」（engine-bundle 形状守卫）', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ere-contract-'));
  const asar_path = path.join(dir, 'app.asar');
  // 形状要点：含入口标记 `r(r.s=311)}`（engine-bundle 据此切 webpack
  // require）、wp(183) 返回非 EraApi 的对象
  fs.writeFileSync(
    asar_path,
    build_asar({
      'background.js':
        'var r=function(n){return{prototype:{}}};function main(){r(r.s=311)}main();',
    }),
  );
  try {
    const probe = spawnSync(
      process.execPath,
      [
        '-e',
        `require(${JSON.stringify(
          path.join(REPO_ROOT, 'test', 'helpers', 'engine-bundle.js'),
        )}).load_engine_bundle()`,
      ],
      { encoding: 'utf8', env: { ...process.env, ERE_ENGINE_ASAR: asar_path } },
    );
    assert.notEqual(probe.status, 0, '模块 183 不再是 EraApi 时必须非 0 退出');
    assert.ok(
      `${probe.stdout || ''}${probe.stderr || ''}`.includes('引擎变了'),
      `报错必须说清「引擎变了，重新核读」而非环境缺失：\n${probe.stderr}`,
    );
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
