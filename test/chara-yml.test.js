/**
 * @file 角色表迁移的引擎比对测试（issue #35；#50 增 Chara17 村娘与 CFlag 表）。
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
  attach_variable_tables,
  load_repo_variable_tables,
} = require('./helpers/static-tables');
const {
  parse_chara_csv,
  read_text,
  to_chara_yaml,
} = require('../tools/csv-to-yml');
// T20 归一表（#60）：产物名在生成期归一为简体（csv-to-yml 的
// emit_product_lines），CSV 侧过同一张表再装载——比对语义是「产物 = 归一(源)」
const { to_simplified_yaml } = require('../tools/lang-normalize');

const engine = load_engine_bundle();
const engine_test = engine ? test : test.skip;

const REPO_ROOT = path.resolve(__dirname, '..');
const CHARA_DIR = path.join(REPO_ROOT, 'target', 'CSV', 'Chara');
const SOURCE_FILES = fs
  .readdirSync(CHARA_DIR)
  .filter((name) => /^Chara\d+\.csv$/i.test(name))
  .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));

// 入库的变量表（#38：Base/Talent/Item，用引擎代码装载 yml/ 产物）。
// 表落地前，基礎/素質 预设行在两条加载路径上同样被丢弃（#35 验收时的
// 比对盲区）；表落地后挂上真表，这些字段进入比对视野——装载循环把
// staticData.base/talent 的 name→id 翻译用在预设行上，45 文件比对因此
// 从「两侧同错」升级为「两侧同生效」。
const repo_tables = load_repo_variable_tables();

// 走一遍完整装载：源 CSV 文本 →（引擎 csv 路径 → 装载循环）。
// T20 缝（#60）：CSV 文本先过 to_simplified_yaml（与生成器对产物文本用的
// 同一个函数、同一份引擎列名键保护）——两侧同变换后逐字段一致即
// 「产物 = 归一(源)」；名字差异只能来自表，不能来自装载。
function load_source_csv(csv_text) {
  const loader = create_chara_loader();
  attach_variable_tables(loader, repo_tables);
  loader.load_rows(
    engine.parse_data_file(to_simplified_yaml(csv_text), 'csv', 'chara'),
  );
  return loader;
}

// 走另一条：同一文件的转换产物 →（引擎 yml 路径 → 同一装载循环）
function load_product_yml(yml_text) {
  const loader = create_chara_loader();
  attach_variable_tables(loader, repo_tables);
  loader.load_rows(engine.parse_data_file(yml_text, 'yml', 'chara'));
  return loader;
}

// —— 全量比对：45 个源文件，两条加载路径逐字段等价（验收项）——

// cstr 空值行两侧装载分歧的登记归一（#113 登记，先例：Item 重名的 dropped 集）：
// 源 CSV 的「CSTR,下标,,」空值行（全 45 文件仅 Chara150 的 3/4 两行）在 csv
// 路径由装载循环补缺省 ''；yml 产物如实写出的 "" 经引擎 getNumber 读回 0——
// 空串在引擎的 yml 装载路径不可表达，属两条路径的固有分歧而非转换器偏差。
// 比对时把 cstr 里值为 ''（csv 侧）或 0（yml 侧）的键从两侧剥除，其余 cstr
// 键与其余全部字段仍逐字段严格比对；剥除集若意外扩大，下方 deepEqual 会在
// 其他角色上红。
const strip_empty_cstr = (preset) => {
  if (!preset.cstr) {
    return preset;
  }
  const cstr = {};
  for (const [key, value] of Object.entries(preset.cstr)) {
    if (value !== '' && value !== 0) {
      cstr[key] = value;
    }
  }
  return { ...preset, cstr };
};

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

      // 剥除登记在案的 cstr 空值分歧后逐字段比对（见 strip_empty_cstr 注释）；
      // 分歧集若意外扩大（新角色出现空值 CSTR 行之外的不一致），在此红
      const map_presets = (chara) =>
        Object.fromEntries(
          Object.entries(chara).map(([id, preset]) => [
            id,
            strip_empty_cstr(preset),
          ]),
        );
      assert.deepEqual(
        map_presets(from_yml.static_data.chara),
        map_presets(from_csv.static_data.chara),
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
    // 基础字段直接列出：番号/名前/呼び名（引擎规范名 id/name/callname）。
    // #38 起变量表在场，基礎/素質 预设不再被丢弃（错误清单为空、预设
    // 落进 preset.base/talent），由上方全量比对兜底。
    assert.deepEqual(from_yml.errors, []);
    assert.deepEqual(from_yml.static_data.chara[0], {
      id: 0,
      name: '你',
      callname: '你',
      base: { 0: 10000, 1: 10000, 2: 10000 },
      talent: { 1: 1, 122: 1 },
    });
  },
);

// —— addCharacter：引擎真方法，无预设不加、有预设真加（这张票修的缺陷）——

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

// —— 预设落点：表在场后基礎/素質 真的进变量（#38 验收项） ——

engine_test(
  '引擎 addCharacter：基礎 0/1/2 与 素質 1/122 落到 base/maxbase/talent 上',
  () => {
    // #35 时代 Base/Talent 缺表，这两个初始化循环被 `void 0 !==` 守卫
    // 整段跳过（本文件上一条用例是其回归锁）；#38 表落地后预设值必须
    // 真正落进引擎数据层。基礎预设同时落 base 与 maxbase（dev-guide：
    // 基础属性预设的是最大值；引擎 addCharacter 对两表取同一预设）。
    const product = fs.readFileSync(
      path.join(REPO_ROOT, 'yml', 'Chara0.yml'),
      'utf8',
    );
    const loader = load_product_yml(product);
    const adder = create_add_character(loader.static_data);
    assert.equal(adder.add(0), true);

    // base 表 6 个下标全量：预设的 0/1/2 = 10000，其余初始化为 0
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

// —— 预设值的折叠缺省：经引擎装载落在预设上（两列行缺省值 + 名称形翻译）——

engine_test(
  '两列行的缺省值经引擎装载落在预设上（挂入库的 Base/Talent 表）',
  () => {
    // #35 时代此用例以手工预置的两张表钉住「折叠缺省值」语义（当时 yml/
    // 还没有 Base/Talent，45 文件比对对这些行天然盲）；#38 表落地后改挂
    // 入库产物，语义钉住不变：第二列两种写法各占一行——序号形（素質,1）
    // 与名称形（基礎,体力，经 staticData 翻译回序号 0）。
    const csv_text = '番号,7\n素質,1,\n素質,122,\n基礎,体力,500\n';
    const { groups, warnings } = parse_chara_csv(csv_text);
    assert.deepEqual(warnings, []);
    const yml_text = to_chara_yaml(groups, { source: 'probe.csv' });

    const from_csv = load_source_csv(csv_text);
    const from_yml = load_product_yml(yml_text);

    assert.deepEqual(
      from_yml.static_data.chara,
      from_csv.static_data.chara,
      '两条加载路径的预设不一致',
    );
    // 报出期望：两列行的缺省值是 1（talent 表），名称形第二列翻译成序号 0
    assert.deepEqual(from_csv.static_data.chara[7], {
      id: 7,
      base: { 0: 500 },
      talent: { 1: 1, 122: 1 },
    });
  },
);

// —— 引擎寻址：era.get('chara') / era.get('callname:0:-1') / 预设变量（验收项）——

engine_test(
  '引擎 setVar 寻址：get("chara") 为 [0]，预设的 base/talent 变量可寻址',
  () => {
    const product = fs.readFileSync(
      path.join(REPO_ROOT, 'yml', 'Chara0.yml'),
      'utf8',
    );
    const loader = load_product_yml(product);
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

    assert.deepEqual(era_get('chara'), [0], 'era.get("chara") 不再为空');
    assert.equal(era_get('callname:0:-1'), '你');
    assert.equal(era_get('callname:0:-2'), '你');
    // #38 验收：预设值经引擎寻址可读（数值下标与名称下标各测一条）
    assert.equal(era_get('base:0:0'), 10000);
    assert.equal(era_get('base:0:体力'), 10000);
    assert.equal(era_get('maxbase:0:2'), 10000);
    assert.equal(era_get('talent:0:122'), 1);
    assert.equal(era_get('talentname:122'), '男人');
    assert.equal(era_get('basename:0'), '体力');
  },
);

// —— #50：村娘（Chara17，初期奴隶）——
//
// 验收三条：入库产物经引擎 yml 路径装载零告警零丢弃（フラグ 行依赖
// CFlag.yml 建出的 staticData.cflag，缺表即整行丢弃——下方有回归锁）；
// addCharacter 真把 17 加进去；callname 寻址取到「玛奥」（村娘分支囚禁
// 播报的读数源）。

engine_test(
  '入库的 yml/Chara17.yml：引擎装载零告警零丢弃，预设与源 CSV 逐字段一致',
  () => {
    const product = fs.readFileSync(
      path.join(REPO_ROOT, 'yml', 'Chara17.yml'),
      'utf8',
    );
    const { text } = read_text(path.join(CHARA_DIR, 'Chara17.csv'));

    const from_yml = load_product_yml(product);
    const from_csv = load_source_csv(text);

    // 零告警零丢弃：缺表行（如 フラグ → cflag）会在这里逐行报出
    assert.deepEqual(from_yml.errors, []);
    // 预设逐字段（フラグ,1,1 依赖 CFlag.yml 落进 cflag）
    assert.deepEqual(from_yml.static_data.chara[17], {
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
      // #67 人工增补（非转换内容，见 Chara17.yml 头注）：移植自建扩展表的
      // 预设基线，装载翻译落在 portcflag.0
      portcflag: { 0: 0 },
    });
    // 与源 CSV 路径逐字段一致——#67 起标准为「源 + 登记在案的移植增补」：
    // 剥离 portcflag 增补键后预设与源一致；增补本身的装载、登记与落桶
    // 由 test/portcflag-table.test.js 单独钉住
    const preset_17 = { ...from_yml.static_data.chara[17] };
    delete preset_17.portcflag;
    assert.deepEqual(preset_17, from_csv.static_data.chara[17]);
    assert.deepEqual(
      from_yml.static_data.relationship,
      from_csv.static_data.relationship,
    );
    assert.deepEqual(from_yml.errors, from_csv.errors);
  },
);

engine_test(
  '缺 CFlag 名字表时 フラグ 行被整行丢弃并报错（yml/CFlag.yml 存在理由的回归锁）',
  () => {
    const product = fs.readFileSync(
      path.join(REPO_ROOT, 'yml', 'Chara17.yml'),
      'utf8',
    );
    // 模拟 yml/ 没有 CFlag.yml 的世界（#50 前的装载状态）
    const loader = create_chara_loader();
    attach_variable_tables(loader, repo_tables);
    delete loader.static_data.cflag;
    loader.load_rows(engine.parse_data_file(product, 'yml', 'chara'));

    assert.deepEqual(loader.errors, ['角色数据表不存在: cflag!']);
    assert.equal(
      loader.static_data.chara[17].cflag,
      undefined,
      'フラグ 预设行必须被丢弃（引擎行为），而非静默保留',
    );
  },
);

engine_test(
  '引擎 addCharacter：装载 Chara17.yml 后角色 17 进入 data.no，callname 同步',
  () => {
    const product = fs.readFileSync(
      path.join(REPO_ROOT, 'yml', 'Chara17.yml'),
      'utf8',
    );
    const loader = load_product_yml(product);
    const adder = create_add_character(loader.static_data);

    assert.equal(adder.add(17), true);
    assert.deepEqual(adder.data.no, [17], '角色 17 必须进入引擎的 data.no');
    // 村娘分支囚禁播报的读数源（#5：SAVESTR/CSTR 名字承载）
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
    // 引擎行为记录：initCharaTable 的预设拷贝只覆盖名字表内登记的下标，
    // cflag 名字表为空 → 预设 cflag 不落 data（CFlag.yml 头注释的依据）；
    // 村娘分支随后写 cflag:17:1 = 0 覆盖预设位，无行为差异。
    assert.deepEqual(adder.data.cflag[17], {});
  },
);
