/**
 * ere/page/page-train.js 的行为测试（issue #44：@SHOW_STATUS 骨架 +
 * PRINT_PALAM 引擎内建命令的移植；#74：整页画面组件 + 原生进度条换表现层）。
 *
 * 缝 = test/helpers/era-fixture.js。#74 起参数条是 printMultiColumns 的
 * progress 格——语义值（参数名/palam 原值）与表现（percentage）的分离
 * 在这里固定：数值对齐 emuera.log 实机样本，百分比按「下一等级阈值」
 * 手算基线（不镜像实现），行分组按 #68 的 Row 的计法（一次调用 3 格＝1 Row）。
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

test('PRINT_PALAM：16 格原生进度条——条内名、条后数值与样本对齐，percentage 手算基线', () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  const { print_palam } = load_module_safe(fixture);

  // emuera.log 的实机值（SHOW_STATUS 首屏 log:52-57 的条后数值）
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
      ['阴核', ' 5540'],
      ['私处', '    0'],
      ['肛门', '    0'],
      ['润滑', ' 2915'],
      ['恭顺', '    7'],
      ['欲情', ' 2425'],
      ['屈服', '  100'],
      ['习得', '  238'],
      ['耻情', ' 1724'],
      ['苦痛', '    0'],
      ['恐怖', '    0'],
      ['反感', ' 3429'],
      ['不快', '    0'],
      ['抑郁', '   24'],
      ['乳房', '   49'],
      ['局部', '    0'],
    ],
  );
  // 表现：percentage＝100×值/下一等级阈值（手算基线：LV0/100、LV1/500、
  // LV2/3000、LV3/10000；不取整——原作 floor(10*值/阈值) 的格数没有等价物）
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
  // 两个已知破坏形态（PALAM_PROGRESS_BAR_WIDTH 改 24 / 删掉 config 整行
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
  // 存根各占位一行（可检索；LIFE_BAR/VITAL_BAR 已随 #212 换真身——
  // maxbase 未播种时静默，见下方两条反向断言）
  for (const name of ['SHOW_EQUIP_2', 'PRINT_CLOTHTYPE', 'SHOW_EQUIP_1']) {
    assert(
      texts.some((line) => line.includes(`@${name}`)),
      `存根 ${name} 必须打印占位行`,
    );
  }
  // :85-86 LIFE_BAR/VITAL_BAR（#212）：maxbase 未播种时静默（MAXBASE <= 0
  // 的原作守卫）——温妮世界没播 maxbase:31:0/1，两条都不出
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

// —— #74：整页 ScreenBlock 的重绘策略（EVENTCOM 探针判据）与生命周期 ——

test('@SHOW_STATUS 组件化：无指令轮就地重绘（菜单与回显被锚点跨度消费）', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  await run_show_status(fixture); // 首绘：追加（不清屏）
  const block_rows = fixture.era.getLineCount();

  // 模拟一轮无效输入：@SHOW_USERCOM 的菜单行 + input 回显（各占 Row）——
  // 两者都已被那一次输入消费，且未进指令路径（无 EVENTCOM）
  fixture.era.print('指令菜单占位');
  fixture.set_inputs(777);
  await fixture.era.input();
  const rows_before_redraw = fixture.era.getLineCount();
  assert(rows_before_redraw > block_rows);

  await run_show_status(fixture); // EVENTCOM 未发 → 就地重绘

  // 行数回到块自身（锚点跨度清掉 旧状态画面+菜单+回显 后重画）
  assert.equal(fixture.era.getLineCount(), block_rows);
  assert(!fixture.text_lines().includes('指令菜单占位'), '旧菜单行应被清掉');
  // 「发生过什么」记录在行史（#73 的取证层）
  assert(fixture.lines_history.some((l) => l.text === '指令菜单占位'));
});

test('@SHOW_STATUS 组件化：指令轮追加绘制（叙述行不被重绘吃掉）', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  const { emit } = fixture.load_module('system/event/registry');
  await run_show_status(fixture);

  // 模拟一轮指令执行：叙述与算式行（SOURCE_CHECK 一族的输出）落在锚点
  // 跨度内；EVENTCOM 是指令路径的必经事件（train-loop 步骤 11）
  fixture.era.print('「哈呜、温妮、可是，一心地，想要杀了……」');
  fixture.era.print('阴核  5240+   300       =  5540');
  await emit('EVENTCOM');

  await run_show_status(fixture); // 指令轮 → 追加（原作同款滚动）

  // 叙述与算式行仍在屏幕上——「分发期输出必须被玩家看到再被重绘清掉」
  //（#73 通则）；状态画面侧无等键，只能不吃它们
  assert(
    fixture.text_lines().some((t) => t.includes('「哈呜、温妮')),
    '指令叙述不得被重绘清掉',
  );
  assert(
    fixture.text_lines().some((t) => t.includes('阴核  5240+')),
    '算式行不得被重绘清掉',
  );
  // 两次状态画面都在屏（滚动形态）：日期行恰两次
  assert.equal(fixture.text_lines().filter((t) => t === '1日(午前)').length, 2);
});

test('@SHOW_STATUS 组件化：重复执行同一指令也追加（EVENTCOM 探针，评审抓出的洞）', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  const { emit } = fixture.load_module('system/event/registry');
  await run_show_status(fixture);

  // 两轮同指令（爱抚→爱抚）：PREVCOM 的值差判据在这里失灵（步骤 13 同值
  // 直写 0→0，首版实现据此误判成无指令轮、吃掉第二轮叙述——评审探针
  // 实证）；EVENTCOM 探针与指令编号无关，两轮都翻标志
  fixture.era.print('「第一轮的叙述行」');
  await emit('EVENTCOM');
  await run_show_status(fixture); // 第一轮：追加
  fixture.era.print('「第二轮的叙述行」');
  await emit('EVENTCOM');
  await run_show_status(fixture); // 第二轮（同指令）：也必须追加

  assert(
    fixture.text_lines().includes('「第一轮的叙述行」'),
    '第一轮叙述应在屏',
  );
  assert(
    fixture.text_lines().includes('「第二轮的叙述行」'),
    '重复同指令的叙述不得被重绘清掉（PREVCOM 值差判据的洞）',
  );
});

test('@SHOW_STATUS 组件化：跨会话重建（旧锚点不得清掉新局内容）', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  const { emit } = fixture.load_module('system/event/registry');

  // 会话 1（零指令局）：EVENTTRAIN 建块 → 绘制一次
  await emit('EVENTTRAIN');
  await emit('SHOW_STATUS');

  // 出调教、进商店：整屏清空后是商店内容（主菜单重绘的消费形态）
  await fixture.era.clear();
  for (let i = 0; i < 10; i += 1) {
    fixture.era.print(`商店主菜单占位行${i}`);
  }

  // 会话 2：EVENTTRAIN 重建（不重建则旧锚点＝0，重入时跨度覆盖全部商店行）
  await emit('EVENTTRAIN');
  await emit('SHOW_STATUS');

  assert(
    fixture.text_lines().includes('商店主菜单占位行0'),
    '新局上方的商店内容必须幸存（跨会话旧锚点是 #73 固定的坑）',
  );
  assert(
    fixture.text_lines().includes('商店主菜单占位行9'),
    '最底部的商店行也必须幸存',
  );
});

test('旁路清行：重绘后行数未回锚点须记录并重锚恢复（#73 转来的待办）', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  await run_show_status(fixture);

  // 一轮无效输入（菜单+回显）后重绘；把 clear 的返回值模拟成引擎
  // setTotalLines 回传漂移——「旁路动过行数」的形态（自校验的靶子）
  fixture.era.print('指令菜单占位');
  fixture.set_inputs(777);
  await fixture.era.input();
  const original_clear = fixture.era.clear;
  fixture.era.clear = async (n) => {
    await original_clear(n);
    return fixture.era.getLineCount() + 1; // 漂移：比真实多一行
  };
  try {
    await run_show_status(fixture);
  } finally {
    fixture.era.clear = original_clear;
  }

  // 自校验必须记录（去掉自校验本用例全绿——#73 验收报出的空覆盖）
  assert(
    fixture.logs.some((l) => l.level === 'warn' && l.msg.includes('旁路清行')),
    '重绘后行数未回锚点必须 warn 记录',
  );
  // 恢复力：组件据真实行数重锚，下一次（无漂移）重绘干净通过、不再记录
  fixture.era.print('指令菜单占位');
  fixture.set_inputs(777);
  await fixture.era.input();
  await run_show_status(fixture);
  assert.equal(
    fixture.logs.filter((l) => l.msg.includes('旁路清行')).length,
    1,
    '重锚后不应再触发自校验',
  );
});

test('存根清单可检索：docs/stub-registry.md 收录这张票全部占位名', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = load_module_safe(fixture);
  const registry = fs.readFileSync(
    path.resolve(__dirname, '..', 'docs', 'stub-registry.md'),
    'utf8',
  );

  assert.deepEqual(STUBBED_CALLS, [
    'SHOW_EQUIP_2',
    'PRINT_CLOTHTYPE',
    'SHOW_EQUIP_1',
  ]);
  for (const name of STUBBED_CALLS) {
    assert(registry.includes(name), `存根清单缺少 ${name}`);
  }
});

// —— #212：基础条（@LIFE_BAR/@VITAL_BAR）与射精/母乳/触手槽条段（:144-252）——

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
  // MAXBASE <= 0 的静默守卫由骨架测试反向钉住；这里播种后必须渲染
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
  assert.equal(vital.out, '( 360/2000)', 'VITAL 数值右对齐宽 4（{BASE:1,4}）');

  // 濒死（< 500）/死亡（< 0，按 0 渲染）/气力０（<= 0）缀标（:1159-1163/:1198）
  const cases = [
    { base: 'base:31:0', val: 400, label: '体力', out: '( 400/2000)★濒死★' },
    { base: 'base:31:0', val: -5, label: '体力', out: '(   0/2000)★死亡★' },
    { base: 'base:31:1', val: 0, label: '气力', out: '(   0/2000)★气力０★' },
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

test('射精（主人）：121/122 守卫、TALENT:135 无 ≥2000 臂（与助手/目标不同）、自调教不显示', async () => {
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

  // :144 判据 (TALENT:135 || (135 && BASE>=2000)) == 0 ≡ !135——主人独缺
  // ≥2000 臂：135 置位时即便 BASE >= 2000 也不显示（原作三处守卫的差异本体）
  const f2 = create_era_fixture();
  base_world(f2);
  f2.store.set('talent:0:135', 1); // 未熟
  await run_show_status(f2);
  assert.equal(
    find_bar(f2, '射精（你）'),
    undefined,
    '主人档 TALENT:135 置位即不显示（无 ≥2000 臂）',
  );

  // TARGET != MASTER：自调教（target = 0）时主人段（:144）不显示；但目标段
  //（:177）的守卫不含此判据——目标=主人时按主人自己的素质照渲染一条同名条，
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
  f4.store.set('tequip:35', 1);
  await run_show_status(f4);
  assert.equal(find_bar(f4, '射精（你）').out, '(2500/10000)避孕套使用中');

  // 无阴茎侧素质（121/122 皆无）不显示
  const f5 = create_era_fixture();
  base_world(f5);
  f5.store.set('talent:0:122', 0);
  await run_show_status(f5);
  assert.equal(find_bar(f5, '射精（你）'), undefined);
});

test('射精（目标）：TALENT:135 的 ≥2000 臂放行（与主人档对照）', async () => {
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
  f3.store.set('tequip:37', 1);
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

test('母乳三段：TALENT:130 守卫 + MAXBASE:3 缺省补 10000（副作用写入）', async () => {
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
    'MAXBASE:3 缺省必须补 10000（:217-218 SIF 写入）',
  );
  assert.equal(find_bar(fixture, '母乳（你）'), undefined, '主人无 130 不显示');

  // 助手档守卫是 IF ASSI > 0（与射精段 ASSI >= 0 不同，原作不一致 1:1）：
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
    fixture.store.set(`tequip:${slot}`, 1);
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
