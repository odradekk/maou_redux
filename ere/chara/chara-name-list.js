/**
 * @file 固定名列表：查表实现（issue #388，#329 裁定 10 的落地）。
 *
 * 源: target/ERB/キャラ関数/CHARA_NAME_INIT.ERB:5-3360  @CHARA_NAME_INIT
 *
 * 原作 @CHARA_NAME_INIT 是「3,336 条 LIST_CHARA_NAME:n = 名字」的纯数据体，
 * 首行 SIF STRLENS(LIST_CHARA_NAME:0) > 1 RETURN（:7-8）只是防止游戏内重复
 * 初始化的守卫。写成 JS 代码没有意义（#329 裁定 10），数据落点是
 * yml/CharaNameList.yml——引擎在装载静态数据时（早于 ere/main.js 导出的任何
 * 函数执行，见 AGENTS.md「启动顺序」）已经把它读进 field_names.charanamelist，
 * 本文件因此没有真正的初始化状态要建：`chara_name_init` 只是把 valid_ids()
 * 的缓存提前建好（下方函数文档细说），让 SYSTEM ver1.0.3.ERB 里两处原作
 * CALL CHARA_NAME_INIT（EVENTFIRST、EVENTLOAD 钩子，行号见 event-first.js／
 * event-load.js 各自的追溯注释）仍有对应实现可查、可被测试观测到。
 *
 * 5 个计数常量（WEST_NAME_COUNT 等，:10-14）不在本文件——它们只服务
 * @CHARA_NAME_RANDOM_DEFINE 的随机范围计算，且已随 #332 独立落在
 * ere/chara/chara-name.js（JAPANESE_NAME_COUNT 等同值常量）。
 *
 * get_fixed_chara_name 是给未来 @CHARA_NAME_DEFINE 移植票（キャラ関数/
 * CHARA_NAME.ERB，ere 落点同为 ere/chara/chara-name.js）用的查表接口——
 * 本票只落表、不实现读取逻辑（默认名兜底等属于那张票，见
 * yml/CharaNameList.yml 头注的重名合并说明）。
 */

const era = require('#/era-electron');

/**
 * 已注册 id 的缓存（Set，值为数字）。引擎的 `${表}name:${id}` 读法对未注册
 * 的 id 直接崩溃——app.asar 的 set_var 在这条分支只判「表在不在」
 * （`if (this.fieldNames[a]) return this.fieldNames[a][u].n`），不判「这个
 * id 在不在」，缺项时 `.n` 读在 undefined 上直接抛 TypeError（实机验证，
 * #388）。3,336 个原作编号里只有 3,264 个落进了本表（55→65 组重名合并，
 * 见 yml/CharaNameList.yml 头注），中间大量空隙都会撞上这条——所以查表前
 * 必须先用 `charanamelistkeys`（= Object.values(staticData.charanamelist)，
 * 即全部已注册 id，dev-guides/09-static.md 的「变量序号数组」读法）确认
 * id 已注册，再读名字，否则一次未命中的随机抽取就能让整局崩溃。
 * @returns {Set<number>}
 */
let valid_ids_cache;
function valid_ids() {
  valid_ids_cache ??= new Set(era.get('charanamelistkeys'));
  return valid_ids_cache;
}

/**
 * @CHARA_NAME_INIT 的调用点实现：原作只是「已初始化就早退」的守卫，数据
 * 本身在静态表里、无事可做——真正有意义的动作是把 valid_ids() 的缓存提前
 * 建好，让 EVENTFIRST/EVENTLOAD 之后的首次查表不用现付这次 era.get。也让
 * 两处调用点变得可观测（fixture.var_reads 会看到 `charanamelistkeys`），
 * 而不是彻底的空调用——「调用点被删掉」因此是一处能被测试钉住的回归。
 * @returns {void}
 */
function chara_name_init() {
  valid_ids();
}

/**
 * 查表：按固定名编号取名字（原作 LIST_CHARA_NAME:nid 的等价读法）。
 *
 * @param {number} nid 固定名编号（原作声明范围 0-5499，稀疏——只有 3,264 个
 *   编号落进了本表，其余（含合并丢弃的 70 个）在此返回空串）
 * @returns {string} 查到的名字；编号未注册时空串（原作对应分支的默认名
 *   兜底属于 @CHARA_NAME_DEFINE 的移植票，不在本函数）
 */
function get_fixed_chara_name(nid) {
  if (!valid_ids().has(nid)) {
    return '';
  }
  return era.get(`charanamelistname:${nid}`) ?? '';
}

module.exports = { chara_name_init, get_fixed_chara_name };
