/**
 * @file 媚药中毒关联事件（issue #405）：残留度衰减、禁断症状、中毒/疯狂/废人
 * 三级取得判定。
 *
 * 源: target/ERB/EVENT/EVENT_ADDICT.ERB  @APHRODISIAC_ADDICT（:10-69）、
 *     @PRECIPITATE_WITHDRAWAL（:73-219）、@SUFFER_FROM_WITHDRAWAL（:220-294）、
 *     @PRECIPITATE_WITHDRAWAL_FALL_INTO_DISFAVOR/BE_A_ATHYMIA/BE_A_DEPRESSION/
 *     BE_A_RESISTER/BE_A_MISANTHROPIST/BE_A_CRAZY/BE_A_WRECK（:295-343）
 *
 * 调用点 EVENT_NEXTDAY.ERB:47（每角色每日，无条件）在 #400（N16）范围内，
 * 本票只落函数真身，签名定死为 `aphrodisiac_addict(cid, rand)`——
 * `ere/event/event-nextday.js` 的 STUBBED_CALLS 仍登记 APHRODISIAC_ADDICT，
 * 接线随该票。
 *
 * 移植说明：
 *   - @SUFFER_FROM_WITHDRAWAL 的七级恶化梯子按「离散度 W」分七段
 *     （<5/<10/<15/<20/<25/<30/其余），但 **<15 与 <20 两段候选列表逐字
 *     相同**（均为 抵抗/悲观/淡漠/失宠 四选一），合并成一段 `<20` 不改变
 *     任何可观察行为——保留冗余分支会让 15 这个边界值成为「改了也不会有
 *     用例变红」的死边界，与工单验收标准（字面量改动必须有用例能抓）相
 *     悖，故按等价简化处理，不算「未 1:1」；
 *   - `PRECIPITATE_WITHDRAWAL_BE_A_WRECK` 的准入判据读 `TALENT:9`（崩坏），
 *     但生效动作写的是 `TALENT:19 = 1`——两个不同的素质序号，原作实机如
 *     此（非本项目误读），照抄，不「修好」；
 *   - `RAND:100`/`RAND:50`/`RAND:3` 等经 `rand(n)` 形参注入（[0,n) 整数，
 *     缺省 Math.random，测试注入定值序，juel-check.js 同款先例）；
 *   - U/V/W 是 Emuera 全局标量（issue #5 决议第 3 条：A-Z 类临时变量按 JS
 *     局部变量处理），`@PRECIPITATE_WITHDRAWAL` 与 `@SUFFER_FROM_WITHDRAWAL`
 *     之间靠它们隐式传值——ere 侧显式改成参数与返回值；
 *   - CFLAG:1 = 角色状态（0=調教中/默认待机…2=侵攻中，同 event-sabbath.js
 *     文件头证据）；DAY（裸，日循环总天数）落 era_flag.day_count（#5 决议，
 *     flag:10000）；
 *   - SAVESTR:TARGET → chara_callname、CALLNAME:MASTER → chara_nickname(0)
 *     （#5 决议，MASTER = 角色 0）。
 */

'use strict';

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { game } = require('#/facade/game');
const { chara } = require('#/facade/chara');
const { chara_callname, chara_nickname } = require('#/utils/callname-utils');
const { party_del } = require('#/dungeon/dungeon-party');

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
function cflag(cid, n) {
  return get(`cflag:${cid}:${n}`);
}
function set_cflag(cid, n, v) {
  era.set(`cflag:${cid}:${n}`, v);
}

const default_rand = (n) => Math.floor(Math.random() * n);

/**
 * @APHRODISIAC_ADDICT（:10-69）：媚药中毒的发病与恢复——每 7 日一次残留度
 * 衰减 + 禁断症状检查，随后判定【媚药中毒】消失/取得与【疯狂】【废人】
 * 的追加恶化。
 *
 * @param {number} cid 角色 ID（原作隐式 TARGET）
 * @param {(n: number) => number} [rand] RAND:N 随机源（[0,n) 整数；缺省
 *   均匀随机，测试注入定值序）——透传给 `precipitate_withdrawal`
 * @returns {Promise<void>}
 */
async function aphrodisiac_addict(cid, rand = default_rand) {
  // :11-29 每 7 日一次：体内媚药残留度 -1（下限 0），[媚药中毒]时再查禁断症状
  if ((era_flag.day_count + 1) % 7 === 0) {
    if (cflag(cid, 31) > 0) {
      era.add(`cflag:${cid}:31`, -1);
      if (cflag(cid, 31) < 0) {
        set_cflag(cid, 31, 0);
      }
    }
    if (talent(cid, 46)) {
      // TALENT:46 = 媚药中毒。CFLAG:1 != 9（未处在某特殊状态时才查禁断）
      if (cflag(cid, 1) !== 9) {
        if (cflag(cid, 32)) {
          // CFLAG:32：本轮已发作过一次的豁免标记
          set_cflag(cid, 32, 0);
        } else {
          await precipitate_withdrawal(cid, rand);
        }
      }
    }
  }

  // :31-39 消失判定：残留度归零则消除【媚药中毒】
  if (cflag(cid, 31) === 0 && talent(cid, 46)) {
    const name = chara_callname(cid);
    era.print(`${name}的样子变了……`);
    era.print(`体内的媚药效果被根除，${name}的药瘾消失了。`);
    era.print(`${name}的【${era.get('talentname:46') || ''}】消除了。`);
    await era.waitAnyKey();
    set_talent(cid, 46, 0);
  }

  // :40-51 取得判定：媚药中毒（TALENT:86 容易上瘾时门槛 9，否则 12；
  // 门槛来源与 TALENT:72 的关系照代码字面量搬运，不重新推导语义）
  if (
    ((talent(cid, 86) === 0 && cflag(cid, 31) >= 12) ||
      (talent(cid, 72) && cflag(cid, 31) >= 9)) &&
    talent(cid, 46) === 0
  ) {
    const name = chara_callname(cid);
    era.print(`${name}的样子有点奇怪……`);
    era.print(`媚药的过量使用，令${name}沾上药瘾了。`);
    era.print(`${name}获得了【${era.get('talentname:46') || ''}】。`);
    await era.waitAnyKey();
    set_talent(cid, 46, 1);
    // 中毒初期奖励：体内媚药残留度一律 >= 15
    if (cflag(cid, 31) < 15) {
      set_cflag(cid, 31, 15);
    }
  }

  // :52-60 取得判定：疯狂（TALENT:72 时门槛 30，否则 40）
  if (
    (cflag(cid, 31) >= 40 || (talent(cid, 72) && cflag(cid, 31) >= 30)) &&
    talent(cid, 123) === 0
  ) {
    const name = chara_callname(cid);
    era.print(`${name}的样子有点奇怪……`);
    era.print(`${name}随着媚药的过量使用，人也变得暴躁了。`);
    era.print(`${name}获得了【${era.get('talentname:123') || ''}】。`);
    era.println();
    set_talent(cid, 123, 1);
  }

  // :61-69 取得判定：废人/崩坏（TALENT:72 时门槛 75，否则 100）
  if (
    (cflag(cid, 31) >= 100 || (talent(cid, 72) && cflag(cid, 31) >= 75)) &&
    talent(cid, 9) === 0
  ) {
    const name = chara_callname(cid);
    era.print(`${name}的样子有点奇怪……`);
    era.print(`${name}随着媚药的过量使用，完全变成了废人。`);
    era.print(`${name}的精神变成【${era.get('talentname:9') || ''}】了。`);
    era.println();
    set_talent(cid, 9, 1);
  }
}

/**
 * @PRECIPITATE_WITHDRAWAL（:73-219）：禁断症状事件——玩家可用媚药道具喂服
 * 免除本轮症状（侵攻中角色额外有陷落分支），否则按残留度与看护人数决定
 * 检查次数，40% 概率触发一次 `suffer_from_withdrawal`，触发与否决定末尾
 * 是「痛苦挣扎」还是「平静入睡」两套体力消耗与看护人代价演出。
 *
 * @param {number} cid 角色 ID（原作隐式 TARGET）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（原作 RETURN 0，多处提前返回同为 0）
 */
async function precipitate_withdrawal(cid, rand = default_rand) {
  era.print(`${chara_callname(cid)}在诉说着自己的身体不适应症状。`);
  era.print('看来，春药中毒的禁断症状出现了……');
  await era.waitAnyKey();

  // :84-113 持有媚药道具（ITEM:26）时可喂服免除本轮
  if (get('item:26')) {
    for (;;) {
      era.print(`给予${chara_callname(cid)}媚药吗？`);
      era.print(' [0] - 好的');
      era.print(' [1] - 不要');
      const result = await era.input();
      if (result === 0) {
        if (cflag(cid, 1) === 2) {
          // 侵攻中角色：为媚药而诱惑魔王军，直接陷落退出侵攻
          const name = chara_callname(cid);
          await era.printAndWait(`${name}为了获得媚药，诱惑着魔王军上下人众。`);
          await era.printAndWait(
            '流下了贪欲的口水，完全忘记了作为勇者的使命。',
          );
          era.print(`${name}陷落了。`);
          set_cflag(cid, 1, 0);
          era.add('money', 100 * cflag(cid, 9));
          era.add('ex_flag:4444', 100 * cflag(cid, 9));
          await era.printAndWait(`获得${100 * cflag(cid, 9)}G！`);
          set_cflag(cid, 506, 1);
          set_cflag(cid, 507, 0);
          party_del(cid);
        }
        era.print(`${chara_callname(cid)}抢过了装着浓缩媚药的瓶子，`);
        era.print('马上如饥似渴地一饮而尽，放心地叹了一口气。');
        await era.waitAnyKey();
        era.add(`cflag:${cid}:31`, 1);
        game.train.媚药 -= 1;
        return 0;
      }
      if (result !== 1) {
        continue;
      }
      break;
    }
  }

  // :115-122 侵攻中角色：无媚药可用，独自捱过症状后退出本轮
  if (cflag(cid, 1) === 2) {
    era.print(`数小时后${chara_callname(cid)}身体的颤抖终于停了下来。`);
    chara(cid).dungeon.体力 -= 300;
    if (get(`base:${cid}:0`) < 1) {
      chara(cid).dungeon.体力 = 1;
    }
    return 0;
  }

  // :125-132 [治疗][献身的]持ちの看护人数（仅待机中计入，原作注释与判据
  // 字面量一致按代码搬运，见 event-sabbath.js 文件头 CFLAG:1 语义说明）
  let u = 0;
  for (const other of era.getAddedCharacters()) {
    if ((talent(other, 117) || talent(other, 63)) && cflag(other, 1) === 0) {
      u += 1;
    }
  }

  // :134-140 检查次数：残留度与看护人数决定，钳制 [1, 10]
  let v = Math.floor(cflag(cid, 31) / 10) + 1 - u;
  if (v < 1) {
    v = 1;
  } else if (v > 10) {
    v = 10;
  }

  // :142-150 每次 40% 概率触发一次恶化事件，触发即止
  let triggered = false;
  for (let i = 0; i < v; i += 1) {
    if (rand(100) < 40) {
      await suffer_from_withdrawal(cid, u, v, rand);
      triggered = true;
      break;
    }
  }

  if (triggered) {
    // :152-192 恶化：体力/气力上限各 -50（下限 600/100）、体力 -500，
    // 看护人（[治疗][献身的]持ち优先，其余 1/3 概率）各消耗 200 体力
    await era.printAndWait(
      `被禁断症状折磨着的${chara_callname(cid)}痛苦地在地上打滚，`,
    );
    era.print(
      '持续数小时的癫狂的行为也终于让她感到累了，症状被平息，终于老实了下来。',
    );
    era.print('不过，不仅是她本人，护理人员也感到筋疲力尽了……');
    await era.waitAnyKey();
    era.print(`${chara_callname(cid)}的体力和气力衰退了。`);

    era.add(`maxbase:${cid}:0`, -50);
    if (get(`base:${cid}:0`) > get(`maxbase:${cid}:0`)) {
      chara(cid).dungeon.体力 = get(`maxbase:${cid}:0`);
    }
    if (get(`maxbase:${cid}:0`) < 600) {
      era.set(`maxbase:${cid}:0`, 600);
    }

    era.add(`maxbase:${cid}:1`, -50);
    if (get(`base:${cid}:1`) > get(`maxbase:${cid}:1`)) {
      chara(cid).dungeon.气力 = get(`maxbase:${cid}:1`);
    }
    if (get(`maxbase:${cid}:1`) < 100) {
      era.set(`maxbase:${cid}:1`, 100);
    }

    chara(cid).dungeon.体力 -= 500;
    if (get(`base:${cid}:0`) < 1) {
      chara(cid).dungeon.体力 = 1;
    }

    for (const other of era.getAddedCharacters()) {
      if ((talent(other, 117) || talent(other, 63)) && cflag(other, 1) === 0) {
        chara(other).dungeon.体力 -= 200;
        if (get(`base:${other}:0`) < 1) {
          chara(other).dungeon.体力 = 1;
        }
      } else if (rand(3) === 0 && cflag(other, 1) === 0) {
        chara(other).dungeon.体力 -= 200;
        if (get(`base:${other}:0`) < 1) {
          chara(other).dungeon.体力 = 1;
        }
      }
    }
  } else {
    // :193-217 平静：体力 -300，看护人（无待机限定）各消耗 100 体力
    era.print(`数小时后，${chara_callname(cid)}身体的颤抖终于停止了，`);
    era.print('护理人员也辛苦了，');
    era.print('这次总算平安度过了……');
    await era.waitAnyKey();
    chara(cid).dungeon.体力 -= 300;
    if (get(`base:${cid}:0`) < 1) {
      chara(cid).dungeon.体力 = 1;
    }

    for (const other of era.getAddedCharacters()) {
      if (talent(other, 117) || talent(other, 63)) {
        chara(other).dungeon.体力 -= 100;
        if (get(`base:${other}:0`) < 1) {
          chara(other).dungeon.体力 = 1;
        }
      } else if (rand(3) === 0) {
        chara(other).dungeon.体力 -= 100;
        if (get(`base:${other}:0`) < 1) {
          chara(other).dungeon.体力 = 1;
        }
      }
    }
  }
  era.println();

  return 0;
}

// 七级恶化候选（优先级顺序）。misanthropist/disfavor 无简单素质门槛，
// 各自处理；其余四个共享同一渲染形状（simple_outcome）
const SIMPLE_OUTCOME_TEXT = {
  crazy: {
    talent: 123,
    line: '饱受禁断症状的痛苦，充满攻击性了。',
    gained: '疯狂',
  },
  resister: {
    talent: 34,
    line: '饱受禁断症状的痛苦，变得不和善了。',
    gained: '抵抗',
  },
  depression: {
    talent: 26,
    line: '饱受禁断症状的痛苦，对人生看法灰暗。',
    gained: '悲观的',
  },
  athymia: {
    talent: 22,
    line: '饱受禁断症状的痛苦，连感情都失去了。',
    gained: '感情淡薄',
  },
};

async function simple_withdrawal_outcome(cid, key) {
  const { talent: talent_id, line, gained } = SIMPLE_OUTCOME_TEXT[key];
  const name = chara_callname(cid);
  await era.printAndWait(`${name}的样子明显不对头……`);
  await era.printAndWait(`${name}${line}`);
  await era.printAndWait(`${name}获得了【${gained}】。`);
  set_talent(cid, talent_id, 1);
}

/**
 * @PRECIPITATE_WITHDRAWAL_BE_A_WRECK（:338-343）：门槛读 TALENT:9（崩坏），
 * 生效写 TALENT:19——两个不同素质序号，原作实机如此，照抄不改。
 */
async function precipitate_withdrawal_be_a_wreck(cid) {
  const name = chara_callname(cid);
  await era.printAndWait(`${name}的样子明显不对头……`);
  await era.printAndWait(`${name}饱受禁断症状的痛苦，完全变成一个废人了。`);
  await era.printAndWait(`${name}的精神【崩坏】了……`);
  set_talent(cid, 19, 1);
}

/** @PRECIPITATE_WITHDRAWAL_BE_A_MISANTHROPIST（:319-331）：厌世 + 好感度惩罚 */
async function precipitate_withdrawal_be_a_misanthropist(cid) {
  const name = chara_callname(cid);
  await era.printAndWait(`${name}的样子明显不对头……`);
  await era.printAndWait(
    `${name}饱受禁断症状的痛苦，被${chara_nickname(MASTER)}嫌弃了。`,
  );
  const relation = get(`relation:${cid}:0`);
  if (relation === 0) {
    era.set(`relation:${cid}:0`, 50);
  } else {
    era.add(`relation:${cid}:0`, -50);
    if (get(`relation:${cid}:0`) < 30) {
      era.set(`relation:${cid}:0`, 30);
    }
  }
  chara(cid).chara.好感度 -= 200;
}

/** @PRECIPITATE_WITHDRAWAL_FALL_INTO_DISFAVOR（:295-299 前段）：失宠（兜底） */
async function precipitate_withdrawal_fall_into_disfavor(cid) {
  const name = chara_callname(cid);
  await era.printAndWait(`${name}的样子明显不对头……`);
  await era.printAndWait(
    `${name}饱受禁断症状的痛苦，被${chara_nickname(MASTER)}嫌弃了。`,
  );
  chara(cid).chara.好感度 -= 200;
}

// :221-289 七级梯子：W = RAND:50 - V + U*2，按区间选出候选表，表内按
// 「素质尚未持有」的优先级依次取用，取不到则落到 disfavor 兜底。
// 原作 <15 与 <20 两段候选表逐字相同，合并为一段 <20（文件头说明）
const WITHDRAWAL_TIERS = [
  {
    upper: 5,
    candidates: [
      'wreck',
      'crazy',
      'misanthropist',
      'resister',
      'depression',
      'athymia',
      'disfavor',
    ],
  },
  {
    upper: 10,
    candidates: [
      'crazy',
      'misanthropist',
      'resister',
      'depression',
      'athymia',
      'disfavor',
    ],
  },
  { upper: 20, candidates: ['resister', 'depression', 'athymia', 'disfavor'] },
  { upper: 25, candidates: ['depression', 'athymia', 'disfavor'] },
  { upper: 30, candidates: ['athymia', 'disfavor'] },
];

function candidate_available(cid, key) {
  switch (key) {
    case 'wreck':
      return talent(cid, 9) === 0;
    case 'crazy':
      return talent(cid, 123) === 0;
    case 'misanthropist': {
      const relation = get(`relation:${cid}:0`);
      return relation === 0 || relation > 50;
    }
    case 'resister':
      return talent(cid, 34) === 0;
    case 'depression':
      return talent(cid, 26) === 0;
    case 'athymia':
      return talent(cid, 22) === 0;
    default:
      return true; // disfavor：兜底，恒可用
  }
}

async function apply_candidate(cid, key) {
  if (key === 'wreck') {
    await precipitate_withdrawal_be_a_wreck(cid);
  } else if (key === 'misanthropist') {
    await precipitate_withdrawal_be_a_misanthropist(cid);
  } else if (key === 'disfavor') {
    await precipitate_withdrawal_fall_into_disfavor(cid);
  } else {
    await simple_withdrawal_outcome(cid, key);
  }
}

/**
 * @SUFFER_FROM_WITHDRAWAL（:220-294）：禁断症状恶化的具体一击。
 *
 * @param {number} cid 角色 ID
 * @param {number} u `precipitate_withdrawal` 算出的看护人数（原作全局 U）
 * @param {number} v `precipitate_withdrawal` 算出的检查次数（原作全局 V）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<void>}
 */
async function suffer_from_withdrawal(cid, u, v, rand = default_rand) {
  const w = rand(50) - v + u * 2;
  const tier = WITHDRAWAL_TIERS.find((t) => w < t.upper);
  if (tier) {
    const key = tier.candidates.find((candidate) =>
      candidate_available(cid, candidate),
    );
    if (key) {
      await apply_candidate(cid, key);
    }
  } else {
    // :287-288 W >= 30：无候选可选，纯占位换行
    era.println();
  }
  era.println();
}

module.exports = {
  aphrodisiac_addict,
  precipitate_withdrawal,
  suffer_from_withdrawal,
};
