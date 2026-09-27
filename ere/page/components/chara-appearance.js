/**
 * @file 角色信息的外观段与武器装饰行（@SHOW_APPEARACE / @SHOW_RING）。
 *
 * 排版依据同 chara-info-abl-mark.js 的文件头：Emuera 命令名后的**第一个空格
 * 是命令与表达式之间的分隔符**，不算正文——`PRINT  阴茎` 输出 ` 阴茎`（一个
 * 前导空格）。逐字抄源时把这一格减掉。
 *
 * 这一段是**一个持续累加的行缓冲**：叙述逐段追加，换行才收行。阴毛那
 * 七档 IF 链与穿环段都没有 ELSE 兜底，两条链都没命中时**行不收**，后一
 * 段直接接在同一行上（旧版的显示缺陷）。本文件用 row 缓冲承载，只在有
 * 换行的位置收行；没收的行在出口处收掉（见 end_row 调用处的注释）。
 *
 * 有意偏离：
 *   - `ARG:0`（指定角色）→ 显式 cid，TARGET 换出换入不移植（chara-bars.js 同款）；
 *   - 返回值（三处提前返回 1/0）照原样实现，调用方不使用；
 *   - `W:0 = CFLAG:…` 的等价物是一次性的装备记录对象（`{存储编号}`，
 *     equip-print.js 文件头与 page-tailor.js:514 同款）；
 *   - 阴毛段的繁/日字形（`陰部`「長毛」「整斉」）按 #60 的简体锁落简体——
 *     源那一段三种文字混用，玩家可见文本一律简体。
 */

const era = require('#/era-electron');
const {
  equip_ring_spans,
  equip_weapon_spans,
} = require('#/system/equip/equip-print');
const {
  clothtype_main2_text,
  clothtype_text,
} = require('#/page/page-clothtype');
const { chara_callname } = require('#/utils/callname-utils');

/** CFLAG 下标（源里的裸下标，逐个注释） */
const CF_GAPED = 40; // 着衣状态位域
const CF_CLOTH_TYPE = 42; // 特别服装类型
const CF_PIERCING = 7; // 穿环位域
const CF_WEAPON = 550; // 武器
const CF_RING_A = 551; // 装饰Ａ
const CF_RING_B = 552; // 装饰Ｂ

/** CFLAG:40 的位（源 :1230/:1240/:1253/:1257/:1263/:1269/:1276 的逐条判据） */
const BIT_TOPS_OFF = 6; // 上半身赤裸（位 1 + 位 2）
const BIT_SKIRT = 8; // 裙装
const BIT_PANTIES = 1; // 已穿内裤
const BIT_DIAPER = 64; // 尿布／玩偶装

/** CFLAG:7 的位（与 CFLAG:40 的位号同值不同域，单独取名以免读串） */
const PIERCING_NIPPLE = 1; // 乳头

/** 阴毛段（TALENT:310）的七档阈值（源 :1285-1298） */
const HAIR_BANDS = [
  { max: 1, text: '的性器完全没有长毛。' },
  { max: 20, text: '的阴部覆盖着刚刚长出的阴毛。' },
  { max: 50, text: '的阴部覆盖着薄薄的阴毛。' },
  { max: 100, text: '的耻丘长着整齐的阴毛。' },
  { max: 200, text: '的股间长着茂盛的阴毛。' },
  { max: Infinity, text: '从阴阜到肛门都被茂密的阴毛所覆盖。' },
];

/** 穿环位与部位名（源 :1302-1365 的七条 SIF，顺序即输出顺序） */
const PIERCING_BITS = [
  { bit: 8, name: '阴茎' }, // （女体改称阴蒂）
  { bit: 64, name: '鼻子' },
  { bit: 32, name: '嘴唇' },
  { bit: 4, name: '阴唇' },
  { bit: 1, name: '乳头' }, // （上半身赤裸时整段跳过）
  { bit: 2, name: '肚脐' },
  { bit: 16, name: '舌头' },
];

const PIERCING_GENITAL = 8; // 第一枚（阴茎/阴蒂）的位号，改名用

/** CFLAG:40 的「私处不可见」位域（源 :1257 `CFLAG:40 & 17`，位 1 + 位 16） */
const MASK_GENITAL_HIDDEN = 17;

/** 素质编号（yml/Talent.yml） */
const TALENT_WHITE_TIGER = 125; // 白虎
const TALENT_HAIR_STATE = 310; // 阴毛状态

function cflag(cid, index) {
  return era.get(`cflag:${cid}:${index}`) || 0;
}

function cstr(cid, index) {
  return era.get(`cstr:${cid}:${index}`) ?? '';
}

function talent(cid, index) {
  return era.get(`talent:${cid}:${index}`) || 0;
}

/** `NO:x` 的等价物：番号即角色 ID，未声明时回落 ID 本身（com-assistant.js:639 先例） */
function chara_no(cid) {
  return era.get(`no:${cid}`) || cid;
}

/**
 * @SHOW_APPEARACE（:1209-1388）：角色当前外观的整屏描述。
 * @param {number} cid 角色 ID
 * @returns {number} 源 :1236 的 RETURN 1，或三条提前 RETURN 0（其余路径隐式 0）
 */
function show_appearance(cid) {
  let row = [];
  const end_row = () => {
    era.print(row);
    row = [];
  };

  // 脸上的刺青
  if (cstr(cid, 10) !== '') {
    era.print(` 脸上刻着『${cstr(cid, 10)}』样的刺青。`);
  }

  const g = cflag(cid, CF_GAPED);
  // 现在の格好（FLAG:37 服装系统打开时才出）
  if (era.get('flag:37')) {
    row.push({ content: ` ${chara_callname(cid)}现在的样子是` });
    row.push({ content: clothtype_text(cid) });
    row.push({ content: '。' });
    end_row();
  }

  // 玩偶装：CFLAG:42 == 11 且穿了尿布/玩偶装位 → 到此结束
  if (cflag(cid, CF_CLOTH_TYPE) === 11 && (g & BIT_DIAPER) !== 0) {
    if (g === BIT_DIAPER) {
      era.print(' 貌似，里面是真空的。');
    }
    return 1;
  }

  // 上半身赤裸时的三处刺青
  if ((g & BIT_TOPS_OFF) === 0) {
    for (const [index, where] of [
      [11, '胸部上'],
      [12, '背上'],
      [13, '下腹处'],
    ]) {
      if (cstr(cid, index) !== '') {
        era.print(` ${where}刻着『${cstr(cid, index)}』样的刺青。`);
      }
    }
  }

  // 裙装且未穿内裤
  if ((g & BIT_SKIRT) !== 0 && (g & BIT_PANTIES) === 0) {
    era.print(' 貌似没穿内裤。');
  }

  // 性器周辺が見えない状況
  if ((g & MASK_GENITAL_HIDDEN) !== 0) return 0;
  // オムツ着用中
  if ((g & BIT_DIAPER) !== 0 && cflag(cid, CF_CLOTH_TYPE) === 69) return 0;
  // スカートタイプ着用で従順＋露出度が 3 未満
  if (
    (g & BIT_SKIRT) !== 0 &&
    (era.get(`abl:${cid}:10`) || 0) + (era.get(`abl:${cid}:17`) || 0) < 3
  ) {
    return 0;
  }

  row.push({ content: ' ' }); // PRINT（一个半角空格）
  if ((g & BIT_SKIRT) !== 0) {
    // 掀起下摆
    row.push({ content: '掀起' });
    row.push({ content: clothtype_main2_text(cid) });
    row.push({ content: '的下摆，' });
  }

  // 阴毛状态的开头：非魔王才显示名字
  if (chara_no(cid) !== 0) {
    row.push({ content: chara_callname(cid) });
  }
  // 阴毛（TALENT:125 白虎优先；无 ELSE 兜底 → 不命中则本行不收）
  const hair = talent(cid, TALENT_HAIR_STATE);
  if (talent(cid, TALENT_WHITE_TIGER) === 1) {
    row.push({ content: '露出了永久脱毛的阴部。' });
    end_row();
  } else if (hair >= 1) {
    row.push({ content: HAIR_BANDS.find((band) => hair <= band.max).text });
    end_row();
  }

  // 穿环（S 计数决定收尾用语；S == 0 时本行同样不收）
  let pierced = 0;
  const p = cflag(cid, CF_PIERCING);
  for (const { bit, name } of PIERCING_BITS) {
    // 乳头在「上半身赤裸」时整段跳过
    if (bit === PIERCING_NIPPLE && (g & BIT_TOPS_OFF) !== 0) continue;
    if ((p & bit) === 0) continue;
    row.push({ content: pierced > 0 ? '、' : ' ' }); // 等的两种间隔
    // 生殖器那枚按性别取名（源里是两个字面量）
    row.push({
      content:
        bit === PIERCING_GENITAL &&
        talent(cid, 121) === 0 &&
        talent(cid, 122) === 0
          ? '阴蒂'
          : name,
    });
    pierced += 1;
  }
  if (pierced > 1) {
    row.push({ content: '都被穿环了。' });
    end_row();
  } else if (pierced === 1) {
    row.push({ content: '被穿环了。' });
    end_row();
  }

  // 后四处刺青
  for (const [index, where] of [
    [14, '屁股上'],
    [15, '性器上'],
    [16, '肛门上'],
    [17, '大腿上'],
  ]) {
    if (cstr(cid, index) !== '') {
      era.print(` ${where}刻着『${cstr(cid, index)}』样的刺青。`);
    }
  }
  // 出口处把没收的行收掉。旧版把这条未收的行留给行缓冲，紧跟的
  // `CUSTOMDRAWLINE ‥` 会接在它后面（` 名字‥‥‥`）——ere 的 print 与
  // drawLine 各自成行，接不上，收成一行才不会丢玩家可见的字。
  if (row.length !== 0) end_row();
  return 0;
}

/**
 * @SHOW_RING（:1393-1430）：武器与两枚装饰（魔法装备）一行。
 *
 * 空位（存储编号 ≤ -1）用「空手」/「无」；非空位走 equip-print 的片段出口
 * （装备名的 LightSalmon 由那段自带）。
 *
 * @param {number} cid 角色 ID
 */
function show_ring(cid) {
  const stone = [{ content: ' 【武器】: ' }]; // （2 空格减命令分隔符）
  const weapon = cflag(cid, CF_WEAPON);
  if (weapon <= -1) {
    stone.push({ content: '空手' });
  } else {
    stone.push(...equip_weapon_spans({ 存储编号: weapon }));
  }
  stone.push({ content: '　' });

  stone.push({ content: ' 【装饰A】: ' });
  const ring_a = cflag(cid, CF_RING_A);
  if (ring_a <= -1) {
    stone.push({ content: '无' });
  } else {
    stone.push(...equip_ring_spans({ 存储编号: ring_a }));
  }
  stone.push({ content: '　' });

  stone.push({ content: ' 【装饰B】: ' });
  const ring_b = cflag(cid, CF_RING_B);
  if (ring_b <= -1) {
    stone.push({ content: '无' }); // PRINTL 无
  } else {
    stone.push(...equip_ring_spans({ 存储编号: ring_b }));
    stone.push({ content: ' ' }); // PRINTL（一个半角空格）
  }
  era.print(stone);
}

module.exports = { show_appearance, show_ring };
