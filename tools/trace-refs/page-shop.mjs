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
      // BOUGHT 落点（#395）：@EVENTFIRST 的初始化（与 @EVENTSHOP 的 :20 同一
      // 变量，见文件头 BOUGHT 段）
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '27',
        any: [/^BOUGHT = -1$/m],
      },
      // 199 休息（#395 起真身：唯一的到站分支，见文件头 BOUGHT 段旁注）
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '134-139',
        any: [/^\tFLAG:9 \+= 5\n\tBEGIN TURNEND\n\tRETURN 1$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
