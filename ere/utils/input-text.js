/**
 * @file 自由文本输入（`INPUTS`）的读值归一——空输入的统一判据（issue #567）。
 *
 * 源: 无对应源——Emuera 侧没有这一层（原作的 `INPUTS` 直接给出 `RESULTS`），
 *     本模块承接的是 ere 引擎的输入通道差异（getNumber 归一 + 渲染层空守卫），
 *     不是某个 ERB 函数的移植。
 *
 * 引擎事实两条（本函数的判据来源）：
 *
 *   1. **回传值先经 `getNumber` 归一**（`Number(e); isNaN(t) ? e : t`，
 *      app.asar 模块 65）：空串与 `"0"` 到手都是数值 0、非数字串原样返回
 *      （chara-self-call.js 的 MODE 1 段有同源实测注记；test/helpers/
 *      era-fixture.js 的 `get_number` 逐字镜像，#151）。纯空白串同理——
 *      `Number(' ')` 也是 0，而渲染层的非空守卫只拦空串（空格是「非空」、
 *      能提交），到手仍是 0。
 *   2. **渲染层不受理空提交**（app.vue 的 returnFromInput 空守卫；
 *      dev-guides/05-interaction.md:124「不会是 `undefined` 或空字符串`''`」）：
 *      玩家直接回车根本交不出值。该字面锚在 tools/engine-contract-facts.mjs
 *      的 `input-empty-submit-guard`（#567 升格为全库判据的支柱后进表）。
 *
 * 两条合起来：原作各处用「留空 / 不输入」表达消去、重置、随机生成的自由文本
 * 分支，在 ere 侧的**唯一可达等价物就是输入 0**。按 A 处理（0 当作字面量文本）
 * 会让那些分支变成死代码——#567 因此裁定全库按 B 统一：0 视为空输入。
 * 代价是玩家不能把文本取成字面量「0」，这是有意的取舍，理由与普查清单见
 * 该票；EraElectron 上不存在既不丢分支又保留字面量「0」的做法（引擎的归一
 * 发生在游戏代码读值之前）。
 *
 * 三处曾经就地展开的判空（`page-shop-labo.js` 的 `input_text`、
 * `chara-custom2.js` 的 `input_string`、`chara-self-call.js` 的 `raw !== 0`）
 * 收进来共用这一份判据；`chara-name-edit.js`、`chara-custom.js`、
 * `page-save-load.js` 三处在 #567 由 A 翻修为 B 时一并改用它。
 *
 * **唯一的例外**：#567 普查里还发现 `ere/system/cross-save-sharing.js` 的队伍名
 * （MAOUNET.ERB 的 `INPUTS`）——原作没有空输入分支（`LOCALS = %RESULTS%` 直接
 * 落地），按「没有空输入分支的地方不动」保持原样（该处 0 仍是字面量文本），
 * 不走本函数；改动它属于另立裁定，不在 #567 的范围。
 */

/**
 * `INPUTS` 的等价物：取玩家输入的自由文本，空输入还原成空串。
 *
 * `undefined` / `null` 是缺值形态（真机上渲染层拦下空提交、不会出现，夹具
 * 留作形态覆盖），与引擎归一后的 0 一并归空串。
 *
 * @param {unknown} raw era.input() 的回传值
 * @returns {string} 输入文本；空输入 = 空串
 */
function input_text(raw) {
  if (raw === undefined || raw === null || raw === 0) {
    return '';
  }
  return String(raw);
}

module.exports = { input_text };
