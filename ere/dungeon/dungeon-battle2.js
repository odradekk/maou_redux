/**
 * @file 单挑·迎击与潜入（issue #175，阶段 3 H6）：勇者与元勇者的战斗。
 *
 * 源: target/ERB/迷宮/DUNGEON_BATLLE2.ERB  @DUNGEON_BATTLE2_PARTY（:2-510，
 *       主流程）、@SELECT_SLAVE（:513-573）、@SPEED_PLUS2（:577-632）、
 *       @DUEL_ATTACK（:637-791，角色对角色的攻击）、
 *       @SLAVE_MONSTER_ATTACK_TO_ENEMY（:794-842）、
 *       @SLAVE_MONSTER_ATTACK_TO_SLAVE（:846-894）、
 *       @ATTACK_CHARA_EXTRA_DMG_BATTLE2（:897-993）、@DEATH_CHECK2
 *       （:996-1055）、@DUNGEON_SPY（:1058-1200，潜入工作）、@SPY_BATTLE
 *       （:1204-1298）
 *
 * 与 DUNGEON_BATLLE（ere/dungeon/dungeon-battle.js）是两套战斗：那边的
 * @DUNGEON_PARTY_BATTLE 是侵攻勇者 vs 迷宫怪物，这边是**迎击**（勇者 vs
 * 元勇者/奴隶，@DUNGEON 迎击臂 CFLAG:1 == 3 时调用）。防御怪物列（E:0-299）
 * 在本战斗里承载「奴隶的援护怪物」（:71-86 生成，恒 boss 化一只）。
 *
 * 移植说明（有意偏离，均注明依据；通用条目见 dungeon-battle.js 文件头）：
 *   - 原作 RETURN 的多值出口（RETURN 2 时以全局 B 带出败者号）改为返回
 *     `{ result, loser }`（#5 决议第六条：全局换手显式传参）；@DUNGEON 的
 *     消费点据此取 battle2.loser（原作 :569 的 B）；
 *   - @SPEED_PLUS2 的「A/B 换手查装备」（:620-630，原作靠改写全局 A 让
 *     EQUIP_CHECK 查对手）改为对两人各查一次；
 *   - @DUEL_ATTACK 的 X:1（:675-681 的 3/4 赋值）无读者——原作疑似给旧版
 *     MAGIC 的传参残留，1:1 保留赋值、不落用途（注释留痕）；
 *   - :967 的「奇襲成功！！」是原作漏译（同函数 :716 已译「偷袭成功！！」），
 *     按 #60 归一为简体「奇袭成功！！」；
 *   - %SHE(ARG)% / %阴核(ARG)%（魔改新增/文本校正.ERB 的三行纯函数）
 *     随本票内联（dungeon-battle.js 的 she 与本文件的阴核词）。
 */

'use strict';

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { chara } = require('#/facade/chara');
const { stub_line, stub_line_wait } = require('#/utils/stub-line');
const { equip_check, equip_powerup } = require('#/system/equip/equip-check');
const { equip_database } = require('#/system/equip/equip-lookup');
const { e_get, e_set, monster_data } = require('#/dungeon/monster-data');
const battle = require('#/dungeon/dungeon-battle');
const { weapon_restore } = require('#/system/equip/weapon-restore');
const { party_del } = require('#/dungeon/dungeon-party');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。
 */
const STUBBED_CALLS = ['SLAVE_MONSTER_SKILL', 'PC_RYOU', 'GET_TATTOO'];

/** 名字承载（#5 决议） */
function name_of(cid) {
  return era.get(`callname:${cid}:-1`) ?? '';
}

/** 原作 RAND:N（0..N-1）的缺省实现 */
function default_rand(n) {
  return Math.floor(Math.random() * n);
}

/** 阴核(ARG) 称呼（魔改新增/文本校正.ERB :9-15，随本票内联） */
function clitoris_word(cid) {
  return (era.get(`talent:${cid}:122`) || 0) !== 0 ? '阴茎' : '阴核';
}

// —— 存根层（#175 登记）——

/**
 * @SLAVE_MONSTER_SKILL 存根（怪物技能票）：精英部下的特技。存根返回 0。
 * @returns {number} 原作 RESULT（存根恒 0；999 = 中断）
 */
function slave_monster_skill() {
  return stub_line('SLAVE_MONSTER_SKILL', '精英部下特技', '随怪物技能票');
}

/**
 * @PC_RYOU 存根（凌辱票；FLAG:5 & 1 配置位）：败者被凌辱的演出。
 * @returns {Promise<void>} 原作无 RESULT 消费
 */
async function pc_ryou() {
  await stub_line_wait('PC_RYOU', '败者凌辱', '随凌辱票');
}

/**
 * @GET_TATTOO 存根（刺青票）：刺青检索。RESULT 0 = 无刺青——DUNGEON_SPY
 * 的刺青炫耀段因此跳过。
 * @returns {number} 原作 RESULT（存根恒 0）
 */
function get_tattoo() {
  return stub_line('GET_TATTOO', '刺青检索', '随刺青票');
}

/**
 * @SELECT_SLAVE（:513-573）：选出攻击的奴隶（或其配下怪物）。
 * @param {number} arg0 奴隶（原作 ARG:0）
 * @param {number} arg1 回合数（原作 ARG:1）
 * @returns {number} 原作 RETURN：奴隶号，或 99/199/299（选中配下怪物——
 *   作者注释「怪物数のID（99,199,299）が返る」，主循环以 >= 99 分流）
 */
function select_slave(arg0, arg1) {
  let member = 1;
  // :536-540 仲間怪物（奴隶队伍扩展被注释掉，结构保留）
  for (let monid = 0; monid < 300; monid += 1) {
    monid += 99;
    if (e_get(monid) > 0) {
      member += 1;
    }
  }

  const rest = arg1 % member; // :543
  if (rest === 0) {
    return arg0;
  }
  if (rest === 1) {
    // :548-555 仲間怪物（全滅時も考える）
    for (let monid = 0; monid < 300; monid += 1) {
      monid += 99;
      if (e_get(monid) > 0) {
        return monid;
      }
    }
  } else if (rest === 2) {
    for (let monid = 100; monid < 300; monid += 1) {
      monid += 99;
      if (e_get(monid) > 0) {
        return monid;
      }
    }
  } else if (rest === 3) {
    // 299 以外あり得ないが、一応
    for (let monid = 200; monid < 300; monid += 1) {
      monid += 99;
      if (e_get(monid) > 0) {
        return monid;
      }
    }
  }
  return arg0; // :572 念のため
}

/**
 * @SPEED_PLUS2（:577-632）：对人格斗的先攻后攻（正 = 奴隶侧先攻）。
 * @param {number} a 奴隶（原作全局 A）
 * @param {number} b 勇者（原作全局 B）
 * @param {(n: number) => number} rand RAND:N 随机源
 * @returns {number} SPEED_X - SPEED_Y
 */
function speed_plus2(a, b, rand) {
  let speed_x = rand(6);
  let speed_y = rand(6);

  // :585-609 双方同款素质（奇袭 243 / 恶魔翅膀 245 / 迅速 258 / 霍比特
  // 314==10 / 矮人 314==11）
  for (const [cid, side] of [
    [a, 'x'],
    [b, 'y'],
  ]) {
    const delta = (talent, val = 1) =>
      (era.get(`talent:${cid}:${talent}`) || 0) === 1 ? val : 0;
    const add = delta(243) + delta(245) + delta(258);
    const hobbit = (era.get(`talent:${cid}:314`) || 0) === 10 ? 1 : 0;
    const dwarf = (era.get(`talent:${cid}:314`) || 0) === 11 ? -1 : 0;
    if (side === 'x') {
      speed_x += add + hobbit + dwarf;
    } else {
      speed_y += add + hobbit + dwarf;
    }
  }

  // :610-618 奴隶的装备（速度UP 3 / 速度減 12）
  speed_x += equip_check(a, 3);
  speed_x -= equip_check(a, 12);
  // :620-630 原作换手全局 A 查勇者装备——ere 侧直接对 b 查
  speed_y += equip_check(b, 3);
  speed_y -= equip_check(b, 12);

  return speed_x - speed_y;
}

/**
 * @ATTACK_CHARA_EXTRA_DMG_BATTLE2（:897-993）：对人格斗的伤害补正
 * （失手/防御削減/弹药/连击/毒/耐性），气力伤害（MDMG × W:16）在此扣。
 * @param {number} arg0 攻击者（原作 ARG:0）
 * @param {number} dmg 伤害（原作 DMG）
 * @param {number} arg1 先后手（0 先手 / 1 后手 / 2 先制）
 * @param {number} arg2 被攻击者（原作 ARG:2）
 * @param {string} atktitle 称谓（勇者 / 奴隶 / 圣灵骑士）
 * @param {object} w 攻击者的装备记录（equip_database 已填充）
 * @param {(n: number) => number} rand RAND:N 随机源
 * @returns {number} 补正后的伤害（0 = 落空）
 */
function attack_chara_extra_dmg_battle2(
  arg0,
  dmg,
  arg1,
  arg2,
  atktitle,
  w,
  rand,
) {
  const settings = era.get('flag:5') || 0;
  // :911-920 ミス処理（失手率 W:11 + 忍术回避 15）
  let hit = w.失手率;
  if ((era.get(`talent:${arg2}:251`) || 0) === 1) {
    hit += 15;
  }
  if (rand(100) - hit < 0) {
    if ((settings & 32) !== 0) {
      era.print(`${atktitle}的攻击落空了……`);
    }
    return 0;
  }

  // :922-925 気力回復（W:12，钳上限）
  const max_wp = era.get(`maxbase:${arg0}:1`) || 0;
  chara(arg0).dungeon.气力 = Math.min(
    chara(arg0).dungeon.气力 + w.气力回复,
    max_wp,
  );

  // :927-930 DEF = 相手の防御力（单臂 IF，无 ELSE——条件假时 DEF 保持入参
  // dmg 计算前的 0 初值语义，1:1 保留）
  let def = 0;
  if (chara(arg2).dungeon.防御力 < chara(arg0).dungeon.攻击力) {
    def = chara(arg2).dungeon.防御力;
  }

  // :932-935 防御値の減少（W:14 防御伤害%）
  const def_loss = Math.floor(
    Math.floor(chara(arg2).dungeon.防御力 / 3) * (w.防御伤害 / 100),
  );
  chara(arg2).dungeon.防御力 -= def_loss;

  // :937-940 DMG / MDMG
  dmg = (chara(arg0).dungeon.攻击力 - def) * 2;
  let mdmg = dmg;

  // :942-951 ダメージ変動（弹药）
  const bullets = era.get(`cflag:${arg0}:571`) || 0;
  if (bullets > 0) {
    dmg = Math.floor((dmg * w.伤害强化) / 100);
  } else if (w.弹尽行为 === 1) {
    dmg = Math.floor(dmg / 2);
  } else if (w.弹尽行为 === 2) {
    if ((settings & 32) !== 0) {
      era.print('弹药用尽，只能干瞪眼！');
    }
    return 0;
  }
  // :952 MDMG = MDMG * W:16 / 100（气力伤害比例）
  mdmg = Math.floor((mdmg * w.气力伤害) / 100);

  // :954 CFLAG:571 -= W:10
  era.set(`cflag:${arg0}:571`, bullets - w.弹药消耗);

  // :956-962 連続攻撃処理（W:13）
  if (rand(100) - w.连击率 < 0) {
    if ((settings & 32) !== 0) {
      era.print(`${atktitle}发出了迅捷的2连击！！`);
    }
    dmg *= 2;
    era.set(
      `cflag:${arg0}:571`,
      (era.get(`cflag:${arg0}:571`) || 0) - w.弹药消耗,
    );
  }

  // :964-969 先手かつ奇襲なら防御値減少（:967 原作漏译「奇襲成功！！」，
  // 按 #60 归一简体，文件头）
  if (arg1 === 0 && (era.get(`talent:${arg0}:243`) || 0) === 1) {
    if ((settings & 32) !== 0) {
      era.print('奇袭成功！！');
    }
    chara(arg2).dungeon.防御力 = Math.floor(chara(arg2).dungeon.防御力 / 2);
  }

  // :971-983 追加効果（毒：W:6 位 0 且 RAND:2 → CFLAG:503 位 4）
  if (w.特殊 & 1 && rand(2)) {
    if ((era.get(`cflag:${arg2}:503`) || 0) & 16) {
      if ((settings & 32) !== 0) {
        era.print('毒素不断侵蚀！！');
      }
      dmg *= 2;
    } else {
      if ((settings & 32) !== 0) {
        era.print('毒素增加了！！');
      }
      era.set(`cflag:${arg2}:503`, (era.get(`cflag:${arg2}:503`) || 0) + 16);
    }
  }

  // :985-989 耐性処理（対人では一律 1.2 倍：火/冷/电任一）
  if (w.特殊 & 2 || w.特殊 & 4 || w.特殊 & 8) {
    dmg += Math.floor(dmg / 5);
  }

  // :991 気力ダメージ
  chara(arg2).dungeon.气力 -= mdmg;

  return dmg;
}

/**
 * @DUEL_ATTACK（:637-791）：角色对角色的攻击。
 * @param {number} arg0 攻击者（原作 ARG:0）
 * @param {number} arg1 先后手（0 先手 / 1 后手 / 2 先制）
 * @param {number} arg2 对象（原作 ARG:2）
 * @param {number} arg3 战斗种别（0 勇者→奴隶 / 1 奴隶→勇者 / 2 圣灵→奴隶 /
 *   3 奴隶→圣灵）
 * @param {(n: number) => number} rand RAND:N 随机源
 * @returns {Promise<number>} 原作 RETURN：0 = 通常 / 999 = 中断（存根下不达）
 */
async function duel_attack(arg0, arg1, arg2, arg3, rand) {
  const settings = era.get('flag:5') || 0;
  // :661-664 一応代入（A/B/TARGET）
  era_flag.target = arg0;

  // :668-672 肛门虫（TALENT:193）自动调教（存根三连）
  if ((era.get(`talent:${arg0}:193`) || 0) !== 0) {
    await battle.before_autotrain();
    await battle.com13_auto();
    await battle.source_check_auto();
  }

  // :674-681 X:1 = 3/4——无读者（旧版 MAGIC 传参残留），1:1 保留赋值语义：
  // 值不落地、注释留痕。AB 逆转（ARG:3 == 0/2 时）同样只影响后续 SAVESTR
  // 取向，ere 侧显式传参后无全局可逆

  // :683-686 发动魔法（无参 CALL——TARGET_TYPE 缺省 0；存根）
  if (battle.magic() === 999) {
    return 999;
  }

  // :688-691 精英部下的特技（存根）
  if (slave_monster_skill(arg2, arg0) === 999) {
    return 999;
  }

  // :693-701 称谓
  let atktitle;
  let punct = '';
  if (arg3 === 0) {
    atktitle = '勇者';
  } else if (arg3 === 1 || arg3 === 3) {
    atktitle = '奴隶';
  } else if (arg3 === 2) {
    atktitle = '圣灵骑士';
    punct = '·';
  }

  // :703-704 戦闘前発動スキル（行内标签）
  const skill_tag = battle.skill_extra_bonus(arg0, rand);

  // :709-711 セリフ（口上存根，dungeon-battle.js 单点登记）
  if ((settings & 32) !== 0) {
    await battle.attack_koujo(arg0);
  }

  // :713-718 先手かつ奇袭：相手の防御値半減（行内 PRINT）
  let surprise_tag = '';
  if (arg1 === 0 && (era.get(`talent:${arg0}:243`) || 0) === 1) {
    if ((settings & 32) !== 0) {
      surprise_tag = '偷袭成功！！';
    }
    chara(arg2).dungeon.防御力 = Math.floor(chara(arg2).dungeon.防御力 / 2);
  }

  // :720-726 武器（素手 → 40 号剑）
  const w = { 存储编号: era.get(`cflag:${arg0}:550`) || 0 };
  if (w.存储编号 <= 0) {
    w.存储编号 = 40;
    chara(arg0).chara.武装 = 40; // CFLAG:550（跨域写走门面，#71/#72）
  }

  // :728-731 攻击演出（行内拼接）
  if ((settings & 32) !== 0) {
    era.print(
      `${skill_tag}${atktitle}${punct}${name_of(arg0)}使用${
        [
          '',
          '巨型',
          '剧毒',
          '致命',
          '强击',
          '烈火',
          '寒冰',
          '雷霆',
          '魔导',
          '暗黑',
        ][w.前缀] ?? ''
      }${
        {
          40: '剑',
          41: '法杖',
          42: '鞭',
          43: '匕首',
          44: '手里剑',
          45: '箭',
          46: '权杖',
          47: '战锤',
          48: '镰刀',
          49: '触手',
          50: '细剑',
          51: '偃月刀',
          52: '指拳',
        }[w.识别号] ?? '剑'
      }${w.强度 !== 0 ? `+${w.强度}` : ''}攻击！！`,
    );
  }

  // :734-735 查表与强化（原作对 ARG:2 调 POWERUP——1:1 保留）
  equip_database(w);
  equip_powerup(w, arg2);

  // :737-755 奴隷vs潜入中奴隷なら攻撃をサボる
  if (chara(arg0).invasion.状态 === 3 && chara(arg2).invasion.状态 === 3) {
    const roll = rand(3);
    if (roll === 0) {
      // 1/3で攻撃失敗
      if ((settings & 32) !== 0) {
        const lines = [
          '的攻击落空了…………',
          '不知何故停下了攻击的手！',
          '采取防御姿态……',
          '一副观察着的样子……',
          '跌倒了！',
        ];
        era.print(`${atktitle}${lines[rand(5)]}`);
      }
      return 0;
    }
    if (roll === 1) {
      // 1/3でダメージ補正三分の一に（原作改 W:9 全局——ere 侧记在 w 上）
      w.伤害强化 = Math.floor(w.伤害强化 / 3);
      era.print(`${atktitle}${punct}${name_of(arg0)}假装攻击……其实在放水……`);
    }
  }

  // :761 DMG = (攻 - 防) × 2（BATTLE2 版的初值，随后被 EXTRA_DMG_BATTLE2
  // 重算——1:1 保留两次计算）
  let dmg = (chara(arg0).dungeon.攻击力 - chara(arg2).dungeon.防御力) * 2;

  // :763-764 対人補正
  dmg = attack_chara_extra_dmg_battle2(
    arg0,
    dmg,
    arg1,
    arg2,
    atktitle,
    w,
    rand,
  );

  // :766-767 キャラ補正（BATLLE 版共用）
  dmg = battle.attack_chara_extra_dmg(arg0, dmg, arg1);

  // :769-771 防御側补正（HP 扣减在此）
  dmg = battle.defence_chara_extra_dmg(arg2, dmg, rand);

  if (dmg > 0) {
    if ((settings & 32) !== 0) {
      era.print(
        `${surprise_tag}${atktitle}${punct}${name_of(arg0)}的攻击令${name_of(arg2)}受到${dmg}点伤害！`,
      );
    }
    // :778 経験値
    era.set(
      `exp:${arg0}:80`,
      (era.get(`exp:${arg0}:80`) || 0) + (era.get(`cflag:${arg2}:9`) || 0),
    );
    if ((settings & 32) !== 0) {
      await era.waitAnyKey();
    }
    return 0;
  }

  if ((settings & 32) !== 0) {
    era.print(
      `${name_of(arg2)}拼命忍受着${atktitle}${punct}${name_of(arg0)}的攻击………`,
    );
  }
  if ((settings & 32) !== 0) {
    await era.waitAnyKey();
  }
  return 0;
}

/**
 * @SLAVE_MONSTER_ATTACK_TO_ENEMY（:794-842）：奴隶配下怪物的攻击（打勇者，
 * HP 与气力一起扣）。
 * @param {number} arg0 奴隶（原作 ARG:0）
 * @param {number} arg1 勇者（原作 ARG:1）
 * @returns {Promise<number>} 原作 RETURN 0
 */
async function slave_monster_attack_to_enemy(arg0, arg1) {
  const settings = era.get('flag:5') || 0;
  // :803-807 配下がいるかどうか（第 3 列 E:300）
  if ((era.get(`cflag:${arg0}:570`) || 0) < 100) {
    return 0;
  }
  if (e_get(300) < 100) {
    return 0;
  }

  // :809-814 怪物側の攻撃力（魔法补正 ×2）
  let damage = (era.get(`cflag:${arg0}:9`) || 0) * (e_get(302) + 1);
  if (e_get(306) !== 0) {
    damage *= 2;
  }

  // :816-819 演出
  if ((settings & 32) !== 0) {
    era.print(
      `服从于奴隶的${era.get(`itemname:${e_get(300)}`) ?? ''}发动了攻击！！`,
    );
  }

  if (chara(arg1).dungeon.防御力 < damage) {
    // :821-833 防御を貫く
    damage -= chara(arg1).dungeon.防御力;
    chara(arg1).dungeon.防御力 = Math.floor(
      Math.floor(chara(arg1).dungeon.防御力 / 3) * 2,
    );
    if ((settings & 32) !== 0) {
      era.print(`怪物的攻击使勇者${name_of(arg1)}受到${damage}伤害！`);
    }
    chara(arg1).dungeon.体力 -= damage;
    chara(arg1).dungeon.气力 -= damage;
    era.set(
      `exp:${arg0}:80`,
      (era.get(`exp:${arg0}:80`) || 0) + (era.get(`cflag:${arg1}:9`) || 0),
    );
    if ((settings & 32) !== 0) {
      await era.waitAnyKey();
    }
    return 0;
  }
  if ((settings & 32) !== 0) {
    era.print(`勇者${name_of(arg1)}拼命忍受着怪物的攻击………`);
  }

  // :837-838 防御衰减
  chara(arg1).dungeon.防御力 = Math.floor(
    Math.floor(chara(arg1).dungeon.防御力 / 3) * 2,
  );

  if ((settings & 32) !== 0) {
    await era.waitAnyKey();
  }
  return 0;
}

/**
 * @SLAVE_MONSTER_ATTACK_TO_SLAVE（:846-894）：勇者配下怪物的攻击（打奴隶）。
 * @param {number} arg0 奴隶（原作 ARG:0，被打方）
 * @param {number} arg1 勇者（原作 ARG:1，配下方）
 * @returns {Promise<number>} 原作 RETURN 0
 */
async function slave_monster_attack_to_slave(arg0, arg1) {
  const settings = era.get('flag:5') || 0;
  // :855-859 配下がいるかどうか（第 4 列 E:400）
  if ((era.get(`cflag:${arg1}:570`) || 0) < 100) {
    return 0;
  }
  if (e_get(400) < 100) {
    return 0;
  }

  // :861-866 怪物側の攻撃力
  let damage = (era.get(`cflag:${arg1}:9`) || 0) * (e_get(402) + 1);
  if (e_get(406) !== 0) {
    damage *= 2;
  }

  // :868-871 演出
  if ((settings & 32) !== 0) {
    era.print(
      `服从于勇者的${era.get(`itemname:${e_get(400)}`) ?? ''}发动了攻击！！`,
    );
  }

  if (chara(arg0).dungeon.防御力 < damage) {
    // :873-885 防御を貫く
    damage -= chara(arg0).dungeon.防御力;
    chara(arg0).dungeon.防御力 = Math.floor(
      Math.floor(chara(arg0).dungeon.防御力 / 3) * 2,
    );
    if ((settings & 32) !== 0) {
      era.print(`怪物的攻击使${name_of(arg0)}受到${damage}点伤害！`);
    }
    chara(arg0).dungeon.体力 -= damage;
    chara(arg0).dungeon.气力 -= damage;
    era.set(
      `exp:${arg1}:80`,
      (era.get(`exp:${arg1}:80`) || 0) + (era.get(`cflag:${arg0}:9`) || 0),
    );
    if ((settings & 32) !== 0) {
      await era.waitAnyKey();
    }
    return 0;
  }
  if ((settings & 32) !== 0) {
    era.print(`${name_of(arg0)}拼命忍受着怪物的攻击………`);
  }

  // :889-890 防御衰减
  chara(arg0).dungeon.防御力 = Math.floor(
    Math.floor(chara(arg0).dungeon.防御力 / 3) * 2,
  );

  if ((settings & 32) !== 0) {
    await era.waitAnyKey();
  }
  return 0;
}

/**
 * @DEATH_CHECK2（:996-1055）：对人格斗的中断判定。
 * @param {number} arg0 魔王侧（奴隶；原作 ARG:0）
 * @param {number} arg1 勇者侧（原作 ARG:1）
 * @returns {number} 原作 RETURN：0 = 继续 / 1 = 魔王侧退场 / 2 = 勇者退场
 */
function death_check2(arg0, arg1) {
  // :1001-1014 勇者死亡判定
  if (chara(arg1).dungeon.体力 <= 0) {
    era.print(`${name_of(arg1)}最终在潮湿的地下城中用尽了最后的气力。`);
    chara(arg1).invasion.状态 = 0;
    return 2;
  }
  if (chara(arg1).dungeon.体力 <= 300) {
    era.print(`${name_of(arg1)}感觉到生命垂危，投降求饶了。`);
    chara(arg1).invasion.状态 = 0;
    return 2;
  }
  if (chara(arg1).dungeon.气力 <= 0) {
    era.print(`${name_of(arg1)}失去了战斗的意志，丢掉武器投降了。`);
    chara(arg1).invasion.状态 = 0;
    return 2;
  }

  // :1016-1037 魔王側（狂王线 FLAG:5 & 128：退场状态 9 = 成为狂王的东西）
  const crazy = (era.get('flag:5') || 0) & 128;
  if (chara(arg0).dungeon.体力 <= 0 && crazy) {
    era.print(`${name_of(arg0)}最终在潮湿的地下城中用尽了最后的气力。`);
    chara(arg0).invasion.状态 = 9;
    return 1;
  }
  if (chara(arg0).dungeon.体力 <= 300 && crazy) {
    era.print(`${name_of(arg0)}感觉到生命垂危，投降求饶了。`);
    era.print(`${name_of(arg1)}将堕落的同伴遣送回国了。`);
    chara(arg0).invasion.状态 = 9;
    return 1;
  }
  if (
    chara(arg0).dungeon.气力 <= 1000 &&
    (era.get(`talent:${arg0}:280`) || 0) !== 0 &&
    crazy
  ) {
    // 被狂王俘虏过的（TALENT:280）气力 1000 以下即丧失战意
    era.print(`被狂王俘虏过的${name_of(arg0)}丧失了战意，丢下武器投降了。`);
    era.print(
      `看着${name_of(arg0)}的求饶，${name_of(arg1)}把这个堕落的同伴送回本国了。`,
    );
    chara(arg0).invasion.状态 = 9;
    return 1;
  }
  if (chara(arg0).dungeon.气力 <= 0 && crazy) {
    era.print(`${name_of(arg0)}失去了战斗的意志，丢掉武器投降了。`);
    era.print(`${name_of(arg1)}将堕落的同伴遣送回国了。`);
    chara(arg0).invasion.状态 = 9;
    return 1;
  }

  // :1039-1053 通常線（退场状态 0）
  if (chara(arg0).dungeon.体力 <= 0) {
    era.print(`${name_of(arg0)}最终在潮湿的地下城中用尽了最后的气力。`);
    chara(arg0).invasion.状态 = 0;
    return 1;
  }
  if (chara(arg0).dungeon.体力 <= 300) {
    era.print(`${name_of(arg0)}感觉到生命垂危，投降求饶了。`);
    era.print(`${name_of(arg1)}怜悯着堕落了的同伴，静静地走开了。`);
    chara(arg0).invasion.状态 = 0;
    return 1;
  }
  if (chara(arg0).dungeon.气力 <= 0) {
    era.print(`${name_of(arg0)}失去了战斗的意志，丢掉武器投降了。`);
    era.print(`${name_of(arg1)}怜悯着堕落了的同伴，静静地走开了。`);
    chara(arg0).invasion.状态 = 0;
    return 1;
  }
  return 0;
}

/**
 * @SPY_BATTLE（:1204-1298）：潜入工作的单项（谜药 / 按摩 / 泻药）。
 * @param {number} arg0 潜入奴隶（原作 ARG:0）
 * @param {number} arg1 对象勇者（原作 ARG:1）
 * @param {(n: number) => number} rand RAND:N 随机源
 * @returns {Promise<void>} 原作 RETURN 0
 */
async function spy_battle(arg0, arg1, rand) {
  const settings = era.get('flag:5') || 0;
  let hdmg = 10;
  let mdmg = 10;
  let kdmg = 1;

  const technique = era.get(`abl:${arg0}:12`) || 0; // ABL:12 技巧

  if (rand(3) === 0) {
    // :1219-1231 謎の薬投与
    if ((settings & 32) !== 0) {
      era.print(`${name_of(arg0)}对${name_of(arg1)}谎称说有去除疲劳的药，`);
      era.print(`给${battle.she(arg1)}煎服了桃色的草……`);
      era.print(`${name_of(arg1)}并不知这其实是一种媚药……`);
      era.print(`欲情点数+${10 + technique * 8}`);
    }
    // 技巧によって気力ダメージは増える
    mdmg += technique * 10;
    // 珠増加（JUEL:5 欲情）
    era.set(
      `juel:${arg1}:5`,
      (era.get(`juel:${arg1}:5`) || 0) + 10 + technique * 8,
    );
  } else if (rand(2) === 0) {
    // :1233-1260 マッサージ
    const bi =
      (era.get(`talent:${arg1}:81`) || 0) !== 0 ||
      (era.get(`abl:${arg1}:22`) || 0) > 0; // 双性恋·百合气质
    if ((settings & 32) !== 0) {
      era.print(`${name_of(arg0)}帮${name_of(arg1)}做了按摩，`);
      era.print('妖艳的手爱抚着胸部和下腹……');
      if (bi) {
        era.print(`${name_of(arg1)}感觉也不错……`);
        era.print(`欲情点数+${8 + technique * 3}`);
        era.print(`${clitoris_word(arg1)}点数+${1 + technique * 2}`);
        era.print(`乳房点数+${1 + technique * 2}`);
      } else {
        era.print(`欲情点数+${5 + technique * 2}`);
        era.print(`${clitoris_word(arg1)}点数+${1 + technique}`);
        era.print(`乳房点数+${1 + technique}`);
      }
    }
    // 珠増加（JUEL:5 欲情 / 0 阴核 / 14 乳房）
    if (bi) {
      era.set(
        `juel:${arg1}:5`,
        (era.get(`juel:${arg1}:5`) || 0) + 8 + technique * 3,
      );
      era.set(
        `juel:${arg1}:0`,
        (era.get(`juel:${arg1}:0`) || 0) + 1 + technique * 2,
      );
      era.set(
        `juel:${arg1}:14`,
        (era.get(`juel:${arg1}:14`) || 0) + 1 + technique * 2,
      );
    } else {
      era.set(
        `juel:${arg1}:5`,
        (era.get(`juel:${arg1}:5`) || 0) + 5 + technique * 2,
      );
      era.set(
        `juel:${arg1}:0`,
        (era.get(`juel:${arg1}:0`) || 0) + 1 + technique,
      );
      era.set(
        `juel:${arg1}:14`,
        (era.get(`juel:${arg1}:14`) || 0) + 1 + technique,
      );
    }
  } else {
    // :1263-1273 下剤投与
    if ((settings & 32) !== 0) {
      era.print(`${name_of(arg0)}在${name_of(arg1)}的饭菜里下了泻药，`);
      era.print(`${name_of(arg1)}吃坏了肚子，蹲在地下城的角落里额头冒汗……`);
    }
    // 技巧によってダメージは増える
    hdmg += technique * 20;
    mdmg += technique * 15;
    kdmg += 1;
  }

  // :1276-1280 [施虐狂]（TALENT:83）1.2 倍
  if ((era.get(`talent:${arg0}:83`) || 0) !== 0) {
    hdmg = Math.floor((hdmg * 120) / 100);
    mdmg = Math.floor((mdmg * 120) / 100);
  }

  // :1282-1283 善恶值を負の値にする
  kdmg *= -1;

  if ((settings & 32) !== 0) {
    era.print(`${name_of(arg1)}因为疲劳，HP${hdmg}、气力${mdmg}下降了。`);
    era.print(`（善良值减少了:${kdmg}）`);
  }

  // :1290-1291 ダメージ
  chara(arg1).dungeon.体力 -= hdmg;
  chara(arg1).dungeon.气力 -= mdmg;

  // :1293 CALL KARMA, ARG:1, KDMG（dungeon.js 的既有存根，不动值）
  const { karma } = require('#/dungeon/dungeon');
  karma(arg1, kdmg);

  if ((settings & 32) !== 0) {
    era.println();
  }
}

/**
 * @DUNGEON_SPY（:1058-1200）：潜入中奴隶的特别行动（不直接攻击，专念
 * 工作活动）。@DUNGEON 的 CFLAG:530 == 1 且 CFLAG:1 == 3 提前返回内调用
 * （dungeon.js :29-30 的接入点），@DUNGEON_BATTLE2_PARTY 的
 * CFLAG:500 == 4 分支也调这里。
 * @param {number} arg0 潜入奴隶（原作 ARG:0）
 * @param {(n: number) => number} [rand] RAND:N 随机源（缺省均匀随机）
 * @returns {Promise<number>} 原作 RETURN 0
 */
async function dungeon_spy(arg0, rand) {
  const rand_n = rand ?? default_rand;
  const settings = era.get('flag:5') || 0;
  const leader = era.get(`cflag:${arg0}:533`) || 0; // LEADER = リーダー記憶

  if (leader <= 0) {
    return 0;
  }

  // :1073-1083 開場演出（コンフィグ「戦闘ログでのSKIP中断」位 9）
  if ((settings & 32) !== 0) {
    era.drawLine();
    era.print('*魔爪悄悄地伸向了勇者的队伍……*');
    await era.waitAnyKey(true);
    era.drawLine();
  }

  // === パーティを裏切って陥落させる処理（:1085-1181）===
  // もう一人の仲間
  const enemy =
    arg0 === (era.get(`cflag:${leader}:531`) || 0)
      ? era.get(`cflag:${leader}:532`) || 0
      : era.get(`cflag:${leader}:531`) || 0;

  // 裏切る確率（体力項 + 気力項，各 LIMIT 0..100）
  const max_hp_l = era.get(`maxbase:${leader}:0`) || 0;
  const max_wp_l = era.get(`maxbase:${leader}:1`) || 0;
  let betray = Math.min(
    Math.max(
      100 -
        Math.floor(
          (chara(leader).dungeon.体力 * 100 - 10000) /
            Math.floor(max_hp_l / 2 - 300),
        ),
      0,
    ),
    100,
  );
  betray += Math.min(
    Math.max(
      100 -
        Math.floor(
          (chara(leader).dungeon.气力 * 100) / Math.floor(max_wp_l / 3),
        ),
      0,
    ),
    100,
  );
  // 互いのレベル差1ごとに確率を1/10増減（最大5レベル分）
  const lv_mod =
    10 +
    Math.min(
      Math.max(
        (era.get(`cflag:${arg0}:9`) || 0) - (era.get(`cflag:${leader}:9`) || 0),
        -5,
        5,
      ),
    );
  betray = Math.floor((betray * lv_mod * 100) / 1000);
  // もう一人の仲間も潜入奴隷なら2倍
  if (enemy !== 0 && (era.get(`cflag:${enemy}:500`) || 0) === 4) {
    betray *= 2;
  }
  betray = Math.floor(betray / 2);

  const roll = rand_n(100);
  if (roll < betray) {
    // === 背叛分支（:1108-1179）===
    if (
      (era.get(`cflag:${arg0}:151`) || 0) >= 100 &&
      ((era.get(`talent:${arg0}:160`) || 0) !== 0 ||
        (era.get(`talent:${arg0}:162`) || 0) !== 0) &&
      (era.get(`abl:${arg0}:20`) || 0) < 3 &&
      rand_n(3) !== 0
    ) {
      // 性格が慈爱か懦弱で抖S气质Lv3未満かつ善恶値が秩序：2/3で躊躇う
      era.print(
        `勇者${name_of(leader)}已经没有多少抵抗的余力了，现在正是让对方陷落的好时机！`,
      );
      era.print(
        `虽然时间不长，但起码是同伴一场，${name_of(arg0)}为背叛朋友的事踌躇着。`,
      );
    } else if ((era.get(`talent:${arg0}:83`) || 0) !== 0 && rand_n(3) !== 0) {
      // [施虐狂]の場合2/3で潜入続行
      era.print(
        `${name_of(arg0)}饶有兴致地欣赏着勇者${name_of(leader)}凄惨痛苦的样子。`,
      );
    } else if (
      enemy &&
      (era.get(`cflag:${enemy}:500`) || 0) !== 4 &&
      rand_n(3) !== 0
    ) {
      // もう一人の仲間がいて潜入奴隷ではないなら2/3で失敗
      era.print(
        `${name_of(arg0)}窥探着勇者${name_of(leader)}的样子，寻找着背叛的机会。`,
      );
      era.print(`但是由于附近${name_of(enemy)}的行动而一直没有机会行动……`);
    } else {
      // 真の裏切り
      era.print(`${name_of(arg0)}看着勇者${name_of(leader)}`);
      if (
        Math.floor((chara(leader).dungeon.体力 * 100) / max_hp_l) <
        Math.floor((chara(leader).dungeon.气力 * 100) / max_wp_l)
      ) {
        era.print('奄奄一息');
      } else {
        era.print('累得脸色发青');
      }
      era.print('的样子，觉得正是时机，拔出了武器！');
      era.print('面对一脸茫然的勇者，');
      era.print(`${name_of(arg0)}`);
      // 刺青がある場合は見せびらかす（GET_TATTOO 存根恒 0 → 跳过）
      get_tattoo(arg0);
      era.print('告诉了对方自己本来的目的，让其选择投降还是死亡。');
      era.print('勇者对同伴的背叛感到难以置信与');
      if (
        (era.get(`talent:${arg0}:163`) || 0) !== 0 ||
        (era.get(`talent:${arg0}:164`) || 0) !== 0
      ) {
        era.print('无比愤怒，就这样在悲愤中被');
      } else {
        era.print('无比绝望，就这样在沉默中被');
      }
      era.print('拘束起来了……');
      era.println();
      era.print(`${name_of(leader)}被抓住了……`);
      // :1148-1150 賞金（MONEY / EX_FLAG:4444 镜像）
      const gain = 100 * (era.get(`cflag:${leader}:9`) || 0);
      era_flag.money += gain;
      era_exflag.legit_money += gain;
      era.print(`获得了${gain}G！`);
      // :1151-1153 勇者討伐数
      era.set(`cflag:${arg0}:505`, (era.get(`cflag:${arg0}:505`) || 0) + 1);
      if (enemy !== 0 && (era.get(`cflag:${enemy}:500`) || 0) === 4) {
        era.set(`cflag:${enemy}:505`, (era.get(`cflag:${enemy}:505`) || 0) + 1);
      }
      // :1154-1157 陷落处理
      chara(leader).invasion.新人 = 1; // CFLAG:506（门面）
      chara(leader).invasion.回城标志 = 0; // CFLAG:507（门面）
      chara(leader).invasion.状态 = 0;
      party_del(leader);
      era.println();
      // :1159-1162 要让其回来吗
      era.print(`要让${name_of(arg0)}`);
      if (enemy !== 0 && (era.get(`cflag:${enemy}:500`) || 0) === 4) {
        era.print(`和${name_of(enemy)}`);
      }
      era.print('回来吗？');
      era.print(' [0] - 好的');
      era.print(' [1] - 不要');
      const answer = await era.input();
      if (answer === 0) {
        chara(arg0).invasion.状态 = 5;
        if (enemy !== 0 && (era.get(`cflag:${enemy}:500`) || 0) === 4) {
          chara(enemy).invasion.状态 = 5;
          era.print(`${name_of(arg0)}和${name_of(enemy)}各自使用了回城魔法。`);
        } else {
          era.print(`${name_of(arg0)}使用了回城魔法。`);
        }
      }
      return 0;
    }
    era.println();
  }

  // === 工作活动（:1184-1197）===
  await spy_battle(arg0, leader, rand_n);

  // 仲間A / 仲間B（魔王でない、かつ潜入奴隷でもない場合）
  const sidea = era.get(`cflag:${leader}:531`) || 0;
  if (
    sidea > 0 &&
    sidea !== arg0 &&
    (era.get(`cflag:${sidea}:500`) || 0) !== 4
  ) {
    await spy_battle(arg0, sidea, rand_n);
  }
  const sideb = era.get(`cflag:${leader}:532`) || 0;
  if (
    sideb > 0 &&
    sideb !== arg0 &&
    (era.get(`cflag:${sideb}:500`) || 0) !== 4
  ) {
    await spy_battle(arg0, sideb, rand_n);
  }
  return 0;
}

/**
 * @DUNGEON_BATTLE2_PARTY（:2-510）：勇者与元勇者（迎击方）的战斗主流程。
 *
 * @param {number} arg0 迎击队长（原作 ARG:0）
 * @param {(n: number) => number} [rand] RAND:N 随机源（缺省均匀随机）
 * @returns {Promise<{result: number, loser: number}>} 原作 RETURN 与全局 B：
 *   result 1 = 迎击方败北（CFLAG:1 == 0 或 9）/ 2 = 勇者侧败者（loser =
 *   败者号，@DUNGEON :569 的 B）/ 0 = 无事结束。loser 仅在 result == 2 时
 *   有意义（显式传参替代原作全局 B 换手，#5 决议第六条）
 */
async function dungeon_battle2_party(arg0, rand) {
  const rand_n = rand ?? default_rand;
  const settings = era.get('flag:5') || 0;

  // === 潜入中は直接戦闘ではなく工作活動（:24-27）===
  if ((era.get(`cflag:${arg0}:500`) || 0) === 4) {
    await dungeon_spy(arg0, rand_n);
    return { result: 0, loser: 0 };
  }

  // === 対象選択フェイズ（:29-49；リーダーのみを探す）===
  let enemy = 0;
  for (const count of era.getAddedCharacters()) {
    if (count === 0 || chara(count).invasion.状态 !== 2) {
      continue;
    }
    if (chara(arg0).dungeon.侵攻阶层 !== chara(count).dungeon.侵攻阶层) {
      continue;
    }
    if ((era.get(`cflag:${count}:530`) || 0) === 1) {
      // 仲間になっているフラグON
      continue;
    }
    if (rand_n(3) === 0) {
      continue;
    }
    enemy = count;
    break;
  }

  // === 対象選択失敗時（:51-62）===
  if (enemy === 0) {
    if ((settings & 32) !== 0) {
      if ((era.get(`cflag:${arg0}:507`) || 0) === 1) {
        era.print(`${name_of(arg0)}专心恢复体力`);
      } else {
        era.print(`${name_of(arg0)}在寻找勇者，但没有找到`);
      }
      await era.waitAnyKey();
    }
    return { result: 0, loser: 0 };
  }

  // === 戦闘開始前の準備（:64-100）===
  const sidea = era.get(`cflag:${enemy}:531`) || 0;
  const sideb = era.get(`cflag:${enemy}:532`) || 0;

  // 奴隷を援護する怪物（:71-86；前三列，恒 boss 化一只）
  for (let turn = 0; turn < 3; turn += 1) {
    let local = (chara(arg0).dungeon.侵攻阶层 - 1) * 10 + 100 + rand_n(5);
    if (chara(arg0).dungeon.侵攻阶层 >= 8 && rand_n(10) === 0) {
      const monid = 191 + rand_n(3);
      if ((era.get(`item:${monid}`) || 0) > 0) {
        local = monid;
      }
    }
    monster_data(local, turn, arg0, -1, -1, rand_n);
    // ボス化する / 1匹だけにする
    e_set(turn * 100 + 8, 1);
    e_set(turn * 100 + 99, 1);
  }

  if ((settings & 32) !== 0) {
    era.print('*发生了战斗！*');
    await era.waitAnyKey();
    era.drawLine();
  }

  // 弾の補充（:93-100；四方各 7）
  era.set(`cflag:${arg0}:571`, 7);
  era.set(`cflag:${enemy}:571`, 7);
  if (sidea > 0) {
    era.set(`cflag:${sidea}:571`, 7);
  }
  if (sideb > 0) {
    era.set(`cflag:${sideb}:571`, 7);
  }

  // === 先制攻撃フェイズ（:102-170）===
  // 奴隷側の先制（:105-138；現在奴隷同士でパーティーを組まないため
  // 最初の一人で抜ける——:136 的 BREAK）
  for (let turn = 0; turn < 3; turn += 1) {
    let atker;
    if (turn === 0) {
      atker = arg0;
    } else if (turn === 1) {
      atker = era.get(`cflag:${arg0}:531`) || 0;
    } else if (turn === 2) {
      atker = era.get(`cflag:${arg0}:532`) || 0;
    } else {
      break;
    }
    if (atker <= 0) {
      continue;
    }
    // 対象決定（现在の仕様ではリーダーのみを狙う）
    const defer = battle.select_atker(enemy, turn);
    era_flag.target = defer; // B = RESULT（原作全局 B）
    if (
      (era.get(`talent:${atker}:252`) || 0) === 1 &&
      (era.get(`cflag:${atker}:503`) || 0) & 32
    ) {
      // 先制不可
      if ((settings & 32) !== 0) {
        era.print('因为障碍物的阻挡未能先发制人……');
      }
    } else if ((era.get(`talent:${atker}:252`) || 0) === 1) {
      await duel_attack(atker, 2, defer, 1, rand_n);
    }
    break; // :136
  }

  // 勇者側の先制（:141-170）
  for (let turn = 0; turn < 3; turn += 1) {
    let defer;
    if (turn === 0) {
      defer = enemy;
    } else if (turn === 1) {
      defer = era.get(`cflag:${enemy}:531`) || 0;
    } else if (turn === 2) {
      defer = era.get(`cflag:${enemy}:532`) || 0;
    } else {
      break;
    }
    if (defer <= 0) {
      continue;
    }
    // SELECT_SLAVE 的注释段（:155-160）——现在の仕様では奴隷配下が盾に
    // なるためコメントアウト，结构保留不移植
    if (
      (era.get(`talent:${defer}:252`) || 0) === 1 &&
      (era.get(`cflag:${defer}:503`) || 0) & 32
    ) {
      if ((settings & 32) !== 0) {
        era.print('因为障碍物的阻挡未能先发制人……');
      }
    } else if ((era.get(`talent:${defer}:252`) || 0) === 1) {
      era_flag.target = defer;
      await battle.enemy_attack(defer, 2, rand_n);
    }
  }

  // === メインフェイズ（:174-471）===
  for (let turn = 0; turn < 20; turn += 1) {
    // 時間切れ（:176-181）
    if (turn > 15) {
      if ((settings & 32) !== 0) {
        era.print(`${name_of(arg0)}逃跑了………`);
      }
      chara(arg0).dungeon.气力 -= rand_n(30);
      break;
    }

    // パラメータ表示（:183-333；FLAG:5 & 32，近似同 BATLLE）
    if ((settings & 32) !== 0) {
      era.drawLine();
      era.print(` ${name_of(arg0)}`);
      era.print(
        ` HP ${chara(arg0).dungeon.体力}/${era.get(`maxbase:${arg0}:0`) || 0}`,
      );
      era.print(
        ` 气 ${chara(arg0).dungeon.气力}/${era.get(`maxbase:${arg0}:1`) || 0}`,
      );
      era.print(` 攻 ${chara(arg0).dungeon.攻击力}`);
      era.print(` 防 ${chara(arg0).dungeon.防御力}`);
      await era.waitAnyKey();
      battle.monster_list();
      await era.waitAnyKey();
      era.print('--- VS ---');
      await era.waitAnyKey();
      era.drawLine();
      era.print(
        ` ${name_of(enemy)}${sidea > 0 ? `  | ${name_of(sidea)}` : ''}${sideb > 0 ? `  | ${name_of(sideb)}` : ''}`,
      );
      era.print(
        ` HP ${chara(enemy).dungeon.体力}/${era.get(`maxbase:${enemy}:0`) || 0}${sidea > 0 ? `  | HP ${chara(sidea).dungeon.体力}/${era.get(`maxbase:${sidea}:0`) || 0}` : ''}${sideb > 0 ? `  | HP ${chara(sideb).dungeon.体力}/${era.get(`maxbase:${sideb}:0`) || 0}` : ''}`,
      );
      era.print(
        ` 气 ${chara(enemy).dungeon.气力}/${era.get(`maxbase:${enemy}:1`) || 0}${sidea > 0 ? `  | 气 ${chara(sidea).dungeon.气力}/${era.get(`maxbase:${sidea}:1`) || 0}` : ''}${sideb > 0 ? `  | 气 ${chara(sideb).dungeon.气力}/${era.get(`maxbase:${sideb}:1`) || 0}` : ''}`,
      );
      era.print(
        ` 攻 ${chara(enemy).dungeon.攻击力}${sidea > 0 ? `  | 攻 ${chara(sidea).dungeon.攻击力}` : ''}${sideb > 0 ? `  | 攻 ${chara(sideb).dungeon.攻击力}` : ''}`,
      );
      era.print(
        ` 防 ${chara(enemy).dungeon.防御力}${sidea > 0 ? `  | 防 ${chara(sidea).dungeon.防御力}` : ''}${sideb > 0 ? `  | 防 ${chara(sideb).dungeon.防御力}` : ''}`,
      );
      era.drawLine();
    }

    // 戦闘を行うキャラの選択（:335-345）
    const defer = battle.select_atker(enemy, turn);
    let atker = select_slave(arg0, turn);
    era_flag.target = atker; // A = RESULT

    if (atker >= 99) {
      // :347-391 怪物が選択された場合、怪物戦闘と同じ処理になる
      atker = defer;
      era_flag.target = defer; // A = DEFER = 勇者
      // 先攻後攻決定
      const speed = battle.speed_plus(defer, rand_n);
      let interrupted = false;
      if (speed > 0) {
        if ((await battle.enemy_attack(atker, 0, rand_n)) === 0) {
          if ((await battle.monster_attack(atker, turn, rand_n)) === 999) {
            interrupted = true;
          }
        } else if ((await battle.enemy_attack(atker, 0, rand_n)) === 999) {
          interrupted = true;
        }
      } else {
        const r1 = await battle.monster_attack(atker, turn, rand_n);
        if (r1 === 0) {
          if ((await battle.enemy_attack(atker, 1, rand_n)) === 999) {
            interrupted = true;
          }
        } else if (r1 === 999) {
          interrupted = true;
        }
      }
      if (interrupted) {
        if ((settings & 32) !== 0) {
          era.print('战斗中断');
        }
        break;
      }

      // ATKER = DEFER = 勇者 / ARG:0 = 奴隶
      const dc = death_check2(arg0, atker);
      if (dc === 2) {
        if ((settings & 1) !== 0) {
          await pc_ryou(arg0, atker);
        }
        break;
      }
      if (dc === 1) {
        break;
      }
      continue;
    }

    // === 配下怪物データの取得·怪物の攻撃（:393-401）===
    if ((era.get(`cflag:${atker}:570`) || 0) >= 100) {
      monster_data(
        era.get(`cflag:${atker}:570`) || 0,
        3,
        atker,
        -1,
        -1,
        rand_n,
      );
      await slave_monster_attack_to_enemy(atker, defer);
    }
    if ((era.get(`cflag:${defer}:570`) || 0) >= 100) {
      monster_data(
        era.get(`cflag:${defer}:570`) || 0,
        4,
        -1,
        defer,
        -1,
        rand_n,
      );
      await slave_monster_attack_to_slave(atker, defer);
    }

    if ((settings & 32) !== 0) {
      era.drawLine();
    }

    // === 先攻後攻決定（:412-459；ATKER = 奴隷 / DEFER = 勇者）===
    const speed = speed_plus2(atker, defer, rand_n);
    let interrupted = false;
    if (speed > 0) {
      // 奴隷先攻
      await duel_attack(atker, 0, defer, 1, rand_n);
      const dc = death_check2(atker, defer);
      if (dc === 2) {
        if ((settings & 1) !== 0) {
          await pc_ryou(atker, defer);
        }
        break;
      }
      if (dc === 1) {
        break;
      }
      // 勇者後攻（SIF RESULT == 0——DEATH_CHECK2 返回 0 时才打）
      if (dc === 0) {
        if ((await duel_attack(defer, 1, atker, 0, rand_n)) === 999) {
          interrupted = true;
        }
      }
      if (interrupted) {
        if ((settings & 32) !== 0) {
          era.print('战斗中断');
        }
        break;
      }
    } else {
      // 勇者先攻
      await duel_attack(defer, 0, atker, 0, rand_n);
      const dc = death_check2(atker, defer);
      if (dc === 2) {
        if ((settings & 1) !== 0) {
          await pc_ryou(atker, defer);
        }
        break;
      }
      if (dc === 1) {
        break;
      }
      // 奴隷後攻
      if (dc === 0) {
        if ((await duel_attack(atker, 1, defer, 1, rand_n)) === 999) {
          interrupted = true;
        }
      }
      if (interrupted) {
        if ((settings & 32) !== 0) {
          era.print('战斗中断');
        }
        break;
      }
    }

    // :461-468 循环尾的再判定
    const dc = death_check2(atker, defer);
    if (dc === 2) {
      if ((settings & 1) !== 0) {
        await pc_ryou(atker, defer);
      }
      break;
    }
    if (dc === 1) {
      break;
    }
    chara(atker).dungeon.气力 -= rand_n(20);
    chara(defer).dungeon.气力 -= rand_n(20);
  }

  // === 装備の回復（:473-484；四方）===
  await weapon_restore(arg0);
  await weapon_restore(enemy);
  let mate = era.get(`cflag:${enemy}:531`) || 0;
  if (mate > 0) {
    await weapon_restore(mate);
  }
  mate = era.get(`cflag:${enemy}:532`) || 0;
  if (mate > 0) {
    await weapon_restore(mate);
  }

  // === 返り値（:486-510；B = 败者号，显式传出）===
  era_flag.target = arg0; // A = ARG:0
  if (chara(arg0).invasion.状态 === 0) {
    era.print(`${name_of(arg0)}败给了勇者，回到了魔王身边。`);
    return { result: 1, loser: 0 };
  }
  if (chara(arg0).invasion.状态 === 9) {
    era.print(`${name_of(arg0)}败给了勇者，成为了狂王的东西。`);
    return { result: 1, loser: 0 };
  }
  if (chara(enemy).invasion.状态 === 0) {
    return { result: 2, loser: enemy };
  }
  if (sidea > 0 && chara(sidea).invasion.状态 === 0) {
    return { result: 2, loser: sidea };
  }
  if (sideb > 0 && chara(sideb).invasion.状态 === 0) {
    return { result: 2, loser: sideb };
  }
  return { result: 0, loser: 0 };
}

module.exports = {
  STUBBED_CALLS,
  name_of,
  clitoris_word,
  select_slave,
  speed_plus2,
  attack_chara_extra_dmg_battle2,
  duel_attack,
  slave_monster_attack_to_enemy,
  slave_monster_attack_to_slave,
  death_check2,
  spy_battle,
  dungeon_spy,
  dungeon_battle2_party,
};
