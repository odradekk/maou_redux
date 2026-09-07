// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #340：怪物玩弄主流程、列表与十三个种族分支。

export const FILES = [
  {
    js: 'ere/dungeon/monster-play.js',
    refs: [
      {
        src: 'target/ERB/怪物相關/MONSTER_PLAY.ERB',
        ref: '5-74',
        any: [/@MONSTER_PLAY/, /BEGIN TURNEND/],
      },
      {
        src: 'target/ERB/怪物相關/MONSTER_PLAY.ERB',
        ref: '77-96',
        any: [/@MONSTERPLAY_LIST/, /FOR LOCAL:0, 100, 200/],
      },
      {
        src: 'target/ERB/怪物相關/MONSTER_PLAY.ERB',
        ref: '99-117',
        any: [/@MONSTER_PLAY_DOG/, /CFLAG:A:106 \+= Y/],
      },
      {
        src: 'target/ERB/怪物相關/MONSTER_PLAY.ERB',
        ref: '121-167',
        any: [/@ORC_MONSTER_PLAY/, /CFLAG:A:107 \+= Y/],
      },
      {
        src: 'target/ERB/怪物相關/MONSTER_PLAY.ERB',
        ref: '170-203',
        any: [/@SLIME_MONSTER_PLAY/, /JUEL:A:8 \+= Y \* 10/],
      },
      {
        src: 'target/ERB/怪物相關/MONSTER_PLAY.ERB',
        ref: '206-234',
        any: [/@INSECT_MONSTER_PLAY/, /EXP:A:1 \+= Y/],
      },
      {
        src: 'target/ERB/怪物相關/MONSTER_PLAY.ERB',
        ref: '237-268',
        any: [/@IVY_MONSTER_PLAY/, /JUEL:A:10 \+= Y \* 10/],
      },
      {
        src: 'target/ERB/怪物相關/MONSTER_PLAY.ERB',
        ref: '271-317',
        any: [/@SYOKUSYU_MONSTER_PLAY/, /EXP:A:55 \+= Y/],
      },
      {
        src: 'target/ERB/怪物相關/MONSTER_PLAY.ERB',
        ref: '320-346',
        any: [/@FAILY_MONSTER_PLAY/, /JUEL:A:5 \+= Y \* 10/],
      },
      {
        src: 'target/ERB/怪物相關/MONSTER_PLAY.ERB',
        ref: '349-377',
        any: [/@GIANT_MONSTER_PLAY/, /X = 0/],
      },
      {
        src: 'target/ERB/怪物相關/MONSTER_PLAY.ERB',
        ref: '380-418',
        any: [/@MAN_MONSTER_PLAY/, /EXP:A:20 \+= Y/],
      },
      {
        src: 'target/ERB/怪物相關/MONSTER_PLAY.ERB',
        ref: '421-456',
        any: [/@GIRL_MONSTER_PLAY/, /EXP:A:40 \+= Y/],
      },
      {
        src: 'target/ERB/怪物相關/MONSTER_PLAY.ERB',
        ref: '459-475',
        any: [/@BEAST_MONSTER_PLAY/, /EXP:A:56 \+= Y/],
      },
      {
        src: 'target/ERB/怪物相關/MONSTER_PLAY.ERB',
        ref: '478-507',
        any: [/@BRAIN_MONSTER_PLAY/, /BASE:A:0 = 0/],
      },
      {
        src: 'target/ERB/怪物相關/MONSTER_PLAY.ERB',
        ref: '510-531',
        any: [/@HORSE_MONSTER_PLAY/, /JUEL:A:10 \+= Y \* 10/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
