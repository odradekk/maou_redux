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
 * 源: target/ERB/迷宮/DUNGEON_BITCH.ERB  @DUNGEON_BITCH（:3-50）@HEROINE_BITCH
 *     （:53-82）@SELL_BITCH（:97-329）@EXP_BITCH（:334-417）@PROFIT_BITCH
 *     （:420-495）@DUNGEON_WORK（:497-516）@DUNGEON_ANIMAL（:519-558）
 *     @SELF_BITCH（:560-670）@FI_TRY_BITCH（:673-723）@FI_CULC_BITCH
 *     （:727-1148）@SHOW_BUTTON_BICH_LEVEL（:1150-1170）@SET_BICH_LEVEL
 *     （:1172-1196）
 *
 * == 本文件存根化的原作调用名（docs/stub-registry.md 必须收录每一个） ==
 *
 *   - LOG_TRY_BITCH / LOG_AFTER_BITCH / LOG_BITCH_ANIMAL / LOG_BITCH_SELF /
 *     FS_BITCH / FS_LOG_BITCH —— 均在 DUNGEON_BITCH_LOG.ERB（H16 #185，
 *     被本票阻塞）。卖春主流程的日志/文本函数暂以占位行替代，随 H16。
 *   - KARMA —— CHAR_ST.ERB:71（善恶值增减，阶段 5，见 #169 跨目录依赖表）。
 *   - 强制肉偿 —— 魔改新增/强制肉偿.ERB（债务过高强制卖春；调用 EXP_BITCH，
 *     随强制肉偿票）。
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
 * 口上正文经 tools/lang-normalize.js 离线归一为简体（issue #60，对 1:1 的
 * 有意偏离——源文件汉化本身繁简混用）。保真锁（test/kojo-text-fidelity
 * .test.js 锁 D）对 ERB 侧应用同一张表归一后比对。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { chara_callname } = require('#/utils/callname-utils');
const { chara } = require('#/facade/chara');
const { stub_line } = require('#/utils/stub-line');
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

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。
 */
const STUBBED_CALLS = ['KARMA', '强制肉偿'];

/** 默认随机源（[0, n) 整数）；测试注入定值序 */
const default_rand = (n) => Math.floor(Math.random() * n);

/** 角色的显示名（%SAVESTR:ARG% 的等价物） */
const name_of = (cid) => chara_callname(cid);

/**
 * 原作 @KARMA（CHAR_ST.ERB:71）的存根：善恶值增减（阶段 5）。
 * @param {number} cid 角色 ID
 * @param {number} delta 增减量
 */
function karma(cid, delta) {
  stub_line('KARMA', `善恶值增减 ${delta}`);
}

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

  // :10-11 体力/气力门槛（调教对象空/濒死早退）
  if (era.get(`base:${arg}:0`) < 300 || era.get(`base:${arg}:1`) < 100) {
    return 0; // :11
  }

  // :12-13 成败判定（SEIKOU 成功值 / SIPPAI 失败值）
  const seikou = fi_culc_bitch(arg, 'SEIKOU', 'DUNGEON', rand);
  const sippai = fi_culc_bitch(arg, 'SIPPAI', 'DUNGEON', rand);

  // :16-23 勇者用（CFLAG:1 == 2）：卖淫经验必须非零、且成功率 > 100
  if (era.get(`cflag:${arg}:1`) === 2) {
    if (!era.get(`exp:${arg}:74`)) {
      return 0; // :20-21
    }
    if (seikou <= 100) {
      return 0; // :22
    }
  }

  // :25-31 卖春处理（CFLAG:120 卖春积极性 > 0 时进入）
  if (era.get(`cflag:${arg}:120`)) {
    // :27 成败判定：RAND:(SEIKOU + SIPPAI) < SEIKOU
    if (rand_n(seikou + sippai) < seikou) {
      await log_try_bitch(arg, 'DUNGEON'); // :28 CALL LOG_TRY_BITCH(ARG, "DUNGEON")
      await sell_bitch(arg, 'DUNGEON', rand); // :29 CALL SELL_BITCH
    }
  }

  // :33-37 兽（RAND(1,16) < ABL:39 且 ABLE）
  if (1 + rand_n(16 - 1) < era.get(`abl:${arg}:39`)) {
    if (fi_culc_bitch(arg, 'ABLE', 'ANIMAL', rand)) {
      await dungeon_animal(arg, rand); // :36 CALL DUNGEON_ANIMAL
    }
  }

  // :39-43 自慰（RAND:36 <= ABL:11 + ABL:31 + TALENT:60*10 且 ABLE）
  if (
    rand_n(36) <=
    era.get(`abl:${arg}:11`) +
      era.get(`abl:${arg}:31`) +
      era.get(`talent:${arg}:60`) * 10
  ) {
    if (fi_culc_bitch(arg, 'ABLE', 'SELF', rand)) {
      await self_bitch(arg, 'DUNGEON', rand); // :42 CALL SELF_BITCH
    }
  }

  // :45-47 内职（CFLAG:500 == 0 && CFLAG:1 == 3 潜入中）
  if (era.get(`cflag:${arg}:500`) === 0 && era.get(`cflag:${arg}:1`) === 3) {
    await dungeon_work(arg); // :47 CALL DUNGEON_WORK
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

  // :59-61 体力/气力门槛
  if (era.get(`base:${arg}:0`) < 300 || era.get(`base:${arg}:1`) < 100) {
    return 0; // :61
  }

  // :62-63 成败判定
  const seikou = fi_culc_bitch(arg, 'SEIKOU', 'TOWN', rand);
  const sippai = fi_culc_bitch(arg, 'SIPPAI', 'TOWN', rand);

  // :66-72 卖春处理（CFLAG:120 > 0 且 SEIKOU > 100 且成败判定）
  if (era.get(`cflag:${arg}:120`)) {
    if (seikou > 100 && rand_n(seikou + sippai) < seikou) {
      await log_try_bitch(arg, 'TOWN'); // :70 CALL LOG_TRY_BITCH(ARG, "TOWN")
      await sell_bitch(arg, 'TOWN', rand); // :71 CALL SELL_BITCH
    }
  }

  // :75-77 债务过高 1/3 机率触发强制卖春（限非处女）
  if (
    era.get(`cflag:${arg}:582`) < -10000 &&
    !era.get(`talent:${arg}:0`) &&
    !rand_n(3)
  ) {
    stub_line('强制肉偿', '债务过高强制卖春'); // :77 CALL 强制肉偿
  }

  // :78-81 自慰（RAND:36 <= ... 且 ABLE）
  if (
    rand_n(36) <=
    era.get(`abl:${arg}:11`) +
      era.get(`abl:${arg}:31`) +
      era.get(`talent:${arg}:60`) * 10
  ) {
    if (fi_culc_bitch(arg, 'ABLE', 'SELF', rand)) {
      await self_bitch(arg, 'TOWN', rand); // :81 CALL SELF_BITCH
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

  // :113 客数（判定回数）
  kyaku = fi_culc_bitch(arg, 'KYAKU', place, rand);

  // :115 客がいる（客というか判定回数）
  if (kyaku) {
    // :116-119 VARSET PLAY/MAN/GIRL/CHECK（数组已初始化为 0）

    // :122-128 卖春前快照：EXP/JUEL（ARRAYCOPY 不可用于角色变量，逐格拷贝）
    for (lcount = 0; lcount < 100; lcount += 1) {
      prev_exp[lcount] = era.get(`exp:${arg}:${lcount}`) || 0; // :124
    }
    for (lcount = 0; lcount < 20; lcount += 1) {
      prev_juel[lcount] = era.get(`juel:${arg}:${lcount}`) || 0; // :127
    }
    prev_karma = era.get(`cflag:${arg}:151`) || 0; // :129

    // :131-141 场所/身份的金钱快照：DUNGEON 中侵攻勇者（CFLAG:1 == 2）
    // 的所持金走 CFLAG:580；否则走全局 MONEY
    if (place === 'DUNGEON') {
      check |= 1; // :132 SETBIT CHECK, 0
      if (era.get(`cflag:${arg}:1`) === 2) {
        prev_money = era.get(`cflag:${arg}:580`) || 0; // :135
      } else {
        prev_money = era_flag.money; // :137
      }
    } else {
      prev_money = era.get(`cflag:${arg}:580`) || 0; // :140
    }

    // :143-188 客循环（每次循环内 KARMA 不下调——注释：下调会让判定越来越松）
    for (lcount = 0; lcount < kyaku; lcount += 1) {
      // :145-146 成败重算（勇者侧资金变化影响基本成功率）
      seikou = fi_culc_bitch(arg, 'SEIKOU', place, rand);
      sippai = fi_culc_bitch(arg, 'SIPPAI', place, rand);

      // :148-150 失败则本客跳过
      if (rand_n(seikou + sippai) >= seikou) {
        continue; // :149 CONTINUE
      }

      // :151-152 玩法抽选（0=失败, 1=HAND, 2=ORAL, 3=LES, 4=ANAL, 5=SEX, 6=ANIMAL）
      local = fi_try_bitch(arg, place, rand);

      // :156-157 玩法抽选失败则跳过
      if (!local) {
        continue; // :157
      }

      // :158-159 玩法内容字符串化（%FS_BITCH("PLAY", LOCAL)%）
      locals = fs_bitch('PLAY', local);

      // :161-163 该玩法不可用则跳过
      if (!fi_culc_bitch(arg, 'ABLE', locals, rand)) {
        continue; // :163
      }

      // :165-169 本次玩法次数与累计
      play[local] = fi_culc_bitch(arg, 'PLAY', locals, rand); // :167
      check |= 1 << local; // :169 SETBIT CHECK, LOCAL

      // :170-186 收益（返回客种类与客号）+ 经验
      const [customer, customer_no] = profit_bitch(
        arg,
        place,
        locals,
        play[local],
        rand,
      ); // :172
      if (customer === 1) {
        // :175-178 男性客
        man[customer_no] += 1; // :177 MAN:MAN ++
        check |= 1 << (10 + customer_no); // :178 SETBIT CHECK, (10 + MAN)
      } else if (customer === 2) {
        // :180-183 女性客
        girl[customer_no] += 1; // :182 GIRL:GIRL ++
        check |= 1 << (20 + customer_no); // :183 SETBIT CHECK, (20 + GIRL)
      }

      exp_bitch(arg, place, locals, play[local]); // :186
    }

    // :190-192 合计玩法次数
    play[0] = play.slice(1).reduce((a, b) => a + b, 0); // :192 SUMARRAY(PLAY)

    // :194-317 卖春成功的显示与结算
    if (play[0] > 0) {
      // :197-201 客数与玩法次数合计
      man[0] = man.slice(1).reduce((a, b) => a + b, 0); // :199 SUMARRAY(MAN)
      girl[0] = girl.slice(1).reduce((a, b) => a + b, 0); // :201 SUMARRAY(GIRL)

      // :203-244 客与玩法的显示（场所分档）
      if (place === 'DUNGEON') {
        era.print(`${name_of(arg)}`); // :205
        locals = ''; // :206 VARSET LOCALS
        if (man[0]) {
          // :208 男性客合计显示（FS_LOG_BITCH）
          locals = fs_log_bitch(
            'DUNGEON_MAN',
            man[1],
            man[2],
            man[3],
            man[4],
            man[5],
          );
        }
        if (girl[0]) {
          if (man[0]) {
            await era.print(`${locals}、`); // :212
            era.print('于是'); // :213
          }
          locals = fs_log_bitch(
            'DUNGEON_GIRL',
            girl[1],
            girl[2],
            girl[3],
            girl[4],
            girl[5],
          ); // :215
        }
        await era.print(`以${locals}为对手`); // :217

        locals = fs_log_bitch(
          'PLAYNAME',
          play[1],
          play[2],
          play[3],
          play[4],
          play[5],
        ); // :219
        await era.printAndWait(`${locals}进行着`); // :220
      } else {
        // :222-244 街中
        era.print(`${name_of(arg)}`); // :223
        locals = ''; // :224
        if (play[0] === play[6]) {
          await era.printAndWait(`进行了${play[6]}次兽交秀。`); // :226
        } else {
          if (man[0]) {
            locals = fs_log_bitch(
              'TOWN_MAN',
              man[1],
              man[2],
              man[3],
              man[4],
              man[5],
            ); // :229
          }
          if (girl[0]) {
            if (man[0]) {
              await era.print(`${locals}、`); // :232
              era.print('于是'); // :233
            }
            locals = fs_log_bitch(
              'TOWN_GIRL',
              girl[1],
              girl[2],
              girl[3],
              girl[4],
              girl[5],
            ); // :235
          }
          await era.print(`以${locals}为对手`); // :237

          locals = fs_log_bitch(
            'PLAYNAME',
            play[1],
            play[2],
            play[3],
            play[4],
            play[5],
          ); // :239
          await era.printAndWait(`${locals}进行着`); // :240
          if (play[6]) {
            await era.printAndWait(`并且进行了${play[6]}次兽奸表演`); // :242
          }
        }
      }

      // :246-248 善恶值减少（-1 * PLAY）
      local = -1 * play[0];
      karma(arg, local); // :248 CALL KARMA

      // :250 卖春日志（LOG_AFTER_BITCH 消费 CHECK）
      await log_after_bitch(arg, check, rand); // :250 CALL LOG_AFTER_BITCH(ARG, CHECK)

      // :252-262 经验与点数变化显示（与快照比对）
      await era.print('～经验与点数变化～'); // :252
      for (lcount = 0; lcount < 100; lcount += 1) {
        const now_exp = era.get(`exp:${arg}:${lcount}`) || 0;
        if (prev_exp[lcount] === now_exp) {
          continue; // :254
        }
        await era.print(
          `${expname(lcount, 16)}：${prev_exp[lcount]}→${now_exp}`,
        ); // :256
      }
      for (lcount = 0; lcount < 20; lcount += 1) {
        const now_juel = era.get(`juel:${arg}:${lcount}`) || 0;
        if (prev_juel[lcount] === now_juel) {
          continue; // :259
        }
        await era.print(
          `${palamname(lcount, 12)}点数：${prev_juel[lcount]}→${now_juel}`,
        ); // :261
      }
      await era.waitAnyKey(); // :263 WAIT

      // :264-299 经验/金钱入账（场所分档）
      if (place === 'DUNGEON') {
        // :266-267 经验（魔王 0 与奴隶都加）
        chara(0).dungeon.战斗经验 += play[0]; // :266 EXP:0:80 += PLAY
        chara(arg).dungeon.战斗经验 += play[0]; // :267
        await era.printAndWait(
          `${name_of(arg)}淫荡行为成为了魔王和奴隶们的力量（经验值＋${play[0]}）`,
        ); // :268

        if (era.get(`cflag:${arg}:1`) === 2) {
          // :270-272 侵攻中的勇者：所持金变化
          local = (era.get(`cflag:${arg}:580`) || 0) - prev_money;
          await era.printAndWait(`${name_of(arg)}获得了${local}数量的金币`); // :272
        } else {
          // :274-293 奴隶：收入按好感度分成上交
          local = era_flag.money - prev_money;
          if (era.get(`cflag:${arg}:2`) >= 5000) {
            local = Math.floor((local / 10) * 9); // :277 LOCAL/10*9
            await era.printAndWait(
              `基于对魔王的爱意，${name_of(arg)}将卖得收入的九成都上交了。献上了${local}点资金。`,
            ); // :278
          } else if (era.get(`cflag:${arg}:2`) >= 3000) {
            local = Math.floor((local / 10) * 9); // :280 LOCAL/10*9
            await era.printAndWait(
              `基于对魔王的感情，${name_of(arg)}将卖得收入的七成都上交了。献上了${local}点资金。`,
            ); // :281
          } else {
            if (local % 2) {
              local = Math.floor(local / 3); // :284 LOCAL /= 2 + 1（复合赋值右侧整体求值 = LOCAL / 3）
              await era.printAndWait(
                `${name_of(arg)}将卖得收入的一半上交了。献上了${local}点资金。`,
              ); // :285
            } else {
              local = Math.floor(local / 2); // :287 LOCAL /= 2
              await era.printAndWait(
                `${name_of(arg)}将卖得收入的一半上交了。献上了${local}点资金。`,
              ); // :288
            }
          }
          era_flag.money -= local; // :291 MONEY -= LOCAL
          era_exflag.legit_money -= local; // :292 EX_FLAG:4444 -= LOCAL
          chara(arg).dungeon.所持金 += local; // :293 CFLAG:ARG:580 += LOCAL
        }
      } else {
        // :295-298 街中：所持金变化即经验
        local = (era.get(`cflag:${arg}:580`) || 0) - prev_money;
        chara(arg).dungeon.战斗经验 += local; // :297 EXP:ARG:80 += LOCAL
        await era.printAndWait(
          `获得了${name_of(arg)}${local}点的金钱以及经验值。`,
        ); // :298
      }

      // :300-303 善恶值减少显示
      local = prev_karma - (era.get(`cflag:${arg}:151`) || 0);
      if (local) {
        await era.printAndWait(`然后，善恶值减少了${Math.abs(local)}。`); // :303
      }
    } else {
      // :305-316 一次也没成功
      await fail_message(arg, kyaku, true, false); // :306-316
    }
  } else {
    // :318-328 客没来
    await fail_message(arg, kyaku, false, true); // :319-328
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
    ); // :308/:321
  } else if (era.get(`cflag:${arg}:151`) > 50) {
    await era.printAndWait('在下不定决心而烦恼的时候，时间不断地流失掉了...'); // :310/:323
  } else if (era.get(`cflag:${arg}:151`) > 0) {
    await era.printAndWait(
      '然而，根本没有勇气发出声音，说自己在卖春的这种事情。',
    ); // :312/:325
  } else if (has_kyaku) {
    era.print(`${kyaku}人群的声音嘈杂着、`); // :314
    await era.printAndWait(
      `交涉终了，一个人也没有买下${name_of(arg)}，就这样子离开了`,
    ); // :315
  } else if (no_kyaku) {
    await era.printAndWait('于是、一个对象也没有找到'); // :327
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
    // :341-352 HAND 手淫奉侍
    case 'HAND':
      chara(arg).dungeon.精液经验 += play; // :342 EXP:ARG:20 += PLAY（精液经验）
      chara(arg).dungeon.卖淫经验 += play; // :343 卖淫经验
      if (place === 'DUNGEON') {
        era.add(`juel:${arg}:7`, play * 5); // :345
      } else {
        era.add(`juel:${arg}:7`, play); // :347
      }
      if (era.get(`talent:${arg}:62`)) {
        era.add(`juel:${arg}:9`, play); // :350
      }
      if (era.get(`talent:${arg}:47`)) {
        era.add(`juel:${arg}:5`, play * 5); // :352
      }
      break;

    // :353-367 ORAL 口交奉侍
    case 'ORAL':
      chara(arg).dungeon.口交经验 += play; // :354 口交经验
      chara(arg).dungeon.精液经验 += play; // :355 精液经验
      chara(arg).dungeon.卖淫经验 += play; // :356 卖淫经验
      if (place === 'DUNGEON') {
        era.add(`juel:${arg}:7`, play * 10); // :358
      } else {
        era.add(`juel:${arg}:7`, play); // :360
      }
      if (era.get(`talent:${arg}:62`)) {
        era.add(`juel:${arg}:9`, play); // :363
      }
      if (era.get(`talent:${arg}:47`)) {
        chara(arg).dungeon.精饮绝顶经验 += play; // :365 EXP:8 += PLAY（精饮绝顶经验）
        era.add(`juel:${arg}:5`, play * 10); // :366
      }
      break;

    // :368-379 LES 百合奉侍
    case 'LES':
      chara(arg).train.百合经验 += play; // :369 百合经验
      chara(arg).dungeon.卖淫经验 += play; // :370 卖淫经验
      if (place === 'DUNGEON') {
        chara(arg).dungeon.绝顶经验 += Math.floor(
          (play * (1 + (era.get(`abl:${arg}:10`) || 0))) / 5,
        ); // :372
        era.add(
          `juel:${arg}:0`,
          play * 100 * (1 + (era.get(`abl:${arg}:10`) || 0)),
        ); // :373
        era.add(`juel:${arg}:5`, play * 200); // :374
      } else {
        chara(arg).dungeon.绝顶经验 += Math.floor(
          (play * (1 + (era.get(`abl:${arg}:10`) || 0))) / 10,
        ); // :376
        era.add(`juel:${arg}:0`, play * 10 * (era.get(`abl:${arg}:10`) || 0)); // :377
        era.add(`juel:${arg}:5`, play * 15); // :378
      }
      break;

    // :380-390 ANAL 肛交奉侍
    case 'ANAL':
      chara(arg).dungeon.肛门经验 += play; // :381 肛门经验
      chara(arg).dungeon.性交经验 += play; // :382 性交经验
      chara(arg).dungeon.卖淫经验 += play; // :383 卖淫经验
      if (place === 'DUNGEON') {
        era.add(`juel:${arg}:2`, play * 200); // :385
        era.add(`juel:${arg}:5`, play * 250); // :386
      } else {
        era.add(`juel:${arg}:2`, play * 10); // :388
        era.add(`juel:${arg}:5`, play * 15); // :389
      }
      break;

    // :391-401 SEX 性交奉侍
    case 'SEX':
      chara(arg).dungeon.私处经验 += play; // :392 私处经验
      chara(arg).dungeon.性交经验 += play; // :393 性交经验
      chara(arg).dungeon.卖淫经验 += play; // :394 卖淫经验
      if (place === 'DUNGEON') {
        era.add(`juel:${arg}:1`, play * 200); // :396
        era.add(`juel:${arg}:5`, play * 250); // :397
      } else {
        era.add(`juel:${arg}:1`, play * 10); // :399
        era.add(`juel:${arg}:5`, play * 15); // :400
      }
      break;

    // :402-412 ANIMAL 兽交奉侍（场所差异在原作注释中说明无差异）
    case 'ANIMAL':
      chara(arg).dungeon.兽奸经验 += play; // :403 EXP:56 += PLAY（兽奸经验）
      chara(arg).dungeon.私处经验 += play; // :404 EXP:0 += PLAY
      chara(arg).dungeon.性交经验 += play; // :405 EXP:5 += PLAY
      era.add(`juel:1`, play * 200); // :406 JUEL:1 += PLAY * 200
      era.add(`juel:6`, play * 300); // :407 JUEL:6 += PLAY * 300
      era.add(`juel:8`, play * 200); // :408 JUEL:8 += PLAY * 200
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
  // :426-428 局部变量
  let pay = 0;
  let girl = 0;
  let man = 0;

  // :429-440 基本料金（场所/身份/费率）
  if (place === 'DUNGEON') {
    if (era.get(`cflag:${arg}:1`) === 2) {
      // :433 勇者：费率 + 侵攻阶层
      pay = Math.floor(
        ((fi_culc_bitch(arg, 'RATE', type) +
          (era.get(`cflag:${arg}:501`) || 0)) *
          fi_culc_bitch(arg, 'RATE', 'KARMA')) /
          5,
      );
    } else {
      // :436 奴隶
      pay =
        5 *
        (1 +
          (era.get(`cflag:${arg}:501`) || 0) +
          fi_culc_bitch(arg, 'RATE', type));
    }
  } else {
    // :439 街中
    pay = Math.floor(
      (fi_culc_bitch(arg, 'RATE', 'KARMA') * fi_culc_bitch(arg, 'RATE', type)) /
        5,
    );
  }

  // :442-462 客种类抽选（ANIMAL 无客 / LES 女性客 / 其余男性客）
  switch (type) {
    case 'ANIMAL':
      break; // :444-445
    case 'LES':
      girl = 1 + rand(6 - 1); // :447 GIRL = RAND(1, 6)
      switch (girl) {
        case 3:
          pay -= 10; // :449-450
          break;
        case 4:
          pay += 10; // :451-452
          break;
        default:
          break;
      }
      break;
    default:
      man = 1 + rand(6 - 1); // :455 MAN = RAND(1, 6)
      switch (man) {
        case 3:
          pay -= 10; // :457-458
          break;
        case 4:
          pay += 10; // :459-460
          break;
        default:
          break;
      }
      break;
  }

  // :464-465 卖淫经验为零 → 溢价 +10
  if (!era.get(`exp:${arg}:74`)) {
    pay += 10; // :465
  }
  // :467-468 处女 → +5
  if (era.get(`talent:${arg}:0`)) {
    pay += 5; // :468
  }

  // :470 总价 = 单次价 × 次数
  pay = pay * play;

  // :472-483 付款（场所/身份分档）
  if (place === 'DUNGEON') {
    if (era.get(`cflag:${arg}:1`) === 2) {
      chara(arg).dungeon.所持金 += pay; // :476 侵攻勇者所持金
    } else {
      era_flag.money += pay; // :478 MONEY += PAY
      era_exflag.legit_money += pay; // :479 EX_FLAG:4444 += PAY
    }
  } else {
    chara(arg).dungeon.所持金 += pay; // :482 勇者所持金
  }

  // :485-492 返回值（客种类, 客号）
  switch (type) {
    case 'ANIMAL':
      return [0, 0]; // :486-487
    case 'LES':
      return [2, girl]; // :488-489
    default:
      return [1, man]; // :490-491
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
function dungeon_work(arg, rand = default_rand) {
  // :500 收入 = CFLAG:9 * 20 + 100
  let local = (era.get(`cflag:${arg}:9`) || 0) * 20 + 100;
  // :501-502 潜入中（CFLAG:0 == 0）收入 ÷10
  if (era.get(`cflag:${arg}:0`) === 0) {
    local = Math.floor(local / 10);
  }
  // :503-512 调试位（FLAG:5 & 32）显示随机副业名
  if (era.get('flag:5') & 32) {
    era.print(`${name_of(arg)}从事了`); // :504
    // :505-510 PRINTDATA 随机选一
    const jobs = ['研磨宝石的', '制作工艺品的', '抄写书籍的', '制作手工的'];
    era.print(jobs[rand(jobs.length)]); // :505 PRINTDATA
    era.printAndWait(`副业${local}点收入。`); // :511
  }
  // :513-514 收入入账
  era_flag.money += local; // :513 MONEY += LOCAL
  era_exflag.legit_money += local; // :514 EX_FLAG:4444 += LOCAL
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
  // :522 PLAY（兽交次数）
  const play = fi_culc_bitch(arg, 'PLAY', 'ANIMAL', rand);

  // :524-528 描写
  era.print(`${name_of(arg)}无法压抑兽交的欲望`); // :524
  await era.printAndWait('悄悄寻找着兽穴...'); // :525
  // :526 PRINTFORMW %SAVESTR:ARG%进入了野兽的巢穴…
  await era.printAndWait(
    `${name_of(arg)}进入了野兽的巢穴，像母狗一样趴在地上，扭动着身躯引诱着发情的野兽。在野兽舌头的舔舐润滑后，令人兴奋的喘息和呜咽伴随着野兽的咆哮和肉体的撞击声缭绕在兽穴内，${name_of(arg)}比真正的雌兽还要卖力的摇晃着屁股，逢迎着非人的巨大阳具的刺激。`,
  );
  // :527 PRINTFORMW 随后%SAVESTR:ARG%翻身将野兽压倒在地…
  await era.printAndWait(
    `随后${name_of(arg)}翻身将野兽压倒在地，主动跨坐在野兽的阴茎上扭动着自己的身体，同时将自己的乳首送到野兽嘴边享受着口舌的舔舐。粗暴的动作使${name_of(arg)}骑在野兽上陷入了恍惚，口水不由自主的流淌出来，无与伦比的快感让${name_of(arg)}成为了一具供野兽发泄性欲的肉娃娃。`,
  );
  await era.printAndWait(`忘我地与野兽样的魔物交尾了${play}次…`); // :528

  // :530 日志
  await log_bitch_animal(arg, 'DUNGEON'); // :530 CALL LOG_BITCH_ANIMAL(ARG, "DUNGEON", ARG:1)
  await era.waitAnyKey(); // :531 WAIT

  // :534-539 兽奸经验
  await era.print(`${expname(56)}＋${play}`); // :534
  await era.print(`${expname(0)}＋${play}`); // :535
  await era.print(`${expname(5)}＋${play}`); // :536
  chara(arg).dungeon.兽奸经验 += play; // :537
  chara(arg).dungeon.私处经验 += play; // :538
  chara(arg).dungeon.性交经验 += play; // :539

  // :542-547 珠（点数）经验
  await era.print(`${palamname(1)}点数＋${play * 200}`); // :542
  await era.print(`${palamname(6)}点数＋${play * 300}`); // :543
  await era.printAndWait(`${palamname(8)}点数＋${play * 200}`); // :544
  era.add(`juel:${arg}:1`, play * 200); // :545
  era.add(`juel:${arg}:6`, play * 300); // :546
  era.add(`juel:${arg}:8`, play * 200); // :547

  // :549-551 魔王和奴隶们的力量（经验值）
  // :549 PRINTFORMW %SAVESTR:ARG%的淫荡行为成为了魔王和奴隶们的力量…
  await era.printAndWait(
    `${name_of(arg)}的淫荡行为成为了魔王和奴隶们的力量（经验值＋${play}）`,
  );
  chara(0).dungeon.战斗经验 += play; // :550 EXP:0:80 += PLAY
  chara(arg).dungeon.战斗经验 += play; // :551

  // :553-555 善恶值减少
  const local = -1 * play;
  await era.printAndWait(`（善恶值减少了：${local}）`); // :554
  karma(arg, local); // :555
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
  // :564 PLAY（自慰次数）
  const play = fi_culc_bitch(arg, 'PLAY', 'SELF', rand);
  let local = 0;

  await era.printAndWait(`${name_of(arg)}无法压抑性欲，自慰了起来`); // :565

  // :568-630 妄想对象分档（调教后自慰的妄想对象）
  // :569-572 レズ（无爱慕且百合气质 > RAND:5）
  if (!era.get(`talent:${arg}:85`) && era.get(`abl:${arg}:22`) > rand(5)) {
    era.print('想象着跟女人的交合'); // :571
    local = 1; // :572
  } else if (
    // :573-576 兽（无爱慕、有野狗道具、兽奸中毒 > RAND:5）
    era.get('item:22') &&
    !era.get(`talent:${arg}:85`) &&
    era.get(`abl:${arg}:39`) > rand(5)
  ) {
    era.print('陷入了跟野兽交尾的幻想'); // :575
    local = 2; // :576
  } else if (
    // :577-586 ダンジョン限定で主人（调教次数依赖：20 回 50%、40 回必中）
    place === 'DUNGEON' &&
    rand(40) < (era.get(`cflag:${arg}:10`) || 0)
  ) {
    const dreams = [
      `想起${name_of(0)}的事`, // :581 %CALLNAME:MASTER% —— 魔王名
      `一次次呼唤着${name_of(0)}的名字`, // :582
      '想起了上次的调教', // :583
      '想象着下一次的调教', // :584
    ];
    era.print(dreams[rand(dreams.length)]); // :580 PRINTDATA
    local = 3; // :586
  } else if (
    // :587-615 梦中（自慰中毒依赖，5 以上必中）
    rand(5) < (era.get(`abl:${arg}:31`) || 0)
  ) {
    const dreams = [
      '如饥似渴，一副十分想要的样子', // :591
      '无法满足的欲望，心情变得十分急躁', // :592
      '不自觉地张开着嘴巴', // :593
      '根本不在意口水滴落下来的样子', // :594
      '根本不在意口水流下来的样子', // :595
      '一脸恍惚的样子', // :596
      '一脸沉浸在欲望中的快乐表情', // :597
      '红晕慢慢爬上了脸颊', // :598
      '欲望高涨，身体如同火烧一般', // :599
      '呆滞的眼神', // :600
      '充满情欲的眼睛，变得水汪汪的', // :601
      '突然将双腿张开', // :602
      '身体一颤一颤的', // :603
      '将股间张得大大的', // :604
      '不知不觉的扭动着腰肢', // :605
      '欲求不满的摇动着腰肢', // :606
      '腰部下流的扭动着', // :607
      '仰起喉咙', // :608
      '时不时从嘴边发出呻吟', // :609
      '爱液浸湿了床具', // :610
      '涂满了溢出来的爱液', // :611
      '十分粗野的撕扯着衣服，双乳若隐若现', // :612
      '挣扎在绝顶的边缘', // :613
    ];
    era.print(dreams[rand(dreams.length)]); // :590 PRINTDATA
    local = 4; // :615
  } else {
    // :616-629 控えめに（克制）
    const dreams = [
      '努力地忍住声音', // :619
      '拼命地将气息憋住', // :620
      '注意着周围的动静', // :621
      '想着要停下来也...', // :622
      '用踌躇的动作', // :623
      '迷惑地将手指重合了起来', // :624
      '牢牢地将嘴唇重合起来', // :625
      '懒洋洋地低下了头', // :626
      '烦恼地皱了皱眉头', // :627
    ];
    era.print(dreams[rand(dreams.length)]); // :618 PRINTDATA
    local = 5; // :629
  }

  // :632-635 扶她/男人/肉芽：握住肉棒
  if (
    era.get(`talent:${arg}:121`) === 1 ||
    era.get(`talent:${arg}:122`) === 1 ||
    era.get(`talent:${arg}:326`) === 1
  ) {
    era.print('握住肉棒捋了起来'); // :634
  }

  // :637 次数
  await era.printAndWait(`自慰了${play}次。`); // :637

  // :639-641 日志
  await log_bitch_self(arg, place, local); // :640 CALL LOG_BITCH_SELF(ARG, PLACE, LOCAL)
  await era.waitAnyKey(); // :641 WAIT

  // :643-645 自慰经验
  await era.print(`${expname(10)}＋${play}`); // :644
  chara(arg).dungeon.自慰经验 += play; // :645

  // :647-657 珠（点数）经验
  if (era.get(`talent:${arg}:121`) || era.get(`talent:${arg}:122`)) {
    await era.print(`阴茎点数＋${play * 500}`); // :649
  } else {
    await era.print(`${palamname(0)}点数＋${play * 500}`); // :651
  }
  await era.print(`${palamname(4)}点数＋${play * 100}`); // :653
  await era.printAndWait(`${palamname(5)}点数＋${play * 250}`); // :654
  era.add(`juel:${arg}:0`, play * 500); // :655
  era.add(`juel:${arg}:4`, play * 100); // :656
  era.add(`juel:${arg}:5`, play * 250); // :657

  // :659-666 经验（场所分档）
  if (place === 'DUNGEON') {
    chara(arg).dungeon.战斗经验 += play; // :660
    chara(0).dungeon.战斗经验 += play; // :661 EXP:0:80 += PLAY
    // :662 PRINTFORMW %SAVESTR:ARG%的淫荡行为成为了魔王和奴隶们的力量…
    await era.printAndWait(
      `${name_of(arg)}的淫荡行为成为了魔王和奴隶们的力量（经验值＋${play}）`,
    ); // :662
  } else {
    chara(arg).dungeon.战斗经验 += play; // :664
    await era.printAndWait(`${name_of(arg)}获得了${play}点经验值。`); // :665
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
  // :676-677 局部变量
  let lcount = 0;
  const play = [0, 0, 0, 0, 0, 0, 0]; // PLAY,7

  if (place === 'TOWN') {
    // :680-689 街中：7 种玩法（含 SELF=7）
    for (lcount = 1; lcount < 7; lcount += 1) {
      const locals = fs_bitch('PLAY', lcount); // :682
      play[lcount] = fi_culc_bitch(arg, 'KAKURITU', locals, rand); // :683
      // :684-685 カルマによる抵抗感（高カルマほど効果大）
      play[lcount] += Math.floor(
        fi_culc_bitch(arg, 'RATE', 'KARMA', rand) /
          fi_culc_bitch(arg, 'RATE', locals, rand),
      );
      // :687-688 条件不合则置 0
      if (!fi_culc_bitch(arg, 'ABLE', locals, rand)) {
        play[lcount] = 0;
      }
    }
    // :691 カルマで強制失敗（累计权重 + 失败率）
    play[0] =
      play.slice(1).reduce((a, b) => a + b, 0) +
      fi_culc_bitch(arg, 'SIPPAI', 'TOWN', rand);
  } else if (place === 'DUNGEON') {
    // :693-700 地下城：6 种玩法（无 SELF）
    for (lcount = 1; lcount < 6; lcount += 1) {
      const locals = fs_bitch('PLAY', lcount); // :695
      play[lcount] = fi_culc_bitch(arg, 'KAKURITU', locals, rand); // :696
      if (!fi_culc_bitch(arg, 'ABLE', locals, rand)) {
        play[lcount] = 0; // :699
      }
    }
    play[0] = play.slice(1).reduce((a, b) => a + b, 0); // :701 SUMARRAY(PLAY)
    // :703-708 指示分岐（卖春指示 CFLAG:500 == 1 时失败率分摊）
    if (era.get(`cflag:${arg}:500`) === 1) {
      play[0] += Math.floor(
        fi_culc_bitch(arg, 'SIPPAI', 'DUNGEON', rand) /
          Math.max(1, era.get(`abl:${arg}:10`) || 0),
      ); // :705
    } else {
      play[0] += fi_culc_bitch(arg, 'SIPPAI', 'DUNGEON', rand); // :707
    }
  }

  // :711-712 权重非正时兜底为 1（保证随机落点不越界）
  if (play[0] <= 0) {
    play[0] = 1;
  }

  // :714-719 按随机数落点：LOCAL = RAND:PLAY，逐玩法减权重
  let local = rand(play[0]); // :714 LOCAL = RAND:PLAY
  for (lcount = 1; lcount < 7; lcount += 1) {
    if (local < play[lcount]) {
      return lcount; // :717 RETURNF LCOUNT
    }
    local -= play[lcount]; // :718
  }
  return 0; // :720 RETURNF 0
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
    // :733-766 SIPPAI 卖春基本失败率
    case 'SIPPAI': {
      // :741-745 失败率＝250±善恶值（50～450）
      if (args1 === 'TOWN') {
        local = 250 + (era.get(`cflag:${arg}:151`) || 0);
      } else if (args1 === 'DUNGEON') {
        local = 250 + (era.get(`cflag:${arg}:151`) || 0);
      } else {
        throw new Error(`未知的文字${args1}`);
      }
      // :748 卖春中毒补正
      local = Math.floor(local / (1 + (era.get(`abl:${arg}:37`) || 0)));
      // :750-751 淫乱
      if (era.get(`talent:${arg}:76`)) {
        local = Math.floor(local * 0.7);
      }
      // :753-757 娼妇与倾城
      if (era.get(`talent:${arg}:181`)) {
        local = Math.floor(local * 0.5);
      } else if (era.get(`talent:${arg}:180`)) {
        local = Math.floor(local * 0.7);
      }
      // :760-761 卖春禁止（CFLAG:120 == 0）
      if (era.get(`cflag:${arg}:120`) === 0) {
        local += 999;
      }
      // :764 不为 0
      local = Math.max(local, 1);
      return local; // :765
    }

    // :767-822 SEIKOU 卖春基本成功率
    case 'SEIKOU': {
      local = (era.get(`abl:${arg}:37`) || 0) * 5; // :768
      if (era.get(`exp:${arg}:74`)) {
        local += 1; // :770
      }
      if ((era.get(`cflag:${arg}:151`) || 0) < -100) {
        local += 1; // :772
      }
      if (era.get(`talent:${arg}:204`)) {
        local += 100; // :775 肉便器
      }
      // :777 淫乱・娼妇・倾城
      local +=
        ((era.get(`talent:${arg}:76`) ? 1 : 0) +
          (era.get(`talent:${arg}:180`) ? 1 : 0) +
          (era.get(`talent:${arg}:181`) ? 1 : 0)) *
        30;

      if (args1 === 'TOWN') {
        // :779-797 基本成功率所持金依存（债务越多越容易卖春）
        const money =
          (era.get(`cflag:${arg}:580`) || 0) +
          (era.get(`cflag:${arg}:581`) || 0) +
          (era.get(`cflag:${arg}:582`) || 0);
        if (money < -40000) {
          local += 2000; // :781-782
        } else if (money < -20000) {
          local += 1000; // :783-784
        } else if (money < -10000) {
          local += 500; // :785-786
        } else if (money < -5000) {
          local += 250; // :787-788
        } else if (money < 0) {
          local += 100; // :789-790
        } else if (money < 5000) {
          local += 50; // :791-792
        } else if (money < 10000) {
          local += 20; // :793-794
        } else {
          local += 5; // :795-796
        }
      } else if (args1 === 'DUNGEON') {
        if (era.get(`cflag:${arg}:1`) === 2) {
          // :800-814 勇者：同样所持金依存
          const money =
            (era.get(`cflag:${arg}:580`) || 0) +
            (era.get(`cflag:${arg}:581`) || 0) +
            (era.get(`cflag:${arg}:582`) || 0);
          if (money < -40000) {
            local += 2000; // :802-803
          } else if (money < -20000) {
            local += 1000; // :804-805
          } else if (money < -10000) {
            local += 500; // :806-807
          } else if (money < -5000) {
            local += 250; // :808-809
          } else if (money < 0) {
            local += 100; // :810-811
          } else if (money < 5000) {
            local += 50; // :812-813
          } else if (money < 10000) {
            local += 20; // :814-815
          } else {
            local += 5; // :816-817
          }
        } else {
          // :818-826 奴隶
          local += Math.floor(
            1500 /
              (25 -
                (era.get(`abl:${arg}:11`) || 0) -
                (era.get(`abl:${arg}:37`) || 0)),
          );
          // :820-823 潜入中（CFLAG:1 == 3 && CFLAG:533 > 1）
          if (
            era.get(`cflag:${arg}:1`) === 3 &&
            (era.get(`cflag:${arg}:533`) || 0) > 1
          ) {
            local = Math.floor(local * 0.75);
          } else if (era.get(`cflag:${arg}:500`) === 1) {
            // :824-825 卖春指示を受けた奴隷
            local = Math.floor(
              (local * (10 + (era.get(`abl:${arg}:10`) || 0) * 2)) / 10,
            );
          } else {
            // :826-827 それ以外
            local = Math.floor(local * 0.75);
          }
        }
      } else {
        throw new Error(`未知的文字${args1}`);
      }

      // :830-837 卖春积极性（CFLAG:120 > 0 时 +；否则 1）
      if (era.get(`cflag:${arg}:120`) > 0) {
        local += era.get(`cflag:${arg}:120`) * 100 - 5;
      } else {
        local = 1;
      }

      // :840 不为 0
      local = Math.max(local, 1);
      return local; // :841
    }

    // :844-946 KYAKU 客数（判定回数）
    case 'KYAKU': {
      local = rand(6); // :845 LOCAL = RAND:6（0-5 基础）
      // :846-858 善恶值补正
      const karma_val = era.get(`cflag:${arg}:151`) || 0;
      if (karma_val > 180) {
        local -= 3; // :849
      } else if (karma_val > 130) {
        local -= 2; // :851
      } else if (karma_val > 80) {
        local -= 1; // :853
      } else if (karma_val > 30) {
        // :855 无变化
      } else if (karma_val > -20) {
        local += 1; // :857
      } else if (karma_val > -70) {
        local += 2; // :859
      } else if (karma_val > -120) {
        local += 3; // :861
      } else {
        local += 4; // :863
      }

      // :866-881 出身补正（TALENT:315）
      const origin = era.get(`talent:${arg}:315`) || 0;
      if (origin === 5) {
        local += 2; // 元娼妇
      } else if (origin === 7) {
        local += 1; // 元物乞い
      } else if (origin === 2 || origin === 8 || origin === 12) {
        local -= 1; // 元修道女/元贵族/元圣女
      }

      // :883-902 素质累计
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
        local += 1; // :900
      }
      if (era.get(`talent:${arg}:114`)) {
        local += 2; // :902
      }
      if (era.get(`talent:${arg}:100`)) {
        if (era.get(`talent:${arg}:10`)) {
          local += 1; // :906
        }
        if (era.get(`talent:${arg}:109`)) {
          local += 1; // :908
        }
        if (era.get(`talent:${arg}:116`)) {
          local += 2; // :910
        }
      }
      if (era.get(`talent:${arg}:99`) && era.get(`talent:${arg}:248`)) {
        local += 1; // :913
      }

      if (args1 === 'TOWN') {
        // :916-931 特殊容姿（人间相手マイナス、魔族相手プラス）
        local -=
          (era.get(`talent:${arg}:244`) ? 1 : 0) +
          (era.get(`talent:${arg}:245`) ? 1 : 0) +
          (era.get(`talent:${arg}:246`) ? 1 : 0) +
          (era.get(`talent:${arg}:247`) ? 1 : 0) +
          (era.get(`talent:${arg}:259`) ? 1 : 0) +
          (era.get(`talent:${arg}:260`) ? 1 : 0);
        // :932-946 所持金补正
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
        // :947-959 特殊容姿（魔族相手プラス）
        local +=
          (era.get(`talent:${arg}:244`) ? 1 : 0) +
          (era.get(`talent:${arg}:245`) ? 1 : 0) +
          (era.get(`talent:${arg}:246`) ? 1 : 0) +
          (era.get(`talent:${arg}:247`) ? 1 : 0) +
          (era.get(`talent:${arg}:259`) ? 1 : 0) +
          (era.get(`talent:${arg}:260`) ? 1 : 0);
        // :949-956 指示の有無
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

      // :961-963 肉便器补正
      if (era.get(`talent:${arg}:204`)) {
        local = Math.floor(local * 1.5);
      }
      // :966 可以到 0
      local = Math.max(local, 0);
      return local; // :967
    }

    // :969-1026 ABLE 玩法可不可（返回 0/1）
    case 'ABLE': {
      // :972-976 调教对象为空/濒死不可
      if (arg < 0) {
        return 0; // :973
      }
      if (era.get(`base:${arg}:0`) < 500) {
        return 0; // :975
      }

      switch (args1) {
        case 'SELF': // :981 ひとりあそび（无额外条件）
          break;
        case 'HAND': // :983 手コキコース
          break;
        case 'ORAL': // :985-988 おフェラコース（接吻未経験则拒绝）
          if (era.get(`cflag:${arg}:16`) === -1) {
            return 0; // :987
          }
          break;
        case 'LES': // :989-997 レズプレイ（百合气质/快感/欲望/技巧门槛）
          if (
            (era.get(`abl:${arg}:22`) || 0) < 2 ||
            (era.get(`abl:${arg}:0`) || 0) < 3 ||
            (era.get(`abl:${arg}:10`) || 0) < 2 ||
            (era.get(`abl:${arg}:11`) || 0) < 2
          ) {
            return 0; // :992-993
          }
          if ((era.get(`abl:${arg}:33`) || 0) === 0) {
            return 0; // :995-996 百合中毒必要
          }
          break;
        case 'ANAL': // :998 おしりコース
          break;
        case 'SEX': // :999-1008 本番コース（处女/男人不可，贞操带/封印不可）
          if (
            era.get(`talent:${arg}:0`) ||
            era.get(`talent:${arg}:122`) === 1
          ) {
            return 0; // :1002
          }
          if (
            era.get(`cflag:${arg}:42`) === 79 &&
            (era.get(`cflag:${arg}:40`) || 0) & 64
          ) {
            return 0; // :1004-1005 贞操带
          }
          if (era.get(`talent:${arg}:273`)) {
            return 0; // :1007 贞操封印
          }
          break;
        case 'ANIMAL': // :1009-1023 どうぶつコース（野狗道具/处女/贞操带/封印）
          if ((era.get('item:22') || 0) === 0) {
            return 0; // :1014 野狗道具
          }
          if (
            era.get(`talent:${arg}:0`) ||
            era.get(`talent:${arg}:122`) === 1
          ) {
            return 0; // :1016
          }
          if (
            era.get(`cflag:${arg}:42`) === 79 &&
            (era.get(`cflag:${arg}:40`) || 0) & 64
          ) {
            return 0; // :1018-1019
          }
          if (era.get(`talent:${arg}:273`)) {
            return 0; // :1021
          }
          break;
        default:
          break;
      }
      return 1; // :1025
    }

    // :1028-1108 PLAY 次数
    case 'PLAY': {
      if (args1 === 'SELF') {
        // :1030-1042 SELF 自慰次数（先单独处理——非卖春行为）
        local =
          (era.get(`abl:${arg}:31`) || 0) +
          rand((era.get(`abl:${arg}:11`) || 0) + 1); // :1032
        local = Math.floor(local / 3); // :1033
        local +=
          (era.get(`talent:${arg}:60`) ? 1 : 0) +
          (era.get(`talent:${arg}:74`) ? 1 : 0) +
          (era.get(`talent:${arg}:272`) ? 1 : 0); // :1034
        if (era.get(`talent:${arg}:74`)) {
          local = Math.floor(local * 1.5); // :1036-1037 自慰狂
        }
        if (
          era.get(`talent:${arg}:121`) ||
          era.get(`talent:${arg}:122`) ||
          era.get(`talent:${arg}:326`)
        ) {
          local = Math.floor(local * 1.2); // :1039-1040 扶她/男人/肉芽
        }
        local = Math.max(local, 1); // :1042
        return local;
      }

      // :1045-1108 卖春玩法次数
      local = 1 + rand(3); // :1045 LOCAL = 1 + RAND:3
      local +=
        (era.get(`talent:${arg}:63`) ? 1 : 0) +
        (era.get(`talent:${arg}:64`) ? 1 : 0); // :1046
      local +=
        ((era.get(`talent:${arg}:76`) ? 1 : 0) +
          (era.get(`talent:${arg}:272`) ? 1 : 0)) *
        2; // :1047
      local += Math.floor(
        ((era.get(`abl:${arg}:16`) || 0) + (era.get(`abl:${arg}:37`) || 0)) / 3,
      ); // :1048

      // :1050-1051 场所：娼馆街（FLAG:(CFLAG:501 + 349) == 507）
      if (
        (era.get(`flag:${(era.get(`cflag:${arg}:501`) || 0) + 349}`) || 0) ===
        507
      ) {
        local = Math.floor(local * 1.2);
      }

      switch (args1) {
        case 'HAND': // :1053-1055 手コキ
          local += Math.floor((era.get(`abl:${arg}:32`) || 0) / 3);
          break;
        case 'ORAL': // :1056-1062 おフェラ
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
        case 'LES': // :1063-1067 びあん
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
        case 'ANAL': // :1068-1071 おしり
          local += Math.floor(
            ((era.get(`abl:${arg}:3`) || 0) + (era.get(`abl:${arg}:30`) || 0)) /
              3,
          );
          if (era.get(`talent:${arg}:77`)) {
            local = Math.floor(local * 1.5); // 尻穴狂
          }
          break;
        case 'SEX': // :1072-1075 本番
          local += Math.floor(
            ((era.get(`abl:${arg}:2`) || 0) + (era.get(`abl:${arg}:30`) || 0)) /
              3,
          );
          if (era.get(`talent:${arg}:75`)) {
            local = Math.floor(local * 1.5); // セックス狂
          }
          break;
        case 'ANIMAL': // :1076-1080 どうぶつ
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

      // :1083-1084 卖淫经验为零 → 减 5
      if (!era.get(`exp:${arg}:74`)) {
        local -= 5;
      }
      // :1087 不为 0
      local = Math.max(local, 1);
      return local;
    }

    // :1090-1144 KAKURITU 抽选概率
    case 'KAKURITU': {
      local = 1 + rand(3); // :1091 LOCAL = 1 + RAND:3
      switch (args1) {
        case 'HAND': // :1093-1097 手コキ
          local += (era.get(`abl:${arg}:32`) || 0) + 4;
          if (
            era.get(`talent:${arg}:85`) &&
            !(era.get(`talent:${arg}:180`) || era.get(`talent:${arg}:181`))
          ) {
            local = Math.floor(local * 1.5); // 爱且非娼妇/倾城
          }
          break;
        case 'ORAL': // :1098-1102 おフェラ
          local += (era.get(`abl:${arg}:32`) || 0) + 3;
          if (era.get(`talent:${arg}:52`)) {
            local += 3;
          }
          if (era.get(`talent:${arg}:47`)) {
            local = Math.floor(local * 2.0); // 精爱味觉
          }
          break;
        case 'LES': // :1103-1106 びあん
          local +=
            (era.get(`abl:${arg}:0`) || 0) + (era.get(`abl:${arg}:22`) || 0);
          local = Math.floor(
            (local * (10 + (era.get(`abl:${arg}:33`) || 0))) / 10,
          );
          break;
        case 'ANAL': // :1107-1110 おしり
          local +=
            (era.get(`abl:${arg}:3`) || 0) + (era.get(`abl:${arg}:30`) || 0);
          if (era.get(`talent:${arg}:77`)) {
            local = Math.floor(local * 2.0); // 尻穴狂
          }
          break;
        case 'SEX': // :1111-1114 本番
          local +=
            (era.get(`abl:${arg}:2`) || 0) + (era.get(`abl:${arg}:30`) || 0);
          if (era.get(`talent:${arg}:75`)) {
            local = Math.floor(local * 2.0); // セックス狂
          }
          break;
        case 'ANIMAL': // :1115-1118 どうぶつ
          local +=
            (era.get(`abl:${arg}:30`) || 0) + (era.get(`abl:${arg}:39`) || 0);
          if (era.get(`talent:${arg}:136`)) {
            local = Math.floor(local * 2.0); // 牝犬
          }
          break;
        default:
          break;
      }
      // :1121 不为 0
      local = Math.max(local, 1);
      local *= 5; // :1122
      return local;
    }

    // :1124-1148 RATE 费率（街中卖春使用，越大抵抗感越大）
    case 'RATE': {
      switch (args1) {
        case 'KARMA':
          return 250 + (era.get(`cflag:${arg}:151`) || 0); // :1129 基本料金是善恶值依赖
        case 'HAND':
          return 1; // :1131
        case 'ORAL':
        case 'LES':
          return 2; // :1133-1134
        case 'ANAL':
          return 3; // :1136
        case 'SEX':
          return 4; // :1138
        case 'ANIMAL':
          return 11; // :1140
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
  era.print(`[${num}] 卖春积极性 - `); // :1157
  const level = era.get(`cflag:${arg}:120`) || 0;
  if (level === 0) {
    era.print('没有'); // :1160
  } else if (level === 1) {
    era.print('普通'); // :1162
  } else {
    era.print(`${level}等级`); // :1164
  }
  era.print('  '); // :1167
  return 0; // :1169
}

/**
 * @SET_BICH_LEVEL（:1172-1196）：设置卖春积极性。
 *
 * 原作经 INPUT 读键（[0]-[5]），输入无效（< 0 或 > 5）直接返回。
 *
 * @param {number} arg 角色 ID
 */
async function set_bich_level(arg) {
  era.print('请设定等级'); // :1175
  era.print('[0] [1] [2] [3] [4] [5]'); // :1176
  const result = await era.input(); // :1185 INPUT

  if (result < 0) {
    return 0; // :1187-1188
  }
  if (result > 5) {
    return 0; // :1189-1190
  }

  chara(arg).patch.卖春积极性 = result; // :1192

  if (result === 0) {
    await era.printAndWait('卖春积极性变成没有了'); // :1188
  } else if (result === 1) {
    await era.printAndWait('卖春积极性变成普通了'); // :1190
  } else {
    await era.printAndWait(`卖春积极性变为等级${result}了`); // :1192
  }

  return 0; // :1200
}

module.exports = {
  STUBBED_CALLS,
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
  set_bich_level,
};
