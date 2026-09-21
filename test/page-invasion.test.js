/**
 * ere/page/page-invasion.js @INVASION 魔力出兵窄路径（issue #117）与地上
 * 征服后菜单（issue #468）的行为测试。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点）。经模块公开接口
 * invasion()/post_conquest_menu()/start_campaign() 直驱（对局内则由
 * page-shop 的 [109] 分支调用，端到端用例在本文件末尾经 run_shop 驱动）。
 *
 * 对应 #117 验收清单：
 *   1. 气力 10000 出兵一次：FLAG:81 +400（10000/25）、BASE:0:1 减半、
 *      EX_FLAG:99 +2（另固定 EXP:0:80 += SINKOU/2）；
 *   2. 威望各区间折扣与原作一致（五档全覆盖，含 61–80 无修正与相邻两档）；
 *   3. [109] 返回 1 时确实走到 BEGIN TURNEND（BeginSignal 断言）；
 *   4. 存根登记齐全（本文件 STUBBED_CALLS ⊆ docs/stub-registry.md）。
 *
 * 对应 #468（地上征服后菜单）：状态条与选项按征服/阶段标记切换文案、
 * [9] 转发到 CAMPAIGN_MENU、[5] 按钮渲染条件与派发时的拒绝条件彼此独立
 * （原作真实存在的怪癖，1:1 保留）、start_campaign() 提取前后行为等价。
 *
 * 已知未测行（有意）：菜单的状态条（侵攻度/气力）只断言存在与数值列，
 * 不逐字比对——BARSTR 文本条在 ere 侧改画原生进度条（文件头注明的偏离），
 * 本路径无黄金样本（#108 接受的风险），逐字锁随 #109 裁定后补。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

// 组一个窄路径开局世界：魔王气力、威望、人间界侵攻度、征服标记
function make_world(
  fixture,
  { willpower = 10000, prestige = 70, invasion = 0, fallen = 0 } = {},
) {
  fixture.store.set('base:0:1', willpower);
  fixture.store.set('maxbase:0:1', Math.max(willpower, 10000));
  fixture.store.set('exflag:99', prestige); // EX_FLAG:99 威望（@EVENTFIRST 播种 70）
  fixture.store.set('flag:81', invasion); // FLAG:81 人间界侵攻度
  fixture.store.set('flag:82', fallen); // FLAG:82 人间界陷落
  // addCharacter(0) 的引擎侧数据层赋值（夹具注释见 era-fixture 的
  // addCharacter 段）：魔王存档名 %SAVESTR:MASTER% 的承载（#5 决议）
  fixture.store.set('callname:0:-1', '你');
}

// 直驱 invasion()，预置输入，返回其返回值
async function run_invasion(fixture, ...inputs) {
  fixture.set_inputs(...inputs);
  const { invasion } = fixture.load_module('page/page-invasion');
  return invasion();
}

// 直驱 post_conquest_menu()，预置输入，返回其返回值
async function run_post_conquest(fixture, ...inputs) {
  fixture.set_inputs(...inputs);
  const { post_conquest_menu } = fixture.load_module('page/page-invasion');
  return post_conquest_menu();
}

function history_texts(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

// printMultiColumns 的 progress 格落表为独立条目（type: 'progress'，标签存在
// text 字段），history_texts 的 type: 'text' 过滤器收不到这里
function progress_texts(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'progress')
    .map((line) => line.text);
}

test('【验收 1】气力 10000 出兵一次：侵攻度 +400、气力减半、威望 +2、经验 +200', async () => {
  const fixture = create_era_fixture();
  make_world(fixture);
  const result = await run_invasion(fixture, 1);

  assert.equal(result, 1, '魔力出兵成功应返回 1（走 BEGIN TURNEND）');
  assert.equal(fixture.store.get('flag:81'), 400, 'FLAG:81 += 10000/25');
  assert.equal(fixture.store.get('base:0:1'), 5000, 'BASE:0:1 减半（:268）');
  assert.equal(fixture.store.get('exflag:99'), 72, 'EX_FLAG:99 += 2（:978）');
  assert.equal(fixture.store.get('exp:0:80'), 200, 'EXP:0:80 += SINKOU/2');

  const texts = history_texts(fixture);
  assert(texts.includes('威望值是【相安无事】'), '威望 70 落 61-80 档');
  assert(texts.includes('战斗力　400点'), 'PRINTFORMW 战斗力（:296）');
  assert(texts.includes('魔王补正　　　x1.00'), '共通处理的魔王补正行（:569）');
  assert(texts.includes('合计　400点'), 'PRINTFORMW 合计（:598）');
  assert(
    texts.includes('你的魔力爆发出来了！'),
    '%SAVESTR:MASTER% = 你（:696）',
  );
  assert(
    texts.includes('400点魔力形成雷霆，将附近的村庄彻底摧毁！'),
    '400 落 <600 雷霆档（:701-702）',
  );
  assert(texts.includes('你得到了200点经验值！'), '经验值行（:737）');
  // 首次侵略的传闻文本（INVASION_EVENT_SEIEI :259，FLAG:81 == 0 才打）
  assert(
    texts.includes('根据传闻狂王为了应对魔王军的入侵已开始组织起了精锐部队。'),
    '首次侵略的精锐部队传闻（INVASION_EVENT.ERB:259）',
  );
  // 结算尾部 CALL INVASION_CHECK（:996）——#118 起是五组条件本体：本用例
  // FLAG:81 = 400、FLAG:82 = 0，五组全不满足，空转零输出
  assert(
    !texts.some(
      (line) =>
        line.includes('声望+10') || line.includes('魔王终于再次掌握了世界'),
    ),
    '未达 10000 时 INVASION_CHECK 空转（不触发结局演出）',
  );
});

test('【验收 2】威望区间折扣：五档与原作公式逐档一致（INVASION.ERB:270-293）', async () => {
  // SINKOU 基数 400（气力 10000/25）；新档魔王无任何补正，档内折扣即增量。
  // 侵攻度起点 100（非 0）：同时固定「非首次侵略不打精锐部队传闻」
  const cases = [
    { prestige: 30, expected: 100, tier: '动荡不安' }, // :275-278 ÷4
    { prestige: 50, expected: 320, tier: '略受质疑' }, // :279-284 ×(100+(50-60)*2)/100
    { prestige: 70, expected: 400, tier: '相安无事' }, // :285-286 无修正
    { prestige: 90, expected: 440, tier: '广受爱戴' }, // :287-292 ×(100+(90-80))/100
  ];
  for (const { prestige, expected, tier } of cases) {
    const fixture = create_era_fixture();
    make_world(fixture, { prestige, invasion: 100 });
    const result = await run_invasion(fixture, 1);
    assert.equal(result, 1);
    assert.equal(
      fixture.store.get('flag:81'),
      100 + expected,
      `威望 ${prestige}（${tier}）的侵攻度增量`,
    );
    assert.equal(fixture.store.get('base:0:1'), 5000, '气力减半与威望无关');
    assert.equal(fixture.store.get('exflag:99'), prestige + 2);
    const texts = history_texts(fixture);
    assert(texts.includes(`威望值是【${tier}】`), `${tier} 档位行`);
    assert(
      !texts.some((line) => line.includes('精锐部队')),
      'FLAG:81 > 0（非首次侵略）不打精锐部队传闻（INVASION_EVENT.ERB:257）',
    );
  }
  // 21-40 档的中间报文（PRINTW 侵攻战斗力减少，:277）
  const fixture = create_era_fixture();
  make_world(fixture, { prestige: 30 });
  await run_invasion(fixture, 1);
  assert(history_texts(fixture).includes('侵攻战斗力减少'));
});

test('威望岌岌可危（0–20）：气力照减半、侵攻度与威望不变，仍返回 1（:270-274）', async () => {
  const fixture = create_era_fixture();
  make_world(fixture, { prestige: 10 });
  const result = await run_invasion(fixture, 1);

  // 早退在共通补正之前：气力已在 :268 减半，其余全部未动
  assert.equal(result, 1, '失败路径同样消耗回合（RETURN 1）');
  assert.equal(fixture.store.get('base:0:1'), 5000, '气力减半先于威望判定');
  assert.equal(fixture.store.get('flag:81'), 0, '侵攻失败不加侵攻度');
  assert.equal(fixture.store.get('exflag:99'), 10, '早退跳过 :978 的 +2');
  assert.equal(fixture.store.get('exp:0:80'), undefined, '不进结果段');
  const texts = history_texts(fixture);
  assert(texts.includes('威望值是【岌岌可危】'));
  assert(texts.includes('侵攻失败'));
});

test('[999] 返回 0：零副作用，不消耗回合（:190-191）', async () => {
  const fixture = create_era_fixture();
  make_world(fixture);
  const result = await run_invasion(fixture, 999);
  assert.equal(result, 0);
  assert.equal(fixture.store.get('flag:81'), 0);
  assert.equal(fixture.store.get('base:0:1'), 10000);
  assert.equal(fixture.store.get('exflag:99'), 70);
});

test('无兵力门槛：0 只怪物也能走 [1]；[0]/[2] 不可达（引擎侧拒收，#130）', async () => {
  // [0]/[2] 在怪物不足时渲染为 `[-]` 文本占位（非按钮）——引擎的 input()
  // 只送达已打印按钮的快捷键，键入 0/2 在渲染层就被弹回。原作 :196-199
  // 的游戏侧重问守卫是引擎死路径；「被拦」的引擎形态＝拒收且画面不重绘
  const locked = create_era_fixture();
  make_world(locked);
  await assert.rejects(
    () => run_invasion(locked, 0),
    /输入不合法！请输入以下值之一：/,
  );
  assert.deepEqual(locked.inputs_consumed, [], '0 未被送达');
  assert.equal(
    history_texts(locked).filter((line) => line.includes('你的怪物数量'))
      .length,
    1,
    '拒收后画面不重绘（原作 $INPUT_LOOP 不重画的引擎等价形态）',
  );

  // [1] 无兵力门槛即可选：0 只怪物照常出兵
  const fixture = create_era_fixture();
  make_world(fixture);
  const result = await run_invasion(fixture, 1);
  assert.equal(result, 1);
  assert.equal(fixture.store.get('flag:81'), 400);

  const texts = history_texts(fixture);
  assert.equal(
    texts.filter((line) => line.includes('怪物数量不足。至少需要600只')).length,
    2,
    '[0]/[2] 两行不可选占位（MON_NUM = 0 < 600，:174/:180）',
  );
  // [1] 是按钮且不带手写编号前缀（引擎 showAcc 自动拼，PR #30）
  assert(
    fixture.lines_history.some(
      (line) =>
        line.type === 'button' &&
        line.accelerator === 1 &&
        line.rendered === '[1] 使用魔王的魔力（经验值）',
    ),
    '[1] 按钮正文 = 使用魔王的魔力（经验值），无 [编号] 前缀',
  );
  assert.equal(
    texts.filter((line) => line.includes('你的怪物数量')).length,
    1,
    '有效路径画面也只画一次（出兵后转场）',
  );
});

test('[0]/[2]/[3] 路线存根：占位行可见、返回 0、零结算（登记项）', async () => {
  // [3] 无兵力门槛即可选
  const raid = create_era_fixture();
  make_world(raid);
  assert.equal(
    await run_invasion(raid, 3),
    0,
    '掠夺路线存根返回 0（不消耗回合）',
  );
  assert(
    raid.store.get('flag:81') === 0 && raid.store.get('base:0:1') === 10000,
  );
  assert(
    history_texts(raid).some((line) => line.includes('@INVASION')),
    '路线存根占位行带原作函数名',
  );

  // 700 只怪物（item:100 = 700 ≥ 600）后 [0] 变为可选，仍是存根
  const monster = create_era_fixture();
  make_world(monster);
  monster.store.set('item:100', 700);
  const { invasion } = monster.load_module('page/page-invasion');
  monster.set_inputs(0);
  assert.equal(await invasion(), 0);
  assert(
    monster.lines_history.some(
      (line) =>
        line.type === 'button' &&
        line.rendered === '[0] 使用现有怪物的一半去进攻（资金·俘虏）',
    ),
    '怪物 ≥ 600 时 [0] 渲染为按钮',
  );
});

test('KYOTEN_EVENT 人间界臂：五档推进、夺回回退、阈值间空转（INVASION_EVENT.ERB:14-104）', async () => {
  const forward = [
    [2000, 0, 1, '占领了村庄'],
    [4000, 1, 2, '占领了港口'],
    [6000, 2, 3, '攻陷了堡垒'],
    [8000, 3, 4, '占领了街道'],
    [10000, 4, 5, '占领了城市'],
  ];
  for (const [progress, stage, next_stage, msg] of forward) {
    const used = create_era_fixture();
    used.store.set('flag:81', progress);
    used.store.set('flag:93', stage);
    const mod = used.load_module('page/page-invasion');
    await mod.kyoten_event(1);
    assert.equal(
      used.store.get('flag:93'),
      next_stage,
      `${msg}：93 ${stage}→${next_stage}`,
    );
    assert(
      history_texts(used).some((line) => line.includes(msg)),
      `${msg} 横幅`,
    );
  }

  const recapture = [
    [500, 1, 0, '人间界的军队占领了村庄'],
    [2000, 2, 1, '人间界的军队占领了港口'],
    [4000, 3, 2, '人间界的军队攻陷了堡垒'],
    [6000, 4, 3, '人间界的军队占领了街道'],
    [8000, 5, 4, '人间界的军队占领了城市'],
  ];
  for (const [progress, stage, next_stage, msg] of recapture) {
    const fixture = create_era_fixture();
    fixture.store.set('flag:81', progress);
    fixture.store.set('flag:93', stage);
    const mod = fixture.load_module('page/page-invasion');
    await mod.kyoten_event(1);
    assert.equal(
      fixture.store.get('flag:93'),
      next_stage,
      `${msg}：93 ${stage}→${next_stage}`,
    );
  }

  // 阈值之间：不打横幅、不动 93（2000 < 侵攻度 < 下一档且档位不符的空转）
  const idle = create_era_fixture();
  idle.store.set('flag:81', 1500);
  idle.store.set('flag:93', 1);
  const mod = idle.load_module('page/page-invasion');
  await mod.kyoten_event(1);
  assert.equal(idle.store.get('flag:93'), 1, '阈值间空转');
  assert.equal(history_texts(idle).length, 0);
});

test('侵攻度封顶 10000 与 KYOTEN_EVENT 经结算链触发（:617-618/:984）', async () => {
  const fixture = create_era_fixture();
  make_world(fixture, { prestige: 90, invasion: 9900 });
  fixture.seed_chara(35, { name: '菲娅', callname: '菲娅' }); // ENDING_1 的菲娅
  // SINKOU = 400 × 1.10 = 440；9900 + 440 = 10340 → 封顶 10000；KYOTEN_EVENT
  // 首档（93 == 0）打「占领了村庄」。封顶后结算尾的 INVASION_CHECK 命中
  // 人间界组（#118 本体）：ENDING_1 演出 → 选 [0] 继续游戏
  const result = await run_invasion(fixture, 1, 0);
  assert.equal(result, 1, '结局演出后 invasion() 仍返回 1（走 TURNEND）');
  assert.equal(fixture.store.get('flag:81'), 10000, '侵攻度封顶');
  assert.equal(fixture.store.get('flag:93'), 1, '结算尾部 KYOTEN_EVENT 已跑');
  assert.equal(
    fixture.store.get('flag:82'),
    1,
    'ENDING_1 已演出（FLAG:82 = 1）',
  );
  assert.equal(
    fixture.store.get('exflag:99'),
    90 + 2 + 10,
    '结算尾 +2（:978）与结局 +10（:1002）都发生',
  );
  assert(
    history_texts(fixture).some((line) => line.includes('占领了村庄')),
    '跨 2000 阈值的横幅经结算链打出',
  );
});

test('【验收 3】[109] 返回 1：run_shop 抛 BeginSignal(TURNEND)（SHOP ver1.0.2.ERB:124-128）', async () => {
  const fixture = create_era_fixture();
  make_world(fixture);
  fixture.set_inputs(109, 1); // 主菜单选 [109] → 侵略画面选 [1]
  const { run_shop } = fixture.load_module('page/page-shop');
  const { BeginSignal } = fixture.load_module('system/flow/begin-signal');

  // :127 BEGIN TURNEND —— 原作引擎行为：BEGIN 结束当前函数；ere 侧信号
  // 上抛由主循环接站（先例：100 分支的 BEGIN TRAIN，#44）
  await assert.rejects(
    () => run_shop(),
    (e) => e instanceof BeginSignal && e.state === 'TURNEND',
  );
  assert.equal(fixture.store.get('flag:81'), 400, '出兵结算在转场前完成');
});

test('[109] 返回 0（999 取消）：不转场，回主菜单重绘', async () => {
  const fixture = create_era_fixture();
  make_world(fixture);
  fixture.set_inputs(109, 999);
  const { run_shop } = fixture.load_module('page/page-shop');
  await assert.rejects(() => run_shop(), /预置输入已耗尽/);
  assert.equal(fixture.store.get('flag:81'), 0);
});

test('invasion()：FLAG:82 决定路由到 post_conquest_menu() 还是 start_campaign()（#468）', async () => {
  const conquered = create_era_fixture();
  make_world(conquered, { fallen: 1 });
  assert.equal(
    await run_invasion(conquered, 999),
    0,
    'FLAG:82 != 0 时走征服后菜单',
  );
  assert(
    !history_texts(conquered).some((line) => line.includes('你的怪物数量')),
    '征服后菜单不会打出窄路径专属的怪物数量提示',
  );

  const narrow = create_era_fixture();
  make_world(narrow, { fallen: 0 });
  assert.equal(
    await run_invasion(narrow, 999),
    0,
    'FLAG:82 == 0 时走既有窄路径',
  );
  assert(
    history_texts(narrow).some((line) => line.includes('你的怪物数量')),
    '窄路径仍打出怪物数量提示',
  );
});

test('征服后菜单渲染：三个地区状态按征服标记切换标签与选项文案（INVASION.ERB:30-67）', async () => {
  const cases = [
    {
      flag: 'flag:87',
      progress_flag: 'flag:86',
      unconquered_progress: '精灵族的领域侵攻度',
      conquered_progress: '黑暗精灵的领土侵攻度',
      unconquered_option: '入侵精灵族的领域',
      conquered_option: '巡视黑暗精灵的领土（已征服）',
      accelerator: 1,
    },
    {
      flag: 'flag:89',
      progress_flag: 'flag:88',
      unconquered_progress: '龙之山脉侵攻度',
      conquered_progress: '混沌龙之山侵攻度',
      unconquered_option: '入侵龙之山脉',
      conquered_option: '巡视混沌龙之山（已征服）',
      accelerator: 2,
    },
    {
      flag: 'flag:91',
      progress_flag: 'flag:90',
      unconquered_progress: '天界侵攻度',
      conquered_progress: '堕天使的淫界侵攻度',
      unconquered_option: '入侵天界',
      conquered_option: '巡视堕天使的淫界（已征服）',
      accelerator: 3,
    },
  ];
  // 三个地区共用同一个侵攻度数值：每个用例只给自己的 FLAG 赋值，其余两个
  // 地区的 FLAG 留在 make_world 的默认 0——如果标签换成了别的地区的数值
  // 列（比如精灵行误读 FLAG:88），命中的行会显示 0/10000 而不是这个值
  const PROGRESS_VALUE = 1234;
  for (const c of cases) {
    for (const conquered of [false, true]) {
      const fixture = create_era_fixture();
      make_world(fixture, { fallen: 1 });
      fixture.store.set(c.flag, conquered ? 1 : 0);
      fixture.store.set(c.progress_flag, PROGRESS_VALUE);
      await run_post_conquest(fixture, 999);
      const expected_progress = conquered
        ? c.conquered_progress
        : c.unconquered_progress;
      const progress_line = fixture.lines_history.find(
        (line) =>
          line.type === 'progress' && line.text.includes(expected_progress),
      );
      assert(progress_line, `${c.flag}=${conquered ? 1 : 0} 的状态条标签`);
      assert(
        progress_line.out.includes(`${PROGRESS_VALUE}/10000`),
        `${c.flag}=${conquered ? 1 : 0} 的状态条数值列取自 ${c.progress_flag}`,
      );
      assert(
        fixture.lines_history.some(
          (line) =>
            line.type === 'button' &&
            line.accelerator === c.accelerator &&
            line.rendered.includes(
              conquered ? c.conquered_option : c.unconquered_option,
            ),
        ),
        `${c.flag}=${conquered ? 1 : 0} 的选项按钮文案`,
      );
    }
  }
});

test('征服后菜单渲染：圣灵骑士堡垒按 FLAG:92 == 15 切换选项文案（INVASION.ERB:68-72）', async () => {
  for (const [stage, expected] of [
    [0, '攻略圣灵骑士的堡垒'],
    [15, '巡视圣灵骑士的卖春堡垒（已征服）'],
  ]) {
    const fixture = create_era_fixture();
    make_world(fixture, { fallen: 1 });
    fixture.store.set('flag:92', stage);
    await run_post_conquest(fixture, 999);
    assert(
      fixture.lines_history.some(
        (line) =>
          line.type === 'button' &&
          line.accelerator === 4 &&
          line.rendered.includes(expected),
      ),
      `FLAG:92 = ${stage} 的 [4] 按钮文案`,
    );
  }
});

test('征服后菜单渲染：天神宫状态条与 [5] 选项三态，两组条件各自独立（:45-49/:73-79）', async () => {
  const cases = [
    {
      label: '开放区间内（route_33=510）：显示天神宫侵攻度条与「攻略天神宫」',
      route_33: 510,
      shrine_stage: 0,
      progress_text: '天神宫侵攻度',
      option_text: '攻略天神宫',
      renders_progress: true,
      renders_option: true,
    },
    {
      label: 'shrine_stage=1（开放区间外）：不显示进度条，选项为「天神宫广场」',
      route_33: 0,
      shrine_stage: 1,
      progress_text: null,
      option_text: '天神宫广场',
      renders_progress: false,
      renders_option: true,
    },
    {
      label:
        'shrine_stage=4（已征服）：显示「淫乱意志的神宫」进度条与已征服选项',
      route_33: 0,
      shrine_stage: 4,
      progress_text: '淫乱意志的神宫侵攻度',
      option_text: '巡视淫乱意志的神宫（已征服）',
      renders_progress: true,
      renders_option: true,
    },
    {
      label: '两个条件都不满足：进度条与 [5] 选项都不渲染',
      route_33: 0,
      shrine_stage: 0,
      progress_text: null,
      option_text: null,
      renders_progress: false,
      renders_option: false,
    },
    {
      // 交叉格：两组条件（进度条随 route_33 优先、按钮随 shrine_stage 优先）
      // 独立成立时优先级彼此相反，原作 :45（IF route_33）与 :73（IF
      // shrine_stage）的分支顺序也确实相反——只用前四组各自单独成立的用例
      // 测不出这一点，参数改成两组条件谁在 if 谁在 else if 都能蒙混过去
      label:
        '交叉格：route_33 开窗且 shrine_stage=4 同时成立，进度条随 route_33、按钮随 shrine_stage',
      route_33: 510,
      shrine_stage: 4,
      progress_text: '天神宫侵攻度',
      option_text: '巡视淫乱意志的神宫（已征服）',
      renders_progress: true,
      renders_option: true,
    },
  ];
  for (const c of cases) {
    const fixture = create_era_fixture();
    make_world(fixture, { fallen: 1 });
    fixture.store.set('exflag:2810', c.route_33);
    fixture.store.set('exflag:102', c.shrine_stage);
    await run_post_conquest(fixture, 999);
    if (c.renders_progress) {
      assert(
        progress_texts(fixture).some((line) => line.includes(c.progress_text)),
        `${c.label}：进度条应渲染`,
      );
    }
    const option_button = fixture.lines_history.find(
      (line) => line.type === 'button' && line.accelerator === 5,
    );
    if (c.renders_option) {
      assert(option_button, `${c.label}：[5] 按钮应渲染`);
      assert(
        option_button.rendered.includes(c.option_text),
        `${c.label}：[5] 按钮文案`,
      );
    } else {
      assert(!option_button, `${c.label}：[5] 按钮不应渲染`);
    }
  }
});

test('征服后菜单派发：999/1000/9/4 各自返回或转发到对应模块（INVASION.ERB:88-131）', async () => {
  const cancel = create_era_fixture();
  make_world(cancel, { fallen: 1 });
  assert.equal(await run_post_conquest(cancel, 999), 0, '[999] 返回 0');

  const crystal_ball = create_era_fixture();
  make_world(crystal_ball, { fallen: 1 });
  crystal_ball.store.set('exflag:9011', 3); // 分子
  crystal_ball.store.set('exflag:9010', 7); // 分母
  assert.equal(await run_post_conquest(crystal_ball, 1000), 0);
  assert(
    history_texts(crystal_ball).some((line) => line.includes('@SENGEN_VIDEO')),
    '[1000] 转发到 SENGEN_VIDEO 存根',
  );
  assert(
    crystal_ball.lines_history.some(
      (line) =>
        line.type === 'button' &&
        line.accelerator === 1000 &&
        line.rendered.includes('[3/7]'),
    ),
    '[1000] 按钮文案的分子分母取自 exflag:9011/9010，顺序不能颠倒',
  );

  const campaign = create_era_fixture();
  make_world(campaign, { fallen: 1 });
  // 9 → post_conquest_menu 转发到 campaign_menu()；999 → campaign_menu()
  // 自身循环的 [返回]（#469 起真身，不再是单行占位输出）
  assert.equal(await run_post_conquest(campaign, 9, 999), 0);
  assert(
    history_texts(campaign).some((line) => line.includes('当前选择的行动')),
    '[9] 调用 campaign_menu()（page-campaign.js，#469 起真身）',
  );

  // [4] ARCANA_FORT 自 #470 起接真身（invasion 域跨域调用不受限）。用
  // FLAG:92 == 15（四门全破）取最短路径：arcana_fort 打三段总结叙述、
  // RETURN 0（不耗回合），不碰角色表
  const fort = create_era_fixture();
  make_world(fort, { fallen: 1 });
  fort.store.set('flag:92', 15);
  assert.equal(await run_post_conquest(fort, 4), 0, '[4] 的四门全破路径返回 0');
  const fort_texts = history_texts(fort);
  assert(
    fort_texts.includes('圣灵骑士全部都被打倒了，四个据点也都被攻陷了。'),
    '[4] 转发到 ARCANA_FORT 真身（#470）',
  );
  assert(
    !fort_texts.some((line) => line.includes('@ARCANA_FORT')),
    '存根行已撤，不再是占位输出',
  );
});

// 下面两条测试都要先让 era.input() 的按钮白名单清空，才能喂进未渲染过的
// 输入值：[5] 命中 :100-101 的拒收会 continue 且不重新 printButton，此时
// 引擎侧下一次 input() 视为自由输入（test/helpers/era-fixture.js:894-918
// 镜像引擎 returnFromButton）——这正是原作 [1001] 与越界输入在实机上仍可
// 达的原因，1:1 保留
test('征服后菜单派发：[5] 拒收清空按钮白名单后，[1001] 仍可达 AGENT_MENU 存根（INVASION.ERB:93-95）', async () => {
  const fixture = create_era_fixture();
  make_world(fixture, { fallen: 1 });
  fixture.store.set('exflag:2810', 0); // route_33 开放区间外，[5] 会被拒收
  fixture.store.set('exflag:102', 1); // shrine_stage >= 1，[5] 按钮仍渲染
  assert.equal(await run_post_conquest(fixture, 5, 1001), 0);
  assert(
    history_texts(fixture).some((line) => line.includes('@AGENT_MENU')),
    '[1001] 转发到 AGENT_MENU 存根（#103：只登记、不排期，不实现本体）',
  );
});

test('征服后菜单派发：[5] 拒收清空按钮白名单后，越界输入仍被 result >= 6 || < 0 拒收（INVASION.ERB:102-105）', async () => {
  for (const bad of [6, -1]) {
    const fixture = create_era_fixture();
    make_world(fixture, { fallen: 1 });
    fixture.store.set('exflag:2810', 0);
    fixture.store.set('exflag:102', 1);
    await assert.rejects(
      () => run_post_conquest(fixture, 5, bad),
      /预置输入已耗尽/,
      `[${bad}] 白名单清空后仍应被越界守卫拒收重问，而不是落到地区选择`,
    );
  }
});

test('征服后菜单 [0]：与 start_campaign() 直驱产生相同结算（提取前后行为不变）', async () => {
  const via_menu = create_era_fixture();
  make_world(via_menu, { fallen: 1 });
  assert.equal(
    await run_post_conquest(via_menu, 0, 1),
    1,
    '[0] 经 post_conquest_menu 委派 start_campaign()，回合已耗返回 1',
  );
  assert.equal(
    via_menu.store.get('flag:81'),
    400,
    '[0] 经 post_conquest_menu 委派后，FLAG:81 与直驱 start_campaign() 结算一致',
  );

  const direct = create_era_fixture();
  make_world(direct, { fallen: 1 });
  direct.set_inputs(1);
  const { start_campaign } = direct.load_module('page/page-invasion');
  assert.equal(await start_campaign(), 1);
  assert.equal(direct.store.get('flag:81'), 400);
});

test('征服后菜单 [1]/[2]/[3]/[5]：地区选择后的出兵续接是登记良好的存根（返回 0）', async () => {
  for (const result of [1, 2, 3]) {
    const fixture = create_era_fixture();
    make_world(fixture, { fallen: 1 });
    assert.equal(
      await run_post_conquest(fixture, result),
      0,
      `[${result}] 存根返回 0`,
    );
    assert(
      history_texts(fixture).some((line) => line.includes('@INVASION')),
      `[${result}] 占位行带原作函数名`,
    );
  }

  // [5] 需要先落在 route_33 的开放区间内才会派发到这里，否则被 :100-101 拒收（见下一用例）
  const shrine = create_era_fixture();
  make_world(shrine, { fallen: 1 });
  shrine.store.set('exflag:2810', 510);
  assert.equal(await run_post_conquest(shrine, 5), 0, '[5] 存根返回 0');
  assert(
    history_texts(shrine).some((line) => line.includes('@INVASION')),
    '[5] 占位行带原作函数名',
  );
});

test('征服后菜单 [5] 的原作真实缺陷：按钮渲染为可选，但 route_33 在开放区间外仍被拒收（:73-76/:100-101）', async () => {
  const fixture = create_era_fixture();
  make_world(fixture, { fallen: 1 });
  fixture.store.set('exflag:2810', 0); // 开放区间外
  fixture.store.set('exflag:102', 1); // shrine_stage >= 1 → 按钮渲染为「天神宫广场」
  const { post_conquest_menu } = fixture.load_module('page/page-invasion');
  fixture.set_inputs(5);
  await assert.rejects(
    () => post_conquest_menu(),
    /预置输入已耗尽/,
    '按钮可选但派发被拒：重问耗尽预置输入而不是转发到地区续接',
  );
});

test('征服后菜单 [5]：选中后 shrine_stage >= 3 时无条件 +=1（:136-137）', async () => {
  for (const [stage, expected] of [
    [3, 4],
    [2, 2],
  ]) {
    const fixture = create_era_fixture();
    make_world(fixture, { fallen: 1 });
    fixture.store.set('exflag:2810', 510); // 开放区间内，派发不被拒
    fixture.store.set('exflag:102', stage);
    await run_post_conquest(fixture, 5);
    assert.equal(
      fixture.store.get('exflag:102'),
      expected,
      `shrine_stage=${stage} → ${expected}`,
    );
  }
});

test('【验收 4】存根清单可检索：docs/stub-registry.md 收录本文件全部占位名', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = fixture.load_module('page/page-invasion');
  // INVASION_CHECK 自 #118 起是真身（五组条件），不在存根名单；
  // ARCANA_FORT 自 #470 起是真身（ere/invasion/invasion-arcana-fort.js），
  // 同样移出
  assert.deepEqual(STUBBED_CALLS, [
    'INVASION',
    'AGENT_MENU',
    'MEDAL_BONUS',
    'INVASION_EVENT_SEIEI',
    'SENGEN_VIDEO',
  ]);
  const registry = fs.readFileSync(
    path.resolve(__dirname, '..', 'docs', 'stub-registry.md'),
    'utf8',
  );
  for (const name of STUBBED_CALLS) {
    assert(registry.includes(name), `存根清单缺少 ${name}`);
  }
});
