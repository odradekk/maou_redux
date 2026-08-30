/**
 * ere/chara/chara-init.js @CHAR_INIT / @RANDOM_SELF_CALL 窄路径的行为测试
 * （issue #118，ENDING_1 的 ADDCHARA 链第三环）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点），经模块公开
 * 接口 char_init / random_self_call 直驱。
 *
 * 窄路径的既定事实（chara-init.js 文件头）：菲娅 CFLAG:35:9 = 1（等级段
 * 不进）、CFLAG:35:450 无预设（一人称走 <9 直设）、FLAG:5 恒 0（身体数据
 * 段不进）。本文件另用注入态覆盖条件段的两个入口（等级段、身体数据段），
 * 守住条件结构 1:1。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function load(fixture) {
  return fixture.load_module('chara/chara-init');
}

function history_texts(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

test('一人称（<9 直设，SELF_CALL.ERB:38-42）：CSTR:60 = 我、CFLAG:450 = 9、返回 9', async () => {
  const fixture = create_era_fixture();
  const { random_self_call } = load(fixture);
  // 菲娅形态：CFLAG:450 无预设 → 0 → <9 直设
  assert.equal(await random_self_call(35), 9, 'RETURN 9');
  assert.equal(fixture.store.get('cstr:35:60'), '我', 'CSTR:x:60 = 我');
  assert.equal(fixture.store.get('cflag:35:450'), 9, 'CFLAG:x:450 = 9');
});

test('一人称档位 ≥200：CSV 回落档（CSVCSTR 存根），仍以「我」落地（预设空等价）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('cflag:35:450', 200);
  const { random_self_call } = load(fixture);
  assert.equal(await random_self_call(35), 9, '回落为空后走 <9 直设');
  assert.equal(fixture.store.get('cstr:35:60'), '我');
  assert(
    history_texts(fixture).some((line) => line.includes('@CSVCSTR')),
    '预设读取的占位行可见（登记项）',
  );
});

test('一人称档位 [9,100)：SET_SUIT_SELFCALL 存根、CSTR 不写、档位不动', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('cflag:35:450', 10);
  const { random_self_call } = load(fixture);
  assert.equal(await random_self_call(35), 10, '原档位原样返回');
  assert.equal(fixture.store.get('cstr:35:60'), undefined, '未到直设分支');
  assert(
    history_texts(fixture).some((line) => line.includes('@SET_SUIT_SELFCALL')),
    '合适一人称的占位行可见（登记项）',
  );
});

test('char_init 窄路径（菲娅形态）：一人称直设 + 无服装静默 + 能力者全掷不中', async () => {
  const fixture = create_era_fixture();
  const { char_init } = load(fixture);
  // 注入全不中的随机源（RAND:40 恒 1 ≠ 0）
  const result = await char_init(35, () => 1);
  assert.equal(result, 35, 'RETURN L_A');
  assert.equal(fixture.store.get('cstr:35:60'), '我', '一人称已设');
  const texts = history_texts(fixture);
  // :21-23 着替え装着自 #215（J5）起为真身：菲娅无既定服装（41/42 均 0）
  // → WEARING_CLOTH_ALL 早退、无输出无写入（行为锁在 test/cloth-func.test.js）
  assert.equal(fixture.store.get('cflag:35:40'), undefined, '无服装不写装位');
  assert(
    !texts.some((line) => line.includes('@ST_UP')),
    'CFLAG:9 = 1 不 > 1：等级段不进（菲娅既定事实）',
  );
  assert(
    !texts.some((line) => line.includes('@CHAR_BODY_GENERATE_WAPPED')),
    'FLAG:5 恒 0：身体数据段不进',
  );
});

test('能力者技能五连（CHARA_MAKE_INIT.ERB:35-47）：掷中即得、注入序 275→279', async () => {
  const fixture = create_era_fixture();
  const { char_init } = load(fixture);
  // RAND:40 == 0 才获得：前两掷中、后三掷不中
  const rolls = [0, 0, 1, 1, 1];
  await char_init(35, (n) => (rolls.shift() ?? 1) % n);
  assert.equal(fixture.store.get('talent:35:275'), 1, '火之能力者获得');
  assert.equal(fixture.store.get('talent:35:276'), 1, '冰之能力者获得');
  assert.equal(fixture.store.get('talent:35:277'), undefined, '雷未获得');
  assert.equal(fixture.store.get('talent:35:279'), undefined, '暗未获得');
});

test('已持有一系能力者时整段跳过（!(275||…||279) 的守卫，:35）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('talent:35:277', 1);
  const { char_init } = load(fixture);
  await char_init(35, () => 0); // 全掷中
  assert.equal(fixture.store.get('talent:35:275'), undefined, '守卫挡住五连');
  assert.equal(fixture.store.get('talent:35:276'), undefined);
});

test('等级段条件 1:1：CFLAG:9 > 1 且 CFLAG:11 == 0 才进（ST_UP 真身，#179）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('cflag:35:9', 5);
  fixture.store.set('cflag:35:11', 0);
  const { char_init } = load(fixture);
  // rand ≡ 1：ST_UP 的 RAND:2 掷 1 → 每级攻 +1 / 防 +2（基础各 +1 + 防 1）
  await char_init(35, () => 1);
  assert.equal(fixture.store.get('cflag:35:9'), 5, '等级钳回原值（:15）');
  assert.equal(fixture.store.get('cflag:35:13'), 5, '基础攻击 +5（5 级 × 1）');
  assert.equal(
    fixture.store.get('cflag:35:14'),
    10,
    '基础防御 +10（5 级 × 2）',
  );
  assert.equal(
    fixture.store.get('maxbase:35:0'),
    50,
    '体力上限 +50（5 级 × 10，:86）',
  );
  assert.equal(fixture.store.get('maxbase:35:1'), 50, '气力上限 +50（:87）');
  assert.equal(fixture.store.get('base:35:0'), 50, '体力拉满到上限（:16）');
  assert.equal(fixture.store.get('base:35:1'), 50, '气力拉满到上限（:17）');

  // 菲娅形态的对照组：CFLAG:11 = 15（CSV 预设）——即使等级 > 1 也不进
  const guard = create_era_fixture();
  guard.store.set('cflag:35:9', 5);
  guard.store.set('cflag:35:11', 15);
  const { char_init: init_guard } = load(guard);
  await init_guard(35, () => 1);
  assert.equal(
    guard.store.get('cflag:35:13'),
    undefined,
    'CFLAG:11 != 0：等级段不进（CSV 已设攻击力）',
  );
  assert.equal(guard.store.get('cflag:35:14'), undefined);
});

test('身体数据段条件 1:1：FLAG:5 位 12/15 开且 451/453 缺失才进', async () => {
  const fixture = create_era_fixture();
  // 位 12 开（GETBIT(FLAG:5,12)）：4096
  fixture.store.set('flag:5', 4096);
  const { char_init } = load(fixture);
  await char_init(35, () => 1);
  assert(
    history_texts(fixture).some((line) =>
      line.includes('@CHAR_BODY_GENERATE_WAPPED'),
    ),
    '位 12 开 + CFLAG:451/453 缺失：身体数据生成占位可见（登记项）',
  );

  // 预设已带身体数据（CFLAG:451 = 10、CFLAG:453 = 1270 的菲娅形态）：
  // 位开也不进
  const guard = create_era_fixture();
  guard.store.set('flag:5', 4096);
  guard.store.set('cflag:35:451', 10);
  guard.store.set('cflag:35:453', 1270);
  const { char_init: init_guard } = load(guard);
  await init_guard(35, () => 1);
  assert(
    !history_texts(guard).some((line) =>
      line.includes('@CHAR_BODY_GENERATE_WAPPED'),
    ),
    'CFLAG:451/453 均非 0：不生成',
  );
});
