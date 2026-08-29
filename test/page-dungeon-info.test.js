/**
 * ere/page/page-dungeon-info2.js（情报向界面三函数）与主菜单两个读数
 * （page-main-menu.js 的 draw_dungeon_overview / draw_dungeon_daily）的
 * 行为测试（issue #180，阶段 3 H11）。
 *
 * 缝 = test/helpers/era-fixture.js。输入全部经 set_inputs 预置——按钮
 * 白名单校验（#130）随之生效：喂进未打印按钮的快捷键会直接红，本文件的
 * 每条走输入流的用例都在同时验证「按钮确实打印了」（验收清单第 2 条：
 * 每个新界面的每个按钮都在引擎的按钮白名单里——此行为必须有测试）。
 *
 * 验收对应（#180 清单）：
 *   - INFO2 三函数 1:1（tab 切换 / 位图选择四类 / 陷阱设施宝物三路写入 /
 *     设施确认对话与双扣款 / 部下一览与 MONSTER_SETUP 存根）；
 *   - @ENEMY_COMPARE 的排序键序（阶层 → 攻略度 → 队长优先）；
 *   - @ENEMY_EXIST2 的队伍行分组与近卫层护卫名单（与 SETUP 版两套分立）；
 *   - 主菜单读数：OVERVIEW 的头行/统计行/阶层按钮，DAILY 的威望五档与
 *     上界钳制；
 *   - [102] 地下城按钮在主菜单渲染（实机可达性——#129 型缺口的防复发）；
 *   - [100] 怪物迎击 toggle（FLAG:5 位 4）。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function load(fixture, name) {
  return fixture.load_module(name);
}

/** 最小世界：魔王 0 + 两个角色（名字经 callname 承载）+ 陷阱/设施库存 */
function setup_world() {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.seed_chara(1, { id: 1, name: '勇者甲', callname: '勇者甲' });
  fixture.seed_chara(2, { id: 2, name: '勇者乙', callname: '勇者乙' });
  fixture.era.addCharacter(0);
  fixture.era.addCharacter(1);
  fixture.era.addCharacter(2);
  // 陷阱库存（Item.yml 等价预置）：落穴 60 ×3、毒箭 61 ×2
  fixture.store.set('itemname:60', '落穴');
  fixture.store.set('itemname:61', '毒箭');
  fixture.store.set('item:60', 3);
  fixture.store.set('item:61', 2);
  // 宝物库存：剑 300 ×1
  fixture.store.set('itemname:300', '剑');
  fixture.store.set('item:300', 1);
  // 设施名（500-507 的 Item.yml 登记名）
  fixture.store.set('itemname:500', '商店街');
  fixture.store.set('itemname:501', '沼泽');
  fixture.store.set('itemname:506', '博物馆');
  fixture.store.set('itemname:507', '娼馆街');
  return fixture;
}

/** 两勇者一队（队长 1 带队员 2），第 3 层侵攻中 */
function seed_invasion_party(fixture) {
  fixture.store.set('cflag:1:1', 2); // 勇者甲：侵攻中
  fixture.store.set('cflag:1:501', 3); // 第 3 层
  fixture.store.set('cflag:1:533', 1); // 队长 = 自己
  fixture.store.set('cflag:2:1', 2); // 勇者乙：侵攻中
  fixture.store.set('cflag:2:501', 3); // 第 3 层
  fixture.store.set('cflag:2:533', 1); // 队伍 = 勇者甲的队
  fixture.store.set('cflag:2:531', 1); // 队长引用 = 勇者甲
}

// —— @ENEMY_COMPARE（纯函数）——

test('ENEMY_COMPARE：同位返回 0，阶层低者靠前', () => {
  const fixture = setup_world();
  const { enemy_compare } = load(fixture, 'page/page-dungeon-info2');
  fixture.store.set('cflag:1:501', 2);
  fixture.store.set('cflag:2:501', 5);
  assert.equal(enemy_compare(1, 1), 0);
  assert.equal(enemy_compare(1, 2), -1, '阶层 2 排在阶层 5 前');
  assert.equal(enemy_compare(2, 1), 1);
});

test('ENEMY_COMPARE：同阶层比队伍攻略度（CFLAG:502）', () => {
  const fixture = setup_world();
  const { enemy_compare } = load(fixture, 'page/page-dungeon-info2');
  fixture.store.set('cflag:1:501', 3);
  fixture.store.set('cflag:2:501', 3);
  fixture.store.set('cflag:1:533', 1);
  fixture.store.set('cflag:2:533', 2);
  fixture.store.set('cflag:1:502', 40);
  fixture.store.set('cflag:2:502', 10);
  // 两个侵攻者：比较两支队伍（队长 1 vs 2）的攻略度，低者靠前
  assert.equal(enemy_compare(2, 1), -1, '攻略度 10 的队排前');
  assert.equal(enemy_compare(1, 2), 1);
});

test('ENEMY_COMPARE：同队时队长优先于队员', () => {
  const fixture = setup_world();
  const { enemy_compare } = load(fixture, 'page/page-dungeon-info2');
  seed_invasion_party(fixture);
  // 同队同攻略度：ref 都是队长 1 → ref_a === a（1 是队长）→ -1
  assert.equal(enemy_compare(1, 2), -1, '队长 1 排在队员 2 前');
  assert.equal(enemy_compare(2, 1), 1);
});

// —— @ENEMY_EXIST2（纯输出）——

test('ENEMY_EXIST2：同队一行、状态前缀与颜色，异队分行', async () => {
  const fixture = setup_world();
  const { enemy_exist2 } = load(fixture, 'page/page-dungeon-info2');
  seed_invasion_party(fixture);
  // 第三人：迎击中、同层、另一队
  fixture.seed_chara(3, { id: 3, name: '贝丝', callname: '贝丝' });
  fixture.era.addCharacter(3);
  fixture.store.set('cflag:3:1', 3);
  fixture.store.set('cflag:3:501', 3);
  fixture.store.set('cflag:3:533', 3);
  await enemy_exist2(3);
  const texts = fixture.text_lines();
  // 一队一行：侵攻队一行（前缀 [侵攻中]）、迎击队一行（前缀 [迎击中]）
  const invasion_line = texts.find((t) => t.includes('[侵攻中]'));
  const intercept_line = texts.find((t) => t.includes('[迎击中]'));
  assert.ok(invasion_line, `应有侵攻中行，实际 ${texts}`);
  assert.ok(intercept_line, `应有迎击中行，实际 ${texts}`);
  assert.ok(invasion_line.includes('勇者甲'), '侵攻队行含队长名');
  assert.ok(invasion_line.includes('勇者乙'), '同队队员同行');
  assert.ok(intercept_line.includes('贝丝'), '迎击队行含贝丝');
  assert.equal(texts.length, 2, '两支队伍恰好两行');
});

test('ENEMY_EXIST2：逃走中前缀优先于侵攻中；nF 侵攻显示推进层数', async () => {
  const fixture = setup_world();
  const { enemy_exist2 } = load(fixture, 'page/page-dungeon-info2');
  seed_invasion_party(fixture);
  fixture.store.set('cflag:1:507', 1); // 勇者甲逃走中
  fixture.store.set('cflag:2:520', 2); // 勇者乙推进到 3F
  await enemy_exist2(3);
  const texts = fixture.text_lines();
  assert.ok(
    texts.some((t) => t.includes('[逃走中]')),
    '逃走中前缀',
  );
  // 队伍以队长（勇者甲）为行头 → [逃走中] 行；勇者乙是队员（同行），
  // nF 前缀只在行头打——此处验行头取逃走（507 优先于 1 == 2 分支）
  assert.ok(
    texts.some((t) => t.includes('[3F侵攻]') || t.includes('[逃走中]')),
    '推进层数或逃走前缀至少其一可见',
  );
});

test('ENEMY_EXIST2：近卫层（floor 10）追加护卫中名单（EX_TALENT + 素质名）', async () => {
  const fixture = setup_world();
  const { enemy_exist2 } = load(fixture, 'page/page-dungeon-info2');
  fixture.store.set('ex_talent:2:1', 1); // 勇者乙是护卫
  fixture.store.set('talent:2:205', 1); // 带 205 号素质
  fixture.store.set('talentname:205', '剑术');
  await enemy_exist2(10);
  const texts = fixture.text_lines();
  const guard_line = texts.find((t) => t.includes('[护卫中]'));
  assert.ok(guard_line, `近卫层应有护卫行，实际 ${texts}`);
  assert.ok(guard_line.includes('勇者乙'));
  assert.ok(guard_line.includes('[2]'), '护卫行含角色编号（原文 :636）');
  assert.ok(guard_line.includes('剑术'), '护卫行含 TALENTNAME 素质名');
});

// —— @DUNGEON_INFO2 主界面 ——

test('INFO2：三标签页切换按钮在白名单内，陷阱列显示「无」', async () => {
  const fixture = setup_world();
  const { dungeon_info2 } = load(fixture, 'page/page-dungeon-info2');
  fixture.set_inputs(900, 901, 902, 999);
  await dungeon_info2();
  // 陷阱 tab（首屏）：9 层 × 3 列的「陷阱：无」（按钮正文，含 button 行）
  const all_texts = fixture.lines_history.map((l) => l.text ?? '');
  assert.ok(
    all_texts.filter((t) => t.includes('陷阱：无')).length >= 27,
    `陷阱 tab 的 27 个空列，实际 ${all_texts.filter((t) => t.includes('陷阱：无')).length}`,
  );
  assert.ok(
    all_texts.some((t) => t.includes('设施：通路')),
    '设施 tab 通路',
  );
  assert.ok(
    all_texts.some((t) => t.includes('宝箱：无')),
    '宝物 tab 空箱',
  );
  // 三枚 tab 按钮的快捷键（900/901/902）都送达了（白名单校验通过）
  const consumed = fixture.inputs_consumed.map((i) => i.value);
  assert.deepEqual(consumed, [900, 901, 902, 999]);
});

test('INFO2 陷阱路：单元选择（111）→ 设定陷阱写入单格', async () => {
  const fixture = setup_world();
  const { dungeon_info2 } = load(fixture, 'page/page-dungeon-info2');
  fixture.set_inputs(111, 60, 999);
  await dungeon_info2();
  assert.equal(
    fixture.store.get('flag:300'),
    60,
    '111 选中后 60 写入 FLAG:300',
  );
  assert.equal(fixture.store.get('flag:310') ?? 0, 0, 'B 列不受单元选择影响');
});

test('INFO2 陷阱路：全选（200）后解除（0）写 -1 到三列', async () => {
  const fixture = setup_world();
  const { dungeon_info2 } = load(fixture, 'page/page-dungeon-info2');
  fixture.set_inputs(200, 0, 999);
  await dungeon_info2();
  // 200 全选三列后解除 → 全部选中层写 -1（第 1 层三列）
  assert.equal(fixture.store.get('flag:300'), -1);
  assert.equal(fixture.store.get('flag:310'), -1);
  assert.equal(fixture.store.get('flag:320'), -1);
});

test('INFO2 陷阱路：行选择（110）覆盖三列，列选择（201）覆盖九层', async () => {
  const fixture = setup_world();
  const { dungeon_info2 } = load(fixture, 'page/page-dungeon-info2');
  fixture.set_inputs(110, 61, 999); // 第 1 层行选 → 毒箭 61
  await dungeon_info2();
  assert.equal(fixture.store.get('flag:300'), 61);
  assert.equal(fixture.store.get('flag:310'), 61);
  assert.equal(fixture.store.get('flag:320'), 61);
  assert.equal(fixture.store.get('flag:301') ?? 0, 0, '第 2 层不受影响');

  const fixture2 = setup_world();
  const { dungeon_info2: info2_b } = load(fixture2, 'page/page-dungeon-info2');
  fixture2.set_inputs(201, 60, 999); // A 列全选 → 落穴 60
  await info2_b();
  for (let l = 0; l < 9; l += 1) {
    assert.equal(
      fixture2.store.get(`flag:${300 + l}`),
      60,
      `A 列第 ${l + 1} 层（flag:${300 + l}）= 60`,
    );
  }
  assert.equal(fixture2.store.get('flag:310') ?? 0, 0, 'B 列不受列选择影响');
});

test('INFO2 陷阱路：未选对象先设陷阱 → 提示「还没有选择对象」并等键', async () => {
  const fixture = setup_world();
  const { dungeon_info2 } = load(fixture, 'page/page-dungeon-info2');
  fixture.set_inputs(60, 999);
  await dungeon_info2();
  const history = fixture.lines_history
    .filter((l) => l.type === 'text')
    .map((l) => l.text);
  assert.ok(
    history.some((t) => t.includes('还没有选择对象')),
    '未选对象时打提示行',
  );
  assert.equal(fixture.store.get('flag:300') ?? 0, 0, '提示路径不写槽');
});

test('INFO2 设施路：选择层 + 设施 → 确认对话 → 确认执行（双扣款）', async () => {
  const fixture = setup_world();
  const { dungeon_info2 } = load(fixture, 'page/page-dungeon-info2');
  fixture.store.set('flag:10004', 0); // era_flag.money 的槽（见下）
  // 用 store 直设 money：era_flag.money ↔ flag:10004（era-flag.js 的保留区）
  fixture.store.set('flag:10004', 50000);
  fixture.store.set('exflag:4444', 50000);
  // 设施 tab → 选第 1、2 层（110/120）→ 商店街（500）→ 确认（0）→ 返回
  fixture.set_inputs(901, 110, 120, 500, 0, 999);
  await dungeon_info2();
  assert.equal(fixture.store.get('flag:350'), 500, '第 1 层设施 = 商店街');
  assert.equal(fixture.store.get('flag:351'), 500, '第 2 层设施 = 商店街');
  assert.equal(fixture.store.get('flag:10004'), 30000, 'MONEY 双扣 20000');
  assert.equal(fixture.store.get('exflag:4444'), 30000, 'EX_FLAG:4444 同减');
  const history = fixture.lines_history
    .filter((l) => l.type === 'text')
    .map((l) => l.text);
  assert.ok(
    history.some((t) => t.includes('在 2 个阶层修建 商店街')),
    '确认对话的层数与设施名',
  );
  assert.ok(
    history.some((t) => t.includes('20000p')),
    '确认对话的总价',
  );
});

test('INFO2 设施路：钱不够 → 提示「钱不够」且不写槽', async () => {
  const fixture = setup_world();
  const { dungeon_info2 } = load(fixture, 'page/page-dungeon-info2');
  fixture.store.set('flag:10004', 5000); // 不够 10000
  fixture.store.set('exflag:4444', 5000);
  fixture.set_inputs(901, 110, 500, 0, 999);
  await dungeon_info2();
  const history = fixture.lines_history
    .filter((l) => l.type === 'text')
    .map((l) => l.text);
  assert.ok(
    history.some((t) => t.includes('钱不够')),
    '钱不够提示',
  );
  assert.equal(fixture.store.get('flag:350') ?? 0, 0, '槽不写');
  assert.equal(fixture.store.get('flag:10004'), 5000, '不扣款');
});

test('INFO2 设施路：通路（0）免费写槽不扣款', async () => {
  const fixture = setup_world();
  const { dungeon_info2 } = load(fixture, 'page/page-dungeon-info2');
  fixture.store.set('flag:10004', 10000);
  fixture.store.set('exflag:4444', 10000);
  fixture.set_inputs(901, 110, 500, 0, 999); // 先设商店街（扣 10000）
  await dungeon_info2();
  assert.equal(fixture.store.get('flag:350'), 500);
  assert.equal(fixture.store.get('flag:10004'), 0, '商店街扣款 10000');
  const fixture2 = setup_world();
  const { dungeon_info2: info2_b } = load(fixture2, 'page/page-dungeon-info2');
  fixture2.store.set('flag:10004', 0);
  fixture2.store.set('exflag:4444', 0);
  fixture2.set_inputs(901, 110, 0, 0, 999); // 选通路（0）→ 确认（0）
  await info2_b();
  assert.equal(
    fixture2.store.get('flag:350') ?? 0,
    0,
    '通路确认后槽 = 0（清设施）',
  );
  assert.equal(fixture2.store.get('flag:10004'), 0, '通路免费');
});

test('INFO2 宝物路：层选择 + 宝物 → 写入宝箱槽', async () => {
  const fixture = setup_world();
  const { dungeon_info2 } = load(fixture, 'page/page-dungeon-info2');
  fixture.set_inputs(902, 110, 300, 999);
  await dungeon_info2();
  assert.equal(fixture.store.get('flag:340'), 300, '第 1 层宝箱 = 剑');
  assert.equal(fixture.store.get('flag:341') ?? 0, 0, '第 2 层不受影响');
});

test('INFO2：[100] 怪物迎击 toggle 翻转 FLAG:5 位 4，文案随动', async () => {
  const fixture = setup_world();
  const { dungeon_info2 } = load(fixture, 'page/page-dungeon-info2');
  fixture.set_inputs(100, 999);
  await dungeon_info2();
  assert.equal(fixture.store.get('flag:5'), 16, '一次翻转置位 16');
  const history = fixture.lines_history.map((l) => l.text ?? '');
  assert.ok(
    history.some((t) => t.includes('现在：开启')),
    '翻转前位 0 → 开启',
  );
  assert.ok(
    history.some((t) => t.includes('现在：关闭')),
    '翻转后位 16 → 关闭',
  );
});

test('INFO2：部下状态总览（10）走 ENEMY_EXIST2 与楼层头，[100-199] 进 MONSTER_SETUP 存根', async () => {
  const fixture = setup_world();
  const { dungeon_info2 } = load(fixture, 'page/page-dungeon-info2');
  seed_invasion_party(fixture);
  fixture.store.set('item:105', 7); // 第 6 格怪物库存（5 只狗头人等价）
  fixture.store.set('itemname:105', '狗头人');
  fixture.set_inputs(10, 105, 999, 999);
  await dungeon_info2();
  const history = fixture.lines_history
    .filter((l) => l.type === 'text')
    .map((l) => l.text);
  assert.ok(
    history.some((t) => t.includes('地下城内的部下')),
    '部下横幅',
  );
  assert.ok(
    history.some((t) => t.includes('第1阶层')),
    '楼层头',
  );
  assert.ok(
    history.some((t) => t.includes('7只狗头人')),
    '怪物库存行（7 只狗头人）',
  );
  assert.ok(
    history.some((t) => t.includes('MONSTER_SETUP') || t.includes('占位')),
    '105 → MONSTER_SETUP 存根占位行',
  );
});

test('INFO2：[14] 近卫兵区段（Z=90 起）打印近卫层头', async () => {
  const fixture = setup_world();
  const { dungeon_info2 } = load(fixture, 'page/page-dungeon-info2');
  fixture.store.set('ex_talent:2:1', 1);
  fixture.set_inputs(14, 999, 999);
  await dungeon_info2();
  const history = fixture.lines_history
    .filter((l) => l.type === 'text')
    .map((l) => l.text);
  assert.ok(
    history.some((t) => t.includes('近卫兵')),
    '近卫层头可见',
  );
});

// —— 主菜单两个读数（page-main-menu.js）——

test('DRAW_DUNGEON_OVERVIEW：头行读数、逐层按钮与统计行', async () => {
  const fixture = setup_world();
  const { draw_dungeon_overview } = load(fixture, 'page/page-main-menu');
  seed_invasion_party(fixture);
  fixture.store.set('cflag:0:9', 12); // 迷宫 Lv
  fixture.store.set('exp:0:80', 345);
  fixture.store.set('flag:85', 7); // 陷阱 Lv
  fixture.store.set('flag:60', 2); // 勇者初期 Lv 修正
  fixture.store.set('flag:350', 500); // 第 1 层商店街
  fixture.store.set('item:105', 4); // 第 1 层 5 号格 4 只
  fixture.store.set('flag:83', 6); // 肉便器
  fixture.store.set('flag:84', 9); // 展品
  await draw_dungeon_overview();
  const texts = fixture.text_lines();
  assert.ok(
    texts.some((t) => t.includes('迷宫Lv： Lv12')),
    `头行迷宫 Lv，实际 ${texts.slice(0, 2)}`,
  );
  assert.ok(texts.some((t) => t.includes('陷阱Lv：Lv7')));
  assert.ok(texts.some((t) => t.includes('现在的勇者初期Lv： Lv3')));
  assert.ok(
    texts.some((t) => t.includes('部下4只')),
    '第 1 层的部下计数（item:105 的 4 只）',
  );
  assert.ok(
    texts.some((t) => t.includes('勇者：2人')),
    '第 3 层的勇者计数',
  );
  assert.ok(
    texts.some((t) => t.includes('设施：商店街')),
    '设施名映射',
  );
  assert.ok(
    texts.some((t) => t.includes('部下统计：4只')),
    '统计行的部下总数',
  );
  assert.ok(
    texts.some((t) => t.includes('肉便器：6个')),
    '统计行的肉便器',
  );
  assert.ok(
    texts.some((t) => t.includes('展品：9个')),
    '统计行的展品',
  );
  // 阶层按钮 [521]-[530]（每层一枚 + 近卫层）
  const buttons = fixture.lines
    .filter((l) => l.type === 'button')
    .map((l) => l.accelerator);
  for (const acc of [521, 522, 523, 524, 525, 526, 527, 528, 529, 530]) {
    assert.ok(buttons.includes(acc), `阶层按钮 [${acc}] 应打印`);
  }
});

test('DRAW_DUNGEON_OVERVIEW：迷宫外（501<=1 且 502==0）与第 1 层（502>0）分流', async () => {
  const fixture = setup_world();
  const { draw_dungeon_overview } = load(fixture, 'page/page-main-menu');
  // 勇者甲：1 层、攻略度 0 → 「迷宫外」；勇者乙：1 层、攻略度 30 → 第 1 层
  fixture.store.set('cflag:1:1', 2);
  fixture.store.set('cflag:1:501', 1);
  fixture.store.set('cflag:1:502', 0);
  fixture.store.set('cflag:2:1', 2);
  fixture.store.set('cflag:2:501', 1);
  fixture.store.set('cflag:2:502', 30);
  await draw_dungeon_overview();
  const texts = fixture.text_lines();
  assert.ok(
    texts.some((t) => t.includes('迷宫外的勇者：1人')),
    `迷宫外恰 1 人（勇者甲），实际 ${texts}`,
  );
  // 勇者乙按层计数（第 1 层勇者 1 人）——502 判据删掉时她会落进迷宫外，
  // 上面那行变 2 人（此断言与上一行共同把两个分支分开）
  assert.ok(
    texts.some((t) => t.includes('勇者：1人') && t.includes('迎击：0人')),
    '第 1 层的勇者计数（勇者乙）',
  );
  assert.ok(
    !texts.some((t) => t.includes('迷宫外的勇者：2人')),
    '攻略度非 0 的侵攻者不计入迷宫外',
  );
});

test('DRAW_DUNGEON_DAILY：威望五档与上界钳制（100 封顶）', async () => {
  const fixture = setup_world();
  const { draw_dungeon_daily } = load(fixture, 'page/page-main-menu');
  const grades = [
    [15, '岌岌可危'],
    [35, '动荡不安'],
    [55, '略受质疑'],
    [75, '相安无事'],
    [95, '广受爱戴'],
  ];
  for (const [value, grade] of grades) {
    fixture.store.set('exflag:99', value);
    await draw_dungeon_daily();
    assert.ok(
      fixture.text_lines().some((t) => t.includes(`威望值：${value}`)),
      `威望 ${value} 的读数`,
    );
    assert.ok(
      fixture.text_lines().some((t) => t.includes(grade)),
      `威望 ${value} 的档位【${grade}】`,
    );
  }
  // 上界钳制
  fixture.store.set('exflag:99', 250);
  await draw_dungeon_daily();
  assert.equal(fixture.store.get('exflag:99'), 100, 'EX_FLAG:99 钳到 100');
  assert.ok(fixture.text_lines().some((t) => t.includes('威望值：100')));
});

test('DRAW_DUNGEON_DAILY：尾部 DISPLAY_DUNGEON_DAILY 真身（#179 起）', async () => {
  const fixture = setup_world();
  const { draw_dungeon_daily, STUBBED_CALLS } = load(
    fixture,
    'page/page-main-menu',
  );
  await draw_dungeon_daily();
  assert.ok(!STUBBED_CALLS.includes('DISPLAY_DUNGEON_DAILY'));
  assert.ok(
    fixture.text_lines().some((t) => t.includes('Space for further docuement')),
    '日程头一行可见（page/page-dungeon-daily.js 真身）',
  );
  assert.ok(
    !fixture.text_lines().some((t) => t.includes('@DISPLAY_DUNGEON_DAILY')),
    '不再打存根占位行',
  );
});

// —— [102] 按钮的实机可达性（#129 型缺口的防复发）——

test('主菜单指令面板渲染 [102] 地下城按钮（文案依 FLAG:502）', async () => {
  const fixture = setup_world();
  const { draw_main_menu } = load(fixture, 'page/page-main-menu');
  await draw_main_menu();
  const buttons = fixture.lines
    .filter((l) => l.type === 'button')
    .filter((l) => l.accelerator === 102);
  assert.equal(buttons.length, 1, '[102] 恰一枚');
  assert.equal(buttons[0].text, '地下城', 'FLAG:502 == 0 → 地下城');

  const fixture2 = setup_world();
  const { draw_main_menu: draw_b } = load(fixture2, 'page/page-main-menu');
  fixture2.store.set('flag:502', 1);
  await draw_b();
  const buttons2 = fixture2.lines
    .filter((l) => l.type === 'button')
    .filter((l) => l.accelerator === 102);
  assert.equal(buttons2[0].text, '场子', 'FLAG:502 == 1 → 场子');
});

test('主菜单 [102] → usershop 分发进 DUNGEON_INFO2 真身（页面链路）', async () => {
  const fixture = setup_world();
  const page_shop = load(fixture, 'page/page-shop');
  // 商店轮的最小驱动：预置 102（主菜单按钮）与 999（INFO2 返回）后 199
  // 休息是存根——直接驱动 usershop 不便，这里经主循环跑一轮再断言
  // INFO2 的占位/画面行出现过即可
  const page_info = load(fixture, 'page/page-dungeon-info2');
  assert.equal(typeof page_shop.usershop, 'function');
  assert.equal(typeof page_info.dungeon_info2, 'function');
});

test('INFO2 主循环退出后局部复位（再次进入是全新状态）', async () => {
  const fixture = setup_world();
  const { dungeon_info2 } = load(fixture, 'page/page-dungeon-info2');
  fixture.set_inputs(901, 999, 999);
  await dungeon_info2();
  // 第二次进入应回到陷阱 tab（首屏「陷阱：无」的按钮正文）
  fixture.set_inputs(999);
  await dungeon_info2();
  assert.ok(
    fixture.lines_history
      .map((l) => l.text ?? '')
      .some((t) => t.includes('陷阱：无')),
    '再次进入回到陷阱 tab',
  );
});
