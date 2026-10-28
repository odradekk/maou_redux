/**
 * @file 经验一览的渲染（juel-check.js 交互循环的首屏调用，issue #47）。
 *
 * 切换角色的调用（临时换目标）归别的调用方（角色信息画面）；
 * juel-check.js 侧不带实参调用（= 当前目标），本文件以显式 cid 形参
 * 承载，切换角色随角色信息票。
 *
 * 初吻/初体验括号行的检查值语义：CFLAG:16（初吻对象）在角色生成路径
 * 置 -1；角色生成的 -1 置位实现前，未声明读值 undefined 经 `|| 0`
 * 当 0 处理（显示「[初吻对象：不明]」，黄金样本差异登记 #47）。
 *
 * 放在 train 域而不是 page/：首屏由 system/train/juel-check.js 的交互循环
 * 调用，系统层不该为了一屏渲染去 require 页面层；页面层的展示画面反过来
 * 用它是允许的方向。
 */

const era = require('#/era-electron');
const { chara_callname } = require('#/utils/callname-utils');
const { slice_display } = require('#/utils/display-width');
const {
  CELLS_PER_ITEM,
  name_value_cells,
  print_cell_grid,
} = require('#/utils/text-grid');

/** 经验一览每行的项数（原版「U % 4 == 0 时换行」的列数） */
const EXP_PER_ROW = 4;
/** 名字的截断宽度（%SUBSTRING(EXPNAME,0,8)% 的 8 字节＝4 个全角字） */
const EXP_NAME_LIMIT = 8;

/**
 * 初吻括号：CFLAG:16 的值域分支。返回空串 = 无此行。
 * @param {number} cid
 * @returns {string}
 */
function kiss_bracket(cid) {
  const flag = era.get(`cflag:${cid}:16`) || 0; // 未声明 → 按 0
  if (flag <= -1) {
    return ''; // IF CFLAG:16 > -1
  }
  const partner = era.get(`cstr:${cid}:4`) ?? '';
  if (flag === 0) {
    return '[初吻对象：不明]'; // LOCAL == -1
  }
  if (flag === 992) {
    return `[初吻对象：${partner}]`;
  }
  if (flag === 993) {
    return '[初吻对象：狂王]';
  }
  if (flag === 994) {
    return '[初吻对象：怪物]';
  }
  if (flag === 995) {
    return '[初吻对象：怪物的阴茎]';
  }
  if (flag === 996) {
    return '[初吻对象：野狗的肛门]';
  }
  if (flag === 997) {
    return '[初吻对象：野狗的阴茎]';
  }
  if (flag === 998) {
    return '[初吻对象：野狗的嘴]';
  }
  if (flag === 999) {
    return '[初吻对象：触手]';
  }
  // %CSTR:4%的 + 部位（按值域）；无命中部位则不带闭括号
  const part =
    flag < 100
      ? '唇]'
      : flag < 300
        ? '阴茎]'
        : flag < 400
          ? '私处]'
          : flag < 500
            ? '肛门]'
            : '';
  return `[初吻对象：${partner}的${part}`;
}

/**
 * 初体验括号：CFLAG:15 的值域分支。返回空串 = 无此行。
 * @param {number} cid
 * @returns {string}
 */
function first_experience_bracket(cid) {
  const flag = era.get(`cflag:${cid}:15`) || 0;
  if (flag <= 0) {
    return ''; // IF CFLAG:15 > 0
  }
  if (flag === 101) {
    return '[初体验对象：蠕虫]';
  }
  if (flag === 102) {
    return '[初体验对象：触手生物]';
  }
  if (flag === 103) {
    return '[初体验对象：野狗]';
  }
  if (flag === 104) {
    return '[初体验对象：怪物]';
  }
  if (flag === 105) {
    return '[初体验对象：狂王]';
  }
  const local = flag - 1;
  if (local === 0) {
    // SAVESTR:0 = 魔王的存档名（#5 决议：callname 承载）
    return `[初体验对象：${chara_callname(0)}]`;
  }
  return `[初体验对象：${era.get(`cstr:${cid}:3`) ?? ''}]`;
}

/**
 * show_info_exp：非零经验一览（4 列）+ 等级行 + 初吻/初体验括号行。
 *
 * 一览是「每行 4 项、每项名字格 + 右对齐数值格 + 间距格」的网格（24 列 =
 * 4 × (3 + 2 + 1)，列结构见 utils/text-grid.js）：列位置由格宽决定，不再用
 * 补位函数把字符串凑成定宽。
 *
 * @param {number} cid 调教目标
 */
function show_info_exp(cid) {
  const cells = [];
  // 序号 0-81 逐项过（82 项固定上界——名字表的断档处
  // EXP 恒 0，被零值检查跳过；ere 侧名字表缺的序号直接跳，等价）
  const keys = era.get('expkeys') || [];
  for (let id = 0; id < 82; id += 1) {
    if (!keys.includes(id)) {
      continue;
    }
    const value = era.get(`exp:${cid}:${id}`) || 0;
    if (value === 0) {
      continue; // SIF EXP:COUNT == 0 → CONTINUE
    }
    // 名字列宽 8 是原版 %SUBSTRING(EXPNAME,0,8)% 的截断（名字表里最长的
    // 「调教自慰经验」正好 8 显示宽）；格内不再补位
    const name = era.get(`expname:${id}`) ?? '';
    cells.push(...name_value_cells(slice_display(name, EXP_NAME_LIMIT), value));
  }
  // 每行 4 项（原版「每 4 项换行」的列数）；残行按实际格数输出
  print_cell_grid(cells, EXP_PER_ROW * CELLS_PER_ITEM);

  // 等级行的本级需求/总经验公式（三分支）
  const lv = era.get(`cflag:${cid}:9`) || 0; // CFLAG:9 = 等级
  const battle_exp = era.get(`exp:${cid}:80`) || 0; // EXP:80 战斗经验
  let need;
  let total;
  if (cid === 0) {
    // 魔王
    need = lv * 100 + 10;
    total = lv * lv * 50 - lv * 40 + battle_exp;
  } else if (era.get(`talent:${cid}:220`) === 1) {
    // TALENT:220（特殊成长曲线）
    need = lv * 20 + 10;
    total = lv * lv * 10 - 10 + battle_exp;
  } else {
    // 其余
    need = lv * 10 + 10;
    total = lv * lv * 5 + lv * 5 - 10 + battle_exp;
  }
  // （SAVESTR:TARGET = 角色存档名，callname 承载；行首全角空格以
  // \u3000 转义书写，见上方说明）
  era.print(
    `\u3000${chara_callname(cid)}当前是Lv${lv}，战斗经验值总计${total}点，本级经验：${battle_exp}/${need}`,
  );

  // 初吻/初体验括号行。两者皆无时的空行会被整行收回，等价于不输出
  // ——此处直接判空跳过
  const kiss = kiss_bracket(cid);
  const first = first_experience_bracket(cid);
  if (kiss || first) {
    era.print(`\u3000${kiss}${first}`);
  }
}

module.exports = { show_info_exp };
