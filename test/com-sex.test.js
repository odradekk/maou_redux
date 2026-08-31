'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');
const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

function seed_world({ assi = -1, player = 0 } = {}) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  if (assi >= 0 && assi !== 0) {
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
  era_flag.player = player;
  era_flag.assi = assi;
  era_flag.assiplay = 0;
  era_flag.prevcom = -1;
  fixture.store.set('callname:0:-1', '魔王');
  fixture.store.set('callname:0:-2', '魔王');
  fixture.store.set('callname:31:-1', '温妮');
  fixture.store.set('callname:31:-2', '温妮');
  fixture.load_module('system/train/com-sex');
  const { com_family, com_able_family } = fixture.load_module(
    'system/train/com-family',
  );
  const { adv_com_family, get_adv_com } = fixture.load_module(
    'system/train/com-adv',
  );
  return {
    fixture,
    era_flag,
    com_family,
    com_able_family,
    adv_com_family,
    get_adv_com,
  };
}

async function run_com(world, id) {
  world.era_flag.selectcom = id;
  return world.com_family.call(id);
}

test('注册 20–29：COM、COM_ABLE、B/A 与升格 CASE 全部进族', async () => {
  const world = seed_world();
  const { train_message_a_family, train_message_b_family } =
    world.fixture.load_module('system/train/train-message');
  for (const id of [20, 21, 22, 23, 24, 25, 26, 27, 28, 29]) {
    assert.equal(world.com_family.has(id), true, `COM${id}`);
    assert.equal(world.com_able_family.has(id), true, `COM_ABLE${id}`);
    assert.equal(train_message_a_family.has(id), true, `A${id}`);
    assert.equal(train_message_b_family.has(id), true, `B${id}`);
  }
  for (const id of [20, 21, 22, 23, 26, 27]) {
    assert.equal(world.adv_com_family.has(id), true, `GET_ADV_COM CASE ${id}`);
  }
});

test('COM20–23：取消确认返回 0；正常路径依序生成各自 SOURCE', async () => {
  const cancelled = seed_world();
  cancelled.fixture.store.set('talent:31:0', 1);
  cancelled.fixture.set_inputs(1);
  assert.equal(await run_com(cancelled, 20), 0);

  for (const [id, source] of [
    [20, ['source:31:1', 'source:31:12']],
    [21, ['source:31:1', 'source:31:12']],
    [22, ['source:31:7', 'source:31:12']],
    [23, ['source:31:17', 'source:31:12']],
  ]) {
    const world = seed_world();
    world.fixture.store.set('talent:0:122', 1);
    assert.equal(await run_com(world, id), 1, `COM${id}`);
    for (const key of source)
      assert.notEqual(world.fixture.store.get(key), undefined, key);
  }
});

test('COM24/25：低于 PALAMLV:1 不把欲情档计入实行值；COM24 的初体验等待可观测', async () => {
  const insufficient = seed_world();
  insufficient.fixture.store.set('talent:31:122', 1);
  assert.equal(
    await run_com(insufficient, 24),
    0,
    '实行值不能被不存在的欲情 LV1 放行',
  );

  const world = seed_world();
  world.fixture.store.set('talent:31:122', 1);
  world.fixture.store.set('talent:0:0', 1);
  world.fixture.store.set('abl:31:10', 10);
  world.fixture.store.set('abl:31:16', 10);
  world.fixture.store.set('abl:31:20', 10);
  world.fixture.store.set('talent:31:63', 1);
  world.fixture.set_inputs(0);
  assert.equal(await run_com(world, 24), 1);
  assert.equal(world.fixture.store.get('talent:0:0'), 0);
  assert.equal(world.fixture.store.get('cflag:0:15'), 32);
  assert.equal(world.fixture.store.get('cstr:0:3'), '温妮');
  assert.ok(
    world.fixture.waits.some((wait) => wait.waited),
    'PRINTW 必须等待',
  );
});

test('COM25：事后处理写肛门经验与屈服刻印结算', async () => {
  const world = seed_world();
  world.fixture.store.set('talent:31:122', 1);
  world.fixture.store.set('abl:31:10', 10);
  world.fixture.store.set('abl:31:16', 10);
  world.fixture.store.set('abl:31:20', 10);

  assert.equal(await run_com(world, 25), 1);
  assert.equal(world.fixture.store.get('exp:0:1'), 1);
  assert.equal(world.fixture.store.get('tflag:200'), 2);
});

test('COM26–29：逐条完成并产生不同肛交 SOURCE 入口', async () => {
  for (const [id, key] of [
    [26, 'source:31:12'],
    [27, 'source:31:14'],
    [28, 'source:31:7'],
    [29, 'source:31:12'],
  ]) {
    const world = seed_world();
    world.fixture.store.set('talent:0:122', 1);
    world.fixture.store.set('exp:31:1', 10);
    assert.equal(await run_com(world, id), 1, `COM${id}`);
    assert.notEqual(world.fixture.store.get(key), undefined, `COM${id} ${key}`);
  }
});

test('COM27 不套用玩家技巧段；COM26 也保留原作无该段', async () => {
  for (const id of [26, 27]) {
    const world = seed_world();
    world.fixture.store.set('talent:0:122', 1);
    world.fixture.store.set('exp:31:1', 10);
    world.fixture.store.set('abl:0:12', 5);
    await run_com(world, id);
    assert.equal(
      world.fixture.store.get('source:31:10'),
      undefined,
      `COM${id}`,
    );
  }
});

test('COM_ABLE：COM20 的男性器/道具门与 COM25 不额外禁止男性调教者', async () => {
  const world = seed_world();
  assert.equal(await world.com_able_family.call(20), 0, '无男性器和假阳具');
  world.fixture.store.set('item:4', 1);
  assert.equal(await world.com_able_family.call(20), 1, '假阳具放行');

  world.fixture.store.set('talent:31:121', 1);
  world.fixture.store.set('talent:0:122', 1);
  assert.equal(
    await world.com_able_family.call(25),
    1,
    'COM25 原作允许男性调教者',
  );
});

test('GET_ADV_COM：连续三人目标缺失时按既有 staged stub 跳转；不能误写 TFLAG:42', async () => {
  const world = seed_world();
  world.era_flag.prevcom = 64;
  assert.equal(await world.get_adv_com(20, () => 0), 64);
  assert.equal(world.fixture.store.get('tflag:42'), 1);
});

test('B20/B21：130/134 只可作为前前回 + 120/121，不可直接续插', async () => {
  for (const [id, historic] of [
    [20, 130],
    [21, 134],
  ]) {
    const direct = seed_world();
    direct.era_flag.selectcom = id;
    direct.era_flag.prevcom = historic;
    direct.fixture.store.set('tflag:60', 1);
    direct.fixture.store.set('talent:0:122', 1);
    const { train_message_b } = direct.fixture.load_module(
      'system/train/train-message',
    );
    await train_message_b();
    assert.ok(
      !direct.fixture
        .text_lines()
        .some((line) => line.includes('再次开始扭动腰肢')),
      `COM${id} ${historic} 不可直接连续`,
    );

    const chained = seed_world();
    chained.era_flag.selectcom = id;
    chained.era_flag.prevcom = 120;
    chained.fixture.store.set('tflag:59', historic);
    chained.fixture.store.set('tflag:60', 1);
    chained.fixture.store.set('talent:0:122', 1);
    const { train_message_b: message } = chained.fixture.load_module(
      'system/train/train-message',
    );
    await message();
    assert.ok(
      chained.fixture
        .text_lines()
        .some((line) => line.includes('再次开始扭动腰肢')),
      `COM${id} ${historic} + 120 必须连续`,
    );
  }
});

test('A：无玩家射精时保留高潮余韵；20 不受失神门、26 受其约束', async () => {
  const afterglow = seed_world();
  afterglow.era_flag.selectcom = 20;
  afterglow.fixture.store.set('tflag:29', 3);
  const { train_message_a } = afterglow.fixture.load_module(
    'system/train/train-message',
  );
  await train_message_a();
  assert.ok(
    afterglow.fixture
      .text_lines()
      .some((line) => line.includes('绝顶高潮的余韵')),
  );

  for (const [id, expected] of [
    [20, true],
    [26, false],
  ]) {
    const world = seed_world();
    world.era_flag.selectcom = id;
    world.fixture.store.set('tflag:2', 1);
    world.fixture.store.set('tflag:899', 2);
    world.fixture.store.set('abl:31:10', 3);
    world.fixture.store.set('abl:31:11', 3);
    const { train_message_a: message } = world.fixture.load_module(
      'system/train/train-message',
    );
    await message();
    assert.equal(
      world.fixture.text_lines().some((line) => line.includes('把脚缠到')),
      expected,
      `COM${id}`,
    );
  }
});

// —— #221 非文本 SOURCE / 升格 / 输入回显契约 ——

test('COM26–28：欲情段乘肛门快感与屈从格，不得误乘情爱格', () => {
  const cases = [
    [26, [240, 210, 1440, 0]],
    [27, [300, 100, 1800, undefined]],
    [28, [120, 940, 840, 0]],
  ];
  for (const [id, expected] of cases) {
    const world = seed_world();
    world.fixture.store.set('abl:31:3', 2);
    world.fixture.store.set('abl:31:10', 4);
    world.fixture.store.set('palam:31:3', 500);
    world.fixture.store.set('palam:31:5', 3000);
    world.fixture.store.set('exp:31:1', 10);
    const sex = world.fixture.load_module('system/train/com-sex');
    sex[`source${id}`]();
    assert.deepEqual(
      [2, 3, 13, 15].map((index) =>
        world.fixture.store.get(`source:31:${index}`),
      ),
      expected,
      `COM${id}（COMF${id} 的欲情 / 顺从段）`,
    );
  }
});

test('COM29：顺从段三格各取独立倍率并逐次截断', () => {
  const world = seed_world();
  world.fixture.store.set('abl:31:3', 2);
  world.fixture.store.set('abl:31:10', 4);
  world.fixture.store.set('palam:31:3', 500);
  world.fixture.store.set('palam:31:5', 3000);
  world.fixture.store.set('exp:31:1', 10);
  const { source29 } = world.fixture.load_module('system/train/com-sex');

  source29();

  assert.deepEqual(
    [2, 3, 13, 15].map((index) =>
      world.fixture.store.get(`source:31:${index}`),
    ),
    [294, 2520, 700, 0],
    'COMF29:190-235 的欲情三乘与顺从三乘',
  );
});

test('GET_ADV_COM：20/21 的 SP 返回不清 TFLAG:42；22/23 不触碰该旗', async () => {
  const sp_cases = [
    [20, 128, 129, 130],
    [21, 131, 133, 134],
  ];
  for (const [id, previous2, previous, advanced] of sp_cases) {
    const world = seed_world();
    world.fixture.store.set('tflag:42', 1);
    world.fixture.store.set('tflag:59', previous2);
    world.era_flag.prevcom = previous;
    world.era_flag.assiplay = 0;
    world.fixture.store.set('tflag:50', 0);
    assert.equal(await world.get_adv_com(id, () => 0), advanced, `COM${id} SP`);
    assert.equal(world.fixture.store.get('tflag:42'), 1, `COM${id} SP 保留旗`);
  }

  for (const id of [22, 23]) {
    const world = seed_world();
    world.fixture.store.set('tflag:42', 1);
    assert.equal(await world.get_adv_com(id, () => 0), id, `COM${id} 不升格`);
    assert.equal(world.fixture.store.get('tflag:42'), 1, `COM${id} 不清旗`);
  }
});

test('COM24：确认菜单只接受两个按钮值；无效键在引擎输入层拒收', async () => {
  const world = seed_world();
  world.fixture.store.set('talent:31:122', 1);
  world.fixture.store.set('talent:0:0', 1);
  world.fixture.store.set('abl:31:10', 10);
  world.fixture.store.set('abl:31:16', 10);
  world.fixture.store.set('abl:31:20', 10);
  world.fixture.store.set('talent:31:63', 1);
  world.fixture.set_inputs(7);

  await assert.rejects(
    run_com(world, 24),
    /输入不合法！请输入以下值之一：0, 1/,
  );
  assert.ok(
    !world.fixture.inputs_consumed.some((input) => input.api === 'input'),
    '无效输入不会送达 COM24',
  );
});

test('升格到未实现目标：输出占位并按 JUMPFORM 返回 1', async () => {
  const world = seed_world();
  world.era_flag.prevcom = 64;
  world.fixture.store.set('tflag:42', 0);

  assert.equal(await run_com(world, 20), 1);
  assert.ok(
    world.fixture
      .text_lines()
      .some((line) => line.includes('COM64') && line.includes('升格目标')),
    '未实现升格目标必须可见',
  );
});

test('存根清单可检索：docs/stub-registry.md 收录本族全部升格占位', () => {
  const world = seed_world();
  const { STUBBED_CALLS } = world.fixture.load_module('system/train/com-sex');
  const registry = require('node:fs').readFileSync(
    require('node:path').resolve(__dirname, '..', 'docs', 'stub-registry.md'),
    'utf8',
  );
  assert.deepEqual(STUBBED_CALLS, [
    'COM64',
    'COM120',
    'COM121',
    'COM130',
    'COM134',
  ]);
  for (const name of STUBBED_CALLS) {
    assert.ok(registry.includes(name), `docs/stub-registry.md 缺少 ${name}`);
  }
});

test('COM_ABLE：特殊守卫保持各指令原作差异', async () => {
  // COM27 没有电极位 49 守卫，COM26 有；两者都要求 EXP:1 >= 10。
  for (const [id, expected] of [
    [26, 0],
    [27, 1],
  ]) {
    const world = seed_world();
    world.fixture.store.set('talent:0:122', 1);
    world.fixture.store.set('exp:31:1', 10);
    world.fixture.store.set('tequip:31:49', 1);
    assert.equal(
      await world.com_able_family.call(id),
      expected,
      `COM${id} 电极位`,
    );
  }

  // COM27 的助手润滑门阈值为 4；COM26 为 3。
  for (const [id, expected] of [
    [26, 1],
    [27, 0],
  ]) {
    const world = seed_world({ assi: 17 });
    world.era_flag.assiplay = 1;
    world.fixture.store.set('talent:0:122', 1);
    world.fixture.store.set('exp:31:1', 10);
    world.fixture.store.set('abl:17:10', 4);
    world.fixture.store.set('abl:17:22', 5);
    assert.equal(
      await world.com_able_family.call(id),
      expected,
      `COM${id} 助手阈值`,
    );
  }
});

test('COM22：爱慕三格乘数不同，成瘾与恭顺不能漏乘', () => {
  const world = seed_world();
  world.fixture.store.set('abl:31:2', 2);
  world.fixture.store.set('abl:31:16', 3);
  world.fixture.store.set('palam:31:3', 500);
  world.fixture.store.set('talent:31:85', 1);
  const { source22 } = world.fixture.load_module('system/train/com-sex');

  source22();

  assert.deepEqual(
    [3, 7, 16].map((index) => world.fixture.store.get(`source:31:${index}`)),
    [1056, 200, 2400],
    'COMF22:264-269：情爱 ×3、成瘾追加 ×2、恭顺追加 ×2',
  );
});

test('COM24：低欲情档为 0，不能按普通升格档的 LV1 放行', async () => {
  const world = seed_world();
  // COM_ORDER 后恰为 38：欲望 20 + 侍奉精神 16 + 接受快感 2。
  // COM24_CHECK 的欲情档在 PALAM:5 < PALAMLV:1 时是 0；若错复用
  // GET_ADV_COM 的 lust_level（低档为 1），会加 2 而错误达到实行值 40。
  world.fixture.store.set('talent:31:122', 1);
  world.fixture.store.set('abl:31:11', 10);
  world.fixture.store.set('abl:31:16', 4);
  world.fixture.store.set('talent:31:70', 1);

  assert.equal(await run_com(world, 24), 0, '低欲情档不能放行 COM24');
});
