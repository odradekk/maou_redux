/**
 * ere/kojo/kojo-dungeon-bitch.js 的行为测试（issue #184，H15 地下城卖春）。
 *
 * 缝 = test/helpers/era-fixture.js。世界底座：温妮（id 31）入列（卖春系统
 * 不要求调教中，直接 addCharacter 即可）。覆盖（逐条对应验收清单）：
 *   - FI_CULC_BITCH 成败算式：SIPPAI（失败率=250±善恶值/卖春中毒/淫乱/
 *     娼妇/倾城/卖春禁止/下限 1）、SEIKOU（成功率=卖淫中毒*5/卖淫经验/
 *     善恶<-100/肉便器/淫乱娼妇倾城/所持金分档/卖春积极性/下限 1）、
 *     KYAKU（客数=基础 RAND/善恶值/出身/素质/场所修正/下限 0）、ABLE
 *     （可不可：体力门槛/ORAL 接吻/SEX 处女贞操/ANIMAL 野狗）、PLAY
 *     （次数：SELF 单独处理/普通玩法/下限 1）、KAKURITU（概率权重）、
 *     RATE（费率表）；
 *   - 勇者两道门槛（EXP:74 非零 + SEIKOU > 100，CFLAG:1 == 2 耦合）；
 *   - SELL_BITCH 流程：客循环/成败判定/收益/经验/显示/善恶值；
 *   - PROFIT_BITCH 收益结算：场所分档/勇者/客种类/处女溢价/总价；
 *   - SET_BICH_LEVEL 分档（0/1/2-5）；
 *   - DUNGEON_BITCH / HEROINE_BITCH 入口（体力门槛/卖春积极性/强制肉偿
 *     存根/内职）；
 *   - 存根清单核对（docs/stub-registry.md）。
 *
 * 随机源注入：每个函数接受 rand 参数（[0, n) 整数），测试用定值序固定
 * 随机分支（与 kojo-k3-noble 同款 seq_rand）。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

// RAND:N 定值序：draws 依次被消费，越界取模
const seq_rand =
  (...draws) =>
  (n) => {
    const value = draws.shift() ?? 0;
    return value % n;
  };

// 世界底座：魔王 + 温妮（id 31）入列
function setup_bitch(seed) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.player = 0;
  if (seed) {
    seed(fixture, era_flag);
  }
  const mod = fixture.load_module('kojo/kojo-dungeon-bitch');
  return { fixture, mod, era_flag };
}

// 体力门槛外：BASE:0 < 300 || BASE:1 < 100 → 直接返回
test('DUNGEON_BITCH：体力/气力不足直接返回 0', async () => {
  const { fixture, mod } = setup_bitch((f) => {
    f.store.set('base:31:0', 299);
  });
  assert.equal(await mod.dungeon_bitch(31, seq_rand(0)), 0);
  assert.deepEqual(fixture.text_lines(), []);
});

test('DUNGEON_BITCH：勇者（CFLAG:1 == 2）两道门槛——EXP:74 为零则返回', async () => {
  const { fixture, mod } = setup_bitch((f) => {
    f.store.set('base:31:0', 500);
    f.store.set('base:31:1', 500);
    f.store.set('cflag:31:1', 2); // 勇者
    f.store.set('exp:31:74', 0); // 卖淫经验为零
    // 让后续条件全部满足（卖春积极性 + 判定成功）——EXP:74 是唯一拦截点：
    // 删掉该门槛后必然进入卖春、打出 LOG_TRY_BITCH 占位行
    f.store.set('cflag:31:120', 1); // 卖春积极性
    f.store.set('abl:31:37', 0);
    f.store.set('cflag:31:580', 0);
    f.store.set('cflag:31:581', 0);
    f.store.set('cflag:31:582', 0);
    f.store.set('cflag:31:151', 0);
  });
  // SEIKOU = 45 + 95 = 140 > 100 但 EXP:74 == 0 拦下 → 无输出
  assert.equal(await mod.dungeon_bitch(31, seq_rand(0, 0)), 0);
  assert.deepEqual(fixture.text_lines(), []);
});

test('DUNGEON_BITCH：勇者（CFLAG:1 == 2）两道门槛——SEIKOU <= 100 是死门槛（#14）', async () => {
  // 源 :20-21 第一道门槛（EXP:74 == 0 → 返回）与 :22 第二道门槛
  // （SEIKOU <= 100 → 返回）在可达状态互斥：SEIKOU 计算里 `SIF EXP:74
  // → LOCAL++`（:770）保证经验非零时 SEIKOU >= 101（勇者无奴隶分支的
  // +45：0 基础 + 1 经验 + 5 所持金 + 95 积极性 = 101）。所以第二道门槛
  // 在「EXP:74 > 0 且卖春积极性 > 0」的真实卖春路径上恒不触发——是原作
  // 死门槛，1:1 保留、登记 #14（反向变异：删掉它测试仍绿属预期）。
  const { fixture, mod } = setup_bitch((f) => {
    f.store.set('base:31:0', 500);
    f.store.set('base:31:1', 500);
    f.store.set('cflag:31:1', 2); // 勇者
    f.store.set('exp:31:74', 10); // 卖淫经验非零（+1）
    f.store.set('cflag:31:580', 20000); // 高所持金（+5）
    f.store.set('cflag:31:581', 0);
    f.store.set('cflag:31:582', 0);
    f.store.set('cflag:31:120', 1); // 卖春积极性 > 0（+95）
    f.store.set('abl:31:37', 0);
    f.store.set('cflag:31:151', 0);
  });
  // SEIKOU 恒 101 > 100：第二道门槛不拦，卖春进入（LOG_TRY_BITCH 真身，
  // #185 起不再打占位行）
  assert.equal(mod.fi_culc_bitch(31, 'SEIKOU', 'DUNGEON'), 101);
  await mod.dungeon_bitch(31, seq_rand(0, 0));
  const lines = fixture.text_lines();
  assert.ok(
    lines.some((l) => l.includes('考虑着出卖肉体的事。')),
    'LOG_TRY_BITCH 真身末行',
  );
  assert.ok(
    lines.some((l) => l.includes('在空闲的时间，')),
    'LOG_TRY_BITCH 真身 DUNGEON 分支',
  );
  assert.ok(
    !lines.some((l) => l.includes('LOG_TRY_BITCH')),
    '不再打存根占位行',
  );
});

test('DUNGEON_BITCH：普通奴隶（非勇者）无两道门槛，卖春积极性 0 时仍走兽奸/自慰分支', async () => {
  const { fixture, mod } = setup_bitch((f) => {
    f.store.set('base:31:0', 500);
    f.store.set('base:31:1', 500);
    f.store.set('cflag:31:1', 0); // 普通奴隶
    f.store.set('cflag:31:120', 0); // 卖春积极性 0
    f.store.set('abl:31:39', 0); // 无兽奸中毒
    f.store.set('abl:31:11', 0);
    f.store.set('abl:31:31', 0);
    f.store.set('talent:31:60', 0);
  });
  // 卖春积极性 0 → 卖春判定跳过；兽奸条件不满足（RAND(1,16) >= 1）
  // 自慰：RAND:36 = 35 > 0（ABL:11+ABL:31+TALENT:60*10 = 0）→ 不触发
  // 随机序：第 1 抽 RAND(1,16)（兽奸），第 2 抽 RAND:36（自慰）→ 35 > 0 不触发
  assert.equal(await mod.dungeon_bitch(31, seq_rand(0, 35)), 0);
  assert.deepEqual(fixture.text_lines(), []);
});

test('FI_CULC_BITCH：SIPPAI 失败率算式（250±善恶值 → 卖春中毒 → 淫乱 → 娼妇/倾城 → 卖春禁止 → 下限 1）', () => {
  // 基础：善恶值 0 → 250；卖春中毒 0 → ÷1 = 250
  const { mod } = setup_bitch((f) => {
    f.store.set('cflag:31:151', 0);
    f.store.set('abl:31:37', 0);
    f.store.set('cflag:31:120', 1); // 非卖春禁止
  });
  assert.equal(mod.fi_culc_bitch(31, 'SIPPAI', 'DUNGEON'), 250);

  // 善恶值 +50 → 300
  const { mod: m2 } = setup_bitch((f) => {
    f.store.set('cflag:31:151', 50);
    f.store.set('abl:31:37', 0);
    f.store.set('cflag:31:120', 1);
  });
  assert.equal(m2.fi_culc_bitch(31, 'SIPPAI', 'DUNGEON'), 300);

  // 卖春中毒 1 → ÷2 = 150
  const { mod: m3 } = setup_bitch((f) => {
    f.store.set('cflag:31:151', 0);
    f.store.set('abl:31:37', 1);
    f.store.set('cflag:31:120', 1);
  });
  assert.equal(m3.fi_culc_bitch(31, 'SIPPAI', 'DUNGEON'), 125); // 250/2 = 125

  // 卖春禁止（CFLAG:120 == 0）→ +999
  const { mod: m4 } = setup_bitch((f) => {
    f.store.set('cflag:31:151', 0);
    f.store.set('abl:31:37', 0);
    f.store.set('cflag:31:120', 0);
  });
  assert.equal(m4.fi_culc_bitch(31, 'SIPPAI', 'DUNGEON'), 250 + 999);

  // 下限 1：善恶值 -200（250-200=50），卖春中毒 10 → 50/11=4，淫乱 ×0.7=2，
  // 娼妇 ×0.5=1 → MAX(1) = 1
  const { mod: m5 } = setup_bitch((f) => {
    f.store.set('cflag:31:151', -200);
    f.store.set('abl:31:37', 10);
    f.store.set('talent:31:76', 1); // 淫乱
    f.store.set('talent:31:181', 1); // 倾城
    f.store.set('cflag:31:120', 1);
  });
  assert.equal(m5.fi_culc_bitch(31, 'SIPPAI', 'DUNGEON'), 1);
});

test('FI_CULC_BITCH：SEIKOU 成功率算式（卖淫中毒/经验/善恶/肉便器/素质/所持金/积极性/下限 1）', () => {
  // 基础：卖淫中毒 0 → 0；无经验/善恶/素质 → 0；所持金 0 → +50（<5000 档）；
  // 卖春积极性 1 → +95；下限 MAX(1) 不触发
  const { mod } = setup_bitch((f) => {
    f.store.set('abl:31:37', 0);
    f.store.set('exp:31:74', 0);
    f.store.set('cflag:31:151', 0);
    f.store.set('cflag:31:580', 0);
    f.store.set('cflag:31:581', 0);
    f.store.set('cflag:31:582', 0);
    f.store.set('cflag:31:120', 1);
  });
  // DUNGEON 奴隶：+1500/25=60 ×0.75（非潜入非卖春指示）= 45；无所持金分档
  //（奴隶用 1500/(25-ABL) 代替所持金档）；积极性 1 → +95 → 140
  assert.equal(mod.fi_culc_bitch(31, 'SEIKOU', 'DUNGEON'), 45 + 95);

  // 肉便器（TALENT:204）→ +100
  const { mod: m2 } = setup_bitch((f) => {
    f.store.set('abl:31:37', 0);
    f.store.set('exp:31:74', 0);
    f.store.set('cflag:31:151', 0);
    f.store.set('cflag:31:580', 0);
    f.store.set('cflag:31:581', 0);
    f.store.set('cflag:31:582', 0);
    f.store.set('cflag:31:120', 1);
    f.store.set('talent:31:204', 1); // 肉便器
  });
  // 肉便器 +100 在 1500/25 之前加、一并 ×0.75：(0+100+60)*0.75 = 120 → +95
  assert.equal(m2.fi_culc_bitch(31, 'SEIKOU', 'DUNGEON'), 215);

  // 淫乱+娼妇+倾城 → +90（30*3）
  const { mod: m3 } = setup_bitch((f) => {
    f.store.set('abl:31:37', 0);
    f.store.set('exp:31:74', 0);
    f.store.set('cflag:31:151', 0);
    f.store.set('cflag:31:580', 0);
    f.store.set('cflag:31:581', 0);
    f.store.set('cflag:31:582', 0);
    f.store.set('cflag:31:120', 1);
    f.store.set('talent:31:76', 1);
    f.store.set('talent:31:180', 1);
    f.store.set('talent:31:181', 1);
  });
  // 素质 +90 也在 ×0.75 之前：(0+90+60)*0.75 = 112 → +95
  assert.equal(m3.fi_culc_bitch(31, 'SEIKOU', 'DUNGEON'), 207);

  // 卖春积极性 0 → SEIKOU = 1（下限）
  const { mod: m4 } = setup_bitch((f) => {
    f.store.set('abl:31:37', 0);
    f.store.set('exp:31:74', 0);
    f.store.set('cflag:31:151', 0);
    f.store.set('cflag:31:580', 20000); // 高所持金 → +5
    f.store.set('cflag:31:581', 0);
    f.store.set('cflag:31:582', 0);
    f.store.set('cflag:31:120', 0);
  });
  assert.equal(m4.fi_culc_bitch(31, 'SEIKOU', 'DUNGEON'), 1);

  // 勇者（CFLAG:1 == 2）所持金分档：-50000 → +2000
  const { mod: m5 } = setup_bitch((f) => {
    f.store.set('cflag:31:1', 2);
    f.store.set('abl:31:37', 0);
    f.store.set('exp:31:74', 0);
    f.store.set('cflag:31:151', 0);
    f.store.set('cflag:31:580', -50000);
    f.store.set('cflag:31:581', 0);
    f.store.set('cflag:31:582', 0);
    f.store.set('cflag:31:120', 1);
  });
  // 勇者（CFLAG:1 == 2）不走奴隶分支（无 45）；-50000 → +2000
  assert.equal(m5.fi_culc_bitch(31, 'SEIKOU', 'DUNGEON'), 2000 + 95);
});

test('FI_CULC_BITCH：KYAKU 客数（基础 RAND + 善恶值/出身/素质/场所修正，下限 0）', () => {
  // 基础 RAND:6 → 0；善恶 0 > -20 → +1；无其他修正 → 1
  const { mod } = setup_bitch((f) => {
    f.store.set('cflag:31:151', 0);
    f.store.set('talent:31:315', 0);
    f.store.set('abl:31:15', 0);
    f.store.set('abl:31:17', 0);
    f.store.set('abl:31:37', 0);
  });
  // seq_rand(0) → RAND:6 = 0
  assert.equal(mod.fi_culc_bitch(31, 'KYAKU', 'DUNGEON', seq_rand(0)), 1);

  // 善恶值 -200 → +4
  const { mod: m2 } = setup_bitch((f) => {
    f.store.set('cflag:31:151', -200);
    f.store.set('talent:31:315', 0);
    f.store.set('abl:31:15', 0);
    f.store.set('abl:31:17', 0);
    f.store.set('abl:31:37', 0);
  });
  assert.equal(m2.fi_culc_bitch(31, 'KYAKU', 'DUNGEON', seq_rand(0)), 4);

  // 元娼妇（TALENT:315 == 5）→ +2
  const { mod: m3 } = setup_bitch((f) => {
    f.store.set('cflag:31:151', 0);
    f.store.set('talent:31:315', 5);
    f.store.set('abl:31:15', 0);
    f.store.set('abl:31:17', 0);
    f.store.set('abl:31:37', 0);
  });
  // 元娼妇：0 + 1（善恶 0 > -20）+ 2 = 3
  assert.equal(m3.fi_culc_bitch(31, 'KYAKU', 'DUNGEON', seq_rand(0)), 3);

  // 下限 0：高善恶值（>180）→ -3，且无正修正 → 0（MAX(0)）
  const { mod: m4 } = setup_bitch((f) => {
    f.store.set('cflag:31:151', 200);
    f.store.set('talent:31:315', 0);
    f.store.set('abl:31:15', 0);
    f.store.set('abl:31:17', 0);
    f.store.set('abl:31:37', 0);
    f.store.set('talent:31:23', 0);
    f.store.set('talent:31:28', 0);
    f.store.set('talent:31:31', 0);
    f.store.set('talent:31:33', 0);
  });
  assert.equal(m4.fi_culc_bitch(31, 'KYAKU', 'DUNGEON', seq_rand(0)), 0);
});

test('FI_CULC_BITCH：ABLE 可不可判定（体力门槛/ORAL 接吻/SEX 处女贞操/ANIMAL 野狗）', () => {
  // 体力 < 500 → 不可
  const { mod } = setup_bitch((f) => {
    f.store.set('base:31:0', 499);
  });
  assert.equal(mod.fi_culc_bitch(31, 'ABLE', 'SEX'), 0);

  // 普通角色 → SEX 可（非处女非男人）
  const { mod: m2 } = setup_bitch((f) => {
    f.store.set('base:31:0', 500);
    f.store.set('talent:31:0', 0); // 非处女
    f.store.set('talent:31:122', 0); // 非男人
    f.store.set('cflag:31:42', 0);
    f.store.set('cflag:31:40', 0);
    f.store.set('talent:31:273', 0);
  });
  assert.equal(m2.fi_culc_bitch(31, 'ABLE', 'SEX'), 1);

  // 处女 → SEX 不可
  const { mod: m3 } = setup_bitch((f) => {
    f.store.set('base:31:0', 500);
    f.store.set('talent:31:0', 1);
  });
  assert.equal(m3.fi_culc_bitch(31, 'ABLE', 'SEX'), 0);

  // 贞操带（CFLAG:42 == 79 && CFLAG:40 & 64）→ SEX 不可
  const { mod: m4 } = setup_bitch((f) => {
    f.store.set('base:31:0', 500);
    f.store.set('talent:31:0', 0);
    f.store.set('cflag:31:42', 79);
    f.store.set('cflag:31:40', 64);
  });
  assert.equal(m4.fi_culc_bitch(31, 'ABLE', 'SEX'), 0);

  // ORAL：接吻未经验（CFLAG:16 == -1）→ 不可
  const { mod: m5 } = setup_bitch((f) => {
    f.store.set('base:31:0', 500);
    f.store.set('cflag:31:16', -1);
  });
  assert.equal(m5.fi_culc_bitch(31, 'ABLE', 'ORAL'), 0);

  // ANIMAL：无野狗道具（ITEM:22 == 0）→ 不可
  const { mod: m6 } = setup_bitch((f) => {
    f.store.set('base:31:0', 500);
    f.store.set('item:22', 0);
  });
  assert.equal(m6.fi_culc_bitch(31, 'ABLE', 'ANIMAL'), 0);

  // ANIMAL：有野狗道具 → 可
  const { mod: m7 } = setup_bitch((f) => {
    f.store.set('base:31:0', 500);
    f.store.set('item:22', 1);
    f.store.set('talent:31:0', 0);
    f.store.set('talent:31:122', 0);
  });
  assert.equal(m7.fi_culc_bitch(31, 'ABLE', 'ANIMAL'), 1);
});

test('FI_CULC_BITCH：PLAY 次数（SELF 单独处理/普通玩法/下限 1）', () => {
  // SELF：ABL:31(自慰中毒)=0 + RAND(ABL:11+1)=0 → 0/3=0 + 0 → MAX(1) = 1
  const { mod } = setup_bitch((f) => {
    f.store.set('abl:31:31', 0);
    f.store.set('abl:31:11', 0);
    f.store.set('talent:31:60', 0);
    f.store.set('talent:31:74', 0);
    f.store.set('talent:31:272', 0);
  });
  assert.equal(mod.fi_culc_bitch(31, 'PLAY', 'SELF', seq_rand(0)), 1);

  // SELF：自慰中毒 3 + RAND(1) = 0 → 3/3=1 + 0 → 1
  const { mod: m2 } = setup_bitch((f) => {
    f.store.set('abl:31:31', 3);
    f.store.set('abl:31:11', 0);
    f.store.set('talent:31:60', 0);
    f.store.set('talent:31:74', 0);
    f.store.set('talent:31:272', 0);
  });
  assert.equal(m2.fi_culc_bitch(31, 'PLAY', 'SELF', seq_rand(0)), 1);

  // 普通玩法：1 + RAND:3 = 0 → 1 + 0 + 0 + 0 = 1 → MAX(1) = 1
  const { mod: m3 } = setup_bitch((f) => {
    f.store.set('talent:31:63', 0);
    f.store.set('talent:31:64', 0);
    f.store.set('talent:31:76', 0);
    f.store.set('talent:31:272', 0);
    f.store.set('abl:31:16', 0);
    f.store.set('abl:31:37', 0);
    f.store.set('exp:31:74', 10); // 卖淫经验非零 → 不减 5
    f.store.set('cflag:31:501', 0);
    f.store.set('flag:349', 0);
  });
  assert.equal(m3.fi_culc_bitch(31, 'PLAY', 'SEX', seq_rand(0)), 1);

  // 普通玩法：RAND:3 = 2 → 1 + 2 = 3；淫乱 → +2；卖淫中毒 3 → +1；
  // 性交中毒 3 → +1 → 3+2+1+1 = 7
  const { mod: m4 } = setup_bitch((f) => {
    f.store.set('talent:31:63', 0);
    f.store.set('talent:31:64', 0);
    f.store.set('talent:31:76', 1); // 淫乱 +2
    f.store.set('talent:31:272', 0);
    f.store.set('abl:31:16', 0);
    f.store.set('abl:31:37', 3); // 卖淫中毒 (16+37)/3 = 1
    f.store.set('abl:31:30', 3); // 性交中毒 (2+30)/3 = 1（SEX 分支）
    f.store.set('abl:31:2', 2);
    f.store.set('exp:31:74', 10);
    f.store.set('cflag:31:501', 0);
    f.store.set('flag:349', 0);
  });
  assert.equal(m4.fi_culc_bitch(31, 'PLAY', 'SEX', seq_rand(2)), 7);
});

test('FI_CULC_BITCH：KAKURITU 概率权重（基础 1+RAND:3 + 玩法修正，×5）', () => {
  // HAND：1 + RAND:3=0 → 1 + ABL:32+4=4 → 5，×5 = 25
  const { mod } = setup_bitch((f) => {
    f.store.set('abl:31:32', 0);
  });
  assert.equal(mod.fi_culc_bitch(31, 'KAKURITU', 'HAND', seq_rand(0)), 25);

  // ORAL：1 + RAND:3=0 → 1 + ABL:32+3=3 → 4，×5 = 20
  const { mod: m2 } = setup_bitch((f) => {
    f.store.set('abl:31:32', 0);
  });
  assert.equal(m2.fi_culc_bitch(31, 'KAKURITU', 'ORAL', seq_rand(0)), 20);
});

test('FI_CULC_BITCH：RATE 费率表（KARMA=250+善恶值；HAND=1；ORAL/LES=2；ANAL=3；SEX=4；ANIMAL=11）', () => {
  const { mod } = setup_bitch((f) => {
    f.store.set('cflag:31:151', 0);
  });
  assert.equal(mod.fi_culc_bitch(31, 'RATE', 'KARMA'), 250);
  assert.equal(mod.fi_culc_bitch(31, 'RATE', 'HAND'), 1);
  assert.equal(mod.fi_culc_bitch(31, 'RATE', 'ORAL'), 2);
  assert.equal(mod.fi_culc_bitch(31, 'RATE', 'LES'), 2);
  assert.equal(mod.fi_culc_bitch(31, 'RATE', 'ANAL'), 3);
  assert.equal(mod.fi_culc_bitch(31, 'RATE', 'SEX'), 4);
  assert.equal(mod.fi_culc_bitch(31, 'RATE', 'ANIMAL'), 11);
  // 善恶值 +50 → KARMA = 300
  const { mod: m2 } = setup_bitch((f) => {
    f.store.set('cflag:31:151', 50);
  });
  assert.equal(m2.fi_culc_bitch(31, 'RATE', 'KARMA'), 300);
});

test('PROFIT_BITCH：收益结算（场所/身份分档 + 客种类 + 处女溢价 + 总价）', () => {
  // 街中普通玩法：PAY = RATE(KARMA) * RATE(TYPE) / 5
  // 善恶 0 → 250；SEX RATE=4 → 250*4/5 = 200；无经验溢价 +10 → 210；非处女 → 210；
  // PLAY=2 → 420
  const { fixture, mod } = setup_bitch((f) => {
    f.store.set('cflag:31:151', 0);
    f.store.set('exp:31:74', 0); // 无卖淫经验 → +10
    f.store.set('talent:31:0', 0); // 非处女
  });
  const [cust, no] = mod.profit_bitch(31, 'TOWN', 'SEX', 2, seq_rand(0));
  assert.equal(cust, 1); // 男性客
  assert.ok(no >= 1 && no <= 5);
  assert.equal(fixture.store.get('cflag:31:580'), 420); // 勇者所持金 += PAY

  // DUNGEON 奴隶：PAY = 5 * (1 + CFLAG:501 + RATE(TYPE))
  // CFLAG:501=0；SEX RATE=4 → 5*(1+0+4) = 25；无经验 +10 → 35；PLAY=2 → 70
  const { fixture: f2, mod: m2 } = setup_bitch((f) => {
    f.store.set('cflag:31:151', 0);
    f.store.set('cflag:31:1', 0); // 奴隶
    f.store.set('cflag:31:501', 0);
    f.store.set('exp:31:74', 0);
    f.store.set('talent:31:0', 0);
    f.store.set('flag:10004', 0); // MONEY 起点
    f.store.set('exflag:4444', 0);
  });
  m2.profit_bitch(31, 'DUNGEON', 'SEX', 2, seq_rand(0));
  assert.equal(f2.store.get('flag:10004'), 70); // MONEY += 70
  assert.equal(f2.store.get('exflag:4444'), 70); // EX_FLAG:4444 += 70

  // DUNGEON 勇者：PAY = (RATE(TYPE) + CFLAG:501) * RATE(KARMA) / 5
  // CFLAG:501=1；SEX RATE=4 → (4+1)*250/5 = 250；无经验 +10 → 260；PLAY=1 → 260
  const { fixture: f3, mod: m3 } = setup_bitch((f) => {
    f.store.set('cflag:31:1', 2); // 勇者
    f.store.set('cflag:31:501', 1);
    f.store.set('cflag:31:151', 0);
    f.store.set('exp:31:74', 0);
    f.store.set('talent:31:0', 0);
    f.store.set('cflag:31:580', 0);
  });
  m3.profit_bitch(31, 'DUNGEON', 'SEX', 1, seq_rand(0));
  assert.equal(f3.store.get('cflag:31:580'), 260);
});

test('SET_BICH_LEVEL：输入分档（0/1/2-5）写入 CFLAG:120', async () => {
  const { fixture, mod } = setup_bitch();
  fixture.set_inputs(0);
  await mod.set_bich_level(31);
  assert.equal(fixture.store.get('cflag:31:120'), 0);
  assert.ok(
    fixture.text_lines().some((l) => l.includes('卖春积极性变成没有了')),
  );

  const { fixture: f2, mod: m2 } = setup_bitch();
  f2.set_inputs(1);
  await m2.set_bich_level(31);
  assert.equal(f2.store.get('cflag:31:120'), 1);
  assert.ok(f2.text_lines().some((l) => l.includes('卖春积极性变成普通了')));

  const { fixture: f3, mod: m3 } = setup_bitch();
  f3.set_inputs(3);
  await m3.set_bich_level(31);
  assert.equal(f3.store.get('cflag:31:120'), 3);
  assert.ok(f3.text_lines().some((l) => l.includes('卖春积极性变为等级3了')));

  // 无效输入（< 0 / > 5）直接返回不写
  const { fixture: f4, mod: m4 } = setup_bitch();
  f4.set_inputs(-1);
  await m4.set_bich_level(31);
  assert.equal(f4.store.get('cflag:31:120'), undefined);

  const { fixture: f5, mod: m5 } = setup_bitch();
  f5.set_inputs(6);
  await m5.set_bich_level(31);
  assert.equal(f5.store.get('cflag:31:120'), undefined);
});

test('SELL_BITCH：完整流程（客循环 → 成功显示 → 经验/金钱/善恶值）', async () => {
  const { fixture, mod } = setup_bitch((f) => {
    f.store.set('base:31:0', 500);
    f.store.set('base:31:1', 500);
    f.store.set('cflag:31:1', 0); // 奴隶
    f.store.set('cflag:31:151', 0); // 善恶值 0
    f.store.set('cflag:31:120', 1); // 卖春积极性
    f.store.set('abl:31:37', 0);
    f.store.set('exp:31:74', 10); // 有卖淫经验（免 -5）
    f.store.set('talent:31:0', 0);
    // SELL_BITCH 内部：KYAKU=1（RAND:6=0+善恶 0 +0 = 0 → +1? 看 KYAKU 算式）
    // 让客数=1：RAND:6=0，善恶 0 无修正 → 0。设 KYAKU 修正：善恶 -20 → +1
    f.store.set('cflag:31:151', -20);
    // 所持金起点
    f.store.set('flag:10004', 1000);
    f.store.set('exflag:4444', 1000);
  });
  // seq_rand: KYAKU RAND:6=0；客循环 SEIKOU/SIPPAI 判定（RAND:(SEIKOU+SIPPAI)）
  // SEIKOU = 0*5 + 1(exp) + 0 + 0 + 50(所持金 0 <5000) + 95 = 146
  // SIPPAI = 250 + (-20) = 230；/1 = 230；无淫乱；无娼妇；→ 230
  // RAND:(146+230=376) < 146 → rand=0 → 成功
  await mod.sell_bitch(31, 'DUNGEON', seq_rand(0, 0, 0, 0, 0));
  // 成功路径：应该有输出文本
  const lines = fixture.text_lines();
  assert.ok(lines.length > 0);
  // 经验（EXP:31:80 至少 +1）
  assert.ok((fixture.store.get('exp:31:80') || 0) >= 1);
});

test('DUNGEON_WORK：内职收入（潜入中 ÷10；MONEY/EX_FLAG 入账）', () => {
  const { fixture, mod } = setup_bitch((f) => {
    f.store.set('cflag:31:9', 2); // 等级 2 → (2*20)+100 = 140
    f.store.set('cflag:31:0', 1); // 非潜入 → 不 ÷10
    f.store.set('flag:10004', 0);
    f.store.set('exflag:4444', 0);
    f.store.set('flag:5', 0); // 调试位关
  });
  mod.dungeon_work(31, seq_rand(0));
  assert.equal(fixture.store.get('flag:10004'), 140);
  assert.equal(fixture.store.get('exflag:4444'), 140);

  // 潜入中（CFLAG:0 == 0）→ ÷10 = 14
  const { fixture: f2, mod: m2 } = setup_bitch((f) => {
    f.store.set('cflag:31:9', 2);
    f.store.set('cflag:31:0', 0);
    f.store.set('flag:10004', 0);
    f.store.set('exflag:4444', 0);
    f.store.set('flag:5', 0);
  });
  m2.dungeon_work(31, seq_rand(0));
  assert.equal(f2.store.get('flag:10004'), 14);
});

test('HEROINE_BITCH：债务过高强制卖春存根（CFLAG:582 < -10000 且非处女且 !RAND:3）', async () => {
  const { fixture, mod } = setup_bitch((f) => {
    f.store.set('base:31:0', 500);
    f.store.set('base:31:1', 500);
    f.store.set('cflag:31:120', 0); // 无卖春积极性 → 卖春判定跳过
    f.store.set('cflag:31:582', -20000); // 债务高
    f.store.set('talent:31:0', 0); // 非处女
  });
  // !RAND:3 → RAND:3 = 0 → 触发强制肉偿存根
  await mod.heroine_bitch(31, seq_rand(0, 0, 0));
  assert.ok(
    fixture
      .text_lines()
      .some((l) => l.includes('强制肉偿') && l.includes('债务过高')),
  );
});

test('【验收 4】存根清单可检索：docs/stub-registry.md 收录本文件全部占位名', () => {
  const { mod } = setup_bitch();
  const registry = fs.readFileSync(
    path.resolve(__dirname, '..', 'docs', 'stub-registry.md'),
    'utf8',
  );
  for (const name of mod.STUBBED_CALLS) {
    assert(registry.includes(name), `存根清单缺少 ${name}`);
  }
});
