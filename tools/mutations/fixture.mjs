// 变异条目表切片：test/helpers/（测试夹具与引擎比对助手的镜像语义）。
// 字段与运行方式见 tools/mutation-check.mjs 头注释；新增/删除条目必须同步改
// 工具里的 LEDGER_COUNT_BASELINE（两项检查）。desc 里的 M 编号是历史惯性编号
// （M117 曾被两票撞号使用），只作引用锚点保留，不再人工分配。
export default [
  {
    // 注：find 原覆盖函数头整段（#130 前的形状）；入集合逻辑插进函数体后
    // 按工具规则同步 find/replace 到仍唯一的 return 形状段，变异语义不变。
    desc: 'M84 夹具 printButton 不记 accelerator（菜单比对失去编号键）',
    file: 'test/helpers/era-fixture.js',
    find: `    return {
      type: 'button',
      text,
      accelerator,`,
    replace: `    return {
      type: 'button',
      text,
      accelerator: undefined, // 变异：不记编号`,
    tests: ['compare-first-turn', 'page-usercom'],
    must_mention: '分类计数与当前待办清单一致',
  },
  {
    desc: 'M179 夹具 input 白名单校验被拆（未打印按钮的值照单全收——#130 要防的复发形态）',
    file: 'test/helpers/era-fixture.js',
    find: `    if (config?.useRule !== false) {`,
    replace: `    if (false && config?.useRule !== false) { // 变异：白名单失守`,
    tests: ['fixture'],
    must_mention: '白名单必须拒收',
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
    push_row([]); // 变异：音乐误算一行（派单人独立变异复现过的误报通过形态）
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
    // 注：must_mention 原为「#68 形态」（#91 落地时的短语，住在依赖引擎的
    // engine-contract.test.js 里——无引擎执行点（CI，#89）暴露：该用例跳过
    // 时 fixture.test.js 侧虽红但文案不含短语，被误判误报通过。改指 fixture
    // 侧也在场的「回显计一行」，两侧环境都能报出，无弱化。
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
  {
    desc: 'M258 夹具版本闸门被拆（低版本存档照放——#136 两缺陷同根因的镜像缺口，#137 评论移交）',
    file: 'test/helpers/era-fixture.js',
    find: `    if (record.version && !(record.version < save_gate.allow_version)) {`,
    replace: `    if (true) { // 变异：版本闸门被拆`,
    tests: ['page-save-load'],
    must_mention: '拒读后仍可 [100] 返回（不转场）',
  },
  {
    desc: 'M259 夹具整体替换被拆（loadData 成功也不换数据——转场语义的镜像缺口，#137 评论移交）',
    file: 'test/helpers/era-fixture.js',
    find: `      restore_store(record.snapshot);`,
    replace: `      // 变异：数据不被替换`,
    tests: ['page-save-load'],
    must_mention: '读档成功后读的是存档时的值（数据被整体替换）',
  },
  {
    desc: 'M273 夹具 quit 的 throw 拆回普通返回（降格回无害桩——#148/G5 的镜像缺口本体）',
    file: 'test/helpers/era-fixture.js',
    find: `  era.quit = () => {
    calls.push({ api: 'quit', args: [] });
    throw new Error('quit');
  };`,
    replace: `  era.quit = () => {
    calls.push({ api: 'quit', args: [] });
    // 变异：throw 拆回普通返回（兜底桩形态）
  };`,
    tests: ['fixture', 'event-ending'],
    must_mention: 'QUIT 的异常炸穿 invasion_check',
  },
  {
    desc: 'M276 夹具 saveGlobal 的盖戳写盘被拆（内存代身恒空——#147/G1 的镜像缺口本体）',
    file: 'test/helpers/era-fixture.js',
    find: `  const persist_global = () => {
    global_sav = serialize_global();
    global_sav.version = save_gate.current_version;
    global_sav.code = save_gate.game_code;
    return true;
  };`,
    replace: `  const persist_global = () => {
    // 变异：盖戳写盘被拆（saveGlobal 空转）
    return true;
  };`,
    tests: ['fixture'],
    must_mention: '读回的是落盘时的值',
  },
  {
    desc: 'M277 夹具 loadGlobal 的 gameCode 不匹配 throw 拆回普通返回（降格回无害桩——引擎启动拒绝的机制本体，#147）',
    file: 'test/helpers/era-fixture.js',
    find: `      if (mismatch) {
        // 引擎逐字 \`throw new Error\`——裸抛无 message，装载循环按报错
        // 拒绝启动；夹具同型（先留观测记录再抛，#148 quit 先例）
        throw new Error();
      }`,
    replace: `      if (mismatch) {
        // 变异：throw 拆回普通返回（兜底桩形态）
      }`,
    tests: ['fixture'],
    must_mention: '不匹配必须裸抛 Error 而非返回 false',
  },
  {
    desc: 'M278 夹具 loadGlobal 版本闸门被换成 loadData 的 truthy 写法（version 0 被短路漏放——两处判空写法差异的 loadGlobal 侧，#147）',
    file: 'test/helpers/era-fixture.js',
    find: `        global_sav.version === undefined ||
        global_sav.version < save_gate.allow_version`,
    replace: `        global_sav.version && !(global_sav.version < save_gate.allow_version)`,
    tests: ['fixture'],
    must_mention: 'undefined 判空不吃 truthy 短路',
  },
  {
    desc: 'M279 夹具 resetGlobal 的整份重建被拆（旧 global 值与备注残留——#147）',
    file: 'test/helpers/era-fixture.js',
    find: `    for (const key of [...store.keys()]) {
      if (key.startsWith('global:saves:')) {
        store.delete(key);
      } else if (key.startsWith('global:')) {
        store.set(key, 0);
      }
    }
    await list_save_files();`,
    replace: `    // 变异：重建被拆（global:* 原样残留）
    await list_save_files();`,
    tests: ['fixture'],
    must_mention: '重建后旧 global 值清 0',
  },
  {
    desc: 'M280 夹具 listSaveFiles 槽位对账整体跳过（FILE LOST 前缀与剥前缀都不发生——#147）',
    file: 'test/helpers/era-fixture.js',
    find: `  const list_save_files = async () => {
    for (let slot = 0; slot <= system_config.saveFiles; slot += 1) {`,
    replace: `  const list_save_files = async () => {
    return; // 变异：槽位对账整体跳过
    for (let slot = 0; slot <= system_config.saveFiles; slot += 1) {`,
    tests: ['fixture'],
    must_mention: '备注在而文件丢必须加 (FILE LOST) 前缀',
  },
  {
    desc: 'M281 夹具 listSaveFiles 的 UNNAMED 补名被拆（文件在而备注缺不补默认名——#147）',
    file: 'test/helpers/era-fixture.js',
    find: `        } else {
          store.set(key, 'UNNAMED SAVE FILE');
        }`,
    replace: `        } else {
          // 变异：UNNAMED 补名被拆
        }`,
    tests: ['fixture'],
    must_mention: '文件在而备注缺必须补 UNNAMED SAVE FILE',
  },
  {
    // M278 模拟的是「照抄 loadData 那一行、漏了它在拒收位上语义相反」；
    // 本条模拟取反后的忠实照抄——两种写法真正分道的取值只有 version 0
    // 且下限 0（undefined 判空放 0 进比较、收；truthy 写法短路、误拒）。
    desc: 'M283 夹具 loadGlobal 版本闸门换成取反后忠实照抄的 truthy 写法（version 0 且下限 0 时误拒——#147 验收补）',
    file: 'test/helpers/era-fixture.js',
    find: `        global_sav.version === undefined ||
        global_sav.version < save_gate.allow_version`,
    replace: `        !(global_sav.version && !(global_sav.version < save_gate.allow_version))`,
    tests: ['fixture'],
    must_mention: '同一取值 loadGlobal 收',
  },
  {
    // #149 前夹具的真实写法（也是旧注释的信念：其余表的清理「天然发生」）
    // ——只过滤列表、不删三段键。幸存者指向被删者的 relation/callname
    // 因此残留可读，而引擎下是 undefined（G3）。
    desc: 'M288 夹具 removeCharacter 只过滤列表、幸存者三段键清理被省（键残留可读——#149 前的真实写法）',
    file: 'test/helpers/era-fixture.js',
    find: `      for (const target of chara_ids) {
        store.delete(\`relation:\${id}:\${target}\`);
        store.delete(\`callname:\${id}:\${target}\`);
      }`,
    replace: `      // 变异：幸存者三段键清理被省（过滤列表就够——#149 前的写法）`,
    tests: ['fixture'],
    must_mention: '删完之后幸存者读被删者是 undefined',
  },
  {
    // 「一个人会怎么写错」：照 addCharacter 的风格给调用方回一个成功标志
    // （#149 前的实现就是它）——引擎方法体没有 return，这个布尔在真机上
    // 没有对应物；语义还错位（返回的是「不在列表」而非「删掉了」）。
    desc: 'M289 夹具 removeCharacter 返回值复辟成布尔（照 addCharacter 风格发明成功标志——#149 前的发明）',
    file: 'test/helpers/era-fixture.js',
    find: `    chara_no.length = 0;
    chara_no.push(...kept);
    return undefined;
  };`,
    replace: `    chara_no.length = 0;
    chara_no.push(...kept);
    return chara_ids.length === 1
      ? !chara_no.includes(chara_ids[0]) // 变异：布尔返回值复辟
      : undefined;
  };`,
    tests: ['fixture'],
    must_mention: '引擎方法体没有 return 语句，恒返回 undefined',
  },
  {
    // #150 前的真实写法，也是直觉写法：容器本来就是插入序，get 直接摊开
    // 它「看起来最自然」。升序加入的用例全绿（此前用例恰好全是），只有
    // 非升序加入的正主用例能抓到——与引擎 Object.keys 的整数键序分道。
    desc: 'M290 夹具 getAddedCharacters 退回插入序（直接摊开容器——#150 前的真实写法，升序加入时看不出错）',
    file: 'test/helpers/era-fixture.js',
    find: `  era.getAddedCharacters = () => [...chara_no].sort(by_id_ascending);`,
    replace: `  era.getAddedCharacters = () => [...chara_no]; // 变异：退回插入序（#150 前）`,
    tests: ['fixture'],
    must_mention: '已加入列表按数值升序，与加入序无关',
  },
  {
    desc: 'M291 夹具 getCharactersInTrain 退回插入序（Set 摊开即入列序——#150 前的真实写法，beginTrain 参数序漏进返回序）',
    file: 'test/helpers/era-fixture.js',
    find: `  era.getCharactersInTrain = () => [...chars_in_train].sort(by_id_ascending);`,
    replace: `  era.getCharactersInTrain = () => [...chars_in_train]; // 变异：退回插入序（#150 前）`,
    tests: ['fixture'],
    must_mention: '调教列表按数值升序，与入列序无关',
  },
  {
    // getAllCharacters 在 #150 前没有实现（走兜底记录桩恒 undefined），
    // 本条模拟的是「补实现时照另两个 get 的旧风格摊开容器」——Map 的
    // 键序是 seed 序，非升序 seed 时与引擎 staticData.chara 的键序分道。
    desc: 'M292 夹具 getAllCharacters 退回预设表插入序（Map 键序即 seed 序——照另两个 get 的旧风格发明）',
    file: 'test/helpers/era-fixture.js',
    find: `  era.getAllCharacters = () => [...chara_presets.keys()].sort(by_id_ascending);`,
    replace: `  era.getAllCharacters = () => [...chara_presets.keys()]; // 变异：退回插入序`,
    tests: ['fixture'],
    must_mention: '预设表键按数值升序，且含未加入者',
  },
  {
    // #151 前的真实写法（G6 点名的「未来一踩一个准」）：预置什么回什么。
    // 渲染层回包恒字符串，真机 result === 3 成立、夹具分岔——正主用例的
    // 严格断言里只有字符串/数字可分道的取值（'3'/''/'  3 '/'0'/'-5'/
    // '3abc'/null）能抓到，'abc' 与数字预置两侧同值不红（各守各的行为）。
    desc: 'M293 夹具 input 回传的 getNumber 归一被拆（预置什么回什么——#151 前的真实写法，字符串预置与真机当场分岔）',
    file: 'test/helpers/era-fixture.js',
    find: `    const result = get_number(value);`,
    replace: `    const result = value; // 变异：归一被拆（#151 前的写法）`,
    tests: ['fixture'],
    must_mention: '字符串预置的输入必须归一成数值',
  },
  {
    // 「一个人会怎么写错」：手册都说回包 val 恒字符串，保守写法就是只归一
    // 字符串（「别的类型不该动」）——字符串路径全过，唯独 Number(null)
    // === 0 分岔，正主用例的 null 断言专杀它。
    desc: 'M294 夹具归一加 typeof string 守卫（只归一字符串——null 不再归一成 0 的保守错法）',
    file: 'test/helpers/era-fixture.js',
    find: `  const get_number = (val) => {
    const num = Number(val);
    return isNaN(num) ? val : num;
  };`,
    replace: `  const get_number = (val) => {
    if (typeof val !== 'string') {
      return val; // 变异：只归一字符串
    }
    const num = Number(val);
    return isNaN(num) ? val : num;
  };`,
    tests: ['fixture'],
    must_mention: 'null 也过同一条归一',
  },
  {
    // era 传统数字解析的惯性错法：解析器换成 parseInt（保留 NaN 原样分支
    // ——错法只错在解析器，不动回退）。parseInt 截断解析（'3abc' 得 3）且
    // 空串得 NaN——引擎 getNumber 是 Number 的整串解析，正主用例的空串
    // 与 '3abc' 断言分头拦下；'苍井·橡'/'abc' 走 NaN 分支原样、不误伤。
    desc: 'M295 夹具归一的解析器换成 parseInt（"3abc" 得 3、空串得 NaN——era 传统解析的惯性错法）',
    file: 'test/helpers/era-fixture.js',
    find: `    const num = Number(val);
    return isNaN(num) ? val : num;`,
    replace: `    const num = parseInt(val, 10); // 变异：截断解析
    return isNaN(num) ? val : num;`,
    tests: ['fixture'],
    must_mention: '空串的归宿是数值 0',
  },
];
