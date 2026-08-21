// 变异台账切片：yml/ 与 res/（静态表产物与媒体注册）。
// 字段与运行方式见 tools/mutation-check.mjs 头注释；新增/删除条目必须同步改
// 工具里的 LEDGER_COUNT_BASELINE（两道门）。desc 里的 M 编号是历史惯性编号
// （M117 曾被两票撞号使用），只作引用锚点保留，不再人工分配。
export default [
  {
    desc: 'M112 Chara17 预设行被删（预设生效用例必须红）',
    file: 'yml/Chara17.yml',
    find: `"portcflag":
  "数据版本": 0`,
    replace: '# 变异：portcflag 预设行删除',
    tests: ['portcflag-table'],
    must_mention: '预设',
  },
  {
    desc: 'M113 Chara17 预设基线改坏（0 改 3）',
    file: 'yml/Chara17.yml',
    find: `"portcflag":
  "数据版本": 0`,
    replace: `"portcflag":
  "数据版本": 3`,
    tests: ['portcflag-table'],
    must_mention: '预设',
  },
  {
    desc: 'M114 登记被删（_fixed.json 清空——契约锁必须红）',
    file: 'yml/_fixed.json',
    find: `{
  "system": {
    "extendedCharaTables": ["portcflag"]
  }
}`,
    replace: `{
  "system": {
    "extendedCharaTables": []
  }
}`,
    tests: ['portcflag-table'],
    must_mention: '登记',
  },
  {
    desc: 'M115 名字表 id 改坏（数据版本 id 0 改 3——装载/寻址/预设全红）',
    file: 'yml/PortCFlag.yml',
    find: `"数据版本":
  id: 0`,
    replace: `"数据版本":
  id: 3`,
    tests: ['portcflag-table'],
    must_mention: '名字表',
  },
  {
    desc: 'M124 注册表漏行（img.csv 删掉 TITLE 注册，引擎装载与引用锁双红）',
    file: 'res/img.csv',
    find: 'TITLE,TITLE.png\n',
    replace: '',
    tests: ['resource-media'],
    must_mention: 'TITLE',
  },
  {
    desc: 'M126 默认配置的资源开关被关掉（resource true→false——#69 重开的交付项）',
    file: 'yml/_config.json',
    find: '"resource": true,',
    replace: '"resource": false,',
    tests: ['resource-media'],
    must_mention: '版本库默认配置',
  },
  {
    desc: 'M127 默认配置漏键（删 window.audio——缺键被 syncConfig 永久物化的坑）',
    file: 'yml/_config.json',
    find: `    "audio": 100,
    "autoMax": false,`,
    replace: `    "autoMax": false,`,
    tests: ['resource-media'],
    must_mention: '引擎默认配置整份',
  },
];
