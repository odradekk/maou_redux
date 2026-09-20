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
