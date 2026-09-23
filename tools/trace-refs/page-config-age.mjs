// 源: tools/trace-check.mjs  @FILES
// issue #547 新增：ere/page/page-config-age.js ↔ target/ERB/キャラ関数/CHARA_BODY.ERB
// （@CONFIG_AGE_SETTING :853-929 与 @RACE_CONFIG :931-1333 的逐段引用）。
// 锚按所引区间内的整行字面量挑选（平行复现的行改用区间内唯一可辨的行，
// 锚点质量全文量见 --anchor-quality --all）。

const BODY = 'target/ERB/キャラ関数/CHARA_BODY.ERB';

export const FILES = [
  {
    js: 'ere/page/page-config-age.js',
    refs: [
      { src: BODY, ref: '853-929', any: [/^\s*@CONFIG_AGE_SETTING\s*$/m] },
      { src: BODY, ref: '865-866', any: [/SIF GETBIT\(FLAG:5,13\)\s*$/m] },
      { src: BODY, ref: '888-894', any: [/^\tELSEIF RESULT == 9\s*$/m] },
      {
        src: BODY,
        ref: '890-891',
        any: [/FLAG:26 = 232015325431115011\n\t*FLAG:27 = 001001/],
      },
      {
        src: BODY,
        ref: '899-929',
        any: [/;年齢・身長などを使用する場合は全キャラに設定/],
      },
      {
        src: BODY,
        ref: '900-929',
        any: [/IF GETBIT\(FLAG:5,12\) \|\| GETBIT\(FLAG:5,15\)/],
      },
      {
        src: BODY,
        ref: '903-904',
        any: [/FLAG:26 = 232015325431115011\n\t*FLAG:27 = 001001/],
      },
      { src: BODY, ref: '909-910', any: [/^\t\tSIF LCOUNT == 0\s*$/m] },
      { src: BODY, ref: '911', any: [/IF CFLAG:\(LCOUNT\):451 == 0/] },
      { src: BODY, ref: '912-919', any: [/;村娘Ａ・Ｂのみ年齢を指定してみる/] },
      { src: BODY, ref: '920-926', any: [/CFLAG:\(LCOUNT\):451 = RESULT:0/] },
      { src: BODY, ref: '931-1333', any: [/^\s*@RACE_CONFIG\s*$/m] },
      { src: BODY, ref: '934-941', any: [/;1 エルフ\t0/] },
      { src: BODY, ref: '957-968', any: [/;計算用変数にフラグを代入/] },
      { src: BODY, ref: '972-1022', any: [/PRINTFORM 　　 种族/] },
      {
        src: BODY,
        ref: '997-1015',
        any: [/RACE_CLA:LCOUNT == 0 && RACE_NUM:LCOUNT == 1 && RACE_DEG:LCOUNT == 0/],
      },
      { src: BODY, ref: '1015-1016', any: [/^\tELSE\n\tENDIF$/m] },
      { src: BODY, ref: '1030-1086', any: [/\$INPUT_LOOP1/] },
      { src: BODY, ref: '1035-1048', any: [/PRINTL 全种族的年龄均返回默认值。/] },
      { src: BODY, ref: '1036-1041', any: [/PRINTL 全种族的年龄均返回默认值。/] },
      {
        src: BODY,
        ref: '1043-1044',
        any: [/FLAG:26 = 232015325431115011\n\t*FLAG:27 = 001001/],
      },
      { src: BODY, ref: '1049-1083', any: [/;作業に使っていた変数をFLAG:26、FLAG:27に保存/] },
      { src: BODY, ref: '1050-1057', any: [/^\t*FLAG:26 = 0\s*$/m] },
      {
        src: BODY,
        ref: '1060-1065',
        any: [/PRINTL 全种族的年龄按现在的设定重新计算。/],
      },
      { src: BODY, ref: '1066-1074', any: [/RANDOMIZE GETMILLISECOND\(\)/] },
      { src: BODY, ref: '1082-1083', any: [/^\tSIF RESULT == 100\s*$/m] },
      {
        src: BODY,
        ref: '1088-1108',
        any: [/;保存されていた种族用フラグを表示用フラグにコピー/],
      },
      {
        src: BODY,
        ref: '1099-1100',
        any: [/SIF SET_VAR:0 == 0 && SET_VAR:1 == 0 && SET_VAR:2 == 1/],
      },
      { src: BODY, ref: '1110-1163', any: [/PRINT ■ 种族 \[/] },
      {
        src: BODY,
        ref: '1130-1162',
        any: [/PRINTFORML 换算成人类年龄的\{SET_VAR:2 \* POWER\(10, SET_VAR:1\), 4\} 倍/],
      },
      { src: BODY, ref: '1145-1162', any: [/PRINT 　 换算人类 17 岁左右 /] },
      { src: BODY, ref: '1183-1247', any: [/^\tIF DIS_FLAG == 0\s*$/m] },
      { src: BODY, ref: '1184-1195', any: [/SIF LCOUNT % 10 > 3 && LCOUNT % 10 != 9/] },
      {
        src: BODY,
        ref: '1196-1213',
        any: [/PRINTL 　　\[ 0\]  0\.0 倍 （种族的寿命1年以内）/] },
      { src: BODY, ref: '1214-1246', any: [/PRINTL 　　■ 下限/] },
      { src: BODY, ref: '1254-1331', any: [/\$INPUT_LOOP2/] },
      {
        src: BODY,
        ref: '1258-1274',
        any: [/IF RESULT >= 0 && RESULT < 100 && \(RESULT % 10 != 0 \|\| DIS_FLAG == 1\)/] },
      { src: BODY, ref: '1276-1277', any: [/^\tELSEIF RESULT == 100\s*$/m] },
      { src: BODY, ref: '1295-1317', any: [/^\tELSEIF RESULT == 111\s*$/m] },
      { src: BODY, ref: '1297-1317', any: [/^\tELSEIF RESULT == 111\s*$/m] },
      { src: BODY, ref: '1319-1329', any: [/^\tELSEIF RESULT == 999\s*$/m] },
    ],
  },
];

export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {};
