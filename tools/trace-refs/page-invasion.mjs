// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：page-invasion.mjs

export const FILES = [
  {
    js: 'ere/page/page-invasion.js',
    refs: [
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '2-209',
        any: [/^\s*@KYOTEN_EVENT, ARG:0$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '6-997',
        any: [/^\s*@INVASION$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '15-104',
        any: [/^\s*IF FLAG:81 >= 2000 && FLAG:93 == 0$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '25-138',
        any: [/^\s*\$INPUT_LOOP2$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '26',
        any: [/^\s*CLEARLINE LINECOUNT$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '110-111',
        any: [/^\s*AREA = 81$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '111',
        any: [/^\s*;FLAG:94 = 1$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '139-142',
        any: [/^\s*ELSE$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '139-204',
        any: [/^\s*\$START1$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '143-151',
        any: [/^\s*\$START1$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '144-186',
        any: [/^\s*REPEAT 90$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '188-200',
        any: [/^\s*\$INPUT_LOOP$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '190-191',
        any: [/^\s*IF RESULT == 999$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '192-195',
        any: [/^\s*ELSEIF RESULT >= 4$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '193',
        any: [/^\s*GOTO INPUT_LOOP$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '195',
        any: [/^\s*GOTO INPUT_LOOP$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '196-199',
        any: [/^\s*ELSEIF RESULT == 0 && MON_NUM < 600$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '197',
        any: [/^\s*GOTO INPUT_LOOP$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '199',
        any: [/^\s*GOTO INPUT_LOOP$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '202',
        any: [/^\s*INV_TYPE = RESULT$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '203-207',
        any: [/^\s*SINKOU = 0$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '204',
        any: [
          /^\s*PRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '209-263',
        any: [/^\s*IF INV_TYPE == 0$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '210',
        any: [/^\s*IF INV_TYPE == 0$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '212-235',
        any: [/^\s*@INVASION_EVENT, AREA, SINDO, INV_TYPE, SINKOU, YUSYA_I$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '224-232',
        any: [/^\s*IF LOCAL == 9$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '236-259',
        any: [/^\s*IF EX_FLAG:99 <= 20 && EX_FLAG:99 >= 0$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '250-251',
        any: [/^\s*SIF FLAG:SINDO != 0$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '257-260',
        any: [/^\s*IF FLAG:AREA == 0 && FLAG:SINDO == 0$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '266-296',
        any: [/^\s*ELSEIF INV_TYPE == 1$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '267',
        any: [/^\s*SINKOU = BASE:0:1 \/ 25$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '268',
        any: [/^\s*BASE:0:1 \/= 2$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '269-293',
        any: [/^\s*IF EX_FLAG:99 <= 20 && EX_FLAG:99 >= 0$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '270-274',
        any: [/^\s*IF EX_FLAG:99 <= 20 && EX_FLAG:99 >= 0$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '273',
        any: [/^\s*SIF INV_TYPE != 2$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '273-274',
        any: [/^\s*SIF INV_TYPE != 2$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '275-278',
        any: [/^\s*ELSEIF EX_FLAG:99 <= 40 && EX_FLAG:99 > 20$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '279-284',
        any: [/^\s*ELSEIF EX_FLAG:99 <= 60 && EX_FLAG:99 > 40$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '279-459',
        any: [/^\s*IF FLAG:AREA >= 5000 && FLAG:SINDO == 0 && INV_TYPE == 2$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '285-286',
        any: [/^\s*ELSEIF EX_FLAG:99 <= 80 && EX_FLAG:99 > 60$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '287-292',
        any: [/^\s*ELSEIF EX_FLAG:99 <= 100 && EX_FLAG:99 > 80$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '296',
        any: [/^\s*PRINTFORMW 战斗力　\{SINKOU\}点$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '298-441',
        any: [/^\s*\$INPUT_LOOP_TMPO2$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '299',
        any: [/^\s*ELSEIF INV_TYPE == 2$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '442',
        any: [/^\s*ELSEIF INV_TYPE == 3$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '442-561',
        any: [/^\s*\$INPUT_LOOP_TMPO3$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '539',
        any: [
          /^\s*SIF FLAG:SINDO \|\| INV_TYPE != 0 && INV_TYPE != 2 && INV_TYPE != 3$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '565-598',
        any: [/^\s*IF TALENT:0:325 == 1$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '565-603',
        any: [/^\s*IF TALENT:0:325 == 1$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '568-572',
        any: [
          /^\s*PRINTFORMW 魔王补正　　　x\{TMP2_I\/100\}\.%TOSTR\(TMP2_I%100,"00"\)%$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '574-590',
        any: [/^\s*IF TALENT:0:325 == 1$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '593-595',
        any: [/^\s*CALL MEDAL_BONUS,0$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '598',
        any: [/^\s*PRINTFORMW 合计　\{SINKOU\}点$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '601-603',
        any: [
          /^\s*CALL INVASION_EVENT, AREA, SINDO, INV_TYPE, SINKOU, YUSYA_I$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '609-618',
        any: [/^\s*IF INV_TYPE == 3$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '613-615',
        any: [/^\s*ELSE$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '617-618',
        any: [/^\s*SIF FLAG:AREA >= 10000$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '694-757',
        any: [/^\s*ELSEIF INV_TYPE == 1$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '696',
        any: [/^\s*PRINTFORML %SAVESTR:MASTER%的魔力爆发出来了！$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '697-709',
        any: [/^\s*IF SINKOU < 100$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '711-738',
        any: [/^\s*IF AREA == 81 && FLAG:SINDO$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '736-738',
        any: [/^\s*ELSE$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '742-757',
        any: [/^\s*SIF AREA == 81$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '824',
        any: [/^\s*SIF INV_TYPE != 0 && INV_TYPE != 2 && INV_TYPE != 3$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '976',
        any: [/^\s*DRAWLINE$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '976-997',
        any: [/^\s*IF AREA == 81$/m],
      },
      { src: 'target/ERB/侵略/INVASION.ERB', ref: '977', any: [/^\s*WAIT$/m] },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '978',
        any: [/^\s*EX_FLAG:99 \+= 2$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '983-994',
        any: [/^\s*IF AREA == 81$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '996',
        any: [/^\s*CALL INVASION_CHECK$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '997',
        any: [/^\s*RETURN 1$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '999-1021',
        any: [/^\s*@INVASION_CHECK$/m],
      },
      // @INVASION_CHECK 本体（#118）：五组条件与声望结账的行号锚
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1001-1003',
        any: [/^\s*IF FLAG:81 >= 10000 && FLAG:82 == 0$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1003',
        any: [/^\s*EX_FLAG:99 \+= 10$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1003-1004',
        any: [/^\s*EX_FLAG:99 \+= 10$/m, /^\s*PRINTL 声望\+10$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1004',
        any: [/^\s*PRINTL 声望\+10$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1005-1007',
        any: [/^\s*ELSEIF FLAG:86 >= 10000 && FLAG:87 == 0$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1007',
        any: [/^\s*EX_FLAG:99 \+= 10$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1008',
        any: [/^\s*PRINTL 声望\+10$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1009-1011',
        any: [/^\s*ELSEIF FLAG:88 >= 10000 && FLAG:89 == 0$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1011',
        any: [/^\s*EX_FLAG:99 \+= 10$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1012',
        any: [/^\s*PRINTL 声望\+10$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1013-1015',
        any: [/^\s*ELSEIF FLAG:90 >= 10000 && FLAG:91 == 0$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1015',
        any: [/^\s*EX_FLAG:99 \+= 10$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1016',
        any: [/^\s*PRINTL 声望\+10$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1017-1019',
        any: [/^\s*ELSEIF EX_FLAG:101 >= 10000 && EX_FLAG:102 == 0$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1019',
        any: [/^\s*EX_FLAG:99 \+= 10$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1020',
        any: [/^\s*PRINTL 声望\+10$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1026-1067',
        any: [/^\s*@MEDAL_BONUS,ARG$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
