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
      // 地上征服后菜单渲染与派发（#468）：25-138 内的细分锚点
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '25',
        any: [/^;地上征服後$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '25-49',
        any: [
          /^\s*PRINTFORML 地上的魔界领土　侵攻度　　%BARSTR\(FLAG:81, 10000, 50\)%$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '45',
        any: [
          /^\s*IF \(EX_FLAG:2810 >= 501 &&EX_FLAG:2810 < 540\) \|\| \(EX_FLAG:2810 >= 541 && EX_FLAG:2810 < 560\)/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '73-79',
        any: [/^\s*PRINTL \[5\] - 巡视淫乱意志的神宫（已征服）$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '77',
        any: [
          /^\s*ELSEIF \(EX_FLAG:2810 >= 501 &&EX_FLAG:2810 < 540\) \|\| \(EX_FLAG:2810 >= 541 && EX_FLAG:2810 < 560\)/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '85-106',
        any: [/^\s*\$INPUT_LOOP2$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '88-89',
        any: [/^\s*IF RESULT == 999$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '90-92',
        any: [/^\s*CALL SENGEN_VIDEO$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '91',
        any: [/^\s*CALL SENGEN_VIDEO$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '97-98',
        any: [/^\s*CALL CAMPAIGN_MENU$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '97-99',
        any: [/^\s*CALL CAMPAIGN_MENU$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '98',
        any: [/^\s*CALL CAMPAIGN_MENU$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '100',
        any: [/^\s*ELSEIF RESULT == 5 && EX_FLAG:2810 <= 500$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '100-101',
        any: [/^\s*ELSEIF RESULT == 5 && EX_FLAG:2810 <= 500$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '102-105',
        any: [/^\s*ELSEIF RESULT >= 6\s+&& RESULT != 1000 && RESULT != 999$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '102',
        any: [/^\s*ELSEIF RESULT >= 6\s+&& RESULT != 1000 && RESULT != 999$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '82-83',
        any: [
          /^\s*PRINTFORML \[1000\]向城裏投放水晶球\[\{EX_FLAG:9011\}\/\{EX_FLAG:9010\}\]/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '84',
        any: [/^\s*;PRINTL \[1001\] - 擾亂工作$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '93-95',
        any: [/^\s*CALL AGENT_MENU$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '108-138',
        any: [/^\s*;人間界$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '109-111',
        any: [/^\s*AREA = 81$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '125-131',
        any: [/^\s*CALL ARCANA_FORT$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '126',
        any: [/^\s*CALL ARCANA_FORT$/m],
      },
      {
        // cite: true——本行只核对 FLAG:92 位掩码注释的原文准确性，不是
        // ARCANA_FORT.ERB 本身有移植产物（攻略主体仍整份未移植，见
        // docs/stub-registry.md 与 tools/trace-coverage.mjs 的 RULINGS 表
        // 之外——它不在已判定不实现表里，仍计入待移植）
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '20',
        any: [/^;FLAG:92 = 狂王の砦侵攻度 \(&1:東 &2:南 &4:西 &8:北\)$/m],
        cite: true,
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '76',
        any: [/^;FLAG:92 = 砦侵攻度 \(&1:東 &2:南 &4:西 &8:北\)$/m],
        cite: true,
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '136-137',
        any: [/^\s*SIF EX_FLAG:102 >= 3$/m],
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
        ref: '196-199',
        any: [/^\s*ELSEIF RESULT == 0 && MON_NUM < 600$/m],
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
        ref: '299-441',
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
      // —— #502：MEDAL_BONUS（:1026-1067）与 SENGEN_VIDEO 族
      // （:1070-1233 / :1236-1266）的内联行号引用 ——
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1070-1233',
        any: [/^[ \t]*@SENGEN_VIDEO[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1236-1266',
        any: [/^[ \t]*@SENGEN_VIDEO_BONUS, RESULT, MODE=0[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '593',
        any: [/^[ \t]*CALL MEDAL_BONUS,0[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1032-1064',
        any: [/^[ \t]*IF EXP:ARG:81 > 500[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1033',
        any: [/^[ \t]*PRINTFORMW %CALLNAME:ARG%的勋章补正　x1\.60[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1030',
        any: [/^[ \t]*LOCAL = 100[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '439',
        any: [/^[ \t]*CALL MEDAL_BONUS,YUSYA_I[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '559',
        any: [/^[ \t]*CALL MEDAL_BONUS,YUSYA_I[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1243-1244',
        any: [/^[ \t]*SIF MODE == 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1254-1257',
        any: [/^[ \t]*TIMES RESULT , 0\.80[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1246-1251',
        any: [/^[ \t]*SIF RAND:4 == 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1260-1261',
        any: [/^[ \t]*SIF MODE == 1 && RESULT <= M[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1242',
        any: [/^[ \t]*M = RESULT[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1245-1251',
        any: [/^[ \t]*TIMES RESULT , 1\.10[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1253-1257',
        any: [/^[ \t]*\$MODE_0[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1258-1265',
        any: [/^[ \t]*SIF RESULT > M && MODE == 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1258-1259',
        any: [/^[ \t]*SIF RESULT > M && MODE == 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1262-1263',
        any: [/^[ \t]*SIF RESULT > M && MODE == 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1264-1265',
        any: [/^[ \t]*SIF RESULT < M[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1096-1119',
        any: [
          /^[ \t]*PRINTFORML 通过投放拍摄的影像，激起反抗魔王的决心。[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1120-1163',
        any: [
          /^[ \t]*PRINTFORML 通过奸商代理投放拍摄的影像，或许更能激起反抗魔王的决心。[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1164-1198',
        any: [
          /^[ \t]*PRINTFORML 通过奸商代理投放拍摄的影像，增强投放的效果。[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1199-1229',
        any: [/^[ \t]*PRINTFORML 通过增加投放量延长流行时间。[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1230-1233',
        any: [/^[ \t]*ELSEIF RESULT == 999[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1143-1157',
        any: [/^[ \t]*SIF \(M \* 5000\) < MONEY[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1189-1196',
        any: [/^[ \t]*M = EX_FLAG:9012[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1218-1227',
        any: [/^[ \t]*M = EX_FLAG:9013[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1073-1095',
        any: [/^[ \t]*STOCK = EX_FLAG:9010 - EX_FLAG:9011[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1074',
        any: [/^[ \t]*STOCK = EX_FLAG:9010 - EX_FLAG:9011[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1075-1076',
        any: [
          /^[ \t]*PRINTFORML 可用于投放的水晶球\{STOCK,3\}部		已投放\{EX_FLAG:9011,3\}部[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1076',
        any: [
          /^[ \t]*PRINTFORML 可用于投放的水晶球\{STOCK,3\}部		已投放\{EX_FLAG:9011,3\}部[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1077-1081',
        any: [/^[ \t]*IF EX_FLAG:9012 && EX_FLAG:9013[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1080',
        any: [/^[ \t]*PRINTFORML  目前没有投放中的水晶球[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1082-1083',
        any: [/^[ \t]*IF \(EX_FLAG:9010 - EX_FLAG:9011\) > 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1083-1087',
        any: [/^[ \t]*IF \(EX_FLAG:9010 - EX_FLAG:9011\) > 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1089',
        any: [/^[ \t]*PRINTL 当前没有可以用于投放的水晶球[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1091-1092',
        any: [/^[ \t]*PRINTL \[999\]离开[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1092',
        any: [/^[ \t]*PRINTL \[999\]离开[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1093',
        any: [/^[ \t]*INPUT[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1094-1095',
        any: [/^[ \t]*IF STOCK == 0 && RESULT != 999[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1096-1097',
        any: [/^[ \t]*ELSEIF RESULT == 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1098',
        any: [
          /^[ \t]*PRINTFORML 通过投放拍摄的影像，激起反抗魔王的决心。[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1099-1100',
        any: [/^[ \t]*PRINTFORML 请输入要投放的数量[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1100',
        any: [/^[ \t]*PRINTFORML 请输入要投放的数量[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1101-1107',
        any: [/^[ \t]*\$INPUT_LOOP_TMP0[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1102',
        any: [/^[ \t]*INPUT[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1103-1104',
        any: [/^[ \t]*IF RESULT == 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1106',
        any: [/^[ \t]*PRINTFORML 超出数量，请重新输入[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1107',
        any: [/^[ \t]*GOTO INPUT_LOOP_TMP0[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1109',
        any: [/^[ \t]*EX_FLAG:9011 \+= RESULT[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1110',
        any: [/^[ \t]*CALL SENGEN_VIDEO_BONUS, RESULT[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1111-1114',
        any: [/^[ \t]*IF RESULT >= 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1112',
        any: [/^[ \t]*PRINTFORMW 成功投放\{RESULT\}部水晶球[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1113',
        any: [/^[ \t]*EX_FLAG:9012 \+= RESULT[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1114',
        any: [/^[ \t]*EX_FLAG:9013 \+= RESULT[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1116',
        any: [/^[ \t]*PRINTFORMW 投放，似乎失败了。[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1118',
        any: [/^[ \t]*GOTO INPUT_LOOP[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1120-1121',
        any: [/^[ \t]*ELSEIF RESULT == 2[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1122',
        any: [
          /^[ \t]*PRINTFORML 通过奸商代理投放拍摄的影像，或许更能激起反抗魔王的决心。[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1123',
        any: [
          /^[ \t]*PRINTFORML 但需要收取代理酬劳，每部5000G或是1枚勋章。[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1124-1125',
        any: [/^[ \t]*PRINTFORML 请输入要投放的数量[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1125',
        any: [/^[ \t]*PRINTFORML 请输入要投放的数量[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1126-1135',
        any: [/^[ \t]*\$INPUT_LOOP_TMP1[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1127',
        any: [/^[ \t]*INPUT[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1128-1129',
        any: [/^[ \t]*IF RESULT == 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1131',
        any: [/^[ \t]*PRINTFORML 超出可投放数量，请重新输入[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1132',
        any: [/^[ \t]*GOTO INPUT_LOOP_TMP1[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1133-1135',
        any: [
          /^[ \t]*ELSEIF RESULT > EXP:0:81 && \(RESULT \* 5000\) > MONEY[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1135',
        any: [/^[ \t]*GOTO INPUT_LOOP_TMP1[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1137',
        any: [/^[ \t]*EX_FLAG:9011 \+= RESULT[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1138',
        any: [/^[ \t]*CALL SENGEN_VIDEO_BONUS, RESULT, 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1140',
        any: [/^[ \t]*PRINTFORMW 成功投放\{RESULT\}部水晶球[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1141',
        any: [/^[ \t]*EX_FLAG:9012 \+= RESULT[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1142',
        any: [/^[ \t]*EX_FLAG:9013 \+= RESULT[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1143-1144',
        any: [/^[ \t]*SIF \(M \* 5000\) < MONEY[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1145-1146',
        any: [/^[ \t]*SIF M < EXP:0:81[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1147-1158',
        any: [/^[ \t]*\$INPUT_LOOP_TMP2[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1148',
        any: [/^[ \t]*INPUT[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1150',
        any: [/^[ \t]*PRINTFORML 犒赏了奸商\{M \* 5000\}G[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1151',
        any: [/^[ \t]*MONEY -= \(M \* 5000\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1152',
        any: [/^[ \t]*EX_FLAG:4444 -= \(M \* 5000\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1154',
        any: [/^[ \t]*PRINTFORML 犒赏了奸商\{M\}枚勋章[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1155',
        any: [/^[ \t]*EXP:0:81 -= M[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1156-1157',
        any: [/^[ \t]*GOTO INPUT_LOOP_TMP2[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1160',
        any: [/^[ \t]*PRINTFORMW 投放，似乎失败了。[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1162',
        any: [/^[ \t]*GOTO INPUT_LOOP[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1164-1165',
        any: [/^[ \t]*ELSEIF RESULT == 3[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1166',
        any: [
          /^[ \t]*PRINTFORML 通过奸商代理投放拍摄的影像，增强投放的效果。[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1167',
        any: [/^[ \t]*PRINTFORML 将收取50000G或是5枚勋章。[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1168-1169',
        any: [/^[ \t]*PRINTFORML 请选择要支付方式[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1169',
        any: [/^[ \t]*PRINTFORML 请选择要支付方式[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1170-1171',
        any: [/^[ \t]*PRINTL \[1\]支付金币[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1172-1173',
        any: [/^[ \t]*SIF EXP:0:81 > 5[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1174',
        any: [/^[ \t]*PRINTL \[999\]离开[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1175-1188',
        any: [/^[ \t]*\$INPUT_LOOP_TMP3[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1176',
        any: [/^[ \t]*INPUT[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1178',
        any: [/^[ \t]*PRINTFORML 犒赏了奸商50000G[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1179',
        any: [/^[ \t]*MONEY -= 50000[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1180',
        any: [/^[ \t]*EX_FLAG:4444 -= 50000[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1182',
        any: [/^[ \t]*PRINTFORML 犒赏了奸商5枚勋章[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1183',
        any: [/^[ \t]*EXP:0:81 -= 5[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1184-1185',
        any: [/^[ \t]*ELSEIF RESULT == 999[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1186-1187',
        any: [/^[ \t]*GOTO INPUT_LOOP_TMP3[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1189',
        any: [/^[ \t]*M = EX_FLAG:9012[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1190',
        any: [/^[ \t]*TIMES EX_FLAG:9012, 1\.20[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1191-1192',
        any: [/^[ \t]*TIMES EX_FLAG:9012, 1\.60[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1193-1194',
        any: [/^[ \t]*TIMES EX_FLAG:9012, 1\.20[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1195-1196',
        any: [/^[ \t]*SIF EX_FLAG:9012 > \(M \* 2\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1197',
        any: [
          /^[ \t]*PRINTFORML 因为剪辑出了更多的版本，投放效果增强了[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1198',
        any: [/^[ \t]*GOTO INPUT_LOOP[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1199-1200',
        any: [/^[ \t]*ELSEIF RESULT == 4[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1201',
        any: [/^[ \t]*PRINTFORML 通过增加投放量延长流行时间。[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1202',
        any: [/^[ \t]*PRINTFORML 将收取50000G。[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1203-1204',
        any: [/^[ \t]*SIF MONEY > 50000[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1204-1205',
        any: [/^[ \t]*PRINTL \[1\]支付[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1206',
        any: [/^[ \t]*PRINTL \[999\]算了[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1207-1217',
        any: [/^[ \t]*\$INPUT_LOOP_TMP4[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1208',
        any: [/^[ \t]*INPUT[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1210',
        any: [/^[ \t]*PRINTFORML 支付了50000G[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1211',
        any: [/^[ \t]*MONEY -= 50000[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1212',
        any: [/^[ \t]*EX_FLAG:4444 -= 50000[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1213-1214',
        any: [/^[ \t]*ELSEIF RESULT == 999[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1215-1216',
        any: [/^[ \t]*GOTO INPUT_LOOP_TMP4[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1218',
        any: [/^[ \t]*M = EX_FLAG:9013[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1219',
        any: [/^[ \t]*TIMES EX_FLAG:9013, 1\.20[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1220-1221',
        any: [/^[ \t]*TIMES EX_FLAG:9013, 1\.60[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1222-1223',
        any: [/^[ \t]*TIMES EX_FLAG:9013, 1\.20[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1224-1225',
        any: [/^[ \t]*SIF EX_FLAG:9013 > \(M \+ 5\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1226-1227',
        any: [/^[ \t]*SIF \(EX_FLAG:9013 - M\) < 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1228',
        any: [/^[ \t]*PRINTFORML 流行时间延长了[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1229',
        any: [/^[ \t]*GOTO INPUT_LOOP[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '83',
        any: [
          /^[ \t]*PRINTFORML \[1000\]向城裏投放水晶球\[\{EX_FLAG:9011\}\/\{EX_FLAG:9010\}\][ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '6',
        any: [/^[ \t]*@INVASION[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '7-21',
        any: [/^[ \t]*#DIM AREA, 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '11',
        any: [/^[ \t]*#DIM YUSYA_I[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '19',
        any: [/^[ \t]*#DIM NUM_PAGE = 26[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '143',
        any: [/^[ \t]*\$START1[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '145-151',
        any: [/^[ \t]*MON_NUM = 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '173',
        any: [/^[ \t]*IF MON_NUM < 600[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '179',
        any: [/^[ \t]*IF MON_NUM < 600[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '210-263',
        any: [/^[ \t]*IF INV_TYPE == 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '211-232',
        any: [/^[ \t]*REPEAT 90[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '214-215',
        any: [/^[ \t]*SIF ITEM:MON_ID < 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '217',
        any: [/^[ \t]*CALL MONSTER_DATA, MON_ID, 0, 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '219-221',
        any: [/^[ \t]*MON_ATK \+= E:2[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '223-224',
        any: [/^[ \t]*SIF E:5 != 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '229',
        any: [/^[ \t]*ITEM:MON_ID \/= 2[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '231',
        any: [
          /^[ \t]*SINKOU \+= MON_ATK \* \(\(ITEM:MON_ID \/ 9\) \+ 1\)[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '234',
        any: [/^[ \t]*SINKOU \/= 20[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '239',
        any: [/^[ \t]*PRINTW 侵攻失败[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '263',
        any: [/^[ \t]*PRINTFORMW 怪物的战斗力　\{SINKOU\}点[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '270-293',
        any: [/^[ \t]*IF EX_FLAG:99 <= 20 && EX_FLAG:99 >= 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '299-441',
        any: [/^[ \t]*ELSEIF INV_TYPE == 2[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '325',
        any: [/^[ \t]*RESTART[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '377',
        any: [/^[ \t]*RESTART[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '442-563',
        any: [/^[ \t]*ELSEIF INV_TYPE == 3[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '444',
        any: [/^[ \t]*;選択基準は迎撃に準じる[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '445-449',
        any: [/^[ \t]*LIST_POS = 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '450-460',
        any: [/^[ \t]*REPEAT CHARANUM[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '452',
        any: [/^[ \t]*SIF BASE:COUNT:0 < 1 \|\|[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '452-456',
        any: [/^[ \t]*SIF BASE:COUNT:0 < 1 \|\|[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '452-458',
        any: [/^[ \t]*SIF BASE:COUNT:0 < 1 \|\|[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '453',
        any: [/^[ \t]*COUNT == 0 \|\|[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '454',
        any: [/^[ \t]*CFLAG:COUNT:1 != 0 \|\|[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '455',
        any: [
          /^[ \t]*\(CFLAG:COUNT:0 == 0 && TALENT:COUNT:254 == 0\) \|\|[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '456',
        any: [
          /^[ \t]*\(TALENT:COUNT:153 == 1 && GETBIT\(FLAG:5,10\) == 0\)[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '459',
        any: [/^[ \t]*YUSYA_I\+\+[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '461-466',
        any: [/^[ \t]*IF \(YUSYA_I % NUM_PAGE\) > 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '467-470',
        any: [/^[ \t]*IF YUSYA_I == 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '471',
        any: [/^[ \t]*\$INPUT_LOOP_TMPO3[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '474-484',
        any: [/^[ \t]*IF NO_PAGE == 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '486-488',
        any: [/^[ \t]*CUSTOMDRAWLINE =[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '489-505',
        any: [/^[ \t]*L_LCOUNT = LINECOUNT[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '490',
        any: [/^[ \t]*T_LCOUNT = NUM_PAGE \* NO_PAGE \+ 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '491',
        any: [/^[ \t]*FOR COUNT, LIST_POS, CHARANUM[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '491-505',
        any: [/^[ \t]*FOR COUNT, LIST_POS, CHARANUM[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '493-500',
        any: [/^[ \t]*SIF		BASE:COUNT:0 < 1 \|\|[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '498-499',
        any: [/^[ \t]*T_LCOUNT >= \(NO_PAGE \+ 1\)\*NUM_PAGE \|\|[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '502',
        any: [/^[ \t]*CALL LIFE_LIST_ITEM\(COUNT\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '503',
        any: [/^[ \t]*T_LCOUNT\+\+[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '504',
        any: [/^[ \t]*LIST_POS = COUNT[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '506-511',
        any: [/^[ \t]*L_LCOUNT = LINECOUNT - L_LCOUNT[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '512-515',
        any: [/^[ \t]*PRINTLC \[1000\] - 上一页[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '517',
        any: [/^[ \t]*INPUT[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '519-520',
        any: [/^[ \t]*IF RESULT == 999[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '521-526',
        any: [/^[ \t]*ELSEIF RESULT == 1000		;上一页[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '527-532',
        any: [/^[ \t]*ELSEIF RESULT == 1001		;下一页[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '533-535',
        any: [/^[ \t]*ELSEIF RESULT < 0 \|\| RESULT >= CHARANUM[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '536-545',
        any: [/^[ \t]*\{[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '547',
        any: [/^[ \t]*YUSYA_I = RESULT[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '549-551',
        any: [/^[ \t]*SINKOU = BASE:0:1 \/ 25[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '551',
        any: [/^[ \t]*PRINTFORMW 魔王的力量　\{SINKOU\}点[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '553',
        any: [/^[ \t]*TMP2_I = CFLAG:YUSYA_I:9 \+ 100[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '553-557',
        any: [/^[ \t]*TMP2_I = CFLAG:YUSYA_I:9 \+ 100[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '554',
        any: [
          /^[ \t]*PRINTFORMW 勇者补正　x\{TMP2_I\/100\}\.%TOSTR\(TMP2_I%100,"00"\)%[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '556-557',
        any: [/^[ \t]*SINKOU \*= TMP2_I[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '559-561',
        any: [/^[ \t]*CALL MEDAL_BONUS,YUSYA_I[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '610-611',
        any: [/^[ \t]*;略奪は侵攻力が激減[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '613-614',
        any: [/^[ \t]*FLAG:AREA \+= SINKOU[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '620-692',
        any: [/^[ \t]*IF INV_TYPE == 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '620-975',
        any: [/^[ \t]*IF INV_TYPE == 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '624-628',
        any: [/^[ \t]*IF AREA == 81 && FLAG:SINDO[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '626',
        any: [/^[ \t]*PRINTFORMW 强制征收了\{SINKOU \* 10\}点！[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '647-651',
        any: [/^[ \t]*PRINTFORMW 得到了\{SINKOU \* 10\}点的战利品！[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '648',
        any: [/^[ \t]*PRINTFORMW 得到了\{SINKOU \* 10\}点的战利品！[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '653-667',
        any: [/^[ \t]*SIF AREA == 81[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '667',
        any: [/^[ \t]*WAIT[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '669-671',
        any: [/^[ \t]*;人間界[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '686-692',
        any: [/^[ \t]*IF RAND:100 < 5[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '687',
        any: [/^[ \t]*PRINTFORMW 好像抓到了负隅顽抗的勇者…………[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '691',
        any: [
          /^[ \t]*PRINTFORMW 犒赏士兵，捕获到的勇者被赏赐给部下了。[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '891-975',
        any: [/^[ \t]*ELSEIF INV_TYPE == 3[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '892-908',
        any: [/^[ \t]*PRINTFORM %SAVESTR:YUSYA_I%得到了魔王的力量！[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '909',
        any: [/^[ \t]*CALL KARMA, YUSYA_I, -5[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '912-918',
        any: [/^[ \t]*IF AREA == 81 && FLAG:SINDO[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '912-957',
        any: [/^[ \t]*IF AREA == 81 && FLAG:SINDO[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '914',
        any: [/^[ \t]*PRINTFORMW 强行征收到了\{SINKOU\}点！[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '915',
        any: [/^[ \t]*MONEY \+= SINKOU[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '916',
        any: [/^[ \t]*EX_FLAG:4444 \+= SINKOU[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '917',
        any: [/^[ \t]*EXP:YUSYA_I:80 \+= SINKOU \/ 20[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '918',
        any: [
          /^[ \t]*PRINTFORMW %SAVESTR:YUSYA_I%获得了\{SINKOU\/20\}点经验值！[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '951-956',
        any: [/^[ \t]*PRINTFORMW 获得了\{SINKOU\}点的战利品！[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '952',
        any: [/^[ \t]*PRINTFORMW 获得了\{SINKOU\}点的战利品！[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '953',
        any: [/^[ \t]*MONEY \+= SINKOU[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '954',
        any: [/^[ \t]*EX_FLAG:4444 \+= SINKOU[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '955',
        any: [/^[ \t]*EXP:YUSYA_I:80 \+= SINKOU \/ 20[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '959-973',
        any: [/^[ \t]*SIF AREA == 81[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '973',
        any: [/^[ \t]*WAIT[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '224',
        any: [/^[ \t]*LOCAL = RAND:10[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '226-227',
        any: [/^[ \t]*IF LOCAL == 9[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '226-230',
        any: [/^[ \t]*IF LOCAL == 9[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '228-229',
        any: [/^[ \t]*ELSEIF LOCAL == 8[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '232',
        any: [
          /^[ \t]*JUMP INVASION_EVENT_SEIEI, AREA, SINDO, INV_TYPE, SINKOU, YUSYA_I[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '250-271',
        any: [/^[ \t]*SIF FLAG:SINDO != 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '257',
        any: [/^[ \t]*IF FLAG:AREA == 0 && FLAG:SINDO == 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '261',
        any: [
          /^[ \t]*ELSEIF FLAG:AREA >= 1 && FLAG:AREA < 5000 && FLAG:SINDO == 0 && INV_TYPE != 1[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '261-265',
        any: [
          /^[ \t]*ELSEIF FLAG:AREA >= 1 && FLAG:AREA < 5000 && FLAG:SINDO == 0 && INV_TYPE != 1[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '266',
        any: [
          /^[ \t]*ELSEIF FLAG:AREA >= 1 && FLAG:AREA < 10000 && FLAG:SINDO == 0 && INV_TYPE != 1[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '266-270',
        any: [
          /^[ \t]*ELSEIF FLAG:AREA >= 1 && FLAG:AREA < 10000 && FLAG:SINDO == 0 && INV_TYPE != 1[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '530-814',
        any: [
          /^[ \t]*@INVASION_EVENT_FORT, AREA, SINDO, INV_TYPE, SINKOU, YUSYA_I[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '815-1162',
        any: [
          /^[ \t]*@INVASION_EVENT_CHALLENGE, AREA, SINDO, INV_TYPE, SINKOU, YUSYA_I[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '530-814',
        any: [/^[ \t]*IF AREA == 81[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '815-1162',
        any: [/^[ \t]*IF AREA == 81[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1041',
        any: [/^[ \t]*EX_FLAG:95 = LOCAL:20[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '209-563',
        any: [/^[ \t]*IF INV_TYPE == 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '601',
        any: [
          /^[ \t]*CALL INVASION_EVENT, AREA, SINDO, INV_TYPE, SINKOU, YUSYA_I[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '243',
        any: [/^[ \t]*PRINTW 侵攻战斗力减少[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '277',
        any: [/^[ \t]*PRINTW 侵攻战斗力减少[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '758-888',
        any: [/^\s*PRINTFORM %SAVESTR:YUSYA_I%带着怪物到达了\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '240-459',
        any: [
          /^\s*@INVASION_EVENT_SEIEI, AREA, SINDO, INV_TYPE, SINKOU, YUSYA_I\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '462-529',
        any: [/^\s*@_INV_DEATH_CHECK, ARG:0, ARG:1\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '893-910',
        any: [
          /^\s*DATA 『快去叫亲爱的魔王大人出来，人家要和他比试比试呢』\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '936-951',
        any: [/^\s*DATA 『哎呀~是亲爱魔王大人的手下呢』\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '959-964',
        any: [
          /^\s*DATA 『今天运气真是不错哦~可悲的魔族，你们的脑袋是我的了！』\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1015-1028',
        any: [
          /^\s*DATAFORM %LOCALS:2%陷入了泥沼中，动弹不得，被魔王抓住了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '307-309',
        any: [/^\s*;勇者基礎レベル補正\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '391',
        any: [/^\s*CALL _INV_DEATH_CHECK\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '394-395',
        any: [
          /^\s*PRINTFORMW %SAVESTR:YUSYA_I%获得了\{SINKOU\/5\}点经验值！\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '791-807',
        any: [/^\s*ELSEIF L_CHOICE == 3 && INV_TYPE == 3\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '738-739',
        any: [/^\s*ELSEIF L_CHOICE == 2 && INV_TYPE == 3\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '793-794',
        any: [
          /^\s*PRINTFORML %CALLNAME:YUSYA_I%绕开%LOCALS:2%向%LOCALS:0%进发，因为路途遥远地形复杂耗费了一些体力。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '546',
        any: [/^\s*LOCAL:3 = TALENT:YUSYA_I:种族 == 0\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '361',
        any: [
          /^\s*IF CFLAG:SEIEI_I:12 < \(CFLAG:YUSYA_I:11 \* \(SINKOU\/2048\+1\)\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '366',
        any: [
          /^\s*PRINTFORML %SAVESTR:YUSYA_I%率领魔王军的攻击使%CALLNAME:SEIEI_I%受到了\{\(CFLAG:YUSYA_I:11 \*\(SINKOU\/1024\+1\) - TMP2_I\)\*4\}点伤害！\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '213',
        any: [/^\s*; 返回值：0 - 继续侵攻，1 - 侵攻结束\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '466-479',
        any: [/^\s*;勇者死亡判定\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '468',
        any: [
          /^\s*PRINTFORML %CALLNAME:\(ARG:1\)%被%SAVESTR:\(ARG:0\)%率领的魔王军消灭了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '468-469',
        any: [
          /^\s*PRINTFORML %CALLNAME:\(ARG:1\)%被%SAVESTR:\(ARG:0\)%率领的魔王军消灭了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '470-471',
        any: [/^\s*ELSEIF BASE:\(ARG:1\):0 <= 100\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '472',
        any: [
          /^\s*PRINTFORML %CALLNAME:\(ARG:1\)%被%SAVESTR:\(ARG:0\)%率领的魔王军击溃了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '472-473',
        any: [
          /^\s*PRINTFORML %CALLNAME:\(ARG:1\)%被%SAVESTR:\(ARG:0\)%率领的魔王军击溃了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '474-475',
        any: [/^\s*ELSEIF BASE:\(ARG:1\):1 <= 0\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '476',
        any: [
          /^\s*PRINTFORML 被魔王军包围的%CALLNAME:\(ARG:1\)%失去战斗的意志投降了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '476-477',
        any: [
          /^\s*PRINTFORML 被魔王军包围的%CALLNAME:\(ARG:1\)%失去战斗的意志投降了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '476-478',
        any: [
          /^\s*PRINTFORML 被魔王军包围的%CALLNAME:\(ARG:1\)%失去战斗的意志投降了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '482-521',
        any: [
          /^\s*IF BASE:\(ARG:0\):1 <= 1000 && TALENT:\(ARG:0\):280 && \(FLAG:5 & 128\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '482-487',
        any: [
          /^\s*IF BASE:\(ARG:0\):1 <= 1000 && TALENT:\(ARG:0\):280 && \(FLAG:5 & 128\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '483',
        any: [
          /^\s*PRINTFORML 被狂王俘虏过的%SAVESTR:\(ARG:0\)%丧失了战意，抛下武器投降了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '484',
        any: [
          /^\s*PRINTFORMW %CALLNAME:\(ARG:1\)%俘获了%SAVESTR:\(ARG:0\)%………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '484-485',
        any: [
          /^\s*PRINTFORMW %CALLNAME:\(ARG:1\)%俘获了%SAVESTR:\(ARG:0\)%………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '487-488',
        any: [/^\s*ELSEIF BASE:\(ARG:0\):0 <= 0\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '488-509',
        any: [/^\s*ELSEIF BASE:\(ARG:0\):0 <= 0\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '510-520',
        any: [/^\s*ELSEIF BASE:\(ARG:0\):1 <= 0\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '489',
        any: [/^\s*PRINTFORM 魔王军被%CALLNAME:\(ARG:1\)%消灭了，\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '494',
        any: [/^\s*PRINTFORMW %SAVESTR:\(ARG:0\)%孤身逃了回来…………\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '500',
        any: [/^\s*PRINTFORM 魔王军被%CALLNAME:\(ARG:1\)%击溃了，\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '505',
        any: [/^\s*PRINTFORMW %SAVESTR:\(ARG:0\)%从乱军中逃了回来…………\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '511',
        any: [
          /^\s*PRINTFORM 被%CALLNAME:\(ARG:1\)%包围的魔王军失去战斗的意志投降了，\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '513',
        any: [
          /^\s*PRINTFORMW %SAVESTR:\(ARG:0\)%被投降的部下献给了%CALLNAME:\(ARG:1\)%…………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '516',
        any: [/^\s*PRINTFORMW %SAVESTR:\(ARG:0\)%没脸见人地逃了回来…………\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '524-528',
        any: [/^\s*;侵略中途事件（要塞）\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '492-494',
        any: [/^\s*PRINTFORMW %SAVESTR:\(ARG:0\)%孤身逃了回来…………\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '494-495',
        any: [/^\s*PRINTFORMW %SAVESTR:\(ARG:0\)%孤身逃了回来…………\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '505-506',
        any: [/^\s*PRINTFORMW %SAVESTR:\(ARG:0\)%从乱军中逃了回来…………\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '513-514',
        any: [
          /^\s*PRINTFORMW %SAVESTR:\(ARG:0\)%被投降的部下献给了%CALLNAME:\(ARG:1\)%…………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '497-499',
        any: [/^\s*ELSEIF BASE:\(ARG:0\):0 <= 300\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '508-510',
        any: [/^\s*ELSEIF BASE:\(ARG:0\):1 <= 0\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '516-519',
        any: [/^\s*PRINTFORMW %SAVESTR:\(ARG:0\)%没脸见人地逃了回来…………\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '509-510',
        any: [/^\s*ELSEIF BASE:\(ARG:0\):1 <= 0\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '516-520',
        any: [/^\s*PRINTFORMW %SAVESTR:\(ARG:0\)%没脸见人地逃了回来…………\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '298',
        any: [/^\s*ADDCHARA 18\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '303',
        any: [/^\s*ADDCHARA 19\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '317',
        any: [/^\s*REPEAT 21\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '318',
        any: [/^\s*IF TIME_I > 19\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '362',
        any: [/^\s*IF RAND:5 == 0\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '412',
        any: [/^\s*IF CFLAG:YUSYA_I:12 < CFLAG:SEIEI_I:11\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '282-283',
        any: [/^\s*IF LOCAL > 2000\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '284-286',
        any: [/^\s*PRINTFORMW 精锐部队出现了！\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '286',
        any: [/^\s*PRINTFORMW 精锐部队出现了！\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '293-294',
        any: [
          /^\s*PRINTFORMW 你的勇者%SAVESTR:YUSYA_I%率领着魔王军和精锐部队展开了战斗！\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '295',
        any: [/^\s*TIME_I = 0\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '296-306',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '300',
        any: [/^\s*SEIEI_I = GETCHARA\(18\)\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '304-305',
        any: [/^\s*SEIEI_I = GETCHARA\(19\)\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '305',
        any: [/^\s*SEIEI_I = GETCHARA\(19\)\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '307-313',
        any: [/^\s*;勇者基礎レベル補正\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '307-308',
        any: [/^\s*;勇者基礎レベル補正\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '307-310',
        any: [/^\s*;勇者基礎レベル補正\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '311-314',
        any: [/^\s*MAXBASE:SEIEI_I:1 \+= \(10 \* FLAG:60\)\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '312-314',
        any: [/^\s*BASE:SEIEI_I:0 \+= \(10 \* FLAG:60\)\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '313',
        any: [/^\s*BASE:SEIEI_I:1 \+= \(10 \* FLAG:60\)\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '315-316',
        any: [/^\s*BASE:YUSYA_I:0 \+= SINKOU\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '318-333',
        any: [/^\s*IF TIME_I > 19\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '318-319',
        any: [/^\s*IF TIME_I > 19\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '320-322',
        any: [/^\s*PRINTFORML 没有时间了，战线已经不可能再维持下去了！\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '321-322',
        any: [/^\s*PRINTFORML 没有时间了，战线已经不可能再维持下去了！\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '322',
        any: [/^\s*PRINTFORML 没有时间了，战线已经不可能再维持下去了！\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '323',
        any: [
          /^\s*PRINTFORML %SAVESTR:YUSYA_I%的部队开始了后退，怪物们在后退中溃散着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '324',
        any: [/^\s*PRINTFORML 最终活着回来的怪物不到十只………\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '326',
        any: [/^\s*EXP:YUSYA_I:80 \+= SINKOU \/ 10\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '327',
        any: [
          /^\s*PRINTFORMW %SAVESTR:YUSYA_I%获得了\{SINKOU\/10\}点经验值！\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '327-331',
        any: [
          /^\s*PRINTFORMW %SAVESTR:YUSYA_I%获得了\{SINKOU\/10\}点经验值！\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '332-336',
        any: [/^\s*;魔王軍\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '335-357',
        any: [/^\s*;魔王軍\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '337',
        any: [/^\s*PRINTFORML 魔王军 %SAVESTR:YUSYA_I%\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '338-340',
        any: [/^\s*BAR BASE:YUSYA_I:0, MAXBASE:YUSYA_I:0, 50\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '341-343',
        any: [/^\s*BAR BASE:YUSYA_I:1, MAXBASE:YUSYA_I:1, 50\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '344',
        any: [
          /^\s*PRINTFORML 攻击\{CFLAG:YUSYA_I:11 \* \(SINKOU\/1024\+1\)\} 防御\{CFLAG:YUSYA_I:12\} 怪物的合计战力\{SINKOU\}点\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '346',
        any: [/^\s*PRINTW VS\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '349',
        any: [/^\s*PRINTFORML %CALLNAME:SEIEI_I%\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '350-352',
        any: [/^\s*BAR BASE:SEIEI_I:0, MAXBASE:SEIEI_I:0, 50\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '353-355',
        any: [/^\s*BAR BASE:SEIEI_I:1, MAXBASE:SEIEI_I:1, 50\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '356',
        any: [
          /^\s*PRINTFORML 攻击\{CFLAG:SEIEI_I:11\} 防御\{CFLAG:SEIEI_I:12\}\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '356-357',
        any: [
          /^\s*PRINTFORML 攻击\{CFLAG:SEIEI_I:11\} 防御\{CFLAG:SEIEI_I:12\}\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '360-389',
        any: [/^\s*;魔王軍の先制攻撃\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '362-363',
        any: [/^\s*IF RAND:5 == 0\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '375-377',
        any: [
          /^\s*PRINTFORML %SAVESTR:YUSYA_I%率领魔王军的攻击使%CALLNAME:SEIEI_I%受到了\{\(CFLAG:YUSYA_I:11 \*\(SINKOU\/1024\+1\) - TMP2_I\)\*2\}点伤害！\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '364-365',
        any: [/^\s*PRINTFORML 迅猛的一击！\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '376-377',
        any: [
          /^\s*PRINTFORML %SAVESTR:YUSYA_I%率领魔王军的攻击使%CALLNAME:SEIEI_I%受到了\{\(CFLAG:YUSYA_I:11 \*\(SINKOU\/1024\+1\) - TMP2_I\)\*2\}点伤害！\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '365',
        any: [/^\s*PRINTFORML 迅猛的一击！\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '366-368',
        any: [
          /^\s*PRINTFORML %SAVESTR:YUSYA_I%率领魔王军的攻击使%CALLNAME:SEIEI_I%受到了\{\(CFLAG:YUSYA_I:11 \*\(SINKOU\/1024\+1\) - TMP2_I\)\*4\}点伤害！\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '377-379',
        any: [
          /^\s*PRINTFORML %SAVESTR:YUSYA_I%率领魔王军的攻击使%CALLNAME:SEIEI_I%受到了\{\(CFLAG:YUSYA_I:11 \*\(SINKOU\/1024\+1\) - TMP2_I\)\*2\}点伤害！\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '369-371',
        any: [
          /^\s*BASE:SEIEI_I:0 -= \(CFLAG:YUSYA_I:11\*\(SINKOU\/1024\+1\) - TMP2_I\)\*4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '380-382',
        any: [
          /^\s*BASE:SEIEI_I:0 -= \(CFLAG:YUSYA_I:11\*\(SINKOU\/1024\+1\) - TMP2_I\)\*2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '371',
        any: [
          /^\s*BASE:SEIEI_I:0 -= \(CFLAG:YUSYA_I:11\*\(SINKOU\/1024\+1\) - TMP2_I\)\*4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '382',
        any: [
          /^\s*BASE:SEIEI_I:0 -= \(CFLAG:YUSYA_I:11\*\(SINKOU\/1024\+1\) - TMP2_I\)\*2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '372',
        any: [
          /^\s*BASE:SEIEI_I:1 -= \(CFLAG:YUSYA_I:11\*\(SINKOU\/1024\+1\) - TMP2_I\)\*4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '383',
        any: [
          /^\s*BASE:SEIEI_I:1 -= \(CFLAG:YUSYA_I:11\*\(SINKOU\/1024\+1\) - TMP2_I\)\*2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '372-373',
        any: [
          /^\s*BASE:SEIEI_I:1 -= \(CFLAG:YUSYA_I:11\*\(SINKOU\/1024\+1\) - TMP2_I\)\*4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '383-384',
        any: [
          /^\s*BASE:SEIEI_I:1 -= \(CFLAG:YUSYA_I:11\*\(SINKOU\/1024\+1\) - TMP2_I\)\*2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '387',
        any: [
          /^\s*PRINTFORML %CALLNAME:SEIEI_I%承受着%SAVESTR:YUSYA_I%的攻击。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '387-388',
        any: [
          /^\s*PRINTFORML %CALLNAME:SEIEI_I%承受着%SAVESTR:YUSYA_I%的攻击。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '391-408',
        any: [/^\s*CALL _INV_DEATH_CHECK\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '394-401',
        any: [
          /^\s*PRINTFORMW %SAVESTR:YUSYA_I%获得了\{SINKOU\/5\}点经验值！\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '395',
        any: [
          /^\s*PRINTFORMW %SAVESTR:YUSYA_I%获得了\{SINKOU\/5\}点经验值！\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '395-400',
        any: [
          /^\s*PRINTFORMW %SAVESTR:YUSYA_I%获得了\{SINKOU\/5\}点经验值！\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '395-401',
        any: [
          /^\s*PRINTFORMW %SAVESTR:YUSYA_I%获得了\{SINKOU\/5\}点经验值！\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '403-410',
        any: [/^\s*;精鋭部隊の攻撃\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '407-410',
        any: [/^\s*;精鋭部隊の攻撃\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '410-428',
        any: [/^\s*;精鋭部隊の攻撃\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '413',
        any: [/^\s*CALL MONSTER_DATA, MON_ID, 0, YUSYA_I\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '414-416',
        any: [
          /^\s*PRINTFORML %CALLNAME:SEIEI_I%发起进攻使%SAVESTR:YUSYA_I%率领的魔王军受到了\{\(CFLAG:SEIEI_I:11 - TMP2_I\)\*5\}点伤害！\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '416',
        any: [
          /^\s*PRINTFORML %CALLNAME:SEIEI_I%发起进攻使%SAVESTR:YUSYA_I%率领的魔王军受到了\{\(CFLAG:SEIEI_I:11 - TMP2_I\)\*5\}点伤害！\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '417-418',
        any: [/^\s*SIF TALENT:YUSYA_I:251 == 0\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '419-424',
        any: [/^\s*SIF CFLAG:YUSYA_I:11 < 1\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '421',
        any: [/^\s*BASE:YUSYA_I:0 -= \(CFLAG:SEIEI_I:11 - TMP2_I\)\*5\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '422',
        any: [/^\s*BASE:YUSYA_I:1 -= \(CFLAG:SEIEI_I:11 - TMP2_I\)\*5\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '422-424',
        any: [/^\s*BASE:YUSYA_I:1 -= \(CFLAG:SEIEI_I:11 - TMP2_I\)\*5\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '425-426',
        any: [
          /^\s*PRINTFORML %SAVESTR:YUSYA_I%率领的魔王军承受着%CALLNAME:SEIEI_I%的攻击。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '425-427',
        any: [
          /^\s*PRINTFORML %SAVESTR:YUSYA_I%率领的魔王军承受着%CALLNAME:SEIEI_I%的攻击。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '430-443',
        any: [/^\s*CALL _INV_DEATH_CHECK, YUSYA_I, SEIEI_I\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '430-435',
        any: [/^\s*CALL _INV_DEATH_CHECK, YUSYA_I, SEIEI_I\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '430-436',
        any: [/^\s*CALL _INV_DEATH_CHECK, YUSYA_I, SEIEI_I\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '438-444',
        any: [/^\s*TIME_I \+= 1\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '279',
        any: [
          /^\s*IF FLAG:AREA >= 5000 && FLAG:SINDO == 0 && INV_TYPE == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '250',
        any: [/^\s*SIF FLAG:SINDO != 0\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '280-281',
        any: [/^\s*LOCAL = FLAG:AREA\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '283-451',
        any: [/^\s*PRINTFORMW 精锐部队出现了！\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '446-452',
        any: [/^\s*ELSEIF INV_TYPE == 2\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '452-457',
        any: [/^\s*ELSEIF INV_TYPE == 2\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '542-567',
        any: [/^\s*LOCALS:1 = 人类军队\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '570-606',
        any: [/^\s*PRINTFORML \[1\] 全军强攻\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '571-574',
        any: [/^\s*PRINTFORML \[1\] 全军强攻\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '572-574',
        any: [/^\s*PRINTFORML \[1\] 全军强攻\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '573-574',
        any: [/^\s*PRINTFORML \[1\] 全军强攻\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '574',
        any: [/^\s*PRINTFORML \[1\] 全军强攻\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '575',
        any: [/^\s*PRINTFORML \[2\] 亲自潜入\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '576',
        any: [/^\s*PRINTFORML \[3\] 绕路\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '578-587',
        any: [
          /^\s*PRINTFORML %CALLNAME:YUSYA_I%向%LOCALS:0%进发着，却在必经之路上遇到了%LOCALS:1%建起的一座%LOCALS:2%。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '587',
        any: [
          /^\s*PRINTFORML %CALLNAME:YUSYA_I%向%LOCALS:0%进发着，却在必经之路上遇到了%LOCALS:1%建起的一座%LOCALS:2%。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '588-589',
        any: [/^\s*PRINTFORML \[1\] 偷偷潜入\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '589',
        any: [/^\s*PRINTFORML \[1\] 偷偷潜入\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '590',
        any: [/^\s*PRINTFORML \[2\] 绕路\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '595',
        any: [/^\s*L_CHOICE = RESULT \+ 1\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '592-599',
        any: [/^\s*L_CHOICE = RESULT \+ 1\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '602-603',
        any: [
          /^\s*PRINTFORMW %LOCALS:2%看起来防御坚固防备森严，于是魔王军发起了强攻。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '603',
        any: [
          /^\s*PRINTFORMW %LOCALS:2%看起来防御坚固防备森严，于是魔王军发起了强攻。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '605',
        any: [/^\s*L_CHOICE = 1\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '608-609',
        any: [/^\s*;\[1\] 全军强攻\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '610-670',
        any: [/^\s*;强攻成功（40%）\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '611-612',
        any: [/^\s*;强攻成功（40%）\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '614',
        any: [
          /^\s*PRINTFORML 魔王军向着%LOCALS:2%发起了最为猛烈的进攻，在付出较小的代价后攻破了%LOCALS:2%的一角。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '615',
        any: [
          /^\s*PRINTFORML %LOCALS:2%中的%LOCALS:1%仓皇外逃，被%LOCALS:2%外的魔王军尽数剿灭、\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '615-616',
        any: [
          /^\s*PRINTFORML %LOCALS:2%中的%LOCALS:1%仓皇外逃，被%LOCALS:2%外的魔王军尽数剿灭、\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '615-617',
        any: [
          /^\s*PRINTFORML %LOCALS:2%中的%LOCALS:1%仓皇外逃，被%LOCALS:2%外的魔王军尽数剿灭、\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '619-624',
        any: [/^\s*PRINTFORML 怪物数量减少了10\\%\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '624',
        any: [/^\s*PRINTFORML 怪物数量减少了10\\%\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '624-625',
        any: [/^\s*PRINTFORML 怪物数量减少了10\\%\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '627-628',
        any: [/^\s*;强攻惨胜（40%）\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '630-631',
        any: [
          /^\s*PRINTFORML %LOCALS:2%的防御极其坚固，%LOCALS:1%凭借着掩体不断地攻击，让魔王军损失惨重。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '631',
        any: [
          /^\s*PRINTFORML %LOCALS:2%的防御极其坚固，%LOCALS:1%凭借着掩体不断地攻击，让魔王军损失惨重。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '633',
        any: [
          /^\s*PRINTFORML %CALLNAME:YUSYA_I%不得不亲自上阵，这才逆转了局面，攻下了%LOCALS:2%。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '635',
        any: [
          /^\s*PRINTFORML 在付出巨大的代价后，魔王军才攻下了%LOCALS:2%。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '637',
        any: [/^\s*PRINTFORML 侥幸获胜的魔王军继续向%LOCALS:0%进发。\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '637-638',
        any: [/^\s*PRINTFORML 侥幸获胜的魔王军继续向%LOCALS:0%进发。\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '640-645',
        any: [/^\s*PRINTFORML %SAVESTR:YUSYA_I%的体力减少了一半！\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '644-645',
        any: [/^\s*PRINTFORML %SAVESTR:YUSYA_I%的体力减少了一半！\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '645',
        any: [/^\s*PRINTFORML %SAVESTR:YUSYA_I%的体力减少了一半！\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '649-650',
        any: [/^\s*SINKOU = SINKOU  \/ 2\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '649',
        any: [/^\s*SINKOU = SINKOU  \/ 2\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '651-652',
        any: [/^\s*;惨败（20%）\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '654-655',
        any: [
          /^\s*PRINTFORML %LOCALS:2%的防御极其坚固，令魔王军久攻不下，陷入僵局。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '655',
        any: [
          /^\s*PRINTFORML %LOCALS:2%的防御极其坚固，令魔王军久攻不下，陷入僵局。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '656',
        any: [
          /^\s*PRINTFORML 打破僵局的是一支突然出现在魔王军背后的%LOCALS:1%援军。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '657',
        any: [
          /^\s*PRINTFORML 腹背受敌的魔王军一触即溃，随即被里应外合的两支军队尽数歼灭。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '659',
        any: [
          /^\s*PRINTFORML 率领魔王军的%CALLNAME:YUSYA_I%孤身一人逃了回来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '659-660',
        any: [
          /^\s*PRINTFORML 率领魔王军的%CALLNAME:YUSYA_I%孤身一人逃了回来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '662',
        any: [/^\s*BASE:YUSYA_I:0 = BASE:YUSYA_I:0 \* 3 \/ 10\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '663',
        any: [/^\s*PRINTFORML %SAVESTR:YUSYA_I%的体力减少了70\\%！\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '663-665',
        any: [/^\s*PRINTFORML %SAVESTR:YUSYA_I%的体力减少了70\\%！\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '668-673',
        any: [/^\s*ELSEIF L_CHOICE == 2 && INV_TYPE == 2\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '669-673',
        any: [/^\s*ELSEIF L_CHOICE == 2 && INV_TYPE == 2\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '673-735',
        any: [/^\s*ELSEIF L_CHOICE == 2 && INV_TYPE == 2\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '738-764',
        any: [/^\s*ELSEIF L_CHOICE == 2 && INV_TYPE == 3\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '673-674',
        any: [/^\s*ELSEIF L_CHOICE == 2 && INV_TYPE == 2\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '677-678',
        any: [
          /^\s*PRINTFORML %CALLNAME:YUSYA_I%趁着夜色从空中潜入了%LOCALS:2%，在躲过多支巡逻队后终于打开了%LOCALS:2%的大门。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '678',
        any: [
          /^\s*PRINTFORML %CALLNAME:YUSYA_I%趁着夜色从空中潜入了%LOCALS:2%，在躲过多支巡逻队后终于打开了%LOCALS:2%的大门。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '679',
        any: [
          /^\s*PRINTFORML 早已等待多时的魔王军迅速杀入了%LOCALS:2%内，没有遇到顽强的抵抗便控制了整个%LOCALS:2%。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '680',
        any: [
          /^\s*PRINTFORML 当天空出现第一缕阳光时，%LOCALS:2%内已经只剩下了魔王军和魔王军的俘虏了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '680-681',
        any: [
          /^\s*PRINTFORML 当天空出现第一缕阳光时，%LOCALS:2%内已经只剩下了魔王军和魔王军的俘虏了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '680-682',
        any: [
          /^\s*PRINTFORML 当天空出现第一缕阳光时，%LOCALS:2%内已经只剩下了魔王军和魔王军的俘虏了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '680-685',
        any: [
          /^\s*PRINTFORML 当天空出现第一缕阳光时，%LOCALS:2%内已经只剩下了魔王军和魔王军的俘虏了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '688',
        any: [/^\s*PRINTFORML 人间牧场肉便器数量\+5。\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '690-695',
        any: [
          /^\s*PRINTFORML %CALLNAME:YUSYA_I%乔装打扮成功混进了%LOCALS:2%里。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '694-708',
        any: [
          /^\s*PRINTFORML %CALLNAME:YUSYA_I%乔装打扮成功混进了%LOCALS:2%里。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '695',
        any: [
          /^\s*PRINTFORML %CALLNAME:YUSYA_I%乔装打扮成功混进了%LOCALS:2%里。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '697',
        any: [
          /^\s*PRINTFORML %LOCALS:2%内的%LOCALS:1%还没有组织起反抗便被消灭殆尽。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '697-698',
        any: [
          /^\s*PRINTFORML %LOCALS:2%内的%LOCALS:1%还没有组织起反抗便被消灭殆尽。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '697-699',
        any: [
          /^\s*PRINTFORML %LOCALS:2%内的%LOCALS:1%还没有组织起反抗便被消灭殆尽。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '697-702',
        any: [
          /^\s*PRINTFORML %LOCALS:2%内的%LOCALS:1%还没有组织起反抗便被消灭殆尽。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '704',
        any: [/^\s*FLAG:83 \+= 5\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '705',
        any: [/^\s*PRINTFORML 人间牧场肉便器数量\+5。\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '707-713',
        any: [
          /^\s*PRINTFORML %CALLNAME:YUSYA_I%杀出一条血路，勉强逃回了魔王军。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '708-713',
        any: [
          /^\s*PRINTFORML %CALLNAME:YUSYA_I%杀出一条血路，勉强逃回了魔王军。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '711-724',
        any: [
          /^\s*PRINTFORML %CALLNAME:YUSYA_I%杀出一条血路，勉强逃回了魔王军。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '712-713',
        any: [
          /^\s*PRINTFORML %CALLNAME:YUSYA_I%杀出一条血路，勉强逃回了魔王军。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '713',
        any: [
          /^\s*PRINTFORML %CALLNAME:YUSYA_I%杀出一条血路，勉强逃回了魔王军。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '714',
        any: [
          /^\s*PRINTFORML 魔王军不得已只好发动强攻，在鏖战后最终惨胜。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '715',
        any: [/^\s*PRINTFORML 侥幸获胜的魔王军，继续向%LOCALS:0%进发。\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '715-716',
        any: [/^\s*PRINTFORML 侥幸获胜的魔王军，继续向%LOCALS:0%进发。\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '718-719',
        any: [/^\s*PRINTFORML %SAVESTR:YUSYA_I%的体力归零\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '719',
        any: [/^\s*PRINTFORML %SAVESTR:YUSYA_I%的体力归零\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '721',
        any: [/^\s*SINKOU = SINKOU \* 7 \/ 10\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '722',
        any: [/^\s*PRINTFORML 怪物数量减少了30\\%\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '722-723',
        any: [/^\s*PRINTFORML 怪物数量减少了30\\%\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '722-724',
        any: [/^\s*PRINTFORML 怪物数量减少了30\\%\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '727-734',
        any: [
          /^\s*PRINTFORML 在一番激烈战斗后%CALLNAME:YUSYA_I%还是被%LOCALS:1%生擒。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '728-729',
        any: [
          /^\s*PRINTFORML 在一番激烈战斗后%CALLNAME:YUSYA_I%还是被%LOCALS:1%生擒。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '729',
        any: [
          /^\s*PRINTFORML 在一番激烈战斗后%CALLNAME:YUSYA_I%还是被%LOCALS:1%生擒。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '730',
        any: [
          /^\s*PRINTFORML 失去指挥官的魔王军随即被出城迎击的%LOCALS:1%击溃。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '731-732',
        any: [/^\s*PRINTFORMW %CALLNAME:YUSYA_I%被俘虏，侵攻中止。\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '732',
        any: [/^\s*PRINTFORMW %CALLNAME:YUSYA_I%被俘虏，侵攻中止。\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '732-733',
        any: [/^\s*PRINTFORMW %CALLNAME:YUSYA_I%被俘虏，侵攻中止。\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '732-734',
        any: [/^\s*PRINTFORMW %CALLNAME:YUSYA_I%被俘虏，侵攻中止。\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '743',
        any: [
          /^\s*PRINTFORMW %CALLNAME:YUSYA_I%趁着夜色从空中穿过了%LOCALS:2%。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '743-744',
        any: [
          /^\s*PRINTFORMW %CALLNAME:YUSYA_I%趁着夜色从空中穿过了%LOCALS:2%。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '747',
        any: [
          /^\s*PRINTFORMW %CALLNAME:YUSYA_I%乔装打扮成功通过了%LOCALS:2%。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '747-748',
        any: [
          /^\s*PRINTFORMW %CALLNAME:YUSYA_I%乔装打扮成功通过了%LOCALS:2%。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '751-752',
        any: [
          /^\s*PRINTFORMW %CALLNAME:YUSYA_I%杀出一条血路，勉强逃了回去。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '752',
        any: [
          /^\s*PRINTFORMW %CALLNAME:YUSYA_I%杀出一条血路，勉强逃了回去。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '752-754',
        any: [
          /^\s*PRINTFORMW %CALLNAME:YUSYA_I%杀出一条血路，勉强逃了回去。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '752-755',
        any: [
          /^\s*PRINTFORMW %CALLNAME:YUSYA_I%杀出一条血路，勉强逃了回去。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '756-760',
        any: [
          /^\s*PRINTFORMW 在一番激烈战斗后%CALLNAME:YUSYA_I%还是被%LOCALS:1%生擒。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '759-760',
        any: [
          /^\s*PRINTFORMW 在一番激烈战斗后%CALLNAME:YUSYA_I%还是被%LOCALS:1%生擒。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '760',
        any: [
          /^\s*PRINTFORMW 在一番激烈战斗后%CALLNAME:YUSYA_I%还是被%LOCALS:1%生擒。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '760-762',
        any: [
          /^\s*PRINTFORMW 在一番激烈战斗后%CALLNAME:YUSYA_I%还是被%LOCALS:1%生擒。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '760-763',
        any: [
          /^\s*PRINTFORMW 在一番激烈战斗后%CALLNAME:YUSYA_I%还是被%LOCALS:1%生擒。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '767-787',
        any: [/^\s*ELSEIF L_CHOICE == 3 && INV_TYPE == 2\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '767-768',
        any: [/^\s*ELSEIF L_CHOICE == 3 && INV_TYPE == 2\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '772',
        any: [
          /^\s*PRINTFORML 魔王军绕开%LOCALS:2%向%LOCALS:0%进发，因为路途遥远地形复杂损失了一些人马。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '775-776',
        any: [/^\s*PRINTFORMW 怪物数量减少了10\\%\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '776',
        any: [/^\s*CALL KARMA, YUSYA_I, -50\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '776-777',
        any: [/^\s*PRINTFORMW 怪物数量减少了10\\%\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '780',
        any: [
          /^\s*PRINTFORML 魔王军绕开%LOCALS:2%向%LOCALS:0%进发，但却遇到了埋伏。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '781',
        any: [
          /^\s*PRINTFORML 在一番血战后，魔王军击退了伏军继续向%LOCALS:0%进发。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '784',
        any: [/^\s*SINKOU = SINKOU \* 5 \/ 10\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '785',
        any: [
          /^\s*PRINTFORMW %SAVESTR:YUSYA_I%是优秀的指挥官，带领着怪物们侵略了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '785-786',
        any: [/^\s*PRINTFORMW 怪物数量减少了50\\%\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '798',
        any: [
          /^\s*PRINTFORML %CALLNAME:YUSYA_I%绕开%LOCALS:2%向%LOCALS:0%进发，但却遇到了埋伏。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '800',
        any: [
          /^\s*PRINTFORMW 在一番激烈战斗后%CALLNAME:YUSYA_I%还是被活捉了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '800-801',
        any: [
          /^\s*PRINTFORMW 在一番激烈战斗后%CALLNAME:YUSYA_I%还是被活捉了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '803',
        any: [
          /^\s*PRINTFORMW 在一番激烈战斗后%CALLNAME:YUSYA_I%终于逃了回来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '803-804',
        any: [
          /^\s*PRINTFORMW 在一番激烈战斗后%CALLNAME:YUSYA_I%终于逃了回来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '806',
        any: [/^\s*MONEY \+= SINKOU \* 5\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '810-813',
        any: [/^\s*;侵略中途事件（被勇者叫阵单挑）\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '742-743',
        any: [
          /^\s*PRINTFORMW %CALLNAME:YUSYA_I%趁着夜色从空中穿过了%LOCALS:2%。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '828-887',
        any: [/^\s*LOCALS:1 = 一座河边的桥\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '996-1010',
        any: [/^\s*IF FLAG:82 == 0 && CHARANUM > 60\s*$/m],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '35-47',
        any: [/^\s*IF FLAG:82 == 0 && CHARANUM > 60\s*$/m],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '332-344',
        any: [/^\s*IF FLAG:82 == 0 && CHARANUM > 60\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '996-997',
        any: [/^\s*IF FLAG:82 == 0 && CHARANUM > 60\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '998-999',
        any: [
          /^\s*ELSEIF FLAG:87 == 0 && FLAG:89 == 0 && FLAG:91 == 0 && CHARANUM > 65\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1000-1001',
        any: [
          /^\s*ELSEIF \(\(FLAG:87 \* FLAG:89 == 0\) && \(FLAG:89 \* FLAG:91 == 0\) && \(FLAG:91 \* FLAG:87 == 0\)\) && CHARANUM > 70\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1002-1003',
        any: [
          /^\s*ELSEIF \(FLAG:87 == 0 \|\| FLAG:89 == 0 \|\| FLAG:91 == 0\) && CHARANUM > 75\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1004-1005',
        any: [/^\s*ELSEIF FLAG:92 < 15  && CHARANUM > 80\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1006-1007',
        any: [/^\s*ELSEIF FLAG:94 == 0 && CHARANUM > 90\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1008-1009',
        any: [/^\s*ELSEIF CHARANUM >= MAX_CHARANUM\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '847',
        any: [/^\s*LOCAL:12 = RAND:2 \? 12 # 16	;弓手\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '859',
        any: [/^\s*LOCAL:12 = RAND:2 \? 10 # 14	;巫女\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '871-872',
        any: [/^\s*LOCAL:20 = EX_FLAG:95 \| 8\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '882-883',
        any: [/^\s*LOCAL:10 = 6	;天使\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '836',
        any: [/^\s*LOCAL:20 = EX_FLAG:95 \| 1\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '837-838',
        any: [/^\s*SIF EX_FLAG:95 & 1\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '890-969',
        any: [
          /^\s*DATA 『快去叫亲爱的魔王大人出来，人家要和他比试比试呢』\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '891-896',
        any: [
          /^\s*DATA 『快去叫亲爱的魔王大人出来，人家要和他比试比试呢』\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '892-896',
        any: [
          /^\s*DATA 『快去叫亲爱的魔王大人出来，人家要和他比试比试呢』\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '911-913',
        any: [
          /^\s*PRINTFORMW 面对%LOCALS:2%的挑衅，%CALLNAME:YUSYA_I%决定……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '913',
        any: [
          /^\s*PRINTFORMW 面对%LOCALS:2%的挑衅，%CALLNAME:YUSYA_I%决定……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '916-925',
        any: [/^\s*PRINTFORML \[3\] 无视，全军进攻\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '928',
        any: [
          /^\s*PRINTFORML 魔王回应了%CALLNAME:YUSYA_I%召唤前来迎战%LOCALS:2%。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '930',
        any: [/^\s*PRINTFORML %CALLNAME:YUSYA_I%决定亲自迎战%LOCALS:2%。\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '932',
        any: [
          /^\s*PRINTFORML 在%CALLNAME:YUSYA_I%一声令下，魔王军缓缓前进，展开了对%LOCALS:2%战斗。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '935',
        any: [
          /^\s*PRINTFORML %CALLNAME:YUSYA_I%向%LOCALS:0%进发着，却在%LOCALS:1%前被一名突然出现的%LOCALS:2%拦下了脚步。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '957-961',
        any: [
          /^\s*DATA 『今天运气真是不错哦~可悲的魔族，你们的脑袋是我的了！』\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '958-961',
        any: [
          /^\s*DATA 『今天运气真是不错哦~可悲的魔族，你们的脑袋是我的了！』\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '965-967',
        any: [/^\s*L_CHOICE = 3\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '967',
        any: [/^\s*L_CHOICE = 3\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '968',
        any: [
          /^\s*PRINTFORMW 在意识到敌人只有一个人后，魔王军向敢于挑衅的%LOCALS:2%发起了猛烈的进攻。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '971-1085',
        any: [/^\s*;\[1\] 召唤魔王应战\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '974-989',
        any: [/^\s*IF MONEY >= 3000\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '975',
        any: [
          /^\s*PRINTFORML 但对方看起来也不是省油的灯、未必能稳操胜券、\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '979',
        any: [/^\s*PRINTFORML \[1\] 使用氪金道具\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '980',
        any: [/^\s*PRINTFORML \[2\] 堂堂正正一决胜负\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '982-989',
        any: [/^\s*IF L_CHOICE != 1 && L_CHOICE != 2\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '991-995',
        any: [/^\s*;抓捕勇者数量限制\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '994-995',
        any: [/^\s*;抓捕勇者数量限制\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1012-1043',
        any: [/^\s*IF L_CHOICE == 1 && LOCAL >= 2\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1012-1013',
        any: [/^\s*IF L_CHOICE == 1 && LOCAL >= 2\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1012-1014',
        any: [/^\s*IF L_CHOICE == 1 && LOCAL >= 2\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1017-1027',
        any: [
          /^\s*DATAFORM %LOCALS:2%陷入了泥沼中，动弹不得，被魔王抓住了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1029-1030',
        any: [/^\s*PRINTFORMW 魔王军高呼魔王万岁，继续向%LOCALS:0%进发。\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1031-1036',
        any: [/^\s*;生成相应种族职业勇者一名。\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1034-1035',
        any: [/^\s*CALL CHARA_MAKE\(CHARANUM -1, , LOCAL:10\)\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1035',
        any: [/^\s*CALL CHARA_MAKE\(CHARANUM -1, , LOCAL:10\)\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1037',
        any: [/^\s*CFLAG:A:1 = 0\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1038',
        any: [/^\s*PRINTFORMW %CALLNAME:A%被魔王抓住了。金钱-3000\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1038-1039',
        any: [/^\s*PRINTFORMW %CALLNAME:A%被魔王抓住了。金钱-3000\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1040-1041',
        any: [/^\s*EX_FLAG:95 = LOCAL:20\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1042',
        any: [/^\s*EX_FLAG:99 \+= 1\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1043-1044',
        any: [/^\s*;开挂失败 20%\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1045-1060',
        any: [/^\s*ELSEIF L_CHOICE == 1\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1045-1046',
        any: [/^\s*ELSEIF L_CHOICE == 1\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1045-1047',
        any: [/^\s*ELSEIF L_CHOICE == 1\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1049-1053',
        any: [
          /^\s*PRINTFORML 然而%LOCALS:2%提前察觉了魔王的动作，躲闪掉了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1053',
        any: [
          /^\s*PRINTFORML 然而%LOCALS:2%提前察觉了魔王的动作，躲闪掉了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1054',
        any: [
          /^\s*PRINTFORML 在鄙夷地看了魔王一眼后，%LOCALS:2%%LOCALS:3%。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1055',
        any: [
          /^\s*PRINTFORML 虽然被人鄙视了，但腼着脸的魔王命令魔王军继续向%LOCALS:0%前进。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1056-1057',
        any: [/^\s*PRINTFORMW 金钱-3000。\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1057',
        any: [/^\s*PRINTFORMW 金钱-3000。\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1057-1058',
        any: [/^\s*PRINTFORMW 金钱-3000。\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1059-1061',
        any: [/^\s*;不开挂取胜 20%\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1060-1061',
        any: [/^\s*;不开挂取胜 20%\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1062-1072',
        any: [/^\s*ELSEIF LOCAL < 2\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1063-1064',
        any: [/^\s*PRINTFORML 尽管%LOCALS:2%的%LOCALS:4%、\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1064',
        any: [/^\s*PRINTFORML 尽管%LOCALS:2%的%LOCALS:4%、\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1065',
        any: [/^\s*PRINTFORML 但还是敌不过魔王的邪恶魔法、\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1066',
        any: [/^\s*PRINTFORML 很快就成为了一具尸体。\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1067',
        any: [/^\s*PRINTFORML 魔王军高呼魔王万岁、继续向%LOCALS:0%进发。\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1068-1069',
        any: [/^\s*PRINTFORMW 魔王魔力减少50\\%、魔王经验\+500\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1069',
        any: [/^\s*PRINTFORMW 魔王魔力减少50\\%、魔王经验\+500\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1070',
        any: [/^\s*BASE:MASTER:1 \/= 2\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1070-1071',
        any: [/^\s*BASE:MASTER:1 \/= 2\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1072-1073',
        any: [/^\s*;不开挂失败 80%\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1074-1084',
        any: [/^\s*PRINTFORML %LOCALS:2%的%LOCALS:4%、\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1077',
        any: [/^\s*PRINTFORML 魔王左支右绌、招架不住、\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1078',
        any: [/^\s*PRINTFORML 被%LOCALS:4%抓住空隙、达成了重伤。\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1079',
        any: [
          /^\s*PRINTFORML 魔王军士气动摇、救下昏迷的魔王匆匆逃回魔王城。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1081',
        any: [/^\s*PRINTFORMW 魔王体力魔力清空、侵攻中止\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1082',
        any: [/^\s*BASE:MASTER:0 = 0\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1083',
        any: [/^\s*BASE:MASTER:1 = 0\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1083-1084',
        any: [/^\s*BASE:MASTER:1 = 0\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1087-1135',
        any: [/^\s*;奴隶取胜 20%\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1088-1090',
        any: [/^\s*;奴隶取胜 20%\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1090-1104',
        any: [/^\s*;奴隶取胜 20%\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1094',
        any: [/^\s*PRINTFORML %LOCALS:2%心有不甘地%LOCALS:3%。\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1096',
        any: [/^\s*PRINTFORML 魔王军高万岁，继续向%LOCALS:0%进发。\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1101',
        any: [/^\s*PRINTFORMW %CALLNAME:YUSYA_I%经验\+500，体力-50\\%\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1103-1105',
        any: [/^\s*;奴隶不分胜负 40%\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1104-1105',
        any: [/^\s*;奴隶不分胜负 40%\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1106-1119',
        any: [/^\s*ELSEIF LOCAL < 6\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1108',
        any: [
          /^\s*PRINTFORML 虽然%LOCALS:2%%LOCALS:4%，但%CALLNAME:YUSYA_I%也不遑多让。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1117',
        any: [/^\s*PRINTFORMW %CALLNAME:YUSYA_I%体力-90\\%\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1119-1120',
        any: [/^\s*;奴隶失败 40%\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1121-1134',
        any: [
          /^\s*PRINTFORML %CALLNAME:YUSYA_I%与%LOCALS:2%激烈交战起来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1124',
        any: [/^\s*PRINTFORML %LOCALS:2%轻蔑的一笑，%LOCALS:3%。\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1126',
        any: [/^\s*PRINTFORML 失去指挥官的魔王军只好撤退了。\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1128',
        any: [
          /^\s*PRINTFORML 晕过去的%CALLNAME:YUSYA_I%成为了狂王的俘虏。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1134-1137',
        any: [/^\s*ELSEIF L_CHOICE == 3\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1137-1159',
        any: [/^\s*ELSEIF L_CHOICE == 3\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1143',
        any: [/^\s*PRINTFORML %LOCALS:2%轻蔑的一笑、%LOCALS:3%。\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1144',
        any: [/^\s*PRINTFORML 魔王军元气大伤只好撤退了。\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1144-1145',
        any: [/^\s*PRINTFORML 魔王军元气大伤只好撤退了。\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1144-1146',
        any: [/^\s*PRINTFORML 魔王军元气大伤只好撤退了。\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1147-1149',
        any: [/^\s*;损失一般继续进攻 50%\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1153',
        any: [/^\s*PRINTFORML 最后%LOCALS:2%体力不支、%LOCALS:3%。\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1156',
        any: [/^\s*PRINTFORMW 魔物数量-20\\%。\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1157',
        any: [/^\s*SINKOU = SINKOU \* 4 \/5\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1157-1158',
        any: [/^\s*SINKOU = SINKOU \* 4 \/5\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '307-312',
        any: [/^\s*SIF COUNT == 0 \|\|\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '349-354',
        any: [/^\s*SIF		COUNT == 0 \|\|\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '305-316',
        any: [/^\s*SIF COUNT == 0 \|\|\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '349-357',
        any: [/^\s*SIF		COUNT == 0 \|\|\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '307',
        any: [/^\s*SIF COUNT == 0 \|\|\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '315',
        any: [/^\s*YUSYA_I\+\+\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '803-847',
        any: [/^\s*PRINTFORMW 得到了\{SINKOU \* 5\}点的战利品！\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '759-775',
        any: [/^\s*PRINTFORM %SAVESTR:YUSYA_I%带着怪物到达了\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '778-800',
        any: [/^\s*IF TALENT:YUSYA_I:160\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '797-799',
        any: [
          /^\s*PRINTFORMW %SAVESTR:YUSYA_I%把侵略时所抢夺的金银财宝都献给了%SAVESTR:MASTER%………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '779',
        any: [
          /^\s*PRINTFORMW %SAVESTR:YUSYA_I%在侵略的时候依旧全程保持着慈爱的笑容，她终于明白到一切都是为了%SAVESTR:MASTER%而存在的………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '782',
        any: [
          /^\s*PRINTFORMW %SAVESTR:YUSYA_I%身先士卒，第一个飞跳入战场里，而且最后毫发无损。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '788',
        any: [
          /^\s*PRINTFORMW %SAVESTR:YUSYA_I%穿着%SAVESTR:MASTER%赐予的被诅咒的铠甲，高声大笑着率领怪物们突击了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '791',
        any: [
          /^\s*PRINTFORMW %SAVESTR:YUSYA_I%冷哼着耻笑跪求饶命的草民，随手将他们交给饥饿的巨兽了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '794',
        any: [
          /^\s*PRINTFORMW %SAVESTR:YUSYA_I%一边发出异样的笑声，一边用手中的火把将四周都点燃了………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '797',
        any: [
          /^\s*PRINTFORMW %SAVESTR:YUSYA_I%把侵略时所抢夺的金银财宝都献给了%SAVESTR:MASTER%………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '797-809',
        any: [
          /^\s*PRINTFORMW %SAVESTR:YUSYA_I%把侵略时所抢夺的金银财宝都献给了%SAVESTR:MASTER%………\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '805',
        any: [/^\s*PRINTFORMW 强制征收了\{SINKOU \* 5\}点！\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '807',
        any: [/^\s*EX_FLAG:4444 \+= SINKOU \* 5\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '808',
        any: [/^\s*EXP:YUSYA_I:80 \+= SINKOU \/ 2\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '809',
        any: [
          /^\s*PRINTFORMW %SAVESTR:YUSYA_I%获得了\{SINKOU\/2\}点经验值！\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '841-846',
        any: [/^\s*PRINTFORMW 得到了\{SINKOU \* 5\}点的战利品！\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '842',
        any: [/^\s*PRINTFORMW 得到了\{SINKOU \* 5\}点的战利品！\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '842-843',
        any: [/^\s*PRINTFORMW 得到了\{SINKOU \* 5\}点的战利品！\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '842-844',
        any: [/^\s*PRINTFORMW 得到了\{SINKOU \* 5\}点的战利品！\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '842-845',
        any: [/^\s*PRINTFORMW 得到了\{SINKOU \* 5\}点的战利品！\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '842-846',
        any: [/^\s*PRINTFORMW 得到了\{SINKOU \* 5\}点的战利品！\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '849-863',
        any: [/^\s*SIF AREA == 81\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '863',
        any: [/^\s*WAIT\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '867',
        any: [/^\s*CALL INVASION_RYOUZYOKU, 1, SINKOU\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '882-888',
        any: [/^\s*IF RAND:100 < 9\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '884-885',
        any: [/^\s*EX_FLAG:99 \+= 1\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '885',
        any: [/^\s*EX_FLAG:99 \+= 1\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '885-887',
        any: [/^\s*EX_FLAG:99 \+= 1\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '405',
        any: [/^\s*YUSYA_I = RESULT\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '407-427',
        any: [/^\s*CALL MONSTER_DATA, MON_ID, 0, YUSYA_I\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '413',
        any: [/^\s*TMP2_I = CFLAG:YUSYA_I:12\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '410-413',
        any: [/^\s*CALL MONSTER_DATA, MON_ID, 0, YUSYA_I\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '413-417',
        any: [/^\s*CALL MONSTER_DATA, MON_ID, 0, YUSYA_I\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '424',
        any: [/^\s*ITEM:MON_ID \/= 3\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '426',
        any: [/^\s*ITEM:MON_ID \*= 2\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '429-430',
        any: [/^\s*;怪物カンストで最大約12万の1\/20\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '429-431',
        any: [/^\s*;怪物カンストで最大約12万の1\/20\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '433-437',
        any: [
          /^\s*PRINTFORMW 勇者补正　　　x\{TMP2_I\/100\}\.%TOSTR\(TMP2_I%100,"00"\)%\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '433-434',
        any: [
          /^\s*PRINTFORMW 勇者补正　　　x\{TMP2_I\/100\}\.%TOSTR\(TMP2_I%100,"00"\)%\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '434',
        any: [
          /^\s*PRINTFORMW 勇者补正　　　x\{TMP2_I\/100\}\.%TOSTR\(TMP2_I%100,"00"\)%\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '434-437',
        any: [
          /^\s*PRINTFORMW 勇者补正　　　x\{TMP2_I\/100\}\.%TOSTR\(TMP2_I%100,"00"\)%\s*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '439-443',
        any: [/^\s*;略奪\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '1109-1112',
        any: [
          /^\s*PRINTFORML 在大战几百回合之后，%LOCALS:2%心有不甘地%LOCALS:3%。$/m,
        ],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
