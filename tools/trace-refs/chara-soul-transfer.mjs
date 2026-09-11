// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #391：chara-soul-transfer.js 的锚表

const FUNC2 = 'target/ERB/キャラ関数/CHARA_INFO_FUNC2.ERB';

export const FILES = [
  {
    js: 'ere/chara/chara-soul-transfer.js',
    refs: [
      { src: FUNC2, ref: '1-45', any: [/@TRANSFER_SOUL,\ ARG,\ MODE/] },
      { src: FUNC2, ref: '47-99', any: [/@TRANSFERAPP,\ ARG/] },
      { src: FUNC2, ref: '102-138', any: [/@BODYCHECK_MAOU,\ ARG/] },
      { src: FUNC2, ref: '140-287', any: [/@PERSONALOCK,\ ARG/] },
      { src: FUNC2, ref: '289-435', any: [/@BODYLOCK,\ ARG/] },
      { src: FUNC2, ref: '438-452', any: [/@SOUL_DISLOCATION\s*$/m] },
      { src: FUNC2, ref: '82-87', any: [/^SWAP\ NAME:MASTER,\ NAME:ARG$/m] },
      { src: FUNC2, ref: '99', any: [/^RETURN\ MASTER$/m] },
      { src: FUNC2, ref: '10-11', any: [/^SIF\ RESULT\ !=\ 0$/m] },
      {
        src: FUNC2,
        ref: '23-29',
        any: [/^\s*IF\ EX_TALENT:ARG:2\ &&\ RESULT\ <\ 0\s*$/m],
      },
      { src: FUNC2, ref: '33', any: [/^SWAPCHARA\ MASTER,\ ARG$/m] },
      { src: FUNC2, ref: '34', any: [/^CALL\ TRANSFERAPP,\ ARG$/m] },
      {
        src: FUNC2,
        ref: '37-41',
        any: [/^\s*EX_TALENT:ARG:0\ =\ EX_TALENT:MASTER:0\ \+\ 1\s*$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
