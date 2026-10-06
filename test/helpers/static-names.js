/**
 * 静态名字表的测试播种（issue #47）。
 *
 * 运行时引擎把 yml/*.yml 的名字表装进 fieldNames/staticData，寻址形如
 * palamname:3 / 'palamkeys'；夹具是平表，用例须自行预置这些键。名字的
 * 唯一真身是 yml 产物本身——这里直接解析其 `"名":\n  id: N` 形状（零
 * 依赖，不引 yaml 库；产物正确性另由 test/chara-yml.test.js 用引擎代码
 * 比对，两层不重复）。
 */

const fs = require('node:fs');
const path = require('node:path');

const YML_DIR = path.resolve(__dirname, '..', '..', 'yml');

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
 * 名字表的声明序号（表名 → Set），按需解析、进程内缓存。引擎以 yml 文件名
 * 的小写作表名；没有对应 yml 的表返回 undefined。
 * @param {string} table 表名（小写）
 * @returns {Set<number> | undefined}
 */
function yml_declared_ids(table) {
  if (!declared_ids_cache.has(table)) {
    const file = fs
      .readdirSync(YML_DIR)
      .find((name) => name.toLowerCase() === `${table}.yml`);
    declared_ids_cache.set(
      table,
      file === undefined ? undefined : new Set(parse_yml_ids(file).keys()),
    );
  }
  return declared_ids_cache.get(table);
}

/**
 * 播种名字表：palam / abl / mark / exp（#47）+ traincommand（#45 的指令
 * 按钮与「上次的调教指令」行读 `traincommandname:${id}`）。
 * @param {ReturnType<import('./era-fixture').create_era_fixture>} fixture
 */
function seed_static_names(fixture) {
  for (const [table, file] of [
    ['palam', 'Palam.yml'],
    ['abl', 'Abl.yml'],
    ['mark', 'Mark.yml'],
    ['exp', 'Exp.yml'],
    ['traincommand', 'TrainCommand.yml'],
  ]) {
    const map = parse_yml_ids(file);
    fixture.store.set(
      `${table}keys`,
      [...map.keys()].sort((a, b) => a - b),
    );
    for (const [id, name] of map) {
      fixture.store.set(`${table}name:${id}`, name);
    }
  }
}

/**
 * 把 Talent.yml 未声明的素质号播种成空名。人物定制素质页逐个读素质名，
 * 未声明的号在引擎里会崩（#741）；#741 修复前相关用例用它绕开，修复时删除
 * 本函数与各处调用。
 * @param {ReturnType<import('./era-fixture').create_era_fixture>} fixture
 */
function seed_undeclared_talent_names(fixture) {
  const declared = parse_yml_ids('Talent.yml');
  // 素质页的分组最远读到 489 号（精英组），比 Talent.yml 最大的声明号还大
  for (let id = 0; id < 490; id += 1) {
    if (!declared.has(id)) {
      fixture.store.set(`talentname:${id}`, '');
    }
  }
}

module.exports = {
  parse_yml_ids,
  seed_static_names,
  seed_undeclared_talent_names,
  yml_declared_ids,
};
