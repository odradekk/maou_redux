/**
 * 道具店与陷阱店的独立循环（issue #867）：ere/page/page-shop-loop.js。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点，issue #16）。循环
 * 用 era.input 收输入、经各商店的绘制函数出屏，因此断言落在三处：输出行
 *（哪一屏画了什么）、按钮记录（accelerator 与 disabled）、变量存储（钱与
 * 道具数的变动）。
 *
 * 本票把「进店靠 BOUGHT 切画面」整段换成独立循环，这里钉住三件事：
 *   1. 两个商店互相切换与退出都在本循环里完成，不再借 FLAG:10029；
 *   2. 买不起的商品是 disabled 按钮——引擎只把 !disabled 的 accelerator
 *      注册进 inputParam.rule，所以那个编号按不动是引擎保证的；
 *   3. 购买顺序是确认 → 扣钱 → 给货，取消既不扣钱也不给货。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

/**
 * 可购买世界：道具店的在售位、名字、价格与序号面。
 *
 * 价格与 yml/Item.yml 同值；itemkeys 是引擎 itemkeys 的替身（Item.yml 的
 * 登记序号全集），print_shopitem 按它扫在售位。
 */
function shop_world(seed = {}) {
  const fixture = create_era_fixture();
  const world = {
    'flag:10004': 10000, // MONEY
    'itemname:0': '振动宝石',
    'itemprice:0': 200,
    'itemname:24': '安全套',
    'itemprice:24': 100,
    'itemname:60': '落穴',
    'itemprice:60': 10,
    itemkeys: [0, 24, 60],
    ...seed,
  };
  for (const [name, value] of Object.entries(world)) {
    fixture.store.set(name, value);
  }
  return fixture;
}

/** 跑一遍商店循环：每个场景都以 [999] 退出，循环正常返回 */
async function run_loop(fixture) {
  const { shop_loop } = fixture.load_module('page/page-shop-loop');
  await shop_loop();
}

/** 全量行史的文本行（含被换屏清掉的）——「发生过什么」的取证面 */
function history_texts(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

/** 按编号取按钮记录 */
function button_of(fixture, accelerator) {
  return fixture.lines.find(
    (line) => line.type === 'button' && line.accelerator === accelerator,
  );
}

// ================================================================
// 循环结构：两店互切、退出回主菜单
// ================================================================

test('循环：道具店 → 陷阱店 → 道具店 → 退出，全程不借 FLAG:10029 切屏', async () => {
  const fixture = shop_world({ itemkeys: [] }); // 无商品，只看屏
  // [998] 去陷阱店 → [997] 回道具店 → [999] 退出
  fixture.set_inputs(998, 997, 999);
  await run_loop(fixture);

  const texts = history_texts(fixture);
  assert.equal(
    texts.filter((line) => line === '黑市商人').length,
    2,
    '道具店画了两次（进店一次、从陷阱店切回一次）',
  );
  assert.equal(
    texts.filter((line) => line === '《可以购买在地下城里布置的陷阱》').length,
    1,
    '陷阱店画了一次（[998] 切过去）',
  );
  // [999] 退出：循环结束，不再画任何一屏（退出后再无绘制）
  assert.equal(
    fixture.lines_history.filter((line) => line.type === 'button').at(-1)
      .accelerator,
    999,
    '退出后循环结束，最后画的是退出那一屏',
  );

  // 屏幕切换不再借购入品指针：FLAG:10029 整轮零读写
  for (const record of [...fixture.var_reads, ...fixture.var_writes]) {
    assert.notEqual(
      record.name,
      'flag:10029',
      'BOUGHT 已随切屏机制删除，店内外都不得再动它',
    );
  }
  const era_flag = fixture.load_module('era-utils/era-flag');
  assert.equal(
    era_flag.bought,
    undefined,
    '购入品指针的访问器随机制一起删除（留着等于留一个无人读的槽）',
  );
});

test('循环：画屏前清货架（上一轮/上一家的在售位不留），退出时也清', async () => {
  const fixture = shop_world({ 'itemsales:150': 1, itemkeys: [0, 24, 150] });
  fixture.set_inputs(999);
  await run_loop(fixture);
  // 150 不是任何一家商店的货：清货架后不会残留，也不会画出它的按钮
  assert.equal(fixture.store.get('itemsales:150'), 0, '画屏前清过 0-299');
  assert.equal(button_of(fixture, 150), undefined, '清掉的货不列出来');
  // saleitem_check 点亮的在售位在退出时清掉
  assert.equal(fixture.store.get('itemsales:0'), 0);
  assert.equal(fixture.store.get('itemsales:24'), 0);
});

test('循环：认不出的键无反应、重画同一屏（只是不作为，不报错）', async () => {
  const fixture = shop_world({ itemkeys: [] });
  // 101 是主菜单的「能力显示」，店里没有它的按钮——引擎会拒收，这里用
  // 直接喂值的桩越过白名单，确认循环自己也不认它
  const values = [101, 999];
  fixture.era.input = async () => {
    const next = values.shift();
    if (next === undefined) {
      throw new Error('预置输入已耗尽');
    }
    return next;
  };
  const { shop_loop } = fixture.load_module('page/page-shop-loop');
  await shop_loop();
  assert.equal(
    history_texts(fixture).filter((line) => line === '黑市商人').length,
    2,
    '101 不触发任何分支，回循环重画一次后由 999 退出',
  );
});

// ================================================================
// 买不起：disabled 按钮 + 引擎白名单
// ================================================================

test('买不起的道具是 disabled 按钮；按得动的只有买得起的商品', async () => {
  // 钱 150：0 号（200）买不起、24 号（100）买得起。两个都在售——道具店的
  // saleitem_check 点亮 0-23 与四件消耗品，itemkeys 只扫登记的序号
  const fixture = shop_world({ 'flag:10004': 150 });
  const { item_shop } = fixture.load_module('page/page-item-shop');
  await item_shop();

  assert.equal(button_of(fixture, 0).disabled, true, '0 号的 200 > 150');
  assert.equal(button_of(fixture, 24).disabled, false, '24 号的 100 <= 150');
  // 正文照旧带价格（禁用不改文案，玩家看得出差多少钱）
  assert.equal(button_of(fixture, 0).rendered, '[0] 振动宝石（200pts.）');

  // 恰好等于价格的边界：钱 200 时 0 号买得起，必须点得动（禁用条件的
  // 下界是闭区间——写成 >= 就会把「刚好够钱」也挡掉）
  const exact = shop_world({ 'flag:10004': 200 });
  await exact.load_module('page/page-item-shop').item_shop();
  assert.equal(button_of(exact, 0).disabled, false, '钱恰好等于价格时买得起');
});

test('买不起的编号按不动：引擎只把 !disabled 的 accelerator 注册进输入规则', async () => {
  // 0 号买不起、24 号买得起。点 0 → 引擎拒收（按钮没进白名单），游戏逻辑
  // 收不到这个值；点 24 → 送达，进购买流程
  const rejected = shop_world({ 'flag:10004': 150 });
  rejected.set_inputs(0);
  const { shop_loop } = rejected.load_module('page/page-shop-loop');
  await assert.rejects(
    () => shop_loop(),
    /输入不合法！请输入以下值之一：24, 998, 999/,
    '买不起的 0 号不得出现在合法输入集里（引擎侧禁用就是这条的保证）',
  );

  const accepted = shop_world({ 'flag:10004': 150 });
  accepted.set_inputs(24, 1, 999); // 点 24 → 数量选 1 → 退出
  await run_loop(accepted);
  assert.equal(
    accepted.store.get('item:24'),
    1,
    '买得起的 24 号照常进购买流程并给货',
  );
});

test('买不起的商品即使直调购买也退回：钱与道具都不动', async () => {
  const fixture = shop_world({ 'flag:10004': 150, 'itemsales:0': 1 });
  const { purchase } = fixture.load_module('page/page-item-shop');
  assert.equal(await purchase(0), 0);
  assert.equal(fixture.store.get('flag:10004'), 150, '钱不动');
  assert.equal(fixture.store.get('item:0') ?? 0, 0, '不给货');
});

// ================================================================
// 购买的账：确认 → 扣钱 → 给货
// ================================================================

test('简单确认支成交：钱与道具数各动一次（先扣钱、后给货）', async () => {
  const fixture = shop_world();
  fixture.set_inputs(0, 0, 999); // 点 0 号 → 确认「好的」→ 退出
  await run_loop(fixture);

  assert.equal(fixture.store.get('flag:10004'), 9800, 'MONEY -= 200');
  assert.equal(fixture.store.get('item:0'), 1, 'ITEM:0 += 1');
  assert(history_texts(fixture).includes('《购买了振动宝石》'));

  // 顺序：钱的写入在道具写入之前（确认 → 扣钱 → 给货）
  const money_index = fixture.var_writes.findIndex(
    (w) => w.name === 'flag:10004',
  );
  const item_index = fixture.var_writes.findIndex((w) => w.name === 'item:0');
  assert(money_index >= 0 && item_index >= 0);
  assert(
    money_index < item_index,
    '扣钱必须先于给货（同一个商品被白拿的路径就堵在这一步）',
  );
});

test('简单确认支取消：钱与道具都不动（不再「先扣再退」）', async () => {
  const fixture = shop_world();
  fixture.set_inputs(0, 1, 999); // 点 0 号 → 确认「不要」→ 退出
  await run_loop(fixture);

  assert.equal(fixture.store.get('flag:10004'), 10000, '取消不扣钱');
  assert.equal(
    fixture.store.get('item:0') ?? 0,
    0,
    '取消不给货（也没有先给后收的痕迹）',
  );
  assert(
    !fixture.var_writes.some(
      (w) => w.name === 'flag:10004' || w.name === 'item:0',
    ),
    '取消路径连写都不该有——退款式实现会在这里留一写',
  );
  assert(!history_texts(fixture).includes('《购买了振动宝石》'));
});

test('复数购买成交：按件数一次结清（扣钱 a×n、给货 n 件）', async () => {
  const fixture = shop_world();
  fixture.set_inputs(24, 3, 999); // 点 24 号 → 买 3 件 → 退出
  await run_loop(fixture);

  assert.equal(fixture.store.get('flag:10004'), 9700, 'MONEY -= 100 × 3');
  assert.equal(fixture.store.get('item:24'), 3, 'ITEM:24 += 3');
  assert(history_texts(fixture).includes('《购买了3个安全套》'));
  const era_exflag = fixture.load_module('era-utils/era-exflag');
  assert.equal(era_exflag.legit_money, -300, '记账额同步（EX_FLAG:4444）');
  // 顺序：扣钱必须先于给货（按件数一次结清，中间不留白拿的窗口）
  const money_index = fixture.var_writes.findIndex(
    (w) => w.name === 'flag:10004',
  );
  const item_index = fixture.var_writes.findIndex((w) => w.name === 'item:24');
  assert(money_index >= 0 && item_index >= 0);
  assert(money_index < item_index, '扣钱必须先于给货');
});

test('复数购买取消：钱与道具都不动', async () => {
  const fixture = shop_world();
  fixture.set_inputs(24, 0, 999); // 数量选 0 → 取消
  await run_loop(fixture);

  assert.equal(fixture.store.get('flag:10004'), 10000, '取消不扣钱');
  assert.equal(fixture.store.get('item:24') ?? 0, 0, '取消不给货');
  assert(
    !fixture.var_writes.some(
      (w) => w.name === 'flag:10004' || w.name === 'item:24',
    ),
    '取消路径连写都不该有',
  );
});

// ================================================================
// 店内输入的购买分派（販売アイテム数 = 100）
// ================================================================

test('店内输入的购买分派端点：99 进购买流程（最后一个），100 不进', async () => {
  // 分派的两个端点在真实输入下点不亮（清货架会把手工点亮的 99/100 一起清
  // 掉），把 purchase 换成记录桩、再直接喂值：本作能上架的编号里道具店到
  // 56、陷阱店到 91，常量改成 99 或 101 时这条必红
  const fixture = shop_world({ itemkeys: [] });
  const purchased = [];
  fixture.load_module('page/page-item-shop').purchase = async (id) => {
    purchased.push(id);
    return 0;
  };
  const values = [99, 100, 999];
  fixture.era.input = async () => {
    const next = values.shift();
    if (next === undefined) {
      throw new Error('预置输入已耗尽');
    }
    return next;
  };
  const { shop_loop } = fixture.load_module('page/page-shop-loop');
  await shop_loop();

  assert.deepEqual(
    purchased,
    [99],
    '99 是最后一个可购编号，100 超出販売アイテム数（100）的编号面',
  );
});

// ================================================================
// 陷阱店：同一套购买流程
// ================================================================

test('陷阱店里的购买：点中陷阱走同一套 purchase（扣钱与给货各一次）', async () => {
  const fixture = shop_world({
    'flag:10004': 1000,
    itemkeys: [60],
    'itemsales:60': 1,
  });
  fixture.set_inputs(998, 60, 1, 999); // 去陷阱店 → 点落穴 → 数量 1 → 退出
  await run_loop(fixture);

  assert.equal(fixture.store.get('item:60'), 1, '陷阱 +1');
  assert.equal(fixture.store.get('flag:10004'), 990, 'MONEY -= 10');
  assert(history_texts(fixture).includes('《购买了落穴》'));
});

test('陷阱店的返回键 [997] 回道具店、[999] 退出（两键都在本循环里）', async () => {
  const fixture = shop_world({ itemkeys: [] });
  fixture.set_inputs(998, 997, 999);
  await run_loop(fixture);
  const texts = history_texts(fixture);
  assert.equal(texts.filter((line) => line === '黑市商人').length, 2);
  assert.equal(
    texts.filter((line) => line === '《可以购买在地下城里布置的陷阱》').length,
    1,
  );
});
