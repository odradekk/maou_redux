/**
 * ere 阶段 1 第三条贯通路径的端到端验收（issue #120，#112 的整体验收）：
 * 新档从标题画面一路跑到 ENDING_1——夹具跑完整逻辑循环，毫秒级。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一注入点，#16）。
 *
 * 与 test/event-ending.test.js:281 的贯通用例（置位起跳）的差别：本用例
 * 从**新档起跑**——标题画面选新游戏 → @EVENTFIRST（村娘线）→ 主菜单 →
 * 魔力出兵 → BEGIN TURNEND → 日循环推进，循环往复直到 FLAG:82 == 1，
 * 把 #118 已各自验过的结局三信号（横幅文本、角色 35 在队、FLAG:82 == 1）
 * 串在真实循环的终点上再验一次。
 *
 * 随机性（工单第 2 条）——随机源在夹具层注入，选择依据见 issue #120 评论：
 *   - 侵攻度自然衰减 RAND:100（每回合一次）与已征服反抗 RAND:6 是本路径
 *     仅有的两处随机；ere 侧消费点（ere/system/turnend-settle.js 的 rand）
 *     都在事件处理器体内，外部无参数通道——chara-init 的函数参数注入
 *     先例（#118）只适用于被显式调用的函数，照搬就得在 ere/ 开随机源
 *     缝、破坏「游戏代码零修改」的注入点原则。Math.random 是可变全局，
 *     夹具的 override_math_random 在此替换为种子化 PRNG（mulberry32），
 *     整局确定：同一种子永远走同一个剧本。
 *
 * 通关天数（工单要求打印 + 记票）：
 *   - 口径先对齐（工单第 3 条）：docs/research/ending-paths.md 的 55–70 日
 *     估算写的是「扣自然衰减均值 50/日」，但源码的衰减块在 @EVENTTURNEND
 *     主体内、无时段守卫（SYSTEM ver1.0.3.ERB:620-642），而 EVENTTURNEND
 *     每半天跑一次——衰减实际是每半天 RAND:100，日衰减均值约 99。按正确
 *     口径重算：日毛增约 191（稳定态气力 2533/25 + 2266/25，估算文档
 *     此节无误）− 日衰减约 99 = 日净增约 92，叠加开局满气力的前期红利，
 *     通关约 100–110 个游戏日。本用例实测 100 日（种子 20250601），落在
 *     该口径内；55–70 的偏差是估算文档的口径错误（回合当成了日），不是
 *     移植错误——ere 侧 1:1 无守卫，#115 已验日期推进。
 *   - 断言区间 [50, 75]：种子固定下实测恒 61（#179 起魔王升级结算真身
 *     接入后的新值——侵略给经验（INVASION.ERB:736-738 的 ELSE 臂）、
 *     @LVUP 每回合消化经验、而魔王补正就是等级本身（INVASION.ERB:568
 *     SINKOU × (CFLAG:0:9 + 100)/100），存根期被掐掉的「侵略 → 经验 →
 *     升级 → 更强侵略」正反馈第一次跑通，通关从 100 日缩短到 61 日）。
 *     ±11 的余量给后续票，两端都远在变异的实测天数之外（衰减归零
 *     40 日、/25 改 /30 直接撞驱动上限），拦得住工单点名的三类公式错误。
 *
 * 不对 ere/event/event-nextday.js 的 stub_line('ENDCHECK', …) 占位文本做
 * 任何断言（工单第 4 条）：#116 正在把该存根换成真链。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_gamebase } = require('./helpers/gamebase');

/** 断言的通关天数区间（依据见文件头；实测值由用例运行时打印） */
const DAY_MIN = 50;
const DAY_MAX = 75;
/** 驱动上限（半天轮）：防公式改坏导致的死循环，超限即红（变异自证依赖） */
const ROUND_LIMIT = 260; // 130 个游戏日

/** mulberry32：种子化 PRNG（[0, 1) 均匀分布，替换 Math.random） */
function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 接住 BeginSignal 并断言目标状态（run_shop/run_title_page 的出口协议） */
async function expect_signal(promise, state, BeginSignal, what) {
  try {
    await promise;
  } catch (e) {
    if (e instanceof BeginSignal && e.state === state) {
      return;
    }
    throw e;
  }
  assert.fail(`${what} 应以 BeginSignal(${state}) 离开，却正常返回了`);
}

test('端到端：新档从标题走到 ENDING_1（三信号 + 实测天数）', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  // 角色预设（夹具不读 yml/，静态表正确性由 test/chara-yml.test.js 用引擎
  // 代码单独驱动）：0 魔王（标题新游戏加入）、17 玛奥（村娘线）、35 菲娅
  // （ENDING_1 的 ADDCHARA 35）
  fixture.seed_chara(0, { name: '你', callname: '你' });
  fixture.seed_chara(17, { name: '玛奥', callname: '玛奥' });
  fixture.seed_chara(35, { name: '菲娅', callname: '菲娅' });
  // 引擎从 Chara0.yml 的「基礎」把体力/气力/精力各 10000 抄进 base/maxbase
  // （开局满气力是通关天数估算的输入，ending-paths.md:139）；村娘 17 的
  // 基礎 1500（结算循环的回复段读上限）
  for (const idx of [0, 1, 2]) {
    fixture.store.set(`base:0:${idx}`, 10000);
    fixture.store.set(`maxbase:0:${idx}`, 10000);
  }
  for (const idx of [0, 1]) {
    fixture.store.set(`base:17:${idx}`, 1500);
    fixture.store.set(`maxbase:17:${idx}`, 1500);
  }

  // 载入主循环模块：顶层 require 注册全部事件处理器（与引擎加载 ere/main.js
  // 的真实启动同一注册面——EVENTFIRST/三档 EVENTTURNEND/EVENTSHOP/口上等
  // 都在此挂链）。本用例不直接调 run_main_loop（永不返回），而是照
  // main-loop 的 STATE_HANDLERS 逐步驱动——见下方循环
  fixture.load_module('system/flow/main-loop');
  const run_title_page = fixture.load_module('page/page-title');
  const { run_shop } = fixture.load_module('page/page-shop');
  const { emit } = fixture.load_module('system/event/registry');
  const { BeginSignal } = fixture.load_module('system/flow/begin-signal');
  const era_flag = fixture.load_module('era-utils/era-flag');

  // 本局关闭勇者来袭（#171 / #168 裁定 4 的隔离开关）：ENTER_ENEMY 自 #171
  // 起每日真调用，勇者一旦生成，本用例的 ENDING_1 路径就会与 ENDING_2 在
  // 同一条日循环上竞速——PRNG 消费序列被生成管线打散、100 日的实测值变
  // 成概率问题。关掉它，阶段 1 的回归判据（种子 20250601 恒 100 日）保持
  // 确定；阶段 3 的 e2e（#173）在自己的用例里隔离地开勇者线
  fixture.disable_enter_enemy();

  fixture.override_math_random(mulberry32(20250601));
  let rounds = 0; // 半天轮数（午前/午后各一）
  try {
    // —— 新档：标题画面选「新的猎物」[1] → 新游戏四件套 → BEGIN FIRST ——
    fixture.set_inputs(1);
    await expect_signal(
      run_title_page(),
      'FIRST',
      BeginSignal,
      '标题画面新游戏',
    );

    // —— @EVENTFIRST：初期奴隶选「村娘」[1]（#50 真身）、地下城模式选
    // 「普通」[0]（#181 加的一问，本条走 3D 路径）、搬运选「抱起」[1]；
    // 村娘分支自己的出口 BEGIN SHOP（链上暂存，emit 返回）——
    fixture.set_inputs(1, 0, 1);
    const first_exit = await emit('EVENTFIRST');
    assert.equal(first_exit, 'SHOP', '初始化的出口必是 BEGIN SHOP');

    // —— 主循环（main-loop 的 SHOP → TURNEND → SHOP 边，逐步驱动）：
    // 每半天出兵一次，直到 FLAG:82 == 1（ENDING_1 的继续路径置位）。
    // 触发轮比正常轮多一个输入（ENDING_1 询问的 [0] 继续游戏）——用
    // reset_inputs 每轮清掉上一轮未消费的残留，避免错位
    while ((fixture.store.get('flag:82') || 0) !== 1) {
      fixture.reset_inputs(109, 1, 0);
      await expect_signal(
        run_shop(),
        'TURNEND',
        BeginSignal,
        `第 ${rounds + 1} 轮出兵`,
      );
      const pending = await emit('EVENTTURNEND');
      assert.equal(pending, 'SHOP', '回合结算的出口必是 BEGIN SHOP');
      rounds += 1;
      assert(
        rounds <= ROUND_LIMIT,
        `驱动 ${ROUND_LIMIT} 轮（${ROUND_LIMIT / 2} 日）仍未通关——出兵/衰减/回复公式疑似被改坏`,
      );
    }

    // —— 终局三信号（#118 已各自验过，此处串在真实循环的终点上） ——
    // 1. FLAG:82 == 1（循环条件已保证，显式断言留证）
    assert.equal(fixture.store.get('flag:82'), 1, 'FLAG:82 = 1（演出已出现）');
    // 2. 角色 35（菲娅）在队
    assert(
      fixture.chara_no.includes(35),
      '角色 35（菲娅）经 ENDING_1 的 ADDCHARA 35 入队',
    );
    // 3. 横幅文本出现（lines_history：被动全量记录，clear 清掉的也在）
    const texts = fixture.lines_history
      .filter((line) => line.type === 'text')
      .map((line) => line.text);
    assert(
      texts.includes(
        '｜　　　　　　　　魔王终于再次掌握了世界　　　　　　　　　　｜',
      ),
      'ENDING_1 横幅在真实循环的终点出现',
    );

    // —— 侵攻度与档位的终态 ——
    assert.equal(
      fixture.store.get('flag:81'),
      10000,
      '人间界侵攻度封顶 10000（:617-618）',
    );
    // FLAG:93 十档推进到满（拉锯的论证：10000 封顶后日循环衰减最多打回
    // 9901–10000（已征服臂保底 100 之上再 −RAND:100），恒高于回退档的
    // 8000 阈值，终态稳定在 5——#119 提醒的拉锯不影响终值）
    assert.equal(
      fixture.store.get('flag:93'),
      5,
      '据点事件档位 FLAG:93 推进到满档（经 2000/…/10000 五档）',
    );

    // —— 天数（工单要求：断言区间 + 打印实测值） ——
    const days = era_flag.day_count;
    // 工单要求：实测通关天数写进票的收尾评论（供 #109 判断黄金样本补录）
    console.log(`[e2e] 实测通关天数 = ${days} 日（${rounds} 个半天轮）`);
    assert(
      days >= DAY_MIN && days <= DAY_MAX,
      `通关天数 ${days} 日落在 [${DAY_MIN}, ${DAY_MAX}]（估算口径见文件头：` +
        '日净增约 92 + 前期红利；出界说明出兵/衰减/回复公式被改坏）',
    );

    // —— 循环入口的完整性：每一轮都经主菜单 [109] 进侵略 ——
    assert.equal(
      fixture.inputs_consumed.filter(({ value }) => value === 109).length,
      rounds,
      '每个半天轮恰好一次主菜单 [109]（循环没有走偏入口）',
    );
  } finally {
    // Math.random 是进程级替换，必须恢复（同文件后续用例不被污染）
    fixture.restore_math_random();
  }
});
