// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：com-register.mjs

export const FILES = [
  {
    // #214：COMSEQ 的登记 / 显示 / 执行（COM_REGISTER.ERB 全文）
    js: 'ere/system/train/com-register.js',
    refs: [
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '25-121',
        any: [/@COMSEQ_REGISTER/, /^PRINTL 调教菜单登录$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '26',
        any: [/^PRINTL 调教菜单登录$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '31-33',
        any: [/\$REDRAW_LOOP/, /^CLEARLINE LINECOUNT - LOCAL:99$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '35',
        any: [/^DRAWLINE$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '36',
        any: [/^CALL COMSEQ_SHOW$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '37',
        any: [/^DRAWLINE$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '38',
        any: [/^PRINTFORML 选择第\{LOCAL:0\+1\}个指令:/],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '39',
        any: [/^CALL COMSEQSUB_PRINT_COMLIST$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '40',
        any: [/^PRINTL$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '41-51',
        any: [/^SIF FLAG:550 > 0$/m, /PRINTC 取消并返回\[1000\]/],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '41-42',
        any: [/^SIF FLAG:550 > 0$/m, /PRINTC 重置菜单\[998\]/],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '43-44',
        any: [/^SIF LOCAL:0 > 0$/m, /PRINTC 重复指令\[999\]/],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '45-48',
        any: [/IF LOCAL:0 == 0 && FLAG:550 > 0/, /PRINTC 取消并返回\[1000\]/],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '50',
        any: [/PRINTC 保存并返回\[1000\]/],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '52',
        any: [/^PRINTL $/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '53',
        any: [/^DRAWLINE$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '57',
        any: [/^INPUT$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '58-62',
        any: [/IF RESULT == 1000 && LOCAL:0 == 0/, /RESULT > 999/],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '65-74',
        any: [/IF RESULT == 998 && FLAG:550 > 0/, /^\tTFLAG:204 = 0$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '76-89',
        any: [/ELSEIF RESULT == 999 && LOCAL:0 > 0/, /^\tLOCAL:1 = LOCAL:0$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '81-83',
        any: [/^\tSIF LOCAL:0 > 9$/m, /^\t\tGOTO COMPLETE$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '93-101',
        any: [/^\tTFLAG:204 = RESULT$/m, /CALL MULTI_COMABLE, TFLAG:204/],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '104-108',
        any: [/^LOCAL:1 = 551 \+ LOCAL:0$/m, /FLAG:\(LOCAL:1\) = TFLAG:204/],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '111-113',
        any: [/^LOCAL \+\+$/m, /^\tGOTO REDRAW_LOOP$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '115-121',
        any: [/\$COMPLETE/, /^PRINTW 调教菜单登录完毕$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '116',
        any: [/^DRAWLINE$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '117',
        any: [/^CALL COMSEQ_SHOW$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '118',
        any: [/^DRAWLINE$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '119',
        any: [/^PRINTW 调教菜单登录完毕$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '120',
        any: [/^TFLAG:204 = 0$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '126-155',
        any: [/@COMSEQ_SHOW/, /^VARSET LOCAL, 0$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '131-136',
        any: [/TRYCALLFORM COM_ABLE\{FLAG:LOCAL\}/, /PRINT （不可用）/],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '133',
        any: [/PRINTFORM %TRAINNAME:\(FLAG:LOCAL\)%/],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '138-151',
        any: [/^\t\tLOCAL:1 = 1$/m, /\$TIMES_EXP_CHECK/],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '152-153',
        any: [/SIF COUNT < FLAG:550 - 1/, /PRINT  → /],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '155',
        any: [/^PRINTL  $/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '162-179',
        any: [/@COMSEQSUB_PRINT_COMLIST/, /^VARSET LOCAL$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '169',
        any: [/PRINTFORMC %TRAINNAME:LOCAL%\[\{LOCAL, 3\}\]/],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '190-202',
        any: [/@MULTI_COMABLE, ARG/, /IF STRLENS\(TRAINNAME:ARG\) == 0/],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '196',
        any: [/^\t;調教菜單実行中を表すTFLAGを設定する$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '196-200',
        any: [/^\tTFLAG:224 = 555$/m, /TRYCALLFORM COM_ABLE\{ARG\}/],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '207-237',
        any: [/@COMSEQ_TRAIN/, /^PRINTFORMW 开始自动执行调教指令$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '208',
        any: [/^DRAWLINE$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '209',
        any: [/^CALL COMSEQ_SHOW$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '210',
        any: [/^DRAWLINE$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '211',
        any: [/^PRINTFORMW 开始自动执行调教指令$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '213',
        any: [/^TFLAG:224 = 555$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '217',
        any: [/^LOCAL = PREVCOM$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '226',
        any: [/^\tSELECTCOM:\(COUNT \+ 1\) = FLAG:\(551 \+ COUNT\)$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '230',
        any: [/^\tCALLTRAIN FLAG:550$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '218-228',
        any: [/^REPEAT FLAG:550$/m, /^\tRESULT = 1$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '220-224',
        any: [/TRYCALLFORM COM_ABLE\{FLAG:\(551 \+ COUNT\)\}/, /^\t\tBREAK$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '220',
        any: [/TRYCALLFORM COM_ABLE\{FLAG:\(551 \+ COUNT\)\}/],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '227',
        any: [/^\tPREVCOM = FLAG:\(551 \+ COUNT\)$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '229-235',
        any: [/IF LOCAL:1 == 0/, /^\tCALLTRAIN FLAG:550$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '233',
        any: [/^\tTFLAG:224 = 0$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '234',
        any: [/PRINTL 所登录的指令目前无法实行/],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '236',
        any: [/^PREVCOM = LOCAL$/m],
      },
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '243-245',
        any: [/@CALLTRAINEND/, /^;調教菜單実行中を表すTFLAGをリセットする$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
