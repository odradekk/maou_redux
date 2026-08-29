/**
 * ere 阶段 3 第四条贯通路径的端到端验收（issue #173，#169 阶段 3 的收口）：
 * 新档从标题画面一路跑到 ENDING_2——**游戏第二次能走到结局，这次是输的
 * 那个**（真 GAMEOVER，quit 抛出）。夹具跑完整逻辑循环，毫秒级，每次
 * `npm test` 都跑（与阶段 1 的 test/event-ending-e2e.test.js 并列）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一注入点，#16）。
 *
 * 与阶段 1 e2e（ENDING_1）的两点对称：
 *   - **勇者来袭开着**（不调 disable_enter_enemy）：本路径的推进者就是
 *     ENTER_ENEMY 每日生成的勇者。两条 e2e 各自隔离——阶段 1 那条关掉
 *     勇者（#168 裁定 4），本条开着，互不踩对方的回归判据；
 *   - **压住侵攻度**：出兵照常（[109]→[1]，与阶段 1 同一驱动——主菜单上
 *     它是唯一已接真的 TURNEND 出口），但 ENDING_2 的贯通用时（实测 14 日）
 *     远短于 ENDING_1 的 100 日，人间界侵攻度只涨到 ~1300，`FLAG:81 >=
 *     10000` 的 ENDING_1 判据不可达——用例尾部断言 flag:82 == 0 留证。
 *
 * 随机源（#173 票面指定，阶段 1 e2e 的先例）：端到端从 turnend-settle 进
 * run_dungeon，调用是 `run_dungeon(cid)` **不带 rand**——随机源注入点
 * （run_dungeon 的第二参）在端到端路径上够不着，改在 turnend-settle 开
 * 透传属设计改动（简报第 2 条：要在 issue 上说明依据，别默默改）。
 * Math.random 是可变全局，夹具的 override_math_random 在此替换为种子化
 * PRNG（mulberry32），整局确定：同一种子永远走同一个剧本。
 *
 * 勇者的 base/maxbase 预置（Chara1-16.yml「基礎」的 0/1 两键等价值）：
 * 引擎的 addCharacter 会把预设「基礎」抄进 base/maxbase（e2e 注释与
 * ending-paths.md 的口径），**夹具不搬这层**（era-fixture 的 addCharacter
 * 只镜像 callname 双下标）。不预置的后果实测（种子 20250601，60 日不出
 * 结局）：勇者气力上限 undefined → cm_st 写 0 → @DUNGEON :629-634 的
 * 「冒険の疲れ」每轮扣 RAND:6 直接坠负 → CHECK_STATUS 的 wp 百分比算出
 * -Infinity 判轻伤 → 踏破后「放弃探索，开始回头了」→ 全员回头，推进无法
 * 成立。预置口径与阶段 1 e2e 对角色 0/17 的 base/maxbase 设置同款。
 *
 * 通关天数（实测口径，种子 20250601）：14 日 / 28 个半天轮。五个候选
 * 种子（20250601/1/42/20250701/998877）实测 14-16 日，断言区间 [10, 20]
 * 两端各留 4-6 日余量给后续票（H5-H16 会继续接真身，PRNG 消费序列随之
 * 漂移），同时都在变异的实测天数之外（WALK 公式改坏时 60 轮上限先红）。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_gamebase } = require('./helpers/gamebase');

/** 断言的通关天数区间（依据见文件头；实测值由用例运行时打印） */
const DAY_MIN = 10;
const DAY_MAX = 20;
/** 驱动上限（半天轮）：防推进公式改坏导致的死循环，超限即红（变异自证依赖） */
const ROUND_LIMIT = 60; // 30 个游戏日

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

/**
 * 勇者池（Chara1-16.yml）：名前/呼び名 +「基礎」0/1 两键（HP/气力上限，
 * 预置理由见文件头）。RAND(1,17) 的值域恰是这 16 张表（不含 17 玛奥）。
 */
const HEROES = {
  1: ['战士', 2400, 1000],
  2: ['魔法师', 1600, 2000],
  3: ['神官', 1800, 1800],
  4: ['盗贼', 1500, 1000],
  5: ['骑士', 2300, 1500],
  6: ['巫女', 1500, 2400],
  7: ['忍者', 2500, 1000],
  8: ['弓手', 2000, 2000],
  9: ['女骑士', 2300, 1500],
  10: ['巫女', 1500, 2400],
  11: ['忍者', 2500, 1000],
  12: ['弓手', 2000, 2000],
  13: ['女骑士', 2300, 1500],
  14: ['巫女', 1500, 2400],
  15: ['忍者', 2500, 1000],
  16: ['弓手', 2000, 2000],
};

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

test('端到端：新档从标题走到 ENDING_2（quit 抛出 + 演出齐全 + 压住侵攻度）', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  // 角色预设：0 魔王（标题新游戏加入）、17 玛奥（村娘线）、1-16 勇者池
  // （ENTER_ENEMY 的 RAND(1,17) 生成管线消费）
  fixture.seed_chara(0, { name: '你', callname: '你' });
  fixture.seed_chara(17, { name: '玛奥', callname: '玛奥' });
  for (const [id_s, [name, hp, wp]] of Object.entries(HEROES)) {
    const id = Number(id_s);
    fixture.seed_chara(id, { id, name, callname: name });
    // 「基礎」0/1 两键的等价预置（引擎 addCharacter 抄、夹具不搬，文件头）
    fixture.store.set(`base:${id}:0`, hp);
    fixture.store.set(`maxbase:${id}:0`, hp);
    fixture.store.set(`base:${id}:1`, wp);
    fixture.store.set(`maxbase:${id}:1`, wp);
  }
  // 魔王与村娘的 base/maxbase（阶段 1 e2e 同款：出兵耗气力、结算循环的
  // 回复段读上限）
  for (const idx of [0, 1, 2]) {
    fixture.store.set(`base:0:${idx}`, 10000);
    fixture.store.set(`maxbase:0:${idx}`, 10000);
  }
  for (const idx of [0, 1]) {
    fixture.store.set(`base:17:${idx}`, 1500);
    fixture.store.set(`maxbase:17:${idx}`, 1500);
  }

  // 载入主循环模块：顶层 require 注册全部事件处理器（与引擎加载 ere/main.js
  // 的真实启动同一注册面）。本用例照 main-loop 的 STATE_HANDLERS 逐步驱动
  fixture.load_module('system/flow/main-loop');
  const run_title_page = fixture.load_module('page/page-title');
  const { run_shop } = fixture.load_module('page/page-shop');
  const { emit } = fixture.load_module('system/event/registry');
  const { BeginSignal } = fixture.load_module('system/flow/begin-signal');
  const era_flag = fixture.load_module('era-utils/era-flag');

  // 勇者来袭开着（与阶段 1 e2e 的隔离方向相反，文件头）
  fixture.override_math_random(mulberry32(20250601));
  let rounds = 0;
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
    // 「普通」[0]（#181 加的一问——本条走 3D 路径，2D 版见
    // event-ending2-2d-e2e.test.js）、搬运选「抱起」[1]
    fixture.set_inputs(1, 0, 1);
    const first_exit = await emit('EVENTFIRST');
    assert.equal(first_exit, 'SHOP', '初始化的出口必是 BEGIN SHOP');

    // —— 主循环：每半天出兵一次（压住侵攻度的论证见文件头），直到
    // ENDING_2 的 QUIT 从 EVENTTURNEND 链里炸出来。触发轮比正常轮多一个
    // 输入（ENDING_2 的仪式性 INPUT，原作 :55）——reset_inputs 每轮清掉
    // 上一轮未消费的残留，避免错位（阶段 1 e2e 同款）
    let quit_error;
    while (quit_error === undefined) {
      fixture.reset_inputs(109, 1, 0);
      await expect_signal(
        run_shop(),
        'TURNEND',
        BeginSignal,
        `第 ${rounds + 1} 轮出兵`,
      );
      try {
        const pending = await emit('EVENTTURNEND');
        assert.equal(pending, 'SHOP', '回合结算的出口必是 BEGIN SHOP');
      } catch (e) {
        if (e instanceof Error && e.message === 'quit') {
          quit_error = e;
          break;
        }
        throw e;
      }
      rounds += 1;
      assert(
        rounds <= ROUND_LIMIT,
        `驱动 ${ROUND_LIMIT} 轮（${ROUND_LIMIT / 2} 日）仍未 GAMEOVER——` +
          '推进公式疑似被改坏（WALK / 侵攻度 / 踏破判定）',
      );
    }

    // —— 终局判据：真 GAMEOVER 是 quit 抛出，不是某个 flag 变 1（票面）——
    assert(
      quit_error instanceof Error && quit_error.message === 'quit',
      'ENDING_2 的 QUIT 异常炸穿 EVENTTURNEND 链（#148 throw 型控制流）',
    );
    assert(
      fixture.calls.some(({ api }) => api === 'quit'),
      'QUIT → era.quit()（关窗 IPC 已记录）',
    );

    const texts = fixture.lines_history
      .filter((line) => line.type === 'text')
      .map((line) => line.text);

    // —— 触发点与演出（DUNGEON.ERB:200-202 → ENDING ver 1.0.1.ERB:43-56）——
    assert(
      texts.includes('这里是魔王的房间………'),
      '第 9 层踏破打出「这里是魔王的房间………」（DUNGEON.ERB:200）',
    );
    assert(
      texts.includes(
        '｜　　　　　　新的女勇者，终于攻陷了魔王的地下城　　　　　　｜',
      ),
      'ENDING_2 横幅在真实循环的终点出现（:47）',
    );
    assert(
      texts.includes(
        '｜　　　带着一丝不易察觉的微笑，再次陷入了封印的沉睡之中　　｜',
      ),
      'ENDING_2 横幅末行（:49）',
    );
    // 封印播报的名字来自 %SAVESTR:TARGET%（→ callname:TARGET:-1）：提取
    // 播报里的名字，断言它是真实生成的勇者（不是空串、不是写死值）
    const report = texts.find((line) =>
      line.includes('封印了魔王，被后人歌颂为传说中的勇者'),
    );
    assert(report !== undefined, '封印播报在场（:52 PRINTFORMW）');
    const sealed_name = report
      .replace(/^\*勇者/, '')
      .replace(/封印了魔王.*$/, '');
    const hero_names = Object.values(HEROES).map(([name]) => name);
    assert(
      hero_names.includes(sealed_name),
      `封印播报的名字是生成的勇者（实测「${sealed_name}」，%SAVESTR:TARGET% 的承载）`,
    );
    assert(
      texts.includes(
        '-------------------------------GAMEOVER---------------------------------',
      ),
      'GAMEOVER 分隔行（:54）',
    );
    // 触发勇者确实在第 9 层（FLOOR >= 9 的判据留证）。勇者池有重名
    // （女骑士 ×2、巫女 ×3、忍者 ×3、弓手 ×3——名前即职业名），反查取
    // 「同名且已在场且 501 == 9」的那一个
    const sealed_candidates = Object.entries(HEROES).filter(
      ([, [name]]) => name === sealed_name,
    );
    assert(
      sealed_candidates.some(
        ([id]) =>
          fixture.chara_no.includes(Number(id)) &&
          fixture.store.get(`cflag:${id}:501`) === 9,
      ),
      `触发勇者（${sealed_name}）到达第 9 层（CFLAG:501 = 9）`,
    );

    // —— 压住侵攻度（票面：确保先到 ENDING_2 而非 ENDING_1）——
    assert.equal(
      fixture.store.get('flag:82') ?? 0,
      0,
      'FLAG:82 == 0：ENDING_1 未抢先（人间界演出未出现）',
    );
    assert(
      (fixture.store.get('flag:81') ?? 0) < 10000,
      '人间界侵攻度未满（ENDING_1 的判据不可达）',
    );
    assert(
      !texts.some((line) => line.includes('魔王终于再次掌握了世界')),
      'ENDING_1 横幅未出现（两条结局的竞速由本票压住）',
    );

    // —— 天数（工单要求：断言区间 + 打印实测值）——
    const days = era_flag.day_count;
    console.log(`[e2e] 实测 GAMEOVER 天数 = ${days} 日（${rounds} 个半天轮）`);
    assert(
      days >= DAY_MIN && days <= DAY_MAX,
      `GAMEOVER 天数 ${days} 日落在 [${DAY_MIN}, ${DAY_MAX}]（出界说明 WALK/` +
        '侵攻度推进公式被改坏；余量理由见文件头）',
    );

    // —— 循环入口的完整性：每一轮都经主菜单 [109] 进侵略 ——
    assert.equal(
      fixture.inputs_consumed.filter(({ value }) => value === 109).length,
      rounds + 1,
      '每个半天轮恰好一次主菜单 [109]（触发轮在内，循环没有走偏入口）',
    );
  } finally {
    // Math.random 是进程级替换，必须恢复（同文件后续用例不被污染）
    fixture.restore_math_random();
  }
});
