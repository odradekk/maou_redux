// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：event-turnend.mjs

export const FILES = [
  {
    js: 'ere/event/event-turnend.js',
    refs: [
      {
        src: 'target/ERB/EVENT/EVENT_TURNEND.ERB',
        ref: '8-139',
        any: [/^@EVENTTURNEND$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TURNEND.ERB',
        ref: '13-27',
        any: [/CHECK_SELLASSIABLE/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TURNEND.ERB',
        ref: '31-51',
        any: [/完全に死んだ/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TURNEND.ERB',
        ref: '54',
        any: [/FLAG:0 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TURNEND.ERB',
        ref: '57',
        any: [/^IF TIME == 1$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TURNEND.ERB',
        ref: '61-74',
        any: [/IN_VAGINA_EXTRA/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TURNEND.ERB',
        ref: '77',
        any: [/^\tCALL EVENT_NEXTDAY$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TURNEND.ERB',
        ref: '79',
        any: [/DAY:0 \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TURNEND.ERB',
        ref: '79-91',
        any: [/DAY:0 \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TURNEND.ERB',
        ref: '93',
        any: [/CALL ENTER_ENEMY,0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TURNEND.ERB',
        ref: '95-107',
        any: [/SENGENMAX/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TURNEND.ERB',
        ref: '108-120',
        any: [/SENGEN <= 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TURNEND.ERB',
        ref: '121-125',
        any: [/FOR EFFECT/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TURNEND.ERB',
        ref: '112',
        any: [/^\t\tCALL ENTER_ENEMY$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TURNEND.ERB',
        ref: '114',
        any: [/^\t\tCALL ENTER_ENEMY$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TURNEND.ERB',
        ref: '116',
        any: [/^\t\tCALL ENTER_ENEMY$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TURNEND.ERB',
        ref: '123',
        any: [/^\t\t\tCALL ENTER_ENEMY$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TURNEND.ERB',
        ref: '126-128',
        any: [/TIME = 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TURNEND.ERB',
        ref: '131',
        any: [/CALL AUTO_BUYING/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TURNEND.ERB',
        ref: '134-135',
        any: [/TARGET = -1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TURNEND.ERB',
        ref: '137-138',
        any: [/DEBUG_CHECK/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TURNEND.ERB',
        ref: '140',
        any: [/^BEGIN SHOP$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TURNEND.ERB',
        ref: '145-167',
        any: [/^@AUTO_BUYING$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TURNEND.ERB',
        ref: '170-334',
        any: [/^@DEBUG_CHECK$/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '234-760',
        any: [/^@EVENTTURNEND$/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '758',
        any: [/^BEGIN SHOP$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
