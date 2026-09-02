// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：labo-dungeon-map.mjs

export const FILES = [
  // —— #181 H12 2D 地下城：ere/dungeon/labo-dungeon-map.js。锚 = 所引区间首个非空行的原文 ——
  {
    js: 'ere/dungeon/labo-dungeon-map.js',
    refs: [
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '1-3',
        any: [/﻿;フィールドでの戦闘/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '5-78',
        any: [/@DUNGEON_MAP/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '7-12',
        any: [/;迎撃時体力が回復していると迎撃再開/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '14-15',
        any: [/;フラグオフ/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '17',
        any: [/CALL UNIT_MOVE/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '19',
        any: [/BASE:A:1 -= RAND:6/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '21-28',
        any: [/;帰還するかどうか/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '23',
        any: [/	PRINTFORML %SAVESTR:A%決定返回了/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '26',
        any: [/	PRINTFORML %SAVESTR:A%決定返回了/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '27',
        any: [/	CFLAG:A:507 = 1/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '29-30',
        any: [/SIF RAND:5 == 0/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '32-34',
        any: [/;宝箱を見つける/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '36-37',
        any: [/;アイテムの使用/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '39-40',
        any: [/;移動を反映/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '42-74',
        any: [/;休憩フェイズ/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '44-48',
        any: [/;装備効果\(キャンプ\)/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '50-54',
        any: [/;装備効果\(キャンプ禁止\)/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '56-74',
        any: [/IF CFLAG:A:1 == 2 && CFLAG:A:503 & 1/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '58',
        any: [/		PRINTL  /],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '59',
        any: [/		DRAWLINE/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '60',
        any: [/		PRINTFORMW %SAVESTR:A%藏起來休息了/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '61',
        any: [/		DRAWLINE/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '62',
        any: [/		PRINTL /],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '64',
        any: [/ELSEIF CFLAG:A:1 == 2 && CFLAG:A:503 & 1/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '68',
        any: [/		PRINTFORMW %SAVESTR:A%在安全的地方紮營，休息了/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '69-73',
        any: [/		DRAWLINE/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '72-73',
        any: [/ELSEIF CFLAG:A:1 == 3/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '75-76',
        any: [/SIF FLAG:5 & 32/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '77',
        any: [/TARGET = -1/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '83-235',
        any: [/@UNIT_MOVE/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '85-89',
        any: [/IF CFLAG:A:507 == 0/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '92-95',
        any: [/W:8 = 17/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '98-101',
        any: [/W:8 = 19/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '101',
        any: [/	X \/= 2/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '103-111',
        any: [/IF CFLAG:A:509 == 1/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '113-118',
        any: [/IF CFLAG:A:1 == 2/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '130-138',
        any: [/IF D:20 < 0/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '139-148',
        any: [/ELSEIF D:20 > 10/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '140',
        any: [/	D:20 \/= 10/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '151-155',
        any: [/;領域外を避ける/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '157-161',
        any: [/LOCAL:10 = DA:\(LOCAL:1\):\(LOCAL:0\)\/32/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '171-177',
        any: [/IF LOCAL:0 == 16 && LOCAL:1 == 16/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '172',
        any: [/	CFLAG:A:501 = 2/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '174',
        any: [/	PRINTL 這裡就是魔王城了嗎………/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '175',
        any: [/					JUMP ENDING_2/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '179-202',
        any: [/CALL UNIT_CHECK/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '181-183',
        any: [/	IF CFLAG:RESULT:1 == CFLAG:A:1/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '184-199',
        any: [/	ELSEIF CFLAG:RESULT:1 == 2/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '187',
        any: [/		CALL DUNGEON_BATTLE2/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '189-195',
        any: [/		IF RESULT == 2/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '189-199',
        any: [/		IF RESULT == 2/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '192',
        any: [/			PRINTFORMW 得到了\{1000 \* CFLAG:B:9\}G！/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '197',
        any: [/			TARGET = -1/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '198',
        any: [/			RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '205-222',
        any: [/CALL MON_CHECK/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '208-209',
        any: [/	SIF CFLAG:A:1 == 3/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '211',
        any: [/	CALL DUNGEON_BATTLE/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '213',
        any: [/	IF CFLAG:A:1 != 2/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '213-220',
        any: [/	IF CFLAG:A:1 != 2/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '216',
        any: [/		PRINTFORML 得到了\{1000 \* CFLAG:A:9\}G！/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '226-227',
        any: [/CFLAG:A:510 = P:0/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '229-233',
        any: [/IF D:20 < 0/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '238-247',
        any: [/@CONFIG_LABO_MAP_STATUS/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '243',
        any: [/		PRINT ２Ｄ/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '245',
        any: [/		PRINT 普通/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '247',
        any: [/PRINTL /],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '250-270',
        any: [/@CONFIG_LABO_MAP_SETTING/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '253',
        any: [/PRINTL \[0\]普通/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '254',
        any: [/PRINTL \[1\]２Ｄ/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '255',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '256',
        any: [/PRINTL \[100\] 返回/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '259',
        any: [/	INPUT/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '261-265',
        any: [/		CASE 0 TO 1/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '266-267',
        any: [/		CASE 100/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '269',
        any: [/	CLEARLINE 1/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '273-281',
        any: [/@LABO_MAP_SET/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '275',
        any: [/CALL GEO_TEST/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '275-281',
        any: [/CALL GEO_TEST/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '276',
        any: [/CALL SET_VIL/],
      },
      {
        src: 'target/ERB/迷宮/LABO_DUNGEON_MAP.ERB',
        ref: '277-281',
        any: [/FOR LOCAL:0,0,50/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
