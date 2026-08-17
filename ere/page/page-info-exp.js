/**
 * @file 经验一览的渲染（@JUEL_CHECK 的 $INPUT_LOOP_1 首屏调用，issue #47）。
 *
 * 源: target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB
 *     @SHOW_INFO_EXP（:1022-1122，経験の表示）
 *
 * 原作签名 @SHOW_INFO_EXP(ARG:0 = -1) 带换角色形态（:1024-1029，ARG 为
 * 角色番号时临时切换 TARGET）——那是别的调用方（角色信息画面）用的，
 * @JUEL_CHECK 不带实参调用（= TARGET 形态），本文件以显式 cid 形参承载，
 * 换角色形态随角色信息票。
 *
 * 初吻/初体验括号行的守卫值语义：CFLAG:16（初吻对象）原作在角色生成
 * 路径置 -1（SYSTEM ver1.0.3.ERB:118 村娘块 / CHARA_CUSTOM ver1.0.1.ERB
 * :135）——ere 侧该初始化随 RAND_CHARA_MAKE 落地前，未声明读值 undefined
 * 按 Emuera 零值语义当 0 处理（显示「[初吻对象：不明]」，黄金样本差异
 * 登记 #47）。
 */

const era = require('#/era-electron');
const { chara_callname } = require('#/utils/callname-utils');

/**
 * 显示宽度（Emuera 的 %,N,LEFT/RIGHT% 补位基准）：全角 = 2、半角 = 1。
 * @param {string} text
 * @returns {number}
 */
function display_width(text) {
  let width = 0;
  for (const ch of text) {
    width += ch.charCodeAt(0) > 0xff ? 2 : 1;
  }
  return width;
}

/**
 * %,N,LEFT%：按显示宽度右补空格。
 * @param {string} text
 * @param {number} width
 * @returns {string}
 */
function pad_display(text, width) {
  return text + ' '.repeat(Math.max(0, width - display_width(text)));
}

/**
 * 初吻括号（:1058-1090）：CFLAG:16 的值域分支。返回空串 = 无此行。
 * @param {number} cid
 * @returns {string}
 */
function kiss_bracket(cid) {
  const flag = era.get(`cflag:${cid}:16`) || 0; // 未声明 → Emuera 零值
  if (flag <= -1) {
    return ''; // :1058 IF CFLAG:16 > -1
  }
  const partner = era.get(`cstr:${cid}:4`) ?? '';
  if (flag === 0) {
    return '[初吻对象：不明]'; // :1059-1061 LOCAL == -1
  }
  if (flag === 992) {
    return `[初吻对象：${partner}]`; // :1062-1063
  }
  if (flag === 993) {
    return '[初吻对象：狂王]'; // :1064-1065
  }
  if (flag === 994) {
    return '[初吻对象：怪物]'; // :1066-1067
  }
  if (flag === 995) {
    return '[初吻对象：怪物的阴茎]'; // :1068-1069
  }
  if (flag === 996) {
    return '[初吻对象：野狗的肛门]'; // :1070-1071
  }
  if (flag === 997) {
    return '[初吻对象：野狗的阴茎]'; // :1072-1073
  }
  if (flag === 998) {
    return '[初吻对象：野狗的嘴]'; // :1074-1075
  }
  if (flag === 999) {
    return '[初吻对象：触手]'; // :1076-1077
  }
  // :1078-1087 %CSTR:4%的 + 部位（按值域），无命中部位则无闭括号（原样）
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
 * 初体验括号（:1092-1113）：CFLAG:15 的值域分支。返回空串 = 无此行。
 * @param {number} cid
 * @returns {string}
 */
function first_experience_bracket(cid) {
  const flag = era.get(`cflag:${cid}:15`) || 0;
  if (flag <= 0) {
    return ''; // :1092 IF CFLAG:15 > 0
  }
  if (flag === 101) {
    return '[初体验对象：蠕虫]'; // :1095-1096
  }
  if (flag === 102) {
    return '[初体验对象：触手生物]'; // :1098-1099
  }
  if (flag === 103) {
    return '[初体验对象：野狗]'; // :1101-1102
  }
  if (flag === 104) {
    return '[初体验对象：怪物]'; // :1104-1105
  }
  if (flag === 105) {
    return '[初体验对象：狂王]'; // :1106-1107
  }
  const local = flag - 1; // :1093
  if (local === 0) {
    // :1108-1109 SAVESTR:0 = 魔王的存档名（#5 决议：callname 承载）
    return `[初体验对象：${chara_callname(0)}]`;
  }
  return `[初体验对象：${era.get(`cstr:${cid}:3`) ?? ''}]`; // :1110-1111
}

/**
 * @SHOW_INFO_EXP（:1022-1122）：非零经验一览（4 列）+ 等级行 + 初吻/
 * 初体验括号行。
 *
 * @param {number} cid 调教目标（原作隐式 TARGET）
 */
function show_info_exp(cid) {
  let row = '';
  let shown = 0;
  // :1032-1040 REPEAT 82：序号 0-81 逐项过（原作如此——名字表的断档处
  // EXP 恒 0，被零值检查跳过；ere 侧名字表缺的序号直接跳，等价）
  const keys = era.get('expkeys') || [];
  for (let id = 0; id < 82; id += 1) {
    if (!keys.includes(id)) {
      continue;
    }
    const value = era.get(`exp:${cid}:${id}`) || 0;
    if (value === 0) {
      continue; // :1033-1034 SIF EXP:COUNT == 0 → CONTINUE
    }
    // :1035 全角引导空格 + %SUBSTRING(EXPNAME,0,8),8,LEFT% + 半角冒号 +
    // {EXP,6,RIGHT}（\u3000 = 全角空格；模板字面量里的全角空白会触发
    // no-irregular-whitespace，以转义书写）
    const name = era.get(`expname:${id}`) ?? '';
    row += `\u3000${pad_display(name.slice(0, 8), 8)}:${String(value).padStart(6)}`;
    shown += 1; // :1036 U += 1
    if (shown % 4 === 0) {
      // :1037-1039 每 4 项换行
      era.print(row);
      row = '';
    }
  }
  if (row) {
    era.print(row); // :1042-1043 SIF !LINEISEMPTY → PRINTL（收残行）
  }

  // :1045-1054 等级行的本级需求/总经验公式（三分支）
  const lv = era.get(`cflag:${cid}:9`) || 0; // CFLAG:9 = 等级
  const battle_exp = era.get(`exp:${cid}:80`) || 0; // EXP:80 战斗经验
  let need;
  let total;
  if (cid === 0) {
    // :1045-1047 魔王
    need = lv * 100 + 10;
    total = lv * lv * 50 - lv * 40 + battle_exp;
  } else if (era.get(`talent:${cid}:220`) === 1) {
    // :1048-1050 TALENT:220（特殊成长曲线）
    need = lv * 20 + 10;
    total = lv * lv * 10 - 10 + battle_exp;
  } else {
    // :1051-1053 其余
    need = lv * 10 + 10;
    total = lv * lv * 5 + lv * 5 - 10 + battle_exp;
  }
  // :1055（SAVESTR:TARGET = 角色存档名，callname 承载；行首全角空格以
  // \u3000 转义书写，见上方说明）
  era.print(
    `\u3000${chara_callname(cid)}当前是Lv${lv}，战斗经验值总计${total}点，本级经验：${battle_exp}/${need}`,
  );

  // :1057-1122 初吻/初体验括号行。两者皆无时原作 PRINT 全角空格 + PRINTL
  // 后 CLEARLINE 1 整行收回（:1118-1122）——等价于不输出，此处直接判空跳过
  const kiss = kiss_bracket(cid);
  const first = first_experience_bracket(cid);
  if (kiss || first) {
    era.print(`\u3000${kiss}${first}`);
  }
}

module.exports = { show_info_exp };
