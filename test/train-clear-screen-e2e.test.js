'use strict';

/**
 * 端到端：调教每一轮换屏（issue #722，ADR-0009「每一屏开始前整屏清空」）。
 *
 * 调教回合循环每轮回 SHOW_STATUS 时换屏后绘制，指令菜单绘制完的屏幕行数
 * 不随执行轮数增长，画面上只留当前一屏的状态与菜单——这是换屏规则的
 * 直接可观察契约（#720 用户故事 3/17）。驱动覆盖三类轮次：
 *   - 正常指令轮（COM0 爱抚）：结算展示与口上留在同一屏累积，下一轮换屏；
 *   - 被拒绝的指令轮（COM3 自慰的执行判定不过 → 回合取消）；
 *   - 无效输入轮（missing 指令 35 全身擦洗、USERCOM 的过滤翻转 105）。
 *
 * 缝 = test/helpers/era-fixture.js：SHOW_USERCOM 链尾（TIER.LATER 探针）
 * 记录每轮菜单绘制完的行数与屏上日期行份数；unread_output_clears 断言
 * 换屏前没有未经按键确认的输出（#721 的检查面）。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_gamebase } = require('./helpers/gamebase');
const { preset_chara_0, join_slave_chara } = require('./helpers/chara');

// SHOW_STATUS 日期行的文本（DAY:0 = 0、TIME = 0 时）；每轮换屏后屏上
// 恰一份——追加绘制会逐轮累积份数，这是换屏语义最直接的断言面
const DATE_LINE = '1日(午前)';

// 菜单屏行数允许的轮间波动上限：状态画面的条件行（绝顶计数、射精/母乳
// 条等按调教状态出现）与指令按钮数（COM_ABLE 随装备/道具变化）都是
// 玩家行为的函数，行数小幅波动合法；换屏失效时每轮追加约几十行，
// 远超此界
const ROW_SPREAD_LIMIT = 3;

function seed_train_world(fixture) {
  preset_gamebase(fixture);
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 17, '玛奥');
  // 体力气力：防死亡/气力０分支（与 event-corrupt-e2e 同款播种）
  fixture.store.set('base:0:0', 10000);
  fixture.store.set('maxbase:0:0', 10000);
  fixture.store.set('base:0:1', 10000);
  fixture.store.set('maxbase:0:1', 10000);
  fixture.store.set('base:17:0', 2000);
  fixture.store.set('maxbase:17:0', 2000);
  fixture.store.set('base:17:1', 2000);
  fixture.store.set('maxbase:17:1', 2000);

  fixture.load_module('event/event-train');
  fixture.load_module('event/event-end');
  fixture.load_module('event/event-com');
  fixture.load_module('event/event-comend');
  fixture.load_module('event/source-check');
  fixture.load_module('page/page-train');
  fixture.load_module('page/page-usercom');
  fixture.load_module('system/train/com-caress');
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 17;
  era_flag.player = 0;
  era_flag.assi = -1;
  return era_flag;
}

test('端到端：调教每轮换屏——菜单屏行数有界、画面只留当前一屏（#722）', async () => {
  const fixture = create_era_fixture();
  seed_train_world(fixture);

  const menu_rows = [];
  const date_line_counts = [];
  const { on, TIER } = fixture.load_module('system/event/registry');
  // 链尾探针：主绘制处理器跑完后读数——「这一轮菜单画完时屏幕长什么样」
  on(
    'SHOW_USERCOM',
    async () => {
      menu_rows.push(fixture.era.getLineCount());
      date_line_counts.push(
        fixture.text_lines().filter((t) => t === DATE_LINE).length,
      );
    },
    TIER.LATER,
  );

  // 输入序列（一轮一枚 menu input，等键不占队列）：
  //   0   爱抚（正常指令轮，两次）
  //   35  全身擦洗的紧凑序号——指令未实现（missing），丢弃输入回循环头
  //   3   自慰——新档目标的执行判定不过（实行值不足），回合取消
  //   105 器具系过滤翻转（USERCOM 链尾语义：无分支输出，重绘回合画面）
  //   0   再来一轮爱抚（重复同指令也换屏）
  //   999 调教结束 → AFTERTRAIN；999 = JUEL_CHECK 交互循环退出
  fixture.set_inputs(0, 0, 35, 3, 105, 0, 999, 999);
  const { run_train, run_aftertrain } = fixture.load_module(
    'system/train/train-loop',
  );

  assert.equal(await run_train(), 'AFTERTRAIN');
  assert.equal(await run_aftertrain(), 'TURNEND');

  // 七轮菜单（六次选择 + 退出键 999 之前的那一轮）都被探针看到
  assert.equal(menu_rows.length, 7, '应走过七轮指令菜单');

  // 行数有界：任意两轮的行数差在固定小界内（不随轮数增长）
  assert.ok(
    Math.max(...menu_rows) - Math.min(...menu_rows) <= ROW_SPREAD_LIMIT,
    `菜单屏行数应收敛在 ±${ROW_SPREAD_LIMIT} 行内，实测 ${menu_rows.join(', ')}`,
  );
  // 第 1 轮与第 N 轮：同为爱抚轮，行数相同或差固定的一行（第 2 轮起
  // 恒有「＜上次的调教指令：…＞」行，首轮 prevcom = -1 没有）——这就是
  // 验收标准的「相同或有固定上限」
  assert.ok(
    menu_rows.every((r) => r === menu_rows[0] || r === menu_rows[0] + 1),
    `各轮菜单屏行数应等于首轮 ${menu_rows[0]} 或恰多一行（上次的调教指令行），实测 ${menu_rows.join(', ')}`,
  );

  // 画面只留当前一屏：每轮菜单绘制完，屏上状态画面的日期行恰一份
  assert.ok(
    date_line_counts.every((c) => c === 1),
    `每轮屏上日期行应恰一份，实测 ${date_line_counts.join(', ')}`,
  );

  // 换屏前不允许有未经按键确认的输出（#721 夹具检查）
  assert.deepEqual(
    fixture.unread_output_clears,
    [],
    '整屏清空抹掉了未读输出（ADR-0009：换屏前的输出先经按键确认）',
  );
});

test('端到端：调教每轮换屏——被拒绝与无效输入轮的结算输出也留屏到换屏（#722）', async () => {
  const fixture = create_era_fixture();
  seed_train_world(fixture);

  // 只走被拒轮（COM3 判定行有输出+等键，回合取消）与 missing 轮
  fixture.set_inputs(3, 35, 999, 999);
  const { run_train, run_aftertrain } = fixture.load_module(
    'system/train/train-loop',
  );

  assert.equal(await run_train(), 'AFTERTRAIN');
  assert.equal(await run_aftertrain(), 'TURNEND');

  // COM3 的判定行（指令名「自慰」+ 实行值算式）真的输出过——被拒轮不是
  // 静默路径，它的输出同样受「换屏前先确认」保护
  assert(
    fixture.lines_history.some((l) => l.text === '自慰'),
    '被拒轮应输出指令名标题行',
  );
  assert(
    fixture.lines_history.some((l) => (l.text ?? '').includes('实行值')),
    '被拒轮应输出执行判定的算式行',
  );
  assert.deepEqual(
    fixture.unread_output_clears,
    [],
    '被拒轮/无效输入轮的输出在换屏前须经按键确认',
  );
});
