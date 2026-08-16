/**
 * ere/event/event-first.js 的行为测试（issue #22：@EVENTFIRST 真身）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试缝，issue #16）。凡经主
 * 循环跑到标题画面的用例先 preset_gamebase（helpers/gamebase.js）。
 *
 * 覆盖四层：
 *   1. 端到端：标题选「新的猎物」→ 初始化 → 转向 SHOP（#23 起主菜单真实
 *      渲染，以预置输入耗尽到站）；
 *   2. 初始化写入：与原作开局值逐项一致（全量断言，意外写入当场暴露）；
 *   3. era-flag 包装层：月份/所持金的底层寻址钉在 yml/Flag.yml 的 id 上；
 *   4. 存根清单：docs/stub-registry.md 可检索且与本文件的存根对账。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_gamebase } = require('./helpers/gamebase');

// 原作 @EVENTFIRST 直线赋值的完整期望（SYSTEM ver1.0.3.ERB:11-62，按语句
// 顺序；:11-12/:42/:53/:56 的不可落地项不在内，见 docs/stub-registry.md）。
// DAY:1/MONEY 走包装层（flag:10001/10004），TARGET 走指针槽（flag:10005）。
function expected_init_writes() {
  return [
    { name: 'flag:500', value: 2 }, // :15 狂王初期性别：扶她
    ...Array.from({ length: 14 }, (_, k) => ({
      name: `flag:${60 + k}`,
      value: -1,
    })), // :21-24 FLAG:60..73 = -1
    { name: 'flag:10005', value: -1 }, // :26 TARGET = -1（指针槽）
    { name: 'flag:5', value: 17179934119 }, // :31 战斗日志显示设置
    { name: 'flag:10001', value: 1 }, // :33 DAY:1 = 1（月）
    // :35 ITEMSALES:53 = 1 不在此列：item 系寻址在 Item 表落地前会让引擎
    // 硬崩（PR #34），已登记 docs/stub-registry.md 的变量级欠账。本数组是
    // 全量断言，恢复该写入时这里会红——那正是提醒「先确认 Item 表已就位」。
    ...Array.from({ length: 8 }, (_, k) => ({
      name: `flag:${200 + k}`,
      value: 1,
    })), // :36-40 FLAG:200..207 = 1
    { name: 'flag:35', value: 0 }, // :45 濒死自动结束调教：关
    { name: 'flag:37', value: 1 }, // :47 着衣系统：开
    { name: 'flag:8', value: 7 }, // :50-52 新档翻位 0b111
    { name: 'flag:10004', value: 10000 }, // :55 MONEY = 10000
    { name: 'cflag:0:451', value: 21 }, // :60 魔王相当于人类年龄
  ];
}

test('端到端：新的猎物 → 初始化 → 转向 SHOP 渲染主菜单（#23 已接线）', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  fixture.set_inputs(1);
  const main = fixture.load_module('main');

  // 流程：标题消费输入 1（resetData + 加入角色 0 + 专属初始化）→ BEGIN
  // FIRST → @EVENTFIRST 真身：存根占位、直线赋值、开场叙事（7 次读键）→
  // BEGIN SHOP → 主循环进 SHOP：绘制主菜单 → era.input() 输入耗尽抛错到站。
  await assert.rejects(() => main(), /预置输入已耗尽/);

  // 新游戏四件套（标题侧）：清档、加角色 0、分发 CHARA_EX_0（#21）。
  // addCharacter/resetData 自 #23 起由夹具实装（已加入角色列表），不再走
  // 兜底记录——resetData 的清空语义在这里一并被钉住。
  assert.deepEqual(fixture.added_characters, [0]);
  assert(
    fixture.var_writes.some(
      (w) => w.name === 'ex_talent:0:200' && w.value === 1,
    ),
    '角色 0 的专属初始化必须经分发注册表触发（issue #21）',
  );

  // 读键恰为开场叙事的 7 次（:91 WAIT + :193-198 六次 PRINTW），无多余等待
  // （主菜单的 input 在取数前抛错，不记入已消费）
  assert.deepEqual(fixture.inputs_consumed, [
    { api: 'input', value: 1 },
    ...Array.from({ length: 7 }, () => ({ api: 'waitAnyKey' })),
  ]);

  // 开场叙事与存根占位都可见（存根行含原作函数名，可检索）
  const texts = fixture.text_lines();
  assert(texts.includes('很久很久以前，某代魔王得到了不死之力，'));
  assert(texts.includes('今天，又有纯洁无垢的勇者敲响了地下城的大门……'));
  for (const name of [
    'FIRST_SETTING',
    'CHARA_NAME_INIT',
    'EX_TALENTNAME_INIT',
    'RAND_CHARA_MAKE',
  ]) {
    assert(
      texts.some((line) => line.includes(`@${name}`)),
      `存根 ${name} 必须打印含函数名的占位行`,
    );
  }

  // 初始化后的开局值（验收项：日期与金钱取原作开局值）。
  // 注意 date：@EVENTFIRST 本身不初始化、留 0（1:1 照搬），但主菜单到站前
  // @SHOW_SHOP 的防御性钳制（SHOP ver1.0.2.ERB:33-36）已把它修成 1——
  // 玩家看到的开局是「第 0 年 1 月 1 日」，修正只发生在 SHOP 侧。
  const era_flag = fixture.load_module('era-utils/era-flag');
  assert.equal(era_flag.month, 1);
  assert.equal(era_flag.money, 10000);
  // 原作不初始化、留 0 的读数源（勿在初始化侧补成 1，1:1 照搬）
  assert.equal(era_flag.day_count, 0);
  assert.equal(era_flag.date, 1, 'date 应已被 @SHOW_SHOP 钳成 1');
  assert.equal(era_flag.time, 0);
  assert.equal(era_flag.target, -1);
});

test('初始化写入：与原作开局值逐项一致（全量断言，意外写入当场暴露）', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = fixture.load_module('event/event-first');
  const { emit } = fixture.load_module('system/event/registry');
  const { STATE } = fixture.load_module('system/flow/begin-signal');

  const pending = await emit('EVENTFIRST');

  // 出口：转场 SHOP（原作 :231 BEGIN SHOP；村娘分支自己的 :187 出口在
  // 不可达分支内，见 docs/stub-registry.md）
  assert.equal(pending, STATE.SHOP);
  assert.deepEqual(fixture.var_writes, expected_init_writes());
  // 存根清单对账用的导出与占位行一致（4 个可达存根）
  assert.deepEqual(STUBBED_CALLS, [
    'FIRST_SETTING',
    'GEO_TEST',
    'SET_VIL',
    'CHARA_NAME_INIT',
    'EX_TALENTNAME_INIT',
    'RAND_CHARA_MAKE',
  ]);
});

test('era-flag 包装层：月份/所持金的底层寻址钉在 yml/Flag.yml 的 id 上', async () => {
  const fixture = create_era_fixture();
  const era_flag = fixture.load_module('era-utils/era-flag');

  // id 即存档格式的一部分（#5 决议的 10000 保留区），改动必须惊动本测试
  era_flag.month = 2;
  era_flag.money = 5;
  assert.deepEqual(fixture.var_writes, [
    { name: 'flag:10001', value: 2 },
    { name: 'flag:10004', value: 5 },
  ]);
});

test('存根清单可检索：docs/stub-registry.md 收录全部存根化调用', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = fixture.load_module('event/event-first');
  const registry_path = path.resolve(
    __dirname,
    '..',
    'docs',
    'stub-registry.md',
  );
  const registry = fs.readFileSync(registry_path, 'utf8');

  // 本文件的存根必须在清单里（删清单行或删存根不同步，都会在这里红）
  for (const name of STUBBED_CALLS) {
    assert(registry.includes(name), `存根清单缺少 ${name}`);
  }
  // 工单点名的优先项 + 既有存根（page-title 的读档）也必须可检索
  for (const name of [
    'PARTY_UNITE',
    'CHARA_NAME_DEFINE',
    'CHAR_BODY_GENERATE_WAPPED',
    'SYSTEM_LOADGAME',
  ]) {
    assert(registry.includes(name), `存根清单缺少 ${name}`);
  }
});
