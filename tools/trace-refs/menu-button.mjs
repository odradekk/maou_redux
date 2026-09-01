// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：menu-button.mjs

export const FILES = [
  // —— #73（画面组件最小集与主菜单迁入）——
  {
    js: 'ere/page/components/menu-button.js',
    refs: [
      // 按钮明暗近似的外源（menu_button 自 page-main-menu.js 收敛，#73）
      {
        src: 'target/ERB/其他/DRAW_EXT_COMM.ERB',
        ref: '2',
        any: [/^@MENU_BUTTON/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
