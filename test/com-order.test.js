/**
 * ere/system/train/com-order.js 的行为测试（issue #214：@COM_ORDER）。
 *
 * 明细行形态的第一断言锚在 golden train-natural-log:169 的实行值判定行
 * 前半（COM_ORDER 的贡献段）：「顺从LV1(4) + 抖M气质LV3(6) + 苦痛刻印
 * LV1(5) + 屈服刻印LV2(12) - 反抗刻印LV1(4)」——该行的后半（欲望/快乐
 * 刻印/欲情）归调用方 COMF6（族票），不在本文件账上。
 *
 * 缝 = test/helpers/era-fixture.js（名字表与角色表按需播种——夹具不装
 * 静态数据表，name_of 读空时串里缺名，断言也随之暴露）。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

/** 播种温妮（31）为调教对象、你（0）为调教者，返回 { com_order, era_flag } */
function load_order(fixture) {
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  fixture.seed_chara(31, { id: 31, name: '温妮', callname: '温妮' });
  fixture.era.addCharacter(31);
  // palam 是调教期表（三段寻址守卫）：先开火车表，播种的参数值才可读
  fixture.era.beginTrain(0, 31);
  fixture.store.set('flag:10005', 31); // TARGET
  fixture.store.set('flag:10008', 0); // PLAYER
  const { com_order } = fixture.load_module('system/train/com-order');
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.player = 0;
  return { com_order, era_flag };
}

/** 名字表播种（Mark/Talent/Abl/Palam 的关键序号——夹具不装静态表） */
function seed_names(fixture) {
  for (const [id, name] of [
    [10, '顺从'],
    [21, '抖M气质'],
    [22, '百合气质'],
    [33, '百合中毒'],
    [11, '欲望'],
  ]) {
    fixture.store.set(`ablname:${id}`, name);
  }
  for (const [id, name] of [
    [0, '苦痛刻印'],
    [1, '快乐刻印'],
    [2, '屈服刻印'],
    [3, '反抗刻印'],
  ]) {
    fixture.store.set(`markname:${id}`, name);
  }
  for (const [id, name] of [
    [4, '恭顺'],
    [5, '欲情'],
    [10, '恐怖'],
  ]) {
    fixture.store.set(`palamname:${id}`, name);
  }
}

test('golden 实证形态：判定行的 COM_ORDER 段逐字（train-natural-log:169）', async () => {
  const fixture = create_era_fixture();
  seed_names(fixture);
  const { com_order } = load_order(fixture);
  // replay 播种同源的状态（golden 反解）：顺从1 / 抖M3 / 苦痛刻印1 /
  // 屈服刻印2 / 反抗刻印1；主人是男人（TALENT:0:122）→ 百合段不进
  fixture.store.set('talent:0:122', 1);
  fixture.store.set('abl:31:10', 1);
  fixture.store.set('abl:31:21', 3);
  fixture.store.set('mark:31:0', 1);
  fixture.store.set('mark:31:2', 2);
  fixture.store.set('mark:31:3', 1);

  const { a, s } = await com_order(0, 0);

  assert.equal(
    fixture.text_lines().join(''),
    '顺从LV1(4) + 抖M气质LV3(6) + 苦痛刻印LV1(5) + 屈服刻印LV2(12) - 反抗刻印LV1(4)',
    '明细行逐字（含首项无分隔、反抗刻印的行首 " - "——源码不查 S）',
  );
  assert.equal(a, 4 + 6 + 5 + 12 - 4);
  assert.equal(s, 1);
});

test('首项为负（反抗心）：行首带 " - "，无前置 " + "（:182-188 不查 S）', async () => {
  const fixture = create_era_fixture();
  seed_names(fixture);
  fixture.store.set('talentname:11', '反抗心');
  const { com_order } = load_order(fixture);
  fixture.store.set('talent:31:11', 1); // 反抗心，其余全空

  const { a } = await com_order(0, 0);

  assert.equal(fixture.text_lines().join(''), ' - 反抗心(5)');
  assert.equal(a, -5);
});

test('百合段两态：双方皆女才进（:28），好奇心/保守的取值随分支（:57-90）', async () => {
  // 皆女（TALENT:PLAYER:122 与 TALENT:TARGET:122 均 0）→ 百合段生效
  {
    const fixture = create_era_fixture();
    seed_names(fixture);
    fixture.store.set('talentname:81', '双性恋');
    fixture.store.set('talentname:23', '好奇心');
    fixture.store.set('talentname:24', '保守的');
    const { com_order } = load_order(fixture);
    fixture.store.set('abl:31:22', 2); // 百合气质 ×3
    fixture.store.set('talent:31:81', 1); // 双性恋 +10
    fixture.store.set('talent:31:23', 1); // 好奇心 +7（百合分支值）
    fixture.store.set('talent:31:24', 1); // 保守的 -13（百合分支值）

    const { a } = await com_order(0, 0);

    // 好奇心段 SIF S 打 " + "、保守的段（无 SIF）打 " - "——两个分隔都输出
    assert.equal(
      fixture.text_lines().join(''),
      '百合气质LV2(6) + 双性恋(10) + 好奇心(7) - 保守的(13)',
    );
    assert.equal(a, 6 + 10 + 7 - 13);
  }
  // 调教者是男人（replay/golden 同款）→ ELSE 分支：好奇心 +5、保守的 -10
  {
    const fixture = create_era_fixture();
    seed_names(fixture);
    fixture.store.set('talentname:23', '好奇心');
    fixture.store.set('talentname:24', '保守的');
    const { com_order } = load_order(fixture);
    fixture.store.set('talent:0:122', 1); // PLAYER 是男人
    fixture.store.set('talent:31:22', 2); // 百合气质：ELSE 分支不读
    fixture.store.set('talent:31:23', 1);
    fixture.store.set('talent:31:24', 1);

    const { a } = await com_order(0, 0);

    assert.equal(fixture.text_lines().join(''), '好奇心(5) - 保守的(10)');
    assert.equal(a, 5 - 10, '百合气质不得计入（ELSE 分支）');
  }
});

test('刻印 T 系数：高姿态(15)→4 / 低姿态(17)→1 / 皆无→2（:105-111）', async () => {
  // 15/17 号同时在素质段贡献（:206 高姿态 -15 / :214 低姿态 +5），
  // 期望值两项都算（源码两处都用，非笔误）
  for (const [t15, t17, factor] of [
    [1, 0, 4],
    [0, 1, 1],
    [0, 0, 2],
  ]) {
    const fixture = create_era_fixture();
    seed_names(fixture);
    const { com_order } = load_order(fixture);
    fixture.store.set('mark:31:2', 1); // 屈服刻印 ×3×T
    fixture.store.set('mark:31:3', 1); // 反抗刻印 ×2×T
    if (t15) fixture.store.set('talent:31:15', 1);
    if (t17) fixture.store.set('talent:31:17', 1);

    const { a } = await com_order(0, 0);

    const expected = 3 * factor - 2 * factor + (t15 ? -15 : 0) + (t17 ? 5 : 0);
    assert.equal(a, expected, `T 系数 = ${factor}（含素质段双计）`);
  }
});

test('参数阶梯：恭顺/恐怖按 PALAMLV 取 L（<100 为 0、≥30000 为 5）', async () => {
  const fixture = create_era_fixture();
  seed_names(fixture);
  const { com_order } = load_order(fixture);
  fixture.store.set('palam:31:4', 100); // 恭顺：恰达 LV1（阈值含下界）
  fixture.store.set('palam:31:10', 99); // 恐怖：LV0 → 不打项

  const { a } = await com_order(0, 0);

  assert.equal(fixture.text_lines().join(''), '恭顺LV1(3)');
  assert.equal(a, 3, '恐怖 LV0 不进明细也不计值');
});

test('调教者素质五项（:291-334）：读 PLAYER 的 TALENT，全查 S', async () => {
  const fixture = create_era_fixture();
  seed_names(fixture);
  for (const [id, name] of [
    [91, '魅惑'],
    [92, '谜之魅力'],
    [93, '威圧感'],
    [83, '施虐狂'],
    [118, '鼓舞'],
  ]) {
    fixture.store.set(`talentname:${id}`, name);
    fixture.store.set(`talent:0:${id}`, 1);
  }
  const { com_order } = load_order(fixture);

  const { a } = await com_order(0, 0);

  assert.equal(
    fixture.text_lines().join(''),
    '魅惑(6) + 谜之魅力(6) + 威圧感(6) + 施虐狂(3) + 鼓舞(1)',
  );
  assert.equal(a, 6 + 6 + 6 + 3 + 1);
});

test('相性六档（:339-379）：RELATION:PLAYER 的档位与文案', async () => {
  const cases = [
    [25, ' - 相性最差(10)', -10],
    [60, ' - 相性较差(6)', -6],
    [90, ' - 相性不怎么样(3)', -3],
    [110, '相性还行(3)', 3],
    [150, '相性较好(6)', 6],
    [200, '相性最好(10)', 10],
    [0, '', 0], // 值 0：六档全不进（> 0 前置）
  ];
  for (const [relation, expected_text, expected_a] of cases) {
    const fixture = create_era_fixture();
    seed_names(fixture);
    const { com_order } = load_order(fixture);
    fixture.store.set('relation:31:0', relation); // TARGET 对 PLAYER

    const { a } = await com_order(0, 0);

    assert.equal(fixture.text_lines().join(''), expected_text);
    assert.equal(a, expected_a);
  }
});

test('接触面：a/s 初值透传，返回累加后的新值（调用方继续累加）', async () => {
  const fixture = create_era_fixture();
  seed_names(fixture);
  const { com_order } = load_order(fixture);
  fixture.store.set('abl:31:10', 2); // 顺从 ×4 → +8

  const first = await com_order(0, 0); // COMF 的第一拍：清零起步
  assert.deepEqual(first, { a: 8, s: 1 });

  const second = await com_order(first.a, first.s); // 同拍复算（幂等形态）
  assert.equal(second.a, 16, 'a 初值透传累加');
});
