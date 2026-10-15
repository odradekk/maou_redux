// issue #338：成熟奴隶黑市的常态末路。
// #797 按末路拆分后条目随实现落到各自的目标文件分片，编号与 desc 不变。
/** 本分片条数（门 1）：增删条目必须同步改它，理由见 tools/mutation-check.mjs 头注 */
export const COUNT = 1;

const code = 'ere/system/stronghold/sell-maturo-k0-normal.js';
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
    13898,
    '常态五十万档领主末路指向商人',
    '  else if (route === 2) ending = await normal_matu_ge500k_lord(ctx);',
    '  else if (route === 2) ending = await normal_matu_ge500k_merchant(ctx);',
    '状态 × 种族 × 价格档 × 职业 × 叶子条件完整矩阵',
  ),
];
