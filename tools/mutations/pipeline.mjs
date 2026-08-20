// 变异台账切片：tools/compare、tools/lang-*、tools/csv-to-yml（数据管线与输出对拍）。
// 字段与运行方式见 tools/mutation-check.mjs 头注释；新增/删除条目必须同步改
// 工具里的 LEDGER_COUNT_BASELINE（两道门）。desc 里的 M 编号是历史惯性编号
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
    desc: 'M79 豁免名单删華胥の亡靈条（简体锁必须点名致谢行）',
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
    find: '.map((l) => to_simplified(l));',
    replace: '.map((l) => l); // 变异：样本侧去归一',
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
    desc: 'M89 归因规则删 体力 条键（golden 基础条变未解释差异）',
    file: 'tools/compare/rules.js',
    find: "const STUB_GAUGE_KEYS = new Set(['体力', '气力', '射精（你）']);",
    replace:
      "const STUB_GAUGE_KEYS = new Set(['气力', '射精（你）']); // 变异：体力 删",
    tests: ['compare-first-turn'],
    must_mention: '分类计数与当前欠账清单一致',
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
    must_mention: '对拍窗口不完整',
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
    desc: 'M149 归一化器 progress 分支删除（结构化记录从事件流消失——对拍未解释）',
    file: 'tools/compare/normalize.js',
    find: "    } else if (record.type === 'progress') {",
    replace:
      "    } else if (record.type === 'progress_never') { // 变异：分支删除",
    tests: ['compare-normalize', 'compare-first-turn'],
    must_mention: 'progress 记录',
  },
];
