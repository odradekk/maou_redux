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
];
