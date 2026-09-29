// 变异条目表切片：tools/ 下的检查器与生成器自身（trace/domain/engine-contract/ownership/gen-facade/facade-names）。
// 字段与运行方式见 tools/mutation-check.mjs 头注释。desc 里的 M 编号不人工
// 分配，只作引用基准，但全表必须唯一（#295；M117 曾被两票撞号，已改正）
// ——重号由 gate_shape 随 --verify 秒级核对。
/** 本分片条数（门 1）：增删条目必须同步改它，理由见 tools/mutation-check.mjs 头注 */
export const COUNT = 86; // +3（M14220–M14222：子进程超时检查的扫描器跳过注释）；#536 -8 +2（启动自检随串行档改走隔离副本删除，条目一并删；M14210：串行档就地变异；M14211：串行档不看副本对照）；#646 +2（M14200：出处检查的只占位符模板串；M14201：--changed 按 tests: 选条目）；#641 -96（追溯与存根检查条目随相应工具与清单一并删除）；更早的计数沿革见 git 历史

export default [
  {
    desc: 'M11630 冲突标记的行中形式识别删除（行尾尾巴重新失明）',
    file: 'tools/conflict-marker-check.mjs',
    find: '    if (INLINE_END_RE.test(line) || INLINE_START_RE.test(line)) {',
    replace: '    if (false) {',
    tests: ['conflict-marker-check'],
    must_mention: '行中标记必须红',
  },
  {
    desc: 'M157 生成区/手写区：--force 重写整文件而不经标记替换',
    file: 'tools/gen-facade.js',
    find: '      replace_generated_section(existing, spec.section()),',
    replace: '      spec.body,',
    tests: ['gen-facade'],
    must_mention: '只替换生成区',
  },
  {
    desc: 'M160 字段同时出现在非属主域（属主过滤被掏空）',
    file: 'tools/gen-facade.js',
    find: '.filter(([, owner]) => owner === domain)',
    replace: '.filter(() => true)',
    tests: ['gen-facade'],
    must_mention: '口上域切片缺名',
  },
  {
    desc: 'M161 跨域判定被掏空：属主等于本域恒真，跨域写永不成立',
    file: 'tools/domain-check.mjs',
    find: '      if (owner === domain) {',
    replace: '      if (true) {',
    tests: ['domain-check'],
    must_mention: '必须红且报出位置（新文件自动纳入）',
  },
  {
    desc: 'M162 判定依据脱离产物：所有权区间坍缩为单下标，区间尾段全部失主',
    file: 'tools/domain-check.mjs',
    find: '    const end = match[2] ? Number(match[2]) : start;',
    replace: '    const end = start;',
    tests: ['domain-check'],
    must_mention: '必须红且报出位置（新文件自动纳入）',
  },
  {
    desc: 'M163 条目表过期失效检查被拆（count > actual 恒假，消化现有条目后忘删条目不再红）',
    file: 'tools/domain-check.mjs',
    find: '      if (count > actual) {',
    replace: '      if (false) {',
    tests: ['domain-check'],
    must_mention: '过期失效',
  },
  {
    desc: 'M164 基线计数检查被拆（count > baseline 恒假，抬计数吸收新增待办不再红）',
    file: 'tools/domain-check.mjs',
    find: '      } else if (count > baseline) {',
    replace: '      } else if (false) {',
    tests: ['domain-check'],
    must_mention: '不得超基线',
  },
  {
    desc: 'M165 基线键门被拆（baseline === undefined 恒假，基线外新条目不再红）',
    file: 'tools/domain-check.mjs',
    find: '      if (baseline === undefined) {',
    replace: '      if (false) {',
    tests: ['domain-check'],
    must_mention: '只能变短',
  },
  {
    desc: 'M166 包装层白名单退化成目录口子（ere/facade/ 整目录跳过扫描）',
    file: 'tools/domain-check.mjs',
    find: '    if (rel === SDK_FILE || WRAPPER_FILES.includes(rel)) {',
    replace:
      "    if (rel === SDK_FILE || rel.startsWith('ere/facade/') || WRAPPER_FILES.includes(rel)) {",
    tests: ['domain-check'],
    must_mention: '目录逃生口',
  },
  {
    desc: 'M172 调用点规则的界值检查被拆（只查下界，barWidth=24 放行）',
    file: 'tools/engine-contract-check.mjs',
    find: '      } else if (value < rule.min || value > rule.max) {',
    replace: '      } else if (value < rule.min) {',
    tests: ['engine-contract-check'],
    must_mention: '改成 24',
  },
  {
    desc: 'M173 基准检查被拆（字面消失不红，引擎升版当天守护无声消失）',
    file: 'tools/engine-contract-check.mjs',
    find: '      if (!renderer_source.includes(anchor)) {',
    replace: '      if (false) { // 变异：基准检查拆除',
    tests: ['engine-contract-check'],
    must_mention: '基准失配',
  },
  {
    desc: 'M174 失守语义被拆（failures 归零——工具只会打印不会红，#449 改同进程调用后目标点随 run() 的返回值挪，不再是 CLI 退出码）',
    file: 'tools/engine-contract-check.mjs',
    find: "return { failures, output: lines.join('\\n') };",
    replace:
      "return { failures: 0, output: lines.join('\\n') }; // 变异：失守语义拆除",
    tests: ['engine-contract-check'],
    must_mention: '基准失配',
  },
  {
    desc: 'M175 条目表基线检查被拆（基线外新条目不再红）',
    file: 'tools/engine-contract-check.mjs',
    find: '    if (!LEDGER_BASELINE.includes(entry.id)) {',
    replace: '    if (false) { // 变异：基线检查拆除',
    tests: ['engine-contract-check'],
    must_mention: '只能变短',
  },
  {
    desc: 'M176 条目表过期失效检查被拆（见证注释消失不再红）',
    file: 'tools/engine-contract-check.mjs',
    find: '    if (!fixture_source.includes(entry.witness)) {',
    replace: '    if (false) { // 变异：过期失效检查拆除',
    tests: ['engine-contract-check'],
    must_mention: '过期失效',
  },
  {
    desc: 'M177 基准定位器退化成写死哈希文件名（渲染包换名即失明）',
    file: 'tools/engine-contract-check.mjs',
    find: 'const RENDERER_MAP_RE = /^js\\/app\\.[0-9a-f]+\\.js\\.map$/;',
    replace:
      'const RENDERER_MAP_RE = /^js\\/app\\.2cccec57\\.js\\.map$/; // 变异：写死哈希',
    tests: ['engine-contract-check'],
    must_mention: '仍能定位',
  },
  {
    desc: 'M179 yml 合流被拆（YML_NAME_FILES 删 mark，mark 名字只剩手写表）',
    file: 'tools/gen-facade.js',
    find: "  mark: 'Mark.yml',\n",
    replace: '',
    tests: ['gen-facade'],
    must_mention: '两源合流',
  },
  {
    desc: 'M180 两源冲突检查被拆（名字不一致时静默择手写，不再报错）',
    file: 'tools/gen-facade.js',
    find: `    if (from_yml !== manual.name) {
      throw new Error(
        \`两源名字不一致 \${table}:\${index}：yml 列名「\${from_yml}」vs facade-names「\${manual.name}」——yml 列名是唯一真相，先对齐再生成\`,
      );
    }`,
    replace: `    if (from_yml !== manual.name) {
      return manual;
    }`,
    tests: ['gen-facade'],
    must_mention: '名字不一致',
  },
  {
    desc: 'M181 delta 属主结论被改（train → system，切片落错域文件）',
    file: 'tools/facade-names.js',
    find: `const PORT_TABLE_OWNERS = {
  delta: 'train',`,
    replace: `const PORT_TABLE_OWNERS = {
  delta: 'system',`,
    tests: ['gen-facade'],
    must_mention: '移植自建表门面',
  },
  {
    desc: 'M182 cflag 好感度补名下标错位（2 → 3，写进别的槽）',
    file: 'tools/facade-names.js',
    find: "  2: named('好感度', 'CFLAG:2 主人による調教経験(好感度)'),",
    replace: "  3: named('好感度', 'CFLAG:2 主人による調教経験(好感度)'),",
    tests: ['gen-facade'],
    must_mention: '好感度',
  },
  {
    desc: 'M373 三处 asar 候选悄悄不一致一条（引擎定位在三个文件里各写一份，不一致的后果是静默降级而非报错）',
    file: 'tools/engine-contract-check.mjs',
    find: "    path.join(os.homedir(), '.era-engine', 'app.asar'),",
    replace:
      "    path.join(os.homedir(), '.era-engine-drifted', 'app.asar'), // 变异：候选不一致",
    tests: ['asar-candidates'],
    must_mention: '三处必须同款',
  },
  {
    desc: 'M374 ERE_ENGINE_ASAR=none 开关被拆（SOP 的跳过基线核对会静默变成「带引擎」跑，那时跳过数是 0、与基线永远对不上）',
    file: 'test/helpers/engine-bundle.js',
    find: "  if (process.env.ERE_ENGINE_ASAR === 'none') {",
    replace:
      "  if (false && process.env.ERE_ENGINE_ASAR === 'none') { // 变异：none 开关被拆",
    tests: ['asar-candidates'],
    must_mention: 'none 必须让 engine-bundle 退回无引擎',
  },

  // —— #212 返工三：二段寻址检查的反向变异 ——
  {
    desc: 'M715 检查表族清单摘掉 tequip（阳性对照当场红——检查必须有牙）',
    file: 'test/chara-table-addressing.test.js',
    find: `  'tequip',
  'tcvar',`,
    replace: `  'tcvar',`,
    tests: ['chara-table-addressing'],
    must_mention: '检查清单与期望名单不一致',
  },

  // —— #256 引擎声明的两道核对 ——
  // 全量变异退到阶段闸之后，ENGINE_SKIP_BASELINE 的不一致一个阶段才暴露
  // （#135 的 M222 漏抬就是这么连红 18 次 4 天的）。补偿是门 4（静态声明
  // 数，随 npm test 每次都查）与 run_one 的逐条交叉核对。两道各钉一条。
  {
    desc: 'M733 ENGINE_SKIP_BASELINE 抬到 27（声明数与基线分家——门 4 若失守，这一类不一致要一个阶段才暴露）',
    file: 'tools/mutation-check.mjs',
    find: 'const ENGINE_SKIP_BASELINE = 26;',
    replace: 'const ENGINE_SKIP_BASELINE = 27; // 变异：与声明数分家',
    tests: ['mutation-check'],
    must_mention: 'engine: true 的声明数',
  },
  {
    desc: 'M734 交叉核对被拆（实测按「跳过」分类却没声明也放行——门 4 数得对个数、标错哪一条就无人可见）',
    file: 'tools/mutation-check.mjs',
    find: '    if (m.engine !== true) {',
    replace: '    if (false && m.engine !== true) { // 变异：交叉核对被拆',
    tests: ['mutation-check'],
    must_mention: '漏声明 engine: true 必须非 0',
  },

  // —— #295：M 编号唯一性门自身的自证（M2080-M2099 号段） ——
  {
    desc: 'M2080 M 编号重复检测被拆（同编号不同 desc 静默放行——引用句柄失效无人可见）（#295）',
    file: 'tools/mutation-check.mjs',
    find: '      if (prior !== undefined && prior !== m.desc) {',
    replace:
      '      if (false && prior !== undefined && prior !== m.desc) { // 变异：M 编号重复检测被拆',
    tests: ['mutation-check'],
    must_mention: 'M 编号相同但 desc 不同必须非 0',
  },
  // —— #302：CI 补引擎后，有引擎那一侧的守护 ——
  {
    desc: 'M2770 有引擎侧基线从 0 改成 3（默许跳过三个用例而不报警）（#302）',
    file: 'test/engine-present-skip-baseline.txt',
    find: '\n0\n',
    replace: '\n3\n',
    tests: ['skip-count-check'],
    must_mention: '有引擎侧基线不是 0',
  },
  {
    desc: 'M2771 跑错环境的方向提示被删（基线 0 时不再指向 asar 与门控）（#302）',
    file: 'tools/skip-count-check.mjs',
    find: "  const wrong_env =\n    baseline === 0\n      ? '\\n  基线为 0 = 有引擎环境：跳过不为 0 多半是 asar 没被 locate_asar 认出来，' +\n        '或该用例的门控条件写错了。'\n      : '';",
    replace: "  const wrong_env = '';",
    tests: ['skip-count-check'],
    must_mention: '基线为 0 时应提示 asar',
  },

  // —— #646：出处检查不接受只有占位符的模板串 ——
  {
    desc: 'M14200 出处检查又接受只有占位符的模板串（`${x}` 能匹配任意 must_mention）',
    file: 'tools/mutation-check.mjs',
    find: "    .filter((segs) => segs.some((s) => s !== ''))\n",
    replace: '',
    tests: ['mutation-check'],
    must_mention: '只有占位符的模板串被当成出处',
  },
  {
    desc: 'M14201 --files/--changed 又只看 file:（测试标题改了的条目挑不出来）',
    file: 'tools/mutation-check.mjs',
    find: '    files.has(m.file) || m.tests.some((t) => files.has(`test/${t}.test.js`))\n',
    replace: '    files.has(m.file)\n',
    tests: ['mutation-check'],
    must_mention: '按测试文件应选中引用它的条目',
  },

  // —— #304：并行模式的输出、计数与子进程参数 ——
  {
    desc: 'M2900 并行汇总吞掉判红子进程的计数（一条红就丢它那一整片 caught）（#304）',
    file: 'tools/mutation-check.mjs',
    find: '      if (m) {',
    replace: '      if (m && r.code === 0) { // 变异：非零退出即丢计数',
    tests: ['mutation-check'],
    must_mention: '父进程应如实累加两片的计数',
  },
  {
    desc: 'M2901 报告路径改回 process.exit（管道上会截断排队的 stdout）（#304）',
    file: 'tools/mutation-check.mjs',
    find: '  process.exitCode = problems.length === 0 ? 0 : 1;',
    replace: '  process.exit(problems.length === 0 ? 0 : 1);',
    tests: ['mutation-check'],
    must_mention: '报告路径要用 process.exitCode',
  },
  {
    desc: 'M7030 分片条数核对被拆（自报与实际分家，解析冲突时少收几条不再红）（#367）',
    file: 'tools/mutation-check.mjs',
    find: '    if (s.entries.length !== s.declared) {',
    replace: '    if (false) { // 变异：条数核对拆除',
    tests: ['mutation-check'],
    must_mention: '实际少于自报必须非 0',
  },
  {
    desc: 'M7031 缺 COUNT 的分片不再点名（落回条数不符那句，报「自报 COUNT undefined」）（#367）',
    file: 'tools/mutation-check.mjs',
    find: "    if (typeof s.declared !== 'number') {",
    replace: '    if (false) { // 变异：缺声明落回条数不符分支',
    tests: ['mutation-check'],
    must_mention: '没有导出 COUNT',
  },
  {
    desc: 'M2903 引擎声明门对并行子进程的豁免被删（换表时副本里撞门）（#304）',
    file: 'tools/mutation-check.mjs',
    find: '  if (args.slice !== undefined) return [];',
    replace: '  if (false) return []; // 变异：子进程也跑引擎声明门',
    tests: ['mutation-check'],
    must_mention: '父进程应如实累加两片的计数',
  },
  {
    desc: 'M2740 原始冲突标记识别被拆（行首开始/分隔/结束标记不再报——#299 探针必须抓到失明）',
    file: 'tools/conflict-marker-check.mjs',
    find: "      hits.push({ kind: '原始标记', line: i + 1, text: line.trim() });",
    replace: '      // 变异：原始标记不再报',
    tests: ['conflict-marker-check'],
    must_mention: '原始冲突标记探针必须非 0——未解标记会让登记条目脱离表格',
  },
  {
    desc: 'M2741 prettier 洗净形式识别被拆（七个空格隔开的大于号不再报——只认原始形式等于没修）',
    file: 'tools/conflict-marker-check.mjs',
    find: "      hits.push({ kind: 'prettier 洗净', line: i + 1, text: line.trim() });",
    replace: '      // 变异：prettier 洗净形式不再报',
    tests: ['conflict-marker-check'],
    must_mention: 'prettier 洗净后仍须红——只认原始形式等于没修',
  },
  {
    desc: 'M2742 setext 标题下划线排除被拆（合法标题下的七个等号也报——排除按上下文的探针必须红）',
    file: 'tools/conflict-marker-check.mjs',
    find: '      if (is_setext_underline(line, prev, markdown)) {',
    replace: '      if (false && is_setext_underline(line, prev, markdown)) {',
    tests: ['conflict-marker-check'],
    must_mention: 'setext 标题下划线不得报为冲突标记，实际退出',
  },
  {
    desc: 'M3700 --ids 过滤被拆（点名两条却跑全表——内环提速档必须真的只跑点名的）',
    file: 'tools/mutation-check.mjs',
    find: '  if (args.ids) {',
    replace: '  if (false && args.ids) {',
    tests: ['mutation-check'],
    must_mention: '--ids 必须只跑点名的两条：三条都跑会是「拦截 3」',
  },
  {
    desc: 'M3701 --ids 缺号不再报错（编号写错时静默跑 0 条——「选少了还不说」是本工具唯一不许有的行为）',
    file: 'tools/mutation-check.mjs',
    find: '    if (missing.length > 0) {',
    replace: '    if (false && missing.length > 0) {',
    tests: ['mutation-check'],
    must_mention: '编号不存在必须退 1，实际',
  },
  {
    desc: 'M3702 --ids 不算子集档（is_partial 漏它——无引擎处会撞 ENGINE_SKIP_BASELINE 假红）',
    file: 'tools/mutation-check.mjs',
    find: '    args.ids !== undefined ||',
    replace: '    false ||',
    tests: ['mutation-check'],
    must_mention: '--ids 是子集档，不该核对跳过基线，实际退出',
  },
  {
    desc: 'M3703 用例过滤被拆（每条变异都重跑整份测试文件——口上票里那是每条几秒，K11 实测 51 分钟）',
    file: 'tools/mutation-check.mjs',
    find: '    let run = pattern',
    replace: '    let run = false && pattern',
    tests: ['mutation-check'],
    must_mention: '过滤跑已经红了就该收手；旁支用例留了痕',
  },
  {
    desc: 'M3704 过滤跑没红时不再落回全文（must_mention 不是测试名的条目会被判成漏网——快路不许改判定）',
    file: 'tools/mutation-check.mjs',
    find: '    if (!run || run.status === 0) run = run_tests([]);',
    replace: '    if (!run) run = run_tests([]);',
    tests: ['mutation-check'],
    must_mention: '落回全文后仍应拦下，实际退出',
  },
  {
    desc: 'M3705 test_name 逃生口被拆（must_mention 是运行期拼出的断言消息时，模式必然落空、只能跑全文）',
    file: 'tools/mutation-check.mjs',
    find: '    const pattern = m.test_name || m.must_mention;',
    replace: '    const pattern = m.must_mention;',
    tests: ['mutation-check'],
    must_mention: 'test_name 点名了用例就该只跑它',
  },
  {
    desc: 'M3709 串行档不再让出事件循环（SIGINT 排队到跑完才派发，中断时目标文件停在变异态）',
    file: 'tools/mutation-check.mjs',
    find: '    await new Promise((resolve) => setImmediate(resolve));',
    replace: '    // 变异：串行档不让出事件循环',
    tests: ['mutation-check'],
    must_mention: '信号会一直排队到跑完',
    test_name: 'SIGINT 能中断串行档，并把目标文件还原',
  },
  // —— #493：新加的门面属性检查器自己的行为锁 ——
  {
    desc: 'M10707 门面属性存在性检查焊死（直链上的 chara() 属性都放行——探针用例必须抓到失明，#493）',
    file: 'tools/facade-property-check.mjs',
    find: `    if (members.length >= 2) {
      checked += 1;
      if (!ctx.props.get(domain).has(members[1])) {`,
    replace: `    if (members.length >= 2) {
      checked += 1;
      if (false) { // 变异：属性存在性检查焊死`,
    tests: ['facade-property-check'],
    must_mention: '探针的属性名未被逐处报出',
  },
  {
    desc: 'M10708 手写区访问器不再解析（Object.defineProperty 的属性集为空，chara().dungeon.体力上限 一类被误判缺失，#493）',
    file: 'tools/facade-property-check.mjs',
    find: `  while ((match = defined.exec(text))) {
    props.add(match[1]);
  }`,
    replace: `  while (false && (match = defined.exec(text))) {
    props.add(match[1]);
  }`,
    tests: ['facade-property-check'],
    must_mention: '门面属性检查应全绿，实际退出',
  },
  {
    desc: 'M10710 域切片别名判定焊死（const kojo = chara(x).kojo 之后的 kojo.<属性> 不再判——第 14 处那类写法失明，#493）',
    file: 'tools/facade-property-check.mjs',
    find: `      checked += 1;
      if (!ctx.props.get(domain).has(members[0])) {`,
    replace: `      checked += 1;
      if (false) { // 变异：别名判定焊死`,
    tests: ['facade-property-check'],
    must_mention: '别名上的属性未被报出',
  },
  {
    desc: 'M10712 视图别名判定焊死（const view = chara(x) 之后的 view.<域>.<属性> 不再判——第三条判定面失明，#493）',
    file: 'tools/facade-property-check.mjs',
    find: `      if (members.length < 2) {
        continue;
      }
      checked += 1;
      if (!ctx.props.get(domain).has(members[1])) {`,
    replace: `      if (members.length < 2) {
        continue;
      }
      checked += 1;
      if (false) { // 变异：视图别名判定焊死`,
    tests: ['facade-property-check'],
    must_mention: '视图别名上的属性未被报出',
  },

  // —— #532：--verify 只读（目标同为 tools/mutation-check.mjs）——
  {
    desc: 'M11240 --verify 的只读短路被拆（if (args.verify) 恒假，--verify 落进执行阶段、就地变异并写目标文件）（#532）',
    file: 'tools/mutation-check.mjs',
    find: '  if (args.verify) {',
    replace: '  if (false) { // 变异：--verify 不再短路，直接落进执行阶段',
    tests: ['mutation-check'],
    test_name:
      '--verify 全程只读：目标文件置为只读照样报绿，且不进入执行阶段（#532）',
    must_mention: '工作区只读不该影响结构校验',
  },
  {
    desc: 'M11248 run_one 的 finally 还原被拆（变异写下后不再还原，目标文件留在变异态，工具自报「还原失败（读回不一致）」）（#532；#553 起 finally 体换成带重试的 write_with_retry，#582 起变异写入共用同一个函数，find 两次同步）',
    file: 'tools/mutation-check.mjs',
    find: `  } finally {
    restore_error = write_with_retry(
      full,
      original,
      m.file,
      restore_fail,
      '还原写入',
    );
  }`,
    replace: '  } finally {\n    // 变异：还原被拆\n  }',
    tests: ['mutation-check'],
    test_name: '拦截路径：变异被拦下退出码 0，且目标文件逐字节还原',
    must_mention: '还原失败（读回不一致）',
  },
  {
    desc: 'M11249 SIGINT 处理器退的不是 130（中断被处理了，退出码却报成功——CI 与脚本据此判成败）（#532 初版想守处理器的缺省还原，实测那一段到不了：信号只在条目间的 setImmediate 让出点派发，那时 active_restore 已是 null。改守同一用例里非空的那半）',
    file: 'tools/mutation-check.mjs',
    find: '  process.exit(130);',
    replace: '  process.exit(0); // 变异：中断退出码报成功',
    tests: ['mutation-check'],
    test_name: 'SIGINT 能中断串行档，并把目标文件还原',
    must_mention: 'SIGINT 必须被处理器接住并退 130',
  },

  // —— #553：--jobs 尊重筛选参数、还原写入重试、并行逐条输出（目标同为 tools/mutation-check.mjs）——
  {
    desc: 'M11700 --jobs 丢掉 --ids 等筛选参数（副本各跑整表切片——8 条点名跑成两张半表，S0 验收 25 分钟被超时杀）（#553）',
    file: 'tools/mutation-check.mjs',
    find: "    filter_args = ['--ids', args.ids_spec ?? [...args.ids].join(',')];",
    replace: '    filter_args = []; // 变异：--ids 不下传，副本各跑整表切片',
    tests: ['mutation-check'],
    test_name:
      '--jobs 只跑 --ids 点名的条目：点名外的条目在父汇总与子输出里都不出现（#553）',
    must_mention: '--jobs 必须只跑 --ids 点名的条目',
  },
  {
    desc: 'M11701 --slice 与 --ids 不再取交集（切片被 ids 短路——并行子进程的「筛选 ∩ 切片」分工失效，串行交集档同坏）（#553）',
    file: 'tools/mutation-check.mjs',
    find: `  if (args.slice) {
    const [i, k] = args.slice;
    picked = picked.filter((m) => desc_rank(m.desc) % k === i);
  }`,
    replace: `  if (args.slice && !args.ids) { // 变异：ids 在场时切片被短路
    const [i, k] = args.slice;
    picked = picked.filter((m) => desc_rank(m.desc) % k === i);
  }`,
    tests: ['mutation-check'],
    test_name:
      '--slice 与 --ids 取交集：编号先筛、切片再分，串行单跑同样成立（#553）',
    must_mention: '--slice 与 --ids 取交集：切片被 --ids 短路时会跑全部条目',
  },
  {
    desc: 'M11702 --sample 与 --jobs 同给不再报错（静默跑副本全量——抽样的总量语义没有副本表达，换语义必须有声）（#553）',
    file: 'tools/mutation-check.mjs',
    find: `  if (args.sample !== undefined) {
    throw new ArgError(`,
    replace: `  if (false && args.sample !== undefined) { // 变异：不再报错
    throw new ArgError(`,
    tests: ['mutation-check'],
    test_name: '--sample 与 --jobs 同时给时当场报错退出，不建副本（#553）',
    must_mention: '同时给 --sample 与 --jobs 必须当场报错',
  },
  {
    desc: 'M11703 目标文件写入不重试（Windows 瞬态占用一次即弃——#541 一晚三次还原失败即红的那条路；#582 起还原与变异共用这份预算，find 随之改指 WRITE_RETRY_TRIES）（#553）',
    file: 'tools/mutation-check.mjs',
    find: 'const WRITE_RETRY_TRIES = 5;',
    replace: 'const WRITE_RETRY_TRIES = 1; // 变异：不重试',
    tests: ['mutation-check'],
    test_name:
      '还原写入遇瞬态占用时重试到成功：注入前两次失败仍全拦且目标文件逐字节还原（#553）',
    must_mention: '注入两次瞬态失败仍应重试到成功',
  },
  {
    desc: 'M11704 还原失败的报告不点名编号（停在谁的变异态说不清——没法核对 diff）（#553；#582 起变异写入的报告共用 entry_label，find 改指它）',
    file: 'tools/mutation-check.mjs',
    find: "  return num === null ? '某条' : `M${num}`;",
    replace: "  return '某条'; // 变异：点名焊死",
    tests: ['mutation-check'],
    test_name:
      '还原写入重试尽仍失败：点名 M 编号与还原命令、停止后续条目、退出码 1（#553）',
    must_mention: '还原失败必须点名 M 编号',
  },
  {
    desc: 'M11705 还原失败后照跑后续条目（残留被当原文——后面每一条的判定都不可信）（#553）',
    file: 'tools/mutation-check.mjs',
    find: "    if (r === 'restore-fail') break;",
    replace: "    if (false && r === 'restore-fail') break; // 变异：照跑后续",
    tests: ['mutation-check'],
    test_name:
      '还原写入重试尽仍失败：点名 M 编号与还原命令、停止后续条目、退出码 1（#553）',
    must_mention: '还原失败后不得继续跑后续条目',
  },
  {
    desc: 'M11706 并行子进程输出攒到退出才转发（外层超时终止时已完成的结果全部丢失——0 字节日志就是这么来的）（#553）',
    file: 'tools/mutation-check.mjs',
    find: '          { cwd: copy, on_chunk: (d) => process.stdout.write(d) },',
    replace: '          { cwd: copy }, // 变异：不逐块转发，攒到子进程退出',
    tests: ['mutation-check'],
    test_name:
      '--jobs 逐条输出：条目结果随完成随转发，不等全部副本结束（#553）',
    must_mention: '并行模式必须逐条转发子进程输出',
  },
  {
    desc: 'M11707 筛选后 0 条不短路（空选集照建副本白跑对照——git 改动没命中条目时的常态）（#553）',
    file: 'tools/mutation-check.mjs',
    find: '  if (filtered && selection.length === 0) {',
    replace:
      '  if (false && filtered && selection.length === 0) { // 变异：空选集照建副本',
    tests: ['mutation-check'],
    test_name: '--jobs 筛选后 0 条：不建副本直接完成（#553）',
    must_mention: '筛选后 0 条时不建副本直接完成',
  },
  {
    desc: 'M11708 筛选档对照回全量（--jobs --ids 每个副本先白跑一遍全量测试——筛选档没有可用性）（#553）',
    file: 'tools/mutation-check.mjs',
    find: '            ...(filtered ? control_files : []),',
    replace: '            // 变异：对照永远全量',
    tests: ['mutation-check'],
    test_name:
      '--jobs 筛选档的对照只跑选中条目的测试面：副本里无关的红测试不拦筛选档（#553）',
    must_mention: '筛选档的对照只跑选中条目的测试面',
  },
  {
    desc: 'M11709 副本数不按选中条数一致（1 条点名也建满 K 份副本白拷贝仓库白跑对照）（#553）',
    file: 'tools/mutation-check.mjs',
    find: `  const jobs = filtered
    ? Math.max(1, Math.min(args.jobs, selection.length))
    : args.jobs;`,
    replace: '  const jobs = args.jobs; // 变异：不按选中条数一致副本数',
    tests: ['mutation-check'],
    test_name:
      '--jobs 副本数按选中条数限定：一条编号两个 jobs 只有一个子进程 SUMMARY（#553）',
    must_mention: '副本数不得超过选中条数',
  },
  {
    desc: 'M11710 还原失败的报告不给还原命令（人只能自己猜怎么回退）（#553）',
    file: 'tools/mutation-check.mjs',
    find: `  if (head !== null && head === original) {
    console.log(
      \`    还原：先 git diff \${m.file} 核对，是残留就 git checkout HEAD -- \${m.file}\`,
    );`,
    replace: `  if (head !== null && head === original) {
    console.log('    （变异：不给还原命令）');`,
    tests: ['mutation-check'],
    test_name:
      '还原失败报告按 git 状态给建议：干净树给 git checkout，脏树警告别连未提交改动一起删（#553）',
    must_mention: '还原失败必须给出可照抄的还原命令',
  },
  {
    desc: 'M11711 --slice 与 --jobs 互斥被拆（外层切片被副本分工静默丢掉——`--slice i k --jobs 2` 跑成整张表）（#553）',
    file: 'tools/mutation-check.mjs',
    find: `  if (args.slice !== undefined) {
    throw new ArgError(
      '✗ --slice 与 --jobs 不能同时用：--jobs 的副本自己按 --slice i k 分摊，' +`,
    replace: `  if (false && args.slice !== undefined) { // 变异：不再报错
    throw new ArgError(
      '✗ --slice 与 --jobs 不能同时用：--jobs 的副本自己按 --slice i k 分摊，' +`,
    tests: ['mutation-check'],
    test_name:
      '--slice 与 --jobs 同时给时当场报错退出，不静默丢外层切片（#553）',
    must_mention: '必须当场报错退出 1，实际退出',
  },
  {
    desc: 'M11712 --files 零匹配判断回看切片后的选集（合法的 --files 恰好分到空片被误报成写错文件名——副本分摊与写错同形）（#553）',
    file: 'tools/mutation-check.mjs',
    find: '    select_entries(entries, { ...args, slice: undefined }).length === 0',
    replace:
      '    select_entries(entries, args).length === 0 // 变异：看切片后的选集',
    tests: ['mutation-check'],
    test_name:
      '--files 与 --slice：空片是正常分工不报错，拼错文件名带 --slice 也必报错（#553）',
    must_mention: '分到空片是正常分工，不该报错',
  },
  {
    desc: 'M11713 还原建议不看「变异前原文是否等于 HEAD」（脏树上也推荐 git checkout——会连未提交改动一起删掉，正落在 #536 的自检盲区里）（#553）',
    file: 'tools/mutation-check.mjs',
    find: '  if (head !== null && head === original) {',
    replace: '  if (head !== null) { // 变异：HEAD 里取得到就给 checkout',
    tests: ['mutation-check'],
    test_name:
      '还原失败报告按 git 状态给建议：干净树给 git checkout，脏树警告别连未提交改动一起删（#553）',
    must_mention: '脏树必须点明变异前就有未提交改动',
  },
  {
    desc: 'M11714 非 git 根取不到 HEAD 时不另给说法（折进脏树分支——夹具与并行副本上推荐 git checkout，那条命令在这里跑不了）（#553）',
    file: 'tools/mutation-check.mjs',
    find: '  } else if (head === null) {',
    replace:
      '  } else if (false && head === null) { // 变异：非 git 根也给 git 建议',
    tests: ['mutation-check'],
    test_name:
      '还原写入重试尽仍失败：点名 M 编号与还原命令、停止后续条目、退出码 1（#553）',
    must_mention: '非 git 根不能推荐 git checkout',
  },
  {
    desc: 'M11715 目标文件写入的瞬态失败只认 UNKNOWN 一个码（EPERM/EBUSY 一次即弃——真实占用抛的码不固定，只认观测样本就漏；#582 起还原与变异共用这个集合，find 随之改指 WRITE_RETRY_CODES）（#553）',
    file: 'tools/mutation-check.mjs',
    find: "const WRITE_RETRY_CODES = new Set(['UNKNOWN', 'EBUSY', 'EPERM']);",
    replace:
      "const WRITE_RETRY_CODES = new Set(['UNKNOWN']); // 变异：只认 UNKNOWN",
    tests: ['mutation-check'],
    test_name:
      '还原写入的瞬态失败重试认全三个可重试码：注入 EPERM 同样重试到成功（#553）',
    must_mention: '注入两次 EPERM 仍应重试到成功',
  },
  {
    desc: "M11716 空选集不提示（`--files` 恰好分到空片、`--ids ''` 的「拦截 0 / 红 0」被汇总行的「全部变异被测试拦截」读成验证过了）（#553）",
    file: 'tools/mutation-check.mjs',
    find: `  if (picked.length === 0) {
    console.log('⚠ 本轮 0 条：筛选/切片后没有可跑的条目（不是「全部被拦截」）');
  }`,
    replace: `  if (false && picked.length === 0) { // 变异：0 条不提示
    console.log('⚠ 本轮 0 条：筛选/切片后没有可跑的条目（不是「全部被拦截」）');
  }`,
    tests: ['mutation-check'],
    test_name:
      '--files 与 --slice：空片是正常分工不报错，拼错文件名带 --slice 也必报错（#553）',
    must_mention: '分到空片要明确说「本轮 0 条」',
  },
  {
    desc: 'M11717 --jobs 的 --changed/--files 清单不下传副本（子进程又各跑整表切片——副本里没有 .git，这一支的退化形式正是本工单要根除的那个）（#553）',
    file: 'tools/mutation-check.mjs',
    find: `  } else if (args.files || args.base) {
    // 只传被选中条目用到的那部分清单：子进程按同一规则重选，结果与这里一致`,
    replace: `  } else if (false && (args.files || args.base)) { // 变异：清单不下传
    // 只传被选中条目用到的那部分清单：子进程按同一规则重选，结果与这里一致`,
    tests: ['mutation-check'],
    test_name:
      '--jobs 的 --changed 筛选下传副本：清单外条目在子输出与汇总里都不出现（#553）',
    must_mention: '--jobs 的 --changed 筛选必须下传副本',
  },
  // —— #582：变异写入的重试与「未写入」报告、并行副本的启动清理（目标同为 tools/mutation-check.mjs）——
  {
    desc: 'M11890 变异写入不走重试写函数（直接 writeFileSync——Windows 瞬态占用一次即弃，本工单要修的就是这一条）（#582）',
    file: 'tools/mutation-check.mjs',
    find: `  const write_error = write_with_retry(
    full,
    apply_mutation(original, m),
    m.file,
    mutate_fail,
    '变异写入',
  );`,
    replace: `  fs.writeFileSync(full, apply_mutation(original, m), 'utf8'); // 变异：不走重试写函数
  const write_error = undefined;`,
    tests: ['mutation-check'],
    test_name:
      '变异写入遇瞬态占用时重试到成功：注入前两次失败仍全拦且目标文件逐字节还原（#582）',
    must_mention: '变异写入的重试过程要记录',
  },
  {
    desc: 'M11891 变异写入失败后不早退（一个字节都没写下去却照跑测试——这一条按「未写入」的处置被拆，判定变成拿原文跑出来的假结论）（#582）',
    file: 'tools/mutation-check.mjs',
    find: '  if (write_error) {',
    replace: '  if (false && write_error) { // 变异：写入失败后不早退',
    tests: ['mutation-check'],
    test_name:
      '变异写入重试尽仍失败：报出 M 编号与文件、按「未写入」计红、后续条目继续（#582）',
    must_mention: '应报出重试尽仍失败与实际尝试次数',
  },
  {
    desc: 'M11892 变异写入失败算成拦截（tally 记 caught、退出码 0——没验证过的条目被当成验证过了，一次安静的误报通过）（#582）',
    file: 'tools/mutation-check.mjs',
    find: "    report_write_failed(m, write_error);\n    return 'write-fail';",
    replace:
      "    report_write_failed(m, write_error);\n    return 'caught'; // 变异：没验证过也算拦截",
    tests: ['mutation-check'],
    test_name:
      '变异写入重试尽仍失败：报出 M 编号与文件、按「未写入」计红、后续条目继续（#582）',
    must_mention: '有条目没验证完必须退 1',
  },
  {
    desc: 'M11893 变异写入失败后不读回实测（照报「仍是原文」继续跑——文件可能已被 O_TRUNC 截断或半写，后面的条目拿它当原文；#582 审查轮的阻断项，目标从「报告不说明处置」改指读回比对）',
    file: 'tools/mutation-check.mjs',
    find: "    if (fs.readFileSync(full, 'utf8') !== original) {",
    replace: '    if (false) { // 变异：不读回实测',
    tests: ['mutation-check'],
    test_name:
      '变异写入失败但目标文件已不是原文：按残留停下、不跑后续条目（#582 审查轮）',
    must_mention: '写入失败后必须读回实测',
  },
  {
    desc: 'M11894 并行副本目录名不带创建者 PID（启动清理失去所有者条件——只剩年龄，长任务副本会被误删）（#582）',
    file: 'tools/mutation-check.mjs',
    find: '    path.join(os.tmpdir(), `${COPY_PREFIX}${process.pid}-`),',
    replace: '    path.join(os.tmpdir(), COPY_PREFIX), // 变异：目录名不带 PID',
    tests: ['mutation-check'],
    test_name: '并行副本目录名带所有者 PID：跑动中看得见，退出后删干净（#582）',
    must_mention: '副本目录名必须带创建者的 PID',
  },
  {
    desc: 'M11895 启动清理不看年龄（刚建好的副本也被删——强杀后仍在写的孤儿子进程、名字里没有 PID 的旧格式副本都靠这条挡住）（#582）',
    file: 'tools/mutation-check.mjs',
    find: '    if (age < COPY_STALE_MS) continue;',
    replace: '    // 变异：不看年龄，只认所有者',
    tests: ['mutation-check'],
    test_name:
      '启动清理陈旧并行副本：超龄且所有者不在才删，活副本与新鲜副本不动（#582）',
    must_mention: '刚建好的副本不删',
  },
  {
    desc: 'M11896 启动清理不看所有者存活（超龄就删——另一个 agent 正在跑的长任务副本当场消失）（#582）',
    file: 'tools/mutation-check.mjs',
    find: `    if (age < COPY_FORCE_STALE_MS) {
      const owner = COPY_OWNER_RE.exec(name);
      if (owner !== null) {
        try {
          process.kill(Number(owner[1]), 0);
          continue; // 所有者进程还在跑
        } catch (e) {
          if (e?.code === 'EPERM') continue; // 存在但探不动，按活着处理
        }
      }
    }`,
    replace: '    // 变异：不探活，只看年龄',
    tests: ['mutation-check'],
    test_name:
      '启动清理陈旧并行副本：超龄且所有者不在才删，活副本与新鲜副本不动（#582）',
    must_mention: '所有者还在（另一个 agent 的长任务）必须保住',
  },
  {
    desc: 'M11897 启动清理不再执行（clean_stale_copies 不接入调用点——临时目录里的副本继续累积，本工单要治的那件事回到原样）（#582）',
    file: 'tools/mutation-check.mjs',
    find: '  clean_stale_copies();',
    replace: '  // 变异：启动清理不接入',
    tests: ['mutation-check'],
    test_name:
      '启动清理陈旧并行副本：超龄且所有者不在才删，活副本与新鲜副本不动（#582）',
    must_mention: '清掉的副本要报出来',
  },
  {
    desc: 'M11898 写入失败的注入预算焊死（MUTATION_CHECK_MUTATE_FAIL_FIRST 不再生效——变异写入的重试、「未写入」与读回实测三条分支从此跑不到，测试变成自证）（#582）',
    file: 'tools/mutation-check.mjs',
    find: '    left: spec ? Number(spec[1]) : 0,',
    replace: '    left: 0, // 变异：注入预算焊死',
    tests: ['mutation-check'],
    test_name:
      '变异写入遇瞬态占用时重试到成功：注入前两次失败仍全拦且目标文件逐字节还原（#582）',
    must_mention: '变异写入的重试过程要记录',
  },
  {
    desc: 'M11899 陈旧副本的年龄条件方向反了（只删没超龄的——阈值倒着用，超龄残留一个也清不掉）（#582）',
    file: 'tools/mutation-check.mjs',
    find: '    if (age < COPY_STALE_MS) continue;',
    replace: '    if (age > COPY_STALE_MS) continue; // 变异：条件方向反了',
    tests: ['mutation-check'],
    test_name:
      '启动清理陈旧并行副本：超龄且所有者不在才删，活副本与新鲜副本不动（#582）',
    must_mention: '超过清理阈值、所有者进程已不在的副本必须删掉',
  },
  // —— #530：纯文本选项行棘轮（目标文件 ere/system/train/com-toy.js 与 tools/plaintext-options.mjs）——
  {
    desc: 'M11207 新增一行纯文本选项（com-toy 的满月确认多打一枚 [2] 行——棘轮的「只许收紧」的阻断性检查必须拦住，#530；目标行随 #572 的按钮化同步改写）',
    file: 'ere/system/train/com-toy.js',
    find: "  era.printButton('好的', 0);\n  era.printButton('算了', 1);",
    replace: `  era.printButton('好的', 0);\n  era.printButton('算了', 1);\n  era.print('[2] 再看一下'); // 变异：新增纯文本选项行`,
    tests: ['plaintext-option'],
    must_mention: '新增了纯文本选项行',
  },
  {
    // #710：基线清空（0 行 / 0 文件）后「条数变少」门恒真，扫描器失明改由
    // test/plaintext-option.test.js 的「扫描器自证」拦住（样本命中面变空即红）
    desc: 'M11208 扫描器失明（is_comment_line 恒真——所有纯文本选项行都被跳过，#530；#710 起由扫描器自证拦住）',
    file: 'tools/plaintext-options.mjs',
    find: `function is_comment_line(line) {
  const trimmed = line.trim();
  return (
    trimmed.startsWith('//') ||
    trimmed.startsWith('/*') || // 含块注释开头的 \`/**\`（文件头注释第一行）
    trimmed.startsWith('*') ||
    trimmed.startsWith(';')
  );
}`,
    replace: `function is_comment_line(line) {
  return true; // 变异：扫描器失明
}`,
    tests: ['plaintext-option'],
    must_mention:
      '命中面 = print/println/printAndWait 的首实参字面量里的选项编号',
  },

  // —— #536：串行档在隔离副本里变异（目标同为 tools/mutation-check.mjs）——
  {
    desc: 'M14210 串行档不建副本、直接在工作区里变异（进程被强制终止时目标文件停在变异态，混在未提交改动里认不出来）（#536）',
    file: 'tools/mutation-check.mjs',
    find: '      : await execute_in_copy(picked, args.root);',
    replace:
      '      : await execute(picked, args.root); // 变异：串行档就地变异',
    tests: ['mutation-check'],
    test_name:
      '串行档在隔离副本里变异：测试跑在副本里，工作区逐字节不变（#536）',
    must_mention: '串行档的测试必须跑在隔离副本里',
  },
  {
    desc: 'M14211 串行档不看副本对照的结果（副本缺文件时测试照样红，被当成「变异被拦截」）（#536）',
    file: 'tools/mutation-check.mjs',
    find: `    if (control.code !== 0) {
      report_control_failure('副本', control);`,
    replace: `    if (false && control.code !== 0) { // 变异：不看对照结果
      report_control_failure('副本', control);`,
    tests: ['mutation-check'],
    test_name:
      '串行档的副本对照即红时判红：副本缺文件不能让变异被当成拦截（#536）',
    must_mention: '副本环境破损必须判红',
  },

  // —— 子进程超时检查：扫描器跳过注释 ——
  {
    desc: 'M14220 扫描器不认行注释（注释里一个不成对的引号就让后面整段被当成字符串，缺 timeout 的调用漏报）',
    file: 'tools/child-process-timeout-check.mjs',
    find: "  if (text[i + 1] === '/') {",
    replace: '  if (false) { // 变异：不认行注释',
    tests: ['child-process-timeout-check'],
    test_name:
      '注释不是代码：注释里不成对的引号和提到的 spawnSync(...) 都不影响判定',
    must_mention: '只该报出第 8 行那一处',
  },
  {
    desc: 'M14221 扫描器不认块注释（注释里提到的 spawnSync(...) 被当成调用误报）',
    file: 'tools/child-process-timeout-check.mjs',
    find: "  if (text[i + 1] === '*') {",
    replace: '  if (false) { // 变异：不认块注释',
    tests: ['child-process-timeout-check'],
    test_name:
      '注释不是代码：注释里不成对的引号和提到的 spawnSync(...) 都不影响判定',
    must_mention: '只该报出第 8 行那一处',
  },
  {
    desc: 'M14222 配平调用实参时不跳过注释（实参里的注释带不成对引号，括号配不上，后面的调用全被跳过）',
    file: 'tools/child-process-timeout-check.mjs',
    find: '      const skip_in_call = comment_end(text, k);',
    replace: '      const skip_in_call = -1; // 变异：实参里不跳过注释',
    tests: ['child-process-timeout-check'],
    test_name:
      '注释不是代码：注释里不成对的引号和提到的 spawnSync(...) 都不影响判定',
    must_mention: '只该报出第 8 行那一处',
  },
];
