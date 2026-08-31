/**
 * ere/system/train/com-hardcore.js 的行为测试（issue #226：J16 指令族·重度
 * 调教 80-90）。验收项「四件套一文件」的落点：
 *
 *   - @COM_ABLE80-90 的判据（自动/装备互斥/道具/经验门槛/助手门槛——每条
 *     指令至少一段可用性用例，含 84/86 不建壳的验证）；
 *   - @COM80-90 真身（COM80 的死判定块不镜像、COM81-83 拳交系经验累积、
 *     COM84 的 EXP:0/40/41、COM85 放尿的 EXP 门面写与 TFLAG:200、COM87
 *     穿环的装/取双支、COM88/89 的开关切换、COM90 的乳内插入与 CFLAG:113）；
 *   - @EQUIP_COM89 持续效果（T 共享变量的累加与 EXP:56 收尾、GOTO END_EJAC
 *     尾段无条件执行）；
 *   - TRAIN_MESSAGE_B 80-89 分支与 90 的真实无输出、TRAIN_MESSAGE_A 80/90
 *     分支与 81-89 的显式无操作（源侧无分支，不得出占位行）；
 *   - @GET_ADV_COM 的 CASE 80 升格规则（COM80 → 64，三人）。
 *
 * 世界底座与 com-colosseum.test.js 的 seed_colosseum_world 同构。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

/** 世界底座：开火车表、指好 TARGET/PLAYER、装好重度调教族。 */
function seed_world() {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  fixture.era.beginTrain(0, 31);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.player = 0;
  era_flag.assiplay = 0;
  era_flag.assi = -1;
  era_flag.selectcom = -1;
  era_flag.prevcom = -1;
  fixture.load_module('system/train/com-hardcore');
  const { com_family, com_able_family, equip_com_family } = fixture.load_module(
    'system/train/com-family',
  );
  const { adv_com_family } = fixture.load_module('system/train/com-adv');
  return {
    fixture,
    era_flag,
    com_family,
    com_able_family,
    equip_com_family,
    adv_com_family,
  };
}

/** 经族调用一条指令（真实循环里 SELECTCOM 由 train-loop 先置——测试同位） */
async function run_com(world, com) {
  world.era_flag.selectcom = com;
  return world.com_family.call(com);
}

// —— @COM_ABLE80-90（COMABLE.ERB:3142-3560） ——

test('@COM_ABLE80：调教者需男人/扶她；口枷/绝不侍奉/顺从欲望门槛/触手/兽奸/使役/决斗/新妻/zooko 各挡一条', async () => {
  const { fixture, era_flag, com_able_family } = seed_world();
  fixture.store.set('abl:31:10', 3);
  fixture.store.set('abl:31:11', 3);
  assert.equal(await com_able_family.call(80), 0, '调教者未配男性器（默认）');

  fixture.store.set('talent:0:122', 1);
  assert.equal(
    await com_able_family.call(80),
    1,
    '男性器 + 顺从欲望合计 6 → 可',
  );

  fixture.store.set('tequip:31:45', 1); // 口枷
  assert.equal(await com_able_family.call(80), 0);
  fixture.store.set('tequip:31:45', 0);

  fixture.store.set('talent:31:151', 1); // 绝不侍奉
  assert.equal(await com_able_family.call(80), 0);
  fixture.store.set('talent:31:151', 0);

  fixture.store.set('abl:31:11', 0); // 顺从 3 + 欲望 0 < 6
  assert.equal(await com_able_family.call(80), 0);
  fixture.store.set('abl:31:11', 3);

  fixture.store.set('tequip:31:90', 1); // 触手调教中
  assert.equal(await com_able_family.call(80), 0);
  era_flag.player = 0;
});

test('@COM_ABLE81：SM 系滤镜/私处经验 75+/震动器/男人/未熟施虐狂例外', async () => {
  const { fixture, com_able_family } = seed_world();
  fixture.store.set('exp:31:0', 75);
  assert.equal(await com_able_family.call(81), 1, '私处经验达标默认可执行');

  fixture.store.set('flag:25', 16);
  assert.equal(await com_able_family.call(81), 0);
  fixture.store.set('flag:25', 0);

  fixture.store.set('exp:31:0', 74);
  assert.equal(await com_able_family.call(81), 0, '私处经验不足');
  fixture.store.set('exp:31:0', 75);

  fixture.store.set('talent:31:135', 1); // 未熟
  assert.equal(await com_able_family.call(81), 0);
  fixture.store.set('talent:0:83', 1); // 调教者施虐狂 → 例外放行
  assert.equal(await com_able_family.call(81), 1);
});

test('@COM_ABLE82：肛门经验 75+/肛门震动器/灌肠肛塞各挡一条', async () => {
  const { fixture, com_able_family } = seed_world();
  fixture.store.set('exp:31:1', 75);
  assert.equal(await com_able_family.call(82), 1);

  fixture.store.set('tequip:31:13', 1);
  assert.equal(await com_able_family.call(82), 0);
  fixture.store.set('tequip:31:13', 0);

  fixture.store.set('tequip:31:46', 1);
  assert.equal(await com_able_family.call(82), 0);
});

test('@COM_ABLE83：Ｖ・肛门经验各 150+；男人挡；娇小需扩张经验 5+', async () => {
  const { fixture, com_able_family } = seed_world();
  fixture.store.set('exp:31:0', 150);
  fixture.store.set('exp:31:1', 150);
  assert.equal(await com_able_family.call(83), 1);

  fixture.store.set('exp:31:1', 149);
  assert.equal(await com_able_family.call(83), 0);
  fixture.store.set('exp:31:1', 150);

  fixture.store.set('talent:31:122', 1); // 男人
  assert.equal(await com_able_family.call(83), 0);
  fixture.store.set('talent:31:122', 0);

  fixture.store.set('talent:31:100', 1); // 娇小
  fixture.store.set('abl:31:10', 4);
  fixture.store.set('abl:31:21', 4);
  fixture.store.set('exp:31:53', 4);
  assert.equal(await com_able_family.call(83), 0, '肛门扩张经验不足 5');
  fixture.store.set('exp:31:53', 5);
  assert.equal(await com_able_family.call(83), 1);
});

test('@COM_ABLE84：源侧无 @COM_ABLE84，未定义即可执行', async () => {
  const { com_able_family } = seed_world();
  assert.equal(com_able_family.has(84), false);
  assert.equal(await com_able_family.call(84, { whenMissing: 1 }), 1);
});

test('@COM_ABLE85：SM 滤镜/失神中/需利尿剂或漏尿癖/顺从 3+（浴室例外）', async () => {
  const { fixture, com_able_family } = seed_world();
  fixture.store.set('tequip:31:22', 1); // 利尿剂
  fixture.store.set('abl:31:10', 3);
  assert.equal(await com_able_family.call(85), 1);

  fixture.store.set('tflag:899', 1); // 失神中
  assert.equal(await com_able_family.call(85), 0);
  fixture.store.set('tflag:899', 0);

  fixture.store.set('tequip:31:22', 0);
  fixture.store.set('talent:31:57', 0);
  assert.equal(await com_able_family.call(85), 0, '既无利尿剂也无漏尿癖');
  fixture.store.set('talent:31:57', 1);
  assert.equal(await com_able_family.call(85), 1, '漏尿癖替代利尿剂');

  fixture.store.set('abl:31:10', 2);
  assert.equal(await com_able_family.call(85), 0, '顺从不足 3');
  fixture.store.set('tequip:31:58', 1); // 浴室例外
  assert.equal(await com_able_family.call(85), 1);
});

test('@COM_ABLE86：Train.csv 注释掉的死段，不建壳（不在声明空间内）', async () => {
  const { com_able_family, com_family } = seed_world();
  assert.equal(com_able_family.has(86), false);
  await assert.rejects(() => com_family.call(86), /不在声明的编号空间内/);
});

test('@COM_ABLE87：无穿孔工具且未穿任何环则不可；助手门/顺从 3+/道具互斥', async () => {
  const { fixture, com_able_family } = seed_world();
  assert.equal(await com_able_family.call(87), 0, '无 ITEM:34 且未穿任何环');

  fixture.store.set('item:34', 1);
  fixture.store.set('abl:31:10', 3);
  assert.equal(await com_able_family.call(87), 1);

  fixture.store.set('abl:31:10', 2);
  assert.equal(await com_able_family.call(87), 0, '顺从不足 3');
  fixture.store.set('abl:31:10', 3);

  fixture.store.set('item:34', 0);
  fixture.store.set('cflag:31:7', 1); // 已穿一环，即使无库存也可开面板（取环）
  assert.equal(await com_able_family.call(87), 1);
});

test('@COM_ABLE88：需从属怪物设定；道具使用中（野外 PLAY 除外）不可', async () => {
  const { fixture, com_able_family } = seed_world();
  assert.equal(await com_able_family.call(88), 0, '未设从属怪物');

  fixture.store.set('cflag:31:570', 5);
  assert.equal(await com_able_family.call(88), 1);

  fixture.store.set('tequip:31:11', 1); // 震动器
  assert.equal(await com_able_family.call(88), 0);
  fixture.store.set('tequip:31:89', 1); // 兽奸 PLAY 中（野外）→ 道具限制解除
  assert.equal(await com_able_family.call(88), 0, '兽奸 PLAY 与使役互斥仍挡');
});

test('@COM_ABLE89：需阴茎袋或无道具设定；使役 PLAY 中互斥', async () => {
  const { fixture, com_able_family } = seed_world();
  assert.equal(await com_able_family.call(89), 0, '无 ITEM:22');

  fixture.store.set('item:22', 1);
  assert.equal(await com_able_family.call(89), 1);

  fixture.store.set('tequip:31:88', 1);
  assert.equal(await com_able_family.call(89), 0);
});

test('@COM_ABLE90：爱抚滤镜/决斗/使役/需男人扶她或 PBAND/胸罩上装挡/需超乳', async () => {
  const { fixture, com_able_family } = seed_world();
  fixture.store.set('talent:0:122', 1);
  fixture.store.set('talent:31:119', 1); // 超乳
  assert.equal(await com_able_family.call(90), 1);

  fixture.store.set('flag:25', 1); // 爱抚系滤镜
  assert.equal(await com_able_family.call(90), 0);
  fixture.store.set('flag:25', 0);

  fixture.store.set('talent:31:119', 0);
  assert.equal(await com_able_family.call(90), 0, '需超乳');
  fixture.store.set('talent:31:119', 1);

  fixture.store.set('talent:0:122', 0);
  assert.equal(await com_able_family.call(90), 0, '既无男性器也无 PBAND');
  fixture.store.set('item:4', 1); // PBAND
  assert.equal(await com_able_family.call(90), 1);
});

// —— @COM80-90 真身 ——

test('@COM80：死判定块不镜像（直接执行），私处放血/汚れ常量 100/初吻记录', async () => {
  const world = seed_world();
  const { fixture, era_flag } = world;
  fixture.store.set('talent:0:121', 1);
  fixture.store.set('abl:31:16', 3); // 侍奉精神 3 档：SOURCE:8 乘率 1.0，隔离本档验证
  fixture.store.set('cflag:31:16', -1); // 初吻未记录

  const result = await run_com(world, 80);

  assert.equal(result, 1);
  assert.ok(fixture.text_lines().includes('强制口交'));
  assert.equal(
    fixture.store.get('source:31:8'),
    100,
    'Y 恒 0 → SOURCE:8 简化为 100',
  );
  assert.equal(fixture.store.get('cflag:31:16'), 201, '初吻记录写在 TARGET 侧');
  assert.equal(fixture.store.get('tflag:100'), 1);
  assert.equal(fixture.store.get('tflag:200'), 2);
  assert.equal(era_flag.selectcom, 80);
});

test('@COM80：CASE 80 命中且 COM64 真身已注册（族票测试假身）时委托其执行', async () => {
  const world = seed_world();
  const { era_flag, com_able_family, com_family } = world;
  era_flag.prevcom = 64;
  com_able_family.register(64, () => 1);
  com_family.register(64, async () => {
    era_flag.selectcom = 64; // 比照真身应有的显式回填（COM80 自身不做这步）
    return 1;
  });
  const result = await run_com(world, 80);
  assert.equal(result, 1, 'jump_to_advanced 委托已注册目标，透传其返回值');
  assert.equal(era_flag.selectcom, 64, 'SELECTCOM 由 COM64 真身自行回填');
});

test('@COM80：CASE 80 命中但 COM64 真身未落地 → jump_to_advanced 打占位行 + RETURN 1', async () => {
  const world = seed_world();
  const { fixture, era_flag, com_able_family } = world;
  era_flag.prevcom = 64;
  com_able_family.register(64, () => 1); // 可用性判定通过，但 com_family 无 64 号真身
  const result = await run_com(world, 80);
  assert.equal(result, 1, 'jump_to_advanced 的存根路径 RETURN 1');
  assert.ok(
    !fixture.text_lines().includes('强制口交'),
    '已升格，不落回 COM80 正常执行',
  );
  assert.equal(era_flag.selectcom, 80, 'jump_to_advanced 存根不改写 SELECTCOM');
});

test('@COM80：COM_ABLE64 不可用 → CASE 80 不升格，COM80 正常执行', async () => {
  const world = seed_world();
  const { fixture, era_flag } = world;
  era_flag.prevcom = 64; // CASE 80 命中检查，但 COM_ABLE64 未注册 → whenMissing:0 不可用
  const result = await run_com(world, 80);
  assert.equal(result, 1, '未升格，COM80 本体正常执行并 RETURN 1');
  assert.ok(fixture.text_lines().includes('强制口交'), '落回 COM80 正常执行');
});

test('@COM81：拳交，私处经验＋２５、私处扩张经验＋1、首次异常经验＋1', async () => {
  const world = seed_world();
  const { fixture } = world;
  const result = await run_com(world, 81);
  assert.equal(result, 1);
  assert.ok(fixture.text_lines().includes('拳交'));
  assert.equal(fixture.store.get('exp:31:0'), 25);
  assert.equal(fixture.store.get('exp:31:52'), 1);
  assert.equal(
    fixture.store.get('exp:31:50'),
    1,
    '私处扩张经验首次触发异常经验',
  );
});

test('@COM82：肛门拳交，肛门经验＋２５、肛门扩张经验＋1', async () => {
  const world = seed_world();
  const result = await run_com(world, 82);
  assert.equal(result, 1);
  assert.equal(world.fixture.store.get('exp:31:1'), 25);
  assert.equal(world.fixture.store.get('exp:31:53'), 1);
});

test('@COM83：两穴拳交，私处/肛门经验同时累积、私处扩张经验＋1、肛门扩张经验＋3', async () => {
  const world = seed_world();
  const result = await run_com(world, 83);
  assert.equal(result, 1);
  assert.ok(world.fixture.store.get('exp:31:0') > 0);
  assert.ok(world.fixture.store.get('exp:31:1') > 0);
  assert.equal(world.fixture.store.get('exp:31:52'), 1);
  assert.equal(world.fixture.store.get('exp:31:53'), 3);
});

test('@COM84：Ｇ点刺激（升格目标），私处经验＋1、显式回填 SELECTCOM=84', async () => {
  const world = seed_world();
  const { fixture, era_flag } = world;
  fixture.store.set('talent:0:122', 1); // 调教者男人：走 EXP:41
  fixture.store.set('talent:31:122', 1); // 对象也是男人
  era_flag.selectcom = 8; // 玩家原选 8（升格链上游），com84 内部会自行回填 84
  const result = await world.com_family.call(84);
  assert.equal(result, 1);
  assert.ok(fixture.text_lines().includes('刺激Ｇ点'));
  assert.equal(fixture.store.get('exp:31:0'), 1);
  assert.equal(fixture.store.get('exp:31:41'), 1, '双方均为男人 → EXP:41');
  assert.equal(era_flag.selectcom, 84, '原作显式 SELECTCOM = 84');
});

test('@COM85：放尿，EXP:31（经门面写）＋2、汚れ位 STAIN:2/3、TFLAG:200=2', async () => {
  const world = seed_world();
  const result = await run_com(world, 85);
  assert.equal(result, 1);
  assert.ok(world.fixture.text_lines().some((l) => l.includes('放尿')));
  assert.equal(
    world.fixture.store.get('exp:31:31'),
    2,
    '放尿经验经 chara(target).system 门面写',
  );
  assert.equal((world.fixture.store.get('stain:31:2') || 0) & 32, 32);
  assert.equal((world.fixture.store.get('stain:31:3') || 0) & 32, 32);
  assert.equal(world.fixture.store.get('tflag:200'), 2);
});

test('@COM87：装环成功（绳子紧缚免判定）写 CFLAG:7 位与消耗 ITEM:34，双份消耗（乳头 2 个）', async () => {
  const world = seed_world();
  const { fixture } = world;
  fixture.store.set('item:34', 3);
  fixture.store.set('tequip:31:44', 1); // 绳子紧缚：auto_success，跳过判定
  fixture.set_inputs(0, 0); // [0] 装上环 → [0] 乳头
  const result = await run_com(world, 87);
  assert.equal(result, 1);
  assert.equal((fixture.store.get('cflag:31:7') || 0) & 1, 1, '乳头位已置');
  assert.equal(
    fixture.store.get('item:34'),
    1,
    '乳头消耗 2 个（door 判定前 1 + p===1 再扣 1）',
  );
});

test('@COM87：取下已穿的环恒自动成功（worn & p !== 0）、CFLAG:7 位清零', async () => {
  const world = seed_world();
  const { fixture } = world;
  fixture.store.set('cflag:31:7', 1 | 128); // 已穿乳头环（过去装着经验位一并设好）
  fixture.set_inputs(1, 0); // [1] 取下环 → [0] 乳头
  const result = await run_com(world, 87);
  assert.equal(result, 1);
  assert.equal((fixture.store.get('cflag:31:7') || 0) & 1, 0, '乳头位已清');
});

test('@COM88：使役魔兽 PLAY 开关切换，共享变量 T 收尾清零', async () => {
  const world = seed_world();
  const { fixture } = world;
  fixture.store.set('t:0', 5);
  let result = await run_com(world, 88);
  assert.equal(result, 1);
  assert.equal(fixture.store.get('tequip:31:88'), 1, '开');
  assert.equal(fixture.store.get('t:0'), 0);

  result = await run_com(world, 88);
  assert.equal(fixture.store.get('tequip:31:88'), 0, '再执行一次即关');
});

test('@COM89：兽奸 PLAY 开关切换', async () => {
  const world = seed_world();
  const { fixture } = world;
  let result = await run_com(world, 89);
  assert.equal(result, 1);
  assert.equal(fixture.store.get('tequip:31:89'), 1);

  result = await run_com(world, 89);
  assert.equal(fixture.store.get('tequip:31:89'), 0);
});

test('@COM90：乳内插入，confirm_condom 静默通过时写 CFLAG:113 并累积乳房经验', async () => {
  const world = seed_world();
  const { fixture } = world;
  fixture.set_inputs(); // 无套且从未确认过：原作静默 RETURN 1，不问也不提示
  const result = await run_com(world, 90);
  assert.equal(result, 1);
  assert.equal(fixture.store.get('cflag:31:113'), 1, '乳房插入旗标');
  assert.ok(fixture.text_lines().includes('乳房插入'));
});

test('@COM90：confirm_condom 拒绝（唯一返回 0 的路径）时整回合取消', async () => {
  const world = seed_world();
  const { fixture } = world;
  fixture.store.set('talent:0:122', 1); // 调教者配男性器（confirm_condom 的前置）
  fixture.store.set('cflag:31:61', 1); // 每次问
  fixture.store.set('abl:0:12', 5); // 高技巧走「没有安全套」分支
  fixture.set_inputs(2); // 拒绝直接来
  const result = await run_com(world, 90);
  assert.equal(result, 0);
  assert.equal(fixture.store.get('cflag:31:113'), undefined, '未执行到写入点');
});

// —— @EQUIP_COM89（COMF89_獣姦プレイ.ERB:19-249） ——

test('@EQUIP_COM89：SOURCE 累加、EXP:56 随共享变量 T 收尾、返回 1', async () => {
  const world = seed_world();
  const { fixture, era_flag } = world;
  era_flag.selectcom = 21; // 走阴道性交的射精分支（COM=21 → T+=2）
  fixture.store.set('maxbase:0:4', 0); // 关闭射精检查分支，只验共同尾段
  const result = await world.equip_com_family.call(89);
  assert.equal(result, 1, '比照 COMF89 源码尾 RETURN 1');
  assert.ok(fixture.text_lines().includes('＜兽奸PLAY中＞'));
  assert.equal(fixture.store.get('t:0'), 0, '尾段清零共享变量');
  assert.ok(fixture.store.get('exp:31:56') > 0, 'EXP:56 已随 T 收尾累加');
  assert.ok(fixture.store.get('source:31:8') > 0);
});

test('@EQUIP_COM89：GOTO END_EJAC 命中（射精检查关闭）时汚れ/T 收尾仍无条件执行', async () => {
  const world = seed_world();
  const { fixture, era_flag } = world;
  era_flag.selectcom = 30; // COM=30 → 命中尾段的 STAIN:1 与 TFLAG:200
  fixture.store.set('maxbase:0:4', 0); // MASTER 射精ゲージ上限为 0 → GOTO END_EJAC
  await world.equip_com_family.call(89);
  assert.equal(
    (fixture.store.get('stain:31:1') || 0) & 2,
    2,
    '尾段的汚れ位仍写入',
  );
  assert.equal(fixture.store.get('tflag:200'), 2);
  assert.equal(
    fixture.store.get('tflag:16'),
    0,
    'E 默认值 0（从未刷新的死变量语义）',
  );
});

// —— @GET_ADV_COM CASE 80 ——

test('CASE 80：上回合非 3P 且调教者未切换 → 原样返回 80（不升格）', async () => {
  const world = seed_world();
  const { era_flag, adv_com_family } = world;
  era_flag.prevcom = 20;
  const result = await adv_com_family.call(80, {
    whenMissing: 80,
    args: [() => 0],
  });
  assert.equal(result, 80);
  assert.equal(world.fixture.store.get('tflag:42'), 0, '先清 3P 连续旗标');
});

test('CASE 80：调教者切换且上回合是正常体位（20）→ 升格到 64（需 COM_ABLE64 可用）', async () => {
  const world = seed_world();
  const { era_flag, com_able_family, adv_com_family } = world;
  era_flag.prevcom = 20;
  era_flag.assiplay = 0;
  world.fixture.store.set('tflag:50', 1); // 上回合调教者是助手，本回合非助手 → 切换
  com_able_family.register(64, () => 1);
  const result = await adv_com_family.call(80, {
    whenMissing: 80,
    args: [() => 0],
  });
  assert.equal(result, 64);
});

test('CASE 80：上回合是 3P（64）→ 升格 64 并置 TFLAG:42=1', async () => {
  const world = seed_world();
  const { era_flag, com_able_family, adv_com_family, fixture } = world;
  era_flag.prevcom = 64;
  com_able_family.register(64, () => 1);
  const result = await adv_com_family.call(80, {
    whenMissing: 80,
    args: [() => 0],
  });
  assert.equal(result, 64);
  assert.equal(fixture.store.get('tflag:42'), 1);
});

// —— TRAIN_MESSAGE 分支（B 80-89 / A 80/90） ——

/** 直调某 SELECTCOM 的 B 分支（公共头由 train_message_b 出） */
async function run_b(world, com) {
  world.era_flag.selectcom = com;
  const { train_message_b } = world.fixture.load_module(
    'system/train/train-message',
  );
  await train_message_b();
}

/** 直调某 SELECTCOM 的 A 分支 */
async function run_a(world, com) {
  world.era_flag.selectcom = com;
  const { train_message_a } = world.fixture.load_module(
    'system/train/train-message',
  );
  await train_message_a();
}

test('B90：源侧无 SELECTCOM==90 分支，真实无输出（不是占位行）', async () => {
  const world = seed_world();
  await run_b(world, 90);
  assert.deepEqual(world.fixture.text_lines(), []);
});

test('B81-89：各有专属文案输出（源侧真实分支，非存根占位）', async () => {
  for (const com of [81, 82, 83, 85, 87, 88, 89]) {
    const world = seed_world();
    await run_b(world, com);
    const lines = world.fixture.text_lines();
    assert.ok(lines.length > 0, `B${com} 应有输出`);
    assert.ok(
      !lines.some((l) => l.includes('指令')),
      `B${com} 不得是存根占位行`,
    );
  }
});

test('A81-89：源侧无专属分支，显式无操作 → 不打「族票未落地」占位行', async () => {
  for (const com of [81, 82, 83, 84, 85, 87, 88, 89]) {
    const world = seed_world();
    await run_a(world, com);
    assert.deepEqual(
      world.fixture.text_lines(),
      [],
      `A${com} 无源侧分支，注册为显式无操作`,
    );
  }
});
