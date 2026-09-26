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
    //（105 已真身化），故 89-142 / 144-178 两条锚一并撤掉。输出比对工具删除
    //（#640）后，指向其样本文件（replay-b.js / normalize.js / compare-scope-b）
    // 的四条锚随之撤掉，只留 ere/ 侧两条。
    {
      js: 'ere/utils/display-width.js',
      refs: [
        {
          ref: '124',
          any: [/调教自慰:/],
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
