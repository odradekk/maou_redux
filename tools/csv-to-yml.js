/**
 * @file 静态表转换器：ere 版 GameBase CSV → 引擎 YAML（issue #17）。
 *
 * 一次性转换、默认不覆盖（issue #10 的产物边界规则）：产物进 git、归人工维护，
 * 已存在时一律跳过，重写必须显式 --force。规则有测试钉死，防止一句清理代码
 * 让它失效（#10 的原型曾因此销毁人工修改）。
 *
 * 用法：node tools/csv-to-yml.js [--force]
 *   默认输入 csv/GameBase.csv，输出 yml/GameBase.yml（相对仓库根目录）。
 *
 * 解析逻辑逐行镜像引擎（ere-4.8.0 的 background.js，parseDataFile 模块），
 * 保证「引擎读 CSV 得到什么，本脚本就拿到什么」；YAML 侧的等价性由
 * test/csv-to-yml.test.js 用引擎两条加载路径的镜像互证。
 *
 * 零第三方依赖；编码识别用内置 TextDecoder（Shift-JIS 兜底，issue #10 陷阱一）。
 * 注意：转换的输入是 ere 版 CSV（csv/GameBase.csv），不是 target/ 的 Emuera 原版。
 */

const fs = require('node:fs');
const path = require('node:path');
const { TextDecoder } = require('node:util');

// 仓库根目录：tools/ 的上一级
const REPO_ROOT = path.resolve(__dirname, '..');

// 引擎的 gamebase 键名映射（background.js 模块 676 的 nameMapping.gamebase 原样摘录）。
// 引擎启动时还会补上「小写规范名 → 规范名」（如 gamecode → gameCode），见下方 known_keys。
const GAMEBASE_NAME_MAPPING = {
  作者: 'author',
  追加信息: 'info',
  追加情報: 'info',
  发布时间: 'year',
  製作年: 'year',
  游戏名称: 'title',
  タイトル: 'title',
  游戏标识: 'gameCode',
  コード: 'gameCode',
  初始角色编号: 'defaultChara',
  最初からいるキャラ: 'defaultChara',
  版本: 'version',
  バージョン: 'version',
  版本代号: 'versionName',
  バージョン名: 'versionName',
  最低支持版本: 'allowVersion',
  バージョン違い認める: 'allowVersion',
  发布页: 'site',
  版本情报url: 'site',
  バージョン情報url: 'site',
  游戏图标: 'icon',
  版本检查: 'versionCheck',
  程序更新: 'baseZip',
};

// GameBase 必填字段（dev-guides/09-static.md 的【必填】列，规范名表示）
const REQUIRED_GAMEBASE_FIELDS = [
  'title',
  'author',
  'info',
  'year',
  'gameCode',
  'version',
  'allowVersion',
];

// 引擎认可的全部键名（小写）：映射表的键 + 规范名。
// 引擎启动时还会把「规范名的小写 → 规范名」（如 gamecode → gameCode）补进
// 映射表（background.js 的 eraStart），augmented_mapping 镜像该补全后的表。
const augmented_mapping = { ...GAMEBASE_NAME_MAPPING };
for (const canonical of Object.values(GAMEBASE_NAME_MAPPING)) {
  const lower = canonical.toLowerCase();
  if (!(lower in augmented_mapping)) {
    augmented_mapping[lower] = canonical;
  }
}
const known_keys = new Set(
  Object.keys(augmented_mapping).map((key) => key.toLowerCase()),
);

// 键名 → 规范名的映射，与引擎 gamebase 分支同构：
// 补全后的 nameMapping.gamebase[小写键] || 小写键
function map_gamebase_key(key) {
  const lower = String(key).toLowerCase();
  return augmented_mapping[lower] ?? lower;
}

// 引擎的 getNumber 镜像（background.js 模块 65）：
// Number() 能转就转（比十进制正则宽：'1e3'、'0x10' 也转），NaN 则原样返回
function engine_get_number(value) {
  const converted = Number(value);
  return Number.isNaN(converted) ? value : converted;
}

// 编码识别（issue #10 已验证的逻辑）：BOM → 严格 UTF-8 校验 → Shift-JIS 兜底。
// 严格校验 = 解码再编码回去字节必须一致，避免汉化内容被静默替换成 U+FFFD。
function read_text(file) {
  const buf = fs.readFileSync(file);
  if (
    buf.length >= 3 &&
    buf[0] === 0xef &&
    buf[1] === 0xbb &&
    buf[2] === 0xbf
  ) {
    return { text: buf.slice(3).toString('utf8'), enc: 'utf8-bom' };
  }
  const as_utf8 = buf.toString('utf8');
  if (Buffer.compare(Buffer.from(as_utf8, 'utf8'), buf) === 0) {
    return { text: as_utf8, enc: 'utf8' };
  }
  return { text: new TextDecoder('shift_jis').decode(buf), enc: 'shift_jis' };
}

// 解析 ere 版 GameBase CSV，逐行为引擎 parseDataFile 的 csv 分支镜像：
//   全文剥除 \s*;[^\n]*（含行内注释）→ 按行、按逗号切 → trim → 去空串 →
//   getNumber → 丢弃单元素行 → 非 chara/item/res 表一律截断为前两列
// 在镜像之上补三类告警（绝不静默丢弃，issue #10 第 5 问）：
//   超两列截断、重复键后者覆盖（引擎对象语义）、未知键（引擎会存下但不被读取）
function parse_gamebase_csv(text) {
  const warnings = [];
  const rows = [];
  const stripped = text.replace(/\s*;[^\n]*/g, '');
  for (const line of stripped.split('\n')) {
    const cols = line
      .split(',')
      .map((cell) => cell.replace(/(^\s+|\s+$)/, ''))
      .filter(Boolean)
      .map(engine_get_number);
    if (cols.length < 2) {
      continue;
    }
    if (cols.length > 2) {
      warnings.push(
        `「${cols[0]}」一行超过两列，第 3 列起被忽略（引擎同样只取前两列）`,
      );
    }
    rows.push([cols[0], cols[1]]);
  }

  // 重复键：引擎的 yml/json 分支是 Object.entries，后者覆盖前者。
  // 转换器按同一语义去重（保持首次出现的位置），否则会产出带重复键的 YAML。
  const entries = [];
  const index_by_key = new Map();
  for (const row of rows) {
    if (index_by_key.has(String(row[0]))) {
      entries[index_by_key.get(String(row[0]))] = row;
      warnings.push(`键「${row[0]}」重复，后者覆盖前者（引擎对象语义）`);
    } else {
      index_by_key.set(String(row[0]), entries.length);
      entries.push(row);
    }
  }

  for (const [key] of entries) {
    if (!known_keys.has(String(key).toLowerCase())) {
      warnings.push(
        `键「${key}」不在引擎的 GameBase 键名表内，引擎会存下但不会读取`,
      );
    }
  }

  const present_fields = new Set(entries.map(([key]) => map_gamebase_key(key)));
  for (const field of REQUIRED_GAMEBASE_FIELDS) {
    if (!present_fields.has(field)) {
      warnings.push(`缺少必填字段「${field}」，引擎启动时可能表现异常`);
    }
  }

  return { entries, warnings };
}

// YAML 标量输出：数值裸写（YAML 原生 Number）；字符串一律双引号。
// 引擎的 yml 分支解析后对字符串还会过一遍 getNumber，因此数值两种写法殊途同归，
// 但裸写与 CSV 路径的类型推断一致，直接采用。
// 键名无论内容一律 JSON.stringify——引擎自带转换器裸写键名，
// 键含 ':' '#' 或首尾空格时会产出无法解析的 YAML（issue #10 实测陷阱）。
function to_gamebase_yaml(entries) {
  const lines = [
    '# 转换自 GameBase.csv（tools/csv-to-yml.js，issue #17）',
    '# 本文件归人工维护：转换器重跑默认不覆盖，需要重新生成请加 --force',
  ];
  for (const [key, value] of entries) {
    lines.push(`${JSON.stringify(key)}: ${JSON.stringify(value)}`);
  }
  return `${lines.join('\n')}\n`;
}

// 产物写出（产物边界规则的核心）：已存在且无 force 一律跳过。
// 除此之外不做任何清理——#10 的教训：一句无条件删除就能让本检查形同虚设。
function write_product(target, content, { force = false } = {}) {
  if (fs.existsSync(target) && !force) {
    return { status: 'skipped', target };
  }
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content, 'utf8');
  return { status: 'written', target };
}

// 组装一次转换：读入 → 解析 → 生成 → 落盘。空表拒绝写出（GameBase 缺失引擎拒绝启动）。
function convert({ input, output, force = false }) {
  const { text, enc } = read_text(input);
  const { entries, warnings } = parse_gamebase_csv(text);
  if (entries.length === 0) {
    throw new Error('输入中没有可用的 GameBase 条目，检查文件内容与格式');
  }
  const result = write_product(output, to_gamebase_yaml(entries), { force });
  return { status: result.status, output, warnings, enc };
}

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
function main(argv, { input, output } = {}) {
  let options;
  try {
    options = parse_args(argv);
  } catch (error) {
    console.error(`错误：${error.message}`);
    console.error('用法：node tools/csv-to-yml.js [--force]');
    return 2;
  }

  const resolved_input = input ?? path.join(REPO_ROOT, 'csv', 'GameBase.csv');
  const resolved_output = output ?? path.join(REPO_ROOT, 'yml', 'GameBase.yml');

  let report;
  try {
    report = convert({
      input: resolved_input,
      output: resolved_output,
      force: options.force,
    });
  } catch (error) {
    console.error(`错误：${error.message}`);
    return 1;
  }

  report.warnings.forEach((warning) => console.warn(`警告：${warning}`));
  const written = report.status === 'written' ? 1 : 0;
  console.log(
    `[csv-to-yml] 编码 ${report.enc}；写出 ${written} 个 / 跳过 ${
      1 - written
    } 个 → ${resolved_output}` +
      (report.status === 'skipped'
        ? '（已存在，默认不覆盖；重写需 --force）'
        : ''),
  );
  return 0;
}

module.exports = {
  REPO_ROOT,
  convert,
  engine_get_number,
  main,
  map_gamebase_key,
  parse_gamebase_csv,
  read_text,
  to_gamebase_yaml,
  write_product,
};

if (require.main === module) {
  process.exit(main(process.argv.slice(2)));
}
