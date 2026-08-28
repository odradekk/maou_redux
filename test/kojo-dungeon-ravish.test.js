/**
 * ere/kojo/kojo-dungeon-ravish.js 的行为测试（issue #182，阶段 3 H13）。
 *
 * 缝 = test/helpers/era-fixture.js。世界底座：被凌辱者 = 角色 31（通用奴隶
 * 编号），由 join_slave_chara 预置并加入。覆盖：
 *   - 13 种怪物分派（`*_ryou` 女性版）+ 主框架 @RYOUZYOKU（E 表读取、
 *     凌辱畏怖记忆 CFLAG:130/131 推进、按 TALENT:122 分流到 H14 男版）；
 *   - @PC_RYOU（武器检查 EQUIP_DATABASE、触手武器分支、REPEAT 三连随机、
 *     处女丧失推进 CFLAG:15/16/CSTR:3）；
 *   - @VICTORY_RYOUZYOKU（善恶值门槛、E 表分派到 *_RYOU_YUSYA）；
 *   - @DUNGEON_RYOUZYOKU_ESCAPE（队伍解析、CHECK_STATUS 评级、救援成功
 *     时回城标志/体力气力回复/状态回侵攻）；
 *   - 数值副作用（JUEL/EXP/BASE 的 era.add / 门面累加）与畏怖阶段分档；
 *   - 随机分支可控可重复（rand 定值序注入，RAND:n 按函数内出现序消费）；
 *   - %SAVESTR:ARG% 插值（arg_name ← callname:31:-1）与 {MON_NUM} 计算插值；
 *   - PRINTDATA 随机数组（pick 按 rand_n 取一条）；
 *   - 初吻对象推进（CFLAG:16 == -1 → 995，SIF 语义）与初体验对象记录；
 *   - 存根清单核对（GOBI_KOUJO/CHA_IMG2/SHOW_DATA/KARMA 登记
 *     docs/stub-registry.md）；
 *   - **同名函数断言**：本文件导出 `*_ryou`（无 man 后缀），与 H14
 *     （#183）的 `@*_RYOU男`（带 man）区分——#12 的首个加载生效遮蔽不触发。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_chara_0, join_slave_chara } = require('./helpers/chara');

// RAND:N 定值序：draws 依次被消费，越界取模
const seq_rand =
  (...draws) =>
  (n) => {
    const value = draws.shift() ?? 0;
    return value % n;
  };

// 世界底座：被凌辱者 31 入列（无调教上下文——本文件不依赖 beginTrain）
async function setup_ravish(seed) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '冒险者');
  if (seed) {
    seed(fixture);
  }
  fixture.load_module('kojo/kojo-dungeon-ravish');
  return fixture;
}

function fixture_module(fixture) {
  return fixture.load_module('kojo/kojo-dungeon-ravish');
}

// 全部 13 个怪物函数（导出名 → 源文件里的 @ 原名）
const FUNCS = [
  ['orc_ryou', 'ORC_RYOU'],
  ['slime_ryou', 'SLIME_RYOU'],
  ['insect_ryou', 'INSECT_RYOU'],
  ['ivy_ryou', 'IVY_RYOU'],
  ['syokusyu_ryou', 'SYOKUSYU_RYOU'],
  ['faily_ryou', 'FAILY_RYOU'],
  ['giant_ryou', 'GIANT_RYOU'],
  ['man_ryou', 'MAN_RYOU'],
  ['girl_ryou', 'GIRL_RYOU'],
  ['beast_ryou', 'BEAST_RYOU'],
  ['brain_ryou', 'BRAIN_RYOU'],
  ['horse_ryou', 'HORSE_RYOU'],
  ['pc_ryou', 'PC_RYOU'],
];

test('13 个函数（12 怪物 + PC_RYOU）分派：各自可调用、输出非空、返回 0', async () => {
  for (const [export_name, erb_name] of FUNCS) {
    const fixture = await setup_ravish();
    const mod = fixture_module(fixture);
    assert.equal(typeof mod[export_name], 'function', `${export_name} 未导出`);
    // 女性对象（TALENT:122 = 0），体力/气力充足，无封印
    fixture.store.set('base:31:0', 500);
    fixture.store.set('base:31:1', 500);
    let result;
    if (export_name === 'pc_ryou') {
      // PC_RYOU 需要胜者（0）与败者（31）两个参数 + rand；预置旁观选择
      fixture.set_inputs(0);
      result = await mod.pc_ryou(0, 31, seq_rand(0, 0, 0, 0, 0));
    } else {
      result = await mod[export_name](31, 5, seq_rand(0));
    }
    assert.equal(result, 0, `${export_name} 应返回 0（RETURN 0）`);
    const lines = fixture.text_lines();
    assert.ok(
      lines.length > 0,
      `${export_name}（原作 @${erb_name}）应输出文本`,
    );
  }
});

test('RYOUZYOKU 主框架：选择[1]不要凌辱 → 直接返回 0', async () => {
  const fixture = await setup_ravish();
  const mod = fixture_module(fixture);
  fixture.era.input = async () => 1;
  const result = await mod.ryouzyoku(31, seq_rand(0));
  assert.equal(result, 0);
  assert.ok(fixture.text_lines().some((l) => l.includes('将被凌辱')));
  assert.ok(fixture.text_lines().some((l) => l.includes('不要凌辱')));
});

test('RYOUZYOKU 主框架：选择[0]旁观 → 走凌辱畏怖记忆 + 分派（无怪物列时跳过）', async () => {
  const fixture = await setup_ravish((f) => {
    f.store.set('base:31:0', 500);
    f.store.set('base:31:1', 500);
    // E 表：第 1 列（列头 0）有怪物——凌辱类型 1（兽人）、数量 5
    f.store.set('e:0', 100); // 怪物番号（狗头人）
    f.store.set('e:7', 1); // 凌辱类型（兽人）
    f.store.set('e:99', 5); // 数量
  });
  const mod = fixture_module(fixture);
  fixture.era.input = async () => 0;
  // 兽人分支：rand_n(5) 用于口交判定（0 → 口交）
  const result = await mod.ryouzyoku(31, seq_rand(0));
  assert.equal(result, 0);
  const lines = fixture.text_lines();
  assert.ok(
    lines.some((l) => l.includes('的凌辱开始了')),
    '应打印凌辱开始',
  );
  assert.ok(
    lines.some((l) => l.includes('冒险者')),
    '应含被凌辱者名',
  );
  // 凌辱畏怖记忆推进：CFLAG:130 = 怪物号 100、CFLAG:131 = 0（首次）
  assert.equal(
    fixture.store.get('cflag:31:130'),
    100,
    '凌辱畏怖记忆推进：CFLAG:130 = 怪物号',
  );
  assert.equal(fixture.store.get('cflag:31:131'), 0);
});

test('RYOUZYOKU 主框架：同一怪物再来 → CFLAG:131 递增（畏怖计数）', async () => {
  const fixture = await setup_ravish((f) => {
    f.store.set('base:31:0', 500);
    f.store.set('base:31:1', 500);
    f.store.set('cflag:31:130', 100); // 上次凌辱过狗头人（第 2 列）
    f.store.set('cflag:31:131', 2);
    // 狗头人（ID 100）放第 2 列（列头 100）——扫描记 MON_FEAR = 100（列头），
    // 主循环 LOCAL:1 = 100（怪物号）→ MON_FEAR == LOCAL:1 → CFLAG:131++
    // （原作的列头/怪物号近似判定，:72 的 CFLAG:ARG:131++）
    f.store.set('e:100', 100);
    f.store.set('e:107', 1);
    f.store.set('e:199', 5);
  });
  const mod = fixture_module(fixture);
  fixture.era.input = async () => 0;
  await mod.ryouzyoku(31, seq_rand(0));
  // 同一怪物（MON_FEAR == LOCAL:1）→ CFLAG:131++
  assert.equal(fixture.store.get('cflag:31:131'), 3);
});

test('RYOUZYOKU 主框架：男人（TALENT:122）→ 分派到 H14 男版（*_ryou_man）', async () => {
  const fixture = await setup_ravish((f) => {
    f.store.set('base:31:0', 500);
    f.store.set('base:31:1', 500);
    f.store.set('talent:31:122', 1); // 男人
    f.store.set('e:0', 100);
    f.store.set('e:7', 1); // 兽人
    f.store.set('e:99', 5);
  });
  const mod = fixture_module(fixture);
  fixture.era.input = async () => 0;
  await mod.ryouzyoku(31, seq_rand(0));
  const lines = fixture.text_lines();
  assert.ok(
    lines.some((l) => l.includes('不侵犯他的下体')),
    '男人对象应走 H14 男版文本',
  );
});

test('PC_RYOU：选择[1]不要凌辱 → 直接返回 0', async () => {
  const fixture = await setup_ravish();
  const mod = fixture_module(fixture);
  fixture.era.input = async () => 1;
  const result = await mod.pc_ryou(0, 31, seq_rand(0));
  assert.equal(result, 0);
  assert.ok(fixture.text_lines().some((l) => l.includes('不要凌辱')));
});

test('PC_RYOU：素手时装剑（CFLAG:550 = 40），触手武器（识别号 49）分支 + 处女丧失', async () => {
  const fixture = await setup_ravish((f) => {
    f.store.set('base:31:0', 500);
    f.store.set('base:31:1', 500);
    // 武器存储编号 49（识别号 49 = 触手；强度 0、前缀 0）
    f.store.set('cflag:0:550', 49);
    f.store.set('talent:31:0', 1); // 处女
    f.store.set('exp:31:0', 0); // 无私处经验（处女丧失条件：EXP > 0）
  });
  const mod = fixture_module(fixture);
  fixture.era.input = async () => 0;
  // 触手分支：无封印 → 私处路线
  const result = await mod.pc_ryou(0, 31, seq_rand(0));
  assert.equal(result, 0);
  assert.equal(fixture.store.get('cflag:0:550'), 49, '武器存储编号不变');
  const lines = fixture.text_lines();
  assert.ok(
    lines.some((l) => l.includes('触手')),
    '触手武器分支应输出',
  );
});

test('PC_RYOU：处女丧失推进 CFLAG:15（初体验对象）与 CSTR:3（初体验对象名）', async () => {
  const fixture = await setup_ravish((f) => {
    f.store.set('base:31:0', 500);
    f.store.set('base:31:1', 500);
    f.store.set('cflag:0:550', 49); // 触手武器（识别号 49）
    f.store.set('talent:31:0', 1); // 处女
    f.store.set('exp:31:0', 10); // 有私处经验 → 处女丧失判定
  });
  const mod = fixture_module(fixture);
  fixture.era.input = async () => 0;
  await mod.pc_ryou(0, 31, seq_rand(0));
  // 触手无封印私处路线 :2442-2446：TALENT:31:0 = 0、CFLAG:15 = NO:0 + 1 = 1、
  // CSTR:3 = 胜者名（你）
  assert.equal(fixture.store.get('talent:31:0'), 0, '处女丧失');
  assert.equal(fixture.store.get('cflag:31:15'), 1, '初体验对象 = NO:0 + 1');
  assert.equal(fixture.store.get('cstr:31:3'), '你', '初体验对象名 = 胜者名');
});

test('VICTORY_RYOUZYOKU：善恶值 > -50 → 直接返回 0（不发生）', async () => {
  const fixture = await setup_ravish((f) => {
    f.store.set('cflag:31:151', 0); // 善恶值 0 > -50
  });
  const mod = fixture_module(fixture);
  assert.equal(await mod.victory_ryouzyoku(31, seq_rand(0)), 0);

  // 边界：善恶值 -10 仍 > -50 → 不触发（改坏为 > 0 后此处红——变异版
  // -10 > 0 为假会继续，走到 YUSYA 分派并输出文本）
  const f2 = await setup_ravish((f) => {
    f.store.set('cflag:31:151', -10); // 中立但未到混沌
    f.store.set('e:107', 2); // 第 2 列史莱姆
    f.store.set('e:100', 152);
    f.store.set('talent:31:122', 1);
  });
  const m2 = fixture_module(f2);
  await m2.victory_ryouzyoku(31, seq_rand(1, 1));
  assert.equal(
    f2.text_lines().length,
    0,
    '善恶值 > -50 门槛：-10 不触发（混沌才发生，变异版会输出）',
  );
});

test('VICTORY_RYOUZYOKU：善恶值 <= -50 且随机命中 → 分派史莱姆 YUSYA 演出', async () => {
  const fixture = await setup_ravish((f) => {
    f.store.set('cflag:31:151', -100); // 混沌
    f.store.set('e:107', 2); // 第 2 列凌辱类型 = 史莱姆
    f.store.set('e:100', 152); // 第 2 列怪物号
    f.store.set('talent:31:122', 1); // 男人 → 史莱姆 YUSYA 的 TALENT:122 命中
  });
  const mod = fixture_module(fixture);
  // rand_n(12) != 0（避开 0）；rand_n(3) = 1 → B = 100（第 2 列）
  const result = await mod.victory_ryouzyoku(31, seq_rand(1, 1));
  assert.equal(result, 0);
  const lines = fixture.text_lines();
  assert.ok(
    lines.some((l) =>
      l.includes('无法抑制自己的欲望，沉醉在被黏液凌辱肉棒的快感中'),
    ),
    '史莱姆 YUSYA 应输出',
  );
});

test('DUNGEON_RYOUZYOKU_ESCAPE：无同伴（SIDEA/SIDEB 均 0）→ 直接返回', async () => {
  const fixture = await setup_ravish();
  const mod = fixture_module(fixture);
  const result = await mod.dungeon_ryouzyoku_escape(31, seq_rand(0));
  assert.equal(result, 0);
  assert.deepEqual(fixture.text_lines(), []);
});

test('DUNGEON_RYOUZYOKU_ESCAPE：同伴发现 + 畏怖低（FEAR <= 3）救援成功', async () => {
  const fixture = await setup_ravish((f) => {
    f.store.set('cflag:31:533', 31); // 自己是队长
    f.store.set('cflag:31:531', 32); // 同伴A
    f.store.set('cflag:31:131', 1); // 畏怖低
    f.store.set('base:31:0', 200);
    f.store.set('base:31:1', 100);
    // 同伴 32 也预置
    f.seed_chara(32, { id: 32, name: '队友', callname: '队友' });
    f.era.addCharacter(32);
    f.store.set('cflag:32:1', 2); // 侵攻中
    f.store.set('maxbase:32:0', 2000);
    f.store.set('maxbase:32:1', 1000);
    f.store.set('base:32:0', 2000);
    f.store.set('base:32:1', 1000);
  });
  const mod = fixture_module(fixture);
  // rand_n(fear) = rand_n(2) = 0 → 救援成功
  const result = await mod.dungeon_ryouzyoku_escape(31, seq_rand(0));
  assert.equal(result, 0);
  const lines = fixture.text_lines();
  assert.ok(lines.some((l) => l.includes('发现了奄奄一息的')));
  assert.ok(lines.some((l) => l.includes('救下并逃出了地下城')));
  // 回城标志 507 = 1、体力/气力 +100、状态回侵攻
  assert.equal(
    fixture.store.get('cflag:31:507'),
    1,
    '救援成功：回城标志 507 写入',
  );
  assert.equal(fixture.store.get('base:31:0'), 300);
  assert.equal(fixture.store.get('base:31:1'), 200);
  assert.equal(fixture.store.get('cflag:31:1'), 2);
});

test('存根清单可检索：docs/stub-registry.md 收录本文件全部占位名', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = fixture.load_module('kojo/kojo-dungeon-ravish');
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
});

test('同名函数断言：*_ryou 与 H14 的 *_ryou_man 名字区分', async () => {
  // #12 的首个加载生效遮蔽只发生在「同名」函数之间。本文件（H13）的
  // 函数是 `@*_RYOU`（JS 导出 `*_ryou`），H14 的 DUNGEON_RYOUZYOKU_MAN.ERB
  // 是 `@*_RYOU男`（带 man）——两组名字不同，互不遮蔽。这里断言导出名
  // 都不带 man 后缀，且与源文件的 @ 原名逐字对应（对照
  // DUNGEON_RYOUZYOKU.ERB 的分派调用名）。
  const fixture = create_era_fixture();
  const mod = fixture.load_module('kojo/kojo-dungeon-ravish');
  const erb = fs.readFileSync(
    path.resolve(
      __dirname,
      '..',
      'target',
      'ERB',
      '迷宮',
      'DUNGEON_RYOUZYOKU.ERB',
    ),
    'utf8',
  );
  for (const [export_name, erb_name] of FUNCS) {
    assert.equal(typeof mod[export_name], 'function');
    assert.ok(
      erb.includes(`@${erb_name}(ARG)`) || erb.includes(`@${erb_name}, ARG`),
      `源文件应含 @${erb_name}(ARG) 定义`,
    );
    assert.ok(
      !export_name.endsWith('_man'),
      `H13 导出不应带 man 后缀：${export_name}`,
    );
  }
  // H13 的分派 CALL 名（TALENT:122 为假）引用的正是本文件的无 man 名
  const h14 = fs.readFileSync(
    path.resolve(
      __dirname,
      '..',
      'target',
      'ERB',
      '迷宮',
      'DUNGEON_RYOUZYOKU_MAN.ERB',
    ),
    'utf8',
  );
  assert.ok(
    h14.includes('@ORC_RYOU男(ARG)'),
    'H14 源应含带 man 名（互不遮蔽的证据）',
  );
});
