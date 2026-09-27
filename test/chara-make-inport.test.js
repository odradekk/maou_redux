/**
 * ere/chara/chara-make-inport.js（chara_make_inport）与转发层判定式
 * （ere/chara/char-make.js）的行为测试（issue #394，N10）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点）。随机源经 rand
 * 参数注入（chara-init.js 先例）：
 *   - never = () => 1（RAND:N == 1，对 `== 0` 判定恒不中）
 *   - always = () => 0（恒中）
 *
 * 通信名单在 ere 侧是 `global:100` 的 JSON 数组（100 格名单槽）
 * （ere/era-utils/era-global.js 手写区「communication_roster」），元素格式
 * 与 ere/system/cross-save-sharing.js 的 serialize_character 同构：14 段
 * 以 `_` 分隔，其中十张二维表段内以 `下标,值/` 重复。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function load(fixture) {
  return fixture.load_module('chara/chara-make-inport');
}

function load_forward(fixture) {
  return fixture.load_module('chara/char-make');
}

/** RAND:N == 1（恒不中 == 0 判定；对 truthy 判定恒真） */
const never = () => 1;
/** RAND:N == 0（恒中） */
const always = () => 0;

/**
 * 按 serialize_character 的字段序拼一条通信勇者记录：
 * 唯一标记_预设号_等级_称呼_ABL_BASE_MAXBASE_CFLAG_EXP_EQUIP_JUEL_TALENT_MARK_CSTR
 */
function inport_record({
  stamp,
  no,
  level,
  nickname,
  abl = '',
  base = '',
  maxbase = '',
  cflag = '',
  exp = '',
  equip = '',
  juel = '',
  talent = '',
  mark = '',
  cstr = '',
}) {
  return [
    stamp,
    no,
    level,
    nickname,
    abl,
    base,
    maxbase,
    cflag,
    exp,
    equip,
    juel,
    talent,
    mark,
    cstr,
  ].join('_');
}

/** 预置通信名单（global:100 的 JSON 数组） */
function seed_roster(fixture, records) {
  fixture.store.set('global:100', JSON.stringify(records));
}

/** 预置一个可 addCharacter 的预设（引擎的 staticData.chara[id]） */
function seed_preset(fixture, cid, name = '预设名', callname = '预设称呼') {
  fixture.seed_chara(cid, { id: cid, name, callname });
}

// —— 早退路径 ——

test('flag:76 <= 0 早退：名单非空也不建角色', () => {
  const fixture = create_era_fixture();
  seed_roster(fixture, [
    inport_record({ stamp: 11, no: 3, level: 5, nickname: '甲' }),
  ]);
  seed_preset(fixture, 3);
  const { chara_make_inport } = load(fixture);

  assert.equal(chara_make_inport(never), 0, '早退返回 0');
  assert.deepEqual(fixture.chara_no, [], '未建角色');
});

test('名单为空早退：候选数为 0 时不掷骰、不建角色', () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:76', 30); // 外来勇者等级上限
  seed_roster(fixture, []);
  const { chara_make_inport } = load(fixture);

  let rolled = 0;
  const spy = () => {
    rolled += 1;
    return 0;
  };
  assert.equal(chara_make_inport(spy), 0, '无候选返回 0');
  assert.equal(rolled, 0, '候选为空时 RAND 不掷');
  assert.deepEqual(fixture.chara_no, [], '未建角色');
});

test('名单里的空槽位被跳过：全空 → 无候选 → 返回 0', () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:76', 30);
  seed_roster(fixture, ['', '', '']);
  const { chara_make_inport } = load(fixture);

  assert.equal(chara_make_inport(always), 0, '空串记录不算候选');
  assert.deepEqual(fixture.chara_no, [], '未建角色');
});

// —— 三条过滤 ——

test('等级超过 flag:76 的记录被跳过', () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:76', 10); // 上限 10
  seed_roster(fixture, [
    inport_record({ stamp: 11, no: 3, level: 11, nickname: '甲' }),
  ]);
  seed_preset(fixture, 3);
  const { chara_make_inport } = load(fixture);

  assert.equal(chara_make_inport(always), 0, '超限记录被跳过');
  assert.deepEqual(fixture.chara_no, [], '未建角色');
});

test('等级恰好等于 flag:76 的记录放行（条件是 `>` 不是 `>=`）', () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:76', 10);
  seed_roster(fixture, [
    inport_record({ stamp: 11, no: 3, level: 10, nickname: '甲' }),
  ]);
  seed_preset(fixture, 3);
  const { chara_make_inport } = load(fixture);

  assert.equal(chara_make_inport(always), 3, '边界值放行，建出角色 3');
});

test('唯一标记已在场的记录被跳过：同标记不同预设号也不放行', () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:76', 30);
  seed_roster(fixture, [
    inport_record({ stamp: 11, no: 3, level: 5, nickname: '甲' }),
  ]);
  seed_preset(fixture, 3);
  // 已有一名角色 7 持有同一唯一标记
  seed_preset(fixture, 7);
  fixture.era.addCharacter(7);
  fixture.store.set('cflag:7:190', 11); // cflag:190 通信勇者唯一标记
  const { chara_make_inport } = load(fixture);

  assert.equal(chara_make_inport(always), 0, '同标记已在场 → 无候选');
  assert.deepEqual(fixture.chara_no, [7], '未建新角色');
});

test('唯一标记不同则放行（比较的另一侧）', () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:76', 30);
  seed_roster(fixture, [
    inport_record({ stamp: 11, no: 3, level: 5, nickname: '甲' }),
  ]);
  seed_preset(fixture, 3);
  seed_preset(fixture, 7);
  fixture.era.addCharacter(7);
  fixture.store.set('cflag:7:190', 12); // 另一名角色的标记是 12
  const { chara_make_inport } = load(fixture);

  assert.equal(chara_make_inport(always), 3, '标记不同 → 候选成立');
});

test('同预设号已在场的记录被跳过', () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:76', 30);
  seed_roster(fixture, [
    inport_record({ stamp: 11, no: 3, level: 5, nickname: '甲' }),
  ]);
  seed_preset(fixture, 3);
  fixture.era.addCharacter(3); // 预设号 3 已在场
  const { chara_make_inport } = load(fixture);

  assert.equal(chara_make_inport(always), 0, '预设号 3 已在场 → 跳过');
  assert.deepEqual(fixture.chara_no, [3], '未建新角色');
});

test('候选按名单槽位升序收集：RAND 的取值面就是候选数', () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:76', 30);
  // 槽 0 被两条过滤分别淘汰，槽 1 与槽 2 是候选
  seed_roster(fixture, [
    inport_record({ stamp: 11, no: 3, level: 99, nickname: '超限' }), // 槽 0：等级超限
    inport_record({ stamp: 21, no: 4, level: 5, nickname: '乙' }), // 槽 1
    inport_record({ stamp: 31, no: 5, level: 6, nickname: '丙' }), // 槽 2
  ]);
  seed_preset(fixture, 4, '预设四');
  seed_preset(fixture, 5, '预设五');
  const { chara_make_inport } = load(fixture);

  // 掷到的槽位序号 = RAND:2（只可能是 1 或 2）
  let seen = -1;
  const spy = (n) => {
    seen = n;
    return 1; // 第二个候选 → 槽 2
  };
  assert.equal(chara_make_inport(spy), 5, '掷中第二个候选（槽 2，预设号 5）');
  assert.equal(seen, 2, 'RAND 的分母 = 候选数（2）');

  // 同一份名单、掷第一个候选 → 槽 1
  const fixture2 = create_era_fixture();
  fixture2.store.set('flag:76', 30);
  seed_roster(fixture2, [
    inport_record({ stamp: 11, no: 3, level: 99, nickname: '超限' }),
    inport_record({ stamp: 21, no: 4, level: 5, nickname: '乙' }),
    inport_record({ stamp: 31, no: 5, level: 6, nickname: '丙' }),
  ]);
  seed_preset(fixture2, 4, '预设四');
  seed_preset(fixture2, 5, '预设五');
  const { chara_make_inport: run2 } = load(fixture2);
  assert.equal(
    run2(() => 0),
    4,
    '掷中第一个候选（槽 1，预设号 4）',
  );
});

// —— 成功路径 ——

test('成功路径：14 段字段逐项写入', () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:76', 30);
  seed_roster(fixture, [
    inport_record({
      stamp: 11,
      no: 3,
      level: 7,
      nickname: '甲',
      abl: '14,5/17,9/',
      base: '2,12/',
      maxbase: '0,30/1,20/',
      cflag: '151,60/',
      exp: '0,4/',
      equip: '0,7/',
      juel: '0,2/',
      talent: '122,1/',
      mark: '10,3/',
      cstr: '60,朕/',
    }),
  ]);
  seed_preset(fixture, 3);
  const { chara_make_inport } = load(fixture);

  assert.equal(chara_make_inport(always), 3, '返回新角色号');
  assert.deepEqual(fixture.chara_no, [3], 'addCharacter 建出角色 3');
  // 记录的预设号即角色号（扁平化，文件头二）
  assert.equal(
    fixture.store.get('callname:3:-1'),
    '甲',
    '姓名写入 callname:-1',
  );
  assert.equal(
    fixture.store.get('callname:3:-2'),
    '甲',
    '称呼写入 callname:-2',
  );
  // 十张表（段尾空元素不计入，不能写成 0）
  assert.equal(fixture.store.get('abl:3:14'), 5, 'abl');
  assert.equal(fixture.store.get('abl:3:17'), 9, 'abl 第二项');
  assert.equal(
    fixture.store.get('base:3:2'),
    12,
    'BASE（0/1 号位随后被回满段覆盖）',
  );
  assert.equal(fixture.store.get('maxbase:3:1'), 20, 'maxbase');
  assert.equal(fixture.store.get('cflag:3:151'), 60, 'cflag');
  assert.equal(fixture.store.get('exp:3:0'), 4, 'exp');
  assert.equal(fixture.store.get('equip:3:0'), 7, 'equip');
  assert.equal(fixture.store.get('juel:3:0'), 2, 'juel');
  assert.equal(fixture.store.get('talent:3:122'), 1, 'talent');
  assert.equal(fixture.store.get('mark:3:10'), 3, 'mark');
  assert.equal(fixture.store.get('cstr:3:60'), '朕', 'cstr 是字符串段');
  // 段尾的空元素没有被当成下标 0 的 0 值写进去
  assert.equal(
    fixture.store.get('abl:3:0'),
    undefined,
    '段尾空元素不得落成下标 0 的 0',
  );
});

test('成功路径：侵入阶层 / 侵攻度 / 侵攻中与 HP 气力补满', () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:76', 30);
  seed_roster(fixture, [
    inport_record({
      stamp: 11,
      no: 3,
      level: 7,
      nickname: '甲',
      base: '0,12/1,3/',
      maxbase: '0,30/1,20/',
    }),
  ]);
  seed_preset(fixture, 3);
  const { chara_make_inport } = load(fixture);

  chara_make_inport(always);
  assert.equal(fixture.store.get('cflag:3:501'), 1, 'cflag:501 侵入阶层');
  assert.equal(fixture.store.get('cflag:3:502'), 0, 'cflag:502 侵攻度');
  assert.equal(fixture.store.get('cflag:3:1'), 2, 'cflag:1 = 2 侵攻中');
  assert.equal(fixture.store.get('base:3:0'), 30, 'base:0 = maxbase:0');
  assert.equal(fixture.store.get('base:3:1'), 20, 'base:1 = maxbase:1');
});

test('flag:77 关：不压等级、不清战斗经验', () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:76', 30);
  fixture.store.set('flag:77', 0);
  fixture.store.set('cflag:0:9', 50); // 魔王等级，用于确认没人被动过
  seed_roster(fixture, [
    inport_record({
      stamp: 11,
      no: 3,
      level: 7,
      nickname: '甲',
      cflag: '9,7/',
      exp: '80,123/',
    }),
  ]);
  seed_preset(fixture, 3);
  const { chara_make_inport } = load(fixture);

  chara_make_inport(always);
  assert.equal(fixture.store.get('cflag:3:9'), 7, '未执行——等级是记录里的 7');
  assert.equal(fixture.store.get('exp:3:80'), 123, '未执行——战斗经验保留');
});

test('flag:77 开：压到 1 级、战斗经验清零', () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:76', 30);
  fixture.store.set('flag:77', 1);
  seed_roster(fixture, [
    inport_record({
      stamp: 11,
      no: 3,
      level: 7,
      nickname: '甲',
      cflag: '9,7/',
      exp: '80,123/',
    }),
  ]);
  seed_preset(fixture, 3);
  const { chara_make_inport } = load(fixture);

  chara_make_inport(always);
  assert.equal(fixture.store.get('cflag:3:9'), 1, 'cflag:9 压到 1');
  assert.equal(fixture.store.get('exp:3:80'), 0, 'exp:80 清零');
});

test('flag:77 开且 flag:60 > 0：逐级 st_up 恰好 2 次（次数 = flag:60）', () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:76', 30);
  fixture.store.set('flag:77', 1);
  fixture.store.set('flag:60', 2); // 勇者基础等级修正
  seed_roster(fixture, [
    inport_record({
      stamp: 11,
      no: 3,
      level: 7,
      nickname: '甲',
      maxbase: '0,300/1,300/',
    }),
  ]);
  seed_preset(fixture, 3);
  const { chara_make_inport } = load(fixture);

  // st_up 每次至少 +1 级，随机源恒 0 → 攻 +1、无百日补强（day_count = 0）
  chara_make_inport(always);
  assert.equal(fixture.store.get('cflag:3:9'), 3, '1 + 2 次 st_up = 3 级');
  assert.equal(fixture.store.get('cflag:3:13'), 4, '基础攻击每次 +2');
});

test('flag:77 开但 flag:60 == 0：一次 st_up 都不做', () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:76', 30);
  fixture.store.set('flag:77', 1);
  fixture.store.set('flag:60', 0);
  seed_roster(fixture, [
    inport_record({
      stamp: 11,
      no: 3,
      level: 7,
      nickname: '甲',
      cflag: '9,7/',
    }),
  ]);
  seed_preset(fixture, 3);
  const { chara_make_inport } = load(fixture);

  chara_make_inport(always);
  assert.equal(fixture.store.get('cflag:3:9'), 1, '停在 1 级');
  assert.equal(fixture.store.get('cflag:3:13'), undefined, '未调 st_up');
});

test('身体数据未生成时调用 char_body_generate_wapped', () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:76', 30);
  fixture.store.set('flag:5', 1 << 12); // flag:5 位 12：身体数据生成开关
  seed_roster(fixture, [
    inport_record({ stamp: 11, no: 3, level: 7, nickname: '甲' }), // cflag:451 = 0
  ]);
  seed_preset(fixture, 3);
  const { chara_make_inport } = load(fixture);

  chara_make_inport(always);
  assert.notEqual(
    fixture.store.get('cflag:3:451'),
    0,
    '年龄已由 char_body_generate_wapped 写入',
  );

  // cflag:451 != 0 → 不再调用（这一侧的条件是「已有身体数据」）
  const fixture2 = create_era_fixture();
  fixture2.store.set('flag:76', 30);
  fixture2.store.set('flag:5', 1 << 12);
  seed_roster(fixture2, [
    inport_record({
      stamp: 11,
      no: 3,
      level: 7,
      nickname: '甲',
      cflag: '451,25/',
    }),
  ]);
  seed_preset(fixture2, 3);
  const { chara_make_inport: run2 } = load(fixture2);
  run2(always);
  assert.equal(fixture2.store.get('cflag:3:451'), 25, '已有年龄 → 不重新生成');
});

test('目标预设不存在时不写进不存在的桶（有意偏离既有行为，#394）', () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:76', 30);
  seed_roster(fixture, [
    inport_record({ stamp: 11, no: 999, level: 5, nickname: '幽灵' }),
  ]);
  // 不 seed_preset(999)：引擎的 addCharacter 对无预设的号返回 false
  const { chara_make_inport } = load(fixture);

  assert.equal(chara_make_inport(always), 0, '建不出来就返回 0');
  assert.deepEqual(fixture.chara_no, [], '未建角色');
  assert.equal(
    fixture.store.get('cflag:999:501'),
    undefined,
    '未往幽灵号写任何值',
  );
});

// —— 转发层判定式（ere/chara/char-make.js） ——

test('转发层 char_make_inport：rand(arg0) != 0 即返回 0', async () => {
  const fixture = create_era_fixture();
  const forward = load_forward(fixture);
  assert.equal(await forward.char_make_inport(5, never), 0, '掷不中：非异国');
});

test('转发层 char_make_inport：掷中后进真身，flag:76 未设时真身早退', async () => {
  const fixture = create_era_fixture();
  seed_roster(fixture, [
    inport_record({ stamp: 11, no: 3, level: 5, nickname: '甲' }),
  ]);
  seed_preset(fixture, 3);
  const forward = load_forward(fixture);
  // 缺省 arg0 = 1：RAND(1) 恒 0 必成功；flag:76 = 0 → 真身返回 0
  assert.equal(
    await forward.char_make_inport(undefined, always),
    0,
    '掷中后由真身判定，真身早退仍是 0',
  );
});

test('转发层 char_make_inport：掷中且名单可用的记录 → 返回新角色号', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:76', 30);
  seed_roster(fixture, [
    inport_record({ stamp: 11, no: 3, level: 5, nickname: '甲' }),
  ]);
  seed_preset(fixture, 3);
  const forward = load_forward(fixture);

  assert.equal(
    await forward.char_make_inport(1, always),
    3,
    '真身返回新角色号',
  );
  assert.deepEqual(fixture.chara_no, [3], '角色已建立');
});

test('转发层 char_make_inport 的随机源透传（与真身共用同一支）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:76', 30);
  seed_roster(fixture, [
    inport_record({ stamp: 11, no: 3, level: 5, nickname: '甲' }),
    inport_record({ stamp: 21, no: 4, level: 5, nickname: '乙' }),
  ]);
  seed_preset(fixture, 3);
  seed_preset(fixture, 4);
  const forward = load_forward(fixture);

  const calls = [];
  const spy = (n) => {
    calls.push(n);
    return n === 2 ? 1 : 0; // 判定式 rand(1) 恒取 0；候选掷 RAND:2 取 1
  };
  assert.equal(await forward.char_make_inport(1, spy), 4, '第二个候选中选');
  assert.deepEqual(calls, [1, 2], '两次掷骰：判定式 rand(arg0) 与候选 RAND');
});

test('第 99 槽（名单末位）也是候选（100 格名单）', () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:76', 30);
  const records = new Array(99).fill('');
  records.push(inport_record({ stamp: 11, no: 3, level: 5, nickname: '甲' }));
  seed_roster(fixture, records);
  seed_preset(fixture, 3);
  const { chara_make_inport } = load(fixture);

  assert.equal(chara_make_inport(always), 3, '末位槽的勇者能被抽到');
});

test('flag:76 == 0 且记录等级也是 0 时仍然早退（条件是 `<= 0` 不是 `< 0`）', () => {
  const fixture = create_era_fixture();
  // flag:76 缺省 0：等级 0 的记录能过等级检查，早退只能由开头的 <= 0 检查拦住
  seed_roster(fixture, [
    inport_record({ stamp: 11, no: 3, level: 0, nickname: '甲' }),
  ]);
  seed_preset(fixture, 3);
  const { chara_make_inport } = load(fixture);

  assert.equal(chara_make_inport(always), 0, '早退返回 0');
  assert.deepEqual(fixture.chara_no, [], '未建角色');
});
