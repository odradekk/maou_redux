/**
 * `MARK,4,3`（葵希罗预设）的行为测试（#548 / S7）。
 *
 * 源: target/CSV/Chara/Chara34.csv:91（MARK,4,3）
 *     消费判据: target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB:961-981
 *     （@MARK_GOT_CHECK 的反抗刻印三档门均以 MARK:4 <= 0/1/2 为前提）
 *     加入点: target/ERB/侵略…ENTER_ENEMY.ERB:247（ADDCHARA 34 →
 *     ere/event/enter-enemy.js 的 k_34_crazylord）
 *
 * 背景（#118 定夺的同族缺口）：ere 引擎 initCharaTable 只按 Mark.yml
 * 名字表登记的下标建槽抄预设——Mark.yml 无 4 号名条目，addCharacter 不把
 * MARK,4,3 落 data（test/extalent-table.test.js 的引擎级用例钉住）。扩名
 * 条目会给所有角色预建 4 槽，故在加入点直写 mark:34:4 = 3（反抗刻印履历
 * 已满：三档取得门全关，与原作 ADDCHARA 全量拷贝预设的行为一致）。
 *
 * 覆盖：
 *   - 加入点写值（k_34_crazylord 后 mark:34:4 = 3，mark:34:3 预设原样）；
 *   - 引擎级：真 set_var 写 mark:<cid>:4 落 data 并可读回（write 通道的
 *     引擎接受度，extalent-table 同款驱动法）；
 *   - 效果：SOURCE_CHECK 链下反感 ≥ 500 也不取得反抗刻印（对照：无履历
 *     的世界在同一链上取得 LV1）。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_chara_0 } = require('./helpers/chara');
const { seed_static_names } = require('./helpers/static-names');
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
const repo_tables = load_repo_variable_tables();
const EXTENDED_TABLES = { portcflag: 2, ex_talent: 2 };

function text_lines(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

/** K_34 的可出场世界（enter-enemy.test.js 的 setup_crazylord 同款） */
function setup_crazylord() {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  fixture.seed_chara(20, { id: 20, name: '金红桃', callname: '金红桃' });
  fixture.seed_chara(34, { id: 34, name: '葵希罗', callname: '葵希罗' });
  fixture.era.addCharacter(20);
  fixture.store.set('talent:20:76', 1); // TALENT:20:76【淫乱】
  fixture.store.set('flag:92', 15); // 四方堡垒全陷落
  fixture.store.set('flag:500', 1); // 狂王性别：女性
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.day_count = 350;
  fixture.set_inputs(0); // :295 仪式性确认输入
  return { fixture, era_flag };
}

test('K_34 加入点：mark:34:4 = 3（反抗刻印履历）与 mark:34:3 预设同在', async () => {
  const { fixture } = setup_crazylord();
  const { k_34_crazylord } = fixture.load_module('event/enter-enemy');
  await k_34_crazylord(() => 0);

  assert.equal(fixture.store.get('mark:34:4'), 3, 'MARK,4,3 在加入点补写');
  // MARK 1/3 的预设经引擎名字表自落（engine 级由 test/extalent-table.test.js
  // 钉住：data.mark[34][1] = 3 / [3] = 3）；夹具不读 yml/，此处不重复断言
});

test('研究所复活：RESULECTION 也过 ADDCHARA_EX，补偿照样落（#548 返工）', async () => {
  // 复活 34 号：FLAG:(34+999) = -2 是新的 @CHARADEAD_CHECK 写的死亡旗，
  // 按钮编号 = COUNT + 100（COUNT = 33 → 133 → preset = 133 - 99 = 34）
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  fixture.seed_chara(34, { id: 34, name: '葵希罗', callname: '葵希罗' });
  fixture.store.set('exp:0:81', 5); // 勋章经验（> 0 才进复活流程）
  fixture.store.set('flag:1033', -2); // :2608 判据（可复活）
  fixture.set_inputs(0, 133); // :2575 确定 → :2599 选 34 号
  const { resulection } = fixture.load_module('page/page-shop-labo');

  assert.equal(await resulection(() => 0), 1, '复活流程走完（RETURN 1）');
  assert(
    fixture.era.getAddedCharacters().includes(34),
    '34 号被 ADDCHARA 收回',
  );
  assert.equal(
    fixture.store.get('mark:34:4'),
    3,
    'MARK,4,3 的补偿写在 @CHARA_EX_34 里，复活路径同样经过',
  );
});

/**
 * 调教链世界：目标 34 已按「加入点」形态带着 MARK 1/3/4 = 3（SOURCE_CHECK
 * 的判死门读 mark:4）。post 在 SOURCE_CHECK 前把反感源面改大（source-check.
 * test.js 的 run_caress 同款时机）。
 */
async function run_source_check(post, { with_mark4 = true } = {}) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  fixture.seed_chara(34, { id: 34, name: '葵希罗', callname: '葵希罗' });
  fixture.era.addCharacter(34);
  seed_static_names(fixture);
  fixture.era.beginTrain(0, 34);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 34;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = 0;
  era_flag.prevcom = 12;
  fixture.store.set('maxbase:34:0', 2000);
  fixture.store.set('maxbase:34:1', 2000);
  fixture.store.set('base:34:0', 1450);
  fixture.store.set('base:34:1', 410);
  fixture.store.set('talent:0:122', 1);
  // 预设的落点形态（Mark.yml 有名条目的 1/3 引擎自落；4 走加入点补偿）
  fixture.store.set('mark:34:1', 3);
  fixture.store.set('mark:34:3', 3);
  if (with_mark4) {
    fixture.store.set('mark:34:4', 3);
  } else {
    fixture.store.delete('mark:34:4');
  }
  fixture.load_module('system/train/com-caress');
  fixture.load_module('event/source-check');
  const { com_family } = fixture.load_module('system/train/com-family');
  const { emit } = fixture.load_module('system/event/registry');
  await com_family.call(0);
  if (post) {
    post(fixture);
  }
  await emit('SOURCE_CHECK');
  return fixture;
}

test('效果：mark:4 = 3 时反感 ≥ 500 也不取得反抗刻印（三档门全关）', async () => {
  const fixture = await run_source_check((f) => {
    f.store.set('source:34:12', 1000); // 不快源 ×0.5（顺从 0）= 500 ≥ 500
  });

  assert(
    !text_lines(fixture).some((line) => line.includes('获得反抗刻印')),
    'mark:4 = 3 → MARK:4 <= 0/1/2 三档门全关',
  );
  assert.equal(fixture.store.get('mark:34:3'), 3, '反抗刻印保持预设 Lv3');
  assert.equal(fixture.store.get('mark:34:4'), 3, '履历不再推进');
});

test('对照：无 mark:4 履历时同一链上取得反抗刻印 LV1（判据仍活着）', async () => {
  const fixture = await run_source_check(
    (f) => {
      f.store.set('source:34:12', 1000);
    },
    { with_mark4: false },
  );

  assert(text_lines(fixture).includes('获得反抗刻印LV1'));
  assert.equal(fixture.store.get('mark:34:4'), 1, '履历从 0 推进到 1');
});

// —— 引擎级：mark:<cid>:4 的写入通道（#13 未声明下标的 setVar 落 data）——

engine_test(
  '引擎接受 mark:<cid>:4 的写入：addCharacter 后 setVar 落 data 可读回',
  () => {
    const loader = create_chara_loader({ extended_tables: EXTENDED_TABLES });
    attach_variable_tables(loader, repo_tables);
    loader.load_rows(
      engine.parse_data_file(
        fs.readFileSync(
          path.resolve(__dirname, '..', 'yml', 'Chara34.yml'),
          'utf8',
        ),
        'yml',
        'chara',
      ),
    );
    const adder = create_add_character(loader.static_data, {
      extended_tables: EXTENDED_TABLES,
    });
    assert.equal(adder.add(34), true);
    assert.equal(adder.data.mark[34][4], undefined, '预设仍被名字表缺口丢下');
    // 加入点补偿写入走的正是这条通道（ere.set → 引擎 setVar 三段分支）
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
        'mark:34:4',
        3,
      ),
      3,
    );
    assert.equal(adder.data.mark[34][4], 3, '写入落在 data.mark[34].4（#13）');
  },
);
