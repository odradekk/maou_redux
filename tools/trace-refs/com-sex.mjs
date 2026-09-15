// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：com-sex.mjs

export const FILES = [
  {
    // #221（J11）：COM20–29 性交系的升格规则内联锚。
    js: 'ere/system/train/com-sex.js',
    refs: [
      {
        src: 'target/ERB/調教相關/COMF_JUMP.ERB',
        ref: '152-163',
        any: [/前回と今回の調教者が同じ/],
      },
      {
        src: 'target/ERB/調教相關/COMF_JUMP.ERB',
        ref: '228-239',
        any: [/まず背后位・胸爱抚/],
      },
      // #402：公共段合流后本模块只留姿势反应；注释里引的两处是姿势分支
      // （:1154-1170）与公共段整体范围（:377-741，正文在 train-message.js）
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '1154-1170',
        any: [/ELSEIF SELECTCOM == 20 \|\| SELECTCOM == 26/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '377-741',
        any: [/IF TFLAG:29 > 0 && TFLAG:899 <= 1/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
