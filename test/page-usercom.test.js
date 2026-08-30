/**
 * ere/page/page-usercom.js 的行为测试（issue #44：@SHOW_USERCOM / @USERCOM）。
 *
 * 缝 = test/helpers/era-fixture.js。这张票菜单只挂 [999] 调教结束（工单事实
 * #2），其余按钮与处理器整组待办——待办面由存根清单核对固定。
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

test('@SHOW_USERCOM：只挂 [999] 调教结束，其余按钮组一行占位', async () => {
  const fixture = create_era_fixture();
  const { emit } = load_page(fixture);

  await emit('SHOW_USERCOM');

  const buttons = fixture.lines.filter((line) => line.type === 'button');
  assert.deepEqual(
    buttons.map((b) => [b.accelerator, b.text]),
    [[999, '调教结束']],
    '这张票菜单只挂 [999]（按钮正文不带编号前缀，引擎自动拼）',
  );
  assert(
    fixture.text_lines().some((line) => line.includes('@SHOW_USERCOM')),
    '未挂载的按钮组必须有可检索的占位行',
  );
});

test('@USERCOM：999 → BEGIN AFTERTRAIN（链内暂存，最后一个胜出）', async () => {
  const fixture = create_era_fixture();
  const { emit } = load_page(fixture);

  const pending = await emit('USERCOM', 999);

  assert.equal(pending, 'AFTERTRAIN');
});

test('@USERCOM：未挂载的编号落到链尾 RETURN 0，无输出无转场', async () => {
  const fixture = create_era_fixture();
  const { emit } = load_page(fixture);

  const pending = await emit('USERCOM', 100); // 能力表示：按钮未挂、处理器待办

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
    'COMSEQ_REGISTER',
    'COMSEQ_SHOW',
    'COMSEQ_TRAIN',
    'SHOW_COMMENU',
  ]);
  for (const name of STUBBED_CALLS) {
    assert(registry.includes(name), `存根清单缺少 ${name}`);
  }
});

// —— #213：指令按钮的紧凑序号（L_IDX）与升格标签（@SHOW_COMMENU 依据） ——

test('指令按钮印 L_IDX、标签取 TRAIN_NAME（trainalias）——错位段不再是 L_I', async () => {
  const fixture = create_era_fixture();
  const { train_name_init } = fixture.load_module('system/train/train-name');
  const { emit } = load_page(fixture);
  // @TRAIN_NAME_INIT 播种 TRAIN_NAME（真实调用点在 @EVENTTRAIN，#212）
  train_name_init();

  // 0（恒等段）、40（打屁股）、110（穿脱衣服）：#211 实证的三个错位点
  await emit('SHOW_USERCOM', [0, 40, 110]);

  const buttons = fixture.lines.filter(
    (line) => line.type === 'button' && line.accelerator !== 999,
  );
  assert.deepEqual(
    buttons.map((b) => [b.accelerator, b.text]),
    [
      [0, '爱抚'],
      [39, '打屁股'],
      [89, '穿脱衣服'],
    ],
    '编号必须是紧凑序号 L_IDX（打屁股 40→39、穿脱衣服 110→89）',
  );
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

test('指令按钮经 @GET_ADV_COM 升格：标签换、编号不换（train-upgrade 实证形态）', async () => {
  const fixture = create_era_fixture();
  const { train_name_init } = fixture.load_module('system/train/train-name');
  const { adv_com_family } = fixture.load_module('system/train/com-adv');
  const era_flag = fixture.load_module('era-utils/era-flag');
  const { emit } = load_page(fixture);
  train_name_init();

  // 测试内注册 CASE 8 形状的升格规则（#213 骨架态零生产规则；J9 落地真
  // 规则时本用例按新语义改读生产规则）
  adv_com_family.register(8, async () => (era_flag.prevcom === 8 ? 84 : 8));

  // 条件不满足 → 原名原号
  era_flag.prevcom = 0;
  await emit('SHOW_USERCOM', [8]);
  let buttons = fixture.lines.filter(
    (line) => line.type === 'button' && line.accelerator !== 999,
  );
  assert.deepEqual(
    buttons.map((b) => [b.accelerator, b.text]),
    [[8, '插入手指']],
  );

  // 前回合是插入手指 → 标签升格为 COM84（刺激Ｇ点），编号仍是 8 号位
  //（train-upgrade-log:348 实证形态：名字用升格 id、编号用位次）
  era_flag.prevcom = 8;
  const before = fixture.lines.length; // 追加式记录：只看第二次绘制的增量
  await emit('SHOW_USERCOM', [8]);
  buttons = fixture.lines
    .slice(before)
    .filter((line) => line.type === 'button' && line.accelerator !== 999);
  assert.deepEqual(
    buttons.map((b) => [b.accelerator, b.text]),
    [[8, '刺激Ｇ点']],
  );
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
