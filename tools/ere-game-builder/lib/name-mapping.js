/**
 * Engine name mappings.
 *
 * Copied from `src/era/name-mapping.json` in the EraElectron engine, which is
 * what lets a CSV file spell a key as a Chinese name, a Japanese name, or the
 * English variable name. The engine folds the incoming key to lower case before
 * consulting these tables.
 *
 * @module dsh-ere-game-builder/lib/name-mapping
 */

/** `GameBase.csv` first-column aliases → the canonical English key. */
export const GAMEBASE_NAME_MAP = {
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

/** Canonical `GameBase.csv` keys, i.e. the values of {@link GAMEBASE_NAME_MAP}. */
export const GAMEBASE_CANONICAL_KEYS = new Set([
  'author',
  'info',
  'year',
  'title',
  'gameCode',
  'defaultChara',
  'version',
  'versionName',
  'allowVersion',
  'site',
  'icon',
  'versionCheck',
  'baseZip',
]);

/** `GameBase.csv` keys without which the engine cannot start a game. */
export const GAMEBASE_REQUIRED_KEYS = ['title', 'author', 'info', 'year', 'gameCode', 'version', 'allowVersion'];

/** `Chara*.csv` first-column aliases → the canonical English key. */
export const CHARA_NAME_MAP = {
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

/** Canonical `Chara*.csv` single-value keys. */
export const CHARA_CANONICAL_KEYS = new Set(['id', 'name', 'callname', 'title']);

/** Canonical `Chara*.csv` per-table keys, which take `key, 变量, 值` rows. */
export const CHARA_TABLE_KEYS = new Set(['base', 'abl', 'talent', 'cflag', 'cstr', 'equip', 'mark', 'exp', 'juel']);

/** Canonical `Chara*.csv` per-character keys, which take `key, 其他角色ID, 值` rows. */
export const CHARA_PAIR_KEYS = new Set(['callname', 'relation']);

/** `_Replace.csv` first-column aliases → the canonical English key. */
export const REPLACE_NAME_MAP = {
  起動時簡略表示: 'briefInformationOnLoading',
  简化加载信息: 'briefInformationOnLoading',
  简化资源加载: 'briefInformationOnResources',
  简化加载结束: 'briefInformationAfterLoading',
};

/**
 * Canonicalise a `GameBase.csv` key.
 *
 * @param {string} key - the raw first column.
 * @param {(value: string) => string} fold - the case-folding function to use.
 * @returns {string | undefined} the canonical key, or undefined when unknown.
 */
export function canonicalGameBaseKey(key, fold) {
  const trimmed = String(key).trim();
  const folded = fold(key);
  if (GAMEBASE_NAME_MAP[trimmed] !== undefined) return GAMEBASE_NAME_MAP[trimmed];
  if (GAMEBASE_NAME_MAP[folded] !== undefined) return GAMEBASE_NAME_MAP[folded];
  for (const [alias, canonical] of Object.entries(GAMEBASE_NAME_MAP)) {
    if (fold(alias) === folded) return canonical;
  }
  // The engine also accepts its own internal names, and json / yml files normally
  // *are* written with them (`gameCode: 42402`) — the key then passes through the
  // name mapping untouched and matches what the engine reads. `name-mapping.json`
  // additionally aliases the lower-cased form of every camel-cased internal name,
  // so `gamecode` works too, while an odd casing such as `GameCode` does not.
  for (const canonical of GAMEBASE_CANONICAL_KEYS) {
    if (trimmed === canonical || trimmed === canonical.toLowerCase()) return canonical;
  }
  return undefined;
}

/**
 * Canonicalise a `Chara*.csv` key.
 *
 * @param {string} key - the raw first column.
 * @param {(value: string) => string} fold - the case-folding function to use.
 * @returns {string | undefined} the canonical key, or undefined when unknown.
 */
export function canonicalCharaKey(key, fold) {
  const folded = fold(key);
  if (CHARA_NAME_MAP[folded] !== undefined) return CHARA_NAME_MAP[folded];
  for (const [alias, canonical] of Object.entries(CHARA_NAME_MAP)) {
    if (fold(alias) === folded) return canonical;
  }
  if (CHARA_CANONICAL_KEYS.has(folded) || CHARA_TABLE_KEYS.has(folded) || CHARA_PAIR_KEYS.has(folded)) return folded;
  return undefined;
}
