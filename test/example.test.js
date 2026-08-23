/**
 * @file 示例测试 —— 后来者照这个文件写新的测试。
 *
 * 覆盖夹具的三件事：捕获输出文本、记录变量读写、消费预置输入。
 * 游戏代码零修改：ere/ 下的模块照常 require('#/era-electron')，
 * 夹具只替换 SDK 对象上的函数，不为测试留任何钩子。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_gamebase } = require('./helpers/gamebase');

test('示例：游戏入口 main 已接到标题画面（入口冒烟）', async () => {
  const fixture = create_era_fixture();

  // 标题画面从静态表读 GameBase：预置 yml/GameBase.yml 的运行时形状
  // （形状与字段对应见 helpers/gamebase.js）
  preset_gamebase(fixture);

  // 经 '#/' 加载游戏入口，与引擎的加载路径一致
  const main = fixture.load_module('main');

  // 标题画面是常驻循环（原作 RESTART 语义）：预置输入耗尽 = 循环仍在等待
  // 下一次交互，夹具以抛错终止（issue #16 的既定设计，测循环必用）
  await assert.rejects(() => main(), /预置输入已耗尽/);

  // 断言「输出了哪些文本」
  assert(fixture.text_lines().some((line) => line.includes('Ver0.0.0')));
});

test('示例：变量读写被记录', () => {
  const fixture = create_era_fixture();
  const { era } = fixture;

  // 预置初始状态（等价于引擎里已存在的变量值）
  fixture.store.set('global:3', 'zh-CN');

  // 游戏代码通过 era.set / era.get / era.add 操作变量
  era.set('base:0:0', 100);
  assert.equal(era.get('base:0:0'), 100);
  era.add('juel:0:10', 50);

  // 断言「写入了什么」
  assert.deepEqual(fixture.var_writes, [
    { name: 'base:0:0', value: 100 },
    { name: 'juel:0:10', value: 50 },
  ]);
  // 断言「读了什么」
  assert.deepEqual(fixture.var_reads, [{ name: 'base:0:0', value: 100 }]);
  // 断言最终存储
  assert.equal(fixture.store.get('juel:0:10'), 50);
});

test('示例：预置输入被依次消费', async () => {
  const fixture = create_era_fixture();
  fixture.set_inputs(1, 2);
  const { era } = fixture;

  assert.equal(await era.input(), 1);
  assert.equal(await era.input(), 2);

  // 断言「消费了哪些输入」
  assert.deepEqual(fixture.inputs_consumed, [
    { api: 'input', value: 1 },
    { api: 'input', value: 2 },
  ]);
});
