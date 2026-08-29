/**
 * @file 工单 #212 的引擎比对探针：TSTR 建模（#5 三个遗留建模项之一
 * 「TSTR 对应 ere 哪个调教期表」的定论）与 TRAIN_NAME 表名裁定。
 *
 * 验证路线与 test/exflag-chara35.test.js（#113/#179 先例）同构：不用夹具
 * （记录层证明不了「引擎接受」），不自写镜像（会漂移），全部经
 * test/helpers/engine-bundle.js 驱动 app.asar 里的 setVar（模块 648）与
 * beginTrain/endTrain（模块 183 原型方法，真方法 + 最小假 this）。
 *
 * 本文件的结论（写进 yml/TStr.yml 头注与 issue #5 补记）：
 *   1. ere 引擎**没有 tstr 调教期表**：beginTrain 的建桶清单与 endTrain 的
 *      删桶清单都没有 tstr；无表世界写 tstr:90 落 era.error（情形一）；
 *   2. 手工预建桶而不登记 normal 也救不了——写入路径静默丢弃（情形二，
 *      比 key error 更危险：不报错）；
 *   3. yml/TStr.yml 在场 → eraStart 登记 tableType.normal → fillData 建
 *      **持久**桶（beginTrain/endTrain 不碰它）→ tstr:90 可写可读（情形三）；
 *      Emuera 的「BEGIN TRAIN 整族清空」由 train-loop.js 手动镜像；
 *   4. 表名不能叫 trainname：setVar 二段分支对 *name 后缀有只读拦截，
 *      登记 normal + 建桶照样 key error（情形四）——TrainAlias.yml 得名。
 *
 * 引擎不在场（无 app.asar）时整文件 skip 并留警告——见 helper 文件头。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const {
  create_variable_loader,
  load_engine_bundle,
} = require('./helpers/engine-bundle');

const engine = load_engine_bundle();
const engine_test = engine ? test : test.skip;

const REPO_ROOT = path.resolve(__dirname, '..');

// 情形一：现状反面世界——yml/TStr.yml 缺席（名字表/桶/登记三者皆无）。
// 与 tflag 不同（tflag 在 beginTrain 建桶 + setVar 常驻可写名单 s 里），
// tstr 无论调教内外都落函数末尾的 era.error。
engine_test(
  '引擎 setVar：tstr 无表无桶的世界里写 tstr:90 落 era.error（key error，调教内外同判）',
  () => {
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
    engine.set_var.call(fake, 'tstr:90', '爱抚');
    assert.deepEqual(errors, ['key error in getter/setter! key (tstr:90)']);
  },
);

// 情形一补：beginTrain/endTrain 真方法——引擎的调教期表清单里没有 tstr。
// tflag 作正对照（随 beginTrain 建、随 endTrain 删）；预种的 tstr 桶跨
// endTrain 存活（持久表），Emuera 回合域语义的缺口由 train-loop.js 手动补。
engine_test(
  '引擎 beginTrain/endTrain：调教期表清单无 tstr——桶不建不删，预种桶跨 endTrain 存活',
  () => {
    const fake = {
      data: {},
      staticData: {},
      // 本探针的对象是桶的建删；入列逻辑（addCharacterForTrain）不是，
      // 空参数调用即可走完建桶段
      addCharacterForTrain: () => {},
      getCharactersInTrain: engine.era_api.prototype.getCharactersInTrain,
    };
    engine.era_api.prototype.beginTrain.call(fake);
    assert.ok(
      fake.data.tflag !== undefined,
      'tflag 桶随 beginTrain 建（对照）',
    );
    assert.equal(
      fake.data.tstr,
      undefined,
      'tstr 桶不随 beginTrain 建——引擎调教期表清单无 tstr',
    );

    fake.data.tstr = { 90: '爱抚' }; // 模拟 TStr.yml 世界已建的持久桶
    engine.era_api.prototype.endTrain.call(fake);
    assert.equal(fake.data.tflag, undefined, 'endTrain 删 tflag（对照）');
    assert.deepEqual(
      fake.data.tstr,
      { 90: '爱抚' },
      'tstr 桶跨 endTrain 存活——「BEGIN TRAIN 清空」须游戏侧手动镜像',
    );
  },
);

// 情形二：手工预建桶但不登记（「假如引擎建了 tstr 调教期表」的世界）。
// setVar 二段分支要求 s[a] 或 normal 登记才进写入路径；只有桶时落只读
// 回落——不写、不报错、返回 undefined（静默丢弃，比 key error 隐蔽）。
engine_test(
  '引擎 setVar：桶预建而未登记 normal——写入静默不落，读回 undefined',
  () => {
    const fake = {
      staticData: {},
      fieldNames: {},
      data: { tstr: {} },
      global: {},
      extendedTables: {},
      era: { error: () => {} },
    };
    const ret = engine.set_var.call(fake, 'tstr:90', '爱抚');
    assert.equal(ret, undefined);
    assert.deepEqual(
      fake.data.tstr,
      {},
      '未登记 normal 的桶进不了写入路径——静默丢弃',
    );
  },
);

// 情形三：yml/TStr.yml 的世界——装载仓库产物（引擎 parseDataFile + 装载
// 循环转写）+ normal 登记 + fillData 持久桶，tstr:90 字符串写入可读回。
// 这是 @P_C（TSTR:90）与未来 TSTR:30（售卻/處刑）的承载面。
engine_test(
  '引擎 setVar：TStr.yml 装载 + normal 登记——tstr:90 字符串写入落桶可读回',
  () => {
    const product = fs.readFileSync(
      path.join(REPO_ROOT, 'yml', 'TStr.yml'),
      'utf8',
    );
    const loader = create_variable_loader();
    loader.load_rows(engine.parse_data_file(product, 'yml', 'tstr'), 'tstr');
    // 空名表也建 staticData.tstr（eraStart 同款，TFlag.yml 先例）
    assert.deepEqual(loader.static_data.tstr, {});

    const { tableType } = engine.era_api;
    const fake = {
      staticData: loader.static_data,
      fieldNames: loader.field_names,
      data: { tstr: {} }, // fillData 的 normal 分支桶
      global: {},
      extendedTables: { tstr: tableType.normal }, // eraStart 的登记
    };
    assert.equal(engine.set_var.call(fake, 'tstr:90', '振动杖'), '振动杖');
    assert.equal(fake.data.tstr[90], '振动杖');
    // setVar 是 get/set 共用实现——读回
    assert.equal(engine.set_var.call(fake, 'tstr:90'), '振动杖');
    // 清空写法（train-loop 的 BEGIN TRAIN 镜像就是它）
    assert.equal(engine.set_var.call(fake, 'tstr:90', ''), '');
  },
);

// 情形四：表名裁定——trainname 撞 setVar 的 *name 只读拦截。即使名字表、
// 桶、normal 登记三者在场，二段分支照样把它截去 name 后缀去查
// fieldNames.train（不存在），落 key error。TrainAlias.yml 得名的依据。
engine_test(
  '引擎 setVar：表名 trainname 撞 *name 只读拦截——登记 normal + 建桶也 key error',
  () => {
    const errors = [];
    const { tableType } = engine.era_api;
    const fake = {
      staticData: { trainname: {} },
      fieldNames: {},
      data: { trainname: {} },
      global: {},
      extendedTables: { trainname: tableType.normal },
      era: {
        error: (message) => {
          errors.push(message);
        },
      },
    };
    engine.set_var.call(fake, 'trainname:0', '爱抚');
    assert.deepEqual(errors, ['key error in getter/setter! key (trainname:0)']);
    // 对照：trainalias 同一套登记下可写——选名的正面验证
    const fake_alias = {
      staticData: { trainalias: {} },
      fieldNames: {},
      data: { trainalias: {} },
      global: {},
      extendedTables: { trainalias: tableType.normal },
    };
    assert.equal(
      engine.set_var.call(fake_alias, 'trainalias:0', '爱抚'),
      '爱抚',
    );
    assert.equal(fake_alias.data.trainalias[0], '爱抚');
  },
);
