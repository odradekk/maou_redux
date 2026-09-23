/**
 * ere/page/page-config-age.js 的行为测试（issue #547：设置页的年龄/三围
 * 子菜单与种族年龄编辑器）。
 *
 * 源: target/ERB/キャラ関数/CHARA_BODY.ERB  @CONFIG_AGE_SETTING（:853-929）、
 *       @RACE_CONFIG（:931-1333）；入口 SYSTEM/CONFIG.ERB:224（设置页 [15]，
 * dispatch_config 的接线在 test/page-config.test.js）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点，issue #16）。随机源
 * 一律显式注入确定序列（#344）；种族年龄表按 #138 的数组承载预置。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

/** RAND:N 恒 0 的随机源 */
const always = () => 0;

function load(fixture) {
  return fixture.load_module('page/page-config-age');
}

const RACE_TABLE_0 = [11, 115, 431, 325, 15, 232];
const RACE_TABLE_1 = [1, 1];

function seed_race_table(fixture) {
  fixture.store.set('flag:26', [...RACE_TABLE_0]); // FLAG:26 槽 0-5
  fixture.store.set('flag:27', [...RACE_TABLE_1]); // FLAG:27 槽 6-7
}

/**
 * 渲染历史里全部按钮条目 [accelerator, text] 的列表。用列表不用 Map：加速键
 * 会跨阶段复用（顶层种族行与编辑循环的数字网格共用 0-31），Map 后写覆盖
 * 先写，网格按钮会被后续重绘的种族行吞掉。
 */
function button_entries(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'button')
    .map((line) => [line.accelerator, line.text]);
}

/** 指定加速键的全部按钮正文 */
function texts_of(fixture, accelerator) {
  return button_entries(fixture)
    .filter(([acc]) => acc === accelerator)
    .map(([, text]) => text);
}

// —— @CONFIG_AGE_SETTING（:853-929）：年龄/三围显示开关 ——

test('CONFIG_AGE_SETTING 菜单：[0]-[3] 恒渲染，[9] 只在位 13（使用种族年龄）开时渲染', async () => {
  const fixture = create_era_fixture();
  const { config_age_setting } = load(fixture);
  seed_race_table(fixture);

  fixture.set_inputs(100);
  await config_age_setting(always);
  const accelerators = new Set(button_entries(fixture).map(([acc]) => acc));
  assert.ok(accelerators.has(0));
  assert.ok(accelerators.has(1));
  assert.ok(accelerators.has(2));
  assert.ok(accelerators.has(3));
  assert.ok(!accelerators.has(9), '位 13 关：[9] 不渲染（原作 :865-866）');
  // 四个开关的初始状态文案（flag:5 未设 → 全 OFF）
  assert.ok(
    texts_of(fixture, 0).some((t) => t.includes('OFF')),
    '年龄显示初始 OFF',
  );
  assert.ok(
    texts_of(fixture, 1).some((t) => t.includes('OFF')),
    '种族年龄初始 OFF',
  );

  const fixture2 = create_era_fixture();
  const { config_age_setting: again } = load(fixture2);
  seed_race_table(fixture2);
  fixture2.store.set('flag:5', 2 ** 13);
  // 位 13 单开（位 12 关）：[9] 立即渲染且种族年龄文案 ON——与位 12 区分（:865-866）
  fixture2.set_inputs(100);
  await again(always);
  assert.ok(
    new Set(button_entries(fixture2).map(([acc]) => acc)).has(9),
    '位 13 开：[9] 渲染',
  );
  assert.ok(
    texts_of(fixture2, 1).some((t) => t.includes('ON')),
    '位 13 开：种族年龄 ON',
  );
  assert.ok(
    !texts_of(fixture2, 0).some((t) => t.includes('ON')),
    '位 12 关：年龄显示 OFF',
  );

  const fixture3 = create_era_fixture();
  const { config_age_setting: third } = load(fixture3);
  seed_race_table(fixture3);
  fixture3.store.set('flag:5', 2 ** 12); // 只开位 12（年龄显示），[9] 门在位 13
  fixture3.set_inputs(100);
  await third(always);
  assert.ok(
    !new Set(button_entries(fixture3).map(([acc]) => acc)).has(9),
    '位 12 单开：[9] 不渲染',
  );
});

test('CONFIG_AGE_SETTING：[0]/[1]/[2]/[3] 分别翻 FLAG:5 位 12/13/14/15', async () => {
  for (const [local, bit] of [
    [0, 12],
    [1, 13],
    [2, 14],
    [3, 15],
  ]) {
    const fixture = create_era_fixture();
    const { config_age_setting } = load(fixture);
    seed_race_table(fixture);
    fixture.set_inputs(local, 100);
    await config_age_setting(always);
    assert.equal(
      fixture.store.get('flag:5'),
      2 ** bit,
      `LOCAL==${local} 翻位 ${bit}`,
    );
  }
});

test('CONFIG_AGE_SETTING [9]：种族年龄表未设时先播种默认表，再进 RACE_CONFIG', async () => {
  const fixture = create_era_fixture();
  const { config_age_setting } = load(fixture);
  fixture.store.set('flag:5', 2 ** 13);
  // [9] 进 RACE_CONFIG（表已由本分支播种），种族选择 [100] 直接退出回到年龄菜单，
  // 再 [100] 退出（位 12/15 全关，退出块不动）
  fixture.set_inputs(9, 100, 100);
  await config_age_setting(always);

  assert.deepEqual(
    fixture.store.get('flag:26'),
    RACE_TABLE_0,
    ':889-892 先播种',
  );
  assert.deepEqual(fixture.store.get('flag:27'), RACE_TABLE_1);
  // RACE_CONFIG 顶层真的渲染过（八种族行）
  assert.ok(texts_of(fixture, 0).some((text) => text.includes('精灵')));
  assert.ok(texts_of(fixture, 7).some((text) => text.includes('矮人')));
});

test('CONFIG_AGE_SETTING 退出块：位 12 开时为 CFLAG:451==0 的角色生成身体数据', async () => {
  const fixture = create_era_fixture();
  const { config_age_setting } = load(fixture);
  seed_race_table(fixture);
  fixture.store.set('flag:5', 2 ** 12);
  fixture.seed_chara(21, { id: 21, name: '村娘A', callname: '村娘A' });
  fixture.era.addCharacter(21);
  fixture.store.set('talent:21:165', 1); // 村娘Ａ → RAND:5 + 11
  fixture.set_inputs(100);
  await config_age_setting((n) => (n === 5 ? 4 : 0)); // RAND:5 = 4 → 年龄 15

  // 对照组：同一世界直调 char_size_generate（三围算法本体在
  // test/chara-body.test.js 覆盖，这里只核对接线与年龄实参）
  const control = create_era_fixture();
  seed_race_table(control);
  control.seed_chara(21, { id: 21, name: '村娘A', callname: '村娘A' });
  control.era.addCharacter(21);
  control.store.set('talent:21:165', 1);
  const expected = control
    .load_module('chara/chara-body')
    .char_size_generate(21, 15, 0, always);
  assert.equal(expected[0], 15, '村娘Ａ 年龄 = RAND:5 + 11');
  for (let offset = 0; offset < 7; offset += 1) {
    assert.equal(
      fixture.store.get(`cflag:21:${451 + offset}`),
      expected[offset],
      `CFLAG:${451 + offset} 接住 RESULT:${offset}（:920-926）`,
    );
  }
});

test('CONFIG_AGE_SETTING 退出块：村娘Ｂ RAND:5 + 14，普通角色年龄交回生成', async () => {
  const fixture = create_era_fixture();
  const { config_age_setting } = load(fixture);
  seed_race_table(fixture);
  fixture.store.set('flag:5', 2 ** 15); // 位 15（显示三围）同样触发退出块
  fixture.seed_chara(22, { id: 22, name: '村娘B', callname: '村娘B' });
  fixture.era.addCharacter(22);
  fixture.store.set('talent:22:171', 1); // 村娘Ｂ
  fixture.set_inputs(100);
  await config_age_setting((n) => (n === 5 ? 1 : 0)); // RAND:5 = 1 → 年龄 15
  assert.equal(
    fixture.store.get('cflag:22:451'),
    15,
    '村娘Ｂ 年龄 = RAND:5 + 14',
  );

  // 普通角色：不带村娘标记 → 年龄 0 交回 CHAR_SIZE_GENERATE 的年龄生成
  const fixture2 = create_era_fixture();
  const { config_age_setting: again } = load(fixture2);
  seed_race_table(fixture2);
  fixture2.store.set('flag:5', 2 ** 12);
  fixture2.seed_chara(23, { id: 23, name: '路人', callname: '路人' });
  fixture2.era.addCharacter(23);
  fixture2.set_inputs(100);
  await again(seq_first_only()); // CHAR_AGE_GENERATE 内部掷骰恒 0
  assert.equal(
    fixture2.store.get('cflag:23:451'),
    18,
    '无标记 → CHAR_AGE_GENERATE（处女 +1 的 18 岁，取点 0）',
  );
});

/** 首掷 7、后续恒 0 的随机源（CHAR_AGE_GENERATE 的取点掷骰） */
function seq_first_only() {
  let first = true;
  return () => {
    if (first) {
      first = false;
      return 7;
    }
    return 0;
  };
}

test('CONFIG_AGE_SETTING 退出块守卫：位 12/15 全关时不生成、不播种', async () => {
  const fixture = create_era_fixture();
  const { config_age_setting } = load(fixture);
  fixture.seed_chara(21, { id: 21, name: '村娘A', callname: '村娘A' });
  fixture.era.addCharacter(21);
  fixture.set_inputs(100);
  await config_age_setting(always);

  assert.equal(
    fixture.store.get('flag:26'),
    undefined,
    ':900 位 12/15 全关 → 不播种',
  );
  assert.equal(fixture.store.get('cflag:21:451'), undefined, '不生成身体数据');
});

test('CONFIG_AGE_SETTING 退出块：魔王（0）与已有 CFLAG:451 的角色跳过', async () => {
  const fixture = create_era_fixture();
  const { config_age_setting } = load(fixture);
  seed_race_table(fixture);
  fixture.store.set('flag:5', 2 ** 12);
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  fixture.seed_chara(24, { id: 24, name: '旧人', callname: '旧人' });
  fixture.era.addCharacter(24);
  fixture.store.set('cflag:24:451', 20); // 已有年龄 → 跳过
  fixture.set_inputs(100);
  await config_age_setting(always);

  assert.equal(
    fixture.store.get('cflag:0:451'),
    undefined,
    ':909-910 LCOUNT==0 跳过',
  );
  assert.equal(
    fixture.store.get('cflag:24:453'),
    undefined,
    ':911 CFLAG:451≠0 跳过',
  );
});

// —— @RACE_CONFIG（:931-1333）：种族年龄编辑器 ——

test('RACE_CONFIG 顶层：默认表下八个种族行的档位文案', async () => {
  const fixture = create_era_fixture();
  const { race_config } = load(fixture);
  seed_race_table(fixture);
  fixture.set_inputs(100);
  await race_config(always);

  const buttons = button_entries(fixture);
  // 槽 0 = 011（整数倍 1×10^1）
  assert.ok(
    texts_of(fixture, 0).some((t) => t.includes('精灵')),
    '种族名',
  );
  assert.ok(
    texts_of(fixture, 0).some((t) => t.includes('换算成人类年龄的  10 倍')),
    '整数倍档文案',
  );
  assert.ok(
    texts_of(fixture, 0).some((t) => t.includes(' 170 ～  179 岁')),
    '换算年龄区间',
  );
  // 槽 1 = 115（小数倍 1.5）
  assert.ok(
    texts_of(fixture, 1).some((t) => t.includes('换算成人类年龄的 1.5 倍')),
  );
  assert.ok(
    texts_of(fixture, 1).some((t) => t.includes('  25 岁')),
    '17×1.5 截断为 25',
  );
  // 槽 2 = 431（年龄～上限）
  assert.ok(
    texts_of(fixture, 2).some((t) => t.includes('年龄 ～ 1000 的随机范围')),
  );
  assert.ok(texts_of(fixture, 2).some((t) => t.includes('　17 ～ 1000 岁')));
  // 槽 3 = 325（上限/2～上限）
  assert.ok(
    texts_of(fixture, 3).some((t) => t.includes(' 250 ～  500 的随机范围')),
    'slot 3 = 325 的上限/2～上限档',
  );
  // 槽 4 = 015（整数倍 5×10^1）
  assert.ok(
    texts_of(fixture, 4).some((t) => t.includes('换算成人类年龄的  50 倍')),
  );
  assert.ok(texts_of(fixture, 4).some((t) => t.includes(' 850 ～  899 岁')));
  // 槽 5 = 232（0～上限）
  assert.ok(
    texts_of(fixture, 5).some((t) => t.includes('　 0 ～ 2000 的随机范围')),
  );
  // 槽 6/7 = 001（和人类一样）
  assert.ok(texts_of(fixture, 6).some((t) => t.includes('和人类一样')));
  assert.ok(texts_of(fixture, 6).some((t) => t.includes('　　　　　17 岁')));
  assert.ok(texts_of(fixture, 7).some((t) => t.includes('矮人')));
  // [98]/[99]/[100] 三个出口
  const accelerators = new Set(buttons.map(([acc]) => acc));
  assert.ok(accelerators.has(98));
  assert.ok(accelerators.has(99));
  assert.ok(accelerators.has(100));
});

test('RACE_CONFIG [98]：确认后整表回默认并直接返回（:1035-1048）', async () => {
  const fixture = create_era_fixture();
  const { race_config } = load(fixture);
  fixture.store.set('flag:26', [12, 115, 431, 325, 15, 232]);
  fixture.store.set('flag:27', [2, 2]);
  fixture.set_inputs(98, 0);
  await race_config(always);

  assert.deepEqual(
    fixture.store.get('flag:26'),
    RACE_TABLE_0,
    ':1043-1044 回默认',
  );
  assert.deepEqual(fixture.store.get('flag:27'), RACE_TABLE_1);
  // 确认页文案（:1036-1040）
  assert(
    fixture.text_lines().some((t) => t.includes('全种族的年龄均返回默认值。')),
    '确认页首行',
  );
  assert(
    fixture.text_lines().some((t) => t.includes('确认吗？')),
    '确认页询问行',
  );
});

test('RACE_CONFIG [98]：取消（[1]）回顶层不写表', async () => {
  const fixture = create_era_fixture();
  const { race_config } = load(fixture);
  const custom = [12, 115, 431, 325, 15, 232];
  fixture.store.set('flag:26', custom);
  fixture.store.set('flag:27', [2, 2]);
  fixture.set_inputs(98, 1, 100);
  await race_config(always);

  // 取消后回顶层、[100] 退出仍会打包（原作 [100] 分支），但 [98] 的「回默认」
  // 不执行：编辑态原样保留（引用换新是打包的正常行为，值不变）
  assert.deepEqual(
    fixture.store.get('flag:26'),
    [12, 115, 431, 325, 15, 232],
    '取消分支不回默认',
  );
  assert.deepEqual(fixture.store.get('flag:27'), [2, 2]);
});

test('RACE_CONFIG 编辑流：整数倍档位选择并 [999] 决定、[100] 打包写回', async () => {
  const fixture = create_era_fixture();
  const { race_config } = load(fixture);
  seed_race_table(fixture);
  // 选种族 0（精灵，当前 011 整数倍）→ [102] 整数倍 → 数值 12（2×10^1 = 20 倍）
  // → [999] 决定（回顶层）→ [100] 打包退出
  fixture.set_inputs(0, 102, 12, 999, 100);
  await race_config(always);

  const packed = fixture.store.get('flag:26');
  assert.equal(packed[0], 12, 'cla 0 / deg 1 / num 2 打包为 012');
  assert.deepEqual(packed.slice(1), RACE_TABLE_0.slice(1), '其余槽不动');
  assert.deepEqual(fixture.store.get('flag:27'), RACE_TABLE_1);
});

test('RACE_CONFIG 编辑流：[101] 和人类一样 → 槽位 001', async () => {
  const fixture = create_era_fixture();
  const { race_config } = load(fixture);
  seed_race_table(fixture);
  fixture.set_inputs(1, 101, 999, 100); // 狼人（115 小数倍）→ 和人类一样
  await race_config(always);

  assert.equal(fixture.store.get('flag:26')[1], 1);
});

test('RACE_CONFIG 编辑流：小数倍 [0]（0.0 倍，种族寿命 1 年以内）→ 槽位 100', async () => {
  const fixture = create_era_fixture();
  const { race_config } = load(fixture);
  seed_race_table(fixture);
  fixture.set_inputs(0, 103, 0, 999, 100);
  await race_config(always);

  assert.equal(fixture.store.get('flag:26')[0], 100, 'cla 1 / deg 0 / num 0');
});

test('RACE_CONFIG 编辑流：随机档 [104]+[112]+上限 25 → 槽位 425（:1295-1317）', async () => {
  const fixture = create_era_fixture();
  const { race_config } = load(fixture);
  seed_race_table(fixture);
  fixture.set_inputs(0, 104, 112, 25, 999, 100);
  await race_config(always);

  assert.equal(
    fixture.store.get('flag:26')[0],
    425,
    '下限=人类年龄 / 上限 500',
  );
});

test('RACE_CONFIG 编辑流：[110]（下限 0）与 [111]（上限 1/2）两档', async () => {
  for (const [lower, expect] of [
    [110, 221], // cla 2 / deg 2 / num 1 → 上限 100（n=21 → 1×10^2）
    [111, 325], // cla 3 / deg 2 / num 5 → 上限 500（n=25 → 5×10^2）
  ]) {
    const fixture = create_era_fixture();
    const { race_config } = load(fixture);
    seed_race_table(fixture);
    fixture.set_inputs(0, 104, lower, lower === 110 ? 21 : 25, 999, 100);
    await race_config(always);
    assert.equal(fixture.store.get('flag:26')[0], expect, `[${lower}] 档`);
  }
});

test('RACE_CONFIG 编辑页：和人类一样（DIS_FLAG -1）不打印任何网格（:1214 ELSEIF DIS_FLAG > 1）', async () => {
  const fixture = create_era_fixture();
  const { race_config } = load(fixture);
  seed_race_table(fixture);
  // 槽 6 霍比特人默认就是「和人类一样」（001）——旧实现进了 else 分支，
  // 可见按钮就能把 SET_VAR:0 写成 -1、写坏种族年龄表（#547 验收第 1 条）
  fixture.set_inputs(6, 100, 100);
  await race_config(always);

  const accelerators = new Set(button_entries(fixture).map(([acc]) => acc));
  assert.ok(!accelerators.has(110), '[110] 下限按钮不打印');
  assert.ok(!accelerators.has(21), '上限网格 21 不打印');
  assert.ok(
    !fixture.text_lines().some((t) => t.includes('■ 下限')),
    '「■ 下限」「■ 上限」两组标签都不出现（DIS_FLAG > 1 才有随机档网格）',
  );
  // 模式按钮照常——和人类一样档只留四个模式钮与决定/返回
  for (const key of [101, 102, 103, 104, 999, 100]) {
    assert.ok(accelerators.has(key), `按钮 ${key}`);
  }
});

test('RACE_CONFIG 编辑流：吸血鬼 [101]→[104]→[110]→[999] 保存为 231（[101] 不清 SET_VAR:4/5，:1279-1284）', async () => {
  const fixture = create_era_fixture();
  const { race_config } = load(fixture);
  seed_race_table(fixture);
  // 槽 2 吸血鬼是随机档 431。[101] 只设 DIS_FLAG 与 SET_VAR:0-3，
  // sv[4]/sv[5] 保留 3/1 → [110] 后 SET_VAR:4 > 0 成立，切回随机档存 231
  fixture.set_inputs(2, 101, 104, 110, 999, 100);
  await race_config(always);

  assert.equal(
    fixture.store.get('flag:26')[2],
    231,
    '下限 0 岁 + 原上限 1000 岁 → cla 2 / deg 3 / num 1（旧实现误存 001）',
  );
});

test('RACE_CONFIG 怪癖：[112] 在未选上限时不切算法档（SET_VAR:4 > 0 守卫，:1311-1317）', async () => {
  const fixture = create_era_fixture();
  const { race_config } = load(fixture);
  seed_race_table(fixture);
  // 从整数倍槽（SET_VAR:4 = -1）直接 [104]→[112]→[999]：SET_VAR:0 仍是 0，
  // [999] 按整数倍档保存 SET_VAR:1/2（原槽的 1/1）→ 槽位保持 011
  fixture.set_inputs(0, 104, 112, 999, 100);
  await race_config(always);

  assert.equal(
    fixture.store.get('flag:26')[0],
    11,
    '照原作：只按了下限、未选上限时不落随机档',
  );
});

test('RACE_CONFIG [99]：打包先于确认（取消也写回编辑态），确认后按新表重算全体种族年龄', async () => {
  const fixture = create_era_fixture();
  const { race_config } = load(fixture);
  seed_race_table(fixture);
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  fixture.seed_chara(21, { id: 21, name: '狼女', callname: '狼女' });
  fixture.era.addCharacter(21);
  fixture.store.set('talent:21:314', 2); // 人狼（种族编号 2）→ 槽 1
  fixture.store.set('cflag:21:451', 20); // 人类换算年龄 20
  fixture.store.set('cflag:0:451', 21);
  fixture.store.set('cflag:0:452', 999);

  // 编辑槽 1 为整数倍 20 倍（12），[999] 决定 → [99] 重算 → 确认 [0] → 回
  // 顶层 → [100] 退出
  fixture.set_inputs(1, 102, 12, 999, 99, 0, 100);
  await race_config(always);

  // 槽 1 = 012（20 倍）→ 种族年龄 = 20 × 20 + RAND:20（恒 0）
  assert.equal(
    fixture.store.get('flag:26')[1],
    12,
    ':1050-1057 打包（在确认前）',
  );
  assert.equal(
    fixture.store.get('cflag:21:452'),
    400,
    ':1071-1073 重算种族年龄',
  );
  assert.equal(fixture.store.get('cflag:0:452'), 999, ':1069-1070 魔王跳过');
});
test('RACE_CONFIG [99] 取消：表已打包（原作时序），但不算年龄、回顶层', async () => {
  const fixture = create_era_fixture();
  const { race_config } = load(fixture);
  seed_race_table(fixture);
  fixture.seed_chara(21, { id: 21, name: '狼女', callname: '狼女' });
  fixture.era.addCharacter(21);
  fixture.store.set('talent:21:314', 2); // 人狼（种族编号 2）→ 槽 1
  fixture.store.set('cflag:21:451', 20);

  fixture.set_inputs(1, 102, 12, 999, 99, 1, 100);
  await race_config(always);

  assert.equal(
    fixture.store.get('flag:26')[1],
    12,
    ':1050-1057 在确认 INPUT 之前',
  );
  assert.equal(fixture.store.get('cflag:21:452'), undefined, '取消不重算');
});

test('RACE_CONFIG 编辑循环 [100]：不保存 SET_VAR 直接回顶层（:1276-1277）', async () => {
  const fixture = create_era_fixture();
  const { race_config } = load(fixture);
  seed_race_table(fixture);
  // 选种族 0 → [102] → 数值 12（未 [999]）→ [100] 返回 → [100] 打包退出：
  // 编辑未决定，槽位保持 011
  fixture.set_inputs(0, 102, 12, 100, 100);
  await race_config(always);

  assert.equal(fixture.store.get('flag:26')[0], 11);
});

test('RACE_CONFIG 编辑循环的数字网格与模式按钮（DIS_FLAG 各档渲染）', async () => {
  const fixture = create_era_fixture();
  const { race_config } = load(fixture);
  seed_race_table(fixture);
  // 选种族 0（整数倍档）→ 检查整数倍网格 → [104] 随机档 → 检查下限/上限 → 退出
  fixture.set_inputs(0, 104, 100, 100);
  await race_config(always);
  const accelerators = new Set(button_entries(fixture).map(([acc]) => acc));
  const grid_of = (accelerator) =>
    texts_of(fixture, accelerator).filter((t) => /^\s*\d+\s*[倍岁]$/.test(t));
  // 整数倍网格（DIS_FLAG 0）：值 2..4、9、12..14、19…（%10 ∈ 0-3 ∪ 9）
  assert.ok(grid_of(2).includes('    2 倍'));
  assert.ok(grid_of(5).includes('    5 倍'));
  assert.ok(grid_of(11).includes('   10 倍'));
  assert.ok(grid_of(12).includes('   20 倍'));
  assert.ok(grid_of(24).includes('  400 倍'));
  assert.ok(grid_of(31).includes(' 1000 倍'));
  // 6..10/16..20/26..30 不进整数倍网格（%10 ∈ 4-8 被跳过）
  assert.deepEqual(grid_of(6), [], '6 不渲染');
  assert.deepEqual(grid_of(10), [], '10 不渲染（%10 == 0，仅小数档可用）');
  // 随机档（DIS_FLAG > 1）：下限三钮 + 上限网格（21..25、31..35…）
  assert.ok(texts_of(fixture, 110).some((t) => t.includes('0 岁')));
  assert.ok(texts_of(fixture, 111).some((t) => t.includes('上限的1 / 2')));
  assert.ok(texts_of(fixture, 112).some((t) => t.includes('换算成人类年龄')));
  assert.ok(grid_of(21).includes('  100 岁'));
  assert.ok(grid_of(25).includes('  500 岁'));
  assert.deepEqual(grid_of(26), [], '26-30 不渲染');
  // :1215/:1233 两行标签带前导两个全角空格（#547 验收第 6 条）
  assert.ok(
    fixture.text_lines().some((t) => t.startsWith('　　■ 下限')),
    '「■ 下限」带前导两个全角空格',
  );
  assert.ok(
    fixture.text_lines().some((t) => t.startsWith('　　■ 上限')),
    '「■ 上限」带前导两个全角空格',
  );
  // :1111 每次重画编辑头前先出空行（#547 验收第 5 条）
  const header_rows = fixture.lines
    .map((l, i) =>
      l.type === 'text' && l.text.includes('■ 种族 [精灵]') ? i : -1,
    )
    .filter((i) => i >= 0);
  assert.ok(header_rows.length > 0, '编辑头行存在');
  assert.ok(
    header_rows.every((i) => fixture.lines[i - 1]?.type === 'br'),
    '编辑头前一拍是空行（PRINTL）',
  );
  // 模式按钮与出口
  for (const key of [101, 102, 103, 104, 999, 100]) {
    assert.ok(accelerators.has(key), `按钮 ${key}`);
  }
});

test('RACE_CONFIG 编辑循环：小数倍网格（DIS_FLAG 1，含 0.0 倍按钮）', async () => {
  const fixture = create_era_fixture();
  const { race_config } = load(fixture);
  seed_race_table(fixture);
  fixture.set_inputs(1, 103, 100, 100); // 狼人（已是小数倍）→ [103] 后直接退出
  await race_config(always);
  const has = (accelerator, fragment) =>
    texts_of(fixture, accelerator).some((t) => t.includes(fragment));
  assert.ok(has(0, '0.0 倍'));
  assert.ok(has(0, '种族的寿命1年以内'));
  assert.ok(has(1, '0.1 倍'));
  assert.ok(has(10, '1.0 倍'), ':1258 十的倍数仅小数档可用');
  assert.ok(has(14, '1.4 倍'));
  assert.ok(has(15, '1.5 倍'));
  assert.ok(has(20, '2.0 倍'));
  assert.ok(!has(9, '倍'), '9 不渲染（%10 ∈ 5-8 被跳过，跨过 9）');
  assert.ok(!has(16, '倍'), '16-18 不渲染');
});

test('RACE_CONFIG 编辑循环的档位说明行（当前设定与 17 岁换算预览）', async () => {
  const fixture = create_era_fixture();
  const { race_config } = load(fixture);
  seed_race_table(fixture);
  fixture.set_inputs(0, 100, 100);
  await race_config(always);

  const lines = fixture.text_lines();
  assert.ok(
    lines.some((line) => line.includes('■ 种族 [精灵] 的年龄设定：')),
    '种族编辑头',
  );
  assert.ok(
    lines.some((line) => line.includes('换算成人类年龄的  10 倍')),
    '当前档说明（槽 011 → 10 倍）',
  );
  assert.ok(
    lines.some((line) => line.includes('　 换算人类 17 岁左右')),
    '17 岁换算预览行',
  );
  assert.ok(
    lines.some((line) => line.includes(' 170 ～  179 岁')),
    '预览年龄区间',
  );
});

test('RACE_CONFIG 编辑循环的小数倍档预览（17×1.5 的整数截断，:1151-1152）', async () => {
  const fixture = create_era_fixture();
  const { race_config } = load(fixture);
  seed_race_table(fixture);
  // 狼人（115 小数倍 1.5）：编辑头显示 17 × 1.5 = 25.5 → 截断 25 岁
  fixture.set_inputs(1, 100, 100);
  await race_config(always);

  const lines = fixture.text_lines();
  assert.ok(
    lines.some((line) => line.includes('换算成人类年龄的 1.5 倍')),
    '当前档说明（小数倍）',
  );
  assert.ok(
    lines.some((line) => line.includes('  25 岁')),
    '小数倍档的 17 岁换算预览按整数除法截断',
  );
});
