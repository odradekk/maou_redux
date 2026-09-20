/**
 * @file 能力 ABL·1（issue #464）：ABLUP0～ABLUP9 十项能力升级判定与交互。
 *
 * 源: target/ERB/ABL/ABLUP0.ERB ～ ABLUP9.ERB，各文件的 @ABLUPn 主流程与
 *     @DECIDE_ABLUPn 判定就地合并成单一函数——@DECIDE_ABLUPn 在各自文件内
 *     只有一个调用点（@ABLUPn 自身的 CALL），内联不改变语义。@CORE_ABLUPn
 *     （ABLUP0～3 各自定义）在自己文件内没有任何调用点，是 @AUTO_ABLUP 专用
 *     的另一条独立通路；AUTO_ABLUP 仍是 juel-check.js 的 STUBBED_CALLS 存根，
 *     不在本票范围，故不移植。
 *
 * 调用方: ere/system/train/juel-check.js 的 @JUEL_CHECK 输入分发
 *     （:463-539）。只有 ABLUP0～ABLUP4 接入分发——Abl.yml/Abl.csv 没有
 *     能力编号 5～9 的名字条目，juel-check.js 的 ABLUP_IDS 也从未包含
 *     5～9，说明原作没有任何菜单能选中它们；ABLUP5～9 因此保留为独立导出，
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
 */
/* eslint-disable no-irregular-whitespace -- ablup2/ablup3 的经验门槛行用全角空格
   对齐（原作 ABLUP2.ERB:53、ABLUP3.ERB:50 的 `EXPNAME　　{EXP}/{B}`），1:1 保留原文 */

const era = require('#/era-electron');
const { chara } = require('#/facade/chara');

/** TIMES X, m：整数乘小数后截断（math-etc.md；source-check.js 等同款） */
const times = (v, m) => Math.floor(v * m);

/** A = A * n / 100 型整数复利（区别于 TIMES：整数乘整数除，非小数乘法截断） */
const compound = (v, numerator) => Math.trunc((v * numerator) / 100);

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
 * 源: target/ERB/ABL/ABLUP0.ERB @ABLUP0 :7-92 + @DECIDE_ABLUP0 :126-234。
 * 阴蒂（TALENT:122 男人＝阴茎、TALENT:121 扶她＝阴茎(阴蒂)）感觉。
 */
async function ablup0(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  // 部位称呼：男人显示"阴茎"、扶她显示"阴茎(阴蒂)"，其余显示"阴蒂"
  const part = () =>
    talent(122) ? '阴茎' : talent(121) ? '阴茎(阴蒂)' : '阴蒂';
  // CALC = 阴蒂以外三个部位感觉封锁数，供"其他部位封锁"折扣与上限用
  const calc = () =>
    (talent(103) & 2 ? 1 : 0) +
    (talent(105) & 2 ? 1 : 0) +
    (talent(107) & 2 ? 1 : 0);
  const abl0 = () => era.get(`abl:${cid}:0`) || 0;

  era.drawLine(); // :19 DRAWLINE
  era.print(`${part()}的感度提升了。`); // :20-27
  era.print(`${part()}感觉越高，越容易在舔舐、自慰等行为得到更大的快感。`); // :28-35
  era.drawLine(); // :36 CUSTOMDRAWLINE ‥

  if (abl0() >= 5 && talent(74) === 0) {
    await era.printAndWait('需要特殊素质才能继续提升'); // :37-39
    return;
  }
  if (talent(101) & 2) {
    await era.printAndWait(`${part()}感觉已经被封锁了`); // :40-49
    return;
  }
  if (abl0() >= calc() * 5 + 10) {
    await era.printAndWait('已达最高级'); // :50-52
    return;
  }

  for (;;) {
    const c = calc();
    const lv = abl0();
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
    if (lv > 5 && lv <= 10 && c > 0) {
      a = Math.trunc((a * (15 - c)) / 15);
    } else if (lv <= 15 && c > 1) {
      a = Math.trunc((a * (16 - c)) / 15);
    } else if (lv <= 20 && c > 2) {
      a = Math.trunc((a * (17 - c)) / 15);
    }
    if (talent(76)) a = times(a, 0.8); // 淫乱 :215-217
    if (talent(74)) a = times(a, 0.8); // 自慰狂 :218-220
    if (a < 1) a = 1; // :222-224 最低 1 点

    const juel0 = era.get(`juel:${cid}:0`) || 0;
    let i = 0;
    if (juel0 < a) i |= 1; // :226-228

    const label = talent(122) ? '阴茎' : era.get('palamname:0'); // :63-67
    era.printButton(`${label}点数×${juel0}/${a}……${get_ablup_state(i)}`, 0); // :64-69
    era.println();
    era.printButton('停止', 100); // :71

    const result = await era.input(); // :74
    if (result === 100) {
      return; // :80-81
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件'); // :77-78
      continue; // :78-79 RESTART
    } else if (result === 0) {
      const new_lv = (chara(cid).system.阴蒂感觉 += 1); // :84
      era.add(`juel:${cid}:0`, -a); // :86-88
      era.print(`${era.get('ablname:0')}变为LV${new_lv}。`); // :90 PRINTFORML（不等待）
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 * 源: target/ERB/ABL/ABLUP1.ERB @ABLUP1 :7-70 + @DECIDE_ABLUP1 :86-210。
 * 乳房感觉，结构与 ABLUP0 相同但没有男人/扶她的部位称呼分支。
 */
async function ablup1(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const calc = () =>
    (talent(101) & 2 ? 1 : 0) +
    (talent(103) & 2 ? 1 : 0) +
    (talent(105) & 2 ? 1 : 0);
  const abl1 = () => era.get(`abl:${cid}:1`) || 0;

  era.drawLine(); // :18 DRAWLINE（:19-23 原作叙事文本已被注释掉，不移植）

  if (abl1() >= 5 && talent(78) === 0) {
    await era.printAndWait('需要特殊素质才能继续提升'); // :25-27
    return;
  }
  if (talent(107) & 2) {
    await era.printAndWait('乳房感觉已经被封锁了'); // :28-30
    return;
  }
  if (abl1() >= calc() * 5 + 10) {
    await era.printAndWait('已达最高级'); // :31-33
    return;
  }

  for (;;) {
    const c = calc();
    const lv = abl1();
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
      if (lv === 4) a = times(a, 2.0);
      if (lv === 5) a = times(a, 2.5);
      if (lv >= 6) a = times(a, 3.0);
    }
    if (talent(107)) a = times(a, 1.2); // B钝感
    if (talent(110)) a = times(a, 1.1); // 巨乳
    if (talent(114)) a = times(a, 1.2); // 爆乳
    if (talent(119)) a = times(a, 1.3); // 超乳
    if (talent(108)) a = times(a, 0.8); // B敏感
    if (lv > 5 && lv <= 10 && c > 0) {
      a = Math.trunc((a * (15 - c)) / 15);
    } else if (lv <= 15 && c > 1) {
      a = Math.trunc((a * (16 - c)) / 15);
    } else if (lv <= 20 && c > 2) {
      a = Math.trunc((a * (17 - c)) / 15);
    }
    if (talent(76)) a = times(a, 0.8); // 淫乱
    if (talent(78)) a = times(a, 0.8); // 淫乳
    if (talent(109)) a = times(a, 0.8); // 贫乳
    if (talent(116)) a = times(a, 0.65); // 绝壁
    if (a < 1) a = 1;

    const juel14 = era.get(`juel:${cid}:14`) || 0;
    let i = 0;
    if (juel14 < a) i |= 1;

    era.printButton(
      `${era.get('palamname:14')}点数×${juel14}/${a}……${get_ablup_state(i)}`,
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
      const new_lv = (chara(cid).system.乳房感觉 += 1); // :62
      era.add(`juel:${cid}:14`, -a); // :64-66
      era.print(`${era.get('ablname:1')}变为LV${new_lv}。`); // :68
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
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
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  if (talent(122)) return; // 男人却下（原作在 @ABLUP2 与 @DECIDE_ABLUP2 内各查一次，逐字相同，内联后合一）

  const calc = () =>
    (talent(101) & 2 ? 1 : 0) +
    (talent(105) & 2 ? 1 : 0) +
    (talent(107) & 2 ? 1 : 0);
  const abl2 = () => era.get(`abl:${cid}:2`) || 0;

  era.drawLine(); // :22 DRAWLINE（:23-25 叙事文本已被注释掉，不移植）

  if (abl2() >= 5 && talent(75) === 0) {
    await era.printAndWait('需要特殊素质才能继续提升'); // :27-29
    return;
  }
  if (talent(103) & 2) {
    await era.printAndWait('私处感觉已经被封锁了'); // :30-32
    return;
  }
  if (abl2() >= calc() * 5 + 10) {
    await era.printAndWait('已达最高级'); // :33-35
    return;
  }

  for (;;) {
    const c = calc();
    const lv = abl2();
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
    if (lv > 5 && lv <= 10 && c > 0) {
      a = Math.trunc((a * (15 - c)) / 15);
      b = Math.trunc((b * (20 - c)) / 20);
    } else if (lv <= 15 && c > 1) {
      a = Math.trunc((a * (16 - c)) / 15);
      b = Math.trunc((b * (21 - c)) / 20);
    } else if (lv <= 20 && c > 2) {
      a = Math.trunc((a * (17 - c)) / 15);
      b = Math.trunc((b * (22 - c)) / 20);
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

    const juel1 = era.get(`juel:${cid}:1`) || 0;
    const exp0 = era.get(`exp:${cid}:0`) || 0;
    let i = 0;
    if (juel1 < a) i |= 1; // :227-228
    if (exp0 < b) i |= 2; // :229-231

    era.printButton(
      `${era.get('palamname:1')}点数×${juel1}/${a}……${get_ablup_state(i)}`,
      0,
    ); // :49-51
    era.println();
    era.print(`      ${era.get('expname:0')}　　${exp0}/${b}`); // :52-53
    era.printButton('停止', 100); // :55

    const result = await era.input(); // :57
    if (result === 100) {
      return;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件'); // :61
      continue;
    } else if (result === 0) {
      const new_lv = (chara(cid).system.私处感觉 += 1); // :67
      era.add(`juel:${cid}:1`, -a); // :69-71
      era.print(`${era.get('ablname:2')}变为LV${new_lv}。`); // :73
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 * 源: target/ERB/ABL/ABLUP3.ERB @ABLUP3 :7-73 + @DECIDE_ABLUP3 :89-233。
 * 肛门感觉，结构与 ABLUP2 相同（双资源 A/B），无男人限制。
 * B＝肛门经验（EXP:1）。
 */
async function ablup3(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const calc = () =>
    (talent(101) & 2 ? 1 : 0) +
    (talent(103) & 2 ? 1 : 0) +
    (talent(107) & 2 ? 1 : 0);
  const abl3 = () => era.get(`abl:${cid}:3`) || 0;

  era.drawLine(); // :18 DRAWLINE（:19-20 叙事文本已被注释掉，不移植）

  if (abl3() >= 5 && talent(77) === 0) {
    await era.printAndWait('需要特殊素质才能继续提升'); // :25-27
    return;
  }
  if (talent(105) & 2) {
    await era.printAndWait('肛门感觉已经被封锁了'); // :28-30
    return;
  }
  if (abl3() >= calc() * 5 + 10) {
    await era.printAndWait('已达最高级'); // :31-33
    return;
  }

  for (;;) {
    const c = calc();
    const lv = abl3();
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
    if (lv > 5 && lv <= 10 && c > 0) {
      a = Math.trunc((a * (15 - c)) / 15);
      b = Math.trunc((b * (20 - c)) / 20);
    } else if (lv <= 15 && c > 1) {
      a = Math.trunc((a * (16 - c)) / 15);
      b = Math.trunc((b * (21 - c)) / 20);
    } else if (lv <= 20 && c > 2) {
      a = Math.trunc((a * (17 - c)) / 15);
      b = Math.trunc((b * (22 - c)) / 20);
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

    const juel2 = era.get(`juel:${cid}:2`) || 0;
    const exp1 = era.get(`exp:${cid}:1`) || 0;
    let i = 0;
    if (juel2 < a) i |= 1; // :223-224
    if (exp1 < b) i |= 2; // :225-227

    era.printButton(
      `${era.get('palamname:2')}点数×${juel2}/${a}……${get_ablup_state(i)}`,
      0,
    ); // :47-48
    era.println();
    era.print(`      ${era.get('expname:1')}　　${exp1}/${b}`); // :50
    era.printButton('停止', 100); // :52

    const result = await era.input(); // :55
    if (result === 100) {
      return;
    } else if (result === 0 && i !== 0) {
      era.print('未满足条件'); // :59
      continue;
    } else if (result === 0) {
      const new_lv = (chara(cid).system.肛门感觉 += 1); // :65
      era.add(`juel:${cid}:2`, -a); // :67-69
      era.print(`${era.get('ablname:3')}变为LV${new_lv}。`); // :71
      return;
    } else {
      continue; // 引擎层拒收代位，防御性保留（issue #130）
    }
  }
}

/**
 * 源: target/ERB/ABL/ABLUP4.ERB @ABLUP4 :1-48 + @DECIDE_ABLUP4 :50-83。
 * 局部感觉，无 GET_ABLUP_STATE、无部位封锁机制，梯子只有 5 级、无复利区间。
 * I&2（经验不足）在 @DECIDE_ABLUP4 内永远不会被置位（只有 :76-77 的
 * I|=1），:21-22 的 SIF I&2 分支在原作与本移植里都是死码——按 1:1 原样
 * 保留分支结构，不特别处理（与 CORE_ABLUPn 的整支缺调用点不同，这里只是
 * 单个条件永假，不必也不应删除对应代码）。
 */
async function ablup4(cid) {
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  const abl4 = () => era.get(`abl:${cid}:4`) || 0;

  era.drawLine(); // :3 DRAWLINE
  if (abl4() >= 5) {
    await era.printAndWait('已达到MAX。'); // :4-6
    return;
  }

  for (;;) {
    const lv = abl4();
    // A：0→1、1→50、2→600、3→7000(戒备森严×2.00)、4→45000(戒备森严×3.00)
    let a = [1, 50, 600, 7000, 45000][lv];
    if (lv === 3 && talent(27)) a = times(a, 2.0); // :64-66
    if (lv === 4 && talent(27)) a = times(a, 3.0); // :70-72

    const juel15 = era.get(`juel:${cid}:15`) || 0;
    let i = 0;
    if (juel15 < a) i |= 1; // :76-77

    // 无 GET_ABLUP_STATE：手写状态文案，"点数不足 " 带尾随空格、"经验不足"
    // 不带（:16-23，与 GET_ABLUP_STATE 的两个 bit 都带尾随空格不同）
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
  const { EXPLV } = require('#/era-utils/exp-level');
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

    const status = get_ablup_state(i);
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
    if (d > 0) {
      if (juel9 < d) j |= 1; // :146-147
      if (era.get(`juel:${cid}:6`) < e) j |= 1; // :148-150
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
};
