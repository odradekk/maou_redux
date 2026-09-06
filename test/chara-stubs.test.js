/**
 * issue #332：阶段 5a 段 0 的角色侧前置函数。
 *
 * 缝是四个角色域模块的公开导出；所有持久状态与输出都通过项目唯一的
 * era-fixture 观察。随机命名的 RAND:N 经公开参数注入固定。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

const always = () => 0;

test('KARMA / FAITH：魂缚不变动，否则按各自上下限钳制', () => {
  const fixture = create_era_fixture();
  const { karma, faith } = fixture.load_module('chara/chara-stats');

  fixture.store.set('cflag:3:151', 195);
  fixture.store.set('cflag:3:152', 95);
  assert.equal(karma(3, 20), 0);
  assert.equal(faith(3, 20), 0);
  assert.equal(fixture.store.get('cflag:3:151'), 200);
  assert.equal(fixture.store.get('cflag:3:152'), 100);

  assert.equal(karma(3, -500), 0);
  assert.equal(faith(3, -500), 0);
  assert.equal(fixture.store.get('cflag:3:151'), -200);
  assert.equal(fixture.store.get('cflag:3:152'), 0);

  fixture.store.set('talent:3:274', 1); // TALENT:魂缚
  karma(3, 50);
  faith(3, 50);
  assert.equal(fixture.store.get('cflag:3:151'), -200, '魂缚阻止善恶值变化');
  assert.equal(fixture.store.get('cflag:3:152'), 0, '魂缚阻止信仰变化');
});

test('CHARA_LV_CHECK：负战斗经验触发降级、四项能力下降与可选播报', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('callname:4:-1', '玛奥');
  fixture.store.set('exp:4:80', -1); // EXP:80 战斗经验
  fixture.store.set('cflag:4:9', 3); // CFLAG:9 等级
  fixture.store.set('cflag:4:11', 20); // CFLAG:11 攻击力
  fixture.store.set('cflag:4:12', 21); // CFLAG:12 防御力
  fixture.store.set('cflag:4:13', 22); // CFLAG:13 基础攻击
  fixture.store.set('cflag:4:14', 23); // CFLAG:14 基础防御
  fixture.store.set('flag:5', 32); // FLAG:5 位 5：显示等级变化
  const { chara_lv_check } = fixture.load_module('chara/chara-stats');

  assert.equal(await chara_lv_check(4), 0);
  assert.equal(fixture.store.get('cflag:4:9'), 2);
  assert.equal(fixture.store.get('exp:4:80'), 20);
  assert.deepEqual(
    [11, 12, 13, 14].map((index) => fixture.store.get(`cflag:4:${index}`)),
    [19, 20, 21, 22],
  );
  assert(
    fixture.lines_history.some(
      (line) => line.type === 'text' && line.text === '玛奥下降了一级',
    ),
  );
});

test('CHARA_LV_CHECK：非负战斗经验不改状态', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('exp:4:80', 0);
  fixture.store.set('cflag:4:9', 3);
  const { chara_lv_check } = fixture.load_module('chara/chara-stats');
  await chara_lv_check(4);
  assert.equal(fixture.store.get('cflag:4:9'), 3);
  assert.equal(fixture.lines_history.length, 0);
});

test('CHARA_ID_OUTPUT：组合经历、首个性格与家族构成编号', () => {
  const fixture = create_era_fixture();
  fixture.store.set('talent:7:315', 4); // TALENT:成为勇者前的生活
  fixture.store.set('talent:7:163', 1); // 性格区间首个命中
  fixture.store.set('talent:7:168', 1); // 后续命中不得覆盖
  fixture.store.set('talent:7:320', 2); // 家族构成
  const { chara_id_output } = fixture.load_module('chara/chara-stats');
  assert.equal(chara_id_output(7), 202040);
});

test('CHARA_ID_OUTPUT：无性格命中时沿用 FOR 终值 179', () => {
  const fixture = create_era_fixture();
  const { chara_id_output } = fixture.load_module('chara/chara-stats');
  assert.equal(chara_id_output(7), 18000);
});

test('CHAR_SIZE_GENERATE：固定随机源生成三围，并写入胸围分量', () => {
  const fixture = create_era_fixture();
  const { char_size_generate } = fixture.load_module('chara/chara-body');
  assert.deepEqual(
    char_size_generate(6, 18, 0, always),
    [18, 18, 1551, 455, 780, 574, 822],
  );
  assert.equal(fixture.store.get('cflag:6:458'), 112, 'CFLAG:458 胸围差');
  assert.equal(fixture.store.get('cflag:6:459'), 668, 'CFLAG:459 下胸围');
});

test('CHAR_SIZE_GENERATE：胸围变化模式复用原身高体重，只记录重量差', () => {
  const fixture = create_era_fixture();
  fixture.store.set('cflag:6:453', 1600); // 身高
  fixture.store.set('cflag:6:454', 500); // 体重
  fixture.store.set('cflag:6:458', 500); // 原胸围差
  fixture.store.set('cflag:6:459', 1000); // 原下胸围
  const { char_size_generate } = fixture.load_module('chara/chara-body');
  assert.deepEqual(
    char_size_generate(6, 18, 1, always),
    [18, 18, 1600, 437, 801, 0, 0],
  );
  assert.equal(fixture.store.get('e:1'), -25, 'E:1 只记录胸围带来的重量差');
});

test('CHARA_MAKE_INHERIT：负亲本短路；有效亲本遍历范围并清理私处封印', () => {
  const fixture = create_era_fixture();
  const { chara_make_inherit } = fixture.load_module(
    'chara/chara-make-inherit',
  );
  assert.equal(chara_make_inherit(8, -1, 3), 8);
  assert.equal(fixture.lines_history.length, 0, '负亲本直接 RETURN');

  fixture.store.set('talent:8:122', 1); // TALENT:男人
  fixture.store.set('talent:8:273', 1); // TALENT:私处封印
  fixture.store.set('flag:10005', 9); // TARGET（原作 :24 省略角色号）
  fixture.store.set('talent:9:273', 1);
  fixture.store.set('talent:2:220', 1); // TALENT:精英
  fixture.store.set('talent:2:470', 1);
  fixture.store.set('talent:3:220', 1);
  fixture.store.set('talent:3:471', 1);
  assert.equal(chara_make_inherit(8, 2, 3), 8);
  assert.equal(fixture.store.get('talent:8:273'), 1, 'L_A 不被裸写命中');
  assert.equal(fixture.store.get('talent:9:273'), 0, '裸 TALENT 写 TARGET');
  const text = fixture.lines_history.map((line) => line.text).join('\n');
  assert.match(text, /角色 8 与亲本 2.*@CMI_MOM_COMPLEX/);
  assert.match(text, /角色 8 与亲本 3.*@CMI_MOM_COMPLEX/);
  assert.match(text, /角色 8.*@CMI_CONFLICT_CHECK/);
  assert.match(text, /素质 10：角色 8 继承 2\/3.*@CMI_SETTALENT/);
  assert.match(text, /素质 152：角色 8 继承 2\/3.*@CMI_SETTALENT/);
  assert.doesNotMatch(text, /素质 74：.*@CMI_SETTALENT/);
  assert.doesNotMatch(text, /素质 85：.*@CMI_SETTALENT/);
  assert.doesNotMatch(text, /素质 121：.*@CMI_SETTALENT/);
  assert.doesNotMatch(text, /素质 130：.*@CMI_SETTALENT/);
  assert.match(text, /素质 240：.*@CMI_SETTALENT/);
  assert.doesNotMatch(text, /素质 244：.*@CMI_SETTALENT/);
  assert.doesNotMatch(text, /素质 254：.*@CMI_SETTALENT/);
  assert.match(text, /素质 275：.*@CMI_SETTALENT/);
  assert.match(text, /素质 300：.*@CMI_SETTALENT/);
  assert.match(text, /素质 470：角色 8 继承 2\/-1.*@CMI_SETTALENT/);
  assert.match(text, /素质 471：角色 8 继承 3\/-1.*@CMI_SETTALENT/);
});

test('CHAR_INHERIT 转发层：JUMP 到 CHARA_MAKE_INHERIT 真身', () => {
  const fixture = create_era_fixture();
  const { char_inherit } = fixture.load_module('chara/char-make');
  assert.equal(char_inherit(8, -1), undefined);
});

test('CHARA_NAME_RANDOM_DEFINE：职业偏向选固定洋名，并以 JUMP 目标结束', () => {
  const fixture = create_era_fixture();
  fixture.store.set('talent:9:205', 1); // TALENT:骑士
  const { chara_name_random_define } = fixture.load_module('chara/chara-name');
  const result = chara_name_random_define(9, -1, (n) => (n === 10 ? 1 : 0));
  assert.equal(result, undefined, 'JUMP 路径不向调用点返回结果');
  assert.equal(fixture.store.get('cflag:9:6'), -1, '重复检查前先清固定名 ID');
  assert(
    fixture.lines_history.some(
      (line) =>
        line.type === 'text' &&
        line.text.includes('@CHARA_NAME_DEFINE') &&
        line.text.includes('NID 0'),
    ),
  );
});

test('CHARA_NAME_RANDOM_DEFINE：发现重名后改用组合名重掷', () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(2, { id: 2, name: '甲', callname: '甲' });
  fixture.era.addCharacter(2);
  fixture.store.set('cflag:2:6', 0);
  const rolls = [0, 0];
  const { chara_name_random_define } = fixture.load_module('chara/chara-name');
  chara_name_random_define(9, 1, () => rolls.shift() ?? 0);
  assert(
    fixture.lines_history.some(
      (line) => line.type === 'text' && line.text.includes('NID 4500'),
    ),
    '洋名 0 重复后切到组合名 4500',
  );
});

test('CHARA_NAME_RANDOM_DEFINE：和名编号使用 200 起始偏移', () => {
  const fixture = create_era_fixture();
  const { chara_name_random_define } = fixture.load_module('chara/chara-name');
  chara_name_random_define(9, 0, always);
  assert(
    fixture.lines_history.some(
      (line) => line.type === 'text' && line.text.includes('NID 200'),
    ),
  );
});

test('NAME_RESET：以 JUMP 语义转发到 CN_REBUILD 范围外存根', async () => {
  const fixture = create_era_fixture();
  const { name_reset } = fixture.load_module('chara/char-make');
  assert.equal(await name_reset(), undefined);
  assert(
    fixture.lines_history.some(
      (line) => line.type === 'text' && line.text.includes('@CN_REBUILD'),
    ),
  );
});
