/**
 * ere/event/event-first.js 的行为测试（issue #22：@EVENTFIRST 真身；
 * #50：村娘分支与 FLAG:501 初期奴隶一问）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试缝，issue #16）。凡经主
 * 循环跑到标题画面的用例先 preset_gamebase（helpers/gamebase.js）；要走到
 * 村娘分支的用例再 preset_chara_17（helpers/chara.js，严格夹具下无预设
 * 加不进角色，#35 教训）。
 *
 * 覆盖五层：
 *   1. 端到端：标题选「新的猎物」→ 初期奴隶问答（村娘）→ 初始化 → 转向
 *      SHOP 渲染主菜单（#23 起主菜单真实渲染，以预置输入耗尽到站）；
 *   2. 初始化写入：随机/村娘两条路径与原作开局值逐项一致（全量断言，
 *      意外写入当场暴露）；
 *   3. 序号 vs 角色 ID：村娘分支的写入必须落在角色 ID 17 上，用「序号 1
 *      ≠ ID 17」的开局世界钉死（#50 最易错处）；
 *   4. era-flag 包装层：月份/所持金的底层寻址钉在 yml/Flag.yml 的 id 上；
 *   5. 存根清单：docs/stub-registry.md 可检索且与本文件两处存根对账。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_gamebase } = require('./helpers/gamebase');
const { preset_chara_0, preset_chara_17 } = require('./helpers/chara');

// 原作 @EVENTFIRST 直线赋值的完整期望（SYSTEM ver1.0.3.ERB:11-62，按语句
// 顺序；:11-12/:42/:53/:56 的不可落地项不在内，见 docs/stub-registry.md）。
// DAY:1/MONEY 走包装层（flag:10001/10004），TARGET 走指针槽（flag:10005）。
// initial_slave = FLAG:501（#50：first-setting.js 问答的写入，:19 位置）；
// 选村娘（1）时追加村娘分支（:95-187）的写入组——原作的序号 1 一律译为
// 角色 ID 17。
function expected_init_writes(initial_slave) {
  const writes = [
    { name: 'flag:500', value: 2 }, // :15 狂王初期性别：扶她
    { name: 'flag:501', value: initial_slave }, // :19 FIRST_SETTING 初期奴隶一问
    ...Array.from({ length: 14 }, (_, k) => ({
      name: `flag:${60 + k}`,
      value: -1,
    })), // :21-24 FLAG:60..73 = -1
    { name: 'flag:10005', value: -1 }, // :26 TARGET = -1（指针槽）
    { name: 'flag:5', value: 17179934119 }, // :31 战斗日志显示设置
    { name: 'flag:10001', value: 1 }, // :33 DAY:1 = 1（月）
    { name: 'itemsales:53', value: 1 }, // :35 53 号道具开局上架（#38 恢复：
    // Item 表已落地，item* 硬崩支消除；进商店轮时 @EVENTSHOP 的清零循环
    // 会再把它清 0——原作语义，见端到端用例的尾部断言）
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
  if (initial_slave === 1) {
    writes.push(
      { name: 'flag:10005', value: 17 }, // :107 TARGET = 1（序号）→ 角色 ID 17
      { name: 'cflag:17:420', value: 1 }, // :110 玛奥专属标记
      { name: 'cflag:17:9', value: 1 }, // :112 等级
      { name: 'cflag:17:1', value: 0 }, // :113 解除占用（可调教的关键一步）
      { name: 'cflag:17:11', value: 15 }, // :114-117 战斗数值
      { name: 'cflag:17:12', value: 15 },
      { name: 'cflag:17:13', value: 15 },
      { name: 'cflag:17:14', value: 15 },
      { name: 'cflag:17:16', value: -1 }, // :118 未定状态位
      { name: 'cflag:17:450', value: 31 }, // :119 一人称（自称）编号
    );
  }
  return writes;
}

test('端到端：新的猎物 → 初期奴隶选村娘 → 初始化 → 转向 SHOP 渲染主菜单', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  // 严格夹具：角色 0/17 都要有预设才加得进（#35 镜像的引擎守卫）
  preset_chara_0(fixture);
  preset_chara_17(fixture);
  // 三次输入：标题「新的猎物」、初期奴隶问答「村娘」、搬运方式「抱起来」
  fixture.set_inputs(1, 1, 1);
  const main = fixture.load_module('main');

  // 流程：标题消费输入 1（resetData + 加入角色 0 + 专属初始化）→ BEGIN
  // FIRST → @EVENTFIRST 真身：初期奴隶问答（输入 1）→ 直线赋值、开场叙事
  // （:91 读键）→ 村娘分支：加入角色 17、CFLAG 一组、描写（读键）、搬运
  // 二选一（输入 1）、囚禁播报（读键）→ BEGIN SHOP → 主循环进 SHOP：绘制
  // 主菜单 → era.input() 输入耗尽抛错到站。
  await assert.rejects(() => main(), /预置输入已耗尽/);

  // 新游戏四件套（标题侧）+ 村娘（#50）：清档后已加入 [0, 17]
  assert.deepEqual(fixture.chara_no, [0, 17]);
  assert(
    fixture.var_writes.some(
      (w) => w.name === 'ex_talent:0:200' && w.value === 1,
    ),
    '角色 0 的专属初始化必须经分发注册表触发（issue #21）',
  );

  // 读键恰为原作各 PRINTW/WAIT 的次数，无多余等待（主菜单的 input 在取数
  // 前抛错，不记入已消费）：:91 开场叙事 1 次、村娘分支 :96-100 五次、
  // :126-129 四次、抱起分支 :138-142 五次、:175 囚禁播报 1 次
  assert.deepEqual(fixture.inputs_consumed, [
    { api: 'input', value: 1 },
    { api: 'input', value: 1 },
    ...Array.from({ length: 1 }, () => ({ api: 'waitAnyKey' })),
    ...Array.from({ length: 5 }, () => ({ api: 'waitAnyKey' })),
    ...Array.from({ length: 4 }, () => ({ api: 'waitAnyKey' })),
    { api: 'input', value: 1 },
    ...Array.from({ length: 5 }, () => ({ api: 'waitAnyKey' })),
    ...Array.from({ length: 1 }, () => ({ api: 'waitAnyKey' })),
  ]);

  // 开场叙事、村娘分支文本与存根占位都可见（存根行含原作函数名，可检索）
  const texts = fixture.text_lines();
  assert(texts.includes('今天，又有纯洁无垢的勇者敲响了地下城的大门……'));
  assert(texts.includes('魔王俯视着被吸取了能量用于破坏封印的村女'));
  assert(texts.includes('因为破坏封印時魔力的涌流，村女的衣服全都剥落了。'));
  // 囚禁播报读 callname:17:-1（引擎 addCharacter 写入的预设名）
  assert(texts.includes('村娘玛奥被囚禁在了地牢里'));
  for (const name of [
    'FIRST_SETTING', // 其余各问的占位（first-setting.js 打印）
    'CHARA_NAME_INIT',
    'EX_TALENTNAME_INIT',
    'CHARA_NAME_DEFINE', // 村娘分支内，#50 起可达
    'CHAR_BODY_GENERATE_WAPPED', // 同上
  ]) {
    assert(
      texts.some((line) => line.includes(`@${name}`)),
      `存根 ${name} 必须打印含函数名的占位行`,
    );
  }
  // 随机路径被村娘出口（:187 BEGIN SHOP 即结束函数）跳过，其存根不得出现
  assert(
    !texts.some((line) => line.includes('@RAND_CHARA_MAKE')),
    '村娘路径不得触发随机角色生成的占位（原作 BEGIN 即跳出随机路径）',
  );

  // 初始化后的开局值（验收项：日期与金钱取原作开局值）。
  // date：@EVENTFIRST 本身不初始化、留 0（1:1 照搬），主菜单到站前
  // @SHOW_SHOP 的防御性钳制已把它修成 1。
  const era_flag = fixture.load_module('era-utils/era-flag');
  assert.equal(era_flag.month, 1);
  assert.equal(era_flag.money, 10000);
  assert.equal(era_flag.day_count, 0);
  assert.equal(era_flag.date, 1, 'date 应已被 @SHOW_SHOP 钳成 1');
  assert.equal(era_flag.time, 0);
  // :107 TARGET = 1（序号）→ 指针槽存角色 ID 17（#21 语义；主菜单的
  // 防御性钳制放行：17 在已加入列表且 cflag:17:1 == 0）
  assert.equal(era_flag.target, 17);

  // 【#50 验收】主菜单 [100] 调教入口的可用性判据 A > 0：可选奴隶数 = 1
  // （玛奥；魔王不计入、cflag:17:1 = 0 未占用）。渲染与分发读的都是
  // count_selectable_slaves（page-shop.js 的 usershop 同源）。
  const { count_selectable_slaves } = fixture.load_module(
    'page/page-main-menu',
  );
  assert.equal(
    count_selectable_slaves(),
    1,
    '村娘分支走完后必须恰有一名可选奴隶（A > 0，[100] 可用）',
  );
  // 可视面：调教目标按钮（496）点亮（指针 >= 1 即亮，era 侧存的是 ID 17）
  const target_button = fixture.lines.find(
    (line) => line.type === 'button' && line.accelerator === 496,
  );
  assert.ok(target_button, '主菜单必须渲染调教目标按钮（496）');
  assert.equal(target_button.color, undefined, '已选中目标时按钮不得调暗');

  // @EVENTSHOP 的清零循环（#38 恢复）：进商店轮时 ITEMSALES:0..99 依序
  // 清 0。两层 1:1 写入都要在：EVENTFIRST 先置 53 号 = 1，清零块随后把它
  // 清回 0（原作语义，在售位由商店侧重新点亮）；清零块完整且连续，紧随
  // 其后的是 @SHOW_SHOP 的日期钳制（清零在绘制之前）。
  const writes = fixture.var_writes;
  const set_53 = writes.findIndex(
    (w) => w.name === 'itemsales:53' && w.value === 1,
  );
  assert.ok(set_53 >= 0, '@EVENTFIRST 必须先置 itemsales:53 = 1');
  const zero_start = writes.findIndex(
    (w) => w.name === 'itemsales:0' && w.value === 0,
  );
  assert.ok(
    zero_start > set_53,
    '清零循环必须在 EVENTFIRST 的上架写入之后（BEGIN SHOP 才执行）',
  );
  assert.deepEqual(
    writes.slice(zero_start, zero_start + 100),
    Array.from({ length: 100 }, (_, k) => ({
      name: `itemsales:${k}`,
      value: 0,
    })),
    '@EVENTSHOP 必须依序清 100 个道具上架位',
  );
  assert.deepEqual(writes[zero_start + 100], { name: 'flag:10002', value: 1 });
});

test('初始化写入（随机）：问答选 0 后与原作开局值逐项一致（全量断言）', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = fixture.load_module('event/event-first');
  const { emit } = fixture.load_module('system/event/registry');
  const { STATE } = fixture.load_module('system/flow/begin-signal');

  fixture.set_inputs(0);
  const pending = await emit('EVENTFIRST');

  // 出口：随机路径的共用出口 :231 BEGIN SHOP
  assert.equal(pending, STATE.SHOP);
  assert.deepEqual(fixture.var_writes, expected_init_writes(0));
  // 存根清单对账用的导出（6 个：FIRST_SETTING 移交 first-setting.js 的
  // 部分实现，村娘分支的两个存根自 #50 起在可达路径上）
  assert.deepEqual(STUBBED_CALLS, [
    'GEO_TEST',
    'SET_VIL',
    'CHARA_NAME_INIT',
    'EX_TALENTNAME_INIT',
    'RAND_CHARA_MAKE',
    'CHARA_NAME_DEFINE',
    'CHAR_BODY_GENERATE_WAPPED',
  ]);
});

test('初始化写入（村娘）：CFLAG 一组 1:1 落在角色 ID 17 上（全量断言）', async () => {
  const fixture = create_era_fixture();
  fixture.load_module('event/event-first'); // 顶层注册 EVENTFIRST 处理器
  const { emit } = fixture.load_module('system/event/registry');
  const { STATE } = fixture.load_module('system/flow/begin-signal');

  // 两次输入：问答「村娘」、搬运「抱起来」
  fixture.set_inputs(1, 1);
  const pending = await emit('EVENTFIRST');

  // 出口：村娘分支自己的 :187 BEGIN SHOP
  assert.equal(pending, STATE.SHOP);
  // 全量断言：任何多写、少写、写错地址（如 cflag:1:*）、写错值都当场红
  assert.deepEqual(fixture.var_writes, expected_init_writes(1));
});

test('【#50 验收】村娘分支的写入落在角色 ID 17 而非已加入序号 1', async () => {
  // 序号≠ID 的开局世界：已加入 [0, 17]——村娘的已加入序号是 1、角色 ID 是
  // 17，两者不重合；角色 ID 1 是另一个（不存在的）角色。照抄原作数字 1 的
  // 移植（cflag:1:*、target = 1）在本世界里会把全部状态写到一个空角色头上，
  // 与正确行为可区分——这正是要钉死的那类错。
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  preset_chara_17(fixture);
  fixture.load_module('event/event-first'); // 顶层注册 EVENTFIRST 处理器
  const { emit } = fixture.load_module('system/event/registry');
  fixture.set_inputs(1, 1);
  // 标题步骤的等价物（emit 直调不经标题）：先加角色 0，村娘加入后世界才是
  // 原作语境的 [0, 17]——序号 1 恰好指向村娘
  fixture.era.addCharacter(0);
  await emit('EVENTFIRST');

  // CFLAG 组的每笔都落在 17 上，一笔都不许落在 1 上
  const wrong_index_writes = fixture.var_writes.filter((w) =>
    /^cflag:1:/.test(w.name),
  );
  assert.deepEqual(
    wrong_index_writes,
    [],
    '不得出现 cflag:1:* 的写入（那是角色 ID 1，不是序号 1 的村娘）',
  );
  assert.equal(fixture.store.get('cflag:17:420'), 1);
  assert.equal(fixture.store.get('cflag:17:450'), 31);
  // 指针槽：17（角色 ID），不是 1（序号）
  const era_flag = fixture.load_module('era-utils/era-flag');
  assert.equal(era_flag.target, 17);
  // 世界本身：序号 1 ↔ ID 17 的对应关系成立
  assert.deepEqual(fixture.chara_no, [0, 17]);
});

test('初期奴隶问答：无效输入重问，两个取值都由玩家选择产生', async () => {
  const fixture = create_era_fixture();
  fixture.load_module('event/event-first'); // 顶层注册 EVENTFIRST 处理器
  const { emit } = fixture.load_module('system/event/registry');
  const { STATE } = fixture.load_module('system/flow/begin-signal');

  // 先给一个越界输入 9（原作 SIF 0<=RESULT<=1 不落笔、回菜单重问），再选 0
  fixture.set_inputs(9, 0);
  const pending = await emit('EVENTFIRST');

  // 两次 era.input 都被问答消费（9 无效重问、0 生效）；无效轮后选项重渲染
  assert.deepEqual(fixture.inputs_consumed.slice(0, 2), [
    { api: 'input', value: 9 },
    { api: 'input', value: 0 },
  ]);
  const question_rounds = fixture.lines.filter(
    (line) => line.type === 'button' && line.accelerator === 0,
  );
  assert.equal(question_rounds.length, 2, '无效输入后必须重问（重渲染选项）');
  assert.equal(fixture.store.get('flag:501'), 0);
  // 选 0 走随机路径：共用出口
  assert.equal(pending, STATE.SHOP);
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
  const { STUBBED_CALLS: SETTING_STUBS } = fixture.load_module(
    'event/first-setting',
  );
  const registry_path = path.resolve(
    __dirname,
    '..',
    'docs',
    'stub-registry.md',
  );
  const registry = fs.readFileSync(registry_path, 'utf8');

  // 两处存根名单必须在清单里（删清单行或删存根不同步，都会在这里红）
  for (const name of [...STUBBED_CALLS, ...SETTING_STUBS]) {
    assert(registry.includes(name), `存根清单缺少 ${name}`);
  }
  // 工单点名的优先项 + 既有存根（page-title 的读档）也必须可检索
  for (const name of ['PARTY_UNITE', 'SYSTEM_LOADGAME']) {
    assert(registry.includes(name), `存根清单缺少 ${name}`);
  }
});
