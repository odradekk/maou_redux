// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #396（N12 段 3）：陷阱商店 @ITEM_SHOP_TRAP / @SALEITEM_CHECK_TRAP。
//
// 每条 ref 一对应绘制段与在售标志段：正整数锚取自该段里全文唯一的
// 源行（含正文，非裸命令），行号漂了即红。

export const FILES = [
  {
    js: 'ere/page/page-shop-trap.js',
    refs: [
      // :7-70（锚在源文件第 24 行）
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '7-70',
        any: [/^\s*PRINTFORML \[陷阱Lv:\{FLAG:85\}\]\s*$/m],
      },
      // :10（锚在源文件第 10 行）
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '10',
        any: [/^\s*CUSTOMDRAWLINE =\s*$/m],
      },
      // :10-12（锚在源文件第 11 行）
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '10-12',
        any: [/^\s*PRINTL 《可以购买在地下城里布置的陷阱》\s*$/m],
      },
      // :11（锚在源文件第 11 行）
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '11',
        any: [/^\s*PRINTL 《可以购买在地下城里布置的陷阱》\s*$/m],
      },
      // :13-19（锚在源文件第 13 行）
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '13-19',
        any: [/^\s*PRINTV DAY\+1\s*$/m],
      },
      // :21（锚在源文件第 21 行）
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '21',
        any: [/^\s*PRINTFORML \[所持金:\{MONEY\}点\]\s*$/m],
      },
      // :23（锚在源文件第 23 行）
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '23',
        any: [/^\s*SETCOLORBYNAME LightSalmon\s*$/m],
      },
      // :23-26（锚在源文件第 24 行）
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '23-26',
        any: [/^\s*PRINTFORML \[陷阱Lv:\{FLAG:85\}\]\s*$/m],
      },
      // :27-38（锚在源文件第 28 行）
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '27-38',
        any: [/^\s*FOR ICOUNT_A,60,92\s*$/m],
      },
      // :28（锚在源文件第 28 行）
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '28',
        any: [/^\s*FOR ICOUNT_A,60,92\s*$/m],
      },
      // :29（锚在源文件第 29 行）
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '29',
        any: [/^\s*SIF ITEM:ICOUNT_A == 0\s*$/m],
      },
      // :31（锚在源文件第 31 行）
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '31',
        any: [
          /^\s*PRINTFORM \[%ITEMNAME:ICOUNT_A \+ @"\(x\{ITEM:ICOUNT_A\}\)",16,LEFT%\]\s*$/m,
        ],
      },
      // :33（锚在源文件第 33 行）
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '33',
        any: [/^\s*IF ICOUNT_B % 5 == 0\s*$/m],
      },
      // :39（锚在源文件第 39 行）
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '39',
        any: [/^\s*SETCOLORBYNAME LightSalmon\s*$/m],
      },
      // :39-41（锚在源文件第 40 行）
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '39-41',
        any: [/^\s*PRINTFORML \[戒指\]\s*$/m],
      },
      // :42-53（锚在源文件第 43 行）
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '42-53',
        any: [/^\s*FOR ICOUNT_A,300,321\s*$/m],
      },
      // :43（锚在源文件第 43 行）
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '43',
        any: [/^\s*FOR ICOUNT_A,300,321\s*$/m],
      },
      // :46（锚在源文件第 46 行）
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '46',
        any: [
          /^\s*PRINTFORM \[%ITEMNAME:ICOUNT_A \+ @"\(x\{ITEM:ICOUNT_A\}\)",16,LEFT%\]\s*$/m,
        ],
      },
      // :48（锚在源文件第 48 行）
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '48',
        any: [/^\s*IF ICOUNT_B % 5 == 0\s*$/m],
      },
      // :55-57（锚在源文件第 57 行）
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '55-57',
        any: [/^\s*CALL SALEITEM_CHECK_TRAP\s*$/m],
      },
      // :57（锚在源文件第 57 行）
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '57',
        any: [/^\s*CALL SALEITEM_CHECK_TRAP\s*$/m],
      },
      // :59（锚在源文件第 59 行）
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '59',
        any: [/^\s*TFLAG:15 = MONEY\s*$/m],
      },
      // :61（锚在源文件第 61 行）
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '61',
        any: [/^\s*\$INPUT_LOOP\s*$/m],
      },
      // :63（锚在源文件第 63 行）
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '63',
        any: [/^\s*PRINT_SHOPITEM\s*$/m],
      },
      // :65-70（锚在源文件第 65 行）
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '65-70',
        any: [/^\s*PRINTL 《请输入要购买陷阱的编号》\s*$/m],
      },
      // :68-69（锚在源文件第 68 行）
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '68-69',
        any: [/^\s*PRINTLC \[997\] - 普通物品\s*$/m],
      },
      // :75-128（锚在源文件第 112 行）
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '75-128',
        any: [/^\s*SIF TALENT:MASTER:328 == 0\s*$/m],
      },
      // 跨文件引用：本文件头说明「进商店只有两条路」时引了 @SHOW_SHOP 的
      // BOUGHT 跳转段与 @USERSHOP 的 998 键（源文件与上一条不同）
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '25-30',
        any: [/^IF BOUGHT >= 0 && BOUGHT < 54$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '47-50',
        any: [/^ELSEIF RESULT == 998 && BOUGHT >= 0$/m],
      },
      // :77-94（锚在源文件第 77 行）
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '77-94',
        any: [/^\s*ITEMSALES:60 = 1\s*$/m],
      },
      // :96-105（锚在源文件第 96 行）
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '96-105',
        any: [/^\s*IF TALENT:0:327 == 1\s*$/m],
      },
      // :96-109（锚在源文件第 96 行）
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '96-109',
        any: [/^\s*IF TALENT:0:327 == 1\s*$/m],
      },
      // :106-109（锚在源文件第 108 行）
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '106-109',
        any: [/^\s*ITEMSALES:54 = 1\s*$/m],
      },
      // :112-113（锚在源文件第 112 行）
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '112-113',
        any: [/^\s*SIF TALENT:MASTER:328 == 0\s*$/m],
      },
      // :116-120（锚在源文件第 116 行）
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '116-120',
        any: [/^\s*IF TALENT:MASTER:328 == 1\s*$/m],
      },
      // :123（锚在源文件第 123 行）
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '123',
        any: [/^\s*ITEMSALES:91 = 1\s*$/m],
      },
      // :125-126（锚在源文件第 125 行）
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '125-126',
        any: [/^\s*SIF FLAG:85 < CFLAG:0:9\s*$/m],
      },
    ],
  },
];

export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {};
