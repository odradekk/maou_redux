// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：dungeon-lvup.mjs

export const FILES = [
  // —— #179 H10 升级：ere/dungeon/dungeon-lvup.js ——
  {
    js: 'ere/dungeon/dungeon-lvup.js',
    refs: [
      {
        src: 'target/ERB/迷宮/LVUP.ERB',
        ref: '2-41',
        any: [/^\s*@LVUP,\ ARG:0$/m],
      },
      {
        src: 'target/ERB/迷宮/LVUP.ERB',
        ref: '44-89',
        any: [/^\s*@ST_UP,\ ARG:0$/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '619',
        any: [/^\s*CALL LVUP, 0$/m],
      },
      {
        src: 'target/ERB/迷宮/LVUP.ERB',
        ref: '12',
        any: [/^\s*;魔王必要经验值 = LV \* 100 \+ 10/],
      },
      {
        src: 'target/ERB/迷宮/LVUP.ERB',
        ref: '45-47',
        any: [/^\s*CFLAG:\(ARG:0\):9\ \+=\ 1$/m],
      },
      {
        src: 'target/ERB/迷宮/LVUP.ERB',
        ref: '13',
        any: [/^\s*LOCAL\ =\ LOCAL:0$/m],
      },
      {
        src: 'target/ERB/迷宮/LVUP.ERB',
        ref: '14',
        any: [/^\s*ELSEIF\ TALENT:ARG:220\ ==\ 1$/m],
      },
      {
        src: 'target/ERB/迷宮/LVUP.ERB',
        ref: '48-54',
        any: [/^\s*LOCAL:0\ =\ RAND:2$/m],
      },
      {
        src: 'target/ERB/迷宮/LVUP.ERB',
        ref: '55-58',
        any: [/^\s*IF\ DAY\ >=\ 100$/m],
      },
      {
        src: 'target/ERB/迷宮/LVUP.ERB',
        ref: '59-62',
        any: [/^\s*IF\ TALENT:\(ARG:0\):240\ ==\ 1$/m],
      },
      {
        src: 'target/ERB/迷宮/LVUP.ERB',
        ref: '63-66',
        any: [/^\s*IF\ TALENT:\(ARG:0\):248\ ==\ 1$/m],
      },
      {
        src: 'target/ERB/迷宮/LVUP.ERB',
        ref: '69-72',
        any: [/^\s*IF\ TALENT:\(ARG:0\):314\ ==\ 5$/m],
      },
      {
        src: 'target/ERB/迷宮/LVUP.ERB',
        ref: '75-76',
        any: [/^\s*SIF\ TALENT:\(ARG:0\):314\ ==\ 11$/m],
      },
      {
        src: 'target/ERB/迷宮/LVUP.ERB',
        ref: '79-80',
        any: [/^\s*SIF\ TALENT:ARG:261\ ==\ 1$/m],
      },
      {
        src: 'target/ERB/迷宮/LVUP.ERB',
        ref: '83-84',
        any: [/^\s*SIF\ TALENT:ARG:262\ ==\ 1$/m],
      },
      {
        src: 'target/ERB/迷宮/LVUP.ERB',
        ref: '86-87',
        any: [/^\s*MAXBASE:\(ARG:0\):0\ \+=\ 10$/m],
      },
      {
        src: 'target/ERB/迷宮/LVUP.ERB',
        ref: '6',
        any: [/^\s*LOCAL:0\ =\ CFLAG:\(ARG:0\):9\ \*\ 10\ \+\ 10$/m],
      },
      {
        src: 'target/ERB/迷宮/LVUP.ERB',
        ref: '14-17',
        any: [/^\s*ELSEIF\ TALENT:ARG:220\ ==\ 1$/m],
      },
      {
        src: 'target/ERB/迷宮/LVUP.ERB',
        ref: '8',
        any: [/^\s*LOCAL:2\ =\ 0$/m],
      },
      {
        src: 'target/ERB/迷宮/LVUP.ERB',
        ref: '10-29',
        any: [/^\s*\$LVUP_REPEAT$/m],
      },
      {
        src: 'target/ERB/迷宮/LVUP.ERB',
        ref: '11-21',
        any: [/^\s*IF\ ARG\ ==\ MASTER$/m],
      },
      {
        src: 'target/ERB/迷宮/LVUP.ERB',
        ref: '24-28',
        any: [/^\s*EXP:ARG:80\ \-=\ LOCAL$/m],
      },
      {
        src: 'target/ERB/迷宮/LVUP.ERB',
        ref: '31-34',
        any: [/^\s*IF\ LOCAL:2\ >\ 0$/m],
      },
      {
        src: 'target/ERB/迷宮/LVUP.ERB',
        ref: '35-39',
        any: [
          /^\s*IF\ TALENT:\(ARG:0\):291\ \&\&\ CFLAG:\(ARG:0\):9\ >=\ 30$/m,
        ],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
