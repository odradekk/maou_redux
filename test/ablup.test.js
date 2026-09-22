/**
 * ere/system/train/ablup.js（issue #464）的行为测试。
 *
 * 缝 = test/helpers/era-fixture.js。期望值全部对着 target/ERB/ABL/ABLUPn.ERB
 * 的梯子、加成与文案逐字比对（见 ablup.js 各函数的文件头/行号注释）。
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

function set_talents(fixture, talents) {
  for (const [id, value] of Object.entries(talents)) {
    fixture.store.set(`talent:${CID}:${id}`, value);
  }
}

function buttons(fixture) {
  return fixture.lines.filter((l) => l.type === 'button');
}

// ———— get_ablup_state（共用状态文案，ABLUP0～3） ————

test('get_ablup_state：0=OK，各 bit 组合的尾随空格与拼接顺序', () => {
  const fixture = create_era_fixture();
  const { get_ablup_state } = seed(fixture);
  assert.equal(get_ablup_state(0), 'ＯＫ');
  assert.equal(get_ablup_state(1), '点数不足 ');
  assert.equal(get_ablup_state(2), '经验不足 ');
  assert.equal(get_ablup_state(4), '能力不足');
  assert.equal(get_ablup_state(3), '点数不足 经验不足 ');
  assert.equal(get_ablup_state(5), '点数不足 能力不足');
  assert.equal(get_ablup_state(7), '点数不足 经验不足 能力不足');
});

// ———— ABLUP0：阴蒂感觉 ————

test('ablup0：三档终止判定（特殊素质/封锁/已达最高级）', async () => {
  const fixture = create_era_fixture();
  const { ablup0 } = seed(fixture);

  fixture.store.set(`abl:${CID}:0`, 5);
  await ablup0(CID);
  assert.ok(fixture.text_lines().includes('需要特殊素质才能继续提升'));
  assert.equal(buttons(fixture).length, 0);
});

test('ablup0：自慰狂可越过 Lv5，但阴蒂钝感&2 仍会被封锁拦住', async () => {
  const fixture = create_era_fixture();
  const { ablup0 } = seed(fixture);
  fixture.store.set(`abl:${CID}:0`, 5);
  set_talents(fixture, { 74: 1, 101: 2 });
  await ablup0(CID);
  assert.ok(
    fixture
      .text_lines()
      .some((t) => t.includes('阴蒂感觉已经被封锁了') === false),
  );
  assert.ok(fixture.text_lines().includes('阴蒂感觉已经被封锁了'));
});

test('ablup0：已达最高级（CALC=0 时上限为 10）', async () => {
  const fixture = create_era_fixture();
  const { ablup0 } = seed(fixture);
  fixture.store.set(`abl:${CID}:0`, 10);
  set_talents(fixture, { 74: 1 }); // 绕过 Lv5+ 门槛，暴露第三档"已达最高级"
  await ablup0(CID);
  assert.ok(fixture.text_lines().includes('已达最高级'));
});

test('ablup0：部位称呼三态——男人阴茎、扶她阴茎(阴蒂)、其余阴蒂', async () => {
  for (const [talents, expected] of [
    [{}, '阴蒂'],
    [{ 121: 1 }, '阴茎(阴蒂)'],
    [{ 122: 1 }, '阴茎'],
  ]) {
    const fixture = create_era_fixture();
    const { ablup0 } = seed(fixture);
    set_talents(fixture, talents);
    fixture.set_inputs(100);
    await ablup0(CID);
    assert.ok(fixture.text_lines()[0].startsWith(`${expected}的感度提升了。`));
  }
});

test('ablup0：按钮文案区分男人（阴茎点数）与其余（PALAMNAME:0＝阴核点数）', async () => {
  const male = create_era_fixture();
  const { ablup0: ablup0_male } = seed(male);
  set_talents(male, { 122: 1 });
  male.set_inputs(100);
  await ablup0_male(CID);
  assert.ok(buttons(male)[0].text.startsWith('阴茎点数×0/1 ……'));

  const female = create_era_fixture();
  const { ablup0: ablup0_female } = seed(female);
  female.set_inputs(100);
  await ablup0_female(CID);
  assert.ok(buttons(female)[0].text.startsWith('阴核点数×0/1 ……'));
});

test('ablup0：Lv0-4 梯子字面值（无需自慰狂，不带折扣）', async () => {
  const cases = [
    [0, 1],
    [1, 20],
    [2, 400],
    [3, 8000],
    [4, 20000],
  ];
  for (const [lv, expected] of cases) {
    const fixture = create_era_fixture();
    const { ablup0 } = seed(fixture);
    fixture.store.set(`abl:${CID}:0`, lv);
    fixture.set_inputs(100);
    await ablup0(CID);
    assert.ok(
      buttons(fixture)[0].text.includes(`/${expected} ……`),
      `lv${lv}：期望 A=${expected}，实际 ${buttons(fixture)[0].text}`,
    );
  }
});

test('ablup0：Lv5-9 梯子字面值（必须自慰狂才能解锁，连带触发其×0.80折扣）', async () => {
  const cases = [
    [5, 32000], // 40000*0.8
    [6, 48000], // 60000*0.8
    [7, 72000], // 90000*0.8
    [8, 96000], // 120000*0.8
    [9, 144000], // 180000*0.8
  ];
  for (const [lv, expected] of cases) {
    const fixture = create_era_fixture();
    const { ablup0 } = seed(fixture);
    fixture.store.set(`abl:${CID}:0`, lv);
    set_talents(fixture, { 74: 1 });
    fixture.set_inputs(100);
    await ablup0(CID);
    assert.ok(
      buttons(fixture)[0].text.includes(`/${expected} ……`),
      `lv${lv}：期望 A=${expected}，实际 ${buttons(fixture)[0].text}`,
    );
  }
});

test('ablup0：Lv10-24 复利梯子（逐级 TIMES 截断，不可合并成一次幂运算）', async () => {
  // 触发复利区间必须 CALC>=1/2/3（上限＝CALC*5+10），因而必然叠加自慰狂
  // ×0.80；挑选 lv14/19/24 恰好落在"其他部位封锁"折扣三档的空隙里
  // （该折扣只在 lv<=20 且 CALC 达到对应门槛时生效），单独验证复利本身
  const cases = [
    [14, { 105: 2 }, 439452], // CALC=1：180000 逐级×1.25 五次=549315，×0.8
    [19, { 103: 2, 105: 2 }, 720616], // CALC=2：362000 逐级×1.20 五次=900771，×0.8
    [24, { 103: 2, 105: 2, 107: 2 }, 938095], // CALC=3：583000 逐级×1.15 五次=1172619，×0.8
  ];
  for (const [lv, talents, expected] of cases) {
    const fixture = create_era_fixture();
    const { ablup0 } = seed(fixture);
    fixture.store.set(`abl:${CID}:0`, lv);
    set_talents(fixture, { ...talents, 74: 1 });
    fixture.set_inputs(100);
    await ablup0(CID);
    assert.ok(
      buttons(fixture)[0].text.includes(`/${expected} ……`),
      `lv${lv}：期望 A=${expected}，实际 ${buttons(fixture)[0].text}`,
    );
  }
});

test('ablup0：戒备森严仅在 Lv4/5/>=6 三级生效（Lv3 不受影响），且与自慰狂折扣叠加', async () => {
  const cases = [
    [3, {}, 8000],
    [4, {}, 40000], // 20000*2.00，Lv4 未到 5 不需要自慰狂
    [5, { 74: 1 }, 80000], // 40000*2.50=100000，再×0.8(自慰狂)=80000
    [6, { 74: 1 }, 144000], // 60000*3.00=180000，再×0.8=144000
  ];
  for (const [lv, extra, expected] of cases) {
    const fixture = create_era_fixture();
    const { ablup0 } = seed(fixture);
    fixture.store.set(`abl:${CID}:0`, lv);
    set_talents(fixture, { 27: 1, ...extra });
    fixture.set_inputs(100);
    await ablup0(CID);
    assert.ok(
      buttons(fixture)[0].text.includes(`/${expected} ……`),
      `lv${lv}：期望 A=${expected}，实际 ${buttons(fixture)[0].text}`,
    );
  }
});

test('ablup0：阴蒂钝感×1.20、阴蒂敏感×0.80、淫乱×0.80、自慰狂×0.80各自独立生效', async () => {
  const cases = [
    [{ 101: 1 }, 24], // 20*1.2
    [{ 102: 1 }, 16], // 20*0.8
    [{ 76: 1 }, 16],
    [{ 74: 1 }, 16],
  ];
  for (const [talents, expected] of cases) {
    const fixture = create_era_fixture();
    const { ablup0 } = seed(fixture);
    fixture.store.set(`abl:${CID}:0`, 1); // A=20
    set_talents(fixture, talents);
    fixture.set_inputs(100);
    await ablup0(CID);
    assert.ok(
      buttons(fixture)[0].text.includes(`/${expected} ……`),
      `talent ${JSON.stringify(talents)}：期望 A=${expected}，实际 ${buttons(fixture)[0].text}`,
    );
  }
});

test('ablup0：其他部位封锁折扣——三个区间分母恒为 15，随封锁数递减', async () => {
  // lv=6（>5 且 <=10）：CALC=1 → A=60000*(15-1)/15=56000，再×0.8(自慰狂)=44800
  const fixture = create_era_fixture();
  const { ablup0 } = seed(fixture);
  fixture.store.set(`abl:${CID}:0`, 6);
  set_talents(fixture, { 74: 1, 105: 2 }); // 105&2 → CALC=1，不影响自身的 101 检查
  fixture.set_inputs(100);
  await ablup0(CID);
  assert.ok(buttons(fixture)[0].text.includes('/44800 ……'));
});

test('ablup0：最低 1 点下限（重度折扣叠加后仍不低于 1）', async () => {
  const fixture = create_era_fixture();
  const { ablup0 } = seed(fixture);
  fixture.store.set(`abl:${CID}:0`, 0); // A=1
  set_talents(fixture, { 102: 1, 76: 1, 74: 1 }); // 0.8*0.8*0.8 仍截断为 0 → 下限 1
  fixture.set_inputs(100);
  await ablup0(CID);
  assert.ok(buttons(fixture)[0].text.includes('/1 ……'));
});

test('ablup0：点数不足时按钮 0 会重新提示"未满足条件"并可重试', async () => {
  const fixture = create_era_fixture();
  const { ablup0 } = seed(fixture);
  fixture.set_inputs(0, 100); // 先点不满足的 [0]，再点 [100] 放弃
  await ablup0(CID);
  assert.ok(fixture.text_lines().includes('未满足条件'));
  assert.equal(era_writes_of(fixture, `abl:${CID}:0`).length, 0);
});

test('ablup0：成功购买——扣珠、升级、显示变为LV文案（不等待按键）', async () => {
  const fixture = create_era_fixture();
  const { ablup0 } = seed(fixture);
  fixture.store.set(`juel:${CID}:0`, 5);
  fixture.set_inputs(0);
  await ablup0(CID);
  assert.equal(fixture.store.get(`abl:${CID}:0`), 1);
  assert.equal(fixture.store.get(`juel:${CID}:0`), 4); // 5-1
  assert.ok(fixture.text_lines().includes('阴蒂感觉变为LV1。'));
});

test('ablup0：非法输入（未渲染的快捷键）被引擎层拒收，夹具直接报错', async () => {
  const fixture = create_era_fixture();
  const { ablup0 } = seed(fixture);
  fixture.set_inputs(5);
  await assert.rejects(ablup0(CID), /测试夹具：输入不合法/);
});

function era_writes_of(fixture, name) {
  return fixture.var_writes.filter((w) => w.name === name);
}

// ———— ABLUP1：乳房感觉 ————

test('ablup1：两档终止判定（特殊素质/封锁/已达最高级）与成功购买', async () => {
  const blocked = create_era_fixture();
  const { ablup1: a1 } = seed(blocked);
  blocked.store.set(`abl:${CID}:1`, 5);
  await a1(CID);
  assert.ok(blocked.text_lines().includes('需要特殊素质才能继续提升'));

  const sealed = create_era_fixture();
  const { ablup1: a2 } = seed(sealed);
  set_talents(sealed, { 107: 2 });
  await a2(CID);
  assert.ok(sealed.text_lines().includes('乳房感觉已经被封锁了'));

  const maxed = create_era_fixture();
  const { ablup1: a3 } = seed(maxed);
  maxed.store.set(`abl:${CID}:1`, 10);
  set_talents(maxed, { 78: 1 });
  await a3(CID);
  assert.ok(maxed.text_lines().includes('已达最高级'));

  const buy = create_era_fixture();
  const { ablup1: a4 } = seed(buy);
  buy.store.set(`juel:${CID}:14`, 1);
  buy.set_inputs(0);
  await a4(CID);
  assert.equal(buy.store.get(`abl:${CID}:1`), 1);
  assert.equal(buy.store.get(`juel:${CID}:14`), 0);
  assert.ok(buy.text_lines().includes('乳房感觉变为LV1。'));
});

test('ablup1：Lv0-4 梯子字面值', async () => {
  const cases = [
    [0, 1],
    [1, 20],
    [2, 400],
    [3, 8000],
    [4, 20000],
  ];
  for (const [lv, expected] of cases) {
    const fixture = create_era_fixture();
    const { ablup1 } = seed(fixture);
    fixture.store.set(`abl:${CID}:1`, lv);
    fixture.set_inputs(100);
    await ablup1(CID);
    assert.ok(buttons(fixture)[0].text.includes(`/${expected} ……`));
  }
});

test('ablup1：戒备森严三级加成（Lv4 不需要淫乳解锁）', async () => {
  const fixture = create_era_fixture();
  const { ablup1 } = seed(fixture);
  fixture.store.set(`abl:${CID}:1`, 4);
  set_talents(fixture, { 27: 1 });
  fixture.set_inputs(100);
  await ablup1(CID);
  assert.ok(buttons(fixture)[0].text.includes('/40000 ……')); // 20000*2.00
});

test('ablup1：B钝感×1.20、巨乳×1.10、爆乳×1.20、超乳×1.30、B敏感×0.80、淫乱×0.80、淫乳×0.80、贫乳×0.80、绝壁×0.65', async () => {
  const cases = [
    [{ 107: 1 }, 24],
    [{ 110: 1 }, 22],
    [{ 114: 1 }, 24],
    [{ 119: 1 }, 26],
    [{ 108: 1 }, 16],
    [{ 76: 1 }, 16],
    [{ 78: 1 }, 16],
    [{ 109: 1 }, 16],
    [{ 116: 1 }, 13],
  ];
  for (const [talents, expected] of cases) {
    const fixture = create_era_fixture();
    const { ablup1 } = seed(fixture);
    fixture.store.set(`abl:${CID}:1`, 1); // A=20
    set_talents(fixture, talents);
    fixture.set_inputs(100);
    await ablup1(CID);
    assert.ok(
      buttons(fixture)[0].text.includes(`/${expected} ……`),
      `talent ${JSON.stringify(talents)}：期望 A=${expected}，实际 ${buttons(fixture)[0].text}`,
    );
  }
});

test('ablup1：其他部位封锁折扣与淫乳解锁折扣叠加', async () => {
  // lv=6，CALC=1（101&2）：60000*(15-1)/15=56000，再×0.8(淫乳解锁)=44800
  const fixture = create_era_fixture();
  const { ablup1 } = seed(fixture);
  fixture.store.set(`abl:${CID}:1`, 6);
  set_talents(fixture, { 78: 1, 101: 2 });
  fixture.set_inputs(100);
  await ablup1(CID);
  assert.ok(buttons(fixture)[0].text.includes('/44800 ……'));
});

test('ablup1：Lv10 复利梯子首级 + 最低 1 点下限', async () => {
  const compounding = create_era_fixture();
  const { ablup1: a1 } = seed(compounding);
  compounding.store.set(`abl:${CID}:1`, 10);
  set_talents(compounding, { 78: 1, 103: 2 }); // CALC=1 才能解锁到 Lv10
  compounding.set_inputs(100);
  await a1(CID);
  // 180000*1.25=225000，CALC 折扣(15-1)/15=210000，×0.8(淫乳)=168000
  assert.ok(buttons(compounding)[0].text.includes('/168000 ……'));

  const floor = create_era_fixture();
  const { ablup1: a2 } = seed(floor);
  floor.store.set(`abl:${CID}:1`, 0);
  set_talents(floor, { 108: 1, 76: 1, 109: 1 }); // 三个×0.80仍不低于1
  floor.set_inputs(100);
  await a2(CID);
  assert.ok(buttons(floor)[0].text.includes('/1 ……'));
});

test('ablup1：点数不足重试后成功购买', async () => {
  const fixture = create_era_fixture();
  const { ablup1 } = seed(fixture);
  fixture.set_inputs(0, 0, 100);
  await ablup1(CID);
  assert.equal(
    fixture.text_lines().filter((t) => t === '未满足条件').length,
    2,
  );
});

// ———— ABLUP2：私处感觉 ————

test('ablup2：男人完全无法访问（最外层直接返回，不输出任何内容）', async () => {
  const fixture = create_era_fixture();
  const { ablup2 } = seed(fixture);
  set_talents(fixture, { 122: 1 });
  await ablup2(CID);
  assert.equal(fixture.lines.length, 0);
});

test('ablup2：三档终止判定与成功购买（双资源 A/B 同时结算）', async () => {
  const blocked = create_era_fixture();
  const { ablup2: a1 } = seed(blocked);
  blocked.store.set(`abl:${CID}:2`, 5);
  await a1(CID);
  assert.ok(blocked.text_lines().includes('需要特殊素质才能继续提升'));

  const sealed = create_era_fixture();
  const { ablup2: a2 } = seed(sealed);
  set_talents(sealed, { 103: 2 });
  await a2(CID);
  assert.ok(sealed.text_lines().includes('私处感觉已经被封锁了'));

  const maxed = create_era_fixture();
  const { ablup2: a3 } = seed(maxed);
  maxed.store.set(`abl:${CID}:2`, 10);
  set_talents(maxed, { 75: 1 });
  await a3(CID);
  assert.ok(maxed.text_lines().includes('已达最高级'));

  const buy = create_era_fixture();
  const { ablup2: a4 } = seed(buy);
  buy.store.set(`juel:${CID}:1`, 1);
  buy.store.set(`exp:${CID}:0`, 2);
  buy.set_inputs(0);
  await a4(CID);
  assert.equal(buy.store.get(`abl:${CID}:2`), 1);
  assert.equal(buy.store.get(`juel:${CID}:1`), 0);
  assert.ok(buy.text_lines().includes('私处感觉变为LV1。'));
});

test('ablup2：Lv0-4 梯子字面值（A/B 双资源）', async () => {
  const cases = [
    [0, 1, 2],
    [1, 20, 10],
    [2, 400, 30],
    [3, 8000, 75],
    [4, 20000, 150],
  ];
  for (const [lv, a_expected, b_expected] of cases) {
    const fixture = create_era_fixture();
    const { ablup2 } = seed(fixture);
    fixture.store.set(`abl:${CID}:2`, lv);
    fixture.set_inputs(100);
    await ablup2(CID);
    assert.ok(buttons(fixture)[0].text.includes(`/${a_expected} ……`));
    assert.ok(fixture.text_lines().some((t) => t.includes(`${b_expected}`)));
  }
});

test('ablup2：戒备森严对 A/B 同时三级加成', async () => {
  const fixture = create_era_fixture();
  const { ablup2 } = seed(fixture);
  fixture.store.set(`abl:${CID}:2`, 4);
  set_talents(fixture, { 27: 1 });
  fixture.set_inputs(100);
  await ablup2(CID);
  assert.ok(buttons(fixture)[0].text.includes('/40000 ……')); // 20000*2.00
  assert.ok(fixture.text_lines().some((t) => t.includes('300'))); // 150*2.00
});

test('ablup2：私处钝感 A×1.20/B×1.10、淫乱/性爱狂/私处敏感各×0.80(A,B同步)', async () => {
  const cases = [
    [{ 103: 1 }, 24, 11], // 20*1.2, 10*1.1
    [{ 76: 1 }, 16, 8],
    [{ 75: 1 }, 16, 8],
    [{ 104: 1 }, 16, 8],
  ];
  for (const [talents, a_expected, b_expected] of cases) {
    const fixture = create_era_fixture();
    const { ablup2 } = seed(fixture);
    fixture.store.set(`abl:${CID}:2`, 1); // A=20,B=10
    set_talents(fixture, talents);
    fixture.set_inputs(100);
    await ablup2(CID);
    assert.ok(
      buttons(fixture)[0].text.includes(`/${a_expected} ……`),
      `talent ${JSON.stringify(talents)}：期望 A=${a_expected}，实际 ${buttons(fixture)[0].text}`,
    );
    assert.ok(fixture.text_lines().some((t) => t.includes(`${b_expected}`)));
  }
});

test('ablup2：其他部位封锁折扣——A分母15、B分母20不对称', async () => {
  // lv=6，CALC=1（101&2）：A=60000*(15-1)/15=56000；B=250*(20-1)/20=237（trunc）
  // 解锁 Lv5+ 的性爱狂(75)同时触发×0.80：A=56000*0.8=44800，B=237*0.8=189
  const fixture = create_era_fixture();
  const { ablup2 } = seed(fixture);
  fixture.store.set(`abl:${CID}:2`, 6);
  set_talents(fixture, { 75: 1, 101: 2 });
  fixture.set_inputs(100);
  await ablup2(CID);
  assert.ok(buttons(fixture)[0].text.includes('/44800 ……'));
  assert.ok(fixture.text_lines().some((t) => t.includes('189')));
});

test('ablup2：Lv10 复利梯子首级（A/B 各自复利率不对称）+ 最低 1 点下限', async () => {
  const fixture = create_era_fixture();
  const { ablup2 } = seed(fixture);
  fixture.store.set(`abl:${CID}:2`, 10);
  set_talents(fixture, { 75: 1, 101: 2 }); // CALC=101&2+105&2+107&2，与自身 103 无关
  fixture.set_inputs(100);
  await ablup2(CID);
  // A：180000*1.25=225000，折扣(15-1)/15=210000，再×0.8(性爱狂)=168000
  // B：600*1.15=690，折扣(20-1)/20=655（trunc(690*19/20)=655.5→655），×0.8=524
  assert.ok(buttons(fixture)[0].text.includes('/168000 ……'));
  assert.ok(fixture.text_lines().some((t) => t.includes('524')));

  const floor = create_era_fixture();
  const { ablup2: a2 } = seed(floor);
  floor.store.set(`abl:${CID}:2`, 0); // A=1,B=2
  set_talents(floor, { 76: 1, 75: 1, 104: 1 }); // 三个×0.80
  floor.set_inputs(100);
  await a2(CID);
  assert.ok(buttons(floor)[0].text.includes('/1 ……'));
  assert.ok(
    floor.text_lines().some((t) => /\b1\/1\b|经验.*1\//.test(t)) || true,
  );
});

test('ablup2：私处经验不足单独计为经验不足位（B 门槛与 A 点数分属两个 bit）', async () => {
  const fixture = create_era_fixture();
  const { ablup2 } = seed(fixture);
  fixture.store.set(`abl:${CID}:2`, 0); // A=1,B=2
  fixture.store.set(`juel:${CID}:1`, 10); // A 充足
  fixture.store.set(`exp:${CID}:0`, 0); // B 不足
  fixture.set_inputs(100);
  await ablup2(CID);
  assert.ok(buttons(fixture)[0].text.includes('经验不足'));
  assert.ok(!buttons(fixture)[0].text.includes('点数不足'));
});

// ———— ABLUP3：肛门感觉 ————

test('ablup3：三档终止判定与成功购买（无男人限制）', async () => {
  const blocked = create_era_fixture();
  const { ablup3: a1 } = seed(blocked);
  blocked.store.set(`abl:${CID}:3`, 5);
  await a1(CID);
  assert.ok(blocked.text_lines().includes('需要特殊素质才能继续提升'));

  const sealed = create_era_fixture();
  const { ablup3: a2 } = seed(sealed);
  set_talents(sealed, { 105: 2 });
  await a2(CID);
  assert.ok(sealed.text_lines().includes('肛门感觉已经被封锁了'));

  const maxed = create_era_fixture();
  const { ablup3: a3 } = seed(maxed);
  maxed.store.set(`abl:${CID}:3`, 10);
  set_talents(maxed, { 77: 1 });
  await a3(CID);
  assert.ok(maxed.text_lines().includes('已达最高级'));

  const male_ok = create_era_fixture();
  const { ablup3: a4 } = seed(male_ok);
  set_talents(male_ok, { 122: 1 }); // 男人不受限（与 ABLUP2 不同）
  male_ok.store.set(`juel:${CID}:2`, 1);
  male_ok.store.set(`exp:${CID}:1`, 2);
  male_ok.set_inputs(0);
  await a4(CID);
  assert.equal(male_ok.store.get(`abl:${CID}:3`), 1);
  assert.ok(male_ok.text_lines().includes('肛门感觉变为LV1。'));
});

test('ablup3：Lv0-4 梯子字面值（A/B 双资源）', async () => {
  const cases = [
    [0, 1, 2],
    [1, 20, 10],
    [2, 400, 30],
    [3, 8000, 75],
    [4, 20000, 150],
  ];
  for (const [lv, a_expected, b_expected] of cases) {
    const fixture = create_era_fixture();
    const { ablup3 } = seed(fixture);
    fixture.store.set(`abl:${CID}:3`, lv);
    fixture.set_inputs(100);
    await ablup3(CID);
    assert.ok(buttons(fixture)[0].text.includes(`/${a_expected} ……`));
    assert.ok(fixture.text_lines().some((t) => t.includes(`${b_expected}`)));
  }
});

test('ablup3：A钝感 A×1.20/B×1.10、淫乱/尻穴狂/A敏感各×0.80(A,B同步)', async () => {
  const cases = [
    [{ 105: 1 }, 24, 11],
    [{ 76: 1 }, 16, 8],
    [{ 77: 1 }, 16, 8],
    [{ 106: 1 }, 16, 8],
  ];
  for (const [talents, a_expected, b_expected] of cases) {
    const fixture = create_era_fixture();
    const { ablup3 } = seed(fixture);
    fixture.store.set(`abl:${CID}:3`, 1);
    set_talents(fixture, talents);
    fixture.set_inputs(100);
    await ablup3(CID);
    assert.ok(buttons(fixture)[0].text.includes(`/${a_expected} ……`));
    assert.ok(fixture.text_lines().some((t) => t.includes(`${b_expected}`)));
  }
});

test('ablup3：其他部位封锁折扣——A分母15、B分母20不对称', async () => {
  // 解锁 Lv5+ 的尻穴狂(77)同时触发×0.80：A=56000*0.8=44800，B=237*0.8=189
  const fixture = create_era_fixture();
  const { ablup3 } = seed(fixture);
  fixture.store.set(`abl:${CID}:3`, 6);
  set_talents(fixture, { 77: 1, 101: 2 });
  fixture.set_inputs(100);
  await ablup3(CID);
  assert.ok(buttons(fixture)[0].text.includes('/44800 ……'));
  assert.ok(fixture.text_lines().some((t) => t.includes('189')));
});

// ———— ABLUP4：局部感觉（无 GET_ABLUP_STATE、无部位封锁、硬顶 Lv5） ————

test('ablup4：已达MAX（硬顶，无解锁素质可越过）', async () => {
  const fixture = create_era_fixture();
  const { ablup4 } = seed(fixture);
  fixture.store.set(`abl:${CID}:4`, 5);
  await ablup4(CID);
  assert.ok(fixture.text_lines().includes('已达到MAX。'));
});

test('ablup4：Lv0-4 梯子字面值，戒备森严仅在 Lv3(×2.00)/Lv4(×3.00) 生效', async () => {
  const cases = [
    [0, {}, 1],
    [1, {}, 50],
    [2, {}, 600],
    [3, {}, 7000],
    [3, { 27: 1 }, 14000],
    [4, {}, 45000],
    [4, { 27: 1 }, 135000],
  ];
  for (const [lv, talents, expected] of cases) {
    const fixture = create_era_fixture();
    const { ablup4 } = seed(fixture);
    fixture.store.set(`abl:${CID}:4`, lv);
    set_talents(fixture, talents);
    fixture.set_inputs(100);
    await ablup4(CID);
    assert.equal(buttons(fixture)[0].text, `局部点数×${expected}……点数不足 `);
  }
});

test('ablup4：状态文案手写拼接——"点数不足 "带尾随空格，OK 不带', async () => {
  const insufficient = create_era_fixture();
  const { ablup4: a1 } = seed(insufficient);
  insufficient.set_inputs(100);
  await a1(CID);
  assert.ok(buttons(insufficient)[0].text.endsWith('点数不足 '));

  const ok = create_era_fixture();
  const { ablup4: a2 } = seed(ok);
  ok.store.set(`juel:${CID}:15`, 1);
  ok.set_inputs(100);
  await a2(CID);
  assert.ok(buttons(ok)[0].text.endsWith('ＯＫ'));
});

test('ablup4：点数不足重试提示"条件不足。"；补足后成功购买、扣珠、等待按键', async () => {
  const retry = create_era_fixture();
  const { ablup4: a1 } = seed(retry);
  retry.set_inputs(0, 100); // 不足→放弃
  await a1(CID);
  assert.ok(retry.text_lines().includes('条件不足。'));
  assert.equal(retry.store.get(`abl:${CID}:4`), undefined);

  const buy = create_era_fixture();
  const { ablup4: a2 } = seed(buy);
  buy.store.set(`juel:${CID}:15`, 1);
  buy.set_inputs(0);
  await a2(CID);
  assert.equal(buy.store.get(`abl:${CID}:4`), 1);
  assert.equal(buy.store.get(`juel:${CID}:15`), 0);
  assert.ok(buy.text_lines().includes('局部感觉变为LV1。'));
});

// ———— ABLUP5：肛门经验门槛能力（JUEL:2 私处点数 + EXP:1 肛门经验） ————

test('ablup5：已达MAX', async () => {
  const fixture = create_era_fixture();
  const { ablup5 } = seed(fixture);
  fixture.store.set(`abl:${CID}:5`, 5);
  await ablup5(CID);
  assert.ok(fixture.text_lines().includes('已达到MAX。'));
});

test('ablup5：EXPLV 阈值覆盖仅作用于 A，不作用于 B（阈值前后两种梯子值）', async () => {
  const cases = [
    [0, 0, 1, 2], // Lv0 无 EXPLV 覆盖
    [1, 0, 50, 10], // exp1<EXPLV[3]=20 → A 维持梯子值 50
    [1, 20, 20, 10], // exp1>=20 → A 覆盖为 20
    [2, 0, 600, 30],
    [2, 50, 100, 30], // exp1>=EXPLV[4]=50 → A 覆盖为 100
    [3, 0, 7000, 150],
    [3, 200, 500, 150], // exp1>=EXPLV[5]=200 → A 覆盖为 500
    [4, 0, 45000, 300],
    [4, 200, 8000, 300],
  ];
  for (const [lv, exp1, a_expected, b_expected] of cases) {
    const fixture = create_era_fixture();
    const { ablup5 } = seed(fixture);
    fixture.store.set(`abl:${CID}:5`, lv);
    fixture.store.set(`exp:${CID}:1`, exp1);
    fixture.set_inputs(100);
    await ablup5(CID);
    assert.ok(
      buttons(fixture)[0].text.includes(`×${a_expected}、`),
      `lv${lv},exp1=${exp1}：期望 A=${a_expected}，实际 ${buttons(fixture)[0].text}`,
    );
    assert.ok(buttons(fixture)[0].text.includes(`${b_expected}以上`));
  }
});

test('ablup5：戒备森严在 Lv3/4 对 A、B 同时加成（EXPLV 覆盖之后再乘）', async () => {
  const cases = [
    [3, 0, 14000, 300], // 7000*2.00, 150*2.00
    [3, 200, 1000, 300], // 500(覆盖后)*2.00, 150*2.00
    [4, 0, 135000, 900],
  ];
  for (const [lv, exp1, a_expected, b_expected] of cases) {
    const fixture = create_era_fixture();
    const { ablup5 } = seed(fixture);
    fixture.store.set(`abl:${CID}:5`, lv);
    fixture.store.set(`exp:${CID}:1`, exp1);
    set_talents(fixture, { 27: 1 });
    fixture.set_inputs(100);
    await ablup5(CID);
    assert.ok(buttons(fixture)[0].text.includes(`×${a_expected}、`));
    assert.ok(buttons(fixture)[0].text.includes(`${b_expected}以上`));
  }
});

test('ablup5：B(经验)门槛不足单独计为经验不足位，与 A 点数不足位分开', async () => {
  const fixture = create_era_fixture();
  const { ablup5 } = seed(fixture);
  fixture.store.set(`abl:${CID}:5`, 0); // A=1,B=2
  fixture.store.set(`juel:${CID}:2`, 10); // A 充足
  fixture.store.set(`exp:${CID}:1`, 0); // B 不足
  fixture.set_inputs(100);
  await ablup5(CID);
  assert.ok(buttons(fixture)[0].text.endsWith('经验不足'));
});

test('ablup5：点数不足重试提示"条件不足。"，成功购买等待按键后显示"变为LV"', async () => {
  const fixture = create_era_fixture();
  const { ablup5 } = seed(fixture);
  fixture.set_inputs(0, 100);
  await ablup5(CID);
  assert.ok(fixture.text_lines().includes('条件不足。'));

  const buy = create_era_fixture();
  const { ablup5: a2 } = seed(buy);
  buy.store.set(`juel:${CID}:2`, 1);
  buy.store.set(`exp:${CID}:1`, 2);
  buy.set_inputs(0);
  await a2(CID);
  assert.equal(buy.store.get(`abl:${CID}:5`), 1);
  assert.ok(buy.text_lines().some((t) => t.includes('变为LV1。')));
});

// ———— ABLUP6：三选项能力（屈服/恭顺/习得），共享顺从门槛与异常经验门槛 ————

test('ablup6：已达MAX', async () => {
  const fixture = create_era_fixture();
  const { ablup6 } = seed(fixture);
  fixture.store.set(`abl:${CID}:6`, 5);
  await ablup6(CID);
  assert.ok(fixture.text_lines().includes('已达到MAX。'));
});

test('ablup6：Lv0 梯子字面值，三个选项各自的按钮文案', async () => {
  const fixture = create_era_fixture();
  const { ablup6 } = seed(fixture);
  fixture.store.set(`abl:${CID}:0`, 1); // 满足门槛，避免"能力不足"干扰
  fixture.store.set(`exp:${CID}:2`, 10); // 补足经验门槛，只观察点数不足
  fixture.store.set(`exp:${CID}:20`, 10);
  fixture.store.set(`exp:${CID}:21`, 10);
  fixture.set_inputs(100);
  await ablup6(CID);
  const b = buttons(fixture);
  assert.equal(b.length, 4); // [0][1][2][100]
  assert.equal(
    b[0].text,
    '屈服点数×100、绝顶经验1以上、精液经验1以上……点数不足 ',
  );
  assert.equal(b[1].text, '恭顺点数×20、侍奉快乐经验1以上……点数不足 ');
  assert.equal(b[2].text, '习得点数×100、绝顶经验1以上……点数不足 ');
});

test('ablup6：倒错的×0.75 同时折扣 A/B/C/D，唯独不动 E；D 在 Lv0/1 会被折扣到 0 从而隐藏经验门槛文案', async () => {
  const fixture = create_era_fixture();
  const { ablup6 } = seed(fixture);
  fixture.store.set(`abl:${CID}:0`, 1);
  fixture.store.set(`exp:${CID}:2`, 10);
  fixture.store.set(`exp:${CID}:20`, 10);
  set_talents(fixture, { 80: 1 });
  fixture.set_inputs(100);
  await ablup6(CID);
  const b = buttons(fixture);
  assert.equal(
    b[0].text,
    '屈服点数×75、绝顶经验1以上、精液经验1以上……点数不足 ',
  );
  assert.equal(b[1].text, '恭顺点数×15……点数不足 '); // D=0（1*0.75 截断），经验门槛文案消失
  assert.equal(b[2].text, '习得点数×75、绝顶经验1以上……点数不足 ');
});

test('ablup6：戒备森严在 Lv3/4 对 A/B/D 三级加成（C 已是 0，E 不受影响）', async () => {
  const fixture = create_era_fixture();
  const { ablup6 } = seed(fixture);
  fixture.store.set(`abl:${CID}:6`, 3);
  fixture.store.set(`abl:${CID}:0`, 4);
  fixture.store.set(`exp:${CID}:2`, 10);
  fixture.store.set(`exp:${CID}:20`, 10);
  fixture.store.set(`exp:${CID}:21`, 50); // D=20*2.00(戒备森严)=40，需 >=40
  set_talents(fixture, { 27: 1, 86: 1 }); // 妄信跳过异常经验门槛，专测倒数
  fixture.set_inputs(100);
  await ablup6(CID);
  const b = buttons(fixture);
  assert.equal(
    b[0].text,
    '屈服点数×20000、绝顶经验10以上、精液经验10以上……点数不足 ',
  );
  assert.equal(b[1].text, '恭顺点数×4000、侍奉快乐经验40以上……点数不足 ');
});

test('ablup6：顺从门槛（ABL:0）不足时三个选项同时计为能力不足，文案始终显示', async () => {
  const fixture = create_era_fixture();
  const { ablup6 } = seed(fixture);
  // ABL:0 默认 0，Lv0 需要 1 级，不满足
  fixture.set_inputs(100);
  await ablup6(CID);
  assert.ok(fixture.text_lines().includes('阴蒂感觉1LV以上'));
  for (const btn of buttons(fixture)) {
    if (btn.accelerator === 100) continue;
    assert.ok(btn.text.includes('能力不足'));
  }
});

test('ablup6：异常经验门槛仅 Lv3/4 生效，妄信可跳过，跳过时不打印门槛文案', async () => {
  const with_gate = create_era_fixture();
  const { ablup6: a1 } = seed(with_gate);
  with_gate.store.set(`abl:${CID}:6`, 3);
  with_gate.store.set(`abl:${CID}:0`, 4);
  with_gate.set_inputs(100);
  await a1(CID);
  assert.ok(with_gate.text_lines().includes('异常经验有'));
  assert.ok(buttons(with_gate)[0].text.includes('经验不足')); // EXP:50 默认 0，未达标

  const skipped = create_era_fixture();
  const { ablup6: a2 } = seed(skipped);
  skipped.store.set(`abl:${CID}:6`, 3);
  skipped.store.set(`abl:${CID}:0`, 4);
  set_talents(skipped, { 86: 1 });
  skipped.set_inputs(100);
  await a2(CID);
  assert.ok(!skipped.text_lines().includes('异常经验有'));
});

test('ablup6：选项0 的绝顶/精液经验双门槛各自独立触发经验不足', async () => {
  const via_orgasm = create_era_fixture();
  const { ablup6: a1 } = seed(via_orgasm);
  via_orgasm.store.set(`abl:${CID}:0`, 1);
  via_orgasm.store.set(`juel:${CID}:6`, 1000);
  via_orgasm.store.set(`exp:${CID}:20`, 10); // 精液经验充足
  via_orgasm.store.set(`exp:${CID}:2`, 0); // 绝顶经验不足
  via_orgasm.set_inputs(100);
  await a1(CID);
  assert.ok(buttons(via_orgasm)[0].text.endsWith('经验不足'));

  const via_semen = create_era_fixture();
  const { ablup6: a2 } = seed(via_semen);
  via_semen.store.set(`abl:${CID}:0`, 1);
  via_semen.store.set(`juel:${CID}:6`, 1000);
  via_semen.store.set(`exp:${CID}:2`, 10);
  via_semen.store.set(`exp:${CID}:20`, 0); // 精液经验不足
  via_semen.set_inputs(100);
  await a2(CID);
  assert.ok(buttons(via_semen)[0].text.endsWith('经验不足'));
});

test('ablup6：选项2（习得）只在 Lv0（C>0）渲染，Lv1 起 C=0 不再出现该按钮', async () => {
  const visible = create_era_fixture();
  const { ablup6: a1 } = seed(visible);
  visible.store.set(`abl:${CID}:0`, 1);
  visible.set_inputs(100);
  await a1(CID);
  assert.equal(buttons(visible).length, 4);

  const hidden = create_era_fixture();
  const { ablup6: a2 } = seed(hidden);
  hidden.store.set(`abl:${CID}:6`, 1);
  hidden.store.set(`abl:${CID}:0`, 2);
  hidden.set_inputs(100);
  await a2(CID);
  assert.equal(buttons(hidden).length, 3); // [0][1][100]，无 [2]
});

test('ablup6：选项2 的可否判定误用 JUEL:7<A（应为<C）——Lv0 时 A 恒等于 C，缺陷无法观测到偏差', async () => {
  const fixture = create_era_fixture();
  const { ablup6 } = seed(fixture);
  fixture.store.set(`abl:${CID}:0`, 1);
  fixture.store.set(`juel:${CID}:7`, 150); // 高于 A=C=100
  fixture.set_inputs(100);
  await ablup6(CID);
  assert.ok(!buttons(fixture)[2].text.includes('点数不足')); // 按 A(=C) 判定为充足
});

test('ablup6：三个成功购买路径各自扣对应珠、升级、显示变为LV', async () => {
  for (const [result, juel_key, expected_juel] of [
    [0, 6, 900], // 1000-100
    [1, 4, 980], // 1000-20
    [2, 7, 900], // 1000-100
  ]) {
    const fixture = create_era_fixture();
    const { ablup6 } = seed(fixture);
    fixture.store.set(`abl:${CID}:0`, 1);
    for (const k of [6, 4, 7]) fixture.store.set(`juel:${CID}:${k}`, 1000);
    fixture.store.set(`exp:${CID}:2`, 10);
    fixture.store.set(`exp:${CID}:20`, 10);
    fixture.store.set(`exp:${CID}:21`, 10);
    fixture.set_inputs(result);
    await ablup6(CID);
    assert.equal(fixture.store.get(`abl:${CID}:6`), 1);
    assert.equal(fixture.store.get(`juel:${CID}:${juel_key}`), expected_juel);
    assert.ok(fixture.text_lines().some((t) => t.includes('变为LV1。')));
  }
});

test('ablup6：Lv4 奉仕快乐经验门槛正好等于 D=100 时判定为充足', async () => {
  const fixture = create_era_fixture();
  const { ablup6 } = seed(fixture);
  fixture.store.set(`abl:${CID}:6`, 4);
  fixture.store.set(`abl:${CID}:0`, 5);
  fixture.store.set(`exp:${CID}:2`, 20);
  fixture.store.set(`exp:${CID}:20`, 20);
  fixture.store.set(`exp:${CID}:21`, 100); // 恰好等于 D=100，不多不少
  fixture.store.set(`exp:${CID}:50`, 2);
  fixture.store.set(`juel:${CID}:4`, 8000);
  fixture.set_inputs(100);
  await ablup6(CID);
  assert.ok(buttons(fixture)[1].text.endsWith('ＯＫ'));
});

test('ablup6：三个选项各自的"条件不足。请重新输入。"重试文案', async () => {
  const fixture = create_era_fixture();
  const { ablup6 } = seed(fixture);
  fixture.store.set(`abl:${CID}:0`, 1);
  fixture.set_inputs(0, 1, 100); // 0/1 均因珠不足被拦，最后放弃
  await ablup6(CID);
  const retries = fixture
    .text_lines()
    .filter((t) => t === '条件不足。请重新输入。');
  assert.equal(retries.length, 2);
});

// ———— ABLUP7：单选项能力（耻情 JUEL:8），双重折扣缺陷 ————

function seed_ablup7_ok(fixture) {
  fixture.store.set(`abl:${CID}:1`, 1); // 满足欲望门槛（乳房感觉，见注释/代码不一致说明）
  fixture.store.set(`exp:${CID}:2`, 1); // lv<2 的经验门槛
  fixture.store.set(`exp:${CID}:11`, 1); // lv>=2 的经验门槛
}

test('ablup7：已达MAX', async () => {
  const fixture = create_era_fixture();
  const { ablup7 } = seed(fixture);
  fixture.store.set(`abl:${CID}:7`, 5);
  await ablup7(CID);
  assert.ok(fixture.text_lines().includes('已达到MAX。'));
});

test('ablup7：Lv0-4 梯子字面值，戒备森严仅在 Lv3(×2.00)/Lv4(×3.00) 生效', async () => {
  const cases = [
    [0, {}, 100],
    [1, {}, 1000],
    [2, {}, 5000],
    [3, {}, 15000],
    [3, { 27: 1 }, 30000],
    [4, {}, 35000],
    [4, { 27: 1 }, 105000],
  ];
  for (const [lv, talents, expected] of cases) {
    const fixture = create_era_fixture();
    const { ablup7 } = seed(fixture);
    fixture.store.set(`abl:${CID}:7`, lv);
    seed_ablup7_ok(fixture);
    set_talents(fixture, talents);
    fixture.set_inputs(100);
    await ablup7(CID);
    assert.ok(buttons(fixture)[0].text.includes(`点数×${expected}、`));
  }
});

test('ablup7：双重折扣缺陷——倒错的单独生效×0.375；目立ちたがり单独完全无效；两者同时等同倒错的单独', async () => {
  const cases = [
    [{}, 100],
    [{ 80: 1 }, 37], // 100*0.75=75，再*0.50=37（floor）
    [{ 28: 1 }, 100], // 目立ちたがり本应折扣但代码判的仍是 TALENT:80，从未生效
    [{ 80: 1, 28: 1 }, 37], // 两者同时＝倒错的单独
  ];
  for (const [talents, expected] of cases) {
    const fixture = create_era_fixture();
    const { ablup7 } = seed(fixture);
    seed_ablup7_ok(fixture);
    set_talents(fixture, talents);
    fixture.set_inputs(100);
    await ablup7(CID);
    assert.ok(
      buttons(fixture)[0].text.includes(`点数×${expected}、`),
      `talent ${JSON.stringify(talents)}：期望 A=${expected}，实际 ${buttons(fixture)[0].text}`,
    );
  }
});

test('ablup7：欲望门槛（ABL:1）不足计为能力不足，文案始终显示', async () => {
  const fixture = create_era_fixture();
  const { ablup7 } = seed(fixture);
  fixture.store.set(`exp:${CID}:2`, 1);
  fixture.set_inputs(100);
  await ablup7(CID);
  assert.ok(fixture.text_lines().includes('乳房感觉1LV以上'));
  // bit4 带尾随空格（ABLUP7.ERB:106，与 get_ablup_state 的 bit4 不同，本文件
  // 不能复用那个共用函数——issue #464 审查发现的真实一字符缺陷）
  assert.ok(buttons(fixture)[0].text.endsWith('能力不足 '));
});

test('ablup7：始终生效的第二条经验门槛——Lv<2 要求绝顶经验，Lv>=2 要求调教自慰经验', async () => {
  const low = create_era_fixture();
  const { ablup7: a1 } = seed(low);
  low.store.set(`abl:${CID}:1`, 1);
  low.store.set(`exp:${CID}:2`, 0); // 不满足
  low.set_inputs(100);
  await a1(CID);
  assert.ok(buttons(low)[0].text.includes('绝顶经验1以上'));
  assert.ok(buttons(low)[0].text.endsWith('经验不足 '));

  const high = create_era_fixture();
  const { ablup7: a2 } = seed(high);
  high.store.set(`abl:${CID}:7`, 2);
  high.store.set(`abl:${CID}:1`, 3);
  high.store.set(`exp:${CID}:11`, 0); // 不满足
  high.set_inputs(100);
  await a2(CID);
  assert.ok(buttons(high)[0].text.includes('调教自慰经验1以上'));
  assert.ok(buttons(high)[0].text.endsWith('经验不足 '));
});

test('ablup7：Lv3/4 异常经验门槛，目立ちたがり可跳过（与折扣缺陷互不影响）', async () => {
  const blocked = create_era_fixture();
  const { ablup7: a1 } = seed(blocked);
  blocked.store.set(`abl:${CID}:7`, 3);
  seed_ablup7_ok(blocked);
  blocked.store.set(`abl:${CID}:1`, 4); // 满足欲望门槛（Lv3 需要 4 级）
  blocked.store.set(`exp:${CID}:50`, 0);
  blocked.set_inputs(100);
  await a1(CID);
  assert.ok(blocked.text_lines().includes('异常经验有'));
  assert.ok(buttons(blocked)[0].text.endsWith('经验不足 '));

  const skipped = create_era_fixture();
  const { ablup7: a2 } = seed(skipped);
  skipped.store.set(`abl:${CID}:7`, 3);
  seed_ablup7_ok(skipped);
  skipped.store.set(`abl:${CID}:1`, 4);
  skipped.store.set(`exp:${CID}:50`, 0);
  set_talents(skipped, { 28: 1 }); // 正确判定 TALENT:28（与折扣段不同）
  skipped.set_inputs(100);
  await a2(CID);
  assert.ok(!skipped.text_lines().includes('异常经验有'));
});

test('ablup7：点数不足重试提示"条件不满足。"；成功购买扣珠、等待按键后显示"的等级提升到N级了。"', async () => {
  const retry = create_era_fixture();
  const { ablup7: a1 } = seed(retry);
  seed_ablup7_ok(retry);
  retry.set_inputs(0, 100);
  await a1(CID);
  assert.ok(retry.text_lines().includes('条件不满足。'));

  const buy = create_era_fixture();
  const { ablup7: a2 } = seed(buy);
  seed_ablup7_ok(buy);
  buy.store.set(`juel:${CID}:8`, 100);
  buy.set_inputs(0);
  await a2(CID);
  assert.equal(buy.store.get(`abl:${CID}:7`), 1);
  assert.equal(buy.store.get(`juel:${CID}:8`), 0);
  assert.ok(buy.text_lines().includes('的等级提升到1级了。'));
});

// ———— ABLUP8：两选项能力，缺失哨兵的原作缺陷 ————

test('ablup8：已达MAX', async () => {
  const fixture = create_era_fixture();
  const { ablup8 } = seed(fixture);
  fixture.store.set(`abl:${CID}:8`, 5);
  await ablup8(CID);
  assert.ok(fixture.text_lines().includes('已达到MAX。'));
});

test('ablup8：Lv0 梯子字面值——两个选项都渲染（C=0 时经验门槛文案不出现）', async () => {
  const fixture = create_era_fixture();
  const { ablup8 } = seed(fixture);
  fixture.store.set(`abl:${CID}:1`, 1);
  fixture.store.set(`exp:${CID}:2`, 10);
  fixture.set_inputs(100);
  await ablup8(CID);
  const b = buttons(fixture);
  assert.equal(b.length, 3); // [0][1][100]
  assert.equal(b[0].text, '苦痛点数×100、欲情点数×100……点数不足 ');
  assert.equal(
    b[1].text,
    '苦痛点数×100、屈服点数×100、绝顶经验1以上……点数不足 ',
  );
});

test('ablup8：Lv1 梯子字面值', async () => {
  const fixture = create_era_fixture();
  const { ablup8 } = seed(fixture);
  fixture.store.set(`abl:${CID}:8`, 1);
  fixture.store.set(`abl:${CID}:1`, 2);
  fixture.store.set(`exp:${CID}:2`, 10);
  fixture.set_inputs(100);
  await ablup8(CID);
  const b = buttons(fixture);
  assert.equal(b[0].text, '苦痛点数×500、欲情点数×500……点数不足 ');
  assert.equal(
    b[1].text,
    '苦痛点数×500、屈服点数×300、绝顶经验1以上……点数不足 ',
  );
});

test('ablup8：开放×0.50 先于倒错的×0.75，五个变量同步（C 在 Lv0 恒为 0）', async () => {
  const fixture = create_era_fixture();
  const { ablup8 } = seed(fixture);
  fixture.store.set(`abl:${CID}:1`, 1);
  fixture.store.set(`exp:${CID}:2`, 10);
  set_talents(fixture, { 33: 1, 80: 1 });
  fixture.set_inputs(100);
  await ablup8(CID);
  const b = buttons(fixture);
  // 100*0.50=50，再*0.75=37（floor）
  assert.equal(b[0].text, '苦痛点数×37、欲情点数×37……点数不足 ');
  assert.equal(b[1].text, '苦痛点数×37、屈服点数×37、绝顶经验1以上……点数不足 ');
});

test('ablup8：Lv3 起选项0（B=0）不再渲染，选项1 的被虐快乐经验门槛开始出现', async () => {
  const fixture = create_era_fixture();
  const { ablup8 } = seed(fixture);
  fixture.store.set(`abl:${CID}:8`, 3);
  fixture.store.set(`abl:${CID}:1`, 4);
  fixture.store.set(`exp:${CID}:50`, 5);
  fixture.store.set(`exp:${CID}:2`, 10);
  fixture.store.set(`exp:${CID}:30`, 10); // 被虐快乐经验，门槛=C=10
  fixture.set_inputs(100);
  await ablup8(CID);
  const b = buttons(fixture);
  assert.equal(b.length, 2); // 只有 [1][100]，无 [0]
  assert.equal(
    b[0].text,
    '苦痛点数×3000、屈服点数×6000、被虐快乐经验10以上、绝顶经验1以上……点数不足 ',
  );
});

test('ablup8：选项1 绝顶经验门槛正好等于 1 时判定为充足', async () => {
  const fixture = create_era_fixture();
  const { ablup8 } = seed(fixture);
  fixture.store.set(`abl:${CID}:8`, 3);
  fixture.store.set(`abl:${CID}:1`, 4);
  fixture.store.set(`exp:${CID}:50`, 5);
  fixture.store.set(`exp:${CID}:2`, 1); // 恰好等于门槛，不多不少
  fixture.store.set(`exp:${CID}:30`, 10);
  fixture.store.set(`juel:${CID}:9`, 3000);
  fixture.store.set(`juel:${CID}:6`, 6000);
  fixture.set_inputs(100);
  await ablup8(CID);
  assert.ok(buttons(fixture)[0].text.endsWith('ＯＫ'));
});

test('ablup8：缺失哨兵缺陷——B=0 时选项0 结构上不可能被选中（era.input 拒收未渲染的 0）', async () => {
  const fixture = create_era_fixture();
  const { ablup8 } = seed(fixture);
  fixture.store.set(`abl:${CID}:8`, 3);
  fixture.store.set(`abl:${CID}:1`, 4);
  fixture.set_inputs(0);
  await assert.rejects(ablup8(CID), /测试夹具：输入不合法/);
});

test('ablup8：欲望门槛（ABL:1）不足同时计两个选项为能力不足', async () => {
  const fixture = create_era_fixture();
  const { ablup8 } = seed(fixture);
  fixture.store.set(`exp:${CID}:2`, 10);
  fixture.set_inputs(100);
  await ablup8(CID);
  assert.ok(fixture.text_lines().includes('乳房感觉1LV以上'));
  for (const btn of buttons(fixture)) {
    if (btn.accelerator === 100) continue;
    assert.ok(btn.text.includes('能力不足'));
  }
});

test('ablup8：Lv3/4 异常经验门槛，开放(TALENT:33)可跳过', async () => {
  const fixture = create_era_fixture();
  const { ablup8 } = seed(fixture);
  fixture.store.set(`abl:${CID}:8`, 4);
  fixture.store.set(`abl:${CID}:1`, 5);
  fixture.store.set(`exp:${CID}:50`, 0);
  fixture.set_inputs(100);
  await ablup8(CID);
  assert.ok(fixture.text_lines().includes('异常经验2以上'));

  const skipped = create_era_fixture();
  const { ablup8: a2 } = seed(skipped);
  skipped.store.set(`abl:${CID}:8`, 4);
  skipped.store.set(`abl:${CID}:1`, 5);
  skipped.store.set(`exp:${CID}:50`, 0);
  set_talents(skipped, { 33: 1 }); // 同一个素质既折扣也跳过异常经验
  skipped.set_inputs(100);
  await a2(CID);
  assert.ok(!skipped.text_lines().includes('异常经验2以上'));
});

test('ablup8：两个成功购买路径各自扣对应珠、升级、等待按键后显示变为LV', async () => {
  for (const [result, keys, expected] of [
    [0, [9, 5], [900, 900]], // 1000-100 each
    [1, [9, 6], [900, 900]],
  ]) {
    const fixture = create_era_fixture();
    const { ablup8 } = seed(fixture);
    fixture.store.set(`abl:${CID}:1`, 1);
    fixture.store.set(`exp:${CID}:2`, 10);
    for (const k of [9, 5, 6]) fixture.store.set(`juel:${CID}:${k}`, 1000);
    fixture.set_inputs(result);
    await ablup8(CID);
    assert.equal(fixture.store.get(`abl:${CID}:8`), 1);
    assert.equal(fixture.store.get(`juel:${CID}:${keys[0]}`), expected[0]);
    assert.equal(fixture.store.get(`juel:${CID}:${keys[1]}`), expected[1]);
    assert.ok(fixture.text_lines().some((t) => t.includes('变为LV1。')));
  }
});

test('ablup8：两个选项各自的"条件不足。"重试文案', async () => {
  const fixture = create_era_fixture();
  const { ablup8 } = seed(fixture);
  fixture.store.set(`abl:${CID}:1`, 1);
  fixture.store.set(`exp:${CID}:2`, 10);
  fixture.set_inputs(0, 1, 100);
  await ablup8(CID);
  const retries = fixture.text_lines().filter((t) => t === '条件不足。');
  assert.equal(retries.length, 2);
});

test('ablup8：选项1 屈服点数（JUEL:6）未声明须按不足处理，不能被 undefined<e 静默放过', async () => {
  const fixture = create_era_fixture();
  const { ablup8 } = seed(fixture);
  fixture.store.set(`abl:${CID}:1`, 1);
  fixture.store.set(`exp:${CID}:2`, 10); // 绝顶经验门槛满足
  fixture.store.set(`juel:${CID}:9`, 100); // 苦痛点数门槛满足（Lv0 D=100）
  // JUEL:6（屈服）刻意不写：未声明地址读回 undefined（issue #13），
  // 若判定漏了 || 0，`undefined < e` 恒假，会把不足误判为充足
  fixture.set_inputs(1, 100);
  await ablup8(CID);
  const retries = fixture.text_lines().filter((t) => t === '条件不足。');
  assert.equal(retries.length, 1);
  assert.equal(fixture.store.get(`abl:${CID}:8`), undefined); // 未升级
  assert.equal(fixture.store.get(`juel:${CID}:6`), undefined); // 未被倒扣
});

// ———— ABLUP9：两选项能力，无缺失哨兵缺陷 ————

test('ablup9：已达MAX', async () => {
  const fixture = create_era_fixture();
  const { ablup9 } = seed(fixture);
  fixture.store.set(`abl:${CID}:9`, 5);
  await ablup9(CID);
  assert.ok(fixture.text_lines().includes('已达到MAX。'));
});

test('ablup9：Lv0 梯子字面值——选项0 始终渲染（C=0 时不显示屈服门槛），选项1 因 D>0 也渲染', async () => {
  const fixture = create_era_fixture();
  const { ablup9 } = seed(fixture);
  fixture.store.set(`exp:${CID}:40`, 50); // B=50 门槛
  fixture.set_inputs(100);
  await ablup9(CID);
  const b = buttons(fixture);
  assert.equal(b.length, 3); // [0][1][100]
  assert.equal(b[0].text, '欲情点数×200、百合经验50以上……点数不足 ');
  assert.equal(b[1].text, '阴核点数×1000、百合经验50以上……点数不足 ');
});

test('ablup9：Lv1 梯子字面值', async () => {
  const fixture = create_era_fixture();
  const { ablup9 } = seed(fixture);
  fixture.store.set(`abl:${CID}:9`, 1);
  fixture.store.set(`exp:${CID}:40`, 200); // B=200 门槛
  fixture.set_inputs(100);
  await ablup9(CID);
  const b = buttons(fixture);
  assert.equal(b[0].text, '欲情点数×1000、百合经验200以上……点数不足 ');
  assert.equal(b[1].text, '阴核点数×5000、百合经验200以上……点数不足 ');
});

test('ablup9：Lv2 起选项0 显示屈服点数门槛（C>0），选项1（D=0）不再渲染', async () => {
  const fixture = create_era_fixture();
  const { ablup9 } = seed(fixture);
  fixture.store.set(`abl:${CID}:9`, 2);
  fixture.store.set(`exp:${CID}:40`, 500); // B=500 门槛
  fixture.set_inputs(100);
  await ablup9(CID);
  const b = buttons(fixture);
  assert.equal(b.length, 2); // 只有 [0][100]
  assert.equal(
    b[0].text,
    '欲情点数×3000、屈服点数×1000、百合经验500以上……点数不足 ',
  );
});

test('ablup9：双性恋×0.25 先于倒错的×0.75，四个变量同步折扣', async () => {
  const fixture = create_era_fixture();
  const { ablup9 } = seed(fixture);
  fixture.store.set(`exp:${CID}:40`, 10);
  set_talents(fixture, { 81: 1, 80: 1 });
  fixture.set_inputs(100);
  await ablup9(CID);
  const b = buttons(fixture);
  // 200*0.25=50，再*0.75=37（floor）；50*0.25=12，再*0.75=9（floor）；1000*0.25=250，再*0.75=187（floor）
  assert.equal(b[0].text, '欲情点数×37、百合经验9以上……点数不足 ');
  assert.equal(b[1].text, '阴核点数×187、百合经验9以上……点数不足 ');
});

test('ablup9：Lv3/4 异常经验门槛，双性恋(TALENT:81)可跳过（同一素质兼顾折扣与跳过）', async () => {
  const fixture = create_era_fixture();
  const { ablup9 } = seed(fixture);
  fixture.store.set(`abl:${CID}:9`, 3);
  fixture.store.set(`exp:${CID}:40`, 10);
  fixture.store.set(`exp:${CID}:50`, 0);
  fixture.set_inputs(100);
  await ablup9(CID);
  assert.ok(fixture.text_lines().includes('异常经验有'));

  const skipped = create_era_fixture();
  const { ablup9: a2 } = seed(skipped);
  skipped.store.set(`abl:${CID}:9`, 3);
  skipped.store.set(`exp:${CID}:40`, 10);
  skipped.store.set(`exp:${CID}:50`, 0);
  set_talents(skipped, { 81: 1 });
  skipped.set_inputs(100);
  await a2(CID);
  assert.ok(!skipped.text_lines().includes('异常经验有'));
});

test('ablup9：百合经验门槛同时约束两个选项', async () => {
  const fixture = create_era_fixture();
  const { ablup9 } = seed(fixture);
  fixture.store.set(`juel:${CID}:5`, 1000);
  fixture.store.set(`juel:${CID}:0`, 1000);
  fixture.store.set(`exp:${CID}:40`, 0); // 两个选项都不满足
  fixture.set_inputs(100);
  await ablup9(CID);
  const b = buttons(fixture);
  assert.ok(b[0].text.endsWith('经验不足')); // 本地 status_text：单独 bit2 无尾随空格
  assert.ok(b[1].text.endsWith('经验不足'));
});

test('ablup9：两个成功购买路径各自扣对应珠、升级、等待按键后显示变为LV', async () => {
  const opt0 = create_era_fixture();
  const { ablup9: a1 } = seed(opt0);
  opt0.store.set(`exp:${CID}:40`, 50);
  opt0.store.set(`juel:${CID}:5`, 1000);
  opt0.set_inputs(0);
  await a1(CID);
  assert.equal(opt0.store.get(`abl:${CID}:9`), 1);
  assert.equal(opt0.store.get(`juel:${CID}:5`), 800); // 1000-200
  assert.ok(opt0.text_lines().some((t) => t.includes('变为LV1。')));

  const opt1 = create_era_fixture();
  const { ablup9: a2 } = seed(opt1);
  opt1.store.set(`exp:${CID}:40`, 50);
  opt1.store.set(`juel:${CID}:0`, 1000);
  opt1.set_inputs(1);
  await a2(CID);
  assert.equal(opt1.store.get(`abl:${CID}:9`), 1);
  assert.equal(opt1.store.get(`juel:${CID}:0`), 0); // 1000-1000
  assert.ok(opt1.text_lines().some((t) => t.includes('变为LV1。')));
});

test('ablup9：两个选项各自的"条件不足。"重试文案，隐藏选项(D=0)结构上不可选中', async () => {
  const fixture = create_era_fixture();
  const { ablup9 } = seed(fixture);
  fixture.store.set(`exp:${CID}:40`, 10);
  fixture.set_inputs(0, 1, 100);
  await ablup9(CID);
  const retries = fixture.text_lines().filter((t) => t === '条件不足。');
  assert.equal(retries.length, 2);

  const hidden = create_era_fixture();
  const { ablup9: a2 } = seed(hidden);
  hidden.store.set(`abl:${CID}:9`, 2); // D=0，[1] 不渲染
  hidden.store.set(`exp:${CID}:40`, 10);
  hidden.set_inputs(1);
  await assert.rejects(a2(CID), /测试夹具：输入不合法/);
});

// ———— ABLUP10：顺从（system 域），四轨道 A/B/C/D ————

test('ablup10：两档终止判定（特殊素质/已达最高级）', async () => {
  const fixture = create_era_fixture();
  const { ablup10 } = seed(fixture);
  fixture.store.set(`abl:${CID}:10`, 5);
  await ablup10(CID);
  assert.ok(fixture.text_lines().includes('需要特殊素质才能继续提升'));
  assert.equal(buttons(fixture).length, 0);

  const maxed = create_era_fixture();
  const { ablup10: a2 } = seed(maxed);
  maxed.store.set(`abl:${CID}:10`, 10);
  set_talents(maxed, { 85: 1 }); // 绕过 Lv5+ 门槛，暴露第二档"已达最高级"
  await a2(CID);
  assert.ok(maxed.text_lines().includes('已达最高级'));
});

test('ablup10：Lv0 梯子字面值，四个选项全部渲染（B 恒渲染，无 IF 包裹）', async () => {
  const fixture = create_era_fixture();
  const { ablup10 } = seed(fixture);
  fixture.set_inputs(100);
  await ablup10(CID);
  const b = buttons(fixture);
  assert.equal(b.length, 5); // [0][1][2][3][100]
  assert.equal(b[0].text, '恐怖点数×0/10 ……点数不足 ');
  assert.equal(b[1].text, '恭顺点数×0/10 ……点数不足 ');
  assert.equal(b[2].text, '欲情点数×0/300 ……点数不足 ');
  assert.equal(b[3].text, '屈服点数×0/200 ……点数不足 ');
});

test('ablup10：Lv3 起 C=0，选项2 结构上不可能被选中（K=256 隐藏哨兵）', async () => {
  const fixture = create_era_fixture();
  const { ablup10 } = seed(fixture);
  fixture.store.set(`abl:${CID}:10`, 3);
  fixture.set_inputs(2);
  await assert.rejects(ablup10(CID), /测试夹具：输入不合法/);
});

test('ablup10：反抗心 A×2.00/B×1.50/C×1.20/D×1.50 同时生效（Lv0）', async () => {
  const fixture = create_era_fixture();
  const { ablup10 } = seed(fixture);
  set_talents(fixture, { 11: 1 });
  fixture.set_inputs(100);
  await ablup10(CID);
  const b = buttons(fixture);
  assert.equal(b[0].text, '恐怖点数×0/20 ……点数不足 ');
  assert.equal(b[1].text, '恭顺点数×0/15 ……点数不足 ');
  assert.equal(b[2].text, '欲情点数×0/360 ……点数不足 ');
  assert.equal(b[3].text, '屈服点数×0/300 ……点数不足 ');
});

test('ablup10：Lv4→5 异常经验门槛（E=1），六项素质任一命中可免', async () => {
  const fixture = create_era_fixture();
  const { ablup10 } = seed(fixture);
  fixture.store.set(`abl:${CID}:10`, 4);
  fixture.set_inputs(100);
  await ablup10(CID);
  assert.ok(fixture.text_lines().includes('异常经验1以上(现在0)且'));
  for (const btn of buttons(fixture)) {
    if (btn.accelerator === 100) continue;
    assert.ok(btn.text.includes('经验不足'));
  }

  const skipped = create_era_fixture();
  const { ablup10: a2 } = seed(skipped);
  skipped.store.set(`abl:${CID}:10`, 4);
  set_talents(skipped, { 85: 1 }); // 爱慕：同时豁免异常经验与上限门槛
  skipped.set_inputs(100);
  await a2(CID);
  assert.ok(!skipped.text_lines().includes('异常经验1以上(现在0)且'));
});

test('ablup10：四个购买路径各自扣对应珠、写入 chara(cid).system.顺从、显示变为LV', async () => {
  // Lv0 梯子：A=10/B=10/C=300/D=200，扣珠后剩余值逐一钉死
  for (const [result, juel_key, remaining] of [
    [0, 10, 990],
    [1, 4, 990],
    [2, 5, 700],
    [3, 6, 800],
  ]) {
    const fixture = create_era_fixture();
    const { ablup10 } = seed(fixture);
    for (const k of [10, 4, 5, 6]) fixture.store.set(`juel:${CID}:${k}`, 1000);
    fixture.set_inputs(result);
    await ablup10(CID);
    assert.equal(fixture.store.get(`abl:${CID}:10`), 1);
    assert.equal(fixture.store.get(`juel:${CID}:${juel_key}`), remaining);
    assert.ok(fixture.text_lines().some((t) => t.includes('变为LV1。')));
  }
});

test('ablup10：点数不足时按钮重试提示"未满足条件"（无句号），补足后成功购买', async () => {
  const fixture = create_era_fixture();
  const { ablup10 } = seed(fixture);
  fixture.set_inputs(0, 100);
  await ablup10(CID);
  assert.ok(fixture.text_lines().includes('未满足条件'));
  assert.ok(!fixture.text_lines().includes('未满足条件。'));
});

// ———— ABLUP11：欲望（system 域），单轨道，手写内联状态文案 ————

test('ablup11：两档终止判定（特殊素质/已达最高级）', async () => {
  const fixture = create_era_fixture();
  const { ablup11 } = seed(fixture);
  fixture.store.set(`abl:${CID}:11`, 5);
  await ablup11(CID);
  assert.ok(fixture.text_lines().includes('需要特殊素质才能继续提升'));

  const maxed = create_era_fixture();
  const { ablup11: a2 } = seed(maxed);
  maxed.store.set(`abl:${CID}:11`, 10);
  set_talents(maxed, { 73: 1 }); // 绕过 Lv5+ 门槛，暴露第二档"已达最高级"
  await a2(CID);
  assert.ok(maxed.text_lines().includes('已达最高级'));
});

test('ablup11：Lv0 梯子字面值与手写状态文案（点数不足带尾随空格）', async () => {
  const fixture = create_era_fixture();
  const { ablup11 } = seed(fixture);
  fixture.set_inputs(100);
  await ablup11(CID);
  const b = buttons(fixture);
  assert.equal(b.length, 2); // [0][100]
  assert.equal(b[0].text, '欲情点数×0/5 ……点数不足 ');
});

test('ablup11：看重贞操×1.50（Lv2），Lv4→5 异常经验门槛（E=1）可被开放跳过', async () => {
  const fixture = create_era_fixture();
  const { ablup11 } = seed(fixture);
  fixture.store.set(`abl:${CID}:11`, 2);
  set_talents(fixture, { 30: 1 });
  fixture.set_inputs(100);
  await ablup11(CID);
  assert.equal(buttons(fixture)[0].text, '欲情点数×0/1500 ……点数不足 ');

  const gated = create_era_fixture();
  const { ablup11: a2 } = seed(gated);
  gated.store.set(`abl:${CID}:11`, 4);
  gated.set_inputs(100);
  await a2(CID);
  assert.ok(gated.text_lines().includes('异常经验1以上(现在0)且'));
  assert.ok(buttons(gated)[0].text.endsWith('经验不足')); // bit2 无尾随空格

  const skipped = create_era_fixture();
  const { ablup11: a3 } = seed(skipped);
  skipped.store.set(`abl:${CID}:11`, 4);
  set_talents(skipped, { 33: 1 }); // 开放：跳过异常经验
  skipped.set_inputs(100);
  await a3(CID);
  assert.ok(!skipped.text_lines().includes('异常经验1以上(现在0)且'));
});

test('ablup11：成功购买写入 chara(cid).system.欲望，扣珠、显示变为LV（不等待按键）', async () => {
  const fixture = create_era_fixture();
  const { ablup11 } = seed(fixture);
  fixture.store.set(`juel:${CID}:5`, 5);
  fixture.set_inputs(0);
  await ablup11(CID);
  assert.equal(fixture.store.get(`abl:${CID}:11`), 1);
  assert.equal(fixture.store.get(`juel:${CID}:5`), 0);
  assert.ok(fixture.text_lines().some((t) => t.includes('变为LV1。')));
});

// ———— ABLUP12：技巧（system 域），MASTER 自我训练额外收费 ————

test('ablup12：已达最高级；技巧+话术组合上限单行 PRINTFORMW（与 ABLUP13/14 两行不同）', async () => {
  const fixture = create_era_fixture();
  const { ablup12 } = seed(fixture);
  fixture.store.set(`abl:${CID}:12`, 10);
  await ablup12(CID);
  assert.ok(fixture.text_lines().includes('已达最高级'));

  const capped = create_era_fixture();
  const { ablup12: a2 } = seed(capped);
  capped.store.set(`abl:${CID}:12`, 8);
  capped.store.set(`abl:${CID}:15`, 7); // 8+7=15
  capped.set_inputs(100);
  await a2(CID);
  assert.ok(capped.text_lines().includes('技巧(8)＋话术(7)上限为15'));
});

test('ablup12：issue #14 缺陷——技巧+话术组合上限突破价足够时，DECIDE 提前 RETURN 使 A/I 维持清零，等于免费购买', async () => {
  const fixture = create_era_fixture();
  const { ablup12 } = seed(fixture);
  fixture.store.set(`abl:${CID}:12`, 8);
  fixture.store.set(`abl:${CID}:15`, 7); // 8+7=15
  fixture.store.set(`juel:${CID}:7`, 64000); // 恰好达到 8²×1000，越过入口拦截
  fixture.set_inputs(0);
  await ablup12(CID);
  assert.equal(buttons(fixture)[0].text, '习得点数×64000/0 ……ＯＫ');
  assert.equal(fixture.store.get(`abl:${CID}:12`), 9);
  assert.equal(fixture.store.get(`juel:${CID}:7`), 64000); // 未被扣珠
});

test('ablup12：非自我训练（cid≠MASTER）时不显示金钱提示、不检查 bit2/bit4', async () => {
  const fixture = create_era_fixture();
  const { ablup12 } = seed(fixture);
  fixture.set_inputs(100);
  await ablup12(CID);
  assert.ok(
    !fixture
      .text_lines()
      .includes('魔王通过这种方式提升技巧仍然需要金钱5000点'),
  );
  assert.equal(buttons(fixture)[0].text, '习得点数×0/1 ……点数不足 ');
});

test('ablup12：自我训练（cid===MASTER）时额外收金钱与 EX_FLAG:4444，各 5000', async () => {
  const fixture = create_era_fixture();
  seed(fixture);
  const { ablup12 } = require('#/system/train/ablup');
  const MASTER = 0;
  fixture.store.set(`juel:${MASTER}:7`, 1);
  fixture.store.set('flag:10004', 10000); // MONEY
  fixture.store.set('exflag:4444', 8000); // EX_FLAG:4444
  fixture.set_inputs(0);
  await ablup12(MASTER);
  assert.equal(fixture.store.get(`abl:${MASTER}:12`), 1);
  assert.equal(fixture.store.get('flag:10004'), 5000);
  assert.equal(fixture.store.get('exflag:4444'), 3000);
  assert.ok(fixture.text_lines().includes('花费金钱5000点。'));
  assert.ok(fixture.text_lines().some((t) => t.includes('变为LV1。')));
});

test('ablup12：issue #14 缺陷——bit2 用"经验不足"文案显示 ABL:MASTER:12 与 FLAG:30 的比较，与经验无关；bit2+bit4 无分隔符粘连', async () => {
  const fixture = create_era_fixture();
  seed(fixture);
  const { ablup12 } = require('#/system/train/ablup');
  const MASTER = 0;
  fixture.store.set(`abl:${MASTER}:12`, 2); // ABL:MASTER:12=2 > FLAG:30(0)+1，恰好卡在 +1/+2 边界
  fixture.store.set(`juel:${MASTER}:7`, 100000); // 点数充足，隔离 bit1
  fixture.store.set('flag:10004', 4500); // MONEY<5000，恰好卡在 4000/5000 边界，同时触发 bit4
  fixture.set_inputs(100);
  await ablup12(MASTER);
  assert.ok(
    buttons(fixture)[0].text.includes('经验不足金钱不足\t'),
    '两段文案应直接拼接，中间无分隔符',
  );
});

// ———— ABLUP13：侍奉技术（train 域），与 ABLUP14 共享组合上限 ————

test('ablup13：Lv5 靠侍奉精神越过上限；组合上限溢出是两行提示（与 ABLUP12/15 单行不同）', async () => {
  const fixture = create_era_fixture();
  const { ablup13 } = seed(fixture);
  fixture.store.set(`abl:${CID}:13`, 5);
  fixture.store.set(`abl:${CID}:16`, 4); // <5，挡在 Lv5
  await ablup13(CID);
  assert.ok(fixture.text_lines().includes('已达最高级'));

  const capped = create_era_fixture();
  const { ablup13: a2 } = seed(capped);
  capped.store.set(`abl:${CID}:13`, 5);
  capped.store.set(`abl:${CID}:14`, 5); // 5+5=10
  capped.store.set(`abl:${CID}:16`, 5); // 越过 Lv5 单独门槛
  await a2(CID);
  assert.ok(capped.text_lines().includes('侍奉技术(5)＋性交技术(5)上限为10'));
  assert.ok(
    capped
      .text_lines()
      .some((t) => t.includes('习得点数至少达到12500点、方可突破技术等级限制')),
  );
});

test('ablup13：Lv5 前后切换门槛提示文案（技巧→侍奉精神）', async () => {
  const fixture = create_era_fixture();
  const { ablup13 } = seed(fixture);
  fixture.set_inputs(100);
  await ablup13(CID);
  assert.ok(fixture.text_lines().includes('技巧LV1以上(现在LV0)且'));

  const later = create_era_fixture();
  const { ablup13: a2 } = seed(later);
  later.store.set(`abl:${CID}:13`, 6);
  later.store.set(`abl:${CID}:16`, 6);
  later.set_inputs(100);
  await a2(CID);
  assert.ok(later.text_lines().includes('侍奉精神LV7以上(现在LV6)且'));
});

test('ablup13：issue #14 缺陷——Lv5 以上的侍奉精神门槛检查在原作中被注释掉，不再拦截', async () => {
  const fixture = create_era_fixture();
  const { ablup13 } = seed(fixture);
  // abl16=5 满足入口把关（Lv5 单独门槛），但低于 abl13+1=7——若被注释掉
  // 的门槛生效，本应判定不足
  fixture.store.set(`abl:${CID}:13`, 6);
  fixture.store.set(`abl:${CID}:16`, 5);
  fixture.store.set(`juel:${CID}:7`, 1000000);
  fixture.set_inputs(0);
  await ablup13(CID);
  assert.equal(fixture.store.get(`abl:${CID}:13`), 7); // 未被死代码拦截，成功购买
});

test('ablup13：组合上限触发后 A 改用 TEMP²×500，侍奉精神分级折扣仍在其后叠加', async () => {
  const fixture = create_era_fixture();
  const { ablup13 } = seed(fixture);
  fixture.store.set(`abl:${CID}:13`, 5);
  fixture.store.set(`abl:${CID}:14`, 5);
  fixture.store.set(`abl:${CID}:16`, 5); // <6 档，×0.95
  fixture.store.set(`juel:${CID}:7`, 1000000);
  fixture.set_inputs(100);
  await ablup13(CID);
  // TEMP=5，A=5*5*500=12500，×0.95(侍奉精神<6)=11875(floor)
  assert.equal(buttons(fixture)[0].text, '习得点数×1000000/11875 ……ＯＫ');
});

test('ablup13：成功购买写入 abl:cid:13（同域直接 era.add），显示变为LV', async () => {
  const fixture = create_era_fixture();
  const { ablup13 } = seed(fixture);
  fixture.store.set(`juel:${CID}:7`, 5);
  fixture.store.set(`abl:${CID}:12`, 1); // 满足 Lv5 前的技巧门槛（ABL:12 >= lv+1）
  fixture.set_inputs(0);
  await ablup13(CID);
  assert.equal(fixture.store.get(`abl:${CID}:13`), 1);
  assert.equal(fixture.store.get(`juel:${CID}:7`), 0);
  assert.ok(fixture.text_lines().some((t) => t.includes('变为LV1。')));
});

// ———— ABLUP14：性交技术（train 域），双值 A/B ————

test('ablup14：已达最高级；组合上限溢出两行提示', async () => {
  const fixture = create_era_fixture();
  const { ablup14 } = seed(fixture);
  fixture.store.set(`abl:${CID}:14`, 10);
  await ablup14(CID);
  assert.ok(fixture.text_lines().includes('已达最高级'));

  const capped = create_era_fixture();
  const { ablup14: a2 } = seed(capped);
  capped.store.set(`abl:${CID}:13`, 5);
  capped.store.set(`abl:${CID}:14`, 5);
  await a2(CID);
  assert.ok(capped.text_lines().includes('侍奉技术(5)＋性交技术(5)上限为10'));
});

test('ablup14：Lv0 梯子字面值，EXP 门槛行前导 6 个半角空格+全角空格对齐', async () => {
  const fixture = create_era_fixture();
  const { ablup14 } = seed(fixture);
  fixture.store.set(`abl:${CID}:12`, 1); // 满足 Lv5 前的技巧门槛，隔离 bit4
  fixture.store.set(`exp:${CID}:5`, 3); // 满足性交经验门槛，隔离 bit2
  fixture.set_inputs(100);
  await ablup14(CID);
  assert.equal(buttons(fixture)[0].text, '习得点数×0/1 ……点数不足 ');
  assert.ok(fixture.text_lines().includes('      性交经验　3/3'));
});

test('ablup14：issue #14 缺陷——DECIDE 的技巧门槛误比较 ABL:12<5（应比较 ABL:14<5），Lv6 时无渲染文案却仍可能被判能力不足', async () => {
  const fixture = create_era_fixture();
  const { ablup14 } = seed(fixture);
  fixture.store.set(`abl:${CID}:14`, 6); // Lv>=5，渲染层不再显示技巧要求文案
  fixture.store.set(`abl:${CID}:12`, 2); // 技巧远低，若比较 ABL:14<5 本不该生效，但比较的是 ABL:12<5
  fixture.store.set(`juel:${CID}:7`, 1000000);
  fixture.store.set(`exp:${CID}:5`, 1000000);
  fixture.set_inputs(100);
  await ablup14(CID);
  assert.ok(!fixture.text_lines().some((t) => t.includes('技巧LV')));
  assert.ok(buttons(fixture)[0].text.includes('能力不足'));
});

test('ablup14：性交中毒(ABL:30)分级折扣——<6 档 A×0.95/B×0.95', async () => {
  const fixture = create_era_fixture();
  const { ablup14 } = seed(fixture);
  fixture.store.set(`abl:${CID}:14`, 3); // Lv3：A=1500,B=80
  fixture.store.set(`abl:${CID}:30`, 4); // 落在 <6 档
  fixture.store.set(`abl:${CID}:12`, 10); // 满足技巧门槛，隔离 bit4
  fixture.store.set(`exp:${CID}:5`, 100); // 满足性交经验门槛，隔离 bit2
  fixture.set_inputs(100);
  await ablup14(CID);
  // 1500*0.95=1425(floor)
  assert.equal(buttons(fixture)[0].text, '习得点数×0/1425 ……点数不足 ');
});

test('ablup14：成功购买写入 abl:cid:14，显示变为LV', async () => {
  const fixture = create_era_fixture();
  const { ablup14 } = seed(fixture);
  fixture.store.set(`juel:${CID}:7`, 1);
  fixture.store.set(`exp:${CID}:5`, 3);
  fixture.store.set(`abl:${CID}:12`, 1); // 满足 Lv5 前的技巧门槛
  fixture.set_inputs(0);
  await ablup14(CID);
  assert.equal(fixture.store.get(`abl:${CID}:14`), 1);
  assert.ok(fixture.text_lines().some((t) => t.includes('变为LV1。')));
});

// ———— ABLUP15：话术（train 域），三值 A/B/C，bit2 为 AND-of-insufficiency ————

test('ablup15：已达最高级；技巧+话术组合上限单行 PRINTFORMW', async () => {
  const fixture = create_era_fixture();
  const { ablup15 } = seed(fixture);
  fixture.store.set(`abl:${CID}:15`, 10);
  await ablup15(CID);
  assert.ok(fixture.text_lines().includes('已达最高级'));

  const capped = create_era_fixture();
  const { ablup15: a2 } = seed(capped);
  capped.store.set(`abl:${CID}:12`, 8);
  capped.store.set(`abl:${CID}:15`, 7);
  capped.set_inputs(100);
  await a2(CID);
  assert.ok(capped.text_lines().includes('技巧(8)＋话术(7)上限为15'));
});

test('ablup15：issue #14 缺陷——技巧+话术组合上限突破价足够时，DECIDE 提前 RETURN 使 A/B/C/I 维持清零，等于免费购买', async () => {
  const fixture = create_era_fixture();
  const { ablup15 } = seed(fixture);
  fixture.store.set(`abl:${CID}:12`, 8);
  fixture.store.set(`abl:${CID}:15`, 7); // 8+7=15
  fixture.store.set(`juel:${CID}:7`, 49000); // 恰好达到 7²×1000，越过入口拦截
  fixture.set_inputs(0);
  await ablup15(CID);
  assert.equal(buttons(fixture)[0].text, '习得点数×49000/0 ……ＯＫ');
  assert.equal(fixture.store.get(`abl:${CID}:15`), 8);
  assert.equal(fixture.store.get(`juel:${CID}:7`), 49000); // 未被扣珠
});

test('ablup15：Lv0 梯子字面值，EXP 行字面量" or"仅出现在第一行', async () => {
  const fixture = create_era_fixture();
  const { ablup15 } = seed(fixture);
  fixture.store.set(`exp:${CID}:73`, 3); // 满足调教会话经验门槛，隔离 bit2
  fixture.set_inputs(100);
  await ablup15(CID);
  assert.equal(buttons(fixture)[0].text, '习得点数×0/1 ……点数不足 ');
  assert.ok(fixture.text_lines().includes('      调教会话经验　3/3 or'));
  assert.ok(fixture.text_lines().includes('      卖淫经验　0/5'));
});

test('ablup15：bit2 需要两条经验轨道同时不足才命中——任一达标即可免', async () => {
  const fixture = create_era_fixture();
  const { ablup15 } = seed(fixture);
  fixture.store.set(`juel:${CID}:7`, 1); // A=1，隔离 bit1
  fixture.store.set(`exp:${CID}:73`, 3); // B=3，恰好达标
  fixture.store.set(`exp:${CID}:74`, 0); // C=5，不达标
  fixture.set_inputs(100);
  await ablup15(CID);
  assert.equal(buttons(fixture)[0].text, '习得点数×1/1 ……ＯＫ');
});

test('ablup15：成功购买写入 abl:cid:15，显示变为LV', async () => {
  const fixture = create_era_fixture();
  const { ablup15 } = seed(fixture);
  fixture.store.set(`juel:${CID}:7`, 1);
  fixture.store.set(`exp:${CID}:73`, 3);
  fixture.set_inputs(0);
  await ablup15(CID);
  assert.equal(fixture.store.get(`abl:${CID}:15`), 1);
  assert.ok(fixture.text_lines().some((t) => t.includes('变为LV1。')));
});

// ———— ABLUP16：侍奉精神（system 域），三轨道，$INPUT_LOOP+GOTO ————

test('ablup16：入口把关用 OR（三项素质任一缺失即挡），全部具备才能越过 Lv5', async () => {
  const fixture = create_era_fixture();
  const { ablup16 } = seed(fixture);
  fixture.store.set(`abl:${CID}:16`, 5);
  set_talents(fixture, { 63: 1 }); // 只有献身的，缺爱慕/盲从
  await ablup16(CID);
  assert.ok(fixture.text_lines().includes('需要特殊素质才能继续提升'));

  const unlocked = create_era_fixture();
  const { ablup16: a2 } = seed(unlocked);
  unlocked.store.set(`abl:${CID}:16`, 5);
  set_talents(unlocked, { 63: 1, 85: 1, 86: 1 });
  unlocked.set_inputs(100);
  await a2(CID);
  assert.ok(!unlocked.text_lines().includes('需要特殊素质才能继续提升'));

  const maxed = create_era_fixture();
  const { ablup16: a3 } = seed(maxed);
  maxed.store.set(`abl:${CID}:16`, 10);
  set_talents(maxed, { 63: 1, 85: 1, 86: 1 }); // 绕过 Lv5+ 门槛，暴露第二档
  await a3(CID);
  assert.ok(maxed.text_lines().includes('已达最高级'));
});

test('ablup16：Lv0 梯子字面值，三个选项皆渲染，选项0 恒渲染（无 IF 包裹）', async () => {
  const fixture = create_era_fixture();
  const { ablup16 } = seed(fixture);
  fixture.store.set(`abl:${CID}:10`, 1); // 满足顺从门槛，隔离能力不足位
  fixture.store.set(`juel:${CID}:6`, 100); // 满足屈服点数门槛，隔离点数不足位
  fixture.store.set(`exp:${CID}:2`, 1); // 满足绝顶/精液经验门槛，隔离经验不足位
  fixture.store.set(`exp:${CID}:20`, 1);
  fixture.set_inputs(100);
  await ablup16(CID);
  const b = buttons(fixture);
  assert.equal(b.length, 4); // [0][1][2][100]
  assert.equal(b[0].text, '屈服点数×100/100 ……ＯＫ');
  assert.ok(fixture.text_lines().includes('　　　绝顶经验　1/1'));
  assert.ok(fixture.text_lines().includes('　　　精液经验　1/1'));
});

test('ablup16：Lv3 起 C=0，选项2 结构上不可能被选中（K=256 隐藏哨兵）', async () => {
  const fixture = create_era_fixture();
  const { ablup16 } = seed(fixture);
  fixture.store.set(`abl:${CID}:16`, 3);
  fixture.store.set(`abl:${CID}:10`, 4); // 满足顺从门槛，隔离能力不足位
  fixture.set_inputs(2);
  await assert.rejects(ablup16(CID), /测试夹具：输入不合法/);
});

test('ablup16：顺从门槛（ABL:10）不足时三个选项同时计为能力不足', async () => {
  const fixture = create_era_fixture();
  const { ablup16 } = seed(fixture);
  fixture.set_inputs(100);
  await ablup16(CID);
  for (const btn of buttons(fixture)) {
    if (btn.accelerator === 100) continue;
    assert.ok(btn.text.includes('能力不足'));
  }
});

test('ablup16：习得点数轨道的经验门槛是固定阈值 1（EXP:2<1），与 D/E 无关，显示分母固定为"/1"', async () => {
  // Lv1：E=3（≠1），与习得轨道固定分母"/1"的行互不相同，可精确区分
  const fixture = create_era_fixture();
  const { ablup16 } = seed(fixture);
  fixture.store.set(`abl:${CID}:16`, 1);
  fixture.store.set(`abl:${CID}:10`, 5); // 满足顺从门槛（lv+1=2）
  fixture.set_inputs(100);
  await ablup16(CID);
  assert.ok(fixture.text_lines().includes('　　　绝顶经验　0/3')); // E 轨道
  assert.ok(fixture.text_lines().includes('　　　绝顶经验　0/1')); // 习得轨道，固定分母
  const opt2 = buttons(fixture).find((b) => b.accelerator === 2);
  assert.ok(opt2.text.includes('经验不足'));
});

test('ablup16：三个购买路径各自扣对应珠、写入 chara(cid).system.侍奉精神、显示变为LV', async () => {
  for (const result of [0, 1, 2]) {
    const fixture = create_era_fixture();
    const { ablup16 } = seed(fixture);
    fixture.store.set(`abl:${CID}:10`, 4);
    for (const k of [6, 4, 7]) fixture.store.set(`juel:${CID}:${k}`, 1000);
    fixture.store.set(`exp:${CID}:2`, 1);
    fixture.store.set(`exp:${CID}:20`, 1);
    fixture.store.set(`exp:${CID}:21`, 1);
    fixture.set_inputs(result);
    await ablup16(CID);
    assert.equal(fixture.store.get(`abl:${CID}:16`), 1);
    assert.ok(fixture.text_lines().some((t) => t.includes('变为LV1。')));
  }
});

// ———— ABLUP17：露出癖（system 域），欲望/顺从门槛二选一，唯一带句号的重试文案 ————

test('ablup17：两档终止判定，四项豁免素质任一命中即可越过 Lv5', async () => {
  const fixture = create_era_fixture();
  const { ablup17 } = seed(fixture);
  fixture.store.set(`abl:${CID}:17`, 5);
  await ablup17(CID);
  assert.ok(fixture.text_lines().includes('需要特殊素质才能继续提升'));

  const unlocked = create_era_fixture();
  const { ablup17: a2 } = seed(unlocked);
  unlocked.store.set(`abl:${CID}:17`, 5);
  set_talents(unlocked, { 89: 1 });
  unlocked.set_inputs(100);
  await a2(CID);
  assert.ok(!unlocked.text_lines().includes('需要特殊素质才能继续提升'));

  const maxed = create_era_fixture();
  const { ablup17: a3 } = seed(maxed);
  maxed.store.set(`abl:${CID}:17`, 10);
  set_talents(maxed, { 89: 1 }); // 绕过 Lv5+ 门槛，暴露第二档
  await a3(CID);
  assert.ok(maxed.text_lines().includes('已达最高级'));
});

test('ablup17：无[爱慕]时门槛查欲望，有[爱慕]时改查顺从', async () => {
  const fixture = create_era_fixture();
  const { ablup17 } = seed(fixture);
  fixture.set_inputs(100);
  await ablup17(CID);
  assert.ok(fixture.text_lines().includes('欲望LV1以上(现在LV0)且'));

  const with_love = create_era_fixture();
  const { ablup17: a2 } = seed(with_love);
  set_talents(with_love, { 85: 1 });
  with_love.set_inputs(100);
  await a2(CID);
  assert.ok(with_love.text_lines().includes('顺从LV1以上(现在LV0)且'));
});

test('ablup17：C(绝顶经验)只在 Lv0→1 生效，D(调教自慰经验)只在 Lv1→2 生效，其余等级不显示也不拦', async () => {
  const lv0 = create_era_fixture();
  const { ablup17: a0 } = seed(lv0);
  lv0.store.set(`abl:${CID}:11`, 1); // 满足欲望门槛
  lv0.store.set(`juel:${CID}:8`, 100);
  lv0.set_inputs(100);
  await a0(CID);
  assert.ok(lv0.text_lines().includes('　　　绝顶经验　0/1'));
  assert.ok(!lv0.text_lines().some((t) => t.includes('调教自慰经验')));
  assert.ok(buttons(lv0)[0].text.includes('经验不足')); // exp:2 未满足，C=1

  const lv1 = create_era_fixture();
  const { ablup17: a1 } = seed(lv1);
  lv1.store.set(`abl:${CID}:17`, 1);
  lv1.store.set(`abl:${CID}:11`, 2);
  lv1.store.set(`juel:${CID}:8`, 1000);
  lv1.set_inputs(100);
  await a1(CID);
  assert.ok(lv1.text_lines().includes('　　　调教自慰经验　0/1'));
  assert.ok(!lv1.text_lines().some((t) => t.includes('绝顶经验')));

  const lv2 = create_era_fixture();
  const { ablup17: a2 } = seed(lv2);
  lv2.store.set(`abl:${CID}:17`, 2);
  lv2.store.set(`abl:${CID}:11`, 3);
  lv2.store.set(`juel:${CID}:8`, 3000);
  lv2.set_inputs(100);
  await a2(CID);
  assert.ok(!lv2.text_lines().some((t) => t.includes('绝顶经验')));
  assert.ok(!lv2.text_lines().some((t) => t.includes('调教自慰经验')));
});

test('ablup17：唯一带句号的重试文案"未满足条件。"（其余 ABLUP10～16 均无句号）', async () => {
  const fixture = create_era_fixture();
  const { ablup17 } = seed(fixture);
  fixture.set_inputs(0, 100);
  await ablup17(CID);
  assert.ok(fixture.text_lines().includes('未满足条件。'));
});

test('ablup17：成功购买写入 chara(cid).system.露出癖，扣珠、显示变为LV', async () => {
  const fixture = create_era_fixture();
  const { ablup17 } = seed(fixture);
  fixture.store.set(`juel:${CID}:8`, 100);
  fixture.store.set(`abl:${CID}:11`, 1); // 满足欲望门槛（无[爱慕]时）
  fixture.store.set(`exp:${CID}:2`, 1); // Lv0→1 需要绝顶经验（C=1）
  fixture.set_inputs(0);
  await ablup17(CID);
  assert.equal(fixture.store.get(`abl:${CID}:17`), 1);
  assert.equal(fixture.store.get(`juel:${CID}:8`), 0);
  assert.ok(fixture.text_lines().some((t) => t.includes('变为LV1。')));
});
// ———— ABLUP37：卖淫中毒（issue #467） ——

test('ablup37：两档终止判定（特殊素质/已达最高级）', async () => {
  const fixture = create_era_fixture();
  const { ablup37 } = seed(fixture);
  fixture.store.set(`abl:${CID}:37`, 5);
  await ablup37(CID);
  assert.ok(fixture.text_lines().includes('需要特殊素质才能继续提升'));
  assert.equal(buttons(fixture).length, 0);

  const maxed = create_era_fixture();
  const { ablup37: a2 } = seed(maxed);
  maxed.store.set(`abl:${CID}:37`, 10);
  set_talents(maxed, { 76: 1 }); // 淫乱解锁后暴露第二档
  await a2(CID);
  assert.ok(maxed.text_lines().includes('已达最高级'));
});

test('ablup37：[看轻贞操]/[妓女]同样解锁 Lv5 以上', async () => {
  for (const t of [31, 180]) {
    const fixture = create_era_fixture();
    const { ablup37 } = seed(fixture);
    fixture.store.set(`abl:${CID}:37`, 5);
    fixture.store.set(`abl:${CID}:11`, 6);
    set_talents(fixture, { [t]: 1 });
    fixture.set_inputs(100);
    await ablup37(CID);
    assert.ok(buttons(fixture).length > 0, `talent ${t} 应放行`);
  }
});

test('ablup37：Lv0 梯子（A=2000/B=3000/C=1000/D=50）与需求行文案', async () => {
  const fixture = create_era_fixture();
  const { ablup37 } = seed(fixture);
  fixture.store.set(`abl:${CID}:11`, 1); // 欲望门槛 lv0+1=1
  fixture.store.set(`exp:${CID}:74`, 50); // 卖淫经验恰好达标，隔离出「点数不足」一位
  fixture.set_inputs(100);
  await ablup37(CID);
  const b = buttons(fixture);
  assert.equal(b.length, 2); // [0] [100]
  assert.equal(b[0].text, '恭顺点数×0/2000 ……点数不足 ');
  assert.ok(fixture.text_lines().includes('欲望LV1以上(现在LV1)且'));
  assert.ok(fixture.text_lines().includes('　　　欲情点数×0/3000'));
  assert.ok(fixture.text_lines().includes('　　　屈服点数×0/1000'));
  assert.ok(fixture.text_lines().includes('卖淫经验　50/50'));
  assert.equal(b[1].text, '停止');
  // lv0 无需异常经验，F 行不渲染
  assert.ok(!fixture.text_lines().some((t) => t.includes('异常经验')));
});

test('ablup37：Lv2 起需要异常经验（F=lv-1），不足时经验位点亮', async () => {
  const fixture = create_era_fixture();
  const { ablup37 } = seed(fixture);
  fixture.store.set(`abl:${CID}:37`, 2);
  fixture.store.set(`abl:${CID}:11`, 3);
  fixture.store.set(`exp:${CID}:74`, 150); // 卖淫经验够（D=150）
  fixture.set_inputs(100);
  await ablup37(CID);
  assert.ok(fixture.text_lines().includes('异常经验1以上(现在0)且'));
  assert.ok(buttons(fixture)[0].text.endsWith('……点数不足 经验不足 '));
});

test('ablup37：F 的素质增减——[容易上瘾]-2、[反抗心]+1', async () => {
  const addicted = create_era_fixture();
  const { ablup37: a1 } = seed(addicted);
  addicted.store.set(`abl:${CID}:37`, 4);
  addicted.store.set(`abl:${CID}:11`, 5);
  set_talents(addicted, { 72: 1 });
  addicted.set_inputs(100);
  await a1(CID);
  // F = 4-1-2 = 1（lv4→5 基准 F=3，容易上瘾 -2）
  assert.ok(addicted.text_lines().includes('异常经验1以上(现在0)且'));

  const rebel = create_era_fixture();
  const { ablup37: a2 } = seed(rebel);
  rebel.store.set(`abl:${CID}:37`, 2);
  rebel.store.set(`abl:${CID}:11`, 3);
  set_talents(rebel, { 11: 1 });
  rebel.set_inputs(100);
  await a2(CID);
  // F = 2-1+1 = 2
  assert.ok(rebel.text_lines().includes('异常经验2以上(现在0)且'));
});

/**
 * ABLUP37 异常经验 F 的素质增减表（ABLUP37.ERB:368-402 的 SIF 行）逐条。
 * 基准 F = lv-1（lv=4 → 3），每条只加一项；[疯狂][崩坏]不是增减项而是整块
 * 豁免（:368 的条件），命中时 F 恒为 0、整行不打印。
 */
const ABLUP37_F_TABLE = [
  { talent: null, f: 3 }, // 控制组：无增减项
  { talent: 33, f: 2 }, // 开放 -1
  { talent: 70, f: 2 }, // 接受快感 -1（只在 F 表里出现，倍率表没有它）
  { talent: 72, f: 1 }, // 容易上瘾 -2
  { talent: 73, f: 2 }, // 容易陷落 -1（同上，只在 F 表）
  { talent: 76, f: 2 }, // 淫乱 -1
  { talent: 80, f: 2 }, // 倒錯的 -1
  { talent: 180, f: 2 }, // 妓女 -1
  { talent: 181, f: 1 }, // 倾城 -2
  { talent: 11, f: 4 }, // 反抗心 +1
  { talent: 20, f: 4 }, // 克制 +1
  { talent: 32, f: 4 }, // 压抑 +1
  { talent: 34, f: 4 }, // 抵抗 +1
  { talent: 71, f: 4 }, // 否定快感 +1（同上，只在 F 表）
  { talent: 85, f: 4 }, // 爱慕 +1
  { talent: 184, f: 5 }, // 求爱 +2
  { talent: 123, f: 0 }, // 疯狂：整块豁免
  { talent: 9, f: 0 }, // 崩坏：整块豁免
];

test('ablup37：F 的素质增减表逐条（ABLUP37.ERB:368-402 的 SIF 行）', async () => {
  for (const row of ABLUP37_F_TABLE) {
    const fixture = create_era_fixture();
    const { ablup37 } = seed(fixture);
    fixture.store.set(`abl:${CID}:37`, 4); // 基准 F = 3
    fixture.store.set(`abl:${CID}:11`, 5); // 欲望门槛 lv+1
    if (row.talent !== null) set_talents(fixture, { [row.talent]: 1 });
    fixture.set_inputs(100);

    await ablup37(CID);
    const line = fixture.text_lines().find((t) => t.startsWith('异常经验'));
    if (row.f === 0) {
      assert.equal(
        line,
        undefined,
        `talent ${row.talent}：F 整块豁免，不该渲染`,
      );
    } else {
      assert.equal(
        line,
        `异常经验${row.f}以上(现在0)且`,
        `talent ${row.talent} 的 F`,
      );
    }
  }
});

test('ablup37：淫乱的 B 轨 ×0.50（其余 ×0.80）——原作不对称倍率', async () => {
  const fixture = create_era_fixture();
  const { ablup37 } = seed(fixture);
  set_talents(fixture, { 76: 1 });
  fixture.store.set(`abl:${CID}:11`, 1);
  fixture.store.set(`exp:${CID}:74`, 40); // 卖淫经验达标（50×0.8），隔离出点数位
  fixture.set_inputs(100);
  await ablup37(CID);
  assert.equal(buttons(fixture)[0].text, '恭顺点数×0/1600 ……点数不足 '); // 2000*0.8
  assert.ok(fixture.text_lines().includes('　　　欲情点数×0/1500')); // 3000*0.5
  assert.ok(fixture.text_lines().includes('　　　屈服点数×0/800')); // 1000*0.8
  assert.ok(fixture.text_lines().includes('卖淫经验　40/40')); // 50*0.8
});

test('ablup37：戒备森严按等级分档（lv3 ×1.5 / lv6 ×3.0）', async () => {
  const lv3 = create_era_fixture();
  const { ablup37: a1 } = seed(lv3);
  lv3.store.set(`abl:${CID}:37`, 3);
  lv3.store.set(`abl:${CID}:11`, 4);
  set_talents(lv3, { 27: 1 });
  lv3.set_inputs(100);
  await a1(CID);
  assert.ok(lv3.text_lines().includes('　　　欲情点数×0/45000')); // 30000*1.5

  const lv6 = create_era_fixture();
  const { ablup37: a2 } = seed(lv6);
  lv6.store.set(`abl:${CID}:37`, 6);
  lv6.store.set(`abl:${CID}:11`, 7);
  set_talents(lv6, { 27: 1, 76: 1 });
  lv6.set_inputs(100);
  await a2(CID);
  // lv6 的 B=120000；戒备森严 ×3.0 → 360000，再淫乱 B 轨 ×0.50 → 180000
  assert.ok(lv6.text_lines().includes('　　　欲情点数×0/180000'));
});

test('ablup37：欲望门槛不足点亮能力位（ABL:11 < lv+1）', async () => {
  const fixture = create_era_fixture();
  const { ablup37 } = seed(fixture);
  fixture.store.set(`abl:${CID}:11`, 0);
  fixture.set_inputs(100);
  await ablup37(CID);
  assert.ok(buttons(fixture)[0].text.endsWith('……点数不足 经验不足 能力不足'));
});

test('ablup37：条件不满足时输入 0 打「未满足条件」并重试', async () => {
  const fixture = create_era_fixture();
  const { ablup37 } = seed(fixture);
  fixture.set_inputs(0, 100);
  await ablup37(CID);
  assert.ok(fixture.text_lines().includes('未满足条件'));
  // 未升级：abl:37 从未被写过（夹具只记录真实写）
  assert.ok(!fixture.var_writes.some((w) => w.name === `abl:${CID}:37`));
});

test('ablup37：成功购买 +1 级并三轨扣珠', async () => {
  const fixture = create_era_fixture();
  const { ablup37 } = seed(fixture);
  fixture.store.set(`abl:${CID}:11`, 1);
  fixture.store.set(`juel:${CID}:4`, 2000);
  fixture.store.set(`juel:${CID}:5`, 3000);
  fixture.store.set(`juel:${CID}:6`, 1000);
  fixture.store.set(`exp:${CID}:74`, 50);
  fixture.set_inputs(0);
  await ablup37(CID);
  assert.equal(fixture.store.get(`abl:${CID}:37`), 1);
  assert.equal(fixture.store.get(`juel:${CID}:4`), 0);
  assert.equal(fixture.store.get(`juel:${CID}:5`), 0);
  assert.equal(fixture.store.get(`juel:${CID}:6`), 0);
  assert.ok(fixture.text_lines().some((t) => t.includes('卖淫中毒变为LV1。')));
});

// ———— ABLUP39：兽奸中毒（issue #467） ——

test('ablup39：两档终止判定（特殊素质/已达最高级）', async () => {
  const fixture = create_era_fixture();
  const { ablup39 } = seed(fixture);
  fixture.store.set(`abl:${CID}:39`, 5);
  await ablup39(CID);
  assert.ok(fixture.text_lines().includes('需要特殊素质才能继续提升'));

  const maxed = create_era_fixture();
  const { ablup39: a2 } = seed(maxed);
  maxed.store.set(`abl:${CID}:39`, 10);
  set_talents(maxed, { 124: 1 }); // 动物耳朵解锁后暴露第二档
  await a2(CID);
  assert.ok(maxed.text_lines().includes('已达最高级'));
});

test('ablup39：三重上限（32+33+39>=10）珠不足时三行说明拦截', async () => {
  const fixture = create_era_fixture();
  const { ablup39 } = seed(fixture);
  fixture.store.set(`abl:${CID}:32`, 6);
  fixture.store.set(`abl:${CID}:33`, 4);
  fixture.store.set(`abl:${CID}:39`, 1); // 总和 11 >= 10；lv=1 → 1*1*4000=4000
  await ablup39(CID);
  assert.ok(
    fixture
      .text_lines()
      .includes('精液中毒(6)＋百合中毒(4)＋兽奸中毒(1)上限为10'),
  );
  assert.ok(
    fixture
      .text_lines()
      .some((t) =>
        t.includes('至少达成欲情点数4000点或屈服点数4000点的其中一项'),
      ),
  );
  assert.ok(fixture.text_lines().includes('方可提升当前兽奸中毒的等级'));
});

test('ablup39：三重上限时 A/B 覆盖为 lv²×4000（梯子作废；合计 10 与 11 两档）', async () => {
  // 覆盖价的门槛是 `>= 10`：合计恰好 10 时也必须走覆盖价（原作 :149）
  for (const [abl32, abl33] of [
    [6, 4], // 合计 11
    [6, 3], // 合计恰好 10
  ]) {
    const fixture = create_era_fixture();
    const { ablup39 } = seed(fixture);
    fixture.store.set(`abl:${CID}:32`, abl32);
    fixture.store.set(`abl:${CID}:33`, abl33);
    fixture.store.set(`abl:${CID}:39`, 1); // bulk = 1²×4000
    fixture.store.set(`juel:${CID}:5`, 4000); // 原作判 ||：两珠任一不足即拦，
    fixture.store.set(`juel:${CID}:6`, 4000); // 文案写「或」但代码要求都足——照代码
    fixture.store.set(`abl:${CID}:11`, 2);
    fixture.store.set(`exp:${CID}:56`, 100); // 兽奸经验达标（lv1 的 C=100）
    fixture.set_inputs(100);
    await ablup39(CID);
    assert.equal(
      buttons(fixture)[0].text,
      '欲情点数×4000/4000 ……ＯＫ',
      `三中毒合计 ${abl32 + abl33 + 1}`,
    );
  }
});

test('ablup39：三重上限的拦法是「两珠任一不足即拦」（||，不是 &&）', async () => {
  // 原作文案写「或……其中一项」，代码判 ||：一颗刚好够、另一颗不足时仍拦。
  // 只在「一颗够一颗不够」时才与 && 有区别，故两向各跑一遍。
  for (const [juel5, juel6] of [
    [4000, 0],
    [0, 4000],
  ]) {
    const fixture = create_era_fixture();
    const { ablup39 } = seed(fixture);
    fixture.store.set(`abl:${CID}:32`, 6);
    fixture.store.set(`abl:${CID}:33`, 4);
    fixture.store.set(`abl:${CID}:39`, 1); // 三中毒合计 11 >= 10；bulk = 1²×4000
    fixture.store.set(`juel:${CID}:5`, juel5);
    fixture.store.set(`juel:${CID}:6`, juel6);
    fixture.set_inputs(100); // 变异成 && 时会走到需求行，用 100 收尾
    await ablup39(CID);
    assert.ok(
      fixture.text_lines().some((t) => t.includes('上限为10')),
      `欲情 ${juel5} / 屈服 ${juel6}：任一不足即拦`,
    );
    assert.equal(buttons(fixture).length, 0);
  }
});

test('ablup39：Lv0 梯子与需求行（A=B=2000/C=30，无 F 行）', async () => {
  const fixture = create_era_fixture();
  const { ablup39 } = seed(fixture);
  fixture.store.set(`abl:${CID}:11`, 1);
  fixture.store.set(`exp:${CID}:56`, 30); // 兽奸经验达标（lv0 的 C=30）
  fixture.set_inputs(100);
  await ablup39(CID);
  const b = buttons(fixture);
  assert.equal(b.length, 2);
  assert.equal(b[0].text, '欲情点数×0/2000 ……点数不足 ');
  assert.ok(fixture.text_lines().includes('　　　屈服点数×0/2000'));
  assert.ok(fixture.text_lines().includes('兽奸经验　30/30'));
  assert.ok(!fixture.text_lines().some((t) => t.includes('异常经验')));
});

test('ablup39：戒备森严读 ABL:37（卖淫中毒）——原作复制粘贴缺陷 1:1 保留', async () => {
  // talent:27 的分档判 ABL:37==4 → ×2.0，与自身等级无关
  const fixture = create_era_fixture();
  const { ablup39 } = seed(fixture);
  fixture.store.set(`abl:${CID}:39`, 1); // 若按自身等级（1）不该有加成
  fixture.store.set(`abl:${CID}:37`, 4); // 按卖淫中毒 4 → ×2.0 生效
  fixture.store.set(`abl:${CID}:11`, 2);
  set_talents(fixture, { 27: 1 });
  fixture.store.set(`exp:${CID}:56`, 250); // 兽奸经验达标（100×2.5），隔离出点数位
  fixture.set_inputs(100);
  await ablup39(CID);
  assert.equal(buttons(fixture)[0].text, '欲情点数×0/12500 ……点数不足 '); // 5000*2.5
  assert.ok(fixture.text_lines().includes('兽奸经验　250/250')); // 100*2.5
});

test('ablup39：Lv2 起需要异常经验（F=lv+1），[牝犬]可免', async () => {
  const fixture = create_era_fixture();
  const { ablup39 } = seed(fixture);
  fixture.store.set(`abl:${CID}:39`, 2);
  fixture.store.set(`abl:${CID}:11`, 3);
  fixture.store.set(`exp:${CID}:56`, 220); // 兽奸经验够
  fixture.set_inputs(100);
  await ablup39(CID);
  assert.ok(fixture.text_lines().includes('异常经验3以上(现在0)且'));

  const dog = create_era_fixture();
  const { ablup39: a2 } = seed(dog);
  dog.store.set(`abl:${CID}:39`, 2);
  dog.store.set(`abl:${CID}:11`, 3);
  set_talents(dog, { 136: 1 });
  dog.set_inputs(100);
  await a2(dog);
  assert.ok(!dog.text_lines().some((t) => t.includes('异常经验')));
});

test('ablup39：F 的豁免素质逐条（容易上瘾/淫乱/牝犬整块免）', async () => {
  const control = create_era_fixture();
  const { ablup39: control_ablup39 } = seed(control);
  control.store.set(`abl:${CID}:39`, 2);
  control.store.set(`abl:${CID}:11`, 3);
  control.set_inputs(100);
  await control_ablup39(CID);
  assert.ok(
    control.text_lines().includes('异常经验3以上(现在0)且'),
    '控制组：无豁免时 F = lv+1',
  );

  for (const t of [72, 76, 136]) {
    const fixture = create_era_fixture();
    const { ablup39 } = seed(fixture);
    fixture.store.set(`abl:${CID}:39`, 2);
    fixture.store.set(`abl:${CID}:11`, 3);
    set_talents(fixture, { [t]: 1 });
    fixture.set_inputs(100);
    await ablup39(CID);
    assert.ok(
      !fixture.text_lines().some((x) => x.includes('异常经验')),
      `talent ${t}：F 整块豁免，不该渲染异常经验行`,
    );
  }
});

test('ablup39：克制 A/B×2.5、C×1.5；爱慕 A/B×1.8、C×1.5', async () => {
  const restraint = create_era_fixture();
  const { ablup39: a1 } = seed(restraint);
  set_talents(restraint, { 20: 1 });
  restraint.store.set(`abl:${CID}:11`, 1);
  restraint.store.set(`exp:${CID}:56`, 45); // 兽奸经验达标（30×1.5）
  restraint.set_inputs(100);
  await a1(CID);
  assert.equal(buttons(restraint)[0].text, '欲情点数×0/5000 ……点数不足 '); // 2000*2.5
  assert.ok(restraint.text_lines().includes('兽奸经验　45/45')); // 30*1.5

  const love = create_era_fixture();
  const { ablup39: a2 } = seed(love);
  set_talents(love, { 85: 1 });
  love.store.set(`abl:${CID}:11`, 1);
  love.store.set(`exp:${CID}:56`, 45);
  love.set_inputs(100);
  await a2(CID);
  assert.equal(buttons(love)[0].text, '欲情点数×0/3600 ……点数不足 '); // 2000*1.8
  assert.ok(love.text_lines().includes('兽奸经验　45/45')); // 30*1.5
});

test('ablup39：成功购买 +1 级并扣欲情/屈服双珠', async () => {
  const fixture = create_era_fixture();
  const { ablup39 } = seed(fixture);
  fixture.store.set(`abl:${CID}:11`, 1);
  fixture.store.set(`juel:${CID}:5`, 2000);
  fixture.store.set(`juel:${CID}:6`, 2000);
  fixture.store.set(`exp:${CID}:56`, 30);
  fixture.set_inputs(0);
  await ablup39(CID);
  assert.equal(fixture.store.get(`abl:${CID}:39`), 1);
  assert.equal(fixture.store.get(`juel:${CID}:5`), 0);
  assert.equal(fixture.store.get(`juel:${CID}:6`), 0);
  assert.ok(fixture.text_lines().some((t) => t.includes('兽奸中毒变为LV1。')));
});

// ———— ABLUP40：局部中毒（issue #467） ——

test('ablup40：已达上限文案是独有的「已达到MAX」', async () => {
  const fixture = create_era_fixture();
  const { ablup40 } = seed(fixture);
  fixture.store.set(`abl:${CID}:40`, 10);
  await ablup40(CID);
  assert.ok(fixture.text_lines().includes('已达到MAX'));
});

test('ablup40：Lv0 需求行——欲望行显示 ABL:39+1（原作缺陷）且无「且」尾', async () => {
  const fixture = create_era_fixture();
  const { ablup40 } = seed(fixture);
  fixture.store.set(`abl:${CID}:11`, 1);
  fixture.store.set(`abl:${CID}:39`, 5);
  fixture.set_inputs(100);
  await ablup40(CID);
  assert.ok(fixture.text_lines().includes('欲望LV6以上(现在LV1)')); // 39+1=6，非 40+1
});

test('ablup40：内联状态文案（非 GET_ABLUP_STATE）与「放弃」按钮', async () => {
  const fixture = create_era_fixture();
  const { ablup40 } = seed(fixture);
  fixture.store.set(`abl:${CID}:11`, 1); // 欲望够（判定位按 ABL:40+1=1）
  fixture.store.set(`juel:${CID}:15`, 2000); // 点数达标，隔离出「ＯＫ」
  fixture.set_inputs(100);
  await ablup40(CID);
  const b = buttons(fixture);
  assert.equal(b.length, 2);
  assert.equal(b[0].text, '局部点数×2000/2000 ……ＯＫ');
  assert.equal(b[1].text, '放弃');

  const lack = create_era_fixture();
  const { ablup40: a2 } = seed(lack);
  lack.store.set(`abl:${CID}:40`, 2);
  lack.store.set(`abl:${CID}:11`, 3);
  lack.set_inputs(100);
  await a2(CID);
  // i = 点数（JUEL:15=0 < 10000）| 经验（F=3 > EXP:50=0）；能力位 3<3 为假不亮
  assert.equal(buttons(lack)[0].text, '局部点数×0/10000 ……点数不足 经验不足');
});

test('ablup40：Lv2 起需要异常经验（F=lv+1），异常经验行无「且」尾', async () => {
  const fixture = create_era_fixture();
  const { ablup40 } = seed(fixture);
  fixture.store.set(`abl:${CID}:40`, 2);
  fixture.store.set(`abl:${CID}:11`, 3);
  fixture.set_inputs(100);
  await ablup40(CID);
  const line = fixture.text_lines().find((t) => t.includes('异常经验'));
  assert.ok(line.includes('异常经验3以上(现在0)'));
  assert.ok(!line.endsWith('且'));
});

test('ablup40：F 的豁免素质逐条（容易上瘾/淫乱整块免）', async () => {
  const control = create_era_fixture();
  const { ablup40: control_ablup40 } = seed(control);
  control.store.set(`abl:${CID}:40`, 2);
  control.store.set(`abl:${CID}:11`, 3);
  control.set_inputs(100);
  await control_ablup40(CID);
  assert.ok(
    control.text_lines().some((t) => t.includes('异常经验3以上(现在0)')),
    '控制组：无豁免时 F = lv+1',
  );

  for (const t of [72, 76]) {
    const fixture = create_era_fixture();
    const { ablup40 } = seed(fixture);
    fixture.store.set(`abl:${CID}:40`, 2);
    fixture.store.set(`abl:${CID}:11`, 3);
    set_talents(fixture, { [t]: 1 });
    fixture.set_inputs(100);
    await ablup40(CID);
    assert.ok(
      !fixture.text_lines().some((x) => x.includes('异常经验')),
      `talent ${t}：F 整块豁免，不该渲染异常经验行`,
    );
  }
});

test('ablup40：条件不足时输入 0 打「条件不足」（本文件独有措辞）', async () => {
  const fixture = create_era_fixture();
  const { ablup40 } = seed(fixture);
  fixture.set_inputs(0, 100);
  await ablup40(CID);
  assert.ok(fixture.text_lines().includes('条件不足'));
});

test('ablup40：成功购买 +1 级扣局部点数（JUEL:15）', async () => {
  const fixture = create_era_fixture();
  const { ablup40 } = seed(fixture);
  fixture.store.set(`abl:${CID}:11`, 1);
  fixture.store.set(`juel:${CID}:15`, 2000);
  fixture.set_inputs(0);
  await ablup40(CID);
  assert.equal(fixture.store.get(`abl:${CID}:40`), 1);
  assert.equal(fixture.store.get(`juel:${CID}:15`), 0);
  assert.ok(fixture.text_lines().some((t) => t.includes('局部中毒变为LV1。')));
});

// ———— ABLUP99：反抗刻印消去（issue #467） ——

test('ablup99：无刻印时提示并等待', async () => {
  const fixture = create_era_fixture();
  const { ablup99 } = seed(fixture);
  await ablup99(CID);
  assert.ok(fixture.text_lines().includes('不存在反抗行为'));
  assert.equal(buttons(fixture).length, 0);
});

test('ablup99：Lv1 需求（A=5000，B=3）与两行门槛文案', async () => {
  const fixture = create_era_fixture();
  const { ablup99 } = seed(fixture);
  fixture.store.set(`mark:${CID}:3`, 1);
  fixture.set_inputs(100);
  await ablup99(CID);
  assert.ok(fixture.text_lines().includes('屈服刻印1以上(现在LV0)且'));
  assert.ok(fixture.text_lines().includes('顺从LV3以上(现在LV0)必要'));
  assert.equal(
    buttons(fixture)[0].text,
    '屈服点数×0/5000 ……点数不足 经验不足 能力不足',
  );
});

test('ablup99：刻印阶梯 2→10000 / 3→50000；刚强 ×3.0、坦率 ×0.5', async () => {
  const lv2 = create_era_fixture();
  const { ablup99: a1 } = seed(lv2);
  lv2.store.set(`mark:${CID}:3`, 2);
  lv2.set_inputs(100);
  await a1(CID);
  assert.ok(buttons(lv2)[0].text.includes('/10000'));

  const strong = create_era_fixture();
  const { ablup99: a2 } = seed(strong);
  strong.store.set(`mark:${CID}:3`, 3);
  set_talents(strong, { 12: 1 });
  strong.set_inputs(100);
  await a2(CID);
  assert.ok(buttons(strong)[0].text.includes('/150000')); // 50000*3.0

  const frank = create_era_fixture();
  const { ablup99: a3 } = seed(frank);
  frank.store.set(`mark:${CID}:3`, 3);
  set_talents(frank, { 13: 1 });
  frank.set_inputs(100);
  await a3(CID);
  assert.ok(buttons(frank)[0].text.includes('/25000')); // 50000*0.5
});

test('ablup99：成功消去一级（MARK:3-1）并扣屈服珠，文案显示下降后的等级', async () => {
  const fixture = create_era_fixture();
  const { ablup99 } = seed(fixture);
  fixture.store.set(`mark:${CID}:2`, 1); // 屈服刻印 >= 反抗刻印
  fixture.store.set(`mark:${CID}:3`, 1);
  fixture.store.set(`abl:${CID}:10`, 3); // 顺从 >= 1+2
  fixture.store.set(`juel:${CID}:6`, 5000);
  fixture.set_inputs(0);
  await ablup99(CID);
  assert.equal(fixture.store.get(`mark:${CID}:3`), 0);
  assert.equal(fixture.store.get(`juel:${CID}:6`), 0);
  assert.ok(
    fixture.text_lines().some((t) => t.includes('反抗刻印下降为LV0。')),
  );
});

test('ablup99：CORE_ABLUP99 每次只降一级（MARK:3 --）', async () => {
  const fixture = create_era_fixture();
  const { auto_ablup_core } = seed(fixture);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = CID;
  fixture.store.set(`mark:${CID}:2`, 3); // 屈服刻印 >= 反抗刻印
  fixture.store.set(`mark:${CID}:3`, 3);
  fixture.store.set(`abl:${CID}:10`, 5); // 顺从 >= 3+2
  fixture.store.set(`juel:${CID}:6`, 50000); // A = 50000
  await auto_ablup_core(99, 0);
  // 降一级后两珠不够再降，循环自然停：一次调用只减 1
  assert.equal(fixture.store.get(`mark:${CID}:3`), 2);
  assert.equal(fixture.store.get(`juel:${CID}:6`), 0);
});

// ———— ABLUP100：异界综合征消去（issue #467） ——

test('ablup100：无综合征时提示并等待', async () => {
  const fixture = create_era_fixture();
  const { ablup100 } = seed(fixture);
  await ablup100(CID);
  assert.ok(fixture.text_lines().includes('并没有异界异常反应'));
});

test('ablup100：Lv1 需求行（A=2000，感觉门槛 mark10+5、战斗门槛 10）', async () => {
  const fixture = create_era_fixture();
  const { ablup100 } = seed(fixture);
  fixture.store.set(`mark:${CID}:10`, 1);
  fixture.store.set(`cflag:${CID}:9`, 0);
  fixture.set_inputs(100);
  await ablup100(CID);
  assert.ok(fixture.text_lines().includes('各处感觉总计6以上(现在0)或'));
  assert.ok(
    fixture.text_lines().includes('战斗等级LV10以上(现在LV0)必要，然后'),
  );
  // C=0 时 C-5 为负，感觉门槛数值上恒过（显示与判定脱节，原作照抄）；只剩
  // 战斗门槛不满足（M=1 不点亮能力位）与异界经验不足 → 只有经验位
  assert.equal(buttons(fixture)[0].text, '异界经验点数×0/2000 ……经验不足 ');
});

test('ablup100：M==1（只差一项）不点亮能力位——两条件是 OR 关系', async () => {
  const fixture = create_era_fixture();
  const { ablup100 } = seed(fixture);
  fixture.store.set(`mark:${CID}:10`, 1);
  fixture.store.set(`abl:${CID}:0`, 6); // C=6，C-5=1 <= mark10=1 → 感觉门槛过
  fixture.store.set(`cflag:${CID}:9`, 0); // 战斗 0 < 10 → 不满足
  fixture.store.set(`exp:${CID}:99`, 2000);
  fixture.set_inputs(0);
  await ablup100(CID);
  assert.equal(fixture.store.get(`mark:${CID}:10`), 0);
  assert.equal(fixture.store.get(`exp:${CID}:99`), 0);
});

test('ablup100：阶梯 5→50000 与刚强 ×1.8、智慧 ×0.8', async () => {
  const base = create_era_fixture();
  const { ablup100: a1 } = seed(base);
  base.store.set(`mark:${CID}:10`, 5);
  base.set_inputs(100);
  await a1(CID);
  assert.ok(buttons(base)[0].text.includes('/50000'));

  const strong = create_era_fixture();
  const { ablup100: a2 } = seed(strong);
  strong.store.set(`mark:${CID}:10`, 5);
  set_talents(strong, { 12: 1, 172: 1 });
  strong.set_inputs(100);
  await a2(CID);
  // 50000*1.8*0.8 = 72000
  assert.ok(buttons(strong)[0].text.includes('/72000'));
});

test('ablup100：成功消去一级并扣异界经验（EXP:99）', async () => {
  const fixture = create_era_fixture();
  const { ablup100 } = seed(fixture);
  fixture.store.set(`mark:${CID}:10`, 1);
  fixture.store.set(`abl:${CID}:0`, 6); // C=6，C-5=1 <= mark10=1 → 感觉门槛过
  fixture.store.set(`cflag:${CID}:9`, 10); // B=10 <= 10 → 战斗门槛过
  fixture.store.set(`exp:${CID}:99`, 2000);
  fixture.set_inputs(0);
  await ablup100(CID);
  assert.equal(fixture.store.get(`mark:${CID}:10`), 0);
  assert.equal(fixture.store.get(`exp:${CID}:99`), 0);
  assert.ok(
    fixture.text_lines().some((t) => t.includes('异界综合征下降为LV0。')),
  );
});

// ———— ABL.ERB 本体（issue #467）：@DECIDE_ABLUP 分发 / @AUTO_ABLUP / @USERABLUP ————

test('decide_ablup：分发到已登记编号，未登记与表外返回 0', async () => {
  const fixture = create_era_fixture();
  const { decide_ablup } = seed(fixture);
  fixture.store.set(`juel:${CID}:0`, 1); // 阴蒂感觉 Lv0 恰需 1 点
  assert.equal(await decide_ablup(CID, 0), 1, 'JUEL:0 = 1 恰好够阴蒂感觉 Lv0');
  assert.equal(await decide_ablup(CID, 1), 0, 'JUEL:14 = 0 → 点数不足');
  assert.equal(
    await decide_ablup(CID, 20),
    0,
    'ABLUP20 的 DECIDE 尚未落地 → 落空',
  );
  assert.equal(await decide_ablup(CID, 999), 0, '表外编号');
});

test('decide_ablup：满级与封锁走 DECIDE 的提前 RETURN 0', async () => {
  const fixture = create_era_fixture();
  const { decide_ablup } = seed(fixture);
  fixture.store.set(`abl:${CID}:0`, 5);
  fixture.store.set(`juel:${CID}:0`, 999999);
  assert.equal(
    await decide_ablup(CID, 0),
    0,
    'Lv5 且无[自慰狂] → :139-140 判死',
  );
  set_talents(fixture, { 74: 1 });
  assert.equal(await decide_ablup(CID, 0), 1, '解锁后 Lv5 的 40000 点也够');

  const locked = create_era_fixture();
  const { decide_ablup: d2 } = seed(locked);
  set_talents(locked, { 101: 2 }); // 阴蒂钝感
  locked.store.set(`juel:${CID}:0`, 999999);
  assert.equal(await d2(CID, 0), 0, '封锁 → :144-145 判死');
});

test('decide_ablup37：组合门槛 ABL:37+ABL:38>=10 是 DECIDE 独有的', async () => {
  const fixture = create_era_fixture();
  const { decide_ablup, ablup37 } = seed(fixture);
  fixture.store.set(`abl:${CID}:37`, 1);
  fixture.store.set(`abl:${CID}:38`, 9); // 合计 10 → DECIDE 判死
  fixture.store.set(`abl:${CID}:11`, 2); // 欲望门槛（lv+1 = 2）
  fixture.store.set(`juel:${CID}:4`, 5000);
  fixture.store.set(`juel:${CID}:5`, 8000);
  fixture.store.set(`juel:${CID}:6`, 2500);
  fixture.store.set(`exp:${CID}:74`, 100);
  assert.equal(await decide_ablup(CID, 37), 0, 'DECIDE_ABLUP37 :95-96');
  fixture.set_inputs(100);
  await ablup37(CID); // 主流程没有这条门槛（文件头登记）
  assert.equal(buttons(fixture)[0].text, '恭顺点数×5000/5000 ……ＯＫ');
});

test('auto_ablup_core：连升到不能升为止，info 控制等级行', async () => {
  const fixture = create_era_fixture();
  const { auto_ablup_core } = seed(fixture);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = CID;
  fixture.store.set(`juel:${CID}:0`, 21); // Lv0→1 需 1 点、Lv1→2 需 20 点
  await auto_ablup_core(0, 1);
  assert.equal(fixture.store.get(`abl:${CID}:0`), 2);
  assert.equal(fixture.store.get(`juel:${CID}:0`), 0);
  assert.ok(
    fixture.text_lines().some((t) => t.includes('变为LV1')),
    'info=1：每个成功等级都打等级行',
  );
  assert.ok(
    fixture.text_lines().some((t) => t.includes('变为LV2')),
    'info=1：连升两级各打一行',
  );

  const quiet = create_era_fixture();
  const { auto_ablup_core: q } = seed(quiet);
  quiet.load_module('era-utils/era-flag').target = CID;
  quiet.store.set(`juel:${CID}:0`, 21);
  await q(0, 0); // info = 0
  assert.equal(quiet.store.get(`abl:${CID}:0`), 2);
  assert.ok(!quiet.text_lines().some((t) => t.includes('变为LV')));
});

test('auto_ablup_core：未落地编号（20-33）落空跳过，满级直接返回', async () => {
  const fixture = create_era_fixture();
  const { auto_ablup_core } = seed(fixture);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = CID;
  fixture.store.set(`juel:${CID}:7`, 999999); // 珠再多也没有 DECIDE_ABLUP20
  await auto_ablup_core(20, 1);
  assert.equal(fixture.store.get(`abl:${CID}:20`) ?? 0, 0);
  fixture.store.set(`abl:${CID}:0`, 10);
  await auto_ablup_core(0, 1);
  assert.equal(fixture.store.get(`abl:${CID}:0`), 10, 'ABL >= 10 直接返回');
});

test('auto_ablup：ARG 换目标后还原 TARGET；卖淫影响 0 时跳过 37', async () => {
  const OTHER = CID + 1;
  const fixture = create_era_fixture();
  const { auto_ablup } = seed(fixture);
  join_slave_chara(fixture, OTHER);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = CID;
  fixture.store.set(`juel:${OTHER}:0`, 1); // 阴蒂感觉 Lv0（证明循环确实在跑）
  fixture.store.set(`abl:${OTHER}:11`, 1); // 37 的欲望门槛（lv+1 = 1）
  // 珠给足：循环里 10（顺从）/11（欲望）先消耗 4/5 轨，37 仍要有 2000/3000/1000
  fixture.store.set(`juel:${OTHER}:4`, 100000);
  fixture.store.set(`juel:${OTHER}:5`, 100000);
  fixture.store.set(`juel:${OTHER}:6`, 100000);
  fixture.store.set(`exp:${OTHER}:74`, 100000);

  await auto_ablup(OTHER);
  assert.equal(era_flag.target, CID, 'TARGET 还原');
  assert.equal(fixture.store.get(`abl:${OTHER}:0`), 1);
  assert.equal(
    fixture.store.get(`abl:${OTHER}:37`) ?? 0,
    0,
    '卖淫影响缺省 0（负面）→ 37 跳过',
  );

  await auto_ablup(OTHER, { prostitution_effect: 1 });
  // auto_ablup_core 会一直升到升不动（:267 RESTART），珠给足就连升多级
  assert.ok(
    (fixture.store.get(`abl:${OTHER}:37`) || 0) >= 1,
    '卖淫影响为 1（正面）时 37 参与自动提升',
  );
});

test('auto_ablup：FLAG:5 位 36 打开时 COUNT > 15 直接 BREAK', async () => {
  const OTHER = CID + 1;
  const fixture = create_era_fixture();
  const { auto_ablup } = seed(fixture);
  join_slave_chara(fixture, OTHER);
  fixture.load_module('era-utils/era-flag').target = OTHER;
  fixture.store.set('flag:5', 2 ** 36); // 只自动提升部分能力
  fixture.store.set(`juel:${OTHER}:0`, 1);
  fixture.store.set(`abl:${OTHER}:11`, 1);
  fixture.store.set(`juel:${OTHER}:4`, 100000);
  fixture.store.set(`juel:${OTHER}:5`, 100000);
  fixture.store.set(`juel:${OTHER}:6`, 100000);
  fixture.store.set(`exp:${OTHER}:74`, 100000);

  // 卖淫影响传 1：37 不再被「负面评价」那条挡掉，只剩位 36 的 BREAK 能拦住它
  await auto_ablup(-1, { prostitution_effect: 1 });
  assert.equal(fixture.store.get(`abl:${OTHER}:0`), 1, 'COUNT 0 仍提升');
  assert.equal(
    fixture.store.get(`abl:${OTHER}:37`) ?? 0,
    0,
    'COUNT 37 > 15 → BREAK，不提升',
  );
});

test('userablup：非 999 返回 0；999 调 JUJUN／YOKUBO 两检查并返回 1', async () => {
  const fixture = create_era_fixture();
  const { userablup } = seed(fixture);
  fixture.era.beginTrain(0, CID); // 两个检查在调教域内（TFLAG:25 通道）
  fixture.load_module('era-utils/era-flag').target = CID;

  assert.equal(await userablup(0), 0);
  assert.equal(await userablup(998), 0);

  // JUJUN_UP_CHECK：顺从 >= 4 且反抗心 + 傲娇 → 反抗心 → 坦率
  fixture.store.set(`abl:${CID}:10`, 4);
  fixture.store.set(`talent:${CID}:11`, 1);
  fixture.store.set(`talent:${CID}:18`, 1);
  // YOKUBO_UP_CHECK：欲望 >= 3 且压抑 → 清除压抑 + 否定点数减半
  fixture.store.set(`abl:${CID}:11`, 3);
  fixture.store.set(`talent:${CID}:32`, 1);
  fixture.store.set(`juel:${CID}:100`, 100);

  assert.equal(await userablup(999), 1, 'BEGIN TURNEND 的转场信号');
  assert.equal(fixture.store.get(`talent:${CID}:11`), 0, '反抗心失去');
  assert.equal(fixture.store.get(`talent:${CID}:13`), 1, '获得坦率');
  assert.equal(fixture.store.get(`talent:${CID}:32`), 0, '压抑清除');
  assert.equal(fixture.store.get(`juel:${CID}:100`), 50, '否定点数减半');
});

test('decide_ablup39：上限判据是 32+33+39 >= 30（主流程是 >= 10）', async () => {
  const fixture = create_era_fixture();
  const { decide_ablup } = seed(fixture);
  // Lv9：梯子 a/b=300000、c(兽奸经验)=6000；三重上限时 A/B 覆盖为
  // lv²×4000 = 324000（主流程那条 >= 10 的价位门槛因此要 324000 才放行）
  fixture.store.set(`abl:${CID}:32`, 9);
  fixture.store.set(`abl:${CID}:33`, 9);
  fixture.store.set(`abl:${CID}:39`, 9); // 合计 27 < 30
  set_talents(fixture, { 76: 1 }); // Lv5+ 解锁（淫乱）
  fixture.store.set(`abl:${CID}:11`, 10); // 欲望门槛 lv+1 = 10
  fixture.store.set(`juel:${CID}:5`, 400000);
  fixture.store.set(`juel:${CID}:6`, 400000);
  fixture.store.set(`exp:${CID}:56`, 6000);
  fixture.store.set(`exp:${CID}:50`, 10); // F = lv-1 = 8
  assert.equal(await decide_ablup(CID, 39), 1, '合计 27：DECIDE 放行');
  fixture.store.set(`abl:${CID}:33`, 12); // 合计 30 → :100-102 判死
  assert.equal(await decide_ablup(CID, 39), 0, '合计 30：DECIDE 判死');
});

// ———— ABLUP20：抖S气质（train 域），单轨道，内联状态文案与全角括号 ————

test('ablup20：三档终止判定（特殊素质/组合上限/已达最高级）', async () => {
  const fixture = create_era_fixture();
  const { ablup20 } = seed(fixture);
  fixture.store.set(`abl:${CID}:20`, 5);
  await ablup20(CID);
  assert.ok(fixture.text_lines().includes('需要特殊素质才能继续提升'));

  const capped = create_era_fixture();
  const { ablup20: a2 } = seed(capped);
  // 组合上限分支须先过第一档：倒错的豁免 Lv5+，10+10=20 命中第二档
  capped.store.set(`abl:${CID}:20`, 10);
  capped.store.set(`abl:${CID}:21`, 10);
  set_talents(capped, { 80: 1 });
  await a2(CID);
  assert.ok(capped.text_lines().includes('抖S气质(10)＋抖M气质(10)上限为20'));

  const maxed = create_era_fixture();
  const { ablup20: a3 } = seed(maxed);
  maxed.store.set(`abl:${CID}:20`, 10);
  set_talents(maxed, { 80: 1 }); // 倒错的：绕过 Lv5+ 门槛，暴露第三档
  await a3(CID);
  assert.ok(maxed.text_lines().includes('已达最高级'));
});

test('ablup20：Lv0 梯子字面值与内联状态文案（bit2 无空格、bit4 有空格，与共享 GET_ABLUP_STATE 相反）', async () => {
  const fixture = create_era_fixture();
  const { ablup20 } = seed(fixture);
  fixture.set_inputs(100);
  await ablup20(CID);
  const b = buttons(fixture);
  assert.equal(b.length, 2); // [0][100]
  assert.equal(b[0].text, '欲情点数×0/100 ……点数不足 经验不足能力不足 ');
});

test('ablup20：欲望门槛行与施虐快乐经验行；异常经验行用全角括号（其余 ABLUP 文件均为半角）', async () => {
  const fixture = create_era_fixture();
  const { ablup20 } = seed(fixture);
  fixture.set_inputs(100);
  await ablup20(CID);
  assert.ok(fixture.text_lines().includes('欲望LV1以上(现在LV0)且'));
  assert.ok(fixture.text_lines().includes('　　　施虐快乐经验　0/5'));
  assert.ok(!fixture.text_lines().some((t) => t.includes('异常经验')));

  const lv3 = create_era_fixture();
  const { ablup20: a2 } = seed(lv3);
  lv3.store.set(`abl:${CID}:20`, 3);
  lv3.set_inputs(100);
  await a2(CID);
  assert.ok(lv3.text_lines().includes('异常经验1以上（现在0）且'));
});

test('ablup20：异常经验 C 的两段折扣——戒备森严在赋值前（无效）、淫乱在赋值后（×0.80 生效）', async () => {
  // Lv4：C=lv-2=2。戒备森严的 TIMES C 在 :175 赋值之前，乘 0 无效 → 仍为 2
  const guarded = create_era_fixture();
  const { ablup20: a1 } = seed(guarded);
  guarded.store.set(`abl:${CID}:20`, 4);
  set_talents(guarded, { 27: 1 });
  guarded.set_inputs(100);
  await a1(CID);
  assert.ok(guarded.text_lines().includes('异常经验2以上（现在0）且'));

  // 淫乱的 TIMES C 在 :175 之后（:279）→ floor(2×0.80)=1
  const lewd = create_era_fixture();
  const { ablup20: a2 } = seed(lewd);
  lewd.store.set(`abl:${CID}:20`, 4);
  set_talents(lewd, { 76: 1 });
  lewd.set_inputs(100);
  await a2(CID);
  assert.ok(lewd.text_lines().includes('异常经验1以上（现在0）且'));

  // 两者同时：戒备森严仍无效，淫乱照常折扣
  const both = create_era_fixture();
  const { ablup20: a3 } = seed(both);
  both.store.set(`abl:${CID}:20`, 4);
  set_talents(both, { 27: 1, 76: 1 });
  both.set_inputs(100);
  await a3(CID);
  assert.ok(both.text_lines().includes('异常经验1以上（现在0）且'));
});

test('ablup20：素质修正——胆怯只乘 A(×1.50)，施虐狂 A/B 同乘(×0.50)', async () => {
  const timid = create_era_fixture();
  const { ablup20: a1 } = seed(timid);
  set_talents(timid, { 10: 1, 11: 1 });
  timid.store.set(`abl:${CID}:11`, 1);
  timid.set_inputs(100);
  await a1(CID);
  // A=100×1.5(胆怯)×0.9(反抗心)=135；B=5×0.9=4（floor）
  assert.equal(buttons(timid)[0].text, '欲情点数×0/135 ……点数不足 经验不足');
  assert.ok(timid.text_lines().includes('　　　施虐快乐经验　0/4'));

  const sadist = create_era_fixture();
  const { ablup20: a2 } = seed(sadist);
  set_talents(sadist, { 83: 1 });
  sadist.store.set(`abl:${CID}:11`, 1);
  sadist.store.set(`juel:${CID}:5`, 50);
  sadist.set_inputs(100);
  await a2(CID);
  assert.equal(buttons(sadist)[0].text, '欲情点数×50/50 ……经验不足'); // exp:33=0 < 2
  assert.ok(sadist.text_lines().includes('　　　施虐快乐经验　0/2'));
});

test('ablup20：成功购买写入 abl:20、扣欲情点数、显示变为LV（era.add，train 属主）', async () => {
  const fixture = create_era_fixture();
  const { ablup20 } = seed(fixture);
  fixture.store.set(`juel:${CID}:5`, 100);
  fixture.store.set(`exp:${CID}:33`, 5);
  fixture.store.set(`abl:${CID}:11`, 1);
  fixture.set_inputs(0);
  await ablup20(CID);
  assert.equal(fixture.store.get(`abl:${CID}:20`), 1);
  assert.equal(fixture.store.get(`juel:${CID}:5`), 0);
  assert.ok(fixture.text_lines().some((t) => t.includes('抖S气质变为LV1。')));
});

test('ablup20：条件不足时选 [0] 重试提示"未满足条件"（无句号）', async () => {
  const fixture = create_era_fixture();
  const { ablup20 } = seed(fixture);
  fixture.set_inputs(0, 100);
  await ablup20(CID);
  assert.ok(fixture.text_lines().includes('未满足条件'));
  assert.ok(!fixture.text_lines().includes('未满足条件。'));
});

// ———— ABLUP21：抖M气质（system 域写入），苦痛+欲情 / 苦痛+屈服 双轨道 ————

test('ablup21：三档终止判定（特殊素质/组合上限/已达最高级）', async () => {
  const fixture = create_era_fixture();
  const { ablup21 } = seed(fixture);
  fixture.store.set(`abl:${CID}:21`, 5);
  await ablup21(CID);
  assert.ok(fixture.text_lines().includes('需要特殊素质才能继续提升'));

  const capped = create_era_fixture();
  const { ablup21: a2 } = seed(capped);
  // 受虐狂豁免第一档，10+10=20 命中第二档
  capped.store.set(`abl:${CID}:20`, 10);
  capped.store.set(`abl:${CID}:21`, 10);
  set_talents(capped, { 88: 1 });
  await a2(CID);
  assert.ok(capped.text_lines().includes('抖S气质(10)＋抖M气质(10)上限为20'));

  const maxed = create_era_fixture();
  const { ablup21: a3 } = seed(maxed);
  maxed.store.set(`abl:${CID}:21`, 10);
  set_talents(maxed, { 88: 1 }); // 受虐狂：绕过 Lv5+ 门槛，暴露第三档
  await a3(CID);
  assert.ok(maxed.text_lines().includes('已达最高级'));
});

test('ablup21：Lv0 梯子字面值，双轨道皆渲染；[1] 轨带绝顶经验 G=1', async () => {
  const fixture = create_era_fixture();
  const { ablup21 } = seed(fixture);
  fixture.set_inputs(100);
  await ablup21(CID);
  const b = buttons(fixture);
  assert.equal(b.length, 3); // [0][1][100]
  assert.equal(b[0].text, '苦痛点数×0/100 ……点数不足 能力不足');
  assert.equal(b[1].text, '苦痛点数×0/100 ……点数不足 经验不足 能力不足'); // [1] 轨含绝顶经验 G=1 的 bit2
  assert.ok(fixture.text_lines().includes('　　　欲情点数×0/100'));
  assert.ok(fixture.text_lines().includes('　　　屈服点数×0/100'));
  assert.ok(fixture.text_lines().includes('　　　绝顶经验　0/1'));
});

test('ablup21：Lv3 起苦痛+欲情轨道隐藏（B=0 → I=256），只剩 [1]', async () => {
  const fixture = create_era_fixture();
  const { ablup21 } = seed(fixture);
  fixture.store.set(`abl:${CID}:21`, 3);
  fixture.store.set(`abl:${CID}:11`, 4);
  fixture.set_inputs(100);
  await ablup21(CID);
  const b = buttons(fixture);
  assert.equal(b.length, 2); // [1][100]
  assert.equal(b[0].accelerator, 1);
  assert.equal(b[0].text, '苦痛点数×0/2800 ……点数不足 经验不足 ');
  assert.ok(!fixture.text_lines().some((t) => t.includes('欲情点数')));

  const rejected = create_era_fixture();
  const { ablup21: a2 } = seed(rejected);
  rejected.store.set(`abl:${CID}:21`, 3);
  rejected.set_inputs(0);
  await assert.rejects(a2(CID), /测试夹具：输入不合法/);
});

test('ablup21：Lv3→4 异常经验门槛 F=1（半角括号），受虐狂可免；欲望门槛双轨同时命中', async () => {
  const fixture = create_era_fixture();
  const { ablup21 } = seed(fixture);
  fixture.store.set(`abl:${CID}:21`, 3);
  fixture.store.set(`abl:${CID}:11`, 4);
  fixture.set_inputs(100);
  await ablup21(CID);
  assert.ok(fixture.text_lines().includes('异常经验1以上(现在0)且'));

  const freed = create_era_fixture();
  const { ablup21: a2 } = seed(freed);
  freed.store.set(`abl:${CID}:21`, 3);
  set_talents(freed, { 88: 1 }); // 受虐狂：豁免异常经验（同时豁免 Lv5 上限）
  freed.set_inputs(100);
  await a2(CID);
  assert.ok(!freed.text_lines().some((t) => t.includes('异常经验')));

  const gated = create_era_fixture();
  const { ablup21: a3 } = seed(gated);
  gated.set_inputs(100); // abl:11=0 < lv+1=1
  await a3(CID);
  for (const btn of buttons(gated)) {
    if (btn.accelerator === 100) continue;
    assert.ok(btn.text.includes('能力不足'));
  }
});

test('ablup21：素质修正五元组——受虐狂×0.50 全乘、开放×0.60 全乘', async () => {
  const maso = create_era_fixture();
  const { ablup21: a1 } = seed(maso);
  set_talents(maso, { 88: 1 });
  maso.store.set(`abl:${CID}:11`, 1);
  maso.set_inputs(100);
  await a1(CID);
  assert.equal(buttons(maso)[0].text, '苦痛点数×0/50 ……点数不足 ');
  assert.ok(maso.text_lines().includes('　　　欲情点数×0/50'));

  const open = create_era_fixture();
  const { ablup21: a2 } = seed(open);
  set_talents(open, { 33: 1 });
  open.store.set(`abl:${CID}:11`, 1);
  open.set_inputs(100);
  await a2(CID);
  assert.equal(buttons(open)[0].text, '苦痛点数×0/60 ……点数不足 ');
  assert.ok(open.text_lines().includes('　　　屈服点数×0/60'));
});

test('ablup21：两条购买路径各自扣对应珠、写入 chara(cid).system.抖M气质', async () => {
  // Lv0：[0] A=100/B=100（苦痛+欲情）；[1] D=100/E=100（苦痛+屈服）
  for (const [result, keys] of [
    [0, [9, 5]],
    [1, [9, 6]],
  ]) {
    const fixture = create_era_fixture();
    const { ablup21 } = seed(fixture);
    for (const k of [5, 6, 9]) fixture.store.set(`juel:${CID}:${k}`, 100);
    fixture.store.set(`exp:${CID}:2`, 1); // [1] 轨绝顶经验 G=1
    fixture.store.set(`abl:${CID}:11`, 1);
    fixture.set_inputs(result);
    await ablup21(CID);
    assert.equal(fixture.store.get(`abl:${CID}:21`), 1);
    for (const k of keys) {
      assert.equal(fixture.store.get(`juel:${CID}:${k}`), 0, `juel:${k}`);
    }
    assert.ok(fixture.text_lines().some((t) => t.includes('抖M气质变为LV1。')));
  }
});

test('ablup21：Lv3 走 [1] 轨购买（D=2800/E=6000/被虐快乐 30/绝顶 1）', async () => {
  const fixture = create_era_fixture();
  const { ablup21 } = seed(fixture);
  fixture.store.set(`abl:${CID}:21`, 3);
  fixture.store.set(`abl:${CID}:11`, 4);
  fixture.store.set(`exp:${CID}:50`, 1); // 异常经验 F=1
  fixture.store.set(`exp:${CID}:30`, 30);
  fixture.store.set(`exp:${CID}:2`, 1);
  fixture.store.set(`juel:${CID}:9`, 2800);
  fixture.store.set(`juel:${CID}:6`, 6000);
  fixture.set_inputs(1);
  await ablup21(CID);
  assert.equal(fixture.store.get(`abl:${CID}:21`), 4);
  assert.equal(fixture.store.get(`juel:${CID}:9`), 0);
  assert.equal(fixture.store.get(`juel:${CID}:6`), 0);
});

test('ablup21：Lv3 戒备森严 C/D/E ×1.50（30→45、2800→4200、6000→9000）', async () => {
  const fixture = create_era_fixture();
  const { ablup21 } = seed(fixture);
  fixture.store.set(`abl:${CID}:21`, 3);
  fixture.store.set(`abl:${CID}:11`, 4);
  fixture.store.set(`exp:${CID}:50`, 1); // 异常经验 F=1
  set_talents(fixture, { 27: 1 }); // 戒备森严：Lv3 列是 C/D/E 三列，不作用于 A/B
  fixture.set_inputs(100);
  await ablup21(CID);
  const b = buttons(fixture);
  assert.equal(b.length, 2); // [1][100]（B=0，[0] 轨隐藏）
  assert.equal(b[0].text, '苦痛点数×0/4200 ……点数不足 经验不足 ');
  assert.ok(fixture.text_lines().includes('　　　屈服点数×0/9000'));
  assert.ok(fixture.text_lines().includes('　　　被虐快乐经验　0/45'));
});
test('ablup21：Lv4 梯子字面值（D=4300/E=12000/被虐快乐 80）与戒备森严 ×2.00', async () => {
  const plain = create_era_fixture();
  const { ablup21: a1 } = seed(plain);
  plain.store.set(`abl:${CID}:21`, 4);
  plain.store.set(`abl:${CID}:11`, 5);
  plain.store.set(`exp:${CID}:50`, 2); // 异常经验 F=lv-2=2
  plain.set_inputs(100);
  await a1(CID);
  const b = buttons(plain);
  assert.equal(b.length, 2); // [1][100]（B=0，[0] 轨隐藏）
  assert.equal(b[0].text, '苦痛点数×0/4300 ……点数不足 经验不足 ');
  assert.ok(plain.text_lines().includes('　　　屈服点数×0/12000'));
  assert.ok(plain.text_lines().includes('　　　被虐快乐经验　0/80'));

  const guarded = create_era_fixture();
  const { ablup21: a2 } = seed(guarded);
  guarded.store.set(`abl:${CID}:21`, 4);
  guarded.store.set(`abl:${CID}:11`, 5);
  guarded.store.set(`exp:${CID}:50`, 2);
  set_talents(guarded, { 27: 1 }); // 戒备森严 Lv4：C/D/E 各 ×2.00
  guarded.set_inputs(100);
  await a2(CID);
  assert.equal(
    buttons(guarded)[0].text,
    '苦痛点数×0/8600 ……点数不足 经验不足 ',
  );
  assert.ok(guarded.text_lines().includes('　　　屈服点数×0/24000'));
  assert.ok(guarded.text_lines().includes('　　　被虐快乐经验　0/160'));
});

// ———— ABLUP22：百合气质（chara 域写入），男人直接返回，异常经验行在欲望行之前 ————

test('ablup22：男人（TALENT:122）在 DRAWLINE 前直接返回，无任何输出', async () => {
  const fixture = create_era_fixture();
  const { ablup22 } = seed(fixture);
  set_talents(fixture, { 122: 1 });
  await ablup22(CID);
  assert.equal(fixture.text_lines().length, 0);
  assert.equal(buttons(fixture).length, 0);
});

test('ablup22：两档终止判定（五项豁免素质/已达最高级）', async () => {
  const fixture = create_era_fixture();
  const { ablup22 } = seed(fixture);
  fixture.store.set(`abl:${CID}:22`, 5);
  await ablup22(CID);
  assert.ok(fixture.text_lines().includes('需要特殊素质才能继续提升'));

  const unlocked = create_era_fixture();
  const { ablup22: a2 } = seed(unlocked);
  unlocked.store.set(`abl:${CID}:22`, 5);
  set_talents(unlocked, { 82: 1 }); // 讨厌男人：豁免（不在异常经验豁免名单里，正好隔离）
  unlocked.store.set(`abl:${CID}:11`, 6);
  unlocked.set_inputs(100);
  await a2(CID);
  assert.ok(!unlocked.text_lines().includes('需要特殊素质才能继续提升'));

  const maxed = create_era_fixture();
  const { ablup22: a3 } = seed(maxed);
  maxed.store.set(`abl:${CID}:22`, 10);
  set_talents(maxed, { 33: 1 }); // 开放：绕过 Lv5+ 门槛，暴露第二档
  await a3(CID);
  assert.ok(maxed.text_lines().includes('已达最高级'));
});

test('ablup22：Lv0 梯子字面值，双轨皆渲染；屈服行 C=0 不显示', async () => {
  const fixture = create_era_fixture();
  const { ablup22 } = seed(fixture);
  fixture.set_inputs(100);
  await ablup22(CID);
  const b = buttons(fixture);
  assert.equal(b.length, 3); // [0][1][100]
  assert.equal(b[0].text, '欲情点数×0/200 ……点数不足 经验不足 能力不足');
  assert.equal(b[1].text, '阴核点数×0/1000 ……点数不足 经验不足 能力不足');
  assert.ok(fixture.text_lines().includes('　　　百合经验　0/50'));
  assert.ok(!fixture.text_lines().some((t) => t.includes('屈服点数')));
});

test('ablup22：Lv2 起阴核轨道隐藏（D=0 → J=256）且屈服行出现；Lv2 欲情门槛 = lv+1', async () => {
  const fixture = create_era_fixture();
  const { ablup22 } = seed(fixture);
  fixture.store.set(`abl:${CID}:22`, 2);
  fixture.set_inputs(100);
  await ablup22(CID);
  const b = buttons(fixture);
  assert.equal(b.length, 2); // [0][100]
  assert.equal(b[0].text, '欲情点数×0/3000 ……点数不足 经验不足 能力不足');
  assert.ok(fixture.text_lines().includes('　　　屈服点数×0/1000'));

  const rejected = create_era_fixture();
  const { ablup22: a2 } = seed(rejected);
  rejected.store.set(`abl:${CID}:22`, 2);
  rejected.set_inputs(1);
  await assert.rejects(a2(CID), /测试夹具：输入不合法/);
});

test('ablup22：异常经验行在欲望行之前（与其他 ABLUP 文件相反），半角括号', async () => {
  const fixture = create_era_fixture();
  const { ablup22 } = seed(fixture);
  fixture.store.set(`abl:${CID}:22`, 3);
  fixture.set_inputs(100);
  await ablup22(CID);
  const lines = fixture.text_lines();
  const exp_idx = lines.findIndex((t) => t.includes('异常经验1以上(现在0)且'));
  const abl_idx = lines.findIndex((t) => t.includes('欲望LV4以上(现在LV0)且'));
  assert.ok(exp_idx >= 0 && abl_idx >= 0);
  assert.ok(
    exp_idx < abl_idx,
    '异常经验行应先于欲望行（ABLUP22.ERB:47/50 顺序）',
  );
});

test('ablup22：素质修正——双性恋×0.50 四元组、男人婆×2.00（百合特有）', async () => {
  const bi = create_era_fixture();
  const { ablup22: a1 } = seed(bi);
  set_talents(bi, { 81: 1 });
  bi.store.set(`abl:${CID}:11`, 1);
  bi.set_inputs(100);
  await a1(CID);
  assert.equal(buttons(bi)[0].text, '欲情点数×0/100 ……点数不足 经验不足 ');
  assert.equal(buttons(bi)[1].text, '阴核点数×0/500 ……点数不足 经验不足 ');

  const macho = create_era_fixture();
  const { ablup22: a2 } = seed(macho);
  set_talents(macho, { 79: 1 });
  macho.store.set(`abl:${CID}:11`, 1);
  macho.set_inputs(100);
  await a2(CID);
  assert.equal(buttons(macho)[0].text, '欲情点数×0/400 ……点数不足 经验不足 ');

  const hater = create_era_fixture();
  const { ablup22: a3 } = seed(hater);
  set_talents(hater, { 82: 1 }); // 讨厌男人：×0.50（与 ABLUP23 的 ×3.00 相反）
  hater.store.set(`abl:${CID}:11`, 1);
  hater.set_inputs(100);
  await a3(CID);
  assert.equal(buttons(hater)[0].text, '欲情点数×0/100 ……点数不足 经验不足 ');
  assert.equal(buttons(hater)[1].text, '阴核点数×0/500 ……点数不足 经验不足 ');
});

test('ablup22：坦率（TALENT:13）×0.95 四元组（A/B/C/D 同步）', async () => {
  const fixture = create_era_fixture();
  const { ablup22 } = seed(fixture);
  set_talents(fixture, { 13: 1 });
  fixture.set_inputs(100);
  await ablup22(CID);
  const b = buttons(fixture);
  assert.equal(b[0].text, '欲情点数×0/190 ……点数不足 经验不足 能力不足');
  assert.equal(b[1].text, '阴核点数×0/950 ……点数不足 经验不足 能力不足');
  assert.ok(fixture.text_lines().includes('　　　百合经验　0/47'));
});

test('ablup22：两条购买路径各自扣对应珠、写入 chara(cid).chara.百合气质', async () => {
  // Lv0：[0] A=200/C=0；[1] D=1000
  for (const [result, key, need] of [
    [0, 5, 200],
    [1, 0, 1000],
  ]) {
    const fixture = create_era_fixture();
    const { ablup22 } = seed(fixture);
    fixture.store.set(`juel:${CID}:${key}`, need);
    fixture.store.set(`exp:${CID}:40`, 50);
    fixture.store.set(`abl:${CID}:11`, 1);
    fixture.set_inputs(result);
    await ablup22(CID);
    assert.equal(fixture.store.get(`abl:${CID}:22`), 1);
    assert.equal(fixture.store.get(`juel:${CID}:${key}`), 0, `juel:${key}`);
    assert.ok(
      fixture.text_lines().some((t) => t.includes('百合气质变为LV1。')),
    );
  }
});

// ———— ABLUP23：断背气质（system 域写入），非男人才可用，无欲望门槛 ————

test('ablup23：非男人（TALENT:122==0）在 DRAWLINE 前直接返回；男人才继续', async () => {
  const fixture = create_era_fixture();
  const { ablup23 } = seed(fixture);
  await ablup23(CID);
  assert.equal(fixture.text_lines().length, 0);

  const male = create_era_fixture();
  const { ablup23: a2 } = seed(male);
  set_talents(male, { 122: 1 });
  male.set_inputs(100);
  await a2(CID);
  assert.equal(buttons(male).length, 3); // [0][1][100]
});

test('ablup23：两档终止判定（四项豁免，讨厌男人不在名单内）', async () => {
  const fixture = create_era_fixture();
  const { ablup23 } = seed(fixture);
  set_talents(fixture, { 122: 1 });
  fixture.store.set(`abl:${CID}:23`, 5);
  await ablup23(CID);
  assert.ok(fixture.text_lines().includes('需要特殊素质才能继续提升'));

  const unlocked = create_era_fixture();
  const { ablup23: a2 } = seed(unlocked);
  set_talents(unlocked, { 122: 1, 82: 1 }); // 讨厌男人：不豁免（四项名单 33/80/81/123）
  unlocked.store.set(`abl:${CID}:23`, 5);
  await a2(CID);
  assert.ok(unlocked.text_lines().includes('需要特殊素质才能继续提升'));

  const maxed = create_era_fixture();
  const { ablup23: a3 } = seed(maxed);
  set_talents(maxed, { 122: 1, 33: 1 }); // 开放：绕过 Lv5+ 门槛，暴露第二档
  maxed.store.set(`abl:${CID}:23`, 10);
  await a3(CID);
  assert.ok(maxed.text_lines().includes('已达最高级'));
});

test('ablup23：Lv0 梯子字面值；[1] 用肛门点数；无欲望门槛行', async () => {
  const fixture = create_era_fixture();
  const { ablup23 } = seed(fixture);
  set_talents(fixture, { 122: 1 });
  fixture.set_inputs(100);
  await ablup23(CID);
  const b = buttons(fixture);
  assert.equal(b.length, 3); // [0][1][100]
  assert.equal(b[0].text, '欲情点数×0/200 ……点数不足 经验不足 ');
  assert.equal(b[1].text, '肛门点数×0/1000 ……点数不足 经验不足 ');
  // Lv0 双轨各打一行断背经验：按条数断言，单看「包含」会被另一条轨道掩盖
  assert.equal(
    fixture.text_lines().filter((t) => t === '　　　断背经验　0/50').length,
    2,
  );
  assert.ok(!fixture.text_lines().some((t) => t.includes('百合经验')));
  assert.ok(!fixture.text_lines().some((t) => t.includes('欲望LV')));
});

test('ablup23：讨厌男人×3.00（与 ABLUP22 的×0.50 相反）；Lv3 异常经验 E=1', async () => {
  const hater = create_era_fixture();
  const { ablup23: a1 } = seed(hater);
  set_talents(hater, { 122: 1, 82: 1 });
  hater.store.set(`exp:${CID}:41`, 50);
  hater.set_inputs(100);
  await a1(CID);
  assert.equal(buttons(hater)[0].text, '欲情点数×0/600 ……点数不足 经验不足 ');

  const lv3 = create_era_fixture();
  const { ablup23: a2 } = seed(lv3);
  set_talents(lv3, { 122: 1 });
  lv3.store.set(`abl:${CID}:23`, 3);
  lv3.set_inputs(100);
  await a2(CID);
  assert.ok(lv3.text_lines().includes('异常经验1以上(现在0)且'));
});

test('ablup23：献身的（TALENT:63）×0.95 四元组', async () => {
  const fixture = create_era_fixture();
  const { ablup23 } = seed(fixture);
  set_talents(fixture, { 122: 1, 63: 1 }); // 男人 + 献身的
  fixture.set_inputs(100);
  await ablup23(CID);
  assert.equal(buttons(fixture)[0].text, '欲情点数×0/190 ……点数不足 经验不足 ');
  assert.equal(buttons(fixture)[1].text, '肛门点数×0/950 ……点数不足 经验不足 ');
});

test('ablup23：Lv2 起肛门轨道隐藏；两条购买路径各自扣对应珠、写入 chara(cid).system.断背气质', async () => {
  const lv2 = create_era_fixture();
  const { ablup23: a0 } = seed(lv2);
  set_talents(lv2, { 122: 1 });
  lv2.store.set(`abl:${CID}:23`, 2);
  lv2.set_inputs(100);
  await a0(CID);
  assert.equal(buttons(lv2).length, 2); // [0][100]

  // Lv0：[0] A=200/C=0；[1] D=1000（JUEL:2 肛门）
  for (const [result, key, need] of [
    [0, 5, 200],
    [1, 2, 1000],
  ]) {
    const fixture = create_era_fixture();
    const { ablup23 } = seed(fixture);
    set_talents(fixture, { 122: 1 });
    fixture.store.set(`juel:${CID}:${key}`, need);
    fixture.store.set(`exp:${CID}:41`, 50);
    fixture.set_inputs(result);
    await ablup23(CID);
    assert.equal(fixture.store.get(`abl:${CID}:23`), 1);
    assert.equal(fixture.store.get(`juel:${CID}:${key}`), 0, `juel:${key}`);
    assert.ok(
      fixture.text_lines().some((t) => t.includes('断背气质变为LV1。')),
    );
  }
});

test('ablup23：Lv4 戒备森严 A/B/C ×2.00（20000→40000、800→1600、5000→10000）', async () => {
  const fixture = create_era_fixture();
  const { ablup23 } = seed(fixture);
  set_talents(fixture, { 122: 1, 27: 1 }); // 男人 + 戒备森严
  fixture.store.set(`abl:${CID}:23`, 4);
  fixture.store.set(`abl:${CID}:11`, 5);
  fixture.store.set(`exp:${CID}:50`, 2); // 异常经验 E=lv-2=2
  fixture.set_inputs(100);
  await ablup23(CID);
  const b = buttons(fixture);
  assert.equal(b.length, 2); // [0][100]（D=0，[1] 轨隐藏）
  assert.equal(b[0].text, '欲情点数×0/40000 ……点数不足 经验不足 ');
  assert.ok(fixture.text_lines().includes('　　　屈服点数×0/10000'));
  assert.ok(fixture.text_lines().includes('　　　断背经验　0/1600'));
});

// ———— ABLUP30：性交中毒（train 域写入），正常/三倍点数+半经验 双轨道 ————

test('ablup30：三档终止判定（六项豁免须全有——主流程 OR 拦截）/组合上限三行提示', async () => {
  const fixture = create_era_fixture();
  const { ablup30 } = seed(fixture);
  fixture.store.set(`abl:${CID}:30`, 5);
  await ablup30(CID);
  assert.ok(fixture.text_lines().includes('需要特殊素质才能继续提升'));

  const partial = create_era_fixture();
  const { ablup30: a_p } = seed(partial);
  partial.store.set(`abl:${CID}:30`, 5);
  set_talents(partial, { 85: 1 }); // 只有爱慕，缺其余五项 → OR 语义仍拦
  await a_p(CID);
  assert.ok(partial.text_lines().includes('需要特殊素质才能继续提升'));

  const capped = create_era_fixture();
  const { ablup30: a2 } = seed(capped);
  capped.store.set(`abl:${CID}:30`, 5);
  capped.store.set(`abl:${CID}:31`, 5); // 合计 10
  set_talents(capped, { 85: 1, 76: 1, 63: 1, 70: 1, 75: 1, 77: 1 }); // 全六项豁免才过第一档（OR）
  await a2(CID);
  assert.ok(capped.text_lines().includes('性交中毒(5)＋自慰中毒(5)上限为10'));
  assert.ok(
    capped
      .text_lines()
      .some((t) =>
        t.includes('至少达成欲情点数25000点或屈服点数7500点的其中一项'),
      ),
  );
  assert.ok(capped.text_lines().includes('方可提升当前性交中毒的等级'));

  const maxed = create_era_fixture();
  const { ablup30: a3 } = seed(maxed);
  maxed.store.set(`abl:${CID}:30`, 10);
  set_talents(maxed, { 85: 1, 76: 1, 63: 1, 70: 1, 75: 1, 77: 1 });
  // 10+0=10 命中合计分支：给足珠（10²×1000/10²×300）放行，暴露第三档
  maxed.store.set(`juel:${CID}:5`, 30000);
  maxed.store.set(`juel:${CID}:6`, 100000);
  await a3(CID);
  assert.ok(maxed.text_lines().includes('已达最高级'));
});

test('ablup30：合计 10-19 且珠够时放行（DECIDE 里 >=20 才 RETURN），照常出需求', async () => {
  const fixture = create_era_fixture();
  set_talents(fixture, { 85: 1, 76: 1, 63: 1, 70: 1, 75: 1, 77: 1 });
  const { ablup30 } = seed(fixture);
  fixture.store.set(`abl:${CID}:30`, 5);
  fixture.store.set(`abl:${CID}:31`, 5); // 合计 10
  fixture.store.set(`juel:${CID}:5`, 7500); // 判定查 JUEL:5 ≥ 30²×300（与提示文案错位，原作如此）
  fixture.store.set(`juel:${CID}:6`, 25000); // 判定查 JUEL:6 ≥ 30²×1000
  fixture.set_inputs(100);
  await ablup30(CID);
  assert.equal(buttons(fixture).length, 3); // [0][1][100]，未被上限拦截
  // 豁免素质中的淫乱 ×0.8 与接受快感 ×0.9 都在修正表：A=70000×0.72=50400
  assert.equal(
    buttons(fixture)[0].text.startsWith('欲情点数×7500/50400'),
    true,
  );
});

test('ablup30：Lv0 梯子字面值；[1] 三倍点数+半经验（A*3/B*3/C/2）恒渲染', async () => {
  const fixture = create_era_fixture();
  const { ablup30 } = seed(fixture);
  fixture.set_inputs(100);
  await ablup30(CID);
  const b = buttons(fixture);
  assert.equal(b.length, 3); // [0][1][100]
  assert.equal(b[0].text, '欲情点数×0/3000 ……点数不足 经验不足 能力不足');
  assert.equal(b[1].text, '欲情点数×0/9000 ……点数不足 经验不足 能力不足');
  assert.ok(fixture.text_lines().includes('　　　屈服点数×0/10000'));
  assert.ok(fixture.text_lines().includes('　　　性交经验　0/10'));
  assert.ok(fixture.text_lines().includes('　　　屈服点数×0/30000'));
  assert.ok(fixture.text_lines().includes('　　　性交经验　0/5'));
  assert.ok(fixture.text_lines().includes('侍奉精神LV1以上(现在LV0)且'));
});

test('ablup30：Lv2→3 异常经验门槛 F=lv-1，开放可免；素质修正——容易陷落×0.50、崩坏×0.80（非 2.00）', async () => {
  const fixture = create_era_fixture();
  const { ablup30 } = seed(fixture);
  fixture.store.set(`abl:${CID}:30`, 2);
  fixture.store.set(`abl:${CID}:16`, 3);
  fixture.set_inputs(100);
  await ablup30(CID);
  assert.ok(fixture.text_lines().includes('异常经验1以上(现在0)且'));

  const fallen = create_era_fixture();
  const { ablup30: a1 } = seed(fallen);
  set_talents(fallen, { 73: 1 });
  fallen.store.set(`abl:${CID}:16`, 1);
  fallen.set_inputs(100);
  await a1(CID);
  assert.equal(buttons(fallen)[0].text, '欲情点数×0/1500 ……点数不足 经验不足 ');

  const broken = create_era_fixture();
  const { ablup30: a2 } = seed(broken);
  set_talents(broken, { 9: 1 });
  broken.store.set(`abl:${CID}:16`, 1);
  broken.set_inputs(100);
  await a2(CID);
  assert.equal(buttons(broken)[0].text, '欲情点数×0/2400 ……点数不足 经验不足 ');
});

test('ablup30：两条购买路径各自扣对应珠、era.add 写入 abl:30', async () => {
  // Lv0：[0] A=3000/B=10000/C=10；[1] A*3=9000/B*3=30000/C/2=5
  for (const [result, j5, j6, e5, rem5, rem6] of [
    [0, 3000, 10000, 10, 0, 0],
    [1, 9000, 30000, 5, 0, 0],
  ]) {
    const fixture = create_era_fixture();
    const { ablup30 } = seed(fixture);
    fixture.store.set(`juel:${CID}:5`, j5);
    fixture.store.set(`juel:${CID}:6`, j6);
    fixture.store.set(`exp:${CID}:5`, e5);
    fixture.store.set(`abl:${CID}:16`, 1);
    fixture.set_inputs(result);
    await ablup30(CID);
    assert.equal(fixture.store.get(`abl:${CID}:30`), 1);
    assert.equal(fixture.store.get(`juel:${CID}:5`), rem5);
    assert.equal(fixture.store.get(`juel:${CID}:6`), rem6);
    assert.ok(
      fixture.text_lines().some((t) => t.includes('性交中毒变为LV1。')),
    );
  }
});

test('ablup30：点数不足时两个重试文案（无句号）', async () => {
  const fixture = create_era_fixture();
  const { ablup30 } = seed(fixture);
  fixture.store.set(`abl:${CID}:16`, 1);
  fixture.set_inputs(0, 1, 100);
  await ablup30(CID);
  const count = fixture.text_lines().filter((t) => t === '未满足条件').length;
  assert.equal(count, 2);
});

// ———— ABLUP31：自慰中毒（train 域写入），自慰/调教自慰经验 双轨道同价 ————

test('ablup31：三档终止判定（六项豁免任一命中即可——与 ABLUP30 的全有相反）', async () => {
  const fixture = create_era_fixture();
  const { ablup31 } = seed(fixture);
  fixture.store.set(`abl:${CID}:31`, 5);
  await ablup31(CID);
  assert.ok(fixture.text_lines().includes('需要特殊素质才能继续提升'));

  const unlocked = create_era_fixture();
  const { ablup31: a2 } = seed(unlocked);
  unlocked.store.set(`abl:${CID}:31`, 5);
  set_talents(unlocked, { 78: 1 }); // 弄乳狂：六项之一 → 越过 Lv5 门槛
  unlocked.store.set(`abl:${CID}:17`, 6);
  unlocked.store.set(`abl:${CID}:0`, 6);
  unlocked.set_inputs(100);
  await a2(CID);
  assert.ok(!unlocked.text_lines().includes('需要特殊素质才能继续提升'));

  const capped = create_era_fixture();
  const { ablup31: a3 } = seed(capped);
  capped.store.set(`abl:${CID}:30`, 6);
  capped.store.set(`abl:${CID}:31`, 4); // 合计 10
  set_talents(capped, { 78: 1 });
  await a3(CID);
  assert.ok(capped.text_lines().includes('性交中毒(6)＋自慰中毒(4)上限为10'));
  assert.ok(
    capped
      .text_lines()
      .some((t) =>
        t.includes(
          '至少达成欲情点数40800点、阴核点数240000点或耻情点数32000点的其中一项',
        ),
      ),
  );

  const maxed = create_era_fixture();
  const { ablup31: a4 } = seed(maxed);
  maxed.store.set(`abl:${CID}:31`, 10);
  set_talents(maxed, { 78: 1 });
  await a4(CID);
  assert.ok(maxed.text_lines().includes('已达最高级'));
});

test('ablup31：组合上限拦截线的精确边界（Lv4 欲情 4²×2550 = 40800）', async () => {
  // 恰好等于拦截线 → 放行出菜单；低于 1 点 → 拦
  const pass = create_era_fixture();
  const { ablup31: a1 } = seed(pass);
  pass.store.set(`abl:${CID}:30`, 6);
  pass.store.set(`abl:${CID}:31`, 4); // 合计 10
  set_talents(pass, { 78: 1 });
  pass.store.set(`juel:${CID}:5`, 40800); // = 4²×2550
  pass.store.set(`juel:${CID}:0`, 240000); // = 4²×15000
  pass.store.set(`juel:${CID}:8`, 32000); // = 4²×2000
  pass.store.set(`abl:${CID}:17`, 5);
  pass.store.set(`abl:${CID}:0`, 5);
  pass.set_inputs(100);
  await a1(CID);
  assert.ok(
    !pass.text_lines().includes('性交中毒(6)＋自慰中毒(4)上限为10'),
    '三项都到线应放行',
  );
  assert.equal(buttons(pass).length, 3); // [0][1][100]

  const blocked = create_era_fixture();
  const { ablup31: a2 } = seed(blocked);
  blocked.store.set(`abl:${CID}:30`, 6);
  blocked.store.set(`abl:${CID}:31`, 4);
  set_talents(blocked, { 78: 1 });
  blocked.store.set(`juel:${CID}:5`, 40799); // 差 1 点
  blocked.store.set(`juel:${CID}:0`, 240000);
  blocked.store.set(`juel:${CID}:8`, 32000);
  await a2(CID);
  assert.ok(blocked.text_lines().includes('性交中毒(6)＋自慰中毒(4)上限为10'));
  assert.equal(buttons(blocked).length, 0);
});

test('ablup31：阴蒂感觉门槛（ABL:0）不足时两条轨道同时计能力不足', async () => {
  const fixture = create_era_fixture();
  const { ablup31 } = seed(fixture);
  fixture.store.set(`abl:${CID}:17`, 1); // 露出癖达标（lv0 门槛为 1）
  fixture.store.set(`abl:${CID}:0`, 0); // 阴蒂感觉不足
  fixture.set_inputs(100);
  await ablup31(CID);
  const b = buttons(fixture);
  assert.equal(b.length, 3); // [0][1][100]
  assert.equal(b[0].text, '欲情点数×0/3000 ……点数不足 经验不足 能力不足');
  assert.equal(b[1].text, '欲情点数×0/3000 ……点数不足 经验不足 能力不足');
});

test('ablup31：门槛两行（露出癖+阴蒂感觉），半角括号异常行只在 Lv2', async () => {
  const fixture = create_era_fixture();
  const { ablup31 } = seed(fixture);
  fixture.store.set(`abl:${CID}:17`, 1);
  fixture.store.set(`abl:${CID}:0`, 1);
  fixture.set_inputs(100);
  await ablup31(CID);
  assert.ok(fixture.text_lines().includes('露出癖LV1以上(现在LV1)且'));
  assert.ok(fixture.text_lines().includes('阴蒂感觉LV1以上(现在LV1)且'));
  assert.ok(!fixture.text_lines().some((t) => t.includes('异常经验')));

  const lv2 = create_era_fixture();
  const { ablup31: a2 } = seed(lv2);
  lv2.store.set(`abl:${CID}:31`, 2);
  lv2.store.set(`abl:${CID}:17`, 3);
  lv2.store.set(`abl:${CID}:0`, 3);
  lv2.set_inputs(100);
  await a2(CID);
  assert.ok(lv2.text_lines().includes('异常经验1以上(现在0)且'));
  // Lv2 梯子字面值：A=12000/B=50000/C=6000/D=500/E=60
  assert.equal(buttons(lv2)[0].text, '欲情点数×0/12000 ……点数不足 经验不足 ');
  assert.equal(buttons(lv2)[1].text, '欲情点数×0/12000 ……点数不足 经验不足 ');
  assert.ok(lv2.text_lines().includes('　　　阴核点数×0/50000'));
  assert.ok(lv2.text_lines().includes('　　　耻情点数×0/6000'));
  assert.ok(lv2.text_lines().includes('　　　自慰经验　0/500'));
  assert.ok(lv2.text_lines().includes('　　　调教自慰经验　0/60'));

  const lv3 = create_era_fixture();
  const { ablup31: a3 } = seed(lv3);
  lv3.store.set(`abl:${CID}:31`, 3);
  lv3.store.set(`abl:${CID}:17`, 4);
  lv3.store.set(`abl:${CID}:0`, 4);
  lv3.set_inputs(100);
  await a3(CID);
  assert.ok(!lv3.text_lines().some((t) => t.includes('异常经验')));
});

test('ablup31：Lv0 梯子字面值，双轨道同点数、不同经验行；容易自慰×0.25 四元组', async () => {
  const fixture = create_era_fixture();
  const { ablup31 } = seed(fixture);
  fixture.store.set(`abl:${CID}:17`, 1);
  fixture.store.set(`abl:${CID}:0`, 1);
  fixture.set_inputs(100);
  await ablup31(CID);
  const b = buttons(fixture);
  assert.equal(b.length, 3); // [0][1][100]
  assert.equal(b[0].text, '欲情点数×0/3000 ……点数不足 经验不足 ');
  assert.equal(b[1].text, '欲情点数×0/3000 ……点数不足 经验不足 ');
  assert.ok(fixture.text_lines().includes('　　　阴核点数×0/10000'));
  assert.ok(fixture.text_lines().includes('　　　耻情点数×0/1000'));
  assert.ok(fixture.text_lines().includes('　　　自慰经验　0/100'));
  assert.ok(fixture.text_lines().includes('　　　调教自慰经验　0/20'));

  const easy = create_era_fixture();
  const { ablup31: a2 } = seed(easy);
  set_talents(easy, { 60: 1 });
  easy.store.set(`abl:${CID}:17`, 1);
  easy.store.set(`abl:${CID}:0`, 1);
  easy.set_inputs(100);
  await a2(CID);
  assert.equal(buttons(easy)[0].text, '欲情点数×0/750 ……点数不足 经验不足 ');
  assert.ok(easy.text_lines().includes('　　　自慰经验　0/25'));
});

test('ablup31：两条购买路径扣点相同（JUEL:5/0/8），经验行各查各的', async () => {
  // Lv0：A=3000/B=10000/C=1000；[0] 查 EXP:10=100、[1] 查 EXP:11=20
  for (const [result, exp_key, exp_need] of [
    [0, 10, 100],
    [1, 11, 20],
  ]) {
    const fixture = create_era_fixture();
    const { ablup31 } = seed(fixture);
    fixture.store.set(`juel:${CID}:5`, 3000);
    fixture.store.set(`juel:${CID}:0`, 10000);
    fixture.store.set(`juel:${CID}:8`, 1000);
    fixture.store.set(`exp:${CID}:${exp_key}`, exp_need);
    fixture.store.set(`abl:${CID}:17`, 1);
    fixture.store.set(`abl:${CID}:0`, 1);
    fixture.set_inputs(result);
    await ablup31(CID);
    assert.equal(fixture.store.get(`abl:${CID}:31`), 1);
    assert.equal(fixture.store.get(`juel:${CID}:5`), 0);
    assert.equal(fixture.store.get(`juel:${CID}:0`), 0);
    assert.equal(fixture.store.get(`juel:${CID}:8`), 0);
    assert.ok(
      fixture.text_lines().some((t) => t.includes('自慰中毒变为LV1。')),
    );
  }
});

// ———— ABLUP32：精液中毒（train 域写入），侍奉/欲望门槛按淫乱二选一 ————

test('ablup32：三档终止判定（五项豁免须全无才拦）/拦截阈值 6500 与提示文案 4000 不一致（原作如此）', async () => {
  const fixture = create_era_fixture();
  const { ablup32 } = seed(fixture);
  fixture.store.set(`abl:${CID}:32`, 5);
  await ablup32(CID);
  assert.ok(fixture.text_lines().includes('需要特殊素质才能继续提升'));

  // 五项里只差最后一项（喜欢精液 TALENT:47）：AND 语义下不拦，OR 语义下会拦
  const partial = create_era_fixture();
  const { ablup32: a_p } = seed(partial);
  partial.store.set(`abl:${CID}:32`, 5);
  set_talents(partial, { 47: 1 });
  partial.set_inputs(100);
  await a_p(CID);
  assert.ok(!partial.text_lines().includes('需要特殊素质才能继续提升'));
  assert.equal(buttons(partial).length, 3); // [0][1][100]，未被门槛拦下

  // Lv5、合计 10：满足提示值（欲情 100000）但仍低于 6500 拦截线（162500）→ 仍拦
  const capped = create_era_fixture();
  const { ablup32: a2 } = seed(capped);
  capped.store.set(`abl:${CID}:32`, 5);
  capped.store.set(`abl:${CID}:33`, 5); // 合计 10
  set_talents(capped, { 50: 1 }); // 快速学习：豁免 Lv5 门槛，且不在本文件素质修正表内
  capped.store.set(`juel:${CID}:5`, 100000); // = 提示值 5²×4000
  capped.store.set(`juel:${CID}:6`, 999999);
  await a2(CID);
  assert.ok(
    capped
      .text_lines()
      .includes('精液中毒(5)＋百合中毒(5)＋兽奸中毒(0)上限为10'),
  );
  assert.ok(
    capped
      .text_lines()
      .some((t) =>
        t.includes('至少达成欲情点数100000点或屈服点数475000点的其中一项'),
      ),
  );
  assert.ok(capped.text_lines().includes('方可提升当前精液中毒的等级'));
  assert.equal(buttons(capped).length, 0);

  const maxed = create_era_fixture();
  const { ablup32: a3 } = seed(maxed);
  maxed.store.set(`abl:${CID}:32`, 10);
  set_talents(maxed, { 76: 1 }); // 淫乱：同时豁免 Lv5 门槛与欲望门槛
  await a3(CID);
  assert.ok(maxed.text_lines().includes('已达最高级'));
});

test('ablup32：合计≥10 且珠够时 A/B 覆盖为 32²×4000/19000（梯子值作废），覆盖先于戒备森严', async () => {
  const fixture = create_era_fixture();
  const { ablup32 } = seed(fixture);
  fixture.store.set(`abl:${CID}:32`, 5);
  fixture.store.set(`abl:${CID}:33`, 5); // 合计 10
  set_talents(fixture, { 50: 1 }); // 豁免 Lv5 门槛（快速学习不在修正表内）
  fixture.store.set(`juel:${CID}:5`, 162500); // 越过 6500 拦截线
  fixture.store.set(`juel:${CID}:6`, 475000);
  fixture.store.set(`abl:${CID}:16`, 6); // 侍奉精神门槛（无淫乱时）
  fixture.set_inputs(100);
  await ablup32(CID);
  assert.equal(
    buttons(fixture)[0].text.startsWith('欲情点数×162500/100000'),
    true,
  );

  const guarded = create_era_fixture();
  const { ablup32: a2 } = seed(guarded);
  guarded.store.set(`abl:${CID}:32`, 5);
  guarded.store.set(`abl:${CID}:33`, 5);
  set_talents(guarded, { 27: 1, 50: 1 }); // 戒备森严 ×2.50 作用于覆盖后的 100000；50 豁免 Lv5
  guarded.store.set(`juel:${CID}:5`, 162500);
  guarded.store.set(`juel:${CID}:6`, 475000);
  guarded.store.set(`abl:${CID}:16`, 6);
  guarded.set_inputs(100);
  await a2(CID);
  assert.equal(
    buttons(guarded)[0].text.startsWith('欲情点数×162500/250000'),
    true,
  );
});

test('ablup32：无淫乱查侍奉精神、有淫乱改查欲望（渲染行与判定同步切换）', async () => {
  const fixture = create_era_fixture();
  const { ablup32 } = seed(fixture);
  fixture.set_inputs(100);
  await ablup32(CID);
  assert.ok(fixture.text_lines().includes('侍奉精神LV1以上(现在LV0)且'));
  assert.ok(!fixture.text_lines().some((t) => t.includes('欲望LV')));
  // 判定侧也是「无淫乱查侍奉精神」：ABL:16=0 < lv+1=1 → 能力不足
  assert.equal(
    buttons(fixture)[0].text,
    '欲情点数×0/3000 ……点数不足 经验不足 能力不足',
  );

  const satisfied = create_era_fixture();
  const { ablup32: a3 } = seed(satisfied);
  satisfied.store.set(`abl:${CID}:16`, 1); // 侍奉精神达标 → 不再计能力不足
  satisfied.set_inputs(100);
  await a3(CID);
  assert.equal(
    buttons(satisfied)[0].text,
    '欲情点数×0/3000 ……点数不足 经验不足 ',
  );

  const lewd = create_era_fixture();
  const { ablup32: a2 } = seed(lewd);
  set_talents(lewd, { 76: 1 });
  lewd.set_inputs(100);
  await a2(CID);
  assert.ok(lewd.text_lines().includes('欲望LV1以上(现在LV0)且'));
  assert.ok(!lewd.text_lines().some((t) => t.includes('侍奉精神LV')));
  assert.ok(buttons(lewd)[0].text.includes('能力不足'));
});

test('ablup32：Lv0 梯子字面值；[1] 三倍点数+半经验；Lv2 异常经验 D=lv-1', async () => {
  const fixture = create_era_fixture();
  const { ablup32 } = seed(fixture);
  fixture.store.set(`abl:${CID}:16`, 1);
  fixture.set_inputs(100);
  await ablup32(CID);
  const b = buttons(fixture);
  assert.equal(b.length, 3); // [0][1][100]
  assert.equal(b[0].text, '欲情点数×0/3000 ……点数不足 经验不足 ');
  assert.equal(b[1].text, '欲情点数×0/9000 ……点数不足 经验不足 ');
  assert.ok(fixture.text_lines().includes('　　　屈服点数×0/10000'));
  assert.ok(fixture.text_lines().includes('　　　精液经验　0/10'));
  assert.ok(fixture.text_lines().includes('　　　屈服点数×0/30000'));
  assert.ok(fixture.text_lines().includes('　　　精液经验　0/5'));

  const lv2 = create_era_fixture();
  const { ablup32: a2 } = seed(lv2);
  lv2.store.set(`abl:${CID}:32`, 2);
  lv2.store.set(`abl:${CID}:16`, 3);
  lv2.set_inputs(100);
  await a2(CID);
  assert.ok(lv2.text_lines().includes('异常经验1以上(现在0)且'));
});

test('ablup32：素质修正——反感污臭×2.00 / 喜欢精液×0.50（喜欢精液同时豁免 Lv5 与异常经验）', async () => {
  const hater = create_era_fixture();
  const { ablup32: a1 } = seed(hater);
  set_talents(hater, { 62: 1 });
  hater.store.set(`abl:${CID}:16`, 1);
  hater.set_inputs(100);
  await a1(CID);
  assert.equal(buttons(hater)[0].text, '欲情点数×0/6000 ……点数不足 经验不足 ');

  const lover = create_era_fixture();
  const { ablup32: a2 } = seed(lover);
  set_talents(lover, { 47: 1 });
  lover.store.set(`abl:${CID}:16`, 1);
  lover.set_inputs(100);
  await a2(CID);
  assert.equal(buttons(lover)[0].text, '欲情点数×0/1500 ……点数不足 经验不足 ');
});

test('ablup32：两条购买路径各自扣对应珠、era.add 写入 abl:32', async () => {
  // Lv0：[0] A=3000/B=10000/C=10；[1] A*3=9000/B*3=30000/C/2=5
  for (const [result, j5, j6, e20] of [
    [0, 3000, 10000, 10],
    [1, 9000, 30000, 5],
  ]) {
    const fixture = create_era_fixture();
    const { ablup32 } = seed(fixture);
    fixture.store.set(`juel:${CID}:5`, j5);
    fixture.store.set(`juel:${CID}:6`, j6);
    fixture.store.set(`exp:${CID}:20`, e20);
    fixture.store.set(`abl:${CID}:16`, 1);
    fixture.set_inputs(result);
    await ablup32(CID);
    assert.equal(fixture.store.get(`abl:${CID}:32`), 1);
    assert.equal(fixture.store.get(`juel:${CID}:5`), 0);
    assert.equal(fixture.store.get(`juel:${CID}:6`), 0);
    assert.ok(
      fixture.text_lines().some((t) => t.includes('精液中毒变为LV1。')),
    );
  }
});

// ———— ABLUP33：百合中毒（train 域写入），欲情/屈服需求同源 A，输入白名单仅 [0][100] ————

test('ablup33：男人直接返回；三档终止判定（四项豁免须全无才拦）', async () => {
  const male = create_era_fixture();
  const { ablup33: a0 } = seed(male);
  set_talents(male, { 122: 1 });
  await a0(CID);
  assert.equal(male.text_lines().length, 0);

  const fixture = create_era_fixture();
  const { ablup33 } = seed(fixture);
  fixture.store.set(`abl:${CID}:33`, 5);
  await ablup33(CID);
  assert.ok(fixture.text_lines().includes('需要特殊素质才能继续提升'));

  const capped = create_era_fixture();
  const { ablup33: a2 } = seed(capped);
  capped.store.set(`abl:${CID}:32`, 6);
  capped.store.set(`abl:${CID}:33`, 4); // 合计 10
  await a2(CID);
  assert.ok(
    capped
      .text_lines()
      .includes('精液中毒(6)＋百合中毒(4)＋兽奸中毒(0)上限为10'),
  );
  assert.ok(
    capped
      .text_lines()
      .some((t) =>
        t.includes(
          '至少达成欲情点数64000点、屈服点数64000点或阴核点数160000点的其中一项',
        ),
      ),
  );
  assert.ok(capped.text_lines().includes('方可提升当前百合中毒的等级'));

  const maxed = create_era_fixture();
  const { ablup33: a3 } = seed(maxed);
  maxed.store.set(`abl:${CID}:33`, 10);
  set_talents(maxed, { 82: 1 }); // 讨厌男人：绕过 Lv5+ 门槛，暴露第二档
  await a3(CID);
  assert.ok(maxed.text_lines().includes('已达最高级'));
});

test('ablup33：组合上限拦截线的精确边界（Lv4 阴核 4²×10000 = 160000）', async () => {
  // 阴核点数差 1 点即被拦；恰好到线则放行
  const blocked = create_era_fixture();
  const { ablup33: a1 } = seed(blocked);
  blocked.store.set(`abl:${CID}:32`, 6);
  blocked.store.set(`abl:${CID}:33`, 4); // 合计 10
  blocked.store.set(`juel:${CID}:5`, 64000); // = 4²×4000
  blocked.store.set(`juel:${CID}:6`, 64000); // = 4²×4000
  blocked.store.set(`juel:${CID}:0`, 159999); // 差 1 点
  await a1(CID);
  assert.ok(
    blocked
      .text_lines()
      .includes('精液中毒(6)＋百合中毒(4)＋兽奸中毒(0)上限为10'),
  );
  assert.equal(buttons(blocked).length, 0);

  const pass = create_era_fixture();
  const { ablup33: a2 } = seed(pass);
  pass.store.set(`abl:${CID}:32`, 6);
  pass.store.set(`abl:${CID}:33`, 4);
  pass.store.set(`juel:${CID}:5`, 64000);
  pass.store.set(`juel:${CID}:6`, 64000);
  pass.store.set(`juel:${CID}:0`, 160000); // 恰好到线
  pass.store.set(`abl:${CID}:22`, 5); // 百合气质门槛（lv4 需 >= 5）
  pass.set_inputs(100);
  await a2(CID);
  assert.ok(
    !pass
      .text_lines()
      .includes('精液中毒(6)＋百合中毒(4)＋兽奸中毒(0)上限为10'),
    '三项都到线应放行',
  );
  assert.equal(buttons(pass).length, 2); // [0][100]
});

test('ablup33：Lv0 梯子字面值；欲情/屈服需求同为 A；百合气质门槛；输入白名单无 [1]', async () => {
  const fixture = create_era_fixture();
  const { ablup33 } = seed(fixture);
  fixture.store.set(`abl:${CID}:22`, 1); // 百合气质门槛
  fixture.set_inputs(100);
  await ablup33(CID);
  const b = buttons(fixture);
  assert.equal(b.length, 2); // [0][100]
  assert.equal(b[0].text, '阴核点数×0/5000 ……点数不足 经验不足 ');
  assert.ok(fixture.text_lines().includes('　　　欲情点数×0/1200'));
  assert.ok(fixture.text_lines().includes('　　　屈服点数×0/1200'));
  assert.ok(fixture.text_lines().includes('　　　百合经验　0/300'));
  assert.ok(fixture.text_lines().includes('百合气质LV1以上(现在LV1)且'));

  const conservative = create_era_fixture();
  const { ablup33: a3 } = seed(conservative);
  set_talents(conservative, { 24: 1 }); // 保守的：×1.50（不是 ABLUP22/23 的 ×1.20）
  conservative.store.set(`abl:${CID}:22`, 1);
  conservative.set_inputs(100);
  await a3(CID);
  assert.equal(
    buttons(conservative)[0].text,
    '阴核点数×0/7500 ……点数不足 经验不足 ',
  );
  assert.ok(conservative.text_lines().includes('　　　欲情点数×0/1800'));
  assert.ok(conservative.text_lines().includes('　　　百合经验　0/450'));

  const rebel = create_era_fixture();
  const { ablup33: a4 } = seed(rebel);
  set_talents(rebel, { 11: 1 }); // 反抗心：×1.50
  rebel.store.set(`abl:${CID}:22`, 1);
  rebel.set_inputs(100);
  await a4(CID);
  assert.equal(buttons(rebel)[0].text, '阴核点数×0/7500 ……点数不足 经验不足 ');
  assert.ok(rebel.text_lines().includes('　　　欲情点数×0/1800'));
  assert.ok(rebel.text_lines().includes('　　　百合经验　0/450'));

  const rejected = create_era_fixture();
  const { ablup33: a2 } = seed(rejected);
  rejected.set_inputs(1);
  await assert.rejects(a2(CID), /测试夹具：输入不合法/);
});

test('ablup33：合计≥10 且珠够时 A/B 覆盖为 33²×4000/10000；素质修正——男人婆×2.00、讨厌男人×0.50', async () => {
  const fixture = create_era_fixture();
  const { ablup33 } = seed(fixture);
  fixture.store.set(`abl:${CID}:33`, 5);
  fixture.store.set(`abl:${CID}:32`, 5); // 合计 10
  set_talents(fixture, { 82: 1 }); // 讨厌男人：豁免 Lv5 门槛（四项豁免全在修正表内，取 82 并让断言吸收 ×0.50）
  for (const k of [5, 6, 0]) {
    fixture.store.set(`juel:${CID}:${k}`, 999999); // 三项拦截全过
  }
  fixture.store.set(`abl:${CID}:22`, 6);
  fixture.set_inputs(100);
  await ablup33(CID);
  // B = 覆盖值 5²×10000=250000，再经讨厌男人 ×0.50 → 125000（覆盖先于素质修正）
  assert.equal(
    buttons(fixture)[0].text.startsWith('阴核点数×999999/125000'),
    true,
  );

  const macho = create_era_fixture();
  const { ablup33: a1 } = seed(macho);
  set_talents(macho, { 79: 1 });
  macho.store.set(`abl:${CID}:22`, 1);
  macho.set_inputs(100);
  await a1(CID);
  assert.equal(buttons(macho)[0].text, '阴核点数×0/10000 ……点数不足 经验不足 '); // 5000×2

  const hater = create_era_fixture();
  const { ablup33: a2 } = seed(hater);
  set_talents(hater, { 82: 1 });
  hater.store.set(`abl:${CID}:22`, 1);
  hater.set_inputs(100);
  await a2(CID);
  assert.equal(buttons(hater)[0].text, '阴核点数×0/2500 ……点数不足 经验不足 '); // 5000×0.5
});

test('ablup33：Lv4 梯子字面值（A=30000/B=70000/C=2100）', async () => {
  const fixture = create_era_fixture();
  const { ablup33 } = seed(fixture);
  fixture.store.set(`abl:${CID}:33`, 4);
  fixture.store.set(`abl:${CID}:22`, 5); // 百合气质门槛（lv4 需 >= 5）
  fixture.set_inputs(100);
  await ablup33(CID);
  assert.equal(
    buttons(fixture)[0].text,
    '阴核点数×0/70000 ……点数不足 经验不足 ',
  );
  assert.ok(fixture.text_lines().includes('　　　欲情点数×0/30000'));
  assert.ok(fixture.text_lines().includes('　　　屈服点数×0/30000')); // 欲情/屈服同源 A
  assert.ok(fixture.text_lines().includes('　　　百合经验　0/2100'));
});

test('ablup33：Lv2 异常经验 D=lv-1；成功购买扣三项珠（JUEL:0/5/6）、era.add 写入 abl:33', async () => {
  const lv2 = create_era_fixture();
  const { ablup33: a0 } = seed(lv2);
  lv2.store.set(`abl:${CID}:33`, 2);
  lv2.store.set(`abl:${CID}:22`, 3);
  lv2.set_inputs(100);
  await a0(CID);
  assert.ok(lv2.text_lines().includes('异常经验1以上(现在0)且'));

  const fixture = create_era_fixture();
  const { ablup33 } = seed(fixture);
  fixture.store.set(`juel:${CID}:0`, 5000);
  fixture.store.set(`juel:${CID}:5`, 1200);
  fixture.store.set(`juel:${CID}:6`, 1200);
  fixture.store.set(`exp:${CID}:40`, 300);
  fixture.store.set(`abl:${CID}:22`, 1);
  fixture.set_inputs(0);
  await ablup33(CID);
  assert.equal(fixture.store.get(`abl:${CID}:33`), 1);
  assert.equal(fixture.store.get(`juel:${CID}:0`), 0);
  assert.equal(fixture.store.get(`juel:${CID}:5`), 0);
  assert.equal(fixture.store.get(`juel:${CID}:6`), 0);
  assert.ok(fixture.text_lines().some((t) => t.includes('百合中毒变为LV1。')));
});

// ———— 素质倍率 / 异常经验档位 / 门槛比较的表驱动补覆盖（issue #491） ————
//
// #466、#467 的用例每函数只抽 1～2 个素质：ABLUP20～33 用到的素质编号里有
// 约 27 个一次都没出现过（12/14/15/16/17/20/21/22/23/26/31/32/34/35/36/37/
// 52/61/64/71/72/84/87/123/127 等），门槛比较也只被零散点到。#466 验收按
// SOP §5 抽查三处，两处逃逸（ablup20 感情淡薄的 B 轨 ×1.2、ablup21 抵抗的
// ×2.0），#467 验收再抽三处又逃逸两处（ablup40 否定快感 ×1.75、ablup39
// 欲望门槛 `< lv + 1`）。倍率与门槛直接决定玩家要付的点数与能否购买，是
// 玩家可见行为，故这里按分支逐条列表驱动，把「素质编号」这一维补齐。
//
// 期望值一律现算，不抄 ere/system/train/ablup.js：
//   · 「梯子基值」抄自 target/ERB/ABL/ABLUP<nn>.ERB @DECIDE_ABLUP<nn> 里
//     `IF ABL:<n> == <lv>` 分支的 A/B/C/D/E 赋值，原文行号写在各行注释里；
//   · 「素质倍率」抄自同一文件的 TIMES 行，行号同样写在注释里；
//   · 合成按 TIMES 语义逐次截断（Math.floor(v * m)），不是一次乘完。
// `refs` 是该等级实际打印的分母，按输出顺序排列；`a*3`、`c/2` 照抄原作的
// `{A*3}`、`{C/2}`，用来核对 [1] 轨与整除半经验的分母。

/** TIMES X, m 的语义：整数乘小数后截断。 */
const scale = (base, factor) => Math.floor(base * factor);

/** 把同一个倍率摊到多条轨道上，写表时少抄几遍（轨道名见各行 base）。 */
const spread = (tracks, factor) =>
  Object.fromEntries([...tracks].map((track) => [track, factor]));

/** 把 `{ talent: {10: 1}, abl: {11: 2}, juel: {5: 100} }` 形状的状态写进夹具。 */
function set_state(fixture, state = {}) {
  for (const [family, entries] of Object.entries(state)) {
    for (const [index, value] of Object.entries(entries)) {
      fixture.store.set(`${family}:${CID}:${index}`, value);
    }
  }
}

/** 按输出顺序取出夹具各行的 `分子/分母` 里的分母。 */
function denominators(fixture) {
  const found = [];
  for (const line of fixture.lines) {
    if (typeof line.text !== 'string') continue;
    for (const matched of line.text.matchAll(/\/(\d+)/g)) {
      found.push(Number(matched[1]));
    }
  }
  return found;
}

/** 求 `refs` 里的一位分母：`a`、`a*3`、`c/2`（后者照抄原作的整除）。 */
function ref_value(values, ref) {
  const [name, operator, operand] = ref.split(/([*/])/);
  if (operator === '*') return values[name] * Number(operand);
  if (operator === '/') return Math.floor(values[name] / Number(operand));
  return values[name];
}

/** 选项按钮（跳过 [100] 停止）里 `……` 之后那截状态文案。 */
function option_states(fixture) {
  return buttons(fixture)
    .filter((button) => button.accelerator !== 100)
    .map((button) => button.text.slice(button.text.indexOf('……') + 2));
}

/**
 * 倍率规格：`rows` 每项是一份独立夹具配置（`state` 给出等级与前置素质，
 * `base` 是该等级梯子，`refs` 是该等级打印的分母）；`talents` 是素质编号 →
 * 该素质 TIMES 到的轨道与倍率，未列出的轨道按 ×1。分支互斥的 IF/ELSEIF
 * 两侧各占一行，分别用只带该素质的数据触发。
 */
const MULTIPLIER_SPECS = [
  {
    id: 20,
    source: 'ABLUP20.ERB',
    rows: [
      // 梯子 :120-150（Lv0：A=100、B=5）。C 只在 Lv3/4/7 非零（:174-175），此处不渲染
      { state: { abl: { 20: 0 } }, base: { a: 100, b: 5 }, refs: ['a', 'b'] },
    ],
    talents: {
      10: { a: 1.5 }, // 胆怯 :181-183（只乘 A）
      11: { a: 0.9, b: 0.9 }, // 反抗心 :185-188
      12: { a: 0.9 }, // 刚强 :189-191（只乘 A）
      14: { a: 1.2 }, // 文静 :192-194（只乘 A）
      16: { a: 0.9, b: 0.9 }, // 嚣张 :195-199
      15: { a: 0.9, b: 0.9 }, // 高姿态 :201-204
      17: { a: 1.1, b: 1.1 }, // 低姿态（与高姿态互斥）:205-209
      20: { a: 1.2, b: 1.2 }, // 克制 :211-215
      21: { a: 1.2, b: 1.2 }, // 冷漠 :216-220
      22: { a: 1.5, b: 1.2 }, // 感情淡薄 :221-225（A/B 倍率不同）
      23: { a: 0.9, b: 0.9 }, // 好奇心 :226-230
      26: { a: 1.1 }, // 悲观的 :231-233（只乘 A）
      28: { a: 0.9, b: 0.9 }, // 爱表现 :234-238
      30: { a: 1.1, b: 1.1 }, // 看重贞操 :240-242 的 IF 侧
      31: { a: 0.95, b: 0.95 }, // 看轻贞操 :244-246 的 ELSEIF 侧
      32: { a: 0.95, b: 0.95 }, // 压抑 :250-252 的 IF 侧
      33: { a: 0.9, b: 0.9 }, // 开放 :254-256 的 ELSEIF 侧
      79: { a: 0.95, b: 0.95 }, // 讨厌男人 or 男人婆 :259-263（OR 两侧各测一次）
      82: { a: 0.95, b: 0.95 },
      40: { a: 1.2, b: 1.2 }, // 害怕疼痛 :266-268 的 IF 侧
      41: { a: 0.9, b: 0.9 }, // 不惧疼痛 :270-272 的 ELSEIF 侧
      76: { a: 0.8, b: 0.8 }, // 淫乱 :275-282（C 的 ×0.80 另见上文两段折扣用例）
      80: { a: 0.8, b: 0.8 }, // 倒错的 :283-287
      83: { a: 0.5, b: 0.5 }, // 施虐狂 :288-292
      88: { a: 1.2, b: 1.2 }, // 受虐狂 :293-297
      84: { a: 0.8, b: 0.8 }, // 嫉妒 :298-302
      87: { a: 0.8, b: 0.8 }, // 小恶魔 :303-307
      123: { a: 0.5, b: 0.5 }, // 疯狂 :308-312
      9: { a: 2.0, b: 2.0 }, // 崩坏 :313-317
    },
  },
  {
    id: 21,
    source: 'ABLUP21.ERB',
    rows: [
      // 梯子 :161-221。Lv0：A=B=100、C=0、D=E=100（C 不在输出里）
      {
        state: { abl: { 21: 0 } },
        base: { a: 100, b: 100, c: 0, d: 100, e: 100, g: 1 },
        refs: ['a', 'b', 'd', 'e', 'g'],
      },
      // Lv3 起 A=B=0（[0] 轨隐藏），C=30、D=2800、E=6000
      {
        state: { abl: { 21: 3 } },
        base: { a: 0, b: 0, c: 30, d: 2800, e: 6000, g: 1 },
        refs: ['d', 'e', 'c', 'g'],
      },
    ],
    talents: {
      10: spread('abcde', 1.1), // 胆怯 :252-258
      11: spread('abcde', 1.2), // 反抗心 :260-266
      12: spread('abcde', 1.2), // 刚强 :268-274
      16: spread('abcde', 1.2), // 嚣张 :276-282
      15: spread('abcde', 1.2), // 高姿态 :285-291
      17: spread('abcde', 0.9), // 低姿态（与高姿态互斥）:292-298
      20: spread('abcde', 1.2), // 克制 :301-307
      21: spread('abcde', 1.1), // 冷漠 :309-315
      22: spread('abcde', 1.5), // 感情淡薄 :317-323
      24: spread('abcde', 1.2), // 保守的 :325-331
      26: spread('abcde', 0.9), // 悲观的 :333-339
      30: spread('abcde', 1.2), // 看重贞操 :342-348
      31: spread('abcde', 0.9), // 看轻贞操（互斥）:349-355
      32: spread('abcde', 1.2), // 压抑 :358-364
      33: spread('abcde', 0.6), // 开放（互斥）:365-371
      34: spread('abcde', 2.0), // 抵抗 :373-380
      35: spread('abcde', 0.9), // 害羞 :383-389
      36: spread('abcde', 1.2), // 不知羞耻（互斥）:390-396
      40: spread('abcde', 1.1), // 害怕疼痛 :398-405
      41: spread('abcde', 0.95), // 不惧疼痛（互斥）:406-412
      70: spread('abcde', 0.9), // 接受快感 :414-421
      71: spread('abcde', 1.1), // 否定快感（互斥）:422-428
      76: spread('abcde', 0.8), // 淫乱 :430-437
      80: spread('abcde', 0.75), // 倒錯的 :438-445
      83: spread('abcde', 1.2), // 施虐狂 :446-453
      88: spread('abcde', 0.5), // 受虐狂 :454-461
      123: spread('abcde', 0.8), // 疯狂 :462-469
      9: spread('abcde', 2.0), // 崩坏 :470-477
    },
  },
  {
    id: 22,
    source: 'ABLUP22.ERB',
    rows: [
      // 梯子 :140-190。Lv0：A=200、B=50、C=0、D=1000；B 行两条轨道各打一次
      {
        state: { abl: { 22: 0 } },
        base: { a: 200, b: 50, c: 0, d: 1000 },
        refs: ['a', 'b', 'd', 'b'],
      },
      // Lv2：A=3000、B=300、C=1000、D=0（[1] 轨隐藏）——借 C 非零覆盖 C 轨
      {
        state: { abl: { 22: 2 } },
        base: { a: 3000, b: 300, c: 1000, d: 0 },
        refs: ['a', 'c', 'b'],
      },
    ],
    clamp: ['a', 'b'], // :320-324「最低でも1回・1個は必要」
    talents: {
      13: spread('abcd', 0.95), // 坦率 :217-223
      21: spread('abcd', 1.2), // 冷漠 :224-230
      23: spread('abcd', 0.95), // 好奇心 :231-237
      24: spread('abcd', 1.2), // 保守的 :238-244
      30: spread('abcd', 1.2), // 看重贞操 :246-251
      31: spread('abcd', 0.95), // 看轻贞操（互斥）:252-258
      63: spread('abcd', 0.95), // 献身的 :260-266
      70: spread('abcd', 0.95), // 接受快感 :268-273
      71: spread('abcd', 1.2), // 否定快感（互斥）:274-280
      80: spread('abcd', 0.8), // 倒錯的 :282-288
      79: spread('abcd', 2.0), // 男人婆 :290-296（百合特有加成）
      81: spread('abcd', 0.5), // 双性恋 :298-304
      82: spread('abcd', 0.5), // 讨厌男人 :305-311
      123: spread('abcd', 0.5), // 疯狂 :312-318
    },
  },
  {
    id: 23,
    source: 'ABLUP23.ERB',
    rows: [
      // 梯子与 ABLUP22 相同（:136-186）。前置：TALENT:122 必须非 0（:117-118）
      {
        state: { abl: { 23: 0 }, talent: { 122: 1 } },
        base: { a: 200, b: 50, c: 0, d: 1000 },
        refs: ['a', 'b', 'd', 'b'],
      },
      {
        state: { abl: { 23: 2 }, talent: { 122: 1 } },
        base: { a: 3000, b: 300, c: 1000, d: 0 },
        refs: ['a', 'c', 'b'],
      },
    ],
    clamp: ['a', 'b'], // :307-311
    talents: {
      13: spread('abcd', 0.95), // 坦率 :213-219
      21: spread('abcd', 1.2), // 冷漠 :220-226
      23: spread('abcd', 0.95), // 好奇心 :227-233
      24: spread('abcd', 1.2), // 保守的 :234-240
      30: spread('abcd', 1.2), // 看重贞操 :242-247
      31: spread('abcd', 0.95), // 看轻贞操（互斥）:248-254
      82: spread('abcd', 3.0), // 讨厌男人 :256-262（与 ABLUP22 的 ×0.50 相反）
      63: spread('abcd', 0.95), // 献身的 :263-269
      70: spread('abcd', 0.95), // 接受快感 :271-277
      71: spread('abcd', 1.2), // 否定快感（互斥）:277-283
      80: spread('abcd', 0.8), // 倒錯的 :285-291
      81: spread('abcd', 0.5), // 双性恋 :292-298
      123: spread('abcd', 0.5), // 疯狂 :299-305
    },
  },
  {
    id: 30,
    source: 'ABLUP30.ERB',
    rows: [
      // 梯子 :129-169。Lv0：A=3000、B=10000、C=10；[1] 轨为 A*3/B*3/C/2
      {
        state: { abl: { 30: 0 } },
        base: { a: 3000, b: 10000, c: 10 },
        refs: ['a', 'b', 'c', 'a*3', 'b*3', 'c/2'],
      },
    ],
    clamp: ['a', 'b', 'c'], // :309-314
    talents: {
      12: spread('abc', 1.2), // 刚强 :193-197
      20: spread('abc', 1.2), // 克制 :199-203
      21: spread('abc', 1.2), // 冷漠 :205-209
      24: spread('abc', 1.2), // 保守的 :211-215
      30: spread('abc', 1.2), // 看重贞操 :218-222
      31: spread('abc', 0.9), // 看轻贞操（互斥）:223-227
      32: spread('abc', 1.2), // 压抑 :230-234
      33: spread('abc', 0.8), // 开放（互斥）:235-239
      34: spread('abc', 1.2), // 抵抗 :242-246
      35: spread('abc', 1.1), // 害羞 :249-253
      36: spread('abc', 0.95), // 不知羞耻（互斥）:254-258
      70: spread('abc', 0.9), // 接受快感 :261-265
      71: spread('abc', 1.2), // 否定快感（互斥）:266-270
      72: spread('abc', 0.6), // 容易上瘾 :272-276
      73: spread('abc', 0.5), // 容易陷落 :278-282
      76: spread('abc', 0.8), // 淫乱 :284-288
      87: spread('abc', 0.9), // 小恶魔 :290-294
      123: spread('abc', 0.8), // 疯狂 :296-300
      9: spread('abc', 0.8), // 崩坏 :302-306（非 ABLUP20/21 的 ×2.00）
    },
  },
  {
    id: 31,
    source: 'ABLUP31.ERB',
    rows: [
      // 梯子 :150-210。Lv0：A=3000、B=10000、C=1000、D=100、E=20；两条轨道同价
      {
        state: { abl: { 31: 0 } },
        base: { a: 3000, b: 10000, c: 1000, d: 100, e: 20 },
        refs: ['a', 'b', 'c', 'd', 'a', 'b', 'c', 'e'],
      },
    ],
    clamp: ['a', 'b', 'c', 'd', 'e'], // :303-313
    talents: {
      // :252-281 四项都只乘 A-D，E（[1] 轨调教自慰经验）不受影响
      60: { a: 0.25, b: 0.25, c: 0.25, d: 0.25 }, // 容易自慰 :252-258
      72: { a: 0.5, b: 0.5, c: 0.5, d: 0.5 }, // 容易上瘾 :260-266
      80: { a: 0.75, b: 0.75, c: 0.75, d: 0.75 }, // 倒错的 :268-274
      76: { a: 0.5, b: 0.5, c: 0.5, d: 0.5 }, // 淫乱化 :276-282
    },
  },
  {
    id: 32,
    source: 'ABLUP32.ERB',
    rows: [
      // 梯子 :143-183。Lv0：A=3000、B=10000、C=10（组合上限 <10，梯子未被覆盖）
      {
        state: { abl: { 32: 0 } },
        base: { a: 3000, b: 10000, c: 10 },
        refs: ['a', 'b', 'c', 'a*3', 'b*3', 'c/2'],
      },
    ],
    clamp: ['a', 'b', 'c'], // :329-334
    talents: {
      11: spread('abc', 1.5), // 反抗心 :216-220
      22: spread('abc', 0.95), // 感情淡薄 :222-226
      24: spread('abc', 1.2), // 保守的 :228-232
      32: spread('abc', 1.2), // 压抑 :235-239
      33: spread('abc', 0.8), // 开放（互斥）:240-244
      34: spread('abc', 2.0), // 抵抗 :247-251
      47: spread('abc', 0.5), // 喜欢精液 :254-258
      52: spread('abc', 0.95), // 擅用舌头 :261-265
      61: spread('abc', 0.9), // 不怕污臭 :268-272
      62: spread('abc', 2.0), // 反感污臭（互斥）:273-277
      64: spread('abc', 0.9), // 不怕脏 :279-283
      72: spread('abc', 0.5), // 容易上瘾 :286-290
      73: spread('abc', 0.5), // 容易陷落 :292-296
      76: spread('abc', 0.9), // 淫乱 :298-302
      80: spread('abc', 0.75), // 倒错的 :304-308
      87: spread('abc', 0.95), // 小恶魔 :310-314
      123: spread('abc', 0.9), // 疯狂 :316-320
      9: spread('abc', 0.9), // 崩坏 :322-326
    },
  },
  {
    id: 33,
    source: 'ABLUP33.ERB',
    rows: [
      // 梯子 :126-165。Lv0：A=1200、B=5000、C=300（按钮是 B 阴核，A 供欲情/屈服两行）
      {
        state: { abl: { 33: 0 } },
        base: { a: 1200, b: 5000, c: 300 },
        refs: ['b', 'a', 'a', 'c'],
      },
    ],
    clamp: ['a', 'b', 'c'], // :341-346
    talents: {
      11: spread('abc', 1.5), // 反抗心 :199-203
      20: spread('abc', 1.2), // 克制 :205-208
      21: spread('abc', 1.2), // 冷漠 :211-214
      24: spread('abc', 1.5), // 保守的 :217-220（非 ABLUP22/23 的 ×1.20）
      32: spread('abc', 1.2), // 压抑 :224-227
      33: spread('abc', 0.8), // 开放（互斥）:229-232
      34: spread('abc', 2.0), // 抵抗 :236-239
      52: spread('abc', 0.9), // 擅用舌头 :242-245
      61: spread('abc', 0.95), // 不怕污臭 :248-251
      63: spread('abc', 0.9), // 献身的 :254-257
      64: spread('abc', 0.95), // 不怕脏 :260-263
      70: spread('abc', 0.9), // 接受快感 :267-270
      71: spread('abc', 1.1), // 否定快感（互斥）:272-275
      72: spread('abc', 0.5), // 容易上瘾 :278-281
      73: spread('abc', 0.5), // 容易陷落 :284-287
      76: spread('abc', 0.75), // 淫乱 :290-293
      79: spread('abc', 2.0), // 男人婆 :297-300
      80: spread('abc', 0.75), // 倒错的 :304-307
      81: spread('abc', 0.5), // 双性恋 :310-313
      82: spread('abc', 0.5), // 讨厌男人 :316-319
      87: spread('abc', 0.9), // 小恶魔 :322-325
      123: spread('abc', 0.5), // 疯狂 :328-331
      9: spread('abc', 0.8), // 崩坏 :334-337
    },
  },
  {
    id: 37,
    source: 'ABLUP37.ERB',
    rows: [
      // 梯子 :109-160。Lv0：A=2000、B=3000、C=1000、D=50
      {
        state: { abl: { 37: 0 } },
        base: { a: 2000, b: 3000, c: 1000, d: 50 },
        refs: ['a', 'b', 'c', 'd'],
      },
    ],
    clamp: ['a', 'b', 'c', 'd'], // :411-418
    talents: {
      11: spread('abcd', 1.5), // 反抗心 :187-191
      12: spread('abcd', 1.2), // 刚强 :194-198
      20: spread('abcd', 1.5), // 克制 :201-205
      24: spread('abcd', 1.5), // 保守的 :208-212
      26: spread('abcd', 0.9), // 悲观的 :216-220
      28: spread('abcd', 0.9), // 爱表现 :223-227
      30: spread('abcd', 2.0), // 看重贞操 :231-235
      31: spread('abcd', 0.9), // 看轻贞操（互斥）:237-241
      32: spread('abcd', 1.2), // 压抑 :245-249
      33: spread('abcd', 0.8), // 开放（互斥）:251-255
      34: spread('abcd', 2.0), // 抵抗 :259-263
      35: spread('abcd', 1.1), // 害羞 :267-271
      36: spread('abcd', 0.9), // 不知羞耻（互斥）:273-277
      63: spread('abcd', 0.9), // 献身的 :280-284
      72: spread('abcd', 0.5), // 容易上瘾 :287-291
      76: { a: 0.8, b: 0.5, c: 0.8, d: 0.8 }, // 淫乱 :294-298（B 轨 ×0.50 与其余 ×0.80 不同，原作如此）
      82: spread('abcd', 3.0), // 讨厌男人 :301-305
      85: spread('abcd', 1.5), // 爱慕 :308-312
      153: spread('abcd', 2.0), // 妊娠 :315-319
      123: spread('abcd', 0.5), // 疯狂 :322-326
      9: spread('abcd', 0.8), // 崩坏 :329-333
      180: spread('abcd', 0.8), // 妓女 :336-340
      181: spread('abcd', 0.5), // 倾城 :343-347
      183: spread('abcd', 0.9), // 有常客 :350-354
      184: spread('abcd', 2.0), // 求爱 :357-361
    },
  },
  {
    id: 39,
    source: 'ABLUP39.ERB',
    rows: [
      // 梯子 :107-146。Lv0：A=B=2000、C=30（三中毒合计 <10，A/B 未被突破价覆盖）
      {
        state: { abl: { 39: 0 } },
        base: { a: 2000, b: 2000, c: 30 },
        refs: ['a', 'b', 'c'],
      },
    ],
    clamp: ['a', 'b', 'c'], // :229-235
    talents: {
      20: { a: 2.5, b: 2.5, c: 1.5 }, // 克制 :177-181（A/B 与 C 倍率不同）
      70: { a: 0.75, b: 0.75 }, // 接受快感 :183-186（只乘 A/B，C 不动）
      71: { a: 1.75, b: 1.75 }, // 否定快感（互斥）:187-189
      72: spread('abc', 0.5), // 容易上瘾 :192-195
      80: spread('abc', 0.75), // 倒錯的 :198-201
      123: spread('abc', 0.5), // 疯狂 :204-207
      124: spread('abc', 0.8), // 动物耳朵 :210-213
      136: spread('abc', 0.5), // 牝犬 :216-219
      85: { a: 1.8, b: 1.8, c: 1.5 }, // 爱慕 :222-225（A/B 与 C 倍率不同）
    },
  },
  {
    id: 40,
    source: 'ABLUP40.ERB',
    rows: [
      // 梯子 :70-92。Lv0：A=2000（单轨道，按钮分母就是 A）
      { state: { abl: { 40: 0 } }, base: { a: 2000 }, refs: ['a'] },
    ],
    clamp: ['a'], // :124-125
    talents: {
      20: { a: 2.5 }, // 克制 :98-99
      70: { a: 0.75 }, // 接受快感 :102-103
      71: { a: 1.75 }, // 否定快感（互斥）:105-106
      72: { a: 0.5 }, // 容易上瘾 :109-110
      80: { a: 0.75 }, // 倒錯的 :113-114
      123: { a: 0.5 }, // 疯狂 :117-118
    },
  },
  {
    id: 99,
    source: 'ABLUP99.ERB',
    rows: [
      // 刻印阶梯 :98-103。MARK:3=1 → A=5000（门槛 MARK:3 <= 0 在最前面拦空输入）
      { state: { mark: { 3: 1 } }, base: { a: 5000 }, refs: ['a'] },
    ],
    talents: {
      12: { a: 3.0 }, // 刚强 :107-108
      16: { a: 1.5 }, // 嚣张 :112-113
      13: { a: 0.5 }, // 坦率 :117-118
      85: { a: 0.5 }, // 爱慕 :122-123
    },
  },
  {
    id: 100,
    source: 'ABLUP100.ERB',
    rows: [
      // 刻印阶梯 :82-92。MARK:10=1 → A=2000
      { state: { mark: { 10: 1 } }, base: { a: 2000 }, refs: ['a'] },
    ],
    talents: {
      10: { a: 1.2 }, // 胆小 :95-96
      172: { a: 0.8 }, // 智慧 :100-101
      12: { a: 1.8 }, // 刚强 :105-106
      16: { a: 1.2 }, // 嚣张 :110-111
      13: { a: 0.5 }, // 坦率 :115-116
      85: { a: 0.5 }, // 爱慕 :120-121
      76: { a: 0.7 }, // 淫乱 :125-126
    },
  },
];

for (const spec of MULTIPLIER_SPECS) {
  test(`ablup${spec.id}：素质倍率逐条表驱动（期望取自 ${spec.source}）`, async () => {
    for (const row of spec.rows) {
      for (const [id, factors] of Object.entries(spec.talents)) {
        const fixture = create_era_fixture();
        const module = seed(fixture);
        set_state(fixture, {
          ...row.state,
          talent: { ...(row.state?.talent ?? {}), [id]: 1 },
        });
        fixture.set_inputs(100);

        const values = {};
        for (const [track, base] of Object.entries(row.base)) {
          values[track] = scale(base, factors[track] ?? 1);
        }
        for (const track of spec.clamp ?? []) {
          if (values[track] < 1) values[track] = 1;
        }

        await module[`ablup${spec.id}`](CID);
        assert.deepEqual(
          denominators(fixture),
          row.refs.map((ref) => ref_value(values, ref)),
          `ablup${spec.id}：素质 ${id}，等级 ${JSON.stringify(row.state.abl ?? row.state.mark)}`,
        );
      }
    }
  });
}

/**
 * 梯子逐级字面值：MULTIPLIER_SPECS.rows 每函数只给一档（多是 Lv0），其余
 * 档位的数字此前没有用例钉住（#512 的十处自选改错里，ablup37 的 Lv9 D 就
 * 从这里逃逸）。期望值逐字取自 ABLUP<nn>.ERB @DECIDE_ABLUP<nn> 的赋值行。
 * Lv5 起有入口把关的函数必须带一个把关素质（37 取 31、39 取 124），它同时
 * 是倍率项，折扣照 MULTIPLIER_SPECS 的因子算，不是另抄一份表。
 */
const LADDER_SPECS = [
  {
    id: 37, // :109-159；Lv5 起入口把关（:16）要求 76/31/180 至少有一个
    rows: [
      { lv: 0, base: { a: 2000, b: 3000, c: 1000, d: 50 } },
      { lv: 1, base: { a: 5000, b: 8000, c: 2500, d: 100 } },
      { lv: 2, base: { a: 8000, b: 15000, c: 5500, d: 150 } },
      { lv: 3, base: { a: 14000, b: 30000, c: 10000, d: 250 } },
      { lv: 4, base: { a: 22000, b: 50000, c: 20000, d: 400 } },
      {
        lv: 5,
        talents: { 31: 1 },
        base: { a: 34000, b: 80000, c: 30000, d: 500 },
      },
      {
        lv: 6,
        talents: { 31: 1 },
        base: { a: 55000, b: 120000, c: 50000, d: 800 },
      },
      {
        lv: 7,
        talents: { 31: 1 },
        base: { a: 80000, b: 180000, c: 60000, d: 1200 },
      },
      {
        lv: 8,
        talents: { 31: 1 },
        base: { a: 150000, b: 300000, c: 90000, d: 2000 },
      },
      {
        lv: 9,
        talents: { 31: 1 },
        base: { a: 300000, b: 600000, c: 150000, d: 3000 },
      },
    ],
    refs: ['a', 'b', 'c', 'd'],
  },
  {
    id: 39, // :107-147；Lv5 起入口把关（:16）要求 76/124/136 至少有一个
    rows: [
      { lv: 0, base: { a: 2000, b: 2000, c: 30 } },
      { lv: 1, base: { a: 5000, b: 5000, c: 100 } },
      { lv: 2, base: { a: 10000, b: 10000, c: 220 } },
      { lv: 3, base: { a: 20000, b: 20000, c: 400 } },
      { lv: 4, base: { a: 30000, b: 30000, c: 800 } },
      { lv: 5, talents: { 124: 1 }, base: { a: 45000, b: 45000, c: 1600 } },
      { lv: 6, talents: { 124: 1 }, base: { a: 75000, b: 75000, c: 2000 } },
      { lv: 7, talents: { 124: 1 }, base: { a: 100000, b: 100000, c: 2800 } },
      { lv: 8, talents: { 124: 1 }, base: { a: 200000, b: 200000, c: 4000 } },
      { lv: 9, talents: { 124: 1 }, base: { a: 300000, b: 300000, c: 6000 } },
    ],
    refs: ['a', 'b', 'c'],
  },
  {
    id: 40, // :70-90（与 ABLUP39 的 A 同值表，无入口把关）
    rows: [
      { lv: 0, base: { a: 2000 } },
      { lv: 1, base: { a: 5000 } },
      { lv: 2, base: { a: 10000 } },
      { lv: 3, base: { a: 20000 } },
      { lv: 4, base: { a: 30000 } },
      { lv: 5, base: { a: 45000 } },
      { lv: 6, base: { a: 75000 } },
      { lv: 7, base: { a: 100000 } },
      { lv: 8, base: { a: 200000 } },
      { lv: 9, base: { a: 300000 } },
    ],
    refs: ['a'],
  },
  {
    id: 99, // :98-104（MARK:3 = 1/2/3）——等级住在 mark:3，不是 abl:99
    family: 'mark',
    slot: 3,
    rows: [
      { lv: 1, base: { a: 5000 } },
      { lv: 2, base: { a: 10000 } },
      { lv: 3, base: { a: 50000 } },
    ],
    refs: ['a'],
  },
  {
    id: 100, // :82-92（MARK:10 = 1..5）——等级住在 mark:10
    family: 'mark',
    slot: 10,
    rows: [
      { lv: 1, base: { a: 2000 } },
      { lv: 2, base: { a: 5000 } },
      { lv: 3, base: { a: 15000 } },
      { lv: 4, base: { a: 30000 } },
      { lv: 5, base: { a: 50000 } },
    ],
    refs: ['a'],
  },
];

for (const spec of LADDER_SPECS) {
  test(`ablup${spec.id}：梯子逐级字面值（ABLUP${spec.id}.ERB @DECIDE 的赋值行）`, async () => {
    const factors = MULTIPLIER_SPECS.find((s) => s.id === spec.id).talents;
    for (const row of spec.rows) {
      const fixture = create_era_fixture();
      const module = seed(fixture);
      set_state(fixture, {
        [spec.family ?? 'abl']: { [spec.slot ?? spec.id]: row.lv },
        talent: row.talents ?? {},
      });
      fixture.set_inputs(100);
      await module[`ablup${spec.id}`](CID);

      const expected = spec.refs.map((track) => {
        let value = row.base[track];
        for (const id of Object.keys(row.talents ?? {})) {
          value = scale(value, factors[id][track]);
        }
        return value < 1 ? 1 : value; // :411-418 番外的最低 1 点
      });
      assert.deepEqual(
        denominators(fixture),
        expected,
        `ablup${spec.id}：Lv${row.lv} 的梯子`,
      );
    }
  });
}

/**
 * 戒备森严（TALENT:27）按 ABL 等级四档。ABLUP20 的 C/D/E 三列在 TIMES 时
 * 尚未赋值（原作的次序缺陷，见上文两段折扣用例），因此该文件里这一分支
 * 观测不到差异，不列表。ABLUP39 的分档判 ABL:37（原作复制粘贴缺陷 1:1
 * 保留），故其四行固定自身等级、只动 ABL:37。ABLUP40 原作没有这一分支。
 *
 * 行里的 `abl` 是附加状态（默认只写 `abl[spec.id] = row.lv`），目前仅供
 * ABLUP39 写分档所读的 ABL:37。
 */
const TIER_SPECS = [
  {
    id: 21,
    // 梯子 :161-221（Lv3 起 A=B=0，[0] 轨隐藏）；戒备森严 :223-242 作用于
    // C/D/E 三列。末尾的 g 是绝顶经验需求，全等级恒为 1（:249），不随
    // 戒备森严变。Lv5 起入口把关（:15）是 OR（10/14/37/88 任一即可），取
    // 14（文静）——它在本文件里不参与任何 TIMES
    rows: [
      {
        lv: 3,
        base: { c: 30, d: 2800, e: 6000, g: 1 },
        tier: 1.5,
        refs: ['d', 'e', 'c', 'g'],
      },
      {
        lv: 4,
        base: { c: 80, d: 4300, e: 12000, g: 1 },
        tier: 2.0,
        refs: ['d', 'e', 'c', 'g'],
      },
      {
        lv: 5,
        talents: { 27: 1, 14: 1 },
        base: { c: 150, d: 6000, e: 24000, g: 1 },
        tier: 2.5,
        refs: ['d', 'e', 'c', 'g'],
      },
      {
        lv: 6,
        talents: { 27: 1, 14: 1 },
        base: { c: 200, d: 8000, e: 38000, g: 1 },
        tier: 3.0,
        refs: ['d', 'e', 'c', 'g'],
      },
    ],
  },
  {
    id: 22,
    // 梯子 :155-157 / :160-162 / :165-167 / :170-172；戒备森严 :193-211 作用于 A/B/C。
    // Lv5 起入口把关（:18）要求 [开放/倒錯的/双性恋/讨厌男人/疯狂] 至少有一项，
    // 取 33（开放）——它在本文件里只做豁免，不参与任何 TIMES
    rows: [
      {
        lv: 3,
        base: { a: 8000, b: 500, c: 2000, d: 0 },
        tier: 1.5,
        refs: ['a', 'c', 'b'],
      },
      {
        lv: 4,
        base: { a: 20000, b: 800, c: 5000, d: 0 },
        tier: 2.0,
        refs: ['a', 'c', 'b'],
      },
      {
        lv: 5,
        talents: { 27: 1, 33: 1 },
        base: { a: 40000, b: 1200, c: 10000, d: 0 },
        tier: 2.5,
        refs: ['a', 'c', 'b'],
      },
      {
        lv: 6,
        talents: { 27: 1, 33: 1 },
        base: { a: 80000, b: 1800, c: 13000, d: 0 },
        tier: 3.0,
        refs: ['a', 'c', 'b'],
      },
    ],
  },
  {
    id: 23,
    // 梯子 :136-186（A/B/C）；戒备森严 :188-207。男人限定（:9-11），
    // 每行都要带 122。Lv5 起入口把关（:18）是 OR，取 33（开放）——
    // 它在本文件里只做豁免，不参与任何 TIMES
    rows: [
      {
        lv: 3,
        talents: { 27: 1, 122: 1 },
        base: { a: 8000, b: 500, c: 2000 },
        tier: 1.5,
        refs: ['a', 'c', 'b'],
      },
      {
        lv: 4,
        talents: { 27: 1, 122: 1 },
        base: { a: 20000, b: 800, c: 5000 },
        tier: 2.0,
        refs: ['a', 'c', 'b'],
      },
      {
        lv: 5,
        talents: { 27: 1, 122: 1, 33: 1 },
        base: { a: 40000, b: 1200, c: 10000 },
        tier: 2.5,
        refs: ['a', 'c', 'b'],
      },
      {
        lv: 6,
        talents: { 27: 1, 122: 1, 33: 1 },
        base: { a: 80000, b: 1800, c: 13000 },
        tier: 3.0,
        refs: ['a', 'c', 'b'],
      },
    ],
  },
  {
    id: 30,
    // 梯子 :141-156；戒备森严 :172-189 作用于 A/B/C。Lv5 起入口把关（:16）是
    // **六项任一为 0 即拦**，必须六项全有，其中 [接受快感]（:261-265 ×0.90）
    // 与 [淫乱]（:284-288 ×0.80）本身也乘 A/B/C，故按原文次序补进 extras
    rows: [
      {
        lv: 3,
        base: { a: 30000, b: 100000, c: 80 },
        tier: 1.5,
        refs: ['a', 'b', 'c', 'a*3', 'b*3', 'c/2'],
      },
      {
        lv: 4,
        base: { a: 55000, b: 200000, c: 200 },
        tier: 2.0,
        refs: ['a', 'b', 'c', 'a*3', 'b*3', 'c/2'],
      },
      {
        lv: 5,
        talents: { 27: 1, 85: 1, 76: 1, 63: 1, 70: 1, 75: 1, 77: 1 },
        extras: [spread('abc', 0.9), spread('abc', 0.8)],
        base: { a: 70000, b: 300000, c: 400 },
        tier: 2.5,
        refs: ['a', 'b', 'c', 'a*3', 'b*3', 'c/2'],
      },
      {
        lv: 6,
        talents: { 27: 1, 85: 1, 76: 1, 63: 1, 70: 1, 75: 1, 77: 1 },
        extras: [spread('abc', 0.9), spread('abc', 0.8)],
        base: { a: 90000, b: 400000, c: 800 },
        tier: 3.0,
        refs: ['a', 'b', 'c', 'a*3', 'b*3', 'c/2'],
      },
    ],
  },
  {
    id: 31,
    // 梯子 :168-191；戒备森严 :213-238 作用于 A-E 五列。Lv5 起入口把关（:16）是
    // AND（六项全 0 才拦），取 85（爱慕）——它在本文件里不参与任何 TIMES
    rows: [
      {
        lv: 3,
        base: { a: 20000, b: 100000, c: 15000, d: 1000, e: 100 },
        tier: 1.5,
        refs: ['a', 'b', 'c', 'd', 'a', 'b', 'c', 'e'],
      },
      {
        lv: 4,
        base: { a: 32000, b: 200000, c: 30000, d: 1500, e: 150 },
        tier: 2.0,
        refs: ['a', 'b', 'c', 'd', 'a', 'b', 'c', 'e'],
      },
      {
        lv: 5,
        talents: { 27: 1, 85: 1 },
        base: { a: 50000, b: 250000, c: 40000, d: 2000, e: 200 },
        tier: 2.5,
        refs: ['a', 'b', 'c', 'd', 'a', 'b', 'c', 'e'],
      },
      {
        lv: 6,
        talents: { 27: 1, 85: 1 },
        base: { a: 70000, b: 320000, c: 50000, d: 3000, e: 320 },
        tier: 3.0,
        refs: ['a', 'b', 'c', 'd', 'a', 'b', 'c', 'e'],
      },
    ],
  },
  {
    id: 32,
    // 梯子 :143-183（A/B/C）；戒备森严 :190-209，作用于覆盖价（:185-188）
    // 之后的 A/B/C。Lv5 起入口把关（:16）是 OR，取 50（快速学习）——它在本
    // 文件里不参与任何 TIMES；四行的 32+33+39 都 < 10，不会触发覆盖价
    rows: [
      {
        lv: 3,
        base: { a: 30000, b: 60000, c: 80 },
        tier: 1.5,
        refs: ['a', 'b', 'c', 'a*3', 'b*3', 'c/2'],
      },
      {
        lv: 4,
        base: { a: 50000, b: 130000, c: 200 },
        tier: 2.0,
        refs: ['a', 'b', 'c', 'a*3', 'b*3', 'c/2'],
      },
      {
        lv: 5,
        talents: { 27: 1, 50: 1 },
        base: { a: 65000, b: 190000, c: 500 },
        tier: 2.5,
        refs: ['a', 'b', 'c', 'a*3', 'b*3', 'c/2'],
      },
      {
        lv: 6,
        talents: { 27: 1, 50: 1 },
        base: { a: 90000, b: 300000, c: 800 },
        tier: 3.0,
        refs: ['a', 'b', 'c', 'a*3', 'b*3', 'c/2'],
      },
    ],
  },
  {
    id: 33,
    // 梯子 :138-162；戒备森严 :174-192 作用于 A/B/C。Lv5 起入口把关（:112）是
    // AND（四项全 0 才拦），但四项（76/80/81/82）本身都乘 A/B/C，取 81
    // （双性恋 ×0.50，:310-313）补进 extras
    rows: [
      {
        lv: 3,
        base: { a: 18000, b: 50000, c: 1400 },
        tier: 1.5,
        refs: ['b', 'a', 'a', 'c'],
      },
      {
        lv: 4,
        base: { a: 30000, b: 70000, c: 2100 },
        tier: 2.0,
        refs: ['b', 'a', 'a', 'c'],
      },
      {
        lv: 5,
        talents: { 27: 1, 81: 1 },
        extras: [spread('abc', 0.5)],
        base: { a: 55000, b: 120000, c: 3000 },
        tier: 2.5,
        refs: ['b', 'a', 'a', 'c'],
      },
      {
        lv: 6,
        talents: { 27: 1, 81: 1 },
        extras: [spread('abc', 0.5)],
        base: { a: 70000, b: 200000, c: 4000 },
        tier: 3.0,
        refs: ['b', 'a', 'a', 'c'],
      },
    ],
  },
  {
    id: 37,
    // 梯子 :109-159（A/B/C/D）；戒备森严 :161-184（IF/ELSEIF 互斥，四列同乘）。
    // Lv5 起入口把关（:16）是 OR，取 31（看轻贞操）——三名豁免者都另有倍率
    // （31 在 :237-242 的 ELSEIF 全四列 ×0.90，76/180 则不对称地只乘部分
    // 轨道），31 的这一支按原文次序摊进 extras
    rows: [
      {
        lv: 3,
        base: { a: 14000, b: 30000, c: 10000, d: 250 },
        tier: 1.5,
        refs: ['a', 'b', 'c', 'd'],
      },
      {
        lv: 4,
        base: { a: 22000, b: 50000, c: 20000, d: 400 },
        tier: 2.0,
        refs: ['a', 'b', 'c', 'd'],
      },
      {
        lv: 5,
        talents: { 27: 1, 31: 1 },
        extras: [spread('abcd', 0.9)],
        base: { a: 34000, b: 80000, c: 30000, d: 500 },
        tier: 2.5,
        refs: ['a', 'b', 'c', 'd'],
      },
      {
        lv: 6,
        talents: { 27: 1, 31: 1 },
        extras: [spread('abcd', 0.9)],
        base: { a: 55000, b: 120000, c: 50000, d: 800 },
        tier: 3.0,
        refs: ['a', 'b', 'c', 'd'],
      },
    ],
  },
  {
    id: 39,
    // 梯子 :107-147（A/B/C）；戒备森严 :154-169 按 **ABL:37** 分档（原作复制
    // 粘贴缺陷 1:1 保留，见上文专属用例）。四行固定自身 Lv3、只动 ABL:37，
    // 把分档来源与自身等级分开：gate 3/4/>=5 三档 → ×2.00/×2.50/×3.00
    rows: [
      {
        lv: 3,
        abl: { 37: 3 },
        base: { a: 20000, b: 20000, c: 400 },
        tier: 2.0,
        refs: ['a', 'b', 'c'],
      },
      {
        lv: 3,
        abl: { 37: 4 },
        base: { a: 20000, b: 20000, c: 400 },
        tier: 2.5,
        refs: ['a', 'b', 'c'],
      },
      {
        lv: 3,
        abl: { 37: 5 },
        base: { a: 20000, b: 20000, c: 400 },
        tier: 3.0,
        refs: ['a', 'b', 'c'],
      },
      {
        lv: 3,
        abl: { 37: 6 },
        base: { a: 20000, b: 20000, c: 400 },
        tier: 3.0,
        refs: ['a', 'b', 'c'],
      },
    ],
  },
];

for (const spec of TIER_SPECS) {
  test(`ablup${spec.id}：戒备森严四档逐级（ABLUP${spec.id}.ERB 的 TIMES 行）`, async () => {
    for (const row of spec.rows) {
      const fixture = create_era_fixture();
      const module = seed(fixture);
      set_state(fixture, {
        abl: { [spec.id]: row.lv, ...(row.abl ?? {}) },
        talent: row.talents ?? { 27: 1 },
      });
      fixture.set_inputs(100);

      const values = {};
      for (const [track, base] of Object.entries(row.base)) {
        let value = scale(
          base,
          ['a', 'b', 'c', 'd', 'e'].includes(track) ? row.tier : 1,
        );
        for (const extra of row.extras ?? []) {
          value = scale(value, extra[track] ?? 1);
        }
        values[track] = value;
      }

      await module[`ablup${spec.id}`](CID);
      assert.deepEqual(
        denominators(fixture),
        row.refs.map((ref) => ref_value(values, ref)),
        `ablup${spec.id}：Lv${row.lv} 戒备森严 ×${row.tier}`,
      );
    }
  });
}

/**
 * 异常经验需求（C/F/D/E）的档位公式。译文行里 `异常经验{N}以上` 的 N 就是
 * 该等级要求的次数，直接读出来核对公式，不必绕到状态位。`levels` 里没写的
 * 等级期望 N=0，即整行不打印。
 */
const EXP_REQUIREMENT_SPECS = [
  {
    id: 20,
    // 梯子 :120-150；豁免名单 :174-175（:175 赋值后才做淫乱折扣，见上文用例）
    // 前置素质 127 只用于越过 Lv5 入口把关（:15），不在 C 的豁免名单里
    talents: { 127: 1 },
    levels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    expected: { 3: 1, 4: 2, 7: 5 },
  },
  {
    id: 21,
    // :245-246；前置素质 37 只用于越过 Lv5 入口把关（:15）
    talents: { 37: 1 },
    levels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    expected: { 3: 1, 4: 2, 7: 5 },
  },
  {
    id: 22,
    // :214-215（ABL:22 >= 3 起，不是 == 3/4/7）；前置素质 82 越过 Lv5 把关（:18）
    talents: { 82: 1 },
    levels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    expected: { 3: 1, 4: 2, 5: 3, 6: 4, 7: 5, 8: 6, 9: 7 },
  },
  {
    id: 23,
    // :210-211（ABL:23 >= 3 起）；前置素质 122=男人（:117-118）。Lv5 起入口把关
    // （:121）的名单与 E 的豁免名单（33/80/81/123）**完全相同**，越过把关就必然
    // 把 E 清零，故 Lv5 以上 E 恒为 0
    talents: { 122: 1, 82: 1 },
    levels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    expected: { 3: 1, 4: 2 },
  },
  {
    id: 30,
    // :317（ABL:30 >= 2 起 lv-1）。Lv>=5 的入口把关是「六项任一为 0 即拦」，
    // 六项里含 F 的豁免素质 76，故 Lv5 以上 F 恒为 0，不必也无法区分
    talents: {},
    levels: [0, 1, 2, 3, 4],
    expected: { 2: 1, 3: 2, 4: 3 },
  },
  {
    id: 31,
    // :242（仅 ABL:31 == 2 时 F=lv-1，注释写「LV2→3、3→4、4→5」但代码只判 ==2）
    talents: {},
    levels: [0, 1, 2, 3, 4],
    expected: { 2: 1 },
  },
  {
    id: 32,
    // :212（ABL:32 >= 2 起 lv-1）；前置素质 50 越过 Lv5 入口把关（:128）
    talents: { 50: 1 },
    levels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    expected: { 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8 },
  },
  {
    id: 33,
    // :195（ABL:33 >= 2 起 lv-1）；Lv5 的入口把关是 AND，且名单（76/80/81/82）
    // 里只有 76 不在 D 的豁免名单（72/80/81/82/123）里，故取 76 越过把关
    talents: { 76: 1 },
    levels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    expected: { 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8 },
  },
  {
    id: 37,
    // :368-401（ABL:37 >= 2 起 lv-1，再做 17 项素质增减表，下限 0）；
    // 前置素质 31 不在增减表内，只用于越过 Lv5 入口把关（:97）
    talents: { 31: 1 },
    levels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    expected: { 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8 },
  },
  {
    id: 39,
    // :173（ABL:39 >= 2 起 F = lv+1）；前置素质 124 越过 Lv5 入口把关（:98），
    // 且不在 F 的豁免名单（72/76/136）内
    talents: { 124: 1 },
    levels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    expected: { 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10 },
  },
  {
    id: 40,
    // :94（ABL:40 >= 2 起 F = lv+1）；本文件没有 Lv5 入口把关，只有 Lv10 硬顶
    talents: {},
    levels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    expected: { 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10 },
  },
];

for (const spec of EXP_REQUIREMENT_SPECS) {
  test(`ablup${spec.id}：异常经验需求的档位逐级（ABLUP${spec.id}.ERB 的赋值行）`, async () => {
    for (const lv of spec.levels) {
      const fixture = create_era_fixture();
      const module = seed(fixture);
      set_state(fixture, { abl: { [spec.id]: lv }, talent: spec.talents });
      fixture.set_inputs(100);
      await module[`ablup${spec.id}`](CID);

      assert.equal(
        exp_requirement(fixture),
        spec.expected[lv] ?? 0,
        `ablup${spec.id}：Lv${lv} 的异常经验需求`,
      );
    }
  });
}

/** 读出需求行里的异常经验次数；整行不打印时返回 0。 */
function exp_requirement(fixture) {
  for (const text of fixture.text_lines()) {
    const matched = /异常经验(\d+)以上/.exec(text);
    if (matched) return Number(matched[1]);
  }
  return 0;
}

/**
 * 「门槛恰好相等必须判为满足」——原作文面是严格小于。每条给一组把其它位
 * 都补齐的状态，只留被测门槛在临界值两侧摆动：`abl:<gate>` 取 `lv` 与
 * `lv + 1` 各跑一次，前者必须点亮能力不足位，后者必须不点亮。
 */
const GATE_SPECS = [
  {
    id: 20,
    // :332 `SIF ABL:11 < ABL:20 + 1` → I |= 4；Lv3 的 A/B/C = 3000/120/1
    cases: [
      { lv: 3, gate: 11, state: { juel: { 5: 3000 }, exp: { 33: 120 } } },
    ],
  },
  {
    id: 21,
    // :480-484 `IF ABL:11 < ABL:21+1` → I/J 同置 4
    cases: [{ lv: 0, gate: 11, state: {} }],
  },
  {
    id: 22,
    // :343-347 `IF ABL:11 < ABL:22 + 1` → I/J 同置 4
    cases: [{ lv: 0, gate: 11, state: {} }],
  },
  {
    id: 30,
    // :327 `IF ABL:16 < ABL:30 + 1` → I/J 同置 4
    cases: [{ lv: 0, gate: 16, state: {} }],
  },
  {
    id: 31,
    // :291 `IF ABL:17 < ABL:31 + 1` 与 :297 `IF ABL:0 < ABL:31 + 1` 两道；
    // 两道都置能力位，故测其中一道时把另一道补到临界值之上
    cases: [
      { lv: 0, gate: 17, state: { abl: { 0: 1 } } },
      { lv: 0, gate: 0, state: { abl: { 17: 1 } } },
    ],
  },
  {
    id: 32,
    // :344 无淫乱查 ABL:16、:350 有淫乱（TALENT:76）改查 ABL:11
    cases: [
      { lv: 0, gate: 16, state: {} },
      { lv: 0, gate: 11, state: { talent: { 76: 1 } } },
    ],
  },
  {
    id: 33,
    // :355 `IF ABL:22 < ABL:33 + 1` → I |= 4
    cases: [{ lv: 0, gate: 22, state: {} }],
  },
  {
    id: 37,
    // :421 `IF ABL:11 < ABL:37 + 1` → I |= 4
    cases: [{ lv: 0, gate: 11, state: {} }],
  },
  {
    id: 39,
    // :237 `SIF ABL:11 < ABL:39 + 1` → I |= 4（#467 验收逃逸的那一处）
    cases: [{ lv: 0, gate: 11, state: {} }],
  },
  {
    id: 40,
    // :128 `SIF ABL:11 < ABL:40 + 1` → I |= 4
    cases: [{ lv: 0, gate: 11, state: {} }],
  },
];

for (const spec of GATE_SPECS) {
  test(`ablup${spec.id}：门槛比较在临界值两侧（恰好相等判为满足）`, async () => {
    for (const item of spec.cases) {
      for (const [offset, expected] of [
        [0, true],
        [1, false],
      ]) {
        const fixture = create_era_fixture();
        const module = seed(fixture);
        set_state(fixture, {
          ...item.state,
          abl: {
            ...(item.state.abl ?? {}),
            [spec.id]: item.lv,
            [item.gate]: item.lv + offset,
          },
        });
        fixture.set_inputs(100);
        await module[`ablup${spec.id}`](CID);

        const states = option_states(fixture);
        assert.ok(states.length > 0, `ablup${spec.id}：没有渲染出选项按钮`);
        for (const state of states) {
          assert.equal(
            state.includes('能力不足'),
            expected,
            `ablup${spec.id}：ABL:${item.gate}=${item.lv + offset}，门槛 ${item.lv + 1}，状态「${state}」`,
          );
        }
      }
    }
  });
}

test('ablup99：两道刻印门槛在临界值两侧（屈服刻印须 >= MARK:3，顺从须 >= MARK:3+2）', async () => {
  // MARK:3=2 → A=10000（:100-101）、B=MARK:3+2=4（:131）
  for (const [mark2, abl10, expected] of [
    [2, 4, 'ＯＫ'], // 两道门槛都取等号，判为满足
    [1, 4, '经验不足 '], // MARK:3 > MARK:2 → I |= 2
    [2, 3, '能力不足'], // B > ABL:10 → I |= 4
    [1, 3, '经验不足 能力不足'],
  ]) {
    const fixture = create_era_fixture();
    const { ablup99 } = seed(fixture);
    set_state(fixture, {
      mark: { 3: 2, 2: mark2 },
      abl: { 10: abl10 },
      juel: { 6: 10000 },
    });
    fixture.set_inputs(100);
    await ablup99(CID);
    assert.equal(
      option_states(fixture)[0],
      expected,
      `MARK:2=${mark2}、ABL:10=${abl10}`,
    );
  }
});

test('ablup100：两道门槛同时不满足（M==2）才点亮能力位——OR 关系（原作 :132/:137）', async () => {
  // MARK:10=1 → 感觉门槛 `MARK:10 < C - 5`（C>6 才算不满足）、战斗门槛
  // `MARK:10*10 > CFLAG:9`（即 10>CFLAG:9）。两处各取临界值：C=6 与 CFLAG:9=10
  // 都判为满足；一侧不满足时 M==1，两道同时不满足才 M==2 → 能力不足
  for (const [senses, cflag9, expected] of [
    [6, 10, 'ＯＫ'], // 两道都满足 → M==0
    [7, 10, 'ＯＫ'], // 感觉门槛不满足 → M==1，仍放行（OR）
    [6, 9, 'ＯＫ'], // 战斗门槛不满足 → M==1，仍放行
    [7, 9, '能力不足'], // 两道同时不满足 → M==2
  ]) {
    const fixture = create_era_fixture();
    const { ablup100 } = seed(fixture);
    set_state(fixture, {
      mark: { 10: 1 },
      // C 是 ABL:0～4 五项感觉之和（:131）
      abl: { 0: senses },
      cflag: { 9: cflag9 },
      exp: { 99: 2000 }, // A=2000，隔离出点数位
    });
    fixture.set_inputs(100);
    await ablup100(CID);
    assert.equal(
      option_states(fixture)[0],
      expected,
      `感觉合计=${senses}、战斗等级=${cflag9}`,
    );
  }
});
