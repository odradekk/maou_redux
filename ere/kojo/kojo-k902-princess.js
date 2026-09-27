/**
 * 普林希丝（K902）的最小口上事件钩子。
 *
 */

'use strict';

const era = require('#/era-electron');
const { on, TIER } = require('#/system/event/registry');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { game } = require('#/facade/game');

// @EVENTTRAIN #PRI：已加载 K902 文件时置存在标志，并按原作开启口上。
on(
  'EVENTTRAIN',
  () => {
    const target = era_flag.target;
    if ((era.get(`ex_talent:${target}:102`) || 0) != 1) {
      return 0;
    }
    era_exflag.set(102, 1); // EX_FLAG:102 = K902 口上存在标志
    if (game.kojo.口上开关 === 0) {
      game.kojo.口上开关 = 2; // FLAG:7 = 口上开关
    }
    return 0;
  },
  TIER.PRI,
);

// @EVENTEND #LATER：调教结束清存在标志。
on('EVENTEND', () => era_exflag.set(102, 0), TIER.LATER);
