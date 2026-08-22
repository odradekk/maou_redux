// 变异条目表切片：ere/facade、ere/era-utils、ere/chara、ere/utils（门面与包装层）。
// 字段与运行方式见 tools/mutation-check.mjs 头注释；新增/删除条目必须同步改
// 工具里的 LEDGER_COUNT_BASELINE（两项检查）。desc 里的 M 编号是历史惯性编号
// （M117 曾被两票撞号使用），只作引用锚点保留，不再人工分配。
export default [
  {
    desc: 'M110 版本戳盖错值（PORT_DATA_VERSION 1 改 2）',
    file: 'ere/chara/chara-portcflag.js',
    find: 'const PORT_DATA_VERSION = 1;',
    replace: 'const PORT_DATA_VERSION = 2;',
    tests: ['event-first', 'page-title'],
    must_mention: 'portcflag',
  },
  {
    desc: 'M111 寻址族拼错（portcflag 改 portflag——族缺名字表时实机直接崩溃）',
    file: 'ere/chara/chara-portcflag.js',
    find: '  return era.set(`portcflag:${cid}:数据版本`, PORT_DATA_VERSION);',
    replace: '  return era.set(`portflag:${cid}:数据版本`, PORT_DATA_VERSION);',
    tests: ['event-first', 'page-title'],
    must_mention: 'portcflag',
  },
  {
    desc: 'M119 播种默认值改坏（音量 66 → 0，原作随包 global.sav 实证 66）',
    file: 'ere/era-utils/era-global.js',
    find: '  era_global.title_music_volume = 66;',
    replace: '  era_global.title_music_volume = 0;',
    tests: ['era-global', 'page-title'],
    must_mention: '66',
  },
  {
    desc: 'M120 播种标记守卫删掉（每次进标题都重播、覆盖用户偏好）',
    file: 'ere/era-utils/era-global.js',
    find: `  if (era_global.audio_defaults_seeded === 1) {
    return false;
  }`,
    replace: '  // 变异：无标记守卫，每次都播种',
    tests: ['era-global'],
    must_mention: '不被覆盖',
  },
  {
    desc: 'M145 分发期存根退回纯 print（stub_line_wait 丢掉等键——玩家看不到）',
    file: 'ere/utils/stub-line.js',
    find: `async function stub_line_wait(erb_name, note, owner) {
  era.print(stub_text(erb_name, note, owner));
  await era.waitAnyKey();
}`,
    replace: `async function stub_line_wait(erb_name, note, owner) {
  era.print(stub_text(erb_name, note, owner));
}`,
    tests: ['page-main-menu'],
    must_mention: '玩家先看到',
  },
  {
    desc: 'M158 未声明下标读兜底被删（undefined 泄漏给调用方）',
    file: 'ere/facade/chara-kojo.js',
    find: '    return era.get(`cflag:${this.cid}:301`) || 0;',
    replace: '    return era.get(`cflag:${this.cid}:301`);',
    tests: ['gen-facade'],
    must_mention: '读写落到正确寻址',
  },
  {
    desc: 'M159 角色视图不再按 ID 缓存（每次 chara(cid) 新对象）',
    file: 'ere/facade/chara.js',
    find: `function chara(cid) {
  const key = Number(cid);
  let view = cache.get(key);
  if (!view) {
    view = new CharaView(key);
    cache.set(key, view);
  }
  return view;
}`,
    replace: `function chara(cid) {
  return new CharaView(Number(cid));
}`,
    tests: ['gen-facade'],
    must_mention: '按 ID 缓存',
  },
  {
    desc: 'M185 产物出处路径指向不存在的文件（#71 翻过车的一类）',
    file: 'ere/facade/chara-train.js',
    find: '   * 源: target/ERB/SYSTEM/SYSTEM_SOURCE.ERB 行666 起 UP:0（UP/DOWN→delta，CONTEXT.md 变量族）',
    replace:
      '   * 源: target/ERB/SYSTEM/__NOPE__.ERB 行666 起 UP:0（UP/DOWN→delta，CONTEXT.md 变量族）',
    tests: ['gen-facade'],
    must_mention: '出处路径',
  },
  {
    desc: 'M203 一人称直设删除（CSTR:60 = 我 / CFLAG:450 = 9，SELF_CALL.ERB:39-40）',
    file: 'ere/chara/chara-init.js',
    find: `    era.set(\`cstr:\${cid}:60\`, '我'); // CSTR:x:60 一人称
    era.set(\`cflag:\${cid}:450\`, 9); // CFLAG:x:450 一人称档位`,
    replace: '    // 变异：一人称直设删除',
    tests: ['chara-init'],
    must_mention: 'CSTR:x:60 = 我',
  },
  {
    desc: 'M204 能力者技能守卫反转（!(275||…||279)，CHARA_MAKE_INIT.ERB:36）',
    file: 'ere/chara/chara-init.js',
    find: '  if (!has_element) {',
    replace: '  if (has_element) { // 变异：守卫反转',
    tests: ['chara-init'],
    must_mention: '守卫挡住五连',
  },
];
