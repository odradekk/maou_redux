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
 *   - 口上钩子分发（#403 收口）：窗口两侧（LOCAL 0 拒绝、100-139 与 EX
 *     放行）与键 = LOCAL - 100 的偏移，前后两族各归各；
 *   - 数值副作用（JUEL/EXP/BASE 的 era.add / 门面累加）与畏怖阶段分档；
 *   - 随机分支可控可重复（rand 定值序注入，RAND:n 按函数内出现序消费）；
 *   - %SAVESTR:ARG% 插值（arg_name ← callname:31:-1）与 {MON_NUM} 计算插值；
 *   - PRINTDATA 随机数组（pick 按 rand_n 取一条）；
 *   - 初吻对象推进（CFLAG:16 == -1 → 995，SIF 语义）与初体验对象记录；
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

test('GOBI_KOUJO 行内拼接（女性版）：『猪…』整段一行收语尾（源 :708-:728，#570）', async () => {
  const fixture = await setup_ravish((f) => {
    f.store.set('talent:31:17', 1); // プライド低い → 语尾档 1（喜び）
    f.store.set('talent:31:163', 1); // K3 高貴
  });
  fixture.load_module('kojo/kojo-k3-noble');
  fixture.load_module('era-utils/era-flag').target = 31;
  const mod = fixture_module(fixture);
  // orc（女版）畏怖阶段口上先消费 1 掷（c131=0 → 初见档 pick），分支链同
  // 男版：第 2 掷 rand_n(5)=1 不中口交、第 3 掷 rand_n(4)=1 不中全穴、
  // 第 4 掷 rand_n(3)=0 中屈辱
  await mod.orc_ryou(31, 5, seq_rand(2, 1, 1, 0));
  assert.ok(
    fixture
      .text_lines()
      .includes('『猪的噢~♪还自称冒险者……简直傻了的噢~♪　噗噗，噗嘻！』'),
    '源 :708-:728 的整段在 ere 是一行（语尾两处都拼进『猪』行）',
  );
  assert.ok(
    !fixture.text_lines().some((l) => l === '的噢~♪'),
    '语尾不得单独成行（#570 的原始症状）',
  );
});

test('#584 男人凌辱（女性版）：肉便器收尾行「之类的话。」与「络绎不绝…」是同一行', async () => {
  const fixture = await setup_ravish();
  const mod = fixture_module(fixture);
  // 畏怖档 pick = 1；第 2 掷 rand_n(5)=1 不中口交；第 3 掷 rand_n(4)=0 → 肉便器支
  await mod.man_ryou(31, 5, seq_rand(1, 1, 0));
  assert.ok(
    fixture
      .text_lines()
      .includes(
        '冒险者的身上，被写着【最喜欢阴茎】【操我】之类的话。络绎不绝的魔族男人，将嘴巴、私处、肛门等等地方都侵犯了，精液流得到处都是。',
      ),
    '肉便器行必须是整行（#584 合了 :1560+:1562，#624 把 :1514..:1557 也并了进来）',
  );
});

test('RYOUZYOKU 主框架：选择[1]不要凌辱 → 直接返回 0', async () => {
  const fixture = await setup_ravish();
  const mod = fixture_module(fixture);
  fixture.era.input = async () => 1;
  const result = await mod.ryouzyoku(31, seq_rand(0));
  assert.equal(result, 0);
  assert.ok(fixture.text_lines().some((l) => l.includes('将被凌辱')));
  // #572：两枚选项是按钮（源 :21-22，正文含「- 」；引擎按 showAcc 拼 [N]）
  assert.deepEqual(
    fixture.lines
      .filter((line) => line.type === 'button')
      .map((line) => line.rendered),
    ['[0] - 旁观凌辱', '[1] - 不要凌辱'],
  );
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
  // #572：选项是按钮（源 :2358-2359；行锚此前误写成主框架的 :21/:22，已订正）
  assert.deepEqual(
    fixture.lines
      .filter((line) => line.type === 'button')
      .map((line) => line.rendered),
    ['[0] - 旁观凌辱', '[1] - 不要凌辱'],
  );
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

// —— 口上钩子分发（EVENT_K.ERB:249-272；#403 收口成本文件的两个入口）——

test('DUNGEON_RYOUZYOKU/_AFTER 钩子：窗口按 LOCAL - 100 拼键，前后两族各归各', async () => {
  const fixture = await setup_ravish((f) => {
    f.store.set('talent:31:163', 1); // 高貴 → LOCAL 103 → 键 3
  });
  const mod = fixture_module(fixture);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31; // @RYOUZYOKU :57 的 TARGET = ARG 由调用方置好
  const seen_before = [];
  const seen_after = [];
  mod.ryouzyoku_kojo_family.register(3, async (...args) => {
    seen_before.push(args);
    return 0;
  });
  mod.ryouzyoku_after_kojo_family.register(3, async (...args) => {
    seen_after.push(args);
    return 0;
  });

  assert.equal(await mod.dungeon_ryouzyoku(), 0);
  assert.equal(await mod.dungeon_ryouzyoku_after(), 0);
  assert.deepEqual(seen_before, [[]], '前钩子：键 = LOCAL - 100 = 3、无参');
  assert.deepEqual(seen_after, [[]], '后钩子进的是 _AFTER 族（两族不串）');
  assert.equal(era_flag.target, 31, '分发体不碰 TARGET（调用方管）');
});

test('DUNGEON_RYOUZYOKU 钩子：EX 性格走 LOCAL > 1000 臂（1002 → 键 902）', async () => {
  const fixture = await setup_ravish((f) => {
    f.store.set('ex_talent:31:102', 1); // EX 口上 → LOCAL 1002 → 键 902
  });
  const mod = fixture_module(fixture);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  const seen = [];
  mod.ryouzyoku_kojo_family.register(902, async (...args) => {
    seen.push(args);
    return 0;
  });

  assert.equal(await mod.dungeon_ryouzyoku(), 0);
  assert.deepEqual(seen, [[]], '窗口的 > 1000 臂可达');
});

test('DUNGEON_RYOUZYOKU 钩子：无性格编号（LOCAL 0）窗口拒绝，不拼键、不输出', async () => {
  const fixture = await setup_ravish();
  const mod = fixture_module(fixture);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  const seen = [];
  // 键 0 是 LOCAL 100 的落点：窗口若被绕开（LOCAL 0 也拼键），这里会命中
  mod.ryouzyoku_kojo_family.register(0, async (...args) => {
    seen.push(args);
    return 0;
  });

  assert.equal(await mod.dungeon_ryouzyoku(), 0);
  assert.equal(await mod.dungeon_ryouzyoku_after(), 0);
  assert.deepEqual(seen, [], 'LOCAL 0 不进窗口（否则拼出的键在声明空间外）');
  assert.deepEqual(fixture.text_lines(), []);
});

test('DUNGEON_RYOUZYOKU 钩子：窗口两侧逐点（99/100、139/140、1000/1001），边界格不许飘', async () => {
  // LOCAL 120-139 与 EX 下界格经素质不可达（GET_KOJO_NUM 只产 100-119 /
  // 1001-1700），窗口的边界值只能从**窗口本身**驱动出来：替换
  // kojo-system 的 get_kojo_num（本模块顶层解构，替换须先于本模块加载），
  // 让每个边界格各站一次两侧。#403 验收反馈的「local < 140 改 < 139
  // 全绿」正是缺 139 这一格（它只差一格，行为层再也看不见）。
  for (const [local, key] of [
    [100, 0], // 下界（慈愛 K0 的 LOCAL）
    [139, 39], // 上界内侧（声明空间最大键 39）
    [1001, 901], // EX 下界（EX_TALENT:101 → K901）
  ]) {
    const fixture = create_era_fixture();
    fixture.load_module('kojo/kojo-system').get_kojo_num = () => local;
    const mod = fixture.load_module('kojo/kojo-dungeon-ravish');
    const seen = [];
    mod.ryouzyoku_kojo_family.register(key, async (...args) => {
      seen.push(args);
      return 0;
    });

    assert.equal(await mod.dungeon_ryouzyoku(), 0);
    assert.deepEqual(seen, [[]], `LOCAL ${local} → 键 ${key} 必须分发`);
  }

  for (const local of [
    99, // 下界外一格
    140, // 上界外一格（键 40 不在声明空间）
    1000, // EX 下界外一格（键 900 不在声明空间）
  ]) {
    const fixture = create_era_fixture();
    fixture.load_module('kojo/kojo-system').get_kojo_num = () => local;
    const mod = fixture.load_module('kojo/kojo-dungeon-ravish');
    const seen = [];
    // 三个边界键都挂探针：窗口被放宽时键会落到声明空间外直接抛错，
    // 偏移被改动时探针会命中——两条改坏路径都留痕
    for (const key of [0, 39, 901]) {
      mod.ryouzyoku_kojo_family.register(key, async (...args) => {
        seen.push([key, ...args]);
        return 0;
      });
    }

    assert.equal(await mod.dungeon_ryouzyoku(), 0, `LOCAL ${local}：不抛错`);
    assert.deepEqual(seen, [], `LOCAL ${local} 必须被窗口拒绝`);
    assert.equal(
      await mod.dungeon_ryouzyoku_after(),
      0,
      `LOCAL ${local}：不抛错`,
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

// —— #624：女版迷宫凌辱里十九处「原作同一行被拆开」合回一条输出 ——
//
// 形状与男版同款：无后缀 PRINTFORM/PRINT 连续不换行，中间夹 SELECTCASE / IF
// 的分档片段与 PRINTDATA 随机词条，末段才带 W/L 收行。判据提到语句外当取值、
// 片段文本留在输出语句里，锚写成拼接锚 `:a+:b+…`。
// **断言一律钉整行**（`.includes(整行)`）：旧的 `.some(includes(片段))` 在
// 「拆回多条」时照样绿。
//
// rand 定值序（RAND:n 按函数内出现序消费）：
//   orc_ryou：畏怖档 pick → rand_n(5) 口交 → rand_n(4) 全穴 → rand_n(3) 屈辱
//   man_ryou：同上（rand_n(3)/rand_n(2) 在肉便器行内惰性消费）
//   girl_ryou：TALENT:122 支内先走 娇小/一人/RAND 链，再消费畏怖档 pick
//   pc_ryou ：开场演出 4 掷 → RAND:7/6/5/4/3/2 链

test('#624 RYOUZYOKU 主框架：:16+:19 合成一条空行（含立绘分支的空 PRINT）', async () => {
  const fixture = await setup_ravish();
  const mod = fixture_module(fixture);
  fixture.era.input = async () => 0;
  await mod.ryouzyoku(31, seq_rand(0));
  const lines = fixture.text_lines();
  assert.deepEqual(lines.slice(0, 4), [
    '冒险者将被凌辱――', // :11
    '', // :12 PRINTL
    '[结婚对象:无][善恶值:0|中立]　', // :18 SHOW_DATA
    '', // :16（立绘分支的空 PRINT）+ :19 的 PRINTL 合成的一条
  ]);
  // 拆回多条会多出一条空行：整段输出里的空行数（[1] 的 :12 + 尾部 4 条）就是守卫
  assert.equal(
    lines.filter((l) => l === '').length,
    5,
    ':16 与 :19 合成一条空行（拆回多条即多一行）',
  );
});

test('#624 兽人凌辱·单只：:302..:328 的阴毛/屁股分档与随机词条同属一行', async () => {
  // mon_num == 1 → 单只兽人支；draws：[畏怖 pick, 单只 pick, 随机词条]
  const cases = [
    [{}, '四肢着地趴在地上，屁股从后露了出来阴茎便插了进去，'],
    [
      { 阴毛状态: 201 },
      '四肢着地趴在地上，硬毛露了出来屁股从后露了出来阴茎便插了进去，',
    ],
    [
      { 阴毛状态: 151 },
      '四肢着地趴在地上，隐约看见了阴毛屁股从后露了出来阴茎便插了进去，',
    ],
    [
      { 魅力点: 14 },
      '四肢着地趴在地上，美丽的屁股从后露了出来阴茎便插了进去，',
    ],
    [{ 魅力点: 23 }, '四肢着地趴在地上，大的屁股从后露了出来阴茎便插了进去，'],
  ];
  for (const [seed, line] of cases) {
    const fixture = await setup_ravish((f) => {
      for (const [key, value] of Object.entries(seed)) {
        f.store.set(`talent:31:${key}`, value);
      }
    });
    const mod = fixture_module(fixture);
    await mod.orc_ryou(31, 1, seq_rand(0, 0, 0));
    assert.ok(
      fixture.text_lines().includes(line),
      `${JSON.stringify(seed)} → 整行「${line}」`,
    );
  }
});

test('#624 兽人凌辱·单只：:330+:335 的「脸上」与恥じらい分档同属一行', async () => {
  // c131 > 5 且 TALENT:35 → :335 分档并进 :330 的「脸上」
  const with_shy = await setup_ravish((f) => {
    f.store.set('cflag:31:131', 6);
    f.store.set('talent:31:35', 1);
  });
  await fixture_module(with_shy).orc_ryou(31, 1, seq_rand(0, 0, 0));
  assert.ok(
    with_shy.text_lines().includes('脸上流露着沉浸在了羞耻与情欲之中的神色……'),
    'TALENT:35 → :330+:335 是一整行',
  );

  // 其余分档各自与 :330 的「脸上」合成一条（前缀提到语句外共用，锚写该分支
  // 自己的行号——只并第一支的话其余分支上玩家仍看到两行，#624）
  const cases = [
    [{ 'cflag:31:131': 6 }, '脸上的神情为屈服的喜悦与口水所浸染……'],
    [
      { 'cflag:31:131': 3, 'talent:31:35': 1 },
      '脸上流露着在羞耻与快乐间彷徨的神色……',
    ],
    [{ 'cflag:31:131': 3 }, '脸上隐约露出了屈服的喜悦……'],
    [{ 'cflag:31:131': 0, 'talent:31:14': 1 }, '脸上被眼泪浸湿了……'],
    [{ 'cflag:31:131': 0, 'talent:31:35': 1 }, '脸上浸染着羞耻的神色……'],
    [{ 'cflag:31:131': 0, 'talent:31:11': 1 }, '脸上的表情因愤怒而扭曲……'],
    [{ 'cflag:31:131': 0 }, '脸上染上了绝望的神色……'],
  ];
  for (const [seed, line] of cases) {
    const fixture = await setup_ravish((f) => {
      for (const [key, value] of Object.entries(seed)) {
        f.store.set(key, value);
      }
    });
    await fixture_module(fixture).orc_ryou(31, 1, seq_rand(0, 0, 0));
    assert.ok(
      fixture.text_lines().includes(line),
      `${JSON.stringify(seed)} → 整行「${line}」`,
    );
  }
});

test('#624 兽人凌辱·口交：:410..:419 的种族分档与名字同属一行', async () => {
  const cases = [
    [
      4,
      '无头骑士的冒险者身体被固定住了，只剩下脑袋来像飞机杯似的侍奉着兽人们的阴茎。',
    ],
    [0, '冒险者全裸地侍奉着兽人们的阴茎。'],
  ];
  for (const [race, line] of cases) {
    const fixture = await setup_ravish((f) => {
      f.store.set('talent:31:种族', race);
    });
    const mod = fixture_module(fixture);
    // draws：[畏怖 pick, rand_n(5)=0 口交, 口交三选一, PRINTDATA 阴茎]
    await mod.orc_ryou(31, 5, seq_rand(0, 0, 0, 0));
    assert.ok(
      fixture.text_lines().includes(line),
      `种族 = ${race} → 整行「${line}」`,
    );
  }
});

test('#624 兽人凌辱·口交：:470+:471 的耻情点数与前置描写同属一行', async () => {
  const fixture = await setup_ravish((f) => {
    f.store.set('talent:31:13', 1); // 素直
  });
  const mod = fixture_module(fixture);
  await mod.orc_ryou(31, 5, seq_rand(0, 0, 0, 0));
  assert.ok(
    fixture
      .text_lines()
      .includes(
        '迫于兽人的威胁，她衡量了一下得失之后，老实地接受了屈辱的命运……听天由命地流泪，耻情点数+50',
      ),
    ':470（PRINTFORM）+ :471（PRINTFORML）整行',
  );
  assert.equal(fixture.store.get('juel:31:8'), 50);
});

test('#624 兽人凌辱·口交：:475..:502 与 :509..:524 两条收行路径各自成整行', async () => {
  // TALENT:52 命中：:475/:478/:481/:484 的初见分档 + :488 + 随机词条 + :498
  // + :502 的 PRINTW 收行
  const t52 = await setup_ravish((f) => {
    f.store.set('talent:31:14', 1); // 大人しい → 「提心吊胆地」
    f.store.set('talent:31:52', 1);
  });
  await fixture_module(t52).orc_ryou(31, 5, seq_rand(0, 0, 0, 0));
  const lines_t52 = t52.text_lines();
  assert.ok(
    lines_t52.includes(
      '提心吊胆地冒险者把阴茎含了下去，『呃……这家伙，简直就是经验丰富的妓女嘛～』',
    ),
    'TALENT:52 支：:475..:502 是一整行',
  );
  assert.ok(
    !lines_t52.includes('提心吊胆地'),
    ':475 的初见分档不得再单独成行（#624 审查发现：前缀重复）',
  );
  assert.ok(
    lines_t52.includes('兽人抵受不住她那灵活的舌头，射在冒险者的嘴里了。'),
    ':504 自占一行',
  );
  assert.ok(lines_t52.includes('奉仕持续了下去……'), ':524 自占一行');

  // 其余支：:509..:521 的分档片段接 :524 的 PRINTL 收行
  const cases = [
    [[14], '提心吊胆地', ''],
    [[17], '嘿嘿媚笑着', ''],
    [[35], '不敢直视肉棒而闭上了眼睛', ''],
    [[0], '为了守住自己处女的', ''],
    [[], '', ''],
    [[21], '', '像工作一样地奉仕着，'],
    [[36], '', '不禁发出了粗俗的声音，'],
    [[50], '', '很快地抓住了奉仕的诀窍，'],
    [[62], '', '忍受着腥臭味，'],
    [[63], '', '拼命地用舌头奉仕着，'],
    [[17, 21], '嘿嘿媚笑着', '像工作一样地奉仕着，'],
  ];
  for (const [talents, prefix, tail] of cases) {
    const fixture = await setup_ravish((f) => {
      for (const id of talents) {
        f.store.set(`talent:31:${id}`, 1);
      }
    });
    const mod = fixture_module(fixture);
    await mod.orc_ryou(31, 5, seq_rand(0, 0, 0, 0));
    const lines = fixture.text_lines();
    const line = `${prefix}冒险者把阴茎含了下去，${tail}奉仕持续了下去……`;
    assert.ok(
      lines.includes(line),
      `TALENT ${JSON.stringify(talents)} → :475..:498 与 :509..:524 合成一条「${line}」`,
    );
    assert.ok(
      !lines.includes(`${prefix}冒险者把阴茎含了下去，`),
      `TALENT ${JSON.stringify(talents)} → 前半段不得单独成行`,
    );
  }
});

test('#624 兽人凌辱·全穴奉仕：:549..:572 的随机词条与部位分档同属一行', async () => {
  const cases = [
    [{ cflag42: 83 }, '眼镜上飞撒着……'],
    [{ 魅力点: 2 }, '可爱的眼睛上飞撒着……'],
    [{ 魅力点: 3 }, '漂亮的鼻子里喷了出来……'],
    [{ 魅力点: 22 }, '光鲜亮丽的头发上飞撒着……'],
    [{}, '脸上飞撒着……'],
  ];
  for (const [seed, tail] of cases) {
    const fixture = await setup_ravish((f) => {
      if (seed.cflag42 !== undefined) {
        f.store.set('cflag:31:42', seed.cflag42);
      }
      if (seed.魅力点 !== undefined) {
        f.store.set('talent:31:魅力点', seed.魅力点);
      }
    });
    const mod = fixture_module(fixture);
    // draws：[畏怖 pick, rand_n(5), rand_n(4)=0, PRINTDATAW, PRINTDATA]
    await mod.orc_ryou(31, 5, seq_rand(0, 1, 0, 0, 0));
    const line =
      '兽人的阴茎插进了冒险者的喉咙深处，射精的同时喷溅出来的精液在冒险者的' +
      tail;
    assert.ok(
      fixture.text_lines().includes(line),
      `${JSON.stringify(seed)} → 整行「${line}」`,
    );
  }
});

test('#624 兽人凌辱·全穴奉仕：:595..:613 的润滑液与部位分档同属一行', async () => {
  const cases = [
    [{ 魅力点: 21 }, '漂亮的'],
    [{ 魅力点: 14 }, '漂亮的屁股的缝隙中的'],
    [{ 魅力点: 23 }, '大的屁股的缝隙中的'],
    [{ 125: 1 }, '无毛额'],
    [{ 248: 1 }, '肌肉明显的两腿间的'],
    [{ 阴毛状态: 201 }, '从阴阜到肛门都被茂密的阴毛所覆盖的'],
    [{ 阴毛状态: 151 }, '长着茂盛的阴毛的'],
    [{}, ''],
  ];
  for (const [seed, part] of cases) {
    const fixture = await setup_ravish((f) => {
      for (const [key, value] of Object.entries(seed)) {
        f.store.set(`talent:31:${key}`, value);
      }
    });
    const mod = fixture_module(fixture);
    await mod.orc_ryou(31, 5, seq_rand(0, 1, 0, 0, 0));
    const line = `兽人们把润滑液涂在了冒险者的${part}性器和肛门上`;
    assert.ok(
      fixture.text_lines().includes(line),
      `${JSON.stringify(seed)} → 整行「${line}」`,
    );
  }
});

test('#624 兽人凌辱·全穴奉仕：:614..:639 的体型分档与收行同属一行', async () => {
  const cases = [
    [{ 99: 1 }, '魁梧的身体上'],
    [{ 100: 1 }, '娇小的身体上'],
    [{ 115: 1 }, '松松垮垮的身体上'],
    [{ 248: 1 }, '紧致的身体上'],
    [{ 256: 1 }, '窈窕的身体上'],
    [{ 体型: 100 }, '纤细的身体上'],
    [{ 体型: 0 }, '纤细的身体上'],
    [{ 体型: 201 }, '肉感的身体上'],
    [{ 体型: 150 }, '身体上'],
  ];
  for (const [seed, part] of cases) {
    const fixture = await setup_ravish((f) => {
      for (const [key, value] of Object.entries(seed)) {
        f.store.set(`talent:31:${key}`, value);
      }
    });
    const mod = fixture_module(fixture);
    await mod.orc_ryou(31, 5, seq_rand(0, 1, 0, 0, 0));
    const line = `在冒险者的${part}像要挤爆她似的激烈地持续侵犯着……`;
    assert.ok(
      fixture.text_lines().includes(line),
      `${JSON.stringify(seed)} → 整行「${line}」`,
    );
  }
});

test('#624 兽人凌辱·屈辱プレイ：:668..:687 的素质分档与猪叫同属一行', async () => {
  const cases = [
    [{ 10: 1 }, '浑身颤抖着、'],
    [{ 14: 1 }, '浑身颤抖着、'],
    [{ 11: 1 }, '怒目圆睁着、'],
    [{ 13: 1 }, '拼命服从着、'],
    [{ 17: 1 }, '拼命献媚着、'],
    [{ 35: 1 }, '羞红了脸、'],
    [{}, ''],
  ];
  for (const [seed, part] of cases) {
    const fixture = await setup_ravish((f) => {
      for (const [key, value] of Object.entries(seed)) {
        f.store.set(`talent:31:${key}`, value);
      }
    });
    const mod = fixture_module(fixture);
    // draws：[畏怖 pick, rand_n(5), rand_n(4), rand_n(3)=0, PRINTDATAW]
    await mod.orc_ryou(31, 5, seq_rand(0, 1, 1, 0, 0));
    const line = `冒险者全裸地四肢着地趴在地下、${part}屈辱地模仿猪叫……`;
    assert.ok(
      fixture.text_lines().includes(line),
      `${JSON.stringify(seed)} → 整行「${line}」`,
    );
  }
});

test('#624 男人凌辱（女性版）·肉便器：:1514..:1562 的落書与收尾同属一行', async () => {
  const cases = [
    [{}, [1, 1, 0], '【最喜欢阴茎】【操我】'],
    [{}, [1, 1, 0, 1, 0], '【最喜欢阴茎】【肛门免费】'],
    [{}, [1, 1, 0, 1, 1], '【最喜欢阴茎】【母猪】'],
    [{ 0: 1 }, [1, 1, 0], '【处女开通纪念】【操我】'],
    [
      { 22: 1, 24: 1, 42: 1, 70: 1, 110: 1, 121: 1 },
      [1, 1, 0],
      '【最喜欢阴茎】【性冷淡便器】【千金小姐便器出道】【又粘又湿】【愉悦的脸】【乳牛】【有鸡鸡的奴隶】【操我】',
    ],
  ];
  for (const [talents, draws, marks] of cases) {
    const fixture = await setup_ravish((f) => {
      for (const [id, value] of Object.entries(talents)) {
        f.store.set(`talent:31:${id}`, value);
      }
    });
    const mod = fixture_module(fixture);
    await mod.man_ryou(31, 5, seq_rand(...draws));
    const line =
      `冒险者的身上，被写着${marks}` +
      '之类的话。络绎不绝的魔族男人，将嘴巴、私处、肛门等等地方都侵犯了，精液流得到处都是。';
    assert.ok(
      fixture.text_lines().includes(line),
      `TALENT ${JSON.stringify(talents)} / RAND ${draws} → 整行「${line}」`,
    );
  }
});

test('#624 女魔族凌辱·一人：:1692..:1706 的阴茎分档与长舌头同属一行', async () => {
  const cases = [
    [0, '阴茎'],
    [1, '巨根'],
    [2, '短小包茎'],
    [3, '包茎'],
    [4, '马阴茎'],
  ];
  for (const [p318, part] of cases) {
    const fixture = await setup_ravish((f) => {
      f.store.set('talent:31:122', 1); // 男人支（本函数的 :1673-1779 段）
      if (p318 !== 0) {
        f.store.set('talent:31:318', p318);
      }
    });
    const mod = fixture_module(fixture);
    // draws：[畏怖 pick]（mon_num == 1 → 一人支，无额外抽数）
    await mod.girl_ryou(31, 1, seq_rand(0));
    const line = `紫色的长舌头，在冒险者的${part}上舔舐着，吸取着精气。`;
    assert.ok(
      fixture.text_lines().includes(line),
      `TALENT:318 = ${p318} → 整行「${line}」`,
    );
  }
});

test('#624 女魔族凌辱·多人口交：:1733..:1747 与一人支同型的一整行', async () => {
  const cases = [
    [0, '阴茎'],
    [1, '巨根'],
    [2, '短小包茎'],
    [3, '包茎'],
    [4, '马阴茎'],
  ];
  for (const [p318, part] of cases) {
    const fixture = await setup_ravish((f) => {
      f.store.set('talent:31:122', 1);
      if (p318 !== 0) {
        f.store.set('talent:31:318', p318);
      }
    });
    const mod = fixture_module(fixture);
    // draws：[rand_n(3)=0 多人口交支, 畏怖 pick]
    await mod.girl_ryou(31, 5, seq_rand(0, 0));
    const line = `紫色的长舌头，在冒险者的${part}上舔舐着，吸取着精气。`;
    assert.ok(
      fixture.text_lines().includes(line),
      `TALENT:318 = ${p318} → 整行「${line}」`,
    );
  }
});

test('#624 女魔族凌辱·喂奶：:1805..:1819 的阴茎分档与紫色手同属一行', async () => {
  const cases = [
    [0, '阴茎'],
    [1, '巨根'],
    [2, '短小包茎'],
    [3, '包茎'],
    [4, '马阴茎'],
  ];
  for (const [p318, part] of cases) {
    const fixture = await setup_ravish((f) => {
      f.store.set('talent:31:122', 1);
      if (p318 !== 0) {
        f.store.set('talent:31:318', p318);
      }
    });
    const mod = fixture_module(fixture);
    // draws：[rand_n(3)=1 不中口交, rand_n(2)=1 不中跨坐 → 喂奶支, 畏怖 pick]
    await mod.girl_ryou(31, 5, seq_rand(1, 1, 0));
    const line = `紫色的手，温柔地在冒险者的${part}上爱抚着。`;
    assert.ok(
      fixture.text_lines().includes(line),
      `TALENT:318 = ${p318} → 整行「${line}」`,
    );
  }
});

test('#624 女魔族凌辱·处女封印：:1889..:1895 的 RAND:2 二选一同属一行', async () => {
  const cases = [
    [0, '『这边的穴才有的个中滋味 好好感・受・吧』'],
    [1, '『这边的穴也有的个中滋味 好好感・受・吧』'],
  ];
  for (const [r2, line] of cases) {
    const fixture = await setup_ravish((f) => {
      f.store.set('talent:31:273', 1); // 处女封印（女性对象主流程，与 TALENT:122 无关）
    });
    const mod = fixture_module(fixture);
    // draws：[畏怖 pick, 外层 rand_n(2)=0, 内层 rand_n(2)=1 → 本行, 行内 rand_n(2)]
    await mod.girl_ryou(31, 5, seq_rand(0, 0, 1, r2));
    assert.ok(
      fixture.text_lines().includes(line),
      `RAND:2 = ${r2} → 整行「${line}」`,
    );
  }
});

test('#624 对人格斗·巨型假阳具：:2517..:2523 的穴二选一同属一行', async () => {
  // 该支的判据含 `!(TALENT:(ARG:1):122)`（:2515），所以 :2519 的「后穴」臂
  // 在原作里不可达（ARG:1 是男人时不进这一支）——只钉可达的「前后两穴都」
  const fixture = await setup_ravish();
  const mod = fixture_module(fixture);
  fixture.era.input = async () => 0;
  // draws：[开场 4 掷（全不中）, rand_n(7) 不中, rand_n(6)=0 巨型假阳具]
  await mod.pc_ryou(0, 31, seq_rand(1, 1, 1, 1, 1, 0));
  assert.ok(
    fixture
      .text_lines()
      .includes('冒险者的前后两穴都被巨型假阳具插入了，你用手抚摸着入口周边。'),
    ':2517..:2523 是一整行',
  );
});

test('#624 对人格斗·头发压脸：:2646..:2650 的阴茎/私处二选一同属一行', async () => {
  const fixture = await setup_ravish((f) => {
    f.store.set('talent:31:17', 1); // 低姿态
  });
  const mod = fixture_module(fixture);
  fixture.era.input = async () => 0;
  // draws：[开场 4 掷, rand_n(7), rand_n(6), rand_n(5), rand_n(4), rand_n(3)=0]
  await mod.pc_ryou(0, 31, seq_rand(1, 1, 1, 1, 1, 1, 1, 1, 0));
  const lines = fixture.text_lines();
  assert.ok(
    lines.includes('冒险者谦卑地用狗一样的神态舔舐着你的'),
    ':2644 自占一行（PRINTFORML 收行）',
  );
  assert.ok(lines.includes('私处。'), ':2646/:2648 与 :2650 合成一行');
});

test('#624 对人格斗·捆绑：:2674+:2676 与 :2679 两条收行路径各自成整行', async () => {
  // draws：[开场 4 掷, rand_n(7..3) 全不中, rand_n(2)=0 捆绑, rand_n(3)=0 鞭打,
  // 行内 rand_n(2) 决定鞭子/蜡烛]
  const whip = await setup_ravish();
  const mod_whip = fixture_module(whip);
  whip.era.input = async () => 0;
  await mod_whip.pc_ryou(0, 31, seq_rand(1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0));
  assert.ok(
    whip.text_lines().includes('向伏在地上的冒险者的背上用鞭子不停地抽打着、'),
    'RAND:2 = 0 → :2674+:2676 是一整行',
  );

  const candle = await setup_ravish();
  const mod_candle = fixture_module(candle);
  candle.era.input = async () => 0;
  await mod_candle.pc_ryou(0, 31, seq_rand(1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1));
  const lines = candle.text_lines();
  assert.ok(
    lines.includes('向伏在地上的冒险者的背上将点燃的蜡烛倾倒了上去'),
    'RAND:2 = 1 → :2674 与 :2679 合成一条（语句外前缀常量 + 该分支自己的收行）',
  );
  assert.ok(
    !lines.includes('向伏在地上的冒险者的背上'),
    'RAND:2 = 1 → :2674 不得再单独成行',
  );
  assert.ok(
    lines.includes(
      '过热的刺痛让冒险者的身体不住地抽搐着、身上更是被滴上了更多的蜡',
    ),
    ':2680 自占一行',
  );
});
