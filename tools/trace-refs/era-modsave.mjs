// 源: tools/trace-check.mjs  @FILES
// issue #547 新增：ere/era-utils/era-modsave.js 手写区补注里的读点引用
// （卖淫影响的售价明细/估价倍率读点，按区间引用以携带可辨的邻行锚；
// ABL.ERB:231 与 CONFIG.ERB:137-143 是路径限定写法，不经本表）。

export const FILES = [
  {
    js: 'ere/era-utils/era-modsave.js',
    refs: [
      {
        src: 'target/ERB/售卻相關/SELL_CHARA.ERB',
        ref: '318-323',
        any: [/IF A:37 > 0 *\n\tIF 卖淫影响 == 0\n\t\tPRINTFORML %ABLNAME:37/],
      },
      {
        src: 'target/ERB/售卻相關/SELL_CHARA.ERB',
        ref: '362-374',
        any: [/IF EXP:74 > 0 *\n\tIF 卖淫影响 == 0\n\t\tIF +TALENT:181/],
      },
      {
        src: 'target/ERB/售卻相關/SELL_CHARA_ESTIMATE.ERB',
        ref: '356-361',
        any: [/IF 卖淫影响 == 0\n\tS -= A:37/],
      },
      {
        src: 'target/ERB/售卻相關/SELL_CHARA_ESTIMATE.ERB',
        ref: '630-641',
        any: [/IF EXP:74 > 0 *\n\tIF 卖淫影响 == 0\n\t\tIF +TALENT:181/],
      },
      {
        src: 'target/ERB/售卻相關/SELL_CHARA_ESTIMATE.ERB',
        ref: '785-791',
        any: [/IF TALENT:180 && TALENT:181 == 0\n\tIF 卖淫影响 == 1/],
      },
    ],
  },
];

export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {};
