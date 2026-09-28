/**
 * @file 迷宫陷阱（issue #176，阶段 3 H7）：dungeon_trap 与全部陷阱段。
 *
 * 局部变量语义（词汇表）：
 *   A = 受陷阱者（调用方掷选）   TRAP_COUNT = 陷阱试行计数
 *   TRAP_NUM = 陷阱的 FLAG 槽号（300-308/310-318/320-328 = 各层 A/B/C）
 *   TRAP_ID = 陷阱的道具编号（60-85、87）   TRAP_NOUSE = 未作动标志
 *   D:4 = 陷阱试行次数（装备「陷阱誘発」强度，调用方给出）
 *
 * 说明（有意偏离，均注明依据）：
 *   - **SAVESTR 无引擎通道**（#171 钉下）：名字承载一律 `callname:${id}:-1`
 *     （#5 决议），统一走本文件 name_of；
 *   - ere 无全局 RAND 序列（#117），随机经注入的 rand_n 掷出（缺省
 *     Math.random，run_dungeon 第二参透传——迷宫与陷阱共用同一随机源，
 *     #175 对比测试与 ENDING_2 e2e 的种子确定性依赖这一点）；
 *   - 全局 A / TARGET / RESULT / D:4 / D:20 的换手改显式传参与返回值
 *     （#5 决议第六条）：A 与 D:4 → dungeon_trap 前两参；TARGET →
 *     era_flag.target；各陷阱段的 RETURN → 陷阱函数返回值（1 = 未作动，
 *     调用方据此跳过消耗与补货）；D:20（侵攻度）经 ctx 对象回写——
 *     TELEPORT 写、ONE_WAY/SHOOT 读；调用点（dungeon.js 陷阱段）在
 *     调用后把 ctx.d20 收回 walk20，等价于以全局 D 槽
 *     共享侵攻度；
 *   - D:1（帰還フラグ，六处写 1）：全库
 *     无读者（#172 已核，AGENT 版是死代码），
 *     不落变量、注释留痕；
 *   - TIMES X, 0.80 / 1.30 → Math.floor(x * 0.8 / 1.3)（截断——整数乘小数
 *     后舍去小数部分）；
 *   - SETCOLORBYNAME / RESETCOLOR（A_WORM 段与诈骗陷阱多处）：
 *     配色不做、注释留痕（#175 同款结论——玩家可见的行序与文案完全一致）；
 *   - PLAYER = 0（A_WORM / LOVE_BUG 段）：_AUTO 本体不读（只读
 *     TARGET），三连第三站的结算读（source-check.js 的
 *     player = era_flag.player → player_skill_check 连乘）——迷宫路径上
 *     不落变量、注释留痕（#175 先例）；
 *   - MONEY / EX_FLAG:4444 → era_flag.money / era_exflag.legit_money
 *     （dungeon.js 先例）；
 *   - KARMA（DARK_JUEL 段）经函数内延迟 require 引用 dungeon.js 的
 *     域内存根（避开循环初始化，#175 先例）；
 *   - BEFORE_AUTOTRAIN 经模块对象引用 dungeon-battle.js 的同名转发（该
 *     转发自 #508 起指向 ere/event/event-autotrain.js 的真身），测试可替换；
 *     COM50_AUTO 自 #500 起直调 ere/event/event-autotrain.js 的真身；
 *     CAMPAIGN_TRAP 是 #469 起的族真身；SUMMON_MONSTER 已复用
 *     monster-summon.js 真身；
 *   - PRINT/PRINTFORM 不换行、PRINTL/PRINTFORML 换行：同一显示行
 *     的拼接归并为一次 era.print（引擎 print 每调用一行，dungeon.js
 *     先例）；PRINTW/PRINTFORMW 是 print + 读键；
 *   - CFLAG:503 是位域（门面名「休憩」只覆盖位 0）：位 1 = 诅咒、位 3 =
 *     润滑（ヌルヌル）、位 6 = 落下、位 9 = 欲情——位操作一律裸寻址；
 *   - 诈骗陷阱的数值效果（MONEY/CFLAG:580/582 转移）整体在 FLAG:5 & 32
 *     显示开关内（关日志时整个陷阱不触发）——保留现状；
 *   - RETURN 01（LOVE_BUG 段）是十进制 1 的前导零写法，非八进制。
 */

'use strict';

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { chara } = require('#/facade/chara');
const { DispatchFamily } = require('#/system/dispatch/dispatch-family');
// 迎击分断（SHOOT 的 PARTY_DEL）经模块对象引用——测试可替换导出断言
// 被调（battle_mod 同款；解构绑定会让替换失效）
const party_mod = require('#/dungeon/dungeon-party');
// 自动调教前置复用 #175 的域内存根（经模块对象引用——测试可替换导出断言
// 被调，dungeon-battle2.js 先例）；四个 _AUTO 变体直接 require
// event-autotrain.js 的真身（#500，dungeon-town.js:775 先例）
const battle = require('#/dungeon/dungeon-battle');
const summon_mod = require('#/dungeon/monster-summon');

/**
 * CAMPAIGN_TRAP_{FLAG:400} 族：战役迷宫的陷阱槽读值（#469，决议 #7）。
 * 键是 FLAG:400，声明空间 {1}（page-campaign.js 文件头同款依据）；实现在
 * ere/page/page-campaign-1.js 注册。
 */
const campaign_trap_family = new DispatchFamily('CAMPAIGN_TRAP', [1]);

/** 名字承载（#5 决议；savestr 通道不存在，文件头） */
function name_of(cid) {
  return era.get(`callname:${cid}:-1`) ?? '';
}

/** RAND:N（0..N-1）的缺省实现 */
function default_rand(n) {
  return Math.floor(Math.random() * n);
}

/** 指定 CFLAG 位是否立起（CFLAG:503 位域，文件头） */
function cbit(cid, idx, bit) {
  return ((era.get(`cflag:${cid}:${idx}`) || 0) & bit) !== 0;
}

// —— 战役陷阱槽（#469 起族真身）——

/**
 * campaign_trap：战役迷宫的陷阱槽读值。
 *
 * RESULT 预置 0（非 -1）：CAMPAIGN_TRAP_1 的 SELECTCASE 对未登记的
 * trap_num 也是落 TRAP_ID = 0（默认值），与「陷阱槽
 * 无陷阱」同值——本文件的三处 `TRAP_ID < 0` 判断条件因此在战役分支
 * 同样不可达（与非战役分支同构，era.get 也从不
 * 产生负值）。
 * @param {number} trap_num FLAG 槽号
 * @returns {Promise<number>} 该槽的陷阱 ID（FLAG:400 < 1 时恒 0）
 */
async function campaign_trap(trap_num) {
  const active = era_flag.hero_campaign_active;
  if (active < 1) {
    return 0;
  }
  return campaign_trap_family.call(active, {
    whenMissing: 0,
    args: [trap_num],
  });
}

/**
 * trap_price：陷阱的价格表（SIF 逐条 RETURN，末条
 * 100——86 号空档与其余未登记 ID 都取 100）。经全局 P 传参、RESULT
 * 返回的写法改为参数与返回值（#5 决议第六条）。
 * @param {number} p 陷阱的道具编号
 * @returns {number} 价格
 */
function trap_price(p) {
  // 逐条价格（与 yml/Item.yml 的 price 一致的冗余表，保留）
  const PRICES = {
    60: 10,
    61: 50,
    62: 80,
    63: 100,
    64: 120,
    65: 150,
    66: 170,
    67: 180,
    68: 190,
    69: 1000,
    70: 180,
    71: 90,
    72: 10,
    73: 70,
    74: 200,
    75: 180,
    76: 300,
    77: 50,
    78: 110,
    79: 80,
    80: 60,
    81: 20,
    82: 40,
    83: 40,
    84: 40,
    85: 100,
    87: 100,
  };
  return PRICES[p] ?? 100; // 未登记的默认价
}

/**
 * dungeon_trap：陷阱处理主循环。
 *
 * 每轮试行：迎击方先补充陷阱（SLAVE_TRAP_SET），非侵攻勇者直接返回；
 * 按 A→B→C 槽（FLAG:300-308/310-318/320-328，槽号 = 层数 + 299/309/319）
 * 找到首个有陷阱的槽，做同一陷阱连击回避判定（CFLAG:513 记忆上次发动、
 * 512 是连击计数：回避阈值 20 - 512），再按 TRAP_ID 分发到 26+1 个陷阱
 * 段；作动（RESULT 0）时消耗一个库存（仅侵攻中）并记忆 513，「自动补
 * 陷阱」配置（FLAG:5 位 6）开着时按价补回一个。全部试行结束后 WAIT。
 *
 * 全空槽的世界（新档 FLAG:300-328 全 0）不消费任何随机数——e2e 与对比
 * 测试的 PRNG 序列不因本函数换真身而改变（TRAP_ID = 0 命中 ITEM:0 < 1
 * 分支，ELSEIF 链短路掉 RAND:20）。
 *
 * @param {number} a 受陷阱者（全局 A；调用方掷选）
 * @param {number} tries 试行次数（D:4；装备「陷阱誘発」强度）
 * @param {(n: number) => number} [rand] RAND:N 随机源（缺省均匀随机）
 * @param {{d20: number}} ctx 侵攻度 D:20 的共享槽（TELEPORT 写、
 *   ONE_WAY/SHOOT 读；调用点在返回后收回）
 * @returns {Promise<{d20: number}>} 恒 return 0（ctx 随引用带回）
 */
async function dungeon_trap(a, tries, rand, ctx) {
  const rand_n = rand ?? default_rand;
  const settings = era.get('flag:5') || 0;
  const show = (settings & 32) !== 0;

  // SIF D:4 <= 0 → D:4 = 1
  const d4 = tries > 0 ? tries : 1;

  // FOR TRAP_COUNT, 0, D:4
  for (let trap_count = 0; trap_count < d4; trap_count += 1) {
    // 迎撃中？
    if (chara(a).invasion.状态 === 3) {
      await slave_trap_set(a);
    }

    // 侵攻中の勇者？（2 = 侵攻 / 12 = 战役；迎击 3 在上一行已处理）
    const place = chara(a).invasion.状态;
    if (place !== 2 && place !== 12) {
      return ctx;
    }

    // FLAG 槽布局：300-308 = A / 310-318 = B / 320-328 = C；
    // CFLAG:A:501 是现在的阶层

    // 陷阱がＡにあるか？
    let trap_num = chara(a).dungeon.侵攻阶层 + 299;
    let trap_id = era.get(`flag:${trap_num}`) || 0;
    if (place === 12) {
      trap_id = await campaign_trap(trap_num);
    }

    // Ａになければ陷阱がＢにあるか？
    if (trap_id < 0) {
      trap_num = chara(a).dungeon.侵攻阶层 + 309;
      trap_id = era.get(`flag:${trap_num}`) || 0;
      if (place === 12) {
        trap_id = await campaign_trap(trap_num);
      }
    }

    // $TRAP_LOOP（TRAP_NUM += 10 → < 330 则回循环头）
    for (;;) {
      trap_id = era.get(`flag:${trap_num}`) || 0;
      if (place === 12) {
        trap_id = await campaign_trap(trap_num);
      }

      // 陷阱がＣにあるか？
      if (trap_id < 0) {
        trap_num = chara(a).dungeon.侵攻阶层 + 319;
        trap_id = era.get(`flag:${trap_num}`) || 0;
        if (place === 12) {
          trap_id = await campaign_trap(trap_num);
        }
        if (trap_id < 0) {
          return ctx; // RETURN 0（不经尾部 WAIT）
        }
      }

      // 想定外の結果にならないための保険（RESULT = 0）
      let trap_result = 0;

      // 同一罠発動による回避率上昇 / 罠回避率の減少
      let c512 = era.get(`cflag:${a}:512`) || 0;
      const c513 = era.get(`cflag:${a}:513`) || 0;
      if (c513 === trap_id) {
        c512 += 1;
      }
      if (c513 === 0) {
        c512 -= 1;
      }

      // 記憶リセット（罠の回避や失敗で連鎖が途切れるように）
      era.set(`cflag:${a}:513`, 0);

      // 回避率は負にはならない
      if (c512 < 0) {
        c512 = 0;
      }

      // 同一罠発動失敗判定
      const trap_miss = 20 - c512;

      // 在庫なし / 回避 / 26+1 段分发（ELSEIF 链——ITEM < 1 时
      // RAND:20 不掷，e2e 序列稳定的关键）
      if ((era.get(`item:${trap_id}`) || 0) < 1) {
        // 在庫なしの場合は何もしません
        c512 -= 1;
        era.set(`cflag:${a}:512`, c512);
      } else if (trap_miss < rand_n(20)) {
        // ≪同一陷阱发动限制≫
        if (show) {
          era.print('≪同一陷阱发动限制≫勇者回避了陷阱……');
        }
        c512 -= 1;
        era.set(`cflag:${a}:512`, c512);
      } else if (trap_id === 60) {
        trap_result = await pit_trap(a, rand_n, ctx); // 落穴
      } else if (trap_id === 61) {
        trap_result = await arrow_trap(a, rand_n, ctx); // 射箭
      } else if (trap_id === 62) {
        trap_result = await teleport_trap(a, rand_n, ctx); // 传送
      } else if (trap_id === 63) {
        trap_result = await one_way_trap(a, rand_n, ctx); // 单向通行
      } else if (trap_id === 64) {
        trap_result = await love_gas_trap(a, rand_n, ctx); // 催淫
      } else if (trap_id === 65) {
        trap_result = await syokusyu_floor_trap(a, rand_n, ctx); // 触手地板
      } else if (trap_id === 66) {
        trap_result = await love_bath_trap(a, rand_n, ctx); // 媚药泥沼
      } else if (trap_id === 67) {
        trap_result = await self_saimin_trap(a, rand_n, ctx); // 自慰催眠
      } else if (trap_id === 68) {
        trap_result = await imitater_trap(a, rand_n, ctx); // 拟态房间
      } else if (trap_id === 69) {
        trap_result = await summon_trap(a, rand_n, ctx); // 召唤
      } else if (trap_id === 70) {
        trap_result = await succubus_trap(a, rand_n, ctx); // 梦魔
      } else if (trap_id === 71) {
        trap_result = await slime_room_trap(a, rand_n, ctx); // 史莱姆房间
      } else if (trap_id === 72) {
        trap_result = await net_trap(a, rand_n, ctx); // 蜘蛛网
      } else if (trap_id === 73) {
        trap_result = await shop_trap(a, rand_n, ctx); // 奸商
      } else if (trap_id === 74) {
        trap_result = await blackout_trap(a, rand_n, ctx); // 黑暗
      } else if (trap_id === 75) {
        trap_result = await shoot_trap(a, rand_n, ctx); // 弹射
      } else if (trap_id === 76) {
        trap_result = await dispell_trap(a, rand_n, ctx); // 魔力扩散
      } else if (trap_id === 77) {
        trap_result = await oil_trap(a, rand_n, ctx); // 油壶
      } else if (trap_id === 78) {
        trap_result = await fire_trap(a, rand_n, ctx); // 火箭
      } else if (trap_id === 79) {
        trap_result = await a_worm_trap(a, rand_n, ctx); // 肛门虫
      } else if (trap_id === 80) {
        trap_result = await love_bug_trap(a, rand_n, ctx); // 淫虫
      } else if (trap_id === 81) {
        trap_result = await dark_juel_trap(a, rand_n, ctx); // 宝石
      } else if (trap_id === 82) {
        trap_result = await def_down_trap(a, rand_n, ctx); // 攻击阵地
      } else if (trap_id === 83) {
        trap_result = await atk_down_trap(a, rand_n, ctx); // 防御阵地
      } else if (trap_id === 84) {
        trap_result = await mag_down_trap(a, rand_n, ctx); // 魔法阵地
      } else if (trap_id === 85) {
        trap_result = await all_down_trap(a, rand_n, ctx); // 鬼手
      } else if (trap_id === 87) {
        trap_result = await fraud_trap(a, rand_n, ctx); // 诈骗陷阱
      }

      // 罠が作動したかどうかを RETURN の値で判断（未作動时跳过
      // 下方的罠消費と自動補充——一方通行とシュートでのみ 1）
      const trap_nouse = trap_result;

      // 罠消費（仅侵攻中）
      if (
        trap_id >= 60 &&
        trap_id <= 89 &&
        (era.get(`item:${trap_id}`) || 0) > 0 &&
        trap_nouse === 0 &&
        place === 2
      ) {
        era.set(`item:${trap_id}`, (era.get(`item:${trap_id}`) || 0) - 1);
      }

      // 陷阱発動記憶
      if (trap_nouse === 0) {
        era.set(`cflag:${a}:513`, trap_id);
      }

      // 陷阱自動補充（FLAG:5 位 6）
      if ((settings & 64) !== 0 && trap_nouse === 0 && place === 2) {
        const price = trap_price(trap_id);
        if (
          era_flag.money >= price &&
          (era.get(`item:${trap_id}`) || 0) < 99 &&
          trap_id >= 60 &&
          trap_id <= 89
        ) {
          era.set(`item:${trap_id}`, (era.get(`item:${trap_id}`) || 0) + 1);
          era_flag.money -= price;
          era_exflag.legit_money -= price;
        }
      }

      // TRAP_NUM += 10 → SIF TRAP_NUM < 330 GOTO TRAP_LOOP
      trap_num += 10;
      if (trap_num >= 330) {
        break;
      }
    }
    // ABC 的循环结束、D:4 的试行次数还有剩 → 再从 A 回起
  }

  // WAIT
  await era.waitAnyKey();

  return ctx;
}

// —— 26 个陷阱段。签名统一 (a, rand_n, ctx)：a = 受者（全局
//    A）、rand_n = 随机源、ctx = { d20 }（侵攻度共享槽，文件头）。
//    返回值 = RETURN（1 = 未作动——调用方跳过消耗与补货）。——

/**
 * pit_trap：落穴（ITEM:60）。
 * @param {number} a 受者
 * @param {(n: number) => number} rand_n 随机源
 * @param {{d20: number}} ctx 侵攻度共享槽（本段不读写）
 * @returns {Promise<number>} RETURN（1 = 未作动）
 */
async function pit_trap(a, rand_n) {
  const settings = era.get('flag:5') || 0;
  const show = (settings & 32) !== 0;
  const name = name_of(a);
  const diff = era.get('flag:85') || 0;

  // 落下フラグ（位 6）
  if (cbit(a, 503, 64)) {
    if (show) {
      era.print('连续落下！（气力-10） ');
    }
    chara(a).dungeon.气力 -= 10;
  } else {
    if (show) {
      era.print('地板打开了！ ');
    }
    // 落下フラグON
    era.set(`cflag:${a}:503`, (era.get(`cflag:${a}:503`) || 0) + 64);
  }

  let dice = rand_n(100);

  // 天使（TALENT:314 == 6）/ 堕天使（== 8）及时飞起
  if ((era.get(`talent:${a}:314`) || 0) === 6) {
    if (show) {
      era.print(`天使族的${name}及时地飞起来，避开了落穴… `);
    }
    return 1;
  }
  if ((era.get(`talent:${a}:314`) || 0) === 8) {
    if (show) {
      era.print(`堕天使族的${name}及时地飞起来，避开了落穴… `);
    }
    return 1;
  }

  if (dice < 10) {
    if (show) {
      era.print(`${name}敏捷地避开了落穴… `);
    }
    return 1;
  } else if (dice >= 80) {
    // 要害（两倍伤害）
    dice = rand_n(40) + diff * 10 + 1;
    dice *= 2;
    if (era.get('talent:0:328')) {
      // 魔蟲知識によってダメージ1.5倍に（MASTER 的 TALENT:328）
      dice += Math.floor(dice / 2);
      if (show) {
        era.print('穴底有毒虫群！');
      }
    }
    if (show) {
      era.print(`${name}掉下去的时候扭到脚了！受到${dice}点伤害！ `);
    }
  } else {
    dice = rand_n(40) + diff * 10 + 1;
    if (era.get('talent:0:328')) {
      dice += Math.floor(dice / 2);
      if (show) {
        era.print('穴底有毒虫群！');
      }
    }
    if (show) {
      era.print(`${name}受到${dice}点伤害！`);
    }
  }
  chara(a).dungeon.体力 -= dice;

  // 胆怯（TALENT:10）
  if ((era.get(`talent:${a}:10`) || 0) === 1) {
    if (show) {
      era.print(`胆小的${name}吓得要死…（气力-10） `);
    }
    chara(a).dungeon.气力 -= 10;
  }

  // 的 PRINTL 只结束上面那串 `PRINTFORM` 拼起来的一行（PRINTFORM
  // 不换行），**不是空行**——ere 侧每段各自一次 print，故不补空行（#597）

  return 0;
}

/**
 * arrow_trap：射箭陷阱（ITEM:61）。
 * @returns {Promise<number>} RETURN（1 = 未作动）
 */
async function arrow_trap(a, rand_n) {
  const settings = era.get('flag:5') || 0;
  const show = (settings & 32) !== 0;
  const name = name_of(a);
  const diff = era.get('flag:85') || 0;

  if (show) {
    era.print('有射箭陷阱！ ');
  }

  const z = rand_n(100);
  let dice = z;

  if (z < 30) {
    if (show) {
      era.print(`${name}敏捷地躲开了箭矢… `);
    }
    return 1;
  } else if (dice >= 80) {
    // 要害（两倍 + 追加）——先印两倍值、再加追加值，
    // 印追加时 DICE 已含本体（显示效果如此，保留）
    dice *= 2;
    if (show) {
      era.print(`${name}的要害被射中了，受到${dice}点伤害！ `);
    }
    dice += diff * 10;
    if (show && diff > 0) {
      era.print(`箭矢插的很深，${name}被追加了${dice}点的伤害！ `);
    }
    chara(a).dungeon.体力 -= dice;
    // 怕痛（TALENT:40）
    if ((era.get(`talent:${a}:40`) || 0) === 1) {
      if (show) {
        era.print(`对怕痛的${name}来说，这简直无法忍受…（气力-30） `);
      }
      chara(a).dungeon.气力 -= 30;
    }
  } else {
    // ——印追加 {FLAG:85 * 10}（字面，与 DICE 相加
    // 结果一致；保留字面）
    if (show) {
      era.print(`${name}受到${dice}点的伤害！`);
    }
    dice += diff * 10;
    if (show && diff > 0) {
      era.print(`箭矢插的很深，${name}被追加了${diff * 10}点的伤害！`);
    }
    chara(a).dungeon.体力 -= dice;
    if ((era.get(`talent:${a}:40`) || 0) === 1) {
      if (show) {
        era.print(`对怕痛的${name}来说，这简直无法忍受…（气力-30） `);
      }
      chara(a).dungeon.气力 -= 30;
    }
  }

  // 尾部空行是注释态，不移植

  return 0;
}

/**
 * teleport_trap：传送陷阱（ITEM:62）。侵攻度 D:20 被重置
 * （z < 20 时回本层起点 1，否则 RAND:100）——经 ctx.d20 写回调用方。
 * @returns {Promise<number>} RETURN（1 = 未作动）
 */
async function teleport_trap(a, rand_n, ctx) {
  const settings = era.get('flag:5') || 0;
  const show = (settings & 32) !== 0;
  const name = name_of(a);
  const diff = era.get('flag:85') || 0;

  if (show) {
    era.print('哎呀！突然出现了个传送阵！ ');
  }

  const z = rand_n(100);

  if (z > 70) {
    if (show) {
      era.print(`${name}敏捷地躲开了传送… `);
    }
    return 1;
  } else if (z < 20) {
    // 被传送到这一层的起点
    if (show) {
      era.print(`${name}被传送到这一层的起点了！ `);
    }
    ctx.d20 = 1; // D:20 = 1
    // D:1 = 1（帰還フラグ）——全库无读者，不落变量（#172 结论）
  } else {
    // 被传送走（侵攻度随机重置）
    if (show) {
      era.print(`${name}被传送走了！ `);
    }
    ctx.d20 = rand_n(100); // D:20 = RAND:100
    // D:1 = 1——同上，不落变量
  }

  // 胆怯
  if ((era.get(`talent:${a}:10`) || 0) === 1) {
    if (show) {
      era.print(`胆小的${name}吓得要死…（气力-10） `);
    }
    chara(a).dungeon.气力 -= 10;
  }

  // 高难度时气力损耗
  if (diff > 0) {
    if (show) {
      era.print(`${name}被突然地瞬间移动弄得头昏脑胀…（气力-${diff}）`);
    }
    chara(a).dungeon.气力 -= diff;
  }

  // 的 PRINTL：**只在 FLAG:85 > 0 那支里是真空行**——那支的上一条
  // 输出是 PRINTFORML（已结束当前行），它落上去就是空行；
  // FLAG:85 == 0 时它只收尾那串未换行的 `PRINTFORM`，
  // 不产生空行（#597）
  if (diff > 0 && show) {
    era.println();
  }

  return 0;
}

/**
 * one_way_trap：单向通行陷阱（ITEM:63）。
 * @returns {Promise<number>} RETURN（1 = 未作动）
 */
async function one_way_trap(a, rand_n, ctx) {
  const settings = era.get('flag:5') || 0;
  const show = (settings & 32) !== 0;
  const name = name_of(a);
  const diff = era.get('flag:85') || 0;

  // 侵攻度不足 40 时不作动（不消耗：以 RETURN 1 实现，而非
  // 注释态的 ITEM:63 += 1 帳尻合わせ）
  if (ctx.d20 < 40) {
    return 1;
  }

  // 落下フラグ
  if (cbit(a, 503, 64)) {
    if (show) {
      era.print(
        '突然落下的大门把刚才走过的路给封住了，不可能爬回上去（气力-20） ',
      );
    }
    chara(a).dungeon.气力 -= 20;
  } else {
    if (show) {
      era.print('门后面听到钥匙锁门的声音！ ');
    }
  }

  const z = rand_n(3);

  if (z > 1) {
    // 敏锐地找到了返回的路——RETURN 0（作动、消耗）
    if (show) {
      era.print(`${name}敏锐地找到了返回的路… `);
    }
    return 0;
  }
  // 迷路（迷惑状态 + 气力损耗）
  if (show) {
    era.print(`${name}迷路了… `);
  }
  era.set(`cflag:${a}:509`, 1);
  // D:1 = 1——全库无读者，不落变量（#172 结论）
  if (show) {
    era.print(`${name}心急如焚 （气力-${20 + diff}） `);
  }
  chara(a).dungeon.气力 -= 20 + diff;

  // 胆怯
  if ((era.get(`talent:${a}:10`) || 0) === 1) {
    if (show) {
      era.print(`胆小的${name}吓得要死…（气力-10） `);
    }
    chara(a).dungeon.气力 -= 10;
  }

  // 的 PRINTL 只结束上面那串 `PRINTFORM` 拼起来的一行（PRINTFORM
  // 不换行），**不是空行**——ere 侧每段各自一次 print，故不补空行（#597）

  return 0;
}

/**
 * love_gas_trap：催淫陷阱（ITEM:64）——淫堕型。
 * @returns {Promise<number>} RETURN（屏息跑开也是 0 = 作动、消耗）
 */
async function love_gas_trap(a, rand_n) {
  const settings = era.get('flag:5') || 0;
  const show = (settings & 32) !== 0;
  const name = name_of(a);
  const diff = era.get('flag:85') || 0;

  if (show) {
    era.print('墙壁的缝隙中突然喷出了甘甜的气体…… ');
  }

  const z = rand_n(100);

  if (z > 60) {
    if (show) {
      era.print(`${name}屏息捂嘴跑开了… `);
    }
    return 0;
  } else if (z < 10) {
    // 大量吸入
    if (show) {
      era.print(`${name}吸入了大量的催情气体，开始思春了…`);
      era.print(`欲情点数+${40 + diff}`);
    }
    era.set(`juel:${a}:5`, (era.get(`juel:${a}:5`) || 0) + (40 + diff));
    if (show) {
      era.print(`${name}气息慌乱了（气力-${40 + diff * 2}）`);
    }
    chara(a).dungeon.气力 -= 40 + diff * 2;
  } else {
    if (show) {
      era.print(`${name}在思春着…`);
      era.print(`欲情点数+${20 + diff}`);
    }
    era.set(`juel:${a}:5`, (era.get(`juel:${a}:5`) || 0) + (20 + diff));
    if (show) {
      era.print(`${name}气息慌乱了（气力-${20 + diff * 2}）`);
    }
    chara(a).dungeon.气力 -= 20 + diff * 2;
  }

  // 容易自慰（TALENT:60）
  const self_masturbation = (era.get(`talent:${a}:60`) || 0) === 1;
  if (self_masturbation) {
    if (show) {
      era.print(`${name}身不由己地开始自慰了。`);
      era.print('自慰经验+1');
      era.print('欲情点数+20');
      era.print('阴核点数+10');
    }
    era.set(`exp:${a}:10`, (era.get(`exp:${a}:10`) || 0) + 1);
    era.set(`juel:${a}:0`, (era.get(`juel:${a}:0`) || 0) + 20);
    chara(a).dungeon.气力 -= 10;
    era.set(`juel:${a}:5`, (era.get(`juel:${a}:5`) || 0) + 20);
  }

  // 的 PRINTL：**只在 TALENT:60 那支里是真空行**——那支的
  // 445 行 `PRINTL 阴核点数+10` 已结束当前行；其余路径下它只收尾
  // 427/436 行那串未换行的 `PRINTFORM`，不产生空行（#597）
  if (self_masturbation && show) {
    era.println();
  }

  // 欲情フラグ（位 9）
  era.set(`cflag:${a}:503`, (era.get(`cflag:${a}:503`) || 0) | 512);

  return 0;
}

/**
 * syokusyu_floor_trap：触手地板陷阱（ITEM:65）——淫堕型。
 * @returns {Promise<number>} RETURN（1 = 未作动；注意本段不立欲情位）
 */
async function syokusyu_floor_trap(a, rand_n) {
  const settings = era.get('flag:5') || 0;
  const show = (settings & 32) !== 0;
  const name = name_of(a);
  const diff = era.get('flag:85') || 0;

  // 落下フラグ
  if (cbit(a, 503, 64)) {
    if (show) {
      era.print('突然掉到了触手的巢穴！！（气力-20） ');
    }
    chara(a).dungeon.气力 -= 20;
  } else {
    if (show) {
      era.print('一地的触手，一起袭来！！ ');
    }
  }

  const z = rand_n(100);

  if (z > 70) {
    // 拔出武器击退
    if (show) {
      era.print(`${name}拔出武器击退触手，逃脱了… `);
    }
    return 1;
  } else if (z < 15) {
    // 大量
    if (show) {
      era.print(`${name}被触手抓住了，大量的催情体液，被灌入了嘴里…`);
      era.print('触手经验+1');
      era.print(`欲情点数+${100 + diff * 2}`);
    }
    era.set(`exp:${a}:55`, (era.get(`exp:${a}:55`) || 0) + 1);
    era.set(`juel:${a}:5`, (era.get(`juel:${a}:5`) || 0) + (120 + diff * 2));
    if (show) {
      era.print(`${name}拼命挣扎着，消耗了大量的体力（气力-200） `);
    }
    chara(a).dungeon.气力 -= 200;
  } else {
    if (show) {
      era.print(`${name}被触手抓住了，催情的体液涂在身上…`);
      era.print('触手经验+1');
      era.print(`欲情点数+${60 + diff * 2}`);
    }
    era.set(`exp:${a}:55`, (era.get(`exp:${a}:55`) || 0) + 1);
    era.set(`juel:${a}:5`, (era.get(`juel:${a}:5`) || 0) + (60 + diff * 2));
    if (show) {
      era.print(`${name}拼命挣扎着，消耗了相当的体力（气力-100）`);
    }
    chara(a).dungeon.气力 -= 100;
  }

  // 容易自慰
  if ((era.get(`talent:${a}:60`) || 0) === 1) {
    if (show) {
      era.print(`催情功效发挥了，${name}情不自禁地自慰着`);
      era.print('自慰经验+1');
      era.print('欲情点数+10');
      era.print('阴核点数+10');
    }
    era.set(`exp:${a}:10`, (era.get(`exp:${a}:10`) || 0) + 1);
    era.set(`juel:${a}:0`, (era.get(`juel:${a}:0`) || 0) + 20);
    chara(a).dungeon.气力 -= 10;
    era.set(`juel:${a}:5`, (era.get(`juel:${a}:5`) || 0) + 20);
  }

  return 0;
}

/**
 * love_bath_trap：媚药泥沼陷阱（ITEM:66）——淫堕型。
 * @returns {Promise<number>} RETURN（必中，恒 0）
 */
async function love_bath_trap(a, rand_n) {
  const settings = era.get('flag:5') || 0;
  const show = (settings & 32) !== 0;
  const name = name_of(a);
  const diff = era.get('flag:85') || 0;

  // 落下フラグ
  if (cbit(a, 503, 64)) {
    if (show) {
      era.print('掉入了装满媚药的水坑里！！（气力-20） ');
    }
    chara(a).dungeon.气力 -= 20;
  } else {
    if (show) {
      era.print('地板突然打开，掉入了装满媚药的水池里！ ');
    }
  }

  // 淹没判定
  if (rand_n(10) < 2) {
    if (show) {
      era.print(`${name}被淹没在媚药里了！`);
      era.print('药物经验+1');
      era.print(`欲情点数+${200 + diff * 5}`);
    }
    era.set(`exp:${a}:57`, (era.get(`exp:${a}:57`) || 0) + 1);
    era.set(`juel:${a}:5`, (era.get(`juel:${a}:5`) || 0) + (200 + diff * 5));
    if (show) {
      era.print(
        `${name}拼命地挣扎，消耗了相当的体力和精力。（体力-200 气力-200）`,
      );
    }
    chara(a).dungeon.体力 -= 200;
    chara(a).dungeon.气力 -= 200;
  } else {
    if (show) {
      era.print(`${name}被大量的媚药沾满全身，走路摇摇晃晃了。`);
      era.print('药物经验+1');
      era.print(`欲情点数+${100 + diff * 5}`);
    }
    era.set(`exp:${a}:57`, (era.get(`exp:${a}:57`) || 0) + 1);
    era.set(`juel:${a}:5`, (era.get(`juel:${a}:5`) || 0) + (100 + diff * 5));
    if (show) {
      era.print(`${name}拼命地挣扎，消耗了相当的精力。（气力-100）`);
    }
    chara(a).dungeon.气力 -= 100;
  }

  // 容易自慰
  if ((era.get(`talent:${a}:60`) || 0) === 1) {
    if (show) {
      era.print(`媚药令思维都变得奇怪了，${name}情不自禁地自慰了起来。`);
      era.print('自慰经验+1');
      era.print('欲情点数+10');
      era.print('阴核点数+10');
    }
    era.set(`exp:${a}:10`, (era.get(`exp:${a}:10`) || 0) + 1);
    era.set(`juel:${a}:0`, (era.get(`juel:${a}:0`) || 0) + 20);
    chara(a).dungeon.气力 -= 10;
    era.set(`juel:${a}:5`, (era.get(`juel:${a}:5`) || 0) + 20);
  }

  // 欲情フラグ（位 9）
  era.set(`cflag:${a}:503`, (era.get(`cflag:${a}:503`) || 0) | 512);

  return 0;
}

/**
 * self_saimin_trap：自慰催眠陷阱（ITEM:67）——淫堕型。
 * 欲情中（位 9）时 DICE ×0.80 更易中招。两档催眠自慰走自动调教三连
 * （CALL com3_auto——真身 ere/event/event-autotrain.js，同族
 * com63_auto 在 dungeon-town.js:775 的先例）。
 * @returns {Promise<number>} RETURN（1 = 未作动）
 */
async function self_saimin_trap(a, rand_n) {
  const settings = era.get('flag:5') || 0;
  const show = (settings & 32) !== 0;
  const name = name_of(a);

  if (show) {
    era.print('突然头晕目眩，身体失去自由了… ');
  }

  let dice = rand_n(100);
  era_flag.target = a; // TARGET = A

  // 欲情フラグ（TIMES 截断）
  if (cbit(a, 503, 512)) {
    dice = Math.floor(dice * 0.8);
  }

  if (dice > 60) {
    if (show) {
      era.print(`${name}狠狠地捏着自己的脸，清醒了过来。`);
    }
    return 1;
  } else if (dice < 10) {
    // 深度催眠（攻防归零）
    if (show) {
      era.print(
        `${cbit(a, 503, 512) ? '发情了的' : ''}${name}被催眠了，将装备一件一件地脱了下来，一心一意地开始自慰。\t`,
      );
    }
    await battle.before_autotrain();
    const { com3_auto } = require('#/event/event-autotrain'); // CALL com3_auto
    com3_auto();
    await battle.source_check_auto();
    if (show) {
      era.print(
        `${name}连怪物跑到面前的声音都听不到了。（攻击力和防御力降为0！）`,
      );
    }
    era.set(`cflag:${a}:11`, 0);
    era.set(`cflag:${a}:12`, 0);
  } else {
    // 浅度催眠（攻防减半）
    if (show) {
      era.print(
        `${cbit(a, 503, 512) ? '发情了的' : ''}${name}被催眠了，将护甲解开，一心一意地开始自慰了。\t`,
      );
    }
    await battle.before_autotrain();
    const { com3_auto } = require('#/event/event-autotrain'); // CALL com3_auto
    com3_auto();
    await battle.source_check_auto();
    if (show) {
      era.print(
        `${name}连怪物跑到面前的声音都听不到了。（攻击力和防御力下降一半！）`,
      );
    }
    era.set(`cflag:${a}:11`, Math.floor((era.get(`cflag:${a}:11`) || 0) / 2));
    era.set(`cflag:${a}:12`, Math.floor((era.get(`cflag:${a}:12`) || 0) / 2));
  }

  return 0;
}

/**
 * imitater_trap：拟态房间陷阱（ITEM:68）——淫堕型。五种
 * 宝珠齐涨 + 绝顶经验 + 攻防弱化。
 * @returns {Promise<number>} RETURN（1 = 未作动）
 */
async function imitater_trap(a, rand_n) {
  const settings = era.get('flag:5') || 0;
  const show = (settings & 32) !== 0;
  const name = name_of(a);
  const diff = era.get('flag:85') || 0;

  // 掷骰在落下判定之前（顺序有意保留）
  let z = rand_n(100);

  // 落下フラグ
  if (cbit(a, 503, 64)) {
    if (show) {
      era.print('掉入了什么奇怪生物的体内！！');
    }
    z -= 10;
  } else if (show) {
    era.print('房间四面八方的墙壁突然一起压迫过来！');
    era.print('旁边有只拟态生物，只能逃到它里面了吗？');
  }

  if (z > 60) {
    if (show) {
      era.print(`${name}赶紧逃了出来。 `);
    }
    return 1;
  } else if (z < 10) {
    // 大量（50 + FLAG:85×10 五连 + 攻防归零）
    if (show) {
      era.print(`${name}被整个包围着，扣住了四肢。`);
      era.print('触手灵活地解开装备，将全身都涂满了媚药。');
      era.print(`强烈的兴奋，让${name}连怪物跑到面前的声音都听不到了。`);
      era.print(`欲情点数+${50 + diff * 10}`);
      era.print(`屈服点数+${50 + diff * 10}`);
      era.print(`耻情点数+${50 + diff * 10}`);
      era.print(`乳房点数+${50 + diff * 10}`);
      era.print(`阴核点数+${50 + diff * 10}`);
    }
    for (const idx of [6, 8, 14, 0, 5]) {
      era.set(
        `juel:${a}:${idx}`,
        (era.get(`juel:${a}:${idx}`) || 0) + (50 + diff * 10),
      );
    }
    chara(a).dungeon.气力 -= 50 + diff * 10;
    if (show) {
      era.print(
        `全裸的${name}被媚药所控制，在战斗中居然忘我地绝顶了。（攻击力和防御力降为0！）`,
      );
      era.print('绝顶经验+1');
    }
    era.set(`exp:${a}:2`, (era.get(`exp:${a}:2`) || 0) + 1);
    era.set(`cflag:${a}:11`, 0);
    era.set(`cflag:${a}:12`, 0);
  } else {
    // （30 + FLAG:85×6 + 攻防减半）
    if (show) {
      era.print(`${name}被整个包围着，扣住了四肢。`);
      era.print('触手灵活地滑进装备里，将全身都涂满了媚药。');
      era.print(`强烈的兴奋，让${name}连怪物跑到面前的声音都听不到了。`);
      era.print(`欲情点数+${30 + diff * 6}`);
      era.print(`屈服点数+${30 + diff * 6}`);
      era.print(`耻情点数+${30 + diff * 6}`);
      era.print(`乳房点数+${30 + diff * 6}`);
      era.print(`阴核点数+${30 + diff * 6}`);
    }
    for (const idx of [6, 8, 14, 0, 5]) {
      era.set(
        `juel:${a}:${idx}`,
        (era.get(`juel:${a}:${idx}`) || 0) + (30 + diff * 6),
      );
    }
    chara(a).dungeon.气力 -= 30 + diff * 6;
    if (show) {
      era.print(
        `${name}被媚药所控制，在战斗中居然忘我地绝顶了。（攻击力和防御力下降一半！）`,
      );
      era.print('绝顶经验+1');
    }
    era.set(`exp:${a}:2`, (era.get(`exp:${a}:2`) || 0) + 1);
    era.set(`cflag:${a}:11`, Math.floor((era.get(`cflag:${a}:11`) || 0) / 2));
    era.set(`cflag:${a}:12`, Math.floor((era.get(`cflag:${a}:12`) || 0) / 2));
  }

  return 0;
}

/**
 * summon_trap：召唤陷阱（ITEM:69）。召唤怪物
 * （monster-summon.js 真身）+ 高难度时体力损耗。
 * @returns {Promise<number>} RETURN（1 = 未作动）
 */
async function summon_trap(a, rand_n) {
  const settings = era.get('flag:5') || 0;
  const show = (settings & 32) !== 0;
  const name = name_of(a);
  const diff = era.get('flag:85') || 0;

  if (show) {
    era.print(`${name}踩到了召唤的魔法阵！！`);
  }

  const z = rand_n(2);

  if (z > 0) {
    if (show) {
      era.print(`${name}赶紧破坏掉魔法阵，离开了。`);
    }
    return 1;
  }
  if (show) {
    era.print('地下城里的怪物被召唤来了！');
  }

  await summon_mod.summon_monster(-1, rand_n);

  if (diff > 0) {
    if (show) {
      era.print(`${name}受到魔法阵的魔力的冲击（体力-${diff * 10}）`);
    }
    chara(a).dungeon.体力 -= diff * 10;
  }

  return 0;
}

/**
 * succubus_trap：梦魔陷阱（ITEM:70）——淫堕型。欲情中
 * （位 9）时 DICE ×0.80；非男人（TALENT:122 == 0）加百合经验。
 * @returns {Promise<number>} RETURN（1 = 未作动）
 */
async function succubus_trap(a, rand_n) {
  const settings = era.get('flag:5') || 0;
  const show = (settings & 32) !== 0;
  const name = name_of(a);
  const diff = era.get('flag:85') || 0;

  if (show) {
    era.print('发现了一个少女，貌似是被凌辱之后的勇者…');
    era.print('救救她吗…');
  }

  let dice = rand_n(100);

  // 欲情フラグ
  if (cbit(a, 503, 512)) {
    dice = Math.floor(dice * 0.8);
  }

  // 男人位（TALENT:122 == 0 = 女性 → 百合经验）
  const yuri = (era.get(`talent:${a}:122`) || 0) === 0;

  if (dice > 60) {
    if (show) {
      era.print(`${name}觉得是陷阱，无视了她。 `);
    }
    return 1;
  } else if (dice < 10) {
    // 深度（100 + FLAG:85×10）
    if (show) {
      era.print(
        `${cbit(a, 503, 512) ? '不由得冲动起来的' : ''}${name}伸出手来救助少女，突然被少女强吻了。`,
      );
      era.print(`激烈地拥吻着，${name}在不知不觉间理性飞散，欲望汹涌喷发……`);
      era.print(
        `没有任何疑问，毫无疑虑地把手伸向了股间…${name}就这样被欲望支配了。`,
      );
      if (yuri) {
        era.print('百合经验+6');
      }
      era.print(`欲情点数+${100 + diff * 10}`);
      era.print(`屈服点数+${100 + diff * 10}`);
      era.print(`耻情点数+${100 + diff * 10}`);
      era.print(`乳房点数+${100 + diff * 10}`);
      era.print(`阴核点数+${100 + diff * 10}`);
    }
    if (yuri) {
      chara(a).train.百合经验 += 6; // EXP:A:40（train 域门面）
    }
    for (const idx of [6, 8, 14, 0, 5]) {
      era.set(
        `juel:${a}:${idx}`,
        (era.get(`juel:${a}:${idx}`) || 0) + (100 + diff * 10),
      );
    }
    chara(a).dungeon.气力 -= 100 + diff * 10;
    if (show) {
      era.print(
        `全裸的${name}在之后的战斗中居然忘我地绝顶了。（攻击力和防御力降为0！）`,
      );
      era.print('绝顶经验+1');
    }
    era.set(`exp:${a}:2`, (era.get(`exp:${a}:2`) || 0) + 1);
    era.set(`cflag:${a}:11`, 0);
    era.set(`cflag:${a}:12`, 0);
  } else {
    // 浅度（60 + FLAG:85×6）
    if (show) {
      era.print(
        `${cbit(a, 503, 512) ? '不由得冲动起来的' : ''}${name}被高兴地跑过来的少女强吻了。`,
      );
      era.print(`激烈地拥吻着，${name}在不知不觉间理性飞散，欲望汹涌喷发……`);
      era.print(
        `把手伸向了股间…${name}的一部分理性在警示着，但最终败给欲望了。`,
      );
      if (yuri) {
        era.print('百合经验+4');
      }
      era.print(`欲情点数+${60 + diff * 6}`);
      era.print(`屈服点数+${60 + diff * 6}`);
      era.print(`耻情点数+${60 + diff * 6}`);
      era.print(`乳房点数+${60 + diff * 6}`);
      era.print(`阴核点数+${60 + diff * 6}`);
    }
    if (yuri) {
      chara(a).train.百合经验 += 4; // EXP:A:40（train 域门面）
    }
    for (const idx of [6, 8, 14, 0, 5]) {
      era.set(
        `juel:${a}:${idx}`,
        (era.get(`juel:${a}:${idx}`) || 0) + (60 + diff * 6),
      );
    }
    chara(a).dungeon.气力 -= 60 + diff * 6;
    if (show) {
      era.print(
        `${name}在之后的战斗中居然忘我地绝顶了。（攻击力和防御力下降一半！）`,
      );
      era.print('绝顶经验+1');
    }
    era.set(`exp:${a}:2`, (era.get(`exp:${a}:2`) || 0) + 1);
    era.set(`cflag:${a}:11`, Math.floor((era.get(`cflag:${a}:11`) || 0) / 2));
    era.set(`cflag:${a}:12`, Math.floor((era.get(`cflag:${a}:12`) || 0) / 2));
  }

  return 0;
}

/**
 * slime_room_trap：史莱姆房间陷阱（ITEM:71）——淫堕型。
 * 落下时 DICE -20 更易中招；中招后润滑位（位 3）立起；走自动调教三连
 * （CALL com50_auto——真身 ere/event/event-autotrain.js）。
 * @returns {Promise<number>} RETURN（逃脱也是 0 = 作动、消耗）
 */
async function slime_room_trap(a, rand_n) {
  const settings = era.get('flag:5') || 0;
  const show = (settings & 32) !== 0;
  const name = name_of(a);
  const diff = era.get('flag:85') || 0;

  let dice = rand_n(100);
  era_flag.target = a; // TARGET = A

  // 落下フラグ
  if (cbit(a, 503, 64)) {
    if (show) {
      era.print('掉入了史莱姆的巢穴！！ ');
    }
    dice -= 20;
  } else if (show) {
    era.print('突然从四方的墙壁和天花板上渗出了史莱姆！ ');
  }

  if (dice > 80) {
    if (show) {
      era.print(`${name}死命地逃脱了… `);
    }
    return 0;
  } else if (dice < 10) {
    // 装备全融（攻防减半）
    if (show) {
      era.print(
        `${name}的全身都被史莱姆覆盖着，装备被融化，全裸了（攻击力和防御力减半！） `,
      );
    }
    chara(a).dungeon.气力 -= 25 + diff;
    era.set(`cflag:${a}:11`, Math.floor((era.get(`cflag:${a}:11`) || 0) / 2));
    era.set(`cflag:${a}:12`, Math.floor((era.get(`cflag:${a}:12`) || 0) / 2));

    if (show) {
      era.print(
        `${name}的嘴里和肛门里，流入了大量的粘液…（气力-${10 + diff}）`,
      );
      era.print('肛门经验+1');
    }
    era.set(`exp:${a}:1`, (era.get(`exp:${a}:1`) || 0) + 1);
    chara(a).dungeon.气力 -= 10 + diff;
  } else {
    // 装备半融（攻防减 1/3；1/3 概率追加肛门段）
    if (show) {
      era.print(
        `${name}全身都被史莱姆戏弄着，装备都被融化了一半（攻击力和防御力下降三分之一！） `,
      );
    }
    chara(a).dungeon.气力 -= 25 + diff * 5;
    era.set(
      `cflag:${a}:11`,
      (era.get(`cflag:${a}:11`) || 0) -
        Math.floor((era.get(`cflag:${a}:11`) || 0) / 3),
    );
    era.set(
      `cflag:${a}:12`,
      (era.get(`cflag:${a}:12`) || 0) -
        Math.floor((era.get(`cflag:${a}:12`) || 0) / 3),
    );

    if (rand_n(3) === 0) {
      if (show) {
        era.print(`${name}气喘吁吁……（气力-${10 + diff}）`);
        era.print('肛门经验+1');
      }
      era.set(`exp:${a}:1`, (era.get(`exp:${a}:1`) || 0) + 1);
      chara(a).dungeon.气力 -= 10 + diff;
    }
  }

  // ローション自動調教
  await battle.before_autotrain();
  const { com50_auto } = require('#/event/event-autotrain'); // CALL com50_auto
  com50_auto();
  await battle.source_check_auto();

  // ヌルヌル付与（位 3）
  era.set(`cflag:${a}:503`, (era.get(`cflag:${a}:503`) || 0) | 8);

  return 0;
}

/**
 * net_trap：蜘蛛网（ITEM:72）。气力损耗按上限 1/20 封顶；
 * MASTER 有魔虫知识（TALENT:0:328）时追加 HP 损耗（1.5 倍、上限 1/20）。
 * 本段无随机消费（RAND 不掷——分发调用点的 rand_n 实参被忽略，e2e 的
 * PRNG 序列不受影响）。
 * @returns {Promise<number>} RETURN（恒 0）
 */
async function net_trap(a) {
  const settings = era.get('flag:5') || 0;
  const show = (settings & 32) !== 0;
  const name = name_of(a);
  const diff = era.get('flag:85') || 0;

  let local = 10 + diff * 5;

  // 気力最大値によるキャップ
  if (local > Math.floor((era.get(`maxbase:${a}:1`) || 0) / 20)) {
    local = Math.floor((era.get(`maxbase:${a}:1`) || 0) / 20);
  }

  if (show) {
    era.print(`${name}在蜘蛛的巢穴里消耗了相当的精力（气力-${local}） `);
  }
  chara(a).dungeon.气力 -= local;

  // 魔虫知识
  if (era.get('talent:0:328')) {
    // 魔虫知识によって気力ダメージの1.5倍のHPダメージ
    local += Math.floor(local / 2);
    // HP最大値によるキャップ
    if (local > Math.floor((era.get(`maxbase:${a}:0`) || 0) / 20)) {
      local = Math.floor((era.get(`maxbase:${a}:0`) || 0) / 20);
    }
    if (show) {
      era.print(`毒蜘蛛不断地袭来！（HP-${local}）  `);
    }
    chara(a).dungeon.体力 -= local;
  }

  // 的 PRINTL 只结束上面那串 `PRINTFORM` 拼起来的一行（PRINTFORM
  // 不换行），**不是空行**——ere 侧每段各自一次 print，故不补空行（#597）

  return 0;
}

/**
 * shop_trap：奸商（ITEM:73）。勇者被兜售偏贵商品，花掉的
 * 钱进魔王金库（MONEY/EX_FLAG:4444 双记）、扣的是勇者的购物预算
 * （CFLAG:582——CFLAG:580 扣款是注释态），HP 按消费额
 * 恢复、气力全恢复。
 * @returns {Promise<number>} RETURN（1 = 没买 / 钱不够）
 */
async function shop_trap(a, rand_n) {
  const settings = era.get('flag:5') || 0;
  const show = (settings & 32) !== 0;
  const name = name_of(a);
  const diff = era.get('flag:85') || 0;

  if (show) {
    era.print(`${name}被奸商兜售了偏贵的商品。`);
  }

  // 代金（等级 CFLAG:9 决定档位）
  let cost = rand_n(Math.floor((era.get(`cflag:${a}:9`) || 0) / 10 + 5)) * 50;

  if (cost === 0) {
    if (show) {
      era.print('勇者什么都没买。');
    }
    return 1;
  }

  // 阶层立方补正（POWER = 幂，整除截断）
  cost += diff * 10;
  const floor = chara(a).dungeon.侵攻阶层;
  cost = Math.floor((cost * (99 + floor * floor * floor)) / 100);

  // 所持金不足
  if (chara(a).dungeon.所持金 < cost) {
    if (show) {
      era.print(`${name}带的钱不够，企图杀价也失败了～`); // PRINTFORMW
      await era.waitAnyKey();
    }
    return 1;
  }

  if (show) {
    era.print(`全部销售额为${cost}点！`);
  }

  // （CFLAG:580 扣款是注释态，不落）
  era_flag.money += cost;
  era_exflag.legit_money += cost;
  chara(a).patch.借款 -= cost; // CFLAG:582（patch 域门面「借款」）

  // HP 按消费恢复（上限封顶）
  chara(a).dungeon.体力 += cost;
  if (chara(a).dungeon.体力 > (era.get(`maxbase:${a}:0`) || 0)) {
    chara(a).dungeon.体力 = era.get(`maxbase:${a}:0`) || 0;
  }
  // 気力の回復（全恢复）
  chara(a).dungeon.气力 = era.get(`maxbase:${a}:1`) || 0;
  if (show) {
    era.print(`${name}恢复了。`);
  }

  return 0;
}

/**
 * blackout_trap：黑暗的陷阱（ITEM:74）。攻减半 + 气力
 * 损耗（仅 DICE == 1 档）+ 高难度时毒箭。
 * @returns {Promise<number>} RETURN（逃脱也是 0 = 作动、消耗）
 */
async function blackout_trap(a, rand_n) {
  const settings = era.get('flag:5') || 0;
  const show = (settings & 32) !== 0;
  const name = name_of(a);
  const diff = era.get('flag:85') || 0;

  if (show) {
    era.print(`${name}突然被夺走了视野。`);
  }

  const dice = rand_n(3);

  if (dice === 2) {
    if (show) {
      era.print('勇者赶紧从黑暗里逃掉了。');
    }
    return 0;
  } else if (dice === 1) {
    if (show) {
      era.print('黑暗之中什么都看不见！（攻击力减半！）');
    }
    era.set(`cflag:${a}:11`, Math.floor((era.get(`cflag:${a}:11`) || 0) / 2));
    if (show) {
      era.print('黑暗里传来什么可怕的声音！（气力-100）');
    }
    chara(a).dungeon.气力 -= 100;
    if (diff > 0) {
      if (show) {
        era.print(`${name}在黑暗中被毒箭射中了！（体力-${diff * 10}）`);
      }
      chara(a).dungeon.体力 -= diff * 10;
    }
  } else {
    if (show) {
      era.print('黑暗之中什么都看不见！（攻击力减半！）');
    }
    era.set(`cflag:${a}:11`, Math.floor((era.get(`cflag:${a}:11`) || 0) / 2));

    if (diff > 0) {
      if (show) {
        era.print(`${name}在黑暗中被毒箭射中了！（体力-${diff * 10}）`);
      }
      chara(a).dungeon.体力 -= diff * 10;
    }
  }

  return 0;
}

/**
 * shoot_trap：弹射（ITEM:75）。侵攻度不足 40 不作动；
 * 掷中后按楼层分三档：第 9 层砸向最底层（不分断队伍）、第 8 层与中间层
 * 下坠一层并分断队伍（PARTY_DEL）、立起迷惑位。
 * @returns {Promise<number>} RETURN（1 = 未作动）
 */
async function shoot_trap(a, rand_n, ctx) {
  const settings = era.get('flag:5') || 0;
  const show = (settings & 32) !== 0;
  const name = name_of(a);
  const diff = era.get('flag:85') || 0;

  // 侵攻度不足时不作动（以 RETURN 1 实现，非注释态的
  // ITEM:75 += 1 帳尻合わせ）
  if (ctx.d20 < 40) {
    return 1;
  }

  // 落下フラグ
  if (cbit(a, 503, 64)) {
    if (show) {
      era.print(
        '掉入一个地方之后又掉入另一个地方，连锁地掉入未知的地方！！(气力-20)',
      );
    }
    chara(a).dungeon.气力 -= 20;
  } else {
    if (show) {
      era.print(`${name}突然落下了！`);
    }
    // 落下フラグON
    era.set(`cflag:${a}:503`, (era.get(`cflag:${a}:503`) || 0) + 64);
  }

  const z = rand_n(3);

  if (z > 0) {
    if (show) {
      era.print('勇者用手抓住边沿，爬上来了。');
    }
    return 1;
  }

  if (show) {
    era.print('*嘿！！*');
  }

  if (chara(a).dungeon.侵攻阶层 === 9) {
    // 第 9 层：从天花板砸向最底层（队伍不分断）
    const dmg = rand_n(300);
    chara(a).dungeon.体力 -= dmg;
    if (show) {
      era.print(
        `不停地往最底层掉落！带着奇妙的浮游感，${name}从第9阶层天花板上的传送阵掉落，狠狠地摔在地上（体力-${dmg}）`,
      );
      era.print(`${name}迷路了…`);
    }
    era.set(`cflag:${a}:509`, 1);
    // D:1 = 1——全库无读者，不落变量（#172 结论）
  } else if (chara(a).dungeon.侵攻阶层 === 8) {
    // 第 8 层：下坠一层 + 分断
    chara(a).dungeon.侵攻阶层 += 1;
    const dmg = rand_n(300);
    chara(a).dungeon.体力 -= dmg;
    if (show) {
      era.print(
        `这里看起来是最底层了。${name}的屁股被狠狠地撞到了（体力-${dmg}）`,
      );
      era.print(`${name}迷路了…`);
    }
    era.set(`cflag:${a}:509`, 1);
    // パーティが分断される
    party_mod.party_del(a); // （经模块对象，文件头）
    // D:1 = 1——同上
  } else {
    // 中间层：下坠一层 + 分断
    chara(a).dungeon.侵攻阶层 += 1;
    if (show) {
      era.print(`掉到了下一层，${name}迷路了…`);
    }
    era.set(`cflag:${a}:509`, 1);
    // パーティが分断される
    party_mod.party_del(a); // （经模块对象，文件头）
    // D:1 = 1——同上
  }

  if (diff > 0) {
    if (show) {
      era.print(`${name}因为掉落的冲击而呻吟着…（体力-${diff}）`);
    }
    chara(a).dungeon.体力 -= diff;
  }

  return 0;
}

/**
 * dispell_trap：魔力扩散陷阱（ITEM:76）。诅咒位（位 1）
 * 立起 + 高难度时气力损耗。
 * @returns {Promise<number>} RETURN（解除也是 0 = 作动、消耗）
 */
async function dispell_trap(a, rand_n) {
  const settings = era.get('flag:5') || 0;
  const show = (settings & 32) !== 0;
  const name = name_of(a);
  const diff = era.get('flag:85') || 0;

  if (show) {
    era.print(`${name}碰到了诅咒的魔法阵！`);
  }

  const z = rand_n(2);

  if (z > 0) {
    if (show) {
      era.print('勇者解除了诅咒。');
    }
    return 0;
  }

  if (show) {
    era.print('魔力的漩涡爆炸了！');
  }

  // 诅咒位（位 1）
  if (cbit(a, 503, 2)) {
    if (show) {
      era.print(`${name}已经被诅咒了。`);
    }
  } else {
    if (show) {
      era.print(`${name}被诅咒了…`);
    }
    era.set(`cflag:${a}:503`, (era.get(`cflag:${a}:503`) || 0) + 2);
  }

  if (diff > 0) {
    if (show) {
      era.print(`魔力的漩涡侵蚀着${name}的精神（气力-${diff * 10}）`);
    }
    chara(a).dungeon.气力 -= diff * 10;
  }

  return 0;
}

/**
 * oil_trap：油壶陷阱（ITEM:77）。气力损耗 + 油位（位 3
 * 之一，写 8）立起——FIRE 的追加伤害读它（& 8，与润滑位
 * 同一位，有意保留）。
 * @returns {Promise<number>} RETURN（1 = 未作动）
 */
async function oil_trap(a, rand_n) {
  const settings = era.get('flag:5') || 0;
  const show = (settings & 32) !== 0;
  const name = name_of(a);
  const diff = era.get('flag:85') || 0;

  if (show) {
    era.print('有油壶陷阱！');
  }

  let z = rand_n(100);

  if (z < 30) {
    if (show) {
      era.print(`${name}轻巧地躲开了… `);
    }
    return 1;
  }
  z += diff * 2;
  if (show) {
    era.print(`${name}被油泼满一身，气力减少${z}点！`);
  }
  chara(a).dungeon.气力 -= z;
  if (cbit(a, 503, 8)) {
    if (show) {
      era.print('黏黏糊糊的…');
    }
  } else {
    era.set(`cflag:${a}:503`, (era.get(`cflag:${a}:503`) || 0) + 8);
  }

  return 0;
}

/**
 * fire_trap：火箭发射陷阱（ITEM:78）。命中时若油位
 * （CFLAG:503 & 8）立起则追加伤害。
 * @returns {Promise<number>} RETURN（回避也是 0 = 作动、消耗）
 */
async function fire_trap(a, rand_n) {
  const settings = era.get('flag:5') || 0;
  const show = (settings & 32) !== 0;
  const name = name_of(a);
  const diff = era.get('flag:85') || 0;

  if (show) {
    era.print('有火箭发射陷阱！');
  }

  let dice = rand_n(200);

  if (dice < 100) {
    if (show) {
      era.print(`${name}轻巧地回避了火箭…… `);
    }
    return 0;
  }
  dice += diff * 10;
  if (show) {
    era.print(`${name}受到${dice}点伤害！`);
  }
  chara(a).dungeon.体力 -= dice;
  if (cbit(a, 503, 8)) {
    if (show) {
      era.print(`火把身上的油点燃了，追加伤害！（${30 + diff * 5}）`);
    }
    chara(a).dungeon.体力 -= 30 + diff * 5;
  }

  return 0;
}

/**
 * a_worm_trap：肛门虫陷阱（ITEM:79）——淫堕型。润滑中
 * （位 3）威力 ×1.30；A 经验 > 30 且未寄生时寄生（TALENT:193）；已寄生
 * 时走肛门虫自动调教三连（CALL com13_auto——真身
 * ere/event/event-autotrain.js）。
 * @returns {Promise<number>} RETURN（1 = 未作动）
 */
async function a_worm_trap(a, rand_n) {
  const settings = era.get('flag:5') || 0;
  const show = (settings & 32) !== 0;
  const name = name_of(a);
  const diff = era.get('flag:85') || 0;

  if (show) {
    era.print('有肛门虫陷阱！');
  }

  let dice = rand_n(100);

  // ヌルヌル状態で威力アップ（TIMES 截断）
  if (cbit(a, 503, 8)) {
    dice = Math.floor(dice * 1.3);
  }

  if (dice < 35) {
    if (show) {
      era.print(`${name}发现了肛门虫，一下把它弄死了。 `);
    }
    return 1;
  }

  if (cbit(a, 503, 8) && show) {
    era.print('有什么滑溜溜的东西滑进身体了！');
  }

  dice += diff * 7 + 30;
  if (show) {
    era.print(`${name}被肛门虫消耗了${dice}点气力！`);
  }
  chara(a).dungeon.气力 -= dice;

  // A経験が多いと、中に入られてしまう
  if (
    (era.get(`talent:${a}:193`) || 0) === 0 &&
    (era.get(`exp:${a}:1`) || 0) > 30
  ) {
    // SETCOLORBYNAME LightSalmon → RESETCOLOR：配色不做（#175 先例）
    if (show) {
      era.print(`肛门虫在${name}的肠内不停蠕动着……`);
    }
    era.set(`talent:${a}:193`, 1);
  } else if (era.get(`talent:${a}:193`)) {
    // PLAYER = 0——不落变量、注释留痕（读者面见文件头：本体不读、
    // 三连第三站的结算读）
    era_flag.target = a; // TARGET = A
    // アナルワーム自動調教（CALL com13_auto——真身）
    await battle.before_autotrain();
    const { com13_auto } = require('#/event/event-autotrain');
    com13_auto();
    await battle.source_check_auto();
  }

  era.set(`exp:${a}:1`, (era.get(`exp:${a}:1`) || 0) + 1);
  if (show) {
    era.print('肛门经验+1');
  }

  return 0;
}

/**
 * love_bug_trap：淫虫陷阱（ITEM:80）——淫堕型。伤害后
 * 走爱抚自动调教三连（CALL com0_auto——真身
 * ere/event/event-autotrain.js）。RETURN 01
 * 是十进制 1 的前导零写法（数值按十进制字面量），非八进制。
 * @returns {Promise<number>} RETURN（1 = 未作动）
 */
async function love_bug_trap(a, rand_n) {
  const settings = era.get('flag:5') || 0;
  const show = (settings & 32) !== 0;
  const name = name_of(a);
  const diff = era.get('flag:85') || 0;

  // 落下フラグ
  if (cbit(a, 503, 64)) {
    if (show) {
      era.print('掉入了淫虫的巢穴！（气力-10） ');
    }
    chara(a).dungeon.气力 -= 10;
  } else {
    if (show) {
      era.print('踩到了淫虫的巢穴上！ ');
    }
  }

  let dice = rand_n(100);

  // 天使 / 堕天使
  if ((era.get(`talent:${a}:314`) || 0) === 6) {
    if (show) {
      era.print(`天使族的${name}及时地飞起来，避开了巢穴… `);
    }
    return 1;
  }
  if ((era.get(`talent:${a}:314`) || 0) === 8) {
    if (show) {
      era.print(`堕天使族的${name}及时地飞起来，避开了巢穴…`);
    }
    return 1; // RETURN 01（十进制 1，文件头）
  }

  if (dice < 5) {
    if (show) {
      era.print(`${name}敏捷地避开了巢穴… `);
    }
    return 1;
  } else if (dice >= 80) {
    // 扭脚（两倍）
    dice = rand_n(40) + diff * 3 + 1;
    dice *= 2;
    if (show) {
      era.print(`${name}落下的时候扭到脚了。受到${dice}点伤害！ `);
    }
  } else {
    dice = rand_n(40) + diff * 3 + 1;
    if (show) {
      era.print(`${name}受到${dice}点伤害！`);
    }
  }
  chara(a).dungeon.体力 -= dice;

  // 的 PRINTL 只结束上面那串 `PRINTFORM` 拼起来的一行
  // （PRINTFORM 不换行），**不是空行**——ere 侧每段各自一次 print，
  // 故不补空行（#597）

  // PLAYER = 0——不落变量、注释留痕（读者面见文件头：本体不读、
  // 三连第三站的结算读）
  era_flag.target = a; // TARGET = A
  // 愛撫自動調教（CALL com0_auto——真身）
  await battle.before_autotrain();
  const { com0_auto } = require('#/event/event-autotrain');
  com0_auto();
  await battle.source_check_auto();

  // 胆怯
  if ((era.get(`talent:${a}:10`) || 0) === 1) {
    if (show) {
      era.print(`胆小的${name}吓得要死…（气力-10）`);
    }
    chara(a).dungeon.气力 -= 10;
  }

  return 0;
}

/**
 * dark_juel_trap：宝石陷阱（ITEM:81）。善恶值 > 150 有
 * 1/4 概率克服；中招时掠夺换金（CFLAG:581）+ 屈服宝珠 + 善恶值 -1
 * （KARMA 走 dungeon.js 的域内存根，延迟 require 避开循环）。
 * @returns {Promise<number>} RETURN（1 = 克服）
 */
async function dark_juel_trap(a, rand_n) {
  const settings = era.get('flag:5') || 0;
  const show = (settings & 32) !== 0;
  const name = name_of(a);
  const diff = era.get('flag:85') || 0;

  if (show) {
    era.print(`${name}将高价的宝石捡了起来……`);
  }

  let dice = rand_n(5) * 50;

  // カルマが高いと誘惑に打ち勝つ判定
  if (chara(a).chara.善恶值 > 150 && rand_n(4) === 0) {
    dice = 0;
  }

  if (dice === 0) {
    if (show) {
      era.print('勇者克服了诱惑。');
    }
    return 1;
  }

  // 阶层立方补正
  const floor = chara(a).dungeon.侵攻阶层;
  dice += diff * 10;
  dice = Math.floor((dice * (99 + floor * floor * floor)) / 100);

  // 素质补正
  if (era.get(`talent:${a}:23`)) {
    dice += 5; // 好奇心ボーナス
  }
  if ((era.get(`talent:${a}:316`) || 0) === 2) {
    dice += 10; // 金のためボーナス
  }
  if ((era.get(`talent:${a}:314`) || 0) === 10) {
    dice += 15; // ホビットボーナス
  }
  if ((era.get(`talent:${a}:314`) || 0) === 11) {
    dice += 15; // ドワーフボーナス
  }
  if (era.get(`talent:${a}:203`)) {
    dice += Math.floor(dice / 5); // 盗賊は収入が多い（1.2倍）
  }

  if (show) {
    era.print(`总计价值${dice}的宝石被勇者装入怀中……`);
  }

  era.set(`cflag:${a}:581`, (era.get(`cflag:${a}:581`) || 0) + dice);

  era.set(`juel:${a}:6`, (era.get(`juel:${a}:6`) || 0) + Math.floor(dice / 10));
  if (show) {
    era.print(`屈服点数+${Math.floor(dice / 10)}`);
  }

  // そしてカルマが下がる（KARMA 域内存根——dungeon.js，延迟
  // require 避开循环初始化，#175 先例）
  require('#/dungeon/dungeon').karma(a, -1);

  return 0;
}

/**
 * def_down_trap：攻击效果陷阱（ITEM:82）——防御值弱化
 * （CFLAG:680）。段名是「攻撃陣地の罠」、演出写「攻击效果上升」，
 * 实际落到 680（防御）——文案与效果的错位保留。
 * @returns {Promise<number>} RETURN（恒 0）
 */
async function def_down_trap(a, rand_n) {
  const settings = era.get('flag:5') || 0;
  const show = (settings & 32) !== 0;
  const name = name_of(a);
  const diff = era.get('flag:85') || 0;

  if (show) {
    era.print(`${name}被附上攻击效果上升的图腾……`);
  }

  const dice = rand_n(diff + 1) + rand_n(20) + 1;

  if (show) {
    era.print(`${name}的防御值弱化了${dice}％……`);
  }

  era.set(`cflag:${a}:680`, (era.get(`cflag:${a}:680`) || 0) + dice);

  return 0;
}

/**
 * atk_down_trap：防御效果陷阱（ITEM:83）——伤害值弱化
 * （CFLAG:681）。同款文案错位保留。
 * @returns {Promise<number>} RETURN（恒 0）
 */
async function atk_down_trap(a, rand_n) {
  const settings = era.get('flag:5') || 0;
  const show = (settings & 32) !== 0;
  const name = name_of(a);
  const diff = era.get('flag:85') || 0;

  if (show) {
    era.print(`${name}被附上了防御效果上升的图腾……`);
  }

  const dice = rand_n(diff + 1) + rand_n(20) + 1;

  if (show) {
    era.print(`${name}的伤害值被弱化了${dice}％……`);
  }

  era.set(`cflag:${a}:681`, (era.get(`cflag:${a}:681`) || 0) + dice);

  return 0;
}

/**
 * mag_down_trap：魔法伤害陷阱（ITEM:84）——受到的魔法
 * 伤害上升（CFLAG:682）。
 * @returns {Promise<number>} RETURN（恒 0）
 */
async function mag_down_trap(a, rand_n) {
  const settings = era.get('flag:5') || 0;
  const show = (settings & 32) !== 0;
  const name = name_of(a);
  const diff = era.get('flag:85') || 0;

  if (show) {
    era.print(`${name}被附上了魔法攻击效果上升的图腾……`);
  }

  const dice = rand_n(diff + 1) + rand_n(20) + 1;

  if (show) {
    era.print(`${name}受到的魔法伤害上升了${dice}％……`);
  }

  era.set(`cflag:${a}:682`, (era.get(`cflag:${a}:682`) || 0) + dice);

  return 0;
}

/**
 * all_down_trap：鬼手陷阱（ITEM:85）——三项弱化同值
 * （680/681/682，掷骰减半 +1）。
 * @returns {Promise<number>} RETURN（恒 0）
 */
async function all_down_trap(a, rand_n) {
  const settings = era.get('flag:5') || 0;
  const show = (settings & 32) !== 0;
  const name = name_of(a);
  const diff = era.get('flag:85') || 0;

  if (show) {
    era.print(`${name}遭惨白的手所缠绕，被下了诅咒……`);
  }

  const dice = Math.floor((rand_n(diff + 1) + rand_n(20)) / 2) + 1;

  if (show) {
    era.print(`${name}被弱化了${dice}％……`);
  }

  era.set(`cflag:${a}:680`, (era.get(`cflag:${a}:680`) || 0) + dice);
  era.set(`cflag:${a}:681`, (era.get(`cflag:${a}:681`) || 0) + dice);
  era.set(`cflag:${a}:682`, (era.get(`cflag:${a}:682`) || 0) + dice);

  return 0;
}

// —— 诈骗陷阱：TRAP_ID 87 的效果体。
//    三个剧情段各自按善恶值（CFLAG:151）分档定价，骗来的钱进魔王金库
//    （MONEY / EX_FLAG:4444 双记）、扣勇者的所持金（CFLAG:580）或购物
//    预算（CFLAG:582，签借条的场合）。数值效果整体在 FLAG:5 & 32 显示开关内
//    ——关日志时整个陷阱不触发（演出与数值同在开关内），保留现状。

/** PRINTDATAL 的随机文本掷选（rand_n(4) 四选一） */
function pick_data(rand_n, options) {
  return options[rand_n(options.length)];
}

/**
 * 诈骗剧情1：求救的弱势者。
 * @returns {Promise<void>} 无 RETURN
 */
async function fraud_story1(a, rand_n) {
  const name = name_of(a);
  const diff = era.get('flag:85') || 0;
  const karma = chara(a).chara.善恶值;

  era.print(
    `一个骨瘦如柴的${pick_data(rand_n, ['老太太', '老先生', '流浪汉', '小孩子'])}正向${name}求救，`,
  );
  era.print('声称自己');
  era.print(
    pick_data(rand_n, [
      '迷路了，已经好几天没有吃饭',
      '被抢劫了，身无分文又和家人分散了',
      '被掳来这里，想逃走又迷路了',
      '失亿了，不知为何出现在满是怪物的迷宫里',
    ]),
  );

  // 善悪値判定
  if (karma > 100) {
    let cost =
      Math.floor((karma * (era.get(`cflag:${a}:9`) || 0)) / 2) + diff * 20;
    if (cost > Math.floor(chara(a).dungeon.所持金 / 2)) {
      cost = Math.floor(chara(a).dungeon.所持金 / 2);
    }
    era.print(`正义感很高的${name}，非常同情对方的处境`);
    if (chara(a).dungeon.所持金 < 100) {
      era.print('尽管想帮助对方，但自己身上也所剩无几，只能爱莫能助了……');
    } else {
      // SETCOLORBYNAME LightSalmon → RESETCOLOR：配色不做（#175 先例）
      era.print(`将自己的所持金分了${cost}给对方……`);
      era_flag.money += cost;
      era_exflag.legit_money += cost;
      chara(a).dungeon.所持金 -= cost;
    }
  } else if (karma > 0) {
    let cost =
      Math.floor((karma * (era.get(`cflag:${a}:9`) || 0)) / 2) + diff * 10;
    if (cost > Math.floor(chara(a).dungeon.所持金 / 3)) {
      cost = Math.floor(chara(a).dungeon.所持金 / 3);
    }
    era.print(`${name}虽然有点半信半疑，最后还是选择相信对方`);
    if (chara(a).dungeon.所持金 < 100) {
      era.print('尽管想帮助对方，但自己身上也所剩无几，只能爱莫能助了……');
    } else {
      era.print(`将自己的所持金分了${cost}给对方……`);
      era_flag.money += cost;
      era_exflag.legit_money += cost;
      chara(a).dungeon.所持金 -= cost;
    }
  } else if (karma > -50) {
    let cost = (era.get(`cflag:${a}:9`) || 0) * (rand_n(5) + 1) + diff * 5;
    if (cost > Math.floor(chara(a).dungeon.所持金 / 5)) {
      cost = Math.floor(chara(a).dungeon.所持金 / 5);
    }
    era.print(`${name}很怀疑这么危险的地方居然会出现平民`);
    if (chara(a).dungeon.所持金 < 100) {
      era.print('不过因为自己身上也所剩无几，只能爱莫能助了……');
    } else {
      era.print(`犹豫了一番，最后还是将自己的所持金分了${cost}给对方……`);
      era_flag.money += cost;
      era_exflag.legit_money += cost;
      chara(a).dungeon.所持金 -= cost;
    }
  } else {
    era.print(`${name}认为这一定是陷阱，于是漠不关心地转身离开了……`);
  }
}

/**
 * 诈骗剧情2：募捐的组织者。小额时签借条（扣 CFLAG:582 购物
 * 预算），大额时直接扣所持金（CFLAG:580）。
 * @returns {Promise<void>} 无 RETURN
 */
async function fraud_story2(a, rand_n) {
  const name = name_of(a);
  const diff = era.get('flag:85') || 0;
  const karma = chara(a).chara.善恶值;

  era.print(
    `一个${pick_data(rand_n, ['看似老练的冒险者', '精明干练的女勇者', '热情洋溢的商人', '睿智慈祥的老者'])}正向${name}搭话，`,
  );
  era.print('声称自己正打算筹备一个');
  era.print(
    pick_data(rand_n, [
      '讨伐魔王的公会',
      '补助失亲儿童的基金会',
      '协助战后重建的组织',
      '加强村镇防护的魔法阵',
    ]),
  );
  era.print('所以正到处筹募捐款，希望勇者也能共襄盛举');

  // 善悪値判定
  if (karma > 100) {
    let cost =
      Math.floor((karma * (era.get(`cflag:${a}:9`) || 0)) / 2) + diff * 20;
    if (cost > Math.floor(chara(a).dungeon.所持金 / 2)) {
      cost = Math.floor(chara(a).dungeon.所持金 / 2);
    }
    era.print(`正义感很高的${name}，觉得对方提出的建议非常有意义`);
    if (cost < 2000) {
      cost -= rand_n(100);
      if (cost <= 0) {
        cost = rand_n(500) + 200;
      }
      era.print(
        `虽然自己身上也所剩无几，但是很高兴地签下了${cost}的借条参与活动了……`,
      );
      era_flag.money += cost;
      era_exflag.legit_money += cost;
      chara(a).patch.借款 -= cost; // CFLAG:582（patch 域门面「借款」）
    } else {
      era.print(`于是兴高采烈地拿出所持金${cost}给对方了……`);
      era_flag.money += cost;
      era_exflag.legit_money += cost;
      chara(a).dungeon.所持金 -= cost;
    }
  } else if (karma > 0) {
    let cost =
      Math.floor((karma * (era.get(`cflag:${a}:9`) || 0)) / 2) + diff * 10;
    if (cost > Math.floor(chara(a).dungeon.所持金 / 3)) {
      cost = Math.floor(chara(a).dungeon.所持金 / 3);
    }
    era.print(`${name}虽然有点半信半疑，但是最后还是被对方说动了`);
    if (cost < 1000) {
      cost -= rand_n(100);
      if (cost <= 0) {
        cost = rand_n(200) + 100;
      }
      era.print(
        `不过因为自己身上也所剩无几，只能先签下${cost}的借条参与活动了……`,
      );
      era_flag.money += cost;
      era_exflag.legit_money += cost;
      chara(a).patch.借款 -= cost; // CFLAG:582（patch 域门面「借款」）
    } else {
      era.print(`拿出所持金${cost}给对方了……`);
      era_flag.money += cost;
      era_exflag.legit_money += cost;
      chara(a).dungeon.所持金 -= cost;
    }
  } else if (karma > -50) {
    let cost = (era.get(`cflag:${a}:9`) || 0) * (rand_n(5) + 1) + diff * 5;
    if (cost > Math.floor(chara(a).dungeon.所持金 / 5)) {
      cost = Math.floor(chara(a).dungeon.所持金 / 5);
    }
    era.print(`${name}很怀疑对方的真实性，但是又无法完全否决`);
    if (cost < 500) {
      cost -= rand_n(100);
      if (cost <= 0) {
        cost = rand_n(100) + 50;
      }
      era.print(
        `因为自己身上也所剩无几，在对方多次劝说保证之下，签下${cost}的借条了……`,
      );
      era_flag.money += cost;
      era_exflag.legit_money += cost;
      chara(a).patch.借款 -= cost; // CFLAG:582（patch 域门面「借款」）
    } else {
      era.print(`犹豫了一番，最后还是拿出所持金${cost}给对方了……`);
      era_flag.money += cost;
      era_exflag.legit_money += cost;
      chara(a).dungeon.所持金 -= cost;
    }
  } else {
    era.print(`${name}认为这一定是陷阱，于是漠不关心地转身离开了……`);
  }
}

/**
 * 诈骗剧情3：送钱的冒险者——双倍欠条。收下 COST、背上
 * COST×2 的债（CFLAG:582）。
 * @returns {Promise<void>} 无 RETURN
 */
async function fraud_story3(a, rand_n) {
  const name = name_of(a);
  const diff = era.get('flag:85') || 0;
  const karma = chara(a).chara.善恶值;

  era.print(
    `一个${pick_data(rand_n, ['笑容满面的冒险者', '热情洋溢的冒险者', '和蔼可亲的冒险者', '诚恳随和的冒险者'])}正向${name}搭话，`,
  );
  era.print('说自己特地千里迢迢过来给勇者送上家乡的冒险基金');
  era.print(`然后要求${name}在文件上进行签收`);

  // 善悪値判定（三档的下限钳制方向与前两段相反：SIF COST < N）
  let cost;
  if (karma > 100) {
    cost = Math.floor((karma * (era.get(`cflag:${a}:9`) || 0)) / 2) + diff * 20;
    if (cost < 1500) {
      cost = 1500 + rand_n(100);
    }
    era.print(`正义感很高的${name}，轻易就相信了对方的说辞\t`);
  } else if (karma > 0) {
    cost = Math.floor((karma * (era.get(`cflag:${a}:9`) || 0)) / 2) + diff * 10;
    if (cost < 1000) {
      cost = 1000 + rand_n(100);
    }
    era.print(`${name}虽然有点半信半疑，但是最后接受了对方的金钱援助`);
  } else {
    cost = (era.get(`cflag:${a}:9`) || 0) * (rand_n(5) + 1) + diff * 5;
    if (cost < 500) {
      cost = 500 + rand_n(100);
    }
    era.print(`${name}很怀疑对方的真实性，但是送上门的钱不要白不要`);
  }
  // SETCOLORBYNAME SkyBlue / LightSalmon → RESETCOLOR：配色不做（#175 先例）
  era.print(`收下了${cost}的冒险基金`);
  era.print('然而，那张签收条其实底下是张双倍冒险基金的欠条……');
  era.print(`${name}的债务增加了${cost * 2}点了……`);

  era_flag.money += cost;
  era_exflag.legit_money += cost;
  chara(a).dungeon.所持金 += cost;
  chara(a).patch.借款 -= cost * 2; // CFLAG:582（patch 域门面「借款」）
}

/**
 * 诈骗陷阱：TRAP_ID 87 的分发体。三分
 * 之一概率各演一段；整个效果（含数值）在 FLAG:5 & 32 显示开关内（文件头）。
 * @returns {Promise<number>} 恒 return 0（恒作动、消耗）
 */
async function fraud_trap(a, rand_n) {
  const settings = era.get('flag:5') || 0;
  if ((settings & 32) !== 0) {
    // SELECTCASE RAND:3
    const roll = rand_n(3);
    if (roll === 0) {
      await fraud_story1(a, rand_n);
    } else if (roll === 1) {
      await fraud_story2(a, rand_n);
    } else {
      await fraud_story3(a, rand_n);
    }
  }
  return 0;
}

/**
 * slave_trap_set：迎击方补充陷阱。迎击行动是「补充」
 * （CFLAG:500 == 2）时，遍历本层 A/B/C 三槽：库存 < 99 的补一个、
 * ≥ 99 的按价换金。
 * @param {number} a 迎击者（全局 A）
 * @returns {Promise<number>} 恒 return 0
 */
async function slave_trap_set(a) {
  const settings = era.get('flag:5') || 0;
  const show = (settings & 32) !== 0;

  // 補充行動か
  if ((era.get(`cflag:${a}:500`) || 0) !== 2) {
    return 0;
  }

  let local = chara(a).dungeon.侵攻阶层 + 299;

  // $TRAP_LOOP_2（LOCAL += 10 → < 330 则回起）
  for (;;) {
    const trap_id = era.get(`flag:${local}`) || 0;

    if (trap_id > 0) {
      // 補充
      const stock = era.get(`item:${trap_id}`) || 0;
      if (stock > 0 && stock < 99) {
        era.set(`item:${trap_id}`, stock + 1);
      }
      // 余りを換金
      if ((era.get(`item:${trap_id}`) || 0) >= 99) {
        const price = trap_price(trap_id);
        era_flag.money += price;
        era_exflag.legit_money += price;
        if (show) {
          era.print(`出售了多余的陷阱，获得了${price}点收入。`);
        }
      }
    }

    local += 10;
    if (local >= 330) {
      break;
    }
  }

  return 0;
}

module.exports = {
  dungeon_trap,
  slave_trap_set,
  trap_price,
  pit_trap,
  arrow_trap,
  teleport_trap,
  one_way_trap,
  love_gas_trap,
  syokusyu_floor_trap,
  love_bath_trap,
  self_saimin_trap,
  imitater_trap,
  summon_trap,
  succubus_trap,
  slime_room_trap,
  net_trap,
  shop_trap,
  blackout_trap,
  shoot_trap,
  dispell_trap,
  oil_trap,
  fire_trap,
  a_worm_trap,
  love_bug_trap,
  dark_juel_trap,
  def_down_trap,
  atk_down_trap,
  mag_down_trap,
  all_down_trap,
  fraud_trap,
  campaign_trap,
  // page-campaign-1.js 向这个族 register(1, ...)，本文件只声明、不参与注册
  campaign_trap_family,
};
