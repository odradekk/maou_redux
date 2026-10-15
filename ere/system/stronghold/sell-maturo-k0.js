/**
 * @file 成熟奴隶出售的入口与黑市调度（issue #338/#797）。
 *
 * 售价优先取出售流程留下的估价（peek_sale_price），缺省用 estimate_chara 重算。
 * 市场菜单的 1000 号输入翻转 EXFLAG:9000 第 2 位（水晶球录像开关）。
 * 黑市正文按末路编号分住在 sell-maturo-k0-{rebel,love,lewd,normal}.js：k0_route
 * 只看状态、种族与售价决定末路编号，末路函数自己输出文案并返回结局名，本模块
 * 只负责算价、菜单、分派与三家市场共用的收尾（家族末路记录、录像书架）。
 *
 * 变量语义：MARK 下标 3 = 反抗刻印；CFLAG 下标 9 = 等级、605 = 压缩
 * 家族关系；ABL 下标 2/3/15 = 私处/肛门感觉/话术；TALENT 下标 75-77/
 * 85 = 性爱狂/淫乱/尻穴狂/爱慕，110/114/119 = 巨乳/爆乳/超乳，122 =
 * 男人，200-207 = 八类职业，204 = 肉便器，314 = 种族；CSTR 下标 5 =
 * 家人的末路记录；TSTR 下标 30 = VIDEO_MATURO 消费的录像标题暂存。
 */

'use strict';

const era = require('#/era-electron');
const { peek_sale_price } = require('#/event/event-aftertrain');
const { estimate_chara } = require('#/system/stronghold/sale');
const { video_maturo } = require('#/system/stronghold/sell-video');
const { sell_maturo_k1 } = require('#/system/stronghold/sell-maturo-k1');
const { sell_maturo_k2 } = require('#/system/stronghold/sell-maturo-k2');
const {
  ROUTES: REBEL_ROUTES,
} = require('#/system/stronghold/sell-maturo-k0-rebel');
const {
  ROUTES: LOVE_ROUTES,
} = require('#/system/stronghold/sell-maturo-k0-love');
const {
  ROUTES: LEWD_ROUTES,
} = require('#/system/stronghold/sell-maturo-k0-lewd');
const {
  ROUTES: NORMAL_ROUTES,
} = require('#/system/stronghold/sell-maturo-k0-normal');
const { search_family } = require('#/chara/chara-family');
const { chara } = require('#/facade/chara');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { chara_callname, chara_name } = require('#/utils/callname-utils');

/** 黑市末路表：k0_route 给出的编号 → 该末路族的买家选择与分派函数。 */
const K0_ROUTES = {
  ...REBEL_ROUTES,
  ...LOVE_ROUTES,
  ...LEWD_ROUTES,
  ...NORMAL_ROUTES,
};

function print_market_menu() {
  era.print('要卖到哪个市场？');
  era.printButton('魔界的黑市', 0);
  era.printButton('魔界的异族交易市场', 1);
  era.printButton('魔界的宠物市场', 2);
  era.printButton('找什么市场？随手卖掉吧！！', 999);
  era.printButton('水晶球记录', 1000, {
    color: era_exflag.mod_switch_bits & 4 ? '#ffffff' : '#646464',
  });
}

async function choose_market(cid, price, rand) {
  let redraw = true;
  for (;;) {
    if (redraw) print_market_menu();
    redraw = false;
    const result = await era.input();
    if (result < 0 || (result >= 3 && result !== 999 && result !== 1000)) {
      continue;
    }
    if (result === 999) return true;
    if (result === 1000) {
      era_exflag.mod_switch_bits ^= 4;
      redraw = true;
      continue;
    }
    if (result === 1) {
      await sell_maturo_k1(cid, { price, rand });
      return true;
    }
    if (result === 2) {
      await sell_maturo_k2(cid, { price });
      return true;
    }
    return false;
  }
}

/** k0_route：按反抗刻印、爱慕、淫乱、常态与种族、售价给出末路编号。 */
function k0_route(cid, price) {
  if (era.get(`mark:${cid}:3`) == 3) {
    if (era.get(`talent:${cid}:314`) == 9) {
      if (price >= 100000) {
        return 'rebel_matu_ge100k';
      } else {
        return 'rebel_matu_lt100k';
      }
    } else {
      if (price >= 100000) {
        return 'rebel_other_ge100k';
      } else {
        return 'rebel_other_lt100k';
      }
    }
  } else if (era.get(`talent:${cid}:85`)) {
    if (era.get(`talent:${cid}:314`) == 9) {
      if (price >= 1000000) {
        return 'love_matu_ge1m';
      } else if (price >= 500000) {
        return 'love_matu_ge500k';
      } else if (price >= 100000) {
        return 'love_matu_ge100k';
      } else {
        return 'love_matu_lt100k';
      }
    } else {
      if (price >= 1000000) {
        return 'love_other_ge1m';
      } else if (price >= 500000) {
        return 'love_other_ge500k';
      } else if (price >= 100000) {
        return 'love_other_ge100k';
      } else {
        return 'love_other_lt100k';
      }
    }
  } else if (era.get(`talent:${cid}:76`)) {
    if (era.get(`talent:${cid}:314`) == 9) {
      if (price >= 1000000) {
        return 'lewd_matu_ge1m';
      } else if (price >= 500000) {
        return 'lewd_matu_ge500k';
      } else if (price >= 100000) {
        return 'lewd_matu_ge100k';
      } else {
        return 'lewd_matu_lt100k';
      }
    } else {
      if (price >= 1000000) {
        return 'lewd_other_ge1m';
      } else if (price >= 500000) {
        return 'lewd_other_ge500k';
      } else if (price >= 100000) {
        return 'lewd_other_ge100k';
      } else {
        return 'lewd_other_lt100k';
      }
    }
  } else {
    if (era.get(`talent:${cid}:314`) == 9) {
      if (price >= 500000) {
        return 'normal_matu_ge500k';
      } else if (price >= 100000) {
        return 'normal_matu_ge100k';
      } else {
        return 'normal_matu_lt100k';
      }
    } else {
      if (price >= 500000) {
        return 'normal_other_ge500k';
      } else if (price >= 100000) {
        return 'normal_other_ge100k';
      } else {
        return 'normal_other_lt100k';
      }
    }
  }
}

/** sell_maturo_k0：成熟出售入口，市场选择与黑市末路。 */
async function sell_maturo_k0(cid = era_flag.target, { price, rand } = {}) {
  price ??= peek_sale_price() || estimate_chara(cid).price;
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target_name = chara_callname(cid);
  const master_name = chara_name(0);

  if (await choose_market(cid, price, rand_n)) return 0;

  const ending = await K0_ROUTES[k0_route(cid, price)]({
    cid,
    rand_n,
    target_name,
  });

  const family_id = search_family(cid);
  if (family_id >= 0) {
    chara(family_id).event.家人末路 = `${ending}${target_name}`;
  }
  era.set('tstr:30', `${ending}${target_name}`);
  await era.print('');
  await era.printAndWait(
    `就这样，${master_name}和${target_name}再也没有见面……`,
  );
  await era.print('');
  video_maturo(cid);
  return 0;
}

module.exports = { sell_maturo_k0, k0_route, K0_ROUTES };
