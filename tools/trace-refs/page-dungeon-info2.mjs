// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：page-dungeon-info2.mjs

export const FILES = [
  // —— #180（H11 迷宫情报与建设：DUNGEON_INFO2.ERB / DUNGEON_SETUP.ERB）——
  {
    js: 'ere/page/page-dungeon-info2.js',
    refs: [
      // target/ERB/迷宮/DUNGEON_INFO2.ERB
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '2-492',
        any: [/^\s*@DUNGEON_INFO2$/m, /^\s*#DIM DISPLAY_FLAG = 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '3-9',
        any: [
          /^\s*#DIM DISPLAY_FLAG = 0$/m,
          /^\s*#DIM SELECT_FLAG = 0, 0, 0$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '12',
        any: [/^\s*REDRAW 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '15',
        any: [/^\s*CUSTOMDRAWLINE =$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '17',
        any: [/^\s*WHILE RESULT != 999$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '18',
        any: [/^\s*DISPLAY_LINE = 17$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '20-46',
        any: [/^\s*LINE_COUNT:0 = 4$/m, /^\s*LINE_COUNT:1 = 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '48-52',
        any: [
          /^\s*FONTBOLD$/m,
          /^\s*CALL MENU_BUTTON, \(DISPLAY_FLAG != 0\), @"%UNICODE\(0x258c\)% 陷 阱　", 900$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '54-123',
        any: [/^\s*COMPARE_BIT = 1$/m, /^\s*FOR LCOUNT:0, 0, 9$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '56',
        any: [
          /^\s*PRINTFORM \[\{\(LCOUNT:0 \+ 1\) \* 10 \+ 100\}\] 第\{LCOUNT:0 \+ 1\}阶层\s*$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '58-79',
        any: [/^\s*IF DISPLAY_FLAG == 0$/m, /^\s*FOR LCOUNT:1, 0, 3$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '65',
        any: [/^\s*SETCOLOR 128, 255, 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '67',
        any: [/^\s*SETCOLORBYNAME RoyalBlue$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '75-76',
        any: [/^\s*PRINTFORM 陷阱：%"无",18,LEFT%$/m, /^\s*FLAG:X = -1$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '81-99',
        any: [/^\s*ELSEIF DISPLAY_FLAG == 1$/m, /^\s*X = LCOUNT:0 \+ 350$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '87',
        any: [/^\s*SETCOLOR 128, 255, 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '89',
        any: [/^\s*SETCOLORBYNAME RoyalBlue$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '96-97',
        any: [/^\s*PRINTFORM 设施：通路$/m, /^\s*FLAG:X = 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '101-119',
        any: [/^\s*ELSE$/m, /^\s*X = LCOUNT:0 \+ 340$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '107',
        any: [/^\s*SETCOLOR 128, 255, 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '109',
        any: [/^\s*SETCOLORBYNAME RoyalBlue$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '124-128',
        any: [
          /^\s*IF DISPLAY_FLAG == 0$/m,
          /^\s*PRINTFORML \[200\] 全部陷阱 \[201\]陷阱%"　Ａ",21,LEFT%  \[202\]陷阱%"　Ｂ",21,LEFT%  \[203\]陷阱　Ｃ$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '131-132',
        any: [
          /^\s*SIF SELECT_FLAG:0 == 0 && SELECT_FLAG:1 == 0 && SELECT_FLAG:2 == 0$/m,
          /^\s*SETCOLOR 128, 128, 128$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '132',
        any: [/^\s*SETCOLOR 128, 128, 128$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '134-246',
        any: [/^\s*IF DISPLAY_FLAG == 0$/m, /^\s*Y = 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '136-166',
        any: [/^\s*Y = 0$/m, /^\s*LINE_COUNT:1 = 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '139',
        any: [/^\s*PRINTL \[  0\] 解除陷阱$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '149',
        any: [
          /^\s*PRINTFORM \[\{LCOUNT:0, 3\}\] %ITEMNAME:\(LCOUNT:0\), 16, LEFT%（\{ITEM:\(LCOUNT:0\), 2\}）$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '153-159',
        any: [/^\s*ELSEIF DIALOGUE:1 == -1$/m, /^\s*RESETCOLOR$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '171-180',
        any: [/^\s*IF DIALOGUE:1 > 0$/m, /^\s*IF DIALOGUE:0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '187-192',
        any: [/^\s*ELSEIF DIALOGUE:1 == -2$/m, /^\s*DISPLAY_LINE -= 1$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '193-204',
        any: [/^\s*ELSE$/m, /^\s*Y = 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '214-245',
        any: [/^\s*ELSE$/m, /^\s*Y = 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '240-241',
        any: [
          /^\s*IF LINE_COUNT:0 > LINE_COUNT:1$/m,
          /^\s*FOR LCOUNT:0, LINE_COUNT:1, LINE_COUNT:0$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '249-252',
        any: [
          /^\s*PRINTFORML \[10\] 部下状态总览$/m,
          /^\s*PRINTFORM \[11\]1～3层 \[12\]4～6层 \[13\]7～9层 \[14\]近卫兵$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '251',
        any: [/^\s*PRINTPLAIN  显示部下\s*$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '252',
        any: [
          /^\s*PRINTFORML \[100\]怪物迎击    　现在：\\@\(FLAG:5 & 16\) \?關閉#開啟\\@$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '256-262',
        any: [/^\s*IF DIALOGUE:1 < 0$/m, /^\s*WAITANYKEY$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '265-320',
        any: [
          /^\s*IF DISPLAY_FLAG == 0$/m,
          /^\s*IF RESULT > 100 && RESULT < 204$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '268',
        any: [/^\s*COMPARE_BIT = 1 << RESULT \/ 10 - 11$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '270-279',
        any: [
          /^\s*IF RESULT == 200$/m,
          /^\s*IF SELECT_FLAG:0 == 511 && SELECT_FLAG:1 == 511 && SELECT_FLAG:2 == 511$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '281-291',
        any: [
          /^\s*ELSEIF RESULT % 10 == 0$/m,
          /^\s*COMPARE_BIT = 1 << RESULT \/ 10 - 11$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '293-298',
        any: [
          /^\s*ELSEIF RESULT > 200$/m,
          /^\s*IF SELECT_FLAG:\(RESULT - 201\) == 511$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '300-301',
        any: [
          /^\s*ELSEIF RESULT % 10 < 4$/m,
          /^\s*SELECT_FLAG:\(RESULT % 10 - 1\) \^= COMPARE_BIT$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '304-319',
        any: [
          /^\s*ELSEIF \(RESULT == 0\) \|\| \(RESULT >= 60 && RESULT < 89 && ITEM:RESULT\)$/m,
          /^\s*SIF SELECT_FLAG:0 == 0 && SELECT_FLAG:1 == 0 && SELECT_FLAG:2 == 0$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '322-376',
        any: [/^\s*ELSEIF DISPLAY_FLAG == 1$/m, /^\s*IF DIALOGUE:1 > 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '324-346',
        any: [
          /^\s*IF RESULT == 0$/m,
          /^\s*IF \(MONEY >= 10000 \* DIALOGUE:1 && DIALOGUE:0 != 0\) \|\| \(DIALOGUE:0 == 0\)$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '325',
        any: [
          /^\s*IF \(MONEY >= 10000 \* DIALOGUE:1 && DIALOGUE:0 != 0\) \|\| \(DIALOGUE:0 == 0\)$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '334-335',
        any: [
          /^\s*MONEY -= 10000 \* DIALOGUE:1$/m,
          /^\s*EX_FLAG:4444 -= 10000 \* DIALOGUE:1$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '352-353',
        any: [
          /^\s*IF RESULT > 100 && RESULT < 200$/m,
          /^\s*SELECT_FLAG:0 \^= 1 << RESULT \/ 10 - 11$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '355-360',
        any: [/^\s*ELSEIF RESULT == 200$/m, /^\s*IF SELECT_FLAG:0 == 511$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '362-375',
        any: [
          /^\s*ELSEIF \(RESULT == 0\) \|\| \(RESULT >= 500 && RESULT < 508\)$/m,
          /^\s*IF SELECT_FLAG:0 == 0$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '370',
        any: [/^\s*IF SELECT_FLAG & COMPARE_BIT$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '378-403',
        any: [/^\s*ELSE$/m, /^\s*IF RESULT > 100 && RESULT < 200$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '381-382',
        any: [
          /^\s*IF RESULT > 100 && RESULT < 200$/m,
          /^\s*SELECT_FLAG:0 \^= 1 << RESULT \/ 10 - 11$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '384-389',
        any: [/^\s*ELSEIF RESULT == 200$/m, /^\s*IF SELECT_FLAG:0 == 511$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '391-402',
        any: [
          /^\s*ELSEIF \(RESULT == 0\) \|\| \(RESULT >= 300 && RESULT < 340 && ITEM:RESULT\)$/m,
          /^\s*IF SELECT_FLAG:0 == 0$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '397',
        any: [/^\s*IF SELECT_FLAG & COMPARE_BIT$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '407-412',
        any: [
          /^\s*IF RESULT >= 900 && RESULT <= 902$/m,
          /^\s*DISPLAY_FLAG = RESULT % 10$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '415-417',
        any: [/^\s*IF RESULT == 100$/m, /^\s*FLAG:5 \^= 16$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '420-477',
        any: [/^\s*IF RESULT >= 10 && RESULT <= 14$/m, /^\s*\$PRINT$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '421-424',
        any: [
          /^\s*\$PRINT$/m,
          /^\s*PRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '421-477',
        any: [
          /^\s*\$PRINT$/m,
          /^\s*PRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '426-438',
        any: [/^\s*Z = 0$/m, /^\s*R = 100$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '439',
        any: [/^\s*KAI_LIST = RESULT$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '440-465',
        any: [/^\s*REPEAT 100$/m, /^\s*SIF Z >= 100 \|\| R <= 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '447',
        any: [/^\s*WAIT$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '449-453',
        any: [/^\s*IF X != 10$/m, /^\s*PRINTFORML 第\{X\}阶层$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '454',
        any: [/^\s*CALL ENEMY_EXIST2\(X\)$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '460',
        any: [/^\s*PRINTFORML \[\{A\}\] \{B\}只%MONSTERNAME\(A\)%\s*$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '468',
        any: [/^\s*PRINTL \[999\] 返回$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '469',
        any: [/^\s*INPUT$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '472',
        any: [/^\s*CALL MONSTER_SETUP,RESULT$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '472-473',
        any: [/^\s*CALL MONSTER_SETUP,RESULT$/m, /^\s*GOTO PRINT$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '479-480',
        any: [/^\s*SIF RESULT != 999$/m, /^\s*CLEARLINE DISPLAY_LINE$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '483-488',
        any: [/^\s*DISPLAY_FLAG = 0$/m, /^\s*SELECT_FLAG:0 = 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '483-491',
        any: [/^\s*DISPLAY_FLAG = 0$/m, /^\s*SELECT_FLAG:0 = 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '491',
        any: [/^\s*REDRAW 1$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '496-541',
        any: [/^\s*@ENEMY_COMPARE\(ARG, ARG:1\)$/m, /^\s*#FUNCTION$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '501-502',
        any: [/^\s*SIF ARG == ARG:1$/m, /^\s*RETURNF 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '505-506',
        any: [
          /^\s*SIF CFLAG:ARG:501 != CFLAG:\(ARG:1\):501$/m,
          /^\s*RETURNF CFLAG:ARG:501 < CFLAG:\(ARG:1\):501 \? -1 # 1$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '508-511',
        any: [
          /^\s*LOCAL = 0,0,0,0,0$/m,
          /^\s*LOCAL:3 = CFLAG:ARG:1 == 3 && CFLAG:ARG:500 == 4 \? 2 # CFLAG:ARG:1$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '514-528',
        any: [
          /^\s*IF LOCAL:3 != LOCAL:4$/m,
          /^\s*LOCAL = LOCAL:3 == 2 \? CFLAG:ARG:533 # ARG$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '531-532',
        any: [
          /^\s*SIF LOCAL != LOCAL:1$/m,
          /^\s*RETURNF CFLAG:LOCAL:502 < CFLAG:\(LOCAL:1\):502 \? -1 # 1$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '535-538',
        any: [/^\s*SIF LOCAL == ARG$/m, /^\s*RETURNF -1$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '541',
        any: [/^\s*RETURNF CFLAG:LOCAL:531 == ARG \? -1 # 1$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '545-645',
        any: [/^\s*@ENEMY_EXIST2\(ARG\)$/m, /^\s*#DIM L_CHAR$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '553-554',
        any: [/^\s*VARSET LOCAL$/m, /^\s*L_LEN = 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '557-580',
        any: [/^\s*FOR L_CHAR, 1, CHARANUM$/m, /^\s*SIF ARG == 10$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '559-560',
        any: [/^\s*SIF ARG == 10$/m, /^\s*CONTINUE$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '562-563',
        any: [/^\s*SIF CFLAG:L_CHAR:501 != ARG$/m, /^\s*CONTINUE$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '565-566',
        any: [
          /^\s*SIF \( CFLAG:L_CHAR:1 != 2 && CFLAG:L_CHAR:1 != 3 && TALENT:L_CHAR:221 == 0 \) \|\| \(\(\(CFLAG:L_CHAR:1 != 0 && ARG == 10\) \|\| \(CFLAG:L_CHAR:1 != 3 && CFLAG:L_CHAR:1 != 2\)\) && TALENT:L_CHAR:221 \)$/m,
          /^\s*CONTINUE$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '571-579',
        any: [/^\s*FOR L_INDX, 0, L_LEN$/m, /^\s*IF LOCAL:L_INDX <= 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '581-628',
        any: [/^\s*L_CHAR = 0$/m, /^\s*L_LAST = 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '584',
        any: [/^\s*L_LAST = CFLAG:L_CHAR:533$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '591',
        any: [/^\s*IF L_LAST > 0 && CFLAG:L_LAST:533 == CFLAG:L_CHAR:533$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '595',
        any: [/^\s*PRINTL$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '602-618',
        any: [/^\s*IF CFLAG:L_CHAR:507 == 1$/m, /^\s*SETCOLOR 200,200,100$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '603',
        any: [/^\s*SETCOLOR 200,200,100$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '607',
        any: [/^\s*SETCOLOR 100,255,255$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '611',
        any: [/^\s*SETCOLOR 255,100,100$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '613-617',
        any: [
          /^\s*IF CFLAG:L_CHAR:520 > 0$/m,
          /^\s*PRINTFORM \[\{CFLAG:L_CHAR:520\+1\}F侵攻\]$/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '620-625',
        any: [/^\s*IF CFLAG:L_CHAR:1 == 2$/m, /^\s*SETCOLOR 255,100,100$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '622',
        any: [/^\s*SETCOLOR 255,100,100$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '624',
        any: [/^\s*SETCOLOR 100,255,255$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '627',
        any: [/^\s*PRINTFORM %SAVESTR:L_CHAR,MAX_NAME_LEN,LEFT%\s*$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '629-630',
        any: [/^\s*PRINTL$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '632',
        any: [/^\s*IF X == 10$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '632-645',
        any: [/^\s*IF X == 10$/m, /^\s*FOR COUNT, 0, CHARANUM$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '637',
        any: [/^\s*PRINTFORM %SAVESTR:COUNT,MAX_NAME_LEN,LEFT%$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_INFO2.ERB',
        ref: '638-641',
        any: [/^\s*FOR LOCAL, 200, 212$/m, /^\s*SIF TALENT:COUNT:LOCAL$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
