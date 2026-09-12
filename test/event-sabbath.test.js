/**
 * @file 安息日事件 @SABBATH / @SABBATH_DAY 的行为测试（issue #405）。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_chara_0, join_slave_chara } = require('./helpers/chara');

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
  preset_chara_0(fixture);
  join_slave_chara(fixture, 31, '琼');
  return fixture;
}

// —— @SABBATH 守卫 ——

test('SABBATH：非调教状态（CFLAG:1 != 0）直接跳过', async () => {
  const fixture = seed_world();
  const { sabbath } = fixture.load_module('event/event-sabbath');
  fixture.store.set('cflag:31:1', 1);
  fixture.store.set('flag:10002', 15);
  fixture.store.set('talent:31:242', 1);
  fixture.store.set('talent:31:76', 1);

  assert.equal(await sabbath(31, seq([0])), 0);
  assert.deepEqual(fixture.text_lines(), []);
});

test('SABBATH：非满月（当月非 15 日）跳过', async () => {
  const fixture = seed_world();
  const { sabbath } = fixture.load_module('event/event-sabbath');
  fixture.store.set('talent:31:242', 1);
  fixture.store.set('talent:31:76', 1);

  for (const date of [1, 14, 16, 30]) {
    fixture.store.set('flag:10002', date);
    // eslint-disable-next-line no-await-in-loop
    assert.equal(await sabbath(31, seq([0])), 0);
  }
  assert.deepEqual(fixture.text_lines(), []);
});

test('SABBATH：无法术也无咒术跳过', async () => {
  const fixture = seed_world();
  const { sabbath } = fixture.load_module('event/event-sabbath');
  fixture.store.set('flag:10002', 15);
  fixture.store.set('talent:31:76', 1);

  assert.equal(await sabbath(31, seq([0])), 0);
  assert.deepEqual(fixture.text_lines(), []);
});

test('SABBATH：非淫乱跳过', async () => {
  const fixture = seed_world();
  const { sabbath } = fixture.load_module('event/event-sabbath');
  fixture.store.set('flag:10002', 15);
  fixture.store.set('talent:31:242', 1);

  assert.equal(await sabbath(31, seq([0])), 0);
  assert.deepEqual(fixture.text_lines(), []);
});

// —— @SABBATH 开场分支与经历分支 ——

function seed_sabbath_ready(fixture) {
  fixture.store.set('flag:10002', 15);
  fixture.store.set('talent:31:242', 1); // 法术
  fixture.store.set('talent:31:76', 1); // 淫乱
}

test('SABBATH：男奴隶路径无数值结算，只有开场与侍奉台词', async () => {
  const fixture = seed_world();
  const { sabbath } = fixture.load_module('event/event-sabbath');
  seed_sabbath_ready(fixture);
  fixture.store.set('talent:31:122', 1); // 男奴隶

  assert.equal(await sabbath(31, seq([0])), 0);
  assert.deepEqual(fixture.text_lines(), [
    '琼参与了献给无名的淫荡女神的仪式，全裸的魔族女性和女奴隶在陪侍着，对地下城里的怪物们，进行了性施舍。',
    '琼抱着魔族女人，',
    '将精液施舍给了她。',
  ]);
  assert.equal(fixture.store.get('exp:31:1'), undefined, '无肛门经验');
  assert.equal(fixture.store.get('exp:31:0'), undefined, '无私处经验');
  assert.equal(fixture.store.get('exp:31:20'), undefined, '无精液经验');
});

test('SABBATH：扶她＋私处封印走肛门侍奉分支，尻穴狂加成生效', async () => {
  const fixture = seed_world();
  const { sabbath } = fixture.load_module('event/event-sabbath');
  seed_sabbath_ready(fixture);
  fixture.store.set('talent:31:121', 1); // 扶她
  fixture.store.set('talent:31:273', 1); // 私处封印
  fixture.store.set('talent:31:77', 1); // 尻穴狂

  // rand(10)=3 → count_a = 1(尻穴狂) + 3+1 = 5；rand(10)=5 → count_s = 5+5 = 10
  await sabbath(31, seq([3, 5]));

  assert.equal(fixture.store.get('exp:31:1'), 5, '肛门经验');
  assert.equal(fixture.store.get('exp:31:5'), 5, '性交经验＝肛门+私处(0)');
  assert.equal(fixture.store.get('exp:31:20'), 10, '精液经验');
  assert(fixture.text_lines().includes('琼陶醉在从后穴传递向前穴的快感中。'));
});

test('SABBATH：扶她无封印走全穴侍奉分支', async () => {
  const fixture = seed_world();
  const { sabbath } = fixture.load_module('event/event-sabbath');
  seed_sabbath_ready(fixture);
  fixture.store.set('talent:31:121', 1); // 扶她

  // count_v = rand(10)+1=4；count_a = rand(10)+1=6；count_s = 4+6+rand(10)=10+2=12
  await sabbath(31, seq([3, 5, 2]));

  assert.equal(fixture.store.get('exp:31:0'), 4, '私处经验');
  assert.equal(fixture.store.get('exp:31:1'), 6, '肛门经验');
  assert.equal(fixture.store.get('exp:31:20'), 12, '精液经验');
  assert(fixture.text_lines().includes('将自己能用上的穴，全部拿来侍奉阴茎。'));
});

test('SABBATH：处女走肛门侍奉分支', async () => {
  const fixture = seed_world();
  const { sabbath } = fixture.load_module('event/event-sabbath');
  seed_sabbath_ready(fixture);
  fixture.store.set('talent:31:0', 1); // 处女

  // count_a = rand(10)+1=4；count_s = 4+rand(10)=4+5=9
  await sabbath(31, seq([3, 5]));

  assert.equal(fixture.store.get('exp:31:1'), 4);
  assert.equal(fixture.store.get('exp:31:20'), 9);
  assert(fixture.text_lines().includes('琼纯洁的性器上被贴上了封条。'));
});

test('SABBATH：私处封印（非扶她非处女）走肛门侍奉分支', async () => {
  const fixture = seed_world();
  const { sabbath } = fixture.load_module('event/event-sabbath');
  seed_sabbath_ready(fixture);
  fixture.store.set('talent:31:273', 1); // 私处封印

  await sabbath(31, seq([3, 5]));

  assert.equal(fixture.store.get('exp:31:1'), 4);
  assert.equal(fixture.store.get('exp:31:20'), 9);
  assert(fixture.text_lines().includes('琼因为性器被封印着，'));
});

test('SABBATH：贞操带（装备+装饰位+开关三者齐全）走肛门侍奉分支', async () => {
  const fixture = seed_world();
  const { sabbath } = fixture.load_module('event/event-sabbath');
  seed_sabbath_ready(fixture);
  fixture.store.set('cflag:31:42', 79);
  fixture.store.set('cflag:31:40', 64);
  fixture.store.set('flag:37', 1);

  await sabbath(31, seq([3, 5]));

  assert.equal(fixture.store.get('exp:31:1'), 4);
  assert.equal(fixture.store.get('exp:31:20'), 9);
  assert(fixture.text_lines().includes('菊穴和嘴巴被塞得满满的，不曾空闲。'));
});

test('SABBATH：贞操带条件不全（缺开关）落到默认分支', async () => {
  const fixture = seed_world();
  const { sabbath } = fixture.load_module('event/event-sabbath');
  seed_sabbath_ready(fixture);
  fixture.store.set('cflag:31:42', 79);
  fixture.store.set('cflag:31:40', 64);
  // flag:37 未开启

  await sabbath(31, seq([0, 0, 0]));

  assert(
    fixture
      .text_lines()
      .includes('有空的怪物们不停地排着队，将她所有能用的穴都侵犯了一遍。'),
  );
});

test('SABBATH：兽奸中毒分支（abl:39>=1 且 rand(2)=0）含露出癖加成与兽奸经验', async () => {
  const fixture = seed_world();
  const { sabbath } = fixture.load_module('event/event-sabbath');
  seed_sabbath_ready(fixture);
  fixture.store.set('abl:31:39', 2); // 兽奸中毒 LV2
  fixture.store.set('abl:31:17', 3); // 露出癖 LV3
  fixture.store.set('talent:31:75', 1); // 性爱狂
  fixture.store.set('talent:31:77', 1); // 尻穴狂

  // rand(2)=0 触发；count_v = 3(露出) + 1(性爱狂) + rand(10)+2 = 3+1+(4+2)=10
  // count_a = 3(露出) + 1(尻穴狂) + rand(10)+2 = 3+1+(6+2)=12
  // count_s = count_a+count_v+rand(10) = 12+10+7=29；count_z = count_s = 29
  await sabbath(31, seq([0, 4, 6, 7]));

  assert.equal(fixture.store.get('exp:31:0'), 10);
  assert.equal(fixture.store.get('exp:31:1'), 12);
  assert.equal(fixture.store.get('exp:31:20'), 29);
  assert.equal(fixture.store.get('exp:31:56'), 29, '兽奸经验');
  assert(
    fixture
      .text_lines()
      .includes(
        '琼有着喜欢与野兽交配的传闻，聚集了很多从地下城里慕名而来的人。',
      ),
  );
});

test('SABBATH：abl:39>=1 但 rand(2)!=0 时不进入兽奸分支，落到默认分支', async () => {
  const fixture = seed_world();
  const { sabbath } = fixture.load_module('event/event-sabbath');
  seed_sabbath_ready(fixture);
  fixture.store.set('abl:31:39', 2);

  await sabbath(31, seq([1, 0, 0, 0]));

  assert.equal(
    fixture.store.get('exp:31:56'),
    undefined,
    '默认分支不产生兽奸经验',
  );
  assert(
    fixture
      .text_lines()
      .includes('有空的怪物们不停地排着队，将她所有能用的穴都侵犯了一遍。'),
  );
});

test('SABBATH：默认分支含露出癖与博爱加成', async () => {
  const fixture = seed_world();
  const { sabbath } = fixture.load_module('event/event-sabbath');
  seed_sabbath_ready(fixture);
  fixture.store.set('abl:31:17', 2); // 露出癖
  fixture.store.set('abl:31:16', 3); // 博爱

  // count_v = 2+3+rand(10)+1 = 5+ (4+1)=10；count_a = 2+3+(6+1)=12；count_s=10+12+rand(10)=22+7=29
  await sabbath(31, seq([4, 6, 7]));

  assert.equal(fixture.store.get('exp:31:0'), 10);
  assert.equal(fixture.store.get('exp:31:1'), 12);
  assert.equal(fixture.store.get('exp:31:20'), 29);
  assert(fixture.text_lines().includes('琼在观众的欢呼声中，开始了乱交派对。'));
  assert(
    fixture
      .text_lines()
      .includes('无论是多么丑陋的怪物和魔族，琼都一视同仁地给予了性施舍。'),
  );
});

test('SABBATH：童贞素质在结算末尾被清除', async () => {
  const fixture = seed_world();
  const { sabbath } = fixture.load_module('event/event-sabbath');
  seed_sabbath_ready(fixture);
  fixture.store.set('talent:31:1', 1);

  await sabbath(31, seq([0, 0, 0]));

  assert.equal(fixture.store.get('talent:31:1'), 0);
  assert(fixture.text_lines().includes('【童贞丧失】'));
});

test('SABBATH：性交/欲情/耻情点数按肛门+私处求和结算', async () => {
  const fixture = seed_world();
  const { sabbath } = fixture.load_module('event/event-sabbath');
  seed_sabbath_ready(fixture);
  fixture.store.set('talent:31:0', 1); // 处女：只产生肛门与精液

  await sabbath(31, seq([3, 5])); // count_a=4, count_s=9

  assert.equal(fixture.store.get('juel:31:2'), 4, '肛门点数');
  assert.equal(
    fixture.store.get('juel:31:1'),
    undefined,
    '无私处点数（count_v=0）',
  );
  assert.equal(
    fixture.store.get('juel:31:5'),
    (4 + 0 + 9 + 0) * 10,
    '欲情点数',
  );
  assert.equal(
    fixture.store.get('juel:31:8'),
    (4 + 0 + 9 + 0) * 10,
    '耻情点数',
  );
});

// —— @SABBATH_DAY 守卫 ——

function seed_sabbath_day_ready(fixture) {
  fixture.store.set('flag:10002', 3); // date % 3 === 0
  fixture.store.set('talent:31:242', 1);
  fixture.store.set('cflag:31:0', 2); // 已陷落
  fixture.store.set('cflag:31:152', 50); // 信仰值
}

test('SABBATH_DAY：非三日一次（date % 3 != 0）跳过', async () => {
  const fixture = seed_world();
  const { sabbath_day } = fixture.load_module('event/event-sabbath');
  seed_sabbath_day_ready(fixture);
  fixture.store.set('flag:10002', 4);

  assert.equal(await sabbath_day(31, seq([0])), 0);
  assert.deepEqual(fixture.text_lines(), []);
});

test('SABBATH_DAY：无法术无咒术跳过', async () => {
  const fixture = seed_world();
  const { sabbath_day } = fixture.load_module('event/event-sabbath');
  seed_sabbath_day_ready(fixture);
  fixture.store.set('talent:31:242', 0);

  assert.equal(await sabbath_day(31, seq([0])), 0);
  assert.deepEqual(fixture.text_lines(), []);
});

test('SABBATH_DAY：未陷落跳过', async () => {
  const fixture = seed_world();
  const { sabbath_day } = fixture.load_module('event/event-sabbath');
  seed_sabbath_day_ready(fixture);
  fixture.store.set('cflag:31:0', 0);

  assert.equal(await sabbath_day(31, seq([0])), 0);
  assert.deepEqual(fixture.text_lines(), []);
});

test('SABBATH_DAY：信仰值不足 40 跳过', async () => {
  const fixture = seed_world();
  const { sabbath_day } = fixture.load_module('event/event-sabbath');
  seed_sabbath_day_ready(fixture);
  fixture.store.set('cflag:31:152', 39);

  assert.equal(await sabbath_day(31, seq([0])), 0);
  assert.deepEqual(fixture.text_lines(), []);
});

// —— @SABBATH_DAY 四类题材分派（RAND:4） ——

test('SABBATH_DAY：user=0 且持有「野良犬」道具走兽奸仪式', async () => {
  const fixture = seed_world();
  const { sabbath_day } = fixture.load_module('event/event-sabbath');
  seed_sabbath_day_ready(fixture);
  fixture.store.set('item:22', 1);

  await sabbath_day(31, seq([0, 0]));

  assert(fixture.text_lines().includes('祭坛前，信徒的少女和山羊交配了起来……'));
});

test('SABBATH_DAY：user=0 但无「野良犬」道具落到默认题材', async () => {
  const fixture = seed_world();
  const { sabbath_day } = fixture.load_module('event/event-sabbath');
  seed_sabbath_day_ready(fixture);

  await sabbath_day(31, seq([0, 0]));

  assert(fixture.text_lines().includes('祭坛前，信徒的女孩自慰了起来……'));
});

test('SABBATH_DAY：user=1 且信仰值超 80 走乱交仪式', async () => {
  const fixture = seed_world();
  const { sabbath_day } = fixture.load_module('event/event-sabbath');
  seed_sabbath_day_ready(fixture);
  fixture.store.set('cflag:31:152', 81);

  await sabbath_day(31, seq([1, 0]));

  assert(fixture.text_lines().includes('祭坛前，信众们开始做起了爱……'));
});

test('SABBATH_DAY：user=1 但信仰值不足 80 落到默认题材', async () => {
  const fixture = seed_world();
  const { sabbath_day } = fixture.load_module('event/event-sabbath');
  seed_sabbath_day_ready(fixture);

  await sabbath_day(31, seq([1, 0]));

  assert(fixture.text_lines().includes('祭坛前，信徒的女孩自慰了起来……'));
});

test('SABBATH_DAY：user=2 持咒术且有阅历走死亡女神冒渎', async () => {
  const fixture = seed_world();
  const { sabbath_day } = fixture.load_module('event/event-sabbath');
  seed_sabbath_day_ready(fixture);
  fixture.store.set('cflag:31:152', 61);
  fixture.store.set('talent:31:250', 1); // 咒术
  fixture.store.set('talent:31:17', 1); // 露出癖

  await sabbath_day(31, seq([2, 0]));

  assert(fixture.text_lines().includes('献上了她被侵犯着的淫荡画像……'));
});

test('SABBATH_DAY：user=2 持法术（非咒术）且有阅历走圣洁女神冒渎', async () => {
  const fixture = seed_world();
  const { sabbath_day } = fixture.load_module('event/event-sabbath');
  seed_sabbath_day_ready(fixture);
  fixture.store.set('cflag:31:152', 61);
  fixture.store.set('talent:31:242', 1); // 法术，咒术保持 0
  fixture.store.set('talent:31:17', 1);

  await sabbath_day(31, seq([2, 0]));

  assert(fixture.text_lines().includes('唱起了她被人侵犯着的歌词……'));
});

test('SABBATH_DAY：user=2 且种族匹配大地/大海女神但无法术咒术时落到默认题材（原作死代码，见 event-sabbath.js 文件头）', async () => {
  const fixture = seed_world();
  const { sabbath_day } = fixture.load_module('event/event-sabbath');
  seed_sabbath_day_ready(fixture);
  fixture.store.set('cflag:31:152', 61);
  fixture.store.set('talent:31:242', 0);
  fixture.store.set('talent:31:250', 0);
  fixture.store.set('talent:31:315', 11);
  fixture.store.set('talent:31:17', 1);

  // 入口守卫要求 TALENT:242||TALENT:250，两者都清零时函数在此前已 RETURN 0，
  // 根本到不了 user===2 的种族分支——不会出现"展示着她的信徒被兽人侵犯的模样"
  assert.equal(await sabbath_day(31, seq([2, 0])), 0);
  assert.deepEqual(fixture.text_lines(), []);
});

test('SABBATH_DAY：user=2 但信仰值不足 60 落到默认题材', async () => {
  const fixture = seed_world();
  const { sabbath_day } = fixture.load_module('event/event-sabbath');
  seed_sabbath_day_ready(fixture);
  fixture.store.set('talent:31:250', 1);
  fixture.store.set('talent:31:17', 1);
  // cflag:152 维持 50，不足 60

  await sabbath_day(31, seq([2, 0]));

  assert(fixture.text_lines().includes('祭坛前，信徒的女孩自慰了起来……'));
});

test('SABBATH_DAY：user=3 直接落到默认题材', async () => {
  const fixture = seed_world();
  const { sabbath_day } = fixture.load_module('event/event-sabbath');
  seed_sabbath_day_ready(fixture);

  await sabbath_day(31, seq([3, 1]));

  assert(
    fixture
      .text_lines()
      .includes('献上了淫荡的雕像，信徒的少年在那上面喷上了精液……'),
  );
});
