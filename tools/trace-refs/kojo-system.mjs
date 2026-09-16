// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：kojo-system.mjs

export const FILES = [
  {
    js: 'ere/kojo/kojo-system.js',
    refs: [
      {
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '12-15',
        any: [/^@EVENTSHOP/m, /^SIF FLAG:7 == 0$/m],
      },
      // #213：接触面契约（七道头部守卫）的出处锚
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '888-912',
        any: [/@KOJO_MESSAGE_COM_3/, /SIF TFLAG:899/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '86-144',
        any: [/^@GET_KOJO_NUM/m, /^RETURNF LOCAL$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '89-91',
        any: [/^LOCAL = 0$/m, /^\tARG = TARGET$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '135',
        any: [/GET_EX_KOJO_NUM\(ARG\)/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '137-140',
        any: [/^FOR COUNT,160,180$/m, /^\t\tLOCAL = COUNT - 60$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '139',
        any: [/^\t\tLOCAL = COUNT - 60$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '150-162',
        any: [/^@KOJO_MESSAGE_COM$/m, /TRYCALLFORM KOJO_MESSAGE_COM_/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '151-152',
        any: [/^SIF FLAG:7 <= 0$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '155-157',
        any: [
          /^\tLOCAL = GET_KOJO_NUM\(\)$/m,
          /^SIF FLAG:LOCAL == 0 && EX_FLAG:\(LOCAL - 900\) == 0$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '156',
        any: [/EX_FLAG:\(LOCAL - 900\) == 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '160-161',
        any: [/^\tTRYCALLFORM KOJO_MESSAGE_COM_\{LOCAL - 100\}$/m],
      },
      // EX 口上待办的两处源引用（文件头说明）
      {
        src: 'target/ERB/其他/EXCOM.ERB',
        ref: '31-38',
        any: [/^@GET_EX_KOJO_NUM\(ARG\)$/m, /^FOR COUNT,101,801$/m],
      },
      // SELF_KOJO
      {
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '225-241',
        any: [/@SELF_KOJO/, /TRYCALLFORM SELF_KOJO_K/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '342-354',
        any: [/@NTR_KOUJO/, /TRYCALLFORM NTR_KOUJO_K/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '657-665',
        any: [/^	Q = 1$/m, /^	Q = 2$/m, /^	Q = 0$/m],
      },
      // —— #403（N19）EVENT_K.ERB 分发表：22 条 TRYCALLFORM 的入口 ——
      {
        // 三个 eraWiz 未使用的入口（TRYCALLFORM 在原作是注释态，不派发）
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '24',
        any: [/^@KOJO_MESSAGE_COM_MASTER$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '44',
        any: [/^@KOJO_MESSAGE_COM_ASSI$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '68',
        any: [/^@KOJO_MESSAGE_PLAYERCHANGE$/m],
      },
      {
        // PALAMCNG 的两道守卫与 COM 同款（含 EX_FLAG 臂，#403 补齐）
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '169-181',
        any: [/^@KOJO_MESSAGE_PALAMCNG$/m],
      },
      {
        // KOJO_EVENT_COM：恒空转的死分发（#14：目标全库 0 个定义）
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '209-219',
        any: [/^@KOJO_EVENT_COM$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '218',
        any: [/^\tTRYCALLFORM KOJO_EVENT_COM_\{LOCAL - 100\}$/m],
      },
      {
        // ATTACK_KOUJO 带参（TARGET = ARG:0）；ATTACK_KOUJO_B 吃全局 B
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '311-323',
        any: [/^@ATTACK_KOUJO,/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '325-337',
        any: [/^@ATTACK_KOUJO_B$/m],
      },
      {
        // 处刑首五族（#403 从五个事件模块的内联块收口到 kojo-system 入口）
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '357-367',
        any: [/^@EXUCUTION_KOUJO$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '366',
        any: [/^\tTRYCALLFORM EXUCUTION_KOUJO_K\{LOCAL - 100\}$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '372-382',
        any: [/^@MUSEUM_KOUJO$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '387-397',
        any: [/^@BANISHMENT_KOUJO$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '402-412',
        any: [/^@PUBLIC_EXUCUTION_KOUJO$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '417-427',
        any: [/^@GROTESQUE_KOUJO$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
