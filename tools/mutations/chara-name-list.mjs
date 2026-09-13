// 变异条目表分片：chara-name-list（issue #388，CHARA_NAME_INIT 落表）。
// 靶文件：ere/chara/chara-name-list.js、event-first.js／event-load.js 的接线点、
// yml/CharaNameList.yml 数据本身。守护测试见 test/chara-name-list.test.js。

export const COUNT = 8;

export default [
  {
    desc: 'M7968 get_fixed_chara_name 的未注册守卫被恒假绕过，缺口 id 也去读裸地址',
    file: 'ere/chara/chara-name-list.js',
    find: '  if (!valid_ids().has(nid)) {',
    replace: '  if (false) {',
    tests: ['chara-name-list'],
    must_mention: '未注册 id 必须直接返回空串，不得读到陈旧的名字地址残留',
  },
  {
    desc: 'M7969 get_fixed_chara_name 的守卫被恒真短路，已注册 id 也查不到名字',
    file: 'ere/chara/chara-name-list.js',
    find: '  if (!valid_ids().has(nid)) {',
    replace: '  if (true) {',
    tests: ['chara-name-list'],
    must_mention: '已注册 id 必须查表返回名字',
  },
  {
    desc: 'M7970 valid_ids 缓存的惰性初始化被改成每次都重建，keys 被重复读取',
    file: 'ere/chara/chara-name-list.js',
    find: "  valid_ids_cache ??= new Set(era.get('charanamelistkeys'));",
    replace: "  valid_ids_cache = new Set(era.get('charanamelistkeys'));",
    tests: ['chara-name-list'],
    must_mention: 'charanamelistkeys 只应被读取一次（缓存生效）',
  },
  {
    desc: 'M7971 get_fixed_chara_name 丢了名字地址的 undefined 兜底',
    file: 'ere/chara/chara-name-list.js',
    find: "  return era.get(`charanamelistname:${nid}`) ?? '';",
    replace: '  return era.get(`charanamelistname:${nid}`);',
    tests: ['chara-name-list'],
    must_mention: "名字地址未播种时必须兜底为空串（?? ''）",
  },
  {
    desc: 'M7972 chara_name_init 的调用点被清空，valid_ids 缓存不再预热',
    file: 'ere/chara/chara-name-list.js',
    find: 'function chara_name_init() {\n  valid_ids();\n}',
    replace: 'function chara_name_init() {}',
    tests: ['chara-name-list', 'event-first', 'event-load'],
    must_mention: 'chara_name_init 必须读取 charanamelistkeys',
  },
  {
    desc: 'M7973 event-first.js 里 CHARA_NAME_INIT 的接线调用被删掉',
    file: 'ere/event/event-first.js',
    find: 'chara_name_init();',
    replace: '',
    tests: ['event-first'],
    must_mention: 'EVENTFIRST 链必须真的调用了 chara_name_init',
  },
  {
    desc: 'M7974 event-load.js 里 CHARA_NAME_INIT 的接线调用被删掉',
    file: 'ere/event/event-load.js',
    find: 'chara_name_init();',
    replace: '',
    tests: ['chara-name-list'],
    must_mention: 'EVENTLOAD 链必须真的调用 chara_name_init',
  },
  {
    desc: 'M7975 CharaNameList.yml 里一条数据的 id 被改错，产物与源推导不再一致',
    file: 'yml/CharaNameList.yml',
    find: '"玛丽":\n  id: 0',
    replace: '"玛丽":\n  id: 5',
    tests: ['chara-name-list'],
    must_mention:
      '产物内容与源数据重推导结果逐条一致（含重名合并与 そら 覆盖）——drift 说明产物被手改或归一表变化后未重转',
  },
];
