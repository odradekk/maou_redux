/**
 * ere/system/train/com-special.js 的行为测试（issue #224 J14）：特殊指令族
 * COM50–59。
 *
 * 覆盖十条 @COM / @COM_ABLE、消息分支，以及 53/54/57/58/59 的持续效果。
 * COM53 的录像槽、逐段 TIMES 截断、充能输入白名单和 COM58 的写入顺序是本族
 * 最易静默回归的边界，单独锁定。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

/** 开调教表、加入主人与目标，并加载特殊指令族。 */
function seed_world({ assi = -1 } = {}) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  if (assi > 0) {
    fixture.seed_chara(assi, {
      id: assi,
      name: `助手${assi}`,
      callname: `助手${assi}`,
    });
    fixture.era.addCharacter(assi);
  }
  fixture.era.beginTrain(0, 31);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.player = 0;
  era_flag.assi = assi;
  era_flag.assiplay = 0;
  era_flag.selectcom = -1;
  fixture.load_module('system/train/com-special');
  const { com_family, com_able_family, equip_com_family } = fixture.load_module(
    'system/train/com-family',
  );
  return { fixture, era_flag, com_family, com_able_family, equip_com_family };
}

/** 真实分发入口：回合循环已先写 SELECTCOM，单测同位模拟。 */
async function run_com(world, id) {
  world.era_flag.selectcom = id;
  return world.com_family.call(id);
}

// —— @COM_ABLE50–59：每条至少放行与一个原作门 ——

test('@COM_ABLE50–59：默认所需道具下全部放行', async () => {
  const { fixture, com_able_family } = seed_world();
  for (const item of [6, 16, 18, 19, 25, 26, 27, 28]) {
    fixture.store.set(`item:${item}`, 1);
  }
  fixture.store.set('abl:31:10', 3);
  fixture.store.set('abl:31:0', 3);
  fixture.store.set('abl:31:21', 3);

  for (const id of [50, 51, 52, 53, 54, 55, 56, 57, 58, 59]) {
    assert.equal(await com_able_family.call(id), 1, `COM${id} 应可执行`);
  }
});

test('@COM_ABLE50–52：器具过滤、药物抗性、连续利尿各自拦截', async () => {
  const { fixture, com_able_family } = seed_world();
  fixture.store.set('item:25', 1);
  fixture.store.set('item:26', 1);
  fixture.store.set('item:27', 1);

  fixture.store.set('flag:25', 2);
  assert.equal(await com_able_family.call(50), 0, '润滑液受器具过滤拦截');
  fixture.store.set('flag:25', 0);

  fixture.store.set('talent:31:56', 1);
  assert.equal(await com_able_family.call(51), 0, '抗药性拦媚药');
  assert.equal(await com_able_family.call(52), 0, '非触手抗药性拦利尿剂');
  fixture.store.set('talent:31:56', 0);

  fixture.store.set('tequip:31:22', 1);
  assert.equal(await com_able_family.call(52), 0, '利尿剂不可连续投放');
});

test('@COM_ABLE53–56：录像解除随时、野外门槛、死斗与失神门', async () => {
  const { fixture, com_able_family } = seed_world();
  assert.equal(await com_able_family.call(53), 0, '无相机与魔力源不可开录像');
  fixture.store.set('tequip:31:53', 1);
  assert.equal(await com_able_family.call(53), 1, '录像中可无条件关闭');
  fixture.store.set('tequip:31:53', 0);

  fixture.store.set('item:18', 1);
  assert.equal(await com_able_family.call(54), 0, '顺从/抖M均不足 3 不可野外');
  fixture.store.set('abl:31:21', 3);
  assert.equal(await com_able_family.call(54), 1);
  fixture.store.set('abl:31:21', 2);
  fixture.store.set('abl:31:10', 2);
  assert.equal(await com_able_family.call(54), 0, '双门槛必须是 3 而非 2');
  fixture.store.set('abl:31:10', 0);

  fixture.store.set('tequip:31:55', 1);
  assert.equal(await com_able_family.call(55), 0, '死斗中不可放置');
  fixture.store.set('tequip:31:55', 0);
  fixture.store.set('tflag:899', 1);
  assert.equal(await com_able_family.call(56), 0, '失神中不可交谈');
  fixture.store.set('tflag:899', 0);

  fixture.store.set('item:6', 1);
  fixture.store.set('item:28', 1);
  fixture.store.set('tflag:224', 555);
  assert.equal(await com_able_family.call(53), 0, '自动调教不得开启录像');
});

test('@COM_ABLE57–59：镜子、浴室及新妻的关键门槛', async () => {
  const { fixture, era_flag, com_able_family } = seed_world();
  fixture.store.set('abl:31:10', 3);
  assert.equal(await com_able_family.call(57), 0, '缺镜子不可羞耻 PLAY');
  fixture.store.set('item:16', 1);
  assert.equal(await com_able_family.call(57), 1);
  fixture.store.set('tequip:31:58', 1);
  assert.equal(await com_able_family.call(57), 0, '浴室中不可羞耻 PLAY');
  fixture.store.set('tequip:31:58', 0);

  fixture.store.set('talent:31:124', 1);
  fixture.store.set('abl:31:10', 2);
  assert.equal(
    await com_able_family.call(58),
    0,
    '动物耳朵且顺从不足 3 不可浴室',
  );
  fixture.store.set('talent:31:124', 0);
  fixture.store.set('abl:31:10', 3);
  assert.equal(await com_able_family.call(58), 1);

  fixture.store.set('item:19', 1);
  fixture.store.set('abl:31:0', 2);
  assert.equal(await com_able_family.call(59), 0, '原作新妻门槛是 ABL:0 > 2');
  fixture.store.set('abl:31:0', 3);
  assert.equal(await com_able_family.call(59), 1);
  era_flag.assiplay = 1;
  assert.equal(await com_able_family.call(59), 0, '助手不能执行新妻 PLAY');
  era_flag.assiplay = 0;

  fixture.store.set('cflag:31:40', 1);
  fixture.store.set('flag:37', 1);
  assert.equal(await com_able_family.call(58), 0, '着衣时不可浴室 PLAY');
  assert.equal(await com_able_family.call(59), 0, '着衣时不可新妻 PLAY');

  const assistant_world = seed_world({ assi: 17 });
  assistant_world.fixture.store.set('abl:31:10', 3);
  assistant_world.fixture.store.set('abl:17:10', 2);
  assistant_world.fixture.store.set('talent:17:124', 1);
  assert.equal(
    await assistant_world.com_able_family.call(58),
    0,
    '动物耳朵助手顺从不足 3 不可浴室',
  );
});

// —— COM50–52：药剂状态、道具与经验 ——

test('@COM50：覆写 SOURCE、消耗润滑液并累积同性经验', async () => {
  const world = seed_world();
  world.fixture.store.set('item:25', 2);
  assert.equal(await run_com(world, 50), 1);
  assert.equal(world.fixture.store.get('source:31:10'), 10000);
  assert.equal(world.fixture.store.get('source:31:12'), 300);
  assert.equal(world.fixture.store.get('item:25'), 1);
  assert.equal(
    world.fixture.store.get('exp:31:40'),
    1,
    '双方均非男人 → 百合经验',
  );
});

test('@COM51：调合知识、药物经验与成瘾状态按原作落盘', async () => {
  const world = seed_world();
  const { fixture } = world;
  fixture.store.set('item:26', 1);
  fixture.store.set('talent:0:55', 1);
  fixture.store.set('talent:31:46', 1);
  fixture.store.set('exp:31:57', 50);

  assert.equal(await run_com(world, 51), 1);
  assert.equal(
    fixture.store.get('deltabase:31:0'),
    0,
    '300-150-100-100 后原作钳至 0',
  );
  assert.equal(fixture.store.get('deltabase:31:1'), -150);
  assert.equal(fixture.store.get('source:31:7'), 500);
  assert.equal(fixture.store.get('source:31:14'), 1000);
  assert.equal(fixture.store.get('source:31:11'), 10000);
  assert.equal(fixture.store.get('tequip:31:21'), 1);
  assert.equal(fixture.store.get('cflag:31:31'), 1);
  assert.equal(fixture.store.get('cflag:31:32'), 1);
  assert.equal(fixture.store.get('item:26'), 0);
  assert.equal(fixture.store.get('exp:31:57'), 51);

  const low_exp = seed_world();
  low_exp.fixture.store.set('item:26', 1);
  assert.equal(await run_com(low_exp, 51), 1);
  assert.equal(
    low_exp.fixture.store.get('deltabase:31:0'),
    -600,
    'EXP:57 = 0 必须走首档 +300，合计体力损耗 600',
  );
});

test('@COM52：触手时抗药性例外，置利尿剂并不消耗实体道具', async () => {
  const world = seed_world();
  const { fixture } = world;
  fixture.store.set('talent:31:56', 1);
  fixture.store.set('tequip:31:90', 1);
  fixture.store.set('item:27', 1);

  assert.equal(await run_com(world, 52), 1);
  assert.equal(fixture.store.get('deltabase:31:0'), -240);
  assert.equal(fixture.store.get('deltabase:31:1'), -120);
  assert.equal(fixture.store.get('source:31:14'), 2000);
  assert.equal(fixture.store.get('source:31:15'), 150);
  assert.equal(fixture.store.get('tequip:31:22'), 1);
  assert.equal(fixture.store.get('item:27'), 1, '触手调教时原作不耗利尿剂');
});

// —— COM53：录像的槽、tick、充能与停机 ——

test('@COM53：启动只清 480–489、首个持续 tick 不录帧', async () => {
  const world = seed_world();
  const { fixture, equip_com_family } = world;
  fixture.store.set('item:6', 1);
  fixture.store.set('item:28', 1);
  fixture.store.set('cflag:31:460', 99);
  fixture.store.set('cflag:31:480', 99);
  fixture.store.set('tequip:31:54', 1);
  fixture.store.set('tequip:31:18', 1);

  assert.equal(await run_com(world, 53), 1);
  assert.equal(fixture.store.get('tequip:31:53'), 1);
  assert.equal(fixture.store.get('cflag:31:491'), 0);
  assert.equal(fixture.store.get('cflag:31:460'), 99, '原作启动不清 460–479');
  assert.equal(fixture.store.get('cflag:31:480'), 0);
  assert.equal(fixture.store.get('flag:22'), 513, '野外 + 淋浴快照位');
  assert.ok(
    fixture.lines.some(
      (line) => line.type === 'text' && line.text === '★★★录像摄影开始★★★',
    ),
    'B53 开启消息',
  );

  world.era_flag.selectcom = 56;
  await equip_com_family.call(53);
  assert.equal(fixture.store.get('cflag:31:491'), 1);
  assert.equal(fixture.store.get('cflag:31:460'), 99, '首 tick 不写录像');
});

test('@EQUIP_COM53：录第 1/11/30 帧、助手编码，逐段 TIMES 精确截断', async () => {
  const world = seed_world({ assi: 17 });
  const { fixture, era_flag, equip_com_family } = world;
  fixture.store.set('tequip:31:53', 1);
  fixture.store.set('cflag:31:491', 1);
  fixture.store.set('palam:31:5', 100); // ×90%
  fixture.store.set('abl:31:10', 1); // ×60%
  fixture.store.set('abl:31:17', 2); // ×130%，370×90%×60%×130%=258（合并后会错误为 259）
  era_flag.assiplay = 1;
  era_flag.assi = 17;
  era_flag.selectcom = 55;

  await equip_com_family.call(53);
  assert.equal(
    fixture.store.get('cflag:31:460'),
    1055,
    '女性助手录像编码 +1000',
  );
  assert.equal(
    fixture.store.get('source:31:10'),
    258,
    '370 的每步整数 TIMES 链（不得合并为一次截断的 259）',
  );
  assert.equal(fixture.store.get('source:31:12'), 1750);
  assert.equal(fixture.store.get('source:31:14'), 980);

  fixture.store.set('cflag:31:491', 11);
  fixture.store.set('cflag:31:499', 1); // video_max = 14，避免第 11 帧后询问充能
  await equip_com_family.call(53);
  assert.equal(fixture.store.get('cflag:31:470'), 1055, '第 11 帧必须可写 470');

  fixture.store.set('cflag:31:491', 30);
  fixture.store.set('cflag:31:499', 5); // video_max = 30，最大帧后原作会询问
  fixture.set_inputs(2);
  await equip_com_family.call(53);
  assert.equal(fixture.store.get('cflag:31:489'), 1055, '最大帧写入 489');
});

test('@EQUIP_COM53：充能先注册按钮，成功时双扣资金，选择停止时清充能', async () => {
  const world = seed_world();
  const { fixture, equip_com_family } = world;
  fixture.store.set('tequip:31:53', 1);
  fixture.store.set('cflag:31:491', 11);
  fixture.store.set('flag:10004', 1000);
  fixture.store.set('exflag:4444', 1000);
  fixture.set_inputs(1);

  await equip_com_family.call(53);
  const buttons = fixture.lines.filter((line) => line.type === 'button');
  assert.deepEqual(
    buttons.map((line) => [line.text, line.accelerator]),
    [
      ['充能', 1],
      ['不了', 2],
    ],
  );
  assert.equal(fixture.store.get('cflag:31:499'), 1);
  assert.equal(fixture.store.get('flag:10004'), 500);
  assert.equal(fixture.store.get('exflag:4444'), 500);

  fixture.store.set('cflag:31:491', 15);
  fixture.set_inputs(2);
  await equip_com_family.call(53);
  assert.equal(fixture.store.get('tequip:31:53'), 0);
  assert.equal(fixture.store.get('cflag:31:499'), 0);

  const sixth_charge = seed_world();
  sixth_charge.fixture.store.set('tequip:31:53', 1);
  sixth_charge.fixture.store.set('cflag:31:491', 31);
  sixth_charge.fixture.store.set('cflag:31:499', 5);
  sixth_charge.fixture.store.set('flag:10004', 9999);
  sixth_charge.fixture.store.set('exflag:4444', 9999);
  sixth_charge.fixture.set_inputs(1);
  await sixth_charge.equip_com_family.call(53);
  assert.equal(sixth_charge.fixture.store.get('tequip:31:53'), 0);
  assert.equal(
    sixth_charge.fixture.store.get('cflag:31:499'),
    0,
    '最多五次充能',
  );
  assert.ok(
    sixth_charge.fixture.text_lines().includes('＜已经无法再充能了＞'),
    '第六次充能强制停机',
  );
  assert.equal(
    sixth_charge.fixture.store.get('flag:10004'),
    9999,
    '第六次不得继续扣钱',
  );
});

// —— COM54–59：状态、持续函数与消息 ——

test('@COM54：首次开启记录野外露出经验；持续效果由装备分发调用', async () => {
  const world = seed_world();
  const { fixture, equip_com_family } = world;
  fixture.store.set('item:18', 1);
  fixture.store.set('abl:31:10', 3);
  assert.equal(await run_com(world, 54), 1);
  assert.equal(fixture.store.get('tequip:31:54'), 1);
  assert.equal(fixture.store.get('cflag:31:5'), 1);
  assert.equal(fixture.store.get('exp:31:50'), 1);
  assert.equal(fixture.text_lines().includes('★★★录像摄影开始★★★'), false);

  await run_com(world, 54);
  assert.equal(fixture.store.get('tequip:31:54'), 0);
  assert.equal(fixture.text_lines().includes('回到了房间……'), true);
  assert.equal(fixture.store.get('exp:31:50'), 1, '野外露出经验仅首次取得');
  await run_com(world, 54);
  assert.equal(fixture.store.get('tequip:31:54'), 1);
  assert.equal(fixture.store.get('exp:31:50'), 1, '野外露出经验仅首次取得');

  await equip_com_family.call(54);
  assert.equal(fixture.store.get('deltabase:31:0'), -50);
  assert.equal(fixture.store.get('deltabase:31:1'), -400);
});

test('@COM58：开启的 SOURCE/LOSEBASE 与持续效果使用不同底数', async () => {
  const world = seed_world();
  const { fixture, equip_com_family } = world;
  fixture.store.set('abl:31:10', 3);
  fixture.store.set('abl:31:17', 2);

  assert.equal(await run_com(world, 58), 1);
  assert.equal(fixture.store.get('deltabase:31:1'), -30);
  assert.equal(
    fixture.store.get('source:31:12'),
    96,
    '开启底数 100 × 0.8（欲情）× 1.2（露出）',
  );
  assert.equal(fixture.store.get('source:31:14'), 50);
  assert.equal(fixture.store.get('source:31:16'), 48);

  await equip_com_family.call(58);
  assert.equal(
    fixture.store.get('source:31:12'),
    163,
    '持续底数 70 × 0.8 × 1.2 再累加',
  );
});

test('@COM55：无 B 消息，A55 在欲情门开启后输出并置屈服刻印结算', async () => {
  const world = seed_world();
  const { fixture } = world;
  fixture.store.set('palam:31:5', 3000);
  fixture.store.set('abl:31:16', 3);
  fixture.store.set('abl:31:21', 2);
  assert.equal(await run_com(world, 55), 1);
  assert.equal(fixture.store.get('source:31:3'), 91, '侍奉 70 × 抖M 1.3');
  assert.equal(fixture.store.get('source:31:12'), 120, '欲情 100 × 抖M 1.2');
  assert.equal(fixture.store.get('tflag:200'), 1);
  assert.equal(
    fixture.store.get('deltabase:31:1'),
    -10,
    '放置PLAY 气力损耗 10',
  );
  assert.equal(
    fixture.text_lines().some((line) => line.includes('急促的呼吸着')),
    false,
    'COM55 本体不调用 TRAIN_MESSAGE_A',
  );
});

test('@TRAIN_MESSAGE_A55：SOURCE_CHECK 调用时输出原作反应；其余 A 位无占位', async () => {
  const world = seed_world();
  const { fixture } = world;
  const { train_message_a } = fixture.load_module('system/train/train-message');
  world.era_flag.selectcom = 55;
  fixture.store.set('palam:31:5', 3000);
  fixture.store.set('tequip:31:21', 1);
  await train_message_a();
  assert.ok(fixture.text_lines().some((line) => line.includes('急促的呼吸着')));
  assert.ok(
    fixture.text_lines().some((line) => line.includes('身体不断地颤抖着')),
  );

  world.era_flag.selectcom = 50;
  const before = fixture.text_lines().length;
  await train_message_a();
  assert.equal(
    fixture.text_lines().length,
    before,
    '本族其余 A 分支是原作无输出',
  );
});

test('@TRAIN_MESSAGE_A55：失神值 1 仍输出，2 才抑制', async () => {
  const world = seed_world();
  const { fixture } = world;
  const { train_message_a } = fixture.load_module('system/train/train-message');
  world.era_flag.selectcom = 55;
  fixture.store.set('palam:31:5', 3000);

  fixture.store.set('tflag:899', 1);
  await train_message_a();
  assert.ok(
    fixture.text_lines().some((line) => line.includes('急促的呼吸着')),
    'TFLAG:899 = 1 仍满足 <= 1',
  );

  const before = fixture.text_lines().length;
  fixture.store.set('tflag:899', 2);
  await train_message_a();
  assert.equal(fixture.text_lines().length, before, 'TFLAG:899 = 2 才抑制 A55');
});

test('@TRAIN_MESSAGE_B50–54、56–59：每条默认分支文本可达', async () => {
  const world = seed_world();
  const { fixture } = world;
  const { train_message_b } = fixture.load_module('system/train/train-message');
  const expected = new Map([
    [50, '温妮被涂满了润滑液…'],
    [51, '温妮呼吸紊乱、面颊发红、全身开始滚烫起来了…'],
    [52, '温妮呼吸紊乱、梨花带雨地忍耐着尿意…'],
    [53, '★★★录像摄影开始★★★'],
    [54, '戴着颈圈、跟着你出去了…'],
    [56, '你对温妮说话了…'],
    [57, '温妮被推到镜子前…'],
    [58, '你带温妮去了浴室…'],
    [59, '温妮肌肤被围裙包裹着…'],
  ]);

  for (const [id, text] of expected) {
    world.era_flag.selectcom = id;
    const before = fixture.text_lines().length;
    await train_message_b();
    assert.ok(
      fixture
        .text_lines()
        .slice(before)
        .some((line) => line.includes(text)),
      `B${id} 默认分支：${text}`,
    );
  }
});

test('@TRAIN_MESSAGE_B52：失神值仅 0 才输出忍尿反应', async () => {
  const world = seed_world();
  const { fixture } = world;
  const { train_message_b } = fixture.load_module('system/train/train-message');
  world.era_flag.selectcom = 52;

  fixture.store.set('tflag:899', 1);
  await train_message_b();
  assert.ok(
    !fixture.text_lines().some((line) => line.includes('忍耐着尿意')),
    'TFLAG:899 = 1 不是 B52 的输出条件',
  );

  fixture.store.set('tflag:899', 0);
  await train_message_b();
  assert.ok(
    fixture.text_lines().some((line) => line.includes('忍耐着尿意')),
    'TFLAG:899 = 0 才输出忍尿反应',
  );
});

test('@TRAIN_MESSAGE_B：COM51/52 触手及 COM53/54/58/59 关闭分支', async () => {
  const world = seed_world();
  const { fixture } = world;
  const { train_message_b } = fixture.load_module('system/train/train-message');
  const cases = [
    [51, 'tequip:31:90', '伸出了带有催淫液体的触手、'],
    [52, 'tequip:31:90', '伸出了极细的触手、把利尿剂直接射到尿道里了…'],
    [53, 'tequip:31:53', '★★★录像摄影结束★★★'],
    [54, 'tequip:31:54', '回到了房间……'],
    [58, 'tequip:31:58', '你带温妮回了房间…'],
    [59, 'tequip:31:59', '温妮的围裙脱了下来…'],
  ];

  for (const [id, key, text] of cases) {
    fixture.store.set(key, 1);
    world.era_flag.selectcom = id;
    const before = fixture.text_lines().length;
    await train_message_b();
    assert.ok(
      fixture.text_lines().slice(before).includes(text),
      `B${id} 切换前状态分支：${text}`,
    );
    fixture.store.set(key, 0);
  }
});

test('@COM56：话术读取目标自身，歌唱显示量与实际加值保留原作差 1', async () => {
  const world = seed_world();
  const { fixture } = world;
  fixture.store.set('abl:31:10', 3);
  fixture.store.set('abl:31:15', 5);
  fixture.store.set('abl:0:15', 4);
  fixture.store.set('abl:31:16', 3);
  fixture.store.set('palam:31:4', 10000);
  fixture.store.set('abl:31:71', 3);

  assert.equal(await run_com(world, 56), 1);
  assert.equal(
    fixture.store.get('source:31:16'),
    350,
    '（30+150+70）×目标话术 1.4',
  );
  assert.equal(fixture.store.get('exp:31:73'), 5);
  assert.equal(
    fixture.store.get('exp:31:71'),
    5,
    '显示 +6，实际加 E+ABL-3 = 5',
  );
  assert.ok(fixture.text_lines().includes('歌唱经验+6'));
});

test('@COM57：SIF 只约束下一条语句，开启与持续的无素质路径均保留后续效果', async () => {
  const opening = seed_world();
  opening.fixture.store.set('item:16', 1);
  opening.fixture.store.set('abl:31:10', 3);
  await run_com(opening, 57);
  assert.equal(opening.fixture.store.get('source:31:12'), 450);
  assert.equal(opening.fixture.store.get('source:31:14'), 1720);
  assert.equal(opening.fixture.store.get('source:31:16'), 725);
  assert.equal(opening.fixture.store.get('source:31:3'), undefined);

  const ongoing = seed_world();
  ongoing.fixture.store.set('abl:31:10', 3);
  await ongoing.equip_com_family.call(57);
  assert.equal(ongoing.fixture.store.get('source:31:12'), 247);
  assert.equal(ongoing.fixture.store.get('source:31:14'), 1720);
  assert.equal(ongoing.fixture.store.get('source:31:16'), 623);
  assert.equal(ongoing.fixture.store.get('source:31:3'), undefined);
});

test('@COM57：开关、爱情经验与持续效果', async () => {
  const world = seed_world();
  const { fixture, equip_com_family } = world;
  fixture.store.set('item:16', 1);
  fixture.store.set('abl:31:10', 3);
  fixture.store.set('abl:31:17', 2);
  fixture.store.set('cflag:31:2', 1000);
  assert.equal(await run_com(world, 57), 1);
  assert.equal(
    fixture.store.get('exp:31:23'),
    undefined,
    '露出癖 2 不得取得羞耻 PLAY 爱情经验',
  );
  fixture.store.set('tequip:31:57', 0);
  fixture.store.set('abl:31:17', 3);
  assert.equal(await run_com(world, 57), 1);
  assert.equal(fixture.store.get('tequip:31:57'), 1);
  assert.equal(fixture.store.get('exp:31:23'), 1);
  await equip_com_family.call(57);
  assert.equal(fixture.store.get('deltabase:31:0'), -10);
  assert.equal(fixture.store.get('deltabase:31:1'), -500);
});

test('@COM58：关闭时必须先清淋浴，再清浴室位', async () => {
  const world = seed_world();
  const { fixture } = world;
  fixture.store.set('tequip:31:58', 1);
  fixture.store.set('tequip:31:18', 1);
  fixture.var_writes.length = 0;

  assert.equal(await run_com(world, 58), 1);
  const writes = fixture.var_writes.filter((write) =>
    ['tequip:31:18', 'tequip:31:58'].includes(write.name),
  );
  assert.deepEqual(writes, [
    { name: 'tequip:31:18', value: 0 },
    { name: 'tequip:31:58', value: 0 },
  ]);
});

test('@EQUIP_COM58：两个主人经验条件分别累积', async () => {
  const world = seed_world();
  const { fixture, equip_com_family } = world;
  fixture.store.set('abl:31:10', 1);
  fixture.store.set('abl:31:16', 3);
  fixture.store.set('abl:31:17', 2);
  await equip_com_family.call(58);
  assert.equal(fixture.store.get('deltabase:31:0'), -20);
  assert.equal(fixture.store.get('deltabase:31:1'), -50);
  assert.equal(
    fixture.store.get('source:31:12'),
    67,
    '70 × 0.8（欲情）× 1.2（露出）',
  );
  assert.equal(fixture.store.get('source:31:14'), 50);
  assert.equal(fixture.store.get('source:31:16'), 33);
  assert.equal(fixture.store.get('tflag:30'), 2);
});

test('@COM59：爱情经验 +2，持续效果再 +1 与主人经验四条件', async () => {
  const world = seed_world();
  const { fixture, equip_com_family } = world;
  fixture.store.set('item:19', 1);
  fixture.store.set('abl:31:0', 3);
  fixture.store.set('abl:31:10', 3);
  fixture.store.set('talent:31:85', 1);
  fixture.store.set('talent:31:76', 1);
  fixture.store.set('talent:31:88', 1);
  fixture.store.set('cflag:31:2', 1000);

  assert.equal(await run_com(world, 59), 1);
  assert.equal(fixture.store.get('tequip:31:59'), 1);
  assert.equal(fixture.store.get('exp:31:23'), 2);
  assert.equal(fixture.store.get('tflag:30'), 65);
  await equip_com_family.call(59);
  assert.equal(fixture.store.get('exp:31:23'), 3);
  assert.equal(fixture.store.get('tflag:30'), 130);
  assert.equal(fixture.store.get('deltabase:31:1'), -30);
  assert.equal(fixture.store.get('source:31:3'), 4320);
  assert.equal(fixture.store.get('source:31:14'), 400);
  assert.equal(fixture.store.get('source:31:16'), 4320);
});

test('@SHOW_STATUS：COM53 启动并推进后显示剩余录像次数和特殊持续状态，不落 SHOW_EQUIP_2 占位', async () => {
  const world = seed_world();
  const { fixture, equip_com_family } = world;
  fixture.load_module('page/page-train');
  fixture.store.set('item:6', 1);
  fixture.store.set('item:28', 1);
  await run_com(world, 53);
  world.era_flag.selectcom = 56;
  await equip_com_family.call(53); // 首 tick：录像时间 0 → 1，剩余 10 次
  fixture.store.set('tequip:31:54', 1);
  fixture.store.set('tequip:31:57', 1);
  fixture.store.set('tequip:31:58', 1);
  fixture.store.set('tequip:31:59', 1);

  const { emit } = fixture.load_module('system/event/registry');
  await emit('SHOW_STATUS');
  const equip = fixture.lines.find(
    (line) =>
      line.type === 'text' &&
      line.text.includes('[摄影中(剩10次)][野外PLAY中]'),
  );
  assert.ok(equip, '状态页必须在同一装备行显示本族持续状态');
  assert.equal(equip.content[0].color, '#FF1493');
  assert.ok(equip.text.includes('[羞耻（大镜子）PLAY中]'));
  assert.ok(equip.text.includes('[浴室PLAY中]'));
  assert.ok(equip.text.includes('[新妻PLAY中]'));
  assert.ok(
    !fixture.text_lines().some((line) => line.includes('@SHOW_EQUIP_2')),
    '本族状态已点亮时不得回退为 SHOW_EQUIP_2 占位',
  );
});

test('主循环加载特殊族：主循环加载后 COM53 的注册实际生效', async () => {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  fixture.load_module('system/flow/main-loop');
  fixture.era.beginTrain(0, 31);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.player = 0;
  fixture.store.set('item:6', 1);
  fixture.store.set('item:28', 1);

  const { com_family } = fixture.load_module('system/train/com-family');
  era_flag.selectcom = 53;
  assert.equal(await com_family.call(53), 1);
  assert.equal(fixture.store.get('tequip:31:53'), 1);
});

test('本族无运行时存根：COM50_AUTO 仍由自动调教票拥有', () => {
  const world = seed_world();
  const mod = world.fixture.load_module('system/train/com-special');
  assert.deepEqual(mod.STUBBED_CALLS, []);
});
