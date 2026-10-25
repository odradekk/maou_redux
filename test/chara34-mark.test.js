/**
 * `MARK,4,3`（葵希罗预设）的行为测试（#548 / S7；#814 起预设由引擎落库）。
 *
 * 背景：ere 引擎 initCharaTable 只按 Mark.yml 名字表登记的下标建槽抄预设。
 * Mark.yml 早已有 0～3 号名条目，4 号（反抗刻印履历）自 #814 起才登记——登记
 * 前 addCharacter 不把 MARK,4,3 落 data，代码在 34 号的扩展里手工补写
 * （#118 的旧定夺）；现在预设自己落库，手工补偿删掉，本文件守住「加入点不再
 * 写它、预设值照样在」。效果与预设全量拷入一致：三档取得检查全关，她不会再
 * 获得反抗刻印。
 *
 * 覆盖：
 *   - 加入点不覆盖预设（k_34_crazylord 后 mark:34:4 仍是 3，且不再由游戏代码写）；
 *   - 引擎级：addCharacter(34) 把 MARK,4,3 落进 data（预设通道本身）；
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
  // 引擎在 addCharacter(34) 时按 Chara34.yml 的 MARK 段建槽抄预设；夹具不读
  // yml/（引擎侧由本文件的 engine_test 与 test/chara-preset-apply.test.js 钉住），
  // 这里手工播种同一组值，好让「加入点不覆盖预设」可观测
  for (const mark of [1, 3, 4]) {
    fixture.store.set(`mark:34:${mark}`, 3);
  }
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.day_count = 350;
  fixture.set_inputs(0); // 仪式性确认输入
  return { fixture, era_flag };
}

test('K_34 加入点：mark:34:4 = 3 原样保留，代码不再补写（#814 删掉手工补偿）', async () => {
  const { fixture } = setup_crazylord();
  const { k_34_crazylord } = fixture.load_module('event/enter-enemy');
  await k_34_crazylord(() => 0);

  assert.equal(fixture.store.get('mark:34:4'), 3, '反抗刻印履历仍是预设的 3');
  assert(
    !fixture.var_writes.some((write) => write.name === 'mark:34:4'),
    '加入点不得再写 mark:34:4——预设由引擎抄进角色数据，写第二次就是两套来源',
  );
});

test('研究所复活：resulection 也不补写 mark:34:4（预设随 addCharacter 落库）', async () => {
  // 复活 34 号：FLAG:(34+999) = -2 是死亡旗（-2 = 已死），
  // 按钮编号 = COUNT + 100（COUNT = 33 → 133 → preset = 133 - 99 = 34）
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  fixture.seed_chara(34, { id: 34, name: '葵希罗', callname: '葵希罗' });
  // 同 setup_crazylord：引擎侧由 addCharacter 抄预设，夹具手工播种
  for (const mark of [1, 3, 4]) {
    fixture.store.set(`mark:34:${mark}`, 3);
  }
  fixture.store.set('exp:0:81', 5); // 勋章经验（> 0 才进复活流程）
  fixture.store.set('flag:1033', -2); // 条件（可复活）
  // 34 的状态预设是 2（侵攻中）：待机档归一只针对 1，2 必须原样保留
  fixture.store.set('cflag:34:1', 2);
  fixture.set_inputs(0, 133); // 确定 → 选 34 号
  const { resulection } = fixture.load_module('page/page-shop-labo');

  assert.equal(await resulection(() => 0), 1, '复活流程走完（返回 1）');
  assert(
    fixture.era.getAddedCharacters().includes(34),
    '34 号被 addCharacter 收回',
  );
  assert.equal(fixture.store.get('mark:34:4'), 3, '复活后仍是预设的 3');
  assert.equal(
    fixture.store.get('cflag:34:1'),
    2,
    '侵攻中的状态不被待机档归一改掉',
  );
  assert(
    !fixture.var_writes.some((write) => write.name === 'mark:34:4'),
    '复活路径同样不补写——所有加入点共用 addCharacter 的预设通道',
  );
});

/**
 * 调教链世界：目标 34 已按「加入点」的写法带着 MARK 1/3/4 = 3（SOURCE_CHECK
 * 的判死检查读 mark:4）。post 在 SOURCE_CHECK 前把反感源面改大（source-check.
 * test.js 的 run_caress 同款时机）。
 */
async function run_source_check(post, { with_mark4 = true } = {}) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  fixture.seed_chara(34, { id: 34, name: '葵希罗', callname: '葵希罗' });
  fixture.era.addCharacter(34);
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
  // 预设的落点（Mark.yml 有名条目的 1/3 引擎自落；4 走加入点补偿）
  fixture.store.set('mark:34:1', 3);
  fixture.store.set('mark:34:3', 3);
  if (with_mark4) {
    fixture.store.set('mark:34:4', 3);
  } else {
    fixture.store.delete('mark:34:4');
  }
  fixture.load_module('system/train/com-caress');
  fixture.load_module('system/train/source-check');
  const { com_family } = fixture.load_module('system/train/com-family');
  const { emit } = fixture.load_module('system/event/registry');
  await com_family.call(0);
  if (post) {
    post(fixture);
  }
  await emit('SOURCE_CHECK');
  return fixture;
}

test('效果：mark:4 = 3 时反感 ≥ 500 也不取得反抗刻印（三档检查全关）', async () => {
  const fixture = await run_source_check((f) => {
    f.store.set('source:34:12', 1000); // 不快源 ×0.5（顺从 0）= 500 ≥ 500
  });

  assert(
    !text_lines(fixture).some((line) => line.includes('获得反抗刻印')),
    'mark:4 = 3 → MARK:4 <= 0/1/2 三档检查全关',
  );
  assert.equal(fixture.store.get('mark:34:3'), 3, '反抗刻印保持预设 Lv3');
  assert.equal(fixture.store.get('mark:34:4'), 3, '履历不再推进');
});

test('对照：无 mark:4 履历时同一链上取得反抗刻印 LV1（条件仍活着）', async () => {
  const fixture = await run_source_check(
    (f) => {
      f.store.set('source:34:12', 1000);
    },
    { with_mark4: false },
  );

  assert(text_lines(fixture).includes('获得反抗刻印LV1'));
  assert.equal(fixture.store.get('mark:34:4'), 1, '履历从 0 推进到 1');
});

// —— 引擎级：MARK,4,3 走预设通道落库（#814 起 Mark.yml 登记了 4 号）——

engine_test(
  '引擎 addCharacter：MARK,4,3 随预设落 data.mark[34][4]，无需任何补写',
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
    assert.equal(
      adder.data.mark[34][4],
      3,
      'Mark.yml 登记了 4 号，initCharaTable 建槽并抄预设',
    );
    assert.equal(adder.data.mark[34][1], 3, 'MARK 1 同样是预设落库');
    assert.equal(adder.data.mark[34][3], 3, 'MARK 3 同样是预设落库');
  },
);
