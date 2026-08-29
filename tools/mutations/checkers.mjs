// 变异条目表切片：tools/ 下的检查器与生成器自身（trace/domain/engine-contract/ownership/gen-facade/facade-names）。
// 字段与运行方式见 tools/mutation-check.mjs 头注释；新增/删除条目必须同步改
// 工具里的 LEDGER_COUNT_BASELINE（两项检查）。desc 里的 M 编号是历史惯性编号
// （M117 曾被两票撞号使用），只作引用锚点保留，不再人工分配。
export default [
  {
    desc: 'M94 ERB 完整性检查焊死（未登记引用不再红——探针用例必须抓到失明）',
    file: 'tools/trace-check.mjs',
    find: '    if (!registered?.has(ref) && !exempt.includes(ref)) {',
    replace:
      '    if (false && !registered?.has(ref) && !exempt.includes(ref)) {',
    tests: ['trace-check'],
    must_mention: '完整性检查对后来者失明',
  },
  {
    desc: 'M95 豁免清单偷偷变长（新条目必须撞基线锁）',
    file: 'tools/trace-exempt.mjs',
    find: "    '1076',",
    replace: "    '1076',\n    '999993',",
    tests: ['trace-check'],
    must_mention: '只能变短',
  },
  {
    desc: 'M96 锚校验：把 :53 的锚改错（FONTBOLD→FONTBOLDX，行号对但锚不命中）',
    file: 'tools/trace-check.mjs',
    find: "      { src: DRAW_MAINMENU, ref: '53', any: [/^FONTBOLD$/m] },",
    replace: "      { src: DRAW_MAINMENU, ref: '53', any: [/^FONTBOLDX$/m] },",
    tests: ['trace-check'],
    must_mention: '未命中任何锚',
  },
  {
    desc: 'M99 产物边界失效：所有权表永远强制重写（人工修改不再幸存）',
    file: 'tools/ownership-scan.js',
    find: `    reports.push(
      write_product(
        path.join(out_dir, \`\${key}-ownership.yml\`),
        result.tables.get(key).ownership_yaml,
        {
          force,
        },
      ),
    );`,
    replace: `    reports.push(
      write_product(
        path.join(out_dir, \`\${key}-ownership.yml\`),
        result.tables.get(key).ownership_yaml,
        { force: true },
      ),
    );`,
    tests: ['ownership-scan'],
    must_mention: '人工修改幸存',
  },
  {
    desc: 'M100 寻址段字符集退回 ASCII（名字下标与 CJK 槽位全丢——同步守护必须红）',
    file: 'tools/ownership-scan.js',
    find: 'const SEG = String.raw`(?:\\([^)]*\\)|[0-9A-Za-z_\\u3000-\\u30FF\\u3400-\\u4DBF\\u4E00-\\u9FFF\\uF900-\\uFAFF\\uFF00-\\uFFEF]+)`;',
    replace: 'const SEG = String.raw`(?:\\([^)]*\\)|[0-9A-Za-z_]+)`;',
    tests: ['ownership-scan'],
    must_mention: '逐字节一致',
  },
  {
    desc: 'M101 属主决胜反转：并列改取后声明者（tflag 夹具的 1:1 并列翻转）',
    file: 'tools/ownership-scan.js',
    find: '      if (count > best) {',
    replace: '      if (count >= best) {',
    tests: ['ownership-scan'],
    must_mention: '属主判定',
  },
  {
    desc: 'M102 跨域滤芯反接（只收属主自己的写入——清单测试必须红）',
    file: 'tools/ownership-scan.js',
    find: '          entry.index !== null &&\n          owner_of_index.get(entry.index) !== entry.domain,',
    replace:
      '          entry.index !== null &&\n          owner_of_index.get(entry.index) === entry.domain,',
    tests: ['ownership-scan'],
    must_mention: '跨域写入清单',
  },
  {
    desc: 'M128 词边界负向后行被砍（EX_CFLAG 的假写回流——词边界用例必须红）',
    file: 'tools/ownership-scan.js',
    find: "  return new RegExp(\n    `(?<![0-9A-Za-z_])(${alternation}):(${SEG}(?::${SEG})*)`,\n    'g',\n  );",
    replace:
      "  return new RegExp(\n    `(${alternation}):(${SEG}(?::${SEG})*)`,\n    'g',\n  );",
    tests: ['ownership-scan'],
    must_mention: '词边界',
  },
  {
    desc: "M117 字符串赋值 '= 不再算写入（CSTR 写形用例必须红）",
    file: 'tools/ownership-scan.js',
    find: "const ASSIGN_OP_RE = /^[ \\t]*([-+*/|&^']|<<|>>)?=[ \\t]*[^=]/;",
    replace: 'const ASSIGN_OP_RE = /^[ \\t]*([-+*/|&^]|<<|>>)?=[ \\t]*[^=]/;',
    tests: ['ownership-scan'],
    must_mention: '字符串赋值',
  },
  {
    desc: 'M129 后缀 ++/-- 不再算写入（ABL/MARK/CFLAG 自增丢失——写形用例必须红）',
    file: 'tools/ownership-scan.js',
    find: '    if (ASSIGN_OP_RE.test(rest) || POSTFIX_OP_RE.test(rest)) {',
    replace: '    if (ASSIGN_OP_RE.test(rest)) {',
    tests: ['ownership-scan'],
    must_mention: '后缀',
  },
  {
    desc: 'M130 TIMES 不再算写入（SOURCE 乘法赋值全丢——TIMES 用例必须红）',
    file: 'tools/ownership-scan.js',
    find: "  if (command === 'TIMES') {",
    replace: "  if (command === 'TIMES_NEVER') {",
    tests: ['ownership-scan'],
    must_mention: 'TIMES',
  },
  {
    desc: 'M131 VARSET 区间右端改包含（止端下标也写入——左闭右开用例必须红）',
    file: 'tools/ownership-scan.js',
    find: '      for (let i = Number(start); i < Number(end); i += 1) {',
    replace: '      for (let i = Number(start); i <= Number(end); i += 1) {',
    tests: ['ownership-scan'],
    must_mention: '左闭右开',
  },
  {
    desc: 'M132 名字下标不再归一（繁/日形态查不到表——归一用例必须红）',
    file: 'tools/ownership-scan.js',
    find: "const { to_simplified } = require('./lang-normalize');",
    replace: 'const { to_simplified } = { to_simplified: (x) => x };',
    tests: ['ownership-scan'],
    must_mention: '归一',
  },
  {
    desc: 'M133 跨域读判定反接（只统计本域读——同步守护与跨域读者锚点必须红）',
    file: 'tools/ownership-scan.js',
    find: '        if (reader !== owner) {\n          cross_total += count;',
    replace: '        if (reader === owner) {\n          cross_total += count;',
    tests: ['ownership-scan'],
    must_mention: '逐字节一致',
  },
  {
    desc: 'M134 ignored 文件不再跳过测量（TITLE.ERB 死代码写入回流——ignored 用例必须红）',
    file: 'tools/ownership-scan.js',
    find: '    if (rel.length === 1 && ignored.has(rel[0])) {\n      continue; // 死代码：引擎不装载，整体跳过\n    }',
    replace: '    void ignored;',
    tests: ['ownership-scan'],
    must_mention: 'ignored',
  },
  {
    desc: 'M135 ignored_files 存在性守卫被删（过期失效声明不再报错——过期失效用例必须红）',
    file: 'tools/ownership-scan.js',
    find: `  const missing_ignored = domains.ignored_files.filter(
    (name) => !root_files.includes(name),
  );
  if (missing_ignored.length > 0) {
    throw new Error(
      \`ignored_files 声明了不存在的文件：\${missing_ignored.join('、')}（数据过期失效，删掉或改对）\`,
    );
  }`,
    replace: '  void root_files;',
    tests: ['ownership-scan'],
    // #133 收紧：原值「声明了不存在的文件」在宿主已多处出现（文件级守卫
    // 用例同款文案），按 SOP 判据 3 换成用例名独有的片段
    must_mention: 'ignored 文件：整体跳过测量',
  },
  {
    desc: 'M136 未认领目录守卫被删（后来者不再自动纳入——未认领用例必须红）',
    file: 'tools/ownership-scan.js',
    find: `  const unclaimed = top_dirs.filter((dir) => !domains.dir_to_domain.has(dir));
  if (unclaimed.length > 0) {
    throw new Error(
      \`ERB 根下有未被域清单认领的一级目录：\${unclaimed.join('、')}（在 ownership/domains.yml 里给它们归属一个域）\`,
    );
  }`,
    replace: '  void top_dirs;',
    tests: ['ownership-scan'],
    must_mention: '未认领',
  },
  {
    desc: 'M235 文件级优先级反转：目录级先命中，files: 声明永不生效（#133 文件级用例必须红）',
    file: 'tools/ownership-scan.js',
    find: `    const domain_key =
      domains.file_to_domain.get(rel_posix) ??
      domains.dir_to_domain.get(rel[0]);`,
    replace: `    const domain_key =
      domains.dir_to_domain.get(rel[0]) ??
      domains.file_to_domain.get(rel_posix);`,
    tests: ['ownership-scan'],
    must_mention: 'files: 覆盖目录级',
  },
  {
    desc: 'M236 导出基线不再剔除目标目录（合租目录自己的票回流——循环论证复活，去偏用例必须红）',
    file: 'tools/ownership-scan.js',
    find: '  baseline.dir_to_domain.set(target_dir, EXPORT_EXCLUDED);',
    replace: '  // 变异：基线不剔除目标目录（兜底票回流）',
    tests: ['ownership-scan'],
    must_mention: '基线剔除目标目录',
  },
  {
    desc: 'M237 文件级存在性守卫被删（过期失效的文件级声明不再报错——文件级守卫用例必须红）',
    file: 'tools/ownership-scan.js',
    find: `  const missing_files = [...domains.file_to_domain.keys()].filter(
    (file) => !fs.existsSync(path.join(erb_root, ...file.split('/'))),
  );
  if (missing_files.length > 0) {
    throw new Error(
      \`域清单文件级声明了不存在的文件：\${missing_files.join('、')}（数据过期失效，删掉或改对）\`,
    );
  }`,
    replace: '  void domains;',
    tests: ['ownership-scan'],
    must_mention: '文件级守卫：声明的文件不存在',
  },
  {
    desc: 'M238 文件重复认领守卫跳过（同一文件两域声明不再报错——守卫用例必须红）',
    file: 'tools/ownership-scan.js',
    find: '      if (seen_files.has(file)) {',
    replace: '      if (seen_files.has(file) && false) {',
    tests: ['ownership-scan'],
    must_mention: '一个文件被两个域认领',
  },
  {
    desc: 'M239 域清单删一条文件级声明（FUNC_CLOTH 回落 system 兜底——同步守护必须红：改清单不重跑产物即失配）',
    file: 'ownership/domains.yml',
    find: '  files: 其他/FUNC_CLOTH.ERB\n',
    replace: '',
    tests: ['ownership-scan'],
    must_mention: '与重跑逐字节一致',
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
    desc: 'M173 锚点检查被拆（字面消失不红，引擎升版当天守护无声消失）',
    file: 'tools/engine-contract-check.mjs',
    find: '      if (!renderer_source.includes(anchor)) {',
    replace: '      if (false) { // 变异：锚点检查拆除',
    tests: ['engine-contract-check'],
    must_mention: '锚点失配',
  },
  {
    desc: 'M174 退出码语义被拆（失守也退 0——工具只会打印不会红）',
    file: 'tools/engine-contract-check.mjs',
    find: 'process.exit(run() === 0 ? 0 : 1);',
    replace: 'process.exit(0); // 变异：退出码语义拆除',
    tests: ['engine-contract-check'],
    must_mention: '锚点失配',
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
    desc: 'M177 锚点定位器退化成写死哈希文件名（渲染包换名即失明）',
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
    desc: 'M181 delta 属主裁定被改（train → system，切片落错域文件）',
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
    find: "  2: named('好感度', src(SRC_FLAG, ':261 CFLAG:2 主人による調教経験(好感度)')),",
    replace:
      "  3: named('好感度', src(SRC_FLAG, ':261 CFLAG:2 主人による調教経験(好感度)')),",
    tests: ['gen-facade'],
    must_mention: '好感度',
  },
  {
    desc: 'M286 引用前缀解析退回无前缀正则（#156：<样本名>-log:行号 被当裸引用核旧样本——静默错判的活体）',
    file: 'tools/trace-check.mjs',
    find: 'const LOG_REF_RE =\n  /([A-Za-z0-9]+(?:-[A-Za-z0-9]+)*-)?(?:emuera\\.)?log:(\\d+)(?:-(\\d+))?/g;',
    replace:
      'const LOG_REF_RE = /(?:emuera\\.)?log:(\\d+)(?:-(\\d+))?/g; // 变异：前缀捕获删除',
    tests: ['trace-check'],
    must_mention: '必须按完整前缀串报出',
  },
  {
    desc: 'M287 样本锚校验焊死（#156：样本内容漂移不再红——登记机制空转）',
    file: 'tools/trace-check.mjs',
    find: "      const lines = load_source(sample_rel);\n      const [a, b = a] = ref.split('-').map(Number);\n      const slice = lines.slice(a - 1, b).join('\\n');\n      if (!any.some((anchor) => anchor.test(slice))) {",
    replace:
      "      const lines = load_source(sample_rel);\n      const [a, b = a] = ref.split('-').map(Number);\n      const slice = lines.slice(a - 1, b).join('\\n');\n      if (false && !any.some((anchor) => anchor.test(slice))) { // 变异：样本锚校验焊死",
    tests: ['trace-check'],
    must_mention: '锚校验焊死的变异靠这条拦下',
  },
  {
    desc: 'M373 三处 asar 候选悄悄漂移一条（引擎定位在三个文件里各写一份，漂移的后果是静默降级而非报错）',
    file: 'tools/engine-contract-check.mjs',
    find: "    path.join(os.homedir(), '.era-engine', 'app.asar'),",
    replace:
      "    path.join(os.homedir(), '.era-engine-drifted', 'app.asar'), // 变异：候选漂移",
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

  // —— #212 返工三：二段寻址守卫的反向变异 ——
  {
    desc: 'M715 守卫表族清单摘掉 tequip（阳性对照当场红——守卫必须有牙）',
    file: 'test/chara-table-addressing.test.js',
    find: `  'tequip',
  'tcvar',`,
    replace: `  'tcvar',`,
    tests: ['chara-table-addressing'],
    must_mention: '守卫清单与期望名单不一致',
  },
];
