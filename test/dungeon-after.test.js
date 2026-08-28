/**
 * ere/dungeon/dungeon-after.js @DUNGEON_AFTER + @GOHOUBI + @OSIOKI 的行为
 * 测试（issue #179，H10）；口上分发层（ere/kojo/kojo-dungeon-after.js）
 * 的落空与命中一并在此验。
 *
 * 缝 = test/helpers/era-fixture.js。菜单输入经 set_inputs 预置（夹具的
 * input 消费序）；PRINTW 的等键是 waitAnyKey（不消耗预置输入）。
 *
 * 验收对应（#179 清单）：
 *   - @DUNGEON_AFTER 的分派条件：CFLAG:x:1 == 5 → 奖赏臂、== 6 → 惩罚臂，
 *     两臂结束各自把状态清 0；其余状态不动作——**分派条件各有测试**；
 *   - @GOHOUBI / @OSIOKI 的档位表、菜单选择与身体/能力定臂、
 *     choice 序号（原作 TFLAG:18 的链内传参，见 kojo-dungeon-after.js 头注）、点数/经验落点抽查；
 *   - 输入循环（负值 / 越界重输）；
 *   - 口上族空间内缺失合法（落空静默）、register 后被调、TARGET 的
 *     暂存/置/还原（SWAP 语义）。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function load(fixture) {
  return fixture.load_module('dungeon/dungeon-after');
}

/**
 * 最小世界：魔王 0 + 奴隶 1（阿尔，等级 5、顺从 2、欲望 3、空闲）。
 * 各用例自行覆盖 CFLAG:1（状态）/ CFLAG:504（要求的奖赏）。
 */
function setup_world() {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.seed_chara(1, { id: 1, name: '阿尔', callname: '阿尔' });
  fixture.era.addCharacter(0);
  fixture.era.addCharacter(1);
  fixture.store.set('cflag:1:9', 5); // 等级 5
  fixture.store.set('abl:1:10', 2); // 顺从 2 → 奖赏档 600 / 惩罚档 200
  fixture.store.set('abl:1:11', 3); // 欲望 3 → 惩罚苦痛/屈服档 400
  fixture.era.set('flag:10004', 100000); // MONEY（era_flag.money ↔ flag:10004）
  return fixture;
}

function text_lines(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

// —— @DUNGEON_AFTER 分派条件（验收：两条臂各有测试）——

test('分派：CFLAG:1 == 5 → 奖赏臂（GOHOUBI 文本 + 状态清 0）', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:1', 5);
  fixture.set_inputs(0); // 选 [0] 应份
  const { dungeon_after } = load(fixture);
  await dungeon_after(1);
  const lines = text_lines(fixture);
  assert(
    lines.some((l) => l.includes('打倒了勇者，凯旋而归')),
    '奖赏臂的开场文本',
  );
  assert.equal(fixture.store.get('cflag:1:1'), 0, '状态清 0（:9）');
});

test('分派：CFLAG:1 == 6 → 惩罚臂（OSIOKI 文本 + 状态清 0）', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:1', 6);
  fixture.set_inputs(0); // 选 [0] 什么也不做
  const { dungeon_after } = load(fixture);
  await dungeon_after(1);
  const lines = text_lines(fixture);
  assert(
    lines.some((l) => l.includes('没有发现勇者（或者是输了）')),
    '惩罚臂的开场文本',
  );
  assert.equal(fixture.store.get('cflag:1:1'), 0, '状态清 0（:12）');
});

test('分派：CFLAG:1 为其他值（0/2/5 之外）不进任何臂、状态不动', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:1', 3); // 迎击中——非 5 非 6
  const { dungeon_after } = load(fixture);
  await dungeon_after(1);
  assert.equal(fixture.store.get('cflag:1:1'), 3, '状态原样');
  assert.equal(text_lines(fixture).length, 0, '零输出（不进臂）');
});

// —— @GOHOUBI ——

test('GOHOUBI [0] 应份：否定点数 = LV*60、勋章无', async () => {
  const fixture = setup_world();
  fixture.set_inputs(0);
  const { gohoubi } = load(fixture);
  await gohoubi(1);
  assert.equal(fixture.store.get('juel:1:100'), 300, 'LV5 × 60 = 300');
  assert.equal(fixture.store.get('exp:1:81'), undefined, '无勋章经验');
});

test('GOHOUBI [1] 勋章：勋章经验 +1；乳首穿孔位（CFLAG:7 & 1）的换钉行', async () => {
  const fixture = setup_world();
  fixture.set_inputs(1);
  const { gohoubi } = load(fixture);
  await gohoubi(1);
  assert.equal(fixture.store.get('exp:1:81'), 1, 'EXP:81 +1');
  assert(!text_lines(fixture).some((l) => l.includes('乳钉')), '无穿孔位');
  // 穿孔位立起 → 换钉行出现
  const pierced = setup_world();
  pierced.store.set('cflag:1:7', 1);
  pierced.set_inputs(1);
  const { gohoubi: gohoubi2 } = load(pierced);
  await gohoubi2(1);
  assert(
    text_lines(pierced).some((l) => l.includes('毫不犹豫地把乳钉换成了勋章')),
    'CFLAG:7 & 1 → 换钉行（:75-76）',
  );
});

test('GOHOUBI [2] 金币档（504=0）：钱够 → 扣 LV*100（MONEY 与非作弊资金）', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:504', 0);
  fixture.set_inputs(2);
  const { gohoubi } = load(fixture);
  await gohoubi(1);
  assert.equal(fixture.era.get('flag:10004'), 100000 - 500, 'MONEY -= 500');
  assert.equal(fixture.store.get('exflag:4444'), -500, 'EX_FLAG:4444 -= 500');
});

test('GOHOUBI [2] 金币档（504=0）：钱不够 → 回落否定点数、不扣钱', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:504', 0);
  fixture.era.set('flag:10004', 100); // < 500
  fixture.set_inputs(2);
  const { gohoubi } = load(fixture);
  await gohoubi(1);
  assert.equal(fixture.era.get('flag:10004'), 100, '钱未动');
  assert.equal(fixture.store.get('juel:1:100'), 300, '回落 LV*60');
  assert(
    text_lines(fixture).some((l) => l.includes('金库里没有那么多钱')),
    '金库不足的播报',
  );
});

test('GOHOUBI [2] 犬兽奸档（504=1）：处女/男人 → 肛门臂，否则私处臂', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:504', 1);
  fixture.store.set('talent:1:122', 1); // 男人 → 肛门臂
  fixture.set_inputs(2);
  const { gohoubi } = load(fixture);
  await gohoubi(1);
  // 顺从 2 → 档 600；JUEL:2 肛门、JUEL:5 欲情
  assert.equal(fixture.store.get('juel:1:2'), 600, '肛门点数 600');
  assert.equal(fixture.store.get('juel:1:5'), 600, '欲情点数 600');
  assert.equal(fixture.store.get('exp:1:1'), 10, '肛门经验 +10');
  assert.equal(fixture.store.get('exp:1:56'), 10, '兽奸经验 +10');
  assert.equal(fixture.store.get('juel:1:1'), undefined, '私处未动');

  const vaginal = setup_world();
  vaginal.store.set('cflag:1:504', 1); // 无处女/男人标记 → 私处臂
  vaginal.set_inputs(2);
  const { gohoubi: gohoubi2 } = load(vaginal);
  await gohoubi2(1);
  assert.equal(vaginal.store.get('juel:1:1'), 600, '私处点数 600');
  assert.equal(vaginal.store.get('exp:1:0'), 10, '私处经验 +10');
});

test('GOHOUBI [2] 馬兽奸档（504=3）：扩张经验随臂（肛门 53 / 私处 52）', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:504', 3);
  fixture.store.set('talent:1:0', 1); // 处女 → 肛门臂
  fixture.set_inputs(2);
  const { gohoubi } = load(fixture);
  await gohoubi(1);
  assert.equal(fixture.store.get('exp:1:53'), 10, '肛门扩张经验 +10');
  assert.equal(fixture.store.get('exp:1:52'), undefined);
});

test('GOHOUBI [2] 接吻档（504=4）：爱情经验 +10、无点数', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:504', 4);
  fixture.set_inputs(2);
  const { gohoubi } = load(fixture);
  await gohoubi(1);
  assert.equal(fixture.store.get('exp:1:23'), 10, '爱情经验 +10');
  assert.equal(fixture.store.get('juel:1:5'), undefined, '无欲情点数');
});

test('GOHOUBI [2] 性交档（504=5）：私处感觉 > 肛门感觉 → 私处臂', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:504', 5);
  fixture.store.set('abl:1:2', 3);
  fixture.store.set('abl:1:3', 1);
  fixture.set_inputs(2);
  const { gohoubi } = load(fixture);
  await gohoubi(1);
  assert.equal(fixture.store.get('exp:1:0'), 10, '私处经验 +10');
  assert.equal(fixture.store.get('exp:1:5'), 10, '性交经验 +10');

  const anal = setup_world();
  anal.store.set('cflag:1:504', 5);
  anal.store.set('abl:1:2', 1);
  anal.store.set('abl:1:3', 3);
  anal.set_inputs(2);
  const { gohoubi: gohoubi2 } = load(anal);
  await gohoubi2(1);
  assert.equal(anal.store.get('exp:1:1'), 10, '肛门经验 +10');
  assert.equal(anal.store.get('exp:1:5'), 10, '性交经验 +10');
});

test('GOHOUBI [2] 精液档（504=6）：口交 +10 / 精液 +5、欲情 600', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:504', 6);
  fixture.set_inputs(2);
  const { gohoubi } = load(fixture);
  await gohoubi(1);
  assert.equal(fixture.store.get('exp:1:22'), 10, '口交经验 +10');
  assert.equal(fixture.store.get('exp:1:20'), 5, '精液经验 +5');
  assert.equal(fixture.store.get('juel:1:5'), 600);
});

test('GOHOUBI [2] 饮尿档（504=8）：魔王非扶她非男人 → 秘裂', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:504', 8);
  fixture.set_inputs(2);
  const { gohoubi } = load(fixture);
  await gohoubi(1);
  assert(
    text_lines(fixture).some((l) => l.includes('秘裂')),
    '魔王无肉棒 → 秘裂（\\@ !121 && !122 ? 秘裂 # 阴茎 \\@）',
  );
  assert.equal(fixture.store.get('juel:1:5'), 600, '欲情点数 600');

  const phallic = setup_world();
  phallic.store.set('cflag:1:504', 8);
  phallic.store.set('talent:0:121', 1); // 扶她 → 阴茎
  phallic.set_inputs(2);
  const { gohoubi: gohoubi2 } = load(phallic);
  await gohoubi2(1);
  assert(
    text_lines(phallic).some((l) => l.includes('阴茎')),
    '扶她 → 阴茎',
  );
});

test('GOHOUBI 菜单输入循环：负值与 >= 3 重输，0 终过', async () => {
  const fixture = setup_world();
  fixture.set_inputs(-1, 9, 0);
  const { gohoubi } = load(fixture);
  await gohoubi(1);
  const inputs = fixture.inputs_consumed.filter((i) => i.api === 'input');
  assert.equal(inputs.length, 3, '三次 input');
  assert.equal(
    fixture.store.get('juel:1:100'),
    300,
    '第三次输入 0 生效（应份的否定点数 LV5×60）',
  );
});

// —— @OSIOKI ——

test('OSIOKI [0] 什么也不做：无点数', async () => {
  const fixture = setup_world();
  fixture.set_inputs(0);
  const { osioski } = load(fixture);
  await osioski(1);
  assert.equal(fixture.store.get('juel:1:6'), undefined, '无屈服点数');
});

test('OSIOKI [1] 电椅刑：抖M >= 3 的恍惚臂三系点数，否则两系', async () => {
  const fixture = setup_world();
  fixture.store.set('abl:1:21', 3); // 抖M 3 → 恍惚臂
  fixture.set_inputs(1);
  const { osioski } = load(fixture);
  await osioski(1);
  // 欲望 3 → 苦痛/屈服 400；顺从 2 → 欲情 200
  assert.equal(fixture.store.get('juel:1:9'), 400, '苦痛点数 400');
  assert.equal(fixture.store.get('juel:1:5'), 200, '欲情点数 200');
  assert.equal(fixture.store.get('juel:1:6'), 400, '屈服点数 400');

  const crying = setup_world();
  crying.store.set('abl:1:21', 0);
  crying.set_inputs(1);
  const { osioski: osioski2 } = load(crying);
  await osioski2(1);
  assert.equal(crying.store.get('juel:1:9'), 400, '哭叫臂也有苦痛');
  assert.equal(
    crying.store.get('juel:1:5'),
    undefined,
    '哭叫臂无欲情（:422-428）',
  );
});

test('OSIOKI [2] 当街自慰刑：露出 >= 4 的自嘲臂 vs 羞耻臂', async () => {
  const fixture = setup_world();
  fixture.store.set('abl:1:17', 4);
  fixture.set_inputs(2);
  const { osioski } = load(fixture);
  await osioski(1);
  assert.equal(fixture.store.get('exp:1:10'), 3, '自慰经验 +3');
  assert.equal(fixture.store.get('exp:1:11'), 3, '调教自慰经验 +3');
  assert.equal(fixture.store.get('juel:1:8'), undefined, '恍惚臂无耻情');

  const shy = setup_world();
  shy.store.set('abl:1:17', 0);
  shy.set_inputs(2);
  const { osioski: osioski2 } = load(shy);
  await osioski2(1);
  assert.equal(shy.store.get('juel:1:8'), 400, '羞耻臂耻情 400');
  assert.equal(shy.store.get('exp:1:10'), 1, '自慰经验 +1');
});

test('OSIOKI [5] 小便器刑：受虐狂（88）或淫乱（76）定臂', async () => {
  const fixture = setup_world();
  fixture.store.set('talent:1:76', 1); // 淫乱 → 兴奋臂
  fixture.set_inputs(5);
  const { osioski } = load(fixture);
  await osioski(1);
  assert.equal(fixture.store.get('juel:1:5'), 200, '兴奋臂欲情 200');
  assert(text_lines(fixture).some((l) => l.includes('用嘴巴接饮着小便')));
});

test('OSIOKI [8] 媚药放置刑：药物经验 +10、三系点数', async () => {
  const fixture = setup_world();
  fixture.set_inputs(8);
  const { osioski } = load(fixture);
  await osioski(1);
  assert.equal(fixture.store.get('exp:1:57'), 10, '药物经验 +10');
  assert.equal(fixture.store.get('juel:1:9'), 400);
  assert.equal(fixture.store.get('juel:1:6'), 400);
  assert(text_lines(fixture).some((l) => l.includes('你走出了房间')));
});

test('OSIOKI 菜单输入循环：>= 9 重输，8 终过', async () => {
  const fixture = setup_world();
  fixture.set_inputs(12, 8);
  const { osioski } = load(fixture);
  await osioski(1);
  const inputs = fixture.inputs_consumed.filter((i) => i.api === 'input');
  assert.equal(inputs.length, 2, '两次 input');
  assert.equal(
    fixture.store.get('exp:1:57'),
    10,
    '第二次输入 8 生效（媚药放置的药物经验）',
  );
});

// —— 口上分发层（ere/kojo/kojo-dungeon-after.js）——

test('口上族：无性格素质（GET_KOJO_NUM = 0）不进分派守卫，静默走完', async () => {
  const fixture = setup_world();
  fixture.set_inputs(0);
  const { gohoubi } = load(fixture);
  await gohoubi(1); // 阿尔无性格素质 → LOCAL 0 → 守卫不进
  assert.equal(
    fixture.store.get('juel:1:100'),
    300,
    '奖赏本体照常结算（分派层空转）',
  );
});

test('口上族：命中已注册 → 实现收 (cid, choice)、TARGET 暂存还原；未注册落空', async () => {
  const fixture = setup_world();
  fixture.store.set('talent:1:163', 1); // 高貴 → GET_KOJO_NUM = 103
  fixture.set_inputs(1); // 选 [1] 勋章 → choice = 1
  // 往族里挂一个哨兵实现（DispatchFamily 是模块单例，测试内注册后须清）
  const kojo = fixture.load_module('kojo/kojo-dungeon-after');
  const calls = [];
  kojo.gohoubi_after_koujo_family.register(3, (cid, choice) => {
    calls.push([cid, choice]);
  });
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 7; // 预置一个 target 看还原
  const { gohoubi } = load(fixture);
  await gohoubi(1);
  assert.deepEqual(
    calls,
    [[1, 1]],
    'K3 实现收到 cid 与 choice（原作读 TFLAG:18 的链内等价）',
  );
  assert.equal(era_flag.target, 7, 'TARGET 还原（SWAP LOCAL:2, TARGET）');
  // 未注册的惩罚族 → 落空静默（不抛错）
  fixture.store.set('cflag:1:1', 6);
  fixture.set_inputs(0);
  const { dungeon_after } = load(fixture);
  await dungeon_after(1);
  assert.equal(fixture.store.get('cflag:1:1'), 0, '惩罚臂正常走完（落空）');
});
