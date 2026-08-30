/**
 * ere/page/page-usercom.js 的行为测试（issue #44 建面；#214 扩：子菜单
 * 按钮组、@USERCOM 全分支分发、GETBIT(FLAG:5,34) 渲染分流）。
 *
 * 缝 = test/helpers/era-fixture.js。按钮白名单（#130）由夹具的 input
 * 校验承担——本文件每个「输入 → 分发」用例都在白名单内驱动，喂进
 * 未打印按钮的值当场红。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function load_page(fixture) {
  fixture.load_module('page/page-usercom');
  return fixture.load_module('system/event/registry');
}

/** 播种自定义菜单开关（FLAG:5 位 34；开局值 event-first.js:110） */
function seed_flag5(fixture, bit34) {
  const base = 17179934119; // 开局值（bit34 = 1）
  fixture.store.set('flag:5', bit34 ? base : base - 2 ** 34);
}

// —— 子菜单按钮组（#214：@SHOW_USERCOM :17-91 的按钮挂载） ——

test('子菜单按钮组全挂载：默认态 9 个按钮，守卫组不出现', async () => {
  const fixture = create_era_fixture();
  seed_flag5(fixture, false);
  const { emit } = load_page(fixture);

  await emit('SHOW_USERCOM');

  const buttons = fixture.lines
    .filter((line) => line.type === 'button')
    .map((b) => [b.accelerator, b.text]);
  assert.deepEqual(buttons, [
    [100, '能力表示'],
    [101, '污秽表示'],
    [103, '避孕套设定'],
    [104, '爱抚系过滤'],
    [105, '器具系过滤'],
    [106, '私处性交系过滤'],
    [107, '肛门性交系过滤'],
    [108, 'ＳＭ系过滤'],
    [990, '调教菜单登录'],
    [999, '调教结束'],
  ]);
});

test('守卫组：ASSI>0 且 ASSI:1>0 时交代助手[102]出现', async () => {
  const fixture = create_era_fixture();
  seed_flag5(fixture, false);
  fixture.store.set('flag:10006', 31); // ASSI
  fixture.store.set('flag:10013', 32); // ASSI:1（记录的助手）
  const { emit } = load_page(fixture);

  await emit('SHOW_USERCOM');

  const labels = fixture.lines
    .filter((l) => l.type === 'button')
    .map((b) => b.text);
  assert.ok(labels.includes('交代助手'));
});

test('守卫组：TARGET==MASTER 且 ASSI:1>0 时对换调教[112]出现（CFLAG:0 免）', async () => {
  const fixture = create_era_fixture();
  seed_flag5(fixture, false);
  fixture.store.set('flag:10005', 0); // TARGET = MASTER（角色 0）
  fixture.store.set('flag:10013', 32); // ASSI:1
  const { emit } = load_page(fixture);

  await emit('SHOW_USERCOM');

  const labels = fixture.lines
    .filter((l) => l.type === 'button')
    .map((b) => b.text);
  assert.ok(
    labels.includes('对换调教'),
    'TARGET == MASTER 时 CFLAG:0 不参与判定',
  );
});

test('守卫组：TARGET≠MASTER 时需 CFLAG:0 >= 2 才出现对换调教', async () => {
  const fixture = create_era_fixture();
  seed_flag5(fixture, false);
  fixture.store.set('flag:10005', 31); // TARGET = 31（非 MASTER）
  fixture.store.set('flag:10013', 32);
  fixture.seed_chara(31, { id: 31, name: '温妮', callname: '温妮' });
  fixture.era.addCharacter(31);
  fixture.store.set('cflag:31:0', 1); // < 2
  const { emit } = load_page(fixture);
  await emit('SHOW_USERCOM');
  let labels = fixture.lines
    .filter((l) => l.type === 'button')
    .map((b) => b.text);
  assert.ok(!labels.includes('对换调教'), 'CFLAG:0 = 1 不得出现');

  fixture.store.set('cflag:31:0', 2);
  await emit('SHOW_USERCOM');
  labels = fixture.lines.filter((l) => l.type === 'button').map((b) => b.text);
  assert.ok(labels.includes('对换调教'), 'CFLAG:0 = 2 放行');
});

test('守卫组：FLAG:550 > 0 时调教菜单表示[991]/实行[992]出现', async () => {
  const fixture = create_era_fixture();
  seed_flag5(fixture, false);
  fixture.store.set('flag:550', 2);
  const { emit } = load_page(fixture);

  await emit('SHOW_USERCOM');

  const accs = fixture.lines
    .filter((l) => l.type === 'button')
    .map((b) => b.accelerator);
  assert.ok(accs.includes(991) && accs.includes(992));
});

test('过滤按钮染色：开启灰 #646464、未开启各系色、104 未开启为默认色', async () => {
  const fixture = create_era_fixture();
  seed_flag5(fixture, false);
  fixture.store.set('flag:25', 1); // 爱抚系过滤开
  const { emit } = load_page(fixture);

  await emit('SHOW_USERCOM');

  const colors = Object.fromEntries(
    fixture.lines
      .filter(
        (l) =>
          l.type === 'button' && l.accelerator >= 104 && l.accelerator <= 108,
      )
      .map((b) => [b.accelerator, b.color]),
  );
  assert.equal(colors[104], '#646464', '开启位一律灰 100,100,100');
  assert.equal(colors[105], '#6495ED', '器具系未开启蓝 100,149,237');
  assert.equal(colors[106], '#FFA500', '私处系未开启橙 255,165,0');
  assert.equal(colors[107], '#DB7093', '肛门系未开启深粉 219,112,147');
  assert.equal(colors[108], '#FF6347', 'ＳＭ系未开启番茄红 255,99,71');
});

// —— @USERCOM 分发（#214：:104-176 全分支） ——

test('@USERCOM：999 → BEGIN AFTERTRAIN（链内暂存，最后一个胜出）', async () => {
  const fixture = create_era_fixture();
  const { emit } = load_page(fixture);

  const pending = await emit('USERCOM', 999);

  assert.equal(pending, 'AFTERTRAIN');
});

test('@USERCOM：100/101/103 落存根占位行（本体随各自领域票）', async () => {
  for (const [acc, name] of [
    [100, 'SHOW_CHARA_INFO'],
    [101, 'STAIN_INFO'],
    [103, 'CONDOM_SETTINGS'],
  ]) {
    const fixture = create_era_fixture();
    const { emit } = load_page(fixture);

    await emit('USERCOM', acc);

    assert.ok(
      fixture.text_lines().some((t) => t.includes(`@${name}`)),
      `${acc} 必须打到含原作函数名的占位行`,
    );
    assert.equal(
      fixture.waits.at(-1)?.waited,
      true,
      `${acc} 的占位行必须等键（分发期输出不被重绘清掉）`,
    );
  }
});

test('@USERCOM：102 交代助手三分支的视角/助手切换（:110-122）', async () => {
  // 分支一：TARGET == MASTER → PLAYER 在 TARGET:1/ASSI:1 间翻转，ASSI = PLAYER
  {
    const fixture = create_era_fixture();
    const { emit } = load_page(fixture);
    const era_flag = fixture.load_module('era-utils/era-flag');
    fixture.store.set('flag:10005', 0); // TARGET = MASTER
    fixture.store.set('flag:10006', 31); // ASSI
    fixture.store.set('flag:10012', 31); // TARGET:1
    fixture.store.set('flag:10013', 32); // ASSI:1
    era_flag.player = 31; // PLAYER == TARGET:1 → 取 ASSI:1
    await emit('USERCOM', 102);
    assert.equal(era_flag.player, 32, '分支一命中 TARGET:1 → 换成 ASSI:1');
    assert.equal(era_flag.assi, 32, 'ASSI = PLAYER');
    assert.equal(era_flag.assiplay, 1, 'PLAYER != MASTER → ASSIPLAY = 1');
  }
  // 分支二：TARGET == TARGET:1 → PLAYER 在 MASTER/ASSI:1 间翻转
  {
    const fixture = create_era_fixture();
    const { emit } = load_page(fixture);
    const era_flag = fixture.load_module('era-utils/era-flag');
    fixture.store.set('flag:10005', 31); // TARGET = TARGET:1（记录对象本人）
    fixture.store.set('flag:10006', 31);
    fixture.store.set('flag:10012', 31);
    fixture.store.set('flag:10013', 32);
    era_flag.player = 0; // PLAYER == MASTER → 取 ASSI:1
    await emit('USERCOM', 102);
    assert.equal(era_flag.player, 32, '分支二命中 MASTER → 换成 ASSI:1');
    assert.equal(era_flag.assi, 32, '分支二的 ASSI = ASSI:1（非 PLAYER 跟随）');
  }
  // 分支三：其余 → PLAYER 在 MASTER/TARGET:1 间翻转，ASSI = TARGET:1
  {
    const fixture = create_era_fixture();
    const { emit } = load_page(fixture);
    const era_flag = fixture.load_module('era-utils/era-flag');
    fixture.store.set('flag:10005', 33); // TARGET 异于 MASTER 与 TARGET:1
    fixture.store.set('flag:10006', 31);
    fixture.store.set('flag:10012', 31); // TARGET:1
    fixture.store.set('flag:10013', 32);
    era_flag.player = 0; // PLAYER == MASTER → 取 TARGET:1
    await emit('USERCOM', 102);
    assert.equal(era_flag.player, 31, '分支三命中 MASTER → 换成 TARGET:1');
    assert.equal(era_flag.assi, 31, '分支三的 ASSI = TARGET:1');
  }
});

test('@USERCOM：102 守卫不满足时落链尾（无输出无切换）', async () => {
  const fixture = create_era_fixture();
  const { emit } = load_page(fixture);
  const era_flag = fixture.load_module('era-utils/era-flag');
  fixture.store.set('flag:10006', 0); // ASSI = 0：:110 的 ELSEIF 条件不满足
  fixture.store.set('flag:10013', 32);
  era_flag.player = 7;

  await emit('USERCOM', 102);

  assert.equal(era_flag.player, 7, '守卫不满足不得切换');
  assert.deepEqual(
    fixture.lines.filter((l) => l.type !== 'wait'),
    [],
  );
});

test('@USERCOM：112 对换调教（SWAP TARGET/PLAYER + 助手归位 + ASSIPLAY）', async () => {
  const fixture = create_era_fixture();
  const { emit } = load_page(fixture);
  const era_flag = fixture.load_module('era-utils/era-flag');
  fixture.seed_chara(31, { id: 31, name: '温妮', callname: '温妮' });
  fixture.era.addCharacter(31);
  fixture.store.set('cflag:31:0', 2); // TARGET≠MASTER 的守卫：调教状态 ≥ 2
  fixture.store.set('flag:10005', 31); // TARGET
  fixture.store.set('flag:10012', 99); // TARGET:1（异于双方，不触发归位歧义）
  fixture.store.set('flag:10013', 31); // ASSI:1——换入视角 31 正是它 → 归位
  era_flag.player = 33;
  await emit('USERCOM', 112);

  assert.equal(era_flag.target, 33, 'SWAP：TARGET ← 原 PLAYER');
  assert.equal(era_flag.player, 31, 'SWAP：PLAYER ← 原 TARGET');
  assert.equal(
    era_flag.assi,
    31,
    '换入视角 == ASSI:1 → ASSI 归位到它（:125-126）',
  );
  assert.equal(era_flag.assiplay, 1);
});

test('@USERCOM：104-108 过滤位翻转（开 ↔ 关；掩码逐位独立）', async () => {
  const cases = [
    [104, 1],
    [105, 2],
    [106, 4],
    [107, 8],
    [108, 16],
  ];
  for (const [acc, mask] of cases) {
    const fixture = create_era_fixture();
    const { emit } = load_page(fixture);
    fixture.store.set('flag:25', 0);
    await emit('USERCOM', acc);
    assert.equal(fixture.store.get('flag:25'), mask, `${acc} 首按置位 ${mask}`);
    await emit('USERCOM', acc);
    assert.equal(fixture.store.get('flag:25'), 0, `${acc} 再按清位`);
  }
  // 邻位不受清位掩码波及（FLAG:25 &= 31^mask 只清目标位）
  const fixture = create_era_fixture();
  const { emit } = load_page(fixture);
  fixture.store.set('flag:25', 0b01011); // 位 0/1/3
  await emit('USERCOM', 105); // 清位 1
  assert.equal(fixture.store.get('flag:25'), 0b01001, '只清位 1，位 0/3 保留');
});

test('@USERCOM：991 调教菜单表示（DRAWLINE + 序列行 + DRAWLINE + 等键）', async () => {
  const fixture = create_era_fixture();
  const { emit } = load_page(fixture);
  fixture.store.set('flag:550', 1);
  fixture.store.set('flag:551', 0);

  await emit('USERCOM', 991);

  const texts = fixture.text_lines();
  assert.ok(
    texts.some((t) => t.includes('已登录指令')),
    'comseq_show 的序列行',
  );
  assert.equal(
    fixture.lines.filter((l) => l.type === 'divider').length,
    2,
    '前后各一条 DRAWLINE',
  );
  assert.equal(fixture.waits.at(-1)?.waited, true, 'WAIT 等键');
});

test('@USERCOM：991/992 在 FLAG:550 = 0 时落链尾（守卫）', async () => {
  for (const acc of [991, 992]) {
    const fixture = create_era_fixture();
    const { emit } = load_page(fixture);
    await emit('USERCOM', acc);
    assert.deepEqual(
      fixture.lines.filter((l) => l.type !== 'wait'),
      [],
      `${acc} 无菜单时不得有任何输出`,
    );
  }
});

test('@USERCOM：未定义编号（555）落到链尾，无输出无转场', async () => {
  const fixture = create_era_fixture();
  const { emit } = load_page(fixture);

  const pending = await emit('USERCOM', 555);

  assert.equal(pending, undefined);
  assert.deepEqual(fixture.lines, [], '未挂载输入不得有任何反馈（重绘即反馈）');
});

test('存根清单可检索：docs/stub-registry.md 收录这张票全部占位名', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = fixture.load_module('page/page-usercom');
  const registry = fs.readFileSync(
    path.resolve(__dirname, '..', 'docs', 'stub-registry.md'),
    'utf8',
  );

  assert.deepEqual(STUBBED_CALLS, [
    'SHOW_CHARA_INFO',
    'STAIN_INFO',
    'CONDOM_SETTINGS',
  ]);
  for (const name of STUBBED_CALLS) {
    assert.ok(registry.includes(name), `存根清单缺少 ${name}`);
  }
});

// —— 指令方格的两条渲染路径（#214：GETBIT(FLAG:5,34) 分流） ——

test('GETBIT=1（开局默认）：自定义菜单，标签取 TRAIN_NAME、编号印 L_IDX', async () => {
  const fixture = create_era_fixture();
  seed_flag5(fixture, true);
  const { train_name_init } = fixture.load_module('system/train/train-name');
  const { emit } = load_page(fixture);
  train_name_init();

  await emit('SHOW_USERCOM');

  const buttons = fixture.lines.filter(
    (line) => line.type === 'button' && line.accelerator < 100,
  );
  // 0（恒等段）、40（打屁股）、110（穿脱衣服）：#211 实证的三个错位点——
  // 零规则态全 101 条可用，取首尾三点断言
  const map = new Map(buttons.map((b) => [b.accelerator, b.text]));
  assert.equal(map.get(0), '爱抚');
  assert.equal(map.get(39), '打屁股', '编号必须是紧凑序号 L_IDX（40→39）');
  assert.equal(map.get(89), '穿脱衣服', '穿脱衣服 110→89');
  // L_IDX 空间上界：末位指令 207（媚药史莱姆）→ 位次 100
  const last = fixture.lines.find(
    (l) => l.type === 'button' && l.accelerator === 100,
  );
  assert.equal(last?.text, '媚药史莱姆', '末位 207→100（L_IDX 空间上界）');
});

test('GETBIT=0：内建渲染臂，标签取 TRAINNAME 静态名（不升格）', async () => {
  const fixture = create_era_fixture();
  seed_flag5(fixture, false);
  const { emit } = load_page(fixture);
  // trainalias 播种与静态名不同的槽：160 号不在 Train.csv——用 150（动态槽，
  // TRAIN_NAME 播种名 ≠ CSV 静态名）区分两臂的取表
  fixture.store.set('traincommandname:0', '静态爱抚');
  fixture.store.set('trainalias:0', '定制爱抚');

  await emit('SHOW_USERCOM', [0]);

  const buttons = fixture.lines.filter(
    (line) => line.type === 'button' && line.accelerator < 100,
  );
  assert.deepEqual(
    buttons.map((b) => [b.accelerator, b.text]),
    [[0, '静态爱抚']],
    'OFF 臂读 traincommandname（引擎内建列表的 1:1），不吃 trainalias',
  );
});

test('GETBIT=1 的自定义菜单对 COM_ABLE=0 的指令不渲染（:200-203）', async () => {
  const fixture = create_era_fixture();
  seed_flag5(fixture, true);
  const { com_able_family } = fixture.load_module('system/train/com-family');
  const { emit } = load_page(fixture);
  com_able_family.register(0, async () => 0); // 爱抚不可用

  await emit('SHOW_USERCOM', [0]);

  const accs = fixture.lines
    .filter((l) => l.type === 'button' && l.accelerator < 100)
    .map((b) => b.accelerator);
  assert.ok(!accs.includes(0), 'COM_ABLE=0 的指令不得渲染（L_IDX 0 缺席）');
  assert.ok(accs.includes(1), '其余指令照常（L_IDX 1 在场）');
});

test('command_button_label：升格后的号取名字；64 合成臂读 CSV 静态名', async () => {
  const fixture = create_era_fixture();
  const { command_button_label } = fixture.load_module('page/page-usercom');
  const { train_name_init } = fixture.load_module('system/train/train-name');
  train_name_init();
  fixture.store.set('traincommandname:64', '３Ｐ');
  fixture.store.set('traincommandname:20', '正常位');

  // 未升格（adv = id）：TRAIN_NAME（trainalias）的名字
  assert.equal(command_button_label(0, 0), '爱抚');
  // 升格（8 → 84 刺激Ｇ点）：名字用升格后的号，编号仍用升格前的位次
  assert.equal(command_button_label(84, 8), '刺激Ｇ点');
  // 64 合成臂（RESULT == 64 且 L_I != 64）：%TRAINNAME:64%・%TRAINNAME:L_I%
  assert.equal(command_button_label(64, 20), '３Ｐ・正常位');
  // 64 本尊不走合成臂（L_I == 64）
  assert.equal(command_button_label(64, 64), '３Ｐ');
});

test('自定义菜单的升格标签：标签换、编号不换（train-upgrade 实证形态）', async () => {
  const fixture = create_era_fixture();
  seed_flag5(fixture, true);
  const { train_name_init } = fixture.load_module('system/train/train-name');
  const { adv_com_family } = fixture.load_module('system/train/com-adv');
  const era_flag = fixture.load_module('era-utils/era-flag');
  const { emit } = load_page(fixture);
  train_name_init();

  // 测试内注册 CASE 8 形状的升格规则（#213 骨架态零生产规则；J9 落地真
  // 规则时本用例按新语义改读生产规则）
  adv_com_family.register(8, async () => (era_flag.prevcom === 8 ? 84 : 8));

  era_flag.prevcom = 8;
  await emit('SHOW_USERCOM');

  const button = fixture.lines.find(
    (l) => l.type === 'button' && l.accelerator === 8,
  );
  // （train-upgrade-log:348 实证形态：名字用升格 id、编号用位次）
  assert.deepEqual([button.accelerator, button.text], [8, '刺激Ｇ点']);
});

test('按钮白名单：子菜单按钮驱动输入必须可送达（#130 的夹具校验）', async () => {
  const fixture = create_era_fixture();
  seed_flag5(fixture, false);
  fixture.store.set('flag:550', 1);
  fixture.store.set('flag:551', 0);
  const { emit } = load_page(fixture);
  await emit('SHOW_USERCOM'); // 画面上已打印 [100]-[108]/[990]/[991]/[999]

  // 逐个喂子菜单号：全部在已打印按钮的白名单内（不在则夹具当场抛错）
  for (const acc of [100, 101, 103, 104, 990, 999]) {
    fixture.reset_inputs(acc);
    const value = await fixture.era.input();
    assert.equal(value, acc);
  }
});

// —— @P_C 与「上次的调教指令」行（#212：TSTR:90 承载，TRAIN_MAIN.ERB:771-780）——

/** 预置 prevcom 后绘制指令菜单，返回「上次的调教指令」行文本与 tstr:90 */
async function draw_with_prevcom(fixture, prevcom) {
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.prevcom = prevcom;
  const { emit } = load_page(fixture);
  await emit('SHOW_USERCOM');
  const line = fixture.lines
    .filter((l) => l.type === 'text')
    .map((l) => l.text)
    .find((t) => t.startsWith('＜上次的调教指令：'));
  return { line, tstr: fixture.store.get('tstr:90') };
}

test('@P_C 第一级：静态名表命中 → TSTR:90 = TRAINNAME', async () => {
  const fixture = create_era_fixture();
  // traincommandname:12（振动杖，yml/TrainCommand.yml 的静态名）
  fixture.store.set('traincommandname:12', '振动杖');
  const { line, tstr } = await draw_with_prevcom(fixture, 12);
  assert.equal(tstr, '振动杖');
  assert.equal(line, '＜上次的调教指令：振动杖＞');
});

test('@P_C 第二级：静态名空 → TRAIN_NAME 定制名（trainalias 覆盖层）', async () => {
  const fixture = create_era_fixture();
  // 999 不是静态表编号：traincommandname 未播种 → 回落 trainalias
  fixture.store.set('trainalias:999', '自定义名');
  const { line, tstr } = await draw_with_prevcom(fixture, 999);
  assert.equal(tstr, '自定义名');
  assert.equal(line, '＜上次的调教指令：自定义名＞');
});

test('@P_C 第三级：两级皆空 → 全角空格占位（STRLENSU ≥ 1）', async () => {
  const fixture = create_era_fixture();
  const { line, tstr } = await draw_with_prevcom(fixture, 998);
  assert.equal(tstr, '　', '第三级回落必须落全角空格占位（STRLENSU >= 1）');
  assert.equal(line, '＜上次的调教指令：　＞');
});

test('静态名优先于定制名（TRAINNAME > TRAIN_NAME 的回落顺序不可倒置）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('traincommandname:12', '振动杖');
  fixture.store.set('trainalias:12', '被覆盖的名字');
  const { tstr } = await draw_with_prevcom(fixture, 12);
  assert.equal(tstr, '振动杖', 'TRAINNAME 非空时不得读 TRAIN_NAME');
});

test('PREVCOM = -1（首轮）：无「上次的调教指令」行，也不写 TSTR:90', async () => {
  const fixture = create_era_fixture();
  const { line, tstr } = await draw_with_prevcom(fixture, -1);
  assert.equal(line, undefined);
  assert.equal(tstr, undefined, 'P_C 不被调用，TSTR:90 不得有写入');
});
