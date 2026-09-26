/**
 * 装备系统行为测试（issue #174：@EQUIP_CHECK/@EQUIP_DATABASE 行为/@PRINT_*
 * /@REMOVE_CURSE/@CURSE_EQUIP_RING/@EQUIP_SELECT/@EQUIP_GET/@GET_EQUIP_NUM/
 * @EQUIP_POWERUP/@USEABLE_EQUIPMENT/@WEAPON_RESTORE；#546：@EQUIP_ST_SHOW/
 * @SHOW_BUTTON_EQUIP/@CHECK_ABLE_TO_SHOW_EQUIP）。
 *
 * 缝 = test/helpers/era-fixture.js。随机源以 rng 参数注入（RAND:N = 0..N-1），
 * 构造确定序列；数据表与 ERB 的逐分支等价在 test/equip-database.test.js。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara } = require('./helpers/chara');

/** 造一个带角色 31（温妮）与装备模块的夹具 */
function setup_equip() {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  const lookup = fixture.load_module('system/equip/equip-lookup');
  const check = fixture.load_module('system/equip/equip-check');
  const print = fixture.load_module('system/equip/equip-print');
  const curse = fixture.load_module('system/equip/equip-curse');
  const select = fixture.load_module('system/equip/equip-select');
  const usable = fixture.load_module('system/equip/equip-usable');
  const restore = fixture.load_module('system/equip/weapon-restore');
  return { fixture, lookup, check, print, curse, select, usable, restore };
}

test('equip_database：装饰行五列、武装行十三列、附魔增量与强度加成、默认臂重置、负数守卫', () => {
  const { fixture, lookup } = setup_equip();
  const { equip_database } = lookup;

  // 装饰行（成长戒指 id 10 + 强度 3）
  const ring = { 存储编号: 10 + 3 * 1000 };
  assert.equal(equip_database(ring), true);
  assert.deepEqual(
    [
      ring.效果,
      ring.价格,
      ring.诅咒,
      ring.特殊,
      ring.部位,
      ring.识别号,
      ring.强度,
      ring.前缀,
    ],
    [10, 70000, 0, 0, 1, 10, 3, 0],
  );

  // 武装行（战锤 id 47 + 强度 2 → 伤害强化 150 + 2*5）
  const weapon = { 存储编号: 47 + 2 * 1000 };
  equip_database(weapon);
  assert.deepEqual(
    [
      weapon.效果,
      weapon.价格,
      weapon.诅咒,
      weapon.特殊,
      weapon.部位,
      weapon.伤害强化,
      weapon.弹药消耗,
      weapon.失手率,
      weapon.气力回复,
      weapon.连击率,
      weapon.防御伤害,
      weapon.弹尽行为,
      weapon.气力伤害,
    ],
    [0, 100, 0, 0, 0, 160, 0, 30, 0, 0, 100, 0, 100],
  );

  // 附魔（前缀 1 巨人 + 剑 + 强度 1：伤害强化 100+30+5、失手率 20）
  const enchanted = { 存储编号: 1 * 100000 + 1 * 1000 + 40 };
  equip_database(enchanted);
  assert.equal(enchanted.伤害强化, 135);
  assert.equal(enchanted.失手率, 20);
  // 附魔前缀 2 剧毒：毒位 + 伤害弱化
  const poison = { 存储编号: 2 * 100000 + 40 };
  equip_database(poison);
  assert.equal(poison.特殊, 1);
  assert.equal(poison.伤害强化, 90);

  // 默认臂（未知识别号 999 → 黑戒指，存储编号/识别号/强度重置 0，前缀保留）
  const unknown = { 存储编号: 999 };
  assert.equal(equip_database(unknown), true);
  assert.equal(unknown.存储编号, 0);
  assert.equal(unknown.识别号, 0);
  assert.equal(unknown.强度, 0);
  assert.equal(unknown.诅咒, 1, '黑戒指是诅咒品');
  assert.equal(unknown.部位, 1);
  const unknown_prefix = { 存储编号: 9 * 100000 + 999 };
  equip_database(unknown_prefix);
  assert.equal(unknown_prefix.前缀, 9, '默认臂不清前缀（W:17 保留）');
  assert.equal(unknown_prefix.气力伤害, 120, '默认臂带武装列且受附魔 9 加成');

  // 负数守卫（空槽 -1）与 :700 强度加成（装饰行也会算 伤害强化，无人读）
  assert.equal(equip_database({ 存储编号: -1 }), false);
  const scaled_ring = { 存储编号: 4 * 1000 + 0 };
  equip_database(scaled_ring);
  assert.equal(scaled_ring.伤害强化, 0 + 4 * 5);

  assert.equal(fixture.text_lines().length, 0, '查表不得有输出');
});

test('equip_check：两枚装饰按效果号合计强度；武装与空槽不参与；cid < 0 恒 0', () => {
  const { fixture, check } = setup_equip();
  const store = fixture.store;
  // 551 = 守护戒指+2（效果 2）、552 = 成长戒指+3（效果 10）
  store.set('cflag:31:551', 2 + 2 * 1000);
  store.set('cflag:31:552', 10 + 3 * 1000);
  assert.equal(check.equip_check(31, 2), 2);
  assert.equal(check.equip_check(31, 10), 3);
  assert.equal(check.equip_check(31, 5), 0, '无匹配效果恒 0');
  assert.equal(check.equip_check(-1, 2), 0);

  // 武装（550）与弹药（571）不参与；诅咒戒指照常计入
  store.set('cflag:31:550', 7 + 5 * 1000); // 怪力戒指放武装位（原作也不读）
  store.set('cflag:31:552', 6 + 4 * 1000); // 欲望戒指+4（诅咒、效果 6）
  assert.equal(check.equip_check(31, 7), 0, '武装位不参与 EQUIP_CHECK');
  assert.equal(check.equip_check(31, 6), 4, '诅咒戒指照常合计');

  // 空槽 -1 与未装备（引擎缺省 0 = 装饰戒指效果 0）都不贡献
  store.set('cflag:31:551', -1);
  store.set('cflag:31:552', 0);
  assert.equal(check.equip_check(31, 2), 0);
  assert.equal(check.equip_check(31, 0), 0, '效果 0 的装饰戒指也只贡献强度 0');
});

test('get_equip_num 与 equip_get：道具号换算、入包 +1 上限 99', () => {
  const { fixture, lookup } = setup_equip();
  const w = { 备注: 306 };
  lookup.get_equip_num(w);
  assert.equal(w.存储编号, 6);
  lookup.get_equip_num({ 备注: 100 }); // 非装备道具号 → 钳 0
  const clamp = { 备注: 100 };
  lookup.get_equip_num(clamp);
  assert.equal(clamp.存储编号, 0);

  fixture.store.set('item:306', 98);
  lookup.equip_get({ 存储编号: 6 });
  assert.equal(fixture.store.get('item:306'), 99);
  lookup.equip_get({ 存储编号: 6 });
  assert.equal(fixture.store.get('item:306'), 99, '上限 99（:885-886）');
  lookup.equip_get({ 存储编号: -1 });
  assert.equal(fixture.store.get('item:300'), undefined, '负编号不入包');
  // 武器入包（id 45 → item:345）
  lookup.equip_get({ 存储编号: 45 });
  assert.equal(fixture.store.get('item:345'), 1);
});

test('print：前缀 + 名 + 强度后缀共一行，LightSalmon；未知识别号重置', () => {
  const { fixture, print } = setup_equip();
  print.print_equiptype_weapon({ 存储编号: 1 * 100000 + 3 * 1000 + 40 });
  assert.equal(fixture.text_lines()[0], '巨型剑+3');
  print.print_equiptype_ring({ 存储编号: 13 });
  assert.equal(fixture.text_lines()[1], '死亡戒指');
  print.print_equiptype_weapon({ 存储编号: 60 + 0 });
  assert.equal(fixture.text_lines()[2], '', '预留段 53-60 为空名');
  const unknown_w = { 存储编号: 61 }; // 不在 40-60 段 → ELSE 重置 40 号剑
  print.print_equiptype_weapon(unknown_w);
  assert.equal(fixture.text_lines()[3], '剑');
  assert.equal(unknown_w.存储编号, 40);
  assert.equal(unknown_w.强度, 0);
  const unknown_r = { 存储编号: 21 + 5 * 1000 }; // 戒指段只认 0-20
  print.print_equiptype_ring(unknown_r);
  assert.equal(fixture.text_lines()[4], '暗黑戒指');
  assert.equal(unknown_r.存储编号, 0);
  assert.equal(unknown_r.强度, 0);

  // 色：SETCOLORBYNAME LightSalmon 的等价物 = 片段 color（app.asar 直通）
  const colored = fixture.lines_history.find(
    (line) => line.type === 'text' && Array.isArray(line.content),
  );
  assert.ok(colored, '装备名应经片段数组输出');
  assert.equal(colored.content[0].color, 'LightSalmon');
});

test('remove_curse：无效道具与无诅咒直接 0；失败两途保留诅咒品；成功按阶梯换新并 +1 强度', async () => {
  const { fixture, curse } = setup_equip();
  const store = fixture.store;
  store.set('cflag:31:501', 3); // 阶层 3

  // 无效道具（识别号查不到 → RESULT 0；装饰戒指未诅咒同样 0）
  assert.equal(await curse.remove_curse({ 备注: 299 }, 31), 0);
  assert.equal(await curse.remove_curse({ 备注: 300 }, 31), 0);

  // 欲望戒指（id 6，诅咒）：阶层 3 → 起始存储编号 3006
  // 失败途一：非神官/忍者且 rand(3) == 0 → 呪い品装着（RESULT 1、编号不变）
  store.set('talent:31:202', 0);
  store.set('talent:31:207', 0);
  const fail1 = { 备注: 306 };
  assert.equal(await curse.remove_curse(fail1, 31, () => 0), 1);
  assert.equal(fail1.存储编号, 3006, '失败时保留原诅咒品（阶层的强度段）');
  assert.ok(fixture.text_lines().includes('温妮解咒失败了！'));

  // 失败途二：神官（202）跳过 rand(3)，但 rand(8) == 0 仍失败
  store.set('talent:31:202', 1);
  const fail2 = { 备注: 306 };
  assert.equal(await curse.remove_curse(fail2, 31, () => 0), 1);
  assert.equal(fail2.存储编号, 3006);

  // 成功：rand(8) = 7 ≠ 0，D = rand(100) = 0 → 新识别号 8（强韧戒指），
  // 强度 3 + 1 = 4 → 存储编号 8 + 4 * 1000
  const ok = { 备注: 306 };
  const seq = [7, 0];
  let drawn = 0;
  assert.equal(await curse.remove_curse(ok, 31, (n) => seq[drawn++] % n), 1);
  assert.equal(ok.存储编号, 8 + 4 * 1000);
  assert.equal(ok.部位, 1);
  assert.equal(ok.诅咒, 0, '解咒产物是干净戒指');
  assert.ok(fixture.text_lines().includes('温妮解咒成功。'));

  // D = 99.9% 段：D 取 99 → 识别号 1（破坏戒指）
  const ok2 = { 备注: 306 };
  const seq2 = [7, 99];
  let drawn2 = 0;
  await curse.remove_curse(ok2, 31, (n) => seq2[drawn2++] % n);
  assert.equal(ok2.识别号, 1);
  assert.equal(ok2.强度, 4);
});

test('curse_equip_ring：库存耗尽 0；逐个消耗装饰戒指并按阶梯入包', async () => {
  const { fixture, curse } = setup_equip();
  const store = fixture.store;
  // 无库存：直接 0、零输出
  assert.equal(await curse.curse_equip_ring(() => 0), 0);
  assert.equal(fixture.text_lines().length, 0);

  // 库存 2：两次制造（D = 0 → 死之戒指 id 13 → item:313），第三轮耗尽返回 0
  store.set('item:300', 2);
  assert.equal(await curse.curse_equip_ring(() => 0), 0);
  assert.equal(store.get('item:300'), 0);
  assert.equal(store.get('item:313'), 2);
  const texts = fixture.text_lines();
  assert.equal(
    texts.filter((l) => l === '你把装饰戒指制造成死亡戒指了').length,
    2,
  );
  // D = 50 → 试炼戒指 id 19（阶梯 :171-189：<60 段）
  store.set('item:300', 1);
  await curse.curse_equip_ring(() => 50);
  assert.equal(store.get('item:319'), 1);
  // D = 85 → 钝重戒指 id 12（<90 段）
  store.set('item:300', 1);
  await curse.curse_equip_ring(() => 85);
  assert.equal(store.get('item:312'), 1);
});

test('equip_select：宝箱检查、道具消耗、换装与早退各分支', async () => {
  const { fixture, select } = setup_equip();
  const store = fixture.store;

  // cid < 0 与非装备道具号（FLAG:(阶层+339) 未写 → 0 < 300）直接 0
  assert.equal(await select.equip_select(-1), 0);
  assert.equal(await select.equip_select(31), 0);
  assert.ok(!fixture.text_lines().includes('勇者发现了宝箱！'));

  // 道具号为装备但库存 0 → 早退（发现文本不打）
  store.set('cflag:31:501', 1); // 阶层 1 → FLAG:340
  store.set('flag:340', 306);
  store.set('item:306', 0);
  assert.equal(await select.equip_select(31), 0);
  assert.ok(!fixture.text_lines().includes('勇者发现了宝箱！'));

  // 战役中（CFLAG:1 == 12）走 CAMPAIGN_EQUIP_SELECT，FLAG:400 未置位恒 0 早退
  store.set('cflag:31:1', 12);
  store.set('item:306', 5);
  assert.equal(await select.equip_select(31), 0);
  assert.ok(!fixture.text_lines().includes('勇者发现了宝箱！'));
  store.set('cflag:31:1', 0);

  // 空槽 -1 + 诅咒宝箱（欲望戒指）+ 神官解咒成功（D = 0 → 强韧戒指+2）
  store.set('cflag:31:551', -1);
  store.set('talent:31:202', 1);
  const seq = [7, 0];
  let drawn = 0;
  assert.equal(await select.equip_select(31, (n) => seq[drawn++] % n), 0);
  assert.equal(store.get('item:306'), 4, '宝箱道具要消耗一件');
  assert.equal(store.get('cflag:31:551'), 8 + 2 * 1000, '装到装饰槽 551');
  assert.ok(
    fixture.text_lines().includes('勇者把强韧戒指+2装备上了。'),
    '换装播报（前缀空、强度后缀保留）',
  );

  // 两槽都占（强度不低于阶层）→ 似乎没什么好东西
  const no_swap = setup_equip();
  no_swap.fixture.store.set('cflag:31:501', 1);
  no_swap.fixture.store.set('flag:340', 306);
  no_swap.fixture.store.set('item:306', 3);
  no_swap.fixture.store.set('cflag:31:551', 5 * 1000 + 9); // 支配戒指+5（强度 5 ≥ 1）
  no_swap.fixture.store.set('cflag:31:552', 5 * 1000 + 9);
  await no_swap.select.equip_select(31);
  assert.ok(no_swap.fixture.text_lines().includes('似乎没什么好东西。'));
  assert.equal(no_swap.fixture.store.get('item:306'), 2, '道具仍被消耗');
});

test('equip_select：空槽也吃「强度 < 阶层」门（源 :243/:258 左结合）', async () => {
  // 源 :243 / :258 `W:0 == -1 || RESULT && W:2 < CFLAG:A:501 && W:5 == 0`
  // ——Emuera 的 && 与 || 同优先级、左结合，读作
  // `(空槽（-1）|| 有效) && 强度 < 阶层 && 未诅咒`（#517）。
  // 阶层 0 时 `0 < 0` 判假，两枚空槽都不换装（先例：同族 :911 用的正是
  // 等价式 `(CFLAG:40 & 17) && FLAG:37`）。
  const { fixture, select } = setup_equip();
  const store = fixture.store;
  store.set('cflag:31:501', 0); // 阶层 0 → FLAG:339
  store.set('flag:339', 306); // 欲望戒指（诅咒品）
  store.set('item:306', 3);
  store.set('cflag:31:551', -1); // 两枚装饰槽都空
  store.set('cflag:31:552', -1);
  store.set('talent:31:202', 1); // 神官（解咒必成，排除随机）
  assert.equal(await select.equip_select(31, () => 0), 0);
  assert.equal(store.get('cflag:31:551'), -1, '阶层 0 → 空槽 551 不换装');
  assert.equal(store.get('cflag:31:552'), -1, '阶层 0 → 空槽 552 不换装');
  assert.ok(fixture.text_lines().includes('似乎没什么好东西。'));
  assert.equal(store.get('item:306'), 2, '宝箱道具仍被消耗');

  // 阶层 1 时同一世界就该换装（上门的另一边）
  const one = setup_equip();
  one.fixture.store.set('cflag:31:501', 1);
  one.fixture.store.set('flag:340', 306);
  one.fixture.store.set('item:306', 3);
  one.fixture.store.set('cflag:31:551', -1);
  one.fixture.store.set('cflag:31:552', -1);
  one.fixture.store.set('talent:31:202', 1);
  const seq = [7, 0];
  let drawn = 0;
  assert.equal(await one.select.equip_select(31, (n) => seq[drawn++] % n), 0);
  assert.equal(one.fixture.store.get('cflag:31:551'), 8 + 2 * 1000);
});

test('campaign_equip_select()：FLAG:400 = 1 时按 CAMPAIGN_EQUIP_SELECT_1 的楼层表返回道具号（#469）', async () => {
  const fixture = create_era_fixture();
  const { campaign_equip_select } = fixture.load_module(
    'system/equip/equip-select',
  );
  assert.equal(await campaign_equip_select(3), 0, 'FLAG:400 < 1 时恒 0');

  fixture.store.set('flag:400', 1);
  fixture.load_module('page/page-campaign-1'); // 触发 CAMPAIGN_1 的 register()
  assert.equal(await campaign_equip_select(3), 313, '3 层：死の指輪');
  assert.equal(await campaign_equip_select(4), 314, '4 层：衰弱の指輪');
  assert.equal(await campaign_equip_select(5), 319, '5 层：試練の指輪');
  assert.equal(await campaign_equip_select(1), 0, '未登记楼层恒 0');
});

test('equip_powerup：素质修正各分支（含能力者的属性化与强化两途）', () => {
  const { fixture, check } = setup_equip();
  const { equip_database } = fixture.load_module('system/equip/equip-lookup');
  const store = fixture.store;

  const make = (no) => {
    const w = { 存储编号: no };
    equip_database(w);
    return w;
  };

  // 初心者 291：伤害 -10、失手 +10
  store.set('talent:31:291', 1);
  const rookie = make(40);
  check.equip_powerup(rookie, 31);
  assert.equal(rookie.伤害强化, 90);
  assert.equal(rookie.失手率, 10);

  // 恶魔尾巴 246 + 恶魔眼睛 247 + 角 264
  store.set('talent:31:291', 0);
  store.set('talent:31:246', 1);
  store.set('talent:31:247', 1);
  store.set('talent:31:264', 1);
  const devil = make(40);
  check.equip_powerup(devil, 31);
  assert.equal(devil.伤害强化, 100 + 10 + 10);
  assert.equal(devil.气力伤害, 100 + 10);
  assert.equal(devil.气力回复, -10);

  // 火之能力者 275：无火属性 → 属性化（特殊 +2）；有火属性（前缀 5 烈火）→ 伤害 +10
  store.set('talent:31:246', 0);
  store.set('talent:31:247', 0);
  store.set('talent:31:264', 0);
  store.set('talent:31:275', 1);
  const fire_plain = make(40);
  check.equip_powerup(fire_plain, 31);
  assert.equal(fire_plain.特殊, 2, '无属性武器被无风险火属性化');
  const fire_armed = make(5 * 100000 + 40);
  check.equip_powerup(fire_armed, 31);
  assert.equal(fire_armed.特殊, 2, '烈火剑自带火位，不再叠加');
  assert.equal(fire_armed.失手率, 10, '烈火附魔的失手 +10');
  assert.equal(
    fire_armed.伤害强化,
    110,
    '烈火无伤害增量（:670-674），火之能力者的 +10 全额生效',
  );

  // 光之能力者 278：气力回复为正 → 三项 +5；为 0/负 → 气力回复 +10
  store.set('talent:31:275', 0);
  store.set('talent:31:278', 1);
  const light_heal = make(41); // 法杖：气力回复 20
  check.equip_powerup(light_heal, 31);
  assert.equal(light_heal.气力回复, 25);
  assert.equal(light_heal.连击率, 5);
  const light_plain = make(40);
  check.equip_powerup(light_plain, 31);
  assert.equal(light_plain.气力回复, 10, '无气力回复的武器被赋予 +10');
});

test('usable_equipment：戒指人人可用；武器按职业表；无职业/肉便器 0', () => {
  const { fixture, usable } = setup_equip();
  const store = fixture.store;
  const u = usable.usable_equipment;
  assert.equal(u(31, 0), 1);
  assert.equal(u(31, 20), 1);
  assert.equal(u(31, 21), 0, '21 不是戒指也不在任何职业表');

  store.set('talent:31:207', 1); // 忍者
  assert.equal(u(31, 43), 1);
  assert.equal(u(31, 52), 1);
  assert.equal(u(31, 40), 0);

  store.set('talent:31:200', 1); // 又有战士：链序首个命中（战士）定结果
  assert.equal(u(31, 40), 1);
  assert.equal(u(31, 52), 1, '战士表里也有 52');

  // 肉便器 204 不在链上 → 与无职业同途 0
  store.set('talent:31:200', 0);
  store.set('talent:31:207', 0);
  store.set('talent:31:204', 1);
  assert.equal(u(31, 40), 0);
});

test('weapon_restore：装备强化倍率、铁壁、劣化、攻防变动、勋章、人狼满月', () => {
  const { fixture, restore } = setup_equip();
  const store = fixture.store;

  // 基线：守护戒指+2（效果 2）→ 倍率 (2+10)/10；基础攻 100/防 80
  store.set('cflag:31:13', 100);
  store.set('cflag:31:14', 80);
  store.set('cflag:31:551', 2 + 2 * 1000);
  restore.weapon_restore(31);
  assert.equal(store.get('cflag:31:11'), 120);
  assert.equal(store.get('cflag:31:12'), 96);

  // 铁壁：气力 30/100（< 40%）+ TALENT:249 + 等级 5 → 攻防 +5、体力 +50 封顶
  const iron = setup_equip();
  iron.fixture.store.set('cflag:31:13', 100);
  iron.fixture.store.set('cflag:31:14', 80);
  iron.fixture.store.set('base:31:1', 30);
  iron.fixture.store.set('maxbase:31:1', 100);
  iron.fixture.store.set('base:31:0', 1000);
  iron.fixture.store.set('maxbase:31:0', 1030);
  iron.fixture.store.set('talent:31:249', 1);
  iron.fixture.store.set('cflag:31:9', 5);
  iron.restore.weapon_restore(31);
  assert.equal(iron.fixture.store.get('cflag:31:11'), 105);
  assert.equal(iron.fixture.store.get('cflag:31:12'), 85);
  assert.equal(
    iron.fixture.store.get('base:31:0'),
    1030,
    '体力 +50 后超上限钳回 MAXBASE',
  );

  // 劣化（效果 11）+ 攻击变动（7）+ 防御变动（8）三戒指
  const mixed = setup_equip();
  mixed.fixture.store.set('cflag:31:13', 100);
  mixed.fixture.store.set('cflag:31:14', 100);
  mixed.fixture.store.set('cflag:31:551', 11 + 3 * 1000); // 虚弱戒指+3 → 劣化 3
  mixed.fixture.store.set('cflag:31:552', 7 + 2 * 1000); // 怪力戒指+2 → 攻击变动 2
  mixed.restore.weapon_restore(31);
  // 攻：100 × 10/10 = 100 → ÷(3+1) = 25 → +2×10 = 45；防：100 → 25（无防御变动）
  assert.equal(mixed.fixture.store.get('cflag:31:11'), 45);
  assert.equal(mixed.fixture.store.get('cflag:31:12'), 25);

  // 勋章上位职：魔界将军 210（攻偏重）与魔导神官 211（防偏重）
  const general = setup_equip();
  general.fixture.store.set('cflag:31:13', 100);
  general.fixture.store.set('cflag:31:14', 100);
  general.fixture.store.set('talent:31:210', 1);
  general.fixture.store.set('exp:31:81', 7);
  general.restore.weapon_restore(31);
  assert.equal(general.fixture.store.get('cflag:31:11'), 114);
  assert.equal(general.fixture.store.get('cflag:31:12'), 107);
  const priest = setup_equip();
  priest.fixture.store.set('cflag:31:13', 100);
  priest.fixture.store.set('cflag:31:14', 100);
  priest.fixture.store.set('talent:31:211', 1);
  priest.fixture.store.set('exp:31:81', 7);
  priest.restore.weapon_restore(31);
  assert.equal(priest.fixture.store.get('cflag:31:11'), 107);
  assert.equal(priest.fixture.store.get('cflag:31:12'), 114);

  // 人狼（314 == 2）满月 14-16 日 → 攻防 ×10；13 日不触发
  const wolf = setup_equip();
  wolf.fixture.store.set('cflag:31:13', 10);
  wolf.fixture.store.set('cflag:31:14', 10);
  wolf.fixture.store.set('talent:31:314', 2);
  const wolf_flag = wolf.fixture.load_module('era-utils/era-flag');
  wolf_flag.date = 15;
  wolf.restore.weapon_restore(31);
  assert.equal(wolf.fixture.store.get('cflag:31:11'), 100);
  const not_full = setup_equip();
  not_full.fixture.store.set('cflag:31:13', 10);
  not_full.fixture.store.set('cflag:31:14', 10);
  not_full.fixture.store.set('talent:31:314', 2);
  not_full.fixture.load_module('era-utils/era-flag').date = 13;
  not_full.restore.weapon_restore(31);
  assert.equal(not_full.fixture.store.get('cflag:31:11'), 10);
});

// #469）：清单核对测试随之移除，同 dungeon-room.test.js 的处置

// —— #546：装备详情显示三函数（其他/EQUIP.ERB:1030-1113）——

/** 造带 equip-show 模块的夹具：角色 31（温妮）+ 武装槽可预置 */
function setup_show() {
  const base = setup_equip();
  base.show = base.fixture.load_module('system/equip/equip-show');
  return base;
}

test('check_able_to_show_equip：五道 OR 的表驱动，返回 1 = 不可见（EQUIP.ERB:1090-1113）', () => {
  const table = [
    ['善恶值 1 且其余全不满足 → 1', { 'cflag:31:151': 1 }, 1],
    ['未设善恶值（读得 0 ≤ 0）→ 0', {}, 0],
    ['可出售（CFLAG:0 > 0）', { 'cflag:31:0': 1, 'cflag:31:151': 1 }, 0],
    ['信赖度 20（恰好达标）', { 'cflag:31:2': 20, 'cflag:31:151': 1 }, 0],
    ['信赖度 19（差一不可见）', { 'cflag:31:2': 19, 'cflag:31:151': 1 }, 1],
    ['顺从 1（ABL:10 > 0）', { 'abl:31:10': 1, 'cflag:31:151': 1 }, 0],
    ['爱表现（TALENT:28）', { 'talent:31:28': 1, 'cflag:31:151': 1 }, 0],
    ['善恶值 0（<= 0 即可见）', { 'cflag:31:151': 0 }, 0],
    ['善恶值 -1（负数同可见）', { 'cflag:31:151': -1 }, 0],
  ];
  for (const [label, seeds, expected] of table) {
    const { fixture, show } = setup_show();
    for (const [key, value] of Object.entries(seeds)) {
      fixture.store.set(key, value);
    }
    assert.equal(show.check_able_to_show_equip(31), expected, label);
    assert.equal(fixture.text_lines().length, 0, `${label}：判定不得有输出`);
  }
});

test('show_button_equip：判定放行渲染 [16] 装备情报按钮，不放行零输出（:1074-1087）', () => {
  const able = setup_show();
  able.fixture.store.set('cflag:31:151', 0);
  able.show.show_button_equip(16, 31);
  const buttons = able.fixture.lines.filter((line) => line.type === 'button');
  assert.equal(buttons.length, 1);
  assert.equal(buttons[0].accelerator, 16);
  assert.equal(buttons[0].rendered, '[16] 装备情报 ');

  const unable = setup_show();
  unable.fixture.store.set('cflag:31:151', 1); // 五道全不满足
  unable.show.show_button_equip(16, 31);
  assert.equal(unable.fixture.lines.length, 0, '不可见时连按钮带文字都不输出');
});

test('equip_st_show：战锤+2 的状态行，=100 的防御/气力伤害两行不显示（:1030-1071）', () => {
  const { fixture, show } = setup_show();
  fixture.store.set('cflag:31:550', 47 + 2 * 1000); // 战锤 +2
  assert.equal(show.equip_st_show(31), 2, 'RETURN 2');
  assert.deepEqual(fixture.text_lines(), [
    '战锤+2',
    '*160的打击力', // 150 + 强度 2*5
    '*30％概率打偏',
  ]);
  const name_row = fixture.lines[0];
  assert.equal(name_row.content[0].color, 'LightSalmon');
});

test('equip_st_show：气力回复正负两臂与气力伤害（触手 49 / 法杖 41）', () => {
  const tentacle = setup_show();
  tentacle.fixture.store.set('cflag:31:550', 49); // 触手：气力回复 -10、气力伤害 120
  tentacle.show.equip_st_show(31);
  assert.deepEqual(tentacle.fixture.text_lines(), [
    '触手',
    '*100的打击力',
    '*消费10气力',
    '*打击气力120％',
  ]);

  const staff = setup_show();
  staff.fixture.store.set('cflag:31:550', 41); // 法杖：气力回复 20
  staff.show.equip_st_show(31);
  assert.deepEqual(staff.fixture.text_lines(), [
    '法杖',
    '*80的打击力',
    '*恢复20气力',
  ]);
});

test('equip_st_show：附魔前缀的四个特殊位行与前缀名（毒/火/寒冰/电）', () => {
  const table = [
    [2, '剧毒', '*带有毒液'],
    [5, '烈火', '*带火'],
    [6, '寒冰', '*带寒冰'],
    [7, '雷霆', '*带电'],
  ];
  for (const [prefix, name, line] of table) {
    const { fixture, show } = setup_show();
    fixture.store.set('cflag:31:550', prefix * 100000 + 40);
    show.equip_st_show(31);
    assert.ok(fixture.text_lines().includes(line), `${name} → ${line}`);
    assert.equal(
      fixture.text_lines()[0],
      `${name}剑`,
      `${name}前缀名拼进名称行`,
    );
  }
});

test('equip_st_show：连击率（匕首 30）与防御伤害（鞭 120）各自行', () => {
  const dagger = setup_show();
  dagger.fixture.store.set('cflag:31:550', 43);
  dagger.show.equip_st_show(31);
  assert.deepEqual(dagger.fixture.text_lines(), [
    '匕首',
    '*70的打击力',
    '*30％概率二连击',
  ]);

  const whip = setup_show();
  whip.fixture.store.set('cflag:31:550', 42);
  whip.show.equip_st_show(31);
  assert.deepEqual(whip.fixture.text_lines(), [
    '鞭',
    '*80的打击力',
    '*打击防御120％',
  ]);
});

test('equip_st_show：空槽（-1）与未知识别号都经名称臂回落 40 号剑', () => {
  for (const stored of [-1, 999, 5]) {
    const { fixture, show } = setup_show();
    fixture.store.set('cflag:31:550', stored);
    show.equip_st_show(31);
    assert.deepEqual(
      fixture.text_lines(),
      ['剑', '*100的打击力'],
      `存储编号 ${stored} 回落 40 号剑`,
    );
  }
});

test('equip_st_show：名称表空名段（53-60）不重置，查表走 ELSE 黑戒指行 → 印 *带有诅咒', () => {
  // EQUIP_WEAPON_NAMES 的 53-60 是 ''（原作预留空名）而不是 undefined——
  // 名称臂的「回落 40 号剑」重置不触发；查表落 ELSE 臂（诅咒 1、伤害强化
  // 100），名称行是空串、随后印诅咒行（规范审查指出此处可达，#546）
  const { fixture, show } = setup_show();
  fixture.store.set('cflag:31:550', 53);
  assert.equal(show.equip_st_show(31), 2);
  assert.deepEqual(fixture.text_lines(), ['', '*带有诅咒', '*100的打击力']);
});

test('equip_st_show：按角色素质强化后再显示（初心者 291 的伤害-10/失手+10）', () => {
  const { fixture, show } = setup_show();
  fixture.store.set('cflag:31:550', 47); // 战锤 +0：伤害 150、失手 30
  fixture.store.set('talent:31:291', 1);
  show.equip_st_show(31);
  assert.deepEqual(fixture.text_lines(), [
    '战锤',
    '*140的打击力',
    '*40％概率打偏',
  ]);
});
