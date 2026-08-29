/**
 * @file 任务系统（issue #178，阶段 3 H9）：DUNGEON_QUEST.ERB 全量 17 函数。
 *
 * 源: target/ERB/迷宮/DUNGEON_QUEST.ERB  @SET_QUEST（:6-113，受注与清算）、
 *       @RESULT_QUEST（:116-177，战斗后成败结算）、@QUEST_SELECT（:180-513，
 *       任务文本分发——セット/成功/失敗/名前 四态 × 三型任务）、
 *       @QUEST_BATTLE_SET（:516-617，任务战斗判定与敌方设置）、
 *       @QUEST_BITCH（:620-682，性奉侍按怪物凌辱类型分派）+ 12 个
 *       @*_QUEST_BITCH 段（:689-951，各类型性奉侍的经验结算）
 *
 * 任务状态槽（CFLAG，dungeon 属主域内）：
 *   534 受注状态（0=无 1=受注中 bit1=成功完结 bit2=失败完结）
 *   535 报酬类型（1=资金 2=道德 3=道具）/ 536 障碍位图（bit0 BOSS、1 陷阱、
 *   2 时限、3 大量敌人、4 性要求、5 假任务）/ 537 任务类型（1-3）、
 *   538 讨伐对象怪物 ID / 539 受注计数（回合）/ 540 任务人称变体（0-4）
 *
 * 移植说明（有意偏离，均注明依据）：
 *   - **角色变量省略角色号 = TARGET**（Emuera 语义；旁证
 *     キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB:24-26「TARGETを差し替えて
 *     おく」后 :1057-1058 的 CFLAG:16 与 :1055 的 CFLAG:TARGET:9 指同一
 *     角色）。QUEST_BITCH 系的初吻/失贞写点（CFLAG:16/-1 判定、EXP:0、
 *     TALENT:0、CFLAG:15）全部读 era_flag.target——调用时点的残留值
 *     （原作同样如此，见文件尾注释）；
 *   - %SAVESTR:ARG% 承载名前，走 callname（#5 决议，dungeon.js 先例）；
 *     %ITEMNAME:MON_ID% 是裸 Item.yml 名，era.get(`itemname:id`)（#175
 *     MONSTER_LIST 段同款；拼接名才是 monstername）；
 *   - E 数组走 yml/E.yml 引擎表（monster-data.js 的 e_get/e_set）；
 *   - 原作全局 A（陷阱段换手）/ RESULT（QUEST_ON）/ ARGS（RESULT_QUEST
 *     的出参改写）改显式传参与返回值（#5 决议第六条）；ARGS 是 Emuera
 *     引用传参，ere 侧以返回值 { args } 传出，调用方不消费也保留；
 *   - ere 无全局 RAND 序列（#117），掷点经注入 rand（缺省 Math.random，
 *     dungeon-battle.js 先例）；**死赋值处的 RAND 照掷**（PRNG 序列与
 *     原作逐位对齐是种子化对比测试的前提，#175 文件头同款）；
 *   - 原作注释（;）照抄为 JS 注释，行号锚点保留。
 */

'use strict';

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { chara } = require('#/facade/chara');
const { e_get, e_set } = require('#/dungeon/monster-data');
// 陷阱真身（#176）：QUEST_BATTLE_SET 的障碍陷阱三选一。其对 dungeon.js
// 存根的延迟 require 同款防环；本文件不反依赖它，顶层引用无环。
const trap_mod = require('#/dungeon/dungeon-trap');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。KARMA / ADD_EX_ITEM / CAMPAIGN_
 * MONSTER_LIST 复用既有域内存根（#176 先例：复用、调用点列补新处），
 * 延迟 require 防环（dungeon.js ↔ dungeon-quest.js、dungeon-battle.js ↔
 * dungeon-quest.js 双向各一处，顶层只单向）。
 */
const STUBBED_CALLS = ['KARMA', 'ADD_EX_ITEM', 'CAMPAIGN_MONSTER_LIST'];

/** 名字承载（#5 决议；savestr 通道不存在，dungeon.js 先例） */
function name_of(cid) {
  return era.get(`callname:${cid}:-1`) ?? '';
}

/** 原作 RAND:N（0..N-1）的缺省实现 */
function default_rand(n) {
  return Math.floor(Math.random() * n);
}

/** GETBIT(X, n) */
function getbit(v, n) {
  return (v >> n) & 1;
}

/** SETBIT X, n（返回新值；写回由调用方） */
function setbit(v, n) {
  return v | (1 << n);
}

/**
 * @SET_QUEST（:6-113）：任务受注与上次任务的清算。
 *
 * 勇者队伍回城时由 @DUNGEON_TOWN 调用（必须在 TOWN_PT_PLANNING 之后——
 * 讨伐对象 RAND:(CFLAG:520) 读计划段刚写入的目标阶层，原作 :11-12 注释）。
 * 每个成员：完结态先清算（成功按报酬类型 1/2/3 发放；失败无报酬清 534），
 * 再在 534 == 0 时抽新任务（报酬 → 六个障碍位 → 任务类型与人称 → 讨伐
 * 对象 → 受注计数）。
 *
 * @param {number} arg 队长（原作 ARG:0；同伴经 CFLAG:531/532 编入）
 * @param {(n: number) => number} [rand] RAND:N 随机源（缺省均匀随机）
 * @returns {Promise<number>} 原作 RETURN 1
 */
async function set_quest(arg, rand = default_rand) {
  const rand_n = rand;
  // :16-17 クエスト禁止（FLAG:8 位 3 = 游戏设置 2 的任务开关，enter-enemy.js
  // 同款裸读；CHARA_INFO_SHOW 的受注显示同判此位）
  if (getbit(era.get('flag:8') || 0, 3) !== 0) {
    return 0;
  }

  // :19-21 PM:0 队长 / PM:1 仲間A / PM:2 仲間B
  const pm = [
    arg,
    era.get(`cflag:${arg}:531`) || 0,
    era.get(`cflag:${arg}:532`) || 0,
  ];

  // :23-111 全員に順番に設定する
  for (let lcount = 0; lcount < 3; lcount += 1) {
    if (pm[lcount] <= 0) {
      continue;
    }
    const cid = pm[lcount];
    const q534 = chara(cid).dungeon.已接任务;

    // :28-47 終了したクエストの清算
    if (getbit(q534, 2) !== 0) {
      // 失败完结：无报酬，仅复位
      chara(cid).dungeon.已接任务 = 0;
    } else if (getbit(q534, 1) !== 0) {
      // 成功報酬（:32-45）
      const reward = era.get(`cflag:${cid}:535`) || 0;
      if (reward === 1) {
        // お金（:33-37）
        const local = (era.get(`cflag:${cid}:9`) || 0) * 10 + 100;
        era.print(`${name_of(cid)}完成了任务、获得了资金${local}！`);
        await era.waitAnyKey(); // PRINTFORMW
        chara(cid).dungeon.所持金 += local; // CFLAG:580 += LOCAL
      } else if (reward === 2) {
        // 道德（:38-41）
        const local = 10;
        era.print(`${name_of(cid)}完成了任务、道德提升了${local}！`);
        await era.waitAnyKey(); // PRINTFORMW
        const { karma } = require('#/dungeon/dungeon');
        karma(cid, local); // CALL KARMA, (PM:LCOUNT), LOCAL
      } else if (reward === 3) {
        // 道具（:42-44）
        era.print(`${name_of(cid)}完成了任务！`);
        await era.waitAnyKey(); // PRINTFORMW
        const { add_ex_item } = require('#/dungeon/dungeon');
        await add_ex_item(-3, cid, 1); // CALL ADD_EX_ITEM, -3, (PM:LCOUNT), 1
      }
      chara(cid).dungeon.已接任务 = 0; // :46
    }

    // :49-51 受注状態が初期化されていないとダメ
    if (chara(cid).dungeon.已接任务 !== 0) {
      continue;
    }

    // :53-54 クエスト報酬（RAND:3 + 1 → 1=お金/2=道德/3=道具）
    era.set(`cflag:${cid}:535`, rand_n(3) + 1);

    // :56-83 クエストの障害（六个独立 1/3 掷点；bit5 假任务非显示）
    let q536 = 0; // CFLAG:536 = 0（:58 初始化）
    if (rand_n(3) === 0) {
      q536 = setbit(q536, 0); // それはボスとの戦闘を強いられる
    }
    if (rand_n(3) === 0) {
      q536 = setbit(q536, 1); // それは罠が仕掛けてある
    }
    if (rand_n(3) === 0) {
      q536 = setbit(q536, 2); // それは時間制限がある（名目位，见下）
    }
    if (rand_n(3) === 0) {
      q536 = setbit(q536, 3); // それは敵の数が異様に多い
    }
    if (rand_n(3) === 0) {
      q536 = setbit(q536, 4); // それは性奉仕を要求される
    }
    if (rand_n(3) === 0) {
      q536 = setbit(q536, 5); // それは偽の依頼である（非表示）
    }
    era.set(`cflag:${cid}:536`, q536);

    // :85-86 クエストの目的（タイプ 1-3 与人称 540 在此掷定）
    await quest_select(cid, '设定', 0, rand_n);

    // :88-96 討伐対象（モンスターID）
    if (chara(cid).invasion.状态 === 12) {
      // 戦役（CFLAG:1 == 12）：怪物表由战役侧给出（存根恒 0 → 讨伐对象 0，
      // RESULT_QUEST 的 E 列比对永不命中，战役线任务不结算——存根语义自洽）
      const { campaign_monster_list } = require('#/dungeon/dungeon-battle');
      const monid = campaign_monster_list(era.get(`cflag:${cid}:501`) || 0);
      era.set(`cflag:${cid}:538`, monid);
    } else {
      // 常规：目标阶层 × 10 + 种类 0-4 + 100（RAND:0 恒 0，阶层 0 时
      // 讨伐对象落在 100-104 的第一层段）
      const local = rand_n(era.get(`cflag:${cid}:520`) || 0);
      era.set(`cflag:${cid}:538`, local * 10 + rand_n(5) + 100);
    }

    // :98-104 受注カウンタ——**原作判 GETBIT(536,3)（大量敌人）而非 bit2
    // （时限）**，注释却写「時間制限あり」：短时限实际挂在大量敌人位上
    // （登记 #14；1:1 照抄不修）。普通依頼は99ターンまで猶予。
    if (getbit(era.get(`cflag:${cid}:536`) || 0, 3) !== 0) {
      era.set(`cflag:${cid}:539`, rand_n(10) + 1);
    } else {
      era.set(`cflag:${cid}:539`, 99);
    }

    // :106-110 クエスト：受注状態 → 名前打印
    chara(cid).dungeon.已接任务 = 1;
    era.print(`${name_of(cid)}接受了任务！`);
    await quest_select(cid, '名前', 0, rand_n);
  }

  return 1;
}

/**
 * @RESULT_QUEST（:116-177）：战斗后的任务成败结算。
 *
 * 由 @DUNGEON_PARTY_BATTLE 在任务战斗（QUEST_FLAG == 2）结束后按战果调用
 * （成功 → "成功"、失败 → "失败"）。对每个受注中（534 == 1）且 E 列三列
 * 之一直接持有讨伐对象（E:0/E:100/E:200 == 538）的成员：假任务（bit5）或
 * 受注计数耗尽（539 < 1）把 ARGS 覆写为"失败"，随后打印成败日志并把 534
 * 置成功/失败完结位。
 *
 * @param {number} arg 队长（原作 ARG:0）
 * @param {string} args 成败初值（"成功" / "失败"；原作 ARGS 引用传参，
 *   函数内可被覆写——出参经返回值传出）
 * @param {(n: number) => number} [rand] RAND:N 随机源（缺省均匀随机）
 * @returns {Promise<number>} 原作 RETURN 1
 */
async function result_quest(arg, args, rand = default_rand) {
  const rand_n = rand;
  // :125-127 クエスト禁止
  if (getbit(era.get('flag:8') || 0, 3) !== 0) {
    return 0;
  }

  // :129-131 PM:0 队长 / PM:1 仲間A / PM:2 仲間B
  const pm = [
    arg,
    era.get(`cflag:${arg}:531`) || 0,
    era.get(`cflag:${arg}:532`) || 0,
  ];

  // :133-175 全員に順番に結果を見る
  for (let lcount = 0; lcount < 3; lcount += 1) {
    if (pm[lcount] <= 0) {
      continue;
    }
    const cid = pm[lcount];
    // :138-140 クエスト受注で成功でも失敗でもない場合じゃないとダメ
    if (chara(cid).dungeon.已接任务 !== 1) {
      continue;
    }

    // :142-150 該当モンスターがいないとダメ（E 列头直比讨伐对象）
    const monid = era.get(`cflag:${cid}:538`) || 0;
    let found = 0; // LOCAL
    for (let mcount = 0; mcount < 300; mcount += 100) {
      if (e_get(mcount) === monid) {
        found = 1;
      }
    }
    if (found === 0) {
      continue;
    }

    // :153 PRINTW *クエスト結果*
    era.print('*任务结果*');
    await era.waitAnyKey();

    // :155-158 偽の依頼（ARGS 覆写为 失敗；原作引用传参，此处局部变量）
    let args_local = args;
    if (getbit(era.get(`cflag:${cid}:536`) || 0, 5) !== 0) {
      era.print('看来是接了个假任务……');
      await era.waitAnyKey(); // PRINTW
      args_local = '失败';
    }

    // :160-163 受注カウンタ消滅（超时同覆写）
    if ((era.get(`cflag:${cid}:539`) || 0) < 1) {
      era.print('看来是没有赶上……');
      await era.waitAnyKey(); // PRINTW
      args_local = '失败';
    }

    // :165 成败日志（QUEST_SELECT 的成功/失敗文本）
    await quest_select(cid, args_local, 0, rand_n);

    // :167-173 完结位（bit1 成功 / bit2 失败）
    if (args_local === '失败') {
      era.print('-任务失败-'); // PRINTFORML
      chara(cid).dungeon.已接任务 = setbit(chara(cid).dungeon.已接任务, 2);
    } else {
      era.print('*任务成功*'); // PRINTFORML
      chara(cid).dungeon.已接任务 = setbit(chara(cid).dungeon.已接任务, 1);
    }
  }

  return 1;
}

/**
 * 三型任务的人称变体（CFLAG:540 → 名）：受救/受害者的身份。
 * @param {number} type 任务类型 1-3
 * @param {number} v CFLAG:540 的值（0-4，越界回落村娘——原作 ELSE 臂）
 * @returns {string}
 */
function quest_victim(type, v) {
  const tables = {
    1: ['村娘', '千金', '女学生', '街娘', '女冒险者'],
    2: ['人妻', '女神官', '大小姐', '女学者', '女冒险者'],
    3: ['魔女', '魔法女学生', '女魔法骑士', '女魔法学者', '女冒险者'],
  };
  return (tables[type] ?? tables[1])[v] ?? '村娘';
}

/**
 * 「失敗」态的 9 档凌辱结局文本（RAND:10/9/…/2 逐档掷点，先掷先中；
 * 末二档判 ITEM:22 野狗）。掷点顺序 1:1（每档独立 RAND:N，未中才掷下一档）。
 * @param {(n: number) => number} rand_n
 * @returns {string} 一行结局文本（含原作 PRINTL 的行首「被…的」后半）
 */
function quest_fail_tail(rand_n) {
  if (rand_n(10) === 0) {
    return '几经凌辱、怀孕了……';
  } else if (rand_n(9) === 0) {
    return '被切断了四肢受尽凌辱、双目已然失去了光芒……';
  } else if (rand_n(8) === 0) {
    return '如同痴女一般完全沉浸在了快乐之中……';
  } else if (rand_n(7) === 0) {
    return '成了长着不可名状肉棒的射精人偶……';
  } else if (rand_n(6) === 0) {
    return '菊穴被深度地调教、完全回不到原本正常的生活了……';
  } else if (rand_n(5) === 0) {
    return '的乳房变得肥大、被改造成了绝顶喷乳的家畜……';
  } else if (rand_n(4) === 0) {
    return '怀上了怪物的孩子……';
  } else if (rand_n(3) === 0) {
    return '全身被纹上了低贱的刺青、成了渴求着精液的肉便器……';
  } else if (rand_n(2) === 0 && (era.get('item:22') || 0) === 1) {
    // 野良犬で獣姦フラグON（RAND 先掷、道具后判——1:1）
    return '与猪交换了灵魂成了家畜、沉迷在了与猪的交尾当中……';
  }
  return '已然被侵犯了……';
}

/** 「失敗」态 type 2（淫魔の虜）的 9 档结局文本（:325-345） */
function quest_fail_tail2(rand_n) {
  if (rand_n(10) === 0) {
    return '完全成了魔的眷属甚至还怀孕了……';
  } else if (rand_n(9) === 0) {
    return '成为魔族的一员戴上了代表契约的乳环……';
  } else if (rand_n(8) === 0) {
    return '成为了魔族的眷属戴上了项圈……';
  } else if (rand_n(7) === 0) {
    return '成为了魔族的一员欢快地舔舐着肉棒……';
  } else if (rand_n(6) === 0) {
    return '受尽了菊穴调教成为了魔族……';
  } else if (rand_n(5) === 0) {
    return '的乳房肥大化最终成了魔族……';
  } else if (rand_n(4) === 0) {
    return '怀上魔族的孩子幸福地笑了起来……';
  } else if (rand_n(3) === 0) {
    return '屁股被纹上了魔族的刺青成为了魔族的情妇……';
  } else if (rand_n(2) === 0) {
    return '曾经清纯的面容已经转化成魔族的样貌了……';
  }
  return '已然被侵犯了……';
}

/** 「失敗」态 type 3（変異する身体）的 9 档结局文本（:403-424） */
function quest_fail_tail3(rand_n) {
  if (rand_n(10) === 0) {
    return '似乎用长出的巨大阴茎一个接一个地侵犯着街娘……';
  } else if (rand_n(9) === 0) {
    return '似乎大脑被弄成了色情狂、喜欢上全裸着在野外交尾……';
  } else if (rand_n(8) === 0) {
    return '似乎觉醒了脏污凌辱的兴趣、每晚都在做着公众便所……';
  } else if (rand_n(7) === 0) {
    return '似乎明白了兽人的魅力、与丑陋的兽人结婚了……';
  } else if (rand_n(6) === 0) {
    return '似乎大脑被弄成了喜欢扩张菊穴的变态……';
  } else if (rand_n(5) === 0) {
    return '乳房变得肥大了、似乎和城里的变态交易着……';
  } else if (rand_n(4) === 0) {
    return '最终成了淫靡的肉块、进行猎奇的表演过活……';
  } else if (rand_n(3) === 0) {
    return '似乎觉醒了变态性癖全身纹上低贱的刺青、成为了肉便器……';
  } else if (rand_n(2) === 0 && (era.get('item:22') || 0) === 1) {
    // 野良犬で獣姦フラグON（:419-421；RAND 先掷、道具后判）
    return '把自己当成了母狗、在草丛里和野狗交尾时被发现了……';
  }
  return '似乎因为长出了阴茎强奸了城里的女人而被逮捕了……';
}

/**
 * @QUEST_SELECT（:180-513）：任务文本分发。
 *
 * ARGS 四态：セット→「设定」（掷定类型 537 与人称 540；原作字面「セット」是
 * 内部协议值非玩家可见，按简体锁落简体——CHARA_INFO_SHOW 票移植时同此）/ 成功 /
 * 失败 / 名前。
 * QUEST_LINE：0 = 全份（TYPE 段 + LINE2 障碍明细 + LINE3 讨伐对象行，
 *   各自换行、末尾 WAIT）；1 = 仅任务名（不换行，CHARA_INFO_SHOW:392 的
 *   行内拼接用）；2 = 仅障碍聚合（不换行，:406）；3 = 仅讨伐对象（不
 *   换行，:417）。LINE2/LINE3 段在原作 `IF ARGS == "名前"` 块内
 *   （:452-:511 的 ENDIF），セット/成功/失敗 态不落一行障碍/讨伐对象；
 *   唯 quest_line 3 的 GOTO $LINE3 越过守卫直落块内（见下）。
 *
 * @param {number} arg 角色（原作 ARG:0）
 * @param {string} args 分发态（"セット" / "成功" / "失败" / "名前"）
 * @param {number} [quest_line] 行形态（0-3，缺省 0）
 * @param {(n: number) => number} [rand] RAND:N 随机源（缺省均匀随机）
 * @returns {Promise<number>} 原作 RETURN 1（类型越界 RETURN 0）
 */
async function quest_select(arg, args, quest_line = 0, rand = default_rand) {
  const rand_n = rand;

  // :194-199 ARGS == セット时掷定类型，否则读既有值
  let type;
  if (args === '设定') {
    type = rand_n(3) + 1;
    era.set(`cflag:${arg}:537`, type);
  } else {
    type = era.get(`cflag:${arg}:537`) || 0;
  }

  // :201 MON_ID = CFLAG:ARG:538（セット态时是上一任务残留，但 LINE3 段
  // 受名前态守卫、セット 不消费它——残留值无读者）
  const mon_id = era.get(`cflag:${arg}:538`) || 0;
  const mon_name = era.get(`itemname:${mon_id}`) ?? ''; // %ITEMNAME:MON_ID%

  // :204-208 QUEST_LINE 2/3 直跳 LINE2/LINE3（跳过 TYPE 段）
  if (quest_line !== 2 && quest_line !== 3) {
    if (type === 1) {
      // :210-288 さらわれた娘
      if (args === '设定') {
        era.set(`cflag:${arg}:540`, rand_n(5)); // :213
      } else if (args === '成功') {
        // :214-229
        era.print(
          `${name_of(arg)}将被${mon_name}掳走的${quest_victim(1, era.get(`cflag:${arg}:540`) || 0)}安全救出了！`,
        );
      } else if (args === '失败') {
        // :230-267
        era.print(
          `被${mon_name}掳走的${quest_victim(1, era.get(`cflag:${arg}:540`) || 0)}`,
        );
        era.print(quest_fail_tail(rand_n)); // ;PRINT は（原注释态的接续词不落）
      } else if (args === '名前') {
        // :268-287 名段 + ]（原作两次 PRINT 不换行 = 同一显示行，归并为
        // 一次 print——dungeon.js 文件头先例；quest_line 1 供
        // CHARA_INFO_SHOW 行内拼接，不落换行符）
        era.print(
          `任务[被掳走的${quest_victim(1, era.get(`cflag:${arg}:540`) || 0)}]`,
        );
      }
    } else if (type === 2) {
      // :289-366 淫魔の虜
      if (args === '设定') {
        era.set(`cflag:${arg}:540`, rand_n(5)); // :292
      } else if (args === '成功') {
        era.print(
          `${name_of(arg)}将被${mon_name}诱惑了的${quest_victim(2, era.get(`cflag:${arg}:540`) || 0)}安全救出了！`,
        );
      } else if (args === '失败') {
        era.print(
          `被${mon_name}诱惑了的${quest_victim(2, era.get(`cflag:${arg}:540`) || 0)}`,
        );
        era.print(quest_fail_tail2(rand_n));
      } else if (args === '名前') {
        // 名段 + ] 归并（type1 同款）
        era.print(
          `任务[受魔诱惑的${quest_victim(2, era.get(`cflag:${arg}:540`) || 0)}]`,
        );
      }
    } else if (type === 3) {
      // :367-445 変異する身体
      if (args === '设定') {
        era.set(`cflag:${arg}:540`, rand_n(5)); // :370
      } else if (args === '成功') {
        era.print(
          `${name_of(arg)}将${mon_name}的肝打了包用回城魔法传送了、成功治好了${quest_victim(3, era.get(`cflag:${arg}:540`) || 0)}的异状！`,
        );
      } else if (args === '失败') {
        era.print(
          `因变异魔法而暴走的${quest_victim(3, era.get(`cflag:${arg}:540`) || 0)}`,
        );
        era.print(quest_fail_tail3(rand_n));
      } else if (args === '名前') {
        // 名段 + ] 归并（type1 同款）
        era.print(
          `任务[因变异魔法而暴走的${quest_victim(3, era.get(`cflag:${arg}:540`) || 0)}]`,
        );
      }
    } else {
      return 0; // :446-447
    }
    // :449-450 SIF QUEST_LINE == 1 → LINEEND
    if (quest_line === 1) {
      return 1;
    }
  }

  // —— quest_line 3 的 GOTO $LINE3（:206-207）：标签在 名前 守卫块内，
  //    GOTO 跳过 IF 判定直落块内——args 非名前也执行讨伐对象行 ——
  if (quest_line === 3) {
    if (mon_id === 0) {
      return 1; // :502-503 GOTO LINEEND
    }
    era.print(`*讨伐对象是${mon_name}`); // PRINTFORM（不换行）
    return 1;
  }

  // —— $LINE2（:451-511）：障碍明细——名前 态专属 ——
  if (args === '名前') {
    const q536 = era.get(`cflag:${arg}:536`) || 0;
    if (quest_line === 0) {
      // :453-463 五行逐位明细（受注面板全份形态）
      if (getbit(q536, 0) !== 0) {
        era.print('*须强迫与BOSS战斗');
      }
      if (getbit(q536, 1) !== 0) {
        era.print('*有陷阱设置');
      }
      if (getbit(q536, 2) !== 0) {
        era.print('*有时间限制');
      }
      if (getbit(q536, 3) !== 0) {
        era.print('*遭遇的敌人会异常地多');
      }
      if (getbit(q536, 4) !== 0) {
        era.print('*会有性奉仕的要求');
      }
    } else {
      // :464-498 聚合形态（CHARA_INFO_SHOW:406 的行内拼接；SIF CFLAG:536
      // 守门——无障碍时「*任务会有」也不打）
      if (q536 !== 0) {
        const parts = [];
        const labels = ['BOSS战', '陷阱', '时限', '大量敌人', '性要求'];
        for (let count = 0; count < 5; count += 1) {
          if (getbit(q536, count) !== 0) {
            parts.push(labels[count]); // LOCALS += "BOSS战" 等
          }
        }
        era.print(`*任务会有${parts.join('/')}`); // PRINTFORM（不换行）
      }
    }
    // :499-500 SIF QUEST_LINE == 2 → LINEEND
    if (quest_line === 2) {
      return 1;
    }

    // —— $LINE3（:501-510）：讨伐对象行（名前 态内；quest_line 3 经上方
    //    GOTO 分支独立进入）——
    if (mon_id === 0) {
      return 1; // :502-503 GOTO LINEEND
    }
    if (quest_line === 0) {
      era.print(`*讨伐对象是${mon_name}`); // PRINTFORML
      await era.waitAnyKey(); // :509-510 SIF QUEST_LINE == 0 → WAIT
    } else {
      era.print(`*讨伐对象是${mon_name}`); // PRINTFORM（不换行）
    }
  }

  // $LINEEND
  return 1;
}

/**
 * @QUEST_BATTLE_SET（:516-617）：任务战斗判定与敌方设置。
 *
 * 每场普通战斗前由 @DUNGEON_PARTY_BATTLE 调用（存根期恒 0 = 普通战斗照
 * 打；#178 起真身）。对每个成员：受注计数 -1（> 0 时）；1/3 掷点命中且
 * 受注中（534 == 1）且 E 列头持有讨伐对象时进入任务战斗——按障碍位改
 * 写 E 第三列（boss 化 / 15 只）或先掷陷阱；性要求位（bit4）另算交涉值，
 * 掷过 100 即以 QUEST_BITCH 完结任务并 RETURN 1（跳过普通战斗）。
 *
 * @param {number} arg0 队长（原作 ARG:0）
 * @param {(n: number) => number} [rand] RAND:N 随机源（缺省均匀随机）
 * @returns {Promise<number>} QUEST_ON：0 = 非任务战斗 / 1 = 性奉侍完结
 *   （调用方直接结束战斗）/ 2 = 任务战斗（战果交 RESULT_QUEST）
 */
async function quest_battle_set(arg0, rand = default_rand) {
  const rand_n = rand;
  // :526-528 PM:0 队长 / PM:1 仲間A / PM:2 仲間B
  const pm = [
    arg0,
    era.get(`cflag:${arg0}:531`) || 0,
    era.get(`cflag:${arg0}:532`) || 0,
  ];
  let quest_on = 0; // :530 クエスト発生フラグ

  for (let lcount = 0; lcount < 3; lcount += 1) {
    if (pm[lcount] <= 0) {
      continue;
    }
    const cid = pm[lcount];

    // :536-538 時間経過（受注计数在掷点之前递减——每场战斗都tick）
    if ((era.get(`cflag:${cid}:539`) || 0) > 0) {
      era.set(`cflag:${cid}:539`, (era.get(`cflag:${cid}:539`) || 0) - 1);
    }

    // :540-542 発生しないときもある（2/3 概率跳过该成员）
    if (rand_n(3) > 0) {
      continue;
    }

    // :544-546 受注中（成功/失败完结都不可）
    if (chara(cid).dungeon.已接任务 !== 1) {
      continue;
    }

    // :548-556 該当モンスターがいないとダメ
    const monid = era.get(`cflag:${cid}:538`) || 0;
    let found = 0; // LOCAL
    for (let mcount = 0; mcount < 300; mcount += 100) {
      if (e_get(mcount) === monid) {
        found = 1;
      }
    }
    if (found === 0) {
      continue;
    }

    // :558-559 PRINTW *任务戦闘発生*
    era.print('*任务战斗发生*');
    await era.waitAnyKey();
    quest_on = 2; // :559

    const q536 = era.get(`cflag:${cid}:536`) || 0;

    // :561-565 それはボスとの戦闘（最後列 boss 化——E 第三列 208/299）
    if (getbit(q536, 0) !== 0) {
      e_set(208, 1);
      e_set(299, 1);
    }

    // :567-579 それは罠が仕掛けてある（原作全局 A 换手 PM:LCOUNT，A 的
    // 暂存/恢复即陷阱受者的指定；ere 侧经第一参数显式传）
    if (getbit(q536, 1) !== 0) {
      if (rand_n(3) === 0) {
        await trap_mod.arrow_trap(cid, rand_n); // CALL ARROW_TRAP
      } else if (rand_n(2) === 0) {
        await trap_mod.oil_trap(cid, rand_n); // CALL OIL_TRAP
      } else {
        await trap_mod.all_down_trap(cid, rand_n); // CALL ALL_DOWN_TRAP
      }
    }

    // :581-585 それは敵の数が異様に多い（最前列 15 只，覆写 boss 位）
    if (getbit(q536, 3) !== 0) {
      e_set(208, 0);
      e_set(299, 15);
    }

    // :587-612 それは性奉仕を要求される
    if (getbit(q536, 4) !== 0) {
      era.print('看来敌人提出了性方面的需求进行着交涉……'); // PRINTL
      let local = 100;
      // 娼婦 / 奴隷（出身位 TALENT:315 的值 5 / 20）
      const origin = era.get(`talent:${cid}:315`) || 0;
      if (origin === 5) {
        local += 30; // :592-593
      }
      if (origin === 20) {
        local += 30; // :595-596
      }
      // 売春経験（EXP:74）
      local += era.get(`exp:${cid}:74`) || 0; // :598
      // カルマ低い/すごく低い（两档可叠 +30）
      const karma_v = era.get(`cflag:${cid}:151`) || 0;
      if (karma_v < -30) {
        local += 10; // :600-601
      }
      if (karma_v < -60) {
        local += 20; // :603-604
      }
      if (rand_n(local) > 100) {
        // :605-609 交涉成立——性奉侍完结任务，跳过普通战斗
        await quest_bitch(cid, rand_n);
        era.print('*任务成功*'); // PRINTFORML
        chara(cid).dungeon.已接任务 = setbit(chara(cid).dungeon.已接任务, 1);
        return 1;
      }
      era.print(`${name_of(cid)}用愤怒的话语回绝了`); // :611 PRINTFORML
    }
  }

  return quest_on; // :617
}

/**
 * @QUEST_BITCH（:620-682）：性奉侍按怪物凌辱类型（E:(列头+7)）分派到
 * 12 个类型段，最后做失贞判定。
 *
 * 初吻/失贞写点（CFLAG:16 == -1 → 995、EXP:0 > 0 且 TALENT:0 == 1 →
 * TALENT:0 = 0 + CFLAG:15 = 104）是省略角色号写法 → 读 era_flag.target
 * （文件头裁定）。调用时点 target 是战斗链的残留值（@DUNGEON 开头设的
 * 队长，或更近的攻击者换手）——原作同样读 TARGET 残留，1:1。
 *
 * @param {number} arg 奉侍者（原作 ARG:0）
 * @param {(n: number) => number} [rand] RAND:N 随机源（缺省均匀随机）
 * @returns {Promise<number>} 原作 RETURN 1
 */
async function quest_bitch(arg, rand = default_rand) {
  const rand_n = rand;
  const dispatch = {
    1: orc_quest_bitch, // 亜人
    2: slime_quest_bitch, // スライム
    3: insect_quest_bitch, // 昆虫
    4: ivy_quest_bitch, // 蔦触手
    5: syokusyu_quest_bitch, // 触手
    6: faily_quest_bitch, // 妖精
    7: giant_quest_bitch, // 巨人
    8: man_quest_bitch, // 男
    9: girl_quest_bitch, // 女
    10: beast_quest_bitch, // 獣
    11: brain_quest_bitch, // 脳姦
    12: horse_quest_bitch, // 馬
  };

  // :628-673 三列按凌辱类型分派（;一応モンスター数の確認——数量 > 0）
  for (let mcount = 0; mcount < 300; mcount += 100) {
    const monnum = e_get(mcount + 99); // MONNUM = E:(MCOUNT+99)
    if (monnum <= 0) {
      continue;
    }
    const montype = e_get(mcount + 7); // MONTYPE = E:(MCOUNT+7)
    const handler = dispatch[montype];
    if (handler) {
      await handler(arg, mcount, rand_n);
    }
  }

  // :675-679 失贞判定（省略角色号 → TARGET；104 = 初体验对象「怪物」，
  // CFLAG:15/16 属主 train、TALENT:0 属主 chara——跨域写一律走门面）
  const t = era_flag.target;
  if (
    (era.get(`exp:${t}:0`) || 0) > 0 &&
    (era.get(`talent:${t}:0`) || 0) === 1
  ) {
    chara(t).chara.处女 = 0; // TALENT:0 = 0（处女素质消去）
    era.print('【处女丧失】'); // PRINTL
    chara(t).train.初体验对象 = 104; // CFLAG:15 = 104
  }

  return 1;
}

/**
 * 各类型段共用的初吻判定（原作段内 `SIF CFLAG:16 == -1 / CFLAG:16 = 995`
 * ——省略角色号 → TARGET，995 = 初吻对象「怪物的阴茎」；train 属主门面）。
 */
function first_kiss_check() {
  const t = era_flag.target;
  if (era.get(`cflag:${t}:16`) === -1) {
    chara(t).train.初吻对象 = 995; // CFLAG:16 = 995
  }
}

/**
 * @ORC_QUEST_BITCH（:689-706）：亜人。口交/精液经验 + 初吻判定。
 * @param {number} arg 奉侍者 @param {number} mcount 列头 @param {Function} rand_n
 * @returns {Promise<number>} 1
 */
async function orc_quest_bitch(arg, mcount, rand_n) {
  void rand_n;
  const monid = e_get(mcount);
  const monnum = e_get(mcount + 99);
  era.print(
    `${name_of(arg)}服从了命令、舔起了${era.get(`itemname:${monid}`) ?? ''}的阴茎……`,
  );
  era.print(`口交经验+${monnum}`);
  era.print(`精液经验+${monnum}`);
  era.add(`exp:${arg}:22`, monnum); // EXP:ARG:22（口交）
  era.add(`exp:${arg}:20`, monnum); // EXP:ARG:20（精液）
  first_kiss_check(); // ファーストキス
  await era.waitAnyKey(); // WAIT
  return 1;
}

/** @SLIME_QUEST_BITCH（:711-729）：スライム。阴茎/阴核点数（JUEL:0 同槽）。 */
async function slime_quest_bitch(arg, mcount, rand_n) {
  void rand_n;
  const monid = e_get(mcount);
  const monnum = e_get(mcount + 99);
  const mon_name = era.get(`itemname:${monid}`) ?? '';
  era.print(`${name_of(arg)}服从了命令、${mon_name}慢慢地`);
  if (era.get(`talent:${arg}:120`) || era.get(`talent:${arg}:121`)) {
    era.print('将阴茎插了进去……'); // PRINTL
    era.print(`阴茎点数+${monnum}`);
    era.add(`juel:${arg}:0`, monnum); // JUEL:ARG:0
  } else {
    era.print('将腰沉了下去……'); // PRINTL
    era.print(`阴核点数+${monnum}`);
    era.add(`juel:${arg}:0`, monnum); // JUEL:ARG:0（两臂同槽）
  }
  await era.waitAnyKey();
  return 1;
}

/** @INSECT_QUEST_BITCH（:734-751）：昆虫。阴茎点数 / 私处经验 +1。 */
async function insect_quest_bitch(arg, mcount, rand_n) {
  void rand_n;
  const monid = e_get(mcount);
  const monnum = e_get(mcount + 99);
  era.print(
    `${name_of(arg)}服从了命令、与${era.get(`itemname:${monid}`) ?? ''}交尾了……`,
  );
  if (era.get(`talent:${arg}:120`) || era.get(`talent:${arg}:121`)) {
    era.print(`阴茎点数+${monnum}`);
    era.add(`juel:${arg}:0`, monnum);
  } else {
    era.print('私处经验+1'); // PRINTL
    era.add(`exp:${arg}:0`, 1); // EXP:ARG:0 += 1
  }
  await era.waitAnyKey();
  return 1;
}

/** @IVY_QUEST_BITCH（:756-770）：蔦触手。苦痛/恐怖点数（JUEL:9/10）。 */
async function ivy_quest_bitch(arg, mcount, rand_n) {
  void rand_n;
  const monid = e_get(mcount);
  const monnum = e_get(mcount + 99);
  const mon_name = era.get(`itemname:${monid}`) ?? '';
  era.print(`${name_of(arg)}服从了命令、将身体交给了${mon_name}……`);
  era.print(`${mon_name}勒住了${name_of(arg)}的头！`);
  era.print(`苦痛点数+${monnum}`);
  era.print(`恐怖点数+${monnum}`);
  era.add(`juel:${arg}:9`, monnum); // JUEL:ARG:9（苦痛）
  era.add(`juel:${arg}:10`, monnum); // JUEL:ARG:10（恐怖）
  await era.waitAnyKey();
  return 1;
}

/** @SYOKUSYU_QUEST_BITCH（:775-796）：触手。阴茎点数 / 私处+阴核。 */
async function syokusyu_quest_bitch(arg, mcount, rand_n) {
  void rand_n;
  const monid = e_get(mcount);
  const monnum = e_get(mcount + 99);
  era.print(
    `${name_of(arg)}服从了命令、任凭${era.get(`itemname:${monid}`) ?? ''}的触手触碰……`,
  );
  if (era.get(`talent:${arg}:120`) || era.get(`talent:${arg}:121`)) {
    era.print(`阴茎点数+${monnum}`);
    era.add(`juel:${arg}:0`, monnum);
  } else {
    era.print('私处经验+1'); // PRINTL
    era.print(`阴核点数+${monnum}`);
    era.add(`exp:${arg}:0`, 1);
    era.add(`juel:${arg}:0`, monnum);
  }
  await era.waitAnyKey();
  return 1;
}

/** @FAILY_QUEST_BITCH（:801-819）：妖精。阴茎/阴蒂摩擦（JUEL:0）。 */
async function faily_quest_bitch(arg, mcount, rand_n) {
  void rand_n;
  const monid = e_get(mcount);
  const monnum = e_get(mcount + 99);
  const mon_name = era.get(`itemname:${monid}`) ?? '';
  era.print(`${name_of(arg)}服从了命令、对${mon_name}`);
  if (era.get(`talent:${arg}:120`) || era.get(`talent:${arg}:121`)) {
    era.print('用阴茎摩擦了起来……'); // PRINTL
    era.print(`阴茎点数+${monnum}`);
    era.add(`juel:${arg}:0`, monnum);
  } else {
    era.print('用阴蒂摩擦了起来……'); // PRINTL
    era.print(`阴核点数+${monnum}`);
    era.add(`juel:${arg}:0`, monnum);
  }
  await era.waitAnyKey();
  return 1;
}

/** @GIANT_QUEST_BITCH（:824-841）：巨人。口交/精液经验 + 初吻。 */
async function giant_quest_bitch(arg, mcount, rand_n) {
  void rand_n;
  const monid = e_get(mcount);
  const monnum = e_get(mcount + 99);
  era.print(
    `${name_of(arg)}服从了命令、舔起了${era.get(`itemname:${monid}`) ?? ''}的巨根……`,
  );
  era.print(`口交经验+${monnum}`);
  era.print(`精液经验+${monnum}`);
  era.add(`exp:${arg}:22`, monnum);
  era.add(`exp:${arg}:20`, monnum);
  first_kiss_check(); // ファーストキス
  await era.waitAnyKey();
  return 1;
}

/** @MAN_QUEST_BITCH（:846-863）：男。口交/精液经验 + 初吻。 */
async function man_quest_bitch(arg, mcount, rand_n) {
  void rand_n;
  const monid = e_get(mcount);
  const monnum = e_get(mcount + 99);
  era.print(
    `${name_of(arg)}服从了命令、舔起了${era.get(`itemname:${monid}`) ?? ''}的阴茎……`,
  );
  era.print(`口交经验+${monnum}`);
  era.print(`精液经验+${monnum}`);
  era.add(`exp:${arg}:22`, monnum);
  era.add(`exp:${arg}:20`, monnum);
  first_kiss_check(); // ファーストキス
  await era.waitAnyKey();
  return 1;
}

/** @GIRL_QUEST_BITCH（:868-886）：女。交尾/交合（JUEL:0）。 */
async function girl_quest_bitch(arg, mcount, rand_n) {
  void rand_n;
  const monid = e_get(mcount);
  const monnum = e_get(mcount + 99);
  const mon_name = era.get(`itemname:${monid}`) ?? '';
  era.print(`${name_of(arg)}服从了命令、与${mon_name}`);
  if (era.get(`talent:${arg}:120`) || era.get(`talent:${arg}:121`)) {
    era.print('交尾了……'); // PRINTL
    era.print(`阴茎点数+${monnum}`);
    era.add(`juel:${arg}:0`, monnum);
  } else {
    era.print('交合在了一起……'); // PRINTL
    era.print(`阴核点数+${monnum}`);
    era.add(`juel:${arg}:0`, monnum);
  }
  await era.waitAnyKey();
  return 1;
}

/**
 * @BEAST_QUEST_BITCH（:891-910）：獣。口交/精液/兽奸经验 + 初吻。
 * 兽奸经验行是 PRINTFORMW（等键）——与段尾 WAIT 共两处等键。
 */
async function beast_quest_bitch(arg, mcount, rand_n) {
  void rand_n;
  const monid = e_get(mcount);
  const monnum = e_get(mcount + 99);
  era.print(
    `${name_of(arg)}服从了命令、舔起了${era.get(`itemname:${monid}`) ?? ''}的阴茎……`,
  );
  era.print(`口交经验+${monnum}`);
  era.print(`精液经验+${monnum}`);
  era.print(`兽奸经验+${monnum}`);
  await era.waitAnyKey(); // PRINTFORMW 獣姦経験
  era.add(`exp:${arg}:22`, monnum);
  era.add(`exp:${arg}:20`, monnum);
  era.add(`exp:${arg}:56`, monnum); // EXP:ARG:56（兽奸）
  first_kiss_check(); // ファーストキス
  await era.waitAnyKey(); // WAIT
  return 1;
}

/** @BRAIN_QUEST_BITCH（:915-926）：脳姦。阴茎点数（JUEL:0）。 */
async function brain_quest_bitch(arg, mcount, rand_n) {
  void rand_n;
  const monid = e_get(mcount);
  const monnum = e_get(mcount + 99);
  era.print(
    `${name_of(arg)}服从了命令、任${era.get(`itemname:${monid}`) ?? ''}侵犯着大脑开始自慰了起来……`,
  );
  era.print(`阴茎点数+${monnum}`);
  era.add(`juel:${arg}:0`, monnum);
  await era.waitAnyKey();
  return 1;
}

/** @HORSE_QUEST_BITCH（:931-950）：馬。口交/精液/兽奸经验 + 初吻。 */
async function horse_quest_bitch(arg, mcount, rand_n) {
  void rand_n;
  const monid = e_get(mcount);
  const monnum = e_get(mcount + 99);
  era.print(
    `${name_of(arg)}服从了命令、舔起了${era.get(`itemname:${monid}`) ?? ''}的马阴茎……`,
  );
  era.print(`口交经验+${monnum}`);
  era.print(`精液经验+${monnum}`);
  era.print(`兽奸经验+${monnum}`);
  await era.waitAnyKey(); // PRINTFORMW 獣姦経験
  era.add(`exp:${arg}:22`, monnum);
  era.add(`exp:${arg}:20`, monnum);
  era.add(`exp:${arg}:56`, monnum); // EXP:ARG:56（兽奸）
  first_kiss_check(); // ファーストキス
  await era.waitAnyKey(); // WAIT
  return 1;
}

module.exports = {
  set_quest,
  result_quest,
  quest_select,
  quest_battle_set,
  quest_bitch,
  orc_quest_bitch,
  slime_quest_bitch,
  insect_quest_bitch,
  ivy_quest_bitch,
  syokusyu_quest_bitch,
  faily_quest_bitch,
  giant_quest_bitch,
  man_quest_bitch,
  girl_quest_bitch,
  beast_quest_bitch,
  brain_quest_bitch,
  horse_quest_bitch,
  STUBBED_CALLS,
};
