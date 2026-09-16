/**
 * @file 角色信息的其余数据行（@SHOW_DATA）。
 *
 * 源: target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB @SHOW_DATA（:1681-1760）
 *
 * 一行两段：`[使役魔兽:…][凌辱隶属/畏惧:…][结婚对象:…]` 与 `[善恶值:n|档]`。
 * 前半段的颜色只有使役魔兽的名字着 `SETCOLOR 0x63E390`（:1686-1688），其余
 * 默认色。
 *
 * 依赖的真身（都不重造）：
 *   - `MONSTER_DATA`（怪物相關，E:300 落怪物番号）与 `MONSTER_NAME`；
 *   - `SEARCH_FAMILY`（chara-family.js:search_family，返回角色 ID 或 -1）；
 *   - `NAME_LOVER`（dungeon-lovers.js:name_lover，print_flag = 1 时自行打一行）；
 *   - `GET_LOOK_INFO`（chara/look-info.js:get_look_info，本票的靶函数之一，
 *     #389 已交付全量真身——这里按 :1721 的「婚史」kind 取）。
 *
 * `@SHOW_DATA(ARG)` 的 ARG 在源里同时当「角色号」与「TARGET」用（:1711 的
 * `CALL SEARCH_FAMILY,TARGET,"LOVE"` 读的是 TARGET）——调用点两处
 * （SHOW_CHARA_INFO 的 :232/:294 与 DUNGEON_RYOUZYOKU 的 :18）都在调用前把
 * TARGET 设成了 ARG，故 ere 侧统一用显式 cid。
 */

const era = require('#/era-electron');
const { search_family } = require('#/chara/chara-family');
const { get_look_info } = require('#/chara/look-info');
const { LOVER_NAMES } = require('#/dungeon/dungeon-lovers');
const { monster_data, monster_name } = require('#/dungeon/monster-data');
const { chara_callname } = require('#/utils/callname-utils');

const default_rand = (n) => Math.floor(Math.random() * n);

/** `SETCOLOR 0x63E390`（:1686）→ 渲染层 CSS 色串 */
const HORSE_COLOR = '#63e390';

/** 善恶值的七档（源 :1744-1757，判据是 CFLAG:151 的区间） */
const KARMA_BANDS = [
  { over: 150, text: '纯洁' },
  { over: 100, text: '正义' },
  { over: 50, text: '秩序' },
  { over: -50, text: '中立' },
  { over: -100, text: '混沌' },
  { over: -150, text: '堕落' },
  { over: -Infinity, text: '邪恶' },
];

/** 结婚对象的编码（源 :1705-1723 的六个分支） */
const MARRY_DOG = 900;
const MARRY_MASTER = 901;
const MARRY_LOVER = 902;

/** 凌辱隶属的门槛（源 :1692 `CFLAG:130 > 0 && CFLAG:131 > 5`） */
const SUBJUGATE_THRESHOLD = 5;

/**
 * @SHOW_DATA（:1681-1760）：使役魔兽／凌辱隶属／结婚对象／善恶值。
 *
 * @param {number} cid 角色 ID
 * @param {(n: number) => number} [rand] RAND:N 随机源（交给 MONSTER_DATA）
 */
function show_data(cid, rand = default_rand) {
  const cflag = (index) => era.get(`cflag:${cid}:${index}`) || 0;
  const stone = [];

  // :1683-1690 使役魔兽（CFLAG:570 是配下怪物的识别号）
  if (cflag(570) > 0) {
    monster_data(cflag(570), 3, cid, -1, -1, rand); // :1684
    stone.push({ content: '[使役魔兽:' });
    stone.push({
      content: monster_name(era.get('e:300') || 0),
      color: HORSE_COLOR,
    });
    stone.push({ content: ']' });
  }

  // :1692-1702 凌辱隶属（CFLAG:131 高 = 隶属，低 = 畏惧）
  if (cflag(130) > 0) {
    stone.push({
      content: cflag(131) > SUBJUGATE_THRESHOLD ? '[凌辱隶属:' : '[凌辱畏惧:',
    });
    stone.push({ content: monster_name(cflag(130)) }); // :1700
    stone.push({ content: ']' });
  }

  // :1704-1739 结婚对象
  stone.push({ content: '[结婚对象:' });
  stone.push(...marriage_fragments(cid, cflag));
  stone.push({ content: ']' });

  // :1741-1760 善恶值
  const karma = cflag(151);
  stone.push({ content: '[善恶值:' });
  stone.push({ content: String(karma) });
  stone.push({
    content: `|${KARMA_BANDS.find((band) => karma > band.over).text}`,
  });
  stone.push({ content: ']　' }); // :1757-1760 PRINTL ]\u3000（全角空格收尾）
  era.print(stone);
}

/**
 * 结婚对象段的片段（源 :1705-1737 的六分支）。
 * @param {number} cid 角色 ID
 * @param {(index: number) => number} cflag CFLAG 读取
 * @returns {Array<{content: string}>}
 */
function marriage_fragments(cid, cflag) {
  const marry = cflag(601);
  if (marry === MARRY_DOG) {
    return [{ content: '野狗' }]; // :1706
  }
  if (marry === MARRY_MASTER) {
    return [{ content: chara_callname(0) }]; // :1708 %SAVESTR:MASTER%
  }
  if (marry === MARRY_LOVER) {
    if (cflag(606) === 200) {
      // :1710-1716 家族关系为恋人的角色
      const found = search_family(cid, 'LOVE');
      return [{ content: found > 0 ? chara_callname(found) : '恋人' }];
    }
    // :1718 原作 CALL NAME_LOVER（print_flag = 1）在**行内**追加 14 格名称；
    // ere 侧 name_lover 是整行出口（dungeon-lovers.js:54-60 的形态），本段要
    // 与前后拼成同一行，故取同一张表（LOVER_NAMES 已由 page-chara-info.js 消费）
    // 自己拼片段——表是唯一真相源，两处不各持一份名单。
    const name = LOVER_NAMES.get(cflag(606));
    return name === undefined ? [] : [{ content: name.padEnd(14, '　') }];
  }
  if (marry === 0) {
    // :1720-1723 未婚：有后代标记（EX_TALENT:2）时直接「无」
    if ((era.get(`ex_talent:${cid}:2`) || 0) !== 0) {
      return [{ content: '无' }];
    }
    return [{ content: get_look_info(cid, '婚史') }];
  }
  // :1724-1737 其余编码：末位 9 = 家族婚姻，否则查物品名
  const local = marry % 10;
  if (local === 9) {
    const found = search_family(cid, 'MARRIAGE');
    return [{ content: found > 0 ? chara_callname(found) : '无' }];
  }
  return [{ content: era.get(`itemname:${marry}`) ?? '' }];
}

module.exports = { KARMA_BANDS, show_data };
