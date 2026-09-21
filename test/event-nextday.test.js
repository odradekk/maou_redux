/**
 * @EVENT_NEXTDAY / @EVENT_NEWDAY / @EVENT_NEXTMONTH 窄路径的行为测试
 * （issue #115：S3 日程推进与月份回绕）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点，issue #16）。
 * 三档链按 main-loop.js 的书写顺序加载后直接驱动 emit('EVENTTURNEND')
 * （与主循环进入 TURNEND 状态后同一入口），日推进 = TIME==1 的那次 emit。
 *
 * 覆盖（对应工单验收清单）：
 *   1. 连续推进 400 天：DAY:1 始终 1–12、DAY:2 落在合法日范围、大小月与
 *      2 月/12 月回绕全部正确（对照独立天数表的期望序列逐日核对）；
 *   2. 每推进一天 ENDCHECK 恰好被调用一次（#116 起为真调用，观测其每日
 *      无条件副作用——ENDRESET 的玛奥清场写：日推进回合 1 笔、午后回合
 *      0 笔、N 天累计 N 笔）；
 *   3. 单元级全量写入断言（直接调 run_event_nextday / run_event_newday）；
 *   4. 存根清单核对（两模块的 STUBBED_CALLS ↔ docs/stub-registry.md）；
 *   5. 执行序：EVENT_NEXTDAY 先于日推进（月替播报在其后）、ENDCHECK 在
 *      普通档尾部。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara } = require('./helpers/chara');

/** 建一个带三档链与日程真身的夹具：魔王 0 在场，调用方按需再入奴隶 */
function setup_nextday() {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  // 金钱不变量（#401）：@DEBUG_CHECK 是回合链的一环，按
  // `MONEY == EX_FLAG:4444 + 8766` 判「钱被改过」，不成立就炸宝库、清零
  // 资金、随机删一个角色（合法开局由 @EVENTFIRST 播种 10000 / 1234；本
  // 函数不跑 EVENTFIRST）。不补的话撤走的角色是随机的、本文件多处以
  // 角色仍在场为前提（工单：不许把断言放宽成区间绕过去）
  fixture.store.set('flag:10004', 10000); // MONEY
  fixture.store.set('exflag:4444', 1234); // EX_FLAG:4444（非作弊资金）
  fixture.load_module('event/event-turnend');
  fixture.load_module('system/turnend-settle');
  fixture.load_module('event/event-turnend-later');
  const { emit } = fixture.load_module('system/event/registry');
  const era_flag = fixture.load_module('era-utils/era-flag');
  // 本局关闭勇者来袭（#171/#168 裁定 4 的隔离开关）：本文件的用例测日程
  // 推进与月份回绕，不测勇者——ENTER_ENEMY 自 #171 起为每日真调用，勇者
  // 来袭的行为在 test/enter-enemy.test.js 隔离地测（event-turnend.test.js
  // 的 setup_turnend 同款）
  fixture.disable_enter_enemy();
  return { fixture, emit, era_flag };
}

/** 占位行按「原作 @函数名，」精确计数（避免 @ENDCHECK 误命中更长名字） */
function stub_count(lines, name) {
  return lines.filter((line) => line.includes(`原作 @${name}，`)).length;
}

// 独立日历表（大小月知识的独立来源，与实现无关地写死）：value = 该月可
// 显示的最大日（玩家可见的月末）；换月发生在 date 越过它时。原作语义：
// 2 月 28（29 瞬间换）、小月 30、大月 31；12 月越界回 1 月
const MONTH_DAYS = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};

test('连续推进 400 天：月始终 1–12、日始终合法，大小月与 2 月/12 月回绕逐日正确', async () => {
  const world = setup_nextday();
  join_slave_chara(world.fixture, 31, '温妮');

  // 开局对齐原作 @EVENTFIRST：DAY:1 = 1、DAY:2 留 0（era-flag 手写区注释）
  world.era_flag.month = 1;
  world.era_flag.date = 0;

  // 期望序列独立推演：与实现同源的「原作语义」，但日历知识来自上面的表
  let exp_month = 1;
  let exp_date = 0;

  for (let day = 1; day <= 400; day += 1) {
    // 一天 = 两次回合（午前→午后、午后→次日午前）
    await world.emit('EVENTTURNEND'); // TIME 0→1（不进日）
    await world.emit('EVENTTURNEND'); // TIME 1→0（进日）

    exp_date += 1;
    // 原作换月判据（EVENT_TURNEND.ERB:83 + EVENT_NEXTMONTH.ERB:14-26）：
    // date > 28 时调用月替；2 月支不看 date（触发即换）、其余按大小月溢出
    if (exp_date > 28 && exp_date > MONTH_DAYS[exp_month]) {
      exp_month = exp_month === 12 ? 1 : exp_month + 1;
      exp_date = 1;
    }

    assert.equal(
      world.era_flag.day_count,
      day,
      `第 ${day} 天的 DAY:0 应为 ${day}`,
    );
    assert.ok(
      world.era_flag.month >= 1 && world.era_flag.month <= 12,
      `第 ${day} 天月号越界: ${world.era_flag.month}`,
    );
    assert.ok(
      world.era_flag.date >= 1 && world.era_flag.date <= 31,
      `第 ${day} 天日号越界: ${world.era_flag.date}`,
    );
    assert.deepEqual(
      [world.era_flag.month, world.era_flag.date],
      [exp_month, exp_date],
      `第 ${day} 天的 (月, 日) 与期望日历不符`,
    );
  }

  // 400 天 = 365 + 35：恰跨一次年（第 366 天回到 1 月 1 日），第 400 天
  // 落在次年 2 月 4 日——逐日核对已保证，这里锚定两个里程碑防期望表自身
  // 错位（365/366 边界即 12 月 31 → 1 月 1）
  const milestones = {};
  {
    let m = 1;
    let d = 0;
    for (let day = 1; day <= 400; day += 1) {
      d += 1;
      if (d > 28 && d > MONTH_DAYS[m]) {
        m = m === 12 ? 1 : m + 1;
        d = 1;
      }
      if (day === 365 || day === 366 || day === 400) {
        milestones[day] = [m, d];
      }
    }
  }
  assert.deepEqual(milestones[365], [12, 31], '第 365 天应为 12 月 31 日');
  assert.deepEqual(milestones[366], [1, 1], '第 366 天应跨年回到 1 月 1 日');
});

test('跨年的年龄增长：奴隶 452 +1、451 落换算真身，魔王不涨', async () => {
  const world = setup_nextday();
  join_slave_chara(world.fixture, 31, '温妮');
  world.era_flag.month = 12;
  world.era_flag.date = 31;
  world.era_flag.time = 1;

  await world.emit('EVENTTURNEND'); // date → 32 → 12 月支：回 1 月 + 年龄增长

  assert.equal(world.era_flag.month, 1, '12 月溢出必须回 1 月');
  assert.equal(world.era_flag.date, 1);
  assert.equal(
    world.fixture.store.get('cflag:31:452'),
    1,
    '奴隶的种族年龄应 +1（CFLAG:452）',
  );
  // #385 起 HUMAN_AGE_GENERATE 为真身：未设种族（TALENT:314 = 0）走 1 倍档，
  // 人类年龄 = 种族年龄
  assert.equal(
    world.fixture.store.get('cflag:31:451'),
    1,
    '奴隶的年龄应写入换算结果（1 倍档：与种族年龄同值）',
  );
  assert.equal(
    stub_count(world.fixture.text_lines(), 'HUMAN_AGE_GENERATE'),
    0,
    '已落真身，不得再有换算占位行',
  );
  assert(
    !world.fixture.var_writes.some((w) => w.name === 'cflag:0:452'),
    'FOR AGE_COUNT, 1, CHARANUM 跳过 0 号位：魔王不得涨年龄',
  );
  assert(
    world.fixture
      .text_lines()
      .includes('明天就是新一年的开始了，再努力地把邪恶传播到各处吧！'),
    '新年播报必须出现',
  );
});

test('每推进一天 ENDCHECK 恰好被调用一次：午后回合 0 次、日推进回合 1 次', async () => {
  const world = setup_nextday();
  join_slave_chara(world.fixture, 31, '温妮');

  // ENDCHECK 已是真调用（#116），观测点改为其每日无条件副作用：ENDRESET
  // 的玛奥清场写（玛奥 17 不在场 → exflag:2805 = 0 每次执行必写一笔）
  const endcheck_runs = (fixture) =>
    fixture.var_writes.filter((w) => w.name === 'exflag:2805').length;

  // 午后回合（TIME 0→1）：不进日，不得监测
  await world.emit('EVENTTURNEND');
  assert.equal(
    endcheck_runs(world.fixture),
    0,
    '不进日的回合不得调用 ENDCHECK',
  );

  // 日推进回合（TIME 1→0）：恰好一次
  await world.emit('EVENTTURNEND');
  assert.equal(
    endcheck_runs(world.fixture),
    1,
    '每推进一天 ENDCHECK 必须恰好被调用一次（@EVENT_NEWDAY 的 :241）',
  );

  // 累计 10 天：恰好 10 次（每天恰好一次的累计形式）
  for (let day = 2; day <= 10; day += 1) {
    await world.emit('EVENTTURNEND');
    await world.emit('EVENTTURNEND');
  }
  assert.equal(
    endcheck_runs(world.fixture),
    10,
    '10 个游戏日的累计调用数必须是 10',
  );
});

test('单元级全量写入：EVENT_NEXTDAY 写 FLAG:61 与水晶球每日结算；EVENT_NEWDAY 经 ENDCHECK 追加清场与反叛写', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  fixture.store.set('flag:61', 3); // 熏香使用次数非零，验证清零
  fixture.load_module('dungeon/monster-summon').summon_monster = async () => 0;
  const { run_event_nextday, run_event_newday } = fixture.load_module(
    'event/event-nextday',
  );

  // 水晶球结算（#502）的 RAND:3 走 Math.random：钉成常数 1/2 让两枚都非零
  // （floor(0.5×3) = 1，即「流行度也 -1」的那 2/3 侧），写入序列才是确定的
  fixture.override_math_random(() => 0.5);
  try {
    await run_event_nextday();
  } finally {
    fixture.restore_math_random();
  }
  assert.deepEqual(
    fixture.var_writes,
    [
      { name: 'flag:61', value: 0 },
      // @SENGEN_VIDEO_DE（#502，INVASION.ERB:1271-1281）：过时倒计时 -1、
      // 流行度 -1，两段同款的清零 IF 各写一对（已是 0 也照写，1:1 保留）
      { name: 'exflag:9013', value: -1 },
      { name: 'exflag:9012', value: -1 },
      { name: 'exflag:9013', value: 0 },
      { name: 'exflag:9012', value: 0 },
      { name: 'exflag:9013', value: 0 },
      { name: 'exflag:9012', value: 0 },
    ],
    '只有魔王（循环全跳过）时的全部写入 = 熏香清零 + 水晶球每日结算',
  );

  // EVENT_NEWDAY 的晨间事件全是存根；入口自动存档（#137，见下一条用例）
  // 经 @SAVEINFO 的 1:1 副作用改写 TARGET/ASSI 指针（FLAG:1/FLAG:2 缺省 0
  // 恒 >= 0 → 双写 0）；:241 起进入 @ENDCHECK（#116 真调用）：
  // ENDRESET 十一角清场（剧情角色全不在场 → 十一笔零写，源码顺序）+
  // ENDCHECKMAIN 反叛判定（夹具零播种 → 威望 0 ≤ 0 → FLAG:2816 = 10）；
  // 其余四条线条件全不触发，ENDCHECKCHARA 无角色可定线，分派循环对空注册表静默
  await run_event_newday();
  assert.deepEqual(
    fixture.var_writes,
    [
      { name: 'flag:61', value: 0 },
      { name: 'exflag:9013', value: -1 },
      { name: 'exflag:9012', value: -1 },
      { name: 'exflag:9013', value: 0 },
      { name: 'exflag:9012', value: 0 },
      { name: 'exflag:9013', value: 0 },
      { name: 'exflag:9012', value: 0 },
      { name: 'flag:10005', value: 0 }, // TARGET = FLAG:1（自动存档的 SAVEINFO 副作用）
      { name: 'flag:10006', value: 0 }, // ASSI = FLAG:2（同上）
      { name: 'exflag:2805', value: 0 }, // 玛奥
      { name: 'exflag:2813', value: 0 }, // 金红桃
      { name: 'exflag:2814', value: 0 }, // 银黑桃
      { name: 'exflag:2811', value: 0 }, // 黑方片
      { name: 'exflag:2812', value: 0 }, // 白梅花
      { name: 'exflag:2806', value: 0 }, // 莉莉
      { name: 'exflag:2808', value: 0 }, // 琼
      { name: 'exflag:2809', value: 0 }, // 普林希斯
      { name: 'exflag:2810', value: 0 }, // 嘉德
      { name: 'flag:2815', value: 0 }, // 葵希罗（原作错写 FLAG 侧，1:1）
      { name: 'exflag:2807', value: 0 }, // 菲娅
      { name: 'flag:2816', value: 10 }, // 反叛判定（威望 0）
    ],
    'EVENT_NEWDAY 的写入 = 自动存档的指针副作用 + ENDCHECK 链（ENDRESET 清场 + 反叛写）',
  );
});

test('自动存档（#137/ADR-0006）：EVENT_NEWDAY 入口写 99 号槽，备注带「自动」前缀', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  fixture.store.set('flag:10000', 6); // DAY:0 = 6 → 第 7 日
  fixture.store.set('flag:10003', 0); // TIME = 0 → 午前
  fixture.store.set('flag:10019', 5); // LASTSAVE_NO 已有值
  const { run_event_newday } = fixture.load_module('event/event-nextday');

  await run_event_newday();

  // saveData 恰一次、目标 99 号槽（夹具的数据层真实现同时落备注）。args
  // 断言在前：拆掉自动存档的变异下它先红（M252 的 must_mention 锚点）
  const saves = fixture.calls.filter((c) => c.api === 'saveData');
  assert.equal(
    saves[0]?.args[0],
    99,
    '自动存档必须写 99 号槽（原作留白，ADR-0006）',
  );
  assert.equal(saves.length, 1, '入口恰好存一次');
  assert.match(
    saves[0].args[1],
    /^自动 \d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2} 第 7日午前/,
    '备注 = 「自动」前缀 + %GETTIMES()% + @SAVEINFO 正文（#104 决议第三节）',
  );
  assert.equal(
    fixture.store.get('global:saves:99'),
    saves[0].args[1],
    '备注落 global:saves:99（读档界面单列段即读它）',
  );
  // 有意取舍：不 push LASTSAVE_NO（自动行为不占用玩家的上次存档高亮）
  assert.equal(
    fixture.store.get('flag:10019'),
    5,
    '自动存档不得动 LASTSAVE_NO',
  );
  // 无输出：日推进的输出流不被打断（除 ENDCHECK 链的既有行外零新增文本）
  assert(
    !fixture.text_lines().some((t) => t.includes('已将游戏保存为')),
    '自动存档无玩家可见反馈（手动档的反馈行不得出现）',
  );
});

test('排卵诱发剂效果消去：CFLAG:109 非零时播报 + 清零（走门面，跨域写）', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  fixture.store.set('cflag:31:109', 1);
  const { run_event_nextday } = fixture.load_module('event/event-nextday');

  await run_event_nextday();
  assert.equal(fixture.store.get('cflag:31:109'), 0, '效果标志必须清零');
  assert(
    fixture.text_lines().includes('温妮的排卵诱发剂的效果消失了。'),
    '消去播报必须出现',
  );
  assert(
    fixture.var_writes.some((w) => w.name === 'cflag:31:109' && w.value === 0),
    '清零写必须落在 cflag:31:109',
  );
});

test('录像日收益接线：EVENT_NEXTDAY 在每角色循环调用 EVENT_VIDEO_DAY 真身', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  fixture.store.set('cflag:31:497', 1);
  fixture.store.set('cflag:31:493', 1000);
  fixture.store.set('cstr:31:6', '温妮的调教');
  fixture.override_math_random(() => 0);
  const { run_event_nextday } = fixture.load_module('event/event-nextday');
  try {
    await run_event_nextday();
  } finally {
    fixture.restore_math_random();
  }

  assert.equal(fixture.store.get('cflag:31:495'), 100, '每日浏览数已累计');
  assert.equal(fixture.store.get('flag:10004'), 100, '每日收益已入账');
  assert(
    !fixture.text_lines().some((line) => line.includes('@EVENT_VIDEO_DAY')),
  );
});

test('执行序：EVENT_NEXTDAY 先于日推进（月替播报在其后）、ENDCHECK 在普通档尾部', async () => {
  const world = setup_nextday();
  join_slave_chara(world.fixture, 31, '温妮');
  // 银黑桃 21 在场且线值 >= 151：ENDCHECK（#116 真调用）进入 ENDCHECKCHARA
  // 时会跑真身状态机、打一行乳业收入播报——它就是 ENDCHECK 执行的直接
  // 可见证据（#404 起该链的存根行已换成真身）
  join_slave_chara(world.fixture, 21, '银黑桃');
  world.fixture.store.set('exflag:2814', 151);
  // NEXTDAY 体内的可见锚：排卵诱发剂消去播报（:55-61），位于税収/角色循环之前
  world.fixture.store.set('cflag:31:109', 1);
  world.era_flag.month = 2;
  world.era_flag.date = 28;
  world.era_flag.time = 1;

  await world.emit('EVENTTURNEND');

  const texts = world.fixture.text_lines();
  const nextday = texts.findIndex((line) =>
    line.includes('温妮的排卵诱发剂的效果消失了。'),
  ); // NEXTDAY 体内（:55-61）
  const month_roll = texts.findIndex((line) => line.includes('明天就是3月了')); // NEXTMONTH（在 :84，DAY 推进之后）
  const endcheck = texts.findIndex((line) =>
    line.includes('银黑桃乳业获得的收入desu'),
  ); // ENDCHECK 内部（@EVENT_NEWDAY :241 之后，ENDCHECKSPADE 的 151 档播报）
  const campaign = texts.findIndex((line) => line.includes('@AUTOTRAIN')); // 普通档尾部
  assert.ok(nextday >= 0 && month_roll >= 0 && endcheck >= 0 && campaign >= 0);
  assert.ok(
    nextday < month_roll,
    'EVENT_NEXTDAY（:77）必须先于月替（:84）——原作调用序',
  );
  assert.ok(
    campaign < endcheck,
    'ENDCHECK（@EVENT_NEWDAY :241，经普通档 :751）必须在普通档尾部之后',
  );
});

test('诅咒戒指制造接线（#174 真身）：EVENT_NEXTDAY:120 无条件调用，按库存逐个消耗', async () => {
  // 随机源走生产路径（Math.random），断言对环种不敏感：只看消耗与播报形态
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  fixture.store.set('item:300', 1);
  const { run_event_nextday } = fixture.load_module('event/event-nextday');

  await run_event_nextday();
  assert.equal(fixture.store.get('item:300'), 0, '装饰戒指被消耗一件');
  assert.match(
    fixture.text_lines().join('\n'),
    /你把装饰戒指制造成.+了/,
    '制造播报必须出现（EVENT_NEXTDAY:120 的调用点）',
  );
});

// —— #400（N16）落地的 12 个函数：先跑素质变化三事件 ——

/** 素质变化三事件共用的世界底座：魔王 0 在场 + 奴隶 31（温妮） */
function setup_chara_events() {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  return fixture;
}

test('扶她化（EVENT_FUTA_F）：选 [0] 得【扶她】+【童贞】，【肉芽诅咒】清零', async () => {
  const fixture = setup_chara_events();
  fixture.store.set('talentname:121', '扶她');
  fixture.store.set('talent:31:326', 1);
  const { event_futa_f } = fixture.load_module('event/event-nextday');

  fixture.set_inputs(0);
  await event_futa_f(31);

  assert.equal(fixture.store.get('talent:31:121'), 1, '获得【扶她】');
  assert.equal(fixture.store.get('talent:31:1'), 1, '获得【童贞】');
  assert.equal(fixture.store.get('talent:31:326'), 0, '【肉芽诅咒】清零');
  const texts = fixture.text_lines();
  assert(texts.includes('（呃…这是什么？）'), '开场白');
  assert(texts.includes('温妮要【扶她】化吗？'), '询问行取 TALENTNAME:121');
  assert(
    texts.includes('[0] - 好的') && texts.includes('[1] - 不要'),
    '选项行',
  );
  assert(texts.includes('温妮获得了【扶她】。'), '获得播报');
});

test('扶她化（EVENT_FUTA_F）：选 [1] 只清【肉芽诅咒】，不给【扶她】', async () => {
  const fixture = setup_chara_events();
  fixture.store.set('talentname:326', '肉芽诅咒');
  fixture.store.set('talent:31:326', 1);
  const { event_futa_f } = fixture.load_module('event/event-nextday');

  fixture.set_inputs(1);
  await event_futa_f(31);

  assert.equal(fixture.store.get('talent:31:326'), 0, '【肉芽诅咒】清零');
  assert.equal(
    fixture.store.get('talent:31:121'),
    undefined,
    '拒绝时不得写【扶她】',
  );
  assert.equal(
    fixture.store.get('talent:31:1'),
    undefined,
    '拒绝时不得写【童贞】',
  );
  assert(fixture.text_lines().includes('温妮失去了【肉芽诅咒】。'), '失去播报');
});

test('扶她化（EVENT_FUTA_F）：[0]/[1] 之外的输入回到 INPUT 循环重问', async () => {
  const fixture = setup_chara_events();
  fixture.store.set('talentname:121', '扶她');
  const { event_futa_f } = fixture.load_module('event/event-nextday');

  fixture.set_inputs(2, 7, 1);
  await event_futa_f(31);

  assert.equal(
    fixture.text_lines().filter((t) => t === '温妮要【扶她】化吗？').length,
    3,
    '每次非法输入都要重新询问（原作 GOTO INPUT_LOOP）',
  );
  assert.equal(
    fixture.inputs_consumed.filter((c) => c.api === 'input').length,
    3,
    '三次输入都被消费',
  );
});

test('尿床（EVENT_MORASI）：播报两条并给【漏尿癖】', async () => {
  const fixture = setup_chara_events();
  fixture.store.set('talentname:57', '漏尿癖');
  const { event_morasi } = fixture.load_module('event/event-nextday');

  await event_morasi(31);

  assert.equal(fixture.store.get('talent:31:57'), 1, '获得【漏尿癖】');
  const texts = fixture.text_lines();
  assert(texts.includes('当晚，温妮尿床了…'), '当晚播报');
  assert(texts.includes('温妮获得了【漏尿癖】。'), '获得播报');
});

test('幼儿退行（EVENT_YOUJI）：表驱动走完全部 13 项清理，逐项「有才清」', async () => {
  const CLEARED = [20, 21, 22, 24, 26, 27, 30, 32, 34, 35, 37, 55, 93];
  for (const n of CLEARED) {
    const fixture = setup_chara_events();
    fixture.store.set(`talentname:${n}`, `素质${n}`);
    fixture.store.set(`talentname:131`, '幼儿退行');
    fixture.store.set(`talentname:57`, '漏尿癖');
    fixture.store.set(`talent:31:${n}`, 1);
    const { event_youji } = fixture.load_module('event/event-nextday');

    await event_youji(31);

    assert.equal(fixture.store.get(`talent:31:${n}`), 0, `素质 ${n} 应被清零`);
    assert(
      fixture.text_lines().includes(`【素质${n}】消失了。`),
      `素质 ${n} 的消失播报`,
    );
  }
});

test('幼儿退行（EVENT_YOUJI）：未持有的清理项不写不留播报；表外的素质一项不动', async () => {
  const fixture = setup_chara_events();
  fixture.store.set('talentname:131', '幼儿退行');
  fixture.store.set('talentname:57', '漏尿癖');
  fixture.store.set('talentname:70', '接受快感');
  fixture.store.set('markname:3', '反抗刻印');
  fixture.store.set('mark:31:3', 3);
  // 表外且持有：清理表多写一项就会把它连播报一起清掉（维度外的边界）
  fixture.store.set('talent:31:70', 1);
  const { event_youji } = fixture.load_module('event/event-nextday');

  await event_youji(31);

  // 表外边界先行：清理表多写一项会先在这里红（比「有没有消失播报」更具体）
  assert.equal(
    fixture.store.get('talent:31:70'),
    1,
    '清理表只有原作那 13 项：表外素质不得被清',
  );
  // 13 项清理全部未持有 → 一行消失播报都不许有（原作逐个 IF TALENT:n 守卫）
  assert(
    !fixture.text_lines().some((t) => t.endsWith('消失了。')),
    '未持有的清理项不得产生消失播报',
  );
  for (const n of [20, 21, 22, 24, 26, 27, 30, 32, 34, 35, 37, 55, 93]) {
    assert.equal(
      fixture.store.get(`talent:31:${n}`),
      undefined,
      `素质 ${n} 未持有时不得被写`,
    );
  }
  assert.equal(fixture.store.get('talent:31:131'), 1, '获得【幼儿退行】');
  assert.equal(fixture.store.get('talent:31:57'), 1, '【漏尿癖】为 0 时补上');
  assert.equal(fixture.store.get('mark:31:3'), 0, '【反抗刻印】清零');
  const texts = fixture.text_lines();
  assert(
    texts.includes('温妮再也无法接受严厉的调教，获得了【幼儿退行】…'),
    '幼儿退行播报',
  );
  assert(texts.includes('获得了【漏尿癖】。'), '补【漏尿癖】的播报');
  assert(texts.includes('【反抗刻印】变为０。'), '刻印清零播报');
});

test('幼儿退行（EVENT_YOUJI）：已持有【漏尿癖】时不重复给也不播报', async () => {
  const fixture = setup_chara_events();
  fixture.store.set('talentname:131', '幼儿退行');
  fixture.store.set('talentname:57', '漏尿癖');
  fixture.store.set('talentname:20', '克制');
  fixture.store.set('talentname:21', '冷漠');
  fixture.store.set('talentname:22', '感情淡薄');
  fixture.store.set('talentname:24', '保守的');
  fixture.store.set('talentname:26', '悲观的');
  fixture.store.set('talentname:27', '戒备森严');
  fixture.store.set('talentname:30', '看重贞操');
  fixture.store.set('talentname:32', '压抑');
  fixture.store.set('talentname:34', '抵抗');
  fixture.store.set('talentname:35', '害羞');
  fixture.store.set('talentname:37', '把柄');
  fixture.store.set('talentname:55', '调合知识');
  fixture.store.set('talentname:93', '威压感');
  fixture.store.set('markname:3', '反抗刻印');
  fixture.store.set('talent:31:57', 1);
  const { event_youji } = fixture.load_module('event/event-nextday');

  await event_youji(31);

  assert.equal(fixture.store.get('talent:31:57'), 1, '保持 1');
  assert(
    !fixture.text_lines().includes('获得了【漏尿癖】。'),
    '已持有时不播报（原作 IF TALENT:57 == 0 守卫）',
  );
  assert(
    fixture.var_writes.filter((w) => w.name === 'talent:31:57').length === 0,
    '已持有时不写（有意识地写成 1 也会进写清单）',
  );
});

test('魔族化（EVENT_MAZOKU）：欲望档 × 淫乱的二维表驱动，逐支核对种族与素质', async () => {
  // 种族编号 → yml/Item.yml 的显示名（原作 %ITEMNAME:(TALENT:现种族)%）
  const RACE_NAMES = { 152: '魅魔', 132: '小恶魔', 140: '下等恶魔' };
  // [欲望, 淫乱, 期望现种族, 期望素质 91/481/482（undefined = 该支不写）, 分支关键字]
  const cases = [
    [3, 1, 152, [1, 1, undefined], '获得了【魅惑】……'],
    [5, 1, 152, [1, 1, undefined], '获得了【诱惑】。'],
    [3, 0, 132, [1, 1, undefined], '获得了【魅惑】……'],
    [2, 1, 140, [undefined, undefined, 1], '获得了【铠破坏】。'],
    [0, 0, 140, [undefined, undefined, 1], '获得了【铠破坏】。'],
  ];
  for (const [desire, lewd, race, marks, line] of cases) {
    const fixture = setup_chara_events();
    fixture.store.set('itemname:152', '魅魔');
    fixture.store.set('itemname:132', '小恶魔');
    fixture.store.set('itemname:140', '下等恶魔');
    fixture.store.set('talent:31:314', 3); // 原种族 = 吸血鬼
    fixture.store.set('talentname:91', '魅惑');
    fixture.store.set('talentname:481', '诱惑');
    fixture.store.set('talentname:482', '铠破坏');
    fixture.store.set('abl:31:11', desire);
    fixture.store.set('talent:31:76', lewd);
    const { event_mazoku } = fixture.load_module('event/event-nextday');

    await event_mazoku(31);

    assert.equal(
      fixture.store.get('talent:31:321'),
      3,
      '原种族 = 改造前的种族',
    );
    assert.equal(
      fixture.store.get('talent:31:322'),
      race,
      `欲望 ${desire} / 淫乱 ${lewd} 的现种族`,
    );
    assert.equal(fixture.store.get('talent:31:314'), 9, '种族转为魔族');
    assert.equal(
      fixture.store.get('talent:31:91'),
      marks[0],
      '魅惑（undefined = 该支不写）',
    );
    assert.equal(fixture.store.get('talent:31:481'), marks[1], '诱惑');
    assert.equal(fixture.store.get('talent:31:482'), marks[2], '混乱');
    const texts = fixture.text_lines();
    assert(texts.includes('全身充满了浓厚的魔力………'), '开场播报（两支共用）');
    assert(
      texts.some((t) =>
        t.includes(`成为出色的【魔族・${RACE_NAMES[race]}】了。`),
      ),
      '种族名走 ITEMNAME 表',
    );
    assert(
      texts.some((t) => t.includes(line)),
      `分支关键字：${line}`,
    );
  }
});

test('魔族化（EVENT_MAZOKU）：持有【魂缚】时不改造也不播报', async () => {
  const fixture = setup_chara_events();
  fixture.store.set('talent:31:274', 1);
  fixture.store.set('talent:31:314', 3);
  fixture.store.set('abl:31:11', 9);
  const { event_mazoku } = fixture.load_module('event/event-nextday');

  await event_mazoku(31);

  assert.equal(fixture.store.get('talent:31:314'), 3, '种族保持不变');
  assert.equal(fixture.store.get('talent:31:321'), undefined, '不写原种族');
  assert.equal(fixture.text_lines().length, 0, '无任何输出');
});

test('维持费（RUNNING_COST）：难度档 × 天数的表驱动，逐档核对金额与扣款', async () => {
  // 世界定死：CHARANUM = 2（魔王 + 温妮）、无设施（FLAG:48 = 0）、
  // 人气（EXP:0:91）与贡献度（EXP:0:90）皆 0、DAY = 60
  // 基础 500 + 天数追加（>31 加 1000、>51 加 2000）= 3500
  // [难度, 期望金额]：生活费 100/人 → +200 − 100；再乘难度倍率
  const cases = [
    [1, 2880], // EASY：3500+100=3600，×0.80
    [2, 3600], // NORMAL：无倍率支
    [3, 7600], // HARD：3800，DAY≤60 → ×2.00
    [4, 20000], // EXTRA：4000，DAY>40 → ×5.00
    [5, 67200], // LUNATIC：4200，DAY>35 → ×16.00
  ];
  for (const [difficulty, expected] of cases) {
    const fixture = setup_chara_events();
    fixture.store.set('flag:5', difficulty);
    fixture.store.set('flag:10000', 60); // DAY:0
    fixture.store.set('flag:10004', 50000); // MONEY
    fixture.store.set('exflag:4444', 50000);
    const { running_cost } = fixture.load_module('event/event-nextday');

    await running_cost();

    assert.equal(
      fixture.store.get('flag:10004'),
      50000 - expected,
      `难度 ${difficulty} 的扣款额`,
    );
    assert.equal(
      fixture.store.get('exflag:4444'),
      50000 - expected,
      '非作弊资金同步扣减',
    );
    assert(
      fixture
        .text_lines()
        .some(
          (t) => t === `调教中心的维持费和奴隶们的生活费花了$${expected}……`,
        ),
      `播报行（含字面 $，难度 ${difficulty}）`,
    );
  }
});

test('维持费（RUNNING_COST）：天数三档边界（31/32、51/52）与发生门槛', async () => {
  // [DAY, 难度, 期望金额, 是否扣款]
  const cases = [
    [30, 2, 600, true], // 未过 31：500 + 200 − 100
    [31, 2, 600, true], // 边界：SIF DAY > 31 不成立
    [32, 2, 1600, true], // +1000
    [51, 2, 1600, true], // 边界：SIF DAY > 51 不成立
    [52, 2, 3600, true], // +2000
    [9, 2, 0, false], // NORMAL 从第 10 日起才发生
    [10, 2, 600, true], // 边界
    [19, 1, 0, false], // EASY 从第 20 日起才发生
    [20, 1, 480, true], // 边界：600 × 0.80
  ];
  for (const [day, difficulty, expected, charged] of cases) {
    const fixture = setup_chara_events();
    fixture.store.set('flag:5', difficulty);
    fixture.store.set('flag:10000', day);
    fixture.store.set('flag:10004', 50000);
    const { running_cost } = fixture.load_module('event/event-nextday');

    await running_cost();

    assert.equal(
      fixture.store.get('flag:10004'),
      charged ? 50000 - expected : 50000,
      `DAY ${day} / 难度 ${difficulty} 的扣款`,
    );
    assert.equal(
      fixture.text_lines().length,
      charged ? 1 : 0,
      `DAY ${day} / 难度 ${difficulty} 的播报行数`,
    );
    assert.equal(
      fixture.lines.filter((l) => l.type === 'divider').length,
      charged ? 1 : 0,
      `DAY ${day} / 难度 ${difficulty} 的分隔线（DRAWLINE）`,
    );
  }
});

test('维持费（RUNNING_COST）：FLAG:48 的六个设施位与警备员人数逐位叠加', async () => {
  // 位 1/2/4/32/8/16 各一笔；位 64 按 FLAG:40 人数 × 500
  const fixture = setup_chara_events();
  fixture.store.set('flag:5', 2);
  fixture.store.set('flag:10000', 60);
  fixture.store.set('flag:48', 1 | 2 | 4 | 32 | 8 | 16); // = 63
  fixture.store.set('flag:40', 3);
  fixture.store.set('flag:10004', 50000);
  const { running_cost } = fixture.load_module('event/event-nextday');

  await running_cost();

  // 基础 500 + 天数追加 3000 + 设施 500+100+1000+500+1800+100 = 7500，
  // 再 + 生活费 200 − 100 → 7600（生活费的加减在人气/贡献度之后，见原作序）
  assert.equal(fixture.store.get('flag:10004'), 50000 - 7600, '六位设施额');

  const with_guard = setup_chara_events();
  with_guard.store.set('flag:5', 2);
  with_guard.store.set('flag:10000', 60);
  with_guard.store.set('flag:48', 64);
  with_guard.store.set('flag:40', 3);
  with_guard.store.set('flag:10004', 50000);
  const mod = with_guard.load_module('event/event-nextday');
  await mod.running_cost();
  assert.equal(
    with_guard.store.get('flag:10004'),
    50000 - (3500 + 1500 + 100),
    '警备员按人数计（3 × 500）',
  );
});

test('维持费（RUNNING_COST）：人气与贡献度两把梯子（含原作不可达的两支）', async () => {
  // [EXP:0:91 人气, EXP:0:90 贡献度, 期望金额]
  // 两把梯子在「生活费」之前（原作序）：基数 3500，末尾 +200 − 100
  const cases = [
    [0, 0, 3600],
    [50, 0, 3950], // 人气 ≥50 → ×1.10：floor(3500×1.10) + 100
    [90, 0, 3950], // 原作升序判据：≥50 支先命中 → 70/90 两支不可达（1:1 保留）
    [0, 3000, 450], // 贡献度 ≥3000 → ×0.10
    [0, 2000, 1150], // ×0.30
    [0, 1200, 1850], // ×0.50
    [0, 700, 2200], // ×0.60
    [0, 400, 2550], // ×0.70
    [0, 200, 2900], // ×0.80
    [0, 100, 3250], // ×0.90
    [0, 99, 3600], // 未达阈值 → 原值
    [50, 3000, 485], // 两把梯子序贯：floor(floor(3500×1.10)×0.10) + 100
  ];
  for (const [popularity, contribution, expected] of cases) {
    const fixture = setup_chara_events();
    fixture.store.set('flag:5', 2);
    fixture.store.set('flag:10000', 60);
    fixture.store.set('exp:0:91', popularity);
    fixture.store.set('exp:0:90', contribution);
    fixture.store.set('flag:10004', 50000);
    const { running_cost } = fixture.load_module('event/event-nextday');

    await running_cost();

    assert.equal(
      fixture.store.get('flag:10004'),
      50000 - expected,
      `人气 ${popularity} / 贡献度 ${contribution} 的金额`,
    );
  }
});

test('维持费（RUNNING_COST）：TIMES 截断——浮点略小于整数时仍向下取整', async () => {
  const fixture = setup_chara_events();
  join_slave_chara(fixture, 32, '艾米'); // CHARANUM = 3
  fixture.store.set('flag:5', 4); // EXTRA
  fixture.store.set('flag:10000', 20); // DAY ≤ 20 → ×1.40
  fixture.store.set('flag:10004', 50000);
  const { running_cost } = fixture.load_module('event/event-nextday');

  await running_cost();

  // 500 + 3×300 − 100 = 1300；1300 × 1.4 = 1819.9999999999998 → 截断 1819
  // （四舍五入会得 1820——截断语义的直接靶点）
  assert.equal(fixture.store.get('flag:10004'), 50000 - 1819, 'TIMES 截断');
  assert(
    fixture
      .text_lines()
      .some((t) => t === '调教中心的维持费和奴隶们的生活费花了$1819……'),
    '播报金额为截断值',
  );
});

test('维持费（RUNNING_COST）：最高难度档（FLAG:5 == 9）不扣款也不播报', async () => {
  const fixture = setup_chara_events();
  fixture.store.set('flag:5', 9);
  fixture.store.set('flag:10000', 60);
  fixture.store.set('flag:10004', 50000);
  fixture.store.set('exflag:4444', 50000);
  const { running_cost } = fixture.load_module('event/event-nextday');

  await running_cost();

  assert.equal(fixture.store.get('flag:10004'), 50000, '不扣款');
  assert.equal(fixture.store.get('exflag:4444'), 50000, '不动非作弊资金');
  assert.equal(fixture.text_lines().length, 0, '无输出');
});

test('偶尔归来（SOMETIMES_SHE_COMES_BACK）：死掉的奴隶回位，体力按上限十分之一', async () => {
  const fixture = setup_chara_events();
  fixture.store.set('callname:0:-1', '你');
  fixture.store.set('base:31:0', 0); // 体力 0 = 已死
  fixture.store.set('base:31:1', 0);
  fixture.store.set('maxbase:31:0', 300);
  fixture.store.set('maxbase:31:1', 200);
  const { sometimes_she_comes_back } = fixture.load_module(
    'event/event-nextday',
  );

  const returned = await sometimes_she_comes_back();

  assert.equal(returned, 1, '有人归来时返回 1（原作 D = 1 / RETURN 1）');
  assert.equal(fixture.store.get('base:31:0'), 30, '体力 = MAXBASE:0 / 10');
  assert.equal(fixture.store.get('base:31:1'), 200, '气力 = MAXBASE:1');
  const texts = fixture.text_lines();
  assert(
    texts.includes('早上，你睁开双眼，发现确实已经死掉了的温妮就站在面前。'),
    '开场播报（NAME:MASTER + SAVESTR:COUNT）',
  );
  assert(texts.includes('哎呦我的妈！葱油炒蛋花！'), '名台词');
  assert(texts.includes('温妮回归了……'), '归来播报');
});

test('偶尔归来（SOMETIMES_SHE_COMES_BACK）：一次只回一人、魔王不参与判定', async () => {
  const fixture = setup_chara_events();
  fixture.store.set('callname:0:-1', '你');
  join_slave_chara(fixture, 32, '艾米');
  fixture.store.set('base:31:0', 0);
  fixture.store.set('base:32:0', 0);
  fixture.store.set('maxbase:31:0', 300);
  fixture.store.set('maxbase:32:0', 400);
  const { sometimes_she_comes_back } = fixture.load_module(
    'event/event-nextday',
  );

  const returned = await sometimes_she_comes_back();

  assert.equal(
    returned,
    1,
    '两名死者也只回来一个（原作注释「一度に帰ってくるのは一人ずつ」）',
  );
  assert.equal(fixture.store.get('base:31:0'), 30, '先扫到的那一个回来');
  assert.equal(fixture.store.get('base:32:0'), 0, '后一个保持死亡');
});

test('偶尔归来（SOMETIMES_SHE_COMES_BACK）：无死者时返回 0 且无输出', async () => {
  const fixture = setup_chara_events();
  fixture.store.set('base:31:0', 100);
  const { sometimes_she_comes_back } = fixture.load_module(
    'event/event-nextday',
  );

  assert.equal(await sometimes_she_comes_back(), 0, '无人归来返回 0');
  assert.equal(fixture.text_lines().length, 0, '无输出');

  // 魔王自己「体力 0」也不在判定面内（原作 SIF COUNT == 0 → CONTINUE）
  const master_dead = setup_chara_events();
  master_dead.store.set('base:31:0', 100); // 奴隶活着，只有魔王「体力 0」
  master_dead.store.set('base:0:0', 0);
  const mod = master_dead.load_module('event/event-nextday');
  assert.equal(await mod.sometimes_she_comes_back(), 0, '魔王不参与判定');
  assert.equal(master_dead.store.get('base:0:0'), 0, '魔王不被复位');
});

test('魔王候补确定（MAOU_KOUHO）：净效果 = 最后一名持有 EX_TALENT:3 的角色', async () => {
  // [说明, 各角色是否候补（按加入序）, 期望继任魔王（undefined = 不写）]
  const cases = [
    ['无候补', [], undefined],
    ['单候补', [31], 31],
    ['双候补：好感度无用，靠后的胜出', [31, 32], 32],
    ['三候补：仍是最后一个', [31, 32, 33], 33],
  ];
  for (const [label, candidates, expected] of cases) {
    const fixture = setup_chara_events();
    for (const cid of [32, 33]) join_slave_chara(fixture, cid, `奴隶${cid}`);
    // 好感度（CFLAG:2）故意前高后低：上游判据的净效果与它无关
    for (const [i, cid] of candidates.entries()) {
      fixture.store.set(`ex_talent:${cid}:3`, 1);
      fixture.store.set(`cflag:${cid}:2`, 100 - i * 10);
    }
    const { maou_kouho } = fixture.load_module('event/event-nextday');

    maou_kouho();

    assert.equal(fixture.store.get('exflag:3'), expected, label);
  }
});

test('魔王候补确定（MAOU_KOUHO）：0 号位不参与（原作 FOR COUNT, 1, CHARANUM）', async () => {
  const fixture = setup_chara_events();
  fixture.store.set('ex_talent:0:3', 1);
  const { maou_kouho } = fixture.load_module('event/event-nextday');

  maou_kouho();

  // 0 号位只有自己是候补时，TEMP 停在初值 0，`SIF TEMP` 不成立 → 一个写都没有。
  // 这条同时钉住「魔王自己不当继任魔王」：0 号位恒在加入序最前，被跳过与否在
  // 现网角色序下不可区分（故不设变异条目），行为口径以本条为准。
  assert.equal(fixture.store.get('exflag:3'), undefined, '魔王自己不当候补');
});

test('魔王替换（MAOU_TENSHIN）：候补即玛奥（17）时走直接继位支', async () => {
  const fixture = setup_chara_events();
  join_slave_chara(fixture, 17, '玛奥');
  fixture.store.set('exflag:3', 17); // 继任魔王
  fixture.store.set('exflag:99', 200); // 威望
  fixture.store.set('maxbase:0:0', 300); // 旧魔王的潜力
  fixture.store.set('maxbase:0:1', 150);
  fixture.store.set('maxbase:17:0', 90);
  fixture.store.set('maxbase:17:1', 60);
  fixture.store.set('cflag:31:2', 50); // 好感度全员清零的靶
  fixture.store.set('cflag:17:2', 70);
  fixture.store.set('talent:31:85', 1); // 爱慕
  fixture.store.set('talent:17:86', 1); // 盲从
  const { event_maou_tenshin } = fixture.load_module('event/event-nextday');

  await event_maou_tenshin();

  assert.equal(fixture.store.get('exflag:0'), 17, '上届魔王指向旧魔王身体');
  assert.equal(fixture.store.get('exflag:99'), 170, '威望 -30');
  // 潜力部分转移（旧魔王 0 号的 1/3）后整表互换：魔王槽拿到玛奥的身体
  assert.equal(fixture.store.get('maxbase:0:0'), 190, '90 + 300/3');
  assert.equal(fixture.store.get('maxbase:0:1'), 110, '60 + 150/3');
  assert.equal(
    fixture.store.get('maxbase:17:0'),
    300,
    '旧魔王身体退到 17 号位',
  );
  assert.equal(fixture.store.get('ex_talent:0:200'), 1, '新魔王带【魔王】标记');
  assert.equal(fixture.store.get('ex_talent:0:3'), 0, '候补标记清掉');
  assert.equal(fixture.store.get('cflag:0:2'), 0, '好感度全员清零');
  assert.equal(
    fixture.store.get('cflag:31:2'),
    0,
    '好感度全员清零（含无关角色）',
  );
  assert.equal(fixture.store.get('talent:31:85'), 0, '【爱慕】清零');
  assert.equal(fixture.store.get('talent:17:86'), 0, '【盲从】清零');
});

test('魔王替换（MAOU_TENSHIN）：候补非玛奥时走灵魂转移支', async () => {
  const fixture = setup_chara_events();
  join_slave_chara(fixture, 17, '玛奥');
  fixture.store.set('exflag:3', 31); // 继任魔王 = 温妮（非 17）
  fixture.store.set('exflag:99', 200);
  fixture.store.set('callname:0:-2', '你');
  fixture.store.set('callname:31:-2', '温妮');
  fixture.override_math_random(() => 0);
  const { event_maou_tenshin } = fixture.load_module('event/event-nextday');
  try {
    await event_maou_tenshin();
  } finally {
    fixture.restore_math_random();
  }

  assert.equal(fixture.store.get('exflag:99'), 185, '威望 -15（比直接继位少）');
  assert.equal(fixture.store.get('ex_talent:31:3'), 0, '候补标记清掉');
  assert.equal(
    fixture.store.get('ex_talent:31:0'),
    1,
    '灵魂转移的错位素质已落（transfer_soul 真身跑过）',
  );
  assert.equal(
    fixture.store.get('exflag:0'),
    undefined,
    '灵魂转移支不记上届魔王（原作只在 IF 支写 EX_FLAG:0）',
  );
});

// —— #400（N16）四张跨边接线（TAX_GET / APHRODISIAC_ADDICT / SABBATH / SABBATH_DAY）——

test('税収接线（TAX_GET）：收税日走真身，非收税日一声不响', async () => {
  const taxed = setup_chara_events();
  taxed.store.set('flag:10002', 10); // DAY:2 = 10 → 收税日
  const taxed_mod = taxed.load_module('event/event-nextday');

  await taxed_mod.run_event_nextday();

  const taxed_texts = taxed.text_lines();
  assert(
    taxed_texts.includes(
      '今天宜收税，宜鬼畜，宜调教，宜激烈做爱；忌纯爱，忌良心发现……',
    ),
    '收税日必须打真身的开场行',
  );
  assert(!taxed_texts.some((t) => t.includes('@TAX_GET')), '占位行必须消失');

  const quiet = setup_chara_events();
  quiet.store.set('flag:10002', 11); // 非收税日
  const quiet_mod = quiet.load_module('event/event-nextday');

  await quiet_mod.run_event_nextday();

  assert(
    !quiet.text_lines().some((t) => t.includes('收税')),
    '非收税日不得有任何收税输出',
  );
});

test('媚药中毒接线（APHRODISIAC_ADDICT）：每 7 日一次的残留度衰减走真身', async () => {
  const fixture = setup_chara_events();
  fixture.store.set('flag:10000', 6); // DAY:0 = 6 → (6+1) % 7 === 0
  fixture.store.set('cflag:31:31', 3); // 体内媚药残留度
  const { run_event_nextday } = fixture.load_module('event/event-nextday');

  await run_event_nextday();

  assert.equal(fixture.store.get('cflag:31:31'), 2, '残留度 -1（真身跑过）');
  assert(
    !fixture.text_lines().some((t) => t.includes('@APHRODISIAC_ADDICT')),
    '占位行必须消失',
  );
});

test('安息日接线（SABBATH）：满月 15 日 + 法术 + 淫乱 的奴隶走真身', async () => {
  const fixture = setup_chara_events();
  fixture.store.set('flag:10002', 15); // DAY:2 = 15（满月）
  fixture.store.set('talent:31:242', 1); // 法术
  fixture.store.set('talent:31:76', 1); // 淫乱
  // cflag:1（角色状态）保持 0；cflag:0（陷落）留 0 → SABBATH_DAY 自顾自早退
  fixture.override_math_random(() => 0);
  const { run_event_nextday } = fixture.load_module('event/event-nextday');
  try {
    await run_event_nextday();
  } finally {
    fixture.restore_math_random();
  }

  const texts = fixture.text_lines();
  assert(
    texts.some((t) => t.includes('对地下城里的怪物们，进行了性施舍。')),
    'SABBATH 真身输出必须出现',
  );
  assert(!texts.some((t) => t.includes('@SABBATH')), '占位行必须消失');
});

test('安息日日程接线（SABBATH_DAY）：每 3 日的仪式走真身', async () => {
  const fixture = setup_chara_events();
  fixture.store.set('flag:10002', 12); // DAY:2 = 12 → 12 % 3 === 0
  fixture.store.set('talent:31:242', 1); // 法术
  fixture.store.set('cflag:31:0', 1); // 已陷落
  fixture.store.set('cflag:31:152', 40); // 信仰值 ≥ 40
  fixture.override_math_random(() => 0);
  const { run_event_nextday } = fixture.load_module('event/event-nextday');
  try {
    await run_event_nextday();
  } finally {
    fixture.restore_math_random();
  }

  const texts = fixture.text_lines();
  assert(
    texts.includes('祭坛前，信徒的女孩自慰了起来……'),
    'SABBATH_DAY 真身输出必须出现（user = 0 且无野良犬道具 → 泛用题材）',
  );
  assert(!texts.some((t) => t.includes('@SABBATH_DAY')), '占位行必须消失');
});

// —— #400（N16）晨间三事件：朝フェラ / おねしょ / 犬の散歩 ——

/** 朝フェラ的准入底线：欲望 4 / 侍奉精神 4 / 精液中毒 1（原作 :576） */
function seed_fellatio_candidate(fixture, cid, name) {
  join_slave_chara(fixture, cid, name);
  fixture.store.set(`abl:${cid}:11`, 4); // 欲望
  fixture.store.set(`abl:${cid}:16`, 4); // 侍奉精神
  fixture.store.set(`abl:${cid}:32`, 1); // 精液中毒（A 的基数）
  fixture.store.set(`base:${cid}:0`, 1000); // 非濒死
}

test('朝フェラ（MORNING_FELLATIO）：主人非男人/扶她时早退', async () => {
  const fixture = setup_chara_events();
  seed_fellatio_candidate(fixture, 31, '温妮');
  const { morning_fellatio } = fixture.load_module('event/event-nextday');

  assert.equal(await morning_fellatio(), 0, '早退返回 0');
  assert.equal(fixture.text_lines().length, 0, '无输出');
});

test('朝フェラ（MORNING_FELLATIO）：合格者为 0 时早退（F == 0）', async () => {
  const fixture = setup_chara_events();
  fixture.store.set('talent:0:122', 1); // 主人是男人
  seed_fellatio_candidate(fixture, 31, '温妮');
  fixture.store.set('base:31:0', 400); // 濒死 → 排除
  const { morning_fellatio } = fixture.load_module('event/event-nextday');

  assert.equal(await morning_fellatio(undefined), 0, '无人合格返回 0');
  assert.equal(fixture.text_lines().length, 0, '无输出');
});

test('朝フェラ（MORNING_FELLATIO）：七条排除守卫逐条挡住候选', async () => {
  // [说明, 该角色的覆盖项]
  const blockers = [
    ['已死（体力 0）', { 'base:31:0': 0 }],
    ['濒死（体力 500）', { 'base:31:0': 500 }],
    ['育儿中', { 'talent:31:154': 1 }],
    [
      '临月（预产日 -2 <= DAY 且妊娠）',
      { 'cflag:31:110': 2, 'talent:31:153': 1 },
    ],
    ['不在魔王房间（CFLAG:1）', { 'cflag:31:1': 1 }],
    ['已婚且不是魔王（CFLAG:601）', { 'cflag:31:601': 100 }],
    ['绝不侍奉', { 'talent:31:151': 1 }],
    ['反抗刻印', { 'mark:31:3': 1 }],
  ];
  for (const [label, override] of blockers) {
    const fixture = setup_chara_events();
    fixture.store.set('talent:0:122', 1);
    seed_fellatio_candidate(fixture, 31, '温妮');
    for (const [key, value] of Object.entries(override)) {
      fixture.store.set(key, value);
    }
    const { morning_fellatio } = fixture.load_module('event/event-nextday');

    assert.equal(
      await morning_fellatio(undefined),
      0,
      `${label}：必须整场早退`,
    );
    assert.equal(fixture.text_lines().length, 0, `${label}：无输出`);
  }
});

test('朝フェラ（MORNING_FELLATIO）：五项素质加减决定 A，A > 0 才算合格', async () => {
  // A = 精液中毒(ABL:32) + 不怕污臭(61) − 反感污臭(62) + 献身的(63) +
  //     淫乱(76) + 爱慕(85)；A <= 0 者不参与
  const fixture = setup_chara_events();
  fixture.store.set('talent:0:122', 1);
  seed_fellatio_candidate(fixture, 31, '温妮');
  fixture.store.set('abl:31:32', 1);
  fixture.store.set('talent:31:62', 1); // 反感污臭 −1 → A = 0
  const { morning_fellatio } = fixture.load_module('event/event-nextday');

  assert.equal(await morning_fellatio(undefined), 0, 'A = 0 不合格');
  assert.equal(fixture.text_lines().length, 0, '无输出');
});

test('朝フェラ（MORNING_FELLATIO）：当番由 RAND:F 决定，选中者拿到全部结算', async () => {
  const fixture = setup_chara_events();
  fixture.store.set('talent:0:122', 1);
  seed_fellatio_candidate(fixture, 31, '温妮');
  seed_fellatio_candidate(fixture, 32, '艾米');
  fixture.store.set('abl:31:32', 3); // A = 3
  fixture.store.set('abl:32:32', 1); // A = 1
  fixture.store.set('expname:22', '口交经验');
  fixture.store.set('expname:20', '精液经验');
  fixture.store.set('palamname:4', '恭顺');
  fixture.store.set('palamname:6', '屈服');
  fixture.store.set('palamname:7', '习得');
  fixture.store.set('cflag:0:152', 40); // 信仰值 ≥30：避免信仰衰减分支噪声
  const { morning_fellatio } = fixture.load_module('event/event-nextday');

  // RAND:F = RAND:2：0 = 温妮、1 = 艾米
  let picked = await morning_fellatio(() => 0);
  assert.equal(picked, 1, '有人侍奉时返回 1');
  assert.equal(fixture.store.get('exp:31:22'), 3, '温妮：EXP:22 += A(=3)');
  assert.equal(
    fixture.store.get('exp:31:20'),
    1,
    '温妮：EXP:20 += A/2(截断 1)',
  );
  assert.equal(fixture.store.get('juel:31:4'), 300, 'JUEL:4 += A*100');
  assert.equal(fixture.store.get('juel:31:6'), 90, 'JUEL:6 += A*30');
  assert.equal(fixture.store.get('juel:31:7'), 120, 'JUEL:7 += A*40');
  assert.equal(fixture.store.get('exp:32:22'), undefined, '未被选中的不写');
  assert.equal(fixture.store.get('flag:10005'), 31, 'TARGET 指向当番');
  const texts = fixture.text_lines();
  assert(texts.includes('早上，在温妮的口交中醒来。'), '当番播报');
  assert(texts.includes('口交经验＋3'), 'EXPNAME:22 ＋A');
  assert(texts.includes('精液经验＋1'), 'EXPNAME:20 ＋A/2');
  assert(
    texts.includes('温妮带着淫媚的笑容，抬起沾满精液的脸，进行了上午的问候。'),
  );
  assert(texts.includes('恭顺点数＋300'), 'PALAMNAME:4 ＋A*100');
  assert(texts.includes('屈服点数＋90'), 'PALAMNAME:6 ＋A*30');
  assert(texts.includes('习得点数＋120'), 'PALAMNAME:7 ＋A*40');

  const second = setup_chara_events();
  second.store.set('talent:0:122', 1);
  seed_fellatio_candidate(second, 31, '温妮');
  seed_fellatio_candidate(second, 32, '艾米');
  second.store.set('abl:31:32', 3);
  second.store.set('abl:32:32', 1);
  second.store.set('expname:22', '口交经验');
  second.store.set('expname:20', '精液经验');
  second.store.set('palamname:4', '恭顺');
  second.store.set('palamname:6', '屈服');
  second.store.set('palamname:7', '习得');
  const mod = second.load_module('event/event-nextday');

  await mod.morning_fellatio(() => 1); // E = 1 → 第一个合格者被扣到 0 后轮到第二个
  assert.equal(second.store.get('exp:32:22'), 1, '艾米被选中');
  assert.equal(second.store.get('exp:31:22'), undefined, '温妮落选');
});

test('朝フェラ（MORNING_FELLATIO）：SELF_KOJO 以事件码 3 在调教外调用', async () => {
  const fixture = setup_chara_events();
  fixture.store.set('talent:0:122', 1);
  seed_fellatio_candidate(fixture, 31, '温妮');
  fixture.store.set('expname:22', '口交经验');
  fixture.store.set('expname:20', '精液经验');
  fixture.store.set('palamname:4', '恭顺');
  fixture.store.set('palamname:6', '屈服');
  fixture.store.set('palamname:7', '习得');
  fixture.store.set('flag:7', 1); // SELF_KOJO 的总开关
  const { morning_fellatio } = fixture.load_module('event/event-nextday');
  // 口上本身由 kojo 域的单测覆盖；这里只钉「以事件码 3、在调教外」这一处接线
  const { game } = fixture.load_module('facade/game');
  const events = [];
  const original = game.train.with_self_kojo_event;
  game.train.with_self_kojo_event = async (event, callback) => {
    events.push(event);
    return callback();
  };
  try {
    await morning_fellatio(() => 0);
  } finally {
    game.train.with_self_kojo_event = original;
  }

  assert.deepEqual(events, [3], 'TFLAG:13 = 3（朝フェラ口上）');
});

/** 依次吐出给定值的确定随机源（序列耗尽回落 0；chara-body.test.js 同款） */
function seq(values) {
  const queue = [...values];
  return () => (queue.length > 0 ? queue.shift() : 0);
}

/** 尿床候选的底线：漏尿癖（TALENT:57）+ 活着 + 放尿经验 30（EXP/10 = 3） */
function seed_onesho_candidate(fixture, cid, name) {
  join_slave_chara(fixture, cid, name);
  fixture.store.set(`talent:${cid}:57`, 1);
  fixture.store.set(`exp:${cid}:31`, 30);
  fixture.store.set(`base:${cid}:0`, 1000);
  fixture.store.set('callname:0:-2', '你');
  for (const [n, v] of [
    [4, '恭顺'],
    [5, '欲情'],
    [8, '耻情'],
    [9, '苦痛'],
  ]) {
    fixture.store.set(`palamname:${n}`, v);
  }
  fixture.store.set('expname:10', '自慰经验');
  fixture.store.set('expname:31', '放尿经验');
}

test('尿床（ONESHO）：门槛边界与【幼稚】倍率（RAND:12 <= 放尿经验/10 + 幼稚×2）', async () => {
  // [说明, 放尿经验, 幼稚, rand 值, 是否触发]
  const cases = [
    ['刚好压线（3 <= 3）', 30, 0, 3, true],
    ['超一线（4 > 3）', 30, 0, 4, false],
    ['幼稚×2 抬到 5', 30, 1, 5, true],
    ['幼稚×2 后仍超线', 30, 1, 6, false],
  ];
  for (const [label, exp31, childish, roll, expected] of cases) {
    const fixture = setup_chara_events();
    seed_onesho_candidate(fixture, 31, '温妮');
    fixture.store.set('exp:31:31', exp31);
    fixture.store.set('talent:31:132', childish);
    const { onesho } = fixture.load_module('event/event-nextday');

    await onesho(seq([roll]));

    assert.equal(
      fixture.store.get('exp:31:31'),
      expected ? exp31 + 1 : exp31,
      `${label}：触发与否看 EXP:31 有没有 +1`,
    );
  }
});

test('尿床（ONESHO）：放尿经验的除法截断（39/10 = 3，不是 3.9）', async () => {
  const cases = [
    ['经验除法截断：3 压线触发', 3, true],
    ['经验除法截断：4 越线不触发', 4, false],
  ];
  for (const [label, roll, expected] of cases) {
    const fixture = setup_chara_events();
    seed_onesho_candidate(fixture, 31, '温妮');
    fixture.store.set('exp:31:31', 39); // 39 / 10 = 3（整数除法）
    const { onesho } = fixture.load_module('event/event-nextday');

    await onesho(seq([roll]));

    assert.equal(fixture.store.get('exp:31:31'), expected ? 40 : 39, label);
  }
});

test('尿床（ONESHO）：未持【漏尿癖】者一次随机都不掷', async () => {
  const fixture = setup_chara_events();
  seed_onesho_candidate(fixture, 31, '温妮');
  fixture.store.set('talent:31:57', 0);
  const rolls = [];
  const { onesho } = fixture.load_module('event/event-nextday');

  await onesho((n) => {
    rolls.push(n);
    return 0;
  });

  assert.deepEqual(rolls, [], '未持【漏尿癖】时不得掷 RAND');
  assert.equal(fixture.text_lines().length, 0, '无输出');
});

test('尿床（ONESHO）：已死者不参与（体力 0 跳过，但不消耗播报）', async () => {
  const fixture = setup_chara_events();
  seed_onesho_candidate(fixture, 31, '温妮');
  fixture.store.set('base:31:0', 0);
  const { onesho } = fixture.load_module('event/event-nextday');

  assert.equal(await onesho(seq([0])), 1, '恒返回 1（原作 :806）');
  assert.equal(fixture.store.get('exp:31:31'), 30, '不结算');
  assert.equal(fixture.text_lines().length, 0, '无输出');
});

test('尿床（ONESHO）：无导管支——放尿经验 +1、TARGET 换手、无人围观时只播报', async () => {
  const fixture = setup_chara_events();
  seed_onesho_candidate(fixture, 31, '温妮');
  fixture.store.set('cflag:31:1', 1); // 不在魔王房间 → 报告支整段跳过
  // 围观门槛设满：去掉这个 continue 就会立刻冒出报告行（变异可观测的靶）
  fixture.store.set('abl:31:17', 8);
  const { onesho } = fixture.load_module('event/event-nextday');

  await onesho(seq([0]));

  assert.equal(fixture.store.get('exp:31:31'), 31, 'EXP:31 += 1');
  assert.equal(
    fixture.store.get('flag:10005'),
    31,
    'TARGET = COUNT（洗濯两连的入参）',
  );
  const texts = fixture.text_lines();
  assert(texts.includes('温妮尿床了……'), '尿床播报');
  assert(texts.includes('放尿经验＋1'), 'EXPNAME:31 ＋1');
  assert(
    !texts.some((t) => t.includes('报告')),
    '不在魔王房间时不得出现报告支',
  );
});

test('尿床（ONESHO）：无导管支的报告分岔——围观门槛 8 与人数门槛 3', async () => {
  // [露+抖M, 是否报告]
  const thresholds = [
    [7, false],
    [8, true],
  ];
  for (const [sum, reports] of thresholds) {
    const fixture = setup_chara_events();
    seed_onesho_candidate(fixture, 31, '温妮');
    fixture.store.set('abl:31:17', 4);
    fixture.store.set('abl:31:21', sum - 4);
    const { onesho } = fixture.load_module('event/event-nextday');

    await onesho(seq([0]));

    assert.equal(
      fixture.store.get('juel:31:8'),
      reports ? 1000 : undefined,
      `露+抖M = ${sum} 时的 JUEL:8`,
    );
    assert.equal(
      fixture.text_lines().includes('来向你报告了。'),
      reports,
      `露+抖M = ${sum} 时的报告行（CHARANUM = 2 < 3）`,
    );
  }

  // CHARANUM >= 3 → 换文案
  const crowded = setup_chara_events();
  seed_onesho_candidate(crowded, 31, '温妮');
  join_slave_chara(crowded, 32, '艾米');
  crowded.store.set('abl:31:17', 4);
  crowded.store.set('abl:31:21', 4);
  const mod = crowded.load_module('event/event-nextday');

  await mod.onesho(seq([0]));

  const texts = crowded.text_lines();
  assert(texts.includes('在早餐桌上向大家坦白了。'), 'CHARANUM ≥ 3 的文案');
  assert(
    texts.includes('关于自己尿床的事温妮'),
    'PRINTFORM（不换行）的报告前缀',
  );
  assert(texts.includes('耻情点数＋1000'), 'PALAMNAME:8 ＋1000');
  assert.equal(crowded.store.get('juel:31:8'), 1000, 'JUEL:8 += 1000');
});

test('尿床（ONESHO）：导管支的准入四守卫（服装类型 / 位 64 / 着衣开关 / 状态 < 2）', async () => {
  // [说明, 覆盖项, 是否走导管支]
  const cases = [
    ['服装 99 + 位 64 + 着衣开', {}, true],
    ['服装 98 同样认', { 'cflag:31:42': 98 }, true],
    ['服装 42 = 97 不认', { 'cflag:31:42': 97 }, false],
    ['位 64 未置', { 'cflag:31:40': 0 }, false],
    ['着衣开关关（FLAG:37 = 0）', { 'flag:37': 0 }, false],
    ['角色状态 ≥ 2', { 'cflag:31:1': 2 }, false],
  ];
  for (const [label, override, catheter] of cases) {
    const fixture = setup_chara_events();
    seed_onesho_candidate(fixture, 31, '温妮');
    fixture.store.set('cflag:31:42', 99);
    fixture.store.set('cflag:31:40', 64);
    fixture.store.set('flag:37', 1);
    fixture.store.set('cflag:31:1', 0);
    fixture.store.set('abl:31:10', 1); // 顺从 < 3 → 一档
    for (const [key, value] of Object.entries(override)) {
      fixture.store.set(key, value);
    }
    const { onesho } = fixture.load_module('event/event-nextday');

    await onesho(seq([0, 0]));

    assert.equal(
      fixture.text_lines().some((t) => t.includes('尿道导管')),
      catheter,
      label,
    );
    assert.equal(
      fixture.store.get('exp:31:31'),
      catheter ? 30 : 31,
      `${label}：导管支不写放尿经验`,
    );
  }
});

test('尿床（ONESHO）：导管一档（顺从 < 3）的四选一', async () => {
  // [RAND:4, 期望 juel 键, 期望值, 期望 PALAMNAME]
  const cases = [
    [0, 'juel:0:8', 10, '耻情点数＋10'],
    [1, 'juel:0:8', 20, '耻情点数＋20'],
    [2, 'juel:0:9', 10, '苦痛点数＋10'],
    [3, 'juel:0:9', 20, '苦痛点数＋20'],
  ];
  for (const [roll, key, value, line] of cases) {
    const fixture = setup_chara_events();
    seed_onesho_candidate(fixture, 31, '温妮');
    fixture.store.set('cflag:31:42', 99);
    fixture.store.set('cflag:31:40', 64);
    fixture.store.set('flag:37', 1);
    fixture.store.set('cflag:31:1', 0);
    fixture.store.set('abl:31:10', 1);
    const { onesho } = fixture.load_module('event/event-nextday');

    await onesho(seq([0, roll]));

    // 原作此处写 `JUEL:L:8`——L 在本函数内无赋值，Emuera 全局取初值 0
    // （见文件头「L 的初值」；不改成 COUNT，那是在给原作改行为）
    assert.equal(fixture.store.get(key), value, `RAND:4 = ${roll}`);
    const texts = fixture.text_lines();
    assert(
      texts.includes('装上了尿道导管，一晚上，毫无察觉的漏尿了的温妮，'),
      '一档开场',
    );
    assert(
      texts.includes(
        '不可思议的并不会十分肮脏，但实在羞愧难当，穿好衣服后对你愤怒的瞪了一眼。',
      ),
      '一档第二行（CALLNAME:MASTER）',
    );
    assert(texts.includes(line), `PALAMNAME 行：${line}`);
  }
});

test('尿床（ONESHO）：导管二档（3 ≤ 顺从 < 6）只播报不结算', async () => {
  for (const loyalty of [3, 5]) {
    const fixture = setup_chara_events();
    seed_onesho_candidate(fixture, 31, '温妮');
    fixture.store.set('cflag:31:42', 99);
    fixture.store.set('cflag:31:40', 64);
    fixture.store.set('flag:37', 1);
    fixture.store.set('cflag:31:1', 0);
    fixture.store.set('abl:31:10', loyalty);
    const { onesho } = fixture.load_module('event/event-nextday');

    await onesho(seq([0, 0]));

    const texts = fixture.text_lines();
    assert(
      texts.includes('装上了尿道导管，一不小心的漏尿了，并察觉到了的温妮，'),
      `二档开场（顺从 ${loyalty}）`,
    );
    assert(
      texts.includes('发现并没弄脏什么东西，于是便不在意了。'),
      '二档第二行',
    );
    assert(
      !fixture.var_writes.some((w) => w.name.startsWith('juel:')),
      '二档不写任何珠',
    );
  }
});

test('尿床（ONESHO）：导管三档（顺从 ≥ 6）的时间追加与 RAND:3', async () => {
  // [说明, 覆盖项, 期望 EXP:10, 期望 JUEL:5, 期望 JUEL:8, 期望 JUEL:0:4, RAND:3]
  const cases = [
    ['无追加素质', {}, undefined, undefined, undefined, 10, 0],
    [
      '有追加素质但无【容易自慰】',
      { 'talent:31:72': 1 },
      undefined,
      undefined,
      300,
      20,
      1,
    ],
    [
      '追加素质 + 【容易自慰】',
      { 'talent:31:72': 1, 'talent:31:60': 1 },
      1,
      800,
      800,
      30,
      2,
    ],
    [
      '追加素质取【露出狂】',
      { 'talent:31:89': 1 },
      undefined,
      undefined,
      300,
      30,
      2,
    ],
  ];
  for (const [label, override, exp10, juel5, juel8, juel0_4, roll] of cases) {
    const fixture = setup_chara_events();
    seed_onesho_candidate(fixture, 31, '温妮');
    fixture.store.set('cflag:31:42', 98);
    fixture.store.set('cflag:31:40', 64);
    fixture.store.set('flag:37', 1);
    fixture.store.set('cflag:31:1', 0);
    fixture.store.set('abl:31:10', 6);
    for (const [key, value] of Object.entries(override)) {
      fixture.store.set(key, value);
    }
    const { onesho } = fixture.load_module('event/event-nextday');

    // 随机序：触发(0) → RAND:3（追加素质支本身不掷）
    await onesho(seq([0, roll]));

    // 三档入口先行：档位判定错位（顺从门槛改错）会先在这里红
    const texts = fixture.text_lines();
    assert(
      texts.includes('温妮因为装上了尿道导管，一晚上都睡得非常好，'),
      `${label}：顺从 ≥ 6 才走三档开场`,
    );
    assert.equal(fixture.store.get('exp:31:10'), exp10, `${label}：EXP:10`);
    assert.equal(fixture.store.get('juel:31:5'), juel5, `${label}：JUEL:5`);
    assert.equal(fixture.store.get('juel:31:8'), juel8, `${label}：JUEL:8`);
    assert.equal(
      fixture.store.get('juel:0:4'),
      juel0_4,
      `${label}：RAND:3 = ${roll} → JUEL:L:4`,
    );
  }
});

/** 遛狗候选的底线：可调教（CFLAG:0 = 陷落、CFLAG:1 = 0）的奴隶 */
function seed_dog_walk_candidate(fixture, cid, name) {
  join_slave_chara(fixture, cid, name);
  fixture.store.set(`cflag:${cid}:0`, 1); // 已陷落
  fixture.store.set(`cflag:${cid}:1`, 0); // 待机
  fixture.store.set(`base:${cid}:0`, 1000);
  fixture.store.set('callname:0:-1', '你');
  fixture.store.set('palamname:0', '精力');
  fixture.store.set('palamname:1', '私处');
  fixture.store.set('palamname:5', '欲情');
  fixture.store.set('palamname:8', '耻情');
  fixture.store.set('expname:0', '私处经验');
  fixture.store.set('expname:5', '性交经验');
  fixture.store.set('expname:20', '精液经验');
  fixture.store.set('expname:22', '口交经验');
  fixture.store.set('expname:56', '兽奸经验');
}

test('遛狗（DOG_WALK）：没有【野良犬】道具时整场早退', async () => {
  const fixture = setup_chara_events();
  seed_dog_walk_candidate(fixture, 31, '温妮');
  const { dog_walk } = fixture.load_module('event/event-nextday');

  assert.equal(await dog_walk(() => 0), 0, '无道具返回 0');
  assert.equal(fixture.text_lines().length, 0, '无输出');

  // NOITEM 非 0（道具持有检查的共形放宽支）时照走
  const with_noitem = setup_chara_events();
  seed_dog_walk_candidate(with_noitem, 31, '温妮');
  with_noitem.store.set('noitem:0', 1);
  const mod = with_noitem.load_module('event/event-nextday');

  await mod.dog_walk(() => 0);
  assert.notEqual(with_noitem.text_lines().length, 0, 'NOITEM 非 0 时不再早退');
});

test('遛狗（DOG_WALK）：只有魔王一人时自己带狗散步并早退', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  fixture.store.set('item:22', 1);
  const { dog_walk } = fixture.load_module('event/event-nextday');

  assert.equal(await dog_walk(() => 0), 0, 'CHARANUM - 1 == 0 → 返回 0');
  const texts = fixture.text_lines();
  assert(texts.includes('你带了野狗去散步。'), '魔王自己散步的播报');
  assert.equal(texts.length, 2, '空行 + 播报两行（原作 PRINTL + PRINTFORMW）');
});

test('遛狗（DOG_WALK）：当番 = RAND:(CHARANUM-1) 的下标，三条守卫退回魔王', async () => {
  // 加入序下标 0..CHARANUM-2（**最后一个角色永远掷不到**，上游如此）；
  // 命中者不满足「已陷落且待机」就退回 0 号位
  // [说明, 覆盖项, RAND 值, 有散步行的一方（null = 谁都没有）]
  const cases = [
    ['合格奴隶（下标 1）', {}, 1, '温妮'],
    ['掷到下标 0 = 魔王自己（:1405 的 IF 让魔王没有散步行）', {}, 0, null],
    ['未陷落（CFLAG:0 = 0）退回魔王', { 'cflag:31:0': 0 }, 1, null],
    ['不在待机（CFLAG:1 != 0）退回魔王', { 'cflag:31:1': 1 }, 1, null],
    ['下标 2 掷不到（最后一个角色）', {}, 1, '温妮'],
  ];
  for (const [label, override, roll, expected] of cases) {
    const fixture = setup_chara_events();
    fixture.store.set('item:22', 1);
    seed_dog_walk_candidate(fixture, 31, '温妮');
    join_slave_chara(fixture, 32, '艾米'); // 加入序尾位：RAND 的排除项
    for (const [key, value] of Object.entries(override)) {
      fixture.store.set(key, value);
    }
    const { dog_walk } = fixture.load_module('event/event-nextday');

    assert.equal(await dog_walk(() => roll), 1, `${label}：恒返回 1`);
    const texts = fixture.text_lines();
    // 散步行以服装串起头（PRINT_CLOTHTYPE 的出口是串），只做子串断言
    for (const who of ['温妮', '你', '艾米']) {
      assert.equal(
        texts.some((t) => t.includes(`${who}和野狗一起散了散步。`)),
        who === expected,
        `${label}：散步者是否为${who}`,
      );
    }
  }
});

test('遛狗（DOG_WALK）：PLAY（兴奋度）的四项叠加与 OPEN（露出）的三项', async () => {
  // PLAY = 兽奸中毒(ABL:39) + 牝犬(136)×2 + [动物耳(124) 且 PLAY>0] + [喜欢的东西(317)==12 且 PLAY>0]
  // OPEN = -2 + 露出癖(ABL:17) + 露出狂(89) + 爱表现(28)
  // [说明, 覆盖项, 期望 BE 支（PLAY>0 且 NO_SEX 成立与否）]
  const cases = [
    ['全零：PLAY = 0 且 OPEN < 0 → 只散步 + WAIT', {}, false],
    [
      '只持动物耳：PLAY 仍为 0（:1388 的 PLAY > 0 前置守卫）',
      { 'talent:31:124': 1 },
      false,
    ],
    ['兽奸中毒 1 → PLAY > 0', { 'abl:31:39': 1, 'abl:31:17': 3 }, true],
    ['牝犬 ×2', { 'talent:31:136': 1, 'abl:31:17': 3 }, true],
    [
      '动物耳与「喜欢动物」各 +1（PLAY > 0 才成立）',
      {
        'abl:31:39': 1,
        'talent:31:124': 1,
        'talent:31:317': 12,
        'abl:31:17': 3,
      },
      true,
    ],
  ];
  for (const [label, override, breeds] of cases) {
    const fixture = setup_chara_events();
    fixture.store.set('item:22', 1);
    seed_dog_walk_candidate(fixture, 31, '温妮');
    join_slave_chara(fixture, 32, '艾米');
    for (const [key, value] of Object.entries(override)) {
      fixture.store.set(key, value);
    }
    const { dog_walk } = fixture.load_module('event/event-nextday');

    await dog_walk(() => 1);

    assert.equal(
      fixture.store.get('exp:31:56') !== undefined,
      breeds,
      `${label}：是否进入交尾/口交支`,
    );
    if (!breeds) {
      assert(
        !fixture.var_writes.some((w) => w.name.startsWith('juel:')),
        `${label}：PLAY = 0 时一个珠都不写`,
      );
    }
  }
});

test('遛狗（DOG_WALK）：PLAY 计算的数值（动物耳只在 PLAY > 0 时加）', async () => {
  const fixture = setup_chara_events();
  fixture.store.set('item:22', 1);
  seed_dog_walk_candidate(fixture, 31, '温妮');
  join_slave_chara(fixture, 32, '艾米');
  fixture.store.set('abl:31:39', 2); // 兽奸中毒
  fixture.store.set('talent:31:136', 1); // 牝犬 +2
  fixture.store.set('talent:31:124', 1); // 动物耳 +1
  fixture.store.set('talent:31:317', 12); // 喜欢动物 +1
  fixture.store.set('abl:31:17', 3); // 露出癖 → OPEN = 1
  const { dog_walk } = fixture.load_module('event/event-nextday');

  await dog_walk(() => 1);

  // PLAY = 2 + 2 + 1 + 1 = 6；交尾支：JUEL:0/5 += 5*PLAY = 30、JUEL:1 += 4*PLAY = 24
  assert.equal(fixture.store.get('juel:31:0'), 30, 'JUEL:0 += 5*PLAY');
  assert.equal(fixture.store.get('juel:31:5'), 30, 'JUEL:5 += 5*PLAY');
  assert.equal(fixture.store.get('juel:31:1'), 24, 'JUEL:1 += 4*PLAY');
  assert.equal(
    fixture.store.get('juel:31:8'),
    30,
    'OPEN > 0 → JUEL:8 += 5*PLAY',
  );
  assert.equal(fixture.store.get('exp:31:56'), 1, 'EXP:56 += 1');
  assert.equal(fixture.store.get('exp:31:5'), 1, 'EXP:5 += 1');
  assert.equal(fixture.store.get('exp:31:0'), 1, 'EXP:0 += 1');
  const texts = fixture.text_lines();
  assert(texts.includes('精力点数+30'), 'PALAMNAME:0 点数+{5*PLAY}');
  assert(texts.includes('欲情点数+30'), 'PALAMNAME:5 点数+{5*PLAY}');
  assert(texts.includes('私处之珠+24'), 'PALAMNAME:1 之珠+{4*PLAY}');
  assert(texts.includes('耻情点数+30'), 'PALAMNAME:8 点数+{5*PLAY}');
  // PRINTFORML 收前一行 + PRINTFORM/PRINTFORML 拼后一行（原作 :1416-1419）
  assert(texts.includes('温妮在散步途中无可忍耐地发情了，'), '发情行');
  assert(
    texts.includes('一边向路人展示着痴态，一边引诱着野狗进行了交配。'),
    '露出（OPEN > 0）才有的中段拼行',
  );
});

test('遛狗（DOG_WALK）：NO_SEX 三支（处女 / 私处封印 / 贞操带）走口交支', async () => {
  // [说明, 覆盖项]
  const cases = [
    ['处女', { 'talent:31:0': 1 }],
    ['私处封印', { 'talent:31:273': 1 }],
    [
      '贞操带（42 == 79 且位 64 且着衣开）',
      { 'cflag:31:42': 79, 'cflag:31:40': 64, 'flag:37': 1 },
    ],
  ];
  for (const [label, override] of cases) {
    const fixture = setup_chara_events();
    fixture.store.set('item:22', 1);
    seed_dog_walk_candidate(fixture, 31, '温妮');
    join_slave_chara(fixture, 32, '艾米');
    fixture.store.set('abl:31:39', 1); // PLAY = 1
    fixture.store.set('abl:31:17', 3); // OPEN = 1
    for (const [key, value] of Object.entries(override)) {
      fixture.store.set(key, value);
    }
    const { dog_walk } = fixture.load_module('event/event-nextday');

    await dog_walk(() => 1);

    assert.equal(fixture.store.get('exp:31:22'), 1, `${label}：口交经验 +1`);
    assert.equal(fixture.store.get('exp:31:20'), 1, `${label}：精液经验 +1`);
    assert.equal(
      fixture.store.get('juel:31:5'),
      5,
      `${label}：JUEL:5 += 5*PLAY`,
    );
    assert.equal(
      fixture.store.get('juel:31:0'),
      undefined,
      `${label}：不写私处珠`,
    );
    const texts = fixture.text_lines();
    assert(
      texts.includes('一边向路人展示着痴态，一边帮野狗口交起来了。'),
      `${label}：口交支拼行`,
    );
  }
});

test('遛狗（DOG_WALK）：散步行拼装（服装 + 的 + 名字 + [项圈] + 和野狗一起逛）与 TARGET 还原', async () => {
  const fixture = setup_chara_events();
  fixture.store.set('item:22', 1);
  seed_dog_walk_candidate(fixture, 31, '温妮');
  join_slave_chara(fixture, 32, '艾米');
  fixture.store.set('abl:31:39', 1); // PLAY > 0 → 拼「戴上项圈」
  fixture.store.set('cflag:31:41', 1); // 上衣类型（clothtype 表 1 = 全裸系）
  fixture.store.set('flag:10005', -1); // TARGET 记为 -1，验证尾部还原
  const { dog_walk } = fixture.load_module('event/event-nextday');

  await dog_walk(() => 1);

  const { clothtype_text } = fixture.load_module('page/page-clothtype');
  const texts = fixture.text_lines();
  // 整行拼装：服装串（PRINT_CLOTHTYPE 的出口）+ 的 + 名字 + 项圈中段 + 结尾
  assert(
    texts.includes(
      `${clothtype_text(31)}的温妮好像自己散步似地，戴上项圈，四脚爬爬地出去了。和野狗一起散了散步。`,
    ),
    'PLAY > 0 时的完整散步行（含项圈中段）',
  );
  assert.equal(
    fixture.store.get('flag:10005'),
    -1,
    'TARGET 还原为 SAVE_TARGET',
  );
});

test('遛狗（DOG_WALK）：露出基准 -2 与三项加成决定耻情支是否成立', async () => {
  // OPEN = -2 + 露出癖(ABL:17) + 露出狂(89) + 爱表现(28)；只有 OPEN > 0 才写耻情
  // [说明, 覆盖项, 是否走耻情支]
  const cases = [
    ['裸基准（OPEN = -2）', {}, false],
    ['露出癖 1（OPEN = -1）', { 'abl:31:17': 1 }, false],
    ['露出癖 2（OPEN = 0，边界仍不走）', { 'abl:31:17': 2 }, false],
    [
      '露出癖 2 + 露出狂（OPEN = 1）',
      { 'abl:31:17': 2, 'talent:31:89': 1 },
      true,
    ],
    [
      '露出癖 2 + 爱表现（OPEN = 1）',
      { 'abl:31:17': 2, 'talent:31:28': 1 },
      true,
    ],
  ];
  for (const [label, override, shames] of cases) {
    const fixture = setup_chara_events();
    fixture.store.set('item:22', 1);
    seed_dog_walk_candidate(fixture, 31, '温妮');
    join_slave_chara(fixture, 32, '艾米');
    fixture.store.set('abl:31:39', 1); // PLAY = 1
    for (const [key, value] of Object.entries(override)) {
      fixture.store.set(key, value);
    }
    const { dog_walk } = fixture.load_module('event/event-nextday');

    await dog_walk(() => 1);

    assert.equal(
      fixture.store.get('juel:31:8'),
      shames ? 5 : undefined,
      `${label}：是否写耻情珠`,
    );
    assert.equal(
      fixture.text_lines().some((t) => t.includes('耻情点数')),
      shames,
      `${label}：是否有耻情播报`,
    );
  }
});

/** 处女献上的底线：当前目标 + 各守卫全过（原作 :813-864 的十条） */
function seed_virgin_offer(fixture, cid = 31) {
  join_slave_chara(fixture, cid, '温妮');
  fixture.store.set('talent:0:122', 1); // 主人是男人
  fixture.store.set('talentname:0', '处女');
  fixture.store.set('talentname:273', '私处封印');
  fixture.store.set('talentname:57', '漏尿癖');
  fixture.store.set('ablname:10', '顺从');
  fixture.store.set('expname:0', '私处经验');
  fixture.store.set('expname:5', '性交经验');
  fixture.store.set('expname:20', '精液经验');
  fixture.store.set('expname:22', '口交经验');
  fixture.store.set('palamname:1', '私处');
  fixture.store.set('palamname:4', '恭顺');
  fixture.store.set('palamname:5', '欲情');
  fixture.store.set('palamname:6', '屈服');
  fixture.store.set('palamname:9', '苦痛');
  fixture.store.set('flag:10005', cid); // TARGET
  fixture.store.set(`talent:${cid}:0`, 1); // 处女
  fixture.store.set(`talent:${cid}:85`, 1); // 爱
  fixture.store.set(`abl:${cid}:10`, 6); // 顺从（6 档：爱 → +3，S 过线）
  fixture.store.set(`abl:${cid}:11`, 5); // 欲望
  fixture.store.set(`abl:${cid}:16`, 5); // 侍奉精神
  fixture.store.set(`base:${cid}:0`, 1000); // 非濒死
  fixture.store.set(`cflag:${cid}:1`, 0); // 在魔王房间
  fixture.store.set('callname:0:-2', '你');
}

test('处女献上（OFFERVIRGIN_CHECK）：十条准入守卫逐条挡住', async () => {
  // [说明, 覆盖项]
  const blockers = [
    ['处女献上被禁（FLAG:38 <= -1）', { 'flag:38': -1 }],
    ['目标为空（TARGET < 0）', { 'flag:10005': -1 }],
    ['绝不侍奉', { 'talent:31:151': 1 }],
    ['未熟', { 'talent:31:135': 1 }],
    ['非处女', { 'talent:31:0': 0 }],
    ['男人', { 'talent:31:122': 1 }],
    ['主人既非男人也非扶她', { 'talent:0:122': 0 }],
    ['既无爱也无淫乱', { 'talent:31:85': 0 }],
    ['顺+欲+侍奉 ≤ 10', { 'abl:31:10': 4, 'abl:31:11': 3, 'abl:31:16': 3 }],
    ['濒死（体力 < 500）', { 'base:31:0': 400 }],
    ['处女膜已再生（CFLAG:71 > 0）', { 'cflag:31:71': 1 }],
    [
      '贞操带且钥匙未落到手上',
      { 'cflag:31:42': 79, 'cflag:31:49': 0, 'cflag:31:50': 0 },
    ],
    ['不在魔王房间（CFLAG:1 非 0/1）', { 'cflag:31:1': 2 }],
    [
      '一次限定的已发生（FLAG:38 == 0 且 CFLAG:62）',
      { 'flag:38': 0, 'cflag:31:62': 1 },
    ],
  ];
  for (const [label, override] of blockers) {
    const fixture = setup_chara_events();
    seed_virgin_offer(fixture);
    for (const [key, value] of Object.entries(override)) {
      fixture.store.set(key, value);
    }
    const { offervirgin_check } = fixture.load_module('event/event-nextday');

    assert.equal(
      await offervirgin_check(() => 0),
      0,
      `${label}：必须早退返回 0`,
    );
    assert.equal(fixture.text_lines().length, 0, `${label}：无输出`);
  }
});

test('处女献上（OFFERVIRGIN_CHECK）：顺+欲+侍奉的门槛是「≤ 10 挡住」', async () => {
  // [顺+欲+侍奉, 是否过线]
  const cases = [
    [10, false],
    [11, true],
  ];
  for (const [sum, passes] of cases) {
    const fixture = setup_chara_events();
    seed_virgin_offer(fixture);
    fixture.store.set('abl:31:10', sum - 6); // 余下由欲望 3 / 侍奉 3 补足
    fixture.store.set('abl:31:11', 3);
    fixture.store.set('abl:31:16', 3);
    fixture.set_inputs(1);
    const { offervirgin_check } = fixture.load_module('event/event-nextday');

    // 顺从 ≤3 → 爱行不加值：S = -RAND:3，只有 -0 才过线
    await offervirgin_check(() => 0);

    assert.equal(
      fixture.text_lines().some((t) => t.includes('要夺取温妮的处女吗？')),
      passes,
      `顺+欲+侍奉 = ${sum}`,
    );
  }
});

test('处女献上（OFFERVIRGIN_CHECK）：判定变量 S 的叠加（爱/淫乱各行 + 欲望档）', async () => {
  // S = -RAND:3；爱（顺从档）与淫乱（欲望档）各加 1/2/3；S <= 0 即早退
  // [说明, 覆盖项, RAND:3, 期望是否通过]（基线 S = -RAND:3 + 各行加值）
  const cases = [
    ['爱行 3 档不加值 → S = -1 早退', { 'abl:31:10': 3 }, 1, false],
    ['爱行 4 档 +1 与 -1 相抵 → S = 0 早退', { 'abl:31:10': 4 }, 1, false],
    ['爱行 5 档 +2 → S = 1 通过', { 'abl:31:10': 5 }, 1, true],
    ['爱行 6 档 +3 → S = 2 通过', { 'abl:31:10': 6 }, 1, true],
    [
      '淫乱行 4 档 +1（无爱，顺从 3 档）→ S = 0 早退',
      { 'talent:31:85': 0, 'talent:31:76': 1, 'abl:31:10': 3, 'abl:31:11': 4 },
      1,
      false,
    ],
    [
      '淫乱行 5 档 +2 与 -2 相抵 → S = 0 早退',
      { 'talent:31:85': 0, 'talent:31:76': 1, 'abl:31:10': 3, 'abl:31:11': 5 },
      2,
      false,
    ],
    [
      '爱行 4 档与淫乱行 4 档并加（+1+1）→ S = 1 通过',
      { 'abl:31:10': 4, 'talent:31:76': 1, 'abl:31:11': 4 },
      1,
      true,
    ],
    [
      '淫乱行 5 档 +2 抬过线 → S = 1 通过',
      { 'talent:31:85': 0, 'talent:31:76': 1, 'abl:31:10': 3, 'abl:31:11': 5 },
      1,
      true,
    ],
  ];
  for (const [label, override, roll, passes] of cases) {
    const fixture = setup_chara_events();
    seed_virgin_offer(fixture);
    for (const [key, value] of Object.entries(override)) {
      fixture.store.set(key, value);
    }
    fixture.set_inputs(1); // 拒绝支（不夺处女）→ 早退前的最后一关
    const { offervirgin_check } = fixture.load_module('event/event-nextday');

    await offervirgin_check(() => roll);

    assert.equal(
      fixture.text_lines().some((t) => t.includes('要夺取温妮的处女吗？')),
      passes,
      label,
    );
  }
});

test('处女献上（OFFERVIRGIN_CHECK）：快感/贞操/好奇/戒备的四项加减', async () => {
  // 基线 S = -1（RAND:3 = 1）+ 顺从 6 档 3 = 2
  const cases = [
    ['接受快感 +1 → S = 3 通过', { 'talent:31:70': 1 }, true],
    ['否定快感 -2 → S = 0 早退', { 'talent:31:71': 1 }, false],
    ['看重贞操 -2 → S = 0 早退', { 'talent:31:30': 1 }, false],
    [
      '看重贞操与看轻贞操并存（IF/ELSEIF 只走前者）→ S = 0 早退',
      { 'talent:31:30': 1, 'talent:31:31': 1 },
      false,
    ],
    ['看轻贞操 +1 → S = 3 通过', { 'talent:31:31': 1 }, true],
    [
      '好奇心与戒备森严同读 TALENT:27（+1 −2 = 净 −1）→ S = 1 通过',
      { 'talent:31:27': 1 },
      true,
    ],
  ];
  for (const [label, override, passes] of cases) {
    const fixture = setup_chara_events();
    seed_virgin_offer(fixture);
    fixture.store.set('abl:31:10', 6); // 顺从 6 档 → +3
    for (const [key, value] of Object.entries(override)) {
      fixture.store.set(key, value);
    }
    fixture.set_inputs(1);
    const { offervirgin_check } = fixture.load_module('event/event-nextday');

    await offervirgin_check(() => 1);

    assert.equal(
      fixture.text_lines().some((t) => t.includes('要夺取温妮的处女吗？')),
      passes,
      label,
    );
  }
});

test('处女献上（OFFERVIRGIN_CHECK）：欲情两条 SIF 在调教外读不到 PALAM（引擎事实）', async () => {
  // 原作 :894-898 的两条 SIF 以 `PALAM:5 >= PALAMLV:4` 为条件，而 PALAM 在
  // EraElectron 里是**调教期专表**（endTrain 删除，三段寻址读回 undefined）——
  // 本函数跑在日循环里，故两支恒不命中。这条用例钉的就是这个引擎事实：
  // 真把 PALAM:5 读成 10000，S 仍只由爱/淫乱行决定（-1 + 1 = 0 → 早退）。
  // 哪天 PALAM 在调教外可读了，这条会红，提示回来改注释与档位用例。
  const fixture = setup_chara_events();
  seed_virgin_offer(fixture);
  fixture.store.set('abl:31:10', 4); // 爱行 4 档 → +1
  fixture.store.set('abl:31:11', 5); // 欲望 = 5（高档条件成立）
  fixture.store.set('abl:31:16', 5); // 侍奉精神 = 5（高档条件成立）
  fixture.store.set('palam:31:5', 10000); // 欲情拉满也不该被读到
  fixture.set_inputs(1);
  const { offervirgin_check } = fixture.load_module('event/event-nextday');

  await offervirgin_check(() => 1); // S = -1 + 1 = 0 → 早退

  assert.equal(
    fixture.text_lines().some((t) => t.includes('要夺取温妮的处女吗？')),
    false,
    'PALAM:5 读不到 → 两条 SIF 不加值 → S = 0 早退',
  );
});

test('处女献上（OFFERVIRGIN_CHECK）：拒绝支的顺从扣减与下限', async () => {
  // [说明, 覆盖项, 期望 ABL:10]
  const cases = [
    ['常规扣 2', { 'abl:31:10': 6 }, 4],
    [
      '扣到负值则归零（顺从 1 档靠淫乱/欲望行过线）',
      { 'abl:31:10': 1, 'talent:31:76': 1, 'abl:31:11': 6 },
      0,
    ],
  ];
  for (const [label, override, expected] of cases) {
    const fixture = setup_chara_events();
    seed_virgin_offer(fixture);
    for (const [key, value] of Object.entries(override)) {
      fixture.store.set(key, value);
    }
    fixture.set_inputs(1);
    const { offervirgin_check } = fixture.load_module('event/event-nextday');

    const result = await offervirgin_check(() => 2);

    assert.equal(result, 0, '拒绝支返回 0');
    assert.equal(fixture.store.get('abl:31:10'), expected, label);
    const texts = fixture.text_lines();
    assert(
      texts.includes('温妮失望而归，作为女孩子的自尊，遭到了毁灭性打击。'),
    );
    if (override['abl:31:10'] < 2) {
      assert(texts.includes('顺从降低为0。'), '扣到负数时播报新值');
    }
  }
});

test('处女献上（OFFERVIRGIN_CHECK）：拒绝支清掉贞操带并落下一次性标记', async () => {
  // FLAG:38 == 0（一次限定）时拒绝 → CFLAG:62 = 1
  const once = setup_chara_events();
  seed_virgin_offer(once);
  once.store.set('abl:31:10', 6);
  once.store.set('flag:38', 0);
  once.store.set('cflag:31:42', 79);
  once.store.set('cflag:31:49', 1);
  once.store.set('cflag:31:50', 1);
  once.set_inputs(1);
  const mod = once.load_module('event/event-nextday');

  await mod.offervirgin_check(() => 2);

  assert.equal(once.store.get('cflag:31:62'), 1, '一次性标记');
  assert.equal(once.store.get('cflag:31:49'), 0, '钥匙收回');
  assert.equal(once.store.get('cflag:31:50'), 0, '钥匙发现标记一并清');
  assert(
    once.text_lines().includes('温妮的贞操带的钥匙拿回来了。'),
    '钥匙收回播报',
  );

  // FLAG:38 != 0（可重复）时拒绝 → 不落标记
  const repeatable = setup_chara_events();
  seed_virgin_offer(repeatable);
  repeatable.store.set('abl:31:10', 6);
  repeatable.store.set('flag:38', 2);
  repeatable.set_inputs(1);
  const mod2 = repeatable.load_module('event/event-nextday');

  await mod2.offervirgin_check(() => 2);

  assert.equal(
    repeatable.store.get('cflag:31:62'),
    undefined,
    '可重复时不落标记',
  );
});

test('处女献上（OFFERVIRGIN_CHECK）：[1] 之外的输入回到 INPUT 循环重问', async () => {
  const fixture = setup_chara_events();
  seed_virgin_offer(fixture);
  fixture.set_inputs(3, 5, 1);
  const { offervirgin_check } = fixture.load_module('event/event-nextday');

  await offervirgin_check(() => 2);

  assert.equal(
    fixture.text_lines().filter((t) => t === '要夺取温妮的处女吗？').length,
    3,
    '每次非法输入都重印询问行',
  );
});

test('处女献上（OFFERVIRGIN_CHECK）：破处支的结算（经验/珠/封印/安全套）', async () => {
  const fixture = setup_chara_events();
  seed_virgin_offer(fixture);
  fixture.store.set('talent:31:273', 1); // 私处封印
  fixture.set_inputs(0);
  const { offervirgin_check } = fixture.load_module('event/event-nextday');

  // S = -2 + 顺从 6 档 +3 = 1（PALAM 表在调教外缺席，两条 SIF 不命中）
  const result = await offervirgin_check(() => 2);

  assert.equal(result, 1, '破处支返回 1');
  assert.equal(fixture.store.get('talent:31:0'), 0, '【处女】丧失');
  assert.equal(fixture.store.get('talent:31:273'), 0, '封印解除');
  assert.equal(fixture.store.get('exp:31:0'), 2, 'EXP:0 += 2');
  assert.equal(fixture.store.get('exp:31:5'), 1, 'EXP:5 += 1');
  assert.equal(fixture.store.get('exp:31:20'), 1, 'EXP:20 += 1');
  assert.equal(fixture.store.get('juel:31:1'), 400, 'JUEL:1 += S*400');
  assert.equal(fixture.store.get('juel:31:4'), 1000, 'JUEL:4 += S*1000');
  assert.equal(fixture.store.get('juel:31:5'), 500, 'JUEL:5 += S*500');
  assert.equal(fixture.store.get('juel:31:6'), 1000, 'JUEL:6 += S*1000');
  assert.equal(fixture.store.get('juel:31:9'), 1000, 'JUEL:9 += S*1000');
  const texts = fixture.text_lines();
  assert(texts.includes('温妮将处女奉献给了你……'));
  assert(texts.includes('【处女丧失】'));
  assert(texts.includes('守护贞操的封印破碎了……'));
});

test('处女献上（OFFERVIRGIN_CHECK）：安全套两问（持有道具才问、选 [0] 装上）', async () => {
  // 持有安全套 → 询问 → 选 0：TEQUIP:35 = 1 且道具 -1
  const with_condom = setup_chara_events();
  seed_virgin_offer(with_condom);
  with_condom.store.set('item:24', 2);
  with_condom.set_inputs(0, 0);
  const mod = with_condom.load_module('event/event-nextday');

  await mod.offervirgin_check(() => 2);

  assert.equal(with_condom.store.get('item:24'), 1, '安全套 -1');
  const with_texts = with_condom.text_lines();
  assert(with_texts.includes('要使用安全套吗？'), '持有道具才问');
  // 套上之后不走膣内射精链（原作 :1010 的 `IF TEQUIP:35 == 0`）——
  // 连 :1011 的 CFLAG:101 = 30 都在同一个 `if (condom === 0)` 分支里，
  // 戴套时整段不执行，CFLAG:101 保持从未写过
  assert.equal(
    with_condom.store.get('cflag:31:101'),
    undefined,
    '戴上安全套不得进入膣内射精链',
  );

  // 未持有 → 不问，且走膣内射精链；顺带覆盖尾部清贞操带的位 64
  const without = setup_chara_events();
  seed_virgin_offer(without);
  without.store.set('cflag:31:49', 1); // 钥匙在身上（过守卫靠的不是贞操带）
  without.store.set('cflag:31:40', 64); // 着衣状态的位 64
  without.set_inputs(0);
  const mod2 = without.load_module('event/event-nextday');

  await mod2.offervirgin_check(() => 2);

  const without_texts = without.text_lines();
  assert(!without_texts.includes('要使用安全套吗？'), '未持有安全套时不得询问');
  // 不戴套时要进膣内射精链（真身随 #406 接线：event-pregnancy.js 的
  // in_vagina_m_to_t/conception_check_m_to_t，'m_to_t' 那一档）——
  // nakadashi_check 无论受孕系统开关与否，命中/未命中都会清池（除三处
  // 提前返回，本例未触发），CFLAG:101 从 :1011 写入的 30 变回 0 即证据
  assert.equal(
    without.store.get('cflag:31:101'),
    0,
    '不戴套时膣内射精链真的跑了，清空了刚写入的精液池',
  );
  assert.equal(without.store.get('cflag:31:40'), 0, '尾部清掉贞操带的位 64');
  assert.equal(without.store.get('cflag:31:49'), 0, '钥匙收回');
  assert.equal(without.store.get('cflag:31:42'), 0, '特别服装一并归零');
});

test('处女献上（OFFERVIRGIN_CHECK）：膣内射精链清零前，CFLAG:101 确实是 :1011 写入的 30（#439）', async () => {
  // 上一条测的是清零后的终态——nakadashi_check 无论受孕系统开关都会
  // 清池，30 与 20（#439 的 M8648）清零后都是 0，终态分不出两者。这里
  // 把默认夹具的受孕系统开关（FLAG:5 位 2）打开，让 nakadashi_check 走到
  // 算上界那支、真的调一次 rand(upper)；这个调用发生在 :274 clear_pool
  // 之前（event-pregnancy.js:302-304），借它当清零前的观测点，不改产
  // 出结果也不碰生产代码。
  const fixture = setup_chara_events();
  seed_virgin_offer(fixture);
  fixture.store.set('flag:5', 4); // 位 2 = 1：启用妊娠系统
  fixture.set_inputs(0);
  const mod = fixture.load_module('event/event-nextday');

  let observed_pool;
  const spy_rand = () => {
    if (observed_pool === undefined) {
      observed_pool = fixture.store.get('cflag:31:101');
    }
    return 2;
  };

  await mod.offervirgin_check(spy_rand);

  assert.equal(
    observed_pool,
    30,
    'NAKADASHI_CHECK 算掷骰上界时看到的 CFLAG:101 必须是 :1011 写入的 30',
  );
});

test('处女献上（OFFERVIRGIN_CHECK）：初体验记录与亲族关系的九档编码', async () => {
  // 目标侧的表读 **TALENT:PLAYER:122**（魔王的性别）——[TFLAG:14, 魔王是男人, 期望 CFLAG:15]
  const cases = [
    [1, 1, 300],
    [1, 0, 301],
    [3, 1, 304],
    [3, 0, 305],
    [4, 1, 306],
    [4, 0, 307],
    [5, 0, 308],
    [6, 1, 309],
    [0, 0, 1], // 无亲族关系：NO:PLAYER + 1 = 1
  ];
  for (const [relation, master_male, expected] of cases) {
    const fixture = setup_chara_events();
    seed_virgin_offer(fixture);
    // 魔王侧性别：扶她（121）或男人（122）有一个即可过「主人非男非扶她」的守卫
    fixture.store.set('talent:0:122', master_male);
    fixture.store.set('talent:0:121', master_male ? 0 : 1);
    fixture.set_inputs(0);
    // INCEST 真身的判据：PLAYER(=魔王 0) 下 CFLAG:21 =（关系 - 1）×100 得关系值，
    // 或用 `CFLAG:25 == -1` 直接落 1（incest.js 的 MASTER 短路）
    if (relation === 1) {
      fixture.store.set('cflag:31:25', -1);
    } else {
      fixture.store.set('cflag:31:21', (relation - 1) * 100);
    }
    const { offervirgin_check } = fixture.load_module('event/event-nextday');

    await offervirgin_check(() => 0);

    assert.equal(
      fixture.store.get('cflag:31:15'),
      expected,
      `亲族关系 ${relation} / 魔王是男人 ${master_male}`,
    );
    assert.equal(fixture.store.get('cstr:31:3'), '你', '初体验对象名');
  }
});

test('处女献上（OFFERVIRGIN_CHECK）：魔王童贞丧失的编码表（读目标侧性别）', async () => {
  // 魔王侧的表读 **TALENT:122**（目标自己的性别），而目标恒为处女女性
  // （男目标过不了准入守卫），故只有 false 那一列可达——
  // [TFLAG:14, 期望 CFLAG:0:15]
  const cases = [
    [2, 301],
    [3, 307],
    [4, 305],
    [6, 308],
    [0, 32], // 无亲族关系：NO:TARGET + 1 = 31 + 1
  ];
  for (const [relation, expected] of cases) {
    const fixture = setup_chara_events();
    seed_virgin_offer(fixture);
    fixture.store.set('talent:0:1', 1); // 魔王是童贞
    if (relation === 0) {
      fixture.store.set('cflag:31:21', 0);
    } else if (relation === 1) {
      fixture.store.set('cflag:31:25', -1);
    } else {
      fixture.store.set('cflag:31:21', (relation - 1) * 100);
    }
    fixture.set_inputs(0);
    const { offervirgin_check } = fixture.load_module('event/event-nextday');

    await offervirgin_check(() => 1);

    assert.equal(
      fixture.store.get('talent:0:1'),
      0,
      `关系 ${relation}：魔王童贞丧失`,
    );
    assert.equal(
      fixture.store.get('cflag:0:15'),
      expected,
      `关系 ${relation}：魔王侧初体验编码`,
    );
    assert.equal(
      fixture.store.get('cstr:0:3'),
      '温妮',
      '初体验对象名（呼び名）',
    );
  }
});

/** 夜这い候选的底线：欲望 4 / 性交中毒 1（原作 :1106 的准入）+
 *  顺 4 + 肛感 5 = 13（过「男人支」的 >12 门槛）；V 感 6 > 肛感 5 → 走 V 支 */
function seed_night_candidate(fixture, cid, name) {
  join_slave_chara(fixture, cid, name);
  fixture.store.set(`abl:${cid}:10`, 4); // 顺从
  fixture.store.set(`abl:${cid}:11`, 4); // 欲望
  fixture.store.set(`abl:${cid}:30`, 1); // 性交中毒
  fixture.store.set(`abl:${cid}:2`, 6); // 私处感觉（> 肛感 → V 支）
  fixture.store.set(`abl:${cid}:3`, 5); // 肛门感觉
  fixture.store.set(`base:${cid}:0`, 1000);
  fixture.store.set(`talent:${cid}:122`, 1); // 男人（绕开非男人支的 V/肛双门槛）
  fixture.store.set('callname:0:-2', '你'); // %CALLNAME:MASTER%
  fixture.store.set('expname:0', '私处经验');
  fixture.store.set('expname:1', '肛门经验');
  fixture.store.set('expname:5', '性交经验');
  fixture.store.set('palamname:1', '私处');
  fixture.store.set('palamname:2', '肛门');
  fixture.store.set('palamname:4', '恭顺');
  fixture.store.set('palamname:5', '欲情');
}

test('夜这い（NIGHT_STALKING_CHECK）：主人非男人/扶她时早退', async () => {
  const fixture = setup_chara_events();
  seed_night_candidate(fixture, 31, '温妮');
  const { night_stalking_check } = fixture.load_module('event/event-nextday');

  assert.equal(await night_stalking_check(() => 0), 0, '早退返回 0');
  assert.equal(fixture.text_lines().length, 0, '无输出');
});

test('夜这い（NIGHT_STALKING_CHECK）：十条排除守卫逐条挡住候选', async () => {
  // [说明, 覆盖项]
  const blockers = [
    ['已死（体力 0）', { 'base:31:0': 0 }],
    ['濒死（体力 500）', { 'base:31:0': 500 }],
    ['育儿中', { 'talent:31:154': 1 }],
    ['临月', { 'cflag:31:110': 2, 'talent:31:153': 1 }],
    ['不在魔王房间', { 'cflag:31:1': 1 }],
    ['已婚且不是魔王', { 'cflag:31:601': 100 }],
    ['绝不侍奉', { 'talent:31:151': 1 }],
    ['反抗刻印', { 'mark:31:3': 1 }],
    [
      '男人：顺+欲+肛感 ≤ 12',
      { 'abl:31:10': 3, 'abl:31:11': 4, 'abl:31:3': 5 },
    ],
  ];
  for (const [label, override] of blockers) {
    const fixture = setup_chara_events();
    fixture.store.set('talent:0:122', 1);
    seed_night_candidate(fixture, 31, '温妮');
    for (const [key, value] of Object.entries(override)) {
      fixture.store.set(key, value);
    }
    const { night_stalking_check } = fixture.load_module('event/event-nextday');

    assert.equal(
      await night_stalking_check(() => 0),
      0,
      `${label}：无人合格返回 0`,
    );
    assert.equal(fixture.text_lines().length, 0, `${label}：无输出`);
  }
});

test('夜这い（NIGHT_STALKING_CHECK）：处女与非男人各有门槛，男人放宽', async () => {
  // [说明, 覆盖项, 是否合格]（男人 → 只看 顺+欲+肛感 > 12）
  const cases = [
    [
      '男人：顺+欲+肛感 13 过线',
      { 'abl:31:10': 4, 'abl:31:11': 4, 'abl:31:3': 5 },
      true,
    ],
    [
      '处女：顺+欲+肛感 14 恰好被挡',
      {
        'talent:31:122': 0,
        'talent:31:0': 1,
        'abl:31:10': 5,
        'abl:31:11': 4,
        'abl:31:3': 5,
      },
      false,
    ],
    [
      '处女：顺+欲+肛感 15 过线',
      {
        'talent:31:122': 0,
        'talent:31:0': 1,
        'abl:31:10': 5,
        'abl:31:11': 5,
        'abl:31:3': 5,
      },
      true,
    ],
    [
      '非男人非处女：V 感 12 与肛感 14 双门槛（V 刚好被挡）',
      {
        'talent:31:122': 0,
        'abl:31:10': 3,
        'abl:31:11': 4,
        'abl:31:2': 5,
        'abl:31:3': 5,
      },
      false,
    ],
    [
      '非男人非处女：双门槛都过',
      {
        'talent:31:122': 0,
        'abl:31:10': 4,
        'abl:31:11': 4,
        'abl:31:2': 6,
        'abl:31:3': 5,
      },
      true,
    ],
    [
      '非男人非处女：V 感 13 / 肛感 14 双双压线（> 门槛才过）',
      {
        'talent:31:122': 0,
        'abl:31:10': 5,
        'abl:31:11': 4,
        'abl:31:2': 4,
        'abl:31:3': 5,
      },
      true,
    ],
    [
      '贞操带：顺+欲+肛感 14 恰好被挡',
      {
        'cflag:31:42': 79,
        'cflag:31:40': 64,
        'abl:31:10': 5,
        'abl:31:11': 4,
        'abl:31:3': 5,
      },
      false,
    ],
    [
      '贞操带：顺+欲+肛感 15 过线',
      {
        'cflag:31:42': 79,
        'cflag:31:40': 64,
        'abl:31:10': 6,
        'abl:31:11': 4,
        'abl:31:3': 5,
      },
      true,
    ],
  ];
  for (const [label, override, eligible] of cases) {
    const fixture = setup_chara_events();
    fixture.store.set('talent:0:122', 1);
    seed_night_candidate(fixture, 31, '温妮');
    for (const [key, value] of Object.entries(override)) {
      fixture.store.set(key, value);
    }
    const { night_stalking_check } = fixture.load_module('event/event-nextday');

    const result = await night_stalking_check(() => 0);

    assert.equal(result, eligible ? 1 : 0, label);
    assert.equal(
      fixture.text_lines().some((t) => t.includes('突然跑到房间里来。')),
      eligible,
      `${label}：来访播报`,
    );
  }
});

test('夜这い（NIGHT_STALKING_CHECK）：OK_FLAG 的七项加减决定合格与否', async () => {
  // OK_FLAG = 性交中毒(ABL:30)，再按七项素质加减（男人 → 处女两支不适用）；
  // OK_FLAG > 0 才算合格。基底 1，靠负项压到 0 即被挡。
  // [说明, 覆盖项, 是否合格]
  const cases = [
    ['基底 1 → 合格', {}, true],
    ['克制 −2 → −1 被挡', { 'talent:31:20': 1 }, false],
    [
      '开放 +1 与克制 −2 → 0 被挡',
      { 'talent:31:33': 1, 'talent:31:20': 1 },
      false,
    ],
    [
      '开放与接受快感各 +1 抵掉克制 −2 → 1 合格',
      { 'talent:31:33': 1, 'talent:31:20': 1, 'talent:31:70': 1 },
      true,
    ],
    ['否定快感 −1 与基底 1 → 0 被挡', { 'talent:31:71': 1 }, false],
    ['接受快感 +1 → 2 合格', { 'talent:31:70': 1 }, true],
    [
      '性爱狂 +1 把 0 抬过线（男人：TALENT:0 == 0 成立）',
      { 'talent:31:75': 1, 'talent:31:71': 1 },
      true,
    ],
    [
      '尻穴狂 +1 把 0 抬过线（男人：靠 A 感 > V 感那一支）',
      { 'talent:31:77': 1, 'talent:31:71': 1, 'abl:31:2': 4 },
      true,
    ],
  ];
  for (const [label, override, eligible] of cases) {
    const fixture = setup_chara_events();
    fixture.store.set('talent:0:122', 1);
    seed_night_candidate(fixture, 31, '温妮');
    for (const [key, value] of Object.entries(override)) {
      fixture.store.set(key, value);
    }
    const { night_stalking_check } = fixture.load_module('event/event-nextday');

    assert.equal(await night_stalking_check(() => 0), eligible ? 1 : 0, label);
  }

  // 淫乱（76）与性爱狂（75）在**处女**身上不成立（TALENT:0 为真时两支都不进）
  const virgin = setup_chara_events();
  virgin.store.set('talent:0:122', 1);
  seed_night_candidate(virgin, 31, '温妮');
  virgin.store.set('talent:31:122', 0); // 女性
  virgin.store.set('talent:31:0', 1); // 处女
  virgin.store.set('talent:31:76', 1); // 淫乱（处女支不成立）
  virgin.store.set('abl:31:10', 5);
  virgin.store.set('abl:31:11', 5);
  virgin.store.set('abl:31:3', 5); // 顺+欲+肛 = 15 > 14 过线
  const mod = virgin.load_module('event/event-nextday');

  await mod.night_stalking_check(() => 0);
  // 淫乱在处女身上不加 OK_FLAG（只靠基底 1 合格），且处女走**肛门支**：
  // PLAY = 性交中毒 1 + 肛感 5 档（+2）= 3
  assert.equal(virgin.store.get('exp:31:1'), 3, '处女支：PLAY = 1 + 2');
});

test('夜这い（NIGHT_STALKING_CHECK）：当番由 RAND 决定，选中者拿全部结算', async () => {
  const fixture = setup_chara_events();
  fixture.store.set('talent:0:122', 1);
  seed_night_candidate(fixture, 31, '温妮');
  seed_night_candidate(fixture, 32, '艾米');
  for (const cid of [31, 32]) {
    fixture.store.set(`talent:${cid}:122`, 0); // 非男人
    fixture.store.set(`abl:${cid}:10`, 5); // 顺 5 + 欲 4 + V 感 → 过双门槛
    fixture.store.set(`abl:${cid}:2`, 6); // V 感 ≥6 → PLAY = 3 + 4
    fixture.store.set(`abl:${cid}:30`, 3); // 性交中毒 3
  }
  fixture.store.set('callname:0:-2', '你');
  const { night_stalking_check } = fixture.load_module('event/event-nextday');

  const result = await night_stalking_check((n) => (n === 2 ? 1 : 0));

  assert.equal(result, 1, '有当番返回 1');
  assert.equal(fixture.store.get('flag:10005'), 32, 'TARGET = 当番');
  assert.equal(fixture.store.get('exp:32:0'), 7, 'PLAY = 3 + 4 → EXP:0 += 7');
  assert.equal(fixture.store.get('exp:32:1'), undefined, 'V 支不写肛门经验');
  assert.equal(fixture.store.get('exp:32:5'), 7, 'EXP:5 += PLAY');
  assert.equal(fixture.store.get('juel:32:1'), 2800, 'JUEL:1 += PLAY*400');
  assert.equal(fixture.store.get('juel:32:4'), 1750, 'JUEL:4 += PLAY*250');
  assert.equal(fixture.store.get('juel:32:5'), 1750, 'JUEL:5 += PLAY*250');
  assert.equal(fixture.store.get('exp:31:0'), undefined, '落选的温妮不写');
  const texts = fixture.text_lines();
  assert(
    texts.includes('调教结束后，你正准备上床就寝，艾米突然跑到房间里来。'),
    '来访播报',
  );
  assert(
    texts.includes(
      '想你抱抱，一直无可救药地想着你，子宫想你想得发疼，乞求着你的宠爱……',
    ),
    'V 支开场',
  );
  assert(texts.includes('私处点数＋2800'), 'PALAMNAME:1 点数＋{PLAY*400}');
  assert(texts.includes('恭顺点数＋1750'), 'PALAMNAME:4 点数＋{PLAY*250}');
  assert(texts.includes('欲情点数＋1750'), 'PALAMNAME:5 点数＋{PLAY*250}');
});

test('夜这い（NIGHT_STALKING_CHECK）：V 支的五条失效条件退回肛门支', async () => {
  // [说明, 覆盖项]
  const cases = [
    ['男人（V 支不成立）', { 'talent:31:122': 1 }],
    // 处女与贞操带两支的门槛是 顺+欲+肛感 > 14（种子给的是 13，抬顺从补足）
    ['处女', { 'talent:31:122': 0, 'talent:31:0': 1, 'abl:31:10': 6 }],
    ['贞操带', { 'cflag:31:42': 79, 'cflag:31:40': 64, 'abl:31:10': 6 }],
    ['私处封印', { 'talent:31:273': 1 }],
    ['A 感覚压过 V 感覚', { 'abl:31:2': 4 }],
  ];
  for (const [label, override] of cases) {
    const fixture = setup_chara_events();
    fixture.store.set('talent:0:122', 1);
    seed_night_candidate(fixture, 31, '温妮');
    for (const [key, value] of Object.entries(override)) {
      fixture.store.set(key, value);
    }
    const { night_stalking_check } = fixture.load_module('event/event-nextday');

    await night_stalking_check(() => 0);

    assert.equal(
      fixture.store.get('exp:31:1'),
      3,
      `${label}：肛门经验 += PLAY`,
    );
    assert.equal(
      fixture.store.get('exp:31:0'),
      undefined,
      `${label}：不写私处经验`,
    );
    assert.equal(
      fixture.store.get('juel:31:2'),
      1200,
      `${label}：JUEL:2 += PLAY*400`,
    );
    const texts = fixture.text_lines();
    assert(
      texts.includes(
        '想你抱抱，一直无可救药地想着你，肛门想你想得发疼，乞求着你的宠爱……',
      ),
      `${label}：肛门支开场`,
    );
  }
});

test('夜这い（NIGHT_STALKING_CHECK）：PLAY 的感覚三档（≤4 / ==5 / ≥6）', async () => {
  // [感覚值, 期望 PLAY 增量]（基准 PLAY = ABL:30 = 3）
  const cases = [
    [4, 1],
    [5, 2],
    [6, 4],
    [9, 4],
  ];
  for (const [sense, bonus] of cases) {
    const fixture = setup_chara_events();
    fixture.store.set('talent:0:122', 1);
    seed_night_candidate(fixture, 31, '温妮');
    fixture.store.set('abl:31:10', 9); // 顺 9 + 欲 4 + 肛感 → 必过男性门槛
    fixture.store.set('abl:31:30', 3);
    fixture.store.set('abl:31:3', sense); // 肛门感覚（男人 → 肛门支）
    const { night_stalking_check } = fixture.load_module('event/event-nextday');

    await night_stalking_check(() => 0);

    assert.equal(
      fixture.store.get('exp:31:1'),
      3 + bonus,
      `感覚 ${sense} → PLAY = 3 + ${bonus}`,
    );
  }
});

test('夜这い（NIGHT_STALKING_CHECK）：SELF_KOJO 以事件码 5 在调教外调用', async () => {
  const fixture = setup_chara_events();
  fixture.store.set('talent:0:122', 1);
  seed_night_candidate(fixture, 31, '温妮');
  const { night_stalking_check } = fixture.load_module('event/event-nextday');
  const { game } = fixture.load_module('facade/game');
  const events = [];
  const original = game.train.with_self_kojo_event;
  game.train.with_self_kojo_event = async (event, callback) => {
    events.push(event);
    return callback();
  };
  try {
    await night_stalking_check(() => 0);
  } finally {
    game.train.with_self_kojo_event = original;
  }

  assert.deepEqual(events, [5], 'TFLAG:13 = 5（夜这い口上）');
});

// —— #400（N16）@PILLORY（ere/event/event-nextday-pillory.js）——

/** 示众台目标的底线：CFLAG:1 == 8（晒し台状態） */
function seed_pillory(fixture, cid = 31, name = '温妮') {
  join_slave_chara(fixture, cid, name);
  fixture.store.set(`cflag:${cid}:1`, 8);
  fixture.store.set('flag:10005', cid);
  fixture.store.set('talentname:200', '战士');
  for (const [n, v] of [
    [1, '私处'],
    [2, '肛门'],
    [6, '恭顺'],
    [8, '耻情'],
    [100, '否定'],
  ]) {
    fixture.store.set(`palamname:${n}`, v);
  }
  for (const [n, v] of [
    [0, '私处经验'],
    [1, '肛门经验'],
    [5, '性交经验'],
    [20, '精液经验'],
    [22, '口交经验'],
    [56, '兽奸经验'],
  ]) {
    fixture.store.set(`expname:${n}`, v);
  }
}

test('示众台（PILLORY）：非示众台状态整场早退', async () => {
  const fixture = setup_chara_events();
  seed_pillory(fixture);
  fixture.store.set('cflag:31:1', 0);
  const { pillory } = fixture.load_module('event/event-nextday-pillory');

  assert.equal(await pillory(() => 0), 0, '恒返回 0');
  assert.equal(fixture.text_lines().length, 0, '无输出');
});

test('示众台（PILLORY）：头部的五种状态标签（维度表）', async () => {
  // [说明, 覆盖项, 期望标签]
  const cases = [
    [
      '临月（预产日 -2 ≤ DAY 且妊娠）',
      { 'cflag:31:110': 3, 'talent:31:153': 1 },
      '（临月）',
    ],
    [
      '怀孕中（预产日还远）',
      { 'cflag:31:110': 100, 'talent:31:153': 1 },
      '（怀孕中）',
    ],
    ['处女', { 'talent:31:0': 1 }, '（处女）'],
    ['前穴封印', { 'talent:31:273': 1 }, '（前穴封印）'],
    ['无标签', {}, ''],
  ];
  for (const [label, override, tag] of cases) {
    const fixture = setup_chara_events();
    seed_pillory(fixture);
    fixture.store.set('flag:10000', 5); // DAY:0
    for (const [key, value] of Object.entries(override)) {
      fixture.store.set(key, value);
    }
    const { pillory } = fixture.load_module('event/event-nextday-pillory');

    await pillory(() => 0);

    assert(
      fixture.text_lines().includes(`示众刑：温妮${tag}`),
      `${label}：${tag}`,
    );
  }
  // 出产当日（CFLAG:110 == DAY）优先于临月
  const birth = setup_chara_events();
  seed_pillory(birth);
  birth.store.set('flag:10000', 5);
  birth.store.set('cflag:31:110', 5);
  birth.store.set('talent:31:153', 1);
  const mod = birth.load_module('event/event-nextday-pillory');

  await mod.pillory(() => 0);
  assert(birth.text_lines().includes('示众刑：温妮（出产）'), '出产当日');
});

test('示众台（PILLORY）：围观姿态按 CFLAG:661+662 的五档', async () => {
  // [661+662 之和, 期望姿态]
  const cases = [
    [0, '不安地颤抖着，'],
    [19, '被多次中出的不快感折磨着，'],
    [20, '无法睡觉，眼睛通红着，'],
    [49, '无法睡觉，眼睛通红着，'],
    [99, '在无穷无尽的凌辱中，奄奄一息地大口喘着气，'],
    [100, '全身都被精液沾满了，'],
  ];
  for (const [sum, expected] of cases) {
    const fixture = setup_chara_events();
    seed_pillory(fixture);
    fixture.store.set('cflag:31:661', sum);
    const { pillory } = fixture.load_module('event/event-nextday-pillory');

    await pillory(() => 0);

    assert(fixture.text_lines().includes(expected), `CFLAG:661+662 = ${sum}`);
  }
});

test('示众台（PILLORY）：涂鸦的三支表（临月 / 怀孕 / 普通六选一）', async () => {
  // 临月与怀孕各 RAND:3、普通 RAND:6；都取第 0 项
  const due = setup_chara_events();
  seed_pillory(due);
  due.store.set('cflag:31:110', 0); // DAY 也是 0 → 临月
  due.store.set('talent:31:153', 1);
  await due.load_module('event/event-nextday-pillory').pillory(() => 0);
  assert(due.text_lines().includes('『淫乱的大肚便器，小温妮～』'), '临月支');

  const plain = setup_chara_events();
  seed_pillory(plain);
  const bounds = [];
  await plain.load_module('event/event-nextday-pillory').pillory((n) => {
    bounds.push(n);
    return 0;
  });
  assert(
    plain.text_lines().includes('『精液便器，小温妮哦～』'),
    '普通支（RAND:6 第 0 项）',
  );
  assert(bounds.includes(6), '通配涂鸦的上界是 RAND:6');

  // 普通支 CASE 5 是「非男人限定」：男人命中该 CASE 时什么都不打印
  const male = setup_chara_events();
  seed_pillory(male);
  male.store.set('talent:31:122', 1);
  await male
    .load_module('event/event-nextday-pillory')
    .pillory((n) => (n === 6 ? 5 : 0));
  assert(
    !male.text_lines().includes('『最爱鸡鸡的婊子便器女』'),
    '男人命中 CASE 5 时不打印',
  );
});

test('示众台（PILLORY）：使用次数掷的五支与结算数值', async () => {
  // 处女支：COUNT_A = RAND:20+1、COUNT_F = RAND:10+1、COUNT_S = A+F+RAND:10
  // 随机源恒 0 → A = 1、F = 1、S = 2
  const fixture = setup_chara_events();
  seed_pillory(fixture);
  fixture.store.set('talent:31:0', 1); // 处女
  const { pillory } = fixture.load_module('event/event-nextday-pillory');

  await pillory(() => 0);

  assert(fixture.text_lines().includes('『处女』'), '处女标签');
  assert.equal(fixture.store.get('exp:31:1'), 1, 'EXP:1 += COUNT_A');
  assert.equal(fixture.store.get('exp:31:22'), 1, 'EXP:22 += COUNT_F');
  assert.equal(fixture.store.get('exp:31:20'), 2, 'EXP:20 += COUNT_S');
  assert.equal(fixture.store.get('exp:31:5'), 1, 'EXP:5 += COUNT_A + COUNT_V');
  assert.equal(fixture.store.get('juel:31:2'), 1, 'JUEL:2 += COUNT_A');
  assert.equal(fixture.store.get('cflag:31:662'), 1, 'CFLAG:662 += COUNT_A');
  assert.equal(fixture.store.get('cflag:31:663'), 1, 'CFLAG:663 += COUNT_F');
  assert.equal(
    fixture.store.get('cflag:31:665'),
    0,
    'CFLAG:665 += S−V−A−F−B = 0',
  );

  // 非处女支（F/V/A/S 全非零、B 恒 0）：S = F+A+V+RAND:10 = 3 → 665 = 3−1−1−1 = 0
  const plain = setup_chara_events();
  seed_pillory(plain);
  await plain.load_module('event/event-nextday-pillory').pillory(() => 0);
  assert.equal(plain.store.get('cflag:31:665'), 0, '非处女支的 665 算式');

  // 兽奸支：ABL:39 ≥ 1 且 RAND:2 == 0 → COUNT_Z 与兽奸经验
  const beast = setup_chara_events();
  seed_pillory(beast);
  beast.store.set('abl:31:39', 1);
  await beast.load_module('event/event-nextday-pillory').pillory(() => 0);
  assert.equal(
    beast.store.get('exp:31:56'),
    3,
    'EXP:56 += COUNT_Z（= COUNT_S）',
  );
  assert(
    beast.text_lines().some((t) => t.includes('侵犯着。')),
    '兽奸叙述的侵犯者行',
  );
});

test('示众台（PILLORY）：职业十连（TALENT:200..209）有项才掷、掷即打印', async () => {
  // 非处女 → JOB_NORMAL 表；两处职业各掷一次 RAND:3（恒 0 → 第 0 句）
  const fixture = setup_chara_events();
  seed_pillory(fixture);
  fixture.store.set('talent:31:200', 1);
  fixture.store.set('talent:31:201', 1);
  fixture.store.set('talentname:201', '神官');
  const { pillory } = fixture.load_module('event/event-nextday-pillory');

  await pillory(() => 0);

  assert.equal(
    fixture.text_lines().filter((t) => t === '『用肉穴向大家道歉』').length,
    2,
    '两项职业各打一句（未持有的槽位不掷不打印）',
  );

  // 处女/私处封印 → JOB_BANNED 表（%SAVESTR% 与 %TALENTNAME% 两种填串）
  const banned = setup_chara_events();
  seed_pillory(banned);
  banned.store.set('talent:31:0', 1);
  banned.store.set('talent:31:200', 1);
  await banned.load_module('event/event-nextday-pillory').pillory(() => 0);
  assert(
    banned.text_lines().includes('『温妮是肛门特别有感觉的变态战士』'),
    'JOB_BANNED 的 CASE 0 填 SAVESTR + TALENTNAME',
  );
});

test('示众台（PILLORY）：正字显示与四项里程碑', async () => {
  const fixture = setup_chara_events();
  seed_pillory(fixture);
  fixture.store.set('talent:31:0', 1); // 处女支 → COUNT_V = 0，正字基数不被 +1
  fixture.store.set('cflag:31:661', 7); // 7 = 正 + 丅
  const { pillory } = fixture.load_module('event/event-nextday-pillory');

  await pillory(() => 0);

  const texts = fixture.text_lines();
  assert(
    texts.includes('『肉穴使用次数：正 丅』'),
    '正字：每 5 一笔「正」、余数取 一/丅/下/㠪',
  );
  assert(texts.includes('『祝贺！达成了五十！！！』') === false, '7 未达 50');
  assert(texts.includes('『真的一个打十个！』') === false, '7 未达第一档');

  const milestones = setup_chara_events();
  seed_pillory(milestones);
  milestones.store.set('cflag:31:661', 100);
  await milestones.load_module('event/event-nextday-pillory').pillory(() => 0);
  const mtexts = milestones.text_lines();
  assert(
    mtexts.includes('『真的一个打十个！』') &&
      mtexts.includes('『突破三十！！』'),
    '里程碑',
  );
  assert(
    mtexts.includes('『祝贺！达成了五十！！！』') &&
      mtexts.includes('『正字写太多了，有点恶心』'),
    '里程碑',
  );

  // 正字除数：8 = 正 + 下（每 5 一笔）；第一档里程碑的边界是 >9
  const eight = setup_chara_events();
  seed_pillory(eight);
  eight.store.set('talent:31:0', 1); // 处女支 → COUNT_V = 0
  eight.store.set('cflag:31:661', 8);
  await eight.load_module('event/event-nextday-pillory').pillory(() => 0);
  const etexts = eight.text_lines();
  assert(etexts.includes('『肉穴使用次数：正 下』'), '正字除数 5：8 = 正 + 下');
  assert(!etexts.includes('『真的一个打十个！』'), '第一档里程碑的边界是 >9');

  // 第一档里程碑的判据是 `> 9`：9 压线不出、10 才出
  const nine = setup_chara_events();
  seed_pillory(nine);
  nine.store.set('talent:31:0', 1);
  nine.store.set('cflag:31:661', 9);
  await nine.load_module('event/event-nextday-pillory').pillory(() => 0);
  assert(
    !nine.text_lines().includes('『真的一个打十个！』'),
    '9 压线不出第一档里程碑',
  );

  const ten = setup_chara_events();
  seed_pillory(ten);
  ten.store.set('talent:31:0', 1);
  ten.store.set('cflag:31:661', 10);
  await ten.load_module('event/event-nextday-pillory').pillory(() => 0);
  assert(
    ten.text_lines().includes('『真的一个打十个！』'),
    '10 出第一档里程碑',
  );
});

test('示众台（PILLORY）：JUEL:100 超限即从示众台解放', async () => {
  const fixture = setup_chara_events();
  seed_pillory(fixture);
  fixture.store.set('talent:31:0', 1);
  fixture.store.set('cflag:31:9', 0); // 等级 0 → 阈值 120
  fixture.store.set('juel:31:100', 125); // 本轮再 +3 → 128；阈值 120
  const { pillory } = fixture.load_module('event/event-nextday-pillory');

  await pillory(() => 0);

  assert(fixture.text_lines().includes('温妮的精神达到极限了……'), '解放播报');
  assert.equal(fixture.store.get('cflag:31:661'), 0, '涂鸦计数清零');
  assert.equal(fixture.store.get('cflag:31:1'), 0, '状态归 0（不再示众）');
  assert.equal(fixture.store.get('cflag:31:777'), 0, '待处刑标签清零');
});

test('示众台（PILLORY）：COUNT_V > 0 时接妊娠链（CFLAG:107 + #401 两张真身）', async () => {
  const fixture = setup_chara_events();
  seed_pillory(fixture);
  fixture.store.set('talent:31:122', 0);
  fixture.store.set('abl:31:39', 0);
  fixture.store.set('abl:31:30', 1); // 让非兽奸支走到 V
  const { pillory } = fixture.load_module('event/event-nextday-pillory');

  await pillory(() => 0);

  // CFLAG:107 += COUNT_V 之后立刻被 in_vagina_syoku_to_t 的「非妊娠期清池」归零
  // （event-pregnancy.js 的 clear_pool）——断言写记录证明那一笔确实落过
  assert(
    fixture.var_writes.some((w) => w.name === 'cflag:31:107' && w.value === 1),
    'CFLAG:107 += COUNT_V',
  );
  // 战役经验结算（#469 起真身，跨边）：FLAG:400 未置位时不触发
  assert(
    !fixture.text_lines().some((t) => t.includes('点经验值')),
    'FLAG:400 未置位，战役经验结算不触发',
  );
});

test('示众台（PILLORY）：战役经验结算——FLAG:400 置位时派遣中角色获得平均凌辱次数经验（#469）', async () => {
  const fixture = setup_chara_events();
  seed_pillory(fixture); // 温妮（31）在示众台上，CFLAG:1 == 8
  join_slave_chara(fixture, 32, '派遣中的奴隶');
  fixture.store.set('flag:400', 1);
  fixture.store.set('cflag:31:661', 3);
  fixture.store.set('cflag:31:662', 2);
  fixture.store.set('cflag:31:663', 0);
  fixture.store.set('cflag:31:664', 0);
  fixture.store.set('cflag:31:665', 0);
  fixture.store.set('cflag:32:1', 12); // 32 号派遣中，非被示众的 31 号
  fixture.store.set('exp:32:80', 10);
  const { pillory } = fixture.load_module('event/event-nextday-pillory');

  await pillory(() => 0);

  // (3+2+0+0+0)/5 + 1 = 2
  assert.equal(fixture.store.get('exp:32:80'), 12, '派遣中角色获得经验');
  assert.equal(
    fixture.store.get('exp:31:80'),
    undefined,
    '被示众的角色本身不在派遣状态，不重复计入',
  );
  assert(
    fixture.text_lines().some((t) => t.includes('获得了2点经验值')),
    '结算播报',
  );
  // :298 是 PRINTFORMW（自带等待）、调用点 :2392 另有一个 WAIT——两次等键
  // 都要还原：缺了前者，这个等待会落在那之后的下一行输出上
  const exp_line = fixture.lines_history.find(
    (l) => l.type === 'text' && l.text.includes('获得了2点经验值'),
  );
  assert.ok(exp_line, '结算播报行');
  assert.ok(
    fixture.waits.some((w) => w.waited && w.rows_at_wait === exp_line.row + 1),
    ':298 PRINTFORMW 的等待',
  );
});

test('素质变化三事件接线：EVENT_NEXTDAY 命中触发条件时不再打占位行', async () => {
  const fixture = setup_chara_events();
  fixture.store.set('talentname:57', '漏尿癖');
  fixture.store.set('talent:31:57', 0);
  fixture.store.set('talent:31:132', 1); // 幼稚
  fixture.store.set('exp:31:31', 15); // 放尿经验 15 以上
  const { run_event_nextday } = fixture.load_module('event/event-nextday');

  await run_event_nextday();

  assert.equal(fixture.store.get('talent:31:57'), 1, '经日循环获得【漏尿癖】');
  assert(
    !fixture
      .text_lines()
      .some((t) => t.includes('原作 @') && t.includes('EVENT_MORASI')),
    '占位行必须消失',
  );
});

// —— 随机上界（#298 覆盖面：RAND:N 的 N 是字面量，改错等于改概率分布）——

/** 记录每次 RAND:N 收到的上界并恒返回 0 的探针（只要上界、不要命中） */
function bound_probe(bounds) {
  return (n) => {
    bounds.push(n);
    return 0;
  };
}

test('随机上界：事件侧每个 RAND:N 的 n 逐个钉住（表驱动）', async () => {
  // 序列按「代码里遇到 rand(n) 的先后」排列，注释逐位对上调用点
  const cases = [
    {
      label: '处女献上：S = -RAND:3（唯一一次掷）',
      setup: (fixture) => {
        join_slave_chara(fixture, 31, '温妮');
        fixture.store.set('talent:0:122', 1);
        fixture.store.set('flag:10005', 31);
        fixture.store.set('talent:31:0', 1);
        fixture.store.set('talent:31:85', 1);
        fixture.store.set('abl:31:10', 6);
        fixture.store.set('abl:31:11', 5);
        fixture.store.set('abl:31:16', 5);
        fixture.store.set('base:31:0', 1000);
        fixture.set_inputs(0);
      },
      drive: (fixture, rand) =>
        fixture.load_module('event/event-nextday').offervirgin_check(rand),
      expected: [3],
    },
    {
      label: '朝フェラ：E = RAND:F（F = 合格人数 2）',
      setup: (fixture) => {
        fixture.store.set('talent:0:122', 1);
        for (const cid of [31, 32]) {
          join_slave_chara(fixture, cid, `奴隶${cid}`);
          fixture.store.set(`abl:${cid}:11`, 4);
          fixture.store.set(`abl:${cid}:16`, 4);
          fixture.store.set(`abl:${cid}:32`, 1);
          fixture.store.set(`base:${cid}:0`, 1000);
        }
      },
      drive: (fixture, rand) =>
        fixture.load_module('event/event-nextday').morning_fellatio(rand),
      expected: [2],
    },
    {
      label: '尿床：准入 RAND:12 + 导管一档 RAND:4',
      setup: (fixture) => {
        join_slave_chara(fixture, 31, '温妮');
        fixture.store.set('talent:31:57', 1);
        fixture.store.set('exp:31:31', 30);
        fixture.store.set('base:31:0', 1000);
        fixture.store.set('cflag:31:42', 99);
        fixture.store.set('cflag:31:40', 64);
        fixture.store.set('flag:37', 1);
        fixture.store.set('abl:31:10', 1);
      },
      drive: (fixture, rand) =>
        fixture.load_module('event/event-nextday').onesho(rand),
      expected: [12, 4],
    },
    {
      label: '尿床：准入 RAND:12 + 导管三档 RAND:3',
      setup: (fixture) => {
        join_slave_chara(fixture, 31, '温妮');
        fixture.store.set('talent:31:57', 1);
        fixture.store.set('exp:31:31', 30);
        fixture.store.set('base:31:0', 1000);
        fixture.store.set('cflag:31:42', 98);
        fixture.store.set('cflag:31:40', 64);
        fixture.store.set('flag:37', 1);
        fixture.store.set('abl:31:10', 6);
      },
      drive: (fixture, rand) =>
        fixture.load_module('event/event-nextday').onesho(rand),
      expected: [12, 3],
    },
    {
      label: '夜这い：RAND:(合格人数 2)',
      setup: (fixture) => {
        fixture.store.set('talent:0:122', 1);
        for (const cid of [31, 32]) {
          join_slave_chara(fixture, cid, `奴隶${cid}`);
          fixture.store.set(`abl:${cid}:10`, 5);
          fixture.store.set(`abl:${cid}:11`, 4);
          fixture.store.set(`abl:${cid}:30`, 1);
          fixture.store.set(`abl:${cid}:2`, 6);
          fixture.store.set(`abl:${cid}:3`, 5);
          fixture.store.set(`base:${cid}:0`, 1000);
          fixture.store.set(`cflag:${cid}:0`, 1);
        }
      },
      drive: (fixture, rand) =>
        fixture.load_module('event/event-nextday').night_stalking_check(rand),
      expected: [2],
    },
    {
      label: '遛狗：RAND:(CHARANUM-1) = RAND:2（三位角色）',
      setup: (fixture) => {
        fixture.store.set('item:22', 1);
        for (const cid of [31, 32]) {
          join_slave_chara(fixture, cid, `奴隶${cid}`);
          fixture.store.set(`cflag:${cid}:0`, 1);
          fixture.store.set(`cflag:${cid}:1`, 0);
          fixture.store.set(`base:${cid}:0`, 1000);
          fixture.store.set(`abl:${cid}:39`, 1);
          fixture.store.set(`abl:${cid}:17`, 3);
        }
        fixture.store.set('flag:10005', -1);
      },
      drive: (fixture, rand) =>
        fixture.load_module('event/event-nextday').dog_walk(rand),
      expected: [2],
    },
  ];

  for (const { label, setup, drive, expected } of cases) {
    const fixture = create_era_fixture();
    fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
    fixture.era.addCharacter(0);
    setup(fixture);
    const bounds = [];
    await drive(fixture, bound_probe(bounds));
    assert.deepEqual(bounds, expected, label);
  }
});

test('随机上界：示众台每个 RAND:N 的 n 逐个钉住（表驱动）', async () => {
  const cases = [
    {
      label:
        '处女支：RAND:5（侵犯者）→ RAND:6（涂鸦）→ RAND:20/10/10（次数）→ ' +
        'RAND:14（通用涂鸦）→ RAND:4/RAND:3（正字两槽）→ RAND:3（叙述）',
      setup: (fixture) => {
        join_slave_chara(fixture, 31, '温妮');
        fixture.store.set('cflag:31:1', 8);
        fixture.store.set('flag:10005', 31);
        fixture.store.set('talent:31:0', 1);
      },
      expected: [5, 6, 20, 10, 10, 14, 4, 3, 3],
    },
    {
      label:
        '兽奸支 + 全素质：RAND:5 → 姿态 3 → 涂鸦 3 → 职业 3 → 兽奸判定 2 → ' +
        '兽奸标签 3 → 次数 10×4 → 各素质 3/5/3/3/3 → 通用 14 → 追加涂鸦 10 → ' +
        '正字 5/4/3 → 叙述 3',
      setup: (fixture) => {
        join_slave_chara(fixture, 31, '温妮');
        fixture.store.set('cflag:31:1', 8);
        fixture.store.set('flag:10005', 31);
        fixture.store.set('abl:31:39', 1);
        for (const n of [200, 15, 61, 100, 121, 140, 153]) {
          fixture.store.set(`talent:31:${n}`, 1);
        }
        fixture.store.set('cflag:31:661', 40);
      },
      expected: [
        5, 3, 3, 3, 2, 3, 10, 10, 10, 10, 3, 5, 3, 3, 3, 14, 10, 5, 4, 3, 3,
      ],
    },
  ];

  for (const { label, setup, expected } of cases) {
    const fixture = create_era_fixture();
    fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
    fixture.era.addCharacter(0);
    setup(fixture);
    const bounds = [];
    await fixture
      .load_module('event/event-nextday-pillory')
      .pillory(bound_probe(bounds));
    assert.deepEqual(bounds, expected, label);
  }
});

test('#502 SENGEN_VIDEO_DE 每日结算：9013 必减、9012 有 2/3 概率减，任一落到 0 以下两者清零', () => {
  // rand 的入参即 RAND:N 的上界（N == 3），顺带钉住上界
  const cases = [
    { expire: 3, popularity: 5, roll: 1, after: [2, 4], why: '两枚都减' },
    {
      expire: 3,
      popularity: 5,
      roll: 0,
      after: [2, 5],
      why: 'RAND:3 == 0 时只减 9013',
    },
    {
      expire: 2,
      popularity: 9,
      roll: 2,
      after: [1, 8],
      why: '非零即真（取值 1/2 都算真）',
    },
    {
      expire: 1,
      popularity: 5,
      roll: 1,
      after: [0, 0],
      why: '9013 落到 0 → 两段清零',
    },
    {
      expire: 5,
      popularity: 0,
      roll: 1,
      after: [0, 0],
      why: '9012 落到 -1 → 第二段清零',
    },
    {
      expire: 5,
      popularity: 0,
      roll: 0,
      after: [0, 0],
      why: '9012 本就是 0 → 第二段清零',
    },
    {
      expire: 0,
      popularity: 0,
      roll: 1,
      after: [0, 0],
      why: '两者皆 0：减到 -1 后回 0',
    },
  ];
  for (const { expire, popularity, roll, after, why } of cases) {
    const fixture = create_era_fixture();
    fixture.store.set('exflag:9013', expire);
    fixture.store.set('exflag:9012', popularity);
    const uppers = [];
    const { sengen_video_de } = fixture.load_module('event/event-nextday');
    sengen_video_de((upper) => {
      uppers.push(upper);
      return roll;
    });
    assert.deepEqual(uppers, [3], 'RAND:3 的上界');
    assert.deepEqual(
      [fixture.store.get('exflag:9013'), fixture.store.get('exflag:9012')],
      after,
      `${why}（${expire}/${popularity} + roll ${roll} → ${after.join('/')}）`,
    );
    assert.deepEqual(fixture.text_lines(), [], '无输出（原作无 PRINT）');
  }
});

test('#502 SENGEN_VIDEO_DE 在 run_event_nextday 的 :184 被无条件每日调用', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  fixture.load_module('dungeon/monster-summon').summon_monster = async () => 0;
  fixture.store.set('exflag:9013', 4);
  fixture.store.set('exflag:9012', 6);
  const { run_event_nextday } = fixture.load_module('event/event-nextday');

  fixture.override_math_random(() => 0.9); // RAND:3 = 2 → 9012 也减
  try {
    await run_event_nextday();
  } finally {
    fixture.restore_math_random();
  }
  assert.equal(fixture.store.get('exflag:9013'), 3, '过时倒计时每日 -1');
  assert.equal(fixture.store.get('exflag:9012'), 5, '流行度随 RAND:3 非零 -1');
});

test('存根清单核对：两模块的 STUBBED_CALLS 全部收录进 docs/stub-registry.md', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS: nextday_stubs } = fixture.load_module(
    'event/event-nextday',
  );
  const { STUBBED_CALLS: nextmonth_stubs } = fixture.load_module(
    'event/event-nextmonth',
  );
  // 名单本身固定（增删存根必须同步本测试与清单）
  assert.deepEqual(
    nextday_stubs,
    [
      // #174 起 CURSE_EQUIP_RING 换真身（ere/system/equip/equip-curse.js）；
      // #177 起 DUNGEON_ROOM_DAY 换真身（ere/dungeon/dungeon-room.js）；
      // #400（N16）起 APHRODISIAC_ADDICT / SABBATH / SABBATH_DAY / TAX_GET
      // 四张跨边接线落地（真身由 #405 / #396 交付），MAOU_KOUHO 本体同票落成；
      // @PILLORY 自 #400 起真身（ere/event/event-nextday-pillory.js），其体内的
      // CAMPAIGN_EXP_PILLORY 调用点（侵略域）自 #469 起也换真身，已从名单移除；
      // #502 起 SENGEN_VIDEO_DE 换真身（本文件的 sengen_video_de，
      // INVASION.ERB:1269-1281）——名单至此清空
    ],
    'SENGEN_VIDEO_DE 落地后本模块零存根',
  );
  // HUMAN_AGE_GENERATE 自 #385 起为真身（ere/chara/chara-body.js），本模块
  // 的存根名单已清空
  assert.deepEqual(nextmonth_stubs, []);
  const registry = fs.readFileSync(
    path.resolve(__dirname, '..', 'docs', 'stub-registry.md'),
    'utf8',
  );
  for (const name of [...nextday_stubs, ...nextmonth_stubs]) {
    assert(registry.includes(name), `存根清单缺少 ${name}`);
  }
  // 登记不占位的影寿命段（不可达）也必须可检索
  assert(registry.includes('影の寿命'), '存根清单缺少影寿命段（登记不占位）');
});
