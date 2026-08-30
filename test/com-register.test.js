/**
 * ere/system/train/com-register.js 的行为测试（issue #214：COMSEQ 的
 * 登记 / 显示 / 执行三段 + MULTI_COMABLE + CALLTRAIN 等价）。
 *
 * 缝 = test/helpers/era-fixture.js。tflag 是调教期表：全部用例先开火车表。
 * 输入经 set_inputs 驱动（夹具按已打印按钮的白名单校验——#130），
 * 指令列表与出口的按钮化由此被间接锁住：喂进未打印的值当场红。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

/** 载入 com-register 与依赖，返回 { fixture, mod } */
function load_register() {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  fixture.seed_chara(31, { id: 31, name: '温妮', callname: '温妮' });
  fixture.era.addCharacter(31);
  fixture.era.beginTrain(0, 31); // tflag（224/204）是调教期表
  const mod = fixture.load_module('system/train/com-register');
  return { fixture, mod };
}

/** 登记槽播种：FLAG:550 = ids.length，FLAG:551.. 依次存 ids */
function seed_menu(fixture, ids) {
  fixture.store.set('flag:550', ids.length);
  ids.forEach((id, i) => fixture.store.set(`flag:${551 + i}`, id));
}

// —— @COMSEQ_SHOW（:126-155） ——

test('COMSEQ_SHOW：名字串 + 「 → 」分隔 + 收尾换行（静态名表）', async () => {
  const { fixture, mod } = load_register();
  fixture.store.set('traincommandname:0', '爱抚');
  fixture.store.set('traincommandname:6', '接吻');
  seed_menu(fixture, [0, 6]);

  await mod.comseq_show();

  assert.equal(fixture.text_lines().join(''), '已登录指令：爱抚 → 接吻');
  assert.equal(fixture.lines.at(-1).type, 'br', ':155 PRINTL 收尾');
});

test('COMSEQ_SHOW：连续同指令折叠 ×n（:138-151）', async () => {
  const { fixture, mod } = load_register();
  fixture.store.set('traincommandname:0', '爱抚');
  fixture.store.set('traincommandname:6', '接吻');
  seed_menu(fixture, [0, 0, 0, 6, 6]);

  await mod.comseq_show();

  assert.equal(fixture.text_lines().join(''), '已登录指令：爱抚×3 → 接吻×2');
});

test('COMSEQ_SHOW：不可用条目显示（不可用）（COM_ABLE=0）', async () => {
  const { fixture, mod } = load_register();
  const { com_able_family } = fixture.load_module('system/train/com-family');
  fixture.store.set('traincommandname:0', '爱抚');
  fixture.store.set('traincommandname:6', '接吻');
  seed_menu(fixture, [0, 6]);
  com_able_family.register(6, async () => 0); // 接吻不可用

  await mod.comseq_show();

  assert.equal(fixture.text_lines().join(''), '已登录指令：爱抚 → （不可用）');
});

test('COMSEQ_SHOW：空菜单只有前缀与换行', async () => {
  const { fixture, mod } = load_register();
  await mod.comseq_show();
  assert.equal(fixture.text_lines().join(''), '已登录指令：');
});

/** 屏史的全部文本（ScreenBlock 重绘清掉的屏也在——重画轮的断言用它） */
function history_texts(fixture) {
  return fixture.lines_history
    .filter((l) => l.type === 'text')
    .map((l) => l.text);
}

// —— @MULTI_COMABLE（:190-202） ——

test('MULTI_COMABLE：TRAINNAME 为空（高级 COM 84）→ 0，不进登记面', async () => {
  const { fixture, mod } = load_register();
  assert.equal(await mod.multi_comable(84), 0);
  assert.equal(fixture.store.get('tflag:224') ?? 0, 0, '提前返回路径不置旗标');
});

test('MULTI_COMABLE：在册且未实现 COM_ABLE → 1（引擎初期值语义）', async () => {
  const { fixture, mod } = load_register();
  fixture.store.set('traincommandname:0', '爱抚');
  assert.equal(await mod.multi_comable(0), 1);
});

test('MULTI_COMABLE：探测包着 TFLAG:224 = 555（置位 → 调用 → 复位）', async () => {
  const { fixture, mod } = load_register();
  const { com_able_family } = fixture.load_module('system/train/com-family');
  fixture.store.set('traincommandname:0', '爱抚');
  const seen = [];
  com_able_family.register(0, async () => {
    seen.push(fixture.store.get('tflag:224'));
    return 1;
  });

  assert.equal(await mod.multi_comable(0), 1);

  assert.deepEqual(seen, [555], '探测时旗标必须是 555（口上索求抑制）');
  assert.equal(fixture.store.get('tflag:224'), 0, '探测后复位');
});

// —— @COMSEQSUB_PRINT_COMLIST（:162-179） ——

test('PRINT_COMLIST：可登记指令的按钮列表，编号印 L_I 本身', async () => {
  const { fixture, mod } = load_register();
  fixture.store.set('traincommandname:0', '爱抚');
  fixture.store.set('traincommandname:40', '打屁股');
  fixture.store.set('traincommandname:110', '穿脱衣服');
  const { com_able_family } = fixture.load_module('system/train/com-family');
  com_able_family.register(40, async () => 0); // 打屁股当前不可用

  await mod.print_comlist();

  const buttons = fixture.lines
    .filter((l) => l.type === 'button')
    .map((b) => [b.accelerator, b.text]);
  // 零实现态其余全可用；40 被 COM_ABLE 拦下、高级 COM（TRAINNAME 空）无按钮
  const map = new Map(buttons);
  assert.equal(map.get(0), '爱抚');
  assert.equal(map.get(110), '穿脱衣服', '登记面编号是 L_I（110 不折位次）');
  assert.ok(!map.has(40), 'COM_ABLE=0 不得出现在登记面');
  assert.ok(!map.has(84), '高级 COM（TRAINNAME 空）不得出现在登记面');
});

// —— @COMSEQ_REGISTER（:25-121） ——

test('COMSEQ_REGISTER：登记一条后保存并返回（槽位/长度/旗标终态）', async () => {
  const { fixture, mod } = load_register();
  fixture.store.set('traincommandname:0', '爱抚');
  fixture.reset_inputs(0, 1000); // 第 1 条选爱抚 → 保存并返回

  await mod.comseq_register();

  assert.equal(fixture.store.get('flag:551'), 0);
  assert.equal(fixture.store.get('flag:550'), 1, '首条覆盖式开新菜单');
  assert.equal(fixture.store.get('tflag:204'), 0, ':120 完成后清 TFLAG:204');
  assert.ok(fixture.text_lines().some((t) => t.includes('调教菜单登录完毕')));
  assert.equal(fixture.waits.at(-1)?.waited, true, ':119 PRINTW 等键');
});

test('COMSEQ_REGISTER：首步取消（1000）→ 原菜单不动', async () => {
  const { fixture, mod } = load_register();
  seed_menu(fixture, [6]);
  fixture.reset_inputs(1000);

  await mod.comseq_register();

  assert.equal(fixture.store.get('flag:550'), 1, '已有菜单不被清');
  assert.equal(fixture.store.get('flag:551'), 6);
});

test('COMSEQ_REGISTER：登记中途的出口文案切换（取消并返回 → 保存并返回）', async () => {
  const { fixture, mod } = load_register();
  fixture.store.set('traincommandname:0', '爱抚');
  fixture.reset_inputs(0, 1000);
  await mod.comseq_register();

  // ScreenBlock 重绘会清掉上一屏——屏史（lines_history）里两屏都在
  const labels = fixture.lines_history
    .filter((l) => l.type === 'button' && l.accelerator === 1000)
    .map((b) => b.text);
  assert.equal(labels[0], '取消并返回');
  assert.equal(labels.at(-1), '保存并返回');
});

test('COMSEQ_REGISTER：重复指令[999]把已登记段循环复制到满 10 条', async () => {
  const { fixture, mod } = load_register();
  fixture.store.set('traincommandname:0', '爱抚');
  fixture.store.set('traincommandname:6', '接吻');
  // 登记 2 条（0、6）→ 重复指令：以 2 为周期填满 10
  fixture.reset_inputs(0, 6, 999);

  await mod.comseq_register();

  assert.equal(fixture.store.get('flag:550'), 10, '重复指令填满 10 条');
  assert.deepEqual(
    Array.from({ length: 10 }, (_, i) => fixture.store.get(`flag:${551 + i}`)),
    [0, 6, 0, 6, 0, 6, 0, 6, 0, 6],
    ':84-86 以 LOCAL:1 为周期的模板槽复制',
  );
});

test('COMSEQ_REGISTER：重置菜单[998]清 550-560 与本会话计数', async () => {
  const { fixture, mod } = load_register();
  seed_menu(fixture, [0, 6]);
  fixture.reset_inputs(998, 1000); // 重置 → 重画（0 条）→ 取消并返回

  await mod.comseq_register();

  for (let slot = 550; slot <= 560; slot += 1) {
    assert.equal(fixture.store.get(`flag:${slot}`), 0, `flag:${slot} 未清`);
  }
});

test('COMSEQ_REGISTER：登满 10 条自动进完成段（不再要输入）', async () => {
  const { fixture, mod } = load_register();
  fixture.store.set('traincommandname:0', '爱抚');
  fixture.reset_inputs(0, 0, 0, 0, 0, 0, 0, 0, 0, 0); // 恰 10 次输入

  await mod.comseq_register();

  assert.equal(
    fixture.store.get('flag:550'),
    10,
    ':111-113 第 10 条登记后直入完成段（<= 9 边界）',
  );
  // 输入队列耗尽未抛错 = 完成段不再要输入
});

test('COMSEQ_REGISTER：每轮重画带「选择第N个指令:」行', async () => {
  const { fixture, mod } = load_register();
  fixture.store.set('traincommandname:0', '爱抚');
  fixture.reset_inputs(0, 1000);

  await mod.comseq_register();

  const prompts = history_texts(fixture).filter((t) => t.includes('个指令:'));
  assert.deepEqual(prompts, ['选择第1个指令:', '选择第2个指令:']);
});

// —— @COMSEQ_TRAIN 与 CALLTRAIN 等价（:207-237 / :230） ——

test('COMSEQ_TRAIN：预检查有不可用条目 → 整体拒绝，零执行', async () => {
  const { fixture, mod } = load_register();
  const { com_able_family, com_family } = fixture.load_module(
    'system/train/com-family',
  );
  const { on } = fixture.load_module('system/event/registry');
  fixture.store.set('traincommandname:0', '爱抚');
  fixture.store.set('traincommandname:6', '接吻');
  seed_menu(fixture, [0, 6]);
  com_able_family.register(6, async () => 0); // 第 2 条不可用
  const fired = [];
  com_family.register(0, async () => fired.push('COM0'));
  on('EVENTCOM', () => fired.push('EVENTCOM'));
  const prevcom_before = 12;
  fixture.load_module('era-utils/era-flag').prevcom = prevcom_before;
  fixture.store.set('tflag:224', 0);

  await mod.comseq_train();

  assert.deepEqual(fired, [], '任何一条不可用即整段拒绝（:222-224 BREAK）');
  assert.ok(
    fixture.text_lines().some((t) => t.includes('所登录的指令目前无法实行')),
  );
  assert.equal(fixture.store.get('tflag:224'), 0, ':233 拒绝路径复位旗标');
  assert.equal(
    fixture.load_module('era-utils/era-flag').prevcom,
    prevcom_before,
    ':236 PREVCOM 恢复',
  );
});

test('COMSEQ_TRAIN：序列执行——EVENTCOM→COM→EVENTCOMEND 每条一回合，PREVCOM 恢复', async () => {
  const { fixture, mod } = load_register();
  const { com_family } = fixture.load_module('system/train/com-family');
  const { on } = fixture.load_module('system/event/registry');
  fixture.store.set('traincommandname:0', '爱抚');
  fixture.store.set('traincommandname:6', '接吻');
  seed_menu(fixture, [0, 6]);
  const fired = [];
  com_family.register(0, async () => fired.push('COM0'));
  com_family.register(6, async () => fired.push('COM6'));
  on('EVENTCOM', () => fired.push('EVENTCOM'));
  on('EVENTCOMEND', () => fired.push('EVENTCOMEND'));
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.prevcom = 12; // 进函数时的原值（恢复的锚）

  await mod.comseq_train();

  assert.deepEqual(fired, [
    'EVENTCOM',
    'COM0',
    'EVENTCOMEND',
    'EVENTCOM',
    'COM6',
    'EVENTCOMEND',
  ]);
  assert.equal(era_flag.prevcom, 12, ':236 序列后 PREVCOM 恢复原值');
  assert.equal(
    fixture.store.get('tflag:224'),
    0,
    'CALLTRAINEND 复位（:243-245）',
  );
  assert.equal(
    fixture.store.get('flag:10011'),
    6,
    'SELECTCOM 停在序列末条（引擎行为）',
  );
});

test('COMSEQ_TRAIN：预检查的 PREVCOM 推进——探测第 k 条时它是第 k-1 条', async () => {
  const { fixture, mod } = load_register();
  const { com_able_family } = fixture.load_module('system/train/com-family');
  fixture.store.set('traincommandname:0', '爱抚');
  fixture.store.set('traincommandname:6', '接吻');
  seed_menu(fixture, [0, 6]);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.prevcom = 12;
  const seen_prevcom = [];
  // handler 参数经 args 透传（DispatchFamily 契约），id 闭包捕获
  const probe = (id) => async () => {
    seen_prevcom.push([id, era_flag.prevcom]);
    return 1;
  };
  com_able_family.register(0, probe(0));
  com_able_family.register(6, probe(6));

  await mod.comseq_train();

  // 前两轮是函数头 comseq_show 的显示探测（:209 → :131，PREVCOM 未动）；
  // 后两轮是预检查（:220-227 探测在前、PREVCOM 推进在后）：首轮见进函数
  // 原值，次轮见首轮条号
  assert.deepEqual(seen_prevcom, [
    [0, 12],
    [6, 12],
    [0, 12],
    [6, 0],
  ]);
});

test('run_calltrain：@COMxx 未移植（COM_MISSING）跳过该回合，序列继续', async () => {
  const { fixture, mod } = load_register();
  const { com_family } = fixture.load_module('system/train/com-family');
  const { on } = fixture.load_module('system/event/registry');
  const fired = [];
  com_family.register(6, async () => fired.push('COM6')); // 0 号未注册（缺失）
  on('EVENTCOMEND', () => fired.push('EVENTCOMEND'));
  fixture.store.set('tflag:224', 555); // 调用方 COMSEQ_TRAIN 先置位（:213）

  await mod.run_calltrain([0, 6]);

  // 0 号：COM 缺失 → 该回合中止、不进 EVENTCOMEND（引擎「重新要求输入」
  // 在无输入的自动循环里无位可落，ere 取跳过——train-loop 同构语义）
  assert.deepEqual(fired, ['COM6', 'EVENTCOMEND'], '缺失条跳过、后续照跑');
  assert.equal(fixture.store.get('tflag:224'), 0, '序列结束 CALLTRAINEND 复位');
});

test('calltrainend：单独可调（引擎回调位，TFLAG:224 = 0）', async () => {
  const { fixture, mod } = load_register();
  fixture.store.set('tflag:224', 555);
  mod.calltrainend();
  assert.equal(fixture.store.get('tflag:224'), 0);
});
