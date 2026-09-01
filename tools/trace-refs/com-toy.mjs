// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：com-toy.mjs

export const FILES = [
  // —— #220（J10：道具使用族 10-19——@COM/@COM_ABLE/@EQUIP_COM/TRAIN_MESSAGE）——
  {
    js: 'ere/system/train/com-toy.js',
    refs: [
      {
        src: 'target/ERB/調教相關/COMF10_振動の宝石.ERB',
        ref: '8-52',
        any: [/@COM10/],
      },
      {
        src: 'target/ERB/調教相關/COMF11_バイブ.ERB',
        ref: '7-171',
        any: [/@COM11/],
      },
      {
        src: 'target/ERB/調教相關/COMF11_バイブ.ERB',
        ref: '177-334',
        any: [/@EQUIP_COM11/],
      },
      {
        src: 'target/ERB/調教相關/COMF12_振動の杖.ERB',
        ref: '9-53',
        any: [/@COM12/],
      },
      {
        src: 'target/ERB/調教相關/COMF13_アナルワーム.ERB',
        ref: '7-198',
        any: [/@COM13/],
      },
      {
        src: 'target/ERB/調教相關/COMF13_アナルワーム.ERB',
        ref: '204-377',
        any: [/@EQUIP_COM13/],
      },
      {
        src: 'target/ERB/調教相關/COMF14_クリキャップ.ERB',
        ref: '7-67',
        any: [/@COM14/],
      },
      {
        src: 'target/ERB/調教相關/COMF14_クリキャップ.ERB',
        ref: '73-139',
        any: [/@EQUIP_COM14/],
      },
      {
        src: 'target/ERB/調教相關/COMF15_二プルキャップ.ERB',
        ref: '7-86',
        any: [/@COM15/],
      },
      {
        src: 'target/ERB/調教相關/COMF15_二プルキャップ.ERB',
        ref: '92-168',
        any: [/@EQUIP_COM15/],
      },
      {
        src: 'target/ERB/調教相關/COMF16_搾乳器.ERB',
        ref: '7-98',
        any: [/@COM16/],
      },
      {
        src: 'target/ERB/調教相關/COMF16_搾乳器.ERB',
        ref: '104-221',
        any: [/@EQUIP_COM16/],
      },
      {
        src: 'target/ERB/調教相關/COMF17_オナホール.ERB',
        ref: '7-70',
        any: [/@COM17/],
      },
      {
        src: 'target/ERB/調教相關/COMF17_オナホール.ERB',
        ref: '76-153',
        any: [/@EQUIP_COM17/],
      },
      {
        src: 'target/ERB/調教相關/COMF18_シャワー.ERB',
        ref: '7-105',
        any: [/@COM18/],
      },
      {
        src: 'target/ERB/調教相關/COMF18_シャワー.ERB',
        ref: '111-204',
        any: [/@EQUIP_COM18/],
      },
      {
        src: 'target/ERB/調教相關/COMF19_アナルビーズ.ERB',
        ref: '7-155',
        any: [/@COM19/],
      },
      {
        src: 'target/ERB/調教相關/COMF19_アナルビーズ.ERB',
        ref: '161-310',
        any: [/@EQUIP_COM19/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '382-859',
        any: [/@COM_ABLE10/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '783-1013',
        any: [/ELSEIF SELECTCOM == 10/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '986-1149',
        any: [/ELSEIF SELECTCOM == 10/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
