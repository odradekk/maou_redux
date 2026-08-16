/**
 * @file 角色表迁移的引擎对拍测试（issue #35）。
 *
 * 与 test/csv-to-yml.test.js 的分工：那边测转换器自身的契约（产物边界、
 * 解析镜像的行为锁），这边回答验收的核心问题——**引擎自己的代码**读到产物
 * 后，得到的角色预设与读源 CSV 是否逐字段一致，addCharacter 是否真的把
 * 角色加了进去。不用夹具（其记录层证明不了「引擎接受」），不用自写镜像
 * （会漂移），全部经 test/helpers/engine-bundle.js 驱动 app.asar 里的：
 *
 *   - parseDataFile（模块 677）：CSV 与 YAML 两条静态加载路径；
 *   - eraStart 的角色装载循环（逐句转写，映射/工具函数取自引擎模块）；
 *   - EraApi.prototype.addCharacter（模块 183，真方法 + 最小假 this）；
 *   - setVar（模块 648）：era.get('chara') / era.get('callname:0:-1') 的寻址。
 *
 * 引擎不在场（无 app.asar）时整文件 skip 并留警告——见 helper 文件头。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const {
  create_add_character,
  create_chara_loader,
  load_engine_bundle,
} = require('./helpers/engine-bundle');
const {
  parse_chara_csv,
  read_text,
  to_chara_yaml,
} = require('../tools/csv-to-yml');

const engine = load_engine_bundle();
const engine_test = engine ? test : test.skip;

const REPO_ROOT = path.resolve(__dirname, '..');
const CHARA_DIR = path.join(REPO_ROOT, 'target', 'CSV', 'Chara');
const SOURCE_FILES = fs
  .readdirSync(CHARA_DIR)
  .filter((name) => /^Chara\d+\.csv$/i.test(name))
  .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));

// 走一遍完整装载：源 CSV 文本 →（引擎 csv 路径 → 装载循环）
function load_source_csv(csv_text) {
  const loader = create_chara_loader();
  loader.load_rows(engine.parse_data_file(csv_text, 'csv', 'chara'));
  return loader;
}

// 走另一条：同一文件的转换产物 →（引擎 yml 路径 → 同一装载循环）
function load_product_yml(yml_text) {
  const loader = create_chara_loader();
  loader.load_rows(engine.parse_data_file(yml_text, 'yml', 'chara'));
  return loader;
}

// —— 全量对拍：45 个源文件，两条加载路径逐字段等价（验收项）——

engine_test(
  '全部 45 个源文件：产物经引擎 yml 路径装载的结果与 csv 路径逐字段一致',
  () => {
    assert.ok(
      SOURCE_FILES.length === 45,
      `target/CSV/Chara 应有 45 个文件，实际 ${SOURCE_FILES.length}`,
    );
    for (const file_name of SOURCE_FILES) {
      const { text } = read_text(path.join(CHARA_DIR, file_name));
      const { groups, warnings } = parse_chara_csv(text);
      assert.deepEqual(
        warnings,
        [],
        `${file_name} 转换告警应为空（形状已实测收窄，出现即需人工核读）`,
      );
      const product = to_chara_yaml(groups, { source: file_name });

      const from_csv = load_source_csv(text);
      const from_yml = load_product_yml(product);

      assert.deepEqual(
        from_yml.static_data.chara,
        from_csv.static_data.chara,
        `${file_name}：引擎读产物的角色预设与读源 CSV 不一致`,
      );
      assert.deepEqual(
        from_yml.static_data.relationship,
        from_csv.static_data.relationship,
        `${file_name}：称呼/相性（relationship）不一致`,
      );
      // 错误清单按多重集比对：转换器按第一列分组会重排行序，缺表错误的
      // 先后随之变化——日志顺序不是语义状态（装载结果才是，上面已逐字段
      // 比过），两侧错得一样多、一样内容即可
      assert.deepEqual(
        [...from_yml.errors].sort(),
        [...from_csv.errors].sort(),
        `${file_name}：装载错误清单不一致（缺表行应两侧同错）`,
      );
    }
  },
);

// —— 入库产物：yml/Chara0.yml 与源逐字段等价（验收项）——

engine_test(
  '入库的 yml/Chara0.yml：引擎装载结果与源 Chara0.csv 逐字段一致',
  () => {
    const product = fs.readFileSync(
      path.join(REPO_ROOT, 'yml', 'Chara0.yml'),
      'utf8',
    );
    const { text } = read_text(path.join(CHARA_DIR, 'Chara0.csv'));

    const from_yml = load_product_yml(product);
    const from_csv = load_source_csv(text);

    assert.deepEqual(from_yml.static_data, from_csv.static_data);
    assert.deepEqual(from_yml.errors, from_csv.errors);
    // 基础字段直接点名：番号/名前/呼び名（引擎规范名 id/name/callname）。
    // 基礎/素質 行在 Base/Talent 表落地前被引擎丢弃（errors 两侧一致），
    // 落表后由上面的全量对拍继续兜底。
    assert.deepEqual(from_yml.static_data.chara[0], {
      id: 0,
      name: '你',
      callname: '你',
    });
  },
);

// —— addCharacter：引擎真方法，无预设不加、有预设真加（本票修的缺陷）——

engine_test(
  '引擎 addCharacter：无角色预设时整段短路，角色 0 加不进去（#35 缺陷的回归锁）',
  () => {
    // 修复前的 yml/ 状态：没有任何 Chara*.yml，staticData.chara 为空
    const empty_loader = create_chara_loader();
    const adder = create_add_character(empty_loader.static_data);

    assert.equal(adder.add(0), false, '引擎语义：无预设返回 false');
    assert.deepEqual(adder.data.no, [], '无预设时 data.no 不进角色');
  },
);

engine_test(
  '引擎 addCharacter：装载 Chara0.yml 后角色 0 进入 data.no，callname 同步',
  () => {
    const product = fs.readFileSync(
      path.join(REPO_ROOT, 'yml', 'Chara0.yml'),
      'utf8',
    );
    const loader = load_product_yml(product);
    assert.deepEqual(Object.keys(loader.static_data.chara), ['0']);

    const adder = create_add_character(loader.static_data);
    assert.equal(adder.add(0), true);

    assert.deepEqual(adder.data.no, [0], '角色 0 必须进入引擎的 data.no');
    // addCharacter 方法体的两条赋值：callname[id][-1] = 预设 name、
    // [id][-2] = 预设 callname ?? name
    assert.equal(adder.data.callname[0][-1], '你');
    assert.equal(adder.data.callname[0][-2], '你');
  },
);

// —— 预设值的折叠缺省：Base/Talent 在场时的引擎对拍（表落地场景的前置证明）——

engine_test(
  '两列行的缺省值经引擎装载落在预设上（Base/Talent 表在场时）',
  () => {
    // 当前 yml/ 还没有 Base/Talent 表，45 文件对拍里这些行两侧同样被丢弃、
    // 折叠缺省值是否写对对装载结果不可见。本用例预置两张表（形状为
    // 变量名→序号，eraStart 变量表分支的 staticData[i][o]=n），把这段语义
    // 也置于引擎对拍之下——表落地后产物无需改动，此处即其前置证明。
    // 第二列两种写法各占一行：序号形（素質,1）与名称形（基礎,体力，经
    // staticData 翻译回序号）。
    const csv_text = '番号,7\n素質,1,\n素質,122,\n基礎,体力,500\n';
    const { groups, warnings } = parse_chara_csv(csv_text);
    assert.deepEqual(warnings, []);
    const yml_text = to_chara_yaml(groups, { source: 'probe.csv' });

    const load_with_tables = (text, suffix) => {
      const loader = create_chara_loader();
      loader.static_data.talent = { 処女: 1, 悪魔: 122 };
      loader.static_data.base = { 体力: 0 };
      loader.load_rows(engine.parse_data_file(text, suffix, 'chara'));
      return loader;
    };

    const from_csv = load_with_tables(csv_text, 'csv');
    const from_yml = load_with_tables(yml_text, 'yml');

    assert.deepEqual(
      from_yml.static_data.chara,
      from_csv.static_data.chara,
      '两条加载路径的预设不一致',
    );
    // 点名期望：两列行的缺省值是 1（talent 表），名称形第二列翻译成序号 0
    assert.deepEqual(from_csv.static_data.chara[7], {
      id: 7,
      base: { 0: 500 },
      talent: { 1: 1, 122: 1 },
    });
  },
);

// —— 引擎寻址：era.get('chara') / era.get('callname:0:-1')（验收项）——

engine_test(
  '引擎 setVar 寻址：get("chara") 为 [0]，get("callname:0:-1") 为「你」',
  () => {
    const product = fs.readFileSync(
      path.join(REPO_ROOT, 'yml', 'Chara0.yml'),
      'utf8',
    );
    const loader = load_product_yml(product);
    const adder = create_add_character(loader.static_data);
    assert.equal(adder.add(0), true);

    // setVar 是 get/set 共用的寻址实现（get(e){return this.set(e)}）；
    // this 字段按两处用到的最小集合构造
    const era_get = (var_name) =>
      engine.set_var.call(
        { data: adder.data, staticData: loader.static_data, global: {} },
        var_name,
      );

    assert.deepEqual(era_get('chara'), [0], 'era.get("chara") 不再为空');
    assert.equal(era_get('callname:0:-1'), '你');
    assert.equal(era_get('callname:0:-2'), '你');
  },
);
