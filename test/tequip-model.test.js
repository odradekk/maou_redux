'use strict';
/**
 * TEQUIP 表建模的行为测试（issue #215 J5：服装系统与 TEQUIP 建模）。
 *
 * 缝 = test/helpers/era-fixture.js。覆盖：
 *   - **12 个区段各有测试**（验收项）：区间数据直接解析
 *     ownership/tequip-ownership.yml——每条区间取代表下标，火车表内
 *     写入→读回持久；
 *   - 四个口上头部守卫位（45 口塞 / 55 死斗场 / 89 兽奸 / 90 触手，
 *     #213 的 @KOJO_MESSAGE_COM 七道守卫读它们）经 train 域门面可写，
 *     且守卫真实触发（tequip:55 → COLOSSEUM_KOJO 支、tequip:90 → 静默
 *     跳过）——写入路径打通的端到端证明；
 *   - 跨域两段（22 属 system、35 属 event）经属主域门面写（#71：跨域写
 *     走门面是 domain-check 的硬要求，门面本体在 ere/facade/chara-system.js
 *     与 chara-event.js）；
 *   - 引擎建删语义：调教外三段寻址写入静默丢弃、读回 undefined（不抛
 *     错）；beginTrain 后可写、endTrain 删表（夹具 TRAIN_ONLY_TABLES
 *     镜像的同一条，此处从游戏代码视角钉住给族票当契约）。
 *
 * 全用例走夹具（纯 Node），无引擎依赖。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

const REPO = path.resolve(__dirname, '..');

// —— 世界底座：开火车表、指好 TARGET、装门面与口上 ——

function seed_world() {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  fixture.era.beginTrain(0, 31);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.player = 0;
  fixture.load_module('kojo/kojo-k3-noble');
  return fixture;
}

// —— 1. 12 个区段各有测试（区间数据来自 ownership 产物，数据驱动） ——

/** 解析 tequip-ownership.yml 的区间 → [{ key, start, end, owner }] */
function load_intervals() {
  const text = fs.readFileSync(
    path.join(REPO, 'ownership', 'tequip-ownership.yml'),
    'utf8',
  );
  const re = /^"(\d+)(?:-(\d+))?":\r?\n {2}owner: ([a-z][a-z0-9_]*)/gm;
  const out = [];
  let match;
  while ((match = re.exec(text))) {
    out.push({
      key: match[1],
      start: Number(match[1]),
      end: match[2] ? Number(match[2]) : Number(match[1]),
      owner: match[3],
    });
  }
  return out;
}

// 旗标一览（target/資料_非必要無須解壓/eramaouフラグまとめ.txt :501-529）的
// 代表下标注释——区间代表取首下标，语义名照抄旗标一览
const INTERVAL_NOTES = {
  11: '振动棒（TEQUIP:11 バイブ装着）',
  13: '肛门振动棒',
  21: '幸福草',
  22: '利尿剂（属主 system）',
  35: '主人避孕套（属主 event）',
  36: '助手避孕套',
  43: '眼罩',
  49: '肛门电极',
  53: '录像摄影',
  57: '羞耻 PLAY',
  88: '使役魔兽 PLAY',
  98: '触手口辱',
};

for (const interval of load_intervals()) {
  const index = interval.start;
  test(`TEQUIP 区间 ${interval.key}（属主 ${interval.owner}）：火车表内写入持久——${INTERVAL_NOTES[index] ?? `代表下标 ${index}`}`, () => {
    const fixture = seed_world();
    assert.equal(
      fixture.era.set(`tequip:31:${index}`, 1),
      1,
      'era.set 的落盘返回值',
    );
    assert.equal(fixture.era.get(`tequip:31:${index}`), 1);
  });
}

test('TEQUIP 区间覆盖完整：ownership 产物恰 12 条（J5 验收面的数据源）', () => {
  const intervals = load_intervals();
  assert.equal(intervals.length, 12, '区间数与 #133 文件级重测一致');
  assert.deepEqual(
    intervals.map((i) => i.owner),
    [
      'train',
      'train',
      'train',
      'system',
      'event',
      'train',
      'train',
      'train',
      'train',
      'train',
      'train',
      'train',
    ],
    '两段跨域（22 属 system、35 属 event）+ 十段 train',
  );
});

// —— 2. 四个口上守卫位可写（验收项：写入路径归 J5）——

test('四个口上守卫位经 train 域门面可写：口塞 45 / 死斗场 55 / 兽奸 89 / 触手 90', () => {
  const fixture = seed_world();
  const { chara } = fixture.load_module('facade/chara');
  chara(31).train.口塞 = 1;
  chara(31).train.死斗场 = 1;
  chara(31).train.兽奸 = 1;
  chara(31).train.触手 = 1;
  assert.equal(fixture.era.get('tequip:31:45'), 1, '口塞（TEQUIP:45）');
  assert.equal(fixture.era.get('tequip:31:55'), 1, '死斗场（TEQUIP:55）');
  assert.equal(fixture.era.get('tequip:31:89'), 1, '兽奸（TEQUIP:89）');
  assert.equal(fixture.era.get('tequip:31:90'), 1, '触手（TEQUIP:90）');
});

test('守卫真实触发：死斗场位置位 → K3 口上走 COLOSSEUM_KOJO 支（:888-892）', async () => {
  const fixture = seed_world();
  fixture.store.set('tequip:31:55', 1);
  const { kojo_message_com_3 } = fixture.load_module('kojo/kojo-k3-noble');
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.selectcom = 0;
  await kojo_message_com_3(() => 0);
  assert(
    fixture.text_lines().some((line) => line.includes('@COLOSSEUM_KOJO_3')),
    '死斗场专用口上的占位行在场（分发层已通）',
  );
});

test('守卫真实触发：触手位置位 → 口上静默跳过（:911-912，无爱抚台词）', async () => {
  const fixture = seed_world();
  fixture.store.set('cflag:31:301', 0); // 初めて分支可用（无守卫时会出台词）
  fixture.store.set('tequip:31:90', 1);
  const { kojo_message_com_3 } = fixture.load_module('kojo/kojo-k3-noble');
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.selectcom = 0;
  await kojo_message_com_3(() => 0);
  assert(
    !fixture.text_lines().some((line) => line.includes('「')),
    '触手守卫命中：不打常规台词',
  );
});

// —— 3. 跨域两段经属主域门面写（#71：domain-check 的硬要求）——

test('跨域两段经门面写：tequip:22 走 chara(cid).system、tequip:35 走 chara(cid).event', () => {
  const fixture = seed_world();
  const { chara } = fixture.load_module('facade/chara');
  chara(31).system.利尿剂 = 1;
  chara(31).event.主人避孕套 = 1;
  assert.equal(
    fixture.era.get('tequip:31:22'),
    1,
    '利尿剂（tequip:22，属主 system）',
  );
  assert.equal(
    fixture.era.get('tequip:31:35'),
    1,
    '主人避孕套（tequip:35，属主 event）',
  );
});

// —— 4. 引擎建删语义（给族票的写入契约）——

test('调教外：三段寻址写入静默丢弃、读回 undefined（不抛错）', () => {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  // 未 beginTrain：tequip 桶不存在，三段寻址走引擎的静默丢弃分支
  assert.equal(
    fixture.era.set('tequip:31:45', 1),
    undefined,
    '写入被丢弃（era.set 返回 undefined）',
  );
  assert.equal(fixture.era.get('tequip:31:45'), undefined);
});

test('endTrain 删表：火车表内的写入随收尾消失（跨期残留窗口关闭，#179 等价）', () => {
  const fixture = seed_world();
  fixture.era.set('tequip:31:45', 1);
  fixture.era.endTrain();
  assert.equal(fixture.era.get('tequip:31:45'), undefined, '表已删');
  // 再开火车表：新桶从干净状态起步
  fixture.era.beginTrain(0, 31);
  assert.equal(fixture.era.get('tequip:31:45'), undefined, '重开无残留');
});
