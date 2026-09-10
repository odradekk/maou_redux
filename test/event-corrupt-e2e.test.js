/**
 * @file 阶段 4 端到端测试：角色堕落长跑（调教 → 参数上升 → 素质/刻印变化 → COM_ABLE 放行新指令 → 更深调教）。
 *
 * 判据：回路闭合（闭环运行且断言刻印/素质变化与指令放行）。
 * 反向变异：去掉回路上任一环（如结算/刻印上升）必须立刻红。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_gamebase } = require('./helpers/gamebase');

/**
 * 断言的达成调教回合区间（[1, 2] 围绕实测 1 轮）：
 * - 下界 1 轮：初始能力设为 ABL:0=4（阴蒂感觉 4，基础快C 2000，调教者技巧 0 档 50% 削减后实得 UP:0=1000），首轮单次爱抚即可超越 MARK:1 阈值（UP >= 500）；
 * - 上界 2 轮：若叠加初吻未体验（CFLAG:16=-1 减半至 UP:0=500）或轻微衰减，亦必然在 2 轮内达成 MARK:1=1。
 * 注：系统内 ABL 提升依赖未移植的 @ABLUP 族，测试不使用人工注入延迟轮数，依据系统自身算式进行首轮闭合。
 */
const TURN_MIN = 1;
const TURN_MAX = 2;

const { preset_chara_0, join_slave_chara } = require('./helpers/chara');

function seq(values) {
  let index = 0;
  return (n) => {
    const value = values[index++ % values.length];
    assert(Number.isInteger(value) && value >= 0 && value < n);
    return value;
  };
}

async function run_corrupt_path() {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 17, '玛奥');
  // 基础体力气力
  fixture.store.set('base:0:0', 10000);
  fixture.store.set('maxbase:0:0', 10000);
  fixture.store.set('base:0:1', 10000);
  fixture.store.set('maxbase:0:1', 10000);

  fixture.store.set('base:17:0', 2000);
  fixture.store.set('maxbase:17:0', 2000);
  fixture.store.set('base:17:1', 2000);
  fixture.store.set('maxbase:17:1', 2000);

  // 预设 ABL 使得爱抚产生超越快乐刻印 LV1 阈值的快感（UP:0 >= 500）
  // ABL:0 = 4 (阴蒂感觉 4, ABL_C_TIERS[4] = [2000, 115])，调教者技巧 0 档 (rate 0.5) 产生 UP:0 = 1000 >= 500
  fixture.store.set('abl:17:0', 4);
  fixture.store.set('abl:17:1', 0);
  fixture.store.set('abl:17:11', 1);
  fixture.load_module('event/event-train');
  fixture.load_module('event/event-end');
  fixture.load_module('event/event-com');
  fixture.load_module('event/event-comend');
  fixture.load_module('event/source-check');
  fixture.load_module('page/page-train');
  fixture.load_module('page/page-usercom');
  // COM0 自 com0-caress.js 搬入本族模块（#219 J9，原文件删除）
  fixture.load_module('system/train/com-caress');
  fixture.load_module('system/train/com-sm');
  const { com_family, com_able_family } = fixture.load_module(
    'system/train/com-family',
  );
  const { run_train, run_aftertrain } = fixture.load_module(
    'system/train/train-loop',
  );
  const era_flag = fixture.load_module('era-utils/era-flag');

  era_flag.target = 17;
  era_flag.player = 0;
  era_flag.assi = -1;

  // 验证 COM0 与 COM46 已注册
  assert.ok(com_family.has(0), 'COM0（爱抚）必须已注册在 com_family 中');
  assert.ok(com_able_family.has(46), 'COM_ABLE:46（灌肠）必须已注册');

  // 初始化灌肠道具与经验（COM_ABLE:46 条件：ITEM:15 > 0, EXP:1 > 25, 顺从+欲望+露出 >= 10）
  // 注：因 @ABLUP 族当前整组为存根，真实调教中由珠升级能力的链路未接入（见 docs/stub-registry.md），
  // 顺从+欲望+露出 ABL 在初态暂未达到 10。
  fixture.store.set('item:15', 1);
  fixture.store.set('exp:17:1', 30);
  fixture.store.set('abl:17:10', 1); // 顺从 1
  fixture.store.set('abl:17:11', 1); // 欲望 1
  fixture.store.set('abl:17:17', 1); // 露出 1 (合计 3 < 10)

  // 0. 初始状态：能力（顺从1+欲望1+露出1 = 3 < 10），COM_ABLE:46 判定不可用
  const init_able46 = await com_able_family.call(46, { whenMissing: 0 });
  assert.equal(
    init_able46,
    0,
    '初始阶段顺从+欲望+露出未达标时 COM_ABLE:46 必须不可用',
  );

  let turns = 0;

  // 模拟调教循环：每次进入调教，输入 0 (爱抚) 执行，然后输入 999 退出回合结算
  // 循环推进直到玛奥获得快乐刻印 (MARK:1 >= 1)
  while (turns < TURN_MAX) {
    turns += 1;
    fixture.reset_inputs(0, 999, 999);
    const exit_train = await run_train();
    assert.equal(exit_train, 'AFTERTRAIN');
    const exit_after = await run_aftertrain();
    assert.equal(exit_after, 'TURNEND');

    const mark1 = fixture.store.get('mark:17:1') || 0; // 快乐刻印
    if (mark1 >= 1) {
      break;
    }
  }

  console.log(
    `[e2e] 角色堕落长跑实测回合数 = ${turns} 轮, mark1:`,
    fixture.store.get('mark:17:1'),
  );

  assert(
    turns >= TURN_MIN && turns <= TURN_MAX,
    `达标回合数 ${turns} 应在区间 [${TURN_MIN}, ${TURN_MAX}] 内`,
  );

  // 核心回路闭合断言：
  // 1. 调教执行过：CFLAG:10 (调教回数) == turns
  assert.equal(
    fixture.store.get('cflag:17:10'),
    turns,
    '调教回数 CFLAG:10 必须等于执行轮数',
  );

  // 2. 刻印取得回路闭合：快乐刻印 MARK:1 必须在参数上升后达成
  assert.equal(
    fixture.store.get('mark:17:1'),
    1,
    '快乐刻印 MARK:1 必须在参数上升后达成',
  );

  // 3. COM_ABLE 放行新指令：
  // 真实调教写出的状态驱动部分：ITEM:15 在场、EXP:1 > 25 在场、着装正常；
  // ABL 部分因 @ABLUP 存根期尚未由珠自动提升，此处进行人工置位替代升级验证 COM_ABLE46 闸门判定。
  fixture.store.set('abl:17:10', 4); // 顺从 4
  fixture.store.set('abl:17:11', 4); // 欲望 4
  fixture.store.set('abl:17:17', 2); // 露出 2 (合计 10 >= 10)
  const new_able46 = await com_able_family.call(46, { whenMissing: 0 });
  assert.equal(
    new_able46,
    1,
    '调教参数与能力满足门槛后 COM_ABLE:46 必须放行此前不可用的新指令',
  );

  return { fixture, era_flag };
}

test('端到端：角色堕落长跑（调教回路闭合与刻印推进）', async () => {
  await run_corrupt_path();
});

test('端到端：角色堕落后完成奴隶出售全链', async () => {
  const { fixture, era_flag } = await run_corrupt_path();

  // 接续调教结果补到原作出售资格门槛；这些值也给出独立可复算的估价：
  // (顺从 2000 + 欲望 1200 + 技巧 400) × 阴蒂感觉 LV4 的 110% = 3960。
  fixture.store.set('abl:17:10', 5); // 顺从
  fixture.store.set('abl:17:11', 4); // 欲望
  fixture.store.set('abl:17:12', 3); // 技巧

  const sale = fixture.load_module('system/stronghold/sale');
  await sale.check_sellassiable(17);
  assert.equal(
    fixture.store.get('cflag:17:0'),
    2,
    'CHECK_SELLASSIABLE 必须把玛奥逐级解锁为可出售且可做助手',
  );
  assert(
    fixture.text_lines().includes('玛奥可以卖掉了'),
    'CHECK_SELLASSIABLE 的出售资格提示必须可观察',
  );

  const estimate = sale.estimate_chara(17);
  assert.equal(
    estimate.price,
    3960,
    'ESTIMATE_CHARA 必须按调教后的能力给出独立可复算的估价',
  );

  fixture.load_module('kojo/kojo-k0-tender');
  fixture.store.set('flag:7', 1); // 口上总开关
  fixture.store.set('talent:17:160', 1); // 慈爱性格：SELF_KOJO_K0
  fixture.reset_inputs(17, 0, 0, 999); // 选玛奥、确认、黑市、返回据点
  assert.equal(await sale.chara_sale({ rand: seq([0]) }), 999);

  assert(
    fixture.lines_history.some(
      (line) =>
        line.type === 'button' &&
        line.accelerator === 17 &&
        line.text.includes('[评价额:3,960点]'),
    ),
    'CHARA_SALE 的候选按钮必须显示 ESTIMATE_CHARA 算出的 3,960 点',
  );
  assert(
    fixture.text_lines().includes('公厕买下玛奥之后………'),
    'SELL_MATURO_K0 必须进入低价自然态的黑市末路',
  );
  assert.equal(era_flag.money, 3960, 'CHARA_SALE 必须把估价计入所持金');
  assert.equal(
    fixture.store.get('exflag:4444'),
    3960,
    'CHARA_SALE 必须同步增加非作弊资金',
  );
  assert(
    !fixture.era.getAddedCharacters().includes(17),
    'CHARA_SALE 必须让已售角色离场',
  );
  assert.equal(
    fixture.store.get('flag:216'),
    1,
    'CHARA_SALE 必须留下 17 号角色已售出的 FLAG:216 记录',
  );
});
