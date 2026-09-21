/**
 * @file 玩家设定画面（issue #463，源 target/ERB/SYSTEM/CONFIG.ERB）。
 */

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { create_era_fixture } = require('./helpers/era-fixture');

function load(fixture) {
  return fixture.load_module('page/page-config');
}

test('存根清单可检索：docs/stub-registry.md 收录这张票全部占位名', () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = load(fixture);
  const registry_path = path.resolve(
    __dirname,
    '..',
    'docs',
    'stub-registry.md',
  );
  const registry = fs.readFileSync(registry_path, 'utf8');
  assert.deepEqual(STUBBED_CALLS, ['CONFIG_AGE_SETTING', 'MODLIST']);
  for (const name of STUBBED_CALLS) {
    assert(registry.includes(name), `存根清单缺少 ${name}`);
  }
});

test('config_filter_setting：0-4 切换 FLAG:25 对应位，100 返回', async () => {
  const fixture = create_era_fixture();
  const { config_filter_setting } = load(fixture);
  const { game } = fixture.load_module('facade/game');
  fixture.set_inputs(0, 2, 100);
  const result = await config_filter_setting();
  assert.equal(result, 0);
  assert.equal(game.train.指令过滤, 0b101); // 位0（爱抚）与位2（私处性交）
});

test('filter_status_text：按位〇/× 摘要（颜色不镜像，文字标记保留信息）', () => {
  const fixture = create_era_fixture();
  const { filter_status_text } = load(fixture);
  const { game } = fixture.load_module('facade/game');
  game.train.指令过滤 = 0b1; // 位0（爱抚）已过滤
  const line = filter_status_text();
  assert(line.includes('爱抚×'));
  assert(line.includes('器具〇'));
});

test('config_virgin_conceded_setting：0/1/2 写 era_flag.virgin_conceded_mode = RESULT-1', async () => {
  const fixture = create_era_fixture();
  const { config_virgin_conceded_setting } = load(fixture);
  const era_flag = fixture.load_module('era-utils/era-flag');
  fixture.set_inputs(0);
  const result = await config_virgin_conceded_setting();
  assert.equal(result, 0);
  assert.equal(era_flag.virgin_conceded_mode, -1);
});

test('config_virgin_conceded_setting：100 直接返回，不写 FLAG:38', async () => {
  const fixture = create_era_fixture();
  const { config_virgin_conceded_setting } = load(fixture);
  fixture.set_inputs(100);
  const result = await config_virgin_conceded_setting();
  assert.equal(result, 0);
  assert.equal(
    fixture.var_writes.filter((w) => w.name === 'flag:38').length,
    0,
  );
});

test('virgin_conceded_status_text：三档文案（<=-1/0/>=1）', () => {
  const fixture = create_era_fixture();
  const { virgin_conceded_status_text } = load(fixture);
  const era_flag = fixture.load_module('era-utils/era-flag');

  era_flag.virgin_conceded_mode = -1;
  assert.equal(virgin_conceded_status_text(), '从不发生');

  era_flag.virgin_conceded_mode = 0;
  assert.equal(virgin_conceded_status_text(), '每人一次');

  era_flag.virgin_conceded_mode = 1;
  assert.equal(virgin_conceded_status_text(), '持续触发');
});
test('config_penis_you_setting：0-4 写 chara(0).chara.阴茎的状态 并回显名称', async () => {
  const fixture = create_era_fixture();
  const { config_penis_you_setting } = load(fixture);
  const { chara } = fixture.load_module('facade/chara');
  fixture.set_inputs(1);
  const result = await config_penis_you_setting();
  assert.equal(result, 0);
  assert.equal(chara(0).chara.阴茎的状态, 1);
  assert(fixture.text_lines().some((t) => t.includes('《巨根》')));
});

test('config_penis_you_setting：999 直接返回，不改状态；非 0-4/999 静默无操作（原作无重试）', async () => {
  const fixture = create_era_fixture();
  const { config_penis_you_setting } = load(fixture);
  const { chara } = fixture.load_module('facade/chara');
  const before = chara(0).chara.阴茎的状态;
  fixture.set_inputs(999);
  const result = await config_penis_you_setting();
  assert.equal(result, 0);
  assert.equal(chara(0).chara.阴茎的状态, before);
});

test('adventurer_gender_status_text：MOD SAVEDATA 未落地，恒显示 -1 档文案（女多男少）', () => {
  const fixture = create_era_fixture();
  const { adventurer_gender_status_text } = load(fixture);
  assert.equal(adventurer_gender_status_text(), '女多男少');
});

test('prostitution_effect_status_text：MOD SAVEDATA 未落地，恒显示默认档文案', () => {
  const fixture = create_era_fixture();
  const { prostitution_effect_status_text } = load(fixture);
  assert.equal(
    prostitution_effect_status_text(),
    '【负面】让奴隶的售价下降（默认设置）',
  );
});

test('dispatch_config(0-10)：INVERTBIT FLAG:5 逐位切换', async () => {
  const fixture = create_era_fixture();
  const { dispatch_config } = load(fixture);
  const { game } = fixture.load_module('facade/game');
  await dispatch_config(0, 0);
  assert.equal(game.dungeon.游戏设定, 1);
  await dispatch_config(0, 0);
  assert.equal(game.dungeon.游戏设定, 0);
  await dispatch_config(10, 0);
  assert.equal(game.dungeon.游戏设定, 2 ** 10);
});

test('dispatch_config(11/12)：着衣系统/濒死自动结束调教取反（各自独立 flag，非 FLAG:5 位）', async () => {
  const fixture = create_era_fixture();
  const { dispatch_config } = load(fixture);
  const { game } = fixture.load_module('facade/game');
  await dispatch_config(11, 0);
  assert.equal(game.system.着衣系统, 1);
  await dispatch_config(11, 0);
  assert.equal(game.system.着衣系统, 0);
  await dispatch_config(12, 0);
  assert.equal(game.system.濒死自动结束调教, 1);
  // 切换 11/12 不应动到 FLAG:5
  assert.equal(game.dungeon.游戏设定, 0);
});

test('dispatch_config(14)：自我介绍式角色信息 = FLAG:5 位 11', async () => {
  const fixture = create_era_fixture();
  const { dispatch_config } = load(fixture);
  const { game } = fixture.load_module('facade/game');
  await dispatch_config(14, 1);
  assert.equal(game.dungeon.游戏设定, 2 ** 11);
});

test('dispatch_config(16/17/18)：FLAG:5 位 32-34 用算术运算而非位运算（避免 32 位截断溢出）', async () => {
  const fixture = create_era_fixture();
  const { dispatch_config } = load(fixture);
  const { game } = fixture.load_module('facade/game');
  await dispatch_config(16, 1);
  assert.equal(game.dungeon.游戏设定, 2 ** 32);
  await dispatch_config(17, 1);
  assert.equal(game.dungeon.游戏设定, 2 ** 32 + 2 ** 33);
  await dispatch_config(18, 1);
  assert.equal(game.dungeon.游戏设定, 2 ** 32 + 2 ** 33 + 2 ** 34);
});

test('dispatch_config(20)：位 35/36 三态循环（未设→仅 35→35+36→清零两位）', async () => {
  const fixture = create_era_fixture();
  const { dispatch_config } = load(fixture);
  const { game } = fixture.load_module('facade/game');
  await dispatch_config(20, 1);
  assert.equal(game.dungeon.游戏设定, 2 ** 35);
  await dispatch_config(20, 1);
  assert.equal(game.dungeon.游戏设定, 2 ** 35 + 2 ** 36);
  await dispatch_config(20, 1);
  assert.equal(game.dungeon.游戏设定, 0);
});

test('dispatch_config(22-25)：FLAG:8 位 0-3 独立切换（含菜单文字被注释掉、未打印按钮的 22）', async () => {
  const fixture = create_era_fixture();
  const { dispatch_config } = load(fixture);
  const era_flag = fixture.load_module('era-utils/era-flag');
  await dispatch_config(22, 1);
  assert.equal(era_flag.adventurer_flags, 1);
  await dispatch_config(23, 1);
  assert.equal(era_flag.adventurer_flags, 3);
  await dispatch_config(24, 1);
  assert.equal(era_flag.adventurer_flags, 7);
  await dispatch_config(25, 1);
  assert.equal(era_flag.adventurer_flags, 15);
});

test('dispatch_config(13)：进入 config_filter_setting 子菜单并可退出', async () => {
  const fixture = create_era_fixture();
  const { dispatch_config } = load(fixture);
  fixture.set_inputs(100);
  const page = await dispatch_config(13, 0);
  assert.equal(page, 0);
});

test('dispatch_config(15)：CONFIG_AGE_SETTING 走存根占位并等键', async () => {
  const fixture = create_era_fixture();
  const { dispatch_config } = load(fixture);
  const page = await dispatch_config(15, 1);
  assert.equal(page, 1);
  assert(fixture.text_lines().some((t) => t.includes('@CONFIG_AGE_SETTING')));
  assert.equal(fixture.waits.length, 1);
});

test('dispatch_config(19)：进入 config_penis_you_setting 子菜单', async () => {
  const fixture = create_era_fixture();
  const { dispatch_config } = load(fixture);
  const { chara } = fixture.load_module('facade/chara');
  fixture.set_inputs(1);
  const page = await dispatch_config(19, 0);
  assert.equal(page, 0);
  assert.equal(chara(0).chara.阴茎的状态, 1);
});

test('dispatch_config(21)：进入 config_virgin_conceded_setting 子菜单', async () => {
  const fixture = create_era_fixture();
  const { dispatch_config } = load(fixture);
  const era_flag = fixture.load_module('era-utils/era-flag');
  fixture.set_inputs(2);
  const page = await dispatch_config(21, 0);
  assert.equal(page, 0);
  assert.equal(era_flag.virgin_conceded_mode, 1);
});

test('dispatch_config(26)：MOD开关（MODLIST）走存根占位并等键', async () => {
  const fixture = create_era_fixture();
  const { dispatch_config } = load(fixture);
  await dispatch_config(26, 1);
  assert(fixture.text_lines().some((t) => t.includes('@MODLIST')));
});

test('dispatch_config(27-30)：四个 MOD SAVEDATA 未落地变量恒不写入（1:1「设置了也不生效」）', async () => {
  const fixture = create_era_fixture();
  const { dispatch_config } = load(fixture);
  for (const local of [27, 28, 29, 30]) {
    const page = await dispatch_config(local, 1);
    assert.equal(page, 1);
  }
  assert.equal(fixture.var_writes.length, 0);
});

test('dispatch_config(101/102)：翻页在 0/1 间循环；100 返回 null（退出信号）', async () => {
  const fixture = create_era_fixture();
  const { dispatch_config } = load(fixture);
  assert.equal(await dispatch_config(101, 0), 1);
  assert.equal(await dispatch_config(101, 1), 0);
  assert.equal(await dispatch_config(102, 0), 1);
  assert.equal(await dispatch_config(100, 1), null);
});

test('config_menu：首屏渲染 page 0 的按钮与初始状态文案', async () => {
  const fixture = create_era_fixture();
  const { config_menu } = load(fixture);
  fixture.set_inputs(100);
  const result = await config_menu();
  assert.equal(result, 0);
  const buttons = fixture.lines_history.filter((l) => l.type === 'button');
  const btn0 = buttons.find((b) => b.accelerator === 0);
  assert(btn0.text.includes('禁止')); // 初始 FLAG:5 位 0 = 0 → 假支路
  const btn13 = buttons.find((b) => b.accelerator === 13);
  assert(btn13.text.includes('爱抚〇'));
});

test('config_menu：完整一轮——page0 切换开关、翻页到 page1、经 [100] 返回', async () => {
  const fixture = create_era_fixture();
  const { config_menu } = load(fixture);
  const { game } = fixture.load_module('facade/game');
  fixture.set_inputs(0, 101, 100);
  const result = await config_menu();
  assert.equal(result, 0);
  assert.equal(game.dungeon.游戏设定, 1);
  const buttons = fixture.lines_history.filter((l) => l.type === 'button');
  // 翻页后 page1 的按钮应已渲染过（历史行史里能找到 [23] 素质表示行）
  assert(buttons.some((b) => b.accelerator === 23));
});
