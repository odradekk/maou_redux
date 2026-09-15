/**
 * ere/chara/chara-make-inport.js @CHARA_MAKE_INPORT 与转发层判定式
 * （ere/chara/char-make.js）的行为测试（issue #394，N10）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点）。随机源经 rand
 * 参数注入（chara-init.js 先例）：
 *   - never = () => 1（RAND:N == 1，对 `== 0` 判定恒不中）
 *   - always = () => 0（恒中）
 *
 * 通信名单（原作 `GLOBALS:0..99`）在 ere 侧是 `global:100` 的 JSON 数组
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

test('FLAG:76 <= 0 早退（:9-10）：名单非空也不建角色', () => {
  const fixture = create_era_fixture();
  seed_roster(fixture, [
    inport_record({ stamp: 11, no: 3, level: 5, nickname: '甲' }),
  ]);
  seed_preset(fixture, 3);
  const { chara_make_inport } = load(fixture);

  assert.equal(chara_make_inport(never), 0, '早退 RETURN 0');
  assert.deepEqual(fixture.chara_no, [], '未建角色');
});

test('名单为空早退（:38-39）：候选数为 0 时不掷骰、不建角色', () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:76', 30); // 外来勇者等级上限
  seed_roster(fixture, []);
  const { chara_make_inport } = load(fixture);

  let rolled = 0;
  const spy = () => {
    rolled += 1;
    return 0;
  };
  assert.equal(chara_make_inport(spy), 0, '无候选 RETURN 0');
  assert.equal(rolled, 0, '候选为空时 RAND 不掷');
  assert.deepEqual(fixture.chara_no, [], '未建角色');
});

test('名单里的空槽位被跳过（:16-17）：全空 → 无候选 → RETURN 0', () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:76', 30);
  seed_roster(fixture, ['', '', '']);
  const { chara_make_inport } = load(fixture);

  assert.equal(chara_make_inport(always), 0, '空串记录不算候选');
  assert.deepEqual(fixture.chara_no, [], '未建角色');
});

// —— 三条过滤（:19-32） ——

test('等级超过 FLAG:76 的记录被跳过（:19-20）', () => {
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

test('等级恰好等于 FLAG:76 的记录放行（:19 是 `>` 不是 `>=`）', () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:76', 10);
  seed_roster(fixture, [
    inport_record({ stamp: 11, no: 3, level: 10, nickname: '甲' }),
  ]);
  seed_preset(fixture, 3);
  const { chara_make_inport } = load(fixture);

  assert.equal(chara_make_inport(always), 3, '边界值放行，建出角色 3');
});

test('唯一标记已在场的记录被跳过（:21-29）：同标记不同预设号也不放行', () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:76', 30);
  seed_roster(fixture, [
    inport_record({ stamp: 11, no: 3, level: 5, nickname: '甲' }),
  ]);
  seed_preset(fixture, 3);
  // 已有一名角色 7 持有同一唯一标记
  seed_preset(fixture, 7);
  fixture.era.addCharacter(7);
  fixture.store.set('cflag:7:190', 11); // CFLAG:190 通信勇者唯一标记
  const { chara_make_inport } = load(fixture);

  assert.equal(chara_make_inport(always), 0, '同标记已在场 → 无候选');
  assert.deepEqual(fixture.chara_no, [7], '未建新角色');
});

test('唯一标记不同则放行（:23 的比较两侧）', () => {
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

test('同预设号已在场的记录被跳过（:31-32）', () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:76', 30);
  seed_roster(fixture, [
    inport_record({ stamp: 11, no: 3, level: 5, nickname: '甲' }),
  ]);
  seed_preset(fixture, 3);
  fixture.era.addCharacter(3); // 预设号 3 已在场
  const { chara_make_inport } = load(fixture);

  assert.equal(chara_make_inport(always), 0, 'GETCHARA(3,0) >= 0 → 跳过');
  assert.deepEqual(fixture.chara_no, [3], '未建新角色');
});

test('候选按名单槽位升序收集（:33-34 的 LIST 顺序）：RAND 的取值面就是候选数', () => {
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

test('成功路径：14 段字段逐项落地（:44-108）', () => {
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

  assert.equal(chara_make_inport(always), 3, 'RETURN CHARA');
  assert.deepEqual(fixture.chara_no, [3], 'ADDVOIDCHARA 等价物建出角色 3');
  // :47 NO:CHARA —— 扁平化下就是角色号本身（文件头二）
  assert.equal(fixture.store.get('callname:3:-1'), '甲', ':51 CALLNAME');
  assert.equal(fixture.store.get('callname:3:-2'), '甲', ':49 SAVESTR');
  // :54-103 十张表（段尾空元素由 RESULT-1 挡掉，不能写成 0）
  assert.equal(fixture.store.get('abl:3:14'), 5, 'ABL');
  assert.equal(fixture.store.get('abl:3:17'), 9, 'ABL 第二项');
  assert.equal(
    fixture.store.get('base:3:2'),
    12,
    'BASE（0/1 号位随后被 :119-120 覆盖）',
  );
  assert.equal(fixture.store.get('maxbase:3:1'), 20, 'MAXBASE');
  assert.equal(fixture.store.get('cflag:3:151'), 60, 'CFLAG');
  assert.equal(fixture.store.get('exp:3:0'), 4, 'EXP');
  assert.equal(fixture.store.get('equip:3:0'), 7, 'EQUIP');
  assert.equal(fixture.store.get('juel:3:0'), 2, 'JUEL');
  assert.equal(fixture.store.get('talent:3:122'), 1, 'TALENT');
  assert.equal(fixture.store.get('mark:3:10'), 3, 'MARK');
  assert.equal(fixture.store.get('cstr:3:60'), '朕', 'CSTR 是字符串段');
  // 段尾的空元素没有被当成下标 0 的 0 值写进去
  assert.equal(
    fixture.store.get('abl:3:0'),
    undefined,
    '段尾空元素不得落成下标 0 的 0',
  );
});

test('成功路径：侵入阶层 / 侵攻度 / 侵攻中与 HP 气力补满（:106-120）', () => {
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
  assert.equal(fixture.store.get('cflag:3:501'), 1, ':106 CFLAG:501 侵入阶层');
  assert.equal(fixture.store.get('cflag:3:502'), 0, ':107 CFLAG:502 侵攻度');
  assert.equal(fixture.store.get('cflag:3:1'), 2, ':108 CFLAG:1 = 2 侵攻中');
  assert.equal(fixture.store.get('base:3:0'), 30, ':119 BASE:0 = MAXBASE:0');
  assert.equal(fixture.store.get('base:3:1'), 20, ':120 BASE:1 = MAXBASE:1');
});

test('FLAG:77 关：不压等级、不清战斗经验（:109 的两侧）', () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:76', 30);
  fixture.store.set('flag:77', 0);
  fixture.store.set('cflag:0:9', 50); // MASTER 等级，用于确认没人被动过
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
  assert.equal(
    fixture.store.get('cflag:3:9'),
    7,
    ':111 未执行——等级是记录里的 7',
  );
  assert.equal(fixture.store.get('exp:3:80'), 123, ':112 未执行——战斗经验保留');
});

test('FLAG:77 开：压到 1 级、战斗经验清零（:110-114）', () => {
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
  assert.equal(fixture.store.get('cflag:3:9'), 1, ':111 CFLAG:9 压到 1');
  assert.equal(fixture.store.get('exp:3:80'), 0, ':112 EXP:80 清零');
});

test('FLAG:77 开且 FLAG:60 > 0：逐级 ST_UP 恰好 2 次（:115 REPEAT FLAG:60）', () => {
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

  // ST_UP 每次至少 +1 级，随机源恒 0 → 攻 +1、无百日补强（day_count = 0）
  chara_make_inport(always);
  assert.equal(fixture.store.get('cflag:3:9'), 3, '1 + 2 次 ST_UP = 3 级');
  assert.equal(
    fixture.store.get('cflag:3:13'),
    4,
    '基础攻击每次 +2（:45 与 :48）',
  );
});

test('FLAG:77 开但 FLAG:60 == 0：一次 ST_UP 都不做（:113 的两侧）', () => {
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
  assert.equal(fixture.store.get('cflag:3:13'), undefined, '未调 ST_UP');
});

test('身体数据未生成时调用 CHAR_BODY_GENERATE_WAPPED（:123-124 的两侧）', () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:76', 30);
  fixture.store.set('flag:5', 1 << 12); // FLAG:5 位 12：身体数据生成开关
  seed_roster(fixture, [
    inport_record({ stamp: 11, no: 3, level: 7, nickname: '甲' }), // CFLAG:451 = 0
  ]);
  seed_preset(fixture, 3);
  const { chara_make_inport } = load(fixture);

  chara_make_inport(always);
  assert.notEqual(
    fixture.store.get('cflag:3:451'),
    0,
    '年龄已由 CHAR_BODY_GENERATE_WAPPED 写入',
  );

  // CFLAG:451 != 0 → 不再调用（这一侧的判据是「已有身体数据」）
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

test('目标预设不存在时不写进不存在的桶（有意偏离，见文件头二）', () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:76', 30);
  seed_roster(fixture, [
    inport_record({ stamp: 11, no: 999, level: 5, nickname: '幽灵' }),
  ]);
  // 不 seed_preset(999)：引擎的 addCharacter 对无预设的号返回 false
  const { chara_make_inport } = load(fixture);

  assert.equal(chara_make_inport(always), 0, '建不出来就 RETURN 0');
  assert.deepEqual(fixture.chara_no, [], '未建角色');
  assert.equal(
    fixture.store.get('cflag:999:501'),
    undefined,
    '未往幽灵号写任何值',
  );
});

// —— 转发层判定式（CHAR_MAKE.ERB:27-34） ——

test('转发层 @CHAR_MAKE_INPORT：RAND(ARG:0) != 0 即 RETURN 0（:31-32）', async () => {
  const fixture = create_era_fixture();
  const forward = load_forward(fixture);
  assert.equal(await forward.char_make_inport(5, never), 0, '掷不中：非异国');
});

test('转发层 @CHAR_MAKE_INPORT：掷中后进真身，FLAG:76 未设时真身早退（:34）', async () => {
  const fixture = create_era_fixture();
  seed_roster(fixture, [
    inport_record({ stamp: 11, no: 3, level: 5, nickname: '甲' }),
  ]);
  seed_preset(fixture, 3);
  const forward = load_forward(fixture);
  // 缺省 ARG:0 = 1：RAND(1) 恒 0 必成功；FLAG:76 = 0 → 真身 RETURN 0
  assert.equal(
    await forward.char_make_inport(undefined, always),
    0,
    '掷中后由真身判定，真身早退仍是 0',
  );
});

test('转发层 @CHAR_MAKE_INPORT：掷中且名单可用的记录 → 返回新角色号（:34）', async () => {
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
    '真身 RETURN CHARA',
  );
  assert.deepEqual(fixture.chara_no, [3], '角色已建立');
});

test('转发层 @CHAR_MAKE_INPORT 的随机源透传（:31 与真身共用同一支）', async () => {
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
    return n === 2 ? 1 : 0; // 判定式 RAND(1) 恒取 0；候选掷 RAND:2 取 1
  };
  assert.equal(await forward.char_make_inport(1, spy), 4, '第二个候选中选');
  assert.deepEqual(calls, [1, 2], '两次掷骰：判定式 RAND(ARG:0) 与候选 RAND');
});

test('第 99 槽（名单末位）也是候选（:15 的 100 格）', () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:76', 30);
  const records = new Array(99).fill('');
  records.push(inport_record({ stamp: 11, no: 3, level: 5, nickname: '甲' }));
  seed_roster(fixture, records);
  seed_preset(fixture, 3);
  const { chara_make_inport } = load(fixture);

  assert.equal(chara_make_inport(always), 3, '末位槽的勇者能被抽到');
});

test('FLAG:76 == 0 且记录等级也是 0 时仍然早退（:9 的 `<= 0` 不是 `< 0`）', () => {
  const fixture = create_era_fixture();
  // flag:76 缺省 0：等级 0 的记录能过 :19 的等级判据，早退只能由 :9 兜住
  seed_roster(fixture, [
    inport_record({ stamp: 11, no: 3, level: 0, nickname: '甲' }),
  ]);
  seed_preset(fixture, 3);
  const { chara_make_inport } = load(fixture);

  assert.equal(chara_make_inport(always), 0, '早退 RETURN 0');
  assert.deepEqual(fixture.chara_no, [], '未建角色');
});
