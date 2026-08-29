/**
 * ere/kojo/kojo-dungeon-bitch-log.js 的行为测试（issue #185，H16 卖春记录
 * 与日志分支）。
 *
 * 缝 = test/helpers/era-fixture.js。世界底座与 kojo-dungeon-bitch.test.js
 * 同款（魔王 0 + 温妮 31）。覆盖（逐条对应验收清单）：
 *   - FS_BITCH 文字列函数（PLAY/PLAYNAME/TOWN_MAN/TOWN_GIRL/DUNGEON_MAN/
 *     DUNGEON_GIRL/LOOKS 分档；非法参数抛错）；
 *   - FS_LOG_BITCH 客数/次数拼接（逗号分隔、0 跳过）；
 *   - LOG_TRY_BITCH 卖春前日志（DUNGEON/TOWN 分支、勇者/奴隶分档）——
 *     与 H15 的 FI_TRY_BITCH（玩法抽选，返回玩法号）**不同函数**：
 *     LOG_TRY_BITCH 只输出文本不改状态，FI_TRY_BITCH 只返回玩法号不输出；
 *   - LOG_AFTER_BITCH 卖春后日志（CHECK 位 → 挑玩法/客 → 调 LOG_BITCH_*）；
 *   - LOG_BITCH_HAND/ORAL/LES/ANAL/SEX 各玩法描写（ABL 分档 + 客台词随机）；
 *   - LOG_BITCH_ANIMAL 兽交（DUNGEON 空 / TOWN 三行固定文）；
 *   - LOG_BITCH_SELF 自慰日志（空壳，1:1）；
 *   - DUNGEON_SEX_LOG/ANAL_LOG/LES_LOG 三个死代码函数（#14：唯一调用方在
 *     DUNGEON_BITCH.ERB SKIP 块内）——函数可调用、按 ARG:0 分档输出，但
 *     全库无活调用点（反向变异守）；
 *   - 存根清单核对（kojo-dungeon-bitch.js 的 STUBBED_CALLS 已删前六项）。
 *
 * 随机源注入：与 kojo-dungeon-bitch.js 同款 seq_rand。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');
const { seed_static_names } = require('./helpers/static-names');

// RAND:N 定值序：draws 依次被消费，越界取模
const seq_rand =
  (...draws) =>
  (n) => {
    const value = draws.shift() ?? 0;
    return value % n;
  };

// 世界底座：魔王 + 温妮（id 31）入列
function setup_log(seed) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  seed_static_names(fixture);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.player = 0;
  if (seed) {
    seed(fixture, era_flag);
  }
  const mod = fixture.load_module('kojo/kojo-dungeon-bitch-log');
  return { fixture, mod, era_flag };
}

// —— FS_BITCH 文字列函数 ——

test('FS_BITCH：PLAY 玩法内容（1-7 → HAND/ORAL/LES/ANAL/SEX/ANIMAL/SELF）', () => {
  const { mod } = setup_log();
  assert.equal(mod.fs_bitch('PLAY', 1), 'HAND');
  assert.equal(mod.fs_bitch('PLAY', 2), 'ORAL');
  assert.equal(mod.fs_bitch('PLAY', 3), 'LES');
  assert.equal(mod.fs_bitch('PLAY', 4), 'ANAL');
  assert.equal(mod.fs_bitch('PLAY', 5), 'SEX');
  assert.equal(mod.fs_bitch('PLAY', 6), 'ANIMAL');
  assert.equal(mod.fs_bitch('PLAY', 7), 'SELF');
  assert.throws(() => mod.fs_bitch('PLAY', 8), /未知参数/);
});

test('FS_BITCH：PLAYNAME 玩法显示名（1-6）与客名分档', () => {
  const { mod } = setup_log();
  assert.equal(mod.fs_bitch('PLAYNAME', 1), '手淫奉侍');
  assert.equal(mod.fs_bitch('PLAYNAME', 6), '兽交奉侍');
  assert.equal(mod.fs_bitch('TOWN_MAN', 1), '村民');
  assert.equal(mod.fs_bitch('TOWN_GIRL', 5), '艺伎');
  assert.equal(mod.fs_bitch('DUNGEON_MAN', 1), '兽人');
  assert.equal(mod.fs_bitch('DUNGEON_GIRL', 5), '魔族的女祭司');
});

test('FS_BITCH：LOOKS 本人描写（头发颜色默认 + 随机覆盖 + 种族/名字收尾）', () => {
  const { mod } = setup_log((f) => {
    f.store.set('talent:31:300', 1); // 头发颜色 = 金发
    f.store.set('talent:31:314', 0); // 种族 = 人类
  });
  // rand 恒 0 → RAND:DICE == 0 每次命中，LOCALS 被最后一个候选覆盖
  const look = mod.fs_bitch(
    'LOOKS',
    31,
    seq_rand(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
  );
  assert.ok(look.includes('的人类'), '种族收尾');
  assert.ok(look.includes('温妮'), '名字收尾');
});

// —— FS_LOG_BITCH 拼接 ——

test('FS_LOG_BITCH：客数/次数拼接（逗号分隔、0 跳过）', () => {
  const { mod } = setup_log();
  assert.equal(
    mod.fs_log_bitch('TOWN_MAN', 1, 0, 2, 0, 0),
    '1人的村民、2人的村里少年',
  );
  assert.equal(mod.fs_log_bitch('PLAYNAME', 0, 0, 0, 0, 3), '3人的性交奉侍');
  assert.equal(mod.fs_log_bitch('DUNGEON_GIRL', 0, 0, 0, 0, 0), '');
});

// —— LOG_TRY_BITCH：与 FI_TRY_BITCH 区分（验收） ——

test('LOG_TRY_BITCH：DUNGEON 勇者分支输出文本、不改任何状态（与 FI_TRY_BITCH 区分）', async () => {
  const { fixture, mod } = setup_log((f) => {
    f.store.set('cflag:31:1', 2); // 侵攻中的勇者
    f.store.set('cflag:31:580', 0);
    f.store.set('cflag:31:581', 0);
    f.store.set('cflag:31:582', 0);
    f.store.set('abl:31:37', 0);
    f.store.set('talent:31:76', 0);
  });
  const before = fixture.store.size;
  await mod.log_try_bitch(31, 'DUNGEON');
  const lines = fixture.text_lines();
  assert.ok(
    lines.some((l) => l.includes('在空闲的时间，')),
    '勇者无中毒/债务 → 空闲',
  );
  assert.ok(
    lines.some((l) => l.includes('考虑着出卖肉体的事。')),
    'LOG_TRY_BITCH 末行',
  );
  assert.equal(fixture.store.size, before, 'LOG_TRY_BITCH 不改状态');
});

test('LOG_TRY_BITCH：DUNGEON 卖春指示（CFLAG:500 == 1）分支「遵照命令，」', async () => {
  const { fixture, mod } = setup_log((f) => {
    f.store.set('cflag:31:1', 0);
    f.store.set('cflag:31:500', 1); // 卖春指示
    f.store.set('talent:31:85', 0);
  });
  await mod.log_try_bitch(31, 'DUNGEON');
  const lines = fixture.text_lines();
  assert.ok(
    lines.some((l) => l.includes('遵照命令，')),
    '卖春指示分支',
  );
});

test('LOG_TRY_BITCH 与 FI_TRY_BITCH 互不混同：LOG 只输出不改状态、FI 只返回不输出', async () => {
  const { fixture, mod } = setup_log((f) => {
    f.store.set('cflag:31:1', 0);
    f.store.set('cflag:31:500', 0);
    f.store.set('abl:31:37', 0);
    f.store.set('talent:31:76', 0);
    f.store.set('cflag:31:580', 0);
    f.store.set('cflag:31:581', 0);
    f.store.set('cflag:31:582', 0);
  });
  // LOG_TRY_BITCH：有输出文本
  await mod.log_try_bitch(31, 'DUNGEON');
  assert.ok(fixture.text_lines().length > 0, 'LOG_TRY_BITCH 输出文本');

  // FI_TRY_BITCH（kojo-dungeon-bitch.js 的玩法抽选）：返回玩法号、不输出
  const bitch = fixture.load_module('kojo/kojo-dungeon-bitch');
  const before = fixture.text_lines().length;
  const play = bitch.fi_try_bitch(31, 'DUNGEON', seq_rand(0));
  assert.equal(typeof play, 'number', 'FI_TRY_BITCH 返回玩法号');
  assert.ok(play >= 0 && play <= 6, '玩法号在 0-6');
  assert.equal(fixture.text_lines().length, before, 'FI_TRY_BITCH 不输出');
});

// —— LOG_AFTER_BITCH：CHECK 位 → 挑玩法/客 → 调 LOG_BITCH_* ——

test('LOG_AFTER_BITCH：CHECK bit6（ANIMAL）→ 调 LOG_BITCH_ANIMAL（DUNGEON 空）', async () => {
  const { fixture, mod } = setup_log();
  // CHECK: bit0(DUNGEON) + bit6(ANIMAL)
  const check = (1 << 0) | (1 << 6);
  await mod.log_after_bitch(31, check, seq_rand(0));
  // LOG_BITCH_ANIMAL DUNGEON 分支为空 → 无输出（仅 WAIT）
  assert.deepEqual(fixture.text_lines(), []);
});

test('LOG_AFTER_BITCH：CHECK bit3+bit1（LES+HAND）女性客 → 调 LOG_BITCH_LES', async () => {
  const { fixture, mod } = setup_log();
  // CHECK: bit0(DUNGEON) + bit3(LES) + bit21(女性客1 淫魔) + bit1(HAND 位也置上以防万一)
  const check = (1 << 0) | (1 << 3) | (1 << 21);
  await mod.log_after_bitch(31, check, seq_rand(0, 0));
  const lines = fixture.text_lines();
  assert.ok(
    lines.some((l) => l.includes('进行着百合卖春...')),
    '调 LOG_BITCH_LES',
  );
});

test('LOG_AFTER_BITCH：CHECK bit5（SEX）+ 男性客 → 调 LOG_BITCH_SEX（非死代码）', async () => {
  const { fixture, mod } = setup_log();
  // CHECK: bit0(DUNGEON) + bit5(SEX) + bit11(男性客1 兽人)
  const check = (1 << 0) | (1 << 5) | (1 << 11);
  await mod.log_after_bitch(31, check, seq_rand(0, 4)); // kyaku=1, play=5
  const lines = fixture.text_lines();
  assert.ok(
    lines.some((l) => l.includes('进行着性交卖春')),
    '调 LOG_BITCH_SEX',
  );
  // DUNGEON_SEX_LOG（死代码）兽人分支不输出「进行着性交卖春」——变异把 SEX
  // 映射换成 dungeon_sex_log 时此断言红（#14 反向变异 M523）
  assert.ok(
    lines.some((l) => l.includes('进行着性交卖春')),
    'LOG_BITCH_SEX 特有文本',
  );
});
// —— 各玩法描写函数 ——

test('LOG_BITCH_HAND：手淫经验分档 + 客台词随机 + 固定文', async () => {
  const { fixture, mod } = setup_log((f) => {
    f.store.set('abl:31:13', 0); // 手淫经验 0
  });
  await mod.log_bitch_hand(31, 'DUNGEON', 1, seq_rand(0));
  const lines = fixture.text_lines();
  assert.ok(
    lines.some((l) => l.includes('公式般地揉搓着肉棒，一脸厌恶地')),
    'ABL:13 == 0 分档',
  );
  assert.ok(
    lines.some((l) => l.includes('客：兽人')),
    'DUNGEON 客名',
  );
  assert.ok(
    lines.some((l) => l.includes('进行着手交卖春...')),
    '固定文',
  );
});

test('LOG_BITCH_ORAL：ABL:32 分档 + TOWN 客台词', async () => {
  const { fixture, mod } = setup_log((f) => {
    f.store.set('abl:31:32', 3);
  });
  await mod.log_bitch_oral(31, 'TOWN', 2, seq_rand(0));
  const lines = fixture.text_lines();
  assert.ok(
    lines.some((l) => l.includes('发出“呷浦呷浦”的下流声音')),
    'ABL:32 3-4 分档',
  );
  assert.ok(
    lines.some((l) => l.includes('客：冒险者')),
    'TOWN 客名',
  );
});

test('LOG_BITCH_SEX：ABL:2 7-8 档 RAND:2 分支', async () => {
  const { fixture, mod } = setup_log((f) => {
    f.store.set('abl:31:2', 7);
    f.store.set('abl:31:14', 5); // 满足 >= 3
  });
  // RAND:2 == 1 → 「上下摆动着那迷人的腰」
  await mod.log_bitch_sex(31, 'DUNGEON', 1, seq_rand(1, 0));
  const lines = fixture.text_lines();
  assert.ok(
    lines.some((l) => l.includes('上下摆动着那迷人的腰')),
    'RAND:2==1 分支',
  );
  assert.ok(
    lines.some((l) => l.includes('进行着性交卖春')),
    '固定文',
  );
});

test('LOG_BITCH_ANIMAL：DUNGEON 空 / TOWN 三行固定文', async () => {
  const { fixture, mod } = setup_log();
  await mod.log_bitch_animal(31, 'DUNGEON');
  assert.deepEqual(fixture.text_lines(), [], 'DUNGEON 分支空');

  await mod.log_bitch_animal(31, 'TOWN');
  const lines = fixture.text_lines();
  assert.ok(
    lines.some((l) => l.includes('在大家的眼前不知羞耻的进行着兽交表演...')),
    'TOWN 第一行',
  );
});

test('LOG_BITCH_SELF：空壳（1:1，源所有 CASE 无输出）', async () => {
  const { fixture, mod } = setup_log();
  await mod.log_bitch_self(31, 'DUNGEON', 1);
  assert.deepEqual(fixture.text_lines(), [], 'LOG_BITCH_SELF 无输出');
});

// —— 三个死代码 _LOG 函数（#14） ——

test('DUNGEON_SEX_LOG/ANAL_LOG/LES_LOG：死代码函数可调用、按 ARG:0 分档输出（#14 判定保留）', async () => {
  const { fixture, mod } = setup_log();
  // 兽人（ARG:0 == 0）
  await mod.dungeon_sex_log(0, seq_rand(0));
  assert.ok(
    fixture.text_lines().some((l) => l.includes('居然能抱着魔王大人的奴隶')),
    'SEX_LOG 兽人分档',
  );
  // 魔族男人（ARG:0 == 1）
  await mod.dungeon_anal_log(1, seq_rand(0));
  assert.ok(
    fixture.text_lines().some((l) => l.includes('尻穴有感觉的变态')),
    'ANAL_LOG 魔族男人分档',
  );
  // 淫魔（ARG:0 == 0）
  await mod.dungeon_les_log(0, seq_rand(0));
  assert.ok(
    fixture.text_lines().some((l) => l.includes('你的精气，我不客气啦♪')),
    'LES_LOG 淫魔分档',
  );
});

// —— 存根清单核对（kojo-dungeon-bitch.js 已删前六项） ——

test('【验收】kojo-dungeon-bitch.js 的 STUBBED_CALLS 已删前六项（真身换接）', () => {
  const fixture = create_era_fixture();
  const mod = fixture.load_module('kojo/kojo-dungeon-bitch');
  const removed = [
    'LOG_TRY_BITCH',
    'LOG_AFTER_BITCH',
    'LOG_BITCH_ANIMAL',
    'LOG_BITCH_SELF',
    'FS_BITCH',
    'FS_LOG_BITCH',
  ];
  for (const name of removed) {
    assert.ok(
      !mod.STUBBED_CALLS.includes(name),
      `STUBBED_CALLS 应已删 ${name}`,
    );
  }
  assert.deepEqual(mod.STUBBED_CALLS, ['KARMA', '强制肉偿']);
});

test('【验收】卖春主流程调用日志真身而非占位行（LOG_TRY_BITCH 真身文本）', async () => {
  const { fixture } = setup_log((f) => {
    f.store.set('base:31:0', 500);
    f.store.set('base:31:1', 500);
    f.store.set('cflag:31:1', 0); // 普通奴隶
    f.store.set('cflag:31:120', 1); // 卖春积极性
    f.store.set('cflag:31:500', 0);
    f.store.set('cflag:31:151', -20); // 客数修正
    f.store.set('abl:31:37', 0);
    f.store.set('exp:31:74', 10);
    f.store.set('flag:10004', 1000);
    f.store.set('exflag:4444', 1000);
  });
  const bitch = fixture.load_module('kojo/kojo-dungeon-bitch');
  await bitch.dungeon_bitch(31, seq_rand(0, 0, 0, 0, 0, 0, 0, 0));
  const lines = fixture.text_lines();
  assert.ok(
    !lines.some((l) => l.includes('LOG_TRY_BITCH')),
    '不再打 LOG_TRY_BITCH 占位行',
  );
  assert.ok(
    lines.some((l) => l.includes('考虑着出卖肉体的事。')),
    'LOG_TRY_BITCH 真身文本出现',
  );
});

// —— #212 返工：魔族少年的性别分档（首版 talent:122 二段恒 undefined，永远走 else 臂）——

test('DUNGEON_ANAL_LOG：魔族少年（ARG:0 == 2）按 TALENT:TARGET:122 分档（两臂分开）', async () => {
  // rand_n(8) === 0 → 第一子分支 :1850/:1852
  const { fixture: f1, mod: m1, era_flag: ef1 } = setup_log();
  ef1.target = 31;
  await m1.dungeon_anal_log(2, seq_rand(0));
  assert.ok(
    f1.text_lines().some((l) => l.includes('姐姐的屁股，真棒')),
    'TALENT:122 未置位 → 姐姐臂（:1852）',
  );

  const { fixture: f2, mod: m2, era_flag: ef2 } = setup_log();
  ef2.target = 31;
  f2.store.set('talent:31:122', 1); // 男人
  await m2.dungeon_anal_log(2, seq_rand(0));
  assert.ok(
    f2.text_lines().some((l) => l.includes('哥哥的屁股，真棒')),
    'TALENT:122 置位 → 哥哥臂（:1850）',
  );
});
