// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：page-shop.mjs

export const FILES = [
  // —— #46（口上切片：K3 高貴 + K5 マオ）——
  {
    js: 'ere/page/page-shop.js',
    refs: [
      // @EVENTSHOP 自身（#46 起挂事件链，普通档；EVENT_K.ERB 的 #PRI 档在
      // kojo-system.js——见下一条目）
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '4-20',
        any: [/^@EVENTSHOP/m, /REPEAT 100/],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '7-12',
        any: [/バグ対策/],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '15-18',
        any: [/ITEMSALES:COUNT = 0/],
      },
      // #180：102 分支接 DUNGEON_INFO2 真身（原豁免条目 '108' 随引用
      // 改写为 108-109 而消化，豁免清单同步删）
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '108-109',
        any: [/^ELSEIF RESULT == 102$/m, /^CALL DUNGEON_INFO2$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
