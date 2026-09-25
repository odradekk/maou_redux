// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：first-setting.mjs
// issue #463：魔王性别/肉棒尺寸/狂王性别/QUE2MK/编排层五问全量登记，
// 同步清理 #290 迁移时遗留的三条失配注册（919/921/923，从未有对应引用）。

export const FILES = [
  {
    js: 'ere/event/first-setting.js',
    refs: [
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '781-950',
        any: [/^\s*@FIRST_SETTING\s*$/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '787-941',
        any: [/^\s*\$INPUT_LOOP\s*$/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '784',
        any: [/^\s*CFLAG:0:16 = -1\s*$/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '785',
        any: [/^\s*CALL QUE2MK\s*$/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '786',
        any: [/^\s*IF !RESULT\s*$/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '800',
        any: [/^\s*IF MAOUSEX != 1\s*$/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '833',
        any: [/PRINT \[4\] 地下城模式 \[锐意制作中\] ： /],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '841',
        any: [
          /^\s*;PRINT\s+\[7\]\s+开发者的自娱自乐模式\s+\[锐意制作中\]\s+：\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '855-889',
        any: [/^\s*;魔王の性別\s*$/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '891-898',
        any: [/^\s*;チンボのサイズ\s*$/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '900-908',
        any: [/^\s*;狂王の性別\s*$/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '910-916',
        any: [/^\s*ELSEIF RESULT == 3\s*$/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '912',
        any: [/	PRINTL \[0\] 随机  \[1\] 村娘/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '918-924',
        any: [/ELSEIF RESULT == 4/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '920',
        any: [/	PRINTL \[0\] 普通  \[1\] 2D/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '924',
        any: [/		FLAG:502 = RESULT/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '942',
        any: [/^\s*ELSEIF RESULT\s*$/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_MODEINT.ERB',
        ref: '1-2',
        any: [/^\s*@QUE2MK\s*$/m],
      },
      // #615：狂王性别一问的两行正文（两条 PRINTL）
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '902',
        any: [/^\tPRINTL 狂王是支配这个地区的领主$/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '903',
        any: [/^\tPRINTL 继承了曾经封印你的勇者的血统，打算把你再次封印$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
