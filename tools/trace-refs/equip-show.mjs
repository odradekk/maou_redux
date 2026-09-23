// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #546：equip-show.js 的锚表（装备详情显示三函数）

const EQUIP = 'target/ERB/其他/EQUIP.ERB';
const INFO = 'target/ERB/キャラ関数/CHARA_INFO ver1.0.1.ERB';

export const FILES = [
  {
    js: 'ere/system/equip/equip-show.js',
    refs: [
      // 文件头：三个函数本体 + 两个调用点
      {
        src: EQUIP,
        ref: '1030-1071',
        any: [/^@EQUIP_ST_SHOW, ARG:0$/m],
      },
      {
        src: EQUIP,
        ref: '1074-1087',
        any: [/^@SHOW_BUTTON_EQUIP\(NUM, ARG\)$/m],
      },
      {
        src: EQUIP,
        ref: '1090-1113',
        any: [/^@CHECK_ABLE_TO_SHOW_EQUIP,ARG$/m],
      },
      {
        src: INFO,
        ref: '880',
        any: [/^\s*CALL SHOW_BUTTON_EQUIP\(16,ARG\)/m],
      },
      {
        src: INFO,
        ref: '1070-1074',
        any: [/^\s*CALL EQUIP_ST_SHOW, ARG$/m],
      },
      // EQUIP_ST_SHOW 体
      {
        src: EQUIP,
        ref: '1035',
        any: [/^W:0 = CFLAG:ARG:550$/m],
      },
      {
        src: EQUIP,
        ref: '1037-1038',
        any: [/^\s*CALL PRINT_EQUIPTYPE_WEAPON$/m],
      },
      {
        src: EQUIP,
        ref: '1039-1040',
        any: [/^\s*CALL EQUIP_POWERUP,ARG$/m],
      },
      { src: EQUIP, ref: '1042-1043', any: [/^\s*PRINTL \*带有诅咒$/m] },
      { src: EQUIP, ref: '1044-1051', any: [/^\s*SIF W:6 & 1$/m] },
      { src: EQUIP, ref: '1056-1069', any: [/^\s*SIF W:9$/m] },
      { src: EQUIP, ref: '1071', any: [/^\s*RETURN 2$/m] },
      // SHOW_BUTTON_EQUIP 体
      {
        src: EQUIP,
        ref: '1080',
        any: [/^\s*LOCAL = CHECK_ABLE_TO_SHOW_EQUIP\(ARG\)$/m],
      },
      { src: EQUIP, ref: '1081-1084', any: [/^\s*IF LOCAL == 1$/m] },
      {
        src: EQUIP,
        ref: '1085',
        any: [/^\s*PRINTFORM \[\{NUM\}\] 装备情报/m],
      },
      // CHECK_ABLE_TO_SHOW_EQUIP 体：五道 OR 各一条 + 兜底
      { src: EQUIP, ref: '1097', any: [/^\s*SIF CFLAG:ARG:0 > 0$/m] },
      { src: EQUIP, ref: '1100', any: [/^\s*SIF CFLAG:ARG:2 >= 20$/m] },
      { src: EQUIP, ref: '1103', any: [/^\s*SIF ABL:ARG:10 > 0$/m] },
      { src: EQUIP, ref: '1106', any: [/^\s*SIF TALENT:ARG:28$/m] },
      { src: EQUIP, ref: '1109', any: [/^\s*SIF CFLAG:ARG:151 <= 0$/m] },
      { src: EQUIP, ref: '1113', any: [/^\s*RETURNF 1$/m] },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
