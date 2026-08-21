// 变异台账切片：test/helpers/（测试夹具与引擎对拍助手的镜像语义）。
// 字段与运行方式见 tools/mutation-check.mjs 头注释；新增/删除条目必须同步改
// 工具里的 LEDGER_COUNT_BASELINE（两道门）。desc 里的 M 编号是历史惯性编号
// （M117 曾被两票撞号使用），只作引用锚点保留，不再人工分配。
export default [
  {
    desc: 'M84 夹具 printButton 不记 accelerator（菜单对拍失去编号键）',
    file: 'test/helpers/era-fixture.js',
    find: `  const make_button_entry = (content, accelerator, config) => {
    const text = normalize_content(content);
    return {
      type: 'button',
      text,
      accelerator,`,
    replace: `  const make_button_entry = (content, accelerator, config) => {
    const text = normalize_content(content);
    return {
      type: 'button',
      text,
      accelerator: undefined, // 变异：不记编号`,
    tests: ['compare-first-turn', 'page-usercom'],
    must_mention: '分类计数与当前欠账清单一致',
  },
  {
    desc: 'M93 夹具 printMultiColumns 不再记录（print 系覆盖的缺口）',
    file: 'test/helpers/era-fixture.js',
    find: `  era.printMultiColumns = (columnObjects) =>
    push_row((columnObjects ?? []).map(make_grid_entry));`,
    replace: `  era.printMultiColumns = (columnObjects) =>
    push_row([]); // 变异：不记录`,
    tests: ['fixture'],
    must_mention: 'printMultiColumns',
  },
  {
    desc: 'M103 Row 归并改坏：一次调用的条目逐格递增（退回逐格计数）',
    file: 'test/helpers/era-fixture.js',
    find: `  const push_row = (entries) => {
    const row = total_rows;
    entries.forEach((entry) => {
      entry.row = row;
      lines.push(entry);
      lines_history.push(entry);
    });
    total_rows += 1;
    allow_wait = true;
    return total_rows;
  };`,
    replace: `  const push_row = (entries) => {
    const row = total_rows;
    entries.forEach((entry) => {
      entry.row = row;
      lines.push(entry);
      lines_history.push(entry);
      total_rows += 1; // 变异：逐格计数
    });
    allow_wait = true;
    return total_rows;
  };`,
    tests: ['fixture'],
    must_mention: '算一个 Row',
  },
  {
    desc: 'M104 clear 按 Row 删改坏：退回按条目数切（clear(1) 误伤邻行）',
    file: 'test/helpers/era-fixture.js',
    find: `    const cut = lines.findIndex(
      (l) => l.row !== undefined && l.row >= total_rows,
    );
    if (cut >= 0) {
      lines.splice(cut);
    }`,
    replace: `    lines.splice(Math.max(0, lines.length - n)); // 变异：按条目数删`,
    tests: ['fixture'],
    must_mention: 'clear(1) 只删本行',
  },
  {
    desc: 'M105 替换系改坏：replace_row 只弹一条（多列 Row 换不干净）',
    file: 'test/helpers/era-fixture.js',
    find: `    if (row >= 0) {
      for (let i = lines.length - 1; i >= 0; i -= 1) {
        if (lines[i].row === row) {
          lines.splice(i, 1);
        }
      }
    }`,
    replace: `    if (row >= 0) {
      lines.pop(); // 变异：只弹一条
    }`,
    tests: ['fixture'],
    must_mention: 'replaceText 换掉最后一个 Row',
  },
  {
    desc: 'M106 getLineCount 改回条目数（多列 Row 计数虚高）',
    file: 'test/helpers/era-fixture.js',
    find: '  era.getLineCount = () => total_rows;',
    replace: '  era.getLineCount = () => lines.length; // 变异：条目数',
    tests: ['fixture'],
    must_mention: '算一个 Row',
  },
  {
    desc: 'M107 input 回显计行删除（组件重绘差一行的主路径缺陷回归）',
    file: 'test/helpers/era-fixture.js',
    find: `    if (input_echo_adds_row(config)) {
      total_rows += 1; // this.print(回显值)：+1 Row
      allow_wait = true; // 回显经 print → addTotalLines：同样置位（逐字）
    }`,
    replace: '    // 变异：回显不计行',
    tests: ['fixture'],
    must_mention: '组件首行残留',
  },
  {
    desc: 'M122 夹具 playMusic 不再校验类型（图片名也能命中——引擎只认 audio）',
    file: 'test/helpers/era-fixture.js',
    find: "    const played =\n      list.find((name) => res_registry.get(name) === 'audio') ?? null;",
    replace:
      '    const played = list.find((name) => res_registry.has(name)) ?? null;',
    tests: ['fixture'],
    must_mention: '第一个注册音频',
  },
  {
    desc: 'M123 夹具查名不再小写（注册与查名两侧小写是引擎实测语义）',
    file: 'test/helpers/era-fixture.js',
    find: `    const results = names.map(
      (name) => res_registry.get(String(name).toLowerCase()) === 'image',
    );`,
    replace: `    const results = names.map(
      (name) => res_registry.get(String(name)) === 'image',
    );`,
    tests: ['fixture'],
    must_mention: '小写',
  },
  {
    desc: 'M125 playMusic 误计一行（引擎只 connect 不调 addTotalLines——不占 Row 的判断要有用例守）',
    file: 'test/helpers/era-fixture.js',
    find: `  era.playMusic = (names, config) => {
    const cfg = typeof config === 'object' ? config : { loop: false }; // 引擎：非对象重置`,
    replace: `  era.playMusic = (names, config) => {
    push_row([]); // 变异：音乐误算一行（派单人独立变异复现过的假绿形态）
    const cfg = typeof config === 'object' ? config : { loop: false }; // 引擎：非对象重置`,
    tests: ['fixture'],
    must_mention: '不占 Row',
  },
  {
    desc: 'M146 waitAnyKey 无条件等（无输出也记等待——夹具 allowWait 镜像失守）',
    file: 'test/helpers/era-fixture.js',
    find: '    const waited = allow_wait || Boolean(force);',
    replace: '    const waited = true; // 变异：无条件等',
    tests: ['fixture'],
    must_mention: '无输出跳过',
  },
  {
    desc: 'M147 输出不再置位 allowWait（有输出也不等——玩家看不到存根）',
    file: 'test/helpers/era-fixture.js',
    find: '    allow_wait = true;\n    return total_rows;',
    replace: '    return total_rows;',
    tests: ['fixture', 'page-main-menu'],
    must_mention: '有输出才等键',
  },
  {
    desc: 'M167 夹具 addTotalLines 镜像不置位（任何输出后 allowWait 恒假）',
    file: 'test/helpers/era-fixture.js',
    find: `    total_rows += 1;
    allow_wait = true;
    return total_rows;`,
    replace: `    total_rows += 1;
    return total_rows;`,
    tests: ['engine-contract'],
    must_mention: '逐步一致',
  },
  {
    desc: 'M168 夹具 waitAnyKey 不清零 allowWait（等待消费被漏）',
    file: 'test/helpers/era-fixture.js',
    find: `    const waited = allow_wait || Boolean(force);
    allow_wait = false;`,
    replace: `    const waited = allow_wait || Boolean(force);`,
    tests: ['engine-contract', 'fixture'],
    must_mention: '中途分叉（一）',
  },
  {
    desc: 'M169 夹具 clear 的 setTotalLines 再置位被删（清屏不算新内容）',
    file: 'test/helpers/era-fixture.js',
    find: `    if (total_rows !== before) {
      allow_wait = true;
    }`,
    replace: `    // 变异：清屏不再置位`,
    tests: ['engine-contract'],
    must_mention: '中途分叉（二）',
  },
  {
    // 注：must_mention 原为「#68 形态」（#91 落地时的短语，住在引擎门控的
    // engine-contract.test.js 里——无引擎执行点（CI，#89）暴露：该用例跳过
    // 时 fixture.test.js 侧虽红但文案不含短语，被误判假绿。改指 fixture
    // 侧也在场的「回显计一行」，两侧环境都能点名，无弱化。
    desc: 'M170 夹具 input 回显不计行不置位（#68 形态：Row 记账错位）',
    file: 'test/helpers/era-fixture.js',
    find: `      total_rows += 1; // this.print(回显值)：+1 Row
      allow_wait = true; // 回显经 print → addTotalLines：同样置位（逐字）`,
    replace: `      // 变异：回显不计行不置位`,
    tests: ['engine-contract', 'fixture'],
    must_mention: '回显计一行',
  },
  {
    desc: 'M171 夹具 clear 的 disableClear 短路被拆（配置开着也照清）',
    file: 'test/helpers/era-fixture.js',
    find: `    if (system_config.disableClear) {
      return total_rows;
    }`,
    replace: `    // 变异：disableClear 短路被拆`,
    tests: ['engine-contract'],
    must_mention: 'disableClear 下 clear 整体无操作',
  },
  {
    desc: 'M178 engine-bundle 模块号漂移守卫被拆（漂移时炸 TypeError 而非说清引擎变了）',
    file: 'test/helpers/engine-bundle.js',
    find: '    !ERA_API_METHODS.every(',
    replace: '    false && !ERA_API_METHODS.every(',
    tests: ['engine-contract'],
    must_mention: '引擎变了',
  },
];
