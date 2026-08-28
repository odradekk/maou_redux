/**
 * ere/dungeon/dungeon-lvup.js @LVUP + @ST_UP 的行为测试（issue #179，H10）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点）。随机源经
 * st_up / lvup 的 rand 参数注入（dungeon-trap.test.js 的 seq/counting 先例）。
 *
 * 验收对应（#179 清单）：
 *   - @LVUP 三条经验曲线（魔王 / 精英翻倍 / 通常勇者）与循环保底多升；
 *   - 升级播报与初心者（TALENT:291）到 LV30 的剥离；
 *   - @ST_UP 的等级/攻防增量、RAND:2 二选一、种族补正、DAY >= 100 补强、
 *     体力/气力上限 +10；
 *   - 接线面的守卫（侵攻中的勇者不升级）在 event-turnend.test.js
 *     （守卫住在调用方 turnend-settle.js）。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

/** 定值序列注入：按消费顺序取值，耗尽后用末值 */
function seq(...values) {
  let i = 0;
  return () => {
    const v = values[Math.min(i, values.length - 1)] ?? 0;
    i += 1;
    return v;
  };
}

function load(fixture) {
  return fixture.load_module('dungeon/dungeon-lvup');
}

/** 最小世界：一个角色（等级/经验/素质由各用例自设） */
function setup_world(cid = 1) {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.seed_chara(cid, { id: cid, name: '阿尔', callname: '阿尔' });
  fixture.era.addCharacter(0);
  fixture.era.addCharacter(cid);
  return fixture;
}

function text_lines(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

// —— @ST_UP ——

test('ST_UP 基础档：等级 +1、攻防各 +1，RAND:2 掷 0 再攻 +1，上限各 +10', () => {
  const fixture = setup_world();
  const { st_up } = load(fixture);
  st_up(1, () => 0);
  assert.equal(fixture.store.get('cflag:1:9'), 1, '等级 0 → 1');
  assert.equal(
    fixture.store.get('cflag:1:13'),
    2,
    '基础攻击 1 + RAND:2=0 的 1',
  );
  assert.equal(
    fixture.store.get('cflag:1:14'),
    1,
    '基础防御 1（掷 0 无防加成）',
  );
  assert.equal(fixture.store.get('maxbase:1:0'), 10, '体力上限 +10');
  assert.equal(fixture.store.get('maxbase:1:1'), 10, '气力上限 +10');
});

test('ST_UP 的种族补正族：竜族 314=5 攻防各补、矮人 314=11 / 史莱姆 261 只补防、触手 262 只补攻', () => {
  const fixture = setup_world();
  fixture.store.set('talent:1:314', 5); // 竜族（攻防各 RAND:2）
  fixture.store.set('talent:1:261', 1); // 史莱姆（防 RAND:2）
  fixture.store.set('talent:1:262', 1); // 触手（攻 RAND:2）
  const { st_up } = load(fixture);
  // 消费序（st_up 内掷骰顺序）：RAND:2 主掷 0（攻）、竜族攻、竜族防、
  // 史莱姆防、触手攻——各族补正掷 1（= +1）
  st_up(1, seq(0, 1, 1, 1, 1));
  assert.equal(
    fixture.store.get('cflag:1:13'),
    4,
    '攻 1 + 主掷 1 + 触手 1 + 竜族 1',
  );
  assert.equal(fixture.store.get('cflag:1:14'), 3, '防 1 + 竜族 1 + 史莱姆 1');
});

test('ST_UP 的 DAY >= 100 补强与战术/肌肉型素质（各 RAND:3 / RAND:2）', () => {
  const fixture = setup_world();
  fixture.store.set('talent:1:240', 1); // 战术（攻防各 RAND:3）
  fixture.store.set('talent:1:248', 1); // 肌肉型（攻防各 RAND:2）
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.day_count = 150;
  const { st_up } = load(fixture);
  // 消费序：主掷 0（攻+1）、DAY 补攻 2、DAY 补防 2、战术攻 2、战术防 2、
  // 肌肉攻 1、肌肉防 1
  st_up(1, seq(0, 2, 2, 2, 2, 1, 1));
  assert.equal(
    fixture.store.get('cflag:1:13'),
    1 + 1 + 2 + 2 + 1,
    '攻 = 基础 1 + 主掷 1 + DAY 2 + 战术 2 + 肌肉 1',
  );
  assert.equal(
    fixture.store.get('cflag:1:14'),
    1 + 2 + 2 + 1,
    '防 = 基础 1 + DAY 2 + 战术 2 + 肌肉 1',
  );
});

// —— @LVUP ——

test('LVUP 通常勇者曲线：LV*10+10，够一级升一级并扣经验、播报一行', () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:9', 3); // LV3 → 必要 40
  fixture.store.set('exp:1:80', 45); // 够一级（剩 5，不够二级 50）
  const { lvup } = load(fixture);
  const gained = lvup(1, () => 0);
  assert.equal(gained, 1, '升一级');
  assert.equal(fixture.store.get('cflag:1:9'), 4, 'LV3 → 4');
  assert.equal(fixture.store.get('exp:1:80'), 5, '经验 45 - 40 = 5');
  assert.deepEqual(
    text_lines(fixture).filter((l) => l.includes('等级提升')),
    ['*阿尔的等级提升为LV4*'],
    '播报一行（PRINTFORML，等键不存在）',
  );
});

test('LVUP 循环多升：经验充足时连升、曲线随等级重算', () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:9', 1); // LV1→2 需 20、LV2→3 需 30
  fixture.store.set('exp:1:80', 50); // 20 + 30 = 50 恰好两级
  const { lvup } = load(fixture);
  const gained = lvup(1, () => 0);
  assert.equal(gained, 2, '连升两级');
  assert.equal(fixture.store.get('cflag:1:9'), 3);
  assert.equal(fixture.store.get('exp:1:80'), 0);
});

test('LVUP 精英曲线（TALENT:220）：LV*20+10（勇者两倍）', () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:9', 3);
  fixture.store.set('talent:1:220', 1);
  fixture.store.set('exp:1:80', 69); // 精英 LV3 需 70——差 1 不升
  const { lvup } = load(fixture);
  assert.equal(
    lvup(1, () => 0),
    0,
  );
  fixture.store.set('exp:1:80', 70);
  assert.equal(
    lvup(1, () => 0),
    1,
    '70 恰好一级',
  );
});

test('LVUP 魔王曲线（cid 0）：与通常同式（代码为准，注释 LV*100 失真）', () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  fixture.store.set('cflag:0:9', 5); // 魔王 LV5 → 需 60（非 510）
  fixture.store.set('exp:0:80', 59);
  const { lvup } = load(fixture);
  assert.equal(
    lvup(0, () => 0),
    0,
    '59 < 60 不升',
  );
  fixture.store.set('exp:0:80', 60);
  assert.equal(
    lvup(0, () => 0),
    1,
    '60 恰好一级',
  );
  assert.equal(fixture.store.get('cflag:0:9'), 6);
});

test('LVUP 经验不足时不播报、不动等级', () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:9', 2);
  fixture.store.set('exp:1:80', 29); // 需 30，差 1
  const { lvup } = load(fixture);
  assert.equal(
    lvup(1, () => 0),
    0,
  );
  assert.equal(fixture.store.get('cflag:1:9'), 2);
  assert.equal(
    text_lines(fixture).filter((l) => l.includes('等级提升')).length,
    0,
    '无播报',
  );
});

test('LVUP 初心者剥离：TALENT:291 且 LV >= 30 时清 0 并播报成长', () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:9', 29);
  fixture.store.set('talent:1:291', 1);
  fixture.store.set('exp:1:80', 300); // 29→30 需 300，恰好一级到 30
  const { lvup } = load(fixture);
  lvup(1, () => 0);
  assert.equal(fixture.store.get('cflag:1:9'), 30);
  assert.equal(fixture.store.get('talent:1:291'), 0, '失去初心者');
  const lines = text_lines(fixture);
  assert(lines.some((l) => l.includes('终于成长成了真正的勇者')));
  assert(lines.some((l) => l.includes('失去了[初心者]')));
});

test('LVUP 初心者未到 LV30 不剥离', () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:9', 29);
  fixture.store.set('talent:1:291', 1);
  fixture.store.set('exp:1:80', 0); // 不升级，LV 保持 29
  const { lvup } = load(fixture);
  lvup(1, () => 0);
  assert.equal(fixture.store.get('talent:1:291'), 1);
});

// —— chara-init 等级段的接入已在 test/chara-init.test.js（ST_UP 真身断言）——
