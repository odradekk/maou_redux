/**
 * @file ere/page/page-ability-up.js 的行为测试（issue #397 / N13 段 3）。
 *
 * 源: target/ERB/SHOP/SHOP_2.ERB  @ABILITY_UP（:4-153）、
 *     @ABILITY_UP_CORE（:155-254）。
 *
 * 接缝 = test/helpers/era-fixture.js：驱动一整次界面（预置输入 → 收集本次
 * 新增的输出行 → 按「一次绘制」切段断言）。
 *
 * 维度型判据一律表驱动：
 *   - 菜单档维度（998 奴隶一览 / 997 勇者一览）两档各跑一遍；
 *   - 输入分发逐支（999 / 991-998 / 1000 / 1001 / 合法奴隶 / 魔王自己）；
 *   - 等级门（CFLAG:0:9 < 20 拦、≥ 20 放行）表驱动；
 *   - @ABILITY_UP_CORE 的 ABLUP 分发表整表走完（26 支）。
 *
 * **不可达支**（结构上到不了，1:1 保留不补用例，逐条注明）：ere 的输入集
 * = 本轮已打印按钮（夹具与引擎同款校验），故 (a)「数值已超出允许范围外」
 * 两支（越界与未加入 ID）、(b)「不能选择非待命状态的奴隶 / 非侵攻状态的
 * 勇者」两支在实机输入下不可达——列表已经把这些人过滤掉了；(c) ABLUP100
 * 的按钮来自原作的 `[IF_DEBUG]` 块（未移植），故 RESULT == 100 的
 * @ABILITY_UP_CORE 分支同样不可达。
 */

'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

/** 加一名角色（预设 + addCharacter），与 page-chara-info.test.js 同款 */
function add_chara(fixture, cid, name = `角色${cid}`) {
  fixture.seed_chara(cid, { id: cid, name, callname: name });
  assert.equal(fixture.era.addCharacter(cid), true);
}

/** 跑一次 @ABILITY_UP，返回本次新增的输出行 */
async function run(fixture, inputs) {
  fixture.set_inputs(...inputs);
  const before = fixture.lines.length;
  const { ability_up } = fixture.load_module('page/page-ability-up');
  const ret = await ability_up();
  return { ret, added: fixture.lines.slice(before) };
}

/**
 * 完整绘制的切段：以页脚 [1001] 下一页按钮为分隔（每档绘制都以它收尾）。
 * 尾段（绘制之后追加的提示行等）不计入——调用方按 draws.length 数绘制次数。
 */
function split_draws(lines) {
  const draws = [];
  let current = [];
  for (const line of lines) {
    current.push(line);
    if (line.type === 'button' && line.accelerator === 1001) {
      draws.push(current);
      current = [];
    }
  }
  return draws;
}

const accs = (lines) =>
  lines.filter((l) => l.type === 'button').map((l) => l.accelerator);
const texts = (lines) =>
  lines.filter((l) => l.type === 'text').map((l) => l.text);
const button_of = (lines, accelerator) =>
  lines.find((l) => l.type === 'button' && l.accelerator === accelerator);

/** 某编号那一行的正文文本格（按钮格之外、同 row 的格拼接） */
function row_text(lines, accelerator) {
  const button = button_of(lines, accelerator);
  return lines
    .filter((l) => l.row === button.row && l.type !== 'button')
    .map((l) => l.text)
    .join('');
}

/**
 * 四人档：魔王 0（等级 25）＋ 待机奴隶 1、2（能进奴隶一览）＋ 侵攻中 3
 * （只进勇者一览）。@param {object} seed 追加的变量预置
 */
function four_chara(seed = {}) {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  for (const cid of [1, 2, 3]) {
    add_chara(fixture, cid, `奴隶${cid}`);
    fixture.store.set(`base:${cid}:0`, 1);
  }
  fixture.store.set('cflag:0:9', 25);
  fixture.store.set('cflag:3:1', 2); // 侵攻中
  for (const [name, value] of Object.entries(seed)) {
    fixture.store.set(name, value);
  }
  return fixture;
}

// —— 菜单档与表头 ——

test('ABILITY_UP：菜单档维度整表驱动（998 奴隶一览 / 997 勇者一览）', async () => {
  // 998（缺省档）：表头两个按钮 + 魔王行（编号 0）+ 待机奴隶 1、2
  const slave_view = four_chara();
  {
    const { added } = await run(slave_view, [999]);
    const [draw] = split_draws(added);
    assert.deepEqual(
      accs(draw),
      [998, 997, 0, 1, 2, 1000, 999, 1001],
      '998 档：表头 + 魔王行 + 两名待机奴隶 + 页脚三键',
    );
    assert.equal(button_of(draw, 0).rendered, '[0]', '魔王行是编号 0 的按钮');
    assert.ok(
      row_text(draw, 1).includes('奴隶1'),
      '待机奴隶 1 有行（正文在文本格里）',
    );
  }

  // 997（点 [997] 切换）：无魔王行，只有侵攻中的 3 号
  const enemy_view = four_chara();
  {
    const { added } = await run(enemy_view, [997, 999]);
    const [first, second] = split_draws(added);
    assert.deepEqual(accs(first), [998, 997, 0, 1, 2, 1000, 999, 1001]);
    assert.deepEqual(
      accs(second),
      [998, 997, 3, 1000, 999, 1001],
      '997 档：无魔王行，只有 CFLAG:1 == 2 的 3 号',
    );
  }
});

test('ABILITY_UP：表头按钮文案与等级门灰显（CFLAG:0:9 < 20 → #bbbbbb）', async () => {
  const bright = four_chara();
  {
    const { added } = await run(bright, [999]);
    const draw = split_draws(added)[0];
    assert.equal(button_of(draw, 998).text, '▌奴隶一览');
    assert.equal(button_of(draw, 998).color, undefined, '等级 ≥ 20 不灰');
    assert.equal(button_of(draw, 997).text, '▌勇者一览');
    assert.equal(button_of(draw, 997).color, undefined);
    assert.ok(texts(draw).includes('要提高谁的能力值？'), '标题行（:63）');
  }

  // 门槛的边界：19 调暗、20 放行（SIF CFLAG:0:9 < 20）
  for (const [level, color] of [
    [19, '#bbbbbb'],
    [20, undefined],
  ]) {
    const fixture = four_chara({ 'cflag:0:9': level });
    const { added } = await run(fixture, [999]);
    const draw = split_draws(added)[0];
    assert.equal(button_of(draw, 998).color, color, `${level} 级的调暗`);
    assert.equal(button_of(draw, 997).color, color);
  }
});

test('ABILITY_UP：魔王行的名字与等级按定宽渲染（名字 12 / 8 空格 / 等级右对齐 4）', async () => {
  const fixture = four_chara({ 'cflag:0:9': 7 });
  const { added } = await run(fixture, [999]);
  const draw = split_draws(added)[0];
  const row = draw.find((l) => l.row === button_of(draw, 0).row);
  const row_text = draw
    .filter((l) => l.row === button_of(draw, 0).row && l.type !== 'button')
    .map((l) => l.text)
    .join('');
  assert.equal(
    row_text,
    `你${' '.repeat(10)}${' '.repeat(8)} LV${' '.repeat(3)}7`,
  );
  assert.ok(row, '魔王行与编号按钮同 row');
});

// —— 输入分发 ——

test('ABILITY_UP：等级门整表驱动（< 20 拦下两个菜单键、≥ 20 放行）', async () => {
  // 拦截支是 PRINTW + CLEARLINE 2 + GOTO INPUT_LOOP_0：**回输入而不重绘**
  // （:102-105 的跳转目标是 $INPUT_LOOP_0 而非 MENU），故本次调用只有一次
  // 绘制，玩家看到提示后要重新选。
  for (const level of [19, 20]) {
    const fixture = four_chara({ 'cflag:0:9': level });
    const { added } = await run(fixture, [997, 999]);
    const draws = split_draws(added);
    const blocked = texts(added).includes('这个指令需要更高等级');
    if (level < 20) {
      assert.equal(blocked, true, `${level} 级：应提示等级不足`);
      assert.equal(draws.length, 1, '拦截回输入，不重绘');
    } else {
      assert.equal(blocked, false, `${level} 级：放行`);
      assert.deepEqual(accs(draws[1]), [998, 997, 3, 1000, 999, 1001]);
    }
  }
});

test('ABILITY_UP：菜单键切档（998 回奴隶一览、997 切勇者一览）', async () => {
  // 991-996 的「イレギュラー归一」（:74 写回 998）在 ere 侧不可达——引擎
  // 只回传已打印的按钮编号，那两个按钮是 997/998（见文件头不可达支说明）
  const back = four_chara();
  {
    const { added } = await run(back, [997, 998, 999]);
    const draws = split_draws(added);
    assert.deepEqual(
      accs(draws[1]),
      [998, 997, 3, 1000, 999, 1001],
      '先切勇者',
    );
    assert.deepEqual(
      accs(draws[2]),
      [998, 997, 0, 1, 2, 1000, 999, 1001],
      '再切回奴隶一览（含魔王行）',
    );
  }
  const enemy = four_chara();
  {
    const { added } = await run(enemy, [997, 999]);
    assert.deepEqual(
      accs(split_draws(added)[1]),
      [998, 997, 3, 1000, 999, 1001],
    );
  }
});

test('ABILITY_UP：翻页（1000/1001）按档走，页首/页尾不越界', async () => {
  // 26 名待机奴隶 → 每页 23 行、共 2 页（MAX_PAGE = ceil(26/23) - 1 = 1）
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  fixture.store.set('cflag:0:9', 25);
  for (let cid = 1; cid <= 26; cid += 1) {
    add_chara(fixture, cid, `奴隶${cid}`);
    fixture.store.set(`base:${cid}:0`, 1);
    fixture.store.set(`cflag:${cid}:1`, 0);
  }
  {
    const { added } = await run(fixture, [1001, 999]);
    const [first, second] = split_draws(added);
    assert.equal(
      accs(first).filter((a) => a >= 1 && a <= 26).length,
      23,
      '第 1 页 23 行',
    );
    assert.deepEqual(
      accs(second).filter((a) => a >= 1 && a <= 26),
      [24, 25, 26],
      '第 2 页剩 3 行（页高不足不补）',
    );
  }
  // 页首按上一页：无动作（重绘同一页）；页尾按下一页：无动作
  const head = create_era_fixture();
  add_chara(head, 0, '你');
  head.store.set('cflag:0:9', 25);
  for (let cid = 1; cid <= 26; cid += 1) {
    add_chara(head, cid, `奴隶${cid}`);
    head.store.set(`base:${cid}:0`, 1);
    head.store.set(`cflag:${cid}:1`, 0);
  }
  {
    const { added } = await run(head, [1000, 999]);
    const [first, second] = split_draws(added);
    assert.deepEqual(accs(first), accs(second), '第 1 页按上一页：同一页重绘');
  }
});

test('ABILITY_UP：补行到页高（L_LCOUNT < NUM_PAGE + 1 的边界两侧）', async () => {
  // 998 档：魔王行（1）+ 奴隶行（n）算进 L_LCOUNT，补到 NUM_PAGE + 1 = 24 行
  const two = four_chara();
  const draw = split_draws((await run(two, [999])).added)[0];
  // 空行 = 表头 PRINTL + 补行 + 页脚 PRINTL；补行数由 L_LCOUNT 与
  // NUM_PAGE(+1) 算出——改动补行上下界这里立刻变数
  assert.equal(
    draw.filter((l) => l.type === 'text' && l.text === '').length,
    22,
    '2 名奴隶（1 + 2 = 3 行）时的空行数',
  );
  // 997 档：每页 24 行，1 名敌人 → 补 23 行
  const enemy = four_chara();
  const draw2 = split_draws((await run(enemy, [997, 999])).added)[1];
  assert.equal(
    draw2.filter((l) => l.type === 'text' && l.text === '').length,
    25,
    '1 名敌人（1 行）时的空行数',
  );
  // 边界的**两侧**：998 档 l_lcount 恰好等于 NUM_PAGE（23）时仍要补 1 行
  // （判据是 `< NUM_PAGE + 1`）——收成 `< NUM_PAGE` 时这一行会消失
  const full_page = create_era_fixture();
  add_chara(full_page, 0, '你');
  full_page.store.set('cflag:0:9', 25);
  for (let cid = 1; cid <= 22; cid += 1) {
    add_chara(full_page, cid, `奴隶${cid}`);
    full_page.store.set(`base:${cid}:0`, 1);
    full_page.store.set(`cflag:${cid}:1`, 0);
  }
  const draw3 = split_draws((await run(full_page, [999])).added)[0];
  assert.equal(
    draw3.filter((l) => l.type === 'text' && l.text === '').length,
    2,
    '1 + 22 = 23 行（= NUM_PAGE）时仍补 1 行，加表头 PRINTL 共 2 空行',
  );
});

test('ABILITY_UP：勇者一览按 24 行分页（25 名敌人 → 第 2 页 1 行）', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  fixture.store.set('cflag:0:9', 25);
  for (let cid = 1; cid <= 25; cid += 1) {
    add_chara(fixture, cid, `敌${cid}`);
    fixture.store.set(`base:${cid}:0`, 1);
    fixture.store.set(`cflag:${cid}:1`, 2); // 侵攻中
  }
  const { added } = await run(fixture, [997, 1001, 999]);
  const draws = split_draws(added);
  const enemy_of = (draw) => accs(draw).filter((a) => a >= 1 && a <= 25);
  assert.equal(enemy_of(draws[1]).length, 24, '第 1 页 24 行（NUM_PAGE = 24）');
  assert.deepEqual(enemy_of(draws[2]), [25], '第 2 页只剩第 25 人');
  // 页尾再按下一页：MAX_PAGE = 1，不该再翻出空页
  const tail = create_era_fixture();
  add_chara(tail, 0, '你');
  tail.store.set('cflag:0:9', 25);
  for (let cid = 1; cid <= 25; cid += 1) {
    add_chara(tail, cid, `敌${cid}`);
    tail.store.set(`base:${cid}:0`, 1);
    tail.store.set(`cflag:${cid}:1`, 2);
  }
  const second = await run(tail, [997, 1001, 1001, 999]);
  const tail_draws = split_draws(second.added);
  assert.deepEqual(
    accs(tail_draws[3]).filter((a) => a >= 1 && a <= 25),
    [25],
    '页尾按下一页仍是最后一页',
  );
});

test('ABILITY_UP：选中待机奴隶进入 CORE（选中后菜单 RESTART）', async () => {
  const fixture = four_chara();
  // 2 号 → CORE（能力画面）→ 999 结束 → RESTART 重画菜单（第二段绘制）
  // → 999 退出
  const { added } = await run(fixture, [2, 999, 999]);
  const draws = split_draws(added);
  assert.equal(draws.length, 2, '菜单 → CORE → RESTART 重画菜单');
  assert.ok(
    texts(added).includes('奴隶2'),
    'CORE 的画面以 %SAVESTR:TARGET%（目标名）开场',
  );
  assert.ok(
    texts(added).some((t) => t.includes('奴隶2当前是Lv0')),
    'CORE 里调 SHOW_INFO_EXP（目标 2 号）',
  );
  assert.ok(
    added.some(
      (l) =>
        l.type === 'button' &&
        l.accelerator === 999 &&
        l.text.includes('能力值提高结束'),
    ),
    'CORE 里调 SHOW_ABLUP_SELECT（[999] 结束键）',
  );
  // draws[1] = CORE 的画面 + RESTART 后的菜单（切段只按页脚 1001 分），
  // 故看尾八键 = RESTART 重画出来的菜单
  assert.deepEqual(
    accs(draws[1]).slice(-8),
    [998, 997, 0, 1, 2, 1000, 999, 1001],
  );
});

test('ABILITY_UP：魔王自己（输入 0）也进 CORE', async () => {
  // 魔王行的 BASE:0:0 必须 > 0（:127-131 的濒死守卫），否则进不了 CORE
  const fixture = four_chara({ 'base:0:0': 1 });
  const { added } = await run(fixture, [0, 999, 999]);
  assert.ok(
    texts(added).includes('你'),
    'CORE 的目标是魔王（0 号）——画面首行是 %SAVESTR:TARGET%',
  );
});

// —— @ABILITY_UP_CORE ——

test('ABILITY_UP_CORE：ABLUP 已落真身的编号走真实判定而非占位', async () => {
  const { ABLUP_HANDLERS } = create_era_fixture().load_module(
    'system/train/juel-check',
  );
  for (const id of Object.keys(ABLUP_HANDLERS).map(Number)) {
    if (id === 100) {
      // [100] 异界综合征的按钮来自原作的 `[IF_DEBUG]` 块（page-ablup.js 文件
      // 头），ere 侧没有这个按钮 → RESULT == 100 经输入通道不可达；分发表
      // 里保留它（SHOP_2.ERB:244 的原作分支如此），但这里喂不进去
      continue;
    }
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    add_chara(fixture, 1, '玛奥');
    fixture.store.set('base:1:0', 1);
    if (id === 4 || id === 40) {
      // 局部感觉 [4] 与局部中毒 [40] 只在 CSTR:7 定制后渲染出按钮
      // （page-ablup.js:92-101）
      fixture.store.set('cstr:1:7', '舔');
    }
    // 选中能力 → （能力自身的 [100] 放弃）→ 退出。[99] 是例外：无刻印时
    // 反抗刻印消去走「打印 + WAIT」早退（ABLUP99.ERB:28-32），没有子菜单。
    // 夹具的 waitAnyKey 不取输入队列（既定桩策略），所以那一趟不需要 [100]
    fixture.set_inputs(...(id === 99 ? [id, 999] : [id, 100, 999]));
    const { ability_up_core } = fixture.load_module('page/page-ability-up');
    const ret = await ability_up_core(1);
    assert.equal(ret, 0, `ABLUP${id} 之后 [999] 正常结束`);
    assert.ok(
      !fixture.text_lines().some((t) => t.includes(`@ABLUP${id}`)),
      `ABLUP${id} 不应再打占位行`,
    );
  }
});

test('ABILITY_UP_CORE：ABLUP 分发表整表驱动（剩余 8 支各回一次占位，不退出循环）', async () => {
  const { ABLUP_IDS, ABLUP_HANDLERS } = create_era_fixture().load_module(
    'system/train/juel-check',
  );
  for (const id of ABLUP_IDS) {
    if (id === 100 || id in ABLUP_HANDLERS) {
      // [100] 异界综合征的按钮来自原作的 `[IF_DEBUG]` 块（page-ablup.js 的
      // 文件头：调试编译块不移植），ere 侧没有这个按钮 → RESULT == 100 的
      // 分支经输入通道不可达，见文件头不可达支说明。ABLUP_HANDLERS 覆盖的
      // 编号（issue #464）已落真身，上一条用例单独覆盖，这里跳过
      continue;
    }
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    add_chara(fixture, 1, '玛奥');
    fixture.store.set('base:1:0', 1);
    if (id === 40) {
      // 局部中毒只在 CSTR:7 定制后由 @SHOW_ABLUP_SELECT 渲染出按钮
      // （page-ablup.js:92-101），否则输入通道到不了这一支（局部感觉 [4]
      // 同样受此限制，但已随 issue #464 落真身，见上一条用例）
      fixture.store.set('cstr:1:7', '舔');
    }
    if (id === 23) {
      // [23] 断背气质只对男性角色渲染（page-ablup.js:44-48 的性别过滤），
      // 名字也随性别换（ホモっ気）；女性档下这个按钮不存在
      fixture.store.set('talent:1:122', 1);
    }
    fixture.set_inputs(id, 999);
    const { ability_up_core } = fixture.load_module('page/page-ability-up');
    const ret = await ability_up_core(1);
    assert.equal(ret, 0, `ABLUP${id} 之后 [999] 正常结束`);
    assert.ok(
      fixture.text_lines().some((t) => t.includes(`@ABLUP${id}`)),
      `ABLUP${id} 应打一行带原作函数名的占位`,
    );
  }
});

test('ABILITY_UP_CORE：999 收尾三件（欲情变化检查真身 → 出售资格复核 → 还原 TARGET）', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '玛奥');
  fixture.store.set('base:1:0', 1);
  // 让 CHECK_SELLASSIABLE 走通到「可以卖掉了」（能力值门槛）
  for (const [idx, value] of [
    [0, 3],
    [1, 3],
    [2, 3],
    [3, 3],
    [10, 5],
    [11, 4],
  ]) {
    fixture.store.set(`abl:1:${idx}`, value);
  }
  fixture.store.set('flag:10005', 0); // 进 CORE 前的 TARGET（T，era_flag.target）
  fixture.set_inputs(999);
  const { ability_up_core } = fixture.load_module('page/page-ability-up');
  await ability_up_core(1);
  assert.ok(
    !fixture.text_lines().some((t) => t.includes('@YOKUBO_UP_CHECK')),
    'YOKUBO_UP_CHECK 已接真身，不应再打占位行',
  );
  assert.ok(
    fixture.text_lines().includes('玛奥可以卖掉了'),
    'CHECK_SELLASSIABLE 复核的是 CORE 里的 TARGET（1 号）',
  );
  assert.equal(fixture.store.get('flag:10005'), 0, '退出时 TARGET 还原为 T');
});

test('ABILITY_UP_CORE：999 收尾走欲情变化检查真身（抵抗清除 + 否定点数减半）', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '玛奥');
  fixture.store.set('abl:1:11', 3);
  fixture.store.set('talent:1:34', 1);
  fixture.store.set('juel:1:100', 7);
  fixture.store.set('flag:10005', 0);
  fixture.set_inputs(999);
  const { ability_up_core } = fixture.load_module('page/page-ability-up');
  await ability_up_core(1);
  assert.ok(
    fixture.text_lines().some((t) => t.includes('【抵抗】')),
    '真身应打印失去抵抗的提示',
  );
  assert.equal(fixture.store.get('talent:1:34'), 0, '抵抗清除');
  assert.equal(fixture.store.get('juel:1:100'), 3, '否定点数减半截断');
});
