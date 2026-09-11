// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：page-select-target.mjs

export const FILES = [
  {
    js: 'ere/page/page-select-target.js',
    refs: [
      // SHOP ver1.0.2.ERB @SELECT_TARGET
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '234-327',
        any: [/^@SELECT_TARGET$/m, /^GOTO INPUT_LOOP$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '242-254',
        any: [/^FOR COUNT, 0, CHARANUM$/m, /^MAX_PAGE--$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '256-327',
        any: [/^\$INPUT_LOOP$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '271-273',
        any: [/^CUSTOMDRAWLINE =$/m, /请魔王大人选择将要调教的奴隶人选/],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '275',
        any: [/^CALL SHOW_LIST_TRAINABLE\(NO_PAGE,NUM_PAGE,LIST_POS\)$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '276-279',
        any: [/表示人数が返ってくる/, /^IF RESULT < 1$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '280-285',
        any: [/^L_LCOUNT = LINECOUNT - L_LCOUNT$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '287-290',
        any: [/PRINTLC \[1000\] - 上一页/, /PRINTLC \[1001\] - 下一页/],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '293',
        any: [/^INPUT$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '294-296',
        any: [/^IF RESULT == 999$/m, /;戻る/],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '297-300',
        any: [/ELSEIF RESULT == 1002/, /^CALL MONSTER_PLAY$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '301-305',
        any: [/ELSEIF IS_TRAINABLE\(RESULT\) == 0/, /^FLAG:1 = TARGET /],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '306-310',
        any: [/ELSEIF IS_ASSISTABLE\(RESULT\) == 0/, /^FLAG:2 = ASSI /],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '311-316',
        any: [/ELSEIF RESULT == 1000/, /GOTO INPUT_LOOP/],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '317-322',
        any: [/ELSEIF RESULT == 1001/, /GOTO INPUT_LOOP/],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '323-327',
        any: [
          /ELSEIF RESULT < 0 \|\| RESULT >= CHARANUM/,
          /^GOTO INPUT_LOOP$/m,
        ],
      },
      // SHOP_FUNCTION.ERB 判定函数（SIF 实际行：109/111 与 120/122/124/126，
      // 含各自下一行的 RETURNF——工具首跑即证伪了「这侧本来就对」的印象）
      {
        src: 'target/ERB/SHOP/SHOP_FUNCTION.ERB',
        ref: '109-110',
        any: [/SIF ARG < 1 \|\| ARG >= CHARANUM \|\| ARG == MASTER/],
      },
      {
        src: 'target/ERB/SHOP/SHOP_FUNCTION.ERB',
        ref: '111-112',
        any: [/SIF CFLAG:ARG:1 != 0 ;調教中でないとダメ/],
      },
      {
        src: 'target/ERB/SHOP/SHOP_FUNCTION.ERB',
        ref: '120-121',
        any: [/SIF ARG < 1 \|\| ARG >= CHARANUM ;キャラ登録範囲外はダメ/],
      },
      {
        src: 'target/ERB/SHOP/SHOP_FUNCTION.ERB',
        ref: '122-123',
        any: [/SIF CFLAG:ARG:0 != 2 ;助手可能でないとダメ/],
      },
      {
        src: 'target/ERB/SHOP/SHOP_FUNCTION.ERB',
        ref: '124-125',
        any: [/SIF CFLAG:ARG:1 != 0 ;調教中でないとダメ/],
      },
      {
        src: 'target/ERB/SHOP/SHOP_FUNCTION.ERB',
        ref: '126-127',
        any: [/SIF TARGET == ARG ;調教対象はダメ/],
      },
      // SHOP_FUNCTION.ERB 富化列（#395）：两个列表函数本体 + 两个判定函数 + 取名函数
      {
        src: 'target/ERB/SHOP/SHOP_FUNCTION.ERB',
        ref: '7-53',
        any: [/^@SHOW_LIST_TRAINABLE\(NO_PAGE,NUM_PAGE,LIST_POS\)$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_FUNCTION.ERB',
        ref: '55-103',
        any: [/^@SHOW_LIST_ASSISTABLE\(NO_PAGE,NUM_PAGE,LIST_POS\)$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_FUNCTION.ERB',
        ref: '64-72',
        any: [/^\tIF IS_ASSISTABLE\(COUNT\) == 0$/m],
      },
      // T_LCOUNT 自增缺陷（只在渲染分支内自增，见文件头）：渲染守卫 + 自增本身
      {
        src: 'target/ERB/SHOP/SHOP_FUNCTION.ERB',
        ref: '66-96',
        any: [
          /^\t\tIF T_LCOUNT < \(NO_PAGE \+ 1\)\*NUM_PAGE \+ 1 && T_LCOUNT >= NO_PAGE\* NUM_PAGE \+ 1$/m,
          /^\t\tT_LCOUNT\+\+$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_FUNCTION.ERB',
        ref: '105-113',
        any: [/^@IS_TRAINABLE\(ARG\)$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_FUNCTION.ERB',
        ref: '116-128',
        any: [/^@IS_ASSISTABLE\(ARG\)$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_FUNCTION.ERB',
        ref: '131-175',
        any: [/^@GET_JOB_NAME\(ARG\)$/m],
      },
      // 注释掉的旧 FOR 循环（与 TALENTNAME 表无关，不移植）
      {
        src: 'target/ERB/SHOP/SHOP_FUNCTION.ERB',
        ref: '135-138',
        any: [/^;FOR LOCAL, 200, 229$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_FUNCTION.ERB',
        ref: '174',
        any: [/^RETURNF " "$/m],
      },
      // BOUGHT 落点共用的 @EVENTFIRST 初始化（page-shop.mjs 同款登记的同一行，这里
      // 不重复登记——参见 tools/trace-refs/page-shop.mjs 的 ref '27'）
      // —— @SELECT_ASSI 真身（#395）——
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '331-421',
        any: [/^@SELECT_ASSI$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '334',
        any: [/^#DIM NUM_PAGE = 13$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '339-352',
        any: [/^FOR COUNT, 0, CHARANUM$/m, /^MAX_PAGE--$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '353-421',
        any: [/^\$INPUT_LOOP$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '372',
        any: [/^CALL SHOW_LIST_ASSISTABLE\(NO_PAGE,NUM_PAGE,LIST_POS\)$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '374-376',
        any: [/表示人数が返ってくる/, /^IF RESULT < 1$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '384-387',
        any: [
          /PRINTLC \[999\] 我先想想…/,
          /PRINTLC \[1002\] 哇嘎嘎！我可是魔王！这次就由我自己亲自上阵！/,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '390',
        any: [/^INPUT$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '391-395',
        any: [/^IF RESULT == 1002$/m, /;助手は無し/],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '396-398',
        any: [/^ELSEIF RESULT == 999$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '399-403',
        any: [/ELSEIF IS_ASSISTABLE\(RESULT\) == 0/],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '404-409',
        any: [/ELSEIF RESULT == 1000\t\t;上一页/],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '410-415',
        any: [/ELSEIF RESULT == 1001\t\t;下一页/],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '416-421',
        any: [/ELSEIF RESULT < 0 \|\| RESULT >= CHARANUM/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
