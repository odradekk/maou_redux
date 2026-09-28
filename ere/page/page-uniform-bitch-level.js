/**
 * @file 统一卖春积极性（issue #545，阶段 6 S4）：名册页 [1600] 的批量卖春
 * 积极性设置流程。
 *
 * 调用方：ere/page/page-chara-info.js 的名册循环（result === 1600 时进入本
 * 流程）。函数结束后重进名册；名册的页码与排序选择由名册循环自己保管，
 * 调用处 `continue` 重绘即沿用现值——本函数不碰名册的任何状态，既不写也
 * 不复位。
 *
 * 移植说明（有意偏离，均注明依据）：
 *   - 等级输入的越界分支在 ere 输入白名单下不可达（本轮只打印 [0]-[5]
 *     按钮，引擎只回传已打印快捷键），不镜像——顺带不镜像「无效输入时
 *     按 0 级播报完成语、却一个都没写入」的怪异组合（起手清零、有效
 *     输入后才赋值）；
 *   - 等级按钮正文不写 [0]-[5]（引擎按 showAcc 拼 `[N] ` 前缀，AGENTS.md
 *     硬约束，PR #30）；四个范围按钮正文保留 `[ … ]` 括号标签——
 *     那是文字本体、不含编号前缀；
 *   - 2003 取消与其余输入落到空分支：不动作，直接返回。
 */

const era = require('#/era-electron');
const { chara } = require('#/facade/chara');

/**
 * uniform_bitch_level：按范围把全部在册角色的卖春积极性
 * （CFLAG:120，chara(cid).patch.卖春积极性）统一设置成同一等级。
 *
 * 三个范围各配一段提示语与一个状态条件（侵攻中＝状态 2、迎击中＝状态 3），
 * 三段同构分支逐字保留；魔王（角色 ID 0）恒跳过。
 * @returns {Promise<void>}
 */
async function uniform_bitch_level() {
  era.print('统一设置迷宫内角色的"卖春积极性"');
  era.printMultiColumns([
    {
      type: 'button',
      accelerator: 2000,
      content: '[ 全侵攻中的勇者 ]',
      config: { align: 'left', width: 6 },
    },
    {
      type: 'button',
      accelerator: 2001,
      content: '[ 全迎击中的奴隶 ]',
      config: { align: 'left', width: 6 },
    },
    {
      type: 'button',
      accelerator: 2002,
      content: '[ 所有侵攻与迎击者 ]',
      config: { align: 'left', width: 6 },
    },
    {
      type: 'button',
      accelerator: 2003,
      content: '[ 取消设置 ]', // （「取消設置」按 #60 归一为简体）
      config: { align: 'left', width: 6 },
    },
  ]);
  era.println();
  const target = await era.input();

  // 三支范围分支；2003 与其余输入落到空分支，
  // 不动作直接返回（重进名册由调用方处理）
  let scope;
  if (target === 2000) {
    scope = { states: [2], message: '侵攻中的勇者（不含以后出现的新勇者）' };
  } else if (target === 2001) {
    scope = { states: [3], message: '全迎击中的奴隶（不含以后追加的新奴隶）' };
  } else if (target === 2002) {
    scope = {
      states: [2, 3],
      message: '所有侵攻与迎击者（不含以后新入迷宫的对象）',
    };
  } else {
    return;
  }

  era.print('要将积极性设置为多少？');
  era.printMultiColumns(
    [0, 1, 2, 3, 4, 5].map((level) => ({
      type: 'button',
      // [0]-[5] 按钮；正文不写编号（文件头）
      accelerator: level,
      content: '',
      config: { align: 'left', width: 4 },
    })),
  );
  era.println(); // 空行
  const level = await era.input(); // （白名单下恒 0-5，见文件头）

  // 魔王（角色 ID 0）跳过；状态条件命中的角色才写卖春积极性
  for (const cid of era.getAddedCharacters()) {
    if (cid === 0) continue;
    const state = chara(cid).invasion.状态;
    if (scope.states.includes(state)) {
      chara(cid).patch.卖春积极性 = level;
    }
  }
  await era.printAndWait(
    `已将当前迷宫${scope.message}，卖春积极性全设置为${level}了`,
  );
}

module.exports = { uniform_bitch_level };
