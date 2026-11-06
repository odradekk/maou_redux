/**
 * @file 四张移出静态数据的表：yml 侧不再有它们、源码不再寻址它们、旧档里的
 * 残留桶无害（issue #835）。
 *
 * 三块验证：
 *   - 文件与源码面（任何环境都跑）：yml/ 下没有这四张表，ere/ 里没有
 *     `namelist` / `noitem:0` / `trainalias:` / `t:0` 任何一处寻址；
 *   - 旧档（真引擎）：按 0.1.0 的【版本】盖戳、带上四个桶的残留，用引擎真
 *     `loadData` 读入——读得回来、新槽 `flag:10030` 由 fillData 补 0、残留桶
 *     仍挂在 data 上但没有读者；
 *   - 新档（真引擎）：载荷里不再有这四个桶。
 *
 * 为什么「旧档里的残留无害」能这么断言：引擎 `loadData` 把整份载荷装进
 * `this.data`，`saveData` 再整份写出；它对**表名**不做清理，也不认领。
 * 残留桶唯一能造成伤害的路径是被寻址，而第一条用例逐文件扫过源码，仓库里
 * 已经没有任何这样的地址。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const {
  create_chara_loader,
  create_variable_loader,
  load_engine_bundle,
} = require('./helpers/engine-bundle');
const { attach_variable_tables } = require('./helpers/static-tables');

const engine = load_engine_bundle();
const engine_test = engine ? test : test.skip;

const REPO_ROOT = path.resolve(__dirname, '..');
const YML_DIR = path.join(REPO_ROOT, 'yml');
const ERE_DIR = path.join(REPO_ROOT, 'ere');

/** 移出的四张表：老文件名 → 老表名（= 引擎按文件名小写建的表） */
const REMOVED = {
  'NameList.yml': 'namelist',
  'NOITEM.yml': 'noitem',
  'TrainAlias.yml': 'trainalias',
  'T.yml': 't',
};

/** 老地址（生产代码里不许再有） */
const REMOVED_ADDRESSES = [
  ['namelistkeys', /namelistkeys/],
  ['namelistname:<id>', /namelistname:/],
  ['noitem:0', /noitem:0/],
  ['trainalias:<id>', /trainalias:/],
  ['t:0', /'t:0'/],
];

function source_files() {
  const out = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.name.endsWith('.js')) {
        out.push(full);
      }
    }
  };
  walk(ERE_DIR);
  return out.filter((file) => !file.endsWith(`${path.sep}era-electron.js`));
}

test('四张表不在 yml/ 里', () => {
  for (const [file, table] of Object.entries(REMOVED)) {
    assert.equal(
      fs.existsSync(path.join(YML_DIR, file)),
      false,
      `yml/${file}（表 ${table}）应当已经搬出静态数据`,
    );
  }
});

test('源码里没有这四张表的老地址（残留桶因此没有读者）', () => {
  const hits = [];
  for (const file of source_files()) {
    const text = fs.readFileSync(file, 'utf8');
    for (const [label, re] of REMOVED_ADDRESSES) {
      for (const [line] of text.matchAll(new RegExp(re, 'g'))) {
        const line_no = text.slice(0, line).split('\n').length;
        hits.push(`${path.relative(REPO_ROOT, file)}:${line_no} 命中 ${label}`);
      }
    }
  }
  assert.deepEqual(
    hits,
    [],
    '老地址必须一处不剩（有读者就等于旧档残留还被消费）',
  );
});

// —— 旧档 / 新档（真引擎） ——

/** 读 yml/GameBase.yml 的一个字段 */
function gamebase_field(name) {
  const text = fs.readFileSync(path.join(YML_DIR, 'GameBase.yml'), 'utf8');
  return JSON.parse(new RegExp(`^"${name}": (.+)$`, 'm').exec(text)[1]);
}

/** 引擎级用例的静态数据：仓库全部 yml 名字表 + 空 chara 桶，gamebase 由调用方盖戳 */
function engine_static_data(gamebase) {
  const loader = create_chara_loader({});
  const variables = create_variable_loader();
  for (const file of fs.readdirSync(YML_DIR)) {
    if (!file.endsWith('.yml') || /^Chara/i.test(file)) {
      continue;
    }
    const table = file.replace(/\.yml$/, '').toLowerCase();
    if (table === 'gamebase') {
      continue;
    }
    variables.load_rows(
      engine.parse_data_file(
        fs.readFileSync(path.join(YML_DIR, file), 'utf8'),
        'yml',
        table,
      ),
      table,
    );
  }
  attach_variable_tables(loader, variables);
  return {
    ...loader.static_data,
    gamebase,
    chara: {
      0: { id: '0', name: '你', callname: '你' },
      ...loader.static_data.chara,
    },
  };
}

function make_api(tmp, gamebase, errors = []) {
  return new engine.era_api({
    path: tmp,
    config: { system: { saveCompressedData: false } },
    global: { saves: {} },
    staticData: engine_static_data(gamebase),
    data: {},
    fieldNames: {},
    extendedTables: {},
    connect: () => {},
    error: (...args) => errors.push(args.join(' ')),
    log: () => {},
  });
}

engine_test(
  '旧档（0.1.0 盖戳 + 四个桶的残留）：引擎真 loadData 读得回来，flag:10030 补 0，残留桶没有读者',
  async () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ere-out-of-static-'));
    const errors = [];
    try {
      const version = gamebase_field('最低支持版本');
      const code = gamebase_field('游戏标识');
      const api = make_api(
        tmp,
        { version, gameCode: code, allowVersion: version, defaultChara: 0 },
        errors,
      );

      // 基础存档由引擎自己产出，再改成 0.1.0 的形状：删掉本票新增的
      // flag:10030（0.1.0 没有这个槽），装上四个桶的残留。
      api.resetData();
      api.set('flag:81', 3);
      api.set('callname:0:-1', '你');
      assert.equal(await api.saveData(1, '旧档基线'), true);
      const save_path = path.join(tmp, 'sav', 'save1.sav');
      const base = JSON.parse(fs.readFileSync(save_path, 'utf8'));
      delete base.flag['10030'];
      fs.writeFileSync(
        save_path,
        JSON.stringify({
          ...base,
          version,
          code,
          namelist: { 0: '玛丽', 17: '雅儿贝德' },
          noitem: {},
          trainalias: { 0: '爱抚', 54: '野外ＰＬＡＹ', 150: '调教' },
          t: { 0: 3 },
        }),
      );
      errors.length = 0;

      assert.equal(
        await api.loadData(1),
        true,
        '0.1.0 的存档必须仍然读得回来（ADR-0006 玩家存档保护）',
      );
      assert.deepEqual(errors, [], '读档不产生寻址错误');

      // 判定表第一行的实测依据：新增序号由 fillData 补 0，而 0 就是该计数的
      // 正确初值——旧档里 T:0 = 3 不会被搬到新槽上，也不会被当成 3 起算。
      assert.equal(
        api.get('flag:10030'),
        0,
        '新槽从 0 起算：旧档的 T:0 残留值不迁移',
      );

      // 残留桶仍挂在 data 上（引擎不清理载荷里的键），但没有读者：源码面
      // 由上面那条用例逐文件扫过。
      assert.equal(
        api.get('t:0'),
        3,
        '旧档的 t 桶残留仍在（引擎照旧读得到），只是没人再读它',
      );

      // 名字表不再依赖存档：常量表照常查出名字
      const { get_fixed_chara_name } = create_era_fixture().load_module(
        'system/chara/chara-name-list',
      );
      assert.equal(get_fixed_chara_name(0), '玛丽');
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  },
);

engine_test(
  '新档：载荷里不再有 namelist／noitem／trainalias／t 四个桶',
  async () => {
    const tmp = fs.mkdtempSync(
      path.join(os.tmpdir(), 'ere-out-of-static-new-'),
    );
    try {
      const api = make_api(tmp, {
        version: gamebase_field('版本'),
        gameCode: gamebase_field('游戏标识'),
        allowVersion: gamebase_field('最低支持版本'),
        defaultChara: 0,
      });
      api.resetData();
      assert.equal(await api.saveData(2, '四张表不落盘'), true);
      const saved = JSON.parse(
        fs.readFileSync(path.join(tmp, 'sav', 'save2.sav'), 'utf8'),
      );
      for (const table of Object.values(REMOVED)) {
        assert.equal(
          Object.hasOwn(saved, table),
          false,
          `新档的载荷里不该再有 ${table} 桶`,
        );
      }
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  },
);
