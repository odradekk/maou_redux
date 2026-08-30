/**
 * @file 肛交系共用子程序：调教者射精检查与事后处理。
 *
 * 源: target/ERB/調教相關/COMF_ANALSEX.ERB
 *     @COM_EJAC_PLAYER_ANALSEX（:6-351，射精ゲージ蓄积与射精结算——
 *     COM25/26/27/28/29/36 CALL）/ @COM_AFTER_ANAL_SEX（:353-452，经验
 *     上昇、肛交怀孕对象判定、百合/男同经验、爱情经验、污渍移动）
 *
 * 调用方（J11 性交系 / J15 助手与蕾丝 / J16 重度调教族票）的接口面：
 *   - com_ejac_player_analsex(rand) / com_after_anal_sex() → Promise<void>，
 *     rand = (n) => [0, n) 整数（缺省均匀随机，#117 决议）
 *
 * 变量语义见 com-vaginasex.js 头注（同族）；肛交特有：CFLAG:102 = 妊娠
 * 相手（1 主人 / 2 助手 / 4 死斗场下层居民 / 5 犬 / 6 怪物触手，属主
 * event——train 侧写经 chara(cid).event 门面）；TALENT:340 = 异常妊娠体质。
 *
 * 与 V 版（com-vaginasex.js）的同位差异（各自 1:1，勿「对齐」）：
 *   - 润滑乘率表（0.40/0.70/1.00/1.30/1.60，V 版 0.6/0.8/1.0/1.2/1.4）；
 *   - 安全套减率 0.50（V 版 0.60）；经验分档看 EXP:1/53（V 版 0/52）；
 *   - 射精文案无部位分支（膣内受精判定 CFLAG:113 = -1 不存在，代之以
 *     肛内异常妊娠 CFLAG:113 = 3，判 TALENT:340）；
 *   - 27（後背位）无顺从乘率、26（正常位肛交）有——与 V 版相反的拼法。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { chara } = require('#/facade/chara');
const { PALAMLV } = require('#/era-utils/palam-level');
const { EXPLV } = require('#/era-utils/exp-level');

const tal = (id, i) => era.get(`talent:${id}:${i}`) || 0;
const abl = (id, i) => Math.floor(era.get(`abl:${id}:${i}`) || 0);
const tequip = (id, i) => era.get(`tequip:${id}:${i}`) || 0;

/** TIMES X, m：整数乘小数后截断（math-etc.md） */
const times = (v, m) => Math.floor(v * m);

/** ABL 分档取率：表按 LV0-5，超出取末位（原作 ELSE 兜底） */
const abl_rate = (id, i, table) =>
  table[Math.min(abl(id, i), table.length - 1)];

/** EXP 阈值分档取率：< EXPLV[1] 取 rates[0] … ≥ EXPLV[5] 取末位 */
function exp_rate(id, index, rates) {
  const value = era.get(`exp:${id}:${index}`) || 0;
  for (let i = 1; i < EXPLV.length; i += 1) {
    if (value < EXPLV[i]) {
      return rates[i - 1];
    }
  }
  return rates[rates.length - 1];
}

// 指令位表（:15-242）
const SKILL_BASE_HI = [1500, 1600, 1800, 2000, 2400, 3000]; // 25/26
const OBED_STRONG = [0.8, 0.9, 1.0, 1.1, 1.2, 1.3]; // 顺从乘率（弱侧）
const SVC_RATE = [0.3, 0.7, 1.0, 1.2, 1.5, 1.8]; // 侍奉技术（ABL:13）

/**
 * @COM_EJAC_PLAYER_ANALSEX（:6-351）：调教者的射精ゲージ蓄积与射精结算
 * （肛交位）。兽奸 / 死斗场（助手本人以外）直接返回（:10-14）。
 * @param {(n: number) => number} [rand] RAND:N 的随机源
 * @returns {Promise<void>}
 */
async function com_ejac_player_analsex(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const cid = era_flag.target;
  const player = era_flag.player;
  if (tequip(cid, 89)) {
    return; // :10 兽奸
  }
  if (tequip(cid, 55) && era_flag.assi !== player) {
    return; // :13 死斗场（助手本人以外）
  }

  let b = 0; // :17
  const com = era_flag.selectcom || 0;
  const skill_base = (table) => {
    b = table[Math.min(abl(cid, 12), table.length - 1)];
  };
  if (com === 25) {
    // :21-45 逆アナルレイプ（基础值のみ）
    skill_base(SKILL_BASE_HI);
  } else if (com === 26) {
    // :46-84 正常位肛交（技巧 + 顺从）
    skill_base(SKILL_BASE_HI);
    b = times(b, abl_rate(cid, 10, OBED_STRONG));
  } else if (com === 27) {
    // :85-110 後背位肛交（技巧のみ——顺从表不在原作此位）
    skill_base([2700, 2800, 2900, 3100, 3200, 3300]);
  } else if (com === 28) {
    // :111-153 対面座位肛交
    skill_base([800, 1000, 1200, 1400, 1600, 1800]);
    b = times(b, abl_rate(cid, 10, [1.0, 1.3, 1.6, 1.9, 2.1, 2.4]));
  } else if (com === 29) {
    // :154-196 背面座位肛交
    skill_base([900, 1100, 1300, 1500, 1700, 1900]);
    b = times(b, abl_rate(cid, 10, [1.0, 1.1, 1.2, 1.3, 1.4, 1.5]));
  } else if (com === 36) {
    // :197-242 騎乗位肛交（技巧 + 顺从 + 侍奉技术）
    skill_base([1000, 1300, 1700, 2200, 3000, 4500]);
    b = times(b, abl_rate(cid, 10, OBED_STRONG));
    b = times(b, abl_rate(cid, 13, SVC_RATE));
  }

  // —— 共通乘率（:244-315，头注：润滑/安全套/经验位与 V 版各异） ——
  b = times(b, abl_rate(cid, 11, [1.0, 1.1, 1.2, 1.3, 1.4, 1.5])); // 欲望
  b = times(b, abl_rate(cid, 14, [1.0, 1.1, 1.2, 1.3, 1.4, 1.5])); // 性交技術
  {
    // :279-291 潤滑（PALAM:3）
    const lube = era.get(`palam:${cid}:3`) || 0;
    if (lube < PALAMLV[1]) {
      b = times(b, 0.4);
    } else if (lube < PALAMLV[2]) {
      b = times(b, 0.7);
    } else if (lube < PALAMLV[3]) {
      b = times(b, 1.0);
    } else if (lube < PALAMLV[4]) {
      b = times(b, 1.3);
    } else {
      b = times(b, 1.6);
    }
  }
  b = times(b, abl_rate(player, 0, [1.0, 1.5, 2.0, 2.5, 3.5, 5.0])); // 陰核感覚
  b = times(b, exp_rate(cid, 1, [1.5, 1.0, 0.9, 0.8, 0.7, 0.6])); // 肛门经验
  b = times(b, exp_rate(cid, 53, [1.0, 0.9, 0.7, 0.5, 0.3, 0.1])); // 肛门拡张
  // :315-317 安全套装着中 ×0.50（主人位 35 属 event 走门面）
  if (chara(cid).event.主人避孕套 || (era_flag.assiplay && tequip(cid, 36))) {
    b = times(b, 0.5);
  }

  // :320-322 蓄积（扶她 121 / 男人 122）
  if (tal(player, 121) || tal(player, 122)) {
    era.add(`base:${player}:2`, b);
  }

  // :324-332 射精判定
  const s = era.get(`base:${player}:2`) || 0;
  const ejac = era.get(`maxbase:${player}:2`) || 0;
  const e = s > ejac * 2 ? 2 : s > ejac ? 1 : 0;

  // 肛内异常妊娠（:335-344 大量 / :360-369 通常，TALENT:340 异常妊娠体质；
  // CFLAG:109 异常妊娠许可时概率更高：大量 1/3（否则 1/5）、通常 1/5（否则 1/10））
  const anal_pregnancy = (heavy) => {
    if (era.get(`cflag:${cid}:109`)) {
      if (rand_n(heavy ? 3 : 5) === 0 && tal(cid, 340)) {
        era.set(`cflag:${cid}:113`, 3);
      }
    } else if (rand_n(heavy ? 5 : 10) === 0 && tal(cid, 340)) {
      era.set(`cflag:${cid}:113`, 3);
    }
  };

  if (e === 2) {
    // :334-353 大量射精
    era.add(`exp:${player}:3`, 2);
    chara(cid).dungeon.精液经验 = chara(cid).dungeon.精液经验 + 2;
    era.print('大量射精'); // :339
    era.print('精液经验＋２'); // :340
    era.set(`stain:${player}:2`, (era.get(`stain:${player}:2`) || 0) | 4);
    const next = Math.max((era.get(`base:${player}:2`) || 0) - ejac * 2, 0);
    era.set(`base:${player}:2`, next >= ejac ? ejac - 1 : next);
    era.set('tflag:2', 2); // :347
    anal_pregnancy(true); // :348-353
  } else if (e === 1) {
    // :354-374 通常の射精
    era.add(`exp:${player}:3`, 1);
    chara(cid).dungeon.精液经验 = chara(cid).dungeon.精液经验 + 1;
    era.print('射精'); // :359
    era.print('精液经验＋１'); // :360
    era.set(`stain:${player}:2`, (era.get(`stain:${player}:2`) || 0) | 4);
    const next = Math.max((era.get(`base:${player}:2`) || 0) - ejac, 0);
    era.set(`base:${player}:2`, next >= ejac ? ejac - 1 : next);
    era.set('tflag:2', 1); // :371
    anal_pregnancy(false); // :372-374
  }
}

/**
 * @COM_AFTER_ANAL_SEX（:353-452）：肛交后处理。
 * @returns {Promise<void>}
 */
async function com_after_anal_sex() {
  const cid = era_flag.target;
  const player = era_flag.player;

  // :357-371 肛门经验（肛门感觉 ABL:3 越高越多——首两档同为 3，1:1）
  let s = 0;
  if (abl(cid, 3) <= 1) {
    s += 3;
  } else if (abl(cid, 3) <= 4) {
    s += 3;
  } else if (abl(cid, 3) <= 7) {
    s += 4;
  } else {
    s += 5;
  }
  chara(cid).dungeon.肛门经验 = chara(cid).dungeon.肛门经验 + s;
  era.print(`肛门经验+${s}`);
  s = 0;

  chara(cid).dungeon.性交经验 = chara(cid).dungeon.性交经验 + 1; // :372
  era.print('性交经验＋１'); // :373

  // :375-391 肛交怀孕对象判定（CFLAG:113 == 3 时；102 属主 event 走门面）
  if ((era.get(`cflag:${cid}:113`) || 0) === 3) {
    if (era_flag.assiplay) {
      chara(cid).event.妊娠相手 = 2; // :380 助手
    } else if (tequip(cid, 89)) {
      chara(cid).event.妊娠相手 = 5; // :382 犬
    } else if (era_flag.selectcom === 202) {
      chara(cid).event.妊娠相手 = 4; // :384 死斗场下层居民
    } else if (tequip(cid, 90) || tequip(cid, 55)) {
      chara(cid).event.妊娠相手 = 6; // :386 怪物或触手
    } else {
      chara(cid).event.妊娠相手 = 1; // :388 主人
    }
  }
  if (tequip(cid, 89)) {
    return; // :393 兽奸到此为止
  }

  // :396-405 百合 +5 / 男同 +7
  if (!tal(cid, 122) && !tal(player, 122)) {
    era.print(era.get('expname:40') ?? '');
    era.print('+5');
    era.add(`exp:${cid}:40`, 5);
  } else if (tal(cid, 122) && tal(player, 122)) {
    era.print(era.get('expname:41') ?? '');
    era.print('+7');
    era.add(`exp:${cid}:41`, 7);
  }

  if (tequip(cid, 55) && era_flag.assi !== player) {
    return; // :410 死斗场到此为止
  }

  // :413-425 爱情经验。原文 :417-418 的 `SIF SELECTCOM == 28 / E = 4` 在
  // IF SELECTCOM == 26 的分支体内，28 走 ELSE 恒得 2——E = 4 不可达，
  // 上游疑似笔误（意图给対面座位 4），死行不移植、#14 登记，行为 1:1
  let e;
  if (era_flag.selectcom === 26) {
    e = 3; // :416
  } else {
    e = 2; // :420-421 その他（含 28）
  }
  if (tal(cid, 122)) {
    e += 1; // :423
  }
  if ((era.get(`cflag:${cid}:2`) || 0) >= 1000 && !era_flag.assiplay) {
    era.print(`${era.get('expname:23') ?? ''}+${e}`); // :427
    era.add(`exp:${cid}:23`, e);
  }
  e = 0;

  // :430-437 主人亲自 → 好感度加成旗（判据 ABL:3 肛门感觉）
  if (!era_flag.assiplay) {
    if (abl(cid, 3) >= 3) {
      era.add('tflag:30', 2);
    } else {
      era.add('tflag:30', 1);
    }
  }

  // :440-449 汚移：对象的Ａ(4) ↔ 调教者的Ｐ(2)
  const p_stain = era.get(`stain:${player}:2`) || 0;
  const a_stain = era.get(`stain:${cid}:4`) || 0;
  era.set(`stain:${cid}:4`, a_stain | p_stain);
  era.set(`stain:${player}:2`, p_stain | a_stain);
}

module.exports = { com_ejac_player_analsex, com_after_anal_sex };
