/**
 * ere/page/page-campaign.js @CAMPAIGN_MENU + @SELECT_CAMPAIGN 的行为测试
 * （issue #469）。战役 1「赤蛮咒森」的展示三函数（page-campaign-1.js）
 * 随本文件一并验证——两者共用 DispatchFamily 实例，拆开测无法验证接线。
 *
 * 源: target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB @CAMPAIGN_MENU（:6-127）、
 *     @SELECT_CAMPAIGN（:130-152）；CAMPAIGN_1.ERB @CAMPAIGN_EXIST_1（:51-57）、
 *     @CAMPAIGN_SET_1（:59-71）、@CAMPAIGN_NAME_1（:73-81）。
 */

'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function add_chara(fixture, cid, name = `角色${cid}`) {
  fixture.seed_chara(cid, { id: cid, name, callname: name });
  assert.equal(fixture.era.addCharacter(cid), true);
}

const accs = (lines) =>
  lines.filter((l) => l.type === 'button').map((l) => l.accelerator);
const texts = (lines) =>
  lines.filter((l) => l.type === 'text').map((l) => l.text);

function load(fixture) {
  // page-campaign-1.js 的 register() 是顶层副作用，必须显式 require 才会
  // 触发（system/flow/main-loop.js 同款要求，见该文件的 require 注释）
  fixture.load_module('page/page-campaign-1');
  return fixture.load_module('page/page-campaign');
}

// —— @CAMPAIGN_MENU 头部展示 ——

test('campaign_menu()：FLAG:400 == 0 时只显示[行动选择] + [返回]', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '魔王');
  const { campaign_menu } = load(fixture);
  fixture.set_inputs(999);
  const before = fixture.lines.length;
  const ret = await campaign_menu();
  assert.equal(ret, 0);
  const added = fixture.lines.slice(before);
  assert.deepEqual(accs(added), [0, 999]);
  // :12/:22/:31 三条分隔线的位置：头部一条、行动按钮前一条、[999] 前再一条
  assert.deepEqual(
    added.map((l) => l.type),
    ['divider', 'text', 'divider', 'button', 'divider', 'button'],
    ':31 行动按钮与 [999] 之间的第二条分隔线',
  );
  assert.ok(
    texts(added).some((t) => t.includes('无')),
    ':18 未选战役显示"无"',
  );
});

// —— @SELECT_CAMPAIGN → @CAMPAIGN_SET_1 → 回菜单显示战役名 ——

test('campaign_menu()：[0] 选战役 1 → CAMPAIGN_SET_1 真身跑完 → 菜单头部显示战役名', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '魔王');
  const { campaign_menu } = load(fixture);
  // 第一轮 [0] 进 SELECT_CAMPAIGN → 选 [1]（唯一注册的槽位）；
  // SELECT_CAMPAIGN 返回后菜单重画，第二轮 [999] 退出
  fixture.set_inputs(0, 1, 999);
  const ret = await campaign_menu();
  assert.equal(ret, 0);
  assert.equal(fixture.store.get('flag:400'), 1, ':62 FLAG:400 = 1');
  assert.equal(fixture.store.get('flag:401'), 0, ':150 深度重置');
  assert.ok(
    texts(fixture.lines_history).some((t) => t.includes('赤森谜路')),
    '菜单头部经 CAMPAIGN_NAME_1 显示战役名',
  );
  assert.ok(
    texts(fixture.lines_history).some((t) => t.includes('极东之地')),
    'CAMPAIGN_SET_1 的开场白已打印',
  );
  // 第二轮菜单应改为 [1]/[2]/[999]（不再是 [0]）
  const second_menu_buttons = accs(fixture.lines_history).slice(-3);
  assert.deepEqual(second_menu_buttons, [1, 2, 999]);
});

test('SELECT_CAMPAIGN：选 [999] 直接返回，不触碰 FLAG:400', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '魔王');
  const { select_campaign } = load(fixture);
  fixture.set_inputs(999);
  const ret = await select_campaign();
  assert.equal(ret, 0);
  assert.equal(fixture.store.get('flag:400'), undefined);
});

test('SELECT_CAMPAIGN：超出 1-20 声明空间的输入不派发 CAMPAIGN_SET（DispatchFamily 的空间外判定是拼写错误用的，不能替代这层范围保护）', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '魔王');
  const { select_campaign } = load(fixture);
  // era.input() 正常受按钮白名单约束，只能取到 1/999；直接替换 input 绕开
  // 白名单，验证 :96 的范围守卫本身（而非依赖白名单）挡住越界值
  fixture.era.input = () => Promise.resolve(500);
  const ret = await select_campaign();
  assert.equal(ret, 0);
  assert.equal(
    fixture.store.get('flag:400'),
    undefined,
    '越界的 RESULT 不应派发到任何 CAMPAIGN_SET 实现',
  );
});

// —— 招募分支（RESULT == 1）——

test('招募：气力不足（BASE:MASTER:1 < 100）拒绝，不消耗角色名额', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '魔王');
  fixture.store.set('base:0:1', 99);
  fixture.store.set('flag:400', 1); // 已在战役中，菜单显示招募/派遣两键
  const { campaign_menu } = load(fixture);
  fixture.set_inputs(1, 999);
  await campaign_menu();
  assert.equal(fixture.store.get('base:0:1'), 99, '气力未被扣');
  assert.ok(texts(fixture.lines_history).some((t) => t.includes('气力不足')));
});

test('招募：奴隶数已达上限（CHARANUM > 80）拒绝——战役层守卫的原文，不是 16 位全满的兜底文案（#521）', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '魔王');
  fixture.store.set('base:0:1', 500);
  fixture.store.set('flag:400', 1);
  // 恰好 81 人（含魔王）＝触发侧边界：81 > 80 拦、81 > 81 放（#521 返工
  // 从 82 人收紧到边界；通过侧由下一用例的 80 人夹住，两个方向各差一可测）
  for (let cid = 1; cid <= 80; cid += 1) {
    add_chara(fixture, cid);
  }
  const { campaign_menu } = load(fixture);
  fixture.set_inputs(1, 999);
  await campaign_menu();
  const out = texts(fixture.lines_history);
  // 不能只断言「已达上限」四个字：1..16 全在场时，绕过本守卫的执行流会
  // 落进 CHAR_MAKE.ERB:188-191 的兜底文案「由于对魔王的恐惧，勇者没有
  // 出现。（奴隶数已达上限，请处决几个）」，同样含这四个字（#483 起候选
  // 表为空即走该分支——#521 逃逸的成因）。按带星号的守卫原文断言，并把
  // 兜底文案的到达判为失败。
  assert.ok(
    out.some((t) => t.includes('*奴隶数已达上限，请处决几个*')),
    ':52 战役层守卫文案必须出现',
  );
  assert.ok(
    out.every((t) => !t.includes('由于对魔王的恐惧')),
    '守卫应先于招募触发，不应进入 rand_chara_make 的 16 位全满兜底',
  );
});

test('招募：恰好 80 人（CHARANUM == 80）不触上限，招募成功', async () => {
  // 返工（#521 验收抽样）：>80 改 >79 时旧用例在场 82 人、两个判据同真，
  // 差一测不出来。本用例钉通过侧边界：80 人（含魔王）不拦截、走完招募。
  // 在场者避开勇者位 1..16（用 17..95 号），候选表非空，招募能真正完成；
  // base 恰好 100 同时钉住 :48 气力守卫（<100）的通过侧边界。
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '魔王');
  fixture.store.set('base:0:1', 100);
  fixture.store.set('flag:400', 1);
  for (let cid = 17; cid <= 95; cid += 1) {
    add_chara(fixture, cid);
  }
  fixture.seed_chara(1, { id: 1, name: '勇者1', callname: '勇者1' });
  fixture.store.set('cflag:1:6', 99); // 名字编号：避让随机命名重掷
  const { campaign_menu } = load(fixture);
  // rand 恒 0 → 抽中候选表首位（空着的 1 号）；形象确认 100（继续）→ 收下 2
  fixture.era.input = (() => {
    const answers = [1, 100, 2, 999];
    let i = 0;
    return () => Promise.resolve(answers[i++] ?? 999);
  })();
  await campaign_menu(() => 0);
  // SHOW_CHARA_INFO 走 -2 贡品页（CHAR_MAKE.ERB:150 的原作实参；#565 订正，
  // 战役招募与开局随机共用同一调用点）：外貌段的种族行必须真的铺出来
  assert(
    fixture.text_lines().includes('[人类]'),
    '招募确认页应展示 -2 贡品页的外貌段（种族行）',
  );
  assert.equal(fixture.store.get('base:0:1'), 0, '恰好 100 气力扣 100 后为 0');
  assert.equal(
    fixture.store.get('talent:1:361'),
    1,
    '招募成功点亮 1 号的战役素质位',
  );
});

test('招募：成功后扣 100 气力、点亮本战役招募素质位（TALENT:(FLAG:400+360)）', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '魔王');
  fixture.store.set('base:0:1', 200);
  fixture.store.set('flag:400', 1);
  // rand 恒 0 → 战役招募（#483 起走候选表）抽中候选表首位，即空着的 1 号。
  // 先让 9 号在场凑成**不连号**编制（#487）：招募后 CHARANUM = 3 →
  // 「已加入数 - 1」= 2 ≠ 1，按人数取新角色号的写法点不亮 1 号的素质位
  add_chara(fixture, 9, '勇者9');
  fixture.seed_chara(1, { id: 1, name: '勇者1', callname: '勇者1' });
  fixture.store.set('cflag:1:6', 99); // 名字编号：避让随机命名重掷
  const { campaign_menu } = load(fixture);
  // rand_chara_make 内部两处 INPUT：形象确认 100（继续）→ 收下 2；
  // 随后菜单重画，追加 999 退出
  fixture.era.input = (() => {
    const answers = [1, 100, 2, 999];
    let i = 0;
    return () => Promise.resolve(answers[i++] ?? 999);
  })();
  await campaign_menu(() => 0);
  assert.equal(fixture.store.get('base:0:1'), 100, '扣 100 气力');
  assert.equal(
    fixture.store.get('talent:1:361'),
    1,
    'TALENT:(400+360)=361 点亮',
  );
});

test('招募：16 位勇者位全满时走原作失败文案，不扣气力也不点素质位', async () => {
  // #483：战役招募只在未被占用的勇者位里抽，候选为空（16 位全满）时
  // RAND_CHARA_MAKE 返回 0，招募分支在扣气力之前返回（源 CAMPAIGN_EVENT.ERB
  // 的 `SIF RESULT == 0 GOTO INPUT_LOOP` 在 :58-59、扣气力的
  // `BASE:MASTER:1 -= 100` 在 :64，前者在前）
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '魔王');
  fixture.store.set('base:0:1', 200);
  fixture.store.set('flag:400', 1);
  for (let cid = 1; cid <= 16; cid += 1) {
    add_chara(fixture, cid, `勇者${cid}`);
  }
  const { campaign_menu } = load(fixture);
  // [1] 招募 → 直接失败（不消耗输入）→ 菜单重画 → [999] 退出
  fixture.set_inputs(1, 999);
  await campaign_menu(() => 0);
  assert.equal(fixture.store.get('base:0:1'), 200, '气力未被扣');
  assert.equal(
    fixture.store.get('talent:1:361'),
    undefined,
    '未点亮招募素质位（候选为空，没招募到人）',
  );
  assert.ok(
    texts(fixture.lines_history).some((t) =>
      t.includes('由于对魔王的恐惧，勇者没有出现'),
    ),
    ':188-191 原作文案',
  );
});

// —— #494：招募路径上的异国勇者判定 ——
//
// 原作 CAMPAIGN_EVENT.ERB:56 的 `CALL RAND_CHARA_MAKE` 虽然无参，但
// `CALL CHAR_MAKE_INPORT`（CHAR_MAKE.ERB:57）在 `@RAND_CHARA_MAKE` 体内、
// :55 的 IF 之内、:58 的 IF 之前，两条路径都会跑。ere 侧因转发层与真身
// 相互 require 成环，只能由调用点把 char_make_inport 注入进去。

test('招募：FLAG:76 与名单就绪时导入异国勇者，不建新的普通勇者（:57 的异国判定在战役路径上也跑）', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '魔王');
  fixture.store.set('base:0:1', 200);
  fixture.store.set('flag:400', 1);
  fixture.seed_chara(1, { id: 1, name: '勇者1', callname: '勇者1' }); // 普通路径会挑中的空位
  fixture.store.set('cflag:1:6', 99); // 名字编号：避让随机命名重掷
  add_chara(fixture, 9, '勇者9'); // 编制不连号，候选表首位是空位 1 号

  // 通信名单（原作 GLOBALS:0..99，ere 侧是 global:100 的 JSON 数组）里放一条
  // 异国勇者记录：唯一标记_预设号_等级_称呼_十张表段。预设号 3 不在编制里，
  // talent 段带着性格 161（在 ID_OF_GENERAL_CHARASTERISTICS 表内，会被
  // :67 的 SET_CHARASTERISTIC 清掉）
  fixture.seed_chara(3, { id: 3, name: '预设3', callname: '预设3' });
  fixture.store.set('flag:76', 30); // 外来勇者等级上限（:9-10 的闸门）
  fixture.store.set(
    'global:100',
    JSON.stringify([
      [
        '401',
        '3',
        '5',
        '异国者',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '161,1/',
        '',
        '',
      ].join('_'),
    ]),
  );

  const { campaign_menu } = load(fixture);
  // [1] 招募 → [100] 收下（异国路径不跑形象确认循环，这已是 :158）→ 菜单
  // [999] 退出。**用「兜底 999」而不是 set_inputs**：异国判定没跑通时会退回
  // 非异国路径，那一轮多消耗一个 :107 的形象确认 INPUT（100 在那边正是
  // 「继续」），兜底值让两条路径都停在「收下 → 菜单退出」上——本用例是想让
  // 没注入 char_make_inport 的形态撞在断言上，不是撞在夹具的输入耗尽上
  const answers = [1, 100, 999];
  let asked = 0;
  fixture.era.input = () => Promise.resolve(answers[asked++] ?? 999);
  await campaign_menu(() => 0);

  assert.equal(fixture.store.get('base:0:1'), 100, '扣 100 气力');
  assert.equal(
    fixture.store.get('talent:3:361'),
    1,
    '素质位点亮在导入的异国勇者 3 号身上',
  );
  assert.equal(
    fixture.store.get('talent:1:361'),
    undefined,
    '不落到普通路径会挑中的 1 号（调用点没传 char_make_inport 时就会）',
  );
  assert.equal(
    fixture.store.get('talent:3:161'),
    1,
    '名单记录带来的性格保留（:66-72 的预设落地在异国路径上不跑）',
  );
  assert.equal(
    fixture.store.get('talent:3:160'),
    undefined,
    ':67 SET_CHARASTERISTIC 未执行',
  );
  assert.ok(
    !texts(fixture.lines_history).some((t) => t.includes('[0] 印象')),
    '异国路径不进 :81 的形象确认段',
  );
});

// —— 派遣分支（RESULT == 2）——

test('派遣：翻页与返回不写任何 CFLAG', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '魔王');
  for (let cid = 1; cid <= 27; cid += 1) {
    add_chara(fixture, cid);
    fixture.store.set(`base:${cid}:0`, 1);
    fixture.store.set(`talent:${cid}:361`, 1);
  }
  fixture.store.set('flag:400', 1);
  const { campaign_menu } = load(fixture);
  fixture.set_inputs(2, 1001, 999, 999);
  await campaign_menu();
  assert.equal(fixture.store.get('cflag:1:1'), undefined, '未派遣任何人');
});

test('派遣：子菜单的页码在同一菜单会话内保留（原作 NO_PAGE 是 CAMPAIGN_MENU 的 #DIM，:8）', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '魔王');
  for (let cid = 1; cid <= 27; cid += 1) {
    add_chara(fixture, cid);
  }
  fixture.store.set('flag:400', 1);
  const { campaign_menu } = load(fixture);
  // [2] 进派遣 → [1001] 翻到第 2 页 → [999] 退回主菜单 → 再 [2] 进派遣
  // （页码应停在第 2 页）→ [999] 退子菜单 → [999] 退主菜单
  fixture.set_inputs(2, 1001, 999, 2, 999, 999);
  await campaign_menu();
  // 第 2 页才有的 24-27 号按钮每轮各画一次；页码若被重置，第二轮画的是
  // 第 1 页，这四行只会出现一次
  const page_two_rows = fixture.lines_history.filter(
    (l) => l.type === 'button' && l.accelerator >= 24 && l.accelerator <= 27,
  );
  assert.equal(page_two_rows.length, 8, '第 2 页两轮各 4 行');
});

test('派遣：多重校验——临死/无天赋/魔王之影/已派遣/其他状态', async () => {
  const CASES = [
    ['临死中（BASE:0 < 1）', { 'base:1:0': 0, 'talent:1:361': 1 }, undefined],
    ['无对应素质（TALENT:361 == 0）', { 'base:1:0': 1 }, '无法派遣没有'],
    [
      '魔王之影',
      { 'base:1:0': 1, 'talent:1:361': 1, 'talent:1:292': 1 },
      '是魔王之影',
    ],
    [
      '已被派遣（CFLAG:1 == 12）',
      { 'base:1:0': 1, 'talent:1:361': 1, 'cflag:1:1': 12 },
      '已经被派遣了',
    ],
    [
      '其他状态（CFLAG:1 == 2，侵攻中）',
      { 'base:1:0': 1, 'talent:1:361': 1, 'cflag:1:1': 2 },
      '当前无法被派遣',
    ],
  ];
  for (const [label, seed, expect_text] of CASES) {
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '魔王');
    add_chara(fixture, 1, '候选者');
    fixture.store.set('flag:400', 1);
    for (const [k, v] of Object.entries(seed)) {
      fixture.store.set(k, v);
    }
    const { campaign_menu } = load(fixture);
    fixture.set_inputs(2, 1, 999, 999);
    await campaign_menu();
    assert.equal(fixture.store.get('cflag:1:1'), seed['cflag:1:1'], label);
    if (expect_text) {
      assert.ok(
        texts(fixture.lines_history).some((t) => t.includes(expect_text)),
        `${label}：应提示「${expect_text}」`,
      );
    }
  }
});

test('派遣：成功派遣写入状态位与四个楼层/进度 CFLAG', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '魔王');
  add_chara(fixture, 1, '候选者');
  fixture.store.set('flag:400', 1);
  fixture.store.set('base:1:0', 1);
  fixture.store.set('talent:1:361', 1);
  // 楼层/进度四个 CFLAG 预置非目标值，验证确实被重置
  fixture.store.set('cflag:1:501', 9);
  fixture.store.set('cflag:1:507', 1);
  fixture.store.set('cflag:1:520', 9);
  fixture.store.set('cflag:1:521', 0);
  const { campaign_menu } = load(fixture);
  fixture.set_inputs(2, 1, 999, 999);
  await campaign_menu();
  assert.equal(fixture.store.get('cflag:1:1'), 12, ':117 状态位');
  assert.equal(fixture.store.get('cflag:1:501'), 1, ':119 侵攻阶层重置');
  assert.equal(fixture.store.get('cflag:1:507'), 0, ':120 回城标志重置');
  assert.equal(fixture.store.get('cflag:1:520'), 0, ':121 目标阶层重置');
  assert.equal(fixture.store.get('cflag:1:521'), 1, ':122 存档点重置');
  assert.ok(texts(fixture.lines_history).some((t) => t.includes('派遣了')));
});
