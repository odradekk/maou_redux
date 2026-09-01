// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：labo.mjs

export const FILES = [
  // —— #181 H12 2D 地下城：ere/dungeon/labo.js。锚 = 所引区间首个非空行的原文 ——
  {
    js: 'ere/dungeon/labo.js',
    refs: [
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '67',
        any: [/\tCALL GEO_TEST/],
      },
      { src: 'target/ERB/迷宮/LABO.ERB', ref: '3-40', any: [/@LABO/] },
      { src: 'target/ERB/迷宮/LABO.ERB', ref: '6', any: [/PRINTL ----------/] },
      {
        src: 'target/ERB/迷宮/LABO.ERB',
        ref: '7',
        any: [/PRINTL \[LABORATORY\]/],
      },
      {
        src: 'target/ERB/迷宮/LABO.ERB',
        ref: '8',
        any: [/PRINTL \[001\] 文字色彩测试/],
      },
      {
        src: 'target/ERB/迷宮/LABO.ERB',
        ref: '9',
        any: [/PRINTL \[004\] GEO_MAKE/],
      },
      {
        src: 'target/ERB/迷宮/LABO.ERB',
        ref: '10',
        any: [/PRINTL \[005\] GEO_OUTPUT/],
      },
      {
        src: 'target/ERB/迷宮/LABO.ERB',
        ref: '11',
        any: [/PRINTL \[006\] GEO清除/],
      },
      {
        src: 'target/ERB/迷宮/LABO.ERB',
        ref: '12',
        any: [/PRINTL \[007\] 图片测试/],
      },
      {
        src: 'target/ERB/迷宮/LABO.ERB',
        ref: '13',
        any: [/PRINTL \[008\] 头像测试/],
      },
      {
        src: 'target/ERB/迷宮/LABO.ERB',
        ref: '14',
        any: [/PRINTL \[100\] 返回/],
      },
      { src: 'target/ERB/迷宮/LABO.ERB', ref: '15', any: [/INPUT/] },
      { src: 'target/ERB/迷宮/LABO.ERB', ref: '17-18', any: [/CASE 100/] },
      {
        src: 'target/ERB/迷宮/LABO.ERB',
        ref: '20',
        any: [/	CALL COLOR_OUTPUT_TEST/],
      },
      { src: 'target/ERB/迷宮/LABO.ERB', ref: '26', any: [/	CALL GEO_TEST/] },
      { src: 'target/ERB/迷宮/LABO.ERB', ref: '28', any: [/	CALL GEO_OUTPUT/] },
      { src: 'target/ERB/迷宮/LABO.ERB', ref: '30', any: [/	CALL DA_CLEAR/] },
      {
        src: 'target/ERB/迷宮/LABO.ERB',
        ref: '32',
        any: [/	PRINT_IMG "HEART_R"/],
      },
      { src: 'target/ERB/迷宮/LABO.ERB', ref: '33', any: [/	PRINTL/] },
      { src: 'target/ERB/迷宮/LABO.ERB', ref: '35', any: [/	CALL U_FACE/] },
      { src: 'target/ERB/迷宮/LABO.ERB', ref: '42-48', any: [/@DA_CLEAR/] },
      {
        src: 'target/ERB/迷宮/LABO.ERB',
        ref: '50-55',
        any: [/@COLOR_OUTPUT_TEST/],
      },
      { src: 'target/ERB/迷宮/LABO.ERB', ref: '54', any: [/PRINTL /] },
      { src: 'target/ERB/迷宮/LABO.ERB', ref: '57-93', any: [/@C_OUT,ARG:0/] },
      { src: 'target/ERB/迷宮/LABO.ERB', ref: '86', any: [/	CASEELSE/] },
      { src: 'target/ERB/迷宮/LABO.ERB', ref: '86-87', any: [/	CASEELSE/] },
      { src: 'target/ERB/迷宮/LABO.ERB', ref: '90', any: [/PRINT ,/] },
      { src: 'target/ERB/迷宮/LABO.ERB', ref: '96-107', any: [/@GEO_OUTPUT/] },
      { src: 'target/ERB/迷宮/LABO.ERB', ref: '106', any: [/	PRINTL /] },
      { src: 'target/ERB/迷宮/LABO.ERB', ref: '109-240', any: [/@GEO_TEST/] },
      {
        src: 'target/ERB/迷宮/LABO.ERB',
        ref: '110-128',
        any: [/;------------------------------/],
      },
      {
        src: 'target/ERB/迷宮/LABO.ERB',
        ref: '128',
        any: [/;------------------------------/],
      },
      {
        src: 'target/ERB/迷宮/LABO.ERB',
        ref: '132-134',
        any: [/;正方形を作る/],
      },
      { src: 'target/ERB/迷宮/LABO.ERB', ref: '133', any: [/LOCAL:3 = 5/] },
      {
        src: 'target/ERB/迷宮/LABO.ERB',
        ref: '136',
        any: [/LOCAL:4 = \(LOCAL:3 - 1\) \* 8/],
      },
      {
        src: 'target/ERB/迷宮/LABO.ERB',
        ref: '147-158',
        any: [/FOR \(LOCAL:6\),0,LOCAL:3/],
      },
      {
        src: 'target/ERB/迷宮/LABO.ERB',
        ref: '165-181',
        any: [/FOR LOCAL:10,0,LOCAL:3/],
      },
      {
        src: 'target/ERB/迷宮/LABO.ERB',
        ref: '175-178',
        any: [/		FOR LOCAL:5,\(LOCAL:0 \+ 1\),\(LOCAL:0 \+ 8\)/],
      },
      {
        src: 'target/ERB/迷宮/LABO.ERB',
        ref: '185-201',
        any: [/FOR LOCAL:11,0,LOCAL:3/],
      },
      {
        src: 'target/ERB/迷宮/LABO.ERB',
        ref: '207-240',
        any: [/FOR LOCAL:11,0,LOCAL:3 - 1/],
      },
      {
        src: 'target/ERB/迷宮/LABO.ERB',
        ref: '218-224',
        any: [/		LOCAL:12 = DA:\(LOCAL:1\):\(LOCAL:0\)/],
      },
      {
        src: 'target/ERB/迷宮/LABO.ERB',
        ref: '232',
        any: [
          /				CALL GEO_CALC_INTERP\( LOCAL:12,LOCAL:13,LOCAL:14,LOCAL:15,\(LOCAL:5-LOCAL:0\),\(LOCAL:6-LOCAL:1\),LOCAL:5,LOCAL:6 \)/,
        ],
      },
      {
        src: 'target/ERB/迷宮/LABO.ERB',
        ref: '243-296',
        any: [
          /@GEO_CALC_INTERP\(ARG:0,ARG:1,ARG:2,ARG:3,ARG:4,ARG:5,ARG:6,ARG:7\)/,
        ],
      },
      {
        src: 'target/ERB/迷宮/LABO.ERB',
        ref: '295',
        any: [
          /DA:\(ARG:7\):\(ARG:6\) = \(ARG:0-ARG:1-ARG:2\+ARG:3\)\*\(LOCAL:0\)\*\(LOCAL:1\)\/10000 \+ \(ARG:1-ARG:0\)\*\(LOCAL:0\)\/100 \+ \(ARG:2-ARG:0\)\*\(LOCAL:1\)\/100 \+ ARG:0/,
        ],
      },
      {
        src: 'target/ERB/迷宮/LABO.ERB',
        ref: '299-330',
        any: [/@LINEAR_INTERP_COS_X\(ARG:0,ARG:1,ARG:2,ARG:3\)/],
      },
      {
        src: 'target/ERB/迷宮/LABO.ERB',
        ref: '333-364',
        any: [/@LINEAR_INTERP_COS_Y\(ARG:0,ARG:1,ARG:2,ARG:3\)/],
      },
      { src: 'target/ERB/迷宮/LABO.ERB', ref: '335', any: [/;X軸上の補完/] },
      { src: 'target/ERB/迷宮/LABO.ERB', ref: '366', any: [/@U_FACE/] },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
