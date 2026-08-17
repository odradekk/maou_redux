/**
 * 静态名字表的测试播种（issue #47）。
 *
 * 运行时引擎把 yml/*.yml 的名字表装进 fieldNames/staticData，寻址形如
 * palamname:3 / 'palamkeys'；夹具是平表，用例须自行预置这些键。名字的
 * 唯一真身是 yml 产物本身——这里直接解析其 `"名":\n  id: N` 形状（零
 * 依赖，不引 yaml 库；产物正确性另由 test/chara-yml.test.js 用引擎代码
 * 对拍，两层不重复）。
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

/**
 * 播种 #47 用到的四张名字表：palam / abl / mark / exp（*keys + *name:N）。
 * @param {ReturnType<import('./era-fixture').create_era_fixture>} fixture
 */
function seed_static_names(fixture) {
  for (const [table, file] of [
    ['palam', 'Palam.yml'],
    ['abl', 'Abl.yml'],
    ['mark', 'Mark.yml'],
    ['exp', 'Exp.yml'],
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

module.exports = { parse_yml_ids, seed_static_names };
