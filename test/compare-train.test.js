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
 *   3. 归因的行为锁（#213 起）：编号在册判定经 L_IDX 映射——位次映射回
 *      L_I 才可归因「COM_ABLE 未过滤」，不在册/标签不配照旧 unexplained；
 *      #211 的 MENU_LABEL_SHIFT/VERSION_SKEW 豁免已随映射层落地整组拆除。
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
//   存根的大头 = 每屏 ~90 条 COM_ABLE 未过滤按钮 × 屏数 + 指令块输出 +
//   参数/结算数值差——阶段 4 的进度计本体。
//
// 【#213（J3）映射层落地后实测】ere 侧指令按钮自此印紧凑序号 L_IDX、
// 标签先过 @GET_ADV_COM（零规则的骨架态：升格标签的差仍在，随族票）。
// 四数原为 train-natural 552/176/2536/0、train-upgrade 150/52/830/0。
// 变化全部来自 #211 编号体系差豁免（MENU_LABEL_SHIFT 四标签精确配对 +
// VERSION_SKEW 裸编号）的整组拆除：两侧编号一致后，四个错位标签的差异
// 整对转匹配（natural +67 对 / upgrade +16 对），SKEW 兜底的 ere 独有
// 条目转「COM_ABLE 未过滤」记名存根（natural +42 / upgrade +20），
// version 归零。**这是收紧不是放宽**——豁免消失而不是扩围，unexplained
// 恒为 0 的底线不动。缺省样本同步 57/10/107 → 61/0/109。
//
// 【#214（J4）子菜单按钮组挂载后实测】@SHOW_USERCOM 的 [100]-[108]/
// [990] 按钮组 + 交代助手/对换调教守卫 + FLAG:550 守卫落地，golden 侧
// 原归「按钮组未挂载」的条目整组转匹配（natural +144 / upgrade +33）；
// GETBIT(FLAG:5,34) 渲染分流同步落地（replay 播种 flag:5 开局值，
// golden 的自定义菜单形态不变）。ere 多出的末屏按钮组条目挂进
// 「多出的方格屏」归因（同屏整组，见 rules.js）。
//
// 【#215（J5）服装前缀与 PRINT_CLOTHTYPE 真身后实测】回放世界播种着衣态
// （FLAG:37 = 1、CFLAG:41 = 5 紧身衣＆裙甲、CFLAG:40 = 15）后：早期的
// 【紧身衣＆裙甲的姿态】屏与带前缀的爱抚行转匹配；COM110（穿脱）未移植
// 使 ere 侧不扒光，后续屏的【全裸】与无前缀爱抚行是两态错位——ere 半边
// 经 rules.js 记名「COM110 未移植」（golden 半边走 STUB_TEXT_EXACT 既有
// 规则）。natural 619/2578 → 621/2574，upgrade 166/850 → 167/848。存根
// 差异净降 6：服装系统的记名差异从「前缀/显示未移植」转记「扒光指令未
// 移植」（J18 着装脱衣票落地时整组转匹配）。
//
// 【#214 与 #215 合并后重测（派单人在 rebase 时）】两票各自播种了 replay
// 世界的不同侧面（#214 的 flag:5 开局值、#215 的着衣态），合并后两组播种
// 同时生效，四数因此既不等于 #214 的也不等于 #215 的——合并态实测
// 765/2430、200/830。
//
// 【#216（J6）失神/精饮/避孕套真身后实测】@SOURCE_CHECK 的三个占位行
// （SEIIN_START / PASSOUT_CHECK / PASSOUT_TEXT）换真身，COM0 路径上
// 三者恒静默（绝顶强度 < 阈值、无 TFLAG:0/19 写入面）→ 存根差异
// natural −9（三回合 × 3 行）、upgrade −3，matched 不动，unexplained 恒 0。
//
// 同时生效，四数因此既不等于 #214 的也不等于 #215 的。
//
// 【#228（J18·COM110/111）落地后实测】COM110 真身 + 引擎「@COMxx 返回 0 →
// 回合取消」语义（era wiki Emuera/flow·TRAIN 节）落地后，COM110 的输出块
// （子菜单 + 全裸行）、RE_CLOTHED 行与扒光后的【全裸】屏整组转匹配；
// diff.js 的 menu 集合比对改为「相等 token 先配」（同号多条目在两侧的
// 次序受重绘屏数影响，按下标配对会把两侧同形的穿脱子菜单条目错开成伪
// change 对）；rules.js 的服装四条两态豁免与穿脱子菜单规则随之整组拆除。
// natural 765/2430 → 838/2158，upgrade 200/830 → 232/641。
//
// 【#216 与 #228 合并后重测（派单人在 rebase 时）】两票的减项独立叠加，
// 下面是合并态实测。
// 【#221（J11）性交系回放装载后重测】回放器此前漏装 com-sex，导致
// COM_ABLE20-29 缺失时按默认可执行。两份既有样本虽不选这些指令，漏装状态
// 仍会在每轮菜单错误列出它们；补齐真实装载面后，实际 guard 过滤掉的菜单
// 条目不再被误记为「COM_ABLE 未移植」存根。输出匹配数不变，存根自然态
// −142、升格态 −36。
//
// 【#229（J19）追加与高级族落地后重测】COM_ABLE120–135 真身守卫过滤了菜单
// 上原先按默认可执行的高级/可直选指令按钮。输出匹配数不变，存根自然态
// 1706 → 1672（−34）、升格态 556 → 546（−10）。unexplained 恒 0。
const BASELINE = {
  'train-natural': { matched: 940, version: 0, stub: 1672, unexplained: 0 },
  'train-upgrade': { matched: 257, version: 0, stub: 546, unexplained: 0 },
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

test('回放装载面：性交系的 COM、COM_ABLE 与消息分发均随真实路径注册', async () => {
  const { fixture } = await replay_train_sample('train-natural');
  const { com_able_family, com_family } = fixture.load_module(
    'system/train/com-family',
  );
  const { train_message_a_family, train_message_b_family } =
    fixture.load_module('system/train/train-message');

  for (const id of [20, 21, 22, 23, 24, 25, 26, 27, 28, 29]) {
    assert.equal(com_family.has(id), true, `COM${id} 必须随回放装载`);
    assert.equal(com_able_family.has(id), true, `COM_ABLE${id} 必须随回放装载`);
    assert.equal(
      train_message_a_family.has(id),
      true,
      `TRAIN_MESSAGE_A${id} 必须随回放装载`,
    );
    assert.equal(
      train_message_b_family.has(id),
      true,
      `TRAIN_MESSAGE_B${id} 必须随回放装载`,
    );
  }
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

// —— 3. 归因的行为锁（#213：L_IDX 在册判定与豁免拆除）——

test('ere 侧菜单条目的在册判定经 L_IDX 映射：位次映射回 L_I 才豁免（#213）', async () => {
  const { classify_entry } = require('../tools/compare/rules');
  // 野外PLAY 的 L_IDX 53（L_I 54）——不在 L_I 值域，但经位次映射在册
  //（#213 起 ere 按钮印紧凑序号，归因前先映射回 L_I）
  const hit = classify_entry(
    { kind: 'menu', key: '野外PLAY', val: 53 },
    'ere',
    {},
  );
  assert.equal(hit?.category, 'stub');
  assert.match(hit.reason, /COM_ABLE/);
  // L_I 侧直接在册（打屁股 40）照旧豁免——两套值域并存
  const direct = classify_entry(
    { kind: 'menu', key: '打屁股', val: 40 },
    'ere',
    {},
  );
  assert.equal(direct?.category, 'stub');
  assert.match(direct.reason, /COM_ABLE/);
});

test('不在册/标签不配的条目不被豁免（#211 的纪律在 #213 后继续成立）', async () => {
  const { classify_entry } = require('../tools/compare/rules');
  // 编号不在两套值域（178 既非 L_I——Train.csv 无此行、也非法位次 0-100）
  // → unexplained：值域判定若放宽成「任意编号」，COM_ABLE 回归就不可见了
  assert.equal(
    classify_entry({ kind: 'menu', key: '爱抚', val: 178 }, 'ere', {}),
    null,
    'ere 侧不在册编号必须 unexplained',
  );
  // golden 侧条目（无 ere 对应 = 该指令没被渲染，COM_ABLE 回归候选）：
  // 39 映射回 40 在册，但 golden 侧没有「值域豁免」这一档——必须
  // unexplained（#213 拆除后的正确形态：两侧编号一致，golden 独有条目
  // 只该是按钮组标签（存根待办）或真差异）
  assert.equal(
    classify_entry({ kind: 'menu', key: '爱抚', val: 39 }, 'golden', {}),
    null,
    'golden 侧条目不得被值域豁免吞掉',
  );
  // 按钮组标签（golden 侧）照旧走存根待办
  const usercom = classify_entry(
    { kind: 'menu', key: '能力表示', val: 100 },
    'golden',
    {},
  );
  assert.equal(usercom?.category, 'stub');
  assert.match(usercom.reason, /@SHOW_USERCOM/);
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
