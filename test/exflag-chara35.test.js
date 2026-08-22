/**
 * @file 工单 #113 的引擎比对测试：ExFlag 落表、Chara35（菲娅）入库、
 * Flag.yml 侵略线条目。
 *
 * 验证路线与 test/chara-yml.test.js / test/variable-yml.test.js 同构：不用
 * 夹具（记录层证明不了「引擎接受」），不用自写镜像（会漂移），全部经
 * test/helpers/engine-bundle.js 驱动 app.asar 里的 parseDataFile、eraStart
 * 装载循环转写与 setVar（模块 648，真方法 + 最小假 this）。
 *
 * 本票的存在理由（工单动机的回归锁）：EX_FLAG 是扩展普通表，yml/ExFlag.yml
 * 缺席的世界里 `era.set('exflag:99', …)` 在引擎 setVar 的二段寻址分支既找不到
 * data 桶也过不了 extendedTables 守卫，落到函数末尾的
 * `era.error('key error in getter/setter!')`——侵略线写威望（EX_FLAG:99）
 * 与结局链写 EX_FLAG:2801-2816 之前，这张表必须先落地。
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
  create_variable_loader,
  load_engine_bundle,
} = require('./helpers/engine-bundle');
const {
  attach_variable_tables,
  load_repo_variable_tables,
} = require('./helpers/static-tables');
const { read_text } = require('../tools/csv-to-yml');
// T20 归一表（#60）：CSV 侧装载前过同一张表，比对语义是「产物 = 归一(源)」
const { to_simplified_yaml } = require('../tools/lang-normalize');

const engine = load_engine_bundle();
const engine_test = engine ? test : test.skip;

const REPO_ROOT = path.resolve(__dirname, '..');

// —— ExFlag：人工表装载形状（验收项：覆盖 99/4444/2801-2816/101 等槽位） ——

engine_test(
  'ExFlag.yml 经引擎装载：36 条名称→序号映射与 fieldNames 正确',
  () => {
    const product = fs.readFileSync(
      path.join(REPO_ROOT, 'yml', 'ExFlag.yml'),
      'utf8',
    );
    const loader = create_variable_loader();
    loader.load_rows(
      engine.parse_data_file(product, 'yml', 'exflag'),
      'exflag',
    );

    // 人工表不应触发序号去重告警
    assert.deepEqual(loader.warnings, []);
    const table = loader.static_data.exflag;
    assert.equal(
      Object.keys(table).length,
      36,
      `ExFlag.yml 应装载 36 条（34 实用下标 + 2815/2816 槽位），实际 ${
        Object.keys(table).length
      }`,
    );
    // 工单点名的四个槽位
    assert.equal(table['威望'], 99);
    assert.equal(table['非作弊资金'], 4444);
    assert.equal(table['天神宫侵攻度'], 101);
    // 结局线 2801-2816 连号齐全（2815/2816 为原作错写 FLAG 侧的槽位，见该 yml 头注）
    for (let id = 2801; id <= 2816; id += 1) {
      assert.ok(
        Object.values(table).includes(id),
        `结局线槽位 ${id} 缺失（ENDCHECK 链的分派区间必须完整）`,
      );
    }
    // 其余三段：魔王继承 / 勇者位域 / MOD 银行 / 水晶球
    assert.equal(table['上届魔王'], 0);
    assert.equal(table['勇者击破位域'], 95);
    assert.equal(table['魔改开关位图'], 9000);
    assert.equal(table['水晶球库存'], 9010);
    // name/type 元数据进 fieldNames 的 k/t（#5 三层命名的落点）
    assert.deepEqual(loader.field_names.exflag[99], {
      n: '威望',
      k: 'prestige',
      t: 'number',
    });
  },
);

// —— ExFlag：引擎真寻址，写入与名称寻址（验收项：引擎侧比对） ——

engine_test(
  '引擎 setVar：扩展普通表登记后 exflag:99 与 exflag:威望 写入落桶，add 生效',
  () => {
    const product = fs.readFileSync(
      path.join(REPO_ROOT, 'yml', 'ExFlag.yml'),
      'utf8',
    );
    const loader = create_variable_loader();
    loader.load_rows(
      engine.parse_data_file(product, 'yml', 'exflag'),
      'exflag',
    );

    // fake this 的字段按 setVar（模块 648）二段分支的最小集合构造：
    // staticData（名称翻译）+ data.exflag（fillData 建的桶）+ extendedTables
    // （eraStart 装载 yml 时对非内建表名登记 tableType.normal，Audio.yml
    // 头注记录的机制，#69 实测）
    const { tableType } = engine.era_api;
    const fake = {
      staticData: loader.static_data,
      fieldNames: loader.field_names,
      data: { exflag: {} },
      global: {},
      extendedTables: { exflag: tableType.normal },
    };

    // 数字寻址写入：@EVENTFIRST 的威望播种（EX_FLAG:99 = 70）
    assert.equal(engine.set_var.call(fake, 'exflag:99', 70), 70);
    assert.equal(fake.data.exflag[99], 70);
    // 名称寻址与数字寻址等价（包装层与门面可用中文名）
    assert.equal(engine.set_var.call(fake, 'exflag:威望', 88), 88);
    assert.equal(fake.data.exflag[99], 88);
    // 加法（isAdd）：每次侵略威望 +2 的写法
    assert.equal(engine.set_var.call(fake, 'exflag:99', 2, true), 90);
    // 读回（setVar 是 get/set 共用实现）
    assert.equal(engine.set_var.call(fake, 'exflag:99'), 90);
  },
);

engine_test(
  '引擎 setVar：ExFlag.yml 缺席的世界里写 exflag 直接 key error（本表存在的理由）',
  () => {
    // 模拟 yml/ 没有 ExFlag.yml 的装载状态：名字表、data 桶、extendedTables
    // 登记三者皆无（登记发生在 eraStart 装载 yml 时，表不在则不登记）
    const errors = [];
    const fake = {
      staticData: {},
      fieldNames: {},
      data: {},
      global: {},
      extendedTables: {},
      era: {
        error: (message) => {
          errors.push(message);
        },
      },
    };
    // setVar 未抛错但落到了函数末尾的 era.error——真引擎里这是启动/运行期
    // 报错路径（工单「不落表就当场挂」的确切机制，对一维自定义表是
    // key error 而非静默）
    engine.set_var.call(fake, 'exflag:99', 70);
    assert.deepEqual(errors, ['key error in getter/setter! key (exflag:99)']);

    // 名字表不在 + 桶在 + 登记在（PR #57 逐族实测的「直接崩溃」形态，二段版）：
    // u = i(this.staticData[a][u], u) 在 undefined 上取下标，TypeError
    const { tableType } = engine.era_api;
    const fake_bucket = {
      staticData: {},
      fieldNames: {},
      data: { exflag: {} },
      global: {},
      extendedTables: { exflag: tableType.normal },
      era: { error: () => {} },
    };
    assert.throws(
      () => engine.set_var.call(fake_bucket, 'exflag:99', 70),
      /Cannot read properties of undefined \(reading '99'\)/,
    );
  },
);

// —— Chara35（菲娅）：入库产物装载（验收项：与源 CSV 逐字段一致） ——

const repo_tables = load_repo_variable_tables();

function load_source_csv(csv_text) {
  const loader = create_chara_loader();
  attach_variable_tables(loader, repo_tables);
  loader.load_rows(
    engine.parse_data_file(to_simplified_yaml(csv_text), 'csv', 'chara'),
  );
  return loader;
}

function load_product_yml(yml_text) {
  const loader = create_chara_loader();
  attach_variable_tables(loader, repo_tables);
  loader.load_rows(engine.parse_data_file(yml_text, 'yml', 'chara'));
  return loader;
}

engine_test(
  '入库的 yml/Chara35.yml：引擎装载零告警零丢弃，预设与源 CSV 逐字段一致',
  () => {
    const product = fs.readFileSync(
      path.join(REPO_ROOT, 'yml', 'Chara35.yml'),
      'utf8',
    );
    const { text } = read_text(
      path.join(REPO_ROOT, 'target', 'CSV', 'Chara', 'Chara35.csv'),
    );

    const from_yml = load_product_yml(product);
    const from_csv = load_source_csv(text);

    // 零告警零丢弃：缺表行（ABL/CSTR → abl/cstr）会在这里逐行报出——#113 起
    // helpers/static-tables.js 登记 Abl.yml/CStr.yml，菲娅是首个带这两类
    // 预设行的入库角色
    assert.deepEqual(from_yml.errors, []);
    assert.deepEqual(
      from_yml.static_data.chara,
      from_csv.static_data.chara,
      '菲娅预设两条装载路径不一致（产物 ≠ 归一(源)）',
    );
    assert.deepEqual(
      from_yml.static_data.relationship,
      from_csv.static_data.relationship,
    );
    assert.deepEqual(from_yml.errors, from_csv.errors);
    // 报出期望（值均来自源 CSV）：菲娅的 22 项フラグ（含负值 -1 与大值
    // 1270）、素質 36 项（两列行缺省 1 与三列行显式值）、ABL、CSTR 第一人称
    assert.deepEqual(
      from_yml.static_data.chara[35],
      {
        id: 35,
        name: '菲娅',
        callname: '菲娅',
        base: { 0: 1800, 1: 1800 },
        cflag: {
          1: 1,
          9: 1,
          11: 15,
          12: 15,
          13: 15,
          14: 15,
          16: -1,
          41: 131,
          45: 0,
          46: 0,
          151: 99,
          420: 1,
          451: 10,
          452: 10,
          453: 1270,
          454: 280,
          455: 590,
          456: 550,
          457: 650,
          550: -1,
          800: 5,
        },
        talent: {
          0: 1,
          10: 1,
          17: 1,
          23: 1,
          35: 1,
          40: 1,
          42: 1,
          44: 1,
          63: 1,
          69: 1,
          88: 1,
          100: 1,
          112: 1,
          116: 1,
          125: 1,
          132: 1,
          152: 1,
          300: 5,
          301: 1,
          302: 201,
          303: 1,
          304: 1,
          305: 5,
          306: 4,
          307: 2,
          308: 50,
          309: 1,
          310: 1,
          311: 1,
          312: 25,
          313: 9,
          314: 0,
          315: 8,
          316: 12,
          317: 8,
        },
        abl: { 10: 2, 21: 3 },
        cstr: { 60: '菲娅' },
      },
      '菲娅预设与报出期望不一致（值应逐项等于源 Chara35.csv）',
    );
  },
);

engine_test(
  '引擎 addCharacter：装载 Chara35.yml 后菲娅进入 data.no，预设落各表（ENDING_1 的 ADDCHARA 35）',
  () => {
    const product = fs.readFileSync(
      path.join(REPO_ROOT, 'yml', 'Chara35.yml'),
      'utf8',
    );
    const loader = load_product_yml(product);
    const adder = create_add_character(loader.static_data);

    assert.equal(adder.add(35), true);
    assert.deepEqual(adder.data.no, [35], '角色 35 必须进入引擎的 data.no');
    // callname 的两个负数下标（CONTEXT.md：-1 名前、-2 呼び名）
    assert.equal(adder.data.callname[35][-1], '菲娅');
    assert.equal(adder.data.callname[35][-2], '菲娅');
    // 基礎 0/1 = 1800 同时落 base 与 maxbase
    assert.equal(adder.data.base[35][0], 1800);
    assert.equal(adder.data.base[35][1], 1800);
    assert.equal(adder.data.maxbase[35][0], 1800);
    // 素質抽查：0 处女（两列行缺省 1）、302 头发长度 201、314 种族 0（显式
    // 零值）、317 恋父情结 8
    assert.equal(adder.data.talent[35][0], 1);
    assert.equal(adder.data.talent[35][302], 201);
    assert.equal(adder.data.talent[35][314], 0);
    assert.equal(adder.data.talent[35][317], 8);
    // ABL 预设随 #113 的 helper 登记真正落表（此前 Abl.yml 在库但比对两侧
    // 同丢）
    assert.equal(adder.data.abl[35][10], 2);
    assert.equal(adder.data.abl[35][21], 3);
    // 引擎行为记录（Chara17 同款，见 CFlag.yml 头注）：预设的 cflag 值不随
    // addCharacter 落 data——initCharaTable 只覆盖名字表内登记的下标，而
    // CFlag.yml 是空表。菲娅的 22 项フラグ预设（含 151 = 99）是否需要在加入
    // 时直接生效，由 ENDING_1 演出票对照原作 @CHAR_INIT 定夺
    assert.deepEqual(adder.data.cflag[35], {});
  },
);

// —— Flag.yml 侵略线条目（验收项：FLAG:9/81/82/86-91/400/502 补齐） ——

engine_test('Flag.yml 侵略线条目经引擎装载：11 条新增映射与 id 对应', () => {
  const product = fs.readFileSync(
    path.join(REPO_ROOT, 'yml', 'Flag.yml'),
    'utf8',
  );
  const loader = create_variable_loader();
  loader.load_rows(engine.parse_data_file(product, 'yml', 'flag'), 'flag');

  assert.deepEqual(loader.warnings, []);
  const table = loader.static_data.flag;
  // 侵攻度三区 + 人间界（81/86/88/90）、征服标记三区（87/89/91）、ENDING_1
  // 已播（82）、特别税（9）、勇者战役（400）、2D 地图（502）
  assert.equal(table['人间界侵攻度'], 81, '人间界侵攻度必须落在原作下标 81');
  assert.equal(table['人间界陷落'], 82);
  assert.equal(table['精灵领域侵攻度'], 86);
  assert.equal(table['精灵领域征服'], 87);
  assert.equal(table['龙之山脉侵攻度'], 88);
  assert.equal(table['龙之山脉征服'], 89);
  assert.equal(table['天界侵攻度'], 90);
  assert.equal(table['天界征服'], 91);
  assert.equal(table['特别税加成'], 9);
  assert.equal(table['勇者战役中'], 400);
  assert.equal(table['二维地图模式'], 502);
  // 保留区仍在（#22 并入的 DAY/TIME/MONEY 与角色指针），原作下标与 10000
  // 起保留区不撞号
  assert.equal(table['天数'], 10000);
  assert.equal(table['所持金'], 10004);
});
