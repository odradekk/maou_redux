// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：page-train.mjs

export const FILES = [
  {
    js: 'ere/page/page-train.js',
    refs: [
      // #224（J14）与 #230（J20）：SHOW_EQUIP_2 的已点亮状态臂
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1564-1596',
        any: [/一度使用したら解除するまで止まらない道具や調教を/m],
      },
      // #224（J14）：特殊族点亮的 53/54/57/58/59 状态臂；与死斗场同一粉色行。
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1566-1577',
        any: [
          /摄影中/m,
          /野外PLAY中/m,
          /羞耻（大镜子）PLAY中/m,
          /浴室PLAY中/m,
          /新妻PLAY中/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1587-1588',
        any: [/死斗场决斗中/m],
      },
      // #215（J5）：clothtype_text 内部 :37 的着衣模式守卫
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '37',
        any: [/^\s*IF FLAG:37 == 0 \|\| CFLAG:41 == 0$/m],
      },
      // @SHOW_STATUS 整函数（#74 组件化后的 draw_status_screen 全量）
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '60-256',
        any: [/^@SHOW_STATUS$/m],
      },
      // 锚点跨度重绘的原作习语（#74：ScreenBlock 承载的 ere 侧等价物）
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '179-186',
        any: [/^@SET_CLEAR_POINT$/m, /^@CLEAR_TO_POINT$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '61',
        any: [/^DRAWLINE$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '62-68',
        any: [/^PRINTV DAY\+1$/m, /^\(午前\)$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '69-82',
        any: [/调教中   调教者:/, /^PRINT   $/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '82',
        any: [/^PRINT   $/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '84',
        any: [/^CALL SHOW_EQUIP_2$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '85-86',
        any: [/^CALL LIFE_BAR$/m, /^CALL VITAL_BAR$/m],
      },
      // #212：基础条组件的源（LIFE_BAR/VITAL_BAR 住 CHARA_INFO_SHOW）
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1175',
        any: [/^@VITAL_BAR /m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '87-91',
        any: [/調教時ステータス画面に服装表示/, /^CALL PRINT_CLOTHTYPE$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '93',
        any: [/^PRINTL $/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '95-124',
        any: [/^IF EX:0 > 0$/m, /^\tPRINTL  $/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '95-103',
        any: [/^IF EX:0 > 0$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '104-105',
        any: [/SIF EX:1 > 0/],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '106-107',
        any: [/SIF EX:2 > 0/],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '108-109',
        any: [/SIF EX:3 > 0/],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '110-111',
        any: [/SIF EX:4 > 0/],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '112-122',
        any: [/^IF EX:5 > 0 $/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '123-124',
        any: [/SIF EX:0 \|\| EX:1 \|\| EX:2 \|\| EX:3 \|\| EX:4 \|\| EX:5$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '126',
        any: [/^PRINT_PALAM TARGET$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '128-142',
        any: [/^SIF MAXBASE:2 == 0$/m, /^ENDIF$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '144-252',
        any: [/射精（/, /^CALL SHOW_EQUIP_1$/m],
      },
      // —— #212：射精/母乳/触手槽条段的逐段锚 ——
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '144',
        any: [/^IF \(TALENT:MASTER:121/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '144-158',
        any: [
          /^\tPRINT 射精（$/m,
          /^\tBAR BASE:MASTER:2,MAXBASE:MASTER:2,32$/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '160-175',
        any: [/^IF ASSIPLAY$/m, /^SETCOLOR 0xFF1493$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '161',
        any: [/^\tIF \(TALENT:ASSI:121/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '177',
        any: [/^IF \(TALENT:TARGET:121/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '177-188',
        any: [/^\tBAR BASE:2,MAXBASE:2,32$/m, /^\tSIF TEQUIP:37$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '190-200',
        any: [/^IF TALENT:MASTER:130$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '202-214',
        any: [/^IF ASSI > 0$/m, /^\tIF TALENT:ASSI:130 $/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '216-226',
        any: [/^IF TALENT:TARGET:130$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '228-235',
        any: [/^IF TEQUIP:89$/m, /PRINT 射精（犬）/],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '237-244',
        any: [/^IF TEQUIP:90$/m, /PRINT 射精（触手）/],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '246-252',
        any: [/^IF TEQUIP:55$/m, /射精（死斗场・怪物）/],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '253',
        any: [/^CALL SHOW_EQUIP_1$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '255-256',
        any: [/设置清除点/, /^CALL SET_CLEAR_POINT$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
