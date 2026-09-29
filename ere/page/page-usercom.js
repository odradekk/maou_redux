/**
 * @file 调教指令菜单：SHOW_USERCOM（绘制）与 USERCOM（输入分发）的处理器
 * （issue #44；指令按钮 #45 挂载、#213 换紧凑序号与升格标签、#214 挂
 * 子菜单按钮组、自定义 COM 菜单与 USERCOM 全分支分发）。
 *
 * == 指令方格的两条渲染路径（#214 起，按 FLAG:5 位 34 分流） ==
 *
 *   - ON（FLAG:5 位 34 = 1）：show_commenu 的自定义菜单——标签先过
 *     get_adv_com 升格（TRAIN_NAME/trainalias 取名，64 合成分支读
 *     TRAINNAME 静态名），编号印 L_IDX 紧凑序号。开局默认即 ON
 *     （开局置 FLAG:5 = 17179934119，位 34 = 1，见 event-first.js；
 *     golden 两份样本的方格样式（升格名）为此态）。设置页的
 *     [18]「显示高级调教指令的名称」（翻转 FLAG:5 位 34）是开关本体，
 *     随设定票。
 *   - OFF：内建样式的指令列表（train 循环步骤 2，system-flow.md）——
 *     TRAINNAME 静态名 + 同样的位次编号（#211：编号按「全部非空
 *     TRAINNAME 条目中的位次」解释），**不升格**（设置页 [18] 的选项
 *     语义反证：内建态不显示高级名，否则该选项无意义），由
 *     draw_builtin_comlist 承载（#45/#213 的既有职责，标签自 #214 起
 *     按内建语义取静态名）。
 *
 * == 清除语义（不移植 CLEAR_TO_POINT） ==
 *
 * SET_CLEAR_POINT 每回合在 SHOW_STATUS 尾更新清除点（TFLAG:999）；位 34
 * 开启时先画一遍内建列表（追加），SHOW_USERCOM 开头的 CLEAR_TO_POINT 再清
 * 「清除点之后的行」＝只清刚画的那段，随后画自定义菜单。净效果＝每回合
 * **追加**一个自定义方格（旧方格随叙述滚上去，golden 日志每回合一组方格
 * 为证）。ere 侧没有「预画内建列表」这一步，两条路径都直接追加一次
 * ——CLEAR_TO_POINT 无可清对象，不移植（内建列表的闪现过程玩家不可见，
 * 净输出一致）。
 *
 * 指令按钮的编号/标签规则（#45/#213 确立）：编号印 L_IDX（com-index
 * 映射，升格前的位次、与可用性无关）、自定义菜单的标签先过升格。方格与
 * 子菜单按每行 3 列的按钮网格排（原版 PRINTC 的列数，#717 恢复）；正文
 * 不带 [编号] 前缀（PR #30 通则，引擎 showAcc 自动拼）。
 *
 * p_c（#212）：TSTR:90 承载上次的指令名，静态名表优先、
 * 定制名（trainalias）只补空——见 p_c 的三级回落。
 *
 * SHOW_CHARA_INFO 与 STAIN_INFO 已随 #390 换真身。
 * USERCOM 各分支的 RETURN 1/0 均无效果（重绘回合画面是唯一效果），
 * ere 侧 emit 同构（返回值无消费者）。
 * 「上次的调教指令」的淡紫色（0xDDA0DD）不移植（有意偏离：着色）。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const game_train = require('#/facade/game-train');
const { on } = require('#/system/event/registry');
const { begin, STATE } = require('#/system/flow/begin-signal');
const { read_train_name } = require('#/system/train/train-name');
const { com_index } = require('#/system/train/com-index');
const { get_adv_com } = require('#/system/train/com-adv');
const {
  com_able_family,
  DECLARED_TRAIN_IDS,
} = require('#/system/train/com-family');
const {
  comseq_register,
  comseq_show,
  comseq_train,
} = require('#/system/train/com-register');
const { show_chara_info } = require('#/page/page-chara-info-show');
const { stain_info } = require('#/page/components/stain-info');
const { condom_settings } = require('#/system/train/com-condom');
const { print_button_grid } = require('#/utils/button-grid');

/** MASTER：魔王主角，恒为角色 0（CONTEXT.md） */
const MASTER = 0;

// %TRAINNAME:64%・%TRAINNAME:L_I% 的复合动作分隔（lang-table.js 整串
// 豁免本字面量：・ 是既有指令名的分隔样式，归一成 · 会对不上指令名）
const COMPOUND_SEP = '・';

/**
 * FLAG:5 位 34：显示高级调教指令名（自定义 COM 菜单开关，设置页的
 * [18]）。FLAG:5 的开局值 17179934119 > 2^32，JS 位运算符会先截成
 * int32（位 34 恒丢），用除法取位。
 * @returns {boolean}
 */
function show_advanced_names() {
  const settings = era.get('flag:5') || 0;
  return Math.floor(settings / 2 ** 34) % 2 === 1;
}

/**
 * p_c：上次的调教指令名 → TSTR:90。
 * 三级回落：TRAINNAME（静态名表 traincommandname）→ TRAIN_NAME
 * （trainalias 定制覆盖层）→ 全角空格。TSTR:90 的承载是 yml/TStr.yml 的
 * 扩展普通表（#5 建模项定论，引擎探针见 test/tstr-train-table.test.js）；
 * 进调教时的清空由 train-loop.js 初始化段手动完成。
 */
function p_c() {
  const local = era_flag.prevcom;
  // TSTR:90 = TRAINNAME:LOCAL（TRAINNAME ＝ 静态名表）
  let name = era.get(`traincommandname:${local}`) ?? '';
  // 静态名空 → TRAIN_NAME:LOCAL（定制覆盖层，train_name_init 播种）
  if (name.length < 1) {
    name = read_train_name(local);
  }
  // 仍空 → 全角空格（占位非空串——显示宽度 ≥ 1）
  if (name.length < 1) {
    name = '　';
  }
  era.set('tstr:90', name);
}

/**
 * show_commenu 的方格标签：升格后的号取名字。
 * 64 的合成分支（RESULT == 64 且 L_I != 64）读 TRAINNAME 静态名（两段
 * 拼接）；其余读 TRAIN_NAME（trainalias 覆盖层）。纯函数抽出便于断言。
 *
 * @param {number} adv get_adv_com 的返回值（升格后的号；未升格 = 原号）
 * @param {number} id 当前指令号（L_I，升格前）
 * @returns {string} 按钮正文
 */
function command_button_label(adv, id) {
  if (adv === 64 && id !== 64) {
    // %TRAINNAME:64%・%TRAINNAME:L_I%（静态名两段拼接）。
    // ・ 是复合动作的分隔样式（沿用训练名表的语序），与
    // SHOW_STATUS 的射精行同款处置（lang-table 整串豁免，见 COMPOUND_SEP）
    return `${era.get('traincommandname:64') ?? ''}${COMPOUND_SEP}${
      era.get(`traincommandname:${id}`) ?? ''
    }`;
  }
  // %TRAIN_NAME:RESULT%（trainalias 覆盖层）
  return read_train_name(adv);
}

/**
 * show_commenu：自定义 COM 菜单的方格渲染。
 * 循环规则：遍历非空 TRAINNAME（= DECLARED_TRAIN_IDS 升序，恰为全部非空
 * 静态名），L_IDX 在 COM_ABLE 检查**之前**自增（位次与可用性无关、稳定
 * ——#211 实证）；COM_ABLE 过滤（前置 RESULT = 1 即「未定义即视为可执行」）；
 * 标签过 get_adv_com 升格、编号印位次。COM_ABLE 的检查每回合跑两遍
 * （train-loop 步骤 5 的预扫描 + 本循环），是既有结构。
 * @returns {Promise<void>}
 */
async function show_commenu() {
  const items = [];
  for (const id of DECLARED_TRAIN_IDS) {
    const able = await com_able_family.call(id, { whenMissing: 1 });
    if (able === 0) {
      continue; // SIF RESULT == 0 CONTINUE
    }
    const adv = await get_adv_com(id); // 取升格号
    items.push([com_index(id), command_button_label(adv, id)]);
  }
  // 每行 3 格 = 原版 PRINTCPERLINE()（emuera.config 每行 3 个）的列数，
  // #717 恢复
  print_button_grid(items, 3);
  // 网格行循环后不补空行——方格与分割线之间只有一个空行，那一个来自下一段
  // 的 println（排版语义见 CONTEXT.md「输出 API 的排版与对齐」）。
}

/**
 * 内建渲染路径（train 循环步骤 2 的等价承载，#45/#213 的既有职责）：
 * TRAINNAME 静态名 + L_IDX 位次编号，不升格（见文件头「两条渲染路径」）。
 * @param {number[]} usable 可执行指令表（train-loop 的 COM_ABLE 预扫描）
 * @returns {void}
 */
function draw_builtin_comlist(usable) {
  print_button_grid(
    usable.map((id) => [
      com_index(id),
      era.get(`traincommandname:${id}`) ?? '',
    ]),
    3,
  );
}

// —— 过滤按钮的染色（RGB 值 → CSS 色）——
// 开启（FLAG:25 对应位 = 1）一律灰 100,100,100；未开启各系色，唯独
// 爱抚系（104）未开启时不染色（渲染层默认色，config 不传 color）
const FILTER_GRAY = '#646464';
const FILTER_COLORS = {
  105: '#6495ED', // 器具系 100,149,237（CornflowerBlue）
  106: '#FFA500', // 私处性交系 255,165,0（Orange）
  107: '#DB7093', // 肛门性交系 219,112,147（PaleVioletRed）
  108: '#FF6347', // ＳＭ系 255,99,71（Tomato）
};
/** 过滤按钮表：[按钮号, 文案, FLAG:25 位掩码] */
const FILTER_BUTTONS = [
  [104, '爱抚系过滤', 1],
  [105, '器具系过滤', 2],
  [106, '私处性交系过滤', 4],
  [107, '肛门性交系过滤', 8],
  [108, 'ＳＭ系过滤', 16],
];

/**
 * 交代助手[102] / 对换调教[112] 的显示与分发条件（渲染与分发用同一判断
 * 条件）。ASSI:1 = flag:10013（EVENTTRAIN 记录的助手，era_flag.assi_
 * record）；CFLAG:0 = 调教状态（2 = 可交易/对换，enter-enemy.js 注释与
 * page-select-target.js 先例）。
 * @returns {{can_handover: boolean, can_swap: boolean}}
 */
function handover_guard_ok() {
  const assi_record = era.get('flag:10013') || 0;
  return {
    // ASSI > 0 && ASSI:1 > 0
    can_handover: era_flag.assi > 0 && assi_record > 0,
    // (TARGET == MASTER || CFLAG:0 >= 2) && ASSI:1 > 0
    can_swap:
      (era_flag.target === MASTER ||
        (era.get(`cflag:${era_flag.target}:0`) || 0) >= 2) &&
      assi_record > 0,
  };
}

on('SHOW_USERCOM', async (usable = []) => {
  // 指令方格：FLAG:5 位 34 开 → 自定义菜单（show_commenu），
  // 否则内建路径（draw_builtin_comlist）——两条路径都是净追加
  // （清除语义见文件头「清除语义」节）
  if (show_advanced_names()) {
    await show_commenu();
  } else {
    draw_builtin_comlist(usable);
  }
  era.println(); // PRINTL（空行）
  era.drawLine(); // DRAWLINE
  // RESETCOLOR —— 无 ere 对应语义，不镜像
  // —— 子菜单按钮组（原版 PRINTC 流式打印：满 3 收行，[103] 与 [990]
  // 之后硬收行——分三段网格逐段复刻原行分组，#717 恢复三列；过滤钮的
  // 现色/灰色经单格 config 带进网格）——
  const submenu = [
    [100, '能力表示'],
    [101, '污秽表示'],
  ];
  const guards = handover_guard_ok();
  if (guards.can_handover) {
    submenu.push([102, '交代助手']); // （ASSI > 0 && ASSI:1 > 0）
  }
  if (guards.can_swap) {
    submenu.push([112, '对换调教']); // （(TARGET==MASTER||CFLAG:0>=2) && ASSI:1>0）
  }
  submenu.push([103, '避孕套设定']);
  print_button_grid(submenu, 3);
  // 过滤组（[104]-[108]）+ [990]：原版 [990] 紧随 [108] 不换行、满 3 才收
  //（默认态渲染成 [107][108][990] 同行）
  const filters = [];
  for (const [acc, label, mask] of FILTER_BUTTONS) {
    const on = (game_train.指令过滤 & mask) !== 0;
    const off_color = FILTER_COLORS[acc];
    filters.push([
      acc,
      label,
      on
        ? { color: FILTER_GRAY }
        : off_color !== undefined
          ? { color: off_color }
          : undefined,
    ]);
  }
  filters.push([990, '调教菜单登录']); // （ENDIF 后无条件，缩进无语义）
  print_button_grid(filters, 3);
  // 尾部（[991]/[992] 有登录菜单才有 + [999] 调教结束）：[990] 的硬收行
  // 之后自成一段；网格行之间与页脚之后都不补空行（语义与勘误见
  // CONTEXT.md「输出 API 的排版与对齐」）
  const footer = [];
  if (game_train.指令菜单长度 > 0) {
    footer.push([991, '调教菜单表示']);
    footer.push([992, '调教菜单实行']);
  }
  footer.push([999, '调教结束']); // （正文不带 [999] 前缀，引擎自动拼）
  print_button_grid(footer, 3);
  // prevcom > -1 → p_c（置 TSTR:90）→ ＜上次的调教指令：…＞
  // （名字来自 TSTR:90：静态名 → 定制名 → 全角空格的三级回落，见 p_c）
  if (era_flag.prevcom > -1) {
    p_c();
    era.print(`＜上次的调教指令：${era.get('tstr:90') ?? ''}＞`);
  }
});

on('USERCOM', async (result) => {
  // REDRAW 1 —— 不移植；RETURN 1/0 均无效果（见文件头）
  const guards = handover_guard_ok();
  if (result === 100) {
    // 能力表示（#390 真身：ARG:1 缺省 -1，即调教时的信息）
    await show_chara_info(era_flag.target);
    return;
  }
  if (result === 101) {
    // 污秽表示（#390 真身）
    await stain_info();
    return;
  }
  if (result === 102 && guards.can_handover) {
    // 交代助手：视角/助手按 TARGET 归属三态切换
    const target = era_flag.target;
    const target_record = era.get('flag:10012') || 0; // TARGET:1
    const assi_record = era.get('flag:10013') || 0; // ASSI:1
    if (target === MASTER) {
      // PLAYER = PLAYER==TARGET:1 ? ASSI:1 : TARGET:1，ASSI = PLAYER
      era_flag.player =
        era_flag.player === target_record ? assi_record : target_record;
      era_flag.assi = era_flag.player;
    } else if (target === target_record) {
      // PLAYER = PLAYER==MASTER ? ASSI:1 : MASTER，ASSI = ASSI:1
      era_flag.player = era_flag.player === MASTER ? assi_record : MASTER;
      era_flag.assi = assi_record;
    } else {
      // PLAYER = PLAYER==MASTER ? TARGET:1 : MASTER，ASSI = TARGET:1
      era_flag.player = era_flag.player === MASTER ? target_record : MASTER;
      era_flag.assi = target_record;
    }
    // ASSIPLAY = PLAYER != MASTER ? 1 : 0
    era_flag.assiplay = era_flag.player !== MASTER ? 1 : 0;
    return;
  }
  if (result === 112 && guards.can_swap) {
    // 对换调教：TARGET ↔ PLAYER 对调，换入视角是记录者时助手归位
    const target = era_flag.target;
    const target_record = era.get('flag:10012') || 0;
    const assi_record = era.get('flag:10013') || 0;
    era_flag.target = era_flag.player;
    era_flag.player = target; // SWAP TARGET, PLAYER
    if (era_flag.player === assi_record || era_flag.player === target_record) {
      era_flag.assi = era_flag.player;
    }
    era_flag.assiplay = era_flag.player !== MASTER ? 1 : 0;
    return;
  }
  if (result === 103) {
    // 避孕套设定（#216 J6 真身，system/train/com-condom.js）
    await condom_settings();
    return;
  }
  // 过滤位翻转（落尾 RETURN 0——重绘即反馈）；清位掩码 =
  // 31 ^ 位（30/29/27/23/15 各值与 31^mask 等价，取位算式）
  for (const [acc, , mask] of FILTER_BUTTONS) {
    if (result === acc) {
      if ((game_train.指令过滤 & mask) !== 0) {
        game_train.指令过滤 &= 31 ^ mask;
      } else {
        game_train.指令过滤 |= mask;
      }
      return;
    }
  }
  if (result === 990) {
    // 调教菜单登录（com-register.js 的登记循环）
    await comseq_register();
    return;
  }
  if (result === 991 && game_train.指令菜单长度 > 0) {
    // 调教菜单表示（DRAWLINE + 显示 + DRAWLINE + WAIT）
    era.drawLine();
    await comseq_show();
    era.drawLine();
    await era.waitAnyKey();
    return;
  }
  if (result === 992 && game_train.指令菜单长度 > 0) {
    // 调教菜单实行（无 RETURN 1，落尾 RETURN 0——重绘回合画面）
    await comseq_train();
    return;
  }
  if (result === 999) {
    // 调教结束 → begin(STATE.AFTERTRAIN) 转场（事件链暂存，回合循环提交）
    begin(STATE.AFTERTRAIN);
    return;
  }
  // 其余输入落到链尾、重绘回合画面（不提示——与主菜单对无效输入的处置
  // 一致）
});

module.exports = { command_button_label, show_commenu };
