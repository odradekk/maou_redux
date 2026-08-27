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
  fixture.load_module('event/event-turnend');
  fixture.load_module('system/turnend-settle');
  fixture.load_module('event/event-turnend-later');
  const { emit } = fixture.load_module('system/event/registry');
  const era_flag = fixture.load_module('era-utils/era-flag');
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

test('跨年的年龄增长：奴隶 452 +1、451 落 0（换算存根），魔王不涨', async () => {
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
  assert.equal(
    world.fixture.store.get('cflag:31:451'),
    0,
    '奴隶的年龄应写入换算结果（存根 RESULT 0）',
  );
  assert.equal(
    stub_count(world.fixture.text_lines(), 'HUMAN_AGE_GENERATE'),
    1,
    '换算存根恰好占位一次',
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

test('单元级全量写入：EVENT_NEXTDAY 只写 FLAG:61；EVENT_NEWDAY 经 ENDCHECK 追加清场与反叛写', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  fixture.store.set('flag:61', 3); // 熏香使用次数非零，验证清零
  const { run_event_nextday, run_event_newday } = fixture.load_module(
    'event/event-nextday',
  );

  await run_event_nextday();
  assert.deepEqual(
    fixture.var_writes,
    [{ name: 'flag:61', value: 0 }],
    '只有魔王（循环全跳过）时，EVENT_NEXTDAY 的唯一写入是熏香清零',
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

test('执行序：EVENT_NEXTDAY 先于日推进（月替播报在其后）、ENDCHECK 在普通档尾部', async () => {
  const world = setup_nextday();
  join_slave_chara(world.fixture, 31, '温妮');
  // 银黑桃 21 在场：ENDCHECK（#116 真调用）进入 ENDCHECKCHARA 时会打
  // ENDCHECKSPADE 存根行——它就是 ENDCHECK 执行的直接可见证据
  join_slave_chara(world.fixture, 21, '银黑桃');
  world.era_flag.month = 2;
  world.era_flag.date = 28;
  world.era_flag.time = 1;

  await world.emit('EVENTTURNEND');

  const texts = world.fixture.text_lines();
  const tax = texts.findIndex((line) => line.includes('@TAX_GET')); // NEXTDAY 尾部
  const month_roll = texts.findIndex((line) => line.includes('明天就是3月了')); // NEXTMONTH（在 :84，DAY 推进之后）
  const endcheck = texts.findIndex((line) =>
    line.includes('原作 @ENDCHECKSPADE，'),
  ); // ENDCHECK 内部（@EVENT_NEWDAY :241 之后）
  const campaign = texts.findIndex((line) =>
    line.includes('@CAMPAIGN_GAMEOVER'),
  ); // 普通档尾部
  assert.ok(tax >= 0 && month_roll >= 0 && endcheck >= 0 && campaign >= 0);
  assert.ok(
    tax < month_roll,
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

test('存根清单核对：两模块的 STUBBED_CALLS 全部收录进 docs/stub-registry.md', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS: nextday_stubs } = fixture.load_module(
    'event/event-nextday',
  );
  const { STUBBED_CALLS: nextmonth_stubs } = fixture.load_module(
    'event/event-nextmonth',
  );
  // 名单本身固定（增删存根必须同步本测试与清单）
  assert.deepEqual(nextday_stubs, [
    'EVENT_FUTA_F',
    'EVENT_MORASI',
    'EVENT_YOUJI',
    'EVENT_MAZOKU',
    'APHRODISIAC_ADDICT',
    'SOUL_DISLOCATION',
    'NINSIN_MAIN',
    'OFFERVIRGIN_CHECK',
    'NIGHT_STALKING_CHECK',
    // #174 起 CURSE_EQUIP_RING 换真身（ere/system/equip/equip-curse.js）
    'SUMMON_MONSTER',
    'DUNGEON_ROOM_DAY',
    'PILLORY',
    'SABBATH',
    'SABBATH_DAY',
    'NTR_VIDEO',
    'EVENT_VIDEO_DAY',
    'KARMA',
    'FAITH',
    'TAX_GET',
    'SENGEN_VIDEO_DE',
    'MAOU_KOUHO',
    'MORNING_FELLATIO',
    'ONESHO',
    'DOG_WALK',
  ]);
  assert.deepEqual(nextmonth_stubs, ['HUMAN_AGE_GENERATE']);
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
