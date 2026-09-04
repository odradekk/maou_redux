// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #248：K902 按 #14 裁定只保留事件钩子，不落台词真身。

const SOURCE = 'target/ERB/口上/EVENT_K902_普林希丝 ver1.0.3.ERB';

const refs = [
  [
    '17-21',
    '^\\s*@EVENTTRAIN\\s*$\\s*^\\s*#PRI\\s*$\\s*^\\s*EX_FLAG:102 = 1\\s*$\\s*^\\s*SIF FLAG:7 == 0\\s*$\\s*^\\s*FLAG:7 = 2\\s*$',
  ],
  ['19', '^\\s*EX_FLAG:102 = 1\\s*$'],
  ['20-21', '^\\s*SIF FLAG:7 == 0\\s*$\\s*^\\s*FLAG:7 = 2\\s*$'],
  [
    '23-25',
    '^\\s*@EVENTEND\\s*$\\s*^\\s*#LATER\\s*$\\s*^\\s*EX_FLAG:102 = 0\\s*$',
  ],
  ['25', '^\\s*EX_FLAG:102 = 0\\s*$'],
  ['34-35', '^\\s*SIF EX_TALENT:102 != 1\\s*$\\s*^\\s*RETURN 0\\s*$'],
  [
    '422-426',
    '^\\s*@EVENTEND\\s*$\\s*^\\s*SIF FLAG:7 <= 0\\s*$\\s*^\\s*RETURN 0\\s*$\\s*^\\s*SIF EX_TALENT:103 != 1\\s*$\\s*^\\s*RETURN 0\\s*$',
  ],
  ['425-426', '^\\s*SIF EX_TALENT:103 != 1\\s*$\\s*^\\s*RETURN 0\\s*$'],
];

export const FILES = [
  {
    js: 'ere/kojo/kojo-k902-princess.js',
    refs: refs.map(([ref, anchor]) => ({
      src: SOURCE,
      ref,
      any: [new RegExp(anchor, 'm')],
    })),
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
