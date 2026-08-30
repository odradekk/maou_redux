/**
 * 范围 B 比对的行为锁（issue #161 阶段二）。
 *
 * 三层：
 *   1. 六份样本的比对基线锁：每份跑「golden 事件流 vs replay-b 回放」，
 *      断言 matched / version / stub / unexplained 四个数的**精确值**——
 *      数字漂移即红（移植推进让 ere 侧多输出一条时，必须有意更新这里，
 *      而不是让比对静默变绿/变红）。当前基线是 #161 首次全绿的实测。
 *   2. 回放器裁定行为：输入走 useRule:false 通道（Emuera 自由输入语义）、
 *      输入标记带 Row（原作 CLEARLINE 的清行效果两侧同构：标题 0 消失、
 *      读档 99 保留）、最大态置位的注入时序（首绘自然态、重绘最大态）。
 *   3. 观测面：与黄金日志语义同构（追加历史 + 原作 CLEARLINE 生效）——
 *      主菜单旧版保留在比对流（原作追加滚动）、读档翻页的中间列表被剔除
 *      （原作就地清行）。
 *
 * 依赖引擎环境（ERE_ENGINE_ASAR 指向 app.asar）的用例按既有惯例跳过并
 * 留警告？——否：回放走夹具（纯 Node），本文件不依赖引擎。cli 的 spawn
 * 也不读引擎。全用例无引擎依赖。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { golden_stream, fixture_stream } = require('../tools/compare/normalize');
const { diff_streams } = require('../tools/compare/diff');
const { replay_scope_b } = require('../tools/compare/replay-b');

const REPO = path.resolve(__dirname, '..');

// —— 1. 六份样本的比对基线锁 ——

// 数字来源：#161 首次全绿实测（2026-08 工作树）。matched 升 / stub 降 =
// 移植推进，更新此处是每次推进的一部分；unexplained 必须恒为 0——它非零
// 就是有名有姓之外的真差异候选（当场归因或立票，不许改基准放行）。
// #180 推进：[102] 地下城按钮落地（saveload 两样本 matched +2）；地城日常
// 面板真身化后尾部 DISPLAY_DUNGEON_DAILY 存根行进 stub 计数（mainmenu
// +1/+2、daycycle +3——样本过 5 号面板的次数），两读数真身行经归因规则
// 进 matched/stub 的其余部分不变。
const BASELINE = {
  'mainmenu-natural': { matched: 34, version: 2, stub: 81, unexplained: 0 },
  'mainmenu-max': { matched: 41, version: 2, stub: 111, unexplained: 0 },
  // saveload 两份自 #228 起 150/213：diff.js 的 menu 集合比对改「相等
  // token 先配」（同号槽位条目在两侧次序受重绘影响，按下标配对会把同形
  // 条目错开成伪 change 对——存读档槽位组正撞此形，+4 匹配 / −8 存根）。
  // 补偿该假差异的 <TS> 备注错位归因规则随之无消费者，与配对修正一并
  // 拆除（rules.js 原位留注、M305 删——删前删后四数逐数不变、
  // unexplained 仍 0，验收反馈一）
  'saveload-natural': { matched: 150, version: 2, stub: 213, unexplained: 0 },
  'saveload-max': { matched: 150, version: 2, stub: 213, unexplained: 0 },
  'daycycle-natural': { matched: 46, version: 2, stub: 221, unexplained: 0 },
  'daycycle-max': { matched: 46, version: 2, stub: 261, unexplained: 0 },
};

for (const [name, expected] of Object.entries(BASELINE)) {
  test(`比对基线锁：${name} 匹配 ${expected.matched} / 版本 ${expected.version} + 存根 ${expected.stub} + 未解释 ${expected.unexplained}`, async () => {
    const [segment, state] = name.split('-');
    const { stream_source } = await replay_scope_b(segment, state);
    const golden = golden_stream(
      fs.readFileSync(path.join(REPO, 'golden', `${name}.log`), 'utf8'),
    ).filter((e) => e.kind !== 'discard' && e.kind !== 'group');
    const ere = fixture_stream(stream_source).filter(
      (e) => e.kind !== 'discard' && e.kind !== 'group',
    );
    const report = diff_streams(golden, ere, { scope: 'B', segment });
    assert.deepEqual(
      {
        matched: report.matched,
        version: report.summary.version,
        stub: report.summary.stub,
        unexplained: report.summary.unexplained,
      },
      expected,
      `基线漂移：ere 侧输出或归因规则变了——有意推进则更新 BASELINE，否则查差异明细`,
    );
    // 差异条目全部带归因理由（报告可读性的最低门槛）
    assert.ok(
      report.diffs.every(
        (d) => typeof d.reason === 'string' && d.reason.length > 0,
      ),
    );
  });
}

// —— 2. 回放器裁定行为 ——

test('输入标记带 Row 进流：数字回显是 input、原作 CLEARLINE 的对应行为可归因', async () => {
  const { stream_source } = await replay_scope_b('mainmenu', 'natural');
  const inputs = stream_source.filter((e) => e.type === 'input');
  // 标题的 0 与读档的 99 都以 input 条目在场。原作里 0 的回显行被读档
  // 分支的 CLEARLINE 1 清掉（黄金样本无此行）；ere 侧该 clear 未镜像
  //（#19 决策，#68 勘误），0 留在流里、由 rules 的 input:0 规则归因——
  // 标记带 Row 使「原作确实清行的场景」（翻页 102/101）两侧同构消失
  assert.deepEqual(
    inputs.map((i) => i.text),
    ['0', '99'],
  );
  // golden 侧同一样本的 input 只有 99（CLEARLINE 1 生效）——差异即归因对象
  const golden_inputs = golden_stream(
    fs.readFileSync(path.join(REPO, 'golden', 'mainmenu-natural.log'), 'utf8'),
  ).filter((e) => e.kind === 'input');
  assert.deepEqual(
    golden_inputs.map((i) => i.text),
    ['99'],
  );
});

test('最大态置位时序：首绘自然态、置位后重绘最大态（模拟 Ctrl+D）', async () => {
  const natural = await replay_scope_b('mainmenu', 'natural');
  const max = await replay_scope_b('mainmenu', 'max');
  // natural 的比对流里没有 [106]/[110]/[111] 按钮（灰条），max 的重绘后有
  // ——ere 侧这些按钮本就未渲染，这里断言回放侧的置位痕迹：置位键落库
  const ere_flag = max.fixture.load_module('era-utils/era-flag');
  // fixture 的 store 是播种面：置位写进 flag:37/83/84、talent:0:325
  assert.equal(max.fixture.store.get('flag:37'), 1);
  assert.equal(max.fixture.store.get('flag:83'), 5);
  assert.equal(max.fixture.store.get('flag:84'), 3);
  assert.equal(max.fixture.store.get('talent:0:325'), 1);
  assert.equal(max.fixture.store.get('item:24'), 3);
  assert.equal(max.fixture.store.get('item:25'), 2);
  assert.equal(ere_flag.day_count, 6); // 播种不被置位污染
  // natural 段同样键不存在（未置位）
  assert.equal(natural.fixture.store.get('flag:37'), undefined);
});

test('199/9999 经 useRule:false 通道可达（Emuera 自由输入语义）', async () => {
  // daycycle 的 199 在 ere 实机因按钮未渲染而不可达（#129/#130）；回放
  // 模拟 Emuera 世界的输入，199 必须送达 usershop（存根行即证据）。
  // 通道若被拆（恢复夹具白名单校验），199 会被拦下并抛
  // 「输入不合法！请输入以下值之一」——回放当场崩，本用例与基线锁全红
  const daycycle = await replay_scope_b('daycycle', 'natural');
  const texts = daycycle.fixture.lines_history
    .filter((l) => l.type === 'text')
    .map((l) => l.text);
  assert.ok(
    texts.some((t) => t.includes('休息（回合结束）尚未移植')),
    '199 分支的存根行必须在场——useRule:false 通道放行了无按钮输入',
  );
  // mainmenu-max 的 9999（无效输入触发重绘）同理——0 的标记也在场
  //（读档成功直接转场，标题重绘的整屏 clear 未跑；见上一用例说明）
  const max = await replay_scope_b('mainmenu', 'max');
  const marks = max.fixture.lines_history.filter((l) => l.type === 'input');
  assert.deepEqual(
    marks.map((m) => m.text),
    ['0', '99', '9999'],
  );
});

// —— 3. 观测面：与黄金日志语义同构 ——

test('主菜单旧版保留（原作追加滚动），翻页中间列表被剔除（原作就地清行）', async () => {
  // saveload 段：黄金样本含 4 版主菜单（绘制次数表），ere 比对流必须同样
  // 保留 4 版（就地重绘的 clear 不剔）——状态行是最稳的版本计数器
  const { stream_source } = await replay_scope_b('saveload', 'natural');
  const texts = fixture_stream(stream_source)
    .filter((e) => e.kind === 'text')
    .map((e) => e.text);
  const status_lines = texts.filter((t) =>
    /^第\d+年 \d+月\d+日（第\d+日） (上午|下午) \(所持金：\d+ pts\.\)$/.test(t),
  );
  assert.equal(
    status_lines.length,
    4,
    `主菜单四版都必须在比对流（ADR-0003 重绘的清行不剔）：实际 ${status_lines.length}`,
  );
  // 翻页（102→101）的中间列表被剔除：读档画面的槽位备注在黄金样本只
  // 出现「最终版」——ere 侧翻页重画的中间列表同样不进比对流。以 `<TS> `
  // 备注形态过滤（val=0 还会命中标题「旧的奴隶」与确认「取消」按钮，
  // 它们不属槽位列表）。首屏读档 1 + 保存画面 3 + 读取终版 1 = 5，
  // 与黄金样本逐数一致
  const slot0 = fixture_stream(stream_source).filter(
    (e) => e.kind === 'menu' && e.val === 0 && e.key.startsWith('<TS> '),
  );
  assert.equal(
    slot0.length,
    5,
    `翻页中间列表必须被观测面剔除（原作 CLEARLINE 语义）：实际 ${slot0.length}`,
  );
});

test('故事命名的回显与反馈行：INPUTS 回显标 text、命名流程在 ere 观测面被清', async () => {
  const { stream_source, fixture } = await replay_scope_b(
    'saveload',
    'natural',
  );
  // 文本输入的回显按 Emuera 形态标 **text**（黄金侧逐行无法区分回显与
  // 叙述，两侧同构）——标记在 lines_history 里以 text 形态在场
  assert.ok(
    fixture.lines_history.some(
      (l) => l.type === 'text' && l.text === '对拍样本',
    ),
    'INPUTS 回显标记必须是 text（不是 input）',
  );
  // 命名流程三行（提示 / 回显 / 反馈）在 ere 观测面被 save_game 循环尾
  // 的统一清行清掉（ere 滚动视图决策 vs 原作命名后堆叠，:212 注释掉
  // CLEARLINE）——比对流不在、归因走 rules 的命名三行规则；取证层
  //（lines_history）完备
  const stream = fixture_stream(stream_source);
  assert.ok(
    !stream.some(
      (e) =>
        (e.kind === 'text' &&
          (e.text === '对拍样本' || e.text === '请输入一个名称故事：')) ||
        (e.kind === 'text' && e.text.startsWith('将故事命名为')),
    ),
    '命名流程行在 ere 比对流中应缺席（被清行，已知形态差）',
  );
  assert.ok(
    fixture.lines_history.some(
      (l) => l.type === 'text' && l.text.startsWith('将故事命名为'),
    ),
    '反馈行的取证记录必须在场（观测面剔除 ≠ 历史丢失）',
  );
});
