/**
 * @file 据点列表的通用二选一（issue #333）。
 * 源: target/ERB/SHOP/LIFE_LIST.ERB  @SELECT_YES_NO（:278-292）
 */

'use strict';

const era = require('#/era-electron');

async function select_yes_no() {
  for (;;) {
    era.print('  [0] 是的   [1] 不要');
    const result = await era.input();
    if (result === 0 || result === 1) return result;
  }
}

module.exports = { select_yes_no };
