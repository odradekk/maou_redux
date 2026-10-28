// 变异条目表切片：信息表格改用网格、去掉凑页高的空行（#869，父工单 #813）。
//
// 两类行为各守一半：
//   - 表格侧：每项的名字格与数值格都由 `config.width` 定列、数值格由
//     `config.align: 'right'` 右对齐（原实现用 pad_display/pad_left 把字符串
//     补成定宽）。格宽、对齐、每行项数、以及「一次 printMultiColumns 就是
//     一行」都在这一侧；
//   - 页高侧：六个画面不再补空行凑固定页高（原实现按
//     `REPEAT (NUM_PAGE - L_LCOUNT)` 补，字符终端里用来把页脚钉在屏幕底部）。
//
// 字段与运行方式见 tools/mutation-check.mjs 头注释；find 在目标文件里必须恰
// 出现一次。
/** 本分片条数（门 1）：增删条目必须同步改它 */
export const COUNT = 12;

const TEXT_GRID = 'ere/utils/text-grid.js';
const INFO_EXP = 'ere/system/train/info-exp-screen.js';
const ABLUP = 'ere/system/train/ablup-screen.js';
const ABLMARK = 'ere/page/components/chara-info-abl-mark.js';
const TITLE = 'ere/page/components/chara-info-title.js';
const INTERCEPT = 'ere/page/page-intercept.js';
const INFO_SHOW = 'ere/page/page-chara-info-show.js';

export default [
  // —— 切格工具本身 ——
  {
    desc: 'M16400 每行少切一格（行末那一格被吃掉）',
    file: TEXT_GRID,
    find: '    era.printMultiColumns(cells.slice(start, start + per_row));',
    replace:
      '    era.printMultiColumns(cells.slice(start, start + per_row - 1));',
    tests: ['juel-check'],
    must_mention: '第一行 4 项共 12 格（每项名字格 + 数值格 + 间距格）',
  },
  {
    desc: 'M16401 切行整段删掉（所有格挤进同一行）',
    file: TEXT_GRID,
    find: `  for (let start = 0; start < cells.length; start += per_row) {
    era.printMultiColumns(cells.slice(start, start + per_row));
  }`,
    replace: '  era.printMultiColumns(cells);',
    tests: ['juel-check'],
    must_mention: '2 行表格 + 等级行',
  },
  // —— 经验一览 ——
  {
    desc: 'M16402 经验一览每行项数 4 改 3（每行 9 格）',
    file: INFO_EXP,
    find: 'const EXP_PER_ROW = 4;',
    replace: 'const EXP_PER_ROW = 3;',
    tests: ['juel-check'],
    must_mention: '第一行 4 项共 12 格（每项名字格 + 数值格 + 间距格）',
  },
  {
    desc: 'M16403 数值格改左对齐（数值列不再右对齐）',
    file: TEXT_GRID,
    find: "      config: { align: 'right', width: VALUE_WIDTH },",
    replace: "      config: { align: 'left', width: VALUE_WIDTH },",
    tests: ['juel-check'],
    must_mention: '数值列靠格对齐右对齐，不再用 pad_left 补位',
  },
  {
    desc: 'M16404 经验名的截断宽度 8 改 6（名字被多截两格）',
    file: INFO_EXP,
    find: 'const EXP_NAME_LIMIT = 8;',
    replace: 'const EXP_NAME_LIMIT = 6;',
    tests: ['juel-check'],
    must_mention: '私处经验',
  },
  // —— 保有珠一览 ——
  {
    desc: 'M16405 保有珠一览的项数 12 改 8（末行整排消失）',
    file: ABLUP,
    find: 'const JUEL_ITEMS = 12;',
    replace: 'const JUEL_ITEMS = 8;',
    tests: ['juel-check'],
    must_mention: '4 列 × 3 行',
  },
  {
    desc: 'M16406 项间间距格的列宽 1 改 2（每项 7 列，四项一行超出 24 列）',
    file: TEXT_GRID,
    find: 'const GAP_WIDTH = 1;',
    replace: 'const GAP_WIDTH = 2;',
    tests: ['juel-check'],
    must_mention: '格宽：名字 3 + 数值 2 + 间距 1（每行 4 项占满 24 列）',
  },
  // —— 角色信息的两张表 ——
  {
    desc: 'M16407 能力一览每行项数 4 改 3（每行 6 格）',
    file: ABLMARK,
    find: 'const ABL_PER_ROW = 4;',
    replace: 'const ABL_PER_ROW = 3;',
    tests: ['chara-info-show'],
    must_mention: '4 项 → 1 行',
  },
  {
    desc: 'M16408 刻印格的列宽 6 改 5（24 列凑不满）',
    file: ABLMARK,
    find: 'const MARK_WIDTH = 6;',
    replace: 'const MARK_WIDTH = 5;',
    tests: ['chara-info-show'],
    must_mention: '24 列 ÷ 4 枚',
  },
  {
    desc: 'M16409 刻印行每行枚数由 4 改 3（第四枚被折到下一行）',
    file: ABLMARK,
    find: '  print_cell_grid(cells, MARKS.length);',
    replace: '  print_cell_grid(cells, MARKS.length - 1);',
    tests: ['chara-info-show'],
    must_mention: '四枚在同一行（一次 printMultiColumns）',
  },
  // —— 页高：去掉补空行后的三处“不许再补” ——
  {
    desc: 'M16410 迎击派遣列表末页重新补空行（页脚被推离列表）',
    file: INTERCEPT,
    find: '    // 末页不满整页时不补空行：ere 是滚动视图，页脚紧接列表末行即可',
    replace:
      "    era.print(''); // 变异：重新补一行空行凑页高\n    // 末页不满整页时不补空行：ere 是滚动视图，页脚紧接列表末行即可",
    tests: ['page-intercept'],
    must_mention: '列表与页脚之间没有空行',
  },
  {
    desc: 'M16411 角色信息页尾重新补空行（原为补到 27 行）',
    file: INFO_SHOW,
    find: '    // 末页不补空行（见文件头「不再补行到固定页高」）',
    replace:
      '    era.println(); // 变异：重新补一行空行\n    // 末页不补空行（见文件头「不再补行到固定页高」）',
    tests: ['chara-info-show'],
    must_mention: '最后一条输出是文案行',
  },
];
