// 变异条目表切片：ere/utils/（共享工具模块）。
// 字段与运行方式见 tools/mutation-check.mjs 头注释。desc 里的 M 编号不人工
// 分配，只作引用基准，但全表必须唯一（#295；M117 曾被两票撞号，已改正）
// ——重号由 gate_shape 随 --verify 秒级核对。
/** 本分片条数（门 1）：增删条目必须同步改它，理由见 tools/mutation-check.mjs 头注 */
export const COUNT = 19; // #792 新建：17 条守 numeric/master 的三组取整语义、MASTER 取值与唯一性扫描，另 2 条自 train 分片随实现迁来（M1112/M1409）

export default [
  // —— 随实现迁来的条目（#792）——
  // 严格 TIMES（十进制定点乘）原先在 com-service 与 com-assistant 各写一份，
  // 由各自测试的「严格 times」用例守护；实现收进 ere/utils/numeric.js 后，
  // 两个模块的 times 导出改为转发该实现，条目跟着实现走、测试文件不变。
  {
    desc: 'M1112 严格 TIMES 退回浮点向下取整（#222；#792 起实现在 ere/utils/numeric.js）',
    file: 'ere/utils/numeric.js',
    find: '  return Number((BigInt(value) * numerator) / denominator);',
    replace: '  return Math.floor(value * rate); // 变异：JS 浮点截断',
    tests: ['com-service'],
    must_mention: '严格 times',
  },
  {
    desc: 'M1409 严格 TIMES 退回浮点向下取整（#225；#792 起实现在 ere/utils/numeric.js）',
    file: 'ere/utils/numeric.js',
    find: '  return Number((BigInt(value) * numerator) / denominator);',
    replace: '  return Math.floor(value * rate); // 变异：JS 浮点截断',
    tests: ['com-assistant'],
    must_mention: '严格 times',
  },

  // —— 本工单新增（#792）：每个函数各守自己的取整语义 ——
  {
    desc: 'M13761 default_rand 去掉向下取整（浮点值漏出）',
    file: 'ere/utils/numeric.js',
    find: '  return Math.floor(Math.random() * n);',
    replace: '  return Math.random() * n; // 变异：不取整',
    tests: ['numeric'],
    must_mention: 'default_rand：取值是 floor(random * n)',
  },
  {
    desc: 'M13762 default_rand 上界宽一格（RAND(n) 取得到 n）',
    file: 'ere/utils/numeric.js',
    find: '  return Math.floor(Math.random() * n);',
    replace:
      '  return Math.floor(Math.random() * (n + 1)); // 变异：上界宽一格',
    tests: ['numeric'],
    must_mention: 'default_rand：取值是 floor(random * n)',
  },
  {
    desc: 'M13763 times 不取整（乘算结果保留小数）',
    file: 'ere/utils/numeric.js',
    find: '  return Math.floor(value * multiplier);',
    replace: '  return value * multiplier; // 变异：不取整',
    tests: ['numeric'],
    must_mention: 'times：乘算后向下取整',
  },
  {
    desc: 'M13764 times 改成向零截断（负操作数上差 1）',
    file: 'ere/utils/numeric.js',
    find: '  return Math.floor(value * multiplier);',
    replace: '  return Math.trunc(value * multiplier); // 变异：改成截断',
    tests: ['numeric'],
    must_mention: 'times：乘算后向下取整',
  },
  {
    desc: 'M13765 times_trunc 改成向下取整（负操作数上差 1）',
    file: 'ere/utils/numeric.js',
    find: '  return Math.trunc(value * multiplier);',
    replace: '  return Math.floor(value * multiplier); // 变异：改成向下取整',
    tests: ['numeric'],
    must_mention: 'times_trunc：乘算后向零截断',
  },
  {
    desc: 'M13766 idiv 改成向零截断（负操作数上差 1）',
    file: 'ere/utils/numeric.js',
    find: '  return Math.floor(value / divisor);',
    replace: '  return Math.trunc(value / divisor); // 变异：改成截断',
    tests: ['numeric'],
    must_mention: 'idiv：除算后向下取整',
  },
  {
    desc: 'M13767 idiv_trunc 改成向下取整（负操作数上差 1）',
    file: 'ere/utils/numeric.js',
    find: '  return Math.trunc(value / divisor);',
    replace: '  return Math.floor(value / divisor); // 变异：改成向下取整',
    tests: ['numeric'],
    must_mention: 'idiv_trunc：除算后向零截断',
  },
  {
    desc: 'M13768 percent_floor 的百分数分母写成 10（90 × 140% 得 1260）',
    file: 'ere/utils/numeric.js',
    find: '  return Math.floor((value * percent) / 100);',
    replace:
      '  return Math.floor((value * percent) / 10); // 变异：分母写成 10',
    tests: ['numeric'],
    must_mention: 'percent_floor / percent_trunc：百分数换算',
  },
  {
    desc: 'M13769 percent_floor 改成向零截断（负基数上差 1）',
    file: 'ere/utils/numeric.js',
    find: '  return Math.floor((value * percent) / 100);',
    replace: '  return Math.trunc((value * percent) / 100); // 变异：改成截断',
    tests: ['numeric'],
    must_mention: 'percent_floor / percent_trunc：百分数换算',
  },
  {
    desc: 'M13770 percent_trunc 改成向下取整（负基数上差 1）',
    file: 'ere/utils/numeric.js',
    find: '  return Math.trunc((value * percent) / 100);',
    replace:
      '  return Math.floor((value * percent) / 100); // 变异：改成向下取整',
    tests: ['numeric'],
    must_mention: 'percent_floor / percent_trunc：百分数换算',
  },
  {
    desc: 'M13771 percent_floor 先把百分数折成小数（90 × 1.4 的双精度积少 1）',
    file: 'ere/utils/numeric.js',
    find: '  return Math.floor((value * percent) / 100);',
    replace: '  return Math.floor(value * (percent / 100)); // 变异：折成小数',
    tests: ['numeric'],
    must_mention: 'percent_* 不等于 times(value, percent / 100)',
  },
  {
    desc: 'M13772 times_exact 退回双精度乘算（175 × 1.4 差 1）',
    file: 'ere/utils/numeric.js',
    find: '  return Number((BigInt(value) * numerator) / denominator);',
    replace: '  return Math.floor(value * rate); // 变异：双精度乘算',
    tests: ['numeric'],
    must_mention: 'times_exact：十进制定点乘法',
  },
  {
    desc: 'M13773 times_exact 的分母固定 10（小数位多于一位时失真）',
    file: 'ere/utils/numeric.js',
    find: '  const denominator = 10n ** BigInt(fraction.length);',
    replace: '  const denominator = 10n; // 变异：分母固定 10',
    tests: ['numeric'],
    must_mention: 'times_exact：十进制定点乘法',
  },
  {
    desc: 'M13774 MASTER 常量改成 1（魔王不再是角色 0）',
    file: 'ere/utils/master.js',
    find: 'const MASTER = 0;',
    replace: 'const MASTER = 1; // 变异：魔王不是角色 0',
    tests: ['utils-shared'],
    must_mention: 'MASTER 是魔王的角色 ID 0',
  },
  {
    // 唯一性扫描的两条自检：拆豁免（口上的局部定义被扫出）与拆扫描面
    // （一份定义都找不到）。pipeline.mjs 的 M370 是同款形状。
    desc: 'M13775 唯一性扫描的口上豁免被拆（kojo 里保留的 default_rand/MASTER 定义被扫出）',
    file: 'test/utils-shared.test.js',
    find: "const EXEMPT_DIRS = [path.join(ERE_DIR, 'kojo')];",
    replace: 'const EXEMPT_DIRS = []; // 变异：口上不再豁免',
    tests: ['utils-shared'],
    must_mention: '的定义应为唯一一份',
  },
  {
    desc: 'M13776 唯一性扫描的扫描面清空（一份定义都扫不到，判据形同虚设）',
    file: 'test/utils-shared.test.js',
    find: '  for (const file of list_js(ERE_DIR)) {',
    replace: '  for (const file of []) { // 变异：扫描面清空',
    tests: ['utils-shared'],
    must_mention: '的定义应为唯一一份',
  },
  {
    desc: 'M13777 times_exact 的倍率负号分支拆掉（负数倍率被当正数乘）',
    file: 'ere/utils/numeric.js',
    find: "  const negative = text.startsWith('-');",
    replace: '  const negative = false; // 变异：负号分支拆掉',
    tests: ['numeric'],
    must_mention: 'times_exact：十进制定点乘法',
  },
];
