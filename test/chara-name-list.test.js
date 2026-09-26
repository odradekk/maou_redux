/**
 * @file ere/chara/chara-name-list.js 与 yml/NameList.yml 的行为测试
 * （issue #388：CHARA_NAME_INIT 落表；#435：文件名被引擎误判为逐角色数据）。
 *
 * 三层验证：
 *   - 夹具层（快，无需引擎）：get_fixed_chara_name 的守卫与缓存行为；
 *   - 文件分类层（需引擎）：拿引擎自己的 staticFormatRegex 逐文件分类一遍，
 *     钉住「本表走的是普通表分支」（#435 的根因与修复方向）；
 *   - 引擎实证层（需引擎）：真解析器 + 真 setVar 驱动生产模块查表——表名由
 *     文件名派生（与引擎同款取法），生产代码的读取键必须与它一致；以及
 *     「未注册 id 直接崩溃」是真实风险（未经守卫的裸三段寻址会撞上它，
 *     这正是 chara-name-list.js 的 valid_ids() 存在的理由）；
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const {
  create_variable_loader,
  load_engine_bundle,
} = require('./helpers/engine-bundle');

const engine = load_engine_bundle();
const engine_test = engine ? test : test.skip;

const REPO_ROOT = path.resolve(__dirname, '..');
const YML_DIR = path.join(REPO_ROOT, 'yml');
// 文件名即表名（引擎 eraStart：去扩展名、小写）——本表必须不以 chara 开头，
// 否则会被 /chara[^/]+\.yml/ 划进逐角色数据桶（#435，见 yml/NameList.yml 头注）
const YML_NAME = 'NameList.yml';
const TABLE = YML_NAME.replace(/\.yml$/, '').toLowerCase(); // = 'namelist'
const YML_PATH = path.join(YML_DIR, YML_NAME);
// —— 夹具层：valid_ids 守卫与缓存 ——

test('get_fixed_chara_name：已注册 id 查表返回名字', () => {
  const fixture = create_era_fixture();
  fixture.store.set('namelistkeys', [0, 17, 3610]);
  fixture.store.set('namelistname:17', '雅儿贝德');
  const { get_fixed_chara_name } = fixture.load_module('chara/chara-name-list');

  assert.equal(
    get_fixed_chara_name(17),
    '雅儿贝德',
    '已注册 id 必须查表返回名字',
  );
});

test('get_fixed_chara_name：未注册 id（含合并丢弃的缺口）直接返回空串，不去读名字地址', () => {
  const fixture = create_era_fixture();
  // 3030 不在 keys 里（模拟被重名合并丢弃），但故意仍在 store 里放一个陈旧值，
  // 证明函数走的是 valid_ids 守卫、不是「地址查到了就用」。
  fixture.store.set('namelistkeys', [0, 17]);
  fixture.store.set('namelistname:3030', '陈旧残留');
  const { get_fixed_chara_name } = fixture.load_module('chara/chara-name-list');

  assert.equal(
    get_fixed_chara_name(3030),
    '',
    '未注册 id 必须直接返回空串，不得读到陈旧的名字地址残留',
  );
  assert.equal(
    get_fixed_chara_name(99999),
    '',
    '声明范围外的编号同样安全返回空串',
  );
});

test('get_fixed_chara_name：已注册但名字地址未播种（undefined）时兜底为空串', () => {
  const fixture = create_era_fixture();
  fixture.store.set('namelistkeys', [42]);
  // 42 在 keys 里，但对应的 name: 地址没有被播种——只有在这个场景下 `?? ''`
  // 才有意义（真实引擎里名字表与 keys 恒同步，这里是防御性验证）。
  const { get_fixed_chara_name } = fixture.load_module('chara/chara-name-list');

  assert.equal(
    get_fixed_chara_name(42),
    '',
    "名字地址未播种时必须兜底为空串（?? ''）",
  );
});

test('get_fixed_chara_name：valid_ids 缓存只建一次（重复查表不重复读 keys）', () => {
  const fixture = create_era_fixture();
  fixture.store.set('namelistkeys', [1, 2]);
  fixture.store.set('namelistname:1', '甲');
  fixture.store.set('namelistname:2', '乙');
  const { get_fixed_chara_name } = fixture.load_module('chara/chara-name-list');

  get_fixed_chara_name(1);
  get_fixed_chara_name(2);
  get_fixed_chara_name(999); // 未注册也只查缓存，不再读 keys

  const keys_reads = fixture.var_reads.filter((r) => r.name === 'namelistkeys');
  assert.equal(keys_reads.length, 1, 'namelistkeys 只应被读取一次（缓存生效）');
});

test('chara_name_init：调用点可观测（预热 valid_ids 缓存），不抛错', () => {
  const fixture = create_era_fixture();
  fixture.store.set('namelistkeys', [7]);
  const { chara_name_init } = fixture.load_module('chara/chara-name-list');

  assert.doesNotThrow(() => chara_name_init());
  assert(
    fixture.var_reads.some((r) => r.name === 'namelistkeys'),
    'chara_name_init 必须读取 namelistkeys（否则调用点被删掉也测不出来）',
  );
});

test('EVENTFIRST/EVENTLOAD 真的调用了 chara_name_init（读取 namelistkeys 可观测）', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  const { emit } = fixture.load_module('system/event/registry');
  fixture.load_module('event/event-load');

  await emit('EVENTLOAD');

  assert(
    fixture.var_reads.some((r) => r.name === 'namelistkeys'),
    'EVENTLOAD 链必须真的调用 chara_name_init（不是只证明存在）',
  );
});

// —— 文件分类层：引擎按文件名把静态表分成「逐角色」与「普通表」两条路 ——

/** 引擎 eraStart 的分类判据（yml 档）：模块 84 的 staticFormatRegex 按格式取 */
function chara_file_regex() {
  const index = engine.static_format_priority.indexOf('yml');
  return engine.static_format_regex[index];
}

engine_test(
  '引擎实证：逐角色分类只命中 Chara<数字>.yml，名字表走普通表分支（#435）',
  () => {
    const chara_re = chara_file_regex();
    // 引擎把**小写后的完整路径**过这条正则（eraStart 逐字）。这里用相对路径
    // yml/<文件名>——**不要喂本仓库的绝对路径**：正则的 `.` 未转义、能匹配
    // `/`，目录名里出现「chara…/yml」形状时会在目录段上命中（本仓库的
    // worktree 目录名 t435-charanamelist-misclassify 就是这种形状），那是
    // 路径的产物、不是文件的属性，喂进来会让这条用例恒红而非照出真问题。
    const classified = fs
      .readdirSync(YML_DIR)
      .filter((file) => file.endsWith('.yml'))
      .filter((file) => chara_re.test(`yml/${file}`.toLowerCase()))
      .sort();
    const per_chara = fs
      .readdirSync(YML_DIR)
      .filter((file) => /^chara\d+\.yml$/i.test(file))
      .sort();

    // 正对照：这条正则确实是引擎用来抓逐角色文件的那条（引擎分类的实证）
    assert.equal(
      chara_re.test('yml/chara0.yml'),
      true,
      '引擎正则必须命中 Chara0.yml（否则本用例的判据本身失效）',
    );
    // 根因留证：改名前那支文件正是被它命中的（#435）
    assert.equal(
      chara_re.test('yml/charanamelist.yml'),
      true,
      '引擎正则必须命中旧名 CharaNameList.yml——这正是 #435 的根因',
    );
    // 本表：不以 chara 开头，落在普通表分支
    assert.equal(
      chara_re.test(`yml/${YML_NAME}`.toLowerCase()),
      false,
      `yml/${YML_NAME} 不许被引擎当成逐角色数据（改回 chara 开头会让整表装不进 staticData.${TABLE}）`,
    );
    assert.deepEqual(
      classified,
      per_chara,
      '被引擎划进逐角色桶的 yml 必须恰好是 Chara<数字>.yml 那批；多出任何文件（含名字表）都会让它在真实装载里走错分支',
    );
  },
);

// —— 引擎实证层：真解析 + 真 setVar 驱动生产模块 ——

function load_real_table() {
  const loader = create_variable_loader();
  const text = fs.readFileSync(YML_PATH, 'utf8');
  // 表名从文件名派生——与引擎 eraStart 的取法一致（去扩展名、小写）
  loader.load_rows(engine.parse_data_file(text, 'yml', TABLE), TABLE);
  return loader;
}

/** 引擎 setVar/getter 的最小假 this（与既有引擎用例同款字段清单） */
function make_var_this(loader) {
  return {
    staticData: loader.static_data,
    fieldNames: loader.field_names,
    data: {},
    global: {},
    extendedTables: {},
    era: { error: () => {} },
  };
}

engine_test(
  '引擎实证：NameList.yml 装载零告警、零重号（去重前已手工消解）',
  () => {
    const loader = load_real_table();
    assert.deepEqual(loader.warnings, []);
  },
);

engine_test(
  '引擎实证：生产模块经引擎真寻址查出真名字（表名来自文件名，读取键必须一致）',
  () => {
    const fixture = create_era_fixture();
    const loader = load_real_table();
    const fake = make_var_this(loader);
    // 把夹具的 era.get 接到引擎自己的寻址层上（真 staticData + 真 setVar）。
    // 这一条是 #435 的要害：表名由**文件名**派生，生产代码的读取键写死。
    // 两者一旦脱节（文件改名没跟、键改名没跟），引擎对缺表的寻址静默返回
    // undefined → 查表恒空，而夹具播 store 的用例照样绿。所以这里不播 store。
    fixture.era.get = (var_name) => {
      const value = engine.set_var.call(fake, var_name);
      fixture.var_reads.push({ name: var_name, value });
      return value;
    };
    const { chara_name_init, get_fixed_chara_name } = fixture.load_module(
      'chara/chara-name-list',
    );

    chara_name_init();
    assert.equal(
      get_fixed_chara_name(0),
      '玛丽',
      `生产模块读的必须是 staticData.${TABLE}（引擎按 yml/${YML_NAME} 的文件名建表）`,
    );
    assert.equal(get_fixed_chara_name(3610), '空', 'そら 覆盖后的名字');
    // 未注册 id：守卫挡住，不去撞引擎那条 `.n` 读在 undefined 上的崩溃
    assert.equal(
      get_fixed_chara_name(3030),
      '',
      '未注册 id 必须走 valid_ids 守卫返回空串',
    );
    assert(
      fixture.var_reads.some((r) => r.name === `${TABLE}keys`),
      `生产模块必须读 ${TABLE}keys（引擎真寻址里它就是 staticData.${TABLE} 的值集）`,
    );
  },
);

engine_test(
  '引擎实证：注册 id 经 namelistname 三种范围各取一例读出正确名字',
  () => {
    const loader = load_real_table();
    const fake = make_var_this(loader);
    const cases = [
      [0, '玛丽'], // 洋名
      [3610, '空'], // 男性和名，そら 覆盖
      [3003, '飒太'], // 男性和名，同 id 二次赋值取最后一次 + 归一
    ];
    for (const [id, expected] of cases) {
      assert.equal(engine.set_var.call(fake, `${TABLE}name:${id}`), expected);
    }
  },
);

engine_test(
  '引擎实证：未注册 id（含被合并丢弃的 3030）裸三段寻址直接崩溃',
  () => {
    const loader = load_real_table();
    const fake = make_var_this(loader);
    for (const gap_id of [3030, 5289, 99999]) {
      assert.throws(
        () => engine.set_var.call(fake, `${TABLE}name:${gap_id}`),
        /Cannot read properties of undefined/,
        `id ${gap_id} 应当撞上未注册崩溃（chara-name-list.js 的 valid_ids 守卫正是防这个）`,
      );
    }
  },
);

engine_test(
  '引擎实证：namelistkeys 与 valid_ids() 读的是同一份 id 集合',
  () => {
    const loader = load_real_table();
    const fake = make_var_this(loader);
    const keys = engine.set_var.call(fake, `${TABLE}keys`);
    assert.equal(keys.length, Object.keys(loader.static_data[TABLE]).length);
    assert(keys.includes(0) && keys.includes(3610) && !keys.includes(3030));
  },
);
