/**
 * ere 2D 地下城模式的端到端验收（issue #181 H12）：新档从标题画面一路
 * 跑到 ENDING_2——**第三处 JUMP ENDING_2（LABO_DUNGEON_MAP.ERB:175）可达
 * 的证明**：勇者在 32×32 野外地图上随机游走到中心 (16,16) 触发魔王城
 * 攻略演出。夹具跑完整逻辑循环，毫秒级，每次 `npm test` 都跑（与 3D 版
 * test/event-ending2-e2e.test.js、阶段 1 的 test/event-ending-e2e.test.js
 * 并列的三条结局回归之一）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一注入点，#16）。
 *
 * 与 3D 版（#173）的三点差异：
 *   - **开局多答一问**：FIRST_SETTING 的地下城模式选「2D」（#181 加的一
 *     问，#168 裁定 5「连带补开关」）——FLAG:502 = 1 后 turnend 的 else 臂
 *     走 DUNGEON_MAP 真身（2D 野外推进），EVENTFIRST 的 2D 分支顺带生成
 *     地质地图与村庄；
 *   - **推进模型不同**：3D 是侵攻度条满破层（14 日实测），2D 是格子上
 *     的随机游走（UNIT_MOVE 每轮 x/y 各 ±1/0，向中心方向由 SIF 选、步长
 *     由 RAND:3 掷），用时下界更长且受地形高低差（80% 拒绝异档移动）与
 *     撤退决议（HP/MP < 45% 立旗反向）拉扯——驱动上限与天数区间据此放宽；
 *   - **终点判据不同**：2D 的播报是「这里就是魔王城了吗………」
 *     （LABO_DUNGEON_MAP.ERB:174），3D 的「这里是魔王的房间………」在
 *     本用例断言**不得出现**（FLAG:502 = 1 时 run_dungeon 不可达——两条
 *     路径互斥的留证）。
 *
 * 随机源（#173 范本 + #195 教训）：Math.random 替换为种子化 PRNG
 * （mulberry32）。种子 20250602 是**任取的固定值**，不按结局路径挑选——
 * 断言区间按实测天数两端留余量，PRNG 消费序列随后续票漂移时先撞
 * ROUND_LIMIT（防死循环的驱动上限）而不是悄悄换剧本。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_gamebase } = require('./helpers/gamebase');

/** 断言的通关天数区间（实测 71 日，种子 20250602；两端留漂移余量） */
const DAY_MIN = 10;
const DAY_MAX = 95;
/** 驱动上限（半天轮）：随机游走的到达时间是概率量，上限给足余量（100 日） */
const ROUND_LIMIT = 200;

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
 * 勇者池（Chara1-16.yml）：与 3D 版同款——名前/呼び名 +「基礎」0/1 两键
 * （HP/气力上限，夹具不搬引擎的预设抄写，依据见 3D 版文件头）。
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

test('端到端：2D 模式新档从标题走到 ENDING_2（LABO_DUNGEON_MAP:175 的 JUMP 可达）', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  // 角色预设：0 魔王（标题新游戏加入）、17 玛奥（村娘线）、1-16 勇者池
  fixture.seed_chara(0, { name: '你', callname: '你' });
  fixture.seed_chara(17, { name: '玛奥', callname: '玛奥' });
  for (const [id_s, [name, hp, wp]] of Object.entries(HEROES)) {
    const id = Number(id_s);
    fixture.seed_chara(id, { id, name, callname: name });
    fixture.store.set(`base:${id}:0`, hp);
    fixture.store.set(`maxbase:${id}:0`, hp);
    fixture.store.set(`base:${id}:1`, wp);
    fixture.store.set(`maxbase:${id}:1`, wp);
  }
  for (const idx of [0, 1, 2]) {
    fixture.store.set(`base:0:${idx}`, 10000);
    fixture.store.set(`maxbase:0:${idx}`, 10000);
  }
  for (const idx of [0, 1]) {
    fixture.store.set(`base:17:${idx}`, 1500);
    fixture.store.set(`maxbase:17:${idx}`, 1500);
  }

  fixture.load_module('system/flow/main-loop');
  const run_title_page = fixture.load_module('page/page-title');
  const { run_shop } = fixture.load_module('page/page-shop');
  const { emit } = fixture.load_module('system/event/registry');
  const { BeginSignal } = fixture.load_module('system/flow/begin-signal');
  const era_flag = fixture.load_module('era-utils/era-flag');

  // 勇者来袭开着（与 3D 版同向：本路径的推进者就是每日生成的勇者）
  fixture.override_math_random(mulberry32(20250602));
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

    // —— @EVENTFIRST：初期奴隶选「村娘」[1]、地下城模式选「2D」[1]
    // （#181 加的一问——本条与 3D 版在此分岔）、搬运选「抱起」[1] ——
    fixture.set_inputs(1, 1, 1);
    const first_exit = await emit('EVENTFIRST');
    assert.equal(first_exit, 'SHOP', '初始化的出口必是 BEGIN SHOP');
    assert.equal(
      fixture.store.get('flag:502'),
      1,
      'FLAG:502 = 1：地下城模式已选（FIRST_SETTING 一问的置位留证）',
    );

    // —— 主循环：每半天出兵一次，勇者在 2D 地图上游走，直到
    // LABO_DUNGEON_MAP:175 的 JUMP ENDING_2 从 EVENTTURNEND 链里炸出来。
    // reset_inputs 每轮清残留（3D 版同款：触发轮多一个 ENDING_2 仪式 INPUT）
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
          '2D 游走疑似被改坏（方向选择 / 高低差拒绝 / 撤退决议）',
      );
    }

    // —— 终局判据：真 GAMEOVER 是 quit 抛出 ——
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

    // —— 2D 路径的终点播报（LABO_DUNGEON_MAP.ERB:174，JUMP 的前一行）——
    assert(
      texts.includes('这里就是魔王城了吗………'),
      '2D 路径的终点播报「这里就是魔王城了吗………」（:174）',
    );
    // 3D 路径互斥留证：FLAG:502 = 1 时 run_dungeon 不可达
    assert(
      !texts.includes('这里是魔王的房间………'),
      '3D 的「这里是魔王的房间………」不得出现（else 臂互斥的留证）',
    );
    assert(
      texts.includes(
        '｜　　　　　　新的女勇者，终于攻陷了魔王的地下城　　　　　　｜',
      ),
      'ENDING_2 横幅在真实循环的终点出现（:47，两路共用的 ending_2 真身）',
    );
    assert(
      texts.includes(
        '-------------------------------GAMEOVER---------------------------------',
      ),
      'GAMEOVER 分隔行（:54）',
    );
    // 触发者的持久留证。:171-177 的触发臂在 :226-227 坐标落笔**之前** JUMP
    // ——触发者的 CFLAG:510/511 停留在出发格（一步可达中心的邻域），中心
    // 位置本身不落笔；能持久的指纹是 :172 置的 CFLAG:501 = 2（生成时初值
    // 为 1，enter-enemy :207——2D 路径里没有别的写点）
    const sealed = fixture.chara_no.filter(
      (cid) => fixture.store.get(`cflag:${cid}:501`) === 2,
    );
    assert.equal(sealed.length, 1, '恰一名勇者带触发指纹（CFLAG:501 = 2）');
    const [hero] = sealed;
    const hx = fixture.store.get(`cflag:${hero}:510`) || 0;
    const hy = fixture.store.get(`cflag:${hero}:511`) || 0;
    assert(
      Math.abs(hx - 16) + Math.abs(hy - 16) <= 2,
      `触发者的出发格 (${hx},${hy}) 在中心一步邻域内（移动环的抖动幅度 ±1）`,
    );

    // —— 压住侵攻度（与 3D 版同判据：确保先到 ENDING_2 而非 ENDING_1）——
    assert.equal(
      fixture.store.get('flag:82') ?? 0,
      0,
      'FLAG:82 == 0：ENDING_1 未抢先',
    );
    assert(
      !texts.some((line) => line.includes('魔王终于再次掌握了世界')),
      'ENDING_1 横幅未出现',
    );

    // —— 天数（工单要求：断言区间 + 打印实测值）——
    const days = era_flag.day_count;
    console.log(
      `[e2e-2d] 实测 GAMEOVER 天数 = ${days} 日（${rounds} 个半天轮）`,
    );
    assert(
      days >= DAY_MIN && days <= DAY_MAX,
      `2D 路径 GAMEOVER 天数 ${days} 日落在 [${DAY_MIN}, ${DAY_MAX}]（出界` +
        '说明游走/方向/撤退公式被改坏；余量理由见文件头）',
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
