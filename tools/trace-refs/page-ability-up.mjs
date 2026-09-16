// 源: tools/trace-check.mjs  @FILES
// issue #397（N13 据点列表与裁缝）新增：ere/page/page-ability-up.js ↔ target/ERB/SHOP/SHOP_2.ERB
// 本票逐行标注了原作的 :N 出处，锚按「所引行首个非空行的整行字面量」生成
// （逐条在场校验 + 源侧锚校验由 trace-check 执行）。

export const FILES = [
  {
    js: 'ere/page/page-ability-up.js',
    refs: [
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '4-153',
        any: [
          /^\s*PRINTFORML\ \[\{0,2\}\]\ %NAME:MASTER,12,LEFT%\ %"",8,LEFT%\ LV\{CFLAG:MASTER:9,4,RIGHT\}\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '5',
        any: [/^\s*\#DIM\ SELECT_MENU\ =\ 998\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '9',
        any: [/^\s*\#DIM\ NO_PAGE\ =\ 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '13',
        any: [/^\s*\#DIM\ MAX_PAGE\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '15-17',
        any: [/^\s*PREV_LIST_POS\ =\ 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '18',
        any: [/^\s*\$INPUT_LOOP_MENU\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '18-96',
        any: [
          /^\s*PRINTFORML\ \[\{0,2\}\]\ %NAME:MASTER,12,LEFT%\ %"",8,LEFT%\ LV\{CFLAG:MASTER:9,4,RIGHT\}\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '21-31',
        any: [/^\s*SWAP\ LIST_POS,\ PREV_LIST_POS\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '33-38',
        any: [/^\s*IF\ PREV_MODE\ !=\ SELECT_MENU\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '39-42',
        any: [/^\s*IF\ SELECT_MENU\ ==\ 998\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '44',
        any: [/^\s*PREV_MODE\ =\ SELECT_MENU\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '46',
        any: [/^\s*CUSTOMDRAWLINE\ =\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '46-64',
        any: [/^\s*;ダンジョンレベル20以上からアンロック\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '47-48',
        any: [/^\s*SETFONT\ "ARIEL\ BLACK"\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '50',
        any: [/^\s*SIF\ CFLAG:0:9\ <\ 20\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '50-51',
        any: [/^\s*SETCOLOR\ \(GETDEFCOLOR\(\)\ \-\ 0x444444\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '52',
        any: [/^\s*PRINTBUTTON\ @"%UNICODE\(0x258c\)%奴隶一览\	\	",\ 998\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '53',
        any: [/^\s*PRINTBUTTON\ @"%UNICODE\(0x258c\)%勇者一览\	",\ 997\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '56',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '61-63',
        any: [/^\s*PRINTL\ 要提高谁的能力值？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '63',
        any: [/^\s*PRINTL\ 要提高谁的能力值？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '64-66',
        any: [/^\s*T_LCOUNT\ =\ NO_PAGE\ \*\ NUM_PAGE\ \+\ 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '65',
        any: [/^\s*L_LCOUNT\ =\ LINECOUNT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '65-96',
        any: [
          /^\s*PRINTFORML\ \[\{0,2\}\]\ %NAME:MASTER,12,LEFT%\ %"",8,LEFT%\ LV\{CFLAG:MASTER:9,4,RIGHT\}\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '67',
        any: [/^\s*IF\ SELECT_MENU\ ==\ 997\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '67-71',
        any: [/^\s*CALL\ LIFE_LIST_ENEMY\(NO_PAGE,NUM_PAGE,LIST_POS\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '68',
        any: [/^\s*NUM_PAGE\ =\ 24\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '69-70',
        any: [/^\s*CALL\ MAX_PAGE_ENEMY\(NUM_PAGE\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '70',
        any: [/^\s*MAX_PAGE\ =\ RESULT\ \-\ 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '71',
        any: [/^\s*CALL\ LIFE_LIST_ENEMY\(NO_PAGE,NUM_PAGE,LIST_POS\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '72-79',
        any: [
          /^\s*PRINTFORML\ \[\{0,2\}\]\ %NAME:MASTER,12,LEFT%\ %"",8,LEFT%\ LV\{CFLAG:MASTER:9,4,RIGHT\}\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '74',
        any: [/^\s*SELECT_MENU\ =\ 998\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '75',
        any: [/^\s*NUM_PAGE\ =\ 23\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '76-77',
        any: [/^\s*CALL\ MAX_PAGE_SALAVE\(NUM_PAGE\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '77',
        any: [/^\s*MAX_PAGE\ =\ RESULT\ \-\ 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '78',
        any: [
          /^\s*PRINTFORML\ \[\{0,2\}\]\ %NAME:MASTER,12,LEFT%\ %"",8,LEFT%\ LV\{CFLAG:MASTER:9,4,RIGHT\}\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '79',
        any: [/^\s*CALL\ LIFE_LIST_SALAVE\(NO_PAGE,NUM_PAGE,LIST_POS\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '81',
        any: [/^\s*L_LCOUNT\ =\ LINECOUNT\ \-\ L_LCOUNT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '82-90',
        any: [/^\s*REPEAT\ \(NUM_PAGE\ \-\ L_LCOUNT\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '83-84',
        any: [/^\s*SIF\ SELECT_MENU\ ==\ 998\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '88-89',
        any: [/^\s*SIF\ SELECT_MENU\ ==\ 998\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '91-93',
        any: [/^\s*PRINTLC\ \[1000\]\ \-\ 上一页\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '92',
        any: [/^\s*PRINTLC\ \[1000\]\ \-\ 上一页\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '93',
        any: [/^\s*PRINTLC\ \[999\]\ \-\ 返\ \ 回\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '94',
        any: [/^\s*PRINTLC\ \[1001\]\ \-\ 下一页\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '96',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '98-147',
        any: [/^\s*;メニューは一応991～998に含みを持たせています\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '98',
        any: [/^\s*\$INPUT_LOOP_0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '99',
        any: [/^\s*INPUT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '100-101',
        any: [/^\s*IF\ RESULT\ ==\ 999\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '102-105',
        any: [
          /^\s*ELSEIF\ \(RESULT\ >\ 990\ \&\&\ RESULT\ <\ 999\)\ \&\&\ CFLAG:0:9\ <\ 20\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '106-110',
        any: [/^\s*;メニューは一応991～998に含みを持たせています\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '111-116',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 1000\	\	;上一页\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '117-122',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 1001\	\	;下一页\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '123-126',
        any: [/^\s*ELSEIF\ RESULT\ <\ 0\ \|\|\ RESULT\ >=\ CHARANUM\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '127-131',
        any: [/^\s*PRINTW\ 濒死中，无法选择\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '138-141',
        any: [
          /^\s*ELSEIF\ CFLAG:RESULT:1\ !=\ 0\ \&\&\ SELECT_MENU\ ==\ 998\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '143-146',
        any: [
          /^\s*ELSEIF\ CFLAG:RESULT:1\ !=\ 2\ \&\&\ SELECT_MENU\ ==\ 997\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '149-150',
        any: [/^\s*SIF\ RESULT\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '152',
        any: [/^\s*CALL\ ABILITY_UP_CORE\(RESULT\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '153',
        any: [/^\s*RESTART\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '155-254',
        any: [/^\s*PRINTFORML\ %SAVESTR:TARGET%\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '156',
        any: [/^\s*T\ =\ TARGET\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '156-157',
        any: [/^\s*TARGET\ =\ ARG\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '157',
        any: [/^\s*TARGET\ =\ ARG\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '159-254',
        any: [/^\s*PRINTFORML\ %SAVESTR:TARGET%\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '160-161',
        any: [/^\s*PRINTFORML\ %SAVESTR:TARGET%\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '161',
        any: [/^\s*PRINTFORML\ %SAVESTR:TARGET%\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '162',
        any: [/^\s*CUSTOMDRAWLINE\ ‥\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '163',
        any: [/^\s*CALL\ SHOW_INFO_EXP\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '164',
        any: [/^\s*CALL\ SHOW_JUEL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '165',
        any: [/^\s*CALL\ SHOW_ABLUP_SELECT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '167',
        any: [/^\s*INPUT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '170-245',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 100\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '246-251',
        any: [/^\s*CALL\ CHECK_SELLASSIABLE\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '247',
        any: [/^\s*CALL\ YOKUBO_UP_CHECK\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '248',
        any: [/^\s*CALL\ CHECK_SELLASSIABLE\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '249',
        any: [/^\s*;CALL\ CHECK_SPECIALSKIL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '250-251',
        any: [/^\s*TARGET\ =\ T\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '250',
        any: [/^\s*TARGET\ =\ T\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '254',
        any: [/^\s*GOTO\ INPUT_LOOP_1\s*$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
