/**
 * ere/system/train/benki.js 的行为测试（issue #217，J7 肉便器）。
 *
 * 缝 = test/helpers/era-fixture.js。世界底座：魔王 0 + 温妮（id 31）入列，
 * 温妮带肉便器素质（TALENT:204）与足量体力/气力。覆盖（逐条对应验收清单）：
 *   - 肉便器菜单三段（选择 / 命名 / 取经验）各有测试：
 *     SELECT_BENKI_MENU（RAND:DICE 定值序 + V_ABLE 接线——处女拦截）、
 *     NAME_BENKI_MENU（指令号 → 名字表）、GET_EXP_BENKI_MENU（门槛 +
 *     指令号 → PALAM/经验换算 + JUEL 加算）；
 *   - 日循环里的肉便器事件触发条件（角色素质 TALENT:204）有测试，与
 *     FLAG:83/84 的显示条件互不混淆（FLAG:83/84 不触发 run_benki）；
 *   - @BENKI 的五个行动分派（配信 / 兽奸 / 奉仕 / 同性爱 / 一般）各有
 *     输出与结算断言；
 *   - 跨域写走门面（flag:63 经 game.dungeon、exp 属主 dungeon 经
 *     chara(cid).dungeon）——domain-check 判绿；
 *   - TEQUIP 只读不写（#215 建模归 J5）：本文件无 tequip 写入；
 *   - 存根清单核对（docs/stub-registry.md）——BENKI_KOUJO 随口上票。
 *
 * 随机源注入：run_benki / select_benki_menu 接受 rand 参数（[0, n) 整数），
 * 测试用定值序固定分支（fs_bitch_looks 的 DICE=2 覆盖与 RAND:4 共用同一
 * 序列，kojo-dungeon-bitch 同款 seq_rand）。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_chara_0, join_slave_chara } = require('./helpers/chara');

const REPO = path.resolve(__dirname, '..');

// RAND:N 定值序：draws 依次被消费，越界取模
const seq_rand =
  (...draws) =>
  (n) => {
    const value = draws.shift() ?? 0;
    return value % n;
  };

/** 世界底座：魔王 + 温妮（id 31）入列，温妮为肉便器且体力/气力充足 */
function setup_benki(seed) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  fixture.store.set('talent:31:204', 1); // 肉便器
  fixture.store.set('base:31:0', 500);
  fixture.store.set('base:31:1', 200);
  if (seed) {
    seed(fixture);
  }
  const mod = fixture.load_module('system/train/benki');
  return { fixture, mod };
}

/** 断言 flag:62/63/64 的最终写入值 */
function flag_of(fixture, idx) {
  return fixture.store.get(`flag:${idx}`);
}

// —— 日循环触发条件（验收项：与 FLAG:83/84 显示条件互不混淆）——

test('run_benki：非肉便器角色（TALENT:204 == 0）直接返回，无输出', async () => {
  const { fixture, mod } = setup_benki();
  fixture.store.set('talent:31:204', 0);
  assert.equal(await mod.run_benki(31, seq_rand(0)), 0);
  assert.deepEqual(fixture.text_lines(), []);
});

test('run_benki：魔王（角色 0）恒被除外（原作 ARG:0 == 0 RETURN）', async () => {
  const { fixture, mod } = setup_benki();
  fixture.store.set('talent:0:204', 1);
  fixture.store.set('base:0:0', 9999);
  fixture.store.set('base:0:1', 9999);
  assert.equal(await mod.run_benki(0, seq_rand(0)), 0);
  assert.deepEqual(fixture.text_lines(), []);
});

test('run_benki：体力 < 300 或气力 < 100 直接返回', async () => {
  const { fixture, mod } = setup_benki();
  fixture.store.set('base:31:0', 299);
  assert.equal(await mod.run_benki(31, seq_rand(0)), 0);
  assert.deepEqual(fixture.text_lines(), []);
});

test('run_benki：占用中（CFLAG:1 != 0）或育儿中不结算', async () => {
  const { fixture, mod } = setup_benki();
  fixture.store.set('cflag:31:1', 1);
  assert.equal(await mod.run_benki(31, seq_rand(0)), 0);
  assert.deepEqual(fixture.text_lines(), []);
});

test('run_benki：FLAG:83/84 不触发肉便器事件——只认角色素质 TALENT:204', async () => {
  // 验收项：日循环的肉便器事件按角色素质判定，与 FLAG:83/84（设施/展品
  // 计数，只影响按钮与地城概况显示）互不混淆。golden/README.md 的置位串
  // 注释正是指这一点——本票接通后该注释仍然成立（BENKI 不看 FLAG:83/84）。
  const { fixture, mod } = setup_benki();
  // 有肉便器素质但 FLAG:83/84 为 0 → 事件照常触发
  fixture.store.set('flag:83', 0);
  fixture.store.set('flag:84', 0);
  await mod.run_benki(31, seq_rand(0));
  assert.ok(
    fixture.text_lines().some((l) => l.includes('温妮')),
    '肉便器素质 + FLAG:83/84 = 0 仍须触发（按素质判定）',
  );
});

test('run_benki：FLAG:83/84 置位但无肉便器素质 → 不触发', async () => {
  const { fixture, mod } = setup_benki();
  fixture.store.set('talent:31:204', 0);
  fixture.store.set('flag:83', 5);
  fixture.store.set('flag:84', 3);
  assert.equal(await mod.run_benki(31, seq_rand(0)), 0);
  assert.deepEqual(fixture.text_lines(), []);
});

// —— 菜单三段：选择 ——

test('SELECT_BENKI_MENU：技巧 2 以上且 RAND 命中 → 手淫（30）', () => {
  const { fixture, mod } = setup_benki();
  fixture.store.set('abl:31:12', 2);
  assert.equal(
    mod.select_benki_menu(31, '战斗', () => 0),
    30,
  );
});

test('SELECT_BENKI_MENU：V_ABLE 接线——处女拦截正常位/后背后，回落后续分支', () => {
  const { fixture, mod } = setup_benki();
  // 私处感觉 2 + 处女 → V_ABLE = 0，两个 V 分支都不中，A 分支不满足 → 0
  fixture.store.set('abl:31:2', 2);
  fixture.store.set('talent:31:0', 1);
  assert.equal(
    mod.select_benki_menu(31, '战斗', () => 0),
    0,
  );
  // 非处女 → 后位判定「越靠后越难命中」：rand 序列只命中第一个 V 分支
  // （dice=2 时 rand=0）→ 20；两次都命中（后判覆盖前判）→ 21
  fixture.store.set('talent:31:0', 0);
  assert.equal(mod.select_benki_menu(31, '战斗', seq_rand(0, 1)), 20);
  assert.equal(
    mod.select_benki_menu(31, '战斗', () => 0),
    21,
  );
  // rand 序列不命中 → 回落 0（爱抚）
  assert.equal(
    mod.select_benki_menu(31, '战斗', () => 1),
    0,
  );
});

test('SELECT_BENKI_MENU：非战斗 ARGS 不参与判定（恒回落 0）', () => {
  const { fixture, mod } = setup_benki();
  fixture.store.set('abl:31:12', 9);
  assert.equal(
    mod.select_benki_menu(31, '其它', () => 0),
    0,
  );
});

// —— 菜单三段：命名 ——

test('NAME_BENKI_MENU：指令号 → 名字表（SELECTCASE 1:1）', () => {
  const { mod } = setup_benki();
  assert.equal(mod.name_benki_menu(0), '爱抚');
  assert.equal(mod.name_benki_menu(3), '自慰');
  assert.equal(mod.name_benki_menu(20), '正常位');
  assert.equal(mod.name_benki_menu(31), '口交');
  assert.equal(mod.name_benki_menu(38), '足交');
  // 表外号（SELECTCASE 无 CASEELSE）→ 空串
  assert.equal(mod.name_benki_menu(99), '');
});

// —— 菜单三段：取经验 ——

test('GET_EXP_BENKI_MENU：门槛——非肉便器或非常识改变【战斗】直接返回', async () => {
  const { fixture, mod } = setup_benki();
  assert.equal(await mod.get_exp_benki_menu(31, 20), 0);
  assert.deepEqual(fixture.text_lines(), []);
});

test('GET_EXP_BENKI_MENU：正常位（20）→ 私处经验 + 习得/私处点数 + JUEL 加算', async () => {
  const { fixture, mod } = setup_benki();
  fixture.store.set('talent:31:281', 1); // 常识改变【战斗】
  fixture.store.set('palamname:1', '私处');
  fixture.store.set('palamname:7', '习得');
  assert.equal(await mod.get_exp_benki_menu(31, 20), 0);
  const lines = fixture.text_lines();
  assert.ok(
    lines.some((l) => l.includes('私处经验+1')),
    '私处经验+1',
  );
  assert.ok(
    lines.some((l) => l.includes('私处+10')),
    '私处+10',
  );
  assert.ok(
    lines.some((l) => l.includes('习得+3')),
    '习得+3',
  );
  // 私处经验（EXP:0 属主 dungeon → 门面写）
  assert.equal(fixture.store.get('exp:31:0'), 1, '私处经验写');
  // JUEL:1 私处 +10、JUEL:7 习得 +3
  assert.equal(fixture.store.get('juel:31:1'), 10, '私处点数珠');
  assert.equal(fixture.store.get('juel:31:7'), 3, 'JUEL:7 习得珠');
});

test('GET_EXP_BENKI_MENU：手淫（30）→ 无经验行、习得/屈服点数', async () => {
  const { fixture, mod } = setup_benki();
  fixture.store.set('talent:31:281', 1);
  fixture.store.set('palamname:6', '屈服');
  fixture.store.set('palamname:7', '习得');
  await mod.get_exp_benki_menu(31, 30);
  const lines = fixture.text_lines();
  assert.ok(!lines.some((l) => l.includes('经验+')), '手淫无经验行');
  assert.ok(
    lines.some((l) => l.includes('习得+5')),
    '习得+5（PLAY/2）',
  );
  assert.ok(
    lines.some((l) => l.includes('屈服+3')),
    '屈服+3（PLAY/3）',
  );
  assert.equal(fixture.store.get('juel:31:6'), 3);
  assert.equal(fixture.store.get('juel:31:7'), 5);
});

// —— @BENKI 的行动分派与结算 ——

test('run_benki：一般分派（フェラ便器）——两段演出 + BENKI_KOUJO 存根 + 珠/经验结算', async () => {
  const { fixture, mod } = setup_benki();
  await mod.run_benki(31, seq_rand(0));
  const lines = fixture.text_lines();
  // 第一段：%FS_BITCH("LOOKS", ARG)%正 + 用嘴来做。
  assert.ok(
    lines.some((l) => l.includes('用嘴来做')),
    'フェラ便器说明',
  );
  // 第二段：%SAVESTR%在深夜，自己屋子里，任魔族男性将阴茎塞入了口中…
  assert.ok(
    lines.some((l) => l.includes('任魔族男性将阴茎塞入了口中')),
    '第二段演出',
  );
  // 口上存根两次（开头部 + 分支结算前）
  const stub_count = lines.filter((l) => l.includes('@BENKI_KOUJO')).length;
  assert.equal(stub_count, 2, 'BENKI_KOUJO 存根两次');
  // flag:62 = 6（フェラ便器）、flag:64 = 3（魔族男性）
  assert.equal(flag_of(fixture, 62), 6);
  assert.equal(flag_of(fixture, 64), 3);
  // 珠结算：阴核/欲情/耻情
  assert.ok(lines.some((l) => l.includes('阴核点数+10')));
  assert.ok(lines.some((l) => l.includes('欲情点数+10')));
  assert.ok(lines.some((l) => l.includes('耻情点数+5')));
  assert.equal(fixture.store.get('juel:31:0'), 10, '阴核珠加算');
  assert.equal(fixture.store.get('juel:31:5'), 10, '欲情珠加算');
  assert.equal(fixture.store.get('juel:31:8'), 5, '耻情珠加算');
  // 一般分派：精液经验 + 战斗经验（属主 dungeon → 门面写）
  assert.equal(fixture.store.get('exp:31:20'), 1);
  assert.equal(fixture.store.get('exp:31:80'), 1);
  // TARGET 还原：era_flag.target 回到调用前值
  assert.equal(fixture.store.get('flag:10005'), 0);
});

test('run_benki：奉仕分派（menu:0 >= 3）——最下層民奉仕 + 聖者/圣女噂', async () => {
  const { fixture, mod } = setup_benki();
  // 侍奉精神 3 → menu[0] = 3 → 奉仕分派；顺从/欲望抬高 PLAY 到 > 30
  // 触发「故乡」档的圣女噂（男人 → 圣者、否则圣女）
  fixture.store.set('abl:31:16', 3);
  fixture.store.set('abl:31:10', 30); // 顺从
  fixture.store.set('abl:31:11', 30); // 欲望
  await mod.run_benki(31, seq_rand(0));
  const lines = fixture.text_lines();
  assert.ok(
    lines.some((l) => l.includes('作为侍奉用便器在地下城里服侍着')),
    '奉仕演出',
  );
  assert.equal(flag_of(fixture, 62), 0);
  assert.equal(flag_of(fixture, 64), 0);
  // 圣女噂（非男人）
  assert.ok(
    lines.some((l) => l.includes('圣女')),
    '圣女噂',
  );
  assert.ok(!lines.some((l) => l.includes('圣者')), '非男人不用圣者');
  // 性交 + 精液 + 战斗经验（= PLAY，随素质/能力加算）
  const exp5 = fixture.store.get('exp:31:5');
  const exp20 = fixture.store.get('exp:31:20');
  const exp80 = fixture.store.get('exp:31:80');
  assert.ok(exp5 > 30, `性交经验=${exp5}（PLAY>30 档）`);
  assert.equal(exp20, exp5, '精液经验 = 性交经验（同一 PLAY）');
  assert.equal(exp80, exp5, '战斗经验 = 同一 PLAY');
});

test('run_benki：兽奸分派（menu:4 >= 3）——公共便器 + 兽奸经验', async () => {
  const { fixture, mod } = setup_benki();
  fixture.store.set('abl:31:39', 3); // 兽奸中毒 3 → menu[4] = 3
  await mod.run_benki(31, seq_rand(0));
  const lines = fixture.text_lines();
  assert.ok(
    lines.some((l) => l.includes('作为公共便器，处理着地下城内魔兽们的性欲')),
    '兽奸演出',
  );
  assert.equal(flag_of(fixture, 62), 2);
  assert.equal(flag_of(fixture, 64), 2);
  const exp56 = fixture.store.get('exp:31:56');
  const exp80 = fixture.store.get('exp:31:80');
  assert.ok(exp56 > 0, `兽奸经验=${exp56}`); // 随 PLAY 缩放
  assert.equal(exp80, exp56, '战斗经验 = 同一 PLAY');
});

test('run_benki：同性爱分派（menu:3 >= 3）——淫魔相拥 + 百合经验', async () => {
  const { fixture, mod } = setup_benki();
  fixture.store.set('abl:31:33', 3); // 百合中毒 3 → menu[3] = 3
  await mod.run_benki(31, seq_rand(0));
  const lines = fixture.text_lines();
  assert.ok(
    lines.some((l) => l.includes('与性欲旺盛的淫魔们相拥着')),
    '同性爱演出',
  );
  assert.equal(flag_of(fixture, 62), 1);
  assert.equal(flag_of(fixture, 64), 9); // 淫魔
  const exp40 = fixture.store.get('exp:31:40');
  const exp80b = fixture.store.get('exp:31:80');
  assert.ok(exp40 > 0, `百合经验=${exp40}`); // 属主 train → 门面
  assert.equal(exp80b, exp40, '战斗经验 = 同一 PLAY');
});

test('run_benki：配信分派（menu:6 >= 3 视频源）——水晶球传播 + 拍摄经验', async () => {
  const { fixture, mod } = setup_benki();
  fixture.store.set('abl:31:15', 3); // 话术 3 → menu[6] = 3 → 配信
  fixture.store.set('abl:31:39', 3); // 兽奸中毒 3 → menu[4] = 3 → 兽奸配信
  fixture.store.set('talent:31:281', 1);
  await mod.run_benki(31, seq_rand(0));
  const lines = fixture.text_lines();
  assert.ok(
    lines.some((l) => l.includes('将与狗交配着的样子收录在了水晶球中')),
    '兽奸配信说明',
  );
  assert.equal(flag_of(fixture, 62), 7, '兽奸配信行动号'); // menu[4] 也 >= 3
  assert.equal(flag_of(fixture, 64), 2, '兽奸配信对方大型犬');
  assert.ok(
    lines.some((l) => l.includes('水晶球')),
    '水晶球传播',
  );
  const exp70 = fixture.store.get('exp:31:70');
  const exp56b = fixture.store.get('exp:31:56');
  const exp80c = fixture.store.get('exp:31:80');
  assert.ok(exp70 > 0, `拍摄经验=${exp70}`); // 属主 train → 门面
  assert.ok(exp56b > 0, `兽奸经验=${exp56b}`); // 配信
  assert.equal(exp80c, exp70, '战斗经验 = 同一 PLAY');
});

// —— 跨域写门面（domain-check 判绿）——

test('run_benki：FLAG:63 常識改変写经 game.dungeon 门面；62/64 域内直写', async () => {
  const { fixture, mod } = setup_benki();
  fixture.store.set('talent:31:283', 1); // 常识改变【日常】
  await mod.run_benki(31, seq_rand(0));
  assert.equal(fixture.store.get('flag:63'), 1); // 经 game.dungeon 门面
  // 283 == 1 → menu[0] += 3 → 奉仕分派（flag:64 = 0 最下層民）
  assert.equal(fixture.store.get('flag:62'), 0);
  assert.equal(fixture.store.get('flag:64'), 0);
});

test('run_benki：TEQUIP 零写入（本票只读不写，#215 建模归 J5）', async () => {
  const { fixture, mod } = setup_benki();
  await mod.run_benki(31, seq_rand(0));
  assert.ok(
    !fixture.var_writes.some((w) => w.name.startsWith('tequip')),
    'BENKI 不得写 tequip',
  );
});

// —— BENKI_PLAYER_NAME ——

test('BENKI_PLAYER_NAME：读 FLAG:64 返回对象名', () => {
  const { fixture, mod } = setup_benki();
  fixture.store.set('flag:64', 0);
  assert.equal(
    mod.benki_player_name(),
    '居住在地下城深渊中散发着恶臭的肮脏眷属',
  );
  fixture.store.set('flag:64', 2);
  assert.equal(mod.benki_player_name(), '大型犬');
  fixture.store.set('flag:64', 9);
  assert.equal(mod.benki_player_name(), '女淫魔');
  fixture.store.set('flag:64', -2);
  assert.equal(mod.benki_player_name(), '');
});

// —— 存根清单核对 ——

test('存根清单可检索：docs/stub-registry.md 收录 benki.js 的 BENKI_KOUJO', () => {
  const { mod } = setup_benki();
  const registry = fs.readFileSync(
    path.join(REPO, 'docs', 'stub-registry.md'),
    'utf8',
  );
  assert.deepEqual(mod.STUBBED_CALLS, ['BENKI_KOUJO']);
  for (const name of mod.STUBBED_CALLS) {
    assert(registry.includes(name), `存根清单缺少 ${name}`);
  }
});
