/**
 * @file @ENDCHECK 主线剧情监测全链（issue #116：S4「可空转」落地）。
 *
 * 源: target/ERB/EVENT/ENDING ver 1.0.1.ERB  @ENDCHECK（:301-356）
 *     target/ERB/EVENT/ENDINGDATA.ERB  @ENDRESET（:1-35）
 *     target/ERB/EVENT/ENDINGDATA.ERB  @ENDCHECKMAIN（:38-63）
 *     target/ERB/EVENT/ENDINGDATA.ERB  @ENDCHECKCHARA（:64-140）
 *
 * 调用关系（全库唯一调用点，已查实）：@EVENT_NEWDAY :241（「主线剧情
 * 监测」，每日一次）——ere/event/event-nextday.js 的 run_event_newday
 * 尾部。
 *
 * 本票边界（#112 父票定「可空转」）：
 *   - 真做：ENDRESET 十一角清场、ENDCHECKMAIN 五条线、ENDCHECKCHARA 的
 *     七条素质定线与四条子判定**调用**、END 族分派循环。这些是纯 flag
 *     读写，无演出，是后续阶段的挂接面。
 *   - 四条角色线推进判定（@ENDCHECKSPADE / @ENDCHECKSQUARE /
 *     @ENDCHECKGODNESS / @ENDCHECKGODNESS_SKY_TEMPLE / @ENDCHECKPRINCESS）
 *     自 #404（N20）起为真身（见下方各函数）；@ENDING_N 演出同票落地
 *     （ere/event/event-ending.js 的 ending_n）。
 *   - TRYCALL END31 死引用：#14 缺陷 3，1:1 保留（见文件尾注释）。
 *
 * 移植说明：
 *   - 原作 GETCHARA(n) 按登记号寻址；ere 侧登记号已扁平化为角色号
 *     （#21，addCharacter(17) 后 cid=17），在场判定即列表包含。
 *   - EX_FLAG:2801-2815 读写一律走包装层（era-exflag.js，#113 落表）；
 *     葵希罗线与反叛结局原作错写 FLAG 侧（ENDINGDATA.ERB :30-32/:61-63
 *     与 :130-137，ExFlag.yml 头注有登记），1:1 照写 FLAG 侧（era-flag.js，
 *     本票补表）——读点（ENDCHECKCHARA 的定线与 ENDRESET 的清场）与写点必须同侧，状态机行为
 *     才与原作一致；分派循环读的是 EX_FLAG 侧（族错位缺陷，见下）。
 *   - cflag/talent 的读是跨域读，放行（ADR-0002「跨域读放行」），直读
 *     + || 0 兜底（#13：未声明下标读得 undefined）。
 *   - 四条线状态机里的 `SIF` **只护住紧接的下一行**（emuera-basic-agent-guide
 *     references/commands/control-flow.md:19-24，Emuera 忽略缩进）：ENDCHECKSQUARE
 *     :166-168 的计数器清零在分支内无条件执行，不是书写错误——照抄，
 *     见该函数内注释。同理 ENDCHECKGODNESS 各档里的 `SIF DAY:1 …`
 *     只护住跳档那一行。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { END_FAMILY } = require('#/event/ending-family');
const { ending_n } = require('#/event/event-ending');

/**
 * 原作 RAND:N（0..N-1）的缺省实现（dungeon-lvup.js 同款）。四条线状态机
 * 只有两处随机（银黑桃 151 档以上的乳业收入 RAND:200、黑方片 300 档的
 * RAND:5），均由调用点可注入的随机源承担——测试给确定性源（#344）。
 */
function default_rand(n) {
  return Math.floor(Math.random() * n);
}

/** 二维表读点：未声明下标读得 undefined（#13），包装层同款 || 0 兜底 */
function get(name) {
  return era.get(name) || 0;
}

/**
 * END 族分发注册表：`TRYCALLFORM END{2..15}_{小节}` 的等价物（#7 分发族）。
 * 声明空间与族实现自 #404（N20）起迁到 ere/event/ending-family.js（65 个
 * @END<n> 的数据表执行器），此处按原样 re-export，分派循环与既有调用点不变。
 */

/** 原作 GETCHARA(n) 的等价物：在场返回角色号（= cid，#21 扁平化），不在场 -1 */
function get_chara(no) {
  return era.getAddedCharacters().includes(no) ? no : -1;
}

/**
 * 每日清场（原作 @ENDRESET，ENDINGDATA.ERB :1-35）。
 * 剧情角色不在场则清对应线 flag；银黑桃/嘉德有段位守卫——推进到离队
 * 死亡段（300/500+）后不归零重走。
 */
function endreset() {
  // :3-5 玛奥（角色号 17）
  if (get_chara(17) < 0) {
    era_exflag.route_17 = 0;
  }
  // :6-8 金红桃（20）
  if (get_chara(20) < 0) {
    era_exflag.route_20 = 0;
  }
  // :9-11 银黑桃（21）——段位 >= 300（放走/死亡段）不清
  if (get_chara(21) < 0 && era_exflag.route_21 < 300) {
    era_exflag.route_21 = 0;
  }
  // :12-14 黑方片（22）
  if (get_chara(22) < 0) {
    era_exflag.route_22 = 0;
  }
  // :15-17 白梅花（23）
  if (get_chara(23) < 0) {
    era_exflag.route_23 = 0;
  }
  // :18-20 莉莉（24）
  if (get_chara(24) < 0) {
    era_exflag.route_24 = 0;
  }
  // :21-23 琼（31）
  if (get_chara(31) < 0) {
    era_exflag.route_31 = 0;
  }
  // :24-26 普林希斯（32）
  if (get_chara(32) < 0) {
    era_exflag.route_32 = 0;
  }
  // :27-29 嘉德（33）——原作守卫读 EX_FLAG:2814（银黑桃线值，疑为 2810
  // 的笔误：写入的是 2810；银黑桃线值上界 311，2814 < 500 实际恒真，故
  // 行为上等价于无守卫，嘉德离队即每天清 2810）。1:1 照抄读 2814，勿修
  if (get_chara(33) < 0 && era_exflag.route_21 < 500) {
    era_exflag.route_33 = 0;
  }
  // :30-32 葵希罗（34）——原作错写 FLAG 侧（见文件头），照写 era_flag
  if (get_chara(34) < 0) {
    era_flag.route_34 = 0;
  }
  // :33-35 菲娅（35）
  if (get_chara(35) < 0) {
    era_exflag.route_35 = 0;
  }
}

/**
 * 全局判定（原作 @ENDCHECKMAIN，ENDINGDATA.ERB :38-63）：五条线。
 * 2802/2803/2804 的真实消费者是 @DEBUG_CHECK（反作弊，EVENT_TURNEND.ERB
 * :170-334，随反作弊票）；本函数只负责置位。
 */
function endcheck_main() {
  // :42-44 一周目 500 日 Normal End 门槛：DAY:0 == 500 且主线空闲
  // （2801 == 0 未起步，或 >= 90 真结局收尾中）→ 置 99。99 同时是分派
  // 循环的短路条件（ENDING ver 1.0.1.ERB :344）
  if (
    era_flag.day_count === 500 &&
    (era_exflag.first_run_deadline === 0 || era_exflag.first_run_deadline >= 90)
  ) {
    era_exflag.first_run_deadline = 99;
  }

  // :46-47 资金异常：持有金超过「非作弊获得资金」追踪器 +8766 的容差
  // → 置 10（分派循环会拼出 END2_1，无定义，静默——反作弊计数器与剧情
  // flag 区间的碰撞，docs/research/ending-paths.md 第一节）
  if (era_flag.money > era_exflag.legit_money + 8766) {
    era_exflag.money_cheat_ending = 10;
  }

  // :51-55 奴隶魔力过载：任一角色（含 0 号魔王）CFLAG:9 >= 5000 且无
  // 占用/调教中标记（CFLAG:x:1 == 0）→ 记角色号。原作 DO 循环从 0 号
  // 扫到 CHARANUM-1、后命中覆盖先命中；ere 侧迭代序＝引擎键序
  // （getAddedCharacters 数值升序，#150），覆盖写语义同，「最后」＝
  // 最大命中 ID——非升序加入时与原作位序模型分道，取舍随 #21 的
  // ID 语义扁平化
  for (const cid of era.getAddedCharacters()) {
    // CFLAG:x:9 魔力存量；CFLAG:x:1 占用/状态标记（0=空闲）
    if (
      (era.get(`cflag:${cid}:9`) || 0) >= 5000 &&
      (era.get(`cflag:${cid}:1`) || 0) === 0
    ) {
      era_exflag.runaway_slave_id = cid;
    }
  }

  // :58-59 魔王自己过载（登记号 0 = 角色 0）：CFLAG:0:9 >= 1500 → 置 10，
  // 消费者是 @DEBUG_CHECK 的大冲击 GAMEOVER
  if ((era.get('cflag:0:9') || 0) >= 1500) {
    era_exflag.maou_runaway_ending = 10;
  }

  // :61-63 反叛判定：威望（EX_FLAG:99）耗尽 → FLAG 侧 2816 置 10。
  // 原作错写 FLAG 侧（见文件头）；全库无消费点（死代码），1:1 保留写入
  if (era_exflag.prestige <= 0) {
    era_flag.rebellion_ending = 10;
  }
}

/**
 * 七角素质定线表（@ENDCHECKCHARA 的同型块，ENDINGDATA.ERB :66-137）。
 * 结构：角色在场 && 线 flag == 0 → TALENT:85 恋慕置 10 / TALENT:76 淫乱
 * 置 20。no = 角色号；holder/name = 线 flag 所在的包装层对象与访问器名
 * （葵希罗在 FLAG 侧——原作错写，见文件头）。src = 源码区间。
 */
const LINE_STARTERS = [
  { no: 17, holder: era_exflag, name: 'route_17', src: ':66-73' }, // 玛奥
  { no: 20, holder: era_exflag, name: 'route_20', src: ':74-81' }, // 金红桃
  { no: 23, holder: era_exflag, name: 'route_23', src: ':90-97' }, // 白梅花
  { no: 24, holder: era_exflag, name: 'route_24', src: ':98-105' }, // 莉莉
  { no: 31, holder: era_exflag, name: 'route_31', src: ':106-113' }, // 琼
  { no: 32, holder: era_exflag, name: 'route_32', src: ':114-121' }, // 普林希斯
  { no: 34, holder: era_flag, name: 'route_34', src: ':130-137' }, // 葵希罗（FLAG 侧）
];

/**
 * 角色线推进（原作 @ENDCHECKCHARA，ENDINGDATA.ERB :64-140）。
 * 七条素质定线真做；四个推进状态机（好感/阶段计数器逐级爬段）自 #404 起
 * 为真身，见下方各 endcheck_* 函数。
 */
async function endcheck_chara() {
  for (const starter of LINE_STARTERS) {
    if (get_chara(starter.no) > 0) {
      // 源码区间见 LINE_STARTERS 的 src 列
      if (starter.holder[starter.name] === 0) {
        // TALENT:85 恋慕 / TALENT:76 淫乱（素质定线，直读子表）
        if (era.get(`talent:${starter.no}:85`) || 0) {
          starter.holder[starter.name] = 10;
        } else if (era.get(`talent:${starter.no}:76`) || 0) {
          starter.holder[starter.name] = 20;
        }
      }
    }
  }

  // :82-85 银黑桃（21）：在场且段位 < 300 才判定（300+ 是放走/死亡段）
  if (get_chara(21) > 0 && era_exflag.route_21 < 300) {
    await endcheck_spade();
  }
  // :86-89 黑方片（22）：在场即判定（无段位守卫）
  if (get_chara(22) > 0) {
    endcheck_square();
  }
  // :122-129 嘉德（33）：< 500 段在场判定；>= 500 段离队后转天神宫线
  if (
    (get_chara(33) > 0 && era_exflag.route_33 < 500) ||
    era_exflag.route_33 >= 500
  ) {
    if (get_chara(33) > 0) {
      endcheck_godness();
    } else {
      endcheck_godness_sky_temple();
    }
  }
  // :138-139 菲娅（35）：判定状态机含线起步（2807 = 10 初次会面）
  if (get_chara(35) > 0) {
    endcheck_princess();
  }
}

/**
 * @ENDCHECKSQUARE（ENDINGDATA.ERB:143-207）：黑方片线（角色 22）的每日推进。
 *
 * 线值 EX_FLAG:2811：10-90 是恋慕线的逐档推进，110-200 是淫乱线，300-310
 * 是「放走/死亡」段（:151 的互换重置与 :199 的 300 档）。计数器
 * CFLAG:22:515 承担「材料累积到阈值才跳档」。
 *
 * @param {(n: number) => number} [rand] RAND:5 的随机源（:205 的 300 档掷骰）
 */
function endcheck_square(rand = default_rand) {
  const cid = get_chara(22); // GETCHARA(22)：不在场为 -1（读数全 0，调用方已守卫）
  const cflag = (idx) => get(`cflag:${cid}:${idx}`);
  const talent = (idx) => get(`talent:${cid}:${idx}`);

  // :147-155 通过实验室爱慕淫乱互换将导致剧情线重置
  if (
    talent(85) === 1 &&
    era_exflag.route_22 >= 100 &&
    era_exflag.route_22 <= 200
  ) {
    era_exflag.route_22 = 10; // 恋慕线起始 1
    era.set(`cflag:${cid}:515`, 0);
  } else if (
    talent(76) === 1 &&
    ((era_exflag.route_22 >= 30 && era_exflag.route_22 <= 100) ||
      (era_exflag.route_22 >= 300 && era_exflag.route_22 <= 310))
  ) {
    era_exflag.route_22 = 110; // 淫乱线起始 10
    era.set(`cflag:${cid}:515`, 0);
  }

  // :157-198 恋慕线（TALENT:85）阶梯。快照 stage：ELSEIF 链内只有一支命中
  const stage = era_exflag.route_22;
  const love = talent(85) === 1;
  if (love && cflag(2) >= 2000 && stage < 10) {
    era_exflag.route_22 = 10; // :158 起步
  } else if (stage >= 10 && stage < 20) {
    if (love && cflag(2) >= 5000) {
      era_exflag.route_22 = 20; // :160-161
    }
  } else if (stage >= 20 && stage < 30) {
    if (love && cflag(2) >= 10000) {
      era_exflag.route_22 = 30; // :163-164
    }
  } else if (stage >= 30 && stage < 40) {
    // :166-168：SIF 只护住 :167 的跳档，:168 的计数器清零在分支内无条件
    // 执行（Emuera 忽略缩进，本文件头注有据）——照抄，勿「修」成 SIF 块
    if (love && get(`abl:${cid}:10`) + get(`abl:${cid}:16`) >= 14) {
      era_exflag.route_22 = 40;
    }
    era.set(`cflag:${cid}:515`, 0);
  } else if (stage >= 40 && stage < 50) {
    if (love && cflag(515) >= 10) {
      era_exflag.route_22 = 50; // :170-171
    } else {
      era.set(`cflag:${cid}:515`, cflag(515) + 1); // :173
    }
  } else if (stage >= 50 && stage < 60) {
    if (love && cflag(515) >= 30) {
      era_exflag.route_22 = 60;
    } else {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    }
  } else if (stage >= 60 && stage < 70) {
    if (love && cflag(515) >= 60) {
      era_exflag.route_22 = 70;
    } else {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    }
  } else if (stage >= 70 && stage < 80) {
    if (love && cflag(515) >= 100) {
      era_exflag.route_22 = 80;
    } else {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    }
  } else if (stage >= 80 && stage < 90) {
    if (love && cflag(515) >= 150) {
      era_exflag.route_22 = 90;
    } else {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    }
  } else if (stage === 300) {
    // :199-206 300 档：1/5 概率推进到 310（无门槛，计数器不动）。
    // :200-204 是被原作 `;` 注释掉的一段，不移植
    if (rand(5) === 0) {
      era_exflag.route_22 = era_exflag.route_22 + 10;
    }
  }
}

/**
 * @ENDCHECKSPADE（ENDINGDATA.ERB:208-352）：银黑桃线（角色 21）的每日推进。
 *
 * 线值 EX_FLAG:2814：30-90 恋慕 / 110-200 淫乱 / 300-310 放走段；
 * 151 档以上每日产奶收入（MONEY 与 EX_FLAG:4444 同步）。:210-233 的
 * `[SKIPSTART]…[SKIPEND]` 段（CFLAG:1 == 9 的离队处置）是原作主动括起来
 * 的死代码，不移植（清单行 :208-352 含它）。
 *
 * @param {(n: number) => number} [rand] RAND:200 的随机源（:236 乳业收入）
 */
async function endcheck_spade(rand = default_rand) {
  const cid = get_chara(21);
  const cflag = (idx) => get(`cflag:${cid}:${idx}`);
  const talent = (idx) => get(`talent:${cid}:${idx}`);

  // :235-240 151 档以上：乳业收入 = (线值-140)/10 × (RAND:200 + 200)
  if (era_exflag.route_21 >= 151) {
    const income =
      Math.trunc((era_exflag.route_21 - 140) / 10) * (rand(200) + 200);
    era.print(`银黑桃乳业获得的收入desu，一共${income}哟~`); // :237 PRINTFORMW
    await era.waitAnyKey();
    era_flag.money = era_flag.money + income; // :238 MONEY +=
    era_exflag.legit_money = era_exflag.legit_money + income; // :239
  }

  // :243-251 通过实验室爱慕淫乱互换将导致剧情线重置
  if (
    talent(85) === 1 &&
    era_exflag.route_21 >= 110 &&
    era_exflag.route_21 <= 200
  ) {
    era_exflag.route_21 = 30; // 恋慕线起始 3
    era.set(`cflag:${cid}:515`, 0);
  } else if (
    talent(76) === 1 &&
    era_exflag.route_21 >= 30 &&
    era_exflag.route_21 <= 100
  ) {
    era_exflag.route_21 = 110; // 淫乱线起始 11
    era.set(`cflag:${cid}:515`, 0);
  }

  // :253-301 恋慕线（TALENT:85）
  const stage = era_exflag.route_21;
  const love = talent(85) === 1;
  if (love && cflag(2) >= 2000 && stage < 10) {
    era_exflag.route_21 = 10; // :254 起步
  } else if (stage >= 10 && stage < 20) {
    if (love && cflag(2) >= 5000) {
      era_exflag.route_21 = 20; // :256-257
    }
  } else if (stage >= 20 && stage < 30) {
    if (love && cflag(2) >= 10000) {
      era_exflag.route_21 = 30; // :259-260
    }
  } else if (stage >= 30 && stage < 40) {
    // :262-264：SIF 只护住跳档那一行，计数器清零在分支内无条件（同 SQUARE）
    if (love && get(`abl:${cid}:10`) + get(`abl:${cid}:16`) >= 14) {
      era_exflag.route_21 = 40;
    }
    era.set(`cflag:${cid}:515`, 0);
  } else if (stage >= 40 && stage < 50) {
    if (love && cflag(515) >= 10) {
      era_exflag.route_21 = 50; // :266-267
    } else {
      era.set(`cflag:${cid}:515`, cflag(515) + 1); // :269
    }
  } else if (stage >= 50 && stage < 60) {
    if (love && cflag(515) >= 30) {
      era_exflag.route_21 = 60;
    } else {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    }
  } else if (stage >= 60 && stage < 70) {
    if (love && cflag(515) >= 60) {
      era_exflag.route_21 = 70;
    } else {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    }
  } else if (stage >= 70 && stage < 80) {
    if (love && cflag(515) >= 100) {
      era_exflag.route_21 = 80;
    } else {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    }
  } else if (stage >= 80 && stage < 90) {
    if (love && cflag(515) >= 150) {
      era_exflag.route_21 = 90;
    } else {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    }
  } else if (stage === 300) {
    if (love && cflag(515) >= 10) {
      era_exflag.route_21 = 310; // :296-297
    } else {
      era.set(`cflag:${cid}:515`, cflag(515) + 1); // :299
    }
  }

  // :303-351 淫乱线（TALENT:76）。**重新快照**：上面那支可能刚改过线值
  const lust_stage = era_exflag.route_21;
  const lust = talent(76) === 1;
  if (lust && cflag(2) >= 2000 && lust_stage < 10) {
    era_exflag.route_21 = 110; // :304-305 起步 11
    era.set(`cflag:${cid}:515`, 0);
  } else if (lust_stage >= 110 && lust_stage < 120) {
    if (lust && cflag(2) >= 5000) {
      era_exflag.route_21 = 120; // :307-308
    }
  } else if (lust_stage >= 120 && lust_stage < 130) {
    // :310-314 这一档没有素质守卫（原作即如此）
    if (cflag(515) >= 2) {
      era_exflag.route_21 = 130;
    } else {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    }
  } else if (lust_stage >= 130 && lust_stage < 140) {
    if (lust && cflag(2) >= 10000) {
      era_exflag.route_21 = 140; // :316-317
    }
  } else if (lust_stage >= 140 && lust_stage < 150) {
    if (
      lust &&
      get(`abl:${cid}:1`) === 10 &&
      get(`abl:${cid}:17`) === 5 &&
      get(`talent:${cid}:78`) === 1 &&
      get(`talent:${cid}:0`) === 0
    ) {
      era_exflag.route_21 = 150; // :319-320
      era.set(`cflag:${cid}:515`, 0); // :321
    }
  } else if (lust_stage >= 150 && lust_stage < 160) {
    if (lust && cflag(515) >= 10) {
      era_exflag.route_21 = 160; // :323-324
    } else {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    }
  } else if (lust_stage >= 160 && lust_stage < 170) {
    if (lust && cflag(515) >= 30) {
      era_exflag.route_21 = 170;
    } else {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    }
  } else if (lust_stage >= 170 && lust_stage < 180) {
    if (lust && cflag(515) >= 60) {
      era_exflag.route_21 = 180;
    } else {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    }
  } else if (lust_stage >= 180 && lust_stage < 190) {
    if (lust && cflag(515) >= 100) {
      era_exflag.route_21 = 190;
    } else {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    }
  } else if (lust_stage >= 190 && lust_stage < 200) {
    if (lust && cflag(515) >= 150) {
      era_exflag.route_21 = 200;
    } else {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    }
  }
}

/**
 * @ENDCHECKPRINCESS（ENDINGDATA.ERB:353-480）：菲娅线（角色 35）的每日推进。
 *
 * 线值 EX_FLAG:2807：10（初次会面）/ -10（崩坏态）/ 30-120 恋慕 /
 * 130-220 淫乱。:445-447 的 160-170 档是空分支（判定已移到 aftertrain），
 * 照抄留空。
 */
function endcheck_princess() {
  const cid = get_chara(35);
  const cflag = (idx) => get(`cflag:${cid}:${idx}`);
  const talent = (idx) => get(`talent:${cid}:${idx}`);

  // :356-357 初次会面：在场且线值 0 → 10
  if (get_chara(35) > 0 && era_exflag.route_35 === 0) {
    era_exflag.route_35 = 10;
  }

  // :361-369 通过实验室爱慕淫乱互换将导致剧情线重置
  if (talent(85) === 1 && era_exflag.route_35 >= 130) {
    era_exflag.route_35 = 30; // 恋慕线起始 3
    era.set(`cflag:${cid}:515`, 0);
  } else if (
    talent(76) === 1 &&
    era_exflag.route_35 >= 30 &&
    era_exflag.route_35 <= 130
  ) {
    era_exflag.route_35 = 130; // 淫乱线起始 13
    era.set(`cflag:${cid}:515`, 0);
  }

  // :371-479 阶梯
  const stage = era_exflag.route_35;
  if (stage >= 10 && stage < 20) {
    // :372-376 MARK:1/2 == 3 的崩坏判定（TALENT:0 真 = 处女）
    if (get(`mark:${cid}:1`) === 3 && talent(0)) {
      era_exflag.route_35 = 20;
    } else if (
      (get(`mark:${cid}:1`) === 3 || get(`mark:${cid}:2`) === 3) &&
      talent(0) === 0
    ) {
      era_exflag.route_35 = -10; // 崩坏态（Bad Ending 触发源）
    }
  } else if (stage >= 20 && stage < 30) {
    // :377-384 素质定线
    if (talent(85) === 1) {
      era_exflag.route_35 = 30; // 恋慕线起始 3
    } else if (talent(76) === 1) {
      era_exflag.route_35 = 130; // 淫乱线起始 13
    }
  } else if (stage >= 30 && stage < 40) {
    if (cflag(2) >= 2000) {
      era_exflag.route_35 = 40; // :386-387
    }
  } else if (stage >= 40 && stage < 50) {
    if (cflag(2) >= 5000) {
      era_exflag.route_35 = 50;
    }
  } else if (stage >= 50 && stage < 60) {
    if (cflag(2) >= 10000) {
      era_exflag.route_35 = 60;
    }
  } else if (stage >= 130 && stage < 140) {
    if (cflag(2) >= 2000) {
      era_exflag.route_35 = 140;
    }
  } else if (stage >= 140 && stage < 150) {
    if (cflag(2) >= 5000) {
      era_exflag.route_35 = 150;
    }
  } else if (stage >= 150 && stage < 160) {
    if (cflag(2) >= 10000) {
      era_exflag.route_35 = 160;
    }
  } else if (stage >= 60 && stage < 70) {
    // :409-413 婚礼门槛：CFLAG:601 == 901
    if (cflag(601) === 901) {
      era_exflag.route_35 = 70;
      era.set(`cflag:${cid}:515`, 0);
    }
  } else if (stage >= 70 && stage < 80) {
    // :414-419 计数器爬到 10 跳档
    if (cflag(515) < 10) {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    } else if (cflag(515) === 10) {
      era_exflag.route_35 = 80;
    }
  } else if (stage >= 80 && stage < 90) {
    if (cflag(515) < 30) {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    } else if (cflag(515) === 30) {
      era_exflag.route_35 = 90;
    }
  } else if (stage >= 90 && stage < 100) {
    if (cflag(515) < 60) {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    } else if (cflag(515) === 60) {
      era_exflag.route_35 = 100;
    }
  } else if (stage >= 100 && stage < 110) {
    if (cflag(515) < 100) {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    } else if (cflag(515) === 100) {
      era_exflag.route_35 = 110;
    }
  } else if (stage >= 110 && stage < 120) {
    if (cflag(515) < 150) {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    } else if (cflag(515) === 150) {
      era_exflag.route_35 = 120; // 12 为菲娅恋慕线完结
    }
  } else if (stage >= 160 && stage < 170) {
    // :445-447 空分支：该部分判定移动至 aftertrain（照抄留空）
  } else if (stage >= 170 && stage < 180) {
    if (cflag(515) < 10) {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    } else if (cflag(515) === 10) {
      era_exflag.route_35 = 180;
    }
  } else if (stage >= 180 && stage < 190) {
    if (cflag(515) < 30) {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    } else if (cflag(515) === 30) {
      era_exflag.route_35 = 190;
    }
  } else if (stage >= 190 && stage < 200) {
    if (cflag(515) < 60) {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    } else if (cflag(515) === 60) {
      era_exflag.route_35 = 200;
    }
  } else if (stage >= 200 && stage < 210) {
    if (cflag(515) < 100) {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    } else if (cflag(515) === 100) {
      era_exflag.route_35 = 210;
    }
  } else if (stage >= 210 && stage < 220) {
    if (cflag(515) < 150) {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    } else if (cflag(515) === 150) {
      era_exflag.route_35 = 220; // 22 为菲娅淫乱线完结
    }
  }
  // :479-480 尾部 ELSE 空分支
}

/**
 * @ENDCHECKGODNESS（ENDINGDATA_ADDON1.ERB:1-144）：嘉德线（角色 33）的每日
 * 推进，线值 EX_FLAG:2810。
 *
 * 两处原作未完成区，照抄：
 *   - :3-24 与 :37-85 整段被 `;` 注释掉（含恋慕线阶梯与 CFLAG:1 == 9 的
 *     离队处置），不移植；
 *   - :98-101 与 :111-116 的 `SIF DAY:1 …` 只护住跳档那一行，计数器累加
 *     在分支内无条件执行（SIF 语义同 ENDCHECKSQUARE）；
 *   - :112 的 `EX_FLAG:2810 == 560` 位于 `[150,160)` 档内，恒假——死分支，
 *     与 560 转移整体的不可达（ENDCHECKGODNESS_SKY_TEMPLE 的守卫缺陷）
 *     是同一片未完成区。
 */
function endcheck_godness() {
  const cid = get_chara(33);
  const cflag = (idx) => get(`cflag:${cid}:${idx}`);
  const talent = (idx) => get(`talent:${cid}:${idx}`);

  // :27-35 通过实验室爱慕淫乱互换将导致剧情线重置
  if (
    talent(85) === 1 &&
    era_exflag.route_33 >= 110 &&
    era_exflag.route_33 <= 200
  ) {
    era_exflag.route_33 = 10; // 恋慕线起始 1
    era.set(`cflag:${cid}:515`, 0);
  } else if (
    talent(76) === 1 &&
    ((era_exflag.route_33 >= 30 && era_exflag.route_33 <= 100) ||
      (era_exflag.route_33 >= 300 && era_exflag.route_33 <= 310))
  ) {
    era_exflag.route_33 = 110; // 淫乱线起始 11
    era.set(`cflag:${cid}:515`, 0);
  }

  // :87-144 淫乱线（TALENT:76）阶梯。八档都是「门槛满足跳档、否则计数器
  // 累加」的同型块，逐档的源区间标在档位头上（行级锚只落在带动词的那一行）
  const stage = era_exflag.route_33;
  const lust = talent(76) === 1;
  if (lust && cflag(2) >= 2000 && stage < 10) {
    era_exflag.route_33 = 110; // :87-89 起步 11
    era.set(`cflag:${cid}:515`, 0);
  } else if (stage >= 110 && stage < 120) {
    // :90-93（门槛：好感 <= 5000 且计数器 >= 70；本档起计数器无条件累加）
    if (lust && cflag(2) <= 5000 && cflag(515) >= 70) {
      era_exflag.route_33 = 120;
    }
    era.set(`cflag:${cid}:515`, cflag(515) + 1);
  } else if (stage >= 110 && stage < 130) {
    // :94-97（120-129 档：好感 >= 8000）
    if (lust && cflag(2) >= 8000) {
      era_exflag.route_33 = 130;
    }
    era.set(`cflag:${cid}:515`, cflag(515) + 1);
  } else if (stage >= 130 && stage < 140) {
    // :98-101（攻 + 敏 >= 14）
    if (lust && get(`abl:${cid}:10`) + get(`abl:${cid}:16`) >= 14) {
      era_exflag.route_33 = 140;
    }
    era.set(`cflag:${cid}:515`, cflag(515) + 1);
  } else if (stage >= 140 && stage < 150) {
    // :102-109（计数器 >= 150 且 DAY:1 >= 350 且葵希罗在场）
    if (lust && cflag(515) >= 150) {
      if (era_flag.month >= 350 && get_chara(34)) {
        era_exflag.route_33 = 150;
      }
    } else {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    }
  } else if (stage >= 150 && stage < 160) {
    // :110-116（`EX_FLAG:2810 == 560` 与本档区间矛盾 → 恒假，原作缺陷，照抄）
    if (lust && cflag(515) >= 180) {
      if (era_flag.month >= 350 && era_exflag.route_33 === 560) {
        era_exflag.route_33 = 160;
      }
    } else {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    }
  } else if (stage >= 160 && stage < 170) {
    // :117-123（嘉德在场）
    if (lust && cflag(515) >= 200) {
      if (era_flag.month >= 350 && get_chara(33)) {
        era_exflag.route_33 = 170;
      }
    } else {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    }
  } else if (stage >= 170 && stage < 180) {
    // :124-130
    if (lust && cflag(515) >= 220) {
      if (era_flag.month >= 350 && get_chara(33)) {
        era_exflag.route_33 = 180;
      }
    } else {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    }
  } else if (stage >= 180 && stage < 190) {
    // :131-137
    if (lust && cflag(515) >= 250) {
      if (era_flag.month >= 350 && get_chara(33)) {
        era_exflag.route_33 = 190;
      }
    } else {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    }
  } else if (stage === 300) {
    // :138-143（计数器 >= 300）
    if (lust && cflag(515) >= 300) {
      era_exflag.route_33 = 310;
    } else {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    }
  }
}

/**
 * @ENDCHECKGODNESS_SKY_TEMPLE（ENDINGDATA_ADDON1.ERB:146-153）：嘉德离队后的
 * 天神宫线。500-510 / 520-530 / 530-540 三档是空分支；540-550 档的 560
 * 转移带 `GETCHARA(33) == 0` 守卫——GETCHARA 返回列表位置（不存在为 -1，
 * 见 emuera-basic-agent-guide references/commands/character.md:136），而
 * 0 号魔王恒占位置 0，故该条件在真机上永不成立、560 不可达。这是原作
 * 未完成区（#102 查明天神宫侵度 EX_FLAG:101 无写入点），照抄不修。
 */
function endcheck_godness_sky_temple() {
  const stage = era_exflag.route_33;
  if (stage >= 500 && stage < 510) {
    // :147 空分支
  } else if (stage >= 520 && stage < 530) {
    // :148 空分支
  } else if (stage >= 530 && stage < 540) {
    // :149 空分支
  } else if (stage >= 540 && stage < 550) {
    // :151-152 死守卫（见函数头注）
    if (get_chara(33) === 0 && era_flag.human_realm_event_stage === 3) {
      era_exflag.route_33 = 560;
    }
  }
}

/**
 * 主线剧情监测（原作 @ENDCHECK，ENDING ver 1.0.1.ERB :301-356）。
 * 每日一次，@EVENT_NEWDAY :241 调用。
 */
async function run_endcheck() {
  // :310 每日清场
  endreset();
  // :312 全局判定（五条线）
  endcheck_main();
  // :314-339 LOCAL:1..15 = 各线 flag % 100——死代码：赋值后无任何消费者
  // （:342 之后的分派直接读 EX_FLAG:(2800+LOCAL)），照搬不模拟（先例：
  // event-nextday.js 的 :11-12 SIF CONTINUE）
  // :342 角色线推进
  await endcheck_chara();
  // :344-349 分派循环：EX_FLAG:28xx 十位 = 小节、个位 = 0 才演出（防重播，
  // 演出函数尾部 += 1 置个位）。2801 == 99（Normal End 已定）时整体短路。
  // EX_FLAG:(2800+LOCAL) 是动态下标（原作拼名寻址的读侧），直读 + || 0
  if (era_exflag.first_run_deadline !== 99) {
    for (let local = 2; local < 16; local += 1) {
      const stage = era.get(`exflag:${2800 + local}`) || 0;
      if (stage % 10 === 0) {
        // TRYCALLFORM END{local}_{stage / 10}：Emuera 整数除法向零截断，
        // 等价 Math.trunc。小节为负合法（菲娅线崩坏态 2807 = -10 →
        // END7_-1，无定义静默）。实现缺失时 whenMissing 0 = TRYCALL
        // 落空 RESULT = 0 的缺省
        await END_FAMILY.call(local, {
          whenMissing: 0,
          args: [Math.trunc(stage / 10)],
        });
      }
    }
  }
  // :351-352 Normal End 演出：2801 == 99 && DAY:0 == 500
  if (era_exflag.first_run_deadline === 99 && era_flag.day_count === 500) {
    await ending_n();
  }
  // :354-356 TRYCALL END31——死引用（#14 缺陷 3）：全库无 @END31 定义，
  // EX_FLAG:2803 非零时原作静默无动作，1:1 保留 = 不实现、勿「修好」。
  // 2803 的真实消费者是 @DEBUG_CHECK（EVENT_TURNEND.ERB :237-308）
}

module.exports = {
  run_endcheck,
  END_FAMILY,
  endcheck_godness,
  endcheck_godness_sky_temple,
  endcheck_princess,
  endcheck_spade,
  endcheck_square,
};
