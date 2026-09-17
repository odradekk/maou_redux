/**
 * 阶段 5b 段 5 收口的端到端验收（issue #406）：「据点一日循环」进 `npm test`。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一注入点，#16）。照
 * test/event-ending-e2e.test.js 的形状——同样的新档启动序列（标题 → 新游戏
 * → @EVENTFIRST 村娘线），但驱动的不是「打到 ENDING_1」，是票面点名的这条
 * 链（主菜单 → 选 199 休息 → @EVENTTURNEND → TIME==1 时 CALL EVENT_NEXTDAY
 * → 日期推进 → BEGIN SHOP 回主菜单），断言全部落在可观察契约上（日期真的
 * 推进、税率真的涨了 5、回到主菜单后循环真的还能再走一轮）——不断言中间
 * 函数被调了几次。
 *
 * 只需要角色 0（魔王，标题新游戏加入）与 17（玛奥，村娘线拉入），不需要
 * event-ending-e2e 额外准备的 35（菲娅，ENDING_1 专用）——本用例不打结局。
 *
 * TIME（era_flag.time，flag:10003）显式置 1（下午）：EVENTFIRST 之后的
 * 默认值虽然实测是 0，但显式置位比依赖一个未在源码里写明的默认值更稳，
 * 且直接对应票面「TIME == 1 时 CALL EVENT_NEXTDAY」这句话本身要测的分支
 * （EVENT_TURNEND.ERB:57 的 `午后（TIME==1）则进次日`）。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_gamebase } = require('./helpers/gamebase');

/** 接住 BeginSignal 并断言目标状态（同 event-ending-e2e 的出口协议） */
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

test('端到端：据点一日循环——主菜单选休息 → 日期推进 → 回主菜单（#406）', async () => {
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

  // 本用例不涉及勇者来袭，关掉与 event-ending-e2e 同样的理由：避免无关
  // 随机消费打乱本用例本就没有种子化的输入序列
  fixture.disable_enter_enemy();

  // —— 新档：标题画面选「新的猎物」[1] → 新游戏四件套 → BEGIN FIRST ——
  fixture.set_inputs(1);
  await expect_signal(run_title_page(), 'FIRST', BeginSignal, '标题画面新游戏');

  // —— @EVENTFIRST：初期奴隶选「村娘」[1]、地下城模式选「普通」[0]、
  // 搬运选「抱起」[1]；村娘分支出口 BEGIN SHOP ——
  fixture.set_inputs(1, 0, 1);
  const first_exit = await emit('EVENTFIRST');
  assert.equal(first_exit, 'SHOP', '初始化的出口必是 BEGIN SHOP');

  const tax_before = fixture.store.get('flag:9') || 0;

  // TIME 显式置 1（下午）：见文件头说明
  era_flag.time = 1;

  // —— 1. 主菜单（@EVENTSHOP → DRAW_MAINMENU）→ 2. 选 199（休息）——
  fixture.set_inputs(199);
  await expect_signal(run_shop(), 'TURNEND', BeginSignal, '主菜单选休息');
  assert.equal(
    fixture.store.get('flag:9'),
    tax_before + 5,
    'FLAG:9（税金）休息一次 += 5（SHOP ver1.0.2.ERB:135）',
  );

  // day/date 基线在这里取，不在 EVENTFIRST 之后取：@EVENTFIRST 只初始化
  // DAY:1 = 1，DAY 与 DAY:2 留 0（#22 的 1:1 决定），是 run_shop 自己的
  // 防御性钳位（page-shop.js:163-168，同一条注释）把 DAY:2 从 0 修正到 1
  // ——上面这次 run_shop() 调用已经把钳位应用过，此刻取到的正是玩家在主
  // 菜单上会看到的日期。
  const day_before = era_flag.day_count;
  const date_before = era_flag.date;

  // —— 3-5. @EVENTTURNEND → TIME==1 → CALL EVENT_NEXTDAY → 日期推进 ——
  const pending = await emit('EVENTTURNEND');
  assert.equal(pending, 'SHOP', '回合结算的出口必是 BEGIN SHOP（:140）');
  assert.equal(
    era_flag.day_count,
    day_before + 1,
    'DAY:0（累计天数）+= 1（EVENT_NEXTDAY.ERB:79）',
  );
  assert.equal(
    era_flag.date,
    date_before + 1,
    'DAY:2（月内日期）+= 1（EVENT_NEXTDAY.ERB:81）',
  );
  assert.equal(
    era_flag.time,
    0,
    'TIME 推进后回到 0（次日午前，EVENT_TURNEND.ERB:91）',
  );

  // —— 6. BEGIN SHOP 回到主菜单，且循环真的还能再走一轮 ——
  fixture.set_inputs(199);
  await expect_signal(
    run_shop(),
    'TURNEND',
    BeginSignal,
    '回到主菜单后再次休息',
  );
  assert.equal(
    fixture.store.get('flag:9'),
    tax_before + 10,
    '主菜单重新可用：第二次休息同样 FLAG:9 += 5',
  );
});
