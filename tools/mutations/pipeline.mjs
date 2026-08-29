// 变异条目表切片：tools/compare、tools/lang-*、tools/csv-to-yml（数据管线与输出比对）。
// 字段与运行方式见 tools/mutation-check.mjs 头注释；新增/删除条目必须同步改
// 工具里的 LEDGER_COUNT_BASELINE（两项检查）。desc 里的 M 编号是历史惯性编号
// （M117 曾被两票撞号使用），只作引用锚点保留，不再人工分配。
export default [
  {
    desc: 'M77 归一表删一个实测字种（著→着）',
    file: 'tools/lang-table.js',
    find: "  著: '着',",
    replace: '  // 变异：著→着 删除',
    tests: ['lang-normalize', 'kojo-text-fidelity'],
    must_mention: '缺映射',
  },
  {
    desc: 'M79 豁免名单删華胥の亡靈条（简体锁必须报出致谢行）',
    file: 'tools/lang-table.js',
    find: `  {
    value:
      '大众性格：谦悟、文文、匿名神人、干掉人龙、歪闷林、華胥の亡靈、Delicious',
    where: 'ere/page/page-title.js',
    why: '口上组致谢名单整行。華胥の亡靈 是贡献者 ID（含日文の与繁体華/靈），其余名字同理不译——对人名/ID 做字符归一会改名。豁免到「字符串整体」，这行被改写时失配变红，改者须有意识地同步本表。',
  },`,
    replace: '  // 变异：豁免条目删除',
    tests: ['output-lang-lock'],
    must_mention: '華胥の亡靈',
  },
  {
    desc: 'M82 词级译法删奴隷→奴隶（转换用例必须红）',
    file: 'tools/lang-table.js',
    find: "  { source: '奴隷', target: '奴隶' },",
    replace: '  // 变异：奴隷 词删除',
    tests: ['lang-normalize'],
    must_mention: '奴隷',
  },
  {
    desc: 'M83 生成器去归一（csv-to-yml 不再自应用归一表——验收实测的退回路径）',
    file: 'tools/csv-to-yml.js',
    find: `function emit_product_lines(lines) {
  return to_simplified_yaml(\`\${lines.join('\\n')}\\n\`);
}`,
    replace: `function emit_product_lines(lines) {
  // 变异：生成期归一删除——产物与库内（已归一）不再一致
  return \`\${lines.join('\\n')}\\n\`;
}`,
    tests: ['csv-to-yml'],
    must_mention: '逐字节一致',
  },
  {
    desc: 'M85 归一化器样本侧去归一（黄金样本不再过 #60 归一表）',
    file: 'tools/compare/normalize.js',
    find: '.map((l) => (is_exempted(l) ? l : to_simplified(l)));',
    replace:
      '.map((l) => l); // 变异：样本侧去归一（豁免放行也被抹平，豁免用例一并红）',
    tests: ['compare-normalize'],
    must_mention: '繁/日键名',
  },
  {
    desc: 'M86 归一化器菜单编号解析坏（Number → -1）',
    file: 'tools/compare/normalize.js',
    find: "cells.push({ kind: 'menu', key: name, val: Number(inner.trim()) });",
    replace:
      "cells.push({ kind: 'menu', key: name, val: -1 }); // 变异：编号解析坏",
    tests: ['compare-normalize'],
    must_mention: 'menu 条目',
  },
  {
    desc: 'M87 差异引擎 calc 键忽略全部数值（植入算式缺陷抓不到——检验3b 的靶心）',
    file: 'tools/compare/diff.js',
    find: 'return `calc:${entry.key}|${entry.from}|+${entry.add}|-${entry.sub}|=${entry.to}|${entry.phrase}`;',
    replace: 'return `calc:${entry.key}|${entry.phrase}`; // 变异：数值不进键',
    tests: ['compare-diff'],
    must_mention: '加数漂移',
  },
  {
    desc: 'M88 差异引擎 menu 键回退常数（同编号异名被吞——真缺陷出口焊死）',
    file: 'tools/compare/diff.js',
    find: '      return `menu:${entry.key}|${entry.val}`;',
    replace: "      return 'menu:?'; // 变异：标签与编号不进键",
    tests: ['compare-diff', 'compare-first-turn'],
    must_mention: '真缺陷出口',
  },
  {
    desc: 'M89 归因规则删 体力 条键（范围 B 主菜单的 golden 基础条变未解释差异）',
    file: 'tools/compare/rules.js',
    find: "const STUB_GAUGE_KEYS = new Set(['体力', '气力', '射精（你）']);",
    replace:
      "const STUB_GAUGE_KEYS = new Set(['气力', '射精（你）']); // 变异：体力 删",
    tests: ['compare-samples'],
    must_mention: 'mainmenu-natural',
  },
  {
    desc: 'M90 回放播种改错（阴核初值 5240 → 5200——变量层断言的靶心）',
    file: 'tools/compare/replay.js',
    find: '[0, 5240], // 阴核 5240+300=5540（log:34）',
    replace: '[0, 5200], // 变异：播种值错（log:34）',
    tests: ['compare-first-turn'],
    must_mention: '日志算式断言',
  },
  {
    desc: 'M91 回放随机源取错支（RAND_FIX 落到别的台词——确定性回放的靶心）',
    file: 'tools/compare/replay.js',
    find: 'const RAND_FIX = 0.4;',
    replace: 'const RAND_FIX = 0.9; // 变异：错支',
    tests: ['compare-first-turn'],
    must_mention: '逐条文本',
  },
  {
    desc: 'M92 回放输入标记不落 lines（窗口两侧不再同构）',
    file: 'tools/compare/replay.js',
    find: "    fixture.lines.push({ type: 'input', text: String(value) });",
    replace: '    // 变异：输入标记不落 lines',
    tests: ['compare-first-turn'],
    must_mention: '比对窗口不完整',
  },
  {
    desc: 'M148 归一化器 progress→gauge 语义值读错（val 取 percentage——表现闯进事件流）',
    file: 'tools/compare/normalize.js',
    find: '        val: Number(record.out),',
    replace: '        val: record.percentage, // 变异：语义值读错',
    tests: ['compare-normalize', 'compare-first-turn'],
    must_mention: 'percentage 不进事件流',
  },
  {
    desc: 'M149 归一化器 progress 分支删除（结构化记录从事件流消失——比对未解释）',
    file: 'tools/compare/normalize.js',
    find: "    } else if (record.type === 'progress') {",
    replace:
      "    } else if (record.type === 'progress_never') { // 变异：分支删除",
    tests: ['compare-normalize', 'compare-first-turn'],
    must_mention: 'progress 记录',
  },
  {
    desc: 'M284 样本登记表未知名静默回落旧样本（#156：回落=拿旧样本冒充新样本）',
    file: 'tools/compare/samples.js',
    find: '    throw new Error(`未知样本名「${name}」。有效样本名：${known}`);',
    replace: "    name = ''; // 变异：未知名静默回落旧样本",
    tests: ['compare-samples'],
    must_mention: '静默回落等于拿旧样本冒充新样本',
  },
  {
    desc: 'M285 cli 缺席样本继续走（#156：阶段二回收前的占位名必须显式失败）',
    file: 'tools/compare/cli.js',
    find: '  if (!fs.existsSync(sample.abs)) {',
    replace:
      '  if (false && !fs.existsSync(sample.abs)) { // 变异：缺席样本继续走',
    tests: ['compare-samples'],
    must_mention: '消息必须给出缺席路径本体',
  },
  {
    desc: 'M299 灰条单元当按钮拆（编号位 --- 也进 menu——把占位当可点入口）',
    file: 'tools/compare/normalize.js',
    find: "      cells.push({ kind: 'text', text: `[---]${label ? ` ${label}` : ''}` });",
    replace:
      "      cells.push({ kind: 'menu', key: `[---]${label ? ` ${label}` : ''}`, val: -2 }); // 变异：灰条当按钮",
    tests: ['compare-normalize'],
    must_mention: 'ere 侧 page-main-menu 的灰条正是',
  },
  {
    desc: 'M300 槽位备注时间戳不归一（重录必假红——归一化裁定 #161 的靶心）',
    file: 'tools/compare/normalize.js',
    find: "function normalize_ts(text) {\n  return text.replace(TIMESTAMP_RE, '<TS>');\n}",
    replace:
      'function normalize_ts(text) {\n  return text; // 变异：时间戳不归一\n}',
    tests: ['compare-normalize', 'compare-scope-b'],
    must_mention: '两个录制时刻的归一结果',
  },
  {
    desc: 'M301 按钮行守门删除（残渣行也拆成 menu——叙述文本被误拆）',
    file: 'tools/compare/normalize.js',
    find: "    cursor = BRACKET_CELL_RE.lastIndex;\n  }\n  if (cells.length === 0 || line.slice(cursor).trim() !== '') {\n    return null;\n  }\n  return cells;\n}",
    replace:
      '    cursor = BRACKET_CELL_RE.lastIndex;\n  }\n  if (cells.length === 0) {\n    return null;\n  }\n  return cells; // 变异：行尾与单元间残渣不拦\n}',
    tests: ['compare-normalize'],
    must_mention: '残渣（方括号外有正文）',
  },
  {
    desc: 'M302 ere 侧按钮正文不做时间戳归一（两侧同构被破坏——黄金侧独归一）',
    file: 'tools/compare/normalize.js',
    find: '        key: normalize_ts(compress_ws(record.text)),',
    replace: '        key: compress_ws(record.text), // 变异：ere 侧不去时间戳',
    tests: ['compare-normalize', 'compare-scope-b'],
    must_mention: 'ere 侧按钮正文过同一套时间戳归一',
  },
  {
    desc: 'M303 回放观测面把命名清行当原作清行（set_story_name 不进自建判定——保存画面被错误剔除）',
    file: 'tools/compare/replay-b.js',
    find: 'const REDRAW_CLEAR_RE = /screen-block\\.js|set_story_name/;',
    replace:
      'const REDRAW_CLEAR_RE = /screen-block\\.js/; // 变异：命名清行漏判',
    tests: ['compare-scope-b'],
    must_mention: '基线漂移',
  },
  {
    desc: 'M304 回放输入恢复白名单校验（useRule:false 删——199/9999 无按钮输入被夹具拦下）',
    file: 'tools/compare/replay-b.js',
    find: '    const got = await original_input({ ...(config ?? {}), useRule: false });',
    replace:
      '    const got = await original_input(config); // 变异：走白名单校验',
    tests: ['compare-scope-b'],
    must_mention: '输入不合法！请输入以下值之一',
  },
  {
    desc: 'M305 归因规则删存档备注错位条目（<TS> 规则——saveload 基线未解释非零）',
    file: 'tools/compare/rules.js',
    find: "      if (typeof entry.key === 'string' && entry.key.startsWith('<TS> ')) {",
    replace:
      "      if (false && typeof entry.key === 'string' && entry.key.startsWith('<TS> ')) { // 变异：错位规则删",
    tests: ['compare-scope-b'],
    must_mention: '基线漂移',
  },
  {
    desc: 'M306 cli 比对不传 scope（范围 B 归因组整体旁路——真库直跑未解释非零）',
    file: 'tools/compare/cli.js',
    find: "  const report = diff_streams(golden_entries, ere_entries, {\n    scope: 'B',\n    segment,\n  });",
    replace:
      '  const report = diff_streams(golden_entries, ere_entries, {}); // 变异：scope 忘传',
    tests: ['compare-samples'],
    must_mention: 'unexplained 归零',
  },
  {
    desc: 'M370 表外繁体判定器坏（find_outside_trad 永不报——锁对表外繁体复盲，#188 的靶心）',
    file: 'tools/lang-normalize.js',
    find: '    if (tbl.char_map.has(ch) || !TRAD_SIDE_SET.has(ch)) {',
    replace: '    if (true) { // 变异：表外繁体永不报',
    tests: ['lang-normalize', 'output-lang-lock'],
    must_mention: '贖',
  },
  {
    desc: 'M371 参考集数据删锚点字（贖 移出繁侧集——数据侧坏，判定器跟着失明）',
    file: 'tools/lang-simp-ref.js',
    find: '贖贗',
    replace: '贗',
    tests: ['lang-simp-ref', 'lang-normalize', 'output-lang-lock'],
    must_mention: '贖',
  },
  {
    desc: 'M372 归一表目标值映进繁侧（寵→龍——表把字映成另一个繁体，交叉不变量红）',
    file: 'tools/lang-table.js',
    find: "  寵: '宠',",
    replace: "  寵: '龍', // 变异：目标值落在繁侧集",
    tests: ['lang-simp-ref'],
    must_mention: '繁侧',
  },

  // —— #212（J2 调教回合骨架）：M713 ——
  {
    desc: 'M714 progress 基础条的 (cur/max) 拆解焊死（max 不进事件流）',
    file: 'tools/compare/normalize.js',
    find: `      const base = record.out.match(/^\\(\\s*(\\d+)\\/(\\d+)\\)/);`,
    replace: `      const base = null; // 变异：(cur/max) 不拆`,
    tests: ['compare-normalize'],
    must_mention: 'max: 2000',
  },
];
