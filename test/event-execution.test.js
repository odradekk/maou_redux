/**
 * @file 处刑、设施与苗床业务行为测试（issue #348，阶段 5a L17）。
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

function seed_world() {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.seed_chara(31, { id: 31, name: '温妮', callname: '温妮' });
  fixture.seed_chara(47, { id: 47, name: '艾达', callname: '艾达' });
  fixture.era.addCharacter(0);
  fixture.era.addCharacter(31);
  fixture.era.addCharacter(47);
  fixture.era.beginTrain(0, 31);
  fixture.store.set('cflag:31:9', 4); // 角色等级
  fixture.store.set('cflag:47:9', 2);
  for (const cid of [31, 47]) {
    fixture.store.set(`cflag:${cid}:550`, -1);
    fixture.store.set(`cflag:${cid}:551`, -1);
    fixture.store.set(`cflag:${cid}:552`, -1);
  }
  return fixture;
}

test('EXECUTION_MINI：回收装备、除名角色并结算处刑与勋章经验', async () => {
  const fixture = seed_world();
  fixture.store.set('cflag:31:550', 1001);
  fixture.store.set('cflag:31:551', 1002);
  fixture.store.set('cflag:31:552', 1003);
  const { execution_mini } = fixture.load_module('event/event-execution');

  assert.equal(await execution_mini(31), 0);

  assert.deepEqual(fixture.era.getAddedCharacters(), [0, 47]);
  assert.equal(fixture.store.get('item:301'), 1);
  assert.equal(fixture.store.get('item:302'), 1);
  assert.equal(fixture.store.get('item:303'), 1);
  assert.equal(fixture.store.get('cflag:31:550'), -1);
  assert.equal(fixture.store.get('cflag:31:551'), -1);
  assert.equal(fixture.store.get('cflag:31:552'), -1);
  assert.equal(fixture.store.get('flag:230'), 1);
  assert.equal(fixture.store.get('flag:80'), 1);
  assert.equal(fixture.store.get('exp:0:80'), 250);
  assert.equal(fixture.store.get('exp:0:81'), 1);
  assert.equal(fixture.store.get('exflag:99'), 2);
  assert(
    !fixture.text_lines().some((line) => line.includes('@CN_REBUILD')),
    '迷你处刑源未调用 NAME_RESET',
  );
});

test('EXECUTION_MINI：带说明调用不改威望，但其余结算不省略', async () => {
  const fixture = seed_world();
  fixture.store.set('exflag:99', 9);
  const { execution_mini } = fixture.load_module('event/event-execution');

  await execution_mini(31, '自动处刑');

  assert.equal(fixture.store.get('exflag:99'), 9);
  assert.equal(fixture.store.get('exp:0:81'), 1);
  assert.deepEqual(fixture.era.getAddedCharacters(), [0, 47]);
  assert.equal(
    fixture.lines.filter((line) => line.type === 'divider').length,
    2,
    '带说明调用仍保留首尾两条分隔线',
  );
});

test('PUBLIC_EXECUTION：魂粉碎保留拼行、录像归档与确定性随机结果', async () => {
  const fixture = seed_world();
  fixture.set_inputs(2);
  const { public_execution } = fixture.load_module(
    'event/event-public-execution',
  );

  await public_execution(31, seq([3]));

  assert(
    fixture
      .text_lines()
      .some((line) =>
        line.includes('失去灵魂的温妮的身体，被喜欢百合的淫魔所回收'),
      ),
    '连续 PRINTFORM 必须合为同一行',
  );
  assert.equal(fixture.store.get('videoarchive:31'), '淫魔的使魔温妮');
  assert.equal(fixture.store.get('exp:0:81'), 1);
  assert.equal(fixture.store.get('exp:0:80'), 250);
  assert.deepEqual(fixture.era.getAddedCharacters(), [0, 47]);
});

test('GROTESQUE：按性格处理器分发口上并归档选择的末路', async () => {
  const fixture = seed_world();
  fixture.store.set('talent:31:163', 1); // 高贵性格 → K3
  fixture.set_inputs(5);
  const { grotesque } = fixture.load_module('event/event-grotesque');
  const { grotesque_koujo_family } = fixture.load_module('kojo/kojo-system');
  let observed;
  grotesque_koujo_family.register(3, async (rand_n) => {
    observed = [fixture.store.get('tflag:530'), rand_n(7)];
    fixture.store.set('tflag:530', 4);
    return 0;
  });

  await grotesque(31, seq([4]));

  assert.deepEqual(observed, [5, 4]);
  assert.equal(fixture.store.get('videoarchive:31'), '肉类温妮');
  assert.equal(fixture.store.get('exp:0:81'), 1);
});

test('GROTESQUE：爱慕的食肉刑只打印一次烙印并保留专属结尾', async () => {
  const fixture = seed_world();
  fixture.store.set('talent:31:85', 1); // 爱慕
  fixture.set_inputs(4);
  const { grotesque } = fixture.load_module('event/event-grotesque');

  await grotesque(31, seq([0]));

  assert.equal(
    fixture.text_lines().filter((line) => line.includes('封印所有力量的烙印'))
      .length,
    1,
  );
  assert(
    fixture.text_lines().some((line) => line.includes('胸部被怪物们吃着')),
  );
});

test('处分函数直调：口上观察到传入角色，而不是调用前残留 TARGET', async () => {
  const fixture = seed_world();
  fixture.store.set('talent:47:163', 1); // 高贵性格 → K3
  fixture.set_inputs(2);
  const era_flag = fixture.load_module('era-utils/era-flag');
  const { public_execution } = fixture.load_module(
    'event/event-public-execution',
  );
  const { public_exucution_koujo_family } =
    fixture.load_module('kojo/kojo-system');
  let observed_target;
  public_exucution_koujo_family.register(3, async () => {
    observed_target = era_flag.target;
    fixture.store.set('tflag:520', 0);
    return 0;
  });

  await public_execution(47, seq([0]));

  assert.equal(observed_target, 47);
  assert.equal(fixture.store.get('videoarchive:47'), '凌辱致死艾达');
});

test('BANISHMENT：选项 1 对女性也会被原作校验拒绝，再接受普通流放', async () => {
  const fixture = seed_world();
  fixture.set_inputs(1, 0);
  const { banishment } = fixture.load_module('event/event-banishment');

  await banishment(31, seq([0]));

  assert.deepEqual(
    fixture.inputs_consumed.map(({ value }) => value),
    [1, 0],
  );
  assert(fixture.text_lines().includes('温妮已经是男性了。换个手段吧。'));
  assert.equal(fixture.store.get('videoarchive:31'), '下落不明温妮');
});

test('BANISHMENT：小动物分支逐次重掷，连续输出仍在同一行', async () => {
  const fixture = seed_world();
  fixture.set_inputs(3);
  const { banishment } = fixture.load_module('event/event-banishment');

  await banishment(31, seq([7, 1]));

  assert(
    fixture
      .text_lines()
      .some((line) => line.includes('随后你将她变成了一条狗的样子。')),
  );
  assert.equal(fixture.store.get('videoarchive:31'), '汪？温妮');
});

test('BANISHMENT：肉便器旧业的末路优先级与守墓人标题逐支落盘', async () => {
  const fetish = seed_world();
  fetish.store.set('talent:31:204', 1);
  fetish.store.set('talent:31:317', 13);
  fetish.set_inputs(0);
  const { banishment: banish_fetish } = fetish.load_module(
    'event/event-banishment',
  );
  await banish_fetish(31, seq([0]));
  assert.equal(fetish.store.get('videoarchive:31'), '肉体改造发烧友温妮');

  const gravekeeper = seed_world();
  gravekeeper.store.set('talent:31:315', 10);
  gravekeeper.set_inputs(4);
  const { banishment: banish_gravekeeper } = gravekeeper.load_module(
    'event/event-banishment',
  );
  await banish_gravekeeper(31, seq([0]));
  assert.equal(gravekeeper.store.get('videoarchive:31'), '守墓人温妮');
});

test('BANISHMENT：家庭末路以亲属位组合文案，不泄漏 undefined', async () => {
  const fixture = seed_world();
  fixture.store.set('talent:31:317', 8);
  fixture.store.set('talent:31:320', 100000); // 姐姐一人
  fixture.set_inputs(0);
  const { banishment } = fixture.load_module('event/event-banishment');

  await banishment(31, seq([0]));

  assert(
    fixture.text_lines().some((line) => line.includes('被姐姐宠爱的温妮')),
  );
  assert(!fixture.text_lines().some((line) => line.includes('undefined')));
});

test('BANISHMENT：录像观看者后日谈只属于肉便器旧业', async () => {
  const ordinary = seed_world();
  ordinary.store.set('talent:31:315', 1);
  ordinary.set_inputs(0);
  const { banishment: banish_ordinary } = ordinary.load_module(
    'event/event-banishment',
  );
  await banish_ordinary(31, seq([0]));
  assert(
    !ordinary.text_lines().some((line) => line.includes('一直单恋着温妮')),
  );

  const video_actor = seed_world();
  video_actor.store.set('talent:31:204', 1);
  video_actor.store.set('talent:31:315', 1);
  video_actor.set_inputs(0);
  const { banishment: banish_video_actor } = video_actor.load_module(
    'event/event-banishment',
  );
  await banish_video_actor(31, seq([0]));
  assert(
    video_actor.text_lines().some((line) => line.includes('一直单恋着温妮')),
  );
});

test('EXECUTION：使用稳定角色 ID 选择第二名角色并路由到固定示众', async () => {
  const fixture = seed_world();
  fixture.set_inputs(1, 6);
  const { execution } = fixture.load_module('event/event-execution');

  await execution(seq([0]));

  assert.deepEqual(fixture.era.getAddedCharacters(), [0, 31, 47]);
  assert.equal(fixture.store.get('cflag:47:1'), 8);
  assert.equal(fixture.store.get('videoarchive:47'), undefined);
  assert(fixture.text_lines().some((line) => line.includes('艾达')));
});

test('EXECUTION：收藏角色不能走除士兵化外的处刑方式', async () => {
  const fixture = seed_world();
  fixture.store.set('cflag:47:700', 1);
  fixture.set_inputs(1, 0, 5);
  const { execution } = fixture.load_module('event/event-execution');

  await execution(seq([0]));

  assert.equal(fixture.store.get('talent:47:254'), 1);
  assert(fixture.text_lines().includes('艾达在收藏列表之中，不能被处刑。'));
});

test('EXECUTION：肉便器支完整结算，录像开关关闭时不额外写书架', async () => {
  const fixture = seed_world();
  fixture.store.set('cflag:47:1', 2); // 排除第二候选，处分后不重画
  fixture.store.set('talent:31:121', 1); // 扶她条件文案
  fixture.store.set('talent:31:312', 12); // 魅力点文案
  fixture.set_inputs(0, 4);
  const { execution } = fixture.load_module('event/event-execution');

  await execution(seq([0]));

  assert.equal(fixture.store.get('flag:83'), 1);
  assert.equal(fixture.store.get('videoarchive:0'), undefined);
  assert.equal(fixture.store.get('videoarchive:31'), undefined);
  assert.equal(fixture.store.get('tstr:30'), '');
  assert(
    fixture
      .text_lines()
      .includes('作为魅力点的美乳，现在变成一堆丑陋膨胀的肉块了。'),
  );
});

test('INFRASTRUCTURE：无奴隶时提前返回；展品统计按对应计数输出', async () => {
  const empty = create_era_fixture();
  const { infrastructure: empty_view } = empty.load_module(
    'page/page-infrastructure',
  );
  await empty_view(0);
  assert.deepEqual(empty.text_lines(), [
    '没有待机中的奴隶，没有人能保护你，并挡住可能出现的勇者。',
  ]);

  const fixture = seed_world();
  fixture.store.set('flag:600', 2);
  fixture.set_inputs(0);
  const { infrastructure } = fixture.load_module('page/page-infrastructure');
  await infrastructure(2);
  assert(fixture.text_lines().includes('博物馆内现在有 2个石像。'));
  assert(
    fixture.text_lines().includes('那些话语和传说，已经不会被传达到了吧……'),
  );
});

test('INFRASTRUCTURE：人类牧场可切换播种者、记录与出售开关', async () => {
  const fixture = seed_world();
  fixture.store.set('flag:83', 1);
  fixture.set_inputs(51, 0, 3, 1, 2, 999);
  const { infrastructure } = fixture.load_module('page/page-infrastructure');

  await infrastructure(2);

  assert.equal(fixture.store.get('flag:613'), 3);
  assert.equal(fixture.store.get('flag:614'), 3);
});

test('NAEDOKO：女性苗床结算经验、丧失处女并执行妊娠判定', async () => {
  const fixture = seed_world();
  fixture.store.set('talent:31:209', 1);
  fixture.store.set('talent:31:0', 1);
  fixture.store.set('cflag:0:9', 4);
  const { run_seedbed } = fixture.load_module('system/train/seedbed');

  await run_seedbed(31, seq([7]));

  assert.equal(fixture.store.get('cflag:31:1'), 7);
  assert.equal(fixture.store.get('talent:31:0'), 0);
  assert.equal(fixture.store.get('juel:31:1'), 40);
  assert.equal(fixture.store.get('juel:31:2'), 40);
  assert.equal(fixture.store.get('exp:31:0'), 4);
  assert.equal(fixture.store.get('exp:31:1'), 4);
  assert.equal(fixture.store.get('exp:31:2'), 4);
  assert.equal(fixture.store.get('exp:31:20'), 4);
  assert.equal(fixture.store.get('exp:31:80'), 4);
  assert.equal(fixture.store.get('cflag:31:107'), 0, '妊娠判定会消费射精计数');
});

test('NAEDOKO：男性分支使用确定性随机源选择种马或肛门业务', async () => {
  const man = seed_world();
  man.store.set('cflag:31:1', 7);
  man.store.set('talent:31:122', 1);
  man.store.set('talent:31:1', 1);
  man.store.set('cflag:0:9', 3);
  const { run_seedbed: run_man } = man.load_module('system/train/seedbed');
  await run_man(31, seq([0]));
  assert.equal(man.store.get('talent:31:1'), 0);
  assert.equal(man.store.get('juel:31:0'), 30);
  assert.equal(man.store.get('exp:31:3'), 3);

  const anal = seed_world();
  anal.store.set('cflag:31:1', 7);
  anal.store.set('talent:31:122', 1);
  anal.store.set('cflag:0:9', 3);
  const { run_seedbed: run_anal } = anal.load_module('system/train/seedbed');
  await run_anal(31, seq([1]));
  assert.equal(anal.store.get('juel:31:2'), 30);
  assert.equal(anal.store.get('exp:31:80'), 15);
});

test('苗床妊娠：怪物精液判定成功后写短孕期与特殊父亲', () => {
  const fixture = seed_world();
  const era_flag = fixture.load_module('era-utils/era-flag');
  const { conception_check_syoku_to_t, in_vagina_syoku_to_t } =
    fixture.load_module('event/event-pregnancy');
  era_flag.target = 31;
  era_flag.day_count = 20;
  fixture.store.set('flag:5', 4); // 妊娠系统启用
  fixture.store.set('cflag:31:107', 100);

  in_vagina_syoku_to_t(() => 0);
  conception_check_syoku_to_t(() => 2);

  assert.equal(fixture.store.get('cflag:31:102'), 6);
  assert.equal(fixture.store.get('cflag:31:107'), 0);
  assert.equal(fixture.store.get('cflag:31:110'), 32);
  assert.equal(fixture.store.get('cflag:31:111'), -3);
});

test('处刑口上：K2 与 K4 注册四种处刑处理器', () => {
  const fixture = create_era_fixture();
  const {
    banishment_koujo_family,
    exucution_koujo_family,
    grotesque_koujo_family,
    public_exucution_koujo_family,
  } = fixture.load_module('kojo/kojo-system');
  fixture.load_module('kojo/kojo-k2-timid');
  fixture.load_module('kojo/kojo-k4-stoic');

  for (const family of [
    banishment_koujo_family,
    exucution_koujo_family,
    grotesque_koujo_family,
    public_exucution_koujo_family,
  ]) {
    assert.equal(family.has(2), true);
    assert.equal(family.has(4), true);
  }
});
