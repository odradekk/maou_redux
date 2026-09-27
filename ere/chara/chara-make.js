/**
 * @file 角色生成管线（issue #170，阶段 3 H1）：随机生成一名完整角色。
 *
 * 调用入口是转发层 ere/chara/char-make.js（ere 侧 30 余处
 * 调用点走转发层的名字，不折叠）。
 *
 * 移植说明（有意偏离既有行为，均注明依据）：
 *   - **rand_chara_make 的非异国分支边界**（#494，还原既有行为）：性格/发色
 *     写入、形象确认循环、FLAG 搬迁、FLAG:402 与 chara_make 都在非异国
 *     分支体内；异国路径只有三行。本文件曾把整段放在 if/else 之外，已归位
 *     （收下播报的「异国的」前缀也随之区分两路），详见 rand_chara_make 的
 *     JSDoc；
 *   - **战役招募的勇者位只从未被占用的位里抽**（#483 结论·方案 2，见
 *     pick_free_hero_slot）：既有写法会取到已占用的位，并在同号上追加一位同
 *     模板角色。**限制在移植层、不在引擎**（#483 结论对工单前提的勘误）：
 *     引擎 `addCharacter([角色号, 预设号])` 本可分离两者，
 *     代价是 ere 现在把角色号直接当预设号用（#21 的扁平化），一旦分离，所有
 *     按角色号判身份的地方——22 个口上模块的分发、角色表查询、事件判定——
 *     都要改走一个目前不存在的预设号回指字段；衡量后不取，改为只抽空位，
 *     玩家育成过的角色因此不会被重置回预设。偏离只限一次 rand 的取值范围，
 *     16 位全满时走失败分支；
 *   - 角色一律显式传参（#5 决议第六条：指针不隐式读全局），
 *     look_set / wearing_cloth_able 直接拿 cid，不经全局变量换手；
 *   - 通常角色的 template_id == cid；复制预设生成的后代由第四参数传入预设号，
 *     使同一预设可生成多个稳定 ID 的角色。
 *   - 魔王恒角色 ID 0（CONTEXT.md），cm_st_ace 的魔王等级读 cflag:0:9；
 *   - 冒險者性別（原文用字）自 #547 落
 *     yml/Global.yml id 3：era_global.adventurer_gender（开局重置 -1，
 *     设置页 [27] 六档循环），cm_gender 的六分支全可达；
 *   - 赤森奴隶仅在 rand_chara_make() 的战役招募模式内为真（#469 起真身），
 *     且该模式下传给本函数的角色恒是刚加入的非后代（EX_TALENT:2 恒 0，由
 *     调用链决定，非本函数负责保证）——`!EX_TALENT:2 || 赤森奴隶` 化简为
 *     !EX_TALENT:2 因此仍然成立，不随 #469 改动；
 *   - ere 无全局随机序列（#117 决议），随机数全部经注入的 rand_n
 *     掷出（缺省均匀随机，测试注入定值序——ere/chara/chara-init.js 先例）；
 *   - 跨域写一律走门面（#71：属主域门面 setter；本文件属 chara 域，
 *     talent:1/135（train）、talent:11/20/21/22/26/27/30/32/34/52/57/71/82/84
 *     （event）、talent:113（dungeon）、talent:125（stronghold）、cflag:1
 *     （invasion）、cflag:11/12/501/508（dungeon）、cflag:502（event）、
 *     cflag:15/16/41/45/46（train）、cflag:120（patch）、cflag:570（system）、
 *     abl:17/21（system）、abl:20（train）、exp:0/5/10/80（dungeon）、
 *     base:0/1（dungeon）是跨域写）。其余（talent/cflag 的 chara 属主
 *     下标、exp:60）域内裸寻址即合法，读全部放行（#70）；
 *   - cm_family_talent 的 search_family 已接家族检索真身，找到
 *     家族成员后进入素质继承块。
 */

const era = require('#/era-electron');
const { add_chara_ex } = require('#/chara/chara-ex');
const { family_register, search_family } = require('#/chara/chara-family');
const { cmi_conflict_check } = require('#/chara/chara-make-inherit');
const { chara_name_random_define, cn_rebuild } = require('#/chara/chara-name');
const { random_self_call } = require('#/chara/chara-self-call'); // #383 起真身
const { char_body_generate_wapped } = require('#/chara/chara-body'); // #385 起真身
const { look_set } = require('#/chara/look'); // #389 起真身
const { chara_first_exp } = require('#/chara/chara-first-exp'); // #394 起真身
const {
  GENERAL_CHARASTERISTICS,
  ARR_HAIRCOLOR,
  talentname,
  talent,
  charasteristic_index,
  set_random_charasteristic,
  set_charasteristic,
  set_random_haircolor,
  set_haircolor,
  choose_charasteristic,
  choose_haircolor,
} = require('#/chara/chara-and-hair'); // #392 起真身
const { party_char_del } = require('#/dungeon/dungeon-party');
const { st_up } = require('#/dungeon/dungeon-lvup'); // #565 起接入
const { chara_callname } = require('#/utils/callname-utils');
// wearing_cloth_able 自 #215（J5）起为真身（ere/system/train/cloth.js）
const { wearing_cloth_able } = require('#/system/train/cloth');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const era_flag = require('#/era-utils/era-flag');
const era_global = require('#/era-utils/era-global'); // #547：冒險者性別（global:3）

/**
 * chara_make：随机生成一名完整角色。
 *
 * 三分叉决定 CFLAG:1——本管线的关键产出：
 *   - 普通勇者（!精英 && !EX_TALENT:1 && !EX_TALENT:2）→ cm_stp 置
 *     CFLAG:1 = 2（侵攻中，turnend-settle.js:128 接入点的触发条件）；
 *   - 精英部下（!EX_TALENT:2）→ CFLAG:1 = 0；
 *   - 后代（EX_TALENT:2）→ CFLAG:1 = 0。
 *
 * @param {number} cid 角色 ID
 * @param {number} [arg1] 性格设定（160-180 直设；其余值含缺省 0 走随机；
 *   enter-enemy 传 998 即「无指定」）
 * @param {number} [arg2] 种族设定（cm_look 的实参；缺省 0）
 * @param {(n: number) => number} [rand] 随机源（[0,n) 整数），
 *   缺省均匀随机，测试注入定值序
 * @param {number} [template_id] 复制预设时的预设号；通常角色等于 cid
 * @returns {Promise<number>} 角色号
 */
async function chara_make(cid, arg1 = 0, arg2 = 0, rand, template_id = cid) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const offspring = (era.get(`ex_talent:${cid}:2`) || 0) !== 0; // EX_TALENT:2 后代

  // 性别（后代不掷；赤森奴隶恒 0 见文件头）
  if (!offspring) {
    await cm_gender(cid, rand_n);
  }

  // 命名（后代由调用方先命名并设好家族关系）
  if (!offspring) {
    chara_name_random_define(cid, -1, rand_n);
  }

  // 等级与经验值
  era.set(`cflag:${cid}:9`, 1); // CFLAG:9 等级
  chara(cid).dungeon.战斗经验 = 0; // EXP:80 战斗经验

  // 家族初期化
  era.set(`cflag:${cid}:605`, 0); // CFLAG:605 家族

  // 売春への積極性
  chara(cid).patch.卖春积极性 = 1; // CFLAG:120

  // 三分叉（本函数 JSDoc）：决定 CFLAG:1
  const elite = (era.get(`talent:${cid}:220`) || 0) !== 0; // TALENT:精英
  const ex1 = (era.get(`ex_talent:${cid}:1`) || 0) !== 0; // EX_TALENT:1
  if (!elite && !ex1 && !offspring) {
    await cm_stp(cid); // 侵攻楼层·侵攻度·侵攻中·再起点
    await cm_base(cid); // 职业、基础
    await cm_st(cid, rand_n); // 勇者初始等级（rand_n 透传给 st_up 的掷骰）
  } else if (!offspring) {
    chara(cid).invasion.状态 = 0; // 初始位置（精英部下）
    await cm_base(cid); // 职业、基础
    await cm_st_ace(cid, rand_n); // 精英部下初始等级
  } else {
    chara(cid).invasion.状态 = 0; // 初始位置（后代）
    await cm_base(cid); // 职业、基础
  }

  // 口上性格（精英 200-211 暂用勇者口上）
  if (template_id >= 1 && template_id <= 16) {
    await cm_kj(cid, arg1, rand_n);
  } else if (template_id >= 200 && template_id <= 211) {
    // 精英，暂用勇者口上
    await cm_kj(cid, arg1, rand_n);
  }

  // 初心者の烙印（DAY:0 <= 60；开局不写、留 0 恒命中）
  if (era_flag.day_count <= 60) {
    era.set(`talent:${cid}:291`, 1); // TALENT:291 新手烙印
  }

  await cm_virgin(cid, rand_n); // 处女
  await cm_talent(cid, rand_n); // 素质
  await cm_skill(cid, rand_n); // 战术技能

  await cm_look(cid, arg2, rand_n); // 外貌（arg2 种族设定）

  // 令后代来历生效
  if (offspring) {
    era.set(`talent:${cid}:310`, 2); // TALENT:阴毛状态 = 2
  }

  await cm_kind(cid, rand_n); // 善恶

  // 妊娠性交经验（后代不掷）
  if (!offspring) {
    await cm_ns_exp(cid, rand_n);
  }

  // 新的家族系统（后代不设定家族；rand_n(4) == 0 时）
  if (rand_n(4) === 0 && !offspring) {
    family_register(cid, rand_n);
  }

  // 根据家族成员继承素质
  await cm_family_talent(cid, rand_n);

  // コスチューム
  await cm_cloth(cid, rand_n);

  // 一人称の設定（ere/chara/chara-self-call.js 的 #383 实现复用）
  await random_self_call(cid); // #546 起为 async（MODE 1 的输入等待）

  // 年齢/身長表示设定（FLAG:5 位 12/15）时生成身体数据（真身自
  // #385 起在 ere/chara/chara-body.js；此处只判 FLAG:5，不判身体数据
  // 是否已有——函数内部的检查条件与此处同源）
  const settings = era.get('flag:5') || 0; // FLAG:5 开局设置位图
  if (((settings >> 12) & 1) !== 0 || ((settings >> 15) & 1) !== 0) {
    char_body_generate_wapped(cid, rand_n); // 生成身体数据
  }

  return cid;
}

/**
 * cm_stp：侵入阶层·侵攻度·侵攻中·再起点的初始设定。
 *
 * 本管线最关键的一行——CFLAG:1 = 2 是
 * ere/system/turnend-settle.js:128 接入点（勇者探索中的迷宫推进）的
 * 触发条件，本函数让它第一次可能为真。
 *
 * @param {number} cid 角色 ID
 */
function cm_stp(cid) {
  chara(cid).dungeon.侵攻阶层 = 1; // CFLAG:501 侵入阶层
  chara(cid).event.侵攻度 = 0; // CFLAG:502 侵攻度
  chara(cid).invasion.状态 = 2; // CFLAG:1 侵攻中
  chara(cid).dungeon.再起点 = 3; // CFLAG:508 再起点
}

/**
 * cm_base：职业基础参数与职业/种族素质。
 *
 * @param {number} cid 角色 ID
 */
async function cm_base(cid) {
  const t = (n) => (era.get(`talent:${cid}:${n}`) || 0) !== 0;
  const tv = (n) => era.get(`talent:${cid}:${n}`) || 0;

  // 职业基础四维（CFLAG:11 攻击力 / 12 防御力 / 13 基础攻击 /
  // 14 基础防御；talent:200 战士、205 骑士、201 魔法师、206 巫女、
  // 202 神官、207 忍者、203 盗贼、208 弓手、212 魔物使、220 精英）
  if (t(200) || t(205)) {
    // 战士&骑士
    chara(cid).dungeon.攻击力 = 20;
    chara(cid).dungeon.防御力 = 20;
    era.set(`cflag:${cid}:13`, 20);
    era.set(`cflag:${cid}:14`, 20);
  } else if (t(201) || t(206)) {
    // 魔法师&巫女
    chara(cid).dungeon.攻击力 = 15;
    chara(cid).dungeon.防御力 = 15;
    era.set(`cflag:${cid}:13`, 15);
    era.set(`cflag:${cid}:14`, 15);
  } else if (t(202) || t(207)) {
    // 神官&忍者
    chara(cid).dungeon.攻击力 = 15;
    chara(cid).dungeon.防御力 = 20;
    era.set(`cflag:${cid}:13`, 15);
    era.set(`cflag:${cid}:14`, 20);
  } else if (t(203) || t(208) || t(212)) {
    // 盗贼&弓手&魔物使
    chara(cid).dungeon.攻击力 = 20;
    chara(cid).dungeon.防御力 = 15;
    era.set(`cflag:${cid}:13`, 20);
    era.set(`cflag:${cid}:14`, 15);
  } else if (t(220)) {
    // 精英（220）
    chara(cid).dungeon.攻击力 = 15;
    chara(cid).dungeon.防御力 = 15;
    era.set(`cflag:${cid}:13`, 15);
    era.set(`cflag:${cid}:14`, 15);
  } else {
    // その他
    chara(cid).dungeon.攻击力 = 15;
    chara(cid).dungeon.防御力 = 15;
    era.set(`cflag:${cid}:13`, 15);
    era.set(`cflag:${cid}:14`, 15);
  }

  // 神官&巫女持治愈（talent:117）+ 高信仰值（CFLAG:152）；
  // 战士&骑士&魔物使持鼓舞（talent:118）
  if (tv(202) === 1 || tv(206) === 1) {
    era.set(`talent:${cid}:117`, 1);
    era.set(`cflag:${cid}:152`, 20);
  } else if (tv(200) === 1 || tv(205) === 1 || tv(212) === 1) {
    era.set(`talent:${cid}:118`, 1);
  }

  // 怪物种族加成（talent:319 种族2）：史莱姆（2）防御系 +5、
  // 触手（5）攻击系 +5、妖精（6）四维 -4、巨人（7）四维 +5
  const race2 = tv(319);
  if (race2 === 2) {
    chara(cid).dungeon.防御力 += 5;
    era.add(`cflag:${cid}:14`, 5);
  } else if (race2 === 5) {
    chara(cid).dungeon.攻击力 += 5;
    era.add(`cflag:${cid}:13`, 5);
  } else if (race2 === 6) {
    chara(cid).dungeon.攻击力 -= 4;
    chara(cid).dungeon.防御力 -= 4;
    era.add(`cflag:${cid}:13`, -4);
    era.add(`cflag:${cid}:14`, -4);
  } else if (race2 === 7) {
    chara(cid).dungeon.攻击力 += 5;
    chara(cid).dungeon.防御力 += 5;
    era.add(`cflag:${cid}:13`, 5);
    era.add(`cflag:${cid}:14`, 5);
  }

  // 精英持魔之刻印（talent:254）；神官&巫女持治愈；战士&骑士持鼓舞
  if (t(220)) {
    era.set(`talent:${cid}:254`, 1); // 魔之刻印
  } else if (t(202) || t(206)) {
    era.set(`talent:${cid}:117`, 1); // 治愈
  } else if (tv(200) === 1 || tv(205) === 1) {
    era.set(`talent:${cid}:118`, 1); // 鼓舞
  }
}

/**
 * cm_kj：口上性格的设定。
 *
 * @param {number} cid 角色 ID
 * @param {number} arg 性格设定（160-180 直设，其余随机）
 * @param {(n: number) => number} rand_n 随机源
 */
async function cm_kj(cid, arg, rand_n) {
  const is_male = (era.get(`talent:${cid}:122`) || 0) !== 0;
  // 清 TALENT 160..179
  for (let i = 160; i < 180; i += 1) {
    era.set(`talent:${cid}:${i}`, 0);
  }
  if (arg >= 160 && arg <= 180) {
    era.set(`talent:${cid}:${arg}`, 1);
  } else {
    // 重掷循环（入口在掷骰行之前）
    let x = rand_n(11) + 160;
    for (;;) {
      if (x === 165) {
        // ユニーク除外（村娘Ａ）
        x = rand_n(11) + 160;
        continue;
      }
      if (is_male && x === 166) {
        // 男人不能是恶女
        x = rand_n(11) + 160;
        continue;
      }
      break;
    }
    if (is_male && x === 163) {
      // 高贵的男人是贵公子
      x = 174;
    }
    if (x === 170) {
      // クラブ（ユニーク）→ 175
      x = 175;
    }
    if (x >= 167 && x <= 169) {
      // ハート/スペード/ダイヤ（ユニーク）→ +5 段
      x += 5;
      if (!is_male && x === 174) {
        // 女性贵公子回高贵
        x = 163;
      }
    }
    era.set(`talent:${cid}:${x}`, 1);
  }
}

/**
 * cm_gender：性别掷骰。
 *
 * 性别分派保留全部分支（含恒真分支的判断条件，保持掷骰次数）；档位读
 * era_global.adventurer_gender（global:3，跨档共享）。
 *
 * @param {number} cid 角色 ID
 * @param {(n: number) => number} rand_n 随机源
 */
async function cm_gender(cid, rand_n) {
  // 冒險者性別（原文用字）＝ global:3
  const adventurer_gender = era_global.adventurer_gender;
  switch (adventurer_gender) {
    case -1:
      // 女多男少（2%扶他，20%男性）
      if (rand_n(50) === 0) {
        era.set(`talent:${cid}:121`, 1); // 扶她
      } else if (rand_n(5) === 0) {
        era.set(`talent:${cid}:122`, 1); // 男人
      }
      break;
    case 0:
      // 只有女性（2%扶他）
      if (rand_n(50) === 0) {
        era.set(`talent:${cid}:121`, 1);
      }
      break;
    case 1:
      // 只有男性（2%扶他）
      if (rand_n(50) === 0) {
        era.set(`talent:${cid}:121`, 1);
      } else if (rand_n(5) >= 0) {
        // 恒真
        era.set(`talent:${cid}:122`, 1);
      }
      break;
    case 2:
      // 男多女少（2%扶他，20%女性）
      if (rand_n(50) === 0) {
        era.set(`talent:${cid}:121`, 1);
      } else if (rand_n(5) >= 1) {
        // 五分之四
        era.set(`talent:${cid}:122`, 1);
      }
      break;
    case 3:
      // 男女持平（2%扶他）
      if (rand_n(50) === 0) {
        era.set(`talent:${cid}:121`, 1);
      } else if (rand_n(2) < 1) {
        // 二分之一
        era.set(`talent:${cid}:122`, 1);
      }
      break;
    case 4:
      // 全扶她
      era.set(`talent:${cid}:121`, 1);
      break;
    default:
      break;
  }
}

/**
 * cm_virgin：处女/童贞/初体验相关的初始Flag。
 *
 * @param {number} cid 角色 ID
 * @param {(n: number) => number} rand_n 随机源
 */
async function cm_virgin(cid, rand_n) {
  const t = (n) => era.get(`talent:${cid}:${n}`) || 0;
  const offspring = (era.get(`ex_talent:${cid}:2`) || 0) !== 0;
  if (t(122) === 1) {
    // 男人
    era.set(`talent:${cid}:0`, 0); // 处女 = 0
    if (rand_n(3)) {
      // 三分之二童贞
      chara(cid).train.童贞 = 1;
      chara(cid).train.初体验对象 = -1;
      chara(cid).train.初吻对象 = -1;
    } else {
      chara(cid).train.初体验对象 = 0;
      chara(cid).train.初吻对象 = 0;
    }
  } else if (offspring) {
    // 后代
    era.set(`talent:${cid}:0`, 1); // 处女
    chara(cid).train.初吻对象 = -1;
  } else if (t(121) === 1) {
    // 扶她
    if (rand_n(8)) {
      // 八分之七扶她处女
      era.set(`talent:${cid}:0`, 1);
    }
    if (rand_n(3) > 0) {
      // 扶她初吻&童贞
      chara(cid).train.童贞 = 1;
      chara(cid).train.初吻对象 = -1;
    } else {
      chara(cid).train.初吻对象 = 0;
    }
    if (t(0) && t(1)) {
      // 扶她初体验（处女且童贞）
      chara(cid).train.初体验对象 = -1;
    } else if (t(0) === 0 || t(1) === 0) {
      chara(cid).train.初体验对象 = 0;
    }
  } else if ((era.get('flag:82') || 0) === 1 && rand_n(2) === 0) {
    // 人间界征服后二分之一处女
    era.set(`talent:${cid}:0`, 1);
    chara(cid).train.初吻对象 = -1;
  } else if (rand_n(8)) {
    // 八分之七处女
    era.set(`talent:${cid}:0`, 1);
    chara(cid).train.初吻对象 = -1;
  }
  // 处女或童贞则初吻未定
  if (t(0) === 1 || t(1)) {
    chara(cid).train.初吻对象 = -1;
  }

  // 处女随机贞操封印（精英除外）
  if (t(0) === 1 && rand_n(5) === 0 && t(220) !== 1) {
    era.set(`talent:${cid}:273`, 1); // 贞操封印
  }

  // 人妻（女、非后代、十二分之一）
  if (rand_n(12) === 0 && t(122) === 0 && !offspring) {
    era.set(`talent:${cid}:157`, 1); // 人妻
    era.set(`talent:${cid}:0`, 0);
  }
}

/**
 * cm_talent：性格与身体素质的全量掷骰。
 *
 * 逐块按「一次掷骰 + 独立 if 链」组织，块间顺序即掷骰顺序
 * （注入定值序的测试依赖此顺序）。跨域写（event/train/dungeon/stronghold
 * 属主）走门面，其余域内裸写（文件头）。
 *
 * @param {number} cid 角色 ID
 * @param {(n: number) => number} rand_n 随机源
 */
async function cm_talent(cid, rand_n) {
  const t = (n) => era.get(`talent:${cid}:${n}`) || 0;
  const set_t = (n, v = 1) => era.set(`talent:${cid}:${n}`, v);

  // 胆怯（10）/ 嚣张（12）/ 文静（14）——性格联动
  let x = rand_n(3);
  if (x === 0 && (t(160) === 1 || t(162) === 1)) {
    set_t(10); // 慈爱/懦弱 → 胆怯
  } else if (
    x === 1 &&
    (t(161) === 1 ||
      t(163) === 1 ||
      t(164) === 1 ||
      t(166) === 1 ||
      t(174) === 1)
  ) {
    set_t(12); // 自信家/高贵/冷静/恶女/贵公子 → 嚣张
  } else if (x === 2 && (t(160) === 1 || t(162) === 1)) {
    set_t(14); // 慈爱/懦弱 → 文静
  }

  // 反抗心（11）/ 坦率（13）/ 嚣张（16）
  x = rand_n(12);
  if (x === 0) {
    chara(cid).event.反抗心 = 1;
    if (rand_n(8) === 0) {
      set_t(18); // 反抗心偶发傲娇
    }
  } else if (x === 1) {
    set_t(13); // 坦率
  } else if (
    x === 2 &&
    (t(161) === 1 ||
      t(163) === 1 ||
      t(164) === 1 ||
      t(166) === 1 ||
      t(174) === 1)
  ) {
    set_t(16); // 嚣张
  }

  // 高姿态（15）/ 低姿态（17）/ 傲娇（18）
  x = rand_n(12);
  if (x === 0) {
    set_t(15);
  } else if (x === 1 && t(18) === 0) {
    set_t(17);
  } else if (x === 2 && t(18) === 0) {
    set_t(18);
  }

  // 冷漠（21）/ 好奇心（23）/ 感情淡薄（22）/ 克制（20）/ 献身的（63）
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

  // 保守的（24）/ 乐观的（25）/ 悲观的（26）
  x = rand_n(12);
  if (x === 0) {
    set_t(24);
  } else if (x === 1) {
    set_t(25);
  } else if (x === 2) {
    chara(cid).event.悲观的 = 1;
  }

  // 戒备森严（27）/ 爱表现（28）
  x = rand_n(8);
  if (x === 0) {
    chara(cid).event.戒备森严 = 1;
  } else if (x === 1) {
    set_t(28);
  }

  // 看重贞操（30）/ 看轻贞操（31）
  x = rand_n(12);
  if (x === 0) {
    chara(cid).event.看重贞操 = 1;
  } else if (x === 1) {
    set_t(31);
  }

  // 压抑（32）/ 开放（33）
  x = rand_n(12);
  if (x === 0) {
    chara(cid).event.压抑 = 1;
  } else if (x === 1) {
    set_t(33);
  }

  // 抵抗（34）
  if (rand_n(12) === 0) {
    chara(cid).event.抵抗 = 1;
  }

  // 害羞（35）/ 不知羞耻（36）
  x = rand_n(12);
  if (x === 0) {
    set_t(35);
  } else if (x === 1) {
    set_t(36);
  }

  // 把柄（37）
  if (rand_n(8) === 0) {
    set_t(37);
  }

  // 害怕疼痛（40）/ 不惧疼痛（41）
  x = rand_n(12);
  if (x === 0) {
    set_t(40);
  } else if (x === 1) {
    set_t(41);
  }

  // 容易湿（42）/ 不易湿（43）
  x = rand_n(12);
  if (x === 0) {
    set_t(42);
  } else if (x === 1) {
    set_t(43);
  }

  // 眼镜（48）
  if (rand_n(12) === 0) {
    set_t(48);
  }

  // 快速学习（50）/ 学习缓慢（51）
  x = rand_n(12);
  if (x === 0) {
    set_t(50);
  } else if (x === 1) {
    set_t(51);
  }

  // 擅用舌头（52）
  if (rand_n(8) === 0) {
    chara(cid).event.擅用舌头 = 1;
  }

  // 漏尿癖（57）
  if (rand_n(50) === 0) {
    chara(cid).event.漏尿癖 = 1;
  }

  // 容易自慰（60）
  if (rand_n(8) === 0) {
    set_t(60);
  }

  // 不怕污臭（61）/ 反感污臭（62）
  x = rand_n(12);
  if (x === 0) {
    set_t(61);
  } else if (x === 1) {
    set_t(62);
  }

  // 接受快感（70）/ 否定快感（71）
  x = rand_n(12);
  if (x === 0) {
    set_t(70);
  } else if (x === 1) {
    chara(cid).event.否定快感 = 1;
  }

  // 容易上瘾（72）
  if (rand_n(8) === 0) {
    set_t(72);
  }

  // 容易陷落（73）——「容易陷落頻度はここを弄ってください」
  if (rand_n(30) === 0) {
    set_t(73);
  }
  // 抵抗诱惑（69）
  if (rand_n(30) === 0) {
    set_t(69);
  }

  // 倒錯的（80）
  if (rand_n(8) === 0) {
    set_t(80);
  }

  // 双性恋（81）/ 讨厌男人（82）
  x = rand_n(12);
  if (x === 0) {
    set_t(81);
  } else if (x === 1) {
    chara(cid).event.讨厌男人 = 1;
  }

  // 抖S气质（ABL:20）/ 抖M气质（ABL:21）
  x = rand_n(8);
  if (x === 0) {
    chara(cid).train.抖S气质 = 3;
  } else if (x === 1) {
    chara(cid).system.抖M气质 = 3;
  }

  // 嫉妒（84）
  if (rand_n(10) === 0) {
    chara(cid).event.嫉妒 = 1;
  }

  // 小恶魔（87）
  if (rand_n(8) === 0) {
    set_t(87);
  }

  // 露出癖（ABL:17）
  if (rand_n(40) === 0) {
    chara(cid).system.露出癖 = 3;
  }

  // 魅惑（91）
  if (rand_n(20) === 0) {
    set_t(91);
  }

  // 魁梧（99）/ 娇小（100）——巨人（种族2 = 7）九成魁梧
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

  // 阴蒂钝感（101）/ 阴蒂敏感（102）
  x = rand_n(12);
  if (x === 0) {
    set_t(101);
  } else if (x === 1) {
    set_t(102);
  }

  // 私处钝感（103）/ 私处敏感（104）——女性限定
  x = rand_n(12);
  if (x === 0 && t(122) === 0) {
    set_t(103);
  } else if (x === 1 && t(122) === 0) {
    set_t(104);
  }

  // 肛门钝感（105）/ 肛门敏感（106）
  x = rand_n(12);
  if (x === 0) {
    set_t(105);
  } else if (x === 1) {
    set_t(106);
  }

  // 乳房钝感（107）/ 乳房敏感（108）
  x = rand_n(12);
  if (x === 0) {
    set_t(107);
  } else if (x === 1) {
    set_t(108);
  }

  // 胸围（女性限定）：超乳（119）> 爆乳（114）> 绝壁（116）>
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

  // 快速回复（111）/ 回复缓慢（112）
  x = rand_n(12);
  if (x === 0) {
    set_t(111);
  } else if (x === 1) {
    set_t(112);
  }

  // 魅力（113）
  if (rand_n(8) === 0) {
    chara(cid).dungeon.魅力 = 1;
  }

  // 早泄（133）——男/扶他
  if (rand_n(25) === 0 && (t(122) || t(121))) {
    set_t(133);
  }
  // 软弱（134）——慈爱/懦弱
  if (rand_n(6) === 0 && (t(160) === 1 || t(162) === 1)) {
    set_t(134);
  }
  // 未熟（135）偶发幼稚（132）与早泄（133）
  if (rand_n(12) === 0) {
    chara(cid).train.未熟 = 1;
    if (rand_n(8) === 0) {
      set_t(132);
    }
    if (rand_n(8) === 0 && (t(122) || t(121))) {
      set_t(133);
    }
  }

  // 恋母/恋父/萝莉控/正太控情结（140-143）按性别三分
  if (t(122)) {
    // 男人多恋母情结与萝莉控
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
    // 扶他中立
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
    // 其余多恋父情结与正太控
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

  // 不受洗脑（152）
  if (rand_n(30) === 0) {
    set_t(152);
  }

  // 担保人（290）——有把柄（37）概率高
  if (t(37) && rand_n(4) === 0) {
    set_t(290);
  } else if (rand_n(12) === 0) {
    set_t(290);
  }
}

/**
 * cm_kind：善恶值（CFLAG:151，[-150,150] 区间语义）。精英（220）善良值
 *
 * @param {number} cid 角色 ID
 * @param {(n: number) => number} rand_n 随机源
 */
async function cm_kind(cid, rand_n) {
  if ((era.get(`talent:${cid}:220`) || 0) !== 1) {
    era.set(`cflag:${cid}:151`, rand_n(200));
  } else {
    era.set(`cflag:${cid}:151`, rand_n(100));
  }
}

/**
 * cm_skill：战斗与战术技能的掷骰。
 *
 * @param {number} cid 角色 ID
 * @param {(n: number) => number} rand_n 随机源
 */
async function cm_skill(cid, rand_n) {
  const t = (n) => era.get(`talent:${cid}:${n}`) || 0;
  const set_t = (n, v = 1) => era.set(`talent:${cid}:${n}`, v);
  const race2 = t(319); // 种族2（talent:319）

  // 使役（265）——魔物使（212）必持，其余四十分之一
  if (t(212) === 1 || rand_n(40) === 0) {
    set_t(265);
  }
  // 战术（240）
  if (rand_n(40) === 0) {
    set_t(240);
  }
  // 魔术（241）——妖精（种族2 = 6）二十分之一
  if (race2 !== 6) {
    if (rand_n(40) === 0) {
      set_t(241);
    }
  } else {
    if (rand_n(20) === 0) {
      set_t(241);
    }
  }
  // 法术（242）——妖精同样易学
  if (race2 !== 6) {
    if (rand_n(40) === 0) {
      set_t(242);
    }
  } else {
    if (rand_n(20) === 0) {
      set_t(242);
    }
  }
  // 奇袭（243）
  if (rand_n(40) === 0) {
    set_t(243);
  }

  // 肌肉型（248）/ 虚弱（256）——巨人必不虚弱
  if (race2 === 7) {
    if (rand_n(10) === 0) {
      set_t(248);
    }
  } else if (rand_n(30) === 0) {
    set_t(248);
  } else if (rand_n(29) === 0) {
    set_t(256);
  }

  // 铁壁（249）
  if (rand_n(40) === 0) {
    set_t(249);
  }
  // 咒术（250）——妖精二十分之一
  if (race2 !== 6) {
    if (rand_n(40) === 0) {
      set_t(250);
    }
  } else {
    if (rand_n(20) === 0) {
      set_t(250);
    }
  }
  // 忍术（251）——妖精三十分之一（流石に少し少ない）
  if (race2 !== 6) {
    if (rand_n(40) === 0) {
      set_t(251);
    }
  } else {
    if (rand_n(30) === 0) {
      set_t(251);
    }
  }
  // 先制（252）
  if (rand_n(40) === 0) {
    set_t(252);
  }

  // 褐色肌肤（253）/ 白皙（255）——暗黑精灵（8）与
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

  // 魔法耐性（257）
  if (rand_n(40) === 0) {
    set_t(257);
  }
  // 一术未学的妖精得魔法耐性
  if (
    race2 === 6 &&
    t(241) !== 1 &&
    t(242) !== 1 &&
    t(250) !== 1 &&
    t(251) !== 1
  ) {
    set_t(257);
  }

  // 俊足（258）
  if (rand_n(40) === 0) {
    set_t(258);
  }

  // 独眼（259）/ 额头天眼（260）
  if (rand_n(60) === 0) {
    set_t(259);
  } else if (rand_n(59) === 0) {
    set_t(260);
  }

  // 五系能力者（275-279）各独立四十分之一
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
  // 额头天眼的暗之能力者第二机会
  if (t(260) === 1 && rand_n(40) === 0) {
    set_t(279);
  }

  // 冲突检查
  cmi_conflict_check(cid, rand_n);
}

/**
 * cm_look：外貌设定。
 *
 * @param {number} cid 角色 ID
 * @param {number} arg 种族设定（chara_make 的 arg2）
 * @param {(n: number) => number} rand_n 随机源
 */
async function cm_look(cid, arg, rand_n) {
  // look_set 直接拿 cid（#5 决议第六条：指针不隐式读全局），
  // 真身自 #389 起在 ere/chara/look.js。
  look_set(cid, arg, rand_n);

  // 白虎（125）连同阴毛状态（310）/ 阴毛生长极限（311）
  if (rand_n(20) === 0) {
    chara(cid).stronghold.白虎 = 1;
    era.set(`talent:${cid}:310`, 1);
    era.set(`talent:${cid}:311`, 1);
  }
}

/**
 * cm_st：勇者初始等级。
 *
 * FLAG:60 > 0 且 FLAG:402 == 0（非派遣）时按 FLAG:60 逐级调 st_up，
 * 随后体力/气力回满（BASE = MAXBASE）。
 *
 * @param {number} cid 角色 ID
 * @param {(n: number) => number} [rand_n] 随机源（透传给 st_up 的
 *   掷骰；缺省均匀随机——st_up 的缺省同款，#565 起接入）
 */
async function cm_st(cid, rand_n) {
  if ((era.get('flag:60') || 0) > 0 && (era.get('flag:402') || 0) === 0) {
    const times = era.get('flag:60') || 0;
    for (let i = 0; i < times; i += 1) {
      st_up(cid, rand_n); // st_up（逐级一次；返回值无人读）
    }
  }
  chara(cid).dungeon.体力 = era.get(`maxbase:${cid}:0`) || 0;
  chara(cid).dungeon.气力 = era.get(`maxbase:${cid}:1`) || 0;
}

/**
 * cm_st_ace：精英部下初始等级。
 *
 * 魔王（cid 0）等级 CFLAG:0:9 > 2 时按其六成（±两成）逐级
 * 调 st_up。
 *
 * @param {number} cid 角色 ID
 * @param {(n: number) => number} rand_n 随机源
 */
async function cm_st_ace(cid, rand_n) {
  const maou_lv = era.get('cflag:0:9') || 0; // CFLAG:0:9 魔王等级
  if ((era.get('flag:60') || 0) > 0 && maou_lv > 2) {
    let local = maou_lv * 6; // local = 魔王等级 * 6
    local += rand_n(maou_lv) * 2;
    local = Math.floor(local / 10);
    for (let i = 0; i < local; i += 1) {
      st_up(cid, rand_n); // st_up（逐级一次；返回值无人读）
    }
  }
}

/**
 * cm_family_talent：根据家族成员继承身体素质。
 *
 * search_family 返回找到的家族成员；未找到时为 -1，继承块不进。家族
 * 成员寻址以 family_id 为 cid（era.get 三段读）。
 *
 * @param {number} cid 角色 ID
 * @param {(n: number) => number} rand_n 随机源
 */
async function cm_family_talent(cid, rand_n) {
  // （既有写法在此还有一处 family_id % 10 的死赋值，无消费者，不引入）
  // family_id = search_family(cid)，未找到为 -1
  const family_id = search_family(cid);

  if (family_id > 0) {
    const f = (n) => era.get(`talent:${family_id}:${n}`) || 0;
    const set_t = (n, v = 1) => era.set(`talent:${cid}:${n}`, v);
    const is_male = (era.get(`talent:${cid}:122`) || 0) !== 0;

    // 家族 <15 岁
    if ((era.get(`cflag:${family_id}:451`) || 0) < 15) {
      // 大柄（魁梧）则体格升一段
      if (f(99) && rand_n(3) === 0) {
        if ((era.get(`talent:${cid}:100`) || 0) !== 0) {
          set_t(100, 0); // 娇小 → 无
        } else {
          set_t(99); // → 魁梧
        }
      }

      // 巨乳以上则胸围升一段（女性限定）。第三个条件是
      // `f(119) === 0`——家族无超乳即升
      if ((f(110) && rand_n(4)) || (f(114) && rand_n(2)) || f(119) === 0) {
        if (!is_male) {
          if ((era.get(`talent:${cid}:116`) || 0) !== 0) {
            set_t(116, 0); // 绝壁 → 贫乳
            set_t(109);
          } else if ((era.get(`talent:${cid}:109`) || 0) !== 0) {
            set_t(109, 0); // 贫乳 → 平
          } else if (
            (era.get(`talent:${cid}:110`) || 0) === 0 &&
            (era.get(`talent:${cid}:114`) || 0) === 0 &&
            (era.get(`talent:${cid}:119`) || 0) === 0
          ) {
            set_t(110); // 平 → 巨乳
          } else if ((era.get(`talent:${cid}:110`) || 0) !== 0) {
            set_t(110, 0); // 巨乳 → 爆乳
            set_t(114);
          } else {
            set_t(114, 0); // 爆乳 → 超乳
            set_t(119);
          }
        }
      }
      // 家族 ≥18 岁
    } else if ((era.get(`cflag:${family_id}:451`) || 0) > 17) {
      // 小柄（娇小）则体格降一段
      if (f(100) && rand_n(3) === 0) {
        if ((era.get(`talent:${cid}:99`) || 0) !== 0) {
          set_t(99, 0); // 魁梧 → 无
        } else {
          set_t(100); // → 娇小
        }
      }

      // 贫乳以下则胸围降一段（女性限定）。第二个条件是
      // `(f(116) && rand_n(2)) === 0`——括号整体判零：
      // 绝壁假或掷 0 都命中；与升档段第三个条件 `f(119) === 0`（只判素质）
      // 不同形，各自命中面保持原样。
      if ((f(109) && rand_n(4)) || (f(116) && rand_n(2)) === 0) {
        if (!is_male) {
          if ((era.get(`talent:${cid}:119`) || 0) !== 0) {
            set_t(119, 0); // 超乳 → 爆乳
            set_t(114);
          } else if ((era.get(`talent:${cid}:114`) || 0) !== 0) {
            set_t(114, 0); // 爆乳 → 巨乳
            set_t(110);
          } else if ((era.get(`talent:${cid}:110`) || 0) !== 0) {
            set_t(110, 0); // 巨乳 → 平
          } else if (
            (era.get(`talent:${cid}:109`) || 0) === 0 &&
            (era.get(`talent:${cid}:116`) || 0) === 0
          ) {
            set_t(109); // 平 → 贫乳
          } else {
            set_t(109, 0); // 贫乳 → 绝壁
            set_t(116);
          }
        }
      }
    }

    // 肌肉型/虚弱继承
    if ((f(248) || f(256)) && rand_n(3) === 0) {
      set_t(248, f(248));
      set_t(256, f(256));
    }

    // 褐色肌肤/白皙继承
    if ((f(253) || f(255)) && rand_n(2) === 0) {
      set_t(253, f(253));
      set_t(255, f(255));
    }

    // 额头天眼继承
    if (f(260) && rand_n(3) === 0) {
      set_t(260, f(260));
    }

    // 家族「近色」头发：按家族头发颜色档（talent:300）取基准
    // 色值，±5 次 rand_n(9) 抖动后按区间回落档位
    if (rand_n(5) !== 0) {
      let hair_color = 0;
      if (f(300) === 1) {
        hair_color = 130; // 金
      } else if (f(300) === 2) {
        hair_color = 160; // 栗
      } else if (f(300) === 3) {
        hair_color = 230; // 黑
      } else if (f(300) === 4) {
        hair_color = 150; // 赤
      } else if (f(300) === 5) {
        hair_color = 120; // 銀
      } else if (f(300) === 6) {
        hair_color = 210; // 青
      } else if (f(300) === 7) {
        hair_color = 200; // 綠
      } else if (f(300) === 8) {
        hair_color = 220; // 紫
      } else if (f(300) === 9) {
        hair_color = 110; // 白
      } else if (f(300) === 10) {
        hair_color = 170; // 暗金
      } else if (f(300) === 11) {
        hair_color = 140; // 粉
      }
      hair_color =
        hair_color -
        20 +
        rand_n(9) +
        rand_n(9) +
        rand_n(9) +
        rand_n(9) +
        rand_n(9);
      if (hair_color > 225) {
        set_t(300, 3);
      } else if (hair_color > 215) {
        set_t(300, 8);
      } else if (hair_color > 205) {
        set_t(300, 6);
      } else if (hair_color > 185) {
        set_t(300, 7);
      } else if (hair_color > 165) {
        set_t(300, 10);
      } else if (hair_color > 155) {
        set_t(300, 2);
      } else if (hair_color > 145) {
        set_t(300, 4);
      } else if (hair_color > 135) {
        set_t(300, 11);
      } else if (hair_color > 125) {
        set_t(300, 1);
      } else if (hair_color > 115) {
        set_t(300, 5);
      } else {
        set_t(300, 9);
      }
    }

    // 瞳色继承（五分之四）
    if (rand_n(5) !== 0) {
      era.set(`talent:${cid}:306`, f(306));
    }
    // 体型继承（三分之一）
    if (rand_n(3) === 0) {
      era.set(`talent:${cid}:308`, f(308));
    }
    // 乳头继承（三分之一）
    if (rand_n(3) === 0) {
      era.set(`talent:${cid}:309`, f(309));
    }
    // 阴毛状态与生长极限继承（三分之一）
    if (rand_n(3) === 0) {
      era.set(`talent:${cid}:310`, f(310));
      era.set(`talent:${cid}:311`, f(311));
    }
  }
}

/**
 * cm_ns_exp：妊娠与性交经验、自慰经验、使役怪物的初始设定。
 *
 * @param {number} cid 角色 ID
 * @param {(n: number) => number} rand_n 随机源
 */
async function cm_ns_exp(cid, rand_n) {
  const t = (n) => era.get(`talent:${cid}:${n}`) || 0;

  // 出産経験：TALENT:320 编码的女儿/儿子数（%1000/100 与
  // %10000/1000 位）
  let p = 0;
  const local = t(320) % 10;
  if (local === 0 && t(157) === 1 && rand_n(2) === 0) {
    p += rand_n(3); // 人妻随机 0-2 次
  } else {
    let daughters = t(320) % 1000; // 娘の数
    p += Math.floor(daughters / 100);
    let sons = t(320) % 10000; // 息子の数
    p += Math.floor(sons / 1000);
  }

  era.add(`exp:${cid}:60`, p); // EXP:60 出産経験（域内）

  // 性交経験：非处女按 p 与随机；处女却有出産経験则消去处女
  if (t(0) === 0) {
    const v = rand_n(8) + 1 + p;
    chara(cid).dungeon.私处经验 = v; // EXP:0
    chara(cid).dungeon.性交经验 = v; // EXP:5 = EXP:0
  } else if (p) {
    const v = rand_n(4) + 1 + p;
    chara(cid).dungeon.私处经验 = v;
    chara(cid).dungeon.性交经验 = v;
    era.set(`talent:${cid}:0`, 0); // 処女を消す
  }

  // 自慰经验四连（偶发巨量 → 男/扶他 → 容易自慰 → 常态）
  if (rand_n(30) === 0) {
    chara(cid).dungeon.自慰经验 = rand_n(50); // 猿みたいなオナニスト
  } else if (t(121) === 1 || t(122) === 1) {
    chara(cid).dungeon.自慰经验 = rand_n(30);
  } else if (t(60) === 1) {
    chara(cid).dungeon.自慰经验 = rand_n(20); // 容易自慰
  } else if (rand_n(10) === 0) {
    chara(cid).dungeon.自慰经验 = rand_n(10);
  }

  // 善恶值高不自慰
  if ((era.get(`cflag:${cid}:151`) || 0) > 150) {
    chara(cid).dungeon.自慰经验 = 0;
  }

  // 男人无私处经验
  if (t(122)) {
    chara(cid).dungeon.私处经验 = 0;
  }

  // 初体验（#394 起真身，ere/chara/chara-first-exp.js），
  // 显式传 cid 与随机源。
  chara_first_exp(cid, rand_n);

  // 使役技能（talent:265）持有且无从属怪物（CFLAG:570）时
  // 随机取得（循环的 break 位置决定阶层段，极稀有超强使役）
  if ((era.get(`cflag:${cid}:570`) || 0) === 0 && t(265)) {
    let local2 = 0;
    for (local2 = 0; local2 < 9; local2 += 1) {
      if (rand_n(3) === 0) {
        break;
      }
    }
    if (local2 > 8) {
      local2 = 8;
    }
    local2 *= 10;
    local2 += 100 + rand_n(5);
    if (rand_n(50) === 0) {
      local2 = 191 + rand_n(3); // ごく稀に超強い使役
    }
    chara(cid).system.从属怪物 = local2;
  }
}

/**
 * cm_cloth：按职业决定初始服装与武器。
 *
 * 局部变量 r 是服装类型（写入 CFLAG:41 上衣类型）；CFLAG:550 是
 * 初始装备（+ rand_n(10) * 100000 的接頭語）；CFLAG:42 饰品。
 * 职业判定先男（职业素质 && 男人）后通用（仅职业素质），
 * 怪物种族（talent:319 种族2）与精英（220）殿后，默认 r = 1。
 *
 * @param {number} cid 角色 ID
 * @param {(n: number) => number} rand_n 随机源
 */
async function cm_cloth(cid, rand_n) {
  const t = (n) => era.get(`talent:${cid}:${n}`) || 0;
  const tv = (n) => (era.get(`talent:${cid}:${n}`) || 0) !== 0;
  const is_male = tv(122);
  const race2 = t(319); // 种族2
  const set_weapon = (v) => era.set(`cflag:${cid}:550`, v); // CFLAG:550 初始装备
  let r = 0; // 服装类型

  if (tv(200) && is_male) {
    // 男战士：锁子甲 + 剑
    r = 3;
    set_weapon(40);
  } else if (tv(200)) {
    // 战士（女/扶她）
    if ((era.get(`cflag:${cid}:6`) || 0) >= 4500 && rand_n(3) === 0) {
      // 生成名高（CFLAG:6 >= 4500）偶发中华风旗袍
      r = 214;
      if (rand_n(2) === 0) {
        set_weapon(51); // 月牙刃
      } else {
        set_weapon(52); // 指虎
      }
    } else {
      // 常规战士装
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
      set_weapon(40); // 剑
    }
  } else if (tv(201) && is_male) {
    // 男魔法师：冒险服 + 护符 + 法杖
    r = 103;
    era.set(`cflag:${cid}:42`, 85); // 护符（CFLAG:42 域内）
    set_weapon(41);
  } else if (tv(201)) {
    // 魔法师
    if (rand_n(3) === 0) {
      r = 5;
    } else if (rand_n(2) === 0) {
      r = 251;
    } else {
      r = 103;
    }
    era.set(`cflag:${cid}:42`, 85);
    set_weapon(41); // 法杖
  } else if (tv(202)) {
    // 神官
    if (rand_n(3) === 0) {
      r = 5;
    } else if (rand_n(2) === 0) {
      r = 251;
    } else {
      r = 207;
    }
    set_weapon(46); // 权杖
  } else if (tv(203) && is_male) {
    // 男盗贼：冒险服 + 匕首
    r = 103;
    set_weapon(43);
  } else if (tv(203)) {
    // 盗贼
    if (rand_n(3) === 0) {
      r = 5;
    } else if (rand_n(2) === 0) {
      r = 251;
    } else {
      r = 103;
    }
    set_weapon(43); // 匕首
  } else if (tv(205) && is_male) {
    // 男骑士：骑士铠 + 剑
    r = 105;
    set_weapon(40);
  } else if (tv(205)) {
    // 骑士
    if (rand_n(3) === 0) {
      r = 105;
    } else if (rand_n(2) === 0) {
      r = 6;
    } else {
      r = 111;
    }
    set_weapon(40); // 剑
  } else if (tv(206) && is_male) {
    // 男巫女：巫女装束 + 法杖
    r = 104;
    set_weapon(41);
  } else if (tv(206)) {
    // 巫女
    r = 104;
    set_weapon(41); // 法杖
  } else if (tv(207) && is_male) {
    // 男忍者：忍者装束 + 手里剑
    r = 110;
    set_weapon(44);
  } else if (tv(207)) {
    // 忍者
    r = 110;
    set_weapon(44); // 手里剑
  } else if (tv(208) && is_male) {
    // 男弓师：冒险服 + 箭
    r = 103;
    set_weapon(45);
  } else if (tv(208)) {
    // 弓手
    if (rand_n(3) === 0) {
      r = 5;
    } else if (rand_n(2) === 0) {
      r = 251;
    } else {
      r = 103;
    }
    set_weapon(45); // 弓箭
  } else if (race2 === 2 || tv(137)) {
    // 史莱姆与 FURRY 全裸 + 鞭
    r = 0;
    set_weapon(42);
  } else if (race2 === 3) {
    // 昆虫
    if (rand_n(6) === 0) {
      r = 193;
    } else if (rand_n(5) === 0) {
      r = 0;
    } else {
      r = 293;
    }
    set_weapon(42);
  } else if (race2 === 4) {
    // 植物
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
    set_weapon(42);
  } else if (race2 === 5) {
    // 触手（海妖意象，下半身空）
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
    set_weapon(42);
  } else if (race2 === 6) {
    // 妖精
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
      r = 103;
    }
    set_weapon(42);
  } else if (tv(220)) {
    // 精英（男精英分支不可达——前面的分支已接走全部精英）
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
    set_weapon(42);
  } else {
    // 默认分支
    r = 1;
    set_weapon(42);
  }

  // 初始装备接頭語
  era.set(
    `cflag:${cid}:550`,
    (era.get(`cflag:${cid}:550`) || 0) + rand_n(10) * 100000,
  );
  chara(cid).train.上衣类型 = r; // CFLAG:41
  chara(cid).train.上衣上状态 = 0; // CFLAG:45
  chara(cid).train.上衣下状态 = 0; // CFLAG:46
  r = 0;

  // wearing_cloth_able 直接拿 cid（#5 决议第六条：指针不隐式读全局）；
  // #215（J5）起为真身（ere/system/train/cloth.js）
  wearing_cloth_able(cid);

  // 眼镜素质配眼镜饰品
  if (t(48) === 1) {
    era.set(`cflag:${cid}:42`, 83);
  }

  return 0;
}

/** 勇者位的取值范围：1-16（16 位） */
const HERO_SLOT_IDS = Array.from({ length: 16 }, (_, i) => i + 1);

/**
 * 战役招募的勇者位抽取（#483 结论·方案 2）：只在未被占用的勇者位里抽一位。
 *
 * 既有写法直接在 1-16 里掷，会取到已占用的位，同号添加会**追加**一位同模板
 * 角色（原角色不动）。ere 把角色号直接当预设号用（#21 的扁平化），
 * 同号双角色在**移植层**不可表达（引擎支持按 [角色号, 预设号] 添加，代价见
 * 文件头 #483 条目），同号情形只能是「原地重置重募」——会把玩家育成过的该号奴隶
 * 重置回预设。故战役招募改为先收集空位、再于候选表内抽一次。
 *
 * **不循环重掷**：重掷会多消耗随机数，打乱测试注入的定值序，也让 #458 要录
 * 的输出比对样本难以复现。
 *
 * @param {(n: number) => number} rand_n 随机源（[0,n) 整数）
 * @returns {number} 抽中的勇者位（1-16）；候选为空（16 位全满）时 0——调用点
 *   据此走失败分支
 */
function pick_free_hero_slot(rand_n) {
  const occupied = new Set(era.getAddedCharacters());
  const free_slots = HERO_SLOT_IDS.filter((slot) => !occupied.has(slot));
  if (free_slots.length === 0) {
    return 0;
  }
  return free_slots[rand_n(free_slots.length)];
}

/**
 * rand_chara_make：随机挑一名勇者加入队伍，并走一遍
 * 人工确认（换一个 / 改性格 / 改发色 / 收下）。
 *
 * 开局调一次（初始奴隶的随机路径）。移植边界：
 *
 *   - **性格与发色的显示 / 设置 / 选择以真身实现**：在
 *     ere/chara/chara-and-hair.js（#392）。本文件是它们**唯一**的调用方
 *     （ere 侧 grep 实测）。
 *
 *   - **赤森奴隶**经形参 `campaign_slave` 注入（#469 起真身；调用点在
 *     招募分支临时置位）：既有条件「勇者位未被占用，或赤森奴隶」的后半截在
 *     ere 侧的落点是**勇者位的选法**——战役招募改走 `pick_free_hero_slot()`
 *     （#483 结论·方案 2：只从未被占用的位里抽，见该函数的注释），
 *     占用判定本身对两条路径一致；文案分支与「算了，不选了」
 *     （answer === 3 && campaign_slave）都按 `campaign_slave` 走真实分支。
 *
 *   - **在场判定用 `getAddedCharacters()`**：#21 的扁平化下没有「已定义
 *     但未加入」这一档，`chara:${id}` 读到对象只说明静态表里有这个预设、
 *     不代表在场，故用出场名单判定。
 *
 *   - 一律显式传参，不经全局对象（#5 决议第六条）；在场判定用
 *     `getAddedCharacters()`（见上）。
 *
 *   - **新角色的角色号就是刚加入的那位的号（即 `chara_id`），不是「第几个
 *     加入」**（#487）。不能用「人数 - 1」推算：角色号与预设号同值（#21），
 *     `getAddedCharacters()` 返回的是**按角色号升序**的已加入名单（引擎
 *     `Object.keys(this.data.base).map(Number)`，整数键升序枚举），
 *     「人数 - 1」只在编制恰好连号时偶然相等，故一律直接用角色号。
 *     异国勇者分支同理由 `char_make_inport` 的返回值（它内部加入的那位）
 *     给出，本函数不自行推算。
 *
 *   - 调 chara_make 只给性格实参（xingge），种族设定缺省 0；性格值从
 *     GENERAL_CHARASTERISTICS 表取（表在 ere/chara/chara-and-hair.js，
 *     未落 yml），角色不在表内时按 -1（无指定）。
 *   - **性格/发色的预设写入、形象确认循环、FLAG:1/2 搬迁、FLAG:402 与
 *     chara_make 调用，整段都在非异国分支内**（#494）；异国路径只做三行
 *     就直落收尾。早先的实现在这里偏离过（整段放在 if/else 之外），后果是
 *     异国勇者导入后名单记录带来的性格/发色被预设值覆盖、白跑一轮形象
 *     确认、并多写一次 FLAG:402。
 *
 *   - **「异国的」前缀按 `inport_cid` 拼**（#494）：判 `inport_cid` 是否
 *     为 0；收下播报因此两条路径各有各的文案。
 *
 *   - **char_make_inport 经参数注入**：它的真身在转发层
 *     ere/chara/char-make.js（它自己 require 本文件），本文件反向 require 会
 *     成环；而转发层不许折叠（#170 验收第 2 条）。`char_make_inport` 因此
 *     是本函数的形参，调用方从转发层取——与 `rand` 同样处理。异国判定在
 *     占用判定之后、非异国分支之前，**两条路径（开局初始奴隶与战役
 *     招募）都会跑**，调用点因此一律要传（#494 补上了战役那一处）。
 *
 * @param {(n: number) => number} [rand] 随机源（[0,n) 整数）
 * @param {() => Promise<number>} [char_make_inport] 异国勇者判定
 *   （转发层 ere/chara/char-make.js 的实现）：0 = 非异国，> 0 = 新建的
 *   异国勇者的角色号；缺省视为判定不通过（返回 0）
 * @param {boolean} [campaign_slave] 赤森奴隶：招募战役
 *   奴隶时为真，由调用点（page/page-campaign.js 的招募分支）显式传入；
 *   缺省 false 即现有行为（普通开局勇者招募）
 * @returns {Promise<number>} 新角色的角色号；
 *   16 位占满与「算了，不选了」给 0——战役招募下
 *   16 位全满同样落前者（候选表为空，见 pick_free_hero_slot）
 */

/**
 * rand_chara_make 的三个模块级静态量（haircolor / character / xingge），
 * 跨调用保留：同一次游玩的下一次招募沿用上一次的选择（character != -1 →
 * set_charasteristic、haircolor > 0 → set_haircolor）。读档或回标题不清
 * 模块级静态量——按 #565 的处理：模块加载即初值 0，同一次进程内行为一致。
 */
let haircolor = 0; // 上一次的发色档（形象确认段回写）
let character = 0; // 上一次的性格档（-1 = 未定义）
let xingge = 0; // 性格设定值（查 GENERAL_CHARASTERISTICS 表写入，调 chara_make 时传入）

async function rand_chara_make(rand, char_make_inport, campaign_slave = false) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const inport_check = char_make_inport ?? (() => Promise.resolve(0));
  // 换人重挑的循环入口
  for (;;) {
    // 名字用 chara_id 而非 chara：后者是本文件顶部 import 的 chara 门面
    //
    // 勇者位 1-16。普通路径掷 1-16；战役招募
    // 改走 pick_free_hero_slot（#483 结论·方案 2：只从未被占用的位里抽），
    // 它给 0 表示 16 位全满——下方 `chara_id !== 0` 不成立，直接走
    // 失败分支（page/page-campaign.js 的招募分支对返回 0 已处理，
    // 且在扣 100 气力之前）
    const chara_id = campaign_slave
      ? pick_free_hero_slot(rand_n)
      : rand_n(16) + 1;

    // 勇者位未被占用才继续。战役招募的 chara_id 由
    // pick_free_hero_slot 保证未被占用，占用判定自然成立；普通路径照旧——
    // 掷中已占用的勇者位就走失败文案
    if (chara_id !== 0 && !era.getAddedCharacters().includes(chara_id)) {
      // 异国勇者判定：非异国时返回 0，异国时是那个新角色的角色号
      // （#487：判定结果一路用到底，本函数不自行推算）
      const inport_cid = await inport_check();
      let newchara;
      if (inport_cid === 0) {
        // 不是异国勇者（異国の勇者ではない）：新建一位，
        // 再走性格/发色写入、形象确认、FLAG 搬迁与 chara_make。**这一整段都在
        // 本分支内**（#494）；异国路径只做三行就直落收尾。
        //
        // ⚠ 有意偏离既有行为（#483 结论·方案 2）：既有写法在角色号已被占用时
        // **追加**一位同模板角色（原角色不动）；而 ere 把角色号
        // 直接当预设号用（#21 的扁平化），同号双角色在移植层不可表达（引擎
        // `addCharacter([角色号, 预设号])` 本可分离两者，代价见文件头 #483
        // 条目），引擎对**同号单参**的语义是「从 data.no 滤出后重推 + 全表
        // （base/abl/talent/cflag/exp/relation…）按预设重置」（app.asar 实测，
        // 夹具只镜像了前半段，见 test/helpers/era-fixture.js 的 addCharacter
        // 段），于是同号情形只剩「原地重置重募」——玩家育成过的该号奴隶会被
        // 重置回预设。这张工单因此把战役招募的勇者位选法改为只从未被占用的
        // 位里抽（pick_free_hero_slot），偏离只限于一次 rand 的取值范围：本
        // 行不再可能落在已被占用的位子上。
        era.addCharacter(chara_id); // 加入角色
        await add_chara_ex(chara_id); // 角色专属初始化
        newchara = chara_id; // 新角色的角色号

        // 性格与发色的**预设写入**（两个条件沿用既有写法，见下方注释）
        // character != -1 —— 初值 0，故首轮恒进；第二轮起
        //     它可能是回写的 -1（未定义），那一轮就跳过
        if (character !== -1) {
          set_charasteristic(newchara, character); // 落上一次选定的性格
        }
        // haircolor > 0 —— 初值 0，首轮不进；第二轮起可能进
        if (haircolor > 0) {
          set_haircolor(newchara, haircolor); // 落上一次选定的发色
        }

        // 形象确认循环（改性格 / 改发色 / 继续）
        // 性格与发色的显示段两段同构，显示/设置/选择自 #392 起是真身。
        for (;;) {
          // 赤森奴隶按招募场景切换文案
          if (campaign_slave) {
            era.print('当前挑选出来的奴隶，是这个形象的……');
          } else {
            era.print('呃……面前的勇者，是这个形象的……');
          }
          // 性格：[0] 行**按钮化**（PR #53 通则：era 的 input 只收本轮
          // 打印过的按钮快捷键；纯文本 `[N] ` 行在实机敲不进——#565 返工第 1
          // 条引擎实测「只收 100」）。按钮正文按「印象 ： + 名字」拼一行：
          // 名字经 charasteristic_index 查询 +
          // talentname 直取，不经会打印的 show_*（printButton 独占一行，名字
          // 必须进正文）。行尾由按钮行承接，不再补空 print
          let shown = charasteristic_index(newchara); // 查询性格档
          if (shown === -1) {
            // 未定义则随机补设再查
            set_random_charasteristic(newchara, rand_n);
            shown = charasteristic_index(newchara);
          }
          character = shown;
          // xingge 查 GENERAL_CHARASTERISTICS 表——表在
          // ere/chara/chara-and-hair.js；character 为 -1
          // （表外）时按「无指定」处理
          xingge =
            character >= 0 ? (GENERAL_CHARASTERISTICS[character] ?? -1) : -1;
          era.printButton(
            `印象 ： ${
              character >= 0
                ? talentname(GENERAL_CHARASTERISTICS[character])
                : ''
            }`,
            0,
          );

          // 发色：与性格同构（talent 直取 ARR_HAIRCOLOR，不经会打印
          // 的 show_haircolor；行尾由按钮行承接）
          if (talent(newchara, 300) === 0) {
            // 未定义（0 号空串）则随机补设
            set_random_haircolor(newchara, rand_n);
          }
          haircolor = talent(newchara, 300); // 回写当前发色
          era.printButton(`发色 ： ${ARR_HAIRCOLOR[haircolor] ?? ''}`, 1);

          // 分隔线 + 魔王真眼，[100] 同为按钮（三个输入面一个不缺）。
          // 正文不写 [100] 前缀，引擎按 showAcc 自拼。此前版本只有 [100]
          // 是按钮、[0]/[1] 是纯文本——引擎 useRule 生效后实机只收 100（验收
          // 第 1 条实测），性格被钉死在表 0 项；三条一起按钮化才完整
          era.printButton(
            '你发动了魔王真眼，深入探究更进一步的详细素质……',
            100,
          );

          const choice = await era.input();
          if (choice === 0) {
            // 改性格 → 回到形象确认循环
            era.print('什么样的态度呢……');
            await choose_charasteristic(newchara); // 改性格的挑选
            continue;
          }
          if (choice === 1) {
            // 改发色 → 回到形象确认循环
            era.print('什么样的发色呢…');
            await choose_haircolor(newchara); // 改发色的挑选
            continue;
          }
          if (choice === 100) {
            break; // 進む
          }
          // 其余输入 → 回到形象确认循环
        }

        // TARGET/ASSI 只按「上一次调教对象/助手」读回，不做下标前移：
        // 新角色总在登记末尾，前移没有可指的对象；ere 的角色号也不是
        // 登记序。动的是 FLAG:1/FLAG:2（「上一次的
        // 调教对象」，event-end.js:68-69 的同款槽位），跨域写走 game 域门面
        // （#71；属主域是 event）。
        era_flag.target = game.event.上次调教对象; // TARGET = FLAG:1
        era_flag.assi = game.event.上次助手; // ASSI = FLAG:2

        era.set('flag:402', 1); // 派遣奴隶标志（等级 1 生成）
        // 调 chara_make —— 只给性格实参（xingge），
        // 种族设定缺省 0；xingge 来自上方的表格查询
        await chara_make(newchara, xingge, 0, rand_n, newchara);
      } else {
        // 是异国勇者（異国の勇者である）：char_make_inport
        // 内已加入角色，用它的返回值。**本分支只有这三行**，上面那一段
        // 全是非异国路径的，不在这里重复。
        newchara = inport_cid; // 新角色的角色号
      }
      // 异国与否只用于收下播报的「异国的」前缀；等价物是 `inport_cid`
      // （0 = 非异国），收下分支的播报据此拼前缀（#494）。

      // show_chara_info（#390 真身）：**页码
      // 是 -2（贡品信息：身体数据 + 外貌）**；#390 起
      // 串线，审查 #565 订正。**惰性 require**：本文件顶层
      // 引入会把 page-chara-info-show 及其整条链（含 dungeon-quest ↔
      // dungeon-battle 的既有环）提前拉起来，dungeon-quest 会变成半成品；
      // 只有这一条形象确认支路用得到，就在用到处取。
      await require('#/page/page-chara-info-show').show_chara_info(
        newchara,
        -2,
        rand_n,
      );

      // 两个/三个选项都做成**真按钮**（PR #53 通则）：引擎的 input 只接受本轮
      // 打印过的按钮快捷键，纯文本的 `[N] 文字` 行玩家敲不进编号
      // （#130/#530）。实机表现是整条战役线卡死在这里（#530）。
      // 三/两个选项排在同一行，按钮用 printMultiColumns 保持一行布局，
      // 24 列均分。**正文不写 `[N]` 前缀**：引擎按 showAcc 自动拼，自带会显示成 `[1] [1] 不，换一个`
      // （AGENTS.md 硬约束，PR #30 踩过）。
      if (campaign_slave) {
        era.print('这位挑选出来的奴隶，您还满意吗？');
        era.printMultiColumns([
          {
            type: 'button',
            accelerator: 1,
            content: '不，换一个',
            config: { align: 'left', width: 8 },
          },
          {
            type: 'button',
            accelerator: 2,
            content: '嘛…还行，就这位吧',
            config: { align: 'left', width: 8 },
          },
          {
            type: 'button',
            accelerator: 3,
            content: '算了，不选了',
            config: { align: 'left', width: 8 },
          },
        ]);
      } else {
        era.print('解开你封印的，真的是这样的对象吗…？');
        era.printMultiColumns([
          {
            type: 'button',
            accelerator: 1,
            content: '不不不不…我看错了！',
            config: { align: 'left', width: 12 },
          },
          {
            type: 'button',
            accelerator: 2,
            content: '是她！是她！就是她！抓起来！…',
            config: { align: 'left', width: 12 },
          },
        ]);
      }

      const answer = await era.input();
      if (answer === 1) {
        // 换一个：删掉重挑
        party_char_del(newchara); // 退出队伍
        era.removeCharacter(newchara); // 移除角色
        cn_rebuild(); // 重建名字表
        continue; // 换人重挑
      }
      if (answer === 3 && campaign_slave) {
        // 算了，不选了（仅战役招募场景可选）：删掉后直接返回 0，
        // 不重挑。TARGET/ASSI 复位与上方已做过的一次
        // 重复赋同一对值，无副作用
        party_char_del(newchara); // 退出队伍
        era.removeCharacter(newchara); // 移除角色
        cn_rebuild(); // 重建名字表
        era_flag.target = game.event.上次调教对象; // TARGET = FLAG:1
        era_flag.assi = game.event.上次助手; // ASSI = FLAG:2
        return 0; // 复位后返回
      }

      // 收下
      era.print('*****************************************');
      // 「异国的」前缀只在异国分支出现（见上方注释）；
      // 收下播报一行由前缀与称呼拼成
      era.print(
        `${inport_cid === 0 ? '' : '异国的'}冒险者${chara_callname(newchara)}被囚禁在了地牢里！`,
      );
      era.print('*****************************************');
      chara(newchara).invasion.状态 = 0; // CFLAG:1 初始位置
      era.set('flag:402', 0); // 用过的标志归位
      era_flag.target = game.event.上次调教对象; // TARGET = FLAG:1
      era_flag.assi = game.event.上次助手; // ASSI = FLAG:2
      await era.waitAnyKey();
      return newchara;
    }

    // 16 个勇者位都占着（普通路径掷中已占用的位；战役招募候选为空）
    era.print('由于对魔王的恐惧，勇者没有出现。（奴隶数已达上限，请处决几个）');
    await era.waitAnyKey();
    return 0;
  }
}

module.exports = {
  chara_make,
  rand_chara_make,
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
