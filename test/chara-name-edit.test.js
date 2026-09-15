/**
 * @file ere/chara/chara-name-edit.js 的行为测试（issue #384，N2）：
 * @SHOW_BUTTON_NAME_EDIT / @CHECK_ABLE_TO_NAME_EDIT / @CHARA_INFO_NAME_EDIT。
 *
 * 源: target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB 全三函数（:4-109）。
 *
 * 缝 = test/helpers/era-fixture.js。判定函数是纯的（只看 CFLAG:1），
 * 按钮外观断言看夹具的 `rendered` 字段（引擎的 `[加速键] ` 前缀与空白
 * 折叠都在那一层，只看 text 会漏掉手写前缀撞车）。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function load(fixture) {
  return fixture.load_module('chara/chara-name-edit');
}

function add_chara(fixture, cid, name = `角色${cid}`) {
  fixture.seed_chara(cid, { id: cid, name, callname: name });
  assert.equal(fixture.era.addCharacter(cid), true);
}

function buttons(fixture) {
  return fixture.lines_history.filter((line) => line.type === 'button');
}

function texts(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

// —— @CHECK_ABLE_TO_NAME_EDIT（:32-50）——

test('check_able_to_name_edit：五档返回值的完整分支表', () => {
  const table = [
    ['魔王（ARG 0）恒 1', 0, undefined, 1],
    ['侵攻中的勇者（状态 2）', 3, 2, 2],
    ['苗床（状态 7）', 3, 7, 3],
    ['调教中（状态 1）', 3, 1, 4],
    ['迎击中（状态 4）', 3, 4, 4],
    ['未占用（状态 0）', 3, 0, 0],
    ['迎击中可迎击态（状态 3）', 3, 3, 0],
  ];
  for (const [label, arg, state, expected] of table) {
    const fixture = create_era_fixture();
    if (state !== undefined) {
      fixture.store.set(`cflag:${arg}:1`, state);
    }
    const { check_able_to_name_edit } = load(fixture);
    assert.equal(check_able_to_name_edit(arg), expected, label);
  }
});

// —— @SHOW_BUTTON_NAME_EDIT（:4-29）——

test('show_button_name_edit：可改名时渲染「改名」按钮，正文不带手写快捷键前缀', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 3);
  fixture.store.set('cflag:3:1', 0);
  const { show_button_name_edit } = load(fixture);

  show_button_name_edit(0, 3);
  const [button] = buttons(fixture);
  assert.equal(button.accelerator, 0, 'NUM 作加速键');
  // 引擎渲染层拼 `[0] ` 并把全角空格折成半角；正文里我们自己没写前缀
  assert.equal(button.rendered, '[0] 改名 ');
  assert.equal(button.color, undefined, '可改名时不设灰色');
});

test('show_button_name_edit：reset 非零渲染「还原名字」', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 3);
  const { show_button_name_edit } = load(fixture);
  show_button_name_edit(1, 3, 1);
  assert.equal(buttons(fixture)[0].rendered, '[1] 还原名字 ');
});

test('show_button_name_edit：侵攻中的勇者整条按钮不渲染（:14-15）', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 3);
  fixture.store.set('cflag:3:1', 2);
  const { show_button_name_edit } = load(fixture);
  show_button_name_edit(0, 3);
  assert.deepEqual(buttons(fixture), [], '状态 2 → 直接 RETURN 0');
});

test('show_button_name_edit：奴隷不可改名时染灰并在按钮后复原默认色', () => {
  for (const state of [7, 1, 4]) {
    const fixture = create_era_fixture();
    add_chara(fixture, 3);
    fixture.store.set('cflag:3:1', state);
    const { show_button_name_edit } = load(fixture);
    show_button_name_edit(0, 3);
    assert.equal(
      buttons(fixture)[0].rendered,
      '[0] 改名 ',
      `状态 ${state} 仍渲染按钮`,
    );
    // :21 SETCOLOR 0x646464 → era.setColor('#646464')、:29 RESETCOLOR →
    // 空参（SDK「Set default text color」）。**染色本身在夹具里不可见**：
    // 夹具只记录 setColor 调用、不模拟「后续输出被染」的状态（data/research/
    // fixture-engine-gap.md 登记的观察面限制），故断言的是这对调用的次序。
    assert.deepEqual(
      fixture.calls
        .filter((call) => call.api === 'setColor')
        .map((call) => call.args[0]),
      ['#646464', ''],
      `状态 ${state} 的先染后复原`,
    );
  }
});

test('show_button_name_edit：魔王档（返回值 1）不染灰', () => {
  const fixture = create_era_fixture();
  const { show_button_name_edit } = load(fixture);
  show_button_name_edit(0, 0);
  assert.equal(
    buttons(fixture)[0].color,
    undefined,
    ':16-18 魔王走 ELSEIF LOCAL == 1',
  );
});

// —— @CHARA_INFO_NAME_EDIT（:53-109）——

test('chara_info_name_edit：不可改名的三档各自反馈，返回值区分 2 与 0', async () => {
  const cases = [
    [7, 0, '苗床不可改变名字'], // :66-67
    [1, 0, '角色处于不能变更名字的状态'], // :68-69
    [4, 0, '角色处于不能变更名字的状态'],
    [2, 2, undefined], // :64-65 侵攻中：只回值、不播报
  ];
  for (const [state, expected, message] of cases) {
    const fixture = create_era_fixture();
    add_chara(fixture, 3);
    fixture.store.set('cflag:3:1', state);
    const { chara_info_name_edit } = load(fixture);
    assert.equal(await chara_info_name_edit(3), expected, `状态 ${state}`);
    if (message) {
      assert(texts(fixture).includes(message), `状态 ${state} 的反馈文案`);
    } else {
      assert.deepEqual(texts(fixture), [], '状态 2 不播报');
    }
  }
});

test('chara_info_name_edit：还原名字——称呼回到初始值并读回', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 3, '本名');
  fixture.store.set('cflag:3:1', 0);
  fixture.store.set('callname:3:-2', '改过的称呼');
  const { chara_info_name_edit } = load(fixture);

  assert.equal(await chara_info_name_edit(3, 1), 0);
  assert.equal(
    fixture.store.get('callname:3:-2'),
    '本名',
    'chara_name_reset 真身已生效',
  );
  assert(
    texts(fixture).some((t) => t.includes('恢复了原来的名字')),
    ':78 的播报',
  );
});

test('chara_info_name_edit：改名成功——两个名字键都更新为输入值', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 3, '旧名');
  fixture.store.set('cflag:3:1', 0);
  fixture.set_inputs('新名字');
  const { chara_info_name_edit } = load(fixture);

  assert.equal(await chara_info_name_edit(3), 0);
  assert.equal(fixture.store.get('callname:3:-1'), '新名字', ':98');
  assert.equal(fixture.store.get('callname:3:-2'), '新名字', ':99');
  assert(
    texts(fixture).some((t) => t === '旧名今后被称呼为新名字。'),
    ':97 的播报用改名前的称呼',
  );
});

test('chara_info_name_edit：引擎归一后的零截输入按原文落名（:100 的守卫形状）', async () => {
  // 引擎的 input 回传经 getNumber 归一，`''` 与 `'0'` 都到手为数字 0
  // （夹具同款），故读到的字符串是 '0'、长度 1，走改名支——这一点与
  // 原作一致（原作 INPUTS 的 RESULTS 也是归一后的形状）。
  // :100 的零长支因此要靠**真正没有回传值**的情形触发；移植侧以
  // `undefined → ''` 承接（引擎空回传的等价物），下面直接调私有分支。
  const fixture = create_era_fixture();
  add_chara(fixture, 3, '旧名');
  fixture.store.set('cflag:3:1', 0);
  fixture.set_inputs('0');
  const { chara_info_name_edit } = load(fixture);
  assert.equal(await chara_info_name_edit(3), 0);
  assert.equal(fixture.store.get('callname:3:-2'), '0', '零截输入按原文落名');
});

test('chara_info_name_edit：超长名字打回重问（重新进入 :88 的输入循环）', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 3, '旧名');
  fixture.store.set('cflag:3:1', 0);
  // 17 字超限，第二次给 16 字
  fixture.set_inputs('一'.repeat(17), '二'.repeat(16));
  const { chara_info_name_edit } = load(fixture);

  assert.equal(await chara_info_name_edit(3), 0);
  assert(
    texts(fixture).includes('名字太长，请使用全角八字以下的名字。'),
    ':94 的提示',
  );
  assert.equal(
    fixture.store.get('callname:3:-2'),
    '二'.repeat(16),
    '16 字通过（阈值 16，不是 8）',
  );
});

test('chara_info_name_edit：16 字恰在界内、17 字恰在界外（阈值两侧各一侧）', async () => {
  const inside = create_era_fixture();
  add_chara(inside, 3, '旧名');
  inside.store.set('cflag:3:1', 0);
  inside.set_inputs('三'.repeat(16));
  const { chara_info_name_edit } = load(inside);
  await chara_info_name_edit(3);
  assert.equal(inside.store.get('callname:3:-2'), '三'.repeat(16));

  const outside = create_era_fixture();
  add_chara(outside, 3, '旧名');
  outside.store.set('cflag:3:1', 0);
  outside.set_inputs('四'.repeat(17), '五'.repeat(16));
  const { chara_info_name_edit: run_outside } = load(outside);
  await run_outside(3);
  assert.equal(
    outside.store.get('callname:3:-2'),
    '五'.repeat(16),
    '17 字被打回，重问后的 16 字生效',
  );
});

test('chara_info_name_edit：CFLAG:450 >= 99 时改名后重设一人称', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 3, '旧名');
  fixture.store.set('cflag:3:1', 0);
  fixture.store.set('cflag:3:450', 99); // 自主选择档 → 触发重设
  fixture.set_inputs('新名字');
  const { chara_info_name_edit } = load(fixture);
  await chara_info_name_edit(3);
  // random_self_call 会把档位重新落到具体一人称（<9 直设 / 表内档 / 重试）
  assert.notEqual(
    fixture.store.get('cflag:3:450'),
    undefined,
    '一人称档位被 random_self_call 写过',
  );
  assert.notEqual(fixture.store.get('cstr:3:60'), undefined, '一人称已设');
});

test('chara_info_name_edit：CFLAG:450 的门槛恰在 99 两侧（98 不动、99 重设）', async () => {
  // 98：门槛下侧——一人称原样不动
  const below = create_era_fixture();
  add_chara(below, 3, '旧名');
  below.store.set('cflag:3:1', 0);
  below.store.set('cflag:3:450', 98); // 恰在门槛下侧
  below.store.set('cstr:3:60', '本宫');
  below.set_inputs('新名字');
  const { chara_info_name_edit: run_below } = load(below);
  await run_below(3);
  assert.equal(
    below.store.get('cstr:3:60'),
    '本宫',
    '450 = 98 时一人称原样不动',
  );

  // 99：门槛上侧——重设被触发
  const at = create_era_fixture();
  add_chara(at, 3, '旧名');
  at.store.set('cflag:3:1', 0);
  at.store.set('cflag:3:450', 99);
  at.set_inputs('新名字');
  const { chara_info_name_edit: run_at } = load(at);
  await run_at(3);
  assert.notEqual(at.store.get('cstr:3:60'), undefined, '450 = 99 触发重设');
});

test('chara_info_name_edit：还原名字时同样按 CFLAG:450 决定是否重设一人称', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 3, '本名');
  fixture.store.set('cflag:3:1', 0);
  fixture.store.set('cflag:3:450', 99);
  const { chara_info_name_edit } = load(fixture);
  await chara_info_name_edit(3, 1);
  assert.notEqual(fixture.store.get('cstr:3:60'), undefined, ':82 已调用');
});
