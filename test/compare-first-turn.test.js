/**
 * T18 首回合真比对（issue #48 的核心验收）：ere 回放（真实模块、#16 夹具
 * 记录层）vs target/emuera.log 首回合黄金窗口。
 *
 * 这里的断言是「差异全部有名有姓」的机器形态：分类计数逐项锁死（版本 4 /
 * 存根 94 / 未解释 0），后续票据实现某个存根时计数有意变化、由改动者更新
 * 本基线——比对锁是活文档，不是免检通行证。
 *
 * 硬边界（docs/output-diff.md）：黄金样本只覆盖调教这一段，「比对通过」
 * 目前只等于「调教的这一段对得上」。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const {
  fixture_stream,
  golden_stream,
  window_between_inputs,
} = require('../tools/compare/normalize');
const { diff_streams, format_report } = require('../tools/compare/diff');
const { load_traincommand_ids } = require('../tools/compare/rules');
const {
  extract_calc_assertions,
  check_assertions,
  parse_name_ids,
} = require('../tools/compare/assertions');
const {
  diff_snapshots,
  snapshot_via_get,
} = require('../tools/compare/snapshot');
const { replay_first_turn, RAND_FIX } = require('../tools/compare/replay');

const REPO = path.resolve(__dirname, '..');
const LOG = fs.readFileSync(path.join(REPO, 'target', 'emuera.log'), 'utf8');

/** 全套比对素材（多个用例共用一次回放，回放本身无副作用、幂等） */
async function build_comparison() {
  const { fixture, before, after } = await replay_first_turn();
  const golden_window = window_between_inputs(golden_stream(LOG), 0);
  const ere_window = window_between_inputs(fixture_stream(fixture.lines), 0);
  const report = diff_streams(golden_window, ere_window, {
    traincommand_ids: load_traincommand_ids(),
  });
  return { fixture, before, after, golden_window, ere_window, report };
}

test('首回合比对：未解释差异为零，分类计数与当前待办清单一致', async () => {
  const { report } = await build_comparison();

  // 真缺陷出口：unexplained 必须为 0（有一条都算「不知道为什么」）
  assert.equal(
    report.summary.unexplained,
    0,
    `未解释差异（完整报告见 node tools/compare/cli.js）：\n${format_report(report)}`,
  );
  // 当前待办状态的基线（存根实现后有意变化，改动者更新）：
  //   版本 0：#211 的编号体系差豁免（MENU_LABEL_SHIFT/VERSION_SKEW）随
  //           #213 映射层落地整组拆除——ere 侧按钮自此印 L_IDX，四个错位
  //           标签（54/55/89/39↔40）全部转匹配（原 10 条 version 消失：
  //           4 对成匹配 + 2 条 SKEW ere 半边转存根桶「COM_ABLE 未过滤」）
  //   存根 105 = COM_ABLE 未过滤的指令按钮 + @SHOW_USERCOM 按钮组（含与
  //             触手系指令同编号的对）+ 状态画面/调教结算占位行
  //             （#212 起：体力/气力/射精（主人）三条基础条已真身匹配；
  //             #213 起 107 → 109：SKEW 豁免的 2 条 ere 半边转正为
  //             「COM_ABLE 未过滤」记名存根；#215 起 109 → 105：服装前缀
  //             对与【紧身衣＆裙甲的姿态】两对转匹配——着衣态随 #215
  //             播种后 ere 侧逐字复现）
  //             ；#214 起 @SHOW_USERCOM 按钮组整组挂载，golden 侧原
  //             「按钮组未挂载」的条目转匹配。两票的 replay 播种合并后
  //             同时生效，下面是合并态实测
  // 【#221（J11）回放装载性交系后重测】：COM_ABLE20-29 的 guard 过滤了旧样本
  // 首屏的 8 个错误菜单项，存根 82 → 74。匹配与未解释数不变。
  // 【#225（J15）助手与蕾丝系落地】：COM_ABLE60-73 的真实守卫再滤掉首屏
  // 误列项，存根 74 → 63。匹配与未解释数不变。
  assert.deepEqual(report.summary, {
    matched: 72,
    version: 0,
    stub: 63,
    unexplained: 0,
  });
});

test('首回合比对：黄金样本侧逐条文本全部被 ere 侧复现', async () => {
  const { report, golden_window } = await build_comparison();
  // #215（J5）起服装前缀句与【紧身衣＆裙甲的姿态】两句也逐字复现
  // （着衣态播种进回放世界后两侧一致）——黄金窗口的 text 条目零差异：
  // 口上（log:26）、A 文（log:29）、源一览（log:31）、
  // 日期/目标/绝顶计数（log:46-51）、上次指令（log:74）全部匹配
  const diff_texts = report.diffs
    .filter((d) => d.side === 'golden' && d.entry.kind === 'text')
    .map((d) => d.entry.text);
  assert.deepEqual(diff_texts, []);
  assert.equal(golden_window.filter((e) => e.kind === 'text').length, 10);
});

test('首回合比对：16 格参数条逐格相等（数值经画面路径全量复现）', async () => {
  const { ere_window } = await build_comparison();
  const gauges = Object.fromEntries(
    ere_window
      .filter((e) => e.kind === 'gauge' && e.max === undefined)
      .map((e) => [e.key, e.val]),
  );
  assert.deepEqual(gauges, {
    阴核: 5540,
    私处: 0,
    肛门: 0,
    润滑: 2915,
    恭顺: 7,
    欲情: 2425,
    屈服: 100,
    习得: 238,
    耻情: 1724,
    苦痛: 0,
    恐怖: 0,
    反感: 3429,
    不快: 0,
    抑郁: 24,
    乳房: 49,
    局部: 0,
  });
});

test('变量层：日志算式断言在回放的 before/after 两端全过', async () => {
  const { before, after, golden_window } = await build_comparison();
  const { assertions } = extract_calc_assertions(
    golden_window,
    parse_name_ids(path.join(REPO, 'yml', 'Palam.yml')),
    31,
  );
  assert.equal(assertions.length, 8); // 首回合 8 条算式
  const failures = check_assertions(
    assertions,
    (p) => before[p],
    (p) => after[p],
  );
  assert.deepEqual(failures, []);
});

test('变量层：快照差异与黄金样本可见的变化逐项对上', async () => {
  const { before, after } = await build_comparison();
  const diff = diff_snapshots(before, after, [
    // tflag:999（SET_CLEAR_POINT 的行号）随输出行数漂移：回放侧行数与
    // 实机不同（按钮平铺 vs 三列），行号本身无比对意义
    { re: /^tflag:999$/, reason: '清除点行号随排版漂移' },
  ]);
  const by_path = Object.fromEntries(
    diff.changed.map((c) => [c.path, [c.from, c.to]]),
  );
  // 黄金样本算式行的 from→to（palam 8 条）与损耗条（base 2 条）逐项核对；
  // 其余 changed/added 是日志不可见的内部状态（flag 指针、source 残值等）
  assert.deepEqual(
    [
      'palam:31:0',
      'palam:31:14',
      'palam:31:3',
      'palam:31:4',
      'palam:31:5',
      'palam:31:7',
      'palam:31:8',
      'palam:31:11',
    ].map((p) => by_path[p]),
    [
      [5240, 5540],
      [42, 49],
      [2854, 2915],
      [6, 7],
      [2378, 2425],
      [204, 238],
      [1654, 1724],
      [3379, 3429],
    ],
  );
  assert.deepEqual(by_path['base:31:0'], [1450, 1445]); // (1445/2000) + 损耗 5
  assert.deepEqual(by_path['base:31:1'], [410, 360]); // (360/2000) + 损耗 50
});

test('变量层：era.get 退路与 store 快照等值（raw() 的替代采集法可用）', async () => {
  const { fixture, after } = await build_comparison();
  // via_get 读的是当前（回合后）存档数据，与展平的 store 快照逐键等值
  assert.deepEqual(snapshot_via_get(fixture.era, Object.keys(after)), after);
});

test('录制不经游戏代码改动：口上台词由真实 kojo-k3-noble 模块产出（定值随机源）', async () => {
  const { fixture } = await build_comparison();
  // 这句只可能出自 ere/kojo/kojo-k3-noble.js 的 :1097 分支（RAND_FIX 把随机三支
  // 固定到黄金样本选中的一支）——游戏模块零测试钩子，输出全走记录层
  assert.ok(
    fixture.text_lines().some((t) => t.includes('「哈呜、温妮、可是，一心地')),
  );
  // 上次指令行读静态名表（回放播种），指令按钮与「爱抚」命令名同源
  assert.ok(fixture.text_lines().includes('＜上次的调教指令：爱抚＞'));
  // 窗口纪律：ere 侧恰两次输入记录（首回合指令 0、收尾 999），窗口边界
  // 由第一条切到第二条之前
  assert.deepEqual(
    fixture.lines.filter((l) => l.type === 'input'),
    [
      { type: 'input', text: '0' },
      { type: 'input', text: '999' },
    ],
  );
});

test('回放确定性：两次回放的事件流逐字节一致（随机源受控）', async () => {
  const first = await replay_first_turn();
  const second = await replay_first_turn();
  assert.deepEqual(
    fixture_stream(first.fixture.lines),
    fixture_stream(second.fixture.lines),
  );
  assert.ok(RAND_FIX >= 1 / 3 && RAND_FIX < 0.5); // K3 :1097 支的取值区间
});
