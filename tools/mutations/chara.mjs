// 变异条目表切片：ere/chara/（角色域）。字段与运行方式见
// tools/mutation-check.mjs 头注释；新增/删除条目必须同步改工具里的
// LEDGER_COUNT_BASELINE（两项检查）。desc 里的 M 编号是历史惯性编号
// （M117 曾被两票撞号使用），只作引用锚点保留，不再人工分配。
export default [
  {
    desc: 'M307 CM_STP 的 CFLAG:A:1 = 2 改 3（接入点触发条件被改坏——三分叉测试必须红）',
    file: 'ere/chara/chara-make.js',
    find: '  chara(cid).invasion.状态 = 2; // :127 CFLAG:A:1 侵攻中',
    replace: '  chara(cid).invasion.状态 = 3; // :127 CFLAG:A:1 侵攻中',
    tests: ['chara-make'],
    must_mention: 'CFLAG:A:1 = 2 侵攻中',
  },
  {
    desc: 'M308 三分叉第一支守卫砍掉 !精英（精英部下误走 CM_STP——验收清单第 3 条必须红）',
    file: 'ere/chara/chara-make.js',
    find: '  if (!elite && !ex1 && !offspring) {',
    replace: '  if (!ex1 && !offspring) {',
    tests: ['chara-make'],
    must_mention: 'CFLAG:A:1 = 0（精英部下）',
  },
  {
    desc: 'M309 转发层折叠（@CHAR_MAKE 不再 JUMP 本体——转发测试必须红）',
    file: 'ere/chara/char-make.js',
    find: '  return chara_make(cid, arg0, arg1, rand);',
    replace: '  return cid;',
    tests: ['chara-make'],
    must_mention: 'JUMP CHARA_MAKE(A, ARG:0, ARG:1) 的实参形态',
  },
];
