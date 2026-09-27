/**
 * @file 调教指令 40–49「SM 系」族：com40-49 真身 + equip_com43-49 装备
 * 持续效果 + com_able_family 的 40-49 号可用性 + train_message_a/b 分支 +
 * get_adv_com 的 CASE 40 升格规则（issue #223，J13——#209 结论 6 的
 * 「四样装齐」）。
 *
 * == 变量承载（com0-caress.js 同款，#44/#45 实证） ==
 *
 *   - SOURCE:xx → `source:${cid}:${xx}`；UP:xx → `delta:${cid}:${xx}`；
 *     LOSEBASE → `deltabase` 的负值累加；结算都在回合循环（train-loop.js）。
 *   - TEQUIP:43-49（眼罩/绳/口塞/灌肠+肛塞/拘束衣/—/电极）是本族的装备位，
 *     属主 train（ownership/tequip-ownership.yml "43-47"/"49"），域内直写；
 *     桶随 beginTrain 建、endTrain 删。
 *   - T（= T:0，触手回合计数）→ `t:0`：写者是本族 com46/com49 的触手支，
 *     消费者是触手族的 100 号装备持续位（随 J17）——yml/T.yml 建桶
 *     （单字母数组变量，本文件首次写入）。
 *   - NOITEM → `noitem:0`：全库无写点、恒 0（yml/NOITEM.yml 建桶，文件头
 *     有说明）。「ITEM:x == 0 && NOITEM == 0」在当前移植面下等价于
 *     「没有该道具就不可执行」。
 *   - EXP:1（肛门经验）/ EXP:30（被虐快乐经验）/ EXP:50（异常经验）属主
 *     dungeon（ownership/exp-ownership.yml）——跨域写走门面
 *     chara(cid).dungeon.<字段>（#71）；EXP:23/40/41/51 属主 train，直写。
 *
 * == get_adv_com CASE 40 与升格跳转的落点（#213 签名） ==
 *
 * com40 头部的升格跳转：规则体注册进 adv_com_family（CASE 40 → 132
 * 背后位・打屁股）；升格命中时以 com_family.call(升格号) 同位调用。
 * **132 属 J19（追加与高级族）**，这张工单只交规则与跳转位；J19 未实现
 * 期间跳转目标缺失 → 存根占位行 + 返回 1（com132 真身会自置 selectcom =
 * 132，占位期不动 selectcom，J19 实现即自愈）。
 *
 * == equip_com43-49 的接入（本族自带的六个持续效果函数） ==
 *
 * 持续效果由 source-check 结算按链逐位调用——链与族在 com-family.js
 * （EQUIP_COM_CHAIN / equip_com_family），消费循环在
 * event/source-check.js（这张工单接通，缺失位仍落占位行）。11-19（道具族）
 * /53-59（特殊族）/89（重度族）/100/108（触手族）随各自族工单注册。
 *
 * == 三处已核的微妙点（防「顺手修正」） ==
 *
 *   - train_message_a 的 40-42 分支条件 `SELECTCOM == 40 || SELECTCOM == 41
 *     || SELECTCOM == 42 && TFLAG:899 <= 1`：&& 与 || **同优先级、左结合**
 *     （operators.md 优先级表），等价于 (40||41||42) && TFLAG:899<=1
 *     ——三条指令都吃失神检查，不是只钳 42。
 *   - 肛门经验的 EXPLV 档：com46/com49 的**本体**与 equip_com46 都用
 *     EXPLV:n/2（半阈值），唯 equip_com49 用整阈值（EXPLV:2/3/4/5 不除
 *     2）——四处阶梯两形并存，互异不改，不归一。
 *   - 40 号可用性检查的助手判定 ABL:ASSI:20 < 2、41/42 是 < 3（SM 系内部
 *     互异）。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const {
  EQUIP_COM_CHAIN,
  com_able_family,
  com_family,
  equip_com_family,
} = require('#/system/train/com-family');
const { adv_com_family, get_adv_com } = require('#/system/train/com-adv');
const {
  train_message_a_family,
  train_message_b,
  train_message_b_family,
} = require('#/system/train/train-message');
const { chara } = require('#/facade/chara');
const { chara_callname } = require('#/utils/callname-utils');
const { PALAMLV } = require('#/era-utils/palam-level');
const { soiling_cloth_no2 } = require('#/system/train/cloth');
const { clothtype_special_text } = require('#/page/page-clothtype');
// —— 读数缺省处理（未声明下标 undefined → 0，#13；包装层 getter 一律 || 0） ——

const tq = (cid, i) => era.get(`tequip:${cid}:${i}`) || 0;
const set_tq = (cid, i, v) => era.set(`tequip:${cid}:${i}`, v);
const src = (cid, i) => era.get(`source:${cid}:${i}`) || 0;
const set_src = (cid, i, v) => era.set(`source:${cid}:${i}`, v);
const abl = (cid, i) => Math.floor(era.get(`abl:${cid}:${i}`) || 0);
const tal = (cid, i) => era.get(`talent:${cid}:${i}`) || 0;
const palam = (cid, i) => era.get(`palam:${cid}:${i}`) || 0;
const add_lose = (cid, i, v) => era.add(`deltabase:${cid}:${i}`, -v);
const add_up = (cid, i, v) => era.add(`delta:${cid}:${i}`, v);

/** times(v, m)：整数乘小数后截断（math-etc.md，source-check.js 同款） */
const times = (v, m) => Math.floor(v * m);

/**
 * EXPLV（经验等级阈值）：引擎内建，默认 0,1,4,20,50,200（config.md
 * 「EXPLVの初期値」标准值）。无生效的自定义，取默认。PALAMLV 复用
 * ere-utils/palam-level.js。
 */
const EXPLV = [0, 1, 4, 20, 50, 200];

/** NOITEM：全库无写点，恒 0 → 道具持有检查生效 */
const noitem = () => era.get('noitem:0') || 0;

/** 持有检查（各号可用性检查共用的「ITEM:x == 0 && NOITEM == 0」写法） */
const has_item = (i) => (era.get(`item:${i}`) || 0) > 0 || noitem() !== 0;

/** PALAM:i 对 PALAMLV:n 的档位比较用阈值（n = 1..4） */
const palam_below = (cid, i, n) => palam(cid, i) < PALAMLV[n];

/**
 * 百合/断背经验共通段（com40/41/42 的 +2、equip_com43-46/49 的 +1、
 * com48 的 +3——男女一致才发生；经验名直书字面，com0 同款）。
 * @param {number} cid 目标
 * @param {number} player 调教者
 * @param {number} gain 增量
 */
function same_sex_exp(cid, player, gain) {
  if (!tal(cid, 122) && !tal(player, 122)) {
    era.print(`百合经验+${gain}`);
    era.add(`exp:${cid}:40`, gain);
  } else if (tal(cid, 122) && tal(player, 122)) {
    era.print(`断背经验+${gain}`);
    era.add(`exp:${cid}:41`, gain);
  }
}

/**
 * 爱情经验共通段（com40/41/42/44/48 的尾部；E 的取值各指令自定）：
 * CFLAG:2（好感度累计）≥ 1000 且主人亲自调教——40/41/42/44 另要求
 * （ABL:21 ≥ 3 || TALENT:88 受虐狂），48 不要求。
 * @param {number} cid 目标
 * @param {number} gain 增量（E）
 * @param {boolean} [maso_gate] 40/41/42/44 传 true 时叠加抖M/受虐狂门
 */
function love_exp(cid, gain, maso_gate = false) {
  const base_ok = (era.get(`cflag:${cid}:2`) || 0) >= 1000;
  const gate_ok = maso_gate ? abl(cid, 21) >= 3 || tal(cid, 88) !== 0 : true;
  if (base_ok && gate_ok && era_flag.assiplay === 0) {
    era.print(`爱情经验+${gain}`);
    era.add(`exp:${cid}:23`, gain);
  }
}

/**
 * 主人经验（TFLAG:30 += 1）共通段：主人亲自调教且抖M气质达门槛。
 * TFLAG:30 即主人经验计数。
 * @param {number} cid 目标
 * @param {number} maso_min ABL:21 下限（40 为 1、41 为 2、42 为 3、绳持续为 2）
 */
function master_exp(cid, maso_min) {
  if (era_flag.assiplay === 0 && abl(cid, 21) >= maso_min) {
    era.add('tflag:30', 1);
  }
}

/**
 * 紧缚经验档（com43/44 的 LOSEBASE 消费减免）：EXP:51
 * （紧缚经验）越高扣得越少。43/44 用半阈值（EXPLV:3/2、EXPLV:4/2）。
 * @param {number} cid 目标
 * @param {[number, number][]} tiers 三档的 [体力, 气力] 扣减
 * @returns {[number, number]}
 */
function bondage_cost(cid, tiers) {
  const e = era.get(`exp:${cid}:51`) || 0;
  const idx = e < EXPLV[3] / 2 ? 0 : e < EXPLV[4] / 2 ? 1 : 2;
  return tiers[idx];
}

/**
 * 欲情档系数（PALAM:5 对 PALAMLV:1-4，43/44/46/49 的乘法链共形）：
 * 0.80 / 0.90 / 1.00 / 1.10 / 1.20。
 * @param {number} cid 目标
 * @returns {number}
 */
function lust_factor(cid) {
  return palam_below(cid, 5, 1)
    ? 0.8
    : palam_below(cid, 5, 2)
      ? 0.9
      : palam_below(cid, 5, 3)
        ? 1
        : palam_below(cid, 5, 4)
          ? 1.1
          : 1.2;
}

/**
 * 顺从档系数（ABL:10，43/44/46/49 的乘法链共形）：
 * 0.40 / 0.60 / 0.80 / 1.00 / 1.10 / ELSE 1.20。
 * @param {number} cid 目标
 * @returns {number}
 */
function obey_factor(cid) {
  const o = abl(cid, 10);
  return o === 0
    ? 0.4
    : o === 1
      ? 0.6
      : o === 2
        ? 0.8
        : o === 3
          ? 1
          : o === 4
            ? 1.1
            : 1.2;
}

/**
 * 顺从档系数（ABL:10，46/49 的 SOURCE:2 乘法链——肛门系表，与 43/44 的
 * obey_factor 数值不同）：0.80 / 0.90 / 1.00 / 1.10 / 1.20 / ELSE 1.30。
 * @param {number} cid 目标
 * @returns {number}
 */
function anal_obey_factor(cid) {
  const o = abl(cid, 10);
  return o === 0
    ? 0.8
    : o === 1
      ? 0.9
      : o === 2
        ? 1
        : o === 3
          ? 1.1
          : o === 4
            ? 1.2
            : 1.3;
}

/**
 * 抖M气质档系数（ABL:21，43/44 的 SOURCE:10 乘法链）：
 * 0.80 / 1.00 / 1.30 / 1.60 / 2.00 / ELSE 3.00。
 * @param {number} cid 目标
 * @returns {number}
 */
function maso_factor(cid) {
  const m = abl(cid, 21);
  return m === 0
    ? 0.8
    : m === 1
      ? 1
      : m === 2
        ? 1.3
        : m === 3
          ? 1.6
          : m === 4
            ? 2
            : 3;
}

/**
 * 体型三连（魁梧 99 ×0.80 / 娇小 100 ×2.00 / 未熟 135 ×2.00——46/49 的
 * 苦痛侧与 EQUIP 版的 C 侧共形）。
 * @param {number} cid 目标
 * @param {number} v 被乘值
 * @returns {number}
 */
function body_factor(cid, v) {
  let out = v;
  if (tal(cid, 99)) {
    out = times(out, 0.8);
  }
  if (tal(cid, 100)) {
    out = times(out, 2);
  }
  if (tal(cid, 135)) {
    out = times(out, 2);
  }
  return out;
}

/**
 * 肛门敏感/钝感修正（TALENT:105 ×1.50 / 106 ×0.60——46/49 对
 * SOURCE:6/13/14 三格共乘。名字表 105=肛门钝感、106=肛门敏感，系数与
 * 名字的对应保持不动，不「修正」）。
 * @param {number} cid 目标
 * @param {number} v 被乘值
 * @returns {number}
 */
function anal_sense_factor(cid, v) {
  if (tal(cid, 105)) {
    return times(v, 1.5);
  }
  if (tal(cid, 106)) {
    return times(v, 0.6);
  }
  return v;
}

// —— com40：打屁股 ——

/**
 * PALAM:9（苦痛）档 → SOURCE:6（40 为 300-1800、41 为 1000-4000、
 * 42 为 3000-4500——三指令各表，见各调用处）
 */
const PAIN_LADDERS = {
  40: [300, 500, 800, 1200, 1800],
  41: [1000, 1500, 2200, 3000, 4000],
  42: [3000, 3300, 3600, 4000, 4500],
};

/** 苦痛档取值：PALAM:9 对 PALAMLV:1-4 的五档 */
function pain_source(cid, com) {
  const ladder = PAIN_LADDERS[com];
  const idx = palam_below(cid, 9, 1)
    ? 0
    : palam_below(cid, 9, 2)
      ? 1
      : palam_below(cid, 9, 3)
        ? 2
        : palam_below(cid, 9, 4)
          ? 3
          : 4;
  return ladder[idx];
}

/**
 * com40：打屁股。头部带升格跳转（→ CASE 40）。
 * @returns {Promise<number>} 返回 1（升格时为跳转目标的返回值）
 */
async function com40() {
  const target = era_flag.target;
  const player = era_flag.player;

  // 头部升格跳转——规则在 adv_com_family 的 40 号注册（文件尾），升格目标
  // 为 132；跳转通过 com_family 分发，返回值由调用方透传。
  const upgraded = await get_adv_com(40);
  if (upgraded !== 40) {
    return jump_to_advanced(upgraded);
  }

  era.print('打屁股'); // 指令名标题行
  // B 文（本族 B 分支在本文件尾注册）
  await train_message_b();

  // 実際には苦痛があるため（LOSEBASE 负向累加，见文件头）
  add_lose(target, 0, 80);
  add_lose(target, 1, 40);

  // —— SOURCE 计算 ——
  set_src(target, 12, 200); // SOURCE:12 露出
  set_src(target, 14, 500); // SOURCE:14 逃离
  set_src(target, 6, pain_source(target, 40)); // 苦痛档

  // —— 经验上升 ——
  same_sex_exp(target, player, 2); // 百合/断背 +2
  master_exp(target, 1); // ASSIPLAY == 0 && ABL:21 >= 1 → TFLAG:30 += 1

  love_exp(target, 1, true); // CFLAG:2 >= 1000 && (ABL:21>=3||受虐狂)

  return 1;
}

/**
 * com41：鞭。
 * @returns {Promise<number>} 返回 1
 */
async function com41() {
  const target = era_flag.target;
  const player = era_flag.player;

  era.print('鞭');
  await train_message_b();

  // 苦痛在身、体力气力扣得更重
  add_lose(target, 0, 100);
  add_lose(target, 1, 80);

  // —— SOURCE 计算 ——
  set_src(target, 14, 1000);
  set_src(target, 6, pain_source(target, 41));

  same_sex_exp(target, player, 2);
  master_exp(target, 2); // ABL:21 >= 2

  love_exp(target, 1, true);

  return 1;
}

/**
 * com42：针。
 * @returns {Promise<number>} 返回 1
 */
async function com42() {
  const target = era_flag.target;
  const player = era_flag.player;

  era.print('针');
  await train_message_b();

  // （LOSEBASE:0 += 0 是空扣，不落调用）；气力 20
  add_lose(target, 1, 20);

  // —— SOURCE 计算 ——
  set_src(target, 14, 1000);
  set_src(target, 6, pain_source(target, 42));

  same_sex_exp(target, player, 2);
  master_exp(target, 3); // ABL:21 >= 3

  love_exp(target, 1, true);

  return 1;
}

/**
 * 升格跳转（#213）：升格号在 com_family 内分发——
 * 升格表能返回的每个号都有真身，直调目标号并透传返回值；whenMissing 1
 * 即「目标缺失时返回 1」（本不该发生，防御语义）。
 * @param {number} com 升格后的 COM 号
 * @returns {Promise<number>}
 */
async function jump_to_advanced(com) {
  return com_family.call(com, { whenMissing: 1 });
}

// —— com43：眼罩 ——

/**
 * 欲情 × 顺从 × 抖M 的三连乘法链：com43 与 com44 共用系数表，
 * SOURCE:10 均通过这条链计算。
 * @param {number} cid 目标
 * @param {number} base 基础值（43 为 250、44 为 800）
 * @returns {number} 三档连乘后的值
 */
function obey_maso_chain(cid, base) {
  let v = times(base, lust_factor(cid)); // PALAM:5 欲情
  v = times(v, obey_factor(cid)); // ABL:10 顺从
  v = times(v, maso_factor(cid)); // ABL:21 抖M气质
  return v;
}

/**
 * com43：眼罩。装着/解除切换（TEQUIP:43 取反）。
 * @returns {Promise<number>} 返回 1
 */
async function com43() {
  const target = era_flag.target;

  era.print('眼罩');
  await train_message_b();

  // LOSEBASE:0 += 0 不产生扣减；紧缚经验减免采用半阈值。
  const [, lose1] = bondage_cost(target, [
    [0, 150],
    [0, 120],
    [0, 90],
  ]);
  add_lose(target, 1, lose1);

  // —— SOURCE 计算 ——
  // 基础三格 → 欲情/顺从/抖M 三连 → 倒错的（TALENT:80）×2
  let a = obey_maso_chain(target, 250);
  if (tal(target, 80)) {
    a = times(a, 2);
  }
  set_src(target, 10, a); // SOURCE:10 恭顺追加
  set_src(target, 12, 1000); // SOURCE:12 露出
  // SOURCE:14 = 500 → 胆怯（TALENT:10）×2
  set_src(target, 14, tal(target, 10) ? times(500, 2) : 500);

  // —— 经验上升 ——
  era.add(`exp:${target}:51`, 2); // EXP:51 紧缚经验
  era.print('紧缚经验＋２'); // 保留全角字面

  // 眼罩の着脱
  set_tq(target, 43, 1 - tq(target, 43));

  return 1;
}

/**
 * com44：绳子。装着/解除切换（TEQUIP:44 取反）。
 * @returns {Promise<number>} 返回 1
 */
async function com44() {
  const target = era_flag.target;

  // 触手紧缚/绳 二支
  era.print(tq(target, 90) ? '触手紧缚' : '绳');
  await train_message_b();

  // 紧缚经验减免（半阈值，两 BASE 都扣）
  const [lose0, lose1] = bondage_cost(target, [
    [100, 150],
    [80, 120],
    [60, 90],
  ]);
  add_lose(target, 0, lose0);
  add_lose(target, 1, lose1);

  // —— SOURCE 计算 ——
  set_src(target, 6, 800); // SOURCE:6 疼痛
  set_src(target, 10, obey_maso_chain(target, 800));
  set_src(target, 13, 500); // SOURCE:13 屈从
  set_src(target, 14, 500); // SOURCE:14 逃离
  // 倒错的 ×2（SOURCE:10 再乘）
  if (tal(target, 80)) {
    set_src(target, 10, times(src(target, 10), 2));
  }

  // —— 经验上升 ——
  era.add(`exp:${target}:51`, 5);
  era.print('紧缚经验＋５');

  // 绳子の着脱 + 触手调教中重置触手回合计数（T:0）
  set_tq(target, 44, 1 - tq(target, 44));
  if (tq(target, 90)) {
    era.set('t:0', 0);
  }

  love_exp(target, 1, true);

  return 1;
}

/**
 * com45：口塞。装着/解除切换（TEQUIP:45 取反）。
 * TEQUIP:45 是 kojo_message_com 头部检查之一（#213 接触面）：
 * TEQUIP:45 && SELECTCOM != 45 时跳过口上；本指令负责切换装备位。
 * @returns {Promise<number>} 返回 1
 */
async function com45() {
  const target = era_flag.target;

  era.print('口塞');
  await train_message_b();

  // 紧缚经验减免（半阈值）
  const [lose0, lose1] = bondage_cost(target, [
    [80, 100],
    [60, 80],
    [40, 60],
  ]);
  add_lose(target, 0, lose0);
  add_lose(target, 1, lose1);

  // —— SOURCE 计算 ——
  set_src(target, 6, 50); // SOURCE:6 疼痛
  set_src(target, 7, 50); // SOURCE:7 成瘾追加
  set_src(target, 12, 80); // SOURCE:12 露出
  set_src(target, 13, 150); // SOURCE:13 屈从
  set_src(target, 14, 80); // SOURCE:14 逃离
  set_src(target, 16, 80); // SOURCE:16 恭顺追加

  // —— 经验上升 ——
  era.add(`exp:${target}:51`, 2);
  era.print('紧缚经验＋２');

  // 口塞の着脱
  set_tq(target, 45, 1 - tq(target, 45));

  return 1;
}

// —— com46：灌肠+肛塞 ——

/** ABL:3（肛门感觉）六档 → [SOURCE:2, SOURCE:13 基础] */
const ANAL_LADDER = [
  [80, 300],
  [250, 800],
  [600, 1400],
  [1000, 1800],
  [1300, 2100],
  [1700, 2400],
];

/** ABL:21（抖M气质）六档 → [S6, S8, S13, S14, S15] */
const MASO_WIDE_LADDER = [
  [2000, 1000, 200, 1000, 2000],
  [1600, 2000, 500, 1000, 1000],
  [1200, 1000, 800, 1000, 500],
  [800, 1000, 1200, 1000, 100],
  [600, 1000, 1500, 1000, 0],
  [400, 1000, 2000, 1000, 0],
];

/**
 * com46：灌肠+肛塞。装着/解除切换（TEQUIP:46 取反）。
 * @returns {Promise<number>} 返回 1
 */
async function com46() {
  const target = era_flag.target;

  // 触手灌肠/灌肠＋肛塞 二支
  era.print(tq(target, 90) ? '触手灌肠' : '灌肠＋肛塞');
  await train_message_b();

  add_lose(target, 0, 60);
  add_lose(target, 1, 150);

  // —— SOURCE 计算 ——
  // ABL:3 六档（S2/S13）
  const anal = ANAL_LADDER[Math.min(abl(target, 3), 5)];
  set_src(target, 2, anal[0]);
  set_src(target, 13, anal[1]);

  // ABL:21 六档——**整组覆写**（含刚由 ABL:3 写下的 S13）
  const wide = MASO_WIDE_LADDER[Math.min(abl(target, 21), 5)];
  set_src(target, 6, wide[0]);
  set_src(target, 8, wide[1]);
  set_src(target, 13, wide[2]);
  set_src(target, 14, wide[3]);
  set_src(target, 15, wide[4]);

  // PALAM:3（润滑）：S2 ×0.4-1.8 + S6 += 800/500/300/120/100
  const wet = palam_below(target, 3, 1)
    ? 0.4
    : palam_below(target, 3, 2)
      ? 0.8
      : palam_below(target, 3, 3)
        ? 1
        : palam_below(target, 3, 4)
          ? 1.4
          : 1.8;
  set_src(target, 2, times(src(target, 2), wet));
  set_src(
    target,
    6,
    src(target, 6) +
      (palam_below(target, 3, 1)
        ? 800
        : palam_below(target, 3, 2)
          ? 500
          : palam_below(target, 3, 3)
            ? 300
            : palam_below(target, 3, 4)
              ? 120
              : 100),
  );

  // S2 再乘欲情 × 顺从（肛门系表）
  set_src(target, 2, times(src(target, 2), lust_factor(target)));
  set_src(target, 2, times(src(target, 2), anal_obey_factor(target)));

  // 体型三连（S6）
  set_src(target, 6, body_factor(target, src(target, 6)));

  // 肛门钝感/敏感（S6/S13/S14 三格共乘）
  set_src(target, 6, anal_sense_factor(target, src(target, 6)));
  set_src(target, 13, anal_sense_factor(target, src(target, 13)));
  set_src(target, 14, anal_sense_factor(target, src(target, 14)));

  // 看重贞操的处女（EXP:0 == 0 && TALENT:30）→ S13 /= 3
  if ((era.get(`exp:${target}:0`) || 0) === 0 && tal(target, 30)) {
    set_src(target, 13, Math.floor(src(target, 13) / 3));
  }

  // —— 经验上升 ——
  chara(target).dungeon.肛门经验 += 5; // EXP:1（属主 dungeon，走门面）
  era.print('肛门经验＋5'); // 保留全角＋和半角5

  // 調教時の排泄が始めてだった場合（CFLAG:4 计数 + 异常经验）
  if (tq(target, 46) && (era.get(`cflag:${target}:4`) || 0) === 0) {
    let x = 1;
    if (tq(target, 53)) {
      // ビデオ録画中（TEQUIP:53）→ +2 且计数置 2
      x += 1;
      era.set(`cflag:${target}:4`, 2);
    } else {
      era.set(`cflag:${target}:4`, 1);
    }
    era.print(`异常经验+${x}`); // PRINTFORML
    chara(target).dungeon.异常经验 += x; // EXP:50（属主 dungeon）
  } else if (
    // 初めてではないが録画中（计数 1 → 2）
    tq(target, 46) &&
    (era.get(`cflag:${target}:4`) || 0) === 1 &&
    tq(target, 53)
  ) {
    era.print('异常经验+1');
    chara(target).dungeon.异常经验 += 1;
    era.set(`cflag:${target}:4`, 2);
  }

  // 触手灌肠処理（T:0 清零）
  if (tq(target, 90)) {
    era.set('t:0', 0);
  }
  // 插入侧（当前未装备）且触手调教 → A 口污垢置位
  if (tq(target, 46) === 0 && tq(target, 90)) {
    era.set(`stain:${target}:4`, (era.get(`stain:${target}:4`) || 0) | 2 | 4);
  }

  // 着衣おもらし処理（解除侧）：#215 真身，调教内调用走 tflag:45
  if (tq(target, 46) && era.get('flag:37')) {
    await soiling_cloth_no2(target);
  }

  // 浣腸プラグの着脱
  set_tq(target, 46, 1 - tq(target, 46));

  return 1;
}

/**
 * com47：拘束衣。穿着者是**助手**，
 * TEQUIP:47 装在 TARGET 身上，描写读取助手显示名
 * SAVESTR:ASSI。解除时提前返回，不追加修正。
 * @returns {Promise<number>} 返回 1
 */
async function com47() {
  const target = era_flag.target;

  era.print('束缚衣');
  await train_message_b();

  // 終了時は修正无：已穿着 → 脱掉即返回
  if (tq(target, 47)) {
    set_tq(target, 47, 0);
    return 1;
  }

  // LOSEBASE:0 += 0 不产生扣减；抖M气质减免（0 → 60、≤2 → 45、
  // 其余 30——阶梯是「== 0 / <= 2 / ELSE」，与经验阈值无关）
  const m = abl(target, 21);
  add_lose(target, 1, m === 0 ? 60 : m <= 2 ? 45 : 30);

  // 拘束衣ルックの装着
  set_tq(target, 47, 1);

  return 1;
}

// —— com48：践踏 ——

/** ABL:0（阴蒂感觉）六档 → SOURCE:0 */
const CLIT_LADDER = [30, 100, 200, 500, 1000, 1500];

/** ABL:21 六档 → [SOURCE:0 系数, SOURCE:14 系数] */
const MASO_PAIR_LADDER = [
  [1, 1],
  [1.2, 0.8],
  [1.5, 0.6],
  [1.8, 0.4],
  [2.2, 0.2],
  [3, 0],
];

/**
 * com48：践踏。
 * @returns {Promise<number>} 返回 1
 */
async function com48() {
  const target = era_flag.target;
  const player = era_flag.player;

  era.print('践踏');
  await train_message_b();

  add_lose(target, 0, 10);
  add_lose(target, 1, 60);

  // —— SOURCE 计算 ——
  set_src(target, 12, 150); // SOURCE:12 露出
  set_src(target, 14, 400); // SOURCE:14 逃离
  // ABL:0 六档
  set_src(target, 0, CLIT_LADDER[Math.min(abl(target, 0), 5)]);
  // ABL:21 对 S0/S14 的配对乘法链
  const [m0, m14] = MASO_PAIR_LADDER[Math.min(abl(target, 21), 5)];
  set_src(target, 0, times(src(target, 0), m0));
  set_src(target, 14, times(src(target, 14), m14));

  // —— 经验上升 ——
  // 被虐快乐经验（EXP:30，属主 dungeon 走门面）：受虐狂或双高 +3 /
  // 欲望≥3 且抖M≥1 +2 / 欲望≥3 或抖M≥1 +1
  if (tal(target, 88) === 1 || (abl(target, 11) >= 3 && abl(target, 21) >= 3)) {
    era.print('被虐快乐经验+3'); // PRINTFORML %EXPNAME:30%+3
    chara(target).dungeon.被虐快乐经验 += 3;
  } else if (abl(target, 11) >= 3 && abl(target, 21) >= 1) {
    era.print('被虐快乐经验+2');
    chara(target).dungeon.被虐快乐经验 += 2;
  } else if (abl(target, 11) >= 3 || abl(target, 21) >= 1) {
    era.print('被虐快乐经验+1');
    chara(target).dungeon.被虐快乐经验 += 1;
  }

  same_sex_exp(target, player, 3); // 百合/断背 +3

  // 足交精通检查由本族的 event_seitsu_ashikoki 处理
  await event_seitsu_ashikoki();

  // 爱情经验：男人（TALENT:122）E = 2、其余 E = 1，无抖M条件
  love_exp(target, tal(target, 122) ? 2 : 1);

  return 1;
}

/**
 * 精通（足交）：目标是男人/扶她、
 * 目标未熟（TALENT:135）且阴蒂感觉 5 以上、非触手/兽奸、目标对调教者的
 * 关系（RELATION）≥ 150 → 精通文本 + 解除未熟。
 * @returns {Promise<number>} 返回 0/1
 */
async function event_seitsu_ashikoki() {
  const target = era_flag.target;
  const player = era_flag.player;

  // 关系表以调教者 ID 为键；性别与未熟条件检查的是
  // TARGET：男人或扶她、且未熟（与 48 号可用性检查的对象条件一致）
  if ((!tal(target, 121) && !tal(target, 122)) || !tal(target, 135)) {
    return 0;
  }
  // Ｃ感度 5 以上、非触手调教/兽奸
  if (abl(target, 0) <= 4 || tq(target, 90) || tq(target, 89)) {
    return 0;
  }
  // 「調教対象」から「調教者」への関係が150以上
  if ((era.get(`relation:${target}:${player}`) || 0) < 150) {
    return 0;
  }
  // 提示句保留全角逗号
  era.print(
    `${chara_callname(player)}的阴茎被践踏着，${chara_callname(target)}开始精通这个了…`,
  );
  // TALENT:135 = 0（未熟解除；属主 train，域内直写）
  era.set(`talent:${target}:135`, 0);

  return 1;
}

// —— com49：肛门电极 ——

/** ABL:3（肛门感觉）六档 → [SOURCE:2, SOURCE:13 基础] */
const ELECTRODE_LADDER = [
  [200, 1000],
  [500, 2000],
  [900, 3000],
  [1800, 5000],
  [2400, 8000],
  [3800, 12000],
];

/** EXP:1（肛门经验）六档 → [SOURCE:2 系数, SOURCE:6 直填]（半阈值） */
const ANAL_EXP_LADDER = [
  [0.5, 2000],
  [1, 300],
  [1.1, 50],
  [1.2, 10],
  [1.4, 0],
  [1.6, 0],
];

/**
 * com49：肛门电极。装着/解除切换（TEQUIP:49 取反）。
 * @returns {Promise<number>} 返回 1
 */
async function com49() {
  const target = era_flag.target;

  era.print('肛门电极');
  await train_message_b();

  add_lose(target, 0, 100);
  add_lose(target, 1, 150);

  // —— SOURCE 计算 ——
  // ABL:3 六档（S2/S13）
  const anal = ELECTRODE_LADDER[Math.min(abl(target, 3), 5)];
  set_src(target, 2, anal[0]);
  set_src(target, 13, anal[1]);

  // EXP:1 六档（**半阈值** EXPLV:n/2——46/49 两个本体同形）：S2 系数
  // × S6 直填；整阈值只在 equip_com49 出现（见下）
  const e = era.get(`exp:${target}:1`) || 0;
  const exp_idx =
    e < EXPLV[1]
      ? 0
      : e < EXPLV[2] / 2
        ? 1
        : e < EXPLV[3] / 2
          ? 2
          : e < EXPLV[4] / 2
            ? 3
            : e < EXPLV[5] / 2
              ? 4
              : 5;
  set_src(target, 2, times(src(target, 2), ANAL_EXP_LADDER[exp_idx][0]));
  set_src(target, 6, ANAL_EXP_LADDER[exp_idx][1]);

  // PALAM:3（润滑）：S2 ×0.4-1.8 + S6 += 800/500/300/120/100
  const wet = palam_below(target, 3, 1)
    ? 0.4
    : palam_below(target, 3, 2)
      ? 0.8
      : palam_below(target, 3, 3)
        ? 1
        : palam_below(target, 3, 4)
          ? 1.4
          : 1.8;
  set_src(target, 2, times(src(target, 2), wet));
  set_src(
    target,
    6,
    src(target, 6) +
      (palam_below(target, 3, 1)
        ? 800
        : palam_below(target, 3, 2)
          ? 500
          : palam_below(target, 3, 3)
            ? 300
            : palam_below(target, 3, 4)
              ? 120
              : 100),
  );

  // S2 再乘欲情 × 顺从（肛门系表）
  set_src(target, 2, times(src(target, 2), lust_factor(target)));
  set_src(target, 2, times(src(target, 2), anal_obey_factor(target)));

  // 体型三连（S6）：娇小体形由 TALENT:100 表示，
  // 与 com46 共用 body_factor。
  set_src(target, 6, body_factor(target, src(target, 6)));

  // 肛门钝感/敏感（S6/S13/S14）
  set_src(target, 6, anal_sense_factor(target, src(target, 6)));
  set_src(target, 13, anal_sense_factor(target, src(target, 13)));
  set_src(target, 14, anal_sense_factor(target, src(target, 14)));

  // 看重贞操的处女 → S13 /= 3
  if ((era.get(`exp:${target}:0`) || 0) === 0 && tal(target, 30)) {
    set_src(target, 13, Math.floor(src(target, 13) / 3));
  }

  // —— 经验上升 ——
  chara(target).dungeon.肛门经验 += 5; // EXP:1（属主 dungeon，走门面）
  era.print('肛门经验＋５');

  // 電極の着脱
  set_tq(target, 49, 1 - tq(target, 49));

  return 1;
}

// —— equip_com43–49：装备持续效果（48 无持续位）——
//    调用循环在 event/source-check.js，按装备位逐项检查；
//    调用顺序由 com-family.js 的 EQUIP_COM_CHAIN 定义。

/**
 * equip_com43：眼罩装着中。每回合的持续 SOURCE/UP。
 * @returns {Promise<number>} 返回 1
 */
async function equip_com43() {
  const target = era_flag.target;
  const player = era_flag.player;

  era.print('＜眼罩装着中＞'); // PRINTL

  // LOSEBASE:0 += 0 不产生扣减；紧缚经验减免采用半阈值。
  const [, lose1] = bondage_cost(target, [
    [0, 100],
    [0, 80],
    [0, 60],
  ]);
  add_lose(target, 1, lose1);

  // A = 250 / B = 1000 / C = 500
  // 欲情 × 顺从 × 抖M 三连 + 倒错 ×2（A）
  let a = obey_maso_chain(target, 250);
  if (tal(target, 80)) {
    a = times(a, 2);
  }
  // 胆怯 ×2（C）
  const c = tal(target, 10) ? times(500, 2) : 500;

  // 三格累加（SOURCE 是「+=」——叠在本回合指令已写的值上）
  set_src(target, 10, src(target, 10) + a);
  set_src(target, 12, src(target, 12) + 1000);
  set_src(target, 14, src(target, 14) + c);

  // 直写 UP（欲情 / 恐怖——UP:10 吃的是 SOURCE:14 的逃离值）
  add_up(target, 5, a);
  add_up(target, 10, src(target, 14));

  // —— 经验上升 ——
  same_sex_exp(target, player, 1);
  era.add(`exp:${target}:51`, 1); // 紧缚经验
  era.print('紧缚经验＋１');

  return 1;
}

/** ABL:21（抖M气质）六档 → A（绳子持续效果） */
const ROPE_MASO_LADDER = [60, 180, 300, 480, 700, 850];

/**
 * equip_com44：绳子紧缚中。
 * @returns {Promise<number>} 返回 0
 *   持续效果已写入变量；调用方不读取返回值。
 */
async function equip_com44() {
  const target = era_flag.target;
  const player = era_flag.player;

  era.print(tq(target, 90) ? '＜触手紧缚中＞' : '＜紧缚中＞');

  // 紧缚经验减免（半阈值）
  const [lose0, lose1] = bondage_cost(target, [
    [50, 100],
    [40, 80],
    [30, 60],
  ]);
  add_lose(target, 0, lose0);
  add_lose(target, 1, lose1);

  // A = 抖M档 → 倒错 ×2 → 欲情倍率
  let a = ROPE_MASO_LADDER[Math.min(abl(target, 21), 5)];
  if (tal(target, 80)) {
    a = times(a, 2);
  }
  a = times(a, lust_factor(target));

  // 四格累加
  set_src(target, 6, src(target, 6) + a);
  set_src(target, 12, src(target, 12) + a);
  set_src(target, 13, src(target, 13) + a);
  set_src(target, 14, src(target, 14) + a);

  // —— 经验上升 ——
  same_sex_exp(target, player, 1);
  master_exp(target, 2); // ASSIPLAY == 0 && ABL:21 >= 2

  // 触手调教中 T:0 += 1
  if (tq(target, 90)) {
    era.add('t:0', 1);
  }

  era.add(`exp:${target}:51`, 2);
  era.print('紧缚经验＋２');

  return 0; // 持续效果已写入变量，返回值不参与结算
}

/** ABL:21 六档 → A（口塞持续效果） */
const GAG_MASO_LADDER = [40, 120, 250, 450, 600, 750];

/**
 * equip_com45：口塞装备中。
 * @returns {Promise<number>} 返回 0
 */
async function equip_com45() {
  const target = era_flag.target;
  const player = era_flag.player;

  era.print('＜口塞装备中＞');

  // 紧缚经验减免采用整阈值 EXPLV:3/EXPLV:4；
  // 与 com45 本体采用的半阈值不同。
  const e51 = era.get(`exp:${target}:51`) || 0;
  const [lose0, lose1] =
    e51 < EXPLV[3] ? [50, 100] : e51 < EXPLV[4] ? [40, 80] : [30, 60];
  add_lose(target, 0, lose0);
  add_lose(target, 1, lose1);

  // 抖M档 → 欲情倍率
  let a = times(
    GAG_MASO_LADDER[Math.min(abl(target, 21), 5)],
    lust_factor(target),
  );

  // 四格累加
  set_src(target, 12, src(target, 12) + a);
  set_src(target, 13, src(target, 13) + a);
  set_src(target, 14, src(target, 14) + a);
  set_src(target, 16, src(target, 16) + a);

  // —— 经验上升 ——
  same_sex_exp(target, player, 1);
  era.add(`exp:${target}:51`, 1);
  era.print('紧缚经验＋１');

  return 0; // 持续效果已写入变量，返回值不参与结算
}

/**
 * equip_com46：灌肠＋肛塞插入中。
 * @returns {Promise<number>} 返回 0
 */
async function equip_com46() {
  const target = era_flag.target;
  const player = era_flag.player;

  era.print(tq(target, 90) ? '＜灌肠触手插入中＞' : '＜灌肠＋肛塞插入中＞');

  add_lose(target, 0, 100);
  add_lose(target, 1, 80);

  // —— SOURCE 计算 ——
  // A/B = ABL:3 六档（与本体同表）
  const [a_base, b_base] = ANAL_LADDER[Math.min(abl(target, 3), 5)];

  // EXP:1 六档——**半阈值**（EXPLV:2/2 起），与 equip_com49 的整
  // 阈值互异（文件头「微妙点」第二条）
  const e = era.get(`exp:${target}:1`) || 0;
  const exp_idx =
    e < EXPLV[1]
      ? 0
      : e < EXPLV[2] / 2
        ? 1
        : e < EXPLV[3] / 2
          ? 2
          : e < EXPLV[4] / 2
            ? 3
            : e < EXPLV[5] / 2
              ? 4
              : 5;
  const exp_factor = [0.5, 1, 1.1, 1.2, 1.4, 1.6][exp_idx];
  const c_add = [2000, 300, 50, 10, 0, 0][exp_idx];
  let a = times(a_base, exp_factor);

  // 润滑：A × 系数 + C += 800/500/300/120/100
  const wet = palam_below(target, 3, 1)
    ? 0.4
    : palam_below(target, 3, 2)
      ? 0.8
      : palam_below(target, 3, 3)
        ? 1
        : palam_below(target, 3, 4)
          ? 1.4
          : 1.8;
  a = times(a, wet);
  const c_wet =
    c_add +
    (palam_below(target, 3, 1)
      ? 800
      : palam_below(target, 3, 2)
        ? 500
        : palam_below(target, 3, 3)
          ? 300
          : palam_below(target, 3, 4)
            ? 120
            : 100);

  // 欲情 × 顺从（肛门系表）
  a = times(a, lust_factor(target));
  a = times(a, anal_obey_factor(target));

  // 体型三连（C）
  const c = body_factor(target, c_wet);

  // 肛门钝感/敏感——乘在**当前 SOURCE 格**上（叠完本体写的值）
  set_src(target, 6, anal_sense_factor(target, src(target, 6)));
  set_src(target, 13, anal_sense_factor(target, src(target, 13)));
  set_src(target, 14, anal_sense_factor(target, src(target, 14)));

  // 累加（注意 SOURCE:14 += B、不是 C）
  set_src(target, 2, src(target, 2) + a);
  set_src(target, 13, src(target, 13) + b_base);
  set_src(target, 6, src(target, 6) + c);
  set_src(target, 14, src(target, 14) + b_base);

  // 看重贞操的处女 → S13 /= 3
  if ((era.get(`exp:${target}:0`) || 0) === 0 && tal(target, 30)) {
    set_src(target, 13, Math.floor(src(target, 13) / 3));
  }

  // —— 经验上升 ——
  chara(target).dungeon.肛门经验 += 3; // EXP:1 += 3（属主 dungeon）
  era.print('肛门经验＋３');
  same_sex_exp(target, player, 1);

  // 触手调教中 T:0 += 1
  if (tq(target, 90)) {
    era.add('t:0', 1);
  }

  return 0; // 持续效果已写入变量，返回值不参与结算
}

/** ABL:21 六档 → [SOURCE:11, SOURCE:10, SOURCE:15] 增量 */
const BONDAGE_SUIT_LADDER = [
  [0, 0, 100],
  [50, 150, 0],
  [100, 300, 0],
  [150, 600, 0],
  [200, 1000, 0],
  [300, 2000, 0],
];

/** ABL:ASSI:20（助手的抖S气质）七档系数 */
const ASSI_S_LADDER = [0.2, 0.5, 1, 1.5, 2.5, 3, 3];

/**
 * equip_com47：拘束衣穿着中。
 * @returns {Promise<number>} 返回 1
 */
async function equip_com47() {
  const target = era_flag.target;
  const assi = era_flag.assi;

  // PRINTFORML ＜%SAVESTR:ASSI%束缚衣着装中＞
  era.print(`＜${chara_callname(assi)}束缚衣着装中＞`);

  // 抖M气质减免（== 0 / <= 2 / ELSE）
  const m = abl(target, 21);
  add_lose(target, 1, m === 0 ? 60 : m <= 2 ? 45 : 30);

  // —— SOURCE 计算 ——
  // A = 300 → 按恐怖（PALAM:10）档位乘系数
  let a = 300;
  const fear = palam_below(target, 10, 1)
    ? 1
    : palam_below(target, 10, 2)
      ? 1.1
      : palam_below(target, 10, 3)
        ? 1.2
        : palam_below(target, 10, 4)
          ? 1.3
          : 1.4;
  a = times(a, fear);

  // 抖M六档（S11/S10/S15 三格增量各档直书；0 档另有 A ×0.60、
  // 1 档 ×1.00、2 档 ×1.60——A 的系数只在 0/1/2 档出现，3 档起没有 TIMES 行）
  const maso_idx = Math.min(abl(target, 21), 5);
  const [s11, s10, s15] = BONDAGE_SUIT_LADDER[maso_idx];
  set_src(target, 11, src(target, 11) + s11);
  set_src(target, 10, src(target, 10) + s10);
  set_src(target, 15, src(target, 15) + s15);
  if (maso_idx === 0) {
    a = times(a, 0.6);
  } else if (maso_idx === 1) {
    a = times(a, 1); // （×1.00 原样保留）
  } else if (maso_idx === 2) {
    a = times(a, 1.6);
  }

  // 助手的抖S气质七档（≥5 落 3.00）
  a = times(a, ASSI_S_LADDER[Math.min(abl(assi, 20), 6)]);

  // 胆怯 ×2
  if (tal(target, 10)) {
    a = times(a, 2);
  }

  // 累加 + 直写 UP:10
  set_src(target, 14, src(target, 14) + a);
  add_up(target, 10, src(target, 14));

  return 1; // 此持续效果不增加经验
}

/**
 * ABL:3 六档 → [A, B]（肛门电极持续效果）
 */
const ELECTRODE_EQUIP_LADDER = [
  [250, 1000],
  [600, 2000],
  [1200, 3000],
  [1900, 5000],
  [2500, 8000],
  [3900, 12000],
];

/**
 * equip_com49：肛门电极插入中。
 * @returns {Promise<number>} 返回 1
 */
async function equip_com49() {
  const target = era_flag.target;
  const player = era_flag.player;

  era.print('＜肛门电极插入中＞');

  add_lose(target, 0, 80);
  add_lose(target, 1, 120);

  // —— SOURCE 计算 ——
  const [a_base, b_base] = ELECTRODE_EQUIP_LADDER[Math.min(abl(target, 3), 5)];

  // EXP:1 六档——**整阈值**（EXPLV:2/3/4/5 不除 2，全库唯一一处）
  const e = era.get(`exp:${target}:1`) || 0;
  const exp_idx =
    e < EXPLV[1]
      ? 0
      : e < EXPLV[2]
        ? 1
        : e < EXPLV[3]
          ? 2
          : e < EXPLV[4]
            ? 3
            : e < EXPLV[5]
              ? 4
              : 5;
  const exp_factor = [0.5, 1, 1.1, 1.2, 1.4, 1.6][exp_idx];
  const c_add = [2000, 300, 50, 10, 0, 0][exp_idx];
  let a = times(a_base, exp_factor);

  // 润滑
  const wet = palam_below(target, 3, 1)
    ? 0.4
    : palam_below(target, 3, 2)
      ? 0.8
      : palam_below(target, 3, 3)
        ? 1
        : palam_below(target, 3, 4)
          ? 1.4
          : 1.8;
  a = times(a, wet);
  const c_wet =
    c_add +
    (palam_below(target, 3, 1)
      ? 800
      : palam_below(target, 3, 2)
        ? 500
        : palam_below(target, 3, 3)
          ? 300
          : palam_below(target, 3, 4)
            ? 120
            : 100);

  // 欲情 × 顺从（肛门系表）
  a = times(a, lust_factor(target));
  a = times(a, anal_obey_factor(target));

  // 体型三连（C）
  const c = body_factor(target, c_wet);

  // 肛门钝感/敏感（当前 SOURCE 格）
  set_src(target, 6, anal_sense_factor(target, src(target, 6)));
  set_src(target, 13, anal_sense_factor(target, src(target, 13)));
  set_src(target, 14, anal_sense_factor(target, src(target, 14)));

  // 累加（49 的持续效果没有 SOURCE:14 += B，与 46 不同）
  set_src(target, 2, src(target, 2) + a);
  set_src(target, 13, src(target, 13) + b_base);
  set_src(target, 6, src(target, 6) + c);

  // 看重贞操的处女 → S13 /= 3
  if ((era.get(`exp:${target}:0`) || 0) === 0 && tal(target, 30)) {
    set_src(target, 13, Math.floor(src(target, 13) / 3));
  }

  // 看重贞操的处女 → S13 /= 3
  if ((era.get(`exp:${target}:0`) || 0) === 0 && tal(target, 30)) {
    set_src(target, 13, Math.floor(src(target, 13) / 3));
  }

  // —— 经验上升 ——
  chara(target).dungeon.肛门经验 += 5;
  era.print('肛门经验＋５');
  same_sex_exp(target, player, 1);

  // 触手调教中 T:0 += 1
  if (tq(target, 90)) {
    era.add('t:0', 1);
  }

  return 1; // 与 equip_com43/47 一样返回 1
}

// —— com_able_family 的 40–49 号可用性检查 ——

/** SM 系过滤：FLAG:25 的 bit 16（爱抚系是 bit 1，com0 同表不同位） */
const sm_filtered = () => ((era.get('flag:25') || 0) & 16) !== 0;

/**
 * 场景四连检查：触手 90 / 使役 88 / 兽奸 89 / 死斗场 55。
 * 每个条件都独立阻止执行，检查顺序不影响结果；
 * 40/41/42/44/46/48/49 号可用性检查共用此函数。
 */
const scene_blocked = (cid) =>
  tq(cid, 90) || tq(cid, 88) || tq(cid, 89) || tq(cid, 55);

/**
 * 助手执行时的抖S条件（41/42/48 共用；40 的 ABL:ASSI:20 下限低一档）：
 * 顺从 ≤4 或百合气质 ≤4 的助手、且非施虐狂（TALENT:83）且抖S 不足 → 不可。
 * @param {number} s_min ABL:ASSI:20 的下限（40 为 2、41/42/48 为 3）
 */
function assi_maso_blocked(s_min) {
  if (!era_flag.assiplay) {
    return false;
  }
  const assi = era_flag.assi;
  return (
    (abl(assi, 10) <= 4 || abl(assi, 22) <= 4) &&
    tal(assi, 83) === 0 &&
    abl(assi, 20) < s_min
  );
}

/** 着ぐるみ（ズーコ）：CFLAG:42 == 11 且特别服装位（CFLAG:40 & 64）在身 */
const zooko_worn = (cid) =>
  (era.get(`cflag:${cid}:42`) || 0) === 11 &&
  ((era.get(`cflag:${cid}:40`) || 0) & 64) !== 0;

/** 内裤或下装在身（CFLAG:40 & 17 = bit0 内裤 + bit4 裤）且着衣设定开 */
const lower_worn = (cid) =>
  ((era.get(`cflag:${cid}:40`) || 0) & 17) !== 0 && era.get('flag:37');

/** 尿布（CFLAG:42 == 69 且特别服装位）且着衣设定开 */
const diaper_worn = (cid) =>
  (era.get(`cflag:${cid}:42`) || 0) === 69 &&
  ((era.get(`cflag:${cid}:40`) || 0) & 64) !== 0 &&
  era.get('flag:37');

// 40 号可用性检查：打屁股——无道具要求
com_able_family.register(40, async () => {
  if (sm_filtered()) {
    return 0;
  }
  if (assi_maso_blocked(2)) {
    return 0;
  }
  if (scene_blocked(era_flag.target)) {
    return 0;
  }
  return 1;
});

// 41 号可用性检查：鞭——要 ITEM:10，另挡浴室/新妻
com_able_family.register(41, async () => {
  const cid = era_flag.target;
  if (sm_filtered()) {
    return 0;
  }
  if (!has_item(10)) {
    return 0;
  }
  if (assi_maso_blocked(3)) {
    return 0;
  }
  if (scene_blocked(cid) || tq(cid, 58) || tq(cid, 59)) {
    return 0;
  }
  return 1;
});

// 42 号可用性检查：针——要 ITEM:11
com_able_family.register(42, async () => {
  const cid = era_flag.target;
  if (sm_filtered()) {
    return 0;
  }
  if (!has_item(11)) {
    return 0;
  }
  if (assi_maso_blocked(3)) {
    return 0;
  }
  if (scene_blocked(cid) || tq(cid, 58) || tq(cid, 59)) {
    return 0;
  }
  return 1;
});

// 43 号可用性检查：眼罩——失神中挡、解除随时可
com_able_family.register(43, async () => {
  const cid = era_flag.target;
  if (sm_filtered()) {
    return 0;
  }
  if ((era.get('tflag:899') || 0) > 0) {
    return 0; // 失神中
  }
  if (zooko_worn(cid) && era.get('flag:37')) {
    return 0; // 玩偶装（43 号检查受 FLAG:37 着衣设定控制）
  }
  if (tq(cid, 43)) {
    return 1; // 解除はいつでも可能
  }
  if (!has_item(5)) {
    return 0;
  }
  if (tq(cid, 55)) {
    return 0; // 決闘中
  }
  return 1;
});

// 44 号可用性检查：绳子——调教者技巧 ≥3、助手要 ≥5
com_able_family.register(44, async () => {
  const cid = era_flag.target;
  if (sm_filtered()) {
    return 0;
  }
  if (scene_blocked(cid)) {
    return 0;
  }
  if (tq(cid, 44)) {
    return 1; // 解除
  }
  if (!has_item(14)) {
    return 0;
  }
  if (abl(era_flag.player, 12) <= 2) {
    return 0; // 調教者の技巧
  }
  if (era_flag.assiplay && abl(era_flag.assi, 12) <= 4) {
    return 0; // 助手は技巧5
  }
  return 1;
});

// 45 号可用性检查：口塞——触手口辱/玩偶装阻止执行（不受 FLAG:37 控制）
com_able_family.register(45, async () => {
  const cid = era_flag.target;
  if (sm_filtered()) {
    return 0;
  }
  if (tq(cid, 98)) {
    return 0; // 触手口辱中
  }
  if (zooko_worn(cid)) {
    return 0; // 玩偶装（45 号检查不受 FLAG:37 着衣设定控制）
  }
  if (tq(cid, 45)) {
    return 1; // 解除
  }
  if (!has_item(9)) {
    return 0;
  }
  if (era_flag.assiplay && abl(era_flag.assi, 12) < 3) {
    return 0; // 助手は技巧3以上
  }
  if (tq(cid, 59)) {
    return 0; // 新妻
  }
  if (tq(cid, 55)) {
    return 0; // 決闘
  }
  return 1;
});

// 46 号可用性检查：灌肠——服装三项检查 + 肛门经验/顺从欲望露出合计
com_able_family.register(46, async () => {
  const cid = era_flag.target;
  if (sm_filtered()) {
    return 0;
  }
  if (scene_blocked(cid)) {
    return 0;
  }
  if (lower_worn(cid)) {
    return 0; // パンツか上着下・ズボン
  }
  if (diaper_worn(cid)) {
    return 0; // オムツ
  }
  if (zooko_worn(cid) && era.get('flag:37')) {
    return 0; // 着ぐるみ（46 带 FLAG:37）
  }
  if (tq(cid, 46)) {
    return 1; // 解除
  }
  if (!has_item(15)) {
    return 0;
  }
  if (tq(cid, 13) || tq(cid, 19) || tq(cid, 49)) {
    return 0; // 肛门振动棒/肛珠/电极使用中
  }
  if ((era.get(`exp:${cid}:1`) || 0) <= 25) {
    return 0; // 肛门经验 > 25
  }
  if (abl(cid, 10) + abl(cid, 11) + abl(cid, 17) < 10) {
    return 0; // 顺从+欲望+露出 ≥ 10
  }
  return 1;
});

// 47 号可用性检查：拘束衣——只能助手穿（ASSIPLAY && ASSI ≥ 1）
com_able_family.register(47, async () => {
  const cid = era_flag.target;
  if (sm_filtered()) {
    return 0;
  }
  if (tq(cid, 47)) {
    return 1; // 解除
  }
  if (!has_item(23)) {
    return 0; // 拘束衣スーツ
  }
  if (era_flag.assiplay === 0 || era_flag.assi < 1) {
    return 0; // 助手じゃなきゃダメ
  }
  if (abl(era_flag.assi, 20) < 2) {
    return 0; // 助手の抖S气质 ≥ 2
  }
  return 1;
});

// 48 号可用性检查：践踏——对象须男人/扶她，服装三项检查
com_able_family.register(48, async () => {
  const cid = era_flag.target;
  if (sm_filtered()) {
    return 0;
  }
  if (!tal(cid, 121) && !tal(cid, 122)) {
    return 0; // 対象が男人か扶她
  }
  if (assi_maso_blocked(2)) {
    return 0;
  }
  if (scene_blocked(cid)) {
    return 0;
  }
  if (lower_worn(cid)) {
    return 0;
  }
  if (diaper_worn(cid)) {
    return 0;
  }
  if (zooko_worn(cid) && era.get('flag:37')) {
    return 0; // （48 带 FLAG:37）
  }
  return 1;
});

// 49 号可用性检查：肛门电极——服装三项检查 + 与灌肠/肛具互斥
com_able_family.register(49, async () => {
  const cid = era_flag.target;
  if (sm_filtered()) {
    return 0;
  }
  if (scene_blocked(cid)) {
    return 0;
  }
  if (lower_worn(cid)) {
    return 0;
  }
  if (diaper_worn(cid)) {
    return 0;
  }
  if (zooko_worn(cid) && era.get('flag:37')) {
    return 0; // （49 带 FLAG:37）
  }
  if (tq(cid, 49)) {
    return 1; // 解除
  }
  if (!has_item(21)) {
    return 0;
  }
  if (tq(cid, 13) || tq(cid, 19) || tq(cid, 46)) {
    return 0; // 肛门振动棒/肛珠/普通の浣腸使用中
  }
  if (tq(cid, 58)) {
    return 0; // 浴室
  }
  return 1;
});

// —— train_message_b 的 SELECTCOM 40–49 分支 ——
// 公共头（省略设定 + 点线）在 train-message.js。

/** 目标名（%SAVESTR:TARGET% → callname，#171 决定） */
const target_name = () => chara_callname(era_flag.target);

/**
 * B 分支 40-44 的着ぐるみ共形：CFLAG:42 == 11 且特别服装位 → true。分支内
 * 两处出现（正文 + 尾句），各自独立判定。
 */
const in_zooko = () => zooko_worn(era_flag.target);

// 打屁股
train_message_b_family.register(40, async () => {
  const target = era_flag.target;
  const player_name = chara_callname(era_flag.player);
  const tname = target_name();

  // 第一行：%PLAYER%在 +（着ぐるみ → <特别服装>外面、/ 目标名
  // +（魅力点 312 == 23 → 又大又翘的）+ 屁股上、）
  let line = `${player_name}在`;
  if (in_zooko()) {
    line += `${clothtype_special_text(target)}外面、`;
  } else {
    line += tname;
    if (tal(target, 312) === 23) {
      line += '又大又翘的';
    }
    line += '屁股上、';
  }
  era.print(`${line}一掌一掌地拍打着。`); // PRINTFORML

  // 尾句三支
  if (in_zooko()) {
    era.print(`${clothtype_special_text(target)}里的${tname}、好像不太有感觉…`);
  } else if (
    era_flag.prevcom === 40 &&
    ((era.get(`cflag:${target}:40`) || 0) & 16) === 0
  ) {
    era.print(`${tname}被打的地方越来越红了…`); // 连续打
  } else if (((era.get(`cflag:${target}:40`) || 0) & 16) === 0) {
    era.print(`${tname}被打的地方变红了…`);
  }
});

// 鞭
train_message_b_family.register(41, async () => {
  const target = era_flag.target;
  const player_name = chara_callname(era_flag.player);
  const tname = target_name();

  // 第一行
  let line = player_name;
  if (in_zooko()) {
    line += clothtype_special_text(target);
  } else {
    line += `在${tname}的身上`;
  }
  era.print(`${line}挥下鞭子…`);

  // 尾句三支
  if (in_zooko()) {
    era.print(`${clothtype_special_text(target)}里的${tname}、好像不太有效…`);
  } else if (era_flag.prevcom === 41) {
    era.print(`${tname}身上的鞭痕越来越多了…`);
  } else {
    era.print(`${tname}的身上、开始出现红肿的鞭痕…`);
  }
});

// 针
train_message_b_family.register(42, async () => {
  const target = era_flag.target;
  const tname = target_name();
  const player_name = chara_callname(era_flag.player);

  // 第一行（玩偶装分支保留行尾「了、」字面）
  let line = `${player_name}、用针扎`;
  if (in_zooko()) {
    era.print(`${line}${clothtype_special_text(target)}了、`);
  } else {
    line += tname;
    if (tal(target, 244)) {
      line += '蓝色的'; // 恶魔肌肤
    } else if (tal(target, 253)) {
      line += '褐色的';
    } else if (tal(target, 255)) {
      line += '白皙的';
    }
    era.print(`${line}肌肤…`); // PRINTL
  }

  // 着ぐるみ尾句（非着ぐるみ支无尾句）
  if (in_zooko()) {
    era.print(`${clothtype_special_text(target)}里的${tname}、好像不太有效…`);
  }
});

// 眼罩（分支打印在 TEQUIP 取反**之前**：装着中 → 即将解下）
train_message_b_family.register(43, async () => {
  const tname = target_name();
  if (tq(era_flag.target, 43)) {
    era.print(`${tname}的眼罩被解下来了。`);
  } else {
    era.print(`${tname}被眼罩罩着。`);
  }
});

// 绳子
train_message_b_family.register(44, async () => {
  const target = era_flag.target;
  const tname = target_name();
  const player_name = chara_callname(era_flag.player);

  const who = in_zooko() ? clothtype_special_text(target) : tname;
  era.print(
    tq(target, 44)
      ? `${player_name}把${who}的绳子解开了。`
      : `${player_name}把${who}绑起来了。`,
  );
});

// 口塞
train_message_b_family.register(45, async () => {
  const tname = target_name();
  if (tq(era_flag.target, 45)) {
    era.print(`${tname}的口塞被拿下来了。`);
  } else {
    era.print(`${tname}被装上了口塞。`);
  }
});

// 灌肠+肛塞
train_message_b_family.register(46, async () => {
  const target = era_flag.target;
  const tname = target_name();

  if (tq(target, 46)) {
    // 解除侧：拔掉喷出 + （清醒时的）抖M六档
    era.print(`${tname}的肛塞被拔掉了、里面的污物随之喷出肛门、飞散一地。`);
    if ((era.get('tflag:899') || 0) === 0) {
      const m = abl(target, 21);
      if (m === 0) {
        era.print(`${tname}露出了苦闷、耻辱的表情。`);
      } else if (m === 1) {
        era.print(`${tname}冒出冷汗、被下腹的排泄感所折磨着。`);
      } else if (m === 2) {
        era.print(`${tname}被强烈的羞耻感所包围、露出了期待开放瞬间的表情。`);
      } else if (m === 3) {
        era.print(`${tname}感受着直肠内的刺激、时而发出娇艳的呻吟。`);
      } else if (m === 4) {
        era.print(`${tname}露出陶醉的表情、愉悦地享受着排泄感。`);
      } else {
        era.print(`${tname}尽情品味着排泄感与耻辱的双重折磨、快要不正常了。`);
        era.print(
          `${tname}享受快感的表情突然凝固了、肛门开放的同时、一滴一滴的爱液无法抑制地流了出来。`,
        );
      }
    }
  } else {
    era.print(`${tname}的菊花被灌入了灌肠液、用肛塞栓起来了。`);
  }
});

// 拘束衣（%SAVESTR:ASSI% 的肤色三选一）
train_message_b_family.register(47, async () => {
  const assi = era_flag.assi;
  if (tq(era_flag.target, 47)) {
    era.print(`${chara_callname(assi)}脱掉了拘束衣…`);
  } else {
    let line = chara_callname(assi);
    if (tal(assi, 244)) {
      line += '蓝色的';
    } else if (tal(assi, 253)) {
      line += '褐色的';
    } else if (tal(assi, 255)) {
      line += '白皙的';
    }
    era.print(`${line}肌肤、被皮革制的拘束衣包裹着…`);
  }
});

// 践踏（欲情 PALAMLV:3 以上 → 硬梆梆的）
train_message_b_family.register(48, async () => {
  const target = era_flag.target;
  const tname = target_name();
  const player_name = chara_callname(era_flag.player);

  let line = `${player_name}把${tname}的`;
  if (palam(target, 5) >= PALAMLV[3]) {
    line += '硬梆梆的';
  }
  era.print(`${line}阴茎、用脚踩着…`);
});

// 肛门电极
train_message_b_family.register(49, async () => {
  const tname = target_name();
  if (tq(era_flag.target, 49)) {
    era.print(`${tname}体内的电极被拿下来了…`);
  } else {
    era.print(`${tname}的菊花、被插入了电极…`);
  }
});

// —— train_message_a 的 SELECTCOM 40–42 分支 ——
// 43–49 不在此注册 A 反应分支。

/**
 * 痛苦反应的档位文本（B = 0..5+）。
 */
const PAIN_REACTION = [
  (n) => `${n}发出了悲鸣、忍受着痛苦。`,
  (n) => `极度的痛苦让${n}口齿之间发出了越来越高亢的悲鸣。`,
  (n) => `无法忍受的痛苦让${n}大声尖叫、全身都弹起来了。`,
  (n) => `${n}因为痛苦而全身冒汗、疼得在地上打滚。`,
  (n) => `要命的痛苦让${n}意识都差点飞散了、发出了不堪入耳的野兽一样的哀嚎。`,
];

/**
 * 打屁股/鞭/针的共通反应。条件按 && 与 || 同优先级左结合求值，
 * 结果为 (SELECTCOM ∈ {40,41,42}) && TFLAG:899 <= 1——三条
 * 指令都检查失神条件（文件头「微妙点」第一条）；处理函数注册在 40/41/42 三号，
 * 条件由本函数自查，分发表只按号匹配。
 * @returns {Promise<void>}
 */
async function train_message_a_pain() {
  const target = era_flag.target;
  const tname = target_name();

  // TFLAG:899 > 1 时跳过整个反应分支，
  // 40/41/42 三条指令共用这一失神检查。
  if ((era.get('tflag:899') || 0) > 1) {
    return;
  }

  // A = UP:9（苦痛上升量，delta 表）→ 档位
  const a = era.get(`delta:${target}:9`) || 0;
  let b = a < 300 ? 0 : a < 1000 ? 1 : a < 2000 ? 2 : a < 3000 ? 3 : 4;

  // 害怕疼痛（40）+1 / 不惧疼痛（41）-1
  if (tal(target, 40)) {
    b += 1;
  }
  if (tal(target, 41)) {
    b -= 1;
  }

  // B < 1…B < 5 五档 + 缺省求饶档（B < 0 由首档处理——
  // 不惧疼痛把档位压到负同样落「发出了悲鸣」）
  if (b < 5) {
    era.print(
      PAIN_REACTION[b < 1 ? 0 : b < 2 ? 1 : b < 3 ? 2 : b < 4 ? 3 : 4](tname),
    );
  } else {
    let line = `${tname}因为实在太痛、`;
    if (!tal(target, 45) && !tal(target, 310)) {
      line += '抽抽哒哒地哭着、'; // （不哭泣 45 / 阴毛状态 310）
    }
    era.print(`${line}拼命地求饶。`);
  }

  // 欲情 > 1000 的勃起/潮湿追加
  if ((era.get(`delta:${target}:5`) || 0) > 1000) {
    if (tal(target, 121) || tal(target, 122)) {
      era.print(`然而、${tname}因为痛苦而扭曲的身体上阴茎已经勃起了……`);
    } else {
      era.print(`然而、${tname}因为痛苦而扭曲的身体上股间已经潮湿了……`);
    }
  }

  // 灌肠＋肛塞插入中（TEQUIP:46 && TFLAG:899 <= 1）：
  // 这段仍属于 40/41/42 的反应分支，
  // 不为其他指令单独分发。
  if (tq(target, 46) && (era.get('tflag:899') || 0) <= 1) {
    era.print(
      `${tname}的菊花被灌入大量的灌肠液后还用肛门塞封起来了、侵犯还在继续。`,
    );
    const m = abl(target, 21);
    if (m === 0) {
      era.print(`${tname}露出了苦闷的表情。`);
    } else if (m === 1) {
      era.print(`${tname}很想排泄、开始冒冷汗了。`);
    } else if (m === 2) {
      era.print(`${tname}一边露出痛苦的表情、一边面红耳赤地扭动着屁股。`);
    } else if (m === 3) {
      era.print(`${tname}一边被排泄感折磨、一边时而露出了恍惚的表情。`);
    } else if (m === 4) {
      era.print(`${tname}被腹痛和排泄感带来的快感所支配、露出了陶醉的表情。`);
    } else {
      era.print(`${tname}尽情品味着排泄感。`);
      era.print(
        `${tname}被快感所征服、表情都变得迟钝了。口水和爱液、流得到处都是。`,
      );
    }
  }
}

train_message_a_family.register(40, train_message_a_pain);
train_message_a_family.register(41, train_message_a_pain);
train_message_a_family.register(42, train_message_a_pain);

// —— get_adv_com 的 40 号升格规则与 com_family 注册 ——

/**
 * 40 号规则：前后两回合的调教者相同（(ASSIPLAY && TFLAG:50) ||
 * (ASSIPLAY == 0 && TFLAG:50 == 0)）时，上回合为后背位族（PREVCOM ∈
 * {21,131,133,134}）、或上上回合 {21,131,132,133,134} 且上回合 {120,121}
 * （插入Ｇ点蹂躏/蹂躏子宫口）→ 复核 132 号可用性，可用即升格 132
 * （背后位・打屁股，J19）。规则无 FLAG:71/TFLAG:42 副作用（体位族才有）。
 */
adv_com_family.register(40, async () => {
  // GLOBALNAME 语义：TFLAG:50 = 前回の調教者が助手か（source-check 写入）
  const same_trainer =
    (era_flag.assiplay && (era.get('tflag:50') || 0)) ||
    (!era_flag.assiplay && (era.get('tflag:50') || 0) === 0);
  if (!same_trainer) {
    return 40; // 未命中 → RETURN ARG
  }
  // GLOBALNAME 语义：PREVCOM/TFLAG:59 = 前回/前々回のコマンド
  const prev = era_flag.prevcom;
  const prev2 = era.get('tflag:59') || 0;
  const hit =
    [21, 131, 133, 134].includes(prev) ||
    ([21, 131, 132, 133, 134].includes(prev2) &&
      (prev === 120 || prev === 121));
  if (hit) {
    // 复核 132 号可用性，缺失时视为可执行（#213 决定）
    if ((await com_able_family.call(132, { whenMissing: 1 })) === 1) {
      return 132;
    }
  }
  return 40;
});

// com40–49 注册（COM 族）
com_family.register(40, com40);
com_family.register(41, com41);
com_family.register(42, com42);
com_family.register(43, com43);
com_family.register(44, com44);
com_family.register(45, com45);
com_family.register(46, com46);
com_family.register(47, com47);
com_family.register(48, com48);
com_family.register(49, com49);

// equip_com43–49 注册（装备持续效果族；48 践踏无持续位——链上无 48）
equip_com_family.register(43, equip_com43);
equip_com_family.register(44, equip_com44);
equip_com_family.register(45, equip_com45);
equip_com_family.register(46, equip_com46);
equip_com_family.register(47, equip_com47);
equip_com_family.register(49, equip_com49);

module.exports = {
  ANAL_LADDER,
  BONDAGE_SUIT_LADDER,
  CLIT_LADDER,
  ELECTRODE_EQUIP_LADDER,
  ELECTRODE_LADDER,
  EQUIP_COM_CHAIN,
  GAG_MASO_LADDER,
  MASO_PAIR_LADDER,
  MASO_WIDE_LADDER,
  PAIN_LADDERS,
  ROPE_MASO_LADDER,
  equip_com43,
  equip_com44,
  equip_com45,
  equip_com46,
  equip_com47,
  equip_com49,
  event_seitsu_ashikoki,
};
