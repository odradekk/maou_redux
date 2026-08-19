/**
 * @file ere/era-utils/era-global.js 的行为测试（issue #18）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试缝，issue #16）：
 * 经 '#/era-utils/era-global' 加载真实模块，从夹具的变量读写记录与 store 观察。
 *
 * 覆盖 #18 验收清单的三条：
 *   1. 读取未声明的序号返回 0 而非 undefined——夹具有意让 era.get 对未设置
 *      变量返回 undefined（与引擎对未声明序号的行为一致，#13），包装层必须兜底；
 *   2. 标题路径的四个全局变量可经包装层读写（音乐开关、音量、两个界面开关）；
 *   3. 写入落在 global 表（公共存档 global.sav 的主体，dev-guides/11-saves.md）。
 *      持久化的单元级证据 = 写进 global:<id> 寻址；global.sav 的落盘/读回由引擎
 *      自动完成（loadGlobal/saveGlobal），实机验收在标题页票做。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

test('未初始化读取返回 0 而非 undefined（#13 引擎行为 + 包装层兜底）', () => {
  const fixture = create_era_fixture();
  const era_global = fixture.load_module('era-utils/era-global');

  // 夹具的 store 是空的：era.get 对所有寻址返回 undefined（与引擎对未声明
  // 序号的行为一致）。包装层不得把 undefined 漏给调用方。
  assert.equal(era_global.title_music_enabled, 0);
  assert.equal(era_global.title_music_volume, 0);
  assert.equal(era_global.audio_defaults_seeded, 0);
  assert.equal(era_global.contact_info_shown, 0);
  assert.equal(era_global.greeting_collapsed, 0);

  // 各访问器读的都是数字（undefined + 1 === NaN 类事故的根）
  for (const value of [
    era_global.title_music_enabled,
    era_global.title_music_volume,
    era_global.audio_defaults_seeded,
    era_global.contact_info_shown,
    era_global.greeting_collapsed,
  ]) {
    assert.equal(typeof value, 'number');
  }
});

test('四个标题路径全局变量经包装层写入并读回', () => {
  const fixture = create_era_fixture();
  const era_global = fixture.load_module('era-utils/era-global');

  era_global.title_music_enabled = 1;
  era_global.title_music_volume = 66;
  era_global.contact_info_shown = 1;
  era_global.greeting_collapsed = 1;

  assert.equal(era_global.title_music_enabled, 1);
  assert.equal(era_global.title_music_volume, 66);
  assert.equal(era_global.contact_info_shown, 1);
  assert.equal(era_global.greeting_collapsed, 1);
});

test('写入落到 global 表寻址（公共存档 global.sav 的主体）', () => {
  const fixture = create_era_fixture();
  const era_global = fixture.load_module('era-utils/era-global');

  era_global.title_music_volume = 66;
  era_global.greeting_collapsed = 1;

  // 底层寻址是数字下标（#5 决议），且全部落在 global: 命名空间
  assert.deepEqual(fixture.var_writes, [
    { name: 'global:1', value: 66 },
    { name: 'global:99', value: 1 },
  ]);
  assert.equal(fixture.store.get('global:1'), 66);
  assert.equal(fixture.store.get('global:99'), 1);

  // 重新读取（同局内再次访问）保留刚写入的值
  assert.equal(era_global.title_music_volume, 66);
  assert.equal(era_global.greeting_collapsed, 1);
});

test('手写区业务方法与生成区访问器共存：toggle 0↔1 往返', () => {
  const fixture = create_era_fixture();
  const era_global = fixture.load_module('era-utils/era-global');

  // 镜像原作 GLOBAL:n = (GLOBAL:n + 1) % 2 的两个切换方法
  assert.equal(era_global.toggle_greeting(), 1);
  assert.equal(era_global.toggle_greeting(), 0);
  assert.equal(era_global.toggle_contact_info(), 1);
  assert.equal(era_global.toggle_contact_info(), 0);

  // 切换落盘到对应序号
  assert.equal(fixture.store.get('global:99'), 0);
  assert.equal(fixture.store.get('global:98'), 0);
});

// —— 标题音乐默认值播种（issue #69 落地 #18 移交的缺口）——
//
// 原作随包 global.sav 预置 是否启用标题音乐=1、标题音乐音量=66；ere 引擎
// 全新 global.sav 把声明槽位一律置 0，且本票之前生成的旧档没有 global:2
// 槽（loadGlobal 对缺失声明槽补 0）——两种档都应落在「未播种」分支。

test('seed_title_music_defaults：未播种的档补写 1/66 并置标记、显式落公共存档', async () => {
  const fixture = create_era_fixture();
  const era_global = fixture.load_module('era-utils/era-global');

  assert.equal(await era_global.seed_title_music_defaults(), true);
  // 播种恰为三个槽：开关 1、音量 66、标记 1（变异任一默认值在此红）
  assert.deepEqual(fixture.var_writes, [
    { name: 'global:0', value: 1 },
    { name: 'global:1', value: 66 },
    { name: 'global:2', value: 1 },
  ]);
  assert.equal(fixture.store.get('global:0'), 1);
  // 原作的等价物是随包 global.sav，ere 只能运行时补 + 显式保存
  assert(fixture.calls.some((c) => c.api === 'saveGlobal'));
});

test('seed_title_music_defaults：标记已置则不播（用户关掉的标题音乐不被覆盖）', async () => {
  const fixture = create_era_fixture();
  const era_global = fixture.load_module('era-utils/era-global');
  // 播种过、但用户（经原作设定菜单）把音乐关了
  fixture.store.set('global:2', 1);
  fixture.store.set('global:0', 0);

  assert.equal(await era_global.seed_title_music_defaults(), false);
  assert.deepEqual(fixture.var_writes, []);
  assert(!fixture.calls.some((c) => c.api === 'saveGlobal'));
  // 用户偏好原样保留
  assert.equal(era_global.title_music_enabled, 0);
});

test('seed_title_music_defaults：本票之前的旧档（无 global:2 槽）也落在播种分支', async () => {
  const fixture = create_era_fixture();
  const era_global = fixture.load_module('era-utils/era-global');
  // 旧档形态：只有 0/98/99 槽，2 槽缺失（读值得 undefined → 兜底 0）
  fixture.store.set('global:98', 1);

  assert.equal(await era_global.seed_title_music_defaults(), true);
  assert.equal(fixture.store.get('global:0'), 1);
  assert.equal(fixture.store.get('global:2'), 1);
});
