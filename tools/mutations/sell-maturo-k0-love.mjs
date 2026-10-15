// issue #338：成熟奴隶黑市的爱慕末路。
// #797 按末路拆分后条目随实现落到各自的目标文件分片（本片另新增 M13894-M13895），find 随缩进与文件迁移重取。
/** 本分片条数（门 1）：增删条目必须同步改它，理由见 tools/mutation-check.mjs 头注 */
export const COUNT = 14; // #797：原 sell-maturo-k0 分片（73 条）按末路拆分后的爱慕末路部分，编号与 desc 不变，本片另新增 M13894-M13895；旧计数沿革见 sell-maturo-k0.mjs

const code = 'ere/system/stronghold/sell-maturo-k0-love.js';
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
    7634,
    '职业 200 编号改错',
    "async function love_matu_ge1m(ctx) {\n  const { cid, target_name } = ctx;\n  let buyer = '';\n  let route = 0;\n  let ending = '';\n  if (era.get(`talent:${cid}:200`) == 1 || era.get(`talent:${cid}:203`) == 1) {",
    "async function love_matu_ge1m(ctx) {\n  const { cid, target_name } = ctx;\n  let buyer = '';\n  let route = 0;\n  let ending = '';\n  if (era.get(`talent:${cid}:199`) == 1 || era.get(`talent:${cid}:203`) == 1) {",
    '八种职业编号',
  ),
  make(
    7635,
    '职业 203 编号改错',
    "async function love_matu_ge1m(ctx) {\n  const { cid, target_name } = ctx;\n  let buyer = '';\n  let route = 0;\n  let ending = '';\n  if (era.get(`talent:${cid}:200`) == 1 || era.get(`talent:${cid}:203`) == 1) {",
    "async function love_matu_ge1m(ctx) {\n  const { cid, target_name } = ctx;\n  let buyer = '';\n  let route = 0;\n  let ending = '';\n  if (era.get(`talent:${cid}:200`) == 1 || era.get(`talent:${cid}:208`) == 1) {",
    '八种职业编号',
  ),
  make(
    7636,
    '职业 205 编号改错',
    "    buyer = '魔王军将军';\n    route = 3;\n  } else if (\n    era.get(`talent:${cid}:205`) == 1 ||\n    era.get(`talent:${cid}:207`) == 1\n  ) {",
    "    buyer = '魔王军将军';\n    route = 3;\n  } else if (\n    era.get(`talent:${cid}:204`) == 1 ||\n    era.get(`talent:${cid}:207`) == 1\n  ) {",
    '八种职业编号',
  ),
  make(
    7637,
    '职业 207 编号改错',
    "    buyer = '魔王军将军';\n    route = 3;\n  } else if (\n    era.get(`talent:${cid}:205`) == 1 ||\n    era.get(`talent:${cid}:207`) == 1\n  ) {",
    "    buyer = '魔王军将军';\n    route = 3;\n  } else if (\n    era.get(`talent:${cid}:205`) == 1 ||\n    era.get(`talent:${cid}:208`) == 1\n  ) {",
    '八种职业编号',
  ),
  make(
    7638,
    '职业 202 编号改错',
    "    buyer = '魔王军将军';\n    route = 3;\n  } else if (\n    era.get(`talent:${cid}:205`) == 1 ||\n    era.get(`talent:${cid}:207`) == 1\n  ) {\n    buyer = '魔界贵族';\n    route = 2;\n  } else if (\n    era.get(`talent:${cid}:202`) == 1 ||\n    era.get(`talent:${cid}:206`) == 1\n  ) {",
    "    buyer = '魔王军将军';\n    route = 3;\n  } else if (\n    era.get(`talent:${cid}:205`) == 1 ||\n    era.get(`talent:${cid}:207`) == 1\n  ) {\n    buyer = '魔界贵族';\n    route = 2;\n  } else if (\n    era.get(`talent:${cid}:201`) == 1 ||\n    era.get(`talent:${cid}:206`) == 1\n  ) {",
    '八种职业编号',
  ),
  make(
    7639,
    '职业 206 编号改错',
    "    buyer = '魔王军将军';\n    route = 3;\n  } else if (\n    era.get(`talent:${cid}:205`) == 1 ||\n    era.get(`talent:${cid}:207`) == 1\n  ) {\n    buyer = '魔界贵族';\n    route = 2;\n  } else if (\n    era.get(`talent:${cid}:202`) == 1 ||\n    era.get(`talent:${cid}:206`) == 1\n  ) {",
    "    buyer = '魔王军将军';\n    route = 3;\n  } else if (\n    era.get(`talent:${cid}:205`) == 1 ||\n    era.get(`talent:${cid}:207`) == 1\n  ) {\n    buyer = '魔界贵族';\n    route = 2;\n  } else if (\n    era.get(`talent:${cid}:202`) == 1 ||\n    era.get(`talent:${cid}:208`) == 1\n  ) {",
    '八种职业编号',
  ),
  make(
    7640,
    '爱慕十万档职业 201 例外丢失',
    "async function love_matu_ge100k(ctx) {\n  const { cid, target_name } = ctx;\n  let buyer = '';\n  let route = 0;\n  let ending = '';\n  if (era.get(`talent:${cid}:200`) == 1 || era.get(`talent:${cid}:203`) == 1) {\n    buyer = '魔王军的士官';\n    route = 3;\n  } else if (\n    era.get(`talent:${cid}:205`) == 1 ||\n    era.get(`talent:${cid}:201`) == 1",
    "async function love_matu_ge100k(ctx) {\n  const { cid, target_name } = ctx;\n  let buyer = '';\n  let route = 0;\n  let ending = '';\n  if (era.get(`talent:${cid}:200`) == 1 || era.get(`talent:${cid}:203`) == 1) {\n    buyer = '魔王军的士官';\n    route = 3;\n  } else if (\n    era.get(`talent:${cid}:205`) == 1 ||\n    era.get(`talent:${cid}:207`) == 1",
    'SELL_MATURO_K0：八种职业编号与爱慕十万档的例外逐项分流',
  ),
  make(
    7641,
    '话术门槛抬高',
    "async function love_matu_ge1m_tycoon({ cid, target_name }) {\n  let ending = '';\n  if (era.get(`abl:${cid}:15`) >= 5) {",
    "async function love_matu_ge1m_tycoon({ cid, target_name }) {\n  let ending = '';\n  if (era.get(`abl:${cid}:15`) >= 6) {",
    '状态 × 种族 × 价格档 × 职业 × 叶子条件完整矩阵',
  ),
  make(
    7643,
    '巨乳素质首编号改错',
    "async function love_matu_ge1m_noble({ cid, target_name }) {\n  let ending = '';\n  if (\n    era.get(`talent:${cid}:110`) == 1 ||",
    "async function love_matu_ge1m_noble({ cid, target_name }) {\n  let ending = '';\n  if (\n    era.get(`talent:${cid}:109`) == 1 ||",
    '状态 × 种族 × 价格档 × 职业 × 叶子条件完整矩阵',
  ),
  make(
    7644,
    '性爱狂素质编号改错',
    "async function love_matu_ge1m_general({ cid, target_name }) {\n  let ending = '';\n  if (era.get(`talent:${cid}:75`) == 1) {",
    "async function love_matu_ge1m_general({ cid, target_name }) {\n  let ending = '';\n  if (era.get(`talent:${cid}:74`) == 1) {",
    '状态 × 种族 × 价格档 × 职业 × 叶子条件完整矩阵',
  ),
  make(
    7645,
    '尻穴狂素质编号改错',
    "async function love_matu_ge1m_high_priest({ cid, target_name }) {\n  let ending = '';\n  if (era.get(`talent:${cid}:77`) == 1) {",
    "async function love_matu_ge1m_high_priest({ cid, target_name }) {\n  let ending = '';\n  if (era.get(`talent:${cid}:78`) == 1) {",
    '状态 × 种族 × 价格档 × 职业 × 叶子条件完整矩阵',
  ),
  make(
    7646,
    '肉便器素质编号改错',
    "async function love_matu_ge500k_merchant({ cid, target_name }) {\n  let ending = '';\n  if (era.get(`talent:${cid}:204`) == 1) {",
    "async function love_matu_ge500k_merchant({ cid, target_name }) {\n  let ending = '';\n  if (era.get(`talent:${cid}:209`) == 1) {",
    '状态 × 种族 × 价格档 × 职业 × 叶子条件完整矩阵',
  ),
  make(
    13894,
    '爱慕百万档贵族末路指向土豪',
    '  else if (route === 2) ending = await love_matu_ge1m_noble(ctx);',
    '  else if (route === 2) ending = await love_matu_ge1m_tycoon(ctx);',
    '状态 × 种族 × 价格档 × 职业 × 叶子条件完整矩阵',
  ),
  make(
    13895,
    '爱慕百万档贵族末路漏出正文表',
    '  love_matu_ge1m_noble,\n',
    '',
    'K0_ROUTES：每个末路族的正文条目数与该族末路数一致',
    ['sell-maturo-k0-routes'],
  ),
];
