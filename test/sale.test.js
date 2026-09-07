/**
 * 售出估价与零散结算测试（issue #335）。
 *
 * 缝 = test/helpers/era-fixture.js。估价以 golden/sale-natural.log 的真实
 * 14430 输出为主样本；母乳与死斗场验证资金、非作弊资金和跨域状态写入。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara } = require('./helpers/chara');

function seed_world(fixture, { assi = -1 } = {}) {
  join_slave_chara(fixture, 0, '你');
  join_slave_chara(fixture, 31, '温妮');
  if (assi >= 0) join_slave_chara(fixture, assi, '助手桑');

  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.assi = assi;
  era_flag.target_record = 31;
  era_flag.assi_record = assi;
  era_flag.target_backup = 31;
  era_flag.assi_backup = assi;
  fixture.era.beginTrain(...fixture.era.getAddedCharacters());
  return era_flag;
}

test('ESTIMATE_CHARA：黄金样本的加价与逐步倍率得到 14430', () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.store.set('abl:31:10', 4); // 顺从 +1500
  fixture.store.set('abl:31:11', 5); // 欲望 +2000
  fixture.store.set('abl:31:12', 1); // 技巧 +100
  fixture.store.set('abl:31:13', 1); // 侍奉技术 +100
  fixture.store.set('abl:31:21', 3); // 抖M气质 ×1.30
  fixture.store.set('talent:31:0', 1); // 处女 ×2.00
  fixture.store.set('talent:31:110', 1); // 巨乳 ×1.50
  fixture.store.set('talent:31:314', 0); // 种族：人类 ×1.00

  const { estimate_chara } = fixture.load_module('system/stronghold/sale');
  const result = estimate_chara(31);

  assert.equal(result.price, 14430);
  assert.deepEqual(
    [10, 11, 12, 13].map((id) => result.ability_additions[id]),
    [1500, 2000, 100, 100],
  );
  assert.equal(result.ability_multipliers[21], 130);
  assert.equal(result.talent_multipliers[0], 200);
  assert.equal(result.talent_multipliers[110], 150);
  assert.equal(result.talent_multipliers[314], 100);
});

test('ESTIMATE_CHARA：无能力、经验与素质时保留欲望零级基础价', () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  const { estimate_chara } = fixture.load_module('system/stronghold/sale');

  assert.equal(estimate_chara(31).price, 10);
});

test('ESTIMATE_CHARA：能力加价阶梯覆盖拐点与封顶', () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  const { estimate_chara } = fixture.load_module('system/stronghold/sale');
  const cases = [
    [10, 1, 200],
    [10, 9, 3200],
    [10, 99, 3500],
    [11, 0, 10],
    [12, 5, 1200],
    [13, 5, 800],
    [13, 6, 2000],
    [14, 9, 3800],
    [15, 5, 450],
    [15, 6, 1000],
    [30, 5, 1300],
    [32, 5, 1700],
    [37, 5, 10000],
    [39, 5, 1700],
    [39, 6, 3000],
  ];

  for (const [id, level, expected] of cases) {
    fixture.store.set(`abl:31:${id}`, level);
    assert.equal(
      estimate_chara(31).ability_additions[id],
      expected,
      `ABL:${id} LV${level}`,
    );
    fixture.store.set(`abl:31:${id}`, 0);
  }
});

test('ESTIMATE_CHARA：能力倍率曲线覆盖四类公式', () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  const { estimate_chara } = fixture.load_module('system/stronghold/sale');
  const cases = [
    [0, 3, 100],
    [0, 10, 200],
    [0, 15, 250],
    [0, 20, 375],
    [0, 25, 575],
    [1, 2, 100],
    [1, 10, 200],
    [1, 20, 375],
    [1, 25, 535],
    [2, 5, 140],
    [2, 20, 340],
    [2, 25, 490],
    [3, 1, 100],
    [3, 10, 250],
    [3, 20, 395],
    [3, 25, 535],
    [16, 3, 110],
    [17, 8, 180],
    [20, 6, 200],
    [21, 10, 300],
    [22, 4, 130],
    [23, 7, 150],
  ];

  for (const [id, level, expected] of cases) {
    fixture.store.set(`abl:31:${id}`, level);
    assert.equal(
      estimate_chara(31).ability_multipliers[id],
      expected,
      `ABL:${id} LV${level}`,
    );
    fixture.store.set(`abl:31:${id}`, 0);
  }
});

test('ESTIMATE_CHARA：素质倍率及条件分支生成可渲染明细', () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  const { estimate_chara } = fixture.load_module('system/stronghold/sale');
  const direct_cases = [
    [33, 120],
    [42, 120],
    [46, 20],
    [63, 120],
    [73, 20],
    [76, 150],
    [91, 150],
    [92, 400],
    [110, 150],
    [113, 150],
    [114, 160],
    [119, 170],
    [121, 200],
    [125, 120],
    [126, 150],
    [130, 140],
    [135, 50],
    [181, 150],
    [248, 60],
    [253, 80],
    [255, 120],
  ];
  for (const [id, expected] of direct_cases) {
    fixture.store.set(`talent:31:${id}`, 1);
    assert.equal(
      estimate_chara(31).talent_multipliers[id],
      expected,
      `TALENT:${id}`,
    );
    fixture.store.set(`talent:31:${id}`, 0);
  }

  fixture.store.set('talent:31:0', 1);
  fixture.store.set('cflag:31:71', 1);
  assert.equal(estimate_chara(31).talent_multipliers[0], 150, '非纯洁处女');
  fixture.store.set('talent:31:0', 0);
  fixture.store.set('talent:31:12', 1);
  fixture.store.set('abl:31:10', 3);
  assert.equal(estimate_chara(31).talent_multipliers[12], 120, '刚强且顺从');
  fixture.store.set('talent:31:12', 0);
  fixture.store.set('talent:31:122', 1);
  fixture.store.set('abl:31:23', 1);
  assert.equal(estimate_chara(31).talent_multipliers[122], 40, '男性低能力');
  fixture.store.set('abl:31:10', 4);
  fixture.store.set('abl:31:11', 4);
  fixture.store.set('abl:31:23', 2);
  assert.equal(estimate_chara(31).talent_multipliers[122], 60, '男性中能力');
  fixture.store.set('abl:31:10', 5);
  fixture.store.set('abl:31:11', 5);
  fixture.store.set('abl:31:23', 3);
  assert.equal(estimate_chara(31).talent_multipliers[122], 80, '男性高能力');
  fixture.store.set('talent:31:122', 0);
  fixture.store.set('talent:31:109', 1);
  assert.equal(estimate_chara(31).talent_multipliers[109], 90, '贫乳');
  fixture.store.set('talent:31:100', 1);
  assert.equal(estimate_chara(31).talent_multipliers[109], 100, '娇小豁免贫乳');
  fixture.store.set('talent:31:109', 0);
  fixture.store.set('talent:31:100', 0);
  fixture.store.set('talent:31:116', 1);
  assert.equal(estimate_chara(31).talent_multipliers[116], 50, '绝壁');
  fixture.store.set('talent:31:132', 1);
  assert.equal(estimate_chara(31).talent_multipliers[116], 100, '幼稚豁免绝壁');
  fixture.store.set('talent:31:116', 0);
  fixture.store.set('talent:31:132', 0);
  fixture.store.set('talent:31:165', 1);
  assert.equal(estimate_chara(31).talent_multipliers[310], 400, '稀有人物');
  fixture.store.set('talent:31:314', 11);
  assert.equal(estimate_chara(31).talent_multipliers[314], 80, '矮人种族');
});

test('ESTIMATE_CHARA：卖淫影响 2 首次用零，随后沿用 E:74 的旧倍率', () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.store.set('abl:31:10', 1); // 顺从 +200；欲望 LV0 固有 +10
  fixture.store.set('abl:31:37', 5); // mode 2 不应用 ±10000
  fixture.store.set('exp:31:74', 500);
  const { estimate_chara } = fixture.load_module('system/stronghold/sale');

  let result = estimate_chara(31, { prostitution_effect: 2 });
  assert.equal(result.price, 0);
  assert.equal(result.experience_multipliers[74], 0);

  fixture.store.set('abl:31:37', 0);
  result = estimate_chara(31, { prostitution_effect: 0 });
  assert.equal(result.price, 42);
  assert.equal(result.experience_multipliers[74], 20);

  fixture.store.set('abl:31:37', 5);
  result = estimate_chara(31, { prostitution_effect: 2 });
  assert.equal(result.price, 42);
  assert.equal(result.experience_multipliers[74], 20);

  fixture.store.set('talent:31:180', 1); // mode 2 不应用妓女倍率
  result = estimate_chara(31, { prostitution_effect: 2 });
  assert.equal(result.talent_multipliers[180], 100);
});

test('ESTIMATE_CHARA：妓女正面倍率与生育经验各档独立生效', () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.store.set('talent:31:180', 1);
  fixture.store.set('exp:31:74', 1);
  fixture.store.set('exp:31:60', 2);
  const { estimate_chara } = fixture.load_module('system/stronghold/sale');

  let result = estimate_chara(31, { prostitution_effect: 1 });
  assert.equal(result.experience_multipliers[74], 200);
  assert.equal(result.experience_multipliers[60], 20);
  assert.equal(result.talent_multipliers[180], 120);

  fixture.store.set('exp:31:60', 3);
  result = estimate_chara(31, { prostitution_effect: 1 });
  assert.equal(result.experience_multipliers[60], 10);
});

test('ESTIMATE_CHARA：负面项与边界曲线逐步截断', () => {
  const fixture = create_era_fixture();
  seed_world(fixture, { assi: 32 });
  fixture.store.set('abl:31:10', 3); // +850
  fixture.store.set('abl:31:11', 0); // +10
  fixture.store.set('abl:31:37', 2); // 卖淫中毒 -1000
  fixture.store.set('talent:31:101', 2); // 阴核感觉封锁 -150
  fixture.store.set('abl:31:0', 11); // 阴蒂感觉 ×2.10
  fixture.store.set('exp:31:74', 1); // 卖淫经验 ×0.40
  fixture.store.set('exp:31:60', 1); // 生育经验 ×0.50
  fixture.store.set('talent:31:153', 1); // 妊娠：顺从 3 → ×0.15
  fixture.store.set('talent:31:314', 1); // 精灵 ×1.20

  const { estimate_chara } = fixture.load_module('system/stronghold/sale');
  const result = estimate_chara(31);

  // -290 ×2.10 → -609 ×0.40 → -243 ×0.50 → -121 ×0.15 → -18
  // ×1.20 → -21（每一步均朝零截断）。
  assert.equal(result.price, -21);
  assert.equal(result.ability_additions[37], 1000);
  assert.deepEqual(result.sense_lock_penalties, [150, 0, 0, 0]);
  assert.equal(result.ability_multipliers[0], 210);
  assert.equal(result.experience_multipliers[74], 40);
  assert.equal(result.experience_multipliers[60], 50);
  assert.equal(result.talent_multipliers[153], 15);
  assert.equal(result.talent_multipliers[314], 120);
  assert.equal(result.merchant_multiplier, 100);
});

test('ESTIMATE_CHARA：卖淫正面模式、ISASSI 死分支与最高售价', () => {
  const fixture = create_era_fixture();
  const era_flag = seed_world(fixture, { assi: 31 });
  fixture.store.set('abl:31:10', 20);
  fixture.store.set('abl:31:11', 20);
  fixture.store.set('abl:31:12', 25);
  fixture.store.set('abl:31:13', 20);
  fixture.store.set('abl:31:14', 20);
  fixture.store.set('abl:31:15', 20);
  fixture.store.set('abl:31:30', 20);
  fixture.store.set('abl:31:31', 20);
  fixture.store.set('abl:31:32', 20);
  fixture.store.set('abl:31:33', 20);
  fixture.store.set('abl:31:37', 20);
  fixture.store.set('abl:31:39', 20);
  for (const id of [0, 1, 2, 3, 20, 21]) fixture.store.set(`abl:31:${id}`, 25);
  fixture.store.set('exp:31:74', 6000);
  fixture.store.set('talent:31:181', 1);
  fixture.store.set('talent:31:92', 1);
  fixture.store.set('talent:31:165', 1); // 稀有人物 ×4（结果记在 T:310）
  fixture.store.set('talent:31:314', 6);
  era_flag.assi = 31;

  const { estimate_chara } = fixture.load_module('system/stronghold/sale');
  const result = estimate_chara(31, { prostitution_effect: 1 });

  assert.equal(result.price, 25000000);
  assert.equal(result.experience_multipliers[74], 300);
  assert.equal(result.talent_multipliers[310], 400);
  assert.equal(result.former_assistant_multiplier, 100);
});

test('SELL_MILK：按经验、素质和助手话术结算并更新两份资金', async () => {
  const fixture = create_era_fixture();
  const era_flag = seed_world(fixture, { assi: 32 });
  fixture.store.set('tflag:35', 2); // 20cc，基础价 1000
  fixture.store.set('exp:31:54', 21); // > EXPLV:3 且 <= EXPLV:4 → ×1.20
  fixture.store.set('talent:31:0', 1); // 处女 ×3
  fixture.store.set('talent:31:78', 1); // 弄乳狂 ×2
  fixture.store.set('abl:32:15', 4); // 助手话术 ×1.20
  era_flag.money = 100;
  fixture.store.set('exflag:4444', 200);

  const { sell_milk } = fixture.load_module('system/stronghold/sale');
  assert.equal(await sell_milk(), 0);

  assert.equal(era_flag.money, 8740);
  assert.equal(fixture.store.get('exflag:4444'), 8840);
  assert.deepEqual(fixture.text_lines(), [
    '使用挤奶器从温妮身上榨出了20cc的母乳。',
    '助手桑巧妙地推销，使温妮的母乳卖得比平常更贵了。',
    '温妮的母乳价值8640点。',
    '所持金增加了8640点。',
  ]);
  assert.equal(fixture.inputs_consumed.at(-1)?.api, 'waitAnyKey');
});

test('SELL_MILK：无产量或目标未加入时静默返回，售价钳到 40000', async () => {
  const fixture = create_era_fixture();
  const era_flag = seed_world(fixture);
  const { sell_milk } = fixture.load_module('system/stronghold/sale');

  assert.equal(await sell_milk(), 0);
  assert.deepEqual(fixture.text_lines(), []);

  fixture.store.set('tflag:35', 999); // 产量先钳到 600cc
  fixture.store.set('exp:31:54', 999);
  fixture.store.set('talent:31:0', 1);
  fixture.store.set('talent:31:78', 1);
  assert.equal(await sell_milk(), 0);
  assert.equal(era_flag.money, 40000);
  assert(
    fixture.text_lines().includes('使用挤奶器从温妮身上榨出了600cc的母乳。'),
  );
  assert(fixture.text_lines().includes('温妮的母乳价值40000点。'));

  era_flag.target = 99;
  const before = fixture.text_lines().length;
  assert.equal(await sell_milk(), 0);
  assert.equal(fixture.text_lines().length, before);
});

test('SELL_FIGHTMONEY：扣观战卷、收入钳上限后结算并清零', async () => {
  const fixture = create_era_fixture();
  const era_flag = seed_world(fixture);
  fixture.store.set('tequip:31:55', 1);
  fixture.store.set('item:35', 2);
  fixture.store.set('tflag:402', 13000);
  era_flag.money = 500;
  fixture.store.set('exflag:4444', 1000);

  const { sell_fightmoney } = fixture.load_module('system/stronghold/sale');
  await sell_fightmoney();

  assert.equal(fixture.store.get('item:35'), 1);
  assert.equal(fixture.store.get('tflag:402'), 0);
  assert.equal(era_flag.money, 60500);
  assert.equal(fixture.store.get('exflag:4444'), 61000);
  assert(fixture.text_lines().includes('从死斗场的观战费中获得60000点收入'));
  assert.equal(fixture.inputs_consumed.at(-1)?.api, 'waitAnyKey');
});

test('SELL_FIGHTMONEY：无收入时仍消耗观战卷，不改写负收入', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.store.set('tequip:31:55', 1);
  fixture.store.set('item:35', 0);
  fixture.store.set('tflag:402', -1);

  const { sell_fightmoney } = fixture.load_module('system/stronghold/sale');
  await sell_fightmoney();

  assert.equal(fixture.store.get('item:35'), -1);
  assert.equal(fixture.store.get('tflag:402'), -1);
  assert.deepEqual(fixture.text_lines(), []);
});

test('EVENTEND 接入母乳与死斗场真身，不再输出对应存根', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.store.set('base:31:0', 2000);
  fixture.store.set('maxbase:0:1', 10000);
  fixture.store.set('tflag:35', 1);
  fixture.store.set('tflag:402', 10);
  fixture.set_inputs(999); // 两笔 WAIT 后，JUEL_CHECK 菜单退出
  fixture.load_module('event/event-end');
  const { emit } = fixture.load_module('system/event/registry');

  await emit('EVENTEND');

  assert(fixture.text_lines().includes('温妮的母乳价值500点。'));
  assert(fixture.text_lines().includes('从死斗场的观战费中获得50点收入'));
  assert(!fixture.text_lines().some((line) => line.includes('@SELL_MILK')));
  assert(
    !fixture.text_lines().some((line) => line.includes('@SELL_FIGHTMONEY')),
  );
});
