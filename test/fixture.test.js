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
