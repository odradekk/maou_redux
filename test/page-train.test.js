/**
 * ere/page/page-train.js 的行为测试（issue #44：@SHOW_STATUS 骨架 +
 * PRINT_PALAM 引擎内建命令的移植）。
 *
 * 缝 = test/helpers/era-fixture.js。参数条的渲染规则（条形宽度、按等级
 * 爬坡的填充字符、下一阈值为满刻度、3 列布局）以 target/emuera.log 的实机
 * 样本钉死——那是对 PRINT_PALAM 唯一可用的行为证据（EraElectron 没有这条
 * 命令，逐字对拍归 #48）。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara } = require('./helpers/chara');

// Palam.yml 的名字表形状（运行时由引擎装载进 fieldNames/staticData；夹具
// 是平表，用例预置两条寻址键：palamkeys/palamname:i）。0..15 连续、100
// 断档——参数条只取连续段
const PALAM_KEYS = [...Array.from({ length: 16 }, (_, i) => i), 100];
const PALAM_NAMES = [
  '阴核',
  '私处',
  '肛门',
  '润滑',
  '恭顺',
  '欲情',
  '屈服',
  '习得',
  '耻情',
  '苦痛',
  '恐怖',
  '反感',
  '不快',
  '抑郁',
  '乳房',
  '局部',
];

function seed_world(fixture) {
  // 世界底座含魔王（目标行的「调教者:」读主人姓名——真实游戏里角色 0 恒在场）
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.assi = -1;
  fixture.era.beginTrain(0, 31);
  fixture.store.set('palamkeys', PALAM_KEYS);
  PALAM_NAMES.forEach((name, i) => {
    fixture.store.set(`palamname:${i}`, name);
  });
  fixture.load_module('page/page-train');
  return era_flag;
}

async function run_show_status(fixture) {
  const { emit } = fixture.load_module('system/event/registry');
  return emit('SHOW_STATUS');
}

test('palam_level：PALAMLV 默认阈值下的等级判定', () => {
  const fixture = create_era_fixture();
  const { palam_level } = load_module_safe(fixture);
  assert.equal(palam_level(0), 0);
  assert.equal(palam_level(7), 0); // 恭顺 7：不足 100
  assert.equal(palam_level(100), 1);
  assert.equal(palam_level(2915), 2);
  assert.equal(palam_level(5540), 3);
  assert.equal(palam_level(250000), 9); // 最高级
  assert.equal(palam_level(999999), 9);
});

function load_module_safe(fixture) {
  return fixture.load_module('page/page-train');
}

test('PRINT_PALAM：条形渲染与 emuera.log 实机样本逐字一致', () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  const { print_palam } = load_module_safe(fixture);

  // emuera.log 的实机值（SHOW_STATUS 首屏）：覆盖 LV0（抑郁/乳房/恭顺）、
  // LV1（屈服/习得）、LV2（润滑/欲情/耻情）、LV3（阴核/反感）四档填充字符
  const sample = {
    0: 5540, // 阴核 LV3 → *
    3: 2915, // 润滑 LV2 → >
    4: 7, // 恭顺 LV0（0 格填充）
    5: 2425, // 欲情 LV2 → >
    6: 100, // 屈服 LV1 → =
    7: 238, // 习得 LV1 → =
    8: 1724, // 耻情 LV2 → >
    11: 3429, // 反感 LV3 → *
    13: 24, // 抑郁 LV0 → -
    14: 49, // 乳房 LV0 → -
  };
  Object.entries(sample).forEach(([k, v]) => {
    fixture.store.set(`palam:31:${k}`, v);
  });

  print_palam(31);

  // log 原文六行（第 1/2/4 行与实机逐字对照，第 3/5/6 行由同规则推出）
  assert.deepEqual(fixture.text_lines(), [
    '      阴核[*****.....]  5540      私处[..........]     0      肛门[..........]     0',
    '      润滑[>>>>>>>>>.]  2915      恭顺[..........]     7      欲情[>>>>>>>>..]  2425',
    '      屈服[==........]   100      习得[====......]   238      耻情[>>>>>.....]  1724',
    '      苦痛[..........]     0      恐怖[..........]     0      反感[***.......]  3429',
    '      不快[..........]     0      抑郁[--........]    24      乳房[----......]    49',
    '      局部[..........]     0',
  ]);
});

test('PRINT_PALAM：最高等级（LV9）满格；断档序号（100 否定）不渲染', () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  const { print_palam } = load_module_safe(fixture);
  fixture.store.set('palam:31:0', 250000); // LV9

  print_palam(31);

  const first_row = fixture.text_lines()[0];
  assert(first_row.includes('阴核[**********] 250000'));
  assert(
    !fixture.text_lines().some((line) => line.includes('否定')),
    '断档后的 100 号（珠侧专用）不得进参数条',
  );
});

test('@SHOW_STATUS：日期行/目标行/绝顶静默/参数条/存根/清除点，1:1 骨架', async () => {
  const fixture = create_era_fixture();
  const era_flag = seed_world(fixture);
  era_flag.day_count = 0; // 开局：第 1 日

  await run_show_status(fixture);

  const texts = fixture.text_lines();
  // :62-68 {DAY+1}日(午前)——TIME 0
  assert(texts.includes('1日(午前)'));
  // :69 目标行：呼び名 调教中 调教者:主人姓名（浅蓝），行尾三空格
  const header = fixture.lines.find(
    (line) => line.type === 'text' && line.text.includes('调教中'),
  );
  assert(header, '必须渲染目标行');
  assert(header.text.startsWith('温妮 调教中   调教者:'));
  assert(header.text.endsWith('你   '));
  // 主人姓名片段带浅蓝（SETCOLOR 0x87CEFA）
  assert(
    header.content.some(
      (frag) => frag.content === '你' && frag.color === '#87cefa',
    ),
  );
  // :95-124 绝顶计数：EX 全零 → 整段静默
  assert(!texts.some((line) => line.includes('绝顶')));
  // 存根各占位一行（可检索）
  for (const name of [
    'SHOW_EQUIP_2',
    'LIFE_BAR',
    'VITAL_BAR',
    'PRINT_CLOTHTYPE',
    'SHOW_EQUIP_1',
  ]) {
    assert(
      texts.some((line) => line.includes(`@${name}`)),
      `存根 ${name} 必须打印占位行`,
    );
  }
  // :128-142 MAXBASE 修正：目标与主人的射精槽上限缺省补 10000
  assert(
    fixture.var_writes.some(
      (w) => w.name === 'maxbase:31:2' && w.value === 10000,
    ),
  );
  assert(
    fixture.var_writes.some(
      (w) => w.name === 'maxbase:0:2' && w.value === 10000,
    ),
  );
  // :238 SET_CLEAR_POINT：tflag:999 = 当前行数
  const line_count = fixture.era.getLineCount();
  assert(
    fixture.var_writes.some(
      (w) => w.name === 'tflag:999' && w.value === line_count,
    ),
    '清除点必须等于渲染后的行数',
  );
});

test('@SHOW_STATUS：助手调教时目标行换助手名（粉色）', async () => {
  const fixture = create_era_fixture();
  const era_flag = seed_world(fixture);
  join_slave_chara(fixture, 32, '助手桑');
  era_flag.assi = 32;
  era_flag.assiplay = 1; // 助手调教中

  await run_show_status(fixture);

  const header = fixture.lines.find(
    (line) => line.type === 'text' && line.text.includes('调教中'),
  );
  assert(header.text.includes('助手桑 (助手)'));
  // SETCOLOR 0xFF1493 → #ff1493
  assert(
    header.content.some(
      (frag) => frag.content === '助手桑' && frag.color === '#ff1493',
    ),
  );
});

test('存根清单可检索：docs/stub-registry.md 收录本票全部占位名', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = load_module_safe(fixture);
  const registry = fs.readFileSync(
    path.resolve(__dirname, '..', 'docs', 'stub-registry.md'),
    'utf8',
  );

  assert.deepEqual(STUBBED_CALLS, [
    'SHOW_EQUIP_2',
    'LIFE_BAR',
    'VITAL_BAR',
    'PRINT_CLOTHTYPE',
    'SHOW_EQUIP_1',
  ]);
  for (const name of STUBBED_CALLS) {
    assert(registry.includes(name), `存根清单缺少 ${name}`);
  }
});
