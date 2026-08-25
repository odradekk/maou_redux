// 变异条目表切片：yml/ 与 res/（静态表产物与媒体注册）。
// 字段与运行方式见 tools/mutation-check.mjs 头注释；新增/删除条目必须同步改
// 工具里的 LEDGER_COUNT_BASELINE（两项检查）。desc 里的 M 编号是历史惯性编号
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
    find: `"extendedCharaTables": ["portcflag", "ex_talent"],`,
    replace: `"extendedCharaTables": [],`,
    tests: ['portcflag-table'],
    must_mention: '登记清单为空',
  },
  {
    desc: 'M240 ex_talent 登记被删（_fixed.json 只留 portcflag——降一维回到 #21 缺口，写入全部静默丢弃，#138）',
    file: 'yml/_fixed.json',
    find: `"extendedCharaTables": ["portcflag", "ex_talent"],`,
    replace: `"extendedCharaTables": ["portcflag"],`,
    tests: ['extalent-table'],
    must_mention: '九处写入全部静默丢弃',
  },
  {
    desc: 'M241 登记名丢下划线（ex_talent 改 extalent——文件名/寻址前缀/登记名三处一致性破，#138）',
    file: 'yml/_fixed.json',
    find: `"extendedCharaTables": ["portcflag", "ex_talent"],`,
    replace: `"extendedCharaTables": ["portcflag", "extalent"],`,
    tests: ['portcflag-table', 'extalent-table'],
    must_mention: '没有对应名字表',
  },
  {
    desc: 'M243 Chara31 预设改坏（ABL 21 琼 3 改 9——库内产物与源 CSV 逐字段比对红，#138）',
    file: 'yml/Chara31.yml',
    find: `"ABL":
  "21": 3`,
    replace: `"ABL":
  "21": 9`,
    tests: ['extalent-table'],
    must_mention: '与读源 CSV 不一致',
  },
  {
    desc: 'M244 版本轴退回 0.0.0（【版本】1 改 0 而【版本代号】仍是 0.0.1——编码一致性用例红，#138 抬版本的机器可查子集）',
    file: 'yml/GameBase.yml',
    find: `"版本": 1`,
    replace: `"版本": 0`,
    tests: ['extalent-table'],
    must_mention: '的编码不一致',
  },
  {
    desc: 'M246 版本退回 0（loadData 的 truthy 短路把所有存档拒掉——版本下限与闸门用例双红，#138 追加）',
    file: 'yml/GameBase.yml',
    find: `"版本": 1`,
    replace: `"版本": 0`,
    tests: ['extalent-table'],
    must_mention: '低于引擎最小可用值 1',
  },
  {
    desc: 'M245 Chara34 预设段删（MARK 1/3/4 整块删——逐字段比对与边界用例双红，#138）',
    file: 'yml/Chara34.yml',
    find: `"MARK":
  "1": 3
  "3": 3
  "4": 3`,
    replace: '# 变异：MARK 预设段删除',
    tests: ['extalent-table'],
    must_mention: '与读源 CSV 不一致',
  },
  {
    desc: 'M222 saveFiles 退回引擎默认（_fixed.json 里改成 10——原作 11-98 号槽的备注不再被 loadGlobal 维护，界面上显示为空栏位）',
    file: 'yml/_fixed.json',
    find: `"saveFiles": 99`,
    replace: `"saveFiles": 10`,
    tests: ['resource-media'],
    must_mention: 'saveFiles 必须在 _fixed.json',
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
  {
    desc: 'ExFlag 名字表 id 改坏（威望 99 改 98——名称→序号映射与寻址双红，#113）',
    file: 'yml/ExFlag.yml',
    find: `"威望":
  id: 99`,
    replace: `"威望":
  id: 98`,
    tests: ['exflag-chara35'],
    must_mention: '名称→序号映射',
  },
  {
    desc: 'ExFlag 结局线槽位删（嘉德线 2810 整块删——ENDCHECK 分派区间不完整，#113）',
    file: 'yml/ExFlag.yml',
    find: `# 角色号 33【嘉德】
"嘉德线":
  id: 2810
  name: "route_33"
  type: "number"
`,
    replace: '',
    tests: ['exflag-chara35'],
    must_mention: '应装载 36 条',
  },
  {
    desc: 'Chara35 预设值改坏（素質 300 银发 5 改 6——与源 CSV 逐字段比对红，#113）',
    file: 'yml/Chara35.yml',
    find: '  "300": 5',
    replace: '  "300": 6',
    tests: ['exflag-chara35'],
    must_mention: '菲娅预设',
  },
  {
    desc: 'Flag 侵略线 id 改坏（人间界侵攻度 81 改 80——ENDING_1 触发条件读错位，#113）',
    file: 'yml/Flag.yml',
    find: `"人间界侵攻度":
  id: 81`,
    replace: `"人间界侵攻度":
  id: 80`,
    tests: ['exflag-chara35'],
    must_mention: '人间界侵攻度必须落在原作下标 81',
  },
];
