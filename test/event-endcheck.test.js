/**
 * @ENDCHECK 全链的行为测试（issue #116：S4 可空转 + 结局分派循环）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点，issue #16）。
 * 直接单元级驱动 run_endcheck（不走路由），对照工单 #116 验收清单：
 *   1. ENDCHECKMAIN 五条线（2801 门槛 / 2802 资金 / 2803 魔力过载 /
 *      2804 魔王过载 / FLAG:2816 反叛）；
 *   2. ENDRESET 十一角清场（银黑桃/嘉德段位守卫、葵希罗 FLAG 侧错写）；
 *   3. ENDCHECKCHARA 素质定线（恋慕 10 / 淫乱 20）与四子判定调用守卫；
 *   4. 分派循环：空间内缺失静默（END2_1/END15_0 每日空转形态）、注册
 *      实现后族号+小节调用、个位防重播、2801 == 99 短路、空间外抛错；
 *   5. ENDING_N 门槛（2801 == 99 && DAY == 500）与 END31 死引用保留；
 *   6. 存根清单核对（STUBBED_CALLS ↔ docs/stub-registry.md）。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

/** 建一个只有魔王 0 在场的夹具（ENDCHECK 的最小世界） */
function setup_endcheck() {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  const mod = fixture.load_module('event/event-endcheck');
  return { fixture, mod };
}

/** 预置并加入一个角色（seed 预设 + addCharacter 入列） */
function join_chara(fixture, no, name = `角色${no}`) {
  fixture.seed_chara(no, { id: no, name, callname: name });
  fixture.era.addCharacter(no);
}

// —— ENDCHECKMAIN 五条线（验收清单第 1 条的五个面）——

test('ENDCHECKMAIN 2801：DAY==500 且主线空闲（==0 或 >=90）→ 置 99；其余不动', async () => {
  {
    // 主线未起步（0）
    const { fixture, mod } = setup_endcheck();
    fixture.store.set('flag:10000', 500); // DAY:0
    // #404 起置 99 会在同一轮尾部真调 @ENDING_N（演出 + ENDINGINPUT）：
    // 喂 [2]「继续游戏」让它正常返回（[1] 是 QUIT，走 throw 型控制流）
    fixture.set_inputs(2);
    await mod.run_endcheck();
    assert.equal(
      fixture.store.get('exflag:2801'),
      99,
      'DAY==500 且 2801==0 必须置 99（Normal End 门槛，也是分派短路条件）',
    );
  }
  {
    // 真结局收尾中（>= 90）
    const { fixture, mod } = setup_endcheck();
    fixture.store.set('flag:10000', 500);
    fixture.store.set('exflag:2801', 90);
    fixture.set_inputs(2);
    await mod.run_endcheck();
    assert.equal(fixture.store.get('exflag:2801'), 99, '2801>=90 同样置 99');
  }
  {
    // 剧情线推进中（1..89）：不置
    const { fixture, mod } = setup_endcheck();
    fixture.store.set('flag:10000', 500);
    fixture.store.set('exflag:2801', 50);
    await mod.run_endcheck();
    assert.equal(
      fixture.store.get('exflag:2801'),
      50,
      '2801 在 1..89（剧情线推进中）时不得置 99',
    );
  }
  {
    // 不到 500 天：不置
    const { fixture, mod } = setup_endcheck();
    fixture.store.set('flag:10000', 499);
    await mod.run_endcheck();
    assert.equal(
      fixture.store.get('exflag:2801') || 0,
      0,
      'DAY != 500 时不得置 99',
    );
  }
});

test('ENDCHECKMAIN 2802：持有金超过非作弊资金 + 8766 容差 → 置 10；恰在界上不动', async () => {
  {
    const { fixture, mod } = setup_endcheck();
    fixture.store.set('flag:10004', 10067); // MONEY
    fixture.store.set('exflag:4444', 1300); // 非作弊资金
    await mod.run_endcheck();
    assert.equal(fixture.store.get('exflag:2802'), 10, '超容差必须置 10');
  }
  {
    const { fixture, mod } = setup_endcheck();
    fixture.store.set('flag:10004', 10066);
    fixture.store.set('exflag:4444', 1300);
    await mod.run_endcheck();
    assert.equal(
      fixture.store.get('exflag:2802') || 0,
      0,
      'MONEY == 容差界（不严格大于）不得置位',
    );
  }
});

test('ENDCHECKMAIN 2803：奴隶魔力过载记录角色号；占用中（CFLAG:x:1 非零）不记', async () => {
  {
    const { fixture, mod } = setup_endcheck();
    join_chara(fixture, 31, '温妮');
    fixture.store.set('cflag:31:9', 5000);
    fixture.store.set('cflag:31:1', 0);
    await mod.run_endcheck();
    assert.equal(
      fixture.store.get('exflag:2803'),
      31,
      'CFLAG:9 >= 5000 且空闲必须记下角色号',
    );
  }
  {
    const { fixture, mod } = setup_endcheck();
    join_chara(fixture, 31, '温妮');
    fixture.store.set('cflag:31:9', 5000);
    fixture.store.set('cflag:31:1', 1); // 占用/调教中
    await mod.run_endcheck();
    assert.equal(
      fixture.store.get('exflag:2803') || 0,
      0,
      '占用中的角色不得计入（原作 CFLAG:(COUNTER):1 == 0 守卫）',
    );
  }
  {
    // 覆盖写语义（原作 :51-55 无 break）。加入序故意非升序（31 先、24 后）：
    // ere 按引擎键序迭代（getAddedCharacters 数值升序，#150），「后命中」＝
    // 最大命中 ID（31）；原作位序模型（位序＝加入序）下会记 24——两个模型
    // 在非升序加入时分道，这里是顺序语义的活判据
    const { fixture, mod } = setup_endcheck();
    join_chara(fixture, 31, '温妮');
    join_chara(fixture, 24, '莉莉');
    fixture.store.set('cflag:31:9', 6000);
    fixture.store.set('cflag:24:9', 5000);
    await mod.run_endcheck();
    assert.equal(
      fixture.store.get('exflag:2803'),
      31,
      '多角色符合时记最后迭代到的（覆盖写；迭代序＝引擎键序，数值升序）',
    );
  }
});

test('ENDCHECKMAIN 2804：魔王自己 CFLAG:0:9 >= 1500 → 置 10', async () => {
  const { fixture, mod } = setup_endcheck();
  fixture.store.set('cflag:0:9', 1500);
  await mod.run_endcheck();
  assert.equal(fixture.store.get('exflag:2804'), 10, '魔王过载必须置 10');
});

test('ENDCHECKMAIN FLAG:2816：威望耗尽（EX_FLAG:99 <= 0）→ FLAG 侧置 10；正值不动', async () => {
  {
    const { fixture, mod } = setup_endcheck();
    await mod.run_endcheck(); // 夹具零播种 → 威望 0
    assert.equal(
      fixture.store.get('flag:2816'),
      10,
      '威望 <= 0 必须置 FLAG:2816 = 10（原作错写 FLAG 侧，1:1 照写）',
    );
  }
  {
    const { fixture, mod } = setup_endcheck();
    fixture.store.set('exflag:99', 1);
    await mod.run_endcheck();
    assert.equal(
      fixture.store.get('flag:2816') || 0,
      0,
      '威望为正不得置反叛标记',
    );
  }
});

// —— ENDRESET 清场 ——

test('ENDRESET：角色全不在场 → 清全部十一角线 flag；银黑桃/嘉德段位守卫 1:1', async () => {
  const { fixture, mod } = setup_endcheck();
  // 十一角线 flag 全部预置非零
  for (const id of [2805, 2806, 2807, 2808, 2809, 2810, 2811, 2812, 2813]) {
    fixture.store.set(`exflag:${id}`, 50);
  }
  fixture.store.set('exflag:2814', 299); // 银黑桃：守卫线内 → 清（也是嘉德守卫的读数）
  fixture.store.set('exflag:2810', 499); // 嘉德：守卫读 2814（< 500）→ 清
  fixture.store.set('flag:2815', 50); // 葵希罗（FLAG 侧）
  fixture.store.set('exflag:2815', 77); // 葵希罗的 EX_FLAG 侧（错位读点，不被清）
  await mod.run_endcheck();
  for (const id of [2805, 2806, 2807, 2808, 2809, 2810, 2811, 2812, 2813]) {
    assert.equal(fixture.store.get(`exflag:${id}`), 0, `exflag:${id} 必须清零`);
  }
  assert.equal(
    fixture.store.get('exflag:2814'),
    0,
    '银黑桃 299（< 300）必须清零',
  );
  assert.equal(
    fixture.store.get('exflag:2810'),
    0,
    '嘉德 499（< 500）必须清零',
  );
  assert.equal(fixture.store.get('flag:2815'), 0, '葵希罗 FLAG 侧必须清零');
  assert.equal(
    fixture.store.get('exflag:2815'),
    77,
    '葵希罗的 EX_FLAG 侧不是清场对象（原作写 FLAG 侧的错写 1:1）',
  );
});

test('ENDRESET：银黑桃死亡段（>= 300）不清；嘉德守卫读的是银黑桃线值（原作笔误 1:1）', async () => {
  const { fixture, mod } = setup_endcheck();
  fixture.store.set('exflag:2814', 300); // 银黑桃放走/死亡段
  fixture.store.set('exflag:2810', 500); // 嘉德天神宫段——守卫不读本值
  join_chara(fixture, 17, '玛奥');
  fixture.store.set('exflag:2805', 50); // 在场：不清
  await mod.run_endcheck();
  assert.equal(fixture.store.get('exflag:2814'), 300, '银黑桃 >= 300 不得清');
  assert.equal(
    fixture.store.get('exflag:2810'),
    0,
    '嘉德离队时 2810 必须清：原作守卫读 2814（笔误），2814 < 300 恒真',
  );
  assert.equal(fixture.store.get('exflag:2805'), 50, '玛奥在场不得清');

  // 反向钉字面：银黑桃线值 >= 500（实际游戏不可达）时嘉德才免于清场
  const b = setup_endcheck();
  b.fixture.store.set('exflag:2814', 500);
  b.fixture.store.set('exflag:2810', 77);
  await b.mod.run_endcheck();
  assert.equal(
    b.fixture.store.get('exflag:2810'),
    77,
    '2814 >= 500 时嘉德 2810 不得清（守卫读 2814 的 1:1 字面行为）',
  );
});

// —— ENDCHECKCHARA ——

test('素质定线：恋慕（TALENT:85）置 10、淫乱（TALENT:76）置 20、无线旗标不动；葵希罗落 FLAG 侧', async () => {
  {
    const { fixture, mod } = setup_endcheck();
    join_chara(fixture, 17, '玛奥');
    fixture.store.set('talent:17:85', 1);
    await mod.run_endcheck();
    assert.equal(fixture.store.get('exflag:2805'), 10, '恋慕定线必须置 10');
  }
  {
    const { fixture, mod } = setup_endcheck();
    join_chara(fixture, 24, '莉莉');
    fixture.store.set('talent:24:76', 1);
    await mod.run_endcheck();
    assert.equal(fixture.store.get('exflag:2806'), 20, '淫乱定线必须置 20');
  }
  {
    const { fixture, mod } = setup_endcheck();
    join_chara(fixture, 31, '温妮');
    await mod.run_endcheck();
    assert.equal(
      fixture.store.get('exflag:2808') || 0,
      0,
      '两素质皆无时线旗标保持 0',
    );
  }
  {
    // 线旗标已有值（推进中）不得重定线
    const { fixture, mod } = setup_endcheck();
    join_chara(fixture, 17, '玛奥');
    fixture.store.set('talent:17:85', 1);
    fixture.store.set('exflag:2805', 30);
    await mod.run_endcheck();
    assert.equal(fixture.store.get('exflag:2805'), 30, '已起步的线不得重定线');
  }
  {
    // 葵希罗：定线写 FLAG 侧（原作错写 1:1），EX_FLAG 侧不动
    const { fixture, mod } = setup_endcheck();
    join_chara(fixture, 34, '葵希罗');
    fixture.store.set('talent:34:85', 1);
    fixture.store.set('exflag:2815', 41);
    await mod.run_endcheck();
    assert.equal(
      fixture.store.get('flag:2815'),
      10,
      '葵希罗定线必须落 FLAG 侧',
    );
    assert.equal(
      fixture.store.get('exflag:2815'),
      41,
      '葵希罗的 EX_FLAG 侧不是定线对象（族错位 1:1）',
    );
  }
});

test('四条角色线推进判定：调用守卫 1:1（#404 起为真身，按状态机效果观测）', async () => {
  // 每个分支都预置 EX_FLAG:2801 = 99 短路分派循环（原作 :344 的守卫）——
  // 否则 END 族的数据段会在同一次 run_endcheck 里再推一次线值，把「守卫
  // 有没有调用状态机」这件事淹没在两次推进的合成结果里
  const no_dispatch = (fixture) => fixture.store.set('exflag:2801', 99);
  {
    // 银黑桃：< 300 段才判定——预置 119 档（淫乱线 110-120 的跳档门槛）
    const { fixture, mod } = setup_endcheck();
    join_chara(fixture, 21, '银黑桃');
    no_dispatch(fixture);
    fixture.store.set('talent:21:76', 1);
    fixture.store.set('cflag:21:2', 5000);
    fixture.store.set('exflag:2814', 119);
    await mod.run_endcheck();
    assert.equal(
      fixture.store.get('exflag:2814'),
      120,
      '银黑桃在场且段位 < 300 必须调用推进判定（119 → 120）',
    );
  }
  {
    // 300 段（放走/死亡段）由调用方挡住：机械本身会把 300 档推到 310
    const { fixture, mod } = setup_endcheck();
    join_chara(fixture, 21, '银黑桃');
    no_dispatch(fixture);
    fixture.store.set('talent:21:85', 1);
    fixture.store.set('cflag:21:515', 10);
    fixture.store.set('exflag:2814', 300);
    await mod.run_endcheck();
    assert.equal(
      fixture.store.get('exflag:2814'),
      300,
      '银黑桃 >= 300 不得调用推进判定（否则 300 档会掷到 310）',
    );
  }
  {
    // 黑方片：在场即判定（无段位守卫）——9 档起步
    const { fixture, mod } = setup_endcheck();
    join_chara(fixture, 22, '黑方片');
    no_dispatch(fixture);
    fixture.store.set('talent:22:85', 1);
    fixture.store.set('cflag:22:2', 2000);
    await mod.run_endcheck();
    assert.equal(
      fixture.store.get('exflag:2811'),
      10,
      '黑方片在场必须调用推进判定（0 档起步到 1）',
    );
  }
  {
    // 嘉德：在场走本体（淫乱起步）；离队走天神宫线（:122-129 的两臂）
    const a = setup_endcheck();
    join_chara(a.fixture, 33, '嘉德');
    no_dispatch(a.fixture);
    a.fixture.store.set('talent:33:76', 1);
    a.fixture.store.set('cflag:33:2', 2000);
    await a.mod.run_endcheck();
    assert.equal(
      a.fixture.store.get('exflag:2810'),
      110,
      '嘉德在场必须调用推进判定（本体：淫乱起步 11）',
    );
    // 嘉德离队（不在场）且 2810 = 300：两臂的 gate 都不成立（第一臂缺在场、
    // 第二臂要求 >= 500）→ 本体不跑。ENDRESET 的嘉德清场守卫读 2814
    // （原作笔误），预置 500 让它免清，才能看见 2810 原样不动
    const b = setup_endcheck();
    no_dispatch(b.fixture);
    b.fixture.store.set('exflag:2814', 500);
    b.fixture.store.set('exflag:2810', 300);
    b.fixture.store.set('talent:33:76', 1);
    b.fixture.store.set('cflag:33:515', 5);
    await b.mod.run_endcheck();
    assert.equal(
      b.fixture.store.get('exflag:2810'),
      300,
      '嘉德离队且线值 < 500：本体不跑（否则 300 档会 +1 计数器）',
    );
    assert.equal(b.fixture.store.get('cflag:33:515'), 5, '计数器未被动过');
    // 嘉德离队且 2810 >= 500：走天神宫线。该线在可达区间的四个档位都是
    // 空分支、540 档的 560 转移又被 GETCHARA(33) == 0 的死守卫挡住
    // （见 event-ending.test.js 的同名用例），故此处可观测的只有「不抛错、
    // 不动 2810」——调用本身由 endcheck_godness_sky_temple 的单元用例覆盖
    const c = setup_endcheck();
    no_dispatch(c.fixture);
    c.fixture.store.set('exflag:2814', 500);
    c.fixture.store.set('exflag:2810', 545);
    await c.mod.run_endcheck();
    assert.equal(c.fixture.store.get('exflag:2810'), 545, '天神宫线空转');
  }
  {
    // 菲娅：在场即判定（初次会面 0 → 10）
    const { fixture, mod } = setup_endcheck();
    join_chara(fixture, 35, '菲娅');
    no_dispatch(fixture);
    await mod.run_endcheck();
    assert.equal(
      fixture.store.get('exflag:2807'),
      10,
      '菲娅在场必须调用推进判定（初次会面置 10）',
    );
  }
});

// —— 分派循环（验收清单第 2 条）——

test('分派循环：空间内缺失静默跳过（END2_1 与 END15_0 的每日空转形态）', async () => {
  const { fixture, mod } = setup_endcheck();
  // 反作弊计数器落进分派区间的碰撞形态（docs/research/ending-paths.md
  // 第一节：2802 置 10 → 拼出 END2_1，无定义静默）
  fixture.store.set('exflag:2802', 10);
  await mod.run_endcheck();
  assert.equal(
    fixture.text_lines().filter((line) => line.includes('END2_1')).length,
    0,
    '空间内缺失不得产生任何输出',
  );
  // 葵希罗族（15）的错位读：EX_FLAG 侧恒 0 → 每日拼 END15_0，静默
  // （上一行 run 已覆盖——此处显式断言不抛错即本用例通过）
});

test('分派循环：注册实现后按族号调用、小节 = 线值 / 10、个位非 0 防重播、2801 == 99 短路', async () => {
  // 用族 2（EX_FLAG:2802 反作弊计数器）作注册靶：它不在 ENDRESET 清场表
  // 内（角色线 flag 会被每日清场覆盖，2802 不会），可稳定预置
  {
    const { fixture, mod } = setup_endcheck();
    fixture.store.set('exflag:2802', 20); // 20 段 → END2_2
    let called = null;
    mod.END_FAMILY.register(2, (section) => {
      called = section;
    });
    await mod.run_endcheck();
    assert.equal(called, 2, '线值 20 必须以小节 2 调用 END2 族实现');
  }
  {
    // 防重播：个位非 0（演出已看过）不分发
    const { fixture, mod } = setup_endcheck();
    fixture.store.set('exflag:2802', 21);
    let called = false;
    mod.END_FAMILY.register(2, () => {
      called = true;
    });
    await mod.run_endcheck();
    assert.ok(!called, '线值个位非 0（已播）不得分发');
  }
  {
    // 短路：Normal End 已定（99）时整段不跑
    const { fixture, mod } = setup_endcheck();
    fixture.store.set('exflag:2801', 99);
    fixture.store.set('exflag:2802', 20);
    let called = false;
    mod.END_FAMILY.register(2, () => {
      called = true;
    });
    await mod.run_endcheck();
    assert.ok(!called, '2801 == 99 时分派循环必须整体短路（原作 :344 守卫）');
  }
});

test('END 族声明空间：族号 2..15 内缺失合法（返回调用点缺省），空间外抛错', async () => {
  const { fixture, mod } = setup_endcheck();
  assert.equal(
    await mod.END_FAMILY.call(2, { whenMissing: 'miss' }),
    'miss',
    '族 2 在声明空间内且未实现 → 静默返回 whenMissing（#7 缺失语义）',
  );
  assert.equal(
    await mod.END_FAMILY.call(15, { whenMissing: 'miss' }),
    'miss',
    '族 15（葵希罗错位形态的每日读点）必须在声明空间内',
  );
  await assert.rejects(
    () => mod.END_FAMILY.call(16),
    /不在声明的编号空间内/,
    '族 16 在 FOR 循环域（2..15）之外，必须抛错（拼写错误边界）',
  );
  await assert.rejects(
    () => mod.END_FAMILY.call(1),
    /不在声明的编号空间内/,
    '族 1（主线 2801 的族号，不进分派）必须抛错',
  );
  // 夹具引用仅为显式持有
  assert.ok(fixture);
});

// —— ENDING_N 与 END31 ——

test('ENDING_N：2801 == 99 且 DAY == 500 才调用（#404 起演出真身），否则不出现', async () => {
  {
    const { fixture, mod } = setup_endcheck();
    fixture.store.set('flag:10000', 500);
    // 跑判定前置 99（DAY==500 主线空闲 → ENDCHECKMAIN 置 99 → 尾部触发）；
    // 演出问 [1] 结束 / [2] 继续，喂 2 让它正常返回
    fixture.set_inputs(2);
    await mod.run_endcheck();
    const texts = fixture.text_lines();
    assert.ok(
      texts.some((line) =>
        line.includes('自从魔王被解开封印已经过了整整500天。'),
      ),
      '2801 == 99 && DAY == 500 必须调用 ENDING_N（横幅首行可见）',
    );
    assert.ok(
      texts.some((line) => line.includes('达成了【Normal End】。')),
      'ENDING_N 的收尾行可见',
    );
    assert.ok(
      texts.some((line) => line.includes('魔王的传说，还将继续......')),
      'ENDINGINPUT 的 [2] 继续分支可见（真身，非存根）',
    );
  }
  {
    const { fixture, mod } = setup_endcheck();
    fixture.store.set('flag:10000', 500);
    fixture.store.set('exflag:2801', 99);
    fixture.store.set('exflag:2803', 31); // 死引用守卫命中态：不得有 END31 输出
    fixture.set_inputs(2); // ENDING_N 的 [2] 继续
    await mod.run_endcheck();
    assert.ok(
      !fixture.text_lines().some((line) => line.includes('END31')),
      'TRYCALL END31 是死引用（#14），保留 = 无输出',
    );
  }
  {
    const { fixture, mod } = setup_endcheck();
    fixture.store.set('flag:10000', 499);
    fixture.store.set('exflag:2801', 99);
    await mod.run_endcheck();
    assert.ok(
      !fixture
        .text_lines()
        .some((line) => line.includes('自从魔王被解开封印已经过了整整500天。')),
      'DAY != 500 时不得调用 ENDING_N',
    );
  }
});

// —— 存根清单核对（#404 起六个函数全为真身，本文件的 STUBBED_CALLS 随之撤销）——

test('五条角色线判定全部为真身：模块导出状态机，且不再有 STUBBED_CALLS', async () => {
  const { fixture, mod } = setup_endcheck();
  // #404（N20）把 ENDCHECKSPADE / ENDCHECKSQUARE / ENDCHECKGODNESS /
  // ENDCHECKGODNESS_SKY_TEMPLE / ENDCHECKPRINCESS / ENDING_N 六个存根换成
  // 真身，本文件的 STUBBED_CALLS 名单随之消失（存根清单里的六行转「已实现」）
  assert.equal(mod.STUBBED_CALLS, undefined, '不再有存根名单');
  for (const name of [
    'endcheck_spade',
    'endcheck_square',
    'endcheck_godness',
    'endcheck_godness_sky_temple',
    'endcheck_princess',
  ]) {
    assert.equal(typeof mod[name], 'function', `${name} 必须导出（真身）`);
  }
  // 夹具引用仅为显式持有
  assert.ok(fixture);
});
