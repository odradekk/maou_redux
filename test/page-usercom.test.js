/**
 * ere/page/page-usercom.js 的行为测试（issue #44：@SHOW_USERCOM / @USERCOM）。
 *
 * 缝 = test/helpers/era-fixture.js。本票菜单只挂 [999] 调教结束（工单事实
 * #2），其余按钮与处理器整组欠账——欠账面由存根清单对账钉死。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function load_page(fixture) {
  fixture.load_module('page/page-usercom');
  return fixture.load_module('system/event/registry');
}

test('@SHOW_USERCOM：只挂 [999] 调教结束，其余按钮组一行占位', async () => {
  const fixture = create_era_fixture();
  const { emit } = load_page(fixture);

  await emit('SHOW_USERCOM');

  const buttons = fixture.lines.filter((line) => line.type === 'button');
  assert.deepEqual(
    buttons.map((b) => [b.accelerator, b.text]),
    [[999, '调教结束']],
    '本票菜单只挂 [999]（按钮正文不带编号前缀，引擎自动拼）',
  );
  assert(
    fixture.text_lines().some((line) => line.includes('@SHOW_USERCOM')),
    '未挂载的按钮组必须有可检索的占位行',
  );
});

test('@USERCOM：999 → BEGIN AFTERTRAIN（链内暂存，最后一个胜出）', async () => {
  const fixture = create_era_fixture();
  const { emit } = load_page(fixture);

  const pending = await emit('USERCOM', 999);

  assert.equal(pending, 'AFTERTRAIN');
});

test('@USERCOM：未挂载的编号落到链尾 RETURN 0，无输出无转场', async () => {
  const fixture = create_era_fixture();
  const { emit } = load_page(fixture);

  const pending = await emit('USERCOM', 100); // 能力表示：按钮未挂、处理器欠账

  assert.equal(pending, undefined);
  assert.deepEqual(fixture.lines, [], '未挂载输入不得有任何反馈（重绘即反馈）');
});

test('存根清单可检索：docs/stub-registry.md 收录本票全部占位名', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = fixture.load_module('page/page-usercom');
  const registry = fs.readFileSync(
    path.resolve(__dirname, '..', 'docs', 'stub-registry.md'),
    'utf8',
  );

  assert.deepEqual(STUBBED_CALLS, [
    'SHOW_CHARA_INFO',
    'STAIN_INFO',
    'CONDOM_SETTINGS',
    'COMSEQ_REGISTER',
    'COMSEQ_SHOW',
    'COMSEQ_TRAIN',
    'SHOW_COMMENU',
  ]);
  for (const name of STUBBED_CALLS) {
    assert(registry.includes(name), `存根清单缺少 ${name}`);
  }
});
