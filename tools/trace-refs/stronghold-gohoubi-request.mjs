// 源: tools/trace-check.mjs  @FILES
// issue #397（N13 据点列表与裁缝）新增：ere/system/stronghold/gohoubi-request.js ↔ target/ERB/SHOP/SHOP_2.ERB
// 本票逐行标注了原作的 :N 出处，锚按「所引行首个非空行的整行字面量」生成
// （逐条在场校验 + 源侧锚校验由 trace-check 执行）。

export const FILES = [
  {
    js: 'ere/system/stronghold/gohoubi-request.js',
    refs: [
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '508',
        any: [/^\s*CALL\ GOHOUBI_REQUEST,\ SELECT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '661-691',
        any: [
          /^\s*IF\ WISH\ ==\ 6\ \&\&\ !TALENT:MASTER:121\ \&\&\ !TALENT:MASTER:122\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '663',
        any: [/^\s*\#DIM\ WISH\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '668',
        any: [/^\s*SELECT\ =\ ARG:0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '670-671',
        any: [/^\s*IF\ TALENT:SELECT:136\ ==\ 1\ \&\&\ RAND:3\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '670-681',
        any: [
          /^\s*IF\ WISH\ ==\ 6\ \&\&\ !TALENT:MASTER:121\ \&\&\ !TALENT:MASTER:122\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '672-673',
        any: [/^\s*ELSEIF\ TALENT:SELECT:85\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '674-676',
        any: [
          /^\s*IF\ WISH\ ==\ 6\ \&\&\ !TALENT:MASTER:121\ \&\&\ !TALENT:MASTER:122\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '677-678',
        any: [/^\s*ELSEIF\ TALENT:SELECT:76\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '679-680',
        any: [/^\s*WISH\ =\ 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '684',
        any: [/^\s*CFLAG:SELECT:504\ =\ WISH\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '685',
        any: [/^\s*A\ =\ SELECT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '687',
        any: [/^\s*CALL\ GOHOUBI_REQUEST_KOUJO\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '689',
        any: [/^\s*A\ =\ 0\s*$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
