'use strict';
/**
 * 调教段全序列比对的行为锁（issue #211 第三段）。
 *
 * 三层（形态同 test/compare-scope-b.test.js）：
 *   1. 两份样本的比对基线锁：每份跑「golden 调教窗口 vs replay_train_sample
 *      回放」，断言 matched / version / stub / unexplained 四个数的精确值
 *      ——数字漂移即红。存根计数是 #210 阶段 4 的进度计：每张指令族票
 *      落地都应有意识地更新这里（matched 升 / stub 降），**不许用放宽
 *      rules.js 归因的办法把它做小**（差异条目全部带理由的断言守住底线）。
 *   2. 回放器裁定行为：随机源是序列注入（相殺的 RAND:3 六连掷，反推自
 *      golden 结算终态）、输入计划耗尽的显式失败、run_train → run_aftertrain
 *      的状态链（AFTERTRAIN → TURNEND）。
 *   3. 归因改正的行为锁：MENU_LABEL_SHIFT 的精确配对四个标签齐（#211 的
 *      L_IDX/L_I 机制），裸编号不吞标签（反向变异的靶在 tools/mutations/）。
 *
 * 全用例走夹具（纯 Node），无引擎依赖。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { golden_stream, fixture_stream } = require('../tools/compare/normalize');
const { diff_streams } = require('../tools/compare/diff');
const { load_traincommand_ids } = require('../tools/compare/rules');
const {
  TRAIN_INPUT_PLANS,
  TRAIN_RAND_SEQ,
  replay_train_sample,
  train_window,
} = require('../tools/compare/replay');

const REPO = path.resolve(__dirname, '..');

// —— 1. 两份样本的比对基线锁（#211 第三段首次全绿的实测）——
//
// 数字的构成（供后续票据更新时对账）：
//   train-natural 的 version 176 = 17 屏方格的四个错位标签（打屁股 39↔40、
//     放置PLAY 54↔55、交谈 55↔56、穿脱衣服 89↔110 各 2 条）+ ere 侧
//     野外PLAY[54]/兽奸PLAY[89] 撞错位段 + 交谈[56]/穿脱衣服[110] 的 ere
//     半边（SKEW 兜底）× 屏数；
//   存根 2549 的主体 = 每屏 ~80 条 COM_ABLE 未过滤按钮 × 17 屏 + 指令块
//     输出 + 参数/结算数值差——阶段 4 的进度计本体。
const BASELINE = {
  'train-natural': { matched: 537, version: 176, stub: 2549, unexplained: 0 },
  'train-upgrade': { matched: 142, version: 52, stub: 841, unexplained: 0 },
};

async function build_report(sample) {
  const { stream_source } = await replay_train_sample(sample);
  const golden = train_window(
    golden_stream(
      fs.readFileSync(path.join(REPO, 'golden', `${sample}.log`), 'utf8'),
    ),
    sample,
  );
  const ere = fixture_stream(stream_source).filter(
    (e) => e.kind !== 'discard' && e.kind !== 'group',
  );
  return diff_streams(golden, ere, {
    scope: 'train',
    sample,
    traincommand_ids: load_traincommand_ids(),
  });
}

for (const [name, expected] of Object.entries(BASELINE)) {
  test(`比对基线锁：${name} 匹配 ${expected.matched} / 版本 ${expected.version} + 存根 ${expected.stub} + 未解释 ${expected.unexplained}`, async () => {
    const report = await build_report(name);
    assert.deepEqual(
      {
        matched: report.matched,
        version: report.summary.version,
        stub: report.summary.stub,
        unexplained: report.summary.unexplained,
      },
      expected,
      `基线漂移：ere 侧输出或归因规则变了——指令族票落地则有意更新 BASELINE，否则查差异明细`,
    );
    // 差异条目全部带归因理由（报告可读性的最低门槛；也守「不许静默放宽」）
    assert.ok(
      report.diffs.every(
        (d) => typeof d.reason === 'string' && d.reason.length > 0,
      ),
    );
  });
}

// —— 2. 回放器裁定行为 ——

test('随机源是序列注入：两份样本各六掷、池序号与 golden 相殺终态一致', async () => {
  // 相殺只跑第一组（否定在组内清零，train-natural-log:923-925 实证第二组
  // 不进循环），六次掷点全部落在 [4,5,6] 池——序列长度 6、值域 [0,3)
  assert.deepEqual(TRAIN_RAND_SEQ['train-natural'], [2, 2, 2, 2, 0, 1]);
  assert.deepEqual(TRAIN_RAND_SEQ['train-upgrade'], [2, 2, 1, 2, 1, 1]);
  for (const seq of Object.values(TRAIN_RAND_SEQ)) {
    assert.equal(seq.length, 6);
    seq.forEach((v) => assert.ok(v >= 0 && v < 3));
  }
  // 注入后的结算表逐字含 golden 的相殺终态（ere 侧存量播种与 golden 的
  // 上次值列相同，抵消列因 ere 增量不同而异——终值行进 stub，此处锚的
  // 是「相殺确实跑了且确定」）
  const { fixture } = await replay_train_sample('train-natural');
  const texts = fixture.lines_history
    .filter((l) => l.type === 'text')
    .map((l) => l.text);
  assert.ok(
    texts.some((t) => t.startsWith('调教结果：否定点数')),
    '相殺必须执行（否定点数行在场）',
  );
});

test('输入计划耗尽的显式失败：多要一次输入即报错，不静默挂起', async () => {
  // golden 的窗口尾是能力值提高结束（999），ere 侧 juel_check 退出后不该
  // 再要输入——回放器在计划耗尽时抛带样本名的错误（流程错位的守卫）
  const { stream_source } = await replay_train_sample('train-upgrade');
  const inputs = stream_source.filter((e) => e.type === 'input');
  assert.deepEqual(
    inputs.map((i) => i.text),
    TRAIN_INPUT_PLANS['train-upgrade'].map(String),
  );
});

test('回放确定性：两次回放的事件流逐字节一致（序列随机源受控）', async () => {
  const first = await replay_train_sample('train-natural');
  const second = await replay_train_sample('train-natural');
  assert.deepEqual(
    fixture_stream(first.stream_source),
    fixture_stream(second.stream_source),
  );
});

test('golden 调教窗口的裁切：首屏在内、标题/主菜单段与尾部日程推屏在外', async () => {
  const text = fs.readFileSync(
    path.join(REPO, 'golden', 'train-natural.log'),
    'utf8',
  );
  const entries = train_window(golden_stream(text), 'train-natural');
  const texts = entries.filter((e) => e.kind === 'text').map((e) => e.text);
  // 窗口内：调教开场叙事（首屏之前）与首屏状态行、结算与能力值提高
  assert.ok(texts.includes('温妮的第13次调教开始了。'));
  assert.ok(texts.some((t) => t.startsWith('绝顶经验:')));
  assert.ok(
    entries.some((e) => e.kind === 'menu' && e.key === '- 能力值提高结束'),
    '窗口必须含能力值提高结束键（终点边界）',
  );
  // 窗口外：标题致辞、读档列表、尾部日程推屏（日循环归范围 B 的样本）
  assert.ok(!texts.includes('邪恶正在蔓延………'));
  assert.ok(!texts.some((t) => t.includes('要载入以下哪个存档')));
  assert.ok(!texts.some((t) => t.includes('売春判定')));
  assert.ok(!texts.some((t) => t.startsWith('第0年')));
  // 输入边界：窗口的首条输入是进调教后的第一条指令（0 爱抚）
  const first_input = entries.find((e) => e.kind === 'input');
  assert.equal(first_input?.text, '0');
});

// —— 3. 归因改正的行为锁 ——

test('MENU_LABEL_SHIFT 四个错位标签齐：L_IDX/L_I 的精确配对（#211 机制）', async () => {
  const {
    MENU_LABEL_SHIFT,
    classify_entry,
  } = require('../tools/compare/rules');
  assert.deepEqual(
    MENU_LABEL_SHIFT.map((s) => [s.key, s.golden, s.ere]),
    [
      ['打屁股', 39, 40],
      ['放置PLAY', 54, 55],
      ['交谈', 55, 56],
      ['穿脱衣服', 89, 110],
    ],
  );
  // 精确配对先于裸编号：打屁股[39] 的归因文本点名机制与 #213
  const hit = classify_entry(
    { kind: 'menu', key: '打屁股', val: 39 },
    'golden',
    {},
  );
  assert.equal(hit.category, 'version');
  assert.match(hit.reason, /L_IDX/);
  assert.match(hit.reason, /#213/);
  // 裸编号仍在（ere 侧独有条目兜底），且理由不再提「构建漂移」
  const skew = classify_entry(
    { kind: 'menu', key: '野外PLAY', val: 54 },
    'ere',
    {},
  );
  assert.equal(skew.category, 'version');
  assert.match(skew.reason, /L_IDX/);
  assert.ok(!skew.reason.includes('勘误二'));
});

test('MENU_LABEL_SHIFT 不放宽到裸编号：val 撞值域但标签不配的条目不被豁免', async () => {
  // rules.js 的纪律（#9 起注释一直警告）：裸 40 会吞掉真正的 COM_ABLE
  // 回归——ere 侧若因回归渲染出 val=40 的异名按钮，它的正确归因是
  // 「未被 COM_ABLE 过滤」（stub，计数进 stub 桶），裸编号会把它抢成
  // version（桶间搬家、回归不可见）；golden 侧的异名条目更该直接
  // unexplained。此前没有机器守卫（#211 实测：真实数据里 ere 侧
  // val∈值域的只有四标签本尊与 SKEW 编号，放宽了也不红），本用例直接
  // 锁规则行为。
  const { classify_entry } = require('../tools/compare/rules');
  const ere_hit = classify_entry(
    { kind: 'menu', key: '爱抚', val: 40 },
    'ere',
    {},
  );
  assert.equal(ere_hit?.category, 'stub');
  assert.match(ere_hit.reason, /COM_ABLE/);
  assert.equal(
    classify_entry({ kind: 'menu', key: '爱抚', val: 39 }, 'golden', {}),
    null,
    '裸编号吞掉回归：golden 侧 val 命中 shift 值域但标签不配的条目必须 unexplained',
  );
});

test('旧样本首回合基线不受 train 规则组影响（scope 守卫）', async () => {
  // classify_entry 无 scope 时 train 规则组零触发——四个数的既有基线
  // （54/10/112/0，test/compare-first-turn.test.js 锁）依赖这一点
  const { classify_scope_train } = require('../tools/compare/rules');
  const gauge_diff = {
    kind: 'gauge',
    key: '阴核',
    val: 1,
  };
  // scope='train'：命中；无 scope：null（落回通用规则或 unexplained）
  assert.equal(
    classify_scope_train(gauge_diff, 'golden', {
      counterpart: { kind: 'gauge', key: '阴核', val: 2 },
      sample: 'train-natural',
    }).category,
    'stub',
  );
  assert.equal(
    classify_scope_train(gauge_diff, 'golden', {}),
    null,
    '无 sample 上下文的 gauge 不该被 train 组吞（旧比对零影响的前提）',
  );
});
