/**
 * @file 调教指令 40–49「SM 系」族：@COM40-49 真身 + @EQUIP_COM43-49 装备
 * 持续效果 + @COM_ABLE40-49 可用性 + TRAIN_MESSAGE_A/B 分支 + @GET_ADV_COM
 * 的 CASE 40 升格规则（issue #223，J13——#209 裁定 6 的「四样装齐」）。
 *
 * 源: target/ERB/調教相關/COMF40_スパンキング.ERB   @COM40（:7-69）
 *     target/ERB/調教相關/COMF41_鞭.ERB             @COM41（:7-59）
 *     target/ERB/調教相關/COMF42_針.ERB             @COM42（:7-59）
 *     target/ERB/調教相關/COMF43_アイマスク.ERB     @COM43（:7-89）+ @EQUIP_COM43（:95-189）
 *     target/ERB/調教相關/COMF44_縄.ERB             @COM44（:7-104）+ @EQUIP_COM44（:110-190）
 *     target/ERB/調教相關/COMF45_ボールギャグ.ERB   @COM45（:7-44）+ @EQUIP_COM45（:50-116）
 *     target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB @COM46（:7-197）+ @EQUIP_COM46（:203-352）
 *     target/ERB/調教相關/COMF47_ボンデージ装着.ERB @COM47（:7-32）+ @EQUIP_COM47（:38-126）
 *     target/ERB/調教相關/COMF48_足コキする.ERB     @COM48（:7-102）+ @EVENT_SEITSU_ASIKOKI（:108-122）
 *     target/ERB/調教相關/COMF49_アナル電極.ERB     @COM49（:7-142）+ @EQUIP_COM49（:148-296）
 *     target/ERB/調教相關/COMABLE.ERB               @COM_ABLE40-49（:1878-2238）
 *     target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB    SELECTCOM 40-49 分支（:1742-1900）
 *     target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB    SELECTCOM 40-42 分支（:1208-1272）
 *     target/ERB/調教相關/COMF_JUMP.ERB             @GET_ADV_COM CASE 40（:605-626）
 *
 * == 变量承载（com0-caress.js 同款，#44/#45 实证） ==
 *
 *   - SOURCE:xx → `source:${cid}:${xx}`；UP:xx → `delta:${cid}:${xx}`；
 *     LOSEBASE → `deltabase` 的负值累加；结算都在回合循环（train-loop.js）。
 *   - TEQUIP:43-49（眼罩/绳/口塞/灌肠+肛塞/拘束衣/—/电极）是本族的装备位，
 *     属主 train（ownership/tequip-ownership.yml "43-47"/"49"），域内直写；
 *     桶随 beginTrain 建、endTrain 删。
 *   - T（= T:0，触手回合计数）→ `t:0`：写者是本族与 COMF46/49 的触手支，
 *     消费者 @EQUIP_COM100（COMF100:240-244，随 J17）——yml/T.yml 建桶
 *     （VariableSize.csv:79 的单字母数组，本文件首次写入）。
 *   - NOITEM → `noitem:0`（VariableSize.csv:51）：全库无写点、恒 0（yml/
 *     NOITEM.yml 建桶，文件头有说明）。「ITEM:x == 0 && NOITEM == 0」在
 *     当前移植面下等价于「没有该道具就不可执行」。
 *   - EXP:1（肛门经验）/ EXP:30（被虐快乐经验）/ EXP:50（异常经验）属主
 *     dungeon（ownership/exp-ownership.yml）——跨域写走门面
 *     chara(cid).dungeon.<字段>（#71）；EXP:23/40/41/51 属主 train，直写。
 *
 * == @GET_ADV_COM CASE 40 与 JUMPFORM 的落点（#213 签名） ==
 *
 * COMF40 头部的「LOCAL = 40 / CALL GET_ADV_COM / SIF RESULT != LOCAL /
 * JUMPFORM COM{RESULT}」：规则体注册进 adv_com_family（CASE 40 → 132 背后位・
 * 打屁股）；升格命中时以 com_family.call(升格号) 同位落地。**132 属 J19
 * （追加与高级族）**，本票只交规则与跳转位；J19 未落地期间跳转目标缺失 →
 * 存根占位行 + RETURN 1（COM132 真身会自置 SELECTCOM = 132，占位期不动
 * SELECTCOM，J19 落地即自愈）。
 *
 * == @EQUIP_COMxx 的接线（本族源文件自带的六个持续效果函数） ==
 *
 * 原作由 @SOURCE_CHECK 的 SIF 链（SYSTEM_SOURCE.ERB:58-123）逐位调用——ere
 * 侧链与族在 com-family.js（EQUIP_COM_CHAIN / equip_com_family），消费循环
 * 在 event/source-check.js（本票接通，缺失位仍落占位行）。@EQUIP_COM11-19
 * （道具族）/53-59（特殊族）/89（重度族）/100/108（触手族）随各自族票注册。
 *
 * == 源侧三处已核的微妙点（防「顺手修正」） ==
 *
 *   - TRAIN_MESSAGE_A 的 40-42 分支守卫 `SELECTCOM == 40 || SELECTCOM == 41
 *     || SELECTCOM == 42 && TFLAG:899 <= 1`：Emuera 里 && 与 || **同优先级、
 *     左结合**（operators.md 优先级表），等价于 (40||41||42) && TFLAG:899<=1
 *     ——三条指令都吃失神门，不是只钳 42。
 *   - 肛门经验的 EXPLV 档：COMF46/49 的**本体**与 @EQUIP_COM46 都用
 *     EXPLV:n/2（半阈值），唯 @EQUIP_COM49 用整阈值（EXPLV:2/3/4/5 不除
 *     2）——四处阶梯两形并存，原样互异，不归一。
 *   - @COM_ABLE40 的助手判定 ABL:ASSI:20 < 2、41/42 是 < 3（SM 系内部互异）。
 *
 * 这张票存根/登记（docs/stub-registry.md）：
 *   - COM132（升格跳转目标，随 J19 com-advanced.js）；
 *   - SHOW_EQUIP_1/2 的本族显示位（43-46/49）仍占位——显示面三族共用
 *     （J10/J13/J17），随点亮全部装备位的最后一张或专项显示票接线。
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
const { stub_line } = require('#/utils/stub-line');
const { PALAMLV } = require('#/era-utils/palam-level');
const { soiling_cloth_no2 } = require('#/system/train/cloth');
const { clothtype_special_text } = require('#/page/page-clothtype');

/**
 * 本文件存根化的原作函数名。docs/stub-registry.md 必须收录每一个；名单
 * 变动必须同步清单。
 */
const STUBBED_CALLS = ['COM132'];

// —— 读数兜底（未声明下标 undefined → 0，#13；包装层 getter 一律 || 0） ——

const tq = (cid, i) => era.get(`tequip:${cid}:${i}`) || 0;
const set_tq = (cid, i, v) => era.set(`tequip:${cid}:${i}`, v);
const src = (cid, i) => era.get(`source:${cid}:${i}`) || 0;
const set_src = (cid, i, v) => era.set(`source:${cid}:${i}`, v);
const abl = (cid, i) => Math.floor(era.get(`abl:${cid}:${i}`) || 0);
const tal = (cid, i) => era.get(`talent:${cid}:${i}`) || 0;
const palam = (cid, i) => era.get(`palam:${cid}:${i}`) || 0;
const add_lose = (cid, i, v) => era.add(`deltabase:${cid}:${i}`, -v);
const add_up = (cid, i, v) => era.add(`delta:${cid}:${i}`, v);

/** TIMES X, m：整数乘小数后截断（math-etc.md，source-check.js 同款） */
const times = (v, m) => Math.floor(v * m);

/**
 * EXPLV（经验等级阈值）：Emuera 内建，默认 0,1,4,20,50,200（config.md
 * 「EXPLVの初期値」标准值）。target/CSV/_replace.csv:79 的自定义行带前导
 * 「;」未生效，取默认。PALAMLV 复用 ere-utils/palam-level.js。
 */
const EXPLV = [0, 1, 4, 20, 50, 200];

/** NOITEM（VariableSize.csv:51）：全库无写点，恒 0 → 道具持有检查生效 */
const noitem = () => era.get('noitem:0') || 0;

/** 持有检查（COMABLE 各段的「ITEM:x == 0 && NOITEM == 0」共形） */
const has_item = (i) => (era.get(`item:${i}`) || 0) > 0 || noitem() !== 0;

/** PALAM:i 对 PALAMLV:n 的档位比较用阈值（n = 1..4） */
const palam_below = (cid, i, n) => palam(cid, i) < PALAMLV[n];

/**
 * 百合/断背经验共通段（COMF40/41/42 的 +2、EQUIP_COM43-46/49 的 +1、
 * COMF48 的 +3——男女一致才发生；EXPNAME:40/41 的 yml 名直书，com0 同款）。
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
 * 爱情经验共通段（COMF40/41/42/44/48 的尾部；E 的取值各文件自定）：
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
 * // GLOBALNAME 语义：TFLAG:30 = 主人経験（eramaouフラグまとめ.txt:70）
 * @param {number} cid 目标
 * @param {number} maso_min ABL:21 下限（40 为 1、41 为 2、42 为 3、绳持续为 2）
 */
function master_exp(cid, maso_min) {
  if (era_flag.assiplay === 0 && abl(cid, 21) >= maso_min) {
    era.add('tflag:30', 1);
  }
}

/**
 * 紧缚经验档（COMF43/44 的 LOSEBASE 消费减免，:G6B-64G 段）：EXP:51
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
 * 肛门敏感/钝感修正（TALENT:105 钝感 ×1.50 / 106 敏感 ×0.60——46/49 对
 * SOURCE:6/13/14 三格共乘；CSV 命名 105=钝感、106=敏感，ERB 注释顺序相反，
 * 数字 1:1 不动）。
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

// —— @COM40 打屁股（COMF40_スパンキング.ERB:7-66） ——

/**
 * PALAM:9（苦痛）档 → SOURCE:6（COMF40:32-43 为 300-1800、41:22-33 为
 * 1000-4000、42:22-33 为 3000-4500——三文件各表，见各调用处）
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
 * @COM40 打屁股（COMF40:7-69）。头部带升格跳转（:12-15 → CASE 40）。
 * @returns {Promise<number>} 原作 RETURN 1（升格时为跳转目标的返回值）
 */
async function com40() {
  const target = era_flag.target;
  const player = era_flag.player;

  // :12-15 LOCAL = 40 / CALL GET_ADV_COM / SIF RESULT != LOCAL / JUMPFORM
  // COM{RESULT}——规则在 adv_com_family 的 CASE 40（文件尾注册），升格目标
  // 132 属 J19；缺失期落存根占位行、RETURN 1（见文件头说明）
  const upgraded = await get_adv_com(40);
  if (upgraded !== 40) {
    return jump_to_advanced(upgraded);
  }

  era.print('打屁股'); // :18 PRINTL（;SAVESTR:22 = 打屁股 在原作已是注释，com0 同款）
  // :20 CALL TRAIN_MESSAGE_B（本族 B 分支在本文件尾注册）
  await train_message_b();

  // :22-24 実際には苦痛があるため（LOSEBASE 负向累加，见文件头）
  add_lose(target, 0, 80);
  add_lose(target, 1, 40);

  // —— ソースの計算（:26-43）——
  set_src(target, 12, 200); // :29 SOURCE:12 露出
  set_src(target, 14, 500); // :30 SOURCE:14 逃离
  set_src(target, 6, pain_source(target, 40)); // :32-43 苦痛档

  // —— 経験上昇（:45-56）——
  same_sex_exp(target, player, 2); // :48-56 百合/断背 +2
  master_exp(target, 1); // :58-59 ASSIPLAY == 0 && ABL:21 >= 1 → TFLAG:30 += 1

  love_exp(target, 1, true); // :61-67 CFLAG:2 >= 1000 && (ABL:21>=3||受虐狂)

  return 1; // :69
}

/**
 * @COM41 鞭（COMF41_鞭.ERB:7-60）。
 * @returns {Promise<number>} 原作 RETURN 1
 */
async function com41() {
  const target = era_flag.target;
  const player = era_flag.player;

  era.print('鞭'); // :9
  await train_message_b(); // :11

  // :14-15 苦痛在身、体力气力扣得更重
  add_lose(target, 0, 100);
  add_lose(target, 1, 80);

  // —— ソースの計算（:17-33）——
  set_src(target, 14, 1000); // :20
  set_src(target, 6, pain_source(target, 41)); // :22-33

  same_sex_exp(target, player, 2); // :38-46
  master_exp(target, 2); // :48-49 ABL:21 >= 2

  love_exp(target, 1, true); // :51-57

  return 1; // :59
}

/**
 * @COM42 针（COMF42_針.ERB:7-61）。
 * @returns {Promise<number>} 原作 RETURN 1
 */
async function com42() {
  const target = era_flag.target;
  const player = era_flag.player;

  era.print('针'); // :9
  await train_message_b(); // :11

  // :14-15（LOSEBASE:0 += 0 是原样的空扣，不落调用）；気力 20
  add_lose(target, 1, 20);

  // —— ソースの計算（:17-33）——
  set_src(target, 14, 1000); // :20
  set_src(target, 6, pain_source(target, 42)); // :24-35

  same_sex_exp(target, player, 2); // :38-44
  master_exp(target, 3); // :46-47 ABL:21 >= 3

  love_exp(target, 1, true); // :51-57

  return 1; // :59
}

/**
 * JUMPFORM COM{RESULT} 的同位落地（#213 定）：升格号在 COM 族内分发——
 * 已实现（如 J19 的 132）则整段执行其真身；未落地则一行存根 + RETURN 1。
 * @param {number} com 升格后的 COM 号
 * @returns {Promise<number>}
 */
async function jump_to_advanced(com) {
  if (com_family.has(com)) {
    return com_family.call(com);
  }
  stub_line(`COM${com}`, `指令 ${com} 的升格目标`, '随追加与高级指令票');
  return 1;
}

// —— @COM43 眼罩（COMF43_アイマスク.ERB:7-91） ——

/**
 * 欲情 × 顺从 × 抖M 的三连乘法链（COMF43:30-71 与 COMF44 的同构段——
 * 两文件的系数表逐字相同，SOURCE:10 走这一条）。
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
 * @COM43 眼罩（COMF43:7-89）。装着/解除切换（TEQUIP:43 取反）。
 * @returns {Promise<number>} 原作 RETURN 1
 */
async function com43() {
  const target = era_flag.target;

  era.print('眼罩'); // :9
  await train_message_b(); // :11

  // LOSEBASE:0 += 0（:13 空扣不落）；:14-21 紧缚经验减免（半阈值）
  const [, lose1] = bondage_cost(target, [
    [0, 150],
    [0, 120],
    [0, 90],
  ]);
  add_lose(target, 1, lose1);

  // —— ソースの計算（:23-78）——
  // :26-28 基础三格 → 欲情/顺从/抖M 三连（:30-71）→ 倒错的（TALENT:80）×2
  let a = obey_maso_chain(target, 250);
  if (tal(target, 80)) {
    a = times(a, 2); // :73-75
  }
  set_src(target, 10, a); // :26 SOURCE:10 恭顺追加
  set_src(target, 12, 1000); // :27 SOURCE:12 露出
  // :28 SOURCE:14 = 500 → 胆怯（TALENT:10）×2
  set_src(target, 14, tal(target, 10) ? times(500, 2) : 500); // :76-78

  // —— 経験上昇（:80-84）——
  era.add(`exp:${target}:51`, 2); // :83 EXP:51 紧缚经验
  era.print('紧缚经验＋２'); // :84（全角字面 1:1）

  // :86-87 眼罩の着脱
  set_tq(target, 43, 1 - tq(target, 43));

  return 1; // :89
}

/**
 * @COM44 绳子（COMF44_縄.ERB:7-104）。装着/解除切换（TEQUIP:44 取反）。
 * @returns {Promise<number>} 原作 RETURN 1
 */
async function com44() {
  const target = era_flag.target;

  // :8-15 触手紧缚/绳 二支
  era.print(tq(target, 90) ? '触手紧缚' : '绳');
  await train_message_b(); // :16

  // :18-28 紧缚经验减免（半阈值，两 BASE 都扣）
  const [lose0, lose1] = bondage_cost(target, [
    [100, 150],
    [80, 120],
    [60, 90],
  ]);
  add_lose(target, 0, lose0);
  add_lose(target, 1, lose1);

  // —— ソースの計算（:30-83）——
  set_src(target, 6, 800); // :33 SOURCE:6 疼痛
  set_src(target, 10, obey_maso_chain(target, 800)); // :34,38-79
  set_src(target, 13, 500); // :35 SOURCE:13 屈从
  set_src(target, 14, 500); // :36 SOURCE:14 逃离
  // :81-83 倒错的 ×2（SOURCE:10 再乘）
  if (tal(target, 80)) {
    set_src(target, 10, times(src(target, 10), 2));
  }

  // —— 経験上昇（:85-89）——
  era.add(`exp:${target}:51`, 5); // :88
  era.print('紧缚经验＋５'); // :89

  // :91-94 绳子の着脱 + 触手调教中重置触手回合计数（T:0）
  set_tq(target, 44, 1 - tq(target, 44));
  if (tq(target, 90)) {
    era.set('t:0', 0);
  }

  love_exp(target, 1, true); // :96-102

  return 1; // :104
}

/**
 * @COM45 口塞（COMF45_ボールギャグ.ERB:7-44）。装着/解除切换（TEQUIP:45
 * 取反）——TEQUIP:45 正是 @KOJO_MESSAGE_COM 头部守卫之一（#213 接触面
 * 第 3 道：TEQUIP:45 && SELECTCOM != 45 → 跳过），写入路径自此点亮。
 * @returns {Promise<number>} 原作 RETURN 1
 */
async function com45() {
  const target = era_flag.target;

  era.print('口塞'); // :9
  await train_message_b(); // :11

  // :13-23 紧缚经验减免（半阈值）
  const [lose0, lose1] = bondage_cost(target, [
    [80, 100],
    [60, 80],
    [40, 60],
  ]);
  add_lose(target, 0, lose0);
  add_lose(target, 1, lose1);

  // —— ソースの計算（:25-33）——
  set_src(target, 6, 50); // :28 SOURCE:6 疼痛
  set_src(target, 7, 50); // :29 SOURCE:7 成瘾追加
  set_src(target, 12, 80); // :30 SOURCE:12 露出
  set_src(target, 13, 150); // :31 SOURCE:13 屈从
  set_src(target, 14, 80); // :32 SOURCE:14 逃离
  set_src(target, 16, 80); // :33 SOURCE:16 恭顺追加

  // —— 経験上昇（:35-39）——
  era.add(`exp:${target}:51`, 2); // :38
  era.print('紧缚经验＋２'); // :39

  // :41-42 口塞の着脱
  set_tq(target, 45, 1 - tq(target, 45));

  return 1; // :44
}

// —— @COM46 灌肠+肛塞（COMF46_浣腸器＋プラグ.ERB:7-201） ——

/** ABL:3（肛门感觉）六档 → [SOURCE:2, SOURCE:13 基础]（COMF46:24-43） */
const ANAL_LADDER = [
  [80, 300],
  [250, 800],
  [600, 1400],
  [1000, 1800],
  [1300, 2100],
  [1700, 2400],
];

/** ABL:21（抖M气质）六档 → [S6, S8, S13, S14, S15]（COMF46:45-82） */
const MASO_WIDE_LADDER = [
  [2000, 1000, 200, 1000, 2000],
  [1600, 2000, 500, 1000, 1000],
  [1200, 1000, 800, 1000, 500],
  [800, 1000, 1200, 1000, 100],
  [600, 1000, 1500, 1000, 0],
  [400, 1000, 2000, 1000, 0],
];

/**
 * @COM46 灌肠+肛塞（COMF46:7-197）。装着/解除切换（TEQUIP:46 取反）。
 * @returns {Promise<number>} 原作 RETURN 1
 */
async function com46() {
  const target = era_flag.target;

  // :9-15 触手灌肠/灌肠＋肛塞 二支
  era.print(tq(target, 90) ? '触手灌肠' : '灌肠＋肛塞');
  await train_message_b(); // :16

  add_lose(target, 0, 60); // :18
  add_lose(target, 1, 150); // :19

  // —— ソースの計算（:21-155）——
  // :24-43 ABL:3 六档（S2/S13）
  const anal = ANAL_LADDER[Math.min(abl(target, 3), 5)];
  set_src(target, 2, anal[0]);
  set_src(target, 13, anal[1]);

  // :45-82 ABL:21 六档——**整组覆写**（含刚由 ABL:3 写下的 S13）
  const wide = MASO_WIDE_LADDER[Math.min(abl(target, 21), 5)];
  set_src(target, 6, wide[0]);
  set_src(target, 8, wide[1]);
  set_src(target, 13, wide[2]);
  set_src(target, 14, wide[3]);
  set_src(target, 15, wide[4]);

  // :84-100 PALAM:3（润滑）：S2 ×0.4-1.8 + S6 += 800/500/300/120/100
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

  // :102-128 S2 再乘 欲情（:102-113）× 顺从（:115-128，肛门系表）
  set_src(target, 2, times(src(target, 2), lust_factor(target)));
  set_src(target, 2, times(src(target, 2), anal_obey_factor(target)));

  // :130-138 体型三连（S6）
  set_src(target, 6, body_factor(target, src(target, 6)));

  // :140-150 肛门钝感/敏感（S6/S13/S14 三格共乘）
  set_src(target, 6, anal_sense_factor(target, src(target, 6)));
  set_src(target, 13, anal_sense_factor(target, src(target, 13)));
  set_src(target, 14, anal_sense_factor(target, src(target, 14)));

  // :152-155 看重贞操的处女（EXP:0 == 0 && TALENT:30）→ S13 /= 3
  if ((era.get(`exp:${target}:0`) || 0) === 0 && tal(target, 30)) {
    set_src(target, 13, Math.floor(src(target, 13) / 3));
  }

  // —— 経験上昇（:157-161）——
  chara(target).dungeon.肛门经验 += 5; // :160 EXP:1（属主 dungeon，走门面）
  era.print('肛门经验＋5'); // :161（全角＋半角5，字面 1:1）

  // :163-180 調教時の排泄が始めてだった場合（CFLAG:4 计数 + 异常经验）
  if (tq(target, 46) && (era.get(`cflag:${target}:4`) || 0) === 0) {
    let x = 1;
    if (tq(target, 53)) {
      // ビデオ録画中（TEQUIP:53）→ +2 且计数置 2
      x += 1;
      era.set(`cflag:${target}:4`, 2);
    } else {
      era.set(`cflag:${target}:4`, 1);
    }
    era.print(`异常经验+${x}`); // :173 PRINTFORML
    chara(target).dungeon.异常经验 += x; // EXP:50（属主 dungeon）
  } else if (
    // :175-179 初めてではないが録画中（计数 1 → 2）
    tq(target, 46) &&
    (era.get(`cflag:${target}:4`) || 0) === 1 &&
    tq(target, 53)
  ) {
    era.print('异常经验+1');
    chara(target).dungeon.异常经验 += 1;
    era.set(`cflag:${target}:4`, 2);
  }

  // :182-184 触手灌肠処理（T:0 清零）
  if (tq(target, 90)) {
    era.set('t:0', 0);
  }
  // :185-188 插入侧（当前未装备）且触手调教 → A 口污垢置位
  if (tq(target, 46) === 0 && tq(target, 90)) {
    era.set(`stain:${target}:4`, (era.get(`stain:${target}:4`) || 0) | 2 | 4);
  }

  // :190-192 着衣おもらし処理（解除侧）：#215 真身，调教内调用走 tflag:45
  if (tq(target, 46) && era.get('flag:37')) {
    await soiling_cloth_no2(target);
  }

  // :194-195 浣腸プラグの着脱
  set_tq(target, 46, 1 - tq(target, 46));

  return 1; // :197
}

/**
 * @COM47 拘束衣（COMF47_ボンデージ装着.ERB:7-32）。穿着者是**助手**侧
 * （指令名带「助手系コマンド」注释；TEQUIP:47 装在 TARGET 身上、描写读
 * SAVESTR:ASSI）。解除时无修正（:16-19 提前返回）。
 * @returns {Promise<number>} 原作 RETURN 1
 */
async function com47() {
  const target = era_flag.target;

  era.print('束缚衣'); // :9
  await train_message_b(); // :11

  // :13-17 終了時は修正无：已穿着 → 脱掉即返回
  if (tq(target, 47)) {
    set_tq(target, 47, 0);
    return 1;
  }

  // LOSEBASE:0 += 0（:19 空扣不落）；:20-27 抖M气质减免（0 → 60、≤2 → 45、
  // 其余 30——阶梯是「== 0 / <= 2 / ELSE」，与经验阈值无关）
  const m = abl(target, 21);
  add_lose(target, 1, m === 0 ? 60 : m <= 2 ? 45 : 30);

  // :29-30 拘束衣ルックの装着
  set_tq(target, 47, 1);

  return 1; // :32
}

// —— @COM48 践踏（COMF48_足コキする.ERB:7-106） ——

/** ABL:0（阴蒂感觉）六档 → SOURCE:0（COMF48:22-35） */
const CLIT_LADDER = [30, 100, 200, 500, 1000, 1500];

/** ABL:21 六档 → [SOURCE:0 系数, SOURCE:14 系数]（COMF48:37-56） */
const MASO_PAIR_LADDER = [
  [1, 1],
  [1.2, 0.8],
  [1.5, 0.6],
  [1.8, 0.4],
  [2.2, 0.2],
  [3, 0],
];

/**
 * @COM48 践踏（COMF48:7-102）。
 * @returns {Promise<number>} 原作 RETURN 1
 */
async function com48() {
  const target = era_flag.target;
  const player = era_flag.player;

  era.print('践踏'); // :9
  await train_message_b(); // :11

  add_lose(target, 0, 10); // :13
  add_lose(target, 1, 60); // :14

  // —— ソースの計算（:16-56）——
  set_src(target, 12, 150); // :19 SOURCE:12 露出
  set_src(target, 14, 400); // :20 SOURCE:14 逃离
  // :22-35 ABL:0 六档
  set_src(target, 0, CLIT_LADDER[Math.min(abl(target, 0), 5)]);
  // :37-56 ABL:21 对 S0/S14 的配对乘法链
  const [m0, m14] = MASO_PAIR_LADDER[Math.min(abl(target, 21), 5)];
  set_src(target, 0, times(src(target, 0), m0));
  set_src(target, 14, times(src(target, 14), m14));

  // —— 経験上昇（:62-86）——
  // 被虐快乐经验（EXP:30，属主 dungeon 走门面）：受虐狂或双高 +3 /
  // 欲望≥3 且抖M≥1 +2 / 欲望≥3 或抖M≥1 +1
  if (tal(target, 88) === 1 || (abl(target, 11) >= 3 && abl(target, 21) >= 3)) {
    era.print('被虐快乐经验+3'); // :67 PRINTFORML %EXPNAME:30%+3
    chara(target).dungeon.被虐快乐经验 += 3;
  } else if (abl(target, 11) >= 3 && abl(target, 21) >= 1) {
    era.print('被虐快乐经验+2'); // :70
    chara(target).dungeon.被虐快乐经验 += 2;
  } else if (abl(target, 11) >= 3 || abl(target, 21) >= 1) {
    era.print('被虐快乐经验+1'); // :73
    chara(target).dungeon.被虐快乐经验 += 1;
  }

  same_sex_exp(target, player, 3); // :77-86 百合/断背 +3

  // :88 CALL EVENT_SEITSU_ASIKOKI（本族自有函数，:108-122）
  await event_seitsu_ashikoki();

  // :90-100 爱情经验：男人（TALENT:122）E = 2、其余 E = 1，无抖M门
  love_exp(target, tal(target, 122) ? 2 : 1);

  return 1; // :102
}

/**
 * @EVENT_SEITSU_ASIKOKI 精通（足交）（COMF48:108-122）：调教者是男人/扶她、
 * 目标未熟（TALENT:135）且阴蒂感觉 5 以上、非触手/兽奸、目标对调教者的
 * 关系（RELATION）≥ 150 → 精通文本 + 解除未熟。
 * @returns {Promise<number>} 原作 RETURN 0/1
 */
async function event_seitsu_ashikoki() {
  const target = era_flag.target;
  const player = era_flag.player;

  // :109 A = NO:PLAYER（关系表的键）；:110-112 无前置限定的 TALENT 指
  // TARGET：男人或扶他、且未熟（与 COM_ABLE48 的对象门同向）
  if ((!tal(target, 121) && !tal(target, 122)) || !tal(target, 135)) {
    return 0;
  }
  // :113-115 Ｃ感度 5 以上、非触手调教/兽奸
  if (abl(target, 0) <= 4 || tq(target, 90) || tq(target, 89)) {
    return 0;
  }
  // :116-118 「調教対象」から「調教者」への関係が150以上
  if ((era.get(`relation:${target}:${player}`) || 0) < 150) {
    return 0;
  }
  // :119 PRINTFORML（原作全角逗号）
  era.print(
    `${chara_callname(player)}的阴茎被践踏着，${chara_callname(target)}开始精通这个了…`,
  );
  // :120 TALENT:135 = 0（未熟解除；属主 train，域内直写）
  era.set(`talent:${target}:135`, 0);

  return 1; // :122
}

// —— @COM49 肛门电极（COMF49_アナル電極.ERB:7-146） ——

/** ABL:3（肛门感觉）六档 → [SOURCE:2, SOURCE:13 基础]（COMF49:19-38） */
const ELECTRODE_LADDER = [
  [200, 1000],
  [500, 2000],
  [900, 3000],
  [1800, 5000],
  [2400, 8000],
  [3800, 12000],
];

/** EXP:1（肛门经验）六档 → [SOURCE:2 系数, SOURCE:6 直填]（COMF49:40-59，半阈值） */
const ANAL_EXP_LADDER = [
  [0.5, 2000],
  [1, 300],
  [1.1, 50],
  [1.2, 10],
  [1.4, 0],
  [1.6, 0],
];

/**
 * @COM49 肛门电极（COMF49:7-142）。装着/解除切换（TEQUIP:49 取反）。
 * @returns {Promise<number>} 原作 RETURN 1
 */
async function com49() {
  const target = era_flag.target;

  era.print('肛门电极'); // :9
  await train_message_b(); // :11

  add_lose(target, 0, 100); // :16
  add_lose(target, 1, 150); // :17

  // —— ソースの計算（:13-131）——
  // :19-38 ABL:3 六档（S2/S13）
  const anal = ELECTRODE_LADDER[Math.min(abl(target, 3), 5)];
  set_src(target, 2, anal[0]);
  set_src(target, 13, anal[1]);

  // :40-59 EXP:1 六档（**半阈值** EXPLV:n/2——46/49 两个本体同形）：S2 系数
  // × S6 直填；整阈值只在 EQUIP_COM49 出现（见下）
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

  // :61-77 PALAM:3（润滑）：S2 ×0.4-1.8 + S6 += 800/500/300/120/100
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

  // :79-105 S2 再乘 欲情（:79-90）× 顺从（:92-105，肛门系表）
  set_src(target, 2, times(src(target, 2), lust_factor(target)));
  set_src(target, 2, times(src(target, 2), anal_obey_factor(target)));

  // :83-88 体型三连（S6）——COMF49 的娇小注释写「娇小」、46 写「小柄体形」，
  // 同为 TALENT:100
  set_src(target, 6, body_factor(target, src(target, 6)));

  // :117-127 肛门钝感/敏感（S6/S13/S14）
  set_src(target, 6, anal_sense_factor(target, src(target, 6)));
  set_src(target, 13, anal_sense_factor(target, src(target, 13)));
  set_src(target, 14, anal_sense_factor(target, src(target, 14)));

  // :129-131 看重贞操的处女 → S13 /= 3
  if ((era.get(`exp:${target}:0`) || 0) === 0 && tal(target, 30)) {
    set_src(target, 13, Math.floor(src(target, 13) / 3));
  }

  // —— 経験上昇（:133-137）——
  chara(target).dungeon.肛门经验 += 5; // :136 EXP:1（属主 dungeon，走门面）
  era.print('肛门经验＋５'); // :137

  // :139-140 電極の着脱
  set_tq(target, 49, 1 - tq(target, 49));

  return 1; // :142
}

// —— @EQUIP_COM43-49 装备持续效果（各 COMF 文件内、SYSTEM_SOURCE:58-123
//    的 SIF 链逐位调用；接线循环在 event/source-check.js，链表在
//    com-family.js 的 EQUIP_COM_CHAIN） ——

/**
 * @EQUIP_COM43 眼罩装着中（COMF43:95-189）。每回合的持续 SOURCE/UP。
 * @returns {Promise<number>} 原作 RETURN 1
 */
async function equip_com43() {
  const target = era_flag.target;
  const player = era_flag.player;

  era.print('＜眼罩装着中＞'); // :97 PRINTL

  // LOSEBASE:0 += 0（:99 空扣不落）；:100-107 紧缚经验减免（半阈值）
  const [, lose1] = bondage_cost(target, [
    [0, 100],
    [0, 80],
    [0, 60],
  ]);
  add_lose(target, 1, lose1);

  // :112-114 A = 250 / B = 1000 / C = 500
  // :116-157 欲情 × 顺从 × 抖M 三连 + 倒错 ×2（A）
  let a = obey_maso_chain(target, 250);
  if (tal(target, 80)) {
    a = times(a, 2); // :159-161
  }
  // :162-164 胆怯 ×2（C）
  const c = tal(target, 10) ? times(500, 2) : 500;

  // :166-168 三格累加（SOURCE 是「+=」——叠在本回合指令已写的值上）
  set_src(target, 10, src(target, 10) + a);
  set_src(target, 12, src(target, 12) + 1000);
  set_src(target, 14, src(target, 14) + c);

  // :170-171 直写 UP（欲情 / 恐怖——UP:10 吃的是 SOURCE:14 的逃离值）
  add_up(target, 5, a);
  add_up(target, 10, src(target, 14));

  // —— 経験上昇（:173-187）——
  same_sex_exp(target, player, 1); // :176-184 +1
  era.add(`exp:${target}:51`, 1); // :186-187 紧缚经验
  era.print('紧缚经验＋１');

  return 1; // :189
}

/** ABL:21（抖M气质）六档 → A（COMF44 的持续效果 :132-145） */
const ROPE_MASO_LADDER = [60, 180, 300, 480, 700, 850];

/**
 * @EQUIP_COM44 绳子で緊縛中（COMF44:110-190）。
 * @returns {Promise<number>} 原作尾部隐式 RETURN 0（源无 RETURN——Emuera
 *   函数落尾返回 0；调用方不读返回值，见 SYSTEM_SOURCE 的 SIF/CALL）
 */
async function equip_com44() {
  const target = era_flag.target;
  const player = era_flag.player;

  era.print(tq(target, 90) ? '＜触手紧缚中＞' : '＜紧缚中＞'); // :111-115

  // :120-130 紧缚经验减免（半阈值）
  const [lose0, lose1] = bondage_cost(target, [
    [50, 100],
    [40, 80],
    [30, 60],
  ]);
  add_lose(target, 0, lose0);
  add_lose(target, 1, lose1);

  // :132-145 A = 抖M档 → 倒错 ×2（:147-149）→ 欲情 ×（:151-162）
  let a = ROPE_MASO_LADDER[Math.min(abl(target, 21), 5)];
  if (tal(target, 80)) {
    a = times(a, 2);
  }
  a = times(a, lust_factor(target));

  // :164-167 四格累加
  set_src(target, 6, src(target, 6) + a);
  set_src(target, 12, src(target, 12) + a);
  set_src(target, 13, src(target, 13) + a);
  set_src(target, 14, src(target, 14) + a);

  // —— 経験上昇（:169-189）——
  same_sex_exp(target, player, 1); // :172-180
  master_exp(target, 2); // :182-183 ASSIPLAY == 0 && ABL:21 >= 2

  // :185-186 触手调教中 T:0 += 1
  if (tq(target, 90)) {
    era.add('t:0', 1);
  }

  era.add(`exp:${target}:51`, 2); // :188-189
  era.print('紧缚经验＋２');

  return 0; // 源尾隐式（函数体止于 :189）
}

/** ABL:21 六档 → A（COMF45 的持续效果 :69-82） */
const GAG_MASO_LADDER = [40, 120, 250, 450, 600, 750];

/**
 * @EQUIP_COM45 口塞装備中（COMF45:50-117）。
 * @returns {Promise<number>} 源尾隐式 RETURN 0
 */
async function equip_com45() {
  const target = era_flag.target;
  const player = era_flag.player;

  era.print('＜口塞装备中＞'); // :52

  // :54-64 紧缚经验减免（**整阈值** EXPLV:3/EXPLV:4，与 COM45 本体的半阈值
  // 互异——源 :55 起两处阶梯不同，1:1）
  const e51 = era.get(`exp:${target}:51`) || 0;
  const [lose0, lose1] =
    e51 < EXPLV[3] ? [50, 100] : e51 < EXPLV[4] ? [40, 80] : [30, 60];
  add_lose(target, 0, lose0);
  add_lose(target, 1, lose1);

  // :69-82 抖M档 → 欲情 ×（:84-95）
  let a = times(
    GAG_MASO_LADDER[Math.min(abl(target, 21), 5)],
    lust_factor(target),
  );

  // :97-100 四格累加
  set_src(target, 12, src(target, 12) + a);
  set_src(target, 13, src(target, 13) + a);
  set_src(target, 14, src(target, 14) + a);
  set_src(target, 16, src(target, 16) + a);

  // —— 経験上昇（:102-116）——
  same_sex_exp(target, player, 1); // :105-113
  era.add(`exp:${target}:51`, 1); // :115
  era.print('紧缚经验＋１'); // :116

  return 0; // 源尾隐式（:116 后即文件尾）
}

/**
 * @EQUIP_COM46 浣腸＋アナルプラグ挿入中（COMF46:203-352）。
 * @returns {Promise<number>} 源尾隐式 RETURN 0
 */
async function equip_com46() {
  const target = era_flag.target;
  const player = era_flag.player;

  era.print(tq(target, 90) ? '＜灌肠触手插入中＞' : '＜灌肠＋肛塞插入中＞'); // :204-208

  add_lose(target, 0, 100); // :210
  add_lose(target, 1, 80); // :211

  // —— ソースの計算（:213-333）——
  // :216-241 A/B = ABL:3 六档（与本体同表）
  const [a_base, b_base] = ANAL_LADDER[Math.min(abl(target, 3), 5)];

  // :244-256 EXP:1 六档——**半阈值**（EXPLV:2/2 起），与 EQUIP_COM49 的整
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

  // :258-274 润滑：A × 系数 + C += 800/500/300/120/100
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

  // :276-302 欲情 × 顺从（肛门系表）
  a = times(a, lust_factor(target));
  a = times(a, anal_obey_factor(target));

  // :303-311 体型三连（C）
  const c = body_factor(target, c_wet);

  // :313-323 肛门钝感/敏感——乘在**当前 SOURCE 格**上（叠完本体写的值）
  set_src(target, 6, anal_sense_factor(target, src(target, 6)));
  set_src(target, 13, anal_sense_factor(target, src(target, 13)));
  set_src(target, 14, anal_sense_factor(target, src(target, 14)));

  // :325-328 累加（注意 SOURCE:14 += B、不是 C——源 :328 原样）
  set_src(target, 2, src(target, 2) + a);
  set_src(target, 13, src(target, 13) + b_base);
  set_src(target, 6, src(target, 6) + c);
  set_src(target, 14, src(target, 14) + b_base);

  // :330-333 看重贞操的处女 → S13 /= 3
  if ((era.get(`exp:${target}:0`) || 0) === 0 && tal(target, 30)) {
    set_src(target, 13, Math.floor(src(target, 13) / 3));
  }

  // —— 経験上昇（:335-352）——
  chara(target).dungeon.肛门经验 += 3; // :338 EXP:1 += 3（属主 dungeon）
  era.print('肛门经验＋３'); // :339
  same_sex_exp(target, player, 1); // :341-349 +1

  // :351-352 触手调教中 T:0 += 1
  if (tq(target, 90)) {
    era.add('t:0', 1);
  }

  return 0; // 源尾隐式（:352 后即文件尾）
}

/** ABL:21 六档 → [SOURCE:11, SOURCE:10, SOURCE:15] 增量（COMF47:69-97） */
const BONDAGE_SUIT_LADDER = [
  [0, 0, 100],
  [50, 150, 0],
  [100, 300, 0],
  [150, 600, 0],
  [200, 1000, 0],
  [300, 2000, 0],
];

/** ABL:ASSI:20（助手的抖S气质）七档系数（COMF47:99-112） */
const ASSI_S_LADDER = [0.2, 0.5, 1, 1.5, 2.5, 3, 3];

/**
 * @EQUIP_COM47 拘束衣穿着中（COMF47:38-126）。
 * @returns {Promise<number>} 原作 RETURN 1（:126）
 */
async function equip_com47() {
  const target = era_flag.target;
  const assi = era_flag.assi;

  // :40 PRINTFORML ＜%SAVESTR:ASSI%束缚衣着装中＞
  era.print(`＜${chara_callname(assi)}束缚衣着装中＞`);

  // :42-49 抖M气质减免（== 0 / <= 2 / ELSE）
  const m = abl(target, 21);
  add_lose(target, 1, m === 0 ? 60 : m <= 2 ? 45 : 30);

  // —— ソースの計算（:51-120）——
  // :54 A = 300 → 恐怖档 ×（:56-67 PALAM:10）
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

  // :69-97 抖M六档（S11/S10/S15 三格增量各档直书；0 档另有 A ×0.60、
  // 1 档 ×1.00、2 档 ×1.60——A 的系数只在 0/1/2 档出现，3 档起没有 TIMES 行）
  const maso_idx = Math.min(abl(target, 21), 5);
  const [s11, s10, s15] = BONDAGE_SUIT_LADDER[maso_idx];
  set_src(target, 11, src(target, 11) + s11);
  set_src(target, 10, src(target, 10) + s10);
  set_src(target, 15, src(target, 15) + s15);
  if (maso_idx === 0) {
    a = times(a, 0.6); // :74
  } else if (maso_idx === 1) {
    a = times(a, 1); // :79（×1.00 原样保留）
  } else if (maso_idx === 2) {
    a = times(a, 1.6); // :84
  }

  // :99-112 助手的抖S气质七档（≥5 落 3.00）
  a = times(a, ASSI_S_LADDER[Math.min(abl(assi, 20), 6)]);

  // :114-116 胆怯 ×2
  if (tal(target, 10)) {
    a = times(a, 2);
  }

  // :118,120 累加 + 直写 UP:10
  set_src(target, 14, src(target, 14) + a);
  add_up(target, 10, src(target, 14));

  return 1; // :126（経験上昇段在源里只有空注释，RETURN 1 收尾）
}

/**
 * ABL:3 六档 → [A, B]（COMF49 持续效果 :158-181）
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
 * @EQUIP_COM49 肛门电极挿入中（COMF49:148-296）。
 * @returns {Promise<number>} 源尾隐式 RETURN 0
 */
async function equip_com49() {
  const target = era_flag.target;
  const player = era_flag.player;

  era.print('＜肛门电极插入中＞'); // :150

  add_lose(target, 0, 80); // :152
  add_lose(target, 1, 120); // :153

  // —— ソースの計算（:155-279）——
  const [a_base, b_base] = ELECTRODE_EQUIP_LADDER[Math.min(abl(target, 3), 5)];

  // :184-198 EXP:1 六档——**整阈值**（EXPLV:2/3/4/5 不除 2，全库唯一一处）
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

  // :200-215 润滑
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

  // :217-243 欲情 × 顺从（肛门系表）
  a = times(a, lust_factor(target));
  a = times(a, anal_obey_factor(target));

  // :245-253 体型三连（C）
  const c = body_factor(target, c_wet);

  // :255-265 肛门钝感/敏感（当前 SOURCE 格）
  set_src(target, 6, anal_sense_factor(target, src(target, 6)));
  set_src(target, 13, anal_sense_factor(target, src(target, 13)));
  set_src(target, 14, anal_sense_factor(target, src(target, 14)));

  // :267-270 累加（49 的持续版没有 SOURCE:14 += B——与 46 互异，源原样）
  set_src(target, 2, src(target, 2) + a);
  set_src(target, 13, src(target, 13) + b_base);
  set_src(target, 6, src(target, 6) + c);

  // :272-275 看重贞操的处女 → S13 /= 3
  if ((era.get(`exp:${target}:0`) || 0) === 0 && tal(target, 30)) {
    set_src(target, 13, Math.floor(src(target, 13) / 3));
  }

  // :272-275 看重贞操的处女 → S13 /= 3
  if ((era.get(`exp:${target}:0`) || 0) === 0 && tal(target, 30)) {
    set_src(target, 13, Math.floor(src(target, 13) / 3));
  }

  // —— 経験上昇（:277-291）——
  chara(target).dungeon.肛门经验 += 5; // :280
  era.print('肛门经验＋５'); // :281
  same_sex_exp(target, player, 1); // :283-291

  // :293-294 触手调教中 T:0 += 1
  if (tq(target, 90)) {
    era.add('t:0', 1);
  }

  return 1; // :296（与 EQUIP_COM43/47 同为显式 RETURN 1）
}

// —— @COM_ABLE40-49（COMABLE.ERB:1878-2238） ——

/** SM 系过滤：FLAG:25 的 bit 16（爱抚系是 bit 1，com0 同表不同位） */
const sm_filtered = () => ((era.get('flag:25') || 0) & 16) !== 0;

/**
 * 场景四连挡（触手 90 / 使役 88 / 兽奸 89 / 死斗场 55）。40/41/44/46/48/49
 * 的原文顺序即此；42 写作 90/89/88（互异但都是独立 SIF-RETURN，结果等价，
 * 不逐字镜像顺序）。
 */
const scene_blocked = (cid) =>
  tq(cid, 90) || tq(cid, 88) || tq(cid, 89) || tq(cid, 55);

/**
 * 助手执行时的抖S门（41/42/48 的共形，40 同形但 ABL:ASSI:20 门槛低一档）：
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

// @COM_ABLE40（:1878-1901）：打屁股——无道具要求
com_able_family.register(40, async () => {
  if (sm_filtered()) {
    return 0; // :1881-1882
  }
  if (assi_maso_blocked(2)) {
    return 0; // :1884-1888
  }
  if (scene_blocked(era_flag.target)) {
    return 0; // :1890-1899
  }
  return 1;
});

// @COM_ABLE41（:1906-1938）：鞭——要 ITEM:10，另挡浴室/新妻
com_able_family.register(41, async () => {
  const cid = era_flag.target;
  if (sm_filtered()) {
    return 0; // :1909-1910
  }
  if (!has_item(10)) {
    return 0; // :1913-1914
  }
  if (assi_maso_blocked(3)) {
    return 0; // :1916-1920
  }
  if (scene_blocked(cid) || tq(cid, 58) || tq(cid, 59)) {
    return 0; // :1922-1936
  }
  return 1;
});

// @COM_ABLE42（:1943-1975）：针——要 ITEM:11
com_able_family.register(42, async () => {
  const cid = era_flag.target;
  if (sm_filtered()) {
    return 0; // :1946-1947
  }
  if (!has_item(11)) {
    return 0; // :1950-1951
  }
  if (assi_maso_blocked(3)) {
    return 0; // :1953-1957
  }
  if (scene_blocked(cid) || tq(cid, 58) || tq(cid, 59)) {
    return 0; // :1959-1973
  }
  return 1;
});

// @COM_ABLE43（:1980-2001）：眼罩——失神中挡、解除随时可
com_able_family.register(43, async () => {
  const cid = era_flag.target;
  if (sm_filtered()) {
    return 0; // :1983-1984
  }
  if ((era.get('tflag:899') || 0) > 0) {
    return 0; // :1986-1987 失神中
  }
  if (zooko_worn(cid) && era.get('flag:37')) {
    return 0; // :1989-1990 着ぐるみ（43 的原文带 FLAG:37）
  }
  if (tq(cid, 43)) {
    return 1; // :1993-1994 解除はいつでも可能
  }
  if (!has_item(5)) {
    return 0; // :1996-1997
  }
  if (tq(cid, 55)) {
    return 0; // :1999-2000 決闘中
  }
  return 1;
});

// @COM_ABLE44（:2006-2038）：绳子——调教者技巧 ≥3、助手要 ≥5
com_able_family.register(44, async () => {
  const cid = era_flag.target;
  if (sm_filtered()) {
    return 0; // :2009-2010
  }
  if (scene_blocked(cid)) {
    return 0; // :2012-2021
  }
  if (tq(cid, 44)) {
    return 1; // :2024-2025 解除
  }
  if (!has_item(14)) {
    return 0; // :2027-2028
  }
  if (abl(era_flag.player, 12) <= 2) {
    return 0; // :2030-2031 調教者の技巧
  }
  if (era_flag.assiplay && abl(era_flag.assi, 12) <= 4) {
    return 0; // :2033-2036 助手は技巧5
  }
  return 1;
});

// @COM_ABLE45（:2043-2072）：口塞——触手口辱/着ぐるみ挡（无 FLAG:37 臂）
com_able_family.register(45, async () => {
  const cid = era_flag.target;
  if (sm_filtered()) {
    return 0; // :2046-2047
  }
  if (tq(cid, 98)) {
    return 0; // :2049-2050 触手口辱中
  }
  if (zooko_worn(cid)) {
    return 0; // :2052-2053 着ぐるみ（45 的原文不带 FLAG:37）
  }
  if (tq(cid, 45)) {
    return 1; // :2056-2057 解除
  }
  if (!has_item(9)) {
    return 0; // :2059-2060
  }
  if (era_flag.assiplay && abl(era_flag.assi, 12) < 3) {
    return 0; // :2062-2065 助手は技巧3以上
  }
  if (tq(cid, 59)) {
    return 0; // :2067-2068 新妻
  }
  if (tq(cid, 55)) {
    return 0; // :2070-2071 決闘
  }
  return 1;
});

// @COM_ABLE46（:2077-2125）：灌肠——服装三挡 + 肛门经验/顺从欲望露出合计
com_able_family.register(46, async () => {
  const cid = era_flag.target;
  if (sm_filtered()) {
    return 0; // :2080-2081
  }
  if (scene_blocked(cid)) {
    return 0; // :2083-2092
  }
  if (lower_worn(cid)) {
    return 0; // :2094-2095 パンツか上着下・ズボン
  }
  if (diaper_worn(cid)) {
    return 0; // :2097-2098 オムツ
  }
  if (zooko_worn(cid) && era.get('flag:37')) {
    return 0; // :2100-2101 着ぐるみ（46 带 FLAG:37）
  }
  if (tq(cid, 46)) {
    return 1; // :2103-2104 解除
  }
  if (!has_item(15)) {
    return 0; // :2106-2107
  }
  if (tq(cid, 13) || tq(cid, 19) || tq(cid, 49)) {
    return 0; // :2109-2118 肛门振动棒/肛珠/电极使用中
  }
  if ((era.get(`exp:${cid}:1`) || 0) <= 25) {
    return 0; // :2120-2121 肛门经验 > 25
  }
  if (abl(cid, 10) + abl(cid, 11) + abl(cid, 17) < 10) {
    return 0; // :2123-2124 顺从+欲望+露出 ≥ 10
  }
  return 1;
});

// @COM_ABLE47（:2130-2148）：拘束衣——只能助手穿（ASSIPLAY && ASSI ≥ 1）
com_able_family.register(47, async () => {
  const cid = era_flag.target;
  if (sm_filtered()) {
    return 0; // :2133-2134
  }
  if (tq(cid, 47)) {
    return 1; // :2136-2137 解除
  }
  if (!has_item(23)) {
    return 0; // :2139-2140 拘束衣スーツ
  }
  if (era_flag.assiplay === 0 || era_flag.assi < 1) {
    return 0; // :2142-2143 助手じゃなきゃダメ
  }
  if (abl(era_flag.assi, 20) < 2) {
    return 0; // :2145-2146 助手の抖S气质 ≥ 2
  }
  return 1;
});

// @COM_ABLE48（:2153-2188）：践踏——对象须男人/扶她，服装三挡
com_able_family.register(48, async () => {
  const cid = era_flag.target;
  if (sm_filtered()) {
    return 0; // :2156-2157
  }
  if (!tal(cid, 121) && !tal(cid, 122)) {
    return 0; // :2159-2160 対象が男人か扶她
  }
  if (assi_maso_blocked(2)) {
    return 0; // :2162-2166
  }
  if (scene_blocked(cid)) {
    return 0; // :2168-2177
  }
  if (lower_worn(cid)) {
    return 0; // :2179-2180
  }
  if (diaper_worn(cid)) {
    return 0; // :2182-2183
  }
  if (zooko_worn(cid) && era.get('flag:37')) {
    return 0; // :2185-2186（48 带 FLAG:37）
  }
  return 1;
});

// @COM_ABLE49（:2193-2238）：肛门电极——服装三挡 + 与灌肠/肛具互斥
com_able_family.register(49, async () => {
  const cid = era_flag.target;
  if (sm_filtered()) {
    return 0; // :2196-2197
  }
  if (scene_blocked(cid)) {
    return 0; // :2199-2208
  }
  if (lower_worn(cid)) {
    return 0; // :2210-2211
  }
  if (diaper_worn(cid)) {
    return 0; // :2213-2214
  }
  if (zooko_worn(cid) && era.get('flag:37')) {
    return 0; // :2216-2217（49 带 FLAG:37）
  }
  if (tq(cid, 49)) {
    return 1; // :2219-2220 解除
  }
  if (!has_item(21)) {
    return 0; // :2222-2223
  }
  if (tq(cid, 13) || tq(cid, 19) || tq(cid, 46)) {
    return 0; // :2225-2234 肛门振动棒/肛珠/普通の浣腸使用中
  }
  if (tq(cid, 58)) {
    return 0; // :2236-2237 浴室
  }
  return 1;
});

// —— TRAIN_MESSAGE_B 的 SELECTCOM 40-49 分支（EVENT_TRAIN_MESSAGE_B.ERB
//    :1742-1900；公共头（省略设定 + 点线）在 train-message.js） ——

/** 目标名（%SAVESTR:TARGET% → callname，#171 裁定） */
const target_name = () => chara_callname(era_flag.target);

/**
 * B 分支 40-44 的着ぐるみ共形：CFLAG:42 == 11 且特别服装位 → true。分支内
 * 两处出现（正文 + 尾句），各自独立判定（原作写两遍，行为一致）。
 */
const in_zooko = () => zooko_worn(era_flag.target);

// :1742-1764 打屁股
train_message_b_family.register(40, async () => {
  const target = era_flag.target;
  const player_name = chara_callname(era_flag.player);
  const tname = target_name();

  // :1743-1751 第一行：%PLAYER%在 +（着ぐるみ → <特别服装>外面、/ 目标名
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
  era.print(`${line}一掌一掌地拍打着。`); // :1752 PRINTFORML

  // :1753-1763 尾句三支
  if (in_zooko()) {
    era.print(`${clothtype_special_text(target)}里的${tname}、好像不太有感觉…`);
  } else if (
    era_flag.prevcom === 40 &&
    ((era.get(`cflag:${target}:40`) || 0) & 16) === 0
  ) {
    era.print(`${tname}被打的地方越来越红了…`); // :1757-1758 连续打
  } else if (((era.get(`cflag:${target}:40`) || 0) & 16) === 0) {
    era.print(`${tname}被打的地方变红了…`); // :1759-1760
  }
});

// :1765-1783 鞭
train_message_b_family.register(41, async () => {
  const target = era_flag.target;
  const player_name = chara_callname(era_flag.player);
  const tname = target_name();

  // :1766-1772 第一行
  let line = player_name;
  if (in_zooko()) {
    line += clothtype_special_text(target);
  } else {
    line += `在${tname}的身上`;
  }
  era.print(`${line}挥下鞭子…`); // :1773

  // :1774-1782 尾句三支
  if (in_zooko()) {
    era.print(`${clothtype_special_text(target)}里的${tname}、好像不太有效…`);
  } else if (era_flag.prevcom === 41) {
    era.print(`${tname}身上的鞭痕越来越多了…`);
  } else {
    era.print(`${tname}的身上、开始出现红肿的鞭痕…`);
  }
});

// :1784-1806 针
train_message_b_family.register(42, async () => {
  const target = era_flag.target;
  const tname = target_name();
  const player_name = chara_callname(era_flag.player);

  // :1785-1797 第一行（着ぐるみ支的行尾「了、」字面 1:1）
  let line = `${player_name}、用针扎`;
  if (in_zooko()) {
    era.print(`${line}${clothtype_special_text(target)}了、`);
  } else {
    line += tname;
    if (tal(target, 244)) {
      line += '蓝色的'; // :1790 恶魔肌肤
    } else if (tal(target, 253)) {
      line += '褐色的'; // :1792
    } else if (tal(target, 255)) {
      line += '白皙的'; // :1794
    }
    era.print(`${line}肌肤…`); // :1796 PRINTL
  }

  // :1798-1804 着ぐるみ尾句（非着ぐるみ支无尾句）
  if (in_zooko()) {
    era.print(`${clothtype_special_text(target)}里的${tname}、好像不太有效…`);
  }
});

// :1807-1815 眼罩（分支打印在 TEQUIP 取反**之前**：装着中 → 即将解下）
train_message_b_family.register(43, async () => {
  const tname = target_name();
  if (tq(era_flag.target, 43)) {
    era.print(`${tname}的眼罩被解下来了。`);
  } else {
    era.print(`${tname}被眼罩罩着。`);
  }
});

// :1816-1830 绳子
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

// :1831-1839 口塞
train_message_b_family.register(45, async () => {
  const tname = target_name();
  if (tq(era_flag.target, 45)) {
    era.print(`${tname}的口塞被拿下来了。`);
  } else {
    era.print(`${tname}被装上了口塞。`);
  }
});

// :1840-1864 灌肠+肛塞
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

// :1865-1882 拘束衣（%SAVESTR:ASSI% 的肤色三选一）
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

// :1883-1891 践踏（欲情 PALAMLV:3 以上 → 硬梆梆的）
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

// :1892-1900 肛门电极
train_message_b_family.register(49, async () => {
  const tname = target_name();
  if (tq(era_flag.target, 49)) {
    era.print(`${tname}体内的电极被拿下来了…`);
  } else {
    era.print(`${tname}的菊花、被插入了电极…`);
  }
});

// —— TRAIN_MESSAGE_A 的 SELECTCOM 40-42 分支（EVENT_TRAIN_MESSAGE_A.ERB
//    :1208-1272；43-49 无 A 分支，维持缺省占位行） ——

/**
 * 痛苦反应的档位文本（:1229-1244，B = 0..5+）。
 */
const PAIN_REACTION = [
  (n) => `${n}发出了悲鸣、忍受着痛苦。`,
  (n) => `极度的痛苦让${n}口齿之间发出了越来越高亢的悲鸣。`,
  (n) => `无法忍受的痛苦让${n}大声尖叫、全身都弹起来了。`,
  (n) => `${n}因为痛苦而全身冒汗、疼得在地上打滚。`,
  (n) => `要命的痛苦让${n}意识都差点飞散了、发出了不堪入耳的野兽一样的哀嚎。`,
];

/**
 * :1208-1252 打屁股/鞭/针的共通反应。守卫的求值（Emuera 的 && 与 ||
 * 同优先级左结合）＝ (SELECTCOM ∈ {40,41,42}) && TFLAG:899 <= 1——三条
 * 指令都吃失神门（文件头「微妙点」第一条）；handler 注册在 40/41/42 三号，
 * 门由本函数自查（分发表只按号命中）。
 * @returns {Promise<void>}
 */
async function train_message_a_pain() {
  const target = era_flag.target;
  const tname = target_name();

  // :1208 的第三臂 + TFLAG:899 失神门（> 1 时不进本分支——整支跳过，
  // 与原作 ELSEIF 不命中同形）
  if ((era.get('tflag:899') || 0) > 1) {
    return;
  }

  // :1209-1221 A = UP:9（苦痛上升量，delta 表）→ 档位
  const a = era.get(`delta:${target}:9`) || 0;
  let b = a < 300 ? 0 : a < 1000 ? 1 : a < 2000 ? 2 : a < 3000 ? 3 : 4;

  // :1223-1227 害怕疼痛（40）+1 / 不惧疼痛（41）-1
  if (tal(target, 40)) {
    b += 1;
  }
  if (tal(target, 41)) {
    b -= 1;
  }

  // :1229-1244 IF B < 1…B < 5 五档 + ELSE 求饶档（B < 0 由首档兜住——
  // 不惧疼痛把档位压到负同样落「发出了悲鸣」）
  if (b < 5) {
    era.print(
      PAIN_REACTION[b < 1 ? 0 : b < 2 ? 1 : b < 3 ? 2 : b < 4 ? 3 : 4](tname),
    );
  } else {
    let line = `${tname}因为实在太痛、`;
    if (!tal(target, 45) && !tal(target, 310)) {
      line += '抽抽哒哒地哭着、'; // :1241-1242（不哭泣 45 / 阴毛状态 310）
    }
    era.print(`${line}拼命地求饶。`);
  }

  // :1245-1252 欲情 > 1000 的勃起/潮湿追加
  if ((era.get(`delta:${target}:5`) || 0) > 1000) {
    if (tal(target, 121) || tal(target, 122)) {
      era.print(`然而、${tname}因为痛苦而扭曲的身体上阴茎已经勃起了……`);
    } else {
      era.print(`然而、${tname}因为痛苦而扭曲的身体上股间已经潮湿了……`);
    }
  }

  // :1253-1272 浣腸＋アナルプラグ挿入中（TEQUIP:46 && TFLAG:899 <= 1）：
  // 源里这段写在分支体内（缩进误导已核，见文件头），仍是 40/41/42 的
  // 反应段一部分——本函数末尾同位
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

// —— @GET_ADV_COM 的 CASE 40（COMF_JUMP.ERB:605-626）与 @COM 注册 ——

/**
 * CASE 40：前回と今回の調教者が同じ（(ASSIPLAY && TFLAG:50) ||
 * (ASSIPLAY == 0 && TFLAG:50 == 0)）时，上回合为后背位族（PREVCOM ∈
 * {21,131,133,134}）、或上上回合 {21,131,132,133,134} 且上回合 {120,121}
 * （挿入Ｇスポ/子宮口）→ 探测 COM_ABLE132，可用即升格 132（背后位・打屁股，
 * COMF132——J19 的族）。规则体无 FLAG:71/TFLAG:42 副作用（体位族才有）。
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
    // CALL COM_ABLE132——J19 未落地时按「未定义即视为可执行」（#213 裁定）
    if ((await com_able_family.call(132, { whenMissing: 1 })) === 1) {
      return 132;
    }
  }
  return 40;
});

// @COM40-49 注册（COM 族）
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

// @EQUIP_COM43-49 注册（装备持续效果族；48 践踏无持续位——链上无 48）
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
  STUBBED_CALLS,
  equip_com43,
  equip_com44,
  equip_com45,
  equip_com46,
  equip_com47,
  equip_com49,
  event_seitsu_ashikoki,
};
