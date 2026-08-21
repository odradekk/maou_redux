/**
 * @file 域门面生成器（issue #71；#90 扩为二维按属主域推广）：按区段所有权
 * 把变量访问器切成 `chara(cid).<域>.<字段>` 与 `game.<域>.<字段>`。
 *
 * #71 落了两块：一维表（flag/tflag/item/global）按域重切——与既有
 * era_flag / era_global 并存，口上域两个样本已迁；二维角色表的口上域切片
 * （cflag 属主 kojo 的 110 个下标）。
 *
 * #90 起（依据与裁定见 issue #90）：
 *   1. 二维表按属主域全量推广——talent/source/abl/palam/mark/exp 各自的
 *      属主域切片合成 chara-<域>.js（一域一文件、域内多表分组），cflag 在
 *      kojo 之外按补名逐个进入（其余跳过并报告），delta/deltabase 按
 *      PORT_TABLE_OWNERS 声明的属主切片；
 *   2. 名字两源合流——上述六张 yml 有列名的表以 `yml/` 为唯一真相（name→id
 *      反转为 id→name），facade-names 只补缺口；同一下标两源不一致即报错。
 *
 * 决议：docs/adr/0001-engine-tables-as-single-source-of-truth.md。
 * 所有权：ownership/<表>-ownership.yml（#70）；移植自建表：facade-names 的
 * PORT_TABLE_OWNERS。命名：yml/ 列名 + tools/facade-names.js。
 *
 * 用法：node tools/gen-facade.js [--force]
 * 产物边界与 gen-wrapper 同款：已存在默认跳过，重写须 --force；只替换
 * GENERATED 标记之间，手写区逐字节存活。
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');

const {
  NAME_RE,
  NAMES,
  PORT_TABLE_OWNERS,
  get_name,
} = require('./facade-names');

const REPO_ROOT = path.resolve(__dirname, '..');
const GENERATED_START = '// GENERATED START';
const GENERATED_END = '// GENERATED END';

const ONE_DIM_TABLES = ['flag', 'tflag', 'item', 'global'];

// 二维角色表（#90 按属主域推广）：cflag 的 yml 表为空、名字走 facade-names；
// 中间六张 yml 有列名；delta/deltabase 是移植自建表，属主见 PORT_TABLE_OWNERS。
const TWO_DIM_TABLES = [
  'cflag',
  'talent',
  'source',
  'abl',
  'palam',
  'mark',
  'exp',
  'delta',
  'deltabase',
];

// yml 名字表（name→id 形态）——这六张表的列名唯一真相（#90 裁定）
const YML_NAME_FILES = {
  talent: 'Talent.yml',
  source: 'Source.yml',
  abl: 'Abl.yml',
  palam: 'Palam.yml',
  mark: 'Mark.yml',
  exp: 'Exp.yml',
};

function parse_yml_columns(file) {
  const text = fs.readFileSync(path.join(REPO_ROOT, 'yml', file), 'utf8');
  const by_id = new Map();
  const re = /^"(.+)":\r?\n {2}id: (\d+)$/gm;
  let match;
  while ((match = re.exec(text))) {
    by_id.set(Number(match[2]), match[1]);
  }
  if (by_id.size === 0) {
    throw new Error(`yml 名字表解析为空：yml/${file}——文件形态变了？`);
  }
  return by_id;
}

const yml_names = new Map(
  Object.entries(YML_NAME_FILES).map(([table, file]) => [
    table,
    parse_yml_columns(file),
  ]),
);

/**
 * 两源合流（#90）：yml 列名为唯一真相，facade-names 只补缺口或给一致的
 * 名字换更精出处；同一下标两源名字不一致 → 报错，宁可红也不静默择一。
 * cflag/tflag/item/global 与移植自建表不在 yml_names 里，直接走手写表。
 */
function merged_name(table, index) {
  const from_yml = yml_names.get(table)?.get(index);
  const manual = get_name(table, index);
  if (from_yml !== undefined && manual) {
    if (from_yml !== manual.name) {
      throw new Error(
        `两源名字不一致 ${table}:${index}：yml 列名「${from_yml}」vs facade-names「${manual.name}」——yml 列名是唯一真相，先对齐再生成`,
      );
    }
    return manual;
  }
  if (from_yml !== undefined) {
    return {
      name: from_yml,
      source: `yml/${YML_NAME_FILES[table]} id ${index}`,
    };
  }
  return manual;
}
const DOMAINS = [
  'kojo',
  'train',
  'chara',
  'stronghold',
  'dungeon',
  'invasion',
  'event',
  'system',
  'patch', // 实测只拥有二维表，一维切片为空则不产出 game-patch.js
];

const TYPE_RENDER = { number: { js_type: 'number', fallback: '0' } };

// 移植自建表的原作对应名（JSDoc 的 ↔ 侧）：delta/deltabase 在 ERB 里叫
// UP / LOSEBASE，不是同名表——照 toUpperCase 写会产出对不上原作的假锚点
const LEGACY_TABLE_NAMES = { delta: 'UP', deltabase: 'LOSEBASE' };

function parse_ownership(text) {
  const owned = new Map();
  const re = /^"(\d+)(?:-(\d+))?":\r?\n {2}owner: ([a-z][a-z0-9_]*)/gm;
  let match;
  while ((match = re.exec(text))) {
    const start = Number(match[1]);
    const end = match[2] ? Number(match[2]) : start;
    const owner = match[3];
    for (let i = start; i <= end; i += 1) {
      owned.set(i, owner);
    }
  }
  return owned;
}

function load_owned_map(table, ownership_dir) {
  const file = path.join(ownership_dir, `${table}-ownership.yml`);
  if (!fs.existsSync(file)) {
    throw new Error(`所有权产物缺失：${file}`);
  }
  return parse_ownership(fs.readFileSync(file, 'utf8'));
}

function list_owned_indexes(
  table,
  domain,
  ownership_dir = path.join(REPO_ROOT, 'ownership'),
) {
  const owned = load_owned_map(table, ownership_dir);
  return [...owned.entries()]
    .filter(([, owner]) => owner === domain)
    .map(([index]) => index)
    .sort((a, b) => a - b);
}

/**
 * 移植自建表（PORT_TABLE_OWNERS）的属主下标：命名表键即下标集，全部归
 * 声明的属主（没有测量事实，也就没有跳过一说——名字本身就是声明）。
 * 返回 null = 非移植自建表，走 ownership/ 产物。
 */
function port_owned_indexes(table, domain) {
  const owner = PORT_TABLE_OWNERS[table];
  if (!owner) {
    return null;
  }
  if (owner !== domain) {
    return [];
  }
  return Object.keys(NAMES[table] ?? {})
    .map(Number)
    .sort((a, b) => a - b);
}

function entries_for(table, domain, ownership_dir, lookup = merged_name) {
  const port_indexes = port_owned_indexes(table, domain);
  const indexes =
    port_indexes ?? list_owned_indexes(table, domain, ownership_dir);
  const named_entries = [];
  const skipped = [];
  for (const index of indexes) {
    const named = lookup(table, index);
    // 名字缺失、或不是本仓标识符规则下的合法名字（yml 列名如「常识改变
    // 【战斗】」含括号）→ 都不进门面，跳过并报告（#71 裁定三同款；手工
    // 表经 validate_names 已拦，这里再拦一道是给 yml 来源的）
    if (!named || !NAME_RE.test(named.name)) {
      skipped.push({ table, index, domain });
      continue;
    }
    named_entries.push({
      table,
      index,
      name: named.name,
      source: named.source,
    });
  }
  if (table === 'cflag' && domain === 'kojo' && skipped.length > 0) {
    throw new Error(
      `口上域切片缺名：${skipped
        .map((item) => `${item.table}:${item.index}`)
        .join(', ')}——先补 tools/facade-names.js`,
    );
  }
  return { entries: named_entries, skipped };
}

function assert_unique_names(groups, where) {
  const seen = new Map();
  for (const group of groups) {
    for (const entry of group.entries) {
      if (seen.has(entry.name)) {
        throw new Error(
          `${where} 字段重名「${entry.name}」：${seen.get(entry.name)} 与 ${group.table}:${entry.index}`,
        );
      }
      seen.set(entry.name, `${group.table}:${entry.index}`);
    }
  }
}

function capitalize(domain) {
  return domain.charAt(0).toUpperCase() + domain.slice(1);
}

/** 出处进 JS 注释前清洗：全角空格；孤立 `:数字` 会触发 trace-check 行引用扫描 */
function sanitize_source(source) {
  return source
    .replace(/\u3000/g, ' ')
    .replace(/(^|[^A-Za-z0-9_.${}])(:(\d+(?:-\d+)?))/g, '$1行$3');
}

function groups_of(spec) {
  if (spec.groups) {
    return spec.groups;
  }
  return [{ table: spec.table, entries: spec.entries ?? [] }];
}

function render_accessor(kind, entry) {
  const { table, index, name, source } = entry;
  const render_type = TYPE_RENDER.number;
  const legacy = `${LEGACY_TABLE_NAMES[table] ?? table.toUpperCase()}:${index}`;
  const address =
    kind === 'chara' ? `${table}:cid:${index}` : `${table}:${index}`;
  const getter_body =
    kind === 'chara'
      ? `    return era.get(\`${table}:\${this.cid}:${index}\`) || ${render_type.fallback};`
      : `    return era.get('${table}:${index}') || ${render_type.fallback};`;
  const setter_body =
    kind === 'chara'
      ? `    era.set(\`${table}:\${this.cid}:${index}\`, v);`
      : `    era.set('${table}:${index}', v);`;
  return [
    '  /**',
    `   * ${name}（${address} ↔ ${legacy}）`,
    `   * 源: ${sanitize_source(source)}`,
    `   * @returns {${render_type.js_type}}`,
    '   */',
    `  get ${name}() {`,
    getter_body,
    '  }',
    '  /**',
    `   * @param {${render_type.js_type}} v`,
    '   */',
    `  set ${name}(v) {`,
    setter_body,
    '  }',
  ].join('\n');
}

function render_generated_section(spec) {
  const groups = groups_of(spec);
  assert_unique_names(groups, `${spec.kind}:${spec.domain}`);
  const accessors = [];
  for (const group of groups) {
    const rendered = group.entries.map((entry) =>
      render_accessor(spec.kind, { ...entry, table: group.table }),
    );
    if (groups.length > 1) {
      accessors.push(`  // —— ${group.table} ——\n${rendered.join('\n\n')}`);
    } else {
      accessors.push(rendered.join('\n\n'));
    }
  }
  const accessor_block = accessors.join('\n\n');
  if (spec.kind === 'chara') {
    const class_name = `${capitalize(spec.domain)}Facade`;
    const lines = [
      `${GENERATED_START} —— tools/gen-facade.js 自 ownership + yml 列名 + tools/facade-names.js 生成，勿手改`,
      `class ${class_name} {`,
      '  constructor(cid) {',
      '    this.cid = cid;',
      '  }',
      '',
      accessor_block,
      '}',
      GENERATED_END,
    ];
    return `${lines.join('\n')}\n`;
  }
  const class_name = `${capitalize(spec.domain)}Game`;
  const lines = [
    `${GENERATED_START} —— tools/gen-facade.js 自 ownership + yml 列名 + tools/facade-names.js 生成，勿手改`,
    `class ${class_name} {`,
    accessor_block,
    '}',
    `const facade = new ${class_name}();`,
    GENERATED_END,
  ];
  return `${lines.join('\n')}\n`;
}

function locate_markers(lines) {
  const starts = [];
  const ends = [];
  lines.forEach((line, i) => {
    if (line.trimStart().startsWith(GENERATED_START)) {
      starts.push(i);
    } else if (line.trimStart().startsWith(GENERATED_END)) {
      ends.push(i);
    }
  });
  if (starts.length !== 1 || ends.length !== 1 || starts[0] > ends[0]) {
    throw new Error(
      `产物里找不到唯一一对 ${GENERATED_START} / ${GENERATED_END} 标记（找到 ${starts.length} 个起点、${ends.length} 个终点）`,
    );
  }
  return { start: starts[0], end: ends[0] };
}

function extract_generated_section(text) {
  const lines = text.split('\n');
  const { start, end } = locate_markers(lines);
  return `${lines.slice(start, end + 1).join('\n')}\n`;
}

function replace_generated_section(text, section) {
  const lines = text.split('\n');
  const { start, end } = locate_markers(lines);
  const section_lines = section.endsWith('\n')
    ? section.slice(0, -1).split('\n')
    : section.split('\n');
  const merged = [
    ...lines.slice(0, start),
    ...section_lines,
    ...lines.slice(end + 1),
  ];
  return merged.join('\n');
}

function render_wrapper(spec) {
  const section = render_generated_section(spec);
  if (spec.kind === 'chara') {
    const class_name = `${capitalize(spec.domain)}Facade`;
    const header = [
      '/**',
      ` * @file 角色变量的${spec.domain}域门面（tools/gen-facade.js）。`,
      ' *',
      ` * 形状：chara(cid).${spec.domain}.<字段>。生成区勿手改；手写区重生成不碰。`,
      ' */',
      '',
      "const era = require('#/era-electron');",
      '',
      '',
    ].join('\n');
    const hand = [
      '',
      '// —— 手写区（重新生成不会触碰）——',
      `module.exports = ${class_name};`,
      '',
    ].join('\n');
    return `${header}${section}${hand}`;
  }
  const header = [
    '/**',
    ` * @file 一维变量的${spec.domain}域门面（tools/gen-facade.js）。`,
    ' *',
    ` * 形状：game.${spec.domain}.<字段>。与 era_flag / era_global 并存。一维重切不强制迁移；口上域样本这张票已迁。`,
    ' */',
    '',
    "const era = require('#/era-electron');",
    '',
    '',
  ].join('\n');
  const hand = [
    '',
    '// —— 手写区（重新生成不会触碰）——',
    'module.exports = facade;',
    '',
  ].join('\n');
  return `${header}${section}${hand}`;
}

function render_chara_root(chara_specs) {
  const requires = chara_specs
    .map(
      (spec) =>
        `const ${capitalize(spec.domain)}Facade = require('#/facade/${spec.file.replace(/\.js$/, '')}');`,
    )
    .join('\n');
  const attaches = chara_specs
    .map(
      (spec) =>
        `    this.${spec.domain} = new ${capitalize(spec.domain)}Facade(cid);`,
    )
    .join('\n');
  const header = [
    '/**',
    ' * @file 角色门面入口：chara(cid).<域>.<字段>（tools/gen-facade.js，issue #71）。',
    ' *',
    ' * 按角色 ID 缓存单例视图，只持 ID 不持值。域切片文件在 chara-<域>.js。',
    ' */',
    '',
    '',
  ].join('\n');
  const section = [
    `${GENERATED_START} —— tools/gen-facade.js 装配角色视图，勿手改`,
    requires,
    '',
    'class CharaView {',
    '  constructor(cid) {',
    '    this.cid = cid;',
    attaches,
    '  }',
    '}',
    '',
    'const cache = new Map();',
    '',
    'function chara(cid) {',
    '  const key = Number(cid);',
    '  let view = cache.get(key);',
    '  if (!view) {',
    '    view = new CharaView(key);',
    '    cache.set(key, view);',
    '  }',
    '  return view;',
    '}',
    GENERATED_END,
  ].join('\n');
  const hand = [
    '',
    '// —— 手写区（重新生成不会触碰）——',
    'module.exports = { chara };',
    '',
  ].join('\n');
  return `${header}${section}${hand}`;
}

function render_game_root(game_specs) {
  const requires = game_specs
    .map(
      (spec) =>
        `const ${spec.domain} = require('#/facade/${spec.file.replace(/\.js$/, '')}');`,
    )
    .join('\n');
  const fields = game_specs.map((spec) => `  ${spec.domain},`).join('\n');
  const header = [
    '/**',
    ' * @file 一维门面入口：game.<域>.<字段>（tools/gen-facade.js，issue #71）。',
    ' *',
    ' * 与 era_flag / era_global 并存。一维重切不强制迁移；口上域样本这张票已迁。域切片文件在 game-<域>.js。',
    ' */',
    '',
    '',
  ].join('\n');
  const section = [
    `${GENERATED_START} —— tools/gen-facade.js 装配 game 命名空间，勿手改`,
    requires,
    '',
    'const game = {',
    fields,
    '};',
    GENERATED_END,
  ].join('\n');
  const hand = [
    '',
    '// —— 手写区（重新生成不会触碰）——',
    'module.exports = { game };',
    '',
  ].join('\n');
  return `${header}${section}${hand}`;
}

function root_specs(facades) {
  return [
    {
      kind: 'root-chara',
      file: 'chara.js',
      render: () =>
        render_chara_root(facades.filter((s) => s.kind === 'chara')),
    },
    {
      kind: 'root-game',
      file: 'game.js',
      render: () => render_game_root(facades.filter((s) => s.kind === 'game')),
    },
  ];
}

function build_facades(ownership_dir) {
  const facades = [];
  const skipped = [];
  // 二维角色表按属主域推广（#90）：一域一张 chara-<域>.js，域内多表按
  // TWO_DIM_TABLES 序分组；未命名的属主下标跳过并报告（cflag 的 kojo 切片
  // 仍是 #71 的全量真名门，缺名即抛错）。
  for (const domain of DOMAINS) {
    const groups = [];
    for (const table of TWO_DIM_TABLES) {
      const result = entries_for(table, domain, ownership_dir);
      skipped.push(...result.skipped);
      if (result.entries.length > 0) {
        groups.push({ table, entries: result.entries });
      }
    }
    if (groups.length === 0) {
      continue;
    }
    facades.push({
      kind: 'chara',
      domain,
      file: `chara-${domain}.js`,
      table: groups[0].table,
      entries: groups[0].entries,
      groups,
    });
  }
  // 一维按域重切（#71 原样）
  for (const domain of DOMAINS) {
    const groups = [];
    for (const table of ONE_DIM_TABLES) {
      const result = entries_for(table, domain, ownership_dir);
      skipped.push(...result.skipped);
      if (result.entries.length > 0) {
        groups.push({ table, entries: result.entries });
      }
    }
    if (groups.length === 0) {
      continue;
    }
    facades.push({
      kind: 'game',
      domain,
      file: `game-${domain}.js`,
      groups,
      table: groups[0].table,
      entries: groups[0].entries,
    });
  }
  return { facades, skipped };
}

function generate({
  ownership_dir = path.join(REPO_ROOT, 'ownership'),
  out_dir = path.join(REPO_ROOT, 'ere', 'facade'),
  force = false,
} = {}) {
  const { facades, skipped } = build_facades(ownership_dir);
  const results = [];
  const warnings = [];
  fs.mkdirSync(out_dir, { recursive: true });
  const all_specs = [
    ...facades.map((spec) => ({
      file: spec.file,
      body: render_wrapper(spec),
      section: () => render_generated_section(spec),
    })),
    ...root_specs(facades).map((spec) => ({
      file: spec.file,
      body: spec.render(),
      section: () => extract_generated_section(spec.render()),
    })),
  ];
  for (const spec of all_specs) {
    const target = path.join(out_dir, spec.file);
    if (!fs.existsSync(target)) {
      fs.writeFileSync(target, spec.body, 'utf8');
      results.push({ file: spec.file, status: 'written', target });
      continue;
    }
    if (!force) {
      results.push({ file: spec.file, status: 'skipped', target });
      continue;
    }
    const existing = fs.readFileSync(target, 'utf8');
    try {
      extract_generated_section(existing);
    } catch (error) {
      warnings.push(`拒绝重写 ${target}：${error.message}`);
      results.push({ file: spec.file, status: 'rejected', target });
      continue;
    }
    fs.writeFileSync(
      target,
      replace_generated_section(existing, spec.section()),
      'utf8',
    );
    results.push({ file: spec.file, status: 'updated', target });
  }
  return { results, warnings, facades, skipped };
}

function parse_args(argv) {
  const options = { force: false };
  for (const arg of argv) {
    if (arg === '--force' || arg === '-f') {
      options.force = true;
    } else {
      throw new Error(`未知参数：${arg}`);
    }
  }
  return options;
}

const STATUS_LABEL = {
  written: '写出',
  updated: '更新',
  skipped: '跳过（已存在，默认不覆盖；重写需 --force）',
  rejected: '拒绝重写（产物无 GENERATED 标记）',
};

function main(argv, overrides = {}) {
  let options;
  try {
    options = parse_args(argv);
  } catch (error) {
    console.error(`错误：${error.message}`);
    console.error('用法：node tools/gen-facade.js [--force]');
    return 2;
  }
  const report = generate({ ...overrides, force: options.force });
  report.warnings.forEach((warning) => console.warn(`警告：${warning}`));
  if (report.skipped.length > 0) {
    const by_domain = new Map();
    for (const item of report.skipped) {
      const key = `${item.domain}/${item.table}`;
      if (!by_domain.has(key)) {
        by_domain.set(key, []);
      }
      by_domain.get(key).push(item.index);
    }
    console.warn(
      `[gen-facade] 未命名（或名字不可作标识符）的属主下标跳过 ${report.skipped.length} 个（ownership 仍登记，门面等属主票带语义）：`,
    );
    for (const [key, indexes] of by_domain) {
      console.warn(`  ${key}: ${indexes.join(',')}`);
    }
  }
  for (const result of report.results) {
    const where = result.target
      ? ` → ${path.relative(REPO_ROOT, result.target)}`
      : '';
    console.log(
      `[gen-facade] ${result.file}：${STATUS_LABEL[result.status]}${where}`,
    );
  }
  return report.results.some((result) => result.status === 'rejected') ? 1 : 0;
}

const { facades: FACADES, skipped: SKIPPED } = build_facades(
  path.join(REPO_ROOT, 'ownership'),
);

module.exports = {
  DOMAINS,
  FACADES,
  GENERATED_END,
  GENERATED_START,
  ONE_DIM_TABLES,
  REPO_ROOT,
  SKIPPED,
  TWO_DIM_TABLES,
  YML_NAME_FILES,
  build_facades,
  entries_for,
  extract_generated_section,
  generate,
  list_owned_indexes,
  main,
  merged_name,
  parse_ownership,
  render_chara_root,
  render_game_root,
  render_generated_section,
  render_wrapper,
};

if (require.main === module) {
  process.exit(main(process.argv.slice(2)));
}
