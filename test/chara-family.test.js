/**
 * @file issue #349：家族关系设置。
 *
 * 测试边界 = chara/chara-family 的公开导出。关系矩阵通过公开读写与家族查询
 * 观察；期望值直接来自 RELATION.ERB / RELATION_FAMILY.ERB 的关系码定义。
 */

'use strict';

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
const { create_era_fixture } = require('./helpers/era-fixture');
const {
  attach_variable_tables,
  load_repo_variable_tables,
} = require('./helpers/static-tables');

const engine = load_engine_bundle();
const engine_test = engine ? test : test.skip;
const EXTENDED_TABLES = {
  portcflag: 2,
  ex_talent: 2,
  c_relation: 2,
  c_relation_sub: 2,
};

function add_chara(fixture, cid, name = `角色${cid}`) {
  fixture.seed_chara(cid, { id: cid, name, callname: name });
  fixture.era.addCharacter(cid);
  fixture.store.set(`cflag:${cid}:6`, 1000 + cid); // CFLAG:6 = 名字编号（NID）
}

function seq(values) {
  let index = 0;
  return (upper) => {
    const value = values[index++];
    assert.ok(
      value >= 0 && value < upper,
      `随机值 ${value} 不在 [0, ${upper})`,
    );
    return value;
  };
}

function setup_sibling_search(
  fixture,
  { search_type, source_family, target_family, male = false },
) {
  add_chara(fixture, 1, '检索者');
  add_chara(fixture, 2, '候选者');
  fixture.store.set('cflag:1:605', search_type); // 血缘关系压缩数据个位
  fixture.store.set('cflag:2:605', 1); // 候选者有家族照
  fixture.store.set('cflag:2:604', 1001); // 候选家族照所指名字编号
  fixture.store.set('talent:1:320', source_family); // 检索者家族构成
  fixture.store.set('talent:2:320', target_family); // 候选者家族构成
  fixture.store.set('talent:2:160', 1); // 家族照性格位 0 + 160
  if (male) fixture.store.set('talent:1:122', 1); // 男人
  return fixture.load_module('chara/chara-family');
}

test('关系读写区分登录角色与外部对象，并在读取前修复角色对角标识', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0);
  add_chara(fixture, 17);
  const family = fixture.load_module('chara/chara-family');

  family.relation_set(17, 0, 125);
  assert.equal(fixture.store.get('c_relation:17:17'), 10017);
  family.relation_set(17, -4, 305);

  assert.equal(family.relation_get(17, 0), 125);
  assert.equal(family.relation_get(17, -4), 305);
  assert.equal(fixture.store.get('c_relation:17:17'), 10017);
  fixture.store.set('c_relation:17:17', 0);
  assert.equal(family.relation_get(17, -4), 305);
  assert.equal(
    fixture.store.get('c_relation:17:17'),
    0,
    '外部对象读取不触发矩阵重建',
  );
  assert.equal(family.relation_get(17, 0), 125);
  assert.equal(fixture.store.get('c_relation:17:17'), 10017);
});

test('家族关系只替换个位，并为普通角色写入反向关系', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 1);
  add_chara(fixture, 2);
  const family = fixture.load_module('chara/chara-family');
  family.relation_set(1, 2, 120);
  family.relation_set(2, 1, 340);

  family.family_set_both(1, 2, 5);

  assert.equal(family.relation_get(1, 2), 125);
  assert.equal(family.relation_get(2, 1), 348);
});

test('关系检查、重命名修复与交换接口维护矩阵标识和列数据', () => {
  const fixture = create_era_fixture();
  for (const cid of [1, 2, 3]) add_chara(fixture, cid);
  const family = fixture.load_module('chara/chara-family');
  family.relation_rebuild();
  family.r_set(3, 1, 11);
  family.r_set(3, 2, 22);

  assert.equal(family.r_check(1), 0);
  fixture.store.set('c_relation:1:1', 999);
  assert.equal(family.relation_check_rebuild(1), 1);
  assert.equal(family.relation_check_rebuild(1), 0);
  fixture.store.set('c_relation:2:2', 0);
  assert.equal(family.relation_rename_rebuild(2), 0);
  assert.equal(fixture.store.get('c_relation:2:2'), 1002);

  assert.equal(family.relation_swap_rebuild(-1, 2), -1);
  assert.equal(family.relation_swap_rebuild(1, 2), 0);
  assert.equal(family.r_get(3, 1), 22);
  assert.equal(family.r_get(3, 2), 11);
});

test('关系调试表按五字符列逐行输出、标色，并在打印后等待按键', async () => {
  const fixture = create_era_fixture();
  for (const cid of [1, 2]) add_chara(fixture, cid);
  fixture.set_inputs(0);
  const family = fixture.load_module('chara/chara-family');
  family.r_set(1, 2, 5);

  await family.relation_debugprint();

  const texts = fixture.lines_history
    .filter((entry) => entry.type === 'text')
    .map((entry) => entry.text);
  assert.match(texts[0], /^1>[ ]{3}0[ ]{4}5[ ]{4}$/);
  const first = fixture.lines_history.find((entry) => entry.type === 'text');
  assert.equal(first.content[0].color, 'rgb(100, 255, 255)');
  assert.equal(first.content[1].color, 'gray');
  assert.equal(
    fixture.lines_history.filter((entry) => entry.type === 'br').length,
    2,
    '原作 PRINTL：每个角色一行',
  );
  assert.equal(fixture.waits.at(-1).waited, true);
});

test('家族查询可分别忽略性别与兄弟姐妹长幼，并包含外部对象', () => {
  const fixture = create_era_fixture();
  for (const cid of [1, 2, 3, 4]) add_chara(fixture, cid);
  const family = fixture.load_module('chara/chara-family');
  family.rf_set_both(1, 2, 1); // 哥哥
  family.rf_set_both(1, 3, 4); // 妹妹
  family.r_set(1, -4, 205); // 狂王，父亲

  assert.equal(family.rf_count(1, 2), 1, '默认忽略性别：兄/姐同组');
  assert.deepEqual(family.rf_all(1, 2), [2]);
  assert.deepEqual(family.rf_all(1, 2, false, 1, 1), [2, 3]);
  assert.equal(
    family.rf_first(1, 5),
    4,
    '保留原作外部对象返回正循环下标的行为',
  );
  assert.equal(family.rf_first(4), -99);
});

test('手足匹配：姐姐数量取十万位，不能误读一万位', () => {
  const fixture = create_era_fixture();
  const family = setup_sibling_search(fixture, {
    search_type: 2,
    source_family: 100_001,
    target_family: 10_000_001,
  });

  assert.equal(family.search_family(1), 2);
});

test('手足匹配：检索哥哥时只扣源侧哥哥数量', () => {
  const fixture = create_era_fixture();
  const family = setup_sibling_search(fixture, {
    search_type: 1,
    source_family: 1_000_001,
    target_family: 10_000_001,
  });

  assert.equal(family.search_family(1), 2);
});

test('手足匹配：男性检索弟弟时扣候选侧哥哥而非姐姐', () => {
  const fixture = create_era_fixture();
  const family = setup_sibling_search(fixture, {
    search_type: 3,
    source_family: 100_000_001,
    target_family: 1_000_001,
    male: true,
  });

  assert.equal(family.search_family(1), 2);
});

test('NID 特殊角色边界包含角色 40', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 40);
  const family = fixture.load_module('chara/chara-family');

  family.relation_rebuild();

  assert.equal(fixture.store.get('cflag:40:6'), 10_040);
  assert.equal(fixture.store.get('c_relation:40:40'), 10_040);
});

test('加入父母家庭时继承既有孩子为手足，随机源由调用者确定', () => {
  const fixture = create_era_fixture();
  for (const cid of [1, 2, 3]) add_chara(fixture, cid);
  const family = fixture.load_module('chara/chara-family');
  family.rf_set_both(2, 1, 6); // 2 的母亲是 1
  fixture.store.set('cflag:2:451', 15);
  fixture.store.set('cflag:3:451', 15);

  assert.equal(family.rf_join_to(3, 1, 6, 0, seq([0])), 2);
  assert.equal(family.rf_get(3, 2), 2);
  assert.equal(family.rf_get(2, 3), 4);
  assert.equal(family.rf_get(3, 1), 6);
});

test('加入手足家庭会复制父母；父母加入子女家庭会覆盖全部手足', () => {
  const fixture = create_era_fixture();
  for (const cid of [1, 2, 3, 4]) add_chara(fixture, cid);
  const family = fixture.load_module('chara/chara-family');
  family.rf_set_both(2, 1, 6); // 2 的母亲是 1
  assert.equal(
    family.rf_join_to(3, 2, 4, 0, seq([])),
    1,
    '保留原作父母计数再次除二的行为',
  );
  assert.equal(family.rf_get(3, 1), 6);
  assert.equal(family.rf_get(3, 2), 4);

  assert.equal(family.rf_join_to(4, 2, 8, 0, seq([])), 2);
  assert.equal(family.rf_get(4, 2), 8);
  assert.equal(family.rf_get(4, 3), 8);
});

test('后代只能经父母关系加入家庭', () => {
  const fixture = create_era_fixture();
  for (const cid of [1, 2]) add_chara(fixture, cid);
  fixture.store.set('talent:2:220', 1);
  const family = fixture.load_module('chara/chara-family');

  assert.throws(
    () => family.rf_join_to(2, 1, 2, 0, seq([])),
    /只能将生下的孩子/,
  );
});

test('家族登记按相对年龄选首个相容角色，并保留源分支顺序', () => {
  const fixture = create_era_fixture();
  for (const cid of [0, 41, 42, 43]) add_chara(fixture, cid);
  fixture.store.set('talent:41:314', 1); // 种族
  fixture.store.set('talent:42:314', 1);
  fixture.store.set('talent:43:314', 1);
  fixture.store.set('talent:41:315', 3); // 成为勇者前的生活
  fixture.store.set('talent:42:315', 3);
  fixture.store.set('talent:43:315', 3);
  fixture.store.set('talent:42:157', 1); // 人妻：相对年龄 +6
  fixture.store.set('talent:43:157', 1);
  const family = fixture.load_module('chara/chara-family');

  assert.deepEqual(family.family_register(41, seq([])), [42, 2]);
  assert.equal(family.rf_get(41, 42), 2);
  assert.equal(family.rf_get(42, 41), 4);
  assert.deepEqual(family.family_register(41, seq([])), [0, 0]);
});

test('村娘登记直接互连，后代与特殊角色不进入随机家族登记', () => {
  const fixture = create_era_fixture();
  for (const cid of [17, 41, 42, 43, 44]) add_chara(fixture, cid);
  fixture.store.set('talent:41:165', 1); // 村娘 A
  fixture.store.set('talent:42:171', 1); // 村娘 B
  fixture.store.set('talent:43:220', 1); // 后代
  fixture.store.set('talent:44:157', 1); // 特殊角色若漏过滤，会与此人建立家族
  const family = fixture.load_module('chara/chara-family');

  assert.deepEqual(family.family_register(41, seq([])), [42, 2]);
  assert.equal(family.rf_get(41, 42), 2);
  assert.equal(family.rf_get(42, 41), 4);
  assert.deepEqual(family.family_register(17, seq([])), [0, 0]);
  assert.deepEqual(family.family_register(43, seq([])), [0, 0]);
});

test('随机家族登记跳过作为候选的后代', () => {
  const fixture = create_era_fixture();
  for (const cid of [0, 41, 42, 43]) add_chara(fixture, cid);
  for (const cid of [41, 42, 43]) {
    fixture.store.set(`talent:${cid}:314`, 1); // 种族
    fixture.store.set(`talent:${cid}:315`, 3); // 成为勇者前的生活
  }
  fixture.store.set('talent:42:220', 1); // 首个相容候选是后代，必须跳过
  fixture.store.set('talent:42:157', 1);
  fixture.store.set('talent:43:157', 1);
  const family = fixture.load_module('chara/chara-family');

  assert.deepEqual(family.family_register(41, seq([])), [43, 2]);
});

test('种族和经历相容规则保留精英限制、冲突与原作非对称性', () => {
  const fixture = create_era_fixture();
  for (const cid of [8, 41, 42, 201, 202, 211]) add_chara(fixture, cid);
  fixture.store.set('talent:41:314', 9); // 魔化
  fixture.store.set('talent:41:321', 2); // 原种族
  fixture.store.set('talent:42:314', 2);
  fixture.store.set('talent:211:314', 2);
  const family = fixture.load_module('chara/chara-family');

  assert.equal(family.f_is_same_race(41, 42), true);
  assert.equal(family.f_is_same_race(201, 202), false);
  assert.equal(family.f_is_same_race(211, 42), true);
  assert.equal(family.f_is_close_experience(99, 99), true);
  assert.equal(family.f_is_close_experience(2, 11), false);
  assert.equal(family.f_is_close_experience(8, 1), true);
  assert.equal(family.f_is_close_experience(1, 8), false);
});

test('相关性检查会读取外部家族成员的经历，不擅自跳过负编号', () => {
  const fixture = create_era_fixture();
  for (const cid of [41, 42]) add_chara(fixture, cid);
  fixture.store.set('talent:41:314', 1);
  fixture.store.set('talent:42:314', 1);
  fixture.store.set('talent:41:315', 3);
  fixture.store.set('talent:42:315', 3);
  const family = fixture.load_module('chara/chara-family');
  family.r_set(41, -4, 5);

  assert.equal(family.f_check_relevant(41, 42), 1);
  assert.ok(
    fixture.var_reads.some((entry) => entry.name === 'talent:-4:315'),
    'RELATION_FAMILY.ERB 对负编号成员同样读取 TALENT:经历',
  );
});

test('关系类型文本、反转和十进制位工具忠实保留原公式', () => {
  const fixture = create_era_fixture();
  const family = fixture.load_module('chara/chara-family');

  assert.equal(family.f_type_reverse(5), 8);
  assert.equal(family.f_type_reverse(5, 1), 7);
  assert.equal(family.f_type_to_str(2), '姊');
  assert.equal(family.f_type_to_str2(8), '女儿');
  assert.equal(family.dec_get_bit(123, 2), 2);
  assert.deepEqual(family.dec_set_bit(123, 2, 5), { number: 54, value: 5 });
  assert.deepEqual(family.dec_bit_add(123, 2, 8), { number: 123, value: 10 });
});

test('家族信息输出父母、手足和子女按钮，并区分显示数与总数', () => {
  const fixture = create_era_fixture();
  for (const cid of [1, 2, 3, 4, 5, 6, 7, 8]) add_chara(fixture, cid);
  const family = fixture.load_module('chara/chara-family');
  family.r_set(1, 2, 6);
  for (const cid of [3, 4, 5]) family.r_set(1, cid, 2);
  for (const cid of [6, 7, 8]) family.r_set(1, cid, 8);

  assert.deepEqual(family.family_print_info(1), { displayed: 6, total: 7 });
  assert.deepEqual(
    fixture.lines_history
      .filter((line) => line.type === 'button')
      .map((line) => line.accelerator),
    [15002, 15003, 15004, 15005, 15006, 15007],
  );
  assert.ok(
    fixture.lines_history.some(
      (entry) => entry.type === 'text' && entry.text === '等',
    ),
  );
});

test('关系扩展表与固定配置双向在场', () => {
  const root = path.resolve(__dirname, '..');
  const fixed = JSON.parse(
    fs.readFileSync(path.join(root, 'yml/_fixed.json'), 'utf8'),
  );
  for (const table of ['c_relation', 'c_relation_sub']) {
    assert.ok(fixed.system.extendedCharaTables.includes(table));
    const filename =
      table === 'c_relation' ? 'C_Relation.yml' : 'C_Relation_Sub.yml';
    const content = fs.readFileSync(path.join(root, 'yml', filename), 'utf8');
    assert.match(
      content,
      table === 'c_relation'
        ? /C_RELATION（200 槽）/
        : /C_RELATION_SUB（1=娼馆客/,
    );
  }
});

engine_test(
  '引擎接受家族扩展表：建桶、寻址、存档往返，并拒绝未登记配置',
  async () => {
    const root = path.resolve(__dirname, '..');
    const tables = load_repo_variable_tables();
    const load_chara17 = (extended_tables) => {
      const loader = create_chara_loader({ extended_tables });
      attach_variable_tables(loader, tables);
      loader.load_rows(
        engine.parse_data_file(
          fs.readFileSync(path.join(root, 'yml/Chara17.yml'), 'utf8'),
          'yml',
          'chara',
        ),
      );
      return loader;
    };

    const unregistered = { portcflag: 2, ex_talent: 2 };
    const rejected_loader = load_chara17(unregistered);
    const rejected = create_add_character(rejected_loader.static_data, {
      extended_tables: unregistered,
    });
    assert.equal(rejected.add(17), true);
    assert.equal(rejected.data.c_relation, undefined);
    assert.equal(
      engine.set_var.call(
        {
          data: rejected.data,
          staticData: rejected_loader.static_data,
          fieldNames: tables.field_names,
          global: {},
          extendedTables: unregistered,
          era: { error: () => {} },
        },
        'c_relation:17:24',
        2,
      ),
      undefined,
      '未登记时没有角色桶，三段写入被引擎拒绝',
    );

    const loader = load_chara17(EXTENDED_TABLES);
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ere-family-'));
    try {
      const fake_era = {
        path: tmp,
        config: { system: { saveCompressedData: false } },
        global: { saves: {} },
        staticData: {
          ...loader.static_data,
          gamebase: {
            version: 5,
            gameCode: 931060,
            allowVersion: 5,
            defaultChara: 0,
          },
          chara: {
            0: { id: '0', name: '你', callname: '你' },
            ...loader.static_data.chara,
          },
        },
        data: {},
        fieldNames: tables.field_names,
        extendedTables: EXTENDED_TABLES,
        connect: () => {},
        error: () => {},
        log: () => {},
      };
      const api = new engine.era_api(fake_era);
      api.resetData();
      assert.deepEqual(fake_era.data.c_relation, { 0: {} });
      assert.deepEqual(fake_era.data.c_relation_sub, { 0: {} });
      assert.equal(api.addCharacter(17), true);
      assert.equal(api.set('c_relation:17:24', 2), 2);
      assert.equal(api.set('c_relation_sub:17:4', 5), 5);

      assert.equal(await api.saveData(1, '家族关系往返'), true);
      const saved = JSON.parse(
        fs.readFileSync(path.join(tmp, 'sav', 'save1.sav'), 'utf8'),
      );
      assert.deepEqual(saved.c_relation[17], { 24: 2 });
      assert.deepEqual(saved.c_relation_sub[17], { 4: 5 });

      fake_era.data = {};
      assert.equal(await api.loadData(1), true);
      assert.equal(api.get('c_relation:17:24'), 2);
      assert.equal(api.get('c_relation_sub:17:4'), 5);
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  },
);

test('出生包装拒绝外部母亲，普通父母按 6/5、外部父亲按 5 登记', () => {
  const fixture = create_era_fixture();
  for (const cid of [2, 3, 10]) add_chara(fixture, cid);
  const family = fixture.load_module('chara/chara-family');

  assert.throws(
    () => family.family_birth_to_mom(10, -4, seq([])),
    /不可能作为母亲/,
  );
  family.family_birth_to_mom(10, 2, seq([]));
  family.family_birth_to_dad(10, 3, seq([]));
  family.family_birth_to_dad(10, -4, seq([]));
  assert.equal(family.rf_get(10, 2), 6);
  assert.equal(family.rf_get(10, 3), 5);
  assert.equal(family.rf_get(10, -4), 5);
});
