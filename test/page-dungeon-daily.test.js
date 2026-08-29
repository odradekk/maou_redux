/**
 * ere/page/page-dungeon-daily.js @DISPLAY_DUNGEON_DAILY + @CAL_DUNGEON_DAILY
 * 的行为测试（issue #179，H10）。
 *
 * 缝 = test/helpers/era-fixture.js。随机消费经 display_dungeon_daily 的
 * rand 参数注入（counting 断言消费次数与顺序——#176 dungeon-trap.test.js
 * 的先例：随机消费次数是 PRNG 序列兼容性的可观测面）。
 *
 * 验收对应（#179 清单）：
 *   - 奴隶日常的 STORAGE 扫描（空闲 + 爱慕/淫乱）与随机目标；
 *   - 显示行的拼装（类型标签链 + 爱慕日常/淫乱日常）；
 *   - 怪物日常段零输出、地城日常段恒一个空行（768 行原作的真实输出面，
 *     逐段核对见源文件头）；
 *   - @CAL_DUNGEON_DAILY 的威望钳制与每日 -2（原作无调用点、不接线，
 *     函数体直测）。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function load(fixture) {
  return fixture.load_module('page/page-dungeon-daily');
}

/** 最小世界：魔王 0 + 两名候选奴隶（爱慕/淫乱）+ 一名不入选者 */
function setup_world() {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.seed_chara(1, { id: 1, name: '阿尔', callname: '阿尔' });
  fixture.seed_chara(2, { id: 2, name: '贝塔', callname: '贝塔' });
  fixture.seed_chara(3, { id: 3, name: '伽马', callname: '伽马' });
  for (const cid of [0, 1, 2, 3]) {
    fixture.era.addCharacter(cid);
  }
  // 阿尔：空闲 + 爱慕（85）；贝塔：空闲 + 淫乱（76）；伽马：空闲但无标记
  fixture.store.set('talent:1:85', 1);
  fixture.store.set('talent:2:76', 1);
  return fixture;
}

function text_lines(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

/** counting 注入：记录每次掷骰的上界 */
function counting(calls) {
  return (n) => {
    calls.push(n);
    return 0;
  };
}

test('奴隶日常扫描：空闲且爱慕/淫乱者入池，其余不入；计数行照打', () => {
  const fixture = setup_world();
  const calls = [];
  const { display_dungeon_daily } = load(fixture);
  display_dungeon_daily(counting(calls));
  // 池 = [1, 2]（阿尔、贝塔）；伽马不入（无 76/85）、魔王不入
  assert.deepEqual(
    text_lines(fixture).slice(0, 3),
    ['\u3000 Space for further docuement', 'Testing Purpose', '2'],
    '占位头 + 计数 2（STORAGE:0）',
  );
  // 消费序（有候选）：目标掷选(n=2) → 怪物段(49) → 地城段(20)
  assert.deepEqual(calls, [2, 49, 20], '三次随机消费，顺序与上界 1:1');
});

test('随机目标：掷 1 → 池第二人（贝塔），显示行带淫乱日常', () => {
  const fixture = setup_world();
  const { display_dungeon_daily } = load(fixture);
  display_dungeon_daily(() => 1); // 掷选取 1 → STORAGE:2 → 贝塔
  const lines = text_lines(fixture);
  assert.deepEqual(
    lines.slice(3, 6),
    ['Testing Purpose', '2', '贝塔'],
    'Testing Purpose 的掷选值（一位下标）与目标名',
  );
  assert.ok(
    lines.includes('贝塔淫乱日常'),
    '显示行 = 名前 + 类型标签（无）+ 淫乱日常（TALENT:76）',
  );
});

test('爱慕优先于淫乱（:61-65 的 ELSEIF 序）：爱慕奴隶显示爱慕日常', () => {
  const fixture = setup_world();
  fixture.store.set('talent:1:76', 1); // 阿尔同时有爱慕与淫乱
  const { display_dungeon_daily } = load(fixture);
  display_dungeon_daily(() => 0); // 掷 0 → 池第一人（阿尔）
  assert.ok(
    text_lines(fixture).includes('阿尔爱慕日常'),
    'TALENT:85 先判 → 爱慕日常',
  );
});

test('类型标签链：魔物娘（TALENT:220）拼进显示行', () => {
  const fixture = setup_world();
  fixture.store.set('talent:1:220', 1); // 魔物娘
  const { display_dungeon_daily } = load(fixture);
  display_dungeon_daily(() => 0);
  assert.ok(
    text_lines(fixture).includes('阿尔魔物娘爱慕日常'),
    '名前 + 魔物娘 + 爱慕日常',
  );
});

test('性格素质段（160-180）：命中者取 TALENTNAME（最后命中胜）', () => {
  const fixture = setup_world();
  // 夹具不解析名字表（page-dungeon-info.test.js 先例）：直接预置名字值
  fixture.store.set('talentname:163', '高贵');
  fixture.store.set('talentname:170', '自信家');
  fixture.store.set('talent:1:163', 1); // 163 = 高貴（Talent.yml）
  fixture.store.set('talent:1:170', 1); // 170 = 后命中，覆盖前者
  const { display_dungeon_daily } = load(fixture);
  display_dungeon_daily(() => 0);
  assert.ok(
    text_lines(fixture).includes('阿尔自信家爱慕日常'),
    '170 的名字（自信家）覆盖 163（高贵）——原作 FOR 无 BREAK',
  );
});

test('无候选：DAILYTARGET = 0（魔王），两段照常消费随机、显示行是魔王名', () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  const calls = [];
  const { display_dungeon_daily } = load(fixture);
  display_dungeon_daily(counting(calls));
  // 池空：无掷选，直接怪物段(49) + 地城段(20)——原作 IF STORAGE != 0 不进
  assert.deepEqual(calls, [49, 20], '无候选时只有两段消费');
  assert.ok(
    text_lines(fixture).includes('你'),
    'DAILYTARGET = 0 → 显示段读角色 0（原作行为：SIF 守卫只拦 >= CHARANUM）',
  );
});

test('输出面：怪物段零输出、地城段恒一个空行（br 行）', () => {
  const fixture = setup_world();
  const { display_dungeon_daily } = load(fixture);
  display_dungeon_daily(() => 0);
  const brs = fixture.lines_history.filter((line) => line.type === 'br');
  assert.equal(brs.length, 1, '地城日常段的空 PRINTFORML → 恰一个 br');
});

test('CAL_DUNGEON_DAILY：威望 > 100 钳 100 后 -2；未超只 -2', () => {
  const fixture = setup_world();
  const { cal_dungeon_daily } = load(fixture);
  const era_exflag = fixture.load_module('era-utils/era-exflag');
  era_exflag.prestige = 150;
  cal_dungeon_daily();
  assert.equal(era_exflag.prestige, 98, '150 → 钳 100 → -2');
  era_exflag.prestige = 50;
  cal_dungeon_daily();
  assert.equal(era_exflag.prestige, 48, '50 → -2');
});

test('主菜单接线：FLAG:36 = 5 的面板轮尾部打出日程头（#179 起）', () => {
  const fixture = setup_world();
  fixture.store.set('flag:36', 5);
  const menu = fixture.load_module('page/page-main-menu');
  menu.draw_main_menu();
  assert(
    fixture
      .text_lines()
      .some((line) => line.includes('Space for further docuement')),
    'DISPLAY_DUNGEON_DAILY 真身在 draw_dungeon_daily 尾部执行',
  );
  assert(
    !fixture
      .text_lines()
      .some((line) => line.includes('@DISPLAY_DUNGEON_DAILY')),
    '不再打存根占位行',
  );
});
