// 源: tools/trace-check.mjs  @FILES
// issue #397（N13 据点列表与裁缝）新增：ere/page/page-life-list.js ↔ target/ERB/SHOP/LIFE_LIST.ERB
// 本票逐行标注了原作的 :N 出处，锚按「所引行首个非空行的整行字面量」生成
// （逐条在场校验 + 源侧锚校验由 trace-check 执行）。

export const FILES = [
  {
    js: 'ere/page/page-life-list.js',
    refs: [
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '1-93',
        any: [
          /^\s*PRINTFORML\ %LOCALS,\ MAX_NUM_LEN\+2,\ RIGHT%\ \ %SAVESTR:MASTER,\ MAX_NAME_LEN\ \+\ 8,LEFT%\ %"",8,LEFT%\ LV\{CFLAG:MASTER:9,\ MAX_LV_LEN,RIGHT\}\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '14',
        any: [
          /^\s*;キャラの番号、名前の文字数、レベル、攻撃、防御の最大桁数をそれぞれ取得\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '15',
        any: [
          /^\s*MAX_NUM_LEN\ =\ STRLENS\(TOSTR\(\(NO_PAGE\+1\)\*NUM_PAGE\)\);番号\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '16-21',
        any: [
          /^\s*MAX_DEF_LEN\ =\ MAX\ \(STRLENS\(TOSTR\(CFLAG:COUNT:14\)\),\ MAX_DEF_LEN\);防御\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '22-24',
        any: [
          /^\s*PRINTFORML\ %LOCALS,\ MAX_NUM_LEN\+2,\ RIGHT%\ \ %"你（可强化地下城）",\ MAX_NAME_LEN\ \+\ 8,LEFT%LV\{CFLAG:0:9,\ MAX_LV_LEN,RIGHT\}\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '23-32',
        any: [
          /^\s*PRINTFORML\ %LOCALS,\ MAX_NUM_LEN\+2,\ RIGHT%\ \ %SAVESTR:MASTER,\ MAX_NAME_LEN\ \+\ 8,LEFT%\ %"",8,LEFT%\ LV\{CFLAG:MASTER:9,\ MAX_LV_LEN,RIGHT\}\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '23-27',
        any: [
          /^\s*PRINTFORML\ %LOCALS,\ MAX_NUM_LEN\+2,\ RIGHT%\ \ %"你（可强化地下城）",\ MAX_NAME_LEN\ \+\ 8,LEFT%LV\{CFLAG:0:9,\ MAX_LV_LEN,RIGHT\}\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '24',
        any: [
          /^\s*PRINTFORML\ %LOCALS,\ MAX_NUM_LEN\+2,\ RIGHT%\ \ %"你（可强化地下城）",\ MAX_NAME_LEN\ \+\ 8,LEFT%LV\{CFLAG:0:9,\ MAX_LV_LEN,RIGHT\}\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '28-29',
        any: [/^\s*ELSEIF\ MODE\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '31',
        any: [
          /^\s*PRINTFORML\ %LOCALS,\ MAX_NUM_LEN\+2,\ RIGHT%\ \ %SAVESTR:MASTER,\ MAX_NAME_LEN\ \+\ 8,LEFT%\ %"",8,LEFT%\ LV\{CFLAG:MASTER:9,\ MAX_LV_LEN,RIGHT\}\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '34-88',
        any: [
          /^\s*PRINTFORM\ \ %SAVESTR:COUNT,MAX_NAME_LEN\ \+\ 8,LEFT%\ %GET_JOB_NAME\(COUNT\),8,LEFT%\ LV\{CFLAG:COUNT:9,MAX_LV_LEN,RIGHT\}\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '36-38',
        any: [/^\s*IF\ COUNT\ >=\ CHARANUM\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '37',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '42-44',
        any: [
          /^\s*PRINTFORM\ \ %SAVESTR:COUNT,MAX_NAME_LEN\ \+\ 8,LEFT%\ %GET_JOB_NAME\(COUNT\),8,LEFT%\ LV\{CFLAG:COUNT:9,MAX_LV_LEN,RIGHT\}\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '46-85',
        any: [
          /^\s*SIF\ TALENT:COUNT:190\ !=\ 0\ \|\|\ TALENT:COUNT:191\ !=\ 0\ \|\|\ TALENT:COUNT:192\ !=\ 0\ \|\|\ TALENT:COUNT:193\ !=\ 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '47-59',
        any: [/^\s*ELSEIF\ TALENT:COUNT:淫乱\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '48',
        any: [/^\s*SETCOLOR\ 255,100,100\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '52',
        any: [/^\s*SETCOLOR\ 255,100,100\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '56',
        any: [/^\s*SETCOLOR\ 100,100,100\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '62-66',
        any: [/^\s*IF\ CFLAG:COUNT:700\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '63',
        any: [/^\s*PRINTFORM\ \ \[☆\]\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '65',
        any: [/^\s*PRINTS\ "\ "\*5\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '67-68',
        any: [
          /^\s*SIF\ CFLAG:COUNT:1\ ==\ 0\ \&\&CFLAG:COUNT:0\ >\ 0\ \&\&\ COUNT\ !=\ 0\ \&\&\ BASE:COUNT:0\ >\ 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '69-70',
        any: [
          /^\s*SIF\ CFLAG:COUNT:1\ ==\ 0\ \&\&CFLAG:COUNT:0\ ==\ 2\ \&\&\ COUNT\ !=\ 0\ \&\&\ BASE:COUNT:0\ >\ 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '71-72',
        any: [
          /^\s*SIF\ TALENT:COUNT:190\ !=\ 0\ \|\|\ TALENT:COUNT:191\ !=\ 0\ \|\|\ TALENT:COUNT:192\ !=\ 0\ \|\|\ TALENT:COUNT:193\ !=\ 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '73-80',
        any: [
          /^\s*IF\ TALENT:COUNT:153\ !=\ 0\ \|\|\ TALENT:COUNT:341\ !=\ 0\ \|\|\ TALENT:COUNT:342\ !=\ 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '73',
        any: [/^\s*SETCOLOR\ 100,255,100\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '81-85',
        any: [/^\s*IF\ CFLAG:COUNT:1\ ==\ 12\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '82',
        any: [/^\s*SETCOLOR\ 100,200,100\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '95-141',
        any: [
          /^\s*SIF\ TALENT:ARG:190\ !=\ 0\ \|\|\ TALENT:ARG:191\ !=\ 0\ \|\|\ TALENT:ARG:192\ !=\ 0\ \|\|\ TALENT:ARG:193\ !=\ 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '97',
        any: [
          /^\s*PRINTFORM\ \[\{ARG,2\}\]\ %SAVESTR:ARG,12,LEFT%\ %GET_JOB_NAME\(ARG\),8,LEFT%\ LV\{CFLAG:ARG:9,4,RIGHT\}\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '99-139',
        any: [
          /^\s*SIF\ TALENT:ARG:190\ !=\ 0\ \|\|\ TALENT:ARG:191\ !=\ 0\ \|\|\ TALENT:ARG:192\ !=\ 0\ \|\|\ TALENT:ARG:193\ !=\ 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '100-112',
        any: [/^\s*ELSEIF\ TALENT:ARG:淫乱\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '115-120',
        any: [/^\s*IF\ CFLAG:COUNT:700\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '116',
        any: [/^\s*IF\ CFLAG:COUNT:700\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '117',
        any: [/^\s*PRINTFORM\ \ \[☆\]\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '121-122',
        any: [
          /^\s*SIF\ CFLAG:ARG:1\ ==\ 0\ \&\&CFLAG:ARG:0\ >\ 0\ \&\&\ ARG\ !=\ 0\ \&\&\ BASE:ARG:0\ >\ 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '123-124',
        any: [
          /^\s*SIF\ CFLAG:ARG:1\ ==\ 0\ \&\&CFLAG:ARG:0\ ==\ 2\ \&\&\ ARG\ !=\ 0\ \&\&\ BASE:ARG:0\ >\ 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '125-126',
        any: [
          /^\s*SIF\ TALENT:ARG:190\ !=\ 0\ \|\|\ TALENT:ARG:191\ !=\ 0\ \|\|\ TALENT:ARG:192\ !=\ 0\ \|\|\ TALENT:ARG:193\ !=\ 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '127',
        any: [/^\s*SETCOLOR\ 100,255,100\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '127-134',
        any: [
          /^\s*IF\ TALENT:COUNT:153\ !=\ 0\ \|\|\ TALENT:COUNT:341\ !=\ 0\ \|\|\ TALENT:COUNT:342\ !=\ 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '128-135',
        any: [
          /^\s*IF\ TALENT:COUNT:153\ !=\ 0\ \|\|\ TALENT:COUNT:341\ !=\ 0\ \|\|\ TALENT:COUNT:342\ !=\ 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '135-139',
        any: [/^\s*IF\ CFLAG:COUNT:1\ ==\ 12\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '136',
        any: [/^\s*SETCOLOR\ 100,200,100\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '144-161',
        any: [
          /^\s*IF\ CFLAG:COUNT:1\ ==\ 2\ \&\&\ COUNT\ !=\ MASTER\ \&\&\ BASE:COUNT:0\ >\ 0\ \&\&\ T_LCOUNT\ <\ \(NO_PAGE\ \+\ 1\)\*NUM_PAGE\ \+\ 1\ \&\&\ T_LCOUNT\ >=\ NO_PAGE\*\ NUM_PAGE\ \+\ 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '152',
        any: [
          /^\s*IF\ CFLAG:COUNT:1\ ==\ 2\ \&\&\ COUNT\ !=\ MASTER\ \&\&\ BASE:COUNT:0\ >\ 0\ \&\&\ T_LCOUNT\ <\ \(NO_PAGE\ \+\ 1\)\*NUM_PAGE\ \+\ 1\ \&\&\ T_LCOUNT\ >=\ NO_PAGE\*\ NUM_PAGE\ \+\ 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '153',
        any: [/^\s*CALL\ LIFE_LIST_ITEM_E\(COUNT\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '163-176',
        any: [
          /^\s*SIF\ CFLAG:COUNT:1\ ==\ 2\ \&\&\ COUNT\ !=\ 0\ \&\&\ BASE:COUNT:0\ >\ 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '165',
        any: [/^\s*LOCAL\ =\ 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '167',
        any: [
          /^\s*SIF\ CFLAG:COUNT:1\ ==\ 2\ \&\&\ COUNT\ !=\ 0\ \&\&\ BASE:COUNT:0\ >\ 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '168',
        any: [/^\s*LOCAL\+\+\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '170-174',
        any: [/^\s*LOCAL\ =\ \(\ LOCAL\ \/\ NUM_PAGE\ \)\ \+\ 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '178-197',
        any: [
          /^\s*IF\ \(CFLAG:COUNT:1\ ==\ 0\ \|\|\ CFLAG:COUNT:1\ ==\ 3\ \|\|\ CFLAG:COUNT:1\ ==\ 5\ \|\|\ CFLAG:COUNT:1\ ==\ 6\ \|\|\ CFLAG:COUNT:1\ ==\ 7\ \|\|\ CFLAG:COUNT:1\ ==\ 10\)\ \&\&\ COUNT\ !=\ 0\ \&\&\ BASE:COUNT:0\ >\ 0\ \&\&\ T_LCOUNT\ <\ \(NO_PAGE\ \+\ 1\)\*NUM_PAGE\ \+\ 1\ \&\&\ T_LCOUNT\ >=\ NO_PAGE\*\ NUM_PAGE\ \+\ 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '186-187',
        any: [/^\s*SIF\ COUNT\ ==\ MASTER\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '188',
        any: [
          /^\s*IF\ \(CFLAG:COUNT:1\ ==\ 0\ \|\|\ CFLAG:COUNT:1\ ==\ 3\ \|\|\ CFLAG:COUNT:1\ ==\ 5\ \|\|\ CFLAG:COUNT:1\ ==\ 6\ \|\|\ CFLAG:COUNT:1\ ==\ 7\ \|\|\ CFLAG:COUNT:1\ ==\ 10\)\ \&\&\ COUNT\ !=\ 0\ \&\&\ BASE:COUNT:0\ >\ 0\ \&\&\ T_LCOUNT\ <\ \(NO_PAGE\ \+\ 1\)\*NUM_PAGE\ \+\ 1\ \&\&\ T_LCOUNT\ >=\ NO_PAGE\*\ NUM_PAGE\ \+\ 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '189',
        any: [/^\s*CALL\ LIFE_LIST_ITEM_E\(COUNT\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '199-212',
        any: [
          /^\s*SIF\ \(CFLAG:COUNT:1\ ==\ 0\ \|\|\ CFLAG:COUNT:1\ ==\ 3\ \|\|\ CFLAG:COUNT:1\ ==\ 5\ \|\|\ CFLAG:COUNT:1\ ==\ 6\ \|\|\ CFLAG:COUNT:1\ ==\ 7\ \|\|\ CFLAG:COUNT:1\ ==\ 10\)\ \&\&\ COUNT\ !=\ 0\ \&\&\ BASE:COUNT:0\ >\ 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '201',
        any: [/^\s*LOCAL\ =\ 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '203',
        any: [
          /^\s*SIF\ \(CFLAG:COUNT:1\ ==\ 0\ \|\|\ CFLAG:COUNT:1\ ==\ 3\ \|\|\ CFLAG:COUNT:1\ ==\ 5\ \|\|\ CFLAG:COUNT:1\ ==\ 6\ \|\|\ CFLAG:COUNT:1\ ==\ 7\ \|\|\ CFLAG:COUNT:1\ ==\ 10\)\ \&\&\ COUNT\ !=\ 0\ \&\&\ BASE:COUNT:0\ >\ 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '204',
        any: [/^\s*LOCAL\+\+\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '214-276',
        any: [
          /^\s*PRINTFORM\ \[\{ARG,2\}\]\ %SAVESTR:ARG,12,LEFT%\ %GET_JOB_NAME\(ARG\),8,LEFT%\ LV\{CFLAG:ARG:9,4,RIGHT\}\ \ 调教回数:\{CFLAG:ARG:10,3,LEFT\}\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '219',
        any: [
          /^\s*LOCALS\ =\ \[%GET_LOOK_INFO\(ARG,\ "种族"\)%\ \-\ %GET_LOOK_INFO\(ARG,\ "性格"\)%\]\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '223-235',
        any: [/^\s*ELSEIF\ TALENT:ARG:淫乱\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '237-244',
        any: [/^\s*ELSEIF\ !TALENT:ARG:122\ \&\&\ TALENT:ARG:121\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '248',
        any: [/^\s*PRINT\ \[☆\]\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '257',
        any: [/^\s*SETCOLOR\ 100,255,100\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '257-268',
        any: [
          /^\s*IF\ TALENT:COUNT:153\ !=\ 0\ \|\|\ TALENT:COUNT:341\ !=\ 0\ \|\|\ TALENT:COUNT:342\ !=\ 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '258-268',
        any: [
          /^\s*IF\ TALENT:COUNT:153\ !=\ 0\ \|\|\ TALENT:COUNT:341\ !=\ 0\ \|\|\ TALENT:COUNT:342\ !=\ 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '269-273',
        any: [/^\s*IF\ CFLAG:COUNT:1\ ==\ 12\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '270',
        any: [/^\s*SETCOLOR\ 100,200,100\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/LIFE_LIST.ERB',
        ref: '278-292',
        any: [/^\s*;はいかいいえを選択するだけの関数です\s*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        cite: true, // 消费方调用点：只证引用在场
        ref: '502',
        any: [/^\s*CALL LIFE_LIST_ITEM\(COUNT\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        cite: true, // 消费方调用点：只证引用在场
        ref: '608',
        any: [/^\s*CALL LIFE_LIST,NO_PAGE\s*$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
