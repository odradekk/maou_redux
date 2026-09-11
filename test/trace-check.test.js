/**
 * @file trace-check 的行为锁（issue #63）：工具不只「表内一致」，还要
 * 「表外即红」——五条行为在此固定；#290 起锚表按 js 文件分片，再加两条；
 * #298 起再加鉴别力：ENDIF 一类弱锚必须红、平行复现与空 PRINTFORM 整行
 * 锚放行、基线只减不增、默认路径只量未冻结文件、`--anchor-quality` 打印分布（`--all` 才全文量）。
 *
 *   1. 全绿运行：tools/trace-check.mjs 退出码 0（锚校验 + 两侧扫描完整性
 *      + 豁免核对全过）。本用例把工具并入 npm test——锚表烂掉、完整性
 *      失守、豁免过期失效，任一都会让三项自检变红，不再依赖记得手动跑。
 *   2. 探针：往 ere/ 塞一个带未登记 `:N` 引用的模块，工具必须非 0 且
 *      报出探针文件与引用串——证明「新塞进 ere/ 的引用自动受锁」，
 *      而不是只在既有文件上凑绿（做法沿用 #46/#60 的探针先例）。
 *   3. 豁免清单只能变短：往 tools/trace-exempt.mjs 塞一条 #63 基线外的
 *      条目，工具必须非 0 且报出位置——规则在工具里执行、退出码生效（验收
 *      整改：此前这条只在测试里，条目表 465→466 时单独跑工具的人看到的是
 *      绿）。本文件不持基线副本（数据只有条目表与工具内嵌的冻结基线
 *      两份），只验行为：塞进基线外条目 → 红，还原 → 复绿。
 *   4. 样本前缀引用（#156）：`<样本名>-log:行号` 必须按样本名解析——
 *      样本名未登记进 SAMPLES、或登记了但引用没进 SAMPLE_LOG_REFS，都红
 *      且报出完整前缀引用串。带前缀的引用若被当裸 log:N 核对旧样本，
 *      就是 #109 裁定点名的静默错判，探针必须抓到「按样本报出」本身。
 *   5. 样本前缀的登记路径真的可走通：副本里登记锚表 + 伪造样本文件，
 *      工具全绿；再把样本内容改得锚不命中，必须红且报出该样本引用——
 *      「登记后才能过锚校验」两头都有行为靶，防登记机制空转。
 *   6. #290 分片粒度：`tools/trace-refs/` 下一份 js 一份锚表。按域拆不够
 *      ——二十张口上票全落 `kojo.mjs` 仍互撞；判据是后面十五张票各自新增
 *      条目时不会改到别人的行。
 *   7. #290 新分片即入账：往副本的 `tools/trace-refs/` 丢一份新锚表（不改
 *      任何既有文件），工具必须认得——加载器按目录扫描，不靠 index 的
 *      import 清单（那份清单会变成下一处跨票冲突面）。
 *   8. #331 移植状态表：`--coverage` 把 target/ERB/ 的 346 个文件归五类，
 *      合计恰为分母、真值点（K7 / COMF31 / MUSEUM）与两类误报规则（范围
 *      式引用展开、yml 承载）判对；存根归因把「有证据 + 欠账」记部分移植、
 *      判死登记不算欠账、清单行**管道符后带/不带空格两种形态都认**（验收
 *      缺陷：30 行无空格形态曾被跳过，MONSTER_SETUP 所在文件被报成已移植）；
 *      证据悬空、分母漂移、已判定表悬空、待移植基线与归因不到基线超限
 *      各自即红；`--only` 在该模式下限定 target 路径并自报范围。
 *
 * 工具是 CLI（import 即执行并 process.exit），故用 spawn 而非 require。
 *
 * 写坏型探针一律住在**临时仓库副本**里（#89 整改的阻断 2，两轮）：就
 * 地写工作树会与 node --test 的并行读者撞车（#91 勘误；16 核 Linux 五跑
 * 四红），而整棵递归拷贝又会撞上并行探针的文件增删（cpSync 中途 ENOENT）。
 * 副本清单 = 工具的全部判定面：ere/ + tools/ + test/（两侧完整性扫描与
 * FILES 表的 js 侧）+ golden/（#156 样本落点，探针 5 伪造样本用）+ 从工具
 * 与锚表分片的源码文本机械提取的 target/ 引用（FILES 表的 src 侧与
 * emuera.log——手抄会过期失效）。进程内单例、文件内用例串行复用，探针
 * 残骸先清、条目表改动 finally 清单回拷还原。副本的 tools/ 运行时从真树
 * 拷入，变异到工具本体的条目（M94 一类）仍传得进副本。
 */

'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const { after, test } = require('node:test');

const {
  extract_paths,
  make_probe_repo,
  refresh_probe_repo,
} = require('./helpers/probe-repo');

const REPO_ROOT = path.resolve(__dirname, '..');
const TOOL = path.join(REPO_ROOT, 'tools', 'trace-check.mjs');

/** 跑一遍真树工具，返回 { status, output }（只读的对照用例用） */
function run_tool(extra_args = []) {
  const r = spawnSync(process.execPath, [TOOL, ...extra_args], {
    cwd: REPO_ROOT,
    encoding: 'utf8',
    maxBuffer: 16 * 1024 * 1024,
  });
  return { status: r.status, output: `${r.stdout || ''}${r.stderr || ''}` };
}

// 探针副本清单：工具的全部判定面。target/ 引用从工具与锚表分片的源码
// 文本提取（FILES 表的 src、EMUERA_LOG 等——散在数据表里，手抄会过期
// 失效）。golden/ 是 #156 的样本落点（探针 5 伪造样本文件用）。
function listed_trace_sources() {
  const files = ['tools/trace-check.mjs'];
  const dir = path.join(REPO_ROOT, 'tools', 'trace-refs');
  if (fs.existsSync(dir)) {
    for (const name of fs.readdirSync(dir).sort()) {
      if (name.endsWith('.mjs')) {
        files.push(`tools/trace-refs/${name}`);
      }
    }
  }
  const seen = new Set();
  const out = [];
  for (const rel of files) {
    for (const p of extract_paths(rel, /['"](target\/[^'"]+)['"]/g)) {
      if (!seen.has(p)) {
        seen.add(p);
        out.push(p);
      }
    }
  }
  return out;
}

const PROBE_REPO_ENTRIES = [
  'ere',
  'tools',
  'test',
  'golden',
  // #331：--coverage 的部分移植信号读存根清单，共享副本要带一份
  'docs/stub-registry.md',
  ...listed_trace_sources(),
];

let probe_repo_cache;

/** 单例副本（本文件全部写坏型探针共用一份；文件内用例串行） */
function probe_repo() {
  probe_repo_cache ??= make_probe_repo(PROBE_REPO_ENTRIES);
  return probe_repo_cache;
}

after(() => {
  if (probe_repo_cache) {
    fs.rmSync(probe_repo_cache, { recursive: true, force: true });
  }
  if (coverage_full_repo_cache) {
    fs.rmSync(coverage_full_repo_cache, { recursive: true, force: true });
  }
});

/** 跑副本里的工具（写坏型探针用，与 run_tool 同款返回） */
function run_tool_in(root, extra_args = []) {
  const r = spawnSync(
    process.execPath,
    [path.join(root, 'tools', 'trace-check.mjs'), ...extra_args],
    {
      cwd: root,
      encoding: 'utf8',
      maxBuffer: 16 * 1024 * 1024,
    },
  );
  return { status: r.status, output: `${r.stdout || ''}${r.stderr || ''}` };
}

test('trace-check 全绿（锚校验 + 两侧扫描完整性 + 豁免核对，退出码 0）', () => {
  const { status, output } = run_tool();
  assert.equal(
    status,
    0,
    `trace-check 应全绿，实际退出 ${status}：\n${output}`,
  );
  // #290 拆分时锁死过 24162/24303/432 三个数以证等价，但这三个数**每张新
  // 移植票都会长**（引用变多）、豁免数则按 #63 只减不增——写死等于卡住后面
  // 每一张票（#236 验收当场撞上）。等价性是一次性迁移的判据，已由 #290 的
  // 多重集逐条比对完成，不该留成永久断言。这里改锁结构性质：
  const m = output.match(
    /✓ (\d+) 条内联行号引用全部与源文件一致；ERB 完整性：ere\/ (\d+) 条引用全数登记或豁免（豁免 (\d+)\/(\d+) 条/,
  );
  assert.ok(m, `trace-check 输出形状变了：\n${output}`);
  const [, inline, erb, exempt, exempt_total] = m.map(Number);
  assert.ok(inline > 0 && erb >= inline, `引用数不合理：${inline} / ${erb}`);
  // 豁免清单是 #63 冻结的，只减不增——涨了说明有人往里塞新条目
  assert.ok(
    exempt <= 432,
    `豁免数只减不增（#63 冻结基线 432），实际 ${exempt}/${exempt_total}`,
  );
});

test('K19 错锚证伪：登记号随引用漂移，静态正文锚仍须判红', () => {
  const root = probe_repo();
  const js_path = path.join(root, 'ere', 'kojo', 'kojo-k19-fia.js');
  const shard_path = path.join(root, 'tools', 'trace-refs', 'kojo-k19-fia.mjs');
  const js_text = fs.readFileSync(js_path, 'utf8');
  const shard_text = fs.readFileSync(shard_path, 'utf8');
  const js_anchor = '// :3001';
  const ref_anchor = "ref: '3001',";
  assert.equal(
    js_text.split(js_anchor).length - 1,
    1,
    'K19 证伪引用 :3001 必须唯一',
  );
  assert.equal(
    shard_text.split(ref_anchor).length - 1,
    1,
    'K19 分片必须逐条静态登记 :3001，不能在装载期从源文生成锚',
  );
  try {
    fs.writeFileSync(js_path, js_text.replace(js_anchor, '// :3006'), 'utf8');
    fs.writeFileSync(
      shard_path,
      shard_text.replace(ref_anchor, "ref: '3006',"),
      'utf8',
    );
    const { status, output } = run_tool_in(root, [
      '--only',
      'ere/kojo/kojo-k19-fia.js',
    ]);
    assert.notEqual(
      status,
      0,
      'K19 引用漂到内容不同的 :3006，即使登记号同步修改也必须被正文锚拦下',
    );
    assert.ok(
      output.includes('kojo-k19-fia.js :3006') &&
        output.includes('未命中任何锚'),
      `K19 错锚必须点名 :3006 与锚失配：\n${output}`,
    );
  } finally {
    refresh_probe_repo(root, PROBE_REPO_ENTRIES);
  }
  const restored = run_tool_in(root, ['--only', 'ere/kojo/kojo-k19-fia.js']);
  assert.equal(
    restored.status,
    0,
    `K19 错锚探针还原后必须复绿：\n${restored.output}`,
  );
});

test('探针：往 ere/ 塞未登记引用的模块，trace-check 必须红且报出位置（自动纳入后来者）', () => {
  const root = probe_repo();
  const probe = path.join(root, 'ere', '__trace_probe__.js');
  const cleanup = () => {
    if (fs.existsSync(probe)) {
      fs.unlinkSync(probe);
    }
  };
  cleanup(); // 上一次异常退出留下的残骸先清
  try {
    fs.writeFileSync(
      probe,
      [
        '// 探针模块（test/trace-check.test.js 写入，跑完即删）：',
        '// :999993 未登记的单值引用（#63 完整性锁的靶子）。',
        '// :999988-999990 未登记的区间引用（同上，区间形态）。',
        'module.exports = {};',
        '',
      ].join('\n'),
      'utf8',
    );
    const { status, output } = run_tool_in(root, [
      '--only',
      'ere/__trace_probe__.js',
    ]);
    assert.notEqual(
      status,
      0,
      '探针带着未登记引用在 ere/ 里，工具必须非 0——完整性检查对后来者失明',
    );
    assert.ok(
      output.includes('__trace_probe__'),
      `探针文件未被报出：\n${output}`,
    );
    assert.ok(output.includes(':999993'), `单值引用未被报出：\n${output}`);
    assert.ok(
      output.includes(':999988-999990'),
      `区间引用未被报出：\n${output}`,
    );
  } finally {
    cleanup();
  }
  // 删净之后复绿（也证明探针真的进过扫描）
  const restored = run_tool_in(root, ['--only', 'ere/__trace_probe__.js']);
  assert.equal(
    restored.status,
    0,
    `探针删了还红——副本或工具有一边不对：\n${restored.output}`,
  );
});

test('豁免清单只能变短：塞基线外条目进条目表，工具必须红且报出位置', () => {
  const root = probe_repo();
  const exempt_path = path.join(root, 'tools', 'trace-exempt.mjs');
  const original = fs.readFileSync(exempt_path, 'utf8');
  // 探针条目选已登记引用 page-main-menu 的 :53：完整性检查与过期失效检查都不
  // 会对它开口（引用在、且已登记），唯一会红的就是「不在 #63 基线内」。
  const anchor = "  'ere/system/train/train-loop.js': ['545'],";
  if (!original.includes(anchor)) {
    throw new Error('探针锚行不在 trace-exempt.mjs 里——条目表结构变了？');
  }
  const probe_line = "  'ere/page/page-main-menu.js': ['53'],";
  try {
    fs.writeFileSync(
      exempt_path,
      original.replace(anchor, `${anchor}\n${probe_line}`),
      'utf8',
    );
    const { status, output } = run_tool_in(root, [
      '--only',
      'ere/page/page-main-menu.js',
    ]);
    assert.notEqual(
      status,
      0,
      '条目表长出基线外条目，工具必须非 0——「只能变短」不在退出码语义里',
    );
    assert.ok(
      output.includes('page-main-menu') && output.includes(':53'),
      `探针条目未被报出：\n${output}`,
    );
    assert.ok(
      output.includes('#63 基线'),
      `红的原因必须是基线失守，而不是别的检查项先开：\n${output}`,
    );
  } finally {
    refresh_probe_repo(root, PROBE_REPO_ENTRIES);
  }
  // 还原之后复绿（也证明探针真的改过条目表）
  const restored = run_tool_in(root, ['--only', 'ere/page/page-main-menu.js']);
  assert.equal(
    restored.status,
    0,
    `条目表还原后还红——副本或工具有一边不对：\n${restored.output}`,
  );
});

// —— #156：样本前缀引用的两面（表外即红 / 登记后可走通）。探针里的
//    前缀引用串一律运行时拼接——本测试文件自身也在扫描完整性范围内，
//    字面量会让真树的工具先红。 ——

test('样本前缀引用：样本名未登记或引用未进锚表，都必须红且按样本报出', () => {
  const root = probe_repo();
  const probe_path = path.join(root, 'ere', '__prefix_probe__.js');
  // 探针 1：样本名合法（在 SAMPLES）但引用没登记进 SAMPLE_LOG_REFS
  const token_untabled = 'mainmenu-natural' + '-log:' + '12';
  // 探针 2：样本名本身不在 SAMPLES（拼错形态）
  const token_unknown = 'mainmenu-typo' + '-log:' + '12';
  const cleanup = () => {
    if (fs.existsSync(probe_path)) {
      fs.unlinkSync(probe_path);
    }
  };
  cleanup();
  try {
    fs.writeFileSync(
      probe_path,
      [
        '// 探针模块（test/trace-check.test.js 写入，跑完即删）：',
        `// ${token_untabled} 与 ${token_unknown} —— #156 前缀引用探针。`,
        'module.exports = {};',
        '',
      ].join('\n'),
      'utf8',
    );
    const { status, output } = run_tool_in(root, [
      '--only',
      'ere/__prefix_probe__.js',
    ]);
    assert.notEqual(
      status,
      0,
      '前缀引用未登记，工具必须非 0——按样本名分表核对是 #156 的存在理由',
    );
    assert.ok(
      output.includes(token_untabled),
      `已登记样本名的未登记引用必须按完整前缀串报出（拿到「${token_untabled}」以外的形态即静默错判）：\n${output}`,
    );
    assert.ok(
      output.includes(token_unknown),
      `未登记样本名的前缀引用必须原样报出：\n${output}`,
    );
    assert.ok(
      output.includes('未登记进 SAMPLE_LOG_REFS') &&
        output.includes('样本名不在 SAMPLES'),
      `两种失守（引用未登记 / 样本名未登记）必须分开点名：\n${output}`,
    );
  } finally {
    cleanup();
  }
  // 删净之后复绿
  const restored = run_tool_in(root, ['--only', 'ere/__prefix_probe__.js']);
  assert.equal(
    restored.status,
    0,
    `探针删了还红——副本或工具有一边不对：\n${restored.output}`,
  );
});

test('样本前缀引用：登记后全绿，样本内容漂移必须红（登记机制两头有靶）', () => {
  const root = probe_repo();
  const golden_dir = path.join(root, 'golden');
  // 探针样本名挑 SAMPLE_LOG_REFS 里**没有既有登记**的一个（#161 样本入库
  // 后 golden/ 全是真实样本：伪造内容会覆盖副本里的真文件，撞上其它文件
  // 对该样本的已登记引用——mainmenu-natural/saveload-natural 已被
  // replay-b.js / page-save-load.js 引用，探针改用 daycycle-max）
  const probe_sample = 'daycycle-max';
  const sample_path = path.join(golden_dir, `${probe_sample}.log`);
  const probe_path = path.join(root, 'ere', '__sample_ref_probe__.js');
  // #290：登记走新分片，不改既有文件——加载器按目录扫描即入账。
  const shard_path = path.join(
    root,
    'tools',
    'trace-refs',
    '__sample_ref_probe__.mjs',
  );
  // 拼接构造（不用模板串）：扫描器会把源码里的带前缀引用文本当真引用
  // 扫进完整性检查，拼接让源码文本里不存在该形态（#156 阶段一的既有写法）
  const token = `${probe_sample}` + '-log:' + '1';
  const cleanup = () => {
    for (const p of [probe_path, shard_path]) {
      if (fs.existsSync(p)) {
        fs.unlinkSync(p);
      }
    }
  };
  cleanup(); // 上一次异常退出留下的残骸先清
  const restore_sample = () => {
    // 被覆盖的真实样本从真树回拷（refresh_probe_repo 之外的单文件还原）
    fs.copyFileSync(
      path.join(REPO_ROOT, 'golden', `${probe_sample}.log`),
      sample_path,
    );
  };
  try {
    // 1) 副本里登记锚表（新分片）+ 伪造样本内容（第 1 行命中锚）+ 探针引用 → 全绿
    fs.mkdirSync(path.dirname(shard_path), { recursive: true });
    fs.writeFileSync(
      shard_path,
      [
        'export const FILES = [];',
        'export const LOG_REFS = [];',
        'export const SAMPLE_LOG_REFS = {',
        `  '${probe_sample}': [`,
        "    { js: 'ere/__sample_ref_probe__.js', refs: [{ ref: '1', any: [/^第7日/m] }] },",
        '  ],',
        '};',
        '',
      ].join('\n'),
      'utf8',
    );
    fs.mkdirSync(golden_dir, { recursive: true });
    fs.writeFileSync(sample_path, '第7日 上午\r\n[100] 调教\r\n', 'utf8');
    fs.writeFileSync(
      probe_path,
      [
        `// 探针模块（test/trace-check.test.js 写入，跑完即删）：`,
        `// ${token} —— 登记过的前缀引用。`,
        'module.exports = {};',
        '',
      ].join('\n'),
      'utf8',
    );
    const green = run_tool_in(root, ['--only', 'ere/__sample_ref_probe__.js']);
    assert.equal(
      green.status,
      0,
      `登记后的样本前缀引用必须让工具全绿（登记机制可走通）：\n${green.output}`,
    );

    // 2) 样本内容漂移到锚不命中 → 红且报出该样本引用
    fs.writeFileSync(sample_path, 'XXXX 漂移\r\n', 'utf8');
    const red = run_tool_in(root, ['--only', 'ere/__sample_ref_probe__.js']);
    assert.notEqual(
      red.status,
      0,
      '样本锚失配必须红——锚校验焊死的变异靠这条拦下',
    );
    assert.ok(
      red.output.includes(token) && red.output.includes('未命中任何锚'),
      `红的必须是样本锚失配且按样本引用报出：\n${red.output}`,
    );
  } finally {
    cleanup();
    restore_sample(); // 被伪造内容覆盖的真实样本回拷还原
    refresh_probe_repo(root, PROBE_REPO_ENTRIES);
  }
  // 还原之后复绿
  const restored = run_tool_in(root, ['--only', 'ere/__sample_ref_probe__.js']);
  assert.equal(
    restored.status,
    0,
    `还原后还红——副本或工具有一边不对：\n${restored.output}`,
  );
});

test('锚表按 js 文件分片：每个 ere js 至多一份 FILES 表（#290）', () => {
  const dir = path.join(REPO_ROOT, 'tools', 'trace-refs');
  assert.ok(fs.existsSync(dir), 'tools/trace-refs/ 必须存在——锚表已按文件拆开');
  const shards = fs.readdirSync(dir).filter((n) => n.endsWith('.mjs'));
  assert.ok(
    shards.length > 1,
    `分片目录只有 ${shards.length} 个文件，没有拆开`,
  );
  const ere_shards = shards.filter((n) => n !== '_log.mjs');
  const stems = ere_shards.map((n) => n.replace(/\.mjs$/, ''));
  assert.equal(
    new Set(stems).size,
    stems.length,
    `分片文件名撞车：${stems.sort().join(', ')}`,
  );
  // 口上分片必须按角色拆开：k1/k2/k3/k4 各自一份，不能合成 kojo.mjs
  for (const stem of [
    'kojo-k1-confident',
    'kojo-k2-timid',
    'kojo-k3-noble',
    'kojo-k4-stoic',
  ]) {
    assert.ok(
      stems.includes(stem),
      `口上 ${stem} 必须独占一份锚表，否则后续口上票仍会互撞`,
    );
  }
  assert.ok(
    !stems.includes('kojo') && !stems.includes('index'),
    '按域合成的 kojo.mjs / 显式 index.mjs 会变成下一处跨票冲突面',
  );
});

test('新分片即入账：往 tools/trace-refs/ 丢一份假模块锚表，不改既有文件', () => {
  const root = probe_repo();
  const shard_path = path.join(
    root,
    'tools',
    'trace-refs',
    'kojo-k99-probe.mjs',
  );
  const probe_js = path.join(root, 'ere', 'kojo', 'kojo-k99-probe.js');
  const cleanup = () => {
    for (const p of [shard_path, probe_js]) {
      if (fs.existsSync(p)) fs.unlinkSync(p);
    }
  };
  cleanup();
  try {
    fs.mkdirSync(path.dirname(probe_js), { recursive: true });
    fs.writeFileSync(
      probe_js,
      [
        '// 假口上模块（test/trace-check.test.js 写入，跑完即删）',
        '// :1 @KOJO_K99',
        'module.exports = {};',
        '',
      ].join('\n'),
      'utf8',
    );
    fs.mkdirSync(path.dirname(shard_path), { recursive: true });
    fs.writeFileSync(
      shard_path,
      [
        "const K99 = 'target/ERB/口上/EVENT_K1_自信家.ERB';",
        'export const FILES = [',
        "  { js: 'ere/kojo/kojo-k99-probe.js', refs: [{ src: K99, ref: '1', any: [/=======/] }] },",
        '];',
        'export const LOG_REFS = [];',
        'export const SAMPLE_LOG_REFS = {};',
        '',
      ].join('\n'),
      'utf8',
    );
    const { status, output } = run_tool_in(root, [
      '--only',
      'ere/kojo/kojo-k99-probe.js',
    ]);
    assert.equal(status, 0, `新分片必须被加载器扫到并让工具全绿：\n${output}`);
    assert.match(
      output,
      /✓ \d+ 条内联行号引用/,
      `全绿输出形态变了：\n${output}`,
    );
  } finally {
    cleanup();
  }
  const restored = run_tool_in(root, ['--only', 'ere/kojo/kojo-k99-probe.js']);
  assert.equal(restored.status, 0, `假模块删了还红：\n${restored.output}`);
});

// —— #298：锚鉴别力。trace-check 绿只证明「:N 登记了且能命中声明切片」，
//    不证明锚有鉴别力。ENDIF / 裸 PRINTFORMW 命中几十上百行，行号漂了
//    仍绿——这正是 #44 成片偏移 2~30 行时工具该抓却抓不到的那一类。
//    量法是全文匹配（段级多行锚按「单行逐行」会得到 0 命中，见
//    tools/trace-refs/kojo-k10-club.mjs 头注）；命中窗口逐字相同且有
//    正文则放行（#242 平行复现段落：漂移落到内容相同的另一处，无从
//    产生错误绑定）。空 PRINTFORMW 整行锚（#235）单独放行。其余弱锚
//    冻结成只减不增的基线，不回头改存量。 ——

/** 在副本里挂一份探针模块 + 源文件 + 锚表分片，跑完即删 */
function write_quality_probe(root, { js_rel, src_rel, src_text, refs }) {
  const js_path = path.join(root, js_rel);
  const src_path = path.join(root, src_rel);
  const shard_path = path.join(
    root,
    'tools',
    'trace-refs',
    '__quality_probe__.mjs',
  );
  fs.mkdirSync(path.dirname(js_path), { recursive: true });
  fs.mkdirSync(path.dirname(src_path), { recursive: true });
  fs.mkdirSync(path.dirname(shard_path), { recursive: true });
  const comments = refs.map((r) => `// :${r.ref}`).join('\n');
  fs.writeFileSync(
    js_path,
    `// 探针模块（test/trace-check.test.js 写入，跑完即删）\n${comments}\nmodule.exports = {};\n`,
    'utf8',
  );
  fs.writeFileSync(src_path, src_text, 'utf8');
  const ref_lines = refs
    .map(
      (r) =>
        `      { src: ${JSON.stringify(src_rel)}, ref: ${JSON.stringify(r.ref)}, any: [${r.any}] },`,
    )
    .join('\n');
  fs.writeFileSync(
    shard_path,
    [
      'export const FILES = [',
      `  { js: ${JSON.stringify(js_rel)}, refs: [`,
      ref_lines,
      '  ] },',
      '];',
      'export const LOG_REFS = [];',
      'export const SAMPLE_LOG_REFS = {};',
      '',
    ].join('\n'),
    'utf8',
  );
  return {
    cleanup() {
      for (const p of [js_path, src_path, shard_path]) {
        if (fs.existsSync(p)) fs.unlinkSync(p);
      }
    },
  };
}

test('鉴别力：把锚改成 ENDIF，门必须红且点名位置与匹配行数', () => {
  const root = probe_repo();
  const probe = write_quality_probe(root, {
    js_rel: 'ere/__quality_endif__.js',
    src_rel: 'target/ERB/__quality_endif__.ERB',
    src_text: [
      '@PROBE_WEAK',
      'PRINTFORMW 第一句有正文的台词',
      'ENDIF',
      'PRINTFORMW 第二句有正文的台词',
      'ENDIF',
      'PRINTFORMW 第三句有正文的台词',
      'ENDIF',
      '',
    ].join('\n'),
    refs: [{ ref: '3', any: String.raw`/^\s*ENDIF\s*$/m` }],
  });
  try {
    const { status, output } = run_tool_in(root, [
      '--only',
      'ere/__quality_endif__.js',
    ]);
    assert.notEqual(
      status,
      0,
      'ENDIF 锚命中多处且窗口无正文，门必须非 0——鉴别力检查对弱锚失明',
    );
    assert.ok(
      output.includes('__quality_endif__') && output.includes(':3'),
      `必须点名 js 与 :N：\n${output}`,
    );
    assert.ok(
      output.includes('ENDIF') && /命中\s*3\s*处/.test(output),
      `必须报出锚源码与匹配行数：\n${output}`,
    );
    assert.ok(
      output.includes('鉴别力') || output.includes('弱锚'),
      `红的原因必须是鉴别力失守，而不是别的检查项先开：\n${output}`,
    );
  } finally {
    probe.cleanup();
  }
  const restored = run_tool_in(root, ['--only', 'ere/__quality_endif__.js']);
  assert.equal(
    restored.status,
    0,
    `探针删了还红——副本或工具有一边不对：\n${restored.output}`,
  );
});

test('鉴别力：平行复现段落（命中多处但窗口逐字相同且有正文）放行', () => {
  const root = probe_repo();
  const line = 'PRINTFORMW 「这段台词在两个对称分支里逐字相同」';
  const probe = write_quality_probe(root, {
    js_rel: 'ere/__quality_parallel__.js',
    src_rel: 'target/ERB/__quality_parallel__.ERB',
    src_text: [
      '@PROBE_PARALLEL',
      'IF CFLAG:400 == 0',
      line,
      'ENDIF',
      'IF CFLAG:400 == 1',
      line,
      'ENDIF',
      '',
    ].join('\n'),
    refs: [
      {
        ref: '3',
        any: String.raw`/^\s*PRINTFORMW 「这段台词在两个对称分支里逐字相同」\s*$/m`,
      },
    ],
  });
  try {
    const { status, output } = run_tool_in(root, [
      '--only',
      'ere/__quality_parallel__.js',
    ]);
    assert.equal(
      status,
      0,
      `平行复现段落必须放行（#242：漂移落到内容相同的另一处）：\n${output}`,
    );
    assert.ok(
      !output.includes('__quality_parallel__') || !output.includes('弱锚'),
      `平行复现不该被报成弱锚：\n${output}`,
    );
  } finally {
    probe.cleanup();
  }
});

test('鉴别力：空 PRINTFORMW 整行锚（#235）放行', () => {
  const root = probe_repo();
  const probe = write_quality_probe(root, {
    js_rel: 'ere/__quality_printformw__.js',
    src_rel: 'target/ERB/__quality_printformw__.ERB',
    src_text: [
      '@PROBE_PRINT',
      'PRINTFORMW',
      'PRINTFORMW 有正文',
      'PRINTFORMW',
      '',
    ].join('\n'),
    refs: [{ ref: '2', any: String.raw`/^\s*PRINTFORMW\s*$/m` }],
  });
  try {
    const { status, output } = run_tool_in(root, [
      '--only',
      'ere/__quality_printformw__.js',
    ]);
    assert.equal(
      status,
      0,
      `空 PRINTFORMW 整行锚是 #235 定的合法形态，必须放行：\n${output}`,
    );
  } finally {
    probe.cleanup();
  }
});

test('鉴别力：段级多行锚按全文匹配，不得按单行逐行量成 0 命中', () => {
  const root = probe_repo();
  const probe = write_quality_probe(root, {
    js_rel: 'ere/__quality_multiline__.js',
    src_rel: 'target/ERB/__quality_multiline__.ERB',
    src_text: [
      '@PROBE_MULTI',
      'FLAG:110 = 1',
      'SIF FLAG:7 == 0',
      'FLAG:7 = 2',
      '',
    ].join('\n'),
    refs: [
      {
        ref: '2-4',
        any: String.raw`/^\s*FLAG:110 = 1\s*$\s*^\s*SIF FLAG:7 == 0\s*$\s*^\s*FLAG:7 = 2\s*$/m`,
      },
    ],
  });
  try {
    const { status, output } = run_tool_in(root, [
      '--only',
      'ere/__quality_multiline__.js',
    ]);
    assert.equal(
      status,
      0,
      `段级多行锚必须按全文匹配放行（#241 K10）：\n${output}`,
    );
    const report = run_tool_in(root, [
      '--only',
      'ere/__quality_multiline__.js',
      '--anchor-quality',
    ]);
    assert.equal(
      report.status,
      0,
      `--anchor-quality 对段级多行锚必须全绿：\n${report.output}`,
    );
    assert.ok(
      /命中\s*1\s*处/.test(report.output) ||
        /唯一/.test(report.output) ||
        /鉴别力/.test(report.output),
      `--anchor-quality 必须能量出命中数（全文匹配，不是逐行）：\n${report.output}`,
    );
  } finally {
    probe.cleanup();
  }
});

test('鉴别力基线只能变短：把冻结数改小一位，工具必须红', () => {
  const root = probe_repo();
  const tool_path = path.join(root, 'tools', 'trace-check.mjs');
  const original = fs.readFileSync(tool_path, 'utf8');
  const m = original.match(/const ANCHOR_QUALITY_BASELINE = (\d+);/);
  assert.ok(m, 'ANCHOR_QUALITY_BASELINE 必须内嵌在工具里——规则不复制到别处');
  const current = Number(m[1]);
  assert.ok(current > 0, '基线必须大于 0（存量弱锚冻结，不是空表）');
  try {
    fs.writeFileSync(
      tool_path,
      original.replace(
        `const ANCHOR_QUALITY_BASELINE = ${current};`,
        `const ANCHOR_QUALITY_BASELINE = ${current - 1};`,
      ),
      'utf8',
    );
    const { status, output } = run_tool_in(root, ['--only', 'ere/main.js']);
    assert.notEqual(
      status,
      0,
      '基线改小一位必须非 0——「只能变短」不在退出码语义里',
    );
    assert.ok(
      output.includes('#298') &&
        (output.includes('基线') || output.includes('只减不增')),
      `红的原因必须是鉴别力基线失守：\n${output}`,
    );
  } finally {
    refresh_probe_repo(root, PROBE_REPO_ENTRIES);
  }
  const restored = run_tool_in(root, ['--only', 'ere/main.js']);
  assert.equal(
    restored.status,
    0,
    `基线还原后还红——副本或工具有一边不对：\n${restored.output}`,
  );
});

test('默认路径不打印全文量分布（存量冻结面不进 npm test）', () => {
  const { status, output } = run_tool(['--only', 'ere/main.js']);
  assert.equal(status, 0, `默认路径在真树上必须全绿：\n${output}`);
  assert.ok(
    !output.includes('命中 1 处'),
    `默认路径不该跑全文量（那是 --anchor-quality 的事）：\n${output}`,
  );
});

test('--anchor-quality 给出可引用的量法（命中分布，不必另起扫描）', () => {
  const root = probe_repo();
  const probe = write_quality_probe(root, {
    js_rel: 'ere/__quality_report__.js',
    src_rel: 'target/ERB/__quality_report__.ERB',
    src_text: ['@PROBE_REPORT', 'PRINTFORMW 唯一一句有正文的台词', ''].join(
      '\n',
    ),
    refs: [{ ref: '2', any: String.raw`/PRINTFORMW 唯一一句有正文的台词/` }],
  });
  try {
    const { status, output } = run_tool_in(root, [
      '--only',
      'ere/__quality_report__.js',
      '--anchor-quality',
    ]);
    assert.equal(status, 0, `--anchor-quality 必须全绿：\n${output}`);
    assert.ok(
      output.includes('鉴别力') && /命中\s*1\s*处/.test(output),
      `--anchor-quality 必须报出命中 1 处的条数：\n${output}`,
    );
    assert.ok(
      output.includes('弱锚') && /基线/.test(output),
      `--anchor-quality 必须报出弱锚数与基线：\n${output}`,
    );
  } finally {
    probe.cleanup();
  }
});

/**
 * `--only` 的两道守护（#242 收尾的提速开关）。
 *
 * 提速本身不会被现有探针抓住：把过滤器拆掉，每个探针只是退回全量跑一遍，
 * 照样红、照样绿。所以判别式必须是「范围**外**的坏引用不该被报出来」——
 * 同一处注入，换个 --only 就得一绿一红。
 */
test('--only 只核范围内的文件：范围外的坏引用不报，范围内的必须报', () => {
  const root = probe_repo();
  const js_path = path.join(root, 'ere', 'kojo', 'kojo-k19-fia.js');
  const js_text = fs.readFileSync(js_path, 'utf8');
  const js_anchor = '// :3001';
  assert.equal(
    js_text.split(js_anchor).length - 1,
    1,
    '本探针依赖 :3001 在 K19 里唯一',
  );
  try {
    // 只改 K19：登记号不动，引用改掉 → 「js 里已不存在」那条必然触发
    fs.writeFileSync(js_path, js_text.replace(js_anchor, '// :3006'), 'utf8');

    const outside = run_tool_in(root, [
      '--only',
      'ere/kojo/kojo-k903-garde.js',
    ]);
    assert.equal(
      outside.status,
      0,
      `坏引用在 K19、范围限定在 K903，不该被核到：\n${outside.output}`,
    );

    const inside = run_tool_in(root, ['--only', 'ere/kojo/kojo-k19-fia.js']);
    assert.notEqual(
      inside.status,
      0,
      `范围内的坏引用必须报出：\n${inside.output}`,
    );
    assert.ok(
      inside.output.includes('kojo-k19-fia.js :3001'),
      `必须点名那条引用：\n${inside.output}`,
    );
  } finally {
    refresh_probe_repo(root, PROBE_REPO_ENTRIES);
  }
});

test('--only 的绿必须自报范围：不许被当成全量绿引用', () => {
  const { status, output } = run_tool(['--only', 'ere/main.js']);
  assert.equal(status, 0, `限定范围应全绿，实际退出 ${status}：\n${output}`);
  assert.ok(
    output.includes('本次限定范围'),
    `限定范围的报告行必须自报范围，否则一次 --only 的绿会被当成全量绿引用：\n${output}`,
  );
});

test('--only 不给值时当场报错退 1，不静默变成全量', () => {
  const { status, output } = run_tool(['--only']);
  assert.equal(status, 1, `--only 缺值必须退 1，实际 ${status}：\n${output}`);
  assert.ok(
    output.includes('--only 需要至少一个路径子串'),
    `报错要说清缺了什么：\n${output}`,
  );
});

// —— #331：移植状态表（--coverage，判定面在 tools/trace-coverage.mjs）。
//    三层守护：真树全量对账（只读）；共享副本里的规则行为探针（--only
//    限定 target 路径——分母/基线核对在限定模式下跳过，报告行自报范围）；
//    全树副本里的失败判据探针（分母漂移 / 待移植基线 / 已判定表悬空
//    只在非限定模式核对，需要 346 个文件都在场，故单独拷一份 target/ERB）。 ——

test('移植状态表全绿（真树）：合计恰为 346，真值点与两类误报规则判对', () => {
  const { status, output } = run_tool(['--coverage', '--list']);
  // 断言顺序：形状 → 逐类片段 → status 收尾。变异多数走「基线红」，status
  // 放最前会遮住后面的片段断言（红的理由丢失，must_mention 无从命中）。
  assert.match(
    output,
    /移植状态表（#331）：已移植 \d+；部分移植 \d+；已判定不实现 \d+；待移植 \d+；纯声明 \d+；合计 346\/346/,
    '--coverage 必须输出移植状态表（而不是落回锚校验），且合计恰为分母 346',
  );
  // 三个真值点（#331 验收点名）。
  assert.ok(
    output.includes('已移植 target/ERB/口上/EVENT_K7_ハート.ERB'),
    `真值点：K7（kojo-k7-heart.js 真身，STUBBED_CALLS 空）必须判已移植：\n${output}`,
  );
  assert.ok(
    output.includes('已移植 target/ERB/調教相關/COMF31_フェラチオ.ERB') &&
      output.includes('已移植 target/ERB/調教相關/COMF32_パイズリ.ERB') &&
      output.includes('已移植 target/ERB/調教相關/COMF38_足コキ.ERB'),
    `范围式引用必须展开（#331 误报规则 1：COMF31-38 无直陈提及，只经 com-service.js:4 的「至」形态）：\n${output}`,
  );
  assert.ok(
    output.includes('已移植 target/ERB/處刑相關/MUSEUM.ERB'),
    `真值点：MUSEUM.ERB 真身必须判已移植（#347）：\n${output}`,
  );
  assert.ok(
    output.includes('已移植 target/ERB/キャラ関数/CHARA0.ERB') &&
      output.includes('已移植 target/ERB/キャラ関数/CHARA777.ERB'),
    `yml 承载的 EX_TALENT 空壳必须计已移植（#331 误报规则 2）：\n${output}`,
  );
  assert.ok(
    output.includes('已判定不实现 target/ERB/TITLE.ERB') &&
      output.includes('已判定不实现 target/ERB/其他/DATA_FIX.ERB'),
    `已判定不实现表必须生效（#12 根 TITLE / ADR-0006 DATA_FIX）：\n${output}`,
  );
  assert.ok(
    output.includes('纯声明 target/ERB/音声相关/音声的全局变量.erh'),
    `纯声明必须按大小写不敏感计 .erh（分母 346 的前提，敏感计数只有 345）：\n${output}`,
  );
  const baseline_m = output.match(/待移植 (\d+) \/ 基线 (\d+)（#331 只减不增/);
  assert.ok(
    baseline_m !== null && Number(baseline_m[1]) <= Number(baseline_m[2]),
    `待移植 ${baseline_m?.[1]} 不得超出基线 ${baseline_m?.[2]}（证据面静默失效只有这道能拦）`,
  );
  assert.equal(status, 0, `--coverage 应全绿（真树移植状态表）：\n${output}`);
});

test('移植状态表：yml 承载与存根归因的规则行为（--only 限定，共享副本）', () => {
  const root = probe_repo();
  const js_path = path.join(root, 'ere', '__cov_probe__.js');
  const erb_901 = path.join(
    root,
    'target',
    'ERB',
    'キャラ関数',
    'CHARA901.ERB',
  );
  const yml_901 = path.join(root, 'yml', 'Chara901.yml');
  const part = path.join(root, 'target', 'ERB', '__cov_probe__', 'PART.ERB');
  const dead = path.join(root, 'target', 'ERB', '__cov_probe__', 'DEAD.ERB');
  const nop2 = path.join(root, 'target', 'ERB', '__cov_probe__', 'NOP2.ERB');
  const reg_path = path.join(root, 'docs', 'stub-registry.md');
  const args = ['--coverage', '--list', '--only', '__cov_probe__,CHARA901'];
  const cleanup = () => {
    for (const p of [js_path, erb_901, yml_901, part, dead, nop2]) {
      if (fs.existsSync(p)) fs.unlinkSync(p);
    }
  };
  cleanup(); // 上一次异常退出留下的残骸先清
  try {
    // 合成证据：js 头注释声明两个探针源；CHARA901 配 yml（承载正例）
    fs.mkdirSync(path.dirname(part), { recursive: true });
    fs.mkdirSync(path.dirname(erb_901), { recursive: true });
    fs.mkdirSync(path.dirname(yml_901), { recursive: true });
    fs.writeFileSync(part, '@PROBE_PART\n', 'utf8');
    fs.writeFileSync(dead, '@PROBE_DEAD\n', 'utf8');
    fs.writeFileSync(nop2, '@PROBE_NOP2\n', 'utf8');
    fs.writeFileSync(erb_901, '@CHARA_EX_901\n', 'utf8');
    fs.writeFileSync(yml_901, '"番号": 901\n', 'utf8');
    fs.writeFileSync(
      js_path,
      [
        '/**',
        ' * 探针模块（test/trace-check.test.js 写入，跑完即删）。',
        ' * 源: target/ERB/__cov_probe__/PART.ERB  @PROBE_PART',
        ' *     target/ERB/__cov_probe__/DEAD.ERB  @PROBE_DEAD',
        ' *     target/ERB/__cov_probe__/NOP2.ERB  @PROBE_NOP2',
        ' */',
        'module.exports = {};',
        '',
      ].join('\n'),
      'utf8',
    );
    // 合成清单行：存根（真欠账）与登记（判死——完结方式，不是欠账）。
    // 管道符后带/不带空格两种形态各一行——真清单里两种都有（254/30 行），
    // 只认一种会把另一种形态的欠账静默漏成已移植（验收缺陷，M6520 钉住）。
    // 无空格形态指向独立文件 NOP2：两行若指向同一文件，跳过一行不可观测。
    const reg_text = fs.readFileSync(reg_path, 'utf8');
    const sec = reg_text.indexOf('## 函数级存根');
    const at = reg_text.indexOf('\n## ', sec + 1);
    const rows = [
      '| `__COV_PART` | __cov_probe__/PART.ERB:1 | 探针 | 探针 | 探针 | 存根（运行时占位，探针） |',
      '|`__COV_NOP2` | __cov_probe__/NOP2.ERB:1 | 探针 | 探针 | 探针 | 存根（运行时占位，探针） |',
      '| `__COV_DEAD` | __cov_probe__/DEAD.ERB:1 | 探针 | 探针 | 探针 | 登记（判死不移植，探针） |',
      '',
    ].join('\n');
    fs.writeFileSync(
      reg_path,
      `${reg_text.slice(0, at)}\n${rows}${reg_text.slice(at)}`,
      'utf8',
    );
    const r = run_tool_in(root, args);
    assert.equal(r.status, 0, `限定范围的移植状态表应全绿：\n${r.output}`);
    assert.ok(
      r.output.includes('本次限定范围'),
      `限定模式必须自报范围：\n${r.output}`,
    );
    assert.ok(
      r.output.includes('部分移植 target/ERB/__cov_probe__/PART.ERB'),
      `存根归因必须把未了结项记成部分移植（有证据 + 存根欠账）：\n${r.output}`,
    );
    assert.ok(
      r.output.includes('部分移植 target/ERB/__cov_probe__/NOP2.ERB'),
      `无空格清单行必须照常归因（真清单 30 行是此形态）：\n${r.output}`,
    );
    assert.ok(
      r.output.includes('已移植 target/ERB/__cov_probe__/DEAD.ERB'),
      `判死登记不是欠账（计入会把带死分支的已移植文件永远卡在部分移植）：\n${r.output}`,
    );
    assert.ok(
      r.output.includes('已移植 target/ERB/キャラ関数/CHARA901.ERB'),
      `yml 承载必须计已移植：\n${r.output}`,
    );
    // 拿掉 yml → 退回待移植（规则真的在判，不是查表）
    fs.unlinkSync(yml_901);
    const r2 = run_tool_in(root, args);
    assert.ok(
      r2.output.includes('待移植 target/ERB/キャラ関数/CHARA901.ERB'),
      `yml 不在场时空壳必须退回待移植：\n${r2.output}`,
    );
  } finally {
    cleanup();
    refresh_probe_repo(root, PROBE_REPO_ENTRIES);
  }
  const restored = run_tool_in(root, args);
  assert.equal(restored.status, 0, `探针删净后必须复绿：\n${restored.output}`);
});

test('移植状态表：证据悬空即红（--only 限定）', () => {
  const root = probe_repo();
  const js_path = path.join(root, 'ere', '__cov_dangling__.js');
  const cleanup = () => {
    if (fs.existsSync(js_path)) fs.unlinkSync(js_path);
  };
  cleanup();
  try {
    fs.writeFileSync(
      js_path,
      [
        '/**',
        ' * 探针模块（test/trace-check.test.js 写入，跑完即删）。',
        ' * 源: target/ERB/__cov_dangling__/NOPE.ERB  @NOPE',
        ' */',
        'module.exports = {};',
        '',
      ].join('\n'),
      'utf8',
    );
    const r = run_tool_in(root, ['--coverage', '--only', '__cov_dangling__']);
    assert.notEqual(
      r.status,
      0,
      '拼错路径的移植声明等于没声明，证据悬空必须红（否则对应文件假性待移植）',
    );
    assert.ok(
      r.output.includes('证据悬空') && r.output.includes('NOPE.ERB'),
      `必须点名悬空路径：\n${r.output}`,
    );
  } finally {
    cleanup();
  }
  const restored = run_tool_in(root, [
    '--coverage',
    '--only',
    '__cov_dangling__',
  ]);
  assert.equal(restored.status, 0, `探针删净后必须复绿：\n${restored.output}`);
});

test('移植状态表：`cite` 标记的锚只验证正文，不构成移植证据（#382）——合成样本验证区分能力', () => {
  const root = probe_repo();
  const js_path = path.join(root, 'ere', '__cov_cite__.js');
  const real_erb = path.join(root, 'target', 'ERB', '__cov_cite__', 'REAL.ERB');
  const cited_erb = path.join(
    root,
    'target',
    'ERB',
    '__cov_cite__',
    'CITED.ERB',
  );
  const shard_path = path.join(
    root,
    'tools',
    'trace-refs',
    '__cov_cite_probe__.mjs',
  );
  const args = ['--coverage', '--list', '--only', '__cov_cite__'];
  const cleanup = () => {
    for (const p of [js_path, real_erb, cited_erb, shard_path]) {
      if (fs.existsSync(p)) fs.unlinkSync(p);
    }
  };
  cleanup(); // 上一次异常退出留下的残骸先清
  try {
    // 合成证据：REAL.ERB 是 js 自报的真实源（无 cite）；CITED.ERB 只有一条
    // 锚且标 cite: true——模拟 cloth-lookup.mjs 对 SHOP_TAILOR.ERB 那种「只核
    // 对调用点回显」的锚，js 头部也不声明它为源。
    fs.mkdirSync(path.dirname(real_erb), { recursive: true });
    fs.writeFileSync(real_erb, '@PROBE_REAL\nPRINTFORML 真身正文\n', 'utf8');
    fs.writeFileSync(
      cited_erb,
      '@PROBE_CITED\nPRINTFORML 只是被引用的调用点回显\n',
      'utf8',
    );
    fs.writeFileSync(
      js_path,
      [
        '/**',
        ' * 探针模块（test/trace-check.test.js 写入，跑完即删）。',
        ' * 源: target/ERB/__cov_cite__/REAL.ERB  @PROBE_REAL',
        ' */',
        'module.exports = {};',
        '',
      ].join('\n'),
      'utf8',
    );
    fs.mkdirSync(path.dirname(shard_path), { recursive: true });
    fs.writeFileSync(
      shard_path,
      [
        "const JS = 'ere/__cov_cite__.js';",
        'export const FILES = [',
        '  {',
        '    js: JS,',
        '    refs: [',
        "      { src: 'target/ERB/__cov_cite__/REAL.ERB', ref: '1', any: [/@PROBE_REAL/] },",
        '      {',
        "        src: 'target/ERB/__cov_cite__/CITED.ERB',",
        '        cite: true,',
        "        ref: '2',",
        '        any: [/PRINTFORML .只是被引用的调用点回显/],',
        '      },',
        '    ],',
        '  },',
        '];',
        'export const LOG_REFS = [];',
        'export const SAMPLE_LOG_REFS = {};',
        '',
      ].join('\n'),
      'utf8',
    );
    const r = run_tool_in(root, args);
    assert.equal(r.status, 0, `限定范围的移植状态表应全绿：\n${r.output}`);
    assert.ok(
      r.output.includes('已移植 target/ERB/__cov_cite__/REAL.ERB'),
      `真实来源必须判已移植：\n${r.output}`,
    );
    assert.ok(
      r.output.includes('待移植 target/ERB/__cov_cite__/CITED.ERB'),
      `只被 cite 标记引用的文件必须判待移植（无产物，不是被引用就算数）：\n${r.output}`,
    );
  } finally {
    cleanup();
    refresh_probe_repo(root, PROBE_REPO_ENTRIES);
  }
  const restored = run_tool_in(root, args);
  assert.equal(restored.status, 0, `探针删净后必须复绿：\n${restored.output}`);
});

// 全树副本（分母 / 基线 / 表悬空只在非限定模式核对）：共享副本的 target/
// 只带被引用的源，非限定跑必红（分母漂移），失败判据探针因此单独拷整棵
// target/ERB（12MB，进程内单例、文件内串行复用）。
const COVERAGE_FULL_ENTRIES = [
  ...PROBE_REPO_ENTRIES,
  'docs/stub-registry.md',
  'yml',
  'target/ERB',
];
let coverage_full_repo_cache;
function coverage_full_repo() {
  coverage_full_repo_cache ??= make_probe_repo(COVERAGE_FULL_ENTRIES);
  return coverage_full_repo_cache;
}

test('移植状态表：分母漂移与已判定表悬空即红（全树副本）', () => {
  const root = coverage_full_repo();
  const drift = path.join(root, 'target', 'ERB', 'ZZ_DRIFT.ERB');
  const title = path.join(root, 'target', 'ERB', 'TITLE.ERB');
  try {
    fs.writeFileSync(drift, '@ZZ_DRIFT\n', 'utf8');
    const r = run_tool_in(root, ['--coverage']);
    assert.notEqual(
      r.status,
      0,
      'target/ERB 多出一个文件必须红（分母 346 写死）',
    );
    assert.ok(
      r.output.includes('分母漂移') && r.output.includes('347'),
      `必须报出分母漂移与实测数：\n${r.output}`,
    );
    fs.unlinkSync(drift);
    fs.unlinkSync(title);
    const r2 = run_tool_in(root, ['--coverage']);
    assert.ok(
      r2.output.includes('已判定不实现表悬空') &&
        r2.output.includes('TITLE.ERB'),
      `表项文件消失必须点名报出：\n${r2.output}`,
    );
  } finally {
    if (fs.existsSync(drift)) fs.unlinkSync(drift);
    if (!fs.existsSync(title)) {
      fs.copyFileSync(path.join(REPO_ROOT, 'target/ERB/TITLE.ERB'), title); // 单文件回拷，省一次 12MB 整拷
    }
  }
  const restored = run_tool_in(root, ['--coverage']);
  assert.equal(restored.status, 0, `副本还原后必须复绿：\n${restored.output}`);
});

test('移植状态表：待移植基线只减不增（全树副本，改小一位必须红）', () => {
  const root = coverage_full_repo();
  const tool_path = path.join(root, 'tools', 'trace-coverage.mjs');
  const original = fs.readFileSync(tool_path, 'utf8');
  const m = original.match(/export const PENDING_BASELINE = (\d+);/);
  assert.ok(m, 'PENDING_BASELINE 必须内嵌在工具里——规则不复制到别处');
  const current = Number(m[1]);
  assert.ok(current > 0, '基线必须大于 0（现状冻结，不是空表）');
  try {
    fs.writeFileSync(
      tool_path,
      original.replace(
        `export const PENDING_BASELINE = ${current};`,
        `export const PENDING_BASELINE = ${current - 1};`,
      ),
      'utf8',
    );
    const r = run_tool_in(root, ['--coverage']);
    assert.notEqual(
      r.status,
      0,
      '待移植基线改小一位必须红——「只减不增」不在退出码语义里就是空话',
    );
    assert.ok(
      r.output.includes('超出 #331 基线'),
      `红的原因必须是待移植基线失守：\n${r.output}`,
    );
  } finally {
    fs.writeFileSync(tool_path, original, 'utf8'); // 单文件还原，省一次整目录回拷
  }
  const restored = run_tool_in(root, ['--coverage']);
  assert.equal(restored.status, 0, `基线还原后必须复绿：\n${restored.output}`);
});

test('移植状态表：清单归因不到行数基线只减不增（全树副本，改小一位必须红）', () => {
  const root = coverage_full_repo();
  const tool_path = path.join(root, 'tools', 'trace-coverage.mjs');
  const original = fs.readFileSync(tool_path, 'utf8');
  const m = original.match(/export const UNATTRIBUTED_BASELINE = (\d+);/);
  assert.ok(m, 'UNATTRIBUTED_BASELINE 必须内嵌在工具里——规则不复制到别处');
  const current = Number(m[1]);
  assert.ok(current > 0, '基线必须大于 0（现状冻结，不是空表）');
  try {
    fs.writeFileSync(
      tool_path,
      original.replace(
        `export const UNATTRIBUTED_BASELINE = ${current};`,
        `export const UNATTRIBUTED_BASELINE = ${current - 1};`,
      ),
      'utf8',
    );
    const r = run_tool_in(root, ['--coverage']);
    assert.notEqual(
      r.status,
      0,
      '归因不到基线改小一位必须红——静默多出的归因不到行正是欠账被漏成已实现的方向',
    );
    assert.ok(
      r.output.includes('清单归因不到'),
      `红的原因必须是归因不到基线失守：\n${r.output}`,
    );
  } finally {
    fs.writeFileSync(tool_path, original, 'utf8'); // 单文件还原，省一次整目录回拷
  }
  const restored = run_tool_in(root, ['--coverage']);
  assert.equal(restored.status, 0, `基线还原后必须复绿：\n${restored.output}`);
});

test('移植状态表 --only：限定范围跳过全局核对（残缺 target 也能跑且自报范围）', () => {
  const root = probe_repo(); // 共享副本的 target 只有被引用的源：非限定必红（分母），限定必须绿
  const r = run_tool_in(root, ['--coverage', '--list', '--only', 'EVENT_K7']);
  assert.equal(
    r.status,
    0,
    `限定范围必须跳过分母核对（否则写坏型探针没法用共享副本跑）：\n${r.output}`,
  );
  assert.ok(
    r.output.includes('本次限定范围'),
    `限定范围的报告行必须自报范围：\n${r.output}`,
  );
  assert.ok(
    r.output.includes('已移植 target/ERB/口上/EVENT_K7_ハート.ERB'),
    `限定模式下分类照常进行：\n${r.output}`,
  );
});
