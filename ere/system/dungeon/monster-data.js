/**
 * @file 怪物状态生成与改造。issue #175（阶段 3 H6）实现 monster_data、
 *     骷髅兵和怪物名；issue #340（阶段 5a L9）补齐怪物改造菜单与判定。
 *
 * **为什么随 H6 实现（隐性硬前置，SOP §2 判断条件）**：H6 工单内容只有两个
 * 战斗文件的 22 个函数，但 dungeon_party_battle 的怪物全靠本函数写进 E
 * 对象（本文件是它的唯一写者）——本函数缺位的后果（实测推演）：
 * 三列全空 → death_check 的怪物侧 ALIVE == 0 → RETURN 1 → 勇者每战
 * 必胜且 monster_attack 因 MEMBER == 0 直接返回，**勇者不掉血**，这张工单
 * 「让勇者会被打退」的核心交付落空。与 #169 把 chara-make.js 拉进阶段 3 成
 * 为 H1 是同一形式。怪物属性数据在 ere/data/monster-database.js（#168
 * 结论 6 先例）。
 *
 * 说明（有意偏离，均注明依据）：
 *   - **战斗状态走普通对象**（#883）：一列是 ere/system/dungeon/battle-state.js 的
 *     具名字段对象，本文件是它的唯一写者（列号即原来的列头 ÷ 100）。
 *     旧写法是 E 表的 `era.get/set('e:N')` 偏移读写，那份数据只在单次流程
 *     里中转，却随存档保存；`e:1` 还被 chara-body 借去当临时变量；
 *   - ere 无全局 RAND 序列（#117），随机经注入的 rand 掷出（缺省
 *     Math.random——run_dungeon 第二参先例）；
 *   - 88 个怪物函数 → 数据表查表（MONSTER_DATABASE）；skeleton 的
 *     动态等级保留为函数；
 *   - GROUP 战用段（GROUP != -1 分支）无调用方传 GROUP
 *     （全库调用 monster_data 均 4 参以内），结构保留、注释标注；
 *   - 名字拼接（monstername 的 #FUNCTIONS 与 monster_name 的 PRINT 链）
 *     改为返回字符串，由调用方并入一次 era.print（引擎 print 每调用一行，
 *     同显示行归并先例）；
 *   - ITEM:INUM（怪物所持数，经济的怪物库存）经 `item:${inum}` 寻址
 *     （ere 侧 game-stronghold.js 等先例；ITEM = data.item.hold）。
 */

'use strict';

const era = require('#/era-electron');

/** 怪物设定屏的返回键 [999] */
const MONSTER_SETUP_BACK_KEY = 999;
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { battle_column } = require('#/system/dungeon/battle-state');
const { select_yes_no } = require('#/utils/input-yes-no');
const { default_rand } = require('#/utils/numeric');
const { MONSTER_DATABASE } = require('#/data/monster-database');

function campaign_dungeon_lv() {
  const campaign = era.get('flag:400') || 0; // FLAG:400 当前战役编号
  return campaign === 1 ? 45 : 0;
}

/**
 * enemy_data_check 与 crusader 段：ARG 被声明成形参，却漏了 INUM/TOP 的
 * 赋值，两个入口字面执行都恒 0；#333 结论不修复，因此这里保留无操作行为。
 */
function enemy_data_check(inum, column) {
  void inum;
  void column;
  return 0;
}

/** 怪物名（Item.yml 的登记名；%ITEMNAME:ID%） */
function item_name(id) {
  return era.get(`itemname:${id}`) ?? '';
}

/**
 * skeleton：骷髅兵——等级随掷点或阶层动态，所以不进
 * 数据表。ARG:1 < 0 时 RAND:9+1，否则用 ARG:1 的当前阶层（CFLAG:501）。
 * @param {number} column 列号
 * @param {number} arg1 怪物持有者的角色号（-1 = 无）
 * @param {(n: number) => number} rand RAND:N 随机源
 */
function skeleton(column, arg1, rand) {
  let lv;
  if (arg1 < 0) {
    lv = rand(9) + 1;
  } else {
    lv = era.get(`cflag:${arg1}:501`) || 0;
  }
  const row = battle_column(column);
  row.id = 190; // 怪物番号
  row.level = lv + 1; // 等级
  row.attack = lv + 1; // 攻击力
  row.defense = lv + 1; // 防御力
  row.speed = 0; // 速度
  row.special = 0; // 特殊
  row.magic = 0; // 魔法
  row.rape_type = 0; // 凌辱类型
  row.resistance = 0; // 耐性
}

/**
 * 怪物改造位（FLAG:(怪物番号 + 700)）：低两位 = 强化改造、百位段 = 兵种，
 * 拼名与生成都读它（monstername / monster_name / monster_data 共用）。
 * @param {number} id 怪物识别号
 * @returns {number} 改造位（EXTRA）
 */
function monster_extra(id) {
  return era.get(`flag:${id + 700}`) || 0;
}

/**
 * monstername：怪物名拼接（#FUNCTIONS——返回字符串）。
 * 改造前缀（上级/地形适应定语/酸性/猛毒/装甲）+ 怪物名 + 兵种。
 * @param {number} id 怪物识别号
 * @returns {string} 拼接名
 */
function monstername(id) {
  let out = '';
  const extra = monster_extra(id);
  const mod = extra % 100;
  if (mod === 1) {
    out += '上级';
  } else if (mod === 2) {
    // 地形适应定语按该层的房间类型（FLAG:(层 + 349)）
    const room =
      id < 190
        ? era.get(`flag:${Math.floor((id - 100) / 10) + 1 + 349}`) || 0
        : 0;
    if (room === 500) {
      out += '遗迹街的';
    } else if (room === 501) {
      out += '沼地的';
    } else if (room === 502) {
      out += '饲养的';
    } else if (room === 503) {
      out += '冰封的';
    } else if (room === 504) {
      out += '灼热的';
    } else if (room === 505) {
      out += '迷宫的';
    } else if (room === 506) {
      out += '标本的';
    }
  } else if (mod === 3) {
    out += '酸性';
  } else if (mod === 4) {
    out += '猛毒';
  } else if (mod === 5) {
    out += '装甲';
  }
  out += item_name(id);
  const troop = Math.floor(extra / 100) % 100;
  if (troop === 1) {
    out += '弓兵';
  } else if (troop === 2) {
    out += '魔导兵';
  } else if (troop === 3) {
    out += '催眠师';
  } else if (troop === 4) {
    out += '肉铠兵';
  }
  return out;
}

/**
 * monster_name：打印型名字拼接。与 monstername 同构
 * （前缀 + 名 + 兵种）；第二参（1 = 空格配置）控制的 STRLENS 半角
 * 字宽对齐段无 era 通道（引擎 print 自适应布局），不移植（注释留痕），
 * 签名相应只留识别号。
 * @param {number} id 怪物识别号
 * @returns {string} 拼接名（供调用方并入一次 era.print）
 */
function monster_name(id) {
  // STRLENS 空格对齐段：ere 无字宽对齐通道，不移植
  return monstername(id);
}

/**
 * monster_setup_able：判定怪物能否选择指定改造或兵种。
 * @param {number} id 怪物识别号
 * @param {number} selection 改造菜单号
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {number} 1 = 可选，0 = 不可选
 */
function monster_setup_able(id, selection, rand = default_rand) {
  // 无改造、上级化对全种族可用；土地适应只限常规怪物。
  if (selection === 0 || selection === 1) return 1;
  if (selection === 2 && id < 190) return 1;

  // 怪物种族与法术取自 monster_data 的第 0 防卫列。
  monster_data(id, 0, -1, -1, -1, rand);
  const type = battle_column(0).rape_type; // 凌辱类型（怪物种族）
  const magic = battle_column(0).magic; // 怪物固有魔法

  if ((type === 2 || type === 5) && selection === 3) return 1;
  if (type !== 2 && selection === 5) return 1;

  const humanoid = [1, 6, 7, 8, 9].includes(type);
  if (humanoid) {
    if ([50, 51, 54].includes(selection)) return 1;
    if (selection === 52 && magic !== 3) return 1;
    if (selection === 53 && magic !== 2) return 1;
  } else if (selection === 4) {
    return 1;
  }
  return 0;
}

/** 改造菜单正文 */
const MONSTER_MOD_LABELS = Object.freeze({
  0: '无改造',
  1: '上级化',
  2: '土地适应',
  3: '酸性化',
  4: '猛毒化',
  5: '装甲化',
});

/** 兵种菜单正文 */
const MONSTER_TROOP_LABELS = Object.freeze({
  50: '普通兵',
  51: '弓兵',
  52: '魔导兵',
  53: '催眠师',
  54: '肉铠兵',
});

/**
 * monster_setup：怪物改造菜单。选择可用改造、确认并支付
 * 1000 资金后更新 FLAG:(怪物号+700)，随后留在菜单继续选择。
 *
 * KAI_LIST 是调用方部下一览的死回传（赋值后无读者，dungeon 信息页已随
 * #685 删除）；ere 调用方同样不消费，因此所有退出路径统一返回 0。
 * @param {number} id 怪物识别号（100-199）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0；非法识别号返回 999
 */
async function monster_setup(id, rand = default_rand) {
  // 错误值直接退回。
  if (id === 999 || id < 100 || id > 199) return 999;

  const floor = id < 190 ? Math.trunc((id - 100) / 10) + 1 : 0;
  const room = floor > 0 ? era.get(`flag:${floor + 349}`) || 0 : 0;

  for (;;) {
    const extra = monster_extra(id); // FLAG:(ARG + 700) = 改造位
    era.print(`${monster_name(id)}的改造`);
    era.print(`所持金 ${era_flag.money}`);
    era.print(
      room >= 500 && room < 510 ? `设施：${item_name(room)}` : '设施：道路',
    );

    const selected_mod = extra % 100;
    // 本轮打印出来的按钮编号＝受理集：rule 用它拼正则，越界值由引擎在
    // 输入框里拒收（见 utils/input-rule.js）
    const choices = [];
    for (let selection = 0; selection < 10; selection += 1) {
      const able = monster_setup_able(id, selection, rand);
      const label = MONSTER_MOD_LABELS[selection];
      if (label !== undefined && able === 1) {
        era.printButton(
          `${label}${selected_mod === selection ? ' *' : ''}`,
          selection,
        );
        choices.push(selection);
      }
    }

    // 只有人形五种族显示兵种菜单。
    monster_data(id, 0, -1, -1, -1, rand);
    if ([1, 6, 7, 8, 9].includes(battle_column(0).rape_type)) {
      era.print('--- 兵种 ---');
      const selected_troop = (Math.trunc(extra / 100) % 100) + 50;
      for (let selection = 50; selection < 60; selection += 1) {
        const able = monster_setup_able(id, selection, rand);
        const label = MONSTER_TROOP_LABELS[selection];
        if (label !== undefined && able === 1) {
          era.printButton(
            `${label}${selected_troop === selection ? ' *' : ''}`,
            selection,
          );
          choices.push(selection);
        }
      }
    }

    era.drawLine();
    era.printButton('返回', MONSTER_SETUP_BACK_KEY);
    // 受理集就是本轮打印出来的按钮（改造项 + 兵种 + 返回），写进 rule 后
    // 未列出的编号由引擎在输入框里拒收。
    const selection = await era.input({
      rule: `(?:${[...choices, 999].join('|')})`,
    });
    if (selection === MONSTER_SETUP_BACK_KEY) return 0;

    era.print('改造需要１０００资金');
    if (era_flag.money < 1000) {
      await era.printAndWait('没钱还是用杂鱼兵吧！');
      return 0;
    }
    if ((await select_yes_no()) === 1) return 0;

    let next_extra;
    if (selection < 50) {
      next_extra = Math.trunc(extra / 100) * 100 + selection;
    } else {
      next_extra =
        Math.trunc(extra / 10000) * 10000 +
        (selection - 50) * 100 +
        (extra % 100);
    }
    era.set(`flag:${id + 700}`, next_extra);
    era_flag.money -= 1000;
    era_exflag.legit_money -= 1000;
  }
}

/**
 * monster_data：把怪物写进战斗状态的一列。
 *
 * 流程：等级骰 → 数量两骰（GROUP 战取大、常规则取小）→ boss 化 →
 * 查数据表写属性 → 精英随从修正 → 兵种改造补正 → 迷宫等级缩放。
 *
 * @param {number} inum 怪物识别号（可被本函数改写为 190 骷髅）
 * @param {number} line 列号（0-2 防御三列、3 = 勇者(A)配下、
 *   4 = 勇者(T)配下、5 = X 的怪物数据取得）
 * @param {number} [arg2] 勇者A（缺省 -1；LINE == 3 与骷髅战用）
 * @param {number} [arg3] 奴隶的对手勇者T（缺省 -1；LINE == 4 用）
 * @param {number} [group] GROUP 战分组（缺省 -1；全库无调用方
 *   传它，结构保留）
 * @param {(n: number) => number} [rand] RAND:N 随机源（缺省均匀随机）
 * @returns {number} 恒 return 0
 */
function monster_data(inum, line, arg2 = -1, arg3 = -1, group = -1, rand) {
  const rand_n = rand ?? default_rand;
  const row = battle_column(line); // 本函数写的就是这一列

  // —— 怪物生成レベル ——
  let lv;
  if (inum >= 600) {
    // イベント領域のモンスター：campaign_dungeon_lv（战役等级）
    const camp_lv = campaign_dungeon_lv();
    lv = Math.floor(camp_lv / 10) + 2;
    if (rand_n(10) < camp_lv % 10) {
      lv += 1;
    }
  } else {
    const master_lv = era.get('cflag:0:9') || 0; // CFLAG:0:9 魔王等级
    lv = Math.floor(master_lv / 12) + 2;
    if (rand_n(10) < master_lv % 10) {
      lv += 1;
    }
  }

  // —— 数量第一骰 LOCAL:1 ——
  let first_count;
  if (group === -1) {
    if (inum >= 600) {
      first_count = rand_n(10) + 1;
    } else if (line >= 0 && line < 3) {
      const held = era.get(`item:${inum}`) || 0;
      if (held <= 0) {
        // 全滅の場合骷髅兵（数は後の第二骰で小さい方を採用）
        first_count = rand_n(10) + 1;
        inum = 190;
      } else if (held > 10) {
        first_count = rand_n(10) + 1;
      } else {
        first_count = held;
      }
    } else if (line === 3) {
      inum = era.get(`cflag:${arg2}:570`) || 0; // CFLAG:570 配下怪物
      if (inum < 100) {
        row.id = 0;
        return 0;
      }
      first_count = 1;
    } else if (line === 4) {
      inum = era.get(`cflag:${arg3}:570`) || 0;
      if (inum < 100) {
        row.id = 0;
        return 0;
      }
      first_count = 1;
    } else {
      // LINE == 5（X 的怪物数据取得）
      if (inum < 100) {
        row.id = 0;
        return 0;
      }
      first_count = 1;
    }
  } else {
    // GROUP 战用——全库无调用方传 GROUP，结构保留
    if (line >= 0 && line < 3) {
      const held = era.get(`item:${inum}`) || 0;
      if (held <= 100) {
        first_count = rand_n(100) + 200;
        inum = 190;
      } else if (held > 300) {
        first_count = rand_n(100) + 200;
      } else {
        first_count = held;
      }
    } else {
      if (inum < 1000) {
        inum = 1000 + rand_n(10) + 10 * (group - 1);
      }
      first_count = rand_n(100) + 200;
    }
  }

  // —— 状態異常初期化 ——
  row.status = 0;

  // —— ボス化判定 ——
  // 第二分支（&& GROUP）是第一分支的真子集，恒冗余——保留现状
  if (inum === 190) {
    // 骷髅兵不 boss 化
    row.boss = 0;
  } else if (first_count <= 1 && line < 3) {
    row.boss = 1;
  } else {
    row.boss = 0;
  }

  // —— 数量第二骰 LOCAL:0 ——
  let second_count;
  if (group === -1) {
    if (line >= 0 && line < 3) {
      const held = era.get(`item:${inum}`) || 0;
      if (inum >= 600) {
        second_count = rand_n(10) + 1;
      } else if (held <= 0 || held > 10) {
        second_count = rand_n(10) + 1;
      } else {
        second_count = held;
      }
    } else {
      second_count = 1;
    }
  } else if (line >= 0 && line < 3) {
    const held = era.get(`item:${inum}`) || 0;
    if (held <= 100 || held > 300) {
      second_count = rand_n(100) + 200;
    } else {
      second_count = held;
    }
  } else {
    second_count = rand_n(150) + 100;
  }

  // 该列怪物数
  row.count = second_count;

  // —— 怪物函数分发 ——
  const source = MONSTER_DATABASE[inum];
  if (source !== undefined) {
    row.id = source.番号;
    row.level = source.等级;
    row.attack = source.攻击力;
    row.defense = source.防御力;
    row.speed = source.速度;
    row.special = source.特殊;
    row.magic = source.魔法;
    row.rape_type = source.凌辱类型;
    row.resistance = source.耐性;
  } else if (inum >= 1000 && inum < 2000) {
    enemy_data_check(inum, line);
  } else {
    // ELSE 分支：未知识别号 → 骷髅兵（skeleton 的 ARG:1 用勇者A）
    skeleton(line, arg2, rand_n);
  }

  // —— 精英のお供 ——
  if (arg2 === -1) {
    arg2 = 0;
  }
  const is_elite_follower =
    (era.get(`talent:${arg2}:220`) || 0) === 1 && // TALENT:220 精英
    ((era.get(`cflag:${arg2}:0`) || 0) >= 1 || arg2 === 0);
  if (is_elite_follower) {
    // 精英のお供はボス化しない
    row.boss = 0;
    // 2回の抽選の結果、多い方を採用
    if (second_count < first_count) {
      second_count = first_count;
    }
  } else if (second_count > first_count) {
    // 2回の抽選の結果、少ない方を採用
    second_count = first_count;
  }

  // —— 兵種による特性変化 ——
  const extra = monster_extra(inum);
  const mod = extra % 100;
  if (mod === 1) {
    // 上級化
    row.attack += rand_n(Math.floor(lv / 2)) + 1;
    row.defense += rand_n(Math.floor(lv / 2)) + 1;
  } else if (mod === 2) {
    // 地形適応
    row.special = 17;
    row.defense += rand_n(Math.floor(lv / 2)) + 1;
  } else if (mod === 3) {
    // 酸性（鎧破壊）
    row.special = 4;
    row.attack += rand_n(Math.floor(lv / 2)) + 1;
  } else if (mod === 4) {
    // 猛毒
    row.attack += rand_n(lv) + 1;
  } else if (mod === 5) {
    // 装甲
    row.defense += rand_n(lv) + 1;
  }
  const troop = Math.floor(extra / 100) % 100;
  if (troop === 1) {
    // 弓兵（射撃）
    row.special = 16;
    row.attack += rand_n(lv) + 1;
  } else if (troop === 2) {
    // 魔導兵（エナジーボルト）
    row.magic = 3;
    row.attack += rand_n(lv) + 1;
  } else if (troop === 3) {
    // 催眠師（スリープ）
    row.magic = 2;
    row.defense += rand_n(lv) + 1;
  } else if (troop === 4 && (era.get('flag:83') || 0) > 0) {
    // 肉鎧兵（肉鎧；FLAG:83 是肉铠库存）
    row.special = 18;
    row.defense += rand_n(lv) + 1;
  }

  // —— 怪物ステータス補正 ——
  let local = row.level;
  row.level = local + 4; // 等级 +4
  local *= 2; // テコ入れ

  // 知識による特定の怪物の強化
  if ((era.get('talent:0:327') || 0) === 1 && row.rape_type === 9) {
    // 淫魔知识：女魔族 1.5 倍
    local += Math.floor(local / 2);
  }
  if ((era.get('talent:0:328') || 0) === 1 && row.rape_type === 3) {
    // 魔虫知识：昆虫 1.5 倍
    local += Math.floor(local / 2);
  }

  // ダンジョンレベルに応じて強化（怪物レベルの分だけダイス）
  let lvup = 0;
  for (let i = 0; i < local; i += 1) {
    lvup += rand_n(lv);
  }

  row.attack = row.attack * 2 + lvup;
  row.defense = row.defense * 2 + lvup;

  // —— 精英のお供を強化 ——
  const follower_lv = era.get(`cflag:${arg2}:9`) || 0;
  if (is_elite_follower) {
    row.attack += follower_lv;
    row.defense += follower_lv;
    // 精英と怪物が同じ种族なら更に強化（TALENT:319 种族2）
    if ((era.get(`talent:${arg2}:319`) || 0) === row.rape_type) {
      row.attack += follower_lv;
      row.defense += follower_lv;
    }
  }
  return 0;
}

module.exports = {
  campaign_dungeon_lv,
  enemy_data_check,
  item_name,
  monster_data,
  monster_setup,
  monster_setup_able,
  skeleton,
  monster_extra,
  monstername,
  monster_name,
};
