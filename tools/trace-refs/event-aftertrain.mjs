// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：event-aftertrain.mjs

export const FILES = [
  {
    js: 'ere/event/event-aftertrain.js',
    refs: [
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '6-92',
        any: [/@CHARADEAD_CHECK/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '100-128',
        any: [/TARGET/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '140-250',
        any: [/@AFTERTRAIN_SEX_CHECK/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '255-349',
        any: [/@AFTERTRAIN_ANALSEX_CHECK/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '354-546',
        any: [/TALENT:121/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '551-703',
        any: [/@AFTERTRAIN_MASTURBATION_CHECK/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '708-842',
        any: [/@AFTERTRAIN_BEASTSEX_CHECK/],
      },
      // #270：三处与源对齐的内联行号
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '231-232',
        any: [/^TFLAG:13 = 4$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '480-481',
        any: [/^TFLAG:13 = 2$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '669-670',
        any: [/^TFLAG:13 = 1$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '837',
        any: [/^\tJUEL:8 \+= A\*200$/m],
      },
      // #236：K5 SELF_KOJO 读 leftover S（性交次数 :6223 / 卖出价 :6250）
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6223',
        any: [/SIF s >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6250',
        any: [/Sは売却値/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '11-13',
        any: [/^\s*EX_FLAG:2807 = 170\s*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '16-17',
        any: [/^\s*SIF BASE:0 > 0\s*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '19-24',
        any: [/^\s*;瀕死時に調教を自動終了\s*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '26-61',
        any: [/^\s*;mowangsiwang\s*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '28-31',
        any: [/^\s*IF !EX_FLAG:3\s*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '33',
        any: [/^\s*CALL MAOU_KOUHO\s*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '39-58',
        any: [
          /^\s*IF EX_FLAG:3 != GETCHARA\(17\) && \(EX_FLAG:3 == PLAYER \|\| EX_FLAG:3 == ASSI\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '68-73',
        any: [/^\s*IF !TEMP \|\| TEMP == GETCHARA\(17\)\s*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '76',
        any: [/^\s*BASE:0 = -1\s*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '78-80',
        any: [/^\s*;死亡フラグを残す\s*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '82-83',
        any: [/^\s*;キャラの殺害回数に加算\s*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '86-90',
        any: [/^\s*;殺した人数が3人以上で、【威圧感】が付く\s*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '92',
        any: [/^\s*RETURN 1, TEMP\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '339',
        any: [/^\s*CALL CHARADEAD_CHECK\s*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '63-67',
        any: [/^\s*;死亡時口上\s*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '68-75',
        any: [/^\s*IF !TEMP \|\| TEMP == GETCHARA\(17\)\s*$/m],
      },
      // —— #548 返工（BASE:0 = -1 的钳制说明引到的三条 @EVENTEND 判死判据）——
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '357',
        any: [/^IF FLAG:37 && BASE:0 > 0$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '364',
        any: [/^IF BASE:0 < 1 && TARGET != MASTER$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '376',
        any: [/^ELSEIF \(BASE:0 < 1 \|\| BASE:1 < 1\) && TARGET == MASTER$/m],
      },
      // —— #597 空行普查：两处「回到床上做了…」之后的空源码行（229 / 332）
      //    本身无法做锚（空行没有内容），各按所在切片用紧邻的可鉴别行锚定 ——
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '229-231',
        any: [/^[ \t]*TFLAG:13 = 4[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '332-333',
        any: [/^[ \t]*PRINTFORML %EXPNAME:1%＋\{S\}[ \t]*$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
