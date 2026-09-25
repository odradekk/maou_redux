/**
 * ere/kojo/kojo-dungeon-bitch-log.js 的行为测试（issue #185，H16 卖春记录
 * 与日志分支）。
 *
 * 缝 = test/helpers/era-fixture.js。世界底座与 kojo-dungeon-bitch.test.js
 * 同款（魔王 0 + 温妮 31）。覆盖（逐条对应验收清单）：
 *   - FS_BITCH 文字列函数（PLAY/PLAYNAME/TOWN_MAN/TOWN_GIRL/DUNGEON_MAN/
 *     DUNGEON_GIRL/LOOKS 分档；非法参数抛错）——LOOKS 的 41 行随机覆盖表
 *     表驱动逐行走完（含边界外取值，见该用例头注）；

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
 *
 * 注意 LOG_TRY_BITCH 的整行断言（#600）：该函数没有 rand 形参，首段的
 * %FS_BITCH("LOOKS", ARG)% 走模块级 default_rand，而 LOOKS 的 35 条
 * `overwrite(cond, …)` 都是「条件成立且 RAND:2 == 0 才改写」——**只要夹具
 * 触碰了那些条件里的素质（TALENT:253/255/244/310/313/312/315/204/99/100/256/
 * 21/22/35/15/16/17/12/10/26/23/25/73、ABL:30/31/32/33/37、CFLAG:509），
 * 整行就会有一半概率翻红**。现有用例只置 cflag:1/500/533/580 与
 * talent:76/85、abl:37=0（「好色的/背叛的」来自 :262-266 的无随机追加），
 * 因此是确定性的；往这些用例里补新素质时要一并给 LOOKS 钉随机源。
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
  // 随机源已钉死（全 0）→ 整串确定：发色取 GET_LOOK_INFO、随机覆盖逐次命中、
  // 末尾种族 + 名字拼接（#389 起 GET_LOOK_INFO 的真身在 ere/chara/look-info.js）
  assert.equal(look, '金发的人类的温妮', '发色 + 种族 + 名字的整串');
});

test('FS_BITCH「LOOKS」：41 行 overwrite 表逐行走完（判据取值 × 产出词）', () => {
  // 表驱动：每条数据 = 「只让本行判据为真的预置」＋「该行产出词」＋「源行」。
  // DICE = 2 且注入的随机源恒 0 → 每行的 `RAND:DICE == 0` 恒真，于是只要本行
  // 判据为真、其余为假，locals 就是本行的词（末尾恒拼上「种族的名字」）。
  //
  // 判据用到的 24 个 talent / 1 个 cflag / 6 个 abl 下标全部在 yml 里有名字，
  // 且**每一行的取值在游戏里都造得出来**：素质侧的取值域由 ere/chara/look.js
  // 的分档表写死（310 ∈ {1,20,50,100,150,201}、313 ∈ 1-34、312 ∈ 1-28、
  // 315 ∈ 1-21∪90-93、305 ∈ 1-8，253/255/244/99/100/256/204/35/15/16/17/12/
  // 10/26/23/25/73/21/22 是 0/1 开关），ABL 侧是能力等级（37 的 1-3 与 10、
  // 30-33 的 10），CFLAG:509 由 ere/dungeon/dungeon-room.js:1060 写（迷惑状態）。
  // 没有「造不出来的行」——这一点是把 41 行逐条对着源 :174-:261 核过的。
  //
  // 边界外的三格单列：它们必须**不**命中，用来钉住比较方向与 INRANGE 的上下界
  // （只钉命中值会让 `> 150` 改成 `> 140`、`INRANGE(1,3)` 改成 `(1,4)` 全绿）。
  const cases = [
    // [预置, 期望的 LOCALS 词（不含末尾「种族的名字」）, 源行]
    [{ talent: { 253: 1 } }, '小麦色的', ':174'],
    [{ talent: { 255: 1 } }, '白皙的', ':176'],
    [{ talent: { 244: 1 } }, '青色的', ':178'],
    [{ talent: { 310: 1 } }, '白虎的', ':181'],
    [{ talent: { 310: 201 } }, '阴毛浓密的', ':183'],
    [
      { talent: { 310: 150 } },
      '黑发的',
      ':183 边界外（> 150 不成立，落回发色）',
    ],
    [{ talent: { 313: 7 } }, '毛躁的', ':186'],
    [{ talent: { 313: 9 } }, '翻白眼', ':188'],
    [{ talent: { 313: 10 } }, '歪头', ':190'],
    [{ talent: { 313: 11 } }, '忧郁的样子', ':192'],
    [{ talent: { 313: 14 } }, '鼓腮的', ':194'],
    [{ talent: { 313: 18 } }, '慵懒的', ':196'],
    [{ talent: { 313: 19 } }, '不高兴的', ':198'],
    [{ talent: { 305: 7 } }, '严厉的眼神', ':201'],
    [{ talent: { 312: 10 } }, '手指漂亮的', ':204'],
    [{ talent: { 312: 13 } }, '腰身纤细的', ':206'],
    [{ talent: { 312: 14 } }, '臀部美形的', ':208'],
    [{ talent: { 312: 15 } }, '双腿修长的', ':210'],
    [{ talent: { 312: 22 } }, '艳丽头发的', ':212'],
    [{ talent: { 312: 23 } }, '臀部丰满的', ':214'],
    [{ talent: { 312: 25 } }, '虎牙可爱的', ':216'],
    [{ talent: { 315: 8 } }, '元贵族', ':219'],
    [{ talent: { 315: 12 } }, '元圣女', ':221'],
    [{ talent: { 204: 1 } }, '肉便器', ':223'],
    [{ talent: { 99: 1 } }, '高大的', ':225'],
    [{ talent: { 100: 1 } }, '矮小的', ':227'],
    [{ talent: { 256: 1 } }, '脸色不好的', ':229'],
    [{ talent: { 21: 1 } }, '假正经的', ':231（或的左半）'],
    [{ talent: { 22: 1 } }, '假正经的', ':231（或的右半）'],
    [{ talent: { 35: 1 } }, '害羞的', ':233'],
    [{ talent: { 15: 1 } }, '任性的', ':235（或的左半）'],
    [{ talent: { 16: 1 } }, '任性的', ':235（或的右半）'],
    [{ talent: { 17: 1 } }, '笑容卑屈的', ':237'],
    [{ talent: { 12: 1 } }, '笑容灿烂的', ':239'],
    [{ talent: { 10: 1 } }, '要哭了似的', ':241（或的左半）'],
    [{ talent: { 26: 1 } }, '要哭了似的', ':241（或的右半）'],
    [{ talent: { 23: 1 } }, '开朗的', ':243（或的左半）'],
    [{ talent: { 25: 1 } }, '开朗的', ':243（或的右半）'],
    [{ talent: { 73: 1 } }, '水性杨花的', ':245'],
    [{ cflag: { 509: 1 } }, '迷路的', ':247（CFLAG 不是 TALENT）'],
    [{ cflag: { 509: 2 } }, '黑发的', ':247 边界外（== 1 不成立）'],
    [{ abl: { 37: 1 } }, '卖身寻欢的', ':249（INRANGE 下界）'],
    [{ abl: { 37: 3 } }, '卖身寻欢的', ':249（INRANGE 上界）'],
    [{ abl: { 37: 4 } }, '黑发的', ':249 边界外（出 INRANGE）'],
    [{ abl: { 30: 10 } }, '无法想象没有肉棒的生活的', ':253'],
    [{ abl: { 31: 10 } }, '一有空就不自觉地自慰的', ':255'],
    [{ abl: { 32: 10 } }, '变得非常喜欢腥臭精液的', ':257'],
    [{ abl: { 33: 10 } }, '渴望侵犯女性的', ':259'],
    [{ abl: { 37: 10 } }, '随时随地的渴望着Sexy，变成了欲望的俘虏', ':261'],
    // :264-267 陥落済み（append 型，不是覆盖；发色的初始串还在前面）
    [{ talent: { 76: 1 } }, '黑发的好色的', ':264 淫乱'],
    [{ talent: { 85: 1 } }, '黑发的背叛的', ':266 爱慕'],
    [{}, '黑发的', '一次都没覆盖 → 保留发色串'],
  ];
  for (const [setup, word, ref] of cases) {
    const { mod } = setup_log((f) => {
      for (const [table, entries] of Object.entries(setup)) {
        for (const [idx, value] of Object.entries(entries)) {
          f.store.set(`${table}:31:${idx}`, value);
        }
      }
    });
    assert.equal(
      mod.fs_bitch('LOOKS', 31, seq_rand(0)),
      `${word}人类的温妮`,
      `${ref} → ${word}`,
    );
  }
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

test('#600 LOG_TRY_BITCH：:14..:47 的各分支片段同属一行，输出一条', async () => {
  // 原作 :14「%FS_BITCH("LOOKS", ARG)%」+ 分支片段（:21/:23/:25/:28/:31/:32/:34/
  // :39/:42/:44）+ :47 的 PRINTFORMW 收行是一整行：无后缀 PRINTFORM 不换行。
  // 各分支的判据提到语句外当取值、片段文本留在输出语句里（保真锁按序核对）
  // LOOKS 前缀本身随素质变（ABL:37 卖淫中毒 → 「卖身寻欢的」、TALENT:85 →
  // 「背叛的」），逐例钉死整行
  const cases = [
    [
      'DUNGEON 勇者·无中毒/无债务',
      'DUNGEON',
      { 'cflag:31:1': 2 },
      '黑发的人类的温妮在空闲的时间，考虑着出卖肉体的事。',
    ],
    [
      'DUNGEON 勇者·淫乱',
      'DUNGEON',
      { 'cflag:31:1': 2, 'talent:31:76': 1 },
      '黑发的好色的人类的温妮无法压抑自己的性欲，考虑着出卖肉体的事。',
    ],
    [
      'DUNGEON 勇者·负债',
      'DUNGEON',
      { 'cflag:31:1': 2, 'cflag:31:580': -6000 },
      '黑发的人类的温妮对于借款只减少了一点点感到不满，考虑着出卖肉体的事。',
    ],
    [
      'DUNGEON 瞒着同伴偷偷的',
      'DUNGEON',
      { 'cflag:31:1': 3, 'cflag:31:533': 2 },
      '黑发的人类的温妮瞒着同伴偷偷的考虑着出卖肉体的事。',
    ],
    [
      'DUNGEON 卖春指示·被强迫',
      'DUNGEON',
      { 'cflag:31:500': 1, 'talent:31:85': 1 },
      '黑发的背叛的人类的温妮被强迫遵照命令，考虑着出卖肉体的事。',
    ],
    [
      'DUNGEON 卖春指示·未被强迫',
      'DUNGEON',
      { 'cflag:31:500': 1 },
      '黑发的人类的温妮遵照命令，考虑着出卖肉体的事。',
    ],
    [
      'DUNGEON それ以外',
      'DUNGEON',
      {},
      '黑发的人类的温妮无法压抑自己的性欲，考虑着出卖肉体的事。',
    ],
    [
      'TOWN 淫乱',
      'TOWN',
      { 'talent:31:76': 1 },
      '黑发的好色的人类的温妮无法压抑自己的性欲，考虑着出卖肉体的事。',
    ],
    [
      'TOWN 负债',
      'TOWN',
      { 'cflag:31:580': -6000 },
      '黑发的人类的温妮由于高额的债务，不由得开始考虑着出卖肉体的事。',
    ],
    [
      'TOWN それ以外',
      'TOWN',
      {},
      '黑发的人类的温妮冒险资金花光了，考虑着出卖肉体的事。',
    ],
  ];
  for (const [name, place, stores, line] of cases) {
    const { fixture, mod } = setup_log((f) => {
      f.store.set('cflag:31:1', 0);
      f.store.set('cflag:31:500', 0);
      f.store.set('cflag:31:580', 0);
      f.store.set('cflag:31:581', 0);
      f.store.set('cflag:31:582', 0);
      f.store.set('abl:31:37', 0);
      f.store.set('talent:31:76', 0);
      for (const [key, value] of Object.entries(stores))
        f.store.set(key, value);
    });
    await mod.log_try_bitch(31, place);
    assert.deepEqual(fixture.text_lines(), [line], name);
  }
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
  // LOG_TRY_BITCH：整行文本逐字钉死（随机源已钉死，取值是确定的；原来只查
  // 「有输出」，把整段文本放掉了）。首段是 FS_BITCH 的 LOOKS 分档——
  // #389 起它的 GET_LOOK_INFO 真身在 ere/chara/look-info.js。
  // #600 起 :14..:47 是同一行（无后缀 PRINTFORM 不换行），输出恰好一条
  await mod.log_try_bitch(31, 'DUNGEON');
  assert.deepEqual(
    fixture.text_lines(),
    ['黑发的人类的温妮无法压抑自己的性欲，考虑着出卖肉体的事。'],
    'LOG_TRY_BITCH 的整段输出',
  );

  // FI_TRY_BITCH（kojo-dungeon-bitch.js 的玩法抽选）：返回玩法号、不输出。
  // seq_rand(0) 下玩法号是确定值，钉精确值而不是 0-6 的区间
  const bitch = fixture.load_module('kojo/kojo-dungeon-bitch');
  const before = fixture.text_lines().length;
  const play = bitch.fi_try_bitch(31, 'DUNGEON', seq_rand(0));
  assert.equal(play, 1, 'FI_TRY_BITCH 返回玩法号（seq_rand(0) → 1）');
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
  // #584：原作 :1459（PRINTFORM %SAVESTR:ARG%）与 :1464（PRINTFORMW …）同一行
  assert.ok(
    lines.includes('温妮在大家的眼前不知羞耻的进行着兽交表演...'),
    'TOWN 首行是名字 + 固定文的整行（#584）',
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

test('【验收】kojo-dungeon-bitch.js 的 STUBBED_CALLS 已清空（真身换接）', () => {
  const fixture = create_era_fixture();
  const mod = fixture.load_module('kojo/kojo-dungeon-bitch');
  const removed = [
    'LOG_TRY_BITCH',
    'LOG_AFTER_BITCH',
    'LOG_BITCH_ANIMAL',
    'LOG_BITCH_SELF',
    'FS_BITCH',
    'FS_LOG_BITCH',
    // #544：强制肉偿换真身（ere/kojo/kojo-forced-payment.js）
    '强制肉偿',
  ];
  for (const name of removed) {
    assert.ok(
      !mod.STUBBED_CALLS.includes(name),
      `STUBBED_CALLS 应已删 ${name}`,
    );
  }
  assert.deepEqual(mod.STUBBED_CALLS, []);
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

// —— GET_LOOK_INFO 的用例已随实现搬到 test/look.test.js（#389） ——
//
// 本文件此前内联了该函数的 11 个子集 kind 实现，并以 mod.get_look_info 断言；
// #389 把整函数搬进 ere/chara/look-info.js，断言随之搬家，这里的 5 条回归
// 用例（种族2 映射与 $N 回落、种族12 精英切换、性格两段优先与 [160,179) 开闭、
// 婚史压缩码各分支）在 test/look.test.js 的表驱动用例里逐条有对应。

// —— #624：五个卖春玩法描写的「名字 + 经验分档 + 固定文」合回一整行 ——
//
// 原作 :386..:403（HAND）/:559..:574（ORAL）/:729..:744（LES）/
// :943..:960（ANAL）/:1182..:1207（SEX）各是一整行：开场 `%SAVESTR:ARG%`
// 与 SELECTCASE 分档文案都是无后缀 PRINTFORM（不换行），到末段的 PRINTFORMW
// 才收行。合并后整行必须恰好占一条输出——**旧的 `.some(includes(片段))`
// 断言拆回多条照样绿**，所以这里的每条用例都钉 `text_lines()[0]` 的整串。

test('#624 LOG_BITCH_HAND：:386+:389+:391+:393+:395+:397+:399+:401+:403 是一行', async () => {
  const cases = [
    [0, '公式般地揉搓着肉棒，一脸厌恶地'],
    [1, '面对眼前的肉棒，垂下了双眼害羞地'],
    [2, '看着客人的肉棒，一脸不开心的'],
    [3, '一边看着客人的反应，一边'],
    [4, '一边看着客人的反应，一边'],
    [5, '看着客人勃起时的反应，很高兴的'],
    [6, '看着客人勃起时的反应，很高兴的'],
    [7, '不时微笑着'],
    [8, '不时微笑着'],
    [9, '娴熟的说着隐晦的淫词'],
    [10, '娴熟的说着隐晦的淫词'],
    [11, ''], // 档位外：SELECTCASE 无 default，不加任何前缀
  ];
  for (const [abl13, prefix] of cases) {
    const { fixture, mod } = setup_log((f) => {
      f.store.set('abl:31:13', abl13);
    });
    await mod.log_bitch_hand(31, 'DUNGEON', 1, seq_rand(0));
    assert.equal(
      fixture.text_lines()[0],
      `温妮${prefix}进行着手交卖春...`,
      `LOG_BITCH_HAND 整行（#624），ABL:13 = ${abl13}`,
    );
  }
});

test('#624 LOG_BITCH_ORAL：:559+:562+:564+:566+:568+:570+:572+:574 是一行', async () => {
  const cases = [
    [0, '看着顶到鼻尖的肉棒，脸色发青的'],
    [1, '艰难的适应着肉棒的气味和味道'],
    [2, '艰难的适应着肉棒的气味和味道'],
    [3, '发出“呷浦呷浦”的下流声音'],
    [4, '发出“呷浦呷浦”的下流声音'],
    [5, '愉悦的享受着肉棒的味道'],
    [6, '愉悦的享受着肉棒的味道'],
    [7, '带着轻松愉快的表情'],
    [8, '带着轻松愉快的表情'],
    [9, '用积极又不太过冒犯的态度'],
    [10, '用积极又不太过冒犯的态度'],
    [11, ''], // 档位外
  ];
  for (const [abl32, prefix] of cases) {
    const { fixture, mod } = setup_log((f) => {
      f.store.set('abl:31:32', abl32);
    });
    await mod.log_bitch_oral(31, 'TOWN', 2, seq_rand(0));
    assert.equal(
      fixture.text_lines()[0],
      `温妮${prefix}进行着收费口交...`,
      `LOG_BITCH_ORAL 整行（#624），ABL:32 = ${abl32}`,
    );
  }
});

test('#624 LOG_BITCH_LES：:729+:732+:734+:736+:738+:740+:742+:744 是一行', async () => {
  const cases = [
    [0, '“明明知道不会插进来的”这样喃喃自语着'],
    [1, '一点点兴奋了起来'],
    [2, '一点点兴奋了起来'],
    [3, '用发出黏着水声的小穴'],
    [4, '用发出黏着水声的小穴'],
    [5, '毫不掩饰自己的兴奋'],
    [6, '毫不掩饰自己的兴奋'],
    [7, '呼喊着不成体统的话语'],
    [8, '呼喊着不成体统的话语'],
    [9, '忘记了时间，一次又一次的和客人缠绵着'],
    [10, '忘记了时间，一次又一次的和客人缠绵着'],
    [11, ''], // 档位外
  ];
  for (const [abl33, prefix] of cases) {
    const { fixture, mod } = setup_log((f) => {
      f.store.set('abl:31:33', abl33);
    });
    await mod.log_bitch_les(31, 'DUNGEON', 1, seq_rand(0));
    assert.equal(
      fixture.text_lines()[0],
      `温妮${prefix}进行着百合卖春...`,
      `LOG_BITCH_LES 整行（#624），ABL:33 = ${abl33}`,
    );
  }
});

test('#624 LOG_BITCH_ANAL：:943+:946+:948+:950+:952+:954+:956+:958+:960 是一行', async () => {
  const cases = [
    [0, '拼命忍耐着痛苦'],
    [1, '用经验不多的肠道'],
    [2, '因为快乐露出了破绽，依然'],
    [3, '用充分开发后的尻穴'],
    [4, '用充分开发后的尻穴'],
    [5, '紧锁着不知道用了多少次，已经变成了不逊于小穴的性器'],
    [6, '紧锁着不知道用了多少次，已经变成了不逊于小穴的性器'],
    [7, '不停地摆动着屁股'],
    [8, '不停地摆动着屁股'],
    [9, '完完全全地沉溺在了H的快感之中'],
    [10, '完完全全地沉溺在了H的快感之中'],
    [11, ''], // 档位外
  ];
  for (const [abl3, prefix] of cases) {
    const { fixture, mod } = setup_log((f) => {
      f.store.set('abl:31:3', abl3);
    });
    await mod.log_bitch_anal(31, 'DUNGEON', 1, seq_rand(0));
    assert.equal(
      fixture.text_lines()[0],
      `温妮${prefix}进行着肛交卖春...`,
      `LOG_BITCH_ANAL 整行（#624），ABL:3 = ${abl3}`,
    );
  }
});

test('#624 LOG_BITCH_SEX：:1182+:1185+:1187+:1189+:1191+:1193+:1196+:1198+:1202+:1204+:1207 是一行', async () => {
  // 7-8/9-10 两档内还有 `RAND:2 == 1 && ABL:14 >= N` 的 IF——RAND 抽数是
  // 有状态的，只能留在档位判据内惰性求值，因此后两档的用例给出首抽值
  const cases = [
    [0, 0, 0, '拼命忍耐着痛苦'],
    [1, 0, 0, '用经验不多的阴道'],
    [2, 0, 0, '沉浸在快乐之中'],
    [3, 0, 0, '用已经完完全全的开发了小穴'],
    [4, 0, 0, '用已经完完全全的开发了小穴'],
    [5, 0, 0, '用饱经疼爱经验丰富的小穴'],
    [6, 0, 0, '用饱经疼爱经验丰富的小穴'],
    [7, 3, 1, '上下摆动着那迷人的腰'],
    [7, 3, 0, '不知道是第几次高潮了'],
    [7, 2, 1, '不知道是第几次高潮了'], // ABL:14 < 3
    [8, 5, 1, '上下摆动着那迷人的腰'],
    [9, 5, 1, '用像要扭断一样的气势挥动着腰'],
    [9, 5, 0, '比起客人那边更疯狂的高潮着'],
    [9, 4, 1, '比起客人那边更疯狂的高潮着'], // ABL:14 < 5
    [10, 9, 1, '用像要扭断一样的气势挥动着腰'],
    [11, 0, 0, ''], // 档位外
  ];
  for (const [abl2, abl14, first, prefix] of cases) {
    const { fixture, mod } = setup_log((f) => {
      f.store.set('abl:31:2', abl2);
      f.store.set('abl:31:14', abl14);
    });
    await mod.log_bitch_sex(31, 'DUNGEON', 1, seq_rand(first, 0));
    assert.equal(
      fixture.text_lines()[0],
      `温妮${prefix}进行着性交卖春`,
      `LOG_BITCH_SEX 整行（#624），ABL:2 = ${abl2}, ABL:14 = ${abl14}, 首抽 = ${first}`,
    );
  }
});
