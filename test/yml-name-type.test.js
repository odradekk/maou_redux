/**
 * @file 变量表的 name / type 完整性守护（issue #901）。
 *
 * 开发套件的属性名取自 yml 条目的 `name`，类型取自 `type`（#820 决定改用
 * 引擎生成的官方访问器）。缺 name 的条目只能退化成「表名 + 序号」
 * （`talent0`），注册名与文档都读不出含义；缺 type 时生成器按数字表处理。
 * 本文件扫全部变量表，钉住三条契约：每条都有 name 和 type、name 是表内唯一
 * 的英文 snake_case、name 不是 JS 保留字。
 *
 * 零依赖解析：只认 `"中文键":` + 两空格缩进的 `id:` / `name:` / `type:`，
 * 与引擎装载用的 yml 形状一致（同 test/helpers/static-names.js 的做法，不引
 * yaml 库）。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const YML_DIR = path.resolve(__dirname, '..', 'yml');

/** 角色预设不是变量表：引擎按文件名（chara 开头）把它们划进逐角色桶。 */
const CHARA_PRESET_RE = /^Chara/i;

/** 不是变量表：GameBase 是元数据，键值直接写成 `"键": 值`。 */
const META_FILES = new Set(['GameBase.yml']);

/**
 * 不做 name/type 要求的表。
 *
 * NameList 的 3,264 条是本作固定人名（玛丽、索菲亚…），它们的 name 就是人名
 * 本身，没有可翻译的英文标识符；且这张表是常量而非存档结构，#835 会把整张
 * 表搬去 `ere/data/`，给每条补 name 只会让开发套件多生成几千个用不上的
 * 访问器（#820 前置条件第 2 条）。文件消失后本名单的失效检查会提醒删掉这条。
 */
const EXEMPT_FILES = {
  'NameList.yml': '固定人名常量表，#835 会把整张表移出静态数据',
};

const NAME_RE = /^[a-z][a-z0-9_]*$/;

/** 生成的访问器是 `era_flag.<name>` 这类属性名；保留字仍必须避开。 */
const RESERVED_WORDS = new Set([
  'await',
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'else',
  'enum',
  'export',
  'extends',
  'false',
  'finally',
  'for',
  'function',
  'if',
  'implements',
  'import',
  'in',
  'instanceof',
  'interface',
  'let',
  'new',
  'null',
  'package',
  'private',
  'protected',
  'public',
  'return',
  'static',
  'super',
  'switch',
  'this',
  'throw',
  'true',
  'try',
  'typeof',
  'var',
  'void',
  'while',
  'with',
  'yield',
]);

/** 引擎认的取值类型（dev-guides/18-tools.md「数据格式要求」）。 */
const TYPES = new Set(['number', 'string']);

/**
 * 变量表文件（yml/ 下、非角色预设、非元数据）。
 * @returns {string[]}
 */
function variable_table_files() {
  return fs
    .readdirSync(YML_DIR)
    .filter((file) => file.endsWith('.yml'))
    .filter((file) => !CHARA_PRESET_RE.test(file))
    .filter((file) => !META_FILES.has(file))
    .sort();
}

/**
 * 解析一张 yml 的条目：中文键 / id / name / type。
 *
 * 只把「列 0 的 `"键":` + 缩进的字段行」当条目，条目之间的注释行忽略；没有
 * 条目的表（只留文件头注的空表）返回空数组。
 * @param {string} file yml/ 下的文件名
 * @returns {Array<{ key: string, id?: number, name?: string, type?: string }>}
 */
function parse_entries(file) {
  const text = fs.readFileSync(path.join(YML_DIR, file), 'utf8');
  const entries = [];
  for (const match of text.matchAll(
    /^"([^"]+)":\r?\n((?: {2}[^\r\n]*\r?\n)*)/gm,
  )) {
    const entry = { key: match[1] };
    for (const line of match[2].split(/\r?\n/)) {
      const field = /^ {2}(id|name|type): (.+)$/.exec(line);
      if (!field) {
        continue;
      }
      entry[field[1]] =
        field[1] === 'id' ? Number(field[2]) : field[2].replace(/"/g, '');
    }
    entries.push(entry);
  }
  return entries;
}

/**
 * 参与检查的表与条目。
 * @returns {Array<{ file: string, entry: ReturnType<typeof parse_entries>[number] }>}
 */
function checked_entries() {
  return variable_table_files()
    .filter((file) => !(file in EXEMPT_FILES))
    .flatMap((file) => parse_entries(file).map((entry) => ({ file, entry })));
}

test('变量表的每个条目都带 name 和 type（#901）', () => {
  const offenders = [];
  for (const { file, entry } of checked_entries()) {
    const missing = ['name', 'type'].filter(
      (field) => entry[field] === undefined,
    );
    if (missing.length > 0) {
      offenders.push(`${file}「${entry.key}」缺 ${missing.join(' 与 ')}`);
    }
  }
  assert.deepEqual(
    offenders,
    [],
    '开发套件按 name / type 生成访问器，缺一项就只能退化成「表名+序号」',
  );
});

test('name 是英文 snake_case，且不是 JS 保留字', () => {
  const offenders = [];
  for (const { file, entry } of checked_entries()) {
    const name = entry.name ?? '';
    if (!NAME_RE.test(name)) {
      offenders.push(
        `${file}「${entry.key}」的 name「${name}」不是英文 snake_case`,
      );
    } else if (RESERVED_WORDS.has(name)) {
      offenders.push(`${file}「${entry.key}」的 name「${name}」是 JS 保留字`);
    }
  }
  assert.deepEqual(
    offenders,
    [],
    'name 会直接成为访问器标识符：ASCII snake_case、避开保留字',
  );
});

test('name 在同一张表内唯一', () => {
  const offenders = [];
  for (const file of variable_table_files()) {
    if (file in EXEMPT_FILES) {
      continue;
    }
    const seen = new Map();
    for (const entry of parse_entries(file)) {
      if (entry.name === undefined) {
        continue; // 缺 name 的条目由上面那条用例报出，这里只查重
      }
      if (seen.has(entry.name)) {
        offenders.push(
          `${file} 的 name「${entry.name}」同时用在「${seen.get(entry.name)}」与「${entry.key}」`,
        );
        continue;
      }
      seen.set(entry.name, entry.key);
    }
  }
  assert.deepEqual(offenders, [], 'name 是访问器名，同表内重复会互相覆盖');
});

test('type 只能是 number / string（生成器认的两种）', () => {
  const offenders = [];
  for (const { file, entry } of checked_entries()) {
    if (entry.type !== undefined && !TYPES.has(entry.type)) {
      offenders.push(
        `${file}「${entry.key}」的 type「${entry.type}」不是 number / string`,
      );
    }
  }
  assert.deepEqual(
    offenders,
    [],
    'type 决定生成器的默认值与 JSDoc 类型；写错时生成器按数字表处理，' +
      '字符串值会被当成 0（Global 的通信勇者记录就是一张表里混着字符串的例子）',
  );
});

test('EXEMPT 名单不失效：豁免的表仍在 yml 里', () => {
  for (const file of Object.keys(EXEMPT_FILES)) {
    assert.ok(
      fs.existsSync(path.join(YML_DIR, file)),
      `yml/${file} 已不存在——从 EXEMPT_FILES 移除这条豁免`,
    );
  }
});
