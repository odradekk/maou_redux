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

/**
 * 染灰断言只能落在 setColor 调用序列上。夹具记录这条调用，但**不把颜色
 * 带进按钮**（data/research/fixture-engine-gap.md 的观察面限制）；
 * `button.color` 只反映显式传的 `config.color`，本模块从不传，于是
 * `assert.equal(button.color, undefined)` 对任何输入都成立——那是一句
 * 验不出东西的断言（#384 返工整改）。
 */
function color_calls(fixture) {
  return fixture.calls
    .filter((call) => call.api === 'setColor')
    .map((call) => call.args[0]);
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
  assert.deepEqual(
    color_calls(fixture),
    [''],
    '可改名时不染灰（只有 :29 RESETCOLOR 的那一次空参）',
  );
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
    // 夹具只记录 setColor 调用、不模拟「后续输出被染」的状态（见 color_calls
    // 的注释），故断言的是这对调用的次序。
    assert.deepEqual(
      color_calls(fixture),
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
    buttons(fixture)[0].rendered,
    '[0] 改名 ',
    ':16-18 魔王走 ELSEIF LOCAL == 1（按钮照渲染）',
  );
  assert.deepEqual(
    color_calls(fixture),
    [''],
    ':16-18 的魔王档不进 :19-22 的染灰支——拆掉 `able !== KING` 这一半会红',
  );
});

// —— @CHARA_INFO_NAME_EDIT（:53-109）——

test('chara_info_name_edit：魔王档（返回值 1）不走不可改名支，照常进改名循环', async () => {
  // :61 的判据是 `LOCAL != 0 && LOCAL != 1`——魔王是**例外**，改名照做
  // （按钮那侧 :16-18 只是不染灰）。拆掉 `&& able !== NAME_EDIT_KING`
  // 这一半时，魔王会被当成不可改名：既没有「的新名字是？」也没有落名。
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '魔王');
  fixture.set_inputs('新魔王名');
  const { chara_info_name_edit } = load(fixture);

  assert.equal(await chara_info_name_edit(0), 0);
  assert(
    texts(fixture).includes('魔王的新名字是？'),
    ':89 的输入循环入口（魔王档不该被 :61 挡下）',
  );
  assert.equal(fixture.store.get('callname:0:-2'), '新魔王名', ':99 落名');
});

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

test('chara_info_name_edit：输入 0 走原作的零长分支（#567：0 视为空输入，名字不变更）', async () => {
  // 引擎把回传值按 getNumber 归一（夹具同款）：空输入与字面量 "0" 到手都是
  // 数值 0。#567 的裁定——原作有「不输入」分支的自由文本输入一律按 B 处理：
  // 0 视为空输入、走原作 :100-101「名字没有变更」支。代价是玩家不能把名字
  // 设成字面量「0」（有意取舍，判据与依据见 ere/utils/input-text.js）。
  const fixture = create_era_fixture();
  add_chara(fixture, 3, '旧名');
  fixture.store.set('cflag:3:1', 0);
  fixture.set_inputs(0);
  const { chara_info_name_edit } = load(fixture);

  assert.equal(await chara_info_name_edit(3), 0);
  assert(
    texts(fixture).includes('旧名的名字没有变更。'),
    ':101 的播报（空输入支）',
  );
  assert.equal(fixture.store.get('callname:3:-1'), '旧名', '姓名键不动');
  assert.equal(fixture.store.get('callname:3:-2'), '旧名', '称呼键不动');
});

test('chara_info_name_edit：零长输入落「名字没有变更」支（:100-101，不写任何键）', async () => {
  // :92 SELECTCASE STRLENS(LOCALS) 的 CASEELSE。归一路径见上一条（引擎归一
  // 后的 0），本例补的是「压根没有回传值」的缺值形态：`Number(undefined)`
  // = NaN → 原样回传，真机上渲染层拦住空提交、不会出现，夹具留作形态覆盖，
  // 移植侧以 `undefined/null → ''` 承接（utils/input-text.js）。没有这条
  // 用例时，`strlens(input) > 0` 这半个判据（落地 vs 不动）无人守。
  const fixture = create_era_fixture();
  add_chara(fixture, 3, '旧名');
  fixture.store.set('cflag:3:1', 0);
  fixture.set_inputs(undefined);
  const { chara_info_name_edit } = load(fixture);

  assert.equal(await chara_info_name_edit(3), 0);
  assert(
    texts(fixture).includes('旧名的名字没有变更。'),
    ':101 的播报（走 ELSE 支而非落地支）',
  );
  assert.equal(fixture.store.get('callname:3:-1'), '旧名', '姓名键不动');
  assert.equal(fixture.store.get('callname:3:-2'), '旧名', '称呼键不动');
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
