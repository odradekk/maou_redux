// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：page-save-load.mjs

export const FILES = [
  {
    js: 'ere/page/page-save-load.js',
    refs: [
      // SYSTEM_DATA.ERB 四函数 + SYSTEM ver1.0.3.ERB 的 @SAVEINFO（#136
      // 存读档界面）。锚取各引用区间内的特征行。
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '5-83',
        any: [/PRINTL 【读取存档】要载入以下哪个存档？/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '88-213',
        any: [/PRINT 【保存存档】/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '220-292',
        any: [/PRINTL 【删除存档】要删除以下哪个存档？/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '297-323',
        any: [/SIF L_I == LASTLOAD_NO \|\| L_I == LAS/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '12',
        any: [/L_POS = L_POS < 0 \? 0 # L_POS/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '14',
        any: [/L_LINECOUNT = LINECOUNT/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '18',
        any: [/CUSTOMDRAWLINE =/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '19',
        any: [/PRINTL 【读取存档】要载入以下哪个存档？/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '20',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '22',
        any: [/CALL SYSTEM_LIST_DATA, L_POS, L_POS /],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '24-34',
        any: [/PRINTFORML  \[\{99,2\}\] %RESULTS%/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '36-39',
        any: [/PRINTFORMLC \[101\] 上一页/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '43',
        any: [/INPUT 99/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '48-49',
        any: [/RETURN L_POS/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '51-57',
        any: [/CLEARLINE LINECOUNT - L_LINECOUNT/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '59-65',
        any: [/CLEARLINE LINECOUNT - L_LINECOUNT/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '67-77',
        any: [/SIF EX_FLAG:2801 < 10/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '73',
        any: [/LOADDATA L_IDX/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '74-75',
        any: [/SIF EX_FLAG:2801 < 10/],
      },
      // #137：RETURN L_POS（:76）只在「没读成」的世界里走到（LOADDATA 后
      // 迁移 @EVENTLOAD 不回调用方）+ @EVENTLOAD 的 MAOUNET 分支出处
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '76',
        any: [/RETURN L_POS/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '769-771',
        any: [/CALL MAOUNET/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '80-82',
        any: [/GOTO INPUT_LOOP/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '101',
        any: [/CUSTOMDRAWLINE =/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '102-108',
        any: [/PRINT 【保存存档】/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '109',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '111',
        any: [/CALL SYSTEM_LIST_DATA, L_POS, L_POS /],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '113',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '114-116',
        any: [/PRINTFORMLC \[200\] 为故事命名/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '114-119',
        any: [/PRINTFORMLC \[200\] 为故事命名/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '117-120',
        any: [/PRINTFORMLC \[101\] 上一页/],
      },
      { src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB', ref: '124', any: [/INPUT/] },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '129-130',
        any: [/RETURN L_POS/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '132-138',
        any: [/CLEARLINE LINECOUNT - L_LINECOUNT/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '140-146',
        any: [/CLEARLINE LINECOUNT - L_LINECOUNT/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '148-152',
        any: [/GOTO SET_NAME/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '149-152',
        any: [/GOTO SET_NAME/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '151',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '154-159',
        any: [/CLEARLINE LINECOUNT - L_LINECOUNT/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '161-174',
        any: [/PRINTL 存档已经存在，确定要覆盖么？/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '165-166',
        any: [/PRINTL 存档已经存在，确定要覆盖么？/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '166',
        any: [/PRINTL \[1\] 确定    \[0\] 取消/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '168-171',
        any: [/CLEARLINE LINECOUNT - L_LINECOUNT/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '176-178',
        any: [/GOTO INPUT_LOOP/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '181-190',
        any: [/PRINTFORMW 已将游戏保存为\{L_IDX\}号存档……/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '182-184',
        any: [/LOCALS = %GETTIMES\(\)% %SAVEDATA_TEXT/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '185',
        any: [/SAVEDATA L_IDX, LOCALS/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '186',
        any: [/ARRAYSHIFT LASTSAVE_NO, 1, L_IDX/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '189',
        any: [/PRINTFORMW 已将游戏保存为\{L_IDX\}号存档……/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '192-213',
        any: [/PRINTFORM 请输入一个名称故事：/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '193',
        any: [/PRINTFORM 请输入一个名称故事：/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '194-197',
        any: [/PRINTBUTTON LOCALS, CSTR:MASTER:99/],
      },
      { src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB', ref: '198', any: [/PRINTL/] },
      { src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB', ref: '200', any: [/INPUTS/] },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '201-203',
        any: [/PRINTFORMW 将故事命名为『%RESULTS%』/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '204-206',
        any: [/PRINTFORMW 将故事命名为『%RESULTS%』/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '207-209',
        any: [/PRINTFORMW 消去了故事的名字/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '212',
        any: [/; CLEARLINE LINECOUNT - L_LINECOUNT/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '213',
        any: [/GOTO DRAW_PAGE/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '227',
        any: [/L_POS = L_POS < 0 \? 0 # L_POS/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '233',
        any: [/CUSTOMDRAWLINE =/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '234',
        any: [/PRINTL 【删除存档】要删除以下哪个存档？/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '235',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '237',
        any: [/CALL SYSTEM_LIST_DATA, L_POS, L_POS /],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '239',
        any: [/DRAWLINE/],
      },
      { src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB', ref: '240', any: [/PRINTL/] },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '242-245',
        any: [/PRINTFORMLC \[101\] 上一页/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '249',
        any: [/INPUT 99/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '253-255',
        any: [/RETURN L_POS/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '257-263',
        any: [/CLEARLINE LINECOUNT - L_LINECOUNT/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '265-271',
        any: [/CLEARLINE LINECOUNT - L_LINECOUNT/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '273-287',
        any: [/PRINTL 确定要删除这个存档么？/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '277',
        any: [/PRINTL 确定要删除这个存档么？/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '280-285',
        any: [/CLEARLINE LINECOUNT - L_LINECOUNT/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '284',
        any: [/DELDATA L_IDX/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '290-292',
        any: [/GOTO INPUT_LOOP/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '302-304',
        any: [/IF L_I >= 99/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '307-308',
        any: [/SETCOLORBYNAME DEEPSKYBLUE/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '307-310',
        any: [/SETCOLORBYNAME DEEPSKYBLUE/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '309-310',
        any: [/SETCOLORBYNAME LIGHTGREEN/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '313-314',
        any: [/PRINTFORML  \[\{L_I,2\}\] %RESULTS%/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '316',
        any: [/SETCOLORBYNAME GRAY/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '316-318',
        any: [/PRINTFORML  \[\{L_I,2\}\] ----/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '317',
        any: [/PRINTFORML  \[\{L_I,2\}\] ----/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '760-778',
        any: [/SIF LASTLOAD_NO >= 1000 && LASTLOAD_/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '954-977',
        any: [/LOCALS = 第\{DAY\+1,2\}日午前/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '955-958',
        any: [/LOCALS = 第\{DAY\+1,2\}日午前/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '959-963',
        any: [/LOCALS = 第\{DAY\+1,2\}日午后/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '960-963',
        any: [/LOCALS = 第\{DAY\+1,2\}日午后/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '966',
        any: [/SIF FLAG:2 >= 0/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '968-972',
        any: [/PUTFORM  正在调教:%SAVESTR:TARGET,14,LEF/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '974-975',
        any: [/PUTFORM %"",24%/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {
  'saveload-natural': [
    {
      js: 'ere/page/page-save-load.js',
      refs: [
        // 【保存存档】前缀的实证行（#161 对拍查出的漏抄，已修复）
        {
          ref: '90',
          any: [/^【保存存档】当前故事还没有名字，要保存到以下哪个存档？/],
        },
      ],
    },
  ],
};
