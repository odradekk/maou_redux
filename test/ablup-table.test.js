/**
 * ablup 升级族的骨架测试（issue #796）。
 *
 * 数值、文案与逐字输出的断言在 test/ablup.test.js；本文件守的是骨架本身：
 * 每条规格的重试策略（重试时重画哪些行）、收尾按钮、隐藏选项与干跑出口。
 * 「重试时重画的文本行」这一列正是工单要求逐条保留的保真差异——ablup0～5 与
 * 7～9 的说明行画在循环外，重试只重画按钮行；ablup6 方向相反。表里的期望值
 * 取自重构前后逐字节比对过的快照输出。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一的注入点）。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara } = require('./helpers/chara');
const { seed_static_names } = require('./helpers/static-names');

const CID = 31;

function seed(fixture) {
  join_slave_chara(fixture, CID);
  seed_static_names(fixture);
  return require('#/system/train/ablup');
}

/** 当前渲染出来的按钮行 */

function buttons(fixture) {
  return fixture.lines.filter((line) => line.type === 'button');
}

/** 文本行里出现过两次以上的（＝重试时又画了一遍的）行，按首次出现顺序 */
function repeated_text_lines(fixture) {
  const counts = new Map();
  for (const line of fixture.text_lines()) {
    counts.set(line, (counts.get(line) ?? 0) + 1);
  }
  return [...counts].filter(([, n]) => n > 1).map(([line]) => line);
}

/**
 * 每个能力的起手式与重试表现：
 * - lv：起手等级；talents/marks：先把前置铺上（男人专用与刻印类能力要用）；
 * - stop：收尾按钮的正文（本次改动前后都不同——ablup4/5/6/7/8/9/40 用「放弃」）；
 * - repeated：重试一次（先点被拦的 [0] 再点收尾键）后重复出现的文本行。
 */
const RETRY_CASES = [
  { id: 0, lv: 0, stop: '- 停止', repeated: [] },
  { id: 1, lv: 0, stop: '- 停止', repeated: [] },
  { id: 2, lv: 0, stop: '- 停止', repeated: ['      私处经验　　0/2'] },
  { id: 3, lv: 0, stop: '- 停止', repeated: ['      肛门经验　　0/2'] },
  { id: 4, lv: 0, stop: '- 放弃', repeated: [] },
  { id: 5, lv: 0, stop: '- 放弃', repeated: [] },
  { id: 6, lv: 0, stop: '- 放弃', repeated: ['阴蒂感觉1LV以上'] },
  { id: 7, lv: 0, stop: '- 放弃', repeated: ['乳房感觉1LV以上'] },
  { id: 8, lv: 0, stop: '- 放弃', repeated: ['乳房感觉1LV以上'] },
  { id: 9, lv: 0, stop: '- 放弃', repeated: [] },
  { id: 10, lv: 0, stop: '- 停止', repeated: [] },
  { id: 11, lv: 0, stop: '- 停止', repeated: [] },
  { id: 12, lv: 0, stop: '- 停止', repeated: [] },
  { id: 13, lv: 0, stop: '- 停止', repeated: ['技巧LV1以上(现在LV0)且'] },
  {
    id: 14,
    lv: 0,
    stop: '- 停止',
    repeated: ['技巧LV1以上(现在LV0)且', '      性交经验　0/3'],
  },
  {
    id: 15,
    lv: 0,
    stop: '- 停止',
    repeated: ['      调教会话经验　0/3 or', '      卖淫经验　0/5'],
  },
  {
    id: 16,
    lv: 0,
    stop: '- 停止',
    repeated: [
      '顺从LV1以上(现在LV0)且',
      '　　　绝顶经验　0/1',
      '　　　精液经验　0/1',
      '　　　侍奉快乐经验　0/1',
    ],
  },
  {
    id: 17,
    lv: 0,
    stop: '- 停止',
    repeated: ['欲望LV1以上(现在LV0)且', '　　　绝顶经验　0/1'],
  },
  {
    id: 20,
    lv: 0,
    stop: '- 停止',
    repeated: ['欲望LV1以上(现在LV0)且', '　　　施虐快乐经验　0/5'],
  },
  {
    id: 21,
    lv: 0,
    stop: '- 停止',
    repeated: [
      '欲望LV1以上(现在LV0)且',
      '　　　欲情点数×0/100',
      '　　　屈服点数×0/100',
      '　　　绝顶经验　0/1',
    ],
  },
  {
    id: 22,
    lv: 0,
    stop: '- 停止',
    repeated: ['欲望LV1以上(现在LV0)且', '　　　百合经验　0/50'],
  },
  {
    id: 23,
    lv: 0,
    talents: { 122: 1 },
    stop: '- 停止',
    repeated: ['　　　断背经验　0/50'],
  },
  {
    id: 30,
    lv: 0,
    stop: '- 停止',
    repeated: [
      '侍奉精神LV1以上(现在LV0)且',
      '　　　屈服点数×0/10000',
      '　　　性交经验　0/10',
      '　　　屈服点数×0/30000',
      '　　　性交经验　0/5',
    ],
  },
  {
    id: 31,
    lv: 0,
    stop: '- 停止',
    repeated: [
      '露出癖LV1以上(现在LV0)且',
      '阴蒂感觉LV1以上(现在LV0)且',
      '　　　阴核点数×0/10000',
      '　　　耻情点数×0/1000',
      '　　　自慰经验　0/100',
      '　　　调教自慰经验　0/20',
    ],
  },
  {
    id: 32,
    lv: 0,
    stop: '- 停止',
    repeated: [
      '侍奉精神LV1以上(现在LV0)且',
      '　　　屈服点数×0/10000',
      '　　　精液经验　0/10',
      '　　　屈服点数×0/30000',
      '　　　精液经验　0/5',
    ],
  },
  {
    id: 33,
    lv: 0,
    stop: '- 停止',
    repeated: [
      '百合气质LV1以上(现在LV0)且',
      '　　　欲情点数×0/1200',
      '　　　屈服点数×0/1200',
      '　　　百合经验　0/300',
    ],
  },
  {
    id: 37,
    lv: 0,
    stop: '- 停止',
    repeated: [
      '欲望LV1以上(现在LV0)且',
      '　　　欲情点数×0/3000',
      '　　　屈服点数×0/1000',
      '卖淫经验　0/50',
    ],
  },
  {
    id: 39,
    lv: 0,
    stop: '- 停止',
    repeated: [
      '欲望LV1以上(现在LV0)且',
      '　　　屈服点数×0/2000',
      '兽奸经验　0/30',
    ],
  },
  { id: 40, lv: 0, stop: '- 放弃', repeated: ['欲望LV1以上(现在LV0)'] },
  {
    id: 99,
    lv: 1,
    marks: { 2: 0, 3: 1 },
    stop: '- 停止',
    repeated: ['屈服刻印1以上(现在LV0)且', '顺从LV3以上(现在LV0)必要'],
  },
  {
    id: 100,
    lv: 0,
    marks: { 10: 1 },
    cflags: { 9: 1 },
    stop: '- 停止',
    repeated: [
      '各处感觉总计6以上(现在0)或',
      '战斗等级LV10以上(现在LV1)必要，然后',
    ],
  },
];

test('ablup16：入口把关是 OR——三项素质任一缺失都挡在主流程外', async () => {
  for (const missing of [63, 85, 86]) {
    const fixture = create_era_fixture();
    const { ablup16 } = seed(fixture);
    fixture.store.set(`abl:${CID}:16`, 5);
    for (const id of [63, 85, 86]) {
      fixture.store.set(`talent:${CID}:${id}`, id === missing ? 0 : 1);
    }
    await ablup16(CID);
    assert.ok(
      fixture.text_lines().includes('需要特殊素质才能继续提升'),
      `只缺 TALENT:${missing} 时也应被挡`,
    );
    assert.equal(
      buttons(fixture).length,
      0,
      `只缺 TALENT:${missing} 时不应渲染按钮`,
    );
  }
});

test('ablup0：戒备森严 Lv6 以上 ×3.00（与 Lv4/5 两档不同）', async () => {
  const fixture = create_era_fixture();
  const { ablup0 } = seed(fixture);
  // Lv7 才区分「Lv6 以上」与「只判 Lv6」两种写法
  fixture.store.set(`abl:${CID}:0`, 7);
  fixture.store.set(`talent:${CID}:27`, 1); // 戒备森严
  fixture.store.set(`talent:${CID}:74`, 1); // 自慰狂解锁 Lv5 以上
  fixture.set_inputs(100);
  await ablup0(CID);
  // 90000（梯子）× 3.00（戒备森严 Lv6 以上）× 0.80（自慰狂）= 216000
  assert.ok(buttons(fixture)[0].text.includes('/216000 ……'));
});

test('ablup30：[1] 轨的半经验门槛按整除取半，不足即经验不足位', async () => {
  const fixture = create_era_fixture();
  const { ablup30 } = seed(fixture);
  fixture.store.set(`juel:${CID}:5`, 9000); // [1] 轨的三倍点数
  fixture.store.set(`juel:${CID}:6`, 30000);
  fixture.store.set(`exp:${CID}:5`, 4); // C=10 → floor(10/2)=5，4 不足
  fixture.set_inputs(100);
  await ablup30(CID);
  assert.ok(buttons(fixture)[1].text.includes('经验不足'));
});

test('ABLUPn：重试只重画该重画的行，收尾按钮逐条钉死', async () => {
  for (const row of RETRY_CASES) {
    const fixture = create_era_fixture();
    const mod = seed(fixture);
    fixture.store.set(`abl:${CID}:${row.id}`, row.lv);
    for (const [talent, value] of Object.entries(row.talents ?? {})) {
      fixture.store.set(`talent:${CID}:${talent}`, value);
    }
    for (const [mark, value] of Object.entries(row.marks ?? {})) {
      fixture.store.set(`mark:${CID}:${mark}`, value);
    }
    for (const [flag, value] of Object.entries(row.cflags ?? {})) {
      fixture.store.set(`cflag:${CID}:${flag}`, value);
    }
    // 先点被拦的 [0]，再点收尾键：两轮都渲染，循环外的说明行只画一次
    fixture.set_inputs(0, 100);
    await mod[`ablup${row.id}`](CID);

    const rendered = buttons(fixture);
    assert.ok(
      rendered.length > 0,
      `ablup${row.id}：本起手式下没有渲染任何按钮`,
    );
    assert.equal(
      rendered.at(-1).text,
      row.stop,
      `ablup${row.id}：收尾按钮应是「${row.stop}」`,
    );
    assert.deepEqual(
      repeated_text_lines(fixture),
      row.repeated,
      `ablup${row.id}：重试时重复出现的文本行与登记不符`,
    );
  }
});

test('ABLUPn：干跑出口写的是同一份等级与扣减，阻断时判定恒 0', async () => {
  const fixture = create_era_fixture();
  const { decide_ablup, core_ablup0, evaluate_ablup0 } = seed(fixture);
  fixture.store.set(`juel:${CID}:0`, 1);

  assert.equal(evaluate_ablup0(CID).blocked, null);
  assert.equal(core_ablup0(CID), 0);
  assert.equal(fixture.store.get(`abl:${CID}:0`), 1, 'core 照写等级');
  assert.equal(fixture.store.get(`juel:${CID}:0`), 0, 'core 照扣点数');

  // 封锁时 evaluate 只回 blocked，主流程与 decide 都不再往下走
  fixture.store.set(`talent:${CID}:101`, 2);
  assert.equal(evaluate_ablup0(CID).blocked, 'locked');
  assert.equal(await decide_ablup(CID, 0), 0);
});

test('ABLUPn：未渲染的选项不占按钮位（隐藏即不渲染）', async () => {
  const fixture = create_era_fixture();
  const { ablup21 } = seed(fixture);
  // Lv3 起 [0] 轨的 b 为 0：只渲染 [1] 与收尾键
  fixture.store.set(`abl:${CID}:21`, 3);
  fixture.set_inputs(100);
  await ablup21(CID);
  assert.deepEqual(
    fixture.lines
      .filter((line) => line.type === 'button')
      .map((line) => line.accelerator),
    [1, 100],
  );
});

test('ablup40：本函数没有分隔线（原实现只在阻断时等待按键）', async () => {
  const fixture = create_era_fixture();
  const { ablup40 } = seed(fixture);
  fixture.set_inputs(100);
  await ablup40(CID);
  assert.equal(
    fixture.lines.filter((line) => line.type === 'divider').length,
    0,
    'ablup40 的输出里不应有分隔线',
  );

  const maxed = create_era_fixture();
  const { ablup40: maxed_40 } = seed(maxed);
  maxed.store.set(`abl:${CID}:40`, 10);
  await maxed_40(CID);
  assert.ok(maxed.text_lines().includes('已达到MAX'));
});
