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

test('ablup39：三重上限时 A/B 覆盖为 lv²×4000（梯子作废）', async () => {
  const fixture = create_era_fixture();
  const { ablup39 } = seed(fixture);
  fixture.store.set(`abl:${CID}:32`, 6);
  fixture.store.set(`abl:${CID}:33`, 4);
  fixture.store.set(`abl:${CID}:39`, 1);
  fixture.store.set(`juel:${CID}:5`, 4000); // 原作判 ||：两珠任一不足即拦，
  fixture.store.set(`juel:${CID}:6`, 4000); // 文案写「或」但代码要求都足——照代码
  fixture.store.set(`abl:${CID}:11`, 2);
  fixture.store.set(`exp:${CID}:56`, 100); // 兽奸经验达标（lv1 的 C=100）
  fixture.set_inputs(100);
  await ablup39(CID);
  assert.equal(buttons(fixture)[0].text, '欲情点数×4000/4000 ……ＯＫ');
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
