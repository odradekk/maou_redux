/**
 * @file NTR 出产演出（issue #333）。
 * 源: target/ERB/其他/NTR.ERB  @NTR_CHILD_BIRTH（:360-394）
 */

'use strict';

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { ntr_koujo } = require('#/kojo/kojo-system');

function default_rand(n) {
  return Math.floor(Math.random() * n);
}

async function ntr_child_birth(rand = default_rand) {
  const target = era_flag.target;
  const name = era.get(`callname:${target}:-1`) ?? '';
  era.print('');
  await era.printAndWait('从狂王处收到了水晶球。');
  // TALENT:122 = 男人
  if (era.get(`talent:${target}:122`)) {
    await era.printAndWait(`水晶球里播放着${name}在狂王和观众的面前`);
    await era.printAndWait('以南人的身份用被改造后的肛门公开生孩子的视频。');
  } else {
    await era.printAndWait(
      `水晶球里播放着${name}在狂王和观众前公开生孩子的视频。`,
    );
  }

  const father = era.get(`cflag:${target}:102`) || 0; // CFLAG:102 妊娠相手
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

module.exports = { ntr_child_birth };
