/**
 * ere/kojo/kojo-system.js 的行为测试（issue #46：口上系统的公共底座；
 * #213 增补接触面契约——七道头部守卫）。
 *
 * 缝 = test/helpers/era-fixture.js。覆盖：
 *   - 两道守卫：FLAG:7 关闭时完全不输出（验收项「此行为有测试」）、
 *     存在判定 FLAG:LOCAL == 0 静默返回；
 *   - @GET_KOJO_NUM 的素质扫描（163 高貴 → 103、165 村娘A → 105、
 *     多素质后格覆盖、无素质 → 0、显式角色号）；
 *   - 分发：编号命中唯一实现、空间内缺失（K4 未移植）静默；
 *   - 事件链挂接：@EVENTSHOP #PRI 总开关默认开（只补 0）、
 *     @EVENTTRAIN #PRI 置存在标志、@EVENTEND #LATER 清 0；
 *   - 实机路径端到端：run_shop（BEGIN SHOP → @EVENTSHOP 链置开关）→
 *     @EVENTTRAIN 链 → COM0 → @SOURCE_CHECK 链 → K5 首次台词；
 *   - **#213 接触面契约**：@KOJO_MESSAGE_COM_<n> handler 的签名
 *     （kojo-system.js 文件头「handler 签名」段）——七道头部守卫对
 *     **已注册的全部 handler** 逐条置位驱动，守卫命中时不得出现台词。
 *     口上票（轴 B）落地新 handler 自动进契约，无需逐票自写守卫用例；
 *     指令族票（轴 A）对着同一签名扩展 SELECTCOM 分支。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');
const { seed_static_names } = require('./helpers/static-names');

// 世界底座：玛奥入列调教，加载口上系统 + K3/K5 两模块
async function setup_kojo(seed) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 17, '玛奥');
  fixture.era.beginTrain(0, 17);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 17;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = 0;
  fixture.store.set('talent:17:165', 1);
  fixture.store.set('flag:105', 1);
  fixture.store.set('flag:7', 2);
  if (seed) {
    seed(fixture);
  }
  fixture.load_module('kojo/kojo-system');
  fixture.load_module('kojo/kojo-k3-noble');
  fixture.load_module('kojo/kojo-k5-mao');
  fixture.load_module('kojo/kojo-k2-timid');
  return fixture;
}

test('FLAG:7 关闭（0 / -1）：口上完全不输出，状态不动', async () => {
  for (const off of [0, -1]) {
    const fixture = await setup_kojo((f) => f.store.set('flag:7', off));
    const { kojo_message_com } = fixture.load_module('kojo/kojo-system');
    await kojo_message_com();
    assert.deepEqual(fixture.text_lines(), [], `flag:7 = ${off}：静默`);
    assert.equal(fixture.store.get('cflag:17:301'), undefined);
  }
});

test('FLAG:7 = 1（少量模式）不拦（守卫是 <= 0）', async () => {
  const fixture = await setup_kojo((f) => f.store.set('flag:7', 1));
  const { kojo_message_com } = fixture.load_module('kojo/kojo-system');
  await kojo_message_com();
  assert.equal(fixture.text_lines().length, 2); // K5 首次两句
});

test('存在判定：FLAG:105 == 0 时静默（口上文件「被删掉」的容错）', async () => {
  const fixture = await setup_kojo((f) => f.store.set('flag:105', 0));
  const { kojo_message_com } = fixture.load_module('kojo/kojo-system');
  await kojo_message_com();
  assert.deepEqual(fixture.text_lines(), []);
});

test('GET_KOJO_NUM：素质 160-179 扫描，最后一格命中者胜', async () => {
  const fixture = await setup_kojo();
  const { get_kojo_num } = fixture.load_module('kojo/kojo-system');
  assert.equal(get_kojo_num(), 105); // 165 村娘A（隐式 TARGET）
  assert.equal(get_kojo_num(17), 105); // 显式角色号
  assert.equal(get_kojo_num(-1), 105); // 负参回落 TARGET（:90-91）

  // 163 高貴 → 103；163+168 同置 → 后格覆盖（FOR 无 BREAK，:137-140）
  fixture.store.set('talent:17:163', 1);
  assert.equal(get_kojo_num(17), 105); // 165 仍最后命中
  fixture.store.delete('talent:17:165');
  assert.equal(get_kojo_num(17), 103);
  fixture.store.set('talent:17:168', 1);
  assert.equal(get_kojo_num(17), 108);

  // 无性格素质 → 0（分发守卫不通过，无调用）
  fixture.store.delete('talent:17:163');
  fixture.store.delete('talent:17:168');
  assert.equal(get_kojo_num(17), 0);
});

test('分发：性格命中唯一实现；空间内缺失（K4 冷徹未移植）静默', async () => {
  // 高貴 163 + FLAG:103 → K3
  const k3 = await setup_kojo((f) => {
    f.store.delete('talent:17:165');
    f.store.set('talent:17:163', 1);
    f.store.set('flag:103', 1);
  });
  const { kojo_message_com } = k3.load_module('kojo/kojo-system');
  await kojo_message_com();
  assert.deepEqual(k3.text_lines(), ['「不，不要触摸…呃呜…呜呃呜~~~………」']);

  // 冷徹 164：KOJO_MESSAGE_COM_4 未注册（空间内合法缺失 = TRYCALL 落空）
  const k4 = await setup_kojo((f) => {
    f.store.delete('talent:17:165');
    f.store.set('talent:17:164', 1);
    f.store.set('flag:104', 1);
  });
  const { kojo_message_com: speak4 } = k4.load_module('kojo/kojo-system');
  await speak4();
  assert.deepEqual(k4.text_lines(), []);
});

// —— 事件链挂接（#PRI / #LATER 语义） ——

test('@EVENTSHOP #PRI：FLAG:7 == 0 补 2；1 与 -1 不动（关掉不自开）', async () => {
  for (const [before, after] of [
    [0, 2],
    [1, 1],
    [-1, -1],
  ]) {
    const fixture = await setup_kojo((f) => {
      f.store.delete('flag:7');
      if (before !== 0) {
        f.store.set('flag:7', before);
      } // before == 0 用「未写」表达（引擎读值 undefined → || 0）
    });
    const { emit } = fixture.load_module('system/event/registry');
    await emit('EVENTSHOP');
    assert.equal(
      fixture.store.get('flag:7') ?? 0,
      after,
      `flag:7 ${before} → ${after}`,
    );
  }
});

test('@EVENTTRAIN #PRI 置存在标志、@EVENTEND #LATER 清 0（两模块各自一对）', async () => {
  const fixture = await setup_kojo((f) => f.store.delete('flag:7'));
  const { emit } = fixture.load_module('system/event/registry');

  await emit('EVENTTRAIN');
  assert.equal(fixture.store.get('flag:103'), 1); // K3 存在标志
  assert.equal(fixture.store.get('flag:105'), 1); // K5 存在标志
  assert.equal(fixture.store.get('flag:7'), 2); // 总开关随之默认开

  await emit('EVENTEND');
  assert.equal(fixture.store.get('flag:103'), 0);
  assert.equal(fixture.store.get('flag:105'), 0);
});

test('实机路径端到端：主菜单 → 调教 → 爱抚 → 玛奥真的说话', async () => {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 17, '玛奥');
  seed_static_names(fixture);
  fixture.store.set('maxbase:17:0', 2000);
  fixture.store.set('maxbase:17:1', 2000);
  fixture.store.set('base:17:0', 1450);
  fixture.store.set('base:17:1', 410);

  // BEGIN SHOP → @EVENTSHOP 链（kojo-system 的 #PRI + page-shop 的普通档；
  // 挂载顺序同 main-loop：页面先、口上后——档位序保证 #PRI 先跑）
  const { run_shop } = fixture.load_module('page/page-shop');
  fixture.load_module('kojo/kojo-system');
  fixture.load_module('kojo/kojo-k3-noble');
  fixture.load_module('kojo/kojo-k5-mao');
  // 走一轮面板切换（500 是已打印按钮，#130：引擎只送达已打印按钮的快捷
  // 键；原用例的 9999 属无效输入，引擎侧根本不会送达）后输入耗尽
  fixture.set_inputs(500);
  await assert.rejects(() => run_shop(), /预置输入已耗尽/);
  assert.equal(
    fixture.store.get('flag:7'),
    2,
    '总开关由 @EVENTSHOP #PRI 默认开',
  );

  // BEGIN TRAIN → @EVENTTRAIN 链（存在标志 + 真实的 #PRI 主体）
  fixture.era.beginTrain(0, 17);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 17;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = 0;
  fixture.store.set('talent:17:165', 1);
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTRAIN');
  assert.equal(fixture.store.get('flag:105'), 1);

  // 回合：COM0（爱抚）→ @SOURCE_CHECK（:11-12 的 CALL KOJO_MESSAGE_COM）
  fixture.load_module('system/train/com-caress');
  fixture.load_module('event/source-check');
  const { com_family } = fixture.load_module('system/train/com-family');
  await com_family.call(0);
  await emit('SOURCE_CHECK');
  assert.ok(
    fixture.text_lines().includes('「你这个变态…别、别碰我！」'),
    'K5 首次台词经真实调用点出现在输出里（#60 归一为简体）',
  );
  assert.equal(fixture.store.get('cflag:17:301'), 1, '状态机推进');
});

// —— #213 接触面契约：@KOJO_MESSAGE_COM_<n> 的七道头部守卫 ——

// 七道守卫的置位器（EVENT_K3_高貴.ERB:888-912 实测；K5 同款顺序互异——
// 契约锁的是守卫集与语义，顺序按各文件 1:1）。TEQUIP:55/45/89/90 只读
// （TEQUIP 建模归 J5，#215）。
const KOJO_GUARD_STATES = [
  [
    'TEQUIP:55 死斗场 → 专用口上',
    (fixture) => fixture.store.set('tequip:17:55', 1),
  ],
  [
    'ASSI > 0 && ASSIPLAY 助手调教 → 跳过',
    (fixture, era_flag) => {
      era_flag.assi = 17;
      era_flag.assiplay = 1;
    },
  ],
  [
    'TEQUIP:45 口塞（SELECTCOM != 45）→ 跳过',
    (fixture) => fixture.store.set('tequip:17:45', 1),
  ],
  ['TFLAG:899 失神 → 跳过', (fixture) => fixture.store.set('tflag:899', 1)],
  [
    'TEQUIP:89 兽奸 → 专用口上/静默',
    (fixture) => fixture.store.set('tequip:17:89', 1),
  ],
  ['TALENT:9 崩坏 → 跳过', (fixture) => fixture.store.set('talent:17:9', 1)],
  ['TEQUIP:90 触手 → 跳过', (fixture) => fixture.store.set('tequip:17:90', 1)],
];

test('#213 契约：七道头部守卫对已注册的全部 handler 逐条跳过（守卫命中不得出台词）', async () => {
  // 对 family 里已注册的每个 handler × 每道守卫：置位 → 直调 → 返回 0、
  // 无等待（台词用 printAndWait = print + waitAnyKey）、文本行只允许存根
  // 占位形状（死斗场/兽奸守卫岔去专用口上时打占位行，K3/K5 形状各异）。
  // 新口上票落地即自动进本契约——这是「12 张族票与 21 张口上票对着同一
  // 张脸写」的机器守卫。
  const probe = await setup_kojo();
  const { kojo_message_com_family } = probe.load_module('kojo/kojo-system');
  const handlers = [...kojo_message_com_family.implemented.entries()];
  assert.ok(handlers.length >= 3, '契约至少要覆盖已注册的 K2/K3/K5');
  for (const [num, handler] of handlers) {
    for (const [name, seed_guard] of KOJO_GUARD_STATES) {
      const fixture = await setup_kojo();
      const flag = fixture.load_module('era-utils/era-flag');
      seed_guard(fixture, flag);
      const result = await handler();
      assert.equal(result, 0, `KOJO_MESSAGE_COM_${num} 守卫「${name}」返回 0`);
      assert.equal(
        fixture.calls.filter((c) => c.api === 'waitAnyKey').length,
        0,
        `KOJO_MESSAGE_COM_${num} 守卫「${name}」不得有台词（无等待）`,
      );
      for (const line of fixture.text_lines()) {
        assert.match(
          line,
          /尚未移植，此处为占位/,
          `KOJO_MESSAGE_COM_${num} 守卫「${name}」只允许存根占位行，` +
            `实际输出：${line}`,
        );
      }
    }
  }
});
