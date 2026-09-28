/**
 * @file 队伍战斗（issue #175，阶段 3 H6）：勇者队伍 vs 怪物。
 *
 * 勇者会掉 HP/气力、会投降（death_check 写 CFLAG:1 = 0）、run_dungeon
 * 主循环据此刻 BREAK 并走 get_down_enemy。
 * 说明（有意偏离，均注明依据）：
 *   - **SAVESTR 无引擎通道**（#171 钉下）：名字承载一律 `callname:${id}:-1`
 *     （#5 决议），统一走本文件 name_of；
 *   - ere 无全局 RAND 序列（#117），随机经注入的 rand 掷出（run_dungeon
 *     第二参先例）。**死赋值处的 RAND 消费照掷**（ATK_TURN =
 *     RAND:3 之后无读者）——PRNG 序列逐位确定是种子化回归测试的
 *     前提（#173 mulberry32 先例）；
 *   - 全局 A/B/C/X/Y/Z/W/TURN 的换手改显式传参与返回值（#5 决议
 *     第六条）：A/ATKER → atker 参数，W 数组 → equip-lookup 的装备记录
 *     对象；#343 起 MAGIC 收到显式施法者、目标列头和 D:20 共享槽；
 *   - **E 数组走引擎变量**（yml/E.yml，ere/dungeon/monster-data.js 的
 *     e_get/e_set）；
 *   - PRINT/PRINTFORM 不换行、PRINTL/PRINTFORML 换行：同一显示行
 *     的拼接（技能标签 + 攻击演出 + 结果）归并为一次 era.print（引擎
 *     print 每调用一行，dungeon.js 先例）。skill_extra_bonus 的行内
 *     PRINTFORM 因此改为**返回标签串**，由攻击函数拼行；
 *   - SETFONT/SETCOLORBYNAME/BAR/STRLENS 对齐、立绘 HTML_PRINT 无 era
 *     通道或按需后补（#68 起 printProgress 可代 BAR，参数显示段以
 *     文本近似并注明）：玩家可见的行序与文案完全一致，字宽对齐与配色不做；
 *   - FLAG:5 & 32（战斗日志显示）的显示开关逐处保留——夹具与 e2e 的
 *     FLAG:5 缺省 0，战斗数值行为不依赖该位；
 *   - 逐段注释保留原样（日文分支标记不译），行号引用已删除。
 */

'use strict';

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { pad_left } = require('#/utils/display-width'); // #577：对齐补位 NBSP 化
const { chara } = require('#/facade/chara');
const { DispatchFamily } = require('#/system/dispatch/dispatch-family');
const { emit } = require('#/system/event/registry');
const {
  attack_koujo: speak_attack_koujo,
  victory_koujo: speak_victory_koujo,
} = require('#/kojo/kojo-system');
const { equip_check, equip_powerup } = require('#/system/equip/equip-check');
const { equip_database } = require('#/system/equip/equip-lookup');
const {
  e_get,
  e_set,
  monstername,
  monster_name,
} = require('#/dungeon/monster-data');
const magic_mod = require('#/dungeon/magic');
const monster_skill_mod = require('#/dungeon/monster-skill');
// H9（#178）任务真身：QUEST_BATTLE_SET / RESULT_QUEST 经模块对象引用
// （对比测试可替换导出）。dungeon-quest 回引本文件的 CAMPAIGN_MONSTER_LIST
// 走函数内延迟 require——两侧只一处顶层引用，无环（dungeon.js ↔
// battle_mod 同构）。
const quest_mod = require('#/dungeon/dungeon-quest');
const {
  select_benki_menu,
  name_benki_menu,
  get_exp_benki_menu,
} = require('#/system/train/benki');

/**
 * CAMPAIGN_MONSTER_LIST_{FLAG:400} 族：战役迷宫的出现怪物表（#469，
 * 决议 #7）。键是 FLAG:400，声明空间 {1}（page-campaign.js 文件头同款
 * 依据）；实现在 ere/page/page-campaign-1.js 注册。whenMissing
 * 预置 190（骸骨缺省）。
 */
const campaign_monster_list_family = new DispatchFamily(
  'CAMPAIGN_MONSTER_LIST',
  [1],
);

/** 名字承载（#5 决议；savestr 通道不存在，文件头） */
function name_of(cid) {
  return era.get(`callname:${cid}:-1`) ?? '';
}

/** RAND:N（0..N-1）的缺省实现 */
function default_rand(n) {
  return Math.floor(Math.random() * n);
}

/** SHE(ARG) 代词（三行纯函数，已内联） */
function she(cid) {
  return (era.get(`talent:${cid}:122`) || 0) !== 0 ? '他' : '她';
}

// —— 跨域转发与缺省实现（真身在其它域，经模块对象引用避免循环依赖）——

// quest_battle_set / result_quest：#178（H9）
// 起为真身 ere/dungeon/dungeon-quest.js 的 quest_battle_set / result_quest
// （调用点经模块对象 quest_mod 引用，见文件头）。

/**
 * CAMPAIGN_MONSTER_LIST：战役迷宫的出现
 * 怪物表。RESULT 预置 190（骸骨缺省）。
 * @param {number} floor 阶层
 * @param {(n: number) => number} [rand] RAND:N 随机源，透传给
 *   CAMPAIGN_MONSTER_LIST_1 的 DICE = RAND:3（缺省均匀随机，与调用方
 *   dungeon_party_battle 共用同一注入源，保持 PRNG 序列对齐）
 * @returns {Promise<number>} 怪物 ID（FLAG:400 < 1 时恒 190）
 */
async function campaign_monster_list(floor, rand) {
  const active = era_flag.hero_campaign_active;
  if (active < 1) {
    return 190;
  }
  return campaign_monster_list_family.call(active, {
    whenMissing: 190,
    args: [floor, rand],
  });
}

/**
 * before_autotrain（#508 起真身）：
 * 自动调教前置——SOURCE / delta 清零。真身在 ere/event/event-autotrain.js，
 * 调用点直调（浏览器/测试可替换导出，同 SOURCE_CHECK_AUTO 一族的先例）。
 * @returns {Promise<number>} 恒 return 0（调用点不消费）
 */
async function before_autotrain() {
  return require('#/event/event-autotrain').before_autotrain();
}

/**
 * source_check_auto（调教域工单，#461 起真身）：自动调教结算。调用点同
 * before_autotrain 一族，调用点曾散见迷宫域四文件）
 * 事件注册表——本函数只发事件，不重复实现调度逻辑；真身见
 * ere/event/source-check.js 的 on('SOURCE_CHECK_AUTO', …)。
 *
 * #508：结算后补一次 `era.nextTurnInTrain()`——这是调教回合循环里 SOURCE_CHECK
 * 之后那一步（UPCHECK 的 ere 等价物，train-loop.js:70-74）在迷宫路径上的
 * 对应物。本移植把 NOWEX→EX 的合并交给引擎的 nextTurnInTrain（source-check.js
 * 文件头的职责划分），而迷宫路径不经过回合循环，不补这一步的话 EX:0-4
 * （绝顶次数，JUEL_CHECK_MAIN 的珠加成读它）在 endTrain 删表时丢掉。
 * @returns {Promise<void>} 无 RESULT 消费
 */
async function source_check_auto() {
  await emit('SOURCE_CHECK_AUTO');
  era.nextTurnInTrain();
}

/**
 * attack_koujo：攻击时的口上台词。分发层在
 * kojo-system.js；未注册性格静默（try_kojo 落空）。
 * @param {number} [cid] 攻击者
 * @returns {Promise<void>} 无 RESULT 消费
 */
async function attack_koujo(cid) {
  await speak_attack_koujo(cid);
}

/**
 * victory_koujo：胜利时的口上台词。分发层在
 * kojo-system.js；未注册性格静默（try_kojo 落空）。
 * @param {number} [cid] 胜者（全局 A = ATKER）
 * @returns {Promise<void>} 无 RESULT 消费
 */
async function victory_koujo(cid) {
  await speak_victory_koujo(cid);
}

/**
 * victory_ryouzyoku（#182 H13）：胜利后的
 * 凌辱事件（「間違いが起こる」）。真身在 ere/kojo/kojo-dungeon-ravish.js，
 * 经模块对象调用（测试可替换导出断言被调，#184 先例）。
 * @param {number} atker 胜者
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<void>} 无 RESULT 消费
 */
async function victory_ryouzyoku(atker, rand) {
  const mod = require('#/kojo/kojo-dungeon-ravish');
  await mod.victory_ryouzyoku(atker, rand);
}

/**
 * ryouzyoku（#182 H13）：败者的凌辱事件
 * （FLAG:5 & 1 配置位）。真身在 ere/kojo/kojo-dungeon-ravish.js，经模块
 * 对象调用。
 * @param {number} atker 败北勇者
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<void>} 无 RESULT 消费
 */
async function ryouzyoku(atker, rand) {
  const mod = require('#/kojo/kojo-dungeon-ravish');
  await mod.ryouzyoku(atker, rand);
}

/**
 * monster_list：怪物清单打印（防御三列）。
 * @returns {void} 恒 return 0
 */
function monster_list() {
  // REPEAT 3（B 从 0 起 += 100——列头 0/100/200）
  for (let b = 0; b < 300; b += 100) {
    const id = e_get(b);
    const lv = e_get(b + 1);
    const atk = e_get(b + 2);
    const def = e_get(b + 3);
    const num = e_get(b + 99);
    const boss = e_get(b + 8);
    if (boss === 1 && num > 0) {
      // 『%ITEMNAME:ID%的boss』
      era.print(
        `『${era.get(`itemname:${id}`) ?? ''}的boss』 LV${lv} ${atk}/${def}`,
      );
    } else if (num <= 0) {
      // 尸体
      era.print(`${era.get(`itemname:${id}`) ?? ''}的尸体`);
    } else {
      // %MONSTERNAME(ID)%（改造前缀 + 名 + 兵种）
      era.print(
        ` ${pad_left(String(num), 2)}只${monstername(id)} LV${lv} ${atk}/${def}`,
      );
    }
  }
}

/**
 * select_atker：选出本回合攻击的勇者。
 * @param {number} arg0 队长
 * @param {number} arg1 回合数（函数内 + 1 后取模）
 * @returns {number} 攻击者角色号
 */
function select_atker(arg0, arg1) {
  let member = 1;
  arg1 += 1;

  const sidea = era.get(`cflag:${arg0}:531`) || 0;
  if (sidea > 0) {
    member += 1;
  }
  const sideb = era.get(`cflag:${arg0}:532`) || 0;
  if (sideb > 0) {
    member += 1;
  }

  const rest = arg1 % member;
  if (rest === 0) {
    return arg0;
  }
  if (rest === 1) {
    // 仲間A 空栏时顺看仲間B
    if (sidea > 0) {
      return sidea;
    }
    if (sideb > 0) {
      return sideb;
    }
  } else if (rest === 2) {
    if (sideb > 0) {
      return sideb;
    }
  }
  return arg0; // 念のため
}

/**
 * speed_plus：先攻后攻判定（正 = 勇者先攻）。
 * @param {number} atker 攻击者
 * @param {(n: number) => number} rand RAND:N 随机源
 * @returns {number} SPEED_X - SPEED_Y（正 = 勇者侧快）
 */
function speed_plus(atker, rand) {
  let speed_x = rand(6);
  let speed_y = rand(6);
  // 速度補正：三列防御怪物的速度合计
  for (let count = 0; count < 3; count += 1) {
    speed_y += e_get(count * 100 + 4);
  }
  // 奇袭（243）
  if ((era.get(`talent:${atker}:243`) || 0) === 1) {
    speed_x += 1;
  }
  // 恶魔翅膀（245）
  if ((era.get(`talent:${atker}:245`) || 0) === 1) {
    speed_x += 1;
  }
  // 迅速（258）
  if ((era.get(`talent:${atker}:258`) || 0) === 1) {
    speed_x += 1;
  }
  // 霍比特族的加速（种族 314 == 10）
  if ((era.get(`talent:${atker}:314`) || 0) === 10) {
    speed_x += 1;
  }
  // 矮人族的减速（== 11）
  if ((era.get(`talent:${atker}:314`) || 0) === 11) {
    speed_x -= 1;
  }
  // 史莱姆的减速（种族2 319 == 2）
  if ((era.get(`talent:${atker}:319`) || 0) === 2) {
    speed_x -= 2;
  }
  // 触手的减速（== 5）
  if ((era.get(`talent:${atker}:319`) || 0) === 5) {
    speed_x -= 1;
  }
  // 妖精的加速（== 6）
  if ((era.get(`talent:${atker}:319`) || 0) === 6) {
    speed_x += 1;
  }
  // 巨人的减速（== 7）
  if ((era.get(`talent:${atker}:319`) || 0) === 7) {
    speed_x -= 1;
  }
  // 兽类的加速（137；迅速合计 +2）
  if ((era.get(`talent:${atker}:137`) || 0) === 1) {
    speed_x += 1;
  }
  // 马的加速（319 == 12；迅速、FURRY 合计 +3）
  if ((era.get(`talent:${atker}:319`) || 0) === 12) {
    speed_x += 1;
  }
  // 装備効果（速度UP = 3 / 速度減 = 12）
  speed_x += equip_check(atker, 3);
  speed_x -= equip_check(atker, 12);
  return speed_x - speed_y;
}

/**
 * skill_extra_bonus：战斗前发动的技能加成。
 * 行内 PRINTFORM（技能标签）改返回字符串，由攻击函数拼进行内
 * （文件头「同一显示行归并」）。
 * @param {number} arg0 攻击者
 * @param {(n: number) => number} rand RAND:N 随机源
 * @returns {string} 技能标签串（无技能为空串）
 */
function skill_extra_bonus(arg0, rand) {
  if ((era.get(`cflag:${arg0}:9`) || 0) < 100) {
    // 等级 100 起
    return '';
  }
  let out = '';

  if ((era.get(`talent:${arg0}:240`) || 0) === 1 && rand(100) < 60) {
    // 戦術
    const local = 10;
    out += `[战术斗志！ 攻击力+${local}％！`;
    chara(arg0).dungeon.攻击力 = Math.floor(
      (chara(arg0).dungeon.攻击力 * (100 + local)) / 100,
    );
    const def_up = Math.floor((era.get(`cflag:${arg0}:9`) || 0) / 5) + 10;
    out += ` 防御力+${def_up}！]`;
    chara(arg0).dungeon.防御力 += def_up;
  }

  if ((era.get(`talent:${arg0}:241`) || 0) === 1 && rand(100) < 40) {
    // 魔術
    const local = 10;
    out += `[魔术冥想！ 气力回复${local}％！]`;
    const max_wp = era.get(`maxbase:${arg0}:1`) || 0;
    const gain = Math.floor((max_wp * local) / 100);
    chara(arg0).dungeon.气力 = Math.min(
      chara(arg0).dungeon.气力 + gain,
      max_wp,
    );
  }

  if ((era.get(`talent:${arg0}:242`) || 0) === 1 && rand(100) < 40) {
    // 法術
    const local = 8;
    out += `[法术再生！ HP回复${local}％！]`;
    const max_hp = era.get(`maxbase:${arg0}:0`) || 0;
    const gain = Math.floor((max_hp * local) / 100);
    chara(arg0).dungeon.体力 = Math.min(
      chara(arg0).dungeon.体力 + gain,
      max_hp,
    );
  }

  if ((era.get(`talent:${arg0}:243`) || 0) === 1 && rand(100) < 20) {
    // 奇襲
    const local = 60;
    out += `[奇袭必杀！ 攻击力+${local}％]`;
    chara(arg0).dungeon.攻击力 = Math.floor(
      (chara(arg0).dungeon.攻击力 * (100 + local)) / 100,
    );
  }

  if ((era.get(`talent:${arg0}:249`) || 0) === 1 && rand(100) < 60) {
    // 鉄壁
    const local = Math.floor((era.get(`cflag:${arg0}:9`) || 0) / 10) + 20;
    out += `[铁壁防御！ 防御力+${local}！]`;
    chara(arg0).dungeon.防御力 += local;
  }

  if ((era.get(`talent:${arg0}:250`) || 0) === 1 && rand(100) < 20) {
    // 呪術
    const local = Math.floor((era.get(`cflag:${arg0}:9`) || 0) / 3) + 60;
    out += `[咒术结界！ 防御力+${local}！]`;
    chara(arg0).dungeon.防御力 += local;
  }

  if ((era.get(`talent:${arg0}:251`) || 0) === 1 && rand(100) < 60) {
    // 忍術：属性按能力者素质固定（RAND:5 掷点被覆盖——
    // LOCAL:1 = RAND:5 在有能力者时立即改写；ere 侧照掷保持 PRNG 序列）
    let kind = rand(5);
    if ((era.get(`talent:${arg0}:275`) || 0) !== 0) {
      kind = 0; // 火之能力者
    } else if ((era.get(`talent:${arg0}:276`) || 0) !== 0) {
      kind = 1; // 冰之能力者
    } else if ((era.get(`talent:${arg0}:277`) || 0) !== 0) {
      kind = 2; // 雷之能力者
    } else if ((era.get(`talent:${arg0}:278`) || 0) !== 0) {
      kind = 3; // 光之能力者
    } else if ((era.get(`talent:${arg0}:279`) || 0) !== 0) {
      kind = 4; // 暗之能力者
    }
    const local = Math.floor((era.get(`cflag:${arg0}:9`) || 0) / 10) + 20;
    if (kind === 0) {
      out += `[忍术火遁！ 攻击力+${local}！]`;
      chara(arg0).dungeon.攻击力 += local;
    } else if (kind === 1) {
      out += `[忍术冰遁！ 防御力+${local}！]`;
      chara(arg0).dungeon.防御力 += local;
    } else if (kind === 2) {
      out += `[忍术雷遁！ 攻击力+${local}！]`;
      chara(arg0).dungeon.攻击力 += local;
    } else if (kind === 3) {
      out += `[忍术光遁！ 防御力+${local}！]`;
      chara(arg0).dungeon.防御力 += local;
    } else if (kind === 4) {
      out += `[忍术暗遁！ 攻击力+${local}！]`;
      chara(arg0).dungeon.攻击力 += local;
    }
  }

  if ((era.get(`talent:${arg0}:252`) || 0) === 1 && rand(100) < 60) {
    // 先制
    const local = 20;
    out += `[先制打击！ 攻击力+${local}％！]`;
    chara(arg0).dungeon.攻击力 = Math.floor(
      (chara(arg0).dungeon.攻击力 * (100 + local)) / 100,
    );
  }
  return out;
}

/**
 * attack_chara_extra_dmg：角色不依赖装备的给伤害补正。
 * @param {number} arg0 攻击者
 * @param {number} dmg 伤害（DMG）
 * @param {number} arg1 先后手（0 先手 / 1 后手 / 2 先制）
 * @returns {number} 补正后的伤害
 */
function attack_chara_extra_dmg(arg0, dmg, arg1) {
  // 先手有利（+20%）
  if (arg1 === 0) {
    dmg += Math.floor(dmg / 5);
  }
  // 先制打撃（×2）
  if (arg1 === 2) {
    dmg *= 2;
  }

  // 攻撃減少デバフ（CFLAG:681）
  const debuff = era.get(`cflag:${arg0}:681`) || 0;
  if (debuff > 50) {
    // 最大 50% 低下
    dmg = Math.floor(dmg / 2);
    era.set(`cflag:${arg0}:681`, debuff - (Math.floor(debuff / 10) + 1));
  } else if (debuff > 0) {
    dmg = Math.floor((dmg * (100 - debuff)) / 100);
    era.set(`cflag:${arg0}:681`, debuff - (Math.floor(debuff / 10) + 1));
  }
  return dmg;
}

/**
 * defence_chara_extra_dmg：角色不依赖装备的受伤害补正。
 * HP 的实际扣减（BASE:0 -= DMG）在此发生。
 * @param {number} arg0 被攻击者
 * @param {number} dmg 伤害（DMG）
 * @param {(n: number) => number} rand RAND:N 随机源
 * @returns {number} 补正后的伤害（0 = 闪避/无效）
 */
function defence_chara_extra_dmg(arg0, dmg, rand) {
  const settings = era.get('flag:5') || 0;
  // ミス処理（命中減衰 HIT）
  let hit = 0;
  // 忍術（251）による回避補正
  if ((era.get(`talent:${arg0}:251`) || 0) === 1) {
    hit += 15;
  }
  // 透明化（CFLAG:503 位 7）
  if (((era.get(`cflag:${arg0}:503`) || 0) >> 7) & 1) {
    hit += 15;
  }
  // 英雄（位 8）による回避補正
  if (((era.get(`cflag:${arg0}:503`) || 0) >> 8) & 1) {
    hit += 5;
  }
  // 回避力キャップ
  if (hit > 60) {
    hit = 60;
  }
  if (rand(100) - hit < 0) {
    if ((settings & 32) !== 0) {
      era.print('勇者轻巧地闪开了。');
    }
    return 0;
  }

  // 防御減少デバフ（CFLAG:680）：DEBUFF% 放大受到的伤害（>50 时封顶 +50%），
  // 每回合衰减 floor(DEBUFF/10)+1
  const debuff = era.get(`cflag:${arg0}:680`) || 0;
  if (debuff > 50) {
    // 最大 50% ダメージ上昇
    dmg += Math.floor(dmg / 2);
    era.set(`cflag:${arg0}:680`, debuff - (Math.floor(debuff / 10) + 1));
  } else if (debuff > 0) {
    dmg = Math.floor((dmg * (100 + debuff)) / 100);
    era.set(`cflag:${arg0}:680`, debuff - (Math.floor(debuff / 10) + 1));
  }

  // 防御値による直接軽減
  dmg -= chara(arg0).dungeon.防御力;
  // 防御力は 2/3 に減少していく
  chara(arg0).dungeon.防御力 = Math.floor(
    Math.floor(chara(arg0).dungeon.防御力 / 3) * 2,
  );

  if (dmg > 0) {
    // ダメージ量によって攻撃力も減少していく（最低 1）
    chara(arg0).dungeon.攻击力 -= Math.floor(dmg / 100) + 1;
    if (chara(arg0).dungeon.攻击力 < 0) {
      chara(arg0).dungeon.攻击力 = 1;
    }
    chara(arg0).dungeon.体力 -= dmg;
  }
  return dmg;
}

/**
 * 防御侧选择（enemy_attack 与 slave_monster_attack 的同构段）：扫三列
 * 数量槽，返回首个存活列的列头。全灭时 b 终值 300（< 400——REPEAT 3 只扫
 * 三列，B 到不了 400，全灭早退分支不可达，死分支留注释标注）。
 * @returns {{head: number, b: number}} head = 列头（0/100/200），b = 扫描终值
 */
function pick_defender_column() {
  let b = 0;
  for (let count = 0; count < 3; count += 1) {
    b += 99;
    if (e_get(b) > 0) {
      return { head: b - 99, b };
    }
    b += 1;
  }
  return { head: -1, b }; // b = 300（全灭；head 无意义）
}

/**
 * enemy_attack：勇者侧的攻击。
 * @param {number} arg0 勇者（A/TARGET 随之）
 * @param {number} arg1 先后手（0 先手 / 1 后手 / 2 先制）
 * @param {(n: number) => number} rand RAND:N 随机源
 * @returns {Promise<number>} 0 = 通常 / 1 = 怪物（列）全灭 /
 *   999 = 战斗中断（MAGIC 的 target_type 1 分支产物，当前战斗恒 0）
 */
async function enemy_attack(arg0, arg1, rand, move_ctx = {}) {
  const settings = era.get('flag:5') || 0;
  // 一応代入（A / TARGET）
  era_flag.target = arg0;

  // 肉便器用（PLAY_TYPE——#217 真身：以 RAND:DICE 抽调教指令号）
  const play_type = select_benki_menu(arg0, '战斗', rand);

  // PLAYER = 0——本函数无读者，不落变量（死赋值，注释留痕）

  // 肛门虫（TALENT:193）自动调教三连（CALL com13_auto——
  // 真身 ere/event/event-autotrain.js，#500）
  if ((era.get(`talent:${arg0}:193`) || 0) !== 0) {
    await before_autotrain();
    const { com13_auto } = require('#/event/event-autotrain');
    com13_auto();
    await source_check_auto();
  }

  // 防御侧の防御力を算出
  const { head: c, b: scan_b } = pick_defender_column();
  // 全滅時（B >= 400）——REPEAT 3 的扫描终值最多 300，不可达
  if (scan_b >= 400) {
    if ((settings & 32) !== 0) {
      era.print('负责防御的怪物全灭了………');
      await era.waitAnyKey();
    }
    return 1;
  }

  // B = C; CALL magic,1; C = B（magic 可重定向目标列——dungeon.js 转发不动目标）
  let target_head = c;
  if ((await magic_mod.magic(1, arg0, target_head, rand, move_ctx)) === 999) {
    return 999;
  }
  target_head = c;

  // 个体防御力（boss 时 RAND:(DEF*30)，先钳 1）
  let def = e_get(target_head + 3);
  const boss_flag = e_get(target_head + 8);
  if (boss_flag === 1) {
    if (def <= 0) {
      def = 1;
    }
    def = rand(Math.max(def * 30, 1));
  }
  // DEF += CFLAG:0:9——仕様変更にてオミット（注释态，不移植）

  // X = 群れの防御力（个体防 × 数量）
  const herd_def = def * e_get(target_head + 99);

  // 戦闘前発動スキル（行内标签串，文件头「同一显示行归并」）
  const skill_tag = skill_extra_bonus(arg0, rand);

  // セリフ（FLAG:5 & 32 显示开关；口上分发）
  if ((settings & 32) !== 0) {
    await attack_koujo(arg0);
  }

  // 装備品効果（伤害增加 = 1）
  const dmg_up = equip_check(arg0, 1);
  let dmg = chara(arg0).dungeon.攻击力; // DMG = CFLAG:11
  if (dmg_up > 0) {
    dmg *= dmg_up + 1;
  }

  // 武器（CFLAG:550；素手 → 40 号剑）
  const w = { 存储编号: era.get(`cflag:${arg0}:550`) || 0 };
  if (w.存储编号 <= 0) {
    w.存储编号 = 40;
    chara(arg0).chara.武装 = 40; // CFLAG:550（跨域写走门面，#71/#72）
  }

  // 查表与素质强化
  equip_database(w);
  equip_powerup(w, arg0);

  // 攻击演出（行内拼接：技能标签 + 攻击文，一次 print）
  const benki =
    (era.get(`talent:${arg0}:178`) || 0) !== 0 &&
    (era.get(`talent:${arg0}:281`) || 0) !== 0;
  if ((settings & 32) !== 0) {
    let line = skill_tag;
    if (benki) {
      // 作为肉便器的XX以（NAME_BENKI_MENU 的类型名）进行了诱惑！！
      // CALL name_benki_menu,PLAY_TYPE（#217 真身：返回类型名拼行）
      line += `作为肉便器的${name_of(arg0)}以${name_benki_menu(play_type)}进行了诱惑！！`;
    } else {
      line += `勇者${name_of(arg0)}使用${
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
          52: '指虎',
        }[w.识别号] ?? '剑'
      }${w.强度 !== 0 ? `+${w.强度}` : ''}攻击！！`;
    }
    era.print(line);
  }

  // ミス処理（失手率 W:11）
  if (rand(100) - w.失手率 < 0) {
    if ((settings & 32) !== 0) {
      if (benki) {
        era.print('肉便器遭到了痛骂');
      } else {
        era.print('勇者的攻击落空了……');
      }
    }
    return 0;
  }

  // 気力回復（W:12，钳上限）
  const max_wp = era.get(`maxbase:${arg0}:1`) || 0;
  chara(arg0).dungeon.气力 = Math.min(
    chara(arg0).dungeon.气力 + w.气力回复,
    max_wp,
  );

  // ダメージ変動（弹药 CFLAG:571）
  const bullets = era.get(`cflag:${arg0}:571`) || 0;
  if (bullets > 0) {
    dmg = Math.floor((dmg * w.伤害强化) / 100);
  } else if (w.弹尽行为 === 1) {
    dmg = Math.floor(dmg / 2);
  } else if (w.弹尽行为 === 2) {
    if ((settings & 32) !== 0) {
      if (benki) {
        era.print('套子用完了、什么都没发生！');
      } else {
        era.print('弹药用尽、只能干瞪眼！');
      }
    }
    return 0;
  }

  // CFLAG:571 -= W:10
  era.set(`cflag:${arg0}:571`, bullets - w.弹药消耗);

  // 畏怖・隷属処理（CFLAG:130 凌辱记忆怪物号 / 131 深度；无显示开关）
  const trauma_mon = era.get(`cflag:${arg0}:130`) || 0;
  const trauma_lv = era.get(`cflag:${arg0}:131`) || 0;
  if (trauma_mon === e_get(target_head) && trauma_lv > 5) {
    era.print(`${name_of(arg0)}受凌辱回忆的影响、似乎失去了反抗的意志……`);
    dmg = Math.floor(dmg / 10);
  } else if (trauma_mon === e_get(target_head) && trauma_lv >= 0) {
    era.print(`${name_of(arg0)}受凌辱回忆的影响、似乎恐慌不已……`);
    dmg = Math.floor((dmg * (6 - trauma_lv)) / 10);
  }

  // 連続攻撃処理（连击率 W:13）
  if (rand(100) - w.连击率 < 0) {
    if ((settings & 32) !== 0) {
      if (benki) {
        era.print('马上再来一次！');
      } else {
        era.print('勇者发出了迅捷的2连击！！');
      }
    }
    dmg *= 2;
    era.set(
      `cflag:${arg0}:571`,
      (era.get(`cflag:${arg0}:571`) || 0) - w.弹药消耗,
    );
  }

  // キャラ補正（与ダメージ）
  dmg = attack_chara_extra_dmg(arg0, dmg, arg1);

  // DEF = 敵残り防御力
  let rest_def = herd_def - dmg;

  // 先手かつ奇袭（TALENT:243）
  let surprise_tag = '';
  if (arg1 === 0 && (era.get(`talent:${arg0}:243`) || 0) === 1) {
    if ((settings & 32) !== 0) {
      surprise_tag = benki ? '似乎有点效果……' : '偷袭成功！！';
    }
    rest_def -= era.get(`cflag:${arg0}:9`) || 0;
  }

  // 追加効果（毒：W:6 位 0 且 RAND:2）
  let poison_tag = '';
  if (w.特殊 & 1 && rand(2)) {
    if (e_get(target_head + 9) & 1) {
      if ((settings & 32) !== 0) {
        poison_tag = benki ? '对手似乎着迷了…' : '毒素不断侵蚀！！';
      }
      rest_def -= dmg;
    } else {
      if ((settings & 32) !== 0) {
        poison_tag = benki ? '成功诱惑了对手！' : '毒素增加了！！';
      }
      e_set(target_head + 9, e_get(target_head + 9) + 1);
    }
  }

  // 耐性処理（火/冷/电：W:6 位 1/2/4 × E:(Y+10) 位 1/2/4）
  if (w.特殊 & 2) {
    rest_def +=
      e_get(target_head + 10) & 1 ? -Math.floor(dmg / 2) : Math.floor(dmg / 5);
  }
  if (w.特殊 & 4) {
    rest_def +=
      e_get(target_head + 10) & 2 ? -Math.floor(dmg / 2) : Math.floor(dmg / 5);
  }
  if (w.特殊 & 8) {
    rest_def +=
      e_get(target_head + 10) & 4 ? -Math.floor(dmg / 2) : Math.floor(dmg / 5);
  }

  const mon_id = e_get(target_head); // B = 敵識別番号

  if (rest_def <= 0) {
    // 列全灭
    // SIF 单行作用域：战斗日志开关只盖住第一行打印，怪物名与
    // 「全灭了」两行无条件出
    if (boss_flag === 0) {
      if ((settings & 32) !== 0) {
        era.print(`${surprise_tag}${poison_tag}勇者的攻击令`);
      }
      era.print(`${monster_name(mon_id)}全灭了………`);
    } else if (boss_flag === 1) {
      if ((settings & 32) !== 0) {
        era.print(
          `${surprise_tag}${poison_tag}勇者的攻击打倒了『${era.get(`itemname:${mon_id}`) ?? ''}的boss』………`,
        );
      }
    }
    // 経験値計算
    let get_exp = e_get(target_head + 1) + (era.get('cflag:0:9') || 0);
    get_exp *= e_get(target_head + 99);
    get_exp *= 3;
    // 死亡怪物計算（FLAG:63）
    era.set('flag:63', (era.get('flag:63') || 0) + e_get(target_head + 99));
    era.set(`exp:${arg0}:80`, (era.get(`exp:${arg0}:80`) || 0) + get_exp);
    await get_exp_benki_menu(arg0, play_type);
    // ITEM:E:C -= E:(C + 99)（怪物库存，钳 0）
    const stock = era.get(`item:${mon_id}`) || 0;
    era.set(`item:${mon_id}`, Math.max(stock - e_get(target_head + 99), 0));
    e_set(target_head + 99, 0);

    if ((settings & 32) !== 0) {
      await era.waitAnyKey();
    }
    return 1;
  }

  // DEF = CFLAG:11 / E:(C+3)——下一行立即覆盖（死赋值，有意保留）
  // DEF = CFLAG:11 / X（部分杀伤数）
  const killed = Math.floor(chara(arg0).dungeon.攻击力 / herd_def);
  // 死亡怪物計算
  era.set('flag:63', (era.get('flag:63') || 0) + killed);
  if ((settings & 32) !== 0 && boss_flag === 0) {
    // Z == 1 的先导（…但是，）——Z 即 CFLAG:570（配下怪物号 >= 100 或 0），
    // 恒非 1，不可达（文件头注释）
    if (killed > 0) {
      era.print(
        `${surprise_tag}${poison_tag}勇者的攻击将${monster_name(mon_id)}`,
      );
      if (benki) {
        era.print(`的${killed}只感到十分满足………`);
      } else {
        era.print(`的${killed}只破坏掉了………`);
      }
    } else if (killed < 1 && rand(50) > 0) {
      era.print(
        `${surprise_tag}${poison_tag}勇者因为对${monster_name(mon_id)}的恐惧动弹不得………`,
      );
    } else {
      era.print(
        `${surprise_tag}${poison_tag}勇者因为对${monster_name(mon_id)}的恐惧失禁了………`,
      );
    }
  } else if ((settings & 32) !== 0 && boss_flag === 1) {
    era.print('BOSS忍受着勇者的攻击……');
  }

  // 経験値取得
  let get_exp = e_get(target_head + 1) + (era.get('cflag:0:9') || 0);
  get_exp *= killed;
  get_exp *= 3;
  era.set(`exp:${arg0}:80`, (era.get(`exp:${arg0}:80`) || 0) + get_exp);
  await get_exp_benki_menu(arg0, play_type);
  if (boss_flag === 0) {
    e_set(target_head + 99, e_get(target_head + 99) - killed);
  }
  if (boss_flag === 0) {
    const stock = era.get(`item:${mon_id}`) || 0;
    era.set(`item:${mon_id}`, Math.max(stock - killed, 0));
  }
  if ((settings & 32) !== 0) {
    await era.waitAnyKey();
  }
  return 0;
}

/**
 * slave_monster_attack：配下怪物侧的攻击（打防御怪物列，
 * 不打勇者）。勇者的配下（CFLAG:570 >= 100）且第 4 列有效（E:300 >= 100）
 * 时发动。
 * @param {(n: number) => number} rand RAND:N 随机源
 * @returns {Promise<number>} 0 = 通常 / 1 = 列全灭
 */
async function slave_monster_attack(rand) {
  const settings = era.get('flag:5') || 0;
  const atker = era_flag.target; // 全局 A（攻击者）
  // 配下がいるかどうか
  if ((era.get(`cflag:${atker}:570`) || 0) < 100) {
    return 0;
  }
  if (e_get(300) < 100) {
    return 0;
  }

  // 防御侧选择（同 ENEMY_ATTACK）
  const { head: c, b: scan_b } = pick_defender_column();
  if (scan_b >= 400) {
    // 全滅時（不可达分支，文件头 pick_defender_column 注释）
    if ((settings & 32) !== 0) {
      era.print('负责防御的怪物全灭了………');
      await era.waitAnyKey();
    }
    return 1;
  }

  // 个体防御与群防御（boss 时 RAND:(Y*30)）
  let y = e_get(c + 3);
  const boss_flag = e_get(c + 8);
  if (boss_flag === 1) {
    if (y <= 0) {
      y = 1;
    }
    y = rand(Math.max(y * 30, 1));
  }
  let z = y * e_get(c + 99); // 群れの防御力

  // 怪物側の攻撃力（第 4 列的配下怪物；魔法补正 ×2）
  let x = (era.get(`cflag:${atker}:9`) || 0) * (e_get(302) + 1);
  if (e_get(306) !== 0) {
    x *= 2;
  }

  // 演出
  if ((settings & 32) !== 0) {
    era.print(
      `成为勇者属下的${era.get(`itemname:${e_get(300)}`) ?? ''}发动了攻击！！`,
    );
  }

  // 攻撃による被害
  z -= x;

  const mon_id = e_get(c); // B = E:C
  if (z <= 0) {
    // 列全灭
    if (boss_flag === 0) {
      if ((settings & 32) !== 0) {
        era.print(
          `勇者属下的攻击使${era.get(`itemname:${mon_id}`) ?? ''}全灭了………`,
        );
      }
    } else if (boss_flag === 1) {
      if ((settings & 32) !== 0) {
        era.print(
          `勇者属下的攻击打倒了『${era.get(`itemname:${mon_id}`) ?? ''}的boss』………`,
        );
      }
    }
    // 経験値計算
    let exp_gain = e_get(c + 1);
    exp_gain *= e_get(c + 99);
    era.set('flag:63', (era.get('flag:63') || 0) + e_get(c + 99));
    era.set(`exp:${atker}:80`, (era.get(`exp:${atker}:80`) || 0) + exp_gain);
    const stock = era.get(`item:${mon_id}`) || 0;
    era.set(`item:${mon_id}`, Math.max(stock - e_get(c + 99), 0));
    e_set(c + 99, 0);
    await era.waitAnyKey();
    return 1;
  }

  // 部分杀伤
  const killed = Math.floor(z / e_get(c + 3));
  const mon_id2 = e_get(c);
  era.set('flag:63', (era.get('flag:63') || 0) + killed);
  if ((settings & 32) !== 0 && boss_flag === 0) {
    if (killed > 0) {
      era.print(
        `勇者属下的攻击破坏了${era.get(`itemname:${mon_id2}`) ?? ''}中的${killed}只………`,
      );
    } else {
      era.print(
        `勇者属下因为对${era.get(`itemname:${mon_id2}`) ?? ''}的恐惧动弹不得………`,
      );
    }
  } else if ((settings & 32) !== 0 && boss_flag === 1) {
    era.print('BOSS忍受着勇者属下的攻击……');
  }
  // 経験値
  let exp_gain = e_get(c + 1);
  exp_gain *= killed;
  era.set(`exp:${atker}:80`, (era.get(`exp:${atker}:80`) || 0) + exp_gain);
  if (boss_flag === 0) {
    e_set(c + 99, e_get(c + 99) - killed);
  }
  const stock2 = era.get(`item:${mon_id2}`) || 0;
  if (boss_flag === 0) {
    era.set(`item:${mon_id2}`, Math.max(stock2 - killed, 0));
  }
  if ((settings & 32) !== 0) {
    await era.waitAnyKey();
  }
  return 0;
}

/**
 * monster_attack：怪物侧的攻击（打勇者的气力；HP 的扣减
 * 在 defence_chara_extra_dmg 内）。
 *
 * 选列循环 BREAK 停在数量槽 99/199/299，换算 -99 得列头 0/100/200（与
 * enemy_attack / slave_monster_attack / death_check 同构），随后读数量槽
 * E:99/199/299 与攻撃槽 E:2/102/202——怪物攻击按 数量 × 攻撃 对勇者造成
 * HP 扣减（DEFENCE_CHARA_EXTRA_DMG 内）与气力扣减。
 *
 * @param {number} arg0 被攻击的勇者
 * @param {number} arg1 回合数
 * @param {(n: number) => number} rand RAND:N 随机源
 * @returns {Promise<number>} 0 = 通常 / 1 = 怪物全灭 / 999 = 中断
 */
async function monster_attack(arg0, arg1, rand, move_ctx = {}) {
  const settings = era.get('flag:5') || 0;
  // 生存怪物数を求める
  let member = 0;
  for (let monid = 0; monid < 300; monid += 1) {
    monid += 99;
    if (e_get(monid) > 0) {
      member += 1;
    }
  }

  // 全滅時
  if (member <= 0) {
    if ((settings & 32) !== 0) {
      era.print('负责防御的怪物全灭了………');
    }
    return 1;
  }

  // ターン数から攻撃怪物を求める（BREAK 停在数量槽 99/199/299）
  let rest = arg1 % member;
  let monid = 0;
  for (monid = 0; monid < 300; monid += 1) {
    monid += 99;
    if (e_get(monid) > 0) {
      if (rest <= 0) {
        break;
      }
      rest -= 1;
    }
  }
  // IDを先頭に（数量槽 99/199/299 → 列头 0/100/200，与同构三处一致）
  monid -= 99;

  // B = MONID; CALL magic,2（dungeon.js 转发不动目标）
  if ((await magic_mod.magic(2, arg0, monid, rand, move_ctx)) === 999) {
    return 999;
  }

  // 怪物技能（E:(列头+5) 为技能号）
  const skill_no = e_get(monid + 5);
  if (
    (await monster_skill_mod.monster_skill(arg0, skill_no, monid, rand)) === 999
  ) {
    return 999;
  }

  // 怪物数（数量槽 E:99/199/299）
  let monnum = e_get(monid + 99);
  const boss_flag = e_get(monid + 8);
  if (boss_flag === 1) {
    // ボスは15人分の力を持つ
    monnum *= 15;
  }
  // ダンジョンレベル補正——仕様変更にてステータス生成時に反映

  // DMG = MONNUM * E:(MONID + 2)
  let dmg = monnum * e_get(monid + 2);
  const monname_no = e_get(monid); // MONNAME

  // 攻击演出
  if ((settings & 32) !== 0 && boss_flag === 0) {
    era.print(`${monster_name(monname_no)}发动了攻击！！`);
  } else if ((settings & 32) !== 0 && boss_flag === 1) {
    era.print(
      `『${era.get(`itemname:${monname_no}`) ?? ''}的Boss』发动了攻击！！`,
    );
  }

  // 畏怖・隷属処理（CFLAG:130/131，无显示开关）
  const trauma_mon = era.get(`cflag:${arg0}:130`) || 0;
  const trauma_lv = era.get(`cflag:${arg0}:131`) || 0;
  if (trauma_mon === monname_no && trauma_lv > 5) {
    era.print(`${name_of(arg0)}受凌辱回忆的影响、防御变慢了……`);
    dmg *= 2;
  } else if (trauma_mon === monname_no && trauma_lv >= 0) {
    era.print(`${name_of(arg0)}受凌辱回忆的影响、反应变慢了……`);
    dmg = Math.floor((dmg * (6 + trauma_lv)) / 5);
  }

  // ダメージ処理（HP 扣减在此）
  dmg = defence_chara_extra_dmg(arg0, dmg, rand);

  if (dmg > 0) {
    // 防御値を超えるダメージ（气力扣减）
    if ((settings & 32) !== 0) {
      era.print(`怪物的攻击使勇者受到了${dmg}伤害！`);
    }
    chara(arg0).dungeon.气力 -= dmg;
    return 0;
  }

  // ダメージが無かった場合
  if ((settings & 32) !== 0) {
    era.print('勇者拼死忍耐着怪物的攻击………');
  }
  return 0;
}

/**
 * death_check：战斗中断判定。
 * @param {number} arg0 勇者
 * @returns {Promise<number>} 0 = 继续 / 1 = 勇者胜（怪物全灭）/
 *   2 = 勇者败北（投降/力尽，CFLAG:1 = 0）
 */
async function death_check(arg0) {
  // プレイヤー死亡判定
  if (chara(arg0).dungeon.体力 <= 0) {
    era.print(`${name_of(arg0)}最终在潮湿的地下城中用尽了最后的气力。`);
    chara(arg0).invasion.状态 = 0;
    return 2;
  }
  if (chara(arg0).dungeon.体力 <= 300) {
    era.print(`${name_of(arg0)}感觉到生命垂危，投降求饶了。`);
    chara(arg0).invasion.状态 = 0;
    return 2;
  }
  if (chara(arg0).dungeon.气力 <= 0) {
    era.print(`${name_of(arg0)}失去了战斗的意志，丢掉武器投降了。`);
    chara(arg0).invasion.状态 = 0;
    return 2;
  }

  // 怪物側の生き残りを算出（三列扫描 + 支配判定）
  let alive = 0;
  let b = 0;
  for (let count = 0; count < 3; count += 1) {
    b += 99;
    if (e_get(b) > 0) {
      alive = 1;
      break;
    }
    b -= 99;
    // Z = CFLAG:570（配下怪物号；主循环 Z == 1 的读者恒假——B 列头值
    // 非怪物号域，文件头注释）
    const z = era.get(`cflag:${arg0}:570`) || 0;
    // 装備効果(支配) = 9
    if (equip_check(arg0, 9) > 0 && z < e_get(b)) {
      chara(arg0).system.从属怪物 = e_get(b); // CFLAG:570（门面）
      era.print(`${name_of(arg0)}捕捉了濒死的怪物，并支配了其精神。`);
      await era.waitAnyKey();
    }
    b += 100;
  }

  // 全滅時
  if (alive === 0) {
    era.print('负责防御的怪物全灭了………');
    return 1;
  }
  return 0;
}

/**
 * victory_get：搜刮战利品（死体漁り）。善恶值影响意愿，
 * 执行后善恶 -5。
 * @param {number} arg0 勇者
 * @param {(n: number) => number} rand RAND:N 随机源
 * @returns {Promise<number>} 1 = 搜刮了 / 0 = 没搜
 */
async function victory_get(arg0, rand) {
  const settings = era.get('flag:5') || 0;
  let will = 0; // LOCAL:0

  // 善恶值档位掷骰（越高越想搜）
  const karma_v = chara(arg0).chara.善恶值;
  if (karma_v > 150) {
    will += rand(125);
  } else if (karma_v > 100) {
    will += rand(75);
  } else if (karma_v > 50) {
    will += rand(35);
  } else if (karma_v > 0) {
    will += rand(25);
  } else {
    will += rand(15);
  }

  // やりたくなる素质（-1 各）
  if ((era.get(`talent:${arg0}:17`) || 0) !== 0) {
    will -= 1; // プライド低い
  }
  if ((era.get(`talent:${arg0}:23`) || 0) !== 0) {
    will -= 1; // 好奇心
  }
  if ((era.get(`talent:${arg0}:36`) || 0) !== 0) {
    will -= 1; // 恥薄い
  }
  if ((era.get(`talent:${arg0}:203`) || 0) !== 0) {
    will -= 1; // 盗賊
  }

  // 思いとどまる素质（+1 各）
  if ((era.get(`talent:${arg0}:15`) || 0) !== 0) {
    will += 1; // プライド高い
  }
  if ((era.get(`talent:${arg0}:20`) || 0) !== 0) {
    will += 1; // 自制心
  }
  if ((era.get(`talent:${arg0}:27`) || 0) !== 0) {
    will += 1; // 一線越えない
  }
  if ((era.get(`talent:${arg0}:35`) || 0) !== 0) {
    will += 1; // 恥じらい
  }

  // 意愿不足
  if (will > 5) {
    return 0;
  }

  if ((settings & 32) !== 0) {
    era.print(`${name_of(arg0)}勇者开始搜刮战利品（善良值:-5）`);
    await era.waitAnyKey();
  }

  // CALL karma, (ARG:0), -5（dungeon.js 的域内存根，不改值）
  const { karma } = require('#/dungeon/dungeon');
  karma(arg0, -5);

  // CALL add_ex_item, -1, (ARG:0), 0（dungeon.js 的域内存根，缺省 0 = 没找到）
  const { add_ex_item } = require('#/dungeon/dungeon');
  const found = await add_ex_item(-1, arg0, 0);

  // なにも見つからなかったらしい。代わりに金品を得る
  if (found === 0) {
    const { get_junk_item } = require('#/dungeon/dungeon');
    await get_junk_item(arg0, rand);
  }
  return 1;
}

/**
 * dungeon_party_battle：队伍战斗主流程（勇者队 vs 防御怪物）。
 *
 * @param {number} arg0 队长
 * @param {(n: number) => number} [rand] RAND:N 随机源（缺省均匀随机）
 * @returns {Promise<number>} 恒 return 0（陷落信息经 CFLAG:1 传递）
 */
async function dungeon_party_battle(arg0, rand, move_ctx = {}) {
  const rand_n = rand ?? default_rand;
  const settings = era.get('flag:5') || 0;

  // 行動完了の場合飛ばす
  if ((era.get(`cflag:${arg0}:530`) || 0) === 1) {
    return 0;
  }

  // === 対戦相手選択 ===
  if ((era.get('flag:502') || 0) === 1) {
    // 2Dフィールド用処理。ほぼ廃止——M:2 无通道、2D 线随 H12（#185），
    // 结构保留（空分支 + 注释），怪物选召不发生
  } else if (chara(arg0).invasion.状态 === 12) {
    // イベントダンジョン（战役；#469 起真身）
    for (let count = 0; count < 4; count += 1) {
      const local = await campaign_monster_list(
        chara(arg0).dungeon.侵攻阶层,
        rand_n,
      );
      monster_data_call(local, count, arg0, -1, rand_n);
    }
  } else {
    for (let count = 0; count < 4; count += 1) {
      // LOCAL = (阶层 - 1) * 10 + 100 + RAND:5
      let local = (chara(arg0).dungeon.侵攻阶层 - 1) * 10 + 100 + rand_n(5);
      // 8階以上で強敵の抽選（RAND:10 == 0 且 ITEM 有库存）
      if (chara(arg0).dungeon.侵攻阶层 >= 8 && rand_n(10) === 0) {
        const monid = 191 + rand_n(3);
        if ((era.get(`item:${monid}`) || 0) > 0) {
          local = monid;
        }
      }
      monster_data_call(local, count, arg0, -1, rand_n);
    }
  }

  // === スケルトンチェック ===
  let skeleton_count = 0; // LOCAL:1
  for (let local = 0; local < 300; local += 100) {
    if (e_get(local) === 190) {
      skeleton_count += 1;
    }
  }
  if (skeleton_count >= 3) {
    // スケルトン3人衆は戦闘スキップ
    if ((settings & 32) !== 0) {
      era.print('*沿路向前……*');
      era.drawLine();
    }
    return 0;
  }
  if ((settings & 32) !== 0) {
    era.print('*发生战斗！*');
    era.drawLine();
  }

  // === 勝利フラグ / クエスト ===
  const success = { v: 0 };
  const quest_flag = await quest_mod.quest_battle_set(arg0, rand); // QUEST_FLAG = RESULT
  if (quest_flag === 1) {
    return 0; // 性奉侍完结（QUEST_BITCH 已把 534 置成功位）
  }

  // === 弾の補充 ===
  era.set(`cflag:${arg0}:571`, 4);
  let atker_slot = era.get(`cflag:${arg0}:531`) || 0;
  if (atker_slot > 0) {
    era.set(`cflag:${atker_slot}:571`, 4);
  }
  atker_slot = era.get(`cflag:${arg0}:532`) || 0;
  if (atker_slot > 0) {
    era.set(`cflag:${atker_slot}:571`, 4);
  }

  // === 先制 ===
  for (let turn = 0; turn < 3; turn += 1) {
    if (turn === 0) {
      atker_slot = arg0;
    } else if (turn === 1) {
      atker_slot = era.get(`cflag:${arg0}:531`) || 0;
    } else if (turn === 2) {
      atker_slot = era.get(`cflag:${arg0}:532`) || 0;
    } else {
      break;
    }
    if (atker_slot <= 0) {
      continue;
    }
    if (
      (era.get(`talent:${atker_slot}:252`) || 0) === 1 &&
      (era.get(`cflag:${atker_slot}:503`) || 0) & 32
    ) {
      // 先制不可（障碍物位）
      if ((settings & 32) !== 0) {
        era.print('因为障碍物的阻挡未能先发制人……');
      }
    } else if ((era.get(`talent:${atker_slot}:252`) || 0) === 1) {
      // Z = 0（先制标记；主循环 Z == 1 读者恒假，文件头注释）
      if ((await enemy_attack(atker_slot, 2, rand_n, move_ctx)) === 999) {
        // 传送术等中断先制攻击；主循环仍进入后续中断判定。
      }
    }
  }

  // === 攻撃順 ===
  // ATK_TURN = RAND:3——全函数无读者，死赋值；
  // 掷点照掷（PRNG 序列逐位确定是种子化回归测试的前提，文件头），
  // 变量不写入
  rand_n(3);

  // === 主循环 ===
  for (let turn = 0; turn < 99; turn += 1) {
    // 反抗的・高傲的・抵抗的：第 7 回合多打一轮（演出）
    if (
      ((era.get(`talent:${arg0}:11`) || 0) !== 0 ||
        (era.get(`talent:${arg0}:15`) || 0) !== 0 ||
        (era.get(`talent:${arg0}:34`) || 0) !== 0) &&
      turn === 6
    ) {
      era.print('*勇者继续发动猛烈的攻击*');
      await era.waitAnyKey();
    } else if (
      ((era.get(`talent:${arg0}:10`) || 0) !== 0 ||
        (era.get(`talent:${arg0}:14`) || 0) !== 0 ||
        (era.get(`talent:${arg0}:26`) || 0) !== 0) &&
      rand_n(5) === 0
    ) {
      // 臆病・大人しい・悲観的：ランダムで逃げ出す
      if ((settings & 32) !== 0) {
        era.print(`气馁的${name_of(arg0)}逃跑了……`);
      }
      // 勇者パーティーの疲労（より疲れる）
      chara(arg0).dungeon.气力 -= rand_n(40);
      atker_slot = era.get(`cflag:${arg0}:531`) || 0;
      if (atker_slot > 0) {
        chara(atker_slot).dungeon.气力 -= rand_n(40);
      }
      atker_slot = era.get(`cflag:${arg0}:532`) || 0;
      if (atker_slot > 0) {
        chara(atker_slot).dungeon.气力 -= rand_n(40);
      }
      // ランダムで逃走失敗する
      if (rand_n(3) === 0) {
        era.print('*逃跑失败*');
        era.print(`${name_of(arg0)}没能逃跑！`);
        await era.waitAnyKey();
      } else {
        break;
      }
    } else if (turn > 5) {
      // ターン数超過：強制的に戦闘が中断される
      const local = (era.get('cflag:0:9') || 0) + rand_n(10) + 1;
      if ((settings & 32) !== 0) {
        era.print(`${name_of(arg0)}逃跑了………`);
        era.print(`你与勇者得到了${local}点经验值`);
      }
      // 勇者パーティーの疲労
      chara(arg0).dungeon.气力 -= rand_n(30);
      era.set(`exp:${arg0}:80`, (era.get(`exp:${arg0}:80`) || 0) + local);
      atker_slot = era.get(`cflag:${arg0}:531`) || 0;
      if (atker_slot > 0) {
        chara(atker_slot).dungeon.气力 -= rand_n(30);
        era.set(
          `exp:${atker_slot}:80`,
          (era.get(`exp:${atker_slot}:80`) || 0) + local,
        );
      }
      atker_slot = era.get(`cflag:${arg0}:532`) || 0;
      if (atker_slot > 0) {
        chara(atker_slot).dungeon.气力 -= rand_n(30);
        era.set(
          `exp:${atker_slot}:80`,
          (era.get(`exp:${atker_slot}:80`) || 0) + local,
        );
      }
      era.set('exp:0:80', (era.get('exp:0:80') || 0) + local);
      // ランダムで逃走失敗する
      if (rand_n(3) === 0) {
        era.print('*逃跑失败*');
        era.print(`${name_of(arg0)}没能逃跑！`);
        await era.waitAnyKey();
      } else {
        break;
      }
    }

    // === パラメータ表示（FLAG:5 & 32）===
    if ((settings & 32) !== 0) {
      era.drawLine();
      era.print(`第${turn + 1}回合`);
      era.drawLine();
      const sidea = era.get(`cflag:${arg0}:531`) || 0;
      const sideb = era.get(`cflag:${arg0}:532`) || 0;
      // 名前行（对齐近似：直接并列，文件头「字宽对齐不做」）
      era.print(
        ` ${name_of(arg0)}${sidea > 0 ? `  | ${name_of(sidea)}` : ''}${
          sideb > 0 ? `  | ${name_of(sideb)}` : ''
        }`,
      );
      // HP / 气 / 攻 / 防（数值近似 BAR）
      era.print(
        ` HP ${chara(arg0).dungeon.体力}/${era.get(`maxbase:${arg0}:0`) || 0}${
          sidea > 0
            ? `  | HP ${chara(sidea).dungeon.体力}/${era.get(`maxbase:${sidea}:0`) || 0}`
            : ''
        }${sideb > 0 ? `  | HP ${chara(sideb).dungeon.体力}/${era.get(`maxbase:${sideb}:0`) || 0}` : ''}`,
      );
      era.print(
        ` 气 ${chara(arg0).dungeon.气力}/${era.get(`maxbase:${arg0}:1`) || 0}${
          sidea > 0
            ? `  | 气 ${chara(sidea).dungeon.气力}/${era.get(`maxbase:${sidea}:1`) || 0}`
            : ''
        }${sideb > 0 ? `  | 气 ${chara(sideb).dungeon.气力}/${era.get(`maxbase:${sideb}:1`) || 0}` : ''}`,
      );
      era.print(
        ` 攻 ${chara(arg0).dungeon.攻击力}${sidea > 0 ? `  | 攻 ${chara(sidea).dungeon.攻击力}` : ''}${sideb > 0 ? `  | 攻 ${chara(sideb).dungeon.攻击力}` : ''}`,
      );
      era.print(
        ` 防 ${chara(arg0).dungeon.防御力}${sidea > 0 ? `  | 防 ${chara(sidea).dungeon.防御力}` : ''}${sideb > 0 ? `  | 防 ${chara(sideb).dungeon.防御力}` : ''}`,
      );
      // 立绘 HTML_PRINT 无通道，不移植
      era.drawLine();
      era.print('VS');
      await era.waitAnyKey();
      era.drawLine();
      monster_list();
      era.drawLine();
      await era.waitAnyKey();
    }

    // === 攻撃を行うキャラを選定 ===
    const atker = select_atker(arg0, turn);
    atker_slot = atker;

    // 消耗品を使用するかチェック（dungeon.js 转发）
    const { use_ex_item } = require('#/dungeon/dungeon');
    await use_ex_item('战斗中', atker);

    // 支配している怪物の攻撃（A 换手后打防御怪物）
    era_flag.target = atker;
    await slave_monster_attack(rand_n);

    // 先攻後攻決定
    const speed = speed_plus(atker, rand_n);
    let interrupted = false;
    if (speed > 0) {
      // 勇者が先攻
      const r1 = await enemy_attack(atker, 0, rand_n, move_ctx);
      if (r1 !== 999) {
        // 強制中断以外、全滅しても攻撃を行う
        if ((await monster_attack(atker, turn, rand_n, move_ctx)) === 999) {
          if ((settings & 32) !== 0) {
            era.print('战斗中断了');
          }
          interrupted = true;
        }
      } else if (r1 === 999) {
        if ((settings & 32) !== 0) {
          era.print('战斗中断了');
        }
        interrupted = true;
      }
    } else {
      // 怪物が先攻
      const r1 = await monster_attack(atker, turn, rand_n, move_ctx);
      if (r1 === 0) {
        // 敗北も中断も無い場合、勇者の後攻
        if ((await enemy_attack(atker, 1, rand_n, move_ctx)) === 999) {
          if ((settings & 32) !== 0) {
            era.print('战斗中断了');
          }
          interrupted = true;
        }
      } else if (r1 === 999) {
        if ((settings & 32) !== 0) {
          era.print('战斗中断了');
        }
        interrupted = true;
      }
    }
    if (interrupted) {
      break;
    }

    // === 攻撃を行った勇者が堕ちたか判定 ===
    const dc = await death_check(atker);
    if (dc === 2) {
      if ((settings & 1) !== 0) {
        await ryouzyoku(atker, rand_n);
      }
      break;
    }
    if (dc === 1) {
      // 勝利セリフ / 戦利品 / 間違いが起こる
      era.drawLine();
      await victory_koujo(atker);
      await victory_get(atker, rand_n);
      await victory_ryouzyoku(atker, rand_n);
      success.v = 1;
      break;
    }
    // ATK_TURN += 1——死赋值（无读者），不写入（文件头注释）
  }

  // クエスト结算——#178 真身起两个分支第一次可达（此前 QUEST_FLAG
  // 恒 0）：任务战斗（quest_flag === 2）按战果 SUCCESS 走成功/失败结算
  if (quest_flag === 2 && success.v === 1) {
    await quest_mod.result_quest(arg0, '成功', rand);
  }
  if (quest_flag === 2 && success.v === 0) {
    await quest_mod.result_quest(arg0, '失败', rand);
  }

  // 侵攻中的再出发演出
  if (chara(arg0).invasion.状态 === 2 && (settings & 32) !== 0) {
    era.print(`${name_of(arg0)}再次对地下城进行攻略`);
  }

  // === 装備の回復（队长与两同伴同构）===
  const { weapon_restore } = require('#/system/equip/weapon-restore');
  const restore_one = async (cid) => {
    era_flag.target = cid; // A = 换手
    if (
      Math.floor(
        (chara(cid).dungeon.气力 * 100) / (era.get(`maxbase:${cid}:1`) || 1),
      ) > 40
    ) {
      await weapon_restore(cid);
    } else if ((era.get(`talent:${cid}:249`) || 0) === 1) {
      // 铁壁
      await weapon_restore(cid);
      chara(cid).dungeon.攻击力 += era.get(`cflag:${cid}:9`) || 0;
      chara(cid).dungeon.防御力 += era.get(`cflag:${cid}:9`) || 0;
      chara(cid).dungeon.体力 += (era.get(`cflag:${cid}:9`) || 0) * 10;
    }
  };
  await restore_one(arg0);
  atker_slot = era.get(`cflag:${arg0}:531`) || 0;
  if (atker_slot > 0) {
    await restore_one(atker_slot);
  }
  atker_slot = era.get(`cflag:${arg0}:532`) || 0;
  if (atker_slot > 0) {
    await restore_one(atker_slot);
  }
  return 0;
}

/** monster_data 的调用别名（rand 透传——选召骰点必须走注入的随机源） */
function monster_data_call(inum, line, arg2, arg3, rand) {
  return require('#/dungeon/monster-data').monster_data(
    inum,
    line,
    arg2,
    arg3,
    -1,
    rand,
  );
}

module.exports = {
  name_of,
  she,
  magic: magic_mod.magic,
  monster_list,
  select_atker,
  speed_plus,
  skill_extra_bonus,
  attack_chara_extra_dmg,
  defence_chara_extra_dmg,
  enemy_attack,
  slave_monster_attack,
  monster_attack,
  death_check,
  victory_get,
  dungeon_party_battle,
  attack_koujo,
  before_autotrain,
  source_check_auto,
  campaign_monster_list,
  // page-campaign-1.js 向这个族 register(1, ...)，本文件只声明、不参与注册
  campaign_monster_list_family,
};
