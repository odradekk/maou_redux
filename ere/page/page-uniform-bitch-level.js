/**
 * @file 统一卖春积极性（issue #545，阶段 6 S4）：名册页 [1600] 的批量卖春
 * 积极性设置流程。
 *
 * 调用方：ere/page/page-chara-info.js 的 CHARA_INFO 分发（result === 1600，
 * 源 :62-63 `CALL 统一卖春积极性`）。函数尾 `JUMP CHARA_INFO`（:76）＝重进
 * 名册；名册侧的 NO_PAGE/SORT_SELECT/SORT_ACT 都是**静态变量**（指南
 * user-defined-variables.md:67-69），调用处 `continue` 重绘即该语义——
 * 本函数不碰名册的任何状态，既不写也不复位。
 *
 * 移植说明（有意偏离，均注明依据）：
 *   - 等级输入的 `IF RESULT < 6`（:21/:42/:63）在 ere 输入白名单下不可达
 *     （本轮只打印 [0]-[5] 按钮，引擎只回传已打印快捷键），按「1:1 精简
 *     为可达分支」不镜像——顺带不镜像「无效输入时播报 N:9=0 却未写入」的
 *     原作怪癖（:3 起手清零 + :22 才赋值的组合）；
 *   - 等级按钮正文不写 [0]-[5]（引擎按 showAcc 拼 `[N] ` 前缀，AGENTS.md
 *     硬约束，PR #30）；四个范围按钮正文保留原作的 `[ … ]` 括号标签——
 *     那是文字本体、不含编号前缀；
 *   - 2003 取消（:8）在原作落到空 ELSE（:74-75）后 JUMP，ere 同样不动作。
 */

const era = require('#/era-electron');
const { chara } = require('#/facade/chara');

/**
 * @统一卖春积极性（:2-76）：按范围把全部在册角色的卖春积极性
 * （CFLAG:120，chara(cid).patch.卖春积极性）统一设置成同一等级。
 *
 * 三个范围各配一段提示语与一个状态判据（侵攻中＝状态 2、迎击中＝状态 3），
 * 逐字取自原作三段同构分支；魔王（COUNT == MASTER）恒跳过（:24）。
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
      content: '[ 取消设置 ]', // （原文「取消設置」，按 #60 归一为简体）
      config: { align: 'left', width: 6 },
    },
  ]);
  era.println();
  const target = await era.input();

  // 三支范围分支；2003 与其余输入落到空 ELSE（:74-75），
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
      // 的 [0]-[5] 按钮；正文不写编号（文件头）
      accelerator: level,
      content: '',
      config: { align: 'left', width: 4 },
    })),
  );
  era.println(); // 空行（:9 同款）
  const level = await era.input(); // （白名单下恒 0-5，见文件头）

  // REPEAT CHARANUM → SIF COUNT == MASTER CONTINUE →
  // 状态判据命中才写 CFLAG:COUNT:120 = N:9
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
