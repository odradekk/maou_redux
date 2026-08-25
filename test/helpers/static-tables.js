/**
 * @file 入库变量表（yml/Base.yml、Talent.yml、Item.yml）的装载助手（issue #38）。
 *
 * 与 test/helpers/chara.js 同类：给页面/比对用例提供「引擎装载后的真实表
 * 形状」。装载全程用引擎自己的 parseDataFile 与 eraStart 变量表分支转写
 * （test/helpers/engine-bundle.js），不经自写镜像。缺引擎（无 app.asar）
 * 时 load_repo_variable_tables 返回 undefined，用例自行 skip。
 */

const fs = require('node:fs');
const path = require('node:path');

const {
  create_variable_loader,
  load_engine_bundle,
} = require('./engine-bundle');

const REPO_ROOT = path.resolve(__dirname, '..', '..');

// 入库变量表清单：文件 → 表名（eraStart 用的归一表名）。后续表（Abl/Exp/…）
// 随各自的数据管线票入库时在此登记。CFlag.yml 不是转换器产物（原作无
// CFLAG 名表，见该文件头注释），登记在此使比对与实机装载一致：缺它时
// 角色预设的 フラグ 行报「角色数据表不存在: cflag!」并被丢弃（#50 实测）。
// PortCFlag.yml 同为人工表（移植自建扩展表，#67）：登记在此使 Chara17.yml
// 的 portcflag 预设行在装载循环里可翻译（名字表缺位同样报错丢弃）。
// Abl/CStr（#43 入库）随 #113 登记：Chara35 是首个带 ABL/CSTR 预设行的
// 入库角色，缺表时这两行同样被报错丢弃。
// Mark/Exp（#43 入库）随 #138 登记：常规批 Chara34 首带 MARK 预设行（缺表
// 时整行报错丢弃，#138 前仅 Chara223 有 EXP 行、编号外批未入库，一直漏登）。
// Ex_Talent.yml（#138，原作 EXCOM.ERH:4 的 CHARADATA EX_TALENT）：登记使
// 比对与实机装载一致——虽然常规批 Chara*.yml 没有 ex_talent 预设段，但
// extendedCharaTables 里的表理应在装载循环视野内（空名字表建
// staticData.ex_talent，数字下标寻址的回落依赖它）。
const TABLE_FILES = [
  ['Base.yml', 'base'],
  ['Talent.yml', 'talent'],
  ['Item.yml', 'item'],
  ['CFlag.yml', 'cflag'],
  ['PortCFlag.yml', 'portcflag'],
  ['Ex_Talent.yml', 'ex_talent'],
  ['Abl.yml', 'abl'],
  ['CStr.yml', 'cstr'],
  ['Mark.yml', 'mark'],
  ['Exp.yml', 'exp'],
];

/**
 * 用引擎自己的解析器与装载循环装载全部入库变量表。
 * @returns {{ static_data: object, field_names: object, warnings: string[] } |
 *           undefined}
 */
function load_repo_variable_tables() {
  const engine = load_engine_bundle();
  if (!engine) {
    return undefined;
  }
  const loader = create_variable_loader();
  for (const [file, table] of TABLE_FILES) {
    const text = fs.readFileSync(path.join(REPO_ROOT, 'yml', file), 'utf8');
    loader.load_rows(engine.parse_data_file(text, 'yml', table), table);
  }
  return loader;
}

/**
 * 把已装载的变量表挂到角色装载器（create_chara_loader 的返回值）上。
 * structuredClone 逐用例隔离，防止预设装载互相串档。
 * @param {{ static_data: object }} loader 角色装载器
 * @param {{ static_data: object }} tables load_repo_variable_tables 的返回值
 */
function attach_variable_tables(loader, tables) {
  for (const table of Object.keys(tables.static_data)) {
    loader.static_data[table] = structuredClone(tables.static_data[table]);
  }
}

module.exports = {
  TABLE_FILES,
  attach_variable_tables,
  load_repo_variable_tables,
};
