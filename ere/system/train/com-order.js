/**
 * @file 指令实行值的共通明细段：@COM_ORDER（issue #214）。
 *
 * 源: target/ERB/調教相關/COMORDER.ERB  @COM_ORDER（:3-379 全文）
 *
 * == 原作的用法（调用点全在各 COMF 指令文件头部，随族票接线） ==
 *
 * COMF 在「実行できるかの判定」段先 A = 0 / S = 0，CALL COM_ORDER 打出
 * 全部指令共通的贡献明细（顺从/素质/刻印/参数/相性），再接着打自己指令
 * 特有的项，最后 `PRINT  = / PRINTV A / …/ 实行值 V / WAIT` 收行判定
 * （COMF3_自慰.ERB:54-201 的完整形状——**收尾归调用方**，本函数不换行
 * 不等键）。已核实的 20+ 调用点全是此形态。
 *
 * == 接触面（#214 定死；#219 修订返回形状，12 张族票照此写） ==
 *
 *   async com_order(a, s) → { a, s, parts }
 *
 * **#219 修订：本函数不再自行打印，明细段以 parts（字符串数组）返回。**
 * 判定段在原作是**一行**（COM_ORDER 的贡献 + COMF 自己的贡献 + 合计 +
 * 实行值收在同一个 PRINT 行里，golden train-natural:169 实证），ere 引擎
 * 每次 print 即一行——#214 的逐段 print 形状会把一行明细拆成十几行，由
 * 第一个消费者（#219 的 COM3/6/7）落地时翻出。调用方把 parts 与自己的
 * 贡献、` = A … 实行值 V` 收尾拼接后一次 era.print（com-caress.js 的
 * push_judge_tail）。
 *
 * A/S 是 Emuera 单字母全局变量（跨函数共享、不进存档）。ere 侧不落表
 * （era_flag 的 flag 槽位是持久存档面，暂存计算值不进存档；全库无
 * 「调用前残留 A/S 被读」的形态——COMF 一律先清零），以参数显式传递
 * （era_flag 注释「函数间一律显式传参、不隐式读全局」的同款裁定）。
 * T/L/R 只在本函数内写读（全库无外部消费者），落局部变量。
 *
 * == 打印形态（1:1，注意 Emuera 的 PRINT/PRINTV 语法） ==
 *
 *   PRINTS ABLNAME:10                  → 名字（era.get('ablname:N')）
 *   PRINTV 'LV,ABL:10,'(,ABL:10 * 4,')' → `LV3(12)`（字面量与表达式
 *     以 ' 分隔拼接，数字无补位无空格）
 *   PRINT  +  / PRINT  -               → ` + ` / ` - `（PRINT 后第一个
 *     空格是语法分隔符，字面量含前后空格）；首项无分隔（S 标志），但
 *     负贡献段里「保守的/反抗心/刻印3」等**不查 S**（源码逐字如此，
 *     首项即负时行首带 " - "）——照搬，不「修正」。
 *
 * 百合判定（:28）：TALENT:PLAYER:122 == 0 && TALENT:TARGET:122 == 0
 * （调教者与对象皆非「男人」）——122 为 0 视为女（Emuera 零值语义）。
 * 刻印 T 系数（:105-111）：自尊心(15)→4 / 低姿态(17)→1 / 其他→2。
 * 参数阶梯（:133-145 恭顺、:156-168 恐怖）：< PALAMLV:1 → 0，逐级 +1，
 * ≥ PALAMLV:5 → 5（与 source-check 的 palam_level 同一阶梯形状，但此处
 * 只取 L 不换算，就地内联保持 1:1 的打印粒度）。
 * 相性（:339-379）：R = NO:PLAYER（ere 侧角色编号即 no，cid 直通），
 * RELATION:R 是 TARGET 对调教者的相性值，六档：<30 -10 / <70 -6 /
 * <100 -3 / <130 +3 / <170 +6 / ≥170 +10（> 0 与 ≥ 100 的前置判据照搬，
 * 值域 0 时六档全不进）。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { PALAMLV } = require('#/era-utils/palam-level');

/** 名字表读取的空值兜底（#13：未声明读值得 undefined） */
const name_of = (table, id) => era.get(`${table}:${id}`) ?? '';

/** PALAM 的贡献阶梯（:133-145 / :156-168 同一形状）：值 → L（0..5） */
function palam_ladder(value) {
  if (value < PALAMLV[1]) {
    return 0;
  }
  if (value < PALAMLV[2]) {
    return 1;
  }
  if (value < PALAMLV[3]) {
    return 2;
  }
  if (value < PALAMLV[4]) {
    return 3;
  }
  if (value < PALAMLV[5]) {
    return 4;
  }
  return 5;
}

/**
 * @COM_ORDER（COMORDER.ERB:3-379）：全部指令共通的实行值贡献明细。
 * 只打印与累加，不收行（收尾的「= A … 实行值 V / WAIT」归调用方，
 * COMF3_自慰.ERB:189-201）。
 *
 * @param {number} [a] 累加器 A 的初值（调用方先清 0）
 * @param {number} [s] 分隔标志 S 的初值（0 = 尚未打过任何项）
 * @returns {Promise<{a: number, s: number, parts: string[]}>} 累加后的
 *   A/S 与明细段（调用方继续累加、拼接后一次打印，见接触面注）
 */
async function com_order(a = 0, s = 0) {
  const target = era_flag.target;
  const player = era_flag.player;
  const abl = (i) => era.get(`abl:${target}:${i}`) || 0;
  const talent = (i) => era.get(`talent:${target}:${i}`) || 0;
  const p_talent = (i) => era.get(`talent:${player}:${i}`) || 0;
  const mark = (i) => era.get(`mark:${target}:${i}`) || 0;
  const palam = (i) => era.get(`palam:${target}:${i}`) || 0;
  // 明细段累积（#219 起：不打印，返回给调用方拼整行——见接触面注）
  const parts = [];
  // 「 + 」分隔（SIF S 才打——首项不打）；负贡献段一律不查 S（源码逐字：
  // 负项的 PRINT " - " 无 SIF S 前置，首项即负时行首带 " - "）
  const plus = () => {
    if (s) {
      parts.push(' + ');
    }
  };
  const raw_minus = () => parts.push(' - ');

  // —— 调教对象的能力（:8-23）——
  // ABL:10 顺从 ×4
  if (abl(10)) {
    plus();
    a += abl(10) * 4;
    parts.push(`${name_of('ablname', 10)}LV${abl(10)}(${abl(10) * 4})`);
    s = 1;
  }
  // ABL:21 抖M气质 ×2
  if (abl(21)) {
    plus();
    a += abl(21) * 2;
    parts.push(`${name_of('ablname', 21)}LV${abl(21)}(${abl(21) * 2})`);
    s = 1;
  }

  // —— 百合调教（:28-91）：调教者与对象皆非男人（TALENT:122 男人）——
  if (p_talent(122) === 0 && talent(122) === 0) {
    // ABL:22 百合气质 ×3
    if (abl(22)) {
      plus();
      a += abl(22) * 3;
      parts.push(`${name_of('ablname', 22)}LV${abl(22)}(${abl(22) * 3})`);
      s = 1;
    }
    // ABL:33 百合中毒 ×3
    if (abl(33)) {
      plus();
      a += abl(33) * 3;
      parts.push(`${name_of('ablname', 33)}LV${abl(33)}(${abl(33) * 3})`);
      s = 1;
    }
    // TALENT:81 双性恋 +10
    if (talent(81)) {
      plus();
      a += 10;
      parts.push(`${name_of('talentname', 81)}(10)`);
      s = 1;
    }
    // TALENT:23 好奇心 +7
    if (talent(23)) {
      plus();
      a += 7;
      parts.push(`${name_of('talentname', 23)}(7)`);
      s = 1;
    }
    // TALENT:24 保守的 -13（不查 S，:66-71）
    if (talent(24)) {
      raw_minus();
      a -= 13;
      parts.push(`${name_of('talentname', 24)}(13)`);
      s = 1;
    }
  } else {
    // TALENT:23 好奇心 +5
    if (talent(23)) {
      plus();
      a += 5;
      parts.push(`${name_of('talentname', 23)}(5)`);
      s = 1;
    }
    // TALENT:24 保守的 -10（不查 S，:85-90）
    if (talent(24)) {
      raw_minus();
      a -= 10;
      parts.push(`${name_of('talentname', 24)}(10)`);
      s = 1;
    }
  }

  // —— 刻印（:96-127；Mark.csv 序号 0=苦痛 1=快乐 2=屈服 3=反抗，
  //    golden train-natural-log:169 的判定行逐项对得上）——
  // MARK:0 苦痛刻印 ×5
  if (mark(0)) {
    plus();
    a += mark(0) * 5;
    parts.push(`${name_of('markname', 0)}LV${mark(0)}(${mark(0) * 5})`);
    s = 1;
  }
  // 刻印 T 系数：高姿态(15)→4 / 低姿态(17)→1 / 其他→2（:105-111。源注释
  // 写「自尊心」，Talent.csv 的 15 号名是「高姿态」——打印读表，此处从表）
  const t = talent(15) ? 4 : talent(17) ? 1 : 2;
  // MARK:2 屈服刻印 ×3×T
  if (mark(2)) {
    plus();
    a += mark(2) * 3 * t;
    parts.push(`${name_of('markname', 2)}LV${mark(2)}(${mark(2) * 3 * t})`);
    s = 1;
  }
  // MARK:3 反抗刻印 -2×T（不查 S，:121-127）
  if (mark(3)) {
    raw_minus();
    a -= mark(3) * 2 * t;
    parts.push(`${name_of('markname', 3)}LV${mark(3)}(${mark(3) * 2 * t})`);
    s = 1;
  }

  // —— 参数（:132-176）——
  // PALAM:4 恭顺 L×3
  const l_ju = palam_ladder(palam(4));
  if (l_ju) {
    plus();
    a += l_ju * 3;
    parts.push(`${name_of('palamname', 4)}LV${l_ju}(${l_ju * 3})`);
    s = 1;
  }
  // PALAM:10 恐怖 L×3
  const l_fear = palam_ladder(palam(10));
  if (l_fear) {
    plus();
    a += l_fear * 3;
    parts.push(`${name_of('palamname', 10)}LV${l_fear}(${l_fear * 3})`);
    s = 1;
  }

  // —— 调教对象的素质（:182-285；负项一律不查 S——行首 " - "，逐字照搬）——
  // [素质号, 贡献]：反抗心-5 刚强-5 坦率+5 高姿态-15 低姿态+5 爱表现+2
  // 压抑-10 抵抗-10 把柄+12 容易陷落+10 淫乱+5 盲从+8（:206 的源注释
  // 「自尊心」即表名「高姿态」，见上方 T 系数注）
  const TARGET_TALENTS = [
    [11, -5],
    [12, -5],
    [13, 5],
    [15, -15],
    [17, 5],
    [28, 2],
    [32, -10],
    [34, -10],
    [37, 12],
    [73, 10],
    [76, 5],
    [86, 8],
  ];
  for (const [id, contrib] of TARGET_TALENTS) {
    if (talent(id)) {
      if (contrib > 0) {
        plus();
      } else {
        raw_minus();
      }
      a += contrib;
      parts.push(`${name_of('talentname', id)}(${Math.abs(contrib)})`);
      s = 1;
    }
  }

  // —— 调教者的素质（:291-334；全为正、全查 S）——
  // [素质号, 贡献]：魅惑+6 谜之魅力+6 威圧感+6 施虐狂+3 鼓舞+1
  const PLAYER_TALENTS = [
    [91, 6],
    [92, 6],
    [93, 6],
    [83, 3],
    [118, 1],
  ];
  for (const [id, contrib] of PLAYER_TALENTS) {
    if (p_talent(id)) {
      plus();
      a += contrib;
      parts.push(`${name_of('talentname', id)}(${contrib})`);
      s = 1;
    }
  }

  // —— 相性（:339-379）：R = NO:PLAYER，RELATION:R 六档（负档不查 S）——
  const relation = era.get(`relation:${target}:${player}`) || 0;
  if (relation > 0 && relation < 30) {
    raw_minus();
    a -= 10;
    parts.push('相性最差(10)');
    s = 1;
  } else if (relation > 0 && relation < 70) {
    raw_minus();
    a -= 6;
    parts.push('相性较差(6)');
    s = 1;
  } else if (relation > 0 && relation < 100) {
    raw_minus();
    a -= 3;
    parts.push('相性不怎么样(3)');
    s = 1;
  } else if (relation >= 100 && relation < 130) {
    plus();
    a += 3;
    parts.push('相性还行(3)');
    s = 1;
  } else if (relation >= 100 && relation < 170) {
    plus();
    a += 6;
    parts.push('相性较好(6)');
    s = 1;
  } else if (relation >= 100 && relation >= 170) {
    plus();
    a += 10;
    parts.push('相性最好(10)');
    s = 1;
  }

  return { a, s, parts };
}

module.exports = { com_order };
