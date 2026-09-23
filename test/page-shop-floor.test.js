/**
 * @SHOW_FLOOR 的行为测试（#548 / S7：主菜单阶层按钮 [521]-[530] 的阶层信息）。
 *
 * 源: target/ERB/SHOP/SHOP ver1.0.2.ERB  @SHOW_FLOOR（:426-501）
 *     依赖: @ENEMY_EXIST2（ere/page/page-dungeon-info2.js，#180 真身）与
 *     @MONSTERNAME（ere/dungeon/monster-data.js，#176 真身）。
 *
 * 缝 = test/helpers/era-fixture.js：直调 usershop 的 520-530 分发（引擎输入
 * 通道只送已打印按钮，测试夹具按项目惯例直接调分发函数——page-shop.test.js
 * 同款说明）。
 *
 * 覆盖：
 *   - 楼层头与设施后缀的合行（原作 PRINTFORM 第N阶层 + SELECTCASE 后缀 +
 *     PRINTL 是一个显示行，ere 侧归并为一次 print）；
 *   - 设施四格（FLAG 299+ARG+{0,10,20,40}——REPEAT 内 COUNT==3→4 跳过 +30
 *     段）与「格上有道具才出行」的判据；
 *   - 近卫层（ARG = 10）的护卫名单（!CFLAG:1 && EX_TALENT:1）与素质名拼接；
 *   - 怪物库存十格（槽 = (ARG-1)*10+100，{N,2,LEFT} 的左对齐两位）；
 *   - LIMIT(ARG,1,10) 钳制；
 *   - 分发接线（523 → 第 3 阶层）与 PRINTW 的读键。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

/** usershop 直调用的夹具（BOUGHT = -1 的真实入口状态，page-shop.test.js 同款） */
function create_floor_fixture() {
  const fixture = create_era_fixture();
  fixture.load_module('era-utils/era-flag').bought = -1;
  return fixture;
}

function text_lines(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

/** 播一层：预置设施/道具/怪物后直调 usershop(input)。 */
async function show_floor_via_usershop(fixture, input) {
  const { usershop } = fixture.load_module('page/page-shop');
  await usershop(input);
}

test('第 1 阶层：楼层头 + 设施后缀合行、设施四格、怪物库存、末尾读键', async () => {
  const fixture = create_floor_fixture();
  // 设施：FLAG:(1+349) = 350 → 500 商店街
  fixture.store.set('flag:350', 500);
  // 设施四格：300 格放 60（落穴），310/320 空，340 放 62 但库存 0（不出行）
  fixture.store.set('flag:300', 60);
  fixture.store.set('flag:310', 61);
  fixture.store.set('item:61', 0); // 库存 0 → 310 格不显示
  fixture.store.set('flag:340', 62);
  fixture.store.set('item:62', 0);
  fixture.store.set('item:60', 1);
  fixture.store.set('itemname:60', '落穴');
  // 怪物库存：101 格 5 只
  fixture.store.set('item:101', 5);
  fixture.store.set('itemname:101', '史莱姆');

  await show_floor_via_usershop(fixture, 521);

  const texts = text_lines(fixture);
  // :433 + :452-467 + :469 的合行（PRINTFORM 链 + PRINTL 落行）
  assert(
    texts.includes('第1阶层  - 商店街　'),
    '楼层头与设施后缀合一行（含两个前导空格与全角尾随空格）',
  );
  // :478-486 设施四格（有格命中才出行 + 分隔线）
  assert(texts.includes('[落穴]'), '设施四格的 [道具名] 行');
  // :495 怪物库存：{5,2,LEFT} = "5 " + 只 + 名
  assert(texts.includes('5 只史莱姆'), '怪物行（数量左对齐两位）');
  // :500 PRINTW 的读键恰好一次
  assert.equal(
    fixture.inputs_consumed.filter((c) => c.api === 'waitAnyKey').length,
    1,
  );
});

test('设施未指定（FLAG:(ARG+349) = 0）：楼层头独行，无后缀', async () => {
  const fixture = create_floor_fixture();
  await show_floor_via_usershop(fixture, 523);

  const texts = text_lines(fixture);
  assert(texts.includes('第3阶层'), 'SELECTCASE 不命中 500-507 时只打楼层头');
  assert(
    !texts.some((line) => line.includes('- ')),
    '未指定设施不得输出「 - 」后缀',
  );
});

test('设施四格的 +30 段被跳过：COUNT == 3 → COUNT = 4（源 :474-475）', async () => {
  const fixture = create_floor_fixture();
  // 第 1 阶层读 300/310/320/340；330 属 +30 段，永不读。只点亮 330。
  fixture.store.set('flag:330', 60);
  fixture.store.set('item:60', 1);
  fixture.store.set('itemname:60', '落穴');

  await show_floor_via_usershop(fixture, 521);

  assert(
    !text_lines(fixture).includes('[落穴]'),
    '330 格不在四格之内（REPEAT 内 SIF COUNT == 3 → COUNT = 4）',
  );
});

test('设施四格全空：不出道具行也不出多余分隔线（IF LOCAL:1 为假）', async () => {
  const fixture = create_floor_fixture();
  fixture.store.set('flag:350', 505);

  await show_floor_via_usershop(fixture, 521);

  const texts = text_lines(fixture);
  assert(texts.includes('第1阶层  - 迷宫　　'));
  assert(
    !texts.some((line) => line.includes('[')),
    '无设施道具时不得输出 [道具] 行',
  );
});

test('近卫层（ARG = 10）：护卫名单一行一人 + 素质名拼接，怪物读 190 段', async () => {
  const fixture = create_floor_fixture();
  fixture.seed_chara(34, { id: 34, name: '葵希罗', callname: '葵希罗' });
  fixture.era.addCharacter(34);
  fixture.store.set('ex_talent:34:1', 1); // EX_TALENT:1（护卫配置）
  fixture.store.set('talent:34:200', 1);
  fixture.store.set('talent:34:205', 1);
  fixture.store.set('talentname:200', '魁梧');
  fixture.store.set('talentname:205', '怪力');
  // 190 段的怪物库存
  fixture.store.set('item:190', 2);
  fixture.store.set('itemname:190', '近卫');

  await show_floor_via_usershop(fixture, 530);

  const texts = text_lines(fixture);
  assert(texts.includes('近卫兵'), '近卫层头（PRINTFORM 近卫兵）');
  assert(
    texts.includes('[葵希罗] —— 魁梧怪力'),
    '护卫行：[名] —— + TALENT:200-211 的素质名依次拼接',
  );
  assert(
    !texts.some((line) => line.includes('迎击中') || line.includes('侵攻中')),
    '近卫层不走 ENEMY_EXIST2（GOTO MONSTERDATA 直接跳过）',
  );
  assert(texts.includes('2 只近卫'), '怪物库存读 190-199 段');
});

test('LIMIT 钳制：0 与 99 都按边界层显示（源 :429 ARG = LIMIT(ARG,1,10)）', async () => {
  const fixture = create_floor_fixture();
  const { show_floor } = fixture.load_module('page/page-shop');
  await show_floor(0);
  assert(
    text_lines(fixture).includes('第1阶层'),
    'ARG = 0 钳到 1（usershop 实际只送 1-10，直调验证钳制本身）',
  );

  const fixture2 = create_floor_fixture();
  const { show_floor: show_floor2 } = fixture2.load_module('page/page-shop');
  await show_floor2(99);
  assert(text_lines(fixture2).includes('近卫兵'), 'ARG = 99 钳到 10');
});

test('STUBBED_CALLS：SHOW_FLOOR 移出存根名单', () => {
  const fixture = create_floor_fixture();
  const { STUBBED_CALLS } = fixture.load_module('page/page-shop');
  assert.deepEqual(STUBBED_CALLS, ['批量处刑', 'LABO', 'DEBUG_MENU_U']);
});
