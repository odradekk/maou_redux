// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #405 新增：ere/event/event-chara-leave.js 的锚表（issue #290 起一个 js 文件一份）

export const FILES = [
  {
    js: 'ere/event/event-chara-leave.js',
    refs: [
      {
        src: 'target/ERB/EVENT/EVENT_CHARA_LEAVE.ERB',
        ref: '1-70',
        any: [/^[ \t]*@EVENT_CHARA_LEAVE\(ARG, CHARA\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_CHARA_LEAVE.ERB',
        ref: '3-5',
        any: [/^[ \t]*STR:ARG \+= @"%NICKNAME:CHARA%_"[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_CHARA_LEAVE.ERB',
        ref: '6-54',
        any: [
          /^[ \t]*STR:ARG \+= @"\{ARG:1\},\{MAXBASE:CHARA:\(ARG:1\)\}\/"[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_CHARA_LEAVE.ERB',
        ref: '55-59',
        any: [/^[ \t]*SIF FLAG:1 == CHARA[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_CHARA_LEAVE.ERB',
        ref: '62-65',
        any: [/^[ \t]*SIF FLAG:1 == CHARA[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_CHARA_LEAVE.ERB',
        ref: '67',
        any: [/^[ \t]*CALL PARTY_CHAR_DEL, CHARA[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_CHARA_LEAVE.ERB',
        ref: '69',
        any: [/^[ \t]*DELCHARA CHARA[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_CHARA_LEAVE.ERB',
        ref: '71-160',
        any: [/^[ \t]*@EVENT_CHARA_RETURN\(ARG,SETLV = 0\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_CHARA_LEAVE.ERB',
        ref: '71',
        any: [/^[ \t]*@EVENT_CHARA_RETURN\(ARG,SETLV = 0\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_CHARA_LEAVE.ERB',
        ref: '79',
        any: [/^[ \t]*ADDVOIDCHARA[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_CHARA_LEAVE.ERB',
        ref: '82-87',
        any: [/^[ \t]*NAME:CHARA = CALLNAME\(NO:CHARA, 0\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_CHARA_LEAVE.ERB',
        ref: '89-138',
        any: [/^[ \t]*MAXBASE:CHARA:TOINT\(NUMS\) = TOINT\(NUMS:1\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_CHARA_LEAVE.ERB',
        ref: '140-143',
        any: [/^[ \t]*CFLAG:CHARA:501 = 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_CHARA_LEAVE.ERB',
        ref: '145-151',
        any: [/^[ \t]*LV = CFLAG:CHARA:9[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_CHARA_LEAVE.ERB',
        ref: '153-154',
        any: [/^[ \t]*BASE:CHARA:0 = MAXBASE:CHARA:0[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_CHARA_LEAVE.ERB',
        ref: '157-158',
        any: [/^[ \t]*CALL CHAR_BODY_GENERATE_WAPPED, CHARA[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_CHARA_LEAVE.ERB',
        ref: '160',
        any: [/^[ \t]*STR:ARG =[ \t]*$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
