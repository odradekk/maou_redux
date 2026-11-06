/**
 * @file EX_TALENT 落表与常规角色批入库的验证（issue #138，决议 #105）。
 *
 * 完成判定是「产物 + 可消费」（#105 决议一）：27 张 Chara*.yml（1–24 除
 * 已入库的 0/17、31–34）进库，且经引擎真 addCharacter 加入后预设值确实
 * 可读。全部驱动引擎自己的代码（test/helpers/engine-bundle.js），不经
 * 夹具（其记录层证明不了「引擎接受」，#21/#22 的教训）、不用自写镜像。
 *
 * 验证面：
 *   - 登记契约（无引擎也跑）：Ex_Talent.yml 在场 ⇔ ex_talent 已登记
 *     （portcflag 的同款实害：有表没登记 → 引擎按一维自动生效，角色桶
 *     永不建、写入静默丢弃——正是本工单要修的 #21 已知缺口）。
 *   - 版本轴（无引擎也跑）：#138 破坏性改动两条命中（ADR-0006 判定表：
 *     extendedCharaTables 加表 + 角色预设内容变更），0.0.0 → 0.0.1。
 *   - 常规批装载：27 张库内产物经引擎 yml 路径装载（逐字段比对随转换器删除，
 *     内容检查由 test/chara-load.test.js 的全量装载与逐项固定承接）；
 *   - 消费验证：base/talent/abl/mark 预设落 data 可读；#118 定夺的边界
 *     （cflag/cstr 预设不随 addCharacter 落 data）如实钉住，另有两处同族
 *     缺口（Chara34 的 MARK:4、Chara24 的相性预设，见各用例注释）。
 *   - ex_talent：登记后 addCharacter 建桶、chara-ex.js 同款写入被引擎
 *     接受；未登记的反面；存档往返；旧档缺桶时 fillData 为已加入角色
 *     重建桶（引擎 4.8.3 起，4.8.0 是死分支 #13）。
 *   - 名字与预设（#834）：yml/Ex_Talent.yml 登记 17 个名字后，角色加入时的
 *     ex_talent 终值与「chara-ex.js 手工赋值」时代逐键相同；读档的 fillData
 *     只补缺、不覆盖已有值。
 *
 * 引擎不在场（无 app.asar）时引擎级用例 skip 并留警告；文件级用例始终跑。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
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
const TABLE_NAME = 'ex_talent';

// 常规批（#105 决议二的第一批）：0/17/35 已随前票入库，不重做
const BATCH_IDS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22, 23,
  24, 31, 32, 33, 34,
];

// 本工单登记的两张二维扩展表（_fixed.json 的登记集）
const EXTENDED_TABLES = { portcflag: 2, ex_talent: 2 };

// yml/Ex_Talent.yml 登记的全部序号（#834 从头注挪进来的 17 个名字）。
// 排序即增长序，与 yml 里的书写顺序一致
const EX_TALENT_IDS = [
  0, 1, 2, 3, 4, 101, 102, 103, 104, 200, 223, 777, 801, 901, 902, 903, 904,
];

// 带 EX 素质预设的八个角色（#834 之前由 chara-ex.js 的注册实现在加入时写）
const EX_TALENT_PRESET_IDS = [0, 31, 32, 33, 34, 35, 223, 777];

// 「改动前」的分行赋值：chara-ex.js 八个注册实现逐字照抄，作为逐键对照的
// 旧路径输入。写在这边而不是从代码里取——它描述的正是本工单删掉的那段代码，
// 留在实现里就没有可对照的第二份了
const OLD_JOIN_WRITES = {
  0: { 200: 1 },
  31: { 101: 1 },
  32: { 102: 1 },
  33: { 103: 1 },
  34: { 4: 1, 801: 1, 901: 1 },
  35: { 104: 1 },
  223: { 223: 1 },
  777: { 777: 1 },
};

function read_yml(name) {
  return fs.readFileSync(path.join(YML_DIR, name), 'utf8');
}

// —— 登记契约与产物在场（仓库文件层，无引擎也跑）——

test('登记契约：Ex_Talent.yml 在场则 ex_talent 必须登记（未登记即静默降一维，回到 #21 缺口）', () => {
  const fixed = JSON.parse(read_yml('_fixed.json'));
  const registered = (fixed?.system?.extendedCharaTables ?? []).map((name) =>
    name.toLowerCase(),
  );
  assert.ok(
    registered.includes(TABLE_NAME),
    'yml/Ex_Talent.yml 存在而 ex_talent 未登记——引擎按一维自动生效，' +
      'addCharacter 不建角色桶，chara-ex.js 的九处写入全部静默丢弃',
  );
});

test('常规批产物在场：27 张 Chara*.yml（1–24 除 0/17、31–34）齐全', () => {
  for (const id of BATCH_IDS) {
    assert.ok(
      fs.existsSync(path.join(YML_DIR, `Chara${id}.yml`)),
      `yml/Chara${id}.yml 缺失`,
    );
  }
});
// 已发布的最早版本 0.1.0 的【版本】编码。0.1.0 起对外发布、玩家手里有存档，
// 【最低支持版本】不得高于它（ADR-0006「玩家存档保护」）；要提高它，必须先由
// 用户决定并记进 ADR-0006，再改这里
const OLDEST_RELEASED_VERSION = 1000;

test('版本轴：【版本】与版本代号的编码一致，【最低支持版本】不高于已发布的 0.1.0', () => {
  const text = read_yml('GameBase.yml');
  const field = (name) => {
    const m = new RegExp(`^"${name}": (.+)$`, 'm').exec(text);
    assert.ok(m, `GameBase.yml 缺少字段「${name}」`);
    return JSON.parse(m[1]);
  };
  const version = field('版本');
  const version_name = field('版本代号');
  const allow = field('最低支持版本');
  // ADR-0006：【版本】= major×1000000 + minor×1000 + patch；
  // 【游戏标识】冻结 931060（另断言防误动）
  const [major, minor, patch] = version_name.split('.').map(Number);
  assert.equal(
    version,
    major * 1000000 + minor * 1000 + patch,
    `【版本】${version} 与【版本代号】"${version_name}" 的编码不一致`,
  );
  assert.ok(
    allow <= OLDEST_RELEASED_VERSION,
    `【最低支持版本】${allow} 高于已发布的 0.1.0（${OLDEST_RELEASED_VERSION}），0.1.0 的玩家存档会被拒绝读取`,
  );
  assert.ok(allow <= version, '【最低支持版本】不得高于【版本】');
  assert.equal(field('游戏标识'), 931060, '【游戏标识】冻结，动它引擎拒绝启动');
});

test('版本下限：【版本】不得低于 1——0 会被 loadData 的 truthy 短路当空值拒档（#138 追加）', () => {
  // 引擎约束（app.asar 的 loadData 逐字）：`if (r.version && !(r.version <
  // this.staticData.gamebase.allowVersion))`——r.version 为 0 时 falsy，短路
  // 在版本比较之前，任何存档都落「saveN.sav 版本过低（0）！」。#135 定的
  // 0.0.0 轴因此整体不可用（存得进、读不回），本断言独立于编码一致性——
  // 把【版本】与【版本代号】一致地改回 0.0.0 也能在这里红。闸门行为的
  // 引擎级证明见下方 engine_test 用例。
  const text = read_yml('GameBase.yml');
  const m = /^"版本": (.+)$/m.exec(text);
  assert.ok(m, 'GameBase.yml 缺少字段「版本」');
  const version = JSON.parse(m[1]);
  assert.ok(
    version >= 1,
    `【版本】= ${version}，低于引擎最小可用值 1——loadData 的 r.version && ` +
      '短路会把所有存档拒掉（saveN.sav 版本过低（0）！）',
  );
});

// —— 引擎级（驱动 app.asar 的真代码）——

const repo_tables = load_repo_variable_tables();

/** 装载库内常规批全部预设（引擎 yml 路径 + 入库变量表） */
function load_batch_presets(extended_tables = EXTENDED_TABLES) {
  const loader = create_chara_loader({ extended_tables });
  attach_variable_tables(loader, repo_tables);
  for (const id of BATCH_IDS) {
    loader.load_rows(
      engine.parse_data_file(read_yml(`Chara${id}.yml`), 'yml', 'chara'),
    );
  }
  return loader;
}

/**
 * 装载库内全部角色文件（含 0/17/35 这些不在常规批里的）。
 * 带 EX 素质预设的八个角色都在其中，逐键对照要用真实预设而不是替身。
 */
function load_all_chara_presets(extended_tables = EXTENDED_TABLES) {
  const loader = create_chara_loader({ extended_tables });
  attach_variable_tables(loader, repo_tables);
  for (const file of fs.readdirSync(YML_DIR)) {
    if (!/^Chara.*\.yml$/i.test(file)) {
      continue;
    }
    loader.load_rows(engine.parse_data_file(read_yml(file), 'yml', 'chara'));
  }
  assert.deepEqual(loader.errors, [], '角色文件必须零装载错误');
  return loader;
}

engine_test(
  '消费验证：addCharacter 加入后预设值确实可读（base/maxbase/talent/abl/mark/callname）',
  () => {
    const loader = load_batch_presets();
    const adder = create_add_character(loader.static_data, {
      extended_tables: EXTENDED_TABLES,
    });

    // Chara1 战士：基礎 0/1 = 2400/1000，素質 200/240 两列行（缺省 1）
    assert.equal(adder.add(1), true);
    assert.deepEqual(adder.data.base[1], {
      0: 2400,
      1: 1000,
      2: 0,
      3: 0,
      4: 0,
      10: 0,
    });
    assert.deepEqual(adder.data.maxbase[1][0], 2400);
    assert.equal(adder.data.talent[1][200], 1);
    assert.equal(adder.data.talent[1][240], 1);
    assert.equal(adder.data.talent[1][0], 0, '未预设的素质初始化为 0');
    assert.equal(adder.data.callname[1][-1], '战士');

    // Chara18 精锐部队：无素質段——talent 桶照建、全 0（形状差异的钉住）
    assert.equal(adder.add(18), true);
    assert.equal(adder.data.talent[18][0], 0);
    assert.equal(adder.data.base[18][0], 9000);

    // Chara31 琼：ABL 21 = 3（Abl.yml 有 21 号名条目，initCharaTable 建槽）
    assert.equal(adder.add(31), true);
    assert.equal(adder.data.abl[31][21], 3, 'ABL 21（琼的预设）');

    // Chara34 葵希罗：MARK 1/3 = 3 落（Mark.yml 有名条目）
    assert.equal(adder.add(34), true);
    assert.equal(adder.data.mark[34][1], 3, 'MARK 1（葵希罗的预设）');
    assert.equal(adder.data.mark[34][3], 3, 'MARK 3（葵希罗的预设）');

    // 全批 27 个都能加进去（预设在场即加入成功，引擎语义）
    for (const id of BATCH_IDS) {
      const probe = create_add_character(loader.static_data, {
        extended_tables: EXTENDED_TABLES,
      });
      assert.equal(
        probe.add(id),
        true,
        `角色 ${id} 经 addCharacter 加入失败（预设装载有问题）`,
      );
    }
  },
);

engine_test(
  '消费验证（#814）：cflag/cstr 预设随 addCharacter 落 data，相性预设仍不搬',
  () => {
    const loader = load_batch_presets();
    const adder = create_add_character(loader.static_data, {
      extended_tables: EXTENDED_TABLES,
    });

    // #814 起 CFlag.yml / CStr.yml 登记了角色预设在用的下标，initCharaTable
    // 按名字表建槽抄预设：战士（1）的 フラグ,1,1 与嘉德（33）的 CSTR,60,本宫
    // 都真正落库
    assert.equal(adder.add(1), true);
    assert.equal(adder.data.cflag[1][1], 1, 'フラグ,1,1 预设落库');
    assert.equal(adder.data.cflag[1][9], 0, '没预设的登记下标落 0');
    assert.equal(adder.add(33), true);
    assert.equal(adder.data.cstr[33][60], '本宫', 'CSTR,60,本宫 预设落库');

    // MARK:4 自 #814 起也走预设通道（Mark.yml 登记了 4 号）：Chara34 的
    // MARK,4,3 随 addCharacter 落 data，加点上不再补写
    assert.equal(adder.add(34), true);
    assert.equal(adder.data.mark[34][4], 3);
    assert.equal(loader.static_data.chara[34].mark[4], 3, '装载层预设仍在');

    // 相性预设：Chara24 的 相性,17,150 落静态 relationship 表
    // （"24|17"），引擎 addCharacter 不把它搬进 data.relation——
    // relation:24:17 读出 undefined（旧引擎的 ADDCHARA 会拷，ere 不会）。
    // 等相性子系统实现时在加入点搬运，本工单钉住现状。
    assert.equal(adder.add(24), true);
    assert.deepEqual(adder.data.relation[24], {});
    assert.equal(loader.static_data.relationship.relation['24|17'], 150);
  },
);

engine_test(
  'ex_talent：登记后 addCharacter 按登记集建槽，加入后的终值与手工赋值时代逐键相同',
  () => {
    const loader = load_batch_presets();
    const adder = create_add_character(loader.static_data, {
      extended_tables: EXTENDED_TABLES,
    });
    assert.equal(adder.add(31), true);
    // #21 已知缺口的修复证明：表落库前这句写入静默丢弃（chara-ex.js 头注），
    // 落库后 data.ex_talent[31]（琼）按登记集建槽，琼自己的预设落 1、其余 0
    assert.deepEqual(
      Object.entries(adder.data.ex_talent[31])
        .filter(([, value]) => value !== 0)
        .map(([id, value]) => [Number(id), value]),
      [[101, 1]],
      'addCharacter 按登记集建槽，只有角色预设那一格非零',
    );
    assert.equal(
      engine.set_var.call(
        {
          data: adder.data,
          staticData: loader.static_data,
          fieldNames: repo_tables.field_names,
          global: {},
          extendedTables: EXTENDED_TABLES,
          era: { error: () => {} },
        },
        'ex_talent:31:101',
        1,
      ),
      1,
    );
    assert.equal(adder.data.ex_talent[31][101], 1);

    // —— 逐键对照（#834）：角色加入后的 EX 素质与「chara-ex.js 手工赋值」
    // 时代相同。
    //
    // 两遍跑的是同一份角色预设：旧路径是 OLD_JOIN_WRITES 逐行写下的值（本工单
    // 删掉的那段代码），新路径交给引擎的 addCharacter 套 yml/Chara*.yml 的
    // ex_talent 段。终值 JSON 逐键 diff——旧路径写过的每个键必须同值；新路径
    // 多出来的键只能是被登记、但没有预设的 0（所有消费者都是真值判断，0 与
    // undefined 同结论，get_ex_kojo_num 扫 101..800 的写法也在内）。
    {
      const all = load_all_chara_presets();
      const engine_adder = create_add_character(all.static_data, {
        extended_tables: EXTENDED_TABLES,
      });
      const declared = Object.values(all.static_data[TABLE_NAME])
        .map(Number)
        .sort((a, b) => a - b);
      assert.deepEqual(declared, EX_TALENT_IDS, '登记集必须是那 17 个序号');

      // 去掉「值为 0 的登记空槽」后的视图，就是旧路径的 JSON
      const nonzero = (bucket) =>
        Object.fromEntries(
          Object.entries(bucket).filter(([, value]) => value !== 0),
        );

      for (const cid of EX_TALENT_PRESET_IDS) {
        assert.equal(engine_adder.add(cid), true, `角色 ${cid} 必须能加入`);
        const after = engine_adder.data.ex_talent[cid];
        assert.deepEqual(
          nonzero(after),
          OLD_JOIN_WRITES[cid],
          `角色 ${cid} 的 EX 素质终值必须与手工赋值时代逐键相同`,
        );
        assert.deepEqual(
          Object.keys(after)
            .map(Number)
            .sort((a, b) => a - b),
          declared,
          `角色 ${cid} 的键集合必须是登记集（空槽以 0 存在）`,
        );
      }

      // 反向：不在八个之列的角色一个非零 EX 素质都没有（预设没有蔓延）
      for (const cid of Object.keys(all.static_data.chara)) {
        if (EX_TALENT_PRESET_IDS.includes(Number(cid))) {
          continue;
        }
        assert.equal(
          engine_adder.add(Number(cid)),
          true,
          `角色 ${cid} 必须能加入`,
        );
        assert.deepEqual(
          nonzero(engine_adder.data.ex_talent[cid]),
          {},
          `角色 ${cid} 不该有 EX 素质`,
        );
      }
    }
  },
);

// —— 已有值不被读档覆盖（??=）：见下面「存档往返」用例 ——

engine_test(
  'ex_talent 未登记的反面：引擎按一维自动生效，桶不建、写入静默 undefined',
  () => {
    const loader = load_batch_presets({});
    const adder = create_add_character(loader.static_data, {});
    assert.equal(adder.add(31), true);
    assert.equal(
      adder.data.ex_talent,
      undefined,
      '未登记时 addCharacter 不建 ex_talent 桶（一维表没有角色桶）',
    );
    assert.equal(
      engine.set_var.call(
        {
          data: adder.data,
          staticData: loader.static_data,
          fieldNames: repo_tables.field_names,
          global: {},
          extendedTables: {},
          era: { error: () => {} },
        },
        'ex_talent:31:101',
        1,
      ),
      undefined,
      '顶层桶缺位 → setVar 三段分支静默返回（#21 时代的原状）',
    );
  },
);

engine_test(
  '存档往返：真 EraApi 实例（临时目录、真文件）——加入 → 写 ex_talent → 存 → 清 data → 读 → 取回',
  async () => {
    const loader = load_all_chara_presets();
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ere-extalent-'));
    try {
      const fake_era = {
        path: tmp,
        config: { system: { saveCompressedData: false } },
        global: { saves: {} },
        staticData: {
          ...loader.static_data,
          gamebase: {
            version: 1,
            gameCode: 931060,
            allowVersion: 1,
            defaultChara: 0,
          },
          chara: {
            0: { id: '0', name: '你', callname: '你' },
            ...loader.static_data.chara,
          },
        },
        data: {},
        fieldNames: repo_tables.field_names,
        extendedTables: EXTENDED_TABLES,
        connect: () => {},
        error: () => {},
        log: () => {},
      };
      const api = new engine.era_api(fake_era);

      // 新游戏路径：resetData 建 data + fillData 建扩展表顶层桶，并自动
      // 加入 defaultChara 0（角色 0 的 per-chara 桶随之按预设建槽）；
      // addCharacter(31) 再建 31 的桶（引擎真方法，不是镜像）
      api.resetData();
      assert.deepEqual(
        Object.entries(fake_era.data.ex_talent[0])
          .filter(([, value]) => value !== 0)
          .map(([id, value]) => [Number(id), value]),
        [[200, 1]],
        'fillData 建顶层桶，resetData 自动加入的角色 0 已按预设建槽',
      );
      assert.equal(api.addCharacter(31), true);
      assert.deepEqual(api.get('base:31:0'), 1800, '预设值经引擎寻址可读');

      // 玩家侧的写入（灵魂错位等级）：与预设无关的值同样要能往返
      assert.equal(api.set('ex_talent:31:0', 2), 2);
      // 玩家把琼的本人标记清零：读档补齐用的是 `桶[序号] ?? 预设`，
      // 这个 0 必须原样留着，不能被角色预设复活（#834 的存档兼容判据）
      assert.equal(api.set('ex_talent:31:101', 0), 0);
      assert.equal(api.addCharacter(35), true);

      assert.equal(await api.saveData(1, 'EX_TALENT 往返'), true);
      const save_path = path.join(tmp, 'sav', 'save1.sav');
      const saved = JSON.parse(fs.readFileSync(save_path, 'utf8'));
      assert.deepEqual(
        Object.entries(saved.ex_talent[31])
          .filter(([, value]) => value !== 0)
          .map(([id, value]) => [Number(id), value])
          .sort(),
        [[0, 2]],
        '存档载荷里必须有扩展角色表，且带着玩家写值',
      );
      // 旧档形状：把两格删掉，等价于「0.1.0 时代从没写过这个槽」
      delete saved.ex_talent[31][102];
      delete saved.ex_talent[35][104];
      fs.writeFileSync(save_path, JSON.stringify(saved));

      fake_era.data = {};
      assert.equal(await api.loadData(1), true);
      assert.equal(api.get('ex_talent:31:0'), 2, '玩家写值随存档往返');
      assert.equal(api.get('ex_talent:35:104'), 1, '缺的槽按角色预设补 1');
      assert.equal(api.get('ex_talent:31:102'), 0, '没有预设的登记序号补 0');
      assert.equal(
        api.get('ex_talent:31:101'),
        0,
        '玩家清零的标记不被预设复活（??= 不覆盖已有值）',
      );
      assert.equal(api.get('base:31:0'), 1800, '预设随存档往返不丢');
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  },
);

engine_test(
  '版本闸门（#138 追加）：引擎真 loadData 拒 version 0 的档、放行当前版本与已发布的 0.1.0',
  async () => {
    // #135 的 0.0.0 轴在实机上撞出的阻断性缺陷：loadData 的闸门是
    // `if (r.version && !(r.version < allowVersion))`——truthy 判空，0 直接
    // 落 error 分支，任何存档读不回。对照组 loadGlobal 用 undefined 判空
    // （0 能过），两处写法不一致是这个坑一直没被发现的原因。本用例驱动
    // 引擎自己的 loadData（不是我们的镜像）：喂 version 0 的载荷确认被拒，
    // 再喂按当前 GameBase 版本盖戳的载荷确认通过——若有人把【版本】改回
    // 0，盖出的档同样被拒，本用例当场红。
    const text = read_yml('GameBase.yml');
    const field = (name) =>
      JSON.parse(new RegExp(`^"${name}": (.+)$`, 'm').exec(text)[1]);
    const version = field('版本');
    const allow_version = field('最低支持版本');
    const game_code = field('游戏标识');

    const loader = load_batch_presets();
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ere-vergate-'));
    const errors = [];
    try {
      const fake_era = {
        path: tmp,
        config: { system: { saveCompressedData: false } },
        global: { saves: {} },
        staticData: {
          ...loader.static_data,
          gamebase: {
            version,
            gameCode: game_code,
            allowVersion: allow_version,
            defaultChara: 0,
          },
          chara: {
            0: { id: '0', name: '你', callname: '你' },
            ...loader.static_data.chara,
          },
        },
        data: {},
        fieldNames: repo_tables.field_names,
        extendedTables: EXTENDED_TABLES,
        connect: () => {},
        error: (...args) => errors.push(args.join(' ')),
        log: () => {},
      };
      const api = new engine.era_api(fake_era);

      // 建档：saveData 给载荷盖 gamebase 的 version 与 code（app.asar 实测）
      api.resetData();
      assert.equal(await api.saveData(1, '版本闸门'), true);
      const save_path = path.join(tmp, 'sav', 'save1.sav');
      const payload = JSON.parse(fs.readFileSync(save_path, 'utf8'));
      assert.equal(payload.version, version, '载荷必须盖着 GameBase 的版本');

      // 喂 version 0（等价 #135 时代 0.0.0 轴存出的档）：拒收
      fs.writeFileSync(save_path, JSON.stringify({ ...payload, version: 0 }));
      fake_era.data = {};
      errors.length = 0;
      assert.equal(
        await api.loadData(1),
        false,
        'version 0 必须被拒——r.version falsy 短路在 allowVersion 比较之前',
      );
      assert.match(
        errors.join('\n'),
        /版本过低（0）/,
        '引擎的报错文案是闸门行为的直接证据',
      );

      // 喂当前版本：通过（payload 原样还原）
      fs.writeFileSync(save_path, JSON.stringify(payload));
      fake_era.data = {};
      errors.length = 0;
      assert.equal(
        await api.loadData(1),
        true,
        `version ${version}（当前 GameBase）的档必须能读回`,
      );
      assert.deepEqual(errors, []);

      // 喂 0.1.0 盖戳的档：0.1.0 已对外发布，玩家存档必须能读回
      fs.writeFileSync(
        save_path,
        JSON.stringify({ ...payload, version: OLDEST_RELEASED_VERSION }),
      );
      fake_era.data = {};
      errors.length = 0;
      assert.equal(
        await api.loadData(1),
        true,
        '0.1.0（1000）盖戳的玩家存档必须能被引擎读回',
      );
      assert.deepEqual(errors, []);
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  },
);

engine_test(
  '旧档缺 ex_talent 桶：fillData 为已加入角色重建桶，写入生效（引擎 4.8.3 起）',
  () => {
    const loader = load_batch_presets();
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ere-extalent-quirk-'));
    try {
      const fake_era = {
        path: tmp,
        config: { system: { saveCompressedData: false } },
        global: { saves: {} },
        staticData: {
          ...loader.static_data,
          gamebase: {
            version: 1,
            gameCode: 931060,
            allowVersion: 1,
            defaultChara: 0,
          },
          chara: {
            0: { id: '0', name: '你', callname: '你' },
            ...loader.static_data.chara,
          },
        },
        data: {},
        fieldNames: {},
        extendedTables: EXTENDED_TABLES,
        connect: () => {},
        error: () => {},
        log: () => {},
      };
      const api = new engine.era_api(fake_era);
      api.resetData();
      api.addCharacter(31);
      const fresh = structuredClone(fake_era.data.ex_talent);

      // 「表晚于存档出现」的旧档形状：角色在、唯独没有扩展表桶
      delete fake_era.data.ex_talent;
      api.fillData();
      // loadData 读档后调用 fillData：它为每个已加入角色重建桶，缺的键按
      // 角色预设补、没有预设补 0，结果与 addCharacter 新建的一致。4.8.0 的
      // 重建条件写成 e[1] === tableType.chara（e 是表名字符串，恒假），桶不
      // 重建、写入静默丢弃，4.8.3 修复
      assert.deepEqual(fake_era.data.ex_talent, fresh);
      assert.equal(api.set('ex_talent:31:101', 1), 1);
      assert.equal(api.get('ex_talent:31:101'), 1);
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  },
);

// —— 已有值不被读档覆盖：见上面「存档往返」与「逐键对照」两处的 ??= 断言 ——

// —— yml 形状：登记的 17 条带中文键 + 英文 snake_case 的 name + type（#820）——

/**
 * 解析一张 yml 名字表里的「键 / id / name / type」四元组。
 * @param {string} file yml 文件名
 * @returns {Array<{ key: string, id: number, name?: string, type?: string }>}
 */
function parse_entries(file) {
  const entries = [];
  for (const match of read_yml(file).matchAll(
    /^"([^"]+)":\r?\n((?: {2}.+\r?\n)+)/gm,
  )) {
    const entry = { key: match[1] };
    for (const line of match[2].split(/\r?\n/)) {
      const field = /^ {2}(id|name|type): (.+)$/.exec(line);
      if (!field) {
        continue;
      }
      entry[field[1]] =
        field[1] === 'id' ? Number(field[2]) : field[2].replace(/"/g, '');
    }
    entries.push(entry);
  }
  return entries;
}

test('Ex_Talent.yml 的 17 条带中文键 + 英文 snake_case 的 name + number 类型（#834）', () => {
  const entries = parse_entries('Ex_Talent.yml');
  assert.deepEqual(
    entries.map((entry) => entry.id).sort((a, b) => a - b),
    EX_TALENT_IDS,
    '登记集必须是全库实际用到的 17 个序号',
  );
  for (const entry of entries) {
    assert.match(
      entry.name ?? '',
      /^[a-z][a-z0-9_]*$/,
      `ex_talent:${entry.id}「${entry.key}」的 name 必须是英文 snake_case，实为 ${entry.name}`,
    );
    assert.equal(entry.type, 'number', `ex_talent:${entry.id} 的 type`);
  }
  const names = entries.map((entry) => entry.name);
  assert.equal(new Set(names).size, names.length, 'name 不得重复');
});

// —— 角色预设侧：八个角色文件的 ex_talent 段逐项固定（无引擎也跑）——
//
// 引擎级用例证明「套用后的终值」与手工赋值时代相同（上面那条逐键对照），
// 这一条证明「预设本身」也对得上：两处各守一段，预设写错时不至于要先有引擎
// 才能发现。

/**
 * 读一张角色文件的 ex_talent 段（`"ex_talent":` 下缩进一层的数字键）。
 * @param {string} file yml 文件名
 * @returns {Object<number, number>}
 */
function ex_talent_preset(file) {
  const block = /^"ex_talent":\r?\n((?: {2}.*\r?\n)*)/m.exec(read_yml(file));
  const preset = {};
  if (block === null) {
    return preset;
  }
  for (const line of block[1].split(/\r?\n/)) {
    const field = /^ {2}"(\d+)": (\d+)$/.exec(line);
    if (field !== null) {
      preset[Number(field[1])] = Number(field[2]);
    }
  }
  return preset;
}

test('八个角色文件的 ex_talent 预设与手工赋值时代逐项相同（#834）', () => {
  for (const cid of EX_TALENT_PRESET_IDS) {
    assert.deepEqual(
      ex_talent_preset(`Chara${cid}.yml`),
      OLD_JOIN_WRITES[cid],
      `Chara${cid}.yml 的 ex_talent 预设必须与 chara-ex.js 原注册实现写的槽一致`,
    );
  }
  // 其余角色文件不带 ex_talent 段：预设不该蔓延到没有专属标记的角色
  for (const file of fs.readdirSync(YML_DIR)) {
    if (!/^Chara.*\.yml$/i.test(file)) {
      continue;
    }
    const cid = Number(/^Chara(\d+)\.yml$/i.exec(file)?.[1]);
    if (EX_TALENT_PRESET_IDS.includes(cid)) {
      continue;
    }
    assert.deepEqual(
      ex_talent_preset(file),
      {},
      `${file} 不该带 ex_talent 预设`,
    );
  }
});
