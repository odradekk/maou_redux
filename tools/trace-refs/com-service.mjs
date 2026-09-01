// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：com-service.mjs

export const FILES = [
  {
    // #222（J12）：COM30–38 奉仕系的公共 A 文分支与骑乘位反应。
    js: 'ere/system/train/com-service.js',
    refs: [
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '30-108',
        any: [/IF TFLAG:9 == 0/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '1175-1203',
        any: [/ELSEIF SELECTCOM == 34 \|\| SELECTCOM == 36/m],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '1447-1870',
        any: [/@COM_ABLE30/m, /@COM_ABLE38/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '1485-1739',
        any: [/ELSEIF SELECTCOM == 30/m, /ELSEIF SELECTCOM == 38/m],
      },
      {
        src: 'target/ERB/調教相關/COMF30_手淫.ERB',
        ref: '1-11',
        any: [/@COM30/m, /CALL GET_ADV_COM/m],
      },
      {
        src: 'target/ERB/調教相關/COMF34_騎乗位.ERB',
        ref: '12-17',
        any: [/CALL GET_ADV_COM,LOCAL/m, /FLAG:71 = 0/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
