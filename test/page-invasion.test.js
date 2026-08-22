/**
 * ere/page/page-invasion.js @INVASION 魔力出兵窄路径的行为测试（issue #117）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点）。经模块公开接口
 * invasion() 直驱（对局内则由 page-shop 的 [109] 分支调用，端到端用例在
 * 本文件末尾经 run_shop 驱动）。
 *
 * 对应 #117 验收清单：
 *   1. 气力 10000 出兵一次：FLAG:81 +400（10000/25）、BASE:0:1 减半、
 *      EX_FLAG:99 +2（另固定 EXP:0:80 += SINKOU/2）；
 *   2. 威望各区间折扣与原作一致（五档全覆盖，含 61–80 无修正与相邻两档）；
 *   3. [109] 返回 1 时确实走到 BEGIN TURNEND（BeginSignal 断言）；
 *   4. 存根登记齐全（本文件 STUBBED_CALLS ⊆ docs/stub-registry.md）。
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

function history_texts(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
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

test('无兵力门槛：0 只怪物也能走 [1]；[0]/[2] 被拦且输入 0/2 重问（:173-199）', async () => {
  const fixture = create_era_fixture();
  make_world(fixture);
  // 0/2（怪物不足被拦）、7（≥4 被拦）、-1（负数被拦）都不重绘、只重问；
  // 之后 1 照常出兵
  const result = await run_invasion(fixture, 0, 2, 7, -1, 1);
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
  // 输入被拦的轮次不重绘：怪物数量行只画一次（画面在 $INPUT_LOOP 里不重画）
  assert.equal(
    texts.filter((line) => line.includes('你的怪物数量')).length,
    1,
    '无效输入在 $INPUT_LOOP 重问，不重绘画面（原作行为）',
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

test('【验收 4】存根清单可检索：docs/stub-registry.md 收录本文件全部占位名', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = fixture.load_module('page/page-invasion');
  // INVASION_CHECK 自 #118 起是真身（五组条件），不在存根名单
  assert.deepEqual(STUBBED_CALLS, [
    'INVASION',
    'MEDAL_BONUS',
    'INVASION_EVENT_SEIEI',
  ]);
  const registry = fs.readFileSync(
    path.resolve(__dirname, '..', 'docs', 'stub-registry.md'),
    'utf8',
  );
  for (const name of STUBBED_CALLS) {
    assert(registry.includes(name), `存根清单缺少 ${name}`);
  }
});
