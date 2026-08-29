/**
 * ere/event/enter-enemy.js @ENTER_ENEMY + @K_11_LILY + @K_34_crazylord +
 * @GET_ENEMY 的行为测试（issue #171，阶段 3 H2）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点）。随机源经
 * enter_enemy / k_34_crazylord / get_enemy 的 rand 参数注入（chara-make.js
 * 先例）：
 *   - zero = () => 0（所有掷骰恒 0：CHARA = 1、初期座標 X=Y=0 贴边、
 *     CHAR_MAKE_INPORT 判定通过）
 *   - one = () => 1（恒 1：座標走 ELSE 末臂 Y=31）
 *
 * 验收对应（#171 清单）：
 *   - 月末守卫 1:1 保留为死注释——钉住用例证明「月末也照来」（反向变异
 *     M348 的靶）；
 *   - 新生成的勇者 CFLAG:1 == 2 有测试，且让 turnend-settle.js:128 那处
 *     守卫（DUNGEON 占位）为真（链路两用例）；
 *   - 人数上限六分支各有测试；「出于对魔王的恐惧」早退有测试；
 *   - 初期金钱七条修正逐条有测试（含下限 0）；
 *   - 隔离接线：EVENTTURNEND 的 :93 调用点真调 enter_enemy。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

/** 所有掷骰恒 0（RAND:N == 0） */
const zero = () => 0;
/** 所有掷骰恒 1（RAND:N == 1） */
const one = () => 1;

function load(fixture) {
  return fixture.load_module('event/enter-enemy');
}

function text_lines(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

/** 占位行按「原作 @函数名，」精确计数 */
function stub_count(fixture, name) {
  return text_lines(fixture).filter((line) => line.includes(`原作 @${name}，`))
    .length;
}

/**
 * 最小世界：魔王 0 在场 + 勇者 1 号已 seed（enter_enemy 以 zero 随机源
 * 恒掷出 1 号）
 */
function setup_world() {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.seed_chara(1, { id: 1, name: '阿尔', callname: '阿尔' });
  fixture.era.addCharacter(0);
  return fixture;
}

// —— 月末守卫 1:1 保留（钉住用例；反向变异 M348 的靶）——

test('月末守卫已死：日 28、DAY 50、FLAG:60 = 0 仍每日生成（原作现状，#14 登记）', async () => {
  const fixture = setup_world();
  const { enter_enemy } = load(fixture);
  // 被注释掉的守卫是 SIF DAY:2 > LOCAL(=10) && ARG:0 == 0 && FLAG:60 < 300
  // ——三项全真（月末 28 > 10、通常来袭、无等级补正）照样来袭
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.date = 28; // DAY:2 日
  era_flag.day_count = 50;
  fixture.store.set('flag:60', 0);
  const ret = await enter_enemy(0, zero);
  assert.equal(ret, 1, '月末守卫已死：日 28 仍每日来袭');
  assert(
    fixture.chara_no.includes(1),
    '勇者 1 号在月末照常入队（守卫被注释掉是原作现状）',
  );
});

// —— 生成链：CFLAG:1 = 2 与 turnend-settle 守卫（验收「此行为必须有测试」）——

test('通常来袭：勇者入队、CFLAG:1 = 2、演出行与星框、初期座標写入', async () => {
  const fixture = setup_world();
  const { enter_enemy } = load(fixture);
  const ret = await enter_enemy(0, zero);
  assert.equal(ret, 1, 'RETURN 1（有人来袭）');
  assert(fixture.chara_no.includes(1), 'ADDCHARA 1（勇者入队）');
  assert.equal(
    fixture.store.get('cflag:1:1'),
    2,
    'CFLAG:A:1 = 2 侵攻中（CM_STP 经 CHAR_MAKE 落地）',
  );
  // 演出行（PRINT/PRINTS 归并，见 enter-enemy.js 文件头）
  const texts = text_lines(fixture);
  assert(
    texts.includes('勇者阿尔开始了地下城的攻略！'),
    '演出行：勇者 + 名字（callname:-1 承载）+ 开始攻略',
  );
  assert(
    texts.includes('*****************************************'),
    '星框上沿（:73，41 星逐字）',
  );
  // 初期座標（zero 随机源：X = Y = 0 贴边）
  assert.equal(fixture.store.get('cflag:1:510'), 0, 'CFLAG:A:510 座標 X');
  assert.equal(fixture.store.get('cflag:1:511'), 0, 'CFLAG:A:511 座標 Y');
  // 善恶值落在 @CM_KIND 的值域 [0,199]（:735 RAND:200）——:102-103 的
  // -100 钳制对刚生成的角色结构上不可达（CM_KIND 恒非负），它防的是
  // 异国勇者线（CHAR_MAKE_INPORT 真身）与 KARMA 系统的负值，1:1 保留
  const karma = fixture.store.get('cflag:1:151');
  assert(
    karma >= 0 && karma <= 199,
    `善恶值在 CM_KIND 值域内（实测 ${karma}，钳制无假阳性）`,
  );
});

test('冒险者前缀：TALENT:122（男人位）非 0 时演出写「冒险者」', async () => {
  const fixture = setup_world();
  fixture.store.set('talent:1:122', 1); // CM_GENDER 的 CASE 0 臂只写 121，预置存活
  const { enter_enemy } = load(fixture);
  await enter_enemy(0, zero);
  assert(
    text_lines(fixture).includes('冒险者阿尔开始了地下城的攻略！'),
    'TALENT:RESULT:122 非 0 → 冒险者（:78-82）',
  );
});

test('链路：生成勇者后 turnend-settle 的 DUNGEON 守卫第一次为真（:116/:128）', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.seed_chara(1, { id: 1, name: '阿尔', callname: '阿尔' });
  fixture.era.addCharacter(0);
  // 三档链同 test/event-nextday.test.js 的 setup
  fixture.load_module('event/event-turnend');
  fixture.load_module('system/turnend-settle');
  fixture.load_module('event/event-turnend-later');
  const { emit } = fixture.load_module('system/event/registry');
  const { enter_enemy } = load(fixture);
  const era_flag = fixture.load_module('era-utils/era-flag');

  // 直接生成勇者（TIME = 1：让随后的 emit 走日推进段）
  const ret = await enter_enemy(0, zero);
  assert.equal(ret, 1);
  assert.equal(fixture.store.get('cflag:1:1'), 2, 'CFLAG:1 = 2 已置');

  era_flag.time = 1;
  await emit('EVENTTURNEND');
  // #112 起 1:1 保留的守卫：place === 2 且非 2D 模式 → 走迷宫本体。
  // #177（H8）起 DUNGEON_ROOM 也是真身（无占位行）——改以 CFLAG:514
  // （階層滞在カウント，run_dungeon 滞留臂 :358 的唯一写者）观测：本用例
  // 不注入随机源，Math.random 下 WALK ∈ [0, 73]，仅七掷全 0（概率 ~5e-9）
  // 才走撤退臂使 514 为 0——与原存根行观测的失守条件同概率（#195）
  assert.equal(
    fixture.store.get('cflag:1:514'),
    1,
    'CFLAG:1 == 2 的勇者让 turnend-settle 的 DUNGEON 守卫为真',
  );
});

test('隔离接线：EVENTTURNEND 的 :93 调用点真调 enter_enemy（日推进即生成）', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.seed_chara(1, { id: 1, name: '阿尔', callname: '阿尔' });
  fixture.era.addCharacter(0);
  fixture.load_module('event/event-turnend');
  fixture.load_module('system/turnend-settle');
  fixture.load_module('event/event-turnend-later');
  const { emit } = fixture.load_module('system/event/registry');
  const era_flag = fixture.load_module('era-utils/era-flag');
  fixture.override_math_random(() => 0); // CHARA = 1（[1,17) + 恒 0）

  assert(!fixture.chara_no.includes(1), '生成前勇者不在队');
  era_flag.time = 1;
  await emit('EVENTTURNEND');
  assert(
    fixture.chara_no.includes(1),
    ':93 CALL ENTER_ENEMY,0 经日推进真跑（勇者入队）',
  );
  assert.equal(fixture.store.get('cflag:1:1'), 2, '生成的勇者拿到 CFLAG:1 = 2');
  fixture.restore_math_random();
});

// —— 人数上限六分支（:35-47）——

/** 直接操纵已加入列表的长度（上限分支只读数量与 FLAG，不触角色数据） */
function fill_chara_no(fixture, count) {
  fixture.chara_no.length = 0;
  for (let i = 0; i < count; i += 1) {
    fixture.chara_no.push(i);
  }
}

/**
 * 六分支各自的触发世界。flag 置法绕开前序分支的原理见各组注释。
 * @returns {Array<[string, object, number]>} [说明, flag 置法, 角色数]
 */
const CAP_CASES = [
  // :35 FLAG:82 == 0（ENDING_1 未出）且 > 60
  ['① FLAG:82 == 0 && CHARANUM > 60', { 82: 0 }, 61],
  // :37 三领域全未征服且 > 65（82 置 1 绕开 ①）
  ['② 三领域全未征服 && CHARANUM > 65', { 82: 1, 87: 0, 89: 0, 91: 0 }, 66],
  // :39 三对积全为 0（至多一个领域征服）且 > 70
  ['③ 两两之积全 0 && CHARANUM > 70', { 82: 1, 87: 1, 89: 0, 91: 0 }, 71],
  // :41 有任一领域未征服且 > 75（87*89 != 0 破 ③；91 == 0 命中本档）
  ['④ 任一领域未征服 && CHARANUM > 75', { 82: 1, 87: 1, 89: 1, 91: 0 }, 76],
  // :43 四方堡垒未全陷（FLAG:92 < 15）且 > 80（三领域全征服绕开 ②③④）
  [
    '⑤ FLAG:92 < 15 && CHARANUM > 80',
    { 82: 1, 87: 1, 89: 1, 91: 1, 92: 0 },
    81,
  ],
  // :45 到 MAX_CHARANUM（VARIABLES.ERH:2 = 90）硬上限
  [
    '⑥ CHARANUM >= MAX_CHARANUM(90)',
    { 82: 1, 87: 1, 89: 1, 91: 1, 92: 15 },
    90,
  ],
];

for (const [title, flags, count] of CAP_CASES) {
  test(`人数上限${title}：RETURN 0、不生成、零输出`, async () => {
    const fixture = create_era_fixture();
    fixture.seed_chara(1, { id: 1, name: '阿尔', callname: '阿尔' });
    fill_chara_no(fixture, count);
    for (const [key, value] of Object.entries(flags)) {
      if (value !== undefined) {
        fixture.store.set(`flag:${key}`, value);
      }
    }
    const { enter_enemy } = load(fixture);
    const ret = await enter_enemy(0, zero);
    assert.equal(ret, 0, `${title} → RETURN 0`);
    assert.equal(fixture.chara_no.length, count, '人数不变（未生成）');
    assert(
      fixture.calls.every((c) => c.api !== 'addCharacter'),
      '未触 addCharacter',
    );
    assert.equal(
      fixture.lines.length,
      0,
      '零输出（连 K_11/K_34 的早退也不响）',
    );
  });
}

test('人数上限之下的边界：60 人且 FLAG:82 == 0 不拦（> 60 才拦）', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(1, { id: 1, name: '阿尔', callname: '阿尔' });
  fill_chara_no(fixture, 60);
  const { enter_enemy } = load(fixture);
  const ret = await enter_enemy(0, zero);
  // 60 人未过 ① 的线（不 > 60），流程走到 CHARA 选定；1 号恰在场（fill
  // 0..59）→ 走到「恐惧」早退而非上限早退——用输出区分两处 return 0
  assert.equal(ret, 0);
  assert(
    text_lines(fixture).includes('出于对魔王的恐惧，勇者没有出现。'),
    'CHARANUM == 60 放行到选号段（上限拦的话零输出）',
  );
});

test('人数上限①的拦截判据：FLAG:82 == 0 且 61 人（静态锚，供变异条目检索）', async () => {
  const fixture = create_era_fixture();
  fill_chara_no(fixture, 61);
  const { enter_enemy } = load(fixture);
  const ret = await enter_enemy(0, zero);
  assert.equal(ret, 0, 'FLAG:82 == 0 && CHARANUM > 60 的第一档必须拦下 61 人');
  assert.equal(
    fixture.lines.length,
    0,
    '上限拦截零输出——61 人里 1 号恰在场，若走到选号段会打出恐惧早退文本',
  );
});

// —— 「出于对魔王的恐惧」早退（:93-96）——

test('同号勇者在队且未被処理：出于对魔王的恐惧，勇者没有出现', async () => {
  const fixture = setup_world();
  fixture.era.addCharacter(1); // 勇者 1 已在场
  const { enter_enemy } = load(fixture);
  const ret = await enter_enemy(0, zero); // CHARA = 1 → GETCHARA(1,0) = 1
  assert.equal(ret, 0, 'RETURN 0（早退）');
  assert(
    text_lines(fixture).includes('出于对魔王的恐惧，勇者没有出现。'),
    '早退演出文本（:94）',
  );
  assert.equal(fixture.chara_no.length, 2, '未生成新角色');
});

test('GETCHARA 双参 SP=0：在场但 CFLAG:0 = 2（助手可）视为不在场，同号再来', async () => {
  const fixture = setup_world();
  fixture.era.addCharacter(1);
  fixture.store.set('cflag:1:0', 2); // 売却可/助手可（源 :51-52 注释）
  const { enter_enemy } = load(fixture);
  const ret = await enter_enemy(0, zero);
  assert.equal(ret, 1, 'CFLAG:0 != 0 → GETCHARA(CHARA,0) = -1 → 生成');
  assert.equal(fixture.store.get('cflag:1:1'), 2, '同号角色再次来袭并置侵攻中');
});

test('调试位 GETBIT(FLAG:5,32)：位 32 开启时无视在场照常生成', async () => {
  const fixture = setup_world();
  fixture.era.addCharacter(1); // 同号在场（正常会恐惧早退）
  // 位 32 超出 JS 位运算 31 位界（x >> 32 === x >> 0），实现须用除法取位
  fixture.store.set('flag:5', 2 ** 32);
  const { enter_enemy } = load(fixture);
  const ret = await enter_enemy(0, zero);
  assert.equal(ret, 1, 'FLAG:5 位 32 → 强制生成（:53）');
});

// —— 初期金钱七条修正（:107-133，含下限 0）——

/**
 * 生成勇者 1 号（等级恒 1，CHAR_MAKE :22-24 置）并返回其 CFLAG:580 终值。
 * talent:126/315/316 不在 @CHARA_MAKE 的写入集（target 实测），预置存活。
 */
async function raised_money(preset_talent) {
  const fixture = setup_world();
  for (const [key, value] of Object.entries(preset_talent ?? {})) {
    fixture.store.set(`talent:1:${key}`, value);
  }
  const { enter_enemy } = load(fixture);
  await enter_enemy(0, zero);
  return fixture.store.get('cflag:1:580');
}

test('初期金钱①：高人气（TALENT:126）+1000，等级补正 +1 → 1001', async () => {
  assert.equal(
    await raised_money({ 126: 1 }),
    1001,
    '高人气 +1000（含等级 1）',
  );
});

test('初期金钱②：乞讨/贫民出身（TALENT:315 = 7 或 9）-500 → 负值被下限吃掉为 0', async () => {
  assert.equal(await raised_money({ 315: 7 }), 0, '315 = 7：-500 + 1 ≤ 0 → 0');
  assert.equal(await raised_money({ 315: 9 }), 0, '315 = 9 同款');
});

test('初期金钱③：贵族/圣女/军人（TALENT:315 = 8/12/19）+1500 → 1501', async () => {
  assert.equal(await raised_money({ 315: 8 }), 1501, '315 = 8');
  assert.equal(await raised_money({ 315: 12 }), 1501, '315 = 12');
  assert.equal(await raised_money({ 315: 19 }), 1501, '315 = 19');
});

test('初期金钱④：为钱/自暴自弃（TALENT:316 = 2 或 11）-500 → 0', async () => {
  assert.equal(await raised_money({ 316: 2 }), 0, '316 = 2：-500 + 1 ≤ 0 → 0');
  assert.equal(await raised_money({ 316: 11 }), 0, '316 = 11 同款');
});

test('初期金钱⑤：受命/被命令（TALENT:316 = 9 或 13）+500 → 501', async () => {
  assert.equal(await raised_money({ 316: 9 }), 501, '316 = 9');
  assert.equal(await raised_money({ 316: 13 }), 501, '316 = 13');
});

test('初期金钱⑥：等级补正（CFLAG:9 = 1）无修正时 +1', async () => {
  assert.equal(await raised_money(), 1, '零修正 → 等级 1 全额入账');
});

test('初期金钱⑦：组合下限（315 = 9 且 316 = 11 → -1000 + 1）钳 0', async () => {
  assert.equal(
    await raised_money({ 315: 9, 316: 11 }),
    0,
    '对于不受欢迎的勇者（:131）',
  );
});

test('初期金钱组合：高人气 + 出身贵族 + 受命（1000 + 1500 + 500 + 1）= 3001', async () => {
  assert.equal(await raised_money({ 126: 1, 315: 8, 316: 9 }), 3001);
});

// —— 善恶值段（:101-103）——
//
// -100 钳制对刚生成的角色结构上不可达（@CM_KIND 的值域是 RAND:200 恒
// 非负，见「通常来袭」用例的值域断言）；它防的是异国勇者线
// （CHAR_MAKE_INPORT 真身）与 KARMA 系统的负值，1:1 保留不删。

// —— @K_11_LILY（:169-221）——

/** K_11 的可出场世界：DAY 200+、玛奥在场持【爱】、莉莉未出场 */
function setup_lily() {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.seed_chara(17, { id: 17, name: '玛奥', callname: '玛奥' });
  fixture.seed_chara(24, { id: 24, name: '莉莉', callname: '莉莉' });
  fixture.era.addCharacter(0);
  fixture.era.addCharacter(17);
  fixture.store.set('talent:17:85', 1); // TALENT:17:85【爱】
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.day_count = 200;
  return { fixture, era_flag };
}

test('K_11_LILY 出场：CFLAG:1 = 2、FLAG:223、初期装备、再起点不写（1:1）', async () => {
  const { fixture } = setup_lily();
  const { k_11_lily } = load(fixture);
  const ret = await k_11_lily();
  assert.equal(ret, 0, '原作无显式 RETURN（隐式 0）');
  assert(fixture.chara_no.includes(24), 'ADDCHARA 24（莉莉入队）');
  assert.equal(fixture.store.get('cflag:24:1'), 2, 'CFLAG:A:1 = 2（:209）');
  assert.equal(fixture.store.get('flag:223'), 1, 'FLAG:223 登场済');
  assert.equal(fixture.store.get('cflag:24:501'), 1, 'CFLAG:A:501 侵入阶层');
  assert.equal(fixture.store.get('cflag:24:502'), 0, 'CFLAG:A:502 侵攻度');
  assert.equal(
    fixture.store.get('cflag:24:508'),
    undefined,
    'K_11 不设再起点（原作 :207-209 就没有 508，1:1）',
  );
  assert.equal(
    fixture.store.get('cflag:24:550'),
    40,
    '初期装備：剑（CFLAG:550）',
  );
  assert.equal(fixture.store.get('cstr:24:1'), '莉莉', 'CSTR:A:1 = 名字');
  assert(
    text_lines(fixture).includes('村娘莉莉开始了地下城的攻略！'),
    '村娘演出行',
  );
  const era_flag = fixture.load_module('era-utils/era-flag');
  assert.equal(era_flag.target, 0, 'TARGET 还原到 MASTER（FLAG:1 = 0）');
});

test('K_11_LILY 早退四条：标志已立 / 未满 200 日 / 玛奥无爱无淫乱 / 玛奥非待机', async () => {
  // ① FLAG:223 已立
  {
    const { fixture } = setup_lily();
    fixture.store.set('flag:223', 1);
    const { k_11_lily } = load(fixture);
    await k_11_lily();
    assert(!fixture.chara_no.includes(24), '① 登场済标志挡下');
  }
  // ② DAY < 200
  {
    const { fixture, era_flag } = setup_lily();
    era_flag.day_count = 199;
    const { k_11_lily } = load(fixture);
    await k_11_lily();
    assert(!fixture.chara_no.includes(24), '② 未满 200 日');
  }
  // ③ 玛奥无【爱】也无【淫乱】（TALENT:85/76 全 0）
  {
    const { fixture } = setup_lily();
    fixture.store.delete('talent:17:85');
    const { k_11_lily } = load(fixture);
    await k_11_lily();
    assert(!fixture.chara_no.includes(24), '③ 无爱无淫乱');
  }
  // ④ 玛奥调教/侵攻中（CFLAG:17:1 != 0）
  {
    const { fixture } = setup_lily();
    fixture.store.set('cflag:17:1', 2);
    const { k_11_lily } = load(fixture);
    await k_11_lily();
    assert(!fixture.chara_no.includes(24), '④ 玛奥非待机');
  }
});

// —— @K_34_crazylord（:224-323）——

/** K_34 的可出场世界：DAY 350+、金红桃在场持【淫乱】、四方堡垒全陷 */
function setup_crazylord() {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.seed_chara(20, { id: 20, name: '金红桃', callname: '金红桃' });
  fixture.seed_chara(34, { id: 34, name: '葵希罗', callname: '葵希罗' });
  fixture.era.addCharacter(0);
  fixture.era.addCharacter(20);
  fixture.store.set('talent:20:76', 1); // TALENT:20:76【淫乱】
  fixture.store.set('flag:92', 15); // 四方堡垒全陷落
  fixture.store.set('flag:500', 1); // 狂王性别：女性
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.day_count = 350;
  fixture.set_inputs(0); // :295 仪式性确认输入
  return { fixture, era_flag };
}

test('K_34 出场：CFLAG:1 = 2、508 = 3、性别设定、随机名、座標、FLAG:224', async () => {
  const { fixture } = setup_crazylord();
  const { k_34_crazylord } = load(fixture);
  const ret = await k_34_crazylord(one); // 恒 1：随机名 = 1，座標走 ELSE 末臂
  assert.equal(ret, 1, 'RETURN 1');
  assert(fixture.chara_no.includes(34), 'ADDCHARA 34（替身入队）');
  assert.equal(fixture.store.get('cflag:34:1'), 2, 'CFLAG:A:1 = 2（:299）');
  assert.equal(fixture.store.get('cflag:34:501'), 1, 'CFLAG:A:501');
  assert.equal(fixture.store.get('cflag:34:502'), 0, 'CFLAG:A:502');
  assert.equal(
    fixture.store.get('cflag:34:508'),
    3,
    'CFLAG:A:508 再起点（:300）',
  );
  assert.equal(
    fixture.store.get('cflag:34:6'),
    1,
    'CFLAG:A:6 随机名（RAND:80 → 1）',
  );
  // FLAG:500 == 1（女性）→ TALENT:121 = 0 / 122 = 0（:260-262）
  assert.equal(fixture.store.get('talent:34:121'), 0, '扶她位 = 0');
  assert.equal(fixture.store.get('talent:34:122'), 0, '男人位 = 0');
  assert.equal(
    fixture.store.get('flag:224'),
    1,
    'FLAG:224 登场済（era_flag 具名）',
  );
  assert.equal(fixture.store.get('cstr:34:1'), '葵希罗', 'CSTR:A:1');
  // 座標（one 随机源：X = Y = 1，RAND:4/3/2 全掷 1 → ELSE 末臂 Y = 31）
  assert.equal(fixture.store.get('cflag:34:510'), 1, '座標 X = 1');
  assert.equal(fixture.store.get('cflag:34:511'), 31, '座標 Y = 31（末臂）');
  // 演出与仪式输入
  const texts = text_lines(fixture);
  assert(
    texts.includes('狂王的替身葵希罗'),
    '替身演出行（PRINT 狂王的替身 + PRINTL 葵希罗 归并）',
  );
  assert(texts.includes('开始了地下城的攻略！'), '开始攻略行');
  assert(
    fixture.inputs_consumed.some(
      (item) => item.api === 'input' && item.value === 0,
    ),
    '仪式性确认输入被消费（:294-295）',
  );
  const era_flag = fixture.load_module('era-utils/era-flag');
  assert.equal(era_flag.target, 0, 'TARGET 还原到 MASTER');
});

test('K_34 性别设定的扶她臂：FLAG:500 = 0 → TALENT:121 = 1 / 122 = 0', async () => {
  const { fixture } = setup_crazylord();
  fixture.store.set('flag:500', 0);
  const { k_34_crazylord } = load(fixture);
  await k_34_crazylord(one);
  assert.equal(fixture.store.get('talent:34:121'), 1, '扶她位 = 1（:264-266）');
  assert.equal(fixture.store.get('talent:34:122'), 0);
});

test('K_34 早退：FLAG:224 已立 / 四方堡垒未全陷（FLAG:92 != 15）', async () => {
  {
    const { fixture } = setup_crazylord();
    const { k_34_crazylord } = load(fixture);
    await k_34_crazylord(one); // 第一次出场
    await k_34_crazylord(one); // 第二次：FLAG:224 = 1 挡下
    const joins = fixture.calls.filter(
      (c) => c.api === 'addCharacter' && c.args.includes(34),
    );
    assert.equal(joins.length, 1, '34 号只入队一次（登场済标志防重复）');
  }
  {
    const { fixture } = setup_crazylord();
    fixture.store.set('flag:92', 14);
    const { k_34_crazylord } = load(fixture);
    await k_34_crazylord(one);
    assert(!fixture.chara_no.includes(34), 'FLAG:92 != 15 不出场');
  }
});

// —— @GET_ENEMY（:326-405）——

test('GET_ENEMY 主路径：俘虏入库 CFLAG:1 = 0（不侵攻）、501/508、RETURN A', async () => {
  const fixture = setup_world();
  const { get_enemy } = load(fixture);
  const ret = await get_enemy(zero);
  assert.equal(ret, 1, 'RETURN A（生成角色号）');
  assert(fixture.chara_no.includes(1), 'ADDCHARA 1');
  assert.equal(
    fixture.store.get('cflag:1:1'),
    0,
    'CFLAG:A:1 = 0——俘虏不侵攻（:384）',
  );
  assert.equal(fixture.store.get('cflag:1:501'), 1, 'CFLAG:A:501 = 1');
  assert.equal(fixture.store.get('cflag:1:508'), 3, 'CFLAG:A:508 = 3');
  assert(
    text_lines(fixture).includes('勇者阿尔被俘虏了！'),
    '俘虏演出行（:370-371）',
  );
  // 异国判定掷 RAND(10)：zero → 判定通过、存根 RETURN 0 → 走生成
  assert(
    stub_count(fixture, 'CHARA_MAKE_INPORT') >= 1,
    'CHAR_MAKE_INPORT 判定占位行可见（RAND(10) == 0 分支）',
  );
});

test('GET_ENEMY 人数上限：CHARANUM >= 90 → RETURN 0（复制段同样在防）', async () => {
  const fixture = create_era_fixture();
  fill_chara_no(fixture, 90);
  const { get_enemy } = load(fixture);
  const ret = await get_enemy(zero);
  assert.equal(ret, 0, '上限六分支的复制段（:332-344）同样拦截');
  assert.equal(fixture.lines.length, 0, '零输出');
});

// —— 夹具隔离开关（#168 裁定 4；防的是「开关被拆、两条 e2e 重新竞速」）——

test('夹具隔离开关：disable_enter_enemy 后 EVENTTURNEND 不再生成勇者', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.seed_chara(1, { id: 1, name: '阿尔', callname: '阿尔' });
  fixture.era.addCharacter(0);
  fixture.load_module('event/event-turnend');
  fixture.load_module('system/turnend-settle');
  fixture.load_module('event/event-turnend-later');
  const { emit } = fixture.load_module('system/event/registry');
  const era_flag = fixture.load_module('era-utils/era-flag');
  fixture.override_math_random(() => 0);
  fixture.disable_enter_enemy(); // 本局关闭勇者来袭

  era_flag.time = 1;
  await emit('EVENTTURNEND');
  assert(!fixture.chara_no.includes(1), '开关短路了 :93 的调用——勇者没有入队');
  assert.equal(
    fixture.store.get('cflag:1:1'),
    undefined,
    '隔离开关生效：生成管线整链未跑（CFLAG:1 未写）',
  );
  fixture.restore_math_random();
});

// —— 存根清单核对（与 chara-make.test.js 同款）——

test('存根清单可检索：docs/stub-registry.md 收录全部存根化调用', () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = load(fixture);
  const registry = fs.readFileSync(
    path.resolve(__dirname, '..', 'docs', 'stub-registry.md'),
    'utf8',
  );
  for (const name of STUBBED_CALLS) {
    assert(registry.includes(name), `存根清单缺少 ${name}`);
  }
});
