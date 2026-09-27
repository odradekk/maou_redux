/**
 * @file 固定名列表：查表实现（issue #388，#329 决定 10）。
 *
 * 固定名列表是「3,336 条编号 → 名字」的纯数据体，写成 JS 代码没有意义
 * （#329 决定 10），数据落点是 yml/NameList.yml——引擎在装载静态数据时
 * （早于 ere/main.js 导出的任何函数执行，见 AGENTS.md「启动顺序」）已经
 * 把它读进 field_names.namelist，本文件因此没有真正的初始化状态要建：
 * `chara_name_init` 只是把 valid_ids() 的缓存提前建好（下方函数文档细说），
 * 让 EVENTFIRST、EVENTLOAD 两处调用点（见 event-first.js／event-load.js
 * 各自的追溯注释）仍有对应实现可查、可被测试观测到。
 *
 * **表名/读取键与文件名强耦合**（#435）：引擎按文件名小写取表名，装载时
 * 一条写死的 /chara[^/]+\.yml/ 会把 chara 开头的文件划进逐角色数据桶——
 * 本表原名 CharaNameList.yml 因此从未走过「普通表」分支（详见
 * yml/NameList.yml 头注）。改名后读取键是 namelistkeys / namelistname:<id>，
 * 任何一处与文件名脱节都会让查表恒空——test/chara-name-list.test.js 的
 * 「文件名分类」与「引擎真解析驱动本模块」两条用例钉住这条链。
 *
 * 5 个计数常量（WEST_NAME_COUNT 等）不在本文件——它们只服务
 * chara_name_random_define 的随机范围计算，且已随 #332 独立放在
 * ere/chara/chara-name.js（JAPANESE_NAME_COUNT 等同值常量）。
 *
 * get_fixed_chara_name 是给 chara_name_define（ere 落点同为
 * ere/chara/chara-name.js）用的查表接口——这张工单只建表，默认名的缺省
 * 处理属于 chara_name_define 一侧（重名合并说明见 yml/NameList.yml 头注）。
 */

const era = require('#/era-electron');

/**
 * 固定名列表的声明尺寸（5500）。chara_name_define 判的是它而不是注册表
 * 尺寸——3,264 个已注册编号之外，声明域内还有大量空隙走「名字没有被
 * 记录」分支，两者不可互相代入。常量放在本模块：它是唯一持有该表产物的
 * 文件，chara-name.js 从这里的导出消费，不另立第二个来源。
 */
const LIST_CHARA_NAME_SIZE = 5500;

/**
 * 已注册 id 的缓存（Set，值为数字）。引擎的 `${表}name:${id}` 读法对未注册
 * 的 id 直接崩溃——app.asar 的 set_var 在这条分支只判「表在不在」
 * （`if (this.fieldNames[a]) return this.fieldNames[a][u].n`），不判「这个
 * id 在不在」，缺项时 `.n` 读在 undefined 上直接抛 TypeError（实机验证，
 * #388）。3,336 个编号里只有 3,264 个落进了本表（55→65 组重名合并，
 * 见 yml/NameList.yml 头注），中间大量空隙都会撞上这条——所以查表前
 * 必须先用 `namelistkeys`（= Object.values(staticData.namelist)，
 * 即全部已注册 id，dev-guides/09-static.md 的「变量序号数组」读法）确认
 * id 已注册，再读名字，否则一次未命中的随机抽取就能让整局崩溃。
 * @returns {Set<number>}
 */
let valid_ids_cache;

function valid_ids() {
  valid_ids_cache ??= new Set(era.get('namelistkeys'));
  return valid_ids_cache;
}

/**
 * chara_name_init：数据本身在静态表里、无事可做——真正有意义的动作是把
 * valid_ids() 的缓存提前建好，让 EVENTFIRST/EVENTLOAD 之后的首次查表不用
 * 现付这次 era.get。也让两处调用点变得可观测（fixture.var_reads 会看到
 * `namelistkeys`），而不是彻底的空调用——「调用点被删掉」因此是一处能被
 * 测试钉住的回归。
 * @returns {void}
 */
function chara_name_init() {
  valid_ids();
}

/**
 * 查表：按固定名编号取名字。
 *
 * @param {number} nid 固定名编号（声明范围 0-5499，稀疏——只有 3,264 个
 *   编号落进了本表，其余（含合并丢弃的 70 个）在此返回空串）
 * @returns {string} 查到的名字；编号未注册时空串（未命中时的默认名缺省
 *   处理在 chara_name_define，不在本函数）
 */
function get_fixed_chara_name(nid) {
  if (!valid_ids().has(nid)) {
    return '';
  }
  return era.get(`namelistname:${nid}`) ?? '';
}

module.exports = {
  chara_name_init,
  get_fixed_chara_name,
  LIST_CHARA_NAME_SIZE,
};
