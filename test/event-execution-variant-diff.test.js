/**
 * @file 处刑单选版与批量版的差异对照（issue #794）。
 *
 * 两个玩家入口各自保真移植了原作的一个源版本：ere/event/event-execution.js
 * （单选版，逐人选择处刑对象与处分方式）与 ere/event/event-execution-batch.js
 * （批量版，主菜单 [103] 与 EVENTTURNEND 的自动处刑）。机械公共链（装备
 * 回收、除名、经验结算）已经共享 event-execution-common.js，剩下的差异是
 * 内容而不是噪音：
 *
 *   | 差异 | 单选版 | 批量版 |
 *   | --- | --- | --- |
 *   | 释放分支的所持金 | 分文不动 | 没收进 MONEY / EX_FLAG:4444 |
 *   | 释放分支的好感度 | 直接赋 20 | 只把超过 20 的夹回 20 |
 *   | 录像书架 SUISEI_STR | 三支都不写 | 肉便器 / 士兵化 / 固定示众各写一次 |
 *   | 肉便器段的 C 敏感文案与人称 | 只有阴蒂一支、恒用「她」 | 扶她/男人分流、按素质换人称 |
 *
 * 本文件用回归测试固定这四条差异：同一条场景分别喂给两版入口，各自断言应有
 * 的观察结果。把任意一版的行为刷到另一版上（「好心合并重复实现」的典型
 * 形态）本文件就会红；两版实现本身不改动。
 *
 * 两版入口的驱动方式不同：单选版 execution() 收「候选人下标 + 处分编号」；
 * 批量版 batch_execution() 收「处刑标签切换 → [121] 方法界面 → 处分编号」。
 * 两版都不开调教窗口——处分方式编号作为实参传给口上。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

const ERE_DIR = path.resolve(__dirname, '..', 'ere');
const SINGLE = 'event/event-execution.js';
const BATCH = 'event/event-execution-batch.js';
/** 本文件名：两版头注都要指向它，见文件末尾的互指用例 */
const DIFF_TEST = 'event-execution-variant-diff.test.js';

const VARIANTS = ['single', 'batch'];

function seq(values) {
  let index = 0;
  return (n) => {
    const value = values[Math.min(index, values.length - 1)];
    index += 1;
    return Math.min(value, n - 1);
  };
}

/** 场景世界里的处刑对象（等级 4，三个装备槽都空） */
const NAMES = { 31: '温妮', 47: '艾达' };

/** 两版共用的场景世界：cid 号是唯一处刑对象 */
function seed_world(cid = 31) {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.seed_chara(cid, { id: cid, name: NAMES[cid], callname: NAMES[cid] });
  fixture.era.addCharacter(0);
  fixture.era.addCharacter(cid);
  fixture.store.set(`cflag:${cid}:9`, 4); // 等级 CFLAG:9
  for (const field of [550, 551, 552]) {
    fixture.store.set(`cflag:${cid}:${field}`, -1); // 武装/装饰/装饰2 空
  }
  return fixture;
}

/** 单选版：候选人下标 0 → 处分编号 */
async function run_single(fixture, method) {
  fixture.set_inputs(0, method);
  await fixture.load_module('event/event-execution').execution(seq([0]));
}

/** 批量版：目标切上处刑标签 → [121] 方法界面 → 处分编号 → [1999] 结束处刑 */
async function run_batch(fixture, method, cid = 31) {
  fixture.store.set(`cflag:${cid}:777`, 1); // 处刑标签
  fixture.set_inputs(121, method, 1999);
  await fixture
    .load_module('event/event-execution-batch')
    .batch_execution(seq([0]));
}

const RUN = { single: run_single, batch: run_batch };

/**
 * 书架（SUISEI_STR）的非空槽位。水晶球开关全程关闭，所以写进去的只可能是
 * 分支自己的槽位写入——VIDEO_MATURO 的「首个空槽」写点是开关打开时才有的
 * 另一路（archive_first_empty）。
 */
function videoarchive_slots(fixture) {
  return [...fixture.store.keys()]
    .filter((key) => key.startsWith('videoarchive:'))
    .filter((key) => fixture.store.get(key) !== '');
}

/** 文件头注：首个块注释的正文 */
function file_header(file) {
  const source = fs.readFileSync(path.join(ERE_DIR, file), 'utf8');
  const end = source.indexOf('*/');
  assert(end > 0, `${file} 有文件头注`);
  return source.slice(0, end);
}

test('释放分支的所持金：批量版没收进 MONEY 与 EX_FLAG:4444，单选版分文不动', async () => {
  const expected = {
    single: { money: 100, legit: 7, purse: 500 },
    batch: { money: 600, legit: 507, purse: 0 },
  };
  for (const variant of VARIANTS) {
    const fixture = seed_world();
    fixture.store.set('flag:10004', 100); // 既有 MONEY
    fixture.store.set('exflag:4444', 7); // 既有 EX_FLAG:4444（反作弊对照）
    fixture.store.set('cflag:31:580', 500); // 所持金

    await RUN[variant](fixture, 7);

    const want = expected[variant];
    assert.equal(
      fixture.store.get('flag:10004'),
      want.money,
      `${variant}：释放分支的 MONEY`,
    );
    assert.equal(
      fixture.store.get('exflag:4444'),
      want.legit,
      `${variant}：释放分支的 EX_FLAG:4444`,
    );
    assert.equal(
      fixture.store.get('cflag:31:580'),
      want.purse,
      `${variant}：释放分支的所持金`,
    );
    assert.equal(
      fixture.text_lines().some((line) => line.includes('掏空')),
      variant === 'batch',
      `${variant}：没收播报只属于批量版`,
    );
  }
});

test('释放分支的好感度：单选版直接赋 20，批量版只把超过 20 的夹回', async () => {
  const cases = [
    { initial: 10, single: 20, batch: 10, label: '好感度 10（低于上限）' },
    { initial: 50, single: 20, batch: 20, label: '好感度 50（高于上限）' },
  ];
  for (const item of cases) {
    const expected = { single: item.single, batch: item.batch };
    for (const variant of VARIANTS) {
      const fixture = seed_world();
      fixture.store.set('cflag:31:2', item.initial); // 好感度

      await RUN[variant](fixture, 7);

      assert.equal(
        fixture.store.get('cflag:31:2'),
        expected[variant],
        `${variant}：${item.label}`,
      );
    }
  }
});

test('释放分支的复位与标签：冒险状态两版一致，处刑标签只有批量版清除', async () => {
  for (const variant of VARIANTS) {
    const fixture = seed_world();
    // 善恶值取 -55：落在 -50 与 -60 之间，改坏下限阈值会被看出来（-80 那样
    // 的深值对「阈值改松」不敏感）
    fixture.store.set('cflag:31:151', -55);
    fixture.store.set('cflag:31:777', 1); // 处刑标签

    await RUN[variant](fixture, 7);

    assert.equal(fixture.store.get('cflag:31:1'), 2, `${variant}：状态 = 2`);
    assert.equal(
      fixture.store.get('cflag:31:501'),
      1,
      `${variant}：侵攻阶层 1`,
    );
    assert.equal(fixture.store.get('cflag:31:502'), 0, `${variant}：侵攻度 0`);
    assert.equal(fixture.store.get('cflag:31:508'), 3, `${variant}：再起点 3`);
    assert.equal(
      fixture.store.get('cflag:31:151'),
      -50,
      `${variant}：善恶值下限 -50`,
    );
    assert.deepEqual(
      fixture.era.getAddedCharacters(),
      [0, 31],
      `${variant}：释放不除名`,
    );
    assert.equal(
      fixture.store.get('cflag:31:777'),
      variant === 'batch' ? 0 : 1,
      `${variant}：处刑标签的处置（批量版清除，单选版不动）`,
    );
  }
});

test('录像书架：批量版三支各写一次槽位，单选版三支一个槽位都不写', async () => {
  // 士兵化对 17-40 号（不受洗脑）拒绝执行，三条分支统一用 47 号
  const TARGET = 47;
  const cases = [
    { method: 4, title: '肉便器艾达', label: '做成肉便器' },
    { method: 5, title: '魔王傀儡艾达', label: '士兵化' },
    { method: 6, title: '魔族公厕艾达', label: '固定示众' },
  ];
  for (const item of cases) {
    for (const variant of VARIANTS) {
      const fixture = seed_world(TARGET);

      await RUN[variant](fixture, item.method, TARGET);

      if (variant === 'batch') {
        assert.deepEqual(
          videoarchive_slots(fixture),
          ['videoarchive:1'],
          `${item.label}：批量版写书架（槽位 = 角色在已加入列表中的位置）`,
        );
        assert.equal(
          fixture.store.get('videoarchive:1'),
          item.title,
          `${item.label}：批量版的书架标题`,
        );
      } else {
        assert.deepEqual(
          videoarchive_slots(fixture),
          [],
          `${item.label}：单选版不写书架`,
        );
      }
    }
  }
});

test('肉便器段的人称：批量版随 TALENT:122 用「他」，单选版恒用「她」', async () => {
  // 这一行的两侧文案只差「她/他」：女性目标两版都是「她」，男性目标批量版
  // 换「他」、单选版照旧，所以直接用该出现的那个字拼出整行来断言。
  const cases = [
    ['女性目标', false, { single: '她', batch: '她' }],
    ['男性目标（TALENT:122）', true, { single: '她', batch: '他' }],
  ];
  for (const [label, male, expected] of cases) {
    for (const variant of VARIANTS) {
      const fixture = seed_world();
      if (male) fixture.store.set('talent:31:122', 1);

      await RUN[variant](fixture, 4);

      const line = `被吸收了全部力量的${expected[variant]}，身体变成淫靡的肉块了。`;
      assert(
        fixture.text_lines().includes(line),
        `${variant}：${label} 的融合播报人称是「${expected[variant]}」`,
      );
    }
  }
});

test('肉便器段的 C 敏感文案：批量版按扶她/男人分流，单选版只有阴蒂一支', async () => {
  const cases = [
    ['扶她（TALENT:121）', { 'talent:31:121': 1 }],
    ['男人（TALENT:122）', { 'talent:31:122': 1 }],
  ];
  for (const [label, talents] of cases) {
    for (const variant of VARIANTS) {
      const fixture = seed_world();
      fixture.store.set('talent:31:102', 1); // 阴蒂改造：进入 C 敏感段
      for (const [address, value] of Object.entries(talents)) {
        fixture.store.set(address, value);
      }

      await RUN[variant](fixture, 4);

      const texts = fixture.text_lines();
      if (variant === 'batch') {
        assert(
          texts.some((line) => line.includes('的阴茎膨胀了起来')),
          `批量版：${label} 走阴茎文案`,
        );
        assert(
          !texts.some((line) => line.includes('的阴蒂又大又肿')),
          `批量版：${label} 不走阴蒂文案`,
        );
      } else {
        assert(
          texts.some((line) => line.includes('的阴蒂又大又肿')),
          `单选版：${label} 恒走阴蒂文案`,
        );
        assert(
          !texts.some((line) => line.includes('的阴茎膨胀了起来')),
          `单选版：${label} 没有阴茎文案`,
        );
      }
    }
  }
});

test('两版头注互指同族异版并指向本对照测试', () => {
  for (const [file, sibling] of [
    [SINGLE, BATCH],
    [BATCH, SINGLE],
  ]) {
    const head = file_header(file);
    assert(head.includes(path.basename(sibling)), `${file} 头注指向同族异版`);
    assert(head.includes(DIFF_TEST), `${file} 头注指向对照测试`);
  }
});
