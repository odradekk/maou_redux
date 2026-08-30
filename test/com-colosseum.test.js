/**
 * ere/system/train/com-colosseum.js 的行为测试（issue #230：死斗场与怪物
 * 族 200-207）。验收项「8 条指令各有测试（真身 + 可用性判定 + 消息分支
 * 三样都要覆盖）」的落点：
 *
 *   - @COM_ABLE200-207：自动不可/装备互斥/观战券、死斗场守卫、等级门槛
 *     （数据驱动）、以及 #214 裁定的撞号消解——L_IDX 100（COM207 媚药
 *     史莱姆）被 COM_ABLE 过滤后输入 100 恒落 @USERCOM；
 *   - @COM200 真身：进入/退出翻转、胆怯/感情淡薄的损耗缩放；
 *   - TRAIN_MESSAGE 分支：B 的 200 分支（进出两支 + 服装前缀 + 全裸示众）
 *     与 201-207 的显式无操作（源侧无分支，不得出占位行）、A 公共头的
 *     TFLAG:15 死斗场两臂；
 *   - @COM201 真身：压制/反击两支、助手退却、凌辱菜单（选项条件/收入/
 *     暂时放过）；
 *   - @COM202-206 真身：五体的开战损耗/败北线/追加伤害/收入倍率（对照
 *     手算真值表）、体力枯竭折减、失神支、999 的两型出口（COM206 缺
 *     RETURN 0）、COM206 的扩张经验、射精检查的全部分档与旗标；
 *   - @COM207 真身：无失神判定、JUMP COM51 的尾调用形态；
 *   - train-loop 的 RETURN 0 语义（#230 落地）：回合作废、不结算、PREVCOM
 *     不推进。
 *
 * 世界底座与 com0-caress.test.js 的 seed_caress_world 同构。战斗点的世界
 * 参数一律播 **CFLAG:13/14（基础攻击/防御）**——ARENA_*_POINT 先过
 * WEAPON_RESTORE，它会用基础值 × 装备系数重算并覆盖 CFLAG:11/12，直接播
 * 11/12 会被清零。别族子指令（COM5/21/27/31/51，归 #219/#221/#222/#224）
 * 在用例里按需注册假身——分发族按 fixture 隔离，测试态的假身不污染别的
 * 用例。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

/** 助手角色（COM201 用） */
function join_assi_chara(fixture, id = 32, name = `助手${id}`) {
  fixture.seed_chara(id, { id, name, callname: name });
  fixture.era.addCharacter(id);
}

/**
 * 世界底座：魔王 0 + 奴隶 31（+ 可选助手 32）、火车表已开。默认奴隶
 * 气力枯竭（base:1 = 0 → 陷落路径可达）、魔王等级 10、观战券 3 张、
 * 怪物射精槽上限 10000。
 */
function seed_colosseum_world({ assi = false } = {}) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  if (assi) {
    join_assi_chara(fixture);
  }
  fixture.era.beginTrain(0, 31, ...(assi ? [32] : []));
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.assi = assi ? 32 : -1;
  era_flag.assiplay = 0;
  era_flag.player = 0;
  fixture.load_module('system/train/com-colosseum');
  const { com_family, com_able_family } = fixture.load_module(
    'system/train/com-family',
  );
  fixture.store.set('base:31:0', 1000); // 体力满（体力枯竭 /=4 折减的缺省关闭）
  fixture.store.set('base:31:1', 0);
  fixture.store.set('maxbase:31:1', 1000);
  fixture.store.set('cflag:0:9', 10);
  fixture.store.set('item:35', 3);
  fixture.store.set('maxbase:0:4', 10000);
  return { fixture, era_flag, com_family, com_able_family };
}

/** 战斗点的世界参数：播基础攻防（CFLAG:13/14，无装备时 11/12 = 基础值） */
function slave_base_combat(fixture, atk, def) {
  fixture.store.set('cflag:31:13', atk);
  fixture.store.set('cflag:31:14', def);
}

/** 已打印按钮的 `快捷键:正文` 清单 */
function printed_buttons(fixture) {
  return fixture.lines
    .filter((l) => l.type === 'button')
    .map((l) => `${l.accelerator}:${l.text}`);
}

// —— @COM_ABLE200-207（COMABLE.ERB:4650-4755） ——

test('@COM_ABLE200：观战券必备；自动调教与持续装备互斥；死斗场中不受装备表限制', async () => {
  const { fixture, com_able_family } = seed_colosseum_world();

  assert.equal(await com_able_family.call(200), 1, '持券且无装备 → 放行');

  fixture.store.set('item:35', 0); // :4686-4687 无观战券
  assert.equal(await com_able_family.call(200), 0, '无观战券不可');
  fixture.store.set('item:35', 3);

  fixture.store.set('tflag:224', 555); // :4654-4655 自动不可（调教菜单实行中）
  assert.equal(await com_able_family.call(200), 0);
  fixture.store.set('tflag:224', 0);

  // :4657-4659 未在死斗场时，任何持续装备使用中不可开启
  fixture.store.set('tequip:31:44', 1); // 绳子紧缚
  assert.equal(await com_able_family.call(200), 0);
  // 已在死斗场（TEQUIP:55 = 1）时装备表跳过，但互斥位照判（:4661-4684）
  fixture.store.set('tequip:31:55', 1);
  assert.equal(await com_able_family.call(200), 1);
  fixture.store.set('tequip:31:90', 1); // 触手调教中（:4677-4678）
  assert.equal(await com_able_family.call(200), 0, '死斗场中与触手互斥');
});

test('@COM_ABLE201：死斗场中且助手亲自出战才有', async () => {
  const { fixture, era_flag, com_able_family } = seed_colosseum_world({
    assi: true,
  });
  assert.equal(await com_able_family.call(201), 0, '不在死斗场');

  fixture.store.set('tequip:31:55', 1);
  assert.equal(
    await com_able_family.call(201),
    0,
    '主人调教（PLAYER != ASSI）',
  );

  era_flag.assiplay = 1;
  era_flag.player = 32;
  assert.equal(await com_able_family.call(201), 1, ':4697 RETURN 1');
});

// 202-207 的等级门槛（:4699-4755）：门槛读调教者的 CFLAG:9（PLAYER 侧）
for (const [com, min_level] of [
  [202, 0],
  [203, 20],
  [204, 40],
  [205, 60],
  [206, 80],
  [207, 100],
]) {
  test(`@COM_ABLE${com}：死斗场守卫 + 调教者等级门槛（≥ ${min_level}）+ 助手调教不可`, async () => {
    const { fixture, era_flag, com_able_family } = seed_colosseum_world();
    assert.equal(await com_able_family.call(com), 0, '不在死斗场');

    fixture.store.set('tequip:31:55', 1);
    fixture.store.set('cflag:0:9', min_level); // PLAYER = 0（主人）
    assert.equal(
      await com_able_family.call(com),
      1,
      `等级恰在门槛（${min_level}）→ 放行`,
    );

    fixture.store.set('cflag:0:9', min_level - 1);
    assert.equal(await com_able_family.call(com), 0, '门槛之下 → 拒绝');

    fixture.store.set('cflag:0:9', min_level);
    era_flag.assiplay = 1; // :4712 等 助手じゃ駄目
    assert.equal(await com_able_family.call(com), 0);
  });
}

test('#214 撞号消解：COM207 不可用时限输入 100（其紧凑序号）恒落 @USERCOM', async () => {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.assi = -1;
  fixture.era.beginTrain(0, 31);
  fixture.load_module('system/train/com-colosseum');
  fixture.load_module('page/page-usercom');
  const { on } = fixture.load_module('system/event/registry');
  const usercom_probe = [];
  on('USERCOM', async (result) => {
    usercom_probe.push(result);
  });
  const { com_index } = fixture.load_module('system/train/com-index');

  // 207 的紧凑序号恰是 100（可直选空间的末位），与 [100] 能力表示撞号。
  // 调教者等级抬到门槛（≥100）以隔离等级判定——不在死斗场时只剩
  // @COM_ABLE207 的死斗场守卫拦它：100 不进 usable → @USERCOM
  fixture.store.set('cflag:0:9', 100);
  assert.equal(com_index(207), 100);
  fixture.set_inputs(100, 999);
  const { run_train } = fixture.load_module('system/train/train-loop');
  assert.equal(await run_train(), 'AFTERTRAIN');

  assert.deepEqual(usercom_probe, [100, 999], '100 必须落 @USERCOM');
  assert.ok(
    !fixture.text_lines().some((l) => l.includes('媚药史莱姆')),
    'COM207 不得被 100 触发',
  );
});

test('怪物败北线是严格小于：战斗点恰等于败北线判胜（202 @ level 10）', async () => {
  const { fixture, era_flag, com_family } = seed_colosseum_world();
  fixture.store.set('tequip:31:55', 1);
  fixture.store.set('base:31:1', 1000);
  slave_base_combat(fixture, 5, 5); // 点 10 == 1 × level(10)
  era_flag.selectcom = 202;

  assert.equal(await com_family.call(202), 1);
  assert.ok(
    fixture
      .text_lines()
      .includes(
        '温妮蹂躏着最下层居民，打得他们满地打滚，这个已经不能被称为战斗了。',
      ),
    '点恰等（10 == 10）走胜利支——败北线是 RESULT < threshold',
  );
});

// —— @COM200（COMF200_コロシアム.ERB:8-37） ——

test('@COM200 进入：置 TEQUIP:55、清陷落旗标、按素质缩放的损耗与恐怖/逃离', async () => {
  const { fixture, era_flag, com_family } = seed_colosseum_world();
  era_flag.selectcom = 200;

  assert.equal(await com_family.call(200), 1);
  assert.equal(fixture.store.get('tequip:31:55'), 1);
  assert.equal(fixture.store.get('tflag:401'), 0);
  // A = 100：LOSEBASE:0 100 / LOSEBASE:1 200；UP:10 +2000；SOURCE:14 +500
  assert.equal(fixture.store.get('deltabase:31:0'), -100);
  assert.equal(fixture.store.get('deltabase:31:1'), -200);
  assert.equal(fixture.store.get('delta:31:10'), 2000, 'UP:10（恐怖）');
  assert.equal(fixture.store.get('source:31:14'), 500);
  assert.equal(fixture.store.get('item:35'), 3, '进入不扣券');
});

test('@COM200 进入的素质缩放：胆怯 ×2 / 感情淡薄 ×0.6（A = 100 → 120）', async () => {
  const { fixture, era_flag, com_family } = seed_colosseum_world();
  fixture.store.set('talent:31:10', 1); // 胆怯
  fixture.store.set('talent:31:22', 1); // 感情淡薄
  era_flag.selectcom = 200;

  await com_family.call(200);
  // 100 × 2.00 = 200 → × 0.60 = 120（TIMES 截断）
  assert.equal(fixture.store.get('deltabase:31:0'), -120);
  assert.equal(fixture.store.get('deltabase:31:1'), -240);
});

test('@COM200 退出：清 TEQUIP:55、扣一张观战券', async () => {
  const { fixture, era_flag, com_family } = seed_colosseum_world();
  fixture.store.set('tequip:31:55', 1);
  fixture.store.set('tflag:401', 1);
  era_flag.selectcom = 200;

  assert.equal(await com_family.call(200), 1);
  assert.equal(fixture.store.get('tequip:31:55'), 0);
  assert.equal(fixture.store.get('item:35'), 2, ':15 ITEM:35 -= 1');
  assert.equal(fixture.store.get('tflag:401'), 1, '退出支不动陷落旗标');
});

// —— TRAIN_MESSAGE 分支 ——

test('B 的 200 分支：退出支（带回房间）', async () => {
  const { fixture, era_flag } = seed_colosseum_world();
  fixture.store.set('tequip:31:55', 1);
  era_flag.selectcom = 200;
  const { train_message_b } = fixture.load_module('system/train/train-message');

  await train_message_b();
  assert.deepEqual(fixture.text_lines(), ['你把温妮带回了房间…']);
});

test('B 的 200 分支：进入支（気力尽的长句 + 三行省略 + 全裸示众）', async () => {
  const { fixture, era_flag } = seed_colosseum_world();
  era_flag.selectcom = 200;
  const { train_message_b } = fixture.load_module('system/train/train-message');

  await train_message_b();
  assert.deepEqual(
    fixture.text_lines(),
    [
      '全裸的温妮被带到了死斗场。温妮已经完全没有战斗的力气了…',
      '……………',
      '…………',
      '………',
      '温妮全裸地在死斗场中示众。',
      '被下流的笑容和好奇的视线所包围、温妮在异样的气氛中沉默不语。',
    ],
    '进入支的完整文本序列（服装前缀 + 长句 + 三行省略 + 全裸示众）',
  );
});

test('B 的 200 分支：服装前缀三档与気力有余的短句', async () => {
  // 位 64 + 类型 11（史莱姆）→ 特别服装前缀（#215 真身）
  const special = seed_colosseum_world();
  special.fixture.store.set('flag:37', 1);
  special.fixture.store.set('base:31:1', 500);
  special.era_flag.selectcom = 200;
  special.fixture.store.set('cflag:31:40', 64);
  special.fixture.store.set('cflag:31:42', 11);
  await special.fixture
    .load_module('system/train/train-message')
    .train_message_b();
  assert.equal(
    special.fixture.text_lines()[0],
    '史莱姆的模样、温妮被带到了死斗场…',
  );

  // 位 28（上装在身，类型 4）→ 基本服装前缀
  const main2 = seed_colosseum_world();
  main2.fixture.store.set('base:31:1', 500);
  main2.era_flag.selectcom = 200;
  main2.fixture.store.set('cflag:31:40', 28);
  main2.fixture.store.set('cflag:31:41', 4);
  await main2.fixture
    .load_module('system/train/train-message')
    .train_message_b();
  assert.equal(
    main2.fixture.text_lines()[0],
    '皮甲＆裙甲的模样、温妮被带到了死斗场…',
  );

  // 仅内衣位（位 64/28 之外的非零）→ 下着
  const underwear = seed_colosseum_world();
  underwear.fixture.store.set('base:31:1', 500);
  underwear.era_flag.selectcom = 200;
  underwear.fixture.store.set('cflag:31:40', 3);
  await underwear.fixture
    .load_module('system/train/train-message')
    .train_message_b();
  assert.equal(
    underwear.fixture.text_lines()[0],
    '下着的模样、温妮被带到了死斗场…',
  );
});

test('B/A 对 201-207 注册显式无操作：源侧无分支，不得出占位行', async () => {
  const { fixture, era_flag } = seed_colosseum_world();
  const { train_message_a, train_message_b } = fixture.load_module(
    'system/train/train-message',
  );

  for (let com = 201; com <= 207; com += 1) {
    era_flag.selectcom = com;
    await train_message_b();
    await train_message_a();
    const texts = fixture.text_lines();
    assert.deepEqual(
      texts.slice(texts.length - 2),
      [],
      `SELECTCOM = ${com} 两张表的输出都应为空（无占位行）`,
    );
  }
  // 对照：未落地的族（SELECTCOM = 30）仍出占位行——无操作只对本族生效
  era_flag.selectcom = 30;
  await train_message_b();
  assert.ok(
    fixture.text_lines().some((l) => l.includes('占位')),
    '别族缺失分支照旧落占位行',
  );
});

test('A 公共头的 TFLAG:15 死斗场两臂（SELECTCOM 21/27/31 的灌精文本）', async () => {
  const { fixture, era_flag } = seed_colosseum_world();
  fixture.store.set('tequip:31:55', 1);
  const { train_message_a } = fixture.load_module('system/train/train-message');
  fixture.store.set('tflag:15', 1);
  era_flag.selectcom = 21;
  await train_message_a();
  assert.ok(
    fixture.text_lines().includes('温妮的私处里、被灌入了怪物黏黏糊糊的精液…'),
    ':127-133 的死斗场 ==1 臂（A 分发占位行照出，两不相干）',
  );

  fixture.store.set('tflag:15', 2);
  era_flag.selectcom = 31;
  await train_message_a();
  assert.ok(
    fixture.text_lines().includes('温妮的嘴里、被怪物大量的粘稠精液灌满了…'),
    ':135-141 的死斗场 ==2 臂',
  );

  // 三支之外的 SELECTCOM 无输出；不在死斗场（触手臂随 J17）同样无输出。
  // A 分发段的占位行随 SELECTCOM 逐条出现，与此处无关——只数两臂的文本
  const arm_texts = () =>
    fixture
      .text_lines()
      .filter((l) => l.includes('被灌入了怪物') || l.includes('粘稠精液灌满'))
      .length;
  assert.equal(arm_texts(), 2, '前两次分发的两臂文本');
  fixture.store.set('tflag:15', 1);
  era_flag.selectcom = 206;
  await train_message_a();
  assert.equal(arm_texts(), 2, 'SELECTCOM 206 无新增（三支之外）');
  assert.ok(
    !fixture.text_lines().some((l) => l.includes('触手、吐出了体液')),
    '非死斗场的触手臂随 J17，当前不得出现',
  );
});

// —— @COM201（COMF201_助手.ERB） ——

test('@COM201：非助手亲自出战直接 RETURN 0', async () => {
  const { fixture, era_flag, com_family } = seed_colosseum_world();
  fixture.store.set('tequip:31:55', 1);
  era_flag.selectcom = 201;
  assert.equal(await com_family.call(201), 0, ':10-11 双保险');
});

test('@COM201 压制支：追加伤害与武器打掉文本；当前気力仍有余 → 胜利收场', async () => {
  const { fixture, era_flag, com_family } = seed_colosseum_world({
    assi: true,
  });
  fixture.store.set('tequip:31:55', 1);
  // 奴隶点 1（基础攻防 0、気力 500 → 下限）；助手 200（基础攻防 100×100、気力满）
  fixture.store.set('maxbase:32:1', 1000);
  fixture.store.set('base:32:1', 1000);
  fixture.store.set('cflag:32:13', 100);
  fixture.store.set('cflag:32:14', 100);
  fixture.store.set('base:31:1', 500); // 気力有余 → 追加伤害支
  era_flag.assiplay = 1;
  era_flag.player = 32;
  era_flag.selectcom = 201;

  assert.equal(
    await com_family.call(201),
    1,
    'COM_AFTER_ARENA 胜利 → RETURN 1',
  );
  assert.equal(fixture.store.get('exp:31:76'), 1, '斗技胜利经验 +1');
  assert.equal(fixture.store.get('tflag:400'), 201);
  // 开战 200/2000 + 追加 200/1000 → lose = 400/3000
  assert.equal(fixture.store.get('deltabase:31:0'), -400);
  assert.equal(fixture.store.get('deltabase:31:1'), -3000);
  // 気力 500 < 3000 → 武器被打掉 + ＜奴隶陷落＞
  assert.ok(fixture.text_lines().includes('温妮完全无法抵挡助手32的攻击！'));
  assert.ok(fixture.text_lines().includes('＜奴隶陷落＞'));
  // 菜单不可达（胜利收场）：无凌辱菜单头
  assert.ok(!fixture.text_lines().includes('对哪里进行凌辱？'));
});

test('@COM201 反击支：奴隶战斗点不低 → 直接扣助手体力气力（门面）', async () => {
  const { fixture, era_flag, com_family } = seed_colosseum_world({
    assi: true,
  });
  fixture.store.set('tequip:31:55', 1);
  fixture.store.set('base:31:1', 0); // 奴隶気力 0（com_after_arena 走陷落）
  slave_base_combat(fixture, 100, 100); // 奴隶基础攻防 100，但気力 0 → 点 1
  // 助手基础攻防 0 → 点 1；slave(1) < assi(1) 不成立 → 反击支
  fixture.store.set('maxbase:32:1', 1000);
  fixture.store.set('base:32:1', 1000);
  fixture.store.set('base:32:0', 500);
  era_flag.assiplay = 1;
  era_flag.player = 32;
  era_flag.selectcom = 201;
  fixture.set_inputs(999); // 陷落 → 菜单 → 暂时放过

  assert.equal(await com_family.call(201), 0, ':105-107 暂时放过 RETURN 0');
  // 反击：BASE:ASSI:0 -= 1 / BASE:ASSI:1 -= 10（跨域写经 chara(32).dungeon）
  assert.equal(fixture.store.get('base:32:0'), 499);
  assert.equal(fixture.store.get('base:32:1'), 990);
  assert.ok(fixture.text_lines().includes('温妮对助手32进行了反击。'));
  assert.ok(
    fixture.text_lines().includes('你叫助手32退下了……'),
    'NAME:MASTER + SAVESTR:ASSI',
  );
});

test('@COM201 助手退却：気力 < 上限 1/5 → 助手让位、跳过凌辱菜单', async () => {
  const { fixture, era_flag, com_family } = seed_colosseum_world({
    assi: true,
  });
  fixture.store.set('tequip:31:55', 1);
  fixture.store.set('base:31:1', 0); // 陷落
  fixture.store.set('maxbase:32:1', 1000);
  fixture.store.set('base:32:1', 180); // 180 < 1000/5 = 200 → 退却（/6=166 则不退）
  fixture.store.set('cflag:32:13', 100);
  fixture.store.set('cflag:32:14', 100);
  era_flag.assiplay = 1;
  era_flag.player = 32;
  era_flag.selectcom = 201;
  fixture.set_inputs(999); // 退却不发生时会落菜单：放过退出（RETURN 0 ≠ 1 即红）

  assert.equal(
    await com_family.call(201),
    1,
    ':56-57 退则 → 暂时放过（RETURN 1）',
  );
  assert.equal(era_flag.assiplay, 0, ':87 ASSIPLAY = 0');
  assert.equal(era_flag.player, 0, ':88 PLAYER = MASTER');
  assert.ok(
    fixture.text_lines().includes('＜助手退却＞'),
    '气力 < 上限 1/5 才退却（180 < 1000/5）',
  );
  assert.ok(!fixture.text_lines().includes('对哪里进行凌辱？'));
});

test('@COM201 凌辱菜单：选项按调教者条件显示；胸爱抚支不查実行可否、收入照加', async () => {
  const { fixture, era_flag, com_family } = seed_colosseum_world({
    assi: true,
  });
  fixture.store.set('tequip:31:55', 1);
  fixture.store.set('base:31:1', 0);
  fixture.store.set('maxbase:32:1', 1000);
  fixture.store.set('base:32:1', 1000);
  fixture.store.set('cflag:32:13', 100);
  fixture.store.set('cflag:32:14', 100);
  era_flag.assiplay = 1;
  era_flag.player = 32;
  era_flag.selectcom = 201;

  // 女助手无假阳具：[0]/[2]/[3] 不显示（TALENT:ASSI:121/122 与 ITEM:PBAND 皆无）
  fixture.set_inputs(1); // 胸爱抚（无条件项）
  assert.equal(await com_family.call(201), 1, ':83-88 无結果検査 → RETURN 1');
  const buttons = printed_buttons(fixture);
  assert.ok(buttons.includes('1:胸部'));
  assert.ok(!buttons.includes('0:嘴巴'), '无插入手段不显示嘴巴');
  assert.ok(!buttons.includes('2:私处'));
  assert.ok(!buttons.includes('3:肛门'));
  // 收入：LOSEBASE:0（开战 200；気力 0 支无追加）× 5 + rand(0)（whenMissing
  // 的 RESULT = 0 → RAND:0 恒 0）→ 1000
  assert.equal(
    fixture.store.get('tflag:402'),
    200 * 5,
    '收入 = LOSEBASE:0 × 5 + RAND:RESULT',
  );

  // 男人助手（TALENT:ASSI:122）→ 全项显示；口交子指令失败（假身 0）→ RETURN 0
  fixture.store.set('talent:32:122', 1);
  com_family.register(31, async () => 0);
  fixture.reset_inputs(0);
  const r = await com_family.call(201);
  assert.equal(r, 0, ':79-80 口交実行不可 → RETURN 0');
  assert.ok(fixture.text_lines().includes('＜助手・口交＞'));
  assert.ok(printed_buttons(fixture).includes('0:嘴巴'));
});

test('@COM201 假阳具持有者（ITEM:PBAND == 1）可插入；收入吃 rand', async () => {
  const { fixture, era_flag, com_family } = seed_colosseum_world({
    assi: true,
  });
  fixture.store.set('tequip:31:55', 1);
  fixture.store.set('base:31:1', 0);
  fixture.store.set('maxbase:32:1', 1000);
  fixture.store.set('base:32:1', 1000);
  fixture.store.set('cflag:32:13', 100);
  fixture.store.set('cflag:32:14', 100);
  fixture.store.set('item:4', 1); // ITEM:PBAND（假阳具）
  era_flag.assiplay = 1;
  era_flag.player = 32;
  era_flag.selectcom = 201;

  com_family.register(27, async () => {
    fixture.era.add('deltabase:31:0', -3); // 肛交子指令追加损耗
    return 1;
  });
  const rand_calls = [];
  fixture.reset_inputs(3);
  assert.equal(
    await com_family.call(201, {
      args: [
        (n) => {
          rand_calls.push(n);
          return 0;
        },
      ],
    }),
    1,
  );
  assert.equal(fixture.store.get('tequip:31:55'), 1, '凌辱不退出死斗场');
  // 收入 = lose0(200 + 3) × 5 + rand(1)；RAND:1 恒 0
  assert.deepEqual(rand_calls, [1], 'RAND:RESULT 以子指令返回值为上界');
  assert.equal(fixture.store.get('tflag:402'), 203 * 5);
  assert.ok(fixture.text_lines().includes('＜助手・背后位肛交＞'));
});

// —— @COM202-206：五体怪物的同构主体 ——

/** 五体的源侧真值（COMF202-206 逐文件手抄；level = 10） */
const MONSTER_TRUTH = {
  202: {
    label: '最下层居民',
    open: [5, 100],
    open_weak: [5, 100], // 202 不按等级缩放，无 /=4
    threshold: 10,
    extra: [10, 200],
    income_mult: 1,
    lose_text:
      '连地下城中最低等最卑微的种族都打不过，手足无措的温妮被无情地嘲笑着。',
    win_text:
      '温妮蹂躏着最下层居民，打得他们满地打滚，这个已经不能被称为战斗了。',
  },
  203: {
    label: '霉菌犬',
    open: [10, 200],
    open_weak: [2, 200], // 10 / 4 = 2
    threshold: 20,
    extra: [10, 10],
    income_mult: 2,
    lose_text: '温妮吸入了霉菌犬的有毒吐息。',
    win_text: '温妮闭气躲过霉菌犬的有毒气息，拼命逃跑着。',
  },
  204: {
    label: '兽人',
    open: [20, 150],
    open_weak: [5, 150],
    threshold: 30,
    extra: [20, 20],
    income_mult: 3,
    lose_text: '温妮苦战着兽人的精锐。',
    win_text: '温妮一边躲闪，一边思考如何反击兽人。',
  },
  205: {
    label: '腐烂猪',
    open: [25, 200], // 10 × 25 / 10 = 25
    open_weak: [6, 200], // 25 / 4 = 6
    threshold: 40,
    extra: [20, 20],
    income_mult: 4,
    lose_text: '腐烂猪用腐败液体淋透了温妮全身！',
    win_text: '温妮向腐烂猪发动突击，才终于勉强打平。',
  },
  206: {
    label: '巨魔',
    open: [30, 200],
    open_weak: [7, 200],
    threshold: 50,
    extra: [20, 20],
    income_mult: 5,
    lose_text: '温妮受到了巨魔猛烈的一击，直接被撞飞好远。',
    win_text: '温妮倾尽全力避开巨魔的一击。',
  },
};

for (const [com, truth] of Object.entries(MONSTER_TRUTH)) {
  const n = Number(com);

  test(`@COM${n}（${truth.label}）：胜利支（战斗点 ≥ ${truth.threshold}）的開戦損耗与文本`, async () => {
    const { fixture, era_flag, com_family } = seed_colosseum_world();
    fixture.store.set('tequip:31:55', 1);
    fixture.store.set('base:31:1', 1000); // 気力满 → 点 = 攻防合计
    slave_base_combat(fixture, 100, 100); // 点 200 ≥ threshold（level 10）
    era_flag.selectcom = n;

    assert.equal(await com_family.call(n), 1, '胜利即收场（无菜单）');
    assert.equal(fixture.store.get('exp:31:76'), 1);
    assert.equal(fixture.store.get('tflag:400'), n);
    assert.equal(fixture.store.get('deltabase:31:0'), -truth.open[0]);
    assert.equal(fixture.store.get('deltabase:31:1'), -truth.open[1]);
    assert.ok(fixture.text_lines().includes(truth.win_text));
    assert.ok(!fixture.text_lines().includes('对哪里进行凌辱？'));
  });

  test(`@COM${n}（${truth.label}）：気力有余的败北支（追加 [${truth.extra}] 与倒地）`, async () => {
    const { fixture, era_flag, com_family } = seed_colosseum_world();
    fixture.store.set('tequip:31:55', 1);
    fixture.store.set('base:31:1', 1); // 気力 1（> 0 且 < 累计损耗）
    era_flag.selectcom = n; // 基础攻防 0 → 点 1（下限）< threshold

    // 奴隶気力 1 > 0 → COM_AFTER_ARENA 判「胜利」（RETURN 1 收场），但
    // 战斗文本已走败北支（追加伤害 + 倒地 + 陷落行）
    assert.equal(await com_family.call(n), 1);
    assert.equal(
      fixture.store.get('deltabase:31:0'),
      -(truth.open[0] + truth.extra[0]),
    );
    assert.equal(
      fixture.store.get('deltabase:31:1'),
      -(truth.open[1] + truth.extra[1]),
    );
    assert.ok(fixture.text_lines().includes(truth.lose_text));
    assert.ok(fixture.text_lines().includes('＜奴隶陷落＞'));
  });

  test(`@COM${n}（${truth.label}）：体力枯竭的 /=4 折减（LOSEBASE:0 ${truth.open[0]} → ${truth.open_weak[0]}）`, async () => {
    const { fixture, era_flag, com_family } = seed_colosseum_world();
    fixture.store.set('tequip:31:55', 1);
    fixture.store.set('base:31:0', 0); // 体力枯竭 → weak
    fixture.store.set('base:31:1', 1000); // 気力满 + 攻防充足 → 胜利支（不落菜单）
    slave_base_combat(fixture, 100, 100);
    era_flag.selectcom = n;

    await com_family.call(n);
    assert.equal(fixture.store.get('deltabase:31:0'), -truth.open_weak[0]);
    assert.equal(fixture.store.get('deltabase:31:1'), -truth.open_weak[1]);
  });

  test(`@COM${n}（${truth.label}）：凌辱的死亡斗场收入 × ${truth.income_mult}`, async () => {
    const { fixture, era_flag, com_family } = seed_colosseum_world();
    fixture.store.set('tequip:31:55', 1);
    // base:1 = 0 → 陷落 → 菜单；気力 0 支无追加伤害（lose = open）
    era_flag.selectcom = n;
    com_family.register(31, async () => 1);
    fixture.reset_inputs(0);

    assert.equal(await com_family.call(n), 1);
    assert.equal(
      fixture.store.get('tflag:402'),
      truth.open[0] * truth.income_mult,
      ':71 收入 = LOSEBASE:0 × 倍率 + RAND:RESULT(=0)',
    );
    assert.ok(fixture.text_lines().includes(`＜${truth.label}・口交＞`));
  });
}

test('@COM202 失神中（TFLAG:899）：战斗点再高也走败北支且无追加伤害', async () => {
  const { fixture, era_flag, com_family } = seed_colosseum_world();
  fixture.store.set('tequip:31:55', 1);
  fixture.store.set('tflag:899', 2);
  slave_base_combat(fixture, 100, 100); // 点 200 ≥ 10 仍败北
  fixture.store.set('base:31:1', 1000);
  era_flag.selectcom = 202;

  assert.equal(await com_family.call(202), 1);
  assert.ok(
    fixture.text_lines().includes('温妮无法抵抗，被嘲笑了。'),
    ':32-34 失神/気力 0 支的文本',
  );
  assert.equal(fixture.store.get('deltabase:31:0'), -5, '无追加伤害');
});

test('@COM202 999 暂时放过 → RETURN 0；@COM206 缺 RETURN 0 → RETURN 1（#14 第七批）', async () => {
  const first = seed_colosseum_world();
  first.fixture.store.set('tequip:31:55', 1);
  first.era_flag.selectcom = 202;
  first.fixture.set_inputs(999);
  assert.equal(await first.com_family.call(202), 0, ':98-99 RETURN 0');
  assert.ok(first.fixture.text_lines().includes('你让最下层居民退下了……'));

  const sixth = seed_colosseum_world();
  sixth.fixture.store.set('tequip:31:55', 1);
  sixth.era_flag.selectcom = 206;
  sixth.fixture.set_inputs(999);
  assert.equal(
    await sixth.com_family.call(206),
    1,
    '999 后照走射精检查并 RETURN 1（源缺 RETURN 0，1:1）',
  );
  // SELECTCOM 仍是 206 → 射精量 B 归零、TFLAG:15 = 0（E = 0 档）
  assert.equal(sixth.era_flag.selectcom, 206);
  assert.equal(sixth.fixture.store.get('tflag:15'), 0);
});

test('@COM204 的陷落行是 PRINTL（无等待）——其余四体 PRINTW', async () => {
  // 可观测面：fixture.waits 逐次记录 waitAnyKey；204 的败北倒地段比 202
  // 少一次等待（＜奴隶陷落＞行不等键）
  const run = async (com) => {
    const world = seed_colosseum_world();
    world.fixture.store.set('tequip:31:55', 1);
    world.fixture.store.set('base:31:1', 1); // 败北 + 倒地支
    world.era_flag.selectcom = com;
    await world.com_family.call(com);
    return world.fixture.waits.filter((w) => w.waited).length;
  };
  const waits_202 = await run(202);
  const waits_204 = await run(204);
  assert.ok(waits_202 > 0, '202 的战斗文本有等待（PRINTW 系）');
  assert.equal(waits_204, waits_202 - 1, ':35 PRINTL ＜奴隶陷落＞ 不等键');
});

test('@COM206 拡張経験：背后位/肛交的初回异常经验与扩张经验（门面写）', async () => {
  const { fixture, era_flag, com_family } = seed_colosseum_world();
  fixture.store.set('tequip:31:55', 1);
  era_flag.selectcom = 206;
  com_family.register(21, async () => 1);
  com_family.register(27, async () => 1);
  fixture.set_inputs(2, 3); // 先背后位、再肛交（两次指令）

  assert.equal(await com_family.call(206), 1);
  assert.equal(await com_family.call(206), 1);
  // 第一次（SELECTCOM 21）：异常 +1（EXP:52 初回）+ 私处扩张 +1
  // 第二次（SELECTCOM 27）：异常 +1（EXP:53 初回）+ 肛门扩张 +1
  assert.equal(
    fixture.store.get('exp:31:50'),
    2,
    '初回异常经验各 +1（52/53 首次时）',
  );
  assert.equal(fixture.store.get('exp:31:52'), 1);
  assert.equal(fixture.store.get('exp:31:53'), 1);
  const texts = fixture.text_lines();
  assert.equal(
    texts.filter((l) => l === '异常经验＋１').length,
    2,
    '异常经验＋１ 恰两行',
  );
  assert.ok(texts.includes('私处扩张经验＋1'));
  assert.ok(texts.includes('肛门扩张经验＋1'));
});

// —— 射精チェック + 汚れ（COM202-206 共用段） ——

test('射精量分档：技巧/顺从/欲情/体位倍率逐档相乘（SELECTCOM 27）', async () => {
  const { fixture, era_flag, com_family } = seed_colosseum_world();
  fixture.store.set('tequip:31:55', 1);
  fixture.store.set('abl:31:12', 2); // 技巧 2 → 1600
  fixture.store.set('abl:31:10', 3); // 顺从 3 → ×1.00
  fixture.store.set('palam:31:5', 550); // 欲情 ≥ LV2 < LV3 → ×1.2
  fixture.store.set('maxbase:0:4', 10000);
  era_flag.selectcom = 202;
  com_family.register(27, async () => 1); // 肛交 ×1.5
  fixture.set_inputs(3);

  await com_family.call(202);
  // 1600 × 1.00 × 1.2 × 1.5 = 2880 → 怪物射精槽
  assert.equal(
    fixture.store.get('base:0:4'),
    2880,
    '射精量 = 技巧档 × 顺从 × 欲情 × 体位（1600×1.00×1.2×1.5）',
  );
  assert.equal(fixture.store.get('tflag:15'), 0, '2880 < 10000 → E = 0');
});

test('通常射精（E = 1）：精液经验 +1、槽扣减、射精旗标与污垢', async () => {
  const { fixture, era_flag, com_family } = seed_colosseum_world();
  fixture.store.set('tequip:31:55', 1);
  fixture.store.set('abl:31:12', 0); // 450
  fixture.store.set('abl:31:10', 0); // ×0.30 → 135
  fixture.store.set('palam:31:5', 0); // ×1.00
  fixture.store.set('maxbase:0:4', 1000);
  fixture.store.set('base:0:4', 900);
  fixture.store.set('source:31:4', 100);
  fixture.store.set('source:31:5', 100);
  fixture.store.set('source:31:13', 100);
  fixture.store.set('abl:31:32', 1); // 精液中毒 1：SOURCE:7 = 200、×2.5/×1.6
  era_flag.selectcom = 202;
  com_family.register(31, async () => 1);
  fixture.set_inputs(0);

  await com_family.call(202);
  assert.equal(fixture.store.get('exp:31:20'), 1, 'EXP:20 +1（门面）');
  // 900 + 135×1.2(口交) = 1062 → E=1 → -= 1000 → 62（< 1000 不钳制）
  assert.equal(fixture.store.get('base:0:4'), 62);
  assert.equal(fixture.store.get('tflag:0'), 1, ':255-256 口交射精');
  assert.equal(fixture.store.get('tflag:15'), 1);
  // SOURCE 修正：4 ×3、7 = 200、5 ×2.5、13 ×1.6
  assert.equal(fixture.store.get('source:31:4'), 300);
  assert.equal(fixture.store.get('source:31:7'), 200);
  assert.equal(fixture.store.get('source:31:5'), 250);
  assert.equal(fixture.store.get('source:31:13'), 160);
  // 汚れ：口（STAIN:0）|= 2 | 4
  assert.equal(fixture.store.get('stain:31:0'), 6, '口位 STAIN:0 |= 2 | 4');
  assert.equal(
    fixture.store.get('stain:31:1'),
    undefined,
    '手 untouched（30 才写）',
  );
  assert.ok(fixture.text_lines().includes('怪物射精'));
  assert.ok(fixture.text_lines().includes('精液经验＋1'));
});

test('大量射精（E = 2）：×2 扣减后的钳制与三旗标', async () => {
  const { fixture, era_flag, com_family } = seed_colosseum_world();
  fixture.store.set('tequip:31:55', 1);
  fixture.store.set('maxbase:0:4', 1000);
  fixture.store.set('base:0:4', 2500); // 2500 + b > 2000 → E = 2
  fixture.store.set('abl:31:12', 5); // 3200
  fixture.store.set('abl:31:10', 5); // ×1.3
  fixture.store.set('palam:31:5', 99999); // ×1.5
  era_flag.selectcom = 202;
  com_family.register(21, async () => 1); // 背后位 ×1.00
  fixture.set_inputs(2);

  await com_family.call(202);
  // 3200 × 1.3 × 1.5 = 6240 → 2500 + 6240 = 8740 > 2000 → E = 2
  assert.equal(fixture.store.get('exp:31:20'), 3);
  // 8740 - 2000 = 6740 ≥ 1000 → 钳制到 999
  assert.equal(
    fixture.store.get('base:0:4'),
    999,
    '扣减后仍 ≥ EJAC → 钳制到 EJAC-1',
  );
  assert.equal(fixture.store.get('tflag:38'), 2, ':238-239 私处内射精（怪物）');
  assert.equal(fixture.store.get('tflag:2'), 2, ':242-243 性行为射精');
  assert.equal(fixture.store.get('tflag:15'), 2);
  assert.equal(fixture.store.get('stain:31:3'), 6, '私处 |= 2 | 4');
  assert.ok(fixture.text_lines().includes('怪物大量射精'));
  assert.ok(fixture.text_lines().includes('精液经验＋３'));
});

test('MAXBASE:MASTER:4 == 0（无射精槽）→ 射精检查整段跳过', async () => {
  const { fixture, era_flag, com_family } = seed_colosseum_world();
  fixture.store.set('tequip:31:55', 1);
  fixture.store.set('maxbase:0:4', 0);
  era_flag.selectcom = 202;
  com_family.register(31, async () => 1);
  fixture.set_inputs(0);

  assert.equal(await com_family.call(202), 1);
  assert.equal(
    fixture.store.get('tflag:15'),
    undefined,
    ':105-107 整段跳过（含 TFLAG:15）',
  );
  assert.equal(fixture.store.get('exp:31:20'), undefined);
});

// —— @COM207（COMF207_媚薬スライム.ERB） ——

test('@COM207：只削气力；败北支的两档文本与追加；胜利支', async () => {
  const { fixture, era_flag, com_family } = seed_colosseum_world();
  fixture.store.set('tequip:31:55', 1);
  fixture.store.set('base:31:1', 1); // 気力 1 > 0 → 追加支
  era_flag.selectcom = 207;
  fixture.set_inputs(999);

  assert.equal(await com_family.call(207), 1, ':72 空支 → RETURN 1');
  // 开战 100 + 败北追加 100（level 10 × 10）
  assert.equal(
    fixture.store.get('deltabase:31:0'),
    undefined,
    'LOSEBASE:0 无し（207 不写体力损耗）',
  );
  assert.equal(fixture.store.get('deltabase:31:1'), -200);
  assert.ok(
    fixture.text_lines().includes('温妮被媚药史莱姆包裹着，动弹不得。'),
  );
  assert.ok(
    fixture.text_lines().includes('然后，温妮被淹没在媚药史莱姆的体内了。'),
  );

  const win = seed_colosseum_world();
  win.fixture.store.set('tequip:31:55', 1);
  win.fixture.store.set('base:31:1', 1000);
  slave_base_combat(win.fixture, 100, 100); // 点 200 ≥ 50 → 胜利
  win.fixture.set_inputs(999);
  win.era_flag.selectcom = 207;
  assert.equal(await win.com_family.call(207), 1);
  assert.ok(
    win.fixture
      .text_lines()
      .includes('温妮躲过媚药史莱姆的包围，拼命地逃跑着。'),
  );
});

test('@COM207 无失神判定：TFLAG:899 不强制败北（与 202-206 的差异）', async () => {
  const { fixture, era_flag, com_family } = seed_colosseum_world();
  fixture.store.set('tequip:31:55', 1);
  fixture.store.set('tflag:899', 2);
  fixture.store.set('base:31:1', 1000);
  slave_base_combat(fixture, 100, 100); // 点 200 ≥ 50 → 胜利（899 被无视）
  era_flag.selectcom = 207;
  fixture.set_inputs(999);

  assert.equal(await com_family.call(207), 1);
  assert.ok(
    fixture.text_lines().includes('温妮躲过媚药史莱姆的包围，拼命地逃跑着。'),
  );
});

test('@COM207 三支 JUMP COM51：尾调用（SELECTCOM = 51、返回值透传）', async () => {
  const { fixture, era_flag, com_family } = seed_colosseum_world();
  fixture.store.set('tequip:31:55', 1);
  era_flag.selectcom = 207;
  com_family.register(51, async () => {
    fixture.era.print('（媚药灌入）');
    return 1;
  });

  fixture.reset_inputs(0);
  assert.equal(await com_family.call(207), 1, '嘴巴 → JUMP COM51 的返回值');
  assert.equal(era_flag.selectcom, 51);
  assert.ok(
    fixture.text_lines().includes('在倒下的温妮嘴里，灌入了大量的粘液。'),
  );
  assert.ok(fixture.text_lines().includes('（媚药灌入）'));

  fixture.reset_inputs(2);
  assert.equal(await com_family.call(207), 1, '肛门支同款');
  assert.ok(
    fixture.text_lines().includes('在倒下的温妮肛门里，灌入了大量的粘液。'),
  );
});

test('@COM207 私处支：男人目标 RETURN 0；按钮不显示', async () => {
  const { fixture, era_flag, com_family } = seed_colosseum_world();
  fixture.store.set('tequip:31:55', 1);
  fixture.store.set('talent:31:122', 1);
  era_flag.selectcom = 207;

  fixture.set_inputs(999);
  assert.equal(await com_family.call(207), 1, '菜单仍可达（999 空支）');
  const buttons = printed_buttons(fixture);
  assert.ok(
    !buttons.includes('1:私处'),
    ':53-54 男人不显示私处项（引擎层拒收代位 :65-66 的双保险）',
  );
  assert.ok(buttons.includes('0:嘴巴'));
});

// —— SHOW_EQUIP_2 的死斗场臂（page-train 就地实现，#230） ——

test('死斗场中的 SHOW_STATUS：装备行出 [死斗场决斗中]（粉色）、不再占位', async () => {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.assi = -1;
  fixture.era.beginTrain(0, 31);
  fixture.load_module('page/page-train');
  const { emit } = fixture.load_module('system/event/registry');

  await emit('SHOW_STATUS');
  const equip_line = fixture.lines.find(
    (l) => l.type === 'text' && l.text.includes('装备显示'),
  );
  assert.ok(equip_line, '未在死斗场时 SHOW_EQUIP_2 仍占位');

  fixture.store.set('tequip:31:55', 1);
  await emit('SHOW_STATUS');
  const arena = fixture.lines
    .filter((l) => l.type === 'text')
    .find((l) => l.text === '[死斗场决斗中]');
  assert.ok(arena, '死斗场中的装备行必须是 [死斗场决斗中]');
  assert.equal(
    arena.content[0].color,
    '#FF1493',
    ':1566 SETCOLOR 0xff1493（DeepPink）',
  );
});

// —— train-loop 的 RETURN 0 语义（本票落地） ——

test('RETURN 0 的指令：回合作废——不结算、不进 EVENTCOMEND、PREVCOM 不推进', async () => {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.assi = -1;
  fixture.era.beginTrain(0, 31);
  fixture.load_module('system/train/com-colosseum');
  fixture.load_module('page/page-usercom');
  const { on } = fixture.load_module('system/event/registry');
  const probe = [];
  on('SOURCE_CHECK', async () => {
    probe.push('SOURCE_CHECK');
  });
  on('EVENTCOMEND', async () => {
    probe.push('EVENTCOMEND');
  });
  const { com_index } = fixture.load_module('system/train/com-index');

  // COM202 的 999 → RETURN 0（引擎「実行に失敗した」：Process.SystemProc.cs
  // 的 endCallComXX 分支）
  fixture.store.set('tequip:31:55', 1);
  fixture.set_inputs(com_index(202), 999, 999);
  const { run_train } = fixture.load_module('system/train/train-loop');
  assert.equal(await run_train(), 'AFTERTRAIN');

  assert.ok(!probe.includes('SOURCE_CHECK'), '作废回合不得进 @SOURCE_CHECK');
  assert.ok(!probe.includes('EVENTCOMEND'), '作废回合不得进 @EVENTCOMEND');
  const prevcom_writes = fixture.var_writes
    .filter((w) => w.name === 'flag:10009')
    .map((w) => w.value);
  assert.deepEqual(
    prevcom_writes,
    [-1],
    'PREVCOM 不推进（引擎从不代写，原作在 SOURCE_CHECK:545 自更）',
  );
});

// —— @COM_AFTER_ARENA / @ARENA_*（J17 的接线前置，导出面） ——

test('导出面：arena_slave_point / arena_assi_point / com_after_arena 在场可调用', async () => {
  const { fixture } = seed_colosseum_world();
  const { arena_slave_point, arena_assi_point, com_after_arena } =
    fixture.load_module('system/train/com-colosseum');

  // WEAPON_RESTORE 重算后：基础攻防合计 × 気力比例；魔术加算 = 等级 ×2
  slave_base_combat(fixture, 30, 20);
  fixture.store.set('talent:31:241', 1);
  fixture.store.set('cflag:31:9', 7);
  fixture.store.set('base:31:1', 500);
  assert.equal(
    arena_slave_point(),
    Math.floor(((30 + 20 + 14) * 500) / 1000),
    '攻防 + 魔术加算后按気力比例折减',
  );

  fixture.store.set('talent:31:241', 0);
  assert.equal(arena_slave_point(), Math.floor((50 * 500) / 1000));

  fixture.era.set('base:31:1', 0);
  assert.equal(arena_slave_point(), 1, '下限 1');

  // com_after_arena：気力有余 → 胜利 0；枯竭 → 陷落 1
  fixture.era.set('base:31:1', 1);
  assert.equal(await com_after_arena(), 0, '気力有余（1 > 0）→ 胜利 0');
  fixture.era.set('base:31:1', 0);
  assert.equal(await com_after_arena(), 1);
  assert.equal(fixture.store.get('tflag:401'), 1);
  void arena_assi_point; // 导出面在场（COM201 的用例覆盖其行为）
});
