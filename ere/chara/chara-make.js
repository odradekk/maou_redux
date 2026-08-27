/**
 * @file 角色生成管线（issue #170，阶段 3 H1）：随机生成一名完整角色。
 *
 * 源: target/ERB/キャラ関数/CHARA_MAKE.ERB  @CHARA_MAKE（:2-120 主体）
 *       同文件 14 个 @CM_* 段：@CM_STP（:124-130）、@CM_BASE（:132-214）、
 *       @CM_KJ（:216-251）、@CM_GENDER（:255-294）、@CM_VIRGIN（:295-347）、
 *       @CM_TALENT（:349-729）、@CM_KIND（:731-738）、@CM_SKILL（:740-858）、
 *       @CM_LOOK（:860-872）、@CM_ST（:875-883）、@CM_ST_ACE（:885-894）、
 *       @CM_FAMILY_TALENT（:896-1042）、@CM_NS_EXP（:1045-1119）、
 *       @CM_CLOTH（:1122-1380）
 *
 * 调用入口是转发层 ere/chara/char-make.js（源 CHAR_MAKE.ERB，全库 30 余处
 * 调用点走转发层的名字，不折叠）。
 *
 * 移植说明（有意偏离，均注明依据）：
 *   - 原作经全局 A 传角色（SWAP A, ARG 的 EraBasic 传参惯例）、经全局 X/
 *     TARGET 换手调 LOOK_SET / WEARING_CLOTH_ABLE，ere 侧一律显式传参
 *     （#5 决议第六条：指针不隐式读全局），SWAP 语义随传参消解；
 *   - NO:A == cid（ere 以角色 ID = 原作 NO 寻址，ere/chara/chara-ex.js 先例），
 *     @CHARA_MAKE 的 INRANGE(NO:A,1,16) 直接对 cid 判定；
 *   - MASTER 恒角色 ID 0（魔王，CONTEXT.md），@CM_ST_ACE 的
 *     CFLAG:MASTER:9 落 cflag:0:9；
 *   - 冒險者性別（魔改使用.ERH:2，GLOBAL SAVEDATA）未入 yml/Global.yml
 *     （该文件头注明确留给魔改子系统票），ere 无寻址通道，按 Emuera 零值
 *     0 落地——@CM_GENDER 的 SELECTCASE 唯一可达臂是 CASE 0；六臂条件
 *     结构 1:1 保留，魔改票落地后改读访问器；
 *   - 赤森奴隶（魔改使用.ERH:12，普通变量非 SAVEDATA）只被
 *     CAMPAIGN_EVENT.ERB:55/:57 写入（阶段 5 战役线未移植），恒 0，
 *     :15 的 `!EX_TALENT:A:2 || 赤森奴隶` 化简为 !EX_TALENT:2；
 *   - ere 无全局 RAND 序列（#117 决议），全部 RAND:N 经注入的 rand_n
 *     掷出（缺省均匀随机，测试注入定值序——ere/chara/chara-init.js 先例）；
 *   - 跨域写一律走门面（#71：属主域门面 setter；本文件属 chara 域，
 *     talent:1/135（train）、talent:11/20/21/22/26/27/30/32/34/52/57/71/82/84
 *     （event）、talent:113（dungeon）、talent:125（stronghold）、cflag:1
 *     （invasion）、cflag:11/12/501/508（dungeon）、cflag:502（event）、
 *     cflag:15/16/41/45/46（train）、cflag:120（patch）、cflag:570（system）、
 *     abl:17/21（system）、abl:20（train）、exp:0/5/10/80（dungeon）、
 *     base:0/1（dungeon）是跨域写）。其余（talent/cflag 的 chara 属主
 *     下标、exp:60）域内裸寻址即合法，读全部放行（#70）；
 *   - @CM_FAMILY_TALENT 的 CALL SEARCH_FAMILY 存根 RESULT 恒 0 →
 *     FAMILY_ID = 0 → :905 起的 IF FAMILY_ID > 0 继承块整体不进（结构
 *     1:1 保留，家族票落地后可达）。
 */

const era = require('#/era-electron');
const { random_self_call } = require('#/chara/chara-init');
const { chara } = require('#/facade/chara');
const era_flag = require('#/era-utils/era-flag');
const { stub_line, stub_line_wait } = require('#/utils/stub-line');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。
 */
const STUBBED_CALLS = [
  'CHARA_NAME_RANDOM_DEFINE',
  'FAMILY_REGISTER',
  'CHAR_BODY_GENERATE_WAPPED',
  'LOOK_SET',
  'SEARCH_FAMILY',
  'CHARA_FIRST_EXP',
  'CMI_CONFLICT_CHECK',
  'ST_UP',
  'WEARING_CLOTH_ABLE',
];

/**
 * @CHARA_MAKE（:2-120）：随机生成一名完整角色。
 *
 * 三分叉（:32-51）决定 CFLAG:A:1——本管线的关键产出：
 *   - 普通勇者（!精英 && !EX_TALENT:1 && !EX_TALENT:2）→ CM_STP 置
 *     CFLAG:A:1 = 2（侵攻中，turnend-settle.js:128 接入点的触发条件）；
 *   - 精英部下（ELSEIF !EX_TALENT:2）→ CFLAG:A:1 = 0；
 *   - 后代（else，EX_TALENT:2）→ CFLAG:A:1 = 0。
 *
 * @param {number} cid 角色 ID（原作全局 A）
 * @param {number} [arg1] 性格设定（160-180 直设；其余值含缺省 0 走随机。
 *   转发层 @CHAR_MAKE 的 ARG:0——ENTER_ENEMY 传 998 即「无指定」）
 * @param {number} [arg2] 种族设定（@CM_LOOK 的实参；缺省 0）
 * @param {(n: number) => number} [rand] 原作 RAND:N（[0,n) 整数）的随机源，
 *   缺省均匀随机，测试注入定值序
 * @returns {Promise<number>} 原作 RETURN ARG（角色号）
 */
async function chara_make(cid, arg1 = 0, arg2 = 0, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  // :12 SWAP A, ARG —— 指针传参消解（文件头）
  const offspring = (era.get(`ex_talent:${cid}:2`) || 0) !== 0; // EX_TALENT:A:2 后代

  // :14-16 性别（后代不掷；赤森奴隶恒 0 见文件头）
  if (!offspring) {
    await cm_gender(cid, rand_n);
  }

  // :18-20 命名（跨文件存根；后代由 CALL 方先命名并设好家族关系）
  if (!offspring) {
    stub_line('CHARA_NAME_RANDOM_DEFINE', '随机命名', '随角色名票');
  }

  // :22-24 等级与经验值
  era.set(`cflag:${cid}:9`, 1); // CFLAG:A:9 等级
  chara(cid).dungeon.战斗经验 = 0; // EXP:A:80 战斗经验

  // :26-27 家族初期化
  era.set(`cflag:${cid}:605`, 0); // CFLAG:A:605 家族

  // :29-30 売春への積極性
  chara(cid).patch.卖春积极性 = 1; // CFLAG:A:120

  // :32-51 三分叉（本函数 JSDoc）：决定 CFLAG:A:1
  const elite = (era.get(`talent:${cid}:220`) || 0) !== 0; // TALENT:A:精英
  const ex1 = (era.get(`ex_talent:${cid}:1`) || 0) !== 0; // EX_TALENT:A:1
  if (!elite && !ex1 && !offspring) {
    await cm_stp(cid); // :34 侵攻楼层·侵攻度·侵攻中·再起点
    await cm_base(cid); // :36 职业、基础
    await cm_st(cid); // :38 勇者初始等级
  } else if (!offspring) {
    chara(cid).invasion.状态 = 0; // :41 初始位置（精英部下）
    await cm_base(cid); // :43 职业、基础
    await cm_st_ace(cid, rand_n); // :45 精英部下初始等级
  } else {
    chara(cid).invasion.状态 = 0; // :48 初始位置（后代）
    await cm_base(cid); // :50 职业、基础
  }

  // :54-60 口上性格（NO:A == cid；精英 200-211 暂用勇者口上）
  if (cid >= 1 && cid <= 16) {
    await cm_kj(cid, arg1, rand_n);
  } else if (cid >= 200 && cid <= 211) {
    // :58 精英，暂用勇者口上
    await cm_kj(cid, arg1, rand_n);
  }

  // :63-65 初心者の烙印（DAY:0 <= 60；开局不写、留 0 恒命中）
  if (era_flag.day_count <= 60) {
    era.set(`talent:${cid}:291`, 1); // TALENT:A:291 新手烙印
  }

  await cm_virgin(cid, rand_n); // :68 处女
  await cm_talent(cid, rand_n); // :71 素质
  await cm_skill(cid, rand_n); // :74 战术技能

  await cm_look(cid, arg2, rand_n); // :77 外貌（ARG:2 种族设定）

  // :79-83 令后代来历生效（2016/11/1）
  if (offspring) {
    era.set(`talent:${cid}:310`, 2); // TALENT:A:阴毛状态 = 2
  }

  await cm_kind(cid, rand_n); // :86 善恶

  // :89-90 妊娠性交经验（后代不掷）
  if (!offspring) {
    await cm_ns_exp(cid, rand_n);
  }

  // :100-102 新的家族系统（后代不设定家族；RAND:4 == 0 时）
  if (rand_n(4) === 0 && !offspring) {
    stub_line('FAMILY_REGISTER', '家族登记', '随家族票');
  }

  // :105 根据家族成员继承素质
  await cm_family_talent(cid, rand_n);

  // :109 コスチューム
  await cm_cloth(cid, rand_n);

  // :112 一人称の設定（ere/chara/chara-init.js 的 #118 实现复用）
  await random_self_call(cid);

  // :114-117 年齢/身長表示设定（FLAG:5 位 12/15）时生成身体数据
  const settings = era.get('flag:5') || 0; // FLAG:5 开局设置位图
  if (((settings >> 12) & 1) !== 0 || ((settings >> 15) & 1) !== 0) {
    await stub_line_wait(
      'CHAR_BODY_GENERATE_WAPPED',
      '角色身体数据生成',
      '随角色身体票',
    );
  }

  // :119-120 SWAP A, ARG / RETURN ARG —— 传参消解
  return cid;
}

/**
 * @CM_STP（:124-130）：侵入阶层·侵攻度·侵攻中·再起点的初始设定。
 *
 * 本管线最关键的七行——CFLAG:A:1 = 2（:127）是
 * ere/system/turnend-settle.js:128 接入点（勇者探索中的迷宫推进）的
 * 触发条件，本函数让它第一次可能为真。
 *
 * @param {number} cid 角色 ID（原作全局 A）
 */
function cm_stp(cid) {
  chara(cid).dungeon.侵攻阶层 = 1; // :125 CFLAG:A:501 侵入阶层
  chara(cid).event.侵攻度 = 0; // :126 CFLAG:A:502 侵攻度
  chara(cid).invasion.状态 = 2; // :127 CFLAG:A:1 侵攻中
  chara(cid).dungeon.再起点 = 3; // :128 CFLAG:A:508 再起点
}

/**
 * @CM_BASE（:132-214）：职业基础参数与职业/种族素质。
 *
 * @param {number} cid 角色 ID
 */
async function cm_base(cid) {
  const t = (n) => (era.get(`talent:${cid}:${n}`) || 0) !== 0;
  const tv = (n) => era.get(`talent:${cid}:${n}`) || 0;

  // :133-169 职业基础四维（CFLAG:11 攻击力 / 12 防御力 / 13 基础攻击 /
  // 14 基础防御；talent:200 战士、205 骑士、201 魔法师、206 巫女、
  // 202 神官、207 忍者、203 盗贼、208 弓手、212 魔物使、220 精英）
  if (t(200) || t(205)) {
    // :133 战士&骑士
    chara(cid).dungeon.攻击力 = 20; // :135
    chara(cid).dungeon.防御力 = 20; // :136
    era.set(`cflag:${cid}:13`, 20); // :137
    era.set(`cflag:${cid}:14`, 20); // :138
  } else if (t(201) || t(206)) {
    // :139 魔法师&巫女
    chara(cid).dungeon.攻击力 = 15; // :141
    chara(cid).dungeon.防御力 = 15; // :142
    era.set(`cflag:${cid}:13`, 15); // :143
    era.set(`cflag:${cid}:14`, 15); // :144
  } else if (t(202) || t(207)) {
    // :145 神官&忍者
    chara(cid).dungeon.攻击力 = 15; // :147
    chara(cid).dungeon.防御力 = 20; // :148
    era.set(`cflag:${cid}:13`, 15); // :149
    era.set(`cflag:${cid}:14`, 20); // :150
  } else if (t(203) || t(208) || t(212)) {
    // :151 盗贼&弓手&魔物使
    chara(cid).dungeon.攻击力 = 20; // :153
    chara(cid).dungeon.防御力 = 15; // :154
    era.set(`cflag:${cid}:13`, 20); // :155
    era.set(`cflag:${cid}:14`, 15); // :156
  } else if (t(220)) {
    // :157 精英（:220）
    chara(cid).dungeon.攻击力 = 15; // :159
    chara(cid).dungeon.防御力 = 15; // :160
    era.set(`cflag:${cid}:13`, 15); // :161
    era.set(`cflag:${cid}:14`, 15); // :162
  } else {
    // :163 その他
    chara(cid).dungeon.攻击力 = 15; // :165
    chara(cid).dungeon.防御力 = 15; // :166
    era.set(`cflag:${cid}:13`, 15); // :167
    era.set(`cflag:${cid}:14`, 15); // :168
  }

  // :171-179 神官&巫女持治愈（talent:117）+ 高信仰值（CFLAG:152）；
  // 战士&骑士&魔物使持鼓舞（talent:118）
  if (tv(202) === 1 || tv(206) === 1) {
    era.set(`talent:${cid}:117`, 1); // :174
    era.set(`cflag:${cid}:152`, 20); // :176
  } else if (tv(200) === 1 || tv(205) === 1 || tv(212) === 1) {
    era.set(`talent:${cid}:118`, 1); // :178
  }

  // :187-203 怪物种族加成（talent:319 种族2）：史莱姆（2）防御系 +5、
  // 触手（5）攻击系 +5、妖精（6）四维 -4、巨人（7）四维 +5
  const race2 = tv(319);
  if (race2 === 2) {
    chara(cid).dungeon.防御力 += 5; // :188
    era.add(`cflag:${cid}:14`, 5); // :189
  } else if (race2 === 5) {
    chara(cid).dungeon.攻击力 += 5; // :191
    era.add(`cflag:${cid}:13`, 5); // :192
  } else if (race2 === 6) {
    chara(cid).dungeon.攻击力 -= 4; // :194
    chara(cid).dungeon.防御力 -= 4; // :195
    era.add(`cflag:${cid}:13`, -4); // :196
    era.add(`cflag:${cid}:14`, -4); // :197
  } else if (race2 === 7) {
    chara(cid).dungeon.攻击力 += 5; // :199
    chara(cid).dungeon.防御力 += 5; // :200
    era.add(`cflag:${cid}:13`, 5); // :201
    era.add(`cflag:${cid}:14`, 5); // :202
  }

  // :205-214 精英持魔之刻印（talent:254）；神官&巫女持治愈；战士&骑士持鼓舞
  if (t(220)) {
    era.set(`talent:${cid}:254`, 1); // :209 魔之刻印
  } else if (t(202) || t(206)) {
    era.set(`talent:${cid}:117`, 1); // :211 治愈
  } else if (tv(200) === 1 || tv(205) === 1) {
    era.set(`talent:${cid}:118`, 1); // :213 鼓舞
  }
}

/**
 * @CM_KJ（:216-251）：口上性格的设定。
 *
 * @param {number} cid 角色 ID
 * @param {number} arg 性格设定（160-180 直设，其余随机）
 * @param {(n: number) => number} rand_n RAND:N 随机源
 */
async function cm_kj(cid, arg, rand_n) {
  const is_male = (era.get(`talent:${cid}:122`) || 0) !== 0;
  // :225 VARSET TALENT:A:0, 0, 160, 180 —— 清 160..179
  for (let i = 160; i < 180; i += 1) {
    era.set(`talent:${cid}:${i}`, 0);
  }
  if (arg >= 160 && arg <= 180) {
    era.set(`talent:${cid}:${arg}`, 1); // :227
  } else {
    // :229-250 $CHARA_MIND_LOOP（重掷回标签，标签在掷骰行之前）
    let x = rand_n(11) + 160; // :230
    for (;;) {
      if (x === 165) {
        // :233 ユニーク除外（村娘Ａ）
        x = rand_n(11) + 160;
        continue;
      }
      if (is_male && x === 166) {
        // :236 男人不能是恶女
        x = rand_n(11) + 160;
        continue;
      }
      break;
    }
    if (is_male && x === 163) {
      // :239 高贵的男人是贵公子
      x = 174;
    }
    if (x === 170) {
      // :241 クラブ（ユニーク）→ 175
      x = 175;
    }
    if (x >= 167 && x <= 169) {
      // :243 ハート/スペード/ダイヤ（ユニーク）→ +5 段
      x += 5;
      if (!is_male && x === 174) {
        // :246 女性贵公子回高贵
        x = 163;
      }
    }
    era.set(`talent:${cid}:${x}`, 1); // :250
  }
}

/**
 * @CM_GENDER（:255-294）：性别掷骰。
 *
 * SELECTCASE 冒險者性別（:259）六臂 1:1 保留；该变量未入 yml/Global.yml
 * （魔改票管辖，文件头），Emuera 零值 0 → 唯一可达臂 CASE 0。
 *
 * @param {number} cid 角色 ID
 * @param {(n: number) => number} rand_n RAND:N 随机源
 */
async function cm_gender(cid, rand_n) {
  // 冒險者性別 = 0（魔改使用.ERH:2 的 GLOBAL SAVEDATA，恒缺省；文件头）
  const adventurer_gender = 0;
  switch (adventurer_gender) {
    case -1:
      // :261 女多男少（2%扶他，20%男性）
      if (rand_n(50) === 0) {
        era.set(`talent:${cid}:121`, 1); // :263 扶她
      } else if (rand_n(5) === 0) {
        era.set(`talent:${cid}:122`, 1); // :265 男人
      }
      break;
    case 0:
      // :267 只有女性（2%扶他）
      if (rand_n(50) === 0) {
        era.set(`talent:${cid}:121`, 1); // :270
      }
      break;
    case 1:
      // :271 只有男性（2%扶他）
      if (rand_n(50) === 0) {
        era.set(`talent:${cid}:121`, 1); // :274
      } else if (rand_n(5) >= 0) {
        // :275 恒真
        era.set(`talent:${cid}:122`, 1); // :276
      }
      break;
    case 2:
      // :278 男多女少（2%扶他，20%女性）
      if (rand_n(50) === 0) {
        era.set(`talent:${cid}:121`, 1); // :281
      } else if (rand_n(5) >= 1) {
        // :282 五分之四
        era.set(`talent:${cid}:122`, 1); // :283
      }
      break;
    case 3:
      // :285 男女持平（2%扶他）
      if (rand_n(50) === 0) {
        era.set(`talent:${cid}:121`, 1); // :288
      } else if (rand_n(2) < 1) {
        // :289 二分之一
        era.set(`talent:${cid}:122`, 1); // :290
      }
      break;
    case 4:
      // :292 全扶她
      era.set(`talent:${cid}:121`, 1); // :293
      break;
    default:
      break;
  }
}

/**
 * @CM_VIRGIN（:295-347）：处女/童贞/初体验相关的初始Flag。
 *
 * @param {number} cid 角色 ID
 * @param {(n: number) => number} rand_n RAND:N 随机源
 */
async function cm_virgin(cid, rand_n) {
  const t = (n) => era.get(`talent:${cid}:${n}`) || 0;
  const offspring = (era.get(`ex_talent:${cid}:2`) || 0) !== 0;
  if (t(122) === 1) {
    // :297 男人
    era.set(`talent:${cid}:0`, 0); // :298 处女 = 0
    if (rand_n(3)) {
      // :300 三分之二童贞
      chara(cid).train.童贞 = 1; // :301
      chara(cid).train.初体验对象 = -1; // :302
      chara(cid).train.初吻对象 = -1; // :303
    } else {
      chara(cid).train.初体验对象 = 0; // :305
      chara(cid).train.初吻对象 = 0; // :306
    }
  } else if (offspring) {
    // :308 后代
    era.set(`talent:${cid}:0`, 1); // :309 处女
    chara(cid).train.初吻对象 = -1; // :310
  } else if (t(121) === 1) {
    // :311 扶她
    if (rand_n(8)) {
      // :313 八分之七扶她处女
      era.set(`talent:${cid}:0`, 1);
    }
    if (rand_n(3) > 0) {
      // :316 扶她初吻&童贞
      chara(cid).train.童贞 = 1; // :317
      chara(cid).train.初吻对象 = -1; // :318
    } else {
      chara(cid).train.初吻对象 = 0; // :320
    }
    if (t(0) && t(1)) {
      // :323 扶她初体验（处女且童贞）
      chara(cid).train.初体验对象 = -1; // :324
    } else if (t(0) === 0 || t(1) === 0) {
      // :325
      chara(cid).train.初体验对象 = 0; // :326
    }
  } else if ((era.get('flag:82') || 0) === 1 && rand_n(2) === 0) {
    // :328 人间界征服后二分之一处女
    era.set(`talent:${cid}:0`, 1); // :329
    chara(cid).train.初吻对象 = -1; // :330
  } else if (rand_n(8)) {
    // :331 八分之七处女
    era.set(`talent:${cid}:0`, 1); // :332
    chara(cid).train.初吻对象 = -1; // :333
  }
  // :336 处女或童贞则初吻未定
  if (t(0) === 1 || t(1)) {
    chara(cid).train.初吻对象 = -1; // :337
  }

  // :340 处女随机贞操封印（精英除外）
  if (t(0) === 1 && rand_n(5) === 0 && t(220) !== 1) {
    era.set(`talent:${cid}:273`, 1); // :341 贞操封印
  }

  // :344 人妻（女、非后代、十二分之一）
  if (rand_n(12) === 0 && t(122) === 0 && !offspring) {
    era.set(`talent:${cid}:157`, 1); // :345 人妻
    era.set(`talent:${cid}:0`, 0); // :346
  }
}

/**
 * @CM_TALENT（:349-729）：性格与身体素质的全量掷骰。
 *
 * 原作按「X = RAND:N + 独立 IF 链」的组织逐块搬移，块间顺序即掷骰顺序
 * （注入定值序的测试依赖此顺序）。跨域写（event/train/dungeon/stronghold
 * 属主）走门面，其余域内裸写（文件头）。
 *
 * @param {number} cid 角色 ID
 * @param {(n: number) => number} rand_n RAND:N 随机源
 */
async function cm_talent(cid, rand_n) {
  const t = (n) => era.get(`talent:${cid}:${n}`) || 0;
  const set_t = (n, v = 1) => era.set(`talent:${cid}:${n}`, v);

  // :353-363 胆怯（10）/ 嚣张（12）/ 文静（14）——性格联动
  let x = rand_n(3);
  if (x === 0 && (t(160) === 1 || t(162) === 1)) {
    set_t(10); // :356 慈爱/懦弱 → 胆怯
  } else if (
    x === 1 &&
    (t(161) === 1 ||
      t(163) === 1 ||
      t(164) === 1 ||
      t(166) === 1 ||
      t(174) === 1)
  ) {
    set_t(12); // :359 自信家/高贵/冷静/恶女/贵公子 → 嚣张
  } else if (x === 2 && (t(160) === 1 || t(162) === 1)) {
    set_t(14); // :362 慈爱/懦弱 → 文静
  }

  // :368-379 反抗心（11）/ 坦率（13）/ 嚣张（16）
  x = rand_n(12);
  if (x === 0) {
    chara(cid).event.反抗心 = 1; // :370
    if (rand_n(8) === 0) {
      set_t(18); // :373 反抗心偶发傲娇
    }
  } else if (x === 1) {
    set_t(13); // :375 坦率
  } else if (
    x === 2 &&
    (t(161) === 1 ||
      t(163) === 1 ||
      t(164) === 1 ||
      t(166) === 1 ||
      t(174) === 1)
  ) {
    set_t(16); // :378 嚣张
  }

  // :384-391 高姿态（15）/ 低姿态（17）/ 傲娇（18）
  x = rand_n(12);
  if (x === 0) {
    set_t(15);
  } else if (x === 1 && t(18) === 0) {
    set_t(17);
  } else if (x === 2 && t(18) === 0) {
    set_t(18);
  }

  // :398-409 冷漠（21）/ 好奇心（23）/ 感情淡薄（22）/ 克制（20）/ 献身的（63）
  x = rand_n(16);
  if (x === 0) {
    chara(cid).event.冷漠 = 1;
  } else if (x === 1) {
    set_t(23);
  } else if (x === 2) {
    chara(cid).event.感情淡薄 = 1;
  } else if (x === 3) {
    chara(cid).event.克制 = 1;
  } else if (x === 4) {
    set_t(63);
  }

  // :414-421 保守的（24）/ 乐观的（25）/ 悲观的（26）
  x = rand_n(12);
  if (x === 0) {
    set_t(24);
  } else if (x === 1) {
    set_t(25);
  } else if (x === 2) {
    chara(cid).event.悲观的 = 1;
  }

  // :425-430 戒备森严（27）/ 爱表现（28）
  x = rand_n(8);
  if (x === 0) {
    chara(cid).event.戒备森严 = 1;
  } else if (x === 1) {
    set_t(28);
  }

  // :434-439 看重贞操（30）/ 看轻贞操（31）
  x = rand_n(12);
  if (x === 0) {
    chara(cid).event.看重贞操 = 1;
  } else if (x === 1) {
    set_t(31);
  }

  // :443-448 压抑（32）/ 开放（33）
  x = rand_n(12);
  if (x === 0) {
    chara(cid).event.压抑 = 1;
  } else if (x === 1) {
    set_t(33);
  }

  // :451-452 抵抗（34）
  if (rand_n(12) === 0) {
    chara(cid).event.抵抗 = 1;
  }

  // :456-461 害羞（35）/ 不知羞耻（36）
  x = rand_n(12);
  if (x === 0) {
    set_t(35);
  } else if (x === 1) {
    set_t(36);
  }

  // :464-465 把柄（37）
  if (rand_n(8) === 0) {
    set_t(37);
  }

  // :469-474 害怕疼痛（40）/ 不惧疼痛（41）
  x = rand_n(12);
  if (x === 0) {
    set_t(40);
  } else if (x === 1) {
    set_t(41);
  }

  // :478-483 容易湿（42）/ 不易湿（43）
  x = rand_n(12);
  if (x === 0) {
    set_t(42);
  } else if (x === 1) {
    set_t(43);
  }

  // :486-487 眼镜（48）
  if (rand_n(12) === 0) {
    set_t(48);
  }

  // :491-496 快速学习（50）/ 学习缓慢（51）
  x = rand_n(12);
  if (x === 0) {
    set_t(50);
  } else if (x === 1) {
    set_t(51);
  }

  // :499-500 擅用舌头（52）
  if (rand_n(8) === 0) {
    chara(cid).event.擅用舌头 = 1;
  }

  // :503-504 漏尿癖（57）
  if (rand_n(50) === 0) {
    chara(cid).event.漏尿癖 = 1;
  }

  // :507-508 容易自慰（60）
  if (rand_n(8) === 0) {
    set_t(60);
  }

  // :512-517 不怕污臭（61）/ 反感污臭（62）
  x = rand_n(12);
  if (x === 0) {
    set_t(61);
  } else if (x === 1) {
    set_t(62);
  }

  // :522-527 接受快感（70）/ 否定快感（71）
  x = rand_n(12);
  if (x === 0) {
    set_t(70);
  } else if (x === 1) {
    chara(cid).event.否定快感 = 1;
  }

  // :530-531 容易上瘾（72）
  if (rand_n(8) === 0) {
    set_t(72);
  }

  // :534-535 容易陷落（73）——「容易陷落頻度はここを弄ってください」
  if (rand_n(30) === 0) {
    set_t(73);
  }
  // :537-538 抵抗诱惑（69）
  if (rand_n(30) === 0) {
    set_t(69);
  }

  // :542-543 倒錯的（80）
  if (rand_n(8) === 0) {
    set_t(80);
  }

  // :547-552 双性恋（81）/ 讨厌男人（82）
  x = rand_n(12);
  if (x === 0) {
    set_t(81);
  } else if (x === 1) {
    chara(cid).event.讨厌男人 = 1;
  }

  // :556-561 抖S气质（ABL:20）/ 抖M气质（ABL:21）
  x = rand_n(8);
  if (x === 0) {
    chara(cid).train.抖S气质 = 3;
  } else if (x === 1) {
    chara(cid).system.抖M气质 = 3;
  }

  // :564-565 嫉妒（84）
  if (rand_n(10) === 0) {
    chara(cid).event.嫉妒 = 1;
  }

  // :568-569 小恶魔（87）
  if (rand_n(8) === 0) {
    set_t(87);
  }

  // :572-573 露出癖（ABL:17）
  if (rand_n(40) === 0) {
    chara(cid).system.露出癖 = 3;
  }

  // :576-577 魅惑（91）
  if (rand_n(20) === 0) {
    set_t(91);
  }

  // :581-594 魁梧（99）/ 娇小（100）——巨人（种族2 = 7）九成魁梧
  x = rand_n(12);
  if (t(319) === 7) {
    if (x <= 8) {
      set_t(99);
    } else if (x === 11) {
      set_t(100);
    }
  } else {
    if (x === 0) {
      set_t(99);
    } else if (x === 1) {
      set_t(100);
    }
  }

  // :598-603 阴蒂钝感（101）/ 阴蒂敏感（102）
  x = rand_n(12);
  if (x === 0) {
    set_t(101);
  } else if (x === 1) {
    set_t(102);
  }

  // :607-612 私处钝感（103）/ 私处敏感（104）——女性限定
  x = rand_n(12);
  if (x === 0 && t(122) === 0) {
    set_t(103);
  } else if (x === 1 && t(122) === 0) {
    set_t(104);
  }

  // :616-621 肛门钝感（105）/ 肛门敏感（106）
  x = rand_n(12);
  if (x === 0) {
    set_t(105);
  } else if (x === 1) {
    set_t(106);
  }

  // :625-630 乳房钝感（107）/ 乳房敏感（108）
  x = rand_n(12);
  if (x === 0) {
    set_t(107);
  } else if (x === 1) {
    set_t(108);
  }

  // :637-647 胸围（女性限定）：超乳（119）> 爆乳（114）> 绝壁（116）>
  // 贫乳（109）> 巨乳（110），先掷先得
  if (rand_n(50) === 0 && t(122) === 0) {
    set_t(119);
  } else if (rand_n(25) === 0 && t(122) === 0) {
    set_t(114);
  } else if (rand_n(24) === 0 && t(122) === 0) {
    set_t(116);
  } else if (rand_n(8) === 0 && t(122) === 0) {
    set_t(109);
  } else if (rand_n(7) === 0 && t(122) === 0) {
    set_t(110);
  }

  // :651-656 快速回复（111）/ 回复缓慢（112）
  x = rand_n(12);
  if (x === 0) {
    set_t(111);
  } else if (x === 1) {
    set_t(112);
  }

  // :659-660 魅力（113）
  if (rand_n(8) === 0) {
    chara(cid).dungeon.魅力 = 1;
  }

  // :667-668 早泄（133）——男/扶他
  if (rand_n(25) === 0 && (t(122) || t(121))) {
    set_t(133);
  }
  // :670-671 软弱（134）——慈爱/懦弱
  if (rand_n(6) === 0 && (t(160) === 1 || t(162) === 1)) {
    set_t(134);
  }
  // :673-679 未熟（135）偶发幼稚（132）与早泄（133）
  if (rand_n(12) === 0) {
    chara(cid).train.未熟 = 1;
    if (rand_n(8) === 0) {
      set_t(132);
    }
    if (rand_n(8) === 0 && (t(122) || t(121))) {
      set_t(133);
    }
  }

  // :683-716 恋母/恋父/萝莉控/正太控情结（140-143）按性别三分
  if (t(122)) {
    // :684 男人多恋母情结与萝莉控
    if (rand_n(25) === 0) {
      set_t(140);
    } else if (rand_n(24) === 0) {
      set_t(142);
    } else if (rand_n(40) === 0) {
      set_t(141);
    } else if (rand_n(39) === 0) {
      set_t(143);
    }
  } else if (t(121)) {
    // :695 扶他中立
    if (rand_n(30) === 0) {
      set_t(140);
    } else if (rand_n(29) === 0) {
      set_t(142);
    } else if (rand_n(28) === 0) {
      set_t(141);
    } else if (rand_n(27) === 0) {
      set_t(143);
    }
  } else {
    // :706 其余多恋父情结与正太控
    if (rand_n(25) === 0) {
      set_t(141);
    } else if (rand_n(24) === 0) {
      set_t(143);
    } else if (rand_n(40) === 0) {
      set_t(140);
    } else if (rand_n(39) === 0) {
      set_t(142);
    }
  }

  // :718-719 不受洗脑（152）
  if (rand_n(30) === 0) {
    set_t(152);
  }

  // :724-729 担保人（290）——有把柄（37）概率高
  if (t(37) && rand_n(4) === 0) {
    set_t(290);
  } else if (rand_n(12) === 0) {
    set_t(290);
  }
}

/**
 * @CM_KIND（:731-738）：善恶值（CFLAG:151，[-150,150] 区间语义、掷骰
 * RAND:200/RAND:100）。精英（:220）善良值低（掷 RAND:100）。
 *
 * @param {number} cid 角色 ID
 * @param {(n: number) => number} rand_n RAND:N 随机源
 */
async function cm_kind(cid, rand_n) {
  if ((era.get(`talent:${cid}:220`) || 0) !== 1) {
    era.set(`cflag:${cid}:151`, rand_n(200)); // :735
  } else {
    era.set(`cflag:${cid}:151`, rand_n(100)); // :737
  }
}

/**
 * @CM_SKILL（:740-858）：战斗与战术技能的掷骰。
 *
 * @param {number} cid 角色 ID
 * @param {(n: number) => number} rand_n RAND:N 随机源
 */
async function cm_skill(cid, rand_n) {
  const t = (n) => era.get(`talent:${cid}:${n}`) || 0;
  const set_t = (n, v = 1) => era.set(`talent:${cid}:${n}`, v);
  const race2 = t(319); // 种族2（talent:319）

  // :743 使役（265）——魔物使（212）必持，其余四十分之一
  if (t(212) === 1 || rand_n(40) === 0) {
    set_t(265);
  }
  // :746-747 战术（240）
  if (rand_n(40) === 0) {
    set_t(240);
  }
  // :750-756 魔术（241）——妖精（种族2 = 6）二十分之一
  if (race2 !== 6) {
    if (rand_n(40) === 0) {
      set_t(241);
    }
  } else {
    if (rand_n(20) === 0) {
      set_t(241);
    }
  }
  // :759-765 法术（242）——妖精同样易学
  if (race2 !== 6) {
    if (rand_n(40) === 0) {
      set_t(242);
    }
  } else {
    if (rand_n(20) === 0) {
      set_t(242);
    }
  }
  // :767-768 奇袭（243）
  if (rand_n(40) === 0) {
    set_t(243);
  }

  // :772-779 肌肉型（248）/ 虚弱（256）——巨人必不虚弱
  if (race2 === 7) {
    if (rand_n(10) === 0) {
      set_t(248);
    }
  } else if (rand_n(30) === 0) {
    set_t(248);
  } else if (rand_n(29) === 0) {
    set_t(256);
  }

  // :782-783 铁壁（249）
  if (rand_n(40) === 0) {
    set_t(249);
  }
  // :786-792 咒术（250）——妖精二十分之一
  if (race2 !== 6) {
    if (rand_n(40) === 0) {
      set_t(250);
    }
  } else {
    if (rand_n(20) === 0) {
      set_t(250);
    }
  }
  // :795-802 忍术（251）——妖精三十分之一（流石に少し少ない）
  if (race2 !== 6) {
    if (rand_n(40) === 0) {
      set_t(251);
    }
  } else {
    if (rand_n(30) === 0) {
      set_t(251);
    }
  }
  // :804-805 先制（252）
  if (rand_n(40) === 0) {
    set_t(252);
  }

  // :808-815 褐色肌肤（253）/ 白皙（255）——暗黑精灵（8）与
  // 魔族（9）偶得黑皮（244）
  if (rand_n(12) === 0) {
    set_t(253);
  } else if (rand_n(11) === 0) {
    set_t(255);
  } else if (race2 === 8 || race2 === 9) {
    if (rand_n(10) === 0) {
      set_t(244);
    }
  }

  // :818-819 魔法耐性（257）
  if (rand_n(40) === 0) {
    set_t(257);
  }
  // :822-823 一术未学的妖精得魔法耐性
  if (
    race2 === 6 &&
    t(241) !== 1 &&
    t(242) !== 1 &&
    t(250) !== 1 &&
    t(251) !== 1
  ) {
    set_t(257);
  }

  // :826-827 俊足（258）
  if (rand_n(40) === 0) {
    set_t(258);
  }

  // :830-834 独眼（259）/ 额头天眼（260）
  if (rand_n(60) === 0) {
    set_t(259);
  } else if (rand_n(59) === 0) {
    set_t(260);
  }

  // :839-852 五系能力者（275-279）各独立四十分之一
  if (rand_n(40) === 0) {
    set_t(275); // 火之能力者
  }
  if (rand_n(40) === 0) {
    set_t(276); // 冰之能力者
  }
  if (rand_n(40) === 0) {
    set_t(277); // 雷之能力者
  }
  if (rand_n(40) === 0) {
    set_t(278); // 光之能力者
  }
  if (rand_n(40) === 0) {
    set_t(279); // 暗之能力者
  }
  // :855-856 额头天眼的暗之能力者第二机会
  if (t(260) === 1 && rand_n(40) === 0) {
    set_t(279);
  }

  // :858 （stick 增加）冲突检查
  stub_line('CMI_CONFLICT_CHECK', '素质冲突检查', '随角色继承票');
}

/**
 * @CM_LOOK（:860-872）：外貌设定。
 *
 * @param {number} cid 角色 ID
 * @param {number} arg 种族设定（@CHARA_MAKE 的 ARG:2）
 * @param {(n: number) => number} rand_n RAND:N 随机源
 */
async function cm_look(cid, arg, rand_n) {
  // :862-865 X = TARGET; TARGET = A; CALL LOOK_SET, ARG; TARGET = X ——
  // 指针换手显式传参消解（#5 决议第六条）
  stub_line('LOOK_SET', '外貌设定', '随外貌票');

  // :868-872 白虎（125）连同阴毛状态（310）/ 阴毛生长极限（311）
  if (rand_n(20) === 0) {
    chara(cid).stronghold.白虎 = 1;
    era.set(`talent:${cid}:310`, 1);
    era.set(`talent:${cid}:311`, 1);
  }
}

/**
 * @CM_ST（:875-883）：勇者初始等级。
 *
 * FLAG:60 > 0 且 FLAG:402 == 0（非派遣）时按 FLAG:60 逐级 CALL ST_UP，
 * 随后体力/气力回满（BASE = MAXBASE）。
 *
 * @param {number} cid 角色 ID
 */
async function cm_st(cid) {
  if ((era.get('flag:60') || 0) > 0 && (era.get('flag:402') || 0) === 0) {
    const times = era.get('flag:60') || 0;
    for (let i = 0; i < times; i += 1) {
      // :879 CALL ST_UP, A（存根，逐级一次）
      await stub_line_wait('ST_UP', '按等级的基础数值初始化', '随升级票');
    }
  }
  chara(cid).dungeon.体力 = era.get(`maxbase:${cid}:0`) || 0; // :882
  chara(cid).dungeon.气力 = era.get(`maxbase:${cid}:1`) || 0; // :883
}

/**
 * @CM_ST_ACE（:885-894）：精英部下初始等级。
 *
 * 魔王（MASTER = cid 0）等级 CFLAG:0:9 > 2 时按其六成（±两成）逐级
 * CALL ST_UP。
 *
 * @param {number} cid 角色 ID
 * @param {(n: number) => number} rand_n RAND:N 随机源
 */
async function cm_st_ace(cid, rand_n) {
  const maou_lv = era.get('cflag:0:9') || 0; // CFLAG:MASTER:9（MASTER = 0）
  if ((era.get('flag:60') || 0) > 0 && maou_lv > 2) {
    let local = maou_lv * 6; // :888 LOCAL = CFLAG:MASTER:9 * 6
    local += rand_n(maou_lv) * 2; // :889
    local = Math.floor(local / 10); // :890
    for (let i = 0; i < local; i += 1) {
      // :892 CALL ST_UP, A（存根，逐级一次）
      await stub_line_wait('ST_UP', '按等级的基础数值初始化', '随升级票');
    }
  }
}

/**
 * @CM_FAMILY_TALENT（:896-1042）：根据家族成员继承身体素质。
 *
 * SEARCH_FAMILY 存根 RESULT 恒 0 → FAMILY_ID = 0 → :905 的
 * IF FAMILY_ID > 0 继承块整体不进（结构 1:1 保留全量搬移，家族票
 * 落地后可达）。家族成员寻址以 family_id 为 cid（era.get 三段读）。
 *
 * @param {number} cid 角色 ID
 * @param {(n: number) => number} rand_n RAND:N 随机源
 */
async function cm_family_talent(cid, rand_n) {
  // :900-901 LOCAL = CFLAG:A:605 与 LOCAL:1 = LOCAL % 10 —— 后者无消费者
  // （原作死赋值），照搬注释不落变量
  // :902 CALL SEARCH_FAMILY, A
  stub_line('SEARCH_FAMILY', '家族检索', '随家族票');
  const family_id = 0; // :903 FAMILY_ID = RESULT（存根恒 0 → 继承块不进）

  if (family_id > 0) {
    const f = (n) => era.get(`talent:${family_id}:${n}`) || 0;
    const set_t = (n, v = 1) => era.set(`talent:${cid}:${n}`, v);
    const is_male = (era.get(`talent:${cid}:122`) || 0) !== 0;

    // :907 家族 <15 岁
    if ((era.get(`cflag:${family_id}:451`) || 0) < 15) {
      // :909 大柄（魁梧）则体格升一段
      if (f(99) && rand_n(3) === 0) {
        if ((era.get(`talent:${cid}:100`) || 0) !== 0) {
          set_t(100, 0); // :911 娇小 → 无
        } else {
          set_t(99); // :913 → 魁梧
        }
      }

      // :918 巨乳以上则胸围升一段（女性限定）。第三臂是
      // `(TALENT:FAMILY_ID:超乳) == 0`——无超乳即升
      if ((f(110) && rand_n(4)) || (f(114) && rand_n(2)) || f(119) === 0) {
        if (!is_male) {
          if ((era.get(`talent:${cid}:116`) || 0) !== 0) {
            set_t(116, 0); // :920 绝壁 → 贫乳
            set_t(109);
          } else if ((era.get(`talent:${cid}:109`) || 0) !== 0) {
            set_t(109, 0); // :923 贫乳 → 平
          } else if (
            (era.get(`talent:${cid}:110`) || 0) === 0 &&
            (era.get(`talent:${cid}:114`) || 0) === 0 &&
            (era.get(`talent:${cid}:119`) || 0) === 0
          ) {
            set_t(110); // :925 平 → 巨乳
          } else if ((era.get(`talent:${cid}:110`) || 0) !== 0) {
            set_t(110, 0); // :927 巨乳 → 爆乳
            set_t(114);
          } else {
            set_t(114, 0); // :930 爆乳 → 超乳
            set_t(119);
          }
        }
      }
      // :935 家族 ≥18 岁
    } else if ((era.get(`cflag:${family_id}:451`) || 0) > 17) {
      // :937 小柄（娇小）则体格降一段
      if (f(100) && rand_n(3) === 0) {
        if ((era.get(`talent:${cid}:99`) || 0) !== 0) {
          set_t(99, 0); // :939 魁梧 → 无
        } else {
          set_t(100); // :941 → 娇小
        }
      }

      // :946 贫乳以下则胸围降一段（女性限定）。第二臂是
      // `(TALENT:FAMILY_ID:绝壁 && RAND:2) == 0`——括号整体 == 0
      // （绝壁假或掷 0），与 :918 的 `(超乳) == 0` 不同形，照抄
      if ((f(109) && rand_n(4)) || (f(116) && rand_n(2)) === 0) {
        if (!is_male) {
          if ((era.get(`talent:${cid}:119`) || 0) !== 0) {
            set_t(119, 0); // :948 超乳 → 爆乳
            set_t(114);
          } else if ((era.get(`talent:${cid}:114`) || 0) !== 0) {
            set_t(114, 0); // :951 爆乳 → 巨乳
            set_t(110);
          } else if ((era.get(`talent:${cid}:110`) || 0) !== 0) {
            set_t(110, 0); // :954 巨乳 → 平
          } else if (
            (era.get(`talent:${cid}:109`) || 0) === 0 &&
            (era.get(`talent:${cid}:116`) || 0) === 0
          ) {
            set_t(109); // :956 平 → 贫乳
          } else {
            set_t(109, 0); // :958 贫乳 → 绝壁
            set_t(116);
          }
        }
      }
    }

    // :964-967 肌肉型/虚弱继承
    if ((f(248) || f(256)) && rand_n(3) === 0) {
      set_t(248, f(248)); // :965
      set_t(256, f(256)); // :966
    }

    // :969-972 褐色肌肤/白皙继承
    if ((f(253) || f(255)) && rand_n(2) === 0) {
      set_t(253, f(253)); // :970
      set_t(255, f(255)); // :971
    }

    // :974-975 额头天眼继承
    if (f(260) && rand_n(3) === 0) {
      set_t(260, f(260));
    }

    // :979-1027 家族「近色」头发：按家族头发颜色档（talent:300）取基准
    // 色值，±5 次 RAND:9 抖动后按区间回落档位
    if (rand_n(5) !== 0) {
      let hair_color = 0;
      if (f(300) === 1) {
        hair_color = 130; // :981 金
      } else if (f(300) === 2) {
        hair_color = 160; // :983 栗
      } else if (f(300) === 3) {
        hair_color = 230; // :985 黑
      } else if (f(300) === 4) {
        hair_color = 150; // :987 赤
      } else if (f(300) === 5) {
        hair_color = 120; // :989 銀
      } else if (f(300) === 6) {
        hair_color = 210; // :991 青
      } else if (f(300) === 7) {
        hair_color = 200; // :993 綠
      } else if (f(300) === 8) {
        hair_color = 220; // :995 紫
      } else if (f(300) === 9) {
        hair_color = 110; // :997 白
      } else if (f(300) === 10) {
        hair_color = 170; // :999 暗金
      } else if (f(300) === 11) {
        hair_color = 140; // :1001 粉
      }
      hair_color =
        hair_color -
        20 +
        rand_n(9) +
        rand_n(9) +
        rand_n(9) +
        rand_n(9) +
        rand_n(9); // :1003
      if (hair_color > 225) {
        set_t(300, 3); // :1005
      } else if (hair_color > 215) {
        set_t(300, 8); // :1007
      } else if (hair_color > 205) {
        set_t(300, 6); // :1009
      } else if (hair_color > 185) {
        set_t(300, 7); // :1011
      } else if (hair_color > 165) {
        set_t(300, 10); // :1013
      } else if (hair_color > 155) {
        set_t(300, 2); // :1015
      } else if (hair_color > 145) {
        set_t(300, 4); // :1017
      } else if (hair_color > 135) {
        set_t(300, 11); // :1019
      } else if (hair_color > 125) {
        set_t(300, 1); // :1021
      } else if (hair_color > 115) {
        set_t(300, 5); // :1023
      } else {
        set_t(300, 9); // :1025
      }
    }

    // :1029-1030 瞳色继承（五分之四）
    if (rand_n(5) !== 0) {
      era.set(`talent:${cid}:306`, f(306));
    }
    // :1032-1033 体型继承（三分之一）
    if (rand_n(3) === 0) {
      era.set(`talent:${cid}:308`, f(308));
    }
    // :1035-1036 乳头继承（三分之一）
    if (rand_n(3) === 0) {
      era.set(`talent:${cid}:309`, f(309));
    }
    // :1038-1041 阴毛状态与生长极限继承（三分之一）
    if (rand_n(3) === 0) {
      era.set(`talent:${cid}:310`, f(310));
      era.set(`talent:${cid}:311`, f(311));
    }
  }
}

/**
 * @CM_NS_EXP（:1045-1119）：妊娠与性交经验、自慰经验、使役怪物的初始设定。
 *
 * @param {number} cid 角色 ID
 * @param {(n: number) => number} rand_n RAND:N 随机源
 */
async function cm_ns_exp(cid, rand_n) {
  const t = (n) => era.get(`talent:${cid}:${n}`) || 0;

  // :1051-1062 出産経験：TALENT:A:320 编码的女儿/儿子数（%1000/100 与
  // %10000/1000 位）
  let p = 0;
  const local = t(320) % 10;
  if (local === 0 && t(157) === 1 && rand_n(2) === 0) {
    p += rand_n(3); // :1054 人妻随机 0-2 次
  } else {
    let daughters = t(320) % 1000; // :1057 娘の数
    p += Math.floor(daughters / 100);
    let sons = t(320) % 10000; // :1060 息子の数
    p += Math.floor(sons / 1000);
  }

  era.add(`exp:${cid}:60`, p); // :1064 EXP:A:60 出産経験（域内）

  // :1067-1076 性交経験：非处女按 P 与随机；处女却有出産経験则消去处女
  if (t(0) === 0) {
    const v = rand_n(8) + 1 + p; // :1068
    chara(cid).dungeon.私处经验 = v; // EXP:A:0
    chara(cid).dungeon.性交经验 = v; // :1069 EXP:A:5 = EXP:A:0
  } else if (p) {
    const v = rand_n(4) + 1 + p; // :1072
    chara(cid).dungeon.私处经验 = v;
    chara(cid).dungeon.性交经验 = v;
    era.set(`talent:${cid}:0`, 0); // :1075 処女を消す
  }

  // :1080-1092 自慰经验四连（偶发巨量 → 男/扶他 → 容易自慰 → 常态）
  if (rand_n(30) === 0) {
    chara(cid).dungeon.自慰经验 = rand_n(50); // :1082 猿みたいなオナニスト
  } else if (t(121) === 1 || t(122) === 1) {
    chara(cid).dungeon.自慰经验 = rand_n(30); // :1085
  } else if (t(60) === 1) {
    chara(cid).dungeon.自慰经验 = rand_n(20); // :1088 容易自慰
  } else if (rand_n(10) === 0) {
    chara(cid).dungeon.自慰经验 = rand_n(10); // :1091
  }

  // :1095 善恶值高不自慰
  if ((era.get(`cflag:${cid}:151`) || 0) > 150) {
    chara(cid).dungeon.自慰经验 = 0;
  }

  // :1099 男人无私处经验
  if (t(122)) {
    chara(cid).dungeon.私处经验 = 0;
  }

  // :1103 初体验
  stub_line('CHARA_FIRST_EXP', '初体验经验设定', '随初体验票');

  // :1106-1118 使役技能（talent:265）持有且无从属怪物（CFLAG:570）时
  // 随机取得（FOR 循环的 BREAK 位置决定阶层段，极稀有超强使役）
  if ((era.get(`cflag:${cid}:570`) || 0) === 0 && t(265)) {
    let local2 = 0;
    for (local2 = 0; local2 < 9; local2 += 1) {
      if (rand_n(3) === 0) {
        break; // :1108-1109
      }
    }
    if (local2 > 8) {
      local2 = 8; // :1111-1112
    }
    local2 *= 10; // :1113
    local2 += 100 + rand_n(5); // :1114
    if (rand_n(50) === 0) {
      local2 = 191 + rand_n(3); // :1116-1117 ごく稀に超強い使役
    }
    chara(cid).system.从属怪物 = local2; // :1118
  }
}

/**
 * @CM_CLOTH（:1122-1380）：按职业决定初始服装与武器。
 *
 * 局部变量 R 是服装类型（写入 CFLAG:A:41 上衣类型）；CFLAG:A:550 是
 * 初始装备（+ RAND:10 * 100000 的接頭語）；CFLAG:A:42 饰品。
 * 职业判定先男（TALENT:A:职业 && TALENT:A:122）后通用（TALENT:A:职业
 * == 1），怪物种族（talent:319 种族2）与精英（220）殿后，兜底 R = 1。
 *
 * @param {number} cid 角色 ID
 * @param {(n: number) => number} rand_n RAND:N 随机源
 */
async function cm_cloth(cid, rand_n) {
  const t = (n) => era.get(`talent:${cid}:${n}`) || 0;
  const tv = (n) => (era.get(`talent:${cid}:${n}`) || 0) !== 0;
  const is_male = tv(122);
  const race2 = t(319); // 种族2
  const set_weapon = (v) => era.set(`cflag:${cid}:550`, v); // CFLAG:A:550 初始装备
  let r = 0; // 服装类型（R）

  if (tv(200) && is_male) {
    // :1126 男战士：锁子甲 + 剑
    r = 3; // :1129
    set_weapon(40); // :1131
  } else if (tv(200)) {
    // :1132 战士（女/扶她）
    if ((era.get(`cflag:${cid}:6`) || 0) >= 4500 && rand_n(3) === 0) {
      // :1137 生成名高（CFLAG:A:6 >= 4500）偶发中华风旗袍
      r = 214; // :1139
      if (rand_n(2) === 0) {
        set_weapon(51); // :1142 月牙刃
      } else {
        set_weapon(52); // :1145 指虎
      }
    } else {
      // :1148-1160 常规战士装
      if (rand_n(6) === 0) {
        r = 292;
      } else if (rand_n(5) === 0) {
        r = 2;
      } else if (rand_n(4) === 0) {
        r = 3;
      } else if (rand_n(3) === 0) {
        r = 4;
      } else if (rand_n(2) === 0) {
        r = 108;
      } else {
        r = 193;
      }
      set_weapon(40); // :1162 剑
    }
  } else if (tv(201) && is_male) {
    // :1164 男魔法师：冒险服 + 护符 + 法杖
    r = 103; // :1167
    era.set(`cflag:${cid}:42`, 85); // :1169 护符（CFLAG:A:42 域内）
    set_weapon(41); // :1171
  } else if (tv(201)) {
    // :1172 魔法师
    if (rand_n(3) === 0) {
      r = 5;
    } else if (rand_n(2) === 0) {
      r = 251;
    } else {
      r = 103;
    }
    era.set(`cflag:${cid}:42`, 85); // :1182
    set_weapon(41); // :1184 法杖
  } else if (tv(202)) {
    // :1185 神官
    if (rand_n(3) === 0) {
      r = 5;
    } else if (rand_n(2) === 0) {
      r = 251;
    } else {
      r = 207;
    }
    set_weapon(46); // :1195 权杖
  } else if (tv(203) && is_male) {
    // :1196 男盗贼：冒险服 + 匕首
    r = 103; // :1199
    set_weapon(43); // :1201
  } else if (tv(203)) {
    // :1202 盗贼
    if (rand_n(3) === 0) {
      r = 5;
    } else if (rand_n(2) === 0) {
      r = 251;
    } else {
      r = 103;
    }
    set_weapon(43); // :1212 匕首
  } else if (tv(205) && is_male) {
    // :1213 男骑士：骑士铠 + 剑
    r = 105; // :1216
    set_weapon(40); // :1218
  } else if (tv(205)) {
    // :1219 骑士
    if (rand_n(3) === 0) {
      r = 105;
    } else if (rand_n(2) === 0) {
      r = 6;
    } else {
      r = 111;
    }
    set_weapon(40); // :1229 剑
  } else if (tv(206) && is_male) {
    // :1230 男巫女：巫女装束 + 法杖
    r = 104; // :1233
    set_weapon(41); // :1235
  } else if (tv(206)) {
    // :1236 巫女
    r = 104; // :1238
    set_weapon(41); // :1240 法杖
  } else if (tv(207) && is_male) {
    // :1241 男忍者：忍者装束 + 手里剑
    r = 110; // :1244
    set_weapon(44); // :1246
  } else if (tv(207)) {
    // :1247 忍者
    r = 110; // :1249
    set_weapon(44); // :1251 手里剑
  } else if (tv(208) && is_male) {
    // :1252 男弓师：冒险服 + 箭
    r = 103; // :1255
    set_weapon(45); // :1257
  } else if (tv(208)) {
    // :1258 弓手
    if (rand_n(3) === 0) {
      r = 5;
    } else if (rand_n(2) === 0) {
      r = 251;
    } else {
      r = 103;
    }
    set_weapon(45); // :1268 弓箭
  } else if (race2 === 2 || tv(137)) {
    // :1269 史莱姆与 FURRY 全裸 + 鞭
    r = 0; // :1271
    set_weapon(42); // :1273
  } else if (race2 === 3) {
    // :1274 昆虫
    if (rand_n(6) === 0) {
      r = 193;
    } else if (rand_n(5) === 0) {
      r = 0;
    } else {
      r = 293;
    }
    set_weapon(42); // :1283
  } else if (race2 === 4) {
    // :1284 植物
    if (rand_n(5) === 0) {
      r = 201;
    } else if (rand_n(4) === 0) {
      r = 202;
    } else if (rand_n(3) === 0) {
      r = 204;
    } else if (rand_n(2) === 0) {
      r = 294;
    } else {
      r = 0;
    }
    set_weapon(42); // :1298
  } else if (race2 === 5) {
    // :1299 触手（海妖意象，下半身空）
    if (rand_n(5) === 0) {
      r = 0;
    } else if (rand_n(4) === 0) {
      r = 19;
    } else if (rand_n(3) === 0) {
      r = 31;
    } else if (rand_n(2) === 0) {
      r = 201;
    } else {
      r = 203;
    }
    set_weapon(42); // :1313
  } else if (race2 === 6) {
    // :1314 妖精
    if (rand_n(5) === 0) {
      r = 0;
    } else if (rand_n(4) === 0) {
      r = 122;
    } else if (rand_n(3) === 0) {
      r = 201;
    } else if (rand_n(2) === 0) {
      r = 241;
    } else {
      r = 294;
    }
    if (is_male && r === 201) {
      r = 103; // :1327-1328
    }
    set_weapon(42); // :1330
  } else if (tv(220)) {
    // :1331 精英（:1348 的男精英臂在原作即不可达——1331 已吃掉全部精英）
    if (rand_n(6) === 0) {
      r = 203;
    } else if (rand_n(5) === 0) {
      r = 2;
    } else if (rand_n(4) === 0) {
      r = 7;
    } else if (rand_n(3) === 0) {
      r = 4;
    } else if (rand_n(2) === 0) {
      r = 103;
    } else {
      r = 193;
    }
    set_weapon(42); // :1347
  } else {
    // :1354 兜底
    r = 1; // :1355
    set_weapon(42); // :1357
  }

  // :1362 初始装备接頭語
  era.set(
    `cflag:${cid}:550`,
    (era.get(`cflag:${cid}:550`) || 0) + rand_n(10) * 100000,
  );
  chara(cid).train.上衣类型 = r; // :1364 CFLAG:A:41
  chara(cid).train.上衣上状态 = 0; // :1365 CFLAG:A:45
  chara(cid).train.上衣下状态 = 0; // :1366 CFLAG:A:46
  r = 0; // :1367

  // :1368-1371 X = TARGET; TARGET = A; CALL WEARING_CLOTH_ABLE; TARGET = X
  // —— 指针换手显式传参消解（#5 决议第六条）；FUNC_CLOTH 归阶段 4
  await stub_line_wait('WEARING_CLOTH_ABLE', '初始着装', '随服装票');

  // :1373-1374 眼镜素质配眼镜饰品
  if (t(48) === 1) {
    era.set(`cflag:${cid}:42`, 83);
  }

  // :1380 RETURN 0
  return 0;
}

module.exports = {
  STUBBED_CALLS,
  chara_make,
  cm_stp,
  cm_base,
  cm_kj,
  cm_gender,
  cm_virgin,
  cm_talent,
  cm_kind,
  cm_skill,
  cm_look,
  cm_st,
  cm_st_ace,
  cm_family_talent,
  cm_ns_exp,
  cm_cloth,
};
