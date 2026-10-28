/**
 * ere/system/flow/main-loop.js 的行为测试（issue #20 起，#22/#23 更新）：
 * 状态机对两条 BEGIN 路径的统一接驳，以及「标题 → 新游戏初始化 → SHOP」
 * 的端到端转场。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点，issue #16）。凡渲染
 * 标题画面的用例先 preset_gamebase（helpers/gamebase.js，标题从静态表读
 * GameBase）。
 *
 * 终止方式：主循环是常驻循环，一律以「预置输入耗尽抛错」终止（夹具既定
 * 设计）。新游戏路径在 SHOP 渲染主菜单、消费掉队列里的输入后到站。
 *
 * 已知未测行：STATE.FIRST 处理器的 `?? STATE.SHOP` 缺省处理（链无人 BEGIN 时
 * 默认进商店轮，#20 验收移交的引擎语义）。真身处理器必然返回 SHOP，
 * 缺省分支在当前注册表下不可达、无法不设钩子地观测——它是防御性的引擎行为
 * 镜像，留待未来出现「可无 BEGIN 的 EVENTFIRST 处理器组合」时再证。
 * 交互提醒（变异测试者须知）：整删 event-first 的 begin(SHOP) 后端到端
 * 仍绿（缺省分支按引擎语义接住，非误报通过），但 emit 层用例
 * （test/event-first.test.js 的 pending 断言）会红——那才是出口的检查。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_gamebase } = require('./helpers/gamebase');
const { preset_chara_0, preset_chara_1 } = require('./helpers/chara');

test('端到端：标题选「新的猎物」→ FIRST 初始化 → SHOP 渲染主菜单', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  // 严格夹具：角色 0 要有预设才加得进（#35 镜像的引擎检查）；#565 起随机
  // 路径走 rand_chara_make 真身，rand ≡ 0 掷中勇者位 1，预设同要先种
  preset_chara_0(fixture);
  preset_chara_1(fixture);
  // 标题(1) + 五问(1/2/0/0) + RAND_CHARA_MAKE 两处输入：形象确认 [100]
  // 進む、收下确认 [2]
  fixture.set_inputs(1, 1, 2, 0, 0, 100, 2);
  const main = fixture.load_module('main');

  // 流程：标题画面（消费输入 1，resetData + 加入角色 0，BEGIN FIRST 以
  // 返回值离开）→ 主循环进 FIRST → emit('EVENTFIRST')：FIRST_SETTING 五问（#463
  // 全量实现）——魔王性别选女性（消费输入 1，跳过肉棒尺寸一问）、狂王性别
  // 选扶她（消费输入 2）、初期奴隶问答（消费输入 0 选随机，#50）、地下城
  // 模式问答（消费输入 0 选普通，#181）、真身完成初始化、开场叙事与随机
  // 路径读键、rand_chara_make 真身（#565：形象确认 [100] → 角色信息页
  // 两读键 → 收下确认 [2] → 收下播报读键）、返回 SHOP 转场目标（事件路径，
  // 链内目标由 emit 暂存）→ 主循环进入 SHOP（#23 已接入）：绘制主菜单 →
  // era.input() 队列已空，抛「预置输入耗尽」上抛终止。初始化细节的逐项
  // 断言在 test/event-first.test.js，此处证主循环的转场接驳与到站画面。
  fixture.override_math_random(() => 0);
  let err;
  try {
    await main();
  } catch (e) {
    err = e;
  } finally {
    fixture.restore_math_random();
  }
  assert.match(String(err), /预置输入已耗尽/);

  // 标题与五问各恰消费一次输入；叙事读键 7 次后进入 rand_chara_make 真身
  // （#565）：形象确认 [100] → 角色信息页（-2 贡品页无读键）→ 收下确认
  // [2] → 收下播报读键。主菜单的 input 在取数前抛错，不记入已消费。
  assert.deepEqual(fixture.inputs_consumed, [
    { api: 'input', value: 1 }, // 标题「新的猎物」
    { api: 'input', value: 1 }, // 魔王性别「女性」（跳过肉棒尺寸一问）
    { api: 'input', value: 2 }, // 狂王性别「扶她」
    { api: 'input', value: 0 }, // 初期奴隶（随机）
    { api: 'input', value: 0 }, // #181 地下城模式（普通）
    ...Array.from({ length: 7 }, () => ({ api: 'waitAnyKey' })),
    { api: 'input', value: 100 }, // 形象确认：進む
    // SHOW_CHARA_INFO 走 -2 贡品页（#565 订正）：整页无
    // 等待键，身体数据与外貌直接铺完
    { api: 'input', value: 2 }, // 收下确认
    { api: 'waitAnyKey' }, // 收下播报
  ]);
  // 到站证据一：主菜单已渲染——状态行数值取自真实变量（初始化产出 +
  // draw_status_line 的日期钳制：开局即「第 0 年 1 月 1 日（第 1 日）」），六个
  // 入口齐备（细节断言在 test/page-main-menu.test.js）
  const texts = fixture.text_lines();
  const status = texts.find((line) => line.includes('所持金'));
  // \u3000 = 全角空格（排版字符，仓库约定转义书写）
  assert(status.includes('第0年\u30001月1日（第1日）'));
  assert(status.includes('上午'));
  assert(status.includes('(所持金：10000 pts.)'));
  for (const accelerator of [496, 497, 500, 501, 504, 505]) {
    assert(
      fixture.lines.some(
        (line) => line.type === 'button' && line.accelerator === accelerator,
      ),
      `入口 ${accelerator} 必须出现在主菜单`,
    );
  }

  // 到站证据二：随机路径已走 rand_chara_make 真身（#565）——初始奴隶
  // 已生成并入列（rand ≡ 0 掷勇者位 1）、收下播报读键过（#723 起主菜单
  // 换屏清掉它，取证看全量行史；换屏前它已由收下播报读键确认）。
  // 名字来自命名链（rand ≡ 0 → 名字编号 0 = NameList.yml 的「玛丽」，#821
  // 起夹具按 yml 现算名字，此前读到空串才落到保底名「佳奈美」）
  assert(
    fixture.lines_history.some(
      (line) =>
        line.type === 'text' &&
        line.text.includes('冒险者玛丽被囚禁在了地牢里！'),
    ),
    '随机初始奴隶的收下播报必须播过（rand_chara_make 真身）',
  );
  assert.deepEqual(fixture.chara_no, [0, 1], '魔王与生成的初始奴隶都在列');
  // 到站证据三：标题只画过转场前的那一次（FIRST 之后没有回标题重绘；
  // #723 起主菜单换屏清掉了标题行，取证看全量行史）
  assert.equal(
    fixture.lines_history.filter((line) => line.text === 'Ver0.0.0').length,
    1,
    '标题不得在初始化后重绘（重绘 = 转场没到 SHOP）',
  );
});

test('端到端：读档分支（旧的奴隶）进真身读档界面，返回后回标题，不经状态机转场', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  // 严格夹具：角色 0 要有预设才加得进（#35 镜像的引擎检查）
  preset_chara_0(fixture);
  fixture.set_inputs(0, 100);
  const main = fixture.load_module('main');

  // #136 起读档入口是真身 load_game（page-save-load.js）：输入 0 →
  // 读档界面 → [100] 返回 → 无条件回标题重绘 → 输入耗尽。
  // 不发起转场（读档返回后直接回标题重绘），也不进 FIRST。
  await assert.rejects(() => main(), /预置输入已耗尽/);

  assert.deepEqual(fixture.inputs_consumed, [
    { api: 'input', value: 0 },
    { api: 'input', value: 100 },
  ]);
  assert(
    fixture.lines_history.some(
      (line) => line.text === '【读取存档】要载入以下哪个存档？',
    ),
    '应真的进入读档界面（#136 接通）',
  );
  assert(fixture.text_lines().includes('Ver0.0.0'));
});

test('FIRST 钩子返回 SHOP 后进入真实 SHOP 渲染（#22 检查用例随 #23 改制）', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  // 严格夹具：角色 0 要有预设才加得进（#35 镜像的引擎检查）；#565 起随机
  // 路径走 rand_chara_make 真身，rand ≡ 0 掷中勇者位 1，预设同要先种
  preset_chara_0(fixture);
  preset_chara_1(fixture);
  fixture.set_inputs(1, 1, 2, 0, 0, 100, 2);
  // 开局钩子的出口本就返回 SHOP（只有一个处理者，#853 起直接调用，链内
  // 后写胜出的语义随链一起消失——那是 event-registry 的用例）。#22 时代
  // 此处断言「进入即报错的检查」；SHOP 接入（#23）后检查退役，改为断言
  // 真实渲染恰一次——重复进入或未进入都会在计数上暴露。
  const main = fixture.load_module('main');

  fixture.override_math_random(() => 0);
  let err;
  try {
    await main();
  } catch (e) {
    err = e;
  } finally {
    fixture.restore_math_random();
  }
  assert.match(String(err), /预置输入已耗尽/);
  assert.equal(
    fixture.text_lines().filter((line) => line.includes('所持金')).length,
    1,
    '主菜单状态行应恰出现一次（SHOP 恰进入并渲染一次）',
  );
});

test('主启动图注册性交系：COM20 与 COM_ABLE20 可由主循环侧的 require 发现', async () => {
  const fixture = create_era_fixture();
  fixture.load_module('system/flow/main-loop');
  const { com_family, com_able_family } = fixture.load_module(
    'system/train/com-family',
  );

  assert.equal(com_family.has(20), true, 'COM20 必须经主启动图注册');
  assert.equal(com_able_family.has(20), true, 'COM_ABLE20 必须经主启动图注册');
});

test('主启动图注册特殊系：COM50 与 COM_ABLE50 可由主循环侧的 require 发现', async () => {
  const fixture = create_era_fixture();
  fixture.load_module('system/flow/main-loop');
  const { com_family, com_able_family } = fixture.load_module(
    'system/train/com-family',
  );

  assert.equal(com_family.has(50), true, 'COM50 必须经主启动图注册');
  assert.equal(com_able_family.has(50), true, 'COM_ABLE50 必须经主启动图注册');
});

test('主启动图注册重度调教系：COM80 与 COM_ABLE80 可由主循环侧的 require 发现', async () => {
  const fixture = create_era_fixture();
  fixture.load_module('system/flow/main-loop');
  const { com_family, com_able_family } = fixture.load_module(
    'system/train/com-family',
  );

  assert.equal(com_family.has(80), true, 'COM80 必须经主启动图注册');
  assert.equal(com_able_family.has(80), true, 'COM_ABLE80 必须经主启动图注册');
});

test('主启动图注册奉仕系：COM30 与 COM_ABLE30 可由主循环侧的 require 发现', async () => {
  const fixture = create_era_fixture();
  fixture.load_module('system/flow/main-loop');
  const { com_family, com_able_family } = fixture.load_module(
    'system/train/com-family',
  );

  assert.equal(com_family.has(30), true, 'COM30 必须经主启动图注册');
  assert.equal(com_able_family.has(30), true, 'COM_ABLE30 必须经主启动图注册');
});

test('主启动图注册道具系：COM10 与 COM_ABLE10 可由主循环侧的 require 发现', async () => {
  const fixture = create_era_fixture();
  fixture.load_module('system/flow/main-loop');
  const { com_family, com_able_family } = fixture.load_module(
    'system/train/com-family',
  );

  assert.equal(com_family.has(10), true, 'COM10 必须经主启动图注册');
  assert.equal(com_able_family.has(10), true, 'COM_ABLE10 必须经主启动图注册');
});

test('主启动图注册追加与高级系：COM122 与 COM_ABLE122 可由主循环侧的 require 发现', async () => {
  const fixture = create_era_fixture();
  fixture.load_module('system/flow/main-loop');
  const { com_family, com_able_family } = fixture.load_module(
    'system/train/com-family',
  );

  assert.equal(com_family.has(122), true, 'COM122 必须经主启动图注册');
  assert.equal(
    com_able_family.has(122),
    true,
    'COM_ABLE122 必须经主启动图注册',
  );
});

test('主启动图注册助手与蕾丝系：COM60 与 COM_ABLE60 可由主循环侧的 require 发现', async () => {
  const fixture = create_era_fixture();
  fixture.load_module('system/flow/main-loop');
  const { com_family, com_able_family } = fixture.load_module(
    'system/train/com-family',
  );

  assert.equal(com_family.has(60), true, 'COM60 必须经主启动图注册');
  assert.equal(com_able_family.has(60), true, 'COM_ABLE60 必须经主启动图注册');
});

test('主启动图注册触手系：COM100 / COM150 / COM208 可由主循环侧的 require 发现', async () => {
  const fixture = create_era_fixture();
  fixture.load_module('system/flow/main-loop');
  const { com_family, com_able_family } = fixture.load_module(
    'system/train/com-family',
  );

  assert.equal(com_family.has(100), true, 'COM100 必须经主启动图注册');
  assert.equal(
    com_able_family.has(100),
    true,
    'COM_ABLE100 必须经主启动图注册',
  );
  assert.equal(com_family.has(150), true, 'COM150 必须经主启动图注册');
  assert.equal(com_family.has(208), true, 'COM208 必须经主启动图注册');
});

test('主启动图注册 K2 口上：KOJO_MESSAGE_COM_2 可由主循环侧的 require 发现', async () => {
  const fixture = create_era_fixture();
  fixture.load_module('system/flow/main-loop');
  const { kojo_message_com_family } = fixture.load_module('kojo/kojo-system');
  assert.equal(
    kojo_message_com_family.has(2),
    true,
    'KOJO_MESSAGE_COM_2 必须经主启动图注册',
  );
});

test('enter_state：处理器返回的转场目标原样交出，非目标值当场报错', async () => {
  const fixture = create_era_fixture();
  const { enter_state, STATE_HANDLERS } = fixture.load_module(
    'system/flow/main-loop',
  );
  const { STATE } = fixture.load_module('system/flow/game-state');
  const original = STATE_HANDLERS[STATE.TITLE];

  try {
    // 正常路径：处理器返回 STATE 取值 → enter_state 原样交出
    STATE_HANDLERS[STATE.TITLE] = async () => STATE.SHOP;
    assert.equal(await enter_state(STATE.TITLE), STATE.SHOP);

    // 没有发起转场：BEGIN 目标跑完却没有待跳转状态是缺陷（决议 #6 的约定），
    // 报错而不是把 undefined 交给状态机的下一轮
    STATE_HANDLERS[STATE.TITLE] = async () => undefined;
    await assert.rejects(
      () => enter_state(STATE.TITLE),
      /没有待跳转状态（缺少 BEGIN）/,
    );

    // 普通返回值（数字、近似字符串）同样不是转场
    STATE_HANDLERS[STATE.TITLE] = async () => 0;
    await assert.rejects(
      () => enter_state(STATE.TITLE),
      /没有待跳转状态（缺少 BEGIN）/,
    );
  } finally {
    STATE_HANDLERS[STATE.TITLE] = original;
  }
});

test('游戏结束回到标题：主循环不退出进程，标题重新可交互（#852 标题循环）', async () => {
  const fixture = create_era_fixture();
  const run_main_loop = fixture.load_module('system/flow/main-loop');
  const { STATE_HANDLERS } = run_main_loop;
  const { STATE } = fixture.load_module('system/flow/game-state');

  // 三个处理器换成最小替身：SHOP 一轮就游戏结束回标题，标题被重新进入
  // 两次——第二次抛错收场。整条循环不碰 era.quit()，即「游戏结束不再
  // 退出进程、回到标题」；退出只由标题画面的退出按钮发出
  const originals = {
    FIRST: STATE_HANDLERS[STATE.FIRST],
    SHOP: STATE_HANDLERS[STATE.SHOP],
    TITLE: STATE_HANDLERS[STATE.TITLE],
  };
  let shop_entries = 0;
  let title_entries = 0;
  try {
    STATE_HANDLERS[STATE.FIRST] = async () => STATE.SHOP;
    STATE_HANDLERS[STATE.SHOP] = async () => {
      shop_entries += 1;
      return STATE.TITLE; // 游戏结束
    };
    STATE_HANDLERS[STATE.TITLE] = async () => {
      title_entries += 1;
      if (title_entries === 2) {
        throw new Error('第二次进标题：玩到了再开局');
      }
      return STATE.FIRST; // 玩家选「新的猎物」
    };
    await assert.rejects(() => run_main_loop(), /第二次进标题/);
  } finally {
    Object.assign(STATE_HANDLERS, {
      [STATE.FIRST]: originals.FIRST,
      [STATE.SHOP]: originals.SHOP,
      [STATE.TITLE]: originals.TITLE,
    });
  }

  assert.equal(shop_entries, 1, '游戏内只进了一次据点轮');
  assert.equal(title_entries, 2, '游戏结束回到标题后还能重新开局');
  assert(
    !fixture.calls.some(({ api }) => api === 'quit'),
    '游戏结束回标题不得退出进程（退出只由标题画面的退出按钮发出）',
  );
});

test('状态处理器表与 STATE 枚举同步：新增状态不得漏接处理器', async () => {
  const fixture = create_era_fixture();
  const { STATE } = fixture.load_module('system/flow/game-state');
  const { STATE_HANDLERS } = fixture.load_module('system/flow/main-loop');

  // 键与取值同源（STATE.X），漂移只可能是一侧改了另一侧没改：漏接的处理器
  // 要到玩家推进到那个状态时才报「尚未移植」，枚举删掉的取值会让对应的键
  // 退化成字符串 'undefined'。这张表与枚举由这条用例对齐，不另抄一份清单。
  assert.deepEqual(
    Object.keys(STATE_HANDLERS).sort(),
    Object.values(STATE).sort(),
    'STATE_HANDLERS 必须为 STATE 枚举的每个取值备一个处理器',
  );
  for (const [state, handler] of Object.entries(STATE_HANDLERS)) {
    assert.equal(
      typeof handler,
      'function',
      `状态 ${state} 的处理器必须是函数`,
    );
  }
});
