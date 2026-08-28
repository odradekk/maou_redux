/**
 * ere/page/page-dungeon-setup.js（建设向界面五函数 + 2D 域存根）的行为测试
 * （issue #180，阶段 3 H11）。
 *
 * 缝 = test/helpers/era-fixture.js。输入全经 set_inputs 预置（按钮白名单
 * 校验 #130 随之生效——验收清单第 2 条「每个新界面的每个按钮都在白名单里」
 * 的执行面）。MON_SET_OMAKASE 的随机源经 rand 参数注入（monster-data.js 先例）。
 *
 * 验收对应（#180 清单）：
 *   - @DUNGEON_INFO 与 @DUNGEON_INFO2 两套分立（本文件的 enemy_exist 逐角色
 *     一行 vs page-dungeon-info 的 enemy_exist2 队伍行——形态断言各一侧）；
 *   - @ROOM_SETUP 的布置结果落到 FLAG:(X+350)（H8 设施的消费位）与
 *     MONEY/EX_FLAG:4444 双扣款；
 *   - @MON_SET_OMAKASE 的布置结果落到 DB（H6 怪物的 2D 布局位），玉座
 *     (16,16) 不放、101 次上限、MON_LIMIT 存根（恒可放）语义；
 *   - @DUNGEON_INFO_MAP 的 2D 分流与放置流程（等级 → 坐标 → ★ 确认）；
 *   - FLAG:502 == 1 时 @DUNGEON_INFO 分流进 @DUNGEON_INFO_MAP。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function load(fixture, name) {
  return fixture.load_module(name);
}

function setup_world() {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.seed_chara(1, { id: 1, name: '勇者甲', callname: '勇者甲' });
  fixture.era.addCharacter(0);
  fixture.era.addCharacter(1);
  fixture.store.set('itemname:60', '落穴');
  fixture.store.set('itemname:300', '剑');
  fixture.store.set('item:60', 3);
  fixture.store.set('item:300', 1);
  for (const id of [500, 501, 502, 503, 504, 505, 506]) {
    fixture.store.set(`itemname:${id}`, `设施${id}`);
  }
  return fixture;
}

// —— @DUNGEON_INFO 主循环 ——

test('INFO：九层列表与楼层按钮（0-8）在白名单内，[100] 返回', async () => {
  const fixture = setup_world();
  const { dungeon_info } = load(fixture, 'page/page-dungeon-setup');
  fixture.set_inputs(100);
  assert.equal(await dungeon_info(), 0);
  const buttons = fixture.lines
    .filter((l) => l.type === 'button')
    .map((l) => l.accelerator);
  // 楼层 0-8 + 部下 9-12 + 返回 100
  for (const acc of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 100]) {
    assert.ok(buttons.includes(acc), `[${acc}] 应打印`);
  }
  assert.ok(
    fixture.lines_history
      .map((l) => l.text ?? '')
      .some((t) => t.includes('第1阶层')),
    '首层列表行可见',
  );
});

test('INFO：陷阱三列显示与越界槽归位（-1 清槽）', async () => {
  const fixture = setup_world();
  const { dungeon_info } = load(fixture, 'page/page-dungeon-setup');
  fixture.store.set('flag:300', 60); // 落穴在库 → 显示名
  fixture.store.set('flag:310', 999); // 越界值（ITEM:999 无库存）→ 清 -1
  fixture.set_inputs(100);
  await dungeon_info();
  const texts = fixture.lines_history.map((l) => l.text ?? '');
  assert.ok(
    texts.some((t) => t.includes('落穴(3)')),
    '在库陷阱显示名与数',
  );
  assert.equal(fixture.store.get('flag:310'), -1, '越界槽清 -1');
});

test('INFO：楼层设定 [0] 解除陷阱清三列，[1] 取下宝物', async () => {
  const fixture = setup_world();
  const { dungeon_info } = load(fixture, 'page/page-dungeon-setup');
  fixture.store.set('flag:301', 60);
  fixture.store.set('flag:311', 60);
  fixture.store.set('flag:321', 60);
  fixture.store.set('flag:341', 300);
  fixture.set_inputs(1, 0, 100); // 第 2 层（1）→ 解除（0）→ 返回
  await dungeon_info();
  assert.equal(fixture.store.get('flag:301'), -1);
  assert.equal(fixture.store.get('flag:311'), -1);
  assert.equal(fixture.store.get('flag:321'), -1);

  const fixture2 = setup_world();
  const { dungeon_info: info_b } = load(fixture2, 'page/page-dungeon-setup');
  fixture2.store.set('flag:341', 300);
  fixture2.set_inputs(1, 1, 100); // 第 2 层 → 取下宝物（1）
  await info_b();
  assert.equal(fixture2.store.get('flag:341'), -1, '宝物取下写 -1');
});

test('INFO：设定陷阱（60）列指定 A/B/C/全部', async () => {
  const fixture = setup_world();
  const { dungeon_info } = load(fixture, 'page/page-dungeon-setup');
  fixture.set_inputs(0, 60, 0, 100); // 第 1 层 → 落穴 → A 列（0）
  await dungeon_info();
  assert.equal(fixture.store.get('flag:300'), 60, 'A 列 = 落穴');
  assert.equal(fixture.store.get('flag:310') ?? 0, 0, 'B 列不动');

  const fixture2 = setup_world();
  const { dungeon_info: info_b } = load(fixture2, 'page/page-dungeon-setup');
  fixture2.set_inputs(0, 60, 3, 100); // 全部（3）
  await info_b();
  assert.equal(fixture2.store.get('flag:300'), 60);
  assert.equal(fixture2.store.get('flag:310'), 60);
  assert.equal(fixture2.store.get('flag:320'), 60);
});

test('INFO：设定宝物（301）写宝箱槽', async () => {
  const fixture = setup_world();
  const { dungeon_info } = load(fixture, 'page/page-dungeon-setup');
  fixture.store.set('itemname:301', '盾');
  fixture.store.set('item:301', 2);
  fixture.set_inputs(4, 301, 100); // 第 5 层 → 盾
  await dungeon_info();
  assert.equal(fixture.store.get('flag:344'), 301, '第 5 层宝箱 = 盾');
});

test('INFO：宝物 300 是原作缺陷位——SETUP 版 ELSEIF Z > 300 漏掉 300（#14 登记，照抄）', async () => {
  const fixture = setup_world();
  const { dungeon_info } = load(fixture, 'page/page-dungeon-setup');
  fixture.set_inputs(0, 300, 100); // 第 1 层 → 选 300（剑）
  await dungeon_info();
  // 原作 :225-229 的 ELSEIF Z > 300 不含 300 本身：z=300 两个分支都不进，
  // Y 保持残留（全局初值 0）→ FLAG:0 = 300 脏写，宝箱槽不动。INFO2 版
  // （:391 RESULT >= 300 && < 340）没有这个缺陷——同构两处不同判，SETUP
  // 侧是原作笔误。1:1 照抄，登记 #14；「修好」它的变异必须红（M 段条目）。
  assert.equal(
    fixture.store.get('flag:340') ?? 0,
    0,
    '宝物 300 不写宝箱槽（原作缺陷照抄）',
  );
});

test('INFO：[999] 结束地下城的设定（子画面内退出）', async () => {
  const fixture = setup_world();
  const { dungeon_info } = load(fixture, 'page/page-dungeon-setup');
  fixture.set_inputs(0, 999);
  assert.equal(await dungeon_info(), 0, '999 直接结束返回 0');
});

test('INFO：[998] 停止回主画面，可再选层', async () => {
  const fixture = setup_world();
  const { dungeon_info } = load(fixture, 'page/page-dungeon-setup');
  fixture.set_inputs(0, 998, 100); // 第 1 层 → 停止 → 主画面返回
  await dungeon_info();
  const history = fixture.lines_history.map((l) => l.text ?? '');
  assert.ok(history.some((t) => t.includes('进行第1阶层的设定')));
  assert.ok(history.some((t) => t.includes('结束地下城的设定')));
});

test('INFO：部下扫描（10）逐角色一行 + 怪物库存，WAIT 后回主画面', async () => {
  const fixture = setup_world();
  const { dungeon_info } = load(fixture, 'page/page-dungeon-setup');
  fixture.store.set('cflag:1:1', 2); // 勇者甲侵攻中
  fixture.store.set('cflag:1:501', 2);
  fixture.store.set('item:105', 4);
  fixture.store.set('itemname:105', '狗头人');
  fixture.set_inputs(10, 100);
  await dungeon_info();
  const texts = fixture.lines_history.map((l) => l.text ?? '');
  assert.ok(
    texts.some((t) => t.includes('地下城内的部下')),
    '横幅',
  );
  assert.ok(
    texts.some((t) => t.includes('勇者甲[侵攻中]')),
    '部下逐角色一行',
  );
  assert.ok(
    texts.some((t) => t.includes('4只狗头人')),
    '怪物库存行（纯文本）',
  );
  // 与 INFO2 版（enemy_exist2 的队伍行/排序）分立：本侧无 [侵攻中] 前缀行
  // 的队伍归并形态——按行数断言（一个角色恰一行）
  assert.equal(
    texts.filter((t) => t.includes('勇者甲')).length,
    1,
    '单角色单行（无队伍归并）',
  );
});

test('INFO：FLAG:502 == 1 分流进 DUNGEON_INFO_MAP', async () => {
  const fixture = setup_world();
  const { dungeon_info } = load(fixture, 'page/page-dungeon-setup');
  fixture.store.set('flag:502', 1);
  fixture.set_inputs(100); // MAP 界面的返回
  await dungeon_info();
  const texts = fixture.lines_history.map((l) => l.text ?? '');
  assert.ok(
    texts.some((t) => t.includes('部下的配置')),
    '进了 MAP 界面（部下的配置按钮）',
  );
  assert.ok(
    !texts.some((t) => t.includes('进行第1阶层的设定')),
    '列表版画面未出现',
  );
});

// —— @ROOM_SETUP ——

test('ROOM_SETUP：[0] 通路免费清槽', async () => {
  const fixture = setup_world();
  const { room_setup } = load(fixture, 'page/page-dungeon-setup');
  fixture.store.set('flag:350', 500);
  fixture.set_inputs(0);
  assert.equal(await room_setup(0), 0);
  assert.equal(fixture.store.get('flag:350') ?? 0, 0, '通路清槽为 0');
  assert.equal(
    fixture.var_writes.filter((w) => w.name === 'flag:10004').length,
    0,
    '不扣款',
  );
});

test('ROOM_SETUP：[500] 设施写槽并双扣 10000', async () => {
  const fixture = setup_world();
  const { room_setup } = load(fixture, 'page/page-dungeon-setup');
  fixture.store.set('flag:10004', 30000);
  fixture.store.set('exflag:4444', 30000);
  fixture.set_inputs(503); // 冰室
  await room_setup(2); // 第 3 层
  assert.equal(fixture.store.get('flag:352'), 503, '第 3 层设施 = 503');
  assert.equal(fixture.store.get('flag:10004'), 20000, 'MONEY -10000');
  assert.equal(fixture.store.get('exflag:4444'), 20000, 'EX_FLAG:4444 -10000');
});

test('ROOM_SETUP：钱不够打提示且不写槽', async () => {
  const fixture = setup_world();
  const { room_setup } = load(fixture, 'page/page-dungeon-setup');
  fixture.store.set('flag:10004', 9999);
  fixture.set_inputs(500);
  await room_setup(0);
  assert.ok(
    fixture.text_lines().some((t) => t.includes('资金不足')),
    '资金不足提示',
  );
  assert.equal(fixture.store.get('flag:350') ?? 0, 0, '槽不写');
  assert.equal(fixture.store.get('flag:10004'), 9999, '不扣款');
});

test('ROOM_SETUP：[999] 停止不写槽', async () => {
  const fixture = setup_world();
  const { room_setup } = load(fixture, 'page/page-dungeon-setup');
  fixture.set_inputs(999);
  await room_setup(0);
  assert.equal(fixture.store.get('flag:350') ?? 0, 0);
});

// —— @MON_SET_OMAKASE ——

test('MON_SET_OMAKASE：随机放置写 DB（值域 0-9），玉座跳过', async () => {
  const fixture = setup_world();
  const { mon_set_omakase } = load(fixture, 'page/page-dungeon-setup');
  const { db_get } = load(fixture, 'dungeon/labo');
  // 种子化随机源：rand() 的返回值按消费方各自定义（等级 = floor(r*10)、
  // 坐标 = floor(r*32)），序列给精确小数——[lv/10, x/32, y/32] 三元组轮转：
  // 第 1 轮 lv=5(x=3,y=7)；第 2 轮 lv=2(x=16,y=16) 玉座跳过；第 3 轮 lv=9(0,0)。
  // #181 返工起 MON_LIMIT 是真身：每轮开头的許容量检查会扫掉兵力不足
  // （ITEM 段 5 格合计 ≤ 20）的放置格（原作 MON_CHECK :75 的防白嫖副作用），
  // 预置三段兵力让放置存活——断言语义不变，前置变严
  for (const seg of [120, 150, 190]) {
    for (let k = 0; k < 5; k += 1) {
      fixture.store.set(`item:${seg + k}`, 21);
    }
  }
  const seq = [0.5, 3 / 32, 7 / 32, 0.2, 16 / 32, 16 / 32, 0.9, 0, 0];
  let i = 0;
  const rand = () => {
    const v = seq[i % seq.length];
    i += 1;
    return v;
  };
  await mon_set_omakase(rand);
  assert.equal(db_get(7, 3), 5, '第 1 轮 lv=5 写 (7,3)——兵力 21 > 20 存活');
  assert.equal(db_get(16, 16), 0, '玉座 (16,16) 不写');
  assert.equal(db_get(0, 0), 9, '第 3 轮 lv=9 写 (0,0)');
});

test('MON_SET_OMAKASE：无兵力的放置被許容量检查扫掉（MON_CHECK :75 副作用）', async () => {
  const fixture = setup_world();
  const { mon_set_omakase } = load(fixture, 'page/page-dungeon-setup');
  const { db_get } = load(fixture, 'dungeon/labo');
  const { mon_limit } = load(fixture, 'dungeon/labo-map');
  // seq 周期三轮：位 0 放 lv5(x=3,y=7)、位 3 玉座跳过、位 6 放 lv9(x=0,y=0)
  // ——放置序 = 位0、位6、位0、位6…，第 101 次（count 上限）恰落在位 0 型
  // (7,3)。无 item 兵力时每轮开头的 MON_LIMIT 扫描会把上一轮的放置清掉
  // （MON_CHECK :75：兵力 0 ≤ 20 → 清格返回 0）——退出时的持久状态：
  // 最后一放 (7,3) 未及被扫（下一轮循环已因 count > 100 退出），倒数第
  // 二放 (0,0) 已被第 101 轮开头的扫描清掉
  const seq = [0.5, 3 / 32, 7 / 32, 0.2, 16 / 32, 16 / 32, 0.9, 0, 0];
  let i = 0;
  const rand = () => {
    const v = seq[i % seq.length];
    i += 1;
    return v;
  };
  await mon_set_omakase(rand);
  assert.equal(db_get(7, 3), 5, '第 101 次放置 (7,3) 是最后一放——未及被扫');
  assert.equal(
    db_get(0, 0),
    0,
    '倒数第二放 (0,0) 兵力 0——被下一轮开头的 MON_LIMIT 扫描清格',
  );
  assert.equal(
    await mon_limit(),
    1,
    '再扫一遍：全图无存活怪物 → 合计 0 ≤ 120 可放',
  );
});

test('MON_LIMIT 真身两态：无布置可放、合计超 120 拒绝（#181 返工收敛）', async () => {
  const fixture = setup_world();
  const { mon_limit } = load(fixture, 'dungeon/labo-map');
  const { db_set, db_get } = load(fixture, 'dungeon/labo');
  // 空图：合计 0 ≤ 120 → 1
  assert.equal(await mon_limit(), 1, '空图可放');
  // 25 格 lv 5（合计 125 > 120）——兵力 21 让格子存活
  for (let k = 0; k < 5; k += 1) {
    fixture.store.set(`item:${150 + k}`, 21);
  }
  for (let x = 0; x < 25; x += 1) {
    db_set(0, x, 5);
  }
  assert.equal(await mon_limit(), 0, '合计 125 > 120 → 拒绝');
  assert.ok(
    fixture.text_lines().some((t) => t.includes('*怪物的配置到极限了*')),
    '超限播报（LABO_MAP.ERB:179）',
  );
  assert.equal(db_get(0, 0), 5, '兵力足够的格子不被扫');
});

test('MON_SET_OMAKASE：許容量满后提前停（真身超限语义，不再走满 101 次）', async () => {
  const fixture = setup_world();
  const { mon_set_omakase } = load(fixture, 'page/page-dungeon-setup');
  const { db_get } = load(fixture, 'dungeon/labo');
  const { db_set } = load(fixture, 'dungeon/labo');
  // 预置 24 格 lv 5（合计 120 = 上限，仍可放）+ 全段兵力；随后恒定 rand
  // 放 lv=9(x=0,y=0)——第 1 轮后合计 129 > 120，第 2 轮开头的 MON_LIMIT
  // 拒绝 → 提前退出：恰 3 次 rand 调用（一轮三元组）
  for (let k = 0; k < 5; k += 1) {
    fixture.store.set(`item:${150 + k}`, 21);
    fixture.store.set(`item:${190 + k}`, 21);
  }
  for (let x = 8; x < 32; x += 1) {
    db_set(0, x, 5);
  }
  let calls = 0;
  const rand = () => {
    calls += 1;
    return 0.9; // lv=9 (x=28, y=28)——floor(0.9*32) = 28，不在预置行（y=0）
  };
  await mon_set_omakase(rand);
  assert.equal(calls, 3, '第 1 轮放置后合计 129 > 120——第 2 轮許容量检查即停');
  assert.equal(
    db_get(28, 28),
    9,
    '超限前的最后放置仍落库（lv9 兵力 21 > 20，扫描不清）',
  );
});

test('MON_SET_OMAKASE：放置次数上限 101', async () => {
  const fixture = setup_world();
  const { mon_set_omakase } = load(fixture, 'page/page-dungeon-setup');
  let calls = 0;
  const rand = () => {
    calls += 1;
    return 0.1; // lv=3 (x=3, y=3) 恒定一格（重复写同格）
  };
  await mon_set_omakase(rand);
  // 101 次放置 × 3 次取随机 = 303 次调用 + 若干玉座重试（无——(3,3) 非玉座）
  assert.equal(calls, 101 * 3, '恰 101 次放置后退出');
});

// —— DB 折叠寻址 ——

test('DB 折叠寻址：db_get/db_set 与 store 的一维地址互看', () => {
  const fixture = setup_world();
  // #181 返工起包装的唯一真相源在 ere/dungeon/labo.js（自本文件移交）
  const { db_get, db_set } = load(fixture, 'dungeon/labo');
  db_set(4, 12, 7);
  assert.equal(fixture.store.get('db:412'), 7, 'DB(4,12) → db:4*100+12');
  assert.equal(db_get(4, 12), 7);
  fixture.store.set('db:1616', 3);
  assert.equal(db_get(16, 16), 3, '玉座槽可直读');
});

// —— @DUNGEON_INFO_MAP（FLAG:502 == 1 的 2D 分流）——

test('INFO_MAP：菜单六钮与 [100] 返回在白名单内', async () => {
  const fixture = setup_world();
  const { dungeon_info_map } = load(fixture, 'page/page-dungeon-setup');
  fixture.set_inputs(100);
  assert.equal(await dungeon_info_map(), 0);
  const buttons = fixture.lines
    .filter((l) => l.type === 'button')
    .map((l) => l.accelerator);
  for (const acc of [0, 1, 2, 3, 4, 5, 100]) {
    assert.ok(buttons.includes(acc), `[${acc}] 应打印`);
  }
});

test('INFO_MAP：[1] 显示地图走 GEO_OUTPUT_2 真身（#181 返工收敛）', async () => {
  const fixture = setup_world();
  const { dungeon_info_map } = load(fixture, 'page/page-dungeon-setup');
  fixture.set_inputs(1, 100);
  await dungeon_info_map();
  const texts = fixture.lines_history
    .filter((l) => l.type === 'text')
    .map((l) => l.text);
  // 真身：32 行 × 32 格（da 全 0 → 地形档 0 的「０,」），中心 (16,16) 是凸
  const map_rows = texts.filter((t) => t.length === 64 && t.includes('０,'));
  assert.equal(map_rows.length, 32, '32 行 × 每行 64 字符的 chip 地图');
  assert.ok(map_rows[16].includes('凸,'), '第 17 行（y=16）的中心是魔王城凸');
  assert.ok(
    !texts.some((t) => t.includes('@GEO_OUTPUT_2')),
    '域内存根占位行不再出现',
  );
});

test('INFO_MAP：[2]-[5] 部下扫描（魔王军横幅）', async () => {
  const fixture = setup_world();
  const { dungeon_info_map } = load(fixture, 'page/page-dungeon-setup');
  fixture.set_inputs(2, 100);
  await dungeon_info_map();
  assert.ok(
    fixture.lines_history
      .map((l) => l.text ?? '')
      .some((t) => t.includes('魔王军')),
    'MAP 版横幅「魔王军」',
  );
});

test('INFO_MAP：手动放置流程（等级 → X/Y → ★ 确认 → DB 写入）', async () => {
  const fixture = setup_world();
  const { dungeon_info_map } = load(fixture, 'page/page-dungeon-setup');
  const { db_get } = load(fixture, 'dungeon/labo');
  fixture.set_inputs(0, 5, 7, 11, 0, 100); // 配置 → 等级 5 → X=7 → Y=11 → 好的
  await dungeon_info_map();
  assert.equal(db_get(11, 7), 5, 'DB(Y=11, X=7) = 等级 5');
  const texts = fixture.lines_history.map((l) => l.text ?? '');
  assert.ok(texts.some((t) => t.includes('确定放置在★的所在？')));
  assert.ok(
    texts.some((t) => t.includes('★,')),
    '★ 放置点芯片（原作 PRINT ★ / PRINT , 同构——默认色带逗号）',
  );
  assert.ok(
    texts.some((t) => t.length === 64 && t.includes('０,')),
    'CHIP_DRAW 真身芯片：空地形格的地形档 0（#181 返工收敛，□ 存根退役）',
  );
  assert.ok(texts.some((t) => t.includes('*放置了怪物*')));
});

test('INFO_MAP：玉座 (16,16) 拒绝放置，重问等级后可停止', async () => {
  const fixture = setup_world();
  const { dungeon_info_map } = load(fixture, 'page/page-dungeon-setup');
  const { db_get } = load(fixture, 'dungeon/labo');
  // 配置 → 等级 5 → X=16 → Y=16 → 拒（重问等级）→ 停止（0）→ 菜单返回
  fixture.set_inputs(0, 5, 16, 16, 0, 100);
  await dungeon_info_map();
  assert.ok(
    fixture.lines_history
      .map((l) => l.text ?? '')
      .some((t) => t.includes('无法在此放置')),
  );
  assert.equal(db_get(16, 16), 0, '玉座不写');
});

test('INFO_MAP：[100] 自动走 MON_SET_OMAKASE（随机放置播报）', async () => {
  const fixture = setup_world();
  const { dungeon_info_map } = load(fixture, 'page/page-dungeon-setup');
  // 配置 → 等级输入选自动（100）→ 菜单返回
  fixture.set_inputs(0, 100, 100);
  await dungeon_info_map();
  const texts = fixture.lines_history.map((l) => l.text ?? '');
  assert.ok(texts.some((t) => t.includes('*随机放置了怪物*')));
});

test('INFO_MAP：坐标无效值重问等级（GOTO INPUT_LOOP_MONSET 语义）', async () => {
  const fixture = setup_world();
  const { dungeon_info_map } = load(fixture, 'page/page-dungeon-setup');
  // 等级 5 → X=1 → Y 坐标画面……此处只能喂合法值（白名单）——「无效值」在
  // ere 侧结构性不可达（引擎拒收非按钮值），该分支保留为防御。用停止
  // 验证坐标画面的 [0] 停止回菜单
  fixture.set_inputs(0, 5, 0, 100);
  await dungeon_info_map();
  const texts = fixture.lines_history.map((l) => l.text ?? '');
  assert.ok(texts.some((t) => t.includes('请设定怪物的X坐标')));
});

// —— @ENEMY_EXIST（与 INFO2 版分立的另一侧）——

test('ENEMY_EXIST：迎击中/逃走中/护卫中的三种行形态', () => {
  const fixture = setup_world();
  const { enemy_exist } = load(fixture, 'page/page-dungeon-setup');
  fixture.seed_chara(2, { id: 2, name: '贝丝', callname: '贝丝' });
  fixture.era.addCharacter(2);
  fixture.store.set('cflag:2:1', 3); // 贝丝迎击中
  fixture.store.set('cflag:2:501', 3);
  fixture.store.set('cflag:1:1', 2); // 勇者甲侵攻 + 逃走
  fixture.store.set('cflag:1:501', 3);
  fixture.store.set('cflag:1:507', 1);
  fixture.store.set('ex_talent:2:1', 0); // 非护卫（对照）
  const ret = enemy_exist(3);
  assert.equal(ret, 0);
  const texts = fixture.text_lines();
  assert.ok(texts.some((t) => t.includes('勇者甲[侵攻中]*逃走中*')));
  assert.ok(texts.some((t) => t.includes('贝丝[迎击中]')));
  assert.ok(!texts.some((t) => t.includes('护卫中')), '非护卫不打护卫行');
  // 近卫层：未占用 + EX_TALENT → 护卫行
  const fixture2 = setup_world();
  const { enemy_exist: exist_b } = load(fixture2, 'page/page-dungeon-setup');
  fixture2.store.set('cflag:1:1', 0);
  fixture2.store.set('ex_talent:1:1', 1);
  exist_b(10);
  assert.ok(
    fixture2.text_lines().some((t) => t.includes('勇者甲[护卫中]')),
    '近卫层护卫行',
  );
});
