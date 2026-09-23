/**
 * @file 移植角色旗标（portcflag）的读写入口（issue #67；#545 起有第二个字段）。
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
 *
 * 字段（yml/PortCFlag.yml）：
 *   0 数据版本——加入角色时盖的移植版本戳，只有写入点；
 *   1 排序编号——名册「编号」视图的排列键（#545 返工），默认回落角色 ID。
 * 两个字段都直接 era.get/set 具名寻址、不经域门面：portcflag 在
 * tools/facade-names.js 的 PORT_TABLE_OWNERS 里没有属主声明（该文件写明
 * 「第二个字段进来时随字段语义在此声明」是留给门面收敛的条件），本字段
 * 只被名册页读写、跨域写径尚未出现，与「数据版本」同款保持直连。
 */

const era = require('#/era-electron');

/**
 * 移植数据标准的当前版本（#135 起为诊断戳，ADR-0006）。预设基线 0 = 原作
 * 的算法（yml/Chara*.yml 的纯 1:1 转换）；portcflag 的语义或某个角色预设
 * 的移植侧内容变更时 +1。**它没有迁移消费者**——「移植期不保证存档兼容」
 * 决议废除了迁移路线，其剩余用途是诊断戳：读档后可辨别该角色由哪一版预设
 * 生成。这类变更（扩展表字段/预设内容）按 ADR-0006 判定表属破坏性改动，
 * 须抬 GameBase 版本废档处理，而不是据此补值。首字段落地即 1。
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

/**
 * 角色的排序编号（PORTCFLAG:角色:排序编号）：名册「编号」视图与其换号页的
 * 排列键。缺省 0 = 未设 → 回落角色 ID，因此没换过号时顺序就是 ID 序；
 * 换号也不会写 0（候选不含 0），0 可以安全地当哨兵。
 *
 * @param {number} cid 角色 ID
 * @returns {number} 排序编号（未设时为该角色的 ID）
 */
function sort_number_of(cid) {
  return era.get(`portcflag:${cid}:排序编号`) || cid;
}

/**
 * 交换两个角色的排序编号——**只动这一个值**：不搬任何角色数据、不改角色
 * ID（ID 即身份，issue #21）。原作的换号是 SWAPCHARA 搬数据，ere 里换成
 * 换排列键，两种做法的可观察差异见 page-chara-number-swap.js 文件头。
 *
 * 两个值先后读出再写，不读回自己刚写的那个（先写 a 再读 a 会拿到 b 的值、
 * 把 b 写成自己的旧值）。
 * @param {number} a 角色 ID
 * @param {number} b 角色 ID
 */
function swap_sort_numbers(a, b) {
  const a_number = sort_number_of(a);
  const b_number = sort_number_of(b);
  era.set(`portcflag:${a}:排序编号`, b_number);
  era.set(`portcflag:${b}:排序编号`, a_number);
}

/**
 * 按排序编号升序排列一份角色 ID 表（并列按 ID 升序，结果与输入顺序无关）。
 * @param {number[]} ids 角色 ID 表
 * @returns {number[]} 新数组，不改入参
 */
function sort_by_number(ids) {
  return [...ids].sort(
    (a, b) => sort_number_of(a) - sort_number_of(b) || a - b,
  );
}

module.exports = {
  PORT_DATA_VERSION,
  init_portcflag,
  sort_number_of,
  swap_sort_numbers,
  sort_by_number,
};
