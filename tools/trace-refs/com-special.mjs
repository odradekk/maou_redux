// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：com-special.mjs

export const FILES = [
  // —— #224（J14：特殊指令族 50-59——@COM/@COM_ABLE/@EQUIP_COM/TRAIN_MESSAGE）——
  {
    js: 'ere/system/train/com-special.js',
    refs: [
      {
        src: 'target/ERB/調教相關/COMF50_ローション.ERB',
        ref: '3-28',
        any: [/@COM50/],
      },
      {
        src: 'target/ERB/調教相關/COMF51_媚薬.ERB',
        ref: '10-97',
        any: [/@COM51/],
      },
      {
        src: 'target/ERB/調教相關/COMF52_利尿剤.ERB',
        ref: '6-71',
        any: [/@COM52/],
      },
      {
        src: 'target/ERB/調教相關/COMF53_水晶球.ERB',
        ref: '3-49',
        any: [/@COM53/],
      },
      {
        src: 'target/ERB/調教相關/COMF53_水晶球.ERB',
        ref: '52-204',
        any: [/;ビデオ撮影中/],
      },
      {
        src: 'target/ERB/調教相關/COMF54_野外プレイ.ERB',
        ref: '3-109',
        any: [/@COM54/],
      },
      {
        src: 'target/ERB/調教相關/COMF54_野外プレイ.ERB',
        ref: '111-211',
        any: [/@EQUIP_COM54/],
      },
      {
        src: 'target/ERB/調教相關/COMF55_何もしない.ERB',
        ref: '7-84',
        any: [/@COM55/],
      },
      {
        src: 'target/ERB/調教相關/COMF56_会話する.ERB',
        ref: '6-196',
        any: [/@COM56/],
      },
      {
        src: 'target/ERB/調教相關/COMF57_羞恥プレイ.ERB',
        ref: '3-131',
        any: [/@COM57/],
      },
      {
        src: 'target/ERB/調教相關/COMF57_羞恥プレイ.ERB',
        ref: '134-254',
        any: [/@EQUIP_COM57/],
      },
      {
        src: 'target/ERB/調教相關/COMF58_お風呂場プレイ.ERB',
        ref: '3-98',
        any: [/@COM58/],
      },
      {
        src: 'target/ERB/調教相關/COMF58_お風呂場プレイ.ERB',
        ref: '100-198',
        any: [/@EQUIP_COM58/],
      },
      {
        src: 'target/ERB/調教相關/COMF59_新妻プレイ.ERB',
        ref: '3-160',
        any: [/@COM59/],
      },
      {
        src: 'target/ERB/調教相關/COMF59_新妻プレイ.ERB',
        ref: '163-318',
        any: [/@EQUIP_COM59/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2246-2506',
        any: [/@COM_ABLE50/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '362-373',
        any: [/ELSEIF SELECTCOM == 55/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '1901-2063',
        any: [/ELSEIF SELECTCOM == 50/],
      },
      {
        src: 'target/ERB/調教相關/COMF54_野外プレイ.ERB',
        ref: '119-196',
        any: [/A = 500/],
      },
      {
        src: 'target/ERB/調教相關/COMF54_野外プレイ.ERB',
        ref: '23-34',
        any: [/IF PALAM:5 < PALAMLV:1/],
      },
      {
        src: 'target/ERB/調教相關/COMF54_野外プレイ.ERB',
        ref: '122-133',
        any: [/IF PALAM:5 < PALAMLV:1/],
      },
      {
        src: 'target/ERB/調教相關/COMF54_野外プレイ.ERB',
        ref: '35-60',
        any: [/IF ABL:17 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF54_野外プレイ.ERB',
        ref: '134-159',
        any: [/IF ABL:17 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF54_野外プレイ.ERB',
        ref: '61-74',
        any: [/IF ABL:21 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF54_野外プレイ.ERB',
        ref: '76-78',
        any: [/SIF TALENT:28/],
      },
      {
        src: 'target/ERB/調教相關/COMF54_野外プレイ.ERB',
        ref: '79-81',
        any: [/SIF TALENT:33/],
      },
      {
        src: 'target/ERB/調教相關/COMF54_野外プレイ.ERB',
        ref: '83-85',
        any: [/SIF TALENT:10/],
      },
      {
        src: 'target/ERB/調教相關/COMF54_野外プレイ.ERB',
        ref: '86-88',
        any: [/SIF TALENT:35/],
      },
      {
        src: 'target/ERB/調教相關/COMF50_ローション.ERB',
        ref: '6',
        any: [/PRINTL 润滑液/],
      },
      {
        src: 'target/ERB/調教相關/COMF50_ローション.ERB',
        ref: '8',
        any: [/CALL TRAIN_MESSAGE_B/],
      },
      {
        src: 'target/ERB/調教相關/COMF50_ローション.ERB',
        ref: '13',
        any: [/SOURCE:10 = 10000/],
      },
      {
        src: 'target/ERB/調教相關/COMF50_ローション.ERB',
        ref: '14',
        any: [/SOURCE:12 = 300/],
      },
      {
        src: 'target/ERB/調教相關/COMF50_ローション.ERB',
        ref: '16',
        any: [/ITEM:25 -= 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF50_ローション.ERB',
        ref: '18-26',
        any: [/IF TALENT:122 == 0 && TALENT:PLAYER:122 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF51_媚薬.ERB',
        ref: '12',
        any: [/PRINTL 媚药/],
      },
      {
        src: 'target/ERB/調教相關/COMF51_媚薬.ERB',
        ref: '14',
        any: [/CALL TRAIN_MESSAGE_B/],
      },
      {
        src: 'target/ERB/調教相關/COMF51_媚薬.ERB',
        ref: '59-61',
        any: [/SIF LOSEBASE:0 < 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF52_利尿剤.ERB',
        ref: '8',
        any: [/PRINTL 利尿剂/],
      },
      {
        src: 'target/ERB/調教相關/COMF52_利尿剤.ERB',
        ref: '10',
        any: [/CALL TRAIN_MESSAGE_B/],
      },
      {
        src: 'target/ERB/調教相關/COMF53_水晶球.ERB',
        ref: '7',
        any: [/CALL TRAIN_MESSAGE_B/],
      },
      {
        src: 'target/ERB/調教相關/COMF53_水晶球.ERB',
        ref: '63-65',
        any: [/CFLAG:491 \+= 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF58_お風呂場プレイ.ERB',
        ref: '13-14',
        any: [/SIF TEQUIP:18/],
      },
      {
        src: 'target/ERB/調教相關/COMF58_お風呂場プレイ.ERB',
        ref: '15',
        any: [/TEQUIP:58 = 0/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
