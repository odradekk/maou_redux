// 源: tools/trace-check.mjs @FILES（issue #338：SELL_MATURO_K0 全文）

export const FILES = [
  {
    js: 'ere/system/stronghold/sell-maturo-k0.js',
    refs: [
      {
        src: 'target/ERB/售卻相關/SELL_MATURO.ERB',
        ref: '29-2099',
        any: [/^@SELL_MATURO_K0$/m],
      },
    ],
  },
];

export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {
  'sale-natural': [
    // #397 返工：rules.js 的 sale 段规则不再按行号兜底「能力提升画面未移植」
    //（105 已真身化），故这里的 89-142 / 144-178 两条锚一并撤掉；下面这四条
    // 是新引入的样本行引用（播种与归因的证据出处）。
    {
      js: 'tools/compare/replay-b.js',
      refs: [
        {
          ref: '95',
          any: [/弓手\s+LV\s+1/],
        },
      ],
    },
    {
      js: 'ere/utils/display-width.js',
      refs: [
        {
          ref: '124',
          any: [/调教自慰:/],
        },
      ],
    },
    {
      js: 'tools/compare/normalize.js',
      refs: [
        {
          ref: '178',
          any: [/^═$/m],
        },
      ],
    },
    {
      js: 'test/compare-scope-b.test.js',
      refs: [
        {
          ref: '178',
          any: [/^═$/m],
        },
      ],
    },
    {
      js: 'tools/compare/replay-b.js',
      refs: [
        {
          ref: '177-219',
          any: [/温妮能卖出14430点的样子。/],
        },
      ],
    },
    // #562：能力提升画面的表头证据——两个 PRINTBUTTON 一行（:52-53 由 :56 的
    // PRINTL 收尾），与 :61 的分割线、:63 的标题行逐行相邻，中间没有空行
    {
      js: 'ere/page/page-ability-up.js',
      refs: [
        {
          ref: '88-93',
          any: [/▌奴隶一览/],
        },
      ],
    },
    {
      js: 'test/page-ability-up.test.js',
      refs: [
        {
          ref: '88-93',
          any: [/▌奴隶一览/],
        },
      ],
    },
  ],
};
