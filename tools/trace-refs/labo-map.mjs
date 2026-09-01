// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：labo-map.mjs

export const FILES = [
  // —— #181 H12 2D 地下城：ere/dungeon/labo-map.js。锚 = 所引区间首个非空行的原文 ——
  {
    js: 'ere/dungeon/labo-map.js',
    refs: [
      {
        src: 'target/ERB/迷宮/LABO_MAP.ERB',
        ref: '6-23',
        any: [/@GEO_OUTPUT_2/],
      },
      {
        src: 'target/ERB/迷宮/LABO_MAP.ERB',
        ref: '9',
        any: [/SETFONT "ＭＳ ゴシック"/],
      },
      { src: 'target/ERB/迷宮/LABO_MAP.ERB', ref: '18', any: [/	PRINTL /] },
      { src: 'target/ERB/迷宮/LABO_MAP.ERB', ref: '21', any: [/SETFONT/] },
      { src: 'target/ERB/迷宮/LABO_MAP.ERB', ref: '23', any: [/WAIT/] },
      {
        src: 'target/ERB/迷宮/LABO_MAP.ERB',
        ref: '26-47',
        any: [/@UNIT_CHECK/],
      },
      {
        src: 'target/ERB/迷宮/LABO_MAP.ERB',
        ref: '33-34',
        any: [/	SIF CFLAG:COUNT:1 != 2 && CFLAG:COUNT:1 != 3/],
      },
      { src: 'target/ERB/迷宮/LABO_MAP.ERB', ref: '36-37', any: [/	SIF X < 0/] },
      { src: 'target/ERB/迷宮/LABO_MAP.ERB', ref: '39-40', any: [/	SIF Y < 0/] },
      {
        src: 'target/ERB/迷宮/LABO_MAP.ERB',
        ref: '42-43',
        any: [/	SIF X == P:0 && Y == P:1/],
      },
      { src: 'target/ERB/迷宮/LABO_MAP.ERB', ref: '47', any: [/RETURN -1/] },
      {
        src: 'target/ERB/迷宮/LABO_MAP.ERB',
        ref: '51-77',
        any: [/@MON_CHECK/],
      },
      {
        src: 'target/ERB/迷宮/LABO_MAP.ERB',
        ref: '59-60',
        any: [/SIF LOCAL:0 <= 0 \|\| LOCAL:0 >= 10/],
      },
      {
        src: 'target/ERB/迷宮/LABO_MAP.ERB',
        ref: '72-73',
        any: [/SIF LOCAL:1 > 20/],
      },
      {
        src: 'target/ERB/迷宮/LABO_MAP.ERB',
        ref: '75',
        any: [/DB:\(P:1\):\(P:0\) = 0/],
      },
      {
        src: 'target/ERB/迷宮/LABO_MAP.ERB',
        ref: '80-91',
        any: [/@VIL_CHECK/],
      },
      {
        src: 'target/ERB/迷宮/LABO_MAP.ERB',
        ref: '88-89',
        any: [/SIF X <= 0/],
      },
      {
        src: 'target/ERB/迷宮/LABO_MAP.ERB',
        ref: '95-139',
        any: [/@CHIP_DRAW/],
      },
      {
        src: 'target/ERB/迷宮/LABO_MAP.ERB',
        ref: '100-104',
        any: [/IF P:0 == 16 && P:1 == 16/],
      },
      {
        src: 'target/ERB/迷宮/LABO_MAP.ERB',
        ref: '106',
        any: [/CALL UNIT_CHECK/],
      },
      {
        src: 'target/ERB/迷宮/LABO_MAP.ERB',
        ref: '108-112',
        any: [/	IF CFLAG:RESULT:1 == 2/],
      },
      { src: 'target/ERB/迷宮/LABO_MAP.ERB', ref: '113-115', any: [/	ELSE/] },
      {
        src: 'target/ERB/迷宮/LABO_MAP.ERB',
        ref: '121',
        any: [/CALL MON_CHECK/],
      },
      {
        src: 'target/ERB/迷宮/LABO_MAP.ERB',
        ref: '123',
        any: [/	CALL C_OUT_MON\(RESULT\)/],
      },
      {
        src: 'target/ERB/迷宮/LABO_MAP.ERB',
        ref: '127-131',
        any: [/CALL VIL_CHECK/],
      },
      {
        src: 'target/ERB/迷宮/LABO_MAP.ERB',
        ref: '134-135',
        any: [/LOCAL:2 = DA:\(P:1\):\(P:0\)\/32/],
      },
      {
        src: 'target/ERB/迷宮/LABO_MAP.ERB',
        ref: '142-159',
        any: [/@SET_VIL/],
      },
      {
        src: 'target/ERB/迷宮/LABO_MAP.ERB',
        ref: '154-155',
        any: [/	SIF LOCAL:0 == 16 && LOCAL:1 == 16/],
      },
      {
        src: 'target/ERB/迷宮/LABO_MAP.ERB',
        ref: '162-181',
        any: [/@MON_LIMIT/],
      },
      {
        src: 'target/ERB/迷宮/LABO_MAP.ERB',
        ref: '176-177',
        any: [/SIF LOCAL:2 <= 120/],
      },
      {
        src: 'target/ERB/迷宮/LABO_MAP.ERB',
        ref: '179',
        any: [/PRINTL \*怪物的配置到极限了\*/],
      },
      {
        src: 'target/ERB/迷宮/LABO_MAP.ERB',
        ref: '183-228',
        any: [/@C_OUT_MON,ARG:0/],
      },
      {
        src: 'target/ERB/迷宮/LABO_MAP.ERB',
        ref: '221-222',
        any: [/	CASEELSE/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
