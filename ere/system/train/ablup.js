/**
 * @file 能力 ABL 的升级判定与交互（ablup0～ablup17 见 issue #464/#465，
 * ablup20～23 与 ablup30～33 见 issue #466，ablup37/39/40/99/100 与
 * decide_ablup/auto_ablup/userablup 本体见 issue #467）。
 *
 * 结构（issue #796）：每个能力是一份《规格》（ABLUP_SPECS），字段是梯子
 * （tracks）、异常经验等附加量（extra）、素质倍率链（mults）、门槛位
 * （shared_gates 与 options.gates）、按钮与成功文案（label/success）、重试
 * 策略（intro 只在循环外画一次 / rows 每轮重画）与干跑产物（判定由位推出，
 * core 是同一份扣减的干跑）。「建梯子 → 乘素质 → 置位 → 进循环」的顺序只写在
 * run_ablup 一处，加一个能力不再需要抄一份邻函数。数值、编号与文案一律照抄
 * 原实现，不做「统一写法」的合并——下面三条差异就是照抄下来的一部分。
 *
 * 调用方: ere/system/train/juel-check.js 的 JUEL_CHECK 输入分发。
 * ablup0～4（#464）、10～17（#465）、20～23/30～33（#466）、
 * 37/39/40/99/100（#467）均已接入分发；ablup5～9 不接入——Abl.yml
 * 没有能力编号 5～9 的名字条目，juel-check.js 的 ABLUP_IDS 也从未
 * 包含 5～9，没有任何菜单能选中它们；ablup5～9 因此保留为独立导出，
 * 不接入 juel-check.js 的分发，行为完整但从任何玩家可达路径均无法调用
 * （自初始实现起即确定的不可达状态，不是后续改动引入的缺陷）。
 *
 * 输出行模型：era.print/printButton 每次调用各自独占一行，没有「不换行、
 * 续写同一行」的等价物。需要多次小段输出拼成一整行时，先拼好整串再
 * 一次 era.print 输出；只要换行、不带内容时用 era.println()。
 *
 * 输入-UI 模型：printButton 的输入模型只登记本轮渲染过的快捷键，
 * era.input() 结构上不可能收到其他值（issue #130，测试夹具同款校验）。
 * run_ablup 仍保留越界分支，写法与既有 com-colosseum.js 的同类分支一致
 * （引擎层已经拒收代位，分支是防御性保留，不是必要条件）。
 *
 * 成功购买的提升文案不统一措辞：ablup0～3 用「{name}变为LV{X}。」，
 * ablup7 用「{name}的等级提升到{X}级了。」；ablup4/5/6/8/9 同样用
 * 「变为LV{X}。」——按 issue #60 译成简体时是整句译文替换，不是逐字
 * 机械转换，lang-table.js 因此未收录这个词条。规格里的 success 逐条写原文，
 * 不做统一。
 *
 * 重试路径的输出收窄，有意为之：ablup0～5、7～9 的「条件不满足」分支
 * 用 continue 重走循环，分隔线与开头两行说明文字在 for(;;) 循环外、
 * 只执行一次，continue 时只重渲按钮行本身，不重打说明文字。ablup6
 * 方向相反：era.printButton 的注册在每次 era.input() 之后被引擎清空
 * （returnFromButton 置 rule=[]），每次 continue 都必须重渲染按钮行，
 * 连循环内的门槛行等说明也一并重打——这一方向由引擎强制，不能收窄成
 * 「什么都不重打」。两个方向都只影响重试时的重复文字，不改变任何判定
 * 与数值；规格里就是「写在 intro 还是 rows」的区别，逐条按原实现分配。
 */
/* eslint-disable no-irregular-whitespace -- ablup2/ablup3 的经验门槛行用全角空格
   对齐，全角空格是输出内容的一部分，不是缩进 */

const era = require('#/era-electron');

/**
 * 放弃支的返回哨兵：分发方（能力提升商店 page-ability-up.js）据此跳过
 * 换屏前的等键。调教侧分发（juel-check.js 的 run_juel_check）不读返回值。
 */
const HANDLER_QUIET = 'quiet';
const { EXPLV } = require('#/era-utils/exp-level');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const era_modsave = require('#/era-utils/era-modsave');
// userablup 要调的两个检查（#462 实现，同域）
const {
  jujun_up_check,
  yokubo_up_check,
} = require('#/system/train/ability-check');
const { chara_callname } = require('#/utils/callname-utils');
const { NBSP } = require('#/utils/display-width'); // #577：对齐补位 NBSP 化
const { MASTER } = require('#/utils/master');
const { percent_trunc, times } = require('#/utils/numeric');

/**
 * ablup0～3 共用的可否状态文案。
 * arg=0:可、arg&1:点数不足、arg&2:经验不足、arg&4:能力不足
 */
function get_ablup_state(arg) {
  return status_of(arg, STATE_PARTS);
}

/** ablup0～3 共用的可否状态文案的位表（文本自带尾随空格，逐字保留） */
const STATE_PARTS = [
  [1, '点数不足 '],
  [2, '经验不足 '],
  [4, '能力不足'],
];

/**
 * 可否文案：`parts` 是 [位, 文本] 序列，位全空时统一为 'ＯＫ'。
 * 各能力的位表不同（尾随空格、词条都不一样），逐字声明，不合并措辞。
 * @param {number} bits 可否位
 * @param {[number, string][]} parts 位表
 * @returns {string}
 */
function status_of(bits, parts) {
  if (bits === 0) return 'ＯＫ';
  let text = '';
  for (const [bit, label] of parts) if (bits & bit) text += label;
  return text;
}

/** 未渲染选项的位哨兵（引擎层拒收代位，见文件头） */
const HIDDEN_BIT = 256;

/**
 * 等级所在的地址：能力默认写在 ABL:<id>（两段引用交给 ref_address 拼角色位）。
 * @param {object} spec 能力规格
 * @returns {[string, number]}
 */
const level_ref = (spec) => spec.level ?? ['abl', spec.id];

/**
 * 规格里的两段引用（['abl', 11]、['juel', 5]、['talent', 27]）→ 三段地址。
 * @param {[string, number]} ref 两段引用（表名与序号）
 * @param {number} cid 角色 ID
 * @returns {string}
 */
function ref_address(ref, cid) {
  const [table, index] = ref;
  return `${table}:${cid}:${index}`;
}

/**
 * 一条轨道的取值：lv 落在分档表里就取分档值；超出分档长度后按复利段
 * 逐级截断——每级的结果是下一级的基数，不能合并成一次幂运算。
 * @param {{table: number[], bands?: {from: number, to?: number, base: number, rate: number}[]}} track
 * @param {number} lv 当前等级
 * @returns {number}
 */
function track_value(track, lv) {
  if (lv < track.table.length) return track.table[lv];
  const band = track.bands.find(
    (b) => lv >= b.from && (b.to === undefined || lv <= b.to),
  );
  let value = band.base;
  for (let n = band.from; n <= lv; n += 1) {
    value = percent_trunc(value, band.rate);
  }
  return value;
}

/**
 * 求值的上下文：角色、当前等级、素质读取，以及片段式的封锁部位计数。
 * @param {object} spec 能力规格
 * @param {number} cid 角色 ID
 * @returns {object}
 */
function make_context(spec, cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const level = level_ref(spec);
  let seal = 0;
  for (const id of spec.seal_talents ?? []) if (talent(id) & 2) seal += 1;
  return {
    cid,
    talent,
    seal,
    read: (ref) => era.get(ref_address(ref, cid)) || 0,
    lv: era.get(ref_address(level, cid)) || 0,
  };
}

/**
 * 倍率条目/拦截条目的触发条件：talent 为真、or 里任一为真、lv 相等或落
 * 在区间内；都不写即恒真。
 * @param {object} cond 条件字段
 * @param {object} ctx 上下文
 * @returns {boolean}
 */
function cond_hit(cond, ctx) {
  if (cond.talent !== undefined && !ctx.talent(cond.talent)) return false;
  if (cond.or !== undefined && !cond.or.some((id) => ctx.talent(id))) {
    return false;
  }
  if (cond.lv !== undefined && ctx.lv !== cond.lv) return false;
  if (cond.lv_min !== undefined && ctx.lv < cond.lv_min) return false;
  if (cond.lv_max !== undefined && ctx.lv > cond.lv_max) return false;
  if (cond.when !== undefined && !cond.when(ctx)) return false;
  return true;
}

/**
 * 一条倍率条目对轨道的作用：factor 是乘算，share 是按封锁部位数收窄
 * （trunc(值 ×(num-seal)/denom)，先乘后除、不能用倍率折成小数）。
 * @param {object} mult 倍率条目
 * @param {Record<string, number>} values 轨道值
 * @param {object} ctx 上下文
 */
function apply_mult(mult, values, ctx) {
  for (const [name, factor] of Object.entries(mult.factor ?? {})) {
    values[name] = times(values[name], factor);
  }
  for (const [name, share] of Object.entries(mult.share ?? {})) {
    const numerator = share.num - ctx.seal;
    values[name] = Math.trunc((values[name] * numerator) / share.denom);
  }
}

/**
 * 素质倍率链：按声明顺序逐条乘算（顺序影响每次截断的结果），每条只落在
 * factor/share 点名的轨道上；else 是同一处 if/else 的另一个分支，不进
 * 父条目的 lv 条件（原实现的 else-if 各自重写条件）。
 * @param {object[]} mults 倍率链
 * @param {Record<string, number>} values 轨道值
 * @param {object} ctx 上下文
 */
function scale_tracks(mults, values, ctx) {
  for (const mult of mults) {
    if (cond_hit(mult, ctx)) {
      apply_mult(mult, values, ctx);
    } else if (mult.else !== undefined) {
      scale_tracks([mult.else], values, ctx);
    }
  }
}

/**
 * 门槛比较的右值：数字＝固定阈值；'lv+N'＝本次升级后的等级；轨道名＝同名
 * 轨道的需求；'a*3'／'c/2'＝轨道的倍数与整除（ablup30 一族用）。
 * @param {number|string} below 右值写法
 * @param {Record<string, number>} state 求值结果
 * @param {object} ctx 上下文
 * @returns {number}
 */
function below_value(below, state, ctx) {
  if (typeof below === 'number') return below;
  const level = /^lv\+(\d+)$/.exec(below);
  if (level) return ctx.lv + Number(level[1]);
  const scaled = /^([a-z]+)\*(\d+)$/.exec(below);
  if (scaled) return state[scaled[1]] * Number(scaled[2]);
  const halved = /^([a-z]+)\/2$/.exec(below);
  if (halved) return Math.floor(state[halved[1]] / 2);
  return state[below];
}

/**
 * 一条门槛是否命中：读 ref 的当前值，低于 below 即给位。
 * @param {object} gate 门槛条目
 * @param {Record<string, number>} state 求值结果
 * @param {object} ctx 上下文
 * @returns {boolean}
 */
function gate_hit(gate, state, ctx) {
  if (gate.when !== undefined && !gate.when(state, ctx)) return false;
  if (gate.ref === undefined) return true; // 只写 when 的门槛：条件自成判定
  return ctx.read(gate.ref) < below_value(gate.below, state, ctx);
}

/** 可否位的字段名：按选项顺序 i/j/k/l，与各能力的返回值同名 */
const BIT_NAMES = ['i', 'j', 'k', 'l'];

/**
 * 一个选项的可否位：自己的门槛，加上作用于多个选项的共享门槛。选项未渲染
 * 时位取哨兵 256——原实现用它区分「隐藏」与「条件不足」；
 * hide_overwrites_shared 为假的能力把共享位并进哨兵（ablup10/16 的段序
 * 如此），hide 为 'keep' 表示完全不取哨兵、只留共享位（ablup8 的 [0] 轨）。
 * @param {object} spec 能力规格
 * @param {object} opt 选项
 * @param {Record<string, number>} state 求值结果
 * @param {object} ctx 上下文
 * @returns {number}
 */
function option_bits(spec, opt, state, ctx) {
  let shared = 0;
  for (const gate of spec.shared_gates ?? []) {
    if (gate.options !== undefined && !gate.options.includes(opt.id)) continue;
    if (gate_hit(gate, state, ctx)) shared |= gate.bit;
  }
  if (opt.need !== undefined && !(state[opt.need] > 0)) {
    if (opt.hide === 'keep') return shared;
    const sentinel = opt.hide ?? HIDDEN_BIT;
    return spec.hide_overwrites_shared === false ? sentinel | shared : sentinel;
  }
  let bits = shared;
  for (const gate of opt.gates ?? []) {
    if (gate_hit(gate, state, ctx)) bits |= gate.bit;
  }
  return bits;
}

/**
 * 入口拦截：按声明顺序求值，命中即返回该条目。silent 的条目在分隔线之前
 * 求值（ablup2/22/23 的男人却下不输出任何内容），dry_skip 的条目在干跑下
 * 不生效（ablup16 的素质把关只在主流程拦）。
 * @param {object} spec 能力规格
 * @param {object} ctx 上下文
 * @param {boolean|undefined} silent 只查指定段落（undefined＝全查）
 * @param {string} [mode] 干跑模式
 * @returns {object|undefined}
 */
function first_blocked(spec, ctx, silent, mode) {
  for (const entry of spec.blocked ?? []) {
    if (silent !== undefined && Boolean(entry.silent) !== silent) continue;
    if (entry.dry_skip && mode) continue;
    if (entry.when(ctx)) return entry;
  }
  return undefined;
}

/**
 * 拦截文案：逐行输出，wait 决定收尾方式（缺省 printAndWait 等一次按键）。
 * @param {object} entry 拦截条目
 * @param {object} ctx 上下文
 */
async function emit_blocked(entry, ctx) {
  const raw =
    typeof entry.lines === 'function' ? entry.lines(ctx) : entry.lines;
  const list = raw === undefined ? [] : Array.isArray(raw) ? raw : [raw];
  for (const item of list) {
    const line = typeof item === 'string' ? { text: item } : item;
    const wait = line.wait ?? 'printAndWait';
    if (wait === 'printAndWait') await era.printAndWait(line.text);
    else if (wait === 'anykey') {
      era.print(line.text);
      await era.waitAnyKey();
    } else era.print(line.text);
  }
}

/**
 * 求值：入口拦截 → 梯子 → 异常经验等附加量（倍率链会乘到它们）→ 素质
 * 倍率 → 下限 → 读当前值 → 可否位。
 * @param {object} spec 能力规格
 * @param {number} cid 角色 ID
 * @returns {object}
 */
function evaluate_ablup(spec, cid) {
  const ctx = make_context(spec, cid);
  const blocked = first_blocked(spec, ctx);
  if (blocked !== undefined) return { blocked: blocked.reason };
  const values = {};
  for (const [name, track] of Object.entries(spec.tracks ?? {})) {
    values[name] = track_value(track, ctx.lv);
  }
  if (spec.extra !== undefined) Object.assign(values, spec.extra(ctx));
  scale_tracks(spec.mults ?? [], values, ctx);
  for (const floor of spec.floors ?? []) {
    // 纯字符串＝无条件设底；{name, when} 用于组合上限触发时不设底（ablup12/15）
    const name = typeof floor === 'string' ? floor : floor.name;
    if (typeof floor !== 'string' && !floor.when(values, ctx)) continue;
    if (values[name] < 1) values[name] = 1;
  }
  const state = { blocked: null, lv: ctx.lv, ...values };
  for (const [name, ref] of Object.entries(spec.reads ?? {})) {
    state[name] = ctx.read(ref);
  }
  spec.options?.forEach((opt, index) => {
    state[opt.bit ?? BIT_NAMES[index]] = option_bits(spec, opt, state, ctx);
  });
  return state;
}

/**
 * 干跑判定：任一选项的位全空即可提升（哨兵 256 不是 0）。
 * @param {object} spec 能力规格
 * @param {number} cid 角色 ID
 * @returns {number} 1 / 0
 */
function decide_value(spec, cid) {
  const state = evaluate_ablup(spec, cid);
  if (state.blocked !== null) return 0;
  const usable = (spec.options ?? []).some(
    (opt, index) => state[opt.bit ?? BIT_NAMES[index]] === 0,
  );
  return usable ? 1 : 0;
}

/**
 * 扣减：金额写法同门槛右值（轨道名、'a*3'、'c/2'）。
 * @param {object} opt 选项
 * @param {Record<string, number>} state 求值结果
 * @param {object} ctx 上下文
 */
function pay(opt, state, ctx) {
  for (const [ref, amount] of opt.deduct ?? []) {
    era.add(ref_address(ref, ctx.cid), -below_value(amount, state, ctx));
  }
}

/**
 * 干跑升级：等级照升，第一条可用的选项照扣（原 core_ablupN 同此）。
 * @param {object} spec 能力规格
 * @param {Record<string, number>} state 求值结果
 * @param {object} ctx 上下文
 */
function core_apply(spec, state, ctx) {
  era.add(ref_address(level_ref(spec), ctx.cid), spec.level_delta ?? 1);
  if (state.blocked !== null) return;
  const index = spec.options.findIndex(
    (opt, i) => state[opt.bit ?? BIT_NAMES[i]] === 0,
  );
  if (index >= 0) pay(spec.options[index], state, ctx);
}

/**
 * 干跑升级的出口：求值 → 升级与扣减 → 恒 0（auto_ablup_core 判 >= 0 才
 * 打印，原 core_ablupN 的返回值语义）。
 * @param {object} spec 能力规格
 * @param {number} cid 角色 ID
 * @returns {number} 0
 */
function core_value(spec, cid) {
  core_apply(spec, evaluate_ablup(spec, cid), make_context(spec, cid));
  return 0;
}

/**
 * 一个选项的按钮与其附属信息行（附属行只在选项渲染时画）。
 * @param {object} opt 选项
 * @param {Record<string, number>} state 求值结果
 * @param {object} ctx 上下文
 * @returns {boolean} 是否渲染了该选项
 */
function render_option(opt, state, ctx) {
  if (opt.need !== undefined && !(state[opt.need] > 0)) return false;
  era.printButton(opt.label(state, ctx), opt.id);
  for (const line of opt.info?.(state, ctx) ?? []) era.print(line);
  return true;
}

/**
 * 升级：写等级、可选的附带动作（ablup12 的自我训练扣钱只在主流程）、扣减、
 * 成功文案。
 * @param {object} spec 能力规格
 * @param {object} opt 命中的选项
 * @param {Record<string, number>} state 求值结果
 * @param {object} ctx 上下文
 */
async function upgrade(spec, opt, state, ctx) {
  const new_lv = era.add(
    ref_address(level_ref(spec), ctx.cid),
    spec.level_delta ?? 1,
  );
  spec.on_success?.(state, ctx, opt);
  pay(opt, state, ctx);
  const text = spec.success(new_lv, state, ctx);
  if (spec.success_wait) await era.printAndWait(text);
  else era.print(text);
}

/**
 * 能力的循环骨架：拦截 → 说明 → 评估 → 画行与按钮 → 输入分发。
 * 说明行写在 intro（循环外，只画一次）还是 rows（每轮重画）由规格决定，
 * 两个方向都按原实现保留；干跑模式在画行之前返回判定/升级产物。
 * @param {object} spec 能力规格
 * @param {number} cid 角色 ID
 * @param {string} [mode] 'decide' | 'core'（干跑，不输出）
 * @returns {Promise<undefined|string|object|number>}
 */
async function run_ablup(spec, cid, mode) {
  const ctx = make_context(spec, cid);
  if (first_blocked(spec, ctx, true, mode) !== undefined) return undefined;
  if (!mode) {
    if (spec.line !== false) era.drawLine(); // ablup40 没有分隔线，按原样关掉
    spec.intro?.(ctx);
  }
  const blocked = first_blocked(spec, ctx, false, mode);
  if (blocked !== undefined) {
    if (!mode) await emit_blocked(blocked, ctx);
    return undefined;
  }

  for (;;) {
    const state = evaluate_ablup(spec, cid);
    if (mode === 'decide') {
      return spec.dry_decide === undefined
        ? state
        : spec.dry_decide(state, ctx);
    }
    if (mode === 'core') {
      core_apply(spec, state, ctx);
      return 0;
    }

    spec.rows?.(state, ctx);
    for (const opt of spec.options) render_option(opt, state, ctx);
    era.printButton(spec.stop ?? '- 停止', 100);

    const result = await era.input();
    if (result === 100) {
      // 放弃返回：最后一次动作是输入、其后无打印，返回哨兵让分发方
      // 不再等键（否则回显会让等键真等一次，玩家多按键）
      return HANDLER_QUIET;
    }
    const opt = spec.options.find((o) => o.id === result);
    if (opt === undefined) continue; // 引擎层拒收代位，防御性保留（issue #130）
    const bits = state[opt.bit ?? BIT_NAMES[spec.options.indexOf(opt)]];
    if (opt.silent_hidden && bits === HIDDEN_BIT) continue;
    if (bits !== 0) {
      era.print(opt.blocked_text ?? '未满足条件');
      continue;
    }
    await upgrade(spec, opt, state, ctx);
    return undefined;
  }
}

/**
 * ablup0 的部位称呼：男人显示"阴茎"、扶她显示"阴茎(阴蒂)"，其余显示"阴蒂"。
 * @param {object} ctx 上下文
 * @returns {string}
 */
function clitoris_part(ctx) {
  if (ctx.talent(122)) return '阴茎';
  return ctx.talent(121) ? '阴茎(阴蒂)' : '阴蒂';
}

/**
 * 位表：点数不足（带尾随空格）+ 经验不足（不带）——ablup4/11 同款，与共用位表
 * （两者都带空格）相反；位 2 在 ablup4/11 恒不置位，这一支只为照抄原样保留。
 */
const POINT_EXP_PARTS = [
  [1, '点数不足 '],
  [2, '经验不足'],
];

/** 位表：点数不足（带空格）+ 经验不足（不带）+ 能力不足（带空格），ablup6/8/9/20/40 同款 */
const POINT_EXP_ABILITY_PARTS = [
  [1, '点数不足 '],
  [2, '经验不足'],
  [4, '能力不足 '],
];

/** 位表：三个位都带尾随空格，ablup7 独有 */
const SPACED_PARTS = [
  [1, '点数不足 '],
  [2, '经验不足 '],
  [4, '能力不足 '],
];

/** ablup4 的按钮状态文案 */
const ablup4_status = (bits) => status_of(bits, POINT_EXP_PARTS);

/** ablup12 的位表：金钱不足带尾随制表符（有意保留） */
const ABLUP12_PARTS = [
  [1, '点数不足 '],
  [2, '人数不足 '], // 魔王技巧超过爱或淫乱人数+1 的自我训练上限，与经验无关
  [4, '金钱不足\t'],
];

/**
 * 按另一项能力等级的分级折扣（不是素质）：`steps` 是 [上界, 倍率] 的升序表，
 * 取第一个「该能力等级 < 上界」的倍率，都不命中用末项。ablup13 按侍奉精神、
 * ablup14 按性交中毒，档位相同、来源与作用轨道不同。
 * @param {string} ref 另一项能力的两段引用
 * @param {string[]} names 受影响的轨道名
 * @param {[number, number][]} steps 升序档位
 * @returns {object}
 */
function grade_mult(ref, names, steps) {
  const factors = (factor) =>
    Object.fromEntries(names.map((name) => [name, factor]));
  const build = (index) =>
    index === steps.length - 1
      ? { factor: factors(steps[index][1]) }
      : {
          when: (c) => c.read(ref) < steps[index][0],
          factor: factors(steps[index][1]),
          else: build(index + 1),
        };
  return build(0);
}

/** ablup13/14 共用的分级档位：3/6/8/10 以下各一档，末项是兜底 */
const GRADE_STEPS = [
  [3, 1.0],
  [6, 0.95],
  [8, 0.9],
  [10, 0.85],
  [0, 0.8],
];

// ════ 各能力的规格 ════
//
// 一条规格 = 梯子（tracks）＋ 素质倍率链（mults）＋ 门槛位（shared_gates 与
// options.gates）＋ 按钮与成功文案（label / success）＋ 重试策略（intro 只在
// 循环外画一次、rows 每轮重画）＋ 干跑产物（判定由位推出，core 是同一份扣减
// 的干跑）。数值、编号、文案一律照抄原实现，不合并成「统一写法」。
/**
 * ablup0～3 共用的 a 轨道（点数需求）：分档 + 复利段。四个能力的梯子逐字
 * 相同；Lv10 起每级各自截断后才作为下一级的基数。
 */
const SENSE_LADDER_A = {
  table: [1, 20, 400, 8000, 20000, 40000, 60000, 90000, 120000, 180000],
  bands: [
    { from: 10, to: 14, base: 180000, rate: 125 },
    { from: 15, to: 19, base: 362000, rate: 120 },
    { from: 20, base: 583000, rate: 115 },
  ],
};

/**
 * ablup2/3 共用的 b 轨道（经验需求）：复利率与 a 不对称，三段的基点与比率
 * 各自独立。
 */
const SENSE_LADDER_B = {
  table: [2, 10, 30, 75, 150, 180, 250, 350, 500, 600],
  bands: [
    { from: 10, to: 14, base: 600, rate: 115 },
    { from: 15, to: 19, base: 966, rate: 120 },
    { from: 20, base: 1942, rate: 125 },
  ],
};

/**
 * ablup0/1 共用的「其他部位封锁」折扣：三档区间各自独立，分母都是 15。
 */
const SEAL_DISCOUNT_A = {
  lv_min: 6,
  lv_max: 10,
  when: (c) => c.seal > 0,
  share: { a: { num: 15, denom: 15 } },
  else: {
    lv_max: 15,
    when: (c) => c.seal > 1,
    share: { a: { num: 16, denom: 15 } },
    else: {
      lv_max: 20,
      when: (c) => c.seal > 2,
      share: { a: { num: 17, denom: 15 } },
    },
  },
};

/**
 * ablup2/3 共用的封锁折扣：a 的分母 15、b 的分母 20，分子与分母都不对称。
 */
const SEAL_DISCOUNT_AB = {
  lv_min: 6,
  lv_max: 10,
  when: (c) => c.seal > 0,
  share: { a: { num: 15, denom: 15 }, b: { num: 20, denom: 20 } },
  else: {
    lv_max: 15,
    when: (c) => c.seal > 1,
    share: { a: { num: 16, denom: 15 }, b: { num: 21, denom: 20 } },
    else: {
      lv_max: 20,
      when: (c) => c.seal > 2,
      share: { a: { num: 17, denom: 15 }, b: { num: 22, denom: 20 } },
    },
  },
};

/**
 * 戒备森严的分级加成：`steps` 是 [等级, 倍率] 的升序表（末项的等级是「以上」），
 * `names` 是受影响的轨道名。ablup0～3 从 Lv4 起（三级），ablup16 起从 Lv3 起
 * （四级）——档位不同，别拿一处的表套另一处。
 * @param {string[]} names 轨道名
 * @param {[number, number][]} steps 等级与倍率
 * @returns {object[]}
 */
function guard_mults(names, steps) {
  const factors = (factor) =>
    Object.fromEntries(names.map((name) => [name, factor]));
  return steps.map(([lv, factor], index) =>
    index === steps.length - 1
      ? { talent: 27, lv_min: lv, factor: factors(factor) }
      : { talent: 27, lv, factor: factors(factor) },
  );
}

/** ablup0～3 的戒备森严档位：Lv4→2.0、Lv5→2.5、Lv6 以上→3.0 */
const GUARD_FROM_4 = [
  [4, 2.0],
  [5, 2.5],
  [6, 3.0],
];

/** ablup16 以后的戒备森严档位：Lv3→1.5、Lv4→2.0、Lv5→2.5、Lv6 以上→3.0 */
const GUARD_FROM_3 = [
  [3, 1.5],
  [4, 2.0],
  [5, 2.5],
  [6, 3.0],
];

const ABLUP_SPECS = {
  0: {
    id: 0,
    // 阴蒂感觉。a＝阴核点数需求；梯子按 lv 分段，Lv10 起进入复利区间
    tracks: { a: SENSE_LADDER_A },
    seal_talents: [103, 105, 107], // 阴蒂以外三个部位的感觉封锁数
    blocked: [
      {
        reason: 'talent',
        when: (c) => c.lv >= 5 && c.talent(74) === 0,
        lines: '需要特殊素质才能继续提升',
      },
      {
        reason: 'locked',
        when: (c) => (c.talent(101) & 2) !== 0,
        lines: (c) => `${clitoris_part(c)}感觉已经被封锁了`,
      },
      {
        reason: 'max',
        when: (c) => c.lv >= c.seal * 5 + 10,
        lines: '已达最高级',
      },
    ],
    mults: [
      ...guard_mults(['a'], GUARD_FROM_4), // 戒备森严：仅 Lv4/5/>=6 三级加成
      { talent: 101, factor: { a: 1.2 } }, // 阴蒂钝感
      { talent: 102, factor: { a: 0.8 } }, // 阴蒂敏感
      SEAL_DISCOUNT_A, // 其他部位封锁折扣：三档区间各自独立，分母都是 15
      { talent: 76, factor: { a: 0.8 } }, // 淫乱
      { talent: 74, factor: { a: 0.8 } }, // 自慰狂
    ],
    floors: ['a'], // 最低 1 点
    reads: { juel: ['juel', 0] },
    options: [
      {
        id: 0,
        gates: [{ ref: ['juel', 0], below: 'a', bit: 1 }],
        deduct: [[['juel', 0], 'a']],
        label: (s, c) =>
          `- ${c.talent(122) ? '阴茎' : era.get('palamname:0')}点数×${s.juel}/${s.a} ……${get_ablup_state(s.i)}`,
      },
    ],
    // 部位称呼与说明文字都在循环外，只画一次（重试只重画按钮行）
    intro: (c) => {
      era.print(`${clitoris_part(c)}的感度提升了。`);
      era.print(
        `${clitoris_part(c)}感觉越高，越容易在舔舐、自慰等行为得到更大的快感。`,
      );
      era.drawLine();
    },
    success: (lv) => `${era.get('ablname:0')}变为LV${lv}。`, // （不等待）
  },
  1: {
    id: 1,
    // 乳房感觉。梯子与 ablup0 同表；素质链换成乳房一组的增减
    tracks: { a: SENSE_LADDER_A },
    seal_talents: [101, 103, 105],
    blocked: [
      {
        reason: 'talent',
        when: (c) => c.lv >= 5 && c.talent(78) === 0,
        lines: '需要特殊素质才能继续提升',
      },
      {
        reason: 'locked',
        when: (c) => (c.talent(107) & 2) !== 0,
        lines: '乳房感觉已经被封锁了',
      },
      {
        reason: 'max',
        when: (c) => c.lv >= c.seal * 5 + 10,
        lines: '已达最高级',
      },
    ],
    mults: [
      ...guard_mults(['a'], GUARD_FROM_4),
      { talent: 107, factor: { a: 1.2 } }, // B钝感
      { talent: 110, factor: { a: 1.1 } }, // 巨乳
      { talent: 114, factor: { a: 1.2 } }, // 爆乳
      { talent: 119, factor: { a: 1.3 } }, // 超乳
      { talent: 108, factor: { a: 0.8 } }, // B敏感
      SEAL_DISCOUNT_A,
      { talent: 76, factor: { a: 0.8 } }, // 淫乱
      { talent: 78, factor: { a: 0.8 } }, // 淫乳
      { talent: 109, factor: { a: 0.8 } }, // 贫乳
      { talent: 116, factor: { a: 0.65 } }, // 绝壁
    ],
    floors: ['a'],
    reads: { juel: ['juel', 14] },
    options: [
      {
        id: 0,
        gates: [{ ref: ['juel', 14], below: 'a', bit: 1 }],
        deduct: [[['juel', 14], 'a']],
        label: (s) =>
          `- ${era.get('palamname:14')}点数×${s.juel}/${s.a} ……${get_ablup_state(s.i)}`,
      },
    ],
    success: (lv) => `${era.get('ablname:1')}变为LV${lv}。`, // （不等待）
  },
  2: {
    id: 2,
    // 私处感觉。a＝私处点数需求、b＝私处经验需求，两条轨道的梯子与复利率不对称
    tracks: { a: SENSE_LADDER_A, b: SENSE_LADDER_B },
    seal_talents: [101, 105, 107],
    blocked: [
      // 男人在判定里同样直接拦下，且不输出任何内容（分隔线之前）
      { reason: 'male', when: (c) => c.talent(122) !== 0, silent: true },
      {
        reason: 'talent',
        when: (c) => c.lv >= 5 && c.talent(75) === 0,
        lines: '需要特殊素质才能继续提升',
      },
      {
        reason: 'locked',
        when: (c) => (c.talent(103) & 2) !== 0,
        lines: '私处感觉已经被封锁了',
      },
      {
        reason: 'max',
        when: (c) => c.lv >= c.seal * 5 + 10,
        lines: '已达最高级',
      },
    ],
    mults: [
      ...guard_mults(['a', 'b'], GUARD_FROM_4),
      { talent: 103, factor: { a: 1.2, b: 1.1 } }, // 私处钝感：a/b 加成率不同
      SEAL_DISCOUNT_AB,
      { talent: 76, factor: { a: 0.8, b: 0.8 } }, // 淫乱
      { talent: 75, factor: { a: 0.8, b: 0.8 } }, // 性爱狂
      { talent: 104, factor: { a: 0.8, b: 0.8 } }, // 私处敏感
    ],
    floors: ['a', 'b'],
    reads: { juel: ['juel', 1], exp: ['exp', 0] },
    options: [
      {
        id: 0,
        gates: [
          { ref: ['juel', 1], below: 'a', bit: 1 },
          { ref: ['exp', 0], below: 'b', bit: 2 },
        ],
        deduct: [[['juel', 1], 'a']],
        label: (s) =>
          `- ${era.get('palamname:1')}点数×${s.juel}/${s.a} ……${get_ablup_state(s.i)}`,
        // 经验需求行与按钮同轮重画
        info: (s) => [
          `${NBSP.repeat(6)}${era.get('expname:0')}　　${s.exp}/${s.b}`,
        ],
      },
    ],
    success: (lv) => `${era.get('ablname:2')}变为LV${lv}。`, // （不等待）
  },
  3: {
    id: 3,
    // 肛门感觉。与 ablup2 同形：a＝点数需求、b＝经验需求
    tracks: { a: SENSE_LADDER_A, b: SENSE_LADDER_B },
    seal_talents: [101, 103, 107],
    blocked: [
      {
        reason: 'talent',
        when: (c) => c.lv >= 5 && c.talent(77) === 0,
        lines: '需要特殊素质才能继续提升',
      },
      {
        reason: 'locked',
        when: (c) => (c.talent(105) & 2) !== 0,
        lines: '肛门感觉已经被封锁了',
      },
      {
        reason: 'max',
        when: (c) => c.lv >= c.seal * 5 + 10,
        lines: '已达最高级',
      },
    ],
    mults: [
      ...guard_mults(['a', 'b'], GUARD_FROM_4),
      { talent: 105, factor: { a: 1.2, b: 1.1 } }, // A钝感
      SEAL_DISCOUNT_AB,
      { talent: 76, factor: { a: 0.8, b: 0.8 } }, // 淫乱
      { talent: 77, factor: { a: 0.8, b: 0.8 } }, // 尻穴狂
      { talent: 106, factor: { a: 0.8, b: 0.8 } }, // A敏感
    ],
    floors: ['a', 'b'],
    reads: { juel: ['juel', 2], exp: ['exp', 1] },
    options: [
      {
        id: 0,
        gates: [
          { ref: ['juel', 2], below: 'a', bit: 1 },
          { ref: ['exp', 1], below: 'b', bit: 2 },
        ],
        deduct: [[['juel', 2], 'a']],
        label: (s) =>
          `- ${era.get('palamname:2')}点数×${s.juel}/${s.a} ……${get_ablup_state(s.i)}`,
        info: (s) => [
          `${NBSP.repeat(6)}${era.get('expname:1')}　　${s.exp}/${s.b}`,
        ],
      },
    ],
    success: (lv) => `${era.get('ablname:3')}变为LV${lv}。`, // （不等待）
  },
  4: {
    id: 4,
    // 局部感觉。梯子只有 5 级、无复利区间；Lv5 没有档位，直接判满
    tracks: { a: { table: [1, 50, 600, 7000, 45000] } },
    // Lv5 起无档位，判满；判定因 blocked 非空恒返回 0，满级行一律不打 `*`
    blocked: [{ reason: 'max', when: (c) => c.lv >= 5, lines: '已达到MAX。' }],
    mults: [
      // 戒备森严只在 Lv3→2.00、Lv4→3.00 两档
      { talent: 27, lv: 3, factor: { a: 2.0 } },
      { talent: 27, lv: 4, factor: { a: 3.0 } },
    ],
    reads: { juel: ['juel', 15] },
    options: [
      {
        id: 0,
        gates: [{ ref: ['juel', 15], below: 'a', bit: 1 }],
        deduct: [[['juel', 15], 'a']],
        // 无 JUEL 现值，只显示需求 a（与 ablup0～3 不同）
        label: (s) =>
          `- ${era.get('palamname:15')}点数×${s.a}……${ablup4_status(s.i)}`,
        blocked_text: '条件不足。',
      },
    ],
    stop: '- 放弃',
    success: (lv) => `${era.get('ablname:4')}变为LV${lv}。`, // （等待）
    success_wait: true,
  },
  10: {
    id: 10,
    // 顺从。a(恐怖 JUEL:10)/b(恭顺 JUEL:4)/c(欲情 JUEL:5)/d(屈服 JUEL:6)
    tracks: {
      a: { table: [10, 150, 1000, 3000, 8000, 12000, 25000, 0, 0, 0] },
      b: {
        table: [10, 100, 800, 3000, 5000, 10000, 20000, 40000, 80000, 150000],
      },
      c: { table: [300, 1000, 2000, 0, 0, 0, 0, 0, 0, 0] },
      d: { table: [200, 1200, 3000, 12000, 0, 0, 0, 0, 0, 0] },
    },
    extra: (c) => {
      // 异常经验：lv4→5 需 1 次、lv7→8 需 2 次，六项素质任一命中可免
      const exempt =
        c.talent(10) === 0 &&
        c.talent(13) === 0 &&
        c.talent(76) === 0 &&
        c.talent(73) === 0 &&
        c.talent(85) === 0 &&
        c.talent(86) === 0;
      if (exempt && c.lv === 4) return { e: 1 };
      if (exempt && c.lv === 7) return { e: 2 };
      return { e: 0 };
    },
    blocked: [
      {
        // 爱慕/盲从解锁
        reason: 'talent',
        when: (c) => c.lv >= 5 && c.talent(85) === 0 && c.talent(86) === 0,
        lines: '需要特殊素质才能继续提升',
      },
      { reason: 'max', when: (c) => c.lv >= 10, lines: '已达最高级' },
    ],
    mults: [
      { talent: 10, factor: { a: 0.5, b: 0.9, d: 0.9 } }, // 胆怯
      { talent: 11, factor: { a: 2.0, b: 1.5, c: 1.2, d: 1.5 } }, // 反抗心
      { talent: 12, factor: { a: 3.0, b: 1.5, c: 1.2, d: 1.5 } }, // 刚强
      { talent: 13, factor: { b: 0.8, d: 0.9 } }, // 坦率
      { talent: 16, factor: { a: 1.2, b: 1.5, d: 1.2 } }, // 嚣张
      {
        talent: 15, // 高姿态
        factor: { a: 1.2, b: 1.5, d: 2.0 },
        else: { talent: 17, factor: { b: 0.8, d: 0.8 } }, // 低姿态
      },
      {
        talent: 32, // 压抑
        factor: { a: 1.2, b: 1.2, c: 2.0, d: 1.2 },
        else: { talent: 33, factor: { c: 0.5 } }, // 开放
      },
      { talent: 34, factor: { a: 1.5, b: 1.5, c: 2.0, d: 2.0 } }, // 抵抗
      { talent: 76, factor: { c: 0.5 } }, // 淫乱
      { talent: 85, factor: { b: 0.75 } }, // 爱慕
      { talent: 86, factor: { b: 0.2 } }, // 盲从
      { talent: 84, factor: { b: 5.0, c: 0.8, d: 2.0 } }, // 嫉妒
    ],
    floors: ['b'], // （唯一设底的轨道）
    reads: {
      juel10: ['juel', 10],
      juel4: ['juel', 4],
      juel5: ['juel', 5],
      juel6: ['juel', 6],
      exp50: ['exp', 50],
    },
    // 隐藏哨兵写在共享的 exp:50 段之前，隐藏后仍带共享位（258），原样保留
    hide_overwrites_shared: false,
    shared_gates: [{ ref: ['exp', 50], below: 'e', bit: 2 }],
    options: [
      {
        id: 0,
        need: 'a',
        gates: [{ ref: ['juel', 10], below: 'a', bit: 1 }],
        deduct: [[['juel', 10], 'a']],
        label: (s) =>
          `- ${era.get('palamname:10')}点数×${s.juel10}/${s.a} ……${get_ablup_state(s.i)}`,
      },
      {
        id: 1, // （恒渲染，无条件分支包裹）
        gates: [{ ref: ['juel', 4], below: 'b', bit: 1 }],
        deduct: [[['juel', 4], 'b']],
        label: (s) =>
          `- ${era.get('palamname:4')}点数×${s.juel4}/${s.b} ……${get_ablup_state(s.j)}`,
      },
      {
        id: 2,
        need: 'c',
        silent_hidden: true,
        gates: [{ ref: ['juel', 5], below: 'c', bit: 1 }],
        deduct: [[['juel', 5], 'c']],
        label: (s) =>
          `- ${era.get('palamname:5')}点数×${s.juel5}/${s.c} ……${get_ablup_state(s.k)}`,
      },
      {
        id: 3,
        need: 'd',
        silent_hidden: true,
        gates: [{ ref: ['juel', 6], below: 'd', bit: 1 }],
        deduct: [[['juel', 6], 'd']],
        label: (s) =>
          `- ${era.get('palamname:6')}点数×${s.juel6}/${s.d} ……${get_ablup_state(s.l)}`,
      },
    ],
    rows: (s) => {
      if (s.e > 0) {
        era.print(`${era.get('expname:50')}${s.e}以上(现在${s.exp50})且`);
      }
    },
    success: (lv) => `${era.get('ablname:10')}变为LV${lv}。`,
  },
  11: {
    id: 11,
    // 欲望。a＝欲情点数需求，梯子只有分档、无复利段
    tracks: {
      a: {
        table: [5, 50, 1000, 5000, 12000, 20000, 30000, 50000, 80000, 150000],
      },
    },
    blocked: [
      {
        reason: 'talent',
        when: (c) => c.lv >= 5 && c.talent(73) === 0 && c.talent(76) === 0,
        lines: '需要特殊素质才能继续提升',
      },
      { reason: 'max', when: (c) => c.lv >= 10, lines: '已达最高级' },
    ],
    extra: (c) => {
      // 异常经验：lv4→5 需 1 次、lv7→8 需 3 次，五项素质任一命中可免
      const exempt =
        c.talent(33) === 0 &&
        c.talent(70) === 0 &&
        c.talent(73) === 0 &&
        c.talent(76) === 0 &&
        c.talent(123) === 0;
      if (exempt && c.lv === 4) return { e: 1 };
      if (exempt && c.lv === 7) return { e: 3 };
      return { e: 0 };
    },
    mults: [
      { talent: 27, lv: 3, factor: { a: 1.5 } }, // 戒备森严
      { talent: 27, lv: 4, factor: { a: 2.0 } },
      { talent: 27, lv: 5, factor: { a: 2.5 } },
      { talent: 27, lv_min: 6, factor: { a: 3.0 } },
      { talent: 20, factor: { a: 1.2 } }, // 克制
      { talent: 24, factor: { a: 1.1 } }, // 保守的
      {
        talent: 30, // 看重贞操
        factor: { a: 1.5 },
        else: { talent: 31, factor: { a: 0.95 } }, // 看轻贞操
      },
      {
        talent: 32, // 压抑
        factor: { a: 1.5 },
        else: { talent: 33, factor: { a: 0.9 } }, // 开放
      },
      { talent: 34, factor: { a: 1.5 } }, // 抵抗
      {
        talent: 35, // 害羞
        factor: { a: 1.1 },
        else: { talent: 36, factor: { a: 0.95 } }, // 不知羞耻
      },
      {
        talent: 70, // 接受快感
        factor: { a: 0.8 },
        else: { talent: 71, factor: { a: 1.5 } }, // 否定快感
      },
      { talent: 72, factor: { a: 0.95 } }, // 容易上瘾
      { talent: 73, factor: { a: 0.5 } }, // 容易陷落
      { talent: 76, factor: { a: 0.7 } }, // 淫乱
      { talent: 180, factor: { a: 0.9 } }, // 妓女
      { talent: 181, factor: { a: 0.8 } }, // 倾城
      { talent: 157, factor: { a: 0.8 } }, // 人妻
    ],
    floors: ['a'],
    reads: { juel5: ['juel', 5], exp50: ['exp', 50] },
    shared_gates: [{ ref: ['exp', 50], below: 'e', bit: 2 }],
    options: [
      {
        id: 0,
        gates: [{ ref: ['juel', 5], below: 'a', bit: 1 }],
        deduct: [[['juel', 5], 'a']],
        label: (s) =>
          `- ${era.get('palamname:5')}点数×${s.juel5}/${s.a} ……${status_of(s.i, POINT_EXP_PARTS)}`,
      },
    ],
    rows: (s) => {
      if (s.e > 0) {
        era.print(`${era.get('expname:50')}${s.e}以上(现在${s.exp50})且`);
      }
    },
    success: (lv) => `${era.get('ablname:11')}变为LV${lv}。`,
  },
  12: {
    id: 12,
    // 技巧。组合上限（技巧＋话术 >= 15）触发时 a/i 维持清零——免费直接购买
    tracks: {
      a: { table: [1, 25, 200, 3000, 8000, 12000, 16000, 22000, 28000, 35000] },
    },
    extra: (c) => ({
      // 组合上限触发时 a 维持清零：梯子、素质链与设底都不进（原实现里 a 在 if 外初值 0）
      ...(c.lv + c.read(['abl', 15]) >= 15
        ? { a: 0, combo_break: true }
        : { combo_break: false }),
      self_training: c.cid === MASTER,
      money: era_flag.money,
      master_abl12: era.get(`abl:${MASTER}:12`) || 0,
      flag30: era.get('flag:30') || 0,
    }),
    blocked: [
      { reason: 'max', when: (c) => c.lv >= 10, lines: '已达最高级' },
      {
        reason: 'combo',
        when: (c) =>
          c.lv + c.read(['abl', 15]) >= 15 &&
          c.read(['juel', 7]) < c.lv * c.lv * 1000,
        lines: (c) => `技巧(${c.lv})＋话术(${c.read(['abl', 15])})上限为15`,
      },
    ],
    mults: [
      { talent: 27, lv: 3, factor: { a: 1.5 } }, // 戒备森严
      { talent: 27, lv: 4, factor: { a: 2.0 } },
      { talent: 27, lv: 5, factor: { a: 2.5 } },
      { talent: 27, lv_min: 6, factor: { a: 3.0 } },
      { talent: 13, factor: { a: 0.95 } }, // 坦率
      { talent: 21, factor: { a: 1.05 } }, // 冷漠
      { talent: 23, factor: { a: 0.95 } }, // 好奇心
      { talent: 24, factor: { a: 1.1 } }, // 保守的
      {
        talent: 32, // 压抑
        factor: { a: 1.1 },
        else: { talent: 33, factor: { a: 0.9 } }, // 开放
      },
      { talent: 34, factor: { a: 1.2 } }, // 抵抗
      {
        talent: 35, // 害羞
        factor: { a: 1.05 },
        else: { talent: 36, factor: { a: 0.95 } }, // 不知羞耻
      },
      {
        talent: 50, // 快速学习
        factor: { a: 0.8 },
        else: { talent: 51, factor: { a: 1.5 } }, // 学习缓慢
      },
      { talent: 52, factor: { a: 0.95 } }, // 擅用舌头
      { talent: 63, factor: { a: 0.95 } }, // 献身的
      { talent: 64, factor: { a: 0.95 } }, // 不怕脏
    ],
    floors: [{ name: 'a', when: (s) => !s.combo_break }],
    reads: { juel7: ['juel', 7] },
    options: [
      {
        id: 0,
        gates: [
          { ref: ['juel', 7], below: 'a', bit: 1, when: (s) => !s.combo_break },
          {
            bit: 4,
            when: (s) => !s.combo_break && s.self_training && s.money < 5000,
          },
          {
            bit: 2,
            when: (s) =>
              !s.combo_break &&
              s.self_training &&
              s.master_abl12 > s.flag30 + 1, // 魔王技巧超过爱或淫乱人数+1 不可自我训练
          },
        ],
        deduct: [[['juel', 7], 'a']],
        label: (s) =>
          `- ${era.get('palamname:7')}点数×${s.juel7}/${s.a} ……${status_of(s.i, ABLUP12_PARTS)}`,
      },
    ],
    rows: (s) => {
      if (s.self_training) {
        era.print('魔王通过这种方式提升技巧仍然需要金钱5000点');
      }
    },
    // 主流程成功时扣钱并打印，core 干跑没有这一段（只扣珠）
    on_success: (s) => {
      if (!s.self_training) return;
      era_flag.money -= 5000;
      era_exflag.legit_money -= 5000;
      era.print('花费金钱5000点。');
    },
    success: (lv) => `${era.get('ablname:12')}变为LV${lv}。`,
    // 组合上限直接返回 null（外层折成 0），比主流程的「免费购买」更早判死
    dry_decide: (s) => (s.combo_break ? null : s),
  },
  13: {
    id: 13,
    // 侍奉技术。组合上限（技巧＋性交技术 >= 10）达到时 a 改用 temp²×500
    tracks: {
      a: {
        table: [5, 400, 1000, 3000, 6000, 9000, 12000, 16000, 20000, 25000],
      },
    },
    extra: (c) => {
      const other = c.read(['abl', 14]);
      const temp = Math.max(c.lv, other);
      return c.lv + other >= 10 ? { a: temp * temp * 500 } : {};
    },
    blocked: [
      {
        reason: 'max',
        when: (c) => (c.lv >= 5 && c.read(['abl', 16]) < 5) || c.lv >= 10,
        lines: '已达最高级',
      },
      {
        reason: 'combo',
        when: (c) => {
          const temp = Math.max(c.lv, c.read(['abl', 14]));
          return (
            c.lv + c.read(['abl', 14]) >= 10 &&
            c.read(['juel', 7]) < temp * temp * 500
          );
        },
        lines: (c) => {
          const temp = Math.max(c.lv, c.read(['abl', 14]));
          return [
            {
              text: `侍奉技术(${c.lv})＋性交技术(${c.read(['abl', 14])})上限为10`,
              wait: 'print',
            },
            `${era.get('palamname:7')}点数至少达到${temp * temp * 500}点、方可突破技术等级限制`,
          ];
        },
      },
    ],
    mults: [
      { talent: 27, lv: 3, factor: { a: 1.5 } }, // 戒备森严
      { talent: 27, lv: 4, factor: { a: 2.0 } },
      { talent: 27, lv: 5, factor: { a: 2.5 } },
      { talent: 27, lv_min: 6, factor: { a: 3.0 } },
      { talent: 11, factor: { a: 1.2 } }, // 反抗心
      { talent: 13, factor: { a: 0.95 } }, // 坦率
      { talent: 16, factor: { a: 1.2 } }, // 嚣张
      {
        talent: 15, // 高姿态
        factor: { a: 1.2 },
        else: { talent: 17, factor: { a: 0.95 } }, // 低姿态
      },
      { talent: 21, factor: { a: 1.05 } }, // 冷漠
      { talent: 22, factor: { a: 1.05 } }, // 感情淡薄
      { talent: 23, factor: { a: 0.95 } }, // 好奇心
      { talent: 24, factor: { a: 1.1 } }, // 保守的
      {
        talent: 32, // 压抑
        factor: { a: 1.1 },
        else: { talent: 33, factor: { a: 0.9 } }, // 开放
      },
      { talent: 34, factor: { a: 1.2 } }, // 抵抗
      {
        talent: 35, // 害羞
        factor: { a: 1.05 },
        else: { talent: 36, factor: { a: 0.95 } }, // 不知羞耻
      },
      { talent: 37, factor: { a: 0.9 } }, // 把柄
      {
        talent: 50, // 快速学习
        factor: { a: 0.8 },
        else: { talent: 51, factor: { a: 1.5 } }, // 学习缓慢
      },
      { talent: 52, factor: { a: 0.9 } }, // 擅用舌头
      { talent: 63, factor: { a: 0.9 } }, // 献身的
      { talent: 64, factor: { a: 0.9 } }, // 不怕脏
      { talent: 73, factor: { a: 0.9 } }, // 容易陷落
      { talent: 80, factor: { a: 0.95 } }, // 倒錯的
      { talent: 83, factor: { a: 1.1 } }, // 施虐狂
      grade_mult(['abl', 16], ['a'], GRADE_STEPS), // 侍奉精神分级折扣（非素质）
    ],
    floors: ['a'],
    reads: { juel7: ['juel', 7] },
    options: [
      {
        id: 0,
        gates: [
          { ref: ['juel', 7], below: 'a', bit: 1 },
          // 技巧门槛落在 bit 2（显示为「经验不足」），与 ablup14 的同形门槛不同位
          { ref: ['abl', 12], below: 'lv+1', bit: 2, when: (s) => s.lv < 5 },
        ],
        deduct: [[['juel', 7], 'a']],
        label: (s) =>
          `- ${era.get('palamname:7')}点数×${s.juel7}/${s.a} ……${get_ablup_state(s.i)}`,
      },
    ],
    rows: (s, c) => {
      if (s.lv < 5) {
        era.print(
          `${era.get('ablname:12')}LV${s.lv + 1}以上(现在LV${c.read(['abl', 12])})且`,
        );
      } else {
        era.print(
          `${era.get('ablname:16')}LV${s.lv + 1}以上(现在LV${c.read(['abl', 16])})且`,
        );
      }
    },
    success: (lv) => `${era.get('ablname:13')}变为LV${lv}。`,
  },
  14: {
    id: 14,
    // 性交技术。组合上限（侍奉技术＋性交技术 >= 10）达到时 a 改用 temp²×500
    tracks: {
      a: { table: [1, 10, 100, 1500, 4000, 5000, 6500, 8000, 10000, 15000] },
      b: { table: [3, 10, 30, 80, 100, 130, 160, 200, 250, 300] },
    },
    extra: (c) => {
      const other = c.read(['abl', 13]);
      const temp = Math.max(c.lv, other);
      return c.lv + other >= 10 ? { a: temp * temp * 500 } : {};
    },
    blocked: [
      { reason: 'max', when: (c) => c.lv >= 10, lines: '已达最高级' },
      {
        reason: 'combo',
        when: (c) => {
          const temp = Math.max(c.lv, c.read(['abl', 13]));
          return (
            c.lv + c.read(['abl', 13]) >= 10 &&
            c.read(['juel', 7]) < temp * temp * 500
          );
        },
        lines: (c) => {
          const temp = Math.max(c.lv, c.read(['abl', 13]));
          return [
            {
              text: `侍奉技术(${c.read(['abl', 13])})＋性交技术(${c.lv})上限为10`,
              wait: 'print',
            },
            `${era.get('palamname:7')}点数至少达到${temp * temp * 500}点、方可突破技术等级限制`,
          ];
        },
      },
    ],
    mults: [
      { talent: 27, lv: 3, factor: { a: 1.5, b: 1.5 } }, // 戒备森严
      { talent: 27, lv: 4, factor: { a: 2.0, b: 2.0 } },
      { talent: 27, lv: 5, factor: { a: 2.5, b: 2.5 } },
      { talent: 27, lv_min: 6, factor: { a: 3.0, b: 3.0 } },
      { talent: 13, factor: { a: 0.9, b: 0.95 } }, // 坦率
      { talent: 21, factor: { a: 1.1, b: 1.05 } }, // 冷漠
      { talent: 22, factor: { a: 1.1, b: 1.05 } }, // 感情淡薄
      { talent: 23, factor: { a: 0.95, b: 0.95 } }, // 好奇心
      { talent: 24, factor: { a: 1.2, b: 1.1 } }, // 保守的
      {
        talent: 32, // 压抑
        factor: { a: 1.1, b: 1.05 },
        else: { talent: 33, factor: { a: 0.9, b: 0.95 } }, // 开放
      },
      { talent: 34, factor: { a: 1.2, b: 1.1 } }, // 抵抗
      {
        talent: 35, // 害羞
        factor: { a: 1.1, b: 1.05 },
        else: { talent: 36, factor: { a: 0.95, b: 0.95 } }, // 不知羞耻
      },
      {
        talent: 50, // 快速学习
        factor: { a: 0.8, b: 0.8 },
        else: { talent: 51, factor: { a: 1.5, b: 1.2 } }, // 学习缓慢
      },
      { talent: 63, factor: { a: 0.95, b: 0.95 } }, // 献身的
      { talent: 64, factor: { a: 0.95, b: 0.95 } }, // 不怕脏
      grade_mult(['abl', 30], ['a', 'b'], GRADE_STEPS), // 性交中毒分级折扣（非素质）
    ],
    floors: ['a', 'b'],
    reads: { juel7: ['juel', 7], exp5: ['exp', 5] },
    options: [
      {
        id: 0,
        gates: [
          { ref: ['juel', 7], below: 'a', bit: 1 },
          { ref: ['exp', 5], below: 'b', bit: 2 },
          { ref: ['abl', 12], below: 'lv+1', bit: 4, when: (s) => s.lv < 5 },
        ],
        deduct: [[['juel', 7], 'a']],
        label: (s) =>
          `- ${era.get('palamname:7')}点数×${s.juel7}/${s.a} ……${get_ablup_state(s.i)}`,
        info: (s) => [
          `${NBSP.repeat(6)}${era.get('expname:5')}　${s.exp5}/${s.b}`,
        ],
      },
    ],
    rows: (s, c) => {
      // Lv5 起不再检查技巧门槛，渲染层同样不显示技巧要求行
      if (s.lv < 5) {
        era.print(
          `${era.get('ablname:12')}LV${s.lv + 1}以上(现在LV${c.read(['abl', 12])})且`,
        );
      }
    },
    success: (lv) => `${era.get('ablname:14')}变为LV${lv}。`,
  },
  15: {
    id: 15,
    // 话术。组合上限（技巧＋话术 >= 15）触发时 a/b/c/i 维持清零——免费直接购买
    tracks: {
      a: { table: [1, 10, 100, 1500, 3000, 4000, 5200, 7500, 9000, 13000] },
      b: { table: [3, 10, 30, 50, 100, 120, 150, 180, 220, 250] },
      c: { table: [5, 20, 50, 100, 150, 180, 250, 320, 350, 400] },
    },
    extra: (c) => {
      // 组合上限触发时 a/b/c 维持清零：梯子、素质链与设底都不进（原实现里在 if 外初值 0）
      return c.read(['abl', 12]) + c.lv >= 15
        ? { a: 0, b: 0, c: 0, combo_break: true }
        : { combo_break: false };
    },
    blocked: [
      { reason: 'max', when: (c) => c.lv >= 10, lines: '已达最高级' },
      {
        reason: 'combo',
        when: (c) =>
          c.read(['abl', 12]) + c.lv >= 15 &&
          c.read(['juel', 7]) < c.lv * c.lv * 1000,
        lines: (c) => `技巧(${c.read(['abl', 12])})＋话术(${c.lv})上限为15`,
      },
    ],
    mults: [
      { talent: 27, lv: 3, factor: { a: 1.5, b: 1.25, c: 1.25 } }, // 戒备森严
      { talent: 27, lv: 4, factor: { a: 2.0, b: 1.5, c: 1.5 } },
      { talent: 27, lv: 5, factor: { a: 2.5, b: 1.75, c: 1.75 } },
      { talent: 27, lv_min: 6, factor: { a: 3.0, b: 2.0, c: 2.0 } },
      { talent: 11, factor: { a: 1.5, b: 1.2, c: 1.2 } }, // 反抗心
      { talent: 13, factor: { a: 0.9, b: 0.95, c: 0.95 } }, // 坦率
      { talent: 16, factor: { a: 1.25, b: 1.15, c: 1.15 } }, // 嚣张
      { talent: 15, factor: { a: 1.2, b: 1.1, c: 1.1 } }, // 高姿态
      { talent: 21, factor: { a: 1.5, b: 1.2, c: 1.2 } }, // 冷漠
      { talent: 22, factor: { a: 1.5, b: 1.2, c: 1.2 } }, // 感情淡薄
      { talent: 23, factor: { a: 0.95, b: 0.95, c: 0.95 } }, // 好奇心
      {
        talent: 25, // 乐观的
        factor: { a: 0.95, b: 0.95, c: 0.95 },
        else: { talent: 26, factor: { a: 1.2, b: 1.1, c: 1.1 } }, // 悲观的
      },
      { talent: 28, factor: { a: 0.95, b: 0.95, c: 0.95 } }, // 爱表现
      {
        talent: 32, // 压抑
        factor: { a: 1.2, b: 1.1, c: 1.1 },
        else: { talent: 33, factor: { a: 0.9, b: 0.9, c: 0.9 } }, // 开放
      },
      { talent: 34, factor: { a: 1.2, b: 1.1, c: 1.1 } }, // 抵抗
      {
        talent: 35, // 害羞
        factor: { a: 1.2, b: 1.1, c: 1.1 },
        else: { talent: 36, factor: { a: 0.95, b: 0.95, c: 0.95 } }, // 不知羞耻
      },
      {
        talent: 50, // 快速学习
        factor: { a: 0.8, b: 0.8, c: 0.8 },
        else: { talent: 51, factor: { a: 1.2, b: 1.1, c: 1.1 } }, // 学习缓慢
      },
      { talent: 92, factor: { a: 0.9, b: 0.9, c: 0.9 } }, // 谜之魅力
      { talent: 87, factor: { a: 0.95, b: 0.95, c: 0.95 } }, // 小恶魔
      { talent: 182, factor: { a: 0.6, b: 0.8, c: 0.8 } }, // 巧言
    ],
    floors: [
      { name: 'a', when: (s) => !s.combo_break },
      { name: 'b', when: (s) => !s.combo_break },
      { name: 'c', when: (s) => !s.combo_break },
    ],
    reads: { juel7: ['juel', 7], exp73: ['exp', 73], exp74: ['exp', 74] },
    options: [
      {
        id: 0,
        gates: [
          { ref: ['juel', 7], below: 'a', bit: 1, when: (s) => !s.combo_break },
          {
            bit: 2,
            // 任一经验达标即可免
            when: (s) => !s.combo_break && s.exp73 < s.b && s.exp74 < s.c,
          },
        ],
        deduct: [[['juel', 7], 'a']],
        label: (s) =>
          `- ${era.get('palamname:7')}点数×${s.juel7}/${s.a} ……${get_ablup_state(s.i)}`,
        info: (s) => [
          `${NBSP.repeat(6)}${era.get('expname:73')}　${s.exp73}/${s.b} or`,
          `${NBSP.repeat(6)}${era.get('expname:74')}　${s.exp74}/${s.c}`,
        ],
      },
    ],
    success: (lv) => `${era.get('ablname:15')}变为LV${lv}。`,
    // 组合上限直接返回 null（外层折成 0），比主流程的「免费购买」更早判死
    dry_decide: (s) => (s.combo_break ? null : s),
  },
  16: {
    id: 16,
    // 侍奉精神。a(欲情)/b(献身经验)/c(自慰经验)/d([1]经验门槛)/e(绝顶与精液经验)
    tracks: {
      a: {
        table: [
          100, 1200, 5000, 10000, 30000, 50000, 70000, 100000, 150000, 200000,
        ],
      },
      b: {
        table: [20, 400, 2000, 3000, 10000, 20000, 30000, 50000, 80000, 150000],
      },
      c: { table: [100, 2000, 10000, 0, 0, 0, 0, 0, 0, 0] },
      d: { table: [1, 1, 20, 20, 100, 200, 350, 500, 700, 1000] },
      e: { table: [1, 3, 6, 10, 20, 80, 150, 200, 400, 800] },
    },
    extra: (c) => {
      // 异常经验：lv>=3 时需要，三项素质任一命中可免
      const exempt =
        c.talent(63) === 0 && c.talent(85) === 0 && c.talent(86) === 0;
      return { f: exempt && c.lv >= 3 ? c.lv - 2 : 0 };
    },
    blocked: [
      {
        // 入口把关用 OR：任一素质缺失即挡；干跑时不查（两个调用点都不经过这里）
        reason: 'talent',
        dry_skip: true,
        when: (c) =>
          c.lv >= 5 &&
          (c.talent(63) === 0 || c.talent(85) === 0 || c.talent(86) === 0),
        lines: '需要特殊素质才能继续提升',
      },
      { reason: 'max', when: (c) => c.lv >= 10, lines: '已达最高级' },
    ],
    mults: [
      ...guard_mults(['a', 'b', 'd', 'e'], GUARD_FROM_3), // 戒备森严（c 不受影响）
      { talent: 11, factor: { a: 1.2, b: 1.4, d: 1.2, e: 1.2 } }, // 反抗心
      { talent: 12, factor: { a: 1.2, d: 1.2 } }, // 刚强
      { talent: 13, factor: { a: 0.9, b: 0.8, c: 0.8, d: 0.7 } }, // 坦率
      { talent: 16, factor: { a: 1.1, b: 1.1 } }, // 嚣张
      {
        talent: 15, // 高姿态
        factor: { a: 1.4, b: 1.3, d: 1.2, e: 1.2 },
        else: { talent: 17, factor: { a: 0.9, b: 0.8, d: 0.8, e: 0.8 } }, // 低姿态
      },
      { talent: 20, factor: { a: 1.2, b: 1.2, d: 1.2, e: 1.2 } }, // 克制
      { talent: 21, factor: { a: 1.1, b: 1.1, d: 1.2, e: 1.1 } }, // 冷漠
      { talent: 22, factor: { a: 1.2, b: 1.2, d: 1.4, e: 1.2 } }, // 感情淡薄
      { talent: 24, factor: { a: 1.3, b: 1.3, c: 1.3, d: 1.2, e: 1.2 } }, // 保守的
      {
        talent: 25, // 乐观的
        factor: { a: 0.9, b: 0.8, d: 0.7, e: 0.75 },
        else: { talent: 26, factor: { a: 0.8, b: 0.8, d: 0.8, e: 0.8 } }, // 悲观的
      },
      { talent: 28, factor: { a: 0.9, b: 0.9, c: 0.9, d: 0.9 } }, // 爱表现
      {
        talent: 32, // 压抑
        factor: { a: 1.1, b: 1.1, d: 2.5, e: 3.0 },
        else: { talent: 33, factor: { a: 0.9, b: 0.9, d: 0.7, e: 0.6 } }, // 开放
      },
      { talent: 34, factor: { a: 1.5, b: 1.5, c: 1.5, d: 2.0, e: 2.0 } }, // 抵抗
      { talent: 37, factor: { a: 0.8, b: 0.8, c: 0.8, d: 0.5, e: 0.5 } }, // 把柄
      { talent: 50, factor: { c: 0.8 } }, // 快速学习
      { talent: 51, factor: { c: 1.6 } }, // 学习缓慢
      { talent: 52, factor: { c: 0.8 } }, // 擅用舌头
      { talent: 63, factor: { a: 0.8, b: 0.7, d: 0.6, e: 0.8 } }, // 献身的
      {
        talent: 70, // 接受快感
        factor: { e: 0.7 },
        else: { talent: 71, factor: { e: 3.0 } }, // 否定快感
      },
      { talent: 73, factor: { a: 0.5, b: 0.5, d: 0.5, e: 0.5 } }, // 容易陷落
      { talent: 80, factor: { a: 0.75, b: 0.75, c: 0.75, d: 0.75, e: 0.75 } }, // 倒錯的
      { talent: 83, factor: { a: 1.2, b: 1.2, d: 1.5 } }, // 施虐狂
      { talent: 85, factor: { a: 0.75, b: 0.75, c: 0.75, d: 0.75 } }, // 爱慕
      { talent: 86, factor: { a: 0.5, b: 0.5, c: 0.5, d: 0.5, e: 0.5 } }, // 盲从
      { talent: 87, factor: { a: 1.1, b: 1.1, d: 1.2, e: 0.8 } }, // 小恶魔
      { talent: 123, factor: { a: 2.5, b: 3.0, c: 1.5, d: 0.8, e: 0.5 } }, // 疯狂
      { talent: 9, factor: { a: 2.5, b: 2.5, c: 2.5, d: 0.5, e: 0.5 } }, // 崩坏
    ],
    // c 无底线，靠 256 哨兵表达不可购买
    floors: ['a', 'b', 'd', 'e'],
    reads: {
      juel6: ['juel', 6],
      juel4: ['juel', 4],
      juel7: ['juel', 7],
      exp2: ['exp', 2],
      exp20: ['exp', 20],
      exp21: ['exp', 21],
      exp50: ['exp', 50],
    },
    // 隐藏哨兵写在共享门槛之前，隐藏后仍带上共享位，原样保留
    hide_overwrites_shared: false,
    shared_gates: [
      { ref: ['abl', 10], below: 'lv+1', bit: 4 }, // 顺从门槛，三条轨道同时命中
      { ref: ['exp', 50], below: 'f', bit: 2 }, // 异常经验不足，三条轨道同时命中
    ],
    options: [
      {
        id: 0, // （恒渲染）
        gates: [
          { ref: ['juel', 6], below: 'a', bit: 1 },
          { ref: ['exp', 2], below: 'e', bit: 2 },
          { ref: ['exp', 20], below: 'e', bit: 2 },
        ],
        deduct: [[['juel', 6], 'a']],
        label: (s) =>
          `- ${era.get('palamname:6')}点数×${s.juel6}/${s.a} ……${get_ablup_state(s.i)}`,
        info: (s) =>
          s.e > 0
            ? [
                `　　　${era.get('expname:2')}　${s.exp2}/${s.e}`,
                `　　　${era.get('expname:20')}　${s.exp20}/${s.e}`,
              ]
            : [],
      },
      {
        id: 1,
        need: 'b',
        silent_hidden: true,
        gates: [
          { ref: ['juel', 4], below: 'b', bit: 1 },
          { ref: ['exp', 21], below: 'd', bit: 2 },
        ],
        deduct: [[['juel', 4], 'b']],
        label: (s) =>
          `- ${era.get('palamname:4')}点数×${s.juel4}/${s.b} ……${get_ablup_state(s.j)}`,
        info: (s) =>
          s.d > 0 ? [`　　　${era.get('expname:21')}　${s.exp21}/${s.d}`] : [],
      },
      {
        id: 2,
        need: 'c',
        silent_hidden: true,
        gates: [
          { ref: ['juel', 7], below: 'c', bit: 1 },
          { ref: ['exp', 2], below: 1, bit: 2 }, // 固定阈值 1，与 d/e 门槛无关
        ],
        deduct: [[['juel', 7], 'c']],
        label: (s) =>
          `- ${era.get('palamname:7')}点数×${s.juel7}/${s.c} ……${get_ablup_state(s.k)}`,
        // 分母固定为 1，非变量
        info: (s) => [`　　　${era.get('expname:2')}　${s.exp2}/1`],
      },
    ],
    rows: (s, c) => {
      era.print(
        `${era.get('ablname:10')}LV${s.lv + 1}以上(现在LV${c.read(['abl', 10])})且`,
      );
      if (s.f > 0) {
        era.print(`${era.get('expname:50')}${s.f}以上(现在${s.exp50})且`);
      }
    },
    success: (lv) => `${era.get('ablname:16')}变为LV${lv}。`,
    // 素质复查与入口把关同条件（OR）：干跑的两个调用点不经过入口把关，缺一即不可提升
    dry_decide: (s, c) =>
      c.lv >= 5 &&
      (c.talent(63) === 0 || c.talent(85) === 0 || c.talent(86) === 0)
        ? null
        : s,
  },
  17: {
    id: 17,
    // 露出癖。a＝嫉妒点数需求；异常经验 b 与一次性经验门槛 c/d 都不是轨道
    tracks: {
      a: {
        table: [
          100, 1000, 3000, 6000, 12000, 25000, 50000, 80000, 120000, 150000,
        ],
      },
    },
    extra: (c) => {
      // 异常经验：lv>=3 时需要，六项素质任一命中可免
      const exempt =
        c.talent(28) === 0 &&
        c.talent(33) === 0 &&
        c.talent(76) === 0 &&
        c.talent(80) === 0 &&
        c.talent(88) === 0 &&
        c.talent(123) === 0;
      return {
        b: exempt && c.lv >= 3 ? c.lv - 2 : 0,
        c: c.lv === 0 ? 1 : 0, // 仅 Lv0→1 需要绝顶经验
        d: c.lv === 1 ? 1 : 0, // 仅 Lv1→2 需要调教自慰经验
      };
    },
    blocked: [
      {
        reason: 'talent',
        when: (c) =>
          c.lv >= 5 &&
          c.talent(13) === 0 &&
          c.talent(33) === 0 &&
          c.talent(28) === 0 &&
          c.talent(89) === 0,
        lines: '需要特殊素质才能继续提升',
      },
      { reason: 'max', when: (c) => c.lv >= 10, lines: '已达最高级' },
    ],
    mults: [
      { talent: 27, lv: 3, factor: { a: 1.5 } }, // 戒备森严
      { talent: 27, lv: 4, factor: { a: 2.0 } },
      { talent: 27, lv: 5, factor: { a: 2.5 } },
      { talent: 27, lv_min: 6, factor: { a: 3.0 } },
      { talent: 9, factor: { a: 0.8 } }, // 崩坏
      { talent: 10, factor: { a: 1.2 } }, // 胆怯
      { talent: 11, factor: { a: 1.5 } }, // 反抗心
      { talent: 12, factor: { a: 1.1 } }, // 刚强
      { talent: 16, factor: { a: 1.1 } }, // 嚣张
      { talent: 20, factor: { a: 1.1 } }, // 克制
      { talent: 21, factor: { a: 1.1 } }, // 冷漠
      { talent: 22, factor: { a: 1.5 } }, // 感情淡薄
      { talent: 28, factor: { a: 0.5 } }, // 爱表现
      { talent: 30, factor: { a: 1.2 } }, // 看重贞操
      { talent: 31, factor: { a: 0.9 } }, // 看轻贞操
      {
        talent: 32, // 压抑
        factor: { a: 1.2 },
        else: { talent: 33, factor: { a: 0.8 } }, // 开放
      },
      { talent: 34, factor: { a: 1.5 } }, // 抵抗
      {
        talent: 35, // 害羞
        factor: { a: 1.1 },
        else: { talent: 36, factor: { a: 0.9 } }, // 不知羞耻
      },
      { talent: 37, factor: { a: 0.8 } }, // 把柄
      { talent: 60, factor: { a: 0.9 } }, // 容易自慰
      {
        talent: 70, // 接受快感
        factor: { a: 0.9 },
        else: { talent: 71, factor: { a: 1.2 } }, // 否定快感
      },
      { talent: 72, factor: { a: 0.9 } }, // 容易上瘾
      { talent: 73, factor: { a: 0.5 } }, // 容易陷落
      { talent: 76, factor: { a: 0.8 } }, // 淫乱
      { talent: 80, factor: { a: 0.75 } }, // 倒錯的
      { talent: 83, factor: { a: 1.2 } }, // 施虐狂
      { talent: 88, factor: { a: 0.75 } }, // 受虐狂
      { talent: 123, factor: { a: 0.5 } }, // 疯狂
    ],
    floors: ['a'],
    reads: {
      juel8: ['juel', 8],
      exp50: ['exp', 50],
      exp2: ['exp', 2],
      exp11: ['exp', 11],
    },
    options: [
      {
        id: 0,
        gates: [
          { ref: ['juel', 8], below: 'a', bit: 1 },
          { ref: ['exp', 50], below: 'b', bit: 2 },
          { ref: ['exp', 2], below: 'c', bit: 2 },
          { ref: ['exp', 11], below: 'd', bit: 2 },
          // 欲望/顺从门槛：有[爱慕]时改查顺从，否则查欲望
          {
            ref: ['abl', 11],
            below: 'lv+1',
            bit: 4,
            when: (s, c) => c.talent(85) === 0,
          },
          {
            ref: ['abl', 10],
            below: 'lv+1',
            bit: 4,
            when: (s, c) => c.talent(85) !== 0,
          },
        ],
        deduct: [[['juel', 8], 'a']],
        label: (s) =>
          `- ${era.get('palamname:8')}点数×${s.juel8}/${s.a} ……${get_ablup_state(s.i)}`,
        info: (s) => [
          ...(s.c > 0
            ? [`　　　${era.get('expname:2')}　${s.exp2}/${s.c}`]
            : []),
          ...(s.d > 0
            ? [`　　　${era.get('expname:11')}　${s.exp11}/${s.d}`]
            : []),
        ],
      },
    ],
    rows: (s, c) => {
      if (c.talent(85) === 0) {
        era.print(
          `${era.get('ablname:11')}LV${s.lv + 1}以上(现在LV${c.read(['abl', 11])})且`,
        );
      } else {
        era.print(
          `${era.get('ablname:10')}LV${s.lv + 1}以上(现在LV${c.read(['abl', 10])})且`,
        );
      }
      if (s.b > 0) {
        era.print(`${era.get('expname:50')}${s.b}以上(现在${s.exp50})且`);
      }
    },
    success: (lv) => `${era.get('ablname:17')}变为LV${lv}。`,
  },
  20: {
    id: 20,
    // 抖S气质。a(欲情)/b(施虐快乐经验)；异常经验 c 与 d/e/g 都不是轨道
    tracks: {
      a: {
        table: [100, 500, 1500, 3000, 5000, 8000, 12000, 15000, 25000, 30000],
      },
      b: { table: [5, 20, 50, 120, 300, 600, 1500, 3000, 5000, 8000] },
    },
    extra: (c) => {
      // 异常经验 c：lv3/4/7 且无[倒错的/施虐狂/嫉妒/小恶魔]时 = lv-2。它在倍率链
      // 之前赋值，淫乱的 ×0.80 因此真实生效（lv4 无豁免素质时 c = 1，不是 2）。
      const exempt =
        c.talent(80) === 0 &&
        c.talent(83) === 0 &&
        c.talent(84) === 0 &&
        c.talent(87) === 0;
      const level = c.lv === 3 || c.lv === 4 || c.lv === 7;
      return { c: exempt && level ? c.lv - 2 : 0 };
    },
    blocked: [
      {
        reason: 'talent',
        when: (c) =>
          c.lv >= 5 &&
          c.talent(80) === 0 &&
          c.talent(83) === 0 &&
          c.talent(127) === 0,
        lines: '需要特殊素质才能继续提升',
      },
      {
        reason: 'combo',
        when: (c) => c.lv + c.read(['abl', 21]) >= 20,
        lines: (c) =>
          `抖S气质(${c.lv})＋抖M气质(${c.read(['abl', 21])})上限为20`,
      },
      { reason: 'max', when: (c) => c.lv >= 10, lines: '已达最高级' },
    ],
    mults: [
      { talent: 10, factor: { a: 1.5 } }, // 胆怯（只乘 a）
      { talent: 11, factor: { a: 0.9, b: 0.9 } }, // 反抗心
      { talent: 12, factor: { a: 0.9 } }, // 刚强
      { talent: 14, factor: { a: 1.2 } }, // 文静
      { talent: 16, factor: { a: 0.9, b: 0.9 } }, // 嚣张
      {
        talent: 15, // 高姿态
        factor: { a: 0.9, b: 0.9 },
        else: { talent: 17, factor: { a: 1.1, b: 1.1 } }, // 低姿态
      },
      { talent: 20, factor: { a: 1.2, b: 1.2 } }, // 克制
      { talent: 21, factor: { a: 1.2, b: 1.2 } }, // 冷漠
      { talent: 22, factor: { a: 1.5, b: 1.2 } }, // 感情淡薄（b 是 ×1.2 非 ×1.5）
      { talent: 23, factor: { a: 0.9, b: 0.9 } }, // 好奇心
      { talent: 26, factor: { a: 1.1 } }, // 悲观的
      { talent: 28, factor: { a: 0.9, b: 0.9 } }, // 爱表现
      {
        talent: 30, // 看重贞操
        factor: { a: 1.1, b: 1.1 },
        else: { talent: 31, factor: { a: 0.95, b: 0.95 } }, // 看轻贞操
      },
      {
        talent: 32, // 压抑
        factor: { a: 0.95, b: 0.95 },
        else: { talent: 33, factor: { a: 0.9, b: 0.9 } }, // 开放
      },
      { or: [79, 82], factor: { a: 0.95, b: 0.95 } }, // 讨厌男人/男人婆
      {
        talent: 40, // 害怕疼痛
        factor: { a: 1.2, b: 1.2 },
        else: { talent: 41, factor: { a: 0.9, b: 0.9 } }, // 不惧疼痛
      },
      { talent: 76, factor: { a: 0.8, b: 0.8, c: 0.8 } }, // 淫乱（对 c 的 ×0.80 真实生效）
      { talent: 80, factor: { a: 0.8, b: 0.8 } }, // 倒错的
      { talent: 83, factor: { a: 0.5, b: 0.5 } }, // 施虐狂
      { talent: 88, factor: { a: 1.2, b: 1.2 } }, // 受虐狂
      { talent: 84, factor: { a: 0.8, b: 0.8 } }, // 嫉妒
      { talent: 87, factor: { a: 0.8, b: 0.8 } }, // 小恶魔
      { talent: 123, factor: { a: 0.5, b: 0.5 } }, // 疯狂
      { talent: 9, factor: { a: 2.0, b: 2.0 } }, // 崩坏
    ],
    reads: { juel5: ['juel', 5], exp33: ['exp', 33], exp50: ['exp', 50] },
    options: [
      {
        id: 0,
        gates: [
          { ref: ['juel', 5], below: 'a', bit: 1 },
          { ref: ['exp', 33], below: 'b', bit: 2 },
          { ref: ['exp', 50], below: 'c', bit: 2 },
          { ref: ['abl', 11], below: 'lv+1', bit: 4 },
        ],
        deduct: [[['juel', 5], 'a']],
        label: (s) =>
          `- ${era.get('palamname:5')}点数×${s.juel5}/${s.a} ……${status_of(s.i, POINT_EXP_ABILITY_PARTS)}`,
        info: (s) =>
          s.b > 0 ? [`　　　${era.get('expname:33')}　${s.exp33}/${s.b}`] : [],
      },
    ],
    rows: (s, c) => {
      era.print(
        `${era.get('ablname:11')}LV${s.lv + 1}以上(现在LV${c.read(['abl', 11])})且`,
      );
      // 异常经验行用全角括号，本文件其余函数均为半角
      if (s.c > 0) {
        era.print(`${era.get('expname:50')}${s.c}以上（现在${s.exp50}）且`);
      }
    },
    success: (lv) => `${era.get('ablname:20')}变为LV${lv}。`,
  },
  21: {
    id: 21,
    // 抖M气质。a/b([0] 轨的欲情与苦痛)/c(被虐快乐)/d/e([1] 轨的苦痛与屈服)
    tracks: {
      a: { table: [100, 500, 1200, 0, 0, 0, 0, 0, 0, 0] },
      b: { table: [100, 500, 1000, 0, 0, 0, 0, 0, 0, 0] },
      c: { table: [0, 0, 0, 30, 80, 150, 200, 300, 450, 600] },
      d: {
        table: [100, 500, 1500, 2800, 4300, 6000, 8000, 11000, 15000, 20000],
      },
      e: {
        table: [
          100, 300, 1000, 6000, 12000, 24000, 38000, 56000, 86000, 120000,
        ],
      },
    },
    extra: (c) => {
      // f（异常经验）：lv3/4/7 且无[开放/倒错的/受虐狂]时 = lv-2；g 是全等级恒为 1 的绝顶经验需求
      const exempt =
        c.talent(33) === 0 && c.talent(80) === 0 && c.talent(88) === 0;
      const level = c.lv === 3 || c.lv === 4 || c.lv === 7;
      return { f: exempt && level ? c.lv - 2 : 0, g: 1 };
    },
    blocked: [
      {
        reason: 'talent',
        when: (c) =>
          c.lv >= 5 &&
          c.talent(10) === 0 &&
          c.talent(14) === 0 &&
          c.talent(37) === 0 &&
          c.talent(88) === 0,
        lines: '需要特殊素质才能继续提升',
      },
      {
        reason: 'combo',
        when: (c) => c.lv + c.read(['abl', 20]) >= 20,
        lines: (c) =>
          `抖S气质(${c.read(['abl', 20])})＋抖M气质(${c.lv})上限为20`,
      },
      { reason: 'max', when: (c) => c.lv >= 10, lines: '已达最高级' },
    ],
    mults: [
      ...guard_mults(['c', 'd', 'e'], GUARD_FROM_3), // 戒备森严（c/d/e 三列）
      { talent: 10, factor: { a: 1.1, b: 1.1, c: 1.1, d: 1.1, e: 1.1 } }, // 胆怯
      { talent: 11, factor: { a: 1.2, b: 1.2, c: 1.2, d: 1.2, e: 1.2 } }, // 反抗心
      { talent: 12, factor: { a: 1.2, b: 1.2, c: 1.2, d: 1.2, e: 1.2 } }, // 刚强
      { talent: 16, factor: { a: 1.2, b: 1.2, c: 1.2, d: 1.2, e: 1.2 } }, // 嚣张
      {
        talent: 15, // 高姿态 / 低姿态
        factor: { a: 1.2, b: 1.2, c: 1.2, d: 1.2, e: 1.2 },
        else: {
          talent: 17,
          factor: { a: 0.9, b: 0.9, c: 0.9, d: 0.9, e: 0.9 },
        },
      },
      { talent: 20, factor: { a: 1.2, b: 1.2, c: 1.2, d: 1.2, e: 1.2 } }, // 克制
      { talent: 21, factor: { a: 1.1, b: 1.1, c: 1.1, d: 1.1, e: 1.1 } }, // 冷漠（×1.10）
      { talent: 22, factor: { a: 1.5, b: 1.5, c: 1.5, d: 1.5, e: 1.5 } }, // 感情淡薄
      { talent: 24, factor: { a: 1.2, b: 1.2, c: 1.2, d: 1.2, e: 1.2 } }, // 保守的
      { talent: 26, factor: { a: 0.9, b: 0.9, c: 0.9, d: 0.9, e: 0.9 } }, // 悲观的（×0.90）
      {
        talent: 30, // 看重贞操 / 看轻贞操
        factor: { a: 1.2, b: 1.2, c: 1.2, d: 1.2, e: 1.2 },
        else: {
          talent: 31,
          factor: { a: 0.9, b: 0.9, c: 0.9, d: 0.9, e: 0.9 },
        },
      },
      {
        talent: 32, // 压抑 / 开放（开放 ×0.60）
        factor: { a: 1.2, b: 1.2, c: 1.2, d: 1.2, e: 1.2 },
        else: {
          talent: 33,
          factor: { a: 0.6, b: 0.6, c: 0.6, d: 0.6, e: 0.6 },
        },
      },
      { talent: 34, factor: { a: 2.0, b: 2.0, c: 2.0, d: 2.0, e: 2.0 } }, // 抵抗（×2.00）
      {
        talent: 35, // 害羞 / 不知羞耻
        factor: { a: 0.9, b: 0.9, c: 0.9, d: 0.9, e: 0.9 },
        else: {
          talent: 36,
          factor: { a: 1.2, b: 1.2, c: 1.2, d: 1.2, e: 1.2 },
        },
      },
      {
        talent: 40, // 害怕疼痛（×1.10）/ 不惧疼痛（×0.95）
        factor: { a: 1.1, b: 1.1, c: 1.1, d: 1.1, e: 1.1 },
        else: {
          talent: 41,
          factor: { a: 0.95, b: 0.95, c: 0.95, d: 0.95, e: 0.95 },
        },
      },
      {
        talent: 70, // 接受快感 / 否定快感
        factor: { a: 0.9, b: 0.9, c: 0.9, d: 0.9, e: 0.9 },
        else: {
          talent: 71,
          factor: { a: 1.1, b: 1.1, c: 1.1, d: 1.1, e: 1.1 },
        },
      },
      { talent: 76, factor: { a: 0.8, b: 0.8, c: 0.8, d: 0.8, e: 0.8 } }, // 淫乱
      { talent: 80, factor: { a: 0.75, b: 0.75, c: 0.75, d: 0.75, e: 0.75 } }, // 倒错的（×0.75）
      { talent: 83, factor: { a: 1.2, b: 1.2, c: 1.2, d: 1.2, e: 1.2 } }, // 施虐狂（×1.20）
      { talent: 88, factor: { a: 0.5, b: 0.5, c: 0.5, d: 0.5, e: 0.5 } }, // 受虐狂（×0.50）
      { talent: 123, factor: { a: 0.8, b: 0.8, c: 0.8, d: 0.8, e: 0.8 } }, // 疯狂（×0.80）
      { talent: 9, factor: { a: 2.0, b: 2.0, c: 2.0, d: 2.0, e: 2.0 } }, // 崩坏（×2.00）
    ],
    reads: {
      juel9: ['juel', 9],
      juel5: ['juel', 5],
      juel6: ['juel', 6],
      exp30: ['exp', 30],
      exp2: ['exp', 2],
      exp50: ['exp', 50],
    },
    shared_gates: [
      { ref: ['abl', 11], below: 'lv+1', bit: 4 }, // 欲望门槛，双轨同时命中
      { ref: ['exp', 50], below: 'f', bit: 2 }, // 异常经验不足，双轨同时命中
    ],
    options: [
      {
        id: 0, // [0] 苦痛+欲情
        need: 'b',
        gates: [
          { ref: ['juel', 9], below: 'a', bit: 1 },
          { ref: ['juel', 5], below: 'b', bit: 1 },
          { ref: ['exp', 30], below: 'c', bit: 2 },
        ],
        deduct: [
          [['juel', 9], 'a'],
          [['juel', 5], 'b'],
        ],
        label: (s) =>
          `- ${era.get('palamname:9')}点数×${s.juel9}/${s.a} ……${get_ablup_state(s.i)}`,
        info: (s) => [
          `　　　${era.get('palamname:5')}点数×${s.juel5}/${s.b}`,
          ...(s.c > 0
            ? [`　　　${era.get('expname:30')}　${s.exp30}/${s.c}`]
            : []),
        ],
      },
      {
        id: 1, // [1] 苦痛+屈服
        need: 'd',
        silent_hidden: true,
        gates: [
          { ref: ['juel', 9], below: 'd', bit: 1 },
          { ref: ['juel', 6], below: 'e', bit: 1 },
          { ref: ['exp', 30], below: 'c', bit: 2 },
          { ref: ['exp', 2], below: 'g', bit: 2 },
        ],
        deduct: [
          [['juel', 9], 'd'],
          [['juel', 6], 'e'],
        ],
        label: (s) =>
          `- ${era.get('palamname:9')}点数×${s.juel9}/${s.d} ……${get_ablup_state(s.j)}`,
        info: (s) => [
          `　　　${era.get('palamname:6')}点数×${s.juel6}/${s.e}`,
          ...(s.c > 0
            ? [`　　　${era.get('expname:30')}　${s.exp30}/${s.c}`]
            : []),
          `　　　${era.get('expname:2')}　${s.exp2}/${s.g}`,
        ],
      },
    ],
    rows: (s, c) => {
      era.print(
        `${era.get('ablname:11')}LV${s.lv + 1}以上(现在LV${c.read(['abl', 11])})且`,
      );
      if (s.f > 0) {
        era.print(`${era.get('expname:50')}${s.f}以上(现在${s.exp50})且`);
      }
    },
    success: (lv) => `${era.get('ablname:21')}变为LV${lv}。`,
  },
  22: {
    id: 22,
    // 百合气质。a(欲情)/b(百合经验)/c(屈服)/d([1] 阴核点数)
    tracks: {
      a: {
        table: [
          200, 1000, 3000, 8000, 20000, 40000, 80000, 150000, 200000, 300000,
        ],
      },
      b: { table: [50, 150, 300, 500, 800, 1200, 1800, 2600, 3600, 5000] },
      c: { table: [0, 0, 1000, 2000, 5000, 10000, 13000, 18000, 30000, 50000] },
      d: { table: [1000, 5000, 0, 0, 0, 0, 0, 0, 0, 0] },
    },
    extra: (c) => {
      // e（异常经验）：lv>=3 且无[开放/倒错的/双性恋/疯狂]时 = lv-2
      // （豁免名单不含讨厌男人）
      const exempt =
        c.talent(33) === 0 &&
        c.talent(80) === 0 &&
        c.talent(81) === 0 &&
        c.talent(123) === 0;
      return { e: exempt && c.lv >= 3 ? c.lv - 2 : 0 };
    },
    blocked: [
      // 男人直接返回：分隔线之前，无输出（判定里的却下条件与此相同）
      { reason: 'male', when: (c) => c.talent(122) !== 0, silent: true },
      {
        reason: 'talent',
        when: (c) =>
          c.lv >= 5 &&
          c.talent(33) === 0 &&
          c.talent(80) === 0 &&
          c.talent(81) === 0 &&
          c.talent(82) === 0 &&
          c.talent(123) === 0,
        lines: '需要特殊素质才能继续提升',
      },
      { reason: 'max', when: (c) => c.lv >= 10, lines: '已达最高级' },
    ],
    mults: [
      ...guard_mults(['a', 'b', 'c'], GUARD_FROM_3), // 戒备森严（a/b/c 三列）
      { talent: 13, factor: { a: 0.95, b: 0.95, c: 0.95, d: 0.95 } }, // 坦率
      { talent: 21, factor: { a: 1.2, b: 1.2, c: 1.2, d: 1.2 } }, // 冷漠
      { talent: 23, factor: { a: 0.95, b: 0.95, c: 0.95, d: 0.95 } }, // 好奇心
      { talent: 24, factor: { a: 1.2, b: 1.2, c: 1.2, d: 1.2 } }, // 保守的
      {
        talent: 30, // 看重贞操 / 看轻贞操
        factor: { a: 1.2, b: 1.2, c: 1.2, d: 1.2 },
        else: { talent: 31, factor: { a: 0.95, b: 0.95, c: 0.95, d: 0.95 } },
      },
      { talent: 63, factor: { a: 0.95, b: 0.95, c: 0.95, d: 0.95 } }, // 献身的
      {
        talent: 70, // 接受快感 / 否定快感
        factor: { a: 0.95, b: 0.95, c: 0.95, d: 0.95 },
        else: { talent: 71, factor: { a: 1.2, b: 1.2, c: 1.2, d: 1.2 } },
      },
      { talent: 80, factor: { a: 0.8, b: 0.8, c: 0.8, d: 0.8 } }, // 倒错的
      { talent: 79, factor: { a: 2.0, b: 2.0, c: 2.0, d: 2.0 } }, // 男人婆（百合特有）
      { talent: 81, factor: { a: 0.5, b: 0.5, c: 0.5, d: 0.5 } }, // 双性恋
      { talent: 82, factor: { a: 0.5, b: 0.5, c: 0.5, d: 0.5 } }, // 讨厌男人
      { talent: 123, factor: { a: 0.5, b: 0.5, c: 0.5, d: 0.5 } }, // 疯狂
    ],
    floors: ['a', 'b'], // （c/d 无底线）
    reads: {
      juel5: ['juel', 5],
      juel6: ['juel', 6],
      juel0: ['juel', 0],
      exp40: ['exp', 40],
      exp50: ['exp', 50],
    },
    shared_gates: [
      { ref: ['exp', 50], below: 'e', bit: 2 }, // 异常经验不足，双轨同时命中
      { ref: ['abl', 11], below: 'lv+1', bit: 4 }, // 欲望门槛，双轨同时命中
    ],
    options: [
      {
        id: 0, // 恒渲染
        gates: [
          { ref: ['juel', 5], below: 'a', bit: 1 },
          { ref: ['juel', 6], below: 'c', bit: 1 },
          { ref: ['exp', 40], below: 'b', bit: 2 },
        ],
        deduct: [
          [['juel', 5], 'a'],
          [['juel', 6], 'c'],
        ],
        label: (s) =>
          `- ${era.get('palamname:5')}点数×${s.juel5}/${s.a} ……${get_ablup_state(s.i)}`,
        info: (s) => [
          ...(s.c > 0
            ? [`　　　${era.get('palamname:6')}点数×${s.juel6}/${s.c}`]
            : []),
          `　　　${era.get('expname:40')}　${s.exp40}/${s.b}`,
        ],
      },
      {
        id: 1, // [1] 阴核轨道
        need: 'd',
        silent_hidden: true,
        gates: [
          { ref: ['juel', 0], below: 'd', bit: 1 },
          { ref: ['exp', 40], below: 'b', bit: 2 },
        ],
        deduct: [[['juel', 0], 'd']],
        label: (s) =>
          `- ${era.get('palamname:0')}点数×${s.juel0}/${s.d} ……${get_ablup_state(s.j)}`,
        info: (s) => [`　　　${era.get('expname:40')}　${s.exp40}/${s.b}`],
      },
    ],
    rows: (s, c) => {
      // 显示顺序与其余函数相反：异常经验行在欲望行之前
      if (s.e > 0) {
        era.print(`${era.get('expname:50')}${s.e}以上(现在${s.exp50})且`);
      }
      era.print(
        `${era.get('ablname:11')}LV${s.lv + 1}以上(现在LV${c.read(['abl', 11])})且`,
      );
    },
    success: (lv) => `${era.get('ablname:22')}变为LV${lv}。`,
  },
  23: {
    id: 23,
    // 断背气质。梯子与多元素质链与 ablup22 同形，性别与讨厌男人的方向相反
    tracks: {
      a: {
        table: [
          200, 1000, 3000, 8000, 20000, 40000, 80000, 150000, 200000, 300000,
        ],
      },
      b: { table: [50, 150, 300, 500, 800, 1200, 1800, 2600, 3600, 5000] },
      c: { table: [0, 0, 1000, 2000, 5000, 10000, 13000, 18000, 30000, 50000] },
      d: { table: [1000, 5000, 0, 0, 0, 0, 0, 0, 0, 0] },
    },
    extra: (c) => {
      // e（异常经验）：lv>=3 且无[开放/倒错的/双性恋/疯狂]时 = lv-2
      const exempt =
        c.talent(33) === 0 &&
        c.talent(80) === 0 &&
        c.talent(81) === 0 &&
        c.talent(123) === 0;
      return { e: exempt && c.lv >= 3 ? c.lv - 2 : 0 };
    },
    blocked: [
      // 非男人直接返回：分隔线之前，无输出
      { reason: 'female', when: (c) => c.talent(122) === 0, silent: true },
      {
        reason: 'talent',
        when: (c) =>
          c.lv >= 5 &&
          c.talent(33) === 0 &&
          c.talent(80) === 0 &&
          c.talent(81) === 0 &&
          c.talent(123) === 0,
        lines: '需要特殊素质才能继续提升',
      },
      { reason: 'max', when: (c) => c.lv >= 10, lines: '已达最高级' },
    ],
    mults: [
      ...guard_mults(['a', 'b', 'c'], GUARD_FROM_3), // 戒备森严（a/b/c 三列，与 ablup22 相同）
      { talent: 13, factor: { a: 0.95, b: 0.95, c: 0.95, d: 0.95 } }, // 坦率
      { talent: 21, factor: { a: 1.2, b: 1.2, c: 1.2, d: 1.2 } }, // 冷漠
      { talent: 23, factor: { a: 0.95, b: 0.95, c: 0.95, d: 0.95 } }, // 好奇心
      { talent: 24, factor: { a: 1.2, b: 1.2, c: 1.2, d: 1.2 } }, // 保守的
      {
        talent: 30, // 看重贞操 / 看轻贞操
        factor: { a: 1.2, b: 1.2, c: 1.2, d: 1.2 },
        else: { talent: 31, factor: { a: 0.95, b: 0.95, c: 0.95, d: 0.95 } },
      },
      { talent: 82, factor: { a: 3.0, b: 3.0, c: 3.0, d: 3.0 } }, // 讨厌男人（与 ablup22 相反）
      { talent: 63, factor: { a: 0.95, b: 0.95, c: 0.95, d: 0.95 } }, // 献身的
      {
        talent: 70, // 接受快感 / 否定快感
        factor: { a: 0.95, b: 0.95, c: 0.95, d: 0.95 },
        else: { talent: 71, factor: { a: 1.2, b: 1.2, c: 1.2, d: 1.2 } },
      },
      { talent: 80, factor: { a: 0.8, b: 0.8, c: 0.8, d: 0.8 } }, // 倒错的
      { talent: 81, factor: { a: 0.5, b: 0.5, c: 0.5, d: 0.5 } }, // 双性恋
      { talent: 123, factor: { a: 0.5, b: 0.5, c: 0.5, d: 0.5 } }, // 疯狂
    ],
    floors: ['a', 'b'],
    reads: {
      juel5: ['juel', 5],
      juel6: ['juel', 6],
      juel2: ['juel', 2],
      exp41: ['exp', 41],
      exp50: ['exp', 50],
    },
    shared_gates: [{ ref: ['exp', 50], below: 'e', bit: 2 }], // 异常经验不足，双轨同时命中
    options: [
      {
        id: 0, // 恒渲染
        gates: [
          { ref: ['juel', 5], below: 'a', bit: 1 },
          { ref: ['juel', 6], below: 'c', bit: 1 },
          { ref: ['exp', 41], below: 'b', bit: 2 },
        ],
        deduct: [
          [['juel', 5], 'a'],
          [['juel', 6], 'c'],
        ],
        label: (s) =>
          `- ${era.get('palamname:5')}点数×${s.juel5}/${s.a} ……${get_ablup_state(s.i)}`,
        info: (s) => [
          ...(s.c > 0
            ? [`　　　${era.get('palamname:6')}点数×${s.juel6}/${s.c}`]
            : []),
          `　　　${era.get('expname:41')}　${s.exp41}/${s.b}`,
        ],
      },
      {
        id: 1, // [1] 肛门轨道
        need: 'd',
        silent_hidden: true,
        gates: [
          { ref: ['juel', 2], below: 'd', bit: 1 },
          { ref: ['exp', 41], below: 'b', bit: 2 },
        ],
        deduct: [[['juel', 2], 'd']],
        label: (s) =>
          `- ${era.get('palamname:2')}点数×${s.juel2}/${s.d} ……${get_ablup_state(s.j)}`,
        info: (s) => [`　　　${era.get('expname:41')}　${s.exp41}/${s.b}`],
      },
    ],
    rows: (s) => {
      // 只有异常经验行，没有欲望门槛行
      if (s.e > 0) {
        era.print(`${era.get('expname:50')}${s.e}以上(现在${s.exp50})且`);
      }
    },
    success: (lv) => `${era.get('ablname:23')}变为LV${lv}。`,
  },
  30: {
    id: 30,
    // 性交中毒。a(欲情)/b(屈服)/c(性交经验)；两条轨道的倍率倍率不同，扣点也不同
    tracks: {
      a: {
        table: [
          3000, 8000, 15000, 30000, 55000, 70000, 90000, 120000, 150000, 200000,
        ],
      },
      b: {
        table: [
          10000, 25000, 50000, 100000, 200000, 300000, 400000, 550000, 700000,
          900000,
        ],
      },
      c: { table: [10, 25, 40, 80, 200, 400, 800, 1200, 1500, 2000] },
    },
    extra: (c) => {
      // f（异常经验）：lv>=2 且无[开放/容易上瘾/淫乱/疯狂]时 = lv-1，不足即双轨同置 bit2
      const exempt =
        c.talent(33) === 0 &&
        c.talent(72) === 0 &&
        c.talent(76) === 0 &&
        c.talent(123) === 0;
      return { f: exempt && c.lv >= 2 ? c.lv - 1 : 0 };
    },
    blocked: [
      {
        reason: 'talent',
        when: (c) =>
          c.lv >= 5 &&
          (c.talent(85) === 0 ||
            c.talent(76) === 0 ||
            c.talent(63) === 0 ||
            c.talent(70) === 0 ||
            c.talent(75) === 0 ||
            c.talent(77) === 0), // OR：任一为 0 即拦
        lines: '需要特殊素质才能继续提升',
      },
      { reason: 'max', when: (c) => c.lv >= 10, lines: '已达最高级' },
      {
        reason: 'combo',
        when: (c) => {
          const bulk = c.lv * c.lv;
          return (
            c.lv + c.read(['abl', 31]) >= 10 &&
            // 判定查 JUEL:6≥lv²×1000 且 JUEL:5≥lv²×300（与提示文案的表交叉，原样保留）
            (c.read(['juel', 6]) < bulk * 1000 ||
              c.read(['juel', 5]) < bulk * 300)
          );
        },
        lines: (c) => [
          `性交中毒(${c.lv})＋自慰中毒(${c.read(['abl', 31])})上限为10`,
          {
            // 文案的表与判定交叉：判定用 1000/300，这里也照抄 1000/300
            text: `至少达成${era.get('palamname:5')}点数${c.lv * c.lv * 1000}点或${era.get('palamname:6')}点数${c.lv * c.lv * 300}点的其中一项`,
            wait: 'print',
          },
          '方可提升当前性交中毒的等级',
        ],
      },
    ],
    mults: [
      ...guard_mults(['a', 'b', 'c'], GUARD_FROM_3), // 戒备森严（a/b/c 三列）
      { talent: 12, factor: { a: 1.2, b: 1.2, c: 1.2 } }, // 刚强
      { talent: 20, factor: { a: 1.2, b: 1.2, c: 1.2 } }, // 克制
      { talent: 21, factor: { a: 1.2, b: 1.2, c: 1.2 } }, // 冷漠
      { talent: 24, factor: { a: 1.2, b: 1.2, c: 1.2 } }, // 保守的
      {
        talent: 30, // 看重贞操 / 看轻贞操
        factor: { a: 1.2, b: 1.2, c: 1.2 },
        else: { talent: 31, factor: { a: 0.9, b: 0.9, c: 0.9 } },
      },
      {
        talent: 32, // 压抑 / 开放
        factor: { a: 1.2, b: 1.2, c: 1.2 },
        else: { talent: 33, factor: { a: 0.8, b: 0.8, c: 0.8 } },
      },
      { talent: 34, factor: { a: 1.2, b: 1.2, c: 1.2 } }, // 抵抗
      {
        talent: 35, // 害羞 / 不知羞耻
        factor: { a: 1.1, b: 1.1, c: 1.1 },
        else: { talent: 36, factor: { a: 0.95, b: 0.95, c: 0.95 } },
      },
      {
        talent: 70, // 接受快感 / 否定快感
        factor: { a: 0.9, b: 0.9, c: 0.9 },
        else: { talent: 71, factor: { a: 1.2, b: 1.2, c: 1.2 } },
      },
      { talent: 72, factor: { a: 0.6, b: 0.6, c: 0.6 } }, // 容易上瘾
      { talent: 73, factor: { a: 0.5, b: 0.5, c: 0.5 } }, // 容易陷落
      { talent: 76, factor: { a: 0.8, b: 0.8, c: 0.8 } }, // 淫乱
      { talent: 87, factor: { a: 0.9, b: 0.9, c: 0.9 } }, // 小恶魔
      { talent: 123, factor: { a: 0.8, b: 0.8, c: 0.8 } }, // 疯狂
      { talent: 9, factor: { a: 0.8, b: 0.8, c: 0.8 } }, // 崩坏（非 ablup20/21 的 ×2.00）
    ],
    floors: ['a', 'b', 'c'],
    reads: {
      juel5: ['juel', 5],
      juel6: ['juel', 6],
      exp5: ['exp', 5],
      exp50: ['exp', 50],
    },
    shared_gates: [
      { ref: ['exp', 50], below: 'f', bit: 2 }, // 异常经验不足，双轨同时命中
      { ref: ['abl', 16], below: 'lv+1', bit: 4 }, // 侍奉精神门槛，双轨同时命中
    ],
    options: [
      {
        id: 0, // 恒渲染
        gates: [
          { ref: ['juel', 5], below: 'a', bit: 1 },
          { ref: ['juel', 6], below: 'b', bit: 1 },
          { ref: ['exp', 5], below: 'c', bit: 2 },
        ],
        deduct: [
          [['juel', 5], 'a'],
          [['juel', 6], 'b'],
        ],
        label: (s) =>
          `- ${era.get('palamname:5')}点数×${s.juel5}/${s.a} ……${get_ablup_state(s.i)}`,
        info: (s) => [
          `　　　${era.get('palamname:6')}点数×${s.juel6}/${s.b}`,
          `　　　${era.get('expname:5')}　${s.exp5}/${s.c}`,
        ],
      },
      {
        id: 1, // 恒渲染，无 256 分支
        gates: [
          { ref: ['juel', 5], below: 'a*3', bit: 1 },
          { ref: ['juel', 6], below: 'b*3', bit: 1 },
          { ref: ['exp', 5], below: 'c/2', bit: 2 },
        ],
        deduct: [
          [['juel', 5], 'a*3'],
          [['juel', 6], 'b*3'],
        ],
        label: (s) =>
          `- ${era.get('palamname:5')}点数×${s.juel5}/${s.a * 3} ……${get_ablup_state(s.j)}`,
        info: (s) => [
          `　　　${era.get('palamname:6')}点数×${s.juel6}/${s.b * 3}`,
          `　　　${era.get('expname:5')}　${s.exp5}/${Math.floor(s.c / 2)}`,
        ],
      },
    ],
    rows: (s, c) => {
      if (s.f > 0) {
        era.print(`${era.get('expname:50')}${s.f}以上(现在${s.exp50})且`);
      }
      era.print(
        `${era.get('ablname:16')}LV${s.lv + 1}以上(现在LV${c.read(['abl', 16])})且`,
      );
    },
    success: (lv) => `${era.get('ablname:30')}变为LV${lv}。`,
  },
  31: {
    id: 31,
    // 自慰中毒。a(欲情)/b(阴核)/c(耻情)/d([0] 自慰经验)/e([1] 调教自慰经验)
    tracks: {
      a: {
        table: [
          3000, 6000, 12000, 20000, 32000, 50000, 70000, 100000, 150000, 200000,
        ],
      },
      b: {
        table: [
          10000, 25000, 50000, 100000, 200000, 250000, 320000, 500000, 800000,
          1000000,
        ],
      },
      c: {
        table: [
          1000, 3000, 6000, 15000, 30000, 40000, 50000, 70000, 100000, 150000,
        ],
      },
      d: { table: [100, 250, 500, 1000, 1500, 2000, 3000, 4000, 6000, 8000] },
      e: { table: [20, 40, 60, 100, 150, 200, 320, 500, 800, 1000] },
    },
    extra: (c) => {
      // f（异常经验）：仅 lv==2 且无[开放/容易自慰/容易上瘾/淫乱/疯狂]时 = 1，
      // 不足即双轨同置 bit2
      const exempt =
        c.talent(33) === 0 &&
        c.talent(60) === 0 &&
        c.talent(72) === 0 &&
        c.talent(76) === 0 &&
        c.talent(123) === 0;
      return { f: exempt && c.lv === 2 ? c.lv - 1 : 0 };
    },
    blocked: [
      {
        reason: 'talent',
        when: (c) =>
          c.lv >= 5 &&
          c.talent(85) === 0 &&
          c.talent(76) === 0 &&
          c.talent(60) === 0 &&
          c.talent(70) === 0 &&
          c.talent(74) === 0 &&
          c.talent(78) === 0, // AND：全 0 才拦
        lines: '需要特殊素质才能继续提升',
      },
      { reason: 'max', when: (c) => c.lv >= 10, lines: '已达最高级' },
      {
        reason: 'combo',
        when: (c) => {
          const bulk = c.lv * c.lv;
          return (
            c.lv + c.read(['abl', 30]) >= 10 &&
            (c.read(['juel', 5]) < bulk * 2550 ||
              c.read(['juel', 0]) < bulk * 15000 ||
              c.read(['juel', 8]) < bulk * 2000)
          );
        },
        lines: (c) => {
          const bulk = c.lv * c.lv;
          return [
            // 这一条是 print，ablup30 同位置是 printAndWait
            {
              text: `性交中毒(${c.read(['abl', 30])})＋自慰中毒(${c.lv})上限为10`,
              wait: 'print',
            },
            {
              text: `至少达成${era.get('palamname:5')}点数${bulk * 2550}点、${era.get('palamname:0')}点数${bulk * 15000}点或${era.get('palamname:8')}点数${bulk * 2000}点的其中一项`,
              wait: 'print',
            },
            '方可提升当前自慰中毒的等级',
          ];
        },
      },
    ],
    mults: [
      ...guard_mults(['a', 'b', 'c', 'd', 'e'], GUARD_FROM_3), // 戒备森严（a-e 五列）
      { talent: 60, factor: { a: 0.25, b: 0.25, c: 0.25, d: 0.25 } }, // 容易自慰（E 不受影响）
      { talent: 72, factor: { a: 0.5, b: 0.5, c: 0.5, d: 0.5 } }, // 容易上瘾
      { talent: 80, factor: { a: 0.75, b: 0.75, c: 0.75, d: 0.75 } }, // 倒错的
      { talent: 76, factor: { a: 0.5, b: 0.5, c: 0.5, d: 0.5 } }, // 淫乱化
    ],
    floors: ['a', 'b', 'c', 'd', 'e'],
    reads: {
      juel5: ['juel', 5],
      juel0: ['juel', 0],
      juel8: ['juel', 8],
      exp10: ['exp', 10],
      exp11: ['exp', 11],
      exp50: ['exp', 50],
    },
    shared_gates: [
      { ref: ['exp', 50], below: 'f', bit: 2 }, // 异常经验，双轨同时命中
      { ref: ['abl', 17], below: 'lv+1', bit: 4 }, // 露出癖门槛
      { ref: ['abl', 0], below: 'lv+1', bit: 4 }, // 阴蒂感觉门槛
    ],
    options: [
      {
        id: 0, // 恒渲染
        gates: [
          { ref: ['juel', 5], below: 'a', bit: 1 },
          { ref: ['juel', 0], below: 'b', bit: 1 },
          { ref: ['juel', 8], below: 'c', bit: 1 },
          { ref: ['exp', 10], below: 'd', bit: 2 },
        ],
        deduct: [
          [['juel', 5], 'a'],
          [['juel', 0], 'b'],
          [['juel', 8], 'c'],
        ],
        label: (s) =>
          `- ${era.get('palamname:5')}点数×${s.juel5}/${s.a} ……${get_ablup_state(s.i)}`,
        info: (s) => [
          `　　　${era.get('palamname:0')}点数×${s.juel0}/${s.b}`,
          `　　　${era.get('palamname:8')}点数×${s.juel8}/${s.c}`,
          `　　　${era.get('expname:10')}　${s.exp10}/${s.d}`,
        ],
      },
      {
        id: 1, // 恒渲染，与 [0] 同分母，扣点也相同
        gates: [
          { ref: ['juel', 5], below: 'a', bit: 1 },
          { ref: ['juel', 0], below: 'b', bit: 1 },
          { ref: ['juel', 8], below: 'c', bit: 1 },
          { ref: ['exp', 11], below: 'e', bit: 2 },
        ],
        deduct: [
          [['juel', 5], 'a'],
          [['juel', 0], 'b'],
          [['juel', 8], 'c'],
        ],
        label: (s) =>
          `- ${era.get('palamname:5')}点数×${s.juel5}/${s.a} ……${get_ablup_state(s.j)}`,
        info: (s) => [
          `　　　${era.get('palamname:0')}点数×${s.juel0}/${s.b}`,
          `　　　${era.get('palamname:8')}点数×${s.juel8}/${s.c}`,
          `　　　${era.get('expname:11')}　${s.exp11}/${s.e}`,
        ],
      },
    ],
    rows: (s, c) => {
      if (s.f > 0) {
        era.print(`${era.get('expname:50')}${s.f}以上(现在${s.exp50})且`);
      }
      era.print(
        `${era.get('ablname:17')}LV${s.lv + 1}以上(现在LV${c.read(['abl', 17])})且`,
      );
      era.print(
        `${era.get('ablname:0')}LV${s.lv + 1}以上(现在LV${c.read(['abl', 0])})且`,
      );
    },
    success: (lv) => `${era.get('ablname:31')}变为LV${lv}。`,
  },
  32: {
    id: 32,
    // 精液中毒。a(欲情)/b(屈服)/c(精液经验)
    tracks: {
      a: {
        table: [
          3000, 8000, 15000, 30000, 50000, 65000, 90000, 120000, 200000, 500000,
        ],
      },
      b: {
        table: [
          10000, 20000, 35000, 60000, 130000, 190000, 300000, 500000, 800000,
          1500000,
        ],
      },
      c: { table: [10, 25, 40, 80, 200, 500, 800, 1200, 1500, 2000] },
    },
    extra: (c) => {
      const extra = {};
      // 组合上限突破价：直接覆盖梯子值，先于戒备森严
      if (c.lv + c.read(['abl', 33]) + c.read(['abl', 39]) >= 10) {
        extra.a = c.lv * c.lv * 4000;
        extra.b = c.lv * c.lv * 19000;
      }
      // d（异常经验）：lv>=2 且无[不怕污臭/容易上瘾/倒错的/疯狂/喜欢精液]时 = lv-1
      const exempt =
        c.talent(61) === 0 &&
        c.talent(72) === 0 &&
        c.talent(80) === 0 &&
        c.talent(123) === 0 &&
        c.talent(47) === 0;
      extra.d = exempt && c.lv >= 2 ? c.lv - 1 : 0;
      return extra;
    },
    blocked: [
      {
        reason: 'talent',
        when: (c) =>
          c.lv >= 5 &&
          c.talent(76) === 0 &&
          c.talent(50) === 0 &&
          c.talent(61) === 0 &&
          c.talent(64) === 0 &&
          c.talent(47) === 0, // AND：全 0 才拦
        lines: '需要特殊素质才能继续提升',
      },
      { reason: 'max', when: (c) => c.lv >= 10, lines: '已达最高级' },
      {
        reason: 'combo',
        when: (c) => {
          const bulk = c.lv * c.lv;
          return (
            c.lv + c.read(['abl', 33]) + c.read(['abl', 39]) >= 10 &&
            (c.read(['juel', 5]) < bulk * 6500 ||
              c.read(['juel', 6]) < bulk * 19000)
          );
        },
        lines: (c) => {
          const bulk = c.lv * c.lv;
          return [
            {
              text: `精液中毒(${c.lv})＋百合中毒(${c.read(['abl', 33])})＋兽奸中毒(${c.read(['abl', 39])})上限为10`,
              wait: 'print',
            },
            {
              // 文案写 4000，判定用 6500，保留原样
              text: `至少达成${era.get('palamname:5')}点数${bulk * 4000}点或${era.get('palamname:6')}点数${bulk * 19000}点的其中一项`,
              wait: 'print',
            },
            '方可提升当前精液中毒的等级',
          ];
        },
      },
    ],
    mults: [
      ...guard_mults(['a', 'b', 'c'], GUARD_FROM_3), // 戒备森严（作用于覆盖后的 a/b/c）
      { talent: 11, factor: { a: 1.5, b: 1.5, c: 1.5 } }, // 反抗心
      { talent: 22, factor: { a: 0.95, b: 0.95, c: 0.95 } }, // 感情淡薄
      { talent: 24, factor: { a: 1.2, b: 1.2, c: 1.2 } }, // 保守的
      {
        talent: 32, // 压抑 / 开放
        factor: { a: 1.2, b: 1.2, c: 1.2 },
        else: { talent: 33, factor: { a: 0.8, b: 0.8, c: 0.8 } },
      },
      { talent: 34, factor: { a: 2.0, b: 2.0, c: 2.0 } }, // 抵抗
      { talent: 47, factor: { a: 0.5, b: 0.5, c: 0.5 } }, // 喜欢精液
      { talent: 52, factor: { a: 0.95, b: 0.95, c: 0.95 } }, // 擅用舌头
      {
        talent: 61, // 不怕污臭 / 反感污臭
        factor: { a: 0.9, b: 0.9, c: 0.9 },
        else: { talent: 62, factor: { a: 2.0, b: 2.0, c: 2.0 } },
      },
      { talent: 64, factor: { a: 0.9, b: 0.9, c: 0.9 } }, // 不怕脏
      { talent: 72, factor: { a: 0.5, b: 0.5, c: 0.5 } }, // 容易上瘾
      { talent: 73, factor: { a: 0.5, b: 0.5, c: 0.5 } }, // 容易陷落
      { talent: 76, factor: { a: 0.9, b: 0.9, c: 0.9 } }, // 淫乱
      { talent: 80, factor: { a: 0.75, b: 0.75, c: 0.75 } }, // 倒错的
      { talent: 87, factor: { a: 0.95, b: 0.95, c: 0.95 } }, // 小恶魔
      { talent: 123, factor: { a: 0.9, b: 0.9, c: 0.9 } }, // 疯狂
      { talent: 9, factor: { a: 0.9, b: 0.9, c: 0.9 } }, // 崩坏
    ],
    floors: ['a', 'b', 'c'],
    reads: {
      juel5: ['juel', 5],
      juel6: ['juel', 6],
      exp20: ['exp', 20],
      exp50: ['exp', 50],
    },
    shared_gates: [{ ref: ['exp', 50], below: 'd', bit: 2 }], // 异常经验不足，双轨同时命中
    options: [
      {
        id: 0, // 恒渲染
        gates: [
          { ref: ['juel', 5], below: 'a', bit: 1 },
          { ref: ['juel', 6], below: 'b', bit: 1 },
          { ref: ['exp', 20], below: 'c', bit: 2 },
          // 无淫乱：查侍奉精神；有淫乱：改查欲望。双轨同时命中
          {
            ref: ['abl', 16],
            below: 'lv+1',
            bit: 4,
            when: (s, c) => c.talent(76) === 0,
          },
          {
            ref: ['abl', 11],
            below: 'lv+1',
            bit: 4,
            when: (s, c) => c.talent(76) === 1,
          },
        ],
        deduct: [
          [['juel', 5], 'a'],
          [['juel', 6], 'b'],
        ],
        label: (s) =>
          `- ${era.get('palamname:5')}点数×${s.juel5}/${s.a} ……${get_ablup_state(s.i)}`,
        info: (s) => [
          `　　　${era.get('palamname:6')}点数×${s.juel6}/${s.b}`,
          `　　　${era.get('expname:20')}　${s.exp20}/${s.c}`,
        ],
      },
      {
        id: 1, // 恒渲染，无 256 分支
        gates: [
          { ref: ['juel', 5], below: 'a*3', bit: 1 },
          { ref: ['juel', 6], below: 'b*3', bit: 1 },
          { ref: ['exp', 20], below: 'c/2', bit: 2 },
          {
            ref: ['abl', 16],
            below: 'lv+1',
            bit: 4,
            when: (s, c) => c.talent(76) === 0,
          },
          {
            ref: ['abl', 11],
            below: 'lv+1',
            bit: 4,
            when: (s, c) => c.talent(76) === 1,
          },
        ],
        deduct: [
          [['juel', 5], 'a*3'],
          [['juel', 6], 'b*3'],
        ],
        label: (s) =>
          `- ${era.get('palamname:5')}点数×${s.juel5}/${s.a * 3} ……${get_ablup_state(s.j)}`,
        info: (s) => [
          `　　　${era.get('palamname:6')}点数×${s.juel6}/${s.b * 3}`,
          `　　　${era.get('expname:20')}　${s.exp20}/${Math.floor(s.c / 2)}`,
        ],
      },
    ],
    rows: (s, c) => {
      if (s.d > 0) {
        era.print(`${era.get('expname:50')}${s.d}以上(现在${s.exp50})且`);
      }
      if (c.talent(76) === 0) {
        era.print(
          `${era.get('ablname:16')}LV${s.lv + 1}以上(现在LV${c.read(['abl', 16])})且`,
        );
      } else if (c.talent(76) === 1) {
        era.print(
          `${era.get('ablname:11')}LV${s.lv + 1}以上(现在LV${c.read(['abl', 11])})且`,
        );
      }
    },
    success: (lv) => `${era.get('ablname:32')}变为LV${lv}。`,
  },
  33: {
    id: 33,
    // 百合中毒。a(欲情=屈服需求)/b([0] 阴核点数)/c(百合经验)
    tracks: {
      a: {
        table: [
          1200, 3900, 6000, 18000, 30000, 55000, 70000, 100000, 150000, 300000,
        ],
      },
      b: {
        table: [
          5000, 15000, 23000, 50000, 70000, 120000, 200000, 350000, 500000,
          800000,
        ],
      },
      c: { table: [300, 600, 1000, 1400, 2100, 3000, 4000, 5200, 6500, 8000] },
    },
    extra: (c) => {
      const extra = {};
      // 组合上限突破价：直接覆盖梯子值，先于戒备森严
      if (c.lv + c.read(['abl', 32]) + c.read(['abl', 39]) >= 10) {
        extra.a = c.lv * c.lv * 4000;
        extra.b = c.lv * c.lv * 10000;
      }
      // d（异常经验）：lv>=2 且无[容易上瘾/倒错的/双性恋/讨厌男人/疯狂]时 = lv-1
      const exempt =
        c.talent(72) === 0 &&
        c.talent(80) === 0 &&
        c.talent(81) === 0 &&
        c.talent(82) === 0 &&
        c.talent(123) === 0;
      extra.d = exempt && c.lv >= 2 ? c.lv - 1 : 0;
      return extra;
    },
    blocked: [
      // 男人直接返回：分隔线之前，无输出
      { reason: 'male', when: (c) => c.talent(122) !== 0, silent: true },
      {
        reason: 'talent',
        when: (c) =>
          c.lv >= 5 &&
          c.talent(76) === 0 &&
          c.talent(80) === 0 &&
          c.talent(81) === 0 &&
          c.talent(82) === 0,
        lines: '需要特殊素质才能继续提升',
      },
      { reason: 'max', when: (c) => c.lv >= 10, lines: '已达最高级' },
      {
        reason: 'combo',
        when: (c) => {
          const bulk = c.lv * c.lv;
          return (
            c.lv + c.read(['abl', 32]) + c.read(['abl', 39]) >= 10 &&
            (c.read(['juel', 5]) < bulk * 4000 ||
              c.read(['juel', 6]) < bulk * 4000 ||
              c.read(['juel', 0]) < bulk * 10000)
          );
        },
        lines: (c) => {
          const bulk = c.lv * c.lv;
          return [
            {
              text: `精液中毒(${c.read(['abl', 32])})＋百合中毒(${c.lv})＋兽奸中毒(${c.read(['abl', 39])})上限为10`,
              wait: 'print',
            },
            {
              text: `至少达成${era.get('palamname:5')}点数${bulk * 4000}点、${era.get('palamname:6')}点数${bulk * 4000}点或${era.get('palamname:0')}点数${bulk * 10000}点的其中一项`,
              wait: 'print',
            },
            '方可提升当前百合中毒的等级',
          ];
        },
      },
    ],
    mults: [
      ...guard_mults(['a', 'b', 'c'], GUARD_FROM_3), // 戒备森严（作用于覆盖后的 a/b/c）
      { talent: 11, factor: { a: 1.5, b: 1.5, c: 1.5 } }, // 反抗心
      { talent: 20, factor: { a: 1.2, b: 1.2, c: 1.2 } }, // 克制
      { talent: 21, factor: { a: 1.2, b: 1.2, c: 1.2 } }, // 冷漠
      { talent: 24, factor: { a: 1.5, b: 1.5, c: 1.5 } }, // 保守的（非 ablup22/23 的 ×1.20）
      {
        talent: 32, // 压抑 / 开放
        factor: { a: 1.2, b: 1.2, c: 1.2 },
        else: { talent: 33, factor: { a: 0.8, b: 0.8, c: 0.8 } },
      },
      { talent: 34, factor: { a: 2.0, b: 2.0, c: 2.0 } }, // 抵抗
      { talent: 52, factor: { a: 0.9, b: 0.9, c: 0.9 } }, // 擅用舌头
      { talent: 61, factor: { a: 0.95, b: 0.95, c: 0.95 } }, // 不怕污臭
      { talent: 63, factor: { a: 0.9, b: 0.9, c: 0.9 } }, // 献身的
      { talent: 64, factor: { a: 0.95, b: 0.95, c: 0.95 } }, // 不怕脏
      {
        talent: 70, // 接受快感 / 否定快感
        factor: { a: 0.9, b: 0.9, c: 0.9 },
        else: { talent: 71, factor: { a: 1.1, b: 1.1, c: 1.1 } },
      },
      { talent: 72, factor: { a: 0.5, b: 0.5, c: 0.5 } }, // 容易上瘾
      { talent: 73, factor: { a: 0.5, b: 0.5, c: 0.5 } }, // 容易陷落
      { talent: 76, factor: { a: 0.75, b: 0.75, c: 0.75 } }, // 淫乱
      { talent: 79, factor: { a: 2.0, b: 2.0, c: 2.0 } }, // 男人婆
      { talent: 80, factor: { a: 0.75, b: 0.75, c: 0.75 } }, // 倒错的
      { talent: 81, factor: { a: 0.5, b: 0.5, c: 0.5 } }, // 双性恋
      { talent: 82, factor: { a: 0.5, b: 0.5, c: 0.5 } }, // 讨厌男人
      { talent: 87, factor: { a: 0.9, b: 0.9, c: 0.9 } }, // 小恶魔
      { talent: 123, factor: { a: 0.5, b: 0.5, c: 0.5 } }, // 疯狂
      { talent: 9, factor: { a: 0.8, b: 0.8, c: 0.8 } }, // 崩坏
    ],
    floors: ['a', 'b', 'c'],
    reads: {
      juel0: ['juel', 0],
      juel5: ['juel', 5],
      juel6: ['juel', 6],
      exp40: ['exp', 40],
      exp50: ['exp', 50],
    },
    options: [
      {
        id: 0, // 恒渲染
        gates: [
          { ref: ['exp', 50], below: 'd', bit: 2 }, // 异常经验（另一轨没有对应选项，不需要第二个可否位）
          { ref: ['abl', 22], below: 'lv+1', bit: 4 }, // 百合气质门槛
          { ref: ['juel', 0], below: 'b', bit: 1 },
          { ref: ['juel', 5], below: 'a', bit: 1 },
          { ref: ['juel', 6], below: 'a', bit: 1 }, // 欲情/屈服需求同为 a
          { ref: ['exp', 40], below: 'c', bit: 2 },
        ],
        deduct: [
          [['juel', 0], 'b'],
          [['juel', 5], 'a'],
          [['juel', 6], 'a'],
        ],
        label: (s) =>
          `- ${era.get('palamname:0')}点数×${s.juel0}/${s.b} ……${get_ablup_state(s.i)}`,
        info: (s) => [
          `　　　${era.get('palamname:5')}点数×${s.juel5}/${s.a}`,
          `　　　${era.get('palamname:6')}点数×${s.juel6}/${s.a}`,
          `　　　${era.get('expname:40')}　${s.exp40}/${s.c}`,
        ],
      },
    ],
    rows: (s, c) => {
      if (s.d > 0) {
        era.print(`${era.get('expname:50')}${s.d}以上(现在${s.exp50})且`);
      }
      era.print(
        `${era.get('ablname:22')}LV${s.lv + 1}以上(现在LV${c.read(['abl', 22])})且`,
      );
    },
    success: (lv) => `${era.get('ablname:33')}变为LV${lv}。`,
  },
  37: {
    id: 37,
    // 卖淫中毒。a(恭顺)/b(欲情)/c(屈服)/d(卖淫经验)
    tracks: {
      a: {
        table: [
          2000, 5000, 8000, 14000, 22000, 34000, 55000, 80000, 150000, 300000,
        ],
      },
      b: {
        table: [
          3000, 8000, 15000, 30000, 50000, 80000, 120000, 180000, 300000,
          600000,
        ],
      },
      c: {
        table: [
          1000, 2500, 5500, 10000, 20000, 30000, 50000, 60000, 90000, 150000,
        ],
      },
      d: { table: [50, 100, 150, 250, 400, 500, 800, 1200, 2000, 3000] },
    },
    extra: (c) => {
      // 异常经验：lv>=2 且非[疯狂][崩坏] → f = lv-1，再由 17 项素质增减
      if (c.lv < 2 || c.talent(123) || c.talent(9)) return { f: 0 };
      let f = c.lv - 1;
      if (c.talent(33)) f -= 1; // 开放
      if (c.talent(70)) f -= 1; // 接受快感
      if (c.talent(72)) f -= 2; // 容易上瘾
      if (c.talent(73)) f -= 1; // 容易陷落
      if (c.talent(76)) f -= 1; // 淫乱
      if (c.talent(80)) f -= 1; // 倒錯的
      if (c.talent(180)) f -= 1; // 妓女
      if (c.talent(181)) f -= 2; // 倾城
      if (c.talent(11)) f += 1; // 反抗心
      if (c.talent(20)) f += 1; // 克制
      if (c.talent(32)) f += 1; // 压抑
      if (c.talent(34)) f += 1; // 抵抗
      if (c.talent(71)) f += 1; // 否定快感
      if (c.talent(85)) f += 1; // 爱慕
      if (c.talent(184)) f += 2; // 求爱
      if (f < 0) f = 0;
      return { f };
    },
    blocked: [
      {
        reason: 'talent',
        when: (c) =>
          c.lv >= 5 &&
          c.talent(76) === 0 &&
          c.talent(31) === 0 &&
          c.talent(180) === 0,
        lines: '需要特殊素质才能继续提升',
      },
      { reason: 'max', when: (c) => c.lv >= 10, lines: '已达最高级' },
    ],
    mults: [
      ...guard_mults(['a', 'b', 'c', 'd'], GUARD_FROM_3), // 戒备森严（a/b/c/d 全乘）
      { talent: 11, factor: { a: 1.5, b: 1.5, c: 1.5, d: 1.5 } }, // 反抗心
      { talent: 12, factor: { a: 1.2, b: 1.2, c: 1.2, d: 1.2 } }, // 刚强
      { talent: 20, factor: { a: 1.5, b: 1.5, c: 1.5, d: 1.5 } }, // 克制
      { talent: 24, factor: { a: 1.5, b: 1.5, c: 1.5, d: 1.5 } }, // 保守的
      { talent: 26, factor: { a: 0.9, b: 0.9, c: 0.9, d: 0.9 } }, // 悲观的
      { talent: 28, factor: { a: 0.9, b: 0.9, c: 0.9, d: 0.9 } }, // 爱表现
      {
        talent: 30, // 看重贞操 / 看轻贞操
        factor: { a: 2.0, b: 2.0, c: 2.0, d: 2.0 },
        else: { talent: 31, factor: { a: 0.9, b: 0.9, c: 0.9, d: 0.9 } },
      },
      {
        talent: 32, // 压抑 / 开放
        factor: { a: 1.2, b: 1.2, c: 1.2, d: 1.2 },
        else: { talent: 33, factor: { a: 0.8, b: 0.8, c: 0.8, d: 0.8 } },
      },
      { talent: 34, factor: { a: 2.0, b: 2.0, c: 2.0, d: 2.0 } }, // 抵抗
      {
        talent: 35, // 害羞 / 不知羞耻
        factor: { a: 1.1, b: 1.1, c: 1.1, d: 1.1 },
        else: { talent: 36, factor: { a: 0.9, b: 0.9, c: 0.9, d: 0.9 } },
      },
      { talent: 63, factor: { a: 0.9, b: 0.9, c: 0.9, d: 0.9 } }, // 献身的
      { talent: 72, factor: { a: 0.5, b: 0.5, c: 0.5, d: 0.5 } }, // 容易上瘾
      // 淫乱：b 轨 ×0.50 与其余 ×0.80 不同，保留原样
      { talent: 76, factor: { a: 0.8, b: 0.5, c: 0.8, d: 0.8 } },
      { talent: 82, factor: { a: 3.0, b: 3.0, c: 3.0, d: 3.0 } }, // 讨厌男人
      { talent: 85, factor: { a: 1.5, b: 1.5, c: 1.5, d: 1.5 } }, // 爱慕
      { talent: 153, factor: { a: 2.0, b: 2.0, c: 2.0, d: 2.0 } }, // 妊娠
      { talent: 123, factor: { a: 0.5, b: 0.5, c: 0.5, d: 0.5 } }, // 疯狂
      { talent: 9, factor: { a: 0.8, b: 0.8, c: 0.8, d: 0.8 } }, // 崩坏
      { talent: 180, factor: { a: 0.8, b: 0.8, c: 0.8, d: 0.8 } }, // 妓女
      { talent: 181, factor: { a: 0.5, b: 0.5, c: 0.5, d: 0.5 } }, // 倾城
      { talent: 183, factor: { a: 0.9, b: 0.9, c: 0.9, d: 0.9 } }, // 有常客
      { talent: 184, factor: { a: 2.0, b: 2.0, c: 2.0, d: 2.0 } }, // 求爱
    ],
    floors: ['a', 'b', 'c', 'd'], // 最低 1 点
    reads: {
      juel4: ['juel', 4],
      juel5: ['juel', 5],
      juel6: ['juel', 6],
      exp74: ['exp', 74],
      exp50: ['exp', 50],
    },
    options: [
      {
        id: 0,
        gates: [
          { ref: ['exp', 50], below: 'f', bit: 2 },
          { ref: ['abl', 11], below: 'lv+1', bit: 4 }, // 欲望门槛
          { ref: ['juel', 4], below: 'a', bit: 1 }, // 恭顺
          { ref: ['juel', 5], below: 'b', bit: 1 }, // 欲情
          { ref: ['juel', 6], below: 'c', bit: 1 }, // 屈服
          { ref: ['exp', 74], below: 'd', bit: 2 }, // 卖淫经验
        ],
        deduct: [
          [['juel', 4], 'a'],
          [['juel', 5], 'b'],
          [['juel', 6], 'c'],
        ],
        label: (s) =>
          `- ${era.get('palamname:4')}点数×${s.juel4}/${s.a} ……${get_ablup_state(s.i)}`,
        info: (s) => [
          `　　　${era.get('palamname:5')}点数×${s.juel5}/${s.b}`,
          `　　　${era.get('palamname:6')}点数×${s.juel6}/${s.c}`,
          `${era.get('expname:74')}　${s.exp74}/${s.d}`,
        ],
      },
    ],
    rows: (s, c) => {
      if (s.f > 0) {
        era.print(`${era.get('expname:50')}${s.f}以上(现在${s.exp50})且`);
      }
      era.print(
        `${era.get('ablname:11')}LV${s.lv + 1}以上(现在LV${c.read(['abl', 11])})且`,
      );
    },
    success: (lv) => `${era.get('ablname:37')}变为LV${lv}。`,
    // 卖淫中毒＋性交中毒合计 10 以上即不可提升——主流程没有这条额外门槛
    dry_decide: (s, c) => (c.lv + c.read(['abl', 38]) >= 10 ? null : s),
  },
  39: {
    id: 39,
    // 兽奸中毒。a/b(两珠同额)/c(兽奸经验)
    tracks: {
      a: {
        table: [
          2000, 5000, 10000, 20000, 30000, 45000, 75000, 100000, 200000, 300000,
        ],
      },
      b: {
        table: [
          2000, 5000, 10000, 20000, 30000, 45000, 75000, 100000, 200000, 300000,
        ],
      },
      c: { table: [30, 100, 220, 400, 800, 1600, 2000, 2800, 4000, 6000] },
    },
    extra: (c) => {
      const extra = {};
      // 三重上限时 A/B 覆盖为 lv²×4000（梯子作废）
      if (c.lv + c.read(['abl', 32]) + c.read(['abl', 33]) >= 10) {
        extra.a = c.lv * c.lv * 4000;
        extra.b = c.lv * c.lv * 4000;
      }
      // 异常经验：lv>=2 且无[容易上瘾][淫乱][牝犬] → f = lv+1
      const exempt =
        c.talent(72) === 0 && c.talent(76) === 0 && c.talent(136) === 0;
      extra.f = exempt && c.lv >= 2 ? c.lv + 1 : 0;
      return extra;
    },
    blocked: [
      {
        reason: 'talent',
        when: (c) =>
          c.lv >= 5 &&
          c.talent(76) === 0 &&
          c.talent(124) === 0 &&
          c.talent(136) === 0,
        lines: '需要特殊素质才能继续提升',
      },
      { reason: 'max', when: (c) => c.lv >= 10, lines: '已达最高级' },
      {
        // 精液+百合+兽奸三中毒合计 10 以上：两珠任一不足即拦
        reason: 'combo',
        when: (c) => {
          const bulk = c.lv * c.lv * 4000;
          return (
            c.lv + c.read(['abl', 32]) + c.read(['abl', 33]) >= 10 &&
            (c.read(['juel', 5]) < bulk || c.read(['juel', 6]) < bulk)
          );
        },
        lines: (c) => {
          const bulk = c.lv * c.lv * 4000;
          return [
            {
              text: `精液中毒(${c.read(['abl', 32])})＋百合中毒(${c.read(['abl', 33])})＋兽奸中毒(${c.lv})上限为10`,
              wait: 'print',
            },
            {
              text: `至少达成${era.get('palamname:5')}点数${bulk}点或${era.get('palamname:6')}点数${bulk}点的其中一项`,
              wait: 'print',
            },
            '方可提升当前兽奸中毒的等级',
          ];
        },
      },
    ],
    mults: [
      {
        // 戒备森严：分档判 ABL:37（卖淫中毒），不是本能力的等级，保留原样
        talent: 27,
        when: (c) => c.read(['abl', 37]) === 3,
        factor: { a: 2.0, b: 2.0, c: 2.0 },
        else: {
          talent: 27,
          when: (c) => c.read(['abl', 37]) === 4,
          factor: { a: 2.5, b: 2.5, c: 2.5 },
          else: {
            talent: 27,
            when: (c) => c.read(['abl', 37]) >= 5,
            factor: { a: 3.0, b: 3.0, c: 3.0 },
          },
        },
      },
      { talent: 20, factor: { a: 2.5, b: 2.5, c: 1.5 } }, // 克制（a/b 与 c 倍率不同）
      {
        talent: 70, // 接受快感（与否定快感互斥，只乘 a/b）
        factor: { a: 0.75, b: 0.75 },
        else: { talent: 71, factor: { a: 1.75, b: 1.75 } }, // 否定快感
      },
      { talent: 72, factor: { a: 0.5, b: 0.5, c: 0.5 } }, // 容易上瘾
      { talent: 80, factor: { a: 0.75, b: 0.75, c: 0.75 } }, // 倒錯的
      { talent: 123, factor: { a: 0.5, b: 0.5, c: 0.5 } }, // 疯狂
      { talent: 124, factor: { a: 0.8, b: 0.8, c: 0.8 } }, // 动物耳朵
      { talent: 136, factor: { a: 0.5, b: 0.5, c: 0.5 } }, // 牝犬
      { talent: 85, factor: { a: 1.8, b: 1.8, c: 1.5 } }, // 爱慕（心向主人，a/b 与 c 不同）
    ],
    floors: ['a', 'b', 'c'], // 最低 1 点
    reads: {
      juel5: ['juel', 5],
      juel6: ['juel', 6],
      exp56: ['exp', 56],
      exp50: ['exp', 50],
    },
    options: [
      {
        id: 0,
        gates: [
          { ref: ['abl', 11], below: 'lv+1', bit: 4 }, // 欲望门槛
          { ref: ['juel', 5], below: 'a', bit: 1 },
          { ref: ['juel', 6], below: 'b', bit: 1 },
          { ref: ['exp', 56], below: 'c', bit: 2 }, // 兽奸经验
          { ref: ['exp', 50], below: 'f', bit: 2 }, // 异常经验
        ],
        deduct: [
          [['juel', 5], 'a'],
          [['juel', 6], 'b'],
        ],
        label: (s) =>
          `- ${era.get('palamname:5')}点数×${s.juel5}/${s.a} ……${get_ablup_state(s.i)}`,
        info: (s) => [
          `　　　${era.get('palamname:6')}点数×${s.juel6}/${s.b}`,
          `${era.get('expname:56')}　${s.exp56}/${s.c}`,
        ],
      },
    ],
    rows: (s, c) => {
      if (s.f > 0) {
        era.print(`${era.get('expname:50')}${s.f}以上(现在${s.exp50})且`);
      }
      era.print(
        `${era.get('ablname:11')}LV${s.lv + 1}以上(现在LV${c.read(['abl', 11])})且`,
      );
    },
    success: (lv) => `${era.get('ablname:39')}变为LV${lv}。`,
    // 上限条件是 32+33+39 >= 30，与主流程的 >= 10 不同
    dry_decide: (s, c) =>
      c.lv + c.read(['abl', 32]) + c.read(['abl', 33]) >= 30 ? null : s,
  },
  40: {
    id: 40,
    line: false, // 本函数没有分隔线（原实现只在阻断时 printAndWait）
    // 露出癖。a＝局部点数需求；判 ABL:40 的等级，门槛查 ABL:11
    tracks: {
      a: {
        table: [
          2000, 5000, 10000, 20000, 30000, 45000, 75000, 100000, 200000, 300000,
        ],
      },
    },
    extra: (c) => {
      // 异常经验：lv>=2 且无[容易上瘾][淫乱] → f = lv+1
      const exempt = c.talent(72) === 0 && c.talent(76) === 0;
      return { f: exempt && c.lv >= 2 ? c.lv + 1 : 0 };
    },
    blocked: [{ reason: 'max', when: (c) => c.lv >= 10, lines: '已达到MAX' }],
    mults: [
      { talent: 20, factor: { a: 2.5 } }, // 克制
      {
        talent: 70, // 接受快感（与否定快感互斥）
        factor: { a: 0.75 },
        else: { talent: 71, factor: { a: 1.75 } }, // 否定快感
      },
      { talent: 72, factor: { a: 0.5 } }, // 容易上瘾
      { talent: 80, factor: { a: 0.75 } }, // 倒錯的
      { talent: 123, factor: { a: 0.5 } }, // 疯狂
    ],
    floors: ['a'],
    reads: { juel15: ['juel', 15], exp50: ['exp', 50] },
    options: [
      {
        id: 0,
        gates: [
          { ref: ['abl', 11], below: 'lv+1', bit: 4 }, // 欲望门槛（判 ABL:40+1）
          { ref: ['juel', 15], below: 'a', bit: 1 },
          { ref: ['exp', 50], below: 'f', bit: 2 }, // 异常经验
        ],
        deduct: [[['juel', 15], 'a']],
        label: (s) =>
          `- ${era.get('palamname:15')}点数×${s.juel15}/${s.a} ……${status_of(s.i, POINT_EXP_ABILITY_PARTS)}`,
        blocked_text: '条件不足',
      },
    ],
    stop: '- 放弃',
    rows: (s, c) => {
      if (s.f > 0) {
        era.print(`${era.get('expname:50')}${s.f}以上(现在${s.exp50})`);
      }
      // 显示 ABL:39+1（与判定的 ABL:40+1 不一致，保留原样）
      era.print(
        `${era.get('ablname:11')}LV${c.read(['abl', 39]) + 1}以上(现在LV${c.read(['abl', 11])})`,
      );
    },
    success: (lv) => `${era.get('ablname:40')}变为LV${lv}。`, // 译法见文件头
  },
  99: {
    id: 99,
    level: ['mark', 3], // 反抗刻印：升级即刻印 -1
    level_delta: -1,
    // 反抗刻印的消解。a＝消解一格所需的屈服点数，按刻印等级分档
    tracks: {
      a: {
        table: [0, 5000, 10000, 50000],
        // Lv4 以上沿用 Lv3 的档位（rate 100＝不变）
        bands: [{ from: 4, base: 50000, rate: 100 }],
      },
    },
    blocked: [
      {
        reason: 'none',
        when: (c) => c.lv <= 0,
        lines: [{ text: '不存在反抗行为', wait: 'anykey' }],
      },
    ],
    mults: [
      { talent: 12, factor: { a: 3.0 } }, // 刚强
      { talent: 16, factor: { a: 1.5 } }, // 嚣张
      { talent: 13, factor: { a: 0.5 } }, // 坦率
      { talent: 85, factor: { a: 0.5 } }, // 爱慕
    ],
    reads: { juel6: ['juel', 6] },
    options: [
      {
        id: 0,
        gates: [
          { ref: ['mark', 2], below: 'lv', bit: 2 }, // 屈服刻印门槛
          { ref: ['abl', 10], below: 'lv+2', bit: 4 }, // 反抗刻印+2 的顺从
          { ref: ['juel', 6], below: 'a', bit: 1 }, // 屈服珠
        ],
        deduct: [[['juel', 6], 'a']],
        label: (s) =>
          `- ${era.get('palamname:6')}点数×${s.juel6}/${s.a} ……${get_ablup_state(s.i)}`,
      },
    ],
    rows: (s, c) => {
      era.print(
        `${era.get('markname:2')}${s.lv}以上(现在LV${c.read(['mark', 2])})且`,
      );
      era.print(
        `${era.get('ablname:10')}LV${s.lv + 2}以上(现在LV${c.read(['abl', 10])})必要`,
      );
    },
    success: (lv) => `${era.get('markname:3')}下降为LV${lv}。`,
  },
  100: {
    id: 100,
    level: ['mark', 10], // 异界异常反应：升级即刻印 -1
    level_delta: -1,
    // 异界异常的平息。a＝所需的异界经验（EXP:99）点数
    tracks: {
      a: {
        table: [0, 2000, 5000, 15000, 30000, 50000],
        // Lv6 以上沿用 Lv5 的档位（rate 100＝不变）
        bands: [{ from: 6, base: 50000, rate: 100 }],
      },
    },
    extra: (c) => {
      // 各处感觉总计（五项：阴蒂/乳房/私处/肛门/局部）与战斗等级门槛
      const sum =
        c.read(['abl', 0]) +
        c.read(['abl', 1]) +
        c.read(['abl', 2]) +
        c.read(['abl', 3]) +
        c.read(['abl', 4]);
      return { c: sum, b: c.lv * 10 };
    },
    blocked: [
      {
        reason: 'none',
        when: (c) => c.lv <= 0,
        lines: [{ text: '并没有异界异常反应', wait: 'anykey' }],
      },
    ],
    mults: [
      { talent: 10, factor: { a: 1.2 } }, // 胆小
      { talent: 172, factor: { a: 0.8 } }, // 智慧
      { talent: 12, factor: { a: 1.8 } }, // 刚强
      { talent: 16, factor: { a: 1.2 } }, // 嚣张
      { talent: 13, factor: { a: 0.5 } }, // 坦率
      { talent: 85, factor: { a: 0.5 } }, // 爱慕
      { talent: 76, factor: { a: 0.7 } }, // 淫乱
    ],
    floors: ['a'],
    reads: { exp99: ['exp', 99] },
    options: [
      {
        id: 0,
        gates: [
          // 两道门槛各自计数，m==2 才 |=4（OR 关系：过一道即可）
          {
            bit: 4,
            when: (s, c) => {
              let m = 0;
              if (c.lv < s.c - 5) m += 1;
              if (s.b > c.read(['cflag', 9])) m += 1;
              return m === 2;
            },
          },
          { ref: ['exp', 99], below: 'a', bit: 2 },
        ],
        deduct: [[['exp', 99], 'a']],
        label: (s) =>
          `- ${era.get('expname:99')}点数×${s.exp99}/${s.a} ……${get_ablup_state(s.i)}`,
      },
    ],
    rows: (s, c) => {
      era.print(`各处感觉总计${s.lv + 5}以上(现在${s.c})或`);
      era.print(
        `战斗等级LV${s.b}以上(现在LV${c.read(['cflag', 9])})必要，然后`,
      );
    },
    success: (lv) => `${era.get('markname:10')}下降为LV${lv}。`,
  },
  5: {
    id: 5,
    // （不可达）a＝点数需求、b＝肛门经验门槛；两档需求按 EXP:1 是否达到 EXPLV 阈值分叉
    tracks: {},
    extra: (c) => {
      const exp1 = c.read(['exp', 1]);
      // 原实现把两档写死在各级分支里：Lv1/2 与 Lv3 以上各有一处 EXPLV 比较
      const rows = [
        [1, 2],
        [exp1 >= EXPLV[3] ? 20 : 50, 10],
        [exp1 >= EXPLV[4] ? 100 : 600, 30],
        [exp1 >= EXPLV[5] ? 500 : 7000, 150],
        [exp1 >= EXPLV[5] ? 8000 : 45000, 300],
      ];
      return { a: rows[c.lv][0], b: rows[c.lv][1] };
    },
    blocked: [{ reason: 'max', when: (c) => c.lv >= 5, lines: '已达到MAX。' }],
    mults: [
      { talent: 27, lv: 3, factor: { a: 2.0, b: 2.0 } }, // 戒备森严
      { talent: 27, lv_min: 4, factor: { a: 3.0, b: 3.0 } },
    ],
    reads: { juel2: ['juel', 2], exp1: ['exp', 1] },
    options: [
      {
        id: 0,
        gates: [
          { ref: ['juel', 2], below: 'a', bit: 1 },
          { ref: ['exp', 1], below: 'b', bit: 2 },
        ],
        deduct: [[['juel', 2], 'a']],
        // （无 JUEL 现值，只显示需求 a）
        label: (s) =>
          `- ${era.get('palamname:2')}点数×${s.a}、${era.get('expname:1')}${s.b}以上……${status_of(s.i, POINT_EXP_PARTS)}`,
        blocked_text: '条件不足。',
      },
    ],
    stop: '- 放弃',
    // 名称前缀留空：ABLNAME:5～9 在 Abl.yml 里没有条目
    success: (lv) => `变为LV${lv}。`, // （等待）
    success_wait: true,
  },
  6: {
    id: 6,
    // （不可达）a＝习得点数、b＝恭顺点数、c＝欲情点数；d/e 是经验门槛
    tracks: {
      a: { table: [100, 1200, 5000, 10000, 30000] },
      b: { table: [20, 100, 600, 2000, 8000] },
      c: { table: [100, 0, 0, 0, 0] },
      d: { table: [1, 1, 20, 20, 100] },
      e: { table: [1, 3, 6, 10, 20] },
    },
    blocked: [{ reason: 'max', when: (c) => c.lv >= 5, lines: '已达到MAX。' }],
    mults: [
      ...guard_mults(
        ['a', 'b', 'd'],
        [
          [3, 2.0],
          [4, 3.0],
        ],
      ), // 戒备森严：只乘 a/b/d
      { talent: 80, factor: { a: 0.75, b: 0.75, c: 0.75, d: 0.75 } }, // 倒错的：不含 e
    ],
    reads: {
      juel6: ['juel', 6],
      juel4: ['juel', 4],
      juel7: ['juel', 7],
      exp2: ['exp', 2],
      exp20: ['exp', 20],
      exp21: ['exp', 21],
      exp50: ['exp', 50],
    },
    shared_gates: [
      // 门槛读 ABL:0（阴蒂感觉），需达到本次升级后等级+1，三个选项共享
      { ref: ['abl', 0], below: 'lv+1', bit: 4 },
      // 3→4 需异常经验 1 次、4→5 需 2 次，[妄信] 可跳过
      {
        ref: ['exp', 50],
        below: 1,
        bit: 2,
        when: (s, c) => c.lv === 3 && c.talent(86) === 0,
      },
      {
        ref: ['exp', 50],
        below: 2,
        bit: 2,
        when: (s, c) => c.lv === 4 && c.talent(86) === 0,
      },
    ],
    options: [
      {
        id: 0, // 恒渲染
        gates: [
          { ref: ['juel', 6], below: 'a', bit: 1 },
          { ref: ['exp', 2], below: 'e', bit: 2 }, // 绝顶经验
          { ref: ['exp', 20], below: 'e', bit: 2 }, // 精液经验（同一个 bit）
        ],
        deduct: [[['juel', 6], 'a']],
        blocked_text: '条件不足。请重新输入。',
        label: (s) => {
          let text = `- ${era.get('palamname:6')}点数×${s.a}`;
          if (s.e > 0) {
            text += `、${era.get('expname:2')}${s.e}以上、${era.get('expname:20')}${s.e}以上`;
          }
          return `${text}……${status_of(s.i, POINT_EXP_ABILITY_PARTS)}`;
        },
      },
      {
        id: 1,
        need: 'b',
        gates: [
          { ref: ['juel', 4], below: 'b', bit: 1 },
          { ref: ['exp', 21], below: 'd', bit: 2 },
        ],
        deduct: [[['juel', 4], 'b']],
        blocked_text: '条件不足。请重新输入。',
        label: (s) => {
          let text = `- ${era.get('palamname:4')}点数×${s.b}`;
          if (s.d > 0) text += `、${era.get('expname:21')}${s.d}以上`;
          return `${text}……${status_of(s.j, POINT_EXP_ABILITY_PARTS)}`;
        },
      },
      {
        id: 2,
        need: 'c',
        gates: [
          { ref: ['juel', 7], below: 'c', bit: 1 }, // 习得点数需求（与按钮显示的×c、扣款 c 同变量）
          { ref: ['exp', 2], below: 1, bit: 2 }, // 绝顶经验≥1，写死的 1
        ],
        deduct: [[['juel', 7], 'c']],
        blocked_text: '条件不足。请重新输入。',
        label: (s) =>
          `- ${era.get('palamname:7')}点数×${s.c}、${era.get('expname:2')}1以上……${status_of(s.k, POINT_EXP_ABILITY_PARTS)}`,
      },
    ],
    // 门槛行与异常经验行都在循环内：引擎每次 input 后清空按钮注册，重试必须全重渲
    rows: (s, c) => {
      era.print(`${era.get('ablname:0')}${s.lv + 1}LV以上`);
      if (c.lv === 3 && c.talent(86) === 0) {
        era.print(`${era.get('expname:50')}有`);
      } else if (c.lv === 4 && c.talent(86) === 0) {
        era.print(`${era.get('expname:50')}2以上`);
      }
    },
    stop: '- 放弃',
    success: (lv) => `变为LV${lv}。`, // （等待）
    success_wait: true,
  },
  7: {
    id: 7,
    // （不可达）a＝欲情点数需求；两条经验门槛（TALENT:28 那条与 ABL:2/11 那条）
    tracks: {
      a: { table: [100, 1000, 5000, 15000, 35000] },
    },
    blocked: [{ reason: 'max', when: (c) => c.lv >= 5, lines: '已达到MAX。' }],
    stop: '- 放弃',
    mults: [
      { talent: 27, lv: 3, factor: { a: 2.0 } }, // 戒备森严：仅 Lv3/Lv4 两档
      { talent: 27, lv: 4, factor: { a: 3.0 } },
      { talent: 80, factor: { a: 0.75 } }, // 倒错的
      { talent: 28, factor: { a: 0.5 } }, // 爱表现
    ],
    reads: {
      juel8: ['juel', 8],
      exp2: ['exp', 2],
      exp11: ['exp', 11],
      exp50: ['exp', 50],
    },
    options: [
      {
        id: 0,
        gates: [
          { ref: ['abl', 1], below: 'lv+1', bit: 4 }, // 乳房感觉门槛
          {
            ref: ['exp', 50],
            below: 1,
            bit: 2,
            when: (s, c) => c.lv === 3 && c.talent(28) === 0,
          },
          {
            ref: ['exp', 50],
            below: 2,
            bit: 2,
            when: (s, c) => c.lv === 4 && c.talent(28) === 0,
          },
          { ref: ['juel', 8], below: 'a', bit: 1 },
          // 始终生效的第二条经验门槛，与 TALENT:28 那条互相独立
          { ref: ['exp', 2], below: 1, bit: 2, when: (s) => s.lv < 2 },
          { ref: ['exp', 11], below: 1, bit: 2, when: (s) => s.lv >= 2 },
        ],
        deduct: [[['juel', 8], 'a']],
        // 本函数三个分支都带尾随空格，与共用位表仅差在 bit4
        label: (s) => {
          const exp_line =
            s.lv < 2
              ? `${era.get('expname:2')}1以上`
              : `${era.get('expname:11')}1以上`;
          return `- ${era.get('palamname:8')}点数×${s.a}、${exp_line}……${status_of(s.i, SPACED_PARTS)}`;
        },
        blocked_text: '条件不满足。',
      },
    ],
    rows: (s, c) => {
      era.print(`${era.get('ablname:1')}${s.lv + 1}LV以上`);
      if (c.lv === 3 && c.talent(28) === 0) {
        era.print(`${era.get('expname:50')}有`);
      } else if (c.lv === 4 && c.talent(28) === 0) {
        era.print(`${era.get('expname:50')}2以上`);
      }
    },
    success: (lv) => `的等级提升到${lv}级了。`, // （等待）
    success_wait: true,
  },
  8: {
    id: 8,
    // （不可达）a/b 只在 Lv0-2 非零，c/d/e 只在 Lv3-4 非零
    tracks: {
      a: { table: [100, 500, 1200, 0, 0] },
      b: { table: [100, 500, 1000, 0, 0] },
      c: { table: [0, 0, 0, 10, 50] },
      d: { table: [100, 500, 1500, 3000, 5000] },
      e: { table: [100, 300, 1000, 6000, 12000] },
    },
    blocked: [{ reason: 'max', when: (c) => c.lv >= 5, lines: '已达到MAX。' }],
    stop: '- 放弃',
    mults: [
      ...guard_mults(
        ['c', 'd', 'e'],
        [
          [3, 2.0],
          [4, 3.0],
        ],
      ), // 戒备森严：c/d/e 三列
      { talent: 33, factor: { a: 0.5, b: 0.5, c: 0.5, d: 0.5, e: 0.5 } }, // 开放（先于倒错的）
      { talent: 80, factor: { a: 0.75, b: 0.75, c: 0.75, d: 0.75, e: 0.75 } }, // 倒错的：五个变量都受影响
    ],
    reads: {
      juel9: ['juel', 9],
      juel5: ['juel', 5],
      juel6: ['juel', 6],
      exp30: ['exp', 30],
      exp2: ['exp', 2],
      exp50: ['exp', 50],
    },
    shared_gates: [
      { ref: ['abl', 1], below: 'lv+1', bit: 4 }, // 乳房感觉门槛：两个选项共享
      {
        ref: ['exp', 50],
        below: 1,
        bit: 2,
        when: (s, c) => c.lv === 3 && c.talent(33) === 0,
      },
      {
        ref: ['exp', 50],
        below: 2,
        bit: 2,
        when: (s, c) => c.lv === 4 && c.talent(33) === 0,
      },
    ],
    options: [
      {
        id: 0,
        need: 'b',
        hide: 'keep', // b===0 时 [0] 不渲染也不设哨兵，位保持共享位
        gates: [
          { ref: ['juel', 9], below: 'a', bit: 1 },
          { ref: ['juel', 5], below: 'b', bit: 1 },
          { ref: ['exp', 30], below: 'c', bit: 2 }, // b>0 时 c 恒为 0，此判定恒假，保留原样
        ],
        deduct: [
          [['juel', 9], 'a'],
          [['juel', 5], 'b'],
        ],
        blocked_text: '条件不足。',
        label: (s) => {
          let text = `- ${era.get('palamname:9')}点数×${s.a}、${era.get('palamname:5')}点数×${s.b}`;
          if (s.c > 0) text += `、${era.get('expname:30')}${s.c}以上`;
          return `${text}……${status_of(s.i, POINT_EXP_ABILITY_PARTS)}`;
        },
      },
      {
        id: 1,
        need: 'd',
        gates: [
          { ref: ['juel', 9], below: 'd', bit: 1 },
          { ref: ['juel', 6], below: 'e', bit: 1 },
          { ref: ['exp', 30], below: 'c', bit: 2 },
          { ref: ['exp', 2], below: 1, bit: 2 },
        ],
        deduct: [
          [['juel', 9], 'd'],
          [['juel', 6], 'e'],
        ],
        blocked_text: '条件不足。',
        label: (s) => {
          let text = `- ${era.get('palamname:9')}点数×${s.d}、${era.get('palamname:6')}点数×${s.e}`;
          if (s.c > 0) text += `、${era.get('expname:30')}${s.c}以上`;
          return `${text}、${era.get('expname:2')}1以上……${status_of(s.j, POINT_EXP_ABILITY_PARTS)}`;
        },
      },
    ],
    rows: (s, c) => {
      era.print(`${era.get('ablname:1')}${s.lv + 1}LV以上`);
      if (c.lv === 3 && c.talent(33) === 0) {
        era.print(`${era.get('expname:50')}有`);
      } else if (c.lv === 4 && c.talent(33) === 0) {
        era.print(`${era.get('expname:50')}2以上`);
      }
    },
    success: (lv) => `变为LV${lv}。`, // （等待）
    success_wait: true,
  },
  9: {
    id: 9,
    // （不可达）a/b 为 [0] 轨的两珠、c 为 [2] 轨、d 只在 Lv0-1 非零
    tracks: {
      a: { table: [200, 1000, 3000, 8000, 20000] },
      b: { table: [50, 200, 500, 1000, 2000] },
      c: { table: [0, 0, 1000, 2000, 5000] },
      d: { table: [1000, 5000, 0, 0, 0] },
    },
    blocked: [{ reason: 'max', when: (c) => c.lv >= 5, lines: '已达到MAX。' }],
    stop: '- 放弃',
    mults: [
      ...guard_mults(
        ['a', 'b', 'c'],
        [
          [3, 2.0],
          [4, 3.0],
        ],
      ), // 戒备森严
      { talent: 81, factor: { a: 0.25, b: 0.25, c: 0.25, d: 0.25 } }, // 双性恋（先于倒错的）
      { talent: 80, factor: { a: 0.75, b: 0.75, c: 0.75, d: 0.75 } }, // 倒错的
    ],
    reads: {
      juel5: ['juel', 5],
      juel6: ['juel', 6],
      juel0: ['juel', 0],
      exp40: ['exp', 40],
      exp50: ['exp', 50],
    },
    options: [
      {
        id: 0, // 恒渲染
        gates: [
          {
            ref: ['exp', 50],
            below: 1,
            bit: 2,
            when: (s, c) => c.lv === 3 && c.talent(81) === 0,
          },
          {
            ref: ['exp', 50],
            below: 2,
            bit: 2,
            when: (s, c) => c.lv === 4 && c.talent(81) === 0,
          },
          { ref: ['juel', 5], below: 'a', bit: 1 },
          { ref: ['juel', 6], below: 'c', bit: 1 },
          { ref: ['exp', 40], below: 'b', bit: 2 },
        ],
        deduct: [
          [['juel', 5], 'a'],
          [['juel', 6], 'c'],
        ],
        blocked_text: '条件不足。',
        label: (s) => {
          let text = `- ${era.get('palamname:5')}点数×${s.a}`;
          if (s.c > 0) text += `、${era.get('palamname:6')}点数×${s.c}`;
          return `${text}、${era.get('expname:40')}${s.b}以上……${status_of(s.i, POINT_EXP_ABILITY_PARTS)}`;
        },
      },
      {
        id: 1,
        need: 'd',
        gates: [
          { ref: ['juel', 0], below: 'd', bit: 1 },
          { ref: ['exp', 40], below: 'b', bit: 2 },
        ],
        deduct: [[['juel', 0], 'd']],
        blocked_text: '条件不足。',
        label: (s) =>
          `- ${era.get('palamname:0')}点数×${s.d}、${era.get('expname:40')}${s.b}以上……${status_of(s.j, POINT_EXP_ABILITY_PARTS)}`,
      },
    ],
    // 只有异常经验行，没有门槛行
    rows: (s, c) => {
      if (c.lv === 3 && c.talent(81) === 0) {
        era.print(`${era.get('expname:50')}有`);
      } else if (c.lv === 4 && c.talent(81) === 0) {
        era.print(`${era.get('expname:50')}2以上`);
      }
    },
    success: (lv) => `变为LV${lv}。`, // （等待）
    success_wait: true,
  },
  // —— 后续能力的规格续写在此行之前 ——
};

// ════ 主流程与判定/干跑出口 ════
//
// 每个能力的入口都是同一份规格的薄壳：主流程走 run_ablup 的循环，判定与干跑
// 读同一份求值结果。
const decide_run = async (spec, cid) => {
  const r = await run_ablup(spec, cid, 'decide');
  if (r === null || r === undefined) return 0;
  const usable = spec.options.some(
    (opt, index) => r[opt.bit ?? BIT_NAMES[index]] === 0,
  );
  return usable ? 1 : 0;
};
const core_run = async (spec, cid) => {
  await run_ablup(spec, cid, 'core');
  return 0;
};
const ablup1 = (cid) => run_ablup(ABLUP_SPECS[1], cid);
const evaluate_ablup1 = (cid) => evaluate_ablup(ABLUP_SPECS[1], cid);
const decide_ablup1 = (cid) => decide_value(ABLUP_SPECS[1], cid);
const core_ablup1 = (cid) => core_value(ABLUP_SPECS[1], cid);
const ablup2 = (cid) => run_ablup(ABLUP_SPECS[2], cid);
const evaluate_ablup2 = (cid) => evaluate_ablup(ABLUP_SPECS[2], cid);
const decide_ablup2 = (cid) => decide_value(ABLUP_SPECS[2], cid);
const core_ablup2 = (cid) => core_value(ABLUP_SPECS[2], cid);
const ablup3 = (cid) => run_ablup(ABLUP_SPECS[3], cid);
const evaluate_ablup3 = (cid) => evaluate_ablup(ABLUP_SPECS[3], cid);
const decide_ablup3 = (cid) => decide_value(ABLUP_SPECS[3], cid);
const core_ablup3 = (cid) => core_value(ABLUP_SPECS[3], cid);
const ablup4 = (cid) => run_ablup(ABLUP_SPECS[4], cid);
const evaluate_ablup4 = (cid) => evaluate_ablup(ABLUP_SPECS[4], cid);
const decide_ablup4 = (cid) => decide_value(ABLUP_SPECS[4], cid);
const ablup10 = (cid) => run_ablup(ABLUP_SPECS[10], cid);
const evaluate_ablup10 = (cid) => evaluate_ablup(ABLUP_SPECS[10], cid);
const decide_ablup10 = (cid) => decide_value(ABLUP_SPECS[10], cid);
const core_ablup10 = (cid) => core_value(ABLUP_SPECS[10], cid);
const ablup11 = (cid, mode) => run_ablup(ABLUP_SPECS[11], cid, mode);
const ablup12 = (cid, mode) => run_ablup(ABLUP_SPECS[12], cid, mode);
const ablup13 = (cid, mode) => run_ablup(ABLUP_SPECS[13], cid, mode);
const ablup14 = (cid, mode) => run_ablup(ABLUP_SPECS[14], cid, mode);
const ablup15 = (cid, mode) => run_ablup(ABLUP_SPECS[15], cid, mode);
const ablup16 = (cid, mode) => run_ablup(ABLUP_SPECS[16], cid, mode);
const ablup17 = (cid, mode) => run_ablup(ABLUP_SPECS[17], cid, mode);
const ablup20 = (cid) => run_ablup(ABLUP_SPECS[20], cid);
const ablup21 = (cid) => run_ablup(ABLUP_SPECS[21], cid);
const ablup22 = (cid) => run_ablup(ABLUP_SPECS[22], cid);
const ablup23 = (cid) => run_ablup(ABLUP_SPECS[23], cid);
const ablup30 = (cid) => run_ablup(ABLUP_SPECS[30], cid);
const ablup31 = (cid) => run_ablup(ABLUP_SPECS[31], cid);
const ablup32 = (cid) => run_ablup(ABLUP_SPECS[32], cid);
const ablup33 = (cid) => run_ablup(ABLUP_SPECS[33], cid);
const ablup37 = (cid, mode) => run_ablup(ABLUP_SPECS[37], cid, mode);
const ablup39 = (cid, mode) => run_ablup(ABLUP_SPECS[39], cid, mode);
const ablup40 = (cid, mode) => run_ablup(ABLUP_SPECS[40], cid, mode);
const ablup99 = (cid, mode) => run_ablup(ABLUP_SPECS[99], cid, mode);
const ablup100 = (cid) => run_ablup(ABLUP_SPECS[100], cid);
const ablup5 = (cid) => run_ablup(ABLUP_SPECS[5], cid);
const ablup6 = (cid) => run_ablup(ABLUP_SPECS[6], cid);
const ablup7 = (cid) => run_ablup(ABLUP_SPECS[7], cid);
const ablup8 = (cid) => run_ablup(ABLUP_SPECS[8], cid);
const ablup9 = (cid) => run_ablup(ABLUP_SPECS[9], cid);
// —— 各能力的出口绑在此行之前 ——

const ablup0 = (cid) => run_ablup(ABLUP_SPECS[0], cid);
const evaluate_ablup0 = (cid) => evaluate_ablup(ABLUP_SPECS[0], cid);
const decide_ablup0 = (cid) => decide_value(ABLUP_SPECS[0], cid);
const core_ablup0 = (cid) => core_value(ABLUP_SPECS[0], cid);

// ———— decide_ablup 族 / auto_ablup / userablup ————
//
// 这三个函数与上面各能力的主流程是两条通路：
//   * decide_ablup / decide_ablupN —— 可提升判定，菜单用它打 `*`
//     （page-ablup.js 的 show_ablup_select）；
//   * auto_ablup + auto_ablup_core —— FLAG:5 位 35 打开时的自动提升，
//     由 juel-check 与 event-autotrain 各调一次。
//
// 判定的真身只有一份：各主流程在 0-4/10 抽出纯函数 evaluate_ablupN，
// 其余编号用主流程的 mode='decide'/'core' 干跑（见各函数内的干跑出口）。
// 两种写法的差别只是「梯子是否规整」，语义都是同一个判定。

/**
 * decide_ablup 的分发：能力编号 → decide_ablupN 的返回值。
 * 编号集合即下表；未登记编号返回 0——ablup20～ablup33 没有对应的
 * 判定函数，这几行不打 `*`。
 * @param {number} cid 角色 ID
 * @param {number} x 能力编号
 * @returns {Promise<number>} 1 = 可提升 / 0 = 不可
 */
async function decide_ablup(cid, x) {
  const handler = DECIDE_HANDLERS[x];
  if (!handler) return 0;
  return await handler(cid);
}

/** decide_ablup11 的返回值语义（i==0 才可提升），干跑主流程 */
const decide_ablup11 = (cid) => decide_run(ABLUP_SPECS[11], cid);
/** core_ablup11：干跑主流程的 mode='core'（ABL:11 ++，i==0 时扣珠） */
const core_ablup11 = (cid) => core_run(ABLUP_SPECS[11], cid);
/** decide_ablup12 的返回值语义（组合上限即 0，见干跑出口） */
const decide_ablup12 = (cid) => decide_run(ABLUP_SPECS[12], cid);
/** core_ablup12：干跑主流程的 mode='core'（只扣珠，不扣钱） */
const core_ablup12 = (cid) => core_run(ABLUP_SPECS[12], cid);
/** decide_ablup13 的返回值语义 */
const decide_ablup13 = (cid) => decide_run(ABLUP_SPECS[13], cid);
/** core_ablup13：干跑主流程的 mode='core' */
const core_ablup13 = (cid) => core_run(ABLUP_SPECS[13], cid);
/** decide_ablup14 的返回值语义（干跑与主流程同查 >= 10；
 * 与 == 10 同效：到达 >10 无路径） */
const decide_ablup14 = (cid) => decide_run(ABLUP_SPECS[14], cid);
/** core_ablup14：干跑主流程的 mode='core' */
const core_ablup14 = (cid) => core_run(ABLUP_SPECS[14], cid);
/** decide_ablup15 的返回值语义（组合上限即 0） */
const decide_ablup15 = (cid) => decide_run(ABLUP_SPECS[15], cid);
/** core_ablup15：干跑主流程的 mode='core' */
const core_ablup15 = (cid) => core_run(ABLUP_SPECS[15], cid);
/** decide_ablup16 的返回值语义（任一轨道可提升即 1；素质复查
 * 与入口把关同条件，见干跑出口） */
const decide_ablup16 = (cid) => decide_run(ABLUP_SPECS[16], cid);
/** core_ablup16：干跑主流程的 mode='core'（i→j→k 优先级扣珠） */
const core_ablup16 = (cid) => core_run(ABLUP_SPECS[16], cid);
/** decide_ablup17 的返回值语义 */
const decide_ablup17 = (cid) => decide_run(ABLUP_SPECS[17], cid);
/** core_ablup17：干跑主流程的 mode='core' */
const core_ablup17 = (cid) => core_run(ABLUP_SPECS[17], cid);
/** decide_ablup37 的返回值语义 */
const decide_ablup37 = (cid) => decide_run(ABLUP_SPECS[37], cid);
/** core_ablup37：干跑主流程的 mode='core' */
const core_ablup37 = (cid) => core_run(ABLUP_SPECS[37], cid);
/** decide_ablup39 的返回值语义 */
const decide_ablup39 = (cid) => decide_run(ABLUP_SPECS[39], cid);
/** core_ablup39：干跑主流程的 mode='core' */
const core_ablup39 = (cid) => core_run(ABLUP_SPECS[39], cid);
/** decide_ablup40 的返回值语义（没有对应的 core_ablup40，见 ablup40 干跑出口） */
const decide_ablup40 = (cid) => decide_run(ABLUP_SPECS[40], cid);
/** decide_ablup99 的返回值语义 */
const decide_ablup99 = (cid) => decide_run(ABLUP_SPECS[99], cid);
/** core_ablup99：干跑主流程的 mode='core'（MARK:3 --） */
const core_ablup99 = (cid) => core_run(ABLUP_SPECS[99], cid);

/**
 * decide_ablup 的分发目标。20-23/30-33 没有对应的判定函数（#466
 * 实现各自主流程时未补判定），落空时不打 `*`——表里只登记已实现
 * 判定的编号（0-4/10-17/37/39/40/99）。
 */
const DECIDE_HANDLERS = {
  0: decide_ablup0,
  1: decide_ablup1,
  2: decide_ablup2,
  3: decide_ablup3,
  4: decide_ablup4,
  10: decide_ablup10,
  11: decide_ablup11,
  12: decide_ablup12,
  13: decide_ablup13,
  14: decide_ablup14,
  15: decide_ablup15,
  16: decide_ablup16,
  17: decide_ablup17,
  37: decide_ablup37,
  39: decide_ablup39,
  40: decide_ablup40,
  99: decide_ablup99,
};

/**
 * auto_ablup_core 的 core 分发表。20-23/30-33 的主流程没有 core 干跑
 * 出口，表里只登记已实现 core 的编号（0-3/10-17/37/39/99）。auto_ablup
 * 的 0..39 循环跳过 4（编号空洞）、不含 40，这两个编号也没有 core。
 */
const CORE_HANDLERS = {
  0: core_ablup0,
  1: core_ablup1,
  2: core_ablup2,
  3: core_ablup3,
  10: core_ablup10,
  11: core_ablup11,
  12: core_ablup12,
  13: core_ablup13,
  14: core_ablup14,
  15: core_ablup15,
  16: core_ablup16,
  17: core_ablup17,
  37: core_ablup37,
  39: core_ablup39,
  99: core_ablup99,
};

/** 读整数第 n 位是否为 1 */
function auto_getbit(value, n) {
  return Math.floor((value || 0) / 2 ** n) % 2 === 1;
}

/**
 * auto_ablup：自动能力提升。arg 缺省 -1 = 沿用当前调教对象；
 * arg >= 0 时临时代入该角色（era_flag.target 换出换回），结束时还原。
 *
 * 「卖淫影响」的读法：自 #547 起由 yml/ModSave.yml id 0 提供
 * （era_modsave.prostitution_effect，设置页 [29] 可切），参数缺省值
 * 读它，显式传参覆盖（通道仅为测试注入保留）——0 档（负面评价）
 * 跳过 37 卖淫中毒的自动提升。
 *
 * 另一条取舍：count > 15 时查的 flag:5 位 36 是「只自动提升前 15 项」
 * 的开关，与调用方的位 35（自动化总开关）不是同一位，保留原样。
 * @param {number} [arg] 角色编号（-1 = 当前调教对象）
 * @param {{prostitution_effect?: number}} [opts]
 * @returns {Promise<void>}
 */
async function auto_ablup(
  arg = -1,
  { prostitution_effect = era_modsave.prostitution_effect } = {},
) {
  const keep_target = era_flag.target;
  if (arg >= 0) era_flag.target = arg;
  const target = era_flag.target;
  const talent = (id) => era.get(`talent:${target}:${id}`) || 0;

  // 优先削去反发印记
  if ((await decide_ablup99(target)) === 1) {
    await core_ablup99(target);
    era.print(
      `${chara_callname(target)}的${era.get('markname:3')}下降为LV${era.get(`mark:${target}:3`) || 0}`,
    );
  }

  // 0..39 循环：编号空洞与性别过滤整组跳过
  for (let count = 0; count < 40; count += 1) {
    if (
      (count >= 4 && count <= 9) ||
      (count >= 18 && count <= 19) ||
      (count >= 24 && count <= 29) ||
      (count >= 34 && count <= 36) ||
      count === 38
    ) {
      continue;
    }
    // 男だと私处感觉と百合气质と百合中毒は上げられない
    if (talent(122) && (count === 2 || count === 22 || count === 33)) continue;
    // 女だと断背气质とＢＬ中毒は上げられない
    if (talent(122) === 0 && (count === 23 || count === 34)) continue;
    // 卖淫为负面评价时，等级不会自动提昇
    if (count === 37 && prostitution_effect === 0) continue;
    // 只自动提升部分能力（FLAG:5 位 36）
    if (count > 15 && auto_getbit(era.get('flag:5'), 36)) break;

    await auto_ablup_core(count, 1);
  }

  era_flag.target = keep_target;
}

/**
 * auto_ablup_core：num 号能力的自动提升，循环到升不动为止（每轮开头
 * 先查该能力 >= 10 即返回）。
 * @param {number} num 能力编号
 * @param {number} info 提升后是否打印等级行（1 = 打印）
 * @returns {Promise<void>}
 */
async function auto_ablup_core(num, info) {
  const target = era_flag.target;
  for (;;) {
    if ((era.get(`abl:${target}:${num}`) || 0) >= 10) return;
    if ((await decide_ablup(target, num)) <= 0) return;
    const core = CORE_HANDLERS[num];
    if (!core) return; // core_ablupN 落空
    const result = await core(target);
    if (result >= 0 && info) {
      era.print(
        `${chara_callname(target)}的${era.get(`ablname:${num}`)}变为LV${era.get(`abl:${target}:${num}`) || 0}`,
      );
    }
  }
}

/**
 * userablup：引擎驱动的能力提升阶段的用户出口。菜单输入为 999
 * （show_ablup_select 的 [999] - 能力值提高结束）时做两件事——顺从/坦率
 * 检查与欲情检查——然后 BEGIN TURNEND 结束本回合。
 *
 * 返回值沿用转场约定：1 = 已发 BEGIN TURNEND（page-shop.js 的 199、
 * page-invasion.js 的 109 同款上浮给 main-loop），0 = 无事发生。
 *
 * 可达性：本作手写的 JUEL_CHECK 循环不走引擎的 BEGIN ABLUP 阶段（全库唯一
 * 的 BEGIN ABLUP 在 train 主循环被注释掉），userablup 因而没有调用点——
 * 实现保留，不接入任何分发。
 * @param {number} result 菜单输入（999 = 能力值提高结束）
 * @returns {Promise<number>} 1 / 0
 */
async function userablup(result) {
  if (result !== 999) return 0;
  jujun_up_check(era_flag.target); // 顺从检查
  yokubo_up_check(era_flag.target); // 欲情检查
  return 1; // BEGIN TURNEND
}

module.exports = {
  HANDLER_QUIET,
  get_ablup_state,
  ablup0,
  ablup1,
  ablup2,
  ablup3,
  ablup4,
  ablup5,
  ablup6,
  ablup7,
  ablup8,
  ablup9,
  ablup10,
  ablup11,
  ablup12,
  ablup13,
  ablup14,
  ablup15,
  ablup16,
  ablup17,
  ablup20,
  ablup21,
  ablup22,
  ablup23,
  ablup30,
  ablup31,
  ablup32,
  ablup33,
  ablup37,
  ablup39,
  ablup40,
  ablup99,
  ablup100,
  evaluate_ablup0,
  evaluate_ablup1,
  evaluate_ablup2,
  evaluate_ablup3,
  evaluate_ablup4,
  evaluate_ablup10,
  decide_ablup0,
  decide_ablup1,
  decide_ablup2,
  decide_ablup3,
  decide_ablup4,
  decide_ablup10,
  decide_ablup,
  core_ablup0,
  core_ablup1,
  core_ablup2,
  core_ablup3,
  core_ablup10,
  auto_ablup,
  auto_ablup_core,
  userablup,
};
