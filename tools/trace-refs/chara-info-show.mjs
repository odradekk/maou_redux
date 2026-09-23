// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：chara-info-show.mjs（#390 角色信息显示链）

export const FILES = [
  {
    js: 'ere/page/page-chara-info-show.js',
    refs: [
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '7-321',
        any: [
          /@SHOW_CHARA_INFO\(ARG,ARG:1 = -1\)\n; ARG 角色编号， ARG:1 页码\n; ARG:1 == -1，调教时显示信息\n; ARG:1 == -2，贡品时显示信息/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1765-1822',
        any: [
          /@HEXtoDEC\(hex,dec\)\n#DIM REF hex\n#DIMS hexS\n#DIMS disassembleS,6/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1824-1833',
        any: [
          /@ColorJudgmentWorB\(colorValue\)\n#DIM REF colorValue,0\n\nIF \(colorValue:0 \+ colorValue:1 \+ colorValue:2\) \/ 3 <= 128/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '25-26',
        any: [/LOCAL = TARGET, A\nTARGET = ARG/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '320-321',
        any: [/TARGET = LOCAL\nA = LOCAL:1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '33-214',
        any: [
          /IF CFLAG:ARG:1 == 11\n	PRINTL 已献祭的肉便器数量\n	PRINTFORML 种族相同　　……\{CFLAG:ARG:800\}（%GET_LOOK_INFO\(ARG, "种族"\)%）\n	PRINTFORML 性格相同　　……\{CFLAG:ARG:801\}（%GET_LOOK_INFO\(ARG, "性格"\)%）/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '46',
        any: [/	directToHomePage = 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '86',
        any: [/		directToHomePage = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '305',
        any: [/	CALL SHOW_PERSONAL_INFO\(ARG\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '33',
        any: [/IF CFLAG:ARG:1 == 11/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '139',
        any: [/IF CFLAG:\(RESULT\):1 == 2/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '142',
        any: [
          /				ELSEIF CFLAG:\(RESULT\):1 == 0 \|\| CFLAG:\(RESULT\):1 == 7 \|\| CFLAG:\(RESULT\):1 == 8/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '35-41',
        any: [
          /	PRINTFORML 种族相同　　……\{CFLAG:ARG:800\}（%GET_LOOK_INFO\(ARG, "种族"\)%）\n	PRINTFORML 性格相同　　……\{CFLAG:ARG:801\}（%GET_LOOK_INFO\(ARG, "性格"\)%）\n	PRINTFORML 理由相同　　……\{CFLAG:ARG:802\}（%GET_LOOK_INFO\(ARG, "成为勇者的契机"\)%）\n	PRINTFORML 生平相同　　……\{CFLAG:ARG:803\}（%GET_LOOK_INFO\(ARG, "成为勇者前的生活"\)%）/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '41',
        any: [
          /	PRINTFORML 合计　　　　……\{CFLAG:ARG:800 \+ CFLAG:ARG:801 \+ CFLAG:ARG:802 \+ CFLAG:ARG:803 \+ CFLAG:ARG:804 \+ CFLAG:ARG:805\} \/ 30/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '48',
        any: [/	IF temp >= 30/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '63-68',
        any: [
          /		PRINTS "-"\*16\n		PRINTFORM  魔王之影 『 %SAVESTR:shadow% 』 \n		PRINTS "-"\*16 \+ "\\s"\*2 \+ "\\n"\*2\n		PRINTS "-"\*16/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '90',
        any: [
          /		typeNeed '= "种族", "性格", "成为勇者的契机", "成为勇者前的生活", "头发颜色", "瞳色"/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '99-109',
        any: [/				SELECTCASE CFLAG:temp:1 \n				CASE 2\n					SETCOLOR 214,32,32\n				CASE 7/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '108',
        any: [/					SETCOLOR 255,200,0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '112',
        any: [/					PRINTS "\[☆\]"/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '311-315',
        any: [/IF L_LCOUNT < 27\n	FOR COUNT, L_LCOUNT, 27\n		PRINTL\n	NEXT/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1818-1820',
        any: [
          /dec:0 = disassemble:0 \* 15 \+ disassemble:1\ndec:1 = disassemble:2 \* 15 \+ disassemble:3\ndec:2 = disassemble:4 \* 15 \+ disassemble:5/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1827',
        any: [
          /IF \(colorValue:0 \+ colorValue:1 \+ colorValue:2\) \/ 3 <= 128/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1',
        any: [/﻿;キャラの能力表示に使う関数群/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '2',
        any: [/;eratohoAよりスクリプトを流用/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1828',
        any: [/	colorValue:1 = 255,255,255/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1830',
        any: [/	colorValue:1 = 0,0,0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1827-1831',
        any: [
          /IF \(colorValue:0 \+ colorValue:1 \+ colorValue:2\) \/ 3 <= 128\n	colorValue:1 = 255,255,255\nELSE \n	colorValue:1 = 0,0,0/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '47',
        any: [
          /	temp = CFLAG:shadow:800 \+ CFLAG:shadow:801 \+ CFLAG:shadow:802 \+ CFLAG:shadow:803 \+ CFLAG:shadow:804 \+ CFLAG:shadow:805/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '45',
        any: [/	shadow = ARG/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '34',
        any: [/	PRINTL 已献祭的肉便器数量/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '35-40',
        any: [
          /	PRINTFORML 种族相同　　……\{CFLAG:ARG:800\}（%GET_LOOK_INFO\(ARG, "种族"\)%）\n	PRINTFORML 性格相同　　……\{CFLAG:ARG:801\}（%GET_LOOK_INFO\(ARG, "性格"\)%）\n	PRINTFORML 理由相同　　……\{CFLAG:ARG:802\}（%GET_LOOK_INFO\(ARG, "成为勇者的契机"\)%）\n	PRINTFORML 生平相同　　……\{CFLAG:ARG:803\}（%GET_LOOK_INFO\(ARG, "成为勇者前的生活"\)%）/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '48-77',
        any: [
          /	IF temp >= 30\n		PRINTS "\\n"\*2 \+ "————此刻正是献祭完成之时！"\n		WAIT\n		PRINTS "\\n"\*2 \+ "\\s"\*16 \+ "向这伟力的降临献上喝彩！"/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '60',
        any: [/		SETCOLOR RESULT:1,RESULT:2,RESULT:3/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '62',
        any: [/		ALIGNMENT CENTER/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '63-65',
        any: [
          /		PRINTS "-"\*16\n		PRINTFORM  魔王之影 『 %SAVESTR:shadow% 』 \n		PRINTS "-"\*16 \+ "\\s"\*2 \+ "\\n"\*2/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '69',
        any: [/		ALIGNMENT LEFT/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '71',
        any: [/RESETCOLOR/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '72',
        any: [/		CFLAG:shadow:1 = 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '73',
        any: [/		CFLAG:shadow:700 = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '74',
        any: [/		CFLAG:shadow:820 = 666666/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '72-75',
        any: [
          /		CFLAG:shadow:1 = 0\n		CFLAG:shadow:700 = 1\n		CFLAG:shadow:820 = 666666\n		WAIT/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '73-76',
        any: [
          /		CFLAG:shadow:700 = 1\n		CFLAG:shadow:820 = 666666\n		WAIT\n		PRINTS "\\n"\*2/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '77',
        any: [/RESTART/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '79-80',
        any: [
          /		PRINTS "\\n"\*2 \+ " \[ 10\] 查看符合条件的奴隶或勇者 "\n		PRINTS "\\n"\*2 \+ " \[100\] 返回 "/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '82',
        any: [/INPUT/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '84-87',
        any: [/	CASE 100\n		ARG = shadow\n		directToHomePage = 1\n		RETURN 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '207-209',
        any: [/	CASEELSE \n		ARG = shadow\n		RESTART /],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '88-206',
        any: [
          /	CASE 10\n		\$SacrificeListRefresh\n		typeNeed '= "种族", "性格", "成为勇者的契机", "成为勇者前的生活", "头发颜色", "瞳色"\n		PRINTS "\\n"\*2/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '18',
        any: [/#DIM page/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '92',
        any: [/DRAWLINEFORM =/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '93',
        any: [
          /		PRINTFORML 当前总祭品数： \{CFLAG:shadow:800 \+ CFLAG:shadow:801 \+ CFLAG:shadow:802 \+ CFLAG:shadow:803 \+ CFLAG:shadow:804 \+ CFLAG:shadow:805\} \/30/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '98',
        any: [
          /			IF GET_LOOK_INFO\(temp, typeNeed:page\) == GET_LOOK_INFO\(shadow, typeNeed:page\) && temp != shadow/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '110',
        any: [
          /				PRINTFORM \[\{temp,3,RIGHT\}\] %SAVESTR:temp,12,LEFT% （%GET_LOOK_INFO\(temp, typeNeed:page\)%） %GET_JOB_NAME\(temp\),6,LEFT% LV\{CFLAG:temp:9,3,RIGHT\} /,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '119',
        any: [/		PRINTS "\\n"\*2 \+ "切换条件类型：" \+ "\\n"\*2/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '120-126',
        any: [
          /		PRINTBUTTON "  \[种族\]  ",1000\n		PRINTBUTTON "  \[性格\]  ",1001\n		PRINTBUTTON "  \[瞳色\]  ",1005\n		PRINTBUTTON "  \[头发颜色\]  ",1004/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '127',
        any: [/PRINTS "\\n"\*2 \+ " \[100\] 返回 "/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '129',
        any: [/INPUT/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '131-133',
        any: [/		CASE 100\n			ARG = shadow\n			RESTART /],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '135',
        any: [/			page = \(RESULT % 10\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '136',
        any: [/GOTO SacrificeListRefresh/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '138-203',
        any: [
          /			IF RESULT >= 1 && RESULT < CHARANUM\n				IF CFLAG:\(RESULT\):1 == 2\n					CALL SHOW_CHARA_INFO\(RESULT,-2\)\n					GOTO SacrificeListRefresh/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '140',
        any: [/CALL SHOW_CHARA_INFO\(RESULT,-2\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '141',
        any: [/GOTO SacrificeListRefresh/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '193-201',
        any: [
          /				ELSE\n					IF CFLAG:\(RESULT\):1 == 2\n						CALL SHOW_CHARA_INFO\(RESULT,-2\)\n						GOTO SacrificeListRefresh/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '200',
        any: [/GOTO SacrificeListRefresh/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '143-189',
        any: [
          /					DRAWLINEFORM =\n					PRINTS "\\n"\n					PRINTFORM 确定要将 %SAVESTR:RESULT% 献祭？（\*将永远失去这个奴隶）\n					PRINTS "\\n"\*2 \+ " \[1\] 献祭 "/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '189',
        any: [/GOTO SacrificeListRefresh/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '191',
        any: [/GOTO SacrificeListRefresh/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '205-206',
        any: [/		CLEARLINE 1\n		GOTO SacrificeListInputReacquisition/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '156-187',
        any: [
          /						CFLAG:RESULT:1 = 0\n						CFLAG:shadow:\(800\+page\) \+= 100\n							SIF RESULT < shadow\n							shadow--/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '156',
        any: [/						CFLAG:RESULT:1 = 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '157',
        any: [/						CFLAG:shadow:\(800\+page\) \+= 100/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '158-159',
        any: [/							SIF RESULT < shadow\n							shadow--/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '161-162',
        any: [/						TARGET = RESULT\n						A = TARGET/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '163-171',
        any: [
          /						W:0 = CFLAG:A:550\n						CALL EQUIP_GET\n						CFLAG:A:550 = -1\n						W:0 = CFLAG:A:551/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '172-173',
        any: [/						X = NO:A \+ 199\n						FLAG:X = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '174-181',
        any: [
          /							SIF FLAG:1 == TARGET\n							FLAG:1 = -1\n							SIF FLAG:2 == TARGET\n							FLAG:2 = -1/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '182',
        any: [/						TARGET = FLAG:1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '184',
        any: [/						CALL PARTY_CHAR_DEL, A/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '185',
        any: [/						DELCHARA A/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '186',
        any: [/						CALL NAME_RESET/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '187',
        any: [/						FLAG:80 \+= 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '210-213',
        any: [/	ENDSELECT\n	;████修改点2████\n	\n	RETURN 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '87',
        any: [/		RETURN 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '19-22',
        any: [/#DIM shadow\n;████修改点1████\n\nL_LCOUNT = LINECOUNT/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '28',
        any: [/CALL SHOW_INFO_TITLE\(ARG\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '27-30',
        any: [/\nCALL SHOW_INFO_TITLE\(ARG\)\n\nCUSTOMDRAWLINE ‥/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '86-87',
        any: [/		directToHomePage = 1\n		RETURN 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '217-235',
        any: [/CASE -2\n; 显示贡品信息\n	;タレント\n	CALL SHOW_TALENT/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '233',
        any: [/CALL LOOK_INFO/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '236-258',
        any: [/CASE -1\n; 显示调教信息\n	;タレント\n	CALL SHOW_TALENT/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '244-247',
        any: [/	;刻印\n	CALL SHOW_INFO_MARK\n	CUSTOMDRAWLINE ‥\n	WAIT/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '249',
        any: [/	CALL SHOW_JUEL/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '247-250',
        any: [/	WAIT\n	CALL SHOW_INFO_EXP\n	CALL SHOW_JUEL\n	WAIT/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '255-258',
        any: [
          /	IF ITEM:37 && TARGET != 0\n		PRINTFORML 总计调教\{CFLAG:10\}次，好感度: \{\(CFLAG:2\)\/10\}％\n		CUSTOMDRAWLINE ‥\n	ENDIF/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '260-271',
        any: [/CASE 0\n	CALL SHOW_BLOCK\(ARG\)\n	CUSTOMDRAWLINE ‥\n	;タレント/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '273-288',
        any: [/CASE 1\n	CALL SHOW_BLOCK\(ARG\)\n	CUSTOMDRAWLINE ‥\n		/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '290-297',
        any: [/CASE 2\n	CALL SHOW_RING\n	CUSTOMDRAWLINE ‥\n	;外見関係/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '295',
        any: [/CALL LOOK_INFO/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '299-303',
        any: [
          /CASE 3\n	CALL SHOW_TALENT_CONDITION\n	CUSTOMDRAWLINE ‥\n	PRINTFORML ※ %TALENTNAME:74%、%TALENTNAME:78%、%TALENTNAME:75%、%TALENTNAME:77%每获得一项，其他素质的获得要求便会上升，素质获得后条件将会隐藏；/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '302',
        any: [
          /	PRINTFORML ※ %TALENTNAME:74%、%TALENTNAME:78%、%TALENTNAME:75%、%TALENTNAME:77%每获得一项，其他素质的获得要求便会上升，素质获得后条件将会隐藏；/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '304-306',
        any: [/CASE 4\n	CALL SHOW_PERSONAL_INFO\(ARG\)\n	CUSTOMDRAWLINE ‥/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '310-315',
        any: [
          /L_LCOUNT = LINECOUNT - L_LCOUNT\nIF L_LCOUNT < 27\n	FOR COUNT, L_LCOUNT, 27\n		PRINTL/,
        ],
      },
    ],
  },
  {
    js: 'ere/page/page-chara-talent-condition.js',
    refs: [
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '2-409',
        any: [
          /@SHOW_TALENT_CONDITION\n; 显示素质详细\n;ref to <GET_SPECIALTALENT\.ERB>\n;--------------------------------------------------/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '414',
        any: [/@STC_PRINTC\(ARGS, ARG = 15\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '425',
        any: [/@STC_LAB_TAL\(ARG\)	/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '445',
        any: [/@STC_SAY_ABL\(ARG, ARG:1\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '471',
        any: [/@STC_SAY_EXP\(ARG, ARG:1\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '483',
        any: [/@STC_SAY_MARK\(ARG, ARG:1 = 0\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '492',
        any: [/@STC_SAY_TAL\(ARG\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '507',
        any: [/@STC_SAYNO_MARK\(ARG, ARG:1 = 0\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '516',
        any: [/@STC_SAYNO_TAL\(ARG, ARG:1 = 0\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '526',
        any: [/@STC_SAYSUM_EXP\(ARG, ARG:1, ARG:2 = 0, ARG:3 = 0\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '549',
        any: [/@STC_SAY_ABCV\(ARG\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '562',
        any: [/@STC_SAYSUM_ABL\(ARG, ARG:1, ARG:2 = 0, ARG:3 = 0, ARG:4 = 0\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '585-606',
        any: [/@STC_COLOR_TRUE\nSETCOLORBYNAME White\n\n@STC_COLOR_FALSE/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '612-662',
        any: [/@STC_SEIIN_CHECK\n;ref <SEIIN\.ERB>\n\n;規定の回数/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '252',
        any: [/CALL SHOW_TALENT_CONDITION/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '300',
        any: [/CALL SHOW_TALENT_CONDITION/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '415',
        any: [/LOCAL = ARG - \(STRLENS\(ARGS\) % ARG\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '176',
        any: [/PRINT_IMG "COVER_WHITE"/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '212',
        any: [/PRINT_IMG "COVER_WHITE"/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '238',
        any: [/PRINT_IMG "COVER_WHITE"/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '256',
        any: [/PRINT_IMG "COVER_WHITE"/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '178',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '214',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '240',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '258',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '586',
        any: [/SETCOLORBYNAME White/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '589',
        any: [/SETCOLORBYNAME Gray/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '594',
        any: [/SETCOLORBYNAME LightSalmon/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '597',
        any: [/SETCOLORBYNAME DarkSeaGreen/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '600',
        any: [/SETCOLORBYNAME DarkRed/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '603',
        any: [/SETCOLOR 102,179,255/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '606',
        any: [/RESETCOLOR/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '40',
        any: [/IF !TALENT:76 && !TALENT:184/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '620-660',
        any: [/SIF TALENT:13 == 1\n	LOCAL \+= 4\n;保守的\nSIF TALENT:24 == 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '616',
        any: [/LOCAL = 50/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '149-161',
        any: [
          /SEXSKILL_COUNT = 0\n;カウント\nSIF TALENT:74\n	SEXSKILL_COUNT \+= 1/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '479',
        any: [/	LOCALS = %SUBSTRING\(LOCALS,0,8\)%/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '540',
        any: [/LOCALS \+= SUBSTRING\(EXPNAME:\(ARG:1\),0,8\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '543',
        any: [
          /		LOCALS \+= "\|" \+ SUBSTRING\(EXPNAME:\(ARG:\(COUNT\+2\)\),0,8\)/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '414-420',
        any: [
          /@STC_PRINTC\(ARGS, ARG = 15\)\nLOCAL = ARG - \(STRLENS\(ARGS\) % ARG\)\nSIF LOCAL == ARG\n	LOCAL = 0/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '416-417',
        any: [/SIF LOCAL == ARG\n	LOCAL = 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '425-440',
        any: [
          /@STC_LAB_TAL\(ARG\)	\nIF TALENT:9\n	; TALENT:9 【崩坏】\n	CALL STC_COLOR_INVALID/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '426-433',
        any: [
          /IF TALENT:9\n	; TALENT:9 【崩坏】\n	CALL STC_COLOR_INVALID\nELSEIF TALENT:ARG/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '435-436',
        any: [/SIF ARG == 230 && TALENT:122\n	LOCALS = 绝伦/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '438-439',
        any: [/SIF STRLENS\(LOCALS\) <= 4\n	LOCALS = %LOCALS,4,LEFT%条件/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '440',
        any: [/PRINTFORM %LOCALS,8,LEFT%： /],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '445-455',
        any: [
          /@STC_SAY_ABL\(ARG, ARG:1\)\nIF ABL:ARG >= ARG:1\n	CALL STC_COLOR_TRUE\nELSE/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '446-450',
        any: [
          /IF ABL:ARG >= ARG:1\n	CALL STC_COLOR_TRUE\nELSE\n	CALL STC_COLOR_FALSE/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '451-455',
        any: [
          /IF ARG == 0 && TALENT:122\n	CALL STC_PRINTC\(@"\[阴茎感觉 Lv\{ARG:1\}\]"\)\nELSE\n	CALL STC_PRINTC\(@"\[%ABLNAME:ARG,6,LEFT% Lv\{ARG:1\}\]"\)/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '471-480',
        any: [
          /@STC_SAY_EXP\(ARG, ARG:1\)\nIF EXP:ARG >= ARG:1\n	CALL STC_COLOR_TRUE\nELSE/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '472-476',
        any: [
          /IF EXP:ARG >= ARG:1\n	CALL STC_COLOR_TRUE\nELSE\n	CALL STC_COLOR_FALSE/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '483-489',
        any: [
          /@STC_SAY_MARK\(ARG, ARG:1 = 0\)\nIF MARK:ARG >= ARG:1\n	CALL STC_COLOR_TRUE\nELSE/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '492-503',
        any: [/@STC_SAY_TAL\(ARG\)\nIF TALENT:ARG \n	CALL STC_COLOR_TRUE\nELSE/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '507-513',
        any: [
          /@STC_SAYNO_MARK\(ARG, ARG:1 = 0\)\nIF MARK:ARG <= ARG:1\n	CALL STC_COLOR_RIGHT\nELSE/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '516-522',
        any: [
          /@STC_SAYNO_TAL\(ARG, ARG:1 = 0\)\nIF TALENT:ARG <= ARG:1\n	CALL STC_COLOR_RIGHT\nELSE/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '526-545',
        any: [
          /@STC_SAYSUM_EXP\(ARG, ARG:1, ARG:2 = 0, ARG:3 = 0\)\nLOCAL = 0\n\nREPEAT 3/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '530-531',
        any: [/	SIF ARG:\(COUNT\+1\) > 0\n		LOCAL \+= EXP:\(ARG:\(COUNT\+1\)\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '534-538',
        any: [
          /IF LOCAL >= ARG\n	CALL STC_COLOR_TRUE\nELSE\n	CALL STC_COLOR_FALSE\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '539-540',
        any: [/LOCALS = \[\nLOCALS \+= SUBSTRING\(EXPNAME:\(ARG:1\),0,8\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '541-544',
        any: [
          /REPEAT 2\n	SIF ARG:\(COUNT\+2\) > 0\n		LOCALS \+= "\|" \+ SUBSTRING\(EXPNAME:\(ARG:\(COUNT\+2\)\),0,8\)\nREND/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '545',
        any: [/PRINTFORM %LOCALS%\{ARG,4\}\]/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '549-559',
        any: [/@STC_SAY_ABCV\(ARG\)\nLOCAL = 0\nREPEAT 4	\n	LOCAL \+= ABL:COUNT/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '562-580',
        any: [
          /@STC_SAYSUM_ABL\(ARG, ARG:1, ARG:2 = 0, ARG:3 = 0, ARG:4 = 0\)\nLOCAL = 0\nREPEAT 4\n	SIF ARG:\(COUNT\+1\) > 0/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '65-68',
        any: [
          /	CALL STC_LAB_TAL\(76\)\n	\n	IF CFLAG:2 >=1000\n		CALL STC_COLOR_TRUE/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '75',
        any: [/	;CALL STC_SAYSUM_ABL\(10,0,1,2,3\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '173-177',
        any: [
          /ELSE\n	RESETCOLOR\n	;PRINT ■■■■■■■■■■■■■■■■■■■■■■\n	PRINT_IMG "COVER_WHITE"\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '209-213',
        any: [
          /ELSE\n	RESETCOLOR\n	;PRINT ■■■■■■■■■■■■■■■■■■■■■■\n	PRINT_IMG "COVER_WHITE"\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '235-239',
        any: [
          /ELSE\n	RESETCOLOR\n	;PRINT ■■■■■■■■■■■■■■■■■■■■■■\n	PRINT_IMG "COVER_WHITE"\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '253-257',
        any: [
          /ELSE\n	RESETCOLOR\n	;PRINT ■■■■■■■■■■■■■■■■■■■■■■\n	PRINT_IMG "COVER_WHITE"\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '13-37',
        any: [
          /IF TALENT:76 \|\| TALENT:85\n	IF TALENT:9 \n		CALL STC_COLOR_INVALID\n	ELSEIF CFLAG:0 == 2/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '29',
        any: [/CALL STC_SAYNO_MARK\(3\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '36',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '39-60',
        any: [
          /;【爱】TALENT:85 調教経験1000\nIF !TALENT:76 && !TALENT:184\n	;調教経験1000\/顺从3\/侍奉精神LV3\/屈服刻印LV3\/侍奉快乐经200\n	;\/NOT【淫乱】【求爱】/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '52',
        any: [/	CALL STC_SAY_ABL\(10,3\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '53',
        any: [/	CALL STC_SAY_ABL\(16,3\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '54',
        any: [/CALL STC_SAY_MARK\(2,3\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '55',
        any: [/	CALL STC_SAY_EXP\(21, EXPLV:5\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '58',
        any: [/CALL STC_SAYNO_MARK\(3\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '59',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '62-83',
        any: [
          /;【淫乱】TALENT:76 調教経験1000\nIF !TALENT:85\n	;調教経験1000\/欲望3\/ABCV感覚合計10\/快楽・屈服刻印LV3\/异常经验3\/NOT【爱】\n	CALL STC_LAB_TAL\(76\)/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '74',
        any: [/	CALL STC_SAY_ABL\(11,3\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '76',
        any: [/	CALL STC_SAY_ABCV\(10\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '77',
        any: [/	CALL STC_SAY_MARK\(1,3\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '78',
        any: [/CALL STC_SAY_MARK\(2,3\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '79',
        any: [/	CALL STC_SAY_EXP\(50,3\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '81',
        any: [/CALL STC_SAYNO_MARK\(3\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '82',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '90-105',
        any: [
          /;【擅用舌头】\nCALL STC_LAB_TAL\(52\)\nIF TALENT:51\n	;【学习缓慢】/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '105',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '108-143',
        any: [/;--------------------\n;特殊性癖素質\n;--------------------\n/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '145-258',
        any: [
          /;--------------------\n;特殊性感素質\n;--------------------\n;念のため/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '159',
        any: [/SEXSKILL_EXP:1 = 100 \+ 50 \* SEXSKILL_COUNT/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '160',
        any: [/SEXSKILL_EXP:2 = 100 \+ 10 \* SEXSKILL_COUNT/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '161',
        any: [/SEXSKILL_EXP:3 = 300 \+ 50 \* SEXSKILL_COUNT/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '166',
        any: [/CALL STC_SAY_ABL\(0,4\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '167',
        any: [/CALL STC_SAY_EXP\(11,100\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '168',
        any: [/CALL STC_SAY_EXP\(2,100\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '170',
        any: [/CALL STC_SAY_ABL\(0,5\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '171',
        any: [/	CALL STC_SAY_EXP\(11,SEXSKILL_EXP:1\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '172',
        any: [/CALL STC_SAY_EXP\(2,SEXSKILL_EXP:2\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '184',
        any: [/CALL STC_SAY_ABL\(1,4\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '185',
        any: [/CALL STC_SAY_EXP\(54,100\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '186',
        any: [/CALL STC_SAY_EXP\(2,100\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '188',
        any: [/CALL STC_SAY_ABL\(1,5\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '189',
        any: [/	CALL STC_SAY_EXP\(54,SEXSKILL_EXP:1\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '190',
        any: [/CALL STC_SAY_EXP\(2,SEXSKILL_EXP:2\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '191-199',
        any: [
          /ELSEIF TALENT:122 && SEXSKILL_COUNT == 0\n	CALL STC_SAY_ABL\(1,4\)\n	IF JUEL:14 >= SEXSKILL_EXP:1\n		CALL STC_COLOR_TRUE/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '200-208',
        any: [
          /ELSEIF TALENT:78 == 0 && SEXSKILL_COUNT > 0 && TALENT:122\n	CALL STC_SAY_ABL\(1,5\)\n	IF JUEL:14 >= SEXSKILL_EXP:1\n		CALL STC_COLOR_TRUE/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '220',
        any: [/	CALL STC_SAY_ABL\(2,4\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '221',
        any: [/CALL STC_SAY_EXP\(0,300\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '222',
        any: [/CALL STC_SAY_EXP\(2,100\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '224',
        any: [/CALL STC_SAY_ABL\(2,5\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '225',
        any: [/	CALL STC_SAY_EXP\(0,SEXSKILL_EXP:3\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '226',
        any: [/CALL STC_SAY_EXP\(2,SEXSKILL_EXP:2\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '227-230',
        any: [
          /ELSEIF TALENT:122 && SEXSKILL_COUNT == 0\n	CALL STC_SAY_ABL\(0,4\)\n	CALL STC_SAY_EXP\(5,300\)\n	CALL STC_SAY_EXP\(2,100\)/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '246',
        any: [/	CALL STC_SAY_ABL\(3,4\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '247',
        any: [/CALL STC_SAY_EXP\(32,300\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '248',
        any: [/CALL STC_SAY_EXP\(2,100\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '250',
        any: [/CALL STC_SAY_ABL\(3,5\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '251',
        any: [/	CALL STC_SAY_EXP\(32,SEXSKILL_EXP:3\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '262-309',
        any: [/;--------------------\n;強化素質\n;--------------------\n/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '312-333',
        any: [
          /;--------------------\n;时常发情\n;--------------------\nIF FLAG:75 <= 0/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '335-347',
        any: [
          /;--------------------\n;精爱味觉\n;--------------------\nCALL STC_LAB_TAL\(47\)/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '347',
        any: [/PRINTFORML \[饮精绝顶\{RESULT,4\}\]/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '350-382',
        any: [
          /;--------------------\n;妓女&倾城\n;--------------------\nIF !TALENT:180 /,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '356-360',
        any: [
          /	IF TALENT:315 == 5\n	;元妓女\\卖淫经验80\\欲望Lv1\\反抗刻印无\n		CALL STC_SAY_ABL\(11,1\)\n		CALL STC_SAY_EXP\(74, 80\)/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '373',
        any: [/CALL STC_SAY_TAL\(180\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '378',
        any: [/CALL STC_SAY_TAL\(180\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '383',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '384-407',
        any: [
          /;--------------------\n;盲从\n;--------------------\nCALL STC_LAB_TAL\(86\)/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '394',
        any: [/PRINT 【/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '399',
        any: [/PRINT 】【/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '401-404',
        any: [
          /CALL STC_SAY_EXP\(81,10\)	\nCALL STC_SAY_ABL\(10,5\)\nRESETCOLOR\nPRINT 】/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW_TALENT.ERB',
        ref: '406',
        any: [/PRINTL/],
      },
    ],
  },
  {
    js: 'ere/page/components/chara-info-title.js',
    refs: [
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '323-371',
        any: [/@SHOW_INFO_TITLE\(ARG\)\n#DIMS AGE_STR\n\nCUSTOMDRAWLINE =/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '372-427',
        any: [
          /@SHOW_BLOCK\(ARG\)\nIF \(ARG != MASTER \|\| MASTER\)\n	PRINTPLAINFORM 一人称：%SELF_CALL\(ARG\),26,LEFT%\n	PRINTFORM \[8\] 一人称重設 /,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '28',
        any: [/CALL SHOW_INFO_TITLE\(ARG\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '261',
        any: [/CALL SHOW_BLOCK\(ARG\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '274',
        any: [/CALL SHOW_BLOCK\(ARG\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '327-334',
        any: [/IF 立绘\n	PRINTFORML\n	F:98 = 1\n	CALL CHA_IMG\(ARG\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '366-368',
        any: [/IF 立绘\n	PRINTFORML %AGE_STR, 36%\n	PRINTFORML/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '401',
        any: [
          /	PRINTFORM \\@ BASE:ARG:0 < 10000 \? %UNICODE\(0xA0\)% #  \\@\\@ MAXBASE:ARG:0 < 10000 \? %UNICODE\(0xA0\)%  #  \\@ 体重 \{CFLAG:ARG:454 \/ 10, 3\}\.\{CFLAG:ARG:454 % 10\} kg　W \{CFLAG:ARG:456 \/ 10, 3\}\.\{CFLAG:ARG:456 % 10\} cm/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '412',
        any: [
          /	PRINTFORM 　　　　　　　\\@ BASE:ARG:1 < 10000 \? %UNICODE\(0xA0\)% #  \\@\\@ MAXBASE:ARG:1 < 10000 \? %UNICODE\(0xA0\)% #  \\@  H \{CFLAG:ARG:457 \/ 10, 3\}\.\{CFLAG:ARG:457 % 10\} cm/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '353-354',
        any: [/	SIF CFLAG:ARG:451 == 0\n		CALL CHAR_BODY_GENERATE_WAPPED, ARG/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '392',
        any: [/	CALL QUEST_SELECT, ARG, "名前", 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '406',
        any: [/	CALL QUEST_SELECT, ARG, "名前", 2/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '417',
        any: [/	CALL QUEST_SELECT, ARG, "名前", 3/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '393-396',
        any: [/\n\nSIF \(ARG != MASTER \|\| MASTER\)\n	PRINTL/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '445',
        any: [/		PRINT \[扶她\]/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '528',
        any: [/;56,抗药性,;コマンド「しあわせ草」「利尿剂」が実行不可/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '326',
        any: [/CUSTOMDRAWLINE =/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '336',
        any: [
          /	PRINTFORM \\@ ARG == 0 \? %NAME:ARG, 12, LEFT% # %SAVESTR:ARG, 12, LEFT% \\@/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '333',
        any: [/	PRINTFORM NO\.\{ARG,3,LEFT\} /],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '337-347',
        any: [
          /IF TALENT:ARG:85\n	SETCOLOR 255,100,100\n	PRINT 　<爱慕>　\n	RESETCOLOR/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '350-365',
        any: [
          /AGE_STR = \nIF GETBIT\(FLAG:5,12\) && \(ARG != MASTER \|\| MASTER\)\n\n	SIF CFLAG:ARG:451 == 0/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '357',
        any: [/		AGE_STR = \{CFLAG:ARG:452\} 岁/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '359',
        any: [/		AGE_STR = \{CFLAG:ARG:451\} 岁/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '362',
        any: [/		AGE_STR = %AGE_STR% \(换算人类\{CFLAG:ARG:451, 3\} 岁\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '364',
        any: [/		AGE_STR = %AGE_STR% \[寿命还有\{CFLAG:ARG:820, 3\} 天\]/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '370',
        any: [/	PRINTFORML %AGE_STR, 48%/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '380',
        any: [
          /	PRINTPLAINFORM   身高 \{CFLAG:ARG:453 \/ 10, 3\}\.\{CFLAG:ARG:453 % 10\} cm　B \{CFLAG:ARG:455 \/ 10, 3\}\.\{CFLAG:ARG:455 % 10\} cm/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '370-373',
        any: [
          /	PRINTFORML %AGE_STR, 48%\nENDIF\n@SHOW_BLOCK\(ARG\)\nIF \(ARG != MASTER \|\| MASTER\)/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '374-377',
        any: [
          /	PRINTPLAINFORM 一人称：%SELF_CALL\(ARG\),26,LEFT%\n	PRINTFORM \[8\] 一人称重設 \nENDIF\nIF GETBIT\(FLAG:5,15\) && \(ARG != MASTER \|\| MASTER\)/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '395',
        any: [/SIF \(ARG != MASTER \|\| MASTER\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '400',
        any: [/SIF GETBIT\(FLAG:5,15\) && \(ARG != MASTER \|\| MASTER\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '411',
        any: [/SIF GETBIT\(FLAG:5,15\) && \(ARG != MASTER \|\| MASTER\)/],
      },
      // #546 起 :374 与 :375 分开引用（[8] 升级为真按钮，两行各自的注释锚）
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '374',
        any: [/	PRINTPLAINFORM 一人称：%SELF_CALL\(ARG\),26,LEFT%/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '375',
        any: [/	PRINTFORM \[8\] 一人称重設 /],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '378-385',
        any: [
          /	CALL CUP_SIZE, ARG\n	RESULTS = \(%RESULTS%\)\n	PRINTPLAINFORM   身高 \{CFLAG:ARG:453 \/ 10, 3\}\.\{CFLAG:ARG:453 % 10\} cm　B \{CFLAG:ARG:455 \/ 10, 3\}\.\{CFLAG:ARG:455 % 10\} cm\n	IF TALENT:ARG:122 ==0/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '379',
        any: [/	RESULTS = \(%RESULTS%\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '382',
        any: [/		PRINTFORM %RESULTS,7,LEFT%/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '384',
        any: [/		PRINTFORM        /],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '391-393',
        any: [
          /SIF CFLAG:ARG:534 == 1 && CFLAG:ARG:1 == 2 && GETBIT\(FLAG:8, 3\)\n	CALL QUEST_SELECT, ARG, "名前", 1\n/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '395-396',
        any: [/SIF \(ARG != MASTER \|\| MASTER\)\n	PRINTL/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '399',
        any: [/CALL LIFE_BAR, ARG, 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '405-406',
        any: [
          /SIF CFLAG:ARG:534 == 1 && CFLAG:ARG:1 == 2 && GETBIT\(FLAG:8, 3\)\n	CALL QUEST_SELECT, ARG, "名前", 2/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '405-408',
        any: [
          /SIF CFLAG:ARG:534 == 1 && CFLAG:ARG:1 == 2 && GETBIT\(FLAG:8, 3\)\n	CALL QUEST_SELECT, ARG, "名前", 2\n	\nPRINTL/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '410',
        any: [/CALL VITAL_BAR, ARG, 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '416-417',
        any: [
          /SIF CFLAG:ARG:534 == 1 && CFLAG:ARG:1 == 2 && GETBIT\(FLAG:8, 3\)\n	CALL QUEST_SELECT, ARG, "名前", 3/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '416-419',
        any: [
          /SIF CFLAG:ARG:534 == 1 && CFLAG:ARG:1 == 2 && GETBIT\(FLAG:8, 3\)\n	CALL QUEST_SELECT, ARG, "名前", 3\n	\nPRINTL/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '391',
        any: [
          /SIF CFLAG:ARG:534 == 1 && CFLAG:ARG:1 == 2 && GETBIT\(FLAG:8, 3\)/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '405',
        any: [
          /SIF CFLAG:ARG:534 == 1 && CFLAG:ARG:1 == 2 && GETBIT\(FLAG:8, 3\)/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '416',
        any: [
          /SIF CFLAG:ARG:534 == 1 && CFLAG:ARG:1 == 2 && GETBIT\(FLAG:8, 3\)/,
        ],
      },
    ],
  },
  {
    js: 'ere/page/components/chara-talents.js',
    refs: [
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '428-834',
        any: [/@SHOW_TALENT \(ARG:0 = -1\)\n\n#DIM LCOUNT, 2\n/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '835-921',
        any: [
          /@SHOW_TALENT_GROUP\(ARG, ARG:1 = 0\)\n;ARG,TALENT番号\n;TSTR = %TSTR%\[%TALENTNAME:\(ARG\)%\]\nSIF U % 8 == 0 && U != 0/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '518-521',
        any: [/		PRINTFORML %TSTR%\n\n;体質\n	U = 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '587-590',
        any: [/		PRINTFORML %TSTR%\n\n;技術,,\n	U = 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '718-721',
        any: [/		CALL SHOW_TALENT_GROUP\(282\)\n\n	SIF U != 0\n		PRINTFORML %TSTR%/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '758-761',
        any: [/		PRINTFORML %TSTR%\n\n\n;戦闘/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '663-677',
        any: [
          /;			IF TALENT:TARGET:\(LCOUNT\) & 2\n;			SIF LCOUNT == 101\n;				TSTR = %TSTR%\[Ｃ感覚封鎖\]\n;			SIF LCOUNT == 103/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '916',
        any: [/RESETCOLOR/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '606-607',
        any: [/	SIF TALENT:TARGET:327\n		CALL SHOW_TALENT_GROUP\(328\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '835-838',
        any: [
          /@SHOW_TALENT_GROUP\(ARG, ARG:1 = 0\)\n;ARG,TALENT番号\n;TSTR = %TSTR%\[%TALENTNAME:\(ARG\)%\]\nSIF U % 8 == 0 && U != 0/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '837-840',
        any: [
          /;TSTR = %TSTR%\[%TALENTNAME:\(ARG\)%\]\nSIF U % 8 == 0 && U != 0\n	PRINTL \nSIF U % 8 == 0 && U != 0/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '838-841',
        any: [
          /SIF U % 8 == 0 && U != 0\n	PRINTL \nSIF U % 8 == 0 && U != 0\n	PRINTV "　　　　"/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '911-912',
        any: [/IF ARG == 206\n	PRINTFORM \[巫者\]/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '842-868',
        any: [
          /SELECTCASE ARG\n;Ｃ敏感\nCASE 101,102,230,74\n	SETCOLORBYNAME DarkSeaGreen/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '900',
        any: [/			SETCOLOR 255,215,0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '906',
        any: [/			SETCOLOR 100,255,100/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '902-903',
        any: [/		CASE 801 TO 900\n			RESETCOLOR/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '907-908',
        any: [/		CASEELSE\n			RESETCOLOR/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '450',
        any: [/		SETCOLOR 161,216,230/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '451-460',
        any: [
          /		SIF TALENT:TARGET:318 == 0\n			PRINT \[普通阴茎\]\n		SIF TALENT:TARGET:318 == 1\n			PRINT \[巨根\]/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '537',
        any: [
          /			CASE 101 TO 108, 113, 117, 118, 121, 122, 123, 126, 127, 132, 133, 134, 136/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '771',
        any: [/		SIF INRANGE\(LCOUNT,244,248\) \|\| INRANGE\(LCOUNT,253,256\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '661',
        any: [/			CALL SHOW_TALENT_GROUP\(LCOUNT, TALENT:TARGET:\(LCOUNT\) & 2\)			/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '471-518',
        any: [/;性格\n	U = 0\n	PRINT 　性格：\n;口上用性格/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '520-587',
        any: [/;体質\n	U = 0\n	PRINT 　体质：\n;体質/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '544',
        any: [
          /	SIF TALENT:TARGET:133 && \(TALENT:TARGET:121 \|\| TALENT:TARGET:122\)/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '589-636',
        any: [/;技術,,\n	U = 0\n	PRINT 　技术：\n;技術,,/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '638-721',
        any: [/;性癖\n	U = 0\n	PRINT 　性癖：\n;正直度,,/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '724-758',
        any: [/;後天\n	U = 0\n	PRINT 　后天：\n/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '761-790',
        any: [/;戦闘\n	U = 0\n	PRINT 　战斗：\n/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '796',
        any: [/	REPEAT 400/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '799-800',
        any: [/		SIF COUNT >= 300 && COUNT < 325\n			CONTINUE/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '795',
        any: [/	U = 6/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '823-827',
        any: [
          /	FOR LCOUNT, 470, 490\n		IF TALENT:TARGET:LCOUNT\n			CALL SHOW_TALENT_GROUP\(LCOUNT\)\n		ENDIF/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '873-915',
        any: [
          /LOCALS = %TALENTNAME:\(ARG\)%\nIF TALENT:122\n	IF ARG == 101\n		LOCALS = 阴茎钝感/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '896',
        any: [/	LOCALS = %EX_TALENTNAME:\(ARG\)%/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '873',
        any: [/LOCALS = %TALENTNAME:\(ARG\)%/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '874-882',
        any: [
          /IF TALENT:122\n	IF ARG == 101\n		LOCALS = 阴茎钝感\n	ELSEIF ARG == 102/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '883-894',
        any: [
          /IF ARG:1 == 1\n	IF ARG == 101 \n		LOCALS = 阴核感觉封锁\n		SIF TALENT:122/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '842-909',
        any: [
          /SELECTCASE ARG\n;Ｃ敏感\nCASE 101,102,230,74\n	SETCOLORBYNAME DarkSeaGreen/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '897-909',
        any: [/	SELECTCASE ARG\n		;EX性格\n		CASE 101 TO 800\n			SETCOLOR 255,215,0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '911-914',
        any: [
          /IF ARG == 206\n	PRINTFORM \[巫者\]\nELSE\n	PRINTFORM \[%LOCALS%\]/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '917',
        any: [/U \+\+/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '439-793',
        any: [/IF FLAG:5 & 256\n\n	PRINT 　性別：\n	IF TALENT:TARGET:122/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '441-469',
        any: [
          /	PRINT 　性別：\n	IF TALENT:TARGET:122\n		PRINT \[男\]\n	ELSEIF TALENT:TARGET:121/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '466-469',
        any: [
          /		PRINTFORM \[%TALENTNAME:1%\]\n	SIF TALENT:TARGET:273\n		PRINTFORM \[%TALENTNAME:273%\]\n	PRINTL /,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '473',
        any: [/	PRINT 　性格：/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '633-636',
        any: [/	NEXT\n\n	SIF !LINEISEMPTY\(\)\n		PRINTL/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '787-790',
        any: [/	NEXT\n	\n	SIF !LINEISEMPTY\(\)\n		PRINTL/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '794-829',
        any: [
          /ELSE\n	U = 6\n	REPEAT 400\n		;SIF COUNT == 114 && TALENT:114 && \(TALENT:251 \|\| TALENT:252 \|\| TALENT:253\)/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '802-804',
        any: [
          /			;133,早漏,;「ふたなり」か「オトコ」の時のみ表示\n			SIF COUNT == 133 && TALENT:TARGET:121 == 0 && TALENT:TARGET:122 == 0\n				CONTINUE/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '828-829',
        any: [/SIF !LINEISEMPTY\(\)\n		PRINTL/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '439',
        any: [/IF FLAG:5 & 256/],
      },
    ],
  },
  {
    js: 'ere/page/components/chara-info-abl-mark.js',
    refs: [
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '927-986',
        any: [
          /@SHOW_INFO_ABL \(ARG:0 = -1\)\n#DIM NUMBER_OF_ABL\n#DIM ELEMENT_COUNT\n#DIM TEMP_CHARA_ID/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '992-1016',
        any: [
          /@SHOW_INFO_MARK \(ARG:0 = -1\)\n\n;キャラ差し替え処理\nLOCAL:1 = -1/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '969',
        any: [/	CALL DECIDE_ABLUP/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1010-1012',
        any: [/CALL DECIDE_ABLUP99\nSIF RESULT == 1\n	PRINT  \*/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '78-81',
        any: [
          /	ELSE \n		PRINTS "\\n"\*2 \+ " \[ 10\] 查看符合条件的奴隶或勇者 "\n		PRINTS "\\n"\*2 \+ " \[100\] 返回 "\n	ENDIF /,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '60-64',
        any: [
          /		SETCOLOR RESULT:1,RESULT:2,RESULT:3\n		FONTSTYLE 1\n		ALIGNMENT CENTER\n		PRINTS "-"\*16/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1003',
        any: [/BAR MARK:0, 3, 3/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1005',
        any: [/BAR MARK:1, 3, 3/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1007',
        any: [/BAR MARK:2, 3, 3/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1009',
        any: [/BAR MARK:3, 3, 3/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '936-939',
        any: [
          /IF INRANGE\(ARG:0, 0, CHARANUM - 1\)\n	TEMP_CHARA_ID = TARGET\n	TARGET = ARG:0\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '984-986',
        any: [/IF TEMP_CHARA_ID != -1\n	TARGET = TEMP_CHARA_ID\nENDIF/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '932',
        any: [/ELEMENT_COUNT = 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '943',
        any: [
          /	IF INRANGE\(NUMBER_OF_ABL, 5, 9\) \|\| INRANGE\(NUMBER_OF_ABL, 18, 19\) \|\| INRANGE\(NUMBER_OF_ABL, 24, 29\) \|\| INRANGE\(NUMBER_OF_ABL, 34, 36\) \|\| \(NUMBER_OF_ABL == 38\)/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '948-954',
        any: [
          /	IF TALENT:122 && \( NUMBER_OF_ABL == 2 \|\| NUMBER_OF_ABL == 22 \|\| NUMBER_OF_ABL == 33 \)\n		;男ならＶ感覚とレズっ気とレズ中毒は表示しない\n		CONTINUE\n	ELSEIF TALENT:122 == 0 && \( NUMBER_OF_ABL == 23 \|\| NUMBER_OF_ABL == 34 \)/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '957-959',
        any: [/	IF ABL:NUMBER_OF_ABL == 0\n		CONTINUE\n	ENDIF/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '962-966',
        any: [
          /	IF \(TALENT:121 \|\| TALENT:122\) && NUMBER_OF_ABL == 0\n		PRINTFORM   %"阴茎感觉", 8, LEFT% - LV\{ABL:NUMBER_OF_ABL, 2, LEFT\}\n	ELSE\n		PRINTFORM   %ABLNAME:NUMBER_OF_ABL, 8, LEFT% - LV\{ABL:NUMBER_OF_ABL, 2, LEFT\}/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '963',
        any: [
          /		PRINTFORM   %"阴茎感觉", 8, LEFT% - LV\{ABL:NUMBER_OF_ABL, 2, LEFT\}/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '965',
        any: [
          /		PRINTFORM   %ABLNAME:NUMBER_OF_ABL, 8, LEFT% - LV\{ABL:NUMBER_OF_ABL, 2, LEFT\}/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '972',
        any: [/	ELEMENT_COUNT \+= 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '973-975',
        any: [/	IF \(ELEMENT_COUNT % 4\) == 0\n		PRINTL \n	ENDIF/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '979-981',
        any: [/IF \(ELEMENT_COUNT % 4\) != 0\n	PRINTL \nENDIF/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1002',
        any: [/PRINTFORM  苦痛:LV\{MARK:0\} /],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1004',
        any: [/PRINTFORM    快乐:LV\{MARK:1\} /],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1006',
        any: [/PRINTFORM    屈服:LV\{MARK:2\} /],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1008',
        any: [/PRINTFORM    反抗:LV\{MARK:3\} /],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1010-1013',
        any: [/CALL DECIDE_ABLUP99\nSIF RESULT == 1\n	PRINT  \*\nPRINTL /],
      },
    ],
  },
  {
    js: 'ere/page/components/chara-appearance.js',
    refs: [
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1209-1388',
        any: [
          /@SHOW_APPEARACE \(ARG:0 = -1\)\n\n;キャラ差し替え処理\nLOCAL:1 = -1/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1393-1430',
        any: [
          /@SHOW_RING \(ARG:0 = -1\)\n;キャラ差し替え処理\nLOCAL:1 = -1\nIF ARG:0 >= 0 && ARG:0 < CHARANUM/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1230',
        any: [/IF CFLAG:42 == 11 && \(CFLAG:40 & 64\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1240',
        any: [/IF !\(CFLAG:40 & 6\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1253',
        any: [/SIF \(CFLAG:40 & 8\) && \(CFLAG:40 & 1\) == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1257',
        any: [/IF CFLAG:40 & 17/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1263',
        any: [/IF \(CFLAG:40 & 64\) && CFLAG:42 == 69/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1269',
        any: [/IF \(CFLAG:40 & 8\) && ABL:10 \+ ABL:17 < 3/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1276',
        any: [/IF CFLAG:40 & 8/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1285-1298',
        any: [
          /IF TALENT:125 == 1\n	PRINTL 露出了永久脱毛的陰部。\nELSEIF TALENT:310 == 1\n	PRINTL 的性器完全没有長毛。/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1302-1365',
        any: [
          /IF \(CFLAG:7 & 8\)\n	IF TALENT:122 \|\| TALENT:121\n		PRINT  阴茎\n	ELSE/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1302-1309',
        any: [
          /IF \(CFLAG:7 & 8\)\n	IF TALENT:122 \|\| TALENT:121\n		PRINT  阴茎\n	ELSE/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1310-1318',
        any: [/IF \(CFLAG:7 & 64\)\n	IF S\n		PRINT 、\n	ELSE/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1319-1327',
        any: [/IF \(CFLAG:7 & 32\)\n	IF S\n		PRINT 、\n	ELSE/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1328-1336',
        any: [/IF \(CFLAG:7 & 4\)\n	IF S\n		PRINT 、\n	ELSE/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1337-1347',
        any: [/IF \(CFLAG:40 & 6\) == 0\n	IF \(CFLAG:7 & 1\)\n		IF S\n			PRINT 、/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1348-1356',
        any: [/IF \(CFLAG:7 & 2\)\n	IF S\n		PRINT 、\n	ELSE/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1357-1365',
        any: [/IF \(CFLAG:7 & 16\)\n	IF S\n		PRINT 、\n	ELSE/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1236',
        any: [/	RETURN 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1219-1220',
        any: [/SIF CSTR:10 != ""\n	PRINTFORML  脸上刻着『%CSTR:10%』样的刺青。/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1223-1227',
        any: [
          /IF FLAG:37\n	PRINTFORM  %SAVESTR:TARGET%现在的样子是\n	CALL PRINT_CLOTHTYPE\n	PRINTL 。/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1230-1237',
        any: [
          /IF CFLAG:42 == 11 && \(CFLAG:40 & 64\)\n	SIF CFLAG:40 == 64\n		PRINTL  貌似，里面是真空的。\n	SIF LOCAL:1 != -1/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1231-1232',
        any: [/	SIF CFLAG:40 == 64\n		PRINTL  貌似，里面是真空的。/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1240-1251',
        any: [
          /IF !\(CFLAG:40 & 6\)\n	;胸の刺青\n	SIF CSTR:11 != ""\n		PRINTFORML  胸部上刻着『%CSTR:11%』样的刺青。/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1253-1254',
        any: [
          /SIF \(CFLAG:40 & 8\) && \(CFLAG:40 & 1\) == 0\n	PRINTL  貌似没穿内裤。/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1256-1261',
        any: [
          /;性器周辺が確認できない状況ならここで終了\nIF CFLAG:40 & 17\n	SIF LOCAL:1 != -1\n		TARGET = LOCAL:1;終わるときにはTARGETを戻す/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1262-1267',
        any: [
          /;オムツ着用中でも終了\nIF \(CFLAG:40 & 64\) && CFLAG:42 == 69\n	SIF LOCAL:1 != -1\n		TARGET = LOCAL:1;終わるときにはTARGETを戻す/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1268-1273',
        any: [
          /;スカートタイプ着用で顺从＋露出度が３未満でもここで終了\nIF \(CFLAG:40 & 8\) && ABL:10 \+ ABL:17 < 3\n	SIF LOCAL:1 != -1\n		TARGET = LOCAL:1;終わるときにはTARGETを戻す/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1272-1275',
        any: [/	RETURN 0\nENDIF\n\nPRINT  /],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1276-1280',
        any: [
          /IF CFLAG:40 & 8\n	PRINT 掀起\n	CALL PRINT_CLOTHTYPE_MAIN2\n	PRINT 的下摆，/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1282-1284',
        any: [/;阴毛状态\nSIF NO:TARGET != 0\n	PRINTFORM %SAVESTR:TARGET%/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1285-1299',
        any: [
          /IF TALENT:125 == 1\n	PRINTL 露出了永久脱毛的陰部。\nELSEIF TALENT:310 == 1\n	PRINTL 的性器完全没有長毛。/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1286',
        any: [/	PRINTL 露出了永久脱毛的陰部。/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1300-1370',
        any: [
          /;穿环\nS = 0\nIF \(CFLAG:7 & 8\)\n	IF TALENT:122 \|\| TALENT:121/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1337',
        any: [/IF \(CFLAG:40 & 6\) == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1311-1315',
        any: [/IF S\n		PRINT 、\n	ELSE\n		PRINT  \n	ENDIF/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1303-1307',
        any: [/	IF TALENT:122 \|\| TALENT:121\n		PRINT  阴茎\n	ELSE\n		PRINT  阴蒂/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1366-1367',
        any: [/IF S > 1\n	PRINTL 都被穿环了。/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1368-1369',
        any: [/ELSEIF S == 1\n	PRINTL 被穿环了。/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1373-1384',
        any: [
          /;尻の刺青\nSIF CSTR:14 != ""\n	PRINTFORML  屁股上刻着『%CSTR:14%』样的刺青。\n;性器の刺青/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1402',
        any: [/PRINTFORM  【武器】: /],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1404',
        any: [/	PRINT 空手/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1406',
        any: [/	CALL PRINT_EQUIPTYPE_WEAPON/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1406-1409',
        any: [/	CALL PRINT_EQUIPTYPE_WEAPON\nENDIF\n\nPRINT 　/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1412',
        any: [/PRINTFORM  【装饰A】: /],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1414',
        any: [/PRINT 无/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1416',
        any: [/CALL PRINT_EQUIPTYPE_RING/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1416-1419',
        any: [/	CALL PRINT_EQUIPTYPE_RING\nENDIF\n\nPRINT 　/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1422',
        any: [/PRINTFORM  【装饰B】: /],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1424',
        any: [/	PRINTL 无/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1426',
        any: [/CALL PRINT_EQUIPTYPE_RING/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1424-1427',
        any: [/	PRINTL 无\nELSE\n	CALL PRINT_EQUIPTYPE_RING\n	PRINTL  /],
      },
    ],
  },
  {
    js: 'ere/page/components/stain-info.js',
    refs: [
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1435-1556',
        any: [/@STAIN_INFO\n\nSWAP TARGET, TARGET:1\nSWAP ASSI, ASSI:1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1437',
        any: [/SWAP TARGET, TARGET:1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1438',
        any: [/SWAP ASSI, ASSI:1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1552-1553',
        any: [/SWAP TARGET, TARGET:1\nSWAP ASSI, ASSI:1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1514',
        any: [/	SIF ASSI < 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1551-1554',
        any: [/\nSWAP TARGET, TARGET:1\nSWAP ASSI, ASSI:1\nWAIT/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1448-1460',
        any: [
          /IF COUNT == 0\n		PRINT 的嘴巴：\n	ELSEIF COUNT == 1\n		PRINT 的双手：\n	ELSEIF COUNT == 2\n		PRINT 的阴茎：\n	ELSEIF COUNT == 3\n		PRINT 的私处：\n	ELSEIF COUNT == 4\n		PRINT 的肛门：\n	ELSEIF COUNT == 5\n		PRINT 的乳房：\n	ENDIF/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1461-1472',
        any: [
          /	SIF STAIN:MASTER:COUNT & 1\n		PRINT <爱液>\n	SIF STAIN:MASTER:COUNT & 2\n		PRINT <前液>/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1440-1474',
        any: [
          /REPEAT 6\n	SIF COUNT == 2 && TALENT:MASTER:121 == 0 && TALENT:MASTER:122 == 0\n		CONTINUE\n	SIF COUNT == 3 && TALENT:MASTER:122/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1476-1511',
        any: [
          /REPEAT 6\n	SIF COUNT == 2 && TALENT:121 == 0 && TALENT:122 == 0\n		CONTINUE\n	SIF COUNT == 3 && TALENT:122/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1513-1550',
        any: [
          /REPEAT 6\n	SIF ASSI < 0\n		BREAK\n	SIF COUNT == 2 && TALENT:ASSI:121 == 0 && TALENT:ASSI:122 == 0/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1553-1556',
        any: [/SWAP ASSI, ASSI:1\nWAIT\n\nRETURN 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1437-1438',
        any: [/SWAP TARGET, TARGET:1\nSWAP ASSI, ASSI:1/],
      },
    ],
  },
  {
    js: 'ere/page/components/chara-equip-status.js',
    refs: [
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1598-1676',
        any: [
          /@SHOW_EQUIP_1\n\nIF TEQUIP:11 \|\| TEQUIP:13 \|\| TEQUIP:14 \|\| TEQUIP:15 \|\| TEQUIP:16 \|\| TEQUIP:17 \|\| TEQUIP:18 \|\| TEQUIP:19 \|\| TEQUIP:21 \|\| TEQUIP:22 \|\| TEQUIP:43 \|\| TEQUIP:44 \|\| TEQUIP:45 \|\| TEQUIP:46 \|\| TEQUIP:47 \|\| TEQUIP:48 \|\| TEQUIP:49 \|\| TEQUIP:98 \|\| TFLAG:60 \|\| TFLAG:899 >= 1\n	PRINTFORM 使用中\(%SAVESTR:TARGET%\) /,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1564-1590',
        any: [
          /@SHOW_EQUIP_2\nSETCOLOR 0xff1493\nIF TEQUIP:53\n	LOCAL = 10 \+ 4 \* CFLAG:499 - CFLAG:491 \+ 1/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '406',
        any: [/	CALL QUEST_SELECT, ARG, "名前", 2/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1565',
        any: [/SETCOLOR 0xff1493/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1603',
        any: [/SETCOLOR 0xff1493/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1567',
        any: [/	LOCAL = 10 \+ 4 \* CFLAG:499 - CFLAG:491 \+ 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1579-1581',
        any: [
          /	PRINT  \[使役魔兽PLAY中（\n	CALL MONSTER_NAME,E:300,0\n	PRINT ）\]/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1586-1589',
        any: [
          /	PRINT  \[触手召喚中\] \nSIF TEQUIP:55\n	PRINT  \[死斗场决斗中\] \nPRINTL  /,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1600',
        any: [
          /IF TEQUIP:11 \|\| TEQUIP:13 \|\| TEQUIP:14 \|\| TEQUIP:15 \|\| TEQUIP:16 \|\| TEQUIP:17 \|\| TEQUIP:18 \|\| TEQUIP:19 \|\| TEQUIP:21 \|\| TEQUIP:22 \|\| TEQUIP:43 \|\| TEQUIP:44 \|\| TEQUIP:45 \|\| TEQUIP:46 \|\| TEQUIP:47 \|\| TEQUIP:48 \|\| TEQUIP:49 \|\| TEQUIP:98 \|\| TFLAG:60 \|\| TFLAG:899 >= 1/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1608-1654',
        any: [
          /IF TEQUIP:11 && TEQUIP:90\n	PRINT \[触手插入\]\nELSEIF TEQUIP:11\n	PRINT \[蠕虫\]/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1604-1607',
        any: [
          /SIF TEQUIP:21\n	PRINT \[媚药效果发挥中\]\nSIF TEQUIP:22\n	PRINT \[利尿剂效果发挥中\]/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1655-1671',
        any: [/SIF TEQUIP:98\n	PRINT \[触手口辱\]\n\nSIF TEQUIP:43/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1604-1605',
        any: [/SIF TEQUIP:21\n	PRINT \[媚药效果发挥中\]/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1606-1607',
        any: [/SIF TEQUIP:22\n	PRINT \[利尿剂效果发挥中\]/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1655-1656',
        any: [/SIF TEQUIP:98\n	PRINT \[触手口辱\]/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1658-1659',
        any: [/SIF TEQUIP:43\n	PRINT \[眼罩\]/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1660-1661',
        any: [/SIF TEQUIP:45\n	PRINT \[口塞\]/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1662-1663',
        any: [/SIF TEQUIP:18\n	PRINT \[淋浴\]/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1664-1665',
        any: [/SIF TEQUIP:19\n	PRINT \[肛珠\]/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1666-1667',
        any: [/SIF TEQUIP:49\n	PRINT \[肛门电极\]/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1601',
        any: [/	PRINTFORM 使用中\(%SAVESTR:TARGET%\) /],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1668-1669',
        any: [/SIF TFLAG:60 == 1 && PREVCOM != 56\n	PRINT \[插入中\]/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1670-1671',
        any: [/SIF TFLAG:899 >= 1\n	PRINT \[失神中\]/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1672-1675',
        any: [
          /RESETCOLOR\n\n;ココより↑にTEQUIPに登録したものを書き込む\nPRINTL  /,
        ],
      },
    ],
  },
  {
    js: 'ere/page/components/chara-data.js',
    refs: [
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1681-1760',
        any: [
          /@SHOW_DATA\(ARG\)\n#DIM LOVE_ID\nIF CFLAG:ARG:570 > 0\n	CALL MONSTER_DATA, CFLAG:ARG:570, 3, ARG, -1/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1686-1688',
        any: [/SETCOLOR 0x63E390\n	CALL MONSTER_NAME,E:300,0\nRESETCOLOR/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1721',
        any: [/	PRINTFORM %GET_LOOK_INFO\(ARG, "婚史"\)%/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1711',
        any: [/		CALL SEARCH_FAMILY,TARGET,"LOVE"/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '232',
        any: [/CALL SHOW_DATA\(ARG\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '294',
        any: [/CALL SHOW_DATA\(ARG\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '18',
        any: [/#DIM page/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1686',
        any: [/SETCOLOR 0x63E390/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1744-1757',
        any: [
          /IF CFLAG:ARG:151 > 150\n	PRINT \|纯洁\nELSEIF CFLAG:ARG:151 > 100\n	PRINT \|正义/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1705-1723',
        any: [
          /IF CFLAG:ARG:601 == 900\n	PRINT 野狗\nELSEIF CFLAG:ARG:601 == 901\n	PRINTFORM %SAVESTR:MASTER%/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1692',
        any: [/IF CFLAG:ARG:130 > 0 && CFLAG:131 > 5/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1683-1690',
        any: [
          /IF CFLAG:ARG:570 > 0\n	CALL MONSTER_DATA, CFLAG:ARG:570, 3, ARG, -1\n	PRINT \[使役魔兽:\nSETCOLOR 0x63E390/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1684',
        any: [/	CALL MONSTER_DATA, CFLAG:ARG:570, 3, ARG, -1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1692-1702',
        any: [
          /IF CFLAG:ARG:130 > 0 && CFLAG:131 > 5\n	PRINT \[凌辱隶属:\nELSEIF CFLAG:ARG:130 > 0\n	PRINT \[凌辱畏惧:/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1700',
        any: [/	CALL MONSTER_NAME,LOCAL,0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1704-1739',
        any: [
          /PRINT \[结婚对象:\nIF CFLAG:ARG:601 == 900\n	PRINT 野狗\nELSEIF CFLAG:ARG:601 == 901/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1741-1760',
        any: [
          /PRINT \[善恶值:\nPRINTV CFLAG:ARG:151\n\nIF CFLAG:ARG:151 > 150/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1757-1760',
        any: [/	PRINT \|邪恶\nENDIF\n\nPRINTL \]　/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1705-1737',
        any: [
          /IF CFLAG:ARG:601 == 900\n	PRINT 野狗\nELSEIF CFLAG:ARG:601 == 901\n	PRINTFORM %SAVESTR:MASTER%/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1706',
        any: [/	PRINT 野狗/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1708',
        any: [/	PRINTFORM %SAVESTR:MASTER%/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1710-1716',
        any: [
          /	IF CFLAG:ARG:606 == 200\n		CALL SEARCH_FAMILY,TARGET,"LOVE"\n		IF RESULT > 0\n			PRINTFORM %SAVESTR:RESULT%/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1718',
        any: [/		CALL NAME_LOVER, CFLAG:ARG:606, 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1720-1723',
        any: [
          /ELSEIF CFLAG:ARG:601 == 0 && !EX_TALENT:ARG:2\n	PRINTFORM %GET_LOOK_INFO\(ARG, "婚史"\)%\nELSEIF CFLAG:ARG:601 == 0 && EX_TALENT:ARG:2\n	PRINTFORM 无/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1724-1737',
        any: [
          /ELSEIF CFLAG:601 != 0\n	LOCAL = CFLAG:ARG:601\n	LOCAL %= 10\n	IF LOCAL == 9/,
        ],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {
  'daycycle-max': [
    {
      js: 'ere/page/page-chara-talent-condition.js',
      refs: [
        {
          ref: '203-222',
          any: [
            /爱慕条件： \[好感度 100%\]  \[顺从   Lv3\]   \[侍奉精神 Lv3\] \[屈服刻印 Lv3\] \[侍奉快乐 200\] \[反抗刻印\]  \n淫乱条件： \[好感度 100%\]  \[欲望   Lv3\]   \[四点感觉Lv10\] \[快乐刻印 Lv3\] \[屈服刻印 Lv3\] \[异常经验   3\] \[反抗刻印\]  \n擅用舌头： \[技巧   Lv5\]   \[侍奉技术 Lv5\] \[口交经验1000\] \n施虐狂  ： \[抖S气质 Lv4\]  \[技巧   Lv4\]   \[施虐快乐 300\] \n受虐狂  ： \[抖M气质 Lv4\]  \[露出癖 Lv2\]   \[被虐快乐 300\] \n露出狂  ： \[露出癖 Lv4\]   \[抖M气质 Lv2\]  \[调教自慰\|放尿经验\|喷奶经验 200\]\n牝犬条件： \[欲望   Lv5\]   \[兽奸中毒 Lv3\] \[兽奸经验 300\] \n自慰狂  ： \[阴蒂感觉 Lv4\] \[调教自慰 100\] \[绝顶经验 100\] \n弄乳狂  ： \[乳房感觉 Lv4\] \[喷奶经验 100\] \[绝顶经验 100\] \n性爱狂  ： \[私处感觉 Lv4\] \[私处经验 300\] \[绝顶经验 100\] \n尻穴狂  ： \[肛门感觉 Lv4\] \[肛门快乐 300\] \[绝顶经验 100\] \n淫核条件： \[阴蒂感觉 Lv5\] \[调教自慰 100\] \[绝顶经验 300\] \n淫乳条件： \[乳房感觉 Lv5\] \[喷奶经验 100\] \[绝顶经验 300\] \n淫壶条件： \[私处感觉 Lv5\] \[私处经验 300\] \[绝顶经验 300\] \n淫肛条件： \[肛门感觉 Lv5\] \[肛门快乐 300\] \[绝顶经验 300\] \n性豪条件： \[淫核素质\]  \[淫乳素质\]  \[淫壶素质\]  \[淫肛素质\]  \n时常发情： \[润滑积蓄 700\] \[欲情积蓄2250\] \n喜欢精液： \[饮精绝顶  51\]\n妓女条件： \[技巧   Lv1\]   \[欲望   Lv2\]   \[卖淫经验 100\] \[反抗刻印\]  \n盲从条件： 【\[爱慕素质\]  \[勋章经验   5\] \[顺从   Lv4\]   】【\[淫乱素质\]  \[勋章经验  10\] \[顺从   Lv5\]   】\[反抗刻印\]/,
          ],
        },
      ],
    },
    {
      js: 'ere/page/components/chara-talents.js',
      refs: [{ ref: '188', any: [/　体质：　技术：\[魅力\]/] }],
    },
    {
      js: 'test/chara-info-show.test.js',
      refs: [
        {
          ref: '186-191',
          any: [
            /　性別：\[女\]\[处女\]\[私处封印\]\n　性格：\[伶俐\]\[戒备森严\]\[开放\]\[害羞\]\n　体质：　技术：\[魅力\]\n　性癖：\[接受快感\]\[双性恋\]\n　后天：\[初心者\]\n　战斗：\[弓手\]\[先制\]/,
          ],
        },
        {
          ref: '203-222',
          any: [
            /爱慕条件： \[好感度 100%\]  \[顺从   Lv3\]   \[侍奉精神 Lv3\] \[屈服刻印 Lv3\] \[侍奉快乐 200\] \[反抗刻印\]  \n淫乱条件： \[好感度 100%\]  \[欲望   Lv3\]   \[四点感觉Lv10\] \[快乐刻印 Lv3\] \[屈服刻印 Lv3\] \[异常经验   3\] \[反抗刻印\]  \n擅用舌头： \[技巧   Lv5\]   \[侍奉技术 Lv5\] \[口交经验1000\] \n施虐狂  ： \[抖S气质 Lv4\]  \[技巧   Lv4\]   \[施虐快乐 300\] \n受虐狂  ： \[抖M气质 Lv4\]  \[露出癖 Lv2\]   \[被虐快乐 300\] \n露出狂  ： \[露出癖 Lv4\]   \[抖M气质 Lv2\]  \[调教自慰\|放尿经验\|喷奶经验 200\]\n牝犬条件： \[欲望   Lv5\]   \[兽奸中毒 Lv3\] \[兽奸经验 300\] \n自慰狂  ： \[阴蒂感觉 Lv4\] \[调教自慰 100\] \[绝顶经验 100\] \n弄乳狂  ： \[乳房感觉 Lv4\] \[喷奶经验 100\] \[绝顶经验 100\] \n性爱狂  ： \[私处感觉 Lv4\] \[私处经验 300\] \[绝顶经验 100\] \n尻穴狂  ： \[肛门感觉 Lv4\] \[肛门快乐 300\] \[绝顶经验 100\] \n淫核条件： \[阴蒂感觉 Lv5\] \[调教自慰 100\] \[绝顶经验 300\] \n淫乳条件： \[乳房感觉 Lv5\] \[喷奶经验 100\] \[绝顶经验 300\] \n淫壶条件： \[私处感觉 Lv5\] \[私处经验 300\] \[绝顶经验 300\] \n淫肛条件： \[肛门感觉 Lv5\] \[肛门快乐 300\] \[绝顶经验 300\] \n性豪条件： \[淫核素质\]  \[淫乳素质\]  \[淫壶素质\]  \[淫肛素质\]  \n时常发情： \[润滑积蓄 700\] \[欲情积蓄2250\] \n喜欢精液： \[饮精绝顶  51\]\n妓女条件： \[技巧   Lv1\]   \[欲望   Lv2\]   \[卖淫经验 100\] \[反抗刻印\]  \n盲从条件： 【\[爱慕素质\]  \[勋章经验   5\] \[顺从   Lv4\]   】【\[淫乱素质\]  \[勋章经验  10\] \[顺从   Lv5\]   】\[反抗刻印\]/,
          ],
        },
      ],
    },
  ],
  'train-upgrade': [
    {
      js: 'ere/page/components/chara-info-abl-mark.js',
      refs: [
        { ref: '157', any: [/  技巧     - LV3   /] },
        {
          ref: '159',
          any: [
            / 苦痛:LV0 \[\.\.\.\]   快乐:LV0 \[\.\.\.\]   屈服:LV0 \[\.\.\.\]   反抗:LV0 \[\.\.\.\]/,
          ],
        },
      ],
    },
    {
      js: 'test/chara-info-show.test.js',
      refs: [
        { ref: '157', any: [/  技巧     - LV3   /] },
        {
          ref: '159',
          any: [
            / 苦痛:LV0 \[\.\.\.\]   快乐:LV0 \[\.\.\.\]   屈服:LV0 \[\.\.\.\]   反抗:LV0 \[\.\.\.\]/,
          ],
        },
      ],
    },
  ],
};
