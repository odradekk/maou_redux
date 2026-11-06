// 变异条目表分片：chara-name-list（issue #388，CHARA_NAME_INIT 落表；
// #435 文件名被引擎误判为逐角色数据；#835 整张表移出静态数据成
// ere/data/chara-name-const.js 的常量表）。
// 目标文件：ere/system/chara/chara-name-list.js、ere/data/chara-name-const.js。
// 对应测试见 test/chara-name-list.test.js 与 test/chara-name.test.js。

export const COUNT = 4;

export default [
  {
    desc: 'M7968 get_fixed_chara_name 的空串缺省被删（表里没有的编号回 undefined）',
    file: 'ere/system/chara/chara-name-list.js',
    find: "  return LIST_CHARA_NAME[nid] ?? '';",
    replace: '  return LIST_CHARA_NAME[nid];',
    tests: ['chara-name-list'],
    must_mention: '必须返回空串',
  },
  {
    desc: 'M7969 查表编号偏一位（名字整体错位）',
    file: 'ere/system/chara/chara-name-list.js',
    find: '  return LIST_CHARA_NAME[nid] ?? ',
    replace: '  return LIST_CHARA_NAME[nid + 1] ?? ',
    tests: ['chara-name-list'],
    must_mention: '固定名按编号查出',
  },
  {
    desc: 'M7970 常量表的 0 号条目名字被改错（开局可抽到的固定名）',
    file: 'ere/data/chara-name-const.js',
    find: "  0: '玛丽',",
    replace: "  0: '玛丽娜',",
    tests: ['chara-name-list'],
    must_mention: '0 号编号同样是有效条目',
  },
  {
    desc: 'M7971 表尾条目越出声明尺寸（永不可达的编号）',
    file: 'ere/data/chara-name-const.js',
    find: "  5288: '万庄',",
    replace: "  5500: '万庄',",
    tests: ['chara-name-list'],
    must_mention: '必须落在声明尺寸内',
  },
];
