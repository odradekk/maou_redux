/**
 * @file 编号外角色批入库的验证（issue #139，决议 #105 决议二第二批）。
 *
 * 完成判定沿用 #138 的「产物 + 可消费」：15 张 Chara*.yml（100 / 150 /
 * 201–211 / 223 / 777）进库，且经引擎真 addCharacter 加入后预设值确实
 * 可读。全部驱动引擎自己的代码（test/helpers/engine-bundle.js），不经
 * 夹具、不用自写镜像——列形状与常规批一致已由 #139 评论的 45 张全量
 * 实测先行验证，本文件把该结论钉在库内产物上。
 *
 * 用途查明（编号含义，实据见 #139 票上的调查评论）：
 *   - 100 怪物的女儿：无专属加入点（ADDCHARA 100 全库零命中）、无初始化
 *     分支（CHAR_APPEND 的 SELECTCASE 无 100）。理论入口仅实验室生命摇篮
 *     CHAR_CREATE 的 CASEELSE 透传（菜单不显示，键入 [100] 经 EXISTCSV
 *     校验加入）与苏生 RESULECTION 的编号上界（输入 199 → ADDCHARA 100，
 *     但其前置 FLAG:1099 死亡登记的写点全库为零，实际不可达）——原作
 *     的半成品预设。
 *   - 150 柯迪莉亚：实验室 [56] SUMMON_SLAVE「读取CSV来生成奴隶」的预置
 *     收录角色——收录编号输入窗 150–199，唯一有 CSV 的是 150（其余
 *     EXISTCSV 拒绝「所选奴隶并不存在」）。
 *   - 201–210 精英魔物从者（精英部下）：奴隶商店 SELECT_CHARA 的召唤池
 *     （FOR LCOUNT,201,280 + ITEMPRICE/CSVTALENT(,319,) 过滤，BUY_MONSTER
 *     加入）；生子线 GB_ADD_GUARD 的「良犬/怪物」档（RAND:11+200）。
 *     Item.csv 的 201+ 段与角色表共用编号（同名商品行，价格为最低等级）。
 *   - 211 异界勇者：奴隶商店自制角色模板（选性别后固定 CHARA = 211）；
 *     初始化走 CHAR_IKAI_APPEND 的异界人 CHAR_INIT，不在 201–210 段。
 *   - 223 丽塔 / 777 卡拉：开局设置开关（丽塔启动！/卡拉启动！）控制的
 *     隐藏入队角色（SYSTEM.ERB 丽塔块两处 ADDCHARA 223、SHOP.ERB 召唤
 *     事件 ADDCHARA 777）；两表互指相性 1000（"223|777"/"777|223"）。
 *
 * 引擎不在场（无 app.asar）时引擎级用例 skip 并留警告；文件级用例始终跑。
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
const { read_text } = require('../tools/csv-to-yml');
// T20 归一（#60）：源 CSV 文本过同一张表再装载，比对语义是「产物 = 归一(源)」
const { to_simplified_yaml } = require('../tools/lang-normalize');

const engine = load_engine_bundle();
const engine_test = engine ? test : test.skip;

const REPO_ROOT = path.resolve(__dirname, '..');
const YML_DIR = path.join(REPO_ROOT, 'yml');
const CHARA_DIR = path.join(REPO_ROOT, 'target', 'CSV', 'Chara');

// 编号外批（#105 决议二的第二批）：0/17/35 与常规批 27 张已随前票入库
const OUTER_IDS = [
  100, 150, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 223, 777,
];

// 与 #138 相同的扩展表登记集（装载时建 ex_talent 桶）
const EXTENDED_TABLES = { portcflag: 2, ex_talent: 2 };

function read_yml(name) {
  return fs.readFileSync(path.join(YML_DIR, name), 'utf8');
}

// —— 文件级（仓库文件层，无引擎也跑）——

test('角色数据全量在库：yml/Chara*.yml 与 target/CSV/Chara/ 的编号集一致（45 张收口）', () => {
  const source_ids = fs
    .readdirSync(CHARA_DIR)
    .filter((name) => /^Chara\d+\.csv$/i.test(name))
    .map((name) => /^Chara(\d+)\.csv$/i.exec(name)[1])
    .sort((a, b) => Number(a) - Number(b));
  assert.equal(source_ids.length, 45, '源 CSV 应为 45 张（#105 决议二实测）');

  const product_ids = fs
    .readdirSync(YML_DIR)
    .filter((name) => /^Chara\d+\.yml$/i.test(name))
    .map((name) => /^Chara(\d+)\.yml$/i.exec(name)[1])
    .sort((a, b) => Number(a) - Number(b));
  // #134 父票「角色数据全量在库」的收口判定：产物编号集 ⊇ 源编号集
  // （库内允许有源外增补，但源内每张必须有产物）
  for (const id of source_ids) {
    assert.ok(
      product_ids.includes(id),
      `yml/Chara${id}.yml 缺失（源 ${CHARA_DIR}/Chara${id}.csv 在场）`,
    );
  }
});

test('编号外批产物在场：15 张头两行指到真实源文件（产物边界注释）', () => {
  for (const id of OUTER_IDS) {
    const head = read_yml(`Chara${id}.yml`).split('\n').slice(0, 2).join('\n');
    assert.match(
      head,
      new RegExp(`转换自 target/CSV/Chara/Chara${id}\\.csv`),
      `Chara${id}.yml 头注必须指到源文件`,
    );
  }
});

// —— 引擎级（驱动 app.asar 的真代码）——

const repo_tables = load_repo_variable_tables();

/** 装载库内编号外批全部预设（引擎 yml 路径 + 入库变量表） */
function load_outer_presets() {
  const loader = create_chara_loader({ extended_tables: EXTENDED_TABLES });
  attach_variable_tables(loader, repo_tables);
  for (const id of OUTER_IDS) {
    loader.load_rows(
      engine.parse_data_file(read_yml(`Chara${id}.yml`), 'yml', 'chara'),
    );
  }
  return loader;
}

engine_test(
  '编号外批 15 张：库内产物经引擎装载与源 CSV 逐字段一致、零告警零丢弃',
  () => {
    // #113 登记的 cstr 空值行分歧归一（全 45 文件仅 Chara150 的 3/4 两行），
    // 与 test/chara-yml.test.js 的 strip_empty_cstr 同一做法——剥除集若意外
    // 扩大，deepEqual 在其他角色上红
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

    for (const id of OUTER_IDS) {
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
        strip_empty_cstr(from_yml.static_data.chara[id]),
        strip_empty_cstr(from_csv.static_data.chara[id]),
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
  '消费验证：addCharacter 加入 15 张预设后预设值确实可读（base/talent/abl/exp/callname）',
  () => {
    const loader = load_outer_presets();
    const adder = create_add_character(loader.static_data, {
      extended_tables: EXTENDED_TABLES,
    });

    // 全批 15 个都能加进去（预设在场即加入成功，引擎语义）
    for (const id of OUTER_IDS) {
      assert.equal(
        adder.add(id),
        true,
        `角色 ${id} 经 addCharacter 加入失败（预设装载有问题）`,
      );
    }

    // Chara100 怪物的女儿：基礎 0/1 = 2600/1200（base 表全下标初始化，未预设补 0），
    // 素質 0（处女，两列行缺省 1）与 220
    assert.deepEqual(adder.data.base[100], {
      0: 2600,
      1: 1200,
      2: 0,
      3: 0,
      4: 0,
      10: 0,
    });
    assert.equal(adder.data.talent[100][0], 1);
    assert.equal(adder.data.talent[100][220], 1);
    assert.equal(adder.data.callname[100][-1], '怪物的女儿');

    // Chara201 精英史莱姆：素質 319（种族2）= 2——奴隶商店召唤池的商品
    // 过滤键（SELECT_CHARA 读 CSVTALENT(LCOUNT,319,0)），必须落 talent 可读
    assert.equal(
      adder.data.talent[201][319],
      2,
      '素質 319（种族2，奴隶商店召唤池的商品过滤键）必须落 talent 为 2',
    );
    assert.equal(adder.data.talent[201][220], 1);

    // Chara150 柯迪莉亚：素質 320 = 1000000001（大数原样承载，无损）
    assert.equal(
      adder.data.talent[150][320],
      1000000001,
      '素質 320 的大数预设必须原样落 talent（1000000001 无损承载）',
    );

    // Chara223 丽塔：ABL 0/10/31 与 EXP 10 = 2230 落 data——编号外批是
    // 全库唯一带 EXP 段的角色批，「exp 预设按名字表搬运」在此首次验证
    // （Exp.yml 有 10 号名条目「自慰经验」，initCharaTable 建槽抄预设）
    assert.equal(adder.data.abl[223][0], 5);
    assert.equal(adder.data.abl[223][10], 5);
    assert.equal(adder.data.abl[223][31], 4);
    assert.equal(adder.data.exp[223][10], 2230);

    // Chara777 卡拉：素質 318 = 1（相性 223 的镜像段）
    assert.equal(adder.data.talent[777][318], 1);
  },
);

engine_test(
  '消费验证的边界（#118 定夺同族）：CFLAG/CSTR 预设不随 addCharacter 落 data，装载层仍在',
  () => {
    const loader = load_outer_presets();
    const adder = create_add_character(loader.static_data, {
      extended_tables: EXTENDED_TABLES,
    });

    // CFlag/CStr 名字表为空表（CFlag.yml/CStr.yml 头注）→ initCharaTable
    // 不建槽，预设整组不落 data。223/777 的 CFLAG 段（浮点值 1640.0 经
    // getNumber 折叠为 1640 的装载等价已由逐字段比对覆盖）与 223 的
    // CSTR 31（「我」，RANDOM_SELF_CALL 档位 ≥200 的回落读数）都停在这层
    assert.equal(adder.add(223), true);
    assert.deepEqual(
      adder.data.cflag[223],
      {},
      'CFLAG 预设不应落 data（#118：cflag 名字表空）',
    );
    assert.deepEqual(
      adder.data.cstr[223],
      {},
      'CSTR,31,我 预设不应落 data（#118：cstr 名字表空）',
    );
    assert.equal(
      loader.static_data.chara[223].cflag[453],
      1487,
      '装载层预设仍在',
    );
    assert.equal(
      loader.static_data.chara[223].cstr[31],
      '我',
      'CSTR 预设装载层仍在（消费者按 CStr.yml 头注指路补名条目）',
    );
  },
);

engine_test(
  '相性搬运的时机（#138 登记的修正）：另一端角色在场时 addCharacter 才搬进 data.relation',
  () => {
    // #138 在 stub-registry 登记「addCharacter 不搬相性进 data.relation
    //（引擎差异）」。本票实测该结论不完整：引擎 addCharacter(X) 会搬运
    // 静态 relationship 里与 X 相连的条目（X|Y 与 Y|X），**但要求相性
    // 另一端的角色已在场**——#138 的用例只 add(24)（17 未加入），故
    // relation[24] 恒空；两端都加入后双向落值。
    const loader = load_outer_presets();
    const adder = create_add_character(loader.static_data, {
      extended_tables: EXTENDED_TABLES,
    });

    // 223|777 与 777|223 互指 1000（丽塔/卡拉的配对相性，静态表两条都在）
    assert.equal(loader.static_data.relationship.relation['223|777'], 1000);
    assert.equal(
      loader.static_data.relationship.relation['777|223'],
      1000,
      '卡拉对丽塔的配对相性必须落静态表（777|223 = 1000）',
    );

    // 只加 223：另一端 777 不在场 → 不搬（#138 观察到的形态）
    assert.equal(adder.add(223), true);
    assert.deepEqual(
      adder.data.relation[223],
      {},
      '777 未在场时 223|777 不搬（#138 用例的同形态）',
    );

    // 再加 777：两端都在场 → 双向搬运
    assert.equal(adder.add(777), true);
    assert.deepEqual(adder.data.relation[223], { 777: 1000 });
    assert.deepEqual(adder.data.relation[777], { 223: 1000 });
  },
);
