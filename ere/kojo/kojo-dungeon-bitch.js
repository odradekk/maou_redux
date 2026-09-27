/**
 * @file 地下城卖春系统（issue #184，H15）：DUNGEON_BITCH.ERB 二十四函数
 * 中**活代码十二函数**的移植。四组同名（DUNGEON_BITCH / HEROINE_BITCH /
 * DUNGEON_ANIMAL / DUNGEON_WORK）的后一份全在源文件 [SKIPSTART]（:1199）～
 * [SKIPEND]（:3132）预处理块内（块头注释「;旧構文」）——Emuera 的
 * [SKIPSTART]～[SKIPEND] 之间所有行不装载（emuera-basic-agent-guide
 * preprocessor.md），函数不进入函数空间、不构成同名遮蔽（#12 仲裁的先例：
 * #103 的 AGENT.ERB:880～1020 用同一机制禁掉旧版 @CHECK_STATUS 后
 * 「不参与同名仲裁」）。SKIP 块内 12 个旧版函数为原作死代码，不移植，
 * 判定与登记见 issue #14。
 *
 * == 本文件存根化的原作调用名（docs/stub-registry.md 必须收录每一个） ==
 *
 *   无。LOG_* / FS_* 六项随 H16 #185 换真身，强制肉偿随 #544 换真身
 *   （ere/kojo/kojo-forced-payment.js），名单已空。
 *
 * == 跨文件调用 ==
 *
 *   强制肉偿（魔改新增/强制肉偿.ERB，:77 调用点）落在 ere/kojo/
 *   kojo-forced-payment.js，本文件顶层 import 它的 forced_payment；它对
 *   exp_bitch 走**函数内延迟 require** 回指本文件——两个模块相互引用，
 *   装载期的循环由那一侧的延迟 require 打断（dungeon-trap.js:1996 先例）。
 *
 * == 随机源 ==
 *
 * 每个函数接受可选的 rand 参数（[0, n) 整数，缺省均匀随机），测试注入
 * 定值序固定随机分支（与 kojo-k3-noble / kojo-system 同款）。RAND:N →
 * rand_n(N)；RAND(min, max) → min + rand_n(max - min)（emuera-basic-agent-guide
 * in-expression-functions.md:96：双参数返回 [min, max)）。
 *
 * == 文本 ==
 *
 * 口上正文统一为简体（issue #60 的归一表裁定，对 1:1 的有意偏离——
 * 源文件汉化本身繁简混用），新增文本受 tools/lang-check.js 检查。
 *
 * == #572 复核：@SET_BICH_LEVEL 的裸编号行保持纯文本 ==
 *
 * 源 :1176 是 `PRINTL [0] [1] [2] [3] [4] [5]`——六枚**没有正文**的裸快捷键
 * （等级 0-5，选中的等级由 :1188-1192 的播报补述）。按钮化要走两条路之一：
 * 拆成六条语句（保真锁 A/D 的「一条 JS 语句 ↔ 一行 PRINT」绑定不成立）或改用
 * 多列网格按钮（`printMultiColumns`/`printInColRows` 的按钮格，本项目尚无
 * 先例、须先在引擎里核渲染）。本票按「其他」保留纯文本：该轮没有按钮＝引擎
 * 的自由输入通道，玩家键入 0-5 照常可达，丢的只是「点得动」；留给后续按
 * 界面统一处理（docs/research/plaintext-options.md 第六节）。
 */

const era = require('#/era-electron');
const { karma } = require('#/chara/chara-stats');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { chara_callname } = require('#/utils/callname-utils');
const { chara } = require('#/facade/chara');
const { forced_payment } = require('#/kojo/kojo-forced-payment');
const {
  expname,
  palamname,
  fs_bitch,
  fs_log_bitch,
  log_try_bitch,
  log_after_bitch,
  log_bitch_animal,
  log_bitch_self,
} = require('#/kojo/kojo-dungeon-bitch-log');

/** 默认随机源（[0, n) 整数）；测试注入定值序 */
const default_rand = (n) => Math.floor(Math.random() * n);

/** 角色的显示名（%SAVESTR:ARG% 的等价物） */
const name_of = (cid) => chara_callname(cid);

/**
 * @DUNGEON_BITCH（:3-50）：地下城内卖春入口。
 *
 * 流程：体力/气力门槛（BASE:0 < 300 || BASE:1 < 100 → RETURN 0）→
 * FI_CULC_BITCH 算成败 → 勇者（CFLAG:1 == 2）两道额外门槛（EXP:74 非零、
 * SEIKOU > 100）→ 卖春处理（CFLAG:120 卖春积极性 > 0 时判定）→ 兽奸
 * （RAND(1,16) < ABL:39 且 ABLE）→ 自慰（RAND:36 <= ...）→ 内职
 * （CFLAG:500 == 0 && CFLAG:1 == 3）。
 *
 * @param {number} arg 角色 ID
 * @param {(n: number) => number} [rand] RAND 随机源
 * @returns {Promise<number>} 0
 */
async function dungeon_bitch(arg, rand = default_rand) {
  const rand_n = rand;

  // 体力/气力门槛（调教对象空/濒死早退）
  if (era.get(`base:${arg}:0`) < 300 || era.get(`base:${arg}:1`) < 100) {
    return 0;
  }

  // 成败判定（SEIKOU 成功值 / SIPPAI 失败值）
  const seikou = fi_culc_bitch(arg, 'SEIKOU', 'DUNGEON', rand);
  const sippai = fi_culc_bitch(arg, 'SIPPAI', 'DUNGEON', rand);

  // 勇者用（CFLAG:1 == 2）：卖淫经验必须非零、且成功率 > 100
  if (era.get(`cflag:${arg}:1`) === 2) {
    if (!era.get(`exp:${arg}:74`)) {
      return 0;
    }
    if (seikou <= 100) {
      return 0;
    }
  }

  // 卖春处理（CFLAG:120 卖春积极性 > 0 时进入）
  if (era.get(`cflag:${arg}:120`)) {
    // 成败判定：RAND:(SEIKOU + SIPPAI) < SEIKOU
    if (rand_n(seikou + sippai) < seikou) {
      await log_try_bitch(arg, 'DUNGEON'); // CALL LOG_TRY_BITCH(ARG, "DUNGEON")
      await sell_bitch(arg, 'DUNGEON', rand); // CALL SELL_BITCH
    }
  }

  // 兽（RAND(1,16) < ABL:39 且 ABLE）
  if (1 + rand_n(16 - 1) < era.get(`abl:${arg}:39`)) {
    if (fi_culc_bitch(arg, 'ABLE', 'ANIMAL', rand)) {
      await dungeon_animal(arg, rand); // CALL DUNGEON_ANIMAL
    }
  }

  // 自慰（RAND:36 <= ABL:11 + ABL:31 + TALENT:60*10 且 ABLE）
  if (
    rand_n(36) <=
    era.get(`abl:${arg}:11`) +
      era.get(`abl:${arg}:31`) +
      era.get(`talent:${arg}:60`) * 10
  ) {
    if (fi_culc_bitch(arg, 'ABLE', 'SELF', rand)) {
      await self_bitch(arg, 'DUNGEON', rand); // CALL SELF_BITCH
    }
  }

  // 内职（CFLAG:500 == 0 && CFLAG:1 == 3 潜入中）
  if (era.get(`cflag:${arg}:500`) === 0 && era.get(`cflag:${arg}:1`) === 3) {
    await dungeon_work(arg); // CALL DUNGEON_WORK
  }

  return 0;
}

/**
 * @HEROINE_BITCH（:53-82）：城镇（迷宫外）勇者卖春入口。
 *
 * 与 DUNGEON_BITCH 同构但场所为 TOWN；额外有债务过高强制卖春
 * （CFLAG:582 < -10000 且非处女且 !RAND:3）。
 *
 * @param {number} arg 角色 ID
 * @param {(n: number) => number} [rand] RAND 随机源
 * @returns {Promise<number>} 0
 */
async function heroine_bitch(arg, rand = default_rand) {
  const rand_n = rand;

  // 体力/气力门槛
  if (era.get(`base:${arg}:0`) < 300 || era.get(`base:${arg}:1`) < 100) {
    return 0;
  }

  // 成败判定
  const seikou = fi_culc_bitch(arg, 'SEIKOU', 'TOWN', rand);
  const sippai = fi_culc_bitch(arg, 'SIPPAI', 'TOWN', rand);

  // 卖春处理（CFLAG:120 > 0 且 SEIKOU > 100 且成败判定）
  if (era.get(`cflag:${arg}:120`)) {
    if (seikou > 100 && rand_n(seikou + sippai) < seikou) {
      await log_try_bitch(arg, 'TOWN'); // CALL LOG_TRY_BITCH(ARG, "TOWN")
      await sell_bitch(arg, 'TOWN', rand); // CALL SELL_BITCH
    }
  }

  // 债务过高 1/3 机率触发强制卖春（限非处女）
  if (
    era.get(`cflag:${arg}:582`) < -10000 &&
    !era.get(`talent:${arg}:0`) &&
    !rand_n(3)
  ) {
    // CALL 强制肉偿(ARG)
    await forced_payment(arg, rand);
  }

  // 自慰（RAND:36 <= ... 且 ABLE）
  if (
    rand_n(36) <=
    era.get(`abl:${arg}:11`) +
      era.get(`abl:${arg}:31`) +
      era.get(`talent:${arg}:60`) * 10
  ) {
    if (fi_culc_bitch(arg, 'ABLE', 'SELF', rand)) {
      await self_bitch(arg, 'TOWN', rand); // CALL SELF_BITCH
    }
  }

  return 0;
}

/**
 * @SELL_BITCH（:97-329）：卖春执行函数。
 *
 * 流程：客数 KYAKU → 记录卖春前 EXP/JUEL/KARMA/金钱 → 客循环（每客成败
 * 判定 → 玩法抽选 FI_TRY_BITCH → 收益 PROFIT_BITCH → 经验 EXP_BITCH）→
 * 成功结算（客与玩法显示、KARMA 减少、经验/点数变化显示、金钱入账）→
 * 失败时的四种台词。
 *
 * 返回值：无（卖春成功与否通过 CHECK 位记录，日志函数 LOG_AFTER_BITCH
 * 消费）。
 *
 * @param {number} arg 角色 ID
 * @param {string} place "DUNGEON" | "TOWN"
 * @param {(n: number) => number} [rand] RAND 随机源
 * @returns {Promise<number>} 0
 */
async function sell_bitch(arg, place, rand = default_rand) {
  const rand_n = rand;
  // ERB 局部变量（#DIM，见 :98-112）：
  //   LCOUNT 循环计数；KYAKU 客数；SEIKOU/SIPPAI 成败值；PLAY[7] 各玩法
  //   次数（1-6）；MAN[6]/GIRL[6] 各客种类计数；PREV_EXP[100]/PREV_JUEL[20]
  //   卖春前快照；PREV_KARMA 善恶值快照；PREV_MONEY 金钱快照；CHECK 位记录
  let lcount = 0;
  let kyaku = 0;
  let seikou = 0;
  let sippai = 0;
  const play = [0, 0, 0, 0, 0, 0, 0]; // PLAY,7（下标 1-6 用）
  const man = [0, 0, 0, 0, 0, 0]; // MAN,6
  const girl = [0, 0, 0, 0, 0, 0]; // GIRL,6
  const prev_exp = new Array(100).fill(0); // PREV_EXP,100
  const prev_juel = new Array(20).fill(0); // PREV_JUEL,20
  let prev_karma = 0;
  let prev_money = 0;
  let check = 0; // CHECK（BIT 记录）
  let local = 0;
  let locals = '';

  // 客数（判定回数）
  kyaku = fi_culc_bitch(arg, 'KYAKU', place, rand);

  // 客がいる（客というか判定回数）
  if (kyaku) {
    // VARSET PLAY/MAN/GIRL/CHECK（数组已初始化为 0）

    // 卖春前快照：EXP/JUEL（ARRAYCOPY 不可用于角色变量，逐格拷贝）
    for (lcount = 0; lcount < 100; lcount += 1) {
      prev_exp[lcount] = era.get(`exp:${arg}:${lcount}`) || 0;
    }
    for (lcount = 0; lcount < 20; lcount += 1) {
      prev_juel[lcount] = era.get(`juel:${arg}:${lcount}`) || 0;
    }
    prev_karma = era.get(`cflag:${arg}:151`) || 0;

    // 场所/身份的金钱快照：DUNGEON 中侵攻勇者（CFLAG:1 == 2）
    // 的所持金走 CFLAG:580；否则走全局 MONEY
    if (place === 'DUNGEON') {
      check |= 1; // SETBIT CHECK, 0
      if (era.get(`cflag:${arg}:1`) === 2) {
        prev_money = era.get(`cflag:${arg}:580`) || 0;
      } else {
        prev_money = era_flag.money;
      }
    } else {
      prev_money = era.get(`cflag:${arg}:580`) || 0;
    }

    // 客循环（每次循环内 KARMA 不下调——注释：下调会让判定越来越松）
    for (lcount = 0; lcount < kyaku; lcount += 1) {
      // 成败重算（勇者侧资金变化影响基本成功率）
      seikou = fi_culc_bitch(arg, 'SEIKOU', place, rand);
      sippai = fi_culc_bitch(arg, 'SIPPAI', place, rand);

      // 失败则本客跳过
      if (rand_n(seikou + sippai) >= seikou) {
        continue; // CONTINUE
      }

      // 玩法抽选（0=失败, 1=HAND, 2=ORAL, 3=LES, 4=ANAL, 5=SEX, 6=ANIMAL）
      local = fi_try_bitch(arg, place, rand);

      // 玩法抽选失败则跳过
      if (!local) {
        continue;
      }

      // 玩法内容字符串化（%FS_BITCH("PLAY", LOCAL)%）
      locals = fs_bitch('PLAY', local);

      // 该玩法不可用则跳过
      if (!fi_culc_bitch(arg, 'ABLE', locals, rand)) {
        continue;
      }

      // 本次玩法次数与累计
      play[local] = fi_culc_bitch(arg, 'PLAY', locals, rand);
      check |= 1 << local; // SETBIT CHECK, LOCAL

      // 收益（返回客种类与客号）+ 经验
      const [customer, customer_no] = profit_bitch(
        arg,
        place,
        locals,
        play[local],
        rand,
      );
      if (customer === 1) {
        // 男性客
        man[customer_no] += 1; // MAN:MAN ++
        check |= 1 << (10 + customer_no); // SETBIT CHECK, (10 + MAN)
      } else if (customer === 2) {
        // 女性客
        girl[customer_no] += 1; // GIRL:GIRL ++
        check |= 1 << (20 + customer_no); // SETBIT CHECK, (20 + GIRL)
      }

      exp_bitch(arg, place, locals, play[local]);
    }

    // 合计玩法次数
    play[0] = play.slice(1).reduce((a, b) => a + b, 0); // SUMARRAY(PLAY)

    // 卖春成功的显示与结算
    if (play[0] > 0) {
      // 客数与玩法次数合计
      man[0] = man.slice(1).reduce((a, b) => a + b, 0); // SUMARRAY(MAN)
      girl[0] = girl.slice(1).reduce((a, b) => a + b, 0); // SUMARRAY(GIRL)

      // 客与玩法的显示（场所分档）
      if (place === 'DUNGEON') {
        locals = ''; // VARSET LOCALS
        if (man[0]) {
          // 男性客合计显示（FS_LOG_BITCH）
          locals = fs_log_bitch(
            'DUNGEON_MAN',
            man[1],
            man[2],
            man[3],
            man[4],
            man[5],
          );
        }
        // 的 %SAVESTR:ARG% 是这一行的前缀：
        // - GIRL && MAN 时它与 :212 合成一条（:212 的 PRINTFORML 收行）；
        // - 其余情况 :212 不执行、行继续到 :217，此时前缀并进 :217 那条
        //   （前缀提到语句外共用、锚写该分支自己的行号，见 #624；只并第一支的话
        //   其余分支上玩家仍看到两行）
        // 前缀是「内联在 :205+:212 的拼接锚语句里」（锁 C 要求 ARGNAME、LOCALS
        // 两个槽位按序出现），其余分支用 name_of(arg) 直接调用（不是模板槽位）。
        if (girl[0] && man[0]) {
          era.print(`${name_of(arg)}${locals}、`);
        }
        if (girl[0]) {
          locals = fs_log_bitch(
            'DUNGEON_GIRL',
            girl[1],
            girl[2],
            girl[3],
            girl[4],
            girl[5],
          );
        }
        // 原作是一整行：:213 的「于是」（只在 GIRL && MAN 时输出，
        // 那时前缀已由上面那条收行）与 :217 的「以%LOCALS%为对手」都不换行（#624）
        await era.print(
          (girl[0] && man[0] ? '于是' : name_of(arg)) + `以${locals}为对手`,
        );

        locals = fs_log_bitch(
          'PLAYNAME',
          play[1],
          play[2],
          play[3],
          play[4],
          play[5],
        );
        await era.printAndWait(`${locals}进行着`);
      } else {
        // 街中
        // 的 %SAVESTR:ARG% 是这一行的前缀，两条路径各并一次：
        // - PLAY == PLAY:6 时与 :226 合成一条（拼接锚）；
        // - 其余情况行继续，前缀并进 :232（GIRL && MAN）或 :237 那一条（锚写该
        //   分支自己的行号，见 #624；只并第一支的话其余分支上仍看到两行）
        locals = '';
        if (play[0] === play[6]) {
          await era.printAndWait(`${name_of(arg)}进行了${play[6]}次兽交秀。`);
        } else {
          if (man[0]) {
            locals = fs_log_bitch(
              'TOWN_MAN',
              man[1],
              man[2],
              man[3],
              man[4],
              man[5],
            );
          }
          if (girl[0] && man[0]) {
            era.print(name_of(arg) + `${locals}、`);
          }
          if (girl[0]) {
            locals = fs_log_bitch(
              'TOWN_GIRL',
              girl[1],
              girl[2],
              girl[3],
              girl[4],
              girl[5],
            );
          }
          // 原作是一整行：:233 的「于是」（只在 GIRL && MAN 时输出，
          // 那时前缀已由上面那条收行）与 :237 的「以%LOCALS%为对手」都不换行（#624）
          await era.print(
            (girl[0] && man[0] ? '于是' : name_of(arg)) + `以${locals}为对手`,
          );

          locals = fs_log_bitch(
            'PLAYNAME',
            play[1],
            play[2],
            play[3],
            play[4],
            play[5],
          );
          await era.printAndWait(`${locals}进行着`);
          if (play[6]) {
            await era.printAndWait(`并且进行了${play[6]}次兽奸表演`);
          }
        }
      }

      // 善恶值减少（-1 * PLAY）
      local = -1 * play[0];
      karma(arg, local); // CALL KARMA

      // 卖春日志（LOG_AFTER_BITCH 消费 CHECK）
      await log_after_bitch(arg, check, rand); // CALL LOG_AFTER_BITCH(ARG, CHECK)

      // 经验与点数变化显示（与快照比对）
      await era.print('～经验与点数变化～');
      for (lcount = 0; lcount < 100; lcount += 1) {
        const now_exp = era.get(`exp:${arg}:${lcount}`) || 0;
        if (prev_exp[lcount] === now_exp) {
          continue;
        }
        await era.print(
          `${expname(lcount, 16)}：${prev_exp[lcount]}→${now_exp}`,
        );
      }
      for (lcount = 0; lcount < 20; lcount += 1) {
        const now_juel = era.get(`juel:${arg}:${lcount}`) || 0;
        if (prev_juel[lcount] === now_juel) {
          continue;
        }
        await era.print(
          `${palamname(lcount, 12)}点数：${prev_juel[lcount]}→${now_juel}`,
        );
      }
      await era.waitAnyKey(); // WAIT

      // 经验/金钱入账（场所分档）
      if (place === 'DUNGEON') {
        // 经验（魔王 0 与奴隶都加）
        chara(0).dungeon.战斗经验 += play[0]; // EXP:0:80 += PLAY
        chara(arg).dungeon.战斗经验 += play[0];
        await era.printAndWait(
          `${name_of(arg)}淫荡行为成为了魔王和奴隶们的力量（经验值＋${play[0]}）`,
        );

        if (era.get(`cflag:${arg}:1`) === 2) {
          // 侵攻中的勇者：所持金变化
          local = (era.get(`cflag:${arg}:580`) || 0) - prev_money;
          await era.printAndWait(`${name_of(arg)}获得了${local}数量的金币`);
        } else {
          // 奴隶：收入按好感度分成上交
          local = era_flag.money - prev_money;
          if (era.get(`cflag:${arg}:2`) >= 5000) {
            local = Math.floor((local / 10) * 9); // LOCAL/10*9
            await era.printAndWait(
              `基于对魔王的爱意，${name_of(arg)}将卖得收入的九成都上交了。献上了${local}点资金。`,
            );
          } else if (era.get(`cflag:${arg}:2`) >= 3000) {
            local = Math.floor((local / 10) * 9); // LOCAL/10*9
            await era.printAndWait(
              `基于对魔王的感情，${name_of(arg)}将卖得收入的七成都上交了。献上了${local}点资金。`,
            );
          } else {
            if (local % 2) {
              local = Math.floor(local / 3); // LOCAL /= 2 + 1（复合赋值右侧整体求值 = LOCAL / 3）
              await era.printAndWait(
                `${name_of(arg)}将卖得收入的一半上交了。献上了${local}点资金。`,
              );
            } else {
              local = Math.floor(local / 2); // LOCAL /= 2
              await era.printAndWait(
                `${name_of(arg)}将卖得收入的一半上交了。献上了${local}点资金。`,
              );
            }
          }
          era_flag.money -= local; // MONEY -= LOCAL
          era_exflag.legit_money -= local; // EX_FLAG:4444 -= LOCAL
          chara(arg).dungeon.所持金 += local; // CFLAG:ARG:580 += LOCAL
        }
      } else {
        // 街中：所持金变化即经验
        local = (era.get(`cflag:${arg}:580`) || 0) - prev_money;
        chara(arg).dungeon.战斗经验 += local; // EXP:ARG:80 += LOCAL
        await era.printAndWait(
          `获得了${name_of(arg)}${local}点的金钱以及经验值。`,
        );
      }

      // 善恶值减少显示
      local = prev_karma - (era.get(`cflag:${arg}:151`) || 0);
      if (local) {
        await era.printAndWait(`然后，善恶值减少了${Math.abs(local)}。`);
      }
    } else {
      // 一次也没成功
      await fail_message(arg, kyaku, true, false);
    }
  } else {
    // 客没来
    await fail_message(arg, kyaku, false, true);
  }

  return 0;
}

/**
 * 卖春失败/无客时的台词（:306-328 两个分档共用四支）。
 * @param {number} arg 角色 ID
 * @param {number} kyaku 客数
 * @param {boolean} has_kyaku 有客（客循环后失败）
 * @param {boolean} no_kyaku 无客
 * @returns {Promise<void>}
 */
async function fail_message(arg, kyaku, has_kyaku, no_kyaku) {
  if (!era.get(`exp:${arg}:74`) && era.get(`cflag:${arg}:151`) > 100) {
    await era.printAndWait(
      `${name_of(arg)}醒来后，将不知羞耻的想法从脑袋里赶走了。`,
    );
  } else if (era.get(`cflag:${arg}:151`) > 50) {
    await era.printAndWait('在下不定决心而烦恼的时候，时间不断地流失掉了...');
  } else if (era.get(`cflag:${arg}:151`) > 0) {
    await era.printAndWait(
      '然而，根本没有勇气发出声音，说自己在卖春的这种事情。',
    );
  } else if (has_kyaku) {
    // 与 :315 原作是 PRINTFORM（不换行）+ PRINTFORMW，Emuera 里同属一行；
    // 拼接锚 :314+:315 表达「这一条语句 = 这两行构成的一行输出」（#584）
    await era.printAndWait(
      `${kyaku}人群的声音嘈杂着、交涉终了，一个人也没有买下${name_of(arg)}，就这样子离开了`,
    );
  } else if (no_kyaku) {
    await era.printAndWait('于是、一个对象也没有找到');
  }
}

/**
 * @EXP_BITCH（:334-417）：卖春经验/点数结算。
 *
 * 按玩法类型分档增加 EXP/JUEL；DUNGEON 场所的倍率高于 TOWN。
 * EXP:74（卖淫经验）与 EXP:80（战斗经验）在卖春入口处另计，此处按玩法。
 *
 * @param {number} arg 角色 ID
 * @param {string} place "DUNGEON" | "TOWN"
 * @param {string} type 玩法（"HAND"/"ORAL"/"LES"/"ANAL"/"SEX"/"ANIMAL"）
 * @param {number} play 次数
 */
function exp_bitch(arg, place, type, play) {
  switch (type) {
    // HAND 手淫奉侍
    case 'HAND':
      chara(arg).dungeon.精液经验 += play; // EXP:ARG:20 += PLAY（精液经验）
      chara(arg).dungeon.卖淫经验 += play; // 卖淫经验
      if (place === 'DUNGEON') {
        era.add(`juel:${arg}:7`, play * 5);
      } else {
        era.add(`juel:${arg}:7`, play);
      }
      if (era.get(`talent:${arg}:62`)) {
        era.add(`juel:${arg}:9`, play);
      }
      if (era.get(`talent:${arg}:47`)) {
        era.add(`juel:${arg}:5`, play * 5);
      }
      break;

    // ORAL 口交奉侍
    case 'ORAL':
      chara(arg).dungeon.口交经验 += play; // 口交经验
      chara(arg).dungeon.精液经验 += play; // 精液经验
      chara(arg).dungeon.卖淫经验 += play; // 卖淫经验
      if (place === 'DUNGEON') {
        era.add(`juel:${arg}:7`, play * 10);
      } else {
        era.add(`juel:${arg}:7`, play);
      }
      if (era.get(`talent:${arg}:62`)) {
        era.add(`juel:${arg}:9`, play);
      }
      if (era.get(`talent:${arg}:47`)) {
        chara(arg).dungeon.精饮绝顶经验 += play; // EXP:8 += PLAY（精饮绝顶经验）
        era.add(`juel:${arg}:5`, play * 10);
      }
      break;

    // LES 百合奉侍
    case 'LES':
      chara(arg).train.百合经验 += play; // 百合经验
      chara(arg).dungeon.卖淫经验 += play; // 卖淫经验
      if (place === 'DUNGEON') {
        chara(arg).dungeon.绝顶经验 += Math.floor(
          (play * (1 + (era.get(`abl:${arg}:10`) || 0))) / 5,
        );
        era.add(
          `juel:${arg}:0`,
          play * 100 * (1 + (era.get(`abl:${arg}:10`) || 0)),
        );
        era.add(`juel:${arg}:5`, play * 200);
      } else {
        chara(arg).dungeon.绝顶经验 += Math.floor(
          (play * (1 + (era.get(`abl:${arg}:10`) || 0))) / 10,
        );
        era.add(`juel:${arg}:0`, play * 10 * (era.get(`abl:${arg}:10`) || 0));
        era.add(`juel:${arg}:5`, play * 15);
      }
      break;

    // ANAL 肛交奉侍
    case 'ANAL':
      chara(arg).dungeon.肛门经验 += play; // 肛门经验
      chara(arg).dungeon.性交经验 += play; // 性交经验
      chara(arg).dungeon.卖淫经验 += play; // 卖淫经验
      if (place === 'DUNGEON') {
        era.add(`juel:${arg}:2`, play * 200);
        era.add(`juel:${arg}:5`, play * 250);
      } else {
        era.add(`juel:${arg}:2`, play * 10);
        era.add(`juel:${arg}:5`, play * 15);
      }
      break;

    // SEX 性交奉侍
    case 'SEX':
      chara(arg).dungeon.私处经验 += play; // 私处经验
      chara(arg).dungeon.性交经验 += play; // 性交经验
      chara(arg).dungeon.卖淫经验 += play; // 卖淫经验
      if (place === 'DUNGEON') {
        era.add(`juel:${arg}:1`, play * 200);
        era.add(`juel:${arg}:5`, play * 250);
      } else {
        era.add(`juel:${arg}:1`, play * 10);
        era.add(`juel:${arg}:5`, play * 15);
      }
      break;

    // ANIMAL 兽交奉侍（场所差异在原作注释中说明无差异）
    case 'ANIMAL':
      chara(arg).dungeon.兽奸经验 += play; // EXP:56 += PLAY（兽奸经验）
      chara(arg).dungeon.私处经验 += play; // EXP:0 += PLAY
      chara(arg).dungeon.性交经验 += play; // EXP:5 += PLAY
      // （#212 返工修正：原作 JUEL:N 省略位 == TARGET，此处即 arg——首版
      // 写成二段，era.add 打在「角色 1 的整行对象」上，加算从未生效）
      era.add(`juel:${arg}:1`, play * 200); // JUEL:1 += PLAY * 200
      era.add(`juel:${arg}:6`, play * 300); // JUEL:6 += PLAY * 300
      era.add(`juel:${arg}:8`, play * 200); // JUEL:8 += PLAY * 200
      break;

    default:
      break;
  }
}

/**
 * @PROFIT_BITCH（:420-495）：卖春收益结算，返回 [客种类, 客号]。
 *
 * 返回值（原作 RESULT:0 / RESULT:1）：客种类 1=男性 / 2=女性 / 0=兽交无客；
 * 客号 1-5（客种类分档）。金额按场所/身份/玩法费率计算。
 *
 * @param {number} arg 角色 ID
 * @param {string} place "DUNGEON" | "TOWN"
 * @param {string} type 玩法
 * @param {number} play 次数
 * @param {(n: number) => number} [rand] RAND 随机源
 * @returns {[number, number]} [客种类, 客号]
 */
function profit_bitch(arg, place, type, play, rand = default_rand) {
  // 局部变量
  let pay = 0;
  let girl = 0;
  let man = 0;

  // 基本料金（场所/身份/费率）
  if (place === 'DUNGEON') {
    if (era.get(`cflag:${arg}:1`) === 2) {
      // 勇者：费率 + 侵攻阶层
      pay = Math.floor(
        ((fi_culc_bitch(arg, 'RATE', type) +
          (era.get(`cflag:${arg}:501`) || 0)) *
          fi_culc_bitch(arg, 'RATE', 'KARMA')) /
          5,
      );
    } else {
      // 奴隶
      pay =
        5 *
        (1 +
          (era.get(`cflag:${arg}:501`) || 0) +
          fi_culc_bitch(arg, 'RATE', type));
    }
  } else {
    // 街中
    pay = Math.floor(
      (fi_culc_bitch(arg, 'RATE', 'KARMA') * fi_culc_bitch(arg, 'RATE', type)) /
        5,
    );
  }

  // 客种类抽选（ANIMAL 无客 / LES 女性客 / 其余男性客）
  switch (type) {
    case 'ANIMAL':
      break;
    case 'LES':
      girl = 1 + rand(6 - 1); // GIRL = RAND(1, 6)
      switch (girl) {
        case 3:
          pay -= 10;
          break;
        case 4:
          pay += 10;
          break;
        default:
          break;
      }
      break;
    default:
      man = 1 + rand(6 - 1); // MAN = RAND(1, 6)
      switch (man) {
        case 3:
          pay -= 10;
          break;
        case 4:
          pay += 10;
          break;
        default:
          break;
      }
      break;
  }

  // 卖淫经验为零 → 溢价 +10
  if (!era.get(`exp:${arg}:74`)) {
    pay += 10;
  }
  // 处女 → +5
  if (era.get(`talent:${arg}:0`)) {
    pay += 5;
  }

  // 总价 = 单次价 × 次数
  pay = pay * play;

  // 付款（场所/身份分档）
  if (place === 'DUNGEON') {
    if (era.get(`cflag:${arg}:1`) === 2) {
      chara(arg).dungeon.所持金 += pay; // 侵攻勇者所持金
    } else {
      era_flag.money += pay; // MONEY += PAY
      era_exflag.legit_money += pay; // EX_FLAG:4444 += PAY
    }
  } else {
    chara(arg).dungeon.所持金 += pay; // 勇者所持金
  }

  // 返回值（客种类, 客号）
  switch (type) {
    case 'ANIMAL':
      return [0, 0];
    case 'LES':
      return [2, girl];
    default:
      return [1, man];
  }
}

/**
 * @DUNGEON_WORK（:497-516）：内职（副业）。
 *
 * 收入 = CFLAG:9 * 20 + 100（潜入中 CFLAG:0 == 0 时 ÷10）；FLAG:5 位 32
 * 调试位开启时显示随机副业名（PRINTDATA 随机选一）。
 *
 * @param {number} arg 角色 ID
 * @param {(n: number) => number} [rand] RAND 随机源
 */
async function dungeon_work(arg, rand = default_rand) {
  // 收入 = CFLAG:9 * 20 + 100
  let local = (era.get(`cflag:${arg}:9`) || 0) * 20 + 100;
  // 潜入中（CFLAG:0 == 0）收入 ÷10
  if (era.get(`cflag:${arg}:0`) === 0) {
    local = Math.floor(local / 10);
  }
  // 调试位（FLAG:5 & 32）显示随机副业名
  if (era.get('flag:5') & 32) {
    // PRINTDATA 随机选一（提到语句外当取值，锚留在注释里）
    const jobs = ['研磨宝石的', '制作工艺品的', '抄写书籍的', '制作手工的'];
    const job = jobs[rand(jobs.length)]; // PRINTDATA
    // 原作是一整行：:504 的「…从事了」、上面的随机副业名与 :511 的
    // PRINTFORMW 收行都不换行（#624）
    await era.printAndWait(
      `${name_of(arg)}从事了` + job + `副业${local}点收入。`,
    );
  }
  // 收入入账
  era_flag.money += local; // MONEY += LOCAL
  era_exflag.legit_money += local; // EX_FLAG:4444 += LOCAL
}

/**
 * @DUNGEON_ANIMAL（:519-558）：自主兽奸。
 *
 * 只在 DUNGEON 场所由 DUNGEON_BITCH 调用；PLAY 次数由 FI_CULC_BITCH 算。
 *
 * @param {number} arg 角色 ID
 * @param {(n: number) => number} [rand] RAND 随机源
 */
async function dungeon_animal(arg, rand = default_rand) {
  // PLAY（兽交次数）
  const play = fi_culc_bitch(arg, 'PLAY', 'ANIMAL', rand);

  // 描写（:524 与 :525 原作 PRINTFORM + PRINTFORMW，同一行——#584）
  await era.printAndWait(`${name_of(arg)}无法压抑兽交的欲望悄悄寻找着兽穴...`);
  // PRINTFORMW %SAVESTR:ARG%进入了野兽的巢穴…
  await era.printAndWait(
    `${name_of(arg)}进入了野兽的巢穴，像母狗一样趴在地上，扭动着身躯引诱着发情的野兽。在野兽舌头的舔舐润滑后，令人兴奋的喘息和呜咽伴随着野兽的咆哮和肉体的撞击声缭绕在兽穴内，${name_of(arg)}比真正的雌兽还要卖力的摇晃着屁股，逢迎着非人的巨大阳具的刺激。`,
  );
  // PRINTFORMW 随后%SAVESTR:ARG%翻身将野兽压倒在地…
  await era.printAndWait(
    `随后${name_of(arg)}翻身将野兽压倒在地，主动跨坐在野兽的阴茎上扭动着自己的身体，同时将自己的乳首送到野兽嘴边享受着口舌的舔舐。粗暴的动作使${name_of(arg)}骑在野兽上陷入了恍惚，口水不由自主的流淌出来，无与伦比的快感让${name_of(arg)}成为了一具供野兽发泄性欲的肉娃娃。`,
  );
  await era.printAndWait(`忘我地与野兽样的魔物交尾了${play}次…`);

  // 日志
  await log_bitch_animal(arg, 'DUNGEON'); // CALL LOG_BITCH_ANIMAL(ARG, "DUNGEON", ARG:1)
  await era.waitAnyKey(); // WAIT

  // 兽奸经验
  await era.print(`${expname(56)}＋${play}`);
  await era.print(`${expname(0)}＋${play}`);
  await era.print(`${expname(5)}＋${play}`);
  chara(arg).dungeon.兽奸经验 += play;
  chara(arg).dungeon.私处经验 += play;
  chara(arg).dungeon.性交经验 += play;

  // 珠（点数）经验
  await era.print(`${palamname(1)}点数＋${play * 200}`);
  await era.print(`${palamname(6)}点数＋${play * 300}`);
  await era.printAndWait(`${palamname(8)}点数＋${play * 200}`);
  era.add(`juel:${arg}:1`, play * 200);
  era.add(`juel:${arg}:6`, play * 300);
  era.add(`juel:${arg}:8`, play * 200);

  // 魔王和奴隶们的力量（经验值）
  // PRINTFORMW %SAVESTR:ARG%的淫荡行为成为了魔王和奴隶们的力量…
  await era.printAndWait(
    `${name_of(arg)}的淫荡行为成为了魔王和奴隶们的力量（经验值＋${play}）`,
  );
  chara(0).dungeon.战斗经验 += play; // EXP:0:80 += PLAY
  chara(arg).dungeon.战斗经验 += play;

  // 善恶值减少
  const local = -1 * play;
  await era.printAndWait(`（善恶值减少了：${local}）`);
  karma(arg, local);
}

/**
 * @SELF_BITCH（:560-670）：自慰。
 *
 * 妄想对象分档（レズ/兽/主人/梦中/克制），PLAY 次数由 FI_CULC_BITCH 算。
 *
 * @param {number} arg 角色 ID
 * @param {string} place "DUNGEON" | "TOWN"
 * @param {(n: number) => number} [rand] RAND 随机源
 */
async function self_bitch(arg, place, rand = default_rand) {
  // PLAY（自慰次数）
  const play = fi_culc_bitch(arg, 'PLAY', 'SELF', rand);
  let local = 0;

  await era.printAndWait(`${name_of(arg)}无法压抑性欲，自慰了起来`);

  // 妄想对象分档（调教后自慰的妄想对象）
  // レズ（无爱慕且百合气质 > RAND:5）
  // 分档的文本与 :634 的追加、:637 的收行同属一行（:571..:637 之间只有
  // PRINTDATA 块，不是 PRINT 行）——:571/:575 的字面量留在输出语句里，
  // PRINTDATA 的随机词条提到语句外当取值，RAND 抽数在条件与语句内惰性消费（#624）
  let branch = 0;
  let dream = '';
  if (!era.get(`talent:${arg}:85`) && era.get(`abl:${arg}:22`) > rand(5)) {
    branch = 1;
    local = 1;
  } else if (
    // 兽（无爱慕、有野狗道具、兽奸中毒 > RAND:5）
    era.get('item:22') &&
    !era.get(`talent:${arg}:85`) &&
    era.get(`abl:${arg}:39`) > rand(5)
  ) {
    branch = 2;
    local = 2;
  } else if (
    // ダンジョン限定で主人（调教次数依赖：20 回 50%、40 回必中）
    place === 'DUNGEON' &&
    rand(40) < (era.get(`cflag:${arg}:10`) || 0)
  ) {
    const dreams = [
      `想起${name_of(0)}的事`, // %CALLNAME:MASTER% —— 魔王名
      `一次次呼唤着${name_of(0)}的名字`,
      '想起了上次的调教',
      '想象着下一次的调教',
    ];
    dream = dreams[rand(dreams.length)]; // PRINTDATA
    local = 3;
  } else if (
    // 梦中（自慰中毒依赖，5 以上必中）
    rand(5) < (era.get(`abl:${arg}:31`) || 0)
  ) {
    const dreams = [
      '如饥似渴，一副十分想要的样子',
      '无法满足的欲望，心情变得十分急躁',
      '不自觉地张开着嘴巴',
      '根本不在意口水滴落下来的样子',
      '根本不在意口水流下来的样子',
      '一脸恍惚的样子',
      '一脸沉浸在欲望中的快乐表情',
      '红晕慢慢爬上了脸颊',
      '欲望高涨，身体如同火烧一般',
      '呆滞的眼神',
      '充满情欲的眼睛，变得水汪汪的',
      '突然将双腿张开',
      '身体一颤一颤的',
      '将股间张得大大的',
      '不知不觉的扭动着腰肢',
      '欲求不满的摇动着腰肢',
      '腰部下流的扭动着',
      '仰起喉咙',
      '时不时从嘴边发出呻吟',
      '爱液浸湿了床具',
      '涂满了溢出来的爱液',
      '十分粗野的撕扯着衣服，双乳若隐若现',
      '挣扎在绝顶的边缘',
    ];
    dream = dreams[rand(dreams.length)]; // PRINTDATA
    local = 4;
  } else {
    // 控えめに（克制）
    const dreams = [
      '努力地忍住声音',
      '拼命地将气息憋住',
      '注意着周围的动静',
      '想着要停下来也...',
      '用踌躇的动作',
      '迷惑地将手指重合了起来',
      '牢牢地将嘴唇重合起来',
      '懒洋洋地低下了头',
      '烦恼地皱了皱眉头',
    ];
    dream = dreams[rand(dreams.length)]; // PRINTDATA
    local = 5;
  }

  // 原作是一整行：分档文本（:571/:575 或上面的 PRINTDATA 词条）
  // + :634 的扶她/男人追加 + :637 的 PRINTFORMW 收行（#624）
  const has_cock =
    era.get(`talent:${arg}:121`) === 1 ||
    era.get(`talent:${arg}:122`) === 1 ||
    era.get(`talent:${arg}:326`) === 1;
  await era.printAndWait(
    (branch === 1
      ? '想象着跟女人的交合'
      : branch === 2
        ? '陷入了跟野兽交尾的幻想'
        : dream) +
      (has_cock ? '握住肉棒捋了起来' : '') +
      `自慰了${play}次。`,
  );

  // 日志
  await log_bitch_self(arg, place, local); // CALL LOG_BITCH_SELF(ARG, PLACE, LOCAL)
  await era.waitAnyKey(); // WAIT

  // 自慰经验
  await era.print(`${expname(10)}＋${play}`);
  chara(arg).dungeon.自慰经验 += play;

  // 珠（点数）经验
  if (era.get(`talent:${arg}:121`) || era.get(`talent:${arg}:122`)) {
    await era.print(`阴茎点数＋${play * 500}`);
  } else {
    await era.print(`${palamname(0)}点数＋${play * 500}`);
  }
  await era.print(`${palamname(4)}点数＋${play * 100}`);
  await era.printAndWait(`${palamname(5)}点数＋${play * 250}`);
  era.add(`juel:${arg}:0`, play * 500);
  era.add(`juel:${arg}:4`, play * 100);
  era.add(`juel:${arg}:5`, play * 250);

  // 经验（场所分档）
  if (place === 'DUNGEON') {
    chara(arg).dungeon.战斗经验 += play;
    chara(0).dungeon.战斗经验 += play; // EXP:0:80 += PLAY
    // PRINTFORMW %SAVESTR:ARG%的淫荡行为成为了魔王和奴隶们的力量…
    await era.printAndWait(
      `${name_of(arg)}的淫荡行为成为了魔王和奴隶们的力量（经验值＋${play}）`,
    );
  } else {
    chara(arg).dungeon.战斗经验 += play;
    await era.printAndWait(`${name_of(arg)}获得了${play}点经验值。`);
  }
}

/**
 * @FI_TRY_BITCH（:673-723）：卖春玩法抽选函数（#FUNCTION，返回玩法号）。
 *
 * 返回值：0=失败, 1=HAND, 2=ORAL, 3=LES, 4=ANAL, 5=SEX, 6=ANIMAL。
 * 按场所（TOWN 7 种 / DUNGEON 6 种无 SELF）累计概率权重，再按随机数落点。
 *
 * @param {number} arg 角色 ID
 * @param {string} place "DUNGEON" | "TOWN"
 * @param {(n: number) => number} [rand] RAND 随机源
 * @returns {number} 玩法号（0=失败）
 */
function fi_try_bitch(arg, place, rand = default_rand) {
  // 局部变量
  let lcount = 0;
  const play = [0, 0, 0, 0, 0, 0, 0]; // PLAY,7

  if (place === 'TOWN') {
    // 街中：7 种玩法（含 SELF=7）
    for (lcount = 1; lcount < 7; lcount += 1) {
      const locals = fs_bitch('PLAY', lcount);
      play[lcount] = fi_culc_bitch(arg, 'KAKURITU', locals, rand);
      // カルマによる抵抗感（高カルマほど効果大）
      play[lcount] += Math.floor(
        fi_culc_bitch(arg, 'RATE', 'KARMA', rand) /
          fi_culc_bitch(arg, 'RATE', locals, rand),
      );
      // 条件不合则置 0
      if (!fi_culc_bitch(arg, 'ABLE', locals, rand)) {
        play[lcount] = 0;
      }
    }
    // カルマで強制失敗（累计权重 + 失败率）
    play[0] =
      play.slice(1).reduce((a, b) => a + b, 0) +
      fi_culc_bitch(arg, 'SIPPAI', 'TOWN', rand);
  } else if (place === 'DUNGEON') {
    // 地下城：6 种玩法（无 SELF）
    for (lcount = 1; lcount < 6; lcount += 1) {
      const locals = fs_bitch('PLAY', lcount);
      play[lcount] = fi_culc_bitch(arg, 'KAKURITU', locals, rand);
      if (!fi_culc_bitch(arg, 'ABLE', locals, rand)) {
        play[lcount] = 0;
      }
    }
    play[0] = play.slice(1).reduce((a, b) => a + b, 0); // SUMARRAY(PLAY)
    // 指示分岐（卖春指示 CFLAG:500 == 1 时失败率分摊）
    if (era.get(`cflag:${arg}:500`) === 1) {
      play[0] += Math.floor(
        fi_culc_bitch(arg, 'SIPPAI', 'DUNGEON', rand) /
          Math.max(1, era.get(`abl:${arg}:10`) || 0),
      );
    } else {
      play[0] += fi_culc_bitch(arg, 'SIPPAI', 'DUNGEON', rand);
    }
  }

  // 权重非正时兜底为 1（保证随机落点不越界）
  if (play[0] <= 0) {
    play[0] = 1;
  }

  // 按随机数落点：LOCAL = RAND:PLAY，逐玩法减权重
  let local = rand(play[0]); // LOCAL = RAND:PLAY
  for (lcount = 1; lcount < 7; lcount += 1) {
    if (local < play[lcount]) {
      return lcount; // RETURNF LCOUNT
    }
    local -= play[lcount];
  }
  return 0; // RETURNF 0
}

/**
 * @FI_CULC_BITCH（:727-1148）：卖春相关判定函数（#FUNCTION）。
 *
 * 按 ARGS 分档（"SIPPAI"/"SEIKOU"/"KYAKU"/"ABLE"/"PLAY"/"KAKURITU"/"RATE"）
 * 返回判定值。ARGS:1 是场所（"TOWN"/"DUNGEON"）或玩法名。
 *
 * @param {number} arg 角色 ID
 * @param {string} args 分档名
 * @param {string} [args1] 场所/玩法名
 * @returns {number} 判定值
 */
function fi_culc_bitch(arg, args, args1 = '', rand = default_rand) {
  let local = 0;

  switch (args) {
    // SIPPAI 卖春基本失败率
    case 'SIPPAI': {
      // 失败率＝250±善恶值（50～450）
      if (args1 === 'TOWN') {
        local = 250 + (era.get(`cflag:${arg}:151`) || 0);
      } else if (args1 === 'DUNGEON') {
        local = 250 + (era.get(`cflag:${arg}:151`) || 0);
      } else {
        throw new Error(`未知的文字${args1}`);
      }
      // 卖春中毒补正
      local = Math.floor(local / (1 + (era.get(`abl:${arg}:37`) || 0)));
      // 淫乱
      if (era.get(`talent:${arg}:76`)) {
        local = Math.floor(local * 0.7);
      }
      // 娼妇与倾城
      if (era.get(`talent:${arg}:181`)) {
        local = Math.floor(local * 0.5);
      } else if (era.get(`talent:${arg}:180`)) {
        local = Math.floor(local * 0.7);
      }
      // 卖春禁止（CFLAG:120 == 0）
      if (era.get(`cflag:${arg}:120`) === 0) {
        local += 999;
      }
      // 不为 0
      local = Math.max(local, 1);
      return local;
    }

    // SEIKOU 卖春基本成功率
    case 'SEIKOU': {
      local = (era.get(`abl:${arg}:37`) || 0) * 5;
      if (era.get(`exp:${arg}:74`)) {
        local += 1;
      }
      if ((era.get(`cflag:${arg}:151`) || 0) < -100) {
        local += 1;
      }
      if (era.get(`talent:${arg}:204`)) {
        local += 100; // 肉便器
      }
      // 淫乱・娼妇・倾城
      local +=
        ((era.get(`talent:${arg}:76`) ? 1 : 0) +
          (era.get(`talent:${arg}:180`) ? 1 : 0) +
          (era.get(`talent:${arg}:181`) ? 1 : 0)) *
        30;

      if (args1 === 'TOWN') {
        // 基本成功率所持金依存（债务越多越容易卖春）
        const money =
          (era.get(`cflag:${arg}:580`) || 0) +
          (era.get(`cflag:${arg}:581`) || 0) +
          (era.get(`cflag:${arg}:582`) || 0);
        if (money < -40000) {
          local += 2000;
        } else if (money < -20000) {
          local += 1000;
        } else if (money < -10000) {
          local += 500;
        } else if (money < -5000) {
          local += 250;
        } else if (money < 0) {
          local += 100;
        } else if (money < 5000) {
          local += 50;
        } else if (money < 10000) {
          local += 20;
        } else {
          local += 5;
        }
      } else if (args1 === 'DUNGEON') {
        if (era.get(`cflag:${arg}:1`) === 2) {
          // 勇者：同样所持金依存
          const money =
            (era.get(`cflag:${arg}:580`) || 0) +
            (era.get(`cflag:${arg}:581`) || 0) +
            (era.get(`cflag:${arg}:582`) || 0);
          if (money < -40000) {
            local += 2000;
          } else if (money < -20000) {
            local += 1000;
          } else if (money < -10000) {
            local += 500;
          } else if (money < -5000) {
            local += 250;
          } else if (money < 0) {
            local += 100;
          } else if (money < 5000) {
            local += 50;
          } else if (money < 10000) {
            local += 20;
          } else {
            local += 5;
          }
        } else {
          // 奴隶
          local += Math.floor(
            1500 /
              (25 -
                (era.get(`abl:${arg}:11`) || 0) -
                (era.get(`abl:${arg}:37`) || 0)),
          );
          // 潜入中（CFLAG:1 == 3 && CFLAG:533 > 1）
          if (
            era.get(`cflag:${arg}:1`) === 3 &&
            (era.get(`cflag:${arg}:533`) || 0) > 1
          ) {
            local = Math.floor(local * 0.75);
          } else if (era.get(`cflag:${arg}:500`) === 1) {
            // 卖春指示を受けた奴隷
            local = Math.floor(
              (local * (10 + (era.get(`abl:${arg}:10`) || 0) * 2)) / 10,
            );
          } else {
            // それ以外
            local = Math.floor(local * 0.75);
          }
        }
      } else {
        throw new Error(`未知的文字${args1}`);
      }

      // 卖春积极性（CFLAG:120 > 0 时 +；否则 1）
      if (era.get(`cflag:${arg}:120`) > 0) {
        local += era.get(`cflag:${arg}:120`) * 100 - 5;
      } else {
        local = 1;
      }

      // 不为 0
      local = Math.max(local, 1);
      return local;
    }

    // KYAKU 客数（判定回数）
    case 'KYAKU': {
      local = rand(6); // LOCAL = RAND:6（0-5 基础）
      // 善恶值补正
      const karma_val = era.get(`cflag:${arg}:151`) || 0;
      if (karma_val > 180) {
        local -= 3;
      } else if (karma_val > 130) {
        local -= 2;
      } else if (karma_val > 80) {
        local -= 1;
      } else if (karma_val > 30) {
        // 无变化
      } else if (karma_val > -20) {
        local += 1;
      } else if (karma_val > -70) {
        local += 2;
      } else if (karma_val > -120) {
        local += 3;
      } else {
        local += 4;
      }

      // 出身补正（TALENT:315）
      const origin = era.get(`talent:${arg}:315`) || 0;
      if (origin === 5) {
        local += 2; // 元娼妇
      } else if (origin === 7) {
        local += 1; // 元物乞い
      } else if (origin === 2 || origin === 8 || origin === 12) {
        local -= 1; // 元修道女/元贵族/元圣女
      }

      // 素质累计
      local += Math.floor(
        ((era.get(`abl:${arg}:15`) || 0) +
          (era.get(`abl:${arg}:17`) || 0) +
          (era.get(`abl:${arg}:37`) || 0)) /
          6,
      );
      local +=
        (era.get(`talent:${arg}:23`) ? 1 : 0) +
        (era.get(`talent:${arg}:28`) ? 1 : 0) +
        (era.get(`talent:${arg}:31`) ? 1 : 0) +
        (era.get(`talent:${arg}:33`) ? 1 : 0);
      local -=
        (era.get(`talent:${arg}:21`) ? 1 : 0) +
        (era.get(`talent:${arg}:22`) ? 1 : 0) +
        (era.get(`talent:${arg}:24`) ? 1 : 0) +
        (era.get(`talent:${arg}:27`) ? 1 : 0) +
        (era.get(`talent:${arg}:30`) ? 1 : 0);
      local +=
        (era.get(`talent:${arg}:91`) ? 1 : 0) +
        (era.get(`talent:${arg}:92`) ? 1 : 0) +
        (era.get(`talent:${arg}:113`) ? 1 : 0);
      local +=
        (era.get(`talent:${arg}:83`) ? 1 : 0) +
        (era.get(`talent:${arg}:87`) ? 1 : 0) +
        (era.get(`talent:${arg}:88`) ? 1 : 0);
      if (era.get(`talent:${arg}:110`)) {
        local += 1;
      }
      if (era.get(`talent:${arg}:114`)) {
        local += 2;
      }
      if (era.get(`talent:${arg}:100`)) {
        if (era.get(`talent:${arg}:10`)) {
          local += 1;
        }
        if (era.get(`talent:${arg}:109`)) {
          local += 1;
        }
        if (era.get(`talent:${arg}:116`)) {
          local += 2;
        }
      }
      if (era.get(`talent:${arg}:99`) && era.get(`talent:${arg}:248`)) {
        local += 1;
      }

      if (args1 === 'TOWN') {
        // 特殊容姿（人间相手マイナス、魔族相手プラス）
        local -=
          (era.get(`talent:${arg}:244`) ? 1 : 0) +
          (era.get(`talent:${arg}:245`) ? 1 : 0) +
          (era.get(`talent:${arg}:246`) ? 1 : 0) +
          (era.get(`talent:${arg}:247`) ? 1 : 0) +
          (era.get(`talent:${arg}:259`) ? 1 : 0) +
          (era.get(`talent:${arg}:260`) ? 1 : 0);
        // 所持金补正
        const money =
          (era.get(`cflag:${arg}:580`) || 0) +
          (era.get(`cflag:${arg}:581`) || 0) +
          (era.get(`cflag:${arg}:582`) || 0);
        if (money < -40000) {
          local += 5;
        } else if (money < -20000) {
          local += 4;
        } else if (money < -10000) {
          local += 3;
        } else if (money < -5000) {
          local += 2;
        } else if (money < 0) {
          local += 1;
        } else if (money < 5000) {
          local -= 1;
        } else if (money < 10000) {
          local -= 2;
        } else {
          local -= 3;
        }
      } else if (args1 === 'DUNGEON') {
        // 特殊容姿（魔族相手プラス）
        local +=
          (era.get(`talent:${arg}:244`) ? 1 : 0) +
          (era.get(`talent:${arg}:245`) ? 1 : 0) +
          (era.get(`talent:${arg}:246`) ? 1 : 0) +
          (era.get(`talent:${arg}:247`) ? 1 : 0) +
          (era.get(`talent:${arg}:259`) ? 1 : 0) +
          (era.get(`talent:${arg}:260`) ? 1 : 0);
        // 指示の有無
        if (era.get(`cflag:${arg}:500`) === 1) {
          local = Math.floor(
            (local * (10 + (era.get(`abl:${arg}:10`) || 0))) / 10,
          );
        } else {
          if (era.get(`talent:${arg}:85`)) {
            local = Math.floor(local * 0.5);
          }
        }
      } else {
        throw new Error(`未知的文字${args1}`);
      }

      // 肉便器补正
      if (era.get(`talent:${arg}:204`)) {
        local = Math.floor(local * 1.5);
      }
      // 可以到 0
      local = Math.max(local, 0);
      return local;
    }

    // ABLE 玩法可不可（返回 0/1）
    case 'ABLE': {
      // 调教对象为空/濒死不可
      if (arg < 0) {
        return 0;
      }
      if (era.get(`base:${arg}:0`) < 500) {
        return 0;
      }

      switch (args1) {
        case 'SELF': // ひとりあそび（无额外条件）
          break;
        case 'HAND': // 手コキコース
          break;
        case 'ORAL': // おフェラコース（接吻未経験则拒绝）
          if (era.get(`cflag:${arg}:16`) === -1) {
            return 0;
          }
          break;
        case 'LES': // レズプレイ（百合气质/快感/欲望/技巧门槛）
          if (
            (era.get(`abl:${arg}:22`) || 0) < 2 ||
            (era.get(`abl:${arg}:0`) || 0) < 3 ||
            (era.get(`abl:${arg}:10`) || 0) < 2 ||
            (era.get(`abl:${arg}:11`) || 0) < 2
          ) {
            return 0;
          }
          if ((era.get(`abl:${arg}:33`) || 0) === 0) {
            return 0; // 百合中毒必要
          }
          break;
        case 'ANAL': // おしりコース
          break;
        case 'SEX': // 本番コース（处女/男人不可，贞操带/封印不可）
          if (
            era.get(`talent:${arg}:0`) ||
            era.get(`talent:${arg}:122`) === 1
          ) {
            return 0;
          }
          if (
            era.get(`cflag:${arg}:42`) === 79 &&
            (era.get(`cflag:${arg}:40`) || 0) & 64
          ) {
            return 0; // 贞操带
          }
          if (era.get(`talent:${arg}:273`)) {
            return 0; // 贞操封印
          }
          break;
        case 'ANIMAL': // どうぶつコース（野狗道具/处女/贞操带/封印）
          if ((era.get('item:22') || 0) === 0) {
            return 0; // 野狗道具
          }
          if (
            era.get(`talent:${arg}:0`) ||
            era.get(`talent:${arg}:122`) === 1
          ) {
            return 0;
          }
          if (
            era.get(`cflag:${arg}:42`) === 79 &&
            (era.get(`cflag:${arg}:40`) || 0) & 64
          ) {
            return 0;
          }
          if (era.get(`talent:${arg}:273`)) {
            return 0;
          }
          break;
        default:
          break;
      }
      return 1;
    }

    // PLAY 次数
    case 'PLAY': {
      if (args1 === 'SELF') {
        // SELF 自慰次数（先单独处理——非卖春行为）
        local =
          (era.get(`abl:${arg}:31`) || 0) +
          rand((era.get(`abl:${arg}:11`) || 0) + 1);
        local = Math.floor(local / 3);
        local +=
          (era.get(`talent:${arg}:60`) ? 1 : 0) +
          (era.get(`talent:${arg}:74`) ? 1 : 0) +
          (era.get(`talent:${arg}:272`) ? 1 : 0);
        if (era.get(`talent:${arg}:74`)) {
          local = Math.floor(local * 1.5); // 自慰狂
        }
        if (
          era.get(`talent:${arg}:121`) ||
          era.get(`talent:${arg}:122`) ||
          era.get(`talent:${arg}:326`)
        ) {
          local = Math.floor(local * 1.2); // 扶她/男人/肉芽
        }
        local = Math.max(local, 1);
        return local;
      }

      // 卖春玩法次数
      local = 1 + rand(3); // LOCAL = 1 + RAND:3
      local +=
        (era.get(`talent:${arg}:63`) ? 1 : 0) +
        (era.get(`talent:${arg}:64`) ? 1 : 0);
      local +=
        ((era.get(`talent:${arg}:76`) ? 1 : 0) +
          (era.get(`talent:${arg}:272`) ? 1 : 0)) *
        2;
      local += Math.floor(
        ((era.get(`abl:${arg}:16`) || 0) + (era.get(`abl:${arg}:37`) || 0)) / 3,
      );

      // 场所：娼馆街（FLAG:(CFLAG:501 + 349) == 507）
      if (
        (era.get(`flag:${(era.get(`cflag:${arg}:501`) || 0) + 349}`) || 0) ===
        507
      ) {
        local = Math.floor(local * 1.2);
      }

      switch (args1) {
        case 'HAND': // 手コキ
          local += Math.floor((era.get(`abl:${arg}:32`) || 0) / 3);
          break;
        case 'ORAL': // おフェラ
          local += Math.floor((era.get(`abl:${arg}:32`) || 0) / 2);
          if (era.get(`exp:${arg}:22`)) {
            local += 1;
          }
          if (era.get(`talent:${arg}:52`)) {
            local += 1;
          }
          if (era.get(`talent:${arg}:47`)) {
            local = Math.floor(local * 1.5); // 精爱味觉
          }
          break;
        case 'LES': // びあん
          local += Math.floor(
            ((era.get(`abl:${arg}:0`) || 0) + (era.get(`abl:${arg}:22`) || 0)) /
              3,
          );
          local +=
            (era.get(`talent:${arg}:81`) ? 1 : 0) +
            (era.get(`talent:${arg}:82`) ? 1 : 0);
          local = Math.floor(
            (local * (10 + (era.get(`abl:${arg}:33`) || 0))) / 10,
          );
          break;
        case 'ANAL': // おしり
          local += Math.floor(
            ((era.get(`abl:${arg}:3`) || 0) + (era.get(`abl:${arg}:30`) || 0)) /
              3,
          );
          if (era.get(`talent:${arg}:77`)) {
            local = Math.floor(local * 1.5); // 尻穴狂
          }
          break;
        case 'SEX': // 本番
          local += Math.floor(
            ((era.get(`abl:${arg}:2`) || 0) + (era.get(`abl:${arg}:30`) || 0)) /
              3,
          );
          if (era.get(`talent:${arg}:75`)) {
            local = Math.floor(local * 1.5); // セックス狂
          }
          break;
        case 'ANIMAL': // どうぶつ
          local += Math.floor(
            ((era.get(`abl:${arg}:30`) || 0) +
              (era.get(`abl:${arg}:39`) || 0)) /
              3,
          );
          local +=
            (era.get(`talent:${arg}:124`) ? 1 : 0) +
            (era.get(`talent:${arg}:317`) === 12 ? 1 : 0);
          if (era.get(`talent:${arg}:136`)) {
            local = Math.floor(local * 1.5); // 牝犬
          }
          break;
        default:
          break;
      }

      // 卖淫经验为零 → 减 5
      if (!era.get(`exp:${arg}:74`)) {
        local -= 5;
      }
      // 不为 0
      local = Math.max(local, 1);
      return local;
    }

    // KAKURITU 抽选概率
    case 'KAKURITU': {
      local = 1 + rand(3); // LOCAL = 1 + RAND:3
      switch (args1) {
        case 'HAND': // 手コキ
          local += (era.get(`abl:${arg}:32`) || 0) + 4;
          if (
            era.get(`talent:${arg}:85`) &&
            !(era.get(`talent:${arg}:180`) || era.get(`talent:${arg}:181`))
          ) {
            local = Math.floor(local * 1.5); // 爱且非娼妇/倾城
          }
          break;
        case 'ORAL': // おフェラ
          local += (era.get(`abl:${arg}:32`) || 0) + 3;
          if (era.get(`talent:${arg}:52`)) {
            local += 3;
          }
          if (era.get(`talent:${arg}:47`)) {
            local = Math.floor(local * 2.0); // 精爱味觉
          }
          break;
        case 'LES': // びあん
          local +=
            (era.get(`abl:${arg}:0`) || 0) + (era.get(`abl:${arg}:22`) || 0);
          local = Math.floor(
            (local * (10 + (era.get(`abl:${arg}:33`) || 0))) / 10,
          );
          break;
        case 'ANAL': // おしり
          local +=
            (era.get(`abl:${arg}:3`) || 0) + (era.get(`abl:${arg}:30`) || 0);
          if (era.get(`talent:${arg}:77`)) {
            local = Math.floor(local * 2.0); // 尻穴狂
          }
          break;
        case 'SEX': // 本番
          local +=
            (era.get(`abl:${arg}:2`) || 0) + (era.get(`abl:${arg}:30`) || 0);
          if (era.get(`talent:${arg}:75`)) {
            local = Math.floor(local * 2.0); // セックス狂
          }
          break;
        case 'ANIMAL': // どうぶつ
          local +=
            (era.get(`abl:${arg}:30`) || 0) + (era.get(`abl:${arg}:39`) || 0);
          if (era.get(`talent:${arg}:136`)) {
            local = Math.floor(local * 2.0); // 牝犬
          }
          break;
        default:
          break;
      }
      // 不为 0
      local = Math.max(local, 1);
      local *= 5;
      return local;
    }

    // RATE 费率（街中卖春使用，越大抵抗感越大）
    case 'RATE': {
      switch (args1) {
        case 'KARMA':
          return 250 + (era.get(`cflag:${arg}:151`) || 0); // 基本料金是善恶值依赖
        case 'HAND':
          return 1;
        case 'ORAL':
        case 'LES':
          return 2;
        case 'ANAL':
          return 3;
        case 'SEX':
          return 4;
        case 'ANIMAL':
          return 11;
        default:
          return 0;
      }
    }

    default:
      return 0;
  }
}

/**
 * @SHOW_BUTTON_BICH_LEVEL（:1150-1170）：角色能力显示中的卖春积极性按钮。
 *
 * 显示 `[NUM] 卖春积极性 - 没有/普通/N等级`。原作此按钮在 CHARA_INFO
 * ver1.0.1.ERB:882 被注释（卖春积极性改走 PTJ_BUTTON），本函数保留供
 * MOD/PartTimeJob/PTJ.ERB 使用。
 *
 * @param {number} num 按钮数值
 * @param {number} arg 角色 ID
 */
function show_button_bich_level(num, arg) {
  // 原作是一整行：无后缀 PRINTFORM/PRINT 连续
  // 不换行，档位文案由 IF/ELSEIF/ELSE 三档拼进来。末段 :1167 的 `PRINT  `
  // 关键字后只有空白，参数为空（不输出字符），因此只进锚、不加文本（#600）
  const level = bich_level_text(arg); // 三档
  era.print(`[${num}] 卖春积极性 - ${level}`);
  return 0;
}

/**
 * 卖春积极性按钮的档位文案（SHOW_BUTTON_BICH_LEVEL 的 :1160-1164 段）。
 * #542 起另一处在 ere/page/page-chara-info.js——PTJ_BUTTON 的默认态分支
 * （打工 MOD 判不移植，PTJ.ERB:5 的 ELSE 就是本按钮）按本页通例升级成
 * printButton，按钮正文共用这份档位文案。
 * @param {number} arg 角色 ID
 * @returns {string}
 */
function bich_level_text(arg) {
  const level = era.get(`cflag:${arg}:120`) || 0;
  if (level === 0) {
    return '没有';
  }
  if (level === 1) {
    return '普通';
  }
  return `${level}等级`;
}

/**
 * @SET_BICH_LEVEL（:1172-1196）：设置卖春积极性。
 *
 * 原作经 INPUT 读键（[0]-[5]），输入无效（< 0 或 > 5）直接返回。
 *
 * @param {number} arg 角色 ID
 */
async function set_bich_level(arg) {
  era.print('请设定等级');
  era.print('[0] [1] [2] [3] [4] [5]');
  const result = await era.input(); // INPUT

  if (result < 0) {
    return 0;
  }
  if (result > 5) {
    return 0;
  }

  chara(arg).patch.卖春积极性 = result;

  if (result === 0) {
    await era.printAndWait('卖春积极性变成没有了');
  } else if (result === 1) {
    await era.printAndWait('卖春积极性变成普通了');
  } else {
    await era.printAndWait(`卖春积极性变为等级${result}了`);
  }

  return 0;
}

module.exports = {
  dungeon_bitch,
  heroine_bitch,
  sell_bitch,
  exp_bitch,
  profit_bitch,
  dungeon_work,
  dungeon_animal,
  self_bitch,
  fi_try_bitch,
  fi_culc_bitch,
  show_button_bich_level,
  bich_level_text,
  set_bich_level,
};
