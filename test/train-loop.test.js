/**
 * ere/system/train/train-loop.js 的行为测试（issue #44：调教回合循环的形状
 * ——谁驱动、回调顺序、SELECTCOM 从哪来）。
 *
 * 缝 = test/helpers/era-fixture.js。**回调顺序与 Emuera 一致**是验收项
 *（顺序错了不报错、只会静默改变游戏行为）：用探针处理器固定
 * @SHOW_STATUS → COM_ABLE 扫描 → @SHOW_USERCOM → 输入 → SELECTCOM →
 * NOWEX 清零 → @EVENTCOM → @COMxx → 结算 → @EVENTCOMEND 的完整顺序。
 * 另含：引擎初始化（beginTrain 先于一切火车表写入）、COM_ABLE 未定义即
 * 可执行、@COMxx 未定义重新要求输入、999 经 @USERCOM 退出、AFTERTRAIN
 * 收尾 endTrain，以及「主菜单 → 调教 → 回主菜单」的端到端闭环。
 *
 * 引擎比对：夹具的调教域表守卫（beginTrain 前写 tflag 报错）在此用引擎
 * 自己的寻址代码锁定（app.asar，engine-bundle）——夹具镜像的是这里的证据。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');
const { preset_gamebase } = require('./helpers/gamebase');

// 世界底座：魔王 + 奴隶 31、目标 31、火车表已开。直接驱动 run_train
//（不经主循环），页面模块按需加载。
function seed_world(fixture) {
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.assi = -1;
  return era_flag;
}

test('引擎初始化：ASSIPLAY/PREVCOM/NEXTCOM 置位，beginTrain 全角色入列且先于火车表写入', async () => {
  const fixture = create_era_fixture();
  const era_flag = seed_world(fixture);
  fixture.load_module('event/event-train'); // @EVENTTRAIN 真身（写 TFLAG）
  fixture.load_module('page/page-usercom'); // 注册 999 → AFTERTRAIN
  fixture.set_inputs(999);
  const { run_train } = fixture.load_module('system/train/train-loop');

  assert.equal(await run_train(), 'AFTERTRAIN');

  // 三面引擎旗标 + 全部已加入角色入列
  assert.equal(era_flag.assiplay, 0);
  assert.equal(era_flag.prevcom, -1);
  assert.equal(era_flag.nextcom, -1);
  const begin = fixture.calls.find((c) => c.api === 'beginTrain');
  assert.deepEqual(begin.args, [0, 31], 'beginTrain 必须收全部已加入角色');
  // beginTrain 在 @EVENTTRAIN 之前（引擎行为：建表 → 事件链）。夹具的守卫
  // （tflag 写入要求表已开）让顺序颠倒在这里炸——EVENTTRAIN 写 200 个 tflag
  assert(
    fixture.var_writes.some((w) => w.name === 'tflag:0' && w.value === 0),
    '@EVENTTRAIN 的 TFLAG 清零必须已执行（表已开）',
  );
});

test('回合循环的回调顺序：与 Emuera 逐条一致（探针固定）', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.era.beginTrain(0, 31); // 探针世界：表已开（run_train 会再调，幂等）
  const { on } = fixture.load_module('system/event/registry');
  const { com_able_family, com_family } = fixture.load_module(
    'system/train/com-family',
  );
  fixture.load_module('page/page-usercom');
  const probe = [];

  // 探针：SHOW_STATUS 落一笔标记（供 COM_ABLE 探针证明自己在其后）
  on('SHOW_STATUS', async () => {
    probe.push('show_status');
  });
  // COM_ABLE 探针：指令 0 显式可执行，并记录执行时刻的标记面
  com_able_family.register(0, async () => {
    probe.push(`com_able_0(after=${probe.includes('show_status')})`);
    return 1;
  });
  on('SHOW_USERCOM', async () => {
    probe.push('show_usercom');
  });
  // 指令 0 的实现（记录 NOWEX 已清零——顺序 10 先于 11 的证据）
  com_family.register(0, async () => {
    probe.push(`com_0(nowex=${fixture.era.get('nowex:31:0')})`);
  });
  on('EVENTCOM', async () => {
    probe.push('eventcom');
  });
  on('EVENTCOMEND', async () => {
    probe.push('eventcomend');
  });

  // 上一回合结算（nextTurnInTrain）夹具记录在 calls，顺序看探针
  fixture.store.set('exkeys', [0, 1]);
  fixture.store.set('nowex:31:0', 7); // 待清零的 NOWEX
  fixture.set_inputs(0, 999);
  const { run_train } = fixture.load_module('system/train/train-loop');
  assert.equal(await run_train(), 'AFTERTRAIN');

  assert.deepEqual(probe, [
    'show_status',
    'com_able_0(after=true)', // COM_ABLE 扫描在 SHOW_STATUS 之后
    'show_usercom', // …且在 SHOW_USERCOM 之前
    'eventcom', // 输入 0：SELECTCOM → NOWEX 清零 → EVENTCOM
    'com_0(nowex=0)', // COM 实现看到已清零（顺序 10 → 11 → 12）
    'eventcomend', // 指令执行完 → 结算 → EVENTCOMEND
    'show_status', // 回合循环回到第一步
    'com_able_0(after=true)',
    'show_usercom',
    // 输入 999：非指令 → USERCOM（page-usercom 的 999 → BEGIN AFTERTRAIN）
  ]);
  // SELECTCOM 与 PREVCOM 的来源（写记录为准——包装层的 || 0 兜底会把
  //「没写」伪装成 0，变异测试抓过的误报通过形态）：
  const flag_writes = (id) =>
    fixture.var_writes.filter((w) => w.name === id).map((w) => w.value);
  assert.deepEqual(flag_writes('flag:10011'), [0], 'SELECTCOM = 玩家输入');
  assert.deepEqual(
    flag_writes('flag:10009'),
    [-1, 0],
    'PREVCOM：引擎初始化 -1，指令执行后更新为 SELECTCOM',
  );
  // UPCHECK 等价结算恰一次（指令执行后、EVENTCOMEND 前）
  assert.equal(
    fixture.calls.filter((c) => c.api === 'nextTurnInTrain').length,
    1,
  );
});

test('COM_ABLE 未定义即视为可执行：零实现下全部 101 个编号可用', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.load_module('page/page-usercom');
  const { scan_usable_commands } = fixture.load_module(
    'system/train/train-loop',
  );
  const { DECLARED_COM_IDS } = fixture.load_module('system/train/com-family');

  assert.deepEqual(
    await scan_usable_commands(),
    [...DECLARED_COM_IDS].sort((a, b) => a - b),
  );
});

test('COM_ABLE 返回 0 的指令不渲染按钮：引擎侧即不可送达（#130）', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  const { on } = fixture.load_module('system/event/registry');
  const { com_able_family } = fixture.load_module('system/train/com-family');
  fixture.load_module('page/page-usercom');
  com_able_family.register(5, async () => 0); // 指令 5 显式禁用
  const probe = [];
  on('EVENTCOM', async () => probe.push('eventcom'));
  on('USERCOM', async (result) => probe.push(`usercom(${result})`));

  // 原用例喂 5 验证「输入走 @USERCOM 而非指令路径」。可执行表驱动按钮
  // 渲染：COM_ABLE = 0 的 5 不印按钮，引擎的 input() 只送达已打印按钮的
  // 快捷键——5 在渲染层就被弹回，@USERCOM 收不到 5（原作 INPUT 收任意
  // 数字时代的路径在引擎侧不存在）。引擎可达的等价断言＝不渲染 + 拒收
  fixture.set_inputs(999);
  const { run_train } = fixture.load_module('system/train/train-loop');
  assert.equal(await run_train(), 'AFTERTRAIN');

  assert(
    !fixture.lines_history.some(
      (line) => line.type === 'button' && line.accelerator === 5,
    ),
    'COM_ABLE = 0 的指令不得渲染为按钮',
  );
  assert.deepEqual(probe, [
    'usercom(999)', // 退出键照常走 @USERCOM（→ BEGIN AFTERTRAIN）
  ]);
  // 全程无指令路径：SELECTCOM 不被写
  assert(
    !fixture.var_writes.some((w) => w.name === 'flag:10011'),
    'USERCOM 路径不得写 SELECTCOM',
  );

  // 拒收锁：喂 5 当场抛「输入不合法」，合法值列表里没有 5
  const locked = create_era_fixture();
  seed_world(locked);
  const { com_able_family: family_locked } = locked.load_module(
    'system/train/com-family',
  );
  locked.load_module('page/page-usercom');
  family_locked.register(5, async () => 0);
  locked.set_inputs(5);
  const { run_train: run_locked } = locked.load_module(
    'system/train/train-loop',
  );
  await assert.rejects(() => run_locked(), /输入不合法！请输入以下值之一：/);
  assert(!locked.inputs_consumed.some((e) => e.value === 5), '5 未被送达');
});

test('@COMxx 未实现：EVENTCOM 后重新要求输入（不结算、不进 EVENTCOMEND）', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  const { on } = fixture.load_module('system/event/registry');
  fixture.load_module('page/page-usercom');
  const probe = [];
  on('SHOW_STATUS', async () => probe.push('show_status'));
  on('EVENTCOM', async () => probe.push('eventcom'));
  on('EVENTCOMEND', async () => probe.push('eventcomend'));

  fixture.set_inputs(0, 999); // 0 可执行（COM_ABLE 默认）但 @COM0 未实现
  const { run_train } = fixture.load_module('system/train/train-loop');
  assert.equal(await run_train(), 'AFTERTRAIN');

  assert.deepEqual(probe, [
    'show_status',
    'eventcom', // EVENTCOM 先行（本移植的解读，#45 对实机核对——见
    // train-loop.js 文件头第 12 步说明）
    'show_status', // COM 缺失 → 丢弃输入回到循环头；无 eventcomend
  ]);
  assert.equal(
    fixture.calls.filter((c) => c.api === 'nextTurnInTrain').length,
    0,
    '缺失指令不得触发结算',
  );
  const era_flag = fixture.load_module('era-utils/era-flag');
  assert.notEqual(era_flag.prevcom, 0, '缺失指令不得更新 PREVCOM');
});

test('999 → @USERCOM → AFTERTRAIN：run_aftertrain 跑 @EVENTEND 并收尾 endTrain', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.era.beginTrain(0, 31);
  fixture.store.set('base:31:0', 2000); // 存活——死亡分支会跳过其后的珠结算
  // 失神旗标（TFLAG:860）：@EVENTEND 体内要写 tflag——endTrain 若先跑（删表），
  // 这笔写入会被守卫拦下（引擎寻址语义），flag:7 落不了盘。以此固定
  //「链后收尾」的顺序
  fixture.store.set('tflag:860', 1);
  fixture.load_module('event/event-train');
  fixture.load_module('event/event-end');
  fixture.load_module('page/page-usercom');
  // 直接驱动两段状态处理器（主循环接驳在端到端用例证）；第二枚 999 是
  // @JUEL_CHECK 交互循环的退出键（#47）
  fixture.set_inputs(999, 999);
  const { run_train, run_aftertrain } = fixture.load_module(
    'system/train/train-loop',
  );

  assert.equal(await run_train(), 'AFTERTRAIN');
  assert.equal(await run_aftertrain(), 'TURNEND');
  // @EVENTEND 体内的 tflag 写入成功 = 收尾在其后
  assert(
    fixture.var_writes.some((w) => w.name === 'flag:7' && w.value === 1),
    '@EVENTEND 的失神旗标复位必须发生在 endTrain 之前',
  );
  // endTrain 在 @EVENTEND 链后收尾（gotjewel 结算 + 删表）
  const call_names = fixture.calls.map((c) => c.api);
  assert(call_names.indexOf('endTrain') > call_names.indexOf('beginTrain'));
  assert(fixture.text_lines().includes('调教结束了。'));
  // @JUEL_CHECK 已是真身（#47）：结算表在 @EVENTEND 链内落地（gotjuel 的
  // 读写都要求火车表仍在，endTrain 在其后收尾——上一条 tflag 断言同构）
  assert(fixture.text_lines().includes('以上的点数变化了。'));
});

test('端到端：主菜单输入 100 → 选目标 → 调教画面 → 999 → 回主菜单（一条用例）', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  preset_chara_0(fixture);
  // 初期奴隶由 #50 落地；本用例按工单事实 #12 在测试里播种：EVENTFIRST 链
  // 的 LATER 档追加处理器（#6 语义：BEGIN 后链继续），等价「开局就有奴隶 31」
  fixture.seed_chara(31, { id: 31, name: '温妮', callname: '温妮' });
  // 体力预设（真实游戏由 Chara31.yml 的 基礎 行落地；@EVENTEND 的死亡判定
  // 读它——无预设时体力 0 会触发死亡删除分支，那不是本用例的目标路径）
  fixture.store.set('base:31:0', 2000);
  // 行动完了预置（#172 起 PARTY_UNITE 真身：回合结算的队伍编成会把它
  // 复位为 0——占位行时代该断言盯「原作 @PARTY_UNITE，」，真身后改盯
  // 数据效果）
  fixture.store.set('cflag:31:530', 1);
  const { on, TIER } = fixture.load_module('system/event/registry');
  on('EVENTFIRST', async () => fixture.era.addCharacter(31), TIER.LATER);

  // 初期奴隶问答（#50）夹在标题与开场叙事之间：选 0 = 随机，随机路径仍是
  // RAND_CHARA_MAKE 存根，奴隶由上面的 LATER 处理器播种——本用例要的是
  // 「开局就有奴隶 31」，不走村娘（那会引入角色 17 与另一串读键）。
  // 末尾两枚：999 = 调教菜单退出、999 = @JUEL_CHECK 交互循环退出（#47）
  fixture.set_inputs(1, 0, 100, 31, 999, 999);
  const main = fixture.load_module('main');

  // 标题(1) → FIRST → SHOP → 100 → SELECT_TARGET(31) → TRAIN 一回合
  //（SHOW_STATUS + 菜单）→ 999 → AFTERTRAIN（@EVENTEND + @JUEL_CHECK）
  // → TURNEND → SHOP 重绘 → 下一次 input 队列已空，抛「预置输入已耗尽」到站
  await assert.rejects(() => main(), /预置输入已耗尽/);

  // 消费序列：标题(1) → 初期奴隶问答(0，#50) → 开场叙事读键 ×7
  //（@EVENTFIRST）→ 菜单 100 → 选人 31 → PRITRAIN 存根读键 → 999 →
  // @EVENTEND 读键 → @JUEL_CHECK 的 WAIT 读键 → 999（能力值提高结束）
  assert.deepEqual(fixture.inputs_consumed, [
    { api: 'input', value: 1 },
    { api: 'input', value: 0 },
    ...Array.from({ length: 7 }, () => ({ api: 'waitAnyKey' })),
    { api: 'input', value: 100 },
    { api: 'input', value: 31 },
    { api: 'waitAnyKey' },
    { api: 'input', value: 999 },
    { api: 'waitAnyKey' },
    { api: 'waitAnyKey' },
    { api: 'input', value: 999 },
    { api: 'waitAnyKey' },
  ]);

  const texts = fixture.text_lines();
  // 进过调教：目标选择画面 + 调教状态画面 + 调教结束按钮
  assert(texts.includes('请魔王大人选择将要调教的奴隶人选'));
  assert(texts.some((line) => line.includes('温妮 调教中')));
  assert(
    fixture.lines.some(
      (line) => line.type === 'button' && line.accelerator === 999,
    ),
  );
  // 出过调教：@EVENTEND 消息 + 珠结算表（#47）+ 回合结算三档链（#114）+
  // 回到主菜单（状态行恰两次：100 之前一次、回程重绘一次）
  assert(texts.includes('调教结束了。'));
  assert(texts.includes('以上的点数变化了。'));
  assert(
    fixture.lines.some(
      (line) =>
        line.type === 'button' &&
        line.accelerator === 999 &&
        line.rendered === '[999] - 能力值提高结束',
    ),
    '@JUEL_CHECK 的退出键必须是按钮（PR #53）',
  );
  // 回合结算三档链已落地（#114）：#PRI 存根在场；PARTY_UNITE 自 #172 起
  // 真身（ere/dungeon/），占位行退场、效果是行动完了复位（上方预置 1）
  assert(texts.some((line) => line.includes('原作 @AUTO_BUYING，')));
  assert(
    !texts.some((line) => line.includes('原作 @PARTY_UNITE，')),
    'PARTY_UNITE 已是真身（#172），不应再打占位行',
  );
  assert.equal(
    fixture.store.get('cflag:31:530'),
    0,
    'PARTY_UNITE 真身应把行动完了复位（预置的 1 被清掉）',
  );
  assert.equal(
    texts.filter((line) => line.includes('所持金')).length,
    2,
    '主菜单状态行应恰出现两次（去程与回程）',
  );
  // 闭环后的指针：@EVENTEND 尾部还原为记录值；FLAG:1 = 前回调教目标；
  // 体力充足不触发死亡删除（角色仍在场）
  const era_flag = fixture.load_module('era-utils/era-flag');
  assert.equal(era_flag.time, 1, '回合结算应把时段从午前推进到午后（#114）');
  assert.equal(era_flag.target, 31);
  assert.equal(fixture.store.get('flag:1'), 31);
  assert(fixture.era.getAddedCharacters().includes(31));
  // 调教回数 +1（PRITRAIN 承载头部）
  assert.equal(fixture.store.get('cflag:31:10'), 1);
  // beginTrain/endTrain 各恰一次
  assert.equal(fixture.calls.filter((c) => c.api === 'beginTrain').length, 1);
  assert.equal(fixture.calls.filter((c) => c.api === 'endTrain').length, 1);
});

// —— 夹具守卫的引擎比对：调教域表的寻址前置条件是真引擎行为 ——

const { load_engine_bundle } = require('./helpers/engine-bundle');

const engine = load_engine_bundle();
const engine_test = engine ? test : test.skip;

engine_test(
  '引擎比对：beginTrain 前 tflag 寻址落到兜底报错，palam 三段静默丢弃',
  () => {
    const { set_var } = engine;
    const errors = [];
    const fake_this = {
      // staticData.flag 必须在：引擎二段寻址先经名字表翻译（safeUndefinedCheck
      // 回退原键），staticData 缺表会在翻译处就 TypeError——那不是本用例要证
      // 的行为
      staticData: { flag: {}, juel: {}, ex: {} },
      data: { flag: {}, palam: {} }, // 无 tflag 表、palam 无角色子表
      era: {
        error: (msg) => {
          errors.push(msg);
          throw new Error(msg);
        },
      },
    };
    // 二段 tflag：data.tflag 不存在 → 兜底分支 era.error（引擎原文）
    assert.throws(() => set_var.call(fake_this, 'tflag:0', 1), /key error/);
    // 三段 palam（角色未入调教）：`if(!this.data[a]||!this.data[a][c])return;`
    // 静默丢弃，不抛错、不建键
    assert.equal(set_var.call(fake_this, 'palam:5:3', 9), undefined);
    assert.equal(fake_this.data.palam[5], undefined);
    // 常驻 flag 表不受影响（对照组）
    assert.equal(set_var.call(fake_this, 'flag:0', 7), 7);
    assert.equal(errors.length, 1, '只有 tflag 一例报错');
  },
);

test('夹具镜像：beginTrain 前写 tflag 抛同款错，入列后放行，endTrain 后再关', () => {
  const fixture = create_era_fixture();

  assert.throws(() => fixture.era.set('tflag:0', 1), /key error/);
  fixture.era.beginTrain(0, 31);
  assert.equal(fixture.era.set('tflag:0', 1), 1);
  // 角色未入列：三段寻址静默丢弃（引擎同款）
  assert.equal(fixture.era.set('palam:99:3', 5), undefined);
  assert.equal(
    fixture.var_writes.some((w) => w.name === 'palam:99:3'),
    false,
  );
  fixture.era.addCharacterForTrain(99);
  assert.equal(fixture.era.set('palam:99:3', 5), 5);
  fixture.era.endTrain();
  assert.throws(() => fixture.era.set('tflag:0', 2), /key error/);
});
