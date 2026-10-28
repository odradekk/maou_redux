/**
 * @file 玩家设定画面（issue #463）。
 *
 * 颜色不镜像：过滤开关与过滤状态原本用 SETCOLOR 深灰标记「已过滤」，
 * 本项目画面组件不复刻纯视觉状态（同 LIFE_BAR/立绘先例）。过滤状态里
 * 颜色是唯一状态载体，改用「〇/×」文字标记保留可读信息，不静默丢弃。
 *
 * 设置项按网格排：标签是按钮格、状态是文本格，两格定宽同事一行（
 * `config_row`）。状态文案仍由 `*_text()` 纯文本 helper 提供——它只产文本，
 * 送入状态格，不再塞进按钮正文（按钮正文里的连续空白会被引擎折叠，
 * 补位对不齐）。状态文本没有第二个调用方，不保留独立打印包装。
 *
 * 每个选择循环每轮绘制前换屏（ADR-0009）：画面上只有当前这一屏的菜单。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const era_global = require('#/era-utils/era-global');
const era_modsave = require('#/era-utils/era-modsave');
const { get_look_info, KIND } = require('#/system/chara/look-info');
const { change_screen } = require('#/page/components/screen-change');
const { config_age_setting } = require('#/page/page-config-age');
const { game } = require('#/facade/game');
const { chara } = require('#/facade/chara');
const { print_button_grid } = require('#/utils/button-grid');

/** GETBIT(X, n)：FLAG:5 用到位 32-36，位运算在 JS 里按 32 位截断会溢出，改算术运算 */
function getbit(v, n) {
  return Math.floor(v / 2 ** n) % 2;
}

/** INVERTBIT X, n（返回新值；写回由调用方，原因同上） */
function invertbit(v, n) {
  return getbit(v, n) ? v - 2 ** n : v + 2 ** n;
}

/** 5 类过滤的中文标签（config_filter_setting/filter_status_text 共用） */
const FILTER_LABELS = [
  '爱抚系过滤',
  '器具系过滤',
  '私处性交系过滤',
  '肛门性交系过滤',
  'ＳＭ系过滤',
];

/** 设置项两格的宽度（引擎 24 列网格）：标签按钮 12 列、状态文本 12 列 */
const CONFIG_LABEL_WIDTH = 12;
const CONFIG_STATUS_WIDTH = 12;

/**
 * 一条设置项：标签按钮与状态文本各占一格、同处一行。
 *
 * 状态不再跟在标签正文里补全角空格——引擎渲染按钮时把连续空白折叠成一个
 * 空格，补位在实机上不起作用；两格定宽由网格保证状态列从同一列起算。
 * @param {string} label 设置项名（按钮正文，不带编号前缀）
 * @param {string} status 状态文案（「现在：…」）
 * @param {number} accelerator 选项编号
 */
function config_row(label, status, accelerator) {
  era.printMultiColumns([
    {
      type: 'button',
      accelerator,
      content: label,
      config: { width: CONFIG_LABEL_WIDTH, align: 'left' },
    },
    {
      type: 'text',
      content: status,
      config: { width: CONFIG_STATUS_WIDTH, align: 'left' },
    },
  ]);
}

/**
 * 设定主菜单与两个子菜单的返回键（[100]）。
 * 子菜单画在设定菜单之上，返回键与主菜单同号——两者不同屏，不冲突。
 */
const CONFIG_BACK_KEY = 100;

/**
 * 设定主菜单的两页切换键：[102] 上一页 / [101] 下一页。
 * **与存读档页的号相反**（那边 101 是上一页）——各屏的键位表各自定义，
 * 别按语义猜号。
 */
const CONFIG_PREV_PAGE_KEY = 102;
const CONFIG_NEXT_PAGE_KEY = 101;

/** 魔王兵器设定的返回键（[999]：嵌套子屏避开与页脚 [100] 同号） */
const PENIS_BACK_KEY = 999;

/**
 * config_filter_setting：调教指令过滤开关（FLAG:25 位 0-4，
 * game.train.指令过滤）。
 *
 * 每轮绘制前换屏：切换后的新菜单独占一屏，不与上一轮叠加（ADR-0009）。
 */
async function config_filter_setting() {
  for (;;) {
    await change_screen();
    const v = game.train.指令过滤;
    for (let i = 0; i < FILTER_LABELS.length; i++) {
      config_row(FILTER_LABELS[i], `现在：${getbit(v, i) ? 'ON' : 'OFF'}`, i);
    }
    era.drawLine();
    era.printButton('返回', CONFIG_BACK_KEY);
    const result = await era.input();
    if (result === CONFIG_BACK_KEY) {
      return 0;
    }
    if (result >= 0 && result <= 4) {
      game.train.指令过滤 = invertbit(v, result);
    }
  }
}

/**
 * filter_status_text：过滤状态单行摘要。文本进 [13] 行的状态格（见文件头
 * 「设置项按网格排」），本函数是唯一文本载体，颜色不镜像（改〇/× 文字标记）。
 */
function filter_status_text() {
  const v = game.train.指令过滤;
  const SHORT_LABELS = ['爱抚', '器具', '私处类', '肛门类', 'SM系'];
  return SHORT_LABELS.map(
    (label, i) => label + (getbit(v, i) ? '×' : '〇') + '　',
  ).join('');
}

/**
 * config_virgin_conceded_setting：陷落之后处女主动献身发生方式三态菜单，
 * 写 era_flag.virgin_conceded_mode（FLAG:38 = 选项值-1）。
 *
 * FLAG:38 无归属条目、且与属主 system 的 FLAG:37 同属合并区间「37-38」
 * （ownership/flag-ownership.yml），写经 era_flag 具名访问器（#71；
 * yml/Flag.yml 已登记，见 #468 的 arcana_fort_stage 先例）。
 *
 * 无效输入清一行后重新等待（行为保留）。
 */
async function config_virgin_conceded_setting() {
  era.printButton('从不发生', 0);
  era.printButton('每人一次', 1);
  era.printButton('持续触发', 2);
  era.drawLine();
  era.printButton('返回', CONFIG_BACK_KEY);
  for (;;) {
    const result = await era.input();
    if (result >= 0 && result <= 2) {
      era_flag.virgin_conceded_mode = result - 1;
      return 0;
    }
    if (result === CONFIG_BACK_KEY) {
      return 0;
    }
    await era.clear(1);
  }
}

/**
 * virgin_conceded_status_text：三态文案（从不发生/每人一次/持续触发）。
 * 文本进 [21] 行的状态格，本函数是唯一文本载体。
 */
function virgin_conceded_status_text() {
  const v = era_flag.virgin_conceded_mode;
  if (v <= -1) {
    return '从不发生';
  }
  if (v === 0) {
    return '每人一次';
  }
  return '持续触发';
}

/**
 * config_penis_you_setting：魔王的阴茎状态设定，写
 * chara(0).chara.阴茎的状态（TALENT:0:318，与 ask_penis_size 共用门面）。
 *
 * 单次输入，无重试循环——非 999、非 0-4 的输入直接落到函数尾、无效输入
 * 静默无操作（既有行为，不补校验）。
 *
 * 确认回显是「打印 + 等键」一条显示行——等键保证玩家在下一次整页重绘
 * 清屏前看到结果；ere 侧用 printAndWait 承载该语义，单纯的 print 会在
 * config_menu 下一轮 redraw 里一闪即逝。
 */
async function config_penis_you_setting() {
  // 标题行自成一行——正文不带尾换行（多写 `\n` 会多出空行，#615）
  era.print('魔王的兵器是如意金箍棒，可大也可小！！');
  era.printButton('- 普通', 0);
  era.printButton('- 巨根', 1);
  era.printButton('- 短小包茎', 2);
  era.printButton('- 包茎', 3);
  era.printButton('- 马阴茎', 4);
  era.drawLine();
  era.printButton('- 返回', PENIS_BACK_KEY);
  const result = await era.input();
  if (result === PENIS_BACK_KEY) {
    return 0;
  }
  if (result >= 0 && result <= 4) {
    const PENIS_LABELS = [
      '《普通》',
      '《巨根》',
      '《短小包茎》',
      '《包茎》',
      '《马阴茎》',
    ];
    // 「打印 + 等键」是一条显示行（printAndWait = print + 等键），
    // 正文不带尾换行（#615）
    await era.printAndWait(`你的鸡鸡状态：${PENIS_LABELS[result]}`);
    chara(0).chara.阴茎的状态 = result;
  }
  return 0;
}

/**
 * adventurer_gender_status_text：冒险者性别限制的档位文案。该设定是公共
 * 存档变量，#547 落 yml/Global.yml id 3（era_global.adventurer_gender）：
 * EVENTFIRST 链开局重置 -1，[27] 六档循环。文本进 [27] 行的状态格，
 * 本函数是唯一文本载体。
 */
function adventurer_gender_status_text() {
  switch (era_global.adventurer_gender) {
    case -1:
      return '女多男少';
    case 0:
      return '只有女性';
    case 1:
      return '只有男性';
    case 2:
      return '男多女少';
    case 3:
      return '男女持平';
    case 4:
      return '全是扶她';
    default:
      return '';
  }
}

/**
 * prostitution_effect_status_text：卖淫对奴隶售价影响的档位文案。该设定
 * 是存档变量，#547 落 yml/ModSave.yml id 0（era_modsave.prostitution_effect）：
 * 0 负面（未初始化即 0，文案自带「（默认设置）」）、1 正面、2 无影响。
 * 文本进 [29] 行的状态格，本函数是唯一文本载体。
 */
function prostitution_effect_status_text() {
  if (era_modsave.prostitution_effect === 0) {
    return '【负面】让奴隶的售价下降（默认设置）';
  }
  if (era_modsave.prostitution_effect === 1) {
    return '【正面】让奴隶的售价上升';
  }
  return '【无影响】不会影响奴隶售价';
}

function draw_config_page(page) {
  era.drawLine();
  const v5 = game.dungeon.游戏设定;
  if (page === 0) {
    config_row(
      '勇者投降后的凌辱',
      `现在：${getbit(v5, 0) ? '许可' : '禁止'}`,
      0,
    );
    config_row(
      '勇者强化',
      `现在：${getbit(v5, 1) ? '新的勇者会随游戏天数按比例增强' : '勇者等级维持'}`,
      1,
    );
    config_row('怀孕分娩机能', `现在：${getbit(v5, 2) ? 'ON' : 'OFF'}`, 2);
    config_row('勇者自动处刑机能', `现在：${getbit(v5, 3) ? 'ON' : 'OFF'}`, 3);
    config_row(
      '怪物迎击',
      `现在：${getbit(v5, 4) ? '关闭' : '开启 (+怪物会和迎击的奴隶进行训练)'}`,
      4,
    );
    config_row('显示战斗记录', `现在：${getbit(v5, 5) ? 'ON' : 'OFF'}`, 5);
    config_row('自动补充陷阱', `现在：${getbit(v5, 6) ? 'ON' : 'OFF'}`, 6);
    config_row('NTR机能', `现在：${getbit(v5, 7) ? 'ON' : 'OFF'}`, 7);
    config_row('素质分类显示', `现在：${getbit(v5, 8) ? 'ON' : 'OFF'}`, 8);
    config_row(
      '战斗记录的SKIP中断',
      `现在：${getbit(v5, 9) ? 'ON' : 'OFF'}`,
      9,
    );
    config_row(
      '怀孕时的迎击・临月调教',
      `现在：${getbit(v5, 10) ? '许可' : '禁止'}`,
      10,
    );
    config_row('服装系统', `现在：${game.system.着衣系统 ? 'ON' : 'OFF'}`, 11);
    config_row(
      '濒死时自动结束调教',
      `现在：${game.system.濒死自动结束调教 ? 'ON' : 'OFF'}`,
      12,
    );
    config_row('调教时的过滤', `现在：${filter_status_text()}`, 13);
  } else {
    const af = era_flag.adventurer_flags;
    config_row(
      '自我介绍式的角色信息',
      `现在：${getbit(v5, 11) ? 'ON' : 'OFF'}`,
      14,
    );
    config_row(
      '显示角色的年龄/三围',
      `现在：${getbit(v5, 12) ? 'ON' : 'OFF'}/${getbit(v5, 15) ? 'ON' : 'OFF'}`,
      15,
    );
    config_row(
      '解除勇者登录限制',
      `现在：${getbit(v5, 32) ? 'ON' : 'OFF'}`,
      16,
    );
    config_row('新探索模式', `现在：${getbit(v5, 33) ? 'ON' : 'OFF'}`, 17);
    config_row(
      '显示高级调教指令的名称',
      `现在：${getbit(v5, 34) ? 'ON' : 'OFF'}`,
      18,
    );
    config_row(
      '你那宝贝兵器的现状',
      `现在：${get_look_info(0, KIND.PENIS)}`,
      19,
    );
    config_row(
      '自动提升角色能力',
      `现在：${getbit(v5, 35) ? 'ON' : 'OFF'}${getbit(v5, 36) ? ' (仅主要)' : ''}`,
      20,
    );
    config_row(
      '陷落之后处女主动献身',
      `现在：${virgin_conceded_status_text()}`,
      21,
    );
    // [22] 男冒险者许可：该菜单文字本就是注释态（未公开的隐藏
    // 分支），但分发仍受理 22——不渲染按钮，只留分发
    config_row(
      '勇者出现时的素质表示',
      `现在：${getbit(af, 1) ? 'ON' : 'OFF'}`,
      23,
    );
    config_row(
      '勇者的恋爱发展',
      `现在：${getbit(af, 2) ? '许可' : '禁止'}`,
      24,
    );
    config_row(
      '勇者的任务揭示板',
      `现在：${getbit(af, 3) ? '禁止' : '许可'}`,
      25,
    );
    // [26] MOD开关与 [28] 立绘开关：MOD 子系统与立绘系统均判不移植（#542），
    // 缺内容的入口随占位机制一并删除（#638 按 #574「缺内容的去掉入口」）
    config_row(
      '出现冒险者的性别限制',
      `现在：${adventurer_gender_status_text()}`,
      27,
    );
    config_row(
      '卖淫对奴隶售价的影响',
      `现在：${prostitution_effect_status_text()}`,
      29,
    );
    config_row(
      '反作弊开关',
      `现在：${era_modsave.anti_cheat ? 'OFF（可开修改）' : 'ON（不可开修改）'}`,
      30,
    );
  }
}

/**
 * config_menu 的输入分发，与渲染/输入获取分离（同 page-shop.js 的
 * show_shop/usershop 二分）：[22] 男冒险者许可的菜单文字本就是
 * 注释态（未公开隐藏分支），不会被任何 printButton 打印，era.input() 的
 * 按钮白名单校验（#130）永远拒收它——必须绕开 era.input() 直调本函数才能
 * 测到，与 page-shop.js 的 110/111、520-530 抽查同一必要性。
 *
 * @param {number} local 菜单编号（输入值）
 * @param {number} page 当前页（0/1）
 * @returns {Promise<number | null>} 新的 page（未变化的分支原样返回）；
 *   null 表示应退出 config_menu（[100] 分支）
 */
async function dispatch_config(local, page) {
  if (local === CONFIG_BACK_KEY) {
    return null;
  } else if (local === CONFIG_NEXT_PAGE_KEY || local === CONFIG_PREV_PAGE_KEY) {
    return (page + 1) % 2;
  } else if (local >= 0 && local <= 10) {
    game.dungeon.游戏设定 = invertbit(game.dungeon.游戏设定, local);
  } else if (local === 11) {
    game.system.着衣系统 = game.system.着衣系统 ? 0 : 1;
  } else if (local === 12) {
    game.system.濒死自动结束调教 = game.system.濒死自动结束调教 ? 0 : 1;
  } else if (local === 13) {
    await config_filter_setting();
  } else if (local === 14) {
    game.dungeon.游戏设定 = invertbit(game.dungeon.游戏设定, 11);
  } else if (local === 15) {
    await config_age_setting();
  } else if (local === 16) {
    game.dungeon.游戏设定 = invertbit(game.dungeon.游戏设定, 32);
  } else if (local === 17) {
    game.dungeon.游戏设定 = invertbit(game.dungeon.游戏设定, 33);
  } else if (local === 18) {
    game.dungeon.游戏设定 = invertbit(game.dungeon.游戏设定, 34);
  } else if (local === 19) {
    await config_penis_you_setting();
  } else if (local === 20) {
    let v = game.dungeon.游戏设定;
    if (!getbit(v, 35)) {
      v = invertbit(v, 35);
    } else if (!getbit(v, 36)) {
      v = invertbit(v, 36);
    } else {
      v = v - 2 ** 35 - 2 ** 36;
    }
    game.dungeon.游戏设定 = v;
  } else if (local === 21) {
    await config_virgin_conceded_setting();
  } else if (local >= 22 && local <= 25) {
    era_flag.adventurer_flags = invertbit(
      era_flag.adventurer_flags,
      local - 22,
    );
  } else if (local === 27) {
    // [27] 冒险者性别：-1→0→1→2→3→4→-1 六档循环（era_global 公共存档变量）
    era_global.cycle_adventurer_gender();
  } else if (local === 29) {
    // [29] 卖淫影响：0→1→2→0 三档循环（era_modsave 存档变量）
    era_modsave.cycle_prostitution_effect();
  } else if (local === 30) {
    // [30] 反作弊：0↔1（1 = 关闭反作弊检查，可开修改）
    era_modsave.toggle_anti_cheat();
  }
  return page;
}

/**
 * config_menu：玩家设定主菜单，两页翻页，[100] 返回。
 *
 * 导航行（[102]上一页/[100]返回/[101]下一页）原来竖排三行——当时按「
 * printButton 独占一行」处理；现由按钮网格把它们排回同一行（引擎 24 列），
 * 功能（编号与文案）不变。
 */
async function config_menu() {
  let page = 0;
  for (;;) {
    // 每轮绘制前换屏：画面上只有当前这一屏（ADR-0009）
    await change_screen();
    draw_config_page(page);
    print_button_grid(
      [
        [CONFIG_PREV_PAGE_KEY, '上一页'],
        [CONFIG_BACK_KEY, '返回'],
        [CONFIG_NEXT_PAGE_KEY, '下一页'],
      ],
      3,
    );
    const local = await era.input();
    const next_page = await dispatch_config(local, page);
    if (next_page === null) {
      return 0;
    }
    page = next_page;
  }
}

module.exports = {
  config_filter_setting,
  filter_status_text,
  config_virgin_conceded_setting,
  virgin_conceded_status_text,
  config_penis_you_setting,
  adventurer_gender_status_text,
  prostitution_effect_status_text,
  config_menu,
  dispatch_config,
};
