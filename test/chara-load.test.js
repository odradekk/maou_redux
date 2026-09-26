/**
 * @file yml/Chara*.yml 全量装载与角色 0/17 预设消费的行为测试（issue #640）。
 *
 * yml/ 是角色预设的唯一来源，由人工维护。本文件全部经引擎自己的
 * parseDataFile 与装载循环（test/helpers/engine-bundle.js）驱动，钉住：
 *   - 全部 45 张 Chara*.yml 经引擎 yml 路径装载零告警零丢弃——任何缺表行
 *     （フラグ→cflag 等）或格式破坏都会在这里逐文件报出；
 *   - 角色 0（你）与角色 17（村娘，初期奴隶）的预设内容逐项固定，且
 *     addCharacter 之后落进 data 各表可读；
 *   - 引擎行为回归锁：无角色预设时 addCharacter 整段短路、缺 CFlag 名字表时
 *     フラグ 预设行被整行丢弃并报错、角色预设的名称形第二列经名字表翻译。
 *
 * 引擎不在场（无 app.asar）时整文件 skip 并留警告。
 */

'use strict';

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
  attach_variable_tables,
  load_repo_variable_tables,
} = require('./helpers/static-tables');

const engine = load_engine_bundle();
const engine_test = engine ? test : test.skip;

const REPO_ROOT = path.resolve(__dirname, '..');
const YML_DIR = path.join(REPO_ROOT, 'yml');

const repo_tables = load_repo_variable_tables();

/** 库内全部角色预设文件名（Chara<编号>.yml） */
function chara_yml_files() {
  return fs
    .readdirSync(YML_DIR)
    .filter((name) => /^Chara\d+\.yml$/i.test(name))
    .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]));
}

function load_chara_yml(name, extended_tables) {
  const loader = create_chara_loader({ extended_tables });
  attach_variable_tables(loader, repo_tables);
  const text = fs.readFileSync(path.join(YML_DIR, name), 'utf8');
  loader.load_rows(engine.parse_data_file(text, 'yml', 'chara'));
  return loader;
}

// —— 全量装载：每张 yml 至少被引擎解析器读到一次，且零告警零丢弃 ——

engine_test(
  '全部 45 张 yml/Chara*.yml 经引擎装载零告警零丢弃（编号集与文件名一一对应）',
  () => {
    const files = chara_yml_files();
    assert.equal(
      files.length,
      45,
      `库内应有 45 张 Chara*.yml，实际 ${files.length}`,
    );

    const loader = create_chara_loader();
    attach_variable_tables(loader, repo_tables);
    const failures = [];
    for (const name of files) {
      const text = fs.readFileSync(path.join(YML_DIR, name), 'utf8');
      const one = create_chara_loader();
      attach_variable_tables(one, repo_tables);
      one.load_rows(engine.parse_data_file(text, 'yml', 'chara'));
      if (one.errors.length > 0) {
        failures.push(`${name}: ${one.errors.join('；')}`);
      }
      loader.load_rows(engine.parse_data_file(text, 'yml', 'chara'));
    }
    assert.deepEqual(failures, [], '存在装载报错丢弃的角色表');

    const loaded_ids = Object.keys(loader.static_data.chara).sort(
      (a, b) => Number(a) - Number(b),
    );
    const file_ids = files.map((name) => name.match(/\d+/)[0]);
    assert.deepEqual(
      loaded_ids,
      file_ids,
      '装载出的角色编号集必须与文件名集合一致（番号段或文件名改错会在这里红）',
    );
  },
);

// —— 引擎行为回归锁：无预设不加（#35 缺陷的形态）——

engine_test('引擎 addCharacter：无角色预设时整段短路，角色 0 加不进去', () => {
  const empty_loader = create_chara_loader();
  const adder = create_add_character(empty_loader.static_data);

  assert.equal(adder.add(0), false, '引擎语义：无预设返回 false');
  assert.deepEqual(adder.data.no, [], '无预设时 data.no 不进角色');
});

// —— 角色 0（你）：预设内容 + addCharacter 落表 ——

engine_test(
  '角色 0 预设内容逐项固定，addCharacter 后落进 base/maxbase/talent',
  () => {
    const loader = load_chara_yml('Chara0.yml');
    assert.deepEqual(loader.errors, []);
    assert.deepEqual(
      loader.static_data.chara[0],
      {
        id: 0,
        name: '你',
        callname: '你',
        base: { 0: 10000, 1: 10000, 2: 10000 },
        talent: { 1: 1, 122: 1 },
      },
      '角色 0 的预设内容（基礎全满、素質 1/122）',
    );

    const adder = create_add_character(loader.static_data);
    assert.equal(adder.add(0), true);
    assert.deepEqual(adder.data.no, [0], '角色 0 必须进入引擎的 data.no');
    // addCharacter 方法体的两条赋值：callname[id][-1] = 预设 name、
    // [id][-2] = 预设 callname ?? name
    assert.equal(adder.data.callname[0][-1], '你');
    assert.equal(adder.data.callname[0][-2], '你');
    // 基礎预设同时落 base 与 maxbase（引擎对两表取同一预设），表内其余下标初始化 0
    assert.deepEqual(adder.data.base[0], {
      0: 10000,
      1: 10000,
      2: 10000,
      3: 0,
      4: 0,
      10: 0,
    });
    assert.deepEqual(adder.data.maxbase[0], {
      0: 10000,
      1: 10000,
      2: 10000,
      3: 0,
      4: 0,
      10: 0,
    });
    // talent 只列出预设项（267 个下标全量初始化，0 值不逐条抄）
    assert.equal(adder.data.talent[0][1], 1);
    assert.equal(adder.data.talent[0][122], 1);
    assert.equal(adder.data.talent[0][0], 0, '未预设的素质初始化为 0');
  },
);

engine_test(
  '引擎 setVar 寻址：get("chara") 为 [0]，预设的 base/talent 变量可寻址',
  () => {
    const loader = load_chara_yml('Chara0.yml');
    const adder = create_add_character(loader.static_data);
    assert.equal(adder.add(0), true);

    // setVar 是 get/set 共用的寻址实现（get(e){return this.set(e)}）；
    // this 字段按两处用到的最小集合构造（*name 寻址读 fieldNames）
    const era_get = (var_name) =>
      engine.set_var.call(
        {
          data: adder.data,
          staticData: loader.static_data,
          fieldNames: repo_tables.field_names,
          global: {},
        },
        var_name,
      );

    assert.deepEqual(era_get('chara'), [0], 'era.get("chara") 不为空');
    assert.equal(era_get('callname:0:-1'), '你');
    assert.equal(era_get('callname:0:-2'), '你');
    // 预设值经引擎寻址可读（数值下标与名称下标各测一条）
    assert.equal(era_get('base:0:0'), 10000);
    assert.equal(era_get('base:0:体力'), 10000);
    assert.equal(era_get('maxbase:0:2'), 10000);
    assert.equal(era_get('talent:0:122'), 1);
    assert.equal(era_get('talentname:122'), '男人');
    assert.equal(era_get('basename:0'), '体力');
  },
);

// —— 角色 17（村娘，初期奴隶）：预设内容 + addCharacter 落表 ——

engine_test(
  '角色 17 预设内容逐项固定（素質 32 项、フラグ、portcflag 增补）',
  () => {
    const loader = load_chara_yml('Chara17.yml');
    assert.deepEqual(loader.errors, []);
    assert.deepEqual(
      loader.static_data.chara[17],
      {
        id: 17,
        name: '玛奥',
        callname: '玛奥',
        base: { 0: 1500, 1: 1500 },
        talent: {
          0: 1,
          16: 1,
          62: 1,
          69: 1,
          107: 1,
          109: 1,
          152: 1,
          165: 1,
          253: 1,
          300: 4,
          301: 5,
          302: 1,
          303: 2,
          304: 1,
          305: 2,
          306: 2,
          307: 3,
          308: 1,
          309: 1,
          310: 1,
          311: 1,
          312: 20,
          313: 17,
          314: 0,
          315: 3,
          316: 0,
          317: 8,
        },
        cflag: { 1: 1 },
        // 人工增补的移植自建扩展表预设基线（Chara17.yml 头注），装载翻译落在 portcflag.0
        portcflag: { 0: 0 },
      },
      '角色 17 的预设内容（素質 32 项、フラグ、portcflag 增补）',
    );
  },
);

engine_test(
  '引擎 addCharacter：角色 17 进入 data.no，基礎/素質落表，cflag 不落',
  () => {
    const loader = load_chara_yml('Chara17.yml');
    const adder = create_add_character(loader.static_data);

    assert.equal(adder.add(17), true);
    assert.deepEqual(adder.data.no, [17], '角色 17 必须进入引擎的 data.no');
    // callname 的两个负数下标（-1 名前、-2 呼び名）
    assert.equal(adder.data.callname[17][-1], '玛奥');
    assert.equal(adder.data.callname[17][-2], '玛奥');
    // 基礎 0/1 = 1500 同时落 base 与 maxbase，其余基础位初始化 0
    assert.deepEqual(adder.data.base[17], {
      0: 1500,
      1: 1500,
      2: 0,
      3: 0,
      4: 0,
      10: 0,
    });
    assert.deepEqual(adder.data.maxbase[17], {
      0: 1500,
      1: 1500,
      2: 0,
      3: 0,
      4: 0,
      10: 0,
    });
    // 素质预设列出三条：0 处女（两列行缺省 1）、300 头发颜色 = 4、
    // 314 种族 = 0（三列行的显式 0 值，防止「0 值被当空值丢掉」的偏差）
    assert.equal(adder.data.talent[17][0], 1);
    assert.equal(adder.data.talent[17][300], 4);
    assert.equal(adder.data.talent[17][314], 0);
    // initCharaTable 的预设拷贝只覆盖名字表内登记的下标，cflag 名字表为空
    // → 预设 cflag 整组不落 data（CFlag.yml 头注释的依据）
    assert.deepEqual(adder.data.cflag[17], {});
  },
);

engine_test(
  '缺 CFlag 名字表时 フラグ 行被整行丢弃并报错（CFlag.yml 存在理由的回归锁）',
  () => {
    const text = fs.readFileSync(path.join(YML_DIR, 'Chara17.yml'), 'utf8');
    // 模拟库内没有 CFlag.yml 的世界
    const loader = create_chara_loader();
    attach_variable_tables(loader, repo_tables);
    delete loader.static_data.cflag;
    loader.load_rows(engine.parse_data_file(text, 'yml', 'chara'));

    assert.deepEqual(loader.errors, ['角色数据表不存在: cflag!']);
    assert.equal(
      loader.static_data.chara[17].cflag,
      undefined,
      'フラグ 预设行必须被丢弃（引擎行为），而非静默保留',
    );
  },
);

// —— 预设行的名称形第二列：经名字表翻译回序号 ——

engine_test(
  '角色预设的名称形第二列经名字表翻译（基礎「体力」→ base 0）',
  () => {
    const yml_text = [
      '"番号": 7',
      '"名前": "探针"',
      '"呼び名": "探针"',
      '"基礎":',
      '  "体力": 500',
      '',
    ].join('\n');
    const loader = create_chara_loader();
    attach_variable_tables(loader, repo_tables);
    loader.load_rows(engine.parse_data_file(yml_text, 'yml', 'chara'));

    assert.deepEqual(loader.errors, []);
    assert.deepEqual(
      loader.static_data.chara[7],
      { id: 7, name: '探针', callname: '探针', base: { 0: 500 } },
      '名称形第二列必须经名字表翻译回序号 0',
    );
  },
);
