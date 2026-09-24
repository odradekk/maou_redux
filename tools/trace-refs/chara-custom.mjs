// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #392 新增：chara-custom.js 的锚表（issue #290 起一个 js 文件一份）

export const FILES = [
  {
    js: 'ere/chara/chara-custom.js',
    refs: [
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '241',
        any: [new RegExp('^\\s*INPUT\\s*$', 'm')],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '1-15',
        any: [/^[ \t]*﻿@CHAR_DEBUG\(ARG\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '17-98',
        any: [/^[ \t]*@CHAR_CREATE\(ARG\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '17-102',
        any: [/^[ \t]*@CHAR_CREATE\(ARG\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '20',
        any: [
          /^[ \t]*PRINTFORML 使用神奇的生命摇篮，凭空创造出一体生物[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '21',
        any: [
          /^[ \t]*PRINTFORML 这生物的一切，完全由魔王大人您自己凭喜好定制[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '22',
        any: [/^[ \t]*SIF ARG == 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '22-23',
        any: [/^[ \t]*SIF ARG == 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '26',
        any: [/^[ \t]*WAIT[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '28',
        any: [/^[ \t]*PRINTL ■=== 勇者 ===■[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '29-35',
        any: [/^[ \t]*FOR L_I, 1, 9[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '29',
        any: [/^[ \t]*FOR L_I, 1, 9[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '30-33',
        any: [
          /^[ \t]*PRINTFORM  \[\{L_I,2\}\] %CSVNAME\(L_I\),14,LEFT%[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '31',
        any: [/^[ \t]*SIF L_I % 4 == 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '37',
        any: [/^[ \t]*PRINTL ■=== 精英 ===■[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '38',
        any: [/^[ \t]*FOR L_I, 1, 11[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '39-42',
        any: [
          /^[ \t]*PRINTFORM  \[\{L_I\+20,2\}\] %CSVNAME\(L_I\+200\),14,LEFT%[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '40',
        any: [/^[ \t]*SIF L_I % 5 == 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '46',
        any: [/^[ \t]*IF ARG == 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '46-59',
        any: [/^[ \t]*IF ARG == 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '47',
        any: [/^[ \t]*PRINTL ■=== 特殊 ===■[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '50-51',
        any: [
          /^[ \t]*SIF !EXISTCSV\(L_I\) \|\| L_I == 19 \|\| L_I == 18[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '52',
        any: [
          /^[ \t]*PRINTFORM  \[\{L_I\+20,2\}\] %CSVNAME\(L_I\),14,LEFT%[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '52-55',
        any: [
          /^[ \t]*PRINTFORM  \[\{L_I\+20,2\}\] %CSVNAME\(L_I\),14,LEFT%[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '54',
        any: [/^[ \t]*SIF LOCAL % 5 == 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '62',
        any: [/^[ \t]*PRINT \[999\] 返回[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '65',
        any: [/^[ \t]*INPUT 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '68-69',
        any: [/^[ \t]*CASE 999[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '69',
        any: [/^[ \t]*RETURN 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '72-73',
        any: [/^[ \t]*CASE 21 TO 30[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '74-75',
        any: [/^[ \t]*CASE 37 TO 60[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '80-83',
        any: [/^[ \t]*IF !EXISTCSV\(L_I\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '81',
        any: [/^[ \t]*CLEARLINE 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '85',
        any: [/^[ \t]*A = -1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '88-89',
        any: [/^[ \t]*SIF INRANGE\(L_I,17,40\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '93',
        any: [/^[ \t]*CALL CHAR_APPEND\(L_I, ARG\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '93-94',
        any: [/^[ \t]*CALL CHAR_APPEND\(L_I, ARG\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '95',
        any: [/^[ \t]*PRINTFORMW 你召唤出了%SAVESTR:A%……[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '98',
        any: [/^[ \t]*CALL CHAR_CUSTOM, A ,ARG[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '103-269',
        any: [/^[ \t]*@CHAR_APPEND\(ARG, ARG:1\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '103-272',
        any: [/^[ \t]*@CHAR_APPEND\(ARG, ARG:1\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '103-272',
        any: [/^[ \t]*@CHAR_APPEND\(ARG, ARG:1\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '104',
        any: [/^[ \t]*ADDCHARA ARG[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '105',
        any: [/^[ \t]*CALL ADDCHARA_EX, CHARANUM-1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '106',
        any: [/^[ \t]*LOCAL = TARGET[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '107',
        any: [/^[ \t]*TARGET = CHARANUM - 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '110',
        any: [/^[ \t]*SELECTCASE ARG[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '111-114',
        any: [/^[ \t]*;勇者 REF ENTER_ENEMY\.ERB[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '116-121',
        any: [/^[ \t]*;精英部下 REF SHOP_MONSTER\.ERB[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '123-137',
        any: [/^[ \t]*;玛奥 REF SYSTEM\.ERB[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '127',
        any: [/^[ \t]*CFLAG:420 = 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '129',
        any: [/^[ \t]*CFLAG:9 = 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '130',
        any: [/^[ \t]*CFLAG:1 = 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '131',
        any: [/^[ \t]*CFLAG:11 = 15[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '132',
        any: [/^[ \t]*CFLAG:12 = 15[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '133',
        any: [/^[ \t]*CFLAG:13 = 15[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '134',
        any: [/^[ \t]*CFLAG:14 = 15[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '135',
        any: [/^[ \t]*CFLAG:16 = -1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '137',
        any: [/^[ \t]*CALL CHAR_BODY_GENERATE_WAPPED, 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '139-148',
        any: [/^[ \t]*;莉莉 REF ENTER_ENEMY\.ERB[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '150-218',
        any: [/^[ \t]*;扑克牌 REF ARCANA_FORT[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '150-208',
        any: [/^[ \t]*;扑克牌 REF ARCANA_FORT[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '153-208',
        any: [/^[ \t]*IF ARG == 22[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '153-161',
        any: [/^[ \t]*IF ARG == 22[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '159',
        any: [/^[ \t]*CFLAG:A:550 \+= 900000[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '162-173',
        any: [/^[ \t]*;西の砦　白梅花 &4[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '164',
        any: [/^[ \t]*ABL:A:31 = 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '165',
        any: [/^[ \t]*EXP:A:10 = 30[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '167',
        any: [/^[ \t]*CFLAG:A:550 = 41[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '171',
        any: [/^[ \t]*CFLAG:A:550 \+= 600000[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '174-184',
        any: [/^[ \t]*;南の砦　银黑桃 &2[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '176',
        any: [/^[ \t]*EXP:A:10 = 10[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '178',
        any: [/^[ \t]*CFLAG:A:550 = 44[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '182',
        any: [/^[ \t]*CFLAG:A:550 \+= 300000[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '185-200',
        any: [/^[ \t]*;北の砦　金红桃 &8[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '187',
        any: [/^[ \t]*EXP:A:0 = 20[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '189-190',
        any: [/^[ \t]*SIF FLAG:500 == 0 \|\| FLAG:500 == 2[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '192',
        any: [/^[ \t]*CFLAG:A:15 = 105[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '194',
        any: [/^[ \t]*CFLAG:A:550 = 50[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '196',
        any: [/^[ \t]*CFLAG:A:550 \+= 10000[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '198',
        any: [/^[ \t]*CFLAG:A:550 \+= 400000[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '210-215',
        any: [/^[ \t]*;レベルアップ処理[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '213',
        any: [/^[ \t]*CALL ST_UP, A[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '217-218',
        any: [/^[ \t]*BASE:A:0 = MAXBASE:A:0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '217',
        any: [/^[ \t]*BASE:A:0 = MAXBASE:A:0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '218',
        any: [/^[ \t]*BASE:A:1 = MAXBASE:A:1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '220-222',
        any: [/^[ \t]*;贡品 REF ENDING\.ERB[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '222',
        any: [/^[ \t]*CALL CHAR_INIT[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '223-234',
        any: [/^[ \t]*; 狂王替身 葵希罗[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '225',
        any: [/^[ \t]*FLAG:224 = 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '237',
        any: [/^[ \t]*IF ARG:1 == 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '237-265',
        any: [/^[ \t]*IF ARG:1 == 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '238',
        any: [/^[ \t]*PRINTFORMW 请问登陆的角色是什么性别呢？[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '240',
        any: [
          /^[ \t]*PRINTFORMW \[1\] 男性      \[2\] 女性      \[3\] 扶她[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '242-243',
        any: [/^[ \t]*SIF RESULT == 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '244-245',
        any: [/^[ \t]*SIF RESULT == 3[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '248',
        any: [
          /^[ \t]*PRINTFORML 新建人物的名字是？（不输入将随机生成名字）[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '249',
        any: [/^[ \t]*INPUTS[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '251',
        any: [/^[ \t]*LOCALS '= RESULTS[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '253',
        any: [/^[ \t]*CASE IS > 16[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '254',
        any: [/^[ \t]*PRINTFORMW 名字太长，请使用全角八字以下的名字。[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '257',
        any: [/^[ \t]*PRINTFORMW 新建人物今后被称呼为%LOCALS%。[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '258',
        any: [/^[ \t]*CALLNAME:A '= LOCALS[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '259',
        any: [/^[ \t]*SAVESTR:A '= LOCALS[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '260',
        any: [/^[ \t]*NAME:A '= LOCALS[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '263',
        any: [/^[ \t]*PRINTFORMW 新建人物今后被称呼为%NAME:A%。[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '266',
        any: [/^[ \t]*CFLAG:A:1 = 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '268',
        any: [/^[ \t]*TARGET = LOCAL[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB',
        ref: '269',
        any: [/^[ \t]*RETURN A[ \t]*$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
