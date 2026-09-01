// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：com-order.mjs

export const FILES = [
  {
    // #214：@COM_ORDER（实行值的共通明细段，COMORDER.ERB 全文）
    js: 'ere/system/train/com-order.js',
    refs: [
      {
        src: 'target/ERB/調教相關/COMORDER.ERB',
        ref: '3-379',
        any: [/@COM_ORDER/, /^IF ABL:10$/m],
      },
      {
        src: 'target/ERB/調教相關/COMORDER.ERB',
        ref: '8-23',
        any: [/^IF ABL:10$/m, /^A \+= ABL:10 \* 4$/m],
      },
      {
        src: 'target/ERB/調教相關/COMORDER.ERB',
        ref: '28',
        any: [/IF TALENT:PLAYER:122 == 0 && TALENT:TARGET:122 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMORDER.ERB',
        ref: '28-91',
        any: [/;ABL:百合气质/, /A \+= ABL:22\*3/],
      },
      {
        src: 'target/ERB/調教相關/COMORDER.ERB',
        ref: '66-71',
        any: [/^\tIF TALENT:24$/m, /^\t\tA -= 13$/m],
      },
      {
        src: 'target/ERB/調教相關/COMORDER.ERB',
        ref: '85-90',
        any: [/^A -= 10$/m, /TALENTNAME:24/],
      },
      {
        src: 'target/ERB/調教相關/COMORDER.ERB',
        ref: '96-127',
        any: [/^IF MARK:0$/m, /^A \+= MARK:0 \* 5$/m],
      },
      {
        src: 'target/ERB/調教相關/COMORDER.ERB',
        ref: '105-111',
        any: [/^\tT = 4$/m, /^\tT = 2$/m],
      },
      {
        src: 'target/ERB/調教相關/COMORDER.ERB',
        ref: '121-127',
        any: [/^IF MARK:3$/m, /^A -= MARK:3 \* 2 \* T$/m],
      },
      {
        src: 'target/ERB/調教相關/COMORDER.ERB',
        ref: '132-176',
        any: [/;PALAM:恭顺/, /;PALAM:恐怖/],
      },
      {
        src: 'target/ERB/調教相關/COMORDER.ERB',
        ref: '133-145',
        any: [/^IF PALAM:4 < PALAMLV:1$/m, /^ELSEIF PALAM:4 < PALAMLV:5$/m],
      },
      {
        src: 'target/ERB/調教相關/COMORDER.ERB',
        ref: '156-168',
        any: [/^IF PALAM:10 < PALAMLV:1$/m, /^ELSEIF PALAM:10 < PALAMLV:5$/m],
      },
      {
        src: 'target/ERB/調教相關/COMORDER.ERB',
        ref: '182-285',
        any: [/;反抗心/, /;盲从/],
      },
      {
        src: 'target/ERB/調教相關/COMORDER.ERB',
        ref: '206',
        any: [/;自尊心$/m],
      },
      {
        src: 'target/ERB/調教相關/COMORDER.ERB',
        ref: '291-334',
        any: [/;魅惑/, /;鼓舞/],
      },
      {
        src: 'target/ERB/調教相關/COMORDER.ERB',
        ref: '339-379',
        any: [/^R = NO:PLAYER$/m, /RELATION:R > 0 && RELATION:R < 30/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {
  'train-natural': [
    // #214：COM_ORDER 的明细行实证（判定行前半 = COM_ORDER 的贡献段）
    {
      js: 'ere/system/train/com-order.js',
      refs: [{ ref: '169', any: [/顺从LV1\(4\)/] }],
    },
  ],
};
