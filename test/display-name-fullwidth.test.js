/**
 * @file 显示名全角守护（issue #822）。
 *
 * 引擎装载静态数据时把名字一律转成小写（app.asar 的 eraStart 装载循环：
 * `o = o.map((e) => (e[1] = toLowerCase(e[1]), e))`，fieldNames 里存的就是
 * 转过小写的名字）。半角拉丁字母因此退化成小写：`ablname:20` 显示
 * 「抖s气质」、`traincommandname:54` 显示「野外play」。名字里的字母改成
 * 全角后，转小写的结果仍是全角字母（Ｓ → ｓ），玩家看到的名字不再半角。
 *
 * 本文件守名字本身：yml 名字表里的键（能力名、素质名、道具名…）与
 * `ere/data/train-command-const.js` 里的指令名都不许含半角拉丁字母。名字表
 * 之外的内部标签（flag 名、战斗状态区布局标签）与角色预设的引擎列名不在此
 * 列，各自的理由登记在 EXEMPT 里——名单是显式的，新增例外必须写明为什么
 * 玩家看不到它。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { NAME_RE } = require('../tools/facade-names');

const YML_DIR = path.resolve(__dirname, '..', 'yml');

/** 名字表文件名：引擎按文件名小写作表名，玩家按名字寻址读到的就是这些键。 */
const NAME_TABLE_FILE_RE = /^[A-Za-z_][A-Za-z0-9_]*\.yml$/;

/**
 * 顶层键（列 0 的 `"名":`）。yml/ 里嵌套键一律缩进，所以列 0 即表项。
 */
const TOP_LEVEL_KEY_RE = /^"([^"]+)":/;

/**
 * 不做全角化的文件与名字条目。
 *
 * - 角色预设（Chara*.yml）：顶层键是引擎列名（CFLAG / ABL / MARK / CSTR /
 *   portcflag…）与预设段名，决定存档字段与引擎列绑定，玩家看不到；改它们
 *   等于改存档布局，与「显示名」无关。
 * - Flag.yml 的「第N层陷阱A/B/C」：迷宫布置区的槽名，代码一律数字下标寻址
 *   （`flag:` 家族），界面显示的是 Item.yml 里的陷阱名，这层名只做变量释文
 *   与开发套件标识符用。
 * - E.yml 的「第N列Boss标志」：怪物战斗状态区的布局标签，同上一类（该文件
 *   头注：条目名只承载布局语义）。
 */
const EXEMPT_FILES = {
  'Flag.yml': {
    names: [
      '第1层陷阱A',
      '第2层陷阱A',
      '第3层陷阱A',
      '第4层陷阱A',
      '第5层陷阱A',
      '第6层陷阱A',
      '第7层陷阱A',
      '第8层陷阱A',
      '第9层陷阱A',
      '第1层陷阱B',
      '第2层陷阱B',
      '第3层陷阱B',
      '第4层陷阱B',
      '第5层陷阱B',
      '第6层陷阱B',
      '第7层陷阱B',
      '第8层陷阱B',
      '第9层陷阱B',
      '第1层陷阱C',
      '第2层陷阱C',
      '第3层陷阱C',
      '第4层陷阱C',
      '第5层陷阱C',
      '第6层陷阱C',
      '第7层陷阱C',
      '第8层陷阱C',
      '第9层陷阱C',
    ],
  },
  'E.yml': {
    names: [
      '第1列Boss标志',
      '第2列Boss标志',
      '第3列Boss标志',
      '第4列Boss标志',
      '第5列Boss标志',
    ],
  },
};

/** 半角拉丁字母——引擎转小写后玩家看到的就是这批字符。 */
const HALF_WIDTH_LATIN_RE = /[A-Za-z]/;

/**
 * 名字表 yml 文件（排除角色预设）。
 * @returns {string[]}
 */
function name_table_files() {
  return fs
    .readdirSync(YML_DIR)
    .filter((file) => NAME_TABLE_FILE_RE.test(file))
    .filter((file) => !/^Chara/i.test(file))
    .sort();
}

/**
 * 解析一张 yml 的顶层键。
 * @param {string} file yml/ 下的文件名
 * @returns {string[]}
 */
function top_level_keys(file) {
  const text = fs.readFileSync(path.join(YML_DIR, file), 'utf8');
  return [...text.matchAll(new RegExp(TOP_LEVEL_KEY_RE, 'gm'))].map(
    (match) => match[1],
  );
}

test('名字表里的玩家可见名字不含半角拉丁字母（#822 全角化）', () => {
  const offenders = [];
  for (const file of name_table_files()) {
    const exempt = new Set(EXEMPT_FILES[file]?.names ?? []);
    for (const name of top_level_keys(file)) {
      if (HALF_WIDTH_LATIN_RE.test(name) && !exempt.has(name)) {
        offenders.push(`${file}: 「${name}」`);
      }
    }
  }
  assert.deepEqual(
    offenders,
    [],
    '引擎装载名字时转小写，半角字母会显示成小写（抖s气质 / 野外play）；' +
      '玩家可见的名字请改用全角字母，名字表以外的内部标签才登记到 EXEMPT',
  );
});

test('EXEMPT 名单不失效：登记的名字仍在，且确实带半角字母', () => {
  for (const [file, { names }] of Object.entries(EXEMPT_FILES)) {
    const keys = new Set(top_level_keys(file));
    for (const name of names) {
      assert.ok(keys.has(name), `${file} 已无「${name}」——从 EXEMPT 移除`);
      assert.ok(
        HALF_WIDTH_LATIN_RE.test(name),
        `${file} 的「${name}」已不含半角字母——从 EXEMPT 移除`,
      );
    }
  }
});

test('全角名字仍是合法的门面访问器名（yml 列名生成访问器的前提）', () => {
  // 门面访问器名由 yml 列名生成，名字全角化后生成器必须仍把它当标识符；
  // 否则 abl:20/21 会从门面上消失，读写退化到裸寻址。
  assert.ok(NAME_RE.test('抖Ｓ气质'));
  assert.ok(NAME_RE.test('抖Ｍ气质'));
  assert.ok(!NAME_RE.test('抖Ｓ-气质'), '非标识符字符仍要拒绝');
});

test('指令常量的名字不含半角拉丁字母（#836 把指令名搬进常量后同一批名字）', () => {
  const {
    ADVANCED_TRAIN_COMMAND,
    TRAIN_COMMAND,
  } = require('../ere/data/train-command-const');
  const offenders = [];
  for (const table of [TRAIN_COMMAND, ADVANCED_TRAIN_COMMAND]) {
    for (const [id, name] of Object.entries(table)) {
      if (HALF_WIDTH_LATIN_RE.test(name)) {
        offenders.push(`${id}: 「${name}」`);
      }
    }
  }
  assert.deepEqual(
    offenders,
    [],
    '指令名是玩家在指令方格与「上次的调教指令」行看到的文本，' +
      '半角字母会显示成半角小写（野外play）；名字里的字母请用全角',
  );
});
