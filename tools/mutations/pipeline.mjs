// 变异条目表切片：tools/lang-*（简体检查与参考集）。
// 字段与运行方式见 tools/mutation-check.mjs 头注释。desc 里的 M 编号不人工
// 分配，只作引用锚点，但全表必须唯一（#295；M117 曾被两票撞号，已改正）
// ——重号由 gate_shape 随 --verify 秒级核对。
/** 本分片条数（门 1）：增删条目必须同步改它，理由见 tools/mutation-check.mjs 头注 */
export const COUNT = 8; // #640：-31（比对/转换工具条目 30 条 + M77 语料覆盖 1 条）+2（M12877/M12878 守住 lang-check 的判定器）；M1371 改挂 com-family-wiring 自持清单

export default [
  // M77（归一表删实测字种）随语料普查测试删除、无人可守（#640 删除——
  // 「新增映射须有原作用例」的规则已由 #573 废止）。
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
    must_mention: '词级命中未报出',
    tests: ['output-lang-lock'],
  },
  // M83（数据转换器生成期归一）随转换器删除（#640）。
  // M85-M92（输出比对归一化器/差异引擎/回放播种）随输出比对工具删除（#640）。
  // M148/M149（归一化器 progress 分支）随输出比对工具删除（#640）。
  // M284/M285（样本登记表/cli）随输出比对工具删除（#640）。
  // M299-M302（归一化器灰条/时间戳/守门/ere 侧归一）随输出比对工具删除（#640）。
  // M303/M304（回放观测面/输入白名单）随输出比对工具删除（#640）。
  // M306（cli 比对 scope）随输出比对工具删除（#640）。
  {
    desc: 'M370 表外繁体判定器坏（find_outside_trad 永不报——锁对表外繁体复盲，#188 的靶心）',
    file: 'tools/lang-check.js',
    find: '    if (tbl.char_map.has(ch) || !TRAD_SIDE_SET.has(ch)) {',
    replace: '    if (true) { // 变异：表外繁体永不报',
    tests: ['lang-check', 'output-lang-lock'],
    // 锚取断言消息而非具体汉字：#236 把「贖」加进归一表后，表外检测器不再
    // 报它，旧锚当场失配。断言消息不随表增长而漂。
    must_mention: '不在归一表——这正是 #188 的失明点，由参考集报出',
  },
  {
    desc: 'M371 参考集数据删锚点字（贖 移出繁侧集——数据侧坏，判定器跟着失明）',
    file: 'tools/lang-simp-ref.js',
    find: '贖贗',
    replace: '贗',
    tests: ['lang-simp-ref'],
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

  // M714（归一化器 (cur/max) 拆解）随输出比对工具删除（#640）。
  // M660-M667（调教段登记/回放/归因/基线锁）随输出比对工具删除（#640）。
  // M1102（回放漏装性交系）随输出比对工具删除；同一行为的清单守卫改挂
  // M1371（见下，靶改为 com-family-wiring 自持的调教路径清单）。
  {
    desc: 'M1371 调教路径清单漏装奉仕系（COM30-38 的真实 guard 不生效）（#274；#640 起靶改为 com-family-wiring 自持清单）',
    file: 'test/com-family-wiring.test.js',
    find: "  'system/train/com-service',",
    replace: '  // 变异：路径清单漏装奉仕系',
    tests: ['com-family-wiring'],
    must_mention: '调教路径清单漏装：com-service',
  },
  {
    desc: 'M12877 lang-check 词级判定被拆（find_offenders 不再查词级——简体锁探针的词级命中失明）',
    file: 'tools/lang-check.js',
    find: '  for (const { source } of tbl.word_map) {',
    replace: '  for (const { source } of []) { // 变异：词级判定拆',
    tests: ['lang-check', 'output-lang-lock'],
    must_mention: '词级命中未报出',
  },
  {
    desc: 'M12878 scan_string_literals 注释分支被拆（注释里的引号误开字符串——扫描器失明，转义断言先红）',
    file: 'tools/lang-check.js',
    find: "    if (ch === '/' && text[i + 1] === '/') {",
    replace: '    if (false) { // 变异：注释分支拆',
    tests: ['lang-check'],
    must_mention: '转义序列按其字面值入内容',
  },
];
