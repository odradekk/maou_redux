// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：page-title.mjs

export const FILES = [
  // —— #63（ERB 侧完整性锁的登记示范：page-main-menu 原为零登记，
  //    实审 45 条查出 7 条错引用——状态行块整体偏早 4~5 行（:48→:53、
  //    :49→:54、:50-55→:55-59、:56-58→:60-62、:59-66→:64-71、:71→:72）
  //    与 :190-198 截尾（ELSE 兜底臂在 198-199），注释已订正；代码与
  //    正确行段一致，属注释烂、非移植缺陷。多来源：主源 DRAW_MAINMENU +
  //    按钮明暗 EXT_COMM + A 计数守卫 SHOP）——
  {
    // 标题画面（#69 新审计的引用：音乐与标题图接入；其余现有在豁免表）
    js: 'ere/page/page-title.js',
    refs: [
      // 标题音乐：音量无引擎等价物，值仅为存档保真播种（era-global）
      {
        src: 'target/ERB/SYSTEM/TITLE ver1.0.8.ERB',
        ref: '5',
        any: [/SETBGMVOLUME 标题音乐音量/],
      },
      // 标题图：HTML_PRINT <img src='TITLE'>（:22 旧引用偏早一行，#63 同款）
      {
        src: 'target/ERB/SYSTEM/TITLE ver1.0.8.ERB',
        ref: '23',
        any: [/img src='TITLE'/],
      },
      // 图下两个空行（旧引用 :23-24 同样偏早，随 #69 审计订正）
      {
        src: 'target/ERB/SYSTEM/TITLE ver1.0.8.ERB',
        ref: '26-27',
        any: [/^PRINTL\s*$/m],
      },
      // 离开标题停曲：新游戏（RESULT==1）与读档（RESULT==0）两分支
      {
        src: 'target/ERB/SYSTEM/TITLE ver1.0.8.ERB',
        ref: '95',
        any: [/^\s*STOPBGM\s*$/m],
      },
      {
        src: 'target/ERB/SYSTEM/TITLE ver1.0.8.ERB',
        ref: '105',
        any: [/^\s*STOPBGM\s*$/m],
      },
      // 读档调用后无条件 RESTART（#136：CALL SYSTEM_LOADGAME 的返回路径）
      {
        src: 'target/ERB/SYSTEM/TITLE ver1.0.8.ERB',
        ref: '110',
        any: [/^\s*RESTART\s*$/m],
      },
      // 【#642 删除】#596 的致辞按钮 PRINTL 锚（:67/:72）——致辞与展开/折叠钮
      // 整段删除，ere 侧注释里的 :67/:72 引用随之消失，在场检查不再过。
      // #596：信息行的行尾由 :76/:80 的 PRINTFORML 收掉（不是空行）
      {
        src: 'target/ERB/SYSTEM/TITLE ver1.0.8.ERB',
        ref: '74',
        any: [/^PRINTFORM %GAMEBASE_INFO%/m],
      },
      {
        src: 'target/ERB/SYSTEM/TITLE ver1.0.8.ERB',
        ref: '76',
        any: [/^\s*PRINTFORML\s*$/m],
      },
      {
        src: 'target/ERB/SYSTEM/TITLE ver1.0.8.ERB',
        ref: '77',
        any: [/^\s*PRINTFORM 版本推进出问题/m],
      },
      {
        src: 'target/ERB/SYSTEM/TITLE ver1.0.8.ERB',
        ref: '81',
        any: [/^\s*PRINTFORM 群里@Delicious或者小窗/m],
      },
      // #596：:86-87 的 PRINTFORML 只结束联系按钮那一行、DRAWLINE 紧随其后
      {
        src: 'target/ERB/SYSTEM/TITLE ver1.0.8.ERB',
        ref: '86-87',
        any: [/^\s*PRINTFORML\nDRAWLINE\s*$/m],
      },
      // #596 复核：作者/年份行之后的真空行来自 :41 的 PRINTL（旧注释写 :38，
      // 那一行是 PRINTFORML 作者行）
      {
        src: 'target/ERB/SYSTEM/TITLE ver1.0.8.ERB',
        ref: '41',
        any: [/^\s*PRINTL\s*$/m],
      },
      // 同处的作者行与年份行（:41 的解释引用了它们）
      {
        src: 'target/ERB/SYSTEM/TITLE ver1.0.8.ERB',
        ref: '38',
        any: [/^PRINTFORML %GAMEBASE_AUTHOR%/m],
      },
      {
        src: 'target/ERB/SYSTEM/TITLE ver1.0.8.ERB',
        ref: '39-40',
        any: [
          /^SIF STRLENS\(GAMEBASE_YEAR\) > 0\s*$/m,
          /^\s*PRINTFORML \(%GAMEBASE_YEAR%\)/m,
        ],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {
  'mainmenu-natural': [
    {
      js: 'ere/page/page-title.js',
      refs: [
        // #596：联系按钮行与分割线相邻（:32-33）；致辞按钮-信息行相邻
        // 的 :30-31 登记随名单整段删除（#642）移除
        {
          ref: '32-33',
          any: [/版本推进出问题/],
        },
      ],
    },
    {
      js: 'test/page-title.test.js',
      refs: [
        // #596：同上，联系行与分割线的相邻（#642 后标题画面唯一保留的
        // golden 相邻证据；断言说明见用例内注释）
        {
          ref: '32-33',
          any: [/版本推进出问题/],
        },
      ],
    },
  ],
};
