/**
 * @file 调教指令 20–29「性交系」族：阴道性交、逆强奸与肛交的 @COM、
 * @COM_ABLE、TRAIN_MESSAGE_A/B 及 @GET_ADV_COM 派生规则。
 *
 * 源: target/ERB/調教相關/COMF20_正常位.ERB         @COM20
 *     target/ERB/調教相關/COMF21_後背位.ERB           @COM21
 *     target/ERB/調教相關/COMF22_対面座位.ERB         @COM22
 *     target/ERB/調教相關/COMF23_背面座位.ERB         @COM23
 *     target/ERB/調教相關/COMF24_逆レイプ.ERB         @COM24
 *     target/ERB/調教相關/COMF25_逆アナルレイプ.ERB   @COM25
 *     target/ERB/調教相關/COMF26_正常位アナル.ERB     @COM26
 *     target/ERB/調教相關/COMF27_後背位アナル.ERB     @COM27
 *     target/ERB/調教相關/COMF28_対面座位アナル.ERB   @COM28
 *     target/ERB/調教相關/COMF29_背面座位アナル.ERB   @COM29
 *     target/ERB/調教相關/COMABLE.ERB                 @COM_ABLE20-29
 *     target/ERB/調教相關/COMF_JUMP.ERB               @GET_ADV_COM CASE 20-23/26-27
 *     target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB      @TRAIN_MESSAGE_A
 *     target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB      @TRAIN_MESSAGE_B
 *
 * J11（issue #221）。COM20–23 是阴道性交，24/25 是目标侵犯调教者，26–29
 * 是肛交。原作没有 EQUIP_COM20–29，故本文件不注册装备持续效果。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { PALAMLV } = require('#/era-utils/palam-level');
const { EXPLV } = require('#/era-utils/exp-level');
const { com_able_family, com_family } = require('#/system/train/com-family');
const { adv_com_family, get_adv_com } = require('#/system/train/com-adv');
const {
  train_message_a_family,
  train_message_b,
  train_message_b_family,
} = require('#/system/train/train-message');
const {
  confirm_lost_virgin,
  com_ejac_player_sex,
  com_after_vagina_sex,
} = require('#/system/train/com-vaginasex');
const {
  com_ejac_player_analsex,
  com_after_anal_sex,
} = require('#/system/train/com-analsex');
const {
  confirm_condom,
  confirm_condom2,
} = require('#/system/train/com-condom');
const { com_order } = require('#/system/train/com-order');
const { chara_callname } = require('#/utils/callname-utils');
const { monster_name, e_get } = require('#/dungeon/monster-data');
const { stub_line } = require('#/utils/stub-line');

/**
 * 本族升格规则能命中的、但尚未由追加与高级族实现的目标。命中后必须以
 * 占位 + RETURN 1 保持 JUMPFORM 语义，不能混成 COM 缺失或本回合取消。
 */
const STUBBED_CALLS = ['COM64', 'COM120', 'COM121', 'COM130', 'COM134'];

// —— 读取与写入：未声明序号均按原项目约定兜底为 0 ——
const get = (name) => era.get(name) || 0;
const set = (name, value) => era.set(name, value);
const add = (name, value) => era.add(name, value);
const tal = (cid, index) => get(`talent:${cid}:${index}`);
const abl = (cid, index) => Math.floor(get(`abl:${cid}:${index}`));
const exp = (cid, index) => get(`exp:${cid}:${index}`);
const palam = (cid, index) => get(`palam:${cid}:${index}`);
const tq = (cid, index) => get(`tequip:${cid}:${index}`);
const src = (cid, index) => get(`source:${cid}:${index}`);
const set_src = (cid, index, value) => set(`source:${cid}:${index}`, value);
const add_src = (cid, index, value) => add(`source:${cid}:${index}`, value);
const add_lose = (cid, index, value) =>
  add(`deltabase:${cid}:${index}`, -value);
const times = (value, multiplier) => Math.floor(value * multiplier);
const divide = (value, divisor) => Math.floor(value / divisor);
const below = (cid, index, level) => palam(cid, index) < PALAMLV[level];
const target_name = () => chara_callname(era_flag.target);
const player_name = () => chara_callname(era_flag.player);

/** 目标与上一回合调教者一致（Emuera 原式显式括号化）。 */
function same_trainer() {
  return (
    (era_flag.assiplay && get('tflag:50') !== 0) ||
    (!era_flag.assiplay && get('tflag:50') === 0)
  );
}

/** 当前调教者较上一回合发生主/助手切换（原作 OR 两臂）。 */
function switched_trainer() {
  return (
    (era_flag.assiplay && get('tflag:50') === 0) ||
    (!era_flag.assiplay && get('tflag:50') !== 0)
  );
}

/** PALAM 欲情等级：原作 A=1..5。 */
function lust_level(cid) {
  return below(cid, 5, 1)
    ? 1
    : below(cid, 5, 2)
      ? 2
      : below(cid, 5, 3)
        ? 3
        : below(cid, 5, 4)
          ? 4
          : 5;
}

/**
 * COM24/25 的实行值欲情档：原作低于 PALAMLV:1 是 L=0；与升格规则
 * （低档即 L=1）不同，不能共用 lust_level。
 */
function reverse_lust_level(cid) {
  return below(cid, 5, 1)
    ? 0
    : below(cid, 5, 2)
      ? 1
      : below(cid, 5, 3)
        ? 2
        : below(cid, 5, 4)
          ? 3
          : below(cid, 5, 5)
            ? 4
            : 5;
}

/** JUMPFORM COM{RESULT}：高级真身未落地时沿项目既有约定走登记存根。 */
async function jump_to_advanced(id) {
  if (com_family.has(id)) {
    return com_family.call(id);
  }
  stub_line(`COM${id}`, `指令 ${id} 的升格目标`, '随追加与高级指令票');
  return 1;
}

/** 阴道性交共通的 V 感觉初始 V 快感/情爱表。 */
function set_v_source(cid, table) {
  const [v, love] = table[Math.min(abl(cid, 2), table.length - 1)];
  set_src(cid, 1, v);
  set_src(cid, 3, love);
}

/** 私处经验分档：V 快乐倍率、疼痛及首次助手异常经验。 */
function vagina_experience_source(cid, rates, pains, add_abnormal) {
  const value = exp(cid, 0);
  const index =
    value < EXPLV[1]
      ? 0
      : value < EXPLV[2]
        ? 1
        : value < EXPLV[3]
          ? 2
          : value < EXPLV[4]
            ? 3
            : value < EXPLV[5]
              ? 4
              : 5;
  set_src(cid, 1, times(src(cid, 1), rates[index]));
  set_src(cid, 6, pains[index]);
  if (
    index === 0 &&
    add_abnormal &&
    era_flag.assiplay &&
    !tal(era_flag.player, 122)
  ) {
    chara(cid).dungeon.异常经验 += 1;
    era.print('异常经验＋１');
  }
}

/** 润滑对阴道性交 V 快感/疼痛的顺序乘算。 */
function vagina_lube_source(cid, rows) {
  const index = below(cid, 3, 1)
    ? 0
    : below(cid, 3, 2)
      ? 1
      : below(cid, 3, 3)
        ? 2
        : below(cid, 3, 4)
          ? 3
          : 4;
  const [v_rate, pain_add, pain_rate] = rows[index];
  set_src(cid, 1, times(src(cid, 1), v_rate));
  if (pain_add) {
    add_src(cid, 6, pain_add);
  }
  set_src(cid, 6, times(src(cid, 6), pain_rate));
}

/** 体型对疼痛的依序乘算；COM21 不含未熟倍率，其他阴道体位含。 */
function vagina_body_pain(cid, immature = true, sturdy_rate = 0.8) {
  if (tal(cid, 99)) set_src(cid, 6, times(src(cid, 6), sturdy_rate));
  if (tal(cid, 100)) set_src(cid, 6, times(src(cid, 6), 2));
  if (immature && tal(cid, 135)) set_src(cid, 6, times(src(cid, 6), 4));
}

/** 阴道性交的贞操/反感段（所有 20–23 同构）。 */
function vagina_chastity_source(cid) {
  if (tal(cid, 30)) {
    set_src(cid, 3, times(src(cid, 3), 0.6));
    set_src(cid, 15, exp(cid, 0) === 0 ? 10000 : 1000);
  } else if (tal(cid, 31) && exp(cid, 0) === 0) {
    set_src(cid, 3, times(src(cid, 3), 0.6));
    set_src(cid, 15, 300);
  } else if (exp(cid, 0) === 0) {
    set_src(cid, 15, 3000);
  }
}

/** 表驱动的 SOURCE 多格乘法，严格依传入顺序截断。 */
function multiply_source(cid, entries) {
  for (const [index, multiplier] of entries) {
    set_src(cid, index, times(src(cid, index), multiplier));
  }
}

/** 阴道性交末尾的调教者阴核快感加算。 */
function player_clit_source(cid) {
  // 原作 MIN(ABL:技巧 + ABL:PLAYER:技巧) 是单参 MIN，等于和本身。
  const local = 100 + 10 * (abl(cid, 12) + abl(era_flag.player, 12));
  add_src(era_flag.player, 0, divide(150 * local, 100));
}

/** 调教者技巧对情爱/液体/阴核快感的表（22/23/28/29 共用）。 */
function player_skill_source(cid, source10_assign) {
  const row = [
    [100, 0, 0],
    [150, 50, 0],
    [200, 100, 0],
    [300, 150, 50],
    [500, 250, 100],
    [800, 400, 300],
  ][Math.min(abl(era_flag.player, 12), 5)];
  add_src(cid, 3, row[0]);
  if (source10_assign && abl(era_flag.player, 12) === 0) {
    set_src(cid, 10, row[1]);
  } else {
    add_src(cid, 10, row[1]);
  }
  add_src(cid, 0, row[2]);
  return row[2];
}

// —— COM20–23：阴道性交源计算 ——

const V20_TABLE = [
  [40, 150],
  [150, 250],
  [400, 350],
  [1000, 500],
  [1700, 700],
  [2200, 1000],
];
const V21_TABLE = [
  [40, 50],
  [150, 150],
  [400, 250],
  [1000, 350],
  [1700, 600],
  [2200, 850],
];
const V22_TABLE = [
  [40, 150],
  [150, 250],
  [300, 350],
  [700, 500],
  [1100, 700],
  [1500, 1000],
];
const V23_TABLE = [
  [50, 50],
  [150, 100],
  [300, 200],
  [600, 300],
  [1000, 500],
  [1500, 700],
];

const V_LUST_20 = [
  [0.6, 0.3],
  [0.8, 0.6],
  [1, 1],
  [1.2, 1.5],
  [1.5, 1.8],
];
const V_LUST_22 = [
  [0.8, 0.8],
  [1, 1.2],
  [1.2, 1.8],
  [1.4, 2.4],
  [1.6, 3],
];
const V_LUST_23 = [
  [0.8, 0.8, 0.6],
  [1, 1, 1],
  [1.2, 1.1, 1.5],
  [1.4, 1.2, 2],
  [1.6, 1.3, 2.6],
];
const V_OBEY_20 = [
  [0.5, 0.6, 2],
  [0.8, 0.8, 1.5],
  [1, 1, 1],
  [1.3, 1.2, 0.8],
  [1.6, 1.4, 0.6],
  [2, 1.6, 0.3],
];
const V_OBEY_22 = [
  [0.8, 0.9, 2],
  [1.1, 1.2, 1.6],
  [1.5, 1.6, 1.2],
  [1.8, 1.9, 1],
  [2.4, 2.6, 1],
  [3, 3.6, 1],
];
const V_OBEY_23 = [
  [1.5, 1, 2],
  [1.5, 1.3, 1.8],
  [1.5, 1.5, 1.6],
  [1.8, 1.9, 1.4],
  [2.1, 2.2, 1.2],
  [2.5, 2.6, 1],
];

function vagina_lust_source(cid, table, clit = false) {
  const index = below(cid, 5, 1)
    ? 0
    : below(cid, 5, 2)
      ? 1
      : below(cid, 5, 3)
        ? 2
        : below(cid, 5, 4)
          ? 3
          : 4;
  const row = table[index];
  set_src(cid, 1, times(src(cid, 1), row[0]));
  if (clit) set_src(cid, 0, times(src(cid, 0), row[1]));
  set_src(cid, 3, times(src(cid, 3), row[clit ? 2 : 1]));
}

function vagina_obey_source(cid, table) {
  const [v, love, aversion] = table[Math.min(abl(cid, 10), table.length - 1)];
  multiply_source(cid, [
    [1, v],
    [3, love],
    [15, aversion],
  ]);
}

function vagina_common_source(cid, spec) {
  set_v_source(cid, spec.table);
  vagina_experience_source(cid, spec.exp_rates, spec.pains, spec.add_abnormal);
  vagina_lube_source(cid, spec.lube);
  if (era_flag.assiplay && tal(era_flag.assi, 121)) {
    set_src(cid, 1, times(src(cid, 1), 2.5));
  }
  vagina_body_pain(cid, spec.immature, spec.sturdy_rate);
  vagina_chastity_source(cid);
  vagina_lust_source(cid, spec.lust, spec.clit);
  vagina_obey_source(cid, spec.obey);
}

function service_spirit_source(cid) {
  const [a, b, dependence, lust_rate] = [
    [50, 10, 100, 4],
    [150, 50, 300, 2.5],
    [300, 100, 700, 1.5],
    [400, 200, 1200, 1],
    [500, 300, 1800, 0.5],
    [800, 500, 2500, 0.1],
  ][Math.min(abl(cid, 16), 5)];
  set_src(cid, 4, a);
  set_src(cid, 5, b);
  set_src(cid, 16, dependence);
  set_src(cid, 8, times(src(cid, 8), lust_rate));
}

function breast_clit_source(cid) {
  const [breast, love] = [
    [50, 50],
    [200, 200],
    [500, 400],
    [800, 600],
    [1300, 1000],
    [1800, 1400],
  ][Math.min(abl(cid, 1), 5)];
  set_src(cid, 17, breast);
  add_src(cid, 3, love);
  set_src(cid, 0, [40, 160, 500, 900, 1400, 2100][Math.min(abl(cid, 0), 5)]);
}

function source20() {
  const cid = era_flag.target;
  add_lose(cid, 0, 50);
  add_lose(cid, 1, 100);
  set_src(cid, 12, 400);
  vagina_common_source(cid, {
    table: V20_TABLE,
    exp_rates: [0.2, 0.6, 1, 1.2, 1.3, 1.8],
    pains: [5500, 300, 50, 10, 0, 0],
    lube: [
      [0.1, 1000, 3],
      [0.4, 300, 1],
      [1, 0, 0.5],
      [1.4, 0, 0.2],
      [1.8, 0, 0.1],
    ],
    immature: true,
    lust: V_LUST_20,
    obey: V_OBEY_20,
    add_abnormal: false,
  });
  player_clit_source(cid);
}

function source21() {
  const cid = era_flag.target;
  add_lose(cid, 0, 50);
  add_lose(cid, 1, 100);
  set_src(cid, 12, 800);
  vagina_common_source(cid, {
    table: V21_TABLE,
    exp_rates: [0.2, 0.6, 1, 1.2, 1.3, 1.8],
    pains: [5000, 220, 30, 5, 0, 0],
    lube: [
      [0.1, 900, 3],
      [0.4, 250, 1],
      [1, 0, 0.5],
      [1.4, 0, 0.2],
      [1.8, 0, 0.1],
    ],
    immature: false,
    sturdy_rate: 1.8,
    lust: V_LUST_20,
    obey: V_OBEY_20,
    add_abnormal: true,
  });
  player_clit_source(cid);
}

function source22() {
  const cid = era_flag.target;
  add_lose(cid, 0, 10);
  add_lose(cid, 1, 80);
  set_src(cid, 7, 100);
  set_src(cid, 12, 100);
  set_v_source(cid, V22_TABLE);
  vagina_experience_source(
    cid,
    [0.2, 0.6, 1, 1.1, 1.2, 1.3],
    [3500, 250, 50, 10, 0, 0],
    true,
  );
  service_spirit_source(cid);
  vagina_lube_source(cid, [
    [0.5, 1000, 2.5],
    [0.8, 300, 1],
    [1, 0, 0.5],
    [1.2, 0, 0.2],
    [1.5, 0, 0.1],
  ]);
  if (era_flag.assiplay && tal(era_flag.assi, 121))
    set_src(cid, 1, times(src(cid, 1), 2.5));
  vagina_body_pain(cid, true);
  vagina_chastity_source(cid);
  vagina_lust_source(cid, V_LUST_22);
  vagina_obey_source(cid, V_OBEY_22);
  const extra = player_skill_source(cid, false);
  // 原作 SIF EXPLV 槽零 >= 3：读数组槽零（0），恒不成立，原样保留。
  if (EXPLV[0] >= 3) add_src(cid, 1, extra);
  if (tal(cid, 85))
    multiply_source(cid, [
      [3, 3],
      [7, 2],
      [16, 2],
    ]);
  player_clit_source(cid);
}

function source23() {
  const cid = era_flag.target;
  add_lose(cid, 0, 20);
  add_lose(cid, 1, 150);
  set_src(cid, 12, 200);
  set_v_source(cid, V23_TABLE);
  vagina_experience_source(
    cid,
    [0.2, 0.6, 1, 1.2, 1.4, 1.6],
    [3000, 240, 30, 5, 0, 0],
    true,
  );
  breast_clit_source(cid);
  vagina_lube_source(cid, [
    [0.4, 600, 2.6],
    [0.7, 180, 1],
    [1, 0, 0.5],
    [1.2, 0, 0.2],
    [1.6, 0, 0.1],
  ]);
  if (era_flag.assiplay && tal(era_flag.assi, 121))
    set_src(cid, 1, times(src(cid, 1), 2.5));
  vagina_body_pain(cid, true);
  vagina_chastity_source(cid);
  vagina_lust_source(cid, V_LUST_23, true);
  vagina_obey_source(cid, V_OBEY_23);
  const extra = player_skill_source(cid, true);
  // 原作 SIF EXPLV 槽十 >= 3：未定义 EXPLV 槽按 0，恒不成立。
  if ((EXPLV[10] || 0) >= 3) add_src(cid, 1, extra);
  if (tal(cid, 85)) set_src(cid, 3, times(src(cid, 3), 2));
  player_clit_source(cid);
}

// —— COM24/25：逆侵犯的实行值、源与事后处理 ——

function check_reverse_sex(player_virgin_penalty) {
  const cid = era_flag.target;
  const player = era_flag.player;
  // COM_ORDER 会输出共通实行值明细；其 A/S 返回值必须接回后续原作累计。
  return com_order(0, 0).then(async ({ a, s }) => {
    const plus_level = (label, level, value) => {
      if (s) era.print(' + ');
      era.print(`${label}LV${level}(${value})`);
      s = 1;
    };
    const plus_flat = (label, value) => {
      if (s) era.print(' + ');
      era.print(`${label}(${value})`);
      s = 1;
    };
    const minus = (label, value) => {
      era.print(` - ${label}(${value})`);
      s = 1;
    };
    if (abl(cid, 11)) {
      const level = abl(cid, 11);
      const value = level * 2;
      a += value;
      plus_level('欲望', level, value);
    }
    if (abl(cid, 16)) {
      const level = abl(cid, 16);
      const value = level * 4;
      a += value;
      plus_level('侍奉精神', level, value);
    }
    if (get(`mark:${cid}:1`)) {
      const level = get(`mark:${cid}:1`);
      const value = level * 2;
      a += value;
      plus_level('快乐刻印', level, value);
    }
    const lust = reverse_lust_level(cid);
    if (lust) {
      const value = lust * 2;
      a += value;
      plus_level('欲情', lust, value);
    }
    if (abl(cid, 20)) {
      const level = abl(cid, 20);
      const value = level * 2;
      a += value;
      plus_level('抖S气质', level, value);
    }
    if (tal(cid, 35)) {
      a -= 1;
      minus('害羞', 1);
    }
    if (tal(cid, 63)) {
      a += 6;
      plus_flat(get('talentname:63') || '献身的', 6);
    }
    if (tal(cid, 70)) {
      a += 2;
      plus_flat('接受快感', 2);
    }
    if (tal(cid, 71)) {
      a -= 2;
      minus('否定快感', 2);
    }
    if (tal(cid, 79) && !tal(player, 122)) {
      a -= 5;
      minus('男人婆', 5);
    }
    if (tal(cid, 85) && !era_flag.assiplay) {
      a += 5;
      plus_flat('爱慕', 5);
    }
    if (player_virgin_penalty && tal(player, 0)) {
      a -= 15;
      minus('对方是处女', 15);
    }
    era.print(` = ${a}${a < 40 ? ' < ' : a === 40 ? ' = ' : ' > '}实行值40`);
    await era.waitAnyKey();
    return a >= 40 ? 1 : 0;
  });
}

async function confirm_reverse_virgin() {
  const player = era_flag.player;
  if (!tal(player, 0)) return await confirm_condom2();
  era.print(`${player_name()}的处女，要让${target_name()}夺走吗？`);
  era.printButton('好的', 0);
  era.printButton('不好', 1);
  // 非 0/1 的键入值在 ere 的按钮白名单处被拒收，不会到达这里。
  // 原作 CLEARLINE 1 只清该输入回显；有效输入不走这条分支。
  if ((await era.input()) === 1) return 0;
  return await confirm_condom2();
}

function reverse_source(cid) {
  add_lose(cid, 0, 50);
  add_lose(cid, 1, 200);
  set_src(cid, 12, 220);
  set_src(cid, 14, 50);
  // 阴核感觉初始赋值后被侍奉精神段覆写，仍照源逐段保留。
  set_src(cid, 0, [50, 200, 800, 1600, 2400, 3200][Math.min(abl(cid, 0), 5)]);
  const [clit, a, b] = [
    [800, 1600, 200],
    [1400, 1900, 400],
    [2000, 2300, 750],
    [2500, 2700, 1150],
    [2900, 3100, 1750],
    [3200, 3500, 2500],
  ][Math.min(abl(cid, 16), 5)];
  set_src(cid, 0, clit);
  set_src(cid, 4, a);
  set_src(cid, 5, b);
  const skill = abl(cid, 12);
  const factor = [0.5, 0.8, 1, 1.5, 2, 2.5, 3, 3.5, 4][Math.min(skill, 8)];
  set_src(cid, 0, times(src(cid, 0), 0.5));
  set_src(cid, 4, times(src(cid, 4), factor));
  set_src(cid, 5, times(src(cid, 5), factor));
  if (!tal(cid, 122) && !tal(era_flag.player, 122)) {
    const rate = [0.2, 0.4, 0.6, 0.8, 1, 1.2][Math.min(abl(cid, 22), 5)];
    multiply_source(cid, [
      [4, rate],
      [5, rate],
    ]);
  }
  if (tal(cid, 122) && tal(era_flag.player, 122)) {
    const rate = [0.2, 0.4, 0.6, 0.8, 1, 1.2][Math.min(abl(cid, 23), 5)];
    multiply_source(cid, [
      [4, rate],
      [5, rate],
    ]);
  }
}

function reverse_same_sex_exp(cid, player) {
  if (!tal(cid, 122) && !tal(player, 122)) {
    era.print(`${target_name()}与${player_name()}的百合经验+3`);
    add(`exp:${cid}:40`, 3);
    add(`exp:${player}:40`, 3);
  } else if (tal(cid, 122) && tal(player, 122)) {
    era.print(`${target_name()}与${player_name()}的断背经验+3`);
    add(`exp:${cid}:41`, 3);
    add(`exp:${player}:41`, 3);
  }
}

function event_seitsu(cid, site) {
  const player = era_flag.player;
  // 原式：SIF (TALENT:121 == 0 && TALENT:122 == 0) || TALENT:135 == 0 RETURN。
  if ((!tal(cid, 121) && !tal(cid, 122)) || !tal(cid, 135)) return;
  if (abl(cid, 0) <= 4 || tq(cid, 90) || tq(cid, 89)) return;
  if (get(`relation:${cid}:${player}`) < 150) return;
  era.print(
    `${player_name()}的${site}被侵犯着，${target_name()}开始精通这个了…`,
  );
  chara(cid).train.未熟 = 0;
}

function virgin_partner_code(relative, player_male) {
  if (relative === 1 && player_male) return 300;
  if (relative === 1 && !player_male) return 301;
  if (relative === 3 && player_male) return 304;
  if (relative === 3 && !player_male) return 305;
  if (relative === 4 && player_male) return 306;
  if (relative === 4 && !player_male) return 307;
  if (relative === 5 && !player_male) return 308;
  if (relative === 6 && player_male) return 309;
  return undefined;
}

function reverse_love_exp(cid) {
  const gain = tal(cid, 122) ? 2 : 1;
  if (get(`cflag:${cid}:2`) >= 1000 && !era_flag.assiplay) {
    era.print(`爱情经验+${gain}`);
    add(`exp:${cid}:23`, gain);
  }
}

async function reverse_post24() {
  const cid = era_flag.target;
  const player = era_flag.player;
  reverse_same_sex_exp(cid, player);
  chara(player).dungeon.私处经验 += 1;
  event_seitsu(cid, '私处');
  reverse_love_exp(cid);
  if (tal(player, 0)) {
    await era.printAndWait('【处女丧失】');
    chara(player).chara.处女 = 0;
    if (!chara(player).train.初体验对象) {
      // COMF24 的玩家记录段只记录 TARGET + 1 与名字；近亲编码是其后目标
      // 童贞丧失分支专属，不能套用到玩家处女记录。
      chara(player).train.初体验对象 = cid + 1;
      chara(player).train.初体验对象名 = target_name();
    }
  }
  if (tal(cid, 1)) {
    chara(cid).train.童贞 = 0;
    era.print('【童贞丧失】');
    if (!chara(cid).train.初体验对象) {
      chara(cid).train.初体验对象 = player + 1;
      chara(cid).train.初体验对象名 = player_name();
      const code = virgin_partner_code(get('tflag:14'), tal(player, 122));
      if (code !== undefined) chara(cid).train.初体验对象 = code;
    }
  }
  if (tal(cid, 119) || tal(cid, 121) || tal(cid, 122)) {
    set(`stain:${cid}:2`, get(`stain:${cid}:2`) | get(`stain:${player}:3`));
    set(`stain:${player}:3`, get(`stain:${player}:3`) | get(`stain:${cid}:2`));
  }
  game.train.屈服刻印结算 = 2;
}

function reverse_post25() {
  const cid = era_flag.target;
  const player = era_flag.player;
  reverse_same_sex_exp(cid, player);
  chara(player).dungeon.肛门经验 += 1;
  event_seitsu(cid, '直肠');
  reverse_love_exp(cid);
  if (tal(cid, 119) || tal(cid, 121) || tal(cid, 122)) {
    set(`stain:${cid}:2`, get(`stain:${cid}:2`) | get(`stain:${player}:4`));
    set(`stain:${player}:4`, get(`stain:${player}:4`) | get(`stain:${cid}:2`));
  }
  game.train.屈服刻印结算 = 2;
}

// —— COM26–29：肛交源计算 ——

const ANAL26_TABLE = [
  [10, 10, 100],
  [30, 30, 500],
  [400, 150, 1200],
  [900, 300, 2400],
  [1600, 500, 3600],
  [2100, 900, 5000],
];
const ANAL27_TABLE = [
  [10, 10, 100],
  [30, 30, 700],
  [500, 100, 1500],
  [1000, 200, 3000],
  [1700, 450, 5000],
  [2200, 750, 8000],
];
const ANAL_SEAT_TABLE = [
  [10, 10, 80],
  [30, 130, 300],
  [200, 500, 700],
  [500, 1000, 1500],
  [900, 1500, 2600],
  [1400, 2000, 4000],
];
const ANAL_EXP_26 = [
  [0.1, 20000, 50, 100],
  [0.3, 12000, 40, 80],
  [0.5, 5000, 30, 60],
  [1, 1800, 20, 40],
  [1.4, 1000, 10, 20],
  [1.6, 600, 0, 0],
];
const ANAL_EXP_SEAT = [
  [0.1, 18000, 40, 60],
  [0.3, 10000, 30, 50],
  [0.5, 4500, 20, 40],
  [1, 1500, 10, 30],
  [1.4, 700, 0, 20],
  [1.6, 300, 0, 0],
];
const ANAL_LUBE = [
  [0.4, 10000],
  [0.8, 3600],
  [1, 1200],
  [1.4, 200],
  [1.8, 100],
];
const ANAL_LUST = [
  [0.6, 0.6],
  [0.8, 0.8],
  [1, 1],
  [1.2, 1.2],
  [1.4, 1.4],
];
const ANAL_OBEY = [
  [0.6, 2],
  [0.8, 1.5],
  [1, 1],
  [1.2, 0.8],
  [1.4, 0.6],
  [1.6, 0.3],
];
const ANAL_SEAT_LUST = [
  [0.8, 0.8, 0.6],
  [1, 1, 1],
  [1.2, 1.1, 1.5],
  [1.4, 1.2, 2],
  [1.6, 1.3, 2.6],
];
const ANAL_SEAT_OBEY = [
  [1.5, 1, 2],
  [1.5, 1.3, 1.8],
  [1.5, 1.5, 1.6],
  [1.8, 1.9, 1.4],
  [2.1, 2.2, 1.2],
  [2.5, 2.6, 1],
];

function anal_experience_index(cid) {
  const value = exp(cid, 1);
  return value < EXPLV[1]
    ? 0
    : value < EXPLV[2]
      ? 1
      : value < EXPLV[3]
        ? 2
        : value < EXPLV[4]
          ? 3
          : value < EXPLV[5]
            ? 4
            : 5;
}

function set_anal_source(cid, table, accumulate = false) {
  const [anal, love, desire] = table[Math.min(abl(cid, 3), table.length - 1)];
  if (accumulate) {
    add_src(cid, 2, anal);
    add_src(cid, 3, love);
    add_src(cid, 13, desire);
  } else {
    set_src(cid, 2, anal);
    set_src(cid, 3, love);
    set_src(cid, 13, desire);
  }
}

function anal_experience_source(cid, table, add_loss) {
  const [rate, pain, lose0, lose1] = table[anal_experience_index(cid)];
  set_src(cid, 2, times(src(cid, 2), rate));
  set_src(cid, 6, pain);
  if (add_loss) {
    add_lose(cid, 0, lose0);
    add_lose(cid, 1, lose1);
  }
}

function anal_lube_source(cid) {
  const index = below(cid, 3, 1)
    ? 0
    : below(cid, 3, 2)
      ? 1
      : below(cid, 3, 3)
        ? 2
        : below(cid, 3, 4)
          ? 3
          : 4;
  const [rate, pain] = ANAL_LUBE[index];
  set_src(cid, 2, times(src(cid, 2), rate));
  add_src(cid, 6, pain);
}

function anal_body_pain(cid) {
  if (tal(cid, 99)) set_src(cid, 6, times(src(cid, 6), 0.8));
  if (tal(cid, 100)) set_src(cid, 6, times(src(cid, 6), 2));
  if (tal(cid, 135)) set_src(cid, 6, times(src(cid, 6), 2));
}

function anal_sense_source(cid) {
  if (tal(cid, 105))
    multiply_source(cid, [
      [6, 1.5],
      [13, 1.5],
      [14, 1.5],
    ]);
  else if (tal(cid, 106))
    multiply_source(cid, [
      [6, 0.6],
      [13, 0.6],
      [14, 0.6],
    ]);
}

function anal_chastity_source(cid) {
  if (!tal(cid, 30)) return;
  multiply_source(cid, [
    [3, 1.2],
    [16, 1.1],
  ]);
  set_src(cid, 15, exp(cid, 1) === 0 ? 500 : 0);
}

function anal_lust_source(cid, table = ANAL_LUST, clit = false) {
  const index = below(cid, 5, 1)
    ? 0
    : below(cid, 5, 2)
      ? 1
      : below(cid, 5, 3)
        ? 2
        : below(cid, 5, 4)
          ? 3
          : 4;
  const row = table[index];
  set_src(cid, 2, times(src(cid, 2), row[0]));
  if (clit) {
    set_src(cid, 0, times(src(cid, 0), row[1]));
    set_src(cid, 3, times(src(cid, 3), row[2]));
  } else {
    set_src(cid, 13, times(src(cid, 13), row[1]));
  }
}

function anal_obey_source(cid, table = ANAL_OBEY, anal = false) {
  const row = table[Math.min(abl(cid, 10), table.length - 1)];
  if (anal) {
    set_src(cid, 2, times(src(cid, 2), row[0]));
    set_src(cid, 3, times(src(cid, 3), row[1]));
    set_src(cid, 15, times(src(cid, 15), row[2]));
  } else {
    set_src(cid, 3, times(src(cid, 3), row[0]));
    set_src(cid, 15, times(src(cid, 15), row[1]));
  }
}

function source26() {
  const cid = era_flag.target;
  add_lose(cid, 0, 80);
  add_lose(cid, 1, 120);
  set_src(cid, 12, 400);
  set_anal_source(cid, ANAL26_TABLE);
  anal_experience_source(cid, ANAL_EXP_26, true);
  anal_lube_source(cid);
  // 源误写 V 快感格，非肛快感格，按原样保留。
  if (era_flag.assiplay && tal(era_flag.assi, 121))
    set_src(cid, 1, times(src(cid, 1), 2.5));
  anal_body_pain(cid);
  anal_chastity_source(cid);
  anal_lust_source(cid);
  anal_obey_source(cid);
  anal_sense_source(cid);
}

function source27() {
  const cid = era_flag.target;
  add_lose(cid, 0, 120);
  add_lose(cid, 1, 200);
  set_src(cid, 12, 1200);
  set_src(cid, 14, 1200);
  set_anal_source(cid, ANAL27_TABLE);
  // 与 COM26 的故意差异：EXP 分档不追加 LOSEBASE。
  anal_experience_source(cid, ANAL_EXP_26, false);
  anal_lube_source(cid);
  anal_lust_source(cid);
  if (era_flag.assiplay && tal(era_flag.assi, 121))
    set_src(cid, 2, times(src(cid, 2), 2.5));
  anal_body_pain(cid);
  anal_sense_source(cid);
  if (exp(cid, 0) === 0 && tal(cid, 30))
    set_src(cid, 13, divide(src(cid, 13), 3));
}

function source28() {
  const cid = era_flag.target;
  add_lose(cid, 0, 60);
  add_lose(cid, 1, 80);
  set_src(cid, 3, 100);
  set_src(cid, 7, 100);
  set_src(cid, 12, 100);
  set_anal_source(cid, ANAL_SEAT_TABLE, true);
  anal_experience_source(cid, ANAL_EXP_SEAT, true);
  service_spirit_source(cid);
  anal_lube_source(cid);
  // 源误写 V 快感格，非肛快感格，按原样保留。
  if (era_flag.assiplay && tal(era_flag.assi, 121))
    set_src(cid, 1, times(src(cid, 1), 2.5));
  anal_body_pain(cid);
  anal_sense_source(cid);
  anal_chastity_source(cid);
  anal_lust_source(cid);
  anal_obey_source(cid);
  player_skill_source(cid, false);
  if (tal(cid, 85))
    multiply_source(cid, [
      [3, 3],
      [7, 2],
      [16, 2],
    ]);
}

function source29() {
  const cid = era_flag.target;
  add_lose(cid, 0, 70);
  add_lose(cid, 1, 90);
  set_src(cid, 12, 200);
  set_anal_source(cid, ANAL_SEAT_TABLE, true);
  anal_experience_source(cid, ANAL_EXP_SEAT, true);
  breast_clit_source(cid);
  anal_lube_source(cid);
  // 源误写 V 快感格，非肛快感格，按原样保留。
  if (era_flag.assiplay && tal(era_flag.assi, 121))
    set_src(cid, 1, times(src(cid, 1), 2.5));
  anal_body_pain(cid);
  anal_sense_source(cid);
  anal_chastity_source(cid);
  anal_lust_source(cid, ANAL_SEAT_LUST, true);
  anal_obey_source(cid, ANAL_SEAT_OBEY, true);
  const extra = player_skill_source(cid, true);
  // 原作 SIF EXPLV 槽一 >= 3：读数组槽一（1），恒不成立。
  if (EXPLV[1] >= 3) add_src(cid, 2, extra);
  if (tal(cid, 85)) set_src(cid, 3, times(src(cid, 3), 1.5));
}

// —— @COM20–29 执行入口 ——

async function com_vagina(id, label, calculate) {
  if (!(await confirm_lost_virgin())) return 0;
  if (!(await confirm_condom())) return 0;
  const upgraded = await get_adv_com(id);
  if (upgraded !== id) return jump_to_advanced(upgraded);
  era.print(label);
  await train_message_b();
  const cid = era_flag.target;
  set('tflag:19', 1);
  if (
    (id === 20 && !era_flag.assiplay && exp(cid, 0) === 0 && !tq(cid, 89)) ||
    (id === 21 &&
      !era_flag.assiplay &&
      exp(cid, 0) === 0 &&
      !tq(cid, 89) &&
      !tq(cid, 55)) ||
    ((id === 22 || id === 23) &&
      tal(cid, 85) &&
      !era_flag.assiplay &&
      exp(cid, 0) === 0)
  ) {
    set('tflag:20', 1);
  }
  await com_ejac_player_sex();
  calculate();
  await com_after_vagina_sex();
  return 1;
}

async function com20() {
  return com_vagina(20, '正常位', source20);
}
async function com21() {
  return com_vagina(21, '背后位', source21);
}
async function com22() {
  return com_vagina(22, '对面座位', source22);
}
async function com23() {
  return com_vagina(23, '背面座位', source23);
}

async function com24() {
  era.print('逆强奸');
  if (!(await check_reverse_sex(true))) return 0;
  if (!(await confirm_reverse_virgin())) return 0;
  await train_message_b();
  await com_ejac_player_sex();
  reverse_source(era_flag.target);
  await reverse_post24();
  return 1;
}

async function com25() {
  era.print('逆肛门强奸');
  if (!(await check_reverse_sex(false))) return 0;
  await train_message_b();
  await com_ejac_player_analsex();
  reverse_source(era_flag.target);
  reverse_post25();
  return 1;
}

async function com_anal(id, label, calculate, advanced = false) {
  if (advanced) {
    const upgraded = await get_adv_com(id);
    if (upgraded !== id) return jump_to_advanced(upgraded);
  }
  era.print(label);
  await train_message_b();
  await com_ejac_player_analsex();
  calculate();
  await com_after_anal_sex();
  return 1;
}

async function com26() {
  return com_anal(26, '正常位肛交', source26, true);
}
async function com27() {
  return com_anal(27, '背后位肛交', source27, true);
}
async function com28() {
  return com_anal(28, '对面座位肛交', source28);
}
async function com29() {
  return com_anal(29, '背面座位肛交', source29);
}

// —— @COM_ABLE20–29：按 COMABLE.ERB 的 guard 顺序逐条保留 ——

const has_pband = () => get('item:4') !== 0;
const has_mat = () => get('item:13') !== 0 || get('noitem:0') !== 0;
const male_monster = () => [1, 7, 8, 10, 12].includes(e_get(307));
const clothes = (cid) => get(`cflag:${cid}:40`);
const special_clothes = (cid) => get(`cflag:${cid}:42`);
const clothing_guard = (cid) =>
  (clothes(cid) & 17) !== 0 && get('flag:37') !== 0;
const diaper_guard = (cid) =>
  special_clothes(cid) === 69 &&
  (clothes(cid) & 64) !== 0 &&
  get('flag:37') !== 0;
const belt_guard = (cid) =>
  special_clothes(cid) === 79 &&
  (clothes(cid) & 64) !== 0 &&
  get('flag:37') !== 0;
const zuko_guard = (cid) =>
  special_clothes(cid) === 11 &&
  (clothes(cid) & 64) !== 0 &&
  get('flag:37') !== 0;

function assi_v_guard(cid, threshold) {
  return (
    below(cid, 3, 2) &&
    era_flag.assiplay &&
    (abl(era_flag.assi, 10) <= threshold ||
      abl(era_flag.assi, 22) <= threshold) &&
    !tal(era_flag.assi, 83)
  );
}

function assi_virgin_guard(cid) {
  return (
    exp(cid, 0) === 0 &&
    era_flag.assiplay &&
    (abl(era_flag.assi, 10) <= 4 || abl(era_flag.assi, 22) <= 4) &&
    !tal(era_flag.assi, 83)
  );
}

function able20() {
  const cid = era_flag.target;
  const player = era_flag.player;
  if (get('flag:25') & 4) return 0;
  if (tq(cid, 11)) return 0;
  if (tq(cid, 55)) return 0;
  if (tal(cid, 122)) return 0;
  if (tal(cid, 135) && !tal(player, 83)) return 0;
  if (!tal(player, 121) && !tal(player, 122) && !has_pband()) return 0;
  if (assi_virgin_guard(cid)) return 0;
  if (assi_v_guard(cid, 3)) return 0;
  if (tq(cid, 90)) return 0;
  if (tq(cid, 89)) return 0;
  if (tq(cid, 88) && !male_monster()) return 0;
  if (tq(cid, 58) && !has_mat()) return 0;
  if (clothing_guard(cid)) return 0;
  if (diaper_guard(cid)) return 0;
  if (belt_guard(cid)) return 0;
  if (tal(cid, 273)) return 0;
  if (zuko_guard(cid)) return 0;
  return 1;
}

function able21() {
  const cid = era_flag.target;
  const player = era_flag.player;
  if (get('flag:25') & 4) return 0;
  if (tq(cid, 11)) return 0;
  if (tal(cid, 122)) return 0;
  if (tal(cid, 135) && !tal(player, 83)) return 0;
  if (!tal(player, 121) && !tal(player, 122) && !has_pband() && !tq(cid, 89))
    return 0;
  if (assi_virgin_guard(cid)) return 0;
  if (assi_v_guard(cid, 3)) return 0;
  if (tq(cid, 90)) return 0;
  if (tq(cid, 88) && !male_monster()) return 0;
  if (tq(cid, 55)) return 0;
  if (tq(cid, 58) && !has_mat()) return 0;
  if (clothing_guard(cid)) return 0;
  if (diaper_guard(cid)) return 0;
  if (belt_guard(cid)) return 0;
  if (tal(cid, 273)) return 0;
  if (zuko_guard(cid)) return 0;
  return 1;
}

function able22_or_23() {
  const cid = era_flag.target;
  const player = era_flag.player;
  if (get('flag:25') & 4) return 0;
  if (exp(cid, 0) === 0) return 0;
  if (tq(cid, 11)) return 0;
  if (tal(cid, 122)) return 0;
  if (tal(cid, 135) && !tal(player, 83)) return 0;
  if (tq(cid, 58) && !has_mat()) return 0;
  if (tq(cid, 90)) return 0;
  if (tq(cid, 89)) return 0;
  if (tq(cid, 88) && !male_monster()) return 0;
  if (tq(cid, 55)) return 0;
  if (!tal(player, 121) && !tal(player, 122) && !has_pband()) return 0;
  if (assi_virgin_guard(cid)) return 0;
  if (assi_v_guard(cid, 3)) return 0;
  if (clothing_guard(cid)) return 0;
  if (diaper_guard(cid)) return 0;
  if (belt_guard(cid)) return 0;
  if (tal(cid, 273)) return 0;
  if (zuko_guard(cid)) return 0;
  return 1;
}

function able24() {
  const cid = era_flag.target;
  const player = era_flag.player;
  if (get('flag:25') & 4) return 0;
  if (get('tflag:899') > 0) return 0;
  if (tq(cid, 55)) return 0;
  if (!tal(cid, 121) && !tal(cid, 122) && !has_pband()) return 0;
  if (tal(player, 122)) return 0;
  if (tq(cid, 90)) return 0;
  if (tq(cid, 88)) return 0;
  if (tq(cid, 89)) return 0;
  if (tq(cid, 58) && !has_mat()) return 0;
  if (clothing_guard(cid)) return 0;
  if (diaper_guard(cid)) return 0;
  if (belt_guard(cid)) return 0;
  if (zuko_guard(cid)) return 0;
  return 1;
}

function able25() {
  const cid = era_flag.target;
  if (get('flag:25') & 8) return 0;
  if (get('tflag:899') > 0) return 0;
  if (tq(cid, 55)) return 0;
  if (!tal(cid, 121) && !tal(cid, 122) && !has_pband()) return 0;
  if (tq(cid, 90)) return 0;
  if (tq(cid, 88)) return 0;
  if (tq(cid, 89)) return 0;
  if (tq(cid, 58) && !has_mat()) return 0;
  if (clothing_guard(cid)) return 0;
  if (diaper_guard(cid)) return 0;
  if (belt_guard(cid)) return 0;
  if (zuko_guard(cid)) return 0;
  return 1;
}

function able26() {
  const cid = era_flag.target;
  const player = era_flag.player;
  if (get('flag:25') & 8) return 0;
  if (tq(cid, 13)) return 0;
  if (tq(cid, 19)) return 0;
  if (tq(cid, 46)) return 0;
  if (tq(cid, 49)) return 0;
  if (exp(cid, 1) < 10) return 0;
  if (!tal(player, 121) && !tal(player, 122) && !has_pband()) return 0;
  if (assi_v_guard(cid, 3)) return 0;
  if (tq(cid, 90)) return 0;
  if (tq(cid, 89)) return 0;
  if (tq(cid, 88) && !male_monster()) return 0;
  if (tq(cid, 55)) return 0;
  if (tq(cid, 58) && !has_mat()) return 0;
  if (clothing_guard(cid)) return 0;
  if (diaper_guard(cid)) return 0;
  if (zuko_guard(cid)) return 0;
  return 1;
}

function able27() {
  const cid = era_flag.target;
  const player = era_flag.player;
  if (get('flag:25') & 8) return 0;
  if (tq(cid, 13)) return 0;
  if (tq(cid, 19)) return 0;
  if (tq(cid, 46)) return 0;
  if (!tal(player, 121) && !tal(player, 122) && !has_pband() && !tq(cid, 89))
    return 0;
  if (assi_v_guard(cid, 4)) return 0;
  if (exp(cid, 1) < 10) return 0;
  if (tq(cid, 90)) return 0;
  if (tq(cid, 88) && !male_monster()) return 0;
  if (tq(cid, 55)) return 0;
  if (tq(cid, 58) && !has_mat()) return 0;
  if (clothing_guard(cid)) return 0;
  if (diaper_guard(cid)) return 0;
  if (zuko_guard(cid)) return 0;
  return 1;
}

function able28_or_29() {
  const cid = era_flag.target;
  const player = era_flag.player;
  if (get('flag:25') & 8) return 0;
  if (tq(cid, 13)) return 0;
  if (tq(cid, 19)) return 0;
  if (tq(cid, 46)) return 0;
  if (tq(cid, 49)) return 0;
  if (exp(cid, 1) < 10) return 0;
  if (tq(cid, 58) && !has_mat()) return 0;
  if (tq(cid, 90)) return 0;
  if (tq(cid, 89)) return 0;
  if (tq(cid, 88) && !male_monster()) return 0;
  if (tq(cid, 55)) return 0;
  if (!tal(player, 121) && !tal(player, 122) && !has_pband()) return 0;
  if (assi_v_guard(cid, 3)) return 0;
  if (clothing_guard(cid)) return 0;
  if (diaper_guard(cid)) return 0;
  if (zuko_guard(cid)) return 0;
  return 1;
}

// —— @GET_ADV_COM CASE 20/21/22/23/26/27 ——

async function try_3p(previous, switch_previous) {
  if (era_flag.prevcom === 64) {
    if ((await com_able_family.call(64, { whenMissing: 1 })) === 1) {
      set('tflag:42', 1);
      return 64;
    }
  } else if (switched_trainer() && switch_previous.includes(era_flag.prevcom)) {
    if ((await com_able_family.call(64, { whenMissing: 1 })) === 1) return 64;
  }
  return previous;
}

async function vagina_advanced(id, series, threshold, previous, rand) {
  const cid = era_flag.target;
  if (
    !previous.includes(era_flag.prevcom) ||
    abl(era_flag.player, 12) <= 2 ||
    !same_trainer()
  ) {
    return id;
  }
  const cached = get('flag:71');
  if (divide(cached, 1000) === series) return cached % 1000;
  let score = lust_level(cid) * rand(11);
  score += rand(11) * abl(cid, 2);
  const advanced = score >= threshold ? 121 : 120;
  if ((await com_able_family.call(advanced, { whenMissing: 1 })) === 1) {
    set('flag:71', series * 1000 + advanced);
    return advanced;
  }
  return id;
}

adv_com_family.register(20, async (rand) => {
  // CASE 20：SP 分支 RETURN 130 先于 TFLAG:42 = 0，命中时保留旧值。
  // COMF_JUMP.ERB:152-163
  const prev2 = get('tflag:59');
  const prev = era_flag.prevcom;
  if (
    same_trainer() &&
    ((prev2 === 128 && prev === 129) ||
      (prev2 === 129 && prev === 128) ||
      (prev2 === 130 && (prev === 128 || prev === 129)))
  ) {
    if ((await com_able_family.call(130, { whenMissing: 1 })) === 1) return 130;
  }
  set('tflag:42', 0);
  const triplet = await try_3p(20, [27, 31, 80]);
  if (triplet !== 20) return triplet;
  return vagina_advanced(20, 1, 40, [20, 128, 129, 130], rand);
});

adv_com_family.register(21, async (rand) => {
  // CASE 21：SP 分支 RETURN 134 先于 TFLAG:42 = 0，命中时保留旧值。
  // COMF_JUMP.ERB:228-239
  const prev2 = get('tflag:59');
  const prev = era_flag.prevcom;
  if (same_trainer() && [131, 132, 134].includes(prev2) && prev === 133) {
    if ((await com_able_family.call(134, { whenMissing: 1 })) === 1) return 134;
  }
  set('tflag:42', 0);
  const triplet = await try_3p(21, [27, 31, 80]);
  if (triplet !== 21) return triplet;
  return vagina_advanced(21, 2, 50, [21, 131, 132, 133, 134], rand);
});

adv_com_family.register(22, async (rand) => {
  return vagina_advanced(22, 3, 30, [22], rand);
});
adv_com_family.register(23, async (rand) => {
  return vagina_advanced(23, 4, 60, [23], rand);
});
adv_com_family.register(26, async () => {
  set('tflag:42', 0);
  return try_3p(26, [31, 80]);
});
adv_com_family.register(27, async () => {
  set('tflag:42', 0);
  return try_3p(27, [20, 21, 31, 80]);
});

// —— TRAIN_MESSAGE_B：体位进入描写（原文 B 文件对应分支） ——

function vagina_phrase(cid, possessive = false) {
  let text = '';
  if (exp(cid, 0) === 0) text += '未经人事的';
  else if (!below(cid, 3, 4)) text += '湿漉漉的';
  text += tal(cid, 132) ? '幼女的阴部' : '阴部';
  return possessive ? `的${text}` : text;
}

function anal_phrase(cid) {
  let text = '';
  if (abl(cid, 3) >= 3) text += '对充分开发的';
  if (!below(cid, 3, 4)) text += '充满粘液的';
  return `${text}肛门`;
}

/** 死斗场 COM21 的原文用词与普通阴部描述不同，不能共用 vagina_phrase。 */
function arena_vagina_phrase(cid) {
  let text = '';
  if (exp(cid, 0) === 0) text += '未经人事的';
  else if (!below(cid, 3, 4)) text += '湿透了的';
  return `${text}${tal(cid, 132) ? '幼女的阴部' : '肉壶'}`;
}

function continuous_same(direct, historic, prev) {
  return (
    get('tflag:60') !== 0 &&
    (direct.includes(prev) ||
      (historic.includes(get('tflag:59')) && [120, 121].includes(prev))) &&
    same_trainer()
  );
}
function retain_virgin_blood() {
  if (get('tflag:31')) set('tflag:31', 2);
}

async function message_b20() {
  const cid = era_flag.target;
  const player = era_flag.player;
  const prev = era_flag.prevcom;
  if (tq(cid, 88)) {
    era.print(
      `${monster_name(e_get(300))}的性器从正面贯穿了${target_name()}的阴部……`,
    );
  } else if (continuous_same([20, 128, 129], [20, 128, 129, 130], prev)) {
    if (tal(player, 121) || tal(player, 122)) {
      era.print(`${target_name()}十分享受私处里的感觉、再次开始扭动腰肢…`);
    } else {
      era.print(
        `${target_name()}十分享受私处里的感觉、保持着插入、再次开始扭动腰肢…`,
      );
    }
    retain_virgin_blood();
  } else if (
    continuous_same(
      [21, 22, 23, 34, 131, 132, 133, 134],
      [21, 22, 23, 34, 131, 132, 133, 134],
      prev,
    )
  ) {
    era.print(
      `${player_name()}的阴茎让${target_name()}娇喘不已、保持着插入、${target_name()}仰面躺下、再次开始扭动腰肢…`,
    );
    retain_virgin_blood();
  } else {
    const tool =
      !tal(player, 121) && !tal(player, 122)
        ? '在自己的腰间装上了假阳具、'
        : '';
    era.print(
      `${player_name()}${tool}贯穿了${target_name()}的${
        tal(cid, 132) ? '幼女阴部' : vagina_phrase(cid)
      }……`,
    );
  }
}

function arena_vagina_message() {
  const code = get('tflag:400');
  if (code === 201) {
    const as_name = chara_callname(era_flag.assi);
    const tool =
      tal(era_flag.assi, 121) || tal(era_flag.assi, 122)
        ? '用阴茎'
        : has_pband()
          ? '用假阳具'
          : '';
    era.print(
      `${as_name}兴奋地抓住倒下了的${target_name()}的腰、${tool}强行插入了私处……`,
    );
  } else if (code === 202)
    era.print(
      `倒下了的${target_name()}被最下层居民抱着腰、被充满污垢的阴茎强行插入了私处……`,
    );
  else if (code === 203) {
    era.print(`企图逃跑的${target_name()}被抓了回来。`);
    era.print(`被绑着的${target_name()}被一只发霉的狗从后面用阴茎插入了私处……`);
  } else if (code === 204)
    era.print(
      `倒下了的${target_name()}的屁股被兽人抱着、用长满瘤子的丑陋阴茎强行插入了私处……`,
    );
  else if (code === 205) {
    era.print(`企图逃跑的${target_name()}被抓了回来。`);
    era.print(
      `被绑着的${target_name()}被一只腐烂的猪用带着腐汁把阴茎插入了私处……`,
    );
  } else if (code === 206)
    era.print(`巨魔那自傲的巨大阴茎勃起了、${target_name()}、请自求多福……`);
}

async function message_b21() {
  const cid = era_flag.target;
  const player = era_flag.player;
  const prev = era_flag.prevcom;
  if (tq(cid, 55)) {
    arena_vagina_message();
  }
  if (get('tflag:60') && prev === 21 && tq(cid, 89)) {
    era.print(`狗让${target_name()}的屁股紧贴着自己的下体、持续挺动着腰……`);
    if (abl(cid, 39) >= 3 && palam(cid, 5) > PALAMLV[4])
      era.print(`${target_name()}根据狗的动作、扭动腰肢熟练地配合着……`);
    retain_virgin_blood();
  } else if (tq(cid, 89)) {
    era.print(
      `听从${player_name()}的指令、流浪狗从后压倒了${target_name()}的身体、${vagina_phrase(cid)}被鼓胀发红的野兽阴茎插到了最深处…`,
    );
  } else if (tq(cid, 55) && era_flag.assi !== player) {
    if (get('tflag:400') === 206) {
      era.print(`巨魔用双手抓住${target_name()}、将她的身体上下剧烈套弄着、`);
      era.print(`${target_name()}口吐白沫、四肢无力、被做得筋疲力尽了。`);
    } else {
      era.print(
        `怪物压倒了${target_name()}、对${arena_vagina_phrase(cid)}疯狂地凌辱着……`,
      );
    }
  } else if (tq(cid, 88)) {
    era.print(
      `${monster_name(e_get(300))}的性器从后方贯穿了${target_name()}的阴部…`,
    );
  } else if (
    continuous_same([21, 131, 132, 133], [21, 131, 132, 133, 134], prev)
  ) {
    era.print(
      tal(player, 119) || tal(player, 121) || tal(player, 122)
        ? `${target_name()}享受着私处里的感觉、再次开始扭动腰肢了…`
        : `${target_name()}保持着插入、再次开始扭动腰肢了…`,
    );
    retain_virgin_blood();
  } else if (
    continuous_same(
      [20, 22, 23, 34, 128, 129, 130],
      [20, 22, 23, 34, 128, 129, 130],
      prev,
    )
  ) {
    era.print(`保持着插入、${target_name()}向后转身、再次开始扭动腰肢了…`);
    retain_virgin_blood();
  } else {
    const tool =
      tal(player, 121) || tal(player, 122)
        ? '用硬得不行的阴茎'
        : '用腰间的假阳具';
    era.print(
      `${player_name()}从后面将${target_name()}${vagina_phrase(cid)}的最深处${tool}刺了进去…`,
    );
  }
}

async function message_b22() {
  const cid = era_flag.target;
  const prev = era_flag.prevcom;
  const actor = tq(cid, 88) ? monster_name(e_get(300)) : player_name();
  if (continuous_same([22], [22], prev)) {
    era.print(
      `${actor}和${target_name()}拥吻着、舌头激烈地交缠、再次开始扭动腰肢…`,
    );
  } else if (
    continuous_same([20, 34, 128, 129, 130], [20, 34, 128, 129, 130], prev)
  ) {
    era.print(
      `${actor}保持着插入、${target_name()}紧紧地抱住${player_name()}、再次开始扭动腰肢…`,
    );
  } else {
    era.print(
      `${actor}抱着${target_name()}的胴体、慢慢地插入了${!below(cid, 3, 4) ? '湿漉漉的' : ''}${tal(cid, 132) ? '幼女的阴部' : '阴部'}……`,
    );
  }
}

function shame_reflection(cid) {
  if (!tq(cid, 57)) return;
  if (abl(cid, 17) >= 5)
    era.print(`${target_name()}凝视着镜子里自己淫荡的痴态、叫得更加妩媚了…`);
  else if (abl(cid, 17) >= 3)
    era.print(
      `${target_name()}凝视着镜子里自己的痴态、露出了沉醉在羞耻与快感中的表情…`,
    );
  else if (abl(cid, 17) >= 1)
    era.print(`${target_name()}羞得脸蛋通红、时而提高了艳丽的呻吟声…`);
  else era.print(`${target_name()}用手把脸遮起来、羞耻得身子颤动了…`);
}

async function message_b23() {
  const cid = era_flag.target;
  const prev = era_flag.prevcom;
  const same = same_trainer();
  const continued_same =
    get('tflag:60') &&
    (prev === 23 || (get('tflag:59') === 23 && [120, 121].includes(prev))) &&
    same;
  const continued_other = continuous_same(
    [21, 34, 131, 132, 133, 134],
    [21, 34, 131, 132, 133, 134],
    prev,
  );
  if (tq(cid, 57) && continued_same) {
    era.print(
      `${player_name()}用手从${target_name()}的阴部摸到胸部、卖弄般地再次扭动腰身了…`,
    );
  } else if (tq(cid, 57) && continued_other) {
    era.print(
      `阴茎在私处里依依不舍不想拔出来、${player_name()}从后抱着${target_name()}的身子、把她的脚大大地分开了…`,
    );
  } else if (tq(cid, 88)) {
    era.print(
      `${monster_name(e_get(300))}让${target_name()}背对坐在上面，用性器从后方贯穿了${target_name()}的阴部……`,
    );
  } else if (continued_same) {
    era.print(
      `${player_name()}从后面抱着${target_name()}、再次开始剧烈地摇动着${target_name()}的身体…`,
    );
  } else if (continued_other) {
    era.print(
      `阴茎在私处里依依不舍不想拔出来、${player_name()}从后抱着${target_name()}的身子、开始了淫靡的摇动…`,
    );
  } else if (tq(cid, 57)) {
    era.print(
      `${player_name()}抱着${target_name()}的胴体、慢慢地插入了${!below(cid, 3, 4) ? '湿漉漉的' : ''}${tal(cid, 132) ? '幼女的阴部' : '阴部'}进去、顺带着大大地分开了${target_name()}的双腿……`,
    );
  } else {
    era.print(
      `${player_name()}抱着${target_name()}的胴体、用${target_name()}期待着的东西缓缓贯穿了${!below(cid, 3, 4) ? '湿漉漉的' : ''}${tal(cid, 132) ? '幼女的阴部' : '阴部'}…`,
    );
  }
  shame_reflection(cid);
}

function reverse_lust_band(cid) {
  const lust = palam(cid, 5);
  if (lust >= PALAMLV[0] && lust <= PALAMLV[3]) return 'low';
  if (lust >= PALAMLV[3] && lust <= PALAMLV[5]) return 'middle';
  if (lust >= PALAMLV[5]) return 'high';
  return undefined;
}

function reverse_lust_text24() {
  const band = reverse_lust_band(era_flag.target);
  if (band === 'low') {
    era.print(
      `${target_name()}因侵犯${player_name()}而感觉愉悦、露出了恍惚的表情………`,
    );
  } else if (band === 'middle') {
    era.print(`${target_name()}喘着粗气、多次从后侵犯着${player_name()}………`);
  } else if (band === 'high') {
    era.print(
      `${target_name()}无比兴奋、狠狠地抓住了${player_name()}通红的屁股、`,
    );
    era.print('在后面被玩坏之前貌似不会停止………');
  }
}

function reverse_lust_text24_master() {
  const band = reverse_lust_band(era_flag.target);
  if (band === 'low') {
    era.print(
      `${target_name()}沉醉在侵犯${player_name()}的快感之中、露出了满足的表情………`,
    );
  } else if (band === 'middle') {
    era.print(`${target_name()}喘着粗气、多次从后侵犯着${player_name()}………`);
  } else if (band === 'high') {
    era.print(
      `${target_name()}无比兴奋、狠狠地抓住了${player_name()}通红的屁股、`,
    );
    era.print('在后面被玩坏之前貌似不会停止………');
  }
}

function reverse_lust_text25() {
  const band = reverse_lust_band(era_flag.target);
  if (band === 'low') {
    era.print(
      `${target_name()}因侵犯${player_name()}的肛门而感觉愉悦、露出恍惚的表情了…………`,
    );
  } else if (band === 'middle') {
    era.print(
      `${target_name()}喘着粗气、把${player_name()}的后面多次侵犯了………`,
    );
  } else if (band === 'high') {
    era.print(
      `${target_name()}无比兴奋地、把${player_name()}通红的屁股被狠狠地抓住了、`,
    );
    era.print('在后面被玩坏之前貌似不会停止………');
  }
}

function reverse_lust_text25_master() {
  const band = reverse_lust_band(era_flag.target);
  if (band === 'low') {
    era.print(
      `${target_name()}沉醉在侵犯${player_name()}的快感之中、露出了满足的表情………`,
    );
  } else if (band === 'middle') {
    era.print(
      `${target_name()}喘着粗气、狠狠地抓住了${player_name()}的后面连续侵犯着………`,
    );
  } else if (band === 'high') {
    era.print(
      `${target_name()}无比兴奋、狠狠地抓住了${player_name()}通红的屁股、`,
    );
    era.print('在后面被玩坏之前貌似不会停止………');
  }
}

async function message_b24() {
  const cid = era_flag.target;
  const player = era_flag.player;
  const tool =
    tal(cid, 121) || tal(cid, 122) ? '用硬得不行的阴茎' : '用腰上的假阳具';
  const phrase =
    exp(player, 0) === 0 && get(`cflag:${player}:71`) === 0
      ? '未经人事的'
      : !below(player, 3, 4)
        ? '湿漉漉的'
        : '';
  era.print(
    `${target_name()}抓住${player_name()}的腰、${tool}刺进了${phrase}${tal(player, 132) ? '幼女的阴部' : '阴部'}的最深处、`,
  );
  if (exp(player, 0) > 0 && abl(cid, 20) >= 3) reverse_lust_text24();
  else if (player === 0 && !tal(0, 0)) reverse_lust_text24_master();
}

async function message_b25() {
  const cid = era_flag.target;
  const player = era_flag.player;
  const tool =
    tal(cid, 121) || tal(cid, 122) ? '用硬得不行的阴茎' : '用腰上的假阳具';
  const phrase = `${abl(player, 3) >= 3 ? '对着充分开发的' : ''}${!below(player, 3, 4) ? '对着充满粘液的' : ''}`;
  era.print(
    `${target_name()}抓住${player_name()}的腰、${tool}${phrase}肛门整根插入了进去…`,
  );
  if (exp(player, 1) > 0 && abl(cid, 20) >= 3) reverse_lust_text25();
  else if (player === 0) reverse_lust_text25_master();
}

async function message_b26() {
  const cid = era_flag.target;
  const prev = era_flag.prevcom;
  const actor = tq(cid, 88) ? monster_name(e_get(300)) : player_name();
  if (get('tflag:60') && prev === 26 && same_trainer()) {
    era.print(
      tal(era_flag.player, 121) || tal(era_flag.player, 122)
        ? `${actor}品尝着${target_name()}菊花内的蠕动、再次开始扭动腰肢…`
        : `${actor}不从${target_name()}的直肠内拔出假阳具、再次开始扭动腰肢…`,
    );
  } else if (get('tflag:60') && [27, 28, 36].includes(prev) && same_trainer()) {
    era.print(
      `${actor}保持着插入、${target_name()}仰面躺下、再次开始扭动腰肢…`,
    );
  } else {
    era.print(
      `${actor}贯穿了${target_name()}${!below(cid, 3, 4) ? '充满粘液的' : ''}肛门…`,
    );
  }
}

function arena_anal_message() {
  const code = get('tflag:400');
  if (code === 201)
    era.print(
      `企图逃跑的${target_name()}被${chara_callname(era_flag.assi)}抓住、压下身下……`,
    );
  else if (code === 202)
    era.print(`企图逃跑的${target_name()}被最下层居民无情地追逐着……`);
  else if (code === 203)
    era.print(`企图逃跑的${target_name()}被霉菌狗无情地追逐着……`);
  else if (code === 204)
    era.print(`企图逃跑的${target_name()}被兽人无情地追逐着……`);
  else if (code === 205)
    era.print(`企图逃跑的${target_name()}被腐烂猪无情地追逐着……`);
  else if (code === 206)
    era.print(`巨魔那自傲的巨大阴茎勃起着、${target_name()}被盯上了……`);
}

function arena_anal_reaction(continued) {
  const cid = era_flag.target;
  const troll = get('tflag:400') === 206;
  if (troll) {
    era.print(
      continued
        ? `巨魔用双手抓住${target_name()}、用着她的肛门、把她身体上下剧烈套弄着。`
        : `巨魔用双手抓住${target_name()}、用着她的肛门、将她的身体上下剧烈套弄着。`,
    );
    if (exp(cid, 56) >= 500 && palam(cid, 5) > PALAMLV[4]) {
      era.print(
        `${target_name()}被这样凄惨地对待、却依旧无法反抗来自肛门的快感。`,
      );
    }
  } else {
    era.print(
      `怪物从${target_name()}的背后偷袭、在她毫无防备的时候、被肉棒插进去了……`,
    );
    if (exp(cid, 56) >= 500 && palam(cid, 5) > PALAMLV[4]) {
      era.print(
        `淫乱的${target_name()}彻底被来自肛门的快感征服了、扭动腰肢热情地配合着。`,
      );
    }
  }
}

async function message_b27() {
  const cid = era_flag.target;
  const player = era_flag.player;
  const prev = era_flag.prevcom;
  if (tq(cid, 55)) arena_anal_message();

  // 原式 `!88 && !89 && !55 || 55 && ASSI == PLAYER` 按同优先级左结合。
  // CALL MONSTER_NAME / PRINTFORM 均不收行，故前缀须同后续正文合并成一次输出。
  let prefix = '';
  if (tq(cid, 88)) prefix += monster_name(e_get(300));
  if (
    (!tq(cid, 88) && !tq(cid, 89) && !tq(cid, 55)) ||
    (tq(cid, 55) && era_flag.assi === player)
  ) {
    prefix += `${player_name()}、`;
  }

  if (get('tflag:60') && prev === 27 && same_trainer()) {
    if (tq(cid, 89)) {
      era.print(
        `${prefix}狗让${target_name()}的屁股紧贴着自己的下体、持续挺动着腰……`,
      );
      if (exp(cid, 56) >= 200 && palam(cid, 5) > PALAMLV[4]) {
        era.print(`${target_name()}根据狗的动作、扭动腰肢熟练地配合着……`);
      }
    } else if (tq(cid, 55) && era_flag.assi !== player) {
      arena_anal_reaction(true);
    } else if (tal(player, 121) || tal(player, 122)) {
      era.print(`${prefix}留恋着${target_name()}的感触、再次开始扭动腰肢了…`);
    } else {
      era.print(
        `${prefix}不从${target_name()}的直肠内拔出假阳具、再次开始扭动腰肢了…`,
      );
    }
    retain_virgin_blood();
  } else if (get('tflag:60') && [26, 29, 36].includes(prev) && same_trainer()) {
    era.print(
      `${prefix}保持着插入、${target_name()}向后转身、再次开始扭动腰肢了…`,
    );
    retain_virgin_blood();
  } else if (tq(cid, 55) && era_flag.assi !== player) {
    arena_anal_reaction(false);
  } else {
    const dog = tq(cid, 89) ? '强壮的狗、将阴茎' : '';
    era.print(
      `${prefix}${dog}从背后把${target_name()}${anal_phrase(cid)}整根插入了…`,
    );
  }
}

async function message_b28() {
  const cid = era_flag.target;
  const prev = era_flag.prevcom;
  const actor = tq(cid, 88) ? monster_name(e_get(300)) : player_name();
  if (get('tflag:60') && prev === 28 && same_trainer())
    era.print(
      `${actor}和${target_name()}深吻着、舌头积极地交缠、再次开始扭动腰肢了…`,
    );
  else if (get('tflag:60') && [26, 36].includes(prev) && same_trainer())
    era.print(
      `${actor}保持着插入、${target_name()}紧紧地抱住你、再次开始扭动腰肢了…`,
    );
  else
    era.print(
      `${actor}抱着${target_name()}的胴体、慢慢地往${!below(cid, 3, 4) ? '充满粘液的' : ''}肛门插入了…`,
    );
}

async function message_b29() {
  const cid = era_flag.target;
  const prev = era_flag.prevcom;
  const actor = tq(cid, 88) ? monster_name(e_get(300)) : player_name();
  if (get('tflag:60') && prev === 29 && same_trainer())
    era.print(
      `${actor}从${target_name()}后面抱着她、再次剧烈地开始摇动着${target_name()}的身体…`,
    );
  else if (get('tflag:60') && [27, 36].includes(prev) && same_trainer())
    era.print(
      `${actor}阴茎在直肠里依依不舍不想拔出来、从后抱着${target_name()}的身子、开始了淫靡的摇动…`,
    );
  else
    era.print(
      `${actor}抱着${target_name()}的胴体、${!below(cid, 3, 4) ? '充满粘液的' : ''}肛门慢慢地被期待着的东西贯穿了…`,
    );
}

// —— TRAIN_MESSAGE_A：性交射精结果与姿势反应（原文 A 文件对应分支） ——

function target_ejac_prefix(cid, amount) {
  if (amount === 1) {
    const shape =
      { 1: '手臂般粗的', 2: '悲催的短小的', 3: '包着皮的', 4: '马一样的' }[
        tal(cid, 318)
      ] ?? '';
    return `${shape}阴茎喷出了精液。`;
  }
  const shape =
    {
      1: '怒张着、手臂般粗的',
      2: '颤抖着、可怜的短小的',
      3: '裸露龟头的',
      4: '跳动着、马一样的',
    }[tal(cid, 318)] ?? '跳动着的';
  return `${shape}阴茎中大量的精液飞散而出。`;
}

function message_a_orgasm() {
  const cid = era_flag.target;
  const orgasm = get('tflag:29');
  const target_ejac = get('tflag:10');
  const milk = get('tflag:11');
  if (orgasm <= 0 || get('tflag:899') > 1) return;
  let line = target_name();
  const female = !tal(cid, 121) && !tal(cid, 122);
  const has_other =
    (orgasm >= 5 && orgasm <= 8 && female) ||
    (orgasm >= 9 && female) ||
    target_ejac === 1 ||
    target_ejac === 2;
  if (milk === 1) line += `从胸前滴落母乳${has_other ? '、' : ''}`;
  if (milk === 2) line += `从胸前喷出大量香喷喷的母乳${has_other ? '、' : ''}`;
  if (orgasm >= 5 && orgasm <= 8 && female) line += '阴唇里喷出透明的爱液、';
  if (orgasm >= 9 && female) line += '阴唇里喷出混合着白浊的爱液、';
  if (target_ejac) line += target_ejac_prefix(cid, target_ejac);
  if (
    (orgasm < 5 || tal(cid, 121) || tal(cid, 122)) &&
    target_ejac === 0 &&
    milk === 0
  )
    line += '背脊夸张地向后仰、';
  line +=
    orgasm < 12
      ? '全身哆嗦着、颤动到了极点。'
      : '露出快乐又淫媚的神色、绝顶高潮了……';
  era.print(line);
  const com = era_flag.selectcom;
  if (com === 24 && target_ejac === 1) {
    era.print(
      `阴茎拔出后、阴部处${get('tflag:31') ? '渗出了处女的落红、混合着' : ''}精液渗出来了…`,
    );
  } else if (com === 25 && target_ejac === 1) {
    era.print('阴茎从肛门里拔出后、漏出来的精液沿着股沟向下流…');
  } else if (com === 24 && target_ejac === 2) {
    era.print(
      `阴茎拔出后、阴部处${get('tflag:31') ? '渗出了处女的落红、混合着' : ''}大量的精液渗出来了…`,
    );
  } else if (com === 25 && target_ejac === 2) {
    era.print('阴茎从肛门里拔出后、大量漏出来的精液沿着股沟向下流…');
  }
}

function message_a_ejaculation() {
  const cid = era_flag.target;
  const com = era_flag.selectcom;
  const amount = get('tflag:2');
  if (amount !== 1 && amount !== 2) return;

  const large = amount === 2;
  const blood = get('tflag:31')
    ? large
      ? '处女的落红混合着'
      : '渗出了处女的落红、混合着'
    : '';
  const removable = below(cid, 5, 4) || get('tflag:31');
  if (removable) {
    if ([20, 22].includes(com)) {
      era.print(
        `阴茎拔出后、阴部处${large ? '、' : ''}${blood}${large ? '大量的精液渗出来了…' : '精液渗出来了…'}`,
      );
    } else if ([21, 23].includes(com)) {
      era.print(
        `阴茎拔出后、阴部处${large ? '、' : ''}${blood}${large ? '大量的精液滴出来了…' : '精液滴出来了…'}`,
      );
    } else if ([26, 27, 28, 29, 36].includes(com)) {
      era.print(
        large
          ? '从肛门里漏出大量的精液沿着股沟向下流………'
          : '从肛门里漏出来的精液沿着股沟向下流……',
      );
    } else if (com === 34) {
      era.print(
        large
          ? `阴茎拔出后、阴部处、${blood}大量的精液渗出来了…`
          : `阴茎拔出后、阴部处${blood}精液渗出来了…`,
      );
    } else if (com === 25) {
      era.print(
        `${player_name()}射出的精液、把两人的身体都${large ? '弄得粘稠不堪' : '弄脏'}了…`,
      );
    } else if (com === 24) {
      if (large) {
        era.print(
          `阴茎拔出后、${get('tflag:31') ? '渗出了处女的落红、混合着' : ''}大量的精液渗出来了…`,
        );
        era.print(`${player_name()}射出的精液、把两人的身体都弄得粘稠不堪…`);
      } else {
        era.print(`${player_name()}射出的精液、把两人的身体都弄脏了…`);
      }
    }
    set('tflag:31', 0);
    set('tflag:60', 0);
    return;
  }

  if (com === 27 && tq(cid, 55)) {
    era.print(
      large
        ? '直肠将溢出的大量精液一饮而尽、妖媚而淫荡地蠕动着、把插入的阴茎紧紧夹住了…'
        : '精液溢出的直肠、细微地颤抖着、把插入的阴茎紧紧夹住了…',
    );
  } else if ((large ? [26, 27, 28, 29, 36] : [27, 28, 29, 36]).includes(com)) {
    era.print(
      large
        ? `直肠将溢出的大量精液一饮而尽、妖媚而淫荡地蠕动着、把${player_name()}的阴茎紧紧夹住了…`
        : `精液溢出的直肠、细微地颤抖着、把${player_name()}的阴茎紧紧夹住了…`,
    );
  } else if (com === 25) {
    era.print(
      large
        ? `直肠将溢出的大量精液一饮而尽、妖媚而淫荡地蠕动着、把${target_name()}的阴茎紧紧夹住了…`
        : `精液溢出的直肠、细微地颤抖着、把${target_name()}的阴茎紧紧夹住了…`,
    );
  } else if (com === 24) {
    era.print(
      large
        ? `${player_name()}的子宫贪婪地吸啜着灌满膣内的大量精液、私处妖媚而淫荡地蠕动着、把${target_name()}的阴茎紧紧夹住了…`
        : `${player_name()}被精液灌满的私处、轻轻蠕动着、把${target_name()}的阴茎紧紧缠住了…`,
    );
  } else {
    era.print(
      large
        ? `${target_name()}的子宫贪婪地吸啜着灌满膣内的大量精液、私处妖媚而淫荡地蠕动着、把${player_name()}的阴茎紧紧夹住了…`
        : `${target_name()}被精液灌满的私处、轻轻蠕动着、把${player_name()}的阴茎紧紧缠住了…`,
    );
  }
}
function message_a_orgasm_afterglow() {
  const cid = era_flag.target;
  const orgasm = get('tflag:29');
  if (get('tflag:2') !== 0 || get('tflag:899') > 1) return;

  if (
    orgasm >= 9 &&
    get('tflag:19') &&
    (tq(cid, 11) || get('tflag:60')) &&
    (get(`cflag:${cid}:40`) & 16) === 0 &&
    (get(`cflag:${cid}:40`) & 1) === 0
  ) {
    era.print(
      `${target_name()}的私处滴出了粘稠的液体、阴户一开一合不停持续着…`,
    );
  } else if (
    orgasm >= 5 &&
    get('tflag:19') &&
    (tq(cid, 11) || get('tflag:60')) &&
    (get(`cflag:${cid}:40`) & 16) === 0 &&
    (get(`cflag:${cid}:40`) & 1) === 0
  ) {
    era.print(`${target_name()}的私处滴出了粘稠的液体、剧烈地不停喘息着…`);
  } else if (orgasm >= 9) {
    era.print(`${target_name()}断断续续地不停高潮、身体不断抽搐、反复扭动着…`);
  } else if (orgasm >= 5) {
    era.print(`${target_name()}断断续续地不停高潮、四肢无力、筋疲力尽了…`);
  } else if (orgasm >= 3) {
    era.print(`${target_name()}气息慌乱、沉浸在绝顶高潮的余韵之中…`);
  }
}

function message_a_virgin_tail() {
  const cid = era_flag.target;
  const target_virgin = get('tflag:3');
  const target_ejac = get('tflag:15');
  const player_ejac = get('tflag:2');
  if (target_ejac === 1 && target_virgin) {
    era.print(
      `${target_name()}的阴部上、处女落红和污液沿着丑陋的触手滴下来了…`,
    );
  }
  if (player_ejac === 0 && target_ejac === 0 && target_virgin) {
    era.print(`${target_name()}的阴部上、滴出了处女才有的落红…`);
  }
  if (
    target_virgin &&
    get('tflag:14') > 0 &&
    target_ejac === 0 &&
    !tq(cid, 89) &&
    !tq(cid, 90) &&
    get('tflag:899') <= 1
  ) {
    const relative = get('tflag:14');
    const relation_name = {
      1: tal(era_flag.player, 122) ? '父亲' : '母亲',
      2: tal(era_flag.player, 122) ? '儿子' : '女儿',
      3: tal(era_flag.player, 122) ? '哥哥' : '姐姐',
      4: tal(era_flag.player, 122) ? '弟弟' : '妹妹',
      6: tal(era_flag.player, 122) ? '表弟' : '表妹',
    }[relative];
    if (relation_name) {
      era.print(
        `${target_name()}被${relation_name}${player_name()}夺取了她的处女。`,
      );
    }
  }
  if (target_virgin && tq(cid, 89) && get('tflag:899') <= 1) {
    era.print(`${target_name()}把处女奉献给野狗了。`);
  }
}

function message_a_position() {
  const cid = era_flag.target;
  const com = era_flag.selectcom;
  // Emuera 的 &&/|| 同优先级左结合：三式分别是
  // (20 || 26) && 失神门、(22 || 28) && 失神门、(23 || 29) && 失神门。
  // 故 20/22/23 不受 TFLAG:899 约束，26/28/29 才受约束。
  const passout_guard = get('tflag:899') <= 1;
  const position_group =
    com === 20 ||
    (com === 26 && passout_guard) ||
    com === 22 ||
    (com === 28 && passout_guard) ||
    com === 23 ||
    (com === 29 && passout_guard);
  if (
    !position_group ||
    !get('tflag:2') ||
    abl(cid, 10) < 3 ||
    abl(cid, 11) < 3
  )
    return;
  if (com === 20 || com === 26)
    era.print(`${target_name()}把脚缠到${player_name()}的腰上…`);
  else if (com === 22 || com === 28)
    era.print(`${target_name()}用手抱着${player_name()}的脖子…`);
  else era.print(`${target_name()}的背脊后仰、坐到${player_name()}的怀里…`);
}

/**
 * 性交 A 文的共享尾段。服务族的 COM34/36 复用它，但各自仍由服务模块注册，
 * 因为骑乘位还要追加自己的 UP:2 反应。
 */
async function train_message_a_sex_common() {
  // EVENT_TRAIN_MESSAGE_A 的公共性交尾段按原 IF / ELSEIF / ELSE 顺序：
  // 先高潮总述（其中含目标射精附文），再玩家射精或无射精余韵，最后独立的
  // 处女相关文本。
  message_a_orgasm();
  if (get('tflag:2')) message_a_ejaculation();
  else message_a_orgasm_afterglow();
  message_a_virgin_tail();
}

async function message_a_sex() {
  await train_message_a_sex_common();
  message_a_position();
}

// 每个 20–29 ID 都占两张消息分发表；A 是同一条原作大链的对应分支。
train_message_b_family.register(20, message_b20);
train_message_b_family.register(21, message_b21);
train_message_b_family.register(22, message_b22);
train_message_b_family.register(23, message_b23);
train_message_b_family.register(24, message_b24);
train_message_b_family.register(25, message_b25);
train_message_b_family.register(26, message_b26);
train_message_b_family.register(27, message_b27);
train_message_b_family.register(28, message_b28);
train_message_b_family.register(29, message_b29);
for (const id of [20, 21, 22, 23, 24, 25, 26, 27, 28, 29]) {
  train_message_a_family.register(id, message_a_sex);
}

com_able_family.register(20, able20);
com_able_family.register(21, able21);
com_able_family.register(22, able22_or_23);
com_able_family.register(23, able22_or_23);
com_able_family.register(24, able24);
com_able_family.register(25, able25);
com_able_family.register(26, able26);
com_able_family.register(27, able27);
com_able_family.register(28, able28_or_29);
com_able_family.register(29, able28_or_29);

com_family.register(20, com20);
com_family.register(21, com21);
com_family.register(22, com22);
com_family.register(23, com23);
com_family.register(24, com24);
com_family.register(25, com25);
com_family.register(26, com26);
com_family.register(27, com27);
com_family.register(28, com28);
com_family.register(29, com29);

module.exports = {
  STUBBED_CALLS,
  able20,
  able21,
  able22_or_23,
  able24,
  able25,
  able26,
  able27,
  able28_or_29,
  com20,
  com21,
  com22,
  com23,
  com24,
  com25,
  com26,
  com27,
  com28,
  com29,
  source20,
  source21,
  source22,
  source23,
  source26,
  source27,
  source28,
  source29,
  train_message_a_sex_common,
};
