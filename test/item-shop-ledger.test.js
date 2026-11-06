/**
 * @file 道具价格的「两份真相」对账（issue #949）。
 *
 * 一件道具的价在代码里有两处：扣款读引擎的 ITEMPRICE（yml/Item.yml 的
 * price），记账读 page/page-item-shop.js 的三张表（SIMPLE_LEDGER /
 * USE_LEDGER / PLURAL_PRICES）。回合结算按 `MONEY == EX_FLAG:4444 + 8766`
 * 对账，两处不同值就是白拿或对账失败——33 号缺行时 ITEMPRICE 读 0，扣款按
 * 0 放行、记账仍减 100000（#867 发现）。
 *
 * 本文件把「数据这一侧」（yml）与「代码这一侧」（三张表）对起来：三张表的
 * 每条都必须在 Item.yml 里有同价条目；再加两条钉住 32 号的决定与「在售必须
 * 先登记」。解析 yml 走零依赖正则（同 test/yml-name-type.test.js 的做法，
 * 不引 yaml 库）。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

const ITEM_YML = path.resolve(__dirname, '..', 'yml', 'Item.yml');

/**
 * 解析 yml/Item.yml：序号 → 单价。
 *
 * 只认「列 0 的 `"键":` + 两空格缩进的 `id` / `price` 行」这一形状，与引擎
 * 装载用的表结构一致；条目之间的注释行自然落在条目之外。
 * @returns {Map<number, number>}
 */
function item_prices() {
  const text = fs.readFileSync(ITEM_YML, 'utf8');
  const by_id = new Map();
  for (const match of text.matchAll(
    /^"([^"]+)":\r?\n((?: {2}[^\r\n]*\r?\n)*)/gm,
  )) {
    const id = /^ {2}id: (\d+)$/m.exec(match[2]);
    if (id === null) {
      continue;
    }
    const price = /^ {2}price: (\d+)$/m.exec(match[2]);
    by_id.set(Number(id[1]), price === null ? undefined : Number(price[1]));
  }
  return by_id;
}

/** 只装一次：yml 在本进程里不会变 */
let prices;
function item_price_of(id) {
  prices ??= item_prices();
  return prices.get(id);
}

/**
 * 三张记账表：表名 → { 序号: 记账额 }。
 *
 * 表从被测模块的导出取（代码这一侧的唯一真相），不在测试里抄一份——抄一份
 * 就等于把「两份真相」变成「三份」。
 * @returns {Array<[string, Object<string, number>]>}
 */
function ledger_tables() {
  const fixture = create_era_fixture();
  const shop = fixture.load_module('page/page-item-shop');
  return [
    ['SIMPLE_LEDGER', shop.SIMPLE_LEDGER],
    ['USE_LEDGER', shop.USE_LEDGER],
    ['PLURAL_PRICES', shop.PLURAL_PRICES],
  ];
}

test('三张记账表的每条都与 yml/Item.yml 的 price 同值（两份真相必须同值）', () => {
  const offenders = [];
  for (const [table, table_prices] of ledger_tables()) {
    for (const [id, amount] of Object.entries(table_prices)) {
      const price = item_price_of(Number(id));
      if (price === undefined) {
        offenders.push(
          `${table}[${id}] 在 Item.yml 里没有条目或没有 price（记账额 ${amount}）`,
        );
        continue;
      }
      if (price !== amount) {
        offenders.push(
          `${table}[${id}]：Item.yml 的 price 是 ${price}，记账额是 ${amount}——两份真相不同值`,
        );
      }
    }
  }
  assert.deepEqual(
    offenders,
    [],
    '扣款读 ITEMPRICE、记账读这三张表：不同值即白拿或回合结算对账失败',
  );
});

test('在售的道具必须登记在 Item.yml（点亮的 ITEMSALES 序号 ⊆ itemkeys）', () => {
  // 两轮把 saleitem_check 的置位段走全：基线一轮，调合知识 / 秘密知识 /
  // 持有摄像机一并置上的那轮点亮的在售位最多
  const seeds = [
    {},
    { 'talent:0:55': 1, 'talent:0:325': 1, 'item:6': 1, 'abl:0:12': 1 },
  ];
  const offenders = new Set();
  for (const seed of seeds) {
    const fixture = create_era_fixture();
    for (const [name, value] of Object.entries(seed)) {
      fixture.store.set(name, value);
    }
    const { saleitem_check } = fixture.load_module('page/page-item-shop');
    fixture.var_writes.length = 0;
    saleitem_check();
    // 后写覆盖先写：同一序号在一段里先置 1 再置 0 时按最后一次算
    const last = new Map();
    for (const write of fixture.var_writes) {
      if (write.name.startsWith('itemsales:')) {
        last.set(Number(write.name.slice('itemsales:'.length)), write.value);
      }
    }
    for (const [id, value] of last) {
      if (value === 1 && item_price_of(id) === undefined) {
        offenders.add(id);
      }
    }
  }
  assert.deepEqual(
    [...offenders].sort((a, b) => a - b),
    [],
    '在售集是按 itemkeys 列货的：未登记的序号列不出按钮，玩家却在别处按它记账',
  );
});

test('32 号不登记：USE_ITEMS 里只有它没有 yml 条目（原始数据无名字、价格与效果）', () => {
  const fixture = create_era_fixture();
  const { USE_ITEMS } = fixture.load_module('page/page-item-shop');
  const unregistered = USE_ITEMS.filter(
    (id) => item_price_of(id) === undefined,
  );
  assert.deepEqual(
    unregistered,
    [32],
    '32 号只在原始数据的分派名单里出现（无名字、无价格、无效果、从不上架），补条目就是凭空造价',
  );
});
