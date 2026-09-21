/**
 * @file 玩家设定画面（issue #463）。
 *
 * 源: target/ERB/SYSTEM/CONFIG.ERB（296 行，8 个函数全部移植）。
 *
 * 颜色不镜像：原作 CONFIG_FILTER_SETTING/CONFIG_SHOW_FILTER_STATUS 用
 * SETCOLOR 深灰标记「已过滤」，本项目画面组件不复刻纯视觉状态（同
 * LIFE_BAR/立绘先例，docs/stub-registry.md 相关行）。CONFIG_SHOW_FILTER_STATUS
 * 里颜色是唯一状态载体，改用「〇/×」文字标记保留可读信息，不静默丢弃。
 *
 * 按钮不能拼接：printButton 独占一行，原作 PRINTFORM（不换行）+ CALL 状态
 * 函数（接着打印）拼一行的习惯在这里行不通。凡状态展示依赖独立函数的选项
 * （[13]/[21]/[27]/[29]），改造成`*_text()`纯文本helper，供“行内按钮拼接”与
 * “独立状态函数”两处共用，避免逻辑重复。
 */

const era = require('#/era-electron');
const { game } = require('#/facade/game');
const { chara } = require('#/facade/chara');
const era_flag = require('#/era-utils/era-flag');
const { get_look_info, KIND } = require('#/chara/look-info');
const { ScreenBlock } = require('#/page/components/screen-block');
const { stub_line_wait } = require('#/utils/stub-line');

/**
 * 本文件存根化的原作调用名（docs/stub-registry.md 必须收录每一个，
 * 测试核对固定，同 page-shop.js/event-first.js 的既有先例）。
 */
const STUBBED_CALLS = ['CONFIG_AGE_SETTING', 'MODLIST'];

/** GETBIT(X, n)：FLAG:5 用到位 32-36，位运算在 JS 里按 32 位截断会溢出，改算术运算 */
function getbit(v, n) {
  return Math.floor(v / 2 ** n) % 2;
}

/** INVERTBIT X, n（返回新值；写回由调用方，原因同上） */
function invertbit(v, n) {
  return getbit(v, n) ? v - 2 ** n : v + 2 ** n;
}

/** 5 类过滤的中文标签（CONFIG_FILTER_SETTING/CONFIG_SHOW_FILTER_STATUS 共用） */
const FILTER_LABELS = [
  '爱抚系过滤',
  '器具系过滤',
  '私处性交系过滤',
  '肛门性交系过滤',
  'ＳＭ系过滤',
];

/**
 * @CONFIG_FILTER_SETTING（:3-27）：调教指令过滤开关（FLAG:25 位 0-4，
 * game.train.指令过滤）。
 *
 * 原作 RESTART 不清屏——每次切换都在下方追加一份新菜单，退出（[100]）后
 * 由 @CONFIG 自身的整页重绘（:288-290）统一清掉；本函数按同一形状 1:1，
 * 不额外补清屏（不引入原作没有的行为）。
 */
async function config_filter_setting() {
  for (;;) {
    const v = game.train.指令过滤;
    for (let i = 0; i < FILTER_LABELS.length; i++) {
      // 字符串用 + 拼接而非模板串：ESLint no-irregular-whitespace 默认跳过普通
      // 字符串字面量、不跳过模板字面量，本行的全角空格填充需要避开这条差异
      era.printButton(
        FILTER_LABELS[i] +
          '　' +
          (i <= 1 ? '　' : '') +
          ' 现在：' +
          (getbit(v, i) ? 'ON' : 'OFF'),
        i,
      );
    }
    era.drawLine();
    era.printButton('返回', 100);
    const result = await era.input();
    if (result === 100) {
      return 0;
    }
    if (result >= 0 && result <= 4) {
      game.train.指令过滤 = invertbit(v, result);
    }
  }
}

/** CONFIG_SHOW_FILTER_STATUS 的文本内容（[13] 行内按钮与独立状态函数共用） */
function filter_status_text() {
  const v = game.train.指令过滤;
  const SHORT_LABELS = ['爱抚', '器具', '私处类', '肛门类', 'SM系'];
  return SHORT_LABELS.map(
    (label, i) => label + (getbit(v, i) ? '×' : '〇') + '　',
  ).join('');
}

/**
 * @CONFIG_SHOW_FILTER_STATUS（:30-44）：过滤状态单行摘要。
 */
function config_show_filter_status() {
  era.print(`${filter_status_text()}\n`);
}

/**
 * @CONFIG_VIRGIN_CONCEDED_SETTING（:47-67）：陷落之后处女主动献身发生方式
 * 三态菜单，写 era_flag.virgin_conceded_mode（FLAG:38 = RESULT-1）。
 *
 * FLAG:38 无归属条目、且与属主 system 的 FLAG:37 同属合并区间「37-38」
 * （ownership/flag-ownership.yml），从 page 域裸写会被域检查判定为新增跨域
 * 裸写（tools/domain-ledger.mjs 已冻结、不接受新条目）——改走 era_flag 具名
 * 访问器（yml/Flag.yml 已登记，见 #468 的 arcana_fort_stage 先例）。
 *
 * 原作 WHILE 1 对无效输入 CLEARLINE 1 后重新等待——1:1 保留。
 */
async function config_virgin_conceded_setting() {
  era.printButton('从不发生', 0);
  era.printButton('每人一次', 1);
  era.printButton('持续触发', 2);
  era.drawLine();
  era.printButton('返回', 100);
  for (;;) {
    const result = await era.input();
    if (result >= 0 && result <= 2) {
      era_flag.virgin_conceded_mode = result - 1;
      return 0;
    }
    if (result === 100) {
      return 0;
    }
    await era.clear(1);
  }
}

/** CONFIG_VIRGIN_CONCEDED_STATUS 的文本内容（[21] 行内按钮与独立状态函数共用） */
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
 * @CONFIG_VIRGIN_CONCEDED_STATUS（:70-82）。
 */
function config_virgin_conceded_status() {
  era.print(`${virgin_conceded_status_text()}\n`);
}

/**
 * @CONFIG_PENIS_YOU_SETTING（:85-116）：魔王的阴茎形态设定，写
 * chara(0).chara.阴茎的状态（TALENT:0:318，与 ask_penis_size 共用门面）。
 *
 * 原作单次 INPUT，无重试循环——非 999、非 0-4 的输入直接落到函数尾、
 * 什么也不做（1:1 保留，不补校验）。
 */
async function config_penis_you_setting() {
  era.print('魔王的兵器是如意金箍棒，可大也可小！！\n\n');
  era.printButton('- 普通', 0);
  era.printButton('- 巨根', 1);
  era.printButton('- 短小包茎', 2);
  era.printButton('- 包茎', 3);
  era.printButton('- 马阴茎', 4);
  era.drawLine();
  era.printButton('- 返回', 999);
  const result = await era.input();
  if (result === 999) {
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
    era.print(`你的鸡鸡状态：${PENIS_LABELS[result]}\n`);
    chara(0).chara.阴茎的状态 = result;
  }
  return 0;
}

/** 冒険者性別顯示 的文本内容（[27] 行内按钮与独立状态函数共用） */
function adventurer_gender_status_text() {
  // 冒険者性別（MOD SAVEDATA，魔改新增/魔改使用.ERH:2）本项目无 ere 存储；
  // 原作 FIRST_SETTING（:53）恒初始化新档为 -1（docs/stub-registry.md
  // 「冒険者性別 = -1」行），故恒显示该档对应文案，不做假状态展示
  return '女多男少';
}

/**
 * @冒險者性別顯示（:118-134）。
 */
function adventurer_gender_status() {
  era.print(`${adventurer_gender_status_text()}\n`);
}

/** 卖淫影响 的文本内容（[29] 行内按钮与独立状态函数共用） */
function prostitution_effect_status_text() {
  // 卖淫影响（MOD SAVEDATA，魔改新增/魔改使用.ERH:4）本项目无 ere 存储，
  // DIM 默认 0——原作 CASE 0 的「（默认设置）」注释印证 0 即预期常态，
  // 恒显示该档
  return '【负面】让奴隶的售价下降（默认设置）';
}

/**
 * @卖淫影响（:136-145）。
 */
function prostitution_effect_status() {
  era.print(`${prostitution_effect_status_text()}\n`);
}

function draw_config_page(page) {
  era.drawLine();
  const v5 = game.dungeon.游戏设定;
  // 字符串用 + 拼接而非模板串：ESLint no-irregular-whitespace 默认跳过普通
  // 字符串字面量、不跳过模板字面量，本函数大量全角空格填充需要避开这条差异
  if (page === 0) {
    era.printButton(
      '勇者投降后的凌辱　　　　　现在：' + (getbit(v5, 0) ? '许可' : '禁止'),
      0,
    );
    era.printButton(
      '勇者强化　　　　　　　　　现在：' +
        (getbit(v5, 1) ? '新的勇者会随游戏天数按比例增强' : '勇者等级维持'),
      1,
    );
    era.printButton(
      '怀孕分娩机能　　　　　　　现在：' + (getbit(v5, 2) ? 'ON' : 'OFF'),
      2,
    );
    era.printButton(
      '勇者自动处刑机能　　　　　现在：' + (getbit(v5, 3) ? 'ON' : 'OFF'),
      3,
    );
    era.printButton(
      '怪物迎击　　　　　　　    现在：' +
        (getbit(v5, 4) ? '关闭' : '开启 (+怪物会和迎击的奴隶进行训练)'),
      4,
    );
    era.printButton(
      '显示战斗记录　　　　　　　现在：' + (getbit(v5, 5) ? 'ON' : 'OFF'),
      5,
    );
    era.printButton(
      '自动补充陷阱　　　　　　　现在：' + (getbit(v5, 6) ? 'ON' : 'OFF'),
      6,
    );
    era.printButton(
      'NTR机能　 　　　　　　　　现在：' + (getbit(v5, 7) ? 'ON' : 'OFF'),
      7,
    );
    era.printButton(
      '素质分类显示　　　　　　　现在：' + (getbit(v5, 8) ? 'ON' : 'OFF'),
      8,
    );
    era.printButton(
      '战斗记录的SKIP中断　　　　现在：' + (getbit(v5, 9) ? 'ON' : 'OFF'),
      9,
    );
    era.printButton(
      '怀孕时的迎击・临月调教　  现在：' + (getbit(v5, 10) ? '许可' : '禁止'),
      10,
    );
    era.printButton(
      '服装系统 　　　　　　　　现在：' + (game.system.着衣系统 ? 'ON' : 'OFF'),
      11,
    );
    era.printButton(
      '濒死时自动结束调教 　　　现在：' +
        (game.system.濒死自动结束调教 ? 'ON' : 'OFF'),
      12,
    );
    era.printButton(
      '调教时的过滤　　　　　　 现在：' + filter_status_text(),
      13,
    );
  } else {
    const af = era_flag.adventurer_flags;
    era.printButton(
      '自我介绍式的角色信息　　 现在：' + (getbit(v5, 11) ? 'ON' : 'OFF'),
      14,
    );
    era.printButton(
      '显示角色的年龄/三围　　  现在：' +
        (getbit(v5, 12) ? 'ON' : 'OFF') +
        '/' +
        (getbit(v5, 15) ? 'ON' : 'OFF'),
      15,
    );
    era.printButton(
      '解除勇者登录限制   　 　 现在：' + (getbit(v5, 32) ? 'ON' : 'OFF'),
      16,
    );
    era.printButton(
      '新探索模式         　 　 现在：' + (getbit(v5, 33) ? 'ON' : 'OFF'),
      17,
    );
    era.printButton(
      '显示高级调教指令的名称   现在：' + (getbit(v5, 34) ? 'ON' : 'OFF'),
      18,
    );
    era.printButton(
      '你那宝贝兵器的现状 　　　现在：' + get_look_info(0, KIND.PENIS),
      19,
    );
    era.printButton(
      '自动提升角色能力         现在：' +
        (getbit(v5, 35) ? 'ON' : 'OFF') +
        (getbit(v5, 36) ? ' (仅主要)' : ''),
      20,
    );
    era.printButton(
      '陷落之后处女主动献身　　 现在：' + virgin_conceded_status_text(),
      21,
    );
    // [22] 男冒险者许可：原作 :182 该行菜单文字本身被注释掉（未公开的隐藏
    // 分支），但 :243-245 的分发范围仍含 LOCAL==22——不渲染按钮，只留分发
    era.printButton(
      '勇者出现时的素质表示　　 现在：' + (getbit(af, 1) ? 'ON' : 'OFF'),
      23,
    );
    era.printButton(
      '勇者的恋爱发展　　　　　 现在：' + (getbit(af, 2) ? '许可' : '禁止'),
      24,
    );
    era.printButton(
      '勇者的任务揭示板  　　　 现在：' + (getbit(af, 3) ? '禁止' : '许可'),
      25,
    );
    // [26] MOD开关：CONFIG_MODLIST（状态展示）与 MODLIST（设置动作）均未
    // 移植（MOD/mod开关ver1.0.11/MOD_SWITCH ver1.0.11.ERB，
    // docs/stub-registry.md 新增行）；按钮本体可达，只省略「现在：」预览
    era.printButton('MOD开关', 26);
    era.printButton(
      '出现冒险者的性别限制　　 现在：' + adventurer_gender_status_text(),
      27,
    );
    era.printButton('立绘开关 　　　　 　　 　现在：OFF', 28);
    era.printButton(
      '卖淫对奴隶售价的影响　　 现在：' + prostitution_effect_status_text(),
      29,
    );
    era.printButton('反作弊开关 　　　　 　　 现在：ON（不可开修改）', 30);
  }
}

/**
 * @CONFIG（:206-286）的输入分发，与渲染/输入获取分离（同 page-shop.js 的
 * show_shop/usershop 二分）：[22] 男冒险者许可的菜单文字原作即被注释掉
 * （:182，未公开隐藏分支），不会被任何 printButton 打印，era.input() 的
 * 按钮白名单校验（#130）永远拒收它——必须绕开 era.input() 直调本函数才能
 * 测到，与 page-shop.js 的 110/111、520-530 抽查同一必要性。
 *
 * @param {number} local 原作 LOCAL（RESULT）
 * @param {number} page 当前页（0/1）
 * @returns {Promise<number | null>} 新的 page（未变化的分支原样返回）；
 *   null 表示应退出 @CONFIG（[100] 分支，原作 RETURN 0）
 */
async function dispatch_config(local, page) {
  if (local === 100) {
    return null;
  } else if (local === 101 || local === 102) {
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
    await stub_line_wait(
      'CONFIG_AGE_SETTING',
      '年龄/三围显示开关与种族年龄详细设定',
      '系统设定',
    );
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
  } else if (local === 26) {
    await stub_line_wait('MODLIST', 'MOD 开关', undefined);
  }
  // LOCAL==27/28/29/30：冒険者性別/立绘/卖淫影响/反作弊——四个 MOD
  // SAVEDATA 变量本项目均无 ere 存储（冒険者性別/反作弊见
  // docs/stub-registry.md 对应行；立绘、卖淫影响 DIM 默认 0、无消费点），
  // 维持恒定默认值，不做任何写入（1:1 体现「设置了也不生效」的原作现状）
  return page;
}

/**
 * @CONFIG（:148-290）：玩家设定主菜单，两页翻页，[100] 返回。
 *
 * 导航行（[102]上一页/[100]返回/[101]下一页）原作用 PRINT/PRINT/PRINTL
 * 拼在同一行；本引擎 printButton 独占一行（AGENTS.md 已确认的渲染层约束），
 * 改竖排三个按钮，功能（编号与文案）不变，只是不再横排——同 LIFE_BAR/立绘
 * 先例，视觉排布不镜像。
 */
async function config_menu() {
  let page = 0;
  const block = new ScreenBlock(() => draw_config_page(page));
  for (;;) {
    await block.redraw();
    era.printButton('上一页', 102);
    era.printButton('返回', 100);
    era.printButton('下一页', 101);
    const local = await era.input();
    const next_page = await dispatch_config(local, page);
    if (next_page === null) {
      return 0;
    }
    page = next_page;
  }
}

module.exports = {
  STUBBED_CALLS,
  config_filter_setting,
  config_show_filter_status,
  config_virgin_conceded_setting,
  config_virgin_conceded_status,
  config_penis_you_setting,
  adventurer_gender_status,
  prostitution_effect_status,
  config_menu,
  dispatch_config,
};
