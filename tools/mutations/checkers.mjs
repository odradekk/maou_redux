// 变异条目表切片：tools/ 下的检查器与生成器自身（trace/domain/engine-contract/gen-facade/facade-names）。
// 字段与运行方式见 tools/mutation-check.mjs 头注释。desc 里的 M 编号不人工
// 分配，只作引用锚点，但全表必须唯一（#295；M117 曾被两票撞号，已改正）
// ——重号由 gate_shape 随 --verify 秒级核对。
/** 本分片条数（门 1）：增删条目必须同步改它，理由见 tools/mutation-check.mjs 头注 */
export const COUNT = 183; // #640 -24（区段扫描器条目块 19 条 + M2081/M286/M287/M9305/M9528 各随工具/机理删除）
// 更早的计数沿革见 git 历史（#640 起改为单行注记，旧多行注记随条目删除不再续写）。

export default [
  // —— #565 存根名 ↔ 清单状态核对 ——
  {
    desc: 'M11618 check_stub_names 放行已实现行（核对失明）',
    file: 'tools/trace-coverage.mjs',
    find: "    const kinds = statuses.map((s) => classify_status(s));\n    if (!kinds.some((k) => k === 'pending' || k === 'dead')) {",
    replace:
      '    const kinds = statuses.map((s) => classify_status(s));\n    if (true) {',
    tests: ['stub-registry-status'],
    must_mention: '已实现行、缺行都红',
  },
  {
    desc: 'M11619 收集器的注释过滤删除（jsdoc 引用字样误报回归）',
    file: 'tools/trace-coverage.mjs',
    // #565 返工起 try_kojo 收集器同款行出现两次，find 扩到正则行消歧义
    find: '  for (const m of text.matchAll(\n    /stub_line(?:_wait)?\\(\\s*([\'"`])([A-Za-z0-9_]+)\\1/gs,\n  )) {\n    if (!in_comment(m.index)) names.add(m[2]);',
    replace:
      '  for (const m of text.matchAll(\n    /stub_line(?:_wait)?\\(\\s*([\'"`])([A-Za-z0-9_]+)\\1/gs,\n  )) {\n    names.add(m[2]);',
    tests: ['stub-registry-status'],
    must_mention: 'jsdoc 里引用的字样不计',
  },
  {
    desc: 'M11620 @USERSHOP 行的 CALL 名提取删除（按编号登记的行对不上号）',
    file: 'tools/trace-coverage.mjs',
    find: "      if (is_usershop) {\n        for (const m of (cells[1] ?? '').matchAll(/CALL ([A-Za-z0-9_]+)/g)) {\n          put(m[1], status);\n        }\n      } else {",
    replace: '      if (!is_usershop) {',
    tests: ['stub-registry-status'],
    must_mention: '已实现函数的调用点不得再打占位',
  },
  {
    desc: 'M11627 名单解析的注释剥离删除（元素带注释即坏形，已实现名漏出）',
    file: 'tools/trace-coverage.mjs',
    find: "    .map((line) => line.replace(/\\/\\/[^\\n]*/, ''))",
    replace: '    // 变异：注释不剥，带注释的元素直接进 errors',
    tests: ['stub-registry-status'],
    must_mention: '元素前的注释剥掉再认',
  },
  {
    desc: 'M11628 名单坏形静默（errors 归零，解析不了的元素无人报）',
    file: 'tools/trace-coverage.mjs',
    find: '    else if (trimmed.length > 0) errors.push(trimmed);',
    replace: '    // 变异：坏形静默跳过',
    tests: ['stub-registry-status'],
    must_mention: '解析不了的元素必须进 errors',
  },
  {
    desc: 'M11629 收集器正则退回单引号（无插值模板串名漏收）',
    file: 'tools/trace-coverage.mjs',
    find: '    /stub_line(?:_wait)?\\(\\s*([\'"`])([A-Za-z0-9_]+)\\1/gs,',
    replace: "    /stub_line(?:_wait)?\\(\\s*'([A-Za-z0-9_]+)'/gs,",
    tests: ['stub-registry-status'],
    must_mention: '无插值模板串的 stub_line 名也要收',
  },
  {
    desc: 'M11630 冲突标记的行中形态识别删除（行尾尾巴重新失明）',
    file: 'tools/conflict-marker-check.mjs',
    find: '    if (INLINE_END_RE.test(line) || INLINE_START_RE.test(line)) {',
    replace: '    if (false) {',
    tests: ['conflict-marker-check'],
    must_mention: '行中标记必须红',
  },
  {
    desc: 'M11637 收集器的 try_kojo 写法失明（第二实参名收不到）',
    file: 'tools/trace-coverage.mjs',
    find: '    /try_kojo\\(\\s*[A-Za-z_$][\\w$]*\\s*,(?:\\s*\\/\\/[^\\n]*)?\\s*([\'"`])([A-Za-z0-9_]+)\\1/gs,',
    replace: `    /never_try_kojo_(\s*)/gs, // 变异：try_kojo 名收集失明`,
    tests: ['stub-registry-status'],
    must_mention: '第二实参名也收',
  },
  {
    desc: 'M11638 核对分流的 try_kojo 放行回退（已实现行误按 stub_line 规则红）',
    file: 'tools/trace-coverage.mjs',
    find: `    if (via === 'try_kojo') {\n      continue; // 找到行即放行（族集合的缺口由 kojo-family-coverage 拦）\n    }`,
    replace: '    // 变异：try_kojo 名也按 stub_line 规则判',
    tests: ['stub-registry-status'],
    must_mention: '不得按 stub_line 规则红',
  },
  {
    desc: 'M11643 try_kojo 收集器对 family 实参后的行尾注释失明（attack_koujo_b 的锚名漏收，#549）',
    file: 'tools/trace-coverage.mjs',
    find: '    /try_kojo\\(\\s*[A-Za-z_$][\\w$]*\\s*,(?:\\s*\\/\\/[^\\n]*)?\\s*([\'"`])([A-Za-z0-9_]+)\\1/gs,',
    replace:
      '    /try_kojo\\(\\s*[A-Za-z_$][\\w$]*\\s*,\\s*([\'"`])([A-Za-z0-9_]+)\\1/gs, // 变异：行尾注释形态失明',
    tests: ['stub-registry-status'],
    must_mention: 'family 实参带行尾注释的调用点，锚名也要收进核对',
  },
  // —— #513：内联 :N 的源绑定（trace-check）——
  {
    desc: 'M11060 B 侧源绑定失守（表侧错挂 src 不再点名——A 侧兜底拦下但 Y.ERB 断言必须红）',
    file: 'tools/trace-check.mjs',
    find: 'if (!occ.some((o) => o.src === null || o.src === src)) {',
    replace: 'if (false) {',
    tests: ['trace-check'],
    must_mention: '必须点名 :12-14 与错挂的 Y.ERB',
  },
  {
    desc: 'M11061 B 侧开放区宽放拆除（跨文件条目的开放区出现被拒——真树全绿必须红）',
    file: 'tools/trace-check.mjs',
    find: '(o) => o.src === null || o.src === src',
    replace: '(o) => o.src === src',
    tests: ['trace-check'],
    must_mention: 'trace-check 应全绿',
  },
  {
    desc: 'M11062 A 侧错绑判定短路（绑定区出现不再逐个核对——合成探针反例必须红）',
    file: 'tools/trace-check.mjs',
    find: 'if (bad.length === 0) continue;',
    replace: 'if (bad.length >= 0) continue;',
    tests: ['trace-check'],
    must_mention: '必须点名 :30-32 与它归属的 X.ERB',
  },
  {
    desc: 'M11063 对级登记键塌缩（pairs 集合只剩 ref——绑定区引用全部误报，真树必红）',
    file: 'tools/trace-check.mjs',
    find: 'new Set(refs.map((r) => `${r.src}\\u0000${r.ref}`)),',
    replace: 'new Set(refs.map((r) => `${r.src}\\u0000${r.ref}`.slice(6))),',
    tests: ['trace-check'],
    must_mention: 'trace-check 应全绿',
  },
  {
    desc: 'M11064 错绑基线过期核对失守（消化后忘删的条目不再红——基线用例必须报出规则自己的报错文案，只报条目总数上界不算）',
    file: 'tools/trace-check.mjs',
    find: 'if (misbind_seen.has(misbind_key(rel, src, ref))) {',
    replace: 'if (true) {',
    tests: ['trace-check'],
    must_mention: '过期规则没有开火',
  },
  {
    desc: 'M11065 B 侧基线内错绑也报红（存量冻结失效——真树 286 条全打，全绿用例必红）',
    file: 'tools/trace-check.mjs',
    find: 'return !(SRC_MISBIND_BASELINE[js] ?? []).includes(`${src}|${ref}`);',
    replace: 'return true;',
    tests: ['trace-check'],
    must_mention: 'trace-check 应全绿',
  },
  {
    desc: 'M11066 B 侧无出现不再退回 ref_re 兜底（路径限定/区间前缀条目被误杀，真树必红）',
    file: 'tools/trace-check.mjs',
    find: "const ref_re = new RegExp(`:${ref.replace('-', '-')}(?!\\\\d)`);",
    replace: 'const ref_re = /x^/;',
    tests: ['trace-check'],
    must_mention: 'trace-check 应全绿',
  },
  {
    desc: 'M11067 行注释窄段覆盖到文件尾（kojo-k903 的 K902 段吞掉后续段落——真树必红）',
    file: 'tools/trace-check.mjs',
    find: 'end: Math.min(l, lines.length - 1),',
    replace: 'end: lines.length - 1,',
    tests: ['trace-check'],
    must_mention: 'trace-check 应全绿',
  },
  {
    desc: 'M11068 A 侧开放区宽放拆除（同 ref 混合出现被误杀——真树必红）',
    file: 'tools/trace-check.mjs',
    find: 'if (has_open && registered?.has(ref)) continue;',
    replace: 'if (false) continue;',
    tests: ['trace-check'],
    must_mention: 'trace-check 应全绿',
  },
  {
    desc: 'M11069 错绑基线上界核对失守（新错绑塞进基线不再红——上界探针必须抓到）',
    file: 'tools/trace-check.mjs',
    find: 'if (misbind_baseline_total > SRC_MISBIND_BASELINE_COUNT) {',
    replace:
      'if (false && misbind_baseline_total > SRC_MISBIND_BASELINE_COUNT) {',
    tests: ['trace-check'],
    must_mention: '只有条目总数上界能拦',
  },
  {
    desc: 'M94 ERB 完整性检查焊死（未登记引用不再红——探针用例必须抓到失明）',
    file: 'tools/trace-check.mjs',
    find: '    } else if (!registered?.has(ref) && !exempt.includes(ref)) {',
    replace:
      '    } else if (false && !registered?.has(ref) && !exempt.includes(ref)) {',
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
    file: 'tools/trace-refs/page-main-menu.mjs',
    find: '        any: [/^FONTBOLD$/m],',
    replace: '        any: [/^FONTBOLDX$/m],',
    tests: ['trace-check'],
    must_mention: '未命中任何锚',
  },
  // M99-M239（区段扫描器与跨域写清单的 19 条）随工具删除（#640）。
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
    desc: 'M174 失守语义被拆（failures 归零——工具只会打印不会红，#449 改同进程调用后靶点随 run() 的返回值挪，不再是 CLI 退出码）',
    file: 'tools/engine-contract-check.mjs',
    find: "return { failures, output: lines.join('\\n') };",
    replace:
      "return { failures: 0, output: lines.join('\\n') }; // 变异：失守语义拆除",
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
  // M286（前缀引用解析焊死）随前缀校验机移除、探针用例删除（#640）。
  // M287（样本锚校验焊死）随样本机理从 trace-check 移除、探针用例删除（#640）。
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

  // —— #256 引擎声明的两道核对 ——
  // 全量变异退到阶段闸之后，ENGINE_SKIP_BASELINE 的漂移一个阶段才暴露
  // （#135 的 M222 漏抬就是这么连红 18 次 4 天的）。补偿是门 4（静态声明
  // 数，随 npm test 每次都查）与 run_one 的逐条交叉核对。两道各钉一条。
  {
    desc: 'M733 ENGINE_SKIP_BASELINE 抬到 27（声明数与基线分家——门 4 若失守，这一类漂移要一个阶段才暴露）',
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
  // M2081（靶 test/kojo-text-fidelity.test.js）随保真锁删除（#640）。
  {
    desc: 'M2137 锚表加载器按文件名黑名单跳过新分片（probe 新文件不再入账——#290 目录扫描的存在理由）',
    file: 'tools/trace-refs-load.mjs',
    find: "    .filter((n) => n.endsWith('.mjs'))",
    replace: "    .filter((n) => n.endsWith('.mjs') && !n.includes('probe'))",
    tests: ['trace-check'],
    must_mention: '新分片必须被加载器扫到并让工具全绿',
  },
  {
    desc: 'M2138 加载器丢掉分片的 FILES（新模块锚表写了也不进汇总——#290 入账路径空转）',
    file: 'tools/trace-refs-load.mjs',
    find: '    FILES.push(...mod.FILES);',
    replace: "    if (!name.includes('probe')) FILES.push(...mod.FILES);",
    tests: ['trace-check'],
    must_mention: '新分片必须被加载器扫到并让工具全绿',
  },
  {
    desc: 'M2139 加载器丢掉分片的 SAMPLE_LOG_REFS（样本前缀登记走新分片不再入账——#156/#290 登记机制空转）',
    file: 'tools/trace-refs-load.mjs',
    find: '      bucket.push(...groups);',
    replace: "      if (!name.includes('probe')) bucket.push(...groups);",
    tests: ['trace-check'],
    must_mention: '登记后的样本前缀引用必须让工具全绿',
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
    desc: 'M2700 鉴别力门焊死（新弱锚不再按文件报出——ENDIF 探针必须抓到失明）（#298）',
    file: 'tools/trace-check.mjs',
    find: 'if (overflowing.length > 0) {',
    replace: 'if (false && overflowing.length > 0) { // 变异：鉴别力门焊死',
    tests: ['trace-check'],
    must_mention: '鉴别力检查对弱锚失明',
  },
  {
    desc: 'M2701 鉴别力基线核对焊死（改小一位不再红——只减不增不在退出码语义里）（#298）',
    file: 'tools/trace-check.mjs',
    find: 'if (FROZEN_WEAK_SUM > ANCHOR_QUALITY_BASELINE) {',
    replace:
      'if (false && FROZEN_WEAK_SUM > ANCHOR_QUALITY_BASELINE) { // 变异：基线核对焊死',
    tests: ['trace-check'],
    must_mention: '基线改小一位必须非 0',
  },
  {
    desc: 'M2702 鉴别力分类一律当唯一（ENDIF 命中多处也放行——门必须非 0）（#298）',
    file: 'tools/trace-check.mjs',
    find: "  if (n <= 1) return { kind: 'unique', hits: n || 1 };",
    replace:
      "  if (true) return { kind: 'unique', hits: n || 1 }; // 变异：分类一律唯一",
    tests: ['trace-check'],
    must_mention: '鉴别力检查对弱锚失明',
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
    desc: 'M2741 prettier 洗净形态识别被拆（七个空格隔开的大于号不再报——只认原始形态等于没修）',
    file: 'tools/conflict-marker-check.mjs',
    find: "      hits.push({ kind: 'prettier 洗净', line: i + 1, text: line.trim() });",
    replace: '      // 变异：prettier 洗净形态不再报',
    tests: ['conflict-marker-check'],
    must_mention: 'prettier 洗净后仍须红——只认原始形态等于没修',
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
    desc: 'M3706 --only 的范围过滤被拆（每个探针退回全量跑一遍——提速没了，判定却照旧红绿，只有范围外用例抓得住）',
    file: 'tools/trace-check.mjs',
    find: '  if (!in_scope(js)) continue;',
    replace: '  // 变异：FILES 遍历不再按 --only 过滤',
    tests: ['trace-check'],
    must_mention: '范围限定在 K903，不该被核到',
    // must_mention 是断言消息不是用例名；不点名用例，这条会跑整份
    // trace-check.test.js——而它正好把提速拆了，那份文件退回 11 分钟。
    test_name: '--only 只核范围内的文件：范围外的坏引用不报，范围内的必须报',
  },
  {
    desc: 'M3707 限定范围的绿不再自报范围（一次 --only 的绿会被当成全量绿引用）',
    file: 'tools/trace-check.mjs',
    find: `const scope_note =
  ONLY.length === 0
    ? ''
    : \`（本次限定范围：--only \${ONLY.join(',')}，不等于全量绿）\`;`,
    replace: "const scope_note = '';",
    tests: ['trace-check'],
    must_mention: '限定范围的报告行必须自报范围',
    test_name: '--only 的绿必须自报范围：不许被当成全量绿引用',
  },
  {
    desc: 'M3708 --only 缺值不再报错（静默退化成全量，人以为限了范围其实没限）',
    file: 'tools/trace-check.mjs',
    find: '  if ((inline || i >= 0) && parts.length === 0) {',
    replace: '  if (false) {',
    tests: ['trace-check'],
    must_mention: '--only 缺值必须退 1，实际',
    test_name: '--only 不给值时当场报错退 1，不静默变成全量',
  },
  {
    desc: 'M3709 串行档不再让出事件循环（SIGINT 排队到跑完才派发，中断时靶文件停在变异态）',
    file: 'tools/mutation-check.mjs',
    find: '    await new Promise((resolve) => setImmediate(resolve));',
    replace: '    // 变异：串行档不让出事件循环',
    tests: ['mutation-check'],
    must_mention: '信号会一直排队到跑完',
    test_name: 'SIGINT 能中断串行档，并把靶文件还原',
  },
  {
    desc: 'M6507 已判定不实现表失效（七文件落到证据类——真树用例的裁定断言必须红）',
    file: 'tools/trace-coverage.mjs',
    find: "    if (ruled.has(f)) categories['已判定不实现'].push(f);",
    replace:
      "    if (false && ruled.has(f)) categories['已判定不实现'].push(f);",
    tests: ['trace-check'],
    test_name: '移植状态表全绿',
    must_mention: '已判定不实现表必须生效',
  },
  {
    desc: 'M6508 纯声明改成大小写敏感（小写 .erh 落待移植——分母 346 的前提被破坏）',
    file: 'tools/trace-coverage.mjs',
    find: "    else if (/\\.erh$/i.test(f)) categories['纯声明'].push(f);",
    replace: "    else if (/\\.ERH$/.test(f)) categories['纯声明'].push(f);",
    tests: ['trace-check'],
    test_name: '移植状态表全绿',
    must_mention: '大小写不敏感计 .erh',
  },
  {
    desc: 'M6509 yml 承载规则焊死（8 个 EX_TALENT 空壳退回待移植——#331 误报规则 2 失守）',
    file: 'tools/trace-coverage.mjs',
    find: "      return (\n        m !== null && fs.existsSync(path.join(repo, 'yml', `Chara${m[1]}.yml`))\n      );",
    replace:
      "      return (\n        false &&\n        m !== null &&\n        fs.existsSync(path.join(repo, 'yml', `Chara${m[1]}.yml`))\n      );",
    tests: ['trace-check'],
    test_name: '移植状态表全绿',
    must_mention: 'yml 承载的 EX_TALENT 空壳必须计已移植',
  },
  {
    desc: 'M6510 范围式引用展开短路（词干核对恒假——COMF31-38 退回待移植，#331 误报规则 1 失守）',
    file: 'tools/trace-coverage.mjs',
    find: '        mb[2] !== stem ||',
    replace: "        mb[2] !== stem + 'X' ||",
    tests: ['trace-check'],
    test_name: '移植状态表全绿',
    must_mention: '范围式引用必须展开',
  },
  {
    desc: 'M6511 未了结归因焊死（存根行不再算欠账——部分移植一律漏成已移植；#541 起「未了结」只有 is_outstanding 一条判据，靶行随之改到这里）',
    file: 'tools/trace-coverage.mjs',
    find: '  return status.startsWith(STATUS_PENDING);',
    replace: '  return false; // 变异：未了结归因焊死',
    tests: ['trace-check'],
    test_name: 'yml 承载与存根归因',
    must_mention: '存根归因必须把未了结项记成部分移植',
  },
  {
    desc: 'M6512 死标记黑名单清空（判死行被当成欠账——带死分支的已移植文件永远卡在部分移植；#541 起死标记由 classify_status 认词、欠账由 is_outstanding 认「存根」，靶行改到后者）',
    file: 'tools/trace-coverage.mjs',
    find: '  return status.startsWith(STATUS_PENDING);',
    replace:
      '  return (\n    status.startsWith(STATUS_PENDING) ||\n    DEAD_MARKERS.some((w) => status.startsWith(w))\n  ); // 变异：死标记行也算欠账',
    tests: ['trace-check'],
    test_name: 'yml 承载与存根归因',
    must_mention: '判死登记不是欠账',
  },
  {
    desc: 'M6513 分母漂移校验焊死（target/ERB 增删文件不再红——#329 裁定 3 的写死分母失效）',
    file: 'tools/trace-coverage.mjs',
    find: '  if (!scoped && files.length !== DENOMINATOR) {',
    replace: '  if (false && !scoped && files.length !== DENOMINATOR) {',
    tests: ['trace-check'],
    test_name: '分母漂移与已判定表悬空',
    must_mention: '必须报出分母漂移与实测数',
  },
  {
    desc: 'M6514 待移植基线校验焊死（只减不增不在退出码语义里——证据面静默失效无人拦）',
    file: 'tools/trace-coverage.mjs',
    find: "  if (!scoped && categories['待移植'].length > PENDING_BASELINE) {",
    replace:
      "  if (false && !scoped && categories['待移植'].length > PENDING_BASELINE) {",
    tests: ['trace-check'],
    test_name: '待移植基线只减不增',
    must_mention: '待移植基线改小一位必须红',
  },
  {
    desc: 'M6515 证据悬空校验焊死（拼错路径的移植声明静默放行——对应文件假性待移植）',
    file: 'tools/trace-coverage.mjs',
    find: `      fail(
        \`✗ 证据悬空：\${m.rel} 注释提及 \${m.path}，但该文件不存在（拼错路径的移植声明等于没声明）\`,
      );`,
    replace: '      /* 焊死 */',
    tests: ['trace-check'],
    test_name: '证据悬空即红',
    must_mention: '拼错路径的移植声明等于没声明',
  },
  {
    desc: 'M6516 提及证据剔出判定（注释块提及不再算证据——文件整批退回待移植，只有基线能拦）',
    file: 'tools/trace-coverage.mjs',
    find: `    else if (
      src_evidence.has(f) ||
      mention_evidence.has(f) ||
      range_evidence.has(f)
    ) {`,
    replace: '    else if (src_evidence.has(f) || range_evidence.has(f)) {',
    tests: ['trace-check'],
    test_name: '移植状态表全绿',
    must_mention: '不得超出基线',
  },
  {
    desc: 'M6517 --only 作用域失效（限定模式当全量跑——分母核对对残缺副本开火，探针没法用）',
    file: 'tools/trace-coverage.mjs',
    find: '  const scoped = only.length > 0;',
    replace: '  const scoped = false;',
    tests: ['trace-check'],
    test_name: '限定范围跳过全局核对',
    must_mention: '限定范围必须跳过分母核对',
  },
  {
    desc: 'M6518 已判定表悬空校验焊死（表项文件消失不报——裁定被 target/ 变动架空无人知）',
    file: 'tools/trace-coverage.mjs',
    find: '    if (!files_set.has(r.path) && (!scoped || in_scope(r.path))) {',
    replace:
      '    if (false && !files_set.has(r.path) && (!scoped || in_scope(r.path))) {',
    tests: ['trace-check'],
    test_name: '分母漂移与已判定表悬空',
    must_mention: '表项文件消失必须点名报出',
  },
  {
    desc: 'M6519 --coverage 接线断开（落回锚校验——状态表用例拿不到输出形状）',
    file: 'tools/trace-check.mjs',
    find: "if (process.argv.includes('--coverage')) {",
    replace: "if (false && process.argv.includes('--coverage')) {",
    tests: ['trace-check'],
    test_name: '移植状态表全绿',
    must_mention: '必须输出移植状态表',
  },
  {
    desc: 'M6520 清单行形态判据退化（拆格不再 trim——「|`FN`|」无空格形态与列名的空白一起读歪，欠账被静默跳过；#541 起两种管道符形态由 split_row_cells 的 trim 统一承担，靶行随之改到这里）',
    file: 'tools/trace-coverage.mjs',
    find: '    .map((c) => c.trim());',
    replace: '    .map((c) => c); // 变异：拆格不 trim',
    tests: ['trace-check'],
    test_name: 'yml 承载与存根归因',
    must_mention: '存根清单状态词不在三类里',
  },
  {
    desc: 'M6521 归因不到基线校验焊死（静默多出的归因不到行无人拦——未了结被漏成已实现的方向；#541 把基线降到 0 后，探针从「把基线改小一位」改成「往清单里多写一行归因不到」，靶行不变）',
    file: 'tools/trace-coverage.mjs',
    find: '  if (!scoped && unattributed > UNATTRIBUTED_BASELINE) {',
    replace:
      '  if (false && !scoped && unattributed > UNATTRIBUTED_BASELINE) {',
    tests: ['trace-check'],
    test_name: '归因不到行数基线',
    must_mention: '多一行归因不到必须红',
  },
  {
    desc: 'M7806 cite 标记失效（锚表 src 不论 cite 一律计入移植证据——只被引用的文件被误判已移植，#382）',
    file: 'tools/trace-coverage.mjs',
    find: '          if (!cite) src_evidence.add(src);',
    replace: '          src_evidence.add(src); // 变异：cite 判定失效',
    tests: ['trace-check'],
    test_name:
      '移植状态表：`cite` 标记的锚只验证正文，不构成移植证据（#382）——合成样本验证区分能力',
    must_mention: '只被 cite 标记引用的文件必须判待移植',
  },
  {
    desc: 'M7807 cite 字段不再解构（锚表条目的 cite 恒 undefined——即使显式标了 cite: true 也当普通证据算，#382）',
    file: 'tools/trace-coverage.mjs',
    find: '    for (const { src, cite } of refs) {',
    replace:
      '    for (const { src } of refs) {\n      const cite = undefined; // 变异：cite 恒 undefined',
    tests: ['trace-check'],
    test_name:
      '移植状态表：`cite` 标记的锚只验证正文，不构成移植证据（#382）——合成样本验证区分能力',
    must_mention: '只被 cite 标记引用的文件必须判待移植',
  },
  {
    desc: 'M9301 扫描面塌掉一整块（ere/kojo/ 不再进完整性扫描——全量跑法先被 #513 的基线条目过期拦下，扫描面本身由「单独跑一个口上文件时完整性计数不得为 0」正面锁住，#431/#538）',
    file: 'tools/trace-check.mjs',
    find: "for (const rel of list_js_files('ere')) {",
    replace:
      "for (const rel of list_js_files('ere').filter((r) => !r.includes('/kojo/'))) {",
    tests: ['trace-check'],
    test_name:
      '#431 扫描面：单独跑一个口上文件时完整性计数不得为 0（ere/kojo/ 必须在面内）',
    must_mention: '扫描面塌陷',
  },
  {
    desc: 'M9302 锚表行数不再累加（FILES 循环的 checked 恒不加——报告里的 inline 只剩日志锚，引用一条不少，#431）',
    file: 'tools/trace-check.mjs',
    find: '    checked += 1;\n    const label = `${js} :${ref} ↔ ${src}`;',
    replace:
      '    checked += 0; // 变异：锚表行数不再累加\n    const label = `${js} :${ref} ↔ ${src}`;',
    tests: ['trace-check'],
    test_name:
      'trace-check 全绿（锚校验 + 两侧扫描完整性 + 豁免核对，退出码 0）',
    must_mention: '两侧引用数不同量级',
  },
  {
    desc: 'M9303 量级判据退回比大小（差额必须为 0——#399 那一对重新翻车，#431）',
    file: 'test/trace-check.test.js',
    find: 'Math.abs(inline - erb) * 100 <= Math.max(inline, erb)',
    replace: 'inline === erb',
    tests: ['trace-check'],
    test_name: '引用数判据（#431）：#399 实测的那一对必须放行，整块塌陷必须红',
    must_mention: '引用数判据边界失守',
  },
  {
    desc: 'M9304 豁免过期失效检查焊死（引用被删的豁免条目不再报——#431 补的探针用例必须红）',
    file: 'tools/trace-check.mjs',
    find: '  for (const ref of exempt) {\n    if (!found.has(ref)) {',
    replace:
      '  for (const ref of exempt) {\n    if (false) { // 变异：过期失效检查焊死',
    tests: ['trace-check'],
    test_name: '豁免条目不许过期失效：对应的 js 引用被删，工具必须红且点名',
    must_mention: '不许过期失效',
  },
  // M9305（样本锚表守卫焊死）随样本机理从 trace-check 移除、探针用例删除（#640）。
  {
    desc: 'M9306 完整性扫描拆掉 --only 过滤（范围外的未登记引用也被报出——#431 补的探针用例必须红）',
    file: 'tools/trace-check.mjs',
    find: '  if (!in_scope(rel)) continue;\n  // #513：扫描换成带源归属的出现明细',
    replace:
      '  // 变异：完整性扫描不再按 --only 过滤\n  // #513：扫描换成带源归属的出现明细',
    tests: ['trace-check'],
    test_name:
      '探针：往 ere/ 塞未登记引用的模块，trace-check 必须红且报出位置（自动纳入后来者）',
    must_mention: '范围外的未登记引用不该被报出',
  },

  // —— #442：门 5（must_mention 出处检查）自身的十条自证 ——
  // 前四条（M9519/M9520/M9526/M9527）让门 5 对自证条目（GOOD_ENTRY 改
  // must_mention）整体失明，靠 test/mutation-check.test.js 的门 5 自证用例
  // 抓：拆掉后自证条目不再报错，退出码由非 0 回到 0。后六条改门 5 的搜索
  // 范围与匹配算法，影响的是全表 5294 条真实条目，靠「快速模式全绿」用例
  // 抓：全表量测数据见 issue #442（tools/measure-must-mention.mjs 产出）。
  {
    desc: 'M9519 门 5 的接线被删（run_gates 不再调用 gate_must_mention_source，自证条目重新变绿）（#442）',
    file: 'tools/mutation-check.mjs',
    find: `    ...gate_engine_declared(entries, args),
    ...gate_must_mention_source(args.root, entries),
  ];`,
    replace: `    ...gate_engine_declared(entries, args),
  ];`,
    tests: ['mutation-check'],
    test_name:
      'must_mention 出处门（#442）：出处在 tests:/file:/era-fixture.js 里都找不到 → 退出码 1',
    must_mention: '找不到出处必须非 0，实际退出',
  },
  {
    desc: 'M9520 豁免检查焊死（EXEMPT_MUST_MENTION 判定恒真，任何条目都被当成已豁免直接跳过）（#442）',
    file: 'tools/mutation-check.mjs',
    find: `    const num = extract_m_number(m.desc);
    if (num !== null && EXEMPT_MUST_MENTION.has(num)) {
      continue;
    }`,
    replace: `    const num = extract_m_number(m.desc);
    if (true) {
      continue; // 变异：豁免检查焊死，全部条目直接跳过
    }`,
    tests: ['mutation-check'],
    test_name:
      'must_mention 出处门（#442）：出处在 tests:/file:/era-fixture.js 里都找不到 → 退出码 1',
    must_mention: '找不到出处必须非 0，实际退出',
  },
  {
    desc: 'M9526 早退条件焊死（每条 must_mention 都跳过校验，等于门 5 整体失明）（#442）',
    file: 'tools/mutation-check.mjs',
    find: `  for (const m of entries) {
    if (typeof m.must_mention !== 'string' || !m.must_mention) {
      continue; // gate_shape 已经报过缺 must_mention，这里不重复报
    }`,
    replace: `  for (const m of entries) {
    if (true) {
      continue; // 变异：早退条件焊死，跳过全部条目
    }`,
    tests: ['mutation-check'],
    test_name:
      'must_mention 出处门（#442）：出处在 tests:/file:/era-fixture.js 里都找不到 → 退出码 1',
    must_mention: '找不到出处必须非 0，实际退出',
  },
  {
    desc: 'M9527 找不到出处不再报错（found 为 false 时 errors 也不推入，判定结果被吞）（#442）',
    file: 'tools/mutation-check.mjs',
    find: `    const found = sources.some((c) => must_mention_found(c, m.must_mention));
    if (!found) {`,
    replace: `    const found = sources.some((c) => must_mention_found(c, m.must_mention));
    if (false) { // 变异：出处缺失不再报错`,
    tests: ['mutation-check'],
    test_name:
      'must_mention 出处门（#442）：出处在 tests:/file:/era-fixture.js 里都找不到 → 退出码 1',
    must_mention: '找不到出处必须非 0，实际退出',
  },
  {
    desc: 'M9521 搜索范围丢弃 tests:（真实条目的出处几乎全在断言消息里，量测实测新增 1908 条未命中）（#442）',
    file: 'tools/mutation-check.mjs',
    find: `    const sources = (Array.isArray(m.tests) ? m.tests : [])
      .map((t) => read(\`test/\${t}.test.js\`))
      .concat([
        typeof m.file === 'string' ? read(m.file) : null,
        fixture_content,
      ])
      .filter((c) => c !== null);`,
    replace: `    const sources = [
      typeof m.file === 'string' ? read(m.file) : null,
      fixture_content,
    ].filter((c) => c !== null); // 变异：丢弃 tests: 来源`,
    tests: ['mutation-check'],
    test_name:
      '快速模式全绿：--verify 退出码 0（五项检查进 npm test，变异检查的自动执行点）',
    must_mention: '应全绿，实际退出',
  },
  {
    desc: 'M9522 搜索范围丢弃 file:（量测实测新增 121 条未命中——靶文件里定义、断言消息里只引用变量的出处会漏掉）（#442）',
    file: 'tools/mutation-check.mjs',
    find: `    const sources = (Array.isArray(m.tests) ? m.tests : [])
      .map((t) => read(\`test/\${t}.test.js\`))
      .concat([
        typeof m.file === 'string' ? read(m.file) : null,
        fixture_content,
      ])
      .filter((c) => c !== null);`,
    replace: `    const sources = (Array.isArray(m.tests) ? m.tests : [])
      .map((t) => read(\`test/\${t}.test.js\`))
      .concat([fixture_content]) // 变异：丢弃 file: 来源
      .filter((c) => c !== null);`,
    tests: ['mutation-check'],
    test_name:
      '快速模式全绿：--verify 退出码 0（五项检查进 npm test，变异检查的自动执行点）',
    must_mention: '应全绿，实际退出',
  },
  {
    desc: 'M9523 搜索范围丢弃 era-fixture.js（量测实测新增 3 条未命中——共用夹具里定义的出处会漏掉）（#442）',
    file: 'tools/mutation-check.mjs',
    find: `    const sources = (Array.isArray(m.tests) ? m.tests : [])
      .map((t) => read(\`test/\${t}.test.js\`))
      .concat([
        typeof m.file === 'string' ? read(m.file) : null,
        fixture_content,
      ])
      .filter((c) => c !== null);`,
    replace: `    const sources = (Array.isArray(m.tests) ? m.tests : [])
      .map((t) => read(\`test/\${t}.test.js\`))
      .concat([typeof m.file === 'string' ? read(m.file) : null]) // 变异：丢弃 era-fixture.js 来源
      .filter((c) => c !== null);`,
    tests: ['mutation-check'],
    test_name:
      '快速模式全绿：--verify 退出码 0（五项检查进 npm test，变异检查的自动执行点）',
    must_mention: '应全绿，实际退出',
  },
  {
    desc: 'M9524 逐字快速通道被删（must_mention_found 只走模板匹配——量测实测新增 1796 条未命中，绝大多数出处根本不在模板字面量里）（#442）',
    file: 'tools/mutation-check.mjs',
    find: `function must_mention_found(content, must_mention) {
  if (content.includes(must_mention)) return true;
  return template_literal_segments(content).some((segs) =>
    matches_template(segs, must_mention),
  );
}`,
    replace: `function must_mention_found(content, must_mention) {
  return template_literal_segments(content).some((segs) =>
    matches_template(segs, must_mention),
  ); // 变异：逐字快速通道被删，全部走模板匹配
}`,
    tests: ['mutation-check'],
    test_name:
      '快速模式全绿：--verify 退出码 0（五项检查进 npm test，变异检查的自动执行点）',
    must_mention: '应全绿，实际退出',
  },
  {
    desc: 'M9525 模板字面段匹配被拆（must_mention_found 只剩逐字——量测实测新增 508 条未命中，即门 5 全表复核时最终豁免清单的由来）（#442）',
    file: 'tools/mutation-check.mjs',
    find: `function must_mention_found(content, must_mention) {
  if (content.includes(must_mention)) return true;
  return template_literal_segments(content).some((segs) =>
    matches_template(segs, must_mention),
  );
}`,
    replace: `function must_mention_found(content, must_mention) {
  if (content.includes(must_mention)) return true;
  return false; // 变异：模板字面段匹配被拆
}`,
    tests: ['mutation-check'],
    test_name:
      '快速模式全绿：--verify 退出码 0（五项检查进 npm test，变异检查的自动执行点）',
    must_mention: '应全绿，实际退出',
  },
  // M9528（豁免键 92 打错）随 M92 条目删除（#640）。
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
  {
    desc: 'M10900 存根清单过时行普查失效（GET_ADV_COM 行退回「部分实现」——行级状态守卫先红，COMF_JUMP.ERB 也会被卡回部分移植，#501）',
    file: 'docs/stub-registry.md',
    find: '已实现（#501 普查订正）——21 个 CASE 与 COMF_JUMP.ERB 全同',
    replace: '部分实现（变异）——21 个 CASE 与 COMF_JUMP.ERB 全同',
    tests: ['trace-check'],
    test_name:
      '存根清单普查（#501）：已做完的行转「已实现」，名下文件随之离开部分移植',
    must_mention: '的状态格仍是未了结项',
  },
  {
    desc: 'M10901 存根清单过时行普查失效（COM64 升格目标行抹掉注册点——#501 的勘误证据被删）',
    file: 'docs/stub-registry.md',
    find: '本体 com-assistant.js:1317 的 com64、注册点 com-assistant.js:2676 的 com_family.register(64, com64)',
    replace: '本体 com-assistant.js:1317 的 com64',
    tests: ['trace-check'],
    test_name:
      '存根清单普查（#501）：已做完的行转「已实现」，名下文件随之离开部分移植',
    must_mention: '行必须写清 com-assistant.js:2676',
  },
  {
    desc: 'M10902 存根清单过时行普查失效（@USERSHOP 行的状态格退回裸壳名——行级守卫必须点名末格，#501；#541 起状态进末格，靶串随行文改写）',
    file: 'docs/stub-registry.md',
    find: '已实现（#397：ere/page/page-intercept.js intercept；page-shop.js:336 分支已接真身）',
    replace: 'INTERCEPT',
    tests: ['trace-check'],
    test_name:
      '存根清单普查（#501）：已做完的行转「已实现」，名下文件随之离开部分移植',
    must_mention: '的末格不是标准状态词',
  },
  {
    desc: 'M10903 存根清单过时行普查失效（K 口上行的欠账点名被删——K2/K4 的真身与状态必须留在行里，#501/#514）',
    file: 'docs/stub-registry.md',
    find: '（K2/K4 的真身 kojo-k2-timid.js:10327/10395、kojo-k4-stoic.js:5616/5674 自 #514 起接上）',
    replace: '（K2/K4 已接上）',
    tests: ['trace-check'],
    test_name:
      '存根清单普查（#501）：已做完的行转「已实现」，名下文件随之离开部分移植',
    must_mention: '行必须写清 kojo-k2-timid.js:10327',
  },
  {
    desc: 'M11111 登记表判死措辞退回存根（DUNGEON_BATTLE 行——原作全库无定义，退回未了结形态即红，#515）',
    file: 'docs/stub-registry.md',
    find: '不实现（不可达的调用目标——原作全库无定义，ere 侧留中性占位，见 ere/dungeon/labo-dungeon-map.js；判据与依据见 issue #181，#14 缺陷登记）',
    replace: '存根（ere/dungeon/labo-dungeon-map.js，判据与依据见 issue #181）',
    tests: ['trace-check'],
    test_name: '存根清单收尾（#515）',
    must_mention: 'LABO_DUNGEON_MAP.ERB 会被这条行卡在部分移植',
  },
  {
    desc: 'M11112 登记表判死措辞退回存根（AGENT_MENU 行——#103 的裁定是不实现，退回「存根」即被计成欠账，#515）',
    file: 'docs/stub-registry.md',
    find: '不实现（#103 裁定：原作的复制改名事故，只登记不排期——本体不移植；ere/page/page-invasion.js 的调用点保留运行时占位；裁定见 issue #103；#515 订正措辞，#103 裁定不变）',
    replace:
      '存根（运行时占位，ere/page/page-invasion.js；调用点已接通，主体不实现——#103 裁定的复制改名事故，只登记不排期）',
    tests: ['trace-check'],
    test_name: '存根清单收尾（#515）',
    must_mention: 'AGENT_MENU 的状态格仍是未了结形态',
  },
  {
    desc: 'M11113 登记表过期说法退回（ABILITY_UP_CORE 行重写「37-100 仍是存根」——#467 起五个编号已落真身，#515）',
    file: 'docs/stub-registry.md',
    find: '37/39/40/99/100（#467），见 ere/system/train/ablup.js 文件头）',
    replace: '37-100 仍是存根，见 `ABLUP0`～`ABLUP100` 行）',
    tests: ['trace-check'],
    test_name: '存根清单收尾（#515）',
    must_mention: 'ABILITY_UP_CORE 行不得再写',
  },
  {
    desc: 'M11114 登记表判死措辞退回存根（DUNGEON_BATTLE2 行——归因不到基线 3→2 的那一行，退回即顶破基线，#515）',
    file: 'docs/stub-registry.md',
    find: '不实现（不可达的调用目标——原作全库无定义，同上一行；ere 侧留中性占位，见 ere/dungeon/labo-dungeon-map.js）',
    replace: '存根（ere/dungeon/labo-dungeon-map.js，同上）',
    tests: ['trace-check'],
    test_name: '存根清单收尾（#515）',
    must_mention: 'LABO_DUNGEON_MAP.ERB 会被这条行卡在部分移植',
  },
  {
    desc: 'M11115 登记表判死依据从状态格删掉（DUNGEON_BATTLE 行——留着判死词但抹去「原作全库无定义」，依据断言必须红，#515）',
    file: 'docs/stub-registry.md',
    find: '不实现（不可达的调用目标——原作全库无定义，ere 侧留中性占位，见 ere/dungeon/labo-dungeon-map.js；判据与依据见 issue #181，#14 缺陷登记）',
    replace:
      '不实现（不可达的调用目标，ere 侧留中性占位，见 ere/dungeon/labo-dungeon-map.js；判据与依据见 issue #181，#14 缺陷登记）',
    tests: ['trace-check'],
    test_name: '存根清单收尾（#515）',
    must_mention: '的状态格必须留下判死依据',
  },
  {
    desc: 'M11116 登记表判死行抹掉裁定票号（AGENT_MENU 行的状态格去掉 #103——行内其它列仍留着该票号，断言必须只看状态格，#515）',
    file: 'docs/stub-registry.md',
    find: '不实现（#103 裁定：原作的复制改名事故，只登记不排期——本体不移植；ere/page/page-invasion.js 的调用点保留运行时占位；裁定见 issue #103；#515 订正措辞，#103 裁定不变）',
    replace:
      '不实现（原作的复制改名事故，只登记不排期——本体不移植；ere/page/page-invasion.js 的调用点保留运行时占位；裁定不变）',
    tests: ['trace-check'],
    test_name: '存根清单收尾（#515）',
    must_mention: 'AGENT_MENU 的状态格必须引 #103',
  },
  {
    desc: 'M11117 登记表过期说法退回（JUEL_CHECK 行重写「循环内的能力提升还没做，见下六行」——下面六行已全是已实现；该行不进归因扫描，只有 #515 用例拦得住）',
    file: 'docs/stub-registry.md',
    find: '已实现（#47；循环内的能力提升随后续票全部落地——见下六行各条的状态列与票号，#515 订正）',
    replace: '已实现（循环内的能力提升还没做，见下六行）',
    tests: ['trace-check'],
    test_name: '存根清单收尾（#515）',
    must_mention: 'JUEL_CHECK 的状态格不得再写',
  },

  // —— #532：--verify 只读 + 残留态启动自检（靶同为 tools/mutation-check.mjs）——
  {
    desc: 'M11240 --verify 的只读短路被拆（if (args.verify) 恒假，--verify 落进执行阶段、就地变异并写靶文件）（#532）',
    file: 'tools/mutation-check.mjs',
    find: '  if (args.verify) {',
    replace: '  if (false) { // 变异：--verify 不再短路，直接落进执行阶段',
    tests: ['mutation-check'],
    test_name:
      '--verify 全程只读：靶文件置为只读照样报绿，且不进入执行阶段（#532）',
    must_mention: '工作区只读不该影响结构校验',
  },
  {
    desc: 'M11241 残留判定焊死为「都命中」（脏靶文件一律当残留，恒等判定失效——正在改那个靶文件的开发常态被拦下）（#532）',
    file: 'tools/mutation-check.mjs',
    find: '      if (apply_mutation(head, m) === working) {',
    replace: '      if (true) { // 变异：脏靶文件一律当残留',
    tests: ['mutation-check'],
    test_name: '启动自检零误报：靶文件有未提交的合法改动时照常执行（#532）',
    must_mention: '合法改动不该被当成残留拦下',
  },
  {
    desc: 'M11242 残留恒等判定恒假（残留再也认不出来，退回到门 2 那句「靶代码被重构了？」——#513 的 M11069 那一类重新变成隐形）（#532）',
    file: 'tools/mutation-check.mjs',
    find: '      if (apply_mutation(head, m) === working) {',
    replace: '      if (false) { // 变异：恒等判定恒假，残留认不出来',
    tests: ['mutation-check'],
    test_name:
      '启动自检：靶文件停在变异态就拒绝启动，点名 M 编号并给出还原命令（#532）',
    must_mention: '应点名启动自检与「停在某条的变异态」',
  },
  {
    desc: 'M11243 残留自检不再打印还原命令（报出残留却不给可照抄的 git checkout，人只能自己猜怎么回退）（#532）',
    file: 'tools/mutation-check.mjs',
    find: '    还原：git checkout HEAD -- ${f.file}',
    replace: '    残留：${f.file}',
    tests: ['mutation-check'],
    test_name:
      '启动自检：靶文件停在变异态就拒绝启动，点名 M 编号并给出还原命令（#532）',
    must_mention: '必须打印可直接照抄的还原命令',
  },
  {
    desc: 'M11244 verify 档跳过启动自检（--verify 在残留态上照报「五项检查全过」——最高频入口给出假绿）（#532）',
    file: 'tools/mutation-check.mjs',
    find: `  const residue =
    inflight && path.resolve(inflight) === args.root
      ? null
      : detect_residue(args.root, entries);`,
    replace: `  const residue =
    args.verify || (inflight && path.resolve(inflight) === args.root) // 变异：verify 档不自检
      ? null
      : detect_residue(args.root, entries);`,
    tests: ['mutation-check'],
    test_name:
      '启动自检覆盖 --verify 档：残留态下不许给出「结构校验全绿」的假结论（#532）',
    must_mention: '--verify 档也要走自检并点名 M 编号',
  },
  {
    desc: 'M11245 HEAD 里没有该文件时的跳过分支被拆（只进了索引的新靶文件让自检在 null 上崩，工具直接抛栈）（#532）',
    file: 'tools/mutation-check.mjs',
    find: '    if (head === null) continue;',
    replace:
      '    // 变异：HEAD 里没有该文件时不再跳过（head 为 null 继续往下走）',
    tests: ['mutation-check'],
    test_name:
      '启动自检的退化形态一：靶文件只进了索引、HEAD 里还没有它 → 跳过该文件，工具照常跑（#532）',
    must_mention: 'HEAD 里没有该文件时自检必须跳过而不是崩',
  },
  {
    desc: 'M11246 无 M 编号的老条目点名被焊死（哪一条残留都只报「某条」——#113 遗留的四条落在里面时报出的是空壳）（#532）',
    file: 'tools/mutation-check.mjs',
    find: "    const which = f.number === null ? '某条' : `M${f.number}`;",
    replace: "    const which = '某条'; // 变异：编号点名焊死",
    tests: ['mutation-check'],
    test_name:
      '启动自检：靶文件停在变异态就拒绝启动，点名 M 编号并给出还原命令（#532）',
    must_mention: '必须点名是哪一条的变异态',
  },
  {
    desc: 'M11247 整串恒等判定换成只看长度差（省掉 1.2MB × 961 条的整串替换，但 String.replace 会展开 replace 里的 $$/$&——带 $ 的 1056 条条目从此漏判残留）（#532）',
    file: 'tools/mutation-check.mjs',
    find: '      if (apply_mutation(head, m) === working) {',
    replace:
      '      if (working.length - head.length === m.replace.length - m.find.length) { // 变异：只看长度差',
    tests: ['mutation-check'],
    test_name:
      '启动自检认得 replace 里的 $ 转义：整串判定不许换成便宜的近似（#532）',
    must_mention: '带 $ 转义的残留也必须被认出来',
  },
  {
    desc: 'M11248 run_one 的 finally 还原被拆（变异写下后不再还原，靶文件留在变异态，工具自报「还原失败（读回不一致）」）（#532；#553 起 finally 体换成带重试的 write_with_retry，#582 起变异写入共用同一个函数，find 两次同步）',
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
    test_name: '拦截路径：变异被拦下退出码 0，且靶文件逐字节还原',
    must_mention: '还原失败（读回不一致）',
  },
  {
    desc: 'M11249 SIGINT 处理器退的不是 130（中断被处理了，退出码却报成功——CI 与脚本据此判成败）（#532 初版想守处理器的兜底还原，实测那一段到不了：信号只在条目间的 setImmediate 让出点派发，那时 active_restore 已是 null。改守同一用例里非空的那半）',
    file: 'tools/mutation-check.mjs',
    find: '  process.exit(130);',
    replace: '  process.exit(0); // 变异：中断退出码报成功',
    tests: ['mutation-check'],
    test_name: 'SIGINT 能中断串行档，并把靶文件还原',
    must_mention: 'SIGINT 必须被处理器接住并退 130',
  },
  {
    desc: 'M11250 in-flight 标记不再核对 root（环境里有标记就跳过自检——夹具与并行副本从此不受自检保护，#532 的 --changed 就是这么发现标记本身必要）',
    file: 'tools/mutation-check.mjs',
    find: '    inflight && path.resolve(inflight) === args.root',
    replace: '    inflight !== undefined // 变异：标记只按有没有设',
    tests: ['mutation-check'],
    test_name: '启动自检认得「变异运行内部」的标记，且按 root 比对（#532）',
    must_mention: '标记指向别的 root 时自检必须照常生效',
  },

  // —— #553：--jobs 尊重筛选参数、还原写入重试、并行逐条输出（靶同为 tools/mutation-check.mjs）——
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
    desc: 'M11703 靶文件写入不重试（Windows 瞬态占用一次即弃——#541 一晚三次还原失败即红的那条路；#582 起还原与变异共用这份预算，find 随之改指 WRITE_RETRY_TRIES）（#553）',
    file: 'tools/mutation-check.mjs',
    find: 'const WRITE_RETRY_TRIES = 5;',
    replace: 'const WRITE_RETRY_TRIES = 1; // 变异：不重试',
    tests: ['mutation-check'],
    test_name:
      '还原写入遇瞬态占用时重试到成功：注入前两次失败仍全拦且靶文件逐字节还原（#553）',
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
    desc: 'M11709 副本数不按选中条数收敛（1 条点名也建满 K 份副本白拷贝仓库白跑对照）（#553）',
    file: 'tools/mutation-check.mjs',
    find: `  const jobs = filtered
    ? Math.max(1, Math.min(args.jobs, selection.length))
    : args.jobs;`,
    replace: '  const jobs = args.jobs; // 变异：不按选中条数收敛副本数',
    tests: ['mutation-check'],
    test_name:
      '--jobs 副本数按选中条数收敛：一条编号两个 jobs 只有一个子进程 SUMMARY（#553）',
    must_mention: '副本数不得超过选中条数',
  },
  {
    desc: 'M11710 还原失败的报告不给还原命令（人只能自己猜怎么回退——提示格式与 #532 启动自检一致是本票要求）（#553）',
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
    desc: 'M11715 靶文件写入的瞬态失败只认 UNKNOWN 一个码（EPERM/EBUSY 一次即弃——真实占用抛的码不固定，只认观测样本就漏；#582 起还原与变异共用这个集合，find 随之改指 WRITE_RETRY_CODES）（#553）',
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
    desc: 'M11717 --jobs 的 --changed/--files 清单不下传副本（子进程又各跑整表切片——副本里没有 .git，这一支的退化形态正是本票要根除的那个）（#553）',
    file: 'tools/mutation-check.mjs',
    find: `  } else if (args.files || args.base) {
    const files = [...new Set(selection.map((m) => m.file))];
    filter_args = ['--files', files.join(',')];
  }`,
    replace: `  } else if (false && (args.files || args.base)) { // 变异：清单不下传
    const files = [...new Set(selection.map((m) => m.file))];
    filter_args = ['--files', files.join(',')];
  }`,
    tests: ['mutation-check'],
    test_name:
      '--jobs 的 --changed 筛选下传副本：清单外条目在子输出与汇总里都不出现（#553）',
    must_mention: '--jobs 的 --changed 筛选必须下传副本',
  },
  // —— #582：变异写入的重试与「未写入」报告、并行副本的启动清理（靶同为 tools/mutation-check.mjs）——
  {
    desc: 'M11890 变异写入不走重试写函数（直接 writeFileSync——Windows 瞬态占用一次即弃，本票要修的就是这一条）（#582）',
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
      '变异写入遇瞬态占用时重试到成功：注入前两次失败仍全拦且靶文件逐字节还原（#582）',
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
    desc: 'M11893 变异写入失败后不读回实测（照报「仍是原文」继续跑——文件可能已被 O_TRUNC 截断或半写，后面的条目拿它当原文；#582 审查轮的阻断项，靶从「报告不说明处置」改指读回比对）',
    file: 'tools/mutation-check.mjs',
    find: "    if (fs.readFileSync(full, 'utf8') !== original) {",
    replace: '    if (false) { // 变异：不读回实测',
    tests: ['mutation-check'],
    test_name:
      '变异写入失败但靶文件已不是原文：按残留停下、不跑后续条目（#582 审查轮）',
    must_mention: '写入失败后必须读回实测',
  },
  {
    desc: 'M11894 并行副本目录名不带创建者 PID（启动清理失去所有者判据——只剩年龄，长任务副本会被误删）（#582）',
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
    desc: 'M11897 启动清理不再执行（clean_stale_copies 不接入调用点——临时目录里的副本继续累积，本票要治的那件事回到原样）（#582）',
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
      '变异写入遇瞬态占用时重试到成功：注入前两次失败仍全拦且靶文件逐字节还原（#582）',
    must_mention: '变异写入的重试过程要记录',
  },
  {
    desc: 'M11899 陈旧副本的年龄判据方向反了（只删没超龄的——阈值倒着用，超龄残留一个也清不掉）（#582）',
    file: 'tools/mutation-check.mjs',
    find: '    if (age < COPY_STALE_MS) continue;',
    replace: '    if (age > COPY_STALE_MS) continue; // 变异：判据方向反了',
    tests: ['mutation-check'],
    test_name:
      '启动清理陈旧并行副本：超龄且所有者不在才删，活副本与新鲜副本不动（#582）',
    must_mention: '超过清理阈值、所有者进程已不在的副本必须删掉',
  },
  // —— #530：纯文本选项行棘轮（靶在 ere/system/train/com-toy.js 与 tools/plaintext-options.mjs）——
  {
    desc: 'M11207 新增一行纯文本选项（com-toy 的满月确认多打一枚 [2] 行——棘轮的「只许收紧」门必须拦住，#530；靶行随 #572 的按钮化同步改写）',
    file: 'ere/system/train/com-toy.js',
    find: "  era.printButton('好的', 0);\n  era.printButton('算了', 1);",
    replace: `  era.printButton('好的', 0);\n  era.printButton('算了', 1);\n  era.print('[2] 再看一下'); // 变异：新增纯文本选项行`,
    tests: ['plaintext-option'],
    must_mention: '新增了纯文本选项行',
  },
  {
    desc: 'M11208 扫描器失明（is_comment_line 恒真——所有纯文本选项行都被跳过，棘轮的「条数变少」门必须拦住，#530）',
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
    must_mention: '基线里这些文件的条数变少了',
  },

  // —— #541：存根清单四张表的状态词与未了结计数（靶在 tools/trace-coverage.mjs
  // 与 docs/stub-registry.md；除注明外由 test/stub-registry-status.test.js 守护）——
  {
    desc: 'M11270 未了结词形改错（STATUS_PENDING 写成别的词——「存根（…）」行全部落进三类之外，四张表的未了结数当场数不出来，#541）',
    file: 'tools/trace-coverage.mjs',
    find: "export const STATUS_PENDING = '存根';",
    replace: "export const STATUS_PENDING = '待办'; // 变异：未了结词形改错",
    tests: ['stub-registry-status'],
    test_name:
      '真树清单：四张表齐全、无非标准状态词，未了结行数打印（现状对照）',
    must_mention: '存根清单状态词不在三类里',
  },
  {
    desc: 'M11271 终态词表少一个（「落空」掉出 DEAD_MARKERS——@COM110/@COM111 那条落空行立刻判非法：#541 的终态词表与清单里的行文必须一致）',
    file: 'tools/trace-coverage.mjs',
    find: "export const DEAD_MARKERS = ['判死', '不移植', '不实现', '不可达', '落空'];",
    replace:
      "export const DEAD_MARKERS = ['判死', '不移植', '不实现', '不可达']; // 变异：落空不再是终态词",
    tests: ['stub-registry-status'],
    test_name:
      '真树清单：四张表齐全、无非标准状态词，未了结行数打印（现状对照）',
    must_mention: '存根清单状态词不在三类里',
  },
  {
    desc: 'M11272 分组标题行不再被认出来（函数表 :150/:179 两条被当成状态为空的未了结行——#541 评论专门订正过这一条）',
    file: 'tools/trace-coverage.mjs',
    find: `  return (
    cells.length > 1 &&
    cells[0].startsWith('——') &&
    cells.slice(1).every((c) => c === '')
  );`,
    replace: '  return false; // 变异：分组标题行不再被认出来',
    tests: ['stub-registry-status'],
    test_name:
      '真树清单：四张表齐全、无非标准状态词，未了结行数打印（现状对照）',
    must_mention: '存根清单状态词不在三类里',
  },
  {
    desc: 'M11273 分组标题行只看首格（「其余各列全空」不查——一条忘写状态、正文写到别的格里的数据行被静默跳过，#541）',
    file: 'tools/trace-coverage.mjs',
    find: `  return (
    cells.length > 1 &&
    cells[0].startsWith('——') &&
    cells.slice(1).every((c) => c === '')
  );`,
    replace:
      "  return cells.length > 1 && cells[0].startsWith('——'); // 变异：只看首格",
    tests: ['stub-registry-status'],
    test_name: '分组标题行：首格以 —— 开头即认，其余各格必须全空（#541 订正）',
    must_mention: '分组标题行：首格以',
  },
  {
    desc: 'M11274 分隔行不再被认出来（表头行不打 frame 标且自身末格是「---」，四张表各多出两行非法状态词，#541）',
    file: 'tools/trace-coverage.mjs',
    find: '  return cells.length === 0 || /^-+$/.test(cells[0]);',
    replace: '  return cells.length === 0; // 变异：分隔行不再被认出来',
    tests: ['stub-registry-status'],
    test_name:
      '真树清单：四张表齐全、无非标准状态词，未了结行数打印（现状对照）',
    must_mention: '存根清单状态词不在三类里',
  },
  {
    desc: 'M11275 表头行不打 frame 标（分隔行照认、只漏标它的上一行——表头的末格是列名「状态／去向／归属」，被当成非法状态词，#541）',
    file: 'tools/trace-coverage.mjs',
    find: `      if (is_separator_row(cur.rows.at(-1).cells) && cur.rows.length > 1) {
        cur.rows.at(-2).frame = true; // 分隔行的上一行 = 表头
        cur.rows.at(-1).frame = true;
      }`,
    replace: `      if (is_separator_row(cur.rows.at(-1).cells) && cur.rows.length > 1) {
        cur.rows.at(-1).frame = true; // 变异：表头不打 frame 标
      }`,
    tests: ['stub-registry-status'],
    test_name:
      '真树清单：四张表齐全、无非标准状态词，未了结行数打印（现状对照）',
    must_mention: '存根清单状态词不在三类里',
  },
  {
    desc: 'M11276 拆格退化（按裸 | 拆——正文里的 \\| 把内容格劈成两半，变量表 `24\\|17` 与 @USERSHOP 的 FLAG:83 \\| FLAG:84 两处当场歪，#541）',
    file: 'tools/trace-coverage.mjs',
    find: '    .split(/(?<!\\\\)\\|/)',
    replace: "    .split('|') // 变异：正文里的 \\| 也拆",
    tests: ['stub-registry-status'],
    test_name: '拆格：正文里的 \\| 是字面竖线，不参与分列（#541）',
    must_mention: '拆格：正文里的',
  },
  {
    desc: 'M11277 做完的算未了结（已实现行判成 pending——四张表的存根行数被做完的行顶起来，清空判据永远到不了 0，#541）',
    file: 'tools/trace-coverage.mjs',
    find: "  if (text.startsWith(STATUS_SETTLED)) return 'settled';",
    replace:
      "  if (text.startsWith(STATUS_SETTLED)) return 'pending'; // 变异：做完的算未了结",
    tests: ['stub-registry-status'],
    test_name: '四张表逐行统计：三类各计一行，未了结行数按表汇总（合成样本）',
    must_mention: '四张表逐行统计：三类各计一行',
  },
  {
    desc: 'M11278 状态词失守不上报（核对照跑、failures 不再接进退出码——--coverage 对着错词报绿，写坏型探针整条失效，#541）',
    file: 'tools/trace-coverage.mjs',
    find: '  for (const msg of registry_status.failures) fail(msg);',
    replace: '  // 变异：状态词失守不上报',
    tests: ['stub-registry-status'],
    test_name:
      '探针：清单里写一个非标准状态词，--coverage 必须红并报出（副本）',
    must_mention: '非标准状态词必须让 --coverage 红',
  },
  {
    desc: 'M11279 只核第一张表（统计循环核完函数表就 break——变量表 / 资源表 / @USERSHOP 的错词从此无人管，#541 的四张表只剩一张）',
    file: 'tools/trace-coverage.mjs',
    find: '    tables.push(stat);\n  }\n  return { tables, failures };',
    replace:
      '    tables.push(stat);\n    break; // 变异：只核第一张表\n  }\n  return { tables, failures };',
    tests: ['stub-registry-status'],
    test_name:
      '真树清单：四张表齐全、无非标准状态词，未了结行数打印（现状对照）',
    must_mention: '四张表一张都不能少',
  },
  {
    desc: 'M11280 无表格的小节也算一张表（「状态含义」「维护规则」一类纯文字小节入账——四张表的清单被撑成五张，#541）',
    file: 'tools/trace-coverage.mjs',
    find: '  return sections.filter((s) => s.rows.length > 0);',
    replace: '  return sections; // 变异：无表格的小节也算一张表',
    tests: ['stub-registry-status'],
    test_name:
      '真树清单：四张表齐全、无非标准状态词，未了结行数打印（现状对照）',
    must_mention: '四张表一张都不能少',
  },
  {
    desc: 'M11281 归因读了别的表（parse_stub_registry 不再按标题定位，取最后一张——函数表的存根行全部漏归因，部分移植一律变已移植，#541 重构后的靶位）',
    file: 'tools/trace-coverage.mjs',
    find: '  const section = parse_registry_tables(text).find(\n    (s) => s.title === FUNCTION_TABLE_TITLE,\n  );',
    replace:
      '  const section = parse_registry_tables(text).at(-1); // 变异：归因读了别的表',
    tests: ['trace-check'],
    test_name:
      '移植状态表：yml 承载与存根归因的规则行为（--only 限定，共享副本）',
    must_mention: '存根归因必须把未了结项记成部分移植',
  },
  {
    desc: 'M11282 状态格取错列（末格改成首格——原作函数名当状态词读，四张表逐行非法，#541）',
    file: 'tools/trace-coverage.mjs',
    find: "      const status = cells.at(-1) ?? '';\n      const kind = classify_status(status);",
    replace:
      "      const status = cells[0] ?? ''; // 变异：状态格取错列\n      const kind = classify_status(status);",
    tests: ['stub-registry-status'],
    test_name:
      '真树清单：四张表齐全、无非标准状态词，未了结行数打印（现状对照）',
    must_mention: '存根清单状态词不在三类里',
  },
  {
    desc: 'M11283 存根行合计数报成终态数（--coverage 打印的「存根清单存根行合计 N 行」取 t.dead——#540 终点判据读的就是这个数，#541）',
    file: 'tools/trace-coverage.mjs',
    find: '  const pending_rows = registry_status.tables.reduce(\n    (s, t) => s + t.pending,\n    0,\n  );',
    replace:
      '  const pending_rows = registry_status.tables.reduce(\n    (s, t) => s + t.dead,\n    0,\n  ); // 变异：未了结数报成终态数',
    tests: ['stub-registry-status'],
    test_name:
      '真树清单：--coverage 打印的四张表计数与统计值逐项一致（现状对照）',
    must_mention: '打印的存根行合计数与四张表的存根行数不一致',
  },
  {
    desc: 'M11284 计数打印串位（每张表那行的「存根」与「终态」两个数互换——打印面与统计值对不上，#541）',
    file: 'tools/trace-coverage.mjs',
    find: '          `${t.title} 已实现 ${t.settled}／存根 ${t.pending}／终态 ${t.dead}`,',
    replace:
      '          `${t.title} 已实现 ${t.settled}／存根 ${t.dead}／终态 ${t.pending}`, // 变异：存根与终态串位',
    tests: ['stub-registry-status'],
    test_name:
      '真树清单：--coverage 打印的四张表计数与统计值逐项一致（现状对照）',
    must_mention: '计数与统计值不一致',
  },
  {
    desc: 'M11285 非法行计入未了结（错词行不再 continue，直接算成 pending——三类之外的词被默默当成存根，「清空」判据被它堵住，#541）',
    file: 'tools/trace-coverage.mjs',
    find: '        continue;\n      }\n      stat[kind] += 1;',
    replace:
      '        stat.pending += 1; // 变异：非法行也计成存根\n        continue;\n      }\n      stat[kind] += 1;',
    tests: ['stub-registry-status'],
    test_name: '四张表逐行统计：非标准状态词必须报出表、行号与原文（合成样本）',
    must_mention: '非法行不计入任何一类',
  },
  {
    desc: 'M11286 清单行文退回只写去向（SHOW_FLOOR 行的状态格从「已实现（…；#548）」退回「迷宫票」——#541 要根除的形态，退回即非法词）',
    file: 'docs/stub-registry.md',
    find: '已实现（ere/page/page-shop.js show_floor，usershop 52x 分支已接；#548）',
    replace: '迷宫票',
    tests: ['stub-registry-status'],
    test_name:
      '真树清单：四张表齐全、无非标准状态词，未了结行数打印（现状对照）',
    must_mention: '存根清单状态词不在三类里',
  },
  // M11287/M11288 已删（#547 返工）：靶类「未了结行的源」随存根清单清空
  // （#540 终点）而无实体可挂；两条的历次改挂（#548→CHARA_BODY 行、#547→
  // EQUIP 行）与删除依据见 COUNT 注释。
  {
    desc: 'M11289 函数表节标题改错（FUNCTION_TABLE_TITLE 与清单的小节名对不上——parse_stub_registry 当场抛错，--coverage 整条崩掉，#541 重构后的靶位）',
    file: 'tools/trace-coverage.mjs',
    find: "const FUNCTION_TABLE_TITLE = '函数级存根';",
    replace:
      "const FUNCTION_TABLE_TITLE = '函数存根'; // 变异：节标题与清单对不上",
    tests: ['trace-check'],
    test_name: '移植状态表全绿（真树）：合计恰为 346，真值点与两类误报规则判对',
    must_mention: '里找不到「##',
  },
  // —— #542：七文件判死与清单八行的落判 ——
  {
    desc: 'M11322 RULINGS 表删掉 img.ERB 的判死条目（立绘回到待移植、基线超限，#542）',
    file: 'tools/trace-coverage.mjs',
    find: `  {
    path: 'target/ERB/魔改新增/img.ERB',
    reason:
      '#542（#540 范围决定 4）：立绘系统——设置页 [28] 开关默认关、素材约 260 张 13MB 不在仓库、只增强显示，与 #101 Out of scope「立绘纸娃娃合成系统」同一结论；[28] 与角色详情 [20] 按钮保留可见，按下打不移植提示',
  },
`,
    replace: `  // 变异：删掉 img.ERB 的判死条目
`,
    tests: ['trace-check'],
    test_name:
      '移植状态表（#542）：DEBUG/MOD/立绘七文件判已判定不实现，待移植只剩魔改新增两个',
    must_mention: '超出 #331 基线',
  },
  {
    desc: 'M11330 RULINGS 表的 MOD_SWITCH 路径指向不存在的文件（表悬空——裁定被 target/ 变动架空，#542）',
    file: 'tools/trace-coverage.mjs',
    find: "    path: 'target/ERB/MOD/mod开关ver1.0.11/MOD_SWITCH ver1.0.11.ERB',",
    replace:
      "    path: 'target/ERB/MOD/mod开关ver1.0.11/MOD_SWITCH ver1.0.11.ERB.bak', // 变异：表悬空",
    tests: ['trace-check'],
    test_name:
      '移植状态表（#542）：DEBUG/MOD/立绘七文件判已判定不实现，待移植只剩魔改新增两个',
    must_mention: '已判定不实现表悬空',
  },
  {
    desc: 'M11323 清单大书库行退回存根（判死终态被读回待办——#540 终点判据的分子多一行，#542）',
    file: 'docs/stub-registry.md',
    find: '不移植（#540 范围决定 3、#542 落判：播放点所在画面随 DEBUG小白娘 整块判不移植，本条随之终态；音频文件与注册名保持登记（#69 的 res/ 备份，1:1 追溯），永无消费者）',
    replace:
      '存根（未接入：播放点所在画面随 DEBUG 整块；不实现结论由 #542 S1 写进清单）',
    tests: ['stub-registry-status'],
    test_name:
      '真树清单：#542 判死的八行状态格以判死词开头（退回存根/待认领即红）',
    must_mention: '必须以「不移植」开头的判死终态',
  },
  {
    desc: 'M11324 清单 MODLIST 行退回存根（判死终态被读回待办——#540 终点判据的分子多一行，#542）',
    file: 'docs/stub-registry.md',
    find: '不移植（#540 范围决定 2、#542 落判：五个 MOD 全部需手动开启、默认全关，整目录判不移植；[26] 按钮保留可见（原作 :190 无条件打印），按下打一行不移植提示（ere/page/page-config.js 的 dispatch_config(26)），CONFIG_MODLIST 的内联状态预览仍因按钮拼接限制省略）',
    replace:
      '存根（运行时占位「MODLIST」，ere/page/page-config.js:396；CONFIG_MODLIST 因按钮拼接限制被省略、只留按钮本体不带状态预览）',
    tests: ['stub-registry-status'],
    test_name:
      '真树清单：#542 判死的八行状态格以判死词开头（退回存根/待认领即红）',
    must_mention: '必须以「不移植」开头的判死终态',
  },
  {
    desc: 'M11325 清单背景音乐音量行退回存根（「落空」被读回待办——66 的播种已随 #542 落空取消）',
    file: 'docs/stub-registry.md',
    find: '落空（#542 落判：音量的唯一写点（MOD_SWITCH 音声设置）与逐曲音量消费（SETBGMVOLUME）均判不移植，audio:1 永无消费者；66 的默认值播种随落空取消，新档 0 = 不播，与 #69 主菜单读点的现状一致）',
    replace:
      '存根（未播种：audio:1 暂无消费者、新档 0；随首个消费者，与 MOD_SWITCH 同票——#542 S1）',
    tests: ['stub-registry-status'],
    test_name:
      '真树清单：#542 判死的八行状态格以判死词开头（退回存根/待认领即红）',
    must_mention: '必须以「落空」开头的判死终态',
  },
];
