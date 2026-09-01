// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：first-setting.mjs

export const FILES = [
  // —— #181 H12 2D 地下城（新增引用，该文件其余引用见豁免表）：ere/event/first-setting.js ——
  {
    js: 'ere/event/first-setting.js',
    refs: [
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '16-17',
        any: [/;初期奴隷の初期値は村娘/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '781-935',
        any: [/@FIRST_SETTING/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '787-864',
        any: [/\$INPUT_LOOP/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '833',
        any: [/PRINT \[4\] 地下城模式 \[锐意制作中\] ： /],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '909-915',
        any: [/ELSEIF RESULT == 3/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '911',
        any: [/	;初期奴隷/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '912',
        any: [/	PRINTL \[0\] 随机  \[1\] 村娘/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '913',
        any: [/	INPUT/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '914-915',
        any: [/	SIF RESULT >= 0 && RESULT <= 1/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '918-924',
        any: [/ELSEIF RESULT == 4/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '919',
        any: [/	;モード/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '920',
        any: [/	PRINTL \[0\] 普通  \[1\] 2D/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '921',
        any: [/	INPUT/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '923',
        any: [/	SIF RESULT >= 0 && RESULT <= 1/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '924',
        any: [/		FLAG:502 = RESULT/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
