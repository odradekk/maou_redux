// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：kojo-k5-mao.mjs

export const FILES = [
  {
    js: 'ere/kojo/kojo-k5-mao.js',
    refs: [
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '80-84',
        any: [/^@EVENTTRAIN$/m, /^FLAG:105 = 1$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '86-88',
        any: [/^@EVENTEND$/m, /^FLAG:105 = 0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '770-848',
        any: [/^@KOJO_MESSAGE_COM_5$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '771-793',
        any: [/SIF ASSI > 0 && ASSIPLAY/, /^\tCALL COLOSSEUM_KOJO_5$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '775-776',
        any: [/SIF TEQUIP:45 && SELECTCOM != 45/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '778-779',
        any: [/SIF TFLAG:899/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '781-782',
        any: [/獣姦プレイ中は口上をスキップする/, /SIF TEQUIP:89/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '784-785',
        any: [/SIF TEQUIP:90/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '787-790',
        any: [/コロシアム中は専用口上/, /^\tCALL COLOSSEUM_KOJO_5$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '792-793',
        any: [/SIF TALENT:TARGET:9 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '802-848',
        any: [/^IF SELECTCOM == 0$/m, /^\t\t\tCFLAG:301 = 6$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '803-814',
        any: [/^\tIF CFLAG:301 == 0$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '805-812',
        any: [/^\t\tIF MARK:2 >= 2$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '817-822',
        any: [
          /^\t\tIF TALENT:TARGET:76 == 1 && \(CFLAG:301 <= 5 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '823-828',
        any: [
          /^\t\tELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:301 <= 4 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '829-834',
        any: [
          /^\t\tELSEIF MARK:2 == 3 && \(CFLAG:301 <= 3 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '835-839',
        any: [
          /^\t\tELSEIF MARK:2 == 2 && \(CFLAG:301 <= 2 \|\| FLAG:7 == 2\)$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '840-844',
        any: [
          /^\t\tELSEIF MARK:2 <= 1 && \(CFLAG:301 <= 1 \|\| FLAG:7 == 2\)$/m,
        ],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
