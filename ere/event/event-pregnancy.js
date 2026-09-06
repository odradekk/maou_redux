/**
 * @file 妊娠概率检查（issue #333）。
 * 源: target/ERB/EVENT/EVENT_PREGNANCY.ERB  @NAKADASHI_CHECK（:196-274）
 */

'use strict';

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { chara } = require('#/facade/chara');

function default_rand(n) {
  return Math.floor(Math.random() * n);
}

function partner_slot(kind) {
  return kind === 1 ? 101 : 101 + kind;
}

function get_pool(view, slot) {
  if (slot === 101) return view.system.主人膣内射精;
  if (slot === 103) return view.system.助手膣内射精;
  if (slot === 104) return view.system.对象膣内射精;
  if (slot === 105) return view.dungeon.客膣内射精;
  if (slot === 106) return view.dungeon.犬膣内射精;
  if (slot === 107) return view.dungeon.怪物膣内射精;
  return view.system.狂王膣内射精;
}

function clear_pool(view, slot) {
  if (slot === 101) view.system.主人膣内射精 = 0;
  else if (slot === 103) view.system.助手膣内射精 = 0;
  else if (slot === 104) view.system.对象膣内射精 = 0;
  else if (slot === 105) view.dungeon.客膣内射精 = 0;
  else if (slot === 106) view.dungeon.犬膣内射精 = 0;
  else if (slot === 107) view.dungeon.怪物膣内射精 = 0;
  else view.system.狂王膣内射精 = 0;
}

function nakadashi_check(cid, kind, rand = default_rand) {
  const view = chara(cid);
  const slot = partner_slot(kind);
  // FLAG:5 bit 2 = 启用妊娠系统
  if (((era.get('flag:5') || 0) & 4) === 0) {
    clear_pool(view, slot);
    return 0;
  }
  if (view.chara.男人 || view.train.未熟) return 0;
  if (kind === 5 && !view.chara.动物耳朵) return 0;

  const pool = get_pool(view, slot);
  if (pool === 0) return 0;
  if (view.event.预产日 > 0 || view.chara.妊娠 || view.chara.育儿中) {
    clear_pool(view, slot);
    return 0;
  }

  let ovulation = 3 - view.stronghold.排卵诱发剂 * 2;
  if (view.chara.种族 === 2 && era_flag.date >= 14 && era_flag.date <= 16) {
    ovulation = view.stronghold.排卵诱发剂 === 1 ? 1 : 2;
  }
  let base;
  let success;
  if (pool >= 25) [base, success] = [1, 3];
  else if (pool >= 20) [base, success] = [2, 2];
  else if (pool >= 15) [base, success] = [3, 2];
  else if (pool >= 10) [base, success] = [4, 2];
  else if (pool >= 5) [base, success] = [5, 2];
  else [base, success] = [6, 2];

  // TALENT:100 = 娇小
  const upper = (base + (era.get(`talent:${cid}:100`) || 0) * 2) * ovulation;
  if (rand(upper) <= success) view.event.妊娠相手 = kind;
  clear_pool(view, slot);
  return 0;
}

module.exports = { nakadashi_check };
