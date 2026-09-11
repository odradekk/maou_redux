/**
 * @file 特殊素质获得判定（issue #405）：调教/据点侧信息达标后追加素质与
 * 强制体变的检查。
 *
 * 源: target/ERB/EVENT/GET_SPECIALTALENT.ERB  @CHECK_SPECIALSKIL（:7-739，
 *     含 $STEP1/$STEP2 两段标签、$ADD_SEXSKILL/$END_SEXSKILL 子标签）、
 *     @CHECK_SPECIALSKIL_BODYSHIFT（:740-752）
 *
 * 调用点 EVENT_TURNEND.ERB:20、調教相關/TRAIN_MAIN.ERB:544（`ere/system/
 * train/juel-check.js` 内已有的 `stub_line('CHECK_SPECIALSKIL', …)`）都在
 * #400/#401 范围内，本票只落函数真身，签名定死为
 * `check_specialskil(cid, seiin = 0)`（原作 `@CHECK_SPECIALSKIL, SEIIN = 0`
 * 的默认参数写法逐字对应），不改任何调用点。
 *
 * 移植说明：
 *   - `SIF TARGET < 0 || TARGET >= CHARANUM` 按 #21 扁平化的 ID 语义改写
 *     （page-select-target.js 先例）：判「cid 不在已加入角色列表」；
 *   - 全篇 `%TALENTNAME:n%`/`%EX_TALENTNAME:n%` 一律走名字表运行时查询
 *     （`talentname:n`/`ex_talentname(n)`），不硬编码中文标签——原作即是
 *     数据驱动查表，硬编码等于另开一份可能与 `yml/Talent.yml` 漂移的
 *     真相源；
 *   - **`:719-734`（闘姫の修得，`EXP:76 → TALENT:188`）是原作死代码**：
 *     紧邻的上一句 `:714-716` 是无条件 `CALL CHECK_SPECIALSKIL_BODYSHIFT`
 *     + `RETURN 0`（`grep -n` 核对过其上全部 IF/ENDIF 均已闭合，两行是
 *     顶层无条件语句），此后的闘姫判定永远执行不到；全库唯一给
 *     `TALENT:188` 赋值的地方就是这段死代码，「争斗女王」素质因此在原作
 *     里事实上从未被授予。移植不构造这段不可达逻辑（同 issue #14 已登记
 *     的 `END31`/`KOJO_EVENT_COM` 同类死代码处置口径：不实现，登记说明）；
 *   - `PRECIPITATE_WITHDRAWAL_BE_A_WRECK` 式的「门槛与生效素质错位」在本
 *     文件不存在，但**「強化素質」段的 101/103 两个移除走 PRINTFORMW（等
 *     键），105/107 两个走 PRINTFORM（不等键）**——原作字面量如此，逐字
 *     保留这一不对称；
 *   - CFLAG:9 之外没有其他跨函数残留依赖，TARGET 全部显式改成 `cid` 参数
 *     （issue #5 决议第 6 条：函数内部一律参数化，不读全局角色指针）。
 */

'use strict';

const era = require('#/era-electron');
const { game } = require('#/facade/game');
const { chara_callname, chara_nickname } = require('#/utils/callname-utils');
const { ex_talentname } = require('#/chara/chara-ex');

const MASTER = 0;

function get(name) {
  return era.get(name) || 0;
}
function talent(cid, n) {
  return get(`talent:${cid}:${n}`);
}
function set_talent(cid, n, v) {
  era.set(`talent:${cid}:${n}`, v);
}
function abl(cid, n) {
  return get(`abl:${cid}:${n}`);
}
function set_abl(cid, n, v) {
  era.set(`abl:${cid}:${n}`, v);
}
function exp(cid, n) {
  return get(`exp:${cid}:${n}`);
}
function cflag(cid, n) {
  return get(`cflag:${cid}:${n}`);
}
function set_cflag(cid, n, v) {
  era.set(`cflag:${cid}:${n}`, v);
}
function mark(cid, n) {
  return get(`mark:${cid}:${n}`);
}
function juel(cid, n) {
  return get(`juel:${cid}:${n}`);
}
function base(cid, n) {
  return get(`base:${cid}:${n}`);
}
function talent_name(n) {
  return era.get(`talentname:${n}`) || '';
}
function she(cid) {
  return talent(cid, 122) ? '他' : '她';
}

/** 通用「素质消失」渲染：PRINTFORMW（等键）+ TALENT:id = 0 */
async function remove_talent_wait(cid, id) {
  if (talent(cid, id)) {
    await era.printAndWait(
      `${chara_callname(cid)}失去了【${talent_name(id)}】。`,
    );
    set_talent(cid, id, 0);
  }
}

/** 通用「素质消失」渲染：PRINTFORM（不等键）+ TALENT:id = 0（強化素質段用） */
function remove_talent_now(cid, id) {
  if (talent(cid, id)) {
    era.print(`${chara_callname(cid)}失去了【${talent_name(id)}】。`);
    set_talent(cid, id, 0);
  }
}

/**
 * 【克制(20)】【冷漠(21)】的组合消失渲染（:65-79 / :146-160 同形两处）：
 * 一行内拼出「的【…】【…】失去了。」+「否定点数减半。」+ JUEL:100 减半。
 */
function remove_dislike_talents_20_21(cid) {
  if (talent(cid, 20) || talent(cid, 21)) {
    let line = `${chara_callname(cid)}的`;
    if (talent(cid, 20)) {
      line += `【${talent_name(20)}】`;
      set_talent(cid, 20, 0);
    }
    if (talent(cid, 21)) {
      line += `【${talent_name(21)}】`;
      set_talent(cid, 21, 0);
    }
    era.print(`${line}失去了。`);
    era.print('否定点数减半。');
    era.set(`juel:${cid}:100`, Math.floor(juel(cid, 100) / 2));
  }
}

/**
 * 【压抑(32)】【抵抗(34)】【嫉妒(84)】的组合消失渲染（:166-184 / :570-588
 * 同形两处）。**原作 bug 逐字保留**：TALENT:84 分支打印的是
 * `%TALENTNAME:32%`（压抑）而非 84 号自身的名字——两处出处一致，非本
 * 项目误读，照抄不改。
 */
function remove_dislike_talents_32_34_84(cid) {
  if (talent(cid, 32) || talent(cid, 34) || talent(cid, 84)) {
    let line = `${chara_callname(cid)}的`;
    if (talent(cid, 32)) {
      line += `【${talent_name(32)}】`;
      set_talent(cid, 32, 0);
    }
    if (talent(cid, 34)) {
      line += `【${talent_name(34)}】`;
      set_talent(cid, 34, 0);
    }
    if (talent(cid, 84)) {
      line += `【${talent_name(32)}】`; // 原作 bug：应为 talent_name(84)
      set_talent(cid, 84, 0);
    }
    era.print(`${line}失去了。`);
    era.print('否定点数减半。');
    era.set(`juel:${cid}:100`, Math.floor(juel(cid, 100) / 2));
  }
}

/**
 * 【贞操封印(273)】力量消失后的解封选择（:106-125 / :213-232 同形两处，
 * `$INPUT_LOOP_SEAL`/`$INPUT_LOOP_SEAL_2`）。
 */
async function offer_release_seal(cid) {
  const name = chara_callname(cid);
  await era.printAndWait(`${name}的【${talent_name(273)}】的力量消失了……`);
  await era.printAndWait('如果是现在的话，可以解开封印。要解开封印吗？');
  era.println();
  for (;;) {
    era.print(' [0] - 保留封印');
    era.print(' [1] - 解开封印');
    const result = await era.input();
    if (result === 0 || result === 1) {
      if (result === 1) {
        await era.printAndWait(`${name}失去了【${talent_name(273)}】。`);
        set_talent(cid, 273, 0);
      }
      return;
    }
  }
}

/** 玛奥（预设角色 17）的替身判定（:127-131 / :234-238 同形两处） */
async function check_mao_avatar(cid) {
  if (cid === 17) {
    // #21：角色号=预设号，NO:TARGET==17 直译为 cid===17
    era.set(`ex_talent:${cid}:3`, 1);
    await era.printAndWait(
      `${chara_callname(cid)}一阵眩晕、似乎拥有了【${ex_talentname(3)}】的素质……`,
    );
  }
}

/**
 * $STEP1 内【爱慕(85)】的觉醒分支（:39-132）：顺从经验 1000 以上、条件
 * 达标时授予【爱慕】，并清理一批互斥/负面素质。
 */
async function love_awakening(cid) {
  const name = chara_callname(cid);
  await era.printAndWait(`${name}柔情似水地看着你…`);
  era.print(
    `${name}因${chara_nickname(MASTER)}的行为而感到喜悦。想粘着你，想为你分忧，为你做些什么…渴望着你的宠爱。`,
  );
  await era.printAndWait(`${name}获得了【${talent_name(85)}】。`);
  set_talent(cid, 85, 1);

  if (talent(cid, 76) === 0) {
    game.event.爱或淫乱人数 += 1; // FLAG:30
  }

  // 【傲娇(18)】+【反抗(11)】→【反抗】变【顺从相关(13)】
  if (talent(cid, 11) && talent(cid, 18)) {
    await era.printAndWait(
      `${name}失去了【${talent_name(11)}】，获得了【${talent_name(13)}】。`,
    );
    set_talent(cid, 11, 0);
    set_talent(cid, 13, 1);
  }
  // 非【傲娇】的【反抗】直接消失
  if (talent(cid, 18) === 0 && talent(cid, 11)) {
    await era.printAndWait(`${name}失去了【${talent_name(11)}】。`);
    set_talent(cid, 11, 0);
  }

  remove_dislike_talents_20_21(cid);
  await remove_talent_wait(cid, 27); // 一线不越
  await remove_talent_wait(cid, 151); // 绝不侍奉
  await remove_talent_wait(cid, 84); // 嫉妒

  if (base(cid, 10) > 0) {
    const remaining = Math.floor(base(cid, 10) / 2);
    await era.printAndWait(`${name}时日无多，生命还剩下${remaining}天。`);
  }
  if (talent(cid, 274)) {
    // TALENT:魂缚（yml/Talent.yml id 274）
    era.print(`${name}被束缚的灵魂，在向自己的爱与欲望屈服时被解放了。`);
    await era.printAndWait(`${name}失去了【${talent_name(274)}】。`);
    set_talent(cid, 274, 0);
  }
  if (talent(cid, 273) === 1) {
    await offer_release_seal(cid);
  }
  await check_mao_avatar(cid);
}

/**
 * $STEP1 内【淫乱(76)】的觉醒分支（:134-239）：欲望与感觉综合值达标时
 * 授予【淫乱】，并清理一批互斥/负面素质与种族堕落转化。
 */
async function lewdness_awakening(cid) {
  const name = chara_callname(cid);
  await era.printAndWait(`${name}看你的眼神，好像忘记了你还有上半身…`);
  era.print(`${name}沉迷于${chara_nickname(MASTER)}给予的快感之中了……`);
  await era.printAndWait(`${name}获得了【${talent_name(76)}】。`);
  set_talent(cid, 76, 1);

  if (talent(cid, 85) === 0) {
    game.event.爱或淫乱人数 += 1; // FLAG:30
  }

  remove_dislike_talents_20_21(cid);
  await remove_talent_wait(cid, 27); // 一线不越
  remove_dislike_talents_32_34_84(cid); // 压抑/抵抗/嫉妒（原作 bug 保留）
  await remove_talent_wait(cid, 71); // 否定快感
  await remove_talent_wait(cid, 150); // 从不自慰

  // 悪堕ちする种族は悪堕ちする（未持有【魂缚】才判定）
  if (talent(cid, 274) === 0) {
    if (talent(cid, 314) === 1) {
      await era.printAndWait(`${name}从高洁的精灵，堕落为卑微的肉壶了。`);
      set_talent(cid, 314, 7);
      if (talent(cid, 244) === 0) {
        set_talent(cid, 253, 1); // 青肌以外变褐色肌
      }
      set_talent(cid, 255, 0);
    } else if (talent(cid, 314) === 6) {
      await era.printAndWait(
        `${name}纯洁的灵魂完全堕落了，成为了被淫靡欲望所支配的下等性奴隶。`,
      );
      set_talent(cid, 314, 8);
      if (talent(cid, 244) === 0) {
        set_talent(cid, 253, 1);
      }
      set_talent(cid, 255, 0);
    }
  }

  if (talent(cid, 273) === 1) {
    await offer_release_seal(cid);
  }
  await check_mao_avatar(cid);
}

/** $STEP1（:23-256）：MARK:3==0（无反抗刻印）时的忠诚度进阶判定 */
async function step1(cid) {
  const name = chara_callname(cid);
  if (
    cflag(cid, 2) >= 2000 &&
    cflag(cid, 0) < 2 &&
    (talent(cid, 76) || talent(cid, 85))
  ) {
    // :26-35 顺从 Lv5 达成 + 可卖出/助手化
    await era.printAndWait(`${name}带着崇敬的眼神看着你…`);
    era.print(
      `${name}无论是灵魂还是肉体，都全心全意地献给${chara_nickname(MASTER)}了…`,
    );
    if (abl(cid, 10) < 5) {
      set_abl(cid, 10, 5);
      era.print('顺从LV5了');
    }
    if (cflag(cid, 0) < 1) {
      era.print(`${name}可以被卖掉了。`);
    }
    await era.printAndWait(`${name}可以做助手了。`);
    set_cflag(cid, 0, 2);
  } else if (cflag(cid, 2) >= 1000) {
    if (
      abl(cid, 10) >= 3 &&
      exp(cid, 21) >= 200 && // EXPLV:5（era-utils/exp-level.js）
      talent(cid, 76) === 0 &&
      talent(cid, 85) === 0 &&
      talent(cid, 184) === 0 &&
      mark(cid, 2) === 3 &&
      abl(cid, 16) >= 3
    ) {
      await love_awakening(cid);
    } else if (
      abl(cid, 11) >= 3 &&
      abl(cid, 0) + abl(cid, 1) + abl(cid, 2) + abl(cid, 3) >= 10 &&
      exp(cid, 50) >= 3 &&
      talent(cid, 85) === 0 &&
      talent(cid, 76) === 0 &&
      mark(cid, 1) === 3 &&
      mark(cid, 2) === 3
    ) {
      await lewdness_awakening(cid);
    }

    if (
      cflag(cid, 2) >= 5000 &&
      abl(cid, 10) >= 5 &&
      mark(cid, 1) === 3 &&
      mark(cid, 2) === 3
    ) {
      await remove_talent_wait(cid, 150);
      await remove_talent_wait(cid, 151);
      await remove_talent_wait(cid, 152);
    }
  }
}

/** :261-279 精饮相关素质【喜欢精液(47)】 */
async function semen_liking(cid) {
  if (talent(cid, 47) !== 0) {
    return;
  }
  const name = chara_callname(cid);
  if (
    abl(cid, 12) >= 7 &&
    abl(cid, 13) >= 7 &&
    exp(cid, 22) >= 2000 &&
    talent(cid, 52) === 0 &&
    cflag(cid, 600) >= 100
  ) {
    await era.printAndWait(
      `${name}因为不断地强制精饮绝顶，终于完全适应了精液的味道……`,
    );
    await era.printAndWait('甚至还喜欢上了。');
    await era.printAndWait(`${name}获得了【${talent_name(47)}】。`);
    set_talent(cid, 47, 1);
  } else if (
    abl(cid, 12) >= 5 &&
    abl(cid, 13) >= 5 &&
    exp(cid, 22) >= 1500 &&
    talent(cid, 52) === 0 &&
    cflag(cid, 600) >= 80
  ) {
    await era.printAndWait(`${name}喜欢上了精液的味道……`);
    await era.printAndWait(`${name}获得了【${talent_name(47)}】。`);
    set_talent(cid, 47, 1);
  } else if (
    abl(cid, 12) >= 5 &&
    abl(cid, 13) >= 5 &&
    exp(cid, 22) >= 1000 &&
    talent(cid, 52) &&
    cflag(cid, 600) >= 50
  ) {
    await era.printAndWait(`${name}感到似乎离不开精液了……`);
    await era.printAndWait(`${name}获得了【${talent_name(47)}】。`);
    set_talent(cid, 47, 1);
  }
}

/** :284-298 特殊技能素质【擅用舌头(52)】 */
async function skilled_tongue(cid) {
  const name = chara_callname(cid);
  if (talent(cid, 51)) {
    if (
      abl(cid, 12) >= 7 &&
      abl(cid, 13) >= 7 &&
      exp(cid, 22) >= 1500 &&
      talent(cid, 52) === 0
    ) {
      await era.printAndWait(
        `${name}通过持续的侍奉，侍奉技术获得了飞跃的进步……`,
      );
      await era.printAndWait(`${name}获得了【${talent_name(52)}】。`);
      set_talent(cid, 52, 1);
    }
  } else if (
    abl(cid, 12) >= 5 &&
    abl(cid, 13) >= 5 &&
    exp(cid, 22) >= 1000 &&
    talent(cid, 52) === 0
  ) {
    await era.printAndWait(`${name}的侍奉技术精进了……`);
    await era.printAndWait(`${name}获得了【${talent_name(52)}】。`);
    set_talent(cid, 52, 1);
  }
}

/** :305-352 特殊性癖/性感素质：施虐狂/受虐狂/露出狂/牝犬/主从逆转·异种恋慕 */
async function fetish_talents(cid) {
  const name = chara_callname(cid);

  if (
    abl(cid, 20) >= 4 &&
    abl(cid, 12) >= 4 &&
    exp(cid, 33) >= 300 &&
    talent(cid, 83) === 0
  ) {
    await era.printAndWait(`${name}的眼神变得凌厉了…`);
    era.print(`${name}学会了将快乐建立在他人的痛苦之上。`);
    await era.printAndWait(`${name}获得了【${talent_name(83)}】。`);
    set_talent(cid, 83, 1);
  }

  if (
    abl(cid, 21) >= 4 &&
    abl(cid, 17) >= 2 &&
    exp(cid, 30) >= 300 &&
    talent(cid, 88) === 0
  ) {
    await era.printAndWait(`${name}的眼神变得卑微了…`);
    era.print('将痛楚和快感视为一体，学会了享受被支配，被凌辱的喜悦。');
    await era.printAndWait(`${name}获得了【${talent_name(88)}】。`);
    set_talent(cid, 88, 1);
  }

  if (
    abl(cid, 17) >= 4 &&
    abl(cid, 21) >= 2 &&
    exp(cid, 11) + exp(cid, 31) + exp(cid, 54) >= 200 &&
    talent(cid, 89) === 0
  ) {
    await era.printAndWait(`${name}的神情变得害羞…`);
    era.print(
      `但是，却学会了将这份羞耻变成快感。将自己的被羞辱的姿态呈现他人，令${she(cid)}感到身心无比圆满。`,
    );
    await era.printAndWait(`${name}获得了【${talent_name(89)}】。`);
    set_talent(cid, 89, 1);
  }

  if (
    abl(cid, 11) >= 5 &&
    abl(cid, 39) >= 3 &&
    exp(cid, 56) >= 300 &&
    talent(cid, 136) === 0
  ) {
    await era.printAndWait(`${name}的行为彻底变化了…`);
    era.print('整天喜欢四脚爬爬地在地上爬行，一边扭腰抬臀，一边仰视着你。');
    era.print('完全像是一只发春的牝犬一样。');
    await era.printAndWait(`${name}获得了【${talent_name(136)}】。`);
    set_talent(cid, 136, 1);
  }

  if (
    abl(cid, 11) >= 3 &&
    abl(cid, 21) >= 2 &&
    exp(cid, 63) >= 100 &&
    talent(cid, 293) === 0 &&
    talent(cid, 294) === 0
  ) {
    await era.printAndWait(`${name}的情形似乎有点奇怪…`);
    era.print(`对着使役的怪物${name}以头扣地，并进行着成为怪物从属的誓约`);
    era.print('身体宛如触电一般地颤抖着、那通红的脸庞还露出扭曲般愉悦的表情……');
    await era.printAndWait(`${name}得到了【${talent_name(293)}】`);
    set_talent(cid, 293, 1);
  } else if (
    abl(cid, 11) >= 3 &&
    abl(cid, 16) >= 3 &&
    exp(cid, 64) >= 100 &&
    talent(cid, 293) === 0 &&
    talent(cid, 294) === 0
  ) {
    await era.printAndWait(`${name}的情形似乎有点奇怪…`);
    era.print(`${name}将使役的怪物当成对等的存在、并确定了心中的爱意`);
    era.print(`想着这段超越魔界立场的恋情，${name}露出了期望的微笑……`);
    await era.printAndWait(`${name}获得了【${talent_name(294)}】`);
    set_talent(cid, 294, 1);
  }
}

/**
 * :355-456 特殊性感素质：阴蒂/私处/肛门/乳房「狂」系四选一（SEXSKILL
 * 系统）。原作两重「已集齐四个」守卫（外层 SIF、内层 SEXSKILL_COUNT==4）
 * 效果相同，合并为一次判定。
 */
async function arousal_specialty(cid) {
  const held = [74, 75, 77, 78].filter((id) => talent(cid, id));
  if (held.length === 4) {
    return;
  }
  const count = held.length;
  const exp1 = 100 + 50 * count; // SEXSKILL_EXP:1
  const exp2 = 100 + 10 * count; // SEXSKILL_EXP:2
  const exp3 = 300 + 50 * count; // SEXSKILL_EXP:3

  if (count > 0) {
    const eligible =
      (talent(cid, 74) === 0 &&
        abl(cid, 0) >= 5 &&
        exp(cid, 11) >= exp1 &&
        exp(cid, 2) >= exp2) ||
      (talent(cid, 75) === 0 &&
        talent(cid, 122) &&
        abl(cid, 0) >= 5 &&
        exp(cid, 5) >= exp3 &&
        exp(cid, 2) >= exp1) ||
      (talent(cid, 75) === 0 &&
        abl(cid, 2) >= 5 &&
        exp(cid, 0) >= exp3 &&
        exp(cid, 2) >= exp2) ||
      (talent(cid, 77) === 0 &&
        abl(cid, 3) >= 5 &&
        exp(cid, 32) >= exp3 &&
        exp(cid, 2) >= exp2) ||
      (talent(cid, 78) === 0 &&
        talent(cid, 122) &&
        abl(cid, 1) >= 5 &&
        juel(cid, 14) >= exp1 &&
        exp(cid, 2) >= exp2) ||
      (talent(cid, 78) === 0 &&
        abl(cid, 1) >= 5 &&
        exp(cid, 54) >= exp1 &&
        exp(cid, 2) >= exp2);
    if (!eligible) {
      return;
    }
  }

  const name = chara_callname(cid);

  if (
    abl(cid, 0) >= 4 &&
    exp(cid, 11) >= 100 &&
    exp(cid, 2) >= 100 &&
    talent(cid, 74) === 0
  ) {
    await era.printAndWait(`总觉得最近，${name}连呼吸都变得色情了起来…`);
    era.print(
      `调教结束之后，${name}当着${chara_nickname(MASTER)}的面，肆无忌惮地继续玩弄着自己的`,
    );
    era.print(talent(cid, 121) || talent(cid, 122) ? '阴茎' : '阴蒂');
    era.print('。');
    await era.printAndWait(`${name}获得了【${talent_name(74)}】。`);
    set_talent(cid, 74, 1);
    return;
  }

  if (
    abl(cid, 2) >= 4 &&
    exp(cid, 0) >= 300 &&
    exp(cid, 2) >= 100 &&
    talent(cid, 75) === 0
  ) {
    await era.printAndWait(`${name}最近对私处的运用，越来越炉火纯青…`);
    await era.printAndWait(
      `调教结束之后，${name}依依不舍地抱着${chara_nickname(MASTER)}，恳求着欢好。`,
    );
    await era.printAndWait(`${name}获得了【${talent_name(75)}】。`);
    set_talent(cid, 75, 1);
    return;
  }
  if (
    talent(cid, 122) &&
    abl(cid, 0) >= 4 &&
    exp(cid, 5) >= 300 &&
    exp(cid, 2) >= 100 &&
    talent(cid, 75) === 0
  ) {
    await era.printAndWait(`${name}最近对性器的运用，越来越炉火纯青…`);
    await era.printAndWait(
      `调教结束之后，${name}依依不舍地抱着${chara_nickname(MASTER)}，恳求着欢好。`,
    );
    await era.printAndWait(`${name}获得了【${talent_name(75)}】。`);
    set_talent(cid, 75, 1);
    return;
  }

  if (
    abl(cid, 3) >= 4 &&
    exp(cid, 32) >= 300 &&
    exp(cid, 2) >= 100 &&
    talent(cid, 77) === 0
  ) {
    await era.printAndWait(`${name}最近好像学会了控制直肠的蠕动…`);
    await era.printAndWait(
      `调教结束之后，${name}一边摆弄自己的肛门，一边用勾引的眼神目送${chara_nickname(MASTER)}。`,
    );
    await era.printAndWait(`${name}获得了【${talent_name(77)}】。`);
    set_talent(cid, 77, 1);
    return;
  }

  if (
    abl(cid, 1) >= 4 &&
    exp(cid, 54) >= 100 &&
    exp(cid, 2) >= 100 &&
    talent(cid, 78) === 0 &&
    talent(cid, 122) === 0
  ) {
    await era.printAndWait(
      `最近，总觉得${name}的胸部，好像有着神奇的引力一般…`,
    );
    await era.printAndWait(
      `调教结束之后，${name}用尖立的乳头直直地对着${chara_nickname(MASTER)}，眼里充满了勾人的销魂神色。`,
    );
    await era.printAndWait(`${name}获得了【${talent_name(78)}】。`);
    set_talent(cid, 78, 1);
    return;
  }
  if (
    abl(cid, 1) >= 4 &&
    juel(cid, 14) >= 100 &&
    exp(cid, 2) >= 100 &&
    talent(cid, 78) === 0 &&
    talent(cid, 122)
  ) {
    await era.printAndWait(`最近，${name}总觉得胸部越发敏感…`);
    await era.printAndWait(
      `调教结束之后，${name}用尖立的乳头直直地对着${chara_nickname(MASTER)}，眼里充满了渴望。`,
    );
    await era.printAndWait(`${name}获得了【${talent_name(78)}】。`);
    set_talent(cid, 78, 1);
  }
}

/** :464-540 強化素質（FLAG:73 <= 0 时启用）：淫核/淫壶/淫肛/淫乳/性豪 */
async function enhanced_talents(cid) {
  if (get('flag:73') > 0) {
    return;
  }
  const name = chara_callname(cid);
  const master = chara_nickname(MASTER);

  if (
    abl(cid, 0) >= 5 &&
    exp(cid, 11) >= 100 &&
    exp(cid, 2) >= 300 &&
    talent(cid, 230) === 0
  ) {
    await era.printAndWait(`${name}好像无法停止娇媚的呻吟，`);
    era.print(`${name}在调教结束之后依然哀求着${master}为`);
    era.print(talent(cid, 122) ? '他缓解' : '她解除');
    era.print(
      talent(cid, 121) || talent(cid, 122) ? '阴茎的肿涨。' : '阴蒂的肿痛。',
    );
    era.print('但一摸下去，');
    era.print(talent(cid, 122) ? '他便喘息了起来，' : '她便高声娇喘起来，');
    era.print('越来越亢奋了…');
    if (talent(cid, 122)) {
      await era.printAndWait(`${name}获得了【绝伦】。`);
    } else {
      await era.printAndWait(`${name}获得了【${talent_name(230)}】。`);
    }
    set_talent(cid, 230, 1);
  }

  if (
    abl(cid, 2) >= 5 &&
    exp(cid, 0) >= 300 &&
    exp(cid, 2) >= 300 &&
    talent(cid, 232) === 0
  ) {
    await era.printAndWait(`${name}不停地发出【唔～唔～唔……】的勾魂声音…`);
    await era.printAndWait(
      `${name}在调教结束之后依然哀求着${master}疼爱${she(cid)}的子宫。但一插进去，${she(cid)}便全身夸张地痉挛了起来，子宫口依依不舍地紧紧吸啜着龟头…`,
    );
    await era.printAndWait(`${name}获得了【${talent_name(232)}】。`);
    set_talent(cid, 232, 1);
  }

  if (
    abl(cid, 3) >= 5 &&
    exp(cid, 32) >= 300 &&
    exp(cid, 2) >= 300 &&
    talent(cid, 233) === 0
  ) {
    await era.printAndWait(`${name}用舌头轻轻地舔着嘴唇…`);
    await era.printAndWait(
      `${name}在调教结束之后依然哀求着${master}疼爱${she(cid)}的尻穴。但一插进去，${she(cid)}便全身夸张地痉挛了起来，直肠疯狂地蠕动，摩擦着阴茎…`,
    );
    await era.printAndWait(`${name}获得了【${talent_name(233)}】。`);
    set_talent(cid, 233, 1);
  }

  if (
    abl(cid, 1) >= 5 &&
    exp(cid, 54) >= 100 &&
    exp(cid, 2) >= 300 &&
    talent(cid, 231) === 0
  ) {
    await era.printAndWait(`${name}主动引导你的手推拿自己的胸部…`);
    await era.printAndWait(
      `${name}在调教结束之后依然哀求着${master}玩弄${she(cid)}的胸部。但一摸下去，${she(cid)}便昂首咬牙，爱液四射，高声娇喘起来了…`,
    );
    await era.printAndWait(`${name}获得了【${talent_name(231)}】。`);
    set_talent(cid, 231, 1);
  }

  if (
    talent(cid, 230) &&
    talent(cid, 231) &&
    talent(cid, 232) &&
    talent(cid, 233) &&
    talent(cid, 272) === 0
  ) {
    await era.printAndWait(`${name}获得了【${talent_name(272)}】。`);
    set_talent(cid, 272, 1);
    // TALENT:101/TALENT:103 走 PRINTFORMW（等键），TALENT:105/TALENT:107 走
    // PRINTFORM（不等键，:523-538）——
    // 原作字面量不对称，逐字保留
    await remove_talent_wait(cid, 101);
    await remove_talent_wait(cid, 103);
    remove_talent_now(cid, 105);
    remove_talent_now(cid, 107);
  }
}

/** :546-601 时常发情（FLAG:75 <= 0 时启用） */
async function constant_arousal(cid) {
  if (get('flag:75') > 0) {
    return;
  }
  if (talent(cid, 271) !== 0) {
    return;
  }
  if (!(cflag(cid, 81) >= 700 && cflag(cid, 82) >= 2250)) {
    return;
  }
  const name = chara_callname(cid);
  await era.printAndWait(`${name}最近总是面带红霞…`);
  era.print(`${name}的`);
  if (talent(cid, 122) || talent(cid, 121)) {
    era.print('龟头');
  }
  if (talent(cid, 121)) {
    era.print('和');
  }
  if (talent(cid, 122) === 0) {
    era.print('私处');
  }
  era.print('总是有透明的爱液滚滚涌出…');
  await era.printAndWait(`${name}获得了【${talent_name(271)}】。`);
  set_talent(cid, 271, 1);

  if (talent(cid, 43) === 0 && talent(cid, 42) === 0) {
    await era.printAndWait(`${name}获得了【${talent_name(42)}】。`);
    set_talent(cid, 42, 1);
  } else if (talent(cid, 43)) {
    await era.printAndWait(`${name}失去了【${talent_name(43)}】。`);
    set_talent(cid, 43, 0);
  }

  remove_dislike_talents_32_34_84(cid);
  await remove_talent_wait(cid, 71); // 否定快感
  await remove_talent_wait(cid, 30); // 看重贞操
}

/** :607-624 喜欢精液の习得（TFLAG:110 强制精饮绝顶触发 + seiin 参数） */
async function forced_semen_liking(cid, seiin) {
  if (!(game.event.精爱味觉 && talent(cid, 47) === 0 && seiin)) {
    return;
  }
  const name = chara_callname(cid);
  await era.printAndWait(`${name}最近一见到你，就感到舌干唇燥…`);
  era.print('在没有任何性刺激的情况下，也渴望着饮精液了。');
  await era.printAndWait(`${name}获得了【${talent_name(47)}】。`);
  set_talent(cid, 47, 1);
  await remove_talent_wait(cid, 62); // 反感污臭
  if (abl(cid, 32) < 3) {
    await era.printAndWait(`${name}的精液中毒LV3了。`);
    set_abl(cid, 32, 3);
  }
  game.event.精爱味觉 = 0; // 取得フラグのリセット
}

/** :630-653 マイナス素质の消灭 */
async function negative_talent_removal(cid) {
  if (abl(cid, 16) >= 5 && talent(cid, 151)) {
    await remove_talent_wait(cid, 151);
  }
  if (abl(cid, 31) >= 5 && talent(cid, 150)) {
    await remove_talent_wait(cid, 150);
  }
  if (talent(cid, 122) && talent(cid, 82)) {
    if (abl(cid, 23) >= 5) {
      await remove_talent_wait(cid, 82);
    }
  } else if (abl(cid, 30) >= 3 && abl(cid, 32) >= 3 && talent(cid, 82)) {
    await remove_talent_wait(cid, 82);
  }
  if (abl(cid, 22) >= 5 && talent(cid, 79)) {
    await remove_talent_wait(cid, 79);
  }
}

/** :658-661 マスターの特殊能力（堕とした人数 5 人以上） */
async function master_charm() {
  if (game.event.爱或淫乱人数 >= 5 && talent(MASTER, 92) === 0) {
    await era.printAndWait(
      `${chara_callname(MASTER)}掌握了【${talent_name(92)}】。`,
    );
    set_talent(MASTER, 92, 1);
  }
}

/** :668-691 妓女・倾城の修得 */
async function prostitution_talents(cid) {
  const name = chara_callname(cid);
  if (
    talent(cid, 315) === 5 &&
    exp(cid, 74) >= 80 &&
    mark(cid, 3) === 0 &&
    abl(cid, 11) >= 1 &&
    talent(cid, 180) === 0
  ) {
    await era.printAndWait(`${name}无法逃离作为妓女的生活方式……`);
    await era.printAndWait(`${name}获得了【${talent_name(180)}】。`);
    set_talent(cid, 180, 1);
  } else if (
    exp(cid, 74) >= 100 &&
    mark(cid, 3) === 0 &&
    abl(cid, 11) >= 2 &&
    abl(cid, 12) >= 1 &&
    talent(cid, 180) === 0
  ) {
    await era.printAndWait(`${name}以出卖肉体为主要的生活方式……`);
    await era.printAndWait(`${name}获得了【${talent_name(180)}】。`);
    set_talent(cid, 180, 1);
  }

  if (
    talent(cid, 315) === 5 &&
    exp(cid, 74) >= 160 &&
    mark(cid, 3) === 0 &&
    talent(cid, 180) === 1 &&
    talent(cid, 181) === 0
  ) {
    await era.printAndWait(`${name}热衷于从事分开双腿的工作……`);
    await era.printAndWait(`${name}获得了【${talent_name(181)}】。`);
    set_talent(cid, 181, 1);
  } else if (
    exp(cid, 74) >= 200 &&
    mark(cid, 3) === 0 &&
    talent(cid, 180) === 1 &&
    talent(cid, 181) === 0
  ) {
    await era.printAndWait(`${name}热衷于从事分开双腿的工作……`);
    await era.printAndWait(`${name}获得了【${talent_name(181)}】。`);
    set_talent(cid, 181, 1);
  }
}

/** :698-710 妄信の修得 */
async function blind_faith(cid) {
  const name = chara_callname(cid);
  if (
    talent(cid, 85) &&
    exp(cid, 81) >= 5 &&
    mark(cid, 3) === 0 &&
    abl(cid, 10) >= 4 &&
    talent(cid, 86) === 0
  ) {
    await era.printAndWait('爱会使人盲目的吗？我们也许不得而知。');
    await era.printAndWait(`但${name}对你，却一定是盲目的……`);
    await era.printAndWait(`${name}获得了【${talent_name(86)}】。`);
    set_talent(cid, 86, 1);
  } else if (
    talent(cid, 76) &&
    exp(cid, 81) >= 10 &&
    mark(cid, 3) === 0 &&
    abl(cid, 10) >= 5 &&
    talent(cid, 86) === 0
  ) {
    await era.printAndWait('放荡的人，很难谈得上有什么纪律意识。');
    await era.printAndWait(
      `但通过出色的调教，淫乱的${name}已经对你言听计从了……`,
    );
    await era.printAndWait(`${name}获得了【${talent_name(86)}】。`);
    set_talent(cid, 86, 1);
  }
}

/** $STEP2（:261-710）：与反抗刻印无关、每次调用都要跑的其余素质判定 */
async function step2(cid, seiin) {
  await semen_liking(cid);
  await skilled_tongue(cid);
  await fetish_talents(cid);
  await arousal_specialty(cid);
  await enhanced_talents(cid);
  await constant_arousal(cid);
  await forced_semen_liking(cid, seiin);
  await negative_talent_removal(cid);
  await master_charm();
  await prostitution_talents(cid);
  await blind_faith(cid);
}

/**
 * @CHECK_SPECIALSKIL_BODYSHIFT（:740-752）：不受本人意志左右的强制体变
 * 判定（【崩坏】状态下也会作用，:14-17 的守卫即为此调用它）。
 *
 * @param {number} cid 角色 ID（原作隐式 TARGET）
 * @returns {Promise<number>} 0（原作 RETURN 0）
 */
async function check_specialskil_bodyshift(cid) {
  if (exp(cid, 62) >= 20 && talent(cid, 158) === 0) {
    // 异种妊娠经验 20 以上 →【同族妊娠不能】
    const name = chara_callname(cid);
    await era.printAndWait(
      `${name}生育了太多异种的孩子，已经无法为同族生育了。`,
    );
    await era.printAndWait(`${name}获得了【${talent_name(158)}】`);
    set_talent(cid, 158, 1);
  }
  return 0;
}

/**
 * @CHECK_SPECIALSKIL（:7-716，:719-734 死代码不构造，见文件头）：调教/据点
 * 侧信息达标后的特殊素质获得总入口。
 *
 * @param {number} cid 角色 ID（原作隐式 TARGET）
 * @param {number} [seiin=0] 原作 `SEIIN = 0` 的默认参数（强制精饮绝顶次数
 *   超过阈值时由调用方置真，见 :607 的门槛判定）
 * @returns {Promise<number>} 0（原作全部 RETURN 0）
 */
async function check_specialskil(cid, seiin = 0) {
  // :12 SIF TARGET < 0 || TARGET >= CHARANUM —— #21 扁平化后按「不在已加入
  // 角色列表」判定（page-select-target.js 先例）
  if (!era.getAddedCharacters().includes(cid)) {
    return 0;
  }
  if (talent(cid, 9)) {
    // 【崩坏】状态下仍会触发强制体变
    await check_specialskil_bodyshift(cid);
    return 0;
  }

  if (mark(cid, 3) === 0) {
    await step1(cid);
  }
  await step2(cid, seiin);

  await check_specialskil_bodyshift(cid);
  return 0;
  // :719-734（闘姫の修得）是死代码，不构造，见文件头
}

module.exports = { check_specialskil, check_specialskil_bodyshift };
