/**
 * @file 域门面生成器（issue #71）：按区段所有权把变量访问器切成
 * `chara(cid).<域>.<字段>` 与 `game.<域>.<字段>`。
 *
 * 本票只落两块：
 *   1. 一维表（flag/tflag/item/global）按域重切——与既有 era_flag / era_global
 *      并存；一维重切本身不强制迁移，口上域两个样本本票已迁；
 *   2. 二维角色表的口上域切片（cflag 属主 kojo 的 110 个下标）。
 *
 * 决议：docs/adr/0001-engine-tables-as-single-source-of-truth.md。
 * 所有权：ownership/<表>-ownership.yml（#70）。命名：tools/facade-names.js。
 *
 * 用法：node tools/gen-facade.js [--force]
 * 产物边界与 gen-wrapper 同款：已存在默认跳过，重写须 --force；只替换
 * GENERATED 标记之间，手写区逐字节存活。
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');

const { get_name } = require('./facade-names');

const REPO_ROOT = path.resolve(__dirname, '..');
const GENERATED_START = '// GENERATED START';
const GENERATED_END = '// GENERATED END';

const ONE_DIM_TABLES = ['flag', 'tflag', 'item', 'global'];
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

function entries_for(table, domain, ownership_dir, lookup = get_name) {
  const indexes = list_owned_indexes(table, domain, ownership_dir);
  return indexes.map((index) => {
    const named = lookup(table, index);
    if (!named) {
      throw new Error(
        `命名表缺 ${table}:${index}（属主 ${domain}）——先补 tools/facade-names.js，绝不静默用数字当下标名`,
      );
    }
    return { table, index, name: named.name, source: named.source };
  });
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
  const legacy = `${table.toUpperCase()}:${index}`;
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
      `${GENERATED_START} —— tools/gen-facade.js 自 ownership + tools/facade-names.js 生成，勿手改`,
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
    `${GENERATED_START} —— tools/gen-facade.js 自 ownership + tools/facade-names.js 生成，勿手改`,
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
    ` * 形状：game.${spec.domain}.<字段>。与 era_flag / era_global 并存。一维重切不强制迁移；口上域样本本票已迁。`,
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
    ' * 与 era_flag / era_global 并存。一维重切不强制迁移；口上域样本本票已迁。域切片文件在 game-<域>.js。',
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
  const kojo_cflag = {
    table: 'cflag',
    entries: entries_for('cflag', 'kojo', ownership_dir),
  };
  facades.push({
    kind: 'chara',
    domain: 'kojo',
    file: 'chara-kojo.js',
    table: 'cflag',
    entries: kojo_cflag.entries,
    groups: [kojo_cflag],
  });
  for (const domain of DOMAINS) {
    const groups = [];
    for (const table of ONE_DIM_TABLES) {
      const entries = entries_for(table, domain, ownership_dir);
      if (entries.length > 0) {
        groups.push({ table, entries });
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
  return facades;
}

function generate({
  ownership_dir = path.join(REPO_ROOT, 'ownership'),
  out_dir = path.join(REPO_ROOT, 'ere', 'facade'),
  force = false,
} = {}) {
  const facades = build_facades(ownership_dir);
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
  return { results, warnings, facades };
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

const FACADES = build_facades(path.join(REPO_ROOT, 'ownership'));

module.exports = {
  DOMAINS,
  FACADES,
  GENERATED_END,
  GENERATED_START,
  ONE_DIM_TABLES,
  REPO_ROOT,
  build_facades,
  entries_for,
  extract_generated_section,
  generate,
  list_owned_indexes,
  main,
  parse_ownership,
  render_chara_root,
  render_game_root,
  render_generated_section,
  render_wrapper,
};

if (require.main === module) {
  process.exit(main(process.argv.slice(2)));
}
