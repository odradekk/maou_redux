// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：event-ending.mjs

export const FILES = [
  {
    // #118：ENDING_1 真身与 ENDING_3/4/5/END10_55 的接线（INVASION_CHECK
    // 五组条件的演出侧）
    js: 'ere/event/event-ending.js',
    refs: [
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '6-40',
        any: [/^@ENDING_1$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '8-18',
        any: [/^DRAWLINE$/m, /^PRINTL ┌/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '20-23',
        any: [/^ADDCHARA 35$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '25',
        any: [/^WAIT$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '27',
        any: [/人间界已经陷落了/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '29-30',
        any: [/世界这么大/m, /不想做魔王了/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '31-37',
        any: [/^\$INPUT_LOOP$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '34',
        any: [/^\s*QUIT$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '35-36',
        any: [/^\s*ELSEIF RESULT != 0$/m, /^\s*GOTO INPUT_LOOP$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '38',
        any: [/^FLAG:82 = 1$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '39',
        any: [/菲娅，被你抓获了/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '40',
        any: [/^RETURN 0$/m],
      },
      // #173：@ENDING_2 真身（:43-56 全文）
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '43-56',
        any: [/^@ENDING_2$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '45',
        any: [/^DRAWLINE$/m, /^PRINTL ┌/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '46-50',
        any: [/^PRINTL ｜.*新的女勇者/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '52',
        any: [/^PRINTFORMW \*勇者%SAVESTR:TARGET%/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '53',
        any: [/^PRINTL  $/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '54',
        any: [/GAMEOVER/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '55',
        any: [/^INPUT$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '56',
        any: [/^QUIT$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '59-74',
        any: [/^@ENDING_3$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '70',
        any: [/^FLAG:87 = 1$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '72',
        any: [/^FLAG:87 = 2$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '77-92',
        any: [/^@ENDING_4$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '88',
        any: [/^FLAG:89 = 1$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '90',
        any: [/^FLAG:89 = 2$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '97-112',
        any: [/^@ENDING_5$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '108',
        any: [/^FLAG:91 = 1$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '110',
        any: [/^FLAG:91 = 2$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '136',
        any: [/^@CHAR_GIFT, ARG$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA_ADDON1.ERB',
        ref: '475-485',
        any: [/^@END10_55$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA_ADDON1.ERB',
        ref: '485',
        any: [/^\s*EX_FLAG:2810 \+= 5$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
