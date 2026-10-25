/**
 * @file GameBase 的【初始角色编号】由引擎在 resetData 时建角色（issue #848）。
 *
 * 旧写法在标题页手工 `resetData` + `addCharacter(0)`。引擎的写法是在 GameBase
 * 声明【初始角色编号】（nameMapping 里的 defaultChara），resetData 末尾
 * `void 0 !== this.staticData.gamebase.defaultChara && this.addCharacter(...)`
 * 自己建。这里钉住三件事：
 *
 *   1. yml/GameBase.yml 声明了【初始角色编号】0，且 0 号角色的预设确在库；
 *   2. 引擎按声明建出来的 0 号角色与「手工 addCharacter(0)」逐键一致（含好感）——
 *      这是本票的验收第二条；
 *   3. 相性镜像对「以默认角色为目标的键」只写正向。仓库现有的相性键都不以 0
 *      为目标，所以两种写法的结果一致；这条断言防的是将来有人给角色预设加上
 *      「对 0 的相性」，那时两种写法的 data.relation 会不同，需要回来重新判断。
 *
 * 引擎不在场（无 app.asar）时后半段的用例 skip 并计入
 * test/engine-skip-baseline.txt；yml 文本的两条不依赖引擎，任何环境都跑。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const {
  create_chara_loader,
  load_engine_bundle,
} = require('./helpers/engine-bundle');
const {
  attach_variable_tables,
  load_repo_variable_tables,
} = require('./helpers/static-tables');

const engine = load_engine_bundle();
const engine_test = engine ? test : test.skip;
const repo_tables = load_repo_variable_tables();

const REPO_ROOT = path.resolve(__dirname, '..');
const YML_DIR = path.join(REPO_ROOT, 'yml');

// yml/_fixed.json 登记的扩展角色表（引擎装载后 extendedTables 的形状）
const EXTENDED_TABLES = {
  portcflag: 2,
  ex_talent: 2,
  c_relation: 2,
  c_relation_sub: 2,
};

// resetData 只用到 gameCode / version 两个字段（data.code / data.version），
// 与存档闸门无关；allowVersion 一并给齐，凑成引擎装载后的 gamebase 形状
const GAMEBASE = { gameCode: 931060, version: 1000, allowVersion: 1000 };

/**
 * 读 yml/GameBase.yml 某个中文键的原文取值（引擎按 nameMapping 映射成内部键）。
 * @param {string} key 中文键名
 * @returns {string} 取值原文（已去行尾空白）
 */
function gamebase_field(key) {
  const text = fs.readFileSync(path.join(YML_DIR, 'GameBase.yml'), 'utf8');
  const match = text.match(new RegExp(`^"${key}": (.*)$`, 'm'));
  assert.ok(match, `GameBase.yml 缺「${key}」`);
  return match[1].trim();
}

/**
 * 读角色文件「相性」段里的目标角色号。段的写法是顶层键 `"相性":`
 * 加若干缩进两格的 `"目标号": 值`（见 yml/Chara223.yml）。
 * @param {string} text 角色文件全文
 * @returns {number[]} 相性目标的角色号
 */
function relation_targets(text) {
  const targets = [];
  let in_section = false;
  for (const line of text.split(/\r?\n/)) {
    if (!in_section) {
      in_section = line === '"相性":';
      continue;
    }
    const entry = /^ {2}"(-?\d+)":/.exec(line);
    if (entry === null) {
      break; // 段结束：下一条顶层键
    }
    targets.push(Number(entry[1]));
  }
  return targets;
}

test('GameBase.yml 声明【初始角色编号】0，且 0 号角色的预设在库', () => {
  // 引擎按 nameMapping 把「初始角色编号」映射为 defaultChara，resetData 末尾
  // 据此建角色；不声明时新游戏不会有 0 号角色（旧写法就是靠标题页手工加）
  assert.equal(
    gamebase_field('初始角色编号'),
    '0',
    '【初始角色编号】必须是 0（0 号角色＝魔王，预设见 yml/Chara0.yml）',
  );
  // 引擎按角色号查预设表：Chara0.yml 不在库时 addCharacter 静默返回 false，
  // 新游戏会没有魔王——静态数据侧的同一条契约在这里守住
  const chara0 = fs.readFileSync(path.join(YML_DIR, 'Chara0.yml'), 'utf8');
  assert.match(chara0, /^"番号": 0$/m, 'Chara0.yml 必须声明【番号】0');
});

test('没有任何角色预设把 0 号声明为相性目标（引擎对默认角色只写正向镜像）', () => {
  // 引擎 addCharacter 镜像相性时判的是**键的目标号**：`n !==
  // gamebase.defaultChara` 才写反向。所以声明 defaultChara 后，形如
  // `<某角色>|0` 的预设只写 relation:<某角色>:0，不再回写成 0 号对 TA 的
  // 相性；不声明时两条都写。仓库没有这样的键，两种写法的新游戏数据才一致。
  const offenders = fs
    .readdirSync(YML_DIR)
    .filter((name) => /^Chara.*\.yml$/i.test(name))
    .filter((name) =>
      relation_targets(
        fs.readFileSync(path.join(YML_DIR, name), 'utf8'),
      ).includes(0),
    );
  assert.deepEqual(
    offenders,
    [],
    '相性目标的角色号里出现了 0，需重新核对该差异',
  );
});

/**
 * 装载仓库全部角色预设与变量表（引擎装载后的 staticData 形状）。
 * @returns {object} staticData（含 chara / relationship / 各变量表）
 */
function load_static_data() {
  const loader = create_chara_loader({ extended_tables: EXTENDED_TABLES });
  attach_variable_tables(loader, repo_tables);
  for (const file of fs
    .readdirSync(YML_DIR)
    .filter((name) => /^Chara.*\.yml$/i.test(name))) {
    loader.load_rows(
      engine.parse_data_file(
        fs.readFileSync(path.join(YML_DIR, file), 'utf8'),
        'yml',
        'chara',
      ),
    );
  }
  assert.deepEqual(loader.errors, [], '全部角色文件必须零装载错误');
  return loader.static_data;
}

/**
 * 造一台使用真方法的引擎 API（resetData / fillData / addCharacter 全是真的）。
 * @param {object} static_data load_static_data() 的返回值
 * @param {{ gamebase?: object, relation?: object }} [options]
 *   gamebase 换成本用例的 GameBase 形状；relation 往相性表里补合成键
 *   （仓库预设没有以 0 为目标的相性，行为差异只能在合成预设上验证）
 * @returns {object} engine.era_api 实例
 */
function make_api(static_data, { gamebase = GAMEBASE, relation = {} } = {}) {
  const data = structuredClone(static_data);
  Object.assign(data.relationship.relation, relation);
  return new engine.era_api({
    staticData: { ...data, gamebase },
    fieldNames: repo_tables.field_names,
    extendedTables: EXTENDED_TABLES,
    global: {},
    error: (...args) => assert.fail(args.join(' ')),
  });
}

engine_test(
  '引擎 resetData 按【初始角色编号】建 0 号角色，数据与「手工 addCharacter(0)」逐键一致',
  () => {
    const static_data = load_static_data();

    // 改动前：GameBase 不声明，标题页手工 resetData + addCharacter(0)
    const manual = make_api(static_data, { gamebase: { ...GAMEBASE } });
    manual.resetData();
    assert.deepEqual(
      manual.data.no,
      [],
      '未声明【初始角色编号】时 resetData 不建角色（旧写法的手工加入才是空的对照）',
    );
    assert.equal(manual.addCharacter(0), true);

    // 改动后：声明 0，由 resetData 自己建
    const declared = make_api(static_data, {
      gamebase: { ...GAMEBASE, defaultChara: 0 },
    });
    declared.resetData();

    assert.deepEqual(declared.data.no, [0], '声明后 resetData 建出 0 号角色');
    assert.deepEqual(declared.getAddedCharacters(), [0]);
    // 全量比对：0 号角色的每张表（基础/能力/素质/フラグ/CSTR/装备/刻印/经验/
    // 珠/称呼/相性/好感与扩展表）都与手工加入的结果逐键相同
    assert.deepEqual(
      declared.data,
      manual.data,
      '新游戏后 0 号角色的数据必须与改动前一致',
    );
    // 好感的落点单独点名：addCharacter 的 `this.data.love[n] = 0` 是新游戏后
    // 0 号角色唯一的好感写入（love:A 表示 A 对默认角色的爱慕）
    assert.equal(declared.data.love[0], 0, '好感槽由 addCharacter 落 0');
    assert.deepEqual(
      declared.data.callname[0],
      { '-1': '你', '-2': '你' },
      '称呼取自 yml/Chara0.yml 的【名前】/【呼び名】',
    );
  },
);

engine_test(
  '相性镜像：以默认角色为目标的键只写正向，不回写 0 号；显式以 0 号为主语的键仍双向',
  () => {
    const static_data = load_static_data();

    // 合成一条「34 对 0 的相性」（仓库没有这种键，见上面的守卫用例）
    const declared = make_api(static_data, {
      gamebase: { ...GAMEBASE, defaultChara: 0 },
      relation: { '34|0': 500 },
    });
    declared.resetData();
    declared.addCharacter(34);
    assert.equal(declared.data.relation[34][0], 500, '正向（34 对 0）照写');
    assert.equal(
      declared.data.relation[0][34],
      undefined,
      '以默认角色为目标的键不再镜像回写',
    );

    // 旧写法（未声明）同一条预设会把 0 号对 34 的相性也写上——这正是本票要
    // 核对并通过「仓库无此键」排除的差异
    const manual = make_api(static_data, {
      gamebase: { ...GAMEBASE },
      relation: { '34|0': 500 },
    });
    manual.resetData();
    manual.addCharacter(0);
    manual.addCharacter(34);
    assert.equal(
      manual.data.relation[0][34],
      500,
      '未声明时反向同样被镜像写入',
    );

    // 排除只针对「目标 = 默认角色」的键：0 号自己声明对 34 的相性仍双向写
    const forward = make_api(static_data, {
      gamebase: { ...GAMEBASE, defaultChara: 0 },
      relation: { '0|34': 300 },
    });
    forward.resetData();
    forward.addCharacter(34);
    assert.equal(forward.data.relation[0][34], 300, '显式键照写');
    assert.equal(forward.data.relation[34][0], 300, '显式键仍镜像到反向');
  },
);
