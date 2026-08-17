/**
 * @file 角色显示名的读取助手。
 *
 * 源: 无对应源——SAVESTR:x / NAME:x 在 ere 侧的读数源是 callname 表
 *     （#5 决议），本模块把寻址与空值兜底收在一处。先例散见
 *     page-main-menu/page-train/page-select-target/event-comend，#44 收敛。
 *
 * **两个键的归属以引擎为准**（app.asar 的 addCharacter 方法体）：
 *
 *     data.callname[id][-1] = staticData.chara[id].name              // 名前
 *     data.callname[id][-2] = staticData.chara[id].callname ?? name  // 呼び名
 *
 * 即 -1 是姓名、-2 是称呼；`callname:c:u` 未设定时的回落取的正是 u 的 -2
 * （CONTEXT.md「称呼」行说的就是这条回落）。
 *
 * 本票的两个消费者当前都落在**姓名**上：
 *   - `NAME:MASTER` 本身就是名前；
 *   - `SAVESTR:x` 在本作里由 `%NAME:x%` 赋值（SYSTEM ver1.0.3.ERB:105），
 *     所以它等价于名前，不是呼び名。
 * 两者仍分成两个函数：SAVESTR 是可被游戏改写的存档字串、NAME 是静态预设，
 * 将来可能分家；呼び名（-2）等 CALLNAME:x 的消费者出现时再加。
 *
 * 读未声明键返回 undefined（#13），消费者要空串——一律 ?? '' 兜底。
 */

const era = require('#/era-electron');

/**
 * 角色的存档显示名（SAVESTR:x 的等价物；本作里 = 名前）。
 * @param {number} cid 角色 ID
 * @returns {string}
 */
function chara_callname(cid) {
  return era.get(`callname:${cid}:-1`) ?? '';
}

/**
 * 角色的姓名（NAME:x 的等价物 = 名前）。
 * @param {number} cid 角色 ID
 * @returns {string}
 */
function chara_name(cid) {
  return era.get(`callname:${cid}:-1`) ?? '';
}

module.exports = { chara_callname, chara_name };
