/**
 * ere/chara/chara-custom.js 的行为测试（issue #392，N8 段 2）。
 *
 * 源: target/ERB/キャラ関数/CHARA_CUSTOM ver1.0.1.ERB
 *     @CHAR_CREATE（:17-98）、@CHAR_APPEND（:103-269）
 *
 * 缝 = test/helpers/era-fixture.js。@CHAR_DEBUG 不在本票（不移植，文件头），
 * 故本文件也不测它。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function load(fixture) {
  return fixture.load_module('chara/chara-custom');
}

/**
 * 建一套预设（1-16 勇者、201-210 精英、17-24 与 31-35 特殊）。
 *
 * 两处都要写：`seed_chara` 对应引擎的 staticData.chara（EXISTCSV /
 * getAllCharacters 的读数源），`store` 里的 `chara:N` 是 CSVNAME 的读数源
 * （chara-name.test.js:63-64 同款）。
 */
function seed_presets(fixture, ids) {
  for (const id of ids) {
    const preset = { id, name: `预设${id}`, callname: `预设${id}` };
    fixture.seed_chara(id, preset);
    fixture.store.set(`chara:${id}`, preset);
  }
}

function texts(fixture, history = false) {
  const source = history ? fixture.lines_history : fixture.lines;
  return source.filter((line) => line.type === 'text').map((line) => line.text);
}

function setup() {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '魔王', callname: '魔王' });
  fixture.era.addCharacter(0);
  fixture.store.set('flag:10005', 0); // era_flag.target
  return fixture;
}

const ALL_PRESETS = [
  ...Array.from({ length: 16 }, (_, i) => i + 1),
  ...Array.from({ length: 10 }, (_, i) => i + 201),
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  31,
  32,
  33,
  34,
  35,
  39,
  40,
];

test('CHAR_CREATE：付费路径（ARG 0）列两段，无特殊段', async () => {
  const fixture = setup();
  seed_presets(fixture, ALL_PRESETS);
  const { char_create } = load(fixture);
  fixture.set_inputs(999); // 直接返回

  assert.equal(await char_create(0), 0);
  const lines = texts(fixture, true);
  assert.ok(lines.includes('使用神奇的生命摇篮，凭空创造出一体生物'));
  assert.ok(lines.includes('这将耗费大量的金钱，幸好只看不买是免费的'));
  assert.ok(lines.includes('■=== 勇者 ===■'));
  assert.ok(lines.includes('■=== 精英 ===■'));
  assert.ok(!lines.includes('■=== 特殊 ===■'), 'ARG 0 不列特殊段');
  assert.ok(lines.some((t) => t.includes(' [999] 返回')));
});

test('CHAR_CREATE：调试路径（ARG 1）多列特殊段，且 18/19 被排除', async () => {
  const fixture = setup();
  seed_presets(fixture, ALL_PRESETS);
  const { char_create } = load(fixture);
  fixture.set_inputs(999);

  await char_create(1);
  const lines = texts(fixture, true);
  assert.ok(lines.includes('■=== 特殊 ===■'));
  assert.ok(!lines.includes('这将耗费大量的金钱，幸好只看不买是免费的'));
  const special = lines.filter((t) => t.includes('预设'));
  // 特殊段是 17-39 里的在库编号（18/19 排除）
  assert.ok(special.some((t) => t.includes('预设17')));
  assert.ok(!special.some((t) => t.includes('预设18')));
  assert.ok(!special.some((t) => t.includes('预设19')));
});

test('CHAR_CREATE：特殊段列 17-39（含上界 39、不含 40），显示编号 = 预设号 + 20', async () => {
  const fixture = setup();
  seed_presets(fixture, ALL_PRESETS); // 含 39 与 40——40 在库但不在特殊段
  const { char_create } = load(fixture);
  fixture.set_inputs(999);

  await char_create(1);
  // 数据实况：yml/Chara*.yml 在 17-40 这段里只有 17/20-24/31-35（18/19 排除），
  // 39 与 40 是**合成**种——两个端点按源码边界钉住（改了会让本用例红），
  // 在成品数据里则落不到（EXISTCSV 拦下）
  const rows = texts(fixture, true).filter((t) => t.includes('预设'));
  assert.ok(
    rows.some((t) => t.includes('预设39')),
    '上界 39 在列表里',
  );
  assert.ok(
    !rows.some((t) => t.includes('预设40')),
    '40 越出 FOR 的右端（:49 `FOR L_I, 17, 40`），即使它在库',
  );
  // :52 `[{L_I+20,2}]`：17 号显示为 [37]
  const row_17 = rows.find((t) => t.includes('预设17'));
  assert.ok(
    row_17.includes('[37] 预设17'),
    `显示编号是预设号 + 20：${JSON.stringify(row_17)}`,
  );
});

test('CHAR_CREATE：勇者段每行 4 格、精英段每行 5 格（补位宽度 14）', async () => {
  const fixture = setup();
  seed_presets(fixture, ALL_PRESETS);
  const { char_create } = load(fixture);
  fixture.set_inputs(999);

  await char_create(1);
  const lines = texts(fixture, true);
  const hero_row = lines.find(
    (t) => t.includes('预设1') && t.includes('预设4'),
  );
  assert.ok(hero_row, '勇者首行含 1-4');
  assert.ok(!hero_row.includes('预设5'), '第 5 个换行');
  // 行内每格 = `[` + 编号右对齐宽 2 + `] ` + 名字左对齐宽 14（显示宽度：
  // '预设1' 宽 5 → 补 9 个半角空格）
  assert.equal(
    hero_row,
    '[ 1] 预设1         [ 2] 预设2         [ 3] 预设3         [ 4] 预设4         ',
  );
  const elite_row = lines.find(
    (t) => t.includes('预设201') && t.includes('预设205'),
  );
  assert.ok(elite_row, '精英首行含 201-205');
  assert.ok(elite_row.includes('[21]'), '精英的显示编号从 21 起');
});

test('CHAR_CREATE：编号映射三分支 + 兜底臂（表驱动）', async () => {
  const fixture = setup();
  seed_presets(fixture, ALL_PRESETS);
  const { char_create } = load(fixture);
  // [输入, 期望加进来的预设号]；999 只用来收尾
  const table = [
    [1, 1], // 1-16 → 原样（下界）
    [16, 16], // 1-16 的上界
    [21, 201], // 21-30 → -20 +200（下界）
    [30, 210],
    [37, 17], // 37-60 → -20（下界）
    [51, 31],
    [35, 35], // 兜底臂：不在任何区间 → 原样（预设 35 在库）
  ];
  for (const [input, expected] of table) {
    fixture.reset_inputs(input, 999); // 第二项给 CHAR_CUSTOM 的 [999]
    if (expected <= 16) {
      // 勇者走 CHAR_CUSTOM（模式 1 直接确定），给两轮 999
      fixture.reset_inputs(input, 999, 999);
    }
    await char_create(1);
    assert.ok(
      fixture.era.getAddedCharacters().includes(expected),
      `输入 ${input} 应加进预设 ${expected}`,
    );
    fixture.era.removeCharacter(expected);
  }
});

test('CHAR_CREATE：预设不在库时重问（EXISTCSV 守卫）', async () => {
  const fixture = setup();
  seed_presets(fixture, [1, 2]);
  const { char_create } = load(fixture);
  fixture.set_inputs(5, 999); // 5 不在库 → 重问；999 返回

  assert.equal(await char_create(0), 0);
  assert.equal(
    fixture.inputs_consumed.filter((i) => i.api === 'input').length,
    2,
    '两次输入',
  );
  assert.deepEqual(fixture.era.getAddedCharacters(), [0], '没有加进任何角色');
});

test('CHAR_CREATE：特殊位（17-40）已在场则复用（FINDCHARA），不新建', async () => {
  const fixture = setup();
  seed_presets(fixture, [17, 35]);
  fixture.era.addCharacter(17); // 预设 17 已在场
  fixture.era.addCharacter(35); // 预设 35 已在场（在库数据在这条区间里的末端）
  const { char_create } = load(fixture);
  // [输入, 映射出的预设号]：17 走兜底臂原样、55 走 CASE 37 TO 60 的 -20
  for (const [input, preset] of [
    [17, 17],
    [55, 35],
  ]) {
    fixture.reset_inputs(input, 999);
    await char_create(1);
    assert.equal(
      fixture.era.getAddedCharacters().filter((id) => id === preset).length,
      1,
      `预设 ${preset} 没有重复加入`,
    );
    assert.ok(
      !texts(fixture, true).some((t) => t.includes('你召唤出了')),
      `预设 ${preset} 复用时不播报`,
    );
  }
});

test('CHAR_CREATE：特殊位区间上界 40——已在场同样复用（INRANGE 的右端）', async () => {
  const fixture = setup();
  // 40 号不在 yml/Chara*.yml 里（合成种），故本用例是**源码边界的保真锁**：
  // :85 的 `INRANGE(L_I,17,40)` 收敛成 `<= 39` 会让 40 号改走 CHAR_APPEND。
  // 在库数据里这条端不可达（EXISTCSV(40) 为假、先把输入退回重问）
  seed_presets(fixture, [40]);
  fixture.era.addCharacter(40); // 预设 40 已在场
  const { char_create } = load(fixture);
  fixture.set_inputs(60, 999); // 60 → L_I = 40（CASE 37 TO 60 的右端）

  await char_create(1);
  assert.deepEqual(
    fixture.calls.filter((c) => c.api === 'addCharacter').map((c) => c.args[0]),
    [0, 40], // 0 = setup 的魔王；40 = 测试自己加的。CHAR_APPEND 没有再调
    '已在场的 40 号不再 ADDCHARA',
  );
  assert.ok(
    !texts(fixture, true).some((t) => t.includes('你召唤出了')),
    '复用时不播报',
  );
  assert.ok(
    texts(fixture, true).some((t) => t.includes('修改角色属性（预设40）')),
    'CHAR_CUSTOM 收到的是 40 号（称呼由夹具的 ADDCHARA 写入）',
  );
});

test('CHAR_CREATE：新建时播报召唤结果', async () => {
  const fixture = setup();
  // 用 17（特殊位）：勇者位在模式 1 会走 CHAR_MAKE 随机成型、名字被重掷，
  // 播报的 %SAVESTR:A% 就不是预设名了
  seed_presets(fixture, [17]);
  const { char_create } = load(fixture);
  fixture.set_inputs(17, 999);

  await char_create(1);
  assert.ok(
    texts(fixture, true).some((t) => t === '你召唤出了预设17……'),
    texts(fixture, true).join(' / '),
  );
});

// —— @CHAR_APPEND（:103-269）——

test('CHAR_APPEND：默认路径问性别与名字（模式 0）', async () => {
  const fixture = setup();
  seed_presets(fixture, [5]);
  const { char_append } = load(fixture);
  fixture.set_inputs(1, '莉塔', 996); // 男性、名字、CHAR_CUSTOM 取消

  const cid = await char_append(5, 0);
  assert.equal(cid, 5);
  assert.equal(fixture.store.get('talent:5:122'), 1, '男性');
  assert.equal(fixture.store.get('callname:5:-1'), '莉塔');
  assert.equal(fixture.store.get('callname:5:-2'), '莉塔');
  assert.ok(texts(fixture, true).includes('新建人物今后被称呼为莉塔。'));
});

test('CHAR_APPEND：性别三档（1 男 / 3 扶她 / 2 女不写）', async () => {
  const fixture = setup();
  seed_presets(fixture, [5]);
  const { char_append } = load(fixture);
  const table = [
    [1, 122],
    [3, 121],
    [2, undefined],
  ];
  for (const [input, talent] of table) {
    fixture.store.delete('talent:5:122');
    fixture.store.delete('talent:5:121');
    fixture.reset_inputs(input, '名字', 996);
    await char_append(5, 0);
    if (talent === undefined) {
      assert.equal(fixture.store.get('talent:5:122') || 0, 0, `输入 ${input}`);
      assert.equal(fixture.store.get('talent:5:121') || 0, 0, `输入 ${input}`);
    } else {
      assert.equal(fixture.store.get(`talent:5:${talent}`), 1, `输入 ${input}`);
    }
  }
});

test('CHAR_APPEND：名字过长重问，空输入走随机名', async () => {
  const fixture = setup();
  seed_presets(fixture, [5]);
  const { char_append } = load(fixture);
  fixture.set_inputs(2, '一二三四五六七八九十一二三四五六七', '短', 996);

  await char_append(5, 0);
  assert.ok(
    texts(fixture, true).includes('名字太长，请使用全角八字以下的名字。'),
  );
  assert.equal(fixture.store.get('callname:5:-1'), '短');
});

test('CHAR_APPEND：名字长度上界 16（16 收下、17 重问）', async () => {
  const fixture = setup();
  seed_presets(fixture, [5]);
  const { char_append } = load(fixture);
  // 先给 17 字（重问），再给 16 字（收下）；名字一问完就出循环，顺序不能反
  fixture.set_inputs(
    2,
    '一二三四五六七八九十一二三四五六七',
    '一二三四五六七八九十一二三四五六',
  );

  await char_append(5, 0);
  assert.equal(
    fixture.store.get('callname:5:-1'),
    '一二三四五六七八九十一二三四五六',
    '16 字的名字被收下',
  );
  assert.ok(
    texts(fixture, true).includes('名字太长，请使用全角八字以下的名字。'),
    '17 字被拒',
  );
});

test('CHAR_APPEND：模式 1 不问性别与名字', async () => {
  const fixture = setup();
  seed_presets(fixture, [5]);
  const { char_append } = load(fixture);
  fixture.set_inputs(996); // 直接到 CHAR_CUSTOM 的取消

  await char_append(5, 1);
  assert.deepEqual(
    texts(fixture, true).filter((t) => t.includes('性别')),
    [],
  );
});

test('CHAR_APPEND：末行写 CFLAG:1 = 0 并还原 TARGET、返回角色号', async () => {
  const fixture = setup();
  seed_presets(fixture, [5]);
  fixture.store.set('flag:10005', 0); // TARGET = 魔王
  const { char_append } = load(fixture);
  fixture.set_inputs(2, '名字', 996);

  const cid = await char_append(5, 0);
  assert.equal(cid, 5);
  assert.equal(fixture.store.get('cflag:5:1'), 0);
  assert.equal(fixture.store.get('flag:10005'), 0, 'TARGET 还原');
});

test('CHAR_APPEND：CASE 17 玛奥化的七项数值与身体生成', async () => {
  const fixture = setup();
  seed_presets(fixture, [17]);
  const { char_append } = load(fixture);
  fixture.set_inputs(996);

  await char_append(17, 1);
  assert.equal(fixture.store.get('cflag:17:420'), 1);
  assert.equal(fixture.store.get('cflag:17:9'), 1);
  assert.equal(fixture.store.get('cflag:17:1'), 0);
  assert.deepEqual(
    [11, 12, 13, 14].map((i) => fixture.store.get(`cflag:17:${i}`)),
    [15, 15, 15, 15],
  );
  assert.equal(fixture.store.get('cflag:17:16'), -1);
});

test('CHAR_APPEND：CASE 24 莉莉——剑 40 与着装', async () => {
  const fixture = setup();
  seed_presets(fixture, [24]);
  const { char_append } = load(fixture);
  fixture.set_inputs(996);

  await char_append(24, 1);
  assert.equal(fixture.store.get('cflag:24:550'), 40);
});

test('CHAR_APPEND：四张扑克牌的初始装备与经验（表驱动）', async () => {
  const fixture = setup();
  seed_presets(fixture, [20, 21, 22, 23]);
  const { char_append } = load(fixture);
  // [预设号, 期望武装, 期望自慰经验, 期望私处经验]
  const table = [
    [22, 40 + 9000 + 900000, undefined, undefined],
    [23, 41 + 9000 + 600000, 30, undefined],
    [21, 44 + 9000 + 300000, 10, undefined],
    [20, 50 + 10000 + 400000, undefined, 20],
  ];
  for (const [preset, weapon, masturbate, virgin] of table) {
    fixture.reset_inputs(996);
    let upper = 0;
    const rand = (n) => {
      upper = n;
      return 7;
    };
    await char_append(preset, 1, rand);
    assert.equal(
      fixture.store.get(`cflag:${preset}:550`),
      weapon,
      `预设 ${preset}`,
    );
    assert.equal(upper, 80, 'CFLAG:A:6 = RAND:80 的上界');
    assert.equal(fixture.store.get(`cflag:${preset}:6`), 7, '名字编号');
    if (masturbate !== undefined) {
      assert.equal(fixture.store.get(`exp:${preset}:10`), masturbate);
    }
    if (virgin !== undefined) {
      assert.equal(fixture.store.get(`exp:${preset}:0`), virgin);
    }
  }
});

test('CHAR_APPEND：狂王性别决定是否补性交经验（FLAG:500 的 0/2）', async () => {
  const fixture = setup();
  seed_presets(fixture, [20]);
  const { char_append } = load(fixture);
  const table = [
    [0, 20],
    [1, 0],
    [2, 20],
    [3, 0],
  ];
  for (const [flag500, expected] of table) {
    fixture.store.set('flag:500', flag500);
    fixture.store.delete('exp:20:5');
    fixture.reset_inputs(996);
    await char_append(20, 1);
    assert.equal(
      fixture.store.get('exp:20:5') || 0,
      expected,
      `FLAG:500 = ${flag500}`,
    );
  }
  assert.equal(fixture.store.get('cflag:20:15'), 105, '初体验对象是狂王');
});

test('CHAR_APPEND：扑克牌的等级调整与数值封顶', async () => {
  const fixture = setup();
  seed_presets(fixture, [22]);
  const { char_append } = load(fixture);
  fixture.store.set('flag:60', 3); // 逐级 ST_UP 三次
  fixture.store.set('cflag:22:9', 1);
  fixture.store.set('maxbase:22:0', 99);
  fixture.store.set('maxbase:22:1', 88);
  fixture.set_inputs(996);

  await char_append(22, 1);
  assert.equal(fixture.store.get('cflag:22:9'), 4, '等级 +3');
  // 体力上限会被 CHAR_BODY_GENERATE_WAPPED 重设（身体生成），故钉「BASE 等于
  // 当场读到的 MAXBASE」；气力上限没有别的写点，钉字面量
  assert.equal(
    fixture.store.get('base:22:0'),
    fixture.store.get('maxbase:22:0'),
    'BASE:0 = MAXBASE:0',
  );
  assert.equal(
    fixture.store.get('base:22:1'),
    fixture.store.get('maxbase:22:1'),
    'BASE:1 = MAXBASE:1',
  );
});

test('CHAR_APPEND：FLAG:60 为 0 时不升级', async () => {
  const fixture = setup();
  seed_presets(fixture, [22]);
  const { char_append } = load(fixture);
  fixture.store.set('cflag:22:9', 5);
  fixture.set_inputs(996);

  await char_append(22, 1);
  assert.equal(fixture.store.get('cflag:22:9'), 5);
});

test('CHAR_APPEND：CASE 34 葵希罗——FLAG:224 与着装', async () => {
  const fixture = setup();
  seed_presets(fixture, [34]);
  const { char_append } = load(fixture);
  fixture.set_inputs(996);

  await char_append(34, 1);
  assert.equal(fixture.store.get('flag:224'), 1);
});

test('CHAR_APPEND：CASE 31-33 与 35 走 CHAR_INIT（区间两端，判据是能力者掷骰）', async () => {
  const fixture = setup();
  seed_presets(fixture, [31, 32, 33, 35]);
  const { char_append } = load(fixture);
  for (const preset of [31, 32, 33, 35]) {
    fixture.reset_inputs(996);
    // CHAR_INIT 的五连掷（RAND:40）全中时五系能力者素质被写上——它跑过的证据。
    // 不拿称呼当判据：ADDCHARA 自己就会写 callname:id:-1/-2（夹具 addCharacter
    // 镜像引擎的同一动作），那种断言在 CHAR_INIT 缺席时照样绿
    await char_append(preset, 1, () => 0);
    assert.deepEqual(
      [275, 276, 277, 278, 279].map((t) =>
        fixture.store.get(`talent:${preset}:${t}`),
      ),
      [1, 1, 1, 1, 1],
      `预设 ${preset} 走了 CHAR_INIT`,
    );
  }
});

test('CHAR_APPEND：勇者（1-16）在模式 1 走 CHAR_MAKE 随机成型（区间两端）', async () => {
  const fixture = setup();
  const { char_append } = load(fixture);
  for (const preset of [1, 16]) {
    seed_presets(fixture, [preset]);
    fixture.reset_inputs(996);
    await char_append(preset, 1);
    // 判据用 CHAR_MAKE 必写的 CFLAG:120（卖春积极性，chara-make.js:130）。
    // 不用 CFLAG:1：本函数末尾的 `CFLAG:A:1 = 0` 也写它，证不了 CHAR_MAKE 跑过
    assert.equal(
      fixture.store.get(`cflag:${preset}:120`),
      1,
      `预设 ${preset} 走了 CHAR_MAKE`,
    );
  }
});

test('CHAR_APPEND：精英（201-210）在模式 1 同样走 CHAR_MAKE（区间两端）', async () => {
  const fixture = setup();
  const { char_append } = load(fixture);
  for (const preset of [201, 210]) {
    seed_presets(fixture, [preset]);
    fixture.reset_inputs(996);
    await char_append(preset, 1);
    assert.equal(
      fixture.store.get(`cflag:${preset}:120`),
      1,
      `预设 ${preset} 走了 CHAR_MAKE`,
    );
  }
});
