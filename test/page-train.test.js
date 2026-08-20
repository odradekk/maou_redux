/**
 * ere/page/page-train.js 的行为测试（issue #44：@SHOW_STATUS 骨架 +
 * PRINT_PALAM 引擎内建命令的移植；#74：整页画面组件 + 原生进度条换皮）。
 *
 * 缝 = test/helpers/era-fixture.js。#74 起参数条是 printMultiColumns 的
 * progress 格——语义值（参数名/palam 原值）与表现（percentage）的分离
 * 在这里钉死：数值对齐 emuera.log 实机样本，百分比按「下一等级阈值」
 * 手算基线（不镜像实现），行分组按 #68 的 Row 口径（一次调用 3 格＝1 Row）。
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
  // Row 分组：一次 printMultiColumns 3 格＝1 Row（#68 口径），16 格 → 6 行
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
    '每格的条后数值（palam 原值）必须真实渲染——它是对拍与玩家共用的语义值',
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
  // 「发生过什么」留痕在行史（#73 的取证层）
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
    '新局上方的商店内容必须幸存（跨会话旧锚点是 #73 钉死的坑）',
  );
  assert(
    fixture.text_lines().includes('商店主菜单占位行9'),
    '最底部的商店行也必须幸存',
  );
});

test('旁路清行：重绘后行数未回锚点须留痕并重锚恢复（#73 转来的欠账）', async () => {
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

  // 自校验必须留痕（去掉自校验本用例全绿——#73 验收点名的空覆盖）
  assert(
    fixture.logs.some((l) => l.level === 'warn' && l.msg.includes('旁路清行')),
    '重绘后行数未回锚点必须 warn 留痕',
  );
  // 恢复力：组件据真实行数重锚，下一次（无漂移）重绘干净通过、不再留痕
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
