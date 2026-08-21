/**
 * @file 移植角色旗标（portcflag）的初始化入口（issue #67）。
 *
 * 不是 1:1 移植——原作没有这张表。portcflag 是移植版自建的二维角色扩展表
 * （ADR-0001「新字段落在自造扩展表」的第一个实例，名字表 yml/PortCFlag.yml，
 * 登记 yml/_fixed.json），二次开发新增的按角色字段一律落此。
 *
 * 接入点：每个角色加入点在 addCharacter 之后调用 init_portcflag（角色 ID）。
 * 当前两处：标题新游戏的角色 0（page/page-title.js）、村娘分支的角色 17
 * （event/event-first.js）；随机角色（RAND_CHARA_MAKE 待办）落地时同款复用。
 * 不并入 chara-ex.js 的分发：那里的守卫（编号 ≥17 或 =0 才分发）是原作
 * @ADDCHARA_EX 的 1:1 语义，移植自建的动作不该被原作守卫筛掉。
 */

const era = require('#/era-electron');

/**
 * 移植数据标准的当前版本。预设基线 0 = 原作的算法（yml/Chara*.yml 的纯
 * 1:1 转换）；portcflag 的语义或某个角色预设的移植侧内容变更时 +1，
 * 并同步该角色预设里的 数据版本 行——迁移代码据此比对「存档里的值 <
 * 该角色应有版本」决定补值。首字段落地即 1。
 */
const PORT_DATA_VERSION = 1;

/**
 * 给刚加入的角色盖「数据版本」戳。
 *
 * // PORTCFLAG:角色:数据版本 = 该角色数据的移植版本版本
 * （底层寻址 `portcflag:${cid}:数据版本`，与序号寻址同槽）
 *
 * @param {number} cid 角色 ID
 * @returns {number} 写入后的值（era.set 的返回值）
 */
function init_portcflag(cid) {
  return era.set(`portcflag:${cid}:数据版本`, PORT_DATA_VERSION);
}

module.exports = { PORT_DATA_VERSION, init_portcflag };
