/**
 * @file 调教指令菜单：@SHOW_USERCOM（绘制）与 @USERCOM（输入分发）的处理器
 * （issue #44）。
 *
 * 源: target/ERB/調教相關/USERCOM.ERB  @SHOW_USERCOM（:7-100，无标记 =
 *     普通档事件）/@USERCOM（:102-177，同）
 *
 * 骨架范围（工单事实 #2：本票没有任何指令，菜单里只挂 [999] 调教结束，
 * 其余登记欠账）：
 *   - 指令按钮（引擎内建的 TRAIN 指令列表）渲染不落——由回合循环的
 *     COM_ABLE 扫描喂给输入检查，按钮随首条指令票（#45+）挂载；
 *   - @SHOW_USERCOM 的其余按钮（能力表示[100]/污秽表示[101]/交代助手[102]/
 *     对换调教[112]/避孕套设定[103]/过滤[104-108]/调教菜单[990-992]）与
 *     @USERCOM 对应分支整组欠账（docs/stub-registry.md）；
 *   - :93-100 上次的调教指令：PREVCOM 恒 -1（零指令），不可达；TSTR:90 无
 *     ere 落点，随首条指令票定址；
 *   - :9-13 GETBIT(FLAG:5,34) 的自定义 COM 菜单（CLEAR_TO_POINT +
 *     SHOW_COMMENU）欠账。
 *
 * 按钮正文一律不写 [编号] 前缀（引擎 showAcc 自动拼 `[快捷键] 正文`，PR #30
 * 实机教训）；REDRAW 1 无 ere 对应语义，不镜像。
 */

const era = require('#/era-electron');
const { on } = require('#/system/event/registry');
const { begin, STATE } = require('#/system/flow/begin-signal');

/**
 * 本文件存根化的原作调用名（@USERCOM 未挂载分支的处理器 + 自定义菜单）。
 * docs/stub-registry.md 必须收录每一个；名单变动必须同步清单。
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

on('SHOW_USERCOM', async () => {
  // :9-13 GETBIT(FLAG:5,34) → 自定义 COM 菜单（欠账，占位行见下）
  era.println(); // :14 PRINTL（空行）
  era.drawLine(); // :15 DRAWLINE
  // :16 RESETCOLOR —— 无 ere 对应语义，不镜像
  // :17-36 能力表示[100] 污秽表示[101]（交代助手[102]/对换调教[112] 有
  // 守卫）避孕套设定[103]；:38-84 过滤[104-108]；:85-90 调教菜单[990-992]
  // ——整组按钮欠账，一行占位（含可检索的原作函数名）
  era.print(
    '（能力表示/污秽表示/避孕套设定/过滤/调教菜单等按钮尚未移植，此处为占位——原作 @SHOW_USERCOM（SHOW_CHARA_INFO 等），随调教 UI 票，见 docs/stub-registry.md。）',
  );
  era.println(); // 按钮组原作同行收尾的 PRINTL
  // :91 PRINTC 调教结束[999] —— 本票唯一挂载的菜单项（按钮正文不带 [999]
  // 前缀，引擎自动拼）
  era.printButton('调教结束', 999);
  era.println(); // :92 PRINTL
  // :93-100 PREVCOM > -1 → ＜上次的调教指令：…＞（不可达，见文件头）
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

module.exports = { STUBBED_CALLS };
