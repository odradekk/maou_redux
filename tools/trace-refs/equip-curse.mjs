// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：equip-curse.mjs

export const FILES = [
  {
    js: 'ere/system/equip/equip-curse.js',
    refs: [
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '89-155',
        any: [/^@REMOVE_CURSE$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '93',
        any: [/^;RETURN 0は装備しない 1は装備$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '95',
        any: [/^CALL GET_EQUIP_NUM$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '97-98',
        any: [/^;入手階層に応じた強度になる$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '100-103',
        any: [/^CALL EQUIP_DATABASE$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '105-107',
        any: [/^;呪われてないならリターン$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '109-112',
        any: [/^;神官と忍者以外は高確率で失敗し呪い品装着$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '113-115',
        any: [/^ELSEIF RAND:8 == 0$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '118',
        any: [/^PRINTFORMW %SAVESTR:A%解咒成功。$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '120-147',
        any: [/^D = RAND:100$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '121-147',
        any: [/^IF D < 20$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '149-151',
        any: [/^;解呪品は地味に強度アップする$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '153-154',
        any: [/^W:0 = W:1 \+ W:2 \* 1000$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '157-203',
        any: [/^@CURSE_EQUIP_RING$/m],
      },
      { src: 'target/ERB/其他/EQUIP.ERB', ref: '163', any: [/^REPEAT 10$/m] },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '164-165',
        any: [/^\tSIF ITEM:300 <= 0$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '167',
        any: [/^\tITEM:300 -= 1$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '169-194',
        any: [/^\tD = RAND:100$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '171-189',
        any: [/^\tIF D < 20$/m],
      },
      { src: 'target/ERB/其他/EQUIP.ERB', ref: '187-188', any: [/^\tELSE$/m] },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '196-198',
        any: [/^\tPRINT 你把装饰戒指制造成$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '200',
        any: [/^\tCALL EQUIP_GET$/m],
      },
      { src: 'target/ERB/其他/EQUIP.ERB', ref: '202', any: [/^WAIT$/m] },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
