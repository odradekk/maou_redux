// 变异条目表切片：ere/system/flow/（BEGIN 转场信号与主循环状态机）。
// 字段与运行方式见 tools/mutation-check.mjs 头注释。desc 里的 M 编号不人工
// 分配，只作引用基准，但全表必须唯一（#295；M117 曾被两票撞号，已改正）。
//
// #790 建片：本文件域的条目此前随各自功能票落在别处（kojo.mjs 的装载行、
// page.mjs 的 M257、train.mjs 的注册行），那些留在原处不搬。

export const COUNT = 3; // #790 建片 3 条（M13711-M13713：状态处理器表与 STATE 枚举的同步）

export default [
  {
    desc: 'M13711 处理器表漏掉枚举里的 SHOP_AFTER_LOAD（键集比枚举少一项）',
    file: 'ere/system/flow/main-loop.js',
    find: `  [STATE.SHOP_AFTER_LOAD]: () => run_shop({ skip_eventshop: true }),
`,
    replace: `  // 变异：SHOP_AFTER_LOAD 不接处理器
`,
    tests: ['main-loop'],
    must_mention: 'STATE_HANDLERS 必须为 STATE 枚举的每个取值备一个处理器',
  },
  {
    desc: 'M13712 枚举新增取值而没有接处理器（键集比枚举少一项）',
    file: 'ere/system/flow/begin-signal.js',
    find: `  TURNEND: 'TURNEND',`,
    replace: `  TURNEND: 'TURNEND',
  // 变异：枚举多一项而没有对应处理器
  SHOP_AFTER_SAVE: 'SHOP_AFTER_SAVE',`,
    tests: ['main-loop'],
    must_mention: 'STATE_HANDLERS 必须为 STATE 枚举的每个取值备一个处理器',
  },
  {
    desc: 'M13713 处理器表留着一个空条目（键在、值不是函数）',
    file: 'ere/system/flow/main-loop.js',
    find: `  [STATE.TURNEND]: async () => await emit('EVENTTURNEND'),`,
    replace: `  [STATE.TURNEND]: undefined, // 变异：处理器置空`,
    tests: ['main-loop'],
    must_mention: '状态 TURNEND 的处理器必须是函数',
  },
];
