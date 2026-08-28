/**
 * @file 怪物状态生成（issue #175，阶段 3 H6）：@MONSTER_DATA 分发器与
 *     骷髅兵、怪物名两个纯函数。
 *
 * 源: target/ERB/怪物相關/MONSTER_DATA.ERB  @MONSTER_DATA（:2-461，
 *       分发器）、@SKELETON（:1994-2032，动态等级的骷髅兵）、
 *       @MONSTERNAME（:2701-2766，#FUNCTIONS 名字拼接）、@MONSTER_NAME
 *       （:2772-2878，打印型名字拼接）
 *
 * **为什么随 H6 落地（隐性硬前置，SOP §2 判据）**：H6 票面只有两个战斗
 * 文件的 22 个函数，但 @DUNGEON_PARTY_BATTLE 的怪物全靠本函数写进 E 数组
 * （怪物相關/MONSTER_DATA.ERB 是 E 数组的唯一写者）——存根化的后果实测
 * 推演：E 全空 → @DEATH_CHECK 的怪物侧 ALIVE == 0 → RETURN 1 → 勇者每战
 * 必胜且 @MONSTER_ATTACK 因 MEMBER == 0 直接返回，**勇者不掉血**，本票
 * 「让勇者会被打退」的核心交付落空。与 #169 把 CHARA_MAKE 拉进阶段 3 成
 * 为 H1 是同一形态。怪物属性数据在 ere/data/monster-database.js（#168
 * 裁定 6 先例）。
 *
 * 移植说明（有意偏离，均注明依据）：
 *   - **E 数组走引擎变量**（yml/E.yml 建桶，见该文件头注）：数字下标寻址
 *     `era.get/set('e:N')`，读写帮手 e_get/e_set 收口（getter 一律 || 0
 *     兜底——Emuera 的 E 全区初始 0，ere 侧未写槽读 undefined）；
 *   - ere 无全局 RAND 序列（#117），随机经注入的 rand 掷出（缺省
 *     Math.random——run_dungeon 第二参先例）；
 *   - 原作 88 个怪物函数 → 数据表查表（MONSTER_DATABASE）；@SKELETON 的
 *     动态等级保留为函数；
 *   - 原作 GROUP 战用段（:154-170 的 GROUP != -1 臂）无调用方传 GROUP
 *     （全库 CALL MONSTER_DATA 均 4 参以内），结构 1:1 保留、注释标注；
 *   - 名字拼接（@MONSTERNAME 的 #FUNCTIONS 与 @MONSTER_NAME 的 PRINT 链）
 *     改为返回字符串，由调用方并入一次 era.print（引擎 print 每调用一行，
 *     同显示行归并先例）；
 *   - ITEM:INUM（怪物所持数，经济的怪物库存）经 `item:${inum}` 寻址
 *     （ere 侧 game-stronghold.js 等先例；Emuera ITEM = data.item.hold）。
 */

'use strict';

const era = require('#/era-electron');
const { stub_line } = require('#/utils/stub-line');
const { MONSTER_DATABASE } = require('#/data/monster-database');

/** 原作 RAND:N（0..N-1）的缺省实现 */
function default_rand(n) {
  return Math.floor(Math.random() * n);
}

/**
 * 本文件存根化的原作调用名（docs/stub-registry.md 核对）。
 */
const STUBBED_CALLS = ['CAMPAIGN_DUNGEON_LV'];

/**
 * @CAMPAIGN_DUNGEON_LV 存根（侵略/CAMPAIGN/；战役票，阶段 5）：战役迷宫
 * 的等级表。存根返回 0（#175 登记）。
 * @returns {number} 原作 RESULT（存根恒 0）
 */
function campaign_dungeon_lv() {
  return stub_line('CAMPAIGN_DUNGEON_LV', '战役迷宫等级', '随战役票（阶段 5）');
}

/** E 数组读：未写槽兜 0（Emuera 全局数组初始 0 的等价物） */
function e_get(i) {
  return era.get(`e:${i}`) || 0;
}

/** E 数组写 */
function e_set(i, v) {
  era.set(`e:${i}`, v);
}

/** 怪物名（Item.yml 的登记名；原作 %ITEMNAME:ID%） */
function item_name(id) {
  return era.get(`itemname:${id}`) ?? '';
}

/**
 * @SKELETON（:1994-2032）：骷髅兵——等级随掷点或阶层动态，所以不进
 * 数据表。ARG:1 < 0 时 RAND:9+1，否则用 ARG:1 的当前阶层（CFLAG:501）。
 * @param {number} top 列头（原作 ARG:0）
 * @param {number} arg1 怪物持有者的角色号（原作 ARG:1；-1 = 无）
 * @param {(n: number) => number} rand RAND:N 随机源
 */
function skeleton(top, arg1, rand) {
  let lv;
  if (arg1 < 0) {
    lv = rand(9) + 1;
  } else {
    lv = era.get(`cflag:${arg1}:501`) || 0;
  }
  e_set(top, 190); // 怪物番号
  e_set(top + 1, lv + 1); // 等级
  e_set(top + 2, lv + 1); // 攻击力
  e_set(top + 3, lv + 1); // 防御力
  e_set(top + 4, 0); // 速度
  e_set(top + 5, 0); // 特殊
  e_set(top + 6, 0); // 魔法
  e_set(top + 7, 0); // 凌辱类型
  e_set(top + 10, 0); // 耐性
}

/**
 * 怪物改造位（FLAG:(怪物番号 + 700)）：低两位 = 强化改造、百位段 = 兵种，
 * 拼名与生成都读它（@MONSTERNAME / @MONSTER_NAME / @MONSTER_DATA 共用）。
 * @param {number} id 怪物识别号
 * @returns {number} 改造位（原作 EXTRA）
 */
function monster_extra(id) {
  return era.get(`flag:${id + 700}`) || 0;
}

/**
 * @MONSTERNAME（:2701-2766）：怪物名拼接（#FUNCTIONS——返回字符串）。
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
 * @MONSTER_NAME（:2772-2878）：打印型名字拼接。与 @MONSTERNAME 同构
 * （前缀 + 名 + 兵种）；原作第二参（1 = 空格配置）控制的 STRLENS 半角
 * 字宽对齐段无 era 通道（引擎 print 自适应布局），不移植（注释留痕），
 * 签名相应只留识别号。
 * @param {number} id 怪物识别号
 * @returns {string} 拼接名（供调用方并入一次 era.print）
 */
function monster_name(id) {
  // :2861-2875 的 STRLENS 空格对齐段：ere 无字宽对齐通道，不移植
  return monstername(id);
}

/**
 * @MONSTER_DATA（:2-461）：把怪物写进 E 数组的一列。
 *
 * 流程：等级骰 → 数量两骰（GROUP 战取大、常规则取小）→ boss 化 →
 * 查数据表写属性 → 精英随从修正 → 兵种改造补正 → 迷宫等级缩放。
 *
 * @param {number} inum 怪物识别号（原作 ARG:0；可被本函数改写为 190 骷髅）
 * @param {number} line 队列（原作 ARG:1：0-2 防御三列、3 = 勇者(A)配下、
 *   4 = 勇者(T)配下、5 = X 的怪物数据取得；列头 = line * 100）
 * @param {number} [arg2] 勇者A（原作 ARG:2，缺省 -1；LINE == 3 与骷髅战用）
 * @param {number} [arg3] 奴隶的对手勇者T（原作 ARG:3，缺省 -1；LINE == 4 用）
 * @param {number} [group] GROUP 战分组（原作 GROUP，缺省 -1；全库无调用方
 *   传它，结构 1:1 保留）
 * @param {(n: number) => number} [rand] RAND:N 随机源（缺省均匀随机）
 * @returns {number} 原作 RETURN 0
 */
function monster_data(inum, line, arg2 = -1, arg3 = -1, group = -1, rand) {
  const rand_n = rand ?? default_rand;
  const top = line * 100; // TOP = 列头

  // —— 怪物生成レベル（:96-110）——
  let lv;
  if (inum >= 600) {
    // イベント領域のモンスター：CAMPAIGN_DUNGEON_LV（战役等级，存根恒 0
    // → LV = 2；RAND:10 < 0 恒假不加）
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

  // —— 数量第一骰 LOCAL:1（:112-170）——
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
        e_set(top, 0);
        return 0;
      }
      first_count = 1;
    } else if (line === 4) {
      inum = era.get(`cflag:${arg3}:570`) || 0;
      if (inum < 100) {
        e_set(top, 0);
        return 0;
      }
      first_count = 1;
    } else {
      // LINE == 5（X 的怪物数据取得）
      if (inum < 100) {
        e_set(top, 0);
        return 0;
      }
      first_count = 1;
    }
  } else {
    // GROUP 战用（:154-170）——全库无调用方传 GROUP，结构 1:1 保留
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

  // —— 状態異常初期化（:171-172）——
  e_set(top + 9, 0);

  // —— ボス化判定（:174-182）——
  // 第二臂（&& GROUP）是第一臂的真子集，恒冗余——原作现状，1:1 保留
  if (inum === 190) {
    // 骷髅兵不 boss 化
    e_set(top + 8, 0);
  } else if (first_count <= 1 && line < 3) {
    e_set(top + 8, 1);
  } else {
    e_set(top + 8, 0);
  }

  // —— 数量第二骰 LOCAL:0（:184-214）——
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

  // E:Y+99（その列の怪物の数）
  e_set(top + 99, second_count);

  // —— 怪物函数分发（:216-339）——
  const row = MONSTER_DATABASE[inum];
  if (row !== undefined) {
    e_set(top, row.番号);
    e_set(top + 1, row.等级);
    e_set(top + 2, row.攻击力);
    e_set(top + 3, row.防御力);
    e_set(top + 4, row.速度);
    e_set(top + 5, row.特殊);
    e_set(top + 6, row.魔法);
    e_set(top + 7, row.凌辱类型);
    e_set(top + 10, row.耐性);
  } else {
    // ELSE 臂：未知识别号 → 骷髅兵（SKELETON 的 ARG:1 用勇者A）
    skeleton(top, arg2, rand_n);
  }

  // —— 精英のお供（:341-355）——
  if (arg2 === -1) {
    arg2 = 0;
  }
  const is_elite_follower =
    (era.get(`talent:${arg2}:220`) || 0) === 1 && // TALENT:220 精英
    ((era.get(`cflag:${arg2}:0`) || 0) >= 1 || arg2 === 0);
  if (is_elite_follower) {
    // 精英のお供はボス化しない
    e_set(top + 8, 0);
    // 2回の抽選の結果、多い方を採用
    if (second_count < first_count) {
      second_count = first_count;
    }
  } else if (second_count > first_count) {
    // 2回の抽選の結果、少ない方を採用
    second_count = first_count;
  }

  // —— 兵種による特性変化（:357-419）——
  const extra = monster_extra(inum);
  const mod = extra % 100;
  if (mod === 1) {
    // 上級化
    e_set(top + 2, e_get(top + 2) + rand_n(Math.floor(lv / 2)) + 1);
    e_set(top + 3, e_get(top + 3) + rand_n(Math.floor(lv / 2)) + 1);
  } else if (mod === 2) {
    // 地形適応
    e_set(top + 5, 17);
    e_set(top + 3, e_get(top + 3) + rand_n(Math.floor(lv / 2)) + 1);
  } else if (mod === 3) {
    // 酸性（鎧破壊）
    e_set(top + 5, 4);
    e_set(top + 2, e_get(top + 2) + rand_n(Math.floor(lv / 2)) + 1);
  } else if (mod === 4) {
    // 猛毒
    e_set(top + 2, e_get(top + 2) + rand_n(lv) + 1);
  } else if (mod === 5) {
    // 装甲
    e_set(top + 3, e_get(top + 3) + rand_n(lv) + 1);
  }
  const troop = Math.floor(extra / 100) % 100;
  if (troop === 1) {
    // 弓兵（射撃）
    e_set(top + 5, 16);
    e_set(top + 2, e_get(top + 2) + rand_n(lv) + 1);
  } else if (troop === 2) {
    // 魔導兵（エナジーボルト）
    e_set(top + 6, 3);
    e_set(top + 2, e_get(top + 2) + rand_n(lv) + 1);
  } else if (troop === 3) {
    // 催眠師（スリープ）
    e_set(top + 6, 2);
    e_set(top + 3, e_get(top + 3) + rand_n(lv) + 1);
  } else if (troop === 4 && (era.get('flag:83') || 0) > 0) {
    // 肉鎧兵（肉鎧；FLAG:83 是肉铠库存）
    e_set(top + 5, 18);
    e_set(top + 3, e_get(top + 3) + rand_n(lv) + 1);
  }

  // —— 怪物ステータス補正（:421-437）——
  let local = e_get(top + 1);
  e_set(top + 1, local + 4); // 等级 +4
  local *= 2; // テコ入れ

  // 知識による特定の怪物の強化
  if ((era.get('talent:0:327') || 0) === 1 && e_get(top + 7) === 9) {
    // 淫魔知识：女魔族 1.5 倍
    local += Math.floor(local / 2);
  }
  if ((era.get('talent:0:328') || 0) === 1 && e_get(top + 7) === 3) {
    // 魔虫知识：昆虫 1.5 倍
    local += Math.floor(local / 2);
  }

  // ダンジョンレベルに応じて強化（怪物レベルの分だけダイス）
  let lvup = 0;
  for (let i = 0; i < local; i += 1) {
    lvup += rand_n(lv);
  }

  e_set(top + 2, e_get(top + 2) * 2 + lvup);
  e_set(top + 3, e_get(top + 3) * 2 + lvup);

  // —— 精英のお供を強化（:443-456）——
  const follower_lv = era.get(`cflag:${arg2}:9`) || 0;
  if (is_elite_follower) {
    e_set(top + 2, e_get(top + 2) + follower_lv);
    e_set(top + 3, e_get(top + 3) + follower_lv);
    // 精英と怪物が同じ种族なら更に強化（TALENT:319 种族2）
    if ((era.get(`talent:${arg2}:319`) || 0) === e_get(top + 7)) {
      e_set(top + 2, e_get(top + 2) + follower_lv);
      e_set(top + 3, e_get(top + 3) + follower_lv);
    }
  }
  return 0;
}

module.exports = {
  STUBBED_CALLS,
  e_get,
  e_set,
  item_name,
  monster_data,
  skeleton,
  monster_extra,
  monstername,
  monster_name,
};
