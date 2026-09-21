/**
 * ere/page/page-campaign.js @CAMPAIGN_MENU 调用点的行为测试（issue #468）。
 *
 * 菜单主体待 #469 实现，本文件只验证：调用产出登记良好的占位输出、
 * STUBBED_CALLS 与 docs/stub-registry.md 的登记一致。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function history_texts(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

test('campaign_menu()：产出登记良好的占位输出（#469 前的占位实现）', async () => {
  const fixture = create_era_fixture();
  const { campaign_menu } = fixture.load_module('page/page-campaign');
  await campaign_menu();
  assert(
    history_texts(fixture).some((line) => line.includes('@CAMPAIGN_MENU')),
    '占位行带原作函数名',
  );
});

test('存根清单可检索：docs/stub-registry.md 收录本文件全部占位名', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = fixture.load_module('page/page-campaign');
  assert.deepEqual(STUBBED_CALLS, ['CAMPAIGN_MENU']);
  const registry = fs.readFileSync(
    path.resolve(__dirname, '..', 'docs', 'stub-registry.md'),
    'utf8',
  );
  for (const name of STUBBED_CALLS) {
    assert(registry.includes(name), `存根清单缺少 ${name}`);
  }
});
