/**
 * @file 道具除虫处理（issue #333）。
 * 源: target/ERB/SHOP/SHOP_ITEM.ERB  @ITEM_DETOX（:791-810）
 */

'use strict';

const era = require('#/era-electron');
const { chara } = require('#/facade/chara');

function item_detox(cid) {
  const view = chara(cid);
  const name = era.get(`callname:${cid}:-1`) ?? '';
  era.print(`《${name}从寄生状态中恢复了》`);
  let detail = '';
  if (view.dungeon.私处产卵) detail += '*从私处寄生中恢复* ';
  if (view.dungeon.直肠产卵) detail += '*从肛门寄生中恢复* ';
  if (view.stronghold.蠕虫) detail += '*蠕虫被排出了* ';
  if (view.dungeon.肛门虫) detail += '*肛门虫被排出了* ';
  view.dungeon.私处产卵 = 0;
  view.dungeon.直肠产卵 = 0;
  view.stronghold.蠕虫 = 0;
  view.dungeon.肛门虫 = 0;
  era.print(detail);
  return 0;
}

module.exports = { item_detox };
