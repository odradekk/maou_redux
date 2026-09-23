// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：page-shop.mjs

export const FILES = [
  // —— #46（口上切片：K3 高貴 + K5 マオ）——
  {
    js: 'ere/page/page-shop.js',
    refs: [
      // #397（N13）[108] 分支：TAILOR_CORE 退出时把 TARGET 置 -1（:249），
      // 故 usershop 返回后按原作还原 TARGET = FLAG:1
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '249',
        any: [/^\s*TARGET\ =\ -\ 1\s*$/m],
      },
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
      // #396：陷阱商店的入口（@SHOW_SHOP :29 的 JUMP ITEM_SHOP_TRAP）与
      // @USERSHOP 的店内购物段 :44-57（#395 前不可达，随 BOUGHT 落表 +
      // 陷阱商店真身一并接通；四支的 return 形态见 usershop 注释）
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '28-29',
        any: [/^\tJUMP ITEM_SHOP_TRAP$/m], // 与 :50 同文，平行复现
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '44-46',
        any: [/^IF RESULT == 999 && BOUGHT >= 0$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '46',
        any: [/^\tBOUGHT = -1$/m], // 与 :20 同文，平行复现
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '47-54',
        any: [/^ELSEIF RESULT == 998 && BOUGHT >= 0$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '48',
        any: [/^\tBOUGHT = 200$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '50',
        any: [/^\tJUMP ITEM_SHOP_TRAP$/m], // 与 :29 同文，平行复现
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '52',
        any: [/^\tBOUGHT = 1$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '54',
        any: [/^\tJUMP ITEM_SHOP$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '55-57',
        any: [/^ELSEIF BOUGHT >= 0$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '20',
        any: [new RegExp('^\\s*CUSTOMDRAWLINE =\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '22-38',
        any: [new RegExp('^\\s*@SHOW_SHOP\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '24',
        any: [new RegExp('^\\s*SAVESTR:0 = 你\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '25-30',
        any: [new RegExp('^\\s*IF BOUGHT >= 0 && BOUGHT < 54\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '25',
        any: [new RegExp('^\\s*PRINT 日\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '26-27',
        any: [new RegExp('^\\s*IF BOUGHT >= 0 && BOUGHT < 54\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '28-29',
        any: [new RegExp('^\\s*ELSEIF BOUGHT >= 54\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '33-36',
        any: [new RegExp('^\\s*SIF DAY:1 < 1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '35',
        any: [new RegExp('^\\s*SIF DAY:2 < 1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '38',
        any: [
          new RegExp(
            '^\\s*CALL DRAW_MAINMENU;メインメニュー描画処理はこっちの関数に丸投げ、本体は_DRAW_MAINMENU\\.ERB内\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '40-229',
        any: [new RegExp('^\\s*@USERSHOP\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '44-57',
        any: [new RegExp('^\\s*IF RESULT == 999 && BOUGHT >= 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '44',
        any: [new RegExp('^\\s*IF RESULT == 999 && BOUGHT >= 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '45',
        any: [new RegExp('^\\s*CALL CLEAR_SHOP\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '49',
        any: [new RegExp('^\\s*CALL CLEAR_SHOP\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '53',
        any: [new RegExp('^\\s*FOR ICOUNT_A,24,36\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '59',
        any: [new RegExp('^\\s*IF RESULT == 100 && A > 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '59-101',
        any: [new RegExp('^\\s*IF RESULT == 100 && A > 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '65-68',
        any: [new RegExp('^\\s*IF TARGET <= 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '67-68',
        any: [new RegExp('^\\s*SIF RESULT == 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '68',
        any: [new RegExp('^\\s*;所持点を一時保存\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '71-97',
        any: [new RegExp('^\\s*\\$SELECT_ASSI_LOOP\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '73',
        any: [new RegExp('^\\s*TEMP:3 = 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '79-80',
        any: [new RegExp('^\\s*SIF TEMP:3 >= 1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '81-82',
        any: [new RegExp('^\\s*SIF RESULT == 2\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '83-84',
        any: [new RegExp('^\\s*SIF ASSI == 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '85-88',
        any: [new RegExp('^\\s*IF TARGET == ASSI\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '91-92',
        any: [new RegExp('^\\s*SIF ASSI >= 1 && TARGET == ASSI\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '94-97',
        any: [new RegExp('^\\s*IF CFLAG:MASTER:1 == 10\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '96',
        any: [new RegExp('^\\s*IF TALENT:0:327 == 1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '98-99',
        any: [new RegExp('^\\s*SIF TARGET >= 1 && TARGET != ASSI\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '99',
        any: [new RegExp('^\\s*BEGIN TRAIN\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '101',
        any: [new RegExp('^\\s*PRINTL \\[0\\] - 好的\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '102-106',
        any: [new RegExp('^\\s*ELSEIF RESULT == 101\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '105',
        any: [new RegExp('^\\s*BEGIN TURNEND\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '110',
        any: [new RegExp('^\\s*ELSEIF RESULT == 103\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '113',
        any: [new RegExp('^\\s*ELSEIF RESULT == 104\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '115',
        any: [new RegExp('^\\s*ELSEIF RESULT == 105\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '117',
        any: [new RegExp('^\\s*ELSEIF RESULT == 106\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '119-120',
        any: [new RegExp('^\\s*ELSEIF RESULT == 107\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '121-122',
        any: [new RegExp('^\\s*ELSEIF RESULT == 108\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '124-128',
        any: [new RegExp('^\\s*ELSEIF RESULT == 109\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '127',
        any: [new RegExp('^\\s*BEGIN TURNEND\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '130-131',
        any: [
          new RegExp(
            '^\\s*ELSEIF RESULT == 110 && TALENT:0:325 == 1\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '132-133',
        any: [
          new RegExp(
            '^\\s*ELSEIF RESULT == 111 && \\(FLAG:83 \\|\\| FLAG:84\\)\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '140',
        any: [new RegExp('^\\s*ELSEIF RESULT == 200\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '142',
        any: [new RegExp('^\\s*ELSEIF RESULT == 300\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '144',
        any: [new RegExp('^\\s*ELSEIF RESULT == 777\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '146',
        any: [new RegExp('^\\s*ELSEIF RESULT == 888\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '148',
        any: [new RegExp('^\\s*ELSEIF RESULT == 400\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '152',
        any: [new RegExp('^\\s*ELSEIF RESULT == 496 && A > 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '152-153',
        any: [new RegExp('^\\s*ELSEIF RESULT == 496 && A > 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '154',
        any: [new RegExp('^\\s*ELSEIF RESULT == 497 && A > 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '154-155',
        any: [new RegExp('^\\s*ELSEIF RESULT == 497 && A > 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '156-157',
        any: [new RegExp('^\\s*ELSEIF RESULT == 498\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '158-159',
        any: [new RegExp('^\\s*ELSEIF RESULT == 499\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '160-161',
        any: [new RegExp('^\\s*ELSEIF RESULT == 500\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '162-163',
        any: [new RegExp('^\\s*ELSEIF RESULT == 501\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '164-165',
        any: [new RegExp('^\\s*ELSEIF RESULT == 504\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '166-167',
        any: [new RegExp('^\\s*ELSEIF RESULT == 505\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '168-170',
        any: [
          new RegExp('^\\s*ELSEIF RESULT > 520 && RESULT <= 530\\s*$', 'm'),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '172-221',
        any: [new RegExp('^\\s*ELSEIF RESULT == 120\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '208-216',
        any: [new RegExp('^\\s*TARGET = X\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '220',
        any: [new RegExp('^\\s*PRINTW 奴隶太多了！\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '222-223',
        any: [new RegExp('^\\s*CALL DEBUG_MENU_U\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '226-227',
        any: [new RegExp('^\\s*SIF RESULT == 7788\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '226-229',
        any: [new RegExp('^\\s*SIF RESULT == 7788\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '429',
        any: [/^\s*ARG = LIMIT\(ARG,1,10\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '433',
        any: [/^\s*PRINTFORM 第\{ARG\}阶层\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '434-449',
        any: [/^\s*ELSEIF ARG == 10\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '435',
        any: [/^\s*PRINTFORM 近卫兵\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '438-446',
        any: [/^\s*IF !CFLAG:COUNT:1 && EX_TALENT:COUNT:1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '441-444',
        any: [/^\s*FOR LOCAL, 200, 212\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '451-469',
        any: [/^\s*SELECTCASE FLAG:\(ARG\+349\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '472-486',
        any: [/^\s*LOCAL = 0, 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '488',
        any: [/^\s*CALL ENEMY_EXIST2, ARG\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '491-498',
        any: [/^\s*\$MONSTERDATA\s*$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
