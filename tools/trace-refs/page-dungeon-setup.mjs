// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：page-dungeon-setup.mjs

export const FILES = [
  {
    js: 'ere/page/page-dungeon-setup.js',
    refs: [
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '459-460',
        any: [/^\t\t\tPRINT ★$/m],
      },
      // target/ERB/迷宮/DUNGEON_SETUP.ERB
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '5-231',
        any: [/^\s*@DUNGEON_INFO$/m, /^\s*IF FLAG:502 == 1$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '8-11',
        any: [/^\s*IF FLAG:502 == 1$/m, /^\s*CALL DUNGEON_INFO_MAP$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '14',
        any: [/^\s*DRAWLINE$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '16-79',
        any: [/^\s*REPEAT 9$/m, /^\s*SETCOLORBYNAME RoyalBlue$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '17',
        any: [/^\s*SETCOLORBYNAME RoyalBlue$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '19-28',
        any: [/^\s*X = COUNT \+ 300$/m, /^\s*Y = FLAG:X$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '22',
        any: [/^\s*PRINTFORM \[\{COUNT\}\] 第\{COUNT \+ 1\}阶层　陷阱：无$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '31-52',
        any: [/^\s*X = COUNT \+ 310$/m, /^\s*Y = FLAG:X$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '57-66',
        any: [/^\s*X = COUNT \+ 350$/m, /^\s*Y = FLAG:X$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '69-78',
        any: [/^\s*X = COUNT \+ 340$/m, /^\s*Y = FLAG:X$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '81-82',
        any: [
          /^\s*PRINTFORML \[9\] 部下状态总览$/m,
          /^\s*PRINTFORML \[10\]1～3层 \[11\]4～6层 \[12\]7～9层 的部下$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '88-92',
        any: [/^\s*IF RESULT < 0$/m, /^\s*GOTO INPUT_LOOP$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '95-143',
        any: [
          /^\s*IF RESULT >= 9 && RESULT <= 12$/m,
          /^\s*PRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '101-137',
        any: [/^\s*Z = 0$/m, /^\s*R = 100$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '119-123',
        any: [/^\s*IF X != 10$/m, /^\s*PRINTFORML 第\{X\}阶层$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '128-133',
        any: [/^\s*IF B > 0$/m, /^\s*PRINTV B$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '140',
        any: [/^\s*WAIT$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '145-146',
        any: [/^\s*SIF RESULT == 100$/m, /^\s*RETURN 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '148',
        any: [/^\s*X = RESULT$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '150-177',
        any: [
          /^\s*PRINTFORML 进行第\{X \+ 1\}阶层的设定$/m,
          /^\s*PRINTL 《请选择要设置的陷阱和宝物》$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '153-163',
        any: [/^\s*Y = 0$/m, /^\s*REPEAT 29$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '164-173',
        any: [/^\s*REPEAT 21$/m, /^\s*Z = COUNT \+ 300$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '179-231',
        any: [/^\s*\$INPUT_LOOP_2$/m, /^\s*INPUT$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '181-185',
        any: [/^\s*IF RESULT < 0$/m, /^\s*GOTO INPUT_LOOP_2$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '187-194',
        any: [/^\s*IF RESULT == 0$/m, /^\s*Y = X \+ 300$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '195-198',
        any: [/^\s*ELSEIF RESULT == 1$/m, /^\s*Y = X \+ 340$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '199-201',
        any: [/^\s*ELSEIF RESULT == 2$/m, /^\s*CALL ROOM_SETUP$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '202-203',
        any: [/^\s*ELSEIF RESULT == 998$/m, /^\s*GOTO INPUT_LOOP$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '204-205',
        any: [/^\s*ELSEIF RESULT == 999$/m, /^\s*RETURN 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '207-231',
        any: [/^\s*Z = RESULT$/m, /^\s*IF Z < 100$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '208-229',
        any: [/^\s*IF Z < 100$/m, /^\s*\$INPUT_LOOP_3$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '211-215',
        any: [/^\s*INPUT$/m, /^\s*IF RESULT < 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '212-215',
        any: [/^\s*IF RESULT < 0$/m, /^\s*GOTO INPUT_LOOP_3$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '216-223',
        any: [/^\s*ELSEIF RESULT == 3$/m, /^\s*Y = X \+ 300$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '225-226',
        any: [/^\s*Y = X \+ 300$/m, /^\s*Y \+= RESULT \* 10$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '227-229',
        any: [/^\s*ELSEIF Z > 300$/m, /^\s*Y = X \+ 340$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '237-264',
        any: [/^\s*@ENEMY_EXIST$/m, /^\s*REPEAT CHARANUM$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '240',
        any: [/^\s*SETCOLOR 255,255,0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '241',
        any: [/^\s*IF CFLAG:COUNT:501 == X && COUNT != MASTER\s*$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '242-255',
        any: [
          /^\s*IF CFLAG:COUNT:1 == 2$/m,
          /^\s*PRINTFORM %SAVESTR:COUNT%\[侵攻中\]$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '259',
        any: [/^\s*SIF X == 10 && COUNT != MASTER && EX_TALENT:COUNT:1$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '259-260',
        any: [
          /^\s*SIF X == 10 && COUNT != MASTER && EX_TALENT:COUNT:1$/m,
          /^\s*PRINTFORML %SAVESTR:COUNT%\[护卫中\]$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '268-307',
        any: [/^\s*@ROOM_SETUP$/m, /^\s*\$INPUT_LOOP_4$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '276-284',
        any: [/^\s*REPEAT 7$/m, /^\s*Z = COUNT \+ 500$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '290-292',
        any: [/^\s*IF RESULT == 0$/m, /^\s*Y = X \+ 350$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '293-294',
        any: [/^\s*ELSEIF RESULT == 999$/m, /^\s*RETURN 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '295-303',
        any: [
          /^\s*ELSEIF RESULT >= 500 && RESULT <= 507$/m,
          /^\s*IF MONEY < 10000$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '297-299',
        any: [/^\s*PRINTL \*资金不足！！\*$/m, /^\s*RETURN 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '300-301',
        any: [/^\s*MONEY -= 10000$/m, /^\s*EX_FLAG:4444 -= 10000$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '304-305',
        any: [/^\s*ELSE$/m, /^\s*GOTO INPUT_LOOP_4$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '311-483',
        any: [/^\s*@DUNGEON_INFO_MAP$/m, /^\s*\$INPUT_LOOP_MAP$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '332-334',
        any: [/^\s*IF RESULT == 1$/m, /^\s*CALL GEO_OUTPUT_2$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '332-334',
        any: [/^\s*CALL GEO_OUTPUT_2$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '335-384',
        any: [
          /^\s*ELSEIF RESULT >= 2 && RESULT <= 5$/m,
          /^\s*PRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '342-378',
        any: [/^\s*Z = 0$/m, /^\s*R = 100$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '386-387',
        any: [/^\s*SIF RESULT == 100$/m, /^\s*RETURN 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '390-393',
        any: [/^\s*CALL MON_LIMIT$/m, /^\s*SIF RESULT == 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '395-483',
        any: [/^\s*\$INPUT_LOOP_MONSET$/m, /^\s*PRINTL \*放置怪物\*$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '397-411',
        any: [/^\s*PRINTL \*放置怪物\*$/m, /^\s*PRINTL 请设定怪物的等级$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '403-404',
        any: [/^\s*IF RESULT == 0$/m, /^\s*GOTO INPUT_LOOP_MAP$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '405-408',
        any: [/^\s*ELSEIF RESULT == 100$/m, /^\s*CALL MON_SET_OMAKASE$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '409-410',
        any: [
          /^\s*ELSEIF RESULT < 0 \|\| RESULT >= 11$/m,
          /^\s*GOTO INPUT_LOOP_MONSET$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '413-428',
        any: [/^\s*LOCAL:2 = RESULT$/m, /^\s*PRINTL 请设定怪物的X坐标$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '426-427',
        any: [
          /^\s*ELSEIF RESULT < 0 \|\| RESULT >= 33$/m,
          /^\s*GOTO INPUT_LOOP_MONSET$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '430-444',
        any: [/^\s*LOCAL:3 = RESULT$/m, /^\s*PRINTL 请设定怪物的Y坐标$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '442-443',
        any: [
          /^\s*ELSEIF RESULT < 0 \|\| RESULT >= 33$/m,
          /^\s*GOTO INPUT_LOOP_MONSET$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '448-451',
        any: [
          /^\s*IF LOCAL:3 == 16 && LOCAL:4 == 16$/m,
          /^\s*PRINTW 无法在此放置$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '453',
        any: [/^\s*SETFONT "ＭＳ ゴシック"$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '455-468',
        any: [/^\s*FOR LOCAL:1,0,32$/m, /^\s*FOR LOCAL:0,0,32$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '470',
        any: [/^\s*SETFONT$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '472-473',
        any: [
          /^\s*PRINTW 确定放置在★的所在？$/m,
          /^\s*PRINTL \[0\] 好的  \[1\] 不要$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '475-476',
        any: [/^\s*SIF RESULT != 0$/m, /^\s*GOTO INPUT_LOOP_MAP$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '478',
        any: [/^\s*DB:\(LOCAL:4\):\(LOCAL:3\) = LOCAL:2$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '480-483',
        any: [/^\s*PRINTW \*放置了怪物\*$/m, /^\s*GOTO INPUT_LOOP_MAP$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '486-516',
        any: [/^\s*@MON_SET_OMAKASE$/m, /^\s*LOCAL:0 = 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '492',
        any: [/^\s*LOCAL:0 = 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '496-497',
        any: [/^\s*SIF LOCAL:0 > 100$/m, /^\s*RETURN 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '500-502',
        any: [/^\s*CALL MON_LIMIT$/m, /^\s*SIF RESULT == 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '505-507',
        any: [/^\s*LOCAL:2 = RAND:10$/m, /^\s*LOCAL:3 = RAND:32$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '509-511',
        any: [
          /^\s*IF LOCAL:3 == 16 && LOCAL:4 == 16$/m,
          /^\s*GOTO INPUT_LOOP_MONSET_OMAKASE$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_SETUP.ERB',
        ref: '512',
        any: [/^\s*DB:\(LOCAL:4\):\(LOCAL:3\) = LOCAL:2$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
