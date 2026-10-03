/**
 * @file 能力 ABL 的升级判定与交互（ablup0～ablup17 见 issue #464/#465，
 * ablup20～23 与 ablup30～33 见 issue #466，ablup37/39/40/99/100 与
 * decide_ablup/auto_ablup/userablup 本体见 issue #467）。
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
 * 各函数仍保留越界/隐藏选项分支，写法与既有 com-colosseum.js 的同类
 * 分支一致（引擎层已经拒收代位，分支是防御性保留，不是必要条件）。
 *
 * 成功购买的提升文案不统一措辞：ablup0～3 用「{name}变为LV{X}。」，
 * ablup7 用「{name}的等级提升到{X}级了。」；ablup4/5/6/8/9 同样用
 * 「变为LV{X}。」——按 issue #60 译成简体时是整句译文替换，不是逐字
 * 机械转换，lang-table.js 因此未收录这个词条。
 *
 * 重试路径的输出收窄，有意为之：ablup0～5、7～9 的「条件不满足」分支
 * 用 continue 重走循环，分隔线与开头两行说明文字在 for(;;) 循环外、
 * 只执行一次，continue 时只重渲按钮行本身，不重打说明文字。ablup6
 * 方向相反：era.printButton 的注册在每次 era.input() 之后被引擎清空
 * （returnFromButton 置 rule=[]），每次 continue 都必须重渲染按钮行，
 * 连循环内的门槛行等说明也一并重打——这一方向由引擎强制，不能收窄成
 * 「什么都不重打」。两个方向都只影响重试时的重复文字，不改变任何判定
 * 与数值。
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
const { chara } = require('#/facade/chara');
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

/** 整数乘小数后截断（TIMES 语义；source-check.js 等同款） */
const times = (v, m) => Math.floor(v * m);

/** A = A * n / 100 型整数复利（区别于 times：整数乘整数除，非小数乘法截断） */
const compound = (v, numerator) => Math.trunc((v * numerator) / 100);

/** MASTER 角色编号（page-usercom.js 同款本地约定），ablup12 自我训练判定用 */
const MASTER = 0;

/**
 * ablup0～3 共用的可否状态文案。
 * arg=0:可、arg&1:点数不足、arg&2:经验不足、arg&4:能力不足
 */
function get_ablup_state(arg) {
  if (arg === 0) {
    return 'ＯＫ';
  }
  let text = '';
  if (arg & 1) text += '点数不足 ';
  if (arg & 2) text += '经验不足 ';
  if (arg & 4) text += '能力不足';
  return text;
}

/**
 * ablup0 的判定本体（decide_ablup0 与主流程共用同一份梯子/加成代码，
 * 抽成一个函数是为了让 `*` 标记（page-ablup.js）与 auto_ablup 的
 * 按编号分发调用用上同一真身，不是新逻辑）。
 * @param {number} cid 角色 ID
 * @returns {{blocked: (null|'talent'|'locked'|'max'), lv: number, a: number,
 *   juel: number, i: number}} blocked 非空时其余字段无意义（主流程此时提前返回）
 */
function evaluate_ablup0(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  // calc = 阴蒂以外三个部位感觉封锁数，供"其他部位封锁"折扣与上限用
  const calc =
    (talent(103) & 2 ? 1 : 0) +
    (talent(105) & 2 ? 1 : 0) +
    (talent(107) & 2 ? 1 : 0);
  const lv = era.get(`abl:${cid}:0`) || 0;

  // 入口检查（与主流程同条件、顺序不同）
  if (lv >= 5 && talent(74) === 0) return { blocked: 'talent' };
  if (talent(101) & 2) return { blocked: 'locked' };
  if (lv >= calc * 5 + 10) return { blocked: 'max' };

  // a = 阴核点数需求（梯子按 lv 分段；lv 达到复利区间时逐级 ×1.25/1.20/1.15
  // 并逐步截断，不能合并成一次幂运算——times/compound 每级各自截断）
  let a;
  if (lv <= 9) {
    a = [1, 20, 400, 8000, 20000, 40000, 60000, 90000, 120000, 180000][lv];
  } else if (lv < 15) {
    a = 180000;
    for (let n = 0; n < lv - 9; n++) a = compound(a, 125);
  } else if (lv < 20) {
    a = 362000;
    for (let n = 0; n < lv - 14; n++) a = compound(a, 120);
  } else {
    a = 583000;
    for (let n = 0; n < lv - 19; n++) a = compound(a, 115);
  }

  // 戒备森严：仅 lv==4/5/>=6 三级加成，别的等级不受影响
  if (talent(27)) {
    if (lv === 4) a = times(a, 2.0);
    if (lv === 5) a = times(a, 2.5);
    if (lv >= 6) a = times(a, 3.0);
  }
  if (talent(101)) a = times(a, 1.2); // 阴蒂钝感
  if (talent(102)) a = times(a, 0.8); // 阴蒂敏感
  // 其他部位封锁数折扣，三档区间各自独立的分母都是 15
  if (lv > 5 && lv <= 10 && calc > 0) {
    a = Math.trunc((a * (15 - calc)) / 15);
  } else if (lv <= 15 && calc > 1) {
    a = Math.trunc((a * (16 - calc)) / 15);
  } else if (lv <= 20 && calc > 2) {
    a = Math.trunc((a * (17 - calc)) / 15);
  }
  if (talent(76)) a = times(a, 0.8); // 淫乱
  if (talent(74)) a = times(a, 0.8); // 自慰狂
  if (a < 1) a = 1; // 最低 1 点

  const juel = era.get(`juel:${cid}:0`) || 0;
  let i = 0;
  if (juel < a) i |= 1;
  return { blocked: null, lv, a, juel, i };
}

/**
 * decide_ablup0 的返回值语义：无阻断且 i==0 返回 1（可提升），否则 0。
 * @param {number} cid 角色 ID
 * @returns {number} 1 / 0
 */
function decide_ablup0(cid) {
  const r = evaluate_ablup0(cid);
  return r.blocked === null && r.i === 0 ? 1 : 0;
}

/**
 * core_ablup0：ABL:0 ++ 并在 i==0 时扣珠。
 * @param {number} cid 角色 ID
 * @returns {number} 0（恒 0）
 */
function core_ablup0(cid) {
  const r = evaluate_ablup0(cid);
  chara(cid).system.阴蒂感觉 += 1; // ABL:0 ++
  if (r.blocked === null && r.i === 0) {
    era.add(`juel:${cid}:0`, -r.a); // JUEL:0 -= a
  }
  return 0; // 恒 0（auto_ablup_core 判 >= 0 才打印）
}

async function ablup0(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  // 部位称呼：男人显示"阴茎"、扶她显示"阴茎(阴蒂)"，其余显示"阴蒂"
  const part = () =>
    talent(122) ? '阴茎' : talent(121) ? '阴茎(阴蒂)' : '阴蒂';

  era.drawLine();
  era.print(`${part()}的感度提升了。`);
  era.print(`${part()}感觉越高，越容易在舔舐、自慰等行为得到更大的快感。`);
  era.drawLine();

  const blocked = evaluate_ablup0(cid).blocked;
  if (blocked === 'talent') {
    await era.printAndWait('需要特殊素质才能继续提升');
    return;
  }
  if (blocked === 'locked') {
    await era.printAndWait(`${part()}感觉已经被封锁了`);
    return;
  }
  if (blocked === 'max') {
    await era.printAndWait('已达最高级');
    return;
  }

  for (;;) {
    const { a, juel, i } = evaluate_ablup0(cid);

    const label = talent(122) ? '阴茎' : era.get('palamname:0');
    era.printButton(`- ${label}点数×${juel}/${a} ……${get_ablup_state(i)}`, 0);
    // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    era.printButton('- 停止', 100);

    const result = await era.input();
    if (result === 100) {
      // 放弃返回：最后一次动作是输入、其后无打印，返回哨兵让分发方
      // 不再等键（否则回显会让等键真等一次，玩家多按键）
      return HANDLER_QUIET;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件');
      continue;
    } else if (result === 0) {
      core_ablup0(cid);
      era.print(`${era.get('ablname:0')}变为LV${chara(cid).system.阴蒂感觉}。`); // （不等待）
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 * ablup1 的判定本体，与主流程共用
 * （唯一调用点是主流程，抽函数见 evaluate_ablup0 的说明）。
 * @param {number} cid 角色 ID
 * @returns {{blocked: (null|'talent'|'locked'|'max'), lv: number, a: number,
 *   juel: number, i: number}}
 */
function evaluate_ablup1(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const calc =
    (talent(101) & 2 ? 1 : 0) +
    (talent(103) & 2 ? 1 : 0) +
    (talent(105) & 2 ? 1 : 0);
  const lv = era.get(`abl:${cid}:1`) || 0;

  // 入口检查
  if (lv >= 5 && talent(78) === 0) return { blocked: 'talent' };
  if (talent(107) & 2) return { blocked: 'locked' };
  if (lv >= calc * 5 + 10) return { blocked: 'max' };

  let a;
  if (lv <= 9) {
    a = [1, 20, 400, 8000, 20000, 40000, 60000, 90000, 120000, 180000][lv];
  } else if (lv < 15) {
    a = 180000;
    for (let n = 0; n < lv - 9; n++) a = compound(a, 125);
  } else if (lv < 20) {
    a = 362000;
    for (let n = 0; n < lv - 14; n++) a = compound(a, 120);
  } else {
    a = 583000;
    for (let n = 0; n < lv - 19; n++) a = compound(a, 115);
  }

  if (talent(27)) {
    // 戒备森严
    if (lv === 4) a = times(a, 2.0);
    if (lv === 5) a = times(a, 2.5);
    if (lv >= 6) a = times(a, 3.0);
  }
  if (talent(107)) a = times(a, 1.2); // B钝感
  if (talent(110)) a = times(a, 1.1); // 巨乳
  if (talent(114)) a = times(a, 1.2); // 爆乳
  if (talent(119)) a = times(a, 1.3); // 超乳
  if (talent(108)) a = times(a, 0.8); // B敏感
  if (lv > 5 && lv <= 10 && calc > 0) {
    a = Math.trunc((a * (15 - calc)) / 15);
  } else if (lv <= 15 && calc > 1) {
    a = Math.trunc((a * (16 - calc)) / 15);
  } else if (lv <= 20 && calc > 2) {
    a = Math.trunc((a * (17 - calc)) / 15);
  }
  if (talent(76)) a = times(a, 0.8); // 淫乱
  if (talent(78)) a = times(a, 0.8); // 淫乳
  if (talent(109)) a = times(a, 0.8); // 贫乳
  if (talent(116)) a = times(a, 0.65); // 绝壁
  if (a < 1) a = 1;

  const juel = era.get(`juel:${cid}:14`) || 0;
  let i = 0;
  if (juel < a) i |= 1;
  return { blocked: null, lv, a, juel, i };
}

/**
 * decide_ablup1 的返回值语义。
 * @param {number} cid 角色 ID
 * @returns {number} 1 / 0
 */
function decide_ablup1(cid) {
  const r = evaluate_ablup1(cid);
  return r.blocked === null && r.i === 0 ? 1 : 0;
}

/**
 * core_ablup1：ABL:1 ++ 并在 i==0 时扣珠。
 * @param {number} cid 角色 ID
 * @returns {number} 0
 */
function core_ablup1(cid) {
  const r = evaluate_ablup1(cid);
  chara(cid).system.乳房感觉 += 1; // ABL:1 ++
  if (r.blocked === null && r.i === 0) era.add(`juel:${cid}:14`, -r.a);
  return 0;
}

async function ablup1(cid) {
  era.drawLine();

  const blocked = evaluate_ablup1(cid).blocked;
  if (blocked === 'talent') {
    await era.printAndWait('需要特殊素质才能继续提升');
    return;
  }
  if (blocked === 'locked') {
    await era.printAndWait('乳房感觉已经被封锁了');
    return;
  }
  if (blocked === 'max') {
    await era.printAndWait('已达最高级');
    return;
  }

  for (;;) {
    const { a, juel, i } = evaluate_ablup1(cid);

    era.printButton(
      `- ${era.get('palamname:14')}点数×${juel}/${a} ……${get_ablup_state(i)}`,
      0,
    );
    // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    era.printButton('- 停止', 100);

    const result = await era.input();
    if (result === 100) {
      // 放弃返回：最后一次动作是输入、其后无打印，返回哨兵让分发方
      // 不再等键（否则回显会让等键真等一次，玩家多按键）
      return HANDLER_QUIET;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件');
      continue;
    } else if (result === 0) {
      core_ablup1(cid);
      era.print(`${era.get('ablname:1')}变为LV${chara(cid).system.乳房感觉}。`);
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 * ablup2 的判定本体，与主流程共用。
 * 男人（TALENT:122）在判定里同样直接拦下，与主流程的却下条件相同，
 * 归入 blocked='male'。
 * @param {number} cid 角色 ID
 * @returns {{blocked: (null|'male'|'talent'|'locked'|'max'), lv: number,
 *   a: number, b: number, juel: number, exp: number, i: number}}
 */
function evaluate_ablup2(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  if (talent(122)) return { blocked: 'male' };

  const calc =
    (talent(101) & 2 ? 1 : 0) +
    (talent(105) & 2 ? 1 : 0) +
    (talent(107) & 2 ? 1 : 0);
  const lv = era.get(`abl:${cid}:2`) || 0;

  if (lv >= 5 && talent(75) === 0) return { blocked: 'talent' };
  if (talent(103) & 2) return { blocked: 'locked' };
  if (lv >= calc * 5 + 10) return { blocked: 'max' };

  // a＝私处点数需求、b＝私处经验需求，梯子与复利率彼此不对称
  let a, b;
  if (lv <= 9) {
    a = [1, 20, 400, 8000, 20000, 40000, 60000, 90000, 120000, 180000][lv];
    b = [2, 10, 30, 75, 150, 180, 250, 350, 500, 600][lv];
  } else if (lv < 15) {
    a = 180000;
    b = 600;
    for (let n = 0; n < lv - 9; n++) {
      a = compound(a, 125);
      b = compound(b, 115);
    }
  } else if (lv < 20) {
    a = 362000;
    b = 966;
    for (let n = 0; n < lv - 14; n++) {
      a = compound(a, 120);
      b = compound(b, 120);
    }
  } else {
    a = 583000;
    b = 1942;
    for (let n = 0; n < lv - 19; n++) {
      a = compound(a, 115);
      b = compound(b, 125);
    }
  }

  if (talent(27)) {
    // 戒备森严：三级互斥（else-if 链）
    if (lv === 4) {
      a = times(a, 2.0);
      b = times(b, 2.0);
    } else if (lv === 5) {
      a = times(a, 2.5);
      b = times(b, 2.5);
    } else if (lv >= 6) {
      a = times(a, 3.0);
      b = times(b, 3.0);
    }
  }
  if (talent(103)) {
    // 私处钝感：a/b 加成率不同
    a = times(a, 1.2);
    b = times(b, 1.1);
  }
  // 其他部位封锁折扣：a 分母 15，b 分母 20，两者不对称
  if (lv > 5 && lv <= 10 && calc > 0) {
    a = Math.trunc((a * (15 - calc)) / 15);
    b = Math.trunc((b * (20 - calc)) / 20);
  } else if (lv <= 15 && calc > 1) {
    a = Math.trunc((a * (16 - calc)) / 15);
    b = Math.trunc((b * (21 - calc)) / 20);
  } else if (lv <= 20 && calc > 2) {
    a = Math.trunc((a * (17 - calc)) / 15);
    b = Math.trunc((b * (22 - calc)) / 20);
  }
  if (talent(76)) {
    a = times(a, 0.8); // 淫乱
    b = times(b, 0.8);
  }
  if (talent(75)) {
    a = times(a, 0.8); // 性爱狂
    b = times(b, 0.8);
  }
  if (talent(104)) {
    a = times(a, 0.8); // 私处敏感
    b = times(b, 0.8);
  }
  if (a < 1) a = 1;
  if (b < 1) b = 1;

  const juel = era.get(`juel:${cid}:1`) || 0;
  const exp = era.get(`exp:${cid}:0`) || 0;
  let i = 0;
  if (juel < a) i |= 1;
  if (exp < b) i |= 2;
  return { blocked: null, lv, a, b, juel, exp, i };
}

/**
 * decide_ablup2 的返回值语义。
 * @param {number} cid 角色 ID
 * @returns {number} 1 / 0
 */
function decide_ablup2(cid) {
  const r = evaluate_ablup2(cid);
  return r.blocked === null && r.i === 0 ? 1 : 0;
}

/**
 * core_ablup2：ABL:2 ++ 并在 i==0 时扣点数（经验不扣）。
 * @param {number} cid 角色 ID
 * @returns {number} 0
 */
function core_ablup2(cid) {
  const r = evaluate_ablup2(cid);
  chara(cid).system.私处感觉 += 1; // ABL:2 ++
  if (r.blocked === null && r.i === 0) era.add(`juel:${cid}:1`, -r.a);
  return 0;
}

async function ablup2(cid) {
  if (evaluate_ablup2(cid).blocked === 'male') return; // 男人却下（判定与主流程各查一次，逐字相同，内联后合一）

  era.drawLine();

  const blocked = evaluate_ablup2(cid).blocked;
  if (blocked === 'talent') {
    await era.printAndWait('需要特殊素质才能继续提升');
    return;
  }
  if (blocked === 'locked') {
    await era.printAndWait('私处感觉已经被封锁了');
    return;
  }
  if (blocked === 'max') {
    await era.printAndWait('已达最高级');
    return;
  }

  for (;;) {
    const { a, b, juel, exp, i } = evaluate_ablup2(cid);

    era.printButton(
      `- ${era.get('palamname:1')}点数×${juel}/${a} ……${get_ablup_state(i)}`,
      0,
    );
    // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    era.print(`${NBSP.repeat(6)}${era.get('expname:0')}　　${exp}/${b}`);
    era.printButton('- 停止', 100);

    const result = await era.input();
    if (result === 100) {
      // 放弃返回：最后一次动作是输入、其后无打印，返回哨兵让分发方
      // 不再等键（否则回显会让等键真等一次，玩家多按键）
      return HANDLER_QUIET;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件');
      continue;
    } else if (result === 0) {
      core_ablup2(cid);
      era.print(`${era.get('ablname:2')}变为LV${chara(cid).system.私处感觉}。`);
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 * ablup3 的判定本体，与主流程共用。
 * @param {number} cid 角色 ID
 * @returns {{blocked: (null|'talent'|'locked'|'max'), lv: number, a: number,
 *   b: number, juel: number, exp: number, i: number}}
 */
function evaluate_ablup3(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const calc =
    (talent(101) & 2 ? 1 : 0) +
    (talent(103) & 2 ? 1 : 0) +
    (talent(107) & 2 ? 1 : 0);
  const lv = era.get(`abl:${cid}:3`) || 0;

  if (lv >= 5 && talent(77) === 0) return { blocked: 'talent' };
  if (talent(105) & 2) return { blocked: 'locked' };
  if (lv >= calc * 5 + 10) return { blocked: 'max' };

  let a, b;
  if (lv <= 9) {
    a = [1, 20, 400, 8000, 20000, 40000, 60000, 90000, 120000, 180000][lv];
    b = [2, 10, 30, 75, 150, 180, 250, 350, 500, 600][lv];
  } else if (lv < 15) {
    a = 180000;
    b = 600;
    for (let n = 0; n < lv - 9; n++) {
      a = compound(a, 125);
      b = compound(b, 115);
    }
  } else if (lv < 20) {
    a = 362000;
    b = 966;
    for (let n = 0; n < lv - 14; n++) {
      a = compound(a, 120);
      b = compound(b, 120);
    }
  } else {
    a = 583000;
    b = 1942;
    for (let n = 0; n < lv - 19; n++) {
      a = compound(a, 115);
      b = compound(b, 125);
    }
  }

  if (talent(27)) {
    if (lv === 4) {
      a = times(a, 2.0);
      b = times(b, 2.0);
    } else if (lv === 5) {
      a = times(a, 2.5);
      b = times(b, 2.5);
    } else if (lv >= 6) {
      a = times(a, 3.0);
      b = times(b, 3.0);
    }
  }
  if (talent(105)) {
    // A钝感
    a = times(a, 1.2);
    b = times(b, 1.1);
  }
  if (lv > 5 && lv <= 10 && calc > 0) {
    a = Math.trunc((a * (15 - calc)) / 15);
    b = Math.trunc((b * (20 - calc)) / 20);
  } else if (lv <= 15 && calc > 1) {
    a = Math.trunc((a * (16 - calc)) / 15);
    b = Math.trunc((b * (21 - calc)) / 20);
  } else if (lv <= 20 && calc > 2) {
    a = Math.trunc((a * (17 - calc)) / 15);
    b = Math.trunc((b * (22 - calc)) / 20);
  }
  if (talent(76)) {
    a = times(a, 0.8); // 淫乱
    b = times(b, 0.8);
  }
  if (talent(77)) {
    a = times(a, 0.8); // 尻穴狂
    b = times(b, 0.8);
  }
  if (talent(106)) {
    a = times(a, 0.8); // A敏感
    b = times(b, 0.8);
  }
  if (a < 1) a = 1;
  if (b < 1) b = 1;

  const juel = era.get(`juel:${cid}:2`) || 0;
  const exp = era.get(`exp:${cid}:1`) || 0;
  let i = 0;
  if (juel < a) i |= 1;
  if (exp < b) i |= 2;
  return { blocked: null, lv, a, b, juel, exp, i };
}

/**
 * decide_ablup3 的返回值语义。
 * @param {number} cid 角色 ID
 * @returns {number} 1 / 0
 */
function decide_ablup3(cid) {
  const r = evaluate_ablup3(cid);
  return r.blocked === null && r.i === 0 ? 1 : 0;
}

/**
 * core_ablup3：ABL:3 ++ 并在 i==0 时扣点数。
 * @param {number} cid 角色 ID
 * @returns {number} 0
 */
function core_ablup3(cid) {
  const r = evaluate_ablup3(cid);
  chara(cid).system.肛门感觉 += 1; // ABL:3 ++
  if (r.blocked === null && r.i === 0) era.add(`juel:${cid}:2`, -r.a);
  return 0;
}

async function ablup3(cid) {
  era.drawLine();

  const blocked = evaluate_ablup3(cid).blocked;
  if (blocked === 'talent') {
    await era.printAndWait('需要特殊素质才能继续提升');
    return;
  }
  if (blocked === 'locked') {
    await era.printAndWait('肛门感觉已经被封锁了');
    return;
  }
  if (blocked === 'max') {
    await era.printAndWait('已达最高级');
    return;
  }

  for (;;) {
    const { a, b, juel, exp, i } = evaluate_ablup3(cid);

    era.printButton(
      `- ${era.get('palamname:2')}点数×${juel}/${a} ……${get_ablup_state(i)}`,
      0,
    );
    // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    era.print(`${NBSP.repeat(6)}${era.get('expname:1')}　　${exp}/${b}`);
    era.printButton('- 停止', 100);

    const result = await era.input();
    if (result === 100) {
      // 放弃返回：最后一次动作是输入、其后无打印，返回哨兵让分发方
      // 不再等键（否则回显会让等键真等一次，玩家多按键）
      return HANDLER_QUIET;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件');
      continue;
    } else if (result === 0) {
      core_ablup3(cid);
      era.print(`${era.get('ablname:3')}变为LV${chara(cid).system.肛门感觉}。`);
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 * ablup4 的判定本体：梯子只有 5 级、无复利区间。lv>=5 没有对应档位，
 * 直接返回 blocked='max'（a 视为 0、i 视为 0），不进入梯子查表。
 * @param {number} cid 角色 ID
 * @returns {{blocked: (null|'max'), lv: number, a: number, juel: number, i: number}}
 */
function evaluate_ablup4(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const lv = era.get(`abl:${cid}:4`) || 0;
  if (lv >= 5) return { blocked: 'max' };

  // a：0→1、1→50、2→600、3→7000(戒备森严×2.00)、4→45000(戒备森严×3.00)
  let a = [1, 50, 600, 7000, 45000][lv];
  if (lv === 3 && talent(27)) a = times(a, 2.0);
  if (lv === 4 && talent(27)) a = times(a, 3.0);

  const juel = era.get(`juel:${cid}:15`) || 0;
  let i = 0;
  if (juel < a) i |= 1;
  return { blocked: null, lv, a, juel, i };
}

/**
 * decide_ablup4 的返回值语义。`evaluate_ablup4` 对 lv>=5 返回
 * blocked='max'（a 视为 0、i 视为 0），`decide_ablup4` 因 blocked
 * 非空而恒返回 0——**满级行一律不打 `*`**。这是有意取「满级不打
 * 标记」的更稳一侧（见 evaluate_ablup4 的说明）。
 * @param {number} cid 角色 ID
 * @returns {number} 1 / 0
 */
function decide_ablup4(cid) {
  const r = evaluate_ablup4(cid);
  return r.blocked === null && r.i === 0 ? 1 : 0;
}

async function ablup4(cid) {
  era.drawLine();
  if (evaluate_ablup4(cid).blocked === 'max') {
    await era.printAndWait('已达到MAX。');
    return;
  }

  for (;;) {
    const { a, i } = evaluate_ablup4(cid);

    // 无 get_ablup_state：手写状态文案，"点数不足 " 带尾随空格、"经验不足"
    // 不带（与 get_ablup_state 的两个 bit 都带尾随空格不同）；i&2 分支
    // （经验不足位）恒假——evaluate_ablup4 只置 bit1
    let status;
    if (i === 0) {
      status = 'ＯＫ';
    } else {
      status = '';
      if (i & 1) status += '点数不足 ';
      if (i & 2) status += '经验不足';
    }
    era.printButton(`- ${era.get('palamname:15')}点数×${a}……${status}`, 0); // （无 JUEL 现值，只显示需求 a，与 ablup0～3 不同）
    // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    era.printButton('- 放弃', 100);

    const result = await era.input();
    if (result === 100) {
      // 放弃返回：最后一次动作是输入、其后无打印，返回哨兵让分发方
      // 不再等键（否则回显会让等键真等一次，玩家多按键）
      return HANDLER_QUIET;
    } else if (result === 0 && i !== 0) {
      era.print('条件不足。');
      continue;
    } else if (result === 0) {
      const new_lv = era.add(`abl:${cid}:4`, 1);
      era.add(`juel:${cid}:15`, -a);
      await era.printAndWait(`${era.get('ablname:4')}变为LV${new_lv}。`); // （等待）
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 *
 * ABLNAME:5～9 在 Abl.yml 里没有条目（本文件头「调用方」一节的依据），
 * era.get 读到 undefined；成功文案的名称前缀因此原样留空，不是缺陷——
 * 与 ablup5～9 的实际情况一致，`|| ''` 只是避免模板字符串把 undefined
 * 拼成字面文字。
 */
async function ablup5(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl5 = () => era.get(`abl:${cid}:5`) || 0;

  era.drawLine();
  if (abl5() >= 5) {
    await era.printAndWait('已达到MAX。');
    return;
  }

  for (;;) {
    const lv = abl5();
    const exp1 = era.get(`exp:${cid}:1`) || 0;
    // a＝私处点数需求、b＝肛门经验门槛
    let a, b;
    if (lv === 0) {
      a = 1;
      b = 2;
    } else if (lv === 1) {
      a = exp1 >= EXPLV[3] ? 20 : 50;
      b = 10;
    } else if (lv === 2) {
      a = exp1 >= EXPLV[4] ? 100 : 600;
      b = 30;
    } else if (lv === 3) {
      a = exp1 >= EXPLV[5] ? 500 : 7000;
      b = 150;
      if (talent(27)) {
        a = times(a, 2.0);
        b = times(b, 2.0);
      }
    } else {
      a = exp1 >= EXPLV[5] ? 8000 : 45000;
      b = 300;
      if (talent(27)) {
        a = times(a, 3.0);
        b = times(b, 3.0);
      }
    }

    const juel2 = era.get(`juel:${cid}:2`) || 0;
    let i = 0;
    if (juel2 < a) i |= 1;
    if (exp1 < b) i |= 2;

    let status;
    if (i === 0) {
      status = 'ＯＫ';
    } else {
      status = '';
      if (i & 1) status += '点数不足 ';
      if (i & 2) status += '经验不足';
    }
    era.printButton(
      `- ${era.get('palamname:2')}点数×${a}、${era.get('expname:1')}${b}以上……${status}`, // （无 JUEL 现值，只显示需求 a）
      0,
    );
    // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    era.printButton('- 放弃', 100);

    const result = await era.input();
    if (result === 100) {
      // 放弃返回：最后一次动作是输入、其后无打印，返回哨兵让分发方
      // 不再等键（否则回显会让等键真等一次，玩家多按键）
      return HANDLER_QUIET;
    } else if (result === 0 && i !== 0) {
      era.print('条件不足。');
      continue;
    } else if (result === 0) {
      const new_lv = era.add(`abl:${cid}:5`, 1);
      era.add(`juel:${cid}:2`, -a);
      await era.printAndWait(`${era.get('ablname:5') || ''}变为LV${new_lv}。`); // （等待）
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

async function ablup6(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl6 = () => era.get(`abl:${cid}:6`) || 0;

  era.drawLine();
  if (abl6() >= 5) {
    await era.printAndWait('已达到MAX。');
    return;
  }

  const status_text = (bits) => {
    if (bits === 0) return 'ＯＫ';
    let text = '';
    if (bits & 1) text += '点数不足 ';
    if (bits & 2) text += '经验不足';
    if (bits & 4) text += '能力不足 ';
    return text;
  };

  for (;;) {
    const lv = abl6();
    // a/b/c/d/e 的梯子（c 只在 lv==0 非零，d/e 是经验门槛非点数）
    let a, b, c, d, e;
    if (lv === 0) {
      [a, b, c, d, e] = [100, 20, 100, 1, 1];
    } else if (lv === 1) {
      [a, b, c, d, e] = [1200, 100, 0, 1, 3];
    } else if (lv === 2) {
      [a, b, c, d, e] = [5000, 600, 0, 20, 6];
    } else if (lv === 3) {
      [a, b, c, d, e] = [10000, 2000, 0, 20, 10];
      if (talent(27)) {
        a = times(a, 2.0);
        b = times(b, 2.0);
        d = times(d, 2.0);
      }
    } else {
      [a, b, c, d, e] = [30000, 8000, 0, 100, 20];
      if (talent(27)) {
        a = times(a, 3.0);
        b = times(b, 3.0);
        d = times(d, 3.0);
      }
    }
    if (talent(80)) {
      // 倒错的：仅 a/b/c/d，不含 e
      a = times(a, 0.75);
      b = times(b, 0.75);
      c = times(c, 0.75);
      d = times(d, 0.75);
    }

    // 门槛读 ABL:0（阴蒂感觉），需达到本次升级后等级+1，三个选项共享；
    // 需求行与判定同读 ABL:0，玩家可见的提示与实际检查一致
    let i = 0,
      j = 0,
      k = 0;
    const gate_needed = lv + 1;
    const gate_line = `${era.get('ablname:0')}${gate_needed}LV以上`;
    if ((era.get(`abl:${cid}:0`) || 0) < gate_needed) {
      i |= 4;
      j |= 4;
      k |= 4;
    }

    // 3→4、4→5 需异常经验，[妄信] 可跳过
    let anomaly_line = '';
    if (lv === 3 && talent(86) === 0) {
      anomaly_line = `${era.get('expname:50')}有`;
      if ((era.get(`exp:${cid}:50`) || 0) === 0) {
        i |= 2;
        j |= 2;
        k |= 2;
      }
    } else if (lv === 4 && talent(86) === 0) {
      anomaly_line = `${era.get('expname:50')}2以上`;
      if ((era.get(`exp:${cid}:50`) || 0) < 2) {
        i |= 2;
        j |= 2;
        k |= 2;
      }
    }

    const juel6 = era.get(`juel:${cid}:6`) || 0;
    const exp2 = era.get(`exp:${cid}:2`) || 0;
    const exp20 = era.get(`exp:${cid}:20`) || 0;
    if (juel6 < a) i |= 1;
    if (exp2 < e) i |= 2; // 绝顶经验
    if (exp20 < e) i |= 2; // 精液经验（同一个 bit）

    era.print(gate_line);
    if (anomaly_line) era.print(anomaly_line);

    let option0 = `- ${era.get('palamname:6')}点数×${a}`;
    if (e > 0) {
      option0 += `、${era.get('expname:2')}${e}以上、${era.get('expname:20')}${e}以上`;
    }
    option0 += `……${status_text(i)}`;
    era.printButton(option0, 0);
    // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）

    const juel4 = era.get(`juel:${cid}:4`) || 0;
    const exp21 = era.get(`exp:${cid}:21`) || 0;
    if (b > 0) {
      if (juel4 < b) j |= 1;
      if (exp21 < d) j |= 2;

      let option1 = `- ${era.get('palamname:4')}点数×${b}`;
      if (d > 0) option1 += `、${era.get('expname:21')}${d}以上`;
      option1 += `……${status_text(j)}`;
      era.printButton(option1, 1);
      // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    } else {
      j = 256; // b==0 时 [1] 不渲染
    }

    const juel7 = era.get(`juel:${cid}:7`) || 0;
    if (c > 0) {
      if (juel7 < c) k |= 1; // 习得点数需求（与按钮显示的×c、扣款 c 同变量）
      if (exp2 < 1) k |= 2; // 绝顶经验≥1，写死的 1

      const option2 = `- ${era.get('palamname:7')}点数×${c}、${era.get('expname:2')}1以上……${status_text(k)}`;
      era.printButton(option2, 2);
      // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    } else {
      k = 256; // c==0 时 [2] 不渲染
    }

    era.printButton('- 放弃', 100);

    const result = await era.input();
    if (result === 100) {
      // 放弃返回：最后一次动作是输入、其后无打印，返回哨兵让分发方
      // 不再等键（否则回显会让等键真等一次，玩家多按键）
      return HANDLER_QUIET;
    } else if (result === 0 && i !== 0) {
      era.print('条件不足。请重新输入。');
      continue;
    } else if (result === 1 && j !== 0) {
      // （j===256 的隐藏选项不会被 era.input() 传回，见文件头）
      era.print('条件不足。请重新输入。');
      continue;
    } else if (result === 2 && k !== 0) {
      // （同上，k===256 同理不会发生）
      era.print('条件不足。请重新输入。');
      continue;
    } else if (result === 0) {
      const new_lv = era.add(`abl:${cid}:6`, 1);
      era.add(`juel:${cid}:6`, -a);
      await era.printAndWait(`${era.get('ablname:6') || ''}变为LV${new_lv}。`); // （等待）
      return;
    } else if (result === 1) {
      const new_lv = era.add(`abl:${cid}:6`, 1);
      era.add(`juel:${cid}:4`, -b);
      await era.printAndWait(`${era.get('ablname:6') || ''}变为LV${new_lv}。`);
      return;
    } else if (result === 2) {
      const new_lv = era.add(`abl:${cid}:6`, 1);
      era.add(`juel:${cid}:7`, -c);
      await era.printAndWait(`${era.get('ablname:6') || ''}变为LV${new_lv}。`);
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

async function ablup7(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl7 = () => era.get(`abl:${cid}:7`) || 0;

  era.drawLine();
  if (abl7() >= 5) {
    await era.printAndWait('已达到MAX。');
    return;
  }

  for (;;) {
    const lv = abl7();
    let a = [100, 1000, 5000, 15000, 35000][lv];
    if (lv === 3 && talent(27)) a = times(a, 2.0);
    if (lv === 4 && talent(27)) a = times(a, 3.0);
    if (talent(80)) a = times(a, 0.75); // 倒错的
    if (talent(28)) a = times(a, 0.5); // 爱表现

    let i = 0;
    // 门槛读 ABL:1（乳房感觉），需达到本次升级后等级+1；需求行与判定同读
    // ABL:1，玩家可见的提示与实际检查一致
    const gate_needed = lv + 1;
    const gate_line = `${era.get('ablname:1')}${gate_needed}LV以上`;
    if ((era.get(`abl:${cid}:1`) || 0) < gate_needed) i |= 4;

    let anomaly_line = '';
    if (lv === 3 && talent(28) === 0) {
      anomaly_line = `${era.get('expname:50')}有`;
      if ((era.get(`exp:${cid}:50`) || 0) === 0) i |= 2;
    } else if (lv === 4 && talent(28) === 0) {
      anomaly_line = `${era.get('expname:50')}2以上`;
      if ((era.get(`exp:${cid}:50`) || 0) < 2) i |= 2;
    }

    const juel8 = era.get(`juel:${cid}:8`) || 0;
    if (juel8 < a) i |= 1;

    // 始终生效的第二条经验门槛，与上面 TALENT:28 那条互相独立
    let exp_line;
    if (lv < 2) {
      exp_line = `${era.get('expname:2')}1以上`;
      if ((era.get(`exp:${cid}:2`) || 0) === 0) i |= 2;
    } else {
      exp_line = `${era.get('expname:11')}1以上`;
      if ((era.get(`exp:${cid}:11`) || 0) === 0) i |= 2;
    }

    era.print(gate_line);
    if (anomaly_line) era.print(anomaly_line);

    // 本函数的可否文案与共用 get_ablup_state 仅差在 bit4：本函数三个分支都带
    // 尾随空格，get_ablup_state 的 bit4 没有，不能复用
    let status = '';
    if (i === 0) {
      status = 'ＯＫ';
    } else {
      if (i & 1) status += '点数不足 ';
      if (i & 2) status += '经验不足 ';
      if (i & 4) status += '能力不足 ';
    }
    era.printButton(
      `- ${era.get('palamname:8')}点数×${a}、${exp_line}……${status}`,
      0,
    );
    // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    era.printButton('- 放弃', 100);

    const result = await era.input();
    if (result === 100) {
      // 放弃返回：最后一次动作是输入、其后无打印，返回哨兵让分发方
      // 不再等键（否则回显会让等键真等一次，玩家多按键）
      return HANDLER_QUIET;
    } else if (result === 0 && i !== 0) {
      era.print('条件不满足。');
      continue;
    } else if (result === 0) {
      const new_lv = era.add(`abl:${cid}:7`, 1);
      era.add(`juel:${cid}:8`, -a);
      await era.printAndWait(
        `${era.get('ablname:7') || ''}的等级提升到${new_lv}级了。`,
      ); // （等待）
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

async function ablup8(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl8 = () => era.get(`abl:${cid}:8`) || 0;

  era.drawLine();
  if (abl8() >= 5) {
    await era.printAndWait('已达到MAX。');
    return;
  }

  const status_text = (bits) => {
    if (bits === 0) return 'ＯＫ';
    let text = '';
    if (bits & 1) text += '点数不足 ';
    if (bits & 2) text += '经验不足';
    if (bits & 4) text += '能力不足 ';
    return text;
  };

  for (;;) {
    const lv = abl8();
    // a/b/c/d/e 的梯子（a/b 只在 lv 0-2 非零，c 只在 lv 3-4 非零）
    let a, b, c, d, e;
    if (lv === 0) {
      [a, b, c, d, e] = [100, 100, 0, 100, 100];
    } else if (lv === 1) {
      [a, b, c, d, e] = [500, 500, 0, 500, 300];
    } else if (lv === 2) {
      [a, b, c, d, e] = [1200, 1000, 0, 1500, 1000];
    } else if (lv === 3) {
      [a, b, c, d, e] = [0, 0, 10, 3000, 6000];
      if (talent(27)) {
        c = times(c, 2.0);
        d = times(d, 2.0);
        e = times(e, 2.0);
      }
    } else {
      [a, b, c, d, e] = [0, 0, 50, 5000, 12000];
      if (talent(27)) {
        c = times(c, 3.0);
        d = times(d, 3.0);
        e = times(e, 3.0);
      }
    }
    if (talent(33)) {
      // 开放：先于倒错的，五个变量都受影响
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
      d = times(d, 0.5);
      e = times(e, 0.5);
    }
    if (talent(80)) {
      // 倒错的：五个变量都受影响
      a = times(a, 0.75);
      b = times(b, 0.75);
      c = times(c, 0.75);
      d = times(d, 0.75);
      e = times(e, 0.75);
    }

    let i = 0,
      j = 0;
    // 门槛读 ABL:1（乳房感觉），需达到本次升级后等级+1，两个选项共享；需求行
    // 与判定同读 ABL:1，玩家可见的提示与实际检查一致
    const gate_needed = lv + 1;
    const gate_line = `${era.get('ablname:1')}${gate_needed}LV以上`;
    if ((era.get(`abl:${cid}:1`) || 0) < gate_needed) {
      i |= 4;
      j |= 4;
    }

    let anomaly_line = '';
    if (lv === 3 && talent(33) === 0) {
      anomaly_line = `${era.get('expname:50')}有`;
      if ((era.get(`exp:${cid}:50`) || 0) === 0) {
        i |= 2;
        j |= 2;
      }
    } else if (lv === 4 && talent(33) === 0) {
      anomaly_line = `${era.get('expname:50')}2以上`;
      if ((era.get(`exp:${cid}:50`) || 0) < 2) {
        i |= 2;
        j |= 2;
      }
    }

    era.print(gate_line);
    if (anomaly_line) era.print(anomaly_line);

    const juel9 = era.get(`juel:${cid}:9`) || 0;
    const juel5 = era.get(`juel:${cid}:5`) || 0;
    const exp30 = era.get(`exp:${cid}:30`) || 0;
    if (b > 0) {
      if (juel9 < a) i |= 1;
      if (juel5 < b) i |= 1;
      if (exp30 < c) i |= 2; // （b>0 时 c 恒为 0，此判定恒假，保留原样）

      let option0 = `- ${era.get('palamname:9')}点数×${a}、${era.get('palamname:5')}点数×${b}`;
      if (c > 0) option0 += `、${era.get('expname:30')}${c}以上`;
      option0 += `……${status_text(i)}`;
      era.printButton(option0, 0);
      // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    }
    // b===0 时 [0] 不渲染且没有 else 分支设哨兵——未渲染的按钮输入不进来（见文件头），
    // 缺失哨兵因此不是缺陷

    const exp2 = era.get(`exp:${cid}:2`) || 0;
    const juel6 = era.get(`juel:${cid}:6`) || 0;
    if (d > 0) {
      if (juel9 < d) j |= 1;
      if (juel6 < e) j |= 1;
      if (exp30 < c) j |= 2;
      if (exp2 < 1) j |= 2;

      let option1 = `- ${era.get('palamname:9')}点数×${d}、${era.get('palamname:6')}点数×${e}`;
      if (c > 0) option1 += `、${era.get('expname:30')}${c}以上`;
      option1 += `、${era.get('expname:2')}1以上……${status_text(j)}`;
      era.printButton(option1, 1);
      // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    } else {
      j = 256;
    }

    era.printButton('- 放弃', 100);

    const result = await era.input();
    if (result === 100) {
      // 放弃返回：最后一次动作是输入、其后无打印，返回哨兵让分发方
      // 不再等键（否则回显会让等键真等一次，玩家多按键）
      return HANDLER_QUIET;
    } else if (result === 0 && i !== 0) {
      era.print('条件不足。');
      continue;
    } else if (result === 1 && j !== 0) {
      // j===256 的隐藏选项不会被 era.input() 传回，见文件头（issue #130）
      era.print('条件不足。');
      continue;
    } else if (result === 0) {
      const new_lv = era.add(`abl:${cid}:8`, 1);
      era.add(`juel:${cid}:9`, -a);
      era.add(`juel:${cid}:5`, -b);
      await era.printAndWait(`${era.get('ablname:8') || ''}变为LV${new_lv}。`); // （等待）
      return;
    } else if (result === 1) {
      const new_lv = era.add(`abl:${cid}:8`, 1);
      era.add(`juel:${cid}:9`, -d);
      era.add(`juel:${cid}:6`, -e);
      await era.printAndWait(`${era.get('ablname:8') || ''}变为LV${new_lv}。`);
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

async function ablup9(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl9 = () => era.get(`abl:${cid}:9`) || 0;

  era.drawLine();
  if (abl9() >= 5) {
    await era.printAndWait('已达到MAX。');
    return;
  }

  const status_text = (bits) => {
    if (bits === 0) return 'ＯＫ';
    let text = '';
    if (bits & 1) text += '点数不足 ';
    if (bits & 2) text += '经验不足';
    if (bits & 4) text += '能力不足 ';
    return text;
  };

  for (;;) {
    const lv = abl9();
    // a/b/c/d 的梯子（c 只在 lv 2-4 非零，d 只在 lv 0-1 非零）
    let a, b, c, d;
    if (lv === 0) {
      [a, b, c, d] = [200, 50, 0, 1000];
    } else if (lv === 1) {
      [a, b, c, d] = [1000, 200, 0, 5000];
    } else if (lv === 2) {
      [a, b, c, d] = [3000, 500, 1000, 0];
    } else if (lv === 3) {
      [a, b, c, d] = [8000, 1000, 2000, 0];
      if (talent(27)) {
        a = times(a, 2.0);
        b = times(b, 2.0);
        c = times(c, 2.0);
      }
    } else {
      [a, b, c, d] = [20000, 2000, 5000, 0];
      if (talent(27)) {
        a = times(a, 3.0);
        b = times(b, 3.0);
        c = times(c, 3.0);
      }
    }
    if (talent(81)) {
      // 双性恋：先于倒错的
      a = times(a, 0.25);
      b = times(b, 0.25);
      c = times(c, 0.25);
      d = times(d, 0.25);
    }
    if (talent(80)) {
      // 倒错的
      a = times(a, 0.75);
      b = times(b, 0.75);
      c = times(c, 0.75);
      d = times(d, 0.75);
    }

    let i = 0,
      j = 0;
    let anomaly_line = '';
    if (lv === 3 && talent(81) === 0) {
      anomaly_line = `${era.get('expname:50')}有`;
      if ((era.get(`exp:${cid}:50`) || 0) === 0) {
        i |= 2;
        j |= 2;
      }
    } else if (lv === 4 && talent(81) === 0) {
      anomaly_line = `${era.get('expname:50')}2以上`;
      if ((era.get(`exp:${cid}:50`) || 0) < 2) {
        i |= 2;
        j |= 2;
      }
    }
    if (anomaly_line) era.print(anomaly_line);

    const juel5 = era.get(`juel:${cid}:5`) || 0;
    const juel6 = era.get(`juel:${cid}:6`) || 0;
    const exp40 = era.get(`exp:${cid}:40`) || 0;
    if (juel5 < a) i |= 1;
    if (juel6 < c) i |= 1;
    if (exp40 < b) i |= 2;

    let option0 = `- ${era.get('palamname:5')}点数×${a}`;
    if (c > 0) option0 += `、${era.get('palamname:6')}点数×${c}`;
    option0 += `、${era.get('expname:40')}${b}以上……${status_text(i)}`;
    era.printButton(option0, 0);
    // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）

    const juel0 = era.get(`juel:${cid}:0`) || 0;
    if (d > 0) {
      if (juel0 < d) j |= 1;
      if (exp40 < b) j |= 2;

      const option1 = `- ${era.get('palamname:0')}点数×${d}、${era.get('expname:40')}${b}以上……${status_text(j)}`;
      era.printButton(option1, 1);
      // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    } else {
      j = 256;
    }

    era.printButton('- 放弃', 100);

    const result = await era.input();
    if (result === 100) {
      // 放弃返回：最后一次动作是输入、其后无打印，返回哨兵让分发方
      // 不再等键（否则回显会让等键真等一次，玩家多按键）
      return HANDLER_QUIET;
    } else if (result === 0 && i !== 0) {
      era.print('条件不足。');
      continue;
    } else if (result === 1 && j !== 0) {
      // j===256 的隐藏选项不会被 era.input() 传回，见文件头（issue #130）
      era.print('条件不足。');
      continue;
    } else if (result === 0) {
      const new_lv = era.add(`abl:${cid}:9`, 1);
      era.add(`juel:${cid}:5`, -a);
      era.add(`juel:${cid}:6`, -c);
      await era.printAndWait(`${era.get('ablname:9') || ''}变为LV${new_lv}。`); // （等待）
      return;
    } else if (result === 1) {
      const new_lv = era.add(`abl:${cid}:9`, 1);
      era.add(`juel:${cid}:0`, -d);
      await era.printAndWait(`${era.get('ablname:9') || ''}变为LV${new_lv}。`);
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 * ablup10 的判定本体，与主流程共用。
 * 四条轨道 a(恐怖 JUEL:10)/b(恭顺 JUEL:4)/c(欲情 JUEL:5)/d(屈服 JUEL:6)，
 * i/j/k/l 四个独立可否位；k/l（i 见文件头）在对应等级为 0 时置 256（自动
 * 不可，对应选项不渲染）。
 * @param {number} cid 角色 ID
 * @returns {{blocked: (null|'talent'|'max'), lv: number, a: number, b: number,
 *   c: number, d: number, e: number, i: number, j: number, k: number, l: number,
 *   juel10: number, juel4: number, juel5: number, juel6: number, exp50: number}}
 */
function evaluate_ablup10(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const lv = era.get(`abl:${cid}:10`) || 0;

  if (lv >= 5 && talent(85) === 0 && talent(86) === 0) {
    return { blocked: 'talent' }; // 爱慕/盲从解锁
  }
  if (lv >= 10) return { blocked: 'max' };

  // a/b/c/d 的梯子
  let a, b, c, d;
  if (lv === 0) [a, b, c, d] = [10, 10, 300, 200];
  else if (lv === 1) [a, b, c, d] = [150, 100, 1000, 1200];
  else if (lv === 2) [a, b, c, d] = [1000, 800, 2000, 3000];
  else if (lv === 3) [a, b, c, d] = [3000, 3000, 0, 12000];
  else if (lv === 4) [a, b, c, d] = [8000, 5000, 0, 0];
  else if (lv === 5) [a, b, c, d] = [12000, 10000, 0, 0];
  else if (lv === 6) [a, b, c, d] = [25000, 20000, 0, 0];
  else if (lv === 7) [a, b, c, d] = [0, 40000, 0, 0];
  else if (lv === 8) [a, b, c, d] = [0, 80000, 0, 0];
  else [a, b, c, d] = [0, 150000, 0, 0]; // lv === 9

  // 异常经验：lv4→5 需 1 次、lv7→8 需 2 次，六项素质任一命中可免
  let e = 0;
  const anomaly_exempt10 =
    talent(10) === 0 &&
    talent(13) === 0 &&
    talent(76) === 0 &&
    talent(73) === 0 &&
    talent(85) === 0 &&
    talent(86) === 0;
  if (lv === 4 && anomaly_exempt10) e = 1;
  else if (lv === 7 && anomaly_exempt10) e = 2;

  if (talent(10)) {
    // 胆怯
    a = times(a, 0.5);
    b = times(b, 0.9);
    d = times(d, 0.9);
  }
  if (talent(11)) {
    // 反抗心
    a = times(a, 2.0);
    b = times(b, 1.5);
    c = times(c, 1.2);
    d = times(d, 1.5);
  }
  if (talent(12)) {
    // 刚强
    a = times(a, 3.0);
    b = times(b, 1.5);
    c = times(c, 1.2);
    d = times(d, 1.5);
  }
  if (talent(13)) {
    // 坦率
    b = times(b, 0.8);
    d = times(d, 0.9);
  }
  if (talent(16)) {
    // 嚣张
    a = times(a, 1.2);
    b = times(b, 1.5);
    d = times(d, 1.2);
  }
  if (talent(15)) {
    // 高姿态
    a = times(a, 1.2);
    b = times(b, 1.5);
    d = times(d, 2.0);
  } else if (talent(17)) {
    // 低姿态
    b = times(b, 0.8);
    d = times(d, 0.8);
  }
  if (talent(32)) {
    // 压抑
    a = times(a, 1.2);
    b = times(b, 1.2);
    c = times(c, 2.0);
    d = times(d, 1.2);
  } else if (talent(33)) {
    // 开放
    c = times(c, 0.5);
  }
  if (talent(34)) {
    // 抵抗
    a = times(a, 1.5);
    b = times(b, 1.5);
    c = times(c, 2.0);
    d = times(d, 2.0);
  }
  if (talent(76)) c = times(c, 0.5); // 淫乱
  if (talent(85)) b = times(b, 0.75); // 爱慕
  if (talent(86)) b = times(b, 0.2); // 盲从
  if (talent(84)) {
    // 嫉妒
    b = times(b, 5.0);
    c = times(c, 0.8);
    d = times(d, 2.0);
  }

  if (b < 1) b = 1; // （唯一设底的轨道）

  const juel10 = era.get(`juel:${cid}:10`) || 0;
  const juel4 = era.get(`juel:${cid}:4`) || 0;
  const juel5 = era.get(`juel:${cid}:5`) || 0;
  const juel6 = era.get(`juel:${cid}:6`) || 0;
  let i = 0,
    j = 0,
    k = 0,
    l = 0;
  if (a > 0) {
    if (juel10 < a) i |= 1;
  } else {
    i = 256;
  }
  if (juel4 < b) j |= 1; // （b 恒 >0，无哨兵）
  if (c > 0) {
    if (juel5 < c) k |= 1;
  } else {
    k = 256;
  }
  if (d > 0) {
    if (juel6 < d) l |= 1;
  } else {
    l = 256;
  }
  const exp50 = era.get(`exp:${cid}:50`) || 0;
  if (e > exp50) {
    i |= 2;
    j |= 2;
    k |= 2;
    l |= 2;
  }
  return {
    blocked: null,
    lv,
    a,
    b,
    c,
    d,
    e,
    i,
    j,
    k,
    l,
    juel10,
    juel4,
    juel5,
    juel6,
    exp50,
  };
}

/**
 * decide_ablup10 的返回值语义：**任一**轨道可提升即 1
 * （`i == 0 || j == 0 || k == 0 || l == 0`）。256 哨兵不等于 0，满级/隐藏
 * 选项不会凭哨兵混进「可提升」。
 * @param {number} cid 角色 ID
 * @returns {number} 1 / 0
 */
function decide_ablup10(cid) {
  const r = evaluate_ablup10(cid);
  if (r.blocked !== null) return 0;
  return r.i === 0 || r.j === 0 || r.k === 0 || r.l === 0 ? 1 : 0;
}

/**
 * core_ablup10：ABL:10 ++ 后按 i→j→k→l 的优先级
 * 扣**第一条**可用轨道的珠（也只会扣这一条）。
 * @param {number} cid 角色 ID
 * @returns {number} 0
 */
function core_ablup10(cid) {
  const r = evaluate_ablup10(cid);
  chara(cid).system.顺从 += 1; // ABL:10 ++
  if (r.blocked === null) {
    if (r.i === 0) era.add(`juel:${cid}:10`, -r.a);
    else if (r.j === 0) era.add(`juel:${cid}:4`, -r.b);
    else if (r.k === 0) era.add(`juel:${cid}:5`, -r.c);
    else if (r.l === 0) era.add(`juel:${cid}:6`, -r.d);
  }
  return 0;
}

async function ablup10(cid) {
  era.drawLine();

  const blocked = evaluate_ablup10(cid).blocked;
  if (blocked === 'talent') {
    await era.printAndWait('需要特殊素质才能继续提升');
    return;
  }
  if (blocked === 'max') {
    await era.printAndWait('已达最高级');
    return;
  }

  for (;;) {
    const { a, b, c, d, e, i, j, k, l, juel10, juel4, juel5, juel6, exp50 } =
      evaluate_ablup10(cid);

    if (e > 0) {
      era.print(`${era.get('expname:50')}${e}以上(现在${exp50})且`);
    }
    if (a > 0) {
      era.printButton(
        `- ${era.get('palamname:10')}点数×${juel10}/${a} ……${get_ablup_state(i)}`,
        0,
      );
      // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    }
    era.printButton(
      `- ${era.get('palamname:4')}点数×${juel4}/${b} ……${get_ablup_state(j)}`,
      1,
    ); // （恒渲染，无条件分支包裹）
    // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    if (c > 0) {
      era.printButton(
        `- ${era.get('palamname:5')}点数×${juel5}/${c} ……${get_ablup_state(k)}`,
        2,
      );
      // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    }
    if (d > 0) {
      era.printButton(
        `- ${era.get('palamname:6')}点数×${juel6}/${d} ……${get_ablup_state(l)}`,
        3,
      );
      // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    }
    era.printButton('- 停止', 100);

    const result = await era.input();
    if (result === 100) {
      // 放弃返回：最后一次动作是输入、其后无打印，返回哨兵让分发方
      // 不再等键（否则回显会让等键真等一次，玩家多按键）
      return HANDLER_QUIET;
    } else if (result === 0 && i !== 0) {
      // i===256（a===0）与 i&1/i&2 走同一分支，这里没有给 i 设专门的
      // 静默 256 分支（与 k/l 不对称，见文件头），两者在 era.input()
      // 层面同样不可达（issue #130）
      era.print('未满足条件');
      continue;
    } else if (result === 1 && j !== 0) {
      era.print('未满足条件');
      continue;
    } else if (result === 2 && k === 256) {
      continue; // c===0 时隐藏选项，引擎层拒收代位（issue #130）
    } else if (result === 2 && k !== 0) {
      era.print('未满足条件');
      continue;
    } else if (result === 3 && l === 256) {
      continue; // d===0 时隐藏选项（issue #130）
    } else if (result === 3 && l !== 0) {
      era.print('未满足条件');
      continue;
    } else if (result === 0) {
      const new_lv = (chara(cid).system.顺从 += 1);
      era.add(`juel:${cid}:10`, -a);
      era.print(`${era.get('ablname:10')}变为LV${new_lv}。`);
      return;
    } else if (result === 1) {
      const new_lv = (chara(cid).system.顺从 += 1);
      era.add(`juel:${cid}:4`, -b);
      era.print(`${era.get('ablname:10')}变为LV${new_lv}。`);
      return;
    } else if (result === 2) {
      const new_lv = (chara(cid).system.顺从 += 1);
      era.add(`juel:${cid}:5`, -c);
      era.print(`${era.get('ablname:10')}变为LV${new_lv}。`);
      return;
    } else if (result === 3) {
      const new_lv = (chara(cid).system.顺从 += 1);
      era.add(`juel:${cid}:6`, -d);
      era.print(`${era.get('ablname:10')}变为LV${new_lv}。`);
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

async function ablup11(cid, mode) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl11 = () => era.get(`abl:${cid}:11`) || 0;

  const status_text = (bits) => {
    if (bits === 0) return 'ＯＫ';
    let text = '';
    if (bits & 1) text += '点数不足 '; // （带尾随空格）
    if (bits & 2) text += '经验不足'; // （无尾随空格）
    return text;
  };

  if (!mode) era.drawLine(); // （干跑不输出）

  if (abl11() >= 5 && talent(73) === 0 && talent(76) === 0) {
    if (!mode) await era.printAndWait('需要特殊素质才能继续提升');
    return;
  }
  if (abl11() >= 10) {
    if (!mode) await era.printAndWait('已达最高级');
    return;
  }

  for (;;) {
    const lv = abl11();
    // a 的梯子
    let a = [5, 50, 1000, 5000, 12000, 20000, 30000, 50000, 80000, 150000][lv];

    if (talent(27)) {
      // 戒备森严
      if (lv === 3) a = times(a, 1.5);
      if (lv === 4) a = times(a, 2.0);
      if (lv === 5) a = times(a, 2.5);
      if (lv >= 6) a = times(a, 3.0);
    }
    if (talent(20)) a = times(a, 1.2); // 克制
    if (talent(24)) a = times(a, 1.1); // 保守的
    if (talent(30))
      a = times(a, 1.5); // 看重贞操
    else if (talent(31)) a = times(a, 0.95); // 看轻贞操
    if (talent(32))
      a = times(a, 1.5); // 压抑
    else if (talent(33)) a = times(a, 0.9); // 开放
    if (talent(34)) a = times(a, 1.5); // 抵抗
    if (talent(35))
      a = times(a, 1.1); // 害羞
    else if (talent(36)) a = times(a, 0.95); // 不知羞耻
    if (talent(70))
      a = times(a, 0.8); // 接受快感
    else if (talent(71)) a = times(a, 1.5); // 否定快感
    if (talent(72)) a = times(a, 0.95); // 容易上瘾
    if (talent(73)) a = times(a, 0.5); // 容易陷落
    if (talent(76)) a = times(a, 0.7); // 淫乱
    if (talent(180)) a = times(a, 0.9); // 妓女
    if (talent(181)) a = times(a, 0.8); // 倾城
    if (talent(157)) a = times(a, 0.8); // 人妻

    // 异常经验：lv4→5 需 1 次、lv7→8 需 3 次，五项素质任一命中可免
    let e = 0;
    const anomaly_exempt11 =
      talent(33) === 0 &&
      talent(70) === 0 &&
      talent(73) === 0 &&
      talent(76) === 0 &&
      talent(123) === 0;
    if (lv === 4 && anomaly_exempt11) e = 1;
    else if (lv === 7 && anomaly_exempt11) e = 3;

    if (a < 1) a = 1;

    const juel5 = era.get(`juel:${cid}:5`) || 0;
    const exp50_11 = era.get(`exp:${cid}:50`) || 0;
    let i = 0;
    if (juel5 < a) i |= 1;
    if (e > exp50_11) i |= 2;

    // 干跑出口（decide_ablup11 / core_ablup11）：decide_ablup11 与
    // core_ablup11 复用主流程同一段梯子/加成/门槛，不另写一份
    if (mode === 'decide') return { i }; // decide_ablup11 的返回值
    if (mode === 'core') {
      chara(cid).system.欲望 += 1; // core_ablup11: ABL:11 ++
      if (i === 0) era.add(`juel:${cid}:5`, -a); // JUEL:5 -= a
      return 0;
    }

    if (e > 0) {
      era.print(`${era.get('expname:50')}${e}以上(现在${exp50_11})且`);
    }
    era.printButton(
      `- ${era.get('palamname:5')}点数×${juel5}/${a} ……${status_text(i)}`,
      0,
    );
    // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    era.printButton('- 停止', 100);

    const result = await era.input();
    if (result === 100) {
      // 放弃返回：最后一次动作是输入、其后无打印，返回哨兵让分发方
      // 不再等键（否则回显会让等键真等一次，玩家多按键）
      return HANDLER_QUIET;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件');
      continue;
    } else if (result === 0) {
      const new_lv = (chara(cid).system.欲望 += 1);
      era.add(`juel:${cid}:5`, -a);
      era.print(`${era.get('ablname:11')}变为LV${new_lv}。`);
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

async function ablup12(cid, mode) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl12 = () => era.get(`abl:${cid}:12`) || 0;
  const abl15 = () => era.get(`abl:${cid}:15`) || 0;

  const status_text = (bits) => {
    if (bits === 0) return 'ＯＫ';
    let text = '';
    if (bits & 1) text += '点数不足 ';
    if (bits & 2) text += '人数不足 '; // 魔王技巧超过爱或淫乱人数+1 的自我训练上限，与经验无关
    if (bits & 4) text += '金钱不足\t'; // （尾随制表符，有意保留）
    return text;
  };

  if (!mode) era.drawLine(); // （干跑不输出）

  if (abl12() >= 10) {
    if (!mode) await era.printAndWait('已达最高级');
    return;
  }
  if (abl12() + abl15() >= 15) {
    const juel7_gate = era.get(`juel:${cid}:7`) || 0;
    if (juel7_gate < abl12() * abl12() * 1000) {
      if (!mode) {
        await era.printAndWait(`技巧(${abl12()})＋话术(${abl15()})上限为15`);
      }
      return;
    }
  }

  const self_training = cid === MASTER; // 被训练者即魔王本人

  for (;;) {
    const lv = abl12();
    // 组合上限触发时主流程提前返回，a/i 维持清零的初值——免费直接购买，
    // 不进梯子/素质/自我训练判定
    const combo_break = lv + abl15() >= 15;
    let a = 0;
    let i = 0;

    if (!combo_break) {
      // a 的梯子
      a = [1, 25, 200, 3000, 8000, 12000, 16000, 22000, 28000, 35000][lv];

      if (talent(27)) {
        // 戒备森严
        if (lv === 3) a = times(a, 1.5);
        if (lv === 4) a = times(a, 2.0);
        if (lv === 5) a = times(a, 2.5);
        if (lv >= 6) a = times(a, 3.0);
      }
      if (talent(13)) a = times(a, 0.95); // 坦率
      if (talent(21)) a = times(a, 1.05); // 冷漠
      if (talent(23)) a = times(a, 0.95); // 好奇心
      if (talent(24)) a = times(a, 1.1); // 保守的
      if (talent(32))
        a = times(a, 1.1); // 压抑
      else if (talent(33)) a = times(a, 0.9); // 开放
      if (talent(34)) a = times(a, 1.2); // 抵抗
      if (talent(35))
        a = times(a, 1.05); // 害羞
      else if (talent(36)) a = times(a, 0.95); // 不知羞耻
      if (talent(50))
        a = times(a, 0.8); // 快速学习
      else if (talent(51)) a = times(a, 1.5); // 学习缓慢
      if (talent(52)) a = times(a, 0.95); // 擅用舌头
      if (talent(63)) a = times(a, 0.95); // 献身的
      if (talent(64)) a = times(a, 0.95); // 不怕脏

      if (a < 1) a = 1;
    }

    const juel7 = era.get(`juel:${cid}:7`) || 0;
    const money = era_flag.money;
    const master_abl12 = era.get(`abl:${MASTER}:12`) || 0;
    const flag30 = era.get('flag:30') || 0;
    if (!combo_break) {
      if (juel7 < a) i |= 1;
      if (self_training && money < 5000) i |= 4;
      if (self_training && master_abl12 > flag30 + 1) i |= 2; // 魔王技巧超过爱或淫乱人数+1 不可自我训练
    }

    // 干跑出口（decide_ablup12 / core_ablup12）
    if (mode === 'decide') {
      // 干跑的组合上限直接返回 null（外层 decide_ablupN 折成 0），比主流程的
      // 「免费购买」分支更早判死
      if (combo_break) return null;
      return { i };
    }
    if (mode === 'core') {
      chara(cid).system.技巧 += 1; // core_ablup12: ABL:12 ++
      // 只扣珠不扣钱（core_ablup12 没有主流程的金钱段）
      if (i === 0) era.add(`juel:${cid}:7`, -a);
      return 0;
    }

    if (self_training) {
      era.print('魔王通过这种方式提升技巧仍然需要金钱5000点');
    }
    era.printButton(
      `- ${era.get('palamname:7')}点数×${juel7}/${a} ……${status_text(i)}`,
      0,
    );
    // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    era.printButton('- 停止', 100);

    const result = await era.input();
    if (result === 100) {
      // 放弃返回：最后一次动作是输入、其后无打印，返回哨兵让分发方
      // 不再等键（否则回显会让等键真等一次，玩家多按键）
      return HANDLER_QUIET;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件');
      continue;
    } else if (result === 0) {
      const new_lv = (chara(cid).system.技巧 += 1);
      if (self_training) {
        era_flag.money -= 5000;
        era_exflag.legit_money -= 5000;
        era.print('花费金钱5000点。');
      }
      era.add(`juel:${cid}:7`, -a);
      era.print(`${era.get('ablname:12')}变为LV${new_lv}。`);
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

async function ablup13(cid, mode) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl12 = () => era.get(`abl:${cid}:12`) || 0;
  const abl13 = () => era.get(`abl:${cid}:13`) || 0;
  const abl14 = () => era.get(`abl:${cid}:14`) || 0;
  const abl16 = () => era.get(`abl:${cid}:16`) || 0;

  if (!mode) era.drawLine(); // （干跑不输出）

  if ((abl13() >= 5 && abl16() < 5) || abl13() >= 10) {
    if (!mode) await era.printAndWait('已达最高级');
    return;
  }
  if (abl13() + abl14() >= 10) {
    const temp = Math.max(abl13(), abl14());
    const juel7_gate = era.get(`juel:${cid}:7`) || 0;
    if (juel7_gate < temp * temp * 500) {
      if (!mode) {
        era.print(`侍奉技术(${abl13()})＋性交技术(${abl14()})上限为10`);
        await era.printAndWait(
          `${era.get('palamname:7')}点数至少达到${temp * temp * 500}点、方可突破技术等级限制`,
        );
      }
      return;
    }
  }

  for (;;) {
    const lv = abl13();
    // a 的梯子，组合上限达到时改用 temp²×500
    let a = [5, 400, 1000, 3000, 6000, 9000, 12000, 16000, 20000, 25000][lv];
    if (lv + abl14() >= 10) {
      const temp = Math.max(lv, abl14());
      a = temp * temp * 500;
    }

    if (talent(27)) {
      // 戒备森严
      if (lv === 3) a = times(a, 1.5);
      if (lv === 4) a = times(a, 2.0);
      if (lv === 5) a = times(a, 2.5);
      if (lv >= 6) a = times(a, 3.0);
    }
    if (talent(11)) a = times(a, 1.2); // 反抗心
    if (talent(13)) a = times(a, 0.95); // 坦率
    if (talent(16)) a = times(a, 1.2); // 嚣张
    if (talent(15))
      a = times(a, 1.2); // 高姿态
    else if (talent(17)) a = times(a, 0.95); // 低姿态
    if (talent(21)) a = times(a, 1.05); // 冷漠
    if (talent(22)) a = times(a, 1.05); // 感情淡薄
    if (talent(23)) a = times(a, 0.95); // 好奇心
    if (talent(24)) a = times(a, 1.1); // 保守的
    if (talent(32))
      a = times(a, 1.1); // 压抑
    else if (talent(33)) a = times(a, 0.9); // 开放
    if (talent(34)) a = times(a, 1.2); // 抵抗
    if (talent(35))
      a = times(a, 1.05); // 害羞
    else if (talent(36)) a = times(a, 0.95); // 不知羞耻
    if (talent(37)) a = times(a, 0.9); // 把柄
    if (talent(50))
      a = times(a, 0.8); // 快速学习
    else if (talent(51)) a = times(a, 1.5); // 学习缓慢
    if (talent(52)) a = times(a, 0.9); // 擅用舌头
    if (talent(63)) a = times(a, 0.9); // 献身的
    if (talent(64)) a = times(a, 0.9); // 不怕脏
    if (talent(73)) a = times(a, 0.9); // 容易陷落
    if (talent(80)) a = times(a, 0.95); // 倒錯的
    if (talent(83)) a = times(a, 1.1); // 施虐狂
    // 侍奉精神分级折扣（非素质，按 ABL:16 当前等级）
    if (abl16() < 3) a = times(a, 1.0);
    else if (abl16() < 6) a = times(a, 0.95);
    else if (abl16() < 8) a = times(a, 0.9);
    else if (abl16() < 10) a = times(a, 0.85);
    else a = times(a, 0.8);

    if (a < 1) a = 1;

    const juel7 = era.get(`juel:${cid}:7`) || 0;
    let i = 0;
    if (juel7 < a) i |= 1;
    if (lv < 5 && abl12() < lv + 1) i |= 2;

    // 干跑出口（decide_ablup13 / core_ablup13）
    if (mode === 'decide') return { i };
    if (mode === 'core') {
      era.add(`abl:${cid}:13`, 1); // core_ablup13: ABL:13 ++
      if (i === 0) era.add(`juel:${cid}:7`, -a); // JUEL:7 -= a
      return 0;
    }

    if (lv < 5) {
      era.print(`${era.get('ablname:12')}LV${lv + 1}以上(现在LV${abl12()})且`);
    } else {
      era.print(`${era.get('ablname:16')}LV${lv + 1}以上(现在LV${abl16()})且`);
    }
    era.printButton(
      `- ${era.get('palamname:7')}点数×${juel7}/${a} ……${get_ablup_state(i)}`,
      0,
    );
    // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    era.printButton('- 停止', 100);

    const result = await era.input();
    if (result === 100) {
      // 放弃返回：最后一次动作是输入、其后无打印，返回哨兵让分发方
      // 不再等键（否则回显会让等键真等一次，玩家多按键）
      return HANDLER_QUIET;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件');
      continue;
    } else if (result === 0) {
      const new_lv = era.add(`abl:${cid}:13`, 1);
      era.add(`juel:${cid}:7`, -a);
      era.print(`${era.get('ablname:13')}变为LV${new_lv}。`);
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

async function ablup14(cid, mode) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl12 = () => era.get(`abl:${cid}:12`) || 0;
  const abl13 = () => era.get(`abl:${cid}:13`) || 0;
  const abl14 = () => era.get(`abl:${cid}:14`) || 0;
  const abl30 = () => era.get(`abl:${cid}:30`) || 0;

  if (!mode) era.drawLine(); // （干跑不输出）

  if (abl14() >= 10) {
    if (!mode) await era.printAndWait('已达最高级');
    return;
  }
  if (abl13() + abl14() >= 10) {
    const temp = Math.max(abl13(), abl14());
    const juel7_gate = era.get(`juel:${cid}:7`) || 0;
    if (juel7_gate < temp * temp * 500) {
      if (!mode) {
        era.print(`侍奉技术(${abl13()})＋性交技术(${abl14()})上限为10`);
        await era.printAndWait(
          `${era.get('palamname:7')}点数至少达到${temp * temp * 500}点、方可突破技术等级限制`,
        );
      }
      return;
    }
  }

  for (;;) {
    const lv = abl14();
    // a/b 的梯子，组合上限达到时 a 改用 temp²×500
    let a, b;
    if (lv === 0) [a, b] = [1, 3];
    else if (lv === 1) [a, b] = [10, 10];
    else if (lv === 2) [a, b] = [100, 30];
    else if (lv === 3) [a, b] = [1500, 80];
    else if (lv === 4) [a, b] = [4000, 100];
    else if (lv === 5) [a, b] = [5000, 130];
    else if (lv === 6) [a, b] = [6500, 160];
    else if (lv === 7) [a, b] = [8000, 200];
    else if (lv === 8) [a, b] = [10000, 250];
    else [a, b] = [15000, 300]; // lv === 9
    if (abl13() + lv >= 10) {
      const temp = Math.max(lv, abl13());
      a = temp * temp * 500;
    }

    if (talent(27)) {
      // 戒备森严
      if (lv === 3) {
        a = times(a, 1.5);
        b = times(b, 1.5);
      } else if (lv === 4) {
        a = times(a, 2.0);
        b = times(b, 2.0);
      } else if (lv === 5) {
        a = times(a, 2.5);
        b = times(b, 2.5);
      } else if (lv >= 6) {
        a = times(a, 3.0);
        b = times(b, 3.0);
      }
    }
    if (talent(13)) {
      // 坦率
      a = times(a, 0.9);
      b = times(b, 0.95);
    }
    if (talent(21)) {
      // 冷漠
      a = times(a, 1.1);
      b = times(b, 1.05);
    }
    if (talent(22)) {
      // 感情淡薄
      a = times(a, 1.1);
      b = times(b, 1.05);
    }
    if (talent(23)) {
      // 好奇心
      a = times(a, 0.95);
      b = times(b, 0.95);
    }
    if (talent(24)) {
      // 保守的
      a = times(a, 1.2);
      b = times(b, 1.1);
    }
    if (talent(32)) {
      // 压抑
      a = times(a, 1.1);
      b = times(b, 1.05);
    } else if (talent(33)) {
      // 开放
      a = times(a, 0.9);
      b = times(b, 0.95);
    }
    if (talent(34)) {
      // 抵抗
      a = times(a, 1.2);
      b = times(b, 1.1);
    }
    if (talent(35)) {
      // 害羞
      a = times(a, 1.1);
      b = times(b, 1.05);
    } else if (talent(36)) {
      // 不知羞耻
      a = times(a, 0.95);
      b = times(b, 0.95);
    }
    if (talent(50)) {
      // 快速学习
      a = times(a, 0.8);
      b = times(b, 0.8);
    } else if (talent(51)) {
      // 学习缓慢
      a = times(a, 1.5);
      b = times(b, 1.2);
    }
    if (talent(63)) {
      // 献身的
      a = times(a, 0.95);
      b = times(b, 0.95);
    }
    if (talent(64)) {
      // 不怕脏
      a = times(a, 0.95);
      b = times(b, 0.95);
    }
    // 性交中毒分级折扣（非素质，按 ABL:30）
    if (abl30() < 3) {
      a = times(a, 1.0);
      b = times(b, 1.0);
    } else if (abl30() < 6) {
      a = times(a, 0.95);
      b = times(b, 0.95);
    } else if (abl30() < 8) {
      a = times(a, 0.9);
      b = times(b, 0.9);
    } else if (abl30() < 10) {
      a = times(a, 0.85);
      b = times(b, 0.85);
    } else {
      a = times(a, 0.8);
      b = times(b, 0.8);
    }

    if (a < 1) a = 1;
    if (b < 1) b = 1;

    const juel7 = era.get(`juel:${cid}:7`) || 0;
    const exp5 = era.get(`exp:${cid}:5`) || 0;
    let i = 0;
    if (juel7 < a) i |= 1;
    if (exp5 < b) i |= 2;
    // 技巧门槛：性交技术未达 Lv5 时要求 技巧≥性交技术+1（与 ablup13 同形），
    // Lv5 以上不再检查——渲染层同样不显示技巧要求行
    if (abl14() < 5 && abl12() < lv + 1) i |= 4;

    // 干跑出口（decide_ablup14 / core_ablup14）
    if (mode === 'decide') return { i };
    if (mode === 'core') {
      era.add(`abl:${cid}:14`, 1); // core_ablup14: ABL ++
      if (i === 0) era.add(`juel:${cid}:7`, -a); // JUEL:7 -= a
      return 0;
    }

    if (lv < 5) {
      era.print(`${era.get('ablname:12')}LV${lv + 1}以上(现在LV${abl12()})且`);
    }
    era.printButton(
      `- ${era.get('palamname:7')}点数×${juel7}/${a} ……${get_ablup_state(i)}`,
      0,
    );
    // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    era.print(`${NBSP.repeat(6)}${era.get('expname:5')}　${exp5}/${b}`);
    era.printButton('- 停止', 100);

    const result = await era.input();
    if (result === 100) {
      // 放弃返回：最后一次动作是输入、其后无打印，返回哨兵让分发方
      // 不再等键（否则回显会让等键真等一次，玩家多按键）
      return HANDLER_QUIET;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件');
      continue;
    } else if (result === 0) {
      const new_lv = era.add(`abl:${cid}:14`, 1);
      era.add(`juel:${cid}:7`, -a);
      era.print(`${era.get('ablname:14')}变为LV${new_lv}。`);
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

async function ablup15(cid, mode) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl12 = () => era.get(`abl:${cid}:12`) || 0;
  const abl15 = () => era.get(`abl:${cid}:15`) || 0;

  if (!mode) era.drawLine(); // （干跑不输出）

  if (abl15() >= 10) {
    if (!mode) await era.printAndWait('已达最高级');
    return;
  }
  if (abl12() + abl15() >= 15) {
    const juel7_gate = era.get(`juel:${cid}:7`) || 0;
    if (juel7_gate < abl15() * abl15() * 1000) {
      if (!mode)
        await era.printAndWait(`技巧(${abl12()})＋话术(${abl15()})上限为15`);
      return;
    }
  }

  for (;;) {
    const lv = abl15();
    // 组合上限触发时主流程提前返回，a/b/c/i 维持清零的初值——免费直接购买，
    // 不进梯子/素质判定
    const combo_break = abl12() + lv >= 15;
    let a = 0,
      b = 0,
      c = 0;
    let i = 0;

    if (!combo_break) {
      // a/b/c 的梯子
      if (lv === 0) [a, b, c] = [1, 3, 5];
      else if (lv === 1) [a, b, c] = [10, 10, 20];
      else if (lv === 2) [a, b, c] = [100, 30, 50];
      else if (lv === 3) [a, b, c] = [1500, 50, 100];
      else if (lv === 4) [a, b, c] = [3000, 100, 150];
      else if (lv === 5) [a, b, c] = [4000, 120, 180];
      else if (lv === 6) [a, b, c] = [5200, 150, 250];
      else if (lv === 7) [a, b, c] = [7500, 180, 320];
      else if (lv === 8) [a, b, c] = [9000, 220, 350];
      else [a, b, c] = [13000, 250, 400]; // lv === 9

      if (talent(27)) {
        // 戒备森严
        if (lv === 3) {
          a = times(a, 1.5);
          b = times(b, 1.25);
          c = times(c, 1.25);
        } else if (lv === 4) {
          a = times(a, 2.0);
          b = times(b, 1.5);
          c = times(c, 1.5);
        } else if (lv === 5) {
          a = times(a, 2.5);
          b = times(b, 1.75);
          c = times(c, 1.75);
        } else if (lv >= 6) {
          a = times(a, 3.0);
          b = times(b, 2.0);
          c = times(c, 2.0);
        }
      }
      if (talent(11)) {
        // 反抗心
        a = times(a, 1.5);
        b = times(b, 1.2);
        c = times(c, 1.2);
      }
      if (talent(13)) {
        // 坦率
        a = times(a, 0.9);
        b = times(b, 0.95);
        c = times(c, 0.95);
      }
      if (talent(16)) {
        // 嚣张
        a = times(a, 1.25);
        b = times(b, 1.15);
        c = times(c, 1.15);
      }
      if (talent(15)) {
        // 高姿态
        a = times(a, 1.2);
        b = times(b, 1.1);
        c = times(c, 1.1);
      }
      if (talent(21)) {
        // 冷漠
        a = times(a, 1.5);
        b = times(b, 1.2);
        c = times(c, 1.2);
      }
      if (talent(22)) {
        // 感情淡薄
        a = times(a, 1.5);
        b = times(b, 1.2);
        c = times(c, 1.2);
      }
      if (talent(23)) {
        // 好奇心
        a = times(a, 0.95);
        b = times(b, 0.95);
        c = times(c, 0.95);
      }
      if (talent(25)) {
        // 乐观的
        a = times(a, 0.95);
        b = times(b, 0.95);
        c = times(c, 0.95);
      } else if (talent(26)) {
        // 悲观的
        a = times(a, 1.2);
        b = times(b, 1.1);
        c = times(c, 1.1);
      }
      if (talent(28)) {
        // 爱表现
        a = times(a, 0.95);
        b = times(b, 0.95);
        c = times(c, 0.95);
      }
      if (talent(32)) {
        // 压抑
        a = times(a, 1.2);
        b = times(b, 1.1);
        c = times(c, 1.1);
      } else if (talent(33)) {
        // 开放
        a = times(a, 0.9);
        b = times(b, 0.9);
        c = times(c, 0.9);
      }
      if (talent(34)) {
        // 抵抗
        a = times(a, 1.2);
        b = times(b, 1.1);
        c = times(c, 1.1);
      }
      if (talent(35)) {
        // 害羞
        a = times(a, 1.2);
        b = times(b, 1.1);
        c = times(c, 1.1);
      } else if (talent(36)) {
        // 不知羞耻
        a = times(a, 0.95);
        b = times(b, 0.95);
        c = times(c, 0.95);
      }
      if (talent(50)) {
        // 快速学习
        a = times(a, 0.8);
        b = times(b, 0.8);
        c = times(c, 0.8);
      } else if (talent(51)) {
        // 学习缓慢
        a = times(a, 1.2);
        b = times(b, 1.1);
        c = times(c, 1.1);
      }
      if (talent(92)) {
        // 谜之魅力
        a = times(a, 0.9);
        b = times(b, 0.9);
        c = times(c, 0.9);
      }
      if (talent(87)) {
        // 小恶魔
        a = times(a, 0.95);
        b = times(b, 0.95);
        c = times(c, 0.95);
      }
      if (talent(182)) {
        // 巧言
        a = times(a, 0.6);
        b = times(b, 0.8);
        c = times(c, 0.8);
      }

      if (a < 1) a = 1;
      if (b < 1) b = 1;
      if (c < 1) c = 1;
    }

    const juel7 = era.get(`juel:${cid}:7`) || 0;
    const exp73 = era.get(`exp:${cid}:73`) || 0;
    const exp74 = era.get(`exp:${cid}:74`) || 0;
    if (!combo_break) {
      if (juel7 < a) i |= 1;
      if (exp73 < b && exp74 < c) i |= 2; // （任一经验达标即可免）
    }

    // 干跑出口（decide_ablup15 / core_ablup15）
    if (mode === 'decide') {
      // 干跑的组合上限直接返回 null（外层 decide_ablupN 折成 0），比主流程的
      // 「免费购买」分支更早判死
      if (combo_break) return null;
      return { i };
    }
    if (mode === 'core') {
      era.add(`abl:${cid}:15`, 1); // core_ablup15: ABL ++
      if (i === 0) era.add(`juel:${cid}:7`, -a); // JUEL:7 -= a
      return 0;
    }

    era.printButton(
      `- ${era.get('palamname:7')}点数×${juel7}/${a} ……${get_ablup_state(i)}`,
      0,
    );
    // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    era.print(`${NBSP.repeat(6)}${era.get('expname:73')}　${exp73}/${b} or`);
    era.print(`${NBSP.repeat(6)}${era.get('expname:74')}　${exp74}/${c}`);
    era.printButton('- 停止', 100);

    const result = await era.input();
    if (result === 100) {
      // 放弃返回：最后一次动作是输入、其后无打印，返回哨兵让分发方
      // 不再等键（否则回显会让等键真等一次，玩家多按键）
      return HANDLER_QUIET;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件');
      continue;
    } else if (result === 0) {
      const new_lv = era.add(`abl:${cid}:15`, 1);
      era.add(`juel:${cid}:7`, -a);
      era.print(`${era.get('ablname:15')}变为LV${new_lv}。`);
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

async function ablup16(cid, mode) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl10 = () => era.get(`abl:${cid}:10`) || 0;
  const abl16 = () => era.get(`abl:${cid}:16`) || 0;

  if (!mode) era.drawLine(); // （干跑不输出）

  // 入口把关用 OR：任一素质缺失即挡。decide 干跑的素质复查与这里同条件
  // （见 decide 分支），两个调用点（`*` 标记与 auto_ablup）都不经过这里。
  if (
    !mode &&
    abl16() >= 5 &&
    (talent(63) === 0 || talent(85) === 0 || talent(86) === 0)
  ) {
    await era.printAndWait('需要特殊素质才能继续提升');
    return;
  }
  if (abl16() >= 10) {
    if (!mode) await era.printAndWait('已达最高级');
    return;
  }

  for (;;) {
    const lv = abl16();
    // a/b/c/d/e 的梯子（c 只在 lv 0-2 非零）
    let a, b, c, d, e;
    if (lv === 0) [a, b, c, d, e] = [100, 20, 100, 1, 1];
    else if (lv === 1) [a, b, c, d, e] = [1200, 400, 2000, 1, 3];
    else if (lv === 2) [a, b, c, d, e] = [5000, 2000, 10000, 20, 6];
    else if (lv === 3) [a, b, c, d, e] = [10000, 3000, 0, 20, 10];
    else if (lv === 4) [a, b, c, d, e] = [30000, 10000, 0, 100, 20];
    else if (lv === 5) [a, b, c, d, e] = [50000, 20000, 0, 200, 80];
    else if (lv === 6) [a, b, c, d, e] = [70000, 30000, 0, 350, 150];
    else if (lv === 7) [a, b, c, d, e] = [100000, 50000, 0, 500, 200];
    else if (lv === 8) [a, b, c, d, e] = [150000, 80000, 0, 700, 400];
    else [a, b, c, d, e] = [200000, 150000, 0, 1000, 800]; // lv === 9

    if (talent(27)) {
      // 戒备森严（a/b/d/e，c 不受影响）
      if (lv === 3) {
        a = times(a, 1.5);
        b = times(b, 1.5);
        d = times(d, 1.5);
        e = times(e, 1.5);
      } else if (lv === 4) {
        a = times(a, 2.0);
        b = times(b, 2.0);
        d = times(d, 2.0);
        e = times(e, 2.0);
      } else if (lv === 5) {
        a = times(a, 2.5);
        b = times(b, 2.5);
        d = times(d, 2.5);
        e = times(e, 2.5);
      } else if (lv >= 6) {
        a = times(a, 3.0);
        b = times(b, 3.0);
        d = times(d, 3.0);
        e = times(e, 3.0);
      }
    }

    // 异常经验：lv>=3 时需要，三项素质任一命中可免
    let f = 0;
    if (lv >= 3 && talent(63) === 0 && talent(85) === 0 && talent(86) === 0) {
      f = lv - 2;
    }

    if (talent(11)) {
      // 反抗心
      a = times(a, 1.2);
      b = times(b, 1.4);
      d = times(d, 1.2);
      e = times(e, 1.2);
    }
    if (talent(12)) {
      // 刚强
      a = times(a, 1.2);
      d = times(d, 1.2);
    }
    if (talent(13)) {
      // 坦率
      a = times(a, 0.9);
      b = times(b, 0.8);
      c = times(c, 0.8);
      d = times(d, 0.7);
    }
    if (talent(16)) {
      // 嚣张
      a = times(a, 1.1);
      b = times(b, 1.1);
    }
    if (talent(15)) {
      // 高姿态
      a = times(a, 1.4);
      b = times(b, 1.3);
      d = times(d, 1.2);
      e = times(e, 1.2);
    } else if (talent(17)) {
      // 低姿态
      a = times(a, 0.9);
      b = times(b, 0.8);
      d = times(d, 0.8);
      e = times(e, 0.8);
    }
    if (talent(20)) {
      // 克制
      a = times(a, 1.2);
      b = times(b, 1.2);
      d = times(d, 1.2);
      e = times(e, 1.2);
    }
    if (talent(21)) {
      // 冷漠
      a = times(a, 1.1);
      b = times(b, 1.1);
      d = times(d, 1.2);
      e = times(e, 1.1);
    }
    if (talent(22)) {
      // 感情淡薄
      a = times(a, 1.2);
      b = times(b, 1.2);
      d = times(d, 1.4);
      e = times(e, 1.2);
    }
    if (talent(24)) {
      // 保守的
      a = times(a, 1.3);
      b = times(b, 1.3);
      c = times(c, 1.3);
      d = times(d, 1.2);
      e = times(e, 1.2);
    }
    if (talent(25)) {
      // 乐观的
      a = times(a, 0.9);
      b = times(b, 0.8);
      d = times(d, 0.7);
      e = times(e, 0.75);
    } else if (talent(26)) {
      // 悲观的
      a = times(a, 0.8);
      b = times(b, 0.8);
      d = times(d, 0.8);
      e = times(e, 0.8);
    }
    if (talent(28)) {
      // 爱表现
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
      d = times(d, 0.9);
    }
    if (talent(32)) {
      // 压抑
      a = times(a, 1.1);
      b = times(b, 1.1);
      d = times(d, 2.5);
      e = times(e, 3.0);
    } else if (talent(33)) {
      // 开放
      a = times(a, 0.9);
      b = times(b, 0.9);
      d = times(d, 0.7);
      e = times(e, 0.6);
    }
    if (talent(34)) {
      // 抵抗
      a = times(a, 1.5);
      b = times(b, 1.5);
      c = times(c, 1.5);
      d = times(d, 2.0);
      e = times(e, 2.0);
    }
    if (talent(37)) {
      // 把柄
      a = times(a, 0.8);
      b = times(b, 0.8);
      c = times(c, 0.8);
      d = times(d, 0.5);
      e = times(e, 0.5);
    }
    if (talent(50)) c = times(c, 0.8); // 快速学习
    if (talent(51)) c = times(c, 1.6); // 学习缓慢
    if (talent(52)) c = times(c, 0.8); // 擅用舌头
    if (talent(63)) {
      // 献身的
      a = times(a, 0.8);
      b = times(b, 0.7);
      d = times(d, 0.6);
      e = times(e, 0.8);
    }
    if (talent(70)) {
      // 接受快感
      e = times(e, 0.7);
    } else if (talent(71)) {
      // 否定快感
      e = times(e, 3.0);
    }
    if (talent(73)) {
      // 容易陷落
      a = times(a, 0.5);
      b = times(b, 0.5);
      d = times(d, 0.5);
      e = times(e, 0.5);
    }
    if (talent(80)) {
      // 倒錯的
      a = times(a, 0.75);
      b = times(b, 0.75);
      c = times(c, 0.75);
      d = times(d, 0.75);
      e = times(e, 0.75);
    }
    if (talent(83)) {
      // 施虐狂
      a = times(a, 1.2);
      b = times(b, 1.2);
      d = times(d, 1.5);
    }
    if (talent(85)) {
      // 爱慕
      a = times(a, 0.75);
      b = times(b, 0.75);
      c = times(c, 0.75);
      d = times(d, 0.75);
    }
    if (talent(86)) {
      // 盲从
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
      d = times(d, 0.5);
      e = times(e, 0.5);
    }
    if (talent(87)) {
      // 小恶魔
      a = times(a, 1.1);
      b = times(b, 1.1);
      d = times(d, 1.2);
      e = times(e, 0.8);
    }
    if (talent(123)) {
      // 疯狂
      a = times(a, 2.5);
      b = times(b, 3.0);
      c = times(c, 1.5);
      d = times(d, 0.8);
      e = times(e, 0.5);
    }
    if (talent(9)) {
      // 崩坏
      a = times(a, 2.5);
      b = times(b, 2.5);
      c = times(c, 2.5);
      d = times(d, 0.5);
      e = times(e, 0.5);
    }

    if (a < 1) a = 1;
    if (b < 1) b = 1;
    if (d < 1) d = 1;
    if (e < 1) e = 1; // （c 无底线，靠 256 哨兵表达不可购买）

    const juel6 = era.get(`juel:${cid}:6`) || 0;
    const juel4 = era.get(`juel:${cid}:4`) || 0;
    const juel7 = era.get(`juel:${cid}:7`) || 0;
    const exp2 = era.get(`exp:${cid}:2`) || 0;
    const exp20 = era.get(`exp:${cid}:20`) || 0;
    const exp21 = era.get(`exp:${cid}:21`) || 0;
    const exp50_16 = era.get(`exp:${cid}:50`) || 0;
    let i = 0,
      j = 0,
      k = 0;
    if (juel6 < a) i |= 1;
    if (b > 0) {
      if (juel4 < b) j |= 1;
      if (exp21 < d) j |= 2;
    } else {
      j = 256;
    }
    if (c > 0) {
      if (juel7 < c) k |= 1;
      if (exp2 < 1) k |= 2; // （固定阈值 1，与 d/e 门槛无关）
    } else {
      k = 256;
    }
    if (exp2 < e) i |= 2;
    if (exp20 < e) i |= 2;
    if (abl10() < lv + 1) {
      // 顺从门槛，三条轨道同时命中
      i |= 4;
      j |= 4;
      k |= 4;
    }
    if (f > exp50_16) {
      // 异常经验不足，三条轨道同时命中
      i |= 2;
      j |= 2;
      k |= 2;
    }

    // 干跑出口（decide_ablup16 / core_ablup16）
    if (mode === 'decide') {
      // 素质复查与入口把关同条件（OR）：两个调用点（`*` 标记与 auto_ablup）
      // 不经过入口把关，缺一即不可提升
      if (
        abl16() >= 5 &&
        (talent(63) === 0 || talent(85) === 0 || talent(86) === 0)
      ) {
        return null;
      }
      return { i, j, k };
    }
    if (mode === 'core') {
      chara(cid).system.侍奉精神 += 1; // core_ablup16: ABL:16 ++（system 域，走门面）
      if (i === 0) era.add(`juel:${cid}:6`, -a);
      else if (j === 0) era.add(`juel:${cid}:4`, -b);
      else if (k === 0) era.add(`juel:${cid}:7`, -c);
      return 0;
    }

    era.print(`${era.get('ablname:10')}LV${lv + 1}以上(现在LV${abl10()})且`);
    if (f > 0) {
      era.print(`${era.get('expname:50')}${f}以上(现在${exp50_16})且`);
    }
    era.printButton(
      `- ${era.get('palamname:6')}点数×${juel6}/${a} ……${get_ablup_state(i)}`,
      0,
    ); // （恒渲染）
    // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    if (e > 0) {
      era.print(`　　　${era.get('expname:2')}　${exp2}/${e}`);
      era.print(`　　　${era.get('expname:20')}　${exp20}/${e}`);
    }
    if (b > 0) {
      era.printButton(
        `- ${era.get('palamname:4')}点数×${juel4}/${b} ……${get_ablup_state(j)}`,
        1,
      );
      // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
      if (d > 0) {
        era.print(`　　　${era.get('expname:21')}　${exp21}/${d}`);
      }
    }
    if (c > 0) {
      era.printButton(
        `- ${era.get('palamname:7')}点数×${juel7}/${c} ……${get_ablup_state(k)}`,
        2,
      );
      // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
      era.print(`　　　${era.get('expname:2')}　${exp2}/1`); // （分母固定为 1，非变量）
    }
    era.printButton('- 停止', 100);

    const result = await era.input();
    if (result === 100) {
      // 放弃返回：最后一次动作是输入、其后无打印，返回哨兵让分发方
      // 不再等键（否则回显会让等键真等一次，玩家多按键）
      return HANDLER_QUIET;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件');
      continue;
    } else if (result === 1 && j === 256) {
      continue; // b===0 时隐藏选项，issue #130
    } else if (result === 1 && j !== 0) {
      era.print('未满足条件');
      continue;
    } else if (result === 2 && k === 256) {
      continue; // c===0 时隐藏选项，issue #130
    } else if (result === 2 && k !== 0) {
      era.print('未满足条件');
      continue;
    } else if (result === 0) {
      const new_lv = (chara(cid).system.侍奉精神 += 1);
      era.add(`juel:${cid}:6`, -a);
      era.print(`${era.get('ablname:16')}变为LV${new_lv}。`);
      return;
    } else if (result === 1) {
      const new_lv = (chara(cid).system.侍奉精神 += 1);
      era.add(`juel:${cid}:4`, -b);
      era.print(`${era.get('ablname:16')}变为LV${new_lv}。`);
      return;
    } else if (result === 2) {
      const new_lv = (chara(cid).system.侍奉精神 += 1);
      era.add(`juel:${cid}:7`, -c);
      era.print(`${era.get('ablname:16')}变为LV${new_lv}。`);
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

async function ablup17(cid, mode) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl10 = () => era.get(`abl:${cid}:10`) || 0;
  const abl11 = () => era.get(`abl:${cid}:11`) || 0;
  const abl17 = () => era.get(`abl:${cid}:17`) || 0;

  if (!mode) era.drawLine(); // （干跑不输出）

  if (
    abl17() >= 5 &&
    talent(13) === 0 &&
    talent(33) === 0 &&
    talent(28) === 0 &&
    talent(89) === 0
  ) {
    if (!mode) await era.printAndWait('需要特殊素质才能继续提升');
    return;
  }
  if (abl17() >= 10) {
    if (!mode) await era.printAndWait('已达最高级');
    return;
  }

  for (;;) {
    const lv = abl17();
    // a 的梯子
    let a = [100, 1000, 3000, 6000, 12000, 25000, 50000, 80000, 120000, 150000][
      lv
    ];

    if (talent(27)) {
      // 戒备森严
      if (lv === 3) a = times(a, 1.5);
      if (lv === 4) a = times(a, 2.0);
      if (lv === 5) a = times(a, 2.5);
      if (lv >= 6) a = times(a, 3.0);
    }

    // 异常经验：lv>=3 时需要，六项素质任一命中可免
    let b = 0;
    if (
      lv >= 3 &&
      talent(28) === 0 &&
      talent(33) === 0 &&
      talent(76) === 0 &&
      talent(80) === 0 &&
      talent(88) === 0 &&
      talent(123) === 0
    ) {
      b = lv - 2;
    }

    if (talent(9)) a = times(a, 0.8); // 崩坏
    if (talent(10)) a = times(a, 1.2); // 胆怯
    if (talent(11)) a = times(a, 1.5); // 反抗心
    if (talent(12)) a = times(a, 1.1); // 刚强
    if (talent(16)) a = times(a, 1.1); // 嚣张
    if (talent(20)) a = times(a, 1.1); // 克制
    if (talent(21)) a = times(a, 1.1); // 冷漠
    if (talent(22)) a = times(a, 1.5); // 感情淡薄
    if (talent(28)) a = times(a, 0.5); // 爱表现
    if (talent(30)) a = times(a, 1.2); // 看重贞操
    if (talent(31)) a = times(a, 0.9); // 看轻贞操
    if (talent(32))
      a = times(a, 1.2); // 压抑
    else if (talent(33)) a = times(a, 0.8); // 开放
    if (talent(34)) a = times(a, 1.5); // 抵抗
    if (talent(35))
      a = times(a, 1.1); // 害羞
    else if (talent(36)) a = times(a, 0.9); // 不知羞耻
    if (talent(37)) a = times(a, 0.8); // 把柄
    if (talent(60)) a = times(a, 0.9); // 容易自慰
    if (talent(70))
      a = times(a, 0.9); // 接受快感
    else if (talent(71)) a = times(a, 1.2); // 否定快感
    if (talent(72)) a = times(a, 0.9); // 容易上瘾
    if (talent(73)) a = times(a, 0.5); // 容易陷落
    if (talent(76)) a = times(a, 0.8); // 淫乱
    if (talent(80)) a = times(a, 0.75); // 倒錯的
    if (talent(83)) a = times(a, 1.2); // 施虐狂
    if (talent(88)) a = times(a, 0.75); // 受虐狂
    if (talent(123)) a = times(a, 0.5); // 疯狂

    let i = 0;
    // 欲望/顺从门槛：有[爱慕]时改查顺从，否则查欲望
    if (talent(85) === 0) {
      if (abl11() < lv + 1) i |= 4;
    } else {
      if (abl10() < lv + 1) i |= 4;
    }

    if (a < 1) a = 1;

    const exp50_17 = era.get(`exp:${cid}:50`) || 0;
    const c = lv === 0 ? 1 : 0; // 仅 Lv0→1 需要绝顶经验
    const d = lv === 1 ? 1 : 0; // 仅 Lv1→2 需要调教自慰经验
    const exp2 = era.get(`exp:${cid}:2`) || 0;
    const exp11 = era.get(`exp:${cid}:11`) || 0;
    if (exp50_17 < b) i |= 2;
    if (exp2 < c) i |= 2;
    if (exp11 < d) i |= 2;

    const juel8 = era.get(`juel:${cid}:8`) || 0;
    if (juel8 < a) i |= 1;

    // 干跑出口（decide_ablup17 / core_ablup17）
    if (mode === 'decide') return { i };
    if (mode === 'core') {
      chara(cid).system.露出癖 += 1; // core_ablup17: ABL:17 ++
      if (i === 0) era.add(`juel:${cid}:8`, -a); // JUEL:8 -= a
      return 0;
    }

    if (talent(85) === 0) {
      era.print(`${era.get('ablname:11')}LV${lv + 1}以上(现在LV${abl11()})且`);
    } else {
      era.print(`${era.get('ablname:10')}LV${lv + 1}以上(现在LV${abl10()})且`);
    }
    if (b > 0) {
      era.print(`${era.get('expname:50')}${b}以上(现在${exp50_17})且`);
    }
    era.printButton(
      `- ${era.get('palamname:8')}点数×${juel8}/${a} ……${get_ablup_state(i)}`,
      0,
    );
    // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    if (c > 0) {
      era.print(`　　　${era.get('expname:2')}　${exp2}/${c}`); // （仅 Lv0→1）
    }
    if (d > 0) {
      era.print(`　　　${era.get('expname:11')}　${exp11}/${d}`); // （仅 Lv1→2）
    }
    era.printButton('- 停止', 100);

    const result = await era.input();
    if (result === 100) {
      // 放弃返回：最后一次动作是输入、其后无打印，返回哨兵让分发方
      // 不再等键（否则回显会让等键真等一次，玩家多按键）
      return HANDLER_QUIET;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件'); // （与 ablup10～16 统一，无句号）
      continue;
    } else if (result === 0) {
      const new_lv = (chara(cid).system.露出癖 += 1);
      era.add(`juel:${cid}:8`, -a);
      era.print(`${era.get('ablname:17')}变为LV${new_lv}。`);
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 *
 * 本函数自己的三处特性，保留原样：
 * - 状态文案是 ablup20 内联的拼接链，拼为「点数不足 」「经验不足」（无尾随
 *   空格）「能力不足 」——bit2/bit4 的尾随空格与共享 get_ablup_state（经验
 *   不足带空格、能力不足不带）恰好相反，不能复用。
 * - 异常经验 c 的赋值分两段：戒备森严块对 c 的乘算在 c 赋值之前——乘的是
 *   0，全部无效；而淫乱块对 c 的乘算在赋值之后，×0.80 真实生效（lv4 无
 *   豁免素质时 c = floor(2×0.8) = 1，不是 2）。d/e 无人读取，g=1 同样
 *   无读者，本函数都不算。
 * - 异常经验行用全角括号「（现在{EXP:50}）」，本文件其余函数均为半角。
 *   输入越界分支是「非 0 且非 100 即重试」的 else，不是区间比较。
 */
async function ablup20(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl11 = () => era.get(`abl:${cid}:11`) || 0;
  const abl20 = () => era.get(`abl:${cid}:20`) || 0;
  const abl21 = () => era.get(`abl:${cid}:21`) || 0;

  // ablup20 的内联状态文案（与 get_ablup_state 的尾随空格分布相反）
  const state_text = (i) => {
    if (i === 0) return 'ＯＫ';
    return `${i & 1 ? '点数不足 ' : ''}${i & 2 ? '经验不足' : ''}${i & 4 ? '能力不足 ' : ''}`;
  };

  era.drawLine();

  if (
    abl20() >= 5 &&
    talent(80) === 0 &&
    talent(83) === 0 &&
    talent(127) === 0
  ) {
    await era.printAndWait('需要特殊素质才能继续提升');
    return;
  }
  if (abl20() + abl21() >= 20) {
    await era.printAndWait(`抖S气质(${abl20()})＋抖M气质(${abl21()})上限为20`);
    return;
  }
  if (abl20() >= 10) {
    await era.printAndWait('已达最高级');
    return;
  }

  for (;;) {
    const lv = abl20();
    // a(欲情点数)/b(施虐快乐经验) 的梯子
    const ladder = [
      [100, 5],
      [500, 20],
      [1500, 50],
      [3000, 120],
      [5000, 300],
      [8000, 600],
      [12000, 1500],
      [15000, 3000],
      [25000, 5000],
      [30000, 8000],
    ][lv];
    let [a, b] = ladder;
    // c（异常经验）：lv3/4/7 且无[倒错的/施虐狂/嫉妒/小恶魔]时 = lv-2。
    // 戒备森严块对 c 的乘算在 c 赋值前，乘 0 无效；淫乱块的在赋值之后，
    // 见下面淫乱块的 ×0.80；d/e/g 无读者，不算（见函数头注释）
    let c = 0;
    if (
      (lv === 3 || lv === 4 || lv === 7) &&
      talent(80) === 0 &&
      talent(83) === 0 &&
      talent(84) === 0 &&
      talent(87) === 0
    ) {
      c = lv - 2;
    }

    if (talent(10)) a = times(a, 1.5); // 胆怯（只乘 a）
    if (talent(11)) {
      // 反抗心
      a = times(a, 0.9);
      b = times(b, 0.9);
    }
    if (talent(12)) a = times(a, 0.9); // 刚强
    if (talent(14)) a = times(a, 1.2); // 文静
    if (talent(16)) {
      // 嚣张
      a = times(a, 0.9);
      b = times(b, 0.9);
    }
    if (talent(15)) {
      // 高姿态
      a = times(a, 0.9);
      b = times(b, 0.9);
    } else if (talent(17)) {
      // 低姿态
      a = times(a, 1.1);
      b = times(b, 1.1);
    }
    if (talent(20)) {
      // 克制
      a = times(a, 1.2);
      b = times(b, 1.2);
    }
    if (talent(21)) {
      // 冷漠
      a = times(a, 1.2);
      b = times(b, 1.2);
    }
    if (talent(22)) {
      // 感情淡薄（b 是 ×1.2 非 ×1.5）
      a = times(a, 1.5);
      b = times(b, 1.2);
    }
    if (talent(23)) {
      // 好奇心
      a = times(a, 0.9);
      b = times(b, 0.9);
    }
    if (talent(26)) a = times(a, 1.1); // 悲观的
    if (talent(28)) {
      // 爱表现
      a = times(a, 0.9);
      b = times(b, 0.9);
    }
    if (talent(30)) {
      // 看重贞操
      a = times(a, 1.1);
      b = times(b, 1.1);
    } else if (talent(31)) {
      // 看轻贞操
      a = times(a, 0.95);
      b = times(b, 0.95);
    }
    if (talent(32)) {
      // 压抑
      a = times(a, 0.95);
      b = times(b, 0.95);
    } else if (talent(33)) {
      // 开放
      a = times(a, 0.9);
      b = times(b, 0.9);
    }
    if (talent(79) || talent(82)) {
      // 讨厌男人/男人婆
      a = times(a, 0.95);
      b = times(b, 0.95);
    }
    if (talent(40)) {
      // 害怕疼痛
      a = times(a, 1.2);
      b = times(b, 1.2);
    } else if (talent(41)) {
      // 不惧疼痛
      a = times(a, 0.9);
      b = times(b, 0.9);
    }
    if (talent(76)) {
      // 淫乱（对 c 的 ×0.80 在 c 赋值之后，真实生效）
      a = times(a, 0.8);
      b = times(b, 0.8);
      c = times(c, 0.8);
    }
    if (talent(80)) {
      // 倒错的
      a = times(a, 0.8);
      b = times(b, 0.8);
    }
    if (talent(83)) {
      // 施虐狂
      a = times(a, 0.5);
      b = times(b, 0.5);
    }
    if (talent(88)) {
      // 受虐狂
      a = times(a, 1.2);
      b = times(b, 1.2);
    }
    if (talent(84)) {
      // 嫉妒
      a = times(a, 0.8);
      b = times(b, 0.8);
    }
    if (talent(87)) {
      // 小恶魔
      a = times(a, 0.8);
      b = times(b, 0.8);
    }
    if (talent(123)) {
      // 疯狂
      a = times(a, 0.5);
      b = times(b, 0.5);
    }
    if (talent(9)) {
      // 崩坏
      a = times(a, 2.0);
      b = times(b, 2.0);
    }

    const juel5 = era.get(`juel:${cid}:5`) || 0;
    const exp33 = era.get(`exp:${cid}:33`) || 0;
    const exp50 = era.get(`exp:${cid}:50`) || 0;
    let i = 0;
    if (juel5 < a) i |= 1;
    if (exp33 < b) i |= 2;
    if (exp50 < c) i |= 2;
    if (abl11() < lv + 1) i |= 4;

    era.print(`${era.get('ablname:11')}LV${lv + 1}以上(现在LV${abl11()})且`);
    if (c > 0) {
      era.print(`${era.get('expname:50')}${c}以上（现在${exp50}）且`); // （全角括号）
    }
    era.printButton(
      `- ${era.get('palamname:5')}点数×${juel5}/${a} ……${state_text(i)}`,
      0,
    ); // （内联状态链）
    // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    if (b > 0) {
      era.print(`　　　${era.get('expname:33')}　${exp33}/${b}`);
    }
    era.printButton('- 停止', 100);

    const result = await era.input();
    if (result === 100) {
      // 放弃返回：最后一次动作是输入、其后无打印，返回哨兵让分发方
      // 不再等键（否则回显会让等键真等一次，玩家多按键）
      return HANDLER_QUIET;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件');
      continue;
    } else if (result === 0) {
      const new_lv = era.add(`abl:${cid}:20`, 1); // （train 属主，era.add）
      era.add(`juel:${cid}:5`, -a);
      era.print(`${era.get('ablname:20')}变为LV${new_lv}。`);
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

async function ablup21(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl11 = () => era.get(`abl:${cid}:11`) || 0;
  const abl20 = () => era.get(`abl:${cid}:20`) || 0;
  const abl21 = () => era.get(`abl:${cid}:21`) || 0;

  era.drawLine();

  if (
    abl21() >= 5 &&
    talent(10) === 0 &&
    talent(14) === 0 &&
    talent(37) === 0 &&
    talent(88) === 0
  ) {
    await era.printAndWait('需要特殊素质才能继续提升');
    return;
  }
  if (abl20() + abl21() >= 20) {
    await era.printAndWait(`抖S气质(${abl20()})＋抖M气质(${abl21()})上限为20`);
    return;
  }
  if (abl21() >= 10) {
    await era.printAndWait('已达最高级');
    return;
  }

  for (;;) {
    const lv = abl21();
    // a([0]苦痛)/b(欲情)/c(被虐快乐)/d([1]苦痛)/e(屈服) 的梯子
    // Lv3 起 a=b=0（[0] 轨隐藏），d/e 持续到 Lv9
    let a, b, c, d, e;
    if (lv === 0) [a, b, c, d, e] = [100, 100, 0, 100, 100];
    else if (lv === 1) [a, b, c, d, e] = [500, 500, 0, 500, 300];
    else if (lv === 2) [a, b, c, d, e] = [1200, 1000, 0, 1500, 1000];
    else if (lv === 3) [a, b, c, d, e] = [0, 0, 30, 2800, 6000];
    else if (lv === 4) [a, b, c, d, e] = [0, 0, 80, 4300, 12000];
    else if (lv === 5) [a, b, c, d, e] = [0, 0, 150, 6000, 24000];
    else if (lv === 6) [a, b, c, d, e] = [0, 0, 200, 8000, 38000];
    else if (lv === 7) [a, b, c, d, e] = [0, 0, 300, 11000, 56000];
    else if (lv === 8) [a, b, c, d, e] = [0, 0, 450, 15000, 86000];
    else [a, b, c, d, e] = [0, 0, 600, 20000, 120000]; // lv === 9

    if (talent(27)) {
      // 戒备森严（c/d/e 三列）
      if (lv === 3) {
        c = times(c, 1.5);
        d = times(d, 1.5);
        e = times(e, 1.5);
      } else if (lv === 4) {
        c = times(c, 2.0);
        d = times(d, 2.0);
        e = times(e, 2.0);
      } else if (lv === 5) {
        c = times(c, 2.5);
        d = times(d, 2.5);
        e = times(e, 2.5);
      } else if (lv >= 6) {
        c = times(c, 3.0);
        d = times(d, 3.0);
        e = times(e, 3.0);
      }
    }

    // f（异常经验）：lv3/4/7 且无[开放/倒错的/受虐狂]时 = lv-2
    let f = 0;
    if (
      (lv === 3 || lv === 4 || lv === 7) &&
      talent(33) === 0 &&
      talent(80) === 0 &&
      talent(88) === 0
    ) {
      f = lv - 2;
    }
    const g = 1; // 绝顶经验需求，全等级 1

    if (talent(10)) {
      // 胆怯（五元组 ×1.10）
      a = times(a, 1.1);
      b = times(b, 1.1);
      c = times(c, 1.1);
      d = times(d, 1.1);
      e = times(e, 1.1);
    }
    if (talent(11)) {
      // 反抗心
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
      d = times(d, 1.2);
      e = times(e, 1.2);
    }
    if (talent(12)) {
      // 刚强
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
      d = times(d, 1.2);
      e = times(e, 1.2);
    }
    if (talent(16)) {
      // 嚣张
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
      d = times(d, 1.2);
      e = times(e, 1.2);
    }
    if (talent(15)) {
      // 高姿态 / 低姿态
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
      d = times(d, 1.2);
      e = times(e, 1.2);
    } else if (talent(17)) {
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
      d = times(d, 0.9);
      e = times(e, 0.9);
    }
    if (talent(20)) {
      // 克制
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
      d = times(d, 1.2);
      e = times(e, 1.2);
    }
    if (talent(21)) {
      // 冷漠（×1.10）
      a = times(a, 1.1);
      b = times(b, 1.1);
      c = times(c, 1.1);
      d = times(d, 1.1);
      e = times(e, 1.1);
    }
    if (talent(22)) {
      // 感情淡薄
      a = times(a, 1.5);
      b = times(b, 1.5);
      c = times(c, 1.5);
      d = times(d, 1.5);
      e = times(e, 1.5);
    }
    if (talent(24)) {
      // 保守的
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
      d = times(d, 1.2);
      e = times(e, 1.2);
    }
    if (talent(26)) {
      // 悲观的（×0.90）
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
      d = times(d, 0.9);
      e = times(e, 0.9);
    }
    if (talent(30)) {
      // 看重贞操 / 看轻贞操
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
      d = times(d, 1.2);
      e = times(e, 1.2);
    } else if (talent(31)) {
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
      d = times(d, 0.9);
      e = times(e, 0.9);
    }
    if (talent(32)) {
      // 压抑 / 开放（开放 ×0.60）
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
      d = times(d, 1.2);
      e = times(e, 1.2);
    } else if (talent(33)) {
      a = times(a, 0.6);
      b = times(b, 0.6);
      c = times(c, 0.6);
      d = times(d, 0.6);
      e = times(e, 0.6);
    }
    if (talent(34)) {
      // 抵抗（×2.00）
      a = times(a, 2.0);
      b = times(b, 2.0);
      c = times(c, 2.0);
      d = times(d, 2.0);
      e = times(e, 2.0);
    }
    if (talent(35)) {
      // 害羞 / 不知羞耻
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
      d = times(d, 0.9);
      e = times(e, 0.9);
    } else if (talent(36)) {
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
      d = times(d, 1.2);
      e = times(e, 1.2);
    }
    if (talent(40)) {
      // 害怕疼痛（×1.10）/ 不惧疼痛（×0.95）
      a = times(a, 1.1);
      b = times(b, 1.1);
      c = times(c, 1.1);
      d = times(d, 1.1);
      e = times(e, 1.1);
    } else if (talent(41)) {
      a = times(a, 0.95);
      b = times(b, 0.95);
      c = times(c, 0.95);
      d = times(d, 0.95);
      e = times(e, 0.95);
    }
    if (talent(70)) {
      // 接受快感 / 否定快感
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
      d = times(d, 0.9);
      e = times(e, 0.9);
    } else if (talent(71)) {
      a = times(a, 1.1);
      b = times(b, 1.1);
      c = times(c, 1.1);
      d = times(d, 1.1);
      e = times(e, 1.1);
    }
    if (talent(76)) {
      // 淫乱
      a = times(a, 0.8);
      b = times(b, 0.8);
      c = times(c, 0.8);
      d = times(d, 0.8);
      e = times(e, 0.8);
    }
    if (talent(80)) {
      // 倒错的（×0.75）
      a = times(a, 0.75);
      b = times(b, 0.75);
      c = times(c, 0.75);
      d = times(d, 0.75);
      e = times(e, 0.75);
    }
    if (talent(83)) {
      // 施虐狂（×1.20）
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
      d = times(d, 1.2);
      e = times(e, 1.2);
    }
    if (talent(88)) {
      // 受虐狂（×0.50）
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
      d = times(d, 0.5);
      e = times(e, 0.5);
    }
    if (talent(123)) {
      // 疯狂（×0.80）
      a = times(a, 0.8);
      b = times(b, 0.8);
      c = times(c, 0.8);
      d = times(d, 0.8);
      e = times(e, 0.8);
    }
    if (talent(9)) {
      // 崩坏（×2.00）
      a = times(a, 2.0);
      b = times(b, 2.0);
      c = times(c, 2.0);
      d = times(d, 2.0);
      e = times(e, 2.0);
    }

    const juel9 = era.get(`juel:${cid}:9`) || 0;
    const juel5 = era.get(`juel:${cid}:5`) || 0;
    const juel6 = era.get(`juel:${cid}:6`) || 0;
    const exp30 = era.get(`exp:${cid}:30`) || 0;
    const exp2 = era.get(`exp:${cid}:2`) || 0;
    const exp50 = era.get(`exp:${cid}:50`) || 0;
    let i = 0;
    let j = 0;
    if (abl11() < lv + 1) {
      // 欲望门槛，双轨同时命中
      i |= 4;
      j |= 4;
    }
    if (exp50 < f) {
      // 异常经验不足，双轨同时命中
      i |= 2;
      j |= 2;
    }
    if (b > 0) {
      // [0] 苦痛+欲情
      if (juel9 < a) i |= 1;
      if (juel5 < b) i |= 1;
      if (exp30 < c) i |= 2;
    } else {
      i = 256; // （覆盖此前累积的 bit，[0] 隐藏）
    }
    if (d > 0) {
      // [1] 苦痛+屈服
      if (juel9 < d) j |= 1;
      if (juel6 < e) j |= 1;
      if (exp30 < c) j |= 2;
      if (exp2 < g) j |= 2;
    } else {
      j = 256; // （d 梯子全等级 >0，实际不可达，防御性保留）
    }

    era.print(`${era.get('ablname:11')}LV${lv + 1}以上(现在LV${abl11()})且`);
    if (f > 0) {
      era.print(`${era.get('expname:50')}${f}以上(现在${exp50})且`); // （半角括号）
    }
    if (b > 0) {
      era.printButton(
        `- ${era.get('palamname:9')}点数×${juel9}/${a} ……${get_ablup_state(i)}`,
        0,
      );
      // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
      era.print(`　　　${era.get('palamname:5')}点数×${juel5}/${b}`);
      if (c > 0) {
        era.print(`　　　${era.get('expname:30')}　${exp30}/${c}`);
      }
    }
    if (d > 0) {
      era.printButton(
        `- ${era.get('palamname:9')}点数×${juel9}/${d} ……${get_ablup_state(j)}`,
        1,
      );
      // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
      era.print(`　　　${era.get('palamname:6')}点数×${juel6}/${e}`);
      if (c > 0) {
        era.print(`　　　${era.get('expname:30')}　${exp30}/${c}`);
      }
      if (g > 0) {
        era.print(`　　　${era.get('expname:2')}　${exp2}/${g}`);
      }
    }
    era.printButton('- 停止', 100);

    const result = await era.input();
    if (result === 100) {
      // 放弃返回：最后一次动作是输入、其后无打印，返回哨兵让分发方
      // 不再等键（否则回显会让等键真等一次，玩家多按键）
      return HANDLER_QUIET;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件');
      continue;
    } else if (result === 1 && j === 256) {
      continue; // d===0 时隐藏选项，issue #130
    } else if (result === 1 && j !== 0) {
      era.print('未满足条件');
      continue;
    } else if (result === 0) {
      const new_lv = (chara(cid).system.抖M气质 += 1); // （system 属主）
      era.add(`juel:${cid}:9`, -a);
      era.add(`juel:${cid}:5`, -b);
      era.print(`${era.get('ablname:21')}变为LV${new_lv}。`);
      return;
    } else if (result === 1) {
      const new_lv = (chara(cid).system.抖M气质 += 1);
      era.add(`juel:${cid}:9`, -d);
      era.add(`juel:${cid}:6`, -e);
      era.print(`${era.get('ablname:21')}变为LV${new_lv}。`);
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 *
 * 显示顺序与本文件其余函数相反：异常经验行在欲望行**之前**。异常经验豁免名单
 * （开放/倒错的/双性恋/疯狂）不含讨厌男人，与 Lv5 上限豁免名单（多一项
 * TALENT:82）不同，保留原样。
 */
async function ablup22(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl11 = () => era.get(`abl:${cid}:11`) || 0;
  const abl22 = () => era.get(`abl:${cid}:22`) || 0;

  if (talent(122)) return; // 男人直接返回（分隔线之前，无输出）

  era.drawLine();

  if (
    abl22() >= 5 &&
    talent(33) === 0 &&
    talent(80) === 0 &&
    talent(81) === 0 &&
    talent(82) === 0 &&
    talent(123) === 0
  ) {
    await era.printAndWait('需要特殊素质才能继续提升');
    return;
  }
  if (abl22() >= 10) {
    await era.printAndWait('已达最高级');
    return;
  }

  for (;;) {
    const lv = abl22();
    // a(欲情)/b(百合经验)/c(屈服)/d([1]阴核点数) 的梯子
    // Lv0/1 双轨（d=1000/5000），Lv2 起 d=0（[1] 轨隐藏）
    let a, b, c, d;
    if (lv === 0) [a, b, c, d] = [200, 50, 0, 1000];
    else if (lv === 1) [a, b, c, d] = [1000, 150, 0, 5000];
    else if (lv === 2) [a, b, c, d] = [3000, 300, 1000, 0];
    else if (lv === 3) [a, b, c, d] = [8000, 500, 2000, 0];
    else if (lv === 4) [a, b, c, d] = [20000, 800, 5000, 0];
    else if (lv === 5) [a, b, c, d] = [40000, 1200, 10000, 0];
    else if (lv === 6) [a, b, c, d] = [80000, 1800, 13000, 0];
    else if (lv === 7) [a, b, c, d] = [150000, 2600, 18000, 0];
    else if (lv === 8) [a, b, c, d] = [200000, 3600, 30000, 0];
    else [a, b, c, d] = [300000, 5000, 50000, 0]; // lv === 9

    if (talent(27)) {
      // 戒备森严（a/b/c 三列）
      if (lv === 3) {
        a = times(a, 1.5);
        b = times(b, 1.5);
        c = times(c, 1.5);
      } else if (lv === 4) {
        a = times(a, 2.0);
        b = times(b, 2.0);
        c = times(c, 2.0);
      } else if (lv === 5) {
        a = times(a, 2.5);
        b = times(b, 2.5);
        c = times(c, 2.5);
      } else if (lv >= 6) {
        a = times(a, 3.0);
        b = times(b, 3.0);
        c = times(c, 3.0);
      }
    }

    // e（异常经验）：lv>=3 且无[开放/倒错的/双性恋/疯狂]时 = lv-2
    // （豁免名单不含 TALENT:82 讨厌男人）
    let e = 0;
    if (
      lv >= 3 &&
      talent(33) === 0 &&
      talent(80) === 0 &&
      talent(81) === 0 &&
      talent(123) === 0
    ) {
      e = lv - 2;
    }

    if (talent(13)) {
      // 坦率（四元组 ×0.95）
      a = times(a, 0.95);
      b = times(b, 0.95);
      c = times(c, 0.95);
      d = times(d, 0.95);
    }
    if (talent(21)) {
      // 冷漠（×1.20）
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
      d = times(d, 1.2);
    }
    if (talent(23)) {
      // 好奇心（×0.95）
      a = times(a, 0.95);
      b = times(b, 0.95);
      c = times(c, 0.95);
      d = times(d, 0.95);
    }
    if (talent(24)) {
      // 保守的（×1.20）
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
      d = times(d, 1.2);
    }
    if (talent(30)) {
      // 看重贞操 / 看轻贞操（×1.20 / ×0.95）
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
      d = times(d, 1.2);
    } else if (talent(31)) {
      a = times(a, 0.95);
      b = times(b, 0.95);
      c = times(c, 0.95);
      d = times(d, 0.95);
    }
    if (talent(63)) {
      // 献身的（×0.95）
      a = times(a, 0.95);
      b = times(b, 0.95);
      c = times(c, 0.95);
      d = times(d, 0.95);
    }
    if (talent(70)) {
      // 接受快感 / 否定快感（×0.95 / ×1.20）
      a = times(a, 0.95);
      b = times(b, 0.95);
      c = times(c, 0.95);
      d = times(d, 0.95);
    } else if (talent(71)) {
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
      d = times(d, 1.2);
    }
    if (talent(80)) {
      // 倒错的（×0.80）
      a = times(a, 0.8);
      b = times(b, 0.8);
      c = times(c, 0.8);
      d = times(d, 0.8);
    }
    if (talent(79)) {
      // 男人婆（×2.00，百合特有）
      a = times(a, 2.0);
      b = times(b, 2.0);
      c = times(c, 2.0);
      d = times(d, 2.0);
    }
    if (talent(81)) {
      // 双性恋（×0.50）
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
      d = times(d, 0.5);
    }
    if (talent(82)) {
      // 讨厌男人（×0.50）
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
      d = times(d, 0.5);
    }
    if (talent(123)) {
      // 疯狂（×0.50）
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
      d = times(d, 0.5);
    }

    if (a < 1) a = 1;
    if (b < 1) b = 1; // （c/d 无底线）

    const juel5 = era.get(`juel:${cid}:5`) || 0;
    const juel6 = era.get(`juel:${cid}:6`) || 0;
    const juel0 = era.get(`juel:${cid}:0`) || 0;
    const exp40 = era.get(`exp:${cid}:40`) || 0;
    const exp50 = era.get(`exp:${cid}:50`) || 0;
    let i = 0;
    let j = 0;
    if (exp50 < e) {
      // 异常经验不足，双轨同时命中
      i |= 2;
      j |= 2;
    }
    if (juel5 < a) i |= 1;
    if (juel6 < c) i |= 1;
    if (exp40 < b) i |= 2;
    if (abl11() < lv + 1) {
      // 欲望门槛，双轨同时命中
      i |= 4;
      j |= 4;
    }
    if (d > 0) {
      // [1] 阴核轨道
      if (juel0 < d) j |= 1;
      if (exp40 < b) j |= 2;
    } else {
      j = 256; // （lv>=2，[1] 隐藏）
    }

    if (e > 0) {
      era.print(`${era.get('expname:50')}${e}以上(现在${exp50})且`); // （先异常行）
    }
    era.print(`${era.get('ablname:11')}LV${lv + 1}以上(现在LV${abl11()})且`); // （后欲望行）
    era.printButton(
      `- ${era.get('palamname:5')}点数×${juel5}/${a} ……${get_ablup_state(i)}`,
      0,
    ); // （恒渲染）
    // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    if (c > 0) {
      era.print(`　　　${era.get('palamname:6')}点数×${juel6}/${c}`);
    }
    era.print(`　　　${era.get('expname:40')}　${exp40}/${b}`);
    if (d > 0) {
      era.printButton(
        `- ${era.get('palamname:0')}点数×${juel0}/${d} ……${get_ablup_state(j)}`,
        1,
      );
      // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
      era.print(`　　　${era.get('expname:40')}　${exp40}/${b}`);
    }
    era.printButton('- 停止', 100);

    const result = await era.input();
    if (result === 100) {
      // 放弃返回：最后一次动作是输入、其后无打印，返回哨兵让分发方
      // 不再等键（否则回显会让等键真等一次，玩家多按键）
      return HANDLER_QUIET;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件');
      continue;
    } else if (result === 1 && j === 256) {
      continue; // d===0 时隐藏选项，issue #130
    } else if (result === 1 && j !== 0) {
      era.print('未满足条件');
      continue;
    } else if (result === 0) {
      const new_lv = (chara(cid).chara.百合气质 += 1); // （chara 属主）
      era.add(`juel:${cid}:5`, -a);
      era.add(`juel:${cid}:6`, -c);
      era.print(`${era.get('ablname:22')}变为LV${new_lv}。`);
      return;
    } else if (result === 1) {
      const new_lv = (chara(cid).chara.百合气质 += 1);
      era.add(`juel:${cid}:0`, -d);
      era.print(`${era.get('ablname:22')}变为LV${new_lv}。`);
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

async function ablup23(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl23 = () => era.get(`abl:${cid}:23`) || 0;

  if (talent(122) === 0) return; // 非男人直接返回（无输出）

  era.drawLine();

  if (
    abl23() >= 5 &&
    talent(33) === 0 &&
    talent(80) === 0 &&
    talent(81) === 0 &&
    talent(123) === 0
  ) {
    await era.printAndWait('需要特殊素质才能继续提升');
    return;
  }
  if (abl23() >= 10) {
    await era.printAndWait('已达最高级');
    return;
  }

  for (;;) {
    const lv = abl23();
    // a(欲情)/b(断背经验)/c(屈服)/d([1]肛门点数) 的梯子（与 ablup22 相同）
    let a, b, c, d;
    if (lv === 0) [a, b, c, d] = [200, 50, 0, 1000];
    else if (lv === 1) [a, b, c, d] = [1000, 150, 0, 5000];
    else if (lv === 2) [a, b, c, d] = [3000, 300, 1000, 0];
    else if (lv === 3) [a, b, c, d] = [8000, 500, 2000, 0];
    else if (lv === 4) [a, b, c, d] = [20000, 800, 5000, 0];
    else if (lv === 5) [a, b, c, d] = [40000, 1200, 10000, 0];
    else if (lv === 6) [a, b, c, d] = [80000, 1800, 13000, 0];
    else if (lv === 7) [a, b, c, d] = [150000, 2600, 18000, 0];
    else if (lv === 8) [a, b, c, d] = [200000, 3600, 30000, 0];
    else [a, b, c, d] = [300000, 5000, 50000, 0]; // lv === 9

    if (talent(27)) {
      // 戒备森严（a/b/c 三列，与 ablup22 相同）
      if (lv === 3) {
        a = times(a, 1.5);
        b = times(b, 1.5);
        c = times(c, 1.5);
      } else if (lv === 4) {
        a = times(a, 2.0);
        b = times(b, 2.0);
        c = times(c, 2.0);
      } else if (lv === 5) {
        a = times(a, 2.5);
        b = times(b, 2.5);
        c = times(c, 2.5);
      } else if (lv >= 6) {
        a = times(a, 3.0);
        b = times(b, 3.0);
        c = times(c, 3.0);
      }
    }

    // e（异常经验）：lv>=3 且无[开放/倒错的/双性恋/疯狂]时 = lv-2
    let e = 0;
    if (
      lv >= 3 &&
      talent(33) === 0 &&
      talent(80) === 0 &&
      talent(81) === 0 &&
      talent(123) === 0
    ) {
      e = lv - 2;
    }

    if (talent(13)) {
      // 坦率（×0.95）
      a = times(a, 0.95);
      b = times(b, 0.95);
      c = times(c, 0.95);
      d = times(d, 0.95);
    }
    if (talent(21)) {
      // 冷漠（×1.20）
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
      d = times(d, 1.2);
    }
    if (talent(23)) {
      // 好奇心（×0.95）
      a = times(a, 0.95);
      b = times(b, 0.95);
      c = times(c, 0.95);
      d = times(d, 0.95);
    }
    if (talent(24)) {
      // 保守的（×1.20）
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
      d = times(d, 1.2);
    }
    if (talent(30)) {
      // 看重贞操 / 看轻贞操（×1.20 / ×0.95）
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
      d = times(d, 1.2);
    } else if (talent(31)) {
      a = times(a, 0.95);
      b = times(b, 0.95);
      c = times(c, 0.95);
      d = times(d, 0.95);
    }
    if (talent(82)) {
      // 讨厌男人（×3.00，与 ablup22 相反）
      a = times(a, 3.0);
      b = times(b, 3.0);
      c = times(c, 3.0);
      d = times(d, 3.0);
    }
    if (talent(63)) {
      // 献身的（×0.95）
      a = times(a, 0.95);
      b = times(b, 0.95);
      c = times(c, 0.95);
      d = times(d, 0.95);
    }
    if (talent(70)) {
      // 接受快感 / 否定快感（×0.95 / ×1.20）
      a = times(a, 0.95);
      b = times(b, 0.95);
      c = times(c, 0.95);
      d = times(d, 0.95);
    } else if (talent(71)) {
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
      d = times(d, 1.2);
    }
    if (talent(80)) {
      // 倒错的（×0.80）
      a = times(a, 0.8);
      b = times(b, 0.8);
      c = times(c, 0.8);
      d = times(d, 0.8);
    }
    if (talent(81)) {
      // 双性恋（×0.50）
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
      d = times(d, 0.5);
    }
    if (talent(123)) {
      // 疯狂（×0.50）
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
      d = times(d, 0.5);
    }

    if (a < 1) a = 1;
    if (b < 1) b = 1;

    const juel5 = era.get(`juel:${cid}:5`) || 0;
    const juel6 = era.get(`juel:${cid}:6`) || 0;
    const juel2 = era.get(`juel:${cid}:2`) || 0;
    const exp41 = era.get(`exp:${cid}:41`) || 0;
    const exp50 = era.get(`exp:${cid}:50`) || 0;
    let i = 0;
    let j = 0;
    if (exp50 < e) {
      // 异常经验不足，双轨同时命中
      i |= 2;
      j |= 2;
    }
    if (juel5 < a) i |= 1;
    if (juel6 < c) i |= 1;
    if (exp41 < b) i |= 2;
    if (d > 0) {
      // [1] 肛门轨道
      if (juel2 < d) j |= 1;
      if (exp41 < b) j |= 2;
    } else {
      j = 256; // （lv>=2，[1] 隐藏）
    }

    if (e > 0) {
      era.print(`${era.get('expname:50')}${e}以上(现在${exp50})且`); // （先异常行，无欲望行）
    }
    era.printButton(
      `- ${era.get('palamname:5')}点数×${juel5}/${a} ……${get_ablup_state(i)}`,
      0,
    ); // （恒渲染）
    // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    if (c > 0) {
      era.print(`　　　${era.get('palamname:6')}点数×${juel6}/${c}`);
    }
    era.print(`　　　${era.get('expname:41')}　${exp41}/${b}`);
    if (d > 0) {
      era.printButton(
        `- ${era.get('palamname:2')}点数×${juel2}/${d} ……${get_ablup_state(j)}`,
        1,
      );
      // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
      era.print(`　　　${era.get('expname:41')}　${exp41}/${b}`);
    }
    era.printButton('- 停止', 100);

    const result = await era.input();
    if (result === 100) {
      // 放弃返回：最后一次动作是输入、其后无打印，返回哨兵让分发方
      // 不再等键（否则回显会让等键真等一次，玩家多按键）
      return HANDLER_QUIET;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件');
      continue;
    } else if (result === 1 && j === 256) {
      continue; // d===0 时隐藏选项，issue #130
    } else if (result === 1 && j !== 0) {
      era.print('未满足条件');
      continue;
    } else if (result === 0) {
      const new_lv = (chara(cid).system.断背气质 += 1); // （system 属主）
      era.add(`juel:${cid}:5`, -a);
      era.add(`juel:${cid}:6`, -c);
      era.print(`${era.get('ablname:23')}变为LV${new_lv}。`);
      return;
    } else if (result === 1) {
      const new_lv = (chara(cid).system.断背气质 += 1);
      era.add(`juel:${cid}:2`, -d);
      era.print(`${era.get('ablname:23')}变为LV${new_lv}。`);
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 *
 * 本函数的两处不一致，保留原样：
 * - Lv5 上限豁免是六项素质任一 ==0 即拦（OR），比「六项全 0 才拦」的
 *   AND 判法更严。
 * - 组合上限的拦截判定查 JUEL:6 ≥ 30²×1000 且 JUEL:5 ≥ 30²×300，而提示
 *   文案写「欲情…1000 / 屈服…300」——判定与文案的表交叉错位，保留原样。
 * 「30+31 合计 ≥20 即免费购买」的判法不实现：正常流程合计 19 封顶
 * （30、31 各自 Lv10 即封顶无购买入口），该分支不可达。
 */
async function ablup30(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl16 = () => era.get(`abl:${cid}:16`) || 0;
  const abl30 = () => era.get(`abl:${cid}:30`) || 0;
  const abl31 = () => era.get(`abl:${cid}:31`) || 0;

  era.drawLine();

  if (
    abl30() >= 5 &&
    (talent(85) === 0 ||
      talent(76) === 0 ||
      talent(63) === 0 ||
      talent(70) === 0 ||
      talent(75) === 0 ||
      talent(77) === 0)
  ) {
    await era.printAndWait('需要特殊素质才能继续提升'); // （OR：任一为 0 即拦）
    return;
  }
  if (abl30() >= 10) {
    await era.printAndWait('已达最高级');
    return;
  }
  if (abl30() + abl31() >= 10) {
    const juel6_gate = era.get(`juel:${cid}:6`) || 0;
    const juel5_gate = era.get(`juel:${cid}:5`) || 0;
    if (
      juel6_gate < abl30() * abl30() * 1000 ||
      juel5_gate < abl30() * abl30() * 300
    ) {
      await era.printAndWait(
        `性交中毒(${abl30()})＋自慰中毒(${abl31()})上限为10`,
      );
      era.print(
        `至少达成${era.get('palamname:5')}点数${abl30() * abl30() * 1000}点或${era.get('palamname:6')}点数${abl30() * abl30() * 300}点的其中一项`,
      ); // （文案的表与判定交叉，保留原样）
      await era.printAndWait('方可提升当前性交中毒的等级');
      return;
    }
  }

  for (;;) {
    const lv = abl30();
    // a(欲情)/b(屈服)/c(性交经验) 的梯子
    let a, b, c;
    if (lv === 0) [a, b, c] = [3000, 10000, 10];
    else if (lv === 1) [a, b, c] = [8000, 25000, 25];
    else if (lv === 2) [a, b, c] = [15000, 50000, 40];
    else if (lv === 3) [a, b, c] = [30000, 100000, 80];
    else if (lv === 4) [a, b, c] = [55000, 200000, 200];
    else if (lv === 5) [a, b, c] = [70000, 300000, 400];
    else if (lv === 6) [a, b, c] = [90000, 400000, 800];
    else if (lv === 7) [a, b, c] = [120000, 550000, 1200];
    else if (lv === 8) [a, b, c] = [150000, 700000, 1500];
    else [a, b, c] = [200000, 900000, 2000]; // lv === 9

    if (talent(27)) {
      // 戒备森严（a/b/c 三列）
      if (lv === 3) {
        a = times(a, 1.5);
        b = times(b, 1.5);
        c = times(c, 1.5);
      } else if (lv === 4) {
        a = times(a, 2.0);
        b = times(b, 2.0);
        c = times(c, 2.0);
      } else if (lv === 5) {
        a = times(a, 2.5);
        b = times(b, 2.5);
        c = times(c, 2.5);
      } else if (lv >= 6) {
        a = times(a, 3.0);
        b = times(b, 3.0);
        c = times(c, 3.0);
      }
    }

    if (talent(12)) {
      // 刚强（×1.20）
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
    }
    if (talent(20)) {
      // 克制（×1.20）
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
    }
    if (talent(21)) {
      // 冷漠（×1.20）
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
    }
    if (talent(24)) {
      // 保守的（×1.20）
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
    }
    if (talent(30)) {
      // 看重贞操 / 看轻贞操（×1.20 / ×0.90）
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
    } else if (talent(31)) {
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
    }
    if (talent(32)) {
      // 压抑 / 开放（×1.20 / ×0.80）
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
    } else if (talent(33)) {
      a = times(a, 0.8);
      b = times(b, 0.8);
      c = times(c, 0.8);
    }
    if (talent(34)) {
      // 抵抗（×1.20）
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
    }
    if (talent(35)) {
      // 害羞 / 不知羞耻（×1.10 / ×0.95）
      a = times(a, 1.1);
      b = times(b, 1.1);
      c = times(c, 1.1);
    } else if (talent(36)) {
      a = times(a, 0.95);
      b = times(b, 0.95);
      c = times(c, 0.95);
    }
    if (talent(70)) {
      // 接受快感 / 否定快感（×0.90 / ×1.20）
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
    } else if (talent(71)) {
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
    }
    if (talent(72)) {
      // 容易上瘾（×0.60）
      a = times(a, 0.6);
      b = times(b, 0.6);
      c = times(c, 0.6);
    }
    if (talent(73)) {
      // 容易陷落（×0.50）
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
    }
    if (talent(76)) {
      // 淫乱（×0.80）
      a = times(a, 0.8);
      b = times(b, 0.8);
      c = times(c, 0.8);
    }
    if (talent(87)) {
      // 小恶魔（×0.90）
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
    }
    if (talent(123)) {
      // 疯狂（×0.80）
      a = times(a, 0.8);
      b = times(b, 0.8);
      c = times(c, 0.8);
    }
    if (talent(9)) {
      // 崩坏（×0.80，非 ablup20/21 的 ×2.00）
      a = times(a, 0.8);
      b = times(b, 0.8);
      c = times(c, 0.8);
    }

    if (a < 1) a = 1;
    if (b < 1) b = 1;
    if (c < 1) c = 1;

    // f（异常经验）：lv>=2 且无[开放/容易上瘾/淫乱/疯狂]时 = lv-1，不足即
    // 双轨同置 bit2
    let f = 0;
    if (
      lv >= 2 &&
      talent(33) === 0 &&
      talent(72) === 0 &&
      talent(76) === 0 &&
      talent(123) === 0
    ) {
      f = lv - 1;
    }

    const juel5 = era.get(`juel:${cid}:5`) || 0;
    const juel6 = era.get(`juel:${cid}:6`) || 0;
    const exp5 = era.get(`exp:${cid}:5`) || 0;
    const exp50 = era.get(`exp:${cid}:50`) || 0;
    let i = 0;
    let j = 0;
    if (exp50 < f) {
      i |= 2;
      j |= 2;
    }
    if (abl16() < lv + 1) {
      // 侍奉精神门槛，双轨同时命中
      i |= 4;
      j |= 4;
    }
    if (juel5 < a) i |= 1;
    if (juel6 < b) i |= 1;
    if (exp5 < c) i |= 2;
    if (juel5 < a * 3) j |= 1;
    if (juel6 < b * 3) j |= 1;
    if (exp5 < Math.floor(c / 2)) j |= 2; // （C/2 整除）

    if (f > 0) {
      era.print(`${era.get('expname:50')}${f}以上(现在${exp50})且`);
    }
    era.print(`${era.get('ablname:16')}LV${lv + 1}以上(现在LV${abl16()})且`);
    era.printButton(
      `- ${era.get('palamname:5')}点数×${juel5}/${a} ……${get_ablup_state(i)}`,
      0,
    ); // （恒渲染）
    // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    era.print(`　　　${era.get('palamname:6')}点数×${juel6}/${b}`);
    era.print(`　　　${era.get('expname:5')}　${exp5}/${c}`);
    era.printButton(
      `- ${era.get('palamname:5')}点数×${juel5}/${a * 3} ……${get_ablup_state(j)}`,
      1,
    ); // （恒渲染，无 256 分支）
    // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    era.print(`　　　${era.get('palamname:6')}点数×${juel6}/${b * 3}`);
    era.print(`　　　${era.get('expname:5')}　${exp5}/${Math.floor(c / 2)}`);
    era.printButton('- 停止', 100);

    const result = await era.input();
    if (result === 100) {
      // 放弃返回：最后一次动作是输入、其后无打印，返回哨兵让分发方
      // 不再等键（否则回显会让等键真等一次，玩家多按键）
      return HANDLER_QUIET;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件');
      continue;
    } else if (result === 1 && j !== 0) {
      era.print('未满足条件');
      continue;
    } else if (result === 0) {
      const new_lv = era.add(`abl:${cid}:30`, 1); // （train 属主）
      era.add(`juel:${cid}:5`, -a);
      era.add(`juel:${cid}:6`, -b);
      era.print(`${era.get('ablname:30')}变为LV${new_lv}。`);
      return;
    } else if (result === 1) {
      const new_lv = era.add(`abl:${cid}:30`, 1);
      era.add(`juel:${cid}:5`, -a * 3);
      era.add(`juel:${cid}:6`, -b * 3);
      era.print(`${era.get('ablname:30')}变为LV${new_lv}。`);
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

async function ablup31(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl0 = () => era.get(`abl:${cid}:0`) || 0;
  const abl17 = () => era.get(`abl:${cid}:17`) || 0;
  const abl30 = () => era.get(`abl:${cid}:30`) || 0;
  const abl31 = () => era.get(`abl:${cid}:31`) || 0;

  era.drawLine();

  if (
    abl31() >= 5 &&
    talent(85) === 0 &&
    talent(76) === 0 &&
    talent(60) === 0 &&
    talent(70) === 0 &&
    talent(74) === 0 &&
    talent(78) === 0
  ) {
    await era.printAndWait('需要特殊素质才能继续提升'); // （AND：全 0 才拦）
    return;
  }
  if (abl31() >= 10) {
    await era.printAndWait('已达最高级');
    return;
  }
  if (abl30() + abl31() >= 10) {
    const juel5_gate = era.get(`juel:${cid}:5`) || 0;
    const juel0_gate = era.get(`juel:${cid}:0`) || 0;
    const juel8_gate = era.get(`juel:${cid}:8`) || 0;
    if (
      juel5_gate < abl31() * abl31() * 2550 ||
      juel0_gate < abl31() * abl31() * 15000 ||
      juel8_gate < abl31() * abl31() * 2000
    ) {
      era.print(`性交中毒(${abl30()})＋自慰中毒(${abl31()})上限为10`); // （不等待，ablup30 同位置是 printAndWait）
      era.print(
        `至少达成${era.get('palamname:5')}点数${abl31() * abl31() * 2550}点、${era.get('palamname:0')}点数${abl31() * abl31() * 15000}点或${era.get('palamname:8')}点数${abl31() * abl31() * 2000}点的其中一项`,
      );
      await era.printAndWait('方可提升当前自慰中毒的等级');
      return;
    }
  }

  for (;;) {
    const lv = abl31();
    // a(欲情)/b(阴核)/c(耻情)/d([0]自慰经验)/e([1]调教自慰经验) 的梯子
    let a, b, c, d, e;
    if (lv === 0) [a, b, c, d, e] = [3000, 10000, 1000, 100, 20];
    else if (lv === 1) [a, b, c, d, e] = [6000, 25000, 3000, 250, 40];
    else if (lv === 2) [a, b, c, d, e] = [12000, 50000, 6000, 500, 60];
    else if (lv === 3) [a, b, c, d, e] = [20000, 100000, 15000, 1000, 100];
    else if (lv === 4) [a, b, c, d, e] = [32000, 200000, 30000, 1500, 150];
    else if (lv === 5) [a, b, c, d, e] = [50000, 250000, 40000, 2000, 200];
    else if (lv === 6) [a, b, c, d, e] = [70000, 320000, 50000, 3000, 320];
    else if (lv === 7) [a, b, c, d, e] = [100000, 500000, 70000, 4000, 500];
    else if (lv === 8) [a, b, c, d, e] = [150000, 800000, 100000, 6000, 800];
    else [a, b, c, d, e] = [200000, 1000000, 150000, 8000, 1000]; // lv === 9

    if (talent(27)) {
      // 戒备森严（a-e 五列）
      if (lv === 3) {
        a = times(a, 1.5);
        b = times(b, 1.5);
        c = times(c, 1.5);
        d = times(d, 1.5);
        e = times(e, 1.5);
      } else if (lv === 4) {
        a = times(a, 2.0);
        b = times(b, 2.0);
        c = times(c, 2.0);
        d = times(d, 2.0);
        e = times(e, 2.0);
      } else if (lv === 5) {
        a = times(a, 2.5);
        b = times(b, 2.5);
        c = times(c, 2.5);
        d = times(d, 2.5);
        e = times(e, 2.5);
      } else if (lv >= 6) {
        a = times(a, 3.0);
        b = times(b, 3.0);
        c = times(c, 3.0);
        d = times(d, 3.0);
        e = times(e, 3.0);
      }
    }

    // f（异常经验）：仅 lv==2 且无[开放/容易自慰/容易上瘾/淫乱/疯狂]时 = 1，
    // 不足即双轨同置 bit2
    let f = 0;
    if (
      lv === 2 &&
      talent(33) === 0 &&
      talent(60) === 0 &&
      talent(72) === 0 &&
      talent(76) === 0 &&
      talent(123) === 0
    ) {
      f = lv - 1;
    }

    if (talent(60)) {
      // 容易自慰（A-D 四列 ×0.25，E 不受影响）
      a = times(a, 0.25);
      b = times(b, 0.25);
      c = times(c, 0.25);
      d = times(d, 0.25);
    }
    if (talent(72)) {
      // 容易上瘾（×0.50）
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
      d = times(d, 0.5);
    }
    if (talent(80)) {
      // 倒错的（×0.75）
      a = times(a, 0.75);
      b = times(b, 0.75);
      c = times(c, 0.75);
      d = times(d, 0.75);
    }
    if (talent(76)) {
      // 淫乱化（×0.50）
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
      d = times(d, 0.5);
    }

    const exp50 = era.get(`exp:${cid}:50`) || 0;
    // 异常经验检查：等价于在 f 段与素质修正后各做一次同条件判定，
    // 合并为一次
    let i = 0;
    let j = 0;
    if (f > exp50) {
      i |= 2;
      j |= 2;
    }
    if (abl17() < lv + 1) {
      // 露出癖门槛
      i |= 4;
      j |= 4;
    }
    if (abl0() < lv + 1) {
      // 阴蒂感觉门槛
      i |= 4;
      j |= 4;
    }

    if (a < 1) a = 1;
    if (b < 1) b = 1;
    if (c < 1) c = 1;
    if (d < 1) d = 1;
    if (e < 1) e = 1;

    const juel5 = era.get(`juel:${cid}:5`) || 0;
    const juel0 = era.get(`juel:${cid}:0`) || 0;
    const juel8 = era.get(`juel:${cid}:8`) || 0;
    const exp10 = era.get(`exp:${cid}:10`) || 0;
    const exp11 = era.get(`exp:${cid}:11`) || 0;
    if (juel5 < a) i |= 1;
    if (juel0 < b) i |= 1;
    if (juel8 < c) i |= 1;
    if (exp10 < d) i |= 2;
    if (juel5 < a) j |= 1;
    if (juel0 < b) j |= 1;
    if (juel8 < c) j |= 1;
    if (exp11 < e) j |= 2;

    if (f > 0) {
      era.print(`${era.get('expname:50')}${f}以上(现在${exp50})且`);
    }
    era.print(`${era.get('ablname:17')}LV${lv + 1}以上(现在LV${abl17()})且`);
    era.print(`${era.get('ablname:0')}LV${lv + 1}以上(现在LV${abl0()})且`);
    era.printButton(
      `- ${era.get('palamname:5')}点数×${juel5}/${a} ……${get_ablup_state(i)}`,
      0,
    ); // （恒渲染）
    // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    era.print(`　　　${era.get('palamname:0')}点数×${juel0}/${b}`);
    era.print(`　　　${era.get('palamname:8')}点数×${juel8}/${c}`);
    era.print(`　　　${era.get('expname:10')}　${exp10}/${d}`);
    era.printButton(
      `- ${era.get('palamname:5')}点数×${juel5}/${a} ……${get_ablup_state(j)}`,
      1,
    ); // （恒渲染，与 [0] 同分母）
    // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    era.print(`　　　${era.get('palamname:0')}点数×${juel0}/${b}`);
    era.print(`　　　${era.get('palamname:8')}点数×${juel8}/${c}`);
    era.print(`　　　${era.get('expname:11')}　${exp11}/${e}`);
    era.printButton('- 停止', 100);

    const result = await era.input();
    if (result === 100) {
      // 放弃返回：最后一次动作是输入、其后无打印，返回哨兵让分发方
      // 不再等键（否则回显会让等键真等一次，玩家多按键）
      return HANDLER_QUIET;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件');
      continue;
    } else if (result === 1 && j !== 0) {
      era.print('未满足条件');
      continue;
    } else if (result === 0 || result === 1) {
      const new_lv = era.add(`abl:${cid}:31`, 1); // （train 属主；两轨扣点相同）
      era.add(`juel:${cid}:5`, -a);
      era.add(`juel:${cid}:0`, -b);
      era.add(`juel:${cid}:8`, -c);
      era.print(`${era.get('ablname:31')}变为LV${new_lv}。`);
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 *
 * 本函数的数值不一致，保留原样：组合上限的拦截判定用 32²×6500（欲情
 * JUEL:5）/32²×19000（屈服 JUEL:6），而提示文案写 32²×4000——玩家满足
 * 提示值仍可能被拦。合计≥10 且珠够时，a/b 直接覆盖为
 * 32²×4000/32²×19000，**梯子值作废**，且覆盖发生在戒备森严之前——戒备
 * 森严作用于覆盖后的值。「32+33+39 合计 ≥30 即免费」的判法不实现：
 * 正常流程不可达（三个中毒各 Lv10 封顶即无购买入口）。
 */
async function ablup32(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl11 = () => era.get(`abl:${cid}:11`) || 0;
  const abl16 = () => era.get(`abl:${cid}:16`) || 0;
  const abl32 = () => era.get(`abl:${cid}:32`) || 0;
  const abl33 = () => era.get(`abl:${cid}:33`) || 0;
  const abl39 = () => era.get(`abl:${cid}:39`) || 0;

  era.drawLine();

  if (
    abl32() >= 5 &&
    talent(76) === 0 &&
    talent(50) === 0 &&
    talent(61) === 0 &&
    talent(64) === 0 &&
    talent(47) === 0
  ) {
    await era.printAndWait('需要特殊素质才能继续提升'); // （AND：全 0 才拦）
    return;
  }
  if (abl32() >= 10) {
    await era.printAndWait('已达最高级');
    return;
  }
  if (abl32() + abl33() + abl39() >= 10) {
    const juel5_gate = era.get(`juel:${cid}:5`) || 0;
    const juel6_gate = era.get(`juel:${cid}:6`) || 0;
    if (
      juel5_gate < abl32() * abl32() * 6500 ||
      juel6_gate < abl32() * abl32() * 19000
    ) {
      era.print(
        `精液中毒(${abl32()})＋百合中毒(${abl33()})＋兽奸中毒(${abl39()})上限为10`,
      );
      era.print(
        `至少达成${era.get('palamname:5')}点数${abl32() * abl32() * 4000}点或${era.get('palamname:6')}点数${abl32() * abl32() * 19000}点的其中一项`,
      ); // （文案写 4000，判定用 6500，保留原样）
      await era.printAndWait('方可提升当前精液中毒的等级');
      return;
    }
  }

  for (;;) {
    const lv = abl32();
    // a(欲情)/b(屈服)/c(精液经验) 的梯子
    let a, b, c;
    if (lv === 0) [a, b, c] = [3000, 10000, 10];
    else if (lv === 1) [a, b, c] = [8000, 20000, 25];
    else if (lv === 2) [a, b, c] = [15000, 35000, 40];
    else if (lv === 3) [a, b, c] = [30000, 60000, 80];
    else if (lv === 4) [a, b, c] = [50000, 130000, 200];
    else if (lv === 5) [a, b, c] = [65000, 190000, 500];
    else if (lv === 6) [a, b, c] = [90000, 300000, 800];
    else if (lv === 7) [a, b, c] = [120000, 500000, 1200];
    else if (lv === 8) [a, b, c] = [200000, 800000, 1500];
    else [a, b, c] = [500000, 1500000, 2000]; // lv === 9

    if (abl32() + abl33() + abl39() >= 10) {
      // 组合上限突破价：直接覆盖梯子值，先于戒备森严
      a = abl32() * abl32() * 4000;
      b = abl32() * abl32() * 19000;
    }

    if (talent(27)) {
      // 戒备森严（作用于覆盖后的 a/b/c）
      if (lv === 3) {
        a = times(a, 1.5);
        b = times(b, 1.5);
        c = times(c, 1.5);
      } else if (lv === 4) {
        a = times(a, 2.0);
        b = times(b, 2.0);
        c = times(c, 2.0);
      } else if (lv === 5) {
        a = times(a, 2.5);
        b = times(b, 2.5);
        c = times(c, 2.5);
      } else if (lv >= 6) {
        a = times(a, 3.0);
        b = times(b, 3.0);
        c = times(c, 3.0);
      }
    }

    // d（异常经验）：lv>=2 且无[不怕污臭/容易上瘾/倒错的/疯狂/喜欢精液]时
    // = lv-1
    let d = 0;
    if (
      lv >= 2 &&
      talent(61) === 0 &&
      talent(72) === 0 &&
      talent(80) === 0 &&
      talent(123) === 0 &&
      talent(47) === 0
    ) {
      d = lv - 1;
    }

    if (talent(11)) {
      // 反抗心（×1.50）
      a = times(a, 1.5);
      b = times(b, 1.5);
      c = times(c, 1.5);
    }
    if (talent(22)) {
      // 感情淡薄（×0.95）
      a = times(a, 0.95);
      b = times(b, 0.95);
      c = times(c, 0.95);
    }
    if (talent(24)) {
      // 保守的（×1.20）
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
    }
    if (talent(32)) {
      // 压抑 / 开放（×1.20 / ×0.80）
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
    } else if (talent(33)) {
      a = times(a, 0.8);
      b = times(b, 0.8);
      c = times(c, 0.8);
    }
    if (talent(34)) {
      // 抵抗（×2.00）
      a = times(a, 2.0);
      b = times(b, 2.0);
      c = times(c, 2.0);
    }
    if (talent(47)) {
      // 喜欢精液（×0.50）
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
    }
    if (talent(52)) {
      // 擅用舌头（×0.95）
      a = times(a, 0.95);
      b = times(b, 0.95);
      c = times(c, 0.95);
    }
    if (talent(61)) {
      // 不怕污臭（×0.90）/ 反感污臭（×2.00）
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
    } else if (talent(62)) {
      a = times(a, 2.0);
      b = times(b, 2.0);
      c = times(c, 2.0);
    }
    if (talent(64)) {
      // 不怕脏（×0.90）
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
    }
    if (talent(72)) {
      // 容易上瘾（×0.50）
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
    }
    if (talent(73)) {
      // 容易陷落（×0.50）
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
    }
    if (talent(76)) {
      // 淫乱（×0.90）
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
    }
    if (talent(80)) {
      // 倒错的（×0.75）
      a = times(a, 0.75);
      b = times(b, 0.75);
      c = times(c, 0.75);
    }
    if (talent(87)) {
      // 小恶魔（×0.95）
      a = times(a, 0.95);
      b = times(b, 0.95);
      c = times(c, 0.95);
    }
    if (talent(123)) {
      // 疯狂（×0.90）
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
    }
    if (talent(9)) {
      // 崩坏（×0.90）
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
    }

    if (a < 1) a = 1;
    if (b < 1) b = 1;
    if (c < 1) c = 1;

    const juel5 = era.get(`juel:${cid}:5`) || 0;
    const juel6 = era.get(`juel:${cid}:6`) || 0;
    const exp20 = era.get(`exp:${cid}:20`) || 0;
    const exp50 = era.get(`exp:${cid}:50`) || 0;
    let i = 0;
    let j = 0;
    if (d > exp50) {
      // 异常经验不足，双轨同时命中
      i |= 2;
      j |= 2;
    }
    if (talent(76) === 0) {
      // 无淫乱：侍奉精神门槛
      if (abl16() < lv + 1) {
        i |= 4;
        j |= 4;
      }
    } else if (talent(76) === 1) {
      // 有淫乱：改查欲望
      if (abl11() < lv + 1) {
        i |= 4;
        j |= 4;
      }
    }
    if (juel5 < a) i |= 1;
    if (juel6 < b) i |= 1;
    if (exp20 < c) i |= 2;
    if (juel5 < a * 3) j |= 1;
    if (juel6 < b * 3) j |= 1;
    if (exp20 < Math.floor(c / 2)) j |= 2; // （C/2 整除）

    if (d > 0) {
      era.print(`${era.get('expname:50')}${d}以上(现在${exp50})且`);
    }
    if (talent(76) === 0) {
      era.print(`${era.get('ablname:16')}LV${lv + 1}以上(现在LV${abl16()})且`);
    } else if (talent(76) === 1) {
      era.print(`${era.get('ablname:11')}LV${lv + 1}以上(现在LV${abl11()})且`);
    }
    era.printButton(
      `- ${era.get('palamname:5')}点数×${juel5}/${a} ……${get_ablup_state(i)}`,
      0,
    ); // （恒渲染）
    // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    era.print(`　　　${era.get('palamname:6')}点数×${juel6}/${b}`);
    era.print(`　　　${era.get('expname:20')}　${exp20}/${c}`);
    era.printButton(
      `- ${era.get('palamname:5')}点数×${juel5}/${a * 3} ……${get_ablup_state(j)}`,
      1,
    ); // （恒渲染，无 256 分支）
    // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    era.print(`　　　${era.get('palamname:6')}点数×${juel6}/${b * 3}`);
    era.print(`　　　${era.get('expname:20')}　${exp20}/${Math.floor(c / 2)}`);
    era.printButton('- 停止', 100);

    const result = await era.input();
    if (result === 100) {
      // 放弃返回：最后一次动作是输入、其后无打印，返回哨兵让分发方
      // 不再等键（否则回显会让等键真等一次，玩家多按键）
      return HANDLER_QUIET;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件');
      continue;
    } else if (result === 1 && j !== 0) {
      era.print('未满足条件');
      continue;
    } else if (result === 0) {
      const new_lv = era.add(`abl:${cid}:32`, 1); // （train 属主）
      era.add(`juel:${cid}:5`, -a);
      era.add(`juel:${cid}:6`, -b);
      era.print(`${era.get('ablname:32')}变为LV${new_lv}。`);
      return;
    } else if (result === 1) {
      const new_lv = era.add(`abl:${cid}:32`, 1);
      era.add(`juel:${cid}:5`, -a * 3);
      era.add(`juel:${cid}:6`, -b * 3);
      era.print(`${era.get('ablname:32')}变为LV${new_lv}。`);
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

async function ablup33(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl22 = () => era.get(`abl:${cid}:22`) || 0;
  const abl32 = () => era.get(`abl:${cid}:32`) || 0;
  const abl33 = () => era.get(`abl:${cid}:33`) || 0;
  const abl39 = () => era.get(`abl:${cid}:39`) || 0;

  if (talent(122)) return; // 男人直接返回（分隔线之前，无输出）

  era.drawLine();

  if (
    abl33() >= 5 &&
    talent(76) === 0 &&
    talent(80) === 0 &&
    talent(81) === 0 &&
    talent(82) === 0
  ) {
    await era.printAndWait('需要特殊素质才能继续提升');
    return;
  }
  if (abl33() >= 10) {
    await era.printAndWait('已达最高级');
    return;
  }
  if (abl32() + abl33() + abl39() >= 10) {
    const juel5_gate = era.get(`juel:${cid}:5`) || 0;
    const juel6_gate = era.get(`juel:${cid}:6`) || 0;
    const juel0_gate = era.get(`juel:${cid}:0`) || 0;
    if (
      juel5_gate < abl33() * abl33() * 4000 ||
      juel6_gate < abl33() * abl33() * 4000 ||
      juel0_gate < abl33() * abl33() * 10000
    ) {
      era.print(
        `精液中毒(${abl32()})＋百合中毒(${abl33()})＋兽奸中毒(${abl39()})上限为10`,
      );
      era.print(
        `至少达成${era.get('palamname:5')}点数${abl33() * abl33() * 4000}点、${era.get('palamname:6')}点数${abl33() * abl33() * 4000}点或${era.get('palamname:0')}点数${abl33() * abl33() * 10000}点的其中一项`,
      );
      await era.printAndWait('方可提升当前百合中毒的等级');
      return;
    }
  }

  for (;;) {
    const lv = abl33();
    // a(欲情=屈服需求)/b([0]阴核点数)/c(百合经验) 的梯子
    let a, b, c;
    if (lv === 0) [a, b, c] = [1200, 5000, 300];
    else if (lv === 1) [a, b, c] = [3900, 15000, 600];
    else if (lv === 2) [a, b, c] = [6000, 23000, 1000];
    else if (lv === 3) [a, b, c] = [18000, 50000, 1400];
    else if (lv === 4) [a, b, c] = [30000, 70000, 2100];
    else if (lv === 5) [a, b, c] = [55000, 120000, 3000];
    else if (lv === 6) [a, b, c] = [70000, 200000, 4000];
    else if (lv === 7) [a, b, c] = [100000, 350000, 5200];
    else if (lv === 8) [a, b, c] = [150000, 500000, 6500];
    else [a, b, c] = [300000, 800000, 8000]; // lv === 9

    if (abl32() + abl33() + abl39() >= 10) {
      // 组合上限突破价：直接覆盖梯子值，先于戒备森严
      a = abl33() * abl33() * 4000;
      b = abl33() * abl33() * 10000;
    }

    if (talent(27)) {
      // 戒备森严（作用于覆盖后的 a/b/c）
      if (lv === 3) {
        a = times(a, 1.5);
        b = times(b, 1.5);
        c = times(c, 1.5);
      } else if (lv === 4) {
        a = times(a, 2.0);
        b = times(b, 2.0);
        c = times(c, 2.0);
      } else if (lv === 5) {
        a = times(a, 2.5);
        b = times(b, 2.5);
        c = times(c, 2.5);
      } else if (lv >= 6) {
        a = times(a, 3.0);
        b = times(b, 3.0);
        c = times(c, 3.0);
      }
    }

    // d（异常经验）：lv>=2 且无[容易上瘾/倒错的/双性恋/讨厌男人/疯狂]时
    // = lv-1
    let d = 0;
    if (
      lv >= 2 &&
      talent(72) === 0 &&
      talent(80) === 0 &&
      talent(81) === 0 &&
      talent(82) === 0 &&
      talent(123) === 0
    ) {
      d = lv - 1;
    }

    if (talent(11)) {
      // 反抗心（×1.50）
      a = times(a, 1.5);
      b = times(b, 1.5);
      c = times(c, 1.5);
    }
    if (talent(20)) {
      // 克制（×1.20）
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
    }
    if (talent(21)) {
      // 冷漠（×1.20）
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
    }
    if (talent(24)) {
      // 保守的（×1.50，非 ablup22/23 的 ×1.20）
      a = times(a, 1.5);
      b = times(b, 1.5);
      c = times(c, 1.5);
    }
    if (talent(32)) {
      // 压抑 / 开放（×1.20 / ×0.80）
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
    } else if (talent(33)) {
      a = times(a, 0.8);
      b = times(b, 0.8);
      c = times(c, 0.8);
    }
    if (talent(34)) {
      // 抵抗（×2.00）
      a = times(a, 2.0);
      b = times(b, 2.0);
      c = times(c, 2.0);
    }
    if (talent(52)) {
      // 擅用舌头（×0.90）
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
    }
    if (talent(61)) {
      // 不怕污臭（×0.95）
      a = times(a, 0.95);
      b = times(b, 0.95);
      c = times(c, 0.95);
    }
    if (talent(63)) {
      // 献身的（×0.90）
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
    }
    if (talent(64)) {
      // 不怕脏（×0.95）
      a = times(a, 0.95);
      b = times(b, 0.95);
      c = times(c, 0.95);
    }
    if (talent(70)) {
      // 接受快感 / 否定快感（×0.90 / ×1.10）
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
    } else if (talent(71)) {
      a = times(a, 1.1);
      b = times(b, 1.1);
      c = times(c, 1.1);
    }
    if (talent(72)) {
      // 容易上瘾（×0.50）
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
    }
    if (talent(73)) {
      // 容易陷落（×0.50）
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
    }
    if (talent(76)) {
      // 淫乱（×0.75）
      a = times(a, 0.75);
      b = times(b, 0.75);
      c = times(c, 0.75);
    }
    if (talent(79)) {
      // 男人婆（×2.00）
      a = times(a, 2.0);
      b = times(b, 2.0);
      c = times(c, 2.0);
    }
    if (talent(80)) {
      // 倒错的（×0.75）
      a = times(a, 0.75);
      b = times(b, 0.75);
      c = times(c, 0.75);
    }
    if (talent(81)) {
      // 双性恋（×0.50）
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
    }
    if (talent(82)) {
      // 讨厌男人（×0.50）
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
    }
    if (talent(87)) {
      // 小恶魔（×0.90）
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
    }
    if (talent(123)) {
      // 疯狂（×0.50）
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
    }
    if (talent(9)) {
      // 崩坏（×0.80）
      a = times(a, 0.8);
      b = times(b, 0.8);
      c = times(c, 0.8);
    }

    if (a < 1) a = 1;
    if (b < 1) b = 1;
    if (c < 1) c = 1;

    const juel0 = era.get(`juel:${cid}:0`) || 0;
    const juel5 = era.get(`juel:${cid}:5`) || 0;
    const juel6 = era.get(`juel:${cid}:6`) || 0;
    const exp40 = era.get(`exp:${cid}:40`) || 0;
    const exp50 = era.get(`exp:${cid}:50`) || 0;
    let i = 0;
    if (d > exp50) i |= 2; // （异常经验；另一轨没有对应选项，不需要第二个可否位）
    if (abl22() < lv + 1) i |= 4; // （百合气质门槛；同理只置 i）
    if (juel0 < b) i |= 1;
    if (juel5 < a) i |= 1;
    if (juel6 < a) i |= 1; // （欲情/屈服需求同为 a）
    if (exp40 < c) i |= 2;

    if (d > 0) {
      era.print(`${era.get('expname:50')}${d}以上(现在${exp50})且`);
    }
    era.print(`${era.get('ablname:22')}LV${lv + 1}以上(现在LV${abl22()})且`);
    era.printButton(
      `- ${era.get('palamname:0')}点数×${juel0}/${b} ……${get_ablup_state(i)}`,
      0,
    );
    // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    era.print(`　　　${era.get('palamname:5')}点数×${juel5}/${a}`);
    era.print(`　　　${era.get('palamname:6')}点数×${juel6}/${a}`); // （分母同为 a）
    era.print(`　　　${era.get('expname:40')}　${exp40}/${c}`);
    era.printButton('- 停止', 100);

    const result = await era.input();
    if (result === 100) {
      // 放弃返回：最后一次动作是输入、其后无打印，返回哨兵让分发方
      // 不再等键（否则回显会让等键真等一次，玩家多按键）
      return HANDLER_QUIET;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件');
      continue;
    } else if (result === 0) {
      const new_lv = era.add(`abl:${cid}:33`, 1); // （train 属主）
      era.add(`juel:${cid}:0`, -b);
      era.add(`juel:${cid}:5`, -a);
      era.add(`juel:${cid}:6`, -a);
      era.print(`${era.get('ablname:33')}变为LV${new_lv}。`);
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

async function ablup37(cid, mode) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl11 = () => era.get(`abl:${cid}:11`) || 0;
  const abl37 = () => era.get(`abl:${cid}:37`) || 0;

  if (!mode) era.drawLine(); // （干跑不输出）

  if (
    abl37() >= 5 &&
    talent(76) === 0 &&
    talent(31) === 0 &&
    talent(180) === 0
  ) {
    if (!mode) await era.printAndWait('需要特殊素质才能继续提升');
    return;
  }
  if (abl37() >= 10) {
    if (!mode) await era.printAndWait('已达最高级');
    return;
  }

  for (;;) {
    const lv = abl37();
    // a/b/c/d 的梯子
    let a, b, c, d;
    if (lv === 0) [a, b, c, d] = [2000, 3000, 1000, 50];
    else if (lv === 1) [a, b, c, d] = [5000, 8000, 2500, 100];
    else if (lv === 2) [a, b, c, d] = [8000, 15000, 5500, 150];
    else if (lv === 3) [a, b, c, d] = [14000, 30000, 10000, 250];
    else if (lv === 4) [a, b, c, d] = [22000, 50000, 20000, 400];
    else if (lv === 5) [a, b, c, d] = [34000, 80000, 30000, 500];
    else if (lv === 6) [a, b, c, d] = [55000, 120000, 50000, 800];
    else if (lv === 7) [a, b, c, d] = [80000, 180000, 60000, 1200];
    else if (lv === 8) [a, b, c, d] = [150000, 300000, 90000, 2000];
    else [a, b, c, d] = [300000, 600000, 150000, 3000]; // lv === 9

    if (talent(27)) {
      // 戒备森严（else-if 互斥，a/b/c/d 全乘）
      if (lv === 3) {
        a = times(a, 1.5);
        b = times(b, 1.5);
        c = times(c, 1.5);
        d = times(d, 1.5);
      } else if (lv === 4) {
        a = times(a, 2.0);
        b = times(b, 2.0);
        c = times(c, 2.0);
        d = times(d, 2.0);
      } else if (lv === 5) {
        a = times(a, 2.5);
        b = times(b, 2.5);
        c = times(c, 2.5);
        d = times(d, 2.5);
      } else if (lv >= 6) {
        a = times(a, 3.0);
        b = times(b, 3.0);
        c = times(c, 3.0);
        d = times(d, 3.0);
      }
    }
    if (talent(11)) {
      // 反抗心
      a = times(a, 1.5);
      b = times(b, 1.5);
      c = times(c, 1.5);
      d = times(d, 1.5);
    }
    if (talent(12)) {
      // 刚强
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
      d = times(d, 1.2);
    }
    if (talent(20)) {
      // 克制
      a = times(a, 1.5);
      b = times(b, 1.5);
      c = times(c, 1.5);
      d = times(d, 1.5);
    }
    if (talent(24)) {
      // 保守的
      a = times(a, 1.5);
      b = times(b, 1.5);
      c = times(c, 1.5);
      d = times(d, 1.5);
    }
    if (talent(26)) {
      // 悲观的
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
      d = times(d, 0.9);
    }
    if (talent(28)) {
      // 爱表现
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
      d = times(d, 0.9);
    }
    if (talent(30)) {
      // 看重贞操（与看轻贞操互斥）
      a = times(a, 2.0);
      b = times(b, 2.0);
      c = times(c, 2.0);
      d = times(d, 2.0);
    } else if (talent(31)) {
      // 看轻贞操
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
      d = times(d, 0.9);
    }
    if (talent(32)) {
      // 压抑
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
      d = times(d, 1.2);
    } else if (talent(33)) {
      // 开放
      a = times(a, 0.8);
      b = times(b, 0.8);
      c = times(c, 0.8);
      d = times(d, 0.8);
    }
    if (talent(34)) {
      // 抵抗
      a = times(a, 2.0);
      b = times(b, 2.0);
      c = times(c, 2.0);
      d = times(d, 2.0);
    }
    if (talent(35)) {
      // 害羞
      a = times(a, 1.1);
      b = times(b, 1.1);
      c = times(c, 1.1);
      d = times(d, 1.1);
    } else if (talent(36)) {
      // 不知羞耻
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
      d = times(d, 0.9);
    }
    if (talent(63)) {
      // 献身的
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
      d = times(d, 0.9);
    }
    if (talent(72)) {
      // 容易上瘾
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
      d = times(d, 0.5);
    }
    if (talent(76)) {
      // 淫乱——b 轨 ×0.50 与其余 ×0.80 不同，保留原样
      a = times(a, 0.8);
      b = times(b, 0.5);
      c = times(c, 0.8);
      d = times(d, 0.8);
    }
    if (talent(82)) {
      // 讨厌男人
      a = times(a, 3.0);
      b = times(b, 3.0);
      c = times(c, 3.0);
      d = times(d, 3.0);
    }
    if (talent(85)) {
      // 爱慕
      a = times(a, 1.5);
      b = times(b, 1.5);
      c = times(c, 1.5);
      d = times(d, 1.5);
    }
    if (talent(153)) {
      // 妊娠
      a = times(a, 2.0);
      b = times(b, 2.0);
      c = times(c, 2.0);
      d = times(d, 2.0);
    }
    if (talent(123)) {
      // 疯狂
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
      d = times(d, 0.5);
    }
    if (talent(9)) {
      // 崩坏
      a = times(a, 0.8);
      b = times(b, 0.8);
      c = times(c, 0.8);
      d = times(d, 0.8);
    }
    if (talent(180)) {
      // 妓女
      a = times(a, 0.8);
      b = times(b, 0.8);
      c = times(c, 0.8);
      d = times(d, 0.8);
    }
    if (talent(181)) {
      // 倾城
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
      d = times(d, 0.5);
    }
    if (talent(183)) {
      // 有常客
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
      d = times(d, 0.9);
    }
    if (talent(184)) {
      // 求爱
      a = times(a, 2.0);
      b = times(b, 2.0);
      c = times(c, 2.0);
      d = times(d, 2.0);
    }

    // 异常经验：lv>=2 且非[疯狂][崩坏] → f = lv-1，17 项素质增减
    let f = 0;
    if (lv >= 2 && talent(123) === 0 && talent(9) === 0) {
      f = lv - 1;
      if (talent(33)) f -= 1; // 开放
      if (talent(70)) f -= 1; // 接受快感
      if (talent(72)) f -= 2; // 容易上瘾
      if (talent(73)) f -= 1; // 容易陷落
      if (talent(76)) f -= 1; // 淫乱
      if (talent(80)) f -= 1; // 倒錯的
      if (talent(180)) f -= 1; // 妓女
      if (talent(181)) f -= 2; // 倾城
      if (talent(11)) f += 1; // 反抗心
      if (talent(20)) f += 1; // 克制
      if (talent(32)) f += 1; // 压抑
      if (talent(34)) f += 1; // 抵抗
      if (talent(71)) f += 1; // 否定快感
      if (talent(85)) f += 1; // 爱慕
      if (talent(184)) f += 2; // 求爱
      if (f < 0) f = 0;
    }

    if (a < 1) a = 1; // 最低 1 点
    if (b < 1) b = 1;
    if (c < 1) c = 1;
    if (d < 1) d = 1;

    const juel4 = era.get(`juel:${cid}:4`) || 0;
    const juel5 = era.get(`juel:${cid}:5`) || 0;
    const juel6 = era.get(`juel:${cid}:6`) || 0;
    const exp74 = era.get(`exp:${cid}:74`) || 0;
    const exp50 = era.get(`exp:${cid}:50`) || 0;
    let i = 0;
    if (exp50 < f) i |= 2; // （f 段内）
    if (abl11() < lv + 1) i |= 4; // 欲望门槛
    if (juel4 < a) i |= 1; // 恭顺
    if (juel5 < b) i |= 1; // 欲情
    if (juel6 < c) i |= 1; // 屈服
    if (exp74 < d) i |= 2; // 卖淫经验

    // 干跑出口（decide_ablup37 / core_ablup37）
    if (mode === 'decide') {
      // decide_ablup37 的额外门槛：卖淫中毒＋性交中毒合计 10
      // 以上即不可提升——能力提升主流程没有这条额外门槛
      if (lv + (era.get(`abl:${cid}:38`) || 0) >= 10) return null;
      return { i };
    }
    if (mode === 'core') {
      era.add(`abl:${cid}:37`, 1); // core_ablup37: ABL ++
      if (i === 0) {
        era.add(`juel:${cid}:4`, -a);
        era.add(`juel:${cid}:5`, -b);
        era.add(`juel:${cid}:6`, -c);
      }
      return 0;
    }

    if (f > 0) {
      era.print(`${era.get('expname:50')}${f}以上(现在${exp50})且`);
    }
    era.print(`${era.get('ablname:11')}LV${lv + 1}以上(现在LV${abl11()})且`);
    era.printButton(
      `- ${era.get('palamname:4')}点数×${juel4}/${a} ……${get_ablup_state(i)}`,
      0,
    );
    // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    era.print(`　　　${era.get('palamname:5')}点数×${juel5}/${b}`);
    era.print(`　　　${era.get('palamname:6')}点数×${juel6}/${c}`);
    era.print(`${era.get('expname:74')}　${exp74}/${d}`);
    era.printButton('- 停止', 100);

    const result = await era.input();
    if (result === 100) {
      // 放弃返回：最后一次动作是输入、其后无打印，返回哨兵让分发方
      // 不再等键（否则回显会让等键真等一次，玩家多按键）
      return HANDLER_QUIET;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件');
      continue;
    } else if (result === 0) {
      const new_lv = era.add(`abl:${cid}:37`, 1);
      era.add(`juel:${cid}:4`, -a);
      era.add(`juel:${cid}:5`, -b);
      era.add(`juel:${cid}:6`, -c);
      era.print(`${era.get('ablname:37')}变为LV${new_lv}。`);
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

async function ablup39(cid, mode) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl11 = () => era.get(`abl:${cid}:11`) || 0;
  const abl39 = () => era.get(`abl:${cid}:39`) || 0;
  const abl_sum = () =>
    (era.get(`abl:${cid}:32`) || 0) + (era.get(`abl:${cid}:33`) || 0) + abl39();

  if (!mode) era.drawLine(); // （干跑不输出）

  if (
    abl39() >= 5 &&
    talent(76) === 0 &&
    talent(124) === 0 &&
    talent(136) === 0
  ) {
    if (!mode) await era.printAndWait('需要特殊素质才能继续提升');
    return;
  }
  if (abl39() >= 10) {
    if (!mode) await era.printAndWait('已达最高级');
    return;
  }
  // 精液+百合+兽奸三中毒合计 10 以上：两珠任一不足即拦
  if (abl_sum() >= 10) {
    const bulk = abl39() * abl39() * 4000;
    if (
      (era.get(`juel:${cid}:5`) || 0) < bulk ||
      (era.get(`juel:${cid}:6`) || 0) < bulk
    ) {
      if (!mode) {
        era.print(
          `精液中毒(${era.get(`abl:${cid}:32`) || 0})＋百合中毒(${era.get(`abl:${cid}:33`) || 0})＋兽奸中毒(${abl39()})上限为10`,
        );
        era.print(
          `至少达成${era.get('palamname:5')}点数${bulk}点或${era.get('palamname:6')}点数${bulk}点的其中一项`,
        );
        await era.printAndWait('方可提升当前兽奸中毒的等级'); // （等待）
      }
      return; //
    }
  }

  for (;;) {
    const lv = abl39();
    // a/b/c 的梯子
    let a, b, c;
    if (lv === 0) [a, b, c] = [2000, 2000, 30];
    else if (lv === 1) [a, b, c] = [5000, 5000, 100];
    else if (lv === 2) [a, b, c] = [10000, 10000, 220];
    else if (lv === 3) [a, b, c] = [20000, 20000, 400];
    else if (lv === 4) [a, b, c] = [30000, 30000, 800];
    else if (lv === 5) [a, b, c] = [45000, 45000, 1600];
    else if (lv === 6) [a, b, c] = [75000, 75000, 2000];
    else if (lv === 7) [a, b, c] = [100000, 100000, 2800];
    else if (lv === 8) [a, b, c] = [200000, 200000, 4000];
    else [a, b, c] = [300000, 300000, 6000]; // lv === 9

    // 三重上限时 A/B 覆盖为 lv²×4000（梯子作废）
    if (abl_sum() >= 10) {
      a = lv * lv * 4000;
      b = lv * lv * 4000;
    }

    // 戒备森严——分档判 ABL:37（卖淫中毒），不是本能力的等级，
    // 保留原样
    if (talent(27)) {
      const gate = era.get(`abl:${cid}:37`) || 0;
      if (gate === 3) {
        a = times(a, 2.0);
        b = times(b, 2.0);
        c = times(c, 2.0);
      } else if (gate === 4) {
        a = times(a, 2.5);
        b = times(b, 2.5);
        c = times(c, 2.5);
      } else if (gate >= 5) {
        a = times(a, 3.0);
        b = times(b, 3.0);
        c = times(c, 3.0);
      }
    }

    // 异常经验：lv>=2 且无[容易上瘾][淫乱][牝犬] → f = lv+1
    let f = 0;
    if (lv >= 2 && talent(72) === 0 && talent(76) === 0 && talent(136) === 0) {
      f = lv + 1;
    }

    if (talent(20)) {
      // 克制（a/b 与 c 倍率不同）
      a = times(a, 2.5);
      b = times(b, 2.5);
      c = times(c, 1.5);
    }
    if (talent(70)) {
      // 接受快感（与否定快感互斥）
      a = times(a, 0.75);
      b = times(b, 0.75);
    } else if (talent(71)) {
      // 否定快感
      a = times(a, 1.75);
      b = times(b, 1.75);
    }
    if (talent(72)) {
      // 容易上瘾
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
    }
    if (talent(80)) {
      // 倒錯的
      a = times(a, 0.75);
      b = times(b, 0.75);
      c = times(c, 0.75);
    }
    if (talent(123)) {
      // 疯狂
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
    }
    if (talent(124)) {
      // 动物耳朵
      a = times(a, 0.8);
      b = times(b, 0.8);
      c = times(c, 0.8);
    }
    if (talent(136)) {
      // 牝犬
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
    }
    if (talent(85)) {
      // 爱慕（心向主人，兽交不易；a/b 与 c 倍率不同）
      a = times(a, 1.8);
      b = times(b, 1.8);
      c = times(c, 1.5);
    }

    if (a < 1) a = 1; // 最低 1 点
    if (b < 1) b = 1;
    if (c < 1) c = 1;

    const juel5 = era.get(`juel:${cid}:5`) || 0;
    const juel6 = era.get(`juel:${cid}:6`) || 0;
    const exp56 = era.get(`exp:${cid}:56`) || 0;
    const exp50 = era.get(`exp:${cid}:50`) || 0;
    let i = 0;
    if (abl11() < lv + 1) i |= 4; // 欲望门槛
    if (juel5 < a) i |= 1;
    if (juel6 < b) i |= 1;
    if (exp56 < c) i |= 2; // 兽奸经验
    if (exp50 < f) i |= 2; // 异常经验

    // 干跑出口（decide_ablup39 / core_ablup39）
    if (mode === 'decide') {
      // decide_ablup39 的上限条件是 32+33+39 >= 30，与主流程
      // 的 >= 10 不同（主流程那条是「两珠任一不足即拦」的价位门槛）
      if (abl_sum() >= 30) return null;
      return { i };
    }
    if (mode === 'core') {
      era.add(`abl:${cid}:39`, 1); // core_ablup39: ABL:39 ++
      if (i === 0) {
        era.add(`juel:${cid}:5`, -a);
        era.add(`juel:${cid}:6`, -b);
      }
      return 0;
    }

    if (f > 0) {
      era.print(`${era.get('expname:50')}${f}以上(现在${exp50})且`);
    }
    era.print(`${era.get('ablname:11')}LV${lv + 1}以上(现在LV${abl11()})且`);
    era.printButton(
      `- ${era.get('palamname:5')}点数×${juel5}/${a} ……${get_ablup_state(i)}`,
      0,
    );
    // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    era.print(`　　　${era.get('palamname:6')}点数×${juel6}/${b}`);
    era.print(`${era.get('expname:56')}　${exp56}/${c}`);
    era.printButton('- 停止', 100);

    const result = await era.input();
    if (result === 100) {
      // 放弃返回：最后一次动作是输入、其后无打印，返回哨兵让分发方
      // 不再等键（否则回显会让等键真等一次，玩家多按键）
      return HANDLER_QUIET;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件');
      continue;
    } else if (result === 0) {
      const new_lv = era.add(`abl:${cid}:39`, 1);
      era.add(`juel:${cid}:5`, -a);
      era.add(`juel:${cid}:6`, -b);
      era.print(`${era.get('ablname:39')}变为LV${new_lv}。`);
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

async function ablup40(cid, mode) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl11 = () => era.get(`abl:${cid}:11`) || 0;
  const abl40 = () => era.get(`abl:${cid}:40`) || 0;

  if (abl40() >= 10) {
    if (!mode) await era.printAndWait('已达到MAX'); // （等待）
    return;
  }

  for (;;) {
    const lv = abl40();
    // a 的梯子（与 ablup39 的 a 同值表）
    let a;
    if (lv === 0) a = 2000;
    else if (lv === 1) a = 5000;
    else if (lv === 2) a = 10000;
    else if (lv === 3) a = 20000;
    else if (lv === 4) a = 30000;
    else if (lv === 5) a = 45000;
    else if (lv === 6) a = 75000;
    else if (lv === 7) a = 100000;
    else if (lv === 8) a = 200000;
    else a = 300000; // lv === 9

    // 异常经验：lv>=2 且无[容易上瘾][淫乱] → f = lv+1
    let f = 0;
    if (lv >= 2 && talent(72) === 0 && talent(76) === 0) {
      f = lv + 1;
    }

    if (talent(20)) a = times(a, 2.5); // 克制
    if (talent(70)) {
      // 接受快感（与否定快感互斥）
      a = times(a, 0.75);
    } else if (talent(71)) {
      // 否定快感
      a = times(a, 1.75);
    }
    if (talent(72)) a = times(a, 0.5); // 容易上瘾
    if (talent(80)) a = times(a, 0.75); // 倒錯的
    if (talent(123)) a = times(a, 0.5); // 疯狂

    if (a < 1) a = 1;

    const juel15 = era.get(`juel:${cid}:15`) || 0;
    const exp50 = era.get(`exp:${cid}:50`) || 0;
    let i = 0;
    if (abl11() < lv + 1) i |= 4; // 欲望门槛（判 ABL:40+1）
    if (juel15 < a) i |= 1;
    if (exp50 < f) i |= 2; // 异常经验

    // 干跑出口（decide_ablup40）：判定的门槛与主流程同条件
    // （只有 ABL:40 >= 10 与同段的 i 位）。没有对应的 core
    // （auto_ablup 的 0..39 循环不含 40），故不做 core 干跑。
    if (mode === 'decide') return { i };

    // 内联状态文案（不用 get_ablup_state；尾随空格原样）
    let state;
    if (i === 0) {
      state = 'ＯＫ';
    } else {
      state = '';
      if (i & 1) state += '点数不足 ';
      if (i & 2) state += '经验不足';
      if (i & 4) state += '能力不足 ';
    }

    if (f > 0) {
      era.print(`${era.get('expname:50')}${f}以上(现在${exp50})`);
    }
    // 显示 ABL:39+1（与判定的 ABL:40+1 不一致，保留原样）
    era.print(
      `${era.get('ablname:11')}LV${(era.get(`abl:${cid}:39`) || 0) + 1}以上(现在LV${abl11()})`,
    );
    era.printButton(
      `- ${era.get('palamname:15')}点数×${juel15}/${a} ……${state}`,
      0,
    );
    // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    era.printButton('- 放弃', 100);

    const result = await era.input();
    if (result === 100) {
      // 放弃返回：最后一次动作是输入、其后无打印，返回哨兵让分发方
      // 不再等键（否则回显会让等键真等一次，玩家多按键）
      return HANDLER_QUIET;
    } else if (result === 0 && i !== 0) {
      era.print('条件不足');
      continue;
    } else if (result === 0) {
      const new_lv = era.add(`abl:${cid}:40`, 1);
      era.add(`juel:${cid}:15`, -a);
      era.print(`${era.get('ablname:40')}变为LV${new_lv}。`); // 译法见文件头
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

async function ablup99(cid, mode) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const mark2 = () => era.get(`mark:${cid}:2`) || 0;
  const mark3 = () => era.get(`mark:${cid}:3`) || 0;

  if (!mode) era.drawLine(); // （干跑不输出）

  if (mark3() <= 0) {
    if (!mode) {
      era.print('不存在反抗行为');
      await era.waitAnyKey();
    }
    return;
  }

  for (;;) {
    const lv = mark3();
    // a 的刻印阶梯（b 是顺从门槛，见下）
    let a;
    if (lv === 1) a = 5000;
    else if (lv === 2) a = 10000;
    else a = 50000; // lv === 3

    if (talent(12)) a = times(a, 3.0); // 刚强
    if (talent(16)) a = times(a, 1.5); // 嚣张
    if (talent(13)) a = times(a, 0.5); // 坦率
    if (talent(85)) a = times(a, 0.5); // 爱慕

    const abl10 = era.get(`abl:${cid}:10`) || 0;
    const juel6 = era.get(`juel:${cid}:6`) || 0;
    let i = 0;
    if (mark3() > mark2()) i |= 2; // 屈服刻印门槛
    const b = mark3() + 2; // 反抗刻印+2 的顺从
    if (b > abl10) i |= 4;
    if (juel6 < a) i |= 1; // 屈服珠

    // 干跑出口（decide_ablup99 / core_ablup99）：decide_ablup99 的门槛与
    // 主流程同条件（MARK:3 <= 0 的提前返回已在上方检查里）
    if (mode === 'decide') return { i };
    if (mode === 'core') {
      chara(cid).system.反抗刻印 -= 1; // core_ablup99: MARK:3 --
      if (i === 0) era.add(`juel:${cid}:6`, -a);
      return 0;
    }

    era.print(`${era.get('markname:2')}${mark3()}以上(现在LV${mark2()})且`);
    era.print(`${era.get('ablname:10')}LV${b}以上(现在LV${abl10})必要`);
    era.printButton(
      `- ${era.get('palamname:6')}点数×${juel6}/${a} ……${get_ablup_state(i)}`,
      0,
    );
    // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    era.printButton('- 停止', 100);

    const result = await era.input();
    if (result === 100) {
      // 放弃返回：最后一次动作是输入、其后无打印，返回哨兵让分发方
      // 不再等键（否则回显会让等键真等一次，玩家多按键）
      return HANDLER_QUIET;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件');
      continue;
    } else if (result === 0) {
      const new_mark = (chara(cid).system.反抗刻印 -= 1); // MARK:3 -= 1
      era.add(`juel:${cid}:6`, -a);
      era.print(`${era.get('markname:3')}下降为LV${new_mark}。`);
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

async function ablup100(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const mark10 = () => era.get(`mark:${cid}:10`) || 0;

  era.drawLine();

  if (mark10() <= 0) {
    era.print('并没有异界异常反应');
    await era.waitAnyKey();
    return;
  }

  for (;;) {
    const lv = mark10();
    // a 的刻印阶梯
    let a;
    if (lv === 1) a = 2000;
    else if (lv === 2) a = 5000;
    else if (lv === 3) a = 15000;
    else if (lv === 4) a = 30000;
    else a = 50000; // lv === 5

    if (talent(10)) a = times(a, 1.2); // 胆小
    if (talent(172)) a = times(a, 0.8); // 智慧
    if (talent(12)) a = times(a, 1.8); // 刚强
    if (talent(16)) a = times(a, 1.2); // 嚣张
    if (talent(13)) a = times(a, 0.5); // 坦率
    if (talent(85)) a = times(a, 0.5); // 爱慕
    if (talent(76)) a = times(a, 0.7); // 淫乱

    // 感觉合计（五项：阴蒂/乳房/私处/肛门/局部）
    const c =
      (era.get(`abl:${cid}:0`) || 0) +
      (era.get(`abl:${cid}:1`) || 0) +
      (era.get(`abl:${cid}:2`) || 0) +
      (era.get(`abl:${cid}:3`) || 0) +
      (era.get(`abl:${cid}:4`) || 0);
    const cflag9 = era.get(`cflag:${cid}:9`) || 0;
    const exp99 = era.get(`exp:${cid}:99`) || 0;
    let i = 0;
    // 两道门槛各自计数，m==2 才 |=4（OR 关系：过一道即可）
    let m = 0;
    if (mark10() < c - 5) m += 1;
    const b = mark10() * 10;
    if (b > cflag9) m += 1;
    if (m === 2) i |= 4;
    if (exp99 < a) i |= 2;

    era.print(`各处感觉总计${mark10() + 5}以上(现在${c})或`);
    era.print(`战斗等级LV${b}以上(现在LV${cflag9})必要，然后`);
    era.printButton(
      `- ${era.get('expname:99')}点数×${exp99}/${a} ……${get_ablup_state(i)}`,
      0,
    );
    // 这条空内容输出只收尾上一行（按钮已自成一行，不补空行——#595）
    era.printButton('- 停止', 100);

    const result = await era.input();
    if (result === 100) {
      // 放弃返回：最后一次动作是输入、其后无打印，返回哨兵让分发方
      // 不再等键（否则回显会让等键真等一次，玩家多按键）
      return HANDLER_QUIET;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件');
      continue;
    } else if (result === 0) {
      const new_mark = era.add(`mark:${cid}:10`, -1); // MARK:10 -= 1
      era.add(`exp:${cid}:99`, -a);
      era.print(`${era.get('markname:10')}下降为LV${new_mark}。`);
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

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
async function decide_ablup11(cid) {
  const r = await ablup11(cid, 'decide');
  return r && r.i === 0 ? 1 : 0;
}
/** core_ablup11：干跑主流程的 mode='core'（ABL:11 ++，i==0 时扣珠） */
async function core_ablup11(cid) {
  await ablup11(cid, 'core');
  return 0;
}
/** decide_ablup12 的返回值语义（组合上限即 0，见干跑出口） */
async function decide_ablup12(cid) {
  const r = await ablup12(cid, 'decide');
  return r && r.i === 0 ? 1 : 0;
}
/** core_ablup12：干跑主流程的 mode='core'（只扣珠，不扣钱） */
async function core_ablup12(cid) {
  await ablup12(cid, 'core');
  return 0;
}
/** decide_ablup13 的返回值语义 */
async function decide_ablup13(cid) {
  const r = await ablup13(cid, 'decide');
  return r && r.i === 0 ? 1 : 0;
}
/** core_ablup13：干跑主流程的 mode='core' */
async function core_ablup13(cid) {
  await ablup13(cid, 'core');
  return 0;
}
/** decide_ablup14 的返回值语义（干跑与主流程同查 >= 10；
 * 与 == 10 同效：到达 >10 无路径） */
async function decide_ablup14(cid) {
  const r = await ablup14(cid, 'decide');
  return r && r.i === 0 ? 1 : 0;
}
/** core_ablup14：干跑主流程的 mode='core' */
async function core_ablup14(cid) {
  await ablup14(cid, 'core');
  return 0;
}
/** decide_ablup15 的返回值语义（组合上限即 0） */
async function decide_ablup15(cid) {
  const r = await ablup15(cid, 'decide');
  return r && r.i === 0 ? 1 : 0;
}
/** core_ablup15：干跑主流程的 mode='core' */
async function core_ablup15(cid) {
  await ablup15(cid, 'core');
  return 0;
}
/** decide_ablup16 的返回值语义（任一轨道可提升即 1；素质复查
 * 与入口把关同条件，见干跑出口） */
async function decide_ablup16(cid) {
  const r = await ablup16(cid, 'decide');
  if (!r) return 0;
  return r.i === 0 || r.j === 0 || r.k === 0 ? 1 : 0;
}
/** core_ablup16：干跑主流程的 mode='core'（i→j→k 优先级扣珠） */
async function core_ablup16(cid) {
  await ablup16(cid, 'core');
  return 0;
}
/** decide_ablup17 的返回值语义 */
async function decide_ablup17(cid) {
  const r = await ablup17(cid, 'decide');
  return r && r.i === 0 ? 1 : 0;
}
/** core_ablup17：干跑主流程的 mode='core' */
async function core_ablup17(cid) {
  await ablup17(cid, 'core');
  return 0;
}
/** decide_ablup37 的返回值语义 */
async function decide_ablup37(cid) {
  const r = await ablup37(cid, 'decide');
  return r && r.i === 0 ? 1 : 0;
}
/** core_ablup37：干跑主流程的 mode='core' */
async function core_ablup37(cid) {
  await ablup37(cid, 'core');
  return 0;
}
/** decide_ablup39 的返回值语义 */
async function decide_ablup39(cid) {
  const r = await ablup39(cid, 'decide');
  return r && r.i === 0 ? 1 : 0;
}
/** core_ablup39：干跑主流程的 mode='core' */
async function core_ablup39(cid) {
  await ablup39(cid, 'core');
  return 0;
}
/** decide_ablup40 的返回值语义（没有对应的 core_ablup40，见 ablup40 干跑出口） */
async function decide_ablup40(cid) {
  const r = await ablup40(cid, 'decide');
  return r && r.i === 0 ? 1 : 0;
}
/** decide_ablup99 的返回值语义 */
async function decide_ablup99(cid) {
  const r = await ablup99(cid, 'decide');
  return r && r.i === 0 ? 1 : 0;
}
/** core_ablup99：干跑主流程的 mode='core'（MARK:3 --） */
async function core_ablup99(cid) {
  await ablup99(cid, 'core');
  return 0;
}

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
