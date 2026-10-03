/**
 * ere/page/page-train.js 的行为测试（issue #44：SHOW_STATUS 骨架 +
 * PRINT_PALAM 的移植；#74：整页画面组件 + 原生进度条换表现层）。
 *
 * 缝 = test/helpers/era-fixture.js。#74 起参数条是 printMultiColumns 的
 * progress 格——语义值（参数名/palam 原值）与表现（percentage）的分离
 * 在这里固定：数值对齐 emuera.log 实机样本，百分比按「下一等级阈值」
 * 手算基线（不镜像实现），行分组按 #68 的 Row 的计法（一次调用 3 格＝1 Row）。
 */

const assert = require('node:assert/strict');
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

test('PRINT_PALAM：16 格原生进度条——条内名、条后数值与样本对齐，percentage 手算基线', () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  const { print_palam } = load_module_safe(fixture);

  // emuera.log 的实机值（SHOW_STATUS 首屏样本的条后数值）
  const sample = {
    0: 5540, // 阴核 LV3
    3: 2915, // 润滑 LV2
    4: 7, // 恭顺 LV0
    5: 2425, // 欲情 LV2
    6: 100, // 屈服 LV1
    7: 238, // 习得 LV1
    8: 1724, // 耻情 LV2
    11: 3429, // 反感 LV3
    13: 24, // 抑郁 LV0
    14: 49, // 乳房 LV0
  };
  Object.entries(sample).forEach(([k, v]) => {
    fixture.store.set(`palam:31:${k}`, v);
  });

  print_palam(31);

  // 全部条目是 progress 记录（手绘合成串已退役——ere 侧不再合成网格行文本）
  const progress = fixture.lines;
  assert.equal(progress.length, 16);
  assert.ok(progress.every((l) => l.type === 'progress'));
  // 语义值：键＝条内文字（参数名）、值＝条后数值（右对齐宽 5，log 同款）
  assert.deepEqual(
    progress.map((l) => [l.text, l.out]),
    [
      ['阴核', '\u00A05540'],
      ['私处', '\u00A0\u00A0\u00A0\u00A00'],
      ['肛门', '\u00A0\u00A0\u00A0\u00A00'],
      ['润滑', '\u00A02915'],
      ['恭顺', '\u00A0\u00A0\u00A0\u00A07'],
      ['欲情', '\u00A02425'],
      ['屈服', '\u00A0\u00A0100'],
      ['习得', '\u00A0\u00A0238'],
      ['耻情', '\u00A01724'],
      ['苦痛', '\u00A0\u00A0\u00A0\u00A00'],
      ['恐怖', '\u00A0\u00A0\u00A0\u00A00'],
      ['反感', '\u00A03429'],
      ['不快', '\u00A0\u00A0\u00A0\u00A00'],
      ['抑郁', '\u00A0\u00A0\u00A024'],
      ['乳房', '\u00A0\u00A0\u00A049'],
      ['局部', '\u00A0\u00A0\u00A0\u00A00'],
    ],
  );
  // 表现：percentage＝100×值/下一等级阈值（手算基线：LV0/100、LV1/500、
  // LV2/3000、LV3/10000；不取整——手绘字符条按 floor(10*值/阈值) 填格的写法没有等价物）
  const expected_pct = {
    阴核: 55.4,
    私处: 0,
    肛门: 0,
    润滑: 2915 / 30,
    恭顺: 7,
    欲情: 2425 / 30,
    屈服: 20,
    习得: 47.6,
    耻情: 1724 / 30,
    苦痛: 0,
    恐怖: 0,
    反感: 34.29,
    不快: 0,
    抑郁: 24,
    乳房: 49,
    局部: 0,
  };
  progress.forEach((l) => {
    assert.ok(
      Math.abs(l.percentage - expected_pct[l.text]) < 1e-9,
      `${l.text} 的 percentage 应为 ${expected_pct[l.text]}，实得 ${l.percentage}`,
    );
  });
  // Row 分组：一次 printMultiColumns 3 格＝1 Row（#68 标准），16 格 → 6 行
  assert.deepEqual(
    progress.map((l) => l.row),
    [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5],
  );
});

test('PRINT_PALAM：最高等级（LV9）满档 100；断档序号（100 否定）不渲染', () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  const { print_palam } = load_module_safe(fixture);
  fixture.store.set('palam:31:0', 250000); // LV9

  print_palam(31);

  const first = fixture.lines[0];
  assert.equal(first.type, 'progress');
  assert.equal(first.text, '阴核');
  assert.equal(first.percentage, 100); // LV9 无下一阈值 → 满档
  assert.equal(first.out, '250000');
  assert(
    !fixture.lines.some((l) => l.text === '否定'),
    '断档后的 100 号（珠侧专用）不得进参数条',
  );
});

test('PRINT_PALAM：条后数值列必须真实渲染（barWidth<24——引擎缺省 24 吞掉数值列）', () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  const { print_palam } = load_module_safe(fixture);

  print_palam(31);

  // #74 发回：app.vue 渲染层 el-col :span="24 - barWidth"——barWidth=24 时
  // span=0（display:none），**条后数值整列不渲染，而 24 正是引擎缺省值**。
  // 两个已知破坏形式（PALAM_PROGRESS_BAR_WIDTH 改 24 / 删掉 config 整行
  // 吃缺省）都使 out_visible 翻 false，本用例当场红——夹具已把引擎公式
  // 镜像进记录（bar_width/out_visible，见 test/fixture.test.js 的镜像用例）。
  const bars = fixture.lines;
  assert.ok(bars.length === 16);
  assert.ok(
    bars.every((l) => Number.isInteger(l.bar_width) && l.bar_width >= 1),
    'bar_width 必须物化进记录（缺省 24 也得是数字，不是 undefined）',
  );
  assert.ok(
    bars.every((l) => l.bar_width < 24),
    'barWidth＝24 时数值列 el-col-0 不渲染——参数条的数值承载不得被吞',
  );
  assert.ok(
    bars.every((l) => l.out_visible === true),
    '每格的条后数值（palam 原值）必须真实渲染——它是比对与玩家共用的语义值',
  );
});

test('SHOW_STATUS：日期行/目标行/绝顶静默/参数条/存根，保留实现的骨架', async () => {
  const fixture = create_era_fixture();
  const era_flag = seed_world(fixture);
  era_flag.day_count = 0; // 开局：第 1 日

  await run_show_status(fixture);

  const texts = fixture.text_lines();
  // {DAY+1}日(午前)——TIME 0
  assert(texts.includes('1日(午前)'));
  // 目标行：呼び名 调教中 调教者:主人姓名（浅蓝），行尾三空格
  const header = fixture.lines.find(
    (line) => line.type === 'text' && line.text.includes('调教中'),
  );
  assert(header, '必须渲染目标行');
  assert(header.text.startsWith('温妮 调教中\u00A0\u00A0\u00A0调教者:'));
  assert(header.text.endsWith('你   '));
  // 主人姓名片段带浅蓝（SETCOLOR 0x87CEFA）
  assert(
    header.content.some(
      (frag) => frag.content === '你' && frag.color === '#87cefa',
    ),
  );
  // 绝顶计数：EX 全零 → 整段静默
  assert(!texts.some((line) => line.includes('绝顶')));
  // SHOW_EQUIP_1/2 自 #390 起是真身（ere/page/components/chara-equip-status.js）：
  // 本世界没有任何 TEQUIP/TFLAG 位 → SHOW_EQUIP_2 只打一个空格、SHOW_EQUIP_1
  // 整段静默（条件不成立）
  assert(
    !texts.some((line) => line.startsWith('使用中(')),
    '无装备位时 SHOW_EQUIP_1 整段不出（含头行）',
  );
  // PRINT_CLOTHTYPE 自 #215（J5）起为真身：本世界未播种服装 → 【全裸】
  //（FLAG:37 缺省 0 时 clothtype_text 的早退路径）
  assert(
    texts.some((line) => line === '【全裸】'),
    '服装表示行为【全裸】（着衣模式关）',
  );
  // LIFE_BAR/VITAL_BAR（#212）：maxbase 未播种时静默（MAXBASE <= 0
  // 的检查）——温妮世界没播 maxbase:31:0/1，两条都不出
  assert(
    !fixture.lines.some(
      (line) => line.type === 'progress' && line.text === '体力',
    ),
    'maxbase:31:0 未播种（<= 0）时不得渲染体力条',
  );
  assert(
    !fixture.lines.some(
      (line) => line.type === 'progress' && line.text === '气力',
    ),
    'maxbase:31:1 未播种（<= 0）时不得渲染气力条',
  );
  // MAXBASE 修正：目标与主人的射精槽上限缺省补 10000
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
  // 换屏（#722）后画面只留本屏：渲染完的行数即状态画面自身的行数，
  // 不再写「清除点行号」一类的锚点（画面组件随 #724 删除）
  assert.equal(
    fixture.var_writes.filter((w) => w.name === 'tflag:999').length,
    0,
    '换屏方案下 SHOW_STATUS 不写清除点',
  );
});

test('SHOW_STATUS：助手调教时目标行换助手名（粉色）', async () => {
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

// —— #722：SHOW_STATUS 每轮换屏（ADR-0009） ——

test('SHOW_STATUS 换屏：无效输入轮整屏清空后重画（菜单与回显已被输入消费）', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  await run_show_status(fixture);
  const block_rows = fixture.era.getLineCount();

  // 模拟一轮无效输入：调教菜单（usercom）的菜单行 + input 回显（各占 Row）——
  // 两者都已被那一次输入消费，换屏清掉它们不构成未读输出
  fixture.era.print('指令菜单占位');
  fixture.set_inputs(777);
  await fixture.era.input();
  assert(fixture.era.getLineCount() > block_rows);

  await run_show_status(fixture); // 无指令路径（EVENTCOM 未发）→ 换屏后重画

  // 整屏清空后行数回到块自身：画面只有这一屏的状态画面
  assert.equal(fixture.era.getLineCount(), block_rows);
  assert(!fixture.text_lines().includes('指令菜单占位'), '旧菜单行应被清掉');
  // 「发生过什么」记录在行史（取证层）
  assert(fixture.lines_history.some((l) => l.text === '指令菜单占位'));
  // 菜单与回显已被那一次输入按键消费：换屏没有抹掉未读输出
  assert.deepEqual(fixture.unread_output_clears, []);
});
test('SHOW_STATUS 换屏：指令轮的叙述须先经按键确认再被清（ADR-0009）', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  const { emit } = fixture.load_module('system/event/registry');
  await run_show_status(fixture);

  // 模拟一轮指令执行：叙述与算式行（SOURCE_CHECK 一族的输出）在菜单输入
  // 之后打印、未按键确认——换屏（EVENTCOM 后的下一轮 SHOW_STATUS）清掉
  // 它们就是「抹掉玩家还没读的输出」
  fixture.era.print('「哈呜、温妮、可是，一心地，想要杀了……」');
  fixture.era.print('阴核  5240+   300       =  5540');
  await emit('EVENTCOM');

  await run_show_status(fixture); // 指令轮 → 换屏

  // 未经确认的输出被整屏清空：夹具的未读输出检查必须报出（哪段输出缺
  // 等键，就在那段输出末尾补——不在换屏入口里补）
  assert(
    fixture.unread_output_clears.some((e) => e.text.includes('「哈呜、温妮')),
    '未按键确认的叙述被换屏清掉时必须报出',
  );
  assert(
    fixture.unread_output_clears.some((e) => e.text.includes('阴核  5240+')),
    '未按键确认的算式行被换屏清掉时必须报出',
  );
  // 叙述已被清掉但行史保留（取证层）
  assert(fixture.lines_history.some((l) => l.text.includes('「哈呜、温妮')));

  // 对照：同款叙述先等键再换屏——合法清屏，不新增未读记录
  const reported = fixture.unread_output_clears.length;
  fixture.era.print('「读完按了键的叙述」');
  await fixture.era.waitAnyKey();
  await run_show_status(fixture);
  assert.equal(
    fixture.unread_output_clears.length,
    reported,
    '按键确认过的输出被换屏清掉不报未读',
  );
  assert(!fixture.text_lines().includes('「读完按了键的叙述」'));
});

test('SHOW_STATUS 换屏：重复执行同一指令同样换屏（每轮都只留当前一屏）', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  const { emit } = fixture.load_module('system/event/registry');
  await run_show_status(fixture);

  // 两轮同指令（爱抚→爱抚）：每轮 SHOW_STATUS 都换屏，不存在「同指令轮
  // 追加」的分支
  fixture.era.print('「第一轮的叙述行」');
  await emit('EVENTCOM');
  await run_show_status(fixture); // 第一轮：换屏（清掉第一轮叙述）
  fixture.era.print('「第二轮的叙述行」');
  await emit('EVENTCOM');
  await run_show_status(fixture); // 第二轮（同指令）：同样换屏

  // 画面只留当前一屏：两轮叙述都不在屏（各被自己那轮之后的换屏清掉）
  assert(
    !fixture.text_lines().includes('「第一轮的叙述行」'),
    '上一轮叙述应已被换屏清掉',
  );
  assert(
    !fixture.text_lines().includes('「第二轮的叙述行」'),
    '重复同指令的叙述同样被换屏清掉',
  );
  // 两轮叙述都在行史（发生过什么的取证层）
  assert(fixture.lines_history.some((l) => l.text === '「第一轮的叙述行」'));
  assert(fixture.lines_history.some((l) => l.text === '「第二轮的叙述行」'));
});
test('SHOW_STATUS 换屏：再次进调教时上一屏内容不残留（无会话态可失效）', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  const { emit } = fixture.load_module('system/event/registry');

  // 会话 1（零指令局）：EVENTTRAIN → SHOW_STATUS
  await emit('EVENTTRAIN');
  await emit('SHOW_STATUS');

  // 出调教、进商店：屏幕上是商店内容（主菜单重绘的消费样式）
  await fixture.era.clear();
  for (let i = 0; i < 10; i += 1) {
    fixture.era.print(`商店主菜单占位行${i}`);
  }

  // 会话 2：再次进调教。SHOW_STATUS 每轮无条件整屏清空——不存在跨会话
  // 复用的基准点，上一屏的商店内容天然不残留
  await emit('EVENTTRAIN');
  await emit('SHOW_STATUS');

  assert(
    !fixture.text_lines().some((t) => t.includes('商店主菜单占位行')),
    '再次进调教时上一屏内容必须被换屏清掉',
  );
  assert(
    fixture.text_lines().some((t) => t.includes('调教中')),
    '本局的状态画面目标行应在屏',
  );
});

// —— #212：基础条（life_bar/vital_bar）与射精/母乳/触手槽条段 ——

/** 找指定条内文字的 progress 记录 */
function find_bar(fixture, label) {
  return fixture.lines.find(
    (line) => line.type === 'progress' && line.text === label,
  );
}

/** 同名条的全部记录（自调教等场景主人段/目标段同名，按条数区分） */
function fixture_bars(fixture, label) {
  return fixture.lines.filter(
    (line) => line.type === 'progress' && line.text === label,
  );
}

test('LIFE_BAR/VITAL_BAR：数值宽 4、(cur/max) 语义值、濒死/死亡/气力０缀标', async () => {
  const fixture = create_era_fixture();
  const era_flag = seed_world(fixture);
  era_flag.day_count = 0;
  // MAXBASE <= 0 的静默检查由骨架测试反向钉住；这里播种后必须渲染
  fixture.store.set('maxbase:31:0', 2000);
  fixture.store.set('base:31:0', 1445);
  fixture.store.set('maxbase:31:1', 2000);
  fixture.store.set('base:31:1', 360);

  await run_show_status(fixture);

  const life = find_bar(fixture, '体力');
  assert.ok(life, '体力条必须渲染（MAXBASE > 0）');
  assert.equal(life.out, '(1445/2000)');
  assert.equal(life.percentage, (100 * 1445) / 2000);
  assert.ok(life.out_visible, '语义值（条后文字）必须真实渲染（barWidth<24）');
  const vital = find_bar(fixture, '气力');
  assert.equal(
    vital.out,
    '(\u00A0360/2000)',
    'VITAL 数值右对齐宽 4（{BASE:1,4}）',
  );

  // 濒死（< 500）/死亡（< 0，按 0 渲染）/气力０（<= 0）缀标
  const cases = [
    {
      base: 'base:31:0',
      val: 400,
      label: '体力',
      out: '(\u00A0400/2000)★濒死★',
    },
    {
      base: 'base:31:0',
      val: -5,
      label: '体力',
      out: '(\u00A0\u00A0\u00A00/2000)★死亡★',
    },
    {
      base: 'base:31:1',
      val: 0,
      label: '气力',
      out: '(\u00A0\u00A0\u00A00/2000)★气力０★',
    },
  ];
  for (const c of cases) {
    const f2 = create_era_fixture();
    const ef2 = seed_world(f2);
    ef2.day_count = 0;
    f2.store.set('maxbase:31:0', 2000);
    f2.store.set('maxbase:31:1', 2000);
    f2.store.set(c.base, c.val);
    await run_show_status(f2);
    assert.equal(
      find_bar(f2, c.label).out,
      c.out,
      `${c.label}=${c.val} 的条后文字`,
    );
  }
});

test('射精（主人）：121/122 检查、TALENT:135 无 ≥2000 分支（与助手/目标不同）、自调教不显示', async () => {
  // 基线世界：主人男人（122）、目标 31 无阴茎侧素质
  const base_world = (fixture) => {
    const era_flag = seed_world(fixture);
    era_flag.day_count = 0;
    fixture.store.set('talent:0:122', 1);
    fixture.store.set('maxbase:0:2', 10000);
    fixture.store.set('base:0:2', 2500);
    return era_flag;
  };

  const f1 = create_era_fixture();
  base_world(f1);
  await run_show_status(f1);
  const bar = find_bar(f1, '射精（你）');
  assert.ok(bar, '主人（男人）的射精条必须渲染');
  assert.equal(bar.out, '(2500/10000)');

  // 条件 (TALENT:135 || (135 && BASE>=2000)) == 0 ≡ !135——主人独缺
  // ≥2000 分支：135 置位时即便 BASE >= 2000 也不显示（三处检查的差异本体）
  const f2 = create_era_fixture();
  base_world(f2);
  f2.store.set('talent:0:135', 1); // 未熟
  await run_show_status(f2);
  assert.equal(
    find_bar(f2, '射精（你）'),
    undefined,
    '主人档 TALENT:135 置位即不显示（无 ≥2000 分支）',
  );

  // TARGET != MASTER：自调教（target = 0）时主人段不显示；但目标段
  // 的检查不含此条件——目标=主人时按主人自己的素质照渲染一条同名条，
  // 故「射精（你）」恰一条（来自目标段），不是两条
  const f3 = create_era_fixture();
  const ef3 = base_world(f3);
  ef3.target = 0;
  await run_show_status(f3);
  assert.equal(
    fixture_bars(f3, '射精（你）').length,
    1,
    '自调教：主人段抑制、目标段照渲染 → 恰一条',
  );

  // 避孕套（TEQUIP:35）
  const f4 = create_era_fixture();
  base_world(f4);
  f4.store.set('tequip:31:35', 1); // 目标的避孕套槽（省略位 == TARGET）
  await run_show_status(f4);
  assert.equal(find_bar(f4, '射精（你）').out, '(2500/10000)避孕套使用中');

  // 无阴茎侧素质（121/122 皆无）不显示
  const f5 = create_era_fixture();
  base_world(f5);
  f5.store.set('talent:0:122', 0);
  await run_show_status(f5);
  assert.equal(find_bar(f5, '射精（你）'), undefined);
});

test('射精（目标）：TALENT:135 的 ≥2000 分支放行（与主人档对照）', async () => {
  const seed = (fixture) => {
    const era_flag = seed_world(fixture);
    era_flag.day_count = 0;
    fixture.store.set('talent:31:121', 1); // 扶她
    fixture.store.set('talent:31:135', 1); // 未熟
    fixture.store.set('maxbase:31:2', 10000);
    return era_flag;
  };

  const f1 = create_era_fixture();
  seed(f1);
  f1.store.set('base:31:2', 2500);
  await run_show_status(f1);
  assert.ok(find_bar(f1, '射精（温妮）'), '135 置位但 BASE >= 2000 → 显示');

  const f2 = create_era_fixture();
  seed(f2);
  f2.store.set('base:31:2', 1999);
  await run_show_status(f2);
  assert.equal(
    find_bar(f2, '射精（温妮）'),
    undefined,
    '135 置位且 BASE < 2000 → 不显示',
  );

  // 避孕套（TEQUIP:37）
  const f3 = create_era_fixture();
  seed(f3);
  f3.store.set('base:31:2', 2500);
  f3.store.set('tequip:31:37', 1);
  await run_show_status(f3);
  assert.equal(find_bar(f3, '射精（温妮）').out, '(2500/10000)避孕套使用中');
});

test('射精（助手）：仅助手调教时显示（IF ASSIPLAY）', async () => {
  const seed = (fixture, assiplay) => {
    join_slave_chara(fixture, 31, '温妮');
    join_slave_chara(fixture, 32, '助手桑');
    const era_flag = fixture.load_module('era-utils/era-flag');
    era_flag.target = 31;
    era_flag.assi = 32;
    era_flag.assiplay = assiplay;
    fixture.era.beginTrain(0, 31, 32);
    fixture.store.set('palamkeys', PALAM_KEYS);
    PALAM_NAMES.forEach((name, i) => {
      fixture.store.set(`palamname:${i}`, name);
    });
    fixture.load_module('page/page-train');
    era_flag.day_count = 0;
    fixture.store.set('talent:32:122', 1);
    fixture.store.set('maxbase:32:2', 10000);
    fixture.store.set('base:32:2', 800);
    return era_flag;
  };

  const f1 = create_era_fixture();
  seed(f1, 1);
  await run_show_status(f1);
  const bar = find_bar(f1, '射精（助手桑）');
  assert.ok(bar, '助手调教时显示助手射精条');
  assert.equal(bar.out, '(800/10000)');

  const f2 = create_era_fixture();
  seed(f2, 0);
  await run_show_status(f2);
  assert.equal(
    find_bar(f2, '射精（助手桑）'),
    undefined,
    '主人亲自调教（ASSIPLAY=0）不显示助手射精条',
  );
});

test('母乳三段：TALENT:130 检查 + MAXBASE:3 缺省补 10000（副作用写入）', async () => {
  const fixture = create_era_fixture();
  const era_flag = seed_world(fixture);
  era_flag.day_count = 0;
  // 目标母乳体质；主人/助手无
  fixture.store.set('talent:31:130', 1);

  await run_show_status(fixture);

  const bar = find_bar(fixture, '母乳（温妮）');
  assert.ok(bar, '目标（母乳体质）的母乳条必须渲染');
  assert.equal(bar.out, '(0/10000)', '母乳条必须读 MAXBASE:3 的缺省补值');
  assert.ok(
    fixture.var_writes.some(
      (w) => w.name === 'maxbase:31:3' && w.value === 10000,
    ),
    'MAXBASE:3 缺省必须补 10000（SIF 写入）',
  );
  assert.equal(find_bar(fixture, '母乳（你）'), undefined, '主人无 130 不显示');

  // 助手档检查是 IF ASSI > 0（与射精段 ASSI >= 0 不同，不一致是既有行为）：
  // 本世界 ASSI = -1 → 不渲染也不写 MAXBASE
  assert(
    !fixture.var_writes.some((w) => w.name.startsWith('maxbase:-1')),
    'ASSI = -1 不得触碰助手槽位',
  );
});

test('触手/犬/死斗场三段（TEQUIP:89/90/55）：BASE:4 槽 + MAXBASE:4 缺省补 10000', async () => {
  for (const [slot, label] of [
    [89, '射精（犬）'],
    [90, '射精（触手）'],
    [55, '射精（死斗场・怪物）'],
  ]) {
    const fixture = create_era_fixture();
    const era_flag = seed_world(fixture);
    era_flag.day_count = 0;
    fixture.store.set(`tequip:31:${slot}`, 1);
    fixture.store.set('base:0:4', 1200);

    await run_show_status(fixture);

    const bar = find_bar(fixture, label);
    assert.ok(bar, `TEQUIP:${slot} → ${label} 必须渲染`);
    assert.equal(bar.out, '(1200/10000)');
    assert.ok(
      fixture.var_writes.some(
        (w) => w.name === 'maxbase:0:4' && w.value === 10000,
      ),
      `TEQUIP:${slot} 的 MAXBASE:4 缺省必须补 10000`,
    );
  }
});
