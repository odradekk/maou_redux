/**
 * @file 变量包装层生成器：从 yml/ 静态变量表产出 ere/era-utils/ 访问器初稿（issue #18）。
 *
 * 决议依据：
 *   - #11：包装层「脚本出初稿、人工定稿」。生成区用 GENERATED 标记包裹，
 *     重新生成（--force）只替换标记之间的内容，标记外的手写区逐字节存活；
 *   - #10/#17 的产物边界规则：产物进 git、归人工维护，已存在时一律跳过，
 *     重写必须显式 --force。已有产物但找不到 GENERATED 标记时拒绝重写
 *     （无法区分生成内容与手写内容，宁可报错也不冒险，#10 的教训）；
 *   - #13：引擎对未声明序号返回 undefined 而非 0，且写入会静默建变量进存档。
 *     生成的 getter 一律 `|| 0` 兜底，底层寻址用数字下标（#5 决议）。
 *
 * 用法：node tools/gen-wrapper.js [--force]
 *   扫描 yml/ 下的变量表（键为中文显示名、值含 id/name/type 三字段的 yml），
 *   目前只支持渲染一维表白名单（global）。非变量表（如 GameBase.yml）自动跳过；
 *   变量表但渲染暂不支持的（如二维角色表）会打告警跳过，绝不生成错误寻址。
 *
 * 零第三方依赖。解析器只认引擎自带转换器产出的那种受约束形状
 * （引号键 + 缩进字段行），输入不符合即抛错，绝不静默丢弃。
 */

const fs = require('node:fs');
const path = require('node:path');

// 仓库根目录：tools/ 的上一级
const REPO_ROOT = path.resolve(__dirname, '..');

// 生成区分界标记。前缀匹配（允许标记行带追加说明），与 erauma/引擎生成器同款
const GENERATED_START = '// GENERATED START';
const GENERATED_END = '// GENERATED END';

// 目前支持渲染成一维访问器的表。二维角色表（base/abl/cflag/…）需要带角色
// 参数的模板，等对应子系统的票再扩展；不在白名单的变量表只会得到告警。
// flag 自 issue #22 起入白名单：#5 决议把 DAY/TIME/MONEY 与角色指针并入
// flag 条目（id 10000 保留区，见 yml/Flag.yml 头注）。
const RENDERABLE_ONE_DIM_TABLES = new Set(['global', 'flag']);

// 变量字段行：id / name / type（引擎三字段，见 #5 决议与 18-tools.md）
const FIELD_RE = /^\s+(id|name|type):\s*(.+?)\s*$/;
// 引号键行（JSON 风格转义）：引擎转换器与 csv-to-yml 的键名一律加引号
const QUOTED_KEY_RE = /^("(?:[^"\\]|\\.)*"):\s*$/;
// name 字段约束：英文 snake_case 标识符（#5 决议的渐进命名规则）
const NAME_RE = /^[a-z][a-z0-9_]*$/;
// 引擎认识的 type 取值（18-tools.md 的三字段结构）
const KNOWN_TYPES = new Set(['number', 'string']);

/**
 * 严格解析变量表 yml 文本 → 条目数组 [{key, id, name, type?}]（保持文件顺序）。
 *
 * 只认受约束形状：引号键行 + 缩进的 id/name/type 字段行。空行与 # 注释行跳过。
 * 抛错场景（全部大声报错）：裸键、无法理解的行、缺 id/name、重复键、
 * 重复 id（引擎要求序号唯一）、name 不是 snake_case、type 未认识。
 */
function parse_variable_yml(text) {
  const lines = text.split('\n');
  const entries = [];
  const index_by_key = new Map();
  const index_by_id = new Map();
  // 当前正在收集字段的条目；遇到下一个键行时校验并落账
  let current = null;

  const close_current = (at_line) => {
    if (!current) {
      return;
    }
    if (current.id === undefined) {
      throw new Error(`第 ${at_line} 行前：「${current.key}」缺少 id`);
    }
    if (current.name === undefined) {
      throw new Error(`第 ${at_line} 行前：「${current.key}」缺少 name`);
    }
    if (!NAME_RE.test(current.name)) {
      throw new Error(
        `「${current.key}」的 name「${current.name}」不是 snake_case 英文标识符`,
      );
    }
    if (current.type !== undefined && !KNOWN_TYPES.has(current.type)) {
      throw new Error(
        `「${current.key}」的 type「${current.type}」不在支持列表 ${[
          ...KNOWN_TYPES,
        ].join('/')} 内`,
      );
    }
    if (index_by_key.has(current.key)) {
      throw new Error(`键「${current.key}」重复出现`);
    }
    if (index_by_id.has(current.id)) {
      throw new Error(
        `id ${current.id} 重复：「${index_by_id.get(current.id)}」与「${current.key}」`,
      );
    }
    index_by_key.set(current.key, entries.length);
    index_by_id.set(current.id, current.key);
    entries.push(current);
    current = null;
  };

  for (let i = 0; i < lines.length; i += 1) {
    const raw = lines[i];
    const trimmed = raw.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }
    const key_match = QUOTED_KEY_RE.exec(trimmed);
    if (key_match) {
      close_current(i + 1);
      current = { key: JSON.parse(key_match[1]) };
      continue;
    }
    const field_match = FIELD_RE.exec(raw);
    if (field_match && current) {
      const [, field, raw_value] = field_match;
      if (field === 'id') {
        if (!/^-?\d+$/.test(raw_value)) {
          throw new Error(`第 ${i + 1} 行：id「${raw_value}」不是整数`);
        }
        current.id = Number(raw_value);
      } else {
        const quoted = /^"(?:[^"\\]|\\.)*"$/.test(raw_value);
        if (!quoted) {
          throw new Error(
            `第 ${i + 1} 行：${field} 值「${raw_value}」未加引号（约定一律双引号）`,
          );
        }
        current[field] = JSON.parse(raw_value);
      }
      continue;
    }
    throw new Error(
      `第 ${i + 1} 行无法解析：${raw.trim()}（只认「"键":」行与缩进的 id/name/type 字段行）`,
    );
  }
  close_current(lines.length);
  return entries;
}

/**
 * 宽松探测：文本是否为变量表形状。GameBase 那种扁平键值会得到 {ok: false}，
 * 供扫描目录时区分「不是变量表」（正常跳过）与「变量表但解析失败」（应当报错）。
 */
function try_parse_variable_yml(text) {
  try {
    const entries = parse_variable_yml(text);
    return { ok: true, entries };
  } catch (error) {
    return { ok: false, reason: error.message };
  }
}

// —— 渲染 ——

// type → JSDoc 类型与未初始化兜底值。#13：引擎对未声明序号返回 undefined，
// getter 必须 `|| 兜底`；number 用 0（引擎声明表初始化值），string 暂未支持渲染
const TYPE_RENDER = {
  number: { js_type: 'number', fallback: '0' },
};

// 单个变量的 getter/setter 对（含中文 JSDoc 与双向寻址注释）
function render_entry(table, entry) {
  const render_type = TYPE_RENDER[entry.type ?? 'number'];
  if (!render_type) {
    throw new Error(
      `「${entry.key}」的 type「${entry.type}」暂不支持渲染（当前仅 number）`,
    );
  }
  const address = `${table}:${entry.id}`;
  // 原作侧寻址注释：一维表名大写即 Emuera 数组名（global ↔ GLOBAL）
  const legacy = `${table.toUpperCase()}:${entry.id}`;
  return [
    '  /**',
    `   * ${entry.key}（${address} ↔ ${legacy}）`,
    `   * @returns {${render_type.js_type}}`,
    '   */',
    `  get ${entry.name}() {`,
    `    return era.get('${address}') || ${render_type.fallback};`,
    '  },',
    '  /**',
    `   * @param {${render_type.js_type}} v`,
    '   */',
    `  set ${entry.name}(v) {`,
    `    era.set('${address}', v);`,
    '  },',
  ].join('\n');
}

/**
 * 渲染生成区（含首末标记行）。重新生成时只替换这一段，标记外的手写区不动。
 */
function render_generated_section(table, entries, { source_file }) {
  const var_name = `era_${table}`;
  const lines = [
    `${GENERATED_START} —— tools/gen-wrapper.js 自 yml/${source_file} 生成，勿手改；重新生成（--force）只替换本标记之间`,
    `const ${var_name} = {`,
    ...entries.map((entry) => render_entry(table, entry)),
    '};',
    GENERATED_END,
  ];
  return `${lines.join('\n')}\n`;
}

/**
 * 定位生成区标记：返回 {start, end}（含标记行的下标）。要求恰好一对、
 * 起点在终点之前，否则抛错——extract 与 replace 共用同一份严格性，
 * 多标记时 replace 不会静默取第一个。
 */
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

/**
 * 从已有产物中摘出生成区（含首末标记行）。找不到唯一一对标记时抛错。
 */
function extract_generated_section(text) {
  const lines = text.split('\n');
  const { start, end } = locate_markers(lines);
  return `${lines.slice(start, end + 1).join('\n')}\n`;
}

/**
 * 重生成：只替换标记之间的行，标记之外（文件头、手写区）逐字节保留。
 * 标记定位与唯一性校验和 extract 共用 locate_markers。
 */
function replace_generated_section(text, section) {
  const lines = text.split('\n');
  const { start, end } = locate_markers(lines);
  const merged = [
    ...lines.slice(0, start),
    ...section.split('\n'),
    ...lines.slice(end + 1),
  ];
  // split 会在末尾留一个空串元素，重新 join 后保持文件以单个换行结尾的约定
  return `${merged.join('\n')}`;
}

/**
 * 扫描 yml 目录并产出访问器。逐文件回报，绝不静默跳过：
 *   written      新产物写出
 *   updated      --force 重生成，只替换了生成区
 *   skipped      产物已存在且未加 --force（#10/#17 产物边界）
 *   not-variable 不是变量表形状（如 GameBase.yml），正常不处理
 *   unsupported  是变量表但渲染暂不支持（如二维角色表），告警跳过
 *   rejected     --force 但产物无 GENERATED 标记，拒绝覆写（防销毁手写内容）
 */
function generate({ yml_dir, out_dir, force = false }) {
  const results = [];
  const warnings = [];
  const files = fs
    .readdirSync(yml_dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.ya?ml$/i.test(entry.name))
    .map((entry) => entry.name)
    .sort();

  for (const file of files) {
    const text = fs.readFileSync(path.join(yml_dir, file), 'utf8');
    const parsed = try_parse_variable_yml(text);
    if (!parsed.ok) {
      results.push({ file, status: 'not-variable' });
      continue;
    }
    const table = path.basename(file, path.extname(file)).toLowerCase();
    if (!RENDERABLE_ONE_DIM_TABLES.has(table)) {
      const message = `yml/${file} 是变量表但「${table}」不在渲染白名单（一维：${[
        ...RENDERABLE_ONE_DIM_TABLES,
      ].join('/')}），已跳过——二维角色表等待对应子系统的票扩展模板`;
      warnings.push(message);
      results.push({ file, table, status: 'unsupported' });
      continue;
    }

    const target = path.join(out_dir, `era-${table}.js`);
    if (!fs.existsSync(target)) {
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(
        target,
        render_wrapper(table, parsed.entries, { source_file: file }),
        'utf8',
      );
      results.push({ file, table, status: 'written', target });
      continue;
    }
    if (!force) {
      results.push({ file, table, status: 'skipped', target });
      continue;
    }
    const existing = fs.readFileSync(target, 'utf8');
    try {
      extract_generated_section(existing);
    } catch (error) {
      warnings.push(
        `拒绝重写 ${target}：${error.message}。无法区分生成内容与手写内容，请人工合并`,
      );
      results.push({ file, table, status: 'rejected', target });
      continue;
    }
    fs.writeFileSync(
      target,
      replace_generated_section(
        existing,
        render_generated_section(table, parsed.entries, { source_file: file }),
      ),
      'utf8',
    );
    results.push({ file, table, status: 'updated', target });
  }
  return { results, warnings };
}

/**
 * 渲染整份新文件骨架：文件头 + era 引用 + 生成区 + 手写区起点。
 * 只在产物不存在时使用；之后的手写区演进由人接管，重生成不再碰它。
 */
function render_wrapper(table, entries, { source_file }) {
  const var_name = `era_${table}`;
  const section = render_generated_section(table, entries, { source_file });
  const header = [
    '/**',
    ` * @file ${table} 表的具名访问器初稿（tools/gen-wrapper.js 自 yml/${source_file} 生成）。`,
    ' *',
    ' * 生成区（GENERATED 标记之间）由脚本维护，重生成加 --force；',
    ' * 标记之外是手写区：变量语义补注、业务方法，重新生成不会触碰（#11 决议）。',
    ' * 变量的原作语义与来源写进手写区补注（AGENTS.md「变量语义必须注释」）。',
    ' */',
    '',
    "const era = require('#/era-electron');",
    '',
    '',
  ].join('\n');
  const hand_zone = [
    '',
    '// —— 手写区（重新生成不会触碰）——',
    '// 变量语义补注（原作语义 + 来源文件）与业务方法写在这里。',
    `module.exports = ${var_name};`,
    '',
  ].join('\n');
  return `${header}${section}${hand_zone}`;
}

// CLI 的状态文案（与 csv-to-yml 的报告风格一致：写出/更新/跳过 + 原因）
const STATUS_LABEL = {
  written: '写出',
  updated: '更新',
  skipped: '跳过（已存在，默认不覆盖；重写需 --force）',
  'not-variable': '非变量表，不处理',
  unsupported: '变量表但渲染暂不支持，已跳过',
  rejected: '拒绝重写（产物无 GENERATED 标记）',
};

// 解析命令行参数；未知参数报用法
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

// CLI 入口。overrides 供测试注入临时路径，默认相对仓库根。
// 退出码：0 正常；1 有 rejected（需要人工处理）；2 用法错误。
function main(argv, { yml_dir, out_dir } = {}) {
  let options;
  try {
    options = parse_args(argv);
  } catch (error) {
    console.error(`错误：${error.message}`);
    console.error('用法：node tools/gen-wrapper.js [--force]');
    return 2;
  }

  const report = generate({
    yml_dir: yml_dir ?? path.join(REPO_ROOT, 'yml'),
    out_dir: out_dir ?? path.join(REPO_ROOT, 'ere', 'era-utils'),
    force: options.force,
  });

  report.warnings.forEach((warning) => console.warn(`警告：${warning}`));
  for (const result of report.results) {
    const where = result.target
      ? ` → ${path.relative(REPO_ROOT, result.target)}`
      : '';
    console.log(
      `[gen-wrapper] yml/${result.file}：${STATUS_LABEL[result.status]}${where}`,
    );
  }
  return report.results.some((result) => result.status === 'rejected') ? 1 : 0;
}

module.exports = {
  GENERATED_END,
  GENERATED_START,
  RENDERABLE_ONE_DIM_TABLES,
  REPO_ROOT,
  extract_generated_section,
  generate,
  main,
  parse_variable_yml,
  render_generated_section,
  render_wrapper,
  try_parse_variable_yml,
};

if (require.main === module) {
  process.exit(main(process.argv.slice(2)));
}
