/**
 * ere/page/components/screen-block.js 与 menu-button.js 的行为测试
 * （issue #73：画面组件最小集——组件自知占几行、可就地重绘）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试缝，issue #16）。夹具的
 * Row 口径已与引擎对齐（#68）：一次输出调用 = 一个 Row、input() 回显 +1
 * Row、clear(n) 按 Row 删并返回清屏后行数——本文件断言全部建立在其上。
 *
 * 覆盖（对应 #73 验收项）：
 *   1. 行数 = 绘制前后 getLineCount() 差值，不静态声明；内容行数随数据变
 *      （角色列表/参数条形态的合成块——print_palam 的抽象容纳性证明）；
 *   2. Row 口径：一次 printMultiColumns 的多格 = 1 Row（条目数不是行数）；
 *   3. 重绘 = 清锚点跨度 + 重画；重绘后其上方内容完好（直接断言——Row
 *      口径错误的破坏形态正是上方内容被连带抹掉）；
 *   4. input 回显行计入清行跨度；hideUserInput 无回显时跨度自适应；
 *   5. menu_button：正文不写 [编号] 前缀（引擎自动拼）、未选中调暗
 *      #bbbbbb（两条既有 UI 结论在新落点的直接断言）。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

// 加载组件层（每个夹具各一份，load_module 走引擎同款 '#/' 路径）
function load_components(fixture) {
  return {
    screen_block: fixture.load_module('page/components/screen-block'),
    menu_button: fixture.load_module('page/components/menu-button'),
  };
}

test('行数测量：占几行 = 绘制前后差值，内容行数随数据变（不静态声明）', async () => {
  const fixture = create_era_fixture();
  const {
    screen_block: { ScreenBlock },
  } = load_components(fixture);

  // 可变高度内容的合成形态（角色列表/参数条同类）：行数是数据的函数
  const items = { names: ['甲', '乙', '丙'] };
  const list = new ScreenBlock(() => {
    items.names.forEach((name) => fixture.era.print(name));
  });
  assert.equal(await list.draw(), 3);
  assert.equal(fixture.era.getLineCount(), 3);

  items.names.push('丁', '戊');
  await list.draw(); // draw = 追加（不清屏），行数按新内容重新测量
  assert.equal(list.row_count, 5);
  assert.equal(fixture.era.getLineCount(), 8); // 3 + 5：追加不清屏
});

test('Row 口径：一次 printMultiColumns 的多格 = 1 Row（条目数不是行数）', async () => {
  const fixture = create_era_fixture();
  const {
    screen_block: { ScreenBlock },
  } = load_components(fixture);

  const grid = new ScreenBlock(() => {
    fixture.era.printMultiColumns([
      { type: 'button', content: '甲', accelerator: 1 },
      { type: 'button', content: '乙', accelerator: 2 },
      { type: 'text', content: '丙' },
      { type: 'text', content: '丁' },
    ]);
  });
  assert.equal(await grid.draw(), 1); // 四格共享一个 Row（引擎口径，#68）
  assert.equal(fixture.lines.length, 4); // 条目层仍是 4 条——对拍看格

  await grid.redraw(); // 重绘只清 1 行、重画 1 行
  assert.equal(fixture.era.getLineCount(), 1);
  assert.equal(fixture.lines.length, 4);
});

test('重绘后其上方内容完好（Row 口径错误的破坏形态，直接断言）', async () => {
  const fixture = create_era_fixture();
  const {
    screen_block: { ScreenBlock },
  } = load_components(fixture);

  fixture.era.print('上方一');
  fixture.era.print('上方二');
  const block = new ScreenBlock(() => {
    fixture.era.drawLine({ isSolid: true }); // drawLine 条目的 text 是 ''
    fixture.era.print('块内容甲');
    fixture.era.print('块内容乙');
  });
  await block.draw(); // 块占 row 2-4，上方 row 0-1

  // 模拟一轮交互：普通 input() 回显 +1 Row（引擎实证，夹具已镜像）
  fixture.set_inputs(500);
  await fixture.era.input();
  assert.equal(fixture.era.getLineCount(), 6); // 2 上方 + 3 块 + 1 回显

  await block.redraw();

  // 上方两行原样还在：锚点跨度只清块自身与回显，不越过锚点
  assert.deepEqual(
    fixture.lines.filter((l) => l.row < 2).map((l) => l.text),
    ['上方一', '上方二'],
  );
  // 回显行被锚点跨度消费：总行数回到 上方 2 + 块 3
  assert.equal(fixture.era.getLineCount(), 5);
  // 块内容是重画后的新条目（row 2-4）
  assert.deepEqual(
    fixture.lines.filter((l) => l.row >= 2).map((l) => l.text),
    ['', '块内容甲', '块内容乙'],
  );
});

test('回显两态：计行与不计行（hideUserInput）下重绘都稳定', async () => {
  // 默认：回显 +1 Row，锚点跨度含它——重绘后屏幕回到块自身
  const with_echo = create_era_fixture();
  const {
    screen_block: { ScreenBlock: BlockA },
  } = load_components(with_echo);
  const block_a = new BlockA(() => with_echo.era.print('甲'));
  await block_a.draw();
  with_echo.set_inputs(1);
  await with_echo.era.input();
  assert.equal(with_echo.era.getLineCount(), 2); // 块 1 + 回显 1
  await block_a.redraw();
  assert.equal(with_echo.era.getLineCount(), 1); // 回显被消费

  // system.hideUserInput = true：回显不计行，跨度自适应（少一行照常清净）
  const without_echo = create_era_fixture();
  without_echo.system_config.hideUserInput = true;
  const {
    screen_block: { ScreenBlock: BlockB },
  } = load_components(without_echo);
  const block_b = new BlockB(() => without_echo.era.print('甲'));
  await block_b.draw();
  without_echo.set_inputs(1);
  await without_echo.era.input();
  assert.equal(without_echo.era.getLineCount(), 1); // 无回显
  await block_b.redraw();
  assert.equal(without_echo.era.getLineCount(), 1);
});

test('容纳可变行数的参数条形态（print_palam 的抽象容纳性，#74 同款节奏）', async () => {
  const fixture = create_era_fixture();
  const {
    screen_block: { ScreenBlock },
  } = load_components(fixture);

  fixture.era.print('画面标题（上方内容）');
  // page-train print_palam 的同款形态：条目按每行 3 条排布，行数随条目数变
  const stats = { names: ['润滑', '屈服', '欲望', '恭顺'] };
  const bars = new ScreenBlock(() => {
    const rows = Math.ceil(stats.names.length / 3);
    for (let r = 0; r < rows; r += 1) {
      fixture.era.print(`条${r}`);
    }
  });
  await bars.draw(); // 4 条 → 2 行
  assert.equal(bars.row_count, 2);

  fixture.set_inputs(0);
  await fixture.era.input(); // 一轮交互（回显 +1）
  stats.names = stats.names.slice(0, 1); // 数据变了：1 条 → 1 行
  await bars.redraw();

  // 旧行全清、新行数正确、上方完好：标题 1 + 新块 1
  assert.equal(fixture.era.getLineCount(), 2);
  assert.equal(fixture.lines.filter((l) => l.text === '条0').length, 1);
  assert(!fixture.lines.some((l) => l.text === '条1'), '旧块行必须已被清掉');
  assert(fixture.text_lines().includes('画面标题（上方内容）'));
});

test('menu_button：▌ 前缀、正文不写编号前缀（引擎自动拼）、未选中调暗', () => {
  const fixture = create_era_fixture();
  const {
    menu_button: { menu_button, MENU_BUTTON_DIM_COLOR },
  } = load_components(fixture);

  menu_button('调教目标', 496, true);
  menu_button('助手', 497, false);
  const [dim, lit] = fixture.lines;

  // 正文只带 ▌、不写 [496]（引擎 showAcc 默认为真、自动拼快捷键前缀，
  // 手写会得到 [496] [496] ▌调教目标——PR #30 实机撞见）
  assert.equal(dim.text, '▌调教目标');
  assert.equal(dim.rendered, '[496] ▌调教目标');
  // 未选中调暗：GETDEFCOLOR() - 0x444444 ＝ #bbbbbb（十六进制串直通
  // el-button，命名色在 hover 态拼出非法值——app.asar 实证）
  assert.equal(dim.color, MENU_BUTTON_DIM_COLOR);
  assert.equal(dim.color, '#bbbbbb');

  assert.equal(lit.text, '▌助手');
  assert.equal(lit.rendered, '[497] ▌助手');
  assert.equal(lit.color, undefined); // 选中态不传 color
});
