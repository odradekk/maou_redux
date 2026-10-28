/**
 * @file 侵略中途事件：RAND:10 分发（9 要塞 / 8 叫阵 / 其余精锐部队），
 * 以及精锐部队战斗体与退场判定。
 *
 * 三条分支都读 SINKOU，要塞与叫阵还会按比例削减它：state 对象承载
 * 「SINKOU/YUSYA_I」（旧引擎的 `#DIM REF SINKOU`），返回后由调用方写回。
 *
 * 移植取舍与旧引擎对照登记在侵略域的文件头说明（page-invasion.js）里。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { add_chara_ex } = require('#/system/chara/chara-ex');
const { char_make, name_reset } = require('#/system/chara/char-make');
const { party_char_del } = require('#/system/dungeon/dungeon-party');
const { print_progress_line } = require('#/system/invasion/invasion-progress');
const { MAX_CHARANUM } = require('#/event/enter-enemy');
const { chara } = require('#/facade/chara');
const { chara_callname, chara_nickname } = require('#/utils/callname-utils');
const { default_rand } = require('#/utils/numeric');

/**
 * invasion_event：侵略中途事件的 RAND:10 分发。
 *
 * `LOCAL = RAND:10` 后三分：9 → invasion_event_fort、
 * 8 → invasion_event_challenge、其余 0-7 → invasion_event_seiei。三条都
 * 是 JUMP（尾调用），被跳函数的返回值就是本函数的返回值。**#503 起是
 * 真分发**（归约依据失效的经过见文件头）。
 *
 * 五参是 `AREA, SINDO, INV_TYPE, SINKOU(#DIM REF), YUSYA_I`——三分支都会
 * 读 SINKOU，FORT/CHALLENGE 还会改写它（两分支的强攻/潜入/绕路各自按比例削
 * 减）。ere 侧把 SINKOU 与 YUSYA_I 打包成 `state` 传进传出，等价于 `#DIM
 * REF`（返回后由调用方写回局部量）。
 *
 * @param {number} area 侵攻地区 FLAG 下标（81）
 * @param {number} sindo 征服标记 FLAG 下标（82）
 * @param {number} inv_type 出兵类别（0/1/2/3）
 * @param {{sinkou: number, yusya_i: number}} state 以引用语义共享的局部量
 *   （`#DIM REF SINKOU` 与 `#DIM YUSYA_I`）
 * @param {(n: number) => number} [rand] RAND:N 随机源（RAND:10 的上界）
 * @returns {Promise<number>} 0/-1 = 继续侵攻（契约是「0 继续、
 *   1 结束」，三分支照此返回）；>0 = 侵攻中止（调用方透传）
 */
async function invasion_event(
  area,
  sindo,
  inv_type,
  state,
  rand = default_rand,
) {
  const local = rand(10); // LOCAL = RAND:10
  if (local === 9) {
    return await invasion_event_fort(area, sindo, inv_type, state, rand);
  }
  if (local === 8) {
    return await invasion_event_challenge(area, sindo, inv_type, state, rand);
  }
  return await invasion_event_seiei(area, sindo, inv_type, state, rand);
}

/** FLAG:5 位 7（128）：狂王俘虏线的开关（`FLAG:5 & 128`，31 位内位运算直接可用） */
function captive_route() {
  return ((era.get('flag:5') || 0) & 128) !== 0;
}

/**
 * inv_death_check：精锐部队战斗的退场判定。
 *
 * 两段：先判 ARG:1（精锐部队）的三条死线 → RETURN 2（魔王侧获胜）；再判
 * ARG:0（领军勇者）的四条 → RETURN 1（侵攻中止）。玩家的位 7 开关
 * （FLAG:5 & 128）决定退场状态：开 = 被狂王带走（CFLAG:1 = 9），关 = 逃回
 * 本国（CFLAG:1 = 0）。
 *
 * 战斗体内有两处调用点（精锐部队反击前、反击后），都传（领军勇者，精锐
 * 部队）：先判精锐部队的三条死线，「魔王侧获得胜利」的判断条件是精锐部队
 * 退场，不是魔王被打残。
 *
 * @param {number} arg0 领军勇者
 * @param {number} arg1 精锐部队
 * @returns {Promise<number>} 2 = 精锐部队退场；1 = 魔王侧退场；0 = 继续
 */
async function inv_death_check(arg0, arg1) {
  // 勇者死亡判定（判 arg1）
  const elite_hp = era.get(`base:${arg1}:0`) || 0;
  if (elite_hp <= 0) {
    era.print(
      `${chara_nickname(arg1)}被${chara_callname(arg0)}率领的魔王军消灭了………`,
    );
    era.println(); // PRINTL
    return 2;
  }
  if (elite_hp <= 100) {
    era.print(
      `${chara_nickname(arg1)}被${chara_callname(arg0)}率领的魔王军击溃了………`,
    );
    era.println();
    return 2;
  }
  if ((era.get(`base:${arg1}:1`) || 0) <= 0) {
    era.print(`被魔王军包围的${chara_nickname(arg1)}失去战斗的意志投降了………`);
    era.println();
    return 2;
  }

  // 魔王側の生き残りを判定（判 arg0；四条 ELSEIF，顺序照旧）
  const hero_hp = era.get(`base:${arg0}:0`) || 0;
  const hero_mp = era.get(`base:${arg0}:1`) || 0;
  // 被狂王俘虏过（TALENT:280）且气力见底 → 抛下武器投降
  if (
    hero_mp <= 1000 &&
    (era.get(`talent:${arg0}:280`) || 0) !== 0 &&
    captive_route()
  ) {
    era.print(
      `被狂王俘虏过的${chara_callname(arg0)}丧失了战意，抛下武器投降了。`,
    );
    era.print(`${chara_nickname(arg1)}俘获了${chara_callname(arg0)}………`); // PRINTFORMW
    await era.waitAnyKey();
    chara(arg0).invasion.状态 = 9; // （CFLAG(ARG:0) 的第 1 位）= 9
    era.drawLine();
    return 1;
  }
  // 三条「魔王军被打散」的写法，各自的收尾文案按位 7 二分。
  // `PRINTFORM X，` 接 `PRINTFORMW Y` 在同一显示行，ere 侧并入一次
  // print + 等键（同显示行归并先例）。
  const collapse =
    hero_hp <= 0
      ? {
          head: `魔王军被${chara_nickname(arg1)}消灭了，`,
          captured: `${chara_callname(arg0)}也被俘虏了…………`,
          escaped: `${chara_callname(arg0)}孤身逃了回来…………`,
        }
      : hero_hp <= 300
        ? {
            head: `魔王军被${chara_nickname(arg1)}击溃了，`,
            captured: `${chara_callname(arg0)}也被俘虏了…………`,
            escaped: `${chara_callname(arg0)}从乱军中逃了回来…………`,
          }
        : hero_mp <= 0
          ? {
              head: `被${chara_nickname(arg1)}包围的魔王军失去战斗的意志投降了，`,
              captured: `${chara_callname(arg0)}被投降的部下献给了${chara_nickname(arg1)}…………`,
              escaped: `${chara_callname(arg0)}没脸见人地逃了回来…………`,
            }
          : null;
  if (collapse === null) {
    return 0; // 四条都不命中
  }
  const taken = captive_route();
  era.print(collapse.head + (taken ? collapse.captured : collapse.escaped));
  await era.waitAnyKey(); // 等 PRINTFORMW 的 WAIT
  chara(arg0).invasion.状态 = taken ? 9 : 0;
  era.drawLine();
  return 1;
}

/** 精锐部队的两个预设角色号（`ADDCHARA 18` 防御型 / `ADDCHARA 19` 攻击型） */
const SEIEI_DEFENDER = 18;
const SEIEI_ATTACKER = 19;

/** 战斗回合数（`REPEAT 21`）：第 21 次循环由 `TIME_I > 19` 截住 */
const SEIEI_ROUNDS = 21;
/** 战线崩溃的判断条件（`IF TIME_I > 19`） */
const SEIEI_TIMEOUT_AT = 19;

/**
 * 精锐部队战斗体。
 *
 * 回合制：勇者侧先制（防御判定 + 1/5 会心一击）→ inv_death_check →
 * 精锐侧反击（防御判定）→ inv_death_check。`REPEAT 21` 的第 21 次直接走
 * 超时（战线崩溃、给 SINKOU/10 经验、RETURN 1）。
 *
 * @param {number} area 侵攻地区 FLAG 下标（81）
 * @param {{sinkou: number, yusya_i: number}} state 共享局部量
 * @param {(n: number) => number} rand RAND:N 随机源
 * @returns {Promise<number>} 0 = 精锐部队被打倒（战斗体走完）；1 = 侵攻中止
 */
async function seiei_battle(area, state, rand) {
  const yusya = state.yusya_i;
  const sinkou = state.sinkou;
  era.print('………');
  await era.waitAnyKey();
  era.print('……');
  await era.waitAnyKey();
  era.print('…');
  await era.waitAnyKey();
  era.print('精锐部队出现了！');
  await era.waitAnyKey();
  era.print(
    `你的勇者${chara_callname(yusya)}率领着魔王军和精锐部队展开了战斗！`,
  );
  await era.waitAnyKey();
  era.print('（怪物的战斗力将被添加到攻击力和体力和气力上）');
  await era.waitAnyKey();

  let time_i = 0;
  // 两种精锐部队（防御型 18 / 攻击型 19）。扁平化（#21）下
  // GETCHARA(18/19) 就是刚加入的角色号，不用「已加入数 - 1」（#487 的教训）
  let seiei;
  if (rand(2) === 0) {
    era.addCharacter(SEIEI_DEFENDER);
    await add_chara_ex(SEIEI_DEFENDER);
    seiei = SEIEI_DEFENDER; // GETCHARA(18)
  } else {
    era.addCharacter(SEIEI_ATTACKER);
    await add_chara_ex(SEIEI_ATTACKER);
    seiei = SEIEI_ATTACKER; // GETCHARA(19)
  }

  // 勇者基礎レベル補正（FLAG:60 = 勇者基础等级校正）
  const bonus = 10 * (era.get('flag:60') || 0);
  chara(seiei).dungeon.攻击力 += era.get('flag:60') || 0; // CFLAG:SEIEI_I:11
  chara(seiei).dungeon.防御力 += era.get('flag:60') || 0; // CFLAG:SEIEI_I:12
  era.set(`maxbase:${seiei}:0`, (era.get(`maxbase:${seiei}:0`) || 0) + bonus);
  era.set(`maxbase:${seiei}:1`, (era.get(`maxbase:${seiei}:1`) || 0) + bonus);
  chara(seiei).dungeon.体力 += bonus; // BASE:SEIEI_I:0
  chara(seiei).dungeon.气力 += bonus; // BASE:SEIEI_I:1
  // SINKOU 补正（加成到勇者的体力/气力上）
  chara(yusya).dungeon.体力 += sinkou;
  chara(yusya).dungeon.气力 += sinkou;

  for (let round = 0; round < SEIEI_ROUNDS; round += 1) {
    // 超时：战线维持不住，残余怪物不足十只，给 SINKOU/10 经验
    if (time_i > SEIEI_TIMEOUT_AT) {
      era.print('………');
      await era.waitAnyKey();
      era.print('……');
      await era.waitAnyKey();
      era.print('…');
      await era.waitAnyKey();
      era.print('没有时间了，战线已经不可能再维持下去了！'); // PRINTFORML
      era.print(
        `${chara_callname(yusya)}的部队开始了后退，怪物们在后退中溃散着。`, // PRINTFORML
      );
      era.print('最终活着回来的怪物不到十只………'); // PRINTFORML
      era.println(); // PRINTL（空行）
      const gained = Math.trunc(sinkou / 10);
      chara(yusya).dungeon.战斗经验 += gained; // EXP:YUSYA_I:80
      era.print(`${chara_callname(yusya)}获得了${gained}点经验值！`); // PRINTFORMW
      await era.waitAnyKey();
      await seiei_cleanup(seiei);
      return 1;
    }

    // 双方状态（HP/气力条 + 攻防行；BARSTR → progress 格的偏离见文件头）
    era.drawLine();
    era.print(`魔王军 ${chara_callname(yusya)}`);
    print_progress_line(
      'HP',
      chara(yusya).dungeon.体力,
      era.get(`maxbase:${yusya}:0`) || 0,
    );
    print_progress_line(
      '气力',
      chara(yusya).dungeon.气力,
      era.get(`maxbase:${yusya}:1`) || 0,
    );
    // 攻击值按 SINKOU/1024 的档位放大（整数除法）
    era.print(
      `攻击${chara(yusya).dungeon.攻击力 * (Math.trunc(sinkou / 1024) + 1)}` +
        ` 防御${chara(yusya).dungeon.防御力} 怪物的合计战力${sinkou}点`,
    );
    era.print('VS'); // PRINTW
    await era.waitAnyKey();
    era.print(chara_nickname(seiei));
    print_progress_line(
      'HP',
      chara(seiei).dungeon.体力,
      era.get(`maxbase:${seiei}:0`) || 0,
    );
    print_progress_line(
      '气力',
      chara(seiei).dungeon.气力,
      era.get(`maxbase:${seiei}:1`) || 0,
    );
    era.print(
      `攻击${chara(seiei).dungeon.攻击力} 防御${chara(seiei).dungeon.防御力}`,
    );
    await era.waitAnyKey(); // WAIT
    era.drawLine();

    // 魔王軍の先制攻撃（会心一击 1/5，倍率 ×4；否则 ×2）。
    // **两处的档位除数不同**：判定线是 `SINKOU/2048+1`、伤害式
    // 是 `SINKOU/1024+1`——不对称的既有行为，有意不统一。
    const strike =
      chara(yusya).dungeon.攻击力 * (Math.trunc(sinkou / 1024) + 1);
    const guard_line =
      chara(yusya).dungeon.攻击力 * (Math.trunc(sinkou / 2048) + 1);
    if (chara(seiei).dungeon.防御力 < guard_line) {
      const crit = rand(5) === 0; // RAND:5
      const guard = chara(seiei).dungeon.防御力; // TMP2_I
      chara(seiei).dungeon.防御力 = Math.trunc(chara(seiei).dungeon.防御力 / 2);
      const damage = strike - guard;
      if (crit) {
        era.print('迅猛的一击！');
      }
      era.print(
        `${chara_callname(yusya)}率领魔王军的攻击使${chara_nickname(seiei)}受到了${damage * (crit ? 4 : 2)}点伤害！`,
      );
      if ((era.get(`talent:${seiei}:251`) || 0) === 0) {
        // 无「忍术」时攻防也受损（÷100 向零截断）
        chara(seiei).dungeon.攻击力 -= Math.trunc(damage / 100);
      }
      if (chara(seiei).dungeon.攻击力 < 1) {
        chara(seiei).dungeon.攻击力 = 1;
      }
      chara(seiei).dungeon.体力 -= damage * (crit ? 4 : 2);
      chara(seiei).dungeon.气力 -= damage * (crit ? 4 : 2);
      await era.waitAnyKey(); // WAIT
    } else {
      era.print(
        `${chara_nickname(seiei)}承受着${chara_callname(yusya)}的攻击。`,
      );
      chara(seiei).dungeon.防御力 = Math.trunc(chara(seiei).dungeon.防御力 / 2);
    }

    // 精锐部队战斗的退场判定（领军勇者、精锐部队）：先判精锐部队的死线
    const first_check = await inv_death_check(yusya, seiei);
    if (first_check === 2) {
      // 魔王侧获得胜利
      const gained = Math.trunc(sinkou / 5);
      chara(yusya).dungeon.战斗经验 += gained;
      era.print(`${chara_callname(yusya)}获得了${gained}点经验值！`);
      await era.waitAnyKey();
      await seiei_cleanup(seiei);
      break;
    }
    if (first_check === 1) {
      await seiei_cleanup(seiei);
      return 1;
    }

    // 精鋭部隊の攻撃（伤害 ×5，防御侧先折成三分之二）
    if (chara(yusya).dungeon.防御力 < chara(seiei).dungeon.攻击力) {
      const guard = chara(yusya).dungeon.防御力;
      chara(yusya).dungeon.防御力 = Math.trunc(
        Math.trunc(chara(yusya).dungeon.防御力 / 3) * 2,
      );
      const damage = chara(seiei).dungeon.攻击力 - guard;
      era.print(
        `${chara_nickname(seiei)}发起进攻使${chara_callname(yusya)}率领的魔王军受到了${damage * 5}点伤害！`,
      );
      if ((era.get(`talent:${yusya}:251`) || 0) === 0) {
        chara(yusya).dungeon.攻击力 -= Math.trunc(damage / 100);
      }
      if (chara(yusya).dungeon.攻击力 < 1) {
        chara(yusya).dungeon.攻击力 = 1;
      }
      chara(yusya).dungeon.体力 -= damage * 5;
      chara(yusya).dungeon.气力 -= damage * 5;
      await era.waitAnyKey(); // WAIT
    } else {
      era.print(
        `${chara_callname(yusya)}率领的魔王军承受着${chara_nickname(seiei)}的攻击。`,
      );
      chara(yusya).dungeon.防御力 = Math.trunc(
        Math.trunc(chara(yusya).dungeon.防御力 / 3) * 2,
      );
    }

    const second_check = await inv_death_check(yusya, seiei);
    if (second_check === 2) {
      await seiei_cleanup(seiei);
      break;
    }
    if (second_check === 1) {
      await seiei_cleanup(seiei);
      return 1;
    }
    time_i += 1;
  }
  void area;
  return 0;
}

/**
 * 精锐部队退场（三处重复段）：`SEIEI_I =
 * CHARANUM - 1` 后 PARTY_CHAR_DEL → DELCHARA → NAME_RESET。扁平化（#21）
 * 下 `CHARANUM - 1` 不成立，直接用它的角色号（#487 的教训）。
 * @param {number} seiei 精锐部队的角色号（18 或 19）
 */
async function seiei_cleanup(seiei) {
  party_char_del(seiei);
  era.removeCharacter(seiei);
  name_reset();
}

/**
 * invasion_event_seiei：精英部队事件。
 *
 * 三分支共用的头部：FLAG:SINDO != 0（已征服）→ RETURN -1；否则按
 * 侵攻度打三档传闻文本——**三档的 INV_TYPE 条件不同**：首档
 * `FLAG:AREA == 0` 无 INV_TYPE 条件，后两档要求
 * `INV_TYPE != 1`，所以魔力路线只打首档、[0]/[2]/[3] 三路三档都可能打。
 * 打完 `SIF INV_TYPE != 2 → RETURN -1`：只有 [2] 路线进战斗体。
 *
 * @param {number} area 侵攻地区 FLAG 下标（81）
 * @param {number} sindo 征服标记 FLAG 下标（82）
 * @param {number} inv_type 出兵类别（0/1/2/3）
 * @param {{sinkou: number, yusya_i: number}} state 共享局部量
 * @param {(n: number) => number} [rand] RAND:N 随机源（RAND:FLAG:AREA 与
 *   RAND:2/RAND:5 的上界）
 * @returns {Promise<number>} -1 = 继续侵攻（非 [2] 路线恒此值）；0 = 战斗体
 *   走完（含「精锐部队没有出现」）；1 = 侵攻中止
 */
async function invasion_event_seiei(
  area,
  sindo,
  inv_type,
  state,
  rand = default_rand,
) {
  // SIF FLAG:SINDO != 0 → RETURN -1
  if ((era.get(`flag:${sindo}`) || 0) !== 0) {
    return -1;
  }
  const progress = era.get(`flag:${area}`) || 0; // FLAG:AREA
  // FLAG:AREA == 0：狂王组织精锐部队的传闻（PRINTFORMW → 等键）
  if (progress === 0) {
    era.drawLine();
    era.print('根据传闻狂王为了应对魔王军的入侵已开始组织起了精锐部队。');
    await era.waitAnyKey();
    era.drawLine();
  } else if (progress >= 1 && progress < 5000 && inv_type !== 1) {
    // 侵攻度 1-4999（后两档都带 FLAG:SINDO == 0，已由上面的早退
    // 保证；每条 PRINTFORMW 各自等键）
    era.drawLine();
    era.print('狂王组织的精锐部队似乎已经开始行动了。');
    await era.waitAnyKey();
    era.print('如果不尽快采取行动的话………');
    await era.waitAnyKey();
    era.drawLine();
  } else if (progress >= 1 && progress < 10000 && inv_type !== 1) {
    // 侵攻度 5000-9999
    era.drawLine();
    era.print(
      '根据斥候打探的消息，狂王的精锐部队似乎已经在前方的城镇中布下了防线。',
    );
    await era.waitAnyKey();
    era.print('而且精锐部队的真正目的就是要捕捉魔王麾下的勇者………');
    await era.waitAnyKey();
    era.drawLine();
  }
  // SIF INV_TYPE != 2 → RETURN -1
  if (inv_type !== 2) {
    return -1;
  }

  // IF FLAG:AREA >= 5000 && FLAG:SINDO == 0 && INV_TYPE == 2（纯 `&&` 链；
  // FLAG:SINDO == 0 已由上面的早退保证）
  if (progress >= 5000) {
    const roll = rand(progress); // LOCAL = RAND:FLAG:AREA
    if (roll > 2000) {
      return await seiei_battle(area, state, rand);
    }
    // 精锐部队并没有出现
    era.print('………');
    await era.waitAnyKey();
    era.print('……');
    await era.waitAnyKey();
    era.print('…');
    await era.waitAnyKey();
    era.print('传闻中的精锐部队并没有出现…………');
    await era.waitAnyKey();
  } else {
    // INV_TYPE == 2 但侵攻度还没到 5000：同一套「没有出现」
    era.print('………');
    await era.waitAnyKey();
    era.print('……');
    await era.waitAnyKey();
    era.print('…');
    await era.waitAnyKey();
    era.print('传闻中的精锐部队并没有出现…………');
    await era.waitAnyKey();
  }
  return 0;
}

/**
 * FORT 的五个地区表：地点、敌方部队、要塞名，以及
 * `LOCAL:3`（`TALENT:YUSYA_I:种族 == n`——决定潜入支的 100% 成功档）。
 * 未列出的 AREA 三串留空、`LOCAL:3` 保持 0（LOCAL 的初值）。
 */
const FORT_AREAS = {
  81: { place: '人间界', troop: '人类军队', fort: '城堡', race: 0 },
  86: { place: '精灵森林', troop: '精灵族战士', fort: '精灵城寨', race: 1 },
  88: { place: '龙之山脉', troop: '龙族战士', fort: '战争堡垒', race: 5 },
  90: { place: '天界', troop: '天界卫队', fort: '天使要塞', race: 6 },
  93: { place: '天神宫', troop: '十字军', fort: '天使要塞', race: 6 },
};

/**
 * invasion_event_fort：侵略中途事件（要塞）。
 *
 * 入口检查对 INV_TYPE == 2/3 恒放行、对 0 看 FLAG:SINDO、对 1 恒早退
 * （读法与依据见 #503 的 M10789）。行为体按 INV_TYPE 三支：0 固定走强攻、
 * 2 三选项（强攻/潜入/绕路）、3 两选项（偷偷潜入/绕路）。
 *
 * **`SINKOU` 按引用改写**（`#DIM REF SINKOU`）：强攻减员、潜入失败、
 * 绕路减员都直接改 `state.sinkou`，调用方读回后用于侵攻結果共通。
 *
 * @param {number} area 侵攻地区 FLAG 下标（81）
 * @param {number} sindo 征服标记 FLAG 下标（82）
 * @param {number} inv_type 出兵类别（0/2/3）
 * @param {{sinkou: number, yusya_i: number}} state 共享局部量
 * @param {(n: number) => number} [rand] RAND:N 随机源（各处 RAND:10）
 * @returns {Promise<number>} 0 = 继续侵攻；-1 = 检查早退（继续侵攻）；
 *   1 = 侵攻中止
 */
async function invasion_event_fort(
  area,
  sindo,
  inv_type,
  state,
  rand = default_rand,
) {
  // `SIF FLAG:SINDO || INV_TYPE != 0 && INV_TYPE != 2 && INV_TYPE != 3`
  // —— 旧引擎里 `&&` 与 `||` **同优先级、左结合**（operators.md 的优先级表
  // 把两者排在同一行；com-sex.js:1837 / train-message.js:251 同款读法），
  // 因此原式等价于 `((FLAG:SINDO || INV_TYPE != 0) && INV_TYPE != 2)
  // && INV_TYPE != 3`，而不是 C 式「&& 优先」的 `FLAG:SINDO || (...)`：
  // 2/3 两值恒不早退（已征服也进要塞事件），1 恒早退，0 才看 FLAG:SINDO。
  if (
    ((era.get(`flag:${sindo}`) || 0) !== 0 || inv_type !== 0) &&
    inv_type !== 2 &&
    inv_type !== 3
  ) {
    return -1;
  }

  const yusya = state.yusya_i;
  // 未列出的 AREA：`LOCAL:3` 保持初值 0（恒假）→ 这里用 -1 保证
  // `talent:314 === race` 永不成立（TALENT:314 是非负值），不能写 0——
  // 那会让种族 0（人类）在未知地区恒吃 100% 潜成功（#505 地区泛化时会生效）
  const info = FORT_AREAS[area] ?? {
    place: '',
    troop: '',
    fort: '',
    race: -1,
  };
  const native = (era.get(`talent:${yusya}:314`) || 0) === info.race; // LOCAL:3

  // 选项（PRINTFORML 的 `[n]` 改 printButton，引擎自动拼前缀）
  let choice; // L_CHOICE
  if (inv_type === 2) {
    era.print(`魔王军浩浩荡荡地向${info.place}进发着。`);
    era.print(
      `早有准备的${info.troop}在必经之路上建起了一座${info.fort}，集结了大量的${info.troop}。`,
    );
    era.print(
      `${info.fort}看起来防御坚固防备森严，于是${chara_nickname(yusya)}决定……`, // PRINTFORMW
    );
    await era.waitAnyKey();
    era.printButton('全军强攻', 1);
    era.printButton('亲自潜入', 2);
    era.printButton('绕路', 3);
    choice = await fort_choice([1, 2, 3]); // $INPUT_LOOP
  } else if (inv_type === 3) {
    era.print(
      `${chara_nickname(yusya)}向${info.place}进发着，却在必经之路上遇到了${info.troop}建起的一座${info.fort}。`,
    );
    era.print(
      `${info.fort}看起来防御坚固防备森严，于是${chara_nickname(yusya)}决定……`, // PRINTFORMW
    );
    await era.waitAnyKey();
    era.printButton('偷偷潜入', 1);
    era.printButton('绕路', 2);
    // `L_CHOICE = RESULT + 1`——选项号加一后与 [2] 路线共用下面的分支
    choice = (await fort_choice([1, 2])) + 1; // $INPUT_LOOP2
  } else {
    era.print(`魔王军浩浩荡荡地向${info.place}进发着。`);
    era.print(
      `早有准备的${info.troop}在必经之路上建起了一座${info.fort}，集结了大量的${info.troop}。`,
    );
    era.print(
      `${info.fort}看起来防御坚固防备森严，于是魔王军发起了强攻。`, // PRINTFORMW
    );
    await era.waitAnyKey();
    choice = 1;
  }

  era.drawLine();
  // [1] 全军强攻（RAND:10 三档：>= 6 成功 / >= 2 惨胜 / 其余 惨败）
  if (choice === 1) {
    const roll = rand(10);
    if (roll >= 6) {
      era.print(
        `魔王军向着${info.fort}发起了最为猛烈的进攻，在付出较小的代价后攻破了${info.fort}的一角。`,
      );
      era.print(
        `${info.fort}中的${info.troop}仓皇外逃，被${info.fort}外的魔王军尽数剿灭、`,
      );
      era.print(`获胜的魔王军高呼万岁，继续向${info.place}进发。`);
      era.print(''); // PRINTFORML（空行）
      fort_hero_reward(inv_type, state, 5); // EXP:SINKOU/5
      era.print('怪物数量减少了10%'); // （`\%` 是字面量百分号）
      state.sinkou = Math.trunc((state.sinkou * 9) / 10);
      await era.waitAnyKey(); // WAIT
      return 0;
    }
    if (roll >= 2) {
      era.print(`魔王军向着${info.fort}发起了最为猛烈的进攻。`);
      era.print(
        `${info.fort}的防御极其坚固，${info.troop}凭借着掩体不断地攻击，让魔王军损失惨重。`,
      );
      if (inv_type === 2) {
        era.print(
          `${chara_nickname(yusya)}不得不亲自上阵，这才逆转了局面，攻下了${info.fort}。`,
        );
      } else {
        era.print(`在付出巨大的代价后，魔王军才攻下了${info.fort}。`);
      }
      era.print(`侥幸获胜的魔王军继续向${info.place}进发。`);
      era.print('');
      if (inv_type === 2) {
        fort_hero_reward(inv_type, state, 5);
        chara(yusya).dungeon.体力 = Math.trunc(chara(yusya).dungeon.体力 / 2);
        era.print(`${chara_callname(yusya)}的体力减少了一半！`);
        // 注意：这里的 PRINTFORML 后没有 WAIT，等键由后面的 WAIT 承担
      }
      era.print('怪物数量减少了50%');
      state.sinkou = Math.trunc(state.sinkou / 2);
      await era.waitAnyKey(); // WAIT
      return 0;
    }
    era.print(`魔王军向着${info.fort}发起了最为猛烈的进攻。`);
    era.print(`${info.fort}的防御极其坚固，令魔王军久攻不下，陷入僵局。`);
    era.print(`打破僵局的是一支突然出现在魔王军背后的${info.troop}援军。`);
    era.print('腹背受敌的魔王军一触即溃，随即被里应外合的两支军队尽数歼灭。');
    if (inv_type === 2) {
      era.print(`率领魔王军的${chara_nickname(yusya)}孤身一人逃了回来。`);
      era.println(); // PRINTL
      chara(yusya).dungeon.体力 = Math.trunc(
        (chara(yusya).dungeon.体力 * 3) / 10,
      );
      era.print(`${chara_callname(yusya)}的体力减少了70%！`);
    } else {
      era.println();
    }
    era.print('侵攻中止。'); // PRINTFORMW
    await era.waitAnyKey();
    chara(yusya).invasion.状态 = 0; // CFLAG:YUSYA_I:1 = 0
    return 1;
  }

  // [2] 亲自潜入（INV_TYPE 2 与 3 两套结算）
  if (choice === 2 && inv_type === 2) {
    const roll = rand(10);
    // 天使/恶魔翼（TALENT:245）或精灵族（种族 6）/魔族（种族 8）→ 100%
    if (has_wing(yusya)) {
      era.print(
        `${chara_nickname(yusya)}趁着夜色从空中潜入了${info.fort}，在躲过多支巡逻队后终于打开了${info.fort}的大门。`,
      );
      era.print(
        `早已等待多时的魔王军迅速杀入了${info.fort}内，没有遇到顽强的抵抗便控制了整个${info.fort}。`,
      );
      era.print(
        `当天空出现第一缕阳光时，${info.fort}内已经只剩下了魔王军和魔王军的俘虏了。`,
      );
      era.print(`获胜的魔王军高呼万岁，继续向${info.place}进发。`);
      era.print('');
      fort_hero_reward(inv_type, state, 5);
      era_flag.meat_toilet_count += 5; // FLAG:83 += 5
      era.print('人间牧场肉便器数量+5。');
      await era.waitAnyKey(); // WAIT
      return 0;
    }
    if (roll >= 5 || native) {
      // 潜入成功 50%
      era.print(`${chara_nickname(yusya)}乔装打扮成功混进了${info.fort}里。`);
      era.print(
        `当天夜里，${chara_nickname(yusya)}杀死了大门的守卫，将等候多时的魔王军引入${info.fort}内。`,
      );
      era.print(`${info.fort}内的${info.troop}还没有组织起反抗便被消灭殆尽。`);
      era.print(`获胜的魔王军高呼万岁，继续向${info.place}进发。`);
      era.print('');
      fort_hero_reward(inv_type, state, 5);
      era_flag.meat_toilet_count += 5;
      era.print('人间牧场肉便器数量+5。');
      await era.waitAnyKey(); // WAIT
      return 0;
    }
    if (roll >= 2 || !captive_route()) {
      // 失败逃窜 30%
      era.print(
        `${chara_nickname(yusya)}乔装打扮试图混进${info.fort}里，但被大门的守卫识破。`,
      );
      era.print(`${chara_nickname(yusya)}杀出一条血路，勉强逃回了魔王军。`);
      era.print('魔王军不得已只好发动强攻，在鏖战后最终惨胜。');
      era.print(`侥幸获胜的魔王军，继续向${info.place}进发。`);
      era.print('');
      chara(yusya).dungeon.体力 = 1;
      era.print(`${chara_callname(yusya)}的体力归零`);
      state.sinkou = Math.trunc((state.sinkou * 7) / 10);
      era.print('怪物数量减少了30%');
      await era.waitAnyKey(); // WAIT
      return 0;
    }
    // 失败被捕 20%
    era.print(
      `${chara_nickname(yusya)}乔装打扮试图混进${info.fort}里，但却被大门的守卫识破。`,
    );
    era.print(
      `在一番激烈战斗后${chara_nickname(yusya)}还是被${info.troop}生擒。`,
    );
    era.print(`失去指挥官的魔王军随即被出城迎击的${info.troop}击溃。`);
    era.print('');
    era.print(`${chara_nickname(yusya)}被俘虏，侵攻中止。`); // PRINTFORMW
    await era.waitAnyKey();
    chara(yusya).invasion.状态 = 9;
    return 1;
  }
  if (choice === 2 && inv_type === 3) {
    const roll = rand(10);
    if (has_wing(yusya)) {
      era.print(
        `${chara_nickname(yusya)}趁着夜色从空中穿过了${info.fort}。`, // PRINTFORMW
      );
      await era.waitAnyKey();
      return 0;
    }
    if (roll >= 5 || native) {
      era.print(
        `${chara_nickname(yusya)}乔装打扮成功通过了${info.fort}。`, // PRINTFORMW
      );
      await era.waitAnyKey();
      return 0;
    }
    if (roll >= 2 || !captive_route()) {
      era.print(
        `${chara_nickname(yusya)}乔装打扮试图混进${info.fort}里，但被大门的守卫识破。`,
      );
      era.print(`${chara_nickname(yusya)}杀出一条血路，勉强逃了回去。`); // PRINTFORMW
      await era.waitAnyKey();
      // 两段之间是纯空白行（不产生输出），ere 侧不打空行
      chara(yusya).dungeon.体力 = 1;
      chara(yusya).invasion.状态 = 0;
      return 1;
    }
    era.print(
      `${chara_nickname(yusya)}乔装打扮试图混进${info.fort}里，但却被大门的守卫识破。`,
    );
    era.print(
      `在一番激烈战斗后${chara_nickname(yusya)}还是被${info.troop}生擒。`, // PRINTFORMW
    );
    await era.waitAnyKey();
    // 两段之间是纯空白行（不产生输出），ere 侧不打空行
    chara(yusya).invasion.状态 = 9;
    return 1;
  }

  // [3] 绕路（INV_TYPE == 2：RAND:10，九成平安 / 一成埋伏）
  if (choice === 3 && inv_type === 2) {
    const roll = rand(10);
    if (roll > 0) {
      era.print(
        `魔王军绕开${info.fort}向${info.place}进发，因为路途遥远地形复杂损失了一些人马。`,
      );
      era.println();
      state.sinkou = Math.trunc((state.sinkou * 9) / 10);
      era.print('怪物数量减少了10%'); // PRINTFORMW
      await era.waitAnyKey();
      return 0;
    }
    era.print(`魔王军绕开${info.fort}向${info.place}进发，但却遇到了埋伏。`);
    era.print(`在一番血战后，魔王军击退了伏军继续向${info.place}进发。`);
    era.println();
    state.sinkou = Math.trunc((state.sinkou * 5) / 10);
    era.print('怪物数量减少了50%'); // PRINTFORMW
    await era.waitAnyKey();
    return 0;
  }
  // [3] 绕路（INV_TYPE == 3）：RAND:10，九成平安无事（体力 ×9/10，直接
  // RETURN 0）/ 一成埋伏（RETURN 1），与怪物路线（INV_TYPE == 2）同构。
  if (choice === 3 && inv_type === 3) {
    if (rand(10) > 0) {
      era.print(
        `${chara_nickname(yusya)}绕开${info.fort}向${info.place}进发，因为路途遥远地形复杂耗费了一些体力。`,
      );
      chara(yusya).dungeon.体力 = Math.trunc(
        (chara(yusya).dungeon.体力 * 9) / 10,
      );
      return 0;
    }
    era.print(
      `${chara_nickname(yusya)}绕开${info.fort}向${info.place}进发，但却遇到了埋伏。`,
    );
    if (captive_route()) {
      era.print(
        `在一番激烈战斗后${chara_nickname(yusya)}还是被活捉了。`, // PRINTFORMW
      );
      await era.waitAnyKey();
      chara(yusya).invasion.状态 = 9;
    } else {
      era.print(
        `在一番激烈战斗后${chara_nickname(yusya)}终于逃了回来。`, // PRINTFORMW
      );
      await era.waitAnyKey();
      chara(yusya).invasion.状态 = 0;
    }
    return 1;
  }
  return 0;
}

/**
 * FORT [2]/[3] 路线的输入：只认给定选项号，其余重问（整屏重绘，见文件
 * 头）。选项已渲染成按钮，引擎白名单先一步挡下未渲染的值，故重问支在
 * 真引擎里不可达（与 page-intercept 的等级门同款处置，结构保留作防御）。
 * @param {number[]} allowed 合法选项号
 * @returns {Promise<number>} 选中的选项号
 */
async function fort_choice(allowed) {
  for (;;) {
    const result = await era.input();
    if (allowed.includes(result)) {
      return result;
    }
  }
}

/**
 * FORT [2] 路线的经验段（四处的同一形状）。
 * 只有 INV_TYPE == 2 给经验，且用的是**减员前**的 SINKOU。四处都是
 * `EXP:…` 接 `PRINTFORML`（不等键）——等键在各分支末尾的 WAIT，
 * 所以这里不 wait。
 * @param {number} inv_type 出兵类别
 * @param {{sinkou: number, yusya_i: number}} state 共享局部量
 * @param {number} divisor 除数（四处都是 SINKOU/5）
 */
function fort_hero_reward(inv_type, state, divisor) {
  if (inv_type !== 2) {
    return;
  }
  const gained = Math.trunc(state.sinkou / divisor);
  chara(state.yusya_i).dungeon.战斗经验 += gained;
  era.print(`${chara_callname(state.yusya_i)}获得了${gained}点经验值！`);
}

/**
 * 「带队奴隶有天使/恶魔翼」（FORT 与 CHALLENGE 同款的
 * `TALENT:恶魔翅膀 || TALENT:种族 == 6 || TALENT:种族 == 8`）。
 * 恶魔翅膀 = TALENT:245、种族 = TALENT:314（yml/Talent.yml）；种族 6 是**天使**、
 * 8 是魔族（对照 CHALLENGE 地区表的 `race` 列：天界/天神宫两组都是 6）。
 * @param {number} cid 角色 ID
 * @returns {boolean}
 */
function has_wing(cid) {
  const race = era.get(`talent:${cid}:314`) || 0;
  return (era.get(`talent:${cid}:245`) || 0) !== 0 || race === 6 || race === 8;
}

/**
 * CHALLENGE 的五个地区表：称呼、地点与「复现职业」
 * （`LOCAL:12`，开挂取胜时 `ADDCHARA LOCAL:12`）。
 *
 * AREA 81 的职业固定 9；其余四表是 `LOCAL:12 = RAND:2 ? a # b`——
 * **掷骰发生在选区时**（早于 `SIF EX_FLAG:95 & bit → RETURN -1`），所以
 * 职业要在取表时立刻定下：挪到使用处再掷会把 RAND:2 与随后的 DATALIST
 * 抽取对调（job 的 a = 真值支、b = 假值支）。
 */
const CHALLENGE_AREAS = {
  81: {
    place: '人间界',
    spot: '一座河边的桥',
    foe: '女骑士',
    leave: '骑上战马一骑绝尘离开了',
    skill: '剑术非常高超',
    race: -1,
    job: 9,
    bit: 1,
  },
  86: {
    place: '精灵森林',
    spot: '一条密林中的狭道',
    foe: '月之祭司',
    leave: '遁入密林之中消失了',
    skill: '箭术无比精准',
    race: 1,
    job: [12, 16],
    bit: 2,
  },
  88: {
    place: '龙之山脉',
    spot: '一座山谷间的吊桥',
    foe: '龙族巫女',
    leave: '吟唱了传送咒语凭空消失了',
    skill: '龙语魔法无比犀利',
    race: 5,
    job: [10, 14],
    bit: 4,
  },
  90: {
    place: '天界',
    spot: '一座天界的虹桥',
    foe: '女武神',
    leave: '振起洁白的羽翼飞走了',
    skill: '圣力极其雄厚',
    race: 6,
    job: [1, 5],
    bit: 8,
  },
  93: {
    place: '天神宫',
    spot: '一座天界的虹桥',
    foe: '十字军',
    leave: '振起洁白的羽翼飞走了',
    skill: '圣力极其雄厚',
    race: 6,
    job: [1, 5],
    bit: 16,
  },
};

/**
 * 人数上限的快照（CHALLENGE 的七分支，与 enter_enemy / get_enemy
 * 里的两段是同一段判定，三处各自保留一份）。命中任一分支时
 * `LOCAL = 0`——开挂取胜（要求 `LOCAL >= 2`）随之降级成开挂失败。
 * @returns {boolean} true = 人数已满
 */
function hero_cap_reached() {
  const charanum = era.getAddedCharacters().length;
  const f = (n) => era.get(`flag:${n}`) || 0;
  if (f(82) === 0 && charanum > 60) {
    return true;
  }
  if (f(87) === 0 && f(89) === 0 && f(91) === 0 && charanum > 65) {
    return true;
  }
  if (
    f(87) * f(89) === 0 &&
    f(89) * f(91) === 0 &&
    f(91) * f(87) === 0 &&
    charanum > 70
  ) {
    return true; // （原式三对乘积，加括号，无优先级歧义）
  }
  if ((f(87) === 0 || f(89) === 0 || f(91) === 0) && charanum > 75) {
    return true;
  }
  if (f(92) < 15 && charanum > 80) {
    return true;
  }
  if (f(94) === 0 && charanum > 90) {
    return true;
  }
  return charanum >= MAX_CHARANUM;
}

/**
 * invasion_event_challenge：侵略中途事件（被勇者叫阵单挑）。
 *
 * 入口检查是纯 `&&` 链，对 0/2/3 放行、对 1 早退（无优先级歧义）。
 * 地区的位域检查（`SIF EX_FLAG:95 & bit → RETURN -1`）保证每块地盘的
 * 「被叫阵」只发生一次；开挂取胜支把该位置起（`EX_FLAG:95 = LOCAL:20`）。
 *
 * `SINKOU` 按引用改写（`#DIM REF SINKOU`）：只有 `[3] 无视，全军进攻`
 * 的「损失一般」档会改成 ×4/5。
 *
 * @param {number} area 侵攻地区 FLAG 下标（81）
 * @param {number} sindo 征服标记 FLAG 下标（82）
 * @param {number} inv_type 出兵类别（0/2/3）
 * @param {{sinkou: number, yusya_i: number}} state 共享局部量
 * @param {(n: number) => number} [rand] RAND:N 随机源（RAND:2/4/10 的上界）
 * @returns {Promise<number>} 0 = 继续侵攻；-1 = 检查早退（继续侵攻）；
 *   1 = 侵攻中止
 */
async function invasion_event_challenge(
  area,
  sindo,
  inv_type,
  state,
  rand = default_rand,
) {
  // SIF INV_TYPE != 0 && INV_TYPE != 2 && INV_TYPE != 3 → RETURN -1
  if (inv_type !== 0 && inv_type !== 2 && inv_type !== 3) {
    return -1;
  }
  const yusya = state.yusya_i;
  const info = CHALLENGE_AREAS[area] ?? {
    place: '',
    spot: '',
    foe: '',
    leave: '',
    skill: '',
    race: 0,
    job: 0,
    bit: 0,
  };
  // `LOCAL:12 = RAND:2 ? a # b`——掷骰在选区时就发生
  const job = Array.isArray(info.job)
    ? rand(2) !== 0
      ? info.job[0]
      : info.job[1]
    : info.job;
  const kill_bits = (era_exflag.defeated_heroes_bits || 0) | info.bit; // LOCAL:20
  // 等四条 `SIF EX_FLAG:95 & bit → RETURN -1`（每块地盘只来一次）
  if (((era_exflag.defeated_heroes_bits || 0) & info.bit) !== 0) {
    return -1;
  }

  // 三条 INV_TYPE 各自的登场（PRINTDATA/PRINTDATAL 的随机抽取走 rand）
  let choice; // L_CHOICE
  if (inv_type === 2) {
    era.print(
      `魔王军浩浩荡荡地向${info.place}进发着，却在${info.spot}前停下了脚步。`,
    );
    era.print(`原来是一名${info.foe}在大军的前方挡住了道路。`);
    for (const line of printdata(rand, [
      [
        '『哎呀真是好多人啊，人家好紧张呢~』',
        '『快去叫亲爱的魔王大人出来，人家要和他比试比试呢』',
      ],
      ['『今天运气真是不错哦~』', '『叫魔王出来，他的脑袋是我的了！』'],
      [
        '『这就是魔王军啊，与其说是军队倒不如说是哪里冒出来的犯罪团伙呢~』',
        '『快去叫你们的魔王出来，就说有人来取他的性命了』',
      ],
      [
        '『咦？传闻中的魔王军呢』',
        '『听说你们的魔王很厉害，不知道能否有幸过两手呢』',
      ],
    ])) {
      era.print(line);
    }
    era.print(`毫无紧张感的${info.foe}这样说着。`);
    era.print(
      `面对${info.foe}的挑衅，${chara_nickname(yusya)}决定……`, // PRINTFORMW
    );
    await era.waitAnyKey();
    era.printButton('召唤魔王应战', 1);
    era.printButton('亲自上前处理', 2);
    era.printButton('无视，全军进攻', 3);
    choice = await fort_choice([1, 2, 3]); // $INPUT_LOOP
    if (choice === 1) {
      era.print(`魔王回应了${chara_nickname(yusya)}召唤前来迎战${info.foe}。`);
    } else if (choice === 2) {
      era.print(`${chara_nickname(yusya)}决定亲自迎战${info.foe}。`);
    } else {
      era.print(
        `在${chara_nickname(yusya)}一声令下，魔王军缓缓前进，展开了对${info.foe}战斗。`,
      );
    }
  } else if (inv_type === 3) {
    era.print(
      `${chara_nickname(yusya)}向${info.place}进发着，却在${info.spot}前被一名突然出现的${info.foe}拦下了脚步。`,
    );
    for (const line of printdata(rand, [
      [
        '『哎呀~是亲爱魔王大人的手下呢』',
        '『既然魔王大人不肯出来，人家只好和你比试比试了呢』',
      ],
      ['『今天运气真是不错哦~可怜的魔族，你的脑袋是我的了！』'],
      ['『闻到魔物的味道就过来了，看我发现了什么有趣的东西呢……有遗言么？』'],
      [
        '『咦？是魔王手下的那个谁呢』',
        '『既然魔王那么厉害，想必你也不简单吧。来过两手吧』',
      ],
    ])) {
      era.print(line);
    }
    // 这里是纯空白行，ere 侧不打空行
    await era.waitAnyKey(); // WAIT
    choice = 2;
  } else {
    era.print(
      `魔王军浩浩荡荡地向${info.place}进发着，却在${info.spot}前停下了脚步。`,
    );
    era.print(`原来是一名${info.foe}在大军的前方挡住了道路。`);
    for (const line of printdata(rand, [
      ['『哎呀真是好多人啊，人家好紧张呢~』'],
      ['『今天运气真是不错哦~可悲的魔族，你们的脑袋是我的了！』'],
      ['『啊~哪里冒出来的犯罪团伙呢~这就来取你们的性命了』'],
      ['『咦？传闻中的魔王军呢。既然撞上了就怪你们运气不佳好了』'],
    ])) {
      era.print(line);
    }
    era.print(`毫无紧张感的${info.foe}这样说着。`);
    // 两段之间是纯空白行（不产生输出），ere 侧不打空行
    choice = 3;
    era.print(
      `在意识到敌人只有一个人后，魔王军向敢于挑衅的${info.foe}发起了猛烈的进攻。`, // PRINTFORMW
    );
    await era.waitAnyKey();
  }

  // [1] 召唤魔王应战
  if (choice === 1) {
    if (era_flag.money >= 3000) {
      // 道具二选一（钱不够就直接落到堂堂正正）
      era.print('但对方看起来也不是省油的灯、未必能稳操胜券、');
      era.print('好在魔王身上携带了些一次性魔法道具、');
      era.print('虽然价格昂贵但威力巨大、');
      era.print('魔王考虑着是否要在决斗中使用这些道具。。。');
      era.printButton('使用氪金道具', 1);
      era.printButton('堂堂正正一决胜负', 2);
      choice = await fort_choice([1, 2]); // $INPUT_LOOP2
    } else {
      choice = 2;
    }
    const roll = rand(10);
    // 人数上限七分支：命中即 LOCAL = 0 → 开挂取胜不成立
    const local = hero_cap_reached() ? 0 : roll;
    // 开挂取胜
    if (choice === 1 && local >= 2) {
      era.print(`魔王和${info.foe}的战斗开始了。`);
      // 的 PRINTFORM 与 PRINTDATAL 的第一行同显示行（归并见文件头）
      const items = printdata(rand, [
        [
          `魔王趁${info.foe}不备，向${info.foe}扔出了高级泥沼卷轴。`,
          `${info.foe}陷入了泥沼中，动弹不得，被魔王抓住了。`,
        ],
        [
          `魔王趁${info.foe}不备，向${info.foe}扔出了强效麻痹药水。`,
          `药瓶正中的${info.foe}在药水的作用下动弹不得，被魔王抓住了。`,
        ],
        [
          `魔王趁${info.foe}不备，向${info.foe}祭起了邪能封印壶。`,
          `${info.foe}猝不及防被吸进了封印壶内，被魔王抓住了。`,
        ],
      ]);
      era.print(`在试探数合之后，${items[0]}`); // 首行
      for (const line of items.slice(1)) {
        era.print(line); // 同一 DATALIST 的后续行
      }
      era.print(''); // PRINTFORML（空行）
      era.print(`魔王军高呼魔王万岁，继续向${info.place}进发。`); // PRINTFORMW
      await era.waitAnyKey();
      // 生成一名对应种族职业的勇者
      era.addCharacter(job); // ADDCHARA LOCAL:12
      await add_chara_ex(job);
      await char_make(job, 0, info.race, rand); // CHARA_MAKE(…, LOCAL:10)
      chara(job).invasion.状态 = 0; // CFLAG:A:1 = 0
      era.print(`${chara_nickname(job)}被魔王抓住了。金钱-3000`); // PRINTFORMW
      await era.waitAnyKey();
      era_flag.money -= 3000;
      era_exflag.legit_money -= 3000;
      era_exflag.defeated_heroes_bits = kill_bits;
      era_exflag.prestige = era_exflag.prestige + 1;
      return 0;
    }
    // 开挂失败
    if (choice === 1) {
      era.print(`魔王和${info.foe}的战斗开始了。`);
      // 的 PRINTFORM 与 PRINTDATAL 的第一行同显示行（归并见文件头）
      const items = printdata(rand, [
        [`魔王趁${info.foe}不备，向${info.foe}扔出了高级泥沼卷轴。`],
        [`魔王趁${info.foe}不备，向${info.foe}扔出了强效麻痹药水。`],
        [`魔王趁${info.foe}不备，向${info.foe}祭起了邪能封印壶。`],
      ]);
      era.print(`在试探数合之后，${items[0]}`); // （三选一整行）
      era.print(`然而${info.foe}提前察觉了魔王的动作，躲闪掉了。`);
      era.print(`在鄙夷地看了魔王一眼后，${info.foe}${info.leave}。`);
      era.print(
        `虽然被人鄙视了，但腼着脸的魔王命令魔王军继续向${info.place}前进。`,
      );
      era.print('');
      era.print('金钱-3000。'); // PRINTFORMW
      await era.waitAnyKey();
      era_flag.money -= 3000;
      era_exflag.legit_money -= 3000;
      return 0;
    }
    // 不开挂取胜
    if (local < 2) {
      era.print(`魔王和${info.foe}的战斗开始了、`);
      era.print(`尽管${info.foe}的${info.skill}、`);
      era.print('但还是敌不过魔王的邪恶魔法、');
      era.print('很快就成为了一具尸体。');
      era.print(`魔王军高呼魔王万岁、继续向${info.place}进发。`);
      era.print('');
      era.print('魔王魔力减少50%、魔王经验+500'); // PRINTFORMW
      await era.waitAnyKey();
      chara(0).dungeon.气力 = Math.trunc(chara(0).dungeon.气力 / 2); // BASE:MASTER:1
      chara(yusya).dungeon.战斗经验 += 500; // EXP:YUSYA_I:80
      return 0;
    }
    // 不开挂失败
    era.print(`魔王和${info.foe}的战斗开始了、`);
    era.print(`${info.foe}的${info.skill}、`);
    era.print('魔王左支右绌、招架不住、');
    era.print(`被${info.skill}抓住空隙、达成了重伤。`);
    era.print('魔王军士气动摇、救下昏迷的魔王匆匆逃回魔王城。');
    era.print('');
    era.print('魔王体力魔力清空、侵攻中止'); // PRINTFORMW
    await era.waitAnyKey();
    chara(0).dungeon.体力 = 0; // BASE:MASTER:0
    chara(0).dungeon.气力 = 0; // BASE:MASTER:1
    return 1;
  }

  // [2] 亲自上前处理
  if (choice === 2) {
    const roll = rand(10);
    if (roll < 2) {
      // 奴隶取胜 20%
      era.print(`${chara_nickname(yusya)}与${info.foe}开始了战斗。`);
      era.print(
        `虽然${info.foe}${info.skill}，但却被${chara_nickname(yusya)}抓住机会打伤了。`,
      );
      era.print(`${info.foe}心有不甘地${info.leave}。`);
      era.print(
        inv_type === 2
          ? `魔王军高万岁，继续向${info.place}进发。`
          : `${chara_nickname(yusya)}继续向${info.place}进发。`,
      );
      era.print('');
      era.print(`${chara_nickname(yusya)}经验+500，体力-50%`); // PRINTFORMW
      await era.waitAnyKey();
      chara(yusya).dungeon.战斗经验 += 500;
      chara(yusya).dungeon.体力 = Math.trunc(chara(yusya).dungeon.体力 / 2);
      return 0;
    }
    if (roll < 6) {
      // 奴隶不分胜负 40%
      era.print(`${chara_nickname(yusya)}与${info.foe}开始了战斗。`);
      era.print(
        `虽然${info.foe}${info.skill}，但${chara_nickname(yusya)}也不遑多让。`,
      );
      era.print(`在大战几百回合之后，${info.foe}心有不甘地${info.leave}。`);
      // 两段之间是纯空白行（不产生输出），ere 侧不打空行
      era.print(
        inv_type === 2
          ? `魔王军高呼万岁，继续向${info.place}进发。`
          : `${chara_nickname(yusya)}继续向${info.place}进发。`,
      );
      era.print('');
      era.print(`${chara_nickname(yusya)}体力-90%`); // PRINTFORMW
      await era.waitAnyKey();
      chara(yusya).dungeon.体力 = Math.trunc(chara(yusya).dungeon.体力 / 10);
      return 0;
    }
    // 奴隶失败 40%
    era.print(`${chara_nickname(yusya)}与${info.foe}激烈交战起来。`);
    era.print(
      `${info.foe}的${info.skill}，没过多久，${chara_nickname(yusya)}就被${info.foe}打晕了过去。`,
    );
    era.print(`${info.foe}轻蔑的一笑，${info.leave}。`);
    if (inv_type === 2) {
      era.print('失去指挥官的魔王军只好撤退了。');
    } else if (captive_route() && (era.get(`flag:${sindo}`) || 0) === 0) {
      // `(FLAG:5 & 128) && !FLAG:SINDO`——纯 `&&` 链，无优先级歧义
      era.print(`晕过去的${chara_nickname(yusya)}成为了狂王的俘虏。`);
      chara(yusya).invasion.状态 = 9;
    } else {
      era.print(
        `不知道过了多久后才苏醒过来的${chara_nickname(yusya)}原路返回了。`,
      );
      chara(yusya).invasion.状态 = 0;
    }
    return 1;
  }

  // [3] 无视，全军进攻（RAND:2：真值 = 撤退）
  if (rand(2) !== 0) {
    era.print('然而由于地形狭窄魔王军的数量优势无法发挥、');
    era.print(`并且${info.foe}的${info.skill}、`);
    era.print('在损失了大批魔物之后、');
    era.print(`${info.foe}轻蔑的一笑、${info.leave}。`);
    era.print('魔王军元气大伤只好撤退了。');
    era.print('');
    era.print('侵攻中止。'); // PRINTFORMW
    await era.waitAnyKey();
    return 1;
  }
  era.print('然而由于地形狭窄魔王军的数量优势无法发挥、');
  era.print(`并且${info.foe}的${info.skill}、`);
  era.print('导致损失了不少魔物、');
  era.print(`最后${info.foe}体力不支、${info.leave}。`);
  era.print(`付出了不少代价的魔王军、继续向${info.place}进发。`);
  era.print('');
  era.print('魔物数量-20%。'); // PRINTFORMW
  await era.waitAnyKey();
  state.sinkou = Math.trunc((state.sinkou * 4) / 5);
  return 0;
}

/**
 * PRINTDATA / PRINTDATAL 的随机抽取（等概率选中一组，逐行返回）。
 *
 * PRINTDATA 与 PRINTDATAL 各含若干
 * DANTA/DATALIST/DATAFORM 块，引擎「等概率随机选择一个显示」——一次
 * `RAND:块数`。ere 侧无全局 RAND 序列（#117 决议），改用注入的 rand，
 * 上界 = 块数（两种命令同款）。
 *
 * @param {(n: number) => number} rand 随机源
 * @param {string[][]} blocks 候选块（每块若干行）
 * @returns {string[]} 选中块的行
 */
function printdata(rand, blocks) {
  return blocks[rand(blocks.length)];
}

module.exports = {
  inv_death_check,
  invasion_event,
  invasion_event_challenge,
  invasion_event_fort,
  invasion_event_seiei,
};
