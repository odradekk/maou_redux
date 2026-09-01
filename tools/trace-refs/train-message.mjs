// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：train-message.mjs

export const FILES = [
  {
    js: 'ere/system/train/train-message.js',
    refs: [
      // 公共头（#219 起分支归 com-caress.js，此组只剩头部的锚）
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '19-26',
        any: [/調教テキスト省略設定の場合は戻る/, /CUSTOMDRAWLINE ‥/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '19-21',
        any: [/調教テキスト省略設定の場合は戻る/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '23',
        any: [/CUSTOMDRAWLINE ‥/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '22-26',
        any: [/調教テキスト省略設定の場合は戻る/, /CUSTOMDRAWLINE ‥/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '22-24',
        any: [/調教テキスト省略設定の場合は戻る/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '26',
        any: [/CUSTOMDRAWLINE ‥/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '377-424',
        any: [/IF TFLAG:29 > 0 && TFLAG:899 <= 1/],
      },
      // 头注「其余分支待办」的两个范围引用（#219 起）：射精文本 / 振动宝石起点
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '30-120',
        any: [/PRINT 隔着/, /CALL PRINT_CLOTHTYPE_SPECIAL/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '986',
        any: [/ELSEIF SELECTCOM == 10 && TFLAG:899 <= 1/],
      },
      // #230（J20）：A 公共头 TFLAG:15 段的死斗场两臂（触手两臂随 J17）
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '110-146',
        any: [/死斗场で射精/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '113-125',
        any: [/身上的触手、吐出了体液/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '127-133',
        any: [/被灌入了怪物黏黏糊糊的精液/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '135-141',
        any: [/被怪物大量的粘稠精液灌满了/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '143-145',
        any: [/身上的触手、吐出了体液/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '30-108',
        any: [/IF TFLAG:9 == 0/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '3041-3046',
        any: [/IF TFLAG:31 == 2/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '113-116',
        any: [/身上的触手、吐出了体液/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '121-124',
        any: [/全身上的触手、一起吐出了大量的体液/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '127-141',
        any: [/被灌入了怪物黏黏糊糊的精液/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '143-144',
        any: [/身上的触手、吐出了体液/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '145-146',
        any: [/全身上的触手、一起吐出了大量的体液/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
