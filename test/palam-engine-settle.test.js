/**
 * 调教结算交还引擎（#874）：回合内的 UP/DOWN 只写 delta，palam 由引擎的
 * nextTurnInTrain 加算并清零。
 *
 * 缝 = test/helpers/era-fixture.js（#874 起它的 nextTurnInTrain 镜像引擎的
 * delta→palam，此前这一件由游戏侧当场结算，夹具只补了 SOURCE 清零）。
 *
 * 核心证据是工单要求的「同一份输出 + 同一份 palam 终值」：下面每个基准值都
 * 取自改动前（当场写 palam + 事后清 delta）的实测，回合取 COM0 一轮、含
 * 一次绝顶的 DOWN（阴核 9000+3640-9000=3640）与落在 ORDER 末位的 15 号
 * UP（局部 0+1234=1234），因此同时压住「算式五段」「DOWN 段」「ORDER 尾」
 * 三个面。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

/** NBSP 归一成空格：宽度信息不丢（1:1 替换），读起来能对格式 */
const narrow = (line) => line.replace(/\u00A0/g, ' ');

/** 改动前的结算块逐字（NBSP 已归一），取自同一份种子的实测 */
const SETTLE_GOLDEN = [
  '阴核  9000+  3640-  9000=  3640',
  '乳房     0+    15       =    15',
  '润滑     0+   731       =   731（晨露般稍湿）',
  '恭顺     0+    14       =    14（没有好感）',
  '欲情     0+   570       =   570（正在发情）',
  '屈服     0+   100       =   100（还未屈服）',
  '习得     0+    34       =    34（不是很懂）',
  '耻情     0+   600       =   600（感到害羞）',
  '反感     0+   318       =   318（有点反感）',
  '不快     0+    30       =    30（没有感到不快）',
  '抑郁     0+    24       =    24（没有郁闷）',
  '足     0+  1234       =  1234',
];

/** 改动前的回合末 palam（逐号） */
const PALAM_GOLDEN = {
  0: 3640,
  3: 731,
  4: 14,
  5: 570,
  6: 100,
  7: 34,
  8: 600,
  11: 318,
  12: 30,
  13: 24,
  14: 15,
  15: 1234,
};

/**
 * 一回合：COM0（爱抚）→ 种子 → SOURCE_CHECK。
 *
 * 种子三件：ABL:31:0 = 8 让爱抚源落进已知档、PALAM:31:0 = 9000 令本轮
 * 阴核过 PALAMLV:4 触发绝顶的 DOWN、SOURCE:31:18 = 1234 走
 * source_check_up_free 落 UP:15（ORDER 末位）。
 *
 * @returns {Promise<object>} 夹具（**未调用** nextTurnInTrain：结算前后
 *   两种状态都要能被用例观察到）
 */
async function run_round() {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  fixture.era.beginTrain(0, 31);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = 0;
  era_flag.prevcom = 12;
  fixture.store.set('maxbase:31:0', 2000);
  fixture.store.set('maxbase:31:1', 2000);
  fixture.store.set('base:31:0', 1450);
  fixture.store.set('base:31:1', 410);
  // TALENT:0:122 = 男人：避免 source_sex_check() 把未声明的双方误判成同性
  fixture.store.set('talent:0:122', 1);
  fixture.store.set('abl:31:0', 8);
  fixture.store.set('abl:0:12', 5);
  fixture.store.set('palam:31:0', 9000);
  fixture.load_module('system/train/com-caress');
  fixture.load_module('system/train/source-check');
  const { com_family } = fixture.load_module('system/train/com-family');
  const { emit } = fixture.load_module('system/event/registry');
  await com_family.call(0);
  // COM0 之后补种子：COM0 会覆写这些源/名字
  fixture.store.set('source:31:18', 1234);
  fixture.store.set('cstr:31:7', '足');
  await emit('SOURCE_CHECK');
  return fixture;
}

/** 某角色的 palam 逐号快照（只取 store 里存在的键） */
function palam_snapshot(fixture, cid) {
  const out = {};
  const prefix = `palam:${cid}:`;
  for (const key of [...fixture.store.keys()]) {
    if (key.startsWith(prefix)) {
      out[Number(key.slice(prefix.length))] = fixture.store.get(key);
    }
  }
  return out;
}

test('结算交还引擎：同一份输出与同一份 palam 终值（绝顶 DOWN + ORDER 末位 UP）', async () => {
  const fixture = await run_round();
  const texts = fixture.text_lines();

  // 1) 展示行与改动前逐字一致：结算块是本回合输出的尾部，12 个有变动的
  //    参数各一行（含 DOWN 的阴核行与 ORDER 末位的 15 号行）
  assert.deepEqual(
    texts.slice(-SETTLE_GOLDEN.length).map(narrow),
    SETTLE_GOLDEN,
    '参数变动行的算式（旧值/UP/DOWN/结算后的值）与文案必须与改动前一致',
  );

  // 2) 结算之前：palam 一格没动，本轮的变动全在 delta，DOWN 是负的
  assert.equal(
    fixture.store.get('palam:31:0'),
    9000,
    'palam 不应当场写：旧值原样留着',
  );
  assert.equal(
    fixture.store.get('palam:31:15'),
    undefined,
    '本轮新出现的参数在结算前连键都不该有',
  );
  assert.equal(
    fixture.store.get('delta:31:0'),
    -5360,
    'DOWN 并进 delta：9000+3640-9000 的减法落在 delta 上（3640-9000）',
  );
  assert.equal(
    fixture.store.get('delta:31:15'),
    1234,
    'ORDER 末位的 UP:15 留在 delta 里',
  );
  assert.equal(fixture.store.get('delta:31:14'), 15);

  // 3) 引擎结算一次：终值与改动前逐个相同
  fixture.era.nextTurnInTrain();
  assert.deepEqual(
    palam_snapshot(fixture, 31),
    PALAM_GOLDEN,
    'palam 终值（引擎 delta→palam 之后）与改动前的当场结算逐号相同',
  );

  // 4) delta 由引擎清零，游戏侧不再重复做
  for (const index of Object.keys(PALAM_GOLDEN)) {
    assert.equal(
      fixture.store.get(`delta:31:${index}`),
      0,
      `delta:${index} 由 nextTurnInTrain 清零`,
    );
  }
});

test('引擎结算只发生一次：重复 nextTurnInTrain 不重复累加', async () => {
  const fixture = await run_round();
  fixture.era.nextTurnInTrain();
  fixture.era.nextTurnInTrain();
  assert.deepEqual(
    palam_snapshot(fixture, 31),
    PALAM_GOLDEN,
    '第二次 nextTurnInTrain 时 delta 已是 0，palam 不该再涨一次',
  );
});

test('save_train_desire：读结算后的值，本轮 UP 非 0 时 CFLAG:668 带上它', async () => {
  // 调教收尾在 endTrain 之前跑，此时最后一轮的增量可能还在 delta 里。
  // 只读 palam 会少掉本轮的欲情——次日「献出初次」的两档加分就失效。
  const fixture = await run_round();
  const { save_train_desire } = fixture.load_module('system/train/train-end');

  const palam5 = fixture.store.get('palam:31:5') || 0;
  const delta5 = fixture.store.get('delta:31:5');
  assert.ok(delta5 > 0, '本回合欲情有非 0 的增量（前提）');
  save_train_desire();
  assert.equal(
    fixture.store.get('cflag:31:668'),
    palam5 + delta5,
    '未结算时快照把本轮的增量算进去',
  );

  // 结算之后读同一个数：两种时机取到的欲情必须一致
  fixture.era.nextTurnInTrain();
  save_train_desire();
  assert.equal(
    fixture.store.get('cflag:31:668'),
    PALAM_GOLDEN[5],
    '结算后的快照与结算前取到同一个值',
  );
});

test('nextTurnInTrain 对未声明的 delta 序号得 NaN：写入点必须落在 Palam.yml 声明集内', async () => {
  // 引擎按 Object.keys(data.delta[角色]) 逐个 `palam[t] += delta[t]`：声明
  // 序号由 addCharacterForTrain 预置 0，未声明序号没有那一格，`undefined + n`
  // 得 NaN，且此后每回合加 0 也回不来（#923 的 16/17 号）。夹具镜像同一分歧，
  // 好让「ORDER 与 delta 写入点只用 0–15、100」这条约束有测试可守。
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  fixture.era.beginTrain(0, 31);
  const declared = fixture.era.get('palamkeys');
  assert.ok(declared.includes(100), 'Palam.yml 的声明集含断档后的 100');
  assert.ok(!declared.includes(16), '16 号未声明（夹具据此还原 NaN）');

  fixture.store.set('delta:31:16', 7);
  fixture.store.set('delta:31:3', 5);
  fixture.era.nextTurnInTrain();

  assert.ok(
    Number.isNaN(fixture.store.get('palam:31:16')),
    '未声明序号被污染成 NaN',
  );
  assert.equal(
    fixture.store.get('palam:31:3'),
    5,
    '声明序号照常结算（未声明的坏键不连累别的号）',
  );
  assert.equal(
    fixture.era.get('palam:31:16') || 0,
    0,
    '游戏侧一律 `|| 0` 读值，NaN 是假值——污染被读侧吞掉，这正是它难被发现的原因',
  );
});

/** 改动前的结算块（含三处分隔线），取自 master 的同一份种子（NBSP 已归一） */
const DOWN_BLOCK_GOLDEN = [
  '阴核 10000+  3640-  9000=  4640',
  '私处 10000       -  9000=  1000',
  '肛门 10000       -  9000=  1000',
  '乳房 10000+    15-  9000=  1015',
  '<divider>',
  '润滑     0+   731       =   731（晨露般稍湿）',
  '<divider>',
  '恭顺     0+ 16014       = 16014（寄予信赖）',
  '欲情     0+ 35008       = 35008（成为快乐的俘虏）',
  '屈服     0+ 21200       = 21200（顶礼膜拜）',
  '习得     0+    34       =    34（不是很懂）',
  '耻情     0+ 23300       = 23300（羞愧欲死）',
  '<divider>',
  '反感     0+ 11668       = 11668（抱有杀意）',
  '不快     0+    30       =    30（没有感到不快）',
  '抑郁     0+  5088       =  5088（消沉）',
];

test('分隔线与改动前一致：判据序号的 UP 折成负数时仍照画', async () => {
  // ORDER 前四位（0/1/2/14）各自绝顶：DOWN=9000 大于各自的本轮 UP，折进
  // delta 之后 up(0)/up(1)/up(2)/up(14) 全是负数。三处分隔线的判据读的正是
  // 这些 up(k)——若在打印循环里就折 DOWN，upid === 14 那条会静默消失
  // （#874 返工：与改动前对照实测少一条分隔线）。
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  fixture.era.beginTrain(0, 31);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = 0;
  era_flag.prevcom = 12;
  fixture.store.set('maxbase:31:0', 2000);
  fixture.store.set('maxbase:31:1', 2000);
  fixture.store.set('base:31:0', 1450);
  fixture.store.set('base:31:1', 410);
  fixture.store.set('talent:0:122', 1);
  fixture.store.set('abl:31:0', 8);
  fixture.store.set('abl:0:12', 5);
  for (const index of [0, 1, 2, 14]) {
    fixture.store.set(`palam:31:${index}`, 10000);
  }
  fixture.load_module('system/train/com-caress');
  fixture.load_module('system/train/source-check');
  const { com_family } = fixture.load_module('system/train/com-family');
  const { emit } = fixture.load_module('system/event/registry');
  await com_family.call(0);
  await emit('SOURCE_CHECK');

  const seq = fixture.lines.map((line) =>
    line.type === 'divider' ? '<divider>' : narrow(line.text ?? ''),
  );
  const start = seq.indexOf(DOWN_BLOCK_GOLDEN[0]);
  assert.ok(start >= 0, '结算块的第一行在场');
  assert.deepEqual(
    seq.slice(start),
    DOWN_BLOCK_GOLDEN,
    '结算块逐行一致：四条 DOWN 行 + 三处分隔线（14/3/10）的位置不变',
  );
  // 折进 delta 之后判据序号确实是负的——这条保证上面的用例真的压到了那个角
  for (const index of [0, 1, 2, 14]) {
    assert.ok(
      fixture.store.get(`delta:31:${index}`) < 0,
      `delta:${index} 是负的（DOWN 大于 UP）`,
    );
  }
});
