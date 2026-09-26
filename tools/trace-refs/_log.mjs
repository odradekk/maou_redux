// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：_log.mjs

export const FILES = [];

export const LOG_REFS = [
  // 输出比对回放器的锚块随工具删除（#640）——其 log:N 引用登记的只是
  // 工具自己的证据注释。
  // test/compare-first-turn.test.js / test/compare-diff.test.js 的锚块随
  // 输出比对工具删除（#640）。
  {
    js: 'test/kojo-k3-noble.test.js',
    refs: [{ ref: '26', any: [/「哈呜、温妮、可是，一心地/] }],
  },
  {
    js: 'test/juel-check.test.js',
    refs: [
      {
        ref: '236-260',
        any: [/^调教结果：否定点数208个抵消。/m, /阴核点数：\s+3479/],
      },
    ],
  },
  // kojo-family-wiring 的 log 引用锚（第 26 行证据）随对拍段落改写删除（#640）。
  {
    // #282 注释自身的引用（本文件注释里写了 emuera.log 第26行，被完整性扫描
    // 扫到；登记后自洽）
    js: 'tools/trace-check.mjs',
    refs: [{ ref: '26', any: [/「哈呜、温妮、可是，一心地/] }],
  },
  {
    // #74：print_palam 换原生进度条后，条后数值仍以样本第二屏（回合后参数
    // 网格）为对齐证据
    js: 'test/page-train.test.js',
    refs: [
      {
        ref: '52-57',
        any: [/阴核\[\*{5}\.{5}\]\s+5540/, /局部\[\.{10}\]\s+0/],
      },
    ],
  },
  // pipeline.mjs 的 log 引用锚（第 34 行证据）随 M90（replay.js 播种条目）删除（#640）。
];

// 带样本名前缀的引用随 golden/ 样本与输出比对工具一并删除（#640），登记清空；
// 本目录整体由 #641 删除。（#642 曾登记 rules.js 的 mainmenu-natural-log:7-31
// 锚——rules.js 与 golden 均已随 #640 删除，登记不再保留。）
export const SAMPLE_LOG_REFS = {};
