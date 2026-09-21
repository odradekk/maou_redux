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
// #339 推进：角色出售接进 DRAW_MAINMENU 的条件入口面板（:208-319）后，
// 此前记作「条件入口灰条未渲染」的 [---] 分隔行开始渲染并对上 golden，
// 逐样本 matched 升、stub 等量降（mainmenu +1/+2、saveload +4、daycycle
// +3——各样本走过该面板的次数），unexplained 仍 0。基线漏测在 PR 档没
// 被选中，由 master push 兜住（fb96276d 起连红三次）。
// #348 推进：處刑相關六文件与设施界面落真身后，matched 再升一档
//（mainmenu +1/+2、saveload +4、daycycle +3），stub 等量降；其后 #337、
// #346、#350 三次合并各让 stub 再降 1/1/2/2/1/1。下面是 6fd00d0 的实测。
// 又一次漏测：PR 档按改动面选不中本文件，master push 从 09cc886 起连红
// 四次而无人看——判交付时 PR 绿不等于 master 绿，两处都要看。
// #338 新增 sale-natural 一组（并入 master 后实测，stub 较分支点少 1）；
// 六份既有读数与 master 一致，本票不改。
// #395 推进：主菜单指令面板 [101]-[888] 全部按钮真身化（原作 guard 逐条
// 复刻）+ SHOW_LIST_TRAINABLE/SHOW_LIST_ASSISTABLE 富化列，四段样本
// matched 大幅上升、stub 等量下降（各样本按钮命中的守卫数量不同，涨幅
// 不等）；199 休息真身化（BEGIN TURNEND 真转场）令 daycycle 段首次真的
// 推进一次回合，回放计划相应改为只送一次 199（tools/compare/replay-b.js
// 的 daycycle 计划注释）；unexplained 全部仍为 0。
// #388 推进（rebase 到 #395 之后重测）：CHARA_NAME_INIT 从存根落表真身化
// （无可见输出，静默调用），stub 计数按每份样本回放实际经过的调用点次数
// 各降：EVENTFIRST 在全部七样本的新档开局都会经过一次（mainmenu/daycycle/
// sale 各 -1），saveload 的存读档往返额外经过一次 EVENTLOAD（再 -1，故
// saveload 两份共 -2）；matched 不变——该调用点本就没有可见输出可对齐，
// 只是不再计入「待实现」。下面七组数字是 rebase 后 --sample 逐份重测的
// 实测值。
// #399 推进：道具商店与怪物商店落真身（ere/page/page-item-shop.js /
// page-monster-shop.js / page-chara-shop.js），BOUGHT 0-53 支的占位行消失。
// 同时**补上了回放播种的一个缺口**：seed_scope_b 此前不播 BOUGHT，era.get
// 读回 undefined → 0，而 0 在 @SHOW_SHOP 的判据里是「正在道具商店里」——
// #395 的占位支（画一行就复位）把这个缺口盖住了，真身落地后它会把整屏画成
// 商店（本票实测 mainmenu-natural 匹配 48 → 28、未解释 13）。播种补
// `era_flag.bought = -1`（真实存档里 @EVENTSHOP:20 每轮进店恒置 -1）后
// 七份样本各 -1 存根（那句占位行不再出现，与之配对的 stub 归因条目一并
// 消失），matched 与 unexplained 不动。下面七组是重测的实测值。
const BASELINE = {
  'mainmenu-natural': { matched: 48, version: 2, stub: 64, unexplained: 0 },
  'mainmenu-max': { matched: 70, version: 2, stub: 77, unexplained: 0 },
  // saveload 两份自 #228 起 150/213：diff.js 的 menu 集合比对改「相等
  // token 先配」（同号槽位条目在两侧次序受重绘影响，按下标配对会把同形
  // 条目错开成伪 change 对——存读档槽位组正撞此形，+4 匹配 / −8 存根）。
  // 补偿该假差异的 <TS> 备注错位归因规则随之无消费者，与配对修正一并
  // 拆除（rules.js 原位留注、M305 删——删前删后四数逐数不变、
  // unexplained 仍 0，验收反馈一）
  'saveload-natural': { matched: 206, version: 2, stub: 149, unexplained: 0 },
  'saveload-max': { matched: 209, version: 2, stub: 143, unexplained: 0 },
  // #401（N17）推进：回合结束链的十个存根换真身后，日循环样本里
  // @IN_VAGINA_ALL / @CONCEPTION_CHECK_ALL（各 4 处）、@AUTO_BUYING 与
  // @DEBUG_CHECK（各 2 处）的占位行消失，真身自己又带回若干占位（它们调用的
  // 下游仍是存根），净减 7：natural 190 → 183、max 230 → 223。matched 不变
  // （这些占位行本就不产生 matched），unexplained 仍 0。数字为合并态实测
  // （并上含 #389/#397 的 master 之后），由派单人重测写回。
  // #469 推进：@CAMPAIGN_GAMEOVER 落真身（turnend-settle.js，FLAG:400 = 0
  // 早退、无输出）——回合结束处原先无条件的占位行消失，本处 ere 侧只剩
  // AUTOTRAIN 一条占位，与 golden 侧两行地图读数的配对随之重排：占位行改配
  // 第一行读数，第二行改归 GEO_OUTPUT_2（2D 地图输出未移植）。net -1
  // 存根：natural 182 → 181、max 222 → 221；matched 不变（占位行不产生
  // matched），unexplained 仍 0。数字为合入 #461 返工 master 后实测写回。
  'daycycle-natural': { matched: 71, version: 2, stub: 181, unexplained: 0 },
  'daycycle-max': { matched: 71, version: 2, stub: 221, unexplained: 0 },
  // #338 出售段：能力值提升尚为存根，出售全链与 K0 黑市末路已回放。
  // #384 推进（rebase 到 #419 之后重测）：CN_REBUILD 从存根落真身
  // （ere/chara/chara-name.js；改名后按姓名重建称呼，**无输出**），出售段
  // 回放里那条 `（名字重建尚未移植…）` 占位行随之消失——ere 事件流少一条，
  // 与它对上的那条 stub 归因条目一并消失：stub 160 → 159，matched 不变
  // （该占位行此前是 stub 对的一侧，不产生 matched）、unexplained 仍 0。
  // 同票的 CHARA_NAME_DEFINE 等真身不出现在本样本的回放窗口里（实测：
  // 只把 chara-name.js 换回 master 版即复现 160）。
  // #397 返工：@ABILITY_UP / @LIFE_LIST 族落地后 105 不再按一下就返回（真身
  // 是「选人列表 + CORE」两层、都要吃输入），回放计划按黄金样本的回显序列
  // 补齐三层（tools/compare/replay-b.js 的 sale 计划与注释），ere 侧自此真的
  // 走进能力提升画面——matched 123 → 163、stub 159 → 131、unexplained 仍 0。
  // 同票的另三处配套（都在本文件外的注释里写明）：① 播种补上静态名表
  // （ablname/palamname/expname/expkeys/markname，取 yml 产物）与样本行给出
  // 的取值（LV/调教回数/职业/性格、juel 点数、经验、初吻对象）；② 归因把
  // 已作废的「89-178 行一律算能力提升画面未移植」换成四条真实成因（可提升
  // 标记 * 未接入、切换按钮与角色行的 PR #53 按钮化形态差，两侧各一条）；
  // ③ 归一层认「整行只有线绘字符」的折行残段（sale-natural-log:178 的 `═`）。
  // 另六个样本的四数与基线逐字相同（返工实测），未改。
  // 【#462 后重测】YOKUBO_UP_CHECK 从 page-ability-up.js（RESULT===999 出口，
  // :247）与 juel-check.js（$LABEL_EXIT，:542）两处各自的 stub_line 占位，
  // 改接共用真身 ere/system/train/ability-check.js。本样本经能力提升画面，
  // 「欲情变化检查尚未移植」占位行消失；温妮欲望达标（ABL:11=5>=3）但压抑/
  // 抵抗天赋（TALENT:32/34）均未播种，条件不成立、真身无 PRINT 输出，故
  // 只是差异整行消失（非改判为 matched），stub 130 → 129，matched/
  // unexplained 不变。
  'sale-natural': { matched: 163, version: 2, stub: 129, unexplained: 0 },
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

test('出售资格提示属于已实现输出，缺失时必须进入未解释差异', async () => {
  const { stream_source } = await replay_scope_b('sale', 'natural');
  const golden = golden_stream(
    fs.readFileSync(path.join(REPO, 'golden', 'sale-natural.log'), 'utf8'),
  ).filter((e) => e.kind !== 'discard' && e.kind !== 'group');
  const ere = fixture_stream(stream_source).filter(
    (e) =>
      e.kind !== 'discard' &&
      e.kind !== 'group' &&
      !(e.kind === 'text' && e.text === '温妮可以卖掉了'),
  );
  const report = diff_streams(golden, ere, { scope: 'B', segment: 'sale' });

  assert.ok(
    report.diffs.some(
      (diff) =>
        diff.side === 'golden' &&
        diff.entry.text === '温妮可以卖掉了' &&
        diff.category === 'unexplained',
    ),
  );
  assert.equal(report.summary.unexplained, 1);
});

// —— #397 返工：形态差规则的配对前提，两条锁定 ——
//
// 能力提升画面的切屏按钮与角色列表行，两侧的**排版**不同（Emuera 的
// PRINTBUTTON/定宽文本与文本同行，ere 的 printButton/编号按钮格独占行，
// PR #53 通则），归因规则按形态差解释。形态差**只解释排版、不豁免内容**：
// tools/compare/rules.js 的那几条规则都带「对侧真有对应条目」的配对前提，
// 下面两条把这一点锁住——把 ere 侧的对应输出拿掉，golden 半边必须落进
// 未解释差异（与上一条 #338 先例同款）。少了它们，「按钮整个没渲染」「行
// 里的值算错」都会被形态差规则静默放行（#397 第二轮验收实测）。
test('能力提升画面的切屏按钮属于已实现输出，缺失时必须进入未解释差异', async () => {
  const { stream_source } = await replay_scope_b('sale', 'natural');
  const golden = golden_stream(
    fs.readFileSync(path.join(REPO, 'golden', 'sale-natural.log'), 'utf8'),
  ).filter((e) => e.kind !== 'discard' && e.kind !== 'group');
  const ere = fixture_stream(stream_source).filter(
    (e) =>
      e.kind !== 'discard' &&
      e.kind !== 'group' &&
      !(e.kind === 'menu' && e.key === '▌奴隶一览'),
  );
  const report = diff_streams(golden, ere, { scope: 'B', segment: 'sale' });

  assert.ok(
    report.diffs.some(
      (diff) =>
        diff.side === 'golden' &&
        diff.entry.text === '▌奴隶一览 ▌勇者一览' &&
        diff.category === 'unexplained',
    ),
    '表头按钮缺失时，golden 那行不能还被形态差规则吞掉',
  );
  // 窗口里该屏绘制两次（首绘 + CORE 结束后的 RESTART 重绘）
  assert.equal(report.summary.unexplained, 2);
});

test('能力提升画面的角色行属于已实现输出，缺失/值错时必须进入未解释差异', async () => {
  const { stream_source } = await replay_scope_b('sale', 'natural');
  const golden = golden_stream(
    fs.readFileSync(path.join(REPO, 'golden', 'sale-natural.log'), 'utf8'),
  ).filter((e) => e.kind !== 'discard' && e.kind !== 'group');
  // 魔王行的详情文本格（编号在 ere 由独占按钮格承载，见 rules 的 ④ 族）
  const ere = fixture_stream(stream_source).filter(
    (e) =>
      e.kind !== 'discard' &&
      e.kind !== 'group' &&
      !(e.kind === 'text' && e.text === '你 LV 0'),
  );
  const report = diff_streams(golden, ere, { scope: 'B', segment: 'sale' });

  assert.ok(
    report.diffs.some(
      (diff) =>
        diff.side === 'golden' &&
        diff.entry.key === '你 LV 0' &&
        diff.category === 'unexplained',
    ),
    '行详情格缺失（值算错时同样是「对不上」）时，golden 那行不能被吞掉',
  );
  assert.equal(report.summary.unexplained, 2);
});

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
  // 模拟 Emuera 世界的输入，199 必须送达 usershop。199 自 #395 起是真身
  // （BEGIN TURNEND 真转场），存根行不再打印——改断言休息分支的真实文本。
  // 通道若被拆（恢复夹具白名单校验），199 会被拦下并抛
  // 「输入不合法！请输入以下值之一」——回放当场崩，本用例与基线锁全红
  const daycycle = await replay_scope_b('daycycle', 'natural');
  const texts = daycycle.fixture.lines_history
    .filter((l) => l.type === 'text')
    .map((l) => l.text);
  assert.ok(
    texts.some((t) => t.includes('你专心于内政，稍作了休息……（税金+5%）')),
    '199 分支的真身文本必须在场——useRule:false 通道放行了无按钮输入',
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
