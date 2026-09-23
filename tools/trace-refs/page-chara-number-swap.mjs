// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #545：page-chara-number-swap.js 的锚表（角色編號交換.ERB 全 1 函数
// @換號，:1-127）。两份列表（第一屏 :12-30 / 第二屏 :60-81）同构，靠缩进
// 深度区分的锚逐条 unique，FOR/对象注释一类完全同文本的锚按 ident_payload 计。
const SWAP = 'target/ERB/魔改新增/角色編號交換.ERB';

export const FILES = [
  {
    js: 'ere/page/page-chara-number-swap.js',
    refs: [
      { src: SWAP, ref: '1-127', any: [/^\uFEFF?@換號\s*$/m] },
      { src: SWAP, ref: '5', any: [/^#DIM NO_PAGE = 0\s*$/m] },
      { src: SWAP, ref: '7', any: [/^#DIM CONST NUM_PAGE = 25\s*$/m] },
      {
        src: SWAP,
        ref: '10',
        any: [/^\tPRINTFORML 交换角色的排序编号/m],
      },
      {
        src: SWAP,
        ref: '11',
        any: [/^\tPRINTFORML 请先选择要变换排序的角色\s*$/m],
      },
      { src: SWAP, ref: '8-51', any: [/^\$换号页\s*$/m] },
      { src: SWAP, ref: '8-36', any: [/^\$换号页\s*$/m] },
      { src: SWAP, ref: '12', any: [/^\t*FOR COUNT, NO_PAGE\*NUM_PAGE \+ 1/m] },
      { src: SWAP, ref: '60', any: [/^\t*FOR COUNT, NO_PAGE\*NUM_PAGE \+ 1/m] },
      {
        src: SWAP,
        ref: '12-15',
        any: [/^\t\tIF COUNT >= CHARANUM\s*$/m],
      },
      {
        src: SWAP,
        ref: '60-63',
        any: [/^\t\t\t\tIF COUNT >= CHARANUM\s*$/m],
      },
      { src: SWAP, ref: '16-18', any: [/对象是魔王剃除/m] },
      { src: SWAP, ref: '14', any: [/^\s*PRINTL\s*$/m] },
      { src: SWAP, ref: '62', any: [/^\s*PRINTL\s*$/m] },
      { src: SWAP, ref: '31', any: [/^\s*PRINTL\s*$/m] },
      { src: SWAP, ref: '32', any: [/^\s*PRINTL\s*$/m] },
      { src: SWAP, ref: '33', any: [/^\t\tPRINTLC \[2000\] 上一页\s*$/m] },
      { src: SWAP, ref: '34', any: [/^\t\tPRINTLC \[2001\] 下一页\s*$/m] },
      {
        src: SWAP,
        ref: '35',
        any: [/^\s*PRINTLC \[1999\] 結束换号\s*$/m],
      },
      { src: SWAP, ref: '36', any: [/^\s*INPUT\s*$/m] },
      {
        src: SWAP,
        ref: '20',
        any: [/^\t\tIF \(CFLAG:COUNT:1 == 0 \|\| CFLAG:COUNT:1 == 7\)/m],
      },
      {
        src: SWAP,
        ref: '71',
        any: [/^\t\t\t\tIF \(CFLAG:COUNT:1 == 0 \|\| CFLAG:COUNT:1 == 7\)/m],
      },
      {
        src: SWAP,
        ref: '21',
        any: [/^\t\t\tPRINTFORM \[\{COUNT,3,RIGHT\}\]/m],
      },
      {
        src: SWAP,
        ref: '72',
        any: [/^\t{5}PRINTFORM \[\{COUNT,3,RIGHT\}\]/m],
      },
      { src: SWAP, ref: '22-27', any: [/^\t\t\tIF SP\(COUNT\)\s*$/m] },
      { src: SWAP, ref: '38-43', any: [/^\s*CASE 2000 ;上一页\s*$/m] },
      { src: SWAP, ref: '44-49', any: [/^\s*CASE 2001 ;下一页\s*$/m] },
      {
        src: SWAP,
        ref: '45',
        any: [/^\t\t\tIF \(NO_PAGE\+1\) \* NUM_PAGE <= CHARANUM\s*$/m],
      },
      { src: SWAP, ref: '50-51', any: [/^\s*CASE 1999\s*$/m] },
      {
        src: SWAP,
        ref: '53-56',
        any: [/^\s*IF RESULT > 0 && RESULT <= CHARANUM\s*$/m],
      },
      { src: SWAP, ref: '57-105', any: [/^\t\t\$换号页1\s*$/m] },
      {
        src: SWAP,
        ref: '59',
        any: [/^\t\tPRINTFORML 要跟那个角色换号呢？\s*$/m],
      },
      { src: SWAP, ref: '67-69', any: [/对象是角色1剃除/m] },
      { src: SWAP, ref: '82', any: [/^\s*PRINTL\s*$/m] },
      { src: SWAP, ref: '83', any: [/^\s*PRINTL\s*$/m] },
      { src: SWAP, ref: '84', any: [/^\t\t\tPRINTLC \[3000\] 上一页\s*$/m] },
      { src: SWAP, ref: '85', any: [/^\t\t\tPRINTLC \[3001\] 下一页\s*$/m] },
      { src: SWAP, ref: '86', any: [/^\s*INPUT\s*$/m] },
      {
        src: SWAP,
        ref: '88-93',
        any: [/^\s*CASE 3000 ;上一页\s*$/m],
      },
      {
        src: SWAP,
        ref: '88-99',
        any: [/^\s*CASE 3000 ;上一页\s*$/m],
      },
      { src: SWAP, ref: '94-99', any: [/^\s*CASE 3001 ;下一页\s*$/m] },
      {
        src: SWAP,
        ref: '100-103',
        any: [/^\s*CN:2 = RESULT\s*$/m],
      },
      {
        src: SWAP,
        ref: '106-110',
        any: [/^\t\tPRINTLC \[4000\] 是\s*$/m],
      },
      { src: SWAP, ref: '106', any: [/^\s*PRINTL\s*$/m] },
      {
        src: SWAP,
        ref: '107',
        any: [/^\t\tPRINTFORML %SAVESTR:\(CN:1\)%将与/m],
      },
      { src: SWAP, ref: '108', any: [/^\t\tPRINTLC \[4000\] 是\s*$/m] },
      { src: SWAP, ref: '109', any: [/^\t\tPRINTLC \[4001\] 否\s*$/m] },
      { src: SWAP, ref: '110', any: [/^\s*INPUT\s*$/m] },

      {
        src: SWAP,
        ref: '112-116',
        any: [/^\t\t\tSWAPCHARA \(CN:1\), \(CN:2\)\s*$/m],
      },
      { src: SWAP, ref: '117', any: [/^\t\t\tPRINTFORMW 已完成互换\s*$/m] },
      { src: SWAP, ref: '118', any: [/^\t\t\tTARGET = -1\s*$/m] },
      { src: SWAP, ref: '119', any: [/^\t\t\tASSI = -1\s*$/m] },
      { src: SWAP, ref: '120', any: [/^\t\t\tRESTART\s*$/m] },
      {
        src: SWAP,
        ref: '121-122',
        any: [/^\t\tELSEIF RESULT == 4001\s*$/m],
      },
      { src: SWAP, ref: '125-126', any: [/^\t\tELSE\s*$/m] },
      { src: SWAP, ref: '125-127', any: [/^\t\tRETURN 0\s*$/m] },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
