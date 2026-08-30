/**
 * ere/event/source-check.js 的行为测试（issue #45：@SOURCE_CHECK 的爱抚
 * 可达路径）。
 *
 * 缝 = test/helpers/era-fixture.js。覆盖：
 *   - **黄金样本比对**：emuera.log 第一次输入 0 之后的结算块（39 点线、源
 *     一览、体力气力条、9 个参数行）逐字节一致——角色状态按样本数值反推
 *     （ABL:0=3/ABL:1=0/顺从 0/欲望 1/侍奉精神 0/露出癖 0、CFLAG:16=-1
 *     初吻未体验、MARK:3=1 反抗刻印、调教者技巧 0），反推依据见 issue #45；
 *   - SOURCE→PALAM 换算的逐环节（调教者技巧档、欲情系数档、欲望档、情爱
 *     双梯、性行动双梯、露出的三路、爱液、不洁）——验收项「此行为有测试」；
 *   - 绝顶（阈值、DOWN 回落、NOWEX 只写不并、绝顶经验）；
 *   - 刻印取得（反抗/快乐）；
 *   - 体力气力扣减与钳制、气力 0 的损耗加倍；
 *   - TFLAG:59（旧 PREVCOM）/TFLAG:50；
 *   - 端到端：回合循环输入 0 → 全链输出 → 999 退出；
 *   - 存根清单核对（docs/stub-registry.md）。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');
const { seed_static_names } = require('./helpers/static-names');

// 世界底座 + 一回合爱抚的执行（COM0 + SOURCE_CHECK 全链）。post 在 COM0
// 之后、SOURCE_CHECK 之前执行（改源面做分环节断言用——COM0 会覆写源）
async function run_caress(seed, post) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  seed_static_names(fixture);
  fixture.era.beginTrain(0, 31);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = 0;
  era_flag.prevcom = 12;
  // 基础体格（各用例再按需覆盖）
  fixture.store.set('maxbase:31:0', 2000);
  fixture.store.set('maxbase:31:1', 2000);
  fixture.store.set('base:31:0', 1450);
  fixture.store.set('base:31:1', 410);
  if (seed) {
    seed(fixture);
  }
  fixture.load_module('system/train/com-caress');
  fixture.load_module('event/source-check');
  const { com_family } = fixture.load_module('system/train/com-family');
  const { emit } = fixture.load_module('system/event/registry');
  await com_family.call(0);
  if (post) {
    post(fixture);
  }
  await emit('SOURCE_CHECK');
  return fixture;
}

// 黄金样本的结算块（emuera.log :30-44——39 点线到反感行）
const GOLDEN_BLOCK = (() => {
  const log = fs.readFileSync(
    path.resolve(__dirname, '..', 'target', 'emuera.log'),
    'utf8',
  );
  return log.split(/\r?\n/).slice(29, 44);
})();

test('黄金样本比对：第一次爱抚的结算块 15 行逐字节一致（含推断角色状态）', async () => {
  const fixture = await run_caress((f) => {
    // 推断的温妮状态（反推依据记在 issue #45）：九个数全部由这套状态复现
    f.store.set('abl:31:0', 3); // SOURCE:0 = 1200
    f.store.set('abl:31:1', 0); // SOURCE:17 = 15
    f.store.set('abl:31:10', 0); // 顺从 0 档
    f.store.set('abl:31:11', 1); // 欲望 1 档（欲情 +47 的关键）
    f.store.set('abl:31:13', 0);
    f.store.set('abl:31:16', 0); // 侍奉精神 0 档（习得 +34）
    f.store.set('abl:31:17', 0); // 露出癖 0 档
    f.store.set('cflag:31:16', -1); // 初吻未体验（不洁源清零、情爱 ÷4）
    f.store.set('mark:31:3', 1); // 反抗刻印 LV1（恭顺 ×0.7 → +1）
    // 样本的参数面板（上一条指令·振动杖之后的值）
    f.store.set('palam:31:0', 5240);
    f.store.set('palam:31:3', 2854);
    f.store.set('palam:31:4', 6);
    f.store.set('palam:31:5', 2378);
    f.store.set('palam:31:6', 100);
    f.store.set('palam:31:7', 204);
    f.store.set('palam:31:8', 1654);
    f.store.set('palam:31:11', 3379);
    f.store.set('palam:31:13', 24);
    f.store.set('palam:31:14', 42);
    f.store.set('ex:31:0', 1); // [阴蒂绝顶：1次] 的计数
  });

  const texts = fixture.lines
    .map((l) => (l.type === 'divider' ? '§DIV§' : l.text))
    .filter((t) => !t.startsWith('（')); // 存根占位行是记名差异，不在比对面
  const start = texts.indexOf('‥'.repeat(39));
  assert.ok(start >= 0, '39 点线必须在输出里');
  const block = texts.slice(start, start + GOLDEN_BLOCK.length);
  assert.deepEqual(block, GOLDEN_BLOCK);

  // 结算终态：体力/气力与样本下一帧一致（1445 / 360），delta 已清零
  assert.equal(fixture.store.get('base:31:0'), 1445);
  assert.equal(fixture.store.get('base:31:1'), 360);
  assert.equal(fixture.store.get('delta:31:0'), 0);
  assert.equal(fixture.store.get('delta:31:5'), 0);
  // TFLAG:59 = 旧 PREVCOM（12）；TFLAG:50 = 0（主人调教）
  assert.equal(fixture.store.get('tflag:59'), 12);
  assert.equal(fixture.store.get('tflag:50'), 0);
});

// —— SOURCE → PALAM 换算的逐环节（验收项「此行为有测试」） ——

test('调教者技巧（ABL:PLAYER:12）六档：源的乘算逐档落进 palam', async () => {
  // 爱抚 SOURCE:0 = 2800（ABL:0 = 8 的 ELSE 档）×技巧档 → 欲情 LV0 ×0.5 →
  // ABL:0 > 5 的放大 ×(8+5)/10（:650-652，期望算式逐项同序）
  const rates = [0.5, 0.8, 1.0, 1.2, 1.5, 2.0];
  for (let skill = 0; skill <= 5; skill += 1) {
    const fixture = await run_caress((f) => {
      f.store.set('abl:31:0', 8);
      f.store.set('abl:0:12', skill);
    });
    const after_skill = Math.floor(2800 * rates[skill]);
    const after_desire = Math.floor(after_skill * 0.5);
    const expected = Math.floor((after_desire * 13) / 10);
    assert.equal(
      fixture.store.get('palam:31:0'),
      expected,
      `技巧 ${skill} 档：2800×${rates[skill]}×0.5×1.3`,
    );
  }
  // 技巧 ≥ 5 全落 2.0 档
  const fixture7 = await run_caress((f) => {
    f.store.set('abl:31:0', 8);
    f.store.set('abl:0:12', 7);
  });
  assert.equal(
    fixture7.store.get('palam:31:0'),
    Math.floor((Math.floor(Math.floor(2800 * 2.0) * 0.5) * 13) / 10),
  );
});

test('欲情系数五档：快乐源随当前欲情参数放大', async () => {
  // 2800 ×0.5(技巧 0) = 1400 → 欲情系数 → ABL>5 放大 ×1.3
  const cases = [
    [0, 0.5],
    [100, 0.7], // LV1 起步（≥100）
    [500, 1.0],
    [3000, 1.3],
    [10000, 1.8],
  ];
  for (const [palam5, rate] of cases) {
    const fixture = await run_caress((f) => {
      f.store.set('abl:31:0', 8);
      f.store.set('palam:31:5', palam5);
    });
    const expected = Math.floor((Math.floor(1400 * rate) * 13) / 10);
    assert.equal(
      fixture.store.get('palam:31:0'),
      expected,
      `欲情 ${palam5} → ×${rate}`,
    );
  }
});

test('欲望（ABL:11）档位：欲情参数的增量逐档（C/B/情爱三路合流）', async () => {
  // C 路：src0 = 20×0.5 = 10 ×欲望档；B 路：src17 = 15×0.5 = 7 ×欲望档；
  // 情爱路：src3 = 50 × LOVE 欲望梯（0.00 起步，独立于 C/B 的梯）
  const ladder = [0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5];
  const love_ladder = [0.0, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5];
  for (let d = 0; d <= 6; d += 1) {
    const fixture = await run_caress((f) => f.store.set('abl:31:11', d));
    const expected =
      Math.floor(10 * ladder[d]) +
      Math.floor(7 * ladder[d]) +
      Math.floor(50 * love_ladder[d]);
    assert.equal(fixture.store.get('palam:31:5'), expected, `欲望 ${d} 档`);
  }
});

test('情爱双梯（顺从 × 侍奉精神）：恭顺参数的来源', async () => {
  // SOURCE:3 = 50；顺从 2 档 ×0.4 → 20；侍奉精神 3 档 ×1.10 → 22
  const fixture = await run_caress((f) => {
    f.store.set('abl:31:10', 2);
    f.store.set('abl:31:16', 3);
  });
  assert.equal(
    fixture.store.get('palam:31:4'),
    Math.floor(Math.floor(50 * 0.4) * 1.1),
  );
});

test('性行动双梯（侍奉精神 × 侍奉技术）：习得参数的来源', async () => {
  // SOURCE:4 = 60；侍奉精神 2 档 ×1.00 → 60；侍奉技术 4 档 ×1.15 → 69
  const fixture = await run_caress((f) => {
    f.store.set('abl:31:16', 2);
    f.store.set('abl:31:13', 4);
  });
  assert.equal(
    fixture.store.get('palam:31:7'),
    Math.floor(Math.floor(60 * 1.0) * 1.15),
  );
});

test('露出的三路：欲情（露出癖）、耻情（衰减）、反感（顺从削）+ 润滑并进', async () => {
  // ABL:0 = 8 → UP:0 = 910、UP:14 = 3 → 快乐合计 913 > 100 → 液体源 =
  // floor(913/5) = 182 → UP:3 = 182 → 露出源 += (182-182)/2 = 0（仍 100）。
  // 露出癖 2 档（e0 = 0.2 / e2 = 0.7）：欲情 +20；耻情 1654（LV2 → ×0.70）
  // → +70；反感 = 100×0.7×0.5(顺从 0) = 35 + 不洁路（cflag16 未设 → 接吻侧
  // 素质修正走 else 支，不洁源 30 → DIRTY 反感 = 30×0.6 = 18）= 53
  const fixture = await run_caress((f) => {
    f.store.set('abl:31:0', 8);
    f.store.set('abl:31:17', 2);
    f.store.set('palam:31:8', 1654);
  });
  assert.equal(fixture.store.get('palam:31:8'), 1654 + 70, '耻情 ×0.70');
  assert.equal(
    fixture.store.get('palam:31:11'),
    35 + 18,
    '反感：露出×0.7×0.5 + 不洁×0.6',
  );
  assert.equal(fixture.store.get('palam:31:3'), 182, '液体源 = 快乐合计/5');
  assert(
    fixture
      .text_lines()
      .some(
        (l) =>
          l.startsWith('润滑') &&
          l.includes('+   182') &&
          l.includes('=   182'),
      ),
    '润滑行（0 + 182）',
  );
});

test('爱液处理：快乐合计 > 100 才产液体源（÷5）', async () => {
  // 低快乐（ABL:0 = 0 → UP:0 = 5 + UP:14 = 3 = 8 ≤ 100）→ 无液体源（行不显示）
  const low = await run_caress();
  assert.equal(low.store.get('palam:31:3') || 0, 0);

  // 高快乐（ABL:0 = 8 → 910 + 3 > 100）→ floor(913/5) = 182
  const high = await run_caress((f) => f.store.set('abl:31:0', 8));
  assert.equal(high.store.get('palam:31:3'), 182);
});

test('不洁源：顺从档削反感/不快（无初吻回避时不洁 30 在场）', async () => {
  const fixture = await run_caress((f) => {
    f.store.set('cflag:31:16', 3); // 已有接吻经验 → 不洁源保留
    f.store.set('abl:31:10', 2); // 顺从 2 档 → 反感 ×0.25 / 不快 ×0.6
  });
  // 反感 = 不洁 30×0.25 = 7 + 露出路（100×1.0×0.15 = 15）= 22；不快 = 18
  assert.equal(fixture.store.get('palam:31:11'), 7 + 15);
  assert.equal(fixture.store.get('palam:31:12'), Math.floor(30 * 0.6));
});

// —— 绝顶（@EX_CHECK_UP） ——

test('阴蒂绝顶：阈值越过 → 宣告行、DOWN 回落、NOWEX 只写不并、绝顶经验', async () => {
  const fixture = await run_caress((f) => {
    f.store.set('abl:31:0', 8); // UP:0 = 2800×0.5×0.5×1.3 = 910
    f.store.set('palam:31:0', 9800); // 9800 + 910 = 10710 ≥ 10000（LV4）
    f.store.set('ex:31:0', 2); // 既有累计（引擎 nextTurn 才并 nowex）
  });
  assert(
    fixture.text_lines().includes('阴蒂绝顶'),
    '普通档（×1 倍率）的宣告行',
  );
  // DOWN:0 = 10000 - 1000 = 9000 → palam = 9800 + 910 - 9000 = 1710
  assert.equal(fixture.store.get('palam:31:0'), 1710);
  assert.equal(fixture.store.get('nowex:31:0'), 1, 'NOWEX 写 1');
  assert.equal(fixture.store.get('ex:31:0'), 2, 'EX 合并留给引擎 nextTurn');
  assert.equal(fixture.store.get('exp:31:2'), 1, '绝顶经验 +1');
  assert.equal(fixture.store.get('tflag:29'), 1, 'ECST 快照');
  // 损耗追加：LOSEBASE:0 += 20、+10（体力/气力）
  assert.equal(fixture.store.get('base:31:0'), 1450 - 5 - 20);
  assert.equal(fixture.store.get('base:31:1'), 410 - 50 - 10);
});

test('无绝顶：不写 NOWEX、无宣告', async () => {
  const fixture = await run_caress();
  assert.equal(fixture.store.get('nowex:31:0'), 0);
  assert(!fixture.text_lines().includes('阴蒂绝顶'));
  assert(!fixture.text_lines().includes('最强阴蒂绝顶'));
});

// —— 刻印（@MARK_GOT_CHECK） ——

test('反抗刻印 LV1：反感+不快 ≥ 500 时取得', async () => {
  // COM0 会把 SOURCE:12 覆写成 100——post 钩子在 COM0 之后改大源面：
  // 露出源 1000 → 耻情 ×1.0、反感 ×0.5（顺从 0）= 500 ≥ 500
  const fixture = await run_caress(
    (f) => f.store.set('abl:31:10', 0),
    (f) => f.store.set('source:31:12', 1000),
  );
  assert.equal(fixture.store.get('mark:31:3'), 1);
  assert.equal(fixture.store.get('mark:31:4'), 1);
  assert(fixture.text_lines().includes('获得反抗刻印LV1'));
});

test('快乐刻印 LV1：快乐合计 ≥ 500 时取得', async () => {
  const fixture = await run_caress((f) => f.store.set('abl:31:0', 8));
  // UP:0 = 1400 ≥ 500
  assert.equal(fixture.store.get('mark:31:1'), 1);
  assert(fixture.text_lines().includes('获得快乐刻印LV1'));
});

test('调教者是助手时不取得反抗刻印（player != MASTER 判据）', async () => {
  // 构造助手调教世界：ASSIPLAY = 1、PLAYER = 助手
  const fixture = await run_caress((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.assiplay = 1;
    era_flag.player = 17;
    f.store.set('source:31:12', 1000);
  });
  assert.equal(fixture.store.get('mark:31:3'), undefined);
});

// —— 体力气力扣减 ——

test('气力耗尽（BASE:1 ≤ 0）：感情参数减半 + 损耗 ×2 + 80', async () => {
  const fixture = await run_caress((f) => {
    f.store.set('base:31:1', 0);
  });
  // 损耗 = 5 ×2 + 80 = 90；体力 1450 - 90 = 1360；气力 0 钳 0
  assert.equal(fixture.store.get('base:31:0'), 1450 - 90);
  assert.equal(fixture.store.get('base:31:1'), 0);
});

test('同一指令连续：快乐与感情参数减半 + 提示行', async () => {
  const fixture = await run_caress((f) => {
    const era_flag = f.load_module('era-utils/era-flag');
    era_flag.prevcom = 0; // 与 SELECTCOM 相同
    f.store.set('abl:31:0', 8); // UP:0 = 910 → 连续减半 → 455
  });
  assert.equal(fixture.store.get('palam:31:0'), 455);
  assert(fixture.text_lines().includes('＜连续执行同一指令＞'));
});

// —— 端到端：回合循环里的一条真实指令 ——

test('端到端：输入 0 → 爱抚全链输出 → 回合继续 → 999 退出', async () => {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  seed_static_names(fixture);
  fixture.store.set('maxbase:31:0', 2000);
  fixture.store.set('maxbase:31:1', 2000);
  fixture.store.set('base:31:0', 2000);
  fixture.store.set('base:31:1', 2000);
  fixture.load_module('event/event-train');
  fixture.load_module('event/event-com');
  fixture.load_module('event/event-comend');
  fixture.load_module('page/page-usercom');
  fixture.load_module('event/source-check');
  fixture.load_module('system/train/com-caress');
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.assi = -1;

  fixture.set_inputs(0, 999);
  const { run_train } = fixture.load_module('system/train/train-loop');
  assert.equal(await run_train(), 'AFTERTRAIN');

  const texts = fixture.text_lines();
  // 指令行 → 描写 → 反应（c = 5+3 = 8 < 100 → 第一档文本）→ 结算块全在。
  // （@EVENTTRAIN 的一串占位行在指令行之前，断言一律位置无关）
  assert(texts.includes('爱抚'));
  assert(texts.some((l) => l.includes('仔细爱抚着温妮的身体')));
  assert(
    texts.some((l) => l.includes('把身体扭来扭去、好像没有感觉到快感的样子')),
  );
  // 源一览：20×0.5(技巧) = 10、15×0.5 = 7（PLAYER_SKILL 已乘）
  assert(
    texts.includes('阴核(10)乳房(7)情爱(50)性行动(60)不洁(30)露出(100)　'),
  );
  assert(
    texts.some((l) => l.startsWith('阴核') && l.includes('+     5')),
    '参数变动行（阴核 0+5）',
  );
  // 指令按钮是按钮不是死文本（PR #53 通则）
  assert(
    fixture.lines.some(
      (l) =>
        l.type === 'button' && l.accelerator === 0 && l.rendered === '[0] 爱抚',
    ),
    '指令 0 的按钮（引擎拼 [0] 前缀）',
  );
  // 上次的调教指令行（PREVCOM 已更新为 0）
  assert(texts.includes('＜上次的调教指令：爱抚＞'));
  // SELECTCOM/PREVCOM 的写序（flag:10011 一次；10009 两次：-1 → 0）
  const writes = (id) =>
    fixture.var_writes.filter((w) => w.name === id).map((w) => w.value);
  assert.deepEqual(writes('flag:10011'), [0]);
  assert.deepEqual(writes('flag:10009'), [-1, 0]);
  // 结算恰一次（指令执行后）
  assert.equal(
    fixture.calls.filter((c) => c.api === 'nextTurnInTrain').length,
    1,
  );
});

// —— #216 J6：@LOST_VIRGIN_CHECK 正文（守卫之后的处女丧失处理） ——

test('LOST_VIRGIN_CHECK：守卫（TFLAG:19 = 0）→ 处女不动、无记录', async () => {
  const fixture = await run_caress((f) => f.store.set('talent:31:0', 1));
  assert.equal(fixture.store.get('talent:31:0'), 1, '处女未丧失');
  assert.equal(fixture.store.get('cflag:31:15'), undefined);
  assert.ok(!fixture.text_lines().includes('【处女丧失】'));
});

test('LOST_VIRGIN_CHECK：TFLAG:19 + 处女 → 丧失宣言、三面旗、初体验记录', async () => {
  const fixture = await run_caress(
    (f) => {
      f.store.set('talent:31:0', 1);
      f.store.set('callname:0:-1', '魔王');
    },
    (f) => f.store.set('tflag:19', 1),
  );
  assert.equal(
    fixture.store.get('talent:31:0'),
    0,
    'TALENT:0 清除（经 chara 门面）',
  );
  assert.ok(fixture.text_lines().includes('【处女丧失】'));
  assert.equal(fixture.store.get('tflag:3'), 1);
  assert.equal(
    fixture.store.get('tflag:31'),
    1,
    '本次调教处女丧失（event 门面）',
  );
  assert.equal(fixture.store.get('cflag:31:15'), 1, 'NO:PLAYER + 1 = 1');
  assert.equal(fixture.store.get('cstr:31:3'), '魔王');
});

test('LOST_VIRGIN_CHECK：摄影（tequip:53）→ TFLAG:32 |= 1（kojo 门面）', async () => {
  const fixture = await run_caress(
    (f) => {
      f.store.set('talent:31:0', 1);
      f.store.set('tequip:31:53', 1);
    },
    (f) => f.store.set('tflag:19', 1),
  );
  assert.equal(fixture.store.get('tflag:32'), 1);
});

test('LOST_VIRGIN_CHECK：CFLAG:15 已有记录 → 不覆盖；selectcom 11 → 101 覆盖码', async () => {
  const kept = await run_caress(
    (f) => {
      f.store.set('talent:31:0', 1);
      f.store.set('cflag:31:15', 77);
    },
    (f) => f.store.set('tflag:19', 1),
  );
  assert.equal(kept.store.get('cflag:31:15'), 77, '已有初体验记录不覆盖');

  const vibe = await run_caress(
    (f) => f.store.set('talent:31:0', 1),
    (f) => {
      f.store.set('tflag:19', 1);
      const ef = f.load_module('era-utils/era-flag');
      ef.selectcom = 11;
    },
  );
  assert.equal(vibe.store.get('cflag:31:15'), 101, '振动棒初体验覆盖码');
});

test('LOST_VIRGIN_CHECK：主人亲自 + 对象爱慕（85）→ 反抗刻印回避生效', async () => {
  // tflag:150 是回合内旗（MARK_GOT_CHECK 消费后清零，:1637），断言走
  // 消费效果：UP:11+12 ≥ 500 本应得反抗刻印，回避旗命中则不得
  const control = await run_caress(
    (f) => f.store.set('talent:31:0', 1),
    (f) => {
      f.store.set('tflag:19', 1);
      f.store.set('delta:31:11', 600);
    },
  );
  assert.equal(
    control.store.get('mark:31:4'),
    1,
    '对照组：无爱慕 → 反抗刻印 LV1',
  );

  const loved = await run_caress(
    (f) => {
      f.store.set('talent:31:0', 1);
      f.store.set('talent:31:85', 1); // 对象爱慕（主人亲自）
    },
    (f) => {
      f.store.set('tflag:19', 1);
      f.store.set('delta:31:11', 600);
    },
  );
  assert.equal(
    loved.store.get('mark:31:4'),
    undefined,
    '爱慕 → tflag:150 → 刻印回避',
  );
});

test('LOST_VIRGIN_CHECK：对象淫乱（76）→ 同款回避（SOURCE:6/15 的折算另有乘算位）', async () => {
  const control = await run_caress(
    (f) => f.store.set('talent:31:0', 1),
    (f) => {
      f.store.set('tflag:19', 1);
      f.store.set('delta:31:11', 600);
    },
  );
  assert.equal(control.store.get('mark:31:4'), 1);

  const lewd = await run_caress(
    (f) => {
      f.store.set('talent:31:0', 1);
      f.store.set('talent:31:76', 1); // 对象淫乱
    },
    (f) => {
      f.store.set('tflag:19', 1);
      f.store.set('delta:31:11', 600);
    },
  );
  assert.equal(
    lewd.store.get('mark:31:4'),
    undefined,
    '淫乱 → tflag:150 → 刻印回避',
  );
});

// —— 存根清单核对 ——

test('存根清单可检索：docs/stub-registry.md 收录这张票全部占位名', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = fixture.load_module('event/source-check');
  const registry = fs.readFileSync(
    path.resolve(__dirname, '..', 'docs', 'stub-registry.md'),
    'utf8',
  );
  for (const name of STUBBED_CALLS) {
    assert.ok(
      registry.includes(name),
      `docs/stub-registry.md 必须收录 ${name}`,
    );
  }
  // 组级登记（EQUIP_COM 是整组的代表名，清单里须有装备持续效果组行）
  assert.ok(registry.includes('装备持续效果'), '装备持续效果组行');
});

// —— #90：跨域写走门面（条目表 22 条清零的契约锁）——

test('跨域写走门面：22 条条目表寻址串的字面量 era.set/add 清零', () => {
  const text = fs.readFileSync(
    path.resolve(__dirname, '..', 'ere', 'event', 'source-check.js'),
    'utf8',
  );
  // 写侧零残留：#72 条目表里的 22 个寻址串，字面量形态的 era.set/era.add
  // 都必须消失（读侧 era.get 放行是 #70 决议，不在本锁范围）
  const gone = [
    'era.set(`mark:',
    'era.set(`abl:',
    'era.add(`exp:',
    'era.add(`cflag:',
    'era.set(`talent:${cid}:13`',
    "era.set('tflag:14'",
    "era.set('tflag:150'",
    "era.set('tflag:200'",
    "era.set('tflag:21'",
    "era.set('tflag:22'",
    "era.set('tflag:23'",
    "era.set('tflag:24'",
    "era.set('tflag:25'",
    "era.set('tflag:29'",
    "era.set('tflag:30'",
    "era.set('tflag:50'",
  ];
  for (const pattern of gone) {
    assert.ok(!text.includes(pattern), `跨域写必须走门面，仍见 ${pattern}`);
  }
  // 正面样本：属主域路径可检索（mark/abl 归 system、exp 归 dungeon、
  // cflag:2 归 chara、tflag 按属主分属 train/system）
  for (const sample of [
    'chara(cid).system.反抗刻印 = 1;',
    'chara(cid).system.顺从 = 0;',
    'chara(cid).system.欲望 = ex_l;',
    'chara(cid).dungeon.绝顶经验 +=',
    'chara(cid).dungeon.施虐快乐经验 += 1;',
    'chara(cid).chara.好感度 += r;',
    'chara(cid).chara.坦率 = 1;',
    'game.train.屈服刻印结算 = 1;',
    'game.train.主人经验 = 0;',
    'game.train.近亲与自我口上 = 0;',
    'game.system.反抗刻印回避 = 0;',
    'game.system.上次调教者是助手 =',
  ]) {
    assert.ok(text.includes(sample), `应包含门面写 ${sample}`);
  }
});
