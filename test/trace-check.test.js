/**
 * @file trace-check 的行为锁（issue #63）：工具不只「表内一致」，还要
 * 「表外即红」——五条行为在此固定；#290 起锚表按 js 文件分片，再加两条：
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
function run_tool() {
  const r = spawnSync(process.execPath, [TOOL], {
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
});

/** 跑副本里的工具（写坏型探针用，与 run_tool 同款返回） */
function run_tool_in(root) {
  const r = spawnSync(
    process.execPath,
    [path.join(root, 'tools', 'trace-check.mjs')],
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
  assert.match(
    output,
    /✓ 25108 条内联行号引用全部与源文件一致；ERB 完整性：ere\/ 25249 条引用全数登记或豁免（豁免 432\/456 条/,
    `拆分后条数必须与 #290 基线一字不差：\n${output}`,
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
    const { status, output } = run_tool_in(root);
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
  const restored = run_tool_in(root);
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
    const { status, output } = run_tool_in(root);
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
  const restored = run_tool_in(root);
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
    const { status, output } = run_tool_in(root);
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
  const restored = run_tool_in(root);
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
    const green = run_tool_in(root);
    assert.equal(
      green.status,
      0,
      `登记后的样本前缀引用必须让工具全绿（登记机制可走通）：\n${green.output}`,
    );

    // 2) 样本内容漂移到锚不命中 → 红且报出该样本引用
    fs.writeFileSync(sample_path, 'XXXX 漂移\r\n', 'utf8');
    const red = run_tool_in(root);
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
  const restored = run_tool_in(root);
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
    const { status, output } = run_tool_in(root);
    assert.equal(status, 0, `新分片必须被加载器扫到并让工具全绿：\n${output}`);
    assert.match(
      output,
      /✓ \d+ 条内联行号引用/,
      `全绿输出形态变了：\n${output}`,
    );
  } finally {
    cleanup();
  }
  const restored = run_tool_in(root);
  assert.equal(restored.status, 0, `假模块删了还红：\n${restored.output}`);
});
