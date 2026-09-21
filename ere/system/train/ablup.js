/**
 * @file 能力 ABL 的升级判定与交互（ABLUP0～ABLUP17 见 issue #464/#465，
 * ABLUP20～23 与 ABLUP30～33 见 issue #466，ABLUP37/39/40/99/100 与
 * ABL.ERB 本体见 issue #467）。
 *
 * 源: target/ERB/ABL/ABLUP0.ERB ～ ABLUP17.ERB、ABLUP20.ERB～ABLUP23.ERB、
 *     ABLUP30.ERB～ABLUP33.ERB、ABLUP37.ERB、ABLUP39.ERB、ABLUP40.ERB、
 *     ABLUP99.ERB、ABLUP100.ERB，各文件的 @ABLUPn 主流程与
 *     @DECIDE_ABLUPn 判定就地合并成单一函数——@DECIDE_ABLUPn 在各自文件内
 *     只有一个调用点（@ABLUPn 自身的 CALL），内联不改变语义。@CORE_ABLUPn
 *     （每个文件各自定义）在自己文件内没有任何调用点，是 @AUTO_ABLUP 专用
 *     的另一条独立通路；#467 起本文件同时承载 @AUTO_ABLUP／@AUTO_ABLUP_CORE
 *     与 @USERABLUP（源 target/ERB/ABL/ABL.ERB，见文件末段），并给 0-4/10
 *     与 11-17/37/39/40/99 补上 decide_ablupN／core_ablupN 供 `*` 标记与
 *     自动提升复用同一份判定。
 *
 * 调用方: ere/system/train/juel-check.js 的 @JUEL_CHECK 输入分发
 *     （:463-539）。ABLUP0～4（#464）、10～17（#465）、20～23/30～33（#466）、
 *     37/39/40/99/100（#467）均已接入分发；ABLUP5～9 不接入——Abl.yml/
 *     Abl.csv 没有能力编号 5～9 的名字条目，juel-check.js 的 ABLUP_IDS 也从未
 *     包含 5～9，说明原作没有任何菜单能选中它们；ABLUP5～9 因此保留为独立导出，
 *     不接入 juel-check.js 的分发，行为完整但从任何玩家可达路径均无法调用
 *     （与原作一致的不可达状态，1:1 保留，不是本票引入的缺陷）。
 *
 * 输出行模型的必要改写（AGENTS.md「移植需要重新实现游戏逻辑」）：Emuera
 * 的 PRINT（不换行，续写同一行）与 PRINTL/PRINTFORML/PRINTV（换行）是两种
 * 语句；本引擎的 era.print/printButton 每次调用各自独占一行（无续写同一
 * 行的等价物）。原作里若干条连续 PRINT 拼成一整行的写法，port 时收窄成一次
 * era.print(拼好的整串)。空 PRINTL（无内容，只换行）对应 era.println()。
 *
 * 输入-UI 模型的必要改写：Emuera 用 INPUT 接收任意数字，靠显式 IF 链拦截
 * 越界值或未渲染的选项（RESTART/GOTO 重来）。本项目的 printButton 输入
 * 模型只登记本轮渲染过的快捷键，era.input() 结构上不可能收到其他值
 * （issue #130，测试夹具同款校验，见 test/helpers/era-fixture.js:892-918）。
 * 故各函数仍保留原作等价的越界/隐藏选项分支，写法与既有 com-colosseum.js
 * 的同类分支一致（引擎层已经拒收代位，分支是防御性保留，不是必要判据）。
 *
 * 成功购买的提升文案，各文件原作现状不同：ABLUP0～3 原作本身已是中文
 * 「{name}变为LV{X}。」，ABLUP7 原作本身是另一句中文「{name}的等级提升到
 * {X}级了。」——这两组分别 1:1 保留各自原文，不统一措辞。ABLUP4/5/6/8/9
 * 原作这行是**未翻译的日文**「{name}のレベルが{X}になりました。」（汉化版
 * 遗留），没有对应的原作中文可以 1:1 保留；按 issue #60 译成简体时沿用
 * ABLUP0～3 已有的「变为LV{X}。」，不为这五个文件另造第三种措辞。
 * lang-table.js 未收录这个词条——这是整句译文替换，不是逐字机械转换。
 *
 * 重试路径的输出收窄，有意为之，未逐条恢复：ABLUP0～5、7～9 的原作条件不
 * 满足分支走 RESTART（跳回函数最开头，无 GOTO/标签），会连着 DRAWLINE 与
 * 开头两行说明文字一起重打；本移植的 for(;;) 循环把这段说明文字放在循环
 * 外，只执行一次，continue 时只重渲按钮行本身，不重打说明文字。ABLUP6 方向
 * 相反但同样不是本票引入的偏差：其原作 $INPUT_LOOP+GOTO 不重打任何说明
 * 文字，而 era.printButton 的注册在每次 era.input() 之后被引擎清空
 * （returnFromButton 置 rule=[]），移植后每次 continue 必须重渲染按钮
 * 行——这一方向由引擎强制，不能收窄成原作的"什么都不重打"。两个方向都只
 * 影响重试时的重复文字，不改变任何判定与数值；黄金样本与输出比对不覆盖
 * 重试路径，不会被现有回归覆盖到。
 */
/* eslint-disable no-irregular-whitespace -- ablup2/ablup3 的经验门槛行用全角空格
   对齐（原作 ABLUP2.ERB:53、ABLUP3.ERB:50 的 `EXPNAME　　{EXP}/{B}`），1:1 保留原文 */

const era = require('#/era-electron');
const { EXPLV } = require('#/era-utils/exp-level');
const { chara } = require('#/facade/chara');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
// @USERABLUP（ABL.ERB:192-200）要调的两个检查（#462 落真身，同域）
const {
  jujun_up_check,
  yokubo_up_check,
} = require('#/system/train/ability-check');
const { chara_callname } = require('#/utils/callname-utils');

/** TIMES X, m：整数乘小数后截断（math-etc.md；source-check.js 等同款） */
const times = (v, m) => Math.floor(v * m);

/** A = A * n / 100 型整数复利（区别于 TIMES：整数乘整数除，非小数乘法截断） */
const compound = (v, numerator) => Math.trunc((v * numerator) / 100);

/** MASTER 角色编号（page-usercom.js:85 同款本地约定），ABLUP12 自我训练判定用 */
const MASTER = 0;

/**
 * ABLUP0～3 共用的可否状态文案。
 * ARG=0:可、ARG&1:点数不足、ARG&2:经验不足、ARG&4:能力不足
 * 源: target/ERB/ABL/ABLUP0.ERB @GET_ABLUP_STATE :97-110
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
 * @DECIDE_ABLUP0（ABLUP0.ERB:126-234）的判定本体，也是 @ABLUP0 主流程的
 * 数值来源——原作 @ABLUP0 只有一处 `CALL DECIDE_ABLUP0`（:38），两处共用
 * 同一份梯子/加成代码，抽成一个函数是为了让 `*` 标记（page-ablup.js）与
 * @AUTO_ABLUP 的 TRYCALLFORM DECIDE_ABLUP0 用上同一真身，不是新逻辑。
 * @param {number} cid TARGET
 * @returns {{blocked: (null|'talent'|'locked'|'max'), lv: number, a: number,
 *   juel: number, i: number}} blocked 非空时其余字段无意义（原作提前 RETURN 0）
 */
function evaluate_ablup0(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  // CALC = 阴蒂以外三个部位感觉封锁数，供"其他部位封锁"折扣与上限用
  const calc =
    (talent(103) & 2 ? 1 : 0) +
    (talent(105) & 2 ? 1 : 0) +
    (talent(107) & 2 ? 1 : 0);
  const lv = era.get(`abl:${cid}:0`) || 0;

  // 入口守卫（:139-145，与 @ABLUP0 :37-52 同判据、顺序不同）
  if (lv >= 5 && talent(74) === 0) return { blocked: 'talent' };
  if (talent(101) & 2) return { blocked: 'locked' };
  if (lv >= calc * 5 + 10) return { blocked: 'max' };

  // A = 阴核点数需求（:151-186 梯子；lv 达到复利区间时逐级 ×1.25/1.20/1.15
  // 并逐步截断，不能合并成一次幂运算——TIMES/整数除法逐步语义，见文件头）
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

  // 戒备森严（:188-196）：仅 lv==4/5/>=6 三级加成，别的等级不受影响
  if (talent(27)) {
    if (lv === 4) a = times(a, 2.0);
    if (lv === 5) a = times(a, 2.5);
    if (lv >= 6) a = times(a, 3.0);
  }
  if (talent(101)) a = times(a, 1.2); // 阴蒂钝感 :198-200
  if (talent(102)) a = times(a, 0.8); // 阴蒂敏感 :202-204
  // 其他部位封锁数折扣（:206-213），三档区间各自独立的分母都是 15
  if (lv > 5 && lv <= 10 && calc > 0) {
    a = Math.trunc((a * (15 - calc)) / 15);
  } else if (lv <= 15 && calc > 1) {
    a = Math.trunc((a * (16 - calc)) / 15);
  } else if (lv <= 20 && calc > 2) {
    a = Math.trunc((a * (17 - calc)) / 15);
  }
  if (talent(76)) a = times(a, 0.8); // 淫乱 :215-217
  if (talent(74)) a = times(a, 0.8); // 自慰狂 :218-220
  if (a < 1) a = 1; // :222-224 最低 1 点

  const juel = era.get(`juel:${cid}:0`) || 0;
  let i = 0;
  if (juel < a) i |= 1; // :226-228
  return { blocked: null, lv, a, juel, i };
}

/**
 * @DECIDE_ABLUP0 的 RESULT 语义（:230-234）：I==0 返回 1（可提升），否则 0。
 * @param {number} cid TARGET
 * @returns {number} 1 / 0
 */
function decide_ablup0(cid) {
  const r = evaluate_ablup0(cid);
  return r.blocked === null && r.i === 0 ? 1 : 0;
}

/**
 * @CORE_ABLUP0（ABLUP0.ERB:114-120）：ABL:0 ++ 并在 I==0 时扣珠。
 * @param {number} cid TARGET
 * @returns {number} 0（CORE 的 RESULT 恒 0，见 :116-120 无 RETURN）
 */
function core_ablup0(cid) {
  const r = evaluate_ablup0(cid);
  chara(cid).system.阴蒂感觉 += 1; // ABL:0 ++
  if (r.blocked === null && r.i === 0) {
    era.add(`juel:${cid}:0`, -r.a); // JUEL:0 -= A（:86-88）
  }
  return 0; // CORE 无 RETURN，Emuera 视作 RESULT = 0（@AUTO_ABLUP_CORE 判 >= 0 才打印）
}

/**
 * 源: target/ERB/ABL/ABLUP0.ERB @ABLUP0 :7-92 + @DECIDE_ABLUP0 :126-234。
 * 阴蒂（TALENT:122 男人＝阴茎、TALENT:121 扶她＝阴茎(阴蒂)）感觉。
 */
async function ablup0(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  // 部位称呼：男人显示"阴茎"、扶她显示"阴茎(阴蒂)"，其余显示"阴蒂"
  const part = () =>
    talent(122) ? '阴茎' : talent(121) ? '阴茎(阴蒂)' : '阴蒂';

  era.drawLine(); // :19 DRAWLINE
  era.print(`${part()}的感度提升了。`); // :20-27
  era.print(`${part()}感觉越高，越容易在舔舐、自慰等行为得到更大的快感。`); // :28-35
  era.drawLine(); // :36 CUSTOMDRAWLINE ‥

  const blocked = evaluate_ablup0(cid).blocked;
  if (blocked === 'talent') {
    await era.printAndWait('需要特殊素质才能继续提升'); // :37-39
    return;
  }
  if (blocked === 'locked') {
    await era.printAndWait(`${part()}感觉已经被封锁了`); // :40-49
    return;
  }
  if (blocked === 'max') {
    await era.printAndWait('已达最高级'); // :50-52
    return;
  }

  for (;;) {
    const { a, juel, i } = evaluate_ablup0(cid);

    const label = talent(122) ? '阴茎' : era.get('palamname:0'); // :63-67
    era.printButton(`${label}点数×${juel}/${a} ……${get_ablup_state(i)}`, 0); // :64-69
    era.println();
    era.printButton('停止', 100); // :71

    const result = await era.input(); // :74
    if (result === 100) {
      return; // :80-81
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件'); // :77-78
      continue; // :78-79 RESTART
    } else if (result === 0) {
      core_ablup0(cid); // :84-88
      era.print(`${era.get('ablname:0')}变为LV${chara(cid).system.阴蒂感觉}。`); // :90 PRINTFORML（不等待）
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 * @DECIDE_ABLUP1（ABLUP1.ERB:86-210）的判定本体，与 @ABLUP1 主流程共用
 * （原作的唯一调用点仍是主流程，抽函数见 evaluate_ablup0 的说明）。
 * @param {number} cid TARGET
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

  // 入口守卫（:99-105）
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
 * @DECIDE_ABLUP1 的 RESULT 语义。
 * @param {number} cid TARGET
 * @returns {number} 1 / 0
 */
function decide_ablup1(cid) {
  const r = evaluate_ablup1(cid);
  return r.blocked === null && r.i === 0 ? 1 : 0;
}

/**
 * @CORE_ABLUP1：ABL:1 ++ 并在 I==0 时扣珠（ABLUP1.ERB:74-84）。
 * @param {number} cid TARGET
 * @returns {number} 0
 */
function core_ablup1(cid) {
  const r = evaluate_ablup1(cid);
  chara(cid).system.乳房感觉 += 1; // ABL:1 ++
  if (r.blocked === null && r.i === 0) era.add(`juel:${cid}:14`, -r.a);
  return 0;
}

/**
 * 源: target/ERB/ABL/ABLUP1.ERB @ABLUP1 :7-70 + @DECIDE_ABLUP1 :86-210。
 * 乳房感觉，结构与 ABLUP0 相同但没有男人/扶她的部位称呼分支。
 */
async function ablup1(cid) {
  era.drawLine(); // :18 DRAWLINE（:19-23 原作叙事文本已被注释掉，不移植）

  const blocked = evaluate_ablup1(cid).blocked;
  if (blocked === 'talent') {
    await era.printAndWait('需要特殊素质才能继续提升'); // :25-27
    return;
  }
  if (blocked === 'locked') {
    await era.printAndWait('乳房感觉已经被封锁了'); // :28-30
    return;
  }
  if (blocked === 'max') {
    await era.printAndWait('已达最高级'); // :31-33
    return;
  }

  for (;;) {
    const { a, juel, i } = evaluate_ablup1(cid);

    era.printButton(
      `${era.get('palamname:14')}点数×${juel}/${a} ……${get_ablup_state(i)}`,
      0,
    ); // :45-47
    era.println();
    era.printButton('停止', 100); // :49

    const result = await era.input(); // :52
    if (result === 100) {
      return;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件'); // :56
      continue;
    } else if (result === 0) {
      core_ablup1(cid); // :62-66
      era.print(`${era.get('ablname:1')}变为LV${chara(cid).system.乳房感觉}。`); // :68
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 * @DECIDE_ABLUP2（ABLUP2.ERB:91-237）的判定本体，与 @ABLUP2 主流程共用。
 * 男人（TALENT:122）在 DECIDE 里也是提前 RETURN 0（:102-104），与主流程
 * :18-20 的却下同判据，归入 blocked='male'。
 * @param {number} cid TARGET
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

  // A＝私处点数需求、B＝私处经验需求，梯子与复利率彼此不对称（:119-170）
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
    // 戒备森严：:173-184 用 IF/ELSEIF（非 SIF），三级互斥
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
    // 私处钝感：:186-190，A/B 加成率不同
    a = times(a, 1.2);
    b = times(b, 1.1);
  }
  // 其他部位封锁折扣（:192-202）：A 分母 15，B 分母 20，两者不对称
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
  if (juel < a) i |= 1; // :227-228
  if (exp < b) i |= 2; // :229-231
  return { blocked: null, lv, a, b, juel, exp, i };
}

/**
 * @DECIDE_ABLUP2 的 RESULT 语义。
 * @param {number} cid TARGET
 * @returns {number} 1 / 0
 */
function decide_ablup2(cid) {
  const r = evaluate_ablup2(cid);
  return r.blocked === null && r.i === 0 ? 1 : 0;
}

/**
 * @CORE_ABLUP2：ABL:2 ++ 并在 I==0 时扣点数（经验不扣，ABLUP2.ERB:79-85）。
 * @param {number} cid TARGET
 * @returns {number} 0
 */
function core_ablup2(cid) {
  const r = evaluate_ablup2(cid);
  chara(cid).system.私处感觉 += 1; // ABL:2 ++
  if (r.blocked === null && r.i === 0) era.add(`juel:${cid}:1`, -r.a); // :69-71
  return 0;
}

/**
 * 源: target/ERB/ABL/ABLUP2.ERB @ABLUP2 :8-75 + @DECIDE_ABLUP2 :91-237。
 * 私处感觉。男人（TALENT:122）完全无法访问——两处 RETURN 0 均在函数最外层，
 * 内联后只需保留一次（第二次是 @DECIDE_ABLUP2 自己的重复检查，在原作里
 * 也只有唯一调用点，且已经过外层同样的检查才会被调到，永远不会为真）。
 * 双资源：A＝私处点数（JUEL:1），B＝私处经验（EXP:0，EXPNAME:0 权威译名，
 * 源码内注释「性交经验」与名字表不一致，不作为正式称呼）。
 */
async function ablup2(cid) {
  if (evaluate_ablup2(cid).blocked === 'male') return; // 男人却下（原作在 @ABLUP2 与 @DECIDE_ABLUP2 内各查一次，逐字相同，内联后合一）

  era.drawLine(); // :22 DRAWLINE（:23-25 叙事文本已被注释掉，不移植）

  const blocked = evaluate_ablup2(cid).blocked;
  if (blocked === 'talent') {
    await era.printAndWait('需要特殊素质才能继续提升'); // :27-29
    return;
  }
  if (blocked === 'locked') {
    await era.printAndWait('私处感觉已经被封锁了'); // :30-32
    return;
  }
  if (blocked === 'max') {
    await era.printAndWait('已达最高级'); // :33-35
    return;
  }

  for (;;) {
    const { a, b, juel, exp, i } = evaluate_ablup2(cid);

    era.printButton(
      `${era.get('palamname:1')}点数×${juel}/${a} ……${get_ablup_state(i)}`,
      0,
    ); // :49-51
    era.println();
    era.print(`      ${era.get('expname:0')}　　${exp}/${b}`); // :52-53
    era.printButton('停止', 100); // :55

    const result = await era.input(); // :57
    if (result === 100) {
      return;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件'); // :61
      continue;
    } else if (result === 0) {
      core_ablup2(cid); // :67-71
      era.print(`${era.get('ablname:2')}变为LV${chara(cid).system.私处感觉}。`); // :73
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 * @DECIDE_ABLUP3（ABLUP3.ERB:89-233）的判定本体，与 @ABLUP3 主流程共用。
 * @param {number} cid TARGET
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
  if (juel < a) i |= 1; // :223-224
  if (exp < b) i |= 2; // :225-227
  return { blocked: null, lv, a, b, juel, exp, i };
}

/**
 * @DECIDE_ABLUP3 的 RESULT 语义。
 * @param {number} cid TARGET
 * @returns {number} 1 / 0
 */
function decide_ablup3(cid) {
  const r = evaluate_ablup3(cid);
  return r.blocked === null && r.i === 0 ? 1 : 0;
}

/**
 * @CORE_ABLUP3：ABL:3 ++ 并在 I==0 时扣点数（ABLUP3.ERB:77-87）。
 * @param {number} cid TARGET
 * @returns {number} 0
 */
function core_ablup3(cid) {
  const r = evaluate_ablup3(cid);
  chara(cid).system.肛门感觉 += 1; // ABL:3 ++
  if (r.blocked === null && r.i === 0) era.add(`juel:${cid}:2`, -r.a); // :67-69
  return 0;
}

/**
 * 源: target/ERB/ABL/ABLUP3.ERB @ABLUP3 :7-73 + @DECIDE_ABLUP3 :89-233。
 * 肛门感觉，结构与 ABLUP2 相同（双资源 A/B），无男人限制。
 * B＝肛门经验（EXP:1）。
 */
async function ablup3(cid) {
  era.drawLine(); // :18 DRAWLINE（:19-20 叙事文本已被注释掉，不移植）

  const blocked = evaluate_ablup3(cid).blocked;
  if (blocked === 'talent') {
    await era.printAndWait('需要特殊素质才能继续提升'); // :25-27
    return;
  }
  if (blocked === 'locked') {
    await era.printAndWait('肛门感觉已经被封锁了'); // :28-30
    return;
  }
  if (blocked === 'max') {
    await era.printAndWait('已达最高级'); // :31-33
    return;
  }

  for (;;) {
    const { a, b, juel, exp, i } = evaluate_ablup3(cid);

    era.printButton(
      `${era.get('palamname:2')}点数×${juel}/${a} ……${get_ablup_state(i)}`,
      0,
    ); // :47-48
    era.println();
    era.print(`      ${era.get('expname:1')}　　${exp}/${b}`); // :50
    era.printButton('停止', 100); // :52

    const result = await era.input(); // :55
    if (result === 100) {
      return;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件'); // :59
      continue;
    } else if (result === 0) {
      core_ablup3(cid); // :65-69
      era.print(`${era.get('ablname:3')}变为LV${chara(cid).system.肛门感觉}。`); // :71
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 * @DECIDE_ABLUP4（ABLUP4.ERB:50-83）的判定本体：梯子只有 5 级、无复利区间。
 * 原作这里**不把 A 清零**（:50-53 只清 I），A 是文件级全局——ABL.ERB:94
 * 的 `CALL DECIDE_ABLUP4` 会读到上一行 DECIDE 留下的 A；到了 lv>=5（梯子
 * 五档全落空）A 保持旧值，`JUEL < A` 就成了对残留值的比较，`*` 标记
 * 因此不确定。移植没有 Emuera 的全局 A，本函数按「A 初始为 0」处理：
 * lv>=5 时 I 恒 0（与原作 A 恰好为 0 时一致），这条不可移植的残留依赖
 * 登记在 issue #14，不额外模拟。
 * @param {number} cid TARGET
 * @returns {{blocked: (null|'max'), lv: number, a: number, juel: number, i: number}}
 */
function evaluate_ablup4(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const lv = era.get(`abl:${cid}:4`) || 0;
  if (lv >= 5) return { blocked: 'max' };

  // A：0→1、1→50、2→600、3→7000(戒备森严×2.00)、4→45000(戒备森严×3.00)
  let a = [1, 50, 600, 7000, 45000][lv];
  if (lv === 3 && talent(27)) a = times(a, 2.0); // :64-66
  if (lv === 4 && talent(27)) a = times(a, 3.0); // :70-72

  const juel = era.get(`juel:${cid}:15`) || 0;
  let i = 0;
  if (juel < a) i |= 1; // :76-77
  return { blocked: null, lv, a, juel, i };
}

/**
 * @DECIDE_ABLUP4 的 RESULT 语义。注意原作没有 ABL:4 >= 5 的提前 RETURN 0
 * （见 evaluate_ablup4 的说明）——满级行的 `*` 标记在原作取决于调用前残留
 * 的 A。移植的做法是：`evaluate_ablup4` 对 lv>=5 返回 blocked='max'
 * （A 视为 0、I 视为 0），`decide_ablup4` 因 blocked 非空而恒返回 0——
 * **满级行一律不打 `*`**。这与「原作 A 恰好残留为 0 时 I=0 → RETURN 1
 * （会打标记）」不同，是有意取「满级不打标记」的更稳一侧；该偏离与
 * evaluate_ablup4 的说明一并登记在 issue #14。
 * @param {number} cid TARGET
 * @returns {number} 1 / 0
 */
function decide_ablup4(cid) {
  const r = evaluate_ablup4(cid);
  return r.blocked === null && r.i === 0 ? 1 : 0;
}

/**
 * 源: target/ERB/ABL/ABLUP4.ERB @ABLUP4 :1-48 + @DECIDE_ABLUP4 :50-83。
 * 局部感觉，无 GET_ABLUP_STATE、无部位封锁机制，梯子只有 5 级、无复利区间。
 * I&2（经验不足）在 @DECIDE_ABLUP4 内永远不会被置位（只有 :76-77 的
 * I|=1），手写状态文案的 `I & 2` 分支在原作与本移植里都是死码——按 1:1
 * 原样保留分支结构，不特别处理（与 CORE_ABLUPn 的整支缺调用点不同，这里
 * 只是单个条件永假，不必也不应删除对应代码）。
 * 原作无 @CORE_ABLUP4（AUTO_ABLUP 的 REPEAT 40 跳过 4），故只有 DECIDE。
 */
async function ablup4(cid) {
  era.drawLine(); // :3 DRAWLINE
  if (evaluate_ablup4(cid).blocked === 'max') {
    await era.printAndWait('已达到MAX。'); // :4-6
    return;
  }

  for (;;) {
    const { a, i } = evaluate_ablup4(cid);

    // 无 GET_ABLUP_STATE：手写状态文案，"点数不足 " 带尾随空格、"经验不足"
    // 不带（:16-23，与 GET_ABLUP_STATE 的两个 bit 都带尾随空格不同）；
    // I&2 分支（:21-22）在原作与本移植里都恒假，1:1 保留
    let status;
    if (i === 0) {
      status = 'ＯＫ';
    } else {
      status = '';
      if (i & 1) status += '点数不足 ';
      if (i & 2) status += '经验不足';
    }
    era.printButton(`${era.get('palamname:15')}点数×${a}……${status}`, 0); // :11-24（无 JUEL 现值，只显示需求 A，与 ABLUP0-3 不同）
    era.println();
    era.printButton('放弃', 100); // :26

    const result = await era.input(); // :29
    if (result === 100) {
      return;
    } else if (result === 0 && i !== 0) {
      era.print('条件不足。'); // :33
      continue;
    } else if (result === 0) {
      const new_lv = era.add(`abl:${cid}:4`, 1); // :39
      era.add(`juel:${cid}:15`, -a); // :41-43
      await era.printAndWait(`${era.get('ablname:4')}变为LV${new_lv}。`); // :45-48 PRINTW（等待）
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 * 源: target/ERB/ABL/ABLUP5.ERB @ABLUP5 :1-96（无独立 DECIDE 子程序，判定
 * 与交互都在同一段里）。私处点数（JUEL:2）+ 肛门经验门槛（EXP:1）。
 * EXPLV 覆盖顺序固定：先按等级取梯子价，再用 EXPLV 阈值覆盖 A（仅 A、不
 * 覆盖 B），最后戒备森严对 A、B 同时加成——三步顺序不可互换。
 *
 * ABLNAME:5～9 在 Abl.yml/Abl.csv 里没有条目（本文件头「调用方」一节的
 * 依据），era.get 读到 undefined；成功文案的名称前缀因此原样留空，不是
 * 缺陷——与原作在 ABLUP5～9 上的实际显示一致，`|| ''` 只是避免模板字符串
 * 把 undefined 拼成字面文字。
 */
async function ablup5(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl5 = () => era.get(`abl:${cid}:5`) || 0;

  era.drawLine(); // :3 DRAWLINE
  if (abl5() >= 5) {
    await era.printAndWait('已达到MAX。'); // :4-6
    return;
  }

  for (;;) {
    const lv = abl5();
    const exp1 = era.get(`exp:${cid}:1`) || 0;
    // A＝私处点数需求、B＝肛门经验门槛（:12-45）
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
    if (juel2 < a) i |= 1; // :47-49
    if (exp1 < b) i |= 2; // :51-52

    let status;
    if (i === 0) {
      status = 'ＯＫ';
    } else {
      status = '';
      if (i & 1) status += '点数不足 ';
      if (i & 2) status += '经验不足';
    }
    era.printButton(
      `${era.get('palamname:2')}点数×${a}、${era.get('expname:1')}${b}以上……${status}`, // :54-70（无 JUEL 现值，只显示需求 A）
      0,
    );
    era.println();
    era.printButton('放弃', 100); // :73

    const result = await era.input(); // :76
    if (result === 100) {
      return;
    } else if (result === 0 && i !== 0) {
      era.print('条件不足。'); // :80
      continue;
    } else if (result === 0) {
      const new_lv = era.add(`abl:${cid}:5`, 1); // :86
      era.add(`juel:${cid}:2`, -a); // :88-90
      await era.printAndWait(`${era.get('ablname:5') || ''}变为LV${new_lv}。`); // :92-95 PRINTW
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 * 源: target/ERB/ABL/ABLUP6.ERB @ABLUP6 :3-242（无独立 DECIDE 子程序）。
 * 三个购买选项共用「顺从」等级门槛与异常经验门槛，各自还有专属经验门槛：
 *   [0] A＝屈服点数(JUEL:6)，还需绝顶经验(EXP:2)与精液经验(EXP:20)双达标
 *       （都用同一门槛 E，两次 SIF 是同一个 bit，属于同义重复的 OR）
 *   [1] B＝恭顺点数(JUEL:4)，需奉仕快乐经验(EXP:21) ≥ D，仅 B>0 时渲染
 *   [2] C＝习得点数(JUEL:7)，需绝顶经验(EXP:2) ≥ 1（写死的 1，不是变量），
 *       仅 C>0 时渲染——原作可否检查读 JUEL:7<A（应为 <C）：C 只在 lv==0
 *       渲染，且 lv==0 时 A、C 起始值相同（100）、TALENT:80 的截断加成对
 *       两者一视同仁，因此 A 恒等于 C，这处误用不可能造成偏差（issue #14
 *       登记，原样保留、不改成 <C）。
 */
async function ablup6(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl6 = () => era.get(`abl:${cid}:6`) || 0;

  era.drawLine(); // :4 DRAWLINE
  if (abl6() >= 5) {
    await era.printAndWait('已达到MAX。'); // :5-7
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
    // A/B/C/D/E：:15-56 梯子（C 只在 lv==0 非零，D/E 是经验门槛非点数）
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
      // 倒错的：:59-65，仅 A/B/C/D，不含 E
      a = times(a, 0.75);
      b = times(b, 0.75);
      c = times(c, 0.75);
      d = times(d, 0.75);
    }

    // 门槛读 ABL:0（阴蒂感觉），需达到本次升级后等级+1，三个选项共享
    // （:67-76）。原作注释写"従順が奉仕精神+1レベル"（应指顺从 ABL:10 或
    // 侍奉精神 ABL:16），代码却读 ABL:0——注释与代码不一致，以代码为准，
    // 1:1 保留，issue #14 登记为文档性存疑，不改动行为
    let i = 0,
      j = 0,
      k = 0;
    const gate_needed = lv + 1;
    const gate_line = `${era.get('ablname:0')}${gate_needed}LV以上`; // :68-70
    if ((era.get(`abl:${cid}:0`) || 0) < gate_needed) {
      i |= 4;
      j |= 4;
      k |= 4;
    }

    // 3→4、4→5 需异常经验，[妄信] 可跳过（:78-97）
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
    if (juel6 < a) i |= 1; // :100-101
    if (exp2 < e) i |= 2; // :102-104 绝顶经验
    if (exp20 < e) i |= 2; // :105-107 精液经验（同一个 bit）

    era.print(gate_line);
    if (anomaly_line) era.print(anomaly_line);

    let option0 = `${era.get('palamname:6')}点数×${a}`; // :109-112
    if (e > 0) {
      option0 += `、${era.get('expname:2')}${e}以上、${era.get('expname:20')}${e}以上`; // :113-122
    }
    option0 += `……${status_text(i)}`; // :123-134
    era.printButton(option0, 0);
    era.println();

    const juel4 = era.get(`juel:${cid}:4`) || 0;
    const exp21 = era.get(`exp:${cid}:21`) || 0;
    if (b > 0) {
      if (juel4 < b) j |= 1; // :139-140
      if (exp21 < d) j |= 2; // :141-143

      let option1 = `${era.get('palamname:4')}点数×${b}`; // :145-148
      if (d > 0) option1 += `、${era.get('expname:21')}${d}以上`; // :149-154
      option1 += `……${status_text(j)}`; // :155-166
      era.printButton(option1, 1);
      era.println();
    } else {
      j = 256; // :168-170 本档没有恭顺选项，[1] 不渲染
    }

    const juel7 = era.get(`juel:${cid}:7`) || 0;
    if (c > 0) {
      if (juel7 < a) k |= 1; // :174-175（原作误用 A，见文件头注释；1:1 保留）
      if (exp2 < 1) k |= 2; // :176-178 绝顶经验≥1，写死的 1

      const option2 = `${era.get('palamname:7')}点数×${c}、${era.get('expname:2')}1以上……${status_text(k)}`; // :180-199
      era.printButton(option2, 2);
      era.println();
    } else {
      k = 256; // :201-203 本档没有习得选项，[2] 不渲染
    }

    era.printButton('放弃', 100); // :205

    const result = await era.input(); // :208
    if (result === 100) {
      return; // :224-225
    } else if (result === 0 && i !== 0) {
      era.print('条件不足。请重新输入。'); // :211-212
      continue;
    } else if (result === 1 && j !== 0) {
      // :214-218（j===256 的隐藏选项不会被 era.input() 传回，见文件头）
      era.print('条件不足。请重新输入。');
      continue;
    } else if (result === 2 && k !== 0) {
      // :219-223（同上，k===256 同理不会发生）
      era.print('条件不足。请重新输入。');
      continue;
    } else if (result === 0) {
      const new_lv = era.add(`abl:${cid}:6`, 1); // :228
      era.add(`juel:${cid}:6`, -a); // :230-231
      await era.printAndWait(`${era.get('ablname:6') || ''}变为LV${new_lv}。`); // :238-241 PRINTW
      return;
    } else if (result === 1) {
      const new_lv = era.add(`abl:${cid}:6`, 1);
      era.add(`juel:${cid}:4`, -b); // :232-233
      await era.printAndWait(`${era.get('ablname:6') || ''}变为LV${new_lv}。`);
      return;
    } else if (result === 2) {
      const new_lv = era.add(`abl:${cid}:6`, 1);
      era.add(`juel:${cid}:7`, -c); // :234-235
      await era.printAndWait(`${era.get('ablname:6') || ''}变为LV${new_lv}。`);
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 * 源: target/ERB/ABL/ABLUP7.ERB @ABLUP7 :2-134。单选项，耻情点数(JUEL:8)。
 * 折扣缺陷：:32-40 两段 IF TALENT:80 先后生效（×0.75 再 ×0.50，合计
 * ×0.375）——第二段注释写"目立ちたがり"（对应 TALENT:28）却仍判定
 * TALENT:80，TALENT:28 应有的折扣从未触发；后段 :52/:59 的异常经验豁免
 * 正确判定 TALENT:28，缺陷只出现在这两段折扣本身（issue #14 登记，原样
 * 保留）。另有与升级门槛无关、始终生效的第二条经验门槛（:71-79）：
 * lv<2 要求绝顶经验(EXP:2)≥1，否则要求调教自慰经验(EXP:11)≥1。
 */
async function ablup7(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl7 = () => era.get(`abl:${cid}:7`) || 0;

  era.drawLine(); // :3 DRAWLINE
  if (abl7() >= 5) {
    await era.printAndWait('已达到MAX。'); // :4-6
    return;
  }

  for (;;) {
    const lv = abl7();
    let a = [100, 1000, 5000, 15000, 35000][lv]; // :14-30
    if (lv === 3 && talent(27)) a = times(a, 2.0);
    if (lv === 4 && talent(27)) a = times(a, 3.0);
    if (talent(80)) a = times(a, 0.75); // :32-35 倒错的
    if (talent(80)) a = times(a, 0.5); // :37-40 缺陷：应判 TALENT:28，1:1 保留

    let i = 0;
    // 门槛读 ABL:1（乳房感觉），原作注释写"欲望が露出癖+1レベル"（应指欲望
    // ABL:11 或露出癖 ABL:17），代码却读 ABL:1——与 ABLUP6 同样的注释/代码
    // 不一致，以代码为准，1:1 保留，issue #14 登记
    const gate_needed = lv + 1;
    const gate_line = `${era.get('ablname:1')}${gate_needed}LV以上`; // :43-45
    if ((era.get(`abl:${cid}:1`) || 0) < gate_needed) i |= 4; // :46-49

    let anomaly_line = '';
    if (lv === 3 && talent(28) === 0) {
      anomaly_line = `${era.get('expname:50')}有`; // :52-54
      if ((era.get(`exp:${cid}:50`) || 0) === 0) i |= 2; // :55-58
    } else if (lv === 4 && talent(28) === 0) {
      anomaly_line = `${era.get('expname:50')}2以上`; // :59-61
      if ((era.get(`exp:${cid}:50`) || 0) < 2) i |= 2; // :62-65
    }

    const juel8 = era.get(`juel:${cid}:8`) || 0;
    if (juel8 < a) i |= 1; // :68-70

    // 始终生效的第二条经验门槛，与上面 TALENT:28 那条互相独立（:71-79）
    let exp_line;
    if (lv < 2) {
      exp_line = `${era.get('expname:2')}1以上`; // :85-89
      if ((era.get(`exp:${cid}:2`) || 0) === 0) i |= 2; // :72-74
    } else {
      exp_line = `${era.get('expname:11')}1以上`; // :90-94
      if ((era.get(`exp:${cid}:11`) || 0) === 0) i |= 2; // :76-78
    }

    era.print(gate_line);
    if (anomaly_line) era.print(anomaly_line);

    // 本文件的可否文案与共用 get_ablup_state 仅差在 bit4：本文件三个分支都带
    // 尾随空格（ABLUP7.ERB:102-106），get_ablup_state 的 bit4 没有，不能复用
    let status = '';
    if (i === 0) {
      status = 'ＯＫ';
    } else {
      if (i & 1) status += '点数不足 ';
      if (i & 2) status += '经验不足 ';
      if (i & 4) status += '能力不足 ';
    }
    era.printButton(
      `${era.get('palamname:8')}点数×${a}、${exp_line}……${status}`, // :81-107
      0,
    );
    era.println();
    era.printButton('放弃', 100); // :111

    const result = await era.input(); // :114
    if (result === 100) {
      return;
    } else if (result === 0 && i !== 0) {
      era.print('条件不满足。'); // :118
      continue;
    } else if (result === 0) {
      const new_lv = era.add(`abl:${cid}:7`, 1); // :124
      era.add(`juel:${cid}:8`, -a); // :126-128
      await era.printAndWait(
        `${era.get('ablname:7') || ''}的等级提升到${new_lv}级了。`,
      ); // :130-133 PRINTW
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 * 源: target/ERB/ABL/ABLUP8.ERB @ABLUP8 :2-225。两个购买选项：
 *   [0] A(苦痛 JUEL:9)+B(欲情 JUEL:5)，需苦痛快乐经验(EXP:30)≥C，仅 B>0
 *       渲染。原作没有 ELSE 哨兵（对照 [1] 的 ELSE J=256）：自由输入模型
 *       下，lv 3/4（B==0）时敲 0 会跳过整个 [0] 判定块，若「欲望」与异常
 *       经验两条共享门槛都已满足，[0] 免费直接过（issue #14 登记的原作
 *       缺陷）。本移植的按钮 UI 只在 B>0 时才渲染 [0]，era.input() 结构
 *       上收不到未渲染的 0（issue #130），缺陷不需要额外代码就已关闭。
 *   [1] D(苦痛 JUEL:9)+E(屈服 JUEL:6)，需苦痛快乐经验(EXP:30)≥C 且绝顶
 *       经验(EXP:2)≥1，D 在全部 5 档梯子里都不为 0，ELSE D=256 哨兵永远
 *       不会触发（有寫但从未生效，与 [0] 缺失哨兵是两种不同状态）。
 */
async function ablup8(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl8 = () => era.get(`abl:${cid}:8`) || 0;

  era.drawLine(); // :3 DRAWLINE
  if (abl8() >= 5) {
    await era.printAndWait('已达到MAX。'); // :4-6
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
    // A/B/C/D/E：:13-55（A/B 只在 lv 0-2 非零，C 只在 lv 3-4 非零）
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
      // 开放：:57-64，先于倒错的，五个变量都受影响
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
      d = times(d, 0.5);
      e = times(e, 0.5);
    }
    if (talent(80)) {
      // 倒错的：:66-73，五个变量都受影响
      a = times(a, 0.75);
      b = times(b, 0.75);
      c = times(c, 0.75);
      d = times(d, 0.75);
      e = times(e, 0.75);
    }

    let i = 0,
      j = 0;
    // 门槛读 ABL:1（乳房感觉），原作注释写"欲望がマゾっ気+1レベル"（应指
    // 欲望 ABL:11 或受虐狂 TALENT:88），代码却读 ABL:1——与 ABLUP6/7 同样
    // 的注释/代码不一致，以代码为准，1:1 保留，issue #14 登记
    const gate_needed = lv + 1;
    const gate_line = `${era.get('ablname:1')}${gate_needed}LV以上`; // :76-78
    if ((era.get(`abl:${cid}:1`) || 0) < gate_needed) {
      i |= 4;
      j |= 4;
    }

    let anomaly_line = '';
    if (lv === 3 && talent(33) === 0) {
      anomaly_line = `${era.get('expname:50')}有`; // :87-88
      if ((era.get(`exp:${cid}:50`) || 0) === 0) {
        i |= 2;
        j |= 2;
      }
    } else if (lv === 4 && talent(33) === 0) {
      anomaly_line = `${era.get('expname:50')}2以上`; // :95-96
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
      if (juel9 < a) i |= 1; // :106-107
      if (juel5 < b) i |= 1; // :108-110
      if (exp30 < c) i |= 2; // :111-113（b>0 时 c 恒为 0，此判定恒假，1:1 保留）

      let option0 = `${era.get('palamname:9')}点数×${a}、${era.get('palamname:5')}点数×${b}`; // :115-122
      if (c > 0) option0 += `、${era.get('expname:30')}${c}以上`; // :123-128
      option0 += `……${status_text(i)}`; // :129-140
      era.printButton(option0, 0);
      era.println();
    }
    // b===0 时 [0] 不渲染，原作对应位置没有 ELSE 哨兵（见文件头缺陷说明）

    const exp2 = era.get(`exp:${cid}:2`) || 0;
    const juel6 = era.get(`juel:${cid}:6`) || 0;
    if (d > 0) {
      if (juel9 < d) j |= 1; // :146-147
      if (juel6 < e) j |= 1; // :148-150
      if (exp30 < c) j |= 2; // :151-153
      if (exp2 < 1) j |= 2; // :154-156

      let option1 = `${era.get('palamname:9')}点数×${d}、${era.get('palamname:6')}点数×${e}`; // :158-165
      if (c > 0) option1 += `、${era.get('expname:30')}${c}以上`; // :166-171
      option1 += `、${era.get('expname:2')}1以上……${status_text(j)}`; // :172-187
      era.printButton(option1, 1);
      era.println();
    } else {
      j = 256; // :189-191
    }

    era.printButton('放弃', 100); // :193

    const result = await era.input(); // :196
    if (result === 100) {
      return;
    } else if (result === 0 && i !== 0) {
      era.print('条件不足。'); // :199-200
      continue;
    } else if (result === 1 && j !== 0) {
      // j===256 的隐藏选项不会被 era.input() 传回，见文件头（issue #130）
      era.print('条件不足。'); // :204-205
      continue;
    } else if (result === 0) {
      const new_lv = era.add(`abl:${cid}:8`, 1); // :211
      era.add(`juel:${cid}:9`, -a); // :213-215
      era.add(`juel:${cid}:5`, -b);
      await era.printAndWait(`${era.get('ablname:8') || ''}变为LV${new_lv}。`); // :221-224 PRINTW
      return;
    } else if (result === 1) {
      const new_lv = era.add(`abl:${cid}:8`, 1);
      era.add(`juel:${cid}:9`, -d); // :216-218
      era.add(`juel:${cid}:6`, -e);
      await era.printAndWait(`${era.get('ablname:8') || ''}变为LV${new_lv}。`);
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 * 源: target/ERB/ABL/ABLUP9.ERB @ABLUP9 :2-189。两个购买选项：
 *   [0] A(欲情 JUEL:5)+C(屈服 JUEL:6)，需百合经验(EXP:40)≥B，始终渲染
 *       （无 IF 门槛，与 [1] 不同）
 *   [1] D(阴核 JUEL:0)，同样需百合经验≥B，仅 D>0（lv 0-1）渲染，
 *       ELSE J=256 哨兵齐全，没有缺陷
 * 折扣顺序：双性恋(TALENT:81，×0.25) 先于 倒错的(TALENT:80，×0.75)。
 */
async function ablup9(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl9 = () => era.get(`abl:${cid}:9`) || 0;

  era.drawLine(); // :3 DRAWLINE
  if (abl9() >= 5) {
    await era.printAndWait('已达到MAX。'); // :4-6
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
    // A/B/C/D：:13-50（C 只在 lv 2-4 非零，D 只在 lv 0-1 非零）
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
      // 双性恋：:52-58，先于倒错的
      a = times(a, 0.25);
      b = times(b, 0.25);
      c = times(c, 0.25);
      d = times(d, 0.25);
    }
    if (talent(80)) {
      // 倒错的：:60-66
      a = times(a, 0.75);
      b = times(b, 0.75);
      c = times(c, 0.75);
      d = times(d, 0.75);
    }

    let i = 0,
      j = 0;
    let anomaly_line = '';
    if (lv === 3 && talent(81) === 0) {
      anomaly_line = `${era.get('expname:50')}有`; // :70-71
      if ((era.get(`exp:${cid}:50`) || 0) === 0) {
        i |= 2;
        j |= 2;
      }
    } else if (lv === 4 && talent(81) === 0) {
      anomaly_line = `${era.get('expname:50')}2以上`; // :78-79
      if ((era.get(`exp:${cid}:50`) || 0) < 2) {
        i |= 2;
        j |= 2;
      }
    }
    if (anomaly_line) era.print(anomaly_line);

    const juel5 = era.get(`juel:${cid}:5`) || 0;
    const juel6 = era.get(`juel:${cid}:6`) || 0;
    const exp40 = era.get(`exp:${cid}:40`) || 0;
    if (juel5 < a) i |= 1; // :87-89
    if (juel6 < c) i |= 1; // :90-92
    if (exp40 < b) i |= 2; // :93-95

    let option0 = `${era.get('palamname:5')}点数×${a}`; // :97-100
    if (c > 0) option0 += `、${era.get('palamname:6')}点数×${c}`; // :101-106
    option0 += `、${era.get('expname:40')}${b}以上……${status_text(i)}`; // :107-123
    era.printButton(option0, 0);
    era.println();

    const juel0 = era.get(`juel:${cid}:0`) || 0;
    if (d > 0) {
      if (juel0 < d) j |= 1; // :127-128
      if (exp40 < b) j |= 2; // :129-131

      const option1 = `${era.get('palamname:0')}点数×${d}、${era.get('expname:40')}${b}以上……${status_text(j)}`; // :133-153
      era.printButton(option1, 1);
      era.println();
    } else {
      j = 256; // :154-156
    }

    era.printButton('放弃', 100); // :158

    const result = await era.input(); // :161
    if (result === 100) {
      return;
    } else if (result === 0 && i !== 0) {
      era.print('条件不足。'); // :164-165
      continue;
    } else if (result === 1 && j !== 0) {
      // j===256 的隐藏选项不会被 era.input() 传回，见文件头（issue #130）
      era.print('条件不足。'); // :169-170
      continue;
    } else if (result === 0) {
      const new_lv = era.add(`abl:${cid}:9`, 1); // :176
      era.add(`juel:${cid}:5`, -a); // :178-180
      era.add(`juel:${cid}:6`, -c);
      await era.printAndWait(`${era.get('ablname:9') || ''}变为LV${new_lv}。`); // :185-188 PRINTW
      return;
    } else if (result === 1) {
      const new_lv = era.add(`abl:${cid}:9`, 1);
      era.add(`juel:${cid}:0`, -d); // :181-182
      await era.printAndWait(`${era.get('ablname:9') || ''}变为LV${new_lv}。`);
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 * @DECIDE_ABLUP10（ABLUP10.ERB:137-342）的判定本体，与 @ABLUP10 主流程共用。
 * 四条轨道 A(恐怖 JUEL:10)/B(恭顺 JUEL:4)/C(欲情 JUEL:5)/D(屈服 JUEL:6)，
 * I/J/K/L 四个独立可否位；K/L（I 见文件头）在对应等级为 0 时置 256（自动
 * 不可，对应选项不渲染）。
 * @param {number} cid TARGET
 * @returns {{blocked: (null|'talent'|'max'), lv: number, a: number, b: number,
 *   c: number, d: number, e: number, i: number, j: number, k: number, l: number,
 *   juel10: number, juel4: number, juel5: number, juel6: number, exp50: number}}
 */
function evaluate_ablup10(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const lv = era.get(`abl:${cid}:10`) || 0;

  if (lv >= 5 && talent(85) === 0 && talent(86) === 0) {
    return { blocked: 'talent' }; // :15-17 爱慕/盲从解锁
  }
  if (lv >= 10) return { blocked: 'max' }; // :18-20

  // A/B/C/D：:156-206 梯子
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

  // 异常经验：lv4→5 需 1 次、lv7→8 需 2 次，六项素质任一命中可免（:208-216）
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
    // 胆怯 :218-223
    a = times(a, 0.5);
    b = times(b, 0.9);
    d = times(d, 0.9);
  }
  if (talent(11)) {
    // 反抗心 :224-230
    a = times(a, 2.0);
    b = times(b, 1.5);
    c = times(c, 1.2);
    d = times(d, 1.5);
  }
  if (talent(12)) {
    // 刚强 :231-237
    a = times(a, 3.0);
    b = times(b, 1.5);
    c = times(c, 1.2);
    d = times(d, 1.5);
  }
  if (talent(13)) {
    // 坦率 :238-242
    b = times(b, 0.8);
    d = times(d, 0.9);
  }
  if (talent(16)) {
    // 嚣张 :243-248
    a = times(a, 1.2);
    b = times(b, 1.5);
    d = times(d, 1.2);
  }
  if (talent(15)) {
    // 高姿态 :249-253
    a = times(a, 1.2);
    b = times(b, 1.5);
    d = times(d, 2.0);
  } else if (talent(17)) {
    // 低姿态 :254-258
    b = times(b, 0.8);
    d = times(d, 0.8);
  }
  if (talent(32)) {
    // 压抑 :260-266
    a = times(a, 1.2);
    b = times(b, 1.2);
    c = times(c, 2.0);
    d = times(d, 1.2);
  } else if (talent(33)) {
    // 开放 :266-269
    c = times(c, 0.5);
  }
  if (talent(34)) {
    // 抵抗 :270-276
    a = times(a, 1.5);
    b = times(b, 1.5);
    c = times(c, 2.0);
    d = times(d, 2.0);
  }
  if (talent(76)) c = times(c, 0.5); // 淫乱 :278-280
  if (talent(85)) b = times(b, 0.75); // 爱慕 :281-283
  if (talent(86)) b = times(b, 0.2); // 盲从 :284-286
  if (talent(84)) {
    // 嫉妒 :288-293
    b = times(b, 5.0);
    c = times(c, 0.8);
    d = times(d, 2.0);
  }

  if (b < 1) b = 1; // :295-297（唯一设底的轨道）

  const juel10 = era.get(`juel:${cid}:10`) || 0;
  const juel4 = era.get(`juel:${cid}:4`) || 0;
  const juel5 = era.get(`juel:${cid}:5`) || 0;
  const juel6 = era.get(`juel:${cid}:6`) || 0;
  let i = 0,
    j = 0,
    k = 0,
    l = 0;
  if (a > 0) {
    if (juel10 < a) i |= 1; // :300-306
  } else {
    i = 256;
  }
  if (juel4 < b) j |= 1; // :308-310（B 恒 >0，无哨兵）
  if (c > 0) {
    if (juel5 < c) k |= 1; // :312-319
  } else {
    k = 256;
  }
  if (d > 0) {
    if (juel6 < d) l |= 1; // :321-328
  } else {
    l = 256;
  }
  const exp50 = era.get(`exp:${cid}:50`) || 0;
  if (e > exp50) {
    // :330-336
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
 * @DECIDE_ABLUP10 的 RESULT 语义（:338-342）：**任一**轨道可提升即 1
 * （`I == 0 || J == 0 || K == 0 || L == 0`）。256 哨兵不等于 0，满级/隐藏
 * 选项不会凭哨兵混进「可提升」。
 * @param {number} cid TARGET
 * @returns {number} 1 / 0
 */
function decide_ablup10(cid) {
  const r = evaluate_ablup10(cid);
  if (r.blocked !== null) return 0;
  return r.i === 0 || r.j === 0 || r.k === 0 || r.l === 0 ? 1 : 0;
}

/**
 * @CORE_ABLUP10（ABLUP10.ERB:119-131）：ABL:10 ++ 后按 I→J→K→L 的优先级
 * 扣**第一条**可用轨道的珠（也只会扣这一条）。
 * @param {number} cid TARGET
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

/**
 * 源: target/ERB/ABL/ABLUP10.ERB @ABLUP10 :8-115 + @DECIDE_ABLUP10 :137-342。
 * 顺从，system 域（写 chara(cid).system.顺从）。四条轨道：A(恐怖
 * JUEL:10)/B(恭顺 JUEL:4，恒 >0 不设 256 哨兵)/C(欲情 JUEL:5)/D(屈服
 * JUEL:6)，I/J/K/L 四个独立可否位；K/L 在对应等级为 0 时置 256（自动不可，
 * 对应选项不渲染，era.input() 结构上收不到该值，issue #130）。I 没有对称
 * 的 256 专用分支（源码 :81-96，K/L 各有但 I 没有），与 K/L 不对称，但因
 * 选项本就不渲染而同样不可达，1:1 保留不补齐。
 */
async function ablup10(cid) {
  era.drawLine(); // :9 DRAWLINE

  const blocked = evaluate_ablup10(cid).blocked;
  if (blocked === 'talent') {
    await era.printAndWait('需要特殊素质才能继续提升'); // :15-17
    return;
  }
  if (blocked === 'max') {
    await era.printAndWait('已达最高级'); // :18-20
    return;
  }

  for (;;) {
    const { a, b, c, d, e, i, j, k, l, juel10, juel4, juel5, juel6, exp50 } =
      evaluate_ablup10(cid);

    if (e > 0) {
      era.print(`${era.get('expname:50')}${e}以上(现在${exp50})且`); // :47-48
    }
    if (a > 0) {
      era.printButton(
        `${era.get('palamname:10')}点数×${juel10}/${a} ……${get_ablup_state(i)}`,
        0,
      ); // :50-54
      era.println();
    }
    era.printButton(
      `${era.get('palamname:4')}点数×${juel4}/${b} ……${get_ablup_state(j)}`,
      1,
    ); // :57-60（恒渲染，无 IF 包裹）
    era.println();
    if (c > 0) {
      era.printButton(
        `${era.get('palamname:5')}点数×${juel5}/${c} ……${get_ablup_state(k)}`,
        2,
      ); // :62-66
      era.println();
    }
    if (d > 0) {
      era.printButton(
        `${era.get('palamname:6')}点数×${juel6}/${d} ……${get_ablup_state(l)}`,
        3,
      ); // :69-73
      era.println();
    }
    era.printButton('停止', 100); // :76

    const result = await era.input(); // :78
    if (result === 100) {
      return;
    } else if (result === 0 && i !== 0) {
      // i===256（a===0）与 i&1/i&2 走同一分支，源码未对 I 设专门的静默
      // 256 分支（与 K/L 不对称，见文件头），两者在 era.input() 层面
      // 同样不可达（issue #130）
      era.print('未满足条件'); // :81-82
      continue;
    } else if (result === 1 && j !== 0) {
      era.print('未满足条件'); // :84-85
      continue;
    } else if (result === 2 && k === 256) {
      continue; // :87-88 c===0 时隐藏选项，引擎层拒收代位（issue #130）
    } else if (result === 2 && k !== 0) {
      era.print('未满足条件'); // :89-90
      continue;
    } else if (result === 3 && l === 256) {
      continue; // :92-93 d===0 时隐藏选项（issue #130）
    } else if (result === 3 && l !== 0) {
      era.print('未满足条件'); // :94-95
      continue;
    } else if (result === 0) {
      const new_lv = (chara(cid).system.顺从 += 1); // :101
      era.add(`juel:${cid}:10`, -a); // :103-104
      era.print(`${era.get('ablname:10')}变为LV${new_lv}。`); // :113
      return;
    } else if (result === 1) {
      const new_lv = (chara(cid).system.顺从 += 1);
      era.add(`juel:${cid}:4`, -b); // :105-106
      era.print(`${era.get('ablname:10')}变为LV${new_lv}。`);
      return;
    } else if (result === 2) {
      const new_lv = (chara(cid).system.顺从 += 1);
      era.add(`juel:${cid}:5`, -c); // :107-108
      era.print(`${era.get('ablname:10')}变为LV${new_lv}。`);
      return;
    } else if (result === 3) {
      const new_lv = (chara(cid).system.顺从 += 1);
      era.add(`juel:${cid}:6`, -d); // :109-110
      era.print(`${era.get('ablname:10')}变为LV${new_lv}。`);
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 * 源: target/ERB/ABL/ABLUP11.ERB @ABLUP11 :8-71 + @DECIDE_ABLUP11 :87-223。
 * 欲望，system 域。单轨道 A(欲情 JUEL:5)/I，原作未调用共用的
 * GET_ABLUP_STATE，手写内联状态文案（点数不足/经验不足，无能力不足位）。
 */
async function ablup11(cid, mode) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl11 = () => era.get(`abl:${cid}:11`) || 0;

  const status_text = (bits) => {
    if (bits === 0) return 'ＯＫ';
    let text = '';
    if (bits & 1) text += '点数不足 '; // :44-45（带尾随空格）
    if (bits & 2) text += '经验不足'; // :46-47（无尾随空格）
    return text;
  };

  if (!mode) era.drawLine(); // :9（干跑不输出）

  if (abl11() >= 5 && talent(73) === 0 && talent(76) === 0) {
    if (!mode) await era.printAndWait('需要特殊素质才能继续提升'); // :15-17
    return;
  }
  if (abl11() >= 10) {
    if (!mode) await era.printAndWait('已达最高级'); // :18-20
    return;
  }

  for (;;) {
    const lv = abl11();
    // A：:100-120 梯子
    let a = [5, 50, 1000, 5000, 12000, 20000, 30000, 50000, 80000, 150000][lv];

    if (talent(27)) {
      // 戒备森严 :122-132
      if (lv === 3) a = times(a, 1.5);
      if (lv === 4) a = times(a, 2.0);
      if (lv === 5) a = times(a, 2.5);
      if (lv >= 6) a = times(a, 3.0);
    }
    if (talent(20)) a = times(a, 1.2); // 克制 :134-137
    if (talent(24)) a = times(a, 1.1); // 保守的 :139-142
    if (talent(30))
      a = times(a, 1.5); // 看重贞操 :144-146
    else if (talent(31)) a = times(a, 0.95); // 看轻贞操 :147-150
    if (talent(32))
      a = times(a, 1.5); // 压抑 :152-154
    else if (talent(33)) a = times(a, 0.9); // 开放 :155-158
    if (talent(34)) a = times(a, 1.5); // 抵抗 :160-162
    if (talent(35))
      a = times(a, 1.1); // 害羞 :164-166
    else if (talent(36)) a = times(a, 0.95); // 不知羞耻 :167-170
    if (talent(70))
      a = times(a, 0.8); // 接受快感 :172-174
    else if (talent(71)) a = times(a, 1.5); // 否定快感 :175-178
    if (talent(72)) a = times(a, 0.95); // 容易上瘾 :180-182
    if (talent(73)) a = times(a, 0.5); // 容易陷落 :183-185
    if (talent(76)) a = times(a, 0.7); // 淫乱 :186-188
    if (talent(180)) a = times(a, 0.9); // 妓女 :189-191
    if (talent(181)) a = times(a, 0.8); // 倾城 :192-194
    if (talent(157)) a = times(a, 0.8); // 人妻 :195-197

    // 异常经验：lv4→5 需 1 次、lv7→8 需 3 次，五项素质任一命中可免（:199-205）
    let e = 0;
    const anomaly_exempt11 =
      talent(33) === 0 &&
      talent(70) === 0 &&
      talent(73) === 0 &&
      talent(76) === 0 &&
      talent(123) === 0;
    if (lv === 4 && anomaly_exempt11) e = 1;
    else if (lv === 7 && anomaly_exempt11) e = 3;

    if (a < 1) a = 1; // :207-209

    const juel5 = era.get(`juel:${cid}:5`) || 0;
    const exp50_11 = era.get(`exp:${cid}:50`) || 0;
    let i = 0;
    if (juel5 < a) i |= 1; // :211-213
    if (e > exp50_11) i |= 2; // :215-217

    // 干跑出口（decide_ablup11 / core_ablup11）：@DECIDE_ABLUP11 与
    // @CORE_ABLUP11 复用主流程同一段梯子/加成/门槛，不另写一份
    if (mode === 'decide') return { i }; // @DECIDE_ABLUP11 :220-223 的 RESULT
    if (mode === 'core') {
      chara(cid).system.欲望 += 1; // @CORE_ABLUP11: ABL:11 ++
      if (i === 0) era.add(`juel:${cid}:5`, -a); // JUEL:5 -= A
      return 0;
    }

    if (e > 0) {
      era.print(`${era.get('expname:50')}${e}以上(现在${exp50_11})且`); // :36-37
    }
    era.printButton(
      `${era.get('palamname:5')}点数×${juel5}/${a} ……${status_text(i)}`,
      0,
    ); // :39-49
    era.println();
    era.printButton('停止', 100); // :51

    const result = await era.input(); // :53
    if (result === 100) {
      return;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件'); // :56-57
      continue;
    } else if (result === 0) {
      const new_lv = (chara(cid).system.欲望 += 1); // :63
      era.add(`juel:${cid}:5`, -a); // :65-66
      era.print(`${era.get('ablname:11')}变为LV${new_lv}。`); // :69
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 * 源: target/ERB/ABL/ABLUP12.ERB @ABLUP12 :8-75 + @DECIDE_ABLUP12 :91-203。
 * 技巧，system 域。单轨道 A(习得点数 JUEL:7)/I，手写内联状态文案（含 bit4
 * “金钱不足”，原文尾随一个制表符，1:1 保留）。NO:TARGET==0（本档以
 * cid===MASTER 表示自我训练）时，额外收取金钱 5000 与 EX_FLAG:4444
 * 5000，且 DECIDE 的 bit4/bit2 判定仅在该条件下生效。
 * issue #14 待登记缺陷：DECIDE 用“经验不足”(bit2)文案显示
 * ABL:MASTER:12 与 FLAG:30+1 的比较（:197-198），与经验完全无关，属于
 * 原作文案与判定错位；bit2+bit4 同时命中时两段文案之间没有分隔符
 * （:41-47），显示会粘连成“…经验不足金钱不足”。
 * issue #14 待登记缺陷：技巧＋话术组合上限（:96-97）触发提前 RETURN 时，
 * DECIDE 在给 A/I 赋梯子值之前就退出（:99-101 从未执行），A/I 维持调用方
 * CALL 前清零的初值（:26/:30）——等于免费直接购买，不受梯子、素质加成、
 * 自我训练金钱/bit2 检查约束。1:1 保留，不补收费。
 */
async function ablup12(cid, mode) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl12 = () => era.get(`abl:${cid}:12`) || 0;
  const abl15 = () => era.get(`abl:${cid}:15`) || 0;

  const status_text = (bits) => {
    if (bits === 0) return 'ＯＫ';
    let text = '';
    if (bits & 1) text += '点数不足 '; // :41-42
    if (bits & 2) text += '经验不足'; // :43-44（实际比较 ABL:MASTER:12 与 FLAG:30，与经验无关，issue #14）
    if (bits & 4) text += '金钱不足\t'; // :45-46（尾随制表符，原文如此）
    return text;
  };

  if (!mode) era.drawLine(); // :9（干跑不输出）

  if (abl12() >= 10) {
    if (!mode) await era.printAndWait('已达最高级'); // :14-16
    return;
  }
  if (abl12() + abl15() >= 15) {
    const juel7_gate = era.get(`juel:${cid}:7`) || 0;
    if (juel7_gate < abl12() * abl12() * 1000) {
      if (!mode) {
        await era.printAndWait(`技巧(${abl12()})＋话术(${abl15()})上限为15`); // :20-23
      }
      return;
    }
  }

  const self_training = cid === MASTER; // NO:TARGET == 0

  for (;;) {
    const lv = abl12();
    // 组合上限触发提前 RETURN（:96-97），A/I 维持调用方清零的初值——免费
    // 直接购买，不进梯子/素质/自我训练判定（见文件头 issue #14）
    const combo_break = lv + abl15() >= 15;
    let a = 0;
    let i = 0;

    if (!combo_break) {
      // A：:103-123 梯子
      a = [1, 25, 200, 3000, 8000, 12000, 16000, 22000, 28000, 35000][lv];

      if (talent(27)) {
        // 戒备森严 :126-135
        if (lv === 3) a = times(a, 1.5);
        if (lv === 4) a = times(a, 2.0);
        if (lv === 5) a = times(a, 2.5);
        if (lv >= 6) a = times(a, 3.0);
      }
      if (talent(13)) a = times(a, 0.95); // 坦率 :137-139
      if (talent(21)) a = times(a, 1.05); // 冷漠 :140-142
      if (talent(23)) a = times(a, 0.95); // 好奇心 :143-145
      if (talent(24)) a = times(a, 1.1); // 保守的 :146-148
      if (talent(32))
        a = times(a, 1.1); // 压抑 :150-152
      else if (talent(33)) a = times(a, 0.9); // 开放 :153-156
      if (talent(34)) a = times(a, 1.2); // 抵抗 :158-160
      if (talent(35))
        a = times(a, 1.05); // 害羞 :162-164
      else if (talent(36)) a = times(a, 0.95); // 不知羞耻 :165-168
      if (talent(50))
        a = times(a, 0.8); // 快速学习 :170-172
      else if (talent(51)) a = times(a, 1.5); // 学习缓慢 :173-176
      if (talent(52)) a = times(a, 0.95); // 擅用舌头 :178-180
      if (talent(63)) a = times(a, 0.95); // 献身的 :181-183
      if (talent(64)) a = times(a, 0.95); // 不怕脏 :184-186

      if (a < 1) a = 1; // :188-190
    }

    const juel7 = era.get(`juel:${cid}:7`) || 0;
    const money = era_flag.money;
    const master_abl12 = era.get(`abl:${MASTER}:12`) || 0;
    const flag30 = era.get('flag:30') || 0;
    if (!combo_break) {
      if (juel7 < a) i |= 1; // :192-194
      if (self_training && money < 5000) i |= 4; // :195-196
      if (self_training && master_abl12 > flag30 + 1) i |= 2; // :197-198（文案错位，见文件头）
    }

    // 干跑出口（decide_ablup12 / core_ablup12）
    if (mode === 'decide') {
      // @DECIDE_ABLUP12 的组合上限是硬 RETURN 0（:95-97），比主流程的
      // 「免费购买」缺陷（见文件头 issue #14）更早判死：干跑按 DECIDE 走
      if (combo_break) return null;
      return { i };
    }
    if (mode === 'core') {
      chara(cid).system.技巧 += 1; // @CORE_ABLUP12: ABL:12 ++
      // 只扣珠不扣钱（@CORE_ABLUP12 :79-85 没有主流程 :63-65 的金钱段）
      if (i === 0) era.add(`juel:${cid}:7`, -a);
      return 0;
    }

    if (self_training) {
      era.print('魔王通过这种方式提升技巧仍然需要金钱5000点'); // :34-35
    }
    era.printButton(
      `${era.get('palamname:7')}点数×${juel7}/${a} ……${status_text(i)}`,
      0,
    ); // :36-48
    era.println();
    era.printButton('停止', 100); // :50

    const result = await era.input(); // :52
    if (result === 100) {
      return;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件'); // :55-56
      continue;
    } else if (result === 0) {
      const new_lv = (chara(cid).system.技巧 += 1); // :62
      if (self_training) {
        era_flag.money -= 5000; // :63-65
        era_exflag.legit_money -= 5000;
        era.print('花费金钱5000点。'); // :66
      }
      era.add(`juel:${cid}:7`, -a); // :69-70
      era.print(`${era.get('ablname:12')}变为LV${new_lv}。`); // :73
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 * 源: target/ERB/ABL/ABLUP13.ERB @ABLUP13 :9-69 + @DECIDE_ABLUP13 :86-269。
 * 侍奉技术，train 域（同域写，直接 era.add）。单轨道 A(习得点数
 * JUEL:7)/I，共用 GET_ABLUP_STATE。与 ABLUP14 共享“侍奉技术＋性交技术
 * ≤10”组合上限，突破价 TEMP=max(ABL:13,ABL，TEMP²×500；入口的溢出
 * 提示是两行（PRINTFORML 后跟 PRINTFORMW），与 ABLUP12/15 的单行 PRINTFORMW
 * 不同，1:1 保留。
 * issue #14 待登记缺陷：Lv5 及以上本应改查“侍奉精神≥侍奉技术+1”的门槛
 * （:261-263）在原作中被注释掉，实际只保留 Lv5 以下的“技巧≥侍奉技术+1”
 * 检查（:259-260），Lv5 以上完全不受门槛约束，属死代码，1:1 保留不恢复。
 */
async function ablup13(cid, mode) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl12 = () => era.get(`abl:${cid}:12`) || 0;
  const abl13 = () => era.get(`abl:${cid}:13`) || 0;
  const abl14 = () => era.get(`abl:${cid}:14`) || 0;
  const abl16 = () => era.get(`abl:${cid}:16`) || 0;

  if (!mode) era.drawLine(); // :12（干跑不输出）

  if ((abl13() >= 5 && abl16() < 5) || abl13() >= 10) {
    if (!mode) await era.printAndWait('已达最高级'); // :18-19
    return;
  }
  if (abl13() + abl14() >= 10) {
    const temp = Math.max(abl13(), abl14()); // :23-24
    const juel7_gate = era.get(`juel:${cid}:7`) || 0;
    if (juel7_gate < temp * temp * 500) {
      if (!mode) {
        era.print(`侍奉技术(${abl13()})＋性交技术(${abl14()})上限为10`); // :26
        await era.printAndWait(
          `${era.get('palamname:7')}点数至少达到${temp * temp * 500}点、方可突破技术等级限制`,
        ); // :27
      }
      return;
    }
  }

  for (;;) {
    const lv = abl13();
    // A：:102-122 梯子，组合上限达到时改用 TEMP²×500（:124-125）
    let a = [5, 400, 1000, 3000, 6000, 9000, 12000, 16000, 20000, 25000][lv];
    if (lv + abl14() >= 10) {
      const temp = Math.max(lv, abl14());
      a = temp * temp * 500;
    }

    if (talent(27)) {
      // 戒备森严 :128-137
      if (lv === 3) a = times(a, 1.5);
      if (lv === 4) a = times(a, 2.0);
      if (lv === 5) a = times(a, 2.5);
      if (lv >= 6) a = times(a, 3.0);
    }
    if (talent(11)) a = times(a, 1.2); // 反抗心 :139-142
    if (talent(13)) a = times(a, 0.95); // 坦率 :143-146
    if (talent(16)) a = times(a, 1.2); // 嚣张 :147-150
    if (talent(15))
      a = times(a, 1.2); // 高姿态 :152-154
    else if (talent(17)) a = times(a, 0.95); // 低姿态 :155-158
    if (talent(21)) a = times(a, 1.05); // 冷漠 :160-163
    if (talent(22)) a = times(a, 1.05); // 感情淡薄 :164-167
    if (talent(23)) a = times(a, 0.95); // 好奇心 :168-171
    if (talent(24)) a = times(a, 1.1); // 保守的 :172-175
    if (talent(32))
      a = times(a, 1.1); // 压抑 :177-179
    else if (talent(33)) a = times(a, 0.9); // 开放 :180-183
    if (talent(34)) a = times(a, 1.2); // 抵抗 :185-188
    if (talent(35))
      a = times(a, 1.05); // 害羞 :190-192
    else if (talent(36)) a = times(a, 0.95); // 不知羞耻 :193-196
    if (talent(37)) a = times(a, 0.9); // 把柄 :198-201
    if (talent(50))
      a = times(a, 0.8); // 快速学习 :203-206
    else if (talent(51)) a = times(a, 1.5); // 学习缓慢 :207-209
    if (talent(52)) a = times(a, 0.9); // 擅用舌头 :211-214
    if (talent(63)) a = times(a, 0.9); // 献身的 :215-218
    if (talent(64)) a = times(a, 0.9); // 不怕脏 :219-222
    if (talent(73)) a = times(a, 0.9); // 容易陷落 :223-226
    if (talent(80)) a = times(a, 0.95); // 倒錯的 :228-231
    if (talent(83)) a = times(a, 1.1); // 施虐狂 :232-235
    // 侍奉精神分级折扣（非素质，按 ABL:16 当前等级，:237-248）
    if (abl16() < 3) a = times(a, 1.0);
    else if (abl16() < 6) a = times(a, 0.95);
    else if (abl16() < 8) a = times(a, 0.9);
    else if (abl16() < 10) a = times(a, 0.85);
    else a = times(a, 0.8);

    if (a < 1) a = 1; // :250-252

    const juel7 = era.get(`juel:${cid}:7`) || 0;
    let i = 0;
    if (juel7 < a) i |= 1; // :254-256
    // Lv5 未满时检查技巧≥侍奉技术+1（:258-260）；Lv5 以上的对应检查在原作
    // 中被注释掉（:262-263），死代码不恢复，issue #14
    if (lv < 5 && abl12() < lv + 1) i |= 2;

    // 干跑出口（decide_ablup13 / core_ablup13）
    if (mode === 'decide') return { i };
    if (mode === 'core') {
      era.add(`abl:${cid}:13`, 1); // @CORE_ABLUP13: ABL:13 ++
      if (i === 0) era.add(`juel:${cid}:7`, -a); // JUEL:7 -= A
      return 0;
    }

    if (lv < 5) {
      era.print(`${era.get('ablname:12')}LV${lv + 1}以上(现在LV${abl12()})且`); // :42-43
    } else {
      era.print(`${era.get('ablname:16')}LV${lv + 1}以上(现在LV${abl16()})且`); // :45-46
    }
    era.printButton(
      `${era.get('palamname:7')}点数×${juel7}/${a} ……${get_ablup_state(i)}`,
      0,
    ); // :48-50
    era.println();
    era.printButton('停止', 100); // :51

    const result = await era.input(); // :53
    if (result === 100) {
      return;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件'); // :56-57
      continue;
    } else if (result === 0) {
      const new_lv = era.add(`abl:${cid}:13`, 1); // :63
      era.add(`juel:${cid}:7`, -a); // :64-65
      era.print(`${era.get('ablname:13')}变为LV${new_lv}。`); // :67
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 * 源: target/ERB/ABL/ABLUP14.ERB @ABLUP14 :9-70 + @DECIDE_ABLUP14 :87-264。
 * 性交技术，train 域。双值 A(习得点数 JUEL:7)/B(性交经验 EXP:5)，共用
 * GET_ABLUP_STATE。与 ABLUP13 共享同一组合上限，两行溢出提示同款。
 * issue #14 待登记缺陷：DECIDE 的技巧门槛检查（:257-258）写作
 * `ABL:12 < 5 && ABL:12 < ABL + 1`，两个子句都比较 ABL:12，第一个子句
 * 应参照 ABLUP13 同类检查的写法比较自身等级（ABL < 5）却错写成
 * ABL:12——效果是：一旦 ABL:12 达到 5，此门槛此后对任何 ABL 等级都
 * 不再生效，而渲染层的技巧要求文案（:44-45）仍然只在 ABL < 5 时显示，
 * 二者不对称，属真实缺陷，1:1 保留。
 */
async function ablup14(cid, mode) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl12 = () => era.get(`abl:${cid}:12`) || 0;
  const abl13 = () => era.get(`abl:${cid}:13`) || 0;
  const abl14 = () => era.get(`abl:${cid}:14`) || 0;
  const abl30 = () => era.get(`abl:${cid}:30`) || 0;

  if (!mode) era.drawLine(); // :12（干跑不输出）

  if (abl14() >= 10) {
    if (!mode) await era.printAndWait('已达最高级'); // :18-19
    return;
  }
  if (abl13() + abl14() >= 10) {
    const temp = Math.max(abl13(), abl14()); // :23-24
    const juel7_gate = era.get(`juel:${cid}:7`) || 0;
    if (juel7_gate < temp * temp * 500) {
      if (!mode) {
        era.print(`侍奉技术(${abl13()})＋性交技术(${abl14()})上限为10`); // :26
        await era.printAndWait(
          `${era.get('palamname:7')}点数至少达到${temp * temp * 500}点、方可突破技术等级限制`,
        ); // :27
      }
      return;
    }
  }

  for (;;) {
    const lv = abl14();
    // A/B：:101-131 梯子，组合上限达到时 A 改用 TEMP²×500（:133-134）
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
      // 戒备森严 :137-151
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
      // 坦率 :154-157
      a = times(a, 0.9);
      b = times(b, 0.95);
    }
    if (talent(21)) {
      // 冷漠 :159-162
      a = times(a, 1.1);
      b = times(b, 1.05);
    }
    if (talent(22)) {
      // 感情淡薄 :164-167
      a = times(a, 1.1);
      b = times(b, 1.05);
    }
    if (talent(23)) {
      // 好奇心 :169-172
      a = times(a, 0.95);
      b = times(b, 0.95);
    }
    if (talent(24)) {
      // 保守的 :174-177
      a = times(a, 1.2);
      b = times(b, 1.1);
    }
    if (talent(32)) {
      // 压抑 :180-183
      a = times(a, 1.1);
      b = times(b, 1.05);
    } else if (talent(33)) {
      // 开放 :184-187
      a = times(a, 0.9);
      b = times(b, 0.95);
    }
    if (talent(34)) {
      // 抵抗 :190-193
      a = times(a, 1.2);
      b = times(b, 1.1);
    }
    if (talent(35)) {
      // 害羞 :196-199
      a = times(a, 1.1);
      b = times(b, 1.05);
    } else if (talent(36)) {
      // 不知羞耻 :200-203
      a = times(a, 0.95);
      b = times(b, 0.95);
    }
    if (talent(50)) {
      // 快速学习 :206-209
      a = times(a, 0.8);
      b = times(b, 0.8);
    } else if (talent(51)) {
      // 学习缓慢 :210-213
      a = times(a, 1.5);
      b = times(b, 1.2);
    }
    if (talent(63)) {
      // 献身的 :216-219
      a = times(a, 0.95);
      b = times(b, 0.95);
    }
    if (talent(64)) {
      // 不怕脏 :221-224
      a = times(a, 0.95);
      b = times(b, 0.95);
    }
    // 性交中毒分级折扣（非素质，按 ABL:30，:227-242）
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

    if (a < 1) a = 1; // :245-246
    if (b < 1) b = 1; // :247-248

    const juel7 = era.get(`juel:${cid}:7`) || 0;
    const exp5 = era.get(`exp:${cid}:5`) || 0;
    let i = 0;
    if (juel7 < a) i |= 1; // :250-252
    if (exp5 < b) i |= 2; // :253-255
    // 两个子句都比较 ABL:12，第一个子句本应比较 ABL<5，与渲染层
    // 的门槛文案不对称，是原作真实缺陷，1:1 保留（见文件头，issue #14）
    if (abl12() < 5 && abl12() < lv + 1) i |= 4; // :256-258

    // 干跑出口（decide_ablup14 / core_ablup14）
    if (mode === 'decide') return { i };
    if (mode === 'core') {
      era.add(`abl:${cid}:14`, 1); // @CORE_ABLUP14: ABL ++
      if (i === 0) era.add(`juel:${cid}:7`, -a); // JUEL:7 -= A
      return 0;
    }

    if (lv < 5) {
      era.print(`${era.get('ablname:12')}LV${lv + 1}以上(现在LV${abl12()})且`); // :44-45
    }
    era.printButton(
      `${era.get('palamname:7')}点数×${juel7}/${a} ……${get_ablup_state(i)}`,
      0,
    ); // :47-49
    era.println();
    era.print(`      ${era.get('expname:5')}　${exp5}/${b}`); // :50
    era.printButton('停止', 100); // :52

    const result = await era.input(); // :54
    if (result === 100) {
      return;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件'); // :57-58
      continue;
    } else if (result === 0) {
      const new_lv = era.add(`abl:${cid}:14`, 1); // :64
      era.add(`juel:${cid}:7`, -a); // :65-66
      era.print(`${era.get('ablname:14')}变为LV${new_lv}。`); // :68
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 * 源: target/ERB/ABL/ABLUP15.ERB @ABLUP15 :9-68 + @DECIDE_ABLUP15 :85-304。
 * 话术，train 域。三值 A(习得点数 JUEL:7)/B(调教会话经验 EXP:73)/C(卖淫
 * 经验 EXP:74)，共用 GET_ABLUP_STATE。与 ABLUP12 共享“技巧＋话术≤15”
 * 组合上限，入口溢出提示是单行 PRINTFORMW（与 ABLUP13/14 的两行不同）。
 * bit2（经验不足）要求 B、C 两条经验轨道都不足才命中——EXP:73/74 任一
 * 达标即可免——渲染文案的行尾字面量 " or" 与此呼应，1:1 保留。
 * issue #14 待登记缺陷：与 ABLUP12 同款——组合上限（:89-90）触发提前
 * RETURN 时，DECIDE 在给 A/B/C/I 赋梯子值之前就退出（:93-96 从未执行），
 * 维持调用方 CALL 前清零的初值（:30-38）——等于免费直接购买。1:1 保留，
 * 不补收费。
 */
async function ablup15(cid, mode) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl12 = () => era.get(`abl:${cid}:12`) || 0;
  const abl15 = () => era.get(`abl:${cid}:15`) || 0;

  if (!mode) era.drawLine(); // :10（干跑不输出）

  if (abl15() >= 10) {
    if (!mode) await era.printAndWait('已达最高级'); // :16-17
    return;
  }
  if (abl12() + abl15() >= 15) {
    const juel7_gate = era.get(`juel:${cid}:7`) || 0;
    if (juel7_gate < abl15() * abl15() * 1000) {
      if (!mode)
        await era.printAndWait(`技巧(${abl12()})＋话术(${abl15()})上限为15`); // :22
      return;
    }
  }

  for (;;) {
    const lv = abl15();
    // 组合上限触发提前 RETURN（:89-90），A/B/C/I 维持调用方清零的初值——
    // 免费直接购买，不进梯子/素质判定（见文件头 issue #14）
    const combo_break = abl12() + lv >= 15;
    let a = 0,
      b = 0,
      c = 0;
    let i = 0;

    if (!combo_break) {
      // A/B/C：:98-138 梯子
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
        // 戒备森严 :140-159
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
        // 反抗心 :162-166
        a = times(a, 1.5);
        b = times(b, 1.2);
        c = times(c, 1.2);
      }
      if (talent(13)) {
        // 坦率 :168-172
        a = times(a, 0.9);
        b = times(b, 0.95);
        c = times(c, 0.95);
      }
      if (talent(16)) {
        // 嚣张 :174-178
        a = times(a, 1.25);
        b = times(b, 1.15);
        c = times(c, 1.15);
      }
      if (talent(15)) {
        // 高姿态 :180-184
        a = times(a, 1.2);
        b = times(b, 1.1);
        c = times(c, 1.1);
      }
      if (talent(21)) {
        // 冷漠 :186-190
        a = times(a, 1.5);
        b = times(b, 1.2);
        c = times(c, 1.2);
      }
      if (talent(22)) {
        // 感情淡薄 :192-196
        a = times(a, 1.5);
        b = times(b, 1.2);
        c = times(c, 1.2);
      }
      if (talent(23)) {
        // 好奇心 :198-202
        a = times(a, 0.95);
        b = times(b, 0.95);
        c = times(c, 0.95);
      }
      if (talent(25)) {
        // 乐观的 :205-209
        a = times(a, 0.95);
        b = times(b, 0.95);
        c = times(c, 0.95);
      } else if (talent(26)) {
        // 悲观的 :210-214
        a = times(a, 1.2);
        b = times(b, 1.1);
        c = times(c, 1.1);
      }
      if (talent(28)) {
        // 爱表现 :217-221
        a = times(a, 0.95);
        b = times(b, 0.95);
        c = times(c, 0.95);
      }
      if (talent(32)) {
        // 压抑 :224-228
        a = times(a, 1.2);
        b = times(b, 1.1);
        c = times(c, 1.1);
      } else if (talent(33)) {
        // 开放 :229-233
        a = times(a, 0.9);
        b = times(b, 0.9);
        c = times(c, 0.9);
      }
      if (talent(34)) {
        // 抵抗 :236-240
        a = times(a, 1.2);
        b = times(b, 1.1);
        c = times(c, 1.1);
      }
      if (talent(35)) {
        // 害羞 :243-247
        a = times(a, 1.2);
        b = times(b, 1.1);
        c = times(c, 1.1);
      } else if (talent(36)) {
        // 不知羞耻 :248-252
        a = times(a, 0.95);
        b = times(b, 0.95);
        c = times(c, 0.95);
      }
      if (talent(50)) {
        // 快速学习 :255-259
        a = times(a, 0.8);
        b = times(b, 0.8);
        c = times(c, 0.8);
      } else if (talent(51)) {
        // 学习缓慢 :260-264
        a = times(a, 1.2);
        b = times(b, 1.1);
        c = times(c, 1.1);
      }
      if (talent(92)) {
        // 谜之魅力 :267-271
        a = times(a, 0.9);
        b = times(b, 0.9);
        c = times(c, 0.9);
      }
      if (talent(87)) {
        // 小恶魔 :273-277
        a = times(a, 0.95);
        b = times(b, 0.95);
        c = times(c, 0.95);
      }
      if (talent(182)) {
        // 巧言 :279-283
        a = times(a, 0.6);
        b = times(b, 0.8);
        c = times(c, 0.8);
      }

      if (a < 1) a = 1; // :286-287
      if (b < 1) b = 1; // :288-289
      if (c < 1) c = 1; // :290-291
    }

    const juel7 = era.get(`juel:${cid}:7`) || 0;
    const exp73 = era.get(`exp:${cid}:73`) || 0;
    const exp74 = era.get(`exp:${cid}:74`) || 0;
    if (!combo_break) {
      if (juel7 < a) i |= 1; // :293-295
      if (exp73 < b && exp74 < c) i |= 2; // :296-298（任一经验达标即可免）
    }

    // 干跑出口（decide_ablup15 / core_ablup15）
    if (mode === 'decide') {
      // @DECIDE_ABLUP15 的组合上限（:89-90）是硬 RETURN 0，比主流程的
      // 「免费购买」缺陷（见文件头 issue #14）更早判死：干跑按 DECIDE 走
      if (combo_break) return null;
      return { i };
    }
    if (mode === 'core') {
      era.add(`abl:${cid}:15`, 1); // @CORE_ABLUP15: ABL ++
      if (i === 0) era.add(`juel:${cid}:7`, -a); // JUEL:7 -= A
      return 0;
    }

    era.printButton(
      `${era.get('palamname:7')}点数×${juel7}/${a} ……${get_ablup_state(i)}`,
      0,
    ); // :42-44
    era.println();
    era.print(`      ${era.get('expname:73')}　${exp73}/${b} or`); // :45
    era.print(`      ${era.get('expname:74')}　${exp74}/${c}`); // :46
    era.printButton('停止', 100); // :48

    const result = await era.input(); // :50
    if (result === 100) {
      return;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件'); // :53-54
      continue;
    } else if (result === 0) {
      const new_lv = era.add(`abl:${cid}:15`, 1); // :60
      era.add(`juel:${cid}:7`, -a); // :62-63
      era.print(`${era.get('ablname:15')}变为LV${new_lv}。`); // :66
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 * 源: target/ERB/ABL/ABLUP16.ERB @ABLUP16 :9-115 + @DECIDE_ABLUP16 :136-533。
 * 侍奉精神，system 域。三条可购买轨道 A(屈服点数 JUEL:6)/B(恭顺点数
 * JUEL:4，B=0 时 J=256)/C(习得点数 JUEL:7，C=0 时 K=256)，I/J/K 三个独立
 * 可否位，外加 D(侍奉快乐经验 EXP:21，仅随 B 轨显示)、E(绝顶+精液经验
 * EXP:2/EXP:20，随 A 轨恒显示)。输入用 $INPUT_LOOP+GOTO（非 RESTART），
 * 与 ABLUP6/8/9 同款：整段计算与渲染放进 for(;;) 循环体内，因为
 * era.printButton 的注册在每次 era.input() 之后被引擎清空。
 * issue #14 待登记缺陷：入口把关（:16）用 OR（TALENT:63==0 ||
 * TALENT:85==0 || TALENT:86==0，任一素质缺失即挡），@DECIDE_ABLUP16
 * 自身的复查（:139）却用 AND（三项全缺才挡）。在 @ABLUP16 自己的购买流程
 * 里，DECIDE 只在入口把关通过后才会被调用，此时三项必已全部具备，AND
 * 复查恒假、是死代码——移植时随 DECIDE 内联一并省略，不在 JS 里另写一份
 * 恒假的判定（与 ABLUP2 内联时去重原作重复检查的既有做法一致）。但原作
 * 里 DECIDE_ABLUP16 还有另外两个调用点不经过这条入口把关：
 * ABL.ERB:78/:146（@SHOW_ABLUP_SELECT 菜单的“*”可升级标记）与
 * ABL.ERB:247-267（@AUTO_ABLUP_CORE 自动升级），那两处 AND 复查是活代码、
 * 会产生与 OR 不同的可观测结果。这两个调用点本身尚未移植（page-ablup.js
 * 与 stub-registry.md 均登记为待办），本票不受影响；日后落地时需要按
 * OR/AND 原样复现，不能假设复查恒假。
 */
async function ablup16(cid, mode) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl10 = () => era.get(`abl:${cid}:10`) || 0;
  const abl16 = () => era.get(`abl:${cid}:16`) || 0;

  if (!mode) era.drawLine(); // :10（干跑不输出）

  // 入口把关用 OR（:16）：任一素质缺失即挡。干跑不经过这里——DECIDE 的
  // 复查用 AND，两者不等价，见下方 decide 分支与文件头。
  if (
    !mode &&
    abl16() >= 5 &&
    (talent(63) === 0 || talent(85) === 0 || talent(86) === 0)
  ) {
    await era.printAndWait('需要特殊素质才能继续提升'); // :16-18
    return;
  }
  if (abl16() >= 10) {
    if (!mode) await era.printAndWait('已达最高级'); // :19-21
    return;
  }

  for (;;) {
    const lv = abl16();
    // A/B/C/D/E：:156-216 梯子（C 只在 lv 0-2 非零）
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
      // 戒备森严 :219-241（A/B/D/E，C 不受影响）
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

    // 异常经验：lv>=3 时需要，三项素质任一命中可免（:243-246）
    let f = 0;
    if (lv >= 3 && talent(63) === 0 && talent(85) === 0 && talent(86) === 0) {
      f = lv - 2;
    }

    if (talent(11)) {
      // 反抗心 :249-254
      a = times(a, 1.2);
      b = times(b, 1.4);
      d = times(d, 1.2);
      e = times(e, 1.2);
    }
    if (talent(12)) {
      // 刚强 :257-260
      a = times(a, 1.2);
      d = times(d, 1.2);
    }
    if (talent(13)) {
      // 坦率 :263-268
      a = times(a, 0.9);
      b = times(b, 0.8);
      c = times(c, 0.8);
      d = times(d, 0.7);
    }
    if (talent(16)) {
      // 嚣张 :271-274
      a = times(a, 1.1);
      b = times(b, 1.1);
    }
    if (talent(15)) {
      // 高姿态 :277-282
      a = times(a, 1.4);
      b = times(b, 1.3);
      d = times(d, 1.2);
      e = times(e, 1.2);
    } else if (talent(17)) {
      // 低姿态 :283-288
      a = times(a, 0.9);
      b = times(b, 0.8);
      d = times(d, 0.8);
      e = times(e, 0.8);
    }
    if (talent(20)) {
      // 克制 :291-296
      a = times(a, 1.2);
      b = times(b, 1.2);
      d = times(d, 1.2);
      e = times(e, 1.2);
    }
    if (talent(21)) {
      // 冷漠 :299-304
      a = times(a, 1.1);
      b = times(b, 1.1);
      d = times(d, 1.2);
      e = times(e, 1.1);
    }
    if (talent(22)) {
      // 感情淡薄 :307-312
      a = times(a, 1.2);
      b = times(b, 1.2);
      d = times(d, 1.4);
      e = times(e, 1.2);
    }
    if (talent(24)) {
      // 保守的 :315-321
      a = times(a, 1.3);
      b = times(b, 1.3);
      c = times(c, 1.3);
      d = times(d, 1.2);
      e = times(e, 1.2);
    }
    if (talent(25)) {
      // 乐观的 :324-329
      a = times(a, 0.9);
      b = times(b, 0.8);
      d = times(d, 0.7);
      e = times(e, 0.75);
    } else if (talent(26)) {
      // 悲观的 :330-335
      a = times(a, 0.8);
      b = times(b, 0.8);
      d = times(d, 0.8);
      e = times(e, 0.8);
    }
    if (talent(28)) {
      // 爱表现 :338-343
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
      d = times(d, 0.9);
    }
    if (talent(32)) {
      // 压抑 :346-351
      a = times(a, 1.1);
      b = times(b, 1.1);
      d = times(d, 2.5);
      e = times(e, 3.0);
    } else if (talent(33)) {
      // 开放 :352-357
      a = times(a, 0.9);
      b = times(b, 0.9);
      d = times(d, 0.7);
      e = times(e, 0.6);
    }
    if (talent(34)) {
      // 抵抗 :360-366
      a = times(a, 1.5);
      b = times(b, 1.5);
      c = times(c, 1.5);
      d = times(d, 2.0);
      e = times(e, 2.0);
    }
    if (talent(37)) {
      // 把柄 :369-375
      a = times(a, 0.8);
      b = times(b, 0.8);
      c = times(c, 0.8);
      d = times(d, 0.5);
      e = times(e, 0.5);
    }
    if (talent(50)) c = times(c, 0.8); // 快速学习 :378-379
    if (talent(51)) c = times(c, 1.6); // 学习缓慢 :382-383
    if (talent(52)) c = times(c, 0.8); // 擅用舌头 :386-387
    if (talent(63)) {
      // 献身的 :390-395
      a = times(a, 0.8);
      b = times(b, 0.7);
      d = times(d, 0.6);
      e = times(e, 0.8);
    }
    if (talent(70)) {
      // 接受快感 :398-400
      e = times(e, 0.7);
    } else if (talent(71)) {
      // 否定快感 :401-403
      e = times(e, 3.0);
    }
    if (talent(73)) {
      // 容易陷落 :406-411
      a = times(a, 0.5);
      b = times(b, 0.5);
      d = times(d, 0.5);
      e = times(e, 0.5);
    }
    if (talent(80)) {
      // 倒錯的 :414-420
      a = times(a, 0.75);
      b = times(b, 0.75);
      c = times(c, 0.75);
      d = times(d, 0.75);
      e = times(e, 0.75);
    }
    if (talent(83)) {
      // 施虐狂 :423-427
      a = times(a, 1.2);
      b = times(b, 1.2);
      d = times(d, 1.5);
    }
    if (talent(85)) {
      // 爱慕 :430-435
      a = times(a, 0.75);
      b = times(b, 0.75);
      c = times(c, 0.75);
      d = times(d, 0.75);
    }
    if (talent(86)) {
      // 盲从 :438-444
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
      d = times(d, 0.5);
      e = times(e, 0.5);
    }
    if (talent(87)) {
      // 小恶魔 :447-452
      a = times(a, 1.1);
      b = times(b, 1.1);
      d = times(d, 1.2);
      e = times(e, 0.8);
    }
    if (talent(123)) {
      // 疯狂 :455-461
      a = times(a, 2.5);
      b = times(b, 3.0);
      c = times(c, 1.5);
      d = times(d, 0.8);
      e = times(e, 0.5);
    }
    if (talent(9)) {
      // 崩坏 :464-470
      a = times(a, 2.5);
      b = times(b, 2.5);
      c = times(c, 2.5);
      d = times(d, 0.5);
      e = times(e, 0.5);
    }

    if (a < 1) a = 1; // :473-474
    if (b < 1) b = 1; // :475-476
    if (d < 1) d = 1; // :477-478
    if (e < 1) e = 1; // :479-480（C 无底线，靠 256 哨兵表达不可购买）

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
    if (juel6 < a) i |= 1; // :483-484
    if (b > 0) {
      if (juel4 < b) j |= 1; // :487-489
      if (exp21 < d) j |= 2; // :490-492
    } else {
      j = 256; // :493-495
    }
    if (c > 0) {
      if (juel7 < c) k |= 1; // :498-500
      if (exp2 < 1) k |= 2; // :501-503（固定阈值 1，与 D/E 门槛无关）
    } else {
      k = 256; // :504-506
    }
    if (exp2 < e) i |= 2; // :508-510
    if (exp20 < e) i |= 2; // :511-513
    if (abl10() < lv + 1) {
      // 顺从门槛，三条轨道同时命中（:515-520）
      i |= 4;
      j |= 4;
      k |= 4;
    }
    if (f > exp50_16) {
      // 异常经验不足，三条轨道同时命中（:522-527）
      i |= 2;
      j |= 2;
      k |= 2;
    }

    // 干跑出口（decide_ablup16 / core_ablup16）
    if (mode === 'decide') {
      // @DECIDE_ABLUP16 的素质复查用 AND（:139）——两个调用点（`*` 标记与
      // AUTO_ABLUP）不经过入口把关，此处按 AND 原样复现（文件头已登记）
      if (
        abl16() >= 5 &&
        talent(63) === 0 &&
        talent(85) === 0 &&
        talent(86) === 0
      ) {
        return null;
      }
      return { i, j, k };
    }
    if (mode === 'core') {
      chara(cid).system.侍奉精神 += 1; // @CORE_ABLUP16: ABL:16 ++（system 域，走门面）
      if (i === 0) era.add(`juel:${cid}:6`, -a);
      else if (j === 0) era.add(`juel:${cid}:4`, -b);
      else if (k === 0) era.add(`juel:${cid}:7`, -c);
      return 0;
    }

    era.print(`${era.get('ablname:10')}LV${lv + 1}以上(现在LV${abl10()})且`); // :47-48
    if (f > 0) {
      era.print(`${era.get('expname:50')}${f}以上(现在${exp50_16})且`); // :51-52
    }
    era.printButton(
      `${era.get('palamname:6')}点数×${juel6}/${a} ……${get_ablup_state(i)}`,
      0,
    ); // :55-57（恒渲染）
    era.println();
    if (e > 0) {
      era.print(`　　　${era.get('expname:2')}　${exp2}/${e}`); // :59
      era.print(`　　　${era.get('expname:20')}　${exp20}/${e}`); // :60
    }
    if (b > 0) {
      era.printButton(
        `${era.get('palamname:4')}点数×${juel4}/${b} ……${get_ablup_state(j)}`,
        1,
      ); // :65-67
      era.println();
      if (d > 0) {
        era.print(`　　　${era.get('expname:21')}　${exp21}/${d}`); // :69
      }
    }
    if (c > 0) {
      era.printButton(
        `${era.get('palamname:7')}点数×${juel7}/${c} ……${get_ablup_state(k)}`,
        2,
      ); // :74-76
      era.println();
      era.print(`　　　${era.get('expname:2')}　${exp2}/1`); // :77（分母固定为 1，非变量）
    }
    era.printButton('停止', 100); // :80

    const result = await era.input(); // :83
    if (result === 100) {
      return;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件'); // :86-87
      continue;
    } else if (result === 1 && j === 256) {
      continue; // :89-90 b===0 时隐藏选项，issue #130
    } else if (result === 1 && j !== 0) {
      era.print('未满足条件'); // :91-92
      continue;
    } else if (result === 2 && k === 256) {
      continue; // :94-95 c===0 时隐藏选项，issue #130
    } else if (result === 2 && k !== 0) {
      era.print('未满足条件'); // :96-97
      continue;
    } else if (result === 0) {
      const new_lv = (chara(cid).system.侍奉精神 += 1); // :103
      era.add(`juel:${cid}:6`, -a); // :105-106
      era.print(`${era.get('ablname:16')}变为LV${new_lv}。`); // :113
      return;
    } else if (result === 1) {
      const new_lv = (chara(cid).system.侍奉精神 += 1);
      era.add(`juel:${cid}:4`, -b); // :107-108
      era.print(`${era.get('ablname:16')}变为LV${new_lv}。`);
      return;
    } else if (result === 2) {
      const new_lv = (chara(cid).system.侍奉精神 += 1);
      era.add(`juel:${cid}:7`, -c); // :109-110
      era.print(`${era.get('ablname:16')}变为LV${new_lv}。`);
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 * 源: target/ERB/ABL/ABLUP17.ERB @ABLUP17 :9-83 + @DECIDE_ABLUP17 :99-282。
 * 露出癖，system 域。单轨道 A(耻情点数 JUEL:8)/I，共用 GET_ABLUP_STATE。
 * 前置门槛依 TALENT:85（爱慕）二选一：无该素质时查欲望(ABL:11)，有该
 * 素质时改查顺从(ABL:10)。唯一一处重试文案带句号“未满足条件。”，
 * 其余 ABLUP10～16 均不带句号，1:1 保留这一不一致。
 * C(绝顶经验)/D(调教自慰经验) 只在各自的等级分支里赋值一次：Lv0→1
 * 需要 C=1（:115），Lv1→2 需要 D=1（:118），其余等级均维持声明时的清零
 * （:106-109），对应的显示行（:57-58、:60-61）与门槛检查（:268-269、
 * :271-272）因此只在 Lv0/Lv1 生效，其余等级不可触达——不是全程死代码。
 */
async function ablup17(cid, mode) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl10 = () => era.get(`abl:${cid}:10`) || 0;
  const abl11 = () => era.get(`abl:${cid}:11`) || 0;
  const abl17 = () => era.get(`abl:${cid}:17`) || 0;

  if (!mode) era.drawLine(); // :10（干跑不输出）

  if (
    abl17() >= 5 &&
    talent(13) === 0 &&
    talent(33) === 0 &&
    talent(28) === 0 &&
    talent(89) === 0
  ) {
    if (!mode) await era.printAndWait('需要特殊素质才能继续提升'); // :16-18
    return;
  }
  if (abl17() >= 10) {
    if (!mode) await era.printAndWait('已达最高级'); // :19-21
    return;
  }

  for (;;) {
    const lv = abl17();
    // A：:113-135 梯子
    let a = [100, 1000, 3000, 6000, 12000, 25000, 50000, 80000, 120000, 150000][
      lv
    ];

    if (talent(27)) {
      // 戒备森严 :138-147
      if (lv === 3) a = times(a, 1.5);
      if (lv === 4) a = times(a, 2.0);
      if (lv === 5) a = times(a, 2.5);
      if (lv >= 6) a = times(a, 3.0);
    }

    // 异常经验：lv>=3 时需要，六项素质任一命中可免（:149-152）
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

    if (talent(9)) a = times(a, 0.8); // 崩坏 :154-156
    if (talent(10)) a = times(a, 1.2); // 胆怯 :157-159
    if (talent(11)) a = times(a, 1.5); // 反抗心 :160-162
    if (talent(12)) a = times(a, 1.1); // 刚强 :163-165
    if (talent(16)) a = times(a, 1.1); // 嚣张 :166-168
    if (talent(20)) a = times(a, 1.1); // 克制 :169-171
    if (talent(21)) a = times(a, 1.1); // 冷漠 :172-174
    if (talent(22)) a = times(a, 1.5); // 感情淡薄 :175-177
    if (talent(28)) a = times(a, 0.5); // 爱表现 :178-180
    if (talent(30)) a = times(a, 1.2); // 看重贞操 :181-183
    if (talent(31)) a = times(a, 0.9); // 看轻贞操 :184-186
    if (talent(32))
      a = times(a, 1.2); // 压抑 :188-190
    else if (talent(33)) a = times(a, 0.8); // 开放 :191-194
    if (talent(34)) a = times(a, 1.5); // 抵抗 :196-198
    if (talent(35))
      a = times(a, 1.1); // 害羞 :200-202
    else if (talent(36)) a = times(a, 0.9); // 不知羞耻 :203-206
    if (talent(37)) a = times(a, 0.8); // 把柄 :208-210
    if (talent(60)) a = times(a, 0.9); // 容易自慰 :212-214
    if (talent(70))
      a = times(a, 0.9); // 接受快感 :216-218
    else if (talent(71)) a = times(a, 1.2); // 否定快感 :219-222
    if (talent(72)) a = times(a, 0.9); // 容易上瘾 :224-226
    if (talent(73)) a = times(a, 0.5); // 容易陷落 :227-229
    if (talent(76)) a = times(a, 0.8); // 淫乱 :230-232
    if (talent(80)) a = times(a, 0.75); // 倒錯的 :233-235
    if (talent(83)) a = times(a, 1.2); // 施虐狂 :236-238
    if (talent(88)) a = times(a, 0.75); // 受虐狂 :239-241
    if (talent(123)) a = times(a, 0.5); // 疯狂 :242-244

    let i = 0;
    // 欲望/顺从门槛：有[爱慕]时改查顺从，否则查欲望（:246-258）
    if (talent(85) === 0) {
      if (abl11() < lv + 1) i |= 4;
    } else {
      if (abl10() < lv + 1) i |= 4;
    }

    if (a < 1) a = 1; // :260-262

    const exp50_17 = era.get(`exp:${cid}:50`) || 0;
    const c = lv === 0 ? 1 : 0; // :113-115 仅 Lv0→1 需要绝顶经验
    const d = lv === 1 ? 1 : 0; // :116-118 仅 Lv1→2 需要调教自慰经验
    const exp2 = era.get(`exp:${cid}:2`) || 0;
    const exp11 = era.get(`exp:${cid}:11`) || 0;
    if (exp50_17 < b) i |= 2; // :264-266
    if (exp2 < c) i |= 2; // :267-269
    if (exp11 < d) i |= 2; // :270-272

    const juel8 = era.get(`juel:${cid}:8`) || 0;
    if (juel8 < a) i |= 1; // :274-276

    // 干跑出口（decide_ablup17 / core_ablup17）
    if (mode === 'decide') return { i };
    if (mode === 'core') {
      chara(cid).system.露出癖 += 1; // @CORE_ABLUP17: ABL:17 ++
      if (i === 0) era.add(`juel:${cid}:8`, -a); // JUEL:8 -= A
      return 0;
    }

    if (talent(85) === 0) {
      era.print(`${era.get('ablname:11')}LV${lv + 1}以上(现在LV${abl11()})且`); // :41-42
    } else {
      era.print(`${era.get('ablname:10')}LV${lv + 1}以上(现在LV${abl10()})且`); // :45-46
    }
    if (b > 0) {
      era.print(`${era.get('expname:50')}${b}以上(现在${exp50_17})且`); // :50-51
    }
    era.printButton(
      `${era.get('palamname:8')}点数×${juel8}/${a} ……${get_ablup_state(i)}`,
      0,
    ); // :53-55
    era.println();
    if (c > 0) {
      era.print(`　　　${era.get('expname:2')}　${exp2}/${c}`); // :57-58（仅 Lv0→1）
    }
    if (d > 0) {
      era.print(`　　　${era.get('expname:11')}　${exp11}/${d}`); // :60-61（仅 Lv1→2）
    }
    era.printButton('停止', 100); // :63

    const result = await era.input(); // :65
    if (result === 100) {
      return;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件。'); // :68-69（唯一带句号）
      continue;
    } else if (result === 0) {
      const new_lv = (chara(cid).system.露出癖 += 1); // :75
      era.add(`juel:${cid}:8`, -a); // :77-78
      era.print(`${era.get('ablname:17')}变为LV${new_lv}。`); // :81
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 * 源: target/ERB/ABL/ABLUP20.ERB @ABLUP20 :8-81 + @DECIDE_ABLUP20 :97-339。
 * 抖S气质（ABL:20，train 属主——era.add 裸写，同 ablup12-15 先例）。
 * 单轨道：欲情点数（JUEL:5）+ 施虐快乐经验（EXP:33）+ 异常经验（EXP:50）。
 *
 * 本文件自己的三处原作特性，1:1 保留：
 * - 状态文案是 @ABLUP20 内联的 PRINT 链（:49-56），拼接为「点数不足 」
 *   「经验不足」（无尾随空格）「能力不足 」——bit2/bit4 的尾随空格与共享
 *   @GET_ABLUP_STATE（ABLUP0.ERB:97-110，经验不足带空格、能力不足不带）
 *   恰好相反，不能复用 get_ablup_state。
 * - @DECIDE_ABLUP20 的异常经验 C 分两段：C = ABL:20-2 在 :175，戒备森严块
 *   （:153-171）的 TIMES C 在它**之前**——乘的是 0，全部无效；而淫乱
 *   （:276-282）的 TIMES C 在它**之后**，×0.80 真实生效（lv4 无豁免素质时
 *   C = floor(2×0.8) = 1，不是 2）。D/E 在本文件无任何读者，是死写入；
 *   G=1（:178）同样无读者。
 * - 异常经验行（:45）用全角括号「（现在{EXP:50}）」，其余 ABLUP 文件均为
 *   半角。输入越界拦截是 RESULT!=0&&!=100（:66-67），不是 <0||>1 形式。
 */
async function ablup20(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl11 = () => era.get(`abl:${cid}:11`) || 0;
  const abl20 = () => era.get(`abl:${cid}:20`) || 0;
  const abl21 = () => era.get(`abl:${cid}:21`) || 0;

  // @ABLUP20 的内联状态文案（与 get_ablup_state 的尾随空格分布相反）
  const state_text = (i) => {
    if (i === 0) return 'ＯＫ';
    return `${i & 1 ? '点数不足 ' : ''}${i & 2 ? '经验不足' : ''}${i & 4 ? '能力不足 ' : ''}`;
  };

  era.drawLine(); // :9

  if (
    abl20() >= 5 &&
    talent(80) === 0 &&
    talent(83) === 0 &&
    talent(127) === 0
  ) {
    await era.printAndWait('需要特殊素质才能继续提升'); // :15-17
    return;
  }
  if (abl20() + abl21() >= 20) {
    await era.printAndWait(`抖S气质(${abl20()})＋抖M气质(${abl21()})上限为20`); // :19-21
    return;
  }
  if (abl20() >= 10) {
    await era.printAndWait('已达最高级'); // :22-24
    return;
  }

  for (;;) {
    const lv = abl20();
    // A(欲情点数)/B(施虐快乐经验) 梯子 :120-150
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
    // C(异常经验)：lv3/4/7 且无[倒错的/施虐狂/嫉妒/小恶魔]时 = lv-2（:174-175）。
    // 戒备森严（:153-171）的 TIMES C 在赋值前，乘 0 无效；淫乱（:276-282）的
    // 在赋值之后，见下面淫乱块的 ×0.80；D/E/G 无读者，不移植（见函数头注释）
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

    if (talent(10)) a = times(a, 1.5); // 胆怯 :181-183（只乘 A）
    if (talent(11)) {
      // 反抗心 :185-188
      a = times(a, 0.9);
      b = times(b, 0.9);
    }
    if (talent(12)) a = times(a, 0.9); // 刚强 :190-191
    if (talent(14)) a = times(a, 1.2); // 文静 :193-194
    if (talent(16)) {
      // 嚣张 :196-199
      a = times(a, 0.9);
      b = times(b, 0.9);
    }
    if (talent(15)) {
      // 高姿态 :202-204
      a = times(a, 0.9);
      b = times(b, 0.9);
    } else if (talent(17)) {
      // 低姿态 :206-208
      a = times(a, 1.1);
      b = times(b, 1.1);
    }
    if (talent(20)) {
      // 克制 :212-215
      a = times(a, 1.2);
      b = times(b, 1.2);
    }
    if (talent(21)) {
      // 冷漠 :217-220
      a = times(a, 1.2);
      b = times(b, 1.2);
    }
    if (talent(22)) {
      // 感情淡薄 :222-225（B 是 ×1.2 非 ×1.5）
      a = times(a, 1.5);
      b = times(b, 1.2);
    }
    if (talent(23)) {
      // 好奇心 :227-230
      a = times(a, 0.9);
      b = times(b, 0.9);
    }
    if (talent(26)) a = times(a, 1.1); // 悲观的 :232-233
    if (talent(28)) {
      // 爱表现 :235-238
      a = times(a, 0.9);
      b = times(b, 0.9);
    }
    if (talent(30)) {
      // 看重贞操 :240-242
      a = times(a, 1.1);
      b = times(b, 1.1);
    } else if (talent(31)) {
      // 看轻贞操 :244-246
      a = times(a, 0.95);
      b = times(b, 0.95);
    }
    if (talent(32)) {
      // 压抑 :250-252
      a = times(a, 0.95);
      b = times(b, 0.95);
    } else if (talent(33)) {
      // 开放 :254-256
      a = times(a, 0.9);
      b = times(b, 0.9);
    }
    if (talent(79) || talent(82)) {
      // 讨厌男人/男人婆 :260-263
      a = times(a, 0.95);
      b = times(b, 0.95);
    }
    if (talent(40)) {
      // 害怕疼痛 :266-268
      a = times(a, 1.2);
      b = times(b, 1.2);
    } else if (talent(41)) {
      // 不惧疼痛 :270-272
      a = times(a, 0.9);
      b = times(b, 0.9);
    }
    if (talent(76)) {
      // 淫乱 :276-282（TIMES C 在 C 赋值（:175）之后，×0.80 真实生效）
      a = times(a, 0.8);
      b = times(b, 0.8);
      c = times(c, 0.8);
    }
    if (talent(80)) {
      // 倒错的 :284-287
      a = times(a, 0.8);
      b = times(b, 0.8);
    }
    if (talent(83)) {
      // 施虐狂 :289-292
      a = times(a, 0.5);
      b = times(b, 0.5);
    }
    if (talent(88)) {
      // 受虐狂 :294-297
      a = times(a, 1.2);
      b = times(b, 1.2);
    }
    if (talent(84)) {
      // 嫉妒 :299-302
      a = times(a, 0.8);
      b = times(b, 0.8);
    }
    if (talent(87)) {
      // 小恶魔 :304-307
      a = times(a, 0.8);
      b = times(b, 0.8);
    }
    if (talent(123)) {
      // 疯狂 :309-312
      a = times(a, 0.5);
      b = times(b, 0.5);
    }
    if (talent(9)) {
      // 崩坏 :314-317
      a = times(a, 2.0);
      b = times(b, 2.0);
    }

    const juel5 = era.get(`juel:${cid}:5`) || 0;
    const exp33 = era.get(`exp:${cid}:33`) || 0;
    const exp50 = era.get(`exp:${cid}:50`) || 0;
    let i = 0;
    if (juel5 < a) i |= 1; // :320-321
    if (exp33 < b) i |= 2; // :324-325
    if (exp50 < c) i |= 2; // :328-329
    if (abl11() < lv + 1) i |= 4; // :332-333

    era.print(`${era.get('ablname:11')}LV${lv + 1}以上(现在LV${abl11()})且`); // :41
    if (c > 0) {
      era.print(`${era.get('expname:50')}${c}以上（现在${exp50}）且`); // :44-45（全角括号）
    }
    era.printButton(
      `${era.get('palamname:5')}点数×${juel5}/${a} ……${state_text(i)}`,
      0,
    ); // :47-57（内联状态链）
    era.println();
    if (b > 0) {
      era.print(`　　　${era.get('expname:33')}　${exp33}/${b}`); // :60-61
    }
    era.printButton('停止', 100); // :63

    const result = await era.input(); // :65
    if (result === 100) {
      return;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件'); // :68-69
      continue;
    } else if (result === 0) {
      const new_lv = era.add(`abl:${cid}:20`, 1); // :75（train 属主，era.add）
      era.add(`juel:${cid}:5`, -a); // :77
      era.print(`${era.get('ablname:20')}变为LV${new_lv}。`); // :79
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130，:66-67 同款越界分支）
    }
  }
}

/**
 * 源: target/ERB/ABL/ABLUP21.ERB @ABLUP21 :8-111 + @DECIDE_ABLUP21 :131-529。
 * 抖M气质（ABL:21，system 属主——写 chara(cid).system.抖M气质）。
 * 双轨道：[0] 苦痛(JUEL:9)+欲情(JUEL:5)、[1] 苦痛(JUEL:9)+屈服(JUEL:6)；
 * 共用被虐快乐经验（EXP:30，C）与异常经验（F）。[1] 轨另有绝顶经验
 * G=1（全等级，:249）。Lv3 起 A=B=0，[0] 轨以 I=256 隐藏（:503-505），
 * 只剩 [1]。
 */
async function ablup21(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl11 = () => era.get(`abl:${cid}:11`) || 0;
  const abl20 = () => era.get(`abl:${cid}:20`) || 0;
  const abl21 = () => era.get(`abl:${cid}:21`) || 0;

  era.drawLine(); // :9

  if (
    abl21() >= 5 &&
    talent(10) === 0 &&
    talent(14) === 0 &&
    talent(37) === 0 &&
    talent(88) === 0
  ) {
    await era.printAndWait('需要特殊素质才能继续提升'); // :15-17
    return;
  }
  if (abl20() + abl21() >= 20) {
    await era.printAndWait(`抖S气质(${abl20()})＋抖M气质(${abl21()})上限为20`); // :19-21
    return;
  }
  if (abl21() >= 10) {
    await era.printAndWait('已达最高级'); // :22-24
    return;
  }

  for (;;) {
    const lv = abl21();
    // A([0]苦痛)/B(欲情)/C(被虐快乐)/D([1]苦痛)/E(屈服) 梯子 :161-221
    // Lv3 起 A=B=0（[0] 轨隐藏），D/E 持续到 Lv9
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
      // 戒备森严 :224-242（C/D/E 三列）
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

    // F(异常经验)：lv3/4/7 且无[开放/倒错的/受虐狂]时 = lv-2（:245-246）
    let f = 0;
    if (
      (lv === 3 || lv === 4 || lv === 7) &&
      talent(33) === 0 &&
      talent(80) === 0 &&
      talent(88) === 0
    ) {
      f = lv - 2;
    }
    const g = 1; // 绝顶经验需求，全等级 1（:249）

    if (talent(10)) {
      // 胆怯 :252-258（五元组 ×1.10）
      a = times(a, 1.1);
      b = times(b, 1.1);
      c = times(c, 1.1);
      d = times(d, 1.1);
      e = times(e, 1.1);
    }
    if (talent(11)) {
      // 反抗心 :260-266
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
      d = times(d, 1.2);
      e = times(e, 1.2);
    }
    if (talent(12)) {
      // 刚强 :268-274
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
      d = times(d, 1.2);
      e = times(e, 1.2);
    }
    if (talent(16)) {
      // 嚣张 :276-282
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
      d = times(d, 1.2);
      e = times(e, 1.2);
    }
    if (talent(15)) {
      // 高姿态 :285-290 / 低姿态 :292-297
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
      // 克制 :301-307
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
      d = times(d, 1.2);
      e = times(e, 1.2);
    }
    if (talent(21)) {
      // 冷漠 :309-315（×1.10）
      a = times(a, 1.1);
      b = times(b, 1.1);
      c = times(c, 1.1);
      d = times(d, 1.1);
      e = times(e, 1.1);
    }
    if (talent(22)) {
      // 感情淡薄 :317-323
      a = times(a, 1.5);
      b = times(b, 1.5);
      c = times(c, 1.5);
      d = times(d, 1.5);
      e = times(e, 1.5);
    }
    if (talent(24)) {
      // 保守的 :325-331
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
      d = times(d, 1.2);
      e = times(e, 1.2);
    }
    if (talent(26)) {
      // 悲观的 :333-339（×0.90）
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
      d = times(d, 0.9);
      e = times(e, 0.9);
    }
    if (talent(30)) {
      // 看重贞操 :342-347 / 看轻贞操 :349-354
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
      // 压抑 :358-363 / 开放 :365-370（开放 ×0.60）
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
      // 抵抗 :374-380（×2.00）
      a = times(a, 2.0);
      b = times(b, 2.0);
      c = times(c, 2.0);
      d = times(d, 2.0);
      e = times(e, 2.0);
    }
    if (talent(35)) {
      // 害羞 :383-388 / 不知羞耻 :390-395
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
      // 害怕疼痛 :399-404（×1.10）/ 不惧疼痛 :406-411（×0.95）
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
      // 接受快感 :415-420 / 否定快感 :422-427
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
      // 淫乱 :431-437
      a = times(a, 0.8);
      b = times(b, 0.8);
      c = times(c, 0.8);
      d = times(d, 0.8);
      e = times(e, 0.8);
    }
    if (talent(80)) {
      // 倒错的 :439-445（×0.75）
      a = times(a, 0.75);
      b = times(b, 0.75);
      c = times(c, 0.75);
      d = times(d, 0.75);
      e = times(e, 0.75);
    }
    if (talent(83)) {
      // 施虐狂 :447-453（×1.20）
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
      d = times(d, 1.2);
      e = times(e, 1.2);
    }
    if (talent(88)) {
      // 受虐狂 :455-461（×0.50）
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
      d = times(d, 0.5);
      e = times(e, 0.5);
    }
    if (talent(123)) {
      // 疯狂 :463-469（×0.80）
      a = times(a, 0.8);
      b = times(b, 0.8);
      c = times(c, 0.8);
      d = times(d, 0.8);
      e = times(e, 0.8);
    }
    if (talent(9)) {
      // 崩坏 :471-477（×2.00）
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
      // 欲望门槛，双轨同时命中（:480-484）
      i |= 4;
      j |= 4;
    }
    if (exp50 < f) {
      // 异常经验不足，双轨同时命中（:487-490）
      i |= 2;
      j |= 2;
    }
    if (b > 0) {
      // [0] 苦痛+欲情 :493-505
      if (juel9 < a) i |= 1;
      if (juel5 < b) i |= 1;
      if (exp30 < c) i |= 2;
    } else {
      i = 256; // :504（覆盖此前累积的 bit，[0] 隐藏）
    }
    if (d > 0) {
      // [1] 苦痛+屈服 :508-520
      if (juel9 < d) j |= 1;
      if (juel6 < e) j |= 1;
      if (exp30 < c) j |= 2;
      if (exp2 < g) j |= 2;
    } else {
      j = 256; // :522（D 梯子全等级 >0，实际不可达，防御性保留）
    }

    era.print(`${era.get('ablname:11')}LV${lv + 1}以上(现在LV${abl11()})且`); // :51
    if (f > 0) {
      era.print(`${era.get('expname:50')}${f}以上(现在${exp50})且`); // :54-55（半角括号）
    }
    if (b > 0) {
      era.printButton(
        `${era.get('palamname:9')}点数×${juel9}/${a} ……${get_ablup_state(i)}`,
        0,
      ); // :57-59
      era.println();
      era.print(`　　　${era.get('palamname:5')}点数×${juel5}/${b}`); // :61-62
      if (c > 0) {
        era.print(`　　　${era.get('expname:30')}　${exp30}/${c}`); // :64-65
      }
    }
    if (d > 0) {
      era.printButton(
        `${era.get('palamname:9')}点数×${juel9}/${d} ……${get_ablup_state(j)}`,
        1,
      ); // :68-70
      era.println();
      era.print(`　　　${era.get('palamname:6')}点数×${juel6}/${e}`); // :72-73
      if (c > 0) {
        era.print(`　　　${era.get('expname:30')}　${exp30}/${c}`); // :75-76
      }
      if (g > 0) {
        era.print(`　　　${era.get('expname:2')}　${exp2}/${g}`); // :78-79
      }
    }
    era.printButton('停止', 100); // :82

    const result = await era.input(); // :84
    if (result === 100) {
      return;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件'); // :87-88
      continue;
    } else if (result === 1 && j === 256) {
      continue; // :90-91 d===0 时隐藏选项，issue #130
    } else if (result === 1 && j !== 0) {
      era.print('未满足条件'); // :92-93
      continue;
    } else if (result === 0) {
      const new_lv = (chara(cid).system.抖M气质 += 1); // :99（system 属主）
      era.add(`juel:${cid}:9`, -a); // :102-103
      era.add(`juel:${cid}:5`, -b);
      era.print(`${era.get('ablname:21')}变为LV${new_lv}。`); // :109
      return;
    } else if (result === 1) {
      const new_lv = (chara(cid).system.抖M气质 += 1);
      era.add(`juel:${cid}:9`, -d); // :105-106
      era.add(`juel:${cid}:6`, -e);
      era.print(`${era.get('ablname:21')}变为LV${new_lv}。`);
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 * 源: target/ERB/ABL/ABLUP22.ERB @ABLUP22 :8-97 + @DECIDE_ABLUP22 :116-365。
 * 百合气质（ABL:22，chara 属主——写 chara(cid).chara.百合气质）。
 * 男人（TALENT:122）在 DRAWLINE 前直接返回（:10-11）。双轨道：[0] 欲情
 * (JUEL:5)+屈服(JUEL:6)+百合经验(EXP:40)、[1] 阴核点数(JUEL:0)+百合经验；
 * Lv2 起 D=0，[1] 轨以 J=256 隐藏（:357-359）。
 *
 * 显示顺序与其他 ABLUP 相反：异常经验行（:46-47）在欲望行（:50）
 * **之前**。异常经验豁免名单（开放/倒错的/双性恋/疯狂，:214）不含
 * 讨厌男人，与 Lv5 上限豁免名单（:18 多一项 TALENT:82）不同，1:1 保留。
 */
async function ablup22(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl11 = () => era.get(`abl:${cid}:11`) || 0;
  const abl22 = () => era.get(`abl:${cid}:22`) || 0;

  if (talent(122)) return; // :10-11 男人直接返回（DRAWLINE 之前，无输出）

  era.drawLine(); // :12

  if (
    abl22() >= 5 &&
    talent(33) === 0 &&
    talent(80) === 0 &&
    talent(81) === 0 &&
    talent(82) === 0 &&
    talent(123) === 0
  ) {
    await era.printAndWait('需要特殊素质才能继续提升'); // :18-20
    return;
  }
  if (abl22() >= 10) {
    await era.printAndWait('已达最高级'); // :21-23
    return;
  }

  for (;;) {
    const lv = abl22();
    // A(欲情)/B(百合经验)/C(屈服)/D([1]阴核点数) 梯子 :140-190
    // Lv0/1 双轨（D=1000/5000），Lv2 起 D=0（[1] 轨隐藏）
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
      // 戒备森严 :193-211（A/B/C 三列）
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

    // E(异常经验)：lv>=3 且无[开放/倒错的/双性恋/疯狂]时 = lv-2（:214-215，
    // 名单不含 TALENT:82 讨厌男人）
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
      // 坦率 :218-223（四元组 ×0.95）
      a = times(a, 0.95);
      b = times(b, 0.95);
      c = times(c, 0.95);
      d = times(d, 0.95);
    }
    if (talent(21)) {
      // 冷漠 :225-230（×1.20）
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
      d = times(d, 1.2);
    }
    if (talent(23)) {
      // 好奇心 :232-237（×0.95）
      a = times(a, 0.95);
      b = times(b, 0.95);
      c = times(c, 0.95);
      d = times(d, 0.95);
    }
    if (talent(24)) {
      // 保守的 :239-244（×1.20）
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
      d = times(d, 1.2);
    }
    if (talent(30)) {
      // 看重贞操 :247-251 / 看轻贞操 :253-257（×1.20 / ×0.95）
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
      // 献身的 :261-266（×0.95）
      a = times(a, 0.95);
      b = times(b, 0.95);
      c = times(c, 0.95);
      d = times(d, 0.95);
    }
    if (talent(70)) {
      // 接受快感 :269-273 / 否定快感 :275-279（×0.95 / ×1.20）
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
      // 倒错的 :283-288（×0.80）
      a = times(a, 0.8);
      b = times(b, 0.8);
      c = times(c, 0.8);
      d = times(d, 0.8);
    }
    if (talent(79)) {
      // 男人婆 :291-296（×2.00，百合特有）
      a = times(a, 2.0);
      b = times(b, 2.0);
      c = times(c, 2.0);
      d = times(d, 2.0);
    }
    if (talent(81)) {
      // 双性恋 :299-304（×0.50）
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
      d = times(d, 0.5);
    }
    if (talent(82)) {
      // 讨厌男人 :306-311（×0.50）
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
      d = times(d, 0.5);
    }
    if (talent(123)) {
      // 疯狂 :313-318（×0.50）
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
      d = times(d, 0.5);
    }

    if (a < 1) a = 1; // :321-322
    if (b < 1) b = 1; // :323-324（C/D 无底线）

    const juel5 = era.get(`juel:${cid}:5`) || 0;
    const juel6 = era.get(`juel:${cid}:6`) || 0;
    const juel0 = era.get(`juel:${cid}:0`) || 0;
    const exp40 = era.get(`exp:${cid}:40`) || 0;
    const exp50 = era.get(`exp:${cid}:50`) || 0;
    let i = 0;
    let j = 0;
    if (exp50 < e) {
      // 异常经验不足，双轨同时命中（:327-330）
      i |= 2;
      j |= 2;
    }
    if (juel5 < a) i |= 1; // :333-334
    if (juel6 < c) i |= 1; // :336-337
    if (exp40 < b) i |= 2; // :339-340
    if (abl11() < lv + 1) {
      // 欲望门槛，双轨同时命中（:343-347）
      i |= 4;
      j |= 4;
    }
    if (d > 0) {
      // [1] 阴核轨道 :350-356
      if (juel0 < d) j |= 1;
      if (exp40 < b) j |= 2;
    } else {
      j = 256; // :358（lv>=2，[1] 隐藏）
    }

    if (e > 0) {
      era.print(`${era.get('expname:50')}${e}以上(现在${exp50})且`); // :46-47（先异常行）
    }
    era.print(`${era.get('ablname:11')}LV${lv + 1}以上(现在LV${abl11()})且`); // :50（后欲望行）
    era.printButton(
      `${era.get('palamname:5')}点数×${juel5}/${a} ……${get_ablup_state(i)}`,
      0,
    ); // :53-55（恒渲染）
    era.println();
    if (c > 0) {
      era.print(`　　　${era.get('palamname:6')}点数×${juel6}/${c}`); // :56-57
    }
    era.print(`　　　${era.get('expname:40')}　${exp40}/${b}`); // :58
    if (d > 0) {
      era.printButton(
        `${era.get('palamname:0')}点数×${juel0}/${d} ……${get_ablup_state(j)}`,
        1,
      ); // :61-64
      era.println();
      era.print(`　　　${era.get('expname:40')}　${exp40}/${b}`); // :65
    }
    era.printButton('停止', 100); // :68

    const result = await era.input(); // :71
    if (result === 100) {
      return;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件'); // :74-75
      continue;
    } else if (result === 1 && j === 256) {
      continue; // :77-78 d===0 时隐藏选项，issue #130
    } else if (result === 1 && j !== 0) {
      era.print('未满足条件'); // :79-80
      continue;
    } else if (result === 0) {
      const new_lv = (chara(cid).chara.百合气质 += 1); // :86（chara 属主）
      era.add(`juel:${cid}:5`, -a); // :89-90
      era.add(`juel:${cid}:6`, -c);
      era.print(`${era.get('ablname:22')}变为LV${new_lv}。`); // :95
      return;
    } else if (result === 1) {
      const new_lv = (chara(cid).chara.百合气质 += 1);
      era.add(`juel:${cid}:0`, -d); // :92
      era.print(`${era.get('ablname:22')}变为LV${new_lv}。`);
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 * 源: target/ERB/ABL/ABLUP23.ERB @ABLUP23 :8-96 + @DECIDE_ABLUP23 :115-345。
 * 断背气质（ABL:23，system 属主——写 chara(cid).system.断背气质）。
 * 与 ABLUP22 同构（梯子相同），四处不同：非男人（TALENT:122==0）才可用
 * （:10-11）；无欲望门槛行与判定；[1] 轨用肛门点数（JUEL:2）；讨厌男人
 * ×3.00（:257-262，与 ABLUP22 的 ×0.50 相反）且不在 Lv5 豁免名单（
 * :18 / :210 均为 开放/倒错的/双性恋/疯狂 四项）。
 */
async function ablup23(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl23 = () => era.get(`abl:${cid}:23`) || 0;

  if (talent(122) === 0) return; // :10-11 非男人直接返回（无输出）

  era.drawLine(); // :12

  if (
    abl23() >= 5 &&
    talent(33) === 0 &&
    talent(80) === 0 &&
    talent(81) === 0 &&
    talent(123) === 0
  ) {
    await era.printAndWait('需要特殊素质才能继续提升'); // :18-20
    return;
  }
  if (abl23() >= 10) {
    await era.printAndWait('已达最高级'); // :21-23
    return;
  }

  for (;;) {
    const lv = abl23();
    // A(欲情)/B(断背经验)/C(屈服)/D([1]肛门点数) 梯子 :136-186（与 ABLUP22 相同）
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
      // 戒备森严 :189-207（A/B/C 三列，与 ABLUP22 相同）
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

    // E(异常经验)：lv>=3 且无[开放/倒错的/双性恋/疯狂]时 = lv-2（:210-211）
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
      // 坦率 :214-219（×0.95）
      a = times(a, 0.95);
      b = times(b, 0.95);
      c = times(c, 0.95);
      d = times(d, 0.95);
    }
    if (talent(21)) {
      // 冷漠 :221-226（×1.20）
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
      d = times(d, 1.2);
    }
    if (talent(23)) {
      // 好奇心 :228-233（×0.95）
      a = times(a, 0.95);
      b = times(b, 0.95);
      c = times(c, 0.95);
      d = times(d, 0.95);
    }
    if (talent(24)) {
      // 保守的 :235-240（×1.20）
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
      d = times(d, 1.2);
    }
    if (talent(30)) {
      // 看重贞操 :243-247 / 看轻贞操 :249-253（×1.20 / ×0.95）
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
      // 讨厌男人 :257-262（×3.00，与 ABLUP22 相反）
      a = times(a, 3.0);
      b = times(b, 3.0);
      c = times(c, 3.0);
      d = times(d, 3.0);
    }
    if (talent(63)) {
      // 献身的 :264-269（×0.95）
      a = times(a, 0.95);
      b = times(b, 0.95);
      c = times(c, 0.95);
      d = times(d, 0.95);
    }
    if (talent(70)) {
      // 接受快感 :272-276 / 否定快感 :278-282（×0.95 / ×1.20）
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
      // 倒错的 :286-291（×0.80）
      a = times(a, 0.8);
      b = times(b, 0.8);
      c = times(c, 0.8);
      d = times(d, 0.8);
    }
    if (talent(81)) {
      // 双性恋 :293-298（×0.50）
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
      d = times(d, 0.5);
    }
    if (talent(123)) {
      // 疯狂 :300-305（×0.50）
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
      d = times(d, 0.5);
    }

    if (a < 1) a = 1; // :308-309
    if (b < 1) b = 1; // :310-311

    const juel5 = era.get(`juel:${cid}:5`) || 0;
    const juel6 = era.get(`juel:${cid}:6`) || 0;
    const juel2 = era.get(`juel:${cid}:2`) || 0;
    const exp41 = era.get(`exp:${cid}:41`) || 0;
    const exp50 = era.get(`exp:${cid}:50`) || 0;
    let i = 0;
    let j = 0;
    if (exp50 < e) {
      // 异常经验不足，双轨同时命中（:314-317）
      i |= 2;
      j |= 2;
    }
    if (juel5 < a) i |= 1; // :320-321
    if (juel6 < c) i |= 1; // :323-324
    if (exp41 < b) i |= 2; // :326-327
    if (d > 0) {
      // [1] 肛门轨道 :330-336
      if (juel2 < d) j |= 1;
      if (exp41 < b) j |= 2;
    } else {
      j = 256; // :338（lv>=2，[1] 隐藏）
    }

    if (e > 0) {
      era.print(`${era.get('expname:50')}${e}以上(现在${exp50})且`); // :46-47（先异常行，无欲望行）
    }
    era.printButton(
      `${era.get('palamname:5')}点数×${juel5}/${a} ……${get_ablup_state(i)}`,
      0,
    ); // :50-52（恒渲染）
    era.println();
    if (c > 0) {
      era.print(`　　　${era.get('palamname:6')}点数×${juel6}/${c}`); // :53-54
    }
    era.print(`　　　${era.get('expname:41')}　${exp41}/${b}`); // :56
    if (d > 0) {
      era.printButton(
        `${era.get('palamname:2')}点数×${juel2}/${d} ……${get_ablup_state(j)}`,
        1,
      ); // :59-62
      era.println();
      era.print(`　　　${era.get('expname:41')}　${exp41}/${b}`); // :64
    }
    era.printButton('停止', 100); // :67

    const result = await era.input(); // :70
    if (result === 100) {
      return;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件'); // :73-74
      continue;
    } else if (result === 1 && j === 256) {
      continue; // :76-77 d===0 时隐藏选项，issue #130
    } else if (result === 1 && j !== 0) {
      era.print('未满足条件'); // :78-79
      continue;
    } else if (result === 0) {
      const new_lv = (chara(cid).system.断背气质 += 1); // :85（system 属主）
      era.add(`juel:${cid}:5`, -a); // :88-89
      era.add(`juel:${cid}:6`, -c);
      era.print(`${era.get('ablname:23')}变为LV${new_lv}。`); // :94
      return;
    } else if (result === 1) {
      const new_lv = (chara(cid).system.断背气质 += 1);
      era.add(`juel:${cid}:2`, -d); // :91
      era.print(`${era.get('ablname:23')}变为LV${new_lv}。`);
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 * 源: target/ERB/ABL/ABLUP30.ERB @ABLUP30 :9-92 + @DECIDE_ABLUP30 :112-356。
 * 性交中毒（ABL:30，train 属主——era.add）。双轨道：[0] 正常需求、
 * [1] 三倍点数+半经验（A*3/B*3/C/2），两轨恒渲染（无 256 隐藏分支）。
 *
 * 原作的两处不一致，1:1 保留：
 * - Lv5 上限豁免：主流程（:17）是六项素质任一 ==0 即拦（OR），@DECIDE
 *   （:115-116）是六项全 0 才拦（AND）——主流程更严，先拦即返回，DECIDE
 *   的 AND 分支只对六项全有的角色生效（此时条件为假，不拦）。
 * - 组合上限的拦截判定（:26）查 JUEL:6 ≥ 30²×1000 且 JUEL:5 ≥ 30²×300，
 *   而提示文案（:27）写「欲情…1000 / 屈服…300」——判定与文案的表交叉
 *   错位，照抄。
 * @DECIDE_ABLUP30:118 的 `SIF 30+31 >= 20 RETURN 0` 会令需求归零＝免费
 * 购买，但正常流程合计 19 封顶（30、31 各自 Lv10 即封顶无购买入口），
 * 该分支不可达、未移植（不登记 issue #14）。
 */
async function ablup30(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl16 = () => era.get(`abl:${cid}:16`) || 0;
  const abl30 = () => era.get(`abl:${cid}:30`) || 0;
  const abl31 = () => era.get(`abl:${cid}:31`) || 0;

  era.drawLine(); // :10

  if (
    abl30() >= 5 &&
    (talent(85) === 0 ||
      talent(76) === 0 ||
      talent(63) === 0 ||
      talent(70) === 0 ||
      talent(75) === 0 ||
      talent(77) === 0)
  ) {
    await era.printAndWait('需要特殊素质才能继续提升'); // :17-19（OR：任一为 0 即拦）
    return;
  }
  if (abl30() >= 10) {
    await era.printAndWait('已达最高级'); // :20-22
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
      ); // :27
      era.print(
        `至少达成${era.get('palamname:5')}点数${abl30() * abl30() * 1000}点或${era.get('palamname:6')}点数${abl30() * abl30() * 300}点的其中一项`,
      ); // :28（文案的表与判定交叉，原作如此）
      await era.printAndWait('方可提升当前性交中毒的等级'); // :29
      return;
    }
  }

  for (;;) {
    const lv = abl30();
    // A(欲情)/B(屈服)/C(性交经验) 梯子 :129-169
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
      // 戒备森严 :172-190（A/B/C 三列）
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
      // 刚强 :193-197（×1.20）
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
    }
    if (talent(20)) {
      // 克制 :199-203（×1.20）
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
    }
    if (talent(21)) {
      // 冷漠 :205-209（×1.20）
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
    }
    if (talent(24)) {
      // 保守的 :211-215（×1.20）
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
    }
    if (talent(30)) {
      // 看重贞操 :218-222 / 看轻贞操 :223-227（×1.20 / ×0.90）
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
    } else if (talent(31)) {
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
    }
    if (talent(32)) {
      // 压抑 :230-234 / 开放 :235-239（×1.20 / ×0.80）
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
    } else if (talent(33)) {
      a = times(a, 0.8);
      b = times(b, 0.8);
      c = times(c, 0.8);
    }
    if (talent(34)) {
      // 抵抗 :242-246（×1.20）
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
    }
    if (talent(35)) {
      // 害羞 :249-253 / 不知羞耻 :254-258（×1.10 / ×0.95）
      a = times(a, 1.1);
      b = times(b, 1.1);
      c = times(c, 1.1);
    } else if (talent(36)) {
      a = times(a, 0.95);
      b = times(b, 0.95);
      c = times(c, 0.95);
    }
    if (talent(70)) {
      // 接受快感 :261-265 / 否定快感 :266-270（×0.90 / ×1.20）
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
    } else if (talent(71)) {
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
    }
    if (talent(72)) {
      // 容易上瘾 :272-276（×0.60）
      a = times(a, 0.6);
      b = times(b, 0.6);
      c = times(c, 0.6);
    }
    if (talent(73)) {
      // 容易陷落 :278-282（×0.50）
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
    }
    if (talent(76)) {
      // 淫乱 :284-288（×0.80）
      a = times(a, 0.8);
      b = times(b, 0.8);
      c = times(c, 0.8);
    }
    if (talent(87)) {
      // 小恶魔 :290-294（×0.90）
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
    }
    if (talent(123)) {
      // 疯狂 :296-300（×0.80）
      a = times(a, 0.8);
      b = times(b, 0.8);
      c = times(c, 0.8);
    }
    if (talent(9)) {
      // 崩坏 :302-306（×0.80，非 ABLUP20/21 的 ×2.00）
      a = times(a, 0.8);
      b = times(b, 0.8);
      c = times(c, 0.8);
    }

    if (a < 1) a = 1; // :309-310
    if (b < 1) b = 1; // :311-312
    if (c < 1) c = 1; // :313-314

    // F(异常经验)：lv>=2 且无[开放/容易上瘾/淫乱/疯狂]时 = lv-1，不足即
    // 双轨同置 bit2（:317-324）
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
      // 侍奉精神门槛，双轨同时命中（:327-330）
      i |= 4;
      j |= 4;
    }
    if (juel5 < a) i |= 1; // :343-344
    if (juel6 < b) i |= 1; // :346-347
    if (exp5 < c) i |= 2; // :349-350
    if (juel5 < a * 3) j |= 1; // :353-354
    if (juel6 < b * 3) j |= 1; // :346-347
    if (exp5 < Math.floor(c / 2)) j |= 2; // :349-350（C/2 整除）

    if (f > 0) {
      era.print(`${era.get('expname:50')}${f}以上(现在${exp50})且`); // :46-47
    }
    era.print(`${era.get('ablname:16')}LV${lv + 1}以上(现在LV${abl16()})且`); // :50
    era.printButton(
      `${era.get('palamname:5')}点数×${juel5}/${a} ……${get_ablup_state(i)}`,
      0,
    ); // :53-55（恒渲染）
    era.println();
    era.print(`　　　${era.get('palamname:6')}点数×${juel6}/${b}`); // :56
    era.print(`　　　${era.get('expname:5')}　${exp5}/${c}`); // :57
    era.printButton(
      `${era.get('palamname:5')}点数×${juel5}/${a * 3} ……${get_ablup_state(j)}`,
      1,
    ); // :60-62（恒渲染，无 256 分支）
    era.println();
    era.print(`　　　${era.get('palamname:6')}点数×${juel6}/${b * 3}`); // :63
    era.print(`　　　${era.get('expname:5')}　${exp5}/${Math.floor(c / 2)}`); // :64
    era.printButton('停止', 100); // :66

    const result = await era.input(); // :68
    if (result === 100) {
      return;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件'); // :71-72
      continue;
    } else if (result === 1 && j !== 0) {
      era.print('未满足条件'); // :74-75
      continue;
    } else if (result === 0) {
      const new_lv = era.add(`abl:${cid}:30`, 1); // :81（train 属主）
      era.add(`juel:${cid}:5`, -a); // :83-84
      era.add(`juel:${cid}:6`, -b);
      era.print(`${era.get('ablname:30')}变为LV${new_lv}。`); // :90
      return;
    } else if (result === 1) {
      const new_lv = era.add(`abl:${cid}:30`, 1);
      era.add(`juel:${cid}:5`, -a * 3); // :86-87
      era.add(`juel:${cid}:6`, -b * 3);
      era.print(`${era.get('ablname:30')}变为LV${new_lv}。`);
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 * 源: target/ERB/ABL/ABLUP31.ERB @ABLUP31 :11-107 + @DECIDE_ABLUP31 :121-349。
 * 自慰中毒（ABL:31，train 属主——era.add）。双轨道同价：[0] 自慰经验
 * (EXP:10)、[1] 调教自慰经验(EXP:11)，点数需求与扣点完全相同（欲情
 * JUEL:5 + 阴核 JUEL:0 + 耻情 JUEL:8，:95-99）。
 * 与 ABLUP30 相反的两处，1:1 保留：Lv5 上限豁免是六项全 0 才拦（AND，
 * :17）；组合上限判定与提示文案的表一致（欲情 31²×2550 / 阴核 31²×15000
 * / 耻情 31²×2000，:22-23）。异常经验 F 只在 lv==2 需要（:152-160，注释写
 * 「LV2→3、3→4、4→5」但代码只判 ==2），判定在 :155-159 与 :203-205 重复
 * 执行（同条件，移植时等价合并为一次）。@DECIDE:127-128 的 `SIF 30+31 >= 20
 * RETURN 0` 理论免费分支同 ABLUP30——正常流程不可达，未移植。
 */
async function ablup31(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl0 = () => era.get(`abl:${cid}:0`) || 0;
  const abl17 = () => era.get(`abl:${cid}:17`) || 0;
  const abl30 = () => era.get(`abl:${cid}:30`) || 0;
  const abl31 = () => era.get(`abl:${cid}:31`) || 0;

  era.drawLine(); // :12

  if (
    abl31() >= 5 &&
    talent(85) === 0 &&
    talent(76) === 0 &&
    talent(60) === 0 &&
    talent(70) === 0 &&
    talent(74) === 0 &&
    talent(78) === 0
  ) {
    await era.printAndWait('需要特殊素质才能继续提升'); // :16-18（AND：全 0 才拦）
    return;
  }
  if (abl31() >= 10) {
    await era.printAndWait('已达最高级'); // :19-21
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
      era.print(`性交中毒(${abl30()})＋自慰中毒(${abl31()})上限为10`); // :26（PRINTFORML，与 ABLUP30 的 PRINTFORMW 不同）
      era.print(
        `至少达成${era.get('palamname:5')}点数${abl31() * abl31() * 2550}点、${era.get('palamname:0')}点数${abl31() * abl31() * 15000}点或${era.get('palamname:8')}点数${abl31() * abl31() * 2000}点的其中一项`,
      ); // :27
      await era.printAndWait('方可提升当前自慰中毒的等级'); // :28
      return;
    }
  }

  for (;;) {
    const lv = abl31();
    // A(欲情)/B(阴核)/C(耻情)/D([0]自慰经验)/E([1]调教自慰经验) 梯子 :142-191
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
      // 戒备森严 :194-216（A-E 五列）
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

    // F(异常经验)：仅 lv==2 且无[开放/容易自慰/容易上瘾/淫乱/疯狂]时 = 1，
    // 不足即双轨同置 bit2（:151-161）
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
      // 容易自慰 :163-168（A-D 四列 ×0.25，E 不受影响）
      a = times(a, 0.25);
      b = times(b, 0.25);
      c = times(c, 0.25);
      d = times(d, 0.25);
    }
    if (talent(72)) {
      // 容易上瘾 :169-174（×0.50）
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
      d = times(d, 0.5);
    }
    if (talent(80)) {
      // 倒错的 :175-180（×0.75）
      a = times(a, 0.75);
      b = times(b, 0.75);
      c = times(c, 0.75);
      d = times(d, 0.75);
    }
    if (talent(76)) {
      // 淫乱化 :182-187（×0.50）
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
      d = times(d, 0.5);
    }

    const exp50 = era.get(`exp:${cid}:50`) || 0;
    // 异常经验检查：原作在 F 段（:155-159）与素质修正后（:203-205）重复执行
    // 两次同条件判定，等价合并为一次
    let i = 0;
    let j = 0;
    if (f > exp50) {
      i |= 2;
      j |= 2;
    }
    if (abl17() < lv + 1) {
      // 露出癖门槛（:207-212）
      i |= 4;
      j |= 4;
    }
    if (abl0() < lv + 1) {
      // 阴蒂感觉门槛（:214-219）
      i |= 4;
      j |= 4;
    }

    if (a < 1) a = 1; // :221-222
    if (b < 1) b = 1; // :223-224
    if (c < 1) c = 1; // :225-226
    if (d < 1) d = 1; // :227-228
    if (e < 1) e = 1; // :229-230

    const juel5 = era.get(`juel:${cid}:5`) || 0;
    const juel0 = era.get(`juel:${cid}:0`) || 0;
    const juel8 = era.get(`juel:${cid}:8`) || 0;
    const exp10 = era.get(`exp:${cid}:10`) || 0;
    const exp11 = era.get(`exp:${cid}:11`) || 0;
    if (juel5 < a) i |= 1; // :234-235
    if (juel0 < b) i |= 1; // :237-238
    if (juel8 < c) i |= 1; // :240-241
    if (exp10 < d) i |= 2; // :243-244
    if (juel5 < a) j |= 1; // :247-248
    if (juel0 < b) j |= 1; // :333
    if (juel8 < c) j |= 1; // :251-252
    if (exp11 < e) j |= 2; // :254-255

    if (f > 0) {
      era.print(`${era.get('expname:50')}${f}以上(现在${exp50})且`); // :56-57
    }
    era.print(`${era.get('ablname:17')}LV${lv + 1}以上(现在LV${abl17()})且`); // :59-60
    era.print(`${era.get('ablname:0')}LV${lv + 1}以上(现在LV${abl0()})且`); // :62-63
    era.printButton(
      `${era.get('palamname:5')}点数×${juel5}/${a} ……${get_ablup_state(i)}`,
      0,
    ); // :65-68（恒渲染）
    era.println();
    era.print(`　　　${era.get('palamname:0')}点数×${juel0}/${b}`); // :69-70
    era.print(`　　　${era.get('palamname:8')}点数×${juel8}/${c}`); // :71
    era.print(`　　　${era.get('expname:10')}　${exp10}/${d}`); // :71
    era.printButton(
      `${era.get('palamname:5')}点数×${juel5}/${a} ……${get_ablup_state(j)}`,
      1,
    ); // :74-77（恒渲染，与 [0] 同分母）
    era.println();
    era.print(`　　　${era.get('palamname:0')}点数×${juel0}/${b}`); // :78
    era.print(`　　　${era.get('palamname:8')}点数×${juel8}/${c}`); // :79
    era.print(`　　　${era.get('expname:11')}　${exp11}/${e}`); // :80
    era.printButton('停止', 100); // :82

    const result = await era.input(); // :84
    if (result === 100) {
      return;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件'); // :87-88
      continue;
    } else if (result === 1 && j !== 0) {
      era.print('未满足条件'); // :90-91
      continue;
    } else if (result === 0 || result === 1) {
      const new_lv = era.add(`abl:${cid}:31`, 1); // :99（train 属主；两轨扣点相同）
      era.add(`juel:${cid}:5`, -a); // :101-103
      era.add(`juel:${cid}:0`, -b);
      era.add(`juel:${cid}:8`, -c);
      era.print(`${era.get('ablname:31')}变为LV${new_lv}。`); // :104
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 * 源: target/ERB/ABL/ABLUP32.ERB @ABLUP32 :11-104 + @DECIDE_ABLUP32 :118-373。
 * 精液中毒（ABL:32，train 属主——era.add）。双轨道：[0] 正常需求、
 * [1] 三倍点数+半经验（A*3/B*3/C/2），恒渲染。前置门槛按 TALENT:76
 * （淫乱）二选一：无淫乱查侍奉精神（ABL:16）、有淫乱改查欲望（ABL:11）
 * （:54-59 / :246-261）。
 *
 * 原作的数值不一致，1:1 保留：组合上限的拦截判定（:22）用 32²×6500（欲情
 * JUEL:5）/32²×19000（屈服 JUEL:6），而提示文案（:24）写 32²×4000——
 * 玩家满足提示值仍可能被拦。合计≥10 且珠够时，@DECIDE 的 A/B 直接覆盖为
 * 32²×4000/32²×19000（:148-152），**梯子值作废**，且覆盖发生在戒备森严
 * （:154-176）之前——戒备森严作用于覆盖后的值。@DECIDE:131 的
 * `SIF 32+33+39 >= 30 RETURN 0` 理论免费分支正常流程不可达（三个中毒各
 * Lv10 封顶即无购买入口），未移植。
 */
async function ablup32(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl11 = () => era.get(`abl:${cid}:11`) || 0;
  const abl16 = () => era.get(`abl:${cid}:16`) || 0;
  const abl32 = () => era.get(`abl:${cid}:32`) || 0;
  const abl33 = () => era.get(`abl:${cid}:33`) || 0;
  const abl39 = () => era.get(`abl:${cid}:39`) || 0;

  era.drawLine(); // :12

  if (
    abl32() >= 5 &&
    talent(76) === 0 &&
    talent(50) === 0 &&
    talent(61) === 0 &&
    talent(64) === 0 &&
    talent(47) === 0
  ) {
    await era.printAndWait('需要特殊素质才能继续提升'); // :16-18（AND：全 0 才拦）
    return;
  }
  if (abl32() >= 10) {
    await era.printAndWait('已达最高级'); // :19-21
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
      ); // :25
      era.print(
        `至少达成${era.get('palamname:5')}点数${abl32() * abl32() * 4000}点或${era.get('palamname:6')}点数${abl32() * abl32() * 19000}点的其中一项`,
      ); // :26（文案写 4000，判定用 6500，原作如此）
      await era.printAndWait('方可提升当前精液中毒的等级'); // :27
      return;
    }
  }

  for (;;) {
    const lv = abl32();
    // A(欲情)/B(屈服)/C(精液经验) 梯子 :133-175
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
      // 组合上限突破价：直接覆盖梯子值（:145-149），先于戒备森严
      a = abl32() * abl32() * 4000;
      b = abl32() * abl32() * 19000;
    }

    if (talent(27)) {
      // 戒备森严 :154-176（作用于覆盖后的 A/B/C）
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

    // D(异常经验)：lv>=2 且无[不怕污臭/容易上瘾/倒错的/疯狂/喜欢精液]时
    // = lv-1（:179-180）
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
      // 反抗心 :182-186（×1.50）
      a = times(a, 1.5);
      b = times(b, 1.5);
      c = times(c, 1.5);
    }
    if (talent(22)) {
      // 感情淡薄 :187-191（×0.95）
      a = times(a, 0.95);
      b = times(b, 0.95);
      c = times(c, 0.95);
    }
    if (talent(24)) {
      // 保守的 :192-197（×1.20）
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
    }
    if (talent(32)) {
      // 压抑 :198-203 / 开放 :204-209（×1.20 / ×0.80）
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
    } else if (talent(33)) {
      a = times(a, 0.8);
      b = times(b, 0.8);
      c = times(c, 0.8);
    }
    if (talent(34)) {
      // 抵抗 :210-215（×2.00）
      a = times(a, 2.0);
      b = times(b, 2.0);
      c = times(c, 2.0);
    }
    if (talent(47)) {
      // 喜欢精液 :216-220（×0.50）
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
    }
    if (talent(52)) {
      // 擅用舌头 :222-226（×0.95）
      a = times(a, 0.95);
      b = times(b, 0.95);
      c = times(c, 0.95);
    }
    if (talent(61)) {
      // 不怕污臭 :227-231（×0.90）/ 反感污臭 :232-237（×2.00）
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
    } else if (talent(62)) {
      a = times(a, 2.0);
      b = times(b, 2.0);
      c = times(c, 2.0);
    }
    if (talent(64)) {
      // 不怕脏 :239-243（×0.90）
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
    }
    if (talent(72)) {
      // 容易上瘾 :245-249（×0.50）
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
    }
    if (talent(73)) {
      // 容易陷落 :250-254（×0.50）
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
    }
    if (talent(76)) {
      // 淫乱 :255-259（×0.90）
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
    }
    if (talent(80)) {
      // 倒错的 :260-265（×0.75）
      a = times(a, 0.75);
      b = times(b, 0.75);
      c = times(c, 0.75);
    }
    if (talent(87)) {
      // 小恶魔 :266-270（×0.95）
      a = times(a, 0.95);
      b = times(b, 0.95);
      c = times(c, 0.95);
    }
    if (talent(123)) {
      // 疯狂 :271-275（×0.90）
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
    }
    if (talent(9)) {
      // 崩坏 :276-280（×0.90）
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
    }

    if (a < 1) a = 1; // :329
    if (b < 1) b = 1; // :285-286
    if (c < 1) c = 1; // :287-288

    const juel5 = era.get(`juel:${cid}:5`) || 0;
    const juel6 = era.get(`juel:${cid}:6`) || 0;
    const exp20 = era.get(`exp:${cid}:20`) || 0;
    const exp50 = era.get(`exp:${cid}:50`) || 0;
    let i = 0;
    let j = 0;
    if (d > exp50) {
      // 异常经验不足，双轨同时命中（:290-295）
      i |= 2;
      j |= 2;
    }
    if (talent(76) === 0) {
      // 无淫乱：侍奉精神门槛（:296-301）
      if (abl16() < lv + 1) {
        i |= 4;
        j |= 4;
      }
    } else if (talent(76) === 1) {
      // 有淫乱：改查欲望（:302-307）
      if (abl11() < lv + 1) {
        i |= 4;
        j |= 4;
      }
    }
    if (juel5 < a) i |= 1; // :310-311
    if (juel6 < b) i |= 1; // :313-314
    if (exp20 < c) i |= 2; // :316-317
    if (juel5 < a * 3) j |= 1; // :320-321
    if (juel6 < b * 3) j |= 1; // :372
    if (exp20 < Math.floor(c / 2)) j |= 2; // :375（C/2 整除）

    if (d > 0) {
      era.print(`${era.get('expname:50')}${d}以上(现在${exp50})且`); // :51-53
    }
    if (talent(76) === 0) {
      era.print(`${era.get('ablname:16')}LV${lv + 1}以上(现在LV${abl16()})且`); // :54-56
    } else if (talent(76) === 1) {
      era.print(`${era.get('ablname:11')}LV${lv + 1}以上(现在LV${abl11()})且`); // :57-59
    }
    era.printButton(
      `${era.get('palamname:5')}点数×${juel5}/${a} ……${get_ablup_state(i)}`,
      0,
    ); // :62-65（恒渲染）
    era.println();
    era.print(`　　　${era.get('palamname:6')}点数×${juel6}/${b}`); // :66-67
    era.print(`　　　${era.get('expname:20')}　${exp20}/${c}`); // :68
    era.printButton(
      `${era.get('palamname:5')}点数×${juel5}/${a * 3} ……${get_ablup_state(j)}`,
      1,
    ); // :69-72（恒渲染，无 256 分支）
    era.println();
    era.print(`　　　${era.get('palamname:6')}点数×${juel6}/${b * 3}`); // :73-74
    era.print(`　　　${era.get('expname:20')}　${exp20}/${Math.floor(c / 2)}`); // :75
    era.printButton('停止', 100); // :77

    const result = await era.input(); // :79
    if (result === 100) {
      return;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件'); // :82-83
      continue;
    } else if (result === 1 && j !== 0) {
      era.print('未满足条件'); // :85-86
      continue;
    } else if (result === 0) {
      const new_lv = era.add(`abl:${cid}:32`, 1); // :93（train 属主）
      era.add(`juel:${cid}:5`, -a); // :95-96
      era.add(`juel:${cid}:6`, -b);
      era.print(`${era.get('ablname:32')}变为LV${new_lv}。`); // :101
      return;
    } else if (result === 1) {
      const new_lv = era.add(`abl:${cid}:32`, 1);
      era.add(`juel:${cid}:5`, -a * 3); // :97-98
      era.add(`juel:${cid}:6`, -b * 3);
      era.print(`${era.get('ablname:32')}变为LV${new_lv}。`);
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 * 源: target/ERB/ABL/ABLUP33.ERB @ABLUP33 :12-89 + @DECIDE_ABLUP33 :103-380。
 * 百合中毒（ABL:33，train 属主——era.add）。单轨道 [0]：按钮是阴核点数
 * （JUEL:0，需求 B），欲情（JUEL:5）与屈服（JUEL:6）的需求同为 A（:57/:60-
 * 61 的分母都是 {A}，:80-82 三项同扣）。男人（TALENT:122）直接返回。
 * 输入越界拦截是 RESULT>0（:67，其余 ABLUP30-32 是 >1）。
 * @DECIDE_ABLUP33 的 `J |= 2`（:357-359）/`J |= 4`（:365-366）写进全局
 * J，但 J 在本文件（主流程与 @CORE_ABLUP33）无任何初始化与读者——
 * 跨函数污染全局变量的死写入，JS 局部变量模型下无意义，不移植。
 * 组合上限同 ABLUP32（判定与文案一致：欲情/屈服 33²×4000、阴核 33²×10000，
 * :29-30）；合计≥10 且珠够时 A/B 覆盖为 33²×4000/33²×10000（:158-162），
 * 先于戒备森严。@DECIDE:131 的 `>= 30 RETURN 0` 理论免费分支不可达。
 */
async function ablup33(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl22 = () => era.get(`abl:${cid}:22`) || 0;
  const abl32 = () => era.get(`abl:${cid}:32`) || 0;
  const abl33 = () => era.get(`abl:${cid}:33`) || 0;
  const abl39 = () => era.get(`abl:${cid}:39`) || 0;

  if (talent(122)) return; // :13-15 男人直接返回（DRAWLINE 之前，无输出）

  era.drawLine(); // :16

  if (
    abl33() >= 5 &&
    talent(76) === 0 &&
    talent(80) === 0 &&
    talent(81) === 0 &&
    talent(82) === 0
  ) {
    await era.printAndWait('需要特殊素质才能继续提升'); // :24-26
    return;
  }
  if (abl33() >= 10) {
    await era.printAndWait('已达最高级'); // :27-29
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
      ); // :28
      era.print(
        `至少达成${era.get('palamname:5')}点数${abl33() * abl33() * 4000}点、${era.get('palamname:6')}点数${abl33() * abl33() * 4000}点或${era.get('palamname:0')}点数${abl33() * abl33() * 10000}点的其中一项`,
      ); // :29
      await era.printAndWait('方可提升当前百合中毒的等级'); // :30
      return;
    }
  }

  for (;;) {
    const lv = abl33();
    // A(欲情=屈服需求)/B([0]阴核点数)/C(百合经验) 梯子 :136-175
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
      // 组合上限突破价：直接覆盖梯子值（:158-162），先于戒备森严
      a = abl33() * abl33() * 4000;
      b = abl33() * abl33() * 10000;
    }

    if (talent(27)) {
      // 戒备森严 :164-186（作用于覆盖后的 A/B/C）
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

    // D(异常经验)：lv>=2 且无[容易上瘾/倒错的/双性恋/讨厌男人/疯狂]时
    // = lv-1（:189-190）
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
      // 反抗心 :192-196（×1.50）
      a = times(a, 1.5);
      b = times(b, 1.5);
      c = times(c, 1.5);
    }
    if (talent(20)) {
      // 克制 :197-202（×1.20）
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
    }
    if (talent(21)) {
      // 冷漠 :203-208（×1.20）
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
    }
    if (talent(24)) {
      // 保守的 :209-214（×1.50，非 ABLUP22/23 的 ×1.20）
      a = times(a, 1.5);
      b = times(b, 1.5);
      c = times(c, 1.5);
    }
    if (talent(32)) {
      // 压抑 :215-220 / 开放 :221-226（×1.20 / ×0.80）
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
    } else if (talent(33)) {
      a = times(a, 0.8);
      b = times(b, 0.8);
      c = times(c, 0.8);
    }
    if (talent(34)) {
      // 抵抗 :227-232（×2.00）
      a = times(a, 2.0);
      b = times(b, 2.0);
      c = times(c, 2.0);
    }
    if (talent(52)) {
      // 擅用舌头 :233-237（×0.90）
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
    }
    if (talent(61)) {
      // 不怕污臭 :238-242（×0.95）
      a = times(a, 0.95);
      b = times(b, 0.95);
      c = times(c, 0.95);
    }
    if (talent(63)) {
      // 献身的 :243-247（×0.90）
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
    }
    if (talent(64)) {
      // 不怕脏 :248-252（×0.95）
      a = times(a, 0.95);
      b = times(b, 0.95);
      c = times(c, 0.95);
    }
    if (talent(70)) {
      // 接受快感 :253-258 / 否定快感 :259-264（×0.90 / ×1.10）
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
    } else if (talent(71)) {
      a = times(a, 1.1);
      b = times(b, 1.1);
      c = times(c, 1.1);
    }
    if (talent(72)) {
      // 容易上瘾 :265-269（×0.50）
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
    }
    if (talent(73)) {
      // 容易陷落 :270-274（×0.50）
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
    }
    if (talent(76)) {
      // 淫乱 :275-279（×0.75）
      a = times(a, 0.75);
      b = times(b, 0.75);
      c = times(c, 0.75);
    }
    if (talent(79)) {
      // 男人婆 :281-286（×2.00）
      a = times(a, 2.0);
      b = times(b, 2.0);
      c = times(c, 2.0);
    }
    if (talent(80)) {
      // 倒错的 :287-292（×0.75）
      a = times(a, 0.75);
      b = times(b, 0.75);
      c = times(c, 0.75);
    }
    if (talent(81)) {
      // 双性恋 :293-298（×0.50）
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
    }
    if (talent(82)) {
      // 讨厌男人 :299-304（×0.50）
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
    }
    if (talent(87)) {
      // 小恶魔 :305-310（×0.90）
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
    }
    if (talent(123)) {
      // 疯狂 :311-316（×0.50）
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
    }
    if (talent(9)) {
      // 崩坏 :317-322（×0.80）
      a = times(a, 0.8);
      b = times(b, 0.8);
      c = times(c, 0.8);
    }

    if (a < 1) a = 1; // :325-326
    if (b < 1) b = 1; // :327-328
    if (c < 1) c = 1; // :345

    const juel0 = era.get(`juel:${cid}:0`) || 0;
    const juel5 = era.get(`juel:${cid}:5`) || 0;
    const juel6 = era.get(`juel:${cid}:6`) || 0;
    const exp40 = era.get(`exp:${cid}:40`) || 0;
    const exp50 = era.get(`exp:${cid}:50`) || 0;
    let i = 0;
    if (d > exp50) i |= 2; // :333-337（异常经验；原作的 J|=2 是死写入）
    if (abl22() < lv + 1) i |= 4; // :339-344（百合气质门槛；J|=4 同为死写入）
    if (juel0 < b) i |= 1; // :346-347
    if (juel5 < a) i |= 1; // :349-350
    if (juel6 < a) i |= 1; // :367（欲情/屈服需求同为 A）
    if (exp40 < c) i |= 2; // :355-356

    if (d > 0) {
      era.print(`${era.get('expname:50')}${d}以上(现在${exp50})且`); // :51-53
    }
    era.print(`${era.get('ablname:22')}LV${lv + 1}以上(现在LV${abl22()})且`); // :54-55
    era.printButton(
      `${era.get('palamname:0')}点数×${juel0}/${b} ……${get_ablup_state(i)}`,
      0,
    ); // :56-58
    era.println();
    era.print(`　　　${era.get('palamname:5')}点数×${juel5}/${a}`); // :59-60
    era.print(`　　　${era.get('palamname:6')}点数×${juel6}/${a}`); // :61（分母同为 A）
    era.print(`　　　${era.get('expname:40')}　${exp40}/${c}`); // :62
    era.printButton('停止', 100); // :64

    const result = await era.input(); // :66
    if (result === 100) {
      return;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件'); // :69-70
      continue;
    } else if (result === 0) {
      const new_lv = era.add(`abl:${cid}:33`, 1); // :76（train 属主）
      era.add(`juel:${cid}:0`, -b); // :78-80
      era.add(`juel:${cid}:5`, -a);
      era.add(`juel:${cid}:6`, -a);
      era.print(`${era.get('ablname:33')}变为LV${new_lv}。`); // :83
      return;
    } else {
      continue; // :67-68 RESULT>0 越界分支，引擎层拒收代位（issue #130）
    }
  }
}

/**
 * 源: target/ERB/ABL/ABLUP37.ERB @ABLUP37 :8-77 + @DECIDE_ABLUP37 :94-358。
 * 卖淫中毒，train 域（裸写 abl。三珠资源 A(恭顺 JUEL:4)/B(欲情
 * JUEL:5)/C(屈服 JUEL:6) + D(卖淫经验 EXP:74)；F(异常经验) lv>=2 起要
 * （疯狂/崩坏可免），17 项素质增减表。淫乱的 B 轨 ×0.50、其余 ×0.80——
 * 原作不对称倍率，1:1 保留。@DECIDE_ABLUP37 的 J 位（|=2/|=4）与 I 同
 * 置但全库无读者，不镜像。@CORE_ABLUP37 见本文件 core_ablup37。
 */
async function ablup37(cid, mode) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl11 = () => era.get(`abl:${cid}:11`) || 0;
  const abl37 = () => era.get(`abl:${cid}:37`) || 0;

  if (!mode) era.drawLine(); // :10 DRAWLINE（:11-14 叙事文本已被注释掉，不移植）

  if (
    abl37() >= 5 &&
    talent(76) === 0 &&
    talent(31) === 0 &&
    talent(180) === 0
  ) {
    if (!mode) await era.printAndWait('需要特殊素质才能继续提升'); // :15-17
    return;
  }
  if (abl37() >= 10) {
    if (!mode) await era.printAndWait('已达最高级'); // :18-20
    return;
  }

  for (;;) {
    const lv = abl37();
    // A/B/C/D：:104-148 梯子
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
      // 戒备森严 :150-162（IF/ELSEIF 互斥，A/B/C/D 全乘）
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
      // 反抗心 :164-168
      a = times(a, 1.5);
      b = times(b, 1.5);
      c = times(c, 1.5);
      d = times(d, 1.5);
    }
    if (talent(12)) {
      // 刚强 :169-173
      a = times(a, 1.2);
      b = times(b, 1.2);
      c = times(c, 1.2);
      d = times(d, 1.2);
    }
    if (talent(20)) {
      // 克制 :174-178
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
      // 悲观的 :185-191
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
      d = times(d, 0.9);
    }
    if (talent(28)) {
      // 爱表现 :192-198
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
      d = times(d, 0.9);
    }
    if (talent(30)) {
      // 看重贞操 :199-203（ELSEIF 对，互斥）
      a = times(a, 2.0);
      b = times(b, 2.0);
      c = times(c, 2.0);
      d = times(d, 2.0);
    } else if (talent(31)) {
      // 看轻贞操 :204-208
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
      // 开放 :214-217
      a = times(a, 0.8);
      b = times(b, 0.8);
      c = times(c, 0.8);
      d = times(d, 0.8);
    }
    if (talent(34)) {
      // 抵抗 :218-222
      a = times(a, 2.0);
      b = times(b, 2.0);
      c = times(c, 2.0);
      d = times(d, 2.0);
    }
    if (talent(35)) {
      // 害羞 :223-227
      a = times(a, 1.1);
      b = times(b, 1.1);
      c = times(c, 1.1);
      d = times(d, 1.1);
    } else if (talent(36)) {
      // 不知羞耻 :228-231
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
      d = times(d, 0.9);
    }
    if (talent(63)) {
      // 献身的 :232-236
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
      d = times(d, 0.9);
    }
    if (talent(72)) {
      // 容易上瘾 :237-241
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
      d = times(d, 0.5);
    }
    if (talent(76)) {
      // 淫乱 :242-246——B 轨 ×0.50 与其余 ×0.80 不同，原作如此
      a = times(a, 0.8);
      b = times(b, 0.5);
      c = times(c, 0.8);
      d = times(d, 0.8);
    }
    if (talent(82)) {
      // 讨厌男人 :247-251
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
      // 妊娠 :257-261
      a = times(a, 2.0);
      b = times(b, 2.0);
      c = times(c, 2.0);
      d = times(d, 2.0);
    }
    if (talent(123)) {
      // 疯狂 :262-266
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
      d = times(d, 0.5);
    }
    if (talent(9)) {
      // 崩坏 :267-271
      a = times(a, 0.8);
      b = times(b, 0.8);
      c = times(c, 0.8);
      d = times(d, 0.8);
    }
    if (talent(180)) {
      // 妓女 :272-276
      a = times(a, 0.8);
      b = times(b, 0.8);
      c = times(c, 0.8);
      d = times(d, 0.8);
    }
    if (talent(181)) {
      // 倾城 :277-281
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
      d = times(d, 0.5);
    }
    if (talent(183)) {
      // 有常客 :282-286
      a = times(a, 0.9);
      b = times(b, 0.9);
      c = times(c, 0.9);
      d = times(d, 0.9);
    }
    if (talent(184)) {
      // 求爱 :287-291
      a = times(a, 2.0);
      b = times(b, 2.0);
      c = times(c, 2.0);
      d = times(d, 2.0);
    }

    // 异常经验 :293-325：lv>=2 且非[疯狂][崩坏] → F = lv-1，17 项素质增减
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
      if (f < 0) f = 0; // :315-316
    }

    if (a < 1) a = 1; // :327-330 最低 1 点
    if (b < 1) b = 1;
    if (c < 1) c = 1;
    if (d < 1) d = 1;

    const juel4 = era.get(`juel:${cid}:4`) || 0;
    const juel5 = era.get(`juel:${cid}:5`) || 0;
    const juel6 = era.get(`juel:${cid}:6`) || 0;
    const exp74 = era.get(`exp:${cid}:74`) || 0;
    const exp50 = era.get(`exp:${cid}:50`) || 0;
    let i = 0;
    if (exp50 < f) i |= 2; // :317-321（F 段内）
    if (abl11() < lv + 1) i |= 4; // 欲望门槛
    if (juel4 < a) i |= 1; // 恭顺
    if (juel5 < b) i |= 1; // 欲情
    if (juel6 < c) i |= 1; // :350-351 屈服
    if (exp74 < d) i |= 2; // 卖淫经验

    // 干跑出口（decide_ablup37 / core_ablup37）
    if (mode === 'decide') {
      // @DECIDE_ABLUP37 的额外门槛（:95-96）：卖淫中毒＋性交中毒合计 10
      // 以上即不可提升——主流程没有这条（文件头登记的差异）
      if (lv + (era.get(`abl:${cid}:38`) || 0) >= 10) return null;
      return { i };
    }
    if (mode === 'core') {
      era.add(`abl:${cid}:37`, 1); // @CORE_ABLUP37: ABL ++
      if (i === 0) {
        era.add(`juel:${cid}:4`, -a);
        era.add(`juel:${cid}:5`, -b);
        era.add(`juel:${cid}:6`, -c);
      }
      return 0;
    }

    if (f > 0) {
      era.print(`${era.get('expname:50')}${f}以上(现在${exp50})且`); // :41-42
    }
    era.print(`${era.get('ablname:11')}LV${lv + 1}以上(现在LV${abl11()})且`); // :44
    era.printButton(
      `${era.get('palamname:4')}点数×${juel4}/${a} ……${get_ablup_state(i)}`,
      0,
    ); // :46-49
    era.println();
    era.print(`　　　${era.get('palamname:5')}点数×${juel5}/${b}`); // :50
    era.print(`　　　${era.get('palamname:6')}点数×${juel6}/${c}`); // :51
    era.print(`${era.get('expname:74')}　${exp74}/${d}`); // :52
    era.printButton('停止', 100); // :53

    const result = await era.input(); // :55
    if (result === 100) {
      return; // :62-63
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件'); // :59-60
      continue; // :60-61 RESTART
    } else if (result === 0) {
      const new_lv = era.add(`abl:${cid}:37`, 1); // :66
      era.add(`juel:${cid}:4`, -a); // :68-70
      era.add(`juel:${cid}:5`, -b);
      era.add(`juel:${cid}:6`, -c);
      era.print(`${era.get('ablname:37')}变为LV${new_lv}。`); // :73
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 * 源: target/ERB/ABL/ABLUP39.ERB @ABLUP39 :8-78 + @DECIDE_ABLUP39 :93-187。
 * 兽奸中毒，train 域（裸写 abl:39）。双珠 A(欲情 JUEL:5)/B(屈服 JUEL:6)
 * + C(兽奸经验 EXP:56)；F(异常经验) lv>=2 起要（容易上瘾/淫乱/牝犬可免，
 * F=lv+1，无增减表）。三重上限：32+33+39>=10 时 A/B 覆盖为 lv²×4000；
 * 主流程的放行判定是「两珠任一不足即拦」（||），文案却写「或……其中一项」
 * ——代码与文案矛盾，1:1 按代码。戒备森严的分档判 **ABL**（卖淫中毒
 * 等级），倍率 2.0/2.5/3.0——复制粘贴缺陷，按原作保留（issue #14 登记）。
 * @CORE_ABLUP39 见本文件 core_ablup39。
 */
async function ablup39(cid, mode) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl11 = () => era.get(`abl:${cid}:11`) || 0;
  const abl39 = () => era.get(`abl:${cid}:39`) || 0;
  const abl_sum = () =>
    (era.get(`abl:${cid}:32`) || 0) + (era.get(`abl:${cid}:33`) || 0) + abl39();

  if (!mode) era.drawLine(); // :10 DRAWLINE（:11-14 叙事文本已被注释掉，不移植）

  if (
    abl39() >= 5 &&
    talent(76) === 0 &&
    talent(124) === 0 &&
    talent(136) === 0
  ) {
    if (!mode) await era.printAndWait('需要特殊素质才能继续提升'); // :19-21
    return;
  }
  if (abl39() >= 10) {
    if (!mode) await era.printAndWait('已达最高级'); // :22-24
    return;
  }
  // :26-31 精液+百合+兽奸三中毒合计 10 以上：两珠任一不足即拦
  if (abl_sum() >= 10) {
    const bulk = abl39() * abl39() * 4000;
    if (
      (era.get(`juel:${cid}:5`) || 0) < bulk ||
      (era.get(`juel:${cid}:6`) || 0) < bulk
    ) {
      if (!mode) {
        era.print(
          `精液中毒(${era.get(`abl:${cid}:32`) || 0})＋百合中毒(${era.get(`abl:${cid}:33`) || 0})＋兽奸中毒(${abl39()})上限为10`,
        ); // :28
        era.print(
          `至少达成${era.get('palamname:5')}点数${bulk}点或${era.get('palamname:6')}点数${bulk}点的其中一项`,
        ); // :29
        await era.printAndWait('方可提升当前兽奸中毒的等级'); // :30 PRINTW
      }
      return; //
    }
  }

  for (;;) {
    const lv = abl39();
    // A/B/C：:104-143 梯子
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

    // :145-149 三重上限时 A/B 覆盖为 lv²×4000（梯子作废）
    if (abl_sum() >= 10) {
      a = lv * lv * 4000;
      b = lv * lv * 4000;
    }

    // 戒备森严 :151-165——分档判 ABL（卖淫中毒），非本能力等级，
    // 原作复制粘贴缺陷 1:1 保留（issue #14）
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

    // 异常经验 :167-171：lv>=2 且无[容易上瘾][淫乱][牝犬] → F = lv+1
    let f = 0;
    if (lv >= 2 && talent(72) === 0 && talent(76) === 0 && talent(136) === 0) {
      f = lv + 1;
    }

    if (talent(20)) {
      // 克制 :173-177（A/B 与 C 倍率不同）
      a = times(a, 2.5);
      b = times(b, 2.5);
      c = times(c, 1.5);
    }
    if (talent(70)) {
      // 接受快感 :178-180（ELSEIF 对，互斥）
      a = times(a, 0.75);
      b = times(b, 0.75);
    } else if (talent(71)) {
      // 否定快感 :181-183
      a = times(a, 1.75);
      b = times(b, 1.75);
    }
    if (talent(72)) {
      // 容易上瘾 :184-188
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
    }
    if (talent(80)) {
      // 倒錯的 :189-193
      a = times(a, 0.75);
      b = times(b, 0.75);
      c = times(c, 0.75);
    }
    if (talent(123)) {
      // 疯狂 :194-198
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
    }
    if (talent(124)) {
      // 动物耳朵 :199-203
      a = times(a, 0.8);
      b = times(b, 0.8);
      c = times(c, 0.8);
    }
    if (talent(136)) {
      // 牝犬 :204-208
      a = times(a, 0.5);
      b = times(b, 0.5);
      c = times(c, 0.5);
    }
    if (talent(85)) {
      // 爱慕 :209-214（心向主人，兽交不易；A/B 与 C 倍率不同）
      a = times(a, 1.8);
      b = times(b, 1.8);
      c = times(c, 1.5);
    }

    if (a < 1) a = 1; // :216-221 最低 1 点
    if (b < 1) b = 1;
    if (c < 1) c = 1;

    const juel5 = era.get(`juel:${cid}:5`) || 0;
    const juel6 = era.get(`juel:${cid}:6`) || 0;
    const exp56 = era.get(`exp:${cid}:56`) || 0;
    const exp50 = era.get(`exp:${cid}:50`) || 0;
    let i = 0;
    if (abl11() < lv + 1) i |= 4; //  欲望门槛
    if (juel5 < a) i |= 1; // :228-229
    if (juel6 < b) i |= 1; // :230-231
    if (exp56 < c) i |= 2; // :233-234 兽奸经验
    if (exp50 < f) i |= 2; // :236-237 异常经验

    // 干跑出口（decide_ablup39 / core_ablup39）
    if (mode === 'decide') {
      // @DECIDE_ABLUP39 的上限判据是 32+33+39 >= 30（:100-102），与主流程
      // 的 >= 10 不同（主流程那条是「两珠任一不足即拦」的价位门槛）
      if (abl_sum() >= 30) return null;
      return { i };
    }
    if (mode === 'core') {
      era.add(`abl:${cid}:39`, 1); // @CORE_ABLUP39: ABL:39 ++
      if (i === 0) {
        era.add(`juel:${cid}:5`, -a);
        era.add(`juel:${cid}:6`, -b);
      }
      return 0;
    }

    if (f > 0) {
      era.print(`${era.get('expname:50')}${f}以上(现在${exp50})且`); // :48-49
    }
    era.print(`${era.get('ablname:11')}LV${lv + 1}以上(现在LV${abl11()})且`); // :50
    era.printButton(
      `${era.get('palamname:5')}点数×${juel5}/${a} ……${get_ablup_state(i)}`,
      0,
    ); // :52-55
    era.println();
    era.print(`　　　${era.get('palamname:6')}点数×${juel6}/${b}`); // :56
    era.print(`${era.get('expname:56')}　${exp56}/${c}`); // :57
    era.printButton('停止', 100); // :58

    const result = await era.input(); // :60
    if (result === 100) {
      return; // :67-68
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件'); // :64-65
      continue; // :65-66 RESTART
    } else if (result === 0) {
      const new_lv = era.add(`abl:${cid}:39`, 1); // :71
      era.add(`juel:${cid}:5`, -a); // :73-74
      era.add(`juel:${cid}:6`, -b);
      era.print(`${era.get('ablname:39')}变为LV${new_lv}。`); // :76
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 * 源: target/ERB/ABL/ABLUP40.ERB @ABLUP40 :5-59 + @DECIDE_ABLUP40 :63-116。
 * 局部中毒（癖好中毒），train 域（裸写 abl:40）。单轨道 A(局部点数
 * JUEL + F(异常经验，lv>=2 起要、容易上瘾/淫乱可免，F=lv+1)。无
 * DRAWLINE、无 Lv5 素质解锁（直接 Lv10 上限），终止文案「已达到MAX」、
 * 重试文案「条件不足」、停止按钮「放弃」均与本族其他文件不同，1:1 保留。
 * 欲望门槛判 ABL:11 < ABL:40+1，但需求行的显示是 LV{ABL:39+1}——显示与
 * 判定不一致（复制粘贴缺陷），按原作保留（issue #14 登记）。状态段是
 * 内联渲染（非 GET_ABLUP_STATE）：'点数不足 '/'经验不足'/'能力不足 '
 * 的尾随空格与共用函数不同。成功行原作是未翻译日文
 * 「%ABLNAME:40%のレベルが{ABL:40}になりました」，沿用 ABLUP0-3 的
 * 「变为LV{X}。」译法（文件头既定先例）。@DECIDE_ABLUP40 见本文件
 * decide_ablup40；原作无 @CORE_ABLUP40（AUTO_ABLUP 的 REPEAT 40 不含 40）。
 */
async function ablup40(cid, mode) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl11 = () => era.get(`abl:${cid}:11`) || 0;
  const abl40 = () => era.get(`abl:${cid}:40`) || 0;

  if (abl40() >= 10) {
    if (!mode) await era.printAndWait('已达到MAX'); //  PRINTW
    return;
  }

  for (;;) {
    const lv = abl40();
    // A：:78-97 梯子（与 ABLUP39 的 A 同值表）
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

    // 异常经验 :99-101：lv>=2 且无[容易上瘾][淫乱] → F = lv+1
    let f = 0;
    if (lv >= 2 && talent(72) === 0 && talent(76) === 0) {
      f = lv + 1;
    }

    if (talent(20)) a = times(a, 2.5); // 克制 :103-104
    if (talent(70)) {
      // 接受快感 :105-106（ELSEIF 对，互斥）
      a = times(a, 0.75);
    } else if (talent(71)) {
      // 否定快感 :107-108
      a = times(a, 1.75);
    }
    if (talent(72)) a = times(a, 0.5); // 容易上瘾 :109-110
    if (talent(80)) a = times(a, 0.75); // 倒錯的 :111-112
    if (talent(123)) a = times(a, 0.5); // 疯狂 :113-114

    if (a < 1) a = 1; // :116-117

    const juel15 = era.get(`juel:${cid}:15`) || 0;
    const exp50 = era.get(`exp:${cid}:50`) || 0;
    let i = 0;
    if (abl11() < lv + 1) i |= 4; //  欲望门槛（判 ABL:40+1）
    if (juel15 < a) i |= 1; // :123-124
    if (exp50 < f) i |= 2; //

    // 干跑出口（decide_ablup40）：@DECIDE_ABLUP40 的门槛与主流程同判据
    // （只有 ABL:40 >= 10 与同段的 i 位）。原作无 @CORE_ABLUP40
    // （@AUTO_ABLUP 的 REPEAT 40 不含 40），故不做 core 干跑。
    if (mode === 'decide') return { i };

    // 内联状态 :33-41（非 GET_ABLUP_STATE；尾随空格原样）
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
      era.print(`${era.get('expname:50')}${f}以上(现在${exp50})`); // :27-28
    }
    // :30 显示 ABL:39+1（与判定的 ABL:40+1 不一致，原作缺陷 1:1 保留）
    era.print(
      `${era.get('ablname:11')}LV${(era.get(`abl:${cid}:39`) || 0) + 1}以上(现在LV${abl11()})`,
    );
    era.printButton(
      `${era.get('palamname:15')}点数×${juel15}/${a} ……${state}`,
      0,
    ); // :32-42
    era.println();
    era.printButton('放弃', 100); // :44

    const result = await era.input(); // :46
    if (result === 100) {
      return; // :53-54
    } else if (result === 0 && i !== 0) {
      era.print('条件不足'); // :50-51
      continue; // :51-52 RESTART
    } else if (result === 0) {
      const new_lv = era.add(`abl:${cid}:40`, 1); // :57
      era.add(`juel:${cid}:15`, -a); // :59
      era.print(`${era.get('ablname:40')}变为LV${new_lv}。`); // :61 译法见文件头
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 * 源: target/ERB/ABL/ABLUP99.ERB @ABLUP99 :22-64 + @DECIDE_ABLUP99 :88-120。
 * 反抗刻印（MARK:3）消去，A(屈服点数 JUEL:6)。门槛：屈服刻印(MARK:2) ≥
 * 反抗刻印、顺从(ABL:10) ≥ 反抗刻印+2。购买成功 MARK:3 -= 1 并无条件扣
 * 屈服珠（入口的 I != 0 拦截使条件不满足时到不了这里，原作不重复包 IF）。
 * MARK:3 属 system 域（ownership/mark-ownership.yml "0-4"），写入门面。
 * @CORE_ABLUP99 见本文件 core_ablup99。
 */
async function ablup99(cid, mode) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const mark2 = () => era.get(`mark:${cid}:2`) || 0;
  const mark3 = () => era.get(`mark:${cid}:3`) || 0;

  if (!mode) era.drawLine(); // :22-23 DRAWLINE（:24-26 叙事文本已被注释掉，不移植）

  if (mark3() <= 0) {
    if (!mode) {
      era.print('不存在反抗行为'); //  PRINTL
      await era.waitAnyKey(); //  WAIT
    }
    return;
  }

  for (;;) {
    const lv = mark3();
    // A：:98-103 刻印阶梯（B 是顺从门槛，见下）
    let a;
    if (lv === 1) a = 5000;
    else if (lv === 2) a = 10000;
    else a = 50000; // lv === 3

    if (talent(12)) a = times(a, 3.0); // 刚强 :105-107
    if (talent(16)) a = times(a, 1.5); // 嚣张 :109-111
    if (talent(13)) a = times(a, 0.5); // 坦率 :113-115
    if (talent(85)) a = times(a, 0.5); // 爱慕 :117-119

    const abl10 = era.get(`abl:${cid}:10`) || 0;
    const juel6 = era.get(`juel:${cid}:6`) || 0;
    let i = 0;
    if (mark3() > mark2()) i |= 2; // :121-122 屈服刻印门槛
    const b = mark3() + 2; //  反抗刻印+2 的顺从
    if (b > abl10) i |= 4; //
    if (juel6 < a) i |= 1; //

    // 干跑出口（decide_ablup99 / core_ablup99）：@DECIDE_ABLUP99 的门槛与
    // 主流程同判据（MARK:3 <= 0 的提前 RETURN 0 已在上方守卫里）
    if (mode === 'decide') return { i };
    if (mode === 'core') {
      chara(cid).system.反抗刻印 -= 1; // @CORE_ABLUP99: MARK:3 --
      if (i === 0) era.add(`juel:${cid}:6`, -a);
      return 0;
    }

    era.print(`${era.get('markname:2')}${mark3()}以上(现在LV${mark2()})且`); // :35
    era.print(`${era.get('ablname:10')}LV${b}以上(现在LV${abl10})必要`); //
    era.printButton(
      `${era.get('palamname:6')}点数×${juel6}/${a} ……${get_ablup_state(i)}`,
      0,
    ); // :39-42
    era.println();
    era.printButton('停止', 100); // :44

    const result = await era.input(); // :46
    if (result === 100) {
      return; // :53-54
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件'); // :50-51
      continue; // :51-52 RESTART
    } else if (result === 0) {
      const new_mark = (chara(cid).system.反抗刻印 -= 1); // :57 MARK:3 -= 1
      era.add(`juel:${cid}:6`, -a); // :59
      era.print(`${era.get('markname:3')}下降为LV${new_mark}。`); // :61
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 * 源: target/ERB/ABL/ABLUP100.ERB @ABLUP100 :4-58 + @DECIDE_ABLUP100
 *     :72-118。异界综合征（MARK:10）消去，A(异界经验 EXP:99)。两道门槛
 * *同时*不满足（M==2）才算能力不足：五项感觉合计 C > MARK:10+5、战斗等级
 * （CFLAG:9）≥ MARK:10×10，OR 关系。需求行的「感觉总计{MARK:10+5}以上」
 * 与实际判定 `MARK:10 < C-5`（即 C > MARK:10+5，严格大于）文字脱节，
 * 且 C < 5 时 C-5 为负、感觉门槛数值上恒过——显示与判定双双脱节，原作
 * 照抄。MARK:10 与 EXP:99 均属 train 域（ownership 表），裸写。成功购买
 * 后 MARK:10 -= 1 并无条件扣异界经验。原作有 @CORE_ABLUP100（定义在
 * ABLUP100.ERB 内）但**没有任何调用点**——@AUTO_ABLUP 的 REPEAT 40 不含
 * 100，与 @CORE_ABLUP4 同款；移植不造 core_ablup100，decide_ablup100 的
 * 干跑出口只服务 `*` 标记（原作该标记行同样在 `[IF_DEBUG]` 块里）。
 */
async function ablup100(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const mark10 = () => era.get(`mark:${cid}:10`) || 0;

  era.drawLine(); // :4-5 DRAWLINE（:6-8 叙事文本已被注释掉，不移植）

  if (mark10() <= 0) {
    era.print('并没有异界异常反应'); //  PRINTL
    await era.waitAnyKey(); //  WAIT
    return;
  }

  for (;;) {
    const lv = mark10();
    // A：:79-88 刻印阶梯
    let a;
    if (lv === 1) a = 2000;
    else if (lv === 2) a = 5000;
    else if (lv === 3) a = 15000;
    else if (lv === 4) a = 30000;
    else a = 50000; // lv === 5

    if (talent(10)) a = times(a, 1.2); // 胆小 :90-92
    if (talent(172)) a = times(a, 0.8); // 智慧 :94-96
    if (talent(12)) a = times(a, 1.8); // 刚强 :98-100
    if (talent(16)) a = times(a, 1.2); // 嚣张 :102-104
    if (talent(13)) a = times(a, 0.5); // 坦率 :106-108
    if (talent(85)) a = times(a, 0.5); // 爱慕 :110-112
    if (talent(76)) a = times(a, 0.7); // 淫乱 :114-116

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
    // :119-123 两道门槛各自计数，M==2 才 |=4（OR 关系：过一道即可）
    let m = 0;
    if (mark10() < c - 5) m += 1;
    const b = mark10() * 10;
    if (b > cflag9) m += 1;
    if (m === 2) i |= 4;
    if (exp99 < a) i |= 2; // :127-128

    era.print(`各处感觉总计${mark10() + 5}以上(现在${c})或`); // :29
    era.print(`战斗等级LV${b}以上(现在LV${cflag9})必要，然后`); //
    era.printButton(
      `${era.get('expname:99')}点数×${exp99}/${a} ……${get_ablup_state(i)}`,
      0,
    ); // :33-36
    era.println();
    era.printButton('停止', 100); // :38

    const result = await era.input(); // :40
    if (result === 100) {
      return; // :47-48
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件'); // :44-45
      continue; // :45-46 RESTART
    } else if (result === 0) {
      const new_mark = era.add(`mark:${cid}:10`, -1); // :51 MARK:10 -= 1
      era.add(`exp:${cid}:99`, -a); // :53
      era.print(`${era.get('markname:10')}下降为LV${new_mark}。`); // :55
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

// ———— ABL.ERB：@DECIDE_ABLUP 族 / @AUTO_ABLUP / @USERABLUP ————
//
// 这三个函数是 ABL.ERB 自己的代码（不是某个 ABLUPn.ERB 的），与上面各能力的
// 主流程是两条通路：
//   * @DECIDE_ABLUP / @DECIDE_ABLUPn —— 可提升判定，菜单用它打 `*`
//     （page-ablup.js 的 @SHOW_ABLUP_SELECT :78/:89/:94/:99/:105）；
//   * @AUTO_ABLUP + @AUTO_ABLUP_CORE —— FLAG:5 位 35 打开时的自动提升
//     （:203-267），由 @JUEL_CHECK 与 @AFTER_AUTOTRAIN 各调一次。
//
// 判定的真身只有一份：@ABLUPn 主流程在 0-4/10 抽出纯函数 evaluate_ablupN，
// 其余编号用主流程的 mode='decide'/'core' 干跑（见各函数内的干跑出口）。
// 两种形态的差别只是「梯子是否规整」，语义都是同一个 @DECIDE_ABLUPn。

/**
 * @DECIDE_ABLUP（ABL.ERB:113-189）的分发：X → @DECIDE_ABLUPn 的 RESULT。
 * 原作是 IF/ELSEIF 链，编号集合即下表；未登记编号返回 0——对应 TRYCALL
 * 落空：ABLUP20～ABLUP33 的文件仍是存根（docs/stub-registry.md 的
 * `ABLUP0`～`ABLUP100` 行），它们的 @DECIDE_ABLUPn 随各自文件落地。
 * @param {number} cid TARGET
 * @param {number} x 原作 X（能力编号）
 * @returns {Promise<number>} 1 = 可提升 / 0 = 不可
 */
async function decide_ablup(cid, x) {
  const handler = DECIDE_HANDLERS[x];
  if (!handler) return 0;
  return await handler(cid);
}

/** @DECIDE_ABLUP11 的 RESULT 语义（I==0 才可提升），干跑主流程 */
async function decide_ablup11(cid) {
  const r = await ablup11(cid, 'decide');
  return r && r.i === 0 ? 1 : 0;
}
/** @CORE_ABLUP11：干跑主流程的 mode='core'（ABL:11 ++，I==0 时扣珠） */
async function core_ablup11(cid) {
  await ablup11(cid, 'core');
  return 0;
}
/** @DECIDE_ABLUP12 的 RESULT 语义（组合上限即 0，见干跑出口） */
async function decide_ablup12(cid) {
  const r = await ablup12(cid, 'decide');
  return r && r.i === 0 ? 1 : 0;
}
/** @CORE_ABLUP12：干跑主流程的 mode='core'（只扣珠，不扣钱） */
async function core_ablup12(cid) {
  await ablup12(cid, 'core');
  return 0;
}
/** @DECIDE_ABLUP13 的 RESULT 语义 */
async function decide_ablup13(cid) {
  const r = await ablup13(cid, 'decide');
  return r && r.i === 0 ? 1 : 0;
}
/** @CORE_ABLUP13：干跑主流程的 mode='core' */
async function core_ablup13(cid) {
  await ablup13(cid, 'core');
  return 0;
}
/** @DECIDE_ABLUP14 的 RESULT 语义（原作判 `ABL == 10`，本体按 >=10；
 * 到达 >10 无路径，两者同效） */
async function decide_ablup14(cid) {
  const r = await ablup14(cid, 'decide');
  return r && r.i === 0 ? 1 : 0;
}
/** @CORE_ABLUP14：干跑主流程的 mode='core' */
async function core_ablup14(cid) {
  await ablup14(cid, 'core');
  return 0;
}
/** @DECIDE_ABLUP15 的 RESULT 语义（组合上限即 0） */
async function decide_ablup15(cid) {
  const r = await ablup15(cid, 'decide');
  return r && r.i === 0 ? 1 : 0;
}
/** @CORE_ABLUP15：干跑主流程的 mode='core' */
async function core_ablup15(cid) {
  await ablup15(cid, 'core');
  return 0;
}
/** @DECIDE_ABLUP16 的 RESULT 语义（:529-533：任一轨道可提升即 1；素质复查
 * 用 AND，与入口把关的 OR 不同，见干跑出口） */
async function decide_ablup16(cid) {
  const r = await ablup16(cid, 'decide');
  if (!r) return 0;
  return r.i === 0 || r.j === 0 || r.k === 0 ? 1 : 0;
}
/** @CORE_ABLUP16：干跑主流程的 mode='core'（I→J→K 优先级扣珠） */
async function core_ablup16(cid) {
  await ablup16(cid, 'core');
  return 0;
}
/** @DECIDE_ABLUP17 的 RESULT 语义 */
async function decide_ablup17(cid) {
  const r = await ablup17(cid, 'decide');
  return r && r.i === 0 ? 1 : 0;
}
/** @CORE_ABLUP17：干跑主流程的 mode='core' */
async function core_ablup17(cid) {
  await ablup17(cid, 'core');
  return 0;
}
/** @DECIDE_ABLUP37 的 RESULT 语义 */
async function decide_ablup37(cid) {
  const r = await ablup37(cid, 'decide');
  return r && r.i === 0 ? 1 : 0;
}
/** @CORE_ABLUP37：干跑主流程的 mode='core' */
async function core_ablup37(cid) {
  await ablup37(cid, 'core');
  return 0;
}
/** @DECIDE_ABLUP39 的 RESULT 语义 */
async function decide_ablup39(cid) {
  const r = await ablup39(cid, 'decide');
  return r && r.i === 0 ? 1 : 0;
}
/** @CORE_ABLUP39：干跑主流程的 mode='core' */
async function core_ablup39(cid) {
  await ablup39(cid, 'core');
  return 0;
}
/** @DECIDE_ABLUP40 的 RESULT 语义（原作无 @CORE_ABLUP40） */
async function decide_ablup40(cid) {
  const r = await ablup40(cid, 'decide');
  return r && r.i === 0 ? 1 : 0;
}
/** @DECIDE_ABLUP99 的 RESULT 语义 */
async function decide_ablup99(cid) {
  const r = await ablup99(cid, 'decide');
  return r && r.i === 0 ? 1 : 0;
}
/** @CORE_ABLUP99：干跑主流程的 mode='core'（MARK:3 --） */
async function core_ablup99(cid) {
  await ablup99(cid, 'core');
  return 0;
}

/**
 * @DECIDE_ABLUP 的分发目标。键集合 = ABL.ERB:115-180 的 IF/ELSEIF 链
 * （0/1/2/3/10-17/20-23/30-33/37/39）+ :89/:94/:99 三处单独调用
 * （99/4/40）。20-23/30-33 的 @DECIDE_ABLUPn 尚未落地（它们的 ABLUPn.ERB
 * 仍是存根，随 #466），落空时不打 `*`。
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
 * @AUTO_ABLUP_CORE 的 CORE 分发表：ABLUPn.ERB 里定义了 @CORE_ABLUPn 的
 * 编号（0-3/10-17/20-23/30-33/37/39/99）。@AUTO_ABLUP 的 REPEAT 40 不含
 * 4/40，原作也没有这两个 CORE。
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

/** GETBIT(X, n)（Emuera 内建） */
function auto_getbit(value, n) {
  return Math.floor((value || 0) / 2 ** n) % 2 === 1;
}

/**
 * @AUTO_ABLUP（ABL.ERB:203-241）：自动能力提升。ARG 缺省 -1 = 沿用调用方的
 * TARGET；ARG >= 0 时临时代入该角色（原作 :204-206 的 LOCAL/TARGET 换出
 * 换回），结束时还原。
 *
 * 两条与移植状态有关的取舍（都不是原作行为）：
 *   * 「卖淫影响」是阶段 6 魔改目录的 SAVEDATA（target/ERB/魔改新增/
 *     魔改使用.ERH:4），移植侧没有这张表。取售价侧 sale.js 的同款缺省值
 *     0（负面评价）——卖淫中毒因此不参与自动提升（:230-232）。表落地后
 *     这个参数应改为读真身。
 *   * COUNT > 15 的 `GETBIT(FLAG:5,36)` 是「只自动提升前 15 项」的开关，
 *     与调用方的位 35（自动化总开关）不是同一位，1:1 保留（:233-235）。
 * @param {number} [arg] 原作 ARG（-1 = 当前 TARGET）
 * @param {{prostitution_effect?: number}} [opts]
 * @returns {Promise<void>}
 */
async function auto_ablup(arg = -1, { prostitution_effect = 0 } = {}) {
  const keep_target = era_flag.target;
  if (arg >= 0) era_flag.target = arg;
  const target = era_flag.target;
  const talent = (id) => era.get(`talent:${target}:${id}`) || 0;

  // 优先削去反发印记（:208-213）
  if ((await decide_ablup99(target)) === 1) {
    await core_ablup99(target);
    era.print(
      `${chara_callname(target)}的${era.get('markname:3')}下降为LV${era.get(`mark:${target}:3`) || 0}`,
    ); // PRINTFORML %SAVESTR:TARGET%的%MARKNAME:3%下降为LV{MARK:3}
  }

  // REPEAT 40（:215-238）：编号空洞与性别过滤整组跳过
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
    // 只自动提升部分能力（位 36，见文件头）
    if (count > 15 && auto_getbit(era.get('flag:5'), 36)) break;

    await auto_ablup_core(count, 1);
  }

  era_flag.target = keep_target;
}

/**
 * @AUTO_ABLUP_CORE（ABL.ERB:247-267）：NUM 号能力的自动提升，循环到升不动
 * 为止（:267 RESTART 回到函数头的 ABL:NUM >= 10 检查）。
 * @param {number} num 能力编号（原作 NUM）
 * @param {number} info 提升后是否打印等级行（原作 INFO，1 = 打印）
 * @returns {Promise<void>}
 */
async function auto_ablup_core(num, info) {
  const target = era_flag.target;
  for (;;) {
    if ((era.get(`abl:${target}:${num}`) || 0) >= 10) return;
    if ((await decide_ablup(target, num)) <= 0) return;
    const core = CORE_HANDLERS[num];
    if (!core) return; // TRYCALLFORM CORE_ABLUP{NUM} 落空
    const result = await core(target);
    if (result >= 0 && info) {
      era.print(
        `${chara_callname(target)}的${era.get(`ablname:${num}`)}变为LV${era.get(`abl:${target}:${num}`) || 0}`, // :264-265
      );
    }
  }
}

/**
 * @USERABLUP（ABL.ERB:192-200）：引擎驱动的能力提升阶段的用户出口。原作
 * 在 RESULT == 999（@SHOW_ABLUP_SELECT 的 [999] - 能力值提高结束）时做两件
 * 事——顺从/坦率检查与欲情检查——然后 BEGIN TURNEND 结束本回合。
 *
 * 返回值沿用本移植的转场约定：1 = 已发 BEGIN TURNEND（page-shop.js 的 199、
 * page-invasion.js 的 109 同款上浮给 main-loop），0 = 无事发生。
 *
 * 可达性：本作手写的 @JUEL_CHECK 循环不走引擎的 BEGIN ABLUP 阶段（全库唯一
 * 的 BEGIN ABLUP 在 TRAIN_MAIN.ERB:430 被注释掉），@USERABLUP 因而与原作
 * 一样没有调用点——1:1 落真身，不接入任何分发。
 * @param {number} result 原作 RESULT
 * @returns {Promise<number>} 1 / 0
 */
async function userablup(result) {
  if (result !== 999) return 0;
  jujun_up_check(era_flag.target); // CALL JUJUN_UP_CHECK（:193-195 的两句 CALL）
  yokubo_up_check(era_flag.target); // CALL YOKUBO_UP_CHECK
  return 1; // BEGIN TURNEND
}

module.exports = {
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
