/**
 * @file 秘密实验室的数值层：读数与写档助手、纯计算，以及苏生/召唤/强化/
 * 转生/感觉封锁这些流程里与画面无关的判定与写入。
 *
 * **本文件不调用输出与输入 API。** 提示文案一律经返回值交回调用方，由
 * page/page-shop-labo.js 打出去、等键、收输入。这样「哪一句在什么时候说」
 * 仍只有页面一处真相，而「改哪个变量、改成多少」只有这里一处真相。
 */

'use strict';
/* eslint-disable no-irregular-whitespace -- 部位封锁的播报缩进是全角空格（`　　《…被封锁了》`，原文标点保留） */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { wearing_cloth_able } = require('#/system/train/cloth');
const { char_size_generate } = require('#/chara/chara-body');
const { add_chara_ex, DECLARED_CHARA_IDS } = require('#/chara/chara-ex');
const { normalize_idle_status } = require('#/chara/chara-init');
const { get_look_info, KIND } = require('#/chara/look-info');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const {
  chara_callname,
  chara_name,
  chara_nickname,
} = require('#/utils/callname-utils');
const { MASTER } = require('#/utils/master');
const { default_rand } = require('#/utils/numeric');

// ————————————————————————————————————————————————
// 读数助手（跨域读放行，#70 决议）
// ————————————————————————————————————————————————

/** CFLAG 读数缺省（未声明下标 undefined → 0，#13） */
const cflag = (cid, idx) => era.get(`cflag:${cid}:${idx}`) || 0;
/** TALENT 读数缺省 */
const talent = (cid, idx) => era.get(`talent:${cid}:${idx}`) || 0;
/** ABL 读数缺省 */
const abl = (cid, idx) => era.get(`abl:${cid}:${idx}`) || 0;
/** EXP 读数缺省 */
const exp_of = (cid, idx) => era.get(`exp:${cid}:${idx}`) || 0;
/** MARK 读数缺省 */
const mark = (cid, idx) => era.get(`mark:${cid}:${idx}`) || 0;
/** CSTR 读数缺省（空串） */
const cstr = (cid, idx) => era.get(`cstr:${cid}:${idx}`) ?? '';
/** BASE 读数缺省 */
const base = (cid, idx) => era.get(`base:${cid}:${idx}`) || 0;
/** MAXBASE 读数缺省（无属主产物，读写都不经门面） */
const maxbase = (cid, idx) => era.get(`maxbase:${cid}:${idx}`) || 0;
/** 角色数（CHARANUM，含魔王） */
const charanum = () => era.getAddedCharacters().length;
/** `%TALENTNAME:n%`（引擎静态表 talent 的列名） */
const talentname = (id) => era.get(`talentname:${id}`) ?? '';
/** `%ITEMNAME:n%` */
const itemname = (id) => era.get(`itemname:${id}`) ?? '';
/** 预设的「名前」（不在场的角色也能读） */
const csv_name = (no) => String(era.get(`chara:${no}`)?.name ?? '');
/** `%EXPNAME:n%` */
const expname = (id) => era.get(`expname:${id}`) ?? '';
/** `%ITEMPRICE:n%`（转生门槛 `ITEMPRICE:L_ID / 20` 用） */
const item_price = (id) => era.get(`itemprice:${id}`) || 0;
/** `%SAVESTR:x%`（本作里 = 名前） */
const savestr = (cid) => chara_callname(cid);
/** `%GET_LOOK_INFO(cid, "头发颜色")%` */
const hair_color_name = (cid) => get_look_info(cid, KIND.HAIR_COLOR);

/** 开局设置位图（FLAG:5；era-utils 里没有具名读法，既有消费者一律直读） */
const settings_bitmap = () => era.get('flag:5') || 0;

/** 魔王持有的勋章数（EXP:MASTER:81） */
const medal_count = () => exp_of(MASTER, 81);

/**
 * FLAG:5 的两位闸门（GETBIT(FLAG:5,12) / (FLAG:5,15)，各函数同款）。
 * @returns {boolean} 是否开启胸围随胸档重算
 */
function bust_regen_enabled() {
  const settings = settings_bitmap();
  return ((settings >> 12) & 1) !== 0 || ((settings >> 15) & 1) !== 0;
}

/**
 * 付费（成对的 `MONEY -= X` 与 `EX_FLAG:4444 -= X`）。
 * @param {number} amount 金额
 */
function pay(amount) {
  era_flag.money -= amount;
  era_exflag.legit_money -= amount;
}

/**
 * 消耗勋章。
 * @param {number} count 枚数
 */
function spend_medals(count) {
  chara(MASTER).event.勋章经验 = medal_count() - count;
}

/** 勋章清空（苏生与续命的代价） */
function reset_medal() {
  chara(MASTER).event.勋章经验 = 0;
}

// ————————————————————————————————————————————————
// 身体数值
// ————————————————————————————————————————————————

/**
 * 胸围重算（丰胸/平胸/性成熟三条流程的公共尾段）。
 *
 * 角色不是魔王且 FLAG:5 的位 12/15 任一开时，跑
 * `CALL CHAR_SIZE_GENERATE, T, CFLAG:T:451, 1` 并把返回值 3/4 写回
 * CFLAG:454（体重）/455（胸围）。
 *
 * @param {number} cid 角色 ID
 * @param {(n: number) => number} rand 随机源
 */
function regenerated_bust(cid, rand) {
  if (cid === MASTER) {
    return; // IF T != 0
  }
  if (!bust_regen_enabled()) {
    return; // GETBIT(FLAG:5,12) || GETBIT(FLAG:5,15)
  }
  const body = char_size_generate(cid, cflag(cid, 451), 1, rand);
  chara(cid).chara.体重 = body[3]; // CFLAG:T:454 = RESULT:3
  chara(cid).chara.胸围 = body[4]; // CFLAG:T:455 = RESULT:4
}

/** 阳具形状的显示名（`《巨根》` 等，0 = 普通） */
const FUTANARI_SHAPES = ['普通', '巨根', '短小包茎', '包茎', '马阴茎'];

// ————————————————————————————————————————————————
// 丰胸 / 平胸（各自带加价与档位递变，不走条目表）
// ————————————————————————————————————————————————

/**
 * 丰胸的选人检查（男性、已是超乳）。
 * @param {number} cid 角色 ID
 * @returns {string|null} 提示（null = 放行）
 */
function bustup_guard(cid) {
  if (talent(cid, 122)) {
    return `【${talentname(122)}】不能巨乳化。`;
  }
  if (talent(cid, 119)) {
    return `知足吧，${savestr(cid)}的胸，已经是奇尺大乳了。`;
  }
  return null;
}

/**
 * 丰胸的档位递升。**不调 N_BREAST_GROW**：那条函数是妊娠/母乳路径的
 * 升档，文案与档位取舍都不同——这里采用这一份档位取舍（超乳不再升）。
 * @param {number} cid 角色 ID
 * @returns {string[]} 要打印的播报行
 */
function apply_bustup(cid) {
  if (talent(cid, 116)) {
    const line = `《${savestr(cid)}的【${talentname(109)}】消去了》`;
    chara(cid).chara.绝壁 = 0; // TALENT:T:116 = 0
    chara(cid).chara.贫乳 = 1; // TALENT:T:109 = 1
    return [line];
  }
  if (talent(cid, 109)) {
    const line = `《${savestr(cid)}的胸是标准大小》`;
    chara(cid).chara.贫乳 = 0;
    return [line];
  }
  if (talent(cid, 110)) {
    const line = `《${savestr(cid)}获得【${talentname(114)}】了》`;
    chara(cid).chara.巨乳 = 0;
    chara(cid).chara.爆乳 = 1;
    return [line];
  }
  if (talent(cid, 114)) {
    const line = `《${savestr(cid)}获得【${talentname(119)}】了》`;
    chara(cid).chara.爆乳 = 0;
    chara(cid).chara.超乳 = 1;
    return [line];
  }
  const line = `《${savestr(cid)}获得【${talentname(110)}】了》`;
  chara(cid).chara.巨乳 = 1;
  return [line];
}

/**
 * 平胸的选人检查（男性、已经绝壁）。
 * @param {number} cid 角色 ID
 * @returns {string|null} 提示（null = 放行）
 */
function bustdown_guard(cid) {
  if (talent(cid, 122)) {
    return `【${talentname(122)}】不能贫乳化。`;
  }
  if (talent(cid, 116)) {
    return `${savestr(cid)}已经平如镜子，放过她吧。`;
  }
  return null;
}

/**
 * 平胸的档位递降（文案与 N_BREAST_REVERSE 的档位取舍不同：超乳不再升，
 * 既有行为）。
 * @param {number} cid 角色 ID
 * @returns {string[]} 要打印的播报行
 */
function apply_bustdown(cid) {
  if (talent(cid, 119)) {
    const line = `《${savestr(cid)}获得了【${talentname(114)}】》`;
    chara(cid).chara.超乳 = 0;
    chara(cid).chara.爆乳 = 1;
    return [line];
  }
  if (talent(cid, 114)) {
    const line = `《${savestr(cid)}获得了【${talentname(110)}】》`;
    chara(cid).chara.爆乳 = 0;
    chara(cid).chara.巨乳 = 1;
    return [line];
  }
  if (talent(cid, 110)) {
    const line = `《${savestr(cid)}的胸是标准大小》`;
    chara(cid).chara.巨乳 = 0;
    return [line];
  }
  if (talent(cid, 109)) {
    const line = `《${savestr(cid)}的胸部线条完全没有了》`;
    chara(cid).chara.贫乳 = 0;
    chara(cid).chara.绝壁 = 1;
    return [line];
  }
  const line = `《${savestr(cid)}获得了【${talentname(109)}】》`;
  chara(cid).chara.贫乳 = 1;
  return [line];
}

// ————————————————————————————————————————————————
// 形状 / 外观类改造
// ————————————————————————————————————————————————

/**
 * 扶她化：写入扶她素质与阳具形状。
 * @param {number} cid 角色 ID
 * @param {number} shape 形状（FUTANARI_SHAPES 的下标）
 * @returns {string[]} 要打印的播报行
 */
function apply_futanari(cid, shape) {
  chara(cid).chara.扶她 = 1;
  chara(cid).stronghold.肉芽诅咒 = 0; // TALENT:T:326 = 0（属主 stronghold）
  chara(cid).chara.阴茎的状态 = shape;
  chara(cid).train.童贞 = 1;
  return [
    `《${savestr(cid)}获得【${talentname(121)}】了》`,
    '阴茎的状态：', // PRINT
    `《${FUTANARI_SHAPES[shape]}》`,
  ];
}

/** 刺青部位表（TATOO_NAME:10-17，下标即 CSTR 位） */
const TATOO_NAME = {
  10: '脸',
  11: '胸',
  12: '背',
  13: '下腹',
  14: '屁股',
  15: '性器',
  16: '肛门',
  17: '大腿',
};

/**
 * 刺青的刻印/消去：刺青位 CSTR:10-19 在 ownership 里无测量事实
 * （cstr 表实测下标 11 个，不含 10-19），且寻址含变量段、本就是动态下标
 * ——按既有做法直写。
 * @param {number} cid 角色 ID
 * @param {number} part 部位（CSTR 位）
 * @param {string} text 刺青文字（空串 = 消去）
 * @returns {string} 要打印的播报行
 */
function apply_tattoo(cid, part, text) {
  era.set(`cstr:${cid}:${part}`, text);
  if (text !== '') {
    return `《${TATOO_NAME[part]}上雕刻了『${text}』的刺青》`;
  }
  return `《${TATOO_NAME[part]}的刺青消去了》`;
}

/**
 * 发色的预览名：临时换上候选值取显示名，再换回原值。
 * @param {number} cid 角色 ID
 * @param {number} color 候选发色（1-7）
 * @returns {string} 候选发色的显示名
 */
function hair_color_preview(cid, color) {
  const before = talent(cid, 300);
  chara(cid).chara.头发颜色 = color; // SWAP TALENT:T:头发颜色, COL
  const shown = hair_color_name(cid); // GET_LOOK_INFO
  chara(cid).chara.头发颜色 = before; // SWAP 换回
  return shown;
}

/**
 * 发色确定。
 * @param {number} cid 角色 ID
 * @param {number} color 发色（1-7）
 * @returns {string} 要打印的播报行
 */
function apply_hair_color(cid, color) {
  chara(cid).chara.头发颜色 = color; // TALENT:T:头发颜色 = COL
  return `《${savestr(cid)}的发色变成【${hair_color_name(cid)}】了》`;
}

/** 肤色的三档显示名（按钮正文与播报共用） */
const SKIN_NAMES = ['普通肌肤', '白皙', '褐色肌肤'];

/**
 * 现在的肤色显示名。
 * @param {number} cid 角色 ID
 * @returns {string} 肤色名
 */
function skin_color_name(cid) {
  if (talent(cid, 255)) {
    return '白皙';
  }
  if (talent(cid, 253)) {
    return '褐色肌肤';
  }
  if (talent(cid, 244)) {
    return '恶魔肌肤';
  }
  return '普通肤色';
}

/**
 * 肤色确定（先三清再置一）。
 * @param {number} cid 角色 ID
 * @param {number} col 档位（0 = 普通、1 = 白皙、2 = 褐色）
 * @returns {string} 要打印的播报行
 */
function apply_skin_color(cid, col) {
  const current = skin_color_name(cid);
  chara(cid).chara.白皙 = 0;
  chara(cid).chara.褐色肌肤 = 0;
  chara(cid).chara.恶魔肌肤 = 0;
  if (col === 1) {
    chara(cid).chara.白皙 = 1;
  } else if (col === 2) {
    chara(cid).chara.褐色肌肤 = 1;
  }
  return `《${savestr(cid)}的${current}变成${SKIN_NAMES[col]}了》`;
}

// ————————————————————————————————————————————————
// 感觉封锁
// ————————————————————————————————————————————————

/** 部位号 → 钝感素质下标（`PID * 2 + 101`） */
const PID_TALENT = [101, 103, 105, 107];
/** 部位号 → 能力下标（PAID 映射：0→0、1→2、2→3、3→1） */
const PID_ABL = [0, 2, 3, 1];
/** 部位号 → 默认名（阴核感觉/私处感觉/肛门感觉/乳房感觉） */
const PID_NAMES = ['阴核感觉', '私处感觉', '肛门感觉', '乳房感觉'];
/** 部位号 → 钝感素质的访问器名（与 PID_TALENT 同序） */
const PID_TALENT_NAMES = ['阴蒂钝感', '私处钝感', '肛门钝感', '乳房钝感'];
/** 部位号 → 男性文案 */
const PID_LABEL_MALE = ['阴茎', '私处', '肛门', '乳房'];
/** 部位号 → 女性文案 */
const PID_LABEL_FEMALE = ['阴核', '私处', '肛门', '乳房'];

/**
 * 感觉封锁的部位行（男性不画私处行）。
 * @param {number} cid 角色 ID
 * @returns {{pid: number, label: string, blocked: boolean}[]} 部位行
 */
function block_feeling_rows(cid) {
  const rows = [];
  for (let pid = 0; pid < 4; pid += 1) {
    if (pid === 1 && talent(cid, 122)) {
      continue; // SIF !TALENT:CID:122（男性不画私处行）
    }
    const label =
      pid === 0 ? (talent(cid, 122) ? '阴茎感觉' : '阴核感觉') : PID_NAMES[pid];
    rows.push({
      pid,
      label,
      blocked: (talent(cid, PID_TALENT[pid]) & 2) !== 0,
    });
  }
  return rows;
}

/**
 * 部位封锁的写入（`TALENT:CID:(PID * 2 + 101) |= 2`，读改写经门面）。
 * @param {number} cid 角色 ID
 * @param {number} pid 部位号
 * @returns {string} 要打印的播报行
 */
function apply_block_feeling(cid, pid) {
  chara(cid).chara[PID_TALENT_NAMES[pid]] = talent(cid, PID_TALENT[pid]) | 2;
  const part_label = talent(cid, 122)
    ? PID_LABEL_MALE[pid]
    : PID_LABEL_FEMALE[pid];
  return `　　《${savestr(cid)}的${part_label}被封锁了》`;
}

// ————————————————————————————————————————————————
// 记忆消去
// ————————————————————————————————————————————————

/**
 * 记忆消去的全清：助手解除、ABL / MARK / JUEL 各 100 项、TALENT 74-78
 * 与 85/86、CFLAG 0/2/10。
 * @param {number} cid 角色 ID
 */
function apply_amnesia_reset(cid) {
  // 助手だった場合は解除
  if (era_flag.assi === cid) {
    era_flag.assi = 0;
  }
  // 前回助手だった場合は解除
  if (game.event.上次助手 === cid) {
    game.event.上次助手 = -1;
  }

  // ABL / MARK / JUEL / 特殊性癖（74-78）全清（动态下标，无属主判定）
  for (let local = 0; local < 100; local += 1) {
    era.set(`abl:${cid}:${local}`, 0); // ABL:D:LOCAL = 0
  }
  for (let local = 0; local < 100; local += 1) {
    era.set(`mark:${cid}:${local}`, 0); // MARK:D:LOCAL = 0
  }
  for (let local = 0; local < 100; local += 1) {
    era.set(`juel:${cid}:${local}`, 0); // JUEL:D:LOCAL = 0
  }
  for (let local = 74; local < 79; local += 1) {
    era.set(`talent:${cid}:${local}`, 0); // TALENT:D:LOCAL = 0
  }

  // 陥落系素質
  chara(cid).stronghold.爱慕 = 0; // TALENT:D:85 = 0
  chara(cid).event.盲从 = 0; // TALENT:D:86 = 0

  // CFLAG の初期化
  chara(cid).stronghold.出售与助手资格 = 0; // CFLAG:D:0 = 0
  chara(cid).chara.好感度 = 0; // CFLAG:D:2 = 0
  chara(cid).stronghold.调教回数 = 0; // CFLAG:D:10 = 0
}

/**
 * 记忆消去之后的身体状况（妊娠 / 育児两支的判据）。
 * @param {number} cid 角色 ID
 * @returns {{pregnant: boolean, nursing: boolean, broken: boolean, willing: boolean}}
 *   pregnant 妊娠中、nursing 育児中、broken 精神崩坏、willing 愿意继续带着孩子
 */
function amnesia_state(cid) {
  return {
    pregnant: Boolean(talent(cid, 153)),
    nursing: Boolean(talent(cid, 154)),
    broken: talent(cid, 155) === 0 && talent(cid, 12) === 0,
    willing: Boolean(talent(cid, 155) || talent(cid, 63)),
  };
}

/**
 * 记忆消去时当场精神崩坏。
 * @param {number} cid 角色 ID
 */
function mark_amnesia_broken(cid) {
  chara(cid).stronghold.崩坏 = 1; // TALENT:D:9 = 1
}

// ————————————————————————————————————————————————
// 能力值强化
// ————————————————————————————————————————————————

/** st_up_labo 的四项名称（PRINT HP / 气力 / 攻击 / 防御） */
const ST_UP_NAMES = ['HP', '气力', '攻击', '防御'];

/**
 * 强化上限判据（每项的上限公式各不相同）。
 * @param {number} cid 角色 ID
 * @param {number} b 项目（0 = HP / 1 = 气力 / 2 = 攻击 / 3 = 防御）
 * @returns {[number, number, string]} 当前值、上限、到顶的提示
 */
function st_up_caps(cid, b) {
  return [
    [maxbase(cid, 0), 2000 + cflag(cid, 9) * 50, '*HP的成长到极限了*'],
    [maxbase(cid, 1), 2000 + cflag(cid, 9) * 50, '*气力的成长到极限了*'],
    [cflag(cid, 13), cflag(cid, 9) * 5, '*攻击值的成长到极限了*'],
    [cflag(cid, 14), cflag(cid, 9) * 5, '*防御值的成长到极限了*'],
  ][b];
}

/**
 * 本次最多能强化几次（点数上限按项目不同）。
 * @param {number} cid 角色 ID
 * @param {number} b 项目
 * @returns {number} 次数上限
 */
function st_up_allowance(cid, b) {
  return [
    Math.trunc((2000 + cflag(cid, 9) * 50 - maxbase(cid, 0)) / 10),
    Math.trunc((2000 + cflag(cid, 9) * 50 - maxbase(cid, 1)) / 10),
    cflag(cid, 9) * 5 - cflag(cid, 13),
    cflag(cid, 9) * 5 - cflag(cid, 14),
  ][b];
}

/**
 * 逐项强化（(stick增加，修正实际攻防)：A = T; CALL WEAPON_RESTORE）。
 * @param {number} cid 角色 ID
 * @param {number} b 项目
 * @param {number} times 次数
 * @returns {string} 要打印的播报行
 */
function apply_st_up(cid, b, times) {
  if (b === 0) {
    era.set(`maxbase:${cid}:0`, maxbase(cid, 0) + 10 * times); // （无属主产物）
    return 'HP强化了。';
  }
  if (b === 1) {
    era.set(`maxbase:${cid}:1`, maxbase(cid, 1) + 10 * times);
    return '气力强化了。';
  }
  if (b === 2) {
    chara(cid).chara.基础攻击 = cflag(cid, 13) + times; // CFLAG:T:13 += RESULT
    return '攻击强化了。';
  }
  chara(cid).chara.基础防御 = cflag(cid, 14) + times;
  return '防御强化了。';
}

// ————————————————————————————————————————————————
// 洗脑 / 触手生物
// ————————————————————————————————————————————————

/**
 * 洗脑的选人检查。
 * @param {number} cid 角色 ID
 * @param {number} b 追加的素质编号
 * @returns {string|null} 提示（null = 放行）
 */
function washing_guard(cid, b) {
  if (talent(cid, b)) {
    return `${savestr(cid)}已经有【${talentname(b)}】了。`;
  }
  if (cid !== MASTER && cflag(cid, 0) < 2) {
    return '不能洗脑不可做助手的角色。';
  }
  if (talent(cid, 121) === 0 && talent(cid, 122) === 0 && b === 133) {
    return `不是【${talentname(122)}】和【${talentname(121)}】不能附加该素质，没有相应设备。`;
  }
  if (talent(cid, 152)) {
    return `【${talentname(152)}】的人不能被洗脑。`;
  }
  return null;
}

/**
 * 洗脑的写入。
 * @param {number} cid 角色 ID
 * @param {number} b 追加的素质编号
 * @returns {string} 要打印的播报行
 */
function apply_washing(cid, b) {
  era.set(`talent:${cid}:${b}`, 1); // TALENT:T:B = 1（参数化下标，直写）
  return `${savestr(cid)}获得【${talentname(b)}】了。`;
}

/**
 * 购买触手生物。
 * @returns {string} 要打印的播报行
 */
function buy_tentacles() {
  game.stronghold.触手生物 = 1; // ITEM:90 = 1
  return `《${itemname(90)}入手了》`;
}

// ————————————————————————————————————————————————
// 赋予生命 / 死者苏生
// ————————————————————————————————————————————————

/**
 * 赋予生命的选人检查。
 * @param {number} cid 角色 ID
 * @returns {string|null} 提示（null = 放行）
 */
function given_life_guard(cid) {
  if (talent(cid, 85) === 0) {
    return `${savestr(cid)}已经没有继续留在人间的理由了。`;
  }
  if (base(cid, 10) === 0 && talent(cid, 124) === 0) {
    return `${savestr(cid)}已经拥有超长的寿命了`;
  }
  return null;
}

/**
 * 非人类且无动物耳朵时的开场提示（只提示，不返回）。
 * @param {number} cid 角色 ID
 * @returns {string[]} 要打印的提示行
 */
function given_life_notes(cid) {
  if (base(cid, 10) !== 0) {
    return [];
  }
  return [
    `${savestr(cid)}并非人类、`,
    '作为那个种族的特性，原本已经远超人类的寿命',
    '已经无法再延长了', // PRINT
  ];
}

/**
 * 赋予生命的写入。
 * @param {number} cid 角色 ID
 * @returns {string[]} 要打印的播报行
 */
function apply_given_life(cid) {
  const lines = [];
  if (talent(cid, 124)) {
    lines.push(`${savestr(cid)}的寿命被延长了`);
    chara(cid).chara.动物耳朵 = 0; // TALENT:T:124 = 0
  }
  if (base(cid, 10) > 0) {
    lines.push(`${savestr(cid)}的寿命还有很久，无需延长。`);
    chara(cid).stronghold.寿命 = 0; // BASE:T:10 = 0
  }
  return lines;
}

/**
 * 苏生资格：死亡标记、不在场、预设存在。
 *
 * FLAG:1000–1099 <= -2 为死亡标记，-1 表示已苏生或购买。重新加入的角色
 * 可能残留死亡标记，不能覆盖在场角色的养成数据。
 * @param {number} cid 角色 ID
 * @returns {boolean} 是否可苏生
 */
const can_revive = (cid) =>
  (era.get(`flag:${cid + 999}`) || 0) <= -2 &&
  !era.getAddedCharacters().includes(cid) &&
  era.getAllCharacters().includes(cid);

/**
 * 可苏生的预设编号（1-100）。
 * @returns {number[]} 预设编号
 */
function revive_candidates() {
  const candidates = [];
  for (let count = 0; count < 100; count += 1) {
    if (can_revive(count + 1)) {
      candidates.push(count + 1);
    }
  }
  return candidates;
}

/**
 * 苏生：加入角色并做专属初始化。
 *
 * `ADDCHARA D`（D = 预设编号）之后 `C = CHARANUM - 1`——在新加入即末位的
 * 序号世界等于 D，ere 侧角色 ID 就是预设编号。
 *
 * 待机档归一：苏生名单是预设 1-100，其中 33 个角色的状态预设是原版的
 * 1 = 待機，而移植版四个操作页都以 0 放行（判据只有一处，见 chara-init.js
 * 的 normalize_idle_status；读档钩子走同一个函数）。
 * @param {number} preset 预设编号
 * @returns {Promise<string>} 要打印的播报行
 */
async function apply_revive(preset) {
  era.addCharacter(preset); // ADDCHARA D
  await add_chara_ex_defined(preset); // CALL ADDCHARA_EX, CHARANUM-1
  normalize_idle_status(preset);
  era.set(`flag:${preset + 999}`, -1); // FLAG:C = -1（购买标记）
  era_flag.target = preset; // TARGET = C
  return `《${savestr(preset)}被从彼岸召唤回来了》`;
}

/**
 * 贞操带钥匙的选人检查。
 * @param {number} cid 角色 ID
 * @returns {string|null} 提示（null = 放行）
 */
function chastity_key_guard(cid) {
  if (cflag(cid, 49) === 0) {
    return `没有${chara_nickname(cid)}贞操带钥匙的必要。`;
  }
  return null;
}

/**
 * 找回贞操带钥匙。
 * @param {number} cid 角色 ID
 * @returns {string[]} 要打印的播报行
 */
function apply_chastity_key(cid) {
  chara(cid).stronghold.贞操带钥匙已丢弃 = 0; // CFLAG:T:49 = 0
  return [`《${savestr(cid)}的贞操带钥匙找到了》`, '《【勋章】不见了》'];
}

// ————————————————————————————————————————————————
// 淫乱 ⇄ 爱慕互换
// ————————————————————————————————————————————————

/**
 * 淫乱 ⇄ 爱慕互换（两个方向的条件逐字保留）。
 * @param {number} cid 角色 ID
 * @returns {{ok: boolean, lines: string[]}} 成交与否与要打印的播报行
 */
function specialtalent_swap(cid) {
  // 爱慕变淫乱
  if (
    talent(cid, 85) &&
    abl(cid, 11) >= 3 &&
    abl(cid, 0) + abl(cid, 1) + abl(cid, 2) + abl(cid, 3) >= 10 &&
    exp_of(cid, 50) >= 3 &&
    mark(cid, 1) === 3 &&
    mark(cid, 2) === 3
  ) {
    chara(cid).stronghold.爱慕 = 0; // TALENT:T:85 = 0
    chara(cid).stronghold.淫乱 = 1; // TALENT:T:76 = 1
    return {
      ok: true,
      lines: [
        `《${savestr(cid)}的【${talentname(85)}】被消去了》`,
        `${savestr(cid)}看你的眼神，好像忘记了你还有上半身…`,
        `${savestr(cid)}沉迷于${chara_nickname(MASTER)}给予的快感之中了……`,
        `${savestr(cid)}获得了【${talentname(76)}】。`,
      ],
    };
  }
  // 淫乱变爱慕
  if (
    talent(cid, 76) &&
    abl(cid, 10) >= 3 &&
    exp_of(cid, 21) >= 200 &&
    talent(cid, 85) === 0 &&
    mark(cid, 2) === 3 &&
    abl(cid, 16) >= 3
  ) {
    chara(cid).stronghold.淫乱 = 0;
    chara(cid).stronghold.爱慕 = 1;
    return {
      ok: true,
      lines: [
        `《${savestr(cid)}的【${talentname(76)}】被消去了》`,
        `${savestr(cid)}柔情似水地看着你…`,
        `${savestr(cid)}因${chara_nickname(MASTER)}的行为而感到喜悦。想粘着你，想为你分忧，为你做些什么…渴望着你的宠爱。`,
        `${savestr(cid)}获得了【${talentname(85)}】。`,
      ],
    };
  }
  return { ok: false, lines: [`${savestr(cid)}改变失败了`] };
}

// ————————————————————————————————————————————————
// 自由局部调教
// ————————————————————————————————————————————————

/**
 * 自由局部调教的内容设定（写入同时重置该部位的调教成果）。
 * @param {number} cid 角色 ID
 * @param {string} text 调教内容（空串 = 重置）
 * @returns {string} 要打印的播报行
 */
function apply_free_train(cid, text) {
  chara(cid).stronghold.自由调教内容 = text; // CSTR:LOCAL:7 = %RESULTS%
  chara(cid).train.局部感觉 = 0; // ABL:LOCAL:4 = 0
  chara(cid).train.局部中毒 = 0; // ABL:LOCAL:40 = 0
  era.set(`juel:${cid}:15`, 0); // JUEL:LOCAL:15 = 0（无属主产物，直写）
  if (text === '') {
    return '自由局部调教重置完毕。';
  }
  return `${text}调教设定完毕。`;
}

// ————————————————————————————————————————————————
// 转生
// ————————————————————————————————————————————————

/** 魔族类型表（TYPEDATA，11 行 × 若干列） */
const DEMON_TYPES = [
  [133, 143, 153, 163, 160, 170], // 男巫/女巫/男祭司/女忍/黑暗骑士/女祭司
  [104, 113, 114, 172, 181], // 丧尸/丧尸虫/丧尸猎犬/吸血鬼/死亡领主
  [110, 130, 121, 150], // 兽人/巨魔/食人魔/巨人
  [101, 111, 123, 134, 164, 171], // 哥布林/熊地精/小仙子/报丧女妖/小精灵/无头骑士
  [100, 120], // 狗头人/蜥蜴人
  [102, 131, 142, 173, 184], // 黏液怪/石像鬼/史莱姆/幽灵/眼魔
  [122, 141, 151, 162, 183], // 食铠者/地狱猎犬/奇美拉/食脑魔/梦魇
  [103, 124, 174], // 龙头苍蝇/毒蜈蚣/死亡蝎
  [112, 144], // 藤蔓怪/吸血树
  [132, 140, 180], // 小恶魔/下等恶魔/大恶魔
  [154, 152, 182], // 夜少女/魅魔/莉莉丝
];

/** 转生附加素质（两条活代码；SKIPSTART 段不移植） */
const DEMON_BONUS = {
  狗头人: [124, '头上长出【动物耳】了！'],
  丧尸猎犬: [124, '头上长出【动物耳】了！'],
  地狱猎犬: [124, '头上长出【动物耳】了！'],
  奇美拉: [124, '头上长出【动物耳】了！'],
  梦魇: [124, '头上长出【动物耳】了！'],
  魅魔: [91, '的肉体上散发出致命的诱惑，获得了【魅惑】……'],
  莉莉丝: [91, '的肉体上散发出致命的诱惑，获得了【魅惑】……'],
};

/**
 * 类型条件表（COND）：0 = 条件不满足（灰显 + 拒绝）。
 * 只有 1（恶魔肌肤）、2（魁梧）、9（四件恶魔体征）、10（四件 + 淫乱）四行
 * 有条件，其余行恒 1。
 * @param {number} cid 角色 ID
 * @returns {number[]} 11 行的条件位
 */
function demon_conditions(cid) {
  const cond = new Array(11).fill(1); // VARSET COND, 1
  if (!talent(cid, 244)) {
    cond[1] = 0; // SIF !TALENT:T:恶魔肌肤
  }
  if (!talent(cid, 307)) {
    cond[2] = 0; // SIF !TALENT:T:魁梧
  }
  if (
    (talent(cid, 244) &&
      talent(cid, 247) &&
      talent(cid, 245) &&
      talent(cid, 246)) === 0
  ) {
    cond[9] = 0;
  }
  if (
    (talent(cid, 244) &&
      talent(cid, 247) &&
      talent(cid, 245) &&
      talent(cid, 246) &&
      talent(cid, 76)) === 0
  ) {
    cond[10] = 0;
  }
  return cond;
}

/**
 * 类型菜单的标题行（现种族只在种族 9 且已转生过时显示）。
 * @param {number} cid 角色 ID
 * @returns {string} 标题
 */
function demon_header(cid) {
  if (talent(cid, 314) !== 9 && talent(cid, 322) > 0) {
    return `要让${savestr(cid)}（${itemname(talent(cid, 322))}）转生为何种魔族？`;
  }
  return `要让${savestr(cid)}转生为何种魔族？`;
}

/**
 * 类型菜单的按钮表（快捷键 = 行 × 10 + 列，现种族跳过）。
 * @param {number} cid 角色 ID
 * @returns {{acc: number, label: string}[]} 按钮表
 */
function demon_options(cid) {
  const options = [];
  for (const [row, ids] of DEMON_TYPES.entries()) {
    for (const [col, id] of ids.entries()) {
      if (talent(cid, 322) === id) {
        continue; // 现种族与它相同的跳过
      }
      options.push({ acc: row * 10 + col, label: itemname(id) });
    }
  }
  return options;
}

/**
 * 按钮快捷键回查类型编号（L_T = RESULT / 10、L_I = RESULT % 10）。
 * @param {number} acc 按钮快捷键
 * @returns {number} 类型编号（0 = 表里没有这一格）
 */
function demon_type_of(acc) {
  const row = Math.trunc(acc / 10);
  const col = acc % 10;
  return (DEMON_TYPES[row] ?? [])[col] ?? 0; // L_ID = TYPEDATA:L_T:L_I
}

/**
 * 转生时补一项素质（缺了才补并报文案）。
 * @param {number} cid 角色 ID
 * @param {number} index 素质下标
 * @param {string} message 文案（名字之后的部分）
 * @returns {string[]} 要打印的播报行
 */
function labo_dr_get_talent(cid, index, message) {
  if (!talent(cid, index)) {
    era.set(`talent:${cid}:${index}`, 1); // （参数化下标，直写）
    return ['', `${savestr(cid)}${message}`]; // PRINTL + PRINTFORMW
  }
  return [];
}

/**
 * 转生时改发色。
 * @param {number} cid 角色 ID
 * @param {number} color 发色（1-7）
 * @returns {string[]} 要打印的播报行（原名 → 新名）
 */
function labo_dr_change_hair_color(cid, color) {
  if (talent(cid, 300) !== color) {
    const before = `${savestr(cid)}的头发颜色从${hair_color_name(cid)}`; // PRINTFORM
    chara(cid).chara.头发颜色 = color; // TALENT:ARG:头发颜色 = ARG:1
    return [before, `变成${hair_color_name(cid)}了`]; // PRINTFORMW
  }
  return [];
}

/**
 * 转生：种族切换 + 附加素质 + 发色概率变化。
 * @param {number} cid 角色 ID
 * @param {number} type_id 目标魔族类型
 * @param {(n: number) => number} rand 随机源
 * @returns {string[]} 要打印的播报行
 */
function apply_rebirth(cid, type_id, rand = default_rand) {
  // 种族切换（原种族只在首次转生时记录）
  if (talent(cid, 314) !== 9) {
    chara(cid).chara.原种族 = talent(cid, 314);
  }
  chara(cid).chara.种族 = 9;
  chara(cid).chara.现种族 = type_id;
  const lines = [
    '浓郁的魔力充斥四周………',
    `${savestr(cid)}的转生仪式成功了，已经转生为`,
    `《【魔族中的${itemname(type_id)}】了》`,
  ];
  // 付加素質（SKIPSTART 段不移植）
  const bonus = DEMON_BONUS[itemname(type_id)];
  if (bonus) {
    lines.push(...labo_dr_get_talent(cid, bonus[0], bonus[1])); // 的两支活代码
  }
  // 头发颜色（1/3 概率变，1-7 之一）
  if (rand(3) === 0) {
    lines.push(...labo_dr_change_hair_color(cid, rand(7) + 1));
  }
  return lines;
}

// ————————————————————————————————————————————————
// 召唤影之仆从
// ————————————————————————————————————————————————

/**
 * 召唤的候选（收录编号 150-199 里预设存在且不在场的）。
 * @returns {number[]} 候选编号
 */
function summon_candidates() {
  const candidates = [];
  for (let id = 150; id <= 199; id += 1) {
    if (!era.getAllCharacters().includes(id)) continue; // EXISTCSV
    if (era.getAddedCharacters().includes(id)) continue; // 同号已在场
    candidates.push(id);
  }
  return candidates;
}

/**
 * 召唤：加入角色并落召唤酔い、命名检查与代价。
 *
 * `LOCAL:1 = CHARANUM - 1`：序号世界里新角色恒在末位；ere 侧角色 ID
 * 就是收录编号。
 * @param {number} id 收录编号（即角色 ID）
 * @returns {Promise<number>} 新角色 ID
 */
async function apply_summon(id) {
  era.addCharacter(id); // ADDCHARA LOCAL
  const new_cid = id;
  await add_chara_ex_defined(new_cid); // CALL ADDCHARA_EX, CHARANUM-1
  chara(new_cid).chara.加入时名字 = chara_name(new_cid);
  const prev_target = era_flag.target; // LOCAL:2 = TARGET
  era_flag.target = new_cid; // TARGET = LOCAL:1
  wearing_cloth_able(new_cid); // CALL WEARING_CLOTH_ABLE
  era_flag.target = prev_target; // TARGET = LOCAL:2

  chara(new_cid).stronghold.魔王之影 = 1; // TALENT:(LOCAL:1):286-292 = 1
  chara(new_cid).invasion.状态 = 11; // CFLAG:(LOCAL:1):1 = 11（召喚酔い）
  chara(new_cid).chara.命名检查 = 1; // CFLAG:(LOCAL:1):420 = 1
  for (let idx = 800; idx < 810; idx += 1) {
    era.set(`cflag:${new_cid}:${idx}`, 0); // （动态下标，直写）
  }
  chara(MASTER).chara.等级 = cflag(MASTER, 9) - 30; // CFLAG:0:9 -= 30
  game.invasion.肉便器数 = game.invasion.肉便器数 - 30; // FLAG:83 -= 30
  return new_cid;
}

// ————————————————————————————————————————————————
// 肉棒改造
// ————————————————————————————————————————————————

/**
 * 肉棒改造的选人检查。
 * @param {number} cid 角色 ID
 * @returns {string|null} 提示（null = 放行）
 */
function penis_remodel_guard(cid) {
  if (talent(cid, 122) === 0 && talent(cid, 121) === 0) {
    return '魔王大人哦？这孩子还没有肉棒呢？';
  }
  if (cflag(cid, 1) === 2) {
    return `${savestr(cid)}还不在你的统治之下。`;
  }
  return null;
}

/**
 * 肉棒改造的开场（扶她档四行、男性档一行、无肉棒档空）。
 * @param {number} cid 角色 ID
 * @returns {string[]} 要打印的开场行
 */
function penis_remodel_intro(cid) {
  if (talent(cid, 121) === 1) {
    return [
      `${savestr(cid)}被实验室的女主任绑在改造台上，下身的衣物已然被脱了个精光，散落在地上。`,
      `对方口中含着${savestr(cid)}的扶她肉棒，在巧妙的口技下${savestr(cid)}也难免硬了起来！`,
      '唔？魔王大人，想让这孩子的扶她肉棒，唔！',
      '哈一一一，变成什么样子呢？',
    ];
  }
  if (talent(cid, 122) === 1) {
    return [`魔王大人，想让${savestr(cid)}的肉棒变成什么样子呢？`];
  }
  return [];
}

/**
 * 肉棒改造的写入。
 * @param {number} cid 角色 ID
 * @param {number} shape 形状（FUTANARI_SHAPES 的下标）
 * @returns {string[]} 要打印的播报行
 */
function apply_penis_remodel(cid, shape) {
  chara(cid).chara.扶她 = 1; // TALENT:T:121 = 1
  chara(cid).stronghold.肉芽诅咒 = 0; // TALENT:T:326 = 0（属主 stronghold）
  chara(cid).chara.阴茎的状态 = shape; // TALENT:T:318 = RESULT
  chara(cid).train.童贞 = 1; // TALENT:T:1 = 1
  return [
    `《${savestr(cid)}获得【${talentname(121)}】了》`,
    '肉棒的状态：', // PRINT
    `《${FUTANARI_SHAPES[shape]}》`,
  ];
}

// ————————————————————————————————————————————————
// 跨模块薄封装
// ————————————————————————————————————————————————

/**
 * `CALL ADDCHARA_EX`（`TRYCALLFORM CHARA_EX_{NO:ARG}` 的分发入口）：
 * 对没有分发实现的编号，旧引擎按缺省静默跳过，而 `chara-ex.js` 的分发
 * 家族把「声明空间外」判成拼写错误会抛。两处调用点的编号来自玩家输入
 * 或数据表（召唤 150-199、苏生 1-100），不是代码里的字面量，先问声明空间，
 * 不在里面就照旧静默跳过。
 * @param {number} cid 角色 ID
 * @returns {Promise<void>}
 */
async function add_chara_ex_defined(cid) {
  if (DECLARED_CHARA_IDS.includes(cid)) {
    await add_chara_ex(cid);
  }
}

/**
 * 调教外借 TFLAG:13 传口上事件码（game.train 的既有承载：
 * 据点期没有 tflag 表，with_self_kojo_event 用调用链内的临时值承载）。
 * @param {number} event 事件码
 * @param {() => Promise<unknown>} callback 口上调用
 * @returns {Promise<unknown>}
 */
function with_self_kojo(event, callback) {
  return game.train.with_self_kojo_event(event, callback);
}

module.exports = {
  abl,
  apply_amnesia_reset,
  apply_block_feeling,
  apply_bustdown,
  apply_bustup,
  apply_chastity_key,
  apply_free_train,
  apply_futanari,
  apply_given_life,
  apply_hair_color,
  apply_penis_remodel,
  apply_rebirth,
  apply_revive,
  apply_skin_color,
  apply_st_up,
  apply_summon,
  apply_tattoo,
  apply_washing,
  amnesia_state,
  base,
  block_feeling_rows,
  bust_regen_enabled,
  bustdown_guard,
  bustup_guard,
  buy_tentacles,
  can_revive,
  cflag,
  charanum,
  chastity_key_guard,
  cstr,
  csv_name,
  demon_conditions,
  demon_header,
  demon_options,
  demon_type_of,
  exp_of,
  expname,
  FUTANARI_SHAPES,
  given_life_guard,
  given_life_notes,
  hair_color_name,
  hair_color_preview,
  item_price,
  itemname,
  mark,
  mark_amnesia_broken,
  maxbase,
  medal_count,
  pay,
  penis_remodel_guard,
  penis_remodel_intro,
  PID_ABL,
  PID_LABEL_FEMALE,
  PID_LABEL_MALE,
  PID_NAMES,
  PID_TALENT,
  PID_TALENT_NAMES,
  regenerated_bust,
  reset_medal,
  revive_candidates,
  savestr,
  settings_bitmap,
  SKIN_NAMES,
  skin_color_name,
  specialtalent_swap,
  spend_medals,
  st_up_allowance,
  st_up_caps,
  ST_UP_NAMES,
  summon_candidates,
  talent,
  talentname,
  TATOO_NAME,
  washing_guard,
  with_self_kojo,
};
