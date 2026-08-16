/**
 * @file ere/page/page-title.js 的行为测试（issue #19）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试缝，issue #16）。
 *
 * 标题画面是常驻交互循环（原作 RESTART 语义），没有自然退出点。两种终止
 * 方式：多数用例以预置输入驱动交互，输入耗尽时 era.input() 抛错即是终止信
 * 号（夹具的既定设计），断言落在「耗尽瞬间的最后一块屏幕」与变量/调用记
 * 录上；「新的猎物」分支自 issue #20 起改为发出 BEGIN FIRST 转场信号，对
 * 应用例直接捕获 BeginSignal 终止。画布每轮重绘时会被 clear 清空，故中途
 * 分支的文本反馈以 waitAnyKey 留痕与变量写入来证明。
 *
 * 开关的持久化在单元层证到「写 global:<id> + 显式 saveGlobal」（#18 定下的
 * 口径）；跨局实机往返（重启引擎开关仍生效）由派单人在合并后实机验收。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_chara_0 } = require('./helpers/chara');
const { preset_gamebase } = require('./helpers/gamebase');

test('首屏：标题、版本行、作者、年份、展开名单、信息行与四个按钮', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  const run_title_page = fixture.load_module('page/page-title');

  await assert.rejects(() => run_title_page(), /预置输入已耗尽/);

  const texts = fixture.text_lines();
  // 标题与版本号取自静态表：原作自算 {V/1000}.{V%1000}，93106 → "93.106"
  assert(texts.includes('ERA魔王 年度版（名字暂定）（PC only）'));
  assert(texts.includes('伪Ver93.106立绘版'));
  // 作者与年份（原作带半角括号、仅年份非空时输出）
  assert(texts.includes('「人人为我，我为人人」'));
  assert(texts.includes('(2011 - 2024！)'));
  // GLOBAL:99 默认 0 → 展开完整制作名单（开头/中段/结尾各抽一行）
  assert(
    texts.includes(
      '※本版本由Delicious基于谦悟制作的0.60EX制作，仅作为汉化交流及代码练习使用，请于18小时内删除※',
    ),
  );
  assert(texts.includes('敬请见证！'));
  assert(
    texts.includes(
      '※衷心感谢首席代码君：风飏。没有昨天的你就没有今天的我，在此祝愿你的明天会更好※',
    ),
  );
  // GAMEBASE_INFO 与 GLOBAL:98 == 0 的联系段（尾部空格照原作）
  assert(
    texts.includes('※未经允许，任何人不得引用、修改再打包或进行商业用途※'),
  );
  assert(texts.includes('版本推进出问题 '));

  // 按钮：accelerator 沿用原作编号 0/1/8/9。断言看 rendered（引擎实际显示的
  // 文本，含引擎自动拼的 [快捷键] 前缀）——只断言 text 会漏掉手写前缀与引擎
  // 前缀撞车，实机曾渲染出「[0] [0] 旧的奴隶」。
  const buttons = fixture.lines.filter((line) => line.type === 'button');
  assert(
    buttons.some((b) => b.accelerator === 0 && b.rendered === '[0] 旧的奴隶'),
  );
  assert(
    buttons.some((b) => b.accelerator === 1 && b.rendered === '[1] 新的猎物'),
  );
  assert(buttons.some((b) => b.accelerator === 9 && b.rendered === '[9] <<'));
  assert(buttons.some((b) => b.accelerator === 8 && b.rendered === '[8] >>'));
  // 没有任何按钮的正文自带 [编号] 前缀（前缀是引擎的职责）
  assert(buttons.every((b) => !/^\s*\[\d+\]/.test(b.text)));
});

test('版本号按原作公式算自静态表，不硬编码', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture, { version: 20004 });
  const run_title_page = fixture.load_module('page/page-title');

  await assert.rejects(() => run_title_page(), /预置输入已耗尽/);

  // 20004 → {20004/1000}.{20004%1000} = 20.4；同时证明不是写死的 93.106
  assert(fixture.text_lines().includes('伪Ver20.4立绘版'));
  assert(!fixture.text_lines().some((line) => line.includes('93.106')));
});

test('GLOBAL:99 非 0 → 折叠致辞 + 按钮「>>」', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  fixture.store.set('global:99', 1);
  const run_title_page = fixture.load_module('page/page-title');

  await assert.rejects(() => run_title_page(), /预置输入已耗尽/);

  const texts = fixture.text_lines();
  assert(
    texts.includes(
      '※本版本由谦悟制作，仅作为汉化交流及代码练习使用，请于18小时内删除※',
    ),
  );
  // 折叠版第二行无句末※（展开版有，借此区分两分支）
  assert(
    texts.some(
      (line) =>
        line.startsWith('※私自传播') && !line.endsWith('※') && line !== '',
    ),
  );
  // 展开版独有的行不得出现
  assert(!texts.some((line) => line.includes('Delicious基于')));
  assert(!texts.some((line) => line.includes('敬请见证')));
  // 按钮 9 在折叠态显示「>>」（引擎前缀后即 [9] >>）
  assert(
    fixture.lines.some(
      (line) =>
        line.type === 'button' &&
        line.accelerator === 9 &&
        line.rendered === '[9] >>',
    ),
  );
});

test('GLOBAL:98 非 0 → 联系方式 + 按钮「<<」', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  fixture.store.set('global:98', 1);
  const run_title_page = fixture.load_module('page/page-title');

  await assert.rejects(() => run_title_page(), /预置输入已耗尽/);

  const texts = fixture.text_lines();
  assert(texts.includes('群里@Delicious或者小窗'));
  assert(!texts.some((line) => line.includes('版本推进出问题')));
  assert(
    fixture.lines.some(
      (line) =>
        line.type === 'button' &&
        line.accelerator === 8 &&
        line.rendered === '[8] <<',
    ),
  );
});

test('按钮 9：切换致辞开关 → 写 global:99、存公共存档、按折叠态立即重绘', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  fixture.set_inputs(9);
  const run_title_page = fixture.load_module('page/page-title');

  await assert.rejects(() => run_title_page(), /预置输入已耗尽/);

  // 变量写入：(0+1)%2 = 1，落在 global:99（公共存档 global.sav 的主体）
  assert.deepEqual(
    fixture.var_writes.filter((w) => w.name === 'global:99'),
    [{ name: 'global:99', value: 1 }],
  );
  assert.equal(fixture.store.get('global:99'), 1);
  // 原作 SAVEGLOBAL 的显式落盘
  assert(fixture.calls.some((c) => c.api === 'saveGlobal'));
  // 画布已清屏重画，屏幕呈现折叠版 = 「切换后立即重绘」的证据
  assert(fixture.text_lines().some((line) => line.includes('由谦悟制作')));
  assert(!fixture.text_lines().some((line) => line.includes('敬请见证')));
  assert.deepEqual(fixture.inputs_consumed, [{ api: 'input', value: 9 }]);
});

test('按钮 8：切换联系方式开关 → 写 global:98、存公共存档、按新态立即重绘', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  fixture.set_inputs(8);
  const run_title_page = fixture.load_module('page/page-title');

  await assert.rejects(() => run_title_page(), /预置输入已耗尽/);

  assert.deepEqual(
    fixture.var_writes.filter((w) => w.name === 'global:98'),
    [{ name: 'global:98', value: 1 }],
  );
  assert.equal(fixture.store.get('global:98'), 1);
  assert(fixture.calls.some((c) => c.api === 'saveGlobal'));
  assert(fixture.text_lines().includes('群里@Delicious或者小窗'));
  assert(!fixture.text_lines().some((line) => line.includes('版本推进出问题')));
});

test('按钮 9 两次：(n+1)%2 往返，回到展开态', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  fixture.set_inputs(9, 9);
  const run_title_page = fixture.load_module('page/page-title');

  await assert.rejects(() => run_title_page(), /预置输入已耗尽/);

  assert.deepEqual(
    fixture.var_writes.filter((w) => w.name === 'global:99'),
    [
      { name: 'global:99', value: 1 },
      { name: 'global:99', value: 0 },
    ],
  );
  assert.equal(fixture.store.get('global:99'), 0);
  // 每次切换都显式存公共存档
  assert.equal(fixture.calls.filter((c) => c.api === 'saveGlobal').length, 2);
  assert(fixture.text_lines().includes('敬请见证！'));
});

test('无法识别的输入：重绘标题画面，不崩溃（原作 ELSE → RESTART）', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  fixture.set_inputs(42);
  const run_title_page = fixture.load_module('page/page-title');

  // 只以「输入耗尽」终止：若画面自身抛错，此处因错误信息不符而失败
  await assert.rejects(() => run_title_page(), /预置输入已耗尽/);

  assert.deepEqual(fixture.inputs_consumed, [{ api: 'input', value: 42 }]);
  // 重绘后仍是完整标题画面
  assert(fixture.text_lines().includes('伪Ver93.106立绘版'));
});

test('选项 1（新的猎物）：发出 FIRST 转场信号并当场结束函数（issue #20）', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
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
  // （test/event-first.test.js），此处证标题侧的接线。
  assert(
    fixture.calls.some((c) => c.api === 'resetData'),
    '必须先清档（原作 :100 RESETDATA）',
  );
  assert(
    fixture.calls.some((c) => c.api === 'addCharacter' && c.args[0] === 0),
    '必须加入初始角色 0（原作 :101 ADDCHARA 0）',
  );
  // #35：调了 addCharacter 之外，还要证明引擎语义上的「真的加进去了」——
  // 夹具镜像引擎守卫，缺角色表时这里会失败（#21/#22 的假绿不会再放行）
  assert.deepEqual(
    fixture.chara_no,
    [0],
    '初始角色 0 必须通过引擎守卫、真的被加入',
  );
  // 标题侧变量写入恰为 CHARA_EX_0 的魔王素质一条，此外零写入——全量断言，
  // 任何混入的意外写入都会当场暴露
  assert.deepEqual(fixture.var_writes, [{ name: 'ex_talent:0:200', value: 1 }]);
});

test('选项 0（旧的奴隶）：占位反馈，读键后回标题', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  fixture.set_inputs(0);
  const run_title_page = fixture.load_module('page/page-title');

  await assert.rejects(() => run_title_page(), /预置输入已耗尽/);

  assert.deepEqual(fixture.inputs_consumed, [
    { api: 'input', value: 0 },
    { api: 'waitAnyKey' },
  ]);
  assert.deepEqual(fixture.var_writes, []);
  assert(fixture.text_lines().includes('伪Ver93.106立绘版'));
});
