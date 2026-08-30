'use strict';
/**
 * ere/system/train/com-cloth.js 的行为测试（issue #228 J18：COM110 穿脱
 * 衣服 / COM111 撕破衣服——服装系统 #215 在指令侧的消费者）。
 *
 * 缝 = test/helpers/era-fixture.js。覆盖：
 *   - @COM_ABLE110 的八条判据（自动标记 / 着衣设定 / 衣装存在 / 五个装备位）
 *     与 @COM_ABLE111 的追加全裸判据；
 *   - @COM110 的 12 个着脱判定（T/W 各六：两截·全身·胸罩·内裤·特别服装，
 *     含标准装位 B 通道、洗濯中、弄脏、和服/史莱姆/尿布支）；
 *   - @COM110 的子菜单与各动作分支（golden train-natural:212-221 的逐字
 *     形状、贞操带钥匙、贞操带全裸、撕破移轨）；
 *   - @COM111 的 7 个引き裂き判定与各撕破分支（-3 废弃写入：43/45/46/47
 *     直写 + 44 经 stronghold 门面）、史莱姆/贞操带徒手守卫、全裸收尾；
 *   - 引擎「@COMxx 返回 0 → 回合取消」语义（train-loop.js：不结算、
 *     PREVCOM 不推、SOURCE_CHECK/EVENTCOMEND 不跑——era wiki Emuera/flow
 *     TRAIN 节，golden train-natural:210/:250 的实证）。
 *
 * 世界底座与 test/com0-caress.test.js 同构：魔王 0 + 奴隶 31、火车表已开。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

// CFLAG:40 着衣位域
const PANTY = 1;
const BRA = 2;
const UPPER = 4;
const SKIRT = 8;
const TROUSERS = 16;
const SPECIAL = 64;

/**
 * 世界底座：开火车表、指好 TARGET/PLAYER、装载被测模块与依赖。
 * @param {object} [cloth0] 初始 CFLAG:40（缺省不写）
 * @param {number} [type41] CFLAG:41（缺省不写）
 * @param {number} [type42] CFLAG:42（缺省不写）
 */
function seed_world(cloth0, type41, type42) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  fixture.era.beginTrain(0, 31);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.player = 0;
  fixture.load_module('system/train/cloth');
  fixture.load_module('page/page-clothtype');
  fixture.load_module('system/train/com-cloth');
  fixture.store.set('flag:37', 1); // 着衣系统开（COM_ABLE110 的前提）
  if (type41 !== undefined) {
    fixture.store.set('cflag:31:41', type41);
  }
  if (type42 !== undefined) {
    fixture.store.set('cflag:31:42', type42);
  }
  if (cloth0 !== undefined) {
    fixture.store.set('cflag:31:40', cloth0);
  }
  const { com_family, com_able_family } = fixture.load_module(
    'system/train/com-family',
  );
  return { fixture, era_flag, com_family, com_able_family };
}

/** fixture.lines 的文本行序列（跳过 input 标记等非文本条目） */
function text_lines(fixture) {
  return fixture.lines.filter((l) => l.type === 'text').map((l) => l.text);
}

// —— @COM_ABLE110 / @COM_ABLE111 ——

test('@COM_ABLE110：默认可执行；八条判据各挡一条', async () => {
  const { fixture, com_able_family } = seed_world(15, 5);
  assert.equal(await com_able_family.call(110), 1, '默认放行（:3684）');

  fixture.store.set('tflag:224', 555); // :3664-3665 自动不可
  assert.equal(await com_able_family.call(110), 0);
  fixture.store.set('tflag:224', 0);

  fixture.store.set('flag:37', 0); // :3666-3667 着衣設定未开
  assert.equal(await com_able_family.call(110), 0);
  fixture.store.set('flag:37', 1);

  // :3668-3669 既定服装与特别服装均未设定（41=0 且 42=0）
  const bare = seed_world(0, 0, 0);
  assert.equal(await bare.com_able_family.call(110), 0);
  // 42 单独设定即可（特别服装线）
  const special_only = seed_world(64, 0, 1);
  assert.equal(await special_only.com_able_family.call(110), 1);

  for (const slot of [90, 55, 44, 58, 59]) {
    fixture.store.set(`tequip:31:${slot}`, 1); // :3670-3675 五个装备位
    assert.equal(await com_able_family.call(110), 0, `TEQUIP:${slot} 挡下`);
    fixture.store.set(`tequip:31:${slot}`, 0);
  }
});

test('@COM_ABLE111：继承 110 判据 + 全裸不可', async () => {
  const { fixture, com_able_family } = seed_world(0, 5);
  assert.equal(await com_able_family.call(111), 0, '全裸（CFLAG:40=0）不可');
  fixture.store.set('cflag:31:40', 15);
  assert.equal(await com_able_family.call(111), 1);
  fixture.store.set('flag:37', 0); // 110 的判据经 111 复用
  assert.equal(await com_able_family.call(111), 0);
});

// —— @COM110 子菜单形状 ——

test('@COM110：golden train-natural:212-221 的逐字形状（紧身衣＆裙甲→全部扒光）', async () => {
  const { fixture, com_family } = seed_world(15, 5);
  fixture.set_inputs(7);
  assert.equal(await com_family.call(110), 0, '全部分支 RETURN 0');
  assert.deepEqual(text_lines(fixture), [
    '穿脱衣服',
    '现在温妮的外貌是，紧身衣＆裙甲的姿态。',
    ' [1] - 紧身衣＆裙甲上半身脱掉',
    ' [2] - 紧身衣＆裙甲的裙子脱掉',
    ' [4] - 脱掉内裤',
    ' [7] - 全部扒光',
    ' [9] - 移动到[撕破衣服]',
    ' [100] - 算了',
    '温妮全裸了。',
  ]);
  assert.equal(fixture.store.get('cflag:31:40'), 0, '扒光（:307）');
});

test('@COM110：菜单 [3] 胸罩行被上装位挡下（40=15 有胸罩但上装在身）', async () => {
  // ABLE4T 的「上着上を着ているとダメ」——golden 会话的着衣态正是如此：
  // 位 2 在身但 [3] 不出现（train-natural:214-219 无 [3] 行）
  const { fixture, com_family } = seed_world(15, 5);
  fixture.set_inputs(100);
  await com_family.call(110);
  assert.ok(
    !text_lines(fixture).some((l) => l.includes('胸罩')),
    '上装在身时 [3] 不出现（ABLE4T :480-481）',
  );
});

test('@COM110：空身（40=0）时无脱衣行、穿衣行全出（[7]/[9] 隐藏）', async () => {
  const { fixture, com_family } = seed_world(0, 5);
  fixture.set_inputs(100);
  await com_family.call(110);
  assert.deepEqual(text_lines(fixture), [
    '穿脱衣服',
    '现在温妮的外貌是，全裸。',
    '   [1] - 紧身衣＆裙甲上半身穿起',
    '   [2] - 紧身衣＆裙甲的裙子穿起',
    '   [3] - 穿上胸罩',
    '   [4] - 穿上内裤',
    ' [100] - 算了',
  ]);
});

test('@COM110：算了（100）不改着衣位（B 探测还原 A——当前 11 ≠ 标准 15 的判别世界）', async () => {
  const { fixture, com_family } = seed_world(PANTY | BRA | SKIRT, 5);
  fixture.set_inputs(100);
  await com_family.call(110);
  assert.equal(
    fixture.store.get('cflag:31:40'),
    PANTY | BRA | SKIRT,
    'A・B 探测后还原（探测期被置的标准装位不残留）',
  );
});

// —— @COM110 着脱动作（两截衣装） ——

test('@COM110：上装脱衣→菜单重绘→上装置着（T:2 / W:2 往返）', async () => {
  const { fixture, com_family } = seed_world(15, 5);
  fixture.set_inputs(1, 100); // 先脱上装，再看菜单后算了
  await com_family.call(110);
  const lines = text_lines(fixture);
  assert.ok(
    lines.includes('温妮将紧身衣＆裙甲的上半身脱掉了。'),
    'T:2 动作行（:218-219）',
  );
  assert.equal(fixture.store.get('cflag:31:40'), 15 - UPPER);
  // 重绘的菜单：上装已脱 → 穿衣行（三空格前缀）出现，穿衣侧位 4 还原
  assert.ok(
    lines.some((l) => l === '   [1] - 紧身衣＆裙甲上半身穿起'),
    'W:2 菜单行（源 PRINT 四空格 → 渲染三空格）',
  );

  const second = seed_world(15 - UPPER, 5);
  second.fixture.set_inputs(1, 100);
  await second.com_family.call(110);
  assert.ok(
    second.fixture.lines.some(
      (l) => l.text === '温妮把紧身衣＆裙甲的上半身穿上了。',
    ),
    'W:2 动作行（上装已脱的判别世界：位 4 不在身才轮得到穿衣支）',
  );
  assert.equal(
    second.fixture.store.get('cflag:31:40'),
    15,
    'W:2 置位 4（:226）',
  );
});

test('@COM110：下装脱衣的裙型措辞与弄脏前缀（T:3，41=5 裙型 + tflag:45 位 8）', async () => {
  const { fixture, com_family } = seed_world(15, 5);
  fixture.store.set('tflag:45', 8); // 下装处理位（污物）
  fixture.set_inputs(2, 100);
  await com_family.call(110);
  const lines = text_lines(fixture);
  assert.ok(
    lines.includes(' [2] - 紧身衣＆裙甲的裙子脱掉'),
    '裙型措辞（41 ∈ [1,100]）',
  );
  assert.ok(
    lines.includes('温妮将沾满污物的紧身衣＆裙甲的裙子脱掉了。'),
    '弄脏前缀（:234-237 位 8/4）',
  );
  assert.equal(fixture.store.get('cflag:31:40'), 15 - SKIRT, '位 8 剥除');
});

test('@COM110：下装置着弄脏拒绝（W:3，tflag:45 位 4 → 被尿淋透）', async () => {
  const { fixture, com_family } = seed_world(15 - SKIRT, 5);
  fixture.store.set('tflag:45', 4);
  fixture.set_inputs(2, 100);
  await com_family.call(110);
  assert.ok(
    text_lines(fixture).includes('被尿淋透了，不是可以使用的状态'),
    'W:3 拒绝行（:260-261）',
  );
  assert.equal(fixture.store.get('cflag:31:40'), 15 - SKIRT, '位不置');
});

test('@COM110：裤型下装走「下半身」措辞（41=106 军服，位 16）', async () => {
  const { fixture, com_family } = seed_world(
    PANTY | BRA | UPPER | TROUSERS,
    106,
  );
  fixture.set_inputs(2, 100);
  await com_family.call(110);
  const lines = text_lines(fixture);
  assert.ok(
    lines.includes(' [2] - 军服下半身脱掉'),
    '非裙型措辞（41=106 → 下半身）',
  );
  assert.ok(lines.includes('温妮将军服的下半身脱掉了。'));
  assert.equal(
    fixture.store.get('cflag:31:40'),
    PANTY | BRA | UPPER,
    '位 16 剥除（SIF 逐位）',
  );
});

// —— @COM110 着脱动作（全身衣装 / 胸罩 / 内裤 / 特别服装） ——

test('@COM110：ワンピース整件脱着（T:1 / W:1，41=201 连衣裙）', async () => {
  const strip = seed_world(PANTY | BRA | UPPER | SKIRT, 201);
  strip.fixture.set_inputs(1, 100);
  await strip.com_family.call(110);
  const lines = text_lines(strip.fixture);
  assert.ok(lines.includes(' [1] - 连衣裙脱掉'), 'T:1 菜单（整件）');
  assert.ok(lines.includes('温妮将连衣裙脱掉了。'), 'T:1 动作行');
  assert.equal(
    strip.fixture.store.get('cflag:31:40'),
    PANTY | BRA,
    '上下一起脱',
  );

  const wear = seed_world(PANTY | BRA, 201);
  wear.fixture.set_inputs(1, 100);
  await wear.com_family.call(110);
  assert.ok(
    wear.fixture.lines.some((l) => l.text === '温妮将连衣裙穿上了。'),
    'W:1 动作行',
  );
  assert.equal(
    wear.fixture.store.get('cflag:31:40'),
    PANTY | BRA | UPPER | SKIRT,
    '201-250 裙型 → 位 4+8（:210-215）',
  );
});

test('@COM110：ワンピース装着的上下两半守卫（W:1：上半洗着+下半洗着 → 不可）', async () => {
  // :409-413 「上装穿着中或洗涤中」且「下装穿着中或洗涤中」→ RETURN 0——
  // 衣装撕破后的「半件还在」情形才允许重穿整件
  const world = seed_world(PANTY | BRA, 201);
  world.fixture.store.set('cflag:31:45', 3); // 上装洗涤中
  world.fixture.store.set('cflag:31:46', 3); // 下装洗涤中
  world.fixture.set_inputs(100);
  await world.com_family.call(110);
  assert.ok(
    !text_lines(world.fixture).some((l) => l.includes('连衣裙穿起')),
    '上下两半都不可用时 W:1 不出现（:400-403 守卫）',
  );
  // 上半洗着、下半不在也不洗 → 允许（整件穿回）
  world.fixture.store.set('cflag:31:46', 0);
  world.fixture.reset_inputs(1, 100);
  await world.com_family.call(110);
  assert.ok(
    text_lines(world.fixture).some((l) => l.includes('连衣裙穿起')),
    '下半可用后 W:1 出现',
  );
});

test('@COM110：胸罩脱着与洗濯中守卫（T:4 / W:4，CFLAG:44）', async () => {
  const strip = seed_world(PANTY | BRA, 5); // 上装已不在身
  strip.fixture.set_inputs(3, 100);
  await strip.com_family.call(110);
  assert.ok(
    strip.fixture.lines.some((l) => l.text === '温妮的胸罩解开了。'),
    'T:4 动作行（:271）',
  );
  assert.equal(strip.fixture.store.get('cflag:31:40'), PANTY);

  const wear = seed_world(PANTY, 5);
  wear.fixture.set_inputs(3, 100);
  await wear.com_family.call(110);
  assert.ok(wear.fixture.lines.some((l) => l.text === '温妮穿上了胸罩。'));
  assert.equal(wear.fixture.store.get('cflag:31:40'), PANTY | BRA);

  const washing = seed_world(PANTY, 5);
  washing.fixture.store.set('cflag:31:44', 2); // 胸罩洗涤中
  washing.fixture.set_inputs(100);
  await washing.com_family.call(110);
  assert.ok(
    !text_lines(washing.fixture).some((l) => l.includes('穿上胸罩')),
    'CFLAG:44 != 0 时 W:4 不出现（:498-499）',
  );
});

test('@COM110：内裤脱着的弄脏位怪癖（T:5 查下装位 8/4，W:5 查内裤位 2/1）', async () => {
  const strip = seed_world(PANTY, 5);
  strip.fixture.store.set('tflag:45', 4); // 下装「尿」位——内裤脱衣查的是它
  strip.fixture.set_inputs(4, 100);
  await strip.com_family.call(110);
  assert.ok(
    strip.fixture.lines.some((l) => l.text === '温妮把尿湿透的内裤脱掉了。'),
    'T:5 的弄脏前缀走位 4（原作怪癖，COMF110:281-284）',
  );
  assert.equal(strip.fixture.store.get('cflag:31:40'), 0);

  const wear = seed_world(0, 5);
  wear.fixture.store.set('tflag:45', 2); // 内裤「污物处理」位
  wear.fixture.set_inputs(4, 100);
  await wear.com_family.call(110);
  assert.ok(
    wear.fixture.lines.some((l) => l.text === '沾满了污物，不是可以使用的状态'),
    'W:5 拒绝行（:291-292）',
  );
  assert.equal(wear.fixture.store.get('cflag:31:40'), 0, '拒绝时位不置');

  const washing = seed_world(0, 5);
  washing.fixture.store.set('cflag:31:43', 2); // 内裤洗涤中
  washing.fixture.set_inputs(100);
  await washing.com_family.call(110);
  assert.ok(
    !text_lines(washing.fixture).some((l) => l.includes('穿上内裤')),
    'CFLAG:43 != 0 时 W:5 不出现（:533-534）',
  );
});

test('@COM110：特别服装脱着（≤50 脱掉/穿起、≥51 取下/装上）', async () => {
  const apron = seed_world(PANTY | SPECIAL, 0, 1); // 围裙（穿着型 ≤50）
  apron.fixture.set_inputs(0, 100);
  await apron.com_family.call(110);
  const lines = text_lines(apron.fixture);
  assert.ok(lines.includes(' [0] - 围裙脱掉'), '≤50 措辞：脱掉');
  assert.ok(lines.includes('温妮把围裙脱掉了。'));
  assert.equal(apron.fixture.store.get('cflag:31:40'), PANTY, '位 64 剥除');

  const glasses = seed_world(PANTY | SPECIAL, 0, 83); // 眼镜（附属型 ≥51）
  glasses.fixture.set_inputs(0, 100);
  await glasses.com_family.call(110);
  const gl = text_lines(glasses.fixture);
  assert.ok(gl.includes(' [0] - 眼镜取下'), '≥51 措辞：取下（:58-59）');
  assert.ok(gl.includes('温妮把眼镜取下了。'));

  const wear = seed_world(PANTY, 0, 1);
  wear.fixture.set_inputs(0, 100);
  await wear.com_family.call(110);
  assert.ok(
    wear.fixture.lines.some((l) => l.text === '温妮将围裙穿上了。'),
    'W:0 动作行（:169-172）',
  );
  assert.equal(wear.fixture.store.get('cflag:31:40'), PANTY | SPECIAL);
});

test('@COM110：特别服装弄脏两路（T:0 前缀位 32 / W:0 拒绝位 16）', async () => {
  const strip = seed_world(PANTY | SPECIAL, 0, 1);
  strip.fixture.store.set('tflag:45', 32);
  strip.fixture.set_inputs(0, 100);
  await strip.com_family.call(110);
  assert.ok(
    strip.fixture.lines.some((l) => l.text === '温妮把沾满污物的围裙脱掉了。'),
    'T:0 前缀（:150-154 位 32/16）',
  );

  const wear = seed_world(PANTY, 0, 1);
  wear.fixture.store.set('tflag:45', 16);
  wear.fixture.set_inputs(0, 100);
  await wear.com_family.call(110);
  assert.ok(
    wear.fixture.lines.some((l) => l.text === '被尿淋透了，不是可以使用的状态'),
    'W:0 拒绝行（:165-166）',
  );
  assert.equal(wear.fixture.store.get('cflag:31:40'), PANTY, '拒绝时位不置');
});

test('@COM110：贞操带钥匙已丢（CFLAG:49）→ 提示后回菜单', async () => {
  const world = seed_world(PANTY | SPECIAL, 0, 79); // 贞操带
  world.fixture.store.set('cflag:31:49', 1);
  world.fixture.set_inputs(0, 100);
  await world.com_family.call(110);
  const lines = text_lines(world.fixture);
  assert.ok(lines.includes('温妮贞操带的钥匙丢掉了。'), ':143 的提示行');
  assert.equal(
    world.fixture.store.get('cflag:31:40'),
    PANTY | SPECIAL,
    '钥匙分支不动着衣位',
  );
  assert.ok(
    lines.indexOf('温妮贞操带的钥匙丢掉了。') < lines.lastIndexOf('穿脱衣服'),
    'PRINTL 空行后重绘菜单',
  );
});

test('@COM110：全裸分支的贞操带保留（42=79 且位 64 → 40=64）', async () => {
  const world = seed_world(PANTY | SPECIAL, 0, 79);
  world.fixture.set_inputs(7, 100);
  await world.com_family.call(110);
  const lines = text_lines(world.fixture);
  assert.ok(lines.includes('温妮除了贞操带以外一丝不挂。'), ':303 的保留行');
  assert.equal(world.fixture.store.get('cflag:31:40'), SPECIAL, '仅剩位 64');
  assert.ok(
    lines.lastIndexOf('穿脱衣服') >
      lines.indexOf('温妮除了贞操带以外一丝不挂。'),
    '保留分支回菜单重绘（不退出）',
  );
});

test('@COM110：史莱姆着ぐるみ挡住普通脱衣判定（42=11）', async () => {
  // 位 64 且 42 ≤ 50 的「邪魔になる特別コス」挡 T:1/T:2/T:4；史莱姆另挡
  // 下装与内裤（42 == 11）
  const world = seed_world(PANTY | BRA | UPPER | SKIRT | SPECIAL, 5, 11);
  world.fixture.set_inputs(100);
  await world.com_family.call(110);
  const menu = text_lines(world.fixture).filter((l) => l.startsWith(' ['));
  assert.ok(!menu.some((l) => l.includes('上半身脱掉')), 'T:2 被挡');
  assert.ok(!menu.some((l) => l.includes('裙子脱掉')), 'T:3 被挡（==11）');
  assert.ok(!menu.some((l) => l.includes('脱掉内裤')), 'T:5 被挡（==11）');
  assert.ok(
    menu.some((l) => l === ' [0] - 史莱姆脱掉'),
    '特别服装本体可脱',
  );
});

test('@COM110：和服（41=202）下为裙时内裤不可脱（T:5 的和服支）', async () => {
  const world = seed_world(PANTY | BRA | UPPER | SKIRT, 202);
  world.fixture.set_inputs(100);
  await world.com_family.call(110);
  assert.ok(
    !text_lines(world.fixture).some((l) => l.includes('脱掉内裤')),
    '202 && 位 8 → T:5 = 0（:518-519）',
  );
});

test('@COM110：B 探测通道——兜裆布（41=192）的标准装位不含上装/内裤', async () => {
  const world = seed_world(TROUSERS, 192);
  world.fixture.set_inputs(100);
  await world.com_family.call(110);
  const menu = text_lines(world.fixture).filter((l) => l.startsWith(' '));
  assert.ok(!menu.some((l) => l.includes('穿起')), 'B 无位 4/1 → 无穿衣行');
  assert.ok(
    menu.some((l) => l === ' [2] - 兜裆布下半身脱掉'),
    'T:3 在场',
  );
});

test('@COM110：位 64 在身但特别服装类型未设定（42=0）→ 无 [0] 行', async () => {
  // ABLE0T 首判据（42==0 → 0）的唯一判别世界：位 64 残留而类型已清
  //（AFTERTRAIN_CLOTH 丢弃特别服装后的形态）
  const world = seed_world(PANTY | SPECIAL, 0, 0);
  world.fixture.set_inputs(100);
  await world.com_family.call(110);
  assert.ok(
    !text_lines(world.fixture).some((l) => l.startsWith(' [0] - ')),
    '类型未设定时 [0] 不出现（ABLE0T :332-333）',
  );
});

// —— @COM111 撕破 ——

/** 直接驱动 COM111（COM110 [9] 的调用形态同 family 直调） */
function rip_world(cloth0, type41, type42) {
  const world = seed_world(cloth0, type41, type42);
  return world;
}

test('@COM111：两截上撕破（L:3，位 4 消 + CFLAG:45 = -3）', async () => {
  const { fixture, com_family } = rip_world(15, 5);
  fixture.set_inputs(11, 100);
  assert.equal(await com_family.call(111), 1, '100 → RETURN 1');
  const lines = text_lines(fixture);
  assert.ok(lines.includes('撕破衣服'), '菜单头行');
  assert.ok(lines.includes('现在温妮的外貌是，紧身衣＆裙甲的姿态。'));
  assert.ok(lines.includes(' [11] - 紧身衣＆裙甲的上半撕破'), 'L:3 菜单行');
  assert.ok(
    lines.includes('温妮穿着的紧身衣＆裙甲的上半身被撕破了。'),
    'L:3 动作行（:124-125）',
  );
  assert.equal(fixture.store.get('cflag:31:40'), 15 - UPPER);
  assert.equal(fixture.store.get('cflag:31:45'), -3, '废弃态 -3（:126）');
});

test('@COM111：两截下撕破的裙型措辞与双位消（L:4，位 8/16 + CFLAG:46）', async () => {
  const { fixture, com_family } = rip_world(15, 5);
  fixture.set_inputs(12, 100);
  await com_family.call(111);
  const lines = text_lines(fixture);
  assert.ok(lines.includes(' [12] - 紧身衣＆裙甲的裙子撕破'), '裙型措辞');
  assert.ok(lines.includes('温妮穿着的紧身衣＆裙甲的裙子被撕破了。'));
  assert.equal(fixture.store.get('cflag:31:40'), 15 - SKIRT, '位 8 消');
  assert.equal(fixture.store.get('cflag:31:46'), -3);
});

test('@COM111：全身衣装撕破走 L:1/L:2（41=201，措辞「撕掉/撕坏」）', async () => {
  const { fixture, com_family } = rip_world(PANTY | BRA | UPPER | SKIRT, 201);
  fixture.set_inputs(11, 100);
  await com_family.call(111);
  const lines = text_lines(fixture);
  assert.ok(lines.includes(' [11] - 连衣裙的上半身撕掉'), 'L:1 菜单措辞');
  assert.ok(
    lines.includes('温妮穿着的连衣裙的上半身被撕坏了。'),
    'L:1 动作行（:107，撕坏 vs 两截的撕破）',
  );
  // L:1 只消位 4（全身衣装分上下两半撕，:86——与 COM110 T:1 的整件脱
  // （4+8+16 一起消）不同）
  assert.equal(fixture.store.get('cflag:31:40'), PANTY | BRA | SKIRT);
  assert.equal(fixture.store.get('cflag:31:45'), -3);
});

test('@COM111：胸罩撕碎经 stronghold 门面写 CFLAG:44 = -3（L:5）', async () => {
  const { fixture, com_family } = rip_world(PANTY | BRA, 5);
  fixture.set_inputs(13, 100);
  await com_family.call(111);
  assert.ok(
    fixture.lines.some((l) => l.text === '温妮的胸罩被撕碎了。'),
    'L:5 动作行（:148）',
  );
  assert.equal(fixture.store.get('cflag:31:40'), PANTY);
  // 属主 stronghold（ownership/cflag-ownership.yml "44"）——经门面写入的
  // 落点仍是 cflag:31:44（domain-check 守写入通道）
  assert.equal(fixture.store.get('cflag:31:44'), -3, '门面写 CFLAG:44（:117）');
});

test('@COM111：内裤撕碎（L:6，CFLAG:43 = -3）与全裸收尾', async () => {
  const { fixture, com_family } = rip_world(PANTY, 5);
  // 尾键 100 同徒手守卫测试：收尾被删的变异形态会重绘菜单再等键
  fixture.set_inputs(14, 100);
  assert.equal(
    await com_family.call(111),
    0,
    '撕完全裸 → RETURN 0（:159-165）',
  );
  const lines = text_lines(fixture);
  assert.ok(lines.includes('温妮的内裤被撕碎了。'));
  assert.ok(lines.includes('（已经全裸，撕无可撕）'), ':160 的收尾行');
  assert.equal(fixture.store.get('cflag:31:40'), 0);
  assert.equal(fixture.store.get('cflag:31:43'), -3);
});

test('@COM111：特别服装撕破（L:0，CFLAG:47 = -3）', async () => {
  const { fixture, com_family } = rip_world(PANTY | SPECIAL, 0, 1);
  fixture.set_inputs(10, 100);
  await com_family.call(111);
  const lines = text_lines(fixture);
  assert.ok(lines.includes(' [10] - 围裙剥掉'), 'L:0 菜单行');
  assert.ok(lines.includes('温妮的围裙被强行剥掉了。'), 'L:0 动作行（:100）');
  assert.equal(fixture.store.get('cflag:31:40'), PANTY);
  assert.equal(fixture.store.get('cflag:31:47'), -3, '废弃态 -3（:102）');
});

test('@COM111：史莱姆/贞操带徒手守卫（撕不动，RETURN 0）', async () => {
  for (const type of [11, 79]) {
    const world = rip_world(PANTY | SPECIAL, 0, type);
    // 尾键 100 兜住「守卫被删后菜单重绘再要输入」的变异形态——正确的
    // 实现到不了它，删了守卫的实现会重绘菜单等下一键
    world.fixture.set_inputs(10, 100);
    assert.equal(
      await world.com_family.call(111),
      0,
      `42=${type} 撕不动直接退出`,
    );
    const name = type === 11 ? '史莱姆' : '贞操带';
    assert.ok(
      world.fixture.lines.some((l) => l.text === `${name}被徒手撕破了。`),
      ':93-94 的徒手行',
    );
    assert.equal(
      world.fixture.store.get('cflag:31:40'),
      PANTY | SPECIAL,
      '守卫分支不动着衣位',
    );
  }
});

test('@COM111：[19] 返回穿脱（RETURN 0）与 [100] 算了（RETURN 1）', async () => {
  const back = rip_world(15, 5);
  back.fixture.set_inputs(19);
  assert.equal(await back.com_family.call(111), 0, '19 → RETURN 0（:152）');

  const quit = rip_world(15, 5);
  quit.fixture.set_inputs(100);
  assert.equal(await quit.com_family.call(111), 1, '100 → RETURN 1（:154）');
  assert.ok(
    quit.fixture.lines.some((l) => l.text === ' [100]- 算了'),
    'COM111 的 [100] 行 ] 与 - 间无空格（源 :63，1:1）',
  );
});

test('@COM111：无效输入直回菜单头（无空行，ELSE 分支）', async () => {
  const { fixture, com_family } = rip_world(15, 5);
  fixture.set_inputs(5, 100); // 5 无对应分支 → GOTO INPUT_LOOP
  await com_family.call(111);
  const lines = text_lines(fixture);
  const menus = lines.filter((l) => l === '撕破衣服');
  assert.equal(menus.length, 2, '菜单重绘一次');
  const between = lines.slice(
    lines.indexOf('撕破衣服') + 1,
    lines.lastIndexOf('撕破衣服'),
  );
  assert.ok(!between.includes(''), 'ELSE 分支重绘前无空行（:128-129）');
});

// —— COM110 ↔ COM111 的移轨 ——

test('@COM110 [9]：COM111 返回 0（19 返回）→ COM110 重绘菜单；返回 1（算了）→ COM110 退出', async () => {
  const back = seed_world(15, 5);
  back.fixture.set_inputs(9, 19, 100);
  assert.equal(await back.com_family.call(110), 0);
  const lines = text_lines(back.fixture);
  assert.ok(lines.includes('撕破衣服'), '移轨后 COM111 菜单在场');
  assert.equal(
    lines.filter((l) => l === '穿脱衣服').length,
    2,
    'COM111 返回 0 → COM110 重绘（[9] 前后各一次 + 重绘）…实际：初次 + 返回后重绘',
  );
  assert.ok(lines.includes(''), 'COM110 重绘前有空行（:320）');

  const quit = seed_world(15, 5);
  quit.fixture.set_inputs(9, 100);
  assert.equal(await quit.com_family.call(110), 0, 'COM111 算了 → COM110 退出');
  const q = text_lines(quit.fixture);
  assert.equal(q.filter((l) => l === '穿脱衣服').length, 1, '退出前不再重绘');
});

// —— 引擎「@COMxx 返回 0 → 回合取消」语义（train-loop.js） ——

test('回合取消：COM110 RETURN 0 → 不结算、PREVCOM 不推、SOURCE_CHECK/EVENTCOMEND 不跑', async () => {
  const world = seed_world(15, 5);
  const { on } = world.fixture.load_module('system/event/registry');
  const seen = [];
  on('SOURCE_CHECK', () => {
    seen.push('SOURCE_CHECK');
  });
  on('EVENTCOMEND', () => {
    seen.push('EVENTCOMEND');
  });
  const { execute_command_round } = world.fixture.load_module(
    'system/train/train-loop',
  );
  world.fixture.load_module('system/train/com0-caress');
  world.era_flag.prevcom = 6; // golden train-natural:210 的接吻位
  world.fixture.set_inputs(7);
  const round = await execute_command_round(110);
  assert.deepEqual(
    { missing: round.missing, cancelled: round.cancelled ?? false },
    { missing: false, cancelled: true },
    'RETURN 0 → cancelled（不与 missing 混同）',
  );
  assert.equal(world.era_flag.prevcom, 6, 'PREVCOM 不推（golden :250 实证）');
  assert.deepEqual(seen, [], 'SOURCE_CHECK / EVENTCOMEND 不跑');
  assert.ok(
    !world.fixture.calls.some((c) => c.api === 'nextTurnInTrain'),
    'UPCHECK 等价结算不跑',
  );
  assert.equal(
    world.fixture.store.get('cflag:31:40'),
    0,
    '副作用保留（扒光成立）',
  );
});

test('回合不取消：COM0 RETURN 1 → 正常结算链（取消语义不误伤）', async () => {
  const world = seed_world(15, 5);
  const { on } = world.fixture.load_module('system/event/registry');
  const seen = [];
  on('SOURCE_CHECK', () => {
    seen.push('SOURCE_CHECK');
  });
  on('EVENTCOMEND', () => {
    seen.push('EVENTCOMEND');
  });
  const { execute_command_round } = world.fixture.load_module(
    'system/train/train-loop',
  );
  world.fixture.load_module('system/train/com0-caress');
  world.fixture.set_inputs(999); // COM0 不收输入；防夹具误等
  const round = await execute_command_round(0);
  assert.equal(round.cancelled ?? false, false, 'COM0 一如既往走结算');
  assert.equal(world.era_flag.prevcom, 0, 'PREVCOM 推进');
  assert.deepEqual(seen, ['SOURCE_CHECK', 'EVENTCOMEND'], '结算链完整');
});
