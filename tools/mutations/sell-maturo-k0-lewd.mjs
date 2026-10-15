// issue #338：成熟奴隶黑市的淫乱末路。
// #797 按末路拆分后条目随实现落到各自的目标文件分片（本片无新增条目），find 随缩进与文件迁移重取。
/** 本分片条数（门 1）：增删条目必须同步改它，理由见 tools/mutation-check.mjs 头注 */
export const COUNT = 5; // #797：原 sell-maturo-k0 分片（73 条）按末路拆分后的淫乱末路部分，编号与 desc 不变，本片无新增条目；旧计数沿革见 sell-maturo-k0.mjs

const code = 'ere/system/stronghold/sell-maturo-k0-lewd.js';
const make = (
  id,
  desc,
  find,
  replace,
  must_mention,
  tests = ['sell-maturo'],
) => ({
  desc: `M${id} ${desc}`,
  file: code,
  find,
  replace,
  tests,
  must_mention,
});

export default [
  make(
    7642,
    '私处感觉门槛抬高',
    '  if (era.get(`abl:${cid}:2`) >= 5) {\n    await era.printAndWait(`${target_name}作为干部的情妇生活着。`);',
    '  if (era.get(`abl:${cid}:2`) >= 6) {\n    await era.printAndWait(`${target_name}作为干部的情妇生活着。`);',
    '状态 × 种族 × 价格档 × 职业 × 叶子条件完整矩阵',
  ),
  make(
    7661,
    '淫乱高价一百级门槛抬高',
    "async function lewd_matu_ge1m_spy_agency({ cid, target_name }) {\n  let ending = '';\n  if (era.get(`cflag:${cid}:9`) >= 100) {",
    "async function lewd_matu_ge1m_spy_agency({ cid, target_name }) {\n  let ending = '';\n  if (era.get(`cflag:${cid}:9`) >= 101) {",
    '状态 × 种族 × 价格档 × 职业 × 叶子条件完整矩阵',
  ),
  make(
    7662,
    '淫乱五十万档五十级门槛抬高',
    "async function lewd_matu_ge500k_high_officer({ cid, target_name }) {\n  let ending = '';\n  if (era.get(`cflag:${cid}:9`) >= 50) {",
    "async function lewd_matu_ge500k_high_officer({ cid, target_name }) {\n  let ending = '';\n  if (era.get(`cflag:${cid}:9`) >= 51) {",
    '状态 × 种族 × 价格档 × 职业 × 叶子条件完整矩阵',
  ),
  make(
    7663,
    '淫乱十万档三十级门槛抬高',
    '  if (era.get(`cflag:${cid}:9`) >= 30) {',
    '  if (era.get(`cflag:${cid}:9`) >= 31) {',
    '状态 × 种族 × 价格档 × 职业 × 叶子条件完整矩阵',
  ),
  make(
    7664,
    '淫乱低价二十级门槛抬高',
    '  if (era.get(`cflag:${cid}:9`) >= 20) {',
    '  if (era.get(`cflag:${cid}:9`) >= 21) {',
    '状态 × 种族 × 价格档 × 职业 × 叶子条件完整矩阵',
  ),
];
