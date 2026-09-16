// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：kojo-dungeon-after.mjs

export const FILES = [
  // —— #179 H10 战果口上分发：ere/kojo/kojo-dungeon-after.js ——
  {
    js: 'ere/kojo/kojo-dungeon-after.js',
    refs: [
      {
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '468-476',
        any: [/^\s*@GOHOUBI_AFTER_KOUJO$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '486-494',
        any: [/^\s*@OSIOKI_KOUJO$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '471-472',
        any: [/^;口上の存在判定/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '473',
        any: [/^\s*LOCAL\ =\ GET_KOJO_NUM\(\)$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '491',
        any: [/^\s*LOCAL\ =\ GET_KOJO_NUM\(\)$/m],
      },
      // #397（N13）冻结 @GOHOUBI_REQUEST_KOUJO 的调用面：包装层是占位，
      // 但签名与参数形状照它定死（本票交付物，见该文件头）
      {
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '450-466',
        any: [/^@GOHOUBI_REQUEST_KOUJO$/m],
      },
      {
        // 685/689 是**商店侧** @GOHOUBI_REQUEST 的全局 A 暂存（跨文件引用）
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        cite: true,
        ref: '685',
        any: [/^\s*A = SELECT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        cite: true,
        ref: '689',
        any: [/^\s*A = 0\s*$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
