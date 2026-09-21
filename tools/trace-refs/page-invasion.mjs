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
        ref: '815-1054',
        any: [
          /^[ \t]*@INVASION_EVENT_CHALLENGE, AREA, SINDO, INV_TYPE, SINKOU, YUSYA_I[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '542-808',
        any: [/^[ \t]*IF AREA == 81[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_EVENT.ERB',
        ref: '828-1162',
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
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
