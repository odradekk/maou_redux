/**
 * @file 角色离队/归队 @EVENT_CHARA_LEAVE / @EVENT_CHARA_RETURN 的行为测试
 *   （issue #405）。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_chara_0, join_slave_chara } = require('./helpers/chara');

function seed_world() {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  join_slave_chara(fixture, 31, '琼');
  return fixture;
}

test('EVENT_CHARA_LEAVE：序列化后角色从在场列表除名', () => {
  const fixture = seed_world();
  const { event_chara_leave } = fixture.load_module('event/event-chara-leave');

  const descriptor = event_chara_leave(85, 31);

  assert.equal(typeof descriptor, 'string');
  assert.deepEqual(fixture.era.getAddedCharacters(), []);
});

test('EVENT_CHARA_LEAVE：清空上次调教对象/助手引用', () => {
  const fixture = seed_world();
  const { event_chara_leave } = fixture.load_module('event/event-chara-leave');
  fixture.store.set('flag:1', 31);
  fixture.store.set('flag:2', 31);

  event_chara_leave(85, 31);

  assert.equal(fixture.store.get('flag:1'), -1);
  assert.equal(fixture.store.get('flag:2'), -1);
});

test('EVENT_CHARA_LEAVE：不影响与本角色无关的上次调教对象/助手引用', () => {
  const fixture = seed_world();
  join_slave_chara(fixture, 32, '梅');
  const { event_chara_leave } = fixture.load_module('event/event-chara-leave');
  fixture.store.set('flag:1', 32);
  fixture.store.set('flag:2', 32);

  event_chara_leave(85, 31);

  assert.equal(fixture.store.get('flag:1'), 32);
  assert.equal(fixture.store.get('flag:2'), 32);
});

test('EVENT_CHARA_LEAVE → EVENT_CHARA_RETURN：九张表原地往返，下标不错位', () => {
  const fixture = seed_world();
  const { event_chara_leave, event_chara_return } = fixture.load_module(
    'event/event-chara-leave',
  );

  fixture.store.set('cflag:31:9', 7); // 等级
  fixture.store.set('callname:31:-2', '琼');
  fixture.store.set('abl:31:10', 3);
  fixture.store.set('base:31:0', 80);
  fixture.store.set('maxbase:31:0', 100);
  fixture.store.set('cflag:31:2', 1500);
  fixture.store.set('exp:31:21', 200);
  fixture.store.set('equip:31:5', 1);
  fixture.store.set('juel:31:100', 40);
  fixture.store.set('talent:31:85', 1);
  fixture.store.set('mark:31:2', 3);
  fixture.store.set('cstr:31:0', '备注文本');
  fixture.store.set('cflag:31:451', 1); // 已生成过身体数据，跳过存根提示

  const descriptor = event_chara_leave(85, 31);
  const new_cid = event_chara_return(descriptor);

  assert.equal(new_cid, 31);
  assert.equal(fixture.store.get('cflag:31:9'), 7, '等级不错位到 ABL');
  assert.equal(fixture.store.get('callname:31:-1'), '琼');
  assert.equal(fixture.store.get('callname:31:-2'), '琼');
  assert.equal(fixture.store.get('abl:31:10'), 3, 'ABL 不错位到 BASE');
  assert.equal(
    fixture.store.get('base:31:0'),
    100,
    '归队后体力回满（覆盖归档值 80）',
  );
  assert.equal(fixture.store.get('maxbase:31:0'), 100);
  assert.equal(fixture.store.get('cflag:31:2'), 1500);
  assert.equal(fixture.store.get('exp:31:21'), 200);
  assert.equal(fixture.store.get('equip:31:5'), 1);
  assert.equal(fixture.store.get('juel:31:100'), 40);
  assert.equal(fixture.store.get('talent:31:85'), 1);
  assert.equal(fixture.store.get('mark:31:2'), 3);
  assert.equal(
    fixture.store.get('cstr:31:0'),
    '备注文本',
    '字符串表不被 Number() 转换',
  );
  assert.deepEqual(fixture.era.getAddedCharacters(), [31]);
});

test('EVENT_CHARA_RETURN：重置侵攻阶层/侵攻度/角色状态', () => {
  const fixture = seed_world();
  const { event_chara_leave, event_chara_return } = fixture.load_module(
    'event/event-chara-leave',
  );
  fixture.store.set('cflag:31:501', 3); // 侵攻阶层
  fixture.store.set('cflag:31:502', 50); // 侵攻度
  fixture.store.set('cflag:31:1', 2); // 角色状态：侵攻中
  fixture.store.set('cflag:31:451', 1);

  const descriptor = event_chara_leave(85, 31);
  event_chara_return(descriptor);

  assert.equal(fixture.store.get('cflag:31:501'), 0);
  assert.equal(fixture.store.get('cflag:31:502'), 0);
  assert.equal(fixture.store.get('cflag:31:1'), 0);
});

test('EVENT_CHARA_RETURN：低于 setlv 时按差值补足 ST_UP', () => {
  const fixture = seed_world();
  const { event_chara_leave, event_chara_return } = fixture.load_module(
    'event/event-chara-leave',
  );
  fixture.store.set('cflag:31:9', 3); // 归档等级 3
  fixture.store.set('cflag:31:451', 1);

  const descriptor = event_chara_leave(85, 31);
  event_chara_return(descriptor, 6, () => 0);

  assert.equal(fixture.store.get('cflag:31:9'), 6, '差 3 级，ST_UP 补足 3 次');
});

test('EVENT_CHARA_RETURN：不低于 setlv 时不触发 ST_UP', () => {
  const fixture = seed_world();
  const { event_chara_leave, event_chara_return } = fixture.load_module(
    'event/event-chara-leave',
  );
  fixture.store.set('cflag:31:9', 8);
  fixture.store.set('cflag:31:451', 1);

  const descriptor = event_chara_leave(85, 31);
  event_chara_return(descriptor, 6);

  assert.equal(
    fixture.store.get('cflag:31:9'),
    8,
    '归档等级已达标，不下调也不上调',
  );
});

test('EVENT_CHARA_RETURN：身体数据未生成（CFLAG:451==0）时打存根占位', () => {
  const fixture = seed_world();
  const { event_chara_leave, event_chara_return } = fixture.load_module(
    'event/event-chara-leave',
  );
  // 未设置 cflag:31:451，默认 0

  const descriptor = event_chara_leave(85, 31);
  event_chara_return(descriptor);

  assert(
    fixture
      .text_lines()
      .some((line) => line.includes('CHAR_BODY_GENERATE_WAPPED')),
    '未生成身体数据时应留存根痕迹',
  );
});

test('EVENT_CHARA_RETURN：身体数据已生成（CFLAG:451!=0）时不打存根占位', () => {
  const fixture = seed_world();
  const { event_chara_leave, event_chara_return } = fixture.load_module(
    'event/event-chara-leave',
  );
  fixture.store.set('cflag:31:451', 1);

  const descriptor = event_chara_leave(85, 31);
  event_chara_return(descriptor);

  assert.deepEqual(fixture.text_lines(), []);
});
