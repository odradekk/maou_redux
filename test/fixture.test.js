/**
 * @file 测试夹具自身的契约测试。
 *
 * 夹具是全项目唯一的一处缝（见 issue #16）：
 * 加载真实 SDK 文件，替换 require('#/era-electron') 返回的对象，
 * 让游戏代码在不启动 Electron GUI 的情况下可测。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

test('加载的是真实 SDK：注入守卫已绕过', () => {
  const fixture = create_era_fixture();
  const { era } = fixture;

  // era-electron.js 尾部守卫：version.engine 为 undefined 时拒绝执行一切 API
  assert.notEqual(era.version.engine, undefined);
  // 来自真实 SDK 文件的标识，而非夹具自造的替身对象
  assert.equal(era.isEra, true);
  assert.equal(typeof era.version.sdk, 'string');

  // 记录层已接管输出
  era.print('探针');
  assert.equal(fixture.lines.length, 1);
});

test('每个用例拿到干净状态，互不污染', () => {
  const first = create_era_fixture();
  first.era.set('global:3', 'zh-CN');
  first.set_inputs(9);
  first.era.print('污染源');

  const second = create_era_fixture();
  assert.deepEqual(second.var_writes, []);
  assert.deepEqual(second.var_reads, []);
  assert.deepEqual(second.lines, []);
  assert.deepEqual(second.inputs_consumed, []);
  assert.equal(second.era.get('global:3'), undefined);
});

test('两次夹具拿到的是不同 SDK 实例（ere/ 模块缓存已清）', () => {
  const first = create_era_fixture();
  const second = create_era_fixture();
  assert.notEqual(first.era, second.era);
});

test('无专门实现的 API 走兜底记录，不抛错', () => {
  const fixture = create_era_fixture();
  fixture.era.setAlign('center');
  fixture.era.setTitle('ERA魔王');

  assert.deepEqual(fixture.calls, [
    { api: 'setAlign', args: ['center'] },
    { api: 'setTitle', args: ['ERA魔王'] },
  ]);
});

test('addCharacter 镜像引擎守卫：无预设返回 false 且不加，有预设才加（issue #35）', () => {
  const fixture = create_era_fixture();

  // #21/#22 漏过的场景：调了 addCharacter，但（当时的）yml/ 没有角色表，
  // 引擎第一步就短路——空壳夹具记下调用后断言全绿，实机一个角色都没加
  assert.equal(fixture.era.addCharacter(0), false);
  assert.deepEqual(fixture.chara_no, []);
  // 调用仍被记录（接线层面的断言不受影响）
  assert.deepEqual(fixture.calls, [{ api: 'addCharacter', args: [0] }]);

  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  assert.equal(fixture.era.addCharacter(0), true);
  assert.deepEqual(fixture.chara_no, [0]);

  // 重复加入：引擎先滤同号再入列，列表不重复
  assert.equal(fixture.era.addCharacter(0), true);
  assert.deepEqual(fixture.chara_no, [0]);

  // 双参数形态 [目标号, 源数据号]：以 1 号预设重建 0 号，仍是 0 号
  fixture.seed_chara(1, { id: 1, name: '壹' });
  assert.equal(fixture.era.addCharacter([0, 1]), true);
  assert.deepEqual(fixture.chara_no, [0]);
});

test('addCharacter 落 callname 键（引擎数据层行为，#44）：姓名 -1 / 称呼 -2', () => {
  const fixture = create_era_fixture();
  // 名前 ≠ 呼び名 的角色：两个键重合的世界里，写反了也断言不出来
  fixture.seed_chara(31, { id: 31, name: '温妮', callname: '小温' });
  fixture.era.addCharacter(31);

  // 引擎 addCharacter 方法体（app.asar）：
  //   callname[id][-1] = staticData.chara[id].name
  //   callname[id][-2] = staticData.chara[id].callname ?? name
  assert.equal(fixture.store.get('callname:31:-1'), '温妮');
  assert.equal(fixture.store.get('callname:31:-2'), '小温');
  // 数据层初始化不走记录层（游戏代码的调用意图由 var_writes 断言）
  assert.deepEqual(fixture.var_writes, []);
});

test('removeCharacter 镜像引擎过滤删除（DELCHARA 等价物，#44）', () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.seed_chara(31, { id: 31, name: '温妮', callname: '温妮' });
  fixture.era.addCharacter(0);
  fixture.era.addCharacter(31);

  assert.equal(fixture.era.removeCharacter(31), true);
  assert.deepEqual(fixture.chara_no, [0]);
  assert.deepEqual(fixture.calls, [
    { api: 'addCharacter', args: [0] },
    { api: 'addCharacter', args: [31] },
    { api: 'removeCharacter', args: [31] },
  ]);
});

test('调教域表守卫（#44）：beginTrain 前后与角色入列的寻址边界', () => {
  const fixture = create_era_fixture();

  // 引擎寻址层（app.asar 模块 648）的镜像：二段 tflag 在 data.tflag 不存在
  // 时落到兜底分支报 key error；三段 palam 在角色子表缺失时静默丢弃。
  // 引擎侧证据由 test/train-loop.test.js 的引擎对拍用例锁定
  assert.throws(() => fixture.era.set('tflag:0', 1), /key error/);
  assert.equal(fixture.era.set('palam:31:3', 1), undefined);

  fixture.era.beginTrain(0, 31);
  assert.equal(fixture.era.set('tflag:0', 1), 1);
  // 角色未入列（31 之外）仍静默丢弃
  assert.equal(fixture.era.set('palam:99:3', 5), undefined);
  assert.deepEqual(
    fixture.var_writes.filter((w) => w.name === 'palam:99:3'),
    [],
  );
  fixture.era.addCharacterForTrain(99);
  assert.equal(fixture.era.set('palam:99:3', 5), 5);

  // 常驻表（flag/base 等）不受调教开闭影响
  assert.equal(fixture.era.set('flag:36', 1), 1);

  // getCharactersInTrain / endTrain
  assert.deepEqual(fixture.era.getCharactersInTrain(), [0, 31, 99]);
  fixture.era.endTrain();
  assert.deepEqual(fixture.era.getCharactersInTrain(), []);
  assert.throws(() => fixture.era.set('tflag:0', 2), /key error/);
});

test('logger 被记录且不自递归', () => {
  const fixture = create_era_fixture();
  // 若只置 version.engine 而不整体替换 logger，
  // SDK 自带的 logger 会无限自调用（era-electron.js:291-295）
  fixture.era.logger.error('boom');
  fixture.era.logger.info('hello');

  assert.deepEqual(fixture.logs, [
    { level: 'error', msg: 'boom', stack: undefined },
    { level: 'info', msg: 'hello' },
  ]);
});

test('era.input 在预置输入耗尽时立刻报错', async () => {
  const fixture = create_era_fixture();
  await assert.rejects(() => fixture.era.input(), /预置输入已耗尽/);
});

test('printAndWait 输出计入 lines', async () => {
  const fixture = create_era_fixture();
  await fixture.era.printAndWait('按任意键继续');
  assert.deepEqual(fixture.text_lines(), ['按任意键继续']);
});

test('printAndWait 不进 waits（缝对等待的观测统一走显式 waitAnyKey）', async () => {
  // 引擎 printAndWait = print + waitAnyKey 两步组合（app.asar 逐字）。夹具
  // 有意不镜像内部等待：inputs_consumed / waits 只记录显式 waitAnyKey，
  // 否则 kojo 全链的消费序列会把「打印+等」翻倍。这条钉住「故意不镜像」
  // （#68 验收通则：已查实暂不镜像的判断本身要当成待测行为）。
  const fixture = create_era_fixture();
  await fixture.era.printAndWait('按任意键继续');
  assert.deepEqual(fixture.waits, []);
  assert.deepEqual(fixture.inputs_consumed, []);
});

test('waitAnyKey：无输出跳过；有输出才等键并清零', async () => {
  const fixture = create_era_fixture();
  // 引擎：(this.allowWait||e)&&(this.allowWait=!1, await this.input({any:!0}))
  // 空屏 / 无输出 → 跳过。旧桩「立即返回并留痕」会把跳过记成等了，本用例
  // 钉住「等了和没等」的区分（#73 发回：夹具必须镜像 allowWait）。
  await fixture.era.waitAnyKey();
  assert.deepEqual(fixture.waits, [
    { waited: false, rows_at_wait: 0, forced: false },
  ]);
  assert.deepEqual(fixture.inputs_consumed, []);

  fixture.era.print('有输出');
  await fixture.era.waitAnyKey();
  assert.equal(fixture.waits[1].waited, true);
  assert.equal(fixture.waits[1].rows_at_wait, 1);
  assert.deepEqual(fixture.inputs_consumed, [{ api: 'waitAnyKey' }]);

  // 等待消费清零：第二次裸调跳过
  await fixture.era.waitAnyKey();
  assert.equal(fixture.waits[2].waited, false);
});

test('waitAnyKey：input 回显同样置位 allowWait', async () => {
  const fixture = create_era_fixture();
  fixture.set_inputs(42);
  await fixture.era.input(); // 回显经 print → addTotalLines 置位
  await fixture.era.waitAnyKey();
  assert.equal(fixture.waits[0].waited, true);
  assert.equal(fixture.waits[0].rows_at_wait, 1); // 回显 +1 Row
});

test('clear 在 isContinue 时强制等键（非 0 实参）；clear(0) 不等', async () => {
  const fixture = create_era_fixture();
  fixture.era.print('行');
  await fixture.era.waitAnyKey(); // 消费掉输出置位
  fixture.is_continue = true;

  await fixture.era.clear(0); // 0!==e 不成立，不等
  assert.equal(fixture.waits.length, 1);

  await fixture.era.clear(1); // 强制 waitAnyKey(true)，再清行并再置位
  const forced = fixture.waits.find((w) => w.forced);
  assert.ok(forced, 'isContinue 下非 0 的 clear 必须强制等键');
  assert.equal(forced.waited, true);
});

test('文本片段数组被压平为纯文本', () => {
  const fixture = create_era_fixture();
  fixture.era.print([
    { content: ' HP ', color: 'red' },
    '100',
    { isBlank: 1 },
    { isBr: 1 },
    '继续',
  ]);
  // isBlank 无文本；isBr 保留为换行
  assert.deepEqual(fixture.text_lines(), [' HP 100\n继续']);
});

test('clear 清空输出', async () => {
  const fixture = create_era_fixture();
  fixture.era.print('a');
  fixture.era.print('b');

  assert.equal(await fixture.era.clear(), 0);
  assert.deepEqual(fixture.text_lines(), []);
});

test('已加入角色列表：addCharacter 追加、resetData 清空（CHARANUM 等价物）', () => {
  const fixture = create_era_fixture();
  // 严格夹具：先预置才加得进（#35 的引擎守卫）
  fixture.seed_chara(0, { id: 0, name: '你' });
  fixture.seed_chara(31, { id: 31, name: '琼' });
  fixture.era.addCharacter(0);
  fixture.era.addCharacter(31);

  assert.deepEqual(fixture.chara_no, [0, 31]);
  assert.deepEqual(fixture.era.getAddedCharacters(), [0, 31]);
  // 返回副本：外部篡改不影响列表本体
  fixture.era.getAddedCharacters().pop();
  assert.deepEqual(fixture.chara_no, [0, 31]);

  fixture.era.resetData();
  assert.deepEqual(fixture.chara_no, []);
  // 两者虽有专门实现，仍显式留痕：用例要能断言「先清档再加人」的顺序
  assert.deepEqual(fixture.calls, [
    { api: 'addCharacter', args: [0] },
    { api: 'addCharacter', args: [31] },
    { api: 'resetData', args: [] },
  ]);
});

test('printButton 记录 config.color（按钮明暗断言的落点）', () => {
  const fixture = create_era_fixture();
  fixture.era.printButton('▌调教目标', 496, { color: '#bbbbbb' });
  fixture.era.printButton('▌助手', 497);

  const [dim, normal] = fixture.lines;
  assert.equal(dim.type, 'button');
  assert.equal(dim.color, '#bbbbbb');
  assert.equal(normal.color, undefined);
});

test('drawLine 记录线型（isSolid → solid，默认 dashed）', () => {
  const fixture = create_era_fixture();
  fixture.era.drawLine({ isSolid: true });
  fixture.era.drawLine();

  assert.deepEqual(
    fixture.lines.map((line) => line.border),
    ['solid', 'dashed'],
  );
});

test('文本行保留原始片段（样式断言的落点，text 是压平结果）', () => {
  const fixture = create_era_fixture();
  const fragments = [
    { content: '《满月》', color: 'yellow', fontWeight: 'bold' },
  ];
  fixture.era.print(fragments);

  const record = fixture.lines[0];
  assert.equal(record.type, 'text');
  assert.equal(record.text, '《满月》');
  assert.equal(record.content, fragments);
});

// —— 多列输出族的录制（#48 对拍录制器：print 系全部输出 API 有专门记录，
//    不落兜底 calls——「文本层录制器覆盖 print 系全部输出 API」的落点） ——

test('printMultiColumns：GridObject 逐格压平成既有条目类型', () => {
  const fixture = create_era_fixture();
  fixture.era.printMultiColumns([
    { type: 'button', content: '爱抚', accelerator: 0 },
    { type: 'text', content: '一行说明' },
    { type: 'divider', config: { isSolid: true } },
    { type: 'image', names: 'res-a' },
  ]);

  assert.deepEqual(
    fixture.lines.map((l) => l.type),
    ['button', 'text', 'divider', 'image'],
  );
  // 按钮条目与 printButton 同款：rendered 是引擎前缀公式（app.asar）
  assert.equal(fixture.lines[0].text, '爱抚');
  assert.equal(fixture.lines[0].accelerator, 0);
  assert.equal(fixture.lines[0].rendered, '[0] 爱抚');
  assert.equal(fixture.lines[2].border, 'solid');
  assert.deepEqual(fixture.lines[3].names, 'res-a');
  // 已实现集：不落兜底 calls
  assert.deepEqual(fixture.calls, []);
});

test('printInColRows：ColumnObject 与裸 GridObject 数组两种实参都记录', () => {
  const fixture = create_era_fixture();
  fixture.era.printInColRows(
    { columns: [{ type: 'text', content: '列组形态' }] },
    [{ type: 'button', content: '裸数组形态', accelerator: 7 }],
  );

  // 两个 ColumnObject 的全部格子共享同一个 Row 号（引擎渲染层把整次调用
  // 装进一个 inColRows 行对象，#68 实证）
  assert.deepEqual(fixture.lines, [
    { type: 'text', text: '列组形态', content: '列组形态', row: 0 },
    {
      type: 'button',
      text: '裸数组形态',
      accelerator: 7,
      rendered: '[7] 裸数组形态',
      color: undefined,
      row: 0,
    },
  ]);
});

test('printImage：记 image 条目（无文本，对拍只留痕）', () => {
  const fixture = create_era_fixture();
  fixture.era.printImage('res-x', 'res-y');

  // 空 resolved 不挂（#69 与 #68 的合并口径）：条目保持裸形状
  assert.deepEqual(fixture.lines, [
    { type: 'image', names: ['res-x', 'res-y'], row: 0 },
  ]);
  assert.deepEqual(fixture.calls, []);
});

// —— 媒体缝（issue #69）：注册表查名与解析语义镜像 app.asar 实测行为 ——

test('媒体注册表：查名统一小写（引擎装载与查名两侧都小写）', () => {
  const fixture = create_era_fixture();
  fixture.seed_res('TITLE');
  fixture.seed_res('TFM-003A_17.mp3', 'audio');

  // 注册名带大写，查询任意大小写都命中（引擎 eraStart 落表即小写）
  assert.equal(fixture.era.checkImage('TITLE'), true);
  assert.equal(fixture.era.checkImage('title'), true);
  assert.deepEqual(fixture.era.checkImage('Tfm-003A_17.MP3', 'TITLE'), [
    false,
    true,
  ]);
});

test('checkImage 只认 image 类型（音频经 playMusic 命中，引擎代码为准）', () => {
  const fixture = create_era_fixture();
  fixture.seed_res('据点2.mp3', 'audio');

  // dev-guides/16 宣称 checkImage 可查音乐，但 app.asar 的 checkImage 只放行
  // image 类型——夹具按代码镜像，不按手册
  assert.equal(fixture.era.checkImage('据点2.mp3'), false);
  // 零参返回 false（引擎原文 `if(0===e.length)return!1`）
  assert.equal(fixture.era.checkImage(), false);
});

test('playMusic：config 非对象重置为 {loop:false}、取第一个注册音频、落空返回 false', () => {
  const fixture = create_era_fixture();
  fixture.seed_res('TITLE'); // 图片：即使排在前面也不命中（引擎只认 audio 类型）
  fixture.seed_res('据点2.mp3', 'audio');

  // 已注册的图片名在前、已注册的音频在后 → 播后者（引擎逐名找第一个音频）
  assert.equal(
    fixture.era.playMusic(['TITLE', '据点2.mp3'], { loop: true }),
    true,
  );
  assert.deepEqual(fixture.music, [
    {
      api: 'play',
      names: ['title', '据点2.mp3'],
      config: { loop: true },
      played: '据点2.mp3',
    },
  ]);

  // config 缺省 → 引擎重置为 {loop: false}（Emuera PLAYBGM 默认循环，ere 相反）
  fixture.era.playMusic('据点2.mp3');
  assert.deepEqual(fixture.music[1].config, { loop: false });

  // 全部落空：返回 false、不抛错（resource: false 时的静默回退）
  assert.equal(fixture.era.playMusic('不存在.mp3'), false);
  assert.equal(fixture.music[2].played, null);
});

test('stopMusic / resumeMusic 留痕（音乐事件记录面）', () => {
  const fixture = create_era_fixture();
  fixture.era.stopMusic();
  fixture.era.resumeMusic();

  assert.deepEqual(fixture.music, [{ api: 'stop' }, { api: 'resume' }]);
  // 已实现集：不落兜底 calls
  assert.deepEqual(fixture.calls, []);
});

test('printWholeImage：\\t 容错链与空层丢弃都记进 resolved', () => {
  const fixture = create_era_fixture();
  fixture.seed_res('heart');
  fixture.seed_res('heart_r');

  // 一层容错（第一个未注册、第二个命中）+ 一层全落空（该层被引擎丢弃）
  fixture.era.printWholeImage(['HEART_X\tHEART_R\tHEART', '幽灵层\t鬼影层']);
  const entry = fixture.lines[0];
  assert.equal(entry.type, 'image.whole');
  // 每层只解析出一个名字：首层取容错链第二个 heart_r，次层整体丢弃
  assert.deepEqual(entry.resolved, ['heart_r']);
  // falsy config 被引擎重置为 {}
  assert.deepEqual(entry.config, {});
});

test('音乐 API 不占 Row（引擎只 connect、不调 addTotalLines）；printImage 占 1 Row', () => {
  const fixture = create_era_fixture();
  const { era } = fixture;
  fixture.seed_res('据点2.mp3', 'audio');
  fixture.seed_res('TITLE');
  era.print('基准行');
  const before = era.getLineCount();

  // 反侧：三个音乐 API 都不改变行数（app.asar 实测：playMusic/stopMusic/
  // resumeMusic 只 connect，无 addTotalLines）。music[] 里的三条事件证明
  // 「行数没变」不是因为调用没发生——否则这条用例只是在测「什么都没发生」。
  era.playMusic('据点2.mp3', { loop: true });
  era.stopMusic();
  era.resumeMusic();
  assert.equal(era.getLineCount(), before);
  assert.equal(fixture.music.length, 3);

  // 正侧：同一场景下 printImage 计 1 Row（引擎结尾恰好一次 addTotalLines）
  era.printImage('TITLE');
  assert.equal(era.getLineCount(), before + 1);
  // 音乐误算成行是活风险：#73 画面组件的重绘算术全靠 Row 计数，多计一行
  // = 实机上多清一行。此用例即守住该判断的回归锁（#68 验收通则）。
});

// —— Row 记账（#68）：一次输出调用 = 一个 Row，与引擎口径一致 ——
// 引擎证据（app.asar）：主进程 EraApi 每次输出调用恰好一次 addTotalLines()；
// 渲染层把 printMultiCols / printInColRows 整次调用各装进一个行对象。

test('一次多列输出算一个 Row：getLineCount 增量为 1，clear(1) 只删本行', async () => {
  const fixture = create_era_fixture();
  const { era } = fixture;
  era.print('上一行');
  const before = era.getLineCount();

  era.printMultiColumns([
    { type: 'button', content: '调教', accelerator: 1 },
    { type: 'button', content: '外出', accelerator: 2 },
    { type: 'text', content: '状态' },
    { type: 'text', content: '更多' },
  ]);

  // ADR 0003 的缺陷场景：若按条目计数，增量是 4、组件 clear(4) 会连带
  // 抹掉上面三行无关内容——Row 口径下增量必须是 1
  assert.equal(era.getLineCount() - before, 1);
  // 全部格子共享同一 Row 号
  const rows = new Set(fixture.lines.slice(1).map((l) => l.row));
  assert.equal(rows.size, 1);

  assert.equal(await era.clear(1), 1);
  assert.deepEqual(fixture.text_lines(), ['上一行']);
  assert.equal(era.getLineCount(), 1);
});

test('printInColRows 整次调用一个 Row（多 ColumnObject 不拆行）', async () => {
  const fixture = create_era_fixture();
  const { era } = fixture;
  era.printInColRows(
    { columns: [{ type: 'text', content: '左' }] },
    { columns: [{ type: 'text', content: '右' }] },
  );

  assert.equal(era.getLineCount(), 1);
  assert.deepEqual(
    fixture.lines.map((l) => l.row),
    [0, 0],
  );
  await era.clear(1);
  assert.deepEqual(fixture.lines, []);
});

test('逐行输出 API 各占一个 Row：print/println/printButton/drawLine/printImage', () => {
  const fixture = create_era_fixture();
  const { era } = fixture;
  era.print('a');
  era.println();
  era.printButton('按钮', 0);
  era.drawLine();
  era.printImage('res');

  assert.deepEqual(
    fixture.lines.map((l) => l.row),
    [0, 1, 2, 3, 4],
  );
  assert.equal(era.getLineCount(), 5);
});

test("print 的 '\\n' 与 {isBr} 是显示级换行：编程上仍一个 Row", () => {
  const fixture = create_era_fixture();
  const { era } = fixture;
  era.print('第一行\n第二行');
  era.print([{ content: '前' }, { isBr: 1 }, '后']);

  assert.equal(era.getLineCount(), 2);
  assert.deepEqual(
    fixture.lines.map((l) => l.row),
    [0, 1],
  );
});

test('clear 越界按整屏清空（渲染层公式），clear(0) 无操作', async () => {
  const fixture = create_era_fixture();
  const { era } = fixture;
  era.print('a');
  era.printMultiColumns([
    { type: 'text', content: 'x' },
    { type: 'text', content: 'y' },
  ]);
  era.print('b');

  assert.equal(await era.clear(0), 3); // 0 行 → 无操作，返回当前行数
  assert.equal(era.getLineCount(), 3);
  assert.equal(await era.clear(99), 0); // 越界 → 整屏清空
  assert.deepEqual(fixture.lines, []);
});

test('replaceText 换掉最后一个 Row 的全部条目，行数不增', () => {
  const fixture = create_era_fixture();
  const { era } = fixture;
  era.print('标题');
  era.printMultiColumns([
    { type: 'button', content: '甲', accelerator: 1 },
    { type: 'button', content: '乙', accelerator: 2 },
  ]);

  assert.equal(era.replaceText('改写'), 2); // 引擎返回 totalLines 原值
  assert.equal(era.getLineCount(), 2);
  // 多列 Row 的两个格子一起消失，新文本占据同一 Row 号
  assert.deepEqual(
    fixture.lines.map((l) => [l.type, l.row]),
    [
      ['text', 0],
      ['text', 1],
    ],
  );
  assert.deepEqual(fixture.text_lines(), ['标题', '改写']);
});

test('replaceInColRows 与 replaceText 同口径：整行换、不增行', () => {
  const fixture = create_era_fixture();
  const { era } = fixture;
  era.printMultiColumns([
    { type: 'button', content: '甲', accelerator: 1 },
    { type: 'text', content: '乙' },
  ]);
  era.print('下一行');

  const ret = era.replaceInColRows(
    { columns: [{ type: 'text', content: '左' }] },
    [{ type: 'text', content: '右' }],
  );

  assert.equal(ret, 2);
  assert.equal(era.getLineCount(), 2);
  // 替换的是最后一个 Row（'下一行'）：row 0 的多列格子原样保留，
  // 替换条目全部落在 row 1
  assert.deepEqual(
    fixture.lines.map((l) => [l.type, l.row]),
    [
      ['button', 0],
      ['text', 0],
      ['text', 1],
      ['text', 1],
    ],
  );
});

test('printProgress 记 progress 条目并占一个 Row（顶层形态）', () => {
  const fixture = create_era_fixture();
  fixture.era.printProgress(50, '内部文本', '外部文本');

  // 不传 config → 引擎缺省 barWidth 24 物化进记录，且条后文字**不渲染**
  //（el-col-0 = display:none）——危险的默认值，夹具按 app.vue 渲染层逐字
  // 镜像（#74 发回整改）
  assert.deepEqual(fixture.lines, [
    {
      type: 'progress',
      percentage: 50,
      text: '内部文本',
      out: '外部文本',
      bar_width: 24,
      out_visible: false,
      row: 0,
    },
  ]);
  assert.equal(fixture.era.getLineCount(), 1);
  assert.deepEqual(fixture.calls, []);
});

// —— barWidth 镜像（#74 发回整改）：app.vue 渲染层公式 ——

test('progress 的 barWidth 镜像：顶层与多列格两条路径、空 out 的 v-if', () => {
  const fixture = create_era_fixture();
  const { era } = fixture;

  // 路径 1（顶层 printProgress 的第四参数）：barWidth<24 → 条后文字渲染
  era.printProgress(50, '阴核', ' 5540', { barWidth: 16 });
  // 路径 2（printMultiColumns 的 progress 格，config 随 GridObject 走）：
  // 不给 config → 缺省 24 物化，条后文字整列不渲染
  era.printMultiColumns([
    {
      type: 'progress',
      percentage: 50,
      inContent: '阴核',
      outContent: ' 5540',
    },
    {
      type: 'progress',
      percentage: 50,
      inContent: '阴核',
      outContent: ' 5540',
      config: { barWidth: 8 },
    },
  ]);

  assert.deepEqual(
    fixture.lines.map((l) => [l.bar_width, l.out_visible]),
    [
      [16, true], // 顶层 + config.barWidth=16
      [24, false], // 多列格无 config：缺省即危险值
      [8, true], // 多列格 + config.barWidth=8
    ],
  );

  // 引擎渲染层 v-if="line.outContent"：out 为空串时即使 span>0 也不渲染
  era.printProgress(100, '满档', '', { barWidth: 16 });
  const last = fixture.lines.at(-1);
  assert.equal(last.bar_width, 16);
  assert.equal(last.out, '');
  assert.equal(last.out_visible, false);
});

test('空 printMultiColumns 仍占一个 Row（引擎无条件 addTotalLines）', async () => {
  const fixture = create_era_fixture();
  const { era } = fixture;
  era.print('a');
  era.printMultiColumns([]);

  assert.equal(era.getLineCount(), 2); // 没有条目，但 Row 存在
  assert.equal(await era.clear(1), 1);
  assert.deepEqual(fixture.text_lines(), ['a']);
});

// —— input 回显计行（#68 整改）——
// 引擎主进程 input()（app.asar）：
//   v(this.config,"system.hideUserInput") || e.hideInput || e.any
//     || this.print(i)
// 普通 input() 的回显 print → addTotalLines → +1 Row；三段短路任一命中则
// 不 print。夹具只调计数器、不推条目（条目层的回显由对拍标记承载）。

test('input 回显计一行：画 3 行 → input → clear(3) → 组件首行残留（重绘主路径）', async () => {
  const fixture = create_era_fixture();
  const { era } = fixture;
  era.print('第一行');
  era.print('第二行');
  era.print('第三行');
  fixture.set_inputs(0);
  await era.input();

  // 引擎：回显 print 计 +1 Row → 总 4 行；条目层不新增（回显不推条目）
  assert.equal(era.getLineCount(), 4);
  assert.equal(fixture.lines.length, 3);

  // ADR-0003 的重绘纪律「重绘只发生在玩家交互之后」——交互就是 input。
  // 组件按绘制时量得的 3 行 clear(3)，引擎实机清掉的是「回显 + 组件后两
  // 行」，组件首行残留。行数口径若与引擎不一致（回显不计），组件在夹具
  // 里被完整清掉、实机上却留一行——本票要消灭的正是这类缺陷
  assert.equal(await era.clear(3), 1);
  assert.deepEqual(fixture.text_lines(), ['第一行']);
});

test('input 回显三段短路：hideInput / any / system.hideUserInput 任一命中即不计行', async () => {
  const fixture = create_era_fixture();
  const { era } = fixture;
  era.print('a');
  fixture.set_inputs(1, 2, 3);
  await era.input({ hideInput: true });
  await era.input({ any: true });
  fixture.system_config.hideUserInput = true;
  await era.input();

  assert.equal(era.getLineCount(), 1); // 三次输入都未触发回显计行

  // 短路解除（默认配置）→ 回显计行恢复
  fixture.system_config.hideUserInput = false;
  fixture.set_inputs(4);
  await era.input();
  assert.equal(era.getLineCount(), 2);
});
