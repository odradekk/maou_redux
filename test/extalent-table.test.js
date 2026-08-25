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
 *     永不建、写入静默丢弃——正是本票要修的 #21 已知缺口）。
 *   - 版本轴（无引擎也跑）：#138 破坏性改动两条命中（ADR-0006 判定表：
 *     extendedCharaTables 加表 + 角色预设内容变更），0.0.0 → 0.0.1。
 *   - 常规批逐字段：库内产物经引擎 yml 路径装载与源 CSV 路径逐字段一致、
 *     零告警零丢弃（test/chara-yml.test.js 的做法推广到库内文件——那边的
 *     45 文件全量比对用的是转换器现产物，不经库内文件）。
 *   - 消费验证：base/talent/abl/mark 预设落 data 可读；#118 定夺的边界
 *     （cflag/cstr 预设不随 addCharacter 落 data）如实钉住，另有两处同族
 *     缺口（Chara34 的 MARK:4、Chara24 的相性预设，见各用例注释）。
 *   - ex_talent：登记后 addCharacter 建桶、chara-ex.js 同款写入被引擎
 *     接受；未登记的反面；存档往返；#13 死分支（fillData 不重建
 *     per-chara 桶）在新表上的同证。
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
const { read_text } = require('../tools/csv-to-yml');
// T20 归一（#60）：源 CSV 文本过同一张表再装载，比对语义是「产物 = 归一(源)」
const { to_simplified_yaml } = require('../tools/lang-normalize');

const engine = load_engine_bundle();
const engine_test = engine ? test : test.skip;

const REPO_ROOT = path.resolve(__dirname, '..');
const YML_DIR = path.join(REPO_ROOT, 'yml');
const CHARA_DIR = path.join(REPO_ROOT, 'target', 'CSV', 'Chara');
const TABLE_NAME = 'ex_talent';

// 常规批（#105 决议二的第一批）：0/17/35 已随前票入库，不重做
const BATCH_IDS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22, 23,
  24, 31, 32, 33, 34,
];

// 本票登记的两张二维扩展表（_fixed.json 的登记集）
const EXTENDED_TABLES = { portcflag: 2, ex_talent: 2 };

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

test('常规批产物在场：27 张 Chara*.yml（1–24 除 0/17、31–34）与源文件同名同号', () => {
  for (const id of BATCH_IDS) {
    assert.ok(
      fs.existsSync(path.join(YML_DIR, `Chara${id}.yml`)),
      `yml/Chara${id}.yml 缺失（源 ${CHARA_DIR}/Chara${id}.csv 在场）`,
    );
  }
  // 头两行是转换器的固定头注：来源行必须指到真实源文件
  const head = read_yml('Chara31.yml').split('\n').slice(0, 2).join('\n');
  assert.match(head, /转换自 target\/CSV\/Chara\/Chara31\.csv/);
});

test('版本轴：0.0.1——【版本】=【最低支持版本】= 版本代号的编码（#138 破坏性改动抬版本）', () => {
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
  // 【最低支持版本】恒等于【版本】；【游戏标识】冻结 931060（另断言防误动）
  const [major, minor, patch] = version_name.split('.').map(Number);
  assert.equal(
    version,
    major * 1000000 + minor * 1000 + patch,
    `【版本】${version} 与【版本代号】"${version_name}" 的编码不一致`,
  );
  assert.equal(allow, version, '【最低支持版本】必须恒等于【版本】');
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

engine_test(
  '常规批 27 张：库内产物经引擎装载与源 CSV 逐字段一致、零告警零丢弃',
  () => {
    for (const id of BATCH_IDS) {
      const source = read_text(path.join(CHARA_DIR, `Chara${id}.csv`));
      const from_yml = create_chara_loader();
      attach_variable_tables(from_yml, repo_tables);
      from_yml.load_rows(
        engine.parse_data_file(read_yml(`Chara${id}.yml`), 'yml', 'chara'),
      );
      const from_csv = create_chara_loader();
      attach_variable_tables(from_csv, repo_tables);
      from_csv.load_rows(
        engine.parse_data_file(to_simplified_yaml(source.text), 'csv', 'chara'),
      );

      assert.deepEqual(from_yml.errors, [], `Chara${id} 装载不应有缺表错误`);
      assert.deepEqual(
        from_yml.static_data.chara[id],
        from_csv.static_data.chara[id],
        `Chara${id}：引擎读库内产物的预设与读源 CSV 不一致`,
      );
      assert.deepEqual(
        from_yml.static_data.relationship,
        from_csv.static_data.relationship,
        `Chara${id}：称呼/相性（relationship）不一致`,
      );
    }
  },
);

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
    assert.equal(adder.data.abl[31][21], 3);

    // Chara34 葵希罗：MARK 1/3 = 3 落（Mark.yml 有名条目）
    assert.equal(adder.add(34), true);
    assert.equal(adder.data.mark[34][1], 3);
    assert.equal(adder.data.mark[34][3], 3);

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
  '消费验证的边界（#118 定夺同族）：cflag/cstr 预设与两处名字表缺口不随 addCharacter 落 data',
  () => {
    const loader = load_batch_presets();
    const adder = create_add_character(loader.static_data, {
      extended_tables: EXTENDED_TABLES,
    });

    // #118 定夺：引擎 initCharaTable 只对名字表内登记的下标建槽抄预设，
    // CFlag/CStr 名字表为空表 → 预设整组不落 data。装载层预设仍在
    // （static_data.chara[id].cflag），子系统落地需要时按 CFlag.yml 头注
    // 指路补名条目。
    assert.equal(adder.add(1), true);
    assert.deepEqual(
      adder.data.cflag[1],
      {},
      'フラグ,1,1 预设不应落 data（#118：cflag 名字表空）',
    );
    assert.equal(adder.add(33), true);
    assert.deepEqual(
      adder.data.cstr[33],
      {},
      'CSTR,60,本宫 预设不应落 data（#118：cstr 名字表空）',
    );

    // 缺口一（MARK:4）：Mark.yml 无 4 号名条目 → initCharaTable 不建 4 槽，
    // Chara34 的 MARK,4,3 预设丢弃（装载层在 static_data.chara[34].mark）。
    // 修复＝扩 Mark.yml 名条目，会改变所有角色的预置，按 #118 的定夺留给
    // 刻印消费者落地时处理。
    assert.equal(adder.add(34), true);
    assert.equal(adder.data.mark[34][4], undefined);
    assert.equal(loader.static_data.chara[34].mark[4], 3, '装载层预设仍在');

    // 缺口二（相性预设）：Chara24 的 相性,17,150 落静态 relationship 表
    // （"24|17"），引擎 addCharacter 不把它搬进 data.relation——
    // relation:24:17 读出 undefined（Emuera 的 ADDCHARA 会拷，ere 不会）。
    // 等相性子系统落地时在加入点搬运，本票钉住现状。
    assert.equal(adder.add(24), true);
    assert.deepEqual(adder.data.relation[24], {});
    assert.equal(loader.static_data.relationship.relation['24|17'], 150);
  },
);

engine_test(
  'ex_talent：登记后 addCharacter 为每个角色建桶，chara-ex 同款写入被引擎接受',
  () => {
    const loader = load_batch_presets();
    const adder = create_add_character(loader.static_data, {
      extended_tables: EXTENDED_TABLES,
    });
    assert.equal(adder.add(31), true);
    // #21 已知缺口的修复证明：表落地前这句写入静默丢弃（chara-ex.js 头注），
    // 落地后 data.ex_talent[31] 在、写入落值
    assert.deepEqual(adder.data.ex_talent[31], {}, 'addCharacter 必须建桶');
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
  },
);

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
    const loader = load_batch_presets();
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
      // 加入 defaultChara 0（角色 0 的 per-chara 桶随之建立）；
      // addCharacter(31) 再建 31 的桶（引擎真方法，不是镜像）
      api.resetData();
      assert.deepEqual(
        fake_era.data.ex_talent,
        { 0: {} },
        'fillData 建顶层桶，resetData 自动加入的角色 0 已带桶',
      );
      assert.equal(api.addCharacter(31), true);
      assert.deepEqual(api.get('base:31:0'), 1800, '预设值经引擎寻址可读');

      // chara-ex 同款写入（@CHARA_EX_31：EX_TALENT:101 = 琼）
      assert.equal(api.set('ex_talent:31:101', 1), 1);

      assert.equal(await api.saveData(1, 'EX_TALENT 往返'), true);
      const saved = JSON.parse(
        fs.readFileSync(path.join(tmp, 'sav', 'save1.sav'), 'utf8'),
      );
      assert.deepEqual(
        saved.ex_talent[31],
        { 101: 1 },
        '存档载荷里必须有扩展角色表',
      );

      fake_era.data = {};
      assert.equal(await api.loadData(1), true);
      assert.equal(api.get('ex_talent:31:101'), 1);
      assert.equal(api.get('base:31:0'), 1800, '预设随存档往返不丢');
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  },
);

engine_test(
  '版本闸门（#138 追加）：引擎真 loadData 拒 version 0 的档、放行当前 GameBase 版本',
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
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  },
);

engine_test(
  '引擎怪癖钉住（#13 死分支）：fillData 不为 ex_talent 重建 per-chara 桶',
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

      // 「表晚于存档出现」的旧档形状：角色在、唯独没有扩展表桶
      delete fake_era.data.ex_talent;
      api.fillData();
      // 顶层桶重建（fillData 的 data[表] ||= {}），per-chara 桶不重建：
      // 引擎的重建条件 e[1] === tableType.chara 里 e 是表名字符串（恒假）
      assert.deepEqual(fake_era.data.ex_talent, {});
      // 后果如实钉住：三段寻址静默丢弃。该场景在本版本轴内已被 ADR-0006
      // 的抬版本废档策略消灭（0.0.0 档被【最低支持版本】= 1 拒收），
      // 此用例钉的是引擎行为本身，供未来重新评估时对照
      assert.equal(api.set('ex_talent:31:101', 1), undefined);
      assert.equal(api.get('ex_talent:31:101'), undefined);
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  },
);
