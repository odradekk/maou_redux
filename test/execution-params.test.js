/**
 * @file 处刑会话的显式传参（issue #817）。
 *
 * 批量处刑原先把 `era.beginTrain(0)` 当开关，只为让 tflag 16/500/510/520/530
 * 可寻址——口上靠这四个槽拿到处分方式与子选项，其中 K4、K7 直接读
 * `tflag:*`，其余性格经门面读同一个槽。本文件锁两件事：
 *
 *   1. 批量处刑不再调 beginTrain / endTrain；
 *   2. 五个处刑钩子从实参拿到原 tflag 的值。用例**不开调教窗口**，夹具的
 *      tflag 表在这种状态下按引擎语义抛「key error」——改回读 tflag 就会红。
 *
 * 末尾的逐字对照表是改动前跑出来的输出（单选版与批量版各一组，K4/K7 两个
 * 直读 tflag 的性格 × 方法 4-7），用来钉「输出与改动前一致」。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function seq(values) {
  let index = 0;
  return (n) => {
    const value = values[Math.min(index, values.length - 1)];
    index += 1;
    return Math.min(value, n - 1);
  };
}

/** 处刑对象：47 号（在 17-40 段外，方法 5 不会被【不受洗脑】拦下） */
const CID = 47;

/**
 * 场景世界：魔王 + 艾达。`kojo_module` 按性格载入口上文件（处分方式由它说话），
 * 返回前把 TARGET 置成处刑对象——五个入口都不自己设 TARGET。
 * @param {number} talent 性格素质编号（160 + 键）
 * @param {string} [kojo_module] 口上模块名
 * @returns {object} 夹具
 */
function seed_world(talent, kojo_module) {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.seed_chara(CID, { id: CID, name: '艾达', callname: '艾达' });
  fixture.era.addCharacter(0);
  fixture.era.addCharacter(CID);
  fixture.store.set(`cflag:${CID}:9`, 4); // 等级
  for (const slot of [550, 551, 552]) {
    fixture.store.set(`cflag:${CID}:${slot}`, -1); // 武装/装饰/装饰2 空
  }
  fixture.store.set(`talent:${CID}:${talent}`, 1);
  if (kojo_module !== undefined) {
    fixture.load_module(kojo_module);
  }
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = CID;
  return fixture;
}

function train_window_calls(fixture) {
  return fixture.calls.filter(
    (call) => call.api === 'beginTrain' || call.api === 'endTrain',
  );
}

function kojo_lines(fixture) {
  return fixture.text_lines();
}

/** 单选版：候选人下标 0 → 处分编号（不开调教窗口） */
async function run_single(fixture, method) {
  fixture.set_inputs(0, method);
  await fixture.load_module('event/event-execution').execution(seq([0]));
}

/** 批量版：目标打上处刑标签 → [121] 方法界面 → 处分编号 → [1999] 结束 */
async function run_batch(fixture, method) {
  fixture.store.set(`cflag:${CID}:777`, 1);
  fixture.set_inputs(121, method, 1999);
  await fixture
    .load_module('event/event-execution-batch')
    .batch_execution(seq([0]));
}

const GOLDEN = [
  {
    name: 'K4',
    method: 4,
    variant: 'single',
    lines: [
      '请选择处刑对象',
      '<60天以内再展出20名勇者到博物馆将解锁实绩！>',
      '「放，放开我！我…侍奉怪物什么的………呜…呜哇哇！！」',
      '威望值增加',
      '但你依然给艾达烙上了封锁所有力量的封印，',
      '被吸收了全部力量的她，身体变成淫靡的肉块了。',
      '作为地下城里怪物的慰问品被使用着，',
      '今后别说重新当勇者，就连看一眼阳光也不可能了吧。',
      '现在的肉便器数量：1',
      '《封印吸收了力量，使你获得了250的经验值！》',
    ],
  },
  {
    name: 'K4',
    method: 4,
    variant: 'batch',
    lines: [
      '<60天以内再展出20名勇者到博物馆将解锁实绩！>',
      '请选出处刑对象(可复选)',
      '标签：[售]可卖出  [☆]收藏中  [兵]已士兵化  [SP]特殊角色',
      '注意：以下0～4项的处刑会让人物永远从列表中消失（但可获得勋章或经验）',
      '      开启水晶球的话，则可记录0～6项的处刑影像',
      '「放，放开我！我…侍奉怪物什么的………呜…呜哇哇！！」',
      '威望值增加',
      '但你依然给艾达烙上了封锁所有力量的封印，',
      '被吸收了全部力量的她，身体变成淫靡的肉块了。',
      '作为地下城里怪物的慰问品被使用着，',
      '今后别说重新当勇者，就连看一眼阳光也不可能了吧。',
      '现在的肉便器数量：1',
      '《封印吸收了力量，使你获得了250的经验值！》',
      '<60天以内再展出20名勇者到博物馆将解锁实绩！>',
      '请选出处刑对象(可复选)',
      '标签：[售]可卖出  [☆]收藏中  [兵]已士兵化  [SP]特殊角色',
    ],
  },
  {
    name: 'K4',
    method: 5,
    variant: 'single',
    lines: [
      '请选择处刑对象',
      '<60天以内再展出20名勇者到博物馆将解锁实绩！>',
      '「讨厌…讨厌！我变得不像我自己了…不要！……不、要、啊…啊………」',
      '在艾达的身体上刻上了服从的刻印，',
      '只残留一点点的意识和记忆，',
      '命令其现在就去把勇者杀光。',
      '*法术的副作用导致其战斗力下降了*',
    ],
  },
  {
    name: 'K4',
    method: 5,
    variant: 'batch',
    lines: [
      '<60天以内再展出20名勇者到博物馆将解锁实绩！>',
      '请选出处刑对象(可复选)',
      '标签：[售]可卖出  [☆]收藏中  [兵]已士兵化  [SP]特殊角色',
      '注意：以下0～4项的处刑会让人物永远从列表中消失（但可获得勋章或经验）',
      '      开启水晶球的话，则可记录0～6项的处刑影像',
      '「讨厌…讨厌！我变得不像我自己了…不要！……不、要、啊…啊………」',
      '在艾达的身体上刻上了服从的刻印，',
      '只残留一点点的意识和记忆，随时可以下命令去把勇者杀光。',
      '法术的副作用导致其战斗力下降了！攻击变成0，防御变成0',
      '艾达可以于迎击名单中派遣出场了！',
      '艾达已经士兵化了。',
      '<60天以内再展出20名勇者到博物馆将解锁实绩！>',
      '请选出处刑对象(可复选)',
      '标签：[售]可卖出  [☆]收藏中  [兵]已士兵化  [SP]特殊角色',
    ],
  },
  {
    name: 'K4',
    method: 6,
    variant: 'single',
    lines: [
      '请选择处刑对象',
      '<60天以内再展出20名勇者到博物馆将解锁实绩！>',
      '「混蛋！给我记住！！………」',
      '把艾达的屁股抬高，扣在固定的枷锁上，',
      '任由怪物们发泄性欲，',
      '悲哀的奴隶，对今后将发生的制裁害怕极了。',
    ],
  },
  {
    name: 'K4',
    method: 6,
    variant: 'batch',
    lines: [
      '<60天以内再展出20名勇者到博物馆将解锁实绩！>',
      '请选出处刑对象(可复选)',
      '标签：[售]可卖出  [☆]收藏中  [兵]已士兵化  [SP]特殊角色',
      '注意：以下0～4项的处刑会让人物永远从列表中消失（但可获得勋章或经验）',
      '      开启水晶球的话，则可记录0～6项的处刑影像',
      '「混蛋！给我记住！！………」',
      '把艾达的屁股抬高，扣在固定的枷锁上，',
      '任由怪物们发泄性欲，',
      '悲哀的奴隶，对今后将发生的制裁害怕极了。',
      '<60天以内再展出20名勇者到博物馆将解锁实绩！>',
      '请选出处刑对象(可复选)',
      '标签：[售]可卖出  [☆]收藏中  [兵]已士兵化  [SP]特殊角色',
    ],
  },
  {
    name: 'K4',
    method: 7,
    variant: 'single',
    lines: [
      '请选择处刑对象',
      '<60天以内再展出20名勇者到博物馆将解锁实绩！>',
      '',
      '艾达被清除了关于地下城的所有记忆，被丢到地下城外了。',
      '艾达再次开始了冒险……',
    ],
  },
  {
    name: 'K4',
    method: 7,
    variant: 'batch',
    lines: [
      '<60天以内再展出20名勇者到博物馆将解锁实绩！>',
      '请选出处刑对象(可复选)',
      '标签：[售]可卖出  [☆]收藏中  [兵]已士兵化  [SP]特殊角色',
      '注意：以下0～4项的处刑会让人物永远从列表中消失（但可获得勋章或经验）',
      '      开启水晶球的话，则可记录0～6项的处刑影像',
      '',
      '将艾达身上0的金钱掏空之后，并清除所有地下城的记忆丢出去了。',
      '昏昏沉沉的艾达醒来之后，再次开始了冒险……',
      '<60天以内再展出20名勇者到博物馆将解锁实绩！>',
      '请选出处刑对象(可复选)',
      '标签：[售]可卖出  [☆]收藏中  [兵]已士兵化  [SP]特殊角色',
    ],
  },
  {
    name: 'K7',
    method: 4,
    variant: 'single',
    lines: [
      '请选择处刑对象',
      '<60天以内再展出20名勇者到博物馆将解锁实绩！>',
      '「肉、肉便器？…我、我…要为怪物一直生孩子到死为止？…不、不要…放开我！我不要那样啊啊啊啊！」',
      '威望值增加',
      '但你依然给艾达烙上了封锁所有力量的封印，',
      '被吸收了全部力量的她，身体变成淫靡的肉块了。',
      '作为地下城里怪物的慰问品被使用着，',
      '今后别说重新当勇者，就连看一眼阳光也不可能了吧。',
      '现在的肉便器数量：1',
      '《封印吸收了力量，使你获得了250的经验值！》',
    ],
  },
  {
    name: 'K7',
    method: 4,
    variant: 'batch',
    lines: [
      '<60天以内再展出20名勇者到博物馆将解锁实绩！>',
      '请选出处刑对象(可复选)',
      '标签：[售]可卖出  [☆]收藏中  [兵]已士兵化  [SP]特殊角色',
      '注意：以下0～4项的处刑会让人物永远从列表中消失（但可获得勋章或经验）',
      '      开启水晶球的话，则可记录0～6项的处刑影像',
      '「肉、肉便器？…我、我…要为怪物一直生孩子到死为止？…不、不要…放开我！我不要那样啊啊啊啊！」',
      '威望值增加',
      '但你依然给艾达烙上了封锁所有力量的封印，',
      '被吸收了全部力量的她，身体变成淫靡的肉块了。',
      '作为地下城里怪物的慰问品被使用着，',
      '今后别说重新当勇者，就连看一眼阳光也不可能了吧。',
      '现在的肉便器数量：1',
      '《封印吸收了力量，使你获得了250的经验值！》',
      '<60天以内再展出20名勇者到博物馆将解锁实绩！>',
      '请选出处刑对象(可复选)',
      '标签：[售]可卖出  [☆]收藏中  [兵]已士兵化  [SP]特殊角色',
    ],
  },
  {
    name: 'K7',
    method: 5,
    variant: 'single',
    lines: [
      '请选择处刑对象',
      '<60天以内再展出20名勇者到博物馆将解锁实绩！>',
      '「下达命令…主人………」',
      '在艾达的身体上刻上了服从的刻印，',
      '只残留一点点的意识和记忆，',
      '命令其现在就去把勇者杀光。',
      '*法术的副作用导致其战斗力下降了*',
    ],
  },
  {
    name: 'K7',
    method: 5,
    variant: 'batch',
    lines: [
      '<60天以内再展出20名勇者到博物馆将解锁实绩！>',
      '请选出处刑对象(可复选)',
      '标签：[售]可卖出  [☆]收藏中  [兵]已士兵化  [SP]特殊角色',
      '注意：以下0～4项的处刑会让人物永远从列表中消失（但可获得勋章或经验）',
      '      开启水晶球的话，则可记录0～6项的处刑影像',
      '「下达命令…主人………」',
      '在艾达的身体上刻上了服从的刻印，',
      '只残留一点点的意识和记忆，随时可以下命令去把勇者杀光。',
      '法术的副作用导致其战斗力下降了！攻击变成0，防御变成0',
      '艾达可以于迎击名单中派遣出场了！',
      '艾达已经士兵化了。',
      '<60天以内再展出20名勇者到博物馆将解锁实绩！>',
      '请选出处刑对象(可复选)',
      '标签：[售]可卖出  [☆]收藏中  [兵]已士兵化  [SP]特殊角色',
    ],
  },
  {
    name: 'K7',
    method: 6,
    variant: 'single',
    lines: [
      '请选择处刑对象',
      '<60天以内再展出20名勇者到博物馆将解锁实绩！>',
      '「我居然被怪物们当做慰安妇………」',
      '把艾达的屁股抬高，扣在固定的枷锁上，',
      '任由怪物们发泄性欲，',
      '悲哀的奴隶，对今后将发生的制裁害怕极了。',
    ],
  },
  {
    name: 'K7',
    method: 6,
    variant: 'batch',
    lines: [
      '<60天以内再展出20名勇者到博物馆将解锁实绩！>',
      '请选出处刑对象(可复选)',
      '标签：[售]可卖出  [☆]收藏中  [兵]已士兵化  [SP]特殊角色',
      '注意：以下0～4项的处刑会让人物永远从列表中消失（但可获得勋章或经验）',
      '      开启水晶球的话，则可记录0～6项的处刑影像',
      '「我居然被怪物们当做慰安妇………」',
      '把艾达的屁股抬高，扣在固定的枷锁上，',
      '任由怪物们发泄性欲，',
      '悲哀的奴隶，对今后将发生的制裁害怕极了。',
      '<60天以内再展出20名勇者到博物馆将解锁实绩！>',
      '请选出处刑对象(可复选)',
      '标签：[售]可卖出  [☆]收藏中  [兵]已士兵化  [SP]特殊角色',
    ],
  },
  {
    name: 'K7',
    method: 7,
    variant: 'single',
    lines: [
      '请选择处刑对象',
      '<60天以内再展出20名勇者到博物馆将解锁实绩！>',
      '',
      '艾达被清除了关于地下城的所有记忆，被丢到地下城外了。',
      '艾达再次开始了冒险……',
    ],
  },
  {
    name: 'K7',
    method: 7,
    variant: 'batch',
    lines: [
      '<60天以内再展出20名勇者到博物馆将解锁实绩！>',
      '请选出处刑对象(可复选)',
      '标签：[售]可卖出  [☆]收藏中  [兵]已士兵化  [SP]特殊角色',
      '注意：以下0～4项的处刑会让人物永远从列表中消失（但可获得勋章或经验）',
      '      开启水晶球的话，则可记录0～6项的处刑影像',
      '',
      '将艾达身上0的金钱掏空之后，并清除所有地下城的记忆丢出去了。',
      '昏昏沉沉的艾达醒来之后，再次开始了冒险……',
      '<60天以内再展出20名勇者到博物馆将解锁实绩！>',
      '请选出处刑对象(可复选)',
      '标签：[售]可卖出  [☆]收藏中  [兵]已士兵化  [SP]特殊角色',
    ],
  },
];

test('批量处刑不打开调教窗口（不调 beginTrain / endTrain）', async () => {
  const fixture = seed_world(167, 'kojo/kojo-k7-heart'); // K7
  await run_batch(fixture, 6);

  assert.deepEqual(
    train_window_calls(fixture),
    [],
    '处刑会话不再借调教窗口提供 tflag',
  );
  assert(
    kojo_lines(fixture).includes('「我居然被怪物们当做慰安妇………」'),
    '口上照常出声（处分方式 6 由参数送达）',
  );
});

test('单选处刑不开调教窗口也能走完 K3 的固定示众', async () => {
  const fixture = seed_world(163, 'kojo/kojo-k3-noble'); // K3
  await run_single(fixture, 6);

  assert.deepEqual(train_window_calls(fixture), []);
  assert(
    kojo_lines(fixture).includes('「只要能忍受地了真的就能解放我了对吧？」'),
    '口上按处分方式 6 说话（sc() 缺省自称「我」）',
  );
  assert(
    kojo_lines(fixture).includes('把艾达的屁股抬高，扣在固定的枷锁上，'),
    '下游固定示众分支照常执行',
  );
});

test('五个处刑钩子从实参读处分方式（不开调教窗口也不碰 tflag）', async () => {
  const cases = [
    {
      label: 'K4 处刑 6',
      talent: 164,
      module: 'kojo/kojo-k4-stoic',
      entry: 'exucution_koujo',
      event_no: 6,
      lines: ['「混蛋！给我记住！！………」'],
    },
    {
      label: 'K7 处刑 6',
      talent: 167,
      module: 'kojo/kojo-k7-heart',
      entry: 'exucution_koujo',
      event_no: 6,
      lines: ['「我居然被怪物们当做慰安妇………」'],
    },
    {
      label: 'K12 处刑 6',
      talent: 172,
      module: 'kojo/kojo-k12-intellectual',
      entry: 'exucution_koujo',
      event_no: 6,
      lines: ['「这样子、好讨厌！」'],
    },
    {
      label: 'K4 博物馆 0',
      talent: 164,
      module: 'kojo/kojo-k4-stoic',
      entry: 'museum_koujo',
      event_no: 0,
      lines: [''],
    },
    {
      label: 'K7 博物馆 0',
      talent: 167,
      module: 'kojo/kojo-k7-heart',
      entry: 'museum_koujo',
      event_no: 0,
      lines: ['「啊…奇、奇怪，身体…身体动不了了…咕…啊…啊啊啊啊啊啊…啊………」'],
    },
    {
      label: 'K13 博物馆 3（bind_ctx 取自称）',
      talent: 173,
      module: 'kojo/kojo-k13-protector',
      entry: 'museum_koujo',
      event_no: 3,
      lines: ['「啊啦啊啦、我的这副样子被看到的话…真是很困扰呢」'],
    },
    {
      label: 'K4 流放 1',
      talent: 164,
      module: 'kojo/kojo-k4-stoic',
      entry: 'banishment_koujo',
      event_no: 1,
      lines: [''],
    },
    {
      label: 'K7 流放 0',
      talent: 167,
      module: 'kojo/kojo-k7-heart',
      entry: 'banishment_koujo',
      event_no: 0,
      lines: [
        '「回不去了…狂王大人那里…已经回不去了………」',
        '失去了力量艾达之后去了哪里谁也不知道。',
        '有一种说法是边乞讨边流浪、最后乘着船在一次暴风雨中遇难了。',
        '还有一个说法是根本没有被流放、给魔王做了一辈子小杂活。',
        '无论如何艾达在那以后都没有再出现在历史舞台上………',
      ],
    },
    {
      label: 'K13 流放 0',
      talent: 173,
      module: 'kojo/kojo-k13-protector',
      entry: 'banishment_koujo',
      event_no: 0,
      lines: ['「再见。应该是再也不见吧……」'],
    },
    {
      label: 'K4 公开 0',
      talent: 164,
      module: 'kojo/kojo-k4-stoic',
      entry: 'public_exucution_koujo',
      event_no: 0,
      lines: ['「到死为止都要被侵犯？呃……有趣…来试试呗！！」'],
    },
    {
      label: 'K7 公开 1',
      talent: 167,
      module: 'kojo/kojo-k7-heart',
      entry: 'public_exucution_koujo',
      event_no: 1,
      lines: ['「这里…这个绞刑台是我最后的舞台吗…」'],
    },
    {
      label: 'K4 猎奇 0',
      talent: 164,
      module: 'kojo/kojo-k4-stoic',
      entry: 'grotesque_koujo',
      event_no: 0,
      lines: [''],
    },
    {
      label: 'K13 猎奇 6',
      talent: 173,
      module: 'kojo/kojo-k13-protector',
      entry: 'grotesque_koujo',
      event_no: 6,
      lines: [''],
    },
  ];

  for (const item of cases) {
    const fixture = seed_world(item.talent, item.module);
    const kojo = fixture.load_module('kojo/kojo-system');
    fixture.set_inputs(...Array(4).fill(0)); // 入口里若有等键调用也不卡住
    await kojo[item.entry](CID, item.event_no);
    assert.deepEqual(fixture.text_lines(), item.lines, item.label);
    assert(
      !fixture.var_reads.some((read) => read.name.startsWith('tflag:')),
      `${item.label}：不读 tflag`,
    );
  }
});

// —— 「输出与改动前一致」的逐字对照：表格由改动前的实现跑出 ——

for (const item of GOLDEN) {
  test(`输出对照：${item.name} 方法 ${item.method} ${item.variant} 版逐字不变`, async () => {
    const talents = { K4: 164, K7: 167 };
    const modules = {
      K4: 'kojo/kojo-k4-stoic',
      K7: 'kojo/kojo-k7-heart',
    };
    const fixture = seed_world(talents[item.name], modules[item.name]);
    if (item.variant === 'single') {
      await run_single(fixture, item.method);
    } else {
      await run_batch(fixture, item.method);
    }
    assert.deepEqual(fixture.text_lines(), item.lines);
  });
}
