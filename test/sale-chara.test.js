/**
 * 奴隶出售流程测试（issue #339）。
 *
 * 接缝 = ere/system/stronghold/sale.js 导出的五个函数；通过唯一夹具
 * 观察玩家输出、输入、资金与角色除名，不断言模块内部辅助函数。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara } = require('./helpers/chara');

function seed_world(fixture) {
  join_slave_chara(fixture, 0, '你');
  join_slave_chara(fixture, 31, '温妮');
  join_slave_chara(fixture, 32, '莉莉');
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.assi = -1;
  era_flag.money = 100;
  // 商店轮的入口状态（event-first.js 初始化，进店时 page-shop.js 再置一次）：
  // 直调 usershop 的用例必须站在真实入口状态上——夹具存储默认空
  // 时 era_flag.bought 读回 0，而 0 在店内购物段的判断条件里是「刚买了 0 号商品」，
  // #396 接通该段后会吞掉全部输入。
  era_flag.bought = -1;
  fixture.era.beginTrain(...fixture.era.getAddedCharacters());
  return era_flag;
}

function seq(values) {
  let index = 0;
  return (n) => values[index++ % values.length] % n;
}

/** 全部屏史的文本行：列表屏每轮换屏（#724/ADR-0009），被清掉的轮也在史里 */
function history_text_lines(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((l) => l.text);
}

test('CHECK_SELLASSIABLE：达到出售与助手门槛时逐级解锁且只提示一次', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.store.set('abl:31:0', 3); // 阴蒂感觉
  fixture.store.set('abl:31:10', 5); // 顺从
  fixture.store.set('abl:31:11', 4); // 欲望
  fixture.store.set('abl:31:12', 3); // 技巧
  fixture.store.set('abl:31:22', 3); // 百合气质

  const { check_sellassiable } = fixture.load_module('system/stronghold/sale');
  assert.equal(await check_sellassiable(31), 0);
  assert.equal(fixture.store.get('cflag:31:0'), 2);
  assert.deepEqual(fixture.text_lines(), [
    '温妮可以卖掉了',
    '温妮可以做调教助手了',
  ]);
  assert.equal(fixture.inputs_consumed.length, 2);

  await check_sellassiable(31);
  assert.equal(fixture.text_lines().length, 2, '已解锁的状态不重复提示');
});

test('CHECK_SELLASSIABLE：未加入或未过前置门槛时不改状态', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  const { check_sellassiable } = fixture.load_module('system/stronghold/sale');

  assert.equal(await check_sellassiable(99), 0);
  assert.equal(await check_sellassiable(31), 0);
  assert.equal(fixture.store.get('cflag:31:0'), undefined);
  assert.deepEqual(fixture.text_lines(), []);
});

test('CHECK_SELLASSIABLE：只达到出售门槛时停在一级状态', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.store.set('abl:31:0', 3);
  fixture.store.set('abl:31:10', 5);
  fixture.store.set('abl:31:11', 1);

  await fixture.load_module('system/stronghold/sale').check_sellassiable(31);

  assert.equal(fixture.store.get('cflag:31:0'), 1);
  assert.deepEqual(fixture.text_lines(), ['温妮可以卖掉了']);
});

test('CHECK_SELLASSIABLE：抖M气质三级可单独满足出售门槛', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.store.set('abl:31:0', 3); // 感觉前置；感觉合计仅 3
  fixture.store.set('abl:31:10', 3); // 与欲望合计 6；自身未到出售门槛
  fixture.store.set('abl:31:11', 3);
  fixture.store.set('abl:31:21', 3); // 六项析取中唯一成立的一项

  await fixture.load_module('system/stronghold/sale').check_sellassiable(31);

  assert.equal(fixture.store.get('cflag:31:0'), 1);
  assert.deepEqual(fixture.text_lines(), ['温妮可以卖掉了']);
});

test('CHECK_SELLASSIABLE：感觉、反抗系与克制系前置门槛分别生效', async () => {
  const cases = [
    { label: '感觉不足', patch: { 'abl:31:0': 2 } },
    {
      label: '反抗心要求顺从四级',
      patch: { 'abl:31:10': 3, 'abl:31:11': 5, 'talent:31:11': 1 },
    },
    {
      label: '克制要求欲望四级',
      patch: { 'abl:31:10': 5, 'abl:31:11': 3, 'talent:31:20': 1 },
    },
  ];
  for (const { label, patch } of cases) {
    const fixture = create_era_fixture();
    seed_world(fixture);
    fixture.store.set('abl:31:0', 3);
    fixture.store.set('abl:31:10', 5);
    fixture.store.set('abl:31:11', 4);
    for (const [key, value] of Object.entries(patch))
      fixture.store.set(key, value);
    await fixture.load_module('system/stronghold/sale').check_sellassiable(31);
    assert.equal(fixture.store.get('cflag:31:0'), undefined, label);
  }
});

test('SALE_CHARA：确认后结算资金、非作弊资金与威望并传递售价给口上', async () => {
  const fixture = create_era_fixture();
  const era_flag = seed_world(fixture);
  fixture.set_inputs(0);

  const { sale_chara } = fixture.load_module('system/stronghold/sale');
  const price = await sale_chara(31, {
    rand: seq([0]),
    prostitution_effect: 0,
  });

  assert.equal(price, 10);
  assert.equal(era_flag.money, 110);
  assert.equal(fixture.store.get('exflag:4444'), 10);
  assert.equal(fixture.store.get('exflag:99'), 5);
  assert.equal(
    fixture.load_module('event/event-aftertrain').peek_sale_price(),
    10,
  );
  assert(fixture.text_lines().includes('温妮以10点卖掉了。'));
  assert(fixture.text_lines().includes('威望值增加'));
});

test('SALE_CHARA：取消后不结算并返回 -1', async () => {
  const fixture = create_era_fixture();
  const era_flag = seed_world(fixture);
  fixture.set_inputs(1);

  const { sale_chara } = fixture.load_module('system/stronghold/sale');
  assert.equal(await sale_chara(31, { rand: seq([0]) }), -1);
  assert.equal(era_flag.money, 100);
  assert.equal(fixture.store.get('exflag:4444'), undefined);
  // #612：两键正文带「- 」是有意保留的格式
  assert.deepEqual(
    fixture.lines
      .filter((line) => line.type === 'button')
      .map((line) => line.rendered),
    ['[0] - 好的', '[1] - 不要'],
    '出售确认两键带「- 」',
  );
});

test('SALE_CHARA：精英或近卫出售会扣除威望', async () => {
  for (const key of ['talent:31:220', 'ex_talent:31:1']) {
    const fixture = create_era_fixture();
    seed_world(fixture);
    fixture.store.set(key, 1);
    fixture.set_inputs(0);
    await fixture
      .load_module('system/stronghold/sale')
      .sale_chara(31, { rand: seq([0]) });
    assert.equal(fixture.store.get('exflag:99'), -10, key);
    assert(fixture.text_lines().includes('威望值减少'));
  }
});

test('SALE_CHARA：据点不创建调教表，确认出售仍按估价增加威望', async () => {
  const fixture = create_era_fixture();
  join_slave_chara(fixture, 0, '你');
  join_slave_chara(fixture, 31, '温妮');
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  fixture.set_inputs(0);

  const { estimate_chara, sale_chara } = fixture.load_module(
    'system/stronghold/sale',
  );
  const expected = estimate_chara(31, { prostitution_effect: 2 }).price;
  assert.ok(expected > 0, '卖淫影响 2 的估价不再被卖淫经验归零');

  assert.equal(
    await sale_chara(31, { prostitution_effect: 2, rand: seq([0]) }),
    expected,
  );
  assert.equal(fixture.store.get('exflag:99'), 5);
  assert.deepEqual(fixture.era.getCharactersInTrain(), []);
  assert(!fixture.calls.some(({ api }) => api === 'beginTrain'));
  assert(!fixture.calls.some(({ api }) => api === 'endTrain'));
});

test('CHARA_SALE：重复选择零价角色不进入确认且不改动数据', async () => {
  const fixture = create_era_fixture();
  join_slave_chara(fixture, 0, '你');
  join_slave_chara(fixture, 31, '温妮');
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = -1;
  era_flag.money = 100;
  fixture.store.set('flag:1', -1);
  fixture.store.set('flag:2', -1);
  fixture.store.set('exflag:99', 0);
  // 基础价 10（欲望零级）× 卖淫经验低档 40% × 素质 73 的 20% 恰好归零
  fixture.store.set('cflag:31:0', 1);
  fixture.store.set('base:31:0', 100);
  fixture.store.set('exp:31:74', 1);
  fixture.store.set('talent:31:73', 1);
  fixture.set_inputs(31, 0, 31, 0, 999);

  const { chara_sale } = fixture.load_module('system/stronghold/sale');
  const before = new Map(fixture.store);
  assert.equal(
    await chara_sale({ prostitution_effect: 0, rand: seq([0]) }),
    999,
  );

  assert.deepEqual(fixture.era.getAddedCharacters(), [0, 31]);
  assert.deepEqual(fixture.store, before, '拒绝零价出售不改动角色或结算数据');
  assert(
    fixture.lines_history.some(
      (line) =>
        line.type === 'button' &&
        line.accelerator === 31 &&
        line.rendered.includes('[不能卖掉]'),
    ),
    '零价角色仍标明不能卖掉',
  );
  assert.equal(
    fixture.lines_history.some(
      (line) => line.type === 'button' && [0, 1].includes(line.accelerator),
    ),
    false,
    '零价角色不进入出售确认',
  );
  assert(!history_text_lines(fixture).some((line) => line.includes('卖掉了')));
});

test('SALE_CHARA：零价普通、精英与近卫角色不结算也不触发出售口上', async () => {
  for (const key of [undefined, 'talent:19:220', 'ex_talent:19:1']) {
    const fixture = create_era_fixture();
    join_slave_chara(fixture, 0, '你');
    join_slave_chara(fixture, 19, '菲娅');
    const era_flag = fixture.load_module('era-utils/era-flag');
    era_flag.target = 19;
    era_flag.money = 100;
    fixture.store.set('flag:7', 1);
    fixture.store.set('exflag:99', 50);
    fixture.store.set('exflag:4444', 75);
    fixture.store.set('exp:19:74', 1);
    fixture.store.set('talent:19:73', 1);
    fixture.store.set('talent:19:179', 1);
    fixture.store.set('talent:19:85', 1);
    if (key) fixture.store.set(key, 1);
    fixture.set_inputs(0);
    fixture.load_module('kojo/kojo-k19-fia');
    const aftertrain = fixture.load_module('event/event-aftertrain');
    aftertrain.remember_sale_price(12345);
    const before = new Map(fixture.store);

    assert.equal(
      await fixture.load_module('system/stronghold/sale').sale_chara(19, {
        prostitution_effect: 0,
        rand: seq([0]),
      }),
      -1,
      key,
    );

    assert.deepEqual(fixture.era.getAddedCharacters(), [0, 19], key);
    assert.deepEqual(fixture.store, before, key);
    assert.equal(aftertrain.peek_sale_price(), 12345, key);
    assert.equal(fixture.reset_inputs(), 1, '拒绝零价出售不等待确认输入');
    assert(!fixture.lines.some((line) => line.type === 'button'), key);
    assert(
      !fixture.text_lines().some((line) => /卖掉了|商人当做女仆/.test(line)),
      key,
    );
  }
});

test('CHARA_SALE：售价仅 1 点仍能正常成交并除名', async () => {
  const fixture = create_era_fixture();
  const era_flag = seed_world(fixture);
  fixture.store.set('cflag:31:0', 1);
  fixture.store.set('base:31:0', 100);
  // 欲望零级基础价 10 × 生育经验一次的 50% × 否定快感的 20% = 1。
  fixture.store.set('exp:31:60', 1);
  fixture.store.set('talent:31:73', 1);
  fixture.set_inputs(31, 0, 999);

  assert.equal(
    await fixture.load_module('system/stronghold/sale').chara_sale({
      prostitution_effect: 0,
      rand: seq([0]),
    }),
    999,
  );

  assert.deepEqual(fixture.era.getAddedCharacters(), [0, 32]);
  assert.equal(era_flag.money, 101);
  assert.equal(fixture.store.get('exflag:4444'), 1);
  assert.equal(fixture.store.get('exflag:99'), 5);
  assert(history_text_lines(fixture).includes('温妮以1点卖掉了。'));
});

test('SALE_CHARA：调教外事件码能抵达角色出售口上', async () => {
  const fixture = create_era_fixture();
  join_slave_chara(fixture, 0, '你');
  join_slave_chara(fixture, 19, '菲娅');
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 19;
  fixture.store.set('flag:7', 1);
  fixture.store.set('talent:19:179', 1);
  fixture.store.set('talent:19:85', 1);
  fixture.set_inputs(0);
  fixture.load_module('kojo/kojo-k19-fia');

  await fixture
    .load_module('system/stronghold/sale')
    .sale_chara(19, { rand: seq([0]) });

  assert(fixture.text_lines().some((line) => line.includes('商人当做女仆')));
  assert(!fixture.calls.some(({ api }) => api === 'beginTrain'));
});

test('SALE_CHARA：K4/K7 在调教外从事件上下文取得出售事件码', async () => {
  for (const [module_name, cid, talent_id] of [
    ['kojo/kojo-k4-stoic', 4, 164],
    ['kojo/kojo-k7-heart', 7, 167],
  ]) {
    const fixture = create_era_fixture();
    join_slave_chara(fixture, 0, '你');
    join_slave_chara(fixture, cid, `角色${cid}`);
    const era_flag = fixture.load_module('era-utils/era-flag');
    era_flag.target = cid;
    fixture.store.set('flag:7', 1);
    fixture.store.set(`base:${cid}:0`, 100);
    fixture.store.set(`talent:${cid}:${talent_id}`, 1);
    fixture.set_inputs(0, 999);
    fixture.load_module(module_name);

    const price = await fixture
      .load_module('system/stronghold/sale')
      .sale_chara(cid, { rand: seq([0]) });

    assert.equal(typeof price, 'number', module_name);
    assert(
      fixture.text_lines().some((line) => line.includes('卖掉了')),
      module_name,
    );
    assert(!fixture.calls.some(({ api }) => api === 'beginTrain'), module_name);
  }
});

test('LONG_GOOD_BYE：关系与性格累积压力，过百时崩坏并失去爱慕', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.store.set('cflag:32:21', 31);
  fixture.store.set('cflag:32:22', 31);
  fixture.store.set('talent:32:85', 1); // 爱慕：压力 -120，240 - 120 仍过百

  const { long_good_bye } = fixture.load_module('system/stronghold/sale');
  assert.equal(await long_good_bye(31), 0);

  assert.equal(fixture.store.get('talent:32:9'), 1);
  assert.equal(fixture.store.get('talent:32:85'), 0);
  assert(
    fixture.text_lines().some((line) => line.includes('心里什么东西坏掉了')),
  );
});

test('LONG_GOOD_BYE：崩坏时一并失去淫乱', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.store.set('cflag:32:21', 31);
  fixture.store.set('cflag:32:22', 31);
  fixture.store.set('talent:32:76', 1); // 淫乱：压力 -60，240 - 60 仍过百

  await fixture.load_module('system/stronghold/sale').long_good_bye(31);

  assert.equal(fixture.store.get('talent:32:9'), 1);
  assert.equal(fixture.store.get('talent:32:76'), 0);
});

test('KILL_TARGET：经队伍门面除名，清除指向被售角色的历史指针', async () => {
  const fixture = create_era_fixture();
  const era_flag = seed_world(fixture);
  fixture.store.set('flag:1', 31);
  fixture.store.set('flag:2', 31);

  const { kill_target } = fixture.load_module('system/stronghold/sale');
  assert.equal(await kill_target(31), 0);

  assert.equal(fixture.store.get('flag:230'), 1);
  assert.deepEqual(fixture.era.getAddedCharacters(), [0, 32]);
  assert.equal(fixture.store.get('flag:1'), -1);
  assert.equal(fixture.store.get('flag:2'), -1);
  assert.equal(era_flag.target, -1);
  assert.equal(era_flag.assi, -1);
  assert(
    fixture.calls.some(
      ({ api, args }) => api === 'removeCharacter' && args[0] === 31,
    ),
  );
});

test('KILL_TARGET：后代的死亡标记按来源模板号落位（#561 第 2 条）', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  // 后代形状的角色：ID 落在 FIRST_CHILD_ID 段（模板 1 的 100000-100099），
  // template_no_of 拆出模板 1——与真后代走同一条寻址（不必跑生育流程）
  fixture.seed_chara(1, { name: '后代模板' });
  assert.equal(fixture.era.addCharacter([100000, 1]), true);

  const { kill_target } = fixture.load_module('system/stronghold/sale');
  assert.equal(await kill_target(100000), 0);

  assert.equal(fixture.store.get('flag:200'), 1, '模板 1 → FLAG:200');
  assert.equal(
    fixture.store.get('flag:100199'),
    undefined,
    '不按角色 ID 直加（100000 + 199 = 100199）',
  );
});

test('CHARA_SALE：确认出售后连续重画，退出时恢复上次调教对象', async () => {
  const fixture = create_era_fixture();
  const era_flag = seed_world(fixture);
  era_flag.target = 32;
  fixture.store.set('flag:1', 32);
  fixture.store.set('cflag:31:0', 1);
  fixture.store.set('cflag:31:1', 0);
  fixture.store.set('base:31:0', 100);
  fixture.set_inputs(31, 0, 999);

  const { chara_sale } = fixture.load_module('system/stronghold/sale');
  assert.equal(await chara_sale({ rand: seq([0]) }), 999);

  assert.deepEqual(fixture.era.getAddedCharacters(), [0, 32]);
  assert.equal(era_flag.target, 32, '退出列表时恢复 FLAG:1');
  assert.equal(era_flag.money, 110);
  assert(
    fixture.lines_history.some(
      (line) => line.type === 'button' && line.accelerator === 31,
    ),
    '可售角色必须以可点击按钮显示（列表屏每轮换屏，跨屏取证走行史）',
  );
  assert(!fixture.text_lines().some((line) => line.includes('@CHARA_SALE')));
});

test('CHARA_SALE：所持金保留格式串中的字面量 $', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.set_inputs(999);

  await fixture.load_module('system/stronghold/sale').chara_sale();

  assert(fixture.text_lines().includes('所持金：$100点'));
});

test('CHARA_SALE：确认出售后送别、除名并结算威望', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.store.set('cflag:31:0', 1);
  fixture.store.set('base:31:0', 100);
  fixture.store.set('exp:31:74', 1); // 卖淫影响 2：经验不作用于估价
  fixture.set_inputs(31, 0, 999);

  const { chara_sale, estimate_chara } = fixture.load_module(
    'system/stronghold/sale',
  );
  const { price } = estimate_chara(31, { prostitution_effect: 2 });
  assert.ok(price > 0, '估价不再被卖淫经验归零');
  await chara_sale({ prostitution_effect: 2, rand: seq([0]) });

  assert(!fixture.era.getAddedCharacters().includes(31), '售出后除名');
  assert.equal(fixture.store.get('exflag:99'), 5);
  assert(history_text_lines(fixture).includes(`温妮以${price}点卖掉了。`));
  assert.equal(fixture.era.getAddedCharacters().length, 2, '送别不除名误伤');
});
for (const state of [1, 2]) {
  test(`CHARA_SALE：手输状态 ${state} 的角色拒绝出售且不改动数据`, async () => {
    const fixture = create_era_fixture();
    const era_flag = seed_world(fixture);
    fixture.store.set('cflag:32:0', 1);
    fixture.store.set('cflag:32:1', state);
    fixture.store.set('base:32:0', 100);
    fixture.store.set('talent:32:292', 0);
    fixture.store.set('cflag:32:700', 0);
    fixture.store.set('flag:1', 31);
    fixture.set_inputs(32, 0, 999);

    const { chara_sale } = fixture.load_module('system/stronghold/sale');
    const before = new Map(fixture.store);
    assert.equal(await chara_sale({ rand: seq([0]) }), 999);

    assert.deepEqual(fixture.era.getAddedCharacters(), [0, 31, 32]);
    assert.equal(era_flag.money, 100);
    assert.deepEqual(fixture.store, before, '拒绝选择不改动角色或结算数据');
    assert.equal(
      fixture.lines_history.some(
        (line) =>
          line.type === 'button' && [32, 0, 1].includes(line.accelerator),
      ),
      false,
      '状态非 0 的角色不显示在出售名单中，手输后也不进入确认',
    );
    assert(
      !history_text_lines(fixture).some((line) => line.includes('卖掉了')),
    );
  });
}

test('CHARA_SALE：收藏与影子角色即使手输编号也拒绝出售', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.store.set('cflag:31:0', 1);
  fixture.store.set('base:31:0', 100);
  fixture.store.set('cflag:31:700', 1);
  fixture.store.set('cflag:32:0', 1);
  fixture.store.set('base:32:0', 100);
  fixture.store.set('talent:32:292', 1);
  fixture.store.set('flag:1', 31);
  fixture.set_inputs(31, 32, 999);

  await fixture.load_module('system/stronghold/sale').chara_sale();

  assert.deepEqual(fixture.era.getAddedCharacters(), [0, 31, 32]);
  assert(history_text_lines(fixture).some((line) => line.includes('收藏列表')));
  assert(history_text_lines(fixture).some((line) => line.includes('只是影子')));
});

test('USERSHOP 106：从据点分发进入 CHARA_SALE 真身', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.store.set('cflag:31:0', 1);
  fixture.store.set('base:31:0', 100);
  fixture.set_inputs(31, 0, 999);

  await fixture.load_module('page/page-shop').usershop(106);

  assert(!fixture.era.getAddedCharacters().includes(31));
  assert(!fixture.text_lines().some((line) => line.includes('@CHARA_SALE')));
});

test('CHECK_SELLASSIABLE：回合结束与珠结算两个入口，以及能力提升出口都调用真身', async () => {
  const turnend = create_era_fixture();
  seed_world(turnend);
  for (const id of [0, 10, 11, 12, 22]) {
    turnend.store.set(`abl:31:${id}`, id === 22 ? 3 : id === 11 ? 4 : 5);
  }
  turnend.load_module('event/event-turnend');
  await turnend.load_module('system/event/registry').emit('EVENTTURNEND');
  assert.equal(turnend.store.get('cflag:31:0'), 2);
  assert(
    !turnend.text_lines().some((line) => line.includes('@CHECK_SELLASSIABLE')),
  );

  const juel = create_era_fixture();
  seed_world(juel);
  for (const id of [0, 10, 11, 12, 22]) {
    juel.store.set(`abl:31:${id}`, id === 22 ? 3 : id === 11 ? 4 : 5);
  }
  juel.set_inputs(999);
  await juel.load_module('system/train/juel-check').run_juel_check();
  assert.equal(juel.store.get('cflag:31:0'), 2);
  assert(
    !juel.text_lines().some((line) => line.includes('@CHECK_SELLASSIABLE')),
  );

  // 能力提升的出口：ability_up_core 的 [999] 支（#397 起真身实现——
  // usershop(105) 改开能力提升菜单，出售资格复核在 ability_up_core 退出时发生）
  const ability = create_era_fixture();
  seed_world(ability);
  for (const id of [0, 10, 11, 12, 22]) {
    ability.store.set(`abl:31:${id}`, id === 22 ? 3 : id === 11 ? 4 : 5);
  }
  ability.set_inputs(999);
  await ability.load_module('page/page-ability-up').ability_up_core(31);
  assert.equal(ability.store.get('cflag:31:0'), 2);
  assert(
    !ability.text_lines().some((line) => line.includes('@CHECK_SELLASSIABLE')),
  );
});

test('菲娅两份 SELF_KOJO：出售分支按售价而非调教后性交次数分档', async () => {
  for (const [module_name, cid] of [
    ['kojo/kojo-k19-fia', 19],
    ['kojo/kojo-k904-fia', 904],
  ]) {
    const fixture = create_era_fixture();
    join_slave_chara(fixture, 0, '你');
    join_slave_chara(fixture, cid, '菲娅');
    const era_flag = fixture.load_module('era-utils/era-flag');
    era_flag.target = cid;
    fixture.era.beginTrain(...fixture.era.getAddedCharacters());
    fixture.store.set('tflag:13', 6);
    fixture.store.set('flag:7', 1);
    fixture.store.set(`talent:${cid}:85`, 1);
    if (cid === 19) fixture.store.set('talent:19:179', 1);
    else fixture.store.set('ex_talent:904:104', 1);
    const aftertrain = fixture.load_module('event/event-aftertrain');
    aftertrain.remember_aftertrain_s(0);
    aftertrain.remember_sale_price(1_000_000);

    fixture.load_module(module_name);
    await fixture.load_module('kojo/kojo-system').self_kojo();

    assert(
      fixture.text_lines().some((line) => line.includes('现今当政的人类国王')),
      module_name,
    );
  }
});
