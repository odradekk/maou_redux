// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #393：chara-temptation.js 的锚表（CHARA_TEMPTATION.ERB 全文件）

export const FILES = [
  {
    js: 'ere/chara/chara-temptation.js',
    refs: [
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '4-20',
        any: [/^\s*@SHOW_BUTTON_TEMPTATION\(NUM, ARG\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '10-19',
        any: [/^\s*IF LOCAL != 2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '11-13',
        any: [/^\s*IF LOCAL != 2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '11-19',
        any: [/^\s*IF LOCAL != 2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '14-19',
        any: [
          /^\s*IF LOCAL == 1\s*; 侵攻中の勇者でないならボタン自体を表示しない\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '20',
        any: [/^\s*PRINTFORM \[\{NUM\}\] 魔的诱惑\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '23-36',
        any: [/^\s*@CHECK_ABLE_TO_TEMPTATION\(ARG\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '29-31',
        any: [/^\s*IF CFLAG:ARG:1 != 2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '32-34',
        any: [/^\s*ELSEIF CFLAG:ARG:800 == 4\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '36',
        any: [/^\s*RETURNF 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '39-86',
        any: [/^\s*@TEMPTATION\(ARG\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '45',
        any: [/^\s*LOCAL = CHECK_ABLE_TO_TEMPTATION\(ARG\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '46-51',
        any: [/^\s*RETURN 2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '47-49',
        any: [/^\s*RETURN 2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '60-63',
        any: [/^\s*IF BASE:0:1 < 2000\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '60-64',
        any: [/^\s*IF BASE:0:1 < 2000\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '61-69',
        any: [/^\s*PRINTW \*你的魔力耗尽了\*\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '64',
        any: [/^\s*BASE:0:1 -= 2000\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '67',
        any: [/^\s*CALL TEMPTATION_TRY\(ARG\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '68',
        any: [/^\s*WAIT\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '71',
        any: [/^\s*PRINTFORML 好感度：\{CFLAG:ARG:2\}\/1000\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '71-74',
        any: [/^\s*PRINTFORML 好感度：\{CFLAG:ARG:2\}\/1000\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '75',
        any: [/^\s*WAIT\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '77',
        any: [/^\s*IF \(CFLAG:ARG:2\) >= 1000\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '77-83',
        any: [/^\s*IF \(CFLAG:ARG:2\) >= 1000\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '85-86',
        any: [/^\s*;リターン１でターンエンド\s*;RETURN 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '90-197',
        any: [/^\s*IF RAND:10 == 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '189',
        any: [/^\s*TALENT:ARG:290 = 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '202',
        any: [/^\s*@TEMPTATION_TRY\(ARG\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '202-364',
        any: [/^\s*CALL PREPARE_TEMPTATION\(ARG, SEIKOU, SIPPAI\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '207',
        any: [/^\s*CALL PREPARE_TEMPTATION\(ARG, SEIKOU, SIPPAI\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '210',
        any: [/^\s*IF FI_TEMPTATION\(ARG, SEIKOU, SIPPAI\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '216-220',
        any: [/^\s*CASE 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '221-227',
        any: [/^\s*CASE 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '228-232',
        any: [/^\s*CASE 2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '233-237',
        any: [/^\s*CASE 3\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '238-242',
        any: [/^\s*CASE 4\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '243-260',
        any: [/^\s*CASE 5\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '243-278',
        any: [/^\s*CASE 5\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '258-260',
        any: [/^\s*BASE:ARG:0 \+= CFLAG:0:9 \* 50\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '261-278',
        any: [/^\s*CASE 6\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '276-278',
        any: [/^\s*BASE:ARG:1 \+= CFLAG:0:9 \* 50\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '279-287',
        any: [/^\s*CASE 7, 8\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '288-300',
        any: [/^\s*CALL KARMA, ARG, - RAND\(1, 4\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '290-291',
        any: [/^\s*CALL KARMA, ARG, - RAND\(1, 4\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '293-298',
        any: [/^\s*CALL KARMA, ARG, RAND\(1, 3\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '294-297',
        any: [/^\s*CALL KARMA, ARG, RAND\(1, 3\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '301-360',
        any: [
          /^\s*IF RAND:20 == 0 && TALENT:ARG:担保人 == 0 && MONEY >= LOCAL\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '304',
        any: [/^\s*LOCAL = 10000\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '306',
        any: [
          /^\s*IF RAND:20 == 0 && TALENT:ARG:担保人 == 0 && MONEY >= LOCAL\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '306-322',
        any: [
          /^\s*IF RAND:20 == 0 && TALENT:ARG:担保人 == 0 && MONEY >= LOCAL\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '319-320',
        any: [/^\s*MONEY -= LOCAL\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '319-321',
        any: [/^\s*MONEY -= LOCAL\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '319-322',
        any: [/^\s*MONEY -= LOCAL\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '326-342',
        any: [
          /^\s*ELSEIF RAND:20 == 0 && TALENT:ARG:121 == 0 && TALENT:ARG:122 == 0 && MONEY >= LOCAL\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '339-341',
        any: [/^\s*MONEY -= LOCAL\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '344-358',
        any: [
          /^\s*ELSEIF RAND:10 == 0 && CFLAG:ARG:582 < \(LOCAL \* -1\) && MONEY >= LOCAL\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '344-364',
        any: [
          /^\s*ELSEIF RAND:10 == 0 && CFLAG:ARG:582 < \(LOCAL \* -1\) && MONEY >= LOCAL\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '355-356',
        any: [/^\s*MONEY -= LOCAL\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '355-357',
        any: [/^\s*CFLAG:ARG:582 \+= LOCAL\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '373-397',
        any: [/^\s*@FI_TEMPTATION\(ARG, SEIKOU, SIPPAI\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '382-384',
        any: [
          /^\s*SIF TALENT:ARG:73 \|\| TALENT:ARG:76 \|\| TALENT:ARG:85 \|\| TALENT:ARG:204\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '385-388',
        any: [/^\s*SIF RAND:20 < 5 && \(RING:1 == 20 \|\| RING:2 == 20\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '389-391',
        any: [/^\s*SIF RAND:10 < 5 && \(RING:1 == 18 \|\| RING:2 == 18\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '393-397',
        any: [/^\s*IF RAND:\(SEIKOU \+ SIPPAI\) < SEIKOU\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '404-447',
        any: [/^\s*@PREPARE_TEMPTATION\(ARG, SEIKOU, SIPPAI\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '411-416',
        any: [/^\s*SEIKOU = 99 \+ CFLAG:0:9\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '419-429',
        any: [
          /^\s*SELECTCASE \(BASE:ARG:0 \* 100\) \/ MAXBASE:ARG:0\s*$\n^\s*CASE IS >= 75\s*$\n^\s*CASE IS >= 50\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '419-440',
        any: [
          /^\s*ENDSELECT\s*$\n^\s*SELECTCASE \(BASE:ARG:1 \* 100\) \/ MAXBASE:ARG:1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '430-440',
        any: [
          /^\s*SELECTCASE \(BASE:ARG:1 \* 100\) \/ MAXBASE:ARG:1\s*$\n^\s*CASE IS >= 75\s*$\n^\s*CASE IS >= 50\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_TEMPTATION.ERB',
        ref: '443-447',
        any: [/^\s*SIPPAI = 50 \+ CFLAG:ARG:9 \+ CFLAG:ARG:151\s*$/m],
      },

      // 调用方 CHARA_INFO ver1.0.1.ERB 的调用点回显（本模块的接线锚）
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO ver1.0.1.ERB',
        ref: '1054',
        any: [/^\s*CALL TEMPTATION\(ARG\)\s*$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
