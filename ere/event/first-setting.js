/**
 * @file 开局设置 @FIRST_SETTING 的部分实现：仅「初期奴隶」一问（issue #50）。
 *
 * 源: target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB  @FIRST_SETTING（:781-935）
 *     本文件仅实现 :909-915 的初期奴隶子问（原文 :911 注释「初期奴隷」、
 *     :912 选项行、:913 INPUT、:914-915 SIF 0<=RESULT<=1 则 FLAG:501=RESULT）。
 *
 * FLAG:501 置法的决议（依据留在 issue #50）：三条路里选「只实现这一问」——
 *   - 整个 FIRST_SETTING 不做：魔王性别/肉棒尺寸/狂王性别（FLAG:500）会牵出
 *     魔王 TALENT 初始化，地下城模式（FLAG:502）会让迷宫分支半可达，丽塔/
 *     卡拉开关是 SAVEDATA 变量、无 ere 落点——各问都把本票拖进明确的
 *     「不在范围」（随机角色、丽塔/卡拉块、其余预设角色）；
 *   - 硬置默认值不做：:16-17 的「初期奴隷の初期値は村娘 / ;FLAG:501 = 1」
 *     在原作里是**被注释掉的死代码**，默认路径就是玩家问答；硬置 1 等于
 *     替玩家作答，且埋下开局设置票落地时的行为翻转；
 *   - 只实现这一问：FLAG:501 的两个取值（0 随机 / 1 村娘）都由玩家选择产生，
 *     与原作语义一致；随机路径维持既有存根行为（RAND_CHARA_MAKE 占位），
 *     不偷偷改默认。
 *
 * 其余各问（魔王性别 / 肉棒尺寸 / 狂王性别 / 地下城模式 / 丽塔开关，连同
 * 函数首行的 CFLAG:0:16 = -1 与 CALL QUE2MK）仍欠，占位行随本题打印，
 * docs/stub-registry.md 的 FIRST_SETTING 行登记为部分实现。
 */

const era = require('#/era-electron');

/**
 * 本文件存根化的原作调用名（其余各问整体）。docs/stub-registry.md 必须收录
 * （测试对账钉死）。
 */
const STUBBED_CALLS = ['FIRST_SETTING'];

/**
 * 「初期奴隶」一问：@FIRST_SETTING RESULT == 3 子问（:909-915）的移植。
 *
 * 原作里这一问是总菜单（:787-864，未移植）的一个子分支：无效输入不落笔、
 * 控制流回总菜单重绘。本切片没有总菜单，等价收敛为「重问本题」的循环；
 * 差异（原作可经 [100] 决定跳过此问、留下 FLAG:501 未置）已留痕：跳过时
 * Emuera 零值与显式 0 同义，本切片强制作答，两值仍都可达。
 *
 * 选项渲染遵循按钮约定（PR #30）：正文不写 [编号] 前缀，引擎 showAcc 会
 * 自动拼 `[快捷键] 正文`；accelerator 沿用原作编号 0/1。
 *
 * @returns {Promise<number>} 玩家的选择（0 随机 / 1 村娘），已写入 flag:501
 */
async function ask_initial_slave() {
  // 其余各问的占位（含原作函数名，可检索可断言）
  era.print(
    '（开局设置的其余各问（魔王性别/肉棒尺寸/狂王性别/地下城模式/丽塔开关）' +
      '尚未移植，维持默认值——原作 @FIRST_SETTING，见 docs/stub-registry.md。）',
  );

  // :912 PRINTL [0] 随机  [1] 村娘 —— 纯文本 + INPUT 改按钮（先例：
  // page-title.js 的 [0]/[1]）；ere 按钮独占一行，同行排版归 #9。原作无效
  // 输入经 GOTO INPUT_LOOP 回总菜单重绘，本切片等价为重渲染本题再问。
  for (;;) {
    era.print('初期奴隶：');
    era.printButton('随机', 0);
    era.printButton('村娘', 1);
    const result = await era.input();
    if (result === 0 || result === 1) {
      era.set('flag:501', result);
      return result;
    }
  }
}

module.exports = { ask_initial_slave, STUBBED_CALLS };
