/**
 * @file 迷宫房间与设施（issue #177，阶段 3 H8）：十四函数。
 *
 * 局部变量语义（各函数共用的词汇表）：
 *   ARG:0 / A = 受设施效果者（调用方 1/3 掷选）   ROOM = 设施番号 500-507
 *   EXTRA = 设施扩张位域（位 0 / 位 1）           COST / INCOME = 代金 / 收入
 *   DMG = 体力伤害   MDMG = 气力伤害   BACK = 侵攻度减少   MENU = 娼馆业态
 *   MON_ID / MON_NUM = 怪物番号 / 只数   TALK = 牧场台词掷选（位段编码）
 *
 * 房间表：FLAG:350-358 = 第 1-9 层的设施番号，FLAG:360-368 = 对应的扩张
 * 位域（ROOMID = CFLAG:501 + 349 与 +10）。八种设施：500 商店街 /
 * 501 沼地 / 502 人类牧场 / 503 冰室 / 504 热砂 / 505 迷宫 / 506 博物馆 /
 * 507 娼馆街（名字表 yml/Item.yml）。只有 500（dungeon_shop_day）与 502
 * （dungeon_farm）有日结算。
 *
 * 说明（有意偏离，均注明依据）：
 *   - **SAVESTR 无引擎通道**（#171 钉下）：名字承载一律 `callname:${id}:-1`
 *     （#5 决议），本文件统一由 name_of 承担；
 *   - ere 无全局 RAND 序列（#117），随机经注入的 rand 掷出（缺省
 *     Math.random，run_dungeon 第二参透传——迷宫/陷阱/房间共用同一随机源，
 *     #176 先例）。**注意店遭遇掷（RAND:10）在早退之后、无条件的
 *     掷点**：换真身后侵攻勇者的房间调用每次消费一枚随机数，其后的
 *     PRNG 序列相对存根期整体不一致（ending_2 e2e 的天数区间已为此留余量）；
 *   - 全局 A / RESULT / D:20 的换手改显式传参与返回值（#5 决议第六条）：
 *     A → 各函数首参；RESULT → dungeon_room 返回值（1 = 店遭遇，该房间
 *     不发生战斗，run_dungeon 的 NO_BATTLE 累加）；D:20（侵攻度，
 *     dungeon_mase 写）经 ctx 对象回写，与陷阱侧 trap_ctx 同一形式（#176
 *     先例；调用点 dungeon.js 在房间与陷阱两段间共享同一 ctx）；
 *   - TARGET（dungeon_heat 绿洲分支的 JUEL:TARGET:6 / CFLAG:TARGET:2）
 *     经 era_flag.target（run_dungeon 开头置位；直调需先置）；
 *   - MONEY / EX_FLAG:4444 → era_flag.money / era_exflag.legit_money
 *     （dungeon.js 先例）；EX_FLAG:99（威望）→ era_exflag.prestige；
 *   - karma / campaign_room 经函数内延迟 require 复用 dungeon.js 的域内
 *     存根（避开循环初始化，#175/#176 先例）；add_ex_item / sell_ex_item /
 *     ex_item_name 随 #344 复用 ex-item.js 真身；rand_monster_number
 *     复用 monster-summon.js 真身；campaign_room_extra 仍是域内存根；
 *   - CFLAG:503 是位域（门面名「休憩」只覆盖位 0；#176 约定）：本文件
 *     只动位 5（32 = 博物馆陈列架的先制封印），位操作裸寻址；
 *   - TIMES COST, 1.1 → Math.floor(cost * 1.1)（截断，#176 同款）；
 *   - PRINT/PRINTFORM 不换行、PRINTL/PRINTFORML 换行：同一显示行的
 *     拼接归并为一次 era.print（引擎 print 每调用一行，dungeon.js 先例）；
 *     PRINTW/PRINTFORMW 是 print + 读键；设施头部的「扩张：○」三连拼为
 *     同一行（七处）；
 *   - 设施日结算的显示怪癖保留（见各处注释）：SHOP_DAY 的 PRINTW 収入
 *     减少（原文日文汉字「収」，#60 归一为「收」）。
 */

'use strict';

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { chara } = require('#/facade/chara');
const { DispatchFamily } = require('#/system/dispatch/dispatch-family');
const ex_item_mod = require('#/dungeon/ex-item');
const summon_mod = require('#/dungeon/monster-summon');

/**
 * CAMPAIGN_ROOM_EXTRA_{FLAG:400} 族：战役迷宫房间的扩张位域（#469，
 * 决议 #7）。键是 FLAG:400，声明空间 {1}（page-campaign.js 文件头同款
 * 依据）；实现在 ere/page/page-campaign-1.js 注册。
 */
const campaign_room_extra_family = new DispatchFamily(
  'CAMPAIGN_ROOM_EXTRA',
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

/**
 * campaign_room_extra：战役迷宫房间的
 * 扩张位域。
 * @param {number} floor 阶层（ARG:0）
 * @returns {Promise<number>} 扩张位域（FLAG:400 < 1 时恒 0）
 */
async function campaign_room_extra(floor) {
  const active = era_flag.hero_campaign_active;
  if (active < 1) {
    return 0;
  }
  return campaign_room_extra_family.call(active, {
    whenMissing: 0,
    args: [floor],
  });
}

/** 设施头部的「扩张：○」段（七处同构的 SIF 三连，文件头） */
function expansion_text(extra, names) {
  let out = extra === 0 ? '：无' : '';
  if (extra & 1) {
    out += `：${names[0]}`;
  }
  if (extra & 2) {
    out += `：${names[1]}`;
  }
  return out;
}

/**
 * dungeon_room：房间分发。
 *
 * 迎击中（CFLAG:1 == 3）是建設（ROOM_BUILD 后直接返回）；侵攻/战役中
 * （2/12）先掷 1/10 的店遭遇（RESULT 1 = 该房间不发生战斗——
 * run_dungeon 的 NO_BATTLE 累加，存根期恒 0），再按 FLAG:(阶层+349)
 * 分发八种设施。战役（12）的房间表来自 campaign_room / campaign_room_extra
 * 族（未注册战役时恒 0，无设施效果）。
 *
 * @param {number} arg0 受设施效果者（ARG:0；调用方 1/3 掷选的 A）
 * @param {(n: number) => number} [rand] RAND:N 随机源（缺省均匀随机）
 * @param {{d20?: number}} [ctx] 侵攻度 D:20 的共享槽（dungeon_mase 写；调用
 *   点在返回后收回。缺省时 dungeon_mase 的写丢弃——仅测试直调场景）
 * @returns {Promise<number>} RESULT（1 = 店遭遇，不发生战斗；其余 0）
 */
async function dungeon_room(arg0, rand, ctx) {
  const rand_n = rand ?? default_rand;

  // 迎撃の場合、建設
  if (chara(arg0).invasion.状态 === 3) {
    await dungeon_room_build(arg0, rand_n);
    return 0;
  }

  // 侵攻中の勇者？（2 = 侵攻 / 12 = 战役）
  const place = chara(arg0).invasion.状态;
  if (place !== 2 && place !== 12) {
    return 0;
  }

  // 店遭遇の可能性——戦闘が発生しないフラグを返す
  if (rand_n(10) === 0) {
    await dungeon_shop_itemsell(arg0, rand_n);
    return 1;
  }

  // 施設番号（;ITEM:ROOM -= 1 即注释态）
  let room;
  let extra;
  if (place === 12) {
    // 戦役：campaign_room（延迟 require dungeon.js，防环）/
    // campaign_room_extra（域内真身，#469 起）
    const dungeon_mod = require('#/dungeon/dungeon');
    room = await dungeon_mod.campaign_room(chara(arg0).dungeon.侵攻阶层);
    extra = await campaign_room_extra(chara(arg0).dungeon.侵攻阶层);
  } else {
    const room_id = chara(arg0).dungeon.侵攻阶层 + 349;
    // 施設なし
    if ((era.get(`flag:${room_id}`) || 0) <= 0) {
      return 0;
    }
    room = era.get(`flag:${room_id}`) || 0;
    // 拡張（+10 槽）
    extra = era.get(`flag:${room_id + 10}`) || 0;
  }

  // 八种设施分发
  if (room === 500) {
    await dungeon_shop(arg0, extra, rand_n);
  } else if (room === 501) {
    await dungeon_swamp(arg0, extra);
  } else if (room === 502) {
    await dungeon_farm_rescue(arg0);
  } else if (room === 503) {
    await dungeon_ice(arg0, extra, rand_n);
  } else if (room === 504) {
    await dungeon_heat(arg0, extra, rand_n);
  } else if (room === 505) {
    await dungeon_mase(arg0, extra, rand_n, ctx);
  } else if (room === 506) {
    await dungeon_museum(arg0, extra, rand_n);
  } else if (room === 507) {
    await dungeon_hotel(arg0, extra);
  }

  return 0;
}

/**
 * dungeon_room_build：迎击方的设施扩张（读全局 A）。
 *
 * 迎击者带着扩张指令（CFLAG:500 == 3）进入本层时掷扩张：RAND:4 == 0 掷
 * 扩张位 0（+1），否则 RAND:3 == 0 掷扩张位 1（+2）。**已有该扩张位时原
 * 地返回、不清指令**（CFLAG:500 仍 3——下轮 run_dungeon 主循环的「扩张失败」
 * 分支据此收尾）；成功才清指令。
 * 注释：全ての拡張を同一に行うので、拡張を追加する際は全部の数を
 * 増やすこと（いまは2個だけ）。
 *
 * @param {number} a 受者（全局 A，由 dungeon_room 置为 ARG:0）
 * @param {(n: number) => number} rand_n RAND:N 随机源
 * @returns {Promise<number>} 恒 return 0
 */
async function dungeon_room_build(a, rand_n) {
  const show = ((era.get('flag:5') || 0) & 32) !== 0;

  // 命令チェック
  if ((era.get(`cflag:${a}:500`) || 0) !== 3) {
    return 0;
  }

  const room_id = chara(a).dungeon.侵攻阶层 + 349;

  // 设施无
  if ((era.get(`flag:${room_id}`) || 0) <= 0) {
    return 0;
  }

  // 设施番号 / 拡張
  const room = era.get(`flag:${room_id}`) || 0;
  const extra = era.get(`flag:${room_id + 10}`) || 0;

  // 確率を弄る場合ここのランダムを弄る
  if (rand_n(4) === 0) {
    // 拡張1
    if (extra & 1) {
      return 0;
    }
    era.set(`flag:${room_id + 10}`, extra + 1); // FLAG:ROOMID += 1
  } else if (rand_n(3) === 0) {
    // 拡張2
    if (extra & 2) {
      return 0;
    }
    era.set(`flag:${room_id + 10}`, extra + 2); // FLAG:ROOMID += 2
  } else {
    return 0;
  }

  // 建成播报（FLAG:5 & 32 显示开关）
  if (show) {
    era.println(); // PRINTL
    era.print(
      `${era.get(`itemname:${room}`) ?? ''}进行了扩张！扩张` +
        `${(era.get(`flag:${room_id + 10}`) || 0) & 1 ? '：○' : '：×'}` +
        `${(era.get(`flag:${room_id + 10}`) || 0) & 2 ? '：○' : '：×'}`,
    ); // 同一显示行
    era.print(`${name_of(a)}的工作变为内职了。`); // printformw
    await era.waitAnyKey();
  }

  chara(a).stronghold.迷宫内行动 = 0; // （CFLAG:500 = 0，门面 #177 补名）
  return 0;
}

/**
 * dungeon_room_day：设施的每日结算循环。
 *
 * 扫第 1-9 层（FLAG:350-358），商店街（500）走 dungeon_shop_day、人类
 * 牧场（502）走 dungeon_farm——其余六种无日结算。ere/event/event-nextday.js
 * 的调用点无条件执行。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（缺省均匀随机；
 *   只有 SHOP_DAY 的税额掷消费）
 * @returns {Promise<number>} 恒 return 0
 */
async function dungeon_room_day(rand) {
  const rand_n = rand ?? default_rand;

  // FOR ROOMID, 350, 359（FOR 区间 [350, 359) = 九层）
  for (let room_id = 350; room_id < 359; room_id += 1) {
    const room = era.get(`flag:${room_id}`) || 0;
    const extra = era.get(`flag:${room_id + 10}`) || 0;

    if (room === 500) {
      await dungeon_shop_day(extra, rand_n);
    } else if (room === 502) {
      await dungeon_farm(extra, rand_n);
    }
  }

  return 0;
}

/**
 * dungeon_shop：商店街。僅かながら現金収入。
 * 拡張& 1=武具屋、& 2=道具屋。
 *
 * 三分支：扩张位 0 且 1/3 掷中 → 武器屋（COST ×8/20 档，买武器 add_ex_item
 * -2）；否则扩张位 1 且 1/2 掷中 → 道具屋（×6/20 档，-3）；都没掷中 →
 * 逛街吃喝（体力 +20 / 气力 +50）。三分支都从勇者所持金（CFLAG:580）扣、
 * 魔王侧 MONEY 加（EX_FLAG:4444 镜像）。
 *
 * @param {number} a 受者（全局 A）
 * @param {number} extra 扩张位域（ARG:0）
 * @param {(n: number) => number} rand_n RAND:N 随机源
 * @returns {Promise<number>} 恒 return 0
 */
async function dungeon_shop(a, extra, rand_n) {
  const show = ((era.get('flag:5') || 0) & 32) !== 0;

  // 设施头部
  if (show) {
    era.println();
    era.print(
      `是商店街型地下城扩张${expansion_text(extra, ['武器店', '道具店'])}`,
    ); // 同一显示行
  }

  // COST = 代金
  let cost = (era.get(`cflag:${a}:9`) || 0) * 5 + 10;

  if (extra & 1 && rand_n(3) === 0) {
    // 武器屋分岐
    if (show) {
      era.print(`${name_of(a)}找到了武器店…`); // printformw
      await era.waitAnyKey();
    }

    cost = (era.get(`cflag:${a}:9`) || 0) * 8 + 20;

    if ((era.get(`cflag:${a}:580`) || 0) < cost) {
      if (show) {
        era.print(`${name_of(a)}带的钱不够，眼巴巴地看着橱窗发愁……`);
        await era.waitAnyKey();
      }
      return 0;
    }

    // CALL add_ex_item, -2, A, 1
    const result = await ex_item_mod.add_ex_item(-2, a, 1, rand_n);
    if (show && result > 0) {
      era.print(`现金收入+${cost}`);
      await era.waitAnyKey();
    }

    if (result > 0) {
      era_flag.money += cost;
      era_exflag.legit_money += cost;
      chara(a).dungeon.所持金 -= cost;
    }

    return 0;
  } else if (extra & 2 && rand_n(2) === 0) {
    // 道具屋分岐
    if (show) {
      era.print(`${name_of(a)}找到了道具店…`);
      await era.waitAnyKey();
    }

    cost = (era.get(`cflag:${a}:9`) || 0) * 6 + 20;

    if ((era.get(`cflag:${a}:580`) || 0) < cost) {
      if (show) {
        era.print(`${name_of(a)}带的钱不够，眼巴巴地看着橱窗发愁……`);
        await era.waitAnyKey();
      }
      return 0;
    }

    // CALL add_ex_item, -3, A, 1
    const result = await ex_item_mod.add_ex_item(-3, a, 1, rand_n);
    if (show && result > 0) {
      era.print(`现金收入+${cost}`);
      await era.waitAnyKey();
    }

    if (result > 0) {
      era_flag.money += cost;
      era_exflag.legit_money += cost;
      chara(a).dungeon.所持金 -= cost;
    }

    return 0;
  }

  // 逛街档的钱检
  if ((era.get(`cflag:${a}:580`) || 0) < cost) {
    if (show) {
      era.print(`${name_of(a)}带的钱不够，在商店街边走边叹气……`);
      await era.waitAnyKey();
    }
    return 0;
  }

  era_flag.money += cost;
  era_exflag.legit_money += cost;
  chara(a).dungeon.所持金 -= cost;
  chara(a).dungeon.体力 += 20; // BASE:A:0 += 20
  chara(a).dungeon.气力 += 50; // BASE:A:1 += 50

  if (show) {
    era.print(`${name_of(a)}在商店街尽情地大吃大喝…（体力+20、气力+50）`);
    await era.waitAnyKey();
    era.print(`现金收入+${cost}`);
    await era.waitAnyKey();
  }

  return 0;
}

/**
 * dungeon_shop_itemsell：ダンジョン内にあるアイテムを売る
 * 店（不思議のダンジョン系で床にアイテム置いて売ってるやつ）。
 *
 * 店遭遇（dungeon_room 的 1/10 掷）时调用：否定の珠（JUEL:100）
 * 2000 以上换 500 所持金；反発刻印（MARK:3）1 点换 1000 经验值
 * （EXP:80）；卖掉身上 EX 道具；钱够再买一件补给（ADD_EX_ITEM -3）。
 * RESULT 语义由调用方转成「不发生战斗」。
 *
 * @param {number} a 受者（全局 A）
 * @returns {Promise<number>} 恒 return 0
 */
async function dungeon_shop_itemsell(a, rand_n = default_rand) {
  const show = ((era.get('flag:5') || 0) & 32) !== 0;

  // COST = 値段（最大 1000）
  let cost = (era.get(`cflag:${a}:9`) || 0) * 6 + 50;
  if (cost > 1000) {
    cost = 1000;
  }

  if (show) {
    era.println();
    era.print(
      `${name_of(a)}发现了一间不可思议的房间，里面有着陈列架和柜台，正在卖着东西……`,
    );
  }

  // 否定の珠売却
  if ((era.get(`juel:${a}:100`) || 0) > 2000) {
    if (show) {
      era.print(`很反感魔王的${name_of(a)}从店主处拿到了赞助……（资金+500）`);
      await era.waitAnyKey();
    }
    era.set(`juel:${a}:100`, (era.get(`juel:${a}:100`) || 0) - 500);
    chara(a).dungeon.所持金 += 500;
  }

  // 反発刻印売却
  if ((era.get(`mark:${a}:3`) || 0) > 0) {
    if (show) {
      era.print(
        `很讨厌魔王的${name_of(a)}从店主处获得了力量……（经验值+${(era.get(`mark:${a}:3`) || 0) * 1000}）`,
      );
      await era.waitAnyKey();
    }
    era.set(
      `exp:${a}:80`,
      (era.get(`exp:${a}:80`) || 0) + (era.get(`mark:${a}:3`) || 0) * 1000,
    );
    chara(a).system.反抗刻印 -= 1; // MARK:3 -= 1
  }

  // アイテム売却（域内存根）
  ex_item_mod.sell_ex_item(a, rand_n);

  // 钱检
  if ((era.get(`cflag:${a}:580`) || 0) < cost) {
    if (show) {
      era.print(`${name_of(a)}带的钱不够，眼巴巴地在店里转了一圈……`); // PRINTFORML（无读键）
    }
    return 0;
  }

  // CALL add_ex_item, -3, A, 1
  const result = await ex_item_mod.add_ex_item(-3, a, 1, rand_n);
  if (show && result > 0) {
    era.print(`现金收入+${cost}`); // PRINTFORML（无读键）
  }

  if (result > 0) {
    era_flag.money += cost;
    era_exflag.legit_money += cost;
    chara(a).dungeon.所持金 -= cost;
  }

  return 0;
}

/**
 * dungeon_shop_day：商店街的每日税收入。
 * 拡張& 1=武具屋、& 2=道具屋（各加 CFLAG:0:9 + 20）。
 *
 * 税基 = 魔王等级（CFLAG:0:9，MASTER 恒角色 0）× RAND(10)+5；按威望值
 * （EX_FLAG:99）五档打折（岌岌可危归零 / 动荡不安 ×3/10 / 略受质疑 ×3/4 /
 * 相安无事 ×6/5 / 广受爱戴 ×2；区间外的威望无折扣——负值与 >100 都直落）。
 * 播报不走 FLAG:5 显示开关，每日无条件可见。
 *
 * @param {number} extra 扩张位域（ARG:0）
 * @param {(n: number) => number} rand_n RAND:N 随机源
 * @returns {Promise<number>} 恒 return 0
 */
async function dungeon_shop_day(extra, rand_n) {
  // INCOME = CFLAG:0:9 * (RAND:10 + 5)
  const master_lv = era.get('cflag:0:9') || 0;
  let income = master_lv * (rand_n(10) + 5);

  // 拡張によって僅かに増える
  if (extra & 1) {
    income += master_lv + 20;
  }
  if (extra & 2) {
    income += master_lv + 20;
  }

  // 威望值五档（EX_FLAG:99）
  const prestige = era_exflag.prestige;
  if (prestige <= 20 && prestige >= 0) {
    era.print('威望值是【岌岌可危】'); // PRINTL
    income = 0;
  } else if (prestige <= 40 && prestige > 20) {
    era.print('威望值是【动荡不安】');
    era.print('收入减少'); // PRINTW（原文「収入减少」，#60 归一）
    await era.waitAnyKey();
    income = Math.floor((income * 3) / 10);
  } else if (prestige <= 60 && prestige > 40) {
    era.print('威望值是【略受质疑】');
    income = Math.floor((income * 3) / 4);
  } else if (prestige <= 80 && prestige > 60) {
    era.print('威望值是【相安无事】');
    income = Math.floor((income * 6) / 5);
  } else if (prestige <= 100 && prestige > 80) {
    era.print('威望值是【广受爱戴】');
    income *= 2;
  }

  era.println(); // PRINTL 真空行：威望行已收尾
  era.print(`从商店街征收了今天的税金。（现金收入+${income}）`);
  await era.waitAnyKey();

  era_flag.money += income;
  era_exflag.legit_money += income;

  return 0;
}

/**
 * dungeon_swamp：毒沼。機能していないようなので毒沼に変更
 * （原注释）。拡張& 1=毒草（相手が強いほど強化：+ 勇者等级）、
 * & 2=毒蟲（陷阱レベルで強化：+ FLAG:85 × 2）。
 *
 * @param {number} a 受者（全局 A）
 * @param {number} extra 扩张位域（ARG:0）
 * @returns {Promise<number>} 恒 return 0
 */
async function dungeon_swamp(a, extra) {
  const show = ((era.get('flag:5') || 0) & 32) !== 0;

  // 设施头部
  if (show) {
    era.println();
    era.print(`是毒沼型地下城扩张${expansion_text(extra, ['毒草', '毒虫'])}`);
  }

  // DMG = ダメージ量
  let dmg = (era.get('cflag:0:9') || 0) + 10;

  // 毒草（相手が強いほど強化）
  if (extra & 1) {
    dmg += era.get(`cflag:${a}:9`) || 0;
  }

  // 毒蟲（陷阱レベルで強化）
  if (extra & 2) {
    dmg += (era.get('flag:85') || 0) * 2;
  }

  chara(a).dungeon.体力 -= dmg;

  // 最低1は残るタイプ
  if (chara(a).dungeon.体力 < 1) {
    chara(a).dungeon.体力 = 1;
  }

  if (show) {
    era.print(`${name_of(a)}走在毒沼中………（${dmg}点伤害！）`);
    await era.waitAnyKey();
  }

  return 0;
}

/**
 * 牧场台词表（SELECTCASE TALK 的 CASE → 文本，位段编码：
 * 个位 = RAND:6 随机段，十位 = 设施拡張（10 搾乳 / 20 ふたなり），
 * 百位 = 肉便器数档（100/200/300/400/500）。SELECTCASE 无 ELSE——
 * 组合全覆盖（个位 0-5 × 十位 {0,10,20} × 百位七档均有 CASE），未命中
 * 不打印，有意保留）
 */
const FARM_TALK = {
  0: '「嗯…嗯…」',
  1: '「已经…不想…再生…啦…………」',
  2: '「呜呜…啊！～！…泄了！！」',
  3: '「唔哦！！…噢噢～！哦哦哦！…」',
  4: '「唔…啊啊………」',
  5: '「已经怀孕了………请……饶了我吧……………」',
  10: '「奶水…要出来了………」',
  11: '「奶水…要出来了………」',
  12: '「奶水…要出来了………」',
  13: '「奶水…要出来了………」',
  14: '「奶水…要出来了………」',
  15: '「奶水…要出来了………」',
  20: '「扶她的鸡鸡………」',
  21: '「扶她的鸡鸡………」',
  22: '「扶她的鸡鸡………」',
  23: '「扶她的鸡鸡………」',
  24: '「扶她的鸡鸡………」',
  25: '「扶她的鸡鸡………」',
  100: '「不要…不要啊…」',
  101: '「啊啊………」',
  102: '「肚子…在动……」',
  103: '「全是精液……好讨厌………」',
  104: '「已经不行了………」',
  105: '「这里是………哪里？」',
  110: '「放……放过胸部吧…………」',
  111: '「放……放过胸部吧…………」',
  112: '「放……放过胸部吧…………」',
  113: '「放……放过胸部吧…………」',
  114: '「放……放过胸部吧…………」',
  115: '「放……放过胸部吧…………」',
  120: '「啊～鸡鸡…好舒服～！」',
  121: '「啊～鸡鸡…好舒服～！」',
  122: '「啊～鸡鸡…好舒服～！」',
  123: '「啊～鸡鸡…好舒服～！」',
  124: '「啊～鸡鸡…好舒服～！」',
  125: '「啊～鸡鸡…好舒服～！」',
  200: '「呜呜……明明…不会再反抗了……」',
  201: '「不要再插进去啦！！…」',
  202: '「我……生了多少个了啊………」',
  203: '「啊～精液…好美味～…」',
  204: '「好想回家………」',
  205: '「现在…是何年何月啦………」',
  210: '「胸部……胸部……嘻嘻嘻嘻……哈哈哈哈哈…………」',
  211: '「胸部……胸部……嘻嘻嘻嘻……哈哈哈哈哈…………」',
  212: '「胸部……胸部……嘻嘻嘻嘻……哈哈哈哈哈…………」',
  213: '「胸部……胸部……嘻嘻嘻嘻……哈哈哈哈哈…………」',
  214: '「胸部……胸部……嘻嘻嘻嘻……哈哈哈哈哈…………」',
  215: '「胸部……胸部……嘻嘻嘻嘻……哈哈哈哈哈…………」',
  220: '「啊，一直勃起着…………」',
  221: '「啊，一直勃起着…………」',
  222: '「啊，一直勃起着…………」',
  223: '「啊，一直勃起着…………」',
  224: '「啊，一直勃起着…………」',
  225: '「啊，一直勃起着…………」',
  300: '「求求你们放过我吧……已经…不想再生…不想再生啦！……」',
  301: '「里面…再狠狠地插进来………」',
  302: '「啊～鸡鸡～…好美味啊～」',
  303: '「后面……也……来………」',
  304: '「哈……哈………」',
  305: '「你………新被抓来的？」',
  310: '「不行…乳头勃起来了………」',
  311: '「不行…乳头勃起来了………」',
  312: '「不行…乳头勃起来了………」',
  313: '「不行…乳头勃起来了………」',
  314: '「不行…乳头勃起来了………」',
  315: '「不行…乳头勃起来了………」',
  320: '「精液……满满的………」',
  321: '「精液……满满的………」',
  322: '「精液……满满的………」',
  323: '「精液……满满的………」',
  324: '「精液……满满的………」',
  325: '「精液……满满的………」',
  400: '「又……又生了…………」',
  401: '「豆豆勃起着……下不去了…………」',
  402: '「再来………」',
  403: '（跪趴在地舔舐着零落的精液）',
  404: '「好大…………」',
  405: '「泄了！！～又要泄了！！！！！…」',
  410: '「好舒服……再狠狠地榨我的乳啊！………」',
  411: '「好舒服……再狠狠地榨我的乳啊！………」',
  412: '「好舒服……再狠狠地榨我的乳啊！………」',
  413: '「好舒服……再狠狠地榨我的乳啊！………」',
  414: '「好舒服……再狠狠地榨我的乳啊！………」',
  415: '「好舒服……再狠狠地榨我的乳啊！………」',
  420: '「我是便器……我是便器…………」',
  421: '「我是便器……我是便器…………」',
  422: '「我是便器……我是便器…………」',
  423: '「我是便器……我是便器…………」',
  424: '「我是便器……我是便器…………」',
  425: '「我是便器……我是便器…………」',
  500: '「啊哈哈……我的……孩子………」',
  501: '「阴蒂…又肿…又痛…啊…………」',
  502: '「唔哦～！！………」',
  503: '（央求着阴茎）',
  504: '（发疯似得扭动着腰）',
  505: '「……」',
  510: '「奶水好香……玩烂我的胸！玩坏它！哈哈哈…哈哈……」',
  511: '「奶水好香……玩烂我的胸！玩坏它！哈哈哈…哈哈……」',
  512: '「奶水好香……玩烂我的胸！玩坏它！哈哈哈…哈哈……」',
  513: '「奶水好香……玩烂我的胸！玩坏它！哈哈哈…哈哈……」',
  514: '「奶水好香……玩烂我的胸！玩坏它！哈哈哈…哈哈……」',
  515: '「奶水好香……玩烂我的胸！玩坏它！哈哈哈…哈哈……」',
  520: '「哈哈…鸡鸡…鸡鸡……好棒好棒………」',
  521: '「哈哈…鸡鸡…鸡鸡……好棒好棒………」',
  522: '「哈哈…鸡鸡…鸡鸡……好棒好棒………」',
  523: '「哈哈…鸡鸡…鸡鸡……好棒好棒………」',
  524: '「哈哈…鸡鸡…鸡鸡……好棒好棒………」',
  525: '「哈哈…鸡鸡…鸡鸡……好棒好棒………」',
};

/**
 * dungeon_farm：人类牧场的日结算。怪物が増える。
 * 拡張& 1=搾乳設備（+FLAG:83 G）、& 2=扶她種付け奴隷（+FLAG:83 经验）。
 *
 * 肉便器数 FLAG:83 只数为正才结算；RAND_MONSTER_NUMBER 抽怪物、只数
 * += FLAG:83（上限 999）或卖孩子（FLAG:614 位 1）折现金；FLAG:614 位 0
 * 是日志关闭（LOG_OFF）；FLAG:613 是竿役（1 大叔 / 2 少年 / 3 扶她）。
 *
 * 卖孩子开启时出生只数不增加库存、直接折现金（只计一次）。
 *
 * @param {number} extra 扩张位域（ARG:0）
 * @param {(n: number) => number} rand_n RAND:N 随机源
 * @returns {Promise<number>} 恒 return 0（早退后无显式 RETURN）
 */
async function dungeon_farm(extra, rand_n) {
  // 肉便器ないとダメ
  const meat_count = era_flag.meat_toilet_count;
  if (meat_count <= 0) {
    return 0;
  }

  // 20160524改変
  // GETBIT FLAG:614,0 → LOG_OFF；GETBIT FLAG:614,1 → SELL_BABY
  const flags614 = era.get('flag:614') || 0;
  const log_off = (flags614 & 1) !== 0;
  const sell_baby = ((flags614 >> 1) & 1) !== 0;

  // 怪物抽选与只数
  const mon_id = summon_mod.rand_monster_number(rand_n);
  let mon_num = era.get(`item:${mon_id}`) || 0;
  if (sell_baby) {
    era_flag.money += meat_count * 10;
    era_exflag.legit_money += meat_count * 10;
  } else if (mon_num + meat_count > 999) {
    mon_num = 999;
  } else {
    mon_num += meat_count;
  }

  // 竿役分岐（FLAG:613 == 1/2/3 且日志开着）
  const pole_role = era.get('flag:613') || 0;
  if (pole_role === 1 && !log_off) {
    era.print('「播种的大叔们好好努力让便器们怀孕啊~」');
    era.print('监督的淫魔踹着俘虏中年的腰，中年将腥臭的精液大量注入了肉便器……');
    await era.waitAnyKey();
  } else if (pole_role === 2 && !log_off) {
    era.print('「小鸡鸡奴隶少年们，加把劲啊。把分配的播种任务完成就行了。」');
    era.print(
      '监督的淫魔温柔地催促着，俘虏少年将充满年轻气息的浓厚精液注入了肉便器……',
    );
    await era.waitAnyKey();
  } else if (pole_role === 3 && !log_off) {
    era.print('「怀孕吧！　怀上吧！　啊哈哈哈，怀孕吧！」');
    era.print('扶她淫魔的媚药精液不断地注入了肉便器中……');
    await era.waitAnyKey();
  }

  // FOR LOCAL:0, 0, FLAG:83——台词段（≤10 条，LOG_OFF 即断）
  // （每条 PRINT 后跟 PRINT 空格，全部拼一行，PRINTL 收行）
  let talk_line = '';
  if (!log_off) {
    for (let local0 = 0; local0 < meat_count; local0 += 1) {
      if (local0 >= 10) {
        break;
      }

      // 1の位はランダムパターン
      let talk = rand_n(6);

      // 10の位は施設拡張フラグ
      if (extra & 1 && rand_n(6) === 0) {
        // 搾乳フラグON
        talk += 10;
      } else if (extra & 2 && rand_n(5) === 0) {
        // ふたなりフラグON
        talk += 20;
      }

      // 100の位は肉便器の数
      if (meat_count > 100 && rand_n(6) === 0) {
        talk += 500;
      } else if (meat_count > 80 && rand_n(5) === 0) {
        talk += 400;
      } else if (meat_count > 60 && rand_n(4) === 0) {
        talk += 300;
      } else if (meat_count > 40 && rand_n(3) === 0) {
        talk += 200;
      } else if (meat_count > 20 && rand_n(2) === 0) {
        talk += 100;
      }

      talk_line += `${FARM_TALK[talk] ?? ''} `; // （+ 拼接空格）
    }
  }
  era.print(talk_line); // PRINTL（LOG_OFF 时为空行）

  // 播报（SIF 检查行被注释，无条件打印——LOG_OFF 也打）
  era.print(
    `人类牧场的肉便器生了${meat_count}只${era.get(`itemname:${mon_id}`) ?? ''}。`,
  );

  if (!log_off && sell_baby) {
    era.print(`将人类牧场的肉便器生下的孩子卖了${meat_count * 10}G。`);
  }

  if (extra & 1) {
    // 搾乳
    era.print(`出售从肉便器挤出的乳汁得到了${meat_count}G。`);
    era_flag.money += meat_count;
    era_exflag.legit_money += meat_count;
  }

  if (extra & 2) {
    // 扶她奴隷（EXP:0:80——角色 0，MASTER）
    era.print(
      `原本是勇者的扶她奴隶侵犯着肉便器，淫欲转化成了${meat_count}经验值。`,
    );
    era.set('exp:0:80', (era.get('exp:0:80') || 0) + meat_count);
  }

  if (!log_off) {
    await era.waitAnyKey(); // WAIT
  }

  era.set(`item:${mon_id}`, mon_num);

  return 0;
}

/**
 * dungeon_farm_rescue：勇者到达牧场时肉便器被救走一只。
 * 拡張& 1=搾乳設備、& 2=扶她種付け奴隷（仅头部播报用）。
 *
 * 战役中（CFLAG:1 == 12）的勇者不停留救走肉便器；侵攻中（== 2）救走一只。
 *
 * @param {number} arg0 到达牧场的勇者
 * @returns {Promise<number>} 恒 return 0
 */
async function dungeon_farm_rescue(arg0) {
  const show = ((era.get('flag:5') || 0) & 32) !== 0;

  // 设施头部
  if (show) {
    era.println();
    era.print(
      `是人类牧场型地下城扩张${expansion_text(arg0, ['榨乳设备', '扶她配种奴隶'])}`,
    );
  }

  // 肉便器ないとダメ
  if ((era.get('flag:83') || 0) <= 0) {
    return 0;
  }

  if (show) {
    era.print('勇者发现了一个可悲的肉便器，并且将其解放。');
    await era.waitAnyKey();
  }

  // 战役中的勇者救走便器前先确认本人状态（CFLAG:1 == 12 不停留）
  if ((era.get(`cflag:${arg0}:1`) || 0) !== 12) {
    era_flag.meat_toilet_count -= 1;
  }

  return 0;
}

/**
 * dungeon_ice：冰室。勇者の攻撃力が1割下がる。
 * 拡張& 1=吹雪（アイテム破壊：RAND:6 == 0 时破坏 CFLAG:560-564 的一件
 * EX 道具）、& 2=積雪（精神ダメージ：+ CFLAG:0:9 + 2）。
 *
 * @param {number} a 受者（全局 A）
 * @param {number} extra 扩张位域（ARG:0）
 * @param {(n: number) => number} rand_n RAND:N 随机源
 * @returns {Promise<number>} 恒 return 0
 */
async function dungeon_ice(a, extra, rand_n) {
  const show = ((era.get('flag:5') || 0) & 32) !== 0;

  // 设施头部
  if (show) {
    era.println();
    era.print(`是冰封型地下城扩张${expansion_text(extra, ['吹雪', '积雪'])}`);
  }

  let mdmg = 0; // MDMG=気力ダメージ

  if (extra & 1 && rand_n(6) === 0) {
    // 吹雪（アイテム破壊）——LOCAL = RAND:5 + 560 的 CFLAG 槽
    const slot = rand_n(5) + 560;
    if ((era.get(`cflag:${a}:${slot}`) || 0) > 0 && show) {
      era.print(
        `激烈的飞雪把${ex_item_mod.ex_item_name(era.get(`cflag:${a}:${slot}`) || 0)}破坏了……`,
      ); // 拼行
      await era.waitAnyKey();
    }
    era.set(`cflag:${a}:${slot}`, 0); // （破坏无条件）
  }

  // デフォの攻撃値減少（CFLAG:11 *= 9 /= 10）
  const atk = era.get(`cflag:${a}:11`) || 0;
  era.set(`cflag:${a}:11`, Math.floor((atk * 9) / 10));

  // 積雪による精神ダメージ
  if (extra & 2) {
    mdmg += (era.get('cflag:0:9') || 0) + 2;
  }

  chara(a).dungeon.气力 -= mdmg;

  if (show) {
    era.print(
      `${name_of(a)}在冰室的严寒中哆嗦着身体………（攻击力下降一成！）` +
        `${mdmg > 0 ? `（${mdmg}点气力下降！）` : ''}`,
    ); // 拼行 + PRINTW
    await era.waitAnyKey();
  }

  return 0;
}

/**
 * dungeon_heat：热砂。勇者の防御力が1割下がる。
 * 拡張& 1=オアシス（回復点：RAND:6 == 0 时气力 +50 上限封顶、TARGET 的
 * JUEL:6 与好感度 CFLAG:2 上升、直接返回——防御衰减不发生）、& 2=火柱
 * （体力ダメージ：+ CFLAG:0:9 + 10）。
 *
 * @param {number} a 受者（全局 A）
 * @param {number} extra 扩张位域（ARG:0）
 * @param {(n: number) => number} rand_n RAND:N 随机源
 * @returns {Promise<number>} 恒 return 0
 */
async function dungeon_heat(a, extra, rand_n) {
  const show = ((era.get('flag:5') || 0) & 32) !== 0;

  // 设施头部
  if (show) {
    era.println();
    era.print(`是灼热型的地下城扩张${expansion_text(extra, ['绿洲', '火柱'])}`);
  }

  if (extra & 1 && rand_n(6) === 0) {
    // 回復点（诱惑的な効果）
    chara(a).dungeon.气力 += 50;
    const max_wp = era.get(`maxbase:${a}:1`) || 0;
    if (chara(a).dungeon.气力 > max_wp) {
      chara(a).dungeon.气力 = max_wp;
    }

    if (show) {
      era.print('发现了绿洲………（气力50回复！亲密度上升！）'); // PRINTFORML（无读键）
      era.print(`屈服点数+${(era.get('cflag:0:9') || 0) * 4}`);
      await era.waitAnyKey();
    }

    // JUEL:TARGET:6 += CFLAG:0:9 * 4；CFLAG:TARGET:2 += 20
    // （TARGET 经 era_flag.target，run_dungeon 开头置位，文件头）
    const target = era_flag.target;
    era.set(
      `juel:${target}:6`,
      (era.get(`juel:${target}:6`) || 0) + (era.get('cflag:0:9') || 0) * 4,
    );
    chara(target).chara.好感度 += 20; // CFLAG:TARGET:2 += 20

    return 0;
  }

  let dmg = 0;

  // 防御値減少（CFLAG:12 *= 9 /= 10）
  const def = era.get(`cflag:${a}:12`) || 0;
  era.set(`cflag:${a}:12`, Math.floor((def * 9) / 10));

  // 火柱によるダメージ
  if (extra & 2) {
    dmg += (era.get('cflag:0:9') || 0) + 10;
  }

  chara(a).dungeon.体力 -= dmg;

  // 最低1は残るタイプ
  if (chara(a).dungeon.体力 < 1) {
    chara(a).dungeon.体力 = 1;
  }

  if (show) {
    era.println();
    era.print(
      `${name_of(a)}由于热砂的暑气，集中力下降了……（防御力下降一成！）` +
        `${dmg > 0 ? `（火柱造成了${dmg}点伤害！）` : ''}`,
    ); // 拼行 + PRINTW
    await era.waitAnyKey();
  }

  return 0;
}

/**
 * dungeon_mase：迷阵。たまに迷う。
 * 拡張& 1=回転床、& 2=ダークゾーン（各 +5 侵攻度减少）。RAND:3 == 0
 * （1/3）不迷路直接返回；否则侵攻度 D:20 -= BACK（经 ctx 回写）并立
 * 迷惑状態 CFLAG:509 = 1（下轮 WALK 归零，run_dungeon 消费）。
 *
 * @param {number} a 受者（全局 A）
 * @param {number} extra 扩张位域（ARG:0）
 * @param {(n: number) => number} rand_n RAND:N 随机源
 * @param {{d20?: number}} [ctx] 侵攻度 D:20 的共享槽（本函数写）
 * @returns {Promise<number>} 恒 return 0
 */
async function dungeon_mase(a, extra, rand_n, ctx) {
  const show = ((era.get('flag:5') || 0) & 32) !== 0;

  // 设施头部
  if (show) {
    era.println();
    era.print(
      `是迷宫型地下城扩张${expansion_text(extra, ['回转地板', '黑暗地带'])}`,
    );
  }

  // BACK = 侵攻減少度
  let back = 0;
  if (extra & 1) {
    back += 5;
  }
  if (extra & 2) {
    back += 5;
  }

  // SIF RAND:3 < 1 → RETURN 0（1/3 不迷路）
  if (rand_n(3) < 1) {
    return 0;
  }

  // D:20 -= BACK（ctx 回写，文件头）
  if (ctx) {
    ctx.d20 -= back;
  }

  if (show) {
    era.print(`${name_of(a)}在迷宫里迷路了………`); // printformw
    await era.waitAnyKey();
    if (back > 0) {
      era.print('突然发现走了回头路！'); // printform
    }
    await era.waitAnyKey(); // PRINTW
  }

  era.set(`cflag:${a}:509`, 1);
  return 0;
}

/**
 * dungeon_museum：博物馆。石像と剥製の数に応じて最大1/4
 * 気力が減る。拡張& 1=巡回ゴーレム（体力伤害 + FLAG:84 × 2）、
 * & 2=陳列棚（RAND:4 == 0 时 CFLAG:503 位 5 立起——先制封印，已在位则
 * 播报「已经无法先发制人了」不重复加）。
 *
 * @param {number} a 受者（全局 A）
 * @param {number} extra 扩张位域（ARG:0）
 * @param {(n: number) => number} rand_n RAND:N 随机源
 * @returns {Promise<number>} 恒 return 0
 */
async function dungeon_museum(a, extra, rand_n) {
  const show = ((era.get('flag:5') || 0) & 32) !== 0;

  // 设施头部
  if (show) {
    era.println();
    era.print(
      `是博物馆型地下城扩张${expansion_text(extra, ['巡逻魔像', '陈列架'])}`,
    );
  }

  // 石像と剥製ないとダメ
  const exhibits = era.get('flag:84') || 0;
  if (exhibits <= 0) {
    return 0;
  }

  // MDMG = 気力ダメージ；DMG = ダメージ
  let mdmg = exhibits * 5;
  let dmg = 0;
  if (extra & 1) {
    dmg += exhibits * 2;
  }

  // 上限 MAXBASE:A:1 / 4
  const max_wp = era.get(`maxbase:${a}:1`) || 0;
  if (mdmg > Math.floor(max_wp / 4)) {
    mdmg = Math.floor(max_wp / 4);
  }

  if (show) {
    era.print(
      `${name_of(a)}看到了勇者们变成的装饰品，发自内心地颤抖着………（气力-${mdmg}）`,
    ); // PRINTFORML（无读键；原文「変成」#60 归一为「变」）
    if (dmg > 0) {
      era.print(`用牺牲者制作成的魔像发起了攻击！（${dmg}伤害！）`);
    }
    await era.waitAnyKey(); // PRINTW
  }

  // 陳列棚（先制封印——CFLAG:503 位 5，#176 位域约定）
  if (rand_n(4) === 0 && extra & 2) {
    if (show) {
      era.print('远程攻击被柜子妨碍……（无法先发制人）');
      await era.waitAnyKey();
    }
    if ((era.get(`cflag:${a}:503`) || 0) & 32) {
      if (show) {
        era.print('已经无法先发制人了。'); // PRINTL（无读键）
      }
    } else {
      era.set(`cflag:${a}:503`, (era.get(`cflag:${a}:503`) || 0) + 32);
    }
  }

  chara(a).dungeon.气力 -= mdmg;
  if (dmg > 0) {
    chara(a).dungeon.体力 -= dmg;
  }

  // 最低1は残るタイプ
  if (chara(a).dungeon.体力 < 1) {
    chara(a).dungeon.体力 = 1;
  }

  return 0;
}

/**
 * dungeon_hotel：娼館街。性癖に合致すれば高額収入。
 * 拡張& 1=アナルOK、& 2=本番OK（各 COST × 1.1，TIMES 截断）。
 *
 * MENU 判定（SIF 链后者覆盖前者）：低善恶非处女 → 3 男淫魔；
 * 低善恶百合素质 / 低善恶扶她 / 低善恶男人 → 4 女淫魔；正太控（143）→ 1；
 * 萝莉控（142）→ 2（最后两支最高优先）。MENU == 0（无性癖交集）直接
 * 离开；否则从勇者所持金扣 COST、魔王侧入账、善恶值 -1（karma 域内
 * 延迟 require 存根）。
 *
 * @param {number} a 受者（全局 A）
 * @param {number} extra 扩张位域（ARG:0）
 * @returns {Promise<number>} 恒 return 0
 */
async function dungeon_hotel(a, extra) {
  const show = ((era.get('flag:5') || 0) & 32) !== 0;

  // 设施头部
  if (show) {
    era.println();
    era.print(
      `来到了娼馆街的迷宫扩张${expansion_text(extra, ['菊花OK', '本垒OK'])}`,
    );
  }

  // 判定（MENU = 1 正太控 / 2 萝莉控 / 3 男淫魔 / 4 女淫魔）
  let menu = 0;
  const karma = era.get(`cflag:${a}:151`) || 0;
  // カルマが低い非処女の場合（TALENT:0 处女位为 0）
  if (karma < -20 && (era.get(`talent:${a}:0`) || 0) === 0) {
    menu = 3;
  }
  // カルマが低いレズっ気の場合（ABL:22）
  if (karma < 0 && (era.get(`abl:${a}:22`) || 0) > 0) {
    menu = 4;
  }
  // カルマが低いふたなりの場合（TALENT:121）
  if (karma < 30 && era.get(`talent:${a}:121`)) {
    menu = 4;
  }
  // カルマが低いオトコの場合（TALENT:122）
  if (karma < 10 && era.get(`talent:${a}:122`)) {
    menu = 4;
  }
  // ショタコン（TALENT:143）
  if (era.get(`talent:${a}:143`)) {
    menu = 1;
  }
  // ロリコン（TALENT:142）
  if (era.get(`talent:${a}:142`)) {
    menu = 2;
  }

  if (menu === 0) {
    if (show) {
      era.print(`${name_of(a)}面露厌恶的穿过了街道…`);
      await era.waitAnyKey();
    }
    return 0;
  }

  // COST = 代金
  let cost = (era.get(`cflag:${a}:9`) || 0) * 8 + 150;

  // オプション（TIMES COST, 1.1 两次，#176 截断同款）
  if (extra & 1) {
    cost = Math.floor(cost * 1.1);
  }
  if (extra & 2) {
    cost = Math.floor(cost * 1.1);
  }

  // 钱检
  if ((era.get(`cflag:${a}:580`) || 0) < cost) {
    if (show) {
      era.print(`${name_of(a)}带的钱好像不够了…`);
      await era.waitAnyKey();
    }
    return 0;
  }

  if (show) {
    // 两行演出（PRINTL 收行 + PRINTFORMW 收尾）
    const partner =
      menu === 1
        ? '少年奴隶'
        : menu === 2
          ? '少女奴隶'
          : menu === 3
            ? '男淫魔'
            : '女淫魔';
    const enjoy =
      menu === 1 || menu === 2
        ? '享受着地上无法体会到的背德的快感……'
        : '愉快地享乐着…';
    era.print(`${name_of(a)}在娼馆街和${partner}一起${enjoy}（善恶值下降了1）`);
    era.print(`现金收入+${cost}`);
    await era.waitAnyKey();
  }

  era_flag.money += cost;
  era_exflag.legit_money += cost;
  chara(a).dungeon.所持金 -= cost;

  // CALL karma, A, -1（域内延迟 require，文件头）
  const dungeon_mod = require('#/dungeon/dungeon');
  dungeon_mod.karma(a, -1);

  return 0;
}

module.exports = {
  dungeon_room,
  dungeon_room_build,
  dungeon_room_day,
  dungeon_shop,
  dungeon_shop_itemsell,
  dungeon_shop_day,
  dungeon_swamp,
  dungeon_farm,
  dungeon_farm_rescue,
  dungeon_ice,
  dungeon_heat,
  dungeon_mase,
  dungeon_museum,
  dungeon_hotel,
  campaign_room_extra,
  // page-campaign-1.js 向这个族 register(1, ...)，本文件只声明、不参与注册
  campaign_room_extra_family,
};
