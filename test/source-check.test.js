/**
 * ere/event/source-check.js 的行为测试（issue #45：@SOURCE_CHECK 的爱抚
 * 可达路径）。
 *
 * 缝 = test/helpers/era-fixture.js。覆盖：
 *   - SOURCE→PALAM 换算的逐环节（调教者技巧档、欲情系数档、欲望档、情爱
 *     双梯、性行动双梯、露出的三路、爱液、不洁）——验收项「此行为有测试」；
 *   - 绝顶（阈值、DOWN 回落、NOWEX 只写不并、绝顶经验）；
 *   - 刻印取得（反抗/快乐）；
 *   - 体力气力扣减与钳制、气力 0 的损耗加倍；
 *   - TFLAG:59（旧 PREVCOM）/TFLAG:50；
 *   - 端到端：回合循环输入 0 → 全链输出 → 999 退出；
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
  // TALENT:0:122 = 男人：调教者（chara 0）默认设定为男性，31 号温妮保持
  // 未声明（同 SOURCE_SEX_CHECK 视为非男性）。不设置时两者的 TALENT:122
  // 都读到 undefined，会被 source_sex_check() 误判为「双方均非男性」而
  // 触发 SOURCE_LESBIAN_SEX_CHECK；各用例如需测试同性分支，在 seed 钩子
  // 里显式覆盖。
  fixture.store.set('talent:0:122', 1);
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
          l.includes('+\u00A0\u00A0\u00A0182') &&
          l.includes('=\u00A0\u00A0\u00A0182'),
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
  // TALENT:0:122 = 男人：同 run_caress，避免 source_sex_check() 把默认的
  // 未声明值误判为「双方均非男性」触发 SOURCE_LESBIAN_SEX_CHECK。
  fixture.store.set('talent:0:122', 1);
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
    texts.some(
      (l) =>
        l ===
        `阴核${'\u00A0'.repeat(5)}0+${'\u00A0'.repeat(5)}5${'\u00A0'.repeat(7)}=${'\u00A0'.repeat(5)}5`,
    ),
    '参数变动行（阴核 0+5：算式五段全宽，无 DOWN 段的 7 位补白）',
  );
  assert(texts.includes('‥'.repeat(39)), '结算块的 39 字点线');
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
  // TFLAG:59（前前回指令）写的是旧 PREVCOM，不是当回 SELECTCOM
  assert.equal(
    fixture.store.get('tflag:59'),
    -1,
    'TFLAG:59 = 旧 PREVCOM（首轮是 -1，不是当回的 0）',
  );
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

// —— @INCEST / TARGET_* 早退（#220 J10 收口）——

test('INCEST：CFLAG:21–24 按顺序写 TFLAG:14，主人 + -1 强制父母关系', async () => {
  const fixture = await run_caress(
    (f) => {
      f.store.set('talent:0:122', 1);
      f.store.set('cflag:31:21', 100); // 1 / 100 + 1 = 2
      f.store.set('cflag:31:23', 300); // 后位覆盖为 4
      f.store.set('cflag:31:24', -1); // MASTER 特例最终覆盖为 1
    },
    (f) => f.store.set('tflag:19', 1),
  );
  assert.equal(fixture.store.get('tflag:14'), 1);
  assert.ok(fixture.text_lines().includes('父女相奸'), '主角 TALENT:122 为真');
});

test('INCEST：CFLAG:25 命中时有意读取 CFLAG:24 的上游字面行为', async () => {
  const fixture = await run_caress(
    (f) => {
      f.store.set('talent:0:122', 0); // 表弟相奸要求 PLAYER 非男人
      f.store.set('cflag:31:24', 400); // 被上游 CFLAG:25 分支读到 → 5
      f.store.set('cflag:31:25', 100); // 只负责命中 PLAYER 0
    },
    (f) => f.store.set('tflag:19', 1),
  );
  assert.equal(fixture.store.get('tflag:14'), 5);
  assert.ok(fixture.text_lines().includes('表弟相奸'));
});

test('INCEST：无亲族普通路径静默，SOURCE:3/14/16 不乘算', async () => {
  const fixture = await run_caress(undefined, (f) => {
    f.store.set('tflag:19', 1);
    f.store.set('source:31:3', 101);
    f.store.set('source:31:14', 103);
    f.store.set('source:31:16', 107);
  });
  assert.equal(fixture.store.get('tflag:14'), 0);
  assert.ok(!fixture.text_lines().some((line) => line.includes('相奸')));
});

test('INCEST_SEX_CHECK：父母 ×2、同胞 ×1.5，逐次向下取整', async () => {
  const parent = await run_caress(
    (f) => f.store.set('cflag:31:21', 0),
    (f) => {
      f.store.set('cflag:31:21', -1);
      f.store.set('tflag:19', 1);
      f.store.set('source:31:3', 101);
      f.store.set('source:31:14', 103);
      f.store.set('source:31:16', 107);
    },
  );
  // SOURCE_CHECK 后会转换并清源，故锁源一览行，而不是结尾 source 表。
  assert.ok(parent.text_lines().some((line) => line.includes('情爱(202)')));

  const sibling = await run_caress(
    (f) => f.store.set('cflag:31:23', 200), // 2 + 1 = 3
    (f) => {
      f.store.set('tflag:19', 1);
      f.store.set('source:31:3', 101);
      f.store.set('source:31:14', 103);
      f.store.set('source:31:16', 107);
    },
  );
  assert.ok(sibling.text_lines().some((line) => line.includes('情爱(151)')));
});

// —— SOURCE_LESBIAN_SEX_CHECK／SOURCE_GAY_SEX_CHECK（同性经验四段/单段级联） ——
//
// 断言只挑 SOURCE:3/4/5/7/8/13/14/17 中的 3/4/5/7/8/13/14：这几项在
// source_sex_check() 之后，直到 emit('SOURCE_CHECK') 收尾前都没有其他函数
// 覆写（已用调试脚本核实）；SOURCE:0/1/2/17 会被同一趟派发里稍后执行的
// player_skill_check/master_skill_check 等函数继续乘算，用它们断言会把
// 后续函数的行为也计入，而非 LESBIAN/GAY 两函数本身的产出。

test('SOURCE_LESBIAN_SEX_CHECK：TARGET 百合气质/中毒 + 调教者同名两项四段级联', async () => {
  const fixture = await run_caress(undefined, (f) => {
    f.store.set('talent:31:122', 0); // TARGET 非男人 → 选中 LESBIAN 分支
    f.store.set('talent:0:122', 0); // 调教者（player=0）非男人
    f.store.set('abl:31:22', 2); // TARGET 百合气质 tier2
    f.store.set('abl:31:33', 1); // TARGET 百合中毒 tier1
    f.store.set('abl:0:22', 3); // 调教者百合气质 tier3
    f.store.set('abl:0:33', 3); // 调教者百合中毒 tier3
    for (const i of [0, 1, 2, 3, 4, 5, 8, 13, 14, 17]) {
      f.store.set(`source:31:${i}`, 100);
    }
    f.store.set('source:31:7', 0);
  });
  // :8 100*0.4(A tier2)*0.6(B tier1)=24 ；:14 同 :8
  assert.equal(fixture.store.get('source:31:8'), 24);
  assert.equal(fixture.store.get('source:31:14'), 24);
  // :13 100*0.6(A tier2，B 不碰 13)=60
  assert.equal(fixture.store.get('source:31:13'), 60);
  // :7 0+200(A tier2)=200（B/C/D 均不加 :7）
  assert.equal(fixture.store.get('source:31:7'), 200);
  // :5 100*1.2(A)*1.2(B)=144 → *1.3(C tier3)=187 → *2.5(D tier3)=467
  assert.equal(fixture.store.get('source:31:5'), 467);
  // :3/:4 不经 A/B（两者都不碰 3/4），只经 C（tier3：3×1.4/4×1.3）、
  // D（tier3：3/4 同 ×2.5）
  assert.equal(fixture.store.get('source:31:3'), 350);
  assert.equal(fixture.store.get('source:31:4'), 325);
});

test('SOURCE_LESBIAN_SEX_CHECK：调教者百合中毒（ABL:PLAYER:33）无 0 档，ELSE 同时兜底 0 与 ≥5', async () => {
  const seed = (v) => (f) => {
    f.store.set('talent:31:122', 0);
    f.store.set('talent:0:122', 0);
    f.store.set('abl:31:22', 2);
    f.store.set('abl:31:33', 2);
    f.store.set('abl:0:22', 2); // 调教者百合气质 tier2 = 恒等，不干扰本项
    f.store.set('abl:0:33', v);
    f.store.set('source:31:3', 100);
  };
  const at0 = await run_caress(undefined, seed(0));
  const at2 = await run_caress(undefined, seed(2));
  const at5 = await run_caress(undefined, seed(5));
  assert.equal(at0.store.get('source:31:3'), 500); // ELSE：×5.0
  assert.equal(at2.store.get('source:31:3'), 200); // tier2：×2.0，与 ELSE 不同
  assert.equal(at5.store.get('source:31:3'), 500); // ELSE：与 0 档同值
});

test('SOURCE_GAY_SEX_CHECK：只按 TARGET 的ホモっ気（ABL:23）单段级联', async () => {
  const fixture = await run_caress(undefined, (f) => {
    f.store.set('talent:31:122', 1); // TARGET 男人
    f.store.set('talent:0:122', 1); // 调教者（player=0）也是男人 → 选中 GAY 分支
    f.store.set('abl:31:23', 1); // tier1
    for (const i of [0, 1, 2, 5, 8, 14, 17]) {
      f.store.set(`source:31:${i}`, 100);
    }
    f.store.set('source:31:7', 0);
  });
  assert.equal(fixture.store.get('source:31:7'), 10);
  assert.equal(fixture.store.get('source:31:8'), 200);
  assert.equal(fixture.store.get('source:31:14'), 200);
  assert.equal(fixture.store.get('source:31:5'), 70);
});

test('SOURCE_GAY_SEX_CHECK：ABL:23 ≥ 6 无 ELSE 兜底，整段跳过', async () => {
  const fixture = await run_caress(undefined, (f) => {
    f.store.set('talent:31:122', 1);
    f.store.set('talent:0:122', 1);
    f.store.set('abl:31:23', 6);
    f.store.set('source:31:8', 100);
  });
  assert.equal(fixture.store.get('source:31:8'), 100);
});

test('同性检查末尾：调教者克制（TALENT:PLAYER:20）令 SOURCE:4/5 各再减半', async () => {
  const restrained = await run_caress(undefined, (f) => {
    f.store.set('talent:31:122', 1);
    f.store.set('talent:0:122', 1);
    f.store.set('talent:0:20', 1);
    f.store.set('abl:31:23', 0); // tier0 本身已令 :5 ×0.5，验证叠加而非替代
    f.store.set('source:31:4', 100);
    f.store.set('source:31:5', 100);
  });
  assert.equal(restrained.store.get('source:31:4'), 50);
  assert.equal(restrained.store.get('source:31:5'), 25);

  const unrestrained = await run_caress(undefined, (f) => {
    f.store.set('talent:31:122', 1);
    f.store.set('talent:0:122', 1);
    f.store.set('talent:0:20', 0);
    f.store.set('abl:31:23', 0);
    f.store.set('source:31:4', 100);
  });
  assert.equal(unrestrained.store.get('source:31:4'), 100);
});

// —— SOUL_DISLOCATION_DEBUFF（灵魂错位减益） ——

test('SOUL_DISLOCATION_DEBUFF：按 EX_TALENT:0 等级缩放 SOURCE:8，无门槛判据', async () => {
  const lv2 = await run_caress(undefined, (f) => {
    f.store.set('ex_talent:31:0', 2); // 缩放比例 100-15*2=70%
    f.store.set('source:31:8', 1000);
  });
  assert.ok(lv2.text_lines().some((line) => line.includes('不洁(700)')));

  const lv4 = await run_caress(undefined, (f) => {
    f.store.set('ex_talent:31:0', 4); // 缩放比例 100-15*4=40%
    f.store.set('source:31:8', 500);
  });
  assert.ok(lv4.text_lines().some((line) => line.includes('不洁(200)')));
});

test('SOUL_DISLOCATION_DEBUFF：循环上界不含 19（SOURCE:19 不缩放）', async () => {
  const fixture = await run_caress(undefined, (f) => {
    f.store.set('ex_talent:31:0', 2);
    f.store.set('source:31:19', 999);
  });
  assert.equal(fixture.store.get('source:31:19'), 999);
});

// —— TARGET_EJAC_CHECK ——

// SOURCE_CHECK_UP_C/V/A/B/FREE 在 target_ejac_check 之前先跑，会按 COM0
// 残留的 SOURCE:0-19 往 delta:0/1/2/14 累加一截增量（真实行为，不是本票
// 引入）。要让 post 钩子里设置的 delta 原样传到 target_ejac_check，必须
// 先把这批 SOURCE 清零，否则 BASE:2 的最终值会带着 COM0 的残留偏移。
function zero_up_sources(f) {
  for (let i = 0; i <= 19; i += 1) {
    f.store.set(`source:31:${i}`, 0);
  }
}

test('TARGET_EJAC_CHECK：守卫（TALENT:121/122 均 0）→ 早退，无射精结算', async () => {
  const fixture = await run_caress(undefined, (f) => {
    f.store.set('maxbase:31:2', 1000);
    zero_up_sources(f);
    f.store.set('delta:31:0', 2500);
  });
  assert.equal(fixture.store.get('tflag:10') || 0, 0);
  assert.equal(fixture.store.get('base:31:2') || 0, 0);
  assert.ok(!fixture.text_lines().some((t) => t.includes('射精')));
});

test('TARGET_EJAC_CHECK：普通射精档（EJAC < BASE:2 ≤ EJAC*2），男人不加异常经验', async () => {
  const fixture = await run_caress(
    (f) => {
      f.store.set('talent:31:122', 1); // TARGET 男人
      f.store.set('maxbase:31:2', 1000);
      f.store.set('base:31:2', 0);
    },
    (f) => {
      zero_up_sources(f);
      f.store.set('delta:31:0', 2500);
      f.store.set('delta:31:1', 0);
      f.store.set('delta:31:2', 0);
      f.store.set('delta:31:14', 0);
    },
  );
  // LOCAL=2500 → 1000+idiv(1500,2)=1750 → BASE:2=1750，EJAC=1000：>1000 且不>2000
  assert.equal(fixture.store.get('source:31:12'), 10000); // EXP:3=0 < EXPLV[1]
  assert.equal(fixture.store.get('source:31:13'), 5000);
  const texts = fixture.text_lines();
  assert.ok(texts.includes('温妮射精'));
  assert.ok(texts.includes('射精经验+1'));
  assert.ok(!texts.some((t) => t.includes('异常经验')));
  assert.equal(fixture.store.get('exp:31:3'), 1);
  assert.equal(fixture.store.get('base:31:2'), 750); // 1750-1000=750，不再触发钳制
  assert.equal(fixture.store.get('stain:31:2'), 4);
  assert.equal(fixture.store.get('tflag:10'), 1);
  assert.equal(fixture.store.get('nowex:31:6'), 1);
  assert.equal(fixture.store.get('ex:31:6'), 1);
});

test('TARGET_EJAC_CHECK：大量射精档（BASE:2 > EJAC*2），扶她非男人 → 异常经验+1', async () => {
  const fixture = await run_caress(
    (f) => {
      f.store.set('talent:31:121', 1); // TARGET 扶她（非男人）
      f.store.set('maxbase:31:2', 1000);
      f.store.set('base:31:2', 0);
    },
    (f) => {
      zero_up_sources(f);
      f.store.set('delta:31:0', 6000);
      f.store.set('delta:31:1', 0);
      f.store.set('delta:31:2', 0);
      f.store.set('delta:31:14', 0);
    },
  );
  // LOCAL=6000 → 1000+idiv(5000,2)=3500 → BASE:2=3500，EJAC=1000：>2000
  assert.equal(fixture.store.get('source:31:12'), 20000); // EXP:3=0 < EXPLV[1]
  assert.equal(fixture.store.get('source:31:13'), 10000);
  const texts = fixture.text_lines();
  assert.ok(texts.includes('温妮大量射精'));
  assert.ok(texts.includes('精液经验+1'));
  assert.ok(texts.includes('射精经验+2'));
  assert.ok(texts.includes('异常经验+1'));
  assert.equal(fixture.store.get('exp:31:20'), 1);
  assert.equal(fixture.store.get('exp:31:50'), 1);
  assert.equal(fixture.store.get('exp:31:3'), 2);
  assert.equal(fixture.store.get('stain:31:2'), 4);
  assert.equal(fixture.store.get('tflag:10'), 2);
  assert.equal(fixture.store.get('nowex:31:5'), 1);
  assert.equal(fixture.store.get('ex:31:5'), 1);
  assert.equal(fixture.store.get('base:31:2'), 999); // 3500-2000=1500≥1000 → 钳制 EJAC-1
});

test('TARGET_EJAC_CHECK：大量射精档 + 男人 → 不加异常经验（!TALENT:122 判据）', async () => {
  const fixture = await run_caress(
    (f) => {
      f.store.set('talent:31:122', 1); // TARGET 男人
      f.store.set('maxbase:31:2', 1000);
      f.store.set('base:31:2', 0);
    },
    (f) => {
      zero_up_sources(f);
      f.store.set('delta:31:0', 6000);
    },
  );
  assert.ok(fixture.text_lines().includes('温妮大量射精')); // grade=2 仍成立
  assert.ok(!fixture.text_lines().some((t) => t.includes('异常经验')));
  assert.equal(fixture.store.get('exp:31:50') || 0, 0);
});

test('TARGET_EJAC_CHECK：EXPLV 中间档（EXPLV[2]≤EXP:3<EXPLV[3]）不与两端档位混淆', async () => {
  const fixture = await run_caress(
    (f) => {
      f.store.set('talent:31:121', 1);
      f.store.set('maxbase:31:2', 1000);
      f.store.set('base:31:2', 0);
      f.store.set('exp:31:3', 10); // EXPLV=[0,1,4,20,50,200]：4≤10<20 落 EXPLV[3] 档
    },
    (f) => {
      zero_up_sources(f);
      f.store.set('delta:31:0', 6000);
    },
  );
  assert.equal(fixture.store.get('source:31:12'), 7000);
  assert.equal(fixture.store.get('source:31:13'), 6000);
});

test('TARGET_EJAC_CHECK：三档判定边界，BASE:2 恰等于 EJAC*2 时归入普通档（非 >=）', async () => {
  const fixture = await run_caress(
    (f) => {
      f.store.set('talent:31:122', 1);
      f.store.set('maxbase:31:2', 1000); // EJAC=1000，EJAC*2=2000
      f.store.set('base:31:2', 0);
    },
    (f) => {
      zero_up_sources(f);
      f.store.set('delta:31:0', 3000); // 1000+idiv(2000,2)=2000 恰等于 EJAC*2
    },
  );
  // 恰等于 EJAC*2 不满足 `>`，应归入普通射精档（grade=1），不是大量射精档
  assert.ok(fixture.text_lines().includes('温妮射精'));
  assert.ok(!fixture.text_lines().includes('温妮大量射精'));
});

test('TARGET_EJAC_CHECK：EXPLV 最高档（EXP:3 ≥ 200）走 ELSE 分支，非 0 时不加异常经验', async () => {
  const fixture = await run_caress(
    (f) => {
      f.store.set('talent:31:121', 1);
      f.store.set('maxbase:31:2', 1000);
      f.store.set('base:31:2', 0);
      f.store.set('exp:31:3', 300);
    },
    (f) => {
      zero_up_sources(f);
      f.store.set('delta:31:0', 6000);
    },
  );
  assert.equal(fixture.store.get('source:31:12'), 1800);
  assert.equal(fixture.store.get('source:31:13'), 1200);
  assert.ok(!fixture.text_lines().some((t) => t.includes('异常经验')));
});

test('TARGET_EJAC_CHECK：七项乘算系数各自方向正确（克制/接受快感/淫乱化/否定快感/媚药/利尿剂/安全套）', async () => {
  // EJAC 设得足够大，任何一档系数都不会跨过三档判定门槛——只比较 BASE:2 这个中间量
  const seed_with = (overrides) => (f) => {
    f.store.set('talent:31:122', 1);
    f.store.set('maxbase:31:2', 100000);
    f.store.set('base:31:2', 0);
    for (const [k, v] of Object.entries(overrides)) {
      f.store.set(k, v);
    }
  };
  const post = (f) => {
    zero_up_sources(f);
    f.store.set('delta:31:0', 1000);
  };
  const baseline = await run_caress(seed_with({}), post);
  assert.equal(baseline.store.get('base:31:2'), 1000); // 1000+idiv(0,2)

  // 克制/媚药/利尿剂三项在 up_talent_cva_check（:691，先于本函数执行）里
  // 各自也响应同一个 TALENT/TEQUIP，对 delta:0 先做一次独立缩放——这是
  // 原作两个检查点各自命中同一素质的真实叠加，断言取叠加后的最终值。
  const restrained = await run_caress(seed_with({ 'talent:31:20': 1 }), post);
  // up_talent_cva_check：1000×0.3=300；target_ejac_check：idiv(300,2)=150→1000+idiv(-850,2)
  assert.equal(restrained.store.get('base:31:2'), 575);

  const accept = await run_caress(seed_with({ 'talent:31:70': 1 }), post);
  assert.equal(accept.store.get('base:31:2'), 1100); // 1000×1.2=1200→1000+idiv(200,2)

  const corrupt = await run_caress(seed_with({ 'talent:31:76': 1 }), post);
  assert.equal(corrupt.store.get('base:31:2'), 1050); // 1000×1.1=1100→1000+idiv(100,2)

  const deny = await run_caress(seed_with({ 'talent:31:71': 1 }), post);
  assert.equal(deny.store.get('base:31:2'), 900); // 1000×0.8=800→1000+idiv(-200,2)

  const aphrodisiac = await run_caress(seed_with({ 'tequip:31:21': 1 }), post);
  // up_talent_cva_check：1000×2.0=2000；target_ejac_check：2000×2=4000→1000+idiv(3000,2)
  assert.equal(aphrodisiac.store.get('base:31:2'), 2500);

  const diuretic = await run_caress(seed_with({ 'tequip:31:22': 1 }), post);
  // up_talent_cva_check：1000×0.7=700；target_ejac_check：idiv(700,2)=350→1000+idiv(-650,2)
  assert.equal(diuretic.store.get('base:31:2'), 675);

  const condom = await run_caress(seed_with({ 'tequip:31:37': 1 }), post);
  assert.equal(condom.store.get('base:31:2'), 750); // idiv(1000,2)=500→1000+idiv(-500,2)，无上游叠加
});

test('TARGET_EJAC_CHECK：未熟（TALENT:135）BASE:2 < 2000 → 提示语；巨量 UP 淹没随机波动', async () => {
  const fixture = await run_caress(
    (f) => {
      f.store.set('talent:31:135', 1);
      f.store.set('talent:31:122', 1);
      f.store.set('maxbase:31:2', 100000); // 避免三档判定介入，只看未熟专属提示
      f.store.set('base:31:2', 0); // < 2000
    },
    (f) => {
      zero_up_sources(f);
      f.store.set('delta:31:0', 1000000); // 随机波动 ±1099 远小于此量级
    },
  );
  assert.ok(
    fixture.text_lines().includes('温妮尚未成熟的阴茎似乎渐渐有了感觉。'),
  );
});

test('TARGET_EJAC_CHECK：未熟 BASE:2 ≥ 2000 且计算后回落 → 钳制回 2000', async () => {
  const fixture = await run_caress(
    (f) => {
      f.store.set('talent:31:135', 1);
      f.store.set('talent:31:122', 1);
      f.store.set('maxbase:31:2', 100000);
      f.store.set('base:31:2', 2000); // ≥ 2000
    },
    (f) => {
      zero_up_sources(f);
      f.store.set('delta:31:0', -1000000); // 巨量负值，淹没随机波动
    },
  );
  assert.equal(fixture.store.get('base:31:2'), 2000);
});

test('TARGET_EJAC_CHECK：未熟 + 大量射精 → 体力/气力上限下降且钳制下限 600/100', async () => {
  const fixture = await run_caress(
    (f) => {
      f.store.set('talent:31:135', 1);
      f.store.set('talent:31:122', 1);
      f.store.set('maxbase:31:2', 1000);
      f.store.set('base:31:2', 0);
      f.store.set('maxbase:31:0', 605); // -10 = 595 < 600 → 应钳制为 600
      f.store.set('maxbase:31:1', 105); // -30 = 75 < 100 → 应钳制为 100
    },
    (f) => {
      zero_up_sources(f);
      f.store.set('delta:31:0', 1000000); // 巨量正值，稳定落在大量射精档
    },
  );
  assert.equal(fixture.store.get('maxbase:31:0'), 600);
  assert.equal(fixture.store.get('maxbase:31:1'), 100);
  const texts = fixture.text_lines();
  assert.ok(texts.includes('温妮感到身体被掏空。'));
  assert.ok(texts.includes('体力上限下降了10。'));
  assert.ok(texts.includes('气力上限下降了30。'));
});

// —— TARGET_WORMBABY_CHECK ——

// ex_check_up（:1662，先于本函数执行）按「单个 UP 维度 ≥ PALAMLV[4]
// （10000）」独立判定绝顶，会往 SOURCE:12/13 追加自己的贡献，与
// TARGET_WORMBABY_CHECK 撞车。把总量摊到 UP:0/1/2/14 四个维度、每份都
// 低于阈值，总和仍够触发 LOCAL 的三档判定，同时避开绝顶判定这条独立支路。
function spread_local(f, total) {
  zero_up_sources(f);
  const quarter = Math.floor(total / 4);
  f.store.set('delta:31:0', quarter);
  f.store.set('delta:31:1', quarter);
  f.store.set('delta:31:2', quarter);
  f.store.set('delta:31:14', total - quarter * 3);
}

// —— TARGET_MILK_CHECK ——

// 全部用 UP:14（×3、无除法取整）单维驱动 LOCAL，数值可精确手算，且远低于
// ex_check_up 的绝顶阈值（10000），不会连带触发绝顶判定污染 SOURCE 断言。
test('TARGET_MILK_CHECK：守卫（TALENT:130=0）→ 早退，无喷乳结算', async () => {
  const fixture = await run_caress(undefined, (f) => {
    f.store.set('maxbase:31:3', 1000);
    zero_up_sources(f);
    f.store.set('delta:31:14', 1500);
  });
  assert.equal(fixture.store.get('tflag:11') || 0, 0);
  assert.equal(fixture.store.get('base:31:3') || 0, 0);
  assert.ok(!fixture.text_lines().some((t) => t.includes('母乳')));
});

test('TARGET_MILK_CHECK：普通档（EJAC < BASE:3 ≤ EJAC*2），EXP:54 非 0 时不加异常经验', async () => {
  const fixture = await run_caress(
    (f) => {
      f.store.set('talent:31:130', 1);
      f.store.set('maxbase:31:3', 1000);
      f.store.set('base:31:3', 0);
      f.store.set('exp:31:54', 3); // 避开「EXP:54=0 恒加异常经验」分支，见专门测试
    },
    (f) => {
      zero_up_sources(f);
      f.store.set('delta:31:14', 900);
    },
  );
  // LOCAL=900×3=2700 → 1000+idiv(1700,2)=1850 → BASE:3=1850，EJAC=1000：>1000 不>2000
  // EXPLV=[0,1,4,20,50,200]：EXP:54=3 不 <EXPLV[1]=1，但 <EXPLV[2]=4，落二档
  assert.equal(fixture.store.get('source:31:12'), 5000);
  assert.equal(fixture.store.get('source:31:13'), 4000);
  const texts = fixture.text_lines();
  assert.ok(texts.includes('温妮的乳头流出了母乳。'));
  assert.ok(texts.includes('喷奶经验+1'));
  assert.ok(!texts.some((t) => t.includes('异常经验')));
  assert.equal(fixture.store.get('exp:31:54'), 4);
  assert.equal(fixture.store.get('base:31:3'), 850); // 1850-1000=850，不再触发钳制
  assert.equal(fixture.store.get('stain:31:5'), 16);
  assert.equal(fixture.store.get('tflag:11'), 1);
  assert.equal(fixture.store.get('nowex:31:5'), 1);
  assert.equal(fixture.store.get('ex:31:5'), 1);
});

test('TARGET_MILK_CHECK：大量档（BASE:3 > EJAC*2）', async () => {
  const fixture = await run_caress(
    (f) => {
      f.store.set('talent:31:130', 1);
      f.store.set('maxbase:31:3', 1000);
      f.store.set('base:31:3', 0);
      f.store.set('exp:31:54', 3);
    },
    (f) => {
      zero_up_sources(f);
      f.store.set('delta:31:14', 1500);
    },
  );
  // LOCAL=1500×3=4500 → 1000+idiv(3500,2)=2750 → BASE:3=2750，EJAC=1000：>2000
  // EXP:54=3 落二档（同上）
  assert.equal(fixture.store.get('source:31:12'), 10000);
  assert.equal(fixture.store.get('source:31:13'), 8000);
  const texts = fixture.text_lines();
  assert.ok(texts.includes('温妮的乳头喷出了大量的母乳。'));
  assert.ok(texts.includes('喷奶经验+2'));
  assert.equal(fixture.store.get('exp:31:54'), 5);
  assert.equal(fixture.store.get('stain:31:5'), 16);
  assert.equal(fixture.store.get('tflag:11'), 2);
  assert.equal(fixture.store.get('nowex:31:5'), 1);
  assert.equal(fixture.store.get('ex:31:5'), 1);
  assert.equal(fixture.store.get('base:31:3'), 750); // 2750-2000=750，不再触发钳制
});

test('TARGET_MILK_CHECK：大量档 EXP:54=0 → EXPLV 最低档 + 恒加异常经验，不受性别门槛（区别于 TARGET_EJAC_CHECK）', async () => {
  const fixture = await run_caress(
    (f) => {
      f.store.set('talent:31:130', 1);
      f.store.set('talent:31:122', 1); // TARGET 男人——若照抄 EJAC 的性别门槛会被误挡
      // TALENT:122=1 同时解开 TARGET_EJAC_CHECK 的守卫；把它的 EJAC 钳制拉到
      // 天文数字，让它的 grade 恒为 0、早退不写 SOURCE，避免和本函数的
      // SOURCE:12/13 断言相撞（两函数同读 UP:14）
      f.store.set('maxbase:31:2', 999999);
      f.store.set('maxbase:31:3', 1000);
      f.store.set('base:31:3', 0);
      // exp:31:54 不设（保持 0）：EXPLV[1]=1，恰是「EXP:54 < EXPLV[1]」最低档
    },
    (f) => {
      zero_up_sources(f);
      f.store.set('delta:31:14', 1500); // 大量档
    },
  );
  assert.equal(fixture.store.get('source:31:12'), 20000);
  assert.equal(fixture.store.get('source:31:13'), 10000);
  const texts = fixture.text_lines();
  assert.ok(texts.includes('异常经验+1'));
  assert.equal(fixture.store.get('exp:31:50'), 1);
});

test('TARGET_MILK_CHECK：三档判定边界，BASE:3 恰等于 EJAC*2 时归入普通档（非 >=）', async () => {
  const fixture = await run_caress(
    (f) => {
      f.store.set('talent:31:130', 1);
      f.store.set('maxbase:31:3', 1000); // EJAC=1000，EJAC*2=2000
      f.store.set('base:31:3', 0);
      f.store.set('exp:31:54', 3);
    },
    (f) => {
      zero_up_sources(f);
      f.store.set('delta:31:14', 1000); // LOCAL=3000 → 1000+idiv(2000,2)=2000 恰等于 EJAC*2
    },
  );
  const texts = fixture.text_lines();
  assert.ok(texts.includes('温妮的乳头流出了母乳。'));
  assert.ok(!texts.includes('温妮的乳头喷出了大量的母乳。'));
});

test('TARGET_MILK_CHECK：EXPLV 中间档（EXPLV[2]≤EXP:54<EXPLV[3]）不与两端档位混淆', async () => {
  const fixture = await run_caress(
    (f) => {
      f.store.set('talent:31:130', 1);
      f.store.set('maxbase:31:3', 1000);
      f.store.set('base:31:3', 0);
      f.store.set('exp:31:54', 10); // EXPLV=[0,1,4,20,50,200]：4≤10<20 落 EXPLV[3] 档
    },
    (f) => {
      zero_up_sources(f);
      f.store.set('delta:31:14', 1500);
    },
  );
  assert.equal(fixture.store.get('source:31:12'), 7000);
  assert.equal(fixture.store.get('source:31:13'), 6000);
});

test('TARGET_MILK_CHECK：EXPLV 最高档（EXP:54 ≥ 200）走 ELSE 分支', async () => {
  const fixture = await run_caress(
    (f) => {
      f.store.set('talent:31:130', 1);
      f.store.set('maxbase:31:3', 1000);
      f.store.set('base:31:3', 0);
      f.store.set('exp:31:54', 300);
    },
    (f) => {
      zero_up_sources(f);
      f.store.set('delta:31:14', 1500);
    },
  );
  assert.equal(fixture.store.get('source:31:12'), 1800);
  assert.equal(fixture.store.get('source:31:13'), 1200);
});

test('TARGET_MILK_CHECK：十一项乘算系数各自方向正确（克制/接受快感/淫乱化/否定快感/乳房敏感/媚药/利尿剂/调教者幼儿退行/调教者幼稚/贫乳/绝壁）', async () => {
  // EJAC 设得足够大，任何一档系数都不会跨过三档判定门槛——只比较 BASE:3 这个中间量
  const seed_with = (overrides) => (f) => {
    f.store.set('talent:31:130', 1);
    f.store.set('maxbase:31:3', 100000);
    f.store.set('base:31:3', 0);
    for (const [k, v] of Object.entries(overrides)) {
      f.store.set(k, v);
    }
  };
  const post = (f) => {
    zero_up_sources(f);
    f.store.set('delta:31:14', 200);
  };
  const baseline = await run_caress(seed_with({}), post);
  assert.equal(baseline.store.get('base:31:3'), 800); // LOCAL=600→1000+idiv(-400,2)

  // 克制/媚药/利尿剂三项在 up_talent_cva_check（:691，先于本函数执行）里
  // 各自也响应同一个 TALENT/TEQUIP，对 delta:14 先做一次独立缩放——同
  // TARGET_EJAC_CHECK 的先例，断言取叠加后的最终值。
  const restrained = await run_caress(seed_with({ 'talent:31:20': 1 }), post);
  // cva：200×0.3=60；本函数：idiv(60×3,2)=90→1000+idiv(-910,2)
  assert.equal(restrained.store.get('base:31:3'), 545);

  const accept = await run_caress(seed_with({ 'talent:31:70': 1 }), post);
  assert.equal(accept.store.get('base:31:3'), 860); // 600×1.2=720→1000+idiv(-280,2)

  const corrupt = await run_caress(seed_with({ 'talent:31:76': 1 }), post);
  assert.equal(corrupt.store.get('base:31:3'), 830); // 600×1.1=660→1000+idiv(-340,2)

  const deny = await run_caress(seed_with({ 'talent:31:71': 1 }), post);
  assert.equal(deny.store.get('base:31:3'), 740); // 600×0.8=480→1000+idiv(-520,2)

  const sensitive = await run_caress(seed_with({ 'talent:31:108': 1 }), post);
  assert.equal(sensitive.store.get('base:31:3'), 950); // 600×1.5=900→1000+idiv(-100,2)

  const aphrodisiac = await run_caress(seed_with({ 'tequip:31:21': 1 }), post);
  // cva：200×2.0=400；本函数：(400×3)×2=2400→1000+idiv(1400,2)
  assert.equal(aphrodisiac.store.get('base:31:3'), 1700);

  const diuretic = await run_caress(seed_with({ 'tequip:31:22': 1 }), post);
  // cva：200×0.7=140；本函数：idiv(140×3,2)=210→1000+idiv(-790,2)
  assert.equal(diuretic.store.get('base:31:3'), 605);

  const regression = await run_caress(
    seed_with({ [`talent:0:131`]: 1 }), // 调教者（chara 0，PLAYER）幼儿退行
    post,
  );
  assert.equal(regression.store.get('base:31:3'), 1100); // 600×2=1200→1000+idiv(200,2)

  const childish = await run_caress(
    seed_with({ [`talent:0:132`]: 1 }), // 调教者幼稚
    post,
  );
  assert.equal(childish.store.get('base:31:3'), 1100);

  const flat = await run_caress(seed_with({ 'talent:31:109': 1 }), post);
  assert.equal(flat.store.get('base:31:3'), 650); // 600×0.5=300→1000+idiv(-700,2)

  const cliff = await run_caress(seed_with({ 'talent:31:116': 1 }), post);
  assert.equal(cliff.store.get('base:31:3'), 560); // 600×0.2=120→1000+idiv(-880,2)
});

test('TARGET_MILK_CHECK：搾乳器检查——TEQUIP:16 且非 TEQUIP:90 才累加 TFLAG:35（榨乳中）', async () => {
  const seed_with = (overrides) => (f) => {
    f.store.set('talent:31:130', 1);
    f.store.set('maxbase:31:3', 1000);
    f.store.set('base:31:3', 0);
    f.store.set('exp:31:54', 3);
    for (const [k, v] of Object.entries(overrides)) {
      f.store.set(k, v);
    }
  };
  const post = (f) => {
    zero_up_sources(f);
    f.store.set('delta:31:14', 900); // 普通档
  };

  const none = await run_caress(seed_with({}), post);
  assert.equal(none.store.get('tflag:35') || 0, 0);

  const collected = await run_caress(seed_with({ 'tequip:31:16': 1 }), post);
  assert.equal(collected.store.get('tflag:35'), 1);

  const overridden = await run_caress(
    seed_with({ 'tequip:31:16': 1, 'tequip:31:90': 1 }),
    post,
  );
  assert.equal(overridden.store.get('tflag:35') || 0, 0);
});

test('TARGET_WORMBABY_CHECK：守卫（TALENT:190/191 均 0）→ 早退，无出产结算', async () => {
  const fixture = await run_caress(undefined, (f) => spread_local(f, 30000));
  assert.equal(fixture.store.get('exp:31:60') || 0, 0);
  assert.ok(!fixture.text_lines().some((t) => t.includes('蠕虫')));
});

test('TARGET_WORMBABY_CHECK：普通出产档（10000 < LOCAL ≤ 25000），私处产卵单写 TFLAG:120', async () => {
  const fixture = await run_caress(
    (f) => f.store.set('talent:31:190', 1),
    (f) => spread_local(f, 15000),
  );
  assert.equal(fixture.store.get('source:31:12'), 10000); // EXP:3=0 < EXPLV[1]
  assert.equal(fixture.store.get('source:31:13'), 5000);
  const texts = fixture.text_lines();
  assert.ok(texts.includes('温妮的'));
  assert.ok(texts.includes('膣内排出了的蠕虫幼虫'));
  assert.ok(texts.includes('生育经验+1'));
  assert.equal(fixture.store.get('exp:31:60'), 1);
  assert.equal(fixture.store.get('tflag:120'), 1);
  assert.equal(fixture.store.get('tflag:121') || 0, 0);
});

test('TARGET_WORMBABY_CHECK：大量出产档（LOCAL > 25000），直肠产卵单写 TFLAG:121', async () => {
  const fixture = await run_caress(
    (f) => f.store.set('talent:31:191', 1),
    (f) => spread_local(f, 30000),
  );
  assert.equal(fixture.store.get('source:31:12'), 20000); // EXP:3=0 < EXPLV[1]
  assert.equal(fixture.store.get('source:31:13'), 10000);
  const texts = fixture.text_lines();
  assert.ok(texts.includes('温妮的'));
  assert.ok(texts.includes('直肠排出了大量的蠕虫幼虫'));
  assert.ok(texts.includes('生育经验+2'));
  assert.equal(fixture.store.get('exp:31:60'), 2);
  assert.equal(fixture.store.get('tflag:121'), 2);
  assert.equal(fixture.store.get('tflag:120') || 0, 0);
});

test('TARGET_WORMBABY_CHECK：私处+直肠同时产卵 → TFLAG:120/121 双写同一档位', async () => {
  const fixture = await run_caress(
    (f) => {
      f.store.set('talent:31:190', 1);
      f.store.set('talent:31:191', 1);
    },
    (f) => spread_local(f, 15000),
  );
  const texts = fixture.text_lines();
  assert.ok(texts.includes('温妮的'));
  assert.ok(texts.includes('膣内和直肠排出了的蠕虫幼虫'));
  assert.equal(fixture.store.get('tflag:120'), 1);
  assert.equal(fixture.store.get('tflag:121'), 1);
});

test('TARGET_WORMBABY_CHECK：EXPLV 最高档（EXP:3 ≥ 200）走 ELSE 分支', async () => {
  const fixture = await run_caress(
    (f) => {
      f.store.set('talent:31:190', 1);
      f.store.set('exp:31:3', 300);
    },
    (f) => spread_local(f, 30000),
  );
  assert.equal(fixture.store.get('source:31:12'), 1800);
  assert.equal(fixture.store.get('source:31:13'), 1200);
});

test('TARGET_WORMBABY_CHECK：EXPLV 中间档（EXPLV[2]≤EXP:3<EXPLV[3]）不与两端档位混淆', async () => {
  const fixture = await run_caress(
    (f) => {
      f.store.set('talent:31:190', 1);
      f.store.set('exp:31:3', 10); // EXPLV=[0,1,4,20,50,200]：4≤10<20 落 EXPLV[3] 档
    },
    (f) => spread_local(f, 30000),
  );
  assert.equal(fixture.store.get('source:31:12'), 7000);
  assert.equal(fixture.store.get('source:31:13'), 6000);
});

test('TARGET_WORMBABY_CHECK：五项乘算系数各自方向正确（克制/接受快感/淫乱化/否定快感/媚药）', async () => {
  // 无可读中间量，只能靠「是否跨过 10000/25000 门槛」间接验证方向——
  // 各系数各选一个刚好卡在门槛两侧的 baseline。克制/媚药同时被
  // up_talent_cva_check（:691，先于本函数执行）按同一 TALENT/TEQUIP
  // 做过一次独立缩放，此处断言的是叠加后的最终方向。
  const seed_with = (overrides) => (f) => {
    f.store.set('talent:31:190', 1);
    for (const [k, v] of Object.entries(overrides)) {
      f.store.set(k, v);
    }
  };
  const post = (delta) => (f) => {
    zero_up_sources(f);
    f.store.set('delta:31:0', delta);
  };
  const has_output = (f) => f.text_lines().some((t) => t.includes('蠕虫'));

  const accept_off = await run_caress(seed_with({}), post(9000));
  assert.ok(!has_output(accept_off)); // 9000 ≤ 10000
  const accept_on = await run_caress(
    seed_with({ 'talent:31:70': 1 }),
    post(9000),
  );
  assert.ok(has_output(accept_on)); // ×1.2 → 10800 > 10000

  const corrupt_off = await run_caress(seed_with({}), post(9500));
  assert.ok(!has_output(corrupt_off)); // 9500 ≤ 10000
  const corrupt_on = await run_caress(
    seed_with({ 'talent:31:76': 1 }),
    post(9500),
  );
  assert.ok(has_output(corrupt_on)); // ×1.1 → 10450 > 10000

  const deny_off = await run_caress(seed_with({}), post(11000));
  assert.ok(has_output(deny_off)); // 11000 > 10000
  const deny_on = await run_caress(
    seed_with({ 'talent:31:71': 1 }),
    post(11000),
  );
  assert.ok(!has_output(deny_on)); // ×0.8 → 8800 ≤ 10000

  const restrained_off = await run_caress(seed_with({}), post(20000));
  assert.ok(has_output(restrained_off)); // 20000 > 10000
  const restrained_on = await run_caress(
    seed_with({ 'talent:31:20': 1 }),
    post(20000),
  );
  // up_talent_cva_check：20000×0.3=6000；本函数：idiv(6000,2)=3000 ≤ 10000
  assert.ok(!has_output(restrained_on));

  const aphrodisiac_off = await run_caress(seed_with({}), post(9000));
  assert.ok(!has_output(aphrodisiac_off)); // 9000 ≤ 10000
  const aphrodisiac_on = await run_caress(
    seed_with({ 'tequip:31:21': 1 }),
    post(9000),
  );
  // up_talent_cva_check：9000×2.0=18000；本函数：18000×2=36000 > 25000
  // 断言落在大量档（非仅普通档），确认本函数自身的 ×2 折算确有生效
  assert.ok(
    aphrodisiac_on.text_lines().some((t) => t.includes('排出了大量的蠕虫幼虫')),
  );

  // 克制的内部折算专项边界：up_talent_cva_check 先 ×0.3，需要落在使
  // 「本函数再 idiv(,2) 与否」恰好决定是否触发的窗口（(10000,20000]）
  const restrained_boundary = await run_caress(
    seed_with({ 'talent:31:20': 1 }),
    post(40000),
  );
  // up_talent_cva_check：40000×0.3=12000；本函数 idiv(12000,2)=6000 ≤ 10000
  assert.ok(!has_output(restrained_boundary));
});

// —— PISSING_ECST_CHECK ——

// TFLAG:29 由 ecst_check（:1555，先于本函数执行）按本回合实际绝顶次数
// 覆写，不能直接注入——用单一部位（UP:0）的量级控制 ex_c 的离散档位
// （0/1/2/4/9），避开多部位同时绝顶的倍率加成（≥2 部位才生效）。全部用例
// 都要开 TEQUIP:22（利尿剂），它同时被 up_talent_cva_check（:691，先于
// ex_check_up 执行）读取、把 UP:0 缩到 0.7 倍——阈值按此放大留足余量。
function seed_t29(f, t29) {
  const thresholds = { 1: 15000, 2: 30000, 4: 150000, 9: 500000 };
  zero_up_sources(f);
  f.store.set('delta:31:0', thresholds[t29] ?? 0);
  f.store.set('delta:31:1', 0);
  f.store.set('delta:31:2', 0);
  f.store.set('delta:31:14', 0);
}

test('PISSING_ECST_CHECK：守卫（TFLAG:29=0）→ 无输出，EXP:31 不变', async () => {
  const fixture = await run_caress(
    (f) => {
      f.store.set('tequip:31:22', 1);
      f.store.set('talent:31:57', 1);
    },
    (f) => seed_t29(f, 0),
  );
  assert.equal(fixture.store.get('exp:31:31') || 0, 0);
  assert.ok(!fixture.text_lines().some((t) => t.includes('放尿经验')));
});

test('PISSING_ECST_CHECK：五档级联按判据优先级依次命中', async () => {
  // grade5：TFLAG:29≥7 且两开关全开——最高优先级
  const g5 = await run_caress(
    (f) => {
      f.store.set('tequip:31:22', 1);
      f.store.set('talent:31:57', 1);
    },
    (f) => seed_t29(f, 9),
  );
  assert.ok(g5.text_lines().includes('放尿经验+5'));
  assert.equal(g5.store.get('exp:31:31'), 5);

  // grade4：TFLAG:29≥7 且仅 TEQUIP:22（漏尿癖不参与也够）
  const g4 = await run_caress(
    (f) => f.store.set('tequip:31:22', 1),
    (f) => seed_t29(f, 9),
  );
  assert.ok(g4.text_lines().includes('放尿经验+4'));
  assert.equal(g4.store.get('exp:31:31'), 4);

  // grade3：TFLAG:29≥3 且两开关全开（不到 grade4/5 的 TFLAG:29 门槛）
  const g3 = await run_caress(
    (f) => {
      f.store.set('tequip:31:22', 1);
      f.store.set('talent:31:57', 1);
    },
    (f) => seed_t29(f, 4),
  );
  assert.ok(g3.text_lines().includes('放尿经验+3'));
  assert.equal(g3.store.get('exp:31:31'), 3);

  // grade2：TFLAG:29≥1 且两开关全开（走 grade2 第三个 OR 分支）
  const g2 = await run_caress(
    (f) => {
      f.store.set('tequip:31:22', 1);
      f.store.set('talent:31:57', 1);
    },
    (f) => seed_t29(f, 2),
  );
  assert.ok(g2.text_lines().includes('放尿经验+2'));
  assert.equal(g2.store.get('exp:31:31'), 2);

  // grade1：TFLAG:29≥1 且仅 TEQUIP:22
  const g1 = await run_caress(
    (f) => f.store.set('tequip:31:22', 1),
    (f) => seed_t29(f, 1),
  );
  assert.ok(g1.text_lines().includes('放尿经验+1'));
  assert.equal(g1.store.get('exp:31:31'), 1);

  // grade3 的 (TFLAG:29≥7 && 漏尿癖) 分支：不开 TEQUIP:22，只靠漏尿癖单独
  // 命中——其余 grade3/4/5 分支都要求 TEQUIP:22，能把这一支单独筛出来
  const g3_tal57_only = await run_caress(
    (f) => f.store.set('talent:31:57', 1),
    (f) => seed_t29(f, 9),
  );
  assert.ok(g3_tal57_only.text_lines().includes('放尿经验+3'));

  // grade1 的 (TFLAG:29≥3 && 漏尿癖) 分支：不开 TEQUIP:22，只靠漏尿癖单独
  // 命中——TFLAG:29=4 时更高档全不成立，只有这一支能兜底
  const g1_tal57_only = await run_caress(
    (f) => f.store.set('talent:31:57', 1),
    (f) => seed_t29(f, 4),
  );
  assert.ok(g1_tal57_only.text_lines().includes('放尿经验+1'));
});

test('PISSING_ECST_CHECK：TEQUIP:22 清零规则——≥3 档恒清零，2 档看漏尿癖，1 档不清零', async () => {
  // grade3 恒清零（不论漏尿癖）
  const g3 = await run_caress(
    (f) => {
      f.store.set('tequip:31:22', 1);
      f.store.set('talent:31:57', 1);
    },
    (f) => seed_t29(f, 4),
  );
  assert.equal(g3.store.get('tequip:31:22') || 0, 0);

  // grade2 + 漏尿癖 → 不清零（SIF TALENT:57==0 才清零）
  const g2_with_tal57 = await run_caress(
    (f) => {
      f.store.set('tequip:31:22', 1);
      f.store.set('talent:31:57', 1);
    },
    (f) => seed_t29(f, 2),
  );
  assert.equal(g2_with_tal57.store.get('tequip:31:22'), 1);

  // grade2 无漏尿癖 → 清零（TFLAG:29≥3 && TEQUIP:22 分支，不需要 TALENT:57）
  const g2_without_tal57 = await run_caress(
    (f) => f.store.set('tequip:31:22', 1),
    (f) => seed_t29(f, 4),
  );
  assert.equal(g2_without_tal57.store.get('tequip:31:22') || 0, 0);

  // grade1 从不清零
  const g1 = await run_caress(
    (f) => f.store.set('tequip:31:22', 1),
    (f) => seed_t29(f, 1),
  );
  assert.equal(g1.store.get('tequip:31:22'), 1);
});

test('PISSING_ECST_CHECK：STAIN:2/3 弄脏标记（阴茎/阴道污渍位 32）', async () => {
  const fixture = await run_caress(
    (f) => f.store.set('tequip:31:22', 1),
    (f) => seed_t29(f, 1),
  );
  assert.equal(fixture.store.get('stain:31:2'), 32);
  assert.equal(fixture.store.get('stain:31:3'), 32);
});

// —— EXP_GOT_CHECK ——

// 分散到 UP:0/1/2/14 四个维度（每维远低于 ex_check_up 的单维阈值
// PALAMLV[4]=10000），凑「快乐 UP 总和」又不触发绝顶判定的连带污染。
function spread_pleasure(f, total) {
  const quarter = Math.floor(total / 4);
  f.store.set('delta:31:0', quarter);
  f.store.set('delta:31:1', quarter);
  f.store.set('delta:31:2', quarter);
  f.store.set('delta:31:14', total - quarter * 3);
}

test('EXP_GOT_CHECK 段 1：守卫（TFLAG:100=0）与 UP:7<100 强制 LOCAL=0', async () => {
  const guard_off = await run_caress(undefined, (f) => {
    zero_up_sources(f);
    spread_pleasure(f, 3000);
    f.store.set('delta:31:7', 1000);
  });
  assert.ok(!guard_off.text_lines().some((t) => t.includes('侍奉快乐经验')));

  const up7_low = await run_caress(
    (f) => f.store.set('tflag:100', 1),
    (f) => {
      zero_up_sources(f);
      spread_pleasure(f, 12000); // 即使快乐 UP 总和很大
      f.store.set('delta:31:7', 50); // UP:7<100 → LOCAL 强制 0
    },
  );
  assert.ok(!up7_low.text_lines().some((t) => t.includes('侍奉快乐经验')));
});

test('EXP_GOT_CHECK 段 1：最低/最高档级联，UP:11/UP:12 各自折减', async () => {
  const low = await run_caress(
    (f) => f.store.set('tflag:100', 1),
    (f) => {
      zero_up_sources(f);
      spread_pleasure(f, 500);
      f.store.set('delta:31:7', 300); // UP:7<700 → ×2；LOCAL=500×2=1000
      f.store.set('delta:31:11', 1000);
      f.store.set('delta:31:12', 1000);
    },
  );
  assert.ok(low.text_lines().includes('侍奉快乐经验+1'));
  assert.equal(low.store.get('exp:31:21'), 1);
  assert.equal(low.store.get('tflag:26'), 1);
  // delta 在 SOURCE_CHECK 收尾由 palam_up_check 结算进 palam 并清零
  // （文件头「与引擎的职责划分」节），断言折减落点而非中间态
  assert.equal(low.store.get('palam:31:11'), 900); // 1000×0.9
  assert.equal(low.store.get('palam:31:12'), 800); // 1000×0.8

  const high = await run_caress(
    (f) => f.store.set('tflag:100', 1),
    (f) => {
      zero_up_sources(f);
      spread_pleasure(f, 3000);
      f.store.set('delta:31:7', 2000); // UP:7≥1500 → ×4；LOCAL=3000×4=12000
      f.store.set('delta:31:11', 1000);
      f.store.set('delta:31:12', 1000);
    },
  );
  assert.ok(high.text_lines().includes('侍奉快乐经验+16'));
  assert.equal(high.store.get('exp:31:21'), 16);
  assert.equal(high.store.get('palam:31:11'), 650); // 1000×0.65
  assert.equal(high.store.get('palam:31:12'), 300); // 1000×0.3

  // UP:7 中间档（700≤UP:7<1500 → ×3，与两端 ×2/×4 档区分）
  const mid = await run_caress(
    (f) => f.store.set('tflag:100', 1),
    (f) => {
      zero_up_sources(f);
      spread_pleasure(f, 1000);
      f.store.set('delta:31:7', 800); // ×3；LOCAL=1000×3=3000
    },
  );
  assert.ok(mid.text_lines().includes('侍奉快乐经验+4'));
});

test('EXP_GOT_CHECK 段 1：TEQUIP:88（驯兽陪玩）联动主从爱情经验', async () => {
  const fixture = await run_caress(
    (f) => {
      f.store.set('tflag:100', 1);
      f.store.set('tequip:31:88', 1);
    },
    (f) => {
      zero_up_sources(f);
      spread_pleasure(f, 3000);
      f.store.set('delta:31:7', 2000);
    },
  );
  assert.ok(fixture.text_lines().includes('主从爱情经验+16'));
  assert.equal(fixture.store.get('exp:31:64'), 16);

  // 对照：grade 非 0 但无 TEQUIP:88 → 不触发主从爱情经验
  const without_tequip88 = await run_caress(
    (f) => f.store.set('tflag:100', 1),
    (f) => {
      zero_up_sources(f);
      spread_pleasure(f, 3000);
      f.store.set('delta:31:7', 2000);
    },
  );
  assert.ok(without_tequip88.text_lines().includes('侍奉快乐经验+16'));
  assert.ok(
    !without_tequip88.text_lines().some((t) => t.includes('主从爱情经验')),
  );
});

test('EXP_GOT_CHECK 段 2：无 TFLAG:100 守卫；UP:2<300 强制 LOCAL=0；UP:11/12/6 三项折减', async () => {
  const no_guard = await run_caress(undefined, (f) => {
    zero_up_sources(f);
    f.store.set('delta:31:2', 2000); // <5000 → ×2；LOCAL=2000×2=4000，落[3000,5000) → grade=4
    f.store.set('delta:31:11', 1000);
    f.store.set('delta:31:12', 1000);
    f.store.set('delta:31:6', 1000);
  });
  assert.ok(no_guard.text_lines().includes('肛门快乐经验+4'));
  assert.equal(no_guard.store.get('exp:31:32'), 4);
  assert.equal(no_guard.store.get('tflag:28'), 4);
  assert.equal(no_guard.store.get('palam:31:11'), 900); // 1000×0.9
  assert.equal(no_guard.store.get('palam:31:12'), 950); // 1000×0.95
  assert.equal(no_guard.store.get('palam:31:6'), 1050); // 1000×1.05

  const up2_low = await run_caress(undefined, (f) => {
    zero_up_sources(f);
    f.store.set('delta:31:2', 200); // <300 → LOCAL 强制 0
  });
  assert.ok(!up2_low.text_lines().some((t) => t.includes('肛门快乐经验')));

  // 最高档：UP:2=15000（≥10000 → ×4；LOCAL=60000≥12000）。UP:2 同时会
  // 触发 ex_check_up 的肛门绝顶判定（:1662，check_part(2,2,...)），其
  // SOURCE:13 累加经 source_check_up_submit（:2985，晚于本函数执行）
  // 连带污染 UP:6——用差分法消去这个定量污染：两次跑的绝顶贡献相同，
  // palam:31:6 差值只剩本函数 ×1.2 折减的净增量。
  const highest_base = await run_caress(undefined, (f) => {
    zero_up_sources(f);
    f.store.set('delta:31:2', 15000);
    f.store.set('delta:31:6', 1000);
  });
  assert.ok(highest_base.text_lines().includes('肛门快乐经验+16'));
  const highest_more = await run_caress(undefined, (f) => {
    zero_up_sources(f);
    f.store.set('delta:31:2', 15000);
    f.store.set('delta:31:6', 2000);
  });
  assert.equal(
    highest_more.store.get('palam:31:6') - highest_base.store.get('palam:31:6'),
    1200, // (2000-1000)×1.2
  );
});

test('EXP_GOT_CHECK 段 3：快乐 UP 总和为 0 时回退 UP:5；LOCAL/UP:9 双阈值', async () => {
  const fallback = await run_caress(undefined, (f) => {
    zero_up_sources(f);
    f.store.set('delta:31:0', 0);
    f.store.set('delta:31:1', 0);
    f.store.set('delta:31:2', 0);
    f.store.set('delta:31:14', 0);
    f.store.set('delta:31:5', 300); // 回退后 LOCAL=UP:5=300
    f.store.set('delta:31:9', 100);
    f.store.set('delta:31:11', 1000);
  });
  assert.ok(fallback.text_lines().includes('被虐快乐经验+1'));
  assert.equal(fallback.store.get('exp:31:30'), 1);
  assert.equal(fallback.store.get('tflag:27'), 1);
  assert.equal(fallback.store.get('palam:31:11'), 900); // 1000×0.9

  const direct = await run_caress(undefined, (f) => {
    zero_up_sources(f);
    f.store.set('delta:31:0', 600);
    f.store.set('delta:31:1', 0);
    f.store.set('delta:31:2', 0);
    f.store.set('delta:31:14', 0);
    f.store.set('delta:31:9', 300);
  });
  assert.ok(direct.text_lines().includes('被虐快乐经验+2'));

  // 中间档（LOCAL≥1500 && UP:9≥1000 → grade=8），与两端档位区分
  const mid = await run_caress(undefined, (f) => {
    zero_up_sources(f);
    f.store.set('delta:31:0', 1500);
    f.store.set('delta:31:9', 1000);
  });
  assert.ok(mid.text_lines().includes('被虐快乐经验+8'));
});

test('EXP_GOT_CHECK 段 3：TEQUIP:88（驯兽陪玩）联动从属快乐经验', async () => {
  const fixture = await run_caress(
    (f) => f.store.set('tequip:31:88', 1),
    (f) => {
      zero_up_sources(f);
      f.store.set('delta:31:0', 600);
      f.store.set('delta:31:9', 300);
    },
  );
  assert.ok(fixture.text_lines().includes('从属快乐经验+2'));
  assert.equal(fixture.store.get('exp:31:63'), 2);

  // 对照：grade 非 0 但无 TEQUIP:88 → 不触发从属快乐经验
  const without_tequip88 = await run_caress(undefined, (f) => {
    zero_up_sources(f);
    f.store.set('delta:31:0', 600);
    f.store.set('delta:31:9', 300);
  });
  assert.ok(without_tequip88.text_lines().includes('被虐快乐经验+2'));
  assert.ok(
    !without_tequip88.text_lines().some((t) => t.includes('从属快乐经验')),
  );
});

test('EXP_GOT_CHECK 段 3：助手侧按 ABL:20+TEQUIP:47 六档二次折算', async () => {
  // 固定 grade=4（LOCAL≥1000 && UP:9≥500），只变助手侧的折算档位
  const post = (f) => {
    zero_up_sources(f);
    f.store.set('delta:31:0', 1000);
    f.store.set('delta:31:9', 500);
  };
  const run = (overrides) =>
    run_caress((f) => {
      join_slave_chara(f, 17, '玛奥');
      const era_flag = f.load_module('era-utils/era-flag');
      era_flag.assiplay = 1;
      era_flag.assi = 17;
      for (const [k, v] of Object.entries(overrides)) {
        f.store.set(k, v);
      }
    }, post);

  const g0 = await run({ 'abl:17:20': 0 });
  assert.ok(!g0.text_lines().some((t) => t.includes('施虐快乐经验')));
  assert.equal(g0.store.get('exp:17:33') || 0, 0);

  const g1 = await run({ 'abl:17:20': 1 });
  assert.ok(g1.text_lines().includes('施虐快乐经验+2(玛奥)')); // 4×0.5
  assert.equal(g1.store.get('exp:17:33'), 2);
  assert.ok(!g1.text_lines().some((t) => t.includes('点数+')));

  const g2 = await run({ 'abl:17:20': 2 });
  assert.ok(g2.text_lines().includes('施虐快乐经验+4(玛奥)'));
  assert.equal(g2.store.get('exp:17:33'), 4);
  assert.ok(g2.text_lines().some((t) => t.includes('点数+2(玛奥)'))); // idiv(4,2)
  assert.equal(g2.store.get('juel:17:5'), 2);

  const g3 = await run({ 'abl:17:20': 3 });
  assert.ok(g3.text_lines().includes('施虐快乐经验+4(玛奥)'));
  assert.ok(g3.text_lines().some((t) => t.includes('点数+8(玛奥)'))); // 4×2
  assert.equal(g3.store.get('juel:17:5'), 8);

  const g4 = await run({ 'abl:17:20': 4 });
  assert.ok(g4.text_lines().some((t) => t.includes('点数+40(玛奥)'))); // 4×10
  assert.equal(g4.store.get('juel:17:5'), 40);

  const g5 = await run({ 'abl:17:20': 5 });
  assert.ok(g5.text_lines().some((t) => t.includes('点数+200(玛奥)'))); // 4×50
  assert.equal(g5.store.get('juel:17:5'), 200);
});

// —— SOKUOCHI_CHECK ——

test('SOKUOCHI_CHECK：守卫（TALENT:73=0）→ 早退，ABL 不变', async () => {
  const fixture = await run_caress(undefined, (f) => {
    zero_up_sources(f);
    f.store.set('delta:31:0', 5000);
  });
  assert.equal(fixture.store.get('abl:31:0') || 0, 0);
  assert.ok(!fixture.text_lines().some((t) => t.endsWith('了')));
});

test('SOKUOCHI_CHECK：12 组各自驱动升到 LV1，门槛组读到同轮内已升级的新值', async () => {
  // 不预置任何前置 ABL：驱动组在代码顺序上先于门槛组执行，本轮把 ABL:0/1/11
  // 从 0 升到 1 后，紧随其后的 ABL:16/17/21/22/23 门槛检查读到的正是这个
  // 新值——这是 ELSEIF 链顺序执行的真实语义，不是分两轮才生效。
  const fixture = await run_caress(
    (f) => {
      f.store.set('talent:31:73', 1);
    },
    (f) => {
      zero_up_sources(f);
      for (const k of [0, 1, 2, 14, 4, 5, 6, 7, 8, 9]) {
        f.store.set(`delta:31:${k}`, 2);
      }
      f.store.set('exp:31:40', 2);
      f.store.set('exp:31:41', 2);
    },
  );
  const texts = fixture.text_lines();
  const cases = [
    [0, '阴蒂感觉'],
    [2, '私处感觉'],
    [3, '肛门感觉'],
    [1, '乳房感觉'],
    [10, '顺从'],
    [11, '欲望'],
    [12, '技巧'],
    [16, '侍奉精神'],
    [17, '露出癖'],
    [21, '抖M气质'],
    [22, '百合气质'],
    [23, '断背气质'],
  ];
  for (const [abl, name] of cases) {
    assert.equal(fixture.store.get(`abl:31:${abl}`), 1, `ABL:${abl}`);
    assert.ok(texts.includes(`${name}LV1了`), `${name}LV1了`);
  }
});

test('SOKUOCHI_CHECK：ELSEIF 链每轮只前进一档，不因巨量值跳档', async () => {
  const from_zero = await run_caress(
    (f) => {
      f.store.set('talent:31:73', 1);
    },
    (f) => {
      zero_up_sources(f);
      f.store.set('delta:31:4', 5000);
    },
  );
  assert.equal(from_zero.store.get('abl:31:10'), 1);
  assert.ok(from_zero.text_lines().includes('顺从LV1了'));

  const from_two = await run_caress(
    (f) => {
      f.store.set('talent:31:73', 1);
      f.store.set('abl:31:10', 2);
    },
    (f) => {
      zero_up_sources(f);
      f.store.set('delta:31:4', 5000);
    },
  );
  assert.equal(from_two.store.get('abl:31:10'), 3);
  assert.ok(from_two.text_lines().includes('顺从LV3了'));
});

test('SOKUOCHI_CHECK：阈值不含等号——UP:4=1 不触发，UP:4=2 才触发', async () => {
  const fixture = await run_caress(
    (f) => {
      f.store.set('talent:31:73', 1);
    },
    (f) => {
      zero_up_sources(f);
      f.store.set('delta:31:4', 1);
    },
  );
  assert.equal(fixture.store.get('abl:31:10') || 0, 0);
  assert.ok(!fixture.text_lines().includes('顺从LV1了'));
});

test('SOKUOCHI_CHECK：ABL:0 性别专属文案——男人/扶她显示阴茎感觉，否则通用名', async () => {
  const male = await run_caress(
    (f) => {
      f.store.set('talent:31:73', 1);
      f.store.set('talent:31:122', 1);
    },
    (f) => {
      zero_up_sources(f);
      f.store.set('delta:31:0', 2);
    },
  );
  assert.ok(male.text_lines().includes('阴茎感觉LV1了'));

  const futa = await run_caress(
    (f) => {
      f.store.set('talent:31:73', 1);
      f.store.set('talent:31:121', 1);
    },
    (f) => {
      zero_up_sources(f);
      f.store.set('delta:31:0', 2);
    },
  );
  assert.ok(futa.text_lines().includes('阴茎感觉LV1了'));
});

test('SOKUOCHI_CHECK：钝感封印（TALENT:101/103/105/107 的 &2 位）逐组阻断自身升级', async () => {
  const guards = [
    { talent: 101, up: 0, abl: 0, name: '阴蒂感觉' },
    { talent: 103, up: 1, abl: 2, name: '私处感觉' },
    { talent: 105, up: 2, abl: 3, name: '肛门感觉' },
    { talent: 107, up: 14, abl: 1, name: '乳房感觉' },
  ];
  for (const g of guards) {
    const fixture = await run_caress(
      (f) => {
        f.store.set('talent:31:73', 1);
        f.store.set(`talent:31:${g.talent}`, 2);
      },
      (f) => {
        zero_up_sources(f);
        f.store.set(`delta:31:${g.up}`, 5000);
      },
    );
    assert.equal(fixture.store.get(`abl:31:${g.abl}`) || 0, 0, `ABL:${g.abl}`);
    assert.ok(
      !fixture.text_lines().some((t) => t.startsWith(g.name)),
      `${g.name} 不应输出`,
    );
  }
});

test('SOKUOCHI_CHECK：前置 ABL 门槛——驱动组本轮未升级时，门槛组同样不升级', async () => {
  const gates = [
    { drive: 'delta:31:6', ablTarget: 16, name: '侍奉精神' },
    { drive: 'delta:31:8', ablTarget: 17, name: '露出癖' },
    { drive: 'delta:31:9', ablTarget: 21, name: '抖M气质' },
    { drive: 'exp:31:40', ablTarget: 22, name: '百合气质' },
    { drive: 'exp:31:41', ablTarget: 23, name: '断背气质' },
  ];
  for (const g of gates) {
    const fixture = await run_caress(
      (f) => {
        f.store.set('talent:31:73', 1);
      },
      (f) => {
        zero_up_sources(f);
        // 门槛来源（ABL:0/1/11）本轮保持 0：不驱动对应的 UP，门槛 >=1 不满足
        f.store.set(g.drive, 5000);
      },
    );
    assert.equal(
      fixture.store.get(`abl:31:${g.ablTarget}`) || 0,
      0,
      `ABL:${g.ablTarget}`,
    );
    assert.ok(
      !fixture.text_lines().some((t) => t.startsWith(g.name)),
      `${g.name} 不应输出`,
    );
  }
});

test('SOKUOCHI_CHECK：UP 阈值表与 EXP 阈值表不同——同一驱动值 35 落在不同档位', async () => {
  // ELSEIF 链每轮只前进一档（同上一测试），要让本轮落在 LV2/LV3，须先把
  // 起点垂到前一档，让「35 越过的第一个未达档位」正好是要验证的那一档。
  const fixture = await run_caress(
    (f) => {
      f.store.set('talent:31:73', 1);
      f.store.set('abl:31:10', 1);
      f.store.set('abl:31:22', 2);
      f.store.set('abl:31:11', 3); // 满足 ABL:22 门槛 ABL:11>=3
    },
    (f) => {
      zero_up_sources(f);
      f.store.set('delta:31:4', 35); // TIERS：35>30 且不>60 → LV2
      f.store.set('exp:31:40', 35); // EXP_TIERS：35>20 且不>40 → LV3
    },
  );
  assert.equal(fixture.store.get('abl:31:10'), 2);
  assert.ok(fixture.text_lines().includes('顺从LV2了'));
  assert.equal(fixture.store.get('abl:31:22'), 3);
  assert.ok(fixture.text_lines().includes('百合气质LV3了'));
});

test('SOKUOCHI_CHECK：驱动下标不与相邻组混淆（ABL:2 读 UP:1 非 UP:0；ABL:21 读 UP:9 非 UP:8）', async () => {
  const fixture = await run_caress(
    (f) => {
      f.store.set('talent:31:73', 1);
    },
    (f) => {
      zero_up_sources(f);
      // UP:0 保持 0（不驱动 ABL:0），只驱动 UP:1；若 ABL:2 误读 UP:0 则不触发
      f.store.set('delta:31:1', 2);
      // UP:5 驱动欲望本轮先到 LV1，满足 ABL:21 门槛；UP:8 保持 0（不驱动
      // ABL:17），只驱动 UP:9；若 ABL:21 误读 UP:8 则不触发
      f.store.set('delta:31:5', 2);
      f.store.set('delta:31:9', 2);
    },
  );
  assert.equal(fixture.store.get('abl:31:2'), 1);
  assert.ok(fixture.text_lines().includes('私处感觉LV1了'));
  assert.equal(fixture.store.get('abl:31:0') || 0, 0);
  assert.equal(fixture.store.get('abl:31:21'), 1);
  assert.ok(fixture.text_lines().includes('抖M气质LV1了'));
  assert.equal(fixture.store.get('abl:31:17') || 0, 0);
});

test('SOKUOCHI_CHECK：ABL:12（技巧）用 UP 阈值表，不是 EXP 阈值表', async () => {
  // 起点垂到 LV1；驱动值 20 在 TIERS 下不越过 LV2 门槛（30），在 EXP_TIERS
  // 下会越过（5）——两表在这个起点/驱动值组合下给出不同结果，能区分误用
  const fixture = await run_caress(
    (f) => {
      f.store.set('talent:31:73', 1);
      f.store.set('abl:31:12', 1);
    },
    (f) => {
      zero_up_sources(f);
      f.store.set('delta:31:7', 20);
    },
  );
  assert.equal(fixture.store.get('abl:31:12'), 1);
  assert.ok(!fixture.text_lines().some((t) => t.startsWith('技巧')));
});

test('SOKUOCHI_CHECK：ABL:17（露出癖）门槛来源是乳房感觉，不是欲望', async () => {
  // 本轮把欲望驱动到 LV1、乳房感觉保持 0：正确门槛（乳房感觉>=1）应挡住
  // ABL:17；若门槛误用欲望（本轮同样是 1）则会误放行
  const fixture = await run_caress(
    (f) => {
      f.store.set('talent:31:73', 1);
    },
    (f) => {
      zero_up_sources(f);
      f.store.set('delta:31:5', 2); // 欲望本轮升到 LV1
      f.store.set('delta:31:8', 2); // 驱动 ABL:17 自身，门槛不满足应被挡住
    },
  );
  assert.equal(fixture.store.get('abl:31:1') || 0, 0);
  assert.equal(fixture.store.get('abl:31:17') || 0, 0);
  assert.ok(!fixture.text_lines().some((t) => t.startsWith('露出癖')));
});

// —— AUTO_NUM_CHECK ——

// 无调用点（调用方 @SOURCE_CHECK_AUTO 仍是存根），不走 run_caress/COM0/
// SOURCE_CHECK 事件——只建立 delta 桶（beginTrain）后直接单测导出函数，
// 避免 SOURCE_CHECK 内其余已实现函数（up_talent_cva_check 等）对 delta
// 的连带修改污染断言。
function build_auto_num_fixture() {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  fixture.era.beginTrain(0, 31);
  return fixture;
}

test('AUTO_NUM_CHECK：跳过边界 LOCAL≥11 && LOCAL!=14（10/11/14/15 四点）', async () => {
  const fixture = build_auto_num_fixture();
  const { auto_num_check } = fixture.load_module('event/source-check');
  fixture.store.set('cflag:31:667', 0); // <5 档，×1.25
  for (let i = 0; i <= 16; i += 1) {
    fixture.store.set(`delta:31:${i}`, 100);
  }
  auto_num_check(31);
  assert.equal(fixture.store.get('delta:31:10'), 125); // 保留，×1.25
  assert.equal(fixture.store.get('delta:31:11'), 100); // 跳过，不变
  assert.equal(fixture.store.get('delta:31:14'), 125); // ==14 例外，保留
  assert.equal(fixture.store.get('delta:31:15'), 100); // 跳过，不变
});

test('AUTO_NUM_CHECK：CFLAG:667（自动调教回数）八档阈值', async () => {
  const rates = [
    [0, 1.25],
    [5, 1.5],
    [10, 2.1],
    [15, 2.85],
    [20, 3.9],
    [25, 5.3],
    [30, 7.25],
    [40, 9.9],
  ];
  for (const [rate, m] of rates) {
    const fixture = build_auto_num_fixture();
    const { auto_num_check } = fixture.load_module('event/source-check');
    fixture.store.set('cflag:31:667', rate);
    fixture.store.set('delta:31:0', 100);
    auto_num_check(31);
    assert.equal(
      fixture.store.get('delta:31:0'),
      Math.floor(100 * m),
      `CFLAG:667=${rate}`,
    );
  }
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
    'game.train.屈服刻印结算 = 1;',
    'game.train.主人经验 = 0;',
    'incest(cid, player); // :284-285 CALL INCEST',
    'game.system.反抗刻印回避 = 0;',
    'game.system.上次调教者是助手 =',
  ]) {
    assert.ok(text.includes(sample), `应包含门面写 ${sample}`);
  }
});

// —— #221 J11：SYSTEM_SOURCE.ERB :426-473 对象避孕套与膣内射精计数 ——

async function run_ejaculation_settlement({
  seed,
  selectcom = 20,
  assiplay = 0,
  assi = -1,
}) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  if (assi >= 1) {
    fixture.seed_chara(assi, {
      id: assi,
      name: `助手${assi}`,
      callname: `助手${assi}`,
    });
    fixture.era.addCharacter(assi);
  }
  seed_static_names(fixture);
  fixture.era.beginTrain(0, 31);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.player = assiplay ? assi : 0;
  era_flag.assi = assi;
  era_flag.assiplay = assiplay;
  era_flag.selectcom = selectcom;
  era_flag.prevcom = -1;
  fixture.store.set('callname:31:-2', '温妮');
  fixture.load_module('event/source-check');
  if (seed) seed(fixture, era_flag);
  const { emit } = fixture.load_module('system/event/registry');
  await emit('SOURCE_CHECK');
  return fixture;
}

test('射精结算：目标避孕套先清 TFLAG:10 与装备，阻止同回合逆侵犯计数', async () => {
  const fixture = await run_ejaculation_settlement({
    selectcom: 24,
    seed: (f) => {
      f.store.set('tequip:31:37', 1);
      f.store.set('tflag:10', 2);
    },
  });
  assert.equal(fixture.store.get('tequip:31:37'), 0);
  assert.equal(fixture.store.get('tflag:10'), 0);
  assert.equal(fixture.store.get('cflag:0:104'), undefined);
  assert.ok(fixture.text_lines().includes('射在避孕套里（温妮）'));
});

// —— #461：SYSTEM_SOURCE.ERB :19-51 避孕套判定（谁在戴 + 独立的助手射精分支）——

test('避孕套判定：主人戴着 + 命中任一射精 TFLAG → 清位并打印固定文本', async () => {
  const fixture = await run_ejaculation_settlement({
    seed: (f) => {
      f.store.set('tequip:31:35', 1);
      f.store.set('tflag:2', 1);
    },
  });
  assert.equal(fixture.store.get('tequip:31:35'), 0);
  assert.equal(fixture.store.get('tflag:2'), 0);
  assert.ok(fixture.text_lines().includes('射在避孕套里'));
});

test('避孕套判定：调教者是助手 + 助手戴着 + 命中射精 TFLAG → 清位并打印固定文本', async () => {
  const fixture = await run_ejaculation_settlement({
    assi: 17,
    assiplay: 1,
    seed: (f) => {
      f.store.set('tequip:31:36', 1);
      f.store.set('tflag:0', 1);
    },
  });
  assert.equal(fixture.store.get('tequip:31:36'), 0);
  assert.equal(fixture.store.get('tflag:0'), 0);
  assert.ok(fixture.text_lines().includes('射在避孕套里'));
});

test('避孕套判定：助手射精独立分支 → 打印整行含助手称呼（全角括号，%SAVESTR:ASSI%→callname:-2）', async () => {
  const fixture = await run_ejaculation_settlement({
    assi: 17,
    seed: (f, era_flag) => {
      f.store.set(`callname:${era_flag.assi}:-2`, '小助手');
      f.store.set('tequip:31:36', 1);
      f.store.set('tflag:6', 1);
    },
  });
  assert.equal(fixture.store.get('tequip:31:36'), 0);
  assert.equal(fixture.store.get('tflag:6'), 0);
  assert.ok(fixture.text_lines().includes('射在避孕套里（小助手）'));
});

test('射精结算：TFLAG:19 严格优先链的每对相邻分支', async () => {
  const cases = [
    [
      '3P 助手优先于 3P 主人',
      { assi: 17, assiplay: 1 },
      (f) => {
        f.store.set('tflag:19', 1);
        f.store.set('tflag:6', 2);
        f.store.set('tflag:41', 1);
        f.store.set('tflag:2', 3);
        f.store.set('tflag:40', 1);
        f.store.set('tflag:38', 7);
      },
      'cflag:31:103',
      7,
      'cflag:31:101',
    ],
    [
      '3P 主人优先于兽奸',
      {},
      (f) => {
        f.store.set('tflag:19', 1);
        f.store.set('tflag:2', 2);
        f.store.set('tflag:40', 1);
        f.store.set('tflag:38', 7);
        f.store.set('tequip:31:89', 1);
        f.store.set('tflag:16', 9);
      },
      'cflag:31:101',
      7,
      'cflag:31:106',
    ],
    [
      '兽奸优先于普通助手',
      { assi: 17, assiplay: 1 },
      (f) => {
        f.store.set('tflag:19', 1);
        f.store.set('tflag:2', 2);
        f.store.set('tflag:38', 7);
        f.store.set('tequip:31:89', 1);
        f.store.set('tflag:16', 9);
      },
      'cflag:31:106',
      9,
      'cflag:31:103',
    ],
    [
      '普通助手优先于死斗场',
      { assi: 17, assiplay: 1 },
      (f) => {
        f.store.set('tflag:19', 1);
        f.store.set('tflag:2', 2);
        f.store.set('tflag:38', 7);
        f.store.set('tequip:31:55', 1);
        f.store.set('tflag:15', 9);
      },
      'cflag:31:103',
      7,
      'cflag:31:107',
    ],
    [
      '死斗场优先于主人',
      {},
      (f) => {
        f.store.set('tflag:19', 1);
        f.store.set('tflag:2', 2);
        f.store.set('tflag:38', 7);
        f.store.set('tequip:31:55', 1);
        f.store.set('tflag:15', 9);
      },
      'cflag:31:107',
      9,
      'cflag:31:101',
    ],
    [
      '主人优先于触手',
      {},
      (f) => {
        f.store.set('tflag:19', 1);
        f.store.set('tflag:2', 2);
        f.store.set('tflag:38', 7);
        f.store.set('tequip:31:90', 1);
        f.store.set('tequip:31:11', 1);
        f.store.set('tflag:15', 9);
      },
      'cflag:31:101',
      7,
      'cflag:31:107',
    ],
  ];
  for (const [name, options, seed, key, value, skipped] of cases) {
    const fixture = await run_ejaculation_settlement({
      ...options,
      seed,
    });
    assert.equal(fixture.store.get(key), value, name);
    assert.equal(fixture.store.get(skipped), undefined, `${name} 不得落后臂`);
  }
});

test('射精结算：主人、兽奸、死斗场与触手分别落指定 CFLAG', async () => {
  const cases = [
    [
      '主人',
      (f) => {
        f.store.set('tflag:19', 1);
        f.store.set('tflag:2', 2);
        f.store.set('tflag:38', 2);
      },
      'cflag:31:101',
      2,
    ],
    [
      '兽奸',
      (f) => {
        f.store.set('tflag:19', 1);
        f.store.set('tequip:31:89', 1);
        f.store.set('tflag:16', 3);
      },
      'cflag:31:106',
      3,
    ],
    [
      '死斗场',
      (f) => {
        f.store.set('tflag:19', 1);
        f.store.set('tequip:31:55', 1);
        f.store.set('tflag:15', 4);
      },
      'cflag:31:107',
      4,
    ],
    [
      '触手',
      (f) => {
        f.store.set('tflag:19', 1);
        f.store.set('tequip:31:90', 1);
        f.store.set('tequip:31:11', 1);
        f.store.set('tflag:15', 5);
      },
      'cflag:31:107',
      5,
    ],
  ];
  for (const [name, seed, key, value] of cases) {
    const fixture = await run_ejaculation_settlement({ seed });
    assert.equal(fixture.store.get(key), value, name);
  }
});

test('射精结算：逆侵犯与 COM62/65 按助手/主人落 CFLAG:104/101', async () => {
  const cases = [
    [24, 0, -1, (f) => f.store.set('tflag:10', 2), 'cflag:0:104', 2],
    [24, 1, 17, (f) => f.store.set('tflag:10', 3), 'cflag:17:104', 3],
    [62, 1, 17, (f) => f.store.set('tflag:7', 4), 'cflag:17:101', 4],
    [65, 0, 17, (f) => f.store.set('tflag:10', 5), 'cflag:17:104', 5],
  ];
  for (const [selectcom, assiplay, assi, seed, key, value] of cases) {
    const fixture = await run_ejaculation_settlement({
      selectcom,
      assiplay,
      assi,
      seed,
    });
    assert.equal(fixture.store.get(key), value, `COM${selectcom}`);
  }
});

// —— @SOURCE_CHECK_AUTO（issue #461：自动调教入口，与 SOURCE_CHECK 共享大
// 部分函数，调用序列不同——差异见各测试注释）——

// 世界底座（与 run_caress 相同）+ 一次 SOURCE_CHECK_AUTO。不调用 COM_FAMILY：
// AUTO 不读 era_flag.selectcom。
async function run_auto_check(seed) {
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
  fixture.store.set('maxbase:31:0', 2000);
  fixture.store.set('maxbase:31:1', 2000);
  fixture.store.set('base:31:0', 1450);
  fixture.store.set('base:31:1', 410);
  if (seed) {
    seed(fixture, era_flag);
  }
  fixture.load_module('event/source-check');
  const { emit } = fixture.load_module('system/event/registry');
  await emit('SOURCE_CHECK_AUTO');
  return fixture;
}

test('SOURCE_CHECK_UP_ANTI/_LIKE：仅 CFLAG:1==0 && PLAYER==MASTER 时结算（原作 :2728-2735 的 AUTO 专属门槛，manual 路径的 ANTI 调用被原作者注释掉）', async () => {
  const cases = [
    ['主人调教·无反抗刻印', {}, 300, Math.floor(400 * 1.25)],
    ['反抗刻印生效（CFLAG:1 != 0）', { cflag1: 1 }, undefined, undefined],
    ['助手调教（PLAYER != MASTER）', { player: 31 }, undefined, undefined],
  ];
  for (const [name, opts, expect_anti, expect_like] of cases) {
    const fixture = await run_auto_check((f, era_flag) => {
      f.store.set('source:31:15', 300); // ANTI 输入（反感追加）
      f.store.set('source:31:16', 400); // LIKE 输入（恭顺）
      if (opts.cflag1 !== undefined) {
        f.store.set('cflag:31:1', opts.cflag1);
      }
      if (opts.player !== undefined) {
        era_flag.player = opts.player;
      }
    });
    // UP:11（反感）不在 AUTO_NUM_CHECK 处理范围内，300 直达 PALAM 不经缩放；
    // UP:4（恭顺）在处理范围内，AUTO_NUM_CHECK 默认档（CFLAG:667 未播种）×1.25
    assert.equal(
      fixture.store.get('palam:31:11'),
      expect_anti,
      `${name}：反感`,
    );
    assert.equal(fixture.store.get('palam:31:4'), expect_like, `${name}：恭顺`);
  }
});

test('AUTO_NUM_CHECK：CFLAG:667 八档倍率表（SYSTEM_SOURCE_SUB1.ERB:1852-1881）', async () => {
  const cases = [
    [0, 1.25],
    [5, 1.5],
    [10, 2.1],
    [15, 2.85],
    [20, 3.9],
    [25, 5.3],
    [30, 7.25],
    [40, 9.9],
  ];
  for (const [cflag667, rate] of cases) {
    const fixture = await run_auto_check((f) => {
      f.store.set('delta:31:0', 100);
      f.store.set('cflag:31:667', cflag667);
    });
    assert.equal(
      fixture.store.get('palam:31:0'),
      Math.floor(100 * rate),
      `CFLAG:667=${cflag667} → ×${rate}`,
    );
  }
});

test('AUTO_NUM_CHECK：跳过 UP:11/12/13，UP:14 是例外不跳（原作 SIF LOCAL>=11 && LOCAL!=14 的 CONTINUE）', async () => {
  // 11/12/13 均在 palam_up_check_mini 的 ORDER 里，会被正常处理并写入
  // palam、再清零 delta——读 palam 能验证 AUTO_NUM_CHECK 是否跳过了档位
  // 乘算。15/16 不在 ORDER 里，处理器执行完后读 palam 恒为 undefined，
  // 没有区分力，分别见下方两条独立测试（issue #461 验收发现）
  const skip_locals = [11, 12, 13];
  for (const local of skip_locals) {
    const key = `delta:31:${local}`;
    const low = await run_auto_check((f) => {
      f.store.set(key, 200);
      f.store.set('cflag:31:667', 0); // 第 1 档 ×1.25
    });
    const high = await run_auto_check((f) => {
      f.store.set(key, 200);
      f.store.set('cflag:31:667', 40); // 第 8 档 ×9.90
    });
    assert.equal(
      low.store.get(`palam:31:${local}`),
      high.store.get(`palam:31:${local}`),
      `UP:${local} 应跳过档位乘算，两档结果应相同`,
    );
  }
  const low14 = await run_auto_check((f) => {
    f.store.set('delta:31:14', 200);
    f.store.set('cflag:31:667', 0);
  });
  const high14 = await run_auto_check((f) => {
    f.store.set('delta:31:14', 200);
    f.store.set('cflag:31:667', 40);
  });
  assert.notEqual(
    low14.store.get('palam:31:14'),
    high14.store.get('palam:31:14'),
    'UP:14 虽 >= 11，仍不跳过档位乘算',
  );
});

test('AUTO_NUM_CHECK：跳过 UP:16（死区，PALAM.yml 无此展示位，需读 delta 而非 palam 验证）', async () => {
  // UP:16／PALAM:16 全 target/ 目录无消费者，yml/Palam.yml 的展示位止于
  // 15——16 是原作 FOR LOCAL,0,17 循环上界比实际展示位多出的一档死区。
  // palam_up_check_mini 的 ORDER 不含 16，处理器执行完后 palam:31:16 恒
  // 为 undefined、没有区分力；但 16 也不会被 touched 清零或本次新增的
  // delta:15 无条件清零覆盖，所以 AUTO_NUM_CHECK 结算后的 delta:31:16
  // 仍保留原值，可以直接读它验证跳过逻辑（issue #461 验收发现）
  const low = await run_auto_check((f) => {
    f.store.set('delta:31:16', 200);
    f.store.set('cflag:31:667', 0); // 第 1 档 ×1.25
  });
  const high = await run_auto_check((f) => {
    f.store.set('delta:31:16', 200);
    f.store.set('cflag:31:667', 40); // 第 8 档 ×9.90
  });
  assert.equal(
    low.store.get('delta:31:16'),
    200,
    'UP:16 应跳过档位乘算，delta 维持种子原值',
  );
  assert.equal(
    low.store.get('delta:31:16'),
    high.store.get('delta:31:16'),
    'UP:16 应跳过档位乘算，两档结果应相同',
  );
});

test('PALAM_UP_CHECK_MINI：delta:15 处理器执行后恒为 0（收尾清零，不验证 AUTO_NUM_CHECK 对 15 的跳过逻辑）', async () => {
  // UPID=15 从未进入 palam_up_check_mini 的 ORDER（撞车缺陷，1:1 保留，
  // 见函数头注释），但 delta:15 仍须无条件清零，否则会被引擎
  // nextTurnInTrain 的通用结算重新累加进 palam。这行清零是同步执行、
  // 无条件的，会覆盖 AUTO_NUM_CHECK 对 UP:15 是否跳过档位乘算留下的任何
  // 差异——SOURCE_CHECK_AUTO 处理器内 auto_num_check 到 palam_up_check_
  // mini 之间没有 await，测试只能在整个处理器 resolve 之后读取状态，读不
  // 到"已跳过乘算但尚未清零"的中间值。因此本测试如实只验证清零本身，不
  // 尝试（也确实测不出）AUTO_NUM_CHECK 对 UP:15 的跳过逻辑（issue #461
  // 验收发现）
  const seeded = await run_auto_check((f) => {
    f.store.set('delta:31:15', 200);
    f.store.set('cflag:31:667', 40); // 第 8 档 ×9.90，若曾被乘算会是 1980
  });
  assert.equal(
    seeded.store.get('delta:31:15'),
    0,
    'delta:15 应在处理器执行后清零',
  );

  const unseeded = await run_auto_check();
  assert.equal(
    unseeded.store.get('delta:31:15'),
    0,
    'delta:15 应在处理器执行后清零',
  );
});

test('AUTO 处理器接线：两处气力 0 减半块与 AUTO_NUM_CHECK 按原作顺序复合', async () => {
  // Block A（原作 :2601-2606，UP:0/1/2/14 减半）先于 AUTO_NUM_CHECK：
  // 1000 → 减半 500 → ×1.25（CFLAG:667 未播种）= 625
  const fixture_a = await run_auto_check((f) => {
    f.store.set('delta:31:0', 1000);
    f.store.set('base:31:1', 0); // 气力 0，触发两处 IF BASE:1<=0
  });
  assert.equal(
    fixture_a.store.get('palam:31:0'),
    625,
    'Block A 先减半，AUTO_NUM_CHECK 再放大',
  );

  // Block B（原作 :2752-2763，UP:3/4/5/7/9/13 减半）后于 AUTO_NUM_CHECK：
  // 100 × 1.25 = 125 → 减半 62
  const fixture_b = await run_auto_check((f) => {
    f.store.set('delta:31:9', 100);
    f.store.set('base:31:1', 0);
  });
  assert.equal(
    fixture_b.store.get('palam:31:9'),
    62,
    'AUTO_NUM_CHECK 先放大，Block B 再减半',
  );
});

test('气力 0 损耗结算：Block B 写入的 deltabase 经 :2773-2774 当场结算到 base（AUTO 不显示损耗条，仍须扣减）', async () => {
  const fixture = await run_auto_check((f) => {
    f.store.set('base:31:1', 0); // 气力 0，仅触发 set_lose(0, lose(0)*2+80)=80，无其他 delta 输入
  });
  assert.equal(
    fixture.store.get('base:31:0'),
    1370,
    'base:31:0 初始 1450，扣减 Block B 写入的 80 损耗',
  );
  assert.equal(
    fixture.store.get('deltabase:31:0'),
    0,
    '结算后 deltabase 清零，不残留到下一回合',
  );
});

test('PALAM_UP_CHECK_MINI：原作缺失 UPCOUNT==15 分支——UPID 14 结算两次、UPID 15 永不写回（原作缺陷，登记 issue #14）', async () => {
  const fixture = await run_auto_check((f) => {
    f.store.set('delta:31:14', 100); // 乳房快乐：验证双重结算
    f.store.set('delta:31:13', 50); // 抑郁：不在 AUTO_NUM_CHECK 处理范围内的单次基线
    f.store.set('source:31:18', 90); // SOURCE_CHECK_UP_FREE 的输入 → UP:15
  });
  // UP:14 经 Block A（BASE:1>0，跳过）与 AUTO_NUM_CHECK（×1.25）后为 125；
  // MINI 的 ORDER 数组含两次 14（UPCOUNT=3 与缺陷版 UPCOUNT=15），各自累计一次
  assert.equal(
    fixture.store.get('palam:31:14'),
    Math.floor(100 * 1.25) * 2,
    'UPID 14 因原作缺陷被结算两次',
  );
  assert.equal(fixture.store.get('palam:31:13'), 50, 'UPID 13：单次结算基线');
  assert.equal(
    fixture.store.get('palam:31:15'),
    undefined,
    'UPID 15：ORDER 数组不含 15，UP:15=90 非零也永不写回',
  );
});

test('down_map 在每次 SOURCE_CHECK_AUTO 开头清空，不跨回合残留 DOWN', async () => {
  const fixture = await run_auto_check((f) => {
    f.store.set('palam:31:0', 10000); // 与本回合 UP:0=0 合计恰好触及 LV4 门槛
  });
  assert.equal(
    fixture.store.get('palam:31:0'),
    1000,
    '首次调用：EX_CHECK_UP 触发 DOWN:0=9000，结算为 10000-9000',
  );
  const { emit } = fixture.load_module('system/event/registry');
  await emit('SOURCE_CHECK_AUTO');
  assert.equal(
    fixture.store.get('palam:31:0'),
    1000,
    '第二次调用：down_map 已清空，UP:0=DOWN:0=0，PALAM:0 不再变化（若 clear() 缺失会跌到 -8000）',
  );
});
