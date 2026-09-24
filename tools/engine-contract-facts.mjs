// 引擎事实表（issue #91，ADR-0005 第二层）：夹具与调用点共同依赖的引擎
// 渲染层语义。一条事实只写一遍，同时喂两件事——
//   锚点校核（tools/engine-contract-check.mjs 门 B）：断言 app.asar 渲染层
//     源码（js/app.*.js.map 的 sourcesContent，即 app.vue 出货前源码的
//     原始副本）仍含本表 anchors 列出的**字面**——引擎升版改掉任一字面
//     即红、提示「引擎变了，重新核读」，守的是「引擎还是不是这样」；
//   调用点规则（门 A）：静态守「我们有没有踩上去」。规则的阈值来自同一
//     条事实（progress 的上界 23 由缺省 24 推出），不在检查器里再写一份。
//
// 收录判据（工单边界）：只收「夹具行为真的依赖它」且可断言的事实——
// anchors 能在渲染层源码里逐字钉住的才进表；「引擎主/渲染两层在 0 行时
// 分歧」一类背景叙述不进表。第一层（background.js 的 allowWait 状态机）
// 不在本表：它由 test/engine-contract.test.js 以真方法逐步比对守——
// **可执行的不锚定，锚定的不执行**，两层不重复设防。
//
// anchors 是渲染层 sourcesContent 的字面子串（非正则）：锚点校核的语义
// 就是「这个字面还在不在」，正则会引入自身的漂移面。渲染包文件名带内容
// 哈希（app.2cccec57.js），定位由检查器按模式 js/app.*.js.map 匹配，
// 不写死。新事实必须先在渲染层源码里实证字面，再进表（表只能有意识地长）。

export const ENGINE_FACTS = [
  {
    id: 'progress-bar-width-default',
    desc: '进度条 barWidth 缺省 24：getProgressObject 物化 data.config.barWidth ?? 24；条后文字列 span = 24 - line.barWidth，barWidth=24 时 span=0（el-col-0 即 display:none），条后数值整列不渲染——不传 config 就吞数值（#74 实机缺陷形态）',
    // 夹具镜像位：锚点失配时报错指路用
    mirror:
      'test/helpers/era-fixture.js make_progress_entry（bar_width 物化 + out_visible 派生）',
    anchors: [
      'barWidth: data.config.barWidth ?? 24',
      ':span="24 - line.barWidth"',
      'v-if="line.outContent"',
    ],
    // 调用点规则（首日唯一一条）：targets 是检查器里的两种提取形态
    rule: {
      id: 'progress-bar-width-explicit',
      desc: 'progress 格必须显式传 barWidth 且 1 ≤ barWidth ≤ 23（上界 = 缺省 24 - 1：24 是引擎缺省，不传或传 24 都吞掉条后文字列）',
      targets: ['printProgress-call', 'progress-grid-object'],
      min: 1,
      max: 23,
      remedy:
        '给 config 显式传 1..23 的 barWidth（参照 ere/page/page-train.js 的 PALAM_PROGRESS_BAR_WIDTH = 16）',
    },
  },
  {
    id: 'button-acc-prefix-fold',
    desc: '按钮渲染公式：showAcc !== false 时拼 `[快捷键] 正文`，否则 `[正文]`；随后按行把连续空白折叠成一个空格——手写 [编号] 前缀会与引擎前缀撞车（PR #30 实机缺陷形态）',
    mirror: 'test/helpers/era-fixture.js make_button_entry 的 rendered 字段',
    anchors: [
      '`[${data.accelerator}] ${data.content}`',
      ': `[${data.content}]`',
      ".replace(/\\s+/g, ' ')",
    ],
    rule: null, // 首日无调用点规则（「按钮正文不写 [编号] 前缀」待后续票立规则）
  },
  {
    id: 'divider-is-solid-border',
    desc: "分隔线线型：border = isSolid ? 'solid' : 'dashed'——原作 DRAWLINEFORM 双线 ═ / 单线 ─ 以 solid/dashed 近似",
    mirror:
      'test/helpers/era-fixture.js drawLine 与多列 divider 格的 border 字段',
    anchors: ["border: data.config.isSolid ? 'solid' : 'dashed'"],
    rule: null,
  },
  {
    // #163：手册 A-api-docs.md 曾写 useRule 默认 false，渲染层逐字是
    // safeUndefinedCheck(data.config.useRule, true)——默认 true，显式传
    // false 才关。夹具的白名单校验正依赖这个缺省（不传 config.useRule
    // 时校验生效），符合「夹具行为真的依赖它」的收录判据。
    id: 'input-userule-default-true',
    desc: 'input 的 useRule 缺省 true：渲染层 safeUndefinedCheck(data.config.useRule, true) 兜底——不传时本轮按钮快捷键白名单与 config.rule 正则校验默认生效',
    mirror:
      'test/helpers/era-fixture.js era.input 的白名单校验（config?.useRule !== false 分支，#130）',
    anchors: ['safeUndefinedCheck(data.config.useRule, true)'],
    rule: null, // 只锚默认值；「何时该显式传 false」无静态可判的调用点规则
  },
  {
    // #567：空输入语义的判据第二条（第一条 getNumber 归一由
    // test/fixture.test.js 的引擎用例直接断言）。夹具输入段的注释早已引用这条
    // 守卫（#130 的白名单镜像未含它），#567 把它升格成「0 即空输入」全库裁定
    // 的支柱之一，故进表锚定——引擎升版改掉它，这条判据会静默失效。
    id: 'input-empty-submit-guard',
    desc: "input 的渲染层不受理空提交：returnFromInput 对非 any 输入有空守卫——`!inputParam.value['any'] && !inputParam.value['val']` 为真时直接 return，普通 input() 下玩家根本交不出空串（#567 空输入判据的第二条依据）",
    mirror:
      'test/helpers/era-fixture.js 输入段的注释（#130 白名单镜像未含这条守卫）+ ere/utils/input-text.js 文件头的「引擎事实 2」',
    anchors: [
      `function returnFromInput() {
  if (!inputParam.value['any'] && !inputParam.value['val']) {`,
    ],
    rule: null, // 只锚事实；判据的消费点（input_text）无静态可判的调用点规则
  },
  {
    // #572：选按钮化站点时逐处判断的两条渲染层事实。夹具不镜像 valCount
    //（按钮条目只记 config.disabled，不做时序禁用），收录理由是实现决策真的
    // 依赖它——dungeon-after 的「WAIT 在菜单之前 ⇒ 按钮照常可点」与
    // chara-custom、page-dungeon-info2 的「WAIT 夹在选项与 INPUT 之间 ⇒
    // 按钮整批点不动」都按这条判。
    id: 'button-valcount-disables-earlier',
    desc: '早先打印的按钮会被禁用：getButtonObject 记 valCount = buttonValCount，模板按 `line.valCount < buttonValCount` 置 disabled；buttonValCount 在任何一次成功回传后 +1（returnFromButton 在 disableBefore 为真时自增，waitAnyKey 内部就是一次 input({any:true})）——故「WAIT 夹在选项与 INPUT 之间」的界面里，选项按钮整批点不动',
    mirror:
      '（夹具不镜像时序禁用：按钮条目只记 config.disabled，见 make_button_entry）',
    anchors: [
      'valCount: buttonValCount.value,',
      ':disabled="!!line.disabled || line.valCount < buttonValCount"',
    ],
    rule: null,
  },
  {
    // #572 的 C 类修正：useRule 只关校验分支，不封锁按钮。
    id: 'input-userule-false-keeps-buttons',
    desc: 'useRule: false 只跳过校验：returnFromButton 整段校验包在 `if (inputParam.value[useRule])` 里，关掉后点按钮与键入都直接回传——按钮与自由输入可并存（#572 的「按钮 + useRule: false」处置据此，先例 event-museum.js:83-85）',
    mirror:
      'test/helpers/era-fixture.js era.input 的 `if (config?.useRule !== false)` 分支（#130）',
    anchors: ["if (inputParam.value['useRule']) {"],
    rule: null,
  },
];
