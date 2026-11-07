/**
 * yml 名字表的测试侧读取（issue #47 起，issue #821 改成夹具的唯一来源）。
 *
 * 运行时引擎把 yml/*.yml 装成两张表：staticData[表] = {名字: 序号}、
 * fieldNames[表] = {序号: {n: 名字}}。寻址层用前者把名字翻成序号，用后者把
 * 序号翻回名字（<表>name:<序号>）。夹具是平表，这两件事都从 yml 现算——
 * 名字的唯一真身是 yml 产物本身，这里直接解析其 `"名":\n  id: N` 形状
 * （零依赖，不引 yaml 库；产物正确性另由 test/chara-yml.test.js 用引擎代码
 * 比对，两层不重复）。
 */

const fs = require('node:fs');
const path = require('node:path');

const YML_DIR = path.resolve(__dirname, '..', '..', 'yml');

/**
 * 引擎把它们并进同一张名字表：param/palam 文件装出的 staticData.juel 同时
 * 供 palam 与 juel 族（含 `jewel` 别名）寻址使用；nowex 另走 Ex.yml。
 */
const NAME_TABLE_ALIASES = {
  juel: ['palam', 'param'],
  jewel: ['palam', 'param'],
  param: ['palam', 'param'],
};

let yml_files;

/** yml/ 下的文件名（目录内容一次读取；名字表在测试进程里不会新增） */
function yml_file_names() {
  yml_files ??= fs.readdirSync(YML_DIR);
  return yml_files;
}

/**
 * 表名 → yml 文件名。引擎按文件名的去扩展名小写建表，所以两侧都按小写比较；
 * 没有对应文件的表返回 undefined（引擎里就是 staticData 缺这张表）。
 * @param {string} table 表名
 * @returns {string | undefined}
 */
function yml_file(table) {
  for (const candidate of [table, ...(NAME_TABLE_ALIASES[table] ?? [])]) {
    const file = yml_file_names().find(
      (name) => name.toLowerCase() === `${candidate}.yml`,
    );
    if (file !== undefined) {
      return file;
    }
  }
  return undefined;
}

/**
 * 解析一张名字表 yml：序号 → 名。
 * @param {string} file yml 文件名（yml/ 下）
 * @returns {Map<number, string>}
 */
function parse_yml_ids(file) {
  const text = fs.readFileSync(path.join(YML_DIR, file), 'utf8');
  const map = new Map();
  const re = /^"([^"]+)":\r?\n\s+id:\s*(\d+)\s*\r?$/gm;
  for (const match of text.matchAll(re)) {
    map.set(Number(match[2]), match[1]);
  }
  return map;
}

const declared_ids_cache = new Map();

/**
 * 名字表的声明序号（表名 → Set），按需解析、进程内缓存。没有对应 yml 的表
 * 返回 undefined（引擎里没有这张名字表，<表>keys 与名字翻译都不成立）。
 * @param {string} table 表名（小写）
 * @returns {Set<number> | undefined}
 */
function yml_declared_ids(table) {
  if (!declared_ids_cache.has(table)) {
    const file = yml_file(table);
    declared_ids_cache.set(
      table,
      file === undefined ? undefined : new Set(parse_yml_ids(file).keys()),
    );
  }
  return declared_ids_cache.get(table);
}

const name_maps_cache = new Map();

/**
 * 名字表的两向映射（表名 → {id_to_name, name_to_id}），按需解析、进程内
 * 缓存；没有对应 yml 的表返回 undefined。
 *
 * 名字一律小写：引擎装载时把名称列 toLowerCase（eraStart 的
 * `o.map(e => (e[1] = toLowerCase(e[1]), e))`），寻址层也把地址各段小写，
 * 所以 `ablname:10` 拿回的是小写后的名字。
 * @param {string} table 表名（小写）
 * @returns {{ id_to_name: Map<number, string>, name_to_id: Map<string, number> } | undefined}
 */
function yml_name_table(table) {
  if (!name_maps_cache.has(table)) {
    const file = yml_file(table);
    let maps;
    if (file !== undefined) {
      const id_to_name = new Map();
      const name_to_id = new Map();
      for (const [id, name] of parse_yml_ids(file)) {
        const lower = name.toLowerCase();
        id_to_name.set(id, lower);
        name_to_id.set(lower, id);
      }
      maps = { id_to_name, name_to_id };
    }
    name_maps_cache.set(table, maps);
  }
  return name_maps_cache.get(table);
}

let extended_chara_tables;

/**
 * yml/_fixed.json 里登记的扩展角色表（引擎侧 `system.extendedCharaTables`，
 * 全部按 tableType.chara 登记）。引擎在 resetData → fillData 与 addCharacter
 * 里为每张登记表建顶层桶、为每个已加入角色建行，所以它们的「在不在」属于
 * 数据层结构的一部分（夹具的 raw() 视图要用）。
 *
 * 读不到配置时返回空数组：裸克隆里 yml/ 一定在，这条兜底只对应配置被删或
 * JSON 解不开的情形——那时引擎同样没有扩展表可登记。
 * @returns {string[]} 表名（小写，与引擎的键一致）
 */
function yml_extended_chara_tables() {
  if (extended_chara_tables === undefined) {
    let tables = [];
    try {
      const config = JSON.parse(
        fs.readFileSync(path.join(YML_DIR, '_fixed.json'), 'utf8'),
      );
      const declared = config?.system?.extendedCharaTables;
      if (Array.isArray(declared)) {
        tables = declared.map((table) => String(table).toLowerCase());
      }
    } catch {
      tables = [];
    }
    extended_chara_tables = tables;
  }
  return extended_chara_tables;
}

/**
 * 引擎 embeddedTableNames（eraStart 的内置族，app.asar 逐字）：这些表由
 * resetData / beginTrain 的字面量建桶，装载循环不把它们标成扩展表。
 */
const ENGINE_EMBEDDED_TABLES = new Set([
  'abl',
  'base',
  'maxbase',
  'cflag',
  'cstr',
  'equip',
  'ex',
  'nowex',
  'exp',
  'flag',
  'global',
  'item',
  'mark',
  'palam',
  'juel',
  'gotjuel',
  'stain',
  'talent',
  'tcvar',
  'tequip',
  'tflag',
  'source',
  'delta',
]);

let extended_normal_tables;

/**
 * yml/ 里被引擎标成 `tableType.normal` 的扩展表。
 *
 * 引擎装载循环对每个 yml 文件建 `staticData[表]`（**零条目的空表也建**，见
 * #903 实测），再把「不在 embeddedTableNames、也不是扩展角色表」的表登记成
 * 扩展普通表；fillData 随后为每张这样的表建 `data[表]` 顶层桶、把声明序号补
 * 成 0。所以它们的「在不在」同样是数据层结构的一部分，与写过没有无关。
 *
 * 从 yml/ 现算而不是写死清单：新增一张扩展表时夹具与引擎比对会一起跟上，
 * 不用记得改这儿（#903 换成引擎生成的开发套件后，era-utils 里逐表出现具名
 * 访问器，漏一张就是 TypeError）。
 *
 * @returns {string[]} 表名（小写，与引擎的键一致）
 */
function yml_extended_normal_tables() {
  if (extended_normal_tables === undefined) {
    const chara_tables = new Set(yml_extended_chara_tables());
    extended_normal_tables = yml_file_names()
      .filter((name) => name.toLowerCase().endsWith('.yml'))
      .map((name) => name.slice(0, -'.yml'.length).toLowerCase())
      // GameBase 是启动配置不是变量表；Chara<N> 走角色分支（引擎的
      // staticFormatRegex），两者都不进 extendedTables
      .filter(
        (table) =>
          table !== 'gamebase' &&
          !/^chara\d+$/.test(table) &&
          !ENGINE_EMBEDDED_TABLES.has(table) &&
          !chara_tables.has(table),
      );
  }
  return extended_normal_tables;
}

module.exports = {
  parse_yml_ids,
  yml_declared_ids,
  yml_extended_chara_tables,
  yml_extended_normal_tables,
  yml_name_table,
};
