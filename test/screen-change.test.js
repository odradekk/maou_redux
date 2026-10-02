/**
 * 换屏入口（issue #721 / ADR-0009）的行为测试：换屏＝整屏清空，且不补
 * 等键——菜单输入的回显在引擎侧就算一次新输出，waitAnyKey 按「上次输入
 * 之后有没有新输出」决定等不等，无条件等键会让每次菜单选择后都多一次
 * 按键（#720 实现决定）。
 *
 * 本工单只交付入口与夹具检查，不接入任何页面，游戏输出不变；接入与逐页
 * 盘点在后续工单。换屏前缺按键确认的路径由夹具的未读输出检查
 * （unread_output_clears）在端到端测试里报出。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

test('换屏：整屏清空，屏幕回到 0 行', async () => {
  const fixture = create_era_fixture();
  const { era } = fixture;
  era.print('上一屏的残留');
  era.printButton('指令', 1);
  era.println();
  assert.equal(era.getLineCount(), 3, '预置三行，避免 clear(1) 冒充整屏清空');

  const { change_screen } = fixture.load_module(
    'page/components/screen-change',
  );
  assert.equal(await change_screen(), 0, '返回清屏后的行数（恒 0）');
  assert.equal(era.getLineCount(), 0, '换屏后行数必须归 0（整屏清空）');
});

test('换屏：不补等键——不产生任何按键消费', async () => {
  const fixture = create_era_fixture();
  fixture.era.print('有输出：若 waitAnyKey 被调用，必然真的等待');
  const { change_screen } = fixture.load_module(
    'page/components/screen-change',
  );
  await change_screen();
  assert.deepEqual(fixture.waits, [], '换屏不得调用 waitAnyKey');
  assert.deepEqual(fixture.inputs_consumed, [], '换屏不得消费按键');
});

test('换屏：清掉的未读输出由夹具记录（与检查共用同一条 clear 路径）', async () => {
  const fixture = create_era_fixture();
  fixture.set_inputs(1);
  await fixture.era.input();
  fixture.era.print('还没被确认的结算');
  const { change_screen } = fixture.load_module(
    'page/components/screen-change',
  );
  await change_screen();
  assert.deepEqual(fixture.unread_output_clears, [
    { row: 1, type: 'text', text: '还没被确认的结算' },
  ]);
});
