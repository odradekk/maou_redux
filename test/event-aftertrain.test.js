/**
 * @file 单元测试：EVENT_AFTERTRAIN 与调教后行为检查。
 *
 * 覆盖（issue #218 补轮）：
 *   - @AFTERTRAIN_SEX_CHECK：每道独立闸各一条负例（未成熟/无爱慕淫乱/
 *     经验不足/处女/男人/贞操带/贞操封印/主人非男/濒死/S≤0），以及
 *     S 计算的数值锚（V感觉分档、性交中毒、欲望+侍奉+欲情、爱慕/淫乱/
 *     性爱狂、接受/否定快感）；
 *   - @AFTERTRAIN_ANALSEX_CHECK：同形态（无爱慕淫乱/经验不足/主人非男/
 *     濒死/S≤0）+ A感觉分档数值锚；
 *   - @AFTERTRAIN_LESBIANSEX_CHECK：对象/助手指针、男性双方、四项素质
 *     门槛、百合中毒、濒死、N≤0 等闸，以及 N 计算（百合中毒档位、相性
 *     乘算、保守/戒备森严、双性恋/淫乱、接受/否定快感）与分支输出
 *     （sex_result 前缀、助手扶她、助手抖S、目标扶她、双扶她吮吸）；
 *   - @AFTERTRAIN_MASTURBATION_CHECK：阴蒂/欲望门槛、从不自慰、濒死、
 *     A≤0 等闸，自慰次数档位与加成，以及妄想对象三分支（q=0 主人 /
 *     q=1 助手 / q=2 野狗）与报告/欲求不满分支；
 *   - @AFTERTRAIN_BEASTSEX_CHECK：未成熟/经验不足/处女男人/贞操带/
 *     贞操封印/无野狗/濒死/B≤0 等闸，兽奸次数档位与报告分支；
 *   - @SELF_CHECK 五条派发臂的互斥与优先次序（男性→肛门、女性 V<A→肛门、
 *     处女+A感觉≥3→肛门、其余→性交），以及失神守卫与逆强暴复位。
 *
 * 原作缺陷（#14 / #270，1:1 照抄不修）：
 *   - aftertrain_beastsex_check 报告分支写 juel:8 += leftover_a*200
 *     （源 :837 `JUEL:8 += A*200`，A 是自慰回数残留；打印仍用 B*200）。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_gamebase } = require('./helpers/gamebase');

/**
 * 世界底座：预置魔王 0 与奴隶 17（+ 可选助手 1），开调教域，指好指针。
 * 返回 { fixture, era_flag }。
 */
function seed_aftertrain_world({ assi = -1 } = {}) {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  fixture.seed_chara(0, { name: '魔王', callname: '魔王' });
  fixture.seed_chara(17, { name: '玛奥', callname: '玛奥' });
  fixture.seed_chara(1, { name: '助手', callname: '助手' });
  fixture.era.addCharacter(0);
  fixture.era.addCharacter(17);
  fixture.era.addCharacter(1);
  const train_ids = assi >= 0 ? [0, 17, 1] : [0, 17];
  fixture.era.beginTrain(...train_ids);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 17;
  era_flag.player = 0;
  era_flag.assi = assi;
  return { fixture, era_flag };
}

/**
 * 满足 aftertrain_sex_check / aftertrain_analsex_check 的共同门槛：
 * 爱/淫乱、性交经验≥30、主人男、存活、对应感觉 ABL 分档。
 */
function satisfy_sex_gates(fixture, { abl_index, abl_value } = {}) {
  fixture.store.set('talent:17:76', 1); // 淫乱
  fixture.store.set('exp:17:5', 35);
  fixture.store.set('talent:0:122', 1); // 魔王男
  fixture.store.set('base:17:0', 1000); // 存活
  if (abl_index !== undefined) {
    fixture.store.set(`abl:17:${abl_index}`, abl_value);
  }
}

test('AFTERTRAIN: aftertrain_sex_check 通常性交与 ABL 判定', async () => {
  const { fixture } = seed_aftertrain_world();
  const { aftertrain_sex_check } = fixture.load_module(
    'event/event-aftertrain',
  );

  // 1. 未满足条件 (无爱/淫乱)
  assert.equal(await aftertrain_sex_check(), 0);

  // 2. 满足条件（测试淫乱 talent:76）
  fixture.store.set('talent:17:76', 1); // 淫乱 (S += 1)
  fixture.store.set('exp:17:5', 35); // 性交经验 >= 30
  fixture.store.set('talent:0:122', 1); // 魔王男
  fixture.store.set('base:17:0', 1000); // 存活
  fixture.store.set('abl:17:2', 4); // V感觉 4 (S += 1)

  const res = await aftertrain_sex_check();
  assert.equal(res, 1);
  // S = 1 (V感觉 4) + 1 (淫乱) = 2 回
  assert.equal(fixture.store.get('exp:17:5'), 37);
  assert.equal(fixture.store.get('exp:17:0'), 2); // 私处经验 EXP:0
  assert.equal(fixture.store.get('juel:17:1'), 400);
  assert.equal(fixture.store.get('tflag:13'), 4); // 源 :231 TFLAG:13 = 4
});

test('AFTERTRAIN: aftertrain_sex_check 逐道门槛负例（只关一道闸，结果就变）', async () => {
  // 每道独立闸单独失效都要把「满足 → 1」变成 0
  const cases = [
    ['未成熟 TALENT:135', (f) => f.store.set('talent:17:135', 1)],
    ['无爱慕无淫乱', (f) => f.store.set('talent:17:76', 0)],
    ['性交经验不足 EXP:5<30', (f) => f.store.set('exp:17:5', 29)],
    ['处女 TALENT:0', (f) => f.store.set('talent:17:0', 1)],
    ['男人 TALENT:122', (f) => f.store.set('talent:17:122', 1)],
    [
      '贞操带 CFLAG:42==79 且 CFLAG:40&64',
      (f) => {
        f.store.set('cflag:17:42', 79);
        f.store.set('cflag:17:40', 64);
      },
    ],
    ['贞操封印 CFLAG:273', (f) => f.store.set('cflag:17:273', 1)],
    [
      '主人非男/扶她',
      (f) => {
        f.store.set('talent:0:122', 0);
        f.store.set('talent:0:121', 0);
      },
    ],
    ['濒死 BASE:0<500', (f) => f.store.set('base:17:0', 499)],
    [
      'S≤0（V感觉 0 + 否定快感 -2 抵消爱慕 +1）',
      (f) => {
        f.store.set('abl:17:2', 0);
        f.store.set('abl:17:30', 0);
        f.store.set('talent:17:71', 1);
        f.store.set('talent:17:76', 0);
        f.store.set('talent:17:85', 1);
      },
    ],
  ];
  for (const [name, mutate] of cases) {
    const { fixture } = seed_aftertrain_world();
    satisfy_sex_gates(fixture, { abl_index: 2, abl_value: 4 });
    mutate(fixture);
    assert.equal(
      await fixture
        .load_module('event/event-aftertrain')
        .aftertrain_sex_check(),
      0,
      `闸「${name}」必须拦下`,
    );
  }
});

test('AFTERTRAIN: aftertrain_sex_check 的 S 计算数值锚', async () => {
  const { fixture } = seed_aftertrain_world();
  const { aftertrain_sex_check } = fixture.load_module(
    'event/event-aftertrain',
  );

  // V感觉 5 → S += 2；淫乱 +1 → S = 3
  satisfy_sex_gates(fixture, { abl_index: 2, abl_value: 5 });
  assert.equal(await aftertrain_sex_check(), 1);
  assert.equal(fixture.store.get('exp:17:5'), 38);
  assert.equal(fixture.store.get('exp:17:0'), 3); // 私处经验
  assert.equal(fixture.store.get('juel:17:1'), 600);
  assert.equal(fixture.store.get('juel:17:4'), 300);
  assert.equal(fixture.store.get('juel:17:5'), 750);
});

test('AFTERTRAIN: aftertrain_sex_check 性交中毒加成', async () => {
  const { fixture } = seed_aftertrain_world();
  const { aftertrain_sex_check } = fixture.load_module(
    'event/event-aftertrain',
  );
  satisfy_sex_gates(fixture, { abl_index: 2, abl_value: 4 });
  fixture.store.set('abl:17:30', 3); // 性交中毒 3 → floor(3/2)+1 = 2
  assert.equal(await aftertrain_sex_check(), 1);
  // S = 1(V4) + 2(中毒) + 1(淫乱) = 4
  assert.equal(fixture.store.get('exp:17:5'), 39);
});

test('AFTERTRAIN: aftertrain_sex_check 欲望+侍奉+欲情 LV4 加成', async () => {
  const { fixture } = seed_aftertrain_world();
  const { aftertrain_sex_check } = fixture.load_module(
    'event/event-aftertrain',
  );
  satisfy_sex_gates(fixture, { abl_index: 2, abl_value: 4 });
  fixture.store.set('abl:17:11', 5);
  fixture.store.set('abl:17:16', 5);
  fixture.store.set('palam:17:5', 10000);
  assert.equal(await aftertrain_sex_check(), 1);
  // S = 1(V4) + 1(淫乱) + 2(欲望5+侍奉5+欲情LV4) + 1(欲望>=4 且 V>=3 且欲情LV3) = 5
  assert.equal(fixture.store.get('exp:17:5'), 40);
});

test('AFTERTRAIN: aftertrain_sex_check 性爱狂/接受快感/爱慕加成', async () => {
  const { fixture } = seed_aftertrain_world();
  const { aftertrain_sex_check } = fixture.load_module(
    'event/event-aftertrain',
  );
  satisfy_sex_gates(fixture, { abl_index: 2, abl_value: 4 });
  fixture.store.set('talent:17:75', 1); // 性爱狂 +2
  fixture.store.set('talent:17:85', 1); // 爱慕 +1
  fixture.store.set('talent:17:70', 1); // 接受快感 +1
  assert.equal(await aftertrain_sex_check(), 1);
  // S = 1(V4) + 1(淫乱) + 2(性爱狂) + 1(爱慕) + 1(接受快感) = 6
  assert.equal(fixture.store.get('exp:17:5'), 41);
});

test('AFTERTRAIN: aftertrain_sex_check 依依不舍分支（顺从+感觉+侍奉≥13）', async () => {
  const { fixture } = seed_aftertrain_world();
  const { aftertrain_sex_check } = fixture.load_module(
    'event/event-aftertrain',
  );
  satisfy_sex_gates(fixture, { abl_index: 2, abl_value: 4 });
  fixture.store.set('abl:17:10', 8); // 顺从 8
  fixture.store.set('abl:17:16', 5); // 侍奉 5 → 8+4+5 = 17 ≥ 13
  await aftertrain_sex_check();
  assert.ok(
    fixture.text_lines().some((l) => l.includes('在依依不舍地拉着魔王的袖子')),
    '顺从+感觉+侍奉 ≥ 13 时必须输出依依不舍分支',
  );
});

test('AFTERTRAIN: aftertrain_analsex_check 肛门性交', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  fixture.seed_chara(0, { name: '魔王', callname: '魔王' });
  fixture.seed_chara(17, { name: '玛奥', callname: '玛奥' });

  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 17;
  era_flag.player = 0;

  const { aftertrain_analsex_check } = fixture.load_module(
    'event/event-aftertrain',
  );

  // 1. 未满足条件
  assert.equal(await aftertrain_analsex_check(), 0);

  // 2. 满足条件
  fixture.store.set('talent:17:76', 1); // 淫乱
  fixture.store.set('exp:17:5', 40);
  fixture.store.set('talent:0:122', 1);
  fixture.store.set('base:17:0', 1000);
  fixture.store.set('abl:17:3', 5); // A感觉 5 (S += 2)

  const res = await aftertrain_analsex_check();
  assert.equal(res, 1);
  // S = 2 (A感觉 5) + 1 (淫乱) = 3 回
  assert.equal(fixture.store.get('exp:17:5'), 43);
  assert.equal(fixture.store.get('juel:17:2'), 600);
});

test('AFTERTRAIN: aftertrain_analsex_check 逐道门槛负例', async () => {
  const cases = [
    ['无爱慕无淫乱', (f) => f.store.set('talent:17:76', 0)],
    ['性交经验不足 EXP:5<30', (f) => f.store.set('exp:17:5', 29)],
    [
      '主人非男/扶她',
      (f) => {
        f.store.set('talent:0:122', 0);
        f.store.set('talent:0:121', 0);
      },
    ],
    ['濒死 BASE:0<500', (f) => f.store.set('base:17:0', 499)],
    [
      'S≤0（A感觉 0 + 否定快感 -2 抵消爱慕 +1）',
      (f) => {
        f.store.set('abl:17:3', 0);
        f.store.set('abl:17:30', 0);
        f.store.set('talent:17:71', 1);
        f.store.set('talent:17:76', 0);
        f.store.set('talent:17:85', 1);
      },
    ],
  ];
  for (const [name, mutate] of cases) {
    const { fixture } = seed_aftertrain_world();
    satisfy_sex_gates(fixture, { abl_index: 3, abl_value: 5 });
    mutate(fixture);
    assert.equal(
      await fixture
        .load_module('event/event-aftertrain')
        .aftertrain_analsex_check(),
      0,
      `闸「${name}」必须拦下`,
    );
  }
});

test('AFTERTRAIN: aftertrain_analsex_check A感觉分档与性交中毒', async () => {
  const { fixture } = seed_aftertrain_world();
  const { aftertrain_analsex_check } = fixture.load_module(
    'event/event-aftertrain',
  );
  satisfy_sex_gates(fixture, { abl_index: 3, abl_value: 4 });
  fixture.store.set('abl:17:30', 1); // 性交中毒 1 → floor(1/2)+1 = 1
  assert.equal(await aftertrain_analsex_check(), 1);
  // S = 1(A4) + 1(中毒) + 1(淫乱) = 3（exp:17:5 从 satisfy 的 35 起加）
  assert.equal(fixture.store.get('exp:17:5'), 38);
  assert.equal(fixture.store.get('exp:17:1'), 3); // 肛门经验
});

test('AFTERTRAIN: aftertrain_lesbiansex_check 百合性交', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  fixture.seed_chara(0, { name: '魔王', callname: '魔王' });
  fixture.seed_chara(17, { name: '玛奥', callname: '玛奥' });
  fixture.seed_chara(1, { name: '助手', callname: '助手' });
  fixture.era.beginTrain(0, 17);

  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 17;
  era_flag.player = 0;
  era_flag.assi = 1;

  const { aftertrain_lesbiansex_check } = fixture.load_module(
    'event/event-aftertrain',
  );

  // 1. 未满足条件 (无百合/无好感)
  assert.equal(await aftertrain_lesbiansex_check(), 0);

  // 2. 满足百合条件（abl:22>=2, abl:0>=3, abl:10>=2, abl:11>=2, 存活）
  fixture.store.set('abl:17:22', 4); // 百合气质 4
  fixture.store.set('abl:17:0', 3); // C感觉 3
  fixture.store.set('abl:17:10', 2); // 顺从 2
  fixture.store.set('abl:17:11', 2); // 欲望 2
  fixture.store.set('abl:17:33', 2); // 百合中毒 2 (n += 2)
  fixture.store.set('abl:1:22', 3); // 助手百合气质 3
  fixture.store.set('base:17:0', 1000);
  fixture.store.set('base:1:0', 1000);
  fixture.store.set('talent:17:81', 1); // 双性恋
  fixture.store.set('talent:1:81', 1);

  const res = await aftertrain_lesbiansex_check(0);
  assert.equal(res, 1);
  assert(fixture.store.get('juel:17:0') > 0);
  assert.equal(fixture.store.get('tflag:13'), 2); // 源 :480 TFLAG:13 = 2
});

test('AFTERTRAIN: aftertrain_lesbiansex_check 逐道门槛负例', async () => {
  const cases = [
    [
      '目标为空 TARGET<0',
      (f, ef) => {
        ef.target = -1;
      },
    ],
    [
      '助手为空 ASSI<0',
      (f, ef) => {
        ef.assi = -1;
      },
    ],
    ['目标是男人 TALENT:122', (f) => f.store.set('talent:17:122', 1)],
    ['助手是男人 TALENT:1:122', (f) => f.store.set('talent:1:122', 1)],
    ['百合气质<2', (f) => f.store.set('abl:17:22', 1)],
    ['C感觉<3', (f) => f.store.set('abl:17:0', 2)],
    ['顺从<2', (f) => f.store.set('abl:17:10', 1)],
    ['欲望<2', (f) => f.store.set('abl:17:11', 1)],
    [
      '双方百合中毒都是 0',
      (f) => {
        f.store.set('abl:17:33', 0);
        f.store.set('abl:1:33', 0);
      },
    ],
    ['濒死 BASE:0<500', (f) => f.store.set('base:17:0', 499)],
    [
      'N≤0（百合中毒 1 + 保守 -1 + 戒备森严 -1）',
      (f) => {
        f.store.set('abl:17:33', 1);
        f.store.set('abl:1:33', 0);
        f.store.set('talent:17:24', 1);
        f.store.set('talent:17:27', 1);
      },
    ],
  ];
  const base_setup = (f) => {
    f.store.set('abl:17:22', 4);
    f.store.set('abl:17:0', 3);
    f.store.set('abl:17:10', 2);
    f.store.set('abl:17:11', 2);
    f.store.set('abl:17:33', 2);
    f.store.set('abl:1:22', 3);
    f.store.set('base:17:0', 1000);
    f.store.set('base:1:0', 1000);
  };
  for (const [name, mutate] of cases) {
    const { fixture, era_flag } = seed_aftertrain_world({ assi: 1 });
    base_setup(fixture);
    mutate(fixture, era_flag);
    assert.equal(
      await fixture
        .load_module('event/event-aftertrain')
        .aftertrain_lesbiansex_check(0),
      0,
      `闸「${name}」必须拦下`,
    );
  }
});

test('AFTERTRAIN: aftertrain_lesbiansex_check N 计算与相性乘算', async () => {
  const { fixture } = seed_aftertrain_world({ assi: 1 });
  const { aftertrain_lesbiansex_check } = fixture.load_module(
    'event/event-aftertrain',
  );
  fixture.store.set('abl:17:22', 4);
  fixture.store.set('abl:17:0', 3);
  fixture.store.set('abl:17:10', 2);
  fixture.store.set('abl:17:11', 2);
  fixture.store.set('abl:17:33', 2); // 目标百合中毒 2 → n=2
  fixture.store.set('abl:1:33', 3); // 助手百合中毒 3 → n+=5 → n=7
  fixture.store.set('base:17:0', 1000);
  fixture.store.set('base:1:0', 1000);
  fixture.store.set('relation:17:1', 200); // 相性 200 → n = floor(7*200/100) = 14
  assert.equal(await aftertrain_lesbiansex_check(0), 1);
  assert.equal(fixture.store.get('exp:17:40'), 14 * 20); // 百合经验 n*20
  assert.equal(fixture.store.get('exp:17:2'), Math.floor((14 * 100 * 2) / 500)); // 绝顶经验
  assert.equal(fixture.store.get('juel:17:0'), 14 * 100 * 2); // 快C
  assert.equal(fixture.store.get('juel:17:5'), 14 * 200); // 欲情
});

test('AFTERTRAIN: aftertrain_lesbiansex_check 保守/戒备森严扣减与双性恋/淫乱加成', async () => {
  const { fixture } = seed_aftertrain_world({ assi: 1 });
  const { aftertrain_lesbiansex_check } = fixture.load_module(
    'event/event-aftertrain',
  );
  fixture.store.set('abl:17:22', 4);
  fixture.store.set('abl:17:0', 3);
  fixture.store.set('abl:17:10', 2);
  fixture.store.set('abl:17:11', 2);
  fixture.store.set('abl:17:33', 2); // n=2
  fixture.store.set('abl:1:33', 2); // n+=2 → n=4
  fixture.store.set('base:17:0', 1000);
  fixture.store.set('base:1:0', 1000);
  fixture.store.set('talent:17:24', 1); // 保守 -1
  fixture.store.set('talent:1:27', 1); // 戒备森严 -1
  fixture.store.set('talent:17:81', 1); // 双性恋 +2
  fixture.store.set('talent:1:76', 1); // 淫乱 +1
  assert.equal(await aftertrain_lesbiansex_check(0), 1);
  // n = 2+2-1-1+2+1 = 5
  assert.equal(fixture.store.get('exp:17:40'), 5 * 20);
});

test('AFTERTRAIN: aftertrain_lesbiansex_check sex_result=1 前缀与助手扶她分支', async () => {
  const { fixture } = seed_aftertrain_world({ assi: 1 });
  const { aftertrain_lesbiansex_check } = fixture.load_module(
    'event/event-aftertrain',
  );
  fixture.store.set('abl:17:22', 4);
  fixture.store.set('abl:17:0', 3);
  fixture.store.set('abl:17:10', 2);
  fixture.store.set('abl:17:11', 2);
  fixture.store.set('abl:17:33', 2);
  fixture.store.set('abl:1:33', 1); // n+=1
  fixture.store.set('base:17:0', 1000);
  fixture.store.set('base:1:0', 1000);
  fixture.store.set('abl:17:12', 3); // 技巧
  fixture.store.set('abl:17:16', 4); // 侍奉
  fixture.store.set('talent:1:121', 1); // 助手扶她
  assert.equal(await aftertrain_lesbiansex_check(1), 1);
  const texts = fixture.text_lines();
  assert.ok(
    texts.some((l) => l.includes('魔王出去之后，')),
    'sex_result=1 必须用「魔王出去之后」前缀',
  );
  assert.equal(fixture.store.get('exp:17:20'), 3); // 精液经验 n*1 (n=3)
  assert.equal(fixture.store.get('juel:17:6'), 3 * 100 * (3 + 4)); // 屈服点数
  assert.equal(fixture.store.get('juel:17:7'), 3 * 100 * (3 + 4)); // 习得点数
});

test('AFTERTRAIN: aftertrain_lesbiansex_check 助手抖S 与目标扶她分支', async () => {
  const { fixture } = seed_aftertrain_world({ assi: 1 });
  const { aftertrain_lesbiansex_check } = fixture.load_module(
    'event/event-aftertrain',
  );
  fixture.store.set('abl:17:22', 4);
  fixture.store.set('abl:17:0', 3);
  fixture.store.set('abl:17:10', 2);
  fixture.store.set('abl:17:11', 2);
  fixture.store.set('abl:17:33', 2);
  fixture.store.set('abl:1:33', 1);
  fixture.store.set('base:17:0', 1000);
  fixture.store.set('base:1:0', 1000);
  fixture.store.set('abl:17:21', 2); // 抖M
  fixture.store.set('talent:1:83', 1); // 助手抖S
  fixture.store.set('talent:17:121', 1); // 目标扶她
  assert.equal(await aftertrain_lesbiansex_check(0), 1);
  assert.equal(fixture.store.get('exp:17:30'), 3); // 被虐快乐经验
  assert.equal(fixture.store.get('juel:17:9'), 3 * 100 * 2); // 苦痛点数
  assert.equal(fixture.store.get('exp:17:3'), 3); // 射精经验
  assert.equal(fixture.store.get('juel:17:8'), 3 * 100); // 耻情点数
});

test('AFTERTRAIN: aftertrain_lesbiansex_check 双扶她吮吸分支（TIME 分支）', async () => {
  const { fixture, era_flag } = seed_aftertrain_world({ assi: 1 });
  const { aftertrain_lesbiansex_check } = fixture.load_module(
    'event/event-aftertrain',
  );
  fixture.store.set('abl:17:22', 4);
  fixture.store.set('abl:17:0', 3);
  fixture.store.set('abl:17:10', 2);
  fixture.store.set('abl:17:11', 2);
  fixture.store.set('abl:17:33', 2);
  fixture.store.set('abl:1:33', 1);
  fixture.store.set('base:17:0', 1000);
  fixture.store.set('base:1:0', 1000);
  fixture.store.set('abl:17:16', 3); // 侍奉 >= 3
  fixture.store.set('abl:17:32', 3); // 口交 >= 3
  fixture.store.set('talent:17:121', 1);
  fixture.store.set('talent:1:121', 1);
  era_flag.time = 0;
  await aftertrain_lesbiansex_check(0);
  assert.ok(
    fixture
      .text_lines()
      .some((l) => l.includes('从早到晚都在吮吸着彼此的阴茎')),
  );
  assert.equal(fixture.store.get('exp:17:21'), 3); // 侍奉快乐经验
  assert.equal(fixture.store.get('exp:17:22'), 3); // 口交经验
});

test('AFTERTRAIN: aftertrain_masturbation_check 自慰检查', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  fixture.seed_chara(0, { name: '魔王', callname: '魔王' });
  fixture.seed_chara(17, { name: '玛奥', callname: '玛奥' });
  fixture.era.beginTrain(0, 17);

  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 17;
  era_flag.player = 0;
  era_flag.assi = -1;

  const { aftertrain_masturbation_check } = fixture.load_module(
    'event/event-aftertrain',
  );

  // 1. 欲望不足 (abl:11 < 2) 时不自慰
  fixture.store.set('abl:17:0', 3); // C感觉 3
  fixture.store.set('abl:17:11', 1); // 欲望 1
  fixture.store.set('abl:17:31', 2); // 自慰中毒 2
  fixture.store.set('base:17:0', 1000);
  assert.equal(await aftertrain_masturbation_check(0, 0, () => 0), 0);

  // 2. 满足自慰条件 (欲望 2)
  fixture.store.set('abl:17:11', 2); // 欲望 2
  fixture.store.set('abl:17:31', 2); // 自慰中毒 2 (A += 2)

  const res = await aftertrain_masturbation_check(0, 0, () => 0);
  assert.equal(res, 1);
  assert.equal(fixture.store.get('exp:17:10'), 2);
  assert.equal(fixture.store.get('tflag:13'), 1); // 源 :669 TFLAG:13 = 1
});

test('AFTERTRAIN: aftertrain_masturbation_check 逐道门槛负例', async () => {
  const cases = [
    ['阴蒂感觉<3', (f) => f.store.set('abl:17:0', 2)],
    ['欲望<2', (f) => f.store.set('abl:17:11', 1)],
    ['从不自慰 TALENT:150', (f) => f.store.set('talent:17:150', 1)],
    ['濒死 BASE:0<500', (f) => f.store.set('base:17:0', 499)],
    [
      'A≤0（自慰中毒 0 + 自制心 -1）',
      (f) => {
        f.store.set('abl:17:31', 0);
        f.store.set('talent:17:20', 1);
      },
    ],
  ];
  const base_setup = (f) => {
    f.store.set('abl:17:0', 3);
    f.store.set('abl:17:11', 2);
    f.store.set('abl:17:31', 2);
    f.store.set('base:17:0', 1000);
  };
  for (const [name, mutate] of cases) {
    const { fixture } = seed_aftertrain_world();
    base_setup(fixture);
    mutate(fixture);
    assert.equal(
      await fixture
        .load_module('event/event-aftertrain')
        .aftertrain_masturbation_check(0, 0, () => 0),
      0,
      `闸「${name}」必须拦下`,
    );
  }
});

test('AFTERTRAIN: aftertrain_masturbation_check 自慰次数档位与加成', async () => {
  const { fixture } = seed_aftertrain_world();
  const { aftertrain_masturbation_check } = fixture.load_module(
    'event/event-aftertrain',
  );
  fixture.store.set('abl:17:0', 3);
  fixture.store.set('abl:17:11', 2);
  fixture.store.set('abl:17:31', 3); // 自慰中毒 3 → a=4
  fixture.store.set('base:17:0', 1000);
  fixture.store.set('talent:17:74', 1); // 自慰狂 → ×1.5
  fixture.store.set('talent:17:33', 1); // 开放 +1
  fixture.store.set('talent:17:70', 1); // 接受快感 +1
  fixture.store.set('talent:17:76', 1); // 淫乱 +1
  assert.equal(await aftertrain_masturbation_check(0, 0, () => 0), 1);
  // a = 4(自慰中毒3) ×1.5(自慰狂) = 6；再加 33/70/76 各 +1 → 9
  assert.equal(fixture.store.get('exp:17:10'), 9);
});

test('AFTERTRAIN: aftertrain_masturbation_check 妄想对象 q=1 助手分支', async () => {
  const { fixture } = seed_aftertrain_world({ assi: 1 });
  const { aftertrain_masturbation_check } = fixture.load_module(
    'event/event-aftertrain',
  );
  fixture.store.set('abl:17:0', 3);
  fixture.store.set('abl:17:11', 2);
  fixture.store.set('abl:17:31', 2);
  fixture.store.set('abl:17:22', 4); // 百合气质
  fixture.store.set('abl:17:33', 3); // 百合中毒 3（触发「无法填满对助手的欲望」）
  fixture.store.set('base:17:0', 1000);
  const res = await aftertrain_masturbation_check(0, 1, () => 2);
  assert.equal(res, 1);
  assert.ok(
    fixture.text_lines().some((l) => l.includes('好像一边想着助手，一边自慰')),
  );
  assert.ok(
    fixture.text_lines().some((l) => l.includes('也无法填满对助手的欲望')),
  );
});

test('AFTERTRAIN: aftertrain_masturbation_check 妄想对象 q=2 野狗分支', async () => {
  const { fixture } = seed_aftertrain_world();
  const { aftertrain_masturbation_check } = fixture.load_module(
    'event/event-aftertrain',
  );
  fixture.store.set('abl:17:0', 3);
  fixture.store.set('abl:17:11', 2);
  fixture.store.set('abl:17:31', 2);
  fixture.store.set('abl:17:39', 4); // 兽奸中毒
  fixture.store.set('item:22', 1); // 野狗
  fixture.store.set('base:17:0', 1000);
  // 无爱慕 + abl39 > rand(5) + 有野狗 → q=2
  const res = await aftertrain_masturbation_check(0, 0, () => 2);
  assert.equal(res, 1);
  assert.ok(
    fixture.text_lines().some((l) => l.includes('好像一边妄想着与野狗交配')),
  );
  assert.ok(
    fixture.text_lines().some((l) => l.includes('也无法填满对兽交的欲望')),
  );
});

test('AFTERTRAIN: aftertrain_masturbation_check 妄想对象 q=0 主人分支', async () => {
  const { fixture } = seed_aftertrain_world();
  const { aftertrain_masturbation_check } = fixture.load_module(
    'event/event-aftertrain',
  );
  fixture.store.set('abl:17:0', 3);
  fixture.store.set('abl:17:11', 2);
  fixture.store.set('abl:17:31', 2);
  fixture.store.set('base:17:0', 1000);
  const res = await aftertrain_masturbation_check(0, 0, () => 2);
  assert.equal(res, 1);
  assert.ok(
    fixture.text_lines().some((l) => l.includes('好像一边想着魔王，一边自慰')),
  );
});

test('AFTERTRAIN: leftover_q 把妄想对象交给 SELF_KOJO', async () => {
  const { fixture } = seed_aftertrain_world({ assi: 1 });
  const { aftertrain_masturbation_check, peek_aftertrain_q } =
    fixture.load_module('event/event-aftertrain');
  fixture.store.set('abl:17:0', 3);
  fixture.store.set('abl:17:11', 2);
  fixture.store.set('abl:17:31', 2);
  fixture.store.set('abl:17:22', 4);
  fixture.store.set('base:17:0', 1000);
  await aftertrain_masturbation_check(0, 1, () => 2);
  assert.equal(peek_aftertrain_q(), 1, 'q=1 助手分支必须写入 leftover_q');
});

test('AFTERTRAIN: leftover_s 把回数交给 SELF_KOJO', async () => {
  const { fixture } = seed_aftertrain_world();
  const { aftertrain_sex_check, peek_aftertrain_s } = fixture.load_module(
    'event/event-aftertrain',
  );
  satisfy_sex_gates(fixture, { abl_index: 2, abl_value: 5 });
  await aftertrain_sex_check();
  assert.equal(peek_aftertrain_s(), 3, 'S=3 必须写入 leftover_s');

  fixture.store.set('talent:17:76', 0);
  fixture.store.set('talent:17:85', 0);
  assert.equal(await aftertrain_sex_check(), 0);
  assert.equal(peek_aftertrain_s(), 0, '门槛未过必须清 leftover_s');
});

test('AFTERTRAIN: aftertrain_masturbation_check 男人阴茎点数分支', async () => {
  const { fixture } = seed_aftertrain_world();
  const { aftertrain_masturbation_check } = fixture.load_module(
    'event/event-aftertrain',
  );
  fixture.store.set('abl:17:0', 3);
  fixture.store.set('abl:17:11', 2);
  fixture.store.set('abl:17:31', 2);
  fixture.store.set('talent:17:122', 1); // 男人
  fixture.store.set('base:17:0', 1000);
  await aftertrain_masturbation_check(0, 0, () => 0);
  assert.ok(fixture.text_lines().some((l) => l.includes('阴茎点数＋')));
});

test('AFTERTRAIN: aftertrain_masturbation_check 报告分支（顺从+露出+抖M≥10 且朝）', async () => {
  const { fixture, era_flag } = seed_aftertrain_world();
  const { aftertrain_masturbation_check } = fixture.load_module(
    'event/event-aftertrain',
  );
  fixture.store.set('abl:17:0', 3);
  fixture.store.set('abl:17:11', 2);
  fixture.store.set('abl:17:31', 2);
  fixture.store.set('abl:17:10', 5);
  fixture.store.set('abl:17:17', 5);
  fixture.store.set('abl:17:21', 5);
  fixture.store.set('base:17:0', 1000);
  era_flag.time = 0; // 朝
  await aftertrain_masturbation_check(0, 0, () => 0);
  assert.ok(fixture.text_lines().some((l) => l.includes('来报告了')));
  assert.equal(fixture.store.get('juel:17:8'), 2 * 200); // 耻情点数
});

test('AFTERTRAIN: aftertrain_beastsex_check 兽奸检查', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  fixture.seed_chara(0, { name: '魔王', callname: '魔王' });
  fixture.seed_chara(17, { name: '玛奥', callname: '玛奥' });

  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 17;
  era_flag.player = 0;

  const { aftertrain_beastsex_check } = fixture.load_module(
    'event/event-aftertrain',
  );

  // 1. 未满足条件 (无经验/无道具)
  assert.equal(await aftertrain_beastsex_check(), 0);

  // 2. 满足兽奸条件
  fixture.store.set('exp:17:56', 60); // 兽奸经验 >= 50
  fixture.store.set('item:22', 1); // 狗
  fixture.store.set('base:17:0', 1000);
  fixture.store.set('abl:17:39', 3); // 兽奸中毒 3
  fixture.store.set('talent:17:124', 1); // 动物耳
  fixture.store.set('palam:17:5', 5000);

  const res = await aftertrain_beastsex_check();
  assert.equal(res, 1);
  assert(fixture.store.get('exp:17:56') > 60);
});

test('AFTERTRAIN: aftertrain_beastsex_check 逐道门槛负例', async () => {
  const cases = [
    ['未成熟 TALENT:135', (f) => f.store.set('talent:17:135', 1)],
    ['兽奸经验不足 EXP:56<50', (f) => f.store.set('exp:17:56', 49)],
    ['处女 TALENT:0', (f) => f.store.set('talent:17:0', 1)],
    ['男人 TALENT:122', (f) => f.store.set('talent:17:122', 1)],
    [
      '贞操带 CFLAG:42==79 且 CFLAG:40&64',
      (f) => {
        f.store.set('cflag:17:42', 79);
        f.store.set('cflag:17:40', 64);
      },
    ],
    ['贞操封印 CFLAG:273', (f) => f.store.set('cflag:17:273', 1)],
    ['无野狗 ITEM:22==0', (f) => f.store.set('item:22', 0)],
    ['濒死 BASE:0<500', (f) => f.store.set('base:17:0', 499)],
    [
      'B≤0（兽奸中毒 0 → -2 + 高姿态 -1 + 克制 -1）',
      (f) => {
        f.store.set('abl:17:39', 0);
        f.store.set('talent:17:15', 1);
        f.store.set('talent:17:20', 1);
      },
    ],
  ];
  const base_setup = (f) => {
    f.store.set('exp:17:56', 60);
    f.store.set('item:22', 1);
    f.store.set('base:17:0', 1000);
    f.store.set('abl:17:39', 3);
    f.store.set('palam:17:5', 5000);
  };
  for (const [name, mutate] of cases) {
    const { fixture } = seed_aftertrain_world();
    base_setup(fixture);
    mutate(fixture);
    assert.equal(
      await fixture
        .load_module('event/event-aftertrain')
        .aftertrain_beastsex_check(),
      0,
      `闸「${name}」必须拦下`,
    );
  }
});

test('AFTERTRAIN: aftertrain_beastsex_check 兽奸次数与牝犬加成', async () => {
  const { fixture } = seed_aftertrain_world();
  const { aftertrain_beastsex_check } = fixture.load_module(
    'event/event-aftertrain',
  );
  fixture.store.set('exp:17:56', 60);
  fixture.store.set('item:22', 1);
  fixture.store.set('base:17:0', 1000);
  fixture.store.set('abl:17:39', 3); // b += 1
  fixture.store.set('talent:17:124', 1); // +1（动物耳条件后）
  fixture.store.set('talent:17:136', 1); // 牝犬 +2 且 ×1.5
  fixture.store.set('palam:17:5', 3000);
  fixture.store.set('abl:17:11', 3); // 动物耳条件 ABL:11>=3
  await aftertrain_beastsex_check();
  // b = (1 + 2) * 1.5 = 4.5 → floor = 4；124 的后置 +1 → 5
  // 顺序：中毒 1 + 牝犬 2 = 3；动物耳条件 +1 = 4；后置 124 +1 = 5；牝犬 ×1.5 → floor(5*1.5) = 7
  assert.equal(fixture.store.get('exp:17:56'), 67);
});

test('AFTERTRAIN: aftertrain_beastsex_check 报告分支（顺从+露出+抖M≥12 且朝）', async () => {
  const { fixture, era_flag } = seed_aftertrain_world();
  const { aftertrain_beastsex_check } = fixture.load_module(
    'event/event-aftertrain',
  );
  fixture.store.set('exp:17:56', 60);
  fixture.store.set('item:22', 1);
  fixture.store.set('base:17:0', 1000);
  fixture.store.set('abl:17:39', 3);
  fixture.store.set('talent:17:124', 1);
  fixture.store.set('palam:17:5', 5000);
  fixture.store.set('abl:17:10', 5);
  fixture.store.set('abl:17:17', 5);
  fixture.store.set('abl:17:21', 5);
  era_flag.time = 0;
  await aftertrain_beastsex_check();
  assert.ok(
    fixture.text_lines().some((l) => l.includes('摇着尾巴，')),
    '动物耳目标报告时必须有「摇着尾巴」',
  );
  assert.ok(fixture.text_lines().some((l) => l.includes('来报告了')));
  // 第一次 juel:8 += B*200；第二次源 :837 用 A*200。单独调用兽奸时
  // leftover_a = 0（跨模块残留不建模），故二次累加为 0。
  // B = 中毒 3→+1 + 动物耳后置 +1 = 2；第一次 +400，第二次 +0 → 400。
  assert.equal(fixture.store.get('juel:17:8'), 400);
});

test('AFTERTRAIN: self_check 失神跳过守卫与五条派发臂', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  fixture.seed_chara(0, { name: '魔王', callname: '魔王' });
  fixture.seed_chara(17, { name: '玛奥', callname: '玛奥' });
  fixture.era.beginTrain(0, 17);

  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 17;
  era_flag.player = 0;

  const { self_check } = fixture.load_module('event/event-aftertrain');

  // 1. 失神守卫 TFLAG:899 >= 1
  fixture.store.set('tflag:899', 1);
  assert.equal(await self_check(), 0);

  // 2. 正常无行为
  fixture.store.set('tflag:899', 0);
  assert.equal(await self_check(), 0);
  // 3. 触发 self_check 内的通常性交与自慰
  fixture.store.set('talent:17:76', 1);
  fixture.store.set('exp:17:5', 35);
  fixture.store.set('talent:0:122', 1);
  fixture.store.set('base:17:0', 1000);
  fixture.store.set('abl:17:2', 4);
  fixture.store.set('abl:17:0', 3);
  fixture.store.set('abl:17:11', 2);
  fixture.store.set('abl:17:31', 2);
  const self_res = await self_check();
  assert.equal(self_res, 0); // self_check 返回 0，但内部执行了派发
  assert.equal(fixture.store.get('exp:17:5'), 37); // sex_check 增加性交经验
  assert.equal(fixture.store.get('exp:17:10'), 3); // masturbation_check 增加自慰经验 (abl:31=2 -> a=2 + talent:76 淫乱 a+=1 -> a=3)
});

test('AFTERTRAIN: self_check 失神守卫——满足全部条件也不得执行任何派发', async () => {
  const { fixture } = seed_aftertrain_world();
  const { self_check } = fixture.load_module('event/event-aftertrain');
  // 全部条件满足（性交 + 自慰都会执行）
  fixture.store.set('talent:17:76', 1);
  fixture.store.set('exp:17:5', 35);
  fixture.store.set('talent:0:122', 1);
  fixture.store.set('base:17:0', 1000);
  fixture.store.set('abl:17:2', 4);
  fixture.store.set('abl:17:0', 3);
  fixture.store.set('abl:17:11', 2);
  fixture.store.set('abl:17:31', 2);
  fixture.store.set('tflag:899', 1); // 失神
  const res = await self_check(() => 0);
  assert.equal(res, 0);
  assert.equal(
    fixture.store.get('exp:17:5'),
    35,
    '失神时不得执行性交（exp:5 必须保持原值）',
  );
  assert.equal(
    fixture.store.get('exp:17:10'),
    undefined,
    '失神时不得执行自慰（exp:10 不能出现）',
  );
});

test('AFTERTRAIN: self_check 派发——男人 TALENT:122 → 肛门', async () => {
  const { fixture } = seed_aftertrain_world();
  const { self_check } = fixture.load_module('event/event-aftertrain');
  fixture.store.set('talent:17:122', 1); // 男人
  fixture.store.set('talent:17:85', 1); // 爱慕
  fixture.store.set('exp:17:5', 35);
  fixture.store.set('talent:0:122', 1);
  fixture.store.set('base:17:0', 1000);
  fixture.store.set('abl:17:3', 4); // A感觉 4 → S=1
  await self_check(() => 0);
  assert.ok(
    fixture.text_lines().some((l) => l.includes('A经验＋')),
    '男人必须走肛门分支',
  );
  assert.equal(fixture.store.get('exp:17:1'), 2); // S = 1(A4)+1(爱慕) = 2
});

test('AFTERTRAIN: self_check 派发——女人且 V感觉<A感觉 → 肛门', async () => {
  const { fixture } = seed_aftertrain_world();
  const { self_check } = fixture.load_module('event/event-aftertrain');
  fixture.store.set('talent:17:85', 1); // 爱慕
  fixture.store.set('exp:17:5', 35);
  fixture.store.set('talent:0:122', 1);
  fixture.store.set('base:17:0', 1000);
  fixture.store.set('abl:17:2', 1); // V感觉 1
  fixture.store.set('abl:17:3', 4); // A感觉 4 → V<A → 肛门
  await self_check(() => 0);
  assert.ok(fixture.text_lines().some((l) => l.includes('A经验＋')));
  assert.equal(fixture.store.get('exp:17:1'), 2);
});

test('AFTERTRAIN: self_check 派发——处女且 A感觉≥3 → 肛门（即使 V≥A）', async () => {
  const { fixture } = seed_aftertrain_world();
  const { self_check } = fixture.load_module('event/event-aftertrain');
  fixture.store.set('talent:17:0', 1); // 处女
  fixture.store.set('talent:17:85', 1);
  fixture.store.set('exp:17:5', 35);
  fixture.store.set('talent:0:122', 1);
  fixture.store.set('base:17:0', 1000);
  fixture.store.set('abl:17:2', 5); // V感觉 5 ≥ A感觉
  fixture.store.set('abl:17:3', 4); // A感觉 4 → 处女且 A≥3 → 肛门
  await self_check(() => 0);
  assert.ok(fixture.text_lines().some((l) => l.includes('A经验＋')));
  assert.equal(fixture.store.get('exp:17:1'), 2);
});

test('AFTERTRAIN: self_check 派发——其余（非男非处女且 V≥A）→ 性交', async () => {
  const { fixture } = seed_aftertrain_world();
  const { self_check } = fixture.load_module('event/event-aftertrain');
  fixture.store.set('talent:17:85', 1); // 爱慕
  fixture.store.set('exp:17:5', 35);
  fixture.store.set('talent:0:122', 1);
  fixture.store.set('base:17:0', 1000);
  fixture.store.set('abl:17:2', 4); // V感觉 4 ≥ A感觉
  fixture.store.set('abl:17:3', 2); // A感觉 2
  await self_check(() => 0);
  assert.ok(fixture.text_lines().some((l) => l.includes('V经验＋')));
  assert.equal(fixture.store.get('exp:17:0'), 2); // 私处经验 EXP:0
  assert.equal(fixture.store.get('exp:17:5'), 37); // S = 1(V4)+1(爱慕) = 2
  assert.equal(fixture.store.get('tflag:13'), 4);
});

test('AFTERTRAIN: self_check 逆强暴复位与目标为空守卫', async () => {
  const { fixture, era_flag } = seed_aftertrain_world();
  const { self_check } = fixture.load_module('event/event-aftertrain');
  fixture.store.set('cflag:0:61', 1); // 逆强暴标志
  await self_check(() => 0);
  assert.equal(fixture.store.get('cflag:0:61'), 0, '逆强暴标志必须复位');

  era_flag.target = -1;
  assert.equal(await self_check(() => 0), 0, '目标为空直接返回 0');
});

test('AFTERTRAIN: 兽奸报告二次累加 A≠B 时按自慰回数而非兽奸回数（#270）', async () => {
  const { fixture, era_flag } = seed_aftertrain_world();
  const { aftertrain_masturbation_check, aftertrain_beastsex_check } =
    fixture.load_module('event/event-aftertrain');

  fixture.store.set('abl:17:0', 3);
  fixture.store.set('abl:17:11', 2);
  fixture.store.set('abl:17:31', 5); // A += 9
  fixture.store.set('base:17:0', 1000);
  era_flag.time = 0;
  assert.equal(await aftertrain_masturbation_check(0, 0, () => 0), 1);
  assert.equal(fixture.store.get('exp:17:10'), 9);

  fixture.store.set('exp:17:56', 60);
  fixture.store.set('item:22', 1);
  fixture.store.set('abl:17:39', 3); // B += 1
  fixture.store.set('talent:17:124', 1); // 后置 +1 → B = 2
  fixture.store.set('palam:17:5', 5000);
  fixture.store.set('abl:17:10', 5);
  fixture.store.set('abl:17:17', 5);
  fixture.store.set('abl:17:21', 5);
  await aftertrain_beastsex_check();

  // 第一次 += B*200 = 400；第二次 += A*200 = 1800 → 2200。
  // 若误写成 B*200，会得到 800。反向变异「改成 b 即红」落在这里。
  assert.equal(fixture.store.get('juel:17:8'), 2 * 200 + 9 * 200);
});
