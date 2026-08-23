/**
 * ere/page/page-select-target.js 的行为测试（issue #44：@SELECT_TARGET 真身）。
 *
 * 缝 = test/helpers/era-fixture.js。验收项：真实实现（分页列表 + 输入循环 +
 * 取消路径），判据 IS_TRAINABLE；**取消时回主菜单且不进调教，此行为有测试**。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara } = require('./helpers/chara');

function load_page(fixture) {
  return fixture.load_module('page/page-select-target');
}

// 列表行自 #44 验收后是按钮（实机上纯文本点不动）：断言要看引擎实际渲染的
// 文本——fixture 的 button.rendered 抄的是引擎公式 `[快捷键] 正文`。
function rendered_lines(fixture) {
  return fixture.lines
    .filter((line) => line.type === 'text' || line.type === 'button')
    .map((line) => (line.type === 'button' ? line.rendered : line.text));
}

test('IS_TRAINABLE：范围外/魔王/占用/可选四态（ID 语义判据）', () => {
  const fixture = create_era_fixture();
  join_slave_chara(fixture, 31);
  const { is_trainable } = load_page(fixture);

  assert.equal(is_trainable(-1), 1, '负指针：范围外'); // ARG < 1
  assert.equal(is_trainable(0), 1, '魔王：不可调教'); // ARG == MASTER
  assert.equal(is_trainable(31), 0, '已加入且未占用：可选');
  assert.equal(is_trainable(77), 1, '未加入：范围外（ID 语义的越界判据）');
  fixture.store.set('cflag:31:1', 2);
  assert.equal(is_trainable(31), 2, '占用中（CFLAG:x:1 != 0）');
});

test('IS_ASSISTABLE：助手役/占用/目标重叠/可选四态', () => {
  const fixture = create_era_fixture();
  join_slave_chara(fixture, 31);
  join_slave_chara(fixture, 32);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  const { is_assistable } = load_page(fixture);

  assert.equal(is_assistable(31), 2, '非助手役（CFLAG:x:0 != 2）');
  fixture.store.set('cflag:32:0', 2); // 32 是助手役
  assert.equal(is_assistable(32), 0, '助手役且未占用：可选');
  fixture.store.set('cflag:32:1', 1);
  assert.equal(is_assistable(32), 3, '占用中');
  fixture.store.set('cflag:32:1', 0);
  era_flag.target = 32;
  assert.equal(is_assistable(32), 4, '当前目标不可兼助手');
});

test('选中：输入角色 ID → 置 TARGET 与 FLAG:1，返回 1', async () => {
  const fixture = create_era_fixture();
  join_slave_chara(fixture, 31, '温妮');
  const { select_target } = load_page(fixture);
  fixture.set_inputs(31);

  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = -1;
  assert.equal(await select_target(), 1);
  assert.equal(era_flag.target, 31);
  assert(
    fixture.var_writes.some((w) => w.name === 'flag:1' && w.value === 31),
    'FLAG:1（前回调教目标）必须随选中置位',
  );
  // 列表渲染：标题 + 行（编号即角色 ID）
  const texts = rendered_lines(fixture);
  assert(texts.includes('请魔王大人选择将要调教的奴隶人选'));
  assert(
    texts.includes('[31] 温妮'),
    '奴隶行必须是按钮（accelerator = 角色 ID），前缀由引擎拼',
  );
});

test('取消：输入 999 → 返回 0，不置任何指针（回主菜单、不进调教）', async () => {
  const fixture = create_era_fixture();
  join_slave_chara(fixture, 31, '温妮');
  const { select_target } = load_page(fixture);
  fixture.set_inputs(999);

  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = -1;
  assert.equal(await select_target(), 0);
  assert.equal(era_flag.target, -1, '取消不得选中目标');
  assert(
    !fixture.var_writes.some((w) => w.name === 'flag:1'),
    '取消不得写前回调教目标',
  );
});

test('列表为空：唯一角色是魔王（不可选）→ 不等输入直接取消', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  const { select_target } = load_page(fixture);

  assert.equal(await select_target(), 0);
  assert.deepEqual(fixture.inputs_consumed, [], '空列表不得等输入');
});

test('未打印按钮的值引擎不送达：拒收且不重绘；再选 999 取消（#130）', async () => {
  // 原用例曾喂 42 验证「重绘不提示」：42 不是已打印按钮（列表只印 31 与
  // 999），引擎的 input() 在渲染层就把它弹回——无效输入重绘分支是引擎死
  // 路径。此处钉引擎可达的部分：拒收时画面原样（不重绘、无提示），取消
  // 键照常生效
  const locked = create_era_fixture();
  join_slave_chara(locked, 31, '温妮');
  const { select_target: select_locked } = load_page(locked);
  locked.set_inputs(42);
  await assert.rejects(() => select_locked(), /输入不合法！请输入以下值之一：/);
  assert.deepEqual(locked.inputs_consumed, [], '42 未被送达');
  assert.equal(
    locked
      .text_lines()
      .filter((line) => line === '请魔王大人选择将要调教的奴隶人选').length,
    1,
    '拒收后不得重绘（引擎侧玩家看到的是提示框，画面原样）',
  );

  const fixture = create_era_fixture();
  join_slave_chara(fixture, 31, '温妮');
  const { select_target } = load_page(fixture);
  fixture.set_inputs(999);

  assert.equal(await select_target(), 0);
  assert.equal(
    fixture
      .text_lines()
      .filter((line) => line === '请魔王大人选择将要调教的奴隶人选').length,
    1,
  );
});

test('翻页：27 人超过每页 26，[1001] 翻出第 27 人；[1000] 翻回', async () => {
  const fixture = create_era_fixture();
  for (let id = 1; id <= 27; id += 1) {
    join_slave_chara(fixture, id, `奴隶${id}`);
  }
  const { select_target } = load_page(fixture);
  fixture.set_inputs(1001, 1000, 999);

  assert.equal(await select_target(), 0);
  const texts = rendered_lines(fixture);
  // 首页：1..26（27 号不在）；第二页：只有 27 号；翻回：又是 1 号开头
  const first_draw = texts.findIndex((l) => l === '[1] 奴隶1');
  assert.ok(first_draw >= 0);
  const page2_at = texts.findIndex((l) => l === '[27] 奴隶27');
  assert.ok(page2_at > first_draw, '第 27 人只能在翻页后出现');
  // 第二页不含 1 号（截取第 26 行到 27 号行之间的渲染）
  const between = texts.slice(texts.lastIndexOf('[26] 奴隶26'), page2_at);
  assert(!between.some((l) => l.includes('奴隶1')));
  // 三轮绘制（首页/第二页/翻回首页）
  assert.equal(
    texts.filter((l) => l === '请魔王大人选择将要调教的奴隶人选').length,
    3,
  );
});

test('页首不再退：第一页输入 [1000] 维持原页', async () => {
  const fixture = create_era_fixture();
  join_slave_chara(fixture, 31, '温妮');
  const { select_target } = load_page(fixture);
  fixture.set_inputs(1000, 999);

  assert.equal(await select_target(), 0);
  const texts = rendered_lines(fixture);
  // 两轮都显示同一人（页码没有变成 -1 导致列表消失）
  assert.equal(texts.filter((l) => l === '[31] 温妮').length, 2);
});

test('1002 其它：MONSTER_PLAY 存根占位，返回 0（取消语义透传）', async () => {
  const fixture = create_era_fixture();
  join_slave_chara(fixture, 31);
  const { select_target } = load_page(fixture);
  fixture.set_inputs(1002);

  assert.equal(await select_target(), 0);
  assert(fixture.text_lines().some((line) => line.includes('@MONSTER_PLAY')));
});

test('存根清单可检索：docs/stub-registry.md 收录这张票全部占位名', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = load_page(fixture);
  const registry = fs.readFileSync(
    path.resolve(__dirname, '..', 'docs', 'stub-registry.md'),
    'utf8',
  );

  assert.deepEqual(STUBBED_CALLS, ['MONSTER_PLAY', 'SHOW_LIST_TRAINABLE']);
  for (const name of STUBBED_CALLS) {
    assert(registry.includes(name), `存根清单缺少 ${name}`);
  }
});
