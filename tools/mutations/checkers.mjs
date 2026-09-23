// 变异条目表切片：tools/ 下的检查器与生成器自身（trace/domain/engine-contract/ownership/gen-facade/facade-names）。
// 字段与运行方式见 tools/mutation-check.mjs 头注释。desc 里的 M 编号不人工
// 分配，只作引用锚点，但全表必须唯一（#295；M117 曾被两票撞号，已改正）
// ——重号由 gate_shape 随 --verify 秒级核对。
/** 本分片条数（门 1）：增删条目必须同步改它，理由见 tools/mutation-check.mjs 头注 */
export const COUNT = 166; // 合并态实测（#532 与 #530 两侧条目全留；按 merge-conflicts.md，计数型基线
// 不取任一侧、也不相加，占位 999 跑出实测 146 再写回——并入前本票 144、master 135，
// 递增账：133 + #532 的 11 + #530 的 2 = 146，与实测相符）
// #513 起 +10（M11060-M11069：trace-check 源绑定判定与错绑基线）；#515 起 +7（M11111-M11117：四条登记表行文退回——两条判死措辞退回「存根」、
// 两条过期说法退回（ABILITY_UP_CORE 行与验收补钉的 JUEL_CHECK 行），以及三条针对
// 「状态格判死依据」的退回（DUNGEON_BATTLE2 行退回存根、两条把判死依据从状态格里删掉）。
// 均由 test/trace-check.test.js 的 #515 用例守护；同票的 M11110 靶在 ere/page/page-shop.js，
// 记在 tools/mutations/page.mjs）；#532 起 +11（M11240-M11250：--verify 只读、残留态启动
// 自检与其 in-flight 标记、run_one/SIGINT 两处还原本身——由 test/mutation-check.test.js
// 的 #532 用例与既有的拦截路径/SIGINT 用例守护）；#530 起 +2（M11207/M11208：纯文本选项行的棘轮两个方向——新增一行、基线留过期条目，
// 均由 test/plaintext-option.test.js 守护）；#541 起 +20（M11270-M11289：存根清单四张表的状态词三分类、
// 分组标题行与表头/分隔行跳过、拆格的 \| 转义、未了结计数与打印面、以及清单三处行文退回——
// 除注明外由 test/stub-registry-status.test.js 守护；M6511/M6512/M6520 的靶行随同票重构改写，
// M10901/M10902 两条清单行条目的 find 同步到新行文）

export default [
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
    desc: "M2100 字符串赋值 '= 不再算写入（CSTR 写形用例必须红）",
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

  // —— #256 引擎声明的两道核对 ——
  // 全量变异退到阶段闸之后，ENGINE_SKIP_BASELINE 的漂移一个阶段才暴露
  // （#135 的 M222 漏抬就是这么连红 18 次 4 天的）。补偿是门 4（静态声明
  // 数，随 npm test 每次都查）与 run_one 的逐条交叉核对。两道各钉一条。
  {
    desc: 'M733 ENGINE_SKIP_BASELINE 抬到 20（声明数与基线分家——门 4 若失守，这一类漂移要一个阶段才暴露）',
    file: 'tools/mutation-check.mjs',
    find: 'const ENGINE_SKIP_BASELINE = 19;',
    replace: 'const ENGINE_SKIP_BASELINE = 20; // 变异：与声明数分家',
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
  {
    desc: 'M2081 归一表重复正则检测被拆（先匹配者胜下的静默遮蔽——#238 SAVESTR:A 教训无人再守）（#295）',
    file: 'test/kojo-text-fidelity.test.js',
    find: '    if (prior !== undefined) {',
    replace:
      '    if (false && prior !== undefined) { // 变异：重复正则检测被拆',
    tests: ['kojo-text-fidelity'],
    must_mention: 'find_duplicate_patterns 的检测逻辑被拆了',
  },
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
  {
    desc: 'M9305 样本锚表的守卫焊死（样本名不在 SAMPLES 不再报——#431 补的探针用例必须红）',
    file: 'tools/trace-check.mjs',
    find: '  if (sample_rel === undefined) {',
    replace: '  if (false) { // 变异：样本名守卫焊死',
    tests: ['trace-check'],
    test_name:
      '样本锚表的守卫：样本名不在 SAMPLES / 样本文件不在库，都必须红并点名',
    must_mention: '必须点名样本名不在 SAMPLES',
  },
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
  {
    desc: 'M9528 豁免清单键打错（M92 的键 92 改成 920，这一条真实条目不再被豁免——豁免清单必须逐条对准 M 编号，打错等于没登记）（#442）',
    file: 'tools/mutation-check.mjs',
    find: `    '92',`,
    replace: `    '920', // 变异：豁免键打错——这一条不再豁免任何真实条目`,
    tests: ['mutation-check'],
    test_name:
      '快速模式全绿：--verify 退出码 0（五项检查进 npm test，变异检查的自动执行点）',
    must_mention: '应全绿，实际退出',
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
    desc: 'M11248 run_one 的 finally 还原被拆（变异写下后不再还原，靶文件留在变异态，工具自报「还原失败（读回不一致）」）（#532）',
    file: 'tools/mutation-check.mjs',
    find: "  } finally {\n    fs.writeFileSync(full, original, 'utf8');\n  }",
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

  // —— #530：纯文本选项行棘轮（靶在 ere/system/train/com-toy.js 与 tools/plaintext-options.mjs）——
  {
    desc: 'M11207 新增一行纯文本选项（com-toy 的满月确认多打一枚 [2] 行——棘轮的「只许收紧」门必须拦住，#530）',
    file: 'ere/system/train/com-toy.js',
    find: "  era.print('[0] 好的 [1] 算了');",
    replace: `  era.print('[0] 好的 [1] 算了');
  era.print('[2] 再看一下'); // 变异：新增纯文本选项行`,
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
  {
    desc: 'M11287 未了结行的源被指到 DUNGEON_BATLLE2 上（该文件必须一直判已移植——#541 第 2 条的源订正把它从欠账里摘出来；#548 起 BEDROOM_BATTLE_MALE 行已实现、不进归因扫描，靶位改挂到仍未了结的 RACE_CONFIG 行）',
    file: 'docs/stub-registry.md',
    find: 'キャラ関数/CHARA_BODY.ERB:931-1333',
    replace: '迷宮/DUNGEON_BATLLE2.ERB 系（男魔王寝室战）',
    tests: ['stub-registry-status'],
    test_name:
      '真树清单：--coverage 打印的四张表计数与统计值逐项一致（现状对照）',
    must_mention: 'DUNGEON_BATLLE2.ERB 必须判已移植',
  },
  {
    desc: 'M11288 待核行文退回（未了结行的源写回「調教相關/（@EVENTEND 的调用，文件待核）」——归因不到的行多一条，超 #541 归零后的基线；#548 起 CHARADEAD_CHECK 行已实现、不进归因扫描，靶位改挂到仍未了结的 CONFIG_AGE_SETTING 行）',
    file: 'docs/stub-registry.md',
    find: 'キャラ関数/CHARA_BODY.ERB:853-929',
    replace: '調教相關/（@EVENTEND 的调用，文件待核）',
    tests: ['trace-check'],
    test_name:
      '移植状态表：清单归因不到行数基线只减不增（全树副本，多一行必须红）',
    must_mention: '清单还原后必须复绿',
  },
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
];
