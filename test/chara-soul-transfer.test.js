/**
 * @file ere/chara/chara-soul-transfer.js 的行为测试（issue #391）。
 *
 * 缝 = test/helpers/era-fixture.js。覆盖 swap_chara/personalock/
 * transferapp/bodycheck_maou/transfer_soul/soul_dislocation 六个函数。
 */

'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function seq(values) {
  let index = 0;
  return (n) => {
    const value = values[index++] ?? 0;
    assert.ok(value >= 0 && value < n, `随机值 ${value} 必须在 [0, ${n}) 内`);
    return value;
  };
}

function add_chara(fixture, cid, name = `角色${cid}`) {
  fixture.seed_chara(cid, { id: cid, name, callname: name });
  assert.equal(fixture.era.addCharacter(cid), true);
}

function printed_includes(fixture, substr) {
  return fixture.lines_history.some((line) => line.text?.includes(substr));
}

test('SWAP_CHARA：数值表与字符串表双向互换，双侧皆未声明时不凭空造键', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '奴隶甲');
  fixture.store.set('cflag:0:9', 10);
  fixture.store.set('cflag:1:9', 3);
  fixture.store.set('cstr:0:5', '旧文本A');
  fixture.store.set('cstr:1:5', '旧文本B');
  const { swap_chara } = fixture.load_module('chara/chara-soul-transfer');

  swap_chara(0, 1);

  assert.equal(fixture.store.get('cflag:0:9'), 3);
  assert.equal(fixture.store.get('cflag:1:9'), 10);
  assert.equal(fixture.store.get('cstr:0:5'), '旧文本B');
  assert.equal(fixture.store.get('cstr:1:5'), '旧文本A');
  // 两侧皆未声明的下标：不应该被写入（#13 静默写入陷阱）
  assert.equal(fixture.store.get('cflag:0:777'), undefined);
  assert.equal(fixture.store.get('cflag:1:777'), undefined);
});

test('SWAP_CHARA：仅一侧声明时，另一侧读作 0/空串，不留旧值', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '奴隶甲');
  fixture.store.set('cflag:0:20', 5); // 角色1侧完全未声明
  const { swap_chara } = fixture.load_module('chara/chara-soul-transfer');

  swap_chara(0, 1);

  assert.equal(fixture.store.get('cflag:0:20'), 0, '原持有方清零');
  assert.equal(fixture.store.get('cflag:1:20'), 5, '接收方拿到旧值');
});

test('PERSONALOCK：区间左闭右开（[10,19) 命中10不含19），55 被显式跳过', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '奴隶甲');
  fixture.store.set('talent:0:10', 1); // 区间起点，应交换
  fixture.store.set('talent:0:19', 1); // 区间终点（不含），不应交换
  fixture.store.set('talent:0:55', 1); // 显式 continue 跳过
  fixture.store.set('talent:0:117', 1); // 离散列表项，应交换
  const { personalock } = fixture.load_module('chara/chara-soul-transfer');

  personalock(1);

  assert.equal(fixture.store.get('talent:1:10'), 1, '10 在 [10,19) 内');
  assert.equal(fixture.store.get('talent:1:19'), undefined, '19 是区间外');
  assert.equal(fixture.store.get('talent:0:19'), 1, '19 保持原地未动');
  assert.equal(fixture.store.get('talent:1:55'), undefined, '55 被跳过不交换');
  assert.equal(fixture.store.get('talent:0:55'), 1, '55 留在原地');
  assert.equal(fixture.store.get('talent:1:117'), 1, '离散项 117 正常交换');
});

test('TRANSFERAPP：等级/攻防互换、双侧状态清零、姓名呼び名互换、级联触发 PERSONALOCK', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '魔王');
  add_chara(fixture, 1, '奴隶甲');
  fixture.store.set('cflag:0:9', 10);
  fixture.store.set('cflag:1:9', 3);
  fixture.store.set('base:0:0', 100);
  fixture.store.set('base:1:0', 40);
  fixture.store.set('cflag:0:1', 5); // 转移前的状态标记
  fixture.store.set('cflag:1:1', 3);
  fixture.store.set('talent:0:15', 1); // PERSONALOCK 覆盖范围内的一项
  const { transferapp } = fixture.load_module('chara/chara-soul-transfer');

  transferapp(1);

  assert.equal(fixture.store.get('cflag:0:9'), 3, '等级互换');
  assert.equal(fixture.store.get('cflag:1:9'), 10);
  assert.equal(fixture.store.get('base:0:0'), 40, '攻防互换');
  assert.equal(fixture.store.get('base:1:0'), 100);
  assert.equal(fixture.store.get('cflag:0:1'), 0, '双侧状态清零，不是互换');
  assert.equal(fixture.store.get('cflag:1:1'), 0);
  assert.equal(
    fixture.store.get('callname:0:-1'),
    '奴隶甲',
    '显示名改写成新呼び名',
  );
  assert.equal(fixture.store.get('callname:1:-1'), '魔王');
  assert.equal(
    fixture.store.get('talent:1:15'),
    1,
    'PERSONALOCK 确实被级联调用',
  );
});

test('BODYCHECK_MAOU：种族>0 用 666，种族为0用 21，三围缺项时补齐生成', () => {
  {
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    fixture.store.set('cflag:0:314', 2); // 有种族（源用 CFLAG:314，不是 TALENT:314）
    const { bodycheck_maou } = fixture.load_module('chara/chara-soul-transfer');
    bodycheck_maou();
    assert.equal(fixture.store.get('cflag:0:452'), 666);
    assert.equal(fixture.store.get('cflag:0:451'), 21, '肉体年龄缺省兜底');
    assert.ok((fixture.store.get('cflag:0:453') || 0) > 0, '身高被生成补齐');
    assert.equal(fixture.store.get('talent:0:300'), 5, '外貌素质组缺省兜底');
    assert.equal(fixture.store.get('talent:0:305'), 3);
    assert.equal(fixture.store.get('talent:0:308'), 150);
  }
  {
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    // cflag:0:314 缺省 = 0（人类）
    const { bodycheck_maou } = fixture.load_module('chara/chara-soul-transfer');
    bodycheck_maou();
    assert.equal(fixture.store.get('cflag:0:452'), 21);
  }
});

test('BODYCHECK_MAOU：已有完整数据时不覆盖', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  fixture.store.set('cflag:0:452', 999);
  fixture.store.set('cflag:0:451', 30);
  fixture.store.set('cflag:0:453', 160);
  fixture.store.set('cflag:0:454', 50);
  fixture.store.set('cflag:0:455', 88);
  fixture.store.set('cflag:0:456', 60);
  fixture.store.set('cflag:0:457', 90);
  fixture.store.set('talent:0:300', 9);
  fixture.store.set('talent:0:301', 9);
  fixture.store.set('talent:0:302', 9);
  fixture.store.set('talent:0:303', 9);
  fixture.store.set('talent:0:304', 9);
  fixture.store.set('talent:0:305', 9);
  fixture.store.set('talent:0:306', 9);
  fixture.store.set('talent:0:307', 9);
  fixture.store.set('talent:0:308', 9);
  fixture.store.set('talent:0:309', 9);
  fixture.store.set('talent:0:310', 9);
  const { bodycheck_maou } = fixture.load_module('chara/chara-soul-transfer');

  bodycheck_maou();

  assert.equal(fixture.store.get('cflag:0:452'), 999, '已非0，不覆盖');
  assert.equal(fixture.store.get('cflag:0:453'), 160);
  assert.equal(fixture.store.get('talent:0:300'), 9);
});

test('TRANSFER_SOUL：拒绝确认时原地返回 ARG，不触发任何互换', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '魔王');
  add_chara(fixture, 1, '奴隶甲');
  fixture.store.set('cflag:0:9', 10);
  fixture.store.set('cflag:1:9', 3);
  fixture.set_inputs(1); // 否
  const { transfer_soul } = fixture.load_module('chara/chara-soul-transfer');

  const result = await transfer_soul(1);

  assert.equal(result, 1, 'RETURN ARG');
  assert.equal(fixture.store.get('cflag:0:9'), 10, '未互换');
  assert.equal(fixture.store.get('cflag:1:9'), 3);
});

test('TRANSFER_SOUL：确认后返回 0，双重 SWAP 抵消令等级/攻防/婚姻状态维持原值', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '魔王');
  add_chara(fixture, 1, '奴隶甲');
  fixture.store.set('cflag:0:9', 10);
  fixture.store.set('cflag:1:9', 3);
  fixture.store.set('cflag:1:601', 0); // 婚姻状态=0 → 走直接互换分支
  fixture.store.set('cflag:0:601', 555);
  fixture.set_inputs(0); // 是
  const { transfer_soul } = fixture.load_module('chara/chara-soul-transfer');

  const result = await transfer_soul(1, 0, seq([2])); // debuff = 2+1 = 3

  assert.equal(result, 0);
  // CFLAG:9（等级）先被 SWAPCHARA 整表换一次，紧接着 TRANSFERAPP 又显式
  // 再换一次，同一对字段换两次抵消，净效果是维持原值（文件头「二次互换
  // 会互相抵消」的说明，这里钉住可观测效果）
  assert.equal(fixture.store.get('cflag:0:9'), 10, '二次 SWAP 抵消，等级不变');
  assert.equal(fixture.store.get('cflag:1:9'), 3);
  // CFLAG:601（婚姻状态）同理：SEARCH_FAMILY 分支前先手动 SWAP 一次，
  // 随后 SWAPCHARA 整表又换一次，同样抵消
  assert.equal(
    fixture.store.get('cflag:0:601'),
    555,
    '二次 SWAP 抵消，婚姻状态不变',
  );
  assert.equal(fixture.store.get('cflag:1:601'), 0);
  assert.equal(fixture.store.get('ex_talent:1:0'), 3, '新错位等级=rand+1');
  assert.equal(fixture.store.get('ex_talent:0:0'), 0, '魔王侧清零');
});

test('TRANSFER_SOUL：婚姻状态为其他值时改走 SEARCH_FAMILY，命中配偶联动更新其记录', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '魔王');
  add_chara(fixture, 1, '奴隶甲');
  add_chara(fixture, 2, '配偶');
  fixture.store.set('cflag:1:601', 903); // 非 [900,902] 也非 0
  fixture.store.set('talent:1:165', 1); // SEARCH_FAMILY 村娘A捷径：忽略 kind
  fixture.store.set('talent:2:171', 1); // 村娘B，两者互认
  fixture.store.set('cflag:2:601', 700);
  fixture.store.set('cflag:2:6', 42);
  fixture.set_inputs(0);
  const { transfer_soul } = fixture.load_module('chara/chara-soul-transfer');

  await transfer_soul(1, 0, seq([0])); // debuff = 0+1 = 1

  // CFLAG:0:621 只被 era.set() 写入一次，随后 SWAPCHARA 整表把它单次互换
  // 到 cid 身上（不在 TRANSFERAPP 的二次改写名单内，不会被抵消）
  assert.equal(
    fixture.store.get('cflag:1:621'),
    903,
    '原婚姻状态随 SWAPCHARA 移到 cid 身上',
  );
  assert.equal(fixture.store.get('cflag:2:621'), 700, '配偶原状态存档');
  assert.equal(fixture.store.get('cflag:2:601'), 901, '配偶改指向魔王');
  assert.equal(fixture.store.get('cflag:2:609'), 42, '配偶记下对方原名字编号');
});

test('TRANSFER_SOUL：错位等级继承——SWAPCHARA 先把 cid 的旧错位换到 MASTER 槽位上，据此 +1 级而非重掷', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '魔王');
  add_chara(fixture, 1, '奴隶甲');
  fixture.store.set('cflag:1:601', 0);
  // ex_talent 也在 swap_chara() 覆盖范围内：这里预置的是 cid（奴隶甲）自己
  // 转移前已带的错位等级，SWAPCHARA 把它换到 MASTER 槽位后，原作代码读的
  // 「EX_TALENT:MASTER:0」实际读到的正是这份旧值——继承的是 cid 自己的旧
  // 错位，不是魔王本身持有的
  fixture.store.set('ex_talent:1:0', 2);
  fixture.set_inputs(0);
  const { transfer_soul } = fixture.load_module('chara/chara-soul-transfer');

  // rand 队列传入的值不应该被使用（继承分支忽略 rand）
  await transfer_soul(1, 0, seq([]));

  assert.equal(fixture.store.get('ex_talent:1:0'), 3, '继承 2+1=3');
  assert.equal(fixture.store.get('ex_talent:0:0'), 0);
});

test('TRANSFER_SOUL：mode 非 0 跳过确认直接执行', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '魔王');
  add_chara(fixture, 1, '奴隶甲');
  fixture.store.set('cflag:1:601', 0);
  // 不预置任何输入：mode!=0 不应调用 era.input()
  const { transfer_soul } = fixture.load_module('chara/chara-soul-transfer');

  const result = await transfer_soul(1, 1, seq([0]));

  assert.equal(result, 0);
  assert.equal(
    fixture.store.get('callname:1:-1'),
    '魔王',
    '未经确认也完成了互换（呼び名不在二次抵消名单内，是真实可观测的净变化）',
  );
});

test('SOUL_DISLOCATION：命中降级，降到 0 时播报康复；未命中不变', () => {
  {
    const fixture = create_era_fixture();
    add_chara(fixture, 1, '奴隶甲');
    fixture.store.set('ex_talent:1:0', 1);
    const { soul_dislocation } = fixture.load_module(
      'chara/chara-soul-transfer',
    );
    soul_dislocation(1, seq([0])); // cap=min(1,3)=1 → rand(2)==0 命中

    assert.equal(fixture.store.get('ex_talent:1:0'), 0);
    assert.equal(printed_includes(fixture, '从'), true, '降到 0 时有康复播报');
  }
  {
    const fixture = create_era_fixture();
    add_chara(fixture, 1, '奴隶甲');
    fixture.store.set('ex_talent:1:0', 3);
    const { soul_dislocation } = fixture.load_module(
      'chara/chara-soul-transfer',
    );
    soul_dislocation(1, seq([1])); // cap=3 → rand(4)==1，非0，不命中

    assert.equal(fixture.store.get('ex_talent:1:0'), 3, '未命中不降级');
  }
  {
    const fixture = create_era_fixture();
    add_chara(fixture, 1, '奴隶甲');
    // ex_talent:1:0 缺省 = 0：level=0，短路条件 `level && ...` 恒假
    const { soul_dislocation } = fixture.load_module(
      'chara/chara-soul-transfer',
    );
    soul_dislocation(1, () => {
      throw new Error('level=0 时不应调用 rand');
    });
    assert.equal(fixture.store.get('ex_talent:1:0'), undefined);
  }
});
