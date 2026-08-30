/**
 * @file 调教指令菜单：@SHOW_USERCOM（绘制）与 @USERCOM（输入分发）的处理器
 * （issue #44；指令按钮 #45 挂载、#213 换紧凑序号与升格标签）。
 *
 * 源: target/ERB/調教相關/USERCOM.ERB  @SHOW_USERCOM（:7-100，无标记 =
 *     普通档事件）/@USERCOM（:102-177，同）@SHOW_COMMENU（:188-216，
 *     自定义 COM 菜单的方格渲染——GETBIT(FLAG:5,34) 时替代本文件上方的
 *     按钮组；其方格编号/标签规则即 ere 侧按钮渲染的依据，菜单本体归 J4）
 *     target/ERB/調教相關/TRAIN_MAIN.ERB  @P_C（:771-780，上次的调教指令名）
 *
 * 指令按钮（#45 挂载，#213 按 @SHOW_COMMENU 换算）：可执行表由回合循环的
 * COM_ABLE 扫描透传（emit 的第二参）。**编号印 L_IDX 紧凑序号、标签先过
 * @GET_ADV_COM 升格**（USERCOM.ERB:209-214 逐字）：
 *   - 编号：`[{L_IDX,3}]`——L_I → L_IDX 经 com-index 映射（升格前的位次，
 *     与可用性无关、稳定，#211 实证）；
 *   - 标签：`%TRAIN_NAME:RESULT%`——TRAIN_NAME（trainalias 定制覆盖层，
 *     @TRAIN_NAME_INIT 播种）取**升格后**的号（get_adv_com）；RESULT == 64
 *     且 L_I != 64 的合成臂读 CSV 静态名（%TRAINNAME:64%・%TRAINNAME:L_I%，
 *     差一个下划线的两个数组写在相邻两行）。原作 PRINTC 三列排版——ere
 *     侧改按钮平铺（记名差异：排版；PR #30 通则——正文不带 [编号] 前缀）。
 * @P_C（#212 真身，本文件 p_c）：TSTR:90 承载上次的指令名，TRAIN_NAME
 * 定制名（trainalias）优先级高于静态名表——见 p_c 的三级回落。
 *
 * 其余待办（docs/stub-registry.md，#44 登记）：能力表示[100]/污秽表示[101]/
 * 交代助手[102]/对换调教[112]/避孕套设定[103]/过滤[104-108]/调教菜单
 * [990-992] 按钮组；GETBIT(FLAG:5,34) 的自定义 COM 菜单（SHOW_COMMENU）。
 * SETCOLOR 0xDDA0DD 的「上次的调教指令」淡紫色不镜像（记名差异）。
 */

const era = require('#/era-electron');
const { on } = require('#/system/event/registry');
const { begin, STATE } = require('#/system/flow/begin-signal');
const era_flag = require('#/era-utils/era-flag');
const { read_train_name } = require('#/system/train/train-name');
const { com_index } = require('#/system/train/com-index');
const { get_adv_com } = require('#/system/train/com-adv');

/**
 * 本文件存根化的原作调用名（@USERCOM 未挂载分支的处理器 + 自定义菜单）。
 * docs/stub-registry.md 必须收录每一个；名单变动必须同步清单。
 * @P_C 已随 #212 落地真身（TRAIN_NAME 定制名优先级接通，TSTR:90 承载）。
 */
const STUBBED_CALLS = [
  'SHOW_CHARA_INFO',
  'STAIN_INFO',
  'CONDOM_SETTINGS',
  'COMSEQ_REGISTER',
  'COMSEQ_SHOW',
  'COMSEQ_TRAIN',
  'SHOW_COMMENU',
];

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

// %TRAINNAME:64%・%TRAINNAME:L_I% 的复合动作分隔（lang-table.js 整串
// 豁免本字面量：・ 是原作样式，归一成 · 会切断与 target/ 指令名的对应）
const COMPOUND_SEP = '・';

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

on('SHOW_USERCOM', async (usable = []) => {
  // :9-13 GETBIT(FLAG:5,34) → 自定义 COM 菜单（待办，占位行见下）
  era.println(); // :14 PRINTL（空行）
  era.drawLine(); // :15 DRAWLINE
  // :16 RESETCOLOR —— 无 ere 对应语义，不镜像
  // 指令按钮（#45 挂载，#213 换算）：编号印 L_IDX、标签先过升格（见
  // command_button_label；原作 PRINTC 三列改平铺按钮，记名差异）
  for (const id of usable) {
    const adv = await get_adv_com(id);
    era.printButton(command_button_label(adv, id), com_index(id));
  }
  era.println(); // 按钮组收尾换行
  // :17-36 能力表示[100] 污秽表示[101]（交代助手[102]/对换调教[112] 有
  // 守卫）避孕套设定[103]；:38-84 过滤[104-108]；:85-90 调教菜单[990-992]
  // ——整组按钮待办，一行占位（含可检索的原作函数名）
  era.print(
    '（能力表示/污秽表示/避孕套设定/过滤/调教菜单等按钮尚未移植，此处为占位——原作 @SHOW_USERCOM（SHOW_CHARA_INFO 等），随调教 UI 票，见 docs/stub-registry.md。）',
  );
  era.println(); // 按钮组原作同行收尾的 PRINTL
  // :91 PRINTC 调教结束[999] ——（按钮正文不带 [999] 前缀，引擎自动拼）
  era.printButton('调教结束', 999);
  era.println(); // :92 PRINTL
  // :93-100 PREVCOM > -1 → CALL P_C（置 TSTR:90）→ ＜上次的调教指令：…＞
  // （名字来自 TSTR:90：静态名 → 定制名 → 全角空格的三级回落，见 p_c）
  if (era_flag.prevcom > -1) {
    p_c();
    era.print(`＜上次的调教指令：${era.get('tstr:90') ?? ''}＞`);
  }
});

on('USERCOM', async (result) => {
  // :103 REDRAW 1 —— 不镜像
  // :104-172 分支 100/101/102/112/103/104-108/990/991/992：按钮未挂载，
  // 键入对应编号也只落到链尾 RETURN 0（重绘，不提示——与主菜单对无效
  // 输入的处置一致）；处理器本体已登记 docs/stub-registry.md
  if (result === 999) {
    // :173-175 调教结束 → BEGIN AFTERTRAIN（事件链暂存，回合循环提交）
    begin(STATE.AFTERTRAIN);
  }
  // :177 RETURN 0：引擎忽略返回值、重绘回合画面
});

module.exports = { STUBBED_CALLS, command_button_label };
