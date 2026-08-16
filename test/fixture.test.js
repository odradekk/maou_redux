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
  fixture.era.playMusic('bgm-title');
  fixture.era.setTitle('ERA魔王');

  assert.deepEqual(fixture.calls, [
    { api: 'playMusic', args: ['bgm-title'] },
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

test('waitAnyKey 立即返回并留痕', async () => {
  const fixture = create_era_fixture();
  await fixture.era.waitAnyKey();
  assert.deepEqual(fixture.inputs_consumed, [{ api: 'waitAnyKey' }]);
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
  fixture.era.addCharacter(0);
  fixture.era.addCharacter(31);

  assert.deepEqual(fixture.added_characters, [0, 31]);
  assert.deepEqual(fixture.era.getAddedCharacters(), [0, 31]);
  // 返回副本：外部篡改不影响列表本体
  fixture.era.getAddedCharacters().pop();
  assert.deepEqual(fixture.added_characters, [0, 31]);

  fixture.era.resetData();
  assert.deepEqual(fixture.added_characters, []);
  // 这些 API 已实装，不再走兜底记录
  assert.deepEqual(fixture.calls, []);
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
