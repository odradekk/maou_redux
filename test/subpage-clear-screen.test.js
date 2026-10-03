'use strict';

/**
 * @file 子页面换屏（#724 / ADR-0009「每一屏开始前整屏清空」）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一注入点，issue #16）。
 * 每个接入换屏的子页面共用同一套断言面：
 *   1. 连续操作若干次，每轮菜单绘制完（era.input 被调用时）的屏幕行数
 *      不随次数增长——追加绘制会把上一轮的整份菜单叠在新菜单上方；
 *   2. unread_output_clears 为空——被换屏清掉的行里没有未经按键确认的
 *      输出（#721 的夹具检查）。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

/**
 * 记录每次 era.input 被调用时的屏幕行数：此刻本屏的菜单刚画完、正等玩家
 * 选择，正是「每轮绘制完的屏幕行数」的采样点。
 */
function track_input_rows(fixture) {
  const rows = [];
  const original = fixture.era.input;
  fixture.era.input = async (...args) => {
    rows.push(fixture.era.getLineCount());
    return original.apply(fixture.era, args);
  };
  return rows;
}

/**
 * 行数有界：各轮菜单行数之差不超过固定小界。条件行（按状态出现的按钮）
 * 允许小波动；换屏失效时每轮追加整份菜单，远超任何小界。
 */
function assert_rows_bounded(rows, label, spread = 0) {
  assert.ok(rows.length >= 2, `${label}：至少要采样两轮菜单`);
  assert.ok(
    Math.max(...rows) - Math.min(...rows) <= spread,
    `${label}：各轮菜单行数之差应在 ±${spread} 内，实测 ${rows.join(', ')}`,
  );
}

/** 标记行的行号必须落在屏顶：换屏把行号归零，叠加绘制会把上一屏垫在下面 */
function assert_screen_top(fixture, marker, label, max_row = 8) {
  const hits = fixture.lines_history.filter((l) =>
    (l.text ?? '').includes(marker),
  );
  assert.ok(
    hits.length >= 1,
    label + '：标记行「' + marker + '」应至少出现一次',
  );
  for (const l of hits) {
    assert.ok(
      l.row <= max_row,
      label +
        '：标记行应在屏顶（第 0-' +
        max_row +
        ' 行），实测第 ' +
        l.row +
        ' 行——上一屏没被换屏清掉',
    );
  }
}

function assert_no_unread(fixture, label) {
  assert.deepEqual(
    fixture.unread_output_clears,
    [],
    `${label}：整屏清空抹掉了未读输出（ADR-0009：换屏前的输出先经按键确认）`,
  );
}

// —— 玩家设定（page-config.js / page-config-age.js）——

test('设定页换屏：config_menu 连续切换开关，各轮菜单行数相同（#724）', async () => {
  const fixture = create_era_fixture();
  const rows = track_input_rows(fixture);
  const { config_menu } = fixture.load_module('page/page-config');

  // 切换 [0] 再切回：三轮画的是同一页（page 0）的同构菜单
  fixture.set_inputs(0, 0, 100);
  await config_menu();

  assert_rows_bounded(rows, 'config_menu');
  assert_no_unread(fixture, 'config_menu');
});

test('设定页换屏：过滤开关子菜单连续切换，各轮菜单行数相同（#724）', async () => {
  const fixture = create_era_fixture();
  const rows = track_input_rows(fixture);
  const { config_filter_setting } = fixture.load_module('page/page-config');

  fixture.set_inputs(0, 2, 100);
  await config_filter_setting();

  assert_rows_bounded(rows, 'config_filter_setting');
  assert_no_unread(fixture, 'config_filter_setting');
});

test('设定页换屏：年龄设定连续切换，各轮菜单行数相同（#724）', async () => {
  const fixture = create_era_fixture();
  const rows = track_input_rows(fixture);
  const { config_age_setting } = fixture.load_module('page/page-config-age');

  fixture.set_inputs(0, 0, 100);
  await config_age_setting();

  assert_rows_bounded(rows, 'config_age_setting');
  assert_no_unread(fixture, 'config_age_setting');
});

test('设定页换屏：种族年龄表与档位编辑器各自每轮整屏重画（#724）', async () => {
  const fixture = create_era_fixture();
  const rows = track_input_rows(fixture);
  const { race_config } = fixture.load_module('page/page-config-age');

  // 表 [0] 进编辑器 → 编辑器 [100] 返回 → 表 [0] 再进 → 编辑器 [100] 返回
  // → 表 [100] 退出：表三轮、编辑器两轮，两组各自同构
  fixture.set_inputs(0, 100, 0, 100, 100);
  await race_config();

  assert.equal(rows.length, 5, '应采样三轮表 + 两轮编辑器');
  assert_rows_bounded([rows[0], rows[2], rows[4]], 'race_config 表');
  assert_rows_bounded([rows[1], rows[3]], 'race_config 编辑器');
  assert_screen_top(fixture, '■ 种族 [', 'race_config 编辑器');
  assert_no_unread(fixture, 'race_config');
});

// —— 迷宫概况（page-dungeon-info2.js）——

test('迷宫概况换屏：选择位图反复切换，各轮主屏行数相同（#724）', async () => {
  const fixture = create_era_fixture();
  const rows = track_input_rows(fixture);
  const { dungeon_info2 } = fixture.load_module('page/page-dungeon-info2');

  // 同一标签页内反复切换行/全列选择：主屏每轮重画
  fixture.set_inputs(110, 200, 110, 999);
  await dungeon_info2();

  assert_rows_bounded(rows, 'dungeon_info2');
  assert_no_unread(fixture, 'dungeon_info2');
});

test('迷宫概况换屏：部下总览每轮重画，主屏与总览屏各自行数相同（#724）', async () => {
  const fixture = create_era_fixture();
  const rows = track_input_rows(fixture);
  const { dungeon_info2 } = fixture.load_module('page/page-dungeon-info2');

  // [10] 进部下总览 → 总览 [999] 返回 → 再进一次 → 返回 → 主屏退出。
  // 采样序列：主屏、总览、主屏、总览、主屏
  fixture.set_inputs(10, 999, 10, 999, 999);
  await dungeon_info2();

  assert.equal(rows.length, 5, '应采样三轮主屏 + 两轮部下总览');
  assert_rows_bounded([rows[0], rows[2], rows[4]], 'dungeon_info2 主屏');
  assert_rows_bounded([rows[1], rows[3]], 'print_subordinates 总览屏');
  assert_screen_top(fixture, '地下城内的部下', '部下总览屏', 4);
  assert_no_unread(fixture, 'dungeon_info2 部下总览');
});

// —— 指令登录（com-register.js）——

test('指令登录换屏：连续登记多条，各轮菜单行数不增长（#724）', async () => {
  const fixture = create_era_fixture();
  // tflag（204/224）是调教期表，先开火车表（同 test/com-register.test.js）
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  fixture.seed_chara(31, { id: 31, name: '温妮', callname: '温妮' });
  fixture.era.addCharacter(31);
  fixture.era.beginTrain(0, 31);
  fixture.store.set('traincommandname:0', '爱抚');
  fixture.store.set('traincommandname:6', '接吻');
  const rows = track_input_rows(fixture);
  const { comseq_register } = fixture.load_module('system/train/com-register');

  // 登记一条 → 重置菜单 → 再登记一条 → 再重置：奇数轮（0 条）与
  // 偶数轮（1 条）各自同构。菜单内容本身随登记条数增长（已登录指令
  // 逐条成行），所以用「重置」把画面拉回同构状态比对——追加绘制时
  // 第 3 轮会叠着第 1、2 轮的整份菜单，行数远超第 1 轮
  fixture.set_inputs(0, 998, 0, 998, 1000);
  await comseq_register();

  assert.equal(rows.length, 5);
  assert_rows_bounded(
    [rows[0], rows[2], rows[4]],
    'comseq_register（重置后的 0 条屏）',
  );
  assert_rows_bounded([rows[1], rows[3]], 'comseq_register（登记一条后的屏）');
  assert_no_unread(fixture, 'comseq_register');
});

// —— 商店族（道具/陷阱商店 page-item-shop.js·page-shop-trap.js）——

/** 可购买世界的最小播种（在售位、名字、价格、商品序号面，同 test/item-shop.test.js；进店先经主菜单 [107]——EVENTSHOP 会把 BOUGHT 重置回 -1） */
function seed_item_shop(fixture) {
  const seed = {
    'flag:10004': 10000, // MONEY
    'itemname:0': '振动宝石',
    'itemprice:0': 200,
    'itemname:24': '安全套',
    'itemprice:24': 100,
    'itemname:53': '【经验值】',
    'itemprice:53': 1000,
    'itemname:55': '【陷阱等级】',
    'itemprice:55': 5000,
    'itemname:91': '装饰的戒指',
    'itemprice:91': 100,
    'itemname:60': '落穴',
    'itemsales:0': 1,
    'itemsales:24': 1,
    'itemsales:53': 1,
    'itemsales:55': 1,
    'itemsales:91': 1,
    'itemsales:60': 1,
    itemkeys: [0, 24, 53, 55, 60, 91],
  };
  for (const [name, value] of Object.entries(seed)) {
    fixture.store.set(name, value);
  }
  fixture.load_module('era-utils/era-flag').bought = -1;
}

test('道具商店换屏：连续两轮购买取消，各轮商品屏与数量屏行数相同（#724）', async () => {
  const fixture = create_era_fixture();
  seed_item_shop(fixture);
  const rows = track_input_rows(fixture);
  const { run_shop } = fixture.load_module('page/page-shop');

  // 主菜单 [107] 进店 → [24] 买安全套（复数购买）→ [0] 数量取消（无声退回）
  // → 下一轮重画商品屏；再来一遍后 [999] 退出回到主菜单
  fixture.set_inputs(107, 24, 0, 24, 0, 999);
  await assert.rejects(() => run_shop(), /预置输入已耗尽/);

  // 采样序列：主菜单、商品屏、数量屏、商品屏、数量屏、商品屏（[999]）、主菜单；
  // 输入耗尽的那次调用也采样（最后一行＝主菜单重画）
  assert.equal(rows.length, 7);
  assert_rows_bounded([rows[1], rows[3], rows[5]], 'item_shop 商品屏');
  assert_rows_bounded([rows[2], rows[4]], 'buy_plural 数量屏');
  assert_no_unread(fixture, '道具商店');
});

test('道具商店换屏：陷阱等级与戒指退还的尾段输出在换屏前先经按键确认（#724）', async () => {
  // 55 买一件 → 《购买了》等键 → 《陷阱上升到Lv1》→ 商品屏下一轮换屏
  {
    const fixture = create_era_fixture();
    seed_item_shop(fixture);
    fixture.store.set('cflag:0:9', 2); // 魔王等级（陷阱等级上限）
    const { event_buy } = fixture.load_module('page/page-item-shop');
    const { change_screen } = fixture.load_module(
      'page/components/screen-change',
    );
    fixture.set_inputs(1); // 数量选择：买一件
    await event_buy(55);
    // 商店轮的下一轮绘制（item_shop 的换屏）由这里显式代演
    await change_screen();
    assert(
      fixture.lines_history.some((l) =>
        (l.text ?? '').includes('陷阱上升到Lv1'),
      ),
      '55 的尾段文案应输出过',
    );
    assert_no_unread(fixture, '陷阱等级尾段');
  }
  // 91 买一件（戒指已 99）→ 《购买了》等键 → 《退还了多余的戒指》→ 换屏
  {
    const fixture = create_era_fixture();
    seed_item_shop(fixture);
    fixture.store.set('item:300', 99);
    const { event_buy } = fixture.load_module('page/page-item-shop');
    const { change_screen } = fixture.load_module(
      'page/components/screen-change',
    );
    fixture.set_inputs(1); // 数量选择：买一件
    await event_buy(91);
    // 商店轮的下一轮绘制（item_shop 的换屏）由这里显式代演
    await change_screen();
    assert(
      fixture.lines_history.some((l) => (l.text ?? '') === '退还了多余的戒指'),
      '91 的退还文案应输出过',
    );
    assert_no_unread(fixture, '戒指退还尾段');
  }
});

test('经验值道具选人屏换屏：翻页与不可选提示后重画，行数不增长（#724）', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  // 20 人一页：25 个角色 → 两页，翻页轮与提示轮的行数各自同构
  for (let cid = 1; cid <= 25; cid += 1) {
    fixture.seed_chara(cid, {
      id: cid,
      name: `角色${cid}`,
      callname: `角${cid}`,
    });
    fixture.era.addCharacter(cid);
  }
  fixture.store.set('cflag:5:1', 1); // 5 号非待命 → 「此人物尚不可选择」
  const rows = track_input_rows(fixture);
  const { use_exp_item } = fixture.load_module('page/page-item-shop');

  // 选 5（不可选 → 提示+等键 → 重画首页）→ 翻下一页 → 翻回首页 →
  // 再选 5（仍不可选）→ 选 6（成功，得到经验值）。选人屏没有退出键，
  // 出口就是选中一名可用角色。采样：首页×2、次页、首页×2
  fixture.set_inputs(5, 1001, 1000, 5, 6);
  await use_exp_item(1);

  assert.equal(rows.length, 5);
  assert_rows_bounded(
    [rows[0], rows[1], rows[3], rows[4]],
    'use_exp_item 选人屏（首页）',
  );
  assert_screen_top(fixture, '要让谁使用', 'use_exp_item 选人屏');
  assert_no_unread(fixture, '经验值道具选人');
});

test('普通道具选人屏换屏：翻页空转轮重画且每屏从第 0 行画起（#724）', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  fixture.seed_chara(1, { id: 1, name: '奴隶甲', callname: '甲' });
  fixture.era.addCharacter(1);
  fixture.store.set('cflag:1:1', 0);
  fixture.store.set('flag:10004', 1000000);
  fixture.store.set('itemname:29', '兴奋剂');
  const rows = track_input_rows(fixture);
  const { use_item } = fixture.load_module('page/page-item-shop');

  // 选人屏 [1000] 上一页空转 ×2 → 选 1（使用后重画选人屏）→ [999] 取消退出
  fixture.set_inputs(1000, 1000, 1, 999);
  await use_item(29);

  assert_rows_bounded(rows, 'use_item 选人屏');
  assert_screen_top(fixture, '要让谁使用', 'use_item 选人屏');
  assert_no_unread(fixture, '普通道具选人');
});

test('陷阱商店换屏：连续两轮购买取消，各轮商品屏与数量屏行数相同（#724）', async () => {
  const fixture = create_era_fixture();
  seed_item_shop(fixture);
  fixture.store.set('itemname:60', '落穴');
  fixture.store.set('itemprice:60', 500);
  const rows = track_input_rows(fixture);
  const { run_shop } = fixture.load_module('page/page-shop');

  // 主菜单 [107] 进道具商店 → 店内 [998] 切陷阱商店并立即重画 → [60] 落穴
  //（复数购买）→ [0] 数量取消 → 重画；再一遍后 [999] 退出
  fixture.set_inputs(107, 998, 60, 0, 60, 0, 999);
  await assert.rejects(() => run_shop(), /预置输入已耗尽/);

  // 采样序列：主菜单（[107]）、道具屏（[998] 切店后由循环重画）、陷阱屏、
  // 数量屏、陷阱屏、数量屏、陷阱屏（[999]）、主菜单（输入耗尽的那次也采样）
  assert.equal(rows.length, 8);
  assert_rows_bounded([rows[2], rows[4], rows[6]], 'item_shop_trap 商品屏');
  assert_rows_bounded([rows[3], rows[5]], '陷阱数量屏');
  assert_no_unread(fixture, '陷阱商店');
});

// —— 怪物商店（page-monster-shop.js）——

/** 怪物商店世界（同 test/monster-shop.test.js 的 monster_world） */
function seed_monster_shop(fixture, seed = {}) {
  const base = {
    'flag:10000': 0,
    'flag:10003': 0,
    'flag:10004': 10000,
    itemkeys: [],
    'itemprice:202': 15,
    'itemname:202': '精英狗头人',
    'itemname:101': '狗头人',
    'chara:202': { talent: { 319: 1 } },
  };
  for (const [name, value] of Object.entries({ ...base, ...seed })) {
    fixture.store.set(name, value);
  }
  fixture.seed_chara(202, { id: 202, name: '精英狗头人' });
  fixture.load_module('era-utils/era-flag').bought = -1;
}

test('怪物商店换屏：种族屏与商品屏反复重画，行数不增长（#724）', async () => {
  const fixture = create_era_fixture();
  seed_monster_shop(fixture); // 无祭品库存 → buy_follower 早退
  const rows = track_input_rows(fixture);
  const { monster_shop } = fixture.load_module('page/page-monster-shop');

  // 进店 [1] → 性别 [1] → 种族 [1] → 商品 [202] → 祭品不足（等键）回商品屏
  // ×2 → [999] 返回种族屏 → [999] 退出
  const rand0 = () => 0;
  fixture.set_inputs(1, 1, 1, 202, 202, 202, 999, 999);
  await monster_shop(rand0);

  // 采样序列：入口、性别、种族、商品×4（三次 202 与一次 999）、种族（退出）
  assert.equal(rows.length, 8);
  assert_rows_bounded(
    [rows[3], rows[4], rows[5], rows[6]],
    'select_follower 商品屏',
  );
  assert_rows_bounded([rows[2], rows[7]], 'monster_shop 种族屏');
  assert_no_unread(fixture, '怪物商店种族/商品屏');
});

test('怪物商店换屏：祭品屏与召唤确认屏反复重画，行数不增长（#724）', async () => {
  const fixture = create_era_fixture();
  // 狗头人（101）三只、等级 5：凑满 202 号的 15 级祭品
  seed_monster_shop(fixture, { 'item:101': 3 });
  const rows = track_input_rows(fixture);
  const { monster_shop } = fixture.load_module('page/page-monster-shop');

  // 进店 → 性别 → 种族 → 商品 202 → 挑祭品 101×3 → 确认召唤 [0] →
  // 召唤确认 [1] 再换一个 ×2 → [0] 接纳
  const rand0 = () => 0;
  fixture.set_inputs(1, 1, 1, 202, 101, 101, 101, 0, 1, 1, 0);
  await monster_shop(rand0);

  // rows[4..6] 是三次祭品挑选屏（首屏与后续屏差 1 行：已选列从 0 起
  // 变化前的首拍版式；追加绘制会每轮整屏叠加，远超此界），
  // rows[8..10] 是三次召唤确认屏（每次换人后整卡重画）
  assert_rows_bounded([rows[4], rows[5], rows[6]], 'buy_follower 祭品屏', 1);
  assert_rows_bounded([rows[8], rows[9], rows[10]], '召唤确认屏');
  assert_no_unread(fixture, '怪物商店祭品/召唤屏');
});

// —— 奴隶贩卖（system/stronghold/sale.js）——

test('奴隶贩卖换屏：无效输入与返回后重画，列表屏行数不增长（#724）', async () => {
  const fixture = create_era_fixture();
  const { join_slave_chara } = require('./helpers/chara');
  join_slave_chara(fixture, 0, '你');
  join_slave_chara(fixture, 31, '温妮');
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.money = 100;
  era_flag.bought = -1;
  const rows = track_input_rows(fixture);
  const { chara_sale } = fixture.load_module('system/stronghold/sale');

  // input 不走白名单（useRule:false）：500 非角色号 → 落空重画 ×2 → 999 返回
  fixture.set_inputs(500, 500, 999);
  await chara_sale({ rand: () => 0 });

  assert_rows_bounded(rows, 'chara_sale 列表屏');
  assert_no_unread(fixture, '奴隶贩卖');
});

test('奴隶贩卖换屏：成交后的威望值播报在换屏前先经按键确认（#724）', async () => {
  const fixture = create_era_fixture();
  const { join_slave_chara } = require('./helpers/chara');
  join_slave_chara(fixture, 0, '你');
  join_slave_chara(fixture, 31, '温妮');
  fixture.era.beginTrain(0, 31);
  fixture.store.set('abl:31:0', 3);
  fixture.store.set('abl:31:10', 5);
  fixture.store.set('abl:31:11', 4);
  fixture.store.set('cflag:31:0', 2); // 可出售
  fixture.store.set('base:31:0', 100); // 有体力（非临死）
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.money = 100;
  era_flag.bought = -1;
  const { chara_sale } = fixture.load_module('system/stronghold/sale');

  // 选 31 → 确认 [0] 成交（威望值播报）→ 回列表屏换屏 → [999] 返回
  fixture.set_inputs(31, 0, 999);
  await chara_sale({ rand: () => 0 });

  assert(
    fixture.lines_history.some((l) => (l.text ?? '').includes('威望值')),
    '成交的威望值播报应输出过',
  );
  assert_no_unread(fixture, '奴隶贩卖成交');
});

// —— 角色名册与角色页（page-chara-info.js / page-chara-info-show.js）——

test('角色名册换屏：翻页越界轮重画，各轮列表屏行数相同（#724）', async () => {
  const fixture = create_era_fixture();
  const { join_slave_chara } = require('./helpers/chara');
  join_slave_chara(fixture, 0, '你');
  join_slave_chara(fixture, 17, '玛奥');
  const rows = track_input_rows(fixture);
  const { chara_info } = fixture.load_module('page/page-chara-info');

  // 只有一页：[998] 下一页是空转（页码不动、整屏重画）×2 后 [999] 返回
  fixture.set_inputs(998, 998, 999);
  await chara_info();

  assert_rows_bounded(rows, 'chara_info 名册屏');
  assert_no_unread(fixture, '角色名册');
});

test('角色页换屏：前后翻子页往返，同子页的屏行数相同（#724）', async () => {
  const fixture = create_era_fixture();
  const { join_slave_chara } = require('./helpers/chara');
  join_slave_chara(fixture, 0, '你');
  join_slave_chara(fixture, 17, '玛奥');
  const rows = track_input_rows(fixture);
  const { chara_info_individual } = fixture.load_module('page/page-chara-info');

  // [102] 后页 → [101] 前页（回到同一子页）→ [100] 返回
  fixture.set_inputs(102, 101, 100);
  await chara_info_individual(17, [17]);

  assert.equal(rows.length, 3);
  assert.equal(
    rows[2],
    rows[0],
    `回到子页 0 的屏应与首轮同构（实测 ${rows.join(', ')}）`,
  );
  assert_no_unread(fixture, '角色页');
});

test('献祭名单换屏：切条件与返回后重画，各屏行数相同（#724）', async () => {
  const fixture = create_era_fixture();
  const { join_slave_chara } = require('./helpers/chara');
  join_slave_chara(fixture, 0, '你');
  join_slave_chara(fixture, 31, '温妮');
  fixture.store.set('cflag:31:1', 11); // 献祭完成态（完全召唤）
  const rows = track_input_rows(fixture);
  const { show_chara_info } = fixture.load_module('page/page-chara-info-show');

  // 出口轮 [10] 进名单 → 切条件 ×2（同条件重画）→ [999] 返回出口轮 →
  // [100] 返回首页
  fixture.set_inputs(10, 1000, 1000, 999, 100);
  await show_chara_info(31, 0);

  // 采样序列：出口、名单×3（两次切条件 + [999] 返回）、出口
  assert.equal(rows.length, 5);
  assert_rows_bounded([rows[0], rows[4]], '献祭出口屏');
  assert_rows_bounded([rows[1], rows[2], rows[3]], '献祭名单屏');
  assert_no_unread(fixture, '献祭名单');
});

test('献祭名单换屏：点勇者看的贡品信息页在重画前先经按键确认（#724）', async () => {
  const fixture = create_era_fixture();
  const { join_slave_chara } = require('./helpers/chara');
  join_slave_chara(fixture, 0, '你');
  join_slave_chara(fixture, 17, '勇者');
  join_slave_chara(fixture, 31, '温妮');
  fixture.store.set('cflag:31:1', 11); // 献祭完成态
  fixture.store.set('cflag:17:1', 2); // 17 号勇者（侵攻中）
  const { show_chara_info } = fixture.load_module('page/page-chara-info-show');

  // [10] 进名单 → 点 17（勇者 → 整屏贡品信息页）→ 重画名单 → [999] 返回
  fixture.set_inputs(10, 17, 999, 100);
  await show_chara_info(31, 0);

  // 贡品信息页（-2：素质/能力/经验/刻印/数据/外观）整屏输出没有收尾等键，
  // 点开勇者后补的等键必须真等过，重画名单才不吞未读
  const waited = fixture.waits.filter((w) => w.waited);
  assert.ok(
    waited.length >= 1,
    '点开勇者的贡品信息页后应补一次真等键再重画名单',
  );
  assert_no_unread(fixture, '献祭名单的贡品信息页');
});

// —— 能力值提升（page-ability-up.js）——

test('能力提升换屏：菜单翻页空转轮重画，各轮行数相同（#724）', async () => {
  const fixture = create_era_fixture();
  const { join_slave_chara } = require('./helpers/chara');
  join_slave_chara(fixture, 0, '你');
  const rows = track_input_rows(fixture);
  const { ability_up } = fixture.load_module('page/page-ability-up');

  // 名单一页：[1001] 下一页空转 ×2 后 [999] 退出
  fixture.set_inputs(1001, 1001, 999);
  await ability_up();

  assert_rows_bounded(rows, 'ability_up 菜单屏');
  assert_no_unread(fixture, '能力提升菜单');
});

test('能力提升换屏：单角色循环里被拒的能力分支后重画，行数相同（#724）', async () => {
  const fixture = create_era_fixture();
  const { join_slave_chara } = require('./helpers/chara');
  join_slave_chara(fixture, 0, '你');
  fixture.era.beginTrain(0, 0); // ablup 的判定走调教期表
  const rows = track_input_rows(fixture);
  const { ability_up_core } = fixture.load_module('page/page-ability-up');

  // 新档没有宝珠：[0] 阴蒂感觉走阻断支（printAndWait 确认）回重画 ×2，
  // 新档没有点数：[0] 阴蒂感觉进能力分支（宝珠不足的按钮行）→ [100] 停止
  // 返回重画 → [999] 退出（退出链的欲情/资格检查无输出，不多按键）
  fixture.set_inputs(0, 100, 999);
  await ability_up_core(0);

  assert_rows_bounded([rows[0], rows[2]], 'ability_up_core 状态屏');
  assert_no_unread(fixture, '能力提升单角色循环');
});

// —— 名册动作的收尾播报（改名 / 灵魂转移）——

test('名册动作收尾：改名播报在名册重画前先经按键确认（#724）', async () => {
  const fixture = create_era_fixture();
  const { join_slave_chara } = require('./helpers/chara');
  join_slave_chara(fixture, 0, '你');
  join_slave_chara(fixture, 17, '玛奥');
  const { chara_info_name_edit } = fixture.load_module('chara/chara-name-edit');
  const { change_screen } = fixture.load_module(
    'page/components/screen-change',
  );

  fixture.set_inputs('新名字');
  await chara_info_name_edit(17);
  // 名册循环的下一轮重画（chara_info_individual 的换屏）由这里显式代演
  await change_screen();

  assert(
    fixture.lines_history.some((l) => (l.text ?? '').includes('今后被称呼为')),
    '改名播报应输出过',
  );
  assert_no_unread(fixture, '改名收尾');
});

test('名册动作收尾：灵魂转移播报在名册重画前先经按键确认（#724）', async () => {
  const fixture = create_era_fixture();
  const { join_slave_chara } = require('./helpers/chara');
  join_slave_chara(fixture, 0, '你');
  join_slave_chara(fixture, 17, '玛奥');
  fixture.store.set('cflag:17:601', 0); // 走直接互换分支
  const { transfer_soul } = fixture.load_module('chara/chara-soul-transfer');
  const { change_screen } = fixture.load_module(
    'page/components/screen-change',
  );

  fixture.set_inputs(0); // 确认转移
  await transfer_soul(17, 0, () => 0);
  // 名册循环的下一轮重画（chara_info_individual 的换屏）由这里显式代演
  await change_screen();

  assert(
    fixture.lines_history.some((l) => (l.text ?? '').includes('陷入了')),
    '灵魂转移播报应输出过',
  );
  assert_no_unread(fixture, '灵魂转移收尾');
});

// —— 裁缝（page-tailor.js）——

test('裁缝换屏：成员列表空转翻页轮重画，行数相同（#724）', async () => {
  const fixture = create_era_fixture();
  const { join_slave_chara } = require('./helpers/chara');
  join_slave_chara(fixture, 0, '你');
  join_slave_chara(fixture, 1, '玛奥');
  fixture.store.set('base:1:0', 1);
  fixture.store.set('cflag:1:1', 0);
  fixture.store.set('flag:10004', 5000);
  const rows = track_input_rows(fixture);
  const { tailor_main } = fixture.load_module('page/page-tailor');

  // 成员 [1] → 子菜单 [999] 返回 → 成员列表重画，两轮往返后退出
  fixture.set_inputs(1, 999, 1, 999, 999);
  await tailor_main();

  assert_rows_bounded([rows[0], rows[2], rows[4]], 'tailor_main 成员列表屏');
  assert_no_unread(fixture, '裁缝成员列表');
});

test('裁缝换屏：主菜单反复进出后同构（换装铺往返，#724）', async () => {
  const fixture = create_era_fixture();
  const { join_slave_chara } = require('./helpers/chara');
  join_slave_chara(fixture, 0, '你');
  join_slave_chara(fixture, 1, '玛奥');
  fixture.store.set('base:1:0', 1);
  fixture.store.set('cflag:1:1', 0);
  fixture.store.set('abl:1:10', 99);
  fixture.store.set('flag:10004', 10000000);
  fixture.store.set('exflag:4444', 10000000);
  const rows = track_input_rows(fixture);
  const { tailor_core } = fixture.load_module('page/page-tailor');

  // 主菜单 → 日常着装（钱不够 print_wait 回主菜单）→ 主菜单 → 退出
  fixture.set_inputs(0, 999, 999);
  await tailor_core(1);

  assert_rows_bounded([rows[0], rows[2]], 'tailor_core 主菜单屏');
  assert_no_unread(fixture, '裁缝主菜单');
});

// —— 实验室（page-shop-labo.js）——

test('实验室换屏：主菜单翻页空转轮重画，行数相同（#724）', async () => {
  const fixture = create_era_fixture();
  fixture.load_module('era-utils/era-flag').money = 1000000;
  const rows = track_input_rows(fixture);
  const { secret_labo } = fixture.load_module('page/page-shop-labo');

  // [2] 母乳体质化 → 选人屏 [999] 取消回菜单 → 再来一遍 → [999] 退出
  fixture.set_inputs(2, 999, 2, 999, 999);
  await secret_labo(() => 0);

  assert_rows_bounded([rows[0], rows[2], rows[4]], 'secret_labo 主菜单屏');
  assert_no_unread(fixture, '实验室主菜单');
});

test('实验室换屏：选人屏翻页空转轮重画，行数相同（#724）', async () => {
  const fixture = create_era_fixture();
  const { join_slave_chara } = require('./helpers/chara');
  join_slave_chara(fixture, 0, '你');
  join_slave_chara(fixture, 1, '奴隶甲');
  fixture.load_module('era-utils/era-flag').money = 100000000;
  const rows = track_input_rows(fixture);
  const { modify_bonyu } = fixture.load_module('page/page-shop-labo');

  // 选人屏 [1000] 上一页空转 ×2 → [999] 取消
  fixture.set_inputs(1000, 1000, 999);
  await modify_bonyu(() => 0);

  assert_rows_bounded(rows, 'pick_slave 选人屏');
  assert_no_unread(fixture, '实验室选人屏');
});

// —— 调教目标与助手选择（page-select-target.js）——

test('调教目标选择换屏：翻页空转轮重画，行数相同（#724）', async () => {
  const fixture = create_era_fixture();
  const { join_slave_chara } = require('./helpers/chara');
  join_slave_chara(fixture, 0, '你');
  join_slave_chara(fixture, 1, '奴隶甲');
  fixture.store.set('cflag:1:1', 0);
  const rows = track_input_rows(fixture);
  const { select_target } = fixture.load_module('page/page-select-target');

  // 一页列表：[1000] 上一页空转 ×2 后 [999] 返回
  fixture.set_inputs(1000, 1000, 999);
  await select_target();

  assert_rows_bounded(rows, 'select_target 列表屏');
  assert_no_unread(fixture, '调教目标选择');
});

test('助手选择换屏：翻页空转轮重画，行数相同（#724）', async () => {
  const fixture = create_era_fixture();
  const { join_slave_chara } = require('./helpers/chara');
  join_slave_chara(fixture, 0, '你');
  join_slave_chara(fixture, 1, '奴隶甲');
  fixture.store.set('cflag:1:1', 0);
  fixture.store.set('cflag:1:0', 2); // 助手役
  const rows = track_input_rows(fixture);
  const { select_assi } = fixture.load_module('page/page-select-target');

  // 一页列表：[1000] 上一页空转 ×2 后 [999] 返回
  fixture.set_inputs(1000, 1000, 999);
  await select_assi();

  assert_rows_bounded(rows, 'select_assi 列表屏');
  assert_no_unread(fixture, '助手选择');
});

// —— 迎击（page-intercept.js）——

test('迎击换屏：列表屏翻页空转轮重画，行数相同（#724）', async () => {
  const fixture = create_era_fixture();
  const { join_slave_chara } = require('./helpers/chara');
  join_slave_chara(fixture, 0, '你');
  join_slave_chara(fixture, 1, '奴隶甲');
  fixture.store.set('base:1:0', 1);
  fixture.store.set('cflag:1:0', 1); // 可被卖（已驯服）
  const rows = track_input_rows(fixture);
  const { intercept } = fixture.load_module('page/page-intercept');

  // 一页列表：[1000] 上一页空转 ×2 后 [999] 返回
  fixture.set_inputs(1000, 1000, 999);
  await intercept(() => 0);

  assert_rows_bounded(rows, 'intercept 列表屏');
  assert_no_unread(fixture, '迎击列表屏');
});

test('迎击换屏：设定屏内反复进出阶层选择，行数不增长（#724）', async () => {
  const fixture = create_era_fixture();
  const { join_slave_chara } = require('./helpers/chara');
  join_slave_chara(fixture, 0, '你');
  join_slave_chara(fixture, 1, '奴隶甲');
  fixture.store.set('base:1:0', 1);
  fixture.store.set('cflag:1:0', 1);
  const rows = track_input_rows(fixture);
  const { intercept } = fixture.load_module('page/page-intercept');

  // 选 1 进设定 → [0] 进阶层选择（选 5 层返回）→ [999] 回列表 → 退出
  fixture.set_inputs(1, 0, 5, 999, 999);
  await intercept(() => 0);

  // 采样：列表、设定、阶层、设定、列表
  assert.equal(rows.length, 5);
  assert_rows_bounded([rows[1], rows[3]], '迎击设定屏');
  assert_no_unread(fixture, '迎击设定屏');
});

test('迎击等键：补给退款的播报在下一次换屏前先经按键确认（#724）', async () => {
  const fixture = create_era_fixture();
  const { join_slave_chara } = require('./helpers/chara');
  join_slave_chara(fixture, 0, '你');
  join_slave_chara(fixture, 1, '奴隶甲');
  fixture.store.set('base:1:0', 1);
  fixture.store.set('cflag:1:0', 1);
  fixture.store.set('flag:10004', 100000);
  const { intercept } = fixture.load_module('page/page-intercept');

  // 第一次：选人 → [2] 补给（三次抽奖全空）→ 退款播报 → 流程收尾；
  // rand 恒 0 保证一件都不入手
  fixture.set_inputs(1, 2, 998);
  await intercept(() => 0);
  // 再进一次迎击：列表屏换屏由入口执行——退款播报必须已经过确认
  fixture.set_inputs(999);
  await intercept(() => 0);

  assert_no_unread(fixture, '补给退款播报');
});

// —— 侵略（page-invasion.js）——

test('影像投放换屏：支付方式屏离开后菜单重画，行数相同（#724）', async () => {
  const fixture = create_era_fixture();
  fixture.load_module('era-utils/era-exflag').crystal_ball_stock = 3;
  fixture.load_module('era-utils/era-flag').money = 100000;
  const rows = track_input_rows(fixture);
  const { sengen_video } = fixture.load_module('page/page-invasion');

  // [3] 增强流行效果 → 支付方式屏 [999] 离开（无声）→ 菜单重画 ×2 后退出
  fixture.set_inputs(3, 999, 3, 999, 999);
  await sengen_video(() => 0);

  assert_rows_bounded([rows[0], rows[2], rows[4]], 'sengen_video 菜单屏');
  assert_no_unread(fixture, '影像投放菜单');
});

// —— 战役（page-campaign.js）——

test('战役菜单换屏：行动选择往返后菜单重画，行数相同（#724）', async () => {
  const fixture = create_era_fixture();
  const rows = track_input_rows(fixture);
  fixture.load_module('page/page-campaign-1'); // 注册战役集 1
  const { campaign_menu } = fixture.load_module('page/page-campaign');

  // [0] 行动选择 → 选战役屏 [999] 取消（不激活，头部无战役名）→ 回菜单，
  // 两轮往返后退出；激活后菜单头部会多一行战役名，故对比取「未激活」的同构轮
  fixture.set_inputs(0, 999, 0, 999, 999);
  await campaign_menu(() => 0);

  assert_rows_bounded([rows[2], rows[4]], 'campaign_menu 屏（带战役名）');
  assert_rows_bounded([rows[1], rows[3]], 'select_campaign 屏');
  assert_no_unread(fixture, '战役菜单');
});

// —— 角色编号互换（page-chara-number-swap.js）——

test('换号换屏：第一屏空转翻页与取消往返后重画，行数相同（#724）', async () => {
  const fixture = create_era_fixture();
  const { join_slave_chara } = require('./helpers/chara');
  join_slave_chara(fixture, 0, '你');
  join_slave_chara(fixture, 1, '甲');
  join_slave_chara(fixture, 2, '乙');
  const rows = track_input_rows(fixture);
  const { chara_number_swap } = fixture.load_module(
    'page/page-chara-number-swap',
  );

  // 第一屏选 1 → 第二屏 [3002] 取消回第一屏 → 再选 1 → 第二屏 [3002] → 第一屏 [1999]
  fixture.set_inputs(1, 3002, 1, 3002, 1999);
  await chara_number_swap();

  // 采样序列：第一屏、第二屏、第一屏、第二屏、第一屏
  assert.equal(rows.length, 5);
  assert_rows_bounded([rows[0], rows[2], rows[4]], '换号第一屏');
  assert_rows_bounded([rows[1], rows[3]], '换号第二屏');
  assert_screen_top(fixture, '要跟那个角色换号呢？', '换号第二屏', 4);
  assert_no_unread(fixture, '角色编号互换');
});

// —— 侵略要塞（invasion/invasion-arcana-fort.js）——

test('要塞勇者选择换屏：翻页空转轮重画，行数相同（#724）', async () => {
  const fixture = create_era_fixture();
  const { join_slave_chara } = require('./helpers/chara');
  join_slave_chara(fixture, 0, '你');
  join_slave_chara(fixture, 1, '勇者甲');
  fixture.store.set('cflag:1:0', 2); // 圣灵骑士在任
  fixture.store.set('cflag:1:1', 0); // 待命
  fixture.store.set('talent:1:85', 1); // 爱慕（出击条件）
  const rows = track_input_rows(fixture);
  const { arcana_fort } = fixture.load_module('invasion/invasion-arcana-fort');

  // 入口选门 [0] → 勇者选择 [1000] 上一页空转 ×2 → [999] 返回 → [4] 撤退
  fixture.set_inputs(0, 1000, 1000, 999, 4);
  await arcana_fort(() => 0);

  // 采样：门选择、勇者×3、门选择
  assert_rows_bounded([rows[1], rows[2], rows[3]], '要塞勇者选择屏');
  assert_no_unread(fixture, '要塞勇者选择');
});

// —— 裁缝各品类屏（tailor_core 的 0-3/7/8 分支，#724） ——

/** 裁缝测试世界：一个可调教的成员与充足的资金/勋章 */
function make_tailor_world(fixture) {
  const { join_slave_chara } = require('./helpers/chara');
  join_slave_chara(fixture, 0, '你');
  join_slave_chara(fixture, 1, '玛奥');
  fixture.store.set('base:1:0', 1);
  fixture.store.set('cflag:1:1', 0);
  fixture.store.set('abl:1:10', 99);
  fixture.store.set('flag:10004', 10000000);
  fixture.store.set('exflag:4444', 10000000);
}

/** 进某品类屏再取消、往返两轮：rows 里主菜单与品类屏交替出现 */
async function run_tailor_visit(fixture, entry, extra = []) {
  const rows = track_input_rows(fixture);
  const { tailor_core } = fixture.load_module('page/page-tailor');
  fixture.set_inputs(entry, ...extra, 999, entry, ...extra, 999, 999);
  await tailor_core(1);
  return rows;
}

test('裁缝换屏：日常着装屏往返重画，行数相同（#724）', async () => {
  const fixture = create_era_fixture();
  make_tailor_world(fixture);
  const rows = await run_tailor_visit(fixture, 0);
  assert_rows_bounded([rows[1], rows[3]], '日常着装屏');
  assert_screen_top(fixture, '□日常着装', '日常着装屏');
  assert_no_unread(fixture, '日常着装');
});

test('裁缝换屏：普通装备与黑市屏往返重画，行数相同（#724）', async () => {
  const fixture = create_era_fixture();
  make_tailor_world(fixture);
  // [1] 普通装备 → [996] 黑市 → [999] 取消（回主菜单），两轮
  const rows = await run_tailor_visit(fixture, 1, [996]);
  // rows：主菜单、普通、黑市、主菜单、普通、黑市、主菜单
  assert_rows_bounded([rows[1], rows[4]], '普通装备屏');
  assert_rows_bounded([rows[2], rows[5]], '黑市屏');
  assert_screen_top(fixture, '□普通的服装', '普通装备屏');
  assert_screen_top(fixture, '□黑市服装', '黑市屏');
  assert_no_unread(fixture, '普通装备与黑市');
});

test('裁缝换屏：配饰屏往返重画，行数相同（#724）', async () => {
  const fixture = create_era_fixture();
  make_tailor_world(fixture);
  const rows = await run_tailor_visit(fixture, 2);
  assert_rows_bounded([rows[1], rows[3]], '配饰屏');
  assert_screen_top(fixture, '□装备品 (', '配饰屏');
  assert_no_unread(fixture, '配饰');
});

test('裁缝换屏：装备品与戒指槽屏往返重画，行数相同（#724）', async () => {
  const fixture = create_era_fixture();
  make_tailor_world(fixture);
  // [7] 装备品 → 选槽 [1]（装饰 A）→ 戒指屏 [999] 取消 → 回装备品列表 → [999]，两轮
  const rows = await run_tailor_visit(fixture, 7, [1, 999]);
  // rows：主菜单、槽、戒指、装备品、主菜单、槽、戒指、装备品、主菜单
  assert_rows_bounded([rows[3], rows[7]], '装备品屏');
  assert_rows_bounded([rows[1], rows[5]], '装备品选槽屏');
  assert_rows_bounded([rows[2], rows[6]], '戒指槽屏');
  assert_screen_top(fixture, '装饰A', '装备品选槽屏');
  // 本测试世界没持有装备品，未开放行就是戒指屏的第一行
  assert_screen_top(fixture, '未开放（30级后才能装备强化）', '戒指槽屏', 2);
  assert_no_unread(fixture, '装备品与戒指槽');
});

test('裁缝换屏：武器装备屏往返重画，行数相同（#724）', async () => {
  const fixture = create_era_fixture();
  make_tailor_world(fixture);
  const rows = await run_tailor_visit(fixture, 8);
  assert_rows_bounded([rows[1], rows[3]], '武器装备屏');
  assert_screen_top(fixture, '- 剑', '武器装备屏');
  assert_no_unread(fixture, '武器装备');
});

// —— 侵略的征服后菜单与出兵路线（page-invasion.js，#724） ——

test('出兵菜单换屏：掠夺路线的勇者屏取消后回出兵菜单，行数相同（#724）', async () => {
  const fixture = create_era_fixture();
  const { join_slave_chara } = require('./helpers/chara');
  join_slave_chara(fixture, 0, '你');
  join_slave_chara(fixture, 1, '勇者甲');
  fixture.store.set('cflag:1:0', 2); // 已驯服（掠夺候选条件之一）
  fixture.store.set('cflag:1:1', 0);
  fixture.store.set('base:1:0', 1); // 体力 ≥ 1
  fixture.store.set('base:0:1', 10000);
  fixture.store.set('maxbase:0:1', 10000);
  fixture.store.set('exflag:99', 70);
  fixture.store.set('flag:81', 10000); // 已征服 → 经 [0] 进出兵菜单
  fixture.store.set('flag:82', 1);
  const rows = track_input_rows(fixture);
  const { invasion } = fixture.load_module('page/page-invasion');

  // 经 invasion() 外层循环：勇者屏 [999] 的 RESTART 由它接住、重画征服后菜单。
  // [0] 人间界 → 出兵菜单 [3] 掠夺 → 勇者屏 [1000] 翻页空转 → [999] 取消
  // →（人间界已征服）RESTART 回征服后菜单 → 再走一轮 → [999] 退出
  fixture.set_inputs(0, 3, 1000, 999, 0, 3, 1000, 999, 999);
  await invasion(() => 0);

  // rows（每次输入对应一屏）：征服后菜单、出兵菜单、勇者屏×2、征服后菜单、
  // 出兵菜单、勇者屏×2、征服后菜单
  assert_rows_bounded([rows[2], rows[3], rows[6], rows[7]], '掠夺勇者屏');
  assert_rows_bounded([rows[1], rows[5]], '出兵菜单屏');
  assert_screen_top(fixture, '你的怪物数量', '出兵菜单屏');
  assert_rows_bounded([rows[0], rows[4], rows[8]], '征服后菜单屏');
  assert_no_unread(fixture, '出兵菜单与勇者屏');
});

// —— 战役派遣子菜单（page-campaign.js，#724） ——

test('战役派遣换屏：子菜单返回后重画，行数相同（#724）', async () => {
  const fixture = create_era_fixture();
  const { join_slave_chara } = require('./helpers/chara');
  join_slave_chara(fixture, 0, '你');
  join_slave_chara(fixture, 1, '奴隶甲');
  fixture.store.set('cflag:1:1', 0);
  fixture.load_module('page/page-campaign-1'); // 注册战役集 1
  const rows = track_input_rows(fixture);
  const { campaign_menu } = fixture.load_module('page/page-campaign');

  // [0] 行动选择 → 选战役 1（激活）→ 菜单（带战役名）→ [2] 派遣奴隶
  // → 子菜单 [999] 返回 → 菜单 → [999] 退出
  fixture.set_inputs(0, 1, 2, 999, 999);
  await campaign_menu(() => 0);

  // rows：菜单、选择、菜单（带名）、派遣、菜单（带名）
  assert_rows_bounded([rows[2], rows[4]], '战役菜单屏（激活后）');
  assert_screen_top(fixture, '选择要派往敌地的奴隶', '战役派遣屏', 4);
  assert_no_unread(fixture, '战役派遣');
});

// —— 换号确认屏（page-chara-number-swap.js，#724） ——

test('换号换屏：确认屏执行互换后回第一屏，行数相同（#724）', async () => {
  const fixture = create_era_fixture();
  const { join_slave_chara } = require('./helpers/chara');
  join_slave_chara(fixture, 0, '你');
  join_slave_chara(fixture, 1, '甲');
  join_slave_chara(fixture, 2, '乙');
  const rows = track_input_rows(fixture);
  const { chara_number_swap } = fixture.load_module(
    'page/page-chara-number-swap',
  );

  // 第一屏选 1 → 第二屏选 2 → 确认屏 [4000] 是 → 已完成互换 → 第一屏 → [1999]
  fixture.set_inputs(1, 2, 4000, 1999);
  await chara_number_swap();

  // rows：第一屏、第二屏、确认屏、第一屏（重画）
  assert_rows_bounded([rows[0], rows[3]], '换号第一屏（互换后）');
  assert_screen_top(fixture, '交换排序编号，确定吗？', '换号确认屏', 4);
  assert_no_unread(fixture, '换号确认屏');
});

test('实验室等键：条目成交的播报在回主菜单换屏前先经按键确认（#724）', async () => {
  const fixture = create_era_fixture();
  const { join_slave_chara } = require('./helpers/chara');
  join_slave_chara(fixture, 0, '你');
  join_slave_chara(fixture, 1, '奴隶甲');
  fixture.store.set('base:1:0', 100); // 选人画面要求体力 > 0
  fixture.load_module('era-utils/era-flag').money = 100000000;
  fixture.set_inputs(1, 0); // 选人 → 确认成交
  const { modify_bonyu } = fixture.load_module('page/page-shop-labo');
  await modify_bonyu(() => 0);
  // 主菜单下一轮换屏由这里显式代演（ADR-0009：成交播报必须已确认）
  const { change_screen } = fixture.load_module(
    'page/components/screen-change',
  );
  await change_screen();

  assert_no_unread(fixture, '条目成交播报');
});
