// 变异条目表切片：ere/system/flow/（BEGIN 转场与主循环状态机）。
// 字段与运行方式见 tools/mutation-check.mjs 头注释。desc 里的 M 编号不人工
// 分配，只作引用基准，但全表必须唯一（#295；M117 曾被两票撞号，已改正）。
//
// #790 建片：本文件域的条目此前随各自功能票落在别处（kojo.mjs 的装载行、
// page.mjs 的 M257、train.mjs 的注册行），那些留在原处不搬。
// #850 追加 M15600-M15610：转场从异常信号改成返回值后，新增的判定与上抛点。
// #849 追加 M17200-M17204：事件名枚举（ere/data/event-name-const.js）与
// on / emit 的未知名校验——注册与触发只认枚举、名字拼错当场抛错。

export const COUNT = 19; // #790 建片 3 条 + #850 新增 11 条（M15600-M15610）+ #849 新增 5 条（M17200-M17204）

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
    file: 'ere/system/flow/game-state.js',
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
    find: `  [STATE.TURNEND]: async () => await emit(EVENT.TURNEND),`,
    replace: `  [STATE.TURNEND]: undefined, // 变异：处理器置空`,
    tests: ['main-loop'],
    must_mention: '状态 TURNEND 的处理器必须是函数',
  },
  {
    desc: 'M15600 begin() 不再校验目标（笔误变成悬空状态，进了状态机才炸）',
    file: 'ere/system/flow/game-state.js',
    find: `  if (!STATE_VALUES.has(state)) {`,
    replace: `  if (false) { // 变异：未知目标不再当场报错`,
    tests: ['game-state'],
    must_mention: 'begin() 拒绝未知目标',
  },
  {
    desc: 'M15601 is_state 放行任意字符串（普通返回值被当成转场目标）',
    file: 'ere/system/flow/game-state.js',
    find: `  return STATE_VALUES.has(value);`,
    replace: `  return typeof value === 'string'; // 变异：任意字符串都算状态`,
    tests: ['game-state'],
    must_mention: '普通返回值一律不是转场',
  },
  {
    desc: 'M15602 emit 不再暂存处理器返回的转场目标（链内 BEGIN 全丢）',
    file: 'ere/system/event/registry.js',
    find: `      const next = await handler(...args);
      if (is_state(next)) {
        pending = next;
      }`,
    replace: `      await handler(...args); // 变异：转场目标不再暂存`,
    tests: ['event-registry'],
    must_mention: '剩余处理器仍然全部执行',
  },
  {
    desc: 'M15603 emit 把处理器的普通返回值也当转场（暂存槽被数字/近似串覆盖）',
    file: 'ere/system/event/registry.js',
    find: `      if (is_state(next)) {
        pending = next;
      }`,
    replace: `      if (next !== undefined) {
        pending = next;
      }`,
    tests: ['event-registry'],
    must_mention: '只有 STATE 取值才算转场',
  },
  {
    desc: 'M15604 enter_state 不再核对转场目标（缺 BEGIN 与普通返回值都放行）',
    file: 'ere/system/flow/main-loop.js',
    find: `  if (!is_state(next)) {`,
    replace: `  if (next === undefined) { // 变异：非转场目标也放行`,
    tests: ['main-loop'],
    must_mention: '非目标值当场报错',
  },
  {
    desc: 'M15605 run_shop 丢掉 usershop 的转场目标（商店轮不再离开）',
    file: 'ere/page/page-shop.js',
    find: `    const next = await usershop(await era.input());
    // 转场目标上来就离开循环，其余分支（含无效输入）回 show_shop 重绘
    if (is_state(next)) {
      return next;
    }`,
    replace: `    await usershop(await era.input()); // 变异：转场目标被丢弃`,
    tests: ['page-main-menu'],
    must_mention: '跨会话重进 SHOP',
  },
  {
    desc: 'M15606 标题的读档分支丢掉转场目标（读成后回标题重绘，无路可走）',
    file: 'ere/page/page-title.js',
    find: `      const next = await load_game();
      if (is_state(next)) {
        return next;
      }
      continue;`,
    replace: `      await load_game();
      continue; // 变异：读档转场被丢弃`,
    tests: ['page-title'],
    must_mention: '转场进 SHOP_AFTER_LOAD',
  },
  {
    desc: 'M15607 据点 [300] 丢掉读档的转场目标（读成后静默回主菜单）',
    file: 'ere/page/page-shop.js',
    find: `    const loaded = await load_game();
    if (is_state(loaded)) {
      return loaded;
    }`,
    replace: `    await load_game(); // 变异：读档转场被丢弃`,
    tests: ['page-shop'],
    must_mention: 'usershop 以 SHOP_AFTER_LOAD 返回',
  },
  {
    desc: 'M15608 特殊档读档的转场在 inport_a 被吞（EVENTLOAD 链内的 BEGIN 丢失）',
    file: 'ere/system/cross-save-sharing.js',
    find: `      const loaded = await load_special_save(slot);
      // 读到档了：链内转场原样上抛，没有转场就回通信菜单
      if (is_state(loaded)) return loaded;`,
    replace: `      const loaded = await load_special_save(slot); // 变异：链内转场被吞`,
    tests: ['cross-save-sharing-engine'],
    must_mention: '真实引擎导入旧共享档',
  },
  {
    desc: 'M15609 主菜单 [100] 忽略选择页的转场（怪物玩弄后接着进调教）',
    file: 'ere/page/page-shop.js',
    find: `      const selected = await select_target();
      if (is_state(selected)) {
        return selected;
      }`,
    replace: `      const selected = await select_target(); // 变异：选择页的转场被丢弃`,
    tests: ['page-shop'],
    must_mention: '目标选择页「其它」支的转场（怪物玩弄）经 select_target 上抛',
  },
  {
    desc: 'M15610 主菜单 [496] 忽略选择页的转场',
    file: 'ere/page/page-shop.js',
    find: `    const chosen = await select_target();
    if (is_state(chosen)) {
      return chosen;
    }`,
    replace: `    await select_target(); // 变异：选择页的转场被丢弃`,
    tests: ['page-shop'],
    must_mention: '496 分支：选择页「其它」支的转场同样上抛',
  },
  {
    desc: 'M17200 注册处的未知名校验被拆（拼错的事件名又变成一条等不到触发的死链）（#849）',
    file: 'ere/system/event/registry.js',
    find: `  assert_known(event_name, 'on');`,
    replace: `  // 变异：注册处不再校验事件名`,
    tests: ['event-registry'],
    must_mention: 'on() 收到未知事件名',
  },
  {
    desc: 'M17201 触发处的未知名校验被拆（拼错的触发又按空链静默返回）（#849）',
    file: 'ere/system/event/registry.js',
    find: `  assert_known(event_name, 'emit');`,
    replace: `  // 变异：触发处不再校验事件名`,
    tests: ['event-registry'],
    must_mention: 'emit 收到未知事件名',
  },
  {
    desc: 'M17202 事件名枚举少了 EVENTSHOP 一项（枚举与调用点引用的键对不上）（#849）',
    file: 'ere/data/event-name-const.js',
    find: `  SHOP: 'EVENTSHOP',
`,
    replace: ``,
    tests: ['event-name-enum'],
    must_mention: '有 13 个名字',
  },
  {
    desc: 'M17203 事件名枚举不再冻结（运行时可被就地改写，拼错的名字照样能塞进去）（#849）',
    file: 'ere/data/event-name-const.js',
    find: `const EVENT = Object.freeze({`,
    replace: `const EVENT = ({ // 变异：不再冻结`,
    tests: ['event-name-enum'],
    must_mention: '枚举与名单都冻结',
  },
  {
    desc: 'M17204 某个注册点退回裸字符串事件名（枚举的单一出处守卫失效）（#849）',
    file: 'ere/page/page-train.js',
    find: `on(EVENT.SHOW_STATUS, async () => {`,
    replace: `on('SHOW_STATUS', async () => { // 变异：裸字符串事件名`,
    tests: ['event-name-enum'],
    must_mention: '还在写裸字符串事件名',
  },
];
