/**
 * @file run_endcheck 主线剧情监测全链（issue #116：S4「可空转」实现）。
 *
 * 调用关系（全库唯一调用点，已查实）：ere/event/event-nextday.js 的
 * run_event_newday 尾部（「主线剧情监测」，每日一次）。
 *
 * 本工单边界（#112 父票定「可空转」）：
 *   - 真做：endreset 十一角清场、endcheck_main 五条线、endcheck_chara 的
 *     七条素质定线与四条子判定**调用**、END 族分派循环。这些是纯 flag
 *     读写，无演出，是后续阶段的挂接面。
 *   - 四条角色线推进判定（endcheck_spade / endcheck_square /
 *     endcheck_godness / endcheck_godness_sky_temple / endcheck_princess）
 *     自 #404（N20）起为真身（见下方各函数）；ending_n 演出同一工单实现
 *     （ere/event/event-ending.js）。
 *
 * 说明：
 *   - GETCHARA(n) 按登记号寻址；ere 侧登记号已扁平化为角色号
 *     （#21，addCharacter(17) 后 cid=17），在场判定即列表包含。
 *   - EX_FLAG:2801-2815 读写一律走包装层（era-exflag.js，#113 落表）；
 *     葵希罗线的定线与清场落 FLAG 侧（era-flag.js 的 route_34，读写同侧
 *     自洽；族 15 无脚本、不进分派，该线值无消费者）。反叛结局的
 *     FLAG:2816 写入同样无消费点（死写入，保留）。
 *   - cflag/talent 的读是跨域读，放行（ADR-0002「跨域读放行」），直读
 *     + || 0 缺省处理（#13：未声明下标读得 undefined）。
 *   - 四条线状态机里的 `SIF` **只护住紧接的下一行**（引擎忽略缩进，
 *     条件语句不形成块）：endcheck_square 里 30-40 档的计数器清零在
 *     分支内无条件执行，不是书写错误，按现状保留，见该函数内注释。
 *     同理 endcheck_godness 各档里的 `SIF DAY:1 …` 只护住跳档那一行。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { END_FAMILY } = require('#/event/ending-family');
const { ending_n } = require('#/event/event-ending');

/**
 * RAND:N（0..N-1）的缺省实现（dungeon-lvup.js 同款）。四条线状态机
 * 只有两处随机（银黑桃 151 档以上的乳业收入 RAND:200、黑方片 300 档的
 * RAND:5），均由调用点可注入的随机源承担——测试给确定性源（#344）。
 */
function default_rand(n) {
  return Math.floor(Math.random() * n);
}

/** 二维表读点：未声明下标读得 undefined（#13），包装层同款 || 0 缺省处理 */
function get(name) {
  return era.get(name) || 0;
}

/** GETCHARA(n) 的等价物：在场返回角色号（= cid，#21 扁平化），不在场 -1 */
function get_chara(no) {
  return era.getAddedCharacters().includes(no) ? no : -1;
}

/**
 * 每日清场。剧情角色不在场则清对应线 flag；银黑桃/嘉德有段位检查——推进到
 * 离队死亡段（300/500+）后不归零重走。
 */
function endreset() {
  // 玛奥（角色号 17）
  if (get_chara(17) < 0) {
    era_exflag.route_17 = 0;
  }
  // 金红桃（20）
  if (get_chara(20) < 0) {
    era_exflag.route_20 = 0;
  }
  // 银黑桃（21）——段位 >= 300（放走/死亡段）不清
  if (get_chara(21) < 0 && era_exflag.route_21 < 300) {
    era_exflag.route_21 = 0;
  }
  // 黑方片（22）
  if (get_chara(22) < 0) {
    era_exflag.route_22 = 0;
  }
  // 白梅花（23）
  if (get_chara(23) < 0) {
    era_exflag.route_23 = 0;
  }
  // 莉莉（24）
  if (get_chara(24) < 0) {
    era_exflag.route_24 = 0;
  }
  // 琼（31）
  if (get_chara(31) < 0) {
    era_exflag.route_31 = 0;
  }
  // 普林希斯（32）
  if (get_chara(32) < 0) {
    era_exflag.route_32 = 0;
  }
  // 嘉德（33）——清场检查读自家线值 2810：写入侧是 2810，若误读银黑桃的
  // 2814，则 2814 < 500 恒真、检查形同虚设，嘉德离队后会每天清 2810——
  // #649 改正为读 2810，与写入同侧
  if (get_chara(33) < 0 && era_exflag.route_33 < 500) {
    era_exflag.route_33 = 0;
  }
  // 葵希罗（34）——清场落 FLAG 侧（见文件头）
  if (get_chara(34) < 0) {
    era_flag.route_34 = 0;
  }
  // 菲娅（35）
  if (get_chara(35) < 0) {
    era_exflag.route_35 = 0;
  }
}

/**
 * 全局判定：五条线。2802/2803/2804 的真实消费者是 debug_check（反作弊，
 * ere/event/event-turnend.js，随反作弊票）；本函数只负责置位。
 */
function endcheck_main() {
  // 一周目 500 日 Normal End 门槛：DAY:0 == 500 且主线空闲
  // （2801 == 0 未起步，或 >= 90 真结局收尾中）→ 置 99。99 同时是分派
  // 循环的短路条件
  if (
    era_flag.day_count === 500 &&
    (era_exflag.first_run_deadline === 0 || era_exflag.first_run_deadline >= 90)
  ) {
    era_exflag.first_run_deadline = 99;
  }

  // 资金异常：持有金超过「非作弊获得资金」追踪器 +8766 的容差
  // → 置 10（分派循环会拼出 END2_1，无定义，静默——反作弊计数器与剧情
  // flag 区间的碰撞，docs/research/ending-paths.md 第一节）
  if (era_flag.money > era_exflag.legit_money + 8766) {
    era_exflag.money_cheat_ending = 10;
  }

  // 奴隶魔力过载：任一角色（含 0 号魔王）CFLAG:9 >= 5000 且无
  // 占用/调教中标记（CFLAG:x:1 == 0）→ 记角色号。扫描从 0 号起、
  // 后命中覆盖先命中；ere 侧迭代序＝引擎键序
  // （getAddedCharacters 数值升序，#150），覆盖写语义同，「最后」＝
  // 最大命中 ID——非升序加入时与位序模型分道，取舍随 #21 的
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

  // 魔王自己过载（登记号 0 = 角色 0）：CFLAG:0:9 >= 1500 → 置 10，
  // 消费者是 debug_check 的大冲击 GAMEOVER
  if ((era.get('cflag:0:9') || 0) >= 1500) {
    era_exflag.maou_runaway_ending = 10;
  }

  // 反叛判定：威望（EX_FLAG:99）耗尽 → FLAG 侧 2816 置 10。
  // 全库无消费点（死写入），保留原状
  if (era_exflag.prestige <= 0) {
    era_flag.rebellion_ending = 10;
  }
}

/**
 * 七角素质定线表。结构：角色在场 && 线 flag == 0 → TALENT:85 恋慕置 10 /
 * TALENT:76 淫乱置 20。no = 角色号；holder/name = 线 flag 所在的包装层对象
 * 与访问器名（葵希罗线在 FLAG 侧，见文件头）。
 */
const LINE_STARTERS = [
  { no: 17, holder: era_exflag, name: 'route_17' }, // 玛奥
  { no: 20, holder: era_exflag, name: 'route_20' }, // 金红桃
  { no: 23, holder: era_exflag, name: 'route_23' }, // 白梅花
  { no: 24, holder: era_exflag, name: 'route_24' }, // 莉莉
  { no: 31, holder: era_exflag, name: 'route_31' }, // 琼
  { no: 32, holder: era_exflag, name: 'route_32' }, // 普林希斯
  { no: 34, holder: era_flag, name: 'route_34' }, // 葵希罗（FLAG 侧）
];

/**
 * 角色线推进：七条素质定线真做；四个推进状态机（好感/阶段计数器逐级爬段）
 * 自 #404 起为真身，见下方各 endcheck_* 函数。
 */
async function endcheck_chara() {
  for (const starter of LINE_STARTERS) {
    if (get_chara(starter.no) > 0) {
      // 线 flag 未起步才定线
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

  // 银黑桃（21）：在场且段位 < 300 才判定（300+ 是放走/死亡段）
  if (get_chara(21) > 0 && era_exflag.route_21 < 300) {
    await endcheck_spade();
  }
  // 黑方片（22）：在场即判定（无段位检查）
  if (get_chara(22) > 0) {
    endcheck_square();
  }
  // 嘉德（33）：< 500 段在场判定；>= 500 段离队后转天神宫线
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
  // 菲娅（35）：判定状态机含线起步（2807 = 10 初次会面）
  if (get_chara(35) > 0) {
    endcheck_princess();
  }
}

/**
 * endcheck_square：黑方片线（角色 22）的每日推进。
 *
 * 线值 EX_FLAG:2811：10-90 是恋慕线的逐档推进，110-200 是淫乱线，300-310
 * 是「放走/死亡」段（爱慕淫乱互换重置与 300 档）。计数器
 * CFLAG:22:515 承担「材料累积到阈值才跳档」。
 *
 * @param {(n: number) => number} [rand] RAND:5 的随机源（300 档掷骰）
 */
function endcheck_square(rand = default_rand) {
  const cid = get_chara(22); // GETCHARA(22)：不在场为 -1（读数全 0，调用方已检查）
  const cflag = (idx) => get(`cflag:${cid}:${idx}`);
  const talent = (idx) => get(`talent:${cid}:${idx}`);

  // 通过实验室爱慕淫乱互换将导致剧情线重置
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

  // 恋慕线（TALENT:85）阶梯。快照 stage：ELSEIF 链内只有一支命中
  const stage = era_exflag.route_22;
  const love = talent(85) === 1;
  if (love && cflag(2) >= 2000 && stage < 10) {
    era_exflag.route_22 = 10; // 起步
  } else if (stage >= 10 && stage < 20) {
    if (love && cflag(2) >= 5000) {
      era_exflag.route_22 = 20;
    }
  } else if (stage >= 20 && stage < 30) {
    if (love && cflag(2) >= 10000) {
      era_exflag.route_22 = 30;
    }
  } else if (stage >= 30 && stage < 40) {
    // ：SIF 只护住本档的跳档，计数器清零在下一行、分支内无条件
    // 执行（引擎忽略缩进，本文件头注有据）——状态机的既有行为，保留不扩成 SIF 块
    if (love && get(`abl:${cid}:10`) + get(`abl:${cid}:16`) >= 14) {
      era_exflag.route_22 = 40;
    }
    era.set(`cflag:${cid}:515`, 0);
  } else if (stage >= 40 && stage < 50) {
    if (love && cflag(515) >= 10) {
      era_exflag.route_22 = 50;
    } else {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
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
    // 300 档：1/5 概率推进到 310（无门槛，计数器不动）。
    // 300 档以下还有一段被 `;` 注释掉的代码，不移植
    if (rand(5) === 0) {
      era_exflag.route_22 = era_exflag.route_22 + 10;
    }
  }
}

/**
 * endcheck_spade：银黑桃线（角色 21）的每日推进。
 *
 * 线值 EX_FLAG:2814：30-90 恋慕 / 110-200 淫乱 / 300-310 放走段；
 * 151 档以上每日产奶收入（MONEY 与 EX_FLAG:4444 同步）。原清单里
 * `[SKIPSTART]…[SKIPEND]` 段（CFLAG:1 == 9 的离队处置）是被主动括起来的
 * 死代码，不移植。
 *
 * @param {(n: number) => number} [rand] RAND:200 的随机源（乳业收入）
 */
async function endcheck_spade(rand = default_rand) {
  const cid = get_chara(21);
  const cflag = (idx) => get(`cflag:${cid}:${idx}`);
  const talent = (idx) => get(`talent:${cid}:${idx}`);

  // 151 档以上：乳业收入 = (线值-140)/10 × (RAND:200 + 200)
  if (era_exflag.route_21 >= 151) {
    const income =
      Math.trunc((era_exflag.route_21 - 140) / 10) * (rand(200) + 200);
    era.print(`银黑桃乳业获得的收入desu，一共${income}哟~`); // PRINTFORMW
    await era.waitAnyKey();
    era_flag.money = era_flag.money + income; // MONEY +=
    era_exflag.legit_money = era_exflag.legit_money + income;
  }

  // 通过实验室爱慕淫乱互换将导致剧情线重置
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

  // 恋慕线（TALENT:85）
  const stage = era_exflag.route_21;
  const love = talent(85) === 1;
  if (love && cflag(2) >= 2000 && stage < 10) {
    era_exflag.route_21 = 10; // 起步
  } else if (stage >= 10 && stage < 20) {
    if (love && cflag(2) >= 5000) {
      era_exflag.route_21 = 20;
    }
  } else if (stage >= 20 && stage < 30) {
    if (love && cflag(2) >= 10000) {
      era_exflag.route_21 = 30;
    }
  } else if (stage >= 30 && stage < 40) {
    // ：SIF 只护住跳档那一行，计数器清零在分支内无条件（同 SQUARE）
    if (love && get(`abl:${cid}:10`) + get(`abl:${cid}:16`) >= 14) {
      era_exflag.route_21 = 40;
    }
    era.set(`cflag:${cid}:515`, 0);
  } else if (stage >= 40 && stage < 50) {
    if (love && cflag(515) >= 10) {
      era_exflag.route_21 = 50;
    } else {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
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
      era_exflag.route_21 = 310;
    } else {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    }
  }

  // 淫乱线（TALENT:76）。**重新快照**：上面那支可能刚改过线值
  const lust_stage = era_exflag.route_21;
  const lust = talent(76) === 1;
  if (lust && cflag(2) >= 2000 && lust_stage < 10) {
    era_exflag.route_21 = 110; // 起步 11
    era.set(`cflag:${cid}:515`, 0);
  } else if (lust_stage >= 110 && lust_stage < 120) {
    if (lust && cflag(2) >= 5000) {
      era_exflag.route_21 = 120;
    }
  } else if (lust_stage >= 120 && lust_stage < 130) {
    // 这一档没有素质检查（有意保留）
    if (cflag(515) >= 2) {
      era_exflag.route_21 = 130;
    } else {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    }
  } else if (lust_stage >= 130 && lust_stage < 140) {
    if (lust && cflag(2) >= 10000) {
      era_exflag.route_21 = 140;
    }
  } else if (lust_stage >= 140 && lust_stage < 150) {
    if (
      lust &&
      get(`abl:${cid}:1`) === 10 &&
      get(`abl:${cid}:17`) === 5 &&
      get(`talent:${cid}:78`) === 1 &&
      get(`talent:${cid}:0`) === 0
    ) {
      era_exflag.route_21 = 150;
      era.set(`cflag:${cid}:515`, 0);
    }
  } else if (lust_stage >= 150 && lust_stage < 160) {
    if (lust && cflag(515) >= 10) {
      era_exflag.route_21 = 160;
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
 * endcheck_princess：菲娅线（角色 35）的每日推进。
 *
 * 线值 EX_FLAG:2807：10（初次会面）/ -10（崩坏态 → 当天 Bad Ending 占位段）/ 30-120 恋慕 /
 * 130-220 淫乱。160-170 档是空分支（判定已移到 aftertrain），
 * 保留为空分支。
 */
function endcheck_princess() {
  const cid = get_chara(35);
  const cflag = (idx) => get(`cflag:${cid}:${idx}`);
  const talent = (idx) => get(`talent:${cid}:${idx}`);

  // 初次会面：在场且线值 0 → 10
  if (get_chara(35) > 0 && era_exflag.route_35 === 0) {
    era_exflag.route_35 = 10;
  }

  // 通过实验室爱慕淫乱互换将导致剧情线重置
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

  // 阶梯
  const stage = era_exflag.route_35;
  if (stage >= 10 && stage < 20) {
    // MARK:1/2 == 3 的崩坏判定（TALENT:0 真 = 处女）
    if (get(`mark:${cid}:1`) === 3 && talent(0)) {
      era_exflag.route_35 = 20;
    } else if (
      (get(`mark:${cid}:1`) === 3 || get(`mark:${cid}:2`) === 3) &&
      talent(0) === 0
    ) {
      era_exflag.route_35 = -10; // 崩坏态：当天分派 END7_-1（Bad Ending 占位段）
    }
  } else if (stage >= 20 && stage < 30) {
    // 素质定线
    if (talent(85) === 1) {
      era_exflag.route_35 = 30; // 恋慕线起始 3
    } else if (talent(76) === 1) {
      era_exflag.route_35 = 130; // 淫乱线起始 13
    }
  } else if (stage >= 30 && stage < 40) {
    if (cflag(2) >= 2000) {
      era_exflag.route_35 = 40;
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
    // 婚礼门槛：CFLAG:601 == 901
    if (cflag(601) === 901) {
      era_exflag.route_35 = 70;
      era.set(`cflag:${cid}:515`, 0);
    }
  } else if (stage >= 70 && stage < 80) {
    // 计数器爬到 10 跳档
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
    // 空分支：该部分判定在 aftertrain（event-aftertrain.js）
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
  // 尾部 ELSE 空分支
}

/**
 * endcheck_godness：嘉德线（角色 33）的每日推进，线值 EX_FLAG:2810。
 *
 * 两片未完成区保留原状：
 *   - 首段与重置段整段被 `;` 注释掉（含恋慕线阶梯与 CFLAG:1 == 9 的
 *     离队处置），不移植；
 *   - 各档的 `SIF DAY:1 …` 只护住跳档那一行，计数器累加
 *     在分支内无条件执行（SIF 语义同 endcheck_square）；
 *   - 150 档内的 `EX_FLAG:2810 == 560` 与档区间矛盾，恒假——死分支，
 *     与 560 转移整体的不可达（endcheck_godness_sky_temple 的检查缺陷）
 *     是同一片未完成区。
 */
function endcheck_godness() {
  const cid = get_chara(33);
  const cflag = (idx) => get(`cflag:${cid}:${idx}`);
  const talent = (idx) => get(`talent:${cid}:${idx}`);

  // 通过实验室爱慕淫乱互换将导致剧情线重置
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

  // 淫乱线（TALENT:76）阶梯。八档都是「门槛满足跳档、否则计数器
  // 累加」的同型块，各档的门槛注记在档位头上
  const stage = era_exflag.route_33;
  const lust = talent(76) === 1;
  if (lust && cflag(2) >= 2000 && stage < 10) {
    era_exflag.route_33 = 110; // 起步 11
    era.set(`cflag:${cid}:515`, 0);
  } else if (stage >= 110 && stage < 120) {
    // （门槛：好感 <= 5000 且计数器 >= 70；本档起计数器无条件累加）
    if (lust && cflag(2) <= 5000 && cflag(515) >= 70) {
      era_exflag.route_33 = 120;
    }
    era.set(`cflag:${cid}:515`, cflag(515) + 1);
  } else if (stage >= 110 && stage < 130) {
    // （120-129 档：好感 >= 8000）
    if (lust && cflag(2) >= 8000) {
      era_exflag.route_33 = 130;
    }
    era.set(`cflag:${cid}:515`, cflag(515) + 1);
  } else if (stage >= 130 && stage < 140) {
    // （攻 + 敏 >= 14）
    if (lust && get(`abl:${cid}:10`) + get(`abl:${cid}:16`) >= 14) {
      era_exflag.route_33 = 140;
    }
    era.set(`cflag:${cid}:515`, cflag(515) + 1);
  } else if (stage >= 140 && stage < 150) {
    // （计数器 >= 150 且 DAY:1 >= 350 且葵希罗在场）
    if (lust && cflag(515) >= 150) {
      if (era_flag.month >= 350 && get_chara(34)) {
        era_exflag.route_33 = 150;
      }
    } else {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    }
  } else if (stage >= 150 && stage < 160) {
    // （`EX_FLAG:2810 == 560` 与本档区间矛盾 → 恒假，未完成区域的残留条件，保留）
    if (lust && cflag(515) >= 180) {
      if (era_flag.month >= 350 && era_exflag.route_33 === 560) {
        era_exflag.route_33 = 160;
      }
    } else {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    }
  } else if (stage >= 160 && stage < 170) {
    // （嘉德在场）
    if (lust && cflag(515) >= 200) {
      if (era_flag.month >= 350 && get_chara(33)) {
        era_exflag.route_33 = 170;
      }
    } else {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    }
  } else if (stage >= 170 && stage < 180) {
    if (lust && cflag(515) >= 220) {
      if (era_flag.month >= 350 && get_chara(33)) {
        era_exflag.route_33 = 180;
      }
    } else {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    }
  } else if (stage >= 180 && stage < 190) {
    if (lust && cflag(515) >= 250) {
      if (era_flag.month >= 350 && get_chara(33)) {
        era_exflag.route_33 = 190;
      }
    } else {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    }
  } else if (stage === 300) {
    // （计数器 >= 300）
    if (lust && cflag(515) >= 300) {
      era_exflag.route_33 = 310;
    } else {
      era.set(`cflag:${cid}:515`, cflag(515) + 1);
    }
  }
}

/**
 * endcheck_godness_sky_temple：嘉德离队后的天神宫线。500-510 / 520-530 /
 * 530-540 三档是空分支；540-550 档的 560 转移带 `GETCHARA(33) == 0`
 * 检查——GETCHARA 返回列表位置（不存在为 -1），而 0 号魔王恒占位置 0，
 * 故该条件永不成立、560 不可达。这是未完成区域（#102 查明天神宫侵度
 * EX_FLAG:101 无写入点），保留原状。
 */
function endcheck_godness_sky_temple() {
  const stage = era_exflag.route_33;
  if (stage >= 500 && stage < 510) {
    // 空分支
  } else if (stage >= 520 && stage < 530) {
    // 空分支
  } else if (stage >= 530 && stage < 540) {
    // 空分支
  } else if (stage >= 540 && stage < 550) {
    // 死检查（见函数头注）
    if (get_chara(33) === 0 && era_flag.human_realm_event_stage === 3) {
      era_exflag.route_33 = 560;
    }
  }
}

/**
 * 主线剧情监测：每日清场、全局判定、角色线推进、END 族分派与 Normal End
 * 演出。每日一次，run_event_newday 尾部调用。
 */
async function run_endcheck() {
  // 每日清场
  endreset();
  // 全局判定（五条线）
  endcheck_main();
  // 角色线推进
  await endcheck_chara();
  // 分派：只巡有脚本的四族（7 菲娅 / 10 嘉德 / 11 黑方片 / 14 银黑桃；其余
  // 族全库无脚本，不再遍历——反作弊计数器 2802/2803/2804 与葵希罗线值落进
  // 2800+线号 区间的每日空转碰撞随之消失）。读各线 EX_FLAG，十位 = 小节、
  // 个位 = 0 才演出（防重播，演出函数尾部 += 1 置个位）。
  // 2801 == 99（Normal End 已定）时整体短路。
  if (era_exflag.first_run_deadline !== 99) {
    for (const family of [7, 10, 11, 14]) {
      // EX_FLAG:(2800+族号) 是动态下标（拼名寻址的读侧），直读 + || 0
      const stage = era.get(`exflag:${2800 + family}`) || 0;
      if (stage % 10 === 0) {
        // TRYCALLFORM END{族号}_{stage / 10}：整数除法向零截断
        // （Math.trunc）。小节为负合法（菲娅线崩坏态 2807 = -10 →
        // END7_-1，Bad Ending 占位段，见 ending-scripts.js）。空小节
        // whenMissing 0 = TRYCALL 落空
        // RESULT = 0 的缺省
        await END_FAMILY.call(family, {
          whenMissing: 0,
          args: [Math.trunc(stage / 10)],
        });
      }
    }
  }
  // Normal End 演出：2801 == 99 && DAY:0 == 500
  if (era_exflag.first_run_deadline === 99 && era_flag.day_count === 500) {
    await ending_n();
  }
  // 尾部无 END31 调用：EX_FLAG:2803（失控奴隶号）的消费者是 debug_check
  // （event-turnend.js），#649 删除了全库无定义的 END31 死引用
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
