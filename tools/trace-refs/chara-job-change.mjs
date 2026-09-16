// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #393：chara-job-change.js 的锚表（CHARA_JOB_CHANGE.ERB 全文件）

export const FILES = [
  {
    js: 'ere/chara/chara-job-change.js',
    refs: [
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '4-20',
        any: [/^\s*@SHOW_BUTTON_JOB_CHANGE\(NUM, ARG\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '10',
        any: [/^\s*LOCAL = CHECK_ABLE_TO_JOB_CHANGE\(ARG\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '11-13',
        any: [/^\s*IF LOCAL == 2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '15-16',
        any: [/^\s*SETCOLOR 0x646464\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '16',
        any: [/^\s*SETCOLOR 0x646464\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '18',
        any: [/^\s*PRINTFORM \[\{NUM\}\] 转职\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '18-20',
        any: [/^\s*PRINTFORM \[\{NUM\}\] 转职\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '19',
        any: [/^\s*RESETCOLOR\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '19-27',
        any: [/^\s*RESETCOLOR\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '23-42',
        any: [/^\s*@CHECK_ABLE_TO_JOB_CHANGE\(ARG\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '29-31',
        any: [/^\s*IF ARG == 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '31',
        any: [/^\s*RETURNF 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '32-34',
        any: [/^\s*ELSEIF CFLAG:ARG:1 == 2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '33-34',
        any: [/^\s*RETURNF 2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '35-36',
        any: [/^\s*ELSEIF CFLAG:ARG:9 < 50\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '35-37',
        any: [/^\s*ELSEIF CFLAG:ARG:9 < 50\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '38-40',
        any: [/^\s*ELSEIF CFLAG:ARG:1 != 0 && CFLAG:ARG:1 != 7\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '42',
        any: [/^\s*RETURNF 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '45-230',
        any: [/^\s*@CHARA_INFO_JOB_CHANGE\(ARG\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '51',
        any: [/^\s*LOCAL = CHECK_ABLE_TO_JOB_CHANGE\(ARG\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '52-64',
        any: [/^\s*IF LOCAL != 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '54',
        any: [/^\s*PRINTW 你的职业无法改变\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '55-57',
        any: [/^\s*ELSEIF LOCAL == 2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '59',
        any: [/^\s*PRINTW 必须积累更多经验！\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '61',
        any: [/^\s*PRINTW 该角色处于不可转职的状态\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '61-63',
        any: [/^\s*PRINTW 该角色处于不可转职的状态\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '68-86',
        any: [/^\s*PRINT \[0\] 战士\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '70-79',
        any: [/^\s*PRINT \[0\] 战士\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '70-80',
        any: [/^\s*PRINT \[0\] 战士\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '70-86',
        any: [/^\s*PRINT \[0\] 战士\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '81-84',
        any: [/^\s*PRINT \[10\]魔界将军\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '86',
        any: [/^\s*PRINTL \[999\] 停止\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '88',
        any: [/^\s*INPUT\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '89-90',
        any: [/^\s*IF RESULT == 999\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '91-96',
        any: [/^\s*ELSEIF RESULT < 12 && RESULT > 9\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '93',
        any: [/^\s*IF EXP:ARG:81 < 10\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '94',
        any: [/^\s*PRINTW \*勋章不足\*\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '95',
        any: [/^\s*GOTO INPUT_LOOP\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '97-98',
        any: [/^\s*ELSEIF RESULT == 12\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '99-100',
        any: [/^\s*ELSEIF RESULT < 0 \|\| RESULT > 9\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '103-115',
        any: [/^\s*CFLAG:ARG:1 = 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '104',
        any: [/^\s*CFLAG:ARG:1 = 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '105',
        any: [/^\s*FOR COUNT, 0, 13\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '105-107',
        any: [/^\s*FOR COUNT, 0, 13\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '106',
        any: [/^\s*TALENT:ARG:\(COUNT\+200\) = 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '109',
        any: [/^\s*TALENT:ARG:281 = 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '111',
        any: [/^\s*LOCAL = RESULT\+200\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '113',
        any: [/^\s*TALENT:ARG:LOCAL = 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '115',
        any: [/^\s*CFLAG:ARG:9 = 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '117-137',
        any: [/^\s*IF LOCAL == 200\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '133-134',
        any: [/^\s*ELSEIF LOCAL == 209\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '140-176',
        any: [/^\s*IF TALENT:ARG:200 == 1 \|\| TALENT:ARG:205 == 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '170-175',
        any: [/^\s*ELSE\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '178-179',
        any: [/^\s*MAXBASE:ARG:0 = 2000\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '178-186',
        any: [/^\s*MAXBASE:ARG:0 = 2000\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '180',
        any: [/^\s*IF TALENT:ARG:210 == 1 \|\| TALENT:ARG:211 == 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '180-184',
        any: [/^\s*IF TALENT:ARG:210 == 1 \|\| TALENT:ARG:211 == 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '185',
        any: [/^\s*BASE:ARG:0 = MAXBASE:ARG:0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '186',
        any: [/^\s*BASE:ARG:1 = MAXBASE:ARG:1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '188',
        any: [/^\s*PRINTFORMW %SAVESTR:ARG%转职为%TALENTNAME:LOCAL%了！\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '190-191',
        any: [/^\s*IF TALENT:ARG:204 == 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '190-192',
        any: [/^\s*IF TALENT:ARG:204 == 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '194-208',
        any: [
          /^\s*IF \(TALENT:ARG:202 == 0 && TALENT:ARG:206 == 0\) && \(TALENT:ARG:250 \|\| TALENT:ARG:242\) && TALENT:ARG:282 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '197',
        any: [/^\s*PRINTFORML 要弃教吗\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '198-199',
        any: [/^\s*PRINT  \[0\] 弃教\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '201',
        any: [/^\s*INPUT\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '204',
        any: [/^\s*TALENT:ARG:282 = 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '205',
        any: [/^\s*PRINTW \*已经弃教了\*\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '212-218',
        any: [/^\s*IF TALENT:ARG:202 == 1 \|\| TALENT:ARG:206 == 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '213',
        any: [/^\s*TALENT:ARG:117 = 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '215',
        any: [/^\s*CFLAG:ARG:152 = 20\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '217',
        any: [/^\s*TALENT:ARG:118 = 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '219-229',
        any: [/^\s*IF TALENT:ARG:212\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '221',
        any: [/^\s*PRINTFORML 请选择想要契约的魔兽\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '222',
        any: [/^\s*CALL MONSTERPLAY_LIST\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '224',
        any: [/^\s*INPUT\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '225',
        any: [/^\s*CFLAG:ARG:570 = RESULT\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '226-228',
        any: [/^\s*PRINT 与\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '226-230',
        any: [/^\s*PRINT 与\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '227-228',
        any: [/^\s*CALL MONSTER_NAME,CFLAG:ARG:570,0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '233-262',
        any: [/^\s*@JOB_CHANGE_BENKI\(ARG\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '238',
        any: [/^\s*PRINTFORML 将常识变成性爱。\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '239-240',
        any: [/^\s*PRINT  \[0\] 变更战斗的常识  -\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '242-243',
        any: [/^\s*PRINT  \[1\] 变更生活的常识  -\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '245',
        any: [/^\s*PRINTL  \[999\] 終了\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '247',
        any: [/^\s*INPUT\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '249-250',
        any: [/^\s*IF RESULT == 999\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '251-253',
        any: [/^\s*ELSEIF RESULT == 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '252',
        any: [/^\s*TALENT:ARG:281 \+= 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '253',
        any: [/^\s*TALENT:ARG:281 %= 3\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '254-259',
        any: [/^\s*ELSEIF RESULT == 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '255-259',
        any: [/^\s*SIF TALENT:ARG:283 == 5 && ITEM:22 == 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '257-258',
        any: [/^\s*SIF TALENT:ARG:283 == 5 && ITEM:22 == 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '259',
        any: [/^\s*TALENT:ARG:283 %= 6\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_JOB_CHANGE.ERB',
        ref: '260-262',
        any: [/^\s*ENDIF\s*GOTO INPUT_LOOP\s*$/m],
      },

      // 调用方 CHARA_INFO ver1.0.1.ERB 的调用点回显（本模块的接线锚）
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO ver1.0.1.ERB',
        ref: '1051',
        any: [/^\s*CALL CHARA_INFO_JOB_CHANGE\(ARG\)\s*$/m],
      },
      // 调用方 CHARA_INFO ver1.0.1.ERB 的调用点回显（本模块的接线锚）
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO ver1.0.1.ERB',
        ref: '1051',
        any: [/^\s*CALL CHARA_INFO_JOB_CHANGE\(ARG\)\s*$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
