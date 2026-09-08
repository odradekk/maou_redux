/**
 * @file NTR 影像与出产演出。
 * 源: target/ERB/其他/NTR.ERB  @NTR_VIDEO、@NTR_PLAY、@NTR_CHILD_BIRTH
 */

'use strict';

const era = require('#/era-electron');
const { ntr_koujo } = require('#/kojo/kojo-system');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const era_flag = require('#/era-utils/era-flag');
const { chara_callname } = require('#/utils/callname-utils');

function default_rand(n) {
  return Math.floor(Math.random() * n);
}

const times = (value, rate) => Math.trunc(value * rate);

// @DECIDE_ABLUP2/3 在同一算法中以这组序号切换私处/肛门语义。
// 序号来自 target/ERB/ABL/DECIDE_ABLUP*.ERB；保持为单张语义表，
// 避免下方各具名访问器在两分支间错配。
const SENSATION_KIND = Object.freeze({
  vaginal: {
    ability: (current) => current.system.私处感觉,
    jewel: 1,
    experience: (current) => current.dungeon.私处经验,
    mania: (current) => current.event.性爱狂,
    blocked: (current) => current.chara.私处钝感,
    sensitive: (current) => current.chara.私处敏感,
    other_blocks: (current) => [
      current.chara.阴蒂钝感,
      current.chara.肛门钝感,
      current.chara.乳房钝感,
    ],
  },
  anal: {
    ability: (current) => current.system.肛门感觉,
    jewel: 2,
    experience: (current) => current.dungeon.肛门经验,
    mania: (current) => current.stronghold.尻穴狂,
    blocked: (current) => current.chara.肛门钝感,
    sensitive: (current) => current.chara.肛门敏感,
    other_blocks: (current) => [
      current.chara.阴蒂钝感,
      current.chara.私处钝感,
      current.chara.乳房钝感,
    ],
  },
});

function name_of(cid) {
  return chara_callname(cid);
}

function sensation_cost(level) {
  const costs = [1, 20, 400, 8000, 20000, 40000, 60000, 90000, 120000, 180000];
  const exps = [2, 10, 30, 75, 150, 180, 250, 350, 500, 600];
  if (level < 10) return [costs[level], exps[level]];
  let cost;
  let exp;
  let loops;
  let cost_rate;
  let exp_rate;
  if (level < 15) {
    [cost, exp, loops, cost_rate, exp_rate] = [
      180000,
      600,
      level - 9,
      1.25,
      1.15,
    ];
  } else if (level < 20) {
    [cost, exp, loops, cost_rate, exp_rate] = [
      362000,
      966,
      level - 14,
      1.2,
      1.2,
    ];
  } else {
    [cost, exp, loops, cost_rate, exp_rate] = [
      583000,
      1942,
      level - 19,
      1.15,
      1.25,
    ];
  }
  for (let i = 0; i < loops; i += 1) {
    cost = Math.trunc(cost * cost_rate);
    exp = Math.trunc(exp * exp_rate);
  }
  return [cost, exp];
}

function decide_sensation_up(cid, kind) {
  const vaginal = kind === 'vaginal';
  const current = chara(cid);
  const {
    ability,
    jewel: juel_id,
    experience,
    mania,
    blocked,
    sensitive,
    other_blocks,
  } = SENSATION_KIND[kind];
  const level = ability(current);
  const block_count = other_blocks(current).reduce(
    (sum, value) => sum + ((value & 2) !== 0 ? 1 : 0),
    0,
  );
  if (vaginal && current.chara.男人) return undefined;
  if (level >= 5 && !mania(current)) return undefined;
  if (level >= block_count * 5 + 10) return undefined;
  if ((blocked(current) & 2) !== 0) return undefined;

  let [cost, needed_exp] = sensation_cost(level);
  if (current.event.戒备森严) {
    const rate = level === 4 ? 2 : level === 5 ? 2.5 : level >= 6 ? 3 : 1;
    cost = times(cost, rate);
    needed_exp = times(needed_exp, rate);
  }
  if (blocked(current)) {
    cost = times(cost, 1.2);
    needed_exp = times(needed_exp, 1.1);
  }
  if (level > 5 && level <= 10 && block_count > 0) {
    cost = Math.trunc((cost * (15 - block_count)) / 15);
    needed_exp = Math.trunc((needed_exp * (20 - block_count)) / 20);
  } else if (level <= 15 && block_count > 1) {
    cost = Math.trunc((cost * (16 - block_count)) / 15);
    needed_exp = Math.trunc((needed_exp * (21 - block_count)) / 20);
  } else if (level <= 20 && block_count > 2) {
    cost = Math.trunc((cost * (17 - block_count)) / 15);
    needed_exp = Math.trunc((needed_exp * (22 - block_count)) / 20);
  }
  for (const [present, rate] of [
    [current.stronghold.淫乱, 0.8],
    [mania(current), 0.8],
    [sensitive(current), 0.8],
  ]) {
    if (present) {
      cost = times(cost, rate);
      needed_exp = times(needed_exp, rate);
    }
  }
  cost = Math.max(cost, 1);
  needed_exp = Math.max(needed_exp, 1);
  return {
    allowed:
      (era.get(`juel:${cid}:${juel_id}`) || 0) >= cost &&
      experience(current) >= needed_exp,
    cost,
  };
}

function decide_desire_up(cid) {
  const current = chara(cid);
  const level = current.system.欲望;
  if (level >= 5 && !current.chara.容易陷落 && !current.stronghold.淫乱)
    return undefined;
  if (level >= 10) return undefined;
  let cost = [5, 50, 1000, 5000, 12000, 20000, 30000, 50000, 80000, 150000][
    level
  ];
  if (current.event.戒备森严) {
    cost = times(
      cost,
      level === 3
        ? 1.5
        : level === 4
          ? 2
          : level === 5
            ? 2.5
            : level >= 6
              ? 3
              : 1,
    );
  }
  if (current.event.克制) cost = times(cost, 1.2);
  if (current.chara.保守的) cost = times(cost, 1.1);
  if (current.event.看重贞操) cost = times(cost, 1.5);
  else if (current.chara.看轻贞操) cost = times(cost, 0.95);
  if (current.event.压抑) cost = times(cost, 1.5);
  else if (current.chara.开放) cost = times(cost, 0.9);
  if (current.event.抵抗) cost = times(cost, 1.5);
  if (current.chara.害羞) cost = times(cost, 1.1);
  else if (current.chara.不知羞耻) cost = times(cost, 0.95);
  if (current.chara.接受快感) cost = times(cost, 0.8);
  else if (current.event.否定快感) cost = times(cost, 1.5);
  for (const [present, rate] of [
    [current.chara.容易上瘾, 0.95],
    [current.chara.容易陷落, 0.5],
    [current.stronghold.淫乱, 0.7],
    [current.dungeon.妓女, 0.9],
    [current.dungeon.倾城, 0.8],
    [current.chara.人妻, 0.8],
  ]) {
    if (present) cost = times(cost, rate);
  }
  cost = Math.max(cost, 1);
  const ignores_abnormal = [
    current.chara.开放,
    current.chara.接受快感,
    current.chara.容易陷落,
    current.stronghold.淫乱,
    current.event.疯狂,
  ].some(Boolean);
  const needed_exp =
    !ignores_abnormal && level === 4
      ? 1
      : !ignores_abnormal && level === 7
        ? 3
        : 0;
  return {
    allowed:
      (era.get(`juel:${cid}:5`) || 0) >= cost &&
      current.dungeon.异常经验 >= needed_exp,
    cost,
  };
}

async function ntr_play(cid, rand = default_rand) {
  const previous_target = era_flag.target;
  const current = chara(cid);
  era_flag.target = cid;
  try {
    await era.printAndWait('收到了使者专程送来的水晶球');
    era.print(`水晶球里${name_of(cid)}`);

    if (
      (current.chara.处女 === 1 && rand(2) === 0) ||
      (current.chara.特别服装类型 === 79 &&
        (current.train.着衣状态 & 64) !== 0 &&
        game.system.着衣系统) ||
      current.chara.私处封印
    ) {
      era.print('的肛门正承受着');
      era.print(
        game.system.狂王性别 === 0 || game.system.狂王性别 === 2
          ? '狂王的巨根'
          : '巨型假阳具',
      );
      await era.printAndWait('的无套侵犯……');
      await ntr_koujo(2, rand);
      era.print('肛门经验+10');
      current.dungeon.肛门经验 += 10;
      if (game.system.狂王性别 === 1) {
        era.print(`${era.get('expname:40') ?? ''}+10`);
        current.train.百合经验 += 5;
      } else {
        era.print('精液经验+10');
        current.dungeon.精液经验 += 10;
      }
      era.print(`${era.get('palamname:2') ?? ''}点数＋2000`);
      await era.printAndWait(`${era.get('palamname:5') ?? ''}点数＋2500`);
      era.add(`juel:${cid}:2`, 2000); // JUEL:2 = 屈服珠
      era.add(`juel:${cid}:5`, 2500); // JUEL:5 = 欲情珠
      return 0;
    }

    if (current.chara.处女 === 1) {
      await era.printAndWait('丧失处女的情景被拍下来了…');
      await ntr_koujo(1, rand);
      era.print('私处经验+3');
      current.dungeon.私处经验 += 3;
      era.print(`${era.get('palamname:1') ?? ''}点数＋600`);
      await era.printAndWait(`${era.get('palamname:5') ?? ''}点数＋750`);
      era.add(`juel:${cid}:1`, 600); // JUEL:1 = 快感珠
      era.add(`juel:${cid}:5`, 750); // JUEL:5 = 欲情珠
      await era.printAndWait('【处女丧失】');
      chara(cid).chara.处女 = 0;
      chara(cid).stronghold.狂王俘虏 = 1;
      chara(cid).train.初体验对象 = 105;
      current.system.设置狂王纹章(rand(8) + 10);
      await era.printAndWait(`${name_of(cid)}的身体已经完全变成了狂王的形状了`);
      return 0;
    }

    if (rand(10) === 0 && current.train.兽奸中毒 > 0) {
      era.print('在被观众包围的舞台上，');
      await era.printAndWait('与狗交配的情景被拍下来了…');
      await ntr_koujo(3, rand);
      if (current.chara.男人) {
        era.print('肛门经验+20');
        current.dungeon.肛门经验 += 20;
      } else {
        era.print('私处经验+20');
        current.dungeon.私处经验 += 20;
      }
      era.print('精液经验+20');
      era.print('兽奸经验+20');
      current.dungeon.精液经验 += 20;
      current.dungeon.兽奸经验 += 20;
      if (!current.chara.男人) {
        era.print(`${era.get('palamname:1') ?? ''}点数＋4000`);
        era.add(`juel:${cid}:1`, 4000); // JUEL:1 = 快感珠
      }
      await era.printAndWait(`${era.get('palamname:5') ?? ''}点数＋5000`);
      era.add(`juel:${cid}:5`, 5000); // JUEL:5 = 欲情珠
      if ((game.dungeon.游戏设定 & 4) !== 0) current.dungeon.犬膣内射精 = 10;
      return 0;
    }

    const p = rand(4) + 4;
    if (p === 4) {
      era.print(
        game.system.狂王性别 === 0 || game.system.狂王性别 === 2
          ? '正被狂王的巨根肉棒'
          : '正被巨型假肉棒',
      );
      era.print(
        '无套侵犯着，不争气的淫乱小穴对属于狂王的大肉棒吸啜不已的样子被拍下来了…',
      );
      await era.printAndWait(
        `${name_of(cid)}主动怀抱住狂王的脖颈，深深地拥吻，彼此的舌头交缠在了一起…`,
      );
      await era.printAndWait(
        '有一瞬间望向了镜头，但马上又沉迷地扭动着腰肢服侍起了狂王的大肉棒……',
      );
      await ntr_koujo(4, rand);
      if (current.chara.男人) {
        era.print('肛门经验+5');
        current.dungeon.肛门经验 += 5;
      } else {
        era.print('私处经验+5');
        current.dungeon.私处经验 += 5;
      }
      if (game.system.狂王性别 === 1) {
        era.print(`${era.get('expname:40') ?? ''}+5`);
        current.dungeon.私处经验 += 5; // 原作无条件再加一次 EXP:0
        current.train.百合经验 += 5;
        era.print(`${era.get('palamname:1') ?? ''}点数＋1000`);
        era.add(`juel:${cid}:1`, 1000); // JUEL:1 = 快感珠
      } else {
        era.print('精液经验+5');
        current.dungeon.精液经验 += 5;
        if (!current.chara.男人) {
          era.print(`${era.get('palamname:1') ?? ''}点数＋1000`);
          era.add(`juel:${cid}:1`, 1000); // JUEL:1 = 快感珠
        }
        if ((game.dungeon.游戏设定 & 4) !== 0) current.system.狂王膣内射精 = 10;
      }
      await era.printAndWait(`${era.get('palamname:5') ?? ''}点数＋1250`);
      era.add(`juel:${cid}:5`, 1250); // JUEL:5 = 欲情珠
      if (current.train.初吻对象 === -1) current.train.初吻对象 = 993;
    } else if (p === 5) {
      era.print(
        game.system.狂王性别 === 0 || game.system.狂王性别 === 2
          ? '被很多男人包围着，'
          : '被很多装着假阳具的女人包围着，',
      );
      era.print(
        current.chara.男人
          ? '被包围轮奸侵犯的样子被拍下来了……'
          : '两穴同时被侵犯的样子被拍下来了……',
      );
      era.print(`${name_of(cid)}向狂王发着完全忠诚的爱的誓言，`);
      await era.printAndWait('没有一丝犹豫，毫不嫌弃地为狂王高亢娇喘着…');
      await ntr_koujo(5, rand);
      if (!current.chara.男人) {
        era.print('私处经验+10');
        current.dungeon.私处经验 += 10;
      }
      era.print('肛门经验+10');
      current.dungeon.肛门经验 += 10;
      if (game.system.狂王性别 === 1) {
        era.print(`${era.get('expname:40') ?? ''}+5`);
        current.train.百合经验 += 5;
      } else {
        era.print('精液经验+10');
        current.dungeon.精液经验 += 10;
        if ((game.dungeon.游戏设定 & 4) !== 0) current.dungeon.客膣内射精 = 10;
      }
      if (!current.chara.男人 || game.system.狂王性别 !== 1) {
        era.print(`${era.get('palamname:1') ?? ''}点数＋2000`);
        era.add(`juel:${cid}:1`, 2000); // JUEL:1 = 快感珠
      }
      era.print(`${era.get('palamname:2') ?? ''}点数＋2000`);
      await era.printAndWait(`${era.get('palamname:5') ?? ''}点数＋2500`);
      era.add(`juel:${cid}:2`, 2000); // JUEL:2 = 屈服珠
      era.add(`juel:${cid}:5`, 2500); // JUEL:5 = 欲情珠
    } else if (p === 6) {
      await era.printAndWait('作为性处理便器的样子被拍下来了…');
      if (!current.chara.男人)
        era.print('身上写着「私处10G，肛门免费」的文字，');
      await era.printAndWait('还有性交的次数也写在身上。');
      era.print(`${name_of(cid)}向狂王发着完全忠诚的誓言，`);
      await era.printAndWait('毫不讨厌地作为便器侍奉着每一位来宾…');
      await ntr_koujo(6, rand);
      if (!current.chara.男人) era.print('私处经验+20');
      era.print('肛门经验+20');
      era.print('精液经验+20');
      if (!current.chara.男人) current.dungeon.私处经验 += 20;
      current.dungeon.肛门经验 += 20;
      current.dungeon.精液经验 += 20;
      if (!current.chara.男人) {
        era.print(`${era.get('palamname:1') ?? ''}点数＋4000`);
        era.add(`juel:${cid}:1`, 4000); // JUEL:1 = 快感珠
      }
      era.print(`${era.get('palamname:2') ?? ''}点数＋4000`);
      await era.printAndWait(`${era.get('palamname:5') ?? ''}点数＋5000`);
      era.add(`juel:${cid}:2`, 4000); // JUEL:2 = 屈服珠
      era.add(`juel:${cid}:5`, 5000); // JUEL:5 = 欲情珠
      if ((game.dungeon.游戏设定 & 4) !== 0) current.dungeon.客膣内射精 = 10;
    } else if (p === 7) {
      era.print(`侍奉狂王${game.system.狂王性别 === 1 ? '小穴' : '肉棒'}`);
      await era.printAndWait('的样子被拍下来了……');
      era.print(`${name_of(cid)}作为狂王传递信息的道具，`);
      await era.printAndWait('对着镜头一边痴情的舔着一边淫荡地笑着……');
      era.print('那张脸被来自狂王的');
      era.print(game.system.狂王性别 === 1 ? '爱液' : '精液');
      await era.printAndWait('，彻底地玷污了……');
      await ntr_koujo(7, rand);
      if (game.system.狂王性别 !== 1) {
        era.print('口交经验+3');
        era.print('精液经验+3');
        current.dungeon.口交经验 += 3;
        current.dungeon.精液经验 += 3;
        if (current.train.初吻对象 === -1) current.train.初吻对象 = 993;
      }
      await era.printAndWait(`${era.get('palamname:5') ?? ''}点数＋1250`);
      era.add(`juel:${cid}:5`, 1250); // JUEL:5 = 欲情珠
    }
    await era.waitAnyKey();
    return 0;
  } finally {
    era_flag.target = previous_target;
  }
}

async function ntr_video(cid, rand = default_rand) {
  const current = chara(cid);
  if (current.invasion.状态 !== 9) return 0;
  era.print('');
  if (rand(6) === 0 && current.chara.妊娠 === 0 && cid > 0) {
    era.print(`狂王命令${name_of(cid)}去封印魔王，`);
    await era.printAndWait(`${name_of(cid)}往地下城出发了。`);
    current.invasion.状态 = 2; // 原作前后重复写同一值
    current.dungeon.侵攻阶层 = 1;
    current.event.侵攻度 = 0;
    current.invasion.状态 = 2;
    current.dungeon.再起点 = 3;
    if (current.chara.善恶值 < -50) current.chara.善恶值 = -50;
    current.chara.好感度 = 20;
    return 0;
  }

  await ntr_play(cid, rand);
  for (const [abl_id, juel_id, upgrade, decide] of [
    [
      2,
      1,
      () => (current.system.私处感觉 += 1),
      () => decide_sensation_up(cid, 'vaginal'),
    ],
    [
      3,
      2,
      () => (current.system.肛门感觉 += 1),
      () => decide_sensation_up(cid, 'anal'),
    ],
    [11, 5, () => (current.system.欲望 += 1), () => decide_desire_up(cid)],
  ]) {
    const result = decide();
    if (result?.allowed) {
      const level = upgrade();
      era.add(`juel:${cid}:${juel_id}`, -result.cost); // JUEL = 各能力的升级珠
      era.print(`${era.get(`ablname:${abl_id}`) ?? ''}变为LV${level}`);
    }
  }
  return 0;
}

/** @NTR_CHILD_BIRTH（NTR.ERB:360-394）：狂王侧的出产影像。 */
async function ntr_child_birth(rand = default_rand) {
  const target = era_flag.target;
  const current = chara(target);
  const name = chara_callname(target);
  era.print('');
  await era.printAndWait('从狂王处收到了水晶球。');
  // TALENT:122 = 男人
  if (current.chara.男人) {
    await era.printAndWait(`水晶球里播放着${name}在狂王和观众的面前`);
    await era.printAndWait('以南人的身份用被改造后的肛门公开生孩子的视频。');
  } else {
    await era.printAndWait(
      `水晶球里播放着${name}在狂王和观众前公开生孩子的视频。`,
    );
  }

  const father = current.event.妊娠相手;
  if (father === 7 || father === 4 || father === 2 || father === 3) {
    await era.printAndWait(
      '被魔法药物促进发育的胎儿，全身肌肤和毛发都是雪白的婴儿呱呱坠地了。',
    );
    if (father === 7) {
      await era.printAndWait(
        '『都不知道生了几个这样的，从十人之后就没数了。』狂王笑着说，周围的观众也都笑了。',
      );
    } else if (father === 4) {
      await era.printAndWait(
        '『连父亲都不知道是谁的孩子，就当成是你的啦！』狂王笑着说，周围的观众也都笑了。',
      );
    } else {
      await era.printAndWait(
        '『在勇者之间配对，是个不错的爱好，不止魔王才这样哦！』狂王笑着说，周围的观众也都笑了。',
      );
    }
  } else {
    await era.printAndWait(
      '『污秽的肚子里，只能生出怪物了吗？』周围的观众嘲笑着。',
    );
    if (rand(3) === 0) {
      await era.printAndWait('刚出生的怪物，当场被肢解杀掉了………');
    } else if (rand(2) === 0) {
      await era.printAndWait('刚出生的怪物，企图攻击狂王，被随手杀掉了………');
    } else {
      await era.printAndWait(
        '刚出生的怪物，被举高丢地板上，举高丢地板上，好几次，被摔死了………',
      );
    }
  }

  await ntr_koujo(20, rand);
  return 0;
}

module.exports = { ntr_video, ntr_play, ntr_child_birth };
