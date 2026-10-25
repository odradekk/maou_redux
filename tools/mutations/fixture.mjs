// 变异条目表切片：test/helpers/（测试夹具与引擎比对助手的镜像语义）。
// 字段与运行方式见 tools/mutation-check.mjs 头注释。desc 里的 M 编号不人工
// 分配，只作引用基准，但全表必须唯一（#295；M117 曾被两票撞号，已改正）
// ——重号由 gate_shape 随 --verify 秒级核对。
/** 本分片条数（门 1）：增删条目必须同步改它，理由见 tools/mutation-check.mjs 头注 */
export const COUNT = 99; // #821 +8（M15800–M15807：夹具地址归一——不转小写/param 不归一成 palam/三段不翻名字/两段不翻名字/丢掉未登记名字/不按 yml 反查名字/set 与 add 写路径不归一）；#891 +3（M15500–M15502：.kojo 装载——字典替换失效/不挂 proxyKojo/不返回编译结果）；数据地址缺陷修复 +1（M15422：夹具模拟引擎的 no:<n>）； // #793 +8（M13801-M13808：调教世界构造入口 train-world.js 的世界形状——魔王不入列/目标写死/助手 0 入列/缺省调教名单漏主人/助手参与位丢失/当前指令不落/呼名覆盖条件反向/只声明不载入）；#769 +2（M15020-M15021：BASE 正上限钳制、add(0) 只读）；#739 +3（M14559-M14561：名字表读未声明序号抛错——不抛错/不看 yml 声明集/不认显式播种）；#721 返工 +1（M14355：局部清除不压回确认边界）；#721 +7（M14345-M14351：整屏清空的未读输出检查——永不报出/三处确认边界不推进/边界不归零/已确认行误报/行文本丢失）； // #717 +1（M14343：多列文本格的颜色记录）； // #557 +6（M12350-M12355：等待重叠检测——检查拆解/窗口立即清除/三 API 各自不占窗口/错误路径连锁）

export default [
  // —— #565 ——
  {
    desc: 'M11623 preset_chara_0 的静态表层删除（CSVCALLNAME 读空串）',
    file: 'test/helpers/chara.js',
    find: "  fixture.store.set('chara:0', CHARA_0_SHAPE);",
    replace: '  // 变异：静态表层删除',
    tests: ['event-first'],
    must_mention: 'callname:0:-1',
  },
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
    tests: ['page-usercom'],
    must_mention: '调教菜单登录',
  },
  {
    desc: 'M2113 夹具 input 白名单校验被拆（未打印按钮的值照单全收——#130 要防的复发形式）',
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
    find: `      if (input_echo_adds_row(config)) {
        total_rows += 1; // this.print(回显值)：+1 Row
        allow_wait = true; // 回显经 print → addTotalLines：同样置位（逐字）
      }`,
    replace: '      // 变异：回显不计行',
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
    push_row([]); // 变异：音乐误算一行（派单人独立变异复现过的误报通过形式）
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
    engine: true,
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
    engine: true,
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
    // 注：must_mention 原为「#68 形式」（#91 实现时的短语，住在依赖引擎的
    // engine-contract.test.js 里——无引擎执行点（CI，#89）暴露：该用例跳过
    // 时 fixture.test.js 侧虽红但文案不含短语，被误判误报通过。改指 fixture
    // 侧也在场的「回显计一行」，两侧环境都能报出，无弱化。
    desc: 'M170 夹具 input 回显不计行不置位（#68 形式：Row 记账错位）',
    file: 'test/helpers/era-fixture.js',
    find: `        total_rows += 1; // this.print(回显值)：+1 Row
        allow_wait = true; // 回显经 print → addTotalLines：同样置位（逐字）`,
    replace: `        // 变异：回显不计行不置位`,
    tests: ['engine-contract', 'fixture'],
    must_mention: '回显计一行',
  },
  {
    engine: true,
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
    desc: 'M178 engine-bundle 模块号不一致检查被拆（不一致时炸 TypeError 而非说清引擎变了）',
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
    // 变异：throw 拆回普通返回（缺省桩形式）
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
        // 变异：throw 拆回普通返回（缺省桩形式）
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
    // getAllCharacters 在 #150 前没有实现（走缺省记录桩恒 undefined），
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
    find: `      result = get_number(value);`,
    replace: `      result = value; // 变异：归一被拆（#151 前的写法）`,
    tests: ['fixture'],
    must_mention: '字符串预置的输入必须归一成数值',
  },
  {
    // 「一个人会怎么写错」：手册都说回包 val 恒字符串，保守写法就是只归一
    // 字符串（「别的类型不该动」）——字符串路径全过，唯独 Number(null)
    // === 0 分岔，正主用例的 null 断言专杀它。
    desc: 'M294 夹具归一加 typeof string 检查（只归一字符串——null 不再归一成 0 的保守错法）',
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
  {
    // 「一个人会怎么写错」：看见「清残留」就直接每次 beginTrain 都清，
    // 漏了引擎 `this.data.tequip||` 的存在性检查——同场幂等 beginTrain
    // （train-loop 的补入角色路径）会把已写状态错杀。
    desc: 'M296 夹具 beginTrain 重建检查被拆（每次 beginTrain 都清表——漏引擎 tequip 存在性检查）',
    file: 'test/helpers/era-fixture.js',
    find: `    if (!train_open) {
      // 引擎检查逐字：只在 tequip 表不存在时重建——同场重复 beginTrain
      // 不清 tflag（train-loop 的 beginTrain 幂等语义依赖它）
      delete_train_table_keys();
    }
    train_open = true;`,
    replace: `    delete_train_table_keys(); // 变异：检查被拆，每次 beginTrain 都重建
    train_open = true;`,
    tests: ['fixture'],
    must_mention: '表已存在时重复 beginTrain 不重建（引擎 tequip 检查逐字）',
  },
  {
    // 「一个人会怎么写错」：读到「引擎把 tflag 静态条目清 0」就把删键范围
    // 收窄到 tflag——漏了「整表换新」：palam/ex/stain/source 等同样重建，
    // 残留同样掩盖缺陷（event-end 读 palam/ex 是活消费点）。这正是 #152
    // 三选一里 B 方案（只清 tflag）的现实错法。
    desc: 'M297 夹具删表范围收窄到 tflag（「引擎只清 tflag 静态条目」的窄读法——#152 的 B 方案错法）',
    file: 'test/helpers/era-fixture.js',
    find: `  const delete_train_table_keys = () => {
    for (const key of [...store.keys()]) {
      if (TRAIN_CHAR_GUARD_TABLES.has(normalize_table_name(key))) {
        store.delete(key);
      }
    }
  };`,
    replace: `  const delete_train_table_keys = () => {
    for (const key of [...store.keys()]) {
      if (key.split(':')[0].toLowerCase() === 'tflag') {
        store.delete(key); // 变异：只删 tflag（窄读引擎的静态条目清 0）
      }
    }
  };`,
    tests: ['fixture'],
    must_mention:
      '下一场调教读不到上一场的 palam——删表范围是 11 张整表，不止 tflag',
  },
  {
    // #150 前的真实写法（D4 登记给 #152 的分歧原样）：resetData 只清已
    // 加入列表，调教列表与调教域键不清——引擎 resetData 整份重建 data，
    // tequip 随之消失，getCharactersInTrain 从此恒 []。
    desc: 'M298 夹具 resetData 调教态不清（只清已加入列表——#150 前的真实写法，D4 登记的分歧原样）',
    file: 'test/helpers/era-fixture.js',
    find: `    chara_no.length = 0;
    train_open = false;
    source_present = true; // resetData 字面量里 source 重新出现
    chars_in_train.clear();
    delete_train_table_keys();
    return undefined;
  };`,
    replace: `    chara_no.length = 0;
    // 变异：调教态与调教域键不清（#150 前只清已加入列表的写法）
    return undefined;
  };`,
    tests: ['fixture'],
    must_mention: 'resetData 把调教列表一并清空（引擎整份重建 data）',
  },
  // —— #171 夹具隔离开关（#168 结论 4：两条 e2e 不在同一条日循环上竞速）——
  {
    desc: 'M357 disable_enter_enemy 被拆（隔离开关失效，勇者照常来袭）',
    file: 'test/helpers/era-fixture.js',
    find: `      require('#/event/enter-enemy').enter_enemy = async () => 0;`,
    replace: `      ; // 变异：开关不替换导出`,
    tests: ['enter-enemy'],
    // 变异下开关用例第一条断言（勇者入队）先红，第二条不再执行——
    // must_mention 取先红断言的消息（M275 先例）
    must_mention: '开关短路了早退检查的调用——勇者没有入队',
  },
  // —— #557：等待重叠检测（input / waitAnyKey / printAndWait 的漏写 await 检查）——
  {
    desc: 'M12350 夹具重叠检查被拆（上一次等待未完成也不再抛错——#557 要防的复发形式）',
    file: 'test/helpers/era-fixture.js',
    find: `    if (pending_wait) {
      throw new Error(
        \`测试夹具：\${api}() 在上一次等待（\${pending_wait}()）完成前开始——两处同时等待同一个输入，疑似漏写 await\`,
      );
    }`,
    replace: `    if (false && pending_wait) {
      // 变异：重叠检查被拆
      throw new Error(
        \`测试夹具：\${api}() 在上一次等待（\${pending_wait}()）完成前开始——两处同时等待同一个输入，疑似漏写 await\`,
      );
    }`,
    tests: ['fixture'],
    must_mention: '漏写 await',
  },
  {
    desc: 'M12351 夹具等待窗口立即清除（settle_wait 不等宏任务边界——重叠不可观察，#544/#545/#542 三票变异的逃逸形式）',
    file: 'test/helpers/era-fixture.js',
    find: `  const settle_wait = () =>
    new Promise((resolve) => {
      setImmediate(() => {
        pending_wait = null;
        resolve();
      });
    });`,
    replace: `  const settle_wait = () =>
    new Promise((resolve) => {
      pending_wait = null; // 变异：窗口立即清除，重叠不可观察
      resolve();
    });`,
    tests: ['fixture'],
    must_mention: '漏写 await',
  },
  {
    desc: 'M12352 夹具 printAndWait 不占重叠窗口（内部等待立即完成——漏写 await 的后续照样拿到预置输入）',
    file: 'test/helpers/era-fixture.js',
    find: `  era.printAndWait = async (content, config) => {
    begin_wait('printAndWait');
    const returned = push_row([
      make_text_entry(apply_dict(content, config?.dict)),
    ]);
    input_rules.length = 0;
    // 内部等待在引擎里必然真等（print 刚置位 allowWait）并消费一次按键：
    // 确认边界推进到刚推入的行为止。观测面维持既定契约不进 waits /
    // inputs_consumed（见上「有意不镜像的分歧」），这里只动未读输出检查的
    // 边界，不动 allow_wait
    confirmed_row_count = total_rows;
    await settle_wait();
    return returned;
  };`,
    replace: `  era.printAndWait = async (content, config) => {
    // 变异：内部等待不占窗口
    const returned = push_row([
      make_text_entry(apply_dict(content, config?.dict)),
    ]);
    input_rules.length = 0;
    confirmed_row_count = total_rows;
    return returned;
  };`,
    tests: ['fixture'],
    must_mention: '漏写 await',
  },
  {
    desc: 'M12353 夹具 waitAnyKey 真等不占重叠窗口（含清屏前强制等键——快进态 clear 的检查一并消失）',
    file: 'test/helpers/era-fixture.js',
    find: `    begin_wait('waitAnyKey');
    // 引擎：等待＝input({any:true,useRule:false}) 真回传一次，returnFromButton
    // 成功路径同样清空 rule——waitAnyKey 之前打印的按钮不再约束后续 input
    input_rules.length = 0;
    inputs_consumed.push({ api: 'waitAnyKey' });
    // 真等＝玩家按下了一次键：等待瞬间的全部输出视为已读（未读输出检查的
    // 边界，与 rows_at_wait 同一时刻取值）
    confirmed_row_count = total_rows;
    await settle_wait();
  };`,
    replace: `    // 变异：真等不占窗口
    // 引擎：等待＝input({any:true,useRule:false}) 真回传一次，returnFromButton
    // 成功路径同样清空 rule——waitAnyKey 之前打印的按钮不再约束后续 input
    input_rules.length = 0;
    inputs_consumed.push({ api: 'waitAnyKey' });
    confirmed_row_count = total_rows;
  };`,
    tests: ['fixture'],
    must_mention: '漏写 await',
  },
  {
    desc: 'M12354 夹具 input 不占重叠窗口（等待立即完成——漏写 await 的 input 后续照样顺序取值）',
    file: 'test/helpers/era-fixture.js',
    find: `    begin_wait('input');
    let result;`,
    replace: `    // 变异：input 不占窗口
    let result;`,
    tests: ['fixture'],
    must_mention: '漏写 await',
  },
  {
    desc: 'M12355 夹具 input 错误路径不清重叠窗口（耗尽/拒收之后连锁报重叠，真实错误被误导）',
    file: 'test/helpers/era-fixture.js',
    find: `      // 校验/耗尽抛错是给调用方的真实错误，不能把重叠窗口留在那，让后续
      // 等待看到连锁的「重叠」报错（#557）
      pending_wait = null;
      throw err;`,
    replace: `      // 变异：错误路径不清窗口
      throw err;`,
    tests: ['fixture'],
    must_mention: '疑似漏写 await',
  },
  // —— #717：多列文本格的颜色记录 ——
  {
    desc: 'M14343 夹具不记文本格的颜色（占位灰显失去观测面）',
    file: 'test/helpers/era-fixture.js',
    find: `      entry.color = obj.config?.color;`,
    replace: `      // entry.color = obj.config?.color; // 变异：颜色不记录`,
    tests: ['page-main-menu'],
    must_mention: '#bbbbbb',
  },
  // —— #721：整屏清空的未读输出检查 ——
  {
    desc: 'M14345 夹具的未读输出检查永不报出（漏补等键的路径全部逃过端到端）',
    file: 'test/helpers/era-fixture.js',
    find: `        if (entry.row !== undefined && entry.row >= confirmed_row_count) {`,
    replace: `        if (false && entry.row !== undefined && entry.row >= confirmed_row_count) { // 变异：检查永不报出`,
    tests: ['fixture'],
    must_mention: '结算第一行',
  },
  {
    desc: 'M14346 waitAnyKey 真等不推进确认边界（等过键的输出被整屏清空仍报未读）',
    file: 'test/helpers/era-fixture.js',
    find: `    // 真等＝玩家按下了一次键：等待瞬间的全部输出视为已读（未读输出检查的
    // 边界，与 rows_at_wait 同一时刻取值）
    confirmed_row_count = total_rows;
    await settle_wait();`,
    replace: `    // 真等＝玩家按下了一次键：等待瞬间的全部输出视为已读（未读输出检查的
    // 边界，与 rows_at_wait 同一时刻取值）
    await settle_wait(); // 变异：不推进确认边界`,
    tests: ['fixture'],
    must_mention: '报出并记录行文本',
  },
  {
    desc: 'M14347 printAndWait 的内部等待不推进确认边界（口上逐行被整屏清空全报未读）',
    file: 'test/helpers/era-fixture.js',
    find: `    confirmed_row_count = total_rows;
    await settle_wait();
    return returned;`,
    replace: `    await settle_wait(); // 变异：printAndWait 不推进确认边界
    return returned;`,
    tests: ['fixture'],
    must_mention: 'printAndWait 自带等键',
  },
  {
    desc: 'M14348 input 回传不推进确认边界（菜单行之前的历史被整屏清空也报未读）',
    file: 'test/helpers/era-fixture.js',
    find: `      // 玩家按下了键：回显行（若计行）及其之前全部已确认。取值在回显计数
      // 之后——回显本身不算未读，未读从下一次新输出开始
      confirmed_row_count = total_rows;`,
    replace: `      // 玩家按下了键：回显行（若计行）及其之前全部已确认。取值在回显计数
      // 之后——回显本身不算未读，未读从下一次新输出开始
      // 变异：input 不推进确认边界`,
    tests: ['fixture'],
    must_mention: '只有输入回显时整屏清空',
  },
  {
    desc: 'M14349 整屏清空不归零确认边界（第一屏之后的新输出全部漏查）',
    file: 'test/helpers/era-fixture.js',
    find: `      confirmed_row_count = 0;`,
    replace: `      // 变异：整屏清空不归零确认边界`,
    tests: ['fixture'],
    must_mention: '后续新输出仍受检查',
  },
  {
    desc: 'M14350 确认边界判定失效（已确认的行也报未读——每次换屏都误报）',
    file: 'test/helpers/era-fixture.js',
    find: `        if (entry.row !== undefined && entry.row >= confirmed_row_count) {`,
    replace: `        if (entry.row !== undefined && entry.row >= 0) { // 变异：已确认行也报出`,
    tests: ['fixture'],
    must_mention: '等键再整屏清空',
  },
  {
    desc: 'M14351 未读行记录丢行文本（报出之后无从定位漏等键的路径）',
    file: 'test/helpers/era-fixture.js',
    find: `          unread_output_clears.push({
            row: entry.row,
            type: entry.type,
            text: entry.text,
          });`,
    replace: `          unread_output_clears.push({
            row: entry.row,
            type: entry.type,
            text: '',
          }); // 变异：行文本不记录`,
    tests: ['fixture'],
    must_mention: '指令结算',
  },
  {
    desc: 'M14355 局部清除不压回确认边界（清回显后打印的结果被整屏清掉仍漏报）',
    file: 'test/helpers/era-fixture.js',
    find: `      total_rows -= n;
      // 局部清除从尾部删行，剩余行数可能落到确认边界之下：行号基准变了，
      // 边界不压回的话，之后新打印的行号会小于边界，整屏清空时漏报
      //（输入后 clear(1) 清回显、再打印结果的路径，#721 返工）
      confirmed_row_count = Math.min(confirmed_row_count, total_rows);`,
    replace: `      total_rows -= n;
      // 变异：局部清除不压回确认边界`,
    tests: ['fixture'],
    must_mention: `text: '结果'`,
  },
  // —— #739：名字表读未声明序号同引擎抛错 ——
  {
    desc: 'M14559 夹具名字表读未声明序号不抛错（回到返回 undefined，掩盖引擎崩溃）',
    file: 'test/helpers/era-fixture.js',
    find: '    if (is_undeclared_name(address)) {',
    replace: '    if (false && is_undeclared_name(address)) { // 变异：不抛错',
    tests: ['fixture'],
    must_mention: 'yml 未声明且用例没播种的序号同引擎抛 TypeError',
  },
  {
    desc: 'M14560 夹具名字表不看 yml 声明集（已声明序号也抛错）',
    file: 'test/helpers/era-fixture.js',
    find: '    return ids !== undefined && !ids.has(Number(match[2]));',
    replace: '    return ids !== undefined; // 变异：不看声明集',
    tests: ['fixture'],
    must_mention: 'yml 已声明的序号读出 yml 里的名字',
  },
  {
    desc: 'M14561 夹具名字表不认用例显式播种的名字（测试不可达分支的用例全部崩）',
    file: 'test/helpers/era-fixture.js',
    find: '    if (match === null || store.has(var_name)) {',
    replace: '    if (match === null) { // 变异：不认显式播种',
    tests: ['fixture'],
    must_mention: '用例显式播种的名字键算作已声明',
  },
  // —— #769：BASE 写入与真 EraApi 一致 ——
  {
    desc: 'M15020 夹具 BASE 写入不按正 MAXBASE 钳制',
    file: 'test/helpers/era-fixture.js',
    find: '    return max > 0 ? Math.min(max, Math.max(0, value)) : value;',
    replace: '    return value; // 变异：BASE 写入不钳制',
    tests: ['engine-contract'],
    must_mention: 'set 钳到上限',
  },
  {
    desc: 'M15021 夹具 add(0) 仍走写入路径并留下写记录',
    file: 'test/helpers/era-fixture.js',
    find: '    if (!value) {\n      return era.get(var_name);\n    }',
    replace:
      '    if (false && !value) {\n      return era.get(var_name);\n    } // 变异：零增量仍写入',
    tests: ['engine-contract'],
    must_mention: '零增量只读取当前值',
  },
  // —— #793：调教世界构造入口的世界形状 ——
  {
    desc: 'M13801 构造入口不给魔王入列（世界缺主人）',
    file: 'test/helpers/train-world.js',
    find: '  preset_chara_0(fixture);\n  fixture.era.addCharacter(0);',
    replace: '  preset_chara_0(fixture); // 变异：魔王不入列',
    tests: ['train-world'],
    must_mention: '缺省世界：魔王与奴隶入列并开调教',
  },
  {
    desc: 'M13802 构造入口把调教对象写死为 31（target 选项失效）',
    file: 'test/helpers/train-world.js',
    find: '  join_slave_chara(fixture, target, target_name);',
    replace: '  join_slave_chara(fixture, 31, target_name); // 变异：目标写死',
    tests: ['train-world'],
    must_mention: '差异项：目标、呼名、视角与调教名单各自可覆盖',
  },
  {
    desc: 'M13803 构造入口把助手 0 也当独立角色预置入列',
    file: 'test/helpers/train-world.js',
    find: '  if (assi > 0) {',
    replace: '  if (assi >= 0) { // 变异：助手 0 也入列',
    tests: ['train-world'],
    must_mention: '助手 0 = 主人自己：不加角色，指针照实',
  },
  {
    desc: 'M13804 构造入口的缺省调教名单漏掉主人',
    file: 'test/helpers/train-world.js',
    find: '  fixture.era.beginTrain(...(train_ids ?? [0, target]));',
    replace:
      '  fixture.era.beginTrain(...(train_ids ?? [target])); // 变异：主人不进调教',
    tests: ['train-world'],
    must_mention: '缺省世界：魔王与奴隶入列并开调教',
  },
  {
    desc: 'M13805 构造入口丢掉助手参与位（assiplay 恒 0）',
    file: 'test/helpers/train-world.js',
    find: '  era_flag.assiplay = assiplay;',
    replace: '  era_flag.assiplay = 0; // 变异：助手参与位丢失',
    tests: ['train-world'],
    must_mention: '差异项：目标、呼名、视角与调教名单各自可覆盖',
  },
  {
    desc: 'M13806 构造入口不写当前指令（selectcom 恒 -1）',
    file: 'test/helpers/train-world.js',
    find: '  era_flag.selectcom = selectcom;',
    replace: '  era_flag.selectcom = -1; // 变异：当前指令不落',
    tests: ['train-world'],
    must_mention: '差异项：目标、呼名、视角与调教名单各自可覆盖',
  },
  {
    desc: 'M13807 构造入口的主人呼名覆盖条件反向（呼名恒为预设）',
    file: 'test/helpers/train-world.js',
    find: '  if (master_callname !== undefined) {',
    replace: '  if (master_callname === undefined) { // 变异：覆盖条件反向',
    tests: ['train-world'],
    must_mention: '差异项：目标、呼名、视角与调教名单各自可覆盖',
  },
  {
    desc: 'M13808 构造入口只声明模块不载入（modules 恒 undefined）',
    file: 'test/helpers/train-world.js',
    find: '    loaded[key] = fixture.load_module(name);',
    replace: '    loaded[key] = undefined; // 变异：只声明不载入',
    tests: ['train-world'],
    must_mention: '模块按声明载入，原样挂在 modules 上',
  },
  {
    desc: 'M15422 夹具不再模拟 no:<n>（读到的是播种值，与引擎的 data.no 不符）',
    file: 'test/helpers/era-fixture.js',
    find: '    const no_match = /^no:(\\d+)$/.exec(address);',
    replace: '    const no_match = null; // 变异：不模拟 no:<n>',
    tests: ['fixture'],
    must_mention: 'no:<n> 读的是第 n+1 个加入的角色',
    engine: true,
  },
  // —— #891 .kojo 基础设施 ——
  {
    desc: 'M15500 夹具的字典替换失效（.kojo 的 %KEY% 原样进记录，断言的不是玩家看到的文本）',
    file: 'test/helpers/era-fixture.js',
    find: `  const apply_dict = (content, dict) => {
    if (!Array.isArray(dict)) {`,
    replace: `  const apply_dict = (content, dict) => {
    if (true || !Array.isArray(dict)) { // 变异：字典替换失效`,
    tests: ['kojo-infra'],
    must_mention: '你好，测试者。',
    engine: true,
  },
  {
    desc: 'M15501 编译 .kojo 前不挂 proxyKojo / dispatchButton（篇目对象根本出不来）',
    file: 'test/helpers/engine-bundle.js',
    find: '  engine.add_proxy_func(era);',
    replace: '  // 变异：不挂 proxyKojo / dispatchButton',
    tests: ['kojo-infra'],
    must_mention: '夹具装载 .kojo 失败',
    engine: true,
  },
  {
    desc: 'M15502 编译完不返回篇目对象（装载「成功」但一个篇目都取不到）',
    file: 'test/helpers/engine-bundle.js',
    find: `  factory.call(
    module.exports,
    module.exports,
    () => era,
    module,
    filename,
    path.dirname(filename),
  );
  return module.exports;`,
    replace: `  factory.call(
    module.exports,
    module.exports,
    () => era,
    module,
    filename,
    path.dirname(filename),
  );
  return {}; // 变异：不返回编译结果`,
    tests: ['kojo-infra'],
    must_mention: '示例篇目「问候」必须是可调用函数',
    engine: true,
  },
  // —— #821 地址归一：小写 / param→palam / 名字→序号 ——
  {
    desc: 'M15800 夹具的地址名段不转小写（Unlisted 与 unlisted 分两个槽）',
    file: 'test/helpers/era-fixture.js',
    find: '      .map((segment) => segment.toLowerCase());',
    replace: '      .map((segment) => segment); // 变异：不转小写',
    tests: ['fixture'],
    must_mention: '未登记名字同样按小写落键',
  },
  {
    desc: 'M15801 夹具不把 param 归一成 palam（引擎里两者是同一张表）',
    file: 'test/helpers/era-fixture.js',
    find: `    if (table === 'param') {
      table = 'palam';
    }`,
    replace: '    // 变异：param 不归一成 palam',
    tests: ['fixture'],
    must_mention: 'param 与 palam 是同一张表',
  },
  {
    desc: 'M15802 夹具三段地址不翻名字（talent:cid:男人 与 talent:cid:122 分两个槽）',
    file: 'test/helpers/era-fixture.js',
    find: '        segments[2] = translate_name(table, segments[2]);',
    replace: '        // 变异：三段地址不翻名字',
    tests: ['fixture'],
    must_mention: '按名字写、按序号读得到同一个值',
  },
  {
    desc: 'M15803 夹具两段地址不翻名字（flag/base/global 的具名落到另一个槽）',
    file: 'test/helpers/era-fixture.js',
    find: `      segments[1] = translate_name(
        table.startsWith('item') ? 'item' : table,
        segments[1],
      );`,
    replace: '      // 变异：两段地址不翻名字',
    tests: ['fixture'],
    must_mention: 'flag 具名与序号同槽',
  },
  {
    desc: 'M15804 夹具把未登记的名字丢掉（引擎 safeUndefinedCheck 的缺省是原串）',
    file: 'test/helpers/era-fixture.js',
    find: '      : (names.name_to_id.get(segment) ?? segment);',
    replace:
      '      : names.name_to_id.get(segment); // 变异：未登记的名字被丢掉',
    tests: ['fixture'],
    must_mention: '未登记的名字原样当键',
  },
  {
    desc: 'M15805 夹具不从 yml 反查 <表>name:<序号>（名字表读取恒空）',
    file: 'test/helpers/era-fixture.js',
    find: `  function yml_derived_value(var_name) {
    const name_match = /^([a-z]+)name:(\\d+)$/.exec(var_name);`,
    replace: `  function yml_derived_value(var_name) {
    const name_match = null; // 变异：不按 yml 反查名字`,
    tests: ['fixture'],
    must_mention: '读 yml 的名字',
  },
  {
    desc: 'M15806 夹具只让读路径归一（写路径按原串落库，名字写、序号读分叉）',
    file: 'test/helpers/era-fixture.js',
    find: `  era.set = (var_name, value) => {
    const address = normalize_address(var_name);`,
    replace: `  era.set = (var_name, value) => {
    const address = var_name; // 变异：写路径不归一`,
    tests: ['fixture'],
    must_mention: '按名字写、按序号读得到同一个值',
  },
  {
    desc: 'M15807 夹具的累加路径不归一（era.add 按原串累加）',
    file: 'test/helpers/era-fixture.js',
    find: `    const address = normalize_address(var_name);
    if (address !== 'gamebase' && !train_table_allows(address)) {
      return undefined;
    }
    // 引擎语义：累加后落盘并返回新值；无现值时按 0 起算（no:<n> 的现值
    // 在活数组里，不在平表上）`,
    replace: `    const address = var_name; // 变异：累加路径不归一
    if (address !== 'gamebase' && !train_table_allows(address)) {
      return undefined;
    }
    // 引擎语义：累加后落盘并返回新值；无现值时按 0 起算（no:<n> 的现值
    // 在活数组里，不在平表上）`,
    tests: ['fixture'],
    must_mention: 'era.add 按序号累加',
  },

  // —— #902 ——
  {
    desc: 'M16300 夹具 raw() 的写路径不落平表（写只活在视图里，era.get 读不到）',
    file: 'test/helpers/era-fixture.js',
    find: '        store.set(key, value);\n        return true;',
    replace: '        void value; // 变异：写不落平表\n        return true;',
    tests: ['fixture-raw'],
    must_mention: 'raw() 写入后 era.get 读到同一槽',
  },
  {
    desc: 'M16301 夹具 raw() 对没加入的角色自动建行（TypeError 这条验收作废）',
    file: 'test/helpers/era-fixture.js',
    find: '      if (table_rows(table).includes(second)) {\n        return true;\n      }',
    replace:
      '      if (table_rows(table).includes(second) || /^\\d+$/.test(second)) {\n        return true; // 变异：任何数字角色都算有行\n      }',
    tests: ['fixture-raw'],
    must_mention: '没加入的角色同样抛 TypeError',
  },
  {
    desc: 'M16302 夹具 raw() 的逐角色行不随 addCharacter 建（已加入角色的行也缺）',
    file: 'test/helpers/era-fixture.js',
    find: '    if (CHARA_TABLES.includes(table)) {\n      return chara_no.map(String);\n    }',
    replace:
      '    if (CHARA_TABLES.includes(table)) {\n      return []; // 变异：行不随加入建\n    }',
    tests: ['fixture-raw'],
    must_mention: '读没加入的角色的具名属性抛 TypeError',
  },
  {
    desc: 'M16303 夹具 raw() 的调教表恒在（beginTrain 之前也能读）',
    file: 'test/helpers/era-fixture.js',
    find: '      if (train_open && TRAIN_TABLES.includes(table)) {\n        return true;\n      }',
    replace:
      '      if (TRAIN_TABLES.includes(table)) {\n        return true; // 变异：调教表恒在\n      }',
    tests: ['fixture-raw'],
    must_mention: '在调教期之外不存在',
  },
  {
    desc: 'M16304 夹具 raw() 的 source 不随 endTrain 消失',
    file: 'test/helpers/era-fixture.js',
    find: '    source_present = false;',
    replace: '    source_present = true; // 变异：source 不随 endTrain 消失',
    tests: ['fixture-raw'],
    must_mention: 'source 随 endTrain 一起消失',
  },
  {
    desc: 'M16305 夹具 raw() 的 item 骨架缺 sales 子表',
    file: 'test/helpers/era-fixture.js',
    find: "  const ITEM_TABLES = ['bought', 'hold', 'price', 'sales'];",
    replace:
      "  const ITEM_TABLES = ['bought', 'hold', 'price']; // 变异：少了 sales",
    tests: ['fixture-raw'],
    must_mention: 'raw().data 的骨架按 resetData 字面量',
  },
  {
    desc: 'M16306 夹具 raw() 的 item.bought 初值改错（引擎字面量是 -1）',
    file: 'test/helpers/era-fixture.js',
    find: "  store.set('item:bought', -1);",
    replace: "  store.set('item:bought', 0); // 变异：初值改错",
    tests: ['fixture-raw'],
    must_mention: 'data.item.bought 初值 -1',
  },
  {
    desc: 'M16307 夹具 global 的 version 盖章常量取成 game_code',
    file: 'test/helpers/era-fixture.js',
    find: "    if (field === 'version') {\n      return save_gate.current_version;\n    }",
    replace:
      "    if (field === 'version') {\n      return save_gate.game_code; // 变异：盖章常量取错\n    }",
    tests: ['fixture-raw'],
    must_mention: 'raw().global 与 era.get / era.set 同源',
  },
  {
    desc: 'M16308 夹具 raw().data.no 返回副本（不再是引擎那只活数组）',
    file: 'test/helpers/era-fixture.js',
    find: '        return chara_no; // 引擎 data.no 是活数组（插入序，removeCharacter 同步）',
    replace: '        return [...chara_no]; // 变异：no 返回副本',
    tests: ['fixture-raw'],
    must_mention: 'no 就是夹具维护的那只数组',
  },
  {
    desc: 'M16309 夹具 era.get 不认 global 的两枚盖章常量（视图有值、get 读不到）',
    file: 'test/helpers/era-fixture.js',
    find: "    if (value === undefined && address.startsWith('global:')) {\n      value = global_constant(address.slice('global:'.length));\n    }",
    replace:
      "    if (false) {\n      value = global_constant(address.slice('global:'.length)); // 变异：get 不认盖章常量\n    }",
    tests: ['fixture-raw'],
    must_mention: 'era.get 读到的盖章常量与视图一致',
  },
  {
    desc: 'M16310 夹具 raw() 的逐角色行不进枚举（Object.keys 看不到行）',
    file: 'test/helpers/era-fixture.js',
    find: "        } else if (prefix.split(':').length === 1) {\n          table_rows(prefix).forEach((id) => keys.add(id));\n        }",
    replace:
      "        } else if (prefix.split(':').length === 1) {\n          // 变异：行不进枚举\n        }",
    tests: ['fixture-raw'],
    must_mention: '行集合只含已加入的角色',
  },
  {
    desc: 'M16311 夹具 raw() 的视图不读平表（叶子一律 undefined，与 era.get 分叉）',
    file: 'test/helpers/era-fixture.js',
    find: "  const raw_leaf_value = (key) =>\n    store.get(key) ??\n    (key.startsWith('global:')\n      ? global_constant(key.slice('global:'.length))\n      : undefined);",
    replace:
      '  // 变异：视图不读平表，叶子一律 undefined\n  const raw_leaf_value = (key) => undefined;',
    tests: ['fixture-raw'],
    must_mention: 'era.set / era.add 写入后 raw() 读到同一槽',
  },
  {
    desc: 'M16312 夹具 raw() 的扩展角色表不建顶层桶（_fixed.json 的登记不入骨架）',
    file: 'test/helpers/era-fixture.js',
    find: "    'talent',\n    'version',\n    ...yml_extended_chara_tables(),\n  ];",
    replace:
      "    'talent',\n    'version',\n  ]; // 变异：扩展角色表不建顶层桶",
    tests: ['fixture-raw'],
    must_mention: 'raw().data 的骨架按 resetData 字面量',
  },
  {
    desc: 'M16313 夹具 raw() 的扩展角色表不随 addCharacter 建行',
    file: 'test/helpers/era-fixture.js',
    find: "    'relation',\n    'talent',\n    ...yml_extended_chara_tables(),\n  ];",
    replace: "    'relation',\n    'talent',\n  ]; // 变异：扩展角色表不建行",
    tests: ['fixture-raw'],
    must_mention: '的行随加入建',
  },
  {
    desc: 'M16314 夹具 no:<n> 的写路径不落活数组（set / add 与 raw().data.no 分叉）',
    file: 'test/helpers/era-fixture.js',
    find: '  const write_no = (address, value) => {\n    const match = NO_ADDRESS.exec(address);\n    if (match === null) {\n      return false;\n    }\n    chara_no[Number(match[1])] = value;\n    return true;\n  };',
    replace:
      '  const write_no = (address, value) => {\n    const match = NO_ADDRESS.exec(address);\n    if (match === null) {\n      return false;\n    }\n    return true; // 变异：no 写不落数组\n  };',
    tests: ['fixture-raw'],
    must_mention: 'era.set 写 no:<n> 落数组',
  },
  {
    desc: 'M16315 夹具 raw() 的 in 恒假（骨架表与叶子都判不出存在）',
    file: 'test/helpers/era-fixture.js',
    find: "      has(_target, prop) {\n        return typeof prop !== 'symbol' && resolve(key_of(prop)) !== undefined;\n      },",
    replace:
      '      has(_target, prop) {\n        return false; // 变异：in 恒假\n      },',
    tests: ['fixture-raw'],
    must_mention: '空表也在：表的存在性不取决于写过没有',
  },
  {
    desc: 'M16316 夹具 raw() 的列不进枚举（行的列集合恒空）',
    file: 'test/helpers/era-fixture.js',
    find: "      if (cut >= 0) {\n        children.add(rest.slice(0, cut));\n      } else if (head !== '') {\n        children.add(rest);\n      }",
    replace: '      // 变异：子段不进枚举',
    tests: ['fixture-raw'],
    must_mention: 'callname 行的列来自写入的键',
  },
];
