/**
 * @file 博物馆处刑 @MUSEUM 的行为测试（issue #347，阶段 5a L16）。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { output_name_for } = require('../tools/kojo-transpiler');
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
  fixture.era.addCharacter(0);
  fixture.era.addCharacter(31);
  fixture.era.beginTrain(0, 31);
  fixture.store.set('cflag:31:9', 4); // 角色等级
  for (const slot of [550, 551, 552]) {
    fixture.store.set(`cflag:31:${slot}`, -1);
  }
  return fixture;
}

test('转译器：MUSEUM.ERB 登记为 ASCII 意译产物名', () => {
  assert.equal(output_name_for('MUSEUM.ERB'), 'museum.js');
});

test('MUSEUM：家具化后记录展品、结算封印经验并除名角色', async () => {
  const fixture = seed_world();
  fixture.set_inputs(8);
  const { museum } = fixture.load_module('event/event-museum');

  assert.equal(await museum(31, seq([0])), 0);

  assert.equal(fixture.store.get('flag:84'), 1, '装饰品总数 +1');
  assert.equal(fixture.store.get('flag:608'), 1, '家具数 +1');
  assert.equal(
    fixture.store.get('videoarchive:31'),
    '人形桌子温妮',
    'SUISEI_STR:A 保存展品名与角色名',
  );
  assert.equal(fixture.store.get('tstr:30'), '', 'VIDEO_MATURO 消费暂存标题');
  assert.equal(fixture.store.get('exp:0:80'), 250, '等级 4 → (4 + 1) × 50');
  assert.equal(fixture.store.get('flag:230'), 1, 'FLAG:(NO + 199) 记录展品化');
  assert.deepEqual(fixture.era.getAddedCharacters(), [0], '目标从角色列表除名');
  assert(
    fixture.text_lines().includes('她的身体变成了桌子的样子。'),
    '连续 PRINTFORM 片段必须留在同一输出行',
  );
});

test('MUSEUM：魔王不能成为展品且不产生输出或状态变化', async () => {
  const fixture = seed_world();
  const { museum } = fixture.load_module('event/event-museum');

  assert.equal(await museum(0, seq([0])), 0);
  assert.deepEqual(fixture.text_lines(), []);
  assert.deepEqual(fixture.era.getAddedCharacters(), [0, 31]);
  assert.equal(fixture.store.get('flag:84'), undefined);
});

test('MUSEUM：拒绝范围外输入，直到选中有效展品', async () => {
  const fixture = seed_world();
  fixture.set_inputs(-1, 10, 8);
  const { museum } = fixture.load_module('event/event-museum');

  await museum(31, seq([0]));

  assert.equal(fixture.store.get('flag:608'), 1);
  assert.equal(fixture.store.get('videoarchive:31'), '人形桌子温妮');
});

test('MUSEUM：保留原作隐藏输入 100 的无分类处刑路径', async () => {
  const fixture = seed_world();
  fixture.set_inputs(100);
  const { museum } = fixture.load_module('event/event-museum');

  await museum(31, seq([0]));

  assert.equal(fixture.store.get('flag:84'), undefined, '不增加任何展品分类');
  assert.equal(fixture.store.get('videoarchive:31'), '温妮');
  assert.deepEqual(fixture.era.getAddedCharacters(), [0], '仍执行公共处刑尾段');
});

test('MUSEUM：隐藏输入 100 继承原作 MATURO 静态残值', async () => {
  const fixture = seed_world();
  fixture.seed_chara(32, { id: 32, name: '妹妹', callname: '妹妹' });
  fixture.era.addCharacter(32);
  const { museum } = fixture.load_module('event/event-museum');

  fixture.set_inputs(8);
  await museum(31, seq([0]));
  fixture.set_inputs(100);
  await museum(32, seq([0]));

  assert.equal(fixture.store.get('videoarchive:32'), '人形桌子妹妹');
});

test('MUSEUM：按角色性格分发口上并透传确定性随机源', async () => {
  const fixture = seed_world();
  fixture.store.set('talent:31:163', 1); // 高贵性格 → K3
  fixture.set_inputs(8);
  const { museum } = fixture.load_module('event/event-museum');
  const { museum_koujo_family } = fixture.load_module('kojo/kojo-system');
  let observed;
  museum_koujo_family.register(3, async (rand_n) => {
    observed = [fixture.store.get('tflag:500'), rand_n(4)];
    return 0;
  });

  await museum(31, seq([2, 0]));

  assert.deepEqual(observed, [8, 2]);
});

test('MUSEUM：K0 旧签名收到展品编号', async () => {
  const fixture = seed_world();
  fixture.store.set('talent:31:160', 1); // 慈爱性格 → K0
  fixture.set_inputs(8);
  const { museum } = fixture.load_module('event/event-museum');
  const { museum_koujo_family } = fixture.load_module('kojo/kojo-system');
  let observed;
  museum_koujo_family.register(0, async (event_type) => {
    observed = event_type;
    return 0;
  });

  await museum(31, seq([0]));

  assert.equal(observed, 8);
});

test('MUSEUM：K2 与 K4 口上模块注册博物馆处理器', () => {
  for (const [id, module_name] of [
    [2, 'kojo/kojo-k2-timid'],
    [4, 'kojo/kojo-k4-stoic'],
  ]) {
    const fixture = create_era_fixture();
    fixture.load_module(module_name);
    const { museum_koujo_family } = fixture.load_module('kojo/kojo-system');
    assert.equal(museum_koujo_family.has(id), true, `K${id} 必须注册`);
  }
});

test('MUSEUM：十类展品各写正确名称与分类计数', async (t) => {
  const cases = [
    [0, 600, '石膏像温妮'],
    [1, 601, '标本温妮'],
    [2, 602, '蜡像温妮'],
    [3, 603, '肉感模型人偶温妮'],
    [4, 604, '球型关节人偶温妮'],
    [5, 605, '白金像温妮'],
    [6, 606, '冰封冰雕温妮'],
    [7, 607, '蛋白石雕像温妮'],
    [8, 608, '人形桌子温妮'],
    [9, 609, '森女画温妮'],
  ];

  for (const [choice, counter, title] of cases) {
    await t.test(`选项 ${choice}`, async () => {
      const fixture = seed_world();
      fixture.set_inputs(choice);
      const { museum } = fixture.load_module('event/event-museum');

      await museum(31, seq([0]));

      assert.equal(fixture.store.get(`flag:${counter}`), 1);
      assert.equal(fixture.store.get('videoarchive:31'), title);
    });
  }
});

test('MUSEUM：原作 ELSEIF 会重新掷 RAND', async () => {
  const fixture = seed_world();
  fixture.set_inputs(0);
  const { museum } = fixture.load_module('event/event-museum');

  await museum(31, seq([2, 1]));

  assert.equal(fixture.store.get('videoarchive:31'), '大理石像温妮');
});

test('MUSEUM：保留原作 LOCALS 跨调用残值', async () => {
  const fixture = seed_world();
  fixture.seed_chara(32, { id: 32, name: '妹妹', callname: '妹妹' });
  fixture.era.addCharacter(32);
  fixture.store.set('talent:31:153', 1); // 妊娠
  const { museum } = fixture.load_module('event/event-museum');

  fixture.set_inputs(1);
  await museum(31, seq([0]));
  fixture.set_inputs(7);
  await museum(32, seq([0]));

  assert.equal(
    fixture.store.get('videoarchive:32'),
    '妊娠蛋白石雕像妹妹',
    '宝石支没有重置 LOCALS，会继承前一次处刑的前缀',
  );
});

test('MUSEUM：家族末路、装备回收、威望与造型王实绩一并结算', async () => {
  const fixture = seed_world();
  fixture.seed_chara(32, { id: 32, name: '妹妹', callname: '妹妹' });
  fixture.era.addCharacter(32);
  fixture.store.set('talent:31:165', 1); // 村娘 A
  fixture.store.set('talent:32:171', 1); // 村娘 B，SEARCH_FAMILY 互找
  fixture.store.set('cflag:31:550', 6);
  fixture.store.set('cflag:31:551', 45);
  fixture.store.set('cflag:31:552', 47);
  fixture.store.set('flag:84', 19);
  fixture.store.set('flag:10000', 59); // DAY
  fixture.store.set('exflag:99', 70);
  fixture.store.set('talentname:329', '造型王');
  fixture.set_inputs(1);
  const { museum } = fixture.load_module('event/event-museum');

  await museum(31, seq([0]));

  assert.equal(fixture.store.get('cstr:32:5'), '标本');
  assert.equal(fixture.store.get('item:306'), 1, '武器退回库存');
  assert.equal(fixture.store.get('item:345'), 1, '装饰退回库存');
  assert.equal(fixture.store.get('item:347'), 1, '装饰2退回库存');
  assert.equal(fixture.store.get('cflag:31:550'), -1);
  assert.equal(fixture.store.get('cflag:31:551'), -1);
  assert.equal(fixture.store.get('cflag:31:552'), -1);
  assert.equal(fixture.store.get('exflag:99'), 72, '普通角色使威望 +2');
  assert.equal(fixture.store.get('talent:0:329'), 1, '20 件展品且 60 日前解锁');
  assert(fixture.text_lines().includes('你获得了造型王'));
});

test('MUSEUM：特殊角色扣威望，稳定角色 ID 下不递减其他角色指针', async () => {
  const fixture = seed_world();
  fixture.store.set('talent:31:220', 1);
  fixture.store.set('exflag:99', 70);
  fixture.store.set('flag:1', 40);
  fixture.store.set('flag:2', 31);
  fixture.set_inputs(2);
  const { museum } = fixture.load_module('event/event-museum');

  await museum(31, seq([0]));

  assert.equal(fixture.store.get('exflag:99'), 60);
  assert.equal(fixture.store.get('flag:1'), 40, '更大角色 ID 不因除名而递减');
  assert.equal(fixture.store.get('flag:2'), -1, '指向被删角色时清空');
});

test('MUSEUM：已有造型王只翻倍显示经验，不翻倍实际入账', async () => {
  const fixture = seed_world();
  fixture.store.set('talent:0:329', 1);
  fixture.set_inputs(8);
  const { museum } = fixture.load_module('event/event-museum');

  await museum(31, seq([0]));

  assert.equal(fixture.store.get('exp:0:80'), 250);
  const lines = fixture.text_lines();
  assert(lines.some((line) => line.includes('因为造型王实绩的双倍加成，最后')));
  assert(lines.some((line) => line.includes('获得了500点的经验值！》')));
});
