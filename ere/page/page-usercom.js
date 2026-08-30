/**
 * @file 调教指令菜单：@SHOW_USERCOM（绘制）与 @USERCOM（输入分发）的处理器
 * （issue #44；指令按钮 #45 挂载、#213 换紧凑序号与升格标签、#214 挂
 * 子菜单按钮组、自定义 COM 菜单与 @USERCOM 全分支分发）。
 *
 * 源: target/ERB/調教相關/USERCOM.ERB
 *     @SHOW_USERCOM（:7-100）/@USERCOM（:102-177）/@SET_CLEAR_POINT
 *     （:179-180，落点在 page-train.js 的 SHOW_STATUS 尾）/@CLEAR_TO_POINT
 *     （:182-186，见下方「清除语义」）/@SHOW_COMMENU（:188-216，自定义
 *     COM 菜单的方格渲染）
 *     target/ERB/調教相關/TRAIN_MAIN.ERB  @P_C（:771-780，上次的调教指令名）
 *
 * == 指令方格的两条渲染路径（#214 起，GETBIT(FLAG:5,34) 分流，:9-13） ==
 *
 *   - ON（FLAG:5 位 34 = 1）：@SHOW_COMMENU 的自定义菜单——标签先过
 *     @GET_ADV_COM 升格（TRAIN_NAME/trainalias 取名，64 合成臂读
 *     TRAINNAME 静态名），编号印 L_IDX 紧凑序号。开局默认即 ON
 *     （@EVENTFIRST 置 FLAG:5 = 17179934119，bit34 = 1，event-first.js
 *     :110；golden 两份样本的方格形态（升格名）为此态）。CONFIG.ERB 的
 *     [18]「显示高级调教指令的名称」（INVERTBIT FLAG:5,34）是开关本体，
 *     随设定票。
 *   - OFF：Emuera 引擎内建 TRAIN 列表（循环步骤 2，system-flow.md）——
 *     TRAINNAME 静态名 + 同样的位次编号（#211：引擎把输入当「全部非空
 *     TRAINNAME 条目中的位次」解释），**不升格**（CONFIG [18] 的选项
 *     语义反证：内建态不显示高级名，否则该选项无意义）。ere 侧由
 *     draw_builtin_comlist 承载（#45/#213 的既有职责，标签自 #214 起
 *     按内建语义取静态名）。
 *
 * == 清除语义（@CLEAR_TO_POINT 的记名差异） ==
 *
 * 原作：SET_CLEAR_POINT 每回合在 SHOW_STATUS 尾更新锚点（TFLAG:999）；
 * GETBIT 时引擎先画内建列表（追加），@SHOW_USERCOM 开头的 CLEAR_TO_POINT
 * 清「锚点之后的行」＝只清引擎刚画的那段，再画自定义菜单。净效果＝每回合
 * **追加**一个自定义方格（旧方格随叙述滚上去，golden 日志每回合一组方格
 * 为证）。ere 侧没有「引擎预画内建列表」这一步，两条路径都直接追加一次
 * ——CLEAR_TO_POINT 无可清对象，不镜像（记名差异：原作内建列表的闪现
 * 过程不可见，净输出一致）。
 *
 * 指令按钮的编号/标签规则（#45/#213 确立）：编号印 L_IDX（com-index
 * 映射，升格前的位次、与可用性无关）、自定义菜单的标签先过升格。原作
 * PRINTC 三列排版 → 按钮平铺（记名差异：排版；PR #30 通则——正文不带
 * [编号] 前缀，引擎 showAcc 自动拼）。
 *
 * @P_C（#212 真身，本文件 p_c）：TSTR:90 承载上次的指令名，TRAIN_NAME
 * 定制名（trainalias）优先级高于静态名表——见 p_c 的三级回落。
 *
 * 本文件仍存根化的原作调用（docs/stub-registry.md）：SHOW_CHARA_INFO
 * （USERCOM:105，随角色信息票）、STAIN_INFO（:108，随污渍票）。@USERCOM 各分支的 RETURN 1/0 被 Emuera 引擎忽略
 * （重绘回合画面是唯一效果），ere 侧 emit 同构（返回值无消费者）。
 * SETCOLOR 0xDDA0DD 的「上次的调教指令」淡紫色不镜像（记名差异）。
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
const { stub_line_wait } = require('#/utils/stub-line');
const { condom_settings } = require('#/system/train/com-condom');

/**
 * 本文件存根化的原作调用名（@USERCOM 分发到的存根处理器）。
 * docs/stub-registry.md 必须收录每一个；名单变动必须同步清单。
 * @P_C 已随 #212 落地真身；SHOW_COMMENU 与 COMSEQ_* 已随 #214 落地真身
 * （本文件 show_commenu 与 system/train/com-register.js），不在名单。
 */
const STUBBED_CALLS = ['SHOW_CHARA_INFO', 'STAIN_INFO'];

/** MASTER（Emuera 内置变量）：魔王主角，恒为角色 0（CONTEXT.md） */
const MASTER = 0;

// %TRAINNAME:64%・%TRAINNAME:L_I% 的复合动作分隔（lang-table.js 整串
// 豁免本字面量：・ 是原作样式，归一成 · 会切断与 target/ 指令名的对应）
const COMPOUND_SEP = '・';

/**
 * GETBIT(FLAG:5,34)：显示高级调教指令名（自定义 COM 菜单开关，CONFIG.ERB
 * 的 [18]）。FLAG:5 的开局值 17179934119 > 2^32，JS 位运算符会先截成
 * int32（bit34 恒丢），用除法取位。
 * @returns {boolean}
 */
function show_advanced_names() {
  const settings = era.get('flag:5') || 0;
  return Math.floor(settings / 2 ** 34) % 2 === 1;
}

/**
 * @P_C（TRAIN_MAIN.ERB:771-780）：上次的调教指令名 → TSTR:90。
 * 三级回落（1:1）：TRAINNAME（静态名表 traincommandname）→ TRAIN_NAME
 * （trainalias 定制覆盖层）→ 全角空格。TSTR:90 的承载是 yml/TStr.yml 的
 * 扩展普通表（#5 建模项定论，引擎探针见 test/tstr-train-table.test.js）；
 * 「BEGIN TRAIN 清空」由 train-loop.js 初始化段手动镜像。
 */
function p_c() {
  const local = era_flag.prevcom;
  // :773 TSTR:90 '= TRAINNAME:LOCAL（'= 是表达式赋值；TRAINNAME ＝静态名表）
  let name = era.get(`traincommandname:${local}`) ?? '';
  // :775-776 静态名空 → TRAIN_NAME:LOCAL（定制覆盖层，TRAIN_NAME_INIT 播种）
  if (name.length < 1) {
    name = read_train_name(local);
  }
  // :778-779 仍空 → 全角空格（占位非空串——STRLENSU ≥ 1）
  if (name.length < 1) {
    name = '　';
  }
  era.set('tstr:90', name);
}

/**
 * @SHOW_COMMENU 的方格标签（USERCOM.ERB:210-214）：升格后的号取名字。
 * 64 的合成臂（RESULT == 64 且 L_I != 64）读 CSV 静态名（TRAINNAME，两段
 * 拼接）；其余读 TRAIN_NAME（trainalias 覆盖层）。纯函数抽出便于断言。
 *
 * @param {number} adv @GET_ADV_COM 的返回值（升格后的号；未升格 = 原号）
 * @param {number} id 当前指令号（L_I，升格前）
 * @returns {string} 按钮正文
 */
function command_button_label(adv, id) {
  if (adv === 64 && id !== 64) {
    // :211 PRINTFORMC %TRAINNAME:64%・%TRAINNAME:L_I%（CSV 静态名）。
    // ・ 是原作的复合动作分隔样式，逐字照抄——TRAIN_NAME:128-132 与
    // SHOW_STATUS 的射精行同款处置（lang-table 整串豁免，见 COMPOUND_SEP）
    return `${era.get('traincommandname:64') ?? ''}${COMPOUND_SEP}${
      era.get(`traincommandname:${id}`) ?? ''
    }`;
  }
  // :213 PRINTFORMC %TRAIN_NAME:RESULT%（游戏自建数组，trainalias）
  return read_train_name(adv);
}

/**
 * @SHOW_COMMENU（USERCOM.ERB:188-216）：自定义 COM 菜单的方格渲染。
 * 循环规则逐字：遍历非空 TRAINNAME（= DECLARED_TRAIN_IDS 升序，FOR
 * L_I,0,300 + STRLENS 守卫的运行时等价物），L_IDX 在 COM_ABLE 检查
 * **之前**自增（位次与可用性无关、稳定——#211 实证）；COM_ABLE 过滤
 * （:200-203，前置 RESULT = 1 即「未定义即视为可执行」）；标签过
 * @GET_ADV_COM 升格、编号印位次（:209-214）。COM_ABLE 的二次扫描与
 * train-loop 步骤 5 的预扫描并存是源侧本来的形态（引擎扫一遍、SHOW_
 * COMMENU 再扫一遍，每回合两次）。
 * @returns {Promise<void>}
 */
async function show_commenu() {
  for (const id of DECLARED_TRAIN_IDS) {
    const able = await com_able_family.call(id, { whenMissing: 1 });
    if (able === 0) {
      continue; // :202-203 SIF RESULT == 0 CONTINUE
    }
    const adv = await get_adv_com(id); // :209 CALL GET_ADV_COM, L_I
    era.printButton(command_button_label(adv, id), com_index(id));
  }
  era.println(); // :216 循环后的 PRINTL
}

/**
 * 内建渲染臂（Emuera TRAIN 循环步骤 2 的 ere 等价，#45/#213 的既有职责）：
 * TRAINNAME 静态名 + L_IDX 位次编号，不升格（见文件头「两条渲染路径」）。
 * @param {number[]} usable 可执行指令表（train-loop 的 COM_ABLE 预扫描）
 * @returns {void}
 */
function draw_builtin_comlist(usable) {
  for (const id of usable) {
    era.printButton(era.get(`traincommandname:${id}`) ?? '', com_index(id));
  }
}

// —— 过滤按钮的染色（USERCOM.ERB:38-84 的 SETCOLOR 值 → CSS 色）——
// 开启（FLAG:25 对应位 = 1）一律灰 100,100,100；未开启各系色，唯独
// 爱抚系（104）的 ELSE 无 SETCOLOR（引擎默认色，config 不传 color）
const FILTER_GRAY = '#646464';
const FILTER_COLORS = {
  105: '#6495ED', // 器具系 100,149,237（CornflowerBlue）
  106: '#FFA500', // 私处性交系 255,165,0（Orange）
  107: '#DB7093', // 肛门性交系 219,112,147（PaleVioletRed）
  108: '#FF6347', // ＳＭ系 255,99,71（Tomato）
};
/** 过滤按钮表：[按钮号, 文案, FLAG:25 位掩码]（:38-84 逐条） */
const FILTER_BUTTONS = [
  [104, '爱抚系过滤', 1],
  [105, '器具系过滤', 2],
  [106, '私处性交系过滤', 4],
  [107, '肛门性交系过滤', 8],
  [108, 'ＳＭ系过滤', 16],
];

/**
 * 交代助手[102] / 对换调教[112] 的守卫（:20-35——渲染与分发用同一判据，
 * @USERCOM 的 :110/:123 同款条件）。ASSI:1 = flag:10013（@EVENTTRAIN
 * 记录的助手，era_flag.assi_record）；CFLAG:0 = 调教状态（2 = 可交易/
 * 对换，enter-enemy.js 注释与 page-select-target.js:66 先例）。
 * @returns {{can_handover: boolean, can_swap: boolean}}
 */
function handover_guard_ok() {
  const assi_record = era.get('flag:10013') || 0;
  return {
    // :20 ASSI > 0 && ASSI:1 > 0
    can_handover: era_flag.assi > 0 && assi_record > 0,
    // :28 (TARGET == MASTER || CFLAG:0 >= 2) && ASSI:1 > 0
    can_swap:
      (era_flag.target === MASTER ||
        (era.get(`cflag:${era_flag.target}:0`) || 0) >= 2) &&
      assi_record > 0,
  };
}

on('SHOW_USERCOM', async (usable = []) => {
  // :9-13 指令方格：GETBIT(FLAG:5,34) → 自定义菜单（show_commenu），
  // 否则引擎内建列表（ere 侧 draw_builtin_comlist）——两条路径都是净追加
  // （清除语义见文件头「清除语义」节）
  if (show_advanced_names()) {
    await show_commenu();
  } else {
    draw_builtin_comlist(usable);
  }
  era.println(); // :14 PRINTL（空行）
  era.drawLine(); // :15 DRAWLINE
  // :16 RESETCOLOR —— 无 ere 对应语义，不镜像
  // —— 子菜单按钮组（:17-91；PRINTC 三列 → 按钮平铺，记名差异）——
  era.printButton('能力表示', 100); // :17
  era.printButton('污秽表示', 101); // :18
  const guards = handover_guard_ok();
  if (guards.can_handover) {
    era.printButton('交代助手', 102); // :21（ASSI > 0 && ASSI:1 > 0）
  }
  if (guards.can_swap) {
    era.printButton('对换调教', 112); // :29（(TARGET==MASTER||CFLAG:0>=2) && ASSI:1>0）
  }
  era.printButton('避孕套设定', 103); // :36
  // :38-84 过滤组：开启灰、未开启各系色（104 未开启 = 引擎默认色）
  for (const [acc, label, mask] of FILTER_BUTTONS) {
    const on = (game_train.指令过滤 & mask) !== 0;
    const off_color = FILTER_COLORS[acc];
    era.printButton(
      label,
      acc,
      on
        ? { color: FILTER_GRAY }
        : off_color !== undefined
          ? { color: off_color }
          : undefined,
    );
  }
  era.println(); // :86 PRINTL
  era.printButton('调教菜单登录', 990); // :85（ENDIF 后无条件，缩进无语义）
  if (game_train.指令菜单长度 > 0) {
    era.printButton('调教菜单表示', 991); // :88
    era.printButton('调教菜单实行', 992); // :89
  }
  era.printButton('调教结束', 999); // :91（正文不带 [999] 前缀，引擎自动拼）
  era.println(); // :92 PRINTL
  // :93-100 PREVCOM > -1 → CALL P_C（置 TSTR:90）→ ＜上次的调教指令：…＞
  // （名字来自 TSTR:90：静态名 → 定制名 → 全角空格的三级回落，见 p_c）
  if (era_flag.prevcom > -1) {
    p_c();
    era.print(`＜上次的调教指令：${era.get('tstr:90') ?? ''}＞`);
  }
});

on('USERCOM', async (result) => {
  // :103 REDRAW 1 —— 不镜像；RETURN 1/0 引擎均忽略（见文件头）
  const guards = handover_guard_ok();
  if (result === 100) {
    // :104-106 能力表示（SHOW_CHARA_INFO 本体随角色信息票）
    await stub_line_wait('SHOW_CHARA_INFO', '角色信息画面', '随角色信息票');
    return;
  }
  if (result === 101) {
    // :107-109 污秽表示
    await stub_line_wait('STAIN_INFO', '污渍信息画面', '随污渍票');
    return;
  }
  if (result === 102 && guards.can_handover) {
    // :110-122 交代助手：视角/助手按 TARGET 归属三态切换
    const target = era_flag.target;
    const target_record = era.get('flag:10012') || 0; // TARGET:1
    const assi_record = era.get('flag:10013') || 0; // ASSI:1
    if (target === MASTER) {
      // :111-113 PLAYER = PLAYER==TARGET:1 ? ASSI:1 : TARGET:1，ASSI = PLAYER
      era_flag.player =
        era_flag.player === target_record ? assi_record : target_record;
      era_flag.assi = era_flag.player;
    } else if (target === target_record) {
      // :114-116 PLAYER = PLAYER==MASTER ? ASSI:1 : MASTER，ASSI = ASSI:1
      era_flag.player = era_flag.player === MASTER ? assi_record : MASTER;
      era_flag.assi = assi_record;
    } else {
      // :117-119 PLAYER = PLAYER==MASTER ? TARGET:1 : MASTER，ASSI = TARGET:1
      era_flag.player = era_flag.player === MASTER ? target_record : MASTER;
      era_flag.assi = target_record;
    }
    // :121 ASSIPLAY = PLAYER != MASTER ? 1 : 0
    era_flag.assiplay = era_flag.player !== MASTER ? 1 : 0;
    return;
  }
  if (result === 112 && guards.can_swap) {
    // :123-128 对换调教：TARGET ↔ PLAYER 对调，换入视角是记录者时助手归位
    const target = era_flag.target;
    const target_record = era.get('flag:10012') || 0;
    const assi_record = era.get('flag:10013') || 0;
    era_flag.target = era_flag.player;
    era_flag.player = target; // SWAP TARGET, PLAYER
    if (era_flag.player === assi_record || era_flag.player === target_record) {
      era_flag.assi = era_flag.player; // :125-126
    }
    era_flag.assiplay = era_flag.player !== MASTER ? 1 : 0; // :127
    return;
  }
  if (result === 103) {
    // :129-131 避孕套设定（#216 J6 真身，system/train/com-condom.js）
    await condom_settings();
    return;
  }
  // :132-161 过滤位翻转（落尾 RETURN 0——重绘即反馈）；清位掩码 =
  // 31 ^ 位（源侧的 30/29/27/23/15 逐字值与 31^mask 等价，取位算式）
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
    // :162-164 调教菜单登录（com-register.js 的登记循环）
    await comseq_register();
    return;
  }
  if (result === 991 && game_train.指令菜单长度 > 0) {
    // :165-170 调教菜单表示（DRAWLINE + 显示 + DRAWLINE + WAIT）
    era.drawLine();
    await comseq_show();
    era.drawLine();
    await era.waitAnyKey();
    return;
  }
  if (result === 992 && game_train.指令菜单长度 > 0) {
    // :171-172 调教菜单实行（无 RETURN 1，落尾 RETURN 0——重绘回合画面）
    await comseq_train();
    return;
  }
  if (result === 999) {
    // :173-175 调教结束 → BEGIN AFTERTRAIN（事件链暂存，回合循环提交）
    begin(STATE.AFTERTRAIN);
    return;
  }
  // :177 RETURN 0：其余输入落到链尾，引擎重绘回合画面（不提示——与
  // 主菜单对无效输入的处置一致）
});

module.exports = { STUBBED_CALLS, command_button_label, show_commenu };
