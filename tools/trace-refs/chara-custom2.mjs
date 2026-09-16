// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #392 新增：chara-custom2.js 的锚表（issue #290 起一个 js 文件一份）

export const FILES = [
  {
    js: 'ere/chara/chara-custom2.js',
    refs: [
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '1-152',
        any: [/^[ \t]*﻿@CHAR_CUSTOM, ARG , ARG:1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '1-153',
        any: [/^[ \t]*﻿@CHAR_CUSTOM, ARG , ARG:1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '2',
        any: [/^[ \t]*#DIM L_PAGE[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '4',
        any: [/^[ \t]*#DIM PRICE[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '12',
        any: [/^[ \t]*\$DRAW_PAGE[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '13',
        any: [/^[ \t]*REDRAW 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '14',
        any: [/^[ \t]*CLEARLINE LINECOUNT - L_LCOUNT[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '17',
        any: [/^[ \t]*CUSTOMDRAWLINE =[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '19',
        any: [
          /^[ \t]*PRINTFORML 设定角色属性（%SAVESTR:TARGET%）	角色现价值为\{PRICE\}		<\{L_PAGE\+1\}\/5>[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '21',
        any: [
          /^[ \t]*PRINTFORML 修改角色属性（%SAVESTR:TARGET%）			<\{L_PAGE\+1\}\/5>[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '26',
        any: [/^[ \t]*CALL CHAR_CUSTOM_TALENT_PAGE\(L_PAGE,ARG:1\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '28',
        any: [/^[ \t]*CALL CHAR_CUSTOM_LOOK_PAGE\(L_PAGE-3\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '31',
        any: [/^[ \t]*IF LINECOUNT - L_LCOUNT < 27[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '31-35',
        any: [/^[ \t]*IF LINECOUNT - L_LCOUNT < 27[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '38-44',
        any: [/^[ \t]*PRINTLC \[997\] 前一页[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '38',
        any: [/^[ \t]*PRINTLC \[997\] 前一页[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '39',
        any: [/^[ \t]*PRINTLC \[999\] 确定[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '41-42',
        any: [/^[ \t]*SIF ARG:1 == 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '44',
        any: [/^[ \t]*PRINTLC \[998\] 后一页[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '47',
        any: [/^[ \t]*\$INPUT_LOOP[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '50-112',
        any: [/^[ \t]*IF RESULT == 999[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '56-58',
        any: [/^[ \t]*;魔族新勇者随机成为黑暗救世主、九尾、混沌龙[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '58',
        any: [/^[ \t]*TALENT:A:322 = RAND:3 \+ 191[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '59-77',
        any: [/^[ \t]*;人物初始设定（抄自CHARA_MAKE）[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '62',
        any: [/^[ \t]*CFLAG:A:9 = 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '63',
        any: [/^[ \t]*EXP:A:80 = 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '65',
        any: [/^[ \t]*CFLAG:A:1 = 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '67',
        any: [/^[ \t]*CALL CM_BASE[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '69',
        any: [/^[ \t]*CALL CM_KIND[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '71',
        any: [/^[ \t]*CALL CM_CLOTH	;SET_CHAR_CLOTH[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '73',
        any: [/^[ \t]*CALL RANDOM_SELF_CALL, A[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '75',
        any: [/^[ \t]*IF GETBIT\(FLAG:5,12\) \|\| GETBIT\(FLAG:5,15\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '76',
        any: [/^[ \t]*CALL CHAR_BODY_GENERATE_WAPPED, A[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '78-82',
        any: [/^[ \t]*;妊娠设定出产日期[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '80',
        any: [/^[ \t]*CFLAG:A:110 = DAY \+ 10 \+ RAND:6[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '81',
        any: [/^[ \t]*CFLAG:A:111 = 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '86',
        any: [
          /^[ \t]*PRINTFORML %SAVESTR:TARGET%的最终价格是\{PRICE\}点，可以吗？[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '87',
        any: [
          /^[ \t]*PRINTL \[1\] 好，就是这样了！  \[2\] 我还想再修改一下。[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '92',
        any: [/^[ \t]*PRINTW 钱不够，还是重新设定吧！[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '95',
        any: [
          /^[ \t]*PRINTFORMW 花费金钱\{PRICE\}点，%SAVESTR:TARGET%现已加入啃鸡鸡豪华午餐。[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '96-97',
        any: [/^[ \t]*MONEY -= PRICE[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '96',
        any: [/^[ \t]*MONEY -= PRICE[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '97',
        any: [/^[ \t]*EX_FLAG:4444 -= PRICE[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '102-103',
        any: [/^[ \t]*ELSEIF  RESULT == 2[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '104-105',
        any: [/^[ \t]*GOTO LOOP[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '107-111',
        any: [/^[ \t]*ELSEIF ARG:1 == 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '108',
        any: [
          /^[ \t]*PRINTFORMW %SAVESTR:TARGET%现已加入啃鸡鸡豪华午餐。[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '113-116',
        any: [/^[ \t]*ELSEIF RESULT == 998[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '114',
        any: [/^[ \t]*SIF L_PAGE < 4[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '117-120',
        any: [/^[ \t]*ELSEIF RESULT == 997[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '121-125',
        any: [/^[ \t]*ELSEIF RESULT == 996[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '124',
        any: [/^[ \t]*DELCHARA ARG[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '128-142',
        any: [/^[ \t]*CALL CHAR_CUSTOM_TALENT_DEAL\(RESULT\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '129',
        any: [/^[ \t]*CALL CHAR_CUSTOM_TALENT_DEAL\(RESULT\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '139',
        any: [/^[ \t]*CALL CHAR_CUSTOM_LOOK_DEAL\(RESULT\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '144-145',
        any: [/^[ \t]*IF RESULT == 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '146-150',
        any: [/^[ \t]*CLEARLINE 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '147',
        any: [/^[ \t]*CLEARLINE 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '148',
        any: [/^[ \t]*REUSELASTLINE 无效值[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '149',
        any: [/^[ \t]*GOTO INPUT_LOOP[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '154-215',
        any: [/^[ \t]*@CHAR_CUSTOM_TALENT_DEAL\(L_TAL\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '154-216',
        any: [/^[ \t]*@CHAR_CUSTOM_TALENT_DEAL\(L_TAL\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '158-160',
        any: [/^[ \t]*IF !INRANGE\(L_TAL, 0,500\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '162',
        any: [/^[ \t]*TALENT:TARGET:L_TAL = ! TALENT:TARGET:L_TAL[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '163',
        any: [/^[ \t]*CALL CONFLICT_CHECK\(L_TAL\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '165-175',
        any: [/^[ \t]*;胸围变化[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '167',
        any: [/^[ \t]*IF GROUPMATCH\(L_TAL,109,110,114,116,119\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '168-172',
        any: [/^[ \t]*TALENT:109 = 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '173',
        any: [/^[ \t]*TALENT:L_TAL = L_I[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '174',
        any: [/^[ \t]*TRYCALL CHAR_BUST_REGENERATE_WAPPED, TARGET[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '176-189',
        any: [/^[ \t]*;口上唯一[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '177',
        any: [
          /^[ \t]*IF GROUPMATCH\(L_TAL,160,161,162,163,164,166,172,173,174,175\)[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '178-187',
        any: [/^[ \t]*TALENT:160 = 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '190-191',
        any: [/^[ \t]*SIF TALENT:174 == 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '192-193',
        any: [/^[ \t]*SIF TALENT:166 == 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '194-200',
        any: [/^[ \t]*;职业唯一[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '195',
        any: [/^[ \t]*IF INRANGE\(L_TAL,200,220\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '197',
        any: [/^[ \t]*TALENT:L_I = 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '201-205',
        any: [/^[ \t]*;精英固定魔族[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '202-203',
        any: [/^[ \t]*SIF L_TAL == 220[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '204-205',
        any: [/^[ \t]*SIF !\(TALENT:314 == 9\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '206-208',
        any: [/^[ \t]*;龍族有角[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '209-211',
        any: [/^[ \t]*;扶她及男人才有童贞[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '212-214',
        any: [/^[ \t]*;纤细体型不肥胖[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '217-261',
        any: [/^[ \t]*@CONFLICT_CHECK\(ARG\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '221-244',
        any: [/^[ \t]*#DIM CONST PAIRS =[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '247',
        any: [/^[ \t]*LOCAL = FINDELEMENT\(PAIRS,ARG,LOCAL\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '254',
        any: [/^[ \t]*TALENT:L_A = 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '255',
        any: [/^[ \t]*TALENT:L_B = 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '256',
        any: [/^[ \t]*TALENT:ARG = 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '264-452',
        any: [/^[ \t]*@CHAR_CUSTOM_TALENT_PAGE\(ARG=0,ARG:1\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '264-454',
        any: [/^[ \t]*@CHAR_CUSTOM_TALENT_PAGE\(ARG=0,ARG:1\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '271-449',
        any: [/^[ \t]*PRINTL ■=== 基本素质 ===■[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '378-384',
        any: [/^[ \t]*IF ARG:1 == 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '455-482',
        any: [/^[ \t]*@PRINT_SINGLE_TALENT\(ARG = -1\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '455-483',
        any: [/^[ \t]*@PRINT_SINGLE_TALENT\(ARG = -1\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '456-462',
        any: [/^[ \t]*IF ARG < 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '464-465',
        any: [/^[ \t]*SIF STRLENS\(TALENTNAME:ARG\) < 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '467-471',
        any: [/^[ \t]*IF TALENT:ARG[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '482',
        any: [/^[ \t]*RETURN LOCAL[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '484-540',
        any: [/^[ \t]*@TALENT_EMPTY_CHECK ,ARG[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '484-542',
        any: [/^[ \t]*@TALENT_EMPTY_CHECK ,ARG[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '487-500',
        any: [/^[ \t]*CHECK:1 = 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '493-494',
        any: [/^[ \t]*CASE 160 TO 175[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '496-497',
        any: [/^[ \t]*CASE 200 TO 220[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '502-531',
        any: [/^[ \t]*SIF CHECK:1 == 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '502-503',
        any: [/^[ \t]*SIF CHECK:1 == 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '504-505',
        any: [/^[ \t]*SIF CHECK:2 == 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '506-529',
        any: [/^[ \t]*SIF TALENT:ARG:300 == 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '530-531',
        any: [/^[ \t]*SIF TALENT:ARG:220 && TALENT:ARG:319 == 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '533-540',
        any: [
          /^[ \t]*IF CHECK:1 && CHECK:2 &&  TALENT:ARG:300 && TALENT:ARG:301 && TALENT:ARG:303 && TALENT:ARG:304 && TALENT:ARG:305 && TALENT:ARG:306 && TALENT:ARG:307 && TALENT:ARG:309 && TALENT:ARG:310 && TALENT:ARG:312 && TALENT:ARG:313 && TALENT:ARG:317 && !\(TALENT:ARG:220 && TALENT:ARG:319 == 0\)[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '534',
        any: [/^[ \t]*CALL CHARA_FIRST_XP , ARG[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '535',
        any: [/^[ \t]*PRINTW 人物设定完成[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '538',
        any: [/^[ \t]*PRINTW 请返回继续设定[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '539',
        any: [/^[ \t]*RETURN 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '543-594',
        any: [/^[ \t]*@CHARA_COST , ARG[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '543-595',
        any: [/^[ \t]*@CHARA_COST , ARG[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '548',
        any: [/^[ \t]*FOR L_I ,0 ,500[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '549',
        any: [/^[ \t]*IF TALENT:ARG:L_I == 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '552-583',
        any: [
          /^[ \t]*CASE 10,13,14,17,37,41,99,125,131,132,134,140,141,142,143[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '588-589',
        any: [/^[ \t]*SIF TALENT:ARG:300 == 11[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '591-592',
        any: [/^[ \t]*SIF COST < 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '593',
        any: [/^[ \t]*COST \+= 500000[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '596-794',
        any: [/^[ \t]*@CHARA_FIRST_XP , ARG[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '597',
        any: [/^[ \t]*\$LOOP2[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '606-607',
        any: [/^[ \t]*SIF EX_TALENT:ARG:2[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '610',
        any: [/^[ \t]*PRINTL 设定初体验[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '611',
        any: [/^[ \t]*PRINTL 初吻对象是？[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '612',
        any: [
          /^[ \t]*PRINTL \[0\] 不明 \[1\] 魔王 \[993\] 狂王 \[994\] 怪物 \[995\] 野狗 \[999\] 触手 \[996\] 随机 \[997\] 自定义输入 \[998\] 无[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '615',
        any: [/^[ \t]*SELECTCASE LOCAL[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '616-631',
        any: [/^[ \t]*PRINT \[1\] 唇[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '618',
        any: [/^[ \t]*PRINT \[1\] 唇[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '619-620',
        any: [/^[ \t]*SIF TALENT:MASTER:121 \|\| TALENT:MASTER:122[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '620-623',
        any: [/^[ \t]*PRINT \[201\] 阴茎[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '621-622',
        any: [/^[ \t]*SIF !TALENT:MASTER:122[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '623',
        any: [/^[ \t]*PRINT \[401\] 肛门[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '632-641',
        any: [/^[ \t]*CASE 995[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '634',
        any: [/^[ \t]*PRINTL \[1\] 肛门 \[2\] 阴茎 \[3\] 嘴[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '636',
        any: [/^[ \t]*IF GROUPMATCH\(RESULT,1,2,3\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '637',
        any: [/^[ \t]*LOCAL \+= RESULT[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '644-670',
        any: [/^[ \t]*\$LOOP3[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '646',
        any: [/^[ \t]*PRINTL 输入初吻对象（留空将会随机生成）：[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '647-648',
        any: [/^[ \t]*LOCALS '= RESULTS[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '649',
        any: [/^[ \t]*SELECTCASE STRLENS\(LOCALS\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '654',
        any: [/^[ \t]*PRINTFORMW 新建人物初吻对象为%LOCALS%。[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '661',
        any: [
          /^[ \t]*PRINTL \[1\] 唇 \[201\] 阴茎 \[301\] 私处 \[401\] 肛门[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '671',
        any: [/^[ \t]*CASE 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '672',
        any: [/^[ \t]*CASE 993[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '673',
        any: [/^[ \t]*CASE 994[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '674',
        any: [/^[ \t]*CASE 999[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '675-676',
        any: [/^[ \t]*LOCAL = -2[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '681-715',
        any: [/^[ \t]*IF !TALENT:ARG:0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '682',
        any: [/^[ \t]*PRINTL 初体验对象是？[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '683',
        any: [
          /^[ \t]*PRINTL \[1\] 魔王 \[101\] 蠕虫 \[102\] 触手生物 \[103\] 野狗 \[104\] 怪物 \[105\] 狂王 \[996\] 随机 \[997\] 自定义输入 \[998\] 无[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '684-685',
        any: [/^[ \t]*LOCAL:1 = RESULT[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '688',
        any: [/^[ \t]*CASE 101[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '689',
        any: [/^[ \t]*CASE 102[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '692-706',
        any: [/^[ \t]*\$LOOP4[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '694',
        any: [/^[ \t]*PRINTL 输入初体验对象（留空将会随机生成）：[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '695-696',
        any: [/^[ \t]*LOCALS:1 '= RESULTS[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '697',
        any: [/^[ \t]*SELECTCASE STRLENS\(LOCALS:1\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '700',
        any: [/^[ \t]*GOTO LOOP4[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '702',
        any: [/^[ \t]*PRINTFORMW 新建人物初体验对象为为%LOCALS:1%。[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '708',
        any: [/^[ \t]*CASE 103[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '709',
        any: [/^[ \t]*CASE 104[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '710',
        any: [/^[ \t]*CASE 105[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '716-718',
        any: [/^[ \t]*A = ARG[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '717-718',
        any: [/^[ \t]*SIF !EX_TALENT:A:2[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '728-765',
        any: [/^[ \t]*PRINT 　[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '728',
        any: [/^[ \t]*PRINT 　[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '732',
        any: [/^[ \t]*PRINT \[初吻对象：不明\][ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '734',
        any: [/^[ \t]*PRINTFORM \[初吻对象：%CSTR:4%\][ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '736',
        any: [/^[ \t]*PRINT \[初吻对象：狂王\][ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '738',
        any: [/^[ \t]*PRINT \[初吻对象：怪物\][ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '740',
        any: [/^[ \t]*PRINT \[初吻对象：怪物的阴茎\][ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '742',
        any: [/^[ \t]*PRINT \[初吻对象：野狗的肛门\][ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '744',
        any: [/^[ \t]*PRINT \[初吻对象：野狗的阴茎\][ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '746',
        any: [/^[ \t]*PRINT \[初吻对象：野狗的嘴\][ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '748',
        any: [/^[ \t]*PRINT \[初吻对象：触手\][ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '750',
        any: [/^[ \t]*PRINTFORM \[初吻对象：%CSTR:4%的[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '751',
        any: [/^[ \t]*IF RAND:2[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '751-752',
        any: [/^[ \t]*IF RAND:2[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '754-755',
        any: [/^[ \t]*IF CFLAG:16 < 100[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '756-757',
        any: [/^[ \t]*ELSEIF CFLAG:16 < 300[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '758-759',
        any: [/^[ \t]*ELSEIF CFLAG:16 < 400[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '760-761',
        any: [/^[ \t]*ELSEIF CFLAG:16 < 500[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '767-788',
        any: [/^[ \t]*IF CFLAG:15 > 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '768',
        any: [/^[ \t]*LOCAL = CFLAG:15 - 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '771',
        any: [/^[ \t]*PRINT \[初体验对象：蠕虫\][ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '774',
        any: [/^[ \t]*PRINT \[初体验对象：触手生物\][ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '777',
        any: [/^[ \t]*PRINT \[初体验对象：野狗\][ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '780',
        any: [/^[ \t]*PRINT \[初体验对象：怪物\][ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '782',
        any: [/^[ \t]*PRINT \[初体验对象：狂王\][ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '783-784',
        any: [/^[ \t]*ELSEIF LOCAL == 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '786',
        any: [/^[ \t]*PRINTFORM \[初体验对象：%CSTR:3%\][ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '789',
        any: [/^[ \t]*PRINTL 这样就可以了吗？[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB',
        ref: '790',
        any: [/^[ \t]*PRINTL \[0\] 好的 \[1\] 还是改一下吧[ \t]*$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
