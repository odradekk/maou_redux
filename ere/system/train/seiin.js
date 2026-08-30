/**
 * @file 精饮绝顶：口内射精的连锁绝顶判定（eraIM@S 流用）。
 *
 * 源: target/ERB/調教相關/SEIIN.ERB
 *     @SEIIN_START（:6-23，入口——@EX_CHECK_UP 的 ECST_CHECK 之后调用，
 *     ere/event/source-check.js）/ @SEIIN_CHECK（:25-78，强制精饮绝顶的
 *     回数阈值 P 计算）/ @SEIIN_ORGASM（:80-122，精饮绝顶本体——喜欢精液
 *     素质者直行）/ @SEIIN_COMPULSION_ORGASM（:124-166，强制精饮绝顶——
 *     帕夫洛夫计数器 CFLAG:600 达阈值 P 时获得喜欢精液 + 精液中毒 LV3）
 *
 * 触发位：TFLAG:0 = 口で射精（本回合口内射精次数，奉仕系指令写——J12
 * 落地后游玩可达，此前仅测试可驱动）；TFLAG:29 = 绝顶强度
 * （@ECST_CHECK 写，已在库）；TFLAG:899 = 失神中（passout.js 写）——
 * 失神抑制精饮绝顶。FLAG:72 = 系统开关（与 FLAG:70 同形态：全库零写点
 * → 恒开，守卫 1:1 保留）。
 *
 * 变量语义：TALENT:47 = 喜欢精液；CFLAG:600 = 强制精饮绝顶累计回数；
 * TFLAG:110 = 喜欢精液获得旗（属主 event——写经 game.event 门面）；
 * EXP:8 = 精饮绝顶经验（属主 dungeon——写经 chara(cid).dungeon 门面）；
 * EX:13 = 精饮绝顶计数（ex 表，属主 train 直写）；ABL:32 = 精液中毒；
 * SOURCE:5/10/11/13 = 快乐否定 / 屈从 / 饮精 / 中毒源。
 *
 * %SHE()%（:143/:153 等）实参为空 = ARG 0 = MASTER 的代词（passout.js
 * 头注同款怪相，1:1）。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');

const tal = (i) => era.get(`talent:${era_flag.target}:${i}`) || 0;
const abl32 = () => Math.floor(era.get(`abl:${era_flag.target}:32`) || 0);
const tflag = (i) => era.get(`tflag:${i}`) || 0;
/** %SAVESTR:TARGET% 的名字承载（#5 决议：无 savestr 通道，读 callname） */
const name_of = (id) => era.get(`callname:${id}:-1`) ?? '';

/** SHE(ARG) 代词（魔改新增/文本校正.ERB :1-7 的三行纯函数，随本票内联） */
function she(id) {
  return era.get(`talent:${id}:122`) || 0 ? '他' : '她';
}

/** TIMES X, m：整数乘小数后截断（math-etc.md） */
const times = (v, m) => Math.floor(v * m);

/**
 * @SEIIN_START（:6-23）：口内射精的连锁绝顶入口。
 * 喜欢精液（47）直行精饮绝顶；否则绝顶中（TFLAG:29 > 0）才查帕夫洛夫
 * 计数器。失神中（TFLAG:899）整体跳过。
 * @returns {Promise<void>}
 */
async function seiin_start() {
  if ((era.get('flag:72') || 0) === 1) {
    return; // :8 系统关闭（头注：全库零写点，恒开）
  }
  if (tflag(0) === 0 || tflag(899) > 0) {
    return; // :11-12 未口内射精 / 失神中
  }
  if (tal(47) && tflag(0) > 0) {
    await seiin_orgasm(); // :15-16 喜欢精液 → 直行
  } else if (tflag(0) > 0 && tflag(29) > 0) {
    await seiin_check(); // :18-19 绝顶中 → 查计数器
  }
}

/**
 * @SEIIN_CHECK（:25-78）：帕夫洛夫计数器的阈值计算。
 * 基础 50，按素质增减（表见 :30-65 的 SIF 串）；算完交强制精饮绝顶。
 * @returns {Promise<void>}
 */
async function seiin_check() {
  // P = 阈值（Emuera 全局，SEIIN_COMPULSION_ORGASM 读——ere 侧显式传参，
  // #214 A/S 同款裁定）
  let p = 50; // :30
  // :32-65 素质修正（+：刚强 13 / 保守 24 / 悲观 26 / 戒备森严 27 /
  // 压抑 32 / 反感污臭 62 / 否定快感 71；-：乐观 25 / 开放 33 /
  // 不怕污臭 61 / 接受快感 70 / 容易上瘾 72 / 倒错 80 / 淫乱 76 -20）
  if (tal(13) === 1) {
    p += 4;
  }
  if (tal(24) === 1) {
    p += 4;
  }
  if (tal(25) === 1) {
    p -= 2;
  }
  if (tal(26) === 1) {
    p += 2;
  }
  if (tal(27) === 1) {
    p += 5;
  }
  if (tal(32) === 1) {
    p += 4;
  }
  if (tal(33) === 1) {
    p -= 2;
  }
  if (tal(61) === 1) {
    p -= 2;
  }
  if (tal(62) === 1) {
    p += 2;
  }
  if (tal(70) === 1) {
    p -= 2;
  }
  if (tal(71) === 1) {
    p += 4;
  }
  if (tal(72) === 1) {
    p -= 5;
  }
  if (tal(80) === 1) {
    p -= 2;
  }
  if (tal(76) === 1) {
    p -= 20;
  }
  await seiin_compulsion_orgasm(p); // :68
}

/**
 * @SEIIN_ORGASM（:80-122）：精饮绝顶本体。
 * @returns {Promise<void>}
 */
async function seiin_orgasm() {
  const cid = era_flag.target;
  // :82-83 计数：EX:13（train 直写）与 EXP:8（dungeon 门面）
  era.add(`ex:${cid}:13`, 1);
  chara(cid).dungeon.精饮绝顶经验 = chara(cid).dungeon.精饮绝顶经验 + 1;

  // :86-99 文案（TFLAG:0 == 2 = 连续两发）
  if (tflag(0) === 2) {
    era.print(`${name_of(cid)}精饮绝顶`);
    era.print('精饮绝顶经验＋1');
    era.print('大量的精液把喉咙灌开了，');
    era.print(
      `${name_of(cid)}一边发出含糊不清的呻吟，一边颤抖着肩膀，达到绝顶高潮了……`,
    );
  } else {
    era.print(`${name_of(cid)}精饮绝顶`);
    era.print('精饮绝顶经验＋1');
    era.print(`阴茎塞满了口腔，${name_of(cid)}只能发出含糊不清的声音，`);
    era.print('随着肩膀轻微的颤动，达到高潮了…');
  }

  // :101-119 源加成（基础 + 经验/精液中毒分档）
  era.set(`source:${cid}:10`, 2000); // 屈从
  era.set(`source:${cid}:11`, 5000); // 饮精
  era.set(`source:${cid}:13`, 10000); // 中毒
  if ((era.get(`exp:${cid}:8`) || 0) === 1) {
    era.set(`source:${cid}:13`, times(era.get(`source:${cid}:13`) || 0, 3.0));
  } else if (abl32() === 3) {
    era.set(`source:${cid}:13`, times(era.get(`source:${cid}:13`) || 0, 2.0));
  } else if (abl32() === 4) {
    for (const k of [10, 11, 13]) {
      era.set(
        `source:${cid}:${k}`,
        times(era.get(`source:${cid}:${k}`) || 0, 1.5),
      );
    }
  } else if (abl32() === 5) {
    for (const k of [10, 11]) {
      era.set(
        `source:${cid}:${k}`,
        times(era.get(`source:${cid}:${k}`) || 0, 2.0),
      );
    }
  }
}

/**
 * @SEIIN_COMPULSION_ORGASM（:124-166）：强制精饮绝顶（帕夫洛夫计数器）。
 * @param {number} p 阈值（@SEIIN_CHECK 算出，Emuera 全局 P 的显式传参）
 * @returns {Promise<void>}
 */
async function seiin_compulsion_orgasm(p) {
  const cid = era_flag.target;
  era.add(`cflag:${cid}:600`, 1); // :127 计数器 +1

  const count = era.get(`cflag:${cid}:600`) || 0;
  if (count >= p) {
    // :130-133 达阈值 → 喜欢精液获得旗（属主 event 走门面）
    era.print('强制精饮绝顶');
    era.print(`${name_of(cid)}彻底地把精液的味道记住了…`);
    game.event.精爱味觉 = 1; // TFLAG:110 = 1
  } else if (count === 1) {
    // :134-141 初回（附带异常经验）
    era.print('强制精饮绝顶');
    era.print(
      `${name_of(cid)}将${era.get('callname:0:-1') ?? ''}射出的精液尽力喝下去了，`,
    );
    era.print('通过持续不断的刺激，');
    era.print(`强制地让${she(0)}去了……`);
    era.print('异常经验＋１');
    chara(cid).dungeon.异常经验 = chara(cid).dungeon.异常经验 + 1;
  } else {
    // :142-150 以降（同文无等待——原注）
    era.print('强制精饮绝顶');
    era.print(
      `${name_of(cid)}将${era.get('callname:0:-1') ?? ''}射出的精液尽力喝下去了，`,
    );
    era.print('通过持续不断的刺激，');
    era.print(`强制地让${she(0)}去了……`);
  }

  // :152-158 达阈值且精液中毒未满 3 → 直接抬到 LV3
  if (count >= p) {
    if (abl32() < 3) {
      era.print(`${name_of(cid)}的精液中毒达到LV3了`);
      era.set(`abl:${cid}:32`, 3); // 属主 train
    }
  }

  // :160-166 源加成
  era.set(`source:${cid}:13`, 1000);
  if (count === 1) {
    era.set(`source:${cid}:13`, times(era.get(`source:${cid}:13`) || 0, 1.5));
  } else if (count === p) {
    era.set(`source:${cid}:5`, 1000); // 快乐否定
  }
}

module.exports = { seiin_start };
