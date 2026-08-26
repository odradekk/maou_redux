/**
 * tools/compare/normalize.js 的行为测试（issue #48）。
 *
 * 覆盖：行分类器的每一类（含网格行的多单元解析与值跨度）、黄金样本侧的
 * #60 归一、真实 emuera.log 上的首窗口形状、装饰行占比复核（#9 的 21.2%
 * 标准）。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const {
  classify_line,
  fixture_stream,
  golden_stream,
  line_stats,
  window_between_inputs,
} = require('../tools/compare/normalize');

const REPO = path.resolve(__dirname, '..');
const LOG = fs.readFileSync(path.join(REPO, 'target', 'emuera.log'), 'utf8');

// —— 单行分类 ——

test('输入回显：整行纯数字 → input 条目', () => {
  assert.deepEqual(classify_line('0', 21), {
    kind: 'input',
    text: '0',
    line: 21,
  });
  assert.equal(classify_line('999').kind, 'input');
});

test('装饰行三类的丢弃判定', () => {
  assert.equal(classify_line('').why, 'blank');
  assert.equal(classify_line(' ').why, 'blank'); // 样本里的单空格行
  assert.equal(classify_line('---'.repeat(20)).why, 'divider'); // 长分割线
  assert.equal(classify_line('═'.repeat(40)).why, 'divider');
  assert.equal(classify_line('‥'.repeat(39)).why, 'ellipsis'); // 密排点线
  assert.equal(classify_line('‥ '.repeat(39).trim()).why, 'ellipsis'); // 带空格点线（B 文的 CUSTOMDRAWLINE 变体）
});

test('菜单行：`名[  0]` 三连 → 三个 menu 条目（编号在括号内）', () => {
  const entry = classify_line('爱抚[  0]      舔阴[  1]   肛门爱抚[  2]');
  assert.equal(entry.kind, 'group');
  assert.deepEqual(
    entry.items.map((i) => [i.kind, i.key, i.val]),
    [
      ['menu', '爱抚', 0],
      ['menu', '舔阴', 1],
      ['menu', '肛门爱抚', 2],
    ],
  );
});

test('参数条网格：`名[条] 值` 多单元同行，值不当下单元残渣', () => {
  const entry = classify_line(
    '      阴核[*****.....]  5540      私处[..........]     0      肛门[..........]     0',
  );
  assert.equal(entry.kind, 'group');
  assert.deepEqual(
    entry.items.map((i) => [i.kind, i.key, i.val]),
    [
      ['gauge', '阴核', 5540],
      ['gauge', '私处', 0],
      ['gauge', '肛门', 0],
    ],
  );
});

test('基础条与损耗条：`(cur/max)` 与 ` -N` 两种括号后形态', () => {
  assert.deepEqual(classify_line('体力[..............](1445/2000)'), {
    kind: 'gauge',
    key: '体力',
    val: 1445,
    max: 2000,
    line: 0,
  });
  assert.deepEqual(classify_line(' 体力[====-..] -5 '), {
    kind: 'lossbar',
    key: '体力',
    val: 5,
    line: 0,
  });
});

test('算式行：两项式与三项式（#9 原型踩过的静默截断）', () => {
  assert.deepEqual(classify_line('阴核  5240+   300       =  5540'), {
    kind: 'calc',
    key: '阴核',
    from: 5240,
    add: 300,
    sub: 0,
    to: 5540,
    phrase: '',
    line: 0,
  });
  const three = classify_line('阴核  8820+  1650-  9000=  1470');
  assert.equal(three.kind, 'calc');
  assert.equal(three.sub, 9000);
  assert.equal(three.to, 1470);
  // 短语挂在算式尾（palam_message 的输出）
  const with_phrase = classify_line(
    '润滑  2854+    61       =  2915（晨露般稍湿）',
  );
  assert.equal(with_phrase.phrase, '晨露般稍湿');
});

test('文本行：括号前无名字（[阴蒂绝顶：1次]）与全角空格压缩', () => {
  const ex = classify_line('[阴蒂绝顶：1次]  ');
  assert.equal(ex.kind, 'text');
  assert.equal(ex.text, '[阴蒂绝顶：1次]');
  const fw = classify_line('射精（你）\u3000\u3000\u3000x'.replace('x', ''));
  assert.equal(fw.kind, 'text'); // 无括号 → 文本
  const mixed = classify_line('温妮\u3000调教中   调教者:你   ');
  assert.equal(mixed.text, '温妮 调教中 调教者:你');
});

// —— 黄金样本侧 ——

test('样本侧逐行过 #60 归一表：繁/日键名转简体后再分类', () => {
  const stream = golden_stream('氣力[***...] 100\n');
  assert.deepEqual(stream[0].key, '气力');
});

test('真实样本：首窗口从输入 0 起、形状与手核一致', () => {
  const window = window_between_inputs(golden_stream(LOG), 0);
  assert.equal(window[0].kind, 'input');
  assert.equal(window[0].text, '0');
  // 窗口内的条目类别计数（手核基线，改分类器先红这里）
  const kinds = {};
  window.forEach((e) => {
    kinds[e.kind] = (kinds[e.kind] ?? 0) + 1;
  });
  assert.deepEqual(kinds, {
    input: 1,
    text: 10, // 爱抚/B文/口上/A文/源一览/日期/目标行/服装/绝顶计数/上次指令
    lossbar: 2, // 体力 -5 / 气力 -50
    calc: 8, // 阴核/乳房/润滑/恭顺/欲情/习得/耻情/反感
    gauge: 19, // 体力/气力/射精（你）3 基础条 + 参数网格 16
    menu: 32, // 指令 22（含 54/55/89 版本位）+ 按钮组 9 + 调教结束 999
  });
});

test('真实样本：参数条网格逐格拆条（turn-2 的 16 格全在窗口内）', () => {
  const window = window_between_inputs(golden_stream(LOG), 0);
  const palam_gauges = window.filter(
    (e) => e.kind === 'gauge' && e.max === undefined,
  );
  assert.deepEqual(
    palam_gauges.map((g) => [g.key, g.val]),
    [
      ['阴核', 5540],
      ['私处', 0],
      ['肛门', 0],
      ['润滑', 2915],
      ['恭顺', 7],
      ['欲情', 2425],
      ['屈服', 100],
      ['习得', 238],
      ['耻情', 1724],
      ['苦痛', 0],
      ['恐怖', 0],
      ['反感', 3429],
      ['不快', 0],
      ['抑郁', 24],
      ['乳房', 49],
      ['局部', 0],
    ],
  );
});

test('装饰行占比复核：#9 的 21.2% 统计在 5000 行样本上成立（本分类器 21.7%）', () => {
  const stats = line_stats(LOG);
  assert.equal(stats.total, 5000);
  // #9 手工分类：divider 437 + ellipsis 364 + blank 261 = 21.2%。本分类器
  // 更宽（divider 462：把 palam_up 的 31 字符短分隔线也计入），量级一致
  assert.equal(stats.ellipsis, 364);
  assert.equal(stats.divider, 462);
  assert.equal(stats.blank, 260);
  assert.ok(stats.ratio > 0.2 && stats.ratio < 0.23, `实得 ${stats.ratio}`);
});

// —— ere 侧（夹具记录 → 事件流）——

test('夹具记录映射：button → menu、text → 同一分类器、br/divider 丢弃', () => {
  const stream = fixture_stream([
    { type: 'button', text: '爱抚', accelerator: 0 },
    { type: 'text', text: '一行', content: '一行' },
    { type: 'br', text: '' },
    { type: 'divider', text: '', border: 'dashed' },
    { type: 'input', text: '0' },
    { type: 'image', names: 'res' },
  ]);
  assert.deepEqual(
    stream.map((e) => e.kind),
    ['menu', 'text', 'input', 'image'],
  );
  assert.equal(stream[0].key, '爱抚');
  assert.equal(stream[0].val, 0);
});

// —— #74：结构化进度条记录 → gauge（换掉表现层不影响比对的机制本体）——

test('progress 记录 → gauge：键=条内文字、值=条后数值，percentage 不进事件流', () => {
  const stream = fixture_stream([
    { type: 'progress', percentage: 55.4, text: '阴核', out: ' 5540', row: 0 },
    { type: 'progress', percentage: 0, text: '私处', out: '    0', row: 0 },
    { type: 'progress', percentage: 100, text: '阴核', out: '250000', row: 5 },
  ]);
  assert.deepEqual(
    stream.map((e) => ({ kind: e.kind, key: e.key, val: e.val })),
    [
      { kind: 'gauge', key: '阴核', val: 5540 },
      { kind: 'gauge', key: '私处', val: 0 },
      { kind: 'gauge', key: '阴核', val: 250000 },
    ],
  );
  // percentage 是渲染层的算法（10 格字符条 floor vs 百分比条），不随条目下传——
  // 表现变更不产生差异由这条保证
  assert.ok(stream.every((e) => !('percentage' in e)));
  // 右对齐填充由 Number 剥掉（与黄金侧正则抽数值同值）
  assert.ok(stream.every((e) => Number.isInteger(e.val)));
});

test('ere 侧文本仍过网格解析：损耗条合成串照旧成 lossbar（#74 裁定保留）', () => {
  // parse_grid_line 不随 #74 删除：损耗条（体力/气力 -N 行）仍由
  // SOURCE_CHECK 以合成串产出（owner 在调教循环侧，这张票边界外）。
  const stream = fixture_stream([
    {
      type: 'text',
      text: ' 体力[=======================-........] -5 ',
      content: '',
    },
  ]);
  assert.equal(stream[0].kind, 'lossbar');
  assert.equal(stream[0].key, '体力');
  assert.equal(stream[0].val, 5);
});

test('窗口边界：缺第二次输入即报错（两侧同构的纪律）', () => {
  const stream = [
    { kind: 'input', text: '0' },
    { kind: 'text', text: 'x' },
  ];
  assert.throws(() => window_between_inputs(stream, 0), /比对窗口不完整/);
});

// —— 范围 B（#161）：主菜单/存读档/日循环的形态扩展 ——

test('编号在前的按钮行：`[N] 标签` 单元铺满 → menu 条目（#161）', () => {
  // 标题入口（单钮）
  const one = classify_line('[0] 旧的奴隶');
  assert.equal(one.kind, 'menu');
  assert.equal(one.key, '旧的奴隶');
  assert.equal(one.val, 0);
  // 翻页行（同行三钮）
  const row = classify_line(
    '[101] 上一页                [100] 返回                  [102] 下一页',
  );
  assert.equal(row.kind, 'group');
  assert.deepEqual(
    row.items.map((i) => [i.kind, i.key, i.val]),
    [
      ['menu', '上一页', 101],
      ['menu', '返回', 100],
      ['menu', '下一页', 102],
    ],
  );
  // 主菜单指令行（全角空格前缀 + 三列）
  const cmds = classify_line(
    '　[100] 调教               　[101] 能力显示           　[102] 场子',
  );
  assert.equal(cmds.kind, 'group');
  assert.deepEqual(
    cmds.items.map((i) => [i.key, i.val]),
    [
      ['调教', 100],
      ['能力显示', 101],
      ['场子', 102],
    ],
  );
});

test('混排灰条行：`[---]` 段落归 text、数字按钮照拆 menu（#161）', () => {
  const entry = classify_line(
    '　[---] 　　　　           　[107] 购物               　[108] 换装',
  );
  assert.equal(entry.kind, 'group');
  assert.deepEqual(
    entry.items.map((i) => [i.kind, i.key ?? i.text, i.val]),
    [
      ['text', '[---]', undefined],
      ['menu', '购物', 107],
      ['menu', '换装', 108],
    ],
    '灰条单元必须归 text 残段：ere 侧 page-main-menu 的灰条正是 era.print 单行，两侧同构',
  );
  // 纯灰条行整行是 text（ere 侧 page-main-menu 的灰条正是 era.print('[---]')）
  const bare = classify_line('　[---] 　　　　　');
  assert.equal(
    bare.kind,
    'text',
    '纯灰条行必须归 text（ere 侧同构的灰条输出）',
  );
  assert.equal(bare.text, '[---]');
});

test('按钮行守门：叙述文本里的编号引用与残渣不被误拆（#161）', () => {
  // 残渣（方括号外有正文）→ 整行 text
  assert.equal(
    classify_line('「[1] 你好」的世界观').kind,
    'text',
    '守门判定：残渣（方括号外有正文）的行不得拆成按钮',
  );
  // 空标签（`[100]` 后直接下一单元）→ 不是按钮行
  assert.equal(classify_line('[100] [101] 下一个').kind, 'text');
  // 编号带字母（非编号）→ text
  assert.equal(classify_line('[A1] 某物').kind, 'text');
  // 行尾残渣（按钮单元之后还有非单元的方括号段）→ 整行 text——守门不拦
  // 会把 `[某某]` 静默丢掉（拆出的 menu 丢文本，比对信息缺失且无红）。
  // 注意多词标签（`[100] 调教 了不得的东西`）是合法按钮：标签段可含空格
  //（槽位备注即多词标签），不得按「行尾有正文」拒收
  assert.equal(
    classify_line('[100] 调教 [某某]').kind,
    'text',
    '残渣（方括号外有正文）的行必须整体回落 text，行尾守门不可删',
  );
  assert.equal(classify_line('[100] 调教 了不得的东西').kind, 'menu');
});

test('存档槽位行：编号在前 + 时间戳归一 `<TS>`（#161 验收项）', () => {
  // 存在槽（时间戳 = 保存时刻，重录必变——归一成占位符）
  const slot = classify_line(
    ' [ 5] 2026/08/26 17:32:58  第 7日午前 LV   0 正在调教:温妮           『对拍样本』',
  );
  assert.equal(slot.kind, 'menu');
  assert.equal(slot.val, 5);
  assert.equal(
    slot.key,
    '<TS> 第 7日午前 LV 0 正在调教:温妮 『对拍样本』',
    '两个录制时刻的归一结果必须以 <TS> 占位开头（时间戳值不进比对）',
  );
  // 两个不同时刻的同槽备注归一后 key 相等（重录不红的保证）
  const again = classify_line(
    ' [ 5] 2027/01/01 08:00:00  第 7日午前 LV   0 正在调教:温妮           『对拍样本』',
  );
  assert.equal(
    slot.key,
    again.key,
    '不同录制时刻的归一结果必须逐字相等——重录不红的保证',
  );
  // 时间戳的「在场」仍是断言：丢了时间戳的备注与带时间戳的 key 不等
  const no_ts = classify_line(
    ' [ 5] 第 7日午前 LV   0 正在调教:温妮           『对拍样本』',
  );
  assert.notEqual(slot.key, no_ts.key);
  // 空槽 `[N] ----` 也是 menu（ere 侧存档界面空槽是灰色按钮）
  const empty = classify_line(' [19] ----');
  assert.equal(empty.kind, 'menu');
  assert.equal(empty.key, '----');
  assert.equal(empty.val, 19);
});

test('ere 侧按钮正文过同一套时间戳归一（两侧同构）', () => {
  const stream = fixture_stream([
    {
      type: 'button',
      text: '2026/08/26 17:32:58  第 7日午前 LV   0 正在调教:温妮           『对拍样本』',
      accelerator: 5,
    },
    { type: 'button', text: '----', accelerator: 6 },
  ]);
  assert.equal(stream[0].kind, 'menu');
  assert.equal(
    stream[0].key,
    '<TS> 第 7日午前 LV 0 正在调教:温妮 『对拍样本』',
    'ere 侧按钮正文过同一套时间戳归一（两侧同构，否则比对必假红）',
  );
  assert.deepEqual([stream[1].key, stream[1].val], ['----', 6]);
});

test('富文本标记行：img src 抠出 → image；纯 shape → 丢弃（#161）', () => {
  const img = classify_line(
    "<shape type='space' param='100'><img src='金0' height='90' ypos='-17'>",
  );
  assert.equal(img.kind, 'image');
  assert.deepEqual(img.names, ['金0']);
  const title = classify_line(
    "<shape type='space' param='2180'><img src='TITLE' height='72' width='400' ypos='-6'>",
  );
  assert.deepEqual(title.names, ['TITLE']);
  // 只有排版位移（无 img）→ 丢弃，进 shape 计数
  const bare = classify_line("<shape type='space' param='300'>");
  assert.equal(bare.kind, 'discard');
  assert.equal(bare.why, 'shape');
  // 装饰行统计的新类别
  const stats = line_stats(
    "<shape type='space' param='300'>\r\n[0] 旧的奴隶\r\n",
  );
  assert.equal(stats.shape, 1);
  assert.equal(stats.total, 2);
});

test('黄金侧豁免名单：整串命中的行原样放行（致谢名单的華胥の亡靈）', () => {
  // ere 侧该行按 lang-table 豁免保留原文；黄金侧若归一即两侧假差异
  //（#161 范围 B 首次对拍实证）。豁免判定与 output-lang-lock 同一真相源
  const stream = golden_stream(
    '大众性格：谦悟、文文、匿名神人、干掉人龙、歪闷林、華胥の亡靈、Delicious\r\n',
  );
  assert.ok(
    stream[0].text.includes('華胥の亡靈'),
    '豁免串必须原样放行（繁体保留）',
  );
  // 非豁免的繁体行照旧过归一表
  const normalized = golden_stream('奴隷市场\r\n');
  assert.equal(normalized[0].text, '奴隶市场');
});
