// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：monster-data.mjs

export const FILES = [
  // —— #175 H6 战斗：ere/dungeon/monster-data.js。锚 = 所引区间首个非空行的原文 ——
  {
    js: 'ere/dungeon/monster-data.js',
    refs: [
      {
        src: 'target/ERB/怪物相關/MONSTER_DATA.ERB',
        ref: '112-170',
        any: [/LV = CFLAG:0:9 \/ 12 \+ 2/],
      },
      {
        src: 'target/ERB/怪物相關/MONSTER_DATA.ERB',
        ref: '154-170',
        any: [/;GROUP战用/],
      },
      {
        src: 'target/ERB/怪物相關/MONSTER_DATA.ERB',
        ref: '171-172',
        any: [/SIF INUM < 1000/],
      },
      {
        src: 'target/ERB/怪物相關/MONSTER_DATA.ERB',
        ref: '174-182',
        any: [/ELSEIF LINE == 5/],
      },
      {
        src: 'target/ERB/怪物相關/MONSTER_DATA.ERB',
        ref: '184-214',
        any: [/;ボス化初期化/],
      },
      {
        src: 'target/ERB/怪物相關/MONSTER_DATA.ERB',
        ref: '1994-2032',
        any: [/@SKELETON, ARG:0, ARG:1/],
      },
      {
        src: 'target/ERB/怪物相關/MONSTER_DATA.ERB',
        ref: '216-339',
        any: [/LOCAL:0 = RAND:150 \+ 100/],
      },
      {
        src: 'target/ERB/怪物相關/MONSTER_DATA.ERB',
        ref: '2-461',
        any: [
          /@MONSTER_DATA, ARG:0, ARG:1, ARG:2 = -1, ARG:3 = -1, GROUP = -1/,
        ],
      },
      {
        src: 'target/ERB/怪物相關/MONSTER_DATA.ERB',
        ref: '2701-2766',
        any: [/@MONSTERNAME\(L_ID\)/],
      },
      {
        src: 'target/ERB/怪物相關/MONSTER_DATA.ERB',
        ref: '2772-2878',
        any: [/;----------------------------------/],
      },
      {
        src: 'target/ERB/怪物相關/MONSTER_DATA.ERB',
        ref: '2861-2875',
        any: [/NAME_LENG -= 22/],
      },
      {
        src: 'target/ERB/怪物相關/MONSTER_DATA.ERB',
        ref: '341-355',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/怪物相關/MONSTER_DATA.ERB',
        ref: '357-419',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/怪物相關/MONSTER_DATA.ERB',
        ref: '421-437',
        any: [/LOCAL = E:\(TOP\+1\)/],
      },
      {
        src: 'target/ERB/怪物相關/MONSTER_DATA.ERB',
        ref: '443-456',
        any: [/E:\(TOP\+2\) \+= LVUP/],
      },
      {
        src: 'target/ERB/怪物相關/MONSTER_DATA.ERB',
        ref: '96-110',
        any: [/;16 射撃/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
