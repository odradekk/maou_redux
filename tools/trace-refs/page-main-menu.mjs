// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：page-main-menu.mjs

export const FILES = [
  {
    js: 'ere/page/page-main-menu.js',
    refs: [
      // @DRAW_MAINMENU 骨架与文件头注明的四个子面板函数（函数体存根）
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '5-325',
        any: [/^@DRAW_MAINMENU\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '331-393',
        any: [/^@DRAW_HAVEITEMS\(ARG:0 = 0, ARG:98, ARG:99\)$/m],
      },
      // DRAW_HAVEITEMS 头行（ARG:0 恒 0）：四枚知识标签拼接同一行，直到 :350 的 PRINTL 才换行
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '333-350',
        any: [/^IF ARG:0 == 0$/m, /^\tPRINTL $/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '350',
        any: [/^\tPRINTL $/m],
      },
      // 注释掉的旧道具枚举（死码，不移植）
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '353-356',
        any: [/^;REPEAT 100$/m],
      },
      // 两段 5 列网格（ids 0-58 / 300-339）+ 装饰的戒指（item 91）特例
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '359-372',
        any: [/^REPEAT 59$/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '375',
        any: [/^\tSIF ITEM:91 > 0$/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '377-390',
        any: [/^REPEAT 40$/m],
      },
      // DRAW_HAVETRAPS 的单一 5 列网格（ids 59-89，与 DRAW_HAVEITEMS 同构）
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '404-418',
        any: [/^REPEAT 31$/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '400-421',
        any: [/^@DRAW_HAVETRAPS\(ARG:0, ARG:98, ARG:99\)$/m],
      },
      // BGM 段（#69 起接通：开关开时播据点2.mp3，音量无引擎等价物）
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '11-17',
        any: [/PLAYBGM/],
      },
      // 防御性修正（バグ対策）与 @EVENTSHOP 的同型段
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '20-39',
        any: [/^SIF TARGET > CHARANUM - 1$/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '20-25',
        any: [/^SIF (TARGET|ASSI) > CHARANUM - 1$/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '20-21',
        any: [/^SIF TARGET > CHARANUM - 1$/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '23-25',
        any: [/^SIF ASSI > CHARANUM - 1$/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '27-29',
        any: [/^SIF ASSI == TARGET$/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '31-34',
        any: [/^IF TARGET >= 1$/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '36-39',
        any: [/^IF ASSI >= 1$/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '41',
        any: [/^REDRAW 0$/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '267-271',
        any: [/^IF B > 0$/m, /贩卖奴隶/],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '7-12',
        any: [/バグ対策/],
      },
      // 状态行（:45-75）——#63 订正块：六条原引用整体偏早
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '45-75',
        any: [/^ALIGNMENT RIGHT$/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '45',
        any: [/^DRAWLINEFORM %UNICODE\(0x2550\)%$/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '53',
        any: [/^FONTBOLD$/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '54',
        any: [/^ALIGNMENT RIGHT$/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '55-59',
        any: [/第\{DAY\/365\}年/],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '60-62',
        any: [/SIF DAY:2 == 15/],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '64-71',
        any: [/^IF TIME == 0$/m, /PRINTFORM \(所持金：\{MONEY\} pts\.\)/],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '72',
        any: [/^ALIGNMENT LEFT$/m],
      },
      // 入口按钮两纽与四钮
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '77',
        any: [/^DRAWLINEFORM %UNICODE\(0x2500\)%$/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '78-98',
        any: [/调教目标", 496/],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '80-85',
        any: [/^IF Target >= 1$/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '88-93',
        any: [/助手", 497/],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '100-145',
        any: [/PRINTBUTTON @"%SAVESTR:TARGET%", 498/],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '148',
        any: [/^DRAWLINEFORM %UNICODE\(0x2500\)%$/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '149-188',
        any: [/物品\/技能", 500/],
      },
      // A 计数的消费方守卫（@USERSHOP 的 100/496/497）
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '152',
        any: [/ELSEIF RESULT == 496 && A > 0/],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '154',
        any: [/ELSEIF RESULT == 497 && A > 0/],
      },
      // 子面板分发与指令面板
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '190-200',
        any: [/CALL DRAW_DUNGEON_DAILY/],
      },
      // FLAG:36 == 0 / ELSE 两支各自的 CALL DRAW_HAVEITEMS（同一行文本重复
      // 两处，见 append_item_slot 头注）
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '191',
        any: [/^\tCALL DRAW_HAVEITEMS$/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '199',
        any: [/^\tCALL DRAW_HAVEITEMS$/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '203-207',
        any: [/^PRINTFORML %UNICODE\(0x258c\)%Commands$/m],
      },
      // 整个指令面板（[100]-[888]，#395 起全部真身渲染）
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '203-320',
        any: [/^PRINTFORML %UNICODE\(0x258c\)%Commands$/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '206-207',
        any: [/Commands/],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '208-216',
        any: [/^A = 0$/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '211-219',
        any: [/^A = 0$/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '226-231',
        any: [/PRINTLCD \[100\] 调教/],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '232-234',
        any: [/^IF CHARANUM >= 1$/m, /PRINTLCD \[101\] 能力显示/],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '247-251',
        any: [/PRINTLCD \[103\] 处刑/],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '252-257',
        any: [/PRINTLCD \[104\] 迎击/],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '259-265',
        any: [/^; IF A > 0$/m, /PRINTLCD \[105\] 能力值提升/],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '272-273',
        any: [/PRINTLCD \[107\] 购物/],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '275-281',
        any: [/PRINTLCD \[108\] 换装/],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '285-289',
        any: [/PRINTLCD \[110\] 实验室/],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '298-299',
        any: [/PRINTLCD \[120\] 召唤/],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '300-301',
        any: [/PRINTLCD \[199\] 休息/],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '307-308',
        any: [/PRINTLCD \[777\] 设定/],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '309-311',
        any: [/PRINTLCD \[888\] 通信/],
      },
      // [109] 侵略按钮（#129：原作无条件渲染，:283 前无 IF 守卫，对照
      // [100] 的 226-231）
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '282-283',
        any: [/PRINTLCD \[109\] 侵略/],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '283',
        any: [/PRINTLCD \[109\] 侵略/],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '290-292',
        any: [/^IF FLAG:83 \|\| FLAG:84$/m, /PRINTLCD \[111\] 设施·设备/],
      },
      // [200]/[300] 存读档按钮（#137：原作无条件渲染，:303/:306 前无 IF
      // 守卫；#136 勘误移交——渲染侧从未画过，据点两处入口实机不可达）
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '303',
        any: [/PRINTLCD \[200\] 保存/],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '306',
        any: [/PRINTLCD \[300\] 读取/],
      },
      // —— #180（[102] 按钮 + @DRAW_DUNGEON_OVERVIEW/@DRAW_DUNGEON_DAILY 真身）——
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '239',
        any: [/^IF FLAG:502 == 0$/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '239-243',
        any: [/^IF FLAG:502 == 0$/m, /^PRINTLCD \[102\] 地下城$/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '427-577',
        any: [/^@DRAW_DUNGEON_OVERVIEW$/m, /^#DIM DYNAMIC TEMP, 500$/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '432-433',
        any: [/^PRINT$/m, /^PRINTFORML 迷宫Lv：/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '434-438',
        any: [/^REPEAT 99$/m, /^L_近卫 = 0$/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '441-467',
        any: [/^IF CHARANUM >= 1$/m, /^REPEAT CHARANUM$/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '450-455',
        any: [
          /^\s*IF CFLAG:COUNT:501 <= 1 && CFLAG:COUNT:502 == 0$/m,
          /^\s*TEMP:97 \+= 1$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '458-462',
        any: [/^\s*IF CFLAG:COUNT:1 == 3$/m, /^\s*TEMP:96 \+= 1$/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '465-466',
        any: [
          /^\s*L_近卫 \+= EX_TALENT:COUNT:1 > 0$/m,
          /^\s*L_奴隶 \+= CFLAG:COUNT:1 != 2 && CFLAG:COUNT:1 != 9$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '471-569',
        any: [/^\s*B = 0$/m, /^\s*REPEAT 100$/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '488-498',
        any: [
          /^\s*IF X != 10 && TEMP1:4 == 1$/m,
          /^\s*PRINTBUTTON LOCALS, X\+520$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '509-511',
        any: [/^\s*A = Z \+ 100$/m, /^\s*B \+= ITEM:A$/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '523-532',
        any: [
          /^\s*PRINTFORM 部下\{B, 4\}只, $/m,
          /^\s*PRINTFORM 勇者：\{TEMP:X, 2\}人$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '533-552',
        any: [/^\s*PRINTFORM 设施：$/m, /^\s*PRINTFORM 娼馆街　$/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '556-558',
        any: [
          /^\s*PRINTFORM 近卫兵：$/m,
          /^\s*PRINTFORML \{B \+ L_近卫, 4\}体/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '570-575',
        any: [/^PRINTL 　$/m, /^PRINTFORM  部下统计：/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '583-601',
        any: [/^@DRAW_DUNGEON_DAILY\s*$/m, /^CALL DISPLAY_DUNGEON_DAILY$/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '584-586',
        any: [/^IF EX_FLAG:99 >= 100$/m, /^EX_FLAG:99 = 100$/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '589-599',
        any: [
          /^IF EX_FLAG:99 <= 20 && EX_FLAG:99 >= 0$/m,
          /^PRINT 【广受爱戴】$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '601',
        any: [/^CALL DISPLAY_DUNGEON_DAILY$/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '320',
        any: [/^DRAWLINEFORM %UNICODE\(0x2550\)%$/m],
      },
      {
        src: 'target/ERB/SHOP/DRAW_MAINMENU.ERB',
        ref: '323',
        any: [/^REDRAW 1$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
