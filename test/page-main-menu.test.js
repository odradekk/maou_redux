/**
 * ere/page/page-main-menu.js 与 ere/page/page-shop.js 的行为测试
 * （issue #23：主菜单骨架）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点，issue #16）。主菜单
 * 不读 gamebase，无须 preset_gamebase；角色数（CHARANUM 的等价物）经夹具的
 * seed_chara 预置。
 *
 * 覆盖：
 *   1. 状态行：年/月/日/第几日/时段/所持金取自真实变量（包装层），整行
 *      粗体、右对齐、满月之日黄色标注；
 *   2. 六个功能入口：编号、正文、引擎渲染文本、明暗（@MENU_BUTTON 近似）；
 *   3. 防御性修正（@DRAW_MAINMENU :20-39 / @EVENTSHOP :7-12）：越界、
 *      同人、占用三态重置；
 *   4. 四个子面板与指令面板的存根占位；
 *   5. @SHOW_SHOP 的日期钳制（玩家看到的开局是「第 0 年 1 月 1 日」）；
 *   6. 存根清单核对（docs/stub-registry.md）；
 *   7. #73 画面组件迁入：商店轮的就地重绘（不涨屏、上方内容完好、分发期
 *      临时输出被消费、跨会话锚点重新起算）。
 *
 * 已知未测行（变异测试实证，勿误当守卫）：page-shop.js 的 eventshop() 里
 * @EVENTSHOP :7-12 的指针钳制——删掉它 115 条全绿（误报通过）。原因：run_shop
 * 里紧随其后的 draw_main_menu 自带同一份钳制（原作同构，@SHOW_SHOP 恒调
 * @DRAW_MAINMENU，两份钳制互为冗余兜底），不设钩子无法在两者之间观测。
 * 它是 1:1 保真，行为守卫由 draw 侧的三条防御性修正用例承担。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

// 便捷：预设状态后画一次主菜单，返回夹具
function draw_menu_with(preset) {
  const fixture = create_era_fixture();
  const era_flag = fixture.load_module('era-utils/era-flag');
  preset(fixture, era_flag);
  fixture.load_module('page/page-main-menu').draw_main_menu();
  return { fixture, era_flag };
}

// 按编号取按钮记录（rendered = 引擎实际显示的文本）
function button_of(fixture, accelerator) {
  return fixture.lines.find(
    (line) => line.type === 'button' && line.accelerator === accelerator,
  );
}

// 严格夹具下加入角色要先有预设（#35 镜像的引擎守卫）。本文件只关心「角色在
// 不在已加入列表里」，预设取最小形状即可；真实预设的正确性由
// test/chara-yml.test.js 用引擎代码比对。
function join_chara(fixture, id) {
  fixture.seed_chara(id, { id, name: `角色${id}` });
  fixture.era.addCharacter(id);
}

test('状态行：年/月/日/第几日/时段/所持金取自真实变量，整行粗体', () => {
  const { fixture } = draw_menu_with((_, era_flag) => {
    era_flag.day_count = 730; // 730/365 = 2 → 第2年；第731日
    era_flag.month = 3;
    era_flag.date = 2;
    era_flag.time = 0;
    era_flag.money = 12345;
  });

  const status = fixture.text_lines().find((line) => line.includes('所持金'));
  assert.ok(status, '状态行必须输出');
  // 数值全部来自包装层变量（变异任一读数来源都会在此红）
  assert(status.includes('第2年'));
  assert(status.includes('3月2日'));
  assert(status.includes('第731日'));
  assert(status.includes('上午'));
  assert(status.includes('(所持金：12345 pts.)'));

  // :53 FONTBOLD 整行粗体（片段级携带）；:54 ALIGNMENT RIGHT 后还原左对齐
  const record = fixture.lines.find((line) => line.text?.includes('所持金'));
  assert(record.content.every((frag) => frag.fontWeight === 'bold'));
  assert(
    fixture.calls.some((c) => c.api === 'setAlign' && c.args[0] === 'right'),
  );
  assert(
    fixture.calls.some((c) => c.api === 'setAlign' && c.args[0] === 'left'),
  );
});

// —— BGM（issue #69：原作 :11-17 是否启用背景音乐 == 1 → PLAYBGM 据点2）——

test('BGM：开关开时播据点2（循环），新档默认（0）不播', () => {
  // 新档默认：audio:0 无声明默认值（erh:3），恒 0 → 不播（原作新档同款）
  const silent = draw_menu_with(() => {});
  assert.deepEqual(silent.fixture.music, []);

  // 开关开：PLAYBGM "据点2.mp3"（注册名即文件名）+ Emuera 默认循环 → 显式 loop
  const playing = draw_menu_with((fixture) => {
    fixture.store.set('audio:0', 1);
    fixture.seed_res('据点2.mp3', 'audio');
  });
  assert.deepEqual(playing.fixture.music, [
    {
      api: 'play',
      names: ['据点2.mp3'],
      config: { loop: true },
      played: '据点2.mp3',
    },
  ]);
});

test('BGM：资源未启用时静默落空，主菜单照常渲染（resource: false 回退）', () => {
  const { fixture } = draw_menu_with((fixture) => {
    fixture.store.set('audio:0', 1);
    // 不 seed_res：引擎 res 表为空 → playMusic 找不到注册音频、返回 false
  });

  // 播放意图已记录、但 played 为空（引擎语义：查无注册音频不报错）
  assert.deepEqual(fixture.music, [
    {
      api: 'play',
      names: ['据点2.mp3'],
      config: { loop: true },
      played: null,
    },
  ]);
  // 画面不受影响：状态行照常输出
  assert(fixture.text_lines().some((line) => line.includes('所持金')));
});

test('状态行：TIME != 0 显示下午', () => {
  const { fixture } = draw_menu_with((_, era_flag) => {
    era_flag.day_count = 0;
    era_flag.month = 1;
    era_flag.date = 1;
    era_flag.time = 1;
    era_flag.money = 10000;
  });

  const status = fixture.text_lines().find((line) => line.includes('所持金'));
  assert(status.includes('第0年'));
  assert(status.includes('下午'));
  assert(!status.includes('上午'));
});

test('满月之日：DAY:2 == 15 时追加黄色《满月》', () => {
  const full_moon = draw_menu_with((_, era_flag) => {
    era_flag.month = 1;
    era_flag.date = 15;
  });
  const record = full_moon.fixture.lines.find((line) =>
    line.text?.includes('所持金'),
  );
  assert(record.text.includes('《满月》'));
  // SETCOLORBYNAME Yellow：标注片段带颜色、其余片段无色
  const marked = record.content.find((frag) => frag.content === '《满月》');
  assert.equal(marked.color, 'yellow');

  const not_full = draw_menu_with((_, era_flag) => {
    era_flag.month = 1;
    era_flag.date = 14;
  });
  assert(!not_full.fixture.text_lines().some((l) => l.includes('《满月》')));
});

test('六个功能入口：编号、正文与引擎渲染文本（不写手写 [编号] 前缀）', () => {
  const { fixture } = draw_menu_with(() => {});

  const expected = [
    [496, '▌调教目标'],
    [497, '▌助手'],
    [500, '▌物品/技能'],
    [501, '▌持有陷阱'],
    [504, '▌地城概况'],
    [505, '▌地城日常'],
  ];
  for (const [accelerator, text] of expected) {
    const button = button_of(fixture, accelerator);
    assert.ok(button, `入口 ${accelerator} 必须显示`);
    assert.equal(button.text, text);
    // showAcc 默认为真：引擎自动拼 `[快捷键] 正文`；手写前缀会得到双编号
    // （PR #30 的教训，断言 rendered 即可固定）
    assert.equal(button.rendered, `[${accelerator}] ${text}`);
  }
});

test('入口明暗：未选中调暗（@MENU_BUTTON 近似），选中正常色', () => {
  // 开局常态：TARGET=-1 / ASSI=0 / FLAG:36=0 → 496、497 暗，500 亮
  const fresh = draw_menu_with((fixture) => {
    fixture.store.set('flag:10005', -1); // target
    fixture.store.set('flag:10006', 0); // assi
  });
  assert.equal(button_of(fresh.fixture, 496).color, '#bbbbbb');
  assert.equal(button_of(fresh.fixture, 497).color, '#bbbbbb');
  assert.equal(button_of(fresh.fixture, 500).color, undefined);
  assert.equal(button_of(fresh.fixture, 501).color, '#bbbbbb');

  // 已选择：加入两个可选角色，target=31、assi=100、面板切到 4（地城概况）
  //（指针值必须取自已加入列表，否则先被防御性修正钳掉）
  const chosen = draw_menu_with((fixture, era_flag) => {
    join_chara(fixture, 0);
    join_chara(fixture, 31);
    join_chara(fixture, 100);
    era_flag.target = 31;
    era_flag.assi = 100;
    fixture.store.set('flag:36', 4);
  });
  assert.equal(button_of(chosen.fixture, 496).color, undefined);
  assert.equal(button_of(chosen.fixture, 497).color, undefined);
  assert.equal(button_of(chosen.fixture, 504).color, undefined);
  assert.equal(button_of(chosen.fixture, 500).color, '#bbbbbb');
  assert.equal(button_of(chosen.fixture, 505).color, '#bbbbbb');
});

test('防御性修正：编号不在已加入角色列表时重置为未选择', () => {
  const { era_flag } = draw_menu_with((fixture, era_flag) => {
    join_chara(fixture, 0); // CHARANUM = 1：序号世界里合法的只有 0
    era_flag.target = 5; // 越界（原作 :20-21 TARGET > CHARANUM-1）
    era_flag.assi = 3; // 越界（原作 :23-25）
  });
  assert.equal(era_flag.target, -1);
  assert.equal(era_flag.assi, -1);

  // ID 语义：已加入 [0, 31] 时 ID 31 合法（原作序号判据会误杀，ere 侧按
  // 「不在已加入列表」移植，见 page-main-menu.js 的说明）
  const id_world = draw_menu_with((fixture, era_flag) => {
    join_chara(fixture, 0);
    join_chara(fixture, 31);
    era_flag.target = 31;
    era_flag.assi = 0;
  });
  assert.equal(id_world.era_flag.target, 31, '合法 ID 不被误杀');
});

test('防御性修正：调教目标与助手指向同一人时重置助手', () => {
  const { era_flag } = draw_menu_with((fixture, era_flag) => {
    join_chara(fixture, 0);
    join_chara(fixture, 31);
    era_flag.target = 31;
    era_flag.assi = 31;
  });
  // 原作 :27-29 SIF ASSI == TARGET → ASSI = -1；TARGET 保留
  assert.equal(era_flag.assi, -1);
  assert.equal(era_flag.target, 31);
});

test('防御性修正：所指角色被占用（CFLAG:x:1 != 0）时重置', () => {
  const { era_flag } = draw_menu_with((fixture, era_flag) => {
    join_chara(fixture, 0);
    join_chara(fixture, 1);
    join_chara(fixture, 31);
    era_flag.target = 31;
    era_flag.assi = 1;
    fixture.store.set('cflag:31:1', 2); // 目标被占用
    fixture.store.set('cflag:1:1', 0); // 助手未占用
  });
  assert.equal(era_flag.target, -1, 'CFLAG:TARGET:1 != 0 → TARGET = -1');
  assert.equal(era_flag.assi, 1, '未占用的助手保留');
});

test('四个子面板：按 FLAG:36 分发——物品/陷阱占位，地城两面板真身（#180）', () => {
  const stub_cases = [
    [0, 'DRAW_HAVEITEMS', '物品/技能面板'],
    [1, 'DRAW_HAVETRAPS', '持有陷阱面板'],
    // ELSE 分支（:197-198）：未知值回落物品/技能面板
    [2, 'DRAW_HAVEITEMS', '物品/技能面板'],
  ];
  for (const [flag_value, erb_name, label] of stub_cases) {
    const { fixture } = draw_menu_with((f) => {
      f.store.set('flag:36', flag_value);
    });
    const stubs = fixture
      .text_lines()
      .filter((line) => line.includes('docs/stub-registry.md'));
    assert(
      stubs.some((line) => line.includes(`@${erb_name}`)),
      `FLAG:36=${flag_value} 应占位 @${erb_name}，实际 ${stubs}`,
    );
    assert(
      stubs.some((line) => line.includes(label)),
      `占位行应标注面板名 ${label}`,
    );
  }
  // 4/5 是真身：不再打子面板占位行，读数内容可见
  for (const [flag_value, marker] of [
    [4, '迷宫Lv'],
    [5, '威望值'],
  ]) {
    const { fixture } = draw_menu_with((f) => {
      f.store.set('flag:36', flag_value);
    });
    assert.ok(
      fixture.text_lines().some((line) => line.includes(marker)),
      `FLAG:36=${flag_value} 应显示真身读数「${marker}」`,
    );
    // 子面板本体不再占位（DAILY 尾部的 DISPLAY_DUNGEON_DAILY 是另一存根，
    // 其占位行仍合法）
    assert(
      !fixture
        .text_lines()
        .some((line) =>
          line.includes(
            `@${flag_value === 4 ? 'DRAW_DUNGEON_OVERVIEW' : 'DRAW_DUNGEON_DAILY'}`,
          ),
        ),
      `FLAG:36=${flag_value} 的子面板本体不再打占位行`,
    );
  }
});

test('骨架结构：双线/单线分隔、Commands 标题与指令面板占位', () => {
  const { fixture } = draw_menu_with(() => {});

  const dividers = fixture.lines.filter((line) => line.type === 'divider');
  // :45/:320 双线 ═ 以 solid 近似，中间三条单线 ─ 以 dashed 近似
  assert.equal(dividers.length, 5);
  assert.equal(dividers[0].border, 'solid');
  assert.equal(dividers[dividers.length - 1].border, 'solid');
  assert(dividers.slice(1, -1).every((d) => d.border === 'dashed'));

  // :207 ▌Commands 标题（粗体）+ 指令面板渲染占位（随首个指令子系统票；
  // 输入分发本体在 page-shop.js，#24）
  const title = fixture.text_lines().find((line) => line.includes('Commands'));
  assert.ok(title);
  const title_record = fixture.lines.find((line) =>
    line.text?.includes('Commands'),
  );
  assert(title_record.content.every((frag) => frag.fontWeight === 'bold'));
  assert(
    fixture.text_lines().some((line) => line.includes('@DRAW_MAINMENU')),
    '指令面板占位行必须含 @DRAW_MAINMENU（可检索）',
  );
});

test('[100] 调教：A > 0 时是可点按钮，A == 0 时退化为灰色 [---] 占位', () => {
  // A > 0：加入一名未被占用的奴隶（魔王不计入）
  const on = draw_menu_with((fixture) => {
    join_chara(fixture, 0);
    join_chara(fixture, 31);
  });
  const enter = button_of(on.fixture, 100);
  assert.ok(
    enter,
    'A > 0 时 [100] 调教必须是按钮——没有它，调教入口在实机上不存在',
  );
  assert.equal(enter.rendered, '[100] 调教');
  assert.equal(
    enter.text,
    '调教',
    '按钮正文不得手写 [100] 前缀（引擎的 showAcc 会拼，PR #30）',
  );

  // A == 0：只有魔王，原作 :229-231 退化为灰色 [---]（不可选）
  const off = draw_menu_with((fixture) => {
    join_chara(fixture, 0);
  });
  assert.equal(
    button_of(off.fixture, 100),
    undefined,
    'A == 0 时不得渲染可点的 [100]',
  );
  const placeholder = off.fixture.lines.find((line) =>
    line.text?.includes('[---]'),
  );
  assert.ok(placeholder, 'A == 0 时必须留灰色 [---] 占位（原作 PRINTLC）');
});

test('[109] 侵略：无条件渲染按钮（原作 :283 无守卫），正文无手写前缀', () => {
  // 原作 :282-283 无条件 PRINTLCD [109] 侵略（对照 [100] 的 IF A > 0 守卫）
  // ——新档（A == 0）也必须打。分支真身自 #117 起（usershop 109 → INVASION
  // + BEGIN TURNEND），#129 起入口存在：没有这枚按钮，引擎的 input() 拒收
  // 109（「输入不合法」），整条侵略线在实机上不存在。
  const fresh = draw_menu_with(() => {});
  const invade = button_of(fresh.fixture, 109);
  assert.ok(
    invade,
    '侵略必须是按钮——没有 [109]，整条侵略线在实机上入口不存在（#129）',
  );
  assert.equal(invade.rendered, '[109] 侵略');
  assert.equal(
    invade.text,
    '侵略',
    '按钮正文不得手写 [109] 前缀（引擎的 showAcc 会拼，PR #30）',
  );
});

test('[200]/[300]：保存/读取按钮无条件渲染（原作 :303/:306 无守卫），正文无手写前缀', () => {
  // 原作 :303 PRINTLCD [200] 保存 / :306 PRINTLCD [300] 读取，前均无 IF
  // 守卫，无条件渲染（对照 [100] 的 IF A > 0）。分发真身自 #136 起在
  // usershop 的 200/300 分支，但渲染侧此前从未画过按钮——引擎的 input()
  // 只送达已打印按钮的快捷键，据点两处存读档入口在实机上不存在
  // （#136 勘误评论移交 #137）。这一条是本次缺口的正主：#136 的用例直接
  // 驱动 save_game()/load_game()，绕过主菜单 input()，「入口存在」从未
  // 被覆盖（夹具的按钮白名单 #130 随 printButton 自动放行 200/300——
  // 想写「经主菜单进存档界面」的用例，输入合法性即由此保证）
  const fresh = draw_menu_with(() => {});
  const save = button_of(fresh.fixture, 200);
  assert.ok(
    save,
    '保存必须是按钮——没有 [200]，据点存档入口在实机上不存在（#137）',
  );
  assert.equal(save.rendered, '[200] 保存');
  assert.equal(save.text, '保存', '正文不得手写 [200] 前缀（PR #30）');
  const load = button_of(fresh.fixture, 300);
  assert.ok(
    load,
    '读取必须是按钮——没有 [300]，据点读档入口在实机上不存在（#137）',
  );
  assert.equal(load.rendered, '[300] 读取');
  assert.equal(load.text, '读取', '正文不得手写 [300] 前缀（PR #30）');
});

test('@SHOW_SHOP 日期钳制：月/日小于 1 时钳成 1（开局显示 1月1日）', async () => {
  const fixture = create_era_fixture();
  const era_flag = fixture.load_module('era-utils/era-flag');
  // @EVENTFIRST 只初始化 month=1，date/day_count/time 留 0；SHOW_SHOP 再把
  // date 钳成 1——还原开局现场（month 也一并钳，照搬 :33-36 两条 SIF）
  era_flag.month = 0;
  era_flag.date = 0;
  const { run_shop } = fixture.load_module('page/page-shop');

  await assert.rejects(() => run_shop(), /预置输入已耗尽/);
  assert.equal(era_flag.month, 1);
  assert.equal(era_flag.date, 1);
  // 主菜单确实画出来了（含状态行与入口）
  assert(
    fixture.text_lines().some((line) => line.includes('所持金')),
    'SHOP 处理器必须绘制主菜单',
  );
  assert(button_of(fixture, 496));
});

test('@SHOW_SHOP 日期钳制：正常日期不动', async () => {
  const fixture = create_era_fixture();
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.month = 5;
  era_flag.date = 20;
  const { run_shop } = fixture.load_module('page/page-shop');

  await assert.rejects(() => run_shop(), /预置输入已耗尽/);
  assert.equal(era_flag.month, 5);
  assert.equal(era_flag.date, 20);
});

test('存根清单可检索：docs/stub-registry.md 收录这张票全部待办', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = fixture.load_module('page/page-main-menu');
  const registry_path = path.resolve(
    __dirname,
    '..',
    'docs',
    'stub-registry.md',
  );
  const registry = fs.readFileSync(registry_path, 'utf8');

  // 先固定名单本身（漏登记会在此红，#22 验收抓过的误报通过形态），再核对清单。
  // DRAW_DUNGEON_OVERVIEW / DRAW_DUNGEON_DAILY 自 #180 起为真身（本文件下方），
  // 移出；DAILY 尾部的 DISPLAY_DUNGEON_DAILY（地城日常的部下日程）入名单
  assert.deepEqual(STUBBED_CALLS, [
    'DRAW_HAVEITEMS',
    'DRAW_HAVETRAPS',
    'DISPLAY_DUNGEON_DAILY',
    'DRAW_MAINMENU',
  ]);
  // 运行时占位的存根必须在清单里（删清单行或删存根不同步，都会在这里红）
  for (const name of STUBBED_CALLS) {
    assert(registry.includes(name), `存根清单缺少 ${name}`);
  }
  // 登记型待办（无运行时占位，只注释 + 清单）：page-shop.js 的商店段
  for (const name of [
    'CLEAR_SHOP',
    'ITEM_SHOP',
    'ITEM_SHOP_TRAP',
    'SAVESTR:0',
    '是否启用背景音乐',
  ]) {
    assert(registry.includes(name), `存根清单缺少 ${name}`);
  }
});

// —— #73：主菜单画面组件的就地重绘（商店轮集成）——
// 组件层单元（行数测量、Row 的计法、回显跨度）在 test/screen-block.test.js；
// 这里钉调用点：重绘只发生在玩家交互之后、锚点不越过上方内容。

// 预置两行上方内容后跑 n 轮商店轮；输入队列耗尽时按预期炸出，返回终态夹具
async function run_shop_rounds(inputs) {
  const fixture = create_era_fixture();
  fixture.era.print('上方一');
  fixture.era.print('上方二');
  const { run_shop } = fixture.load_module('page/page-shop');
  fixture.set_inputs(...inputs);
  await assert.rejects(() => run_shop(), /预置输入已耗尽/);
  return fixture;
}

test('主菜单就地重绘：轮数增加不涨屏、上方内容完好（重绘只在交互之后）', async () => {
  const one_round = await run_shop_rounds([500]);
  const two_rounds = await run_shop_rounds([500, 500]);

  for (const fixture of [one_round, two_rounds]) {
    // 上方内容原样：锚点之上不被重绘触碰（Row 的计法错误的破坏形态正是
    // 上方内容被连带抹掉——组件层已有直接断言，这里在真实调用点上再钉）
    assert.deepEqual(
      fixture.lines.filter((l) => l.row < 2).map((l) => l.text),
      ['上方一', '上方二'],
    );
    // 菜单只此一份：就地重绘不追加第二份
    assert.equal(
      fixture.lines.filter((l) => l.text?.includes('Commands')).length,
      1,
    );
  }
  // 一轮与两轮的终态行数一致：每轮的 input 回显行被锚点跨度消费，
  // 屏幕不随交互次数增长（重绘前必有交互——无输入不会推进到重绘）
  assert.equal(one_round.era.getLineCount(), two_rounds.era.getLineCount());
});

test('分发期输出玩家先看到再被重绘清掉：点未移植入口不留残行', async () => {
  // 102（地下城存根）不印按钮（按钮与真身同票落地的政策），引擎不会送达
  // （#130）；已打印的存根分发入口是 [497] 助手（A > 0 才进 @SELECT_ASSI
  // 存根），用它驱动同一形态
  const stub_round = create_era_fixture();
  stub_round.era.print('上方一');
  stub_round.era.print('上方二');
  join_chara(stub_round, 31); // A = 1：497 直达存根分支
  const { run_shop: run_stub } = stub_round.load_module('page/page-shop');
  stub_round.set_inputs(497, 500);
  await assert.rejects(() => run_stub(), /预置输入已耗尽/);
  // 对照轮带同一世界（A = 1）：差异只剩「分发是否打存根」这一个变量
  const plain = create_era_fixture();
  plain.era.print('上方一');
  plain.era.print('上方二');
  join_chara(plain, 31);
  const { run_shop: run_plain } = plain.load_module('page/page-shop');
  plain.set_inputs(500, 500);
  await assert.rejects(() => run_plain(), /预置输入已耗尽/);

  // 分发打了存根 → waitAnyKey 等键时屏幕上最新行就是存根（玩家看得到）→
  // 下一轮重绘才清掉。waits.rows_at_wait 是调用瞬间的行数，直接钉住
  // 「看到」发生在「消失」之前（#73 发回的验收项）。
  const waited = stub_round.waits.filter((w) => w.waited);
  assert.equal(waited.length, 1, '497 分支必须等一次键');
  const at_wait = stub_round.lines_history.filter(
    (l) => l.row !== undefined && l.row < waited[0].rows_at_wait,
  );
  assert(
    at_wait.some((l) => l.text?.includes('SELECT_ASSI')),
    '等键时存根行必须已在屏幕上',
  );
  // 重绘之后才消失：终态与无存根轮逐行同高、屏幕上看不见存根
  assert(!stub_round.text_lines().some((l) => l.includes('SELECT_ASSI')));
  assert.equal(stub_round.era.getLineCount(), plain.era.getLineCount());
});

test('无分发输出的一轮（面板切换）零等待：菜单重绘本身不得卡键', async () => {
  // 500 只写 FLAG:36、不打存根。allowWait 镜像下菜单重绘会置位，但本轮
  // 没有 waitAnyKey 调用——无条件等键会让每轮都卡一次（验收报出禁止）
  const fixture = await run_shop_rounds([500]);
  assert.equal(fixture.waits.length, 0);
});

test('跨会话锚点：TRAIN 转场后重进 SHOP，上方内容不被旧锚点清掉', async () => {
  const fixture = create_era_fixture();
  const era_flag = fixture.load_module('era-utils/era-flag');
  join_chara(fixture, 0);
  join_chara(fixture, 31);
  era_flag.target = 31; // 100 分支无需选人，直达 BEGIN TRAIN
  const { run_shop } = fixture.load_module('page/page-shop');

  // 第一局：100 → BEGIN TRAIN 信号上抛，商店轮随之结束
  fixture.set_inputs(100);
  await assert.rejects(() => run_shop(), /BEGIN TRAIN/);

  // 状态画面整屏清空 + 新局的上方内容（EVENTFIRST 产物的形态）
  await fixture.era.clear();
  fixture.era.print('新局上方一');
  fixture.era.print('新局上方二');

  // 重进 SHOP：菜单组件随状态进入新建、锚点重新起算——上方内容完好、
  // 菜单纯此一份（模块级单例会拿第一局的旧锚点把这两行清掉）
  fixture.set_inputs(500);
  await assert.rejects(() => run_shop(), /预置输入已耗尽/);
  assert.deepEqual(
    fixture.lines.filter((l) => l.row < 2).map((l) => l.text),
    ['新局上方一', '新局上方二'],
  );
  assert.equal(
    fixture.lines.filter((l) => l.text?.includes('Commands')).length,
    1,
  );
});
