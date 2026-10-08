/**
 * @file 阴道性交系共用子程序：处女确认、调教者射精检查、喷乳检查、
 * 事后处理（阴道 / 乳内两版）。
 *
 * 供调教指令（J9–J19）调用的接口（测试覆盖）：
 *   - confirm_lost_virgin() → Promise<number>（1 继续 / 0 中止）
 *   - com_ejac_player_sex(rand) / com_after_vagina_sex(rand) →
 *     Promise<void>，rand = (n) => [0, n) 整数（缺省均匀随机，#117 决议）
 *   - com_after_extra_sex() → Promise<void>
 *
 * 变量语义：BASE:PLAYER:2 = 射精蓄积量、BASE:PLAYER:3 = 喷乳蓄积量
 * （MAXBASE 同位为上限）；TFLAG:2 = 本回合性交射精（1/2 次）、TFLAG:38 =
 * 阴道内射精（对象侧）、TFLAG:30 = 好感度加成累计；CFLAG:113 = 妊娠部位
 * （-1 阴道内受精判定中 / 1 乳内 / 2 精巢 / 3 肛 / 4 口）、CFLAG:109 = 异常
 * 妊娠许可、CFLAG:15 = 初体验对象记录（+1 存 character no；300+ 近亲代码）、
 * CSTR:3 = 初体验对象名。
 *
 * 行为约定与边界情况：
 *   - 处女确认仅检查目标（#210）。
 *   - EXP:0/52 的分档分别使用各自的经验值。
 *   - com_ejac_player_milk 的喷乳判定使用蓄积值 s；通常喷乳与大量喷乳
 *     均扣减上限的两倍，与 com_ejac_player_sex 的通常射精扣减量不同。
 *   - ABL:PLAYER:1 分档的 `ELSE → 1.60` 档在 >= 4 分支之后不可达
 *     ——只使用表 [0.60,0.80,1.00,1.20] 与 >= 4 → 1.40。
 *   - com_after_extra_sex 的经验与童贞提示按 #60 使用简体。
 *   - incest 负责亲族关系解码；TFLAG:14 的归零与
 *     CFLAG:21–25 亲族关系计算都由共用函数承载。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { chara } = require('#/facade/chara');
const { PALAMLV } = require('#/era-utils/palam-level');
const { EXPLV } = require('#/era-utils/exp-level');
const { incest } = require('#/system/train/incest');
const { settle_ejaculation_gauge } = require('#/system/train/calc-ejaculation');

/** incest 使用当前 TARGET/PLAYER 计算亲族关系。 */
function call_incest() {
  return incest(era_flag.target, era_flag.player);
}

// —— 结算时按 target / player 读取角色数据 ——

const tal = (id, i) => era.get(`talent:${id}:${i}`) || 0;
const abl = (id, i) => Math.floor(era.get(`abl:${id}:${i}`) || 0);
const tequip = (id, i) => era.get(`tequip:${id}:${i}`) || 0;
/** 显示名字读取 callname（#5：不使用 savestr 通道） */
const name_of = (id) => era.get(`callname:${id}:-1`) ?? '';

/** 小数乘率逐次取整，避免多次相乘累积小数。 */
const times = (v, m) => Math.floor(v * m);

/** ABL 分档取率：表按 LV0-5，超出取末位（缺省处理） */
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

/** 润滑（PALAM:3）对射精蓄积量的乘率（< LV4 分档 + ≥ LV4） */
function lube_rate(cid) {
  const lube = era.get(`palam:${cid}:3`) || 0;
  if (lube < PALAMLV[1]) {
    return 0.6;
  }
  if (lube < PALAMLV[2]) {
    return 0.8;
  }
  if (lube < PALAMLV[3]) {
    return 1.0;
  }
  if (lube < PALAMLV[4]) {
    return 1.2;
  }
  return 1.4;
}

// com_ejac_player_sex 的指令位表。base = ABL:12（技巧）分档的
// 基础值；obed/svc/spirit = ABL:10/13/16 的追加乘率（各自 ABL 0-5 分档）
const SKILL_BASE_HI = [1500, 1600, 1800, 2000, 2400, 3000]; // 大半指令
const SKILL_BASE_SP = [1500, 1600, 1800, 2500, 3200, 4000]; // 130/134
const OBED_STRONG = [0.8, 0.9, 1.0, 1.1, 1.2, 1.3]; // 顺从乘率（弱侧）
const OBED_WEAK = [1.0, 1.1, 1.2, 1.3, 1.4, 1.5]; // 顺从乘率（强侧）
const SVC_RATE = [0.3, 0.7, 1.0, 1.2, 1.5, 1.8]; // 侍奉技术（ABL:13）
const SPIRIT_RATE = [0.5, 0.8, 1.2, 1.5, 1.8, 2.4]; // 侍奉精神（ABL:16）

/**
 * com_ejac_player_sex：累积调教者的射精蓄积量并结算射精。
 * 兽奸 / 死斗场（助手本人以外）直接返回。
 * @param {(n: number) => number} [rand] RAND:N 的随机源
 * @returns {Promise<void>}
 */
async function com_ejac_player_sex(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const cid = era_flag.target;
  const player = era_flag.player;
  if (tequip(cid, 89)) {
    return; // 兽奸
  }
  if (tequip(cid, 55) && era_flag.assi !== player) {
    return; // 死斗场（助手本人以外）
  }

  let b = 0; // B = 射精蓄积量增加量
  const com = era_flag.selectcom || 0;
  // —— 指令位：基础值 ×（顺从 | 侍奉技术 | 侍奉精神）——
  const skill_base = (table) => {
    b = table[Math.min(abl(cid, 12), table.length - 1)];
  };
  if (com === 20 || com === 21 || com === 90) {
    // 正常位、背后位、乳内
    skill_base(SKILL_BASE_HI);
    b = times(b, abl_rate(cid, 10, OBED_STRONG));
  } else if (com === 22) {
    // 面对面坐位
    skill_base([800, 1000, 1200, 1400, 1600, 1800]);
    b = times(b, abl_rate(cid, 10, [1.0, 1.3, 1.6, 1.9, 2.1, 2.4]));
  } else if (com === 23) {
    // 背面座位
    skill_base([500, 700, 900, 1100, 1300, 1500]);
    b = times(b, abl_rate(cid, 10, OBED_WEAK));
  } else if (com === 34) {
    // 骑乘位（侍奉技术另乘）
    skill_base([1000, 1300, 1700, 2200, 3000, 4500]);
    b = times(b, abl_rate(cid, 10, OBED_STRONG));
    b = times(b, abl_rate(cid, 13, SVC_RATE));
  } else if (com === 121) {
    // 子宫口刺激
    skill_base(SKILL_BASE_HI);
    b = times(b, abl_rate(cid, 10, OBED_STRONG));
  } else if (com === 120) {
    // Ｇ点刺激
    skill_base([500, 700, 900, 1100, 1300, 1500]);
    b = times(b, abl_rate(cid, 10, OBED_WEAK));
  } else if (com === 128) {
    // 正常位・接吻（侍奉精神另乘）
    skill_base(SKILL_BASE_HI);
    b = times(b, abl_rate(cid, 10, OBED_STRONG));
    b = times(b, abl_rate(cid, 16, SPIRIT_RATE));
  } else if (com === 129) {
    // 正常位・胸爱抚
    skill_base(SKILL_BASE_HI);
    b = times(b, abl_rate(cid, 10, OBED_STRONG));
  } else if (com === 130) {
    // 正常位ＳＰ
    skill_base(SKILL_BASE_SP);
    b = times(b, abl_rate(cid, 10, OBED_STRONG));
    b = times(b, abl_rate(cid, 16, SPIRIT_RATE));
  } else if (com === 131 || com === 132) {
    // 背后位・胸爱抚 / ・打屁股
    skill_base(SKILL_BASE_HI);
    b = times(b, abl_rate(cid, 10, OBED_STRONG));
  } else if (com === 133) {
    // 站立背后位（侍奉精神另乘）
    skill_base(SKILL_BASE_HI);
    b = times(b, abl_rate(cid, 10, OBED_STRONG));
    b = times(b, abl_rate(cid, 16, SPIRIT_RATE));
  } else if (com === 134) {
    // 背后位ＳＰ
    skill_base(SKILL_BASE_SP);
    b = times(b, abl_rate(cid, 10, OBED_STRONG));
    b = times(b, abl_rate(cid, 16, SPIRIT_RATE));
  } else if (com === 24 || com === 25) {
    // 逆强奸 / 逆肛交（仅基础值——25 实际走肛交版结算）
    skill_base(SKILL_BASE_HI);
  }

  // —— 共通乘率——
  b = times(b, abl_rate(cid, 11, [1.0, 1.1, 1.2, 1.3, 1.4, 1.5])); // 欲望
  b = times(b, abl_rate(cid, 14, [1.0, 1.1, 1.2, 1.3, 1.4, 1.5])); // 性交技术
  b = times(b, lube_rate(cid)); // 润滑
  b = times(b, abl_rate(player, 0, [1.0, 1.5, 2.0, 2.5, 3.5, 5.0])); // 阴蒂感觉
  b = times(b, exp_rate(cid, 0, [1.5, 1.0, 0.9, 0.8, 0.7, 0.6])); // 私处经验
  b = times(b, exp_rate(cid, 52, [1.0, 0.8, 0.5, 0.3, 0.1, 0.05])); // 私处扩张
  // 佩戴安全套（主人位 35 属 event 走门面 / 助手位 36 直写）
  if (chara(cid).event.主人避孕套 || (era_flag.assiplay && tequip(cid, 36))) {
    b = times(b, 0.6);
  }

  const e = settle_ejaculation_gauge(
    player,
    tal(player, 121) || tal(player, 122) ? b : 0,
  );

  const print_ejac = (heavy) => {
    // 大量 / 通常射精的部位文案，heavy 表示大量射精
    const suffix = heavy ? '大量射精' : '射精';
    if (chara(cid).event.主人避孕套 === 1) {
      era.print(suffix); // 戴套
    } else if ((era.get(`cflag:${cid}:113`) || 0) === 1) {
      era.print(`乳内${suffix}`);
    } else if ((era.get(`cflag:${cid}:113`) || 0) === 2) {
      era.print(suffix);
      era.print(
        `${name_of(cid)}的精巢似乎感受到了${heavy ? '强烈的' : ''}冲击`,
      );
    } else if ((era.get(`cflag:${cid}:113`) || 0) === 3) {
      era.print(`肠内${suffix}`);
      era.print(
        `${name_of(cid)}的直肠深处被${heavy ? '大量的精液强烈地' : '精液'}冲击着`,
      );
    } else if ((era.get(`cflag:${cid}:113`) || 0) === 4) {
      era.print(`口内${suffix}`);
      era.print(
        `${name_of(cid)}的喉咙深处被${heavy ? '大量的精液强烈地' : '精液'}冲击着`,
      );
    } else {
      era.print(`膣内${suffix}`);
      // 阴道内受精判定（CFLAG:109 异常妊娠时概率更高）
      if (era.get(`cflag:${cid}:109`)) {
        if (rand_n(heavy ? 2 : 3) === 0) {
          era.set(`cflag:${cid}:113`, -1);
        }
      } else if (rand_n(heavy ? 3 : 5) === 0) {
        era.set(`cflag:${cid}:113`, -1);
      }
    }
  };
  if (e === 2) {
    // 大量射精
    era.add(`exp:${player}:3`, 2);
    chara(cid).dungeon.精液经验 = chara(cid).dungeon.精液经验 + 2;
    print_ejac(true);
    era.print('精液经验＋２');
    // 调教者的阴茎沾上精液（STAIN 位 4）
    era.set(`stain:${player}:2`, (era.get(`stain:${player}:2`) || 0) | 4);
    era.set('tflag:2', 2); // 性交射精
    if (!era_flag.assiplay && chara(cid).event.主人避孕套 === 0) {
      era.set('tflag:38', 2); // 阴道内射精（主人・无套）
    }
    if (era_flag.assiplay && tequip(cid, 36) === 0) {
      era.set('tflag:38', 2); // 阴道内射精（助手・无套）
    }
  } else if (e === 1) {
    // 通常射精（1 次量）
    era.add(`exp:${player}:3`, 1);
    chara(cid).dungeon.精液经验 = chara(cid).dungeon.精液经验 + 1;
    print_ejac(false);
    era.print('精液经验＋１');
    era.set(`stain:${player}:2`, (era.get(`stain:${player}:2`) || 0) | 4);
    era.set('tflag:2', 1);
    if (!era_flag.assiplay && chara(cid).event.主人避孕套 === 0) {
      era.set('tflag:38', 1);
    }
    if (era_flag.assiplay && tequip(cid, 36) === 0) {
      era.set('tflag:38', 1);
    }
  }

  // 喷乳检查使用本次射精蓄积量增量 b
  await com_ejac_player_milk(b);
}

/**
 * com_ejac_player_milk：调教者的喷乳检查（母乳体质限定）。
 * 只被 com_ejac_player_sex 尾部调用。
 * @param {number} b 调用方算好的射精蓄积量增量
 * @returns {Promise<void>}
 */
async function com_ejac_player_milk(b) {
  const cid = era_flag.target;
  const player = era_flag.player;
  if (tal(player, 130) === 0) {
    return; // 非母乳体质
  }
  if (tequip(cid, 89)) {
    return; // 兽奸
  }
  if (tequip(cid, 55) && era_flag.assi !== player) {
    return; // 死斗场
  }

  // 乳房感觉（ABL:PLAYER:1）对增量的乘率（>= 4 统一取 1.4）
  {
    const lv = abl(player, 1);
    b = times(b, lv >= 4 ? 1.4 : [0.6, 0.8, 1.0, 1.2][lv]);
  }
  if (tal(player, 20)) {
    b = Math.floor(b / 2); // 克制
  }
  if (tal(player, 70)) {
    b = times(b, 1.2); // 接受快感
  }
  if (tal(player, 76)) {
    b = times(b, 1.1); // 淫乱化
  }
  if (tal(player, 71)) {
    b = times(b, 0.8); // 否定快感
  }
  if (tal(player, 108)) {
    b = times(b, 1.5); // Ｂ敏感
  }
  if (tal(player, 109)) {
    b = times(b, 0.5); // 贫乳
  }
  if (tal(player, 116)) {
    b = times(b, 0.2); // 绝壁
  }
  if (tal(cid, 131)) {
    b *= 2; // 对象幼儿退行
  }
  if (tal(cid, 132)) {
    b *= 2; // 对象幼稚
  }
  if (tal(player, 231)) {
    b *= 2; // 淫乳
  }
  if (tal(player, 78)) {
    b *= 2; // 弄乳狂
  }

  // 半衰蓄积 + 喷乳蓄积量
  b = 1000 + Math.floor((b - 1000) / 2);

  // BASE 写入会立即封顶，分档与扣量必须使用写入前的总量。
  const s = (era.get(`base:${player}:3`) || 0) + b;
  const ejac = era.get(`maxbase:${player}:3`) || 0;
  const e = s > ejac * 2 ? 2 : s > ejac ? 1 : 0;
  // 调教者普通与大量喷乳均扣两倍上限。
  const next = e ? Math.max(s - ejac * 2, 0) : s;
  era.set(`base:${player}:3`, e && next >= ejac ? ejac - 1 : next);

  if (e === 2) {
    // 大量喷乳
    era.print(`${name_of(player)}的乳头喷出了大量的母乳。`);
    era.print('喷奶经验＋２');
    if ((era.get(`exp:${player}:54`) || 0) === 0) {
      chara(player).dungeon.异常经验 = chara(player).dungeon.异常经验 + 1;
      era.print('异常经验＋1');
    }
    era.add(`exp:${player}:54`, 2);
    era.set(`stain:${player}:5`, (era.get(`stain:${player}:5`) || 0) | 16); // Ｂ母乳
    era.add(`nowex:${player}:5`, 1);
    chara(player).system.喷乳绝顶 = chara(player).system.喷乳绝顶 + 1; // EX
  } else if (e === 1) {
    // 喷乳
    era.print(`${name_of(player)}的乳头流出了母乳。`);
    era.print('喷奶经验＋1');
    if ((era.get(`exp:${player}:54`) || 0) === 0) {
      chara(player).dungeon.异常经验 = chara(player).dungeon.异常经验 + 1;
      era.print('异常经验＋1');
    }
    era.add(`exp:${player}:54`, 1);
    era.set(`stain:${player}:5`, (era.get(`stain:${player}:5`) || 0) | 16);
    era.add(`nowex:${player}:5`, 1);
    chara(player).system.喷乳绝顶 = chara(player).system.喷乳绝顶 + 1; // EX
  }
}

/**
 * confirm_lost_virgin：夺取处女的确认（INPUT 0/1）。
 * @returns {Promise<number>} 1 继续（含非处女时的直通）/ 0 玩家保留
 */
async function confirm_lost_virgin() {
  const cid = era_flag.target;
  if (tal(cid, 0)) {
    era.print(`夺取${name_of(cid)}的处女吗？`);
    era.printButton('- 来吧女人', 0);
    era.printButton('- 让她继续做女孩', 1);
    for (;;) {
      const result = await era.input();
      if (result === 1) {
        return 0;
      }
      if (result === 0) {
        break;
      }
      // 只接受 0/1；其他输入继续等待。
    }
  }
  return 1;
}

/**
 * com_after_vagina_sex：性交后处理——经验增长、异常经验、
 * 百合经验、爱情经验、相性、调教者童贞丧失、污渍移动。
 * @param {(n: number) => number} [rand] RAND:N 的随机源
 * @returns {Promise<void>}
 */
async function com_after_vagina_sex(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const cid = era_flag.target;
  const player = era_flag.player;

  // 私处经验（私处感觉 ABL:2 越高越多）
  let s = 0;
  if (abl(cid, 2) <= 1) {
    s += 2;
  } else if (abl(cid, 2) <= 4) {
    s += 3;
  } else if (abl(cid, 2) <= 7) {
    s += 4;
  } else {
    s += 5;
  }
  chara(cid).dungeon.私处经验 = chara(cid).dungeon.私处经验 + s;
  era.print(`私处经验+${s}`);
  s = 0;

  chara(cid).dungeon.性交经验 = chara(cid).dungeon.性交经验 + 1;
  era.print('性交经验＋１');

  // 异常经验（按初体验对象区分——此时 TALENT:0 尚未清除，
  // 处女丧失结算在回合后半的 source-check 结算中执行）
  let z = 0;
  call_incest(); // （TFLAG:14 清零后重算）
  const t14 = () => era.get('tflag:14') || 0;
  // 对象是女性（非男人 122 且非扶她 121）
  if (tal(cid, 0) && !tal(player, 122) && tal(player, 121) !== 1) {
    z += 1;
  }
  if (tal(cid, 0) && t14() === 1) {
    z += 2; // 父/母
  } else if (tal(cid, 0) && (t14() === 3 || t14() === 4)) {
    z += 1; // 兄弟姐妹
  }
  if (tal(cid, 0) && tequip(cid, 89)) {
    z = 2; // 兽奸基本值 2
  }
  if (tal(cid, 0) && era_flag.selectcom === 34) {
    z += 1; // 骑乘位 +1
  }
  if (z) {
    chara(cid).dungeon.异常经验 = chara(cid).dungeon.异常经验 + z;
    era.print(`${era.get('expname:50') ?? ''}＋${z}`); // %EXPNAME:50%
  }

  // 阴道内受精标记随机清除（RAND:2 == 0 → CFLAG:113 = 0）
  if (rand_n(2) === 0) {
    era.set(`cflag:${cid}:113`, 0);
  }

  if (tequip(cid, 89)) {
    return; // 兽奸到此为止
  }

  // 百合经验（双方皆非男人）
  if (!tal(cid, 122) && !tal(player, 122)) {
    era.print(era.get('expname:40') ?? '');
    era.print('+4');
    era.add(`exp:${cid}:40`, 4);
  }

  if (tequip(cid, 55) && era_flag.assi !== player) {
    return; // 死斗场到此为止
  }

  // 爱情经验（E 表）
  let e;
  if (tal(player, 1) && tal(cid, 0)) {
    e = 100; // 童贞 × 处女
  } else if (tal(cid, 0)) {
    e = 50;
  } else if (era_flag.selectcom === 20 || era_flag.selectcom === 129) {
    e = 4;
  } else if (era_flag.selectcom === 128) {
    e = 5;
  } else if (era_flag.selectcom === 130) {
    e = 8;
  } else if (era_flag.selectcom === 22) {
    e = 5;
  } else {
    e = 3;
  }
  // 好感度 1000+ 且主人亲自
  if ((era.get(`cflag:${cid}:2`) || 0) >= 1000 && !era_flag.assiplay) {
    era.print(`${era.get('expname:23') ?? ''}+${e}`);
    era.add(`exp:${cid}:23`, e);
  }
  e = 0;

  // 初体验对象是助手 → RELATION 相性加成（R = NO:ASSI）
  if (era_flag.assi > 0 && era_flag.assiplay) {
    const r = era_flag.assi;
    const key = `relation:${cid}:${r}`;
    const rel = () => era.get(key) || 0;
    if (tal(era_flag.assi, 1) && tal(cid, 0)) {
      era.set(key, rel() + 30);
      if (rel() === 30) {
        era.set(key, 130);
      }
    } else if (tal(cid, 0)) {
      era.set(key, rel() + 20);
      if (rel() === 20) {
        era.set(key, 120);
      }
    } else if (tal(era_flag.assi, 1)) {
      era.set(key, rel() + 10);
      if (rel() === 10) {
        era.set(key, 110);
      }
    }
    if (rel() > 200) {
      era.set(key, 200);
    }
  }

  // 主人亲自 → 好感度加成旗（TFLAG:30）
  if (!era_flag.assiplay) {
    if (abl(cid, 2) >= 3) {
      era.add('tflag:30', 2);
    } else {
      era.add('tflag:30', 1);
    }
  }

  // 调教者童贞丧失（亲族判定 + 初体验记录，代码表见头注）
  call_incest();
  if (tal(player, 1)) {
    era.set(`talent:${player}:1`, 0); // （属主 train）
    era.print('【童贞丧失】'); // PRINTW
    await era.waitAnyKey();
    if ((era.get(`cflag:${player}:15`) || 0) === 0) {
      era.set(`cflag:${player}:15`, cid + 1); // NO:TARGET + 1
      era.set(`cstr:${player}:3`, name_of(cid));
      // 初体验是近亲的代码表（与处女丧失结算的表不同——
      // 3↔4 两组互换、5/6 的性别位互换；两处代码表独立，不统一）
      if (t14() === 2 && tal(cid, 122)) {
        era.set(`cflag:${player}:15`, 300);
      } else if (t14() === 2 && !tal(cid, 122)) {
        era.set(`cflag:${player}:15`, 301);
      } else if (t14() === 3 && tal(cid, 122)) {
        era.set(`cflag:${player}:15`, 306);
      } else if (t14() === 3 && !tal(cid, 122)) {
        era.set(`cflag:${player}:15`, 307);
      } else if (t14() === 4 && tal(cid, 122)) {
        era.set(`cflag:${player}:15`, 304);
      } else if (t14() === 4 && !tal(cid, 122)) {
        era.set(`cflag:${player}:15`, 305);
      } else if (t14() === 5 && tal(cid, 122)) {
        era.set(`cflag:${player}:15`, 309);
      } else if (t14() === 6 && !tal(cid, 122)) {
        era.set(`cflag:${player}:15`, 308);
      }
    }
  }
  era.set('tflag:14', 0);

  // 污渍转移：对象的Ｖ ↔ 调教者的Ｐ
  const p_stain = era.get(`stain:${player}:2`) || 0;
  const v_stain = era.get(`stain:${cid}:3`) || 0;
  era.set(`stain:${cid}:3`, v_stain | p_stain);
  era.set(`stain:${player}:2`, p_stain | v_stain);
}

/**
 * com_after_extra_sex：乳内性交的后处理，增加乳房经验而非私处经验。
 * 异常经验不按女性对象加成；初体验使用调教者的近亲代码表；
 * 好感度判断条件仍是 ABL:2。提示按 #60 使用简体。
 * @returns {Promise<void>}
 */
async function com_after_extra_sex() {
  const cid = era_flag.target;
  const player = era_flag.player;

  // 乳房经验（乳房感觉 ABL:1 越高越多；首次 +异常经验 2）
  let b = 0;
  let abnormal = 0;
  if ((era.get(`cflag:${cid}:113`) || 0) === 1) {
    if (abl(cid, 1) <= 1) {
      b += 2;
    } else if (abl(cid, 1) <= 4) {
      b += 3;
    } else if (abl(cid, 1) <= 7) {
      b += 4;
    } else {
      b += 5;
    }
    if ((era.get(`exp:${cid}:35`) || 0) < 1) {
      abnormal += 2; // 首次乳房经验
    }
    era.add(`exp:${cid}:35`, b);
    era.print(`乳房经验+${b}`);
  }
  b = 0;

  chara(cid).dungeon.性交经验 = chara(cid).dungeon.性交经验 + 1;
  era.print('性交经验＋１'); // 提示按 #60 使用简体

  // 异常经验只含首次乳房经验的 +2，不按初体验对象追加。
  // incest 仅更新亲族关系，不改变异常经验。
  call_incest();
  const t14 = () => era.get('tflag:14') || 0;
  if (abnormal) {
    chara(cid).dungeon.异常经验 = chara(cid).dungeon.异常经验 + abnormal;
    era.print(`${era.get('expname:50') ?? ''}＋${abnormal}`);
  }
  if (tequip(cid, 89)) {
    return;
  }

  // 百合经验
  if (!tal(cid, 122) && !tal(player, 122)) {
    era.print(era.get('expname:40') ?? '');
    era.print('+4');
    era.add(`exp:${cid}:40`, 4);
  }

  if (tequip(cid, 55) && era_flag.assi !== player) {
    return;
  }

  // 爱情经验按双方初体验状态与指令分档
  let e;
  if (tal(player, 1) && tal(cid, 0)) {
    e = 100;
  } else if (tal(cid, 0)) {
    e = 50;
  } else if (era_flag.selectcom === 20 || era_flag.selectcom === 129) {
    e = 4;
  } else if (era_flag.selectcom === 128) {
    e = 5;
  } else if (era_flag.selectcom === 130) {
    e = 8;
  } else if (era_flag.selectcom === 22) {
    e = 5;
  } else {
    e = 3;
  }
  if ((era.get(`cflag:${cid}:2`) || 0) >= 1000 && !era_flag.assiplay) {
    era.print(`${era.get('expname:23') ?? ''}+${e}`);
    era.add(`exp:${cid}:23`, e);
  }
  e = 0;

  // 初体验对象是助手 → RELATION 相性加成
  if (era_flag.assi > 0 && era_flag.assiplay) {
    const r = era_flag.assi;
    const key = `relation:${cid}:${r}`;
    const rel = () => era.get(key) || 0;
    if (tal(era_flag.assi, 1) && tal(cid, 0)) {
      era.set(key, rel() + 30);
      if (rel() === 30) {
        era.set(key, 130);
      }
    } else if (tal(cid, 0)) {
      era.set(key, rel() + 20);
      if (rel() === 20) {
        era.set(key, 120);
      }
    } else if (tal(era_flag.assi, 1)) {
      era.set(key, rel() + 10);
      if (rel() === 10) {
        era.set(key, 110);
      }
    }
    if (rel() > 200) {
      era.set(key, 200);
    }
  }

  // 主人亲自时增加好感度加成标记；判断条件仍是 ABL:2 私处感觉。
  if (!era_flag.assiplay) {
    if (abl(cid, 2) >= 3) {
      era.add('tflag:30', 2);
    } else {
      era.add('tflag:30', 1);
    }
  }

  // 调教者童贞丧失（使用调教者的近亲代码表）
  call_incest();
  if (tal(player, 1)) {
    era.set(`talent:${player}:1`, 0);
    era.print('【童贞丧失】'); // 提示按 #60 使用简体
    await era.waitAnyKey();
    if ((era.get(`cflag:${player}:15`) || 0) === 0) {
      era.set(`cflag:${player}:15`, cid + 1);
      era.set(`cstr:${player}:3`, name_of(cid));
      if (t14() === 2 && tal(cid, 122)) {
        era.set(`cflag:${player}:15`, 300);
      } else if (t14() === 2 && !tal(cid, 122)) {
        era.set(`cflag:${player}:15`, 301);
      } else if (t14() === 3 && tal(cid, 122)) {
        era.set(`cflag:${player}:15`, 306);
      } else if (t14() === 3 && !tal(cid, 122)) {
        era.set(`cflag:${player}:15`, 307);
      } else if (t14() === 4 && tal(cid, 122)) {
        era.set(`cflag:${player}:15`, 304);
      } else if (t14() === 4 && !tal(cid, 122)) {
        era.set(`cflag:${player}:15`, 305);
      } else if (t14() === 5 && tal(cid, 122)) {
        era.set(`cflag:${player}:15`, 309);
      } else if (t14() === 6 && !tal(cid, 122)) {
        era.set(`cflag:${player}:15`, 308);
      }
    }
  }
  era.set('tflag:14', 0);

  // 乳内性交不在目标阴道与调教者阴茎之间转移污渍。
}

module.exports = {
  confirm_lost_virgin,
  com_ejac_player_sex,
  com_ejac_player_milk,
  com_after_vagina_sex,
  com_after_extra_sex,
};
