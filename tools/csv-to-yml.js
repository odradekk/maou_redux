/**
 * @file 静态表转换器：CSV → 引擎 YAML（#17 GameBase，#35 角色表，#38 变量表）。
 *
 * 一次性转换、默认不覆盖（issue #10 的产物边界规则）：产物进 git、归人工维护，
 * 已存在时一律跳过，重写必须显式 --force。规则有测试钉死，防止一句清理代码
 * 让它失效（#10 的原型曾因此销毁人工修改）。
 *
 * 用法：node tools/csv-to-yml.js [--force] [--chara <编号|all>] [--table <表名>]
 *   默认输入 csv/GameBase.csv，输出 yml/GameBase.yml（相对仓库根目录）。
 *   csv/ 目录已随 #17 迁移移除，默认路径仅供 --force 重转时参考（原始输入
 *   从 git 历史取回）。
 *   --chara 0       转换 target/CSV/Chara/Chara0.csv → yml/Chara0.yml，
 *                   编号可逗号分隔（--chara 31,32）；all 为全部 45 个。
 *   --table talent  转换 target/CSV/Talent.csv → yml/Talent.yml（表名不分
 *                   大小写，按磁盘文件名解析），可逗号分隔（--table talent,item）。
 *                   item 表是唯一带第三列（价格）的变量表（引擎 parseDataFile
 *                   对非 chara/item/res 表一律截断为前两列）。
 *
 * 解析逻辑逐行镜像引擎（ere-4.8.0 的 background.js，parseDataFile 模块），
 * 保证「引擎读 CSV 得到什么，本脚本就拿到什么」；YAML 侧的等价性由
 * test/csv-to-yml.test.js、test/chara-yml.test.js 与 test/variable-yml.test.js
 * 验证——后两者直接驱动引擎自己的解析器与装载循环对拍（#17 的实机验证手法
 * 固化为测试，#35/#38）。
 *
 * 零第三方依赖；编码识别用内置 TextDecoder（Shift-JIS 兜底，issue #10 陷阱一）。
 * 注意：GameBase 转换的输入是 ere 版 CSV（csv/GameBase.csv）；角色表与变量表
 * 转换的输入是 target/ 的 Emuera 原版（只读输入，未删）。
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

// 引擎的角色表键名映射（background.js 模块 676 的 nameMapping.chara 原样摘录，
// issue #35）。第一列可用「名称/变量名/别名」任一，未列出的表名（如 cstr、
// 扩展表）原样通过。#35 实测 45 个源文件只用到其中一小部分。
const CHARA_NAME_MAPPING = {
  番号: 'id',
  角色编号: 'id',
  名前: 'name',
  姓名: 'name',
  あだ名: 'title',
  别名: 'title',
  称号: 'title',
  呼び名: 'callname',
  默认称呼: 'callname',
  callname_to: 'callname',
  称呼: 'callname',
  基础属性: 'base',
  基礎: 'base',
  技能: 'abl',
  能力: 'abl',
  特性: 'talent',
  特质: 'talent',
  素質: 'talent',
  角色flag: 'cflag',
  フラグ: 'cflag',
  角色str: 'cstr',
  信赖: 'relation',
  相性: 'relation',
  装备: 'equip',
  装着物: 'equip',
  刻印: 'mark',
  经验: 'exp',
  経験: 'exp',
  珠: 'juel',
  宝珠: 'juel',
  jewel: 'juel',
};

// 引擎装载循环认可的全部规范名（映射表的值即全部内置表名 + id/name/title，
// 引擎对未列出的键按小写原样当表名用，故无需另列）。
// 用于「未知键」告警——引擎对未知键走到 default 分支后因缺表记一条错误。
const KNOWN_CHARA_KEYS = new Set(Object.values(CHARA_NAME_MAPPING));

// 键名 → 规范名，与引擎装载循环同构：nameMapping.chara[小写键] || 小写键
function map_chara_key(key) {
  const lower = String(key).toLowerCase();
  return CHARA_NAME_MAPPING[lower] ?? lower;
}

// 两列行折进嵌套映射时的显式值 = 引擎装载循环的缺省（background.js：
// null != o || (o = "cstr" === i ? "" : 1)）。CSV 的两列行第三列为空、被
// 过滤掉，引擎靠这条缺省补 1（cstr 表补 ''）；YAML 的嵌套映射必然写出第
// 三列，显式写同一个缺省值即逐字段等价。
function chara_default_value(raw_key) {
  return map_chara_key(raw_key) === 'cstr' ? '' : 1;
}

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

// —— 角色表（issue #35）——
//
// CSV 形状：同一个第一列会重复出现多行（引擎 csv 分支对 chara 表不截断、
// 保留全部列）；两列行 `[键, 变量]` 的值列是引擎缺省（talent 等 → 1、
// cstr → ''），三列行 `[键, 变量, 值]` 是完整预设。
//
// YAML 形状（引擎 yml 分支 s() 的 chara case，dev-guides/09-static.md 的
// Chara0000.yml 示例同款）：顶层标量 → 两列行；顶层嵌套映射 → 每个条目
// 一条三列行。故分组规则：
//   恰好一行且为两列 → 顶层标量（如 番号/名前/呼び名）；
//   其余（多行、或含三列行）→ 嵌套映射，两列行折成 `变量: 缺省值`。
//
// 不可表达即拒绝：callname/relation 的两列行走 r[i]=t[1]、三列行落
// relationship 表，折成嵌套后两列行会被改道，语义无法保真——转换器直接
// 抛错而不是产出不等价的 YAML（实测 45 个源文件没有这种形状）。

// 解析角色表 CSV，产出有序分组：[{ key, kind: 'scalar', value } |
// { key, kind: 'nested', entries: Map<变量, 值> }]，附告警
function parse_chara_csv(text) {
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
      continue; // 引擎丢弃单元素行
    }
    if (cols.length > 3) {
      warnings.push(
        `「${cols[0]}」一行超过三列，第 4 列起被忽略（引擎装载循环只读第 2/3 列）`,
      );
    }
    rows.push(cols.slice(0, 3));
  }

  const groups = new Map(); // 第一列（String）→ { kind, value?, entries?, two_cell, three_cell }
  const to_nested = (group) => {
    if (group.kind !== 'nested') {
      // 首个两列行记录在 value 里；转嵌套时它折成 `value: 缺省`
      const first = group.value;
      group.kind = 'nested';
      group.entries = new Map();
      if (first !== undefined) {
        group.entries.set(String(first), chara_default_value(group.raw_key));
      }
    }
    return group;
  };
  const set_two_cell = (group, second) => {
    const key = String(second);
    const value = chara_default_value(group.raw_key);
    if (group.entries.has(key) && group.entries.get(key) !== value) {
      warnings.push(
        `键「${group.raw_key}」的变量「${second}」重复且取值不同，后者覆盖前者（引擎对象语义）`,
      );
    }
    group.entries.set(key, value);
  };

  for (const [raw_key, second, third] of rows) {
    const key = String(raw_key);
    let group = groups.get(key);
    if (!group) {
      group = { raw_key: key, kind: 'pending', two_cell: 0, three_cell: 0 };
      groups.set(key, group);
    }
    if (third === undefined) {
      group.two_cell += 1;
      if (group.kind === 'pending') {
        group.kind = 'scalar';
        group.value = second;
      } else {
        set_two_cell(to_nested(group), second);
      }
    } else {
      group.three_cell += 1;
      const nested = to_nested(group);
      const sub_key = String(second);
      if (
        nested.entries.has(sub_key) &&
        nested.entries.get(sub_key) !== third
      ) {
        warnings.push(
          `键「${key}」的变量「${second}」重复且取值不同，后者覆盖前者（引擎对象语义）`,
        );
      }
      nested.entries.set(sub_key, third);
    }
  }

  const result = [];
  for (const group of groups.values()) {
    if (!KNOWN_CHARA_KEYS.has(map_chara_key(group.raw_key))) {
      warnings.push(
        `键「${group.raw_key}」不在引擎的角色表键名表内，装载时按扩展表名处理`,
      );
    }
    const mapped = map_chara_key(group.raw_key);
    const is_multi = group.two_cell + group.three_cell > 1;
    if (
      (mapped === 'callname' || mapped === 'relation') &&
      is_multi &&
      group.kind === 'nested'
    ) {
      throw new Error(
        `键「${group.raw_key}」（${mapped}）混用两列/三列行或多行重复，` +
          'YAML 形状无法等价表达（两列行会改道），拒绝转换',
      );
    }
    if (is_multi && ['id', 'name', 'title'].includes(mapped)) {
      warnings.push(
        `键「${group.raw_key}」（${mapped}）出现多行，按引擎语义后者覆盖前者`,
      );
    }
    result.push(group);
  }
  return { groups: result, warnings };
}

// 角色表 YAML：键名一律双引号（JSON.stringify，同 GameBase 约定）；数值裸写、
// 字符串双引号。嵌套映射用块风格、两空格缩进（dev-guides 示例同款）。
function to_chara_yaml(groups, { source = '' } = {}) {
  const lines = [
    `# 转换自 target/CSV/Chara/${source}（tools/csv-to-yml.js，issue #35）`,
    '# 本文件归人工维护：转换器重跑默认不覆盖，需要重新生成请加 --force --chara <编号>',
  ];
  for (const group of groups) {
    const key = JSON.stringify(group.raw_key);
    if (group.kind === 'scalar') {
      lines.push(`${key}: ${JSON.stringify(group.value)}`);
    } else {
      lines.push(`${key}:`);
      for (const [sub_key, value] of group.entries) {
        lines.push(`  ${JSON.stringify(sub_key)}: ${JSON.stringify(value)}`);
      }
    }
  }
  return `${lines.join('\n')}\n`;
}

// —— 变量表（issue #38）——
//
// CSV 形状：每行 [序号, 名称]（item 表额外带第三列价格；引擎 csv 分支对非
// chara/item/res 表截断为前两列，item 表保留全列——第 4 列起会被装载循环
// 记进 fieldNames 的开发套件键 k）。
//
// YAML 形状（dev-guides/09-static.md 的变量数据表示例，引擎 yml 分支 s()
// 把 {名称: {id, price}} 展开为行 [id, 名称, price]）：顶层键 = 变量名，
// 值为嵌套映射，item 表带 price。#5 决议的 name/type 元数据字段本形状不写
// ——渐进命名，等对应子系统移植时再补。
//
// 装载语义（eraStart 变量表分支，逐句镜像）：
//   - 序号重复：从给定序号起自增到第一个空位（引擎 s() 函数），告警；
//   - 名称重复：name→id 后者覆盖前者、序号各自保留（引擎对象语义）。
//     yml 以名称为键，同名双序号无法表达——产物保留后者（与 name→id 语义
//     一致），先出现的序号记入 dropped 并告警。实测 Item.csv 有 5 对重名
//     （1000-1004 与 1005-1009，名称与价格完全相同），引擎自带的格式转换
//     器（app.asar 模块 682）对这种形状同样有损（同名键写两遍，yml 解析
//     先者胜），非本转换器引入的偏差，详见 issue #38 评论。

// 解析变量表 CSV，产出 { entries, dropped, warnings }：
//   entries 按首次出现的位置排序、同名取后者的值（对象键序语义）；
//   dropped 是被同名后者顶掉的前行（仅告警与产物头注用，不写进 YAML）
function parse_variable_csv(text, { table } = {}) {
  const is_item = table === 'item';
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
      continue; // 引擎丢弃单元素行
    }
    if (!is_item && cols.length > 2) {
      warnings.push(
        `序号 ${cols[0]} 一行第 3 列起被引擎截断（非 item 变量表只读前两列）`,
      );
    }
    if (is_item && cols.length > 3) {
      warnings.push(
        `序号 ${cols[0]}「${cols[1]}」第 4 列「${cols[3]}」非注释文本：` +
          '引擎装载会把它记进 fieldNames 的开发套件键（k），产物按文档形状' +
          `不写该列，k 回落为缺省 item${cols[0]}（仅影响开发套件命名）`,
      );
    }
    if (is_item && cols.length === 2) {
      warnings.push(
        `序号 ${cols[0]}「${cols[1]}」缺价格列：引擎 csv 路径记 undefined、` +
          'yml 路径记 null，产物不写 price 字段以贴近 csv 侧',
      );
    }
    rows.push(is_item ? cols.slice(0, 3) : cols.slice(0, 2));
  }

  // 序号去重：镜像引擎 s()——被占用则自增到第一个空位，告警原文同构
  const taken_names = new Map(); // 序号(String) → 名称，对应引擎 fieldNames 的占用
  const entries = [];
  const index_by_name = new Map();
  const dropped = [];
  for (const [raw_id, name, price] of rows) {
    let id = raw_id;
    while (taken_names.has(String(id))) {
      id = engine_get_number(Number(id) + 1);
    }
    if (String(id) !== String(raw_id)) {
      warnings.push(
        `${table}.csv 出现重复变量序号! 变量 ${name} 的序号 ${raw_id} ` +
          `已被分配给 ${taken_names.get(String(raw_id))}! 序号重置为 ${id}`,
      );
    }
    taken_names.set(String(id), name);

    const entry = is_item
      ? { id, name, ...(price !== undefined ? { price } : {}) }
      : { id, name };
    if (index_by_name.has(String(name))) {
      const old_index = index_by_name.get(String(name));
      const old = entries[old_index];
      dropped.push(old);
      warnings.push(
        `名称「${name}」重复（序号 ${old.id} 与 ${id}）：引擎 name→id ` +
          '后者覆盖前者、序号各自保留；yml 以名称为键无法表达双序号，产物' +
          `保留后者，序号 ${old.id} 的 *name/*price 寻址将不可用`,
      );
      entries[old_index] = entry; // 保持首次出现的位置（对象键序语义）
    } else {
      index_by_name.set(String(name), entries.length);
      entries.push(entry);
    }
  }
  return { entries, dropped, warnings };
}

// 变量表 YAML：键名一律双引号（同 GameBase/角色表约定）；id/price 数值裸写。
// 重名合并的先例写进头注（产物归人工维护，偏差必须自文档化）。
function to_variable_yaml(entries, dropped, { table, source } = {}) {
  const lines = [
    `# 转换自 target/CSV/${source}（tools/csv-to-yml.js，issue #38）`,
    `# 本文件归人工维护：转换器重跑默认不覆盖，需要重新生成请加 --force --table ${table}`,
  ];
  if (dropped.length > 0) {
    lines.push(
      '#',
      '# 重名合并（yml 以名称为键，同名双序号无法表达；引擎 name→id 语义是',
      '# 后者覆盖，故保留较大序号，依据见 issue #38 评论）：',
    );
    for (const item of dropped) {
      lines.push(`#   序号 ${item.id}「${item.name}」并入后者的名称键`);
    }
  }
  for (const entry of entries) {
    lines.push(`${JSON.stringify(entry.name)}:`);
    lines.push(`  id: ${entry.id}`);
    if (entry.price !== undefined) {
      lines.push(`  price: ${entry.price}`);
    }
  }
  return `${lines.join('\n')}\n`;
}

// 组装一次变量表转换。空表拒绝写出（变量表为空意味着装载时整表缺失）。
function convert_variable({ table, input, output, force = false }) {
  const { text, enc } = read_text(input);
  const { entries, dropped, warnings } = parse_variable_csv(text, { table });
  if (entries.length === 0) {
    throw new Error('输入中没有可用的变量表条目，检查文件内容与格式');
  }
  const source = path.basename(input);
  const result = write_product(
    output,
    to_variable_yaml(entries, dropped, { table, source }),
    { force },
  );
  return { status: result.status, output, warnings, enc, dropped };
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

// 组装一次角色表转换。空表拒绝写出（无番号的预设文件装载时整组被引擎丢弃，
// 产物没有意义）；无法等价表达的形状在上游 parse_chara_csv 抛错。
function convert_chara({ input, output, force = false }) {
  const { text, enc } = read_text(input);
  const { groups, warnings } = parse_chara_csv(text);
  if (groups.length === 0) {
    throw new Error('输入中没有可用的角色预设行，检查文件内容与格式');
  }
  const source = path.basename(input);
  const result = write_product(output, to_chara_yaml(groups, { source }), {
    force,
  });
  return { status: result.status, output, warnings, enc };
}

// 解析命令行参数；未知参数报用法
function parse_args(argv) {
  const options = { force: false, chara: [], table: [] };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--force' || arg === '-f') {
      options.force = true;
    } else if (arg === '--chara') {
      const value = argv[i + 1];
      if (value === undefined) {
        throw new Error('--chara 需要一个参数：角色编号（逗号分隔）或 all');
      }
      options.chara.push(...value.split(',').map((item) => item.trim()));
      i += 1;
    } else if (arg === '--table') {
      const value = argv[i + 1];
      if (value === undefined) {
        throw new Error(
          '--table 需要一个参数：变量表名（逗号分隔），如 talent,item',
        );
      }
      options.table.push(...value.split(',').map((item) => item.trim()));
      i += 1;
    } else {
      throw new Error(`未知参数：${arg}`);
    }
  }
  return options;
}

const USAGE =
  '用法：node tools/csv-to-yml.js [--force] [--chara <编号|all>] [--table <表名>]';

// 变量表源文件解析：表名不分大小写，按 target/CSV 下的磁盘文件名匹配
// （引擎同样以 toLowerCase 归一表名）。找不到即报错，绝不猜路径。
function resolve_table_source(table, csv_dir) {
  const wanted = `${table.toLowerCase()}.csv`;
  const match = fs
    .readdirSync(csv_dir)
    .find((name) => name.toLowerCase() === wanted);
  if (!match) {
    throw new Error(`target/CSV 下没有 ${wanted}（--table ${table}）`);
  }
  return match;
}

// CLI 入口。overrides 供测试注入临时路径，默认相对仓库根。
function main(argv, overrides = {}) {
  const {
    input,
    output,
    chara_dir,
    chara_out_dir,
    table_csv_dir,
    table_out_dir,
  } = overrides;
  let options;
  try {
    options = parse_args(argv);
  } catch (error) {
    console.error(`错误：${error.message}`);
    console.error(USAGE);
    return 2;
  }

  const reports = [];
  try {
    if (options.chara.length > 0) {
      // 角色表模式：target/CSV/Chara/Chara<编号>.csv → yml/Chara<编号>.yml
      const src_dir =
        chara_dir ?? path.join(REPO_ROOT, 'target', 'CSV', 'Chara');
      const out_dir = chara_out_dir ?? path.join(REPO_ROOT, 'yml');
      const ids = options.chara.includes('all')
        ? fs
            .readdirSync(src_dir)
            .filter((name) => /^Chara\d+\.csv$/i.test(name))
            .map((name) => /^Chara(\d+)\.csv$/i.exec(name)[1])
        : options.chara;
      for (const id of ids) {
        reports.push(
          convert_chara({
            input: path.join(src_dir, `Chara${id}.csv`),
            output: path.join(out_dir, `Chara${id}.yml`),
            force: options.force,
          }),
        );
      }
    } else if (options.table.length > 0) {
      // 变量表模式：target/CSV/<表名>.csv → yml/<表名>.yml（大小写随源文件）
      const src_dir = table_csv_dir ?? path.join(REPO_ROOT, 'target', 'CSV');
      const out_dir = table_out_dir ?? path.join(REPO_ROOT, 'yml');
      for (const table of options.table) {
        const source_name = resolve_table_source(table, src_dir);
        reports.push(
          convert_variable({
            table: table.toLowerCase(),
            input: path.join(src_dir, source_name),
            output: path.join(out_dir, source_name.replace(/\.csv$/i, '.yml')),
            force: options.force,
          }),
        );
      }
    } else {
      const resolved_input =
        input ?? path.join(REPO_ROOT, 'csv', 'GameBase.csv');
      const resolved_output =
        output ?? path.join(REPO_ROOT, 'yml', 'GameBase.yml');
      reports.push(
        convert({
          input: resolved_input,
          output: resolved_output,
          force: options.force,
        }),
      );
    }
  } catch (error) {
    console.error(`错误：${error.message}`);
    return 1;
  }

  let written = 0;
  for (const report of reports) {
    report.warnings.forEach((warning) => console.warn(`警告：${warning}`));
    if (report.status === 'written') {
      written += 1;
    }
    console.log(
      `[csv-to-yml] 编码 ${report.enc}；写出 ${report.status === 'written' ? 1 : 0} 个 → ${report.output}` +
        (report.status === 'skipped'
          ? '（已存在，默认不覆盖；重写需 --force）'
          : ''),
    );
  }
  console.log(
    `[csv-to-yml] 合计：写出 ${written} 个 / 跳过 ${reports.length - written} 个`,
  );
  return 0;
}

module.exports = {
  REPO_ROOT,
  CHARA_NAME_MAPPING,
  convert,
  convert_chara,
  convert_variable,
  engine_get_number,
  main,
  map_chara_key,
  map_gamebase_key,
  parse_chara_csv,
  parse_gamebase_csv,
  parse_variable_csv,
  read_text,
  resolve_table_source,
  to_chara_yaml,
  to_gamebase_yaml,
  to_variable_yaml,
  write_product,
};

if (require.main === module) {
  process.exit(main(process.argv.slice(2)));
}
