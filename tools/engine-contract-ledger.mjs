// 引擎契约待办条目表（issue #91）：契约测试（test/engine-contract.test.js）查出
// 的、第一层（allowWait 状态机一簇：addTotalLines / setTotalLines /
// waitAnyKey / getLineCount / clear 守卫链）范围之外的有意分歧，逐条冻结。
//
// 条目标识 = id + witness：witness 是分歧在夹具里的**见证注释**原文片段——
// 不用行号（#72 教训：行号随编辑腐烂），注释挪动只要片段仍在就不算过期失效。
// 两项检查在 tools/engine-contract-check.mjs：
//   只能变短：新条目必须同时显式改检查器内嵌的 #91 基线（LEDGER_BASELINE），
//     在版本库差异里看得见——条目表是「尚未对齐」的待办表，不是「可以不
//     一致」的许可；
//   不许过期失效：witness 必须仍能在 test/helpers/era-fixture.js 里找到——分歧
//     被修复（镜像补上、注释删除）后条目必须同步删，留着就红。
// 消化一条待办 = 把镜像补进夹具（第一层范围）或立「永久偏离」用例，然后
// 删本表条目。与 docs/stub-registry.md 互不收纳：那份收的是未移植的 ERB
// 功能，这里收的是夹具与引擎的已查实分歧。

export const ENGINE_CONTRACT_LEDGER = [
  {
    id: 'printAndWait-internal-wait',
    desc: 'printAndWait 的内部等待不镜像：引擎 = print + waitAnyKey 两步组合（app.asar 逐字），夹具只 print——waits / inputs_consumed 只记显式 waitAnyKey，注入点对「等待」的观测方式由 fixture 用例钉住',
    witness: 'printAndWait 的内部等待',
  },
  {
    id: 'setback-setoverlay-rearm',
    desc: 'setBack / setOverlay 的独立 allowWait 置位不镜像（两个方法各以 allowWait=!0 收尾；游戏代码未用，夹具走兜底记录层）',
    witness: 'setBack/setOverlay 的独立',
  },
  {
    id: 'input-continue-field',
    desc: 'input 回包的 continue 字段不进夹具：引擎以它维护 isContinue（右键快进态），夹具 take_input 只回纯值、isContinue 由测试旋钮代位',
    witness: '以本旋钮代位',
  },
  {
    id: 'waitanykey-input-roundtrip',
    desc: "waitAnyKey 的等待不取输入：引擎内部走 input({any:true}) 真等一回渲染层回包，夹具只记录（inputs_consumed 记 {api:'waitAnyKey'}），不动预置输入队列",
    witness: '不取输入队列（既定桩策略）',
  },
  {
    id: 'waitanykey-fromclear-useRule',
    desc: 'waitAnyKey → input 的 fromClear / useRule 渲染层簿记参数不镜像（只影响渲染层记账，不影响 {行数, allowWait} 投影）',
    witness: 'fromClear/useRule（渲染层簿记参数）',
  },
];
