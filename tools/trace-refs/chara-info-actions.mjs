// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #391：chara-info-actions.js 的锚表

const FUNC = 'target/ERB/キャラ関数/CHARA_INFO_FUNC.ERB';
const MOD_FUNC = 'target/ERB/MOD/一键升级/CHARA_INFO_FUNC.ERB';

export const FILES = [
  {
    js: 'ere/chara/chara-info-actions.js',
    refs: [
      { src: FUNC, ref: '3-6', any: [/@IS_ABLE_TO_ABILITY_UP\(ARG\)/] },
      { src: FUNC, ref: '9-11', any: [/@IS_ABLE_TO_CLOTH\(ARG\)/] },
      { src: FUNC, ref: '14-18', any: [/@CHARA_INFO_RESTORE_STATE\(ARG\)/] },
      { src: FUNC, ref: '20-46', any: [/@CHARA_INFO_RECOVER_HP\(ARG\)/] },
      { src: FUNC, ref: '48-88', any: [/@CHARA_INFO_UP_LEVEL\(ARG\)/] },
      { src: FUNC, ref: '89-122', any: [/@CHARA_INFO_CALLBACK\(ARG\)/] },
      { src: FUNC, ref: '89', any: [/@CHARA_INFO_CALLBACK\(ARG\)/] },
      {
        src: MOD_FUNC,
        cite: true, // 逐字节比对结论的引用（硬约束七核实），非该 MOD 文件已移植
        //   的证据——MOD_FUNC 的 CHARA_INFO_UP_LEVEL 批量购买变体不在本票
        //   实现，留给阶段 6（#391 文件头有完整说明）
        ref: '119',
        any: [/@CHARA_INFO_CALLBACK\(ARG\)/],
      },
      { src: FUNC, ref: '33', any: [/^\s*IF\ RESULT\ <\ 0\s*$/m] },
      { src: FUNC, ref: '35', any: [/^\s*ELSEIF\ RESULT\ >\ 1\s*$/m] },
      { src: FUNC, ref: '39-40', any: [/^\s*ELSEIF\ RESULT\ ==\ 0\s*$/m] },
      { src: FUNC, ref: '83', any: [/EX_FLAG:4444\ -=\ LOCAL\ \*100/] },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
