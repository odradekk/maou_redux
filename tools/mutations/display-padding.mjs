// 变异条目表切片：对齐补位的 NBSP 化（#577——引擎合并连续半角空格，补位
// 字符改 U+00A0，中央实现在 ere/utils/display-width.js）。字段与运行方式见
// tools/mutation-check.mjs 头注释；find 在靶文件里必须恰出现一次。
/** 本分片条数（门 1）：增删条目必须同步改它 */
export const COUNT = 17;

const WIDTH = 'ere/utils/display-width.js';
const TRAIN = 'ere/page/page-train.js';
const LIFE_LIST = 'ere/page/page-life-list.js';
const SOURCE_CHECK = 'ere/event/source-check.js';
const ABLMARK = 'ere/page/components/chara-info-abl-mark.js';
const SAVE_LOAD = 'ere/page/page-save-load.js';
const INFO_SHOW = 'ere/page/page-chara-info-show.js';
const JUEL = 'ere/system/train/juel-check.js';
const COM_CLOTH = 'ere/system/train/com-cloth.js';
const MAIN_MENU = 'ere/page/page-main-menu.js';
const ABLUP = 'ere/system/train/ablup.js';

export default [
  {
    desc: 'M12210 PAD_DISPLAY 补位字符退回半角空格（实机列对齐失效的根因回归）',
    file: WIDTH,
    find: '  return text + NBSP.repeat(Math.max(0, width - display_width(text)));',
    replace:
      "  return text + ' '.repeat(Math.max(0, width - display_width(text)));",
    tests: ['display-width'],
    must_mention: 'pad_display：左对齐，右侧补 NBSP',
  },
  {
    desc: 'M12211 PAD_LEFT 补位字符退回半角空格（实机列对齐失效的根因回归）',
    file: WIDTH,
    find: '  return NBSP.repeat(Math.max(0, width - display_width(text))) + text;',
    replace:
      "  return ' '.repeat(Math.max(0, width - display_width(text))) + text;",
    tests: ['display-width'],
    must_mention: 'pad_left：右对齐，左侧补 NBSP',
  },
  {
    desc: 'M12212 NBSP 常量值退回半角空格（两补位函数与全部 NBSP.repeat 一起失效）',
    file: WIDTH,
    find: "const NBSP = '\\u00A0';",
    replace: "const NBSP = ' '; // 变异：退回半角空格",
    tests: ['display-width'],
    must_mention: 'NBSP 常量是 U+00A0',
  },
  {
    desc: 'M12213 静态门：palam 条后数值改回 padStart 半角空格填充（回退写法）',
    file: TRAIN,
    find: '      outContent: pad_left(String(value), PALAM_VALUE_WIDTH),',
    replace:
      "      outContent: String(value).padStart(PALAM_VALUE_WIDTH, ' '), // 变异：回退",
    tests: ['pad-space-static'],
    must_mention: 'padStart 用半角空格填充',
  },
  {
    desc: 'M12214 静态门：FIGURE_INDENT 改回 padStart 缺省填充（回退写法）',
    file: JUEL,
    find: 'const figure_indent = (n) => pad_left(String(n), 8);',
    replace:
      'const figure_indent = (n) => String(n).padStart(8); // 变异：回退',
    tests: ['pad-space-static'],
    must_mention: 'padStart 缺省填充',
  },
  {
    desc: 'M12215 LIFE_LIST 无 ☆ 的 5 格占位退回半角空格（PRINTS " "*5 的内容）',
    file: LIFE_LIST,
    find: '    fragments.push({ content: NBSP.repeat(5) });',
    replace: "    fragments.push({ content: ' '.repeat(5) }); // 变异：回退",
    tests: ['page-life-list'],
    must_mention: '5 空格占位',
  },
  {
    desc: 'M12216 调教表头的「调教中」后 3 格补位退回半角空格（TRAIN_MAIN :69 内容空格）',
    file: TRAIN,
    find: '    { content: `${chara_callname(target)} 调教中\\u00A0\\u00A0\\u00A0调教者:` },',
    replace:
      '    { content: `${chara_callname(target)} 调教中   调教者:` }, // 变异：回退',
    tests: ['page-train'],
    must_mention: "startsWith('温妮 调教中",
  },
  {
    desc: 'M12217 FIGURE_INDENT_2 的逐档补位退回半角空格（:2513-2520 的算式列对齐）',
    file: SOURCE_CHECK,
    find: '  if (n < 100000) {\n    s += NBSP;\n  }',
    replace: "  if (n < 100000) {\n    s += ' '; // 变异：回退\n  }",
    tests: ['source-check'],
    // 黄金块比对（:107-118）把 U+00A0 归一回空格，拦不住这条；红的是
    // :395-403 的 e2e 断言（「阴核 0+5」那行的 5 格 NBSP），故指它
    must_mention: '参数变动行（阴核 0+5）',
  },
  {
    desc: 'M12218 SHOW_INFO_MARK 刻印行的 3 格列间隙退回半角空格（:1004-1008）',
    file: ABLMARK,
    find: '      content: `${NBSP.repeat(index === 0 ? 1 : 3)}${MARK_LABELS[index]}:LV${level} `,',
    replace:
      "      content: `${index === 0 ? ' ' : '   '}${MARK_LABELS[index]}:LV${level} `, // 变异：回退",
    tests: ['chara-info-show'],
    must_mention: '四枚刻印行逐字复现',
  },
  {
    desc: 'M12219 SAVEINFO 无调教对象的 24 格补位退回半角空格（%("",24%）',
    file: SAVE_LOAD,
    find: '    text += NBSP.repeat(24);',
    replace: "    text += ' '.repeat(24); // 变异：回退",
    tests: ['page-save-load'],
    must_mention: '第10日午后',
  },
  {
    desc: 'M12220 献祭演出的 16 格前导退回半角空格（PRINTS "\\s"*16 的内容）',
    file: INFO_SHOW,
    find: '    await era.printAndWait(`${NBSP.repeat(16)}向这伟力的降临献上喝彩！`);',
    replace:
      "    await era.printAndWait(`${' '.repeat(16)}向这伟力的降临献上喝彩！`); // 变异：回退",
    tests: ['chara-info-show'],
    must_mention: '第二句的 16 格前导',
  },
  {
    desc: 'M12221 COM110 穿上胸罩行的 3 格前导退回半角空格（COMF110 :121 PRINTL 内容空格）',
    file: COM_CLOTH,
    find: "    era.print('\\u00A0\\u00A0\\u00A0[3] - 穿上胸罩');",
    replace: "    era.print('   [3] - 穿上胸罩'); // 变异：回退",
    tests: ['com-cloth'],
    must_mention: '穿上胸罩',
  },
  // —— 验收第 1 轮返工：五个「主 agent 要核对的画面」各一条「补位退回半角空格」——
  {
    desc: 'M12222 主菜单持有道具行的行首两格补位退回半角空格（DRAW_HAVEITEMS 的 5 列网格）',
    file: MAIN_MENU,
    find: '    state.line += NBSP.repeat(2);',
    replace: "    state.line += '  '; // 变异：回退半角空格",
    tests: ['page-main-menu'],
    must_mention: '道具行的列补位须是 NBSP',
  },
  {
    desc: 'M12223 名册爱慕标签的两格内补位退回半角空格（LIFE_LIST :49/:53，标签列塌一格）',
    file: LIFE_LIST,
    find: "    return { content: '<爱\\u00A0\\u00A0慕>', color: COLOR_LOVE };",
    replace:
      "    return { content: '<爱  慕>', color: COLOR_LOVE }; // 变异：回退半角空格",
    tests: ['page-life-list'],
    must_mention: '爱慕标签的两格内补位须是 NBSP',
  },
  {
    desc: 'M12224 能力行的前导 2 格补位退回半角空格（SHOW_INFO_ABL 的 %…,8,LEFT% 行）',
    file: ABLMARK,
    find: '    row += `${NBSP.repeat(2)}${pad_display(name, 8)} - LV${pad_display(String(level), 2)}`;',
    replace:
      '    row += `${" ".repeat(2)}${pad_display(name, 8)} - LV${pad_display(String(level), 2)}`; // 变异：回退',
    tests: ['chara-info-show'],
    must_mention: '能力行的列补位须是 NBSP',
  },
  {
    desc: 'M12225 结算表 `)` 与 `=` 之间的 12 格补位退回半角空格（JUEL_CHECK :687）',
    file: JUEL,
    find: '      { content: `)${NBSP.repeat(12)}= ` }, // :687 PRINT ) + 12 空格 + "= "',
    replace: '      { content: `)${" ".repeat(12)}= ` }, // 变异：回退半角空格',
    tests: ['juel-check'],
    must_mention: '结算表行的列补位须是 NBSP',
  },
  {
    desc: 'M12226 ablup14 的 EXP 门槛行 6 格前导退回半角空格（ABLUP14 :50）',
    file: ABLUP,
    find: "    era.print(`${NBSP.repeat(6)}${era.get('expname:5')}　${exp5}/${b}`); // :50",
    replace:
      "    era.print(`${' '.repeat(6)}${era.get('expname:5')}　${exp5}/${b}`); // 变异：回退",
    tests: ['ablup'],
    must_mention: 'EXP 门槛行的 6 格前导须是 NBSP',
  },
];
