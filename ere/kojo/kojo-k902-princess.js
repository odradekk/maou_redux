/**
 * 普林希丝（K902）的最小口上事件钩子。
 *
 * 源: target/ERB/口上/EVENT_K902_普林希丝 ver1.0.3.ERB
 * 裁定: issue #14。该文件是 K903 嘉德口上的未完成复制品，25 个台词
 * 函数仍全部名为 _903。原作分发 `_902` 时 TRYCALL 静默落空，
 * 因此本模块只保留事件钩子，不向任何口上族注册 902。
 */

'use strict';

const era = require('#/era-electron');
const { on, TIER } = require('#/system/event/registry');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { game } = require('#/facade/game');

// @EVENTTRAIN #PRI：已加载 K902 文件时置存在标志，并按原作开启口上。 // :17-21
on(
  'EVENTTRAIN',
  () => {
    const target = era_flag.target;
    if ((era.get(`ex_talent:${target}:102`) || 0) != 1) {
      return 0; // :34-35
    }
    era_exflag.set(102, 1); // :19 EX_FLAG:102 = K902 口上存在标志
    if (game.kojo.口上开关 === 0) {
      game.kojo.口上开关 = 2; // :20-21 FLAG:7 = 口上开关
    }
    return 0;
  },
  TIER.PRI,
);

// @EVENTEND #LATER：调教结束清存在标志。 // :23-25
on('EVENTEND', () => era_exflag.set(102, 0), TIER.LATER); // :25
