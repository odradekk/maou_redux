/**
 * @file 阴道性交系共用子程序：处女确认闸、调教者射精检查、喷乳检查、
 * 事后处理（阴道 / 乳内两版）。
 *
 * 源: target/ERB/調教相關/COMF_VAGINASEX.ERB
 *     @CONFIRM_LOST_VIRGIN（:6-19，性交系指令的处女确认——COM8/11/20-23/
 *     34/64/128-134 CALL 它，RESULT == 0 即中止指令）
 *     @COM_EJAC_PLAYER_SEX（:40-745，射精ゲージ蓄积与射精结算——COM20-25/
 *     34/90/120-134 CALL；尾部的 CALL COM_EJAC_PLAYER_MILK 同文件）
 *     @COM_EJAC_PLAYER_MILK（:747-869，喷乳ゲージ——只被 @COM_EJAC_PLAYER_
 *     SEX 尾部调用，B（射精ゲージ增量）经 Emuera 单字母全局从调用方传入，
 *     ere 侧改显式传参，#214 A/S 同款裁定）
 *     @COM_AFTER_VAGINA_SEX（:871-1044，经验上昇与调教者童贞丧失——
 *     COM20-23/34/120-134 CALL）/ @COM_AFTER_EXTRA_SEX（:1046-1197，
 *     COMF90 乳内专用，V 版的拷贝改 B）
 *
 * 调用方（J9-J19 族票）的接口面（本票的契约，测试锁定）：
 *   - confirm_lost_virgin() → Promise<number>（1 继续 / 0 中止）
 *   - com_ejac_player_sex(rand) / com_after_vagina_sex(rand) →
 *     Promise<void>，rand = (n) => [0, n) 整数（缺省均匀随机，#117 决议）
 *   - com_after_extra_sex() → Promise<void>
 *
 * 变量语义：BASE:PLAYER:2 = 射精ゲージ、BASE:PLAYER:3 = 喷乳ゲージ
 * （MAXBASE 同位为上限）；TFLAG:2 = 本回合性交射精（1/2 次）、TFLAG:38 =
 * 膣内射精（对象侧）、TFLAG:30 = 好感度加成累计；CFLAG:113 = 妊娠部位
 * （-1 膣内受精判定中 / 1 乳内 / 2 精巢 / 3 肛 / 4 口）、CFLAG:109 = 异常
 * 妊娠许可、CFLAG:15 = 初体验对象记录（+1 存 character no；300+ 近亲代码）、
 * CSTR:3 = 初体验对象名。
 *
 * 移植说明（有意偏离与上游缺陷，均注明依据）：
 *   - @CONFIRM_LOST_VIRGIN_YOU（:21-38）**不移植**：全库零调用点
 *     （(TRY)?CALL(JUMP)?FORM 全扫，#210 实测的同款核法）——eraIM@S 流用
 *     残留，#14 登记。
 *   - @COM_EJAC_PLAYER_SEX 的 `#DIM EXP_ID`（:41）赋值两次从未被读
 *     （:587-589/:614-616，EXP:0/52 的分档恒用 0/52 自身）——死变量，
 *     不移植，#14 登记。
 *   - @COM_EJAC_PLAYER_MILK 的 E 判定 `ELSEIF B > EJAC`（:761）用的是 B
 *     （本回合增量）而非 S（蓄积值）——与 _SEX/_ANALSEX 的同位代码
 *     （S > EJAC）不一致，上游疑似笔误，1:1 保留，#14 登记。同函数
 *     E == 1 支也减 EJAC*2（:826，_SEX 是减 EJAC）——同款 1:1 保留。
 *   - ABL:PLAYER:1 分档的 `ELSE → 1.60`（:757-758）在 >= 4 分支之后不可达
 *     ——死分支不移植（表 [0.60,0.80,1.00,1.20] + >= 4 → 1.40）。
 *   - @COM_AFTER_EXTRA_SEX 的日文原文串（:1074 性交経験＋１ / :1171
 *     【童貞喪失】）按 #60 归一简体（性交经验＋１ / 【童贞丧失】——
 *     V 版 :881/:1013 的简体字形）。
 *   - CALL INCEST 复用在册存根（stub_line，ere/event/source-check.js 的
 *     同名同形状——不建第二个桩，#177/#178 教训）；TFLAG:14 = 0 由本侧
 *     1:1 重置（原作 INCEST 首行）。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { chara } = require('#/facade/chara');
const { stub_line } = require('#/utils/stub-line');
const { PALAMLV } = require('#/era-utils/palam-level');
const { EXPLV } = require('#/era-utils/exp-level');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个；名单
 * 变动必须同步清单。INCEST 与 ere/event/source-check.js 共用同一条登记。
 */
const STUBBED_CALLS = ['INCEST'];

/** CALL INCEST（SUB2:324）：TFLAG:14 重置 1:1 + 在册存根（头注） */
function call_incest() {
  era.set('tflag:14', 0); // SUB2:338（INCEST 首行）
  stub_line('INCEST', '亲族关系判定', '随亲族票');
}

// —— 结算上下文的小读取面（target / player 两行） ——

const tal = (id, i) => era.get(`talent:${id}:${i}`) || 0;
const abl = (id, i) => Math.floor(era.get(`abl:${id}:${i}`) || 0);
const tequip = (id, i) => era.get(`tequip:${id}:${i}`) || 0;
/** %SAVESTR:x% 的名字承载（#5 决议：无 savestr 通道，读 callname） */
const name_of = (id) => era.get(`callname:${id}:-1`) ?? '';

/** TIMES X, m：整数乘小数后截断（math-etc.md，source-check.js 同款） */
const times = (v, m) => Math.floor(v * m);

/** ABL 分档取率：表按 LV0-5，超出取末位（原作 ELSE 兜底） */
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

/** 润滑（PALAM:3）对射精ゲージ的乘率（:655-663，< LV4 五档 + ≥ LV4） */
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

// @COM_EJAC_PLAYER_SEX 的指令位表（:57-738）。base = ABL:12（技巧）分档的
// 基础值；obed/svc/spirit = ABL:10/13/16 的追加乘率（各自 ABL 0-5 分档）
const SKILL_BASE_HI = [1500, 1600, 1800, 2000, 2400, 3000]; // 大半指令
const SKILL_BASE_SP = [1500, 1600, 1800, 2500, 3200, 4000]; // 130/134（・極）
const OBED_STRONG = [0.8, 0.9, 1.0, 1.1, 1.2, 1.3]; // 顺从乘率（弱侧）
const OBED_WEAK = [1.0, 1.1, 1.2, 1.3, 1.4, 1.5]; // 顺从乘率（强侧）
const SVC_RATE = [0.3, 0.7, 1.0, 1.2, 1.5, 1.8]; // 侍奉技术（ABL:13）
const SPIRIT_RATE = [0.5, 0.8, 1.2, 1.5, 1.8, 2.4]; // 侍奉精神（ABL:16）

/**
 * @COM_EJAC_PLAYER_SEX（:40-745）：调教者的射精ゲージ蓄积与射精结算。
 * 兽奸 / 死斗场（助手本人以外）直接返回（:44-48）。
 * @param {(n: number) => number} [rand] RAND:N 的随机源
 * @returns {Promise<void>}
 */
async function com_ejac_player_sex(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const cid = era_flag.target;
  const player = era_flag.player;
  if (tequip(cid, 89)) {
    return; // :44 兽奸
  }
  if (tequip(cid, 55) && era_flag.assi !== player) {
    return; // :47 死斗场（助手本人以外）
  }

  let b = 0; // :51 B = 射精ゲージ増加量
  const com = era_flag.selectcom || 0;
  // —— 指令位：基础值 ×（顺从 | 侍奉技术 | 侍奉精神）——
  const skill_base = (table) => {
    b = table[Math.min(abl(cid, 12), table.length - 1)];
  };
  if (com === 20 || com === 21 || com === 90) {
    // :57-99 正常位、背后位、乳内
    skill_base(SKILL_BASE_HI);
    b = times(b, abl_rate(cid, 10, OBED_STRONG));
  } else if (com === 22) {
    // :100-133 対面座位
    skill_base([800, 1000, 1200, 1400, 1600, 1800]);
    b = times(b, abl_rate(cid, 10, [1.0, 1.3, 1.6, 1.9, 2.1, 2.4]));
  } else if (com === 23) {
    // :134-166 背面座位
    skill_base([500, 700, 900, 1100, 1300, 1500]);
    b = times(b, abl_rate(cid, 10, OBED_WEAK));
  } else if (com === 34) {
    // :167-226 骑乗位（侍奉技术另乘）
    skill_base([1000, 1300, 1700, 2200, 3000, 4500]);
    b = times(b, abl_rate(cid, 10, OBED_STRONG));
    b = times(b, abl_rate(cid, 13, SVC_RATE));
  } else if (com === 121) {
    // :227-260 挿入子宮口責め
    skill_base(SKILL_BASE_HI);
    b = times(b, abl_rate(cid, 10, OBED_STRONG));
  } else if (com === 120) {
    // :261-293 挿入Ｇ点責め
    skill_base([500, 700, 900, 1100, 1300, 1500]);
    b = times(b, abl_rate(cid, 10, OBED_WEAK));
  } else if (com === 128) {
    // :294-339 正常位・接吻（侍奉精神另乘）
    skill_base(SKILL_BASE_HI);
    b = times(b, abl_rate(cid, 10, OBED_STRONG));
    b = times(b, abl_rate(cid, 16, SPIRIT_RATE));
  } else if (com === 129) {
    // :340-373 正常位・胸愛撫
    skill_base(SKILL_BASE_HI);
    b = times(b, abl_rate(cid, 10, OBED_STRONG));
  } else if (com === 130) {
    // :374-421 正常位ＳＰ
    skill_base(SKILL_BASE_SP);
    b = times(b, abl_rate(cid, 10, OBED_STRONG));
    b = times(b, abl_rate(cid, 16, SPIRIT_RATE));
  } else if (com === 131 || com === 132) {
    // :422-456 後背位・胸愛撫 / ・打屁股
    skill_base(SKILL_BASE_HI);
    b = times(b, abl_rate(cid, 10, OBED_STRONG));
  } else if (com === 133) {
    // :457-501 立ちバック（侍奉精神另乘）
    skill_base(SKILL_BASE_HI);
    b = times(b, abl_rate(cid, 10, OBED_STRONG));
    b = times(b, abl_rate(cid, 16, SPIRIT_RATE));
  } else if (com === 134) {
    // :502-546 後背位ＳＰ
    skill_base(SKILL_BASE_SP);
    b = times(b, abl_rate(cid, 10, OBED_STRONG));
    b = times(b, abl_rate(cid, 16, SPIRIT_RATE));
  } else if (com === 24 || com === 25) {
    // :547-588 逆レイプ / 逆肛門レイプ（基础值のみ——25 实际走 ANALSEX 版）
    skill_base(SKILL_BASE_HI);
  }

  // —— 共通乘率（:591-663）——
  b = times(b, abl_rate(cid, 11, [1.0, 1.1, 1.2, 1.3, 1.4, 1.5])); // 欲望
  b = times(b, abl_rate(cid, 14, [1.0, 1.1, 1.2, 1.3, 1.4, 1.5])); // 性交技術
  b = times(b, lube_rate(cid)); // 潤滑
  b = times(b, abl_rate(player, 0, [1.0, 1.5, 2.0, 2.5, 3.5, 5.0])); // 陰核感覚
  b = times(b, exp_rate(cid, 0, [1.5, 1.0, 0.9, 0.8, 0.7, 0.6])); // 私处经验
  b = times(b, exp_rate(cid, 52, [1.0, 0.8, 0.5, 0.3, 0.1, 0.05])); // 私处扩张
  // :666-668 安全套装着中（主人位 35 属 event 走门面 / 助手位 36 直写）
  if (chara(cid).event.主人避孕套 || (era_flag.assiplay && tequip(cid, 36))) {
    b = times(b, 0.6);
  }

  // :671-673 蓄积（扶她 121 / 男人 122 才有射精ゲージ）
  if (tal(player, 121) || tal(player, 122)) {
    era.add(`base:${player}:2`, b);
  }

  // :675-683 射精判定（S = 蓄积值、EJAC = 上限）
  const s = era.get(`base:${player}:2`) || 0;
  const ejac = era.get(`maxbase:${player}:2`) || 0;
  const e = s > ejac * 2 ? 2 : s > ejac ? 1 : 0;

  const print_ejac = (heavy) => {
    // 大量 / 通常射精的部位文案（:688-723 / :733-768），heavy = E == 2
    const suffix = heavy ? '大量射精' : '射精';
    if (chara(cid).event.主人避孕套 === 1) {
      era.print(suffix); // 戴套（:689/:741）
    } else if ((era.get(`cflag:${cid}:113`) || 0) === 1) {
      era.print(`乳内${suffix}`); // :691/:743
    } else if ((era.get(`cflag:${cid}:113`) || 0) === 2) {
      era.print(suffix);
      era.print(
        `${name_of(cid)}的精巢似乎感受到了${heavy ? '强烈的' : '的'}冲击`,
      ); // :695-696/:747-748
    } else if ((era.get(`cflag:${cid}:113`) || 0) === 3) {
      era.print(`肠内${suffix}`);
      era.print(
        `${name_of(cid)}的直肠深处被${heavy ? '大量的精液强烈地' : '精液'}冲击着`, // :699-700/:751-752
      );
    } else if ((era.get(`cflag:${cid}:113`) || 0) === 4) {
      era.print(`口内${suffix}`);
      era.print(
        `${name_of(cid)}的喉咙深处被${heavy ? '大量的精液强烈地' : '精液'}冲击着`, // :703-704/:755-756
      );
    } else {
      era.print(`膣内${suffix}`); // :706/:758
      // :707-713 / :759-765 膣内受精判定（CFLAG:109 异常妊娠时概率更高）
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
    // :685-730 大量射精
    era.add(`exp:${player}:3`, 2);
    chara(cid).dungeon.精液经验 = chara(cid).dungeon.精液经验 + 2;
    print_ejac(true); // :688-723
    era.print('精液经验＋２'); // :724
    // Ｐに精液汚れ（STAIN 位 4，:725）
    era.set(`stain:${player}:2`, (era.get(`stain:${player}:2`) || 0) | 4);
    // :727-729 ゲージ复位（超上限钳回 EJAC-1）
    const next = Math.max((era.get(`base:${player}:2`) || 0) - ejac * 2, 0);
    era.set(`base:${player}:2`, next >= ejac ? ejac - 1 : next);
    era.set('tflag:2', 2); // :732 セックスで射精
    if (!era_flag.assiplay && chara(cid).event.主人避孕套 === 0) {
      era.set('tflag:38', 2); // :734-735 膣内射精（主人・无套）
    }
    if (era_flag.assiplay && tequip(cid, 36) === 0) {
      era.set('tflag:38', 2); // :737-738 膣内射精（助手・无套）
    }
  } else if (e === 1) {
    // :731-771 通常の射精（结构同上，1 次量）
    era.add(`exp:${player}:3`, 1);
    chara(cid).dungeon.精液经验 = chara(cid).dungeon.精液经验 + 1;
    print_ejac(false); // :733-768
    era.print('精液经验＋１'); // :769
    era.set(`stain:${player}:2`, (era.get(`stain:${player}:2`) || 0) | 4);
    const next = Math.max((era.get(`base:${player}:2`) || 0) - ejac, 0);
    era.set(`base:${player}:2`, next >= ejac ? ejac - 1 : next);
    era.set('tflag:2', 1); // :773
    if (!era_flag.assiplay && chara(cid).event.主人避孕套 === 0) {
      era.set('tflag:38', 1); // :775-776
    }
    if (era_flag.assiplay && tequip(cid, 36) === 0) {
      era.set('tflag:38', 1); // :778-779
    }
  }

  // :745 噴乳チェック（B 透传，头注）
  await com_ejac_player_milk(b);
}

/**
 * @COM_EJAC_PLAYER_MILK（:747-869）：调教者的喷乳チェック（母乳体质限定）。
 * 只被 com_ejac_player_sex 尾部调用。
 * @param {number} b 调用方算好的射精ゲージ增量（Emuera 全局 B 的显式传参）
 * @returns {Promise<void>}
 */
async function com_ejac_player_milk(b) {
  const cid = era_flag.target;
  const player = era_flag.player;
  if (tal(player, 130) === 0) {
    return; // :751 非母乳体质
  }
  if (tequip(cid, 89)) {
    return; // :753 兽奸
  }
  if (tequip(cid, 55) && era_flag.assi !== player) {
    return; // :755 死斗场
  }

  // :760-767 Ｂ感覚（ABL:PLAYER:1）对增量的乘率（头注：死 ELSE 不移植）
  {
    const lv = abl(player, 1);
    b = times(b, lv >= 4 ? 1.4 : [0.6, 0.8, 1.0, 1.2][lv]);
  }
  if (tal(player, 20)) {
    b = Math.floor(b / 2); // :770 克制
  }
  if (tal(player, 70)) {
    b = times(b, 1.2); // :773 接受快感
  }
  if (tal(player, 76)) {
    b = times(b, 1.1); // :776 淫乱化
  }
  if (tal(player, 71)) {
    b = times(b, 0.8); // :779 否定快感
  }
  if (tal(player, 108)) {
    b = times(b, 1.5); // :782 Ｂ敏感
  }
  if (tal(player, 109)) {
    b = times(b, 0.5); // :785 贫乳
  }
  if (tal(player, 116)) {
    b = times(b, 0.2); // :788 绝壁
  }
  if (tal(cid, 131)) {
    b *= 2; // :791 对象幼儿退行
  }
  if (tal(cid, 132)) {
    b *= 2; // :794 对象幼稚
  }
  if (tal(player, 231)) {
    b *= 2; // :797 淫乳
  }
  if (tal(player, 78)) {
    b *= 2; // :800 弄乳狂
  }

  // :803 半衰蓄积 + 喷乳ゲージ
  b = 1000 + Math.floor((b - 1000) / 2);
  era.add(`base:${player}:3`, b);

  // :805-813 判定（头注：E == 1 的判据是 B 不是 S——上游疑似笔误，1:1）
  const s = era.get(`base:${player}:3`) || 0;
  const ejac = era.get(`maxbase:${player}:3`) || 0;
  const e = s > ejac * 2 ? 2 : b > ejac ? 1 : 0;

  if (e === 2) {
    // :815-840 大量喷乳
    era.print(`${name_of(player)}的乳头喷出了大量的母乳。`);
    era.print('喷奶经验＋２');
    if ((era.get(`exp:${player}:54`) || 0) === 0) {
      chara(player).dungeon.异常经验 = chara(player).dungeon.异常经验 + 1;
      era.print('异常经验＋1');
    }
    era.add(`exp:${player}:54`, 2);
    era.set(`stain:${player}:5`, (era.get(`stain:${player}:5`) || 0) | 16); // Ｂ母乳
    // :826-828（头注：E == 1 支同减 EJAC*2）
    const next = Math.max((era.get(`base:${player}:3`) || 0) - ejac * 2, 0);
    era.set(`base:${player}:3`, next >= ejac ? ejac - 1 : next);
    era.add(`nowex:${player}:5`, 1);
    chara(player).system.喷乳绝顶 = chara(player).system.喷乳绝顶 + 1; // EX
  } else if (e === 1) {
    // :841-866 喷乳
    era.print(`${name_of(player)}的乳头流出了母乳。`);
    era.print('喷奶经验＋1');
    if ((era.get(`exp:${player}:54`) || 0) === 0) {
      chara(player).dungeon.异常经验 = chara(player).dungeon.异常经验 + 1;
      era.print('异常经验＋1');
    }
    era.add(`exp:${player}:54`, 1);
    era.set(`stain:${player}:5`, (era.get(`stain:${player}:5`) || 0) | 16);
    const next = Math.max((era.get(`base:${player}:3`) || 0) - ejac * 2, 0);
    era.set(`base:${player}:3`, next >= ejac ? ejac - 1 : next);
    era.add(`nowex:${player}:5`, 1);
    chara(player).system.喷乳绝顶 = chara(player).system.喷乳绝顶 + 1; // EX
  }
}

/**
 * @CONFIRM_LOST_VIRGIN（:6-19）：夺取处女的确认闸（INPUT 0/1）。
 * @returns {Promise<number>} 1 继续（含非处女时的直通）/ 0 玩家保留
 */
async function confirm_lost_virgin() {
  const cid = era_flag.target;
  if (tal(cid, 0)) {
    era.print(`夺取${name_of(cid)}的处女吗？`); // :10
    era.printButton('来吧女人', 0); // :11
    era.printButton('让她继续做女孩', 1); // :12
    for (;;) {
      const result = await era.input(); // :13
      if (result === 1) {
        return 0; // :15
      }
      if (result === 0) {
        break;
      }
      // CASEELSE GOTO（:17）：白名单外输入到不了游戏（com-condom.js 头注）
    }
  }
  return 1; // :19
}

/**
 * @COM_AFTER_VAGINA_SEX（:871-1044）：性交后处理——经验上昇、异常经验、
 * 百合经验、爱情经验、相性、调教者童贞丧失、污渍移动。
 * @param {(n: number) => number} [rand] RAND:N 的随机源
 * @returns {Promise<void>}
 */
async function com_after_vagina_sex(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const cid = era_flag.target;
  const player = era_flag.player;

  // :876-884 私处经验（私处感觉 ABL:2 越高越多）
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

  chara(cid).dungeon.性交经验 = chara(cid).dungeon.性交经验 + 1; // :886
  era.print('性交经验＋１'); // :887

  // :890-914 异常经验（处女丧失的相手别——此时 TALENT:0 尚未清除，
  // 处女丧失本体在 @SOURCE_CHECK 的 LOST_VIRGIN_CHECK，回合后半才跑）
  let z = 0;
  call_incest(); // :893（TFLAG:14 重置 + 存根）
  const t14 = () => era.get('tflag:14') || 0;
  // :895-896 相手是女性（非男人 122 且非扶她 121）
  if (tal(cid, 0) && !tal(player, 122) && tal(player, 121) !== 1) {
    z += 1;
  }
  if (tal(cid, 0) && t14() === 1) {
    z += 2; // :898-899 父/母
  } else if (tal(cid, 0) && (t14() === 3 || t14() === 4)) {
    z += 1; // :901-902 兄弟姐妹
  }
  if (tal(cid, 0) && tequip(cid, 89)) {
    z = 2; // :905 兽奸基本值 2
  }
  if (tal(cid, 0) && era_flag.selectcom === 34) {
    z += 1; // :908 骑乗位 +1
  }
  if (z) {
    chara(cid).dungeon.异常经验 = chara(cid).dungeon.异常经验 + z;
    era.print(`${era.get('expname:50') ?? ''}＋${z}`); // %EXPNAME:50%
  }

  // :917-918 膣内フラグ随机清（RAND:2 == 0 → CFLAG:113 = 0）
  if (rand_n(2) === 0) {
    era.set(`cflag:${cid}:113`, 0);
  }

  if (tequip(cid, 89)) {
    return; // :921 兽奸到此为止
  }

  // :924-928 百合经验（双方皆非男人）
  if (!tal(cid, 122) && !tal(player, 122)) {
    era.print(era.get('expname:40') ?? '');
    era.print('+4');
    era.add(`exp:${cid}:40`, 4);
  }

  if (tequip(cid, 55) && era_flag.assi !== player) {
    return; // :933 死斗场到此为止
  }

  // :936-957 爱情经验（E 表）
  let e;
  if (tal(player, 1) && tal(cid, 0)) {
    e = 100; // :939 童贞 × 处女
  } else if (tal(cid, 0)) {
    e = 50; // :941
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
  // :960-963 好感度 1000+ 且主人亲自
  if ((era.get(`cflag:${cid}:2`) || 0) >= 1000 && !era_flag.assiplay) {
    era.print(`${era.get('expname:23') ?? ''}+${e}`);
    era.add(`exp:${cid}:23`, e);
  }
  e = 0;

  // :966-987 初体验相手是助手 → RELATION 相性加成（R = NO:ASSI）
  if (era_flag.assi > 0 && era_flag.assiplay) {
    const r = era_flag.assi;
    const key = `relation:${cid}:${r}`;
    const rel = () => era.get(key) || 0;
    if (tal(era_flag.assi, 1) && tal(cid, 0)) {
      era.set(key, rel() + 30);
      if (rel() === 30) {
        era.set(key, 130); // :977-978
      }
    } else if (tal(cid, 0)) {
      era.set(key, rel() + 20);
      if (rel() === 20) {
        era.set(key, 120); // :982-983
      }
    } else if (tal(era_flag.assi, 1)) {
      era.set(key, rel() + 10);
      if (rel() === 10) {
        era.set(key, 110); // :987-988
      }
    }
    if (rel() > 200) {
      era.set(key, 200); // :990-991
    }
  }

  // :994-1000 主人亲自 → 好感度加成旗（TFLAG:30）
  if (!era_flag.assiplay) {
    if (abl(cid, 2) >= 3) {
      era.add('tflag:30', 2);
    } else {
      era.add('tflag:30', 1);
    }
  }

  // :1003-1041 调教者童贞丧失（亲族判定 + 初体验记录，代码表见头注）
  call_incest(); // :1005
  if (tal(player, 1)) {
    era.set(`talent:${player}:1`, 0); // :1007（属主 train）
    era.print('【童贞丧失】'); // :1008 PRINTW
    await era.waitAnyKey();
    if ((era.get(`cflag:${player}:15`) || 0) === 0) {
      era.set(`cflag:${player}:15`, cid + 1); // :1010 NO:TARGET + 1
      era.set(`cstr:${player}:3`, name_of(cid)); // :1011
      // :1014-1037 初体验是近亲的代码表（与 LOST_VIRGIN_CHECK 的表不同——
      // 3↔4 两组互换、5/6 的性别位互换，原作两处各表，1:1 保留）
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
  era.set('tflag:14', 0); // :1039

  // :1042-1043 汚移：对象的Ｖ ↔ 调教者的Ｐ
  const p_stain = era.get(`stain:${player}:2`) || 0;
  const v_stain = era.get(`stain:${cid}:3`) || 0;
  era.set(`stain:${cid}:3`, v_stain | p_stain);
  era.set(`stain:${player}:2`, p_stain | v_stain);
}

/**
 * @COM_AFTER_EXTRA_SEX（:1046-1197）：乳内（COMF90）的后处理——V 版的
 * 拷贝改 Ｂ（私处经验→乳房经验）。与 V 版的三处表值差异（异常经验无
 * 女性相手项、初体验近亲代码表同 V 版、好感度判据仍是 ABL:2）各在原位
 * 1:1；日文原文串按 #60 归一（头注）。
 * @returns {Promise<void>}
 */
async function com_after_extra_sex() {
  const cid = era_flag.target;
  const player = era_flag.player;

  // :1055-1072 乳房经验（Ｂ感覚 ABL:1 越高越多；首次 +异常经验 2）
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
      abnormal += 2; // :1065-1066 初のＢ経験
    }
    era.add(`exp:${cid}:35`, b);
    era.print(`乳房经验+${b}`); // :1070
  }
  b = 0;

  chara(cid).dungeon.性交经验 = chara(cid).dungeon.性交经验 + 1; // :1073
  era.print('性交经验＋１'); // :1074（原文 経験，#60 归一）

  // :1076-1083 异常经验：原文只有 Z = 0 / TFLAG:14 = 0 / CALL INCEST /
  // ABNOMAL_EXP += Z——Z 恒 0（INCEST 不改 Z），V 版的相手别条件串不在
  // 这份拷贝里。abnormal 仍只含首 Ｂ经验的 +2。
  call_incest(); // :1080
  const t14 = () => era.get('tflag:14') || 0;
  if (abnormal) {
    chara(cid).dungeon.异常经验 = chara(cid).dungeon.异常经验 + abnormal;
    era.print(`${era.get('expname:50') ?? ''}＋${abnormal}`); // :1086
  }
  if (tequip(cid, 89)) {
    return; // :1091
  }

  // :1094-1098 百合经验
  if (!tal(cid, 122) && !tal(player, 122)) {
    era.print(era.get('expname:40') ?? '');
    era.print('+4');
    era.add(`exp:${cid}:40`, 4);
  }

  if (tequip(cid, 55) && era_flag.assi !== player) {
    return; // :1101
  }

  // :1103-1125 爱情经验（表同 V 版）
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

  // :1132-1153 初体验相手是助手 → RELATION（同 V 版）
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

  // :1158-1164 主人亲自 → 好感度加成旗（判据仍是 ABL:2 私处感觉——V 版
  // 拷贝残留，1:1）
  if (!era_flag.assiplay) {
    if (abl(cid, 2) >= 3) {
      era.add('tflag:30', 2);
    } else {
      era.add('tflag:30', 1);
    }
  }

  // :1168-1192 调教者童贞丧失（同 V 版的近亲代码表）
  call_incest(); // :1170
  if (tal(player, 1)) {
    era.set(`talent:${player}:1`, 0);
    era.print('【童贞丧失】'); // :1171（原文 童貞喪失，#60 归一）
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
  era.set('tflag:14', 0); // :1194

  // —— 汚移：COMF90 无 Ｖ⇔Ｐ 移动段（原文 :1195-1197 为空注释段） ——
}

module.exports = {
  STUBBED_CALLS,
  confirm_lost_virgin,
  com_ejac_player_sex,
  com_ejac_player_milk,
  com_after_vagina_sex,
  com_after_extra_sex,
};
