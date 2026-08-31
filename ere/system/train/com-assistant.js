/**
 * @file 调教指令 60–73「助手与蕾丝」族：@COM60-73 真身 + @COM_ABLE60-73
 * 可执行性判定 + TRAIN_MESSAGE_A/B 分支 + @GET_ADV_COM CASE 61 升格规则
 * （issue #225，阶段 4 轴 A J15）。
 *
 * 源: target/ERB/調教相關/COMF60_助手にキス.ERB     @COM60
 *     target/ERB/調教相關/COMF61_クンニ強制.ERB     @COM61
 *     target/ERB/調教相關/COMF62_助手を犯す.ERB     @COM62
 *     target/ERB/調教相關/COMF63_貝あわせ.ERB       @COM63 + @COM63_AUTO
 *     target/ERB/調教相關/COMF64_３Ｐ.ERB           @COM64
 *     target/ERB/調教相關/COMF65_助手を犯させる.ERB @COM65
 *     target/ERB/調教相關/COMF66_ニ本フェラ.ERB     @COM66
 *     target/ERB/調教相關/COMF67_足コキする.ERB     @COM67（文件名足交，正文是践踏奴隶）
 *     target/ERB/調教相關/COMF68_ダブルフェラ.ERB   @COM68
 *     target/ERB/調教相關/COMF69_シックスナイン.ERB @COM69
 *     target/ERB/調教相關/COMF70_ダブル素股.ERB     @COM70
 *     target/ERB/調教相關/COMF71_ダブルパイズリ.ERB @COM71
 *     target/ERB/調教相關/COMF72_陰毛を剃る.ERB     @COM72
 *     target/ERB/調教相關/COMF73_髪型を弄る.ERB     @COM73 / @HAIRSET / @HAIRSET_TALK_1 / @HAIRSET_TALK_2
 *     target/ERB/調教相關/COMABLE.ERB               @COM_ABLE60-73（:2514-3135；无 67、无 74-79）
 *     target/ERB/調教相關/COMF_JUMP.ERB             @GET_ADV_COM CASE 61（:627-637 → 69）
 *     target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB    SELECTCOM 62/68/69/72
 *     target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB    SELECTCOM 60-66、68-72（67/73 源侧无分支）
 *
 * == 本族边界 ==
 *
 * - 可直选 11 条（60-66/68/71-73）+ 高级 COM 3 条（67/69/70）。67/69/70 在
 *   Train.csv 被注释，只能经 @GET_ADV_COM 升格抵达。源侧无 @COM_ABLE67
 *   （#213：「未定义即视为可执行」），本票不建壳。
 * - CASE 1/4（→ 69）已由 com-caress.js 注册；CASE 31（→ 69/64）与 CASE 33
 *   （→ 70）已由 com-service.js 注册。本票只注册本族入口 CASE 61。
 * - COM63_AUTO 属于自动调教票 #218，本模块不重复实现。
 * - @INCEST 真身由 #220 建：本族只保留域内存根 + TFLAG:14 首行重置，不建
 *   第二份实现（SOP §2）。@HAIRSET / TALK_1 / TALK_2 定义在 COMF73 内，自足。
 * - 原作无 EQUIP_COM60-73，故不注册装备持续效果。
 *
 * TRAIN_MESSAGE_A/B 只登记本族 ID 在源文件里显式出现的 SELECTCOM 分支：
 * B 67/73 与 A 除 62/68/69/72 外均无专属分支，注册显式无操作（源本身无
 * 文案，不是遗漏）。
 */

'use strict';

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { PALAMLV } = require('#/era-utils/palam-level');
const { EXPLV } = require('#/era-utils/exp-level');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { chara_callname } = require('#/utils/callname-utils');
const { stub_line } = require('#/utils/stub-line');
const { adv_com_family, get_adv_com } = require('#/system/train/com-adv');
const { com_able_family, com_family } = require('#/system/train/com-family');
const { com_order } = require('#/system/train/com-order');
const {
  confirm_condom,
  confirm_condom2,
} = require('#/system/train/com-condom');
const {
  com_ejac_player_milk,
  confirm_lost_virgin,
} = require('#/system/train/com-vaginasex');
const {
  train_message_a_family,
  train_message_b,
  train_message_b_family,
} = require('#/system/train/train-message');

/**
 * 本族域内的 INCEST 存根。真身由 #220 建，合并后复用；TFLAG:14 重置照
 * SYSTEM_SOURCE_SUB2.ERB:338 的首行 1:1。
 */
const STUBBED_CALLS = ['INCEST'];

const MASTER = 0;
const PBAND = 4;

const tal = (id, i) => era.get(`talent:${id}:${i}`) || 0;
const abl = (id, i) => Math.floor(era.get(`abl:${id}:${i}`) || 0);
const tequip = (id, i) => era.get(`tequip:${id}:${i}`) || 0;
const palam = (id, i) => era.get(`palam:${id}:${i}`) || 0;
const exp = (id, i) => era.get(`exp:${id}:${i}`) || 0;
const cflag = (id, i) => era.get(`cflag:${id}:${i}`) || 0;
const item = (i) => era.get(`item:${i}`) || 0;
const noitem = () => era.get('noitem:0') || 0;
const flag = (i) => era.get(`flag:${i}`) || 0;

const clothes_on = () => flag(37) !== 0;
const worn = (cid) => cflag(cid, 40);
const special = (cid) => cflag(cid, 42);

function zooko_worn(cid) {
  return special(cid) === 11 && (worn(cid) & 64) !== 0 && clothes_on();
}
function diaper_worn(cid) {
  return special(cid) === 69 && (worn(cid) & 64) !== 0 && clothes_on();
}
function belt_worn(cid) {
  return special(cid) === 79 && (worn(cid) & 64) !== 0 && clothes_on();
}
function pants_worn(cid) {
  return (worn(cid) & 17) !== 0 && clothes_on();
}
function bra_worn(cid) {
  return (worn(cid) & 6) !== 0 && clothes_on();
}
function has_mat() {
  return item(13) !== 0 || noitem() !== 0;
}
function has_pband() {
  return item(PBAND) !== 0;
}
function fainted() {
  return (era.get('tflag:899') || 0) > 0;
}

function same_trainer() {
  const t50 = era.get('tflag:50') || 0;
  return (era_flag.assiplay && t50 !== 0) || (!era_flag.assiplay && t50 === 0);
}

/** CALL INCEST（SUB2:324）：TFLAG:14 重置 1:1 + 在册存根（#220 建真身） */
function incest() {
  era.set('tflag:14', 0);
  stub_line('INCEST', '亲族关系判定', '真身由 #220 建，合并后复用');
}

/** JUMPFORM COM{RESULT}：目标未落地时沿项目既有约定走登记存根。 */
async function jump_to_advanced(id) {
  if (com_family.has(id)) {
    return com_family.call(id);
  }
  stub_line(`COM${id}`, `指令 ${id} 的升格目标`, '随追加与高级指令票');
  return 1;
}

/**
 * Emuera strict TIMES：十进制定点相乘，每步朝零截断。
 * 源: com-service.js 同款（本游戏关闭「向 Eramaker 对齐」）。
 */
function times(value_to_multiply, rate) {
  const text = String(rate);
  const negative = text.startsWith('-');
  const unsigned = /^[+-]/.test(text) ? text.slice(1) : text;
  const [whole, fraction = ''] = unsigned.split('.');
  const numerator = BigInt(`${whole}${fraction}`) * (negative ? -1n : 1n);
  const denominator = 10n ** BigInt(fraction.length);
  return Number((BigInt(value_to_multiply) * numerator) / denominator);
}

const idiv = (v, divisor) => Math.trunc(v / divisor);
const name_of = (table, id) => era.get(`${table}:${id}`) ?? '';
const mark = (cid, i) => Math.floor(era.get(`mark:${cid}:${i}`) || 0);
const stain_of = (cid, i) => era.get(`stain:${cid}:${i}`) || 0;
const pick = (table, level) =>
  table[Math.min(Math.max(Math.floor(level) || 0, 0), table.length - 1)];

function make_src(cid) {
  return {
    get: (id) => era.get(`source:${cid}:${id}`) || 0,
    set: (id, amount) => era.set(`source:${cid}:${id}`, amount),
    add: (id, amount) => era.add(`source:${cid}:${id}`, amount),
    times(id, rate) {
      era.set(
        `source:${cid}:${id}`,
        times(era.get(`source:${cid}:${id}`) || 0, rate),
      );
    },
  };
}

const lose = (cid, i, v) => era.add(`deltabase:${cid}:${i}`, -v);

function palam_level(value) {
  if (value < PALAMLV[1]) return 0;
  if (value < PALAMLV[2]) return 1;
  if (value < PALAMLV[3]) return 2;
  if (value < PALAMLV[4]) return 3;
  if (value < PALAMLV[5]) return 4;
  return 5;
}

function exp_level(value) {
  for (let i = 1; i < EXPLV.length; i += 1) {
    if (value < EXPLV[i]) return i - 1;
  }
  return EXPLV.length - 1;
}

function stain_exchange(cid_a, id_a, cid_b, id_b) {
  const merged = stain_of(cid_a, id_a) | stain_of(cid_b, id_b);
  era.set(`stain:${cid_a}:${id_a}`, merged);
  era.set(`stain:${cid_b}:${id_b}`, merged);
}

function push_judge_tail(parts, a, v) {
  parts.push(` = ${a}`);
  parts.push(a < v ? ' < ' : a === v ? ' = ' : ' > ');
  parts.push(`实行值${v}`);
}

function dirty_score({
  player,
  part,
  target,
  bit16 = 15,
  urine = false,
  divide = 1,
}) {
  const s = stain_of(player, part);
  let y = 0;
  if (s & 1) y += 1;
  if (s & 4) y += 3;
  if (s & 8) y += 7;
  if (s & 16) y += bit16;
  if (urine && stain_of(player, 4) & 32) y += 3;
  if (tal(target, 61)) y = idiv(y, 3);
  if (tal(target, 62)) y *= 2;
  if (divide !== 1) y = idiv(y, divide);
  return y;
}

function judge_tools(parts, state) {
  return {
    plus() {
      if (state.s) parts.push(' + ');
    },
    minus() {
      parts.push(' - ');
    },
    add_abl(cid, id, mul) {
      const v = abl(cid, id);
      if (!v) return;
      this.plus();
      state.a += v * mul;
      parts.push(`${name_of('ablname', id)}LV${v}(${v * mul})`);
      state.s = 1;
    },
    add_mark(cid, id, mul) {
      const v = mark(cid, id);
      if (!v) return;
      this.plus();
      state.a += v * mul;
      parts.push(`${name_of('markname', id)}LV${v}(${v * mul})`);
      state.s = 1;
    },
    add_palam(cid, id, mul) {
      const l = palam_level(palam(cid, id));
      if (!l) return;
      this.plus();
      state.a += l * mul;
      parts.push(`${name_of('palamname', id)}LV${l}(${l * mul})`);
      state.s = 1;
    },
    add_talent(cid, id, amount, s_value = 1) {
      if (!tal(cid, id)) return;
      if (amount >= 0) this.plus();
      else this.minus();
      state.a += amount;
      parts.push(`${name_of('talentname', id)}(${Math.abs(amount)})`);
      state.s = s_value;
    },
    add_custom(label, amount, s_value = 1) {
      if (amount >= 0) this.plus();
      else this.minus();
      state.a += amount;
      parts.push(`${label}(${Math.abs(amount)})`);
      state.s = s_value;
    },
    add_dirty(y, cid) {
      if (!y) return;
      this.minus();
      state.a -= y;
      const label = tal(cid, 61)
        ? `脏、${name_of('talentname', 61)}`
        : tal(cid, 62)
          ? `脏、${name_of('talentname', 62)}`
          : '脏';
      parts.push(`${label}(${y})`);
      state.s = 1;
    },
  };
}

async function finish_judge(parts, state, threshold) {
  push_judge_tail(parts, state.a, threshold);
  era.print(parts.join(''));
  await era.waitAnyKey();
  return state.a >= threshold;
}

function scale_by_abl(value, cid, id, rates) {
  return times(value, pick(rates, abl(cid, id)));
}

const RATE_OBED = [0.8, 0.9, 1.0, 1.1, 1.2, 1.3];
const RATE_SERVE_TECH = [0.5, 0.8, 1.2, 1.5, 1.8, 2.4];
const RATE_SERVE_SPIRIT = [0.5, 0.8, 1.2, 1.5, 1.8, 2.4];
const RATE_C_SENSE = [1.0, 1.5, 2.0, 2.5, 3.5, 5.0];
const RATE_POISON = [1.0, 1.2, 1.3, 1.5, 1.7, 2.0];
const RATE_SKILL_45 = [0.5, 0.8, 1.0, 1.5, 2.5, 4.0];
const RATE_SKILL_12 = [0.5, 0.8, 1.0, 1.2, 1.5, 2.0];
const RATE_V_EXP = [0.2, 0.5, 0.8, 1.0, 1.2, 1.4];
const RATE_V_SENSE = [0.5, 0.8, 1.0, 1.2, 1.5, 2.0];

function ejac_level(cid) {
  const s = era.get(`base:${cid}:2`) || 0;
  const ejac = era.get(`maxbase:${cid}:2`) || 0;
  const e = s > ejac * 2 ? 2 : s > ejac ? 1 : 0;
  return { e, s, ejac };
}

function consume_gauge(cid, e, ejac) {
  const sub = e === 2 ? ejac * 2 : ejac;
  const remaining = Math.max((era.get(`base:${cid}:2`) || 0) - sub, 0);
  era.set(`base:${cid}:2`, remaining >= ejac ? ejac - 1 : remaining);
}

function add_gauge(cid, b) {
  if (tal(cid, 121) || tal(cid, 122)) era.add(`base:${cid}:2`, b);
}

function mark_penis_stain(cid) {
  era.set(`stain:${cid}:2`, stain_of(cid, 2) | 4);
}

function print_same_sex_exp(target, other, yuri, homo) {
  if (!tal(target, 122) && !tal(other, 122)) {
    era.print(`百合经验+${yuri}`);
    chara(target).train.百合经验 += yuri;
  } else if (homo !== undefined && tal(target, 122) && tal(other, 122)) {
    era.print(`断背经验+${homo}`);
    chara(target).train.断背经验 += homo;
  }
}

function record_target_kiss(target, player, code) {
  if ((era.get(`cflag:${target}:16`) || 0) === -1) {
    era.set('tflag:13', 1);
    era.set(`cflag:${target}:16`, code);
    era.set(`cstr:${target}:4`, chara_callname(player));
  }
}

function record_player_kiss(player, target, code) {
  if ((era.get(`cflag:${player}:16`) || 0) === -1) {
    era.set(`cflag:${player}:16`, code);
    era.set(`cstr:${player}:4`, chara_callname(target));
  }
}

function incest_prefix(other_cid) {
  const t14 = era.get('tflag:14') || 0;
  const t_male = tal(era_flag.target, 122);
  const o_male = tal(other_cid, 122);
  if ((t14 === 1 || t14 === 2) && !t_male && !o_male) return '母女';
  if (t14 === 1 || t14 === 2) return '父子';
  if ((t14 === 3 || t14 === 4) && !t_male && !o_male) return '姐妹';
  if ((t14 === 3 || t14 === 4) && t_male && o_male) return '兄弟';
  if (t14 === 3 || t14 === 4) return '兄妹';
  if (t14 === 5 || t14 === 6) return '表姐弟';
  return '';
}

function apply_kin_source(src, t14, with_six = false) {
  if (t14 === 1 || t14 === 2) {
    src.times(13, 3);
    src.times(14, 3);
    return 3;
  }
  if (t14 === 3 || t14 === 4) {
    src.times(13, 2);
    src.times(14, 2);
    return 2;
  }
  if (t14 === 5 || (with_six && t14 === 6)) {
    src.times(13, 1.5);
    src.times(14, 1.5);
    return 2;
  }
  return 0;
}

function raise_abl10(target, min) {
  if (abl(target, 10) < min) {
    era.print(`然后，${name_of('ablname', 10)}变为${min}LV`);
    chara(target).system.顺从 = min;
  }
}

function apply_service_source(src, rows, skill_rates = RATE_SKILL_45) {
  const [s4, s5, dirt] = pick(rows, abl(era_flag.target, 16));
  src.set(4, s4);
  src.set(5, s5);
  if (dirt !== undefined) src.times(8, dirt);
  const rate = pick(skill_rates, abl(era_flag.target, 12));
  src.times(4, rate);
  src.times(5, rate);
}

function apply_poison_on_ejac(src, rows, e) {
  if (!e) return;
  src.times(4, 3);
  const [s7, s5, s13] = pick(rows, abl(era_flag.target, 32));
  src.set(7, s7);
  src.times(5, s5);
  src.times(13, s13);
}

function settle_ejac({
  cid,
  e,
  ejac,
  heavy_semen,
  normal_semen,
  flag,
  flag_value_heavy = 2,
  flag_value_normal = 1,
  heavy_label = '大量射精',
  normal_label = '射精',
  plus = '＋',
  extra_heavy,
  extra_normal,
}) {
  if (e === 2) {
    if (extra_heavy) extra_heavy();
    chara(cid).train.射精经验 += 2;
    if (heavy_semen) {
      chara(era_flag.target).dungeon.精液经验 += heavy_semen;
      era.print(heavy_label);
      era.print(`精液经验${plus}${heavy_semen}`);
    } else {
      era.print(heavy_label);
    }
    mark_penis_stain(cid);
    consume_gauge(cid, 2, ejac);
    if (flag !== undefined) era.set(`tflag:${flag}`, flag_value_heavy);
  } else if (e === 1) {
    if (extra_normal) extra_normal();
    chara(cid).train.射精经验 += 1;
    if (normal_semen) {
      chara(era_flag.target).dungeon.精液经验 += normal_semen;
      era.print(normal_label);
      era.print(`精液经验${plus}${normal_semen}`);
    } else {
      era.print(normal_label);
    }
    mark_penis_stain(cid);
    consume_gauge(cid, 1, ejac);
    if (flag !== undefined) era.set(`tflag:${flag}`, flag_value_normal);
  }
}

function lick_clean(target, penis_cid, e, flag_value) {
  if (abl(target, 16) >= 2 && abl(target, 12) >= 2) {
    era.set(`stain:${penis_cid}:2`, 2);
    if (e >= 1) era.set('tflag:8', flag_value);
    return true;
  }
  return false;
}

const HAIR_STYLES = {
  1: '自然',
  2: '中分',
  3: '不均分',
  4: '长束发',
  5: '马尾',
  6: '侧马尾',
  7: '垂发辫',
  8: '双马尾',
  9: '顶束发',
  10: '侧束发',
  11: '鱼骨辫',
  12: '卷发',
};

function print_craft(player) {
  const skill = abl(player, 12);
  if (skill >= 5) era.print('这个手艺，这个效果，去到哪里都可以很自信了吧…');
  else if (skill >= 4) era.print('天生的灵巧发挥了作用，总算完成了…');
  else era.print('没什么经验做这个，完成的效果好像和想象中不同…');
}

async function hairset() {
  const target = era_flag.target;
  const player = era_flag.player;
  const src = make_src(target);
  let cut = 0;
  let styled = 0;
  const t_name = chara_callname(target);
  const p_name = chara_callname(player);

  if (chara(target).chara.头发长度 > 100) {
    for (;;) {
      era.print(`剪${t_name}的头发吗？`);
      if (chara(target).chara.头发长度 <= 200) {
        era.print('现在[半长]');
      } else {
        era.print('现在[长]');
        era.printButton('适当剪一下', 0);
      }
      era.printButton('大刀阔斧地剪', 1);
      era.printButton('不剪', 2);
      const result = await era.input();
      let l = 0;
      if (result === 0 && chara(target).chara.头发长度 >= 201) {
        l = 2;
        src.set(14, 500);
      } else if (result === 1 && chara(target).chara.头发长度 >= 101) {
        l = 1;
        src.set(14, 500);
        if (chara(target).chara.头发长度 >= 201) src.add(14, 500);
      } else if (result === 2) {
        l = 0;
      } else {
        continue;
      }
      if (l) {
        era.print('剪成什么样子呢？');
        era.printButton('还是不剪了', 0);
        era.printButton('自然的样子', 1);
        era.printButton('剪齐整', 2);
        era.printButton('强调层次', 3);
        era.printButton('强调蓬松感', 4);
        const c = await era.input();
        if (c >= 1 && c <= 4) {
          cut = 1;
          era.print(`${p_name}把${t_name}的头发剪了。`);
          print_craft(player);
          chara(target).chara.头发长度 = l === 2 ? 101 : 1;
          chara(target).chara.头发修剪方式 = c;
          chara(target).chara.发型 = 1;
        } else {
          era.print('放弃剪发了。');
        }
      }
      break;
    }
  }

  era.print('');
  for (;;) {
    era.print(`把${t_name}的头发弄成什么样子？`);
    era.printButton('自然', 1);
    era.printButton('中分', 2);
    era.printButton('不均分', 3);
    if (chara(target).chara.头发长度 >= 101) {
      era.printButton('长束发', 4);
      era.printButton('马尾', 5);
      era.printButton('侧马尾', 6);
      era.printButton('垂发辫', 7);
      era.printButton('双马尾', 8);
      era.printButton('顶束发', 9);
      era.printButton('侧束发', 10);
      if (chara(target).chara.头发长度 >= 201) {
        era.printButton('鱼骨辫', 11);
        era.printButton('卷发', 12);
      }
    }
    era.print(`现在的发型：${HAIR_STYLES[chara(target).chara.发型] || ''}`);
    const result = await era.input();
    if (result < 1 || result > 14) continue;
    if (chara(target).chara.头发长度 <= 200 && result > 11) continue;
    if (chara(target).chara.头发长度 <= 100 && result > 4) continue;
    if (result === chara(target).chara.发型) {
      era.print(`${t_name}的发型保持原样。`);
    } else {
      chara(target).chara.发型 = result;
      era.print(
        `${p_name}把${t_name}的发型弄成${HAIR_STYLES[result] || ''}了。`,
      );
      print_craft(player);
      styled = 1;
    }
    break;
  }
  void cut;
  void styled;
}

function first_exp_code(t14, other_male, table) {
  for (const [flag, male, code] of table) {
    if (t14 === flag && other_male === male) return code;
  }
  return 0;
}

function map_3p_site(com) {
  if (com === 20 || com === 21) return 1;
  if (com === 27) return 2;
  if (com === 31 || com === 80) return 3;
  return 0;
}

function assign_3p_sites() {
  if (era_flag.selectcom === 64) {
    if (era_flag.assiplay) {
      era.set('tflag:40', 2);
      era.set('tflag:41', 1);
    } else {
      era.set('tflag:40', 1);
      era.set('tflag:41', 2);
    }
    return;
  }
  const now = map_3p_site(era_flag.selectcom);
  const prev = map_3p_site(era_flag.prevcom);
  if ((era.get('tflag:42') || 0) === 0) {
    if (era_flag.assiplay) {
      era.set('tflag:40', prev);
      era.set('tflag:41', now);
    } else {
      era.set('tflag:40', now);
      era.set('tflag:41', prev);
    }
    return;
  }
  if (era_flag.assiplay) {
    if (now === (era.get('tflag:40') || 0)) {
      era.set('tflag:40', era.get('tflag:41') || 0);
    }
    era.set('tflag:41', now);
  } else {
    if (now === (era.get('tflag:41') || 0)) {
      era.set('tflag:41', era.get('tflag:40') || 0);
    }
    era.set('tflag:40', now);
  }
}

function site_used(n) {
  return (era.get('tflag:40') || 0) === n || (era.get('tflag:41') || 0) === n;
}

function bump_relation(cid, other, amount) {
  const key = `relation:${cid}:${other}`;
  let rel = (era.get(key) || 0) + amount;
  if (rel === amount) rel = 100 + amount;
  if (rel > 200) rel = 200;
  era.set(key, rel);
}

function record_first_exp(cid, other, table) {
  if (chara(cid).train.初体验对象 !== 0) return;
  chara(cid).train.初体验对象 = (era.get(`no:${other}`) || other) + 1;
  chara(cid).train.初体验对象名 = chara_callname(other);
  const code = first_exp_code(era.get('tflag:14') || 0, tal(other, 122), table);
  if (code) chara(cid).train.初体验对象 = code;
}

function maybe_mouth_seed(e, heavy_div, normal_div) {
  const n = e === 2 ? heavy_div : e === 1 ? normal_div : 0;
  if (!n) return;
  if (Math.floor(Math.random() * n) === 0 && tal(era_flag.target, 340)) {
    era.set(`cflag:${era_flag.target}:113`, 4);
  }
}

function scale_src_ids(src, ids, rate) {
  for (const id of ids) src.times(id, rate);
}

function palam_rate(cid, palam_id, rates) {
  return pick(rates, palam_level(palam(cid, palam_id)));
}

function scale_fellatio_gauge(b, target, sense_cid) {
  b = scale_by_abl(b, target, 10, RATE_OBED);
  b = scale_by_abl(b, target, 16, RATE_SERVE_SPIRIT);
  b = scale_by_abl(b, target, 32, RATE_POISON);
  if (tal(target, 52)) b = times(b, 2);
  return scale_by_abl(b, sense_cid, 0, RATE_C_SENSE);
}

const RATE_SKILL_ASSI = [1.8, 1.8, 1.0, 1.0, 1.0, 1.0];
const RATE_SENSE_PAIR = [
  [0.8, 0.5],
  [0.9, 0.7],
  [1.0, 1.0],
  [1.1, 1.2],
  [1.2, 1.4],
  [1.3, 1.7],
];
const POISON_MOUTH = [
  [0, 2, 4],
  [500, 3, 3],
  [1200, 4, 2.5],
  [3000, 6, 2],
  [6000, 9, 1.5],
  [12000, 15, 1],
];

function charm_ok() {
  const target = era_flag.target;
  const assi = era_flag.assi;
  if (tal(MASTER, 91) || tal(MASTER, 92)) return true;
  return (
    (tal(target, 85) || tal(target, 76)) && (tal(assi, 85) || tal(assi, 76))
  );
}

function refuse_either() {
  return tal(era_flag.target, 151) || tal(era_flag.assi, 151);
}

function play_blocked(cid, extras = []) {
  for (const i of extras) {
    if (tequip(cid, i)) return true;
  }
  return (
    tequip(cid, 90) || tequip(cid, 89) || tequip(cid, 88) || tequip(cid, 55)
  );
}

function relation_to(cid, other) {
  return era.get(`relation:${cid}:${other}`) || 0;
}

// ============================================================
// @COM_ABLE60-73（COMABLE.ERB:2514-3135；无 67）
// ============================================================

function able60() {
  const target = era_flag.target;
  if (fainted()) return 0;
  if (era_flag.player !== era_flag.assi) return 0;
  if (tal(target, 151)) return 0;
  if (tequip(target, 45)) return 0;
  if (play_blocked(target)) return 0;
  return 1;
}

function able61() {
  const target = era_flag.target;
  if (fainted()) return 0;
  if (tal(era_flag.player, 122)) return 0;
  if (tal(target, 151)) return 0;
  if (tequip(target, 45)) return 0;
  if (play_blocked(target)) return 0;
  if (zooko_worn(target)) return 0;
  return 1;
}

function able62() {
  const target = era_flag.target;
  const assi = era_flag.assi;
  if (fainted()) return 0;
  if (assi < 1) return 0;
  if (era_flag.assiplay) return 0;
  if (tal(assi, 122)) return 0;
  if (tal(assi, 135) && !tal(MASTER, 83)) return 0;
  if (!tal(MASTER, 121) && !tal(MASTER, 122) && !has_pband()) return 0;
  if (tal(target, 151)) return 0;
  if (!tequip(target, 44) && abl(target, 10) < 3) return 0;
  if (play_blocked(target)) return 0;
  if (tequip(target, 58) && !has_mat()) return 0;
  if (tequip(target, 59)) return 0;
  if (belt_worn(assi)) return 0;
  if (tal(assi, 273)) return 0;
  if (relation_to(target, assi) <= 100) return 0;
  return 1;
}

function able63() {
  const target = era_flag.target;
  const player = era_flag.player;
  if (fainted()) return 0;
  if (tal(target, 121) || tal(target, 122)) return 0;
  if (tal(player, 121) || tal(player, 122)) return 0;
  if (era_flag.assiplay) {
    const assi = era_flag.assi;
    if (
      abl(assi, 11) <= 3 &&
      !tal(assi, 87) &&
      relation_to(target, player) < 150
    ) {
      return 0;
    }
  }
  if (tequip(target, 44)) return 0;
  if (play_blocked(target)) return 0;
  if (tequip(target, 58) && !has_mat()) return 0;
  if (pants_worn(target)) return 0;
  if (diaper_worn(target)) return 0;
  if (zooko_worn(target)) return 0;
  return 1;
}

function able64() {
  const target = era_flag.target;
  const assi = era_flag.assi;
  if (fainted()) return 0;
  if (assi < 1) return 0;
  if (tal(target, 122)) return 0;
  if (tal(target, 135)) return 0;
  if (tequip(target, 11) || tequip(target, 13)) return 0;
  let rods = 0;
  if (tal(MASTER, 121) || tal(MASTER, 122)) rods += 1;
  if (tal(assi, 121) || tal(assi, 122)) rods += 1;
  if (rods + item(PBAND) < 2) return 0;
  if (exp(target, 0) === 0 && era_flag.assiplay) {
    if ((abl(assi, 10) <= 4 || abl(assi, 22) <= 4) && !tal(assi, 83)) {
      return 0;
    }
  }
  if (palam(target, 3) < PALAMLV[2] && era_flag.assiplay) {
    if ((abl(assi, 10) <= 3 || abl(assi, 22) <= 3) && !tal(assi, 83)) {
      return 0;
    }
  }
  if (exp(target, 1) < 10) return 0;
  if (play_blocked(target)) return 0;
  if (pants_worn(target)) return 0;
  if (diaper_worn(target)) return 0;
  if (belt_worn(target)) return 0;
  if (tal(target, 273)) return 0;
  if (zooko_worn(target)) return 0;
  return 1;
}

function able65() {
  const target = era_flag.target;
  const player = era_flag.player;
  if (fainted()) return 0;
  if (player !== era_flag.assi) return 0;
  if (tal(player, 122)) return 0;
  if (tal(player, 135)) return 0;
  if (!tal(target, 121) && !tal(target, 122) && !has_pband()) return 0;
  if (tal(target, 151)) return 0;
  if (play_blocked(target)) return 0;
  if (tequip(target, 58) && !has_mat()) return 0;
  if (pants_worn(target)) return 0;
  if (diaper_worn(target)) return 0;
  if (belt_worn(target)) return 0;
  if (belt_worn(player)) return 0;
  if (tal(target, 273) || tal(player, 273)) return 0;
  if (zooko_worn(target)) return 0;
  return 1;
}

function able66() {
  const target = era_flag.target;
  const assi = era_flag.assi;
  if (fainted()) return 0;
  if (era_flag.player !== assi) return 0;
  if (!tal(MASTER, 121) && !tal(MASTER, 122)) return 0;
  if (!tal(assi, 121) && !tal(assi, 122)) return 0;
  if (!charm_ok()) return 0;
  if (refuse_either()) return 0;
  if (tequip(target, 45) || tequip(target, 44)) return 0;
  if (play_blocked(target)) return 0;
  if (zooko_worn(target)) return 0;
  return 1;
}

function able68() {
  const target = era_flag.target;
  const assi = era_flag.assi;
  if (fainted()) return 0;
  if (era_flag.player !== assi) return 0;
  if (!tal(MASTER, 121) && !tal(MASTER, 122)) return 0;
  if (!charm_ok()) return 0;
  if (refuse_either()) return 0;
  if (abl(assi, 12) < 3 || abl(assi, 16) < 3) return 0;
  if (tequip(target, 45) || tequip(target, 44)) return 0;
  if (play_blocked(target)) return 0;
  if (zooko_worn(target)) return 0;
  return 1;
}

function able69() {
  const target = era_flag.target;
  if (fainted()) return 0;
  if (era_flag.assi > 0 && era_flag.assiplay) {
    const assi = era_flag.assi;
    if (
      (abl(assi, 11) <= 3 || abl(assi, 22) <= 3) &&
      !tal(assi, 87) &&
      relation_to(target, era_flag.player) < 150
    ) {
      return 0;
    }
  } else if (abl(target, 10) < 3 || abl(target, 16) < 3) {
    return 0;
  }
  if (tequip(target, 44)) return 0;
  if (play_blocked(target)) return 0;
  if (tequip(target, 58) && !has_mat()) return 0;
  if (pants_worn(target)) return 0;
  if (diaper_worn(target)) return 0;
  if (zooko_worn(target)) return 0;
  return 1;
}

function able70() {
  const target = era_flag.target;
  if (fainted()) return 0;
  if (era_flag.assiplay) return 0;
  if (!tal(era_flag.player, 121) && !tal(era_flag.player, 122)) return 0;
  if (!charm_ok()) return 0;
  if (refuse_either()) return 0;
  if (tequip(target, 11) || tequip(target, 44)) return 0;
  if (play_blocked(target)) return 0;
  if (tequip(target, 58) && !has_mat()) return 0;
  if (pants_worn(target)) return 0;
  if (diaper_worn(target)) return 0;
  if (zooko_worn(target)) return 0;
  return 1;
}

function able71() {
  const target = era_flag.target;
  const assi = era_flag.assi;
  if (fainted()) return 0;
  if (era_flag.player !== assi) return 0;
  if (tal(target, 122) || tal(assi, 122)) return 0;
  if (tal(target, 116) || tal(assi, 116)) return 0;
  if (!tal(MASTER, 121) && !tal(MASTER, 122)) return 0;
  if (!charm_ok()) return 0;
  if (abl(assi, 12) < 4 || abl(assi, 16) < 3) return 0;
  if (
    !tal(target, 114) &&
    !tal(target, 110) &&
    !tal(target, 119) &&
    !tal(assi, 114) &&
    !tal(assi, 110) &&
    !tal(assi, 119) &&
    abl(target, 12) < 3
  ) {
    return 0;
  }
  if (tal(target, 109) && tal(assi, 109) && abl(target, 12) < 4) return 0;
  if (refuse_either()) return 0;
  if (tequip(target, 44)) return 0;
  if (play_blocked(target)) return 0;
  if (bra_worn(target)) return 0;
  if (zooko_worn(target)) return 0;
  return 1;
}

function able72() {
  const target = era_flag.target;
  if (tal(target, 310) <= 20) return 0;
  if (tequip(target, 89) || tequip(target, 88) || tequip(target, 90)) return 0;
  if (tequip(target, 55)) return 0;
  if (abl(target, 10) < 2) return 0;
  if (tal(target, 0) && abl(target, 10) < 3 && abl(target, 17) < 3) return 0;
  if (tequip(target, 11)) return 0;
  if (pants_worn(target)) return 0;
  if (diaper_worn(target)) return 0;
  if (zooko_worn(target)) return 0;
  return 1;
}

function able73() {
  const target = era_flag.target;
  if ((era.get('tflag:224') || 0) === 555) return 0;
  if (tequip(target, 88) || tequip(target, 89) || tequip(target, 90)) return 0;
  if (abl(target, 10) < 2) return 0;
  if (tequip(target, 55)) return 0;
  return 1;
}

// ============================================================
// @COM60-73 真身
// ============================================================

async function start_judge() {
  const { a, s, parts } = await com_order(0, 0);
  const state = { a, s };
  return { parts, state, t: judge_tools(parts, state) };
}

async function com60() {
  const target = era_flag.target;
  const player = era_flag.player;
  const src = make_src(target);
  era.print('助手接吻');
  const { parts, state, t } = await start_judge();
  t.add_abl(target, 11, 1);
  t.add_abl(target, 16, 4);
  t.add_mark(target, 1, 2);
  t.add_palam(target, 5, 1);
  t.add_talent(target, 35, -1);
  t.add_talent(target, 61, 1);
  t.add_talent(target, 62, -1);
  t.add_talent(target, 63, 6);
  t.add_talent(target, 71, -1);
  if (tal(target, 79) && !tal(player, 122)) t.add_talent(target, 79, -5);
  if (tal(target, 85) && era_flag.assiplay === 0)
    t.add_talent(target, 85, 5, 5);
  const y = dirty_score({ player, part: 0, target, bit16: 15, divide: 2 });
  t.add_dirty(y, target);
  if (!(await finish_judge(parts, state, 15))) return 0;
  era_flag.selectcom = 60;
  await train_message_b();
  let b = pick([50, 200, 300, 400, 500, 600], abl(target, 12));
  b = scale_by_abl(b, target, 10, RATE_OBED);
  b = scale_by_abl(b, target, 13, RATE_SERVE_TECH);
  if (tal(target, 52)) b = times(b, 2);
  b = scale_by_abl(b, player, 0, RATE_C_SENSE);
  add_gauge(player, b);
  lose(target, 1, 20);
  src.set(13, 100);
  src.set(14, 10);
  src.set(8, y * 20 + 10);
  apply_service_source(src, [
    [50, 0, 4],
    [150, 50, 2.5],
    [200, 100, 1.5],
    [250, 180, 1],
    [300, 300, 0.5],
    [350, 500, 0.1],
  ]);
  const { e, ejac } = ejac_level(player);
  apply_poison_on_ejac(
    src,
    [
      [0, 2, 2],
      [100, 2.5, 1.6],
      [300, 3, 1],
      [700, 4, 0.7],
      [1500, 5, 0.4],
      [6000, 6, 0.1],
    ],
    e,
  );
  if (e === 2) {
    src.times(7, 2);
    src.times(5, 1.5);
  }
  settle_ejac({
    cid: player,
    e,
    ejac,
    heavy_semen: 1,
    flag: 4,
  });
  stain_exchange(target, 0, player, 0);
  record_target_kiss(target, player, 1);
  record_player_kiss(player, target, 1);
  print_same_sex_exp(target, player, 3, 3);
  game.train.快乐经验 = 1;
  game.train.屈服刻印结算 = 1;
  return 1;
}

async function com61() {
  const upgraded = await get_adv_com(61);
  if (upgraded !== 61) return jump_to_advanced(upgraded);
  const target = era_flag.target;
  const player = era_flag.player;
  const src = make_src(target);
  era.print('强制舔阴');
  const { parts, state, t } = await start_judge();
  t.add_abl(target, 11, 1);
  t.add_abl(target, 16, 4);
  t.add_mark(target, 1, 2);
  t.add_palam(target, 5, 1);
  t.add_talent(target, 35, -1);
  t.add_talent(target, 61, 3);
  t.add_talent(target, 62, -3);
  t.add_talent(target, 63, 6);
  t.add_talent(target, 71, -1);
  if (tal(target, 79) && !tal(player, 122)) t.add_talent(target, 79, -5);
  if (tal(target, 85) && era_flag.assiplay === 0)
    t.add_talent(target, 85, 5, 5);
  const y = dirty_score({ player, part: 3, target, bit16: 15 });
  t.add_dirty(y, target);
  if (!(await finish_judge(parts, state, 23))) return 0;
  await train_message_b();
  let b = pick([100, 500, 900, 1200, 1500, 2000], abl(target, 12));
  b = scale_by_abl(b, target, 10, RATE_OBED);
  b = scale_by_abl(b, target, 13, RATE_SERVE_TECH);
  if (tal(target, 52)) b = times(b, 2);
  b = scale_by_abl(b, player, 0, RATE_C_SENSE);
  add_gauge(player, b);
  lose(target, 1, 10);
  lose(target, 1, 100);
  src.set(13, 1000);
  src.set(14, 500);
  src.set(8, y * 80 + 50);
  apply_service_source(src, [
    [420, 150, 4],
    [500, 300, 2.5],
    [580, 600, 1.5],
    [660, 900, 1],
    [740, 1500, 0.5],
    [820, 2200, 0.1],
  ]);
  const { e, ejac } = ejac_level(player);
  apply_poison_on_ejac(
    src,
    [
      [0, 2, 2],
      [200, 2.5, 1.6],
      [500, 3, 1],
      [1200, 4.5, 0.7],
      [2500, 6, 0.4],
      [5000, 8, 0.1],
    ],
    e,
  );
  if (e === 2) {
    src.times(7, 2);
    src.times(5, 1.5);
  }
  settle_ejac({
    cid: player,
    e,
    ejac,
    heavy_semen: 4,
    normal_semen: 1,
    flag: 5,
  });
  stain_exchange(target, 0, player, 3);
  record_target_kiss(target, player, 301);
  if (!tal(target, 122) && !tal(player, 122))
    print_same_sex_exp(target, player, 6);
  game.train.快乐经验 = 1;
  game.train.屈服刻印结算 = 1;
  return 1;
}

async function com62() {
  const target = era_flag.target;
  const assi = era_flag.assi;
  const src = make_src(target);
  const saved_player = era_flag.player;
  era_flag.player = assi;
  incest();
  era_flag.player = saved_player;
  const t14 = era.get('tflag:14') || 0;
  era.print('侵犯助手');
  const { parts, state, t } = await start_judge();
  t.add_abl(target, 11, 2);
  t.add_abl(target, 16, 4);
  t.add_mark(target, 1, 2);
  t.add_palam(target, 5, 2);
  t.add_talent(target, 35, -1);
  t.add_talent(target, 63, 6);
  if (tal(target, 85) && era_flag.assiplay === 0) t.add_talent(target, 85, 5);
  if (exp(assi, 0) === 0) t.add_custom('助手是处女', -15);
  if (t14 === 1) t.add_custom('助手的母亲', -10);
  else if (t14 === 2) t.add_custom('助手的女儿', -20);
  else if (t14 === 3) t.add_custom('助手的姐姐', -5);
  else if (t14 === 4) t.add_custom('助手的妹妹', -5);
  if (!(await finish_judge(parts, state, 40))) return 0;
  await train_message_b();
  let b = pick([50, 300, 800, 1500, 2000, 3200], abl(assi, 12));
  b = scale_by_abl(b, assi, 10, RATE_OBED);
  b = scale_by_abl(b, assi, 14, RATE_SERVE_TECH);
  b = scale_by_abl(b, assi, 2, RATE_V_SENSE);
  b = times(b, pick(RATE_V_EXP, exp_level(exp(assi, 0))));
  b = scale_by_abl(b, MASTER, 0, RATE_C_SENSE);
  add_gauge(MASTER, b);
  lose(target, 1, 40);
  lose(target, 1, 220);
  src.set(3, 1500);
  src.set(14, 800);
  const desire = pick(
    [
      [200, 1600],
      [400, 1900],
      [750, 2300],
      [1200, 2700],
      [1700, 3100],
      [2500, 3500],
    ],
    abl(target, 11),
  );
  src.set(10, desire[0]);
  src.set(13, desire[1]);
  const serve = pick(
    [
      [0.1, 0.5],
      [0.4, 0.8],
      [0.7, 1],
      [1, 1.5],
      [1.6, 2],
      [2, 2.5],
    ],
    abl(target, 16),
  );
  src.times(3, serve[0]);
  src.times(10, serve[1]);
  chara(assi).dungeon.私处经验 += 1;
  chara(assi).dungeon.性交经验 += 1;
  const t_male = tal(target, 122);
  if (t14 === 1) {
    era.print(`＜${t_male ? '儿子' : '女儿'}的眼前侵犯母亲＞`);
  } else if (t14 === 2) {
    era.print(`＜${t_male ? '父亲' : '母亲'}的眼前侵犯女儿＞`);
  } else if (t14 === 3) {
    era.print(`＜${t_male ? '弟弟' : '妹妹'}的眼前侵犯姐姐＞`);
  } else if (t14 === 4) {
    era.print(`＜${t_male ? '哥哥' : '姐姐'}的眼前侵犯妹妹＞`);
  } else if (t14 === 5) {
    era.print(`＜${t_male ? '表弟' : ''}的眼前侵犯表姐＞`);
  }
  const kin = apply_kin_source(src, t14, true);
  if (t14 === 1 || t14 === 2) raise_abl10(target, 3);
  else if (kin) raise_abl10(target, 2);
  era.set('tflag:14', 0);
  const saved = era_flag.target;
  era_flag.target = assi;
  incest();
  era_flag.target = saved;
  const t14b = era.get('tflag:14') || 0;
  if (chara(MASTER).train.童贞) {
    chara(MASTER).train.童贞 = 0;
    if (chara(MASTER).train.初体验对象 === 0) {
      chara(MASTER).train.初体验对象 = (era.get(`no:${assi}`) || assi) + 1;
      chara(MASTER).train.初体验对象名 = chara_callname(assi);
      const code = first_exp_code(t14b, tal(assi, 122), [
        [2, 1, 300],
        [2, 0, 301],
        [3, 1, 306],
        [3, 0, 307],
        [4, 1, 304],
        [4, 0, 305],
      ]);
      if (code) chara(MASTER).train.初体验对象 = code;
    }
  }
  if (chara(assi).chara.处女 === 1) {
    src.times(13, 20);
    src.times(14, 3);
    chara(assi).chara.处女 = 0;
    if (chara(assi).train.初体验对象 === 0) {
      chara(assi).train.初体验对象 = (era.get(`no:${MASTER}`) || MASTER) + 1;
      chara(assi).train.初体验对象名 = chara_callname(MASTER);
      const code = first_exp_code(t14b, tal(MASTER, 122), [
        [1, 1, 300],
        [1, 0, 301],
        [3, 1, 304],
        [3, 0, 305],
        [4, 1, 306],
        [4, 0, 307],
      ]);
      if (code) chara(assi).train.初体验对象 = code;
    }
    era.print('＜助手处女＞');
    chara(target).dungeon.异常经验 += 1;
    era.print(`${name_of('expname', 50)}＋１`);
    raise_abl10(target, 2);
  }
  era.set('tflag:14', 0);
  const { e, ejac } = ejac_level(MASTER);
  if (e) {
    src.times(13, pick([1, 1.2, 1.5, 2, 2.5, 3], abl(target, 32)));
  }
  if (e === 2) src.times(10, 1.5);
  settle_ejac({ cid: MASTER, e, ejac, heavy_semen: 1, flag: 7 });
  if (tal(MASTER, 119) || tal(MASTER, 122) || tal(MASTER, 121)) {
    stain_exchange(MASTER, 2, assi, 3);
  }
  if (!tal(MASTER, 122) && !tal(assi, 122)) {
    era.print(`百合经验+10(${chara_callname(assi)})`);
    chara(assi).train.百合经验 += 10;
  } else if (tal(MASTER, 122) && tal(assi, 122)) {
    era.print(`断背经验+10(${chara_callname(assi)})`);
    chara(assi).train.断背经验 += 10;
  }
  if (cflag(assi, 2) >= 1000) {
    era.print(`爱情经验+2(${chara_callname(assi)})`);
    chara(assi).train.爱情经验 += 2;
  }
  game.train.快乐经验 = 1;
  game.train.屈服刻印结算 = 2;
  return 1;
}

async function com63() {
  const target = era_flag.target;
  const player = era_flag.player;
  const src = make_src(target);
  era.print('磨镜');
  await train_message_b();
  lose(target, 1, 30);
  lose(target, 1, 90);
  src.set(12, 250);
  src.set(13, 400);
  src.set(14, 300);
  src.set(11, pick([200, 120, 60, 20, 0, 0], abl(target, 10)));
  const c = pick(
    [
      [20, 0, 0, 20, 0.8],
      [80, 10, 50, 20, 0.9],
      [350, 50, 100, 20, 1],
      [750, 100, 300, 20, 1.1],
      [1200, 700, 600, 20, 1.2],
      [1750, 2000, 1000, 20, 1.3],
    ],
    abl(target, 0),
  );
  src.set(0, c[0]);
  src.set(4, c[1]);
  src.set(5, c[2]);
  src.set(13, c[3]);
  src.times(12, c[4]);
  src.times(4, 1);
  src.times(5, 0.6);
  src.times(13, 0.5);
  src.times(5, pick([0.5, 1, 1.2, 1.4, 1.7, 2], abl(target, 16)));
  const p0 = pick(
    [
      [0.8, 0.5],
      [0.9, 0.7],
      [1, 1],
      [1.1, 1.2],
      [1.2, 1.4],
      [1.3, 1.7],
    ],
    abl(player, 0),
  );
  src.times(4, p0[0]);
  src.times(5, p0[1]);
  stain_exchange(target, 3, player, 3);
  if (!tal(target, 122) && !tal(player, 122))
    print_same_sex_exp(target, player, 8);
  if (era_flag.assiplay === 0 && abl(target, 0) >= 3) {
    era.add('tflag:30', 1);
  }
  game.train.快乐经验 = 1;
  return 1;
}

async function com64() {
  const target = era_flag.target;
  const assi = era_flag.assi;
  const src = make_src(target);
  assign_3p_sites();
  if (site_used(1)) {
    if ((await confirm_lost_virgin()) === 0) return 0;
    if (!(await confirm_condom())) return 0;
  }
  era.print('３Ｐ');
  const t40 = era.get('tflag:40') || 0;
  const t41 = era.get('tflag:41') || 0;
  if ((t40 === 1 && t41 === 2) || (t40 === 2 && t41 === 1)) {
    era.print('・私处和肛门一起插');
  } else if ((t40 === 1 && t41 === 3) || (t40 === 3 && t41 === 1)) {
    era.print('・性交同时口交');
  } else if ((t40 === 2 && t41 === 3) || (t40 === 3 && t41 === 2)) {
    era.print('・肛交同时口交');
  } else {
    era.print('　');
  }
  era_flag.selectcom = 64;
  await train_message_b();
  if (site_used(1)) era.set('tflag:19', 1);
  let b = pick([2700, 2800, 2900, 3100, 3200, 3300], abl(target, 12));
  b = times(b, palam_rate(target, 3, [0.4, 0.7, 1.0, 1.3, 1.6, 1.6]));
  add_gauge(MASTER, b);
  let b2 = pick([1500, 1600, 1800, 2000, 2400, 3000], abl(target, 12));
  b2 = scale_by_abl(b2, target, 10, RATE_OBED);
  b2 = scale_by_abl(b2, target, 11, [1.0, 1.1, 1.2, 1.3, 1.4, 1.5]);
  b2 = times(b2, palam_rate(target, 3, [0.6, 0.8, 1.0, 1.2, 1.4, 1.4]));
  add_gauge(assi, b2);
  lose(target, 0, 160);
  lose(target, 1, 350);
  src.set(11, 1500);
  src.set(12, 2500);
  src.set(14, 1500);
  src.set(1, 0);
  src.set(2, 0);
  src.set(3, 0);
  src.set(4, 0);
  src.set(5, 0);
  src.set(6, 0);
  src.set(13, 0);
  if (site_used(1)) {
    const v = pick(
      [
        [40, 50],
        [150, 150],
        [400, 250],
        [1000, 350],
        [1700, 600],
        [2200, 850],
      ],
      abl(target, 2),
    );
    src.set(1, v[0]);
    src.add(3, v[1]);
    const lv = exp_level(exp(target, 0));
    src.times(1, pick([0.2, 0.6, 1.0, 1.2, 1.4, 1.6], lv));
    src.add(6, pick([20000, 300, 50, 10, 0, 0], lv));
    if (lv === 0) {
      src.add(11, 2000);
      if (!tal(era_flag.player, 122)) {
        chara(target).dungeon.异常经验 += 1;
        era.print(`${name_of('expname', 50)}＋１`);
      }
    }
  }
  if (site_used(2)) {
    const a = pick(
      [
        [10, 10, 100],
        [30, 30, 700],
        [500, 100, 1500],
        [1000, 200, 3000],
        [1700, 450, 5000],
        [2200, 750, 8000],
      ],
      abl(target, 3),
    );
    src.set(2, a[0]);
    src.add(3, a[1]);
    src.set(13, a[2]);
    const lv = exp_level(exp(target, 1));
    if (lv === 5) src.times(1, 1.6);
    else src.times(2, pick([0.1, 0.3, 0.5, 1.0, 1.4, 1.6], lv));
    src.add(6, pick([5000, 2000, 2000, 2000, 1000, 600], lv));
    src.add(11, pick([1000, 1000, 1000, 1000, 200, 0], lv));
  }
  if (site_used(3)) {
    apply_service_source(
      src,
      [
        [420, 150],
        [500, 300],
        [580, 600],
        [660, 900],
        [740, 1500],
        [820, 2200],
      ],
      RATE_SKILL_12,
    );
  }
  const lub = palam_level(palam(target, 3));
  src.times(1, pick([0.2, 0.6, 1.0, 1.3, 1.6, 1.6], lub));
  src.times(2, pick([0.2, 0.4, 0.6, 1.0, 1.3, 1.3], lub));
  src.add(11, pick([1000, 800, 600, 200, 0, 0], lub));
  src.add(6, pick([1900, 1250, 1000, 200, 0, 0], lub));
  src.times(6, pick([9.0, 3.0, 1.5, 0.3, 0.1, 0.1], lub));
  const lust = palam_level(palam(target, 5));
  const lust_r = pick([0.6, 0.8, 1.0, 1.2, 1.4, 1.4], lust);
  scale_src_ids(src, [1, 2, 5, 13], lust_r);
  const obed = pick(
    [
      [0.5, 0.7, 0.6, 0.6, 2.0],
      [0.8, 0.9, 0.8, 0.8, 1.2],
      [1.0, 1.0, 1.0, 1.0, 1.0],
      [1.2, 1.1, 1.2, 1.2, 0.6],
      [1.4, 1.2, 1.4, 1.4, 0.3],
      [1.7, 1.3, 1.6, 1.6, 0.1],
    ],
    abl(target, 10),
  );
  src.times(1, obed[0]);
  src.times(2, obed[1]);
  src.times(3, obed[2]);
  src.times(4, obed[3]);
  src.times(11, obed[4]);
  if (tal(target, 99)) src.times(6, 0.8);
  if (tal(target, 100)) src.times(6, 2.0);
  if (tal(target, 135)) src.times(6, 4.0);
  if (site_used(2)) {
    if (tal(target, 105)) scale_src_ids(src, [6, 11, 13, 14], 1.5);
    else if (tal(target, 106)) scale_src_ids(src, [6, 11, 13, 14], 0.6);
    chara(target).dungeon.肛门经验 += 5;
    era.print('肛门经验＋５');
    chara(target).dungeon.性交经验 += 1;
    era.print('性交经验＋１');
  }
  if (site_used(1)) {
    if (tal(target, 30)) {
      src.times(3, 0.6);
      src.times(11, exp(target, 0) === 0 ? 5.0 : 1.8);
    } else if (tal(target, 31)) {
      src.times(11, exp(target, 0) === 0 ? 0.5 : 0.3);
    }
    chara(target).dungeon.私处经验 += 1;
    era.print('私处经验＋１');
    chara(target).dungeon.性交经验 += 1;
    era.print('性交经验＋１');
    era.set('tflag:14', 0);
    incest();
    let z = 0;
    if (tal(target, 0) && !tal(era_flag.player, 122)) z += 1;
    const t14 = era.get('tflag:14') || 0;
    if (tal(target, 0) && t14 === 1) z += 2;
    else if (tal(target, 0) && (t14 === 3 || t14 === 4)) z += 1;
    if (z) {
      chara(target).dungeon.异常经验 += z;
      era.print(`${name_of('expname', 50)}＋${z}`);
    }
  }
  if (t41 === 1) {
    if (tal(assi, 1) && tal(target, 0)) bump_relation(target, assi, 30);
    else if (tal(target, 0)) bump_relation(target, assi, 20);
    else if (tal(assi, 1)) bump_relation(target, assi, 10);
  }
  if (site_used(1)) {
    era.set('tflag:14', 0);
    incest();
    if (chara(era_flag.player).train.童贞) {
      chara(era_flag.player).train.童贞 = 0;
      era.print('【童贞丧失】');
      record_first_exp(era_flag.player, target, [
        [2, 1, 300],
        [2, 0, 301],
        [3, 1, 306],
        [3, 0, 307],
        [4, 1, 304],
        [4, 0, 305],
        [5, 1, 309],
        [6, 0, 308],
      ]);
    }
    era.set('tflag:14', 0);
  }
  if ((era.get(`cflag:${target}:16`) || 0) === -1) {
    if (t40 === 3) {
      era.set('tflag:13', 1);
      era.set(`cflag:${target}:16`, 201);
      era.set(`cstr:${target}:4`, chara_callname(MASTER));
    } else if (t41 === 3) {
      era.set('tflag:13', 1);
      era.set(`cflag:${target}:16`, 201);
      era.set(`cstr:${target}:4`, chara_callname(assi));
    }
  }
  const master_ejac = ejac_level(MASTER);
  if (master_ejac.e === 2) {
    chara(era_flag.player).train.射精经验 += 2;
    chara(target).dungeon.精液经验 += 1;
    era.print('大量射精');
    era.print('精液经验＋１');
    mark_penis_stain(MASTER);
    consume_gauge(MASTER, 2, master_ejac.ejac);
    if (t40 === 1 || t40 === 2) {
      era.set('tflag:2', 2);
      if (t40 === 1 && !tequip(target, 35)) era.set('tflag:38', 2);
    } else era.set('tflag:0', 2);
  } else if (master_ejac.e === 1) {
    era.print('射精');
    chara(era_flag.player).train.射精经验 += 1;
    mark_penis_stain(MASTER);
    consume_gauge(MASTER, 1, master_ejac.ejac);
    if (t40 === 1 || t40 === 2) {
      era.set('tflag:2', 1);
      if (t40 === 1 && !tequip(target, 35)) era.set('tflag:38', 1);
    } else era.set('tflag:0', 1);
  }
  const assi_ejac = ejac_level(assi);
  if (assi_ejac.e === 2) {
    chara(target).dungeon.精液经验 += 1;
    era.print('大量射精（助手）');
    era.print('精液经验＋１');
    mark_penis_stain(assi);
    consume_gauge(assi, 2, assi_ejac.ejac);
    era.set('tflag:6', 2);
    if (t41 === 1 && !tequip(target, 36)) era.set('tflag:38', 2);
  } else if (assi_ejac.e === 1) {
    era.print('射精（助手）');
    mark_penis_stain(assi);
    consume_gauge(assi, 1, assi_ejac.ejac);
    era.set('tflag:6', 1);
    if (t41 === 1 && !tequip(target, 36)) era.set('tflag:38', 1);
  }
  await com_ejac_player_milk(b2);
  const stain_part = { 1: 3, 2: 4, 3: 0 };
  if (stain_part[t41] !== undefined && (tal(assi, 121) || tal(assi, 122))) {
    stain_exchange(target, stain_part[t41], assi, 2);
  }
  if (stain_part[t40] !== undefined && (tal(MASTER, 121) || tal(MASTER, 122))) {
    stain_exchange(target, stain_part[t40], MASTER, 2);
  }
  if (!tal(target, 122) && !tal(era_flag.player, 122)) {
    era.print(`${name_of('expname', 40)}+10`);
    chara(target).train.百合经验 += 10;
  }
  game.train.快乐经验 = 1;
  game.train.屈服刻印结算 = 2;
  return 1;
}

async function com65() {
  const target = era_flag.target;
  const player = era_flag.player;
  const src = make_src(target);
  era.set('tflag:14', 0);
  incest();
  const t14 = era.get('tflag:14') || 0;
  era.print('逆侵犯助手');
  const { parts, state, t } = await start_judge();
  t.add_abl(target, 11, 2);
  t.add_abl(target, 16, 4);
  t.add_mark(target, 1, 2);
  t.add_palam(target, 5, 2);
  t.add_talent(target, 35, -1);
  t.add_talent(target, 63, 6);
  t.add_talent(target, 70, 2);
  t.add_talent(target, 71, -2);
  if (tal(target, 79) && !tal(player, 122)) t.add_talent(target, 79, -5);
  if (tal(target, 85) && era_flag.assiplay === 0) t.add_talent(target, 85, 5);
  if (exp(player, 0) === 0) t.add_custom('助手处女', -15);
  if (t14 === 1) t.add_custom('助手的母亲', -10);
  else if (t14 === 2) t.add_custom('助手的女儿', -20);
  else if (t14 === 3) t.add_custom('助手的姐姐', -5);
  else if (t14 === 4) t.add_custom('助手的妹妹', -5);
  if (!(await finish_judge(parts, state, 40))) return 0;
  await train_message_b();
  if (tal(player, 0)) {
    era.print(
      `${chara_callname(player)}的处女，让${chara_callname(target)}夺走好吗？`,
    );
    era.printButton('好', 0);
    era.printButton('不要', 1);
    if ((await era.input()) === 1) return 0;
  }
  if (!(await confirm_condom2())) return 0;
  let b = pick([50, 300, 800, 1500, 2000, 3200], abl(target, 12));
  b = scale_by_abl(b, target, 10, RATE_OBED);
  b = scale_by_abl(b, target, 16, RATE_SERVE_SPIRIT);
  b = scale_by_abl(b, player, 2, RATE_V_SENSE);
  b = times(b, pick(RATE_V_EXP, exp_level(exp(player, 0))));
  b = scale_by_abl(b, target, 0, RATE_C_SENSE);
  add_gauge(player, b);
  lose(target, 1, 40);
  lose(target, 1, 220);
  src.set(13, 1500);
  src.set(14, 800);
  const serve = pick(
    [
      [800, 1600, 200],
      [1400, 1900, 400],
      [2000, 2300, 750],
      [2500, 2700, 1150],
      [2900, 3100, 1750],
      [3200, 3500, 2500],
    ],
    abl(target, 16),
  );
  src.set(0, serve[0]);
  src.set(4, serve[1]);
  src.set(5, serve[2]);
  const skill = pick(
    [
      [0.5, 0.5, 0.5],
      [0.5, 0.8, 0.8],
      [0.5, 1.0, 1.0],
      [0.5, 1.5, 1.5],
      [0.5, 2.0, 2.0],
      [0.5, 2.5, 2.5],
      [0.5, 3.0, 3.0],
      [0.5, 3.5, 3.5],
      [0.5, 4.0, 4.0],
    ],
    abl(target, 12),
  );
  src.times(0, skill[0]);
  src.times(4, skill[1]);
  src.times(5, skill[2]);
  if (!tal(target, 122) && !tal(player, 122)) {
    src.times(4, pick([0.2, 0.4, 0.6, 0.8, 1.0, 1.2], abl(target, 22)));
    src.times(5, pick([0.2, 0.4, 0.6, 0.8, 1.0, 1.2], abl(target, 22)));
  }
  if (tal(target, 122) && tal(player, 122)) {
    src.times(4, pick([0.2, 0.4, 0.6, 0.8, 1.0, 1.2], abl(target, 23)));
    src.times(5, pick([0.2, 0.4, 0.6, 0.8, 1.0, 1.2], abl(target, 23)));
  }
  if (tal(player, 0) === 1) {
    src.times(13, 20);
    src.times(14, 3);
    chara(player).chara.处女 = 0;
    era.print('＜助手处女＞');
    chara(target).dungeon.异常经验 += 1;
    era.print(`${name_of('expname', 50)}＋１`);
    raise_abl10(target, 3);
    record_first_exp(player, target, [
      [2, 1, 300],
      [2, 0, 301],
      [3, 1, 306],
      [3, 0, 307],
      [4, 1, 304],
      [4, 0, 305],
      [5, 1, 309],
      [6, 0, 308],
    ]);
  }
  chara(player).dungeon.私处经验 += 1;
  chara(player).dungeon.性交经验 += 1;
  if (t14 === 1)
    era.print(tal(target, 122) ? '＜强制母子相奸＞' : '＜强制母女相奸＞');
  else if (t14 === 2)
    era.print(tal(target, 122) ? '＜强制父子相奸＞' : '＜强制父女相奸＞');
  else if (t14 === 3)
    era.print(tal(target, 122) ? '＜强制姐弟相奸＞' : '＜强制姐妹相奸＞');
  else if (t14 === 4)
    era.print(tal(target, 122) ? '＜强制兄妹相奸＞' : '＜强制姐妹相奸＞');
  else if (t14 === 6 && !tal(target, 122)) era.print('＜强制表弟相奸＞');
  const kin = apply_kin_source(src, t14, true);
  if (t14 === 1 || t14 === 2) raise_abl10(target, 3);
  else if (kin) raise_abl10(target, 2);
  if (chara(target).train.童贞) {
    chara(target).train.童贞 = 0;
    era.print('【童贞丧失】');
    record_first_exp(target, player, [
      [1, 1, 300],
      [1, 0, 301],
      [3, 1, 304],
      [3, 0, 305],
      [4, 1, 306],
      [4, 0, 307],
      [5, 0, 308],
      [6, 1, 309],
    ]);
  }
  era.set('tflag:14', 0);
  const { e, ejac } = ejac_level(player);
  apply_poison_on_ejac(
    src,
    [
      [0, 2, 2],
      [50, 2.5, 1.6],
      [150, 3, 1],
      [300, 4.5, 0.7],
      [600, 6, 0.4],
      [1200, 8, 0.1],
    ],
    e,
  );
  if (e === 2) {
    src.times(7, 2);
    src.times(5, 1.5);
  }
  if (e === 2) {
    chara(player).train.射精经验 += 2;
    chara(target).dungeon.精液经验 += 1;
    era.print(`${chara_callname(player)}大量射精`);
    era.print('精液经验＋１');
    mark_penis_stain(player);
    consume_gauge(player, 2, ejac);
    era.set('tflag:6', 2);
  } else if (e === 1) {
    chara(player).train.射精经验 += 1;
    era.print(`${chara_callname(player)}射精`);
    mark_penis_stain(player);
    consume_gauge(player, 1, ejac);
    era.set('tflag:6', 1);
  }
  if (tal(target, 119) || tal(target, 121) || tal(target, 122)) {
    stain_exchange(target, 2, player, 3);
  }
  print_same_sex_exp(target, player, 10, 10);
  game.train.快乐经验 = 1;
  game.train.屈服刻印结算 = 2;
  return 1;
}

async function com66() {
  const target = era_flag.target;
  const player = era_flag.player;
  const assi = era_flag.assi;
  const src = make_src(target);
  era.print('双枪口交');
  const { parts, state, t } = await start_judge();
  t.add_abl(target, 11, 1);
  t.add_abl(target, 16, 4);
  t.add_abl(target, 32, 3);
  t.add_mark(target, 1, 1);
  t.add_palam(target, 5, 1);
  t.add_talent(target, 35, -1);
  t.add_talent(target, 61, 1);
  t.add_talent(target, 62, -3);
  t.add_talent(target, 63, 6);
  t.add_talent(target, 71, -1);
  if (tal(target, 85) && era_flag.assiplay === 0) t.add_talent(target, 85, 5);
  if (tal(player, 121)) t.add_talent(player, 121, 8);
  const y = dirty_score({ player, part: 2, target, bit16: 15 });
  t.add_dirty(y, target);
  if (!(await finish_judge(parts, state, 32))) return 0;
  await train_message_b();
  let b = pick([1200, 1700, 2300, 3000, 3600, 4200], abl(target, 12));
  b = scale_fellatio_gauge(b, target, MASTER);
  add_gauge(MASTER, b);
  let b2 = pick([1200, 1700, 2300, 3000, 3600, 4200], abl(target, 12));
  b2 = scale_fellatio_gauge(b2, target, assi);
  add_gauge(assi, b2);
  lose(target, 0, 80);
  lose(target, 1, 250);
  src.set(13, 6000);
  src.set(14, 600);
  src.set(8, y * 40 + 100);
  apply_service_source(
    src,
    [
      [800, 600, 4],
      [1200, 900, 2.5],
      [1400, 1000, 1.5],
      [1600, 1200, 1],
      [1800, 1500, 0.5],
      [2000, 2200, 0.1],
    ],
    [0.8, 1.0, 1.2, 1.5, 2.0, 2.2],
  );
  const { e, ejac } = ejac_level(MASTER);
  apply_poison_on_ejac(src, POISON_MOUTH, e);
  settle_ejac({
    cid: MASTER,
    e,
    ejac,
    heavy_semen: 9,
    normal_semen: 3,
    flag: 0,
    extra_heavy: () => {
      src.times(7, 2);
      src.times(5, 1.5);
    },
  });
  maybe_mouth_seed(e, 5, 10);
  era.print(`${name_of('expname', 22)}＋２`);
  chara(target).dungeon.口交经验 += 2;
  stain_exchange(target, 0, MASTER, 2);
  lick_clean(target, MASTER, e, 1);
  print_same_sex_exp(target, MASTER, 7, 7);
  if (tal(MASTER, 121)) src.times(13, 0.5);
  const assi_ejac = ejac_level(assi);
  if (assi_ejac.e === 2) {
    chara(target).dungeon.精液经验 += 3;
    era.print('大量射精（助手）');
    era.print('精液经验＋３');
    mark_penis_stain(assi);
    consume_gauge(assi, 2, assi_ejac.ejac);
    era.set('tflag:6', 2);
  } else if (assi_ejac.e === 1) {
    chara(assi).train.射精经验 += 1;
    chara(target).dungeon.精液经验 += 1;
    era.print('射精（助手）');
    era.print('精液经验＋１');
    mark_penis_stain(assi);
    consume_gauge(assi, 1, assi_ejac.ejac);
    era.set('tflag:6', 2);
  }
  await com_ejac_player_milk(b2);
  if (tal(MASTER, 121) || tal(MASTER, 122))
    stain_exchange(target, 0, MASTER, 2);
  if (tal(assi, 121) || tal(assi, 122)) stain_exchange(target, 0, assi, 2);
  lick_clean(target, assi, assi_ejac.e, 1);
  record_target_kiss(target, MASTER, 201);
  if (!tal(target, 122) && !tal(assi, 122)) {
    era.print(`${name_of('expname', 40)}+10`);
    chara(target).train.百合经验 += 10;
  }
  // 源: RETURN 1 之后的 TFLAG:100/200 为死代码，1:1 不写。
  return 1;
}

async function com67() {
  const target = era_flag.target;
  const player = era_flag.player;
  const src = make_src(target);
  era.print('践踏奴隶');
  const { parts, state, t } = await start_judge();
  t.add_abl(target, 11, 1);
  t.add_abl(target, 21, 4);
  t.add_mark(target, 1, 1);
  t.add_palam(target, 5, 1);
  t.add_talent(target, 24, -3);
  t.add_talent(target, 35, -1);
  t.add_talent(target, 70, 3);
  t.add_talent(target, 71, -1);
  if (abl(player, 32)) {
    t.add_custom(
      `${chara_callname(player)}的${name_of('ablname', 32)}`,
      abl(player, 32),
    );
  }
  if (tal(player, 83))
    t.add_custom(`${chara_callname(player)}${name_of('talentname', 83)}`, 6);
  if (tal(player, 87))
    t.add_custom(`${chara_callname(player)}${name_of('talentname', 87)}`, 3);
  if (!(await finish_judge(parts, state, 16))) return 0;
  await train_message_b();
  lose(target, 0, 30);
  lose(target, 1, 150);
  src.set(14, 100);
  const c = pick(
    [
      [40, 40],
      [160, 160],
      [700, 700],
      [1500, 1500],
      [2400, 2400],
      [3300, 3300],
    ],
    abl(target, 0),
  );
  src.set(0, c[0]);
  src.set(13, c[1]);
  src.set(5, pick([150, 300, 600, 900, 1500, 2200], abl(target, 21)));
  const skill = pick(
    [
      [0.5, 0.5],
      [0.8, 0.8],
      [1.0, 1.0],
      [1.2, 1.5],
      [1.5, 2.5],
      [2.0, 4.0],
    ],
    abl(player, 12),
  );
  src.times(0, skill[0]);
  src.times(13, skill[1]);
  if (tal(target, 80)) src.times(5, 1.8);
  print_same_sex_exp(target, player, 4, 4);
  game.train.快乐经验 = 1;
  if (tal(player, 121)) src.times(13, 0.5);
  return 1;
}

async function com68() {
  const target = era_flag.target;
  const assi = era_flag.assi;
  const src = make_src(target);
  era.set('tflag:14', 0);
  incest();
  const prefix = incest_prefix(assi);
  if (prefix) era.print(prefix);
  era.print('双人口交');
  const { parts, state, t } = await start_judge();
  t.add_abl(target, 11, 1);
  t.add_abl(target, 16, 4);
  t.add_abl(target, 32, 3);
  t.add_mark(target, 1, 1);
  t.add_palam(target, 5, 1);
  t.add_talent(target, 35, -1);
  t.add_talent(target, 61, 1);
  t.add_talent(target, 62, -3);
  t.add_talent(target, 63, 6);
  t.add_talent(target, 71, -1);
  if (tal(target, 82) && tal(era_flag.player, 122))
    t.add_talent(target, 82, -12);
  if (tal(target, 85) && era_flag.assiplay === 0) t.add_talent(target, 85, 5);
  if (tal(era_flag.player, 121)) t.add_talent(era_flag.player, 121, 8);
  const y = dirty_score({ player: MASTER, part: 2, target, bit16: 15 });
  t.add_dirty(y, target);
  if (!(await finish_judge(parts, state, 34))) return 0;
  await train_message_b();
  let b = pick([800, 1100, 1500, 2000, 2400, 2800], abl(target, 12));
  b = scale_fellatio_gauge(b, target, MASTER);
  b = times(b, pick(RATE_SKILL_ASSI, abl(assi, 12)));
  if (tal(assi, 52)) b = times(b, 2);
  add_gauge(MASTER, b);
  lose(target, 0, 10);
  lose(target, 1, 100);
  src.set(13, 1500);
  src.set(14, 500);
  src.set(8, y * 40 + 100);
  const serve = pick(
    [
      [300, 420, 150, 4],
      [400, 500, 300, 2.5],
      [550, 580, 600, 1.5],
      [700, 660, 900, 1],
      [900, 740, 1500, 0.5],
      [1000, 820, 2200, 0.1],
    ],
    abl(target, 16),
  );
  src.set(3, serve[0]);
  src.set(4, serve[1]);
  src.set(5, serve[2]);
  src.times(8, serve[3]);
  src.times(3, pick([0.5, 0.8, 1.0, 1.2, 1.5, 2.0], abl(target, 12)));
  src.times(4, pick(RATE_SKILL_12, abl(target, 12)));
  src.times(5, pick(RATE_SKILL_12, abl(target, 12)));
  apply_kin_source(src, era.get('tflag:14') || 0);
  const { e, ejac } = ejac_level(MASTER);
  apply_poison_on_ejac(src, POISON_MOUTH, e);
  settle_ejac({
    cid: MASTER,
    e,
    ejac,
    heavy_semen: 9,
    normal_semen: 3,
    flag: 0,
    extra_heavy: () => {
      src.times(7, 2);
      src.times(5, 1.5);
    },
  });
  maybe_mouth_seed(e, 5, 10);
  era.print(`${name_of('expname', 22)}＋１`);
  chara(target).dungeon.口交经验 += 1;
  await com_ejac_player_milk(b);
  stain_exchange(target, 0, MASTER, 2);
  stain_exchange(assi, 0, MASTER, 2);
  lick_clean(target, MASTER, e, 2);
  if (
    !tal(target, 122) &&
    !tal(assi, 122) &&
    (abl(target, 32) || abl(assi, 32))
  ) {
    stain_exchange(target, 0, assi, 0);
    if (e >= 1) era.set('tflag:8', 3);
  }
  record_target_kiss(target, MASTER, 201);
  record_player_kiss(assi, MASTER, 201);
  print_same_sex_exp(target, MASTER, 7, 7);
  if (!tal(target, 122) && !tal(assi, 122)) {
    era.print(`${name_of('expname', 40)}+7`);
    chara(target).train.百合经验 += 7;
  } else if (tal(target, 122) && tal(assi, 122)) {
    era.print(`${name_of('expname', 41)}+7`);
    chara(target).train.断背经验 += 7;
  }
  if (tal(MASTER, 121)) src.times(13, 0.5);
  game.train.快乐经验 = 1;
  game.train.屈服刻印结算 = 2;
  return 1;
}

async function com69() {
  const target = era_flag.target;
  const player = era_flag.player;
  const src = make_src(target);
  era.set('tflag:14', 0);
  incest();
  const prefix = incest_prefix(player);
  if (prefix) era.print(prefix);
  era.print('六九式');
  const { parts, state, t } = await start_judge();
  t.add_abl(target, 11, 2);
  t.add_abl(target, 16, 4);
  t.add_mark(target, 1, 2);
  t.add_palam(target, 5, 2);
  t.add_talent(target, 35, -3);
  t.add_talent(target, 61, 3);
  t.add_talent(target, 62, -3);
  t.add_talent(target, 63, 6);
  t.add_talent(target, 70, 3);
  t.add_talent(target, 71, -3);
  if (tal(target, 85) && era_flag.assiplay === 0)
    t.add_talent(target, 85, 5, 5);
  if (tequip(target, 21)) t.add_custom(name_of('itemname', 26), 8);
  const y = dirty_score({ player, part: 3, target, bit16: 15 });
  t.add_dirty(y, target);
  if (!(await finish_judge(parts, state, 33))) return 0;
  era_flag.selectcom = 69;
  await train_message_b();
  let b = pick([1200, 1700, 2300, 3000, 3600, 4200], abl(target, 12));
  b = scale_fellatio_gauge(b, target, player);
  add_gauge(player, b);
  if (tal(target, 47)) {
    lose(target, 1, 10);
    lose(target, 1, 80);
  } else {
    lose(target, 1, 20);
    lose(target, 1, 160);
  }
  src.set(10, 1000);
  src.set(12, 1400);
  src.set(13, 1300);
  src.set(14, 800);
  src.set(8, y * 80 + 50);
  src.set(0, pick([40, 160, 700, 1500, 2400, 3300], abl(target, 0)));
  if (tal(player, 52)) {
    src.times(0, 2);
    src.add(16, idiv(src.get(0), 20));
  }
  apply_service_source(
    src,
    [
      [620, 150, 4],
      [700, 300, 2.5],
      [820, 600, 1.5],
      [940, 900, 1],
      [1100, 1500, 0.5],
      [1260, 2200, 0.1],
    ],
    [0.5, 0.8, 1.0, 1.5, 2.5, 4.0],
  );
  const pair = pick(RATE_SENSE_PAIR, abl(player, 0));
  src.times(4, pair[0]);
  src.times(5, pair[1]);
  if (era_flag.prevcom === 9) {
    src.set(2, pick([5, 50, 200, 500, 1000, 1800], abl(target, 3)));
  }
  apply_kin_source(src, era.get('tflag:14') || 0);
  const { e, ejac } = ejac_level(player);
  apply_poison_on_ejac(
    src,
    [
      [0, 2, 2],
      [200, 2.5, 1.6],
      [500, 3, 1],
      [1200, 4.5, 0.7],
      [2500, 6, 0.4],
      [5000, 8, 0.1],
    ],
    e,
  );
  settle_ejac({
    cid: player,
    e,
    ejac,
    heavy_semen: 9,
    normal_semen: 3,
    flag: 0,
    extra_heavy: () => {
      src.times(7, 2);
      src.times(5, 1.5);
    },
  });
  maybe_mouth_seed(e, 5, 10);
  if (tal(player, 121) || tal(player, 122)) {
    era.print(`${name_of('expname', 22)}＋１`);
    chara(target).dungeon.口交经验 += 1;
  }
  stain_exchange(target, 0, player, 3);
  stain_exchange(target, 3, player, 0);
  record_target_kiss(
    target,
    player,
    tal(player, 121) || tal(player, 122) ? 201 : 301,
  );
  record_player_kiss(
    player,
    target,
    tal(target, 121) || tal(target, 122) ? 201 : 301,
  );
  print_same_sex_exp(target, player, 8, 8);
  game.train.快乐经验 = 1;
  game.train.屈服刻印结算 = 2;
  return 1;
}

async function com70() {
  const target = era_flag.target;
  const assi = era_flag.assi;
  const src = make_src(target);
  era.set('tflag:14', 0);
  const saved_player = era_flag.player;
  era_flag.player = assi;
  incest();
  era_flag.player = saved_player;
  const prefix = incest_prefix(assi);
  if (prefix) era.print(prefix);
  era.print('双人股间性交');
  const { parts, state, t } = await start_judge();
  t.add_abl(target, 11, 2);
  t.add_abl(target, 16, 4);
  t.add_abl(target, 32, 1);
  t.add_mark(target, 1, 2);
  t.add_palam(target, 5, 3);
  t.add_talent(target, 35, -1);
  t.add_talent(target, 71, -3);
  if (tal(target, 82) && tal(era_flag.player, 122))
    t.add_talent(target, 82, -7);
  if (tal(target, 85) && era_flag.assiplay === 0)
    t.add_talent(target, 85, 3, 3);
  if (tal(era_flag.player, 121)) t.add_talent(era_flag.player, 121, 8);
  if (tequip(target, 21)) t.add_custom(name_of('itemname', 26), 6);
  const y = dirty_score({
    player: era_flag.player,
    part: 2,
    target,
    bit16: 1,
    urine: true,
    divide: 3,
  });
  t.add_dirty(y, target);
  if (!(await finish_judge(parts, state, 25))) return 0;
  era_flag.selectcom = 70;
  await train_message_b();
  lose(target, 0, 40);
  lose(target, 1, 160);
  src.set(13, 1500);
  src.set(14, 600);
  src.set(8, y * 10 + 60);
  apply_service_source(
    src,
    [
      [200, 100, 4],
      [250, 180, 2.5],
      [300, 250, 1.5],
      [350, 350, 1],
      [400, 500, 0.5],
      [450, 800, 0.1],
    ],
    [0.7, 0.9, 1.0, 1.2, 1.4, 1.6],
  );
  const c = pick(
    [
      [20, 0.8],
      [80, 0.9],
      [350, 1.0],
      [750, 1.1],
      [1200, 1.2],
      [1750, 1.3],
    ],
    abl(target, 0),
  );
  src.set(0, c[0]);
  src.times(4, c[1]);
  const lub = palam_level(palam(target, 3));
  src.times(0, pick([0.3, 0.6, 1.0, 1.5, 2.0, 2.5], lub));
  src.times(4, pick([0.6, 0.8, 1.0, 1.2, 1.4, 1.6], lub));
  const pair = pick(RATE_SENSE_PAIR, abl(assi, 0));
  src.times(4, pair[0]);
  src.times(5, pair[1]);
  let b = pick([500, 1100, 2000, 3000, 3900, 4600], abl(target, 12));
  b += pick([0, 0, 0, 300, 600, 1000], palam_level(palam(target, 3)));
  b = scale_by_abl(b, target, 10, RATE_OBED);
  b = scale_by_abl(b, target, 16, RATE_SERVE_SPIRIT);
  b = scale_by_abl(b, era_flag.player, 0, RATE_C_SENSE);
  add_gauge(era_flag.player, b);
  const { e, ejac } = ejac_level(era_flag.player);
  if (e) {
    src.times(4, 2);
    const poison = pick(
      [
        [0, 1.5, 1.4],
        [200, 2, 1],
        [400, 2.5, 0.8],
        [700, 3, 0.5],
        [1000, 4, 0.2],
        [1500, 5, 0],
      ],
      abl(target, 32),
    );
    src.set(7, poison[0]);
    src.times(5, poison[1]);
    src.times(13, poison[2]);
  }
  if (e === 2) {
    src.times(7, 1.5);
    src.times(5, 1.2);
    chara(era_flag.player).train.射精经验 += 2;
    chara(target).train.百合经验 += 2;
    era.print('大量射精');
    era.print('精液经验+2');
    mark_penis_stain(era_flag.player);
    consume_gauge(era_flag.player, 2, ejac);
    era.set('tflag:9', 2);
  } else if (e === 1) {
    chara(era_flag.player).train.射精经验 += 1;
    chara(target).train.百合经验 += 1;
    era.print('射精');
    era.print('精液经验+1');
    mark_penis_stain(era_flag.player);
    consume_gauge(era_flag.player, 1, ejac);
    era.set('tflag:9', 1);
  }
  stain_exchange(target, 3, era_flag.player, 2);
  stain_exchange(assi, 3, era_flag.player, 2);
  stain_exchange(target, 3, assi, 3);
  print_same_sex_exp(target, MASTER, 7, 7);
  if (!tal(target, 122) && !tal(assi, 122)) {
    era.print(`${name_of('expname', 40)}+2`);
    chara(target).train.百合经验 += 2;
  } else if (tal(target, 122) && tal(assi, 122)) {
    era.print(`${name_of('expname', 41)}+2`);
    chara(target).train.断背经验 += 2;
  }
  if (cflag(target, 2) >= 1000 && era_flag.assiplay === 0) {
    era.print(`${name_of('expname', 21)}+1`);
    chara(target).train.爱情经验 += 1;
  }
  game.train.快乐经验 = 1;
  game.train.屈服刻印结算 = 1;
  if (tal(era_flag.player, 121)) src.times(13, 0.5);
  return 1;
}

async function com71() {
  const target = era_flag.target;
  const assi = era_flag.assi;
  const src = make_src(target);
  era.set('tflag:14', 0);
  incest();
  const prefix = incest_prefix(assi);
  if (prefix) era.print(prefix);
  era.print('双人乳交');
  const { parts, state, t } = await start_judge();
  t.add_abl(target, 11, 1);
  t.add_abl(target, 16, 4);
  t.add_abl(target, 32, 3);
  t.add_mark(target, 1, 1);
  t.add_palam(target, 5, 1);
  t.add_talent(target, 35, -1);
  t.add_talent(target, 61, 1);
  t.add_talent(target, 62, -3);
  t.add_talent(target, 63, 6);
  t.add_talent(target, 71, -1);
  if (tal(target, 82) && tal(MASTER, 122)) t.add_talent(target, 82, -12);
  if (tal(target, 85) && era_flag.assiplay === 0) t.add_talent(target, 85, 5);
  if (tal(MASTER, 121)) t.add_talent(MASTER, 121, 8);
  const y = dirty_score({
    player: MASTER,
    part: 2,
    target,
    bit16: 1,
    urine: true,
  });
  t.add_dirty(y, target);
  if (!(await finish_judge(parts, state, 34))) return 0;
  await train_message_b();
  lose(target, 0, 10);
  lose(target, 1, 100);
  src.set(13, 1800);
  src.set(14, 900);
  apply_service_source(
    src,
    [
      [420, 150],
      [500, 300],
      [580, 600],
      [660, 900],
      [740, 1500],
      [820, 2200],
    ],
    RATE_SKILL_12,
  );
  src.set(8, pick([400, 300, 150, 50, 20, 0], abl(target, 16)));
  let a = pick([100, 200, 400, 800, 1200, 1500], abl(target, 1));
  if (tal(target, 110)) a = times(a, 1.2);
  if (tal(target, 108)) a = times(a, 1.2);
  else if (tal(target, 107)) a = times(a, 0.7);
  src.add(17, a);
  const pair = pick(RATE_SENSE_PAIR, abl(assi, 1));
  src.times(4, pair[0]);
  src.times(5, pair[1]);
  let b = pick([1200, 1500, 2000, 2500, 3000, 4000], abl(target, 12));
  b = scale_fellatio_gauge(b, target, MASTER);
  b = times(b, pick(RATE_SKILL_ASSI, abl(assi, 12)));
  if (tal(assi, 52)) b = times(b, 2);
  add_gauge(MASTER, b);
  const { e, ejac } = ejac_level(MASTER);
  apply_poison_on_ejac(src, POISON_MOUTH, e);
  if (e === 2) {
    src.times(7, 2);
    src.times(5, 1.5);
    chara(MASTER).train.射精经验 += 2;
    chara(target).train.百合经验 += 6;
    era.print('大量射精');
    era.print('精液经验＋6');
    mark_penis_stain(MASTER);
    consume_gauge(MASTER, 2, ejac);
    era.set('tflag:0', 2);
  } else if (e === 1) {
    chara(MASTER).train.射精经验 += 1;
    chara(target).train.百合经验 += 3;
    era.print('射精');
    era.print('精液经验＋3');
    mark_penis_stain(MASTER);
    consume_gauge(MASTER, 1, ejac);
    era.set('tflag:0', 1);
  }
  await com_ejac_player_milk(b);
  stain_exchange(target, 5, MASTER, 2);
  stain_exchange(assi, 5, MASTER, 2);
  if (lick_clean(target, MASTER, e, 2)) {
    era.print(`${name_of('expname', 22)}+1`);
    chara(target).dungeon.口交经验 += 1;
    stain_exchange(target, 0, MASTER, 2);
  }
  if (
    !tal(target, 122) &&
    !tal(assi, 122) &&
    (abl(target, 32) >= 1 || abl(assi, 32) >= 1)
  ) {
    stain_exchange(target, 0, assi, 0);
    if (e >= 1) era.set('tflag:8', 3);
  }
  print_same_sex_exp(target, MASTER, 7, 7);
  if (!tal(target, 122) && !tal(assi, 122)) {
    era.print(`${name_of('expname', 40)}+5`);
    chara(target).train.百合经验 += 5;
  } else if (tal(target, 122) && tal(assi, 122)) {
    era.print(`${name_of('expname', 41)}+5`);
    chara(target).train.断背经验 += 5;
  }
  if (tal(MASTER, 121)) src.times(21, 0.5);
  game.train.快乐经验 = 1;
  game.train.屈服刻印结算 = 2;
  return 1;
}

async function com72() {
  const target = era_flag.target;
  const src = make_src(target);
  era.print('刮阴毛');
  lose(target, 0, 20);
  lose(target, 1, 60);
  src.set(5, 750);
  src.set(7, 500);
  src.set(12, 1000);
  src.set(14, 1200);
  src.set(6, pick([600, 250, 100, 30, 0, 0], palam_level(palam(target, 3))));
  let a = 500;
  a = times(a, pick([0.8, 1.0, 1.2, 1.5, 2.0, 2.6], abl(target, 7)));
  a = times(a, pick([0.8, 1.0, 1.2, 1.4, 1.7, 2.0], abl(target, 21)));
  src.add(7, a);
  src.add(11, a);
  src.add(12, a);
  era.print(
    `${chara_callname(era_flag.player)}将${chara_callname(target)}的阴毛漂亮地刮掉了。`,
  );
  if ((era.get(`base:${target}:0`) || 0) > 0) {
    const name = chara_callname(target);
    const expo = abl(target, 17);
    if (expo < 2) {
      era.print(
        tequip(target, 44)
          ? `${name}面红耳赤，不断回避着${chara_callname(era_flag.player)}的视线，不敢与之相交…`
          : `${name}面红耳赤，还试图用手遮住光滑的性器…`,
      );
    } else if (expo === 2) era.print(`${name}害羞地看着自己光溜溜的阴部…`);
    else if (expo === 3) era.print(`${name}稍微低头看了一下…`);
    else if (expo === 4)
      era.print(`${name}为性器暴露而感到羞耻，同时也在享受着这种感觉…`);
    else era.print(`${name}好像非常享受被空气爱抚性器的样子…`);
  }
  chara(target).chara.阴毛状态 = 1;
  return 1;
}

async function com73() {
  const target = era_flag.target;
  const src = make_src(target);
  era.print('摆弄发型');
  lose(target, 1, 60);
  const obed = pick(
    [
      [0, 100],
      [10, 250],
      [100, 500],
      [250, 1000],
      [500, 1500],
      [1000, 2000],
    ],
    abl(target, 10),
  );
  if (obed[0]) src.set(3, obed[0]);
  src.set(13, obed[1]);
  src.set(12, pick([500, 250, 100, 50, 25, 10], abl(target, 17)));
  src.set(
    6,
    abl(era_flag.player, 12) <= 3
      ? 100
      : abl(era_flag.player, 12) === 4
        ? 10
        : 0,
  );
  await hairset();
  return 1;
}

// ============================================================
// @GET_ADV_COM CASE 61（COMF_JUMP.ERB:627-637）
// ============================================================

adv_com_family.register(61, async () => {
  const target = era_flag.target;
  if (
    same_trainer() &&
    [1, 4, 69].includes(era_flag.prevcom) &&
    !tequip(target, 44) &&
    (await com_able_family.call(69, { whenMissing: 0 })) === 1
  ) {
    return 69;
  }
  return 61;
});

// ============================================================
// @TRAIN_MESSAGE_B（SELECTCOM 60-72；67/73 源侧无分支）
// ============================================================

train_message_b_family.register(60, async () => {
  era.print(
    `${chara_callname(era_flag.assi)}与${chara_callname(era_flag.target)}舌头相互交缠、接吻着…`,
  );
  return 0;
});

train_message_b_family.register(61, async () => {
  era.print(
    `${chara_callname(era_flag.target)}舔舐着${chara_callname(era_flag.player)}的阴唇…`,
  );
  return 0;
});

train_message_b_family.register(62, async () => {
  const target = era_flag.target;
  const assi = era_flag.assi;
  if ((era.get('tflag:60') || 0) && era_flag.prevcom === 62) {
    era.print(
      `在${chara_callname(target)}的面前、不断侵犯着${chara_callname(assi)}…`,
    );
  } else {
    let line = `在${chara_callname(target)}的面前、${chara_callname(assi)}`;
    line += exp(assi, 0) === 0 ? '第一次' : '的私处';
    era.print(`${line}被贯穿了…`);
  }
  return 0;
});

train_message_b_family.register(63, async () => {
  era.print(
    `${chara_callname(era_flag.player)}和${chara_callname(era_flag.target)}用阴唇相互摩擦着…`,
  );
  return 0;
});

train_message_b_family.register(64, async () => {
  const target = era_flag.target;
  const master = chara_callname(MASTER);
  const assi = chara_callname(era_flag.assi);
  const name = chara_callname(target);
  const t40 = era.get('tflag:40') || 0;
  const t41 = era.get('tflag:41') || 0;
  const site = (who, part, leading) => {
    if (who === 'master') {
      if (part === 1)
        return leading
          ? `${master}插入了${name}的私处、`
          : `${master}插入了阴唇…`;
      if (part === 2)
        return leading
          ? `${master}插入了${name}的肛门、`
          : `${master}插入了肛门…`;
      if (part === 3)
        return leading ? `${master}咬着${name}、` : `${master}侵犯着嘴巴…`;
    }
    if (part === 1)
      return leading ? `${assi}贯穿了${name}的私处、` : `${assi}贯穿了私处…`;
    if (part === 2)
      return leading ? `${assi}突入了${name}的肛门、` : `${assi}突入了肛门…`;
    if (part === 3) {
      return leading ? `${assi}侵犯着${name}的嘴巴、` : `${assi}在蹂躏着嘴巴…`;
    }
    return '';
  };
  if (era_flag.assiplay) {
    era.print(site('master', t40, true) + site('assi', t41, false));
  } else {
    era.print(site('assi', t41, true) + site('master', t40, false));
  }
  return 0;
});

train_message_b_family.register(65, async () => {
  era.print(
    `${chara_callname(era_flag.target)}抱着${chara_callname(era_flag.player)}…`,
  );
  return 0;
});

train_message_b_family.register(66, async () => {
  era.print(
    `${chara_callname(era_flag.target)}同时侍奉着${chara_callname(MASTER)}和${chara_callname(era_flag.player)}的阴茎…`,
  );
  return 0;
});

train_message_b_family.register(68, async () => {
  const target = era_flag.target;
  const assi = era_flag.assi;
  const master = chara_callname(MASTER);
  const t_name = chara_callname(target);
  const a_name = chara_callname(assi);
  const t_love = tal(target, 85) || tal(target, 76);
  const a_love = tal(assi, 85) || tal(assi, 76);
  if (t_love && a_love) {
    era.print(
      `${t_name}和${a_name}两人一起用舌头、仔细积极地侍奉着${master}的阴茎。`,
    );
  } else {
    era.print(`${t_name}和${a_name}两人一起、用舌头侍奉着${master}的阴茎…`);
  }
  return 0;
});

train_message_b_family.register(69, async () => {
  const other = tequip(era_flag.target, 89)
    ? '狗'
    : chara_callname(era_flag.player);
  era.print(
    `${chara_callname(era_flag.target)}和${other}相互舔舐着彼此的性器…`,
  );
  return 0;
});

train_message_b_family.register(70, async () => {
  const target = era_flag.target;
  const assi = era_flag.assi;
  const prefix = `${chara_callname(target)}和${chara_callname(assi)}`;
  if (tal(target, 263) && tal(assi, 263)) {
    era.print(
      `${prefix}抱着${chara_callname(MASTER)}的阴茎、两人一起用全身侍奉着…`,
    );
  } else {
    era.print(
      `${prefix} 用两人的性器夹紧了${chara_callname(MASTER)}的阴茎、一起动着腰、使劲摩擦着…`,
    );
  }
  return 0;
});

train_message_b_family.register(71, async () => {
  era.print(
    `${chara_callname(era_flag.target)}和${chara_callname(era_flag.assi)}用两人的乳房夹紧了${chara_callname(MASTER)}的阴茎、一起挺着胸、使劲摩擦着…`,
  );
  return 0;
});

train_message_b_family.register(72, async () => {
  const target = era_flag.target;
  const name = chara_callname(target);
  let head;
  if (tequip(target, 44)) {
    head = `${name}被绑了起来并强制分开了双腿、`;
  } else if (abl(target, 10) >= 3 && abl(target, 17) >= 4) {
    head = `${name}求欢似得地主动打开双腿、阴部暴露着的`;
  } else {
    head = `双腿大开的${name}那`;
  }
  const dense = tal(target, 310) > 400 ? '任意生长的浓密' : '';
  era.print(`${head}${dense}阴毛被${chara_callname(era_flag.player)}刮了干净…`);
  return 0;
});

train_message_b_family.register(67, async () => 0);
train_message_b_family.register(73, async () => 0);

// ============================================================
// @TRAIN_MESSAGE_A（62/68/69/72 有源侧分支；其余显式无操作）
// ============================================================

for (const id of [60, 61, 63, 64, 65, 66, 67, 70, 71, 73]) {
  train_message_a_family.register(id, async () => 0);
}

train_message_a_family.register(62, async () => {
  const flag = era.get('tflag:7') || 0;
  if (!flag) return 0;
  const target = chara_callname(era_flag.target);
  const assi = chara_callname(era_flag.assi);
  if (flag === 1) {
    era.print(`当着${target}的面、在${assi}的体内深处射出了精液…`);
  } else if (flag === 2) {
    era.print(`当着${target}的面、在${assi}的体内深处射满了精液、溢出来了……`);
  }
  if (
    (abl(era_flag.target, 11) > 3 || abl(era_flag.target, 32) > 2) &&
    (era.get('tflag:899') || 0) <= 1
  ) {
    era.print(`${target}用羡慕的眼光凝视着${assi}被内射的样子…`);
  }
  return 0;
});

train_message_a_family.register(68, async () => {
  const flag = era.get('tflag:0') || 0;
  const target = chara_callname(era_flag.target);
  const assi = chara_callname(era_flag.assi);
  if (flag === 1) era.print(`${target}和${assi}用嘴接住精液…`);
  else if (flag === 2) era.print(`大量的精液倾泻在${target}和${assi}的脸上…`);
  return 0;
});

train_message_a_family.register(69, async () => {
  const flag = era.get('tflag:0') || 0;
  const target = chara_callname(era_flag.target);
  if (flag === 1) {
    era.print(`${target}身体颤抖着、承受来自阴部的刺激、同时把精液咽下…`);
  } else if (flag === 2) {
    era.print(`${target}因阴部的刺激全身颤抖着、然后把精液喝下去了…`);
  }
  return 0;
});

train_message_a_family.register(72, async () => {
  if ((era.get('tflag:899') || 0) > 1) return 0;
  const target = era_flag.target;
  const part = tal(target, 121) || tal(target, 122) ? '阴茎、' : '阴部、';
  const mood = abl(target, 17) >= 3 ? '得意地' : '凄凉地';
  era.print(
    `像婴儿一样裸露出自己的${part}${chara_callname(target)}${mood}看着自己的下体…`,
  );
  return 0;
});

// ============================================================
// 注册
// ============================================================

com_able_family.register(60, able60);
com_able_family.register(61, able61);
com_able_family.register(62, able62);
com_able_family.register(63, able63);
com_able_family.register(64, able64);
com_able_family.register(65, able65);
com_able_family.register(66, able66);
com_able_family.register(68, able68);
com_able_family.register(69, able69);
com_able_family.register(70, able70);
com_able_family.register(71, able71);
com_able_family.register(72, able72);
com_able_family.register(73, able73);

com_family.register(60, com60);
com_family.register(61, com61);
com_family.register(62, com62);
com_family.register(63, com63);
com_family.register(64, com64);
com_family.register(65, com65);
com_family.register(66, com66);
com_family.register(67, com67);
com_family.register(68, com68);
com_family.register(69, com69);
com_family.register(70, com70);
com_family.register(71, com71);
com_family.register(72, com72);
com_family.register(73, com73);

module.exports = {
  STUBBED_CALLS,
  able60,
  able61,
  able62,
  able63,
  able64,
  able65,
  able66,
  able68,
  able69,
  able70,
  able71,
  able72,
  able73,
  com60,
  com61,
  com62,
  com63,
  com64,
  com65,
  com66,
  com67,
  com68,
  com69,
  com70,
  com71,
  com72,
  com73,
  incest,
  times,
};
