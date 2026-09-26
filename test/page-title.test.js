/**
 * @file ere/page/page-title.js 的行为测试（issue #19）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点，issue #16）。
 *
 * 标题画面是常驻交互循环（原作 RESTART 语义），没有自然退出点。两种终止
 * 方式：多数用例以预置输入驱动交互，输入耗尽时 era.input() 抛错即是终止信
 * 号（夹具的既定设计），断言落在「耗尽瞬间的最后一块屏幕」与变量/调用记
 * 录上；「新的猎物」分支自 issue #20 起改为发出 BEGIN FIRST 转场信号，对
 * 应用例直接捕获 BeginSignal 终止。画布每轮重绘时会被 clear 清空，故中途
 * 分支的文本反馈以 waitAnyKey 记录与变量写入来证明。
 *
 * 开关的持久化在单元层证到「写 global:<id> + 显式 saveGlobal」（#18 定下的
 * 标准）；跨局实机往返（重启引擎开关仍生效）由派单人在合并后实机验收。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_chara_0 } = require('./helpers/chara');
const { preset_gamebase } = require('./helpers/gamebase');
const { preset_audio_seeded } = require('./helpers/audio');

const REPO_ROOT = path.resolve(__dirname, '..');
test('首屏：标题、版本行、作者、年份与两个按钮（#642：名单、联系方式、按钮 8/9 已删）', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  const run_title_page = fixture.load_module('page/page-title');

  await assert.rejects(() => run_title_page(), /预置输入已耗尽/);

  const texts = fixture.text_lines();
  // 标题与版本行取自静态表：版本直读【版本代号】versionName（#135，
  // "0.0.0"），不再沿用原作 {V/1000}.{V%1000} 自算式
  assert(
    texts.includes('魔王 Redux'),
    '标题画面必须显示 yml 的游戏名称「魔王 Redux」',
  );
  assert(
    texts.includes('Ver0.0.0'),
    '版本行必须显示 Ver【版本代号】（fixture 预设 versionName=0.0.0）',
  );
  assert(
    !texts.some((line) => line.includes('伪') || line.includes('立绘版')),
    '版本行不得带「伪」「立绘版」装饰段（#642 返工：只留 Ver【版本代号】）',
  );
  // 作者与年份（带半角括号、仅年份非空时输出）
  assert(texts.includes('odradekk'), '标题画面必须显示 yml 的作者 odradekk');
  assert(texts.includes('(2026)'));
  // 【追加信息】为空 → 信息行不占行
  assert(!texts.some((line) => line.includes('未经允许')));
  // 汉化与制作名单整段删除（#642）：展开态与折叠态的句子都不得出现
  assert(!texts.some((line) => line.includes('Delicious基于')));
  assert(!texts.some((line) => line.includes('由谦悟制作')));
  assert(!texts.some((line) => line.includes('敬请见证')));
  assert(!texts.some((line) => line.includes('口上组成员')));
  // 联系方式段两种显示都不得出现（#642 返工删除，含 [8] 钮与 GLOBAL:98）
  assert(
    !texts.some((line) => line.includes('版本推进出问题')),
    '联系方式段已删除：「版本推进出问题」不得出现',
  );
  assert(!texts.some((line) => line.includes('群里@Delicious')));
  // 整屏居中：首个对齐调用就是 center
  assert.equal(
    fixture.calls.find((c) => c.api === 'setAlign')?.args[0],
    'center',
    '标题画面整屏居中：首个 setAlign 必须是 center',
  );

  // 按钮只剩 [0]/[1]：accelerator 沿用原作编号，名单钮 9 与联系方式钮 8
  // 已随各自段落删除。断言看 rendered（引擎实际显示的文本，含引擎自动拼的
  // [快捷键] 前缀）——只断言 text 会漏掉手写前缀与引擎前缀撞车，实机曾渲染出
  // 「[0] [0] 旧的奴隶」。
  const buttons = fixture.lines.filter((line) => line.type === 'button');
  assert(
    buttons.some((b) => b.accelerator === 0 && b.rendered === '[0] 旧的奴隶'),
  );
  assert(
    buttons.some((b) => b.accelerator === 1 && b.rendered === '[1] 新的猎物'),
  );
  assert(
    buttons.every((b) => b.accelerator !== 8 && b.accelerator !== 9),
    '名单展开/折叠钮 9 与联系方式钮 8 已删除，不得再渲染',
  );
  // 没有任何按钮的正文自带 [编号] 前缀（前缀是引擎的职责）
  assert(buttons.every((b) => !/^\s*\[\d+\]/.test(b.text)));
});

test('空行普查（#596）：年份空行、信息行缺席与分割线-按钮逐行相邻', async () => {
  // 年份行后的空行与分割线、分割线与首枚菜单按钮之间都不夹空行
  //（golden 侧 mainmenu-natural-log:33-34 分割线/[0] 逐行相邻的布局等效）。
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  const run_title_page = fixture.load_module('page/page-title');

  await assert.rejects(() => run_title_page(), /预置输入已耗尽/);

  const row_of = (predicate) => {
    const line = fixture.lines.find(predicate);
    assert.ok(line, `找不到目标行：${predicate}`);
    return line.row;
  };
  const year = row_of((l) => l.type === 'text' && l.text === '(2026)');
  const divider = row_of((l) => l.type === 'divider' && l.row > year);
  const button_0 = row_of((l) => l.type === 'button' && l.accelerator === 0);

  assert.equal(
    divider,
    year + 2,
    '年份行后恰一个空行（:41）即分割线，信息行缺席不占位',
  );
  assert.equal(button_0, divider + 1, '分割线与首枚菜单按钮逐行相邻');
  // 全屏空行（println 落 br、print('') 落 text 空串都计）只有三处——
  // 标题图下的两个与年份行后的一个；【追加信息】为空、信息行整行缺席，
  // 不产空行（留空不占行是 #642 与年份行同款的守卫行为）
  const top_divider = row_of((l) => l.type === 'divider');
  const is_blank = (line) =>
    line.type === 'br' || (line.type === 'text' && line.text === '');
  assert.deepEqual(
    fixture.lines.filter(is_blank).map((line) => line.row),
    [top_divider + 1, top_divider + 2, year + 1],
    '全屏只有三个空行：标题图下两个与年份后一个',
  );
});

test('版本行直读【版本代号】自静态表，不自算、不硬编码（#135）', async () => {
  const fixture = create_era_fixture();
  // versionName 换值 + version 设成自算式会算出别的结果的值：证明显示
  // 跟随 versionName 走、与 version 无关（原作公式 {V/1000}.{V%1000} 对
  // 20004 会算 "20.4"），也不是写死的 0.0.0
  preset_gamebase(fixture, { versionName: '1.2.3', version: 20004 });
  const run_title_page = fixture.load_module('page/page-title');

  await assert.rejects(() => run_title_page(), /预置输入已耗尽/);

  assert(fixture.text_lines().includes('Ver1.2.3'));
  assert(!fixture.text_lines().some((line) => line.includes('20.4')));
  assert(!fixture.text_lines().some((line) => line.includes('0.0.0')));
  assert(
    !fixture
      .text_lines()
      .some((line) => line.includes('伪') || line.includes('立绘版')),
  );
});
test('未打印按钮的值引擎不送达：拒收且画面不重绘（原作 ELSE → RESTART 分支不可达，#130）', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  fixture.set_inputs(42);
  const run_title_page = fixture.load_module('page/page-title');

  // 引擎把非按钮输入弹回并提示「输入不合法」，游戏逻辑拿不到 42——
  // RESTART 分支是引擎死路径；夹具同款校验当场抛错（#130）
  await assert.rejects(
    () => run_title_page(),
    /输入不合法！请输入以下值之一：/,
  );
  // 42 未被送达：标题画面仍是首绘那一轮（无重绘）
  assert.deepEqual(fixture.inputs_consumed, []);
  assert.equal(
    fixture.text_lines().filter((line) => line.includes('Ver0.0.0')).length,
    1,
    '拒收后不得重绘（引擎侧玩家看到的是提示框，画面原样）',
  );
});

test('选项 1（新的猎物）：发出 FIRST 转场信号并当场结束函数（issue #20）', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  // 预置播种标记：跳过标题音乐默认值播种（#69，播种自身的用例在文件尾），
  // 让本用例的全量 var_writes 断言只看见新游戏路径的写入
  preset_audio_seeded(fixture);
  // 预置角色 0（yml/Chara0.yml 的运行时形状）：夹具的 addCharacter 镜像
  // 引擎守卫（无预设不加，#35），预置后下面的「加入成功」断言才是引擎语义
  preset_chara_0(fixture);
  fixture.set_inputs(1);
  const run_title_page = fixture.load_module('page/page-title');
  const { BeginSignal, STATE } = fixture.load_module(
    'system/flow/begin-signal',
  );

  // BEGIN 的 JS 等价物是异常（#6）：新游戏分支以信号终止本函数，取代
  // #19 的占位反馈 + 读键 + continue。信号由此处的直接调用方（主循环的
  // enter_state）接住——本用例亲自扮演接住者。
  await assert.rejects(
    () => run_title_page(),
    (e) => e instanceof BeginSignal && e.state === STATE.FIRST,
  );

  // 送行句在转场前输出，且未被重绘清掉：函数在信号处结束，循环没有跑
  // 下一轮——这就是「流程离开标题画面」的画面级证据
  assert(
    fixture
      .text_lines()
      .includes('即使前路已经破碎，也请魔王大人当上这世界的王……'),
  );
  // 不再读键回标题：BEGIN 结束函数，分支内没有 waitAnyKey
  assert.deepEqual(fixture.inputs_consumed, [{ api: 'input', value: 1 }]);
  // 新游戏四件套的前两件：RESETDATA（:100，#22 接通 era.resetData——清掉
  // 上一局的会话数据）与 ADDCHARA 0（:101）。真初始化在 @EVENTFIRST
  // （test/event-first.test.js），此处证标题侧的接入。
  assert(
    fixture.calls.some((c) => c.api === 'resetData'),
    '必须先清档（原作 :100 RESETDATA）',
  );
  assert(
    fixture.calls.some((c) => c.api === 'addCharacter' && c.args[0] === 0),
    '必须加入初始角色 0（原作 :101 ADDCHARA 0）',
  );
  // #35：调了 addCharacter 之外，还要证明引擎语义上的「真的加进去了」——
  // 夹具镜像引擎守卫，缺角色表时这里会失败（#21/#22 的误报通过不会再放行）
  assert.deepEqual(
    fixture.chara_no,
    [0],
    '初始角色 0 必须通过引擎守卫、真的被加入',
  );
  // 标题侧变量写入恰为 CHARA_EX_0 的魔王素质一条 + 移植自建的 portcflag
  // 版本戳（#67，非原作动作），此外零写入——全量断言，任何混入的意外写入
  // 都会当场暴露
  assert.deepEqual(fixture.var_writes, [
    { name: 'ex_talent:0:200', value: 1 },
    { name: 'portcflag:0:数据版本', value: 1 },
  ]);
});

test('选项 0（旧的奴隶）：进读档界面，[100] 返回后 RESTART 回标题', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  // 同上：预置播种标记，避开 #69 的默认值播种写入
  preset_audio_seeded(fixture);
  fixture.set_inputs(0, 100);
  const run_title_page = fixture.load_module('page/page-title');

  await assert.rejects(() => run_title_page(), /预置输入已耗尽/);

  assert.deepEqual(fixture.inputs_consumed, [
    { api: 'input', value: 0 },
    { api: 'input', value: 100 },
  ]);
  // 进过真身读档界面（#136 接通 @SYSTEM_LOADGAME；返回后标题整屏重绘，
  // 界面行只在行史里——原作 CALL 后无条件 RESTART，1:1 照搬）
  assert(
    fixture.lines_history.some(
      (line) => line.text === '【读取存档】要载入以下哪个存档？',
    ),
    '标题的读档入口必须真的进入读档界面',
  );
  // 未读档：不写 LASTLOAD_NO，也不产生其他变量写入
  assert.deepEqual(fixture.var_writes, []);
  assert(fixture.text_lines().includes('Ver0.0.0'));
});

test('选项 0 读档成功：转场进 SHOP_AFTER_LOAD，不回标题（#137——#136 实机撞出的无路缺陷）', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  preset_audio_seeded(fixture);
  fixture.store.set('global:saves:3', '三号档');
  fixture.era.loadData = async () => true;
  fixture.set_inputs(0, 3);
  const run_title_page = fixture.load_module('page/page-title');

  // #136 实机验收：标题读档成功后回标题画面，玩家从此无路可走（标题只有
  // 新档与再读一次）。根因：ere 侧把 era.loadData() 当普通函数，1:1 照搬了
  // 控制流的字面形状、丢掉 LOADDATA 的转场语义（原作注释 SYSTEM_DATA.ERB:71
  // 「実行後、@EVENTLOADへ遷移」写死了它不返回）。读档成功必须以信号离开
  // 整条标题循环
  const { BeginSignal, STATE } = fixture.load_module(
    'system/flow/begin-signal',
  );
  await assert.rejects(
    () => run_title_page(),
    (e) => e instanceof BeginSignal && e.state === STATE.SHOP_AFTER_LOAD,
    '标题读档成功必须转场进据点——不得 RESTART 回标题',
  );
  assert.deepEqual(
    fixture.inputs_consumed,
    [
      { api: 'input', value: 0 },
      { api: 'input', value: 3 },
    ],
    '选完槽号即转场，不再回标题吃第三轮输入',
  );
});

// —— 标题音乐与标题图（issue #69：原作 :3-7 / :22-23 / :95 / :105）——

test('标题音乐：全新 global.sav 播种后进标题即播 TFM-003A_17（循环）', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  fixture.seed_res('TFM-003A_17.mp3', 'audio');
  const run_title_page = fixture.load_module('page/page-title');

  await assert.rejects(() => run_title_page(), /预置输入已耗尽/);

  // 播种（global:0=1/66/标记）先于播放；PLAYBGM 在 Emuera 默认循环，ere 的
  // playMusic 缺省不循环，必须显式 {loop: true}（app.asar 实证）
  assert.equal(fixture.store.get('global:0'), 1);
  assert.deepEqual(fixture.music, [
    {
      api: 'play',
      names: ['tfm-003a_17.mp3'],
      config: { loop: true },
      played: 'tfm-003a_17.mp3',
    },
  ]);
});

test('标题音乐：重绘不重播（PLAYBGM 在 $PRINT_TITLE 标签之前，只播一次）', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  fixture.seed_res('TFM-003A_17.mp3', 'audio');
  // 进读档界面再 [100] 返回，标题重绘一轮（引擎可达的重绘来源；无效输入
  // 引擎侧不送达、不会重绘，#130），两轮绘制后仍只有一次播放
  fixture.set_inputs(0, 100);
  const run_title_page = fixture.load_module('page/page-title');

  await assert.rejects(() => run_title_page(), /预置输入已耗尽/);

  // 两轮标题绘制只有第一次播曲（读档路径的 stopMusic 是正常行为，不计入）
  assert.equal(fixture.music.filter((m) => m.api === 'play').length, 1);
});

test('标题音乐：开关关着（播种过、用户关掉）不播；资源未启用也不报错', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  // 用户关掉音乐：标记在、开关 0；且不 seed_res——资源未注册时 playMusic
  // 根本不该被调（守卫在前）
  preset_audio_seeded(fixture);
  fixture.store.set('global:0', 0);
  const run_title_page = fixture.load_module('page/page-title');

  await assert.rejects(() => run_title_page(), /预置输入已耗尽/);

  assert.deepEqual(fixture.music, []);
  assert.deepEqual(fixture.var_writes, []);
});

test('离开标题停曲：新游戏与读档两分支都 STOPBGM（原作 :95/:105）', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  preset_audio_seeded(fixture); // 跳过播种（音乐开关随之为 0，不影响停曲断言）
  fixture.set_inputs(1);
  const run_title_page = fixture.load_module('page/page-title');
  const { BeginSignal, STATE } = fixture.load_module(
    'system/flow/begin-signal',
  );

  await assert.rejects(
    () => run_title_page(),
    (e) => e instanceof BeginSignal && e.state === STATE.FIRST,
  );
  assert.deepEqual(fixture.music, [{ api: 'stop' }]);

  const second = create_era_fixture();
  preset_gamebase(second);
  preset_audio_seeded(second);
  second.set_inputs(0);
  const run_again = second.load_module('page/page-title');
  await assert.rejects(() => run_again(), /预置输入已耗尽/);
  assert.deepEqual(second.music, [{ api: 'stop' }]);
});

test('标题图：资源在场时显示 TITLE 全图，缺席时纯文本兜底（原作 :23）', async () => {
  const with_image = create_era_fixture();
  preset_gamebase(with_image);
  with_image.seed_res('TITLE');
  const run_with = with_image.load_module('page/page-title');
  await assert.rejects(() => run_with(), /预置输入已耗尽/);

  // image.whole 条目 + resolved 记录引擎解析出的注册名（小写）
  const entry = with_image.lines.find((line) => line.type === 'image.whole');
  assert.ok(entry, '资源在场必须输出标题图');
  assert.equal(entry.names, 'TITLE');
  assert.deepEqual(entry.resolved, ['title']);

  const without_image = create_era_fixture();
  preset_gamebase(without_image);
  const run_without = without_image.load_module('page/page-title');
  await assert.rejects(() => run_without(), /预置输入已耗尽/);

  // resource: false（未注册）时 checkImage 恒假——无图可显、纯文本标题兜底
  assert(!without_image.lines.some((line) => line.type === 'image.whole'));
  assert(without_image.text_lines().includes('Ver0.0.0'));
});

test('名单展开钮 9 已删：输入 9 不是合法按钮值，引擎拒收且不重绘（#642）', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  fixture.set_inputs(9);
  const run_title_page = fixture.load_module('page/page-title');

  // 9 曾是名单展开/折叠钮；按钮随名单删除后，9 不在已渲染按钮的快捷键集合里，
  // 与 #130 的 42 同款：夹具镜像引擎白名单校验，当场抛错、游戏逻辑拿不到 9
  await assert.rejects(
    () => run_title_page(),
    /输入不合法！请输入以下值之一：/,
  );
  assert.deepEqual(fixture.inputs_consumed, []);
  assert(
    !fixture.var_writes.some((w) => w.name === 'global:99'),
    'GLOBAL:99 已无读写：不得产生 global:99 写入',
  );
});

test('联系方式钮 8 已删：输入 8 不是合法按钮值，引擎拒收且不重绘（#642 返工）', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  fixture.set_inputs(8);
  const run_title_page = fixture.load_module('page/page-title');

  // 8 曾是联系方式切换钮；按钮随联系方式段删除后，8 不在已渲染按钮的快捷键
  // 集合里，与 #130 的 42 同款：夹具镜像引擎白名单校验，当场抛错
  await assert.rejects(
    () => run_title_page(),
    /输入不合法！请输入以下值之一：/,
  );
  assert.deepEqual(fixture.inputs_consumed, []);
  assert(
    !fixture.var_writes.some(
      (w) => w.name === 'global:98' || w.name === 'global:99',
    ),
    'GLOBAL:98/99 已无读写：不得产生相关写入',
  );
});

test('【追加信息】非空时输出信息行、留空时不占行（#642 的守卫行为）', async () => {
  const with_info = create_era_fixture();
  preset_gamebase(with_info, { info: '测试用追加信息' });
  const run_with = with_info.load_module('page/page-title');
  await assert.rejects(() => run_with(), /预置输入已耗尽/);
  assert(with_info.text_lines().includes('测试用追加信息'));

  // 留空（仓库 yml 的现状）：信息行整行缺席——若守卫被拆成无条件 print，
  // 这里会多出一个空串行（空行普查用例的 blank 断言同时变红）
  const without_info = create_era_fixture();
  preset_gamebase(without_info);
  const run_without = without_info.load_module('page/page-title');
  await assert.rejects(() => run_without(), /预置输入已耗尽/);
  assert(
    !without_info.lines.some(
      (line) => line.type === 'text' && line.text === '',
    ),
    '【追加信息】为空时不得输出空串行',
  );
});

test('【发布时间】留空时不占行（与追加信息同款的守卫）', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture, { year: '' });
  const run_title_page = fixture.load_module('page/page-title');
  await assert.rejects(() => run_title_page(), /预置输入已耗尽/);
  assert(
    !fixture.text_lines().some((line) => line === '()'),
    '【发布时间】为空时不得输出「()」',
  );
});

test('标题画面读 yml/GameBase.yml 的游戏信息（#642：魔王 Redux / odradekk / 2026）', async () => {
  // 夹具的 preset_gamebase 是 yml 形状的手工镜像；本用例直读真实 yml，断言
  // 标题画面显示的正是仓库数据——改 yml 值或画面硬编码旧值都会在这里红
  const text = fs.readFileSync(
    path.join(REPO_ROOT, 'yml', 'GameBase.yml'),
    'utf8',
  );
  const field = (key) => {
    const match = text.match(new RegExp(`^"${key}": "(.*)"$`, 'm'));
    assert.ok(match, `GameBase.yml 缺「${key}」`);
    return match[1];
  };
  const gamebase = {
    title: field('游戏名称'),
    author: field('作者'),
    info: field('追加信息'),
    year: field('发布时间'),
  };
  assert.equal(
    gamebase.title,
    '魔王 Redux',
    '【游戏名称】必须为「魔王 Redux」',
  );
  assert.equal(gamebase.author, 'odradekk', '【作者】必须为 odradekk');
  assert.equal(gamebase.info, '', '【追加信息】必须留空');
  assert.equal(gamebase.year, '2026', '【发布时间】必须为 2026');

  const fixture = create_era_fixture();
  preset_gamebase(fixture, gamebase);
  const run_title_page = fixture.load_module('page/page-title');
  await assert.rejects(() => run_title_page(), /预置输入已耗尽/);

  const texts = fixture.text_lines();
  assert(texts.includes(gamebase.title));
  assert(texts.includes(gamebase.author));
  assert(texts.includes(`(${gamebase.year})`));
  assert(!texts.some((line) => line.includes('未经允许')));
});
