// 变异条目表切片：yml/ 与 res/（静态表产物与媒体注册）。
// 字段与运行方式见 tools/mutation-check.mjs 头注释。desc 里的 M 编号不人工
// 分配，只作引用锚点，但全表必须唯一（#295；M117 曾被两票撞号，已改正）
// ——重号由 gate_shape 随 --verify 秒级核对。
/** 本分片条数（门 1）：增删条目必须同步改它，理由见 tools/mutation-check.mjs 头注 */
export const COUNT = 28; // #640 +7（M12870-M12876：yml 装载覆盖与内容固定的行为守卫）

export default [
  {
    engine: true,
    desc: 'M112 Chara17 预设行被删（预设生效用例必须红）',
    file: 'yml/Chara17.yml',
    find: `"portcflag":
  "数据版本": 0`,
    replace: '# 变异：portcflag 预设行删除',
    tests: ['portcflag-table'],
    must_mention: '预设',
  },
  {
    engine: true,
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
    find: `"extendedCharaTables": [
      "portcflag",
      "ex_talent",
      "c_relation",
      "c_relation_sub"
    ],`,
    replace: `"extendedCharaTables": [],`,
    tests: ['portcflag-table'],
    must_mention: '登记清单为空',
  },
  {
    desc: 'M240 ex_talent 登记被删（_fixed.json 只留 portcflag——降一维回到 #21 缺口，写入全部静默丢弃，#138）',
    file: 'yml/_fixed.json',
    find: `"extendedCharaTables": [
      "portcflag",
      "ex_talent",
      "c_relation",
      "c_relation_sub"
    ],`,
    replace: `"extendedCharaTables": [
      "portcflag",
      "c_relation",
      "c_relation_sub"
    ],`,
    tests: ['extalent-table'],
    must_mention: '九处写入全部静默丢弃',
  },
  {
    desc: 'M241 登记名丢下划线（ex_talent 改 extalent——文件名/寻址前缀/登记名三处一致性破，#138）',
    file: 'yml/_fixed.json',
    find: `"extendedCharaTables": [
      "portcflag",
      "ex_talent",
      "c_relation",
      "c_relation_sub"
    ],`,
    replace: `"extendedCharaTables": [
      "portcflag",
      "extalent",
      "c_relation",
      "c_relation_sub"
    ],`,
    tests: ['portcflag-table', 'extalent-table'],
    must_mention: '没有对应名字表',
  },
  {
    engine: true,
    desc: 'M243 Chara31 预设改坏（ABL 21 琼 3 改 9——消费验证的 ABL 断言红，#138；#640 起由行为断言守）',
    file: 'yml/Chara31.yml',
    find: `"ABL":
  "21": 3`,
    replace: `"ABL":
  "21": 9`,
    tests: ['extalent-table'],
    must_mention: 'ABL 21（琼的预设）',
  },
  {
    desc: 'M244 版本轴退回 0.0.0（【版本】改 0 而【版本代号】仍是当前串——编码一致性用例红，#138 抬版本的机器可查子集；find 随 #188 抬 0.0.2、#215 抬 0.0.3、#217 抬 0.0.4、#349 抬 0.0.5、#545 抬 0.0.6、#547 抬 0.0.7、#560 抬 0.0.8 同步）',
    file: 'yml/GameBase.yml',
    find: `"版本": 8`,
    replace: `"版本": 0`,
    tests: ['extalent-table'],
    must_mention: '的编码不一致',
  },
  {
    desc: 'M246 版本退回 0（loadData 的 truthy 短路把所有存档拒掉——版本下限与闸门用例双红，#138 追加；find 随 #188 抬 0.0.2、#215 抬 0.0.3、#217 抬 0.0.4、#349 抬 0.0.5、#545 抬 0.0.6、#547 抬 0.0.7、#560 抬 0.0.8 同步）',
    file: 'yml/GameBase.yml',
    find: `"版本": 8`,
    replace: `"版本": 0`,
    tests: ['extalent-table'],
    must_mention: '低于引擎最小可用值 1',
  },
  {
    engine: true,
    desc: 'M245 Chara34 预设段删（MARK 1/3/4 整块删——消费验证的 MARK 断言红，#138；#640 起由行为断言守）',
    file: 'yml/Chara34.yml',
    find: `"MARK":
  "1": 3
  "3": 3
  "4": 3`,
    replace: '# 变异：MARK 预设段删除',
    tests: ['extalent-table'],
    must_mention: 'MARK 1（葵希罗的预设）',
  },
  {
    engine: true,
    desc: 'M270 Chara150 素質 320 大数改坏（1000000001 改 1000000002——消费验证的 talent 断言红，#139 编号外批）',
    file: 'yml/Chara150.yml',
    find: '"320": 1000000001',
    replace: '"320": 1000000002',
    tests: ['chara-outer'],
    must_mention: '大数预设必须原样落 talent',
  },
  {
    engine: true,
    desc: 'M271 Chara201 素質 319 种族改坏（2 改 9——逐字段比对与消费验证双红；319 是奴隶商店召唤池 CSVTALENT 的商品过滤键，#139）',
    file: 'yml/Chara201.yml',
    find: '"319": 2',
    replace: '"319": 9',
    tests: ['chara-outer'],
    must_mention: '商品过滤键）必须落 talent 为 2',
  },
  {
    engine: true,
    desc: 'M272 Chara777 相性段删（"777|223" 静态表消失——相性搬运用例与逐字段比对双红，#139；丽塔/卡拉配对相性）',
    file: 'yml/Chara777.yml',
    find: `"相性":
  "223": 1000`,
    replace: '# 变异：相性段删除',
    tests: ['chara-outer'],
    must_mention: '配对相性必须落静态表',
  },
  {
    engine: true,
    desc: 'M222 saveFiles 退回引擎默认（_fixed.json 里改成 10——原作 11-98 号槽的备注不再被 loadGlobal 维护，界面上显示为空栏位）',
    file: 'yml/_fixed.json',
    find: `"saveFiles": 99`,
    replace: `"saveFiles": 10`,
    tests: ['resource-media'],
    must_mention: 'saveFiles 必须在 _fixed.json',
  },
  {
    engine: true,
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
    engine: true,
    desc: 'M127 默认配置漏键（删 window.audio——缺键被 syncConfig 永久物化的坑）',
    file: 'yml/_config.json',
    find: `    "audio": 100,
    "autoMax": false,`,
    replace: `    "autoMax": false,`,
    tests: ['resource-media'],
    must_mention: '引擎默认配置整份',
  },
  {
    engine: true,
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
    engine: true,
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
    engine: true,
    desc: 'Chara35 预设值改坏（素質 300 银发 5 改 6——预设内容逐项固定红，#113）',
    file: 'yml/Chara35.yml',
    find: '  "300": 5',
    replace: '  "300": 6',
    tests: ['exflag-chara35'],
    must_mention: '菲娅预设',
  },
  {
    engine: true,
    desc: 'Flag 侵略线 id 改坏（人间界侵攻度 81 改 80——ENDING_1 触发条件读错位，#113）',
    file: 'yml/Flag.yml',
    find: `"人间界侵攻度":
  id: 81`,
    replace: `"人间界侵攻度":
  id: 80`,
    tests: ['exflag-chara35'],
    must_mention: '人间界侵攻度必须落在原作下标 81',
  },
  {
    engine: true,
    desc: 'M12870 Chara0 基礎预设改坏（体力 10000 改 1000——预设内容固定用例必须红，#640）',
    file: 'yml/Chara0.yml',
    find: '"基礎":\n  "0": 10000\n  "1": 10000\n  "2": 10000',
    replace: '"基礎":\n  "0": 1000\n  "1": 10000\n  "2": 10000',
    tests: ['chara-load'],
    must_mention: '角色 0 的预设内容（基礎全满、素質 1/122）',
  },
  {
    engine: true,
    desc: 'M12871 Chara17 素質 312 改坏（20 改 2——预设内容固定用例必须红，#640）',
    file: 'yml/Chara17.yml',
    find: '  "312": 20',
    replace: '  "312": 2',
    tests: ['chara-load'],
    must_mention: '角色 17 的预设内容（素質 32 项、フラグ、portcflag 增补）',
  },
  {
    engine: true,
    desc: 'M12872 Chara35 フラグ 453 改坏（1270 改 127——预设内容逐项固定用例必须红，#640）',
    file: 'yml/Chara35.yml',
    find: '  "453": 1270',
    replace: '  "453": 127',
    tests: ['exflag-chara35'],
    must_mention: '菲娅预设内容与库内产物不一致',
  },
  {
    desc: 'M12873 常规批在场清单混入不存在的 99（产物在场用例必须红，#640）',
    file: 'test/extalent-table.test.js',
    find: '  24, 31, 32, 33, 34,',
    replace: '  24, 31, 32, 33, 34, 99, // 变异：清单混入不存在的 99',
    tests: ['extalent-table'],
    must_mention: 'yml/Chara99.yml 缺失',
  },
  {
    engine: true,
    desc: 'M12874 角色表全量装载的张数判据改坏（45 改 44——yml 丢失一张也绿，#640）',
    file: 'test/chara-load.test.js',
    find: '      files.length,\n      45,\n      `库内应有 45 张 Chara*.yml，实际 ${files.length}`,',
    replace:
      '      files.length,\n      44, // 变异：张数判据坏\n      `库内应有 45 张 Chara*.yml，实际 ${files.length}`,',
    tests: ['chara-load'],
    must_mention: '库内应有 45 张',
  },
  {
    engine: true,
    desc: 'M12875 缺 CFlag 名字表的行丢弃回归锁改坏（报错断言改空——フラグ 行静默丢失无人报，#640）',
    file: 'test/chara-load.test.js',
    find: "  assert.deepEqual(loader.errors, ['角色数据表不存在: cflag!']);",
    replace: '  assert.deepEqual(loader.errors, []); // 变异：行丢弃回归锁改坏',
    tests: ['chara-load'],
    must_mention: '角色数据表不存在: cflag!',
  },
  {
    engine: true,
    desc: 'M12876 addCharacter 进 data.no 断言改坏（角色 0 的 [0] 改 [1]——引擎装载链路失明，#640）',
    file: 'test/chara-load.test.js',
    find: "assert.deepEqual(adder.data.no, [0], '角色 0 必须进入引擎的 data.no');",
    replace:
      "assert.deepEqual(adder.data.no, [1], '角色 0 必须进入引擎的 data.no'); // 变异：data.no 断言坏",
    tests: ['chara-load'],
    must_mention: '角色 0 必须进入引擎的 data.no',
  },
];
