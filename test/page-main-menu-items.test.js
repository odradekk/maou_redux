/**
 * ere/page/page-main-menu.js 的主菜单项表（issue #866：绘制与分发同源）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点，issue #16）。
 *
 * 本文件只钉两件事，各入口的画面与状态仍归 test/page-main-menu.test.js 与
 * test/page-shop.test.js（本票不改它们一行）：
 *   1. 菜单项编号与排列顺序就是玩家记熟的快捷键与面板版式，不因重排而变；
 *   2. 可用性条件在表里只有一份：enabled() 为假时指令面板画灰色 [---] 占位、
 *      分发也不认这个编号；改掉表里的条件，绘制与分发一起跟着变。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

// 一套夹具 + 它装载出来的主菜单模块（模块表按夹具隔离，改动只影响本套）
function menu_modules() {
  const fixture = create_era_fixture();
  return { fixture, menu: fixture.load_module('page/page-main-menu') };
}

// 按编号取按钮记录（rendered = 引擎实际显示的文本）
function button_of(fixture, accelerator) {
  return fixture.lines.find(
    (line) => line.type === 'button' && line.accelerator === accelerator,
  );
}

// 指令面板项（place 省略即指令面板）
function command_items(menu) {
  return menu.MAIN_MENU_ITEMS.filter(
    (item) => (item.place ?? 'command') === 'command',
  );
}

// 表里声明的可用性（enabled 省略 = 恒可用）
function is_enabled(item) {
  return item.enabled ? item.enabled() : true;
}

test('菜单项编号与表序：玩家记熟的快捷键与面板版式不因重排而变', () => {
  const { menu } = menu_modules();
  const ids = menu.MAIN_MENU_ITEMS.map((item) => item.id);
  assert.deepEqual(
    ids,
    [
      // 第一行：调教目标 / 助手
      496, 497,
      // 第二行：四个信息面板切换钮
      500, 501, 504, 505,
      // 指令面板：每行 3 列，表序即绘制序
      100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 120, 199, 200,
      300, 777, 888,
      // 名字按钮：分发已通、按钮随角色数据工单画
      498, 499,
    ],
    '编号是玩家记熟的按键，顺序是面板版式——重排会让玩家记住的数字失灵',
  );
  assert.equal(
    new Set(ids).size,
    ids.length,
    '同一编号不得在表里出现两次（分发按编号找项，重号会让后者不可达）',
  );
});

test('绘制按表的可用性走：空档世界里不可用项占位、可用项成按钮、表外编号不分发', async () => {
  const { fixture, menu } = menu_modules();
  menu.draw_main_menu();

  const disabled = command_items(menu).filter((item) => !is_enabled(item));
  // 空档世界（A == 0、无角色、无魔界知识、设施未解锁）的不可用项
  assert.deepEqual(
    disabled.map((item) => item.id),
    [100, 101, 103, 104, 106, 108, 110, 111],
  );
  for (const item of disabled) {
    assert.equal(
      button_of(fixture, item.id),
      undefined,
      `[${item.id}] 不可用时不画可点按钮`,
    );
    assert.equal(
      await menu.dispatch_menu_item(item.id),
      undefined,
      `[${item.id}] 不可用时分发落空（条件与绘制同源）`,
    );
  }
  for (const item of command_items(menu).filter(is_enabled)) {
    assert.ok(button_of(fixture, item.id), `[${item.id}] 可用时必须画成按钮`);
  }

  // 每个不可用项恰占一格灰色 [---]：各列不因可用性漂移
  const placeholders = fixture.lines.filter(
    (line) => line.type === 'text' && line.text === '[---]',
  );
  assert.equal(placeholders.length, disabled.length);
  assert.ok(placeholders.every((line) => line.color === '#bbbbbb'));

  // 表外编号（店内的 997-999、调试入口 7788、已删的 400/999）不属于主菜单
  for (const stray of [400, 997, 998, 999, 520, 7788]) {
    assert.equal(
      await menu.dispatch_menu_item(stray),
      undefined,
      `[${stray}] 不在菜单项表里，主菜单分发不得认它`,
    );
  }
});

test('调教目标/助手：A == 0 时仍画成调暗的按钮，分发落空（与改动前一致）', async () => {
  const { fixture, menu } = menu_modules();
  menu.draw_main_menu();

  for (const id of [496, 497]) {
    const button = button_of(fixture, id);
    assert.ok(button, `[${id}] 是常显入口，A == 0 时照样画得出来`);
    assert.equal(button.color, '#bbbbbb', '未选中调暗');
    assert.equal(
      await menu.dispatch_menu_item(id),
      undefined,
      'A == 0 时点了没反应——这一行为与改动前一致',
    );
  }
});

test('可用性只有表里一份：改掉表里的 enabled，绘制与分发一起跟着变', async () => {
  // 条件成立：魔界知识在 → [110] 画成按钮
  const allowed = menu_modules();
  allowed.fixture.store.set('talent:0:325', 1);
  allowed.menu.draw_main_menu();
  assert.ok(button_of(allowed.fixture, 110), '条件成立时 [110] 是按钮');

  // 只改表这一处：绘制侧立刻不再画它，分发侧也同时落空——没有第二份写死的条件
  const blocked = menu_modules();
  blocked.fixture.store.set('talent:0:325', 1);
  const labo_item = blocked.menu.MAIN_MENU_ITEMS.find(
    (item) => item.id === 110,
  );
  labo_item.enabled = () => false;
  blocked.menu.draw_main_menu();
  assert.equal(
    button_of(blocked.fixture, 110),
    undefined,
    '绘制侧跟着表变（若绘制另有一份条件，这里仍是按钮）',
  );
  assert.equal(
    await blocked.menu.dispatch_menu_item(110),
    undefined,
    '分发侧跟着表变',
  );
});

test('[102] 的动态正文：FLAG:502 == 0 印「地下城」，非 0 印「场子」', () => {
  // 正文是表里的 label 函数（2D 模式设定一问随 #181 H12，当前恒 0）
  const normal = menu_modules();
  normal.menu.draw_main_menu();
  assert.equal(button_of(normal.fixture, 102).rendered, '[102] 地下城');

  const mode_2d = menu_modules();
  mode_2d.fixture.store.set('flag:502', 1);
  mode_2d.menu.draw_main_menu();
  assert.equal(button_of(mode_2d.fixture, 102).rendered, '[102] 场子');
});

test('分发到各自的处理函数：107 / 199 / 777 / 110 各走各的（不串到邻项）', async () => {
  // 107 购物：只置 BOUGHT，不画屏、不转场
  const cart = menu_modules();
  assert.equal(await cart.menu.dispatch_menu_item(107), undefined);
  assert.equal(
    cart.fixture.load_module('era-utils/era-flag').bought,
    1,
    '[107] 必须置 BOUGHT = 1（show_shop 据此跳道具商店）',
  );

  // 199 休息：税金 +5 与 TURNEND 转场
  const rest = menu_modules();
  rest.fixture.store.set('flag:9', 10);
  assert.equal(
    await rest.menu.dispatch_menu_item(199),
    'TURNEND',
    '[199] 必须以 TURNEND 转场（转场目标才上抛，普通返回值留在分发层）',
  );
  assert.equal(rest.fixture.store.get('flag:9'), 15);

  // 777 设定：进 config_menu（列表里有「过滤」按钮）
  const config = menu_modules();
  config.fixture.set_inputs(100); // config_menu 自身的 [100] 返回
  await config.menu.dispatch_menu_item(777);
  assert.ok(
    config.fixture.lines_history.some(
      (line) => line.type === 'button' && line.text.includes('过滤'),
    ),
    '[777] 必须进设定界面，而不是别的入口',
  );

  // 110 实验室：进 secret_labo（首行「魔界的大门」）
  const labo = menu_modules();
  labo.fixture.store.set('talent:0:325', 1);
  labo.fixture.set_inputs(999); // 实验室自身的退出键
  await labo.menu.dispatch_menu_item(110);
  assert.ok(
    labo.fixture.lines_history.some(
      (line) => line.type === 'text' && line.text.includes('魔界的大门'),
    ),
    '[110] 必须进实验室，而不是别的入口',
  );
});
