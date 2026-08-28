/**
 * @file 开局设置 @FIRST_SETTING 的部分实现：初期奴隶与地下城模式两问。
 *
 * 源: target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB  @FIRST_SETTING（:781-935）
 *     本文件实现 :909-915 的初期奴隶子问（原文 :911 注释「初期奴隷」、
 *     :912 选项行、:913 INPUT、:914-915 SIF 0<=RESULT<=1 则 FLAG:501=RESULT）
 *     与 :918-924 的地下城模式子问（:919 注释「;モード」、:920 选项行
 *     [0] 普通 [1] 2D、:921 INPUT、:923 SIF 0<=RESULT<=1 则 FLAG:502=RESULT）。
 *     两问在原作总菜单（:787-864，未移植）里是并列子分支 [3]/[4]。
 *
 * FLAG:501 置法的决议（依据留在 issue #50）：三条路里选「只实现这一问」——
 *   - 整个 FIRST_SETTING 不做：魔王性别/肉棒尺寸/狂王性别（FLAG:500）会牵出
 *     魔王 TALENT 初始化，地下城模式（FLAG:502）会让迷宫分支半可达，丽塔/
 *     卡拉开关是 SAVEDATA 变量、无 ere 落点——各问都把这张票拖进明确的
 *     「不在范围」（随机角色、丽塔/卡拉块、其余预设角色）；
 *   - 硬置默认值不做：:16-17 的「初期奴隷の初期値は村娘 / ;FLAG:501 = 1」
 *     在原作里是**被注释掉的死代码**，默认路径就是玩家问答；硬置 1 等于
 *     替玩家作答，且埋下开局设置票落地时的行为翻转；
 *   - 只实现这一问：FLAG:501 的两个取值（0 随机 / 1 村娘）都由玩家选择产生，
 *     与原作语义一致；随机路径维持既有存根行为（RAND_CHARA_MAKE 占位），
 *     不偷偷改默认。
 *
 * FLAG:502（地下城模式）一问由 #181（H12，#168 裁定 5「连带补开关」）加进：
 * 2D 地下城模式（LABO 三文件）要真的可达，FLAG:502 必须有玩家置位路径——
 * 只移植不接通会造出一批「移植了但从没跑过」的代码（#21/#22/#129 三次实机
 * 翻车形态）。问法照 ask_initial_slave 的既有形态（两按钮 + 强制作答）。
 * 其余各问（魔王性别 / 肉棒尺寸 / 狂王性别 / 丽塔开关，连同函数首行的
 * CFLAG:0:16 = -1 与 CALL QUE2MK）仍欠，占位行随本题打印，
 * docs/stub-registry.md 的 FIRST_SETTING 行登记为部分实现。
 */

const era = require('#/era-electron');
const { game } = require('#/facade/game');

/**
 * 本文件存根化的原作调用名（其余各问整体）。docs/stub-registry.md 必须收录
 * （测试核对固定）。
 */
const STUBBED_CALLS = ['FIRST_SETTING'];

/**
 * 「初期奴隶」一问：@FIRST_SETTING RESULT == 3 子问（:909-915）的移植。
 *
 * 原作里这一问是总菜单（:787-864，未移植）的一个子分支：无效输入不落笔、
 * 控制流回总菜单重绘。本切片没有总菜单，等价收敛为「重问本题」的循环；
 * 差异（原作可经 [100] 决定跳过此问、留下 FLAG:501 未置）已记录：跳过时
 * Emuera 零值与显式 0 同义，本切片强制作答，两值仍都可达。
 *
 * 选项渲染遵循按钮约定（PR #30）：正文不写 [编号] 前缀，引擎 showAcc 会
 * 自动拼 `[快捷键] 正文`；accelerator 沿用原作编号 0/1。
 *
 * @returns {Promise<number>} 玩家的选择（0 随机 / 1 村娘），已写入 flag:501
 */
async function ask_initial_slave() {
  // 其余各问的占位（含原作函数名，可检索可断言；#181 起地下城模式已实现，
  // 清单相应缩短）
  era.print(
    '（开局设置的其余各问（魔王性别/肉棒尺寸/狂王性别/丽塔开关）' +
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

/**
 * 「地下城模式」一问：@FIRST_SETTING RESULT == 4 子问（:918-924）的移植
 * （#181 H12 加进，#168 裁定 5）。
 *
 * 与 ask_initial_slave 同形态（总菜单未移植 → 重问循环收敛；[100] 跳过
 * 与显式 0 同义——FLAG:502 的 Emuera 零值就是「普通」模式）。原作菜单行
 * 带开发中标记（:833 `[4] 地下城模式 [锐意制作中]`），问句保持原文语义。
 *
 * @returns {Promise<number>} 玩家的选择（0 普通 / 1 2D），已写入 flag:502
 *   （dungeon 属主，走 game 门面）
 */
async function ask_dungeon_mode() {
  // :920 PRINTL [0] 普通  [1] 2D —— 按钮化同 ask_initial_slave
  for (;;) {
    era.print('地下城模式：');
    era.printButton('普通', 0);
    era.printButton('2D', 1);
    const result = await era.input();
    if (result === 0 || result === 1) {
      game.dungeon.迷宫模式 = result; // :924 FLAG:502 = RESULT
      return result;
    }
  }
}

module.exports = { ask_initial_slave, ask_dungeon_mode, STUBBED_CALLS };
