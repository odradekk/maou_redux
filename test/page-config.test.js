/**
 * @file 玩家设定画面（issue #463，源 target/ERB/SYSTEM/CONFIG.ERB）。
 */

const { test } = require('node:test');
const assert = require('node:assert/strict');

const { create_era_fixture } = require('./helpers/era-fixture');

function load(fixture) {
  return fixture.load_module('page/page-config');
}

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

// —— #615：print 正文不带尾换行（CONTEXT.md「输出 API 与原作的对应」）——

test('#615 config_penis_you_setting：标题行不带尾换行，紧接 [0] 按钮行', async () => {
  const fixture = create_era_fixture();
  const { config_penis_you_setting } = load(fixture);
  fixture.set_inputs(999);
  await config_penis_you_setting();

  const lines = fixture.lines;
  assert.equal(
    lines[0].text,
    '魔王的兵器是如意金箍棒，可大也可小！！',
    'CONFIG.ERB:88 的 PRINTFORML 自成一行，正文不带尾换行（多写 \\n 会多一个空行）',
  );
  assert.equal(lines[1].type, 'button', ':90 的 [0] 按钮行紧随其下');
  assert.equal(lines[1].accelerator, 0);
});

test('#615 config_penis_you_setting：回显行不带尾换行（:103 PRINT + :105 PRINTW）', async () => {
  const fixture = create_era_fixture();
  const { config_penis_you_setting } = load(fixture);
  fixture.set_inputs(1);
  await config_penis_you_setting();

  assert.ok(
    fixture.text_lines().includes('你的鸡鸡状态：《巨根》'),
    `回显是一行（PRINT + PRINTW），实际 ${JSON.stringify(fixture.text_lines())}`,
  );
});

test('adventurer_gender_status_text：六档文案（global:3，@EVENTFIRST 开局 -1）', () => {
  const fixture = create_era_fixture();
  const { adventurer_gender_status_text } = load(fixture);
  const era_global = fixture.load_module('era-utils/era-global');

  const expectations = [
    [-1, '女多男少'],
    [0, '只有女性'],
    [1, '只有男性'],
    [2, '男多女少'],
    [3, '男女持平'],
    [4, '全是扶她'],
  ];
  for (const [value, text] of expectations) {
    era_global.adventurer_gender = value;
    assert.equal(adventurer_gender_status_text(), text, `档位 ${value}`);
  }
});

test('prostitution_effect_status_text：三档文案（modsave:0，0 为默认）', () => {
  const fixture = create_era_fixture();
  const { prostitution_effect_status_text } = load(fixture);
  const era_modsave = fixture.load_module('era-utils/era-modsave');

  assert.equal(
    prostitution_effect_status_text(),
    '【负面】让奴隶的售价下降（默认设置）',
    '未初始化 = 0（DIM 无声明默认值）',
  );
  era_modsave.prostitution_effect = 1;
  assert.equal(prostitution_effect_status_text(), '【正面】让奴隶的售价上升');
  era_modsave.prostitution_effect = 2;
  assert.equal(prostitution_effect_status_text(), '【无影响】不会影响奴隶售价');
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

test('dispatch_config(15)：进入年龄/三围子菜单（CONFIG_AGE_SETTING 真身）', async () => {
  const fixture = create_era_fixture();
  const { dispatch_config } = load(fixture);
  fixture.set_inputs(100); // 子菜单直接退出（位 12/15 全关，退出块不动）
  const page = await dispatch_config(15, 1);
  assert.equal(page, 1);
  // 真的渲染了年龄菜单（按钮行，而非存根占位文本行）
  assert(
    fixture.lines_history.some(
      (l) => l.type === 'button' && l.text.includes('年龄的显示'),
    ),
    '年龄菜单首行',
  );
  assert(
    !fixture.text_lines().some((t) => t.includes('@CONFIG_AGE_SETTING')),
    '存根占位行必须消失',
  );
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

test('dispatch_config(26)：MOD 开关入口已删（#638），输入不被接受', async () => {
  const fixture = create_era_fixture();
  const { dispatch_config } = load(fixture);
  const page = await dispatch_config(26, 1);
  assert.equal(page, 1, '无分支命中，原页返回');
  assert.equal(
    fixture.text_lines().length,
    0,
    'MOD 子系统不移植（#542），删掉入口后不得再打印任何提示行',
  );
  assert.equal(fixture.waits.length, 0, '不得等待读键');
  assert.equal(fixture.var_writes.length, 0, '不得写任何变量');
});
test('dispatch_config(28)：立绘开关入口已删（#638），输入不被接受', async () => {
  const fixture = create_era_fixture();
  const { dispatch_config } = load(fixture);
  const page = await dispatch_config(28, 1);
  assert.equal(page, 1, '无分支命中，原页返回');
  assert.equal(
    fixture.text_lines().length,
    0,
    '立绘系统不移植（#542），删掉入口后不得再打印任何提示行',
  );
  assert.equal(fixture.waits.length, 0, '不得等待读键');
  assert.equal(fixture.var_writes.length, 0, '开关不落地');
});

test('config_menu page 1：MOD 开关与立绘开关按钮不再渲染', async () => {
  const fixture = create_era_fixture();
  const { config_menu } = load(fixture);
  fixture.set_inputs(101, 100); // 翻到 page 1 后退出
  await config_menu();
  const buttons = fixture.lines_history.filter((l) => l.type === 'button');
  assert.equal(
    buttons.some((b) => b.accelerator === 26),
    false,
    '[26] MOD开关 按钮不得渲染',
  );
  assert.equal(
    buttons.some((b) => b.accelerator === 28),
    false,
    '[28] 立绘开关 按钮不得渲染',
  );
});
test('dispatch_config(27/29/30)：三个魔改存档变量的切换落地（#547 存储）', async () => {
  const fixture = create_era_fixture();
  const { dispatch_config } = load(fixture);
  const era_global = fixture.load_module('era-utils/era-global');
  const era_modsave = fixture.load_module('era-utils/era-modsave');

  // [27] 冒险者性别（GLOBAL）：开局 -1 → 按一下到 0
  era_global.adventurer_gender = -1;
  assert.equal(await dispatch_config(27, 1), 1);
  assert.equal(era_global.adventurer_gender, 0);

  // [29] 卖淫影响（SAVEDATA）：0 → 1 → 2 → 0
  assert.equal(await dispatch_config(29, 1), 1);
  assert.equal(era_modsave.prostitution_effect, 1);
  await dispatch_config(29, 1);
  assert.equal(era_modsave.prostitution_effect, 2);
  await dispatch_config(29, 1);
  assert.equal(era_modsave.prostitution_effect, 0);

  // [30] 反作弊（SAVEDATA）：0 → 1 → 0
  assert.equal(await dispatch_config(30, 1), 1);
  assert.equal(era_modsave.anti_cheat, 1);
  await dispatch_config(30, 1);
  assert.equal(era_modsave.anti_cheat, 0);
});

test('draw_config_page 的 [30] 状态行随反作弊开关翻转（OFF = 可开修改）', async () => {
  const fixture = create_era_fixture();
  const { config_menu } = load(fixture);
  const era_modsave = fixture.load_module('era-utils/era-modsave');

  era_modsave.anti_cheat = 1;
  fixture.set_inputs(101, 100); // 翻到 page 1 后退出
  await config_menu();
  const off_line = fixture.lines_history.find(
    (l) => l.type === 'button' && l.accelerator === 30,
  );
  assert.ok(
    off_line.text.includes('反作弊开关'),
    `[30] 按钮行标签：${off_line.text}`,
  );
  assert.ok(
    off_line.text.includes('OFF（可开修改）'),
    `OFF 档：${off_line.text}`,
  );

  const fixture2 = create_era_fixture();
  const { config_menu: again } = load(fixture2);
  fixture2.set_inputs(101, 100);
  await again();
  const on_line = fixture2.lines_history.find(
    (l) => l.type === 'button' && l.accelerator === 30,
  );
  assert.ok(
    on_line.text.includes('ON（不可开修改）'),
    `ON 档（默认 0）：${on_line.text}`,
  );
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
