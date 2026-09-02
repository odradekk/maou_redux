/**
 * ere/kojo/kojo-dungeon-ravish-man.js 的行为测试（issue #183，阶段 3 H14）。
 *
 * 缝 = test/helpers/era-fixture.js。世界底座：被凌辱者 = 角色 31（通用奴隶
 * 编号），由 join_slave_chara 预置并加入。覆盖：
 *   - 11 种怪物的凌辱事件（`*_ryou_man`）各自可调用、输出非空、返回 0；
 *   - 数值副作用（JUEL/EXP 的 era.add 累加）与畏怖阶段（CFLAG:131）分档；
 *   - 随机分支可控可重复（rand 定值序注入，RAND:n 按函数内出现序消费）；
 *   - %SAVESTR:ARG% 插值（arg_name ← callname:31:-1）与 {MON_NUM} 计算插值；
 *   - PRINTDATA 随机数组（pick 按 rand_n 取一条）；
 *   - 初吻对象推进（CFLAG:16 == -1 → 995，SIF 语义）；
 *   - 存根清单核对（GOBI_KOUJO 登记 docs/stub-registry.md）；
 *   - **同名函数断言**：本文件导出 `*_ryou_man`（带 man 后缀），与 H13
 *     （#182）的 `@*_RYOU`（无 man）区分——#12 的首个加载生效遮蔽不触发。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_chara_0, join_slave_chara } = require('./helpers/chara');

// 世界底座：被凌辱者 31 入列（无调教上下文——本文件不依赖 beginTrain）
async function setup_ravish(seed) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '冒险者');
  if (seed) {
    seed(fixture);
  }
  fixture.load_module('kojo/kojo-dungeon-ravish-man');
  return fixture;
}

// RAND:N 定值序：draws 依次被消费，越界取模
const seq_rand =
  (...draws) =>
  (n) => {
    const value = draws.shift() ?? 0;
    return value % n;
  };

// 全部 11 个函数（导出名 → 文件名里的 @ 原名）
const FUNCS = [
  ['orc_ryou_man', 'ORC_RYOU男'],
  ['slime_ryou_man', 'SLIME_RYOU男'],
  ['insect_ryou_man', 'INSECT_RYOU男'],
  ['ivy_ryou_man', 'IVY_RYOU男'],
  ['syokusyu_ryou_man', 'SYOKUSYU_RYOU男'],
  ['faily_ryou_man', 'FAILY_RYOU男'],
  ['giant_ryou_man', 'GIANT_RYOU男'],
  ['man_ryou_man', 'MAN_RYOU男'],
  ['beast_ryou_man', 'BEAST_RYOU男'],
  ['brain_ryou_man', 'BRAIN_RYOU男'],
  ['horse_ryou_man', 'HORSE_RYOU男'],
];

test('11 种怪物分派：各自可调用、输出非空、返回 0', async () => {
  for (const [export_name, erb_name] of FUNCS) {
    const fixture = await setup_ravish();
    const mod = fixture.load_module('kojo/kojo-dungeon-ravish-man');
    assert.equal(typeof mod[export_name], 'function', `${export_name} 未导出`);
    const result = await mod[export_name](31, 5, seq_rand(0));
    assert.equal(result, 0, `${export_name} 应返回 0（RETURN 0）`);
    const lines = fixture.text_lines();
    assert.ok(
      lines.length > 0,
      `${export_name}（原作 @${erb_name}）应输出文本`,
    );
    assert.ok(
      lines.some((l) => l.includes('冒险者')),
      `${export_name} 应含被凌辱者名字（%SAVESTR:ARG%）`,
    );
  }
});

test('兽人凌辱（RAND:5 == 0）：口交三选一 + 恐怖点数 + 初吻', async () => {
  // rand_n(5) == 0 → 口交支；rand_n(5) 用于 PRINTDATA 三选一（0 → 第一条）
  const fixture = await setup_ravish((f) => {
    f.store.set('talent:31:11', 1); // 反抗的 → 恐怖点数
    f.store.set('cflag:31:16', -1); // 初吻未经历
  });
  const mod = fixture.load_module('kojo/kojo-dungeon-ravish-man');
  const result = await mod.orc_ryou_man(31, 5, seq_rand(0, 0));
  assert.equal(result, 0);
  const lines = fixture.text_lines();
  assert.ok(lines.some((l) => l.includes('恐怖点数+50')));
  assert.ok(lines.some((l) => l.includes('口交经验+5')));
  // 数值副作用
  assert.equal(fixture.store.get('juel:31:10'), 50); // 恐怖
  assert.equal(fixture.store.get('exp:31:22'), 5); // 口交
  assert.equal(fixture.store.get('exp:31:20'), 5); // 精液
  // 初吻推进
  assert.equal(fixture.store.get('cflag:31:16'), 995);
});

test('兽人凌辱（RAND:5 != 0 全穴奉仕）：肛门/口交/精液经验', async () => {
  // rand_n(5) == 1 → 全穴奉仕；rand_n(4) 用于 PRINTDATAW 三选一
  const fixture = await setup_ravish();
  const mod = fixture.load_module('kojo/kojo-dungeon-ravish-man');
  await mod.orc_ryou_man(31, 5, seq_rand(1, 0));
  const lines = fixture.text_lines();
  assert.ok(lines.some((l) => l.includes('注满了精液')));
  assert.equal(fixture.store.get('exp:31:1'), 5); // 肛门经验
  assert.equal(fixture.store.get('exp:31:22'), 5); // 口交经验
  assert.equal(fixture.store.get('exp:31:20'), 5); // 精液经验
  assert.equal(fixture.store.get('juel:31:9'), 50); // 苦痛
});

test('史莱姆凌辱（RAND:6 == 0）：黏液侵犯 + 体力回复分支', async () => {
  // rand_n(6) == 0 → 黏液侵犯；体力回复在 RAND:6 != 0 且其余不中的兜底
  const a = await setup_ravish();
  const mod = fixture_module(a);
  await mod.slime_ryou_man(31, 5, seq_rand(0));
  assert.ok(a.text_lines().some((l) => l.includes('黏液侵犯着')));
  assert.equal(a.store.get('juel:31:9'), 50);
  assert.equal(a.store.get('exp:31:1'), 5);

  // 兜底支（rand_n(6)=1, rand_n(5)=1, rand_n(4)=1, rand_n(3)=1, rand_n(2)=1）
  const b = await setup_ravish();
  const mod_b = fixture_module(b);
  await mod_b.slime_ryou_man(31, 5, seq_rand(1, 1, 1, 1, 1));
  assert.ok(b.text_lines().some((l) => l.includes('治愈了')));
  assert.equal(b.store.get('base:31:0'), 100); // BASE:ARG:0 += 100
});

// 辅助：加载模块（避免重复 require 缓存问题）
function fixture_module(fixture) {
  return fixture.load_module('kojo/kojo-dungeon-ravish-man');
}

test('巨人凌辱：单只分支（MON_NUM == 1）提前返回', async () => {
  const fixture = await setup_ravish((f) => f.store.set('cflag:31:16', -1));
  const mod = fixture_module(fixture);
  const result = await mod.giant_ryou_man(31, 1, seq_rand(0));
  assert.equal(result, 0);
  assert.ok(fixture.text_lines().some((l) => l.includes('『喝下去哦』')));
  assert.equal(fixture.store.get('exp:31:22'), 1);
  assert.equal(fixture.store.get('cflag:31:16'), 995); // 初吻
});

test('巨人凌辱：畏怖阶段分档（CFLAG:131 > 5 → 隷属口上）', async () => {
  const fixture = await setup_ravish((f) => f.store.set('cflag:31:131', 6));
  const mod = fixture_module(fixture);
  await mod.giant_ryou_man(31, 5, seq_rand(0));
  assert.ok(fixture.text_lines().some((l) => l.includes('灰机杯')));
});

test('男人凌辱：肉便器分支（RAND:5 != 0 且 RAND:4 == 0）', async () => {
  const fixture = await setup_ravish();
  const mod = fixture_module(fixture);
  // 畏怖口上 pick 先消费 1 个 rand_n(5)；rand_n(5)（口交判定）用 1 不中；
  // rand_n(4) 用 0 → 中肉便器
  await mod.man_ryou_man(31, 5, seq_rand(1, 1, 0));
  const lines = fixture.text_lines();
  assert.ok(lines.some((l) => l.includes('肉便器')));
  assert.ok(lines.some((l) => l.includes('【最喜欢阴茎】')));
  assert.equal(fixture.store.get('exp:31:1'), 5);
  assert.equal(fixture.store.get('exp:31:22'), 5);
});

test('人狼分支（TALENT:314 == 2）：欲情点数', async () => {
  for (const [fn, line] of [
    ['beast_ryou_man', '不太反感和野兽做爱'],
    ['horse_ryou_man', '不太反感和马做爱'],
  ]) {
    const fixture = await setup_ravish((f) => f.store.set('talent:31:314', 2));
    const mod = fixture_module(fixture);
    await mod[fn](31, 5, seq_rand(0));
    assert.ok(
      fixture.text_lines().some((l) => l.includes(line)),
      `${fn} 应含人狼台词`,
    );
    assert.equal(fixture.store.get('juel:31:5'), 50); // 欲情
    assert.equal(fixture.store.get('exp:31:56'), 5); // 兽奸经验
  }
});

test('食脑魔凌辱（RAND:2 == 0）：支配精神 + 异常经验', async () => {
  const fixture = await setup_ravish();
  const mod = fixture_module(fixture);
  await mod.brain_ryou_man(31, 5, seq_rand(0));
  assert.ok(fixture.text_lines().some((l) => l.includes('支配他的精神')));
  assert.equal(fixture.store.get('exp:31:50'), 1); // 异常经验
  assert.equal(fixture.store.get('exp:31:1'), 50); // 肛门经验 * 10
});

test('GOBI_KOUJO 分发：语尾口上经 kojo-system（K 实现随口上票）', async () => {
  const fixture = await setup_ravish((f) => f.store.set('talent:31:17', 1));
  const mod = fixture_module(fixture);
  // orc：rand_n(5)=2 不中口交、rand_n(4)=1 不中全穴、rand_n(3)=0 中屈辱；
  // 屈辱内 rand_n(3)（落書き）取 ?? 0。未注册性格 → TRYCALL 落空静默。
  await mod.orc_ryou_man(31, 5, seq_rand(2, 1, 0));
});

test('存根清单可检索：docs/stub-registry.md 收录 GOBI_KOUJO', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = fixture.load_module('kojo/kojo-dungeon-ravish-man');
  const registry = fs.readFileSync(
    path.resolve(__dirname, '..', 'docs', 'stub-registry.md'),
    'utf8',
  );
  for (const name of STUBBED_CALLS) {
    assert.ok(
      registry.includes(name),
      `docs/stub-registry.md 必须收录 ${name}`,
    );
  }
});

test('同名函数断言：*_ryou_man 与 H13 的 *_ryou 名字区分', async () => {
  // #12 的首个加载生效遮蔽只发生在「同名」函数之间。本文件（H14）的
  // 函数是 `*_RYOU男`（JS 导出 `*_ryou_man`），H13 的 DUNGEON_RYOUZYOKU.ERB
  // 是 `@*_RYOU`（无 man）——两组名字不同，互不遮蔽。这里断言导出名
  // 都带 man 后缀，且与源文件的 @ 原名逐字对应（对照 DUNGEON_RYOUZYOKU.ERB
  // 的分派调用名，防止将来改错名触发遮蔽）。
  const fixture = create_era_fixture();
  const mod = fixture.load_module('kojo/kojo-dungeon-ravish-man');
  const erb = fs.readFileSync(
    path.resolve(
      __dirname,
      '..',
      'target',
      'ERB',
      '迷宮',
      'DUNGEON_RYOUZYOKU_MAN.ERB',
    ),
    'utf8',
  );
  for (const [export_name, erb_name] of FUNCS) {
    assert.equal(typeof mod[export_name], 'function');
    assert.ok(
      erb.includes(`@${erb_name}(ARG)`),
      `源文件应含 @${erb_name}(ARG) 定义`,
    );
  }
  // H13 的分派 CALL 名（TALENT:122 为真）引用的正是本文件的带 man 名
  const h13 = fs.readFileSync(
    path.resolve(
      __dirname,
      '..',
      'target',
      'ERB',
      '迷宮',
      'DUNGEON_RYOUZYOKU.ERB',
    ),
    'utf8',
  );
  for (const [, erb_name] of FUNCS) {
    assert.ok(
      h13.includes(`CALL ${erb_name},ARG`),
      `H13 分派应 CALL ${erb_name},ARG（TALENT:122 为真时）`,
    );
  }
});
