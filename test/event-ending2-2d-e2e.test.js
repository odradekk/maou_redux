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
 * 与 3D 版（#173）的四点差异：
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
 *     路径互斥的留证）；
 *   - **驱动分两档（#179 返工）**：2D 慢线（~70 日起）跑不赢「魔王升级
 *     正反馈」加速后的侵略——实测第 135 轮（67.5 日）FLAG:81 涨满
 *     10000，invasion_check 的 ENDING_1 中场演出先至（询问「[0] 继续 /
 *     [1] 退出」，选继续后 FLAG:82 = 1）。**征服后主菜单的侵略分支走
 *     「地上征服后的地区选择菜单」存根且 return 0**（page-invasion.js
 *     开头的守卫，随征服后内容票）——不消耗输入、不 BEGIN TURNEND，
 *     ere 当前移植面上**没有第二个回合转场**（usershop 全表只有 109 的
 *     invasion() === 1 一处 begin(TURNEND)；199 休息整支存根）。本用例
 *     的驱动因此按 FLAG:82 分档：征服前 [109, 1]（主菜单侵略 → 魔力
 *     出兵，尾 0 留给 ENDING_1 演出的「继续」询问——恰在封顶轮的
 *     TURNEND 链内消费）；征服后 [100, (17,) 999, 999]（主菜单调教 →
 *     首轮选目标玛奥 → 调教结束 → juel-check 退出）——**调教是征服后
 *     唯一的回合通道**（TRAIN → AFTERTRAIN 的 @EVENTEND 尾部 BEGIN
 *     TURNEND，main-loop 的状态机），FLAG:81 冻结、勇者继续游走；尾 0
 *     留给触发轮 ENDING_2 的仪式 INPUT。两档切换对「第几轮封顶」不
 *     敏感（世界轨迹漂移只移动切换点）；但调教轮的 PRNG 消费量与侵略
 *     轮不同，切换点一动游走剧本就岔——到达点实测 134 日（269 轮：
 *     135 侵略 + 134 调教），区间据此放宽。
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

/**
 * 断言的通关天数区间（实测 134 日，种子 20250602，#179 后的两段驱动：
 * 135 轮侵略 + 134 轮调教，见文件头第四点）。下界 50：随机游走的物理
 * 下限（#179 前实测最快也要 ~70 日，快 30% 以上即游走公式可疑）；
 * 上界 175：慢 30% 以上同样可疑（方向选择 / 高低差拒绝 / 撤退决议被
 * 改坏）。ENDING_1 封顶轮的漂移（侵略速度随票变化）会移动两段切换点、
 * 岔开游走剧本，±40 日都在区间内。
 */
const DAY_MIN = 50;
const DAY_MAX = 175;
/** 驱动上限（半天轮）：区间上界 175 日 = 350 轮，上限给到 380 轮兜死循环 */
const ROUND_LIMIT = 380;

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
  const { enter_state } = fixture.load_module('system/flow/main-loop');
  const { emit } = fixture.load_module('system/event/registry');
  const { BeginSignal, STATE } = fixture.load_module(
    'system/flow/begin-signal',
  );
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

    // —— 主循环（FLAG:82 分档驱动，见文件头第四点）：征服前每半天出兵
    // 一次；ENDING_1 中场演出先至（选继续）后改走调教推进回合，勇者在
    // 2D 地图上继续游走，直到 LABO_DUNGEON_MAP:175 的 JUMP ENDING_2 从
    // EVENTTURNEND 链里炸出来。reset_inputs 每轮清残留（3D 版同款）。
    // 调教轮跨四个状态（SHOP→TRAIN→AFTERTRAIN→TURNEND→SHOP），用主循环
    // 的 enter_state 逐态驱动（main-loop 导出的接站入口，#137），与真实
    // 状态机同一张表——比手写 expect_signal 的两态驱动更贴近引擎
    let quit_error;
    while (quit_error === undefined) {
      const fallen = (fixture.store.get('flag:82') ?? 0) !== 0;
      if (fallen) {
        // 征服后：调教推进。首轮多一个目标选择（[17] 玛奥，select_target
        // 打的是角色 ID 按钮）；此后 era_flag.target 经 EVENTTURNEND 尾部
        // 还原（FLAG:1）保持 > 0，直接 100 进调教。999×2：调教结束 +
        // juel-check 退出（train-loop 的 USERCOM 999 → AFTERTRAIN；
        // juel-check 的 :461 INPUT 999 → LABEL_EXIT）。尾 0 留给触发轮
        // ENDING_2 的仪式 INPUT
        const target_set = fixture.inputs_consumed.some(
          (i) => i.api === 'input' && i.value === 17,
        );
        fixture.reset_inputs(
          ...(target_set ? [100, 999, 999, 0] : [100, 17, 999, 999, 0]),
        );
      } else {
        // 征服前：侵略推进。尾 0 留给封顶轮 ENDING_1 演出的「[0] 继续」
        // 询问（恰在该轮 TURNEND 链内消费——封顶轮结算时 FLAG:82 才翻 1，
        // 本轮仍走侵略档）
        fixture.reset_inputs(109, 1, 0);
      }
      try {
        let state = STATE.SHOP;
        while (state !== STATE.TURNEND) {
          state = await enter_state(state);
          assert(
            !(state === STATE.SHOP),
            `第 ${rounds + 1} 轮提前回 SHOP——回合没有推进（输入档与菜单错位）`,
          );
        }
        const pending = await enter_state(STATE.TURNEND);
        assert.equal(pending, STATE.SHOP, '回合结算的出口必是 BEGIN SHOP');
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

    // —— 双结局剧本（#179 返工后的新事实，与 3D 版判据方向相反）——
    // 魔王升级正反馈（魔王补正即等级，INVASION.ERB:568）让慢线侵略先于
    // 游走封顶：本剧本必然先经 ENDING_1 中场演出（选「[0] 继续」）、
    // FLAG:82 = 1，随后调教推进到 ENDING_2 收尾。3D 快线（14 日内 GAMEOVER）
    // 仍压得住侵攻度、其「ENDING_1 未抢先」断言不动——两版互补覆盖
    // 「ENDING_1 抢先 / 不抢先」两个世界
    assert.equal(
      fixture.store.get('flag:82') ?? 0,
      1,
      'FLAG:82 == 1：ENDING_1 中场演出先至（2D 慢线的必然，见文件头）',
    );
    // 封顶 = 10000 的瞬时值不可回看（已征服反抗臂的 KYOTEN_EVENT 夺回线
    // 此后缓慢回吐侵攻度，实测终局 ~9175 / 134 日）——断言收敛在「接近
    // 封顶」区间，与 FLAG:82 / 横幅两证互补
    assert.ok(
      (fixture.store.get('flag:81') ?? 0) > 9000,
      'FLAG:81 接近封顶（ENDING_1 的触发条件留证，衰减回吐后仍 > 9000）',
    );
    assert(
      texts.some((line) => line.includes('魔王终于再次掌握了世界')),
      'ENDING_1 横幅在场（中场演出真实发生过，非仅位置断言）',
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

    // —— 循环入口的完整性：每一轮恰好走一个回合转场入口（侵略 [109]
    // 或调教 [100]），触发轮在内——循环没有走偏入口、也没有空转轮
    const entry_count = fixture.inputs_consumed.filter(
      ({ value }) => value === 109 || value === 100,
    ).length;
    assert.equal(
      entry_count,
      rounds + 1,
      '每个半天轮恰好一次回合转场入口（侵略 [109] / 调教 [100]，触发轮在内）',
    );
  } finally {
    // Math.random 是进程级替换，必须恢复（同文件后续用例不被污染）
    fixture.restore_math_random();
  }
});
