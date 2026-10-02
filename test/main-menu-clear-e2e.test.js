/**
 * 端到端验收（#723 / ADR-0009「每一屏开始前整屏清空」）：主菜单与过天换屏。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一注入点，#16）。照
 * 标题 → 新游戏 → EVENTFIRST 村娘线的启动序列，
 * 驱动「主菜单 → 选 199 休息 → EVENTTURNEND → 回主菜单」连续多轮，断言两件事：
 *
 * 1. 每次绘制完主菜单后的屏幕行数不随轮数增长——第 1 轮与第 N 轮相同
 *    （换屏前历史只增不减、引擎输入耗时与行数成正比，正是 #720 要修的病）。
 *    采样点在 run_shop 以 BeginSignal(TURNEND) 离开的瞬间：此刻主菜单刚画完、
 *    玩家按过选择键（回显行 +1）、休息报文已打印——每轮的屏幕内容同构，
 *    行数相同即「主菜单之上没有残留」。
 * 2. 未读输出检查（#721 的 fixture.unread_output_clears）为空——过天链的
 *    事件播报在换屏前都经过按键确认。
 *
 * 只需要角色 0（魔王）与 17（玛奥，村娘线拉入），不打结局，同
 * 村娘线的最小角色面。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_gamebase } = require('./helpers/gamebase');

/** 接住 BeginSignal 并断言目标状态（run_shop 经 begin() 的转场以异常上抛，正常返回即没到站） */
async function expect_signal(promise, state, BeginSignal, what) {
  try {
    await promise;
  } catch (e) {
    if (e instanceof BeginSignal && e.state === state) {
      return;
    }
    throw e;
  }
  assert.fail(`${what} 应以 BeginSignal(${state}) 离开，却正常返回了`);
}

test('端到端：主菜单与过天换屏——反复过天，主菜单行数不增长（#723）', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  fixture.seed_chara(0, { name: '你', callname: '你' });
  fixture.seed_chara(17, { name: '玛奥', callname: '玛奥' });
  for (const idx of [0, 1, 2]) {
    fixture.store.set(`base:0:${idx}`, 10000);
    fixture.store.set(`maxbase:0:${idx}`, 10000);
  }
  for (const idx of [0, 1]) {
    fixture.store.set(`base:17:${idx}`, 1500);
    fixture.store.set(`maxbase:17:${idx}`, 1500);
  }

  fixture.load_module('system/flow/main-loop'); // 顶层 require 注册事件处理器
  const run_title_page = fixture.load_module('page/page-title');
  const { run_shop } = fixture.load_module('page/page-shop');
  const { emit } = fixture.load_module('system/event/registry');
  const { BeginSignal } = fixture.load_module('system/flow/begin-signal');
  const era_flag = fixture.load_module('era-utils/era-flag');

  // 关勇者来袭：避免无关随机消费打乱本用例未种子化的输入序列
  fixture.disable_enter_enemy();

  // —— 新档：标题画面选「新的猎物」[1] → 新游戏四件套 → BEGIN FIRST ——
  fixture.set_inputs(1);
  await expect_signal(run_title_page(), 'FIRST', BeginSignal, '标题画面新游戏');

  // —— EVENTFIRST（五问）：女性 [1]、扶她 [2]、村娘 [1]、普通 [0]、抱起 [1] ——
  fixture.set_inputs(1, 2, 1, 0, 1);
  const first_exit = await emit('EVENTFIRST');
  assert.equal(first_exit, 'SHOP', '初始化的出口必是 BEGIN SHOP');

  const ROUND_COUNT = 4;
  const row_samples = [];
  for (let round = 0; round < ROUND_COUNT; round += 1) {
    // TIME 置 1（下午）：199 休息后才进次日（TIME==1 时 CALL EVENT_NEXTDAY）
    era_flag.time = 1;

    // 主菜单绘制 → 选 199（休息）→ begin(TURNEND) 上抛
    fixture.set_inputs(199);
    await expect_signal(
      run_shop(),
      'TURNEND',
      BeginSignal,
      `第${round + 1}轮休息`,
    );
    // 采样：此刻屏幕上只有「主菜单 + 输入回显 + 休息报文」，别无残留
    row_samples.push(fixture.era.getLineCount());

    // EVENTTURNEND 链（时段/日期推进 + 全角色结算）→ 回 SHOP
    const pending = await emit('EVENTTURNEND');
    assert.equal(pending, 'SHOP', '回合结算的出口必是 BEGIN SHOP');
    assert.equal(era_flag.time, 0, '次日回到午前');
  }

  assert.equal(
    new Set(row_samples).size,
    1,
    `各轮主菜单行数必须相同：${row_samples}`,
  );

  // —— 未读输出检查（#721）：整屏清空前不允许有未经按键确认的输出 ——
  assert.deepEqual(
    fixture.unread_output_clears,
    [],
    '整屏清空抹掉了未读输出（换屏规则 ADR-0009：换屏前的输出先经按键确认）',
  );
});
